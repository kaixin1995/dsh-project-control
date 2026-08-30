/**
 * Change service managing change lifecycle, baseRevision diff tracking, and change analysis.
 * @module dsh-project-control/domain/change
 */

import { createChangeId, type ChangeId, type ProjectId } from './ids.ts'
import type { ChangeRecord } from './models.ts'
import type { DomainRepository } from '../store/repository.ts'
import type { GitAdapter } from '../git/adapter.ts'
import type { EvidenceManager } from '../analysis/evidence.ts'
import { assertChangeTransition } from './state-machine.ts'

export interface ChangeAnalysisResult {
  change: ChangeRecord
  commits: Array<{ hash: string; message: string; author: string }>
  filesChanged: number
  insertions: number
  deletions: number
  diffHash: string
  evidenceId: string
  summaryText: string
}

export class ChangeService {
  constructor(
    private readonly changesRepo: DomainRepository<ChangeRecord, ChangeId>,
    private readonly git: GitAdapter,
    private readonly evidenceManager: EvidenceManager,
  ) {}

  /**
   * Create a new Change, pinning baseRevision to the current HEAD SHA.
   */
  async createChange(
    projectId: ProjectId,
    title: string,
    description: string,
    cwd: string,
  ): Promise<ChangeRecord> {
    let baseRevision = 'HEAD'
    try {
      baseRevision = await this.git.revParse(cwd, 'HEAD')
    } catch {
      // Empty repo
    }

    const now = Date.now()
    const change: ChangeRecord = {
      id: createChangeId(),
      projectId,
      title,
      description,
      status: 'draft',
      baseRevision,
      revision: 1,
      createdAt: now,
      updatedAt: now,
    }

    await this.changesRepo.save(change)
    return change
  }

  /**
   * Transition Change status with state machine invariant enforcement.
   */
  async updateStatus(changeId: ChangeId, newStatus: ChangeRecord['status']): Promise<ChangeRecord> {
    const change = this.changesRepo.get(changeId)
    if (!change) throw new Error(`Change not found: ${changeId}`)

    assertChangeTransition(change.status, newStatus)

    change.status = newStatus
    change.updatedAt = Date.now()
    change.revision++
    await this.changesRepo.save(change)
    return change
  }

  /**
   * Analyze all modifications from baseRevision to current worktree (commits + dirty files).
   */
  async analyzeChange(changeId: ChangeId, cwd: string): Promise<ChangeAnalysisResult> {
    const change = this.changesRepo.get(changeId)
    if (!change) throw new Error(`Change not found: ${changeId}`)

    // 1. Get intermediate commits since baseRevision
    let commits: Array<{ hash: string; message: string; author: string }> = []
    try {
      const gitLog = await this.git.getLog(cwd, { from: change.baseRevision, to: 'HEAD' })
      commits = gitLog.map(c => ({ hash: c.hash, message: c.message, author: c.authorName }))
    } catch {
      // Base revision might be empty or invalid
    }

    // 2. Get combined diff from baseRevision to current worktree
    const diff = await this.git.getDiff(cwd, { from: change.baseRevision })

    // 3. Create durable Evidence record
    const evidence = this.evidenceManager.createEvidence({
      projectId: change.projectId,
      changeId: change.id,
      source: 'git_diff',
      truthLevel: 'fact',
      locator: `git:diff:${change.baseRevision}..worktree`,
      content: diff.patch,
    })

    // 4. Construct high-level summary
    const summaryText = `Change "${change.title}": ${diff.filesChanged} files changed (+${diff.insertions}/-${diff.deletions}) across ${commits.length} commit(s).`

    return {
      change,
      commits,
      filesChanged: diff.filesChanged,
      insertions: diff.insertions,
      deletions: diff.deletions,
      diffHash: diff.diffHash,
      evidenceId: evidence.id,
      summaryText,
    }
  }
}
