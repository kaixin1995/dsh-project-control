import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import { Context } from '@deepseek-ai/cordis'
import Storage from '@deepseek-ai/dsh-storage'
import { DomainFacility } from '@deepseek-ai/dsh-storage-domain'
import { MemoryMediaPool, MemoryStorageBackend } from '../../packages/storage/storage-domain/tests/helpers/memory-backend.ts'
import { coreDomainSpec, analysisDomainSpec, historyDomainSpec } from '../src/store/domains.ts'
import { DomainRepository, type ProjectControlStore } from '../src/store/repository.ts'
import { PlanDagScheduler, DagCycleError } from '../src/runtime/dag.ts'
import { StepAttemptRunner } from '../src/runtime/runner.ts'
import { WorktreeManager } from '../src/runtime/worktree.ts'
import { RecoveryScanner } from '../src/runtime/recovery.ts'
import { GitAdapter } from '../src/git/adapter.ts'
import {
  createProjectId,
  createChangeId,
  createPlanId,
  createRunId,
  createStepId,
  createAttemptId,
} from '../src/domain/ids.ts'
import type {
  PlanStepDefinition,
  StepRecord,
  RunRecord,
  AttemptRecord,
} from '../src/domain/models.ts'

async function createTestStore(): Promise<{ store: ProjectControlStore; close: () => Promise<void> }> {
  const ctx = new Context()
  await ctx.plugin(Storage)
  const backend = new MemoryStorageBackend(new MemoryMediaPool())
  ctx.storage.backend.register('memory', backend)
  const facility = new DomainFacility(ctx, { backend: 'memory', routes: {} })
  ctx.storage.mount('domain', facility)

  const core = await facility.open(coreDomainSpec)
  const analysis = await facility.open(analysisDomainSpec)
  const history = await facility.open(historyDomainSpec)

  const store: ProjectControlStore = {
    projects: new DomainRepository(core.table('projects')),
    changes: new DomainRepository(core.table('changes')),
    plans: new DomainRepository(core.table('plans')),
    runs: new DomainRepository(core.table('runs')),
    steps: new DomainRepository(core.table('steps')),
    attempts: new DomainRepository(core.table('attempts')),
    evidence: new DomainRepository(analysis.table('evidence')),
    issues: new DomainRepository(history.table('issues')),
    verifications: new DomainRepository(history.table('verifications')),
    memories: new DomainRepository(history.table('memories')),
  }

  return {
    store,
    close: async () => {
      await core.close()
      await analysis.close()
      await history.close()
    },
  }
}

describe('Execution Runtime (T4.1 - T4.5)', () => {
  let tempRepo: string
  const git = new GitAdapter()

  beforeEach(() => {
    tempRepo = mkdtempSync(join(tmpdir(), 'dsh-runtime-test-'))
    execSync('git init -b main', { cwd: tempRepo })
    execSync('git config user.name "Runner"', { cwd: tempRepo })
    execSync('git config user.email "runner@example.com"', { cwd: tempRepo })
    execSync('git config commit.gpgsign false', { cwd: tempRepo })
    writeFileSync(join(tempRepo, 'init.txt'), 'init\n', 'utf8')
    execSync('git add init.txt && git commit -m "init"', { cwd: tempRepo })
  })

  afterEach(() => {
    rmSync(tempRepo, { recursive: true, force: true })
  })

  it('T4.1: schedules diamond DAG and detects cyclic dependency', () => {
    const scheduler = new PlanDagScheduler()
    const s1 = createStepId()
    const s2 = createStepId()
    const s3 = createStepId()
    const s4 = createStepId()

    // Diamond DAG: s1 -> s2, s1 -> s3, s2 & s3 -> s4
    const steps: PlanStepDefinition[] = [
      { id: s4, title: 'Step 4', description: '', dependencies: [s2, s3] },
      { id: s2, title: 'Step 2', description: '', dependencies: [s1] },
      { id: s1, title: 'Step 1', description: '', dependencies: [] },
      { id: s3, title: 'Step 3', description: '', dependencies: [s1] },
    ]

    const sorted = scheduler.topologicalSort(steps)
    expect(sorted[0]!.id).toBe(s1)
    expect(sorted[3]!.id).toBe(s4)

    // Ready step check
    const stepRecords: StepRecord[] = [
      { id: s1, runId: createRunId(), planStepId: s1, projectId: createProjectId(), status: 'succeeded', attemptsCount: 1, createdAt: 0, updatedAt: 0 },
    ]
    const ready = scheduler.getReadySteps(steps, stepRecords)
    expect(ready.map(r => r.id).sort()).toEqual([s2, s3].sort())

    // Cycle detection
    const cyclicSteps: PlanStepDefinition[] = [
      { id: s1, title: 'Step 1', description: '', dependencies: [s2] },
      { id: s2, title: 'Step 2', description: '', dependencies: [s1] },
    ]
    expect(() => scheduler.topologicalSort(cyclicSteps)).toThrow(DagCycleError)
  })

  it('T4.2 & T4.4: runs step attempt with retry and backoff, verifies ground truth', async () => {
    const { store, close } = await createTestStore()
    const projectId = createProjectId()
    const runId = createRunId()
    const stepId = createStepId()

    const step: StepRecord = {
      id: stepId,
      runId,
      planStepId: stepId,
      projectId,
      status: 'pending',
      attemptsCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await store.steps.save(step)

    let executionCount = 0
    const mockExecutor = async () => {
      executionCount++
      if (executionCount < 2) {
        // First attempt fails verification
        return { claimedSuccess: true, verifiedSuccess: false, error: 'Compiler error' }
      }
      // Second attempt succeeds verification
      return { claimedSuccess: true, verifiedSuccess: true }
    }

    const runner = new StepAttemptRunner(store.steps, store.attempts, mockExecutor)
    const result = await runner.runStepWithRetry(step, tempRepo)

    expect(result.status).toBe('succeeded')
    expect(result.attemptsCount).toBe(2)
    expect(result.verifiedOutcome).toBe(true)

    // Check attempts in store
    const attempts = store.attempts.list(a => a.stepId === step.id)
    expect(attempts.length).toBe(2)
    expect(attempts[0]!.status).toBe('failed')
    expect(attempts[1]!.status).toBe('succeeded')

    await close()
  })

  it('T4.3: manages isolated git worktree lifecycle', async () => {
    const worktreeManager = new WorktreeManager(git)
    const runId = createRunId()

    const isolation = await worktreeManager.createIsolatedWorktree(tempRepo, runId)
    expect(existsSync(isolation.worktreePath)).toBe(true)

    // Write file only in worktree
    writeFileSync(join(isolation.worktreePath, 'isolated.txt'), 'isolated data\n', 'utf8')
    expect(existsSync(join(isolation.worktreePath, 'isolated.txt'))).toBe(true)
    expect(existsSync(join(tempRepo, 'isolated.txt'))).toBe(false) // Not in main repo

    // Dispose
    await isolation.dispose()
    expect(existsSync(isolation.worktreePath)).toBe(false)
  })

  it('T4.5: RecoveryScanner detects and recovers crashed runs cleanly', async () => {
    const { store, close } = await createTestStore()
    const projectId = createProjectId()
    const runId = createRunId()
    const stepId = createStepId()
    const attemptId = createAttemptId()

    const crashedRun: RunRecord = {
      id: runId,
      changeId: createChangeId(),
      planId: createPlanId(),
      projectId,
      status: 'running',
      isolationMode: 'current',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await store.runs.save(crashedRun)

    const crashedStep: StepRecord = {
      id: stepId,
      runId,
      planStepId: stepId,
      projectId,
      status: 'running',
      attemptsCount: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await store.steps.save(crashedStep)

    const crashedAttempt: AttemptRecord = {
      id: attemptId,
      stepId,
      runId,
      projectId,
      attemptNumber: 1,
      status: 'running',
      startedAt: Date.now(),
    }
    await store.attempts.save(crashedAttempt)

    // Run recovery
    const scanner = new RecoveryScanner(store)
    const recoveryResult = await scanner.scanAndRecover(projectId)

    expect(recoveryResult.interruptedRuns).toBe(1)
    expect(recoveryResult.interruptedSteps).toBe(1)
    expect(recoveryResult.interruptedAttempts).toBe(1)

    expect(store.runs.get(runId)?.status).toBe('interrupted')
    expect(store.steps.get(stepId)?.status).toBe('interrupted')
    expect(store.attempts.get(attemptId)?.status).toBe('interrupted')

    await close()
  })
})
