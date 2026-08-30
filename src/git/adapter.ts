/**
 * Git Subprocess Adapter.
 * Encapsulates git operations with bounds, lossy detection, and structured parsing.
 *
 * @module dsh-project-control/git/adapter
 */

import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { createHash } from 'node:crypto'

const execFileAsync = promisify(execFile)

export interface FileChangeEntry {
  path: string
  oldPath?: string
  status: 'modified' | 'added' | 'deleted' | 'renamed' | 'untracked' | 'copied' | 'unmerged'
  staged: boolean
}

export interface GitStatusSummary {
  branch?: string
  headSha?: string
  isClean: boolean
  entries: FileChangeEntry[]
  statusHash: string
}

export interface GitDiffSummary {
  patch: string
  isTruncated: boolean
  bytes: number
  diffHash: string
  filesChanged: number
  insertions: number
  deletions: number
}

export interface GitCommitInfo {
  hash: string
  shortHash: string
  authorName: string
  authorEmail: string
  date: number // unix epoch ms
  message: string
  parents: string[]
}

export const DEFAULT_DIFF_MAX_BYTES = 500 * 1024 // 500 KB limit

export class GitAdapter {
  /**
   * Run raw git command in cwd with execution bounds.
   */
  async runGit(args: string[], cwd: string, maxBuffer = 10 * 1024 * 1024): Promise<string> {
    try {
      const { stdout } = await execFileAsync('git', args, {
        cwd,
        maxBuffer,
        windowsHide: true,
        env: {
          ...process.env,
          GIT_TERMINAL_PROMPT: '0',
          LC_ALL: 'C',
        },
      })
      return stdout
    } catch (err: unknown) {
      const execError = err as { stdout?: string; stderr?: string; message?: string }
      throw new Error(`git ${args[0]} failed in "${cwd}": ${execError.stderr || execError.message}`)
    }
  }

  /**
   * Parse status using git status --porcelain=v1 -b -u
   */
  async getStatus(cwd: string): Promise<GitStatusSummary> {
    const raw = await this.runGit(['status', '--porcelain=v1', '-b', '-u'], cwd)
    const lines = raw.split('\n').filter(l => l.trim().length > 0)

    let branch: string | undefined
    let headSha: string | undefined
    const entries: FileChangeEntry[] = []

    try {
      headSha = (await this.runGit(['rev-parse', 'HEAD'], cwd)).trim()
    } catch {
      // Empty repo
    }

    for (const line of lines) {
      if (line.startsWith('## ')) {
        const branchHeader = line.substring(3).trim()
        branch = branchHeader.split('...')[0]?.split(' ')[0]
        continue
      }

      const indexCode = line.charAt(0)
      const workCode = line.charAt(1)
      const rest = line.substring(3).trim()

      if (indexCode === '?' && workCode === '?') {
        entries.push({ path: rest, status: 'untracked', staged: false })
      } else if (indexCode === 'U' || workCode === 'U') {
        entries.push({ path: rest, status: 'unmerged', staged: false })
      } else {
        // Staged entry
        if (indexCode !== ' ' && indexCode !== '?') {
          entries.push(this.parseEntry(indexCode, rest, true))
        }
        // Unstaged entry
        if (workCode !== ' ' && workCode !== '?') {
          entries.push(this.parseEntry(workCode, rest, false))
        }
      }
    }

    const statusContent = entries.map(e => `${e.status}:${e.staged}:${e.path}`).join('|')
    const statusHash = createHash('sha256').update(`${headSha || ''}|${statusContent}`).digest('hex')

    return {
      branch,
      headSha,
      isClean: entries.length === 0,
      entries,
      statusHash,
    }
  }

  private parseEntry(code: string, pathInfo: string, staged: boolean): FileChangeEntry {
    if (code === 'R' || code === 'C') {
      const [oldPath, newPath] = pathInfo.split(' -> ')
      return {
        path: newPath || pathInfo,
        oldPath,
        status: code === 'R' ? 'renamed' : 'copied',
        staged,
      }
    }
    const status =
      code === 'M' ? 'modified' :
      code === 'A' ? 'added' :
      code === 'D' ? 'deleted' : 'modified'

    return { path: pathInfo, status, staged }
  }

  /**
   * Get diff between commits, worktree vs base, or cached.
   */
  async getDiff(
    cwd: string,
    options: {
      from?: string
      to?: string
      staged?: boolean
      paths?: string[]
      maxBytes?: number
    } = {},
  ): Promise<GitDiffSummary> {
    const maxBytes = options.maxBytes ?? DEFAULT_DIFF_MAX_BYTES
    const args = ['diff', '--no-color', '--patch-with-stat']

    if (options.staged) {
      args.push('--cached')
    }

    if (options.from) {
      if (options.to) {
        args.push(`${options.from}..${options.to}`)
      } else {
        args.push(options.from)
      }
    }

    if (options.paths && options.paths.length > 0) {
      args.push('--', ...options.paths)
    }

    const raw = await this.runGit(args, cwd)
    const bytes = Buffer.byteLength(raw, 'utf8')
    const isTruncated = bytes > maxBytes
    const patch = isTruncated ? raw.substring(0, maxBytes) : raw

    // Calculate files changed and insertions/deletions
    let insertions = 0
    let deletions = 0
    let filesChanged = 0

    const statMatch = raw.match(/(\d+) files? changed(?:, (\d+) insertions?\(\+\))?(?:, (\d+) deletions?\(-\))?/)
    if (statMatch) {
      filesChanged = parseInt(statMatch[1] || '0', 10)
      insertions = parseInt(statMatch[2] || '0', 10)
      deletions = parseInt(statMatch[3] || '0', 10)
    }

    const diffHash = createHash('sha256').update(raw).digest('hex')

    return {
      patch,
      isTruncated,
      bytes,
      diffHash,
      filesChanged,
      insertions,
      deletions,
    }
  }

  /**
   * Get commit log between revisions.
   */
  async getLog(
    cwd: string,
    options: { from?: string; to?: string; maxCount?: number } = {},
  ): Promise<GitCommitInfo[]> {
    const args = ['log', '--format=%H%x00%h%x00%an%x00%ae%x00%at%x00%B%x00%P%x01']
    if (options.maxCount) {
      args.push(`-n`, String(options.maxCount))
    }
    if (options.from) {
      if (options.to) {
        args.push(`${options.from}..${options.to}`)
      } else {
        args.push(`${options.from}..HEAD`)
      }
    }

    const raw = await this.runGit(args, cwd)
    const rawCommits = raw.split('\x01').filter(c => c.trim().length > 0)

    return rawCommits.map((chunk) => {
      const [hash, shortHash, authorName, authorEmail, dateStr, message, parentsStr] = chunk.split('\x00')
      return {
        hash: (hash || '').trim(),
        shortHash: (shortHash || '').trim(),
        authorName: (authorName || '').trim(),
        authorEmail: (authorEmail || '').trim(),
        date: parseInt(dateStr || '0', 10) * 1000,
        message: (message || '').trim(),
        parents: (parentsStr || '').trim().split(' ').filter(p => p.length > 0),
      }
    })
  }

  /**
   * Resolve a ref to exact SHA.
   */
  async revParse(cwd: string, ref: string): Promise<string> {
    return (await this.runGit(['rev-parse', ref], cwd)).trim()
  }

  /**
   * Check if git repository exists in directory.
   */
  async isGitRepo(cwd: string): Promise<boolean> {
    try {
      const res = await this.runGit(['rev-parse', '--is-inside-work-tree'], cwd)
      return res.trim() === 'true'
    } catch {
      return false
    }
  }
}
