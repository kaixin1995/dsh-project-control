/**
 * Workspace Snapshot and divergence detection.
 * @module dsh-project-control/git/snapshot
 */

import type { GitAdapter, FileChangeEntry } from './adapter.ts'

export interface WorkspaceSnapshot {
  rootPath: string
  branch?: string
  headSha?: string
  statusHash: string
  diffHash: string
  isClean: boolean
  entries: FileChangeEntry[]
  createdAt: number
}

export interface DivergenceCheckResult {
  diverged: boolean
  headShaChanged: boolean
  statusChanged: boolean
  diffChanged: boolean
  reasons: string[]
}

export class WorkspaceSnapshotManager {
  constructor(private readonly git: GitAdapter) {}

  /**
   * Take a comprehensive snapshot of current workspace status and diff.
   */
  async capture(cwd: string): Promise<WorkspaceSnapshot> {
    const status = await this.git.getStatus(cwd)
    const diff = await this.git.getDiff(cwd)

    return {
      rootPath: cwd,
      branch: status.branch,
      headSha: status.headSha,
      statusHash: status.statusHash,
      diffHash: diff.diffHash,
      isClean: status.isClean,
      entries: status.entries,
      createdAt: Date.now(),
    }
  }

  /**
   * Compare two snapshots to detect external or mid-flight divergence.
   */
  compare(expected: WorkspaceSnapshot, actual: WorkspaceSnapshot): DivergenceCheckResult {
    const reasons: string[] = []

    const headShaChanged = expected.headSha !== actual.headSha
    if (headShaChanged) {
      reasons.push(`HEAD commit changed from ${expected.headSha || '(none)'} to ${actual.headSha || '(none)'}`)
    }

    const statusChanged = expected.statusHash !== actual.statusHash
    if (statusChanged) {
      reasons.push('Working tree status entries changed')
    }

    const diffChanged = expected.diffHash !== actual.diffHash
    if (diffChanged) {
      reasons.push('Working tree uncommitted diff content changed')
    }

    return {
      diverged: headShaChanged || statusChanged || diffChanged,
      headShaChanged,
      statusChanged,
      diffChanged,
      reasons,
    }
  }
}
