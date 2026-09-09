/**
 * Step Attempt Runner and Retry Policy Manager.
 * Orchestrates step attempt lifecycle, ground truth validation, and exponential backoff retry.
 *
 * @module dsh-project-control/runtime/runner
 */

import { createAttemptId, type AttemptId, type StepId, type RunId, type ProjectId } from '../domain/ids.ts'
import type { AttemptRecord, StepRecord } from '../domain/models.ts'
import type { DomainRepository } from '../store/repository.ts'
import { assertAttemptTransition, assertStepTransition } from '../domain/state-machine.ts'

export const MAX_STEP_ATTEMPTS = 3
export const BACKOFF_DELAYS_MS = [0, 10, 20, 50] // Milliseconds for test / runtime

export type StepExecutorFunction = (
  step: StepRecord,
  attempt: AttemptRecord,
  cwd: string,
) => Promise<{
  claimedSuccess: boolean
  verifiedSuccess: boolean
  error?: string
  tokenUsage?: { input: number; output: number; total: number }
}>

export class StepAttemptRunner {
  /** 重试上限与退避序列（毫秒；缺省为测试友好的紧凑值，运行时由 config 注入真实值）。 */
  private readonly maxAttempts: number
  private readonly backoffDelaysMs: number[]

  constructor(
    private readonly stepsRepo: DomainRepository<StepRecord, StepId>,
    private readonly attemptsRepo: DomainRepository<AttemptRecord, AttemptId>,
    private readonly executeStep: StepExecutorFunction,
    options: { maxAttempts?: number; backoffDelaysMs?: number[] } = {},
  ) {
    this.maxAttempts = options.maxAttempts ?? MAX_STEP_ATTEMPTS
    this.backoffDelaysMs = options.backoffDelaysMs ?? BACKOFF_DELAYS_MS
  }

  /**
   * Run a step with automatic retry and ground-truth verification checks.
   */
  async runStepWithRetry(
    step: StepRecord,
    cwd: string,
    onAttemptStart?: (attempt: AttemptRecord) => void,
  ): Promise<StepRecord> {
    if (step.status === 'pending') {
      assertStepTransition(step.status, 'ready')
      step.status = 'ready'
    }
    assertStepTransition(step.status, 'running')
    step.status = 'running'
    step.updatedAt = Date.now()
    await this.stepsRepo.save(step)

    let lastError = ''

    while (step.attemptsCount < this.maxAttempts) {
      step.attemptsCount++
      const attemptNumber = step.attemptsCount

      // Create new Attempt
      const attempt: AttemptRecord = {
        id: createAttemptId(),
        stepId: step.id,
        runId: step.runId,
        projectId: step.projectId,
        attemptNumber,
        status: 'running',
        startedAt: Date.now(),
      }
      await this.attemptsRepo.save(attempt)
      onAttemptStart?.(attempt)

      try {
        const result = await this.executeStep(step, attempt, cwd)

        attempt.tokenUsage = result.tokenUsage
        attempt.finishedAt = Date.now()

        // Ground-truth check: Verified success is required, not just model claim
        if (result.verifiedSuccess) {
          assertAttemptTransition(attempt.status, 'succeeded')
          attempt.status = 'succeeded'
          await this.attemptsRepo.save(attempt)

          assertStepTransition(step.status, 'succeeded')
          step.status = 'succeeded'
          step.verifiedOutcome = true
          step.claimedOutcome = 'Success verified by checks'
          step.updatedAt = Date.now()
          await this.stepsRepo.save(step)
          return step
        }

        // Verification failed
        lastError = result.error ?? 'Verification checks failed'
        assertAttemptTransition(attempt.status, 'failed')
        attempt.status = 'failed'
        attempt.error = lastError
        await this.attemptsRepo.save(attempt)
      } catch (err: unknown) {
        lastError = (err as Error).message
        assertAttemptTransition(attempt.status, 'failed')
        attempt.status = 'failed'
        attempt.error = lastError
        attempt.finishedAt = Date.now()
        await this.attemptsRepo.save(attempt)
      }

      // Check if more retries allowed
      if (step.attemptsCount < MAX_STEP_ATTEMPTS) {
        assertStepTransition(step.status, 'retrying')
        step.status = 'retrying'
        step.updatedAt = Date.now()
        await this.stepsRepo.save(step)

        // Backoff delay
        const delay = this.backoffDelaysMs[attemptNumber] ?? this.backoffDelaysMs.at(-1) ?? 10
        if (delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay))
        }

        assertStepTransition(step.status, 'running')
        step.status = 'running'
        await this.stepsRepo.save(step)
      }
    }

    // Exhausted retries
    assertStepTransition(step.status, 'failed')
    step.status = 'failed'
    step.verifiedOutcome = false
    step.claimedOutcome = `Failed after ${this.maxAttempts} attempts: ${lastError}`
    step.updatedAt = Date.now()
    await this.stepsRepo.save(step)
    return step
  }
}
