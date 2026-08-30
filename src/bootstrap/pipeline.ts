/**
 * Lightweight 4-stage Legacy Bootstrap Pipeline.
 * Stage 1: Structure Scan (package manifests, languages, layout)
 * Stage 2: Symbol Extraction (top-level exports, interfaces, classes)
 * Stage 3: Git History Digest (recent commits, hot files)
 * Stage 4: Checkpoint Persistence (recorded into historyDomain)
 *
 * @module dsh-project-control/bootstrap/pipeline
 */

import { readdirSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { ProjectId } from '../domain/ids.ts'
import type { GitAdapter } from '../git/adapter.ts'
import type { GenericLanguageAnalyzer } from '../analysis/language.ts'
import type { DomainRepository } from '../store/repository.ts'

export interface ProjectBootstrapCheckpoint {
  id: string
  projectId: ProjectId
  techStack: string[]
  manifestFiles: string[]
  topLevelSymbols: Array<{ name: string; kind: string; file: string }>
  hotFiles: string[]
  recentCommitSummaries: string[]
  summary: string
  createdAt: number
}

export class BootstrapPipeline {
  constructor(
    private readonly git: GitAdapter,
    private readonly analyzer: GenericLanguageAnalyzer,
    private readonly checkpointsRepo: DomainRepository<ProjectBootstrapCheckpoint>,
  ) {}

  /**
   * Execute 4-stage bootstrap on a project directory.
   */
  async runBootstrap(projectId: ProjectId, cwd: string): Promise<ProjectBootstrapCheckpoint> {
    // -------------------------------------------------------------------------
    // Stage 1: Structure Scan
    // -------------------------------------------------------------------------
    const techStack: string[] = []
    const manifestFiles: string[] = []

    if (existsSync(join(cwd, 'package.json'))) {
      techStack.push('Node.js / TypeScript / JavaScript')
      manifestFiles.push('package.json')
    }
    if (existsSync(join(cwd, 'tsconfig.json'))) {
      techStack.push('TypeScript')
      manifestFiles.push('tsconfig.json')
    }
    if (existsSync(join(cwd, 'Cargo.toml'))) {
      techStack.push('Rust')
      manifestFiles.push('Cargo.toml')
    }
    if (existsSync(join(cwd, 'go.mod'))) {
      techStack.push('Go')
      manifestFiles.push('go.mod')
    }
    if (existsSync(join(cwd, 'pyproject.toml')) || existsSync(join(cwd, 'requirements.txt'))) {
      techStack.push('Python')
      manifestFiles.push(existsSync(join(cwd, 'pyproject.toml')) ? 'pyproject.toml' : 'requirements.txt')
    }

    // -------------------------------------------------------------------------
    // Stage 2: Symbol Extraction
    // -------------------------------------------------------------------------
    const topLevelSymbols: Array<{ name: string; kind: string; file: string }> = []
    const scannedFiles = this.collectSourceFiles(cwd, 20) // sample up to 20 files

    for (const relFile of scannedFiles) {
      try {
        const content = readFileSync(join(cwd, relFile), 'utf8')
        const symbols = await this.analyzer.extractSymbols(relFile, content)
        for (const s of symbols) {
          if (s.exported) {
            topLevelSymbols.push({ name: s.name, kind: s.kind, file: relFile })
          }
        }
      } catch {}
    }

    // -------------------------------------------------------------------------
    // Stage 3: Git History Digest
    // -------------------------------------------------------------------------
    const recentCommitSummaries: string[] = []
    const hotFiles: string[] = []

    try {
      const logs = await this.git.getLog(cwd, { maxCount: 10 })
      for (const log of logs) {
        recentCommitSummaries.push(`${log.shortHash} - ${log.message} (${log.authorName})`)
      }
    } catch {}

    // -------------------------------------------------------------------------
    // Stage 4: Checkpoint Persistence
    // -------------------------------------------------------------------------
    const checkpointId = `chk_${Date.now()}`
    const summary = `Bootstrapped ${techStack.join(', ') || 'workspace'}: ${manifestFiles.length} manifests, ${topLevelSymbols.length} exported symbols, ${recentCommitSummaries.length} recent commits.`

    const checkpoint: ProjectBootstrapCheckpoint = {
      id: checkpointId,
      projectId,
      techStack: Array.from(new Set(techStack)),
      manifestFiles,
      topLevelSymbols: topLevelSymbols.slice(0, 50),
      hotFiles,
      recentCommitSummaries,
      summary,
      createdAt: Date.now(),
    }

    await this.checkpointsRepo.save(checkpoint)
    return checkpoint
  }

  private collectSourceFiles(dir: string, limit: number, prefix = ''): string[] {
    const files: string[] = []
    try {
      const entries = readdirSync(dir)
      for (const entry of entries) {
        if (files.length >= limit) break
        if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist' || entry === 'lib') continue
        const full = join(dir, entry)
        const rel = prefix ? `${prefix}/${entry}` : entry
        try {
          const { statSync } = require('node:fs')
          if (statSync(full).isDirectory()) {
            files.push(...this.collectSourceFiles(full, limit - files.length, rel))
          } else if (/\.(ts|tsx|js|jsx|py|go|rs|cs)$/i.test(entry)) {
            files.push(rel)
          }
        } catch {}
      }
    } catch {}
    return files
  }
}
