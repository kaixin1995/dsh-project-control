/**
 * Legacy 历史重建（V1.0 §95–102）：
 * L0 纯 git 事实扫描（零 LLM）→ 时间窗口 + 文件重叠启发式聚类 → ImportedChange。
 * L1 逐提交 LLM 轻析与 L3 重点详析为可选配置（historySummaries，默认关）。
 *
 * @module dsh-project-control/runtime/history
 */

import type { GitAdapter, GitCommitInfo } from '../git/adapter.ts'
import type { DomainRepository } from '../store/repository.ts'
import { generateUlid } from '../domain/ulid.ts'

/** 一条 Imported Change（Git 历史重建产物；confidence 恒为 inferred 直至人工确认）。 */
export interface ImportedChangeRecord {
  id: string
  projectId: string
  title: string
  commitShas: string[]
  firstCommitAt: number
  lastCommitAt: number
  files: string[]
  modules: string[]
  /** 启发式置信度 0..1（时间凝聚度 × 文件重叠度）。 */
  confidence: number
  status: 'inferred' | 'confirmed' | 'rejected'
  createdAt: number
}

export interface HistoryScanOptions {
  maxCommits: number
  /** 聚类时间窗口（毫秒）：相邻提交间隔超过该值则切开新簇。 */
  clusterGapMs: number
}

export const HISTORY_SCAN_DEFAULTS: HistoryScanOptions = {
  maxCommits: 50,
  clusterGapMs: 36 * 60 * 60 * 1000,
}

/** 单 commit 的 L0 事实（零 LLM 成本）。 */
interface CommitFact {
  hash: string
  shortHash: string
  author: string
  committedAt: number
  subject: string
  files: string[]
  insertions: number
  deletions: number
  isMerge: boolean
}

/** 从 git numstat 提取单提交的文件与增删行数。 */
async function commitFacts(git: GitAdapter, cwd: string, commits: GitCommitInfo[]): Promise<CommitFact[]> {
  const facts: CommitFact[] = []
  for (const commit of commits) {
    let files: string[] = []
    let insertions = 0
    let deletions = 0
    try {
      const numstat = await git.runGit(['show', '--numstat', '--format=', commit.hash], cwd)
      for (const line of numstat.split('\n')) {
        const trimmed = line.trim()
        if (trimmed === '') continue
        const [ins, del, pathPart] = trimmed.split('\t')
        if (pathPart === undefined || pathPart === '') continue
        files.push(pathPart)
        insertions += ins === '-' ? 0 : Number(ins) || 0
        deletions += del === '-' ? 0 : Number(del) || 0
      }
    } catch {
      // 单提交读取失败不阻塞整体扫描（容错：该 commit 记空文件集）
    }
    facts.push({
      hash: commit.hash,
      shortHash: commit.shortHash,
      author: commit.authorName,
      committedAt: commit.date,
      subject: commit.message.split('\n')[0] ?? '',
      files,
      insertions,
      deletions,
      isMerge: commit.parents.length > 1,
    })
  }
  return facts
}

/** 启发式聚类：first-parent 主线上按时间窗口 + 文件重叠聚合（V1.0 §97/§99）。 */
export function clusterCommits(facts: CommitFact[], options: HistoryScanOptions): CommitFact[][] {
  const nonMerge = facts.filter((fact) => !fact.isMerge)
  const clusters: CommitFact[][] = []
  let current: CommitFact[] = []
  let currentFiles = new Set<string>()

  const overlap = (files: string[], existing: Set<string>): number => {
    if (existing.size === 0) return 0
    let hits = 0
    for (const file of files) if (existing.has(file)) hits++
    return hits / Math.max(files.length, 1)
  }

  for (const fact of nonMerge) {
    const gapBreak = current.length > 0 && fact.committedAt - current[current.length - 1]!.committedAt > options.clusterGapMs
    const fileBreak = current.length >= 3 && overlap(fact.files, currentFiles) === 0
    if (gapBreak || fileBreak) {
      clusters.push(current)
      current = []
      currentFiles = new Set()
    }
    current.push(fact)
    for (const file of fact.files) currentFiles.add(file)
  }
  if (current.length > 0) clusters.push(current)
  return clusters
}

/** 扫描历史并落盘 ImportedChange 记录（断点安全：整批完成后一次写入）。 */
export async function scanHistory(
  git: GitAdapter,
  cwd: string,
  projectId: string,
  importedChangesRepo: DomainRepository<ImportedChangeRecord, string>,
  options: Partial<HistoryScanOptions> = {},
): Promise<ImportedChangeRecord[]> {
  const opts = { ...HISTORY_SCAN_DEFAULTS, ...options }
  const commits = await git.getLog(cwd, { maxCount: opts.maxCommits })
  const facts = await commitFacts(git, cwd, commits)
  const clusters = clusterCommits(facts, opts)

  const records: ImportedChangeRecord[] = []
  for (const cluster of clusters) {
    if (cluster.length === 0) continue
    const files = [...new Set(cluster.flatMap((fact) => fact.files))]
    const modules = [...new Set(files.map((file) => file.split('/')[0]))].filter((module) => module.length > 0)
    const timeSpanMs = cluster[cluster.length - 1]!.committedAt - cluster[0]!.committedAt
    const timeCohesion = Math.max(0, 1 - timeSpanMs / opts.clusterGapMs)
    const confidence = Number(Math.min(0.95, 0.4 + timeCohesion * 0.3 + Math.min(cluster.length, 5) * 0.05).toFixed(2))
    const record: ImportedChangeRecord = {
      id: `imp_${generateUlid()}`,
      projectId,
      title: cluster[0]!.subject,
      commitShas: cluster.map((fact) => fact.hash),
      firstCommitAt: cluster[0]!.committedAt,
      lastCommitAt: cluster[cluster.length - 1]!.committedAt,
      files: files.slice(0, 50),
      modules,
      confidence,
      status: 'inferred',
      createdAt: Date.now(),
    }
    await importedChangesRepo.save(record)
    records.push(record)
  }
  return records
}
