/**
 * Git Worktree Isolation Runtime Manager.
 * Creates and cleans up isolated worktrees inside `<projectRoot>/.worktrees/<runId>`.
 *
 * @module dsh-project-control/runtime/worktree
 */

import { mkdirSync, existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import type { GitAdapter } from '../git/adapter.ts'
import type { RunId } from '../domain/ids.ts'

export interface WorktreeIsolationResult {
  runId: RunId
  worktreePath: string
  branchName: string
  dispose: (preserveForDiagnosis?: boolean) => Promise<void>
}

export class WorktreeManager {
  constructor(private readonly git: GitAdapter) {}

  /**
   * Create an isolated worktree for a specific Run.
   */
  async createIsolatedWorktree(
    projectRoot: string,
    runId: RunId,
    baseRef = 'HEAD',
  ): Promise<WorktreeIsolationResult> {
    const worktreesDir = join(projectRoot, '.worktrees')
    mkdirSync(worktreesDir, { recursive: true })

    const worktreePath = join(worktreesDir, runId)
    const branchName = `dsh-run-${runId}`

    // 1. If branch already exists, delete it first
    try {
      await this.git.runGit(['branch', '-D', branchName], projectRoot)
    } catch {}

    // 2. Add worktree
    await this.git.runGit(['worktree', 'add', '-b', branchName, worktreePath, baseRef], projectRoot)

    const dispose = async (preserveForDiagnosis = false): Promise<void> => {
      if (preserveForDiagnosis) {
        return // Leave for inspection
      }
      try {
        await this.git.runGit(['worktree', 'remove', '--force', worktreePath], projectRoot)
      } catch {
        if (existsSync(worktreePath)) {
          rmSync(worktreePath, { recursive: true, force: true })
        }
      }
      try {
        await this.git.runGit(['branch', '-D', branchName], projectRoot)
      } catch {}
    }

    return {
      runId,
      worktreePath,
      branchName,
      dispose,
    }
  }
}
