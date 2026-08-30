/**
 * Recovery Scanner for crash recovery, uncompleted run detection, and interrupted state cleanup.
 * @module dsh-project-control/runtime/recovery
 */

import type { ProjectControlStore } from '../store/repository.ts'
import type { ProjectId } from '../domain/ids.ts'
import { assertAttemptTransition, assertRunTransition, assertStepTransition } from '../domain/state-machine.ts'

export interface RecoveryScanResult {
  interruptedRuns: number
  interruptedSteps: number
  interruptedAttempts: number
  recoveredRunIds: string[]
}

export class RecoveryScanner {
  constructor(private readonly store: ProjectControlStore) {}

  /**
   * Scan and recover all in-flight or abandoned runs across projects.
   */
  async scanAndRecover(projectId?: ProjectId): Promise<RecoveryScanResult> {
    const allRuns = projectId ? this.store.runs.listByProject(projectId) : this.store.runs.list()
    const inFlightRuns = allRuns.filter(
      r => r.status === 'running' || r.status === 'queued' || r.status === 'retrying' || r.status === 'verifying',
    )

    let interruptedAttempts = 0
    let interruptedSteps = 0
    let interruptedRuns = 0
    const recoveredRunIds: string[] = []

    for (const run of inFlightRuns) {
      // 1. Recover in-flight attempts
      const attempts = this.store.attempts.list(a => a.runId === run.id && a.status === 'running')
      for (const attempt of attempts) {
        assertAttemptTransition(attempt.status, 'interrupted')
        attempt.status = 'interrupted'
        attempt.finishedAt = Date.now()
        attempt.error = 'Process interrupted / crash recovery'
        await this.store.attempts.save(attempt)
        interruptedAttempts++
      }

      // 2. Recover in-flight steps
      const steps = this.store.steps.list(
        s => s.runId === run.id && (s.status === 'running' || s.status === 'retrying'),
      )
      for (const step of steps) {
        assertStepTransition(step.status, 'interrupted')
        step.status = 'interrupted'
        step.updatedAt = Date.now()
        await this.store.steps.save(step)
        interruptedSteps++
      }

      // 3. Recover Run
      assertRunTransition(run.status, 'interrupted')
      run.status = 'interrupted'
      run.updatedAt = Date.now()
      run.error = { message: 'Run interrupted by process restart', code: 'RECOVERY_INTERRUPTED' }
      await this.store.runs.save(run)
      interruptedRuns++
      recoveredRunIds.push(run.id)
    }

    return {
      interruptedRuns,
      interruptedSteps,
      interruptedAttempts,
      recoveredRunIds,
    }
  }
}
