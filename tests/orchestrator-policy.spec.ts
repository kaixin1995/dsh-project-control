// 集成测试：强制收尾验收门（真实命令两走向）+ 失败策略（ask 暂停问人 / skip 跳过继续）。
import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { RunOrchestrator } from '../src/runtime/orchestrator.ts'
import { createInMemoryStore } from '../src/store/repository.ts'
import { GitAdapter } from '../src/git/adapter.ts'
import { EvidenceManager } from '../src/analysis/evidence.ts'
import { createChangeId, createPlanId, createProjectId, createRunId, createStepId } from '../src/domain/ids.ts'
import type { ChangeRecord, PlanRecord, RunRecord, StepRecord } from '../src/domain/models.ts'
import { PROJECT_CONTROL_DEFAULTS } from '../src/config.ts'

const git = new GitAdapter()

describe('收尾验收门与失败策略（编排器集成）', () => {
  let repo: string
  const ctx = { logger: { info: () => {}, warn: () => {} } } as never

  const makeOrchestrator = (overrides: Record<string, unknown>): { orchestrator: RunOrchestrator; store: ReturnType<typeof createInMemoryStore> } => {
    const store = createInMemoryStore()
    const orchestrator = new RunOrchestrator({
      ctx,
      store: store as never,
      git,
      config: () => ({ ...PROJECT_CONTROL_DEFAULTS, ...overrides }) as never,
      evidenceManager: new EvidenceManager(),
    })
    return { orchestrator, store }
  }

  const seedRun = (store: ReturnType<typeof createInMemoryStore>, policy: string) => {
    const projectId = createProjectId() as never
    const change: ChangeRecord = {
      id: createChangeId(), projectId, title: '门测试', description: 'x',
      status: 'ready', baseRevision: '', revision: 1, createdAt: Date.now(), updatedAt: Date.now(),
    }
    const planStepId = createStepId()
    const plan: PlanRecord = {
      id: createPlanId(), changeId: change.id, projectId, version: 1, title: 'p',
      steps: [{ id: planStepId, title: '唯一步骤', description: '做点事', dependencies: [], role: 'coding', failurePolicy: policy as never }],
      createdAt: Date.now(),
    }
    change.currentPlanId = plan.id
    const run: RunRecord = {
      id: createRunId(), changeId: change.id, planId: plan.id, projectId,
      status: 'running', isolationMode: 'current', workspaceId: 'current',
      createdAt: Date.now(), updatedAt: Date.now(),
    }
    const step: StepRecord = {
      id: createStepId(), runId: run.id, planStepId, projectId,
      status: 'pending', attemptsCount: 0, createdAt: Date.now(), updatedAt: Date.now(),
    }
    store.projects.save({ id: projectId, name: 'gate', identity: { rootPath: repo, rootCommitHash: 'x' }, createdAt: Date.now(), updatedAt: Date.now() } as never)
    store.changes.save(change)
    store.plans.save(plan)
    store.runs.save(run)
    store.steps.save(step)
    return { run, change, plan, step }
  }

  beforeAll(() => {
    repo = mkdtempSync(join(tmpdir(), 'pc-gate-'))
    const env = { ...process.env, GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@x', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@x' }
    execFileSync('git', ['init', '-q'], { cwd: repo, env })
    writeFileSync(join(repo, 'a.txt'), 'a\n')
    execFileSync('git', ['add', '.'], { cwd: repo, env })
    execFileSync('git', ['commit', '-qm', 'init'], { cwd: repo, env })
  })

  afterAll(() => {
    rmSync(repo, { recursive: true, force: true })
  })

  it('验收门：build 命令通过 → Run 成功且验收记录为 passed', async () => {
    const { orchestrator, store } = makeOrchestrator({ buildCommand: 'node -v', finalVerificationGate: true })
    const { run, change, plan, step } = seedRun(store, 'retry-escalate')
    // mock runner：唯一步骤直接成功
    ;(orchestrator as unknown as { runner: { runStepWithRetry: () => Promise<StepRecord> } }).runner = {
      runStepWithRetry: async (s: StepRecord) => {
        s.status = 'succeeded'
        s.verifiedOutcome = true
        s.claimedOutcome = 'done'
        return s
      },
    }
    await (orchestrator as unknown as { executeRun(r: RunRecord, c: ChangeRecord, p: PlanRecord): Promise<void> }).executeRun(run, change, plan)
    const fresh = store.runs.get(run.id)!
    expect(fresh.status).toBe('succeeded')
    const verifications = store.verifications.list()
    expect(verifications.length).toBe(1)
    expect(verifications[0]!.status).toBe('passed')
    expect(verifications[0]!.name).toContain('node -v')
    void step
  })

  it('验收门：test 命令失败（exit 1）→ Run 失败且验收记录为 failed', async () => {
    const { orchestrator, store } = makeOrchestrator({ testCommand: 'node -e process.exit(1)', finalVerificationGate: true })
    const { run, change, plan } = seedRun(store, 'retry-escalate')
    ;(orchestrator as unknown as { runner: { runStepWithRetry: () => Promise<StepRecord> } }).runner = {
      runStepWithRetry: async (s: StepRecord) => {
        s.status = 'succeeded'
        s.verifiedOutcome = true
        s.claimedOutcome = 'done'
        return s
      },
    }
    await (orchestrator as unknown as { executeRun(r: RunRecord, c: ChangeRecord, p: PlanRecord): Promise<void> }).executeRun(run, change, plan)
    const fresh = store.runs.get(run.id)!
    expect(fresh.status).toBe('failed')
    expect(fresh.error?.message).toContain('收尾验收未通过')
    const verifications = store.verifications.list()
    expect(verifications[0]!.status).toBe('failed')
  })

  it('失败策略 ask：步骤重试耗尽 → Run 暂停并记录 pausePoint', async () => {
    const { orchestrator, store } = makeOrchestrator({})
    const { run, change, plan, step } = seedRun(store, 'ask')
    ;(orchestrator as unknown as { runner: { runStepWithRetry: () => Promise<StepRecord> } }).runner = {
      runStepWithRetry: async (s: StepRecord) => {
        s.status = 'failed'
        s.claimedOutcome = 'Failed after 3 attempts: boom'
        return s
      },
    }
    await (orchestrator as unknown as { executeRun(r: RunRecord, c: ChangeRecord, p: PlanRecord): Promise<void> }).executeRun(run, change, plan)
    const fresh = store.runs.get(run.id)!
    expect(fresh.status).toBe('paused')
    expect(fresh.pausePoint?.stepId).toBe(step.id)
    expect(fresh.pausePoint?.reason).toContain('boom')
    const runContext = store.runContexts.get(run.id)!
    expect(runContext.decisionLog.some((entry) => entry.kind === 'paused')).toBe(true)
  })

  it('失败策略 skip：步骤失败被跳过 → Run 继续并最终成功', async () => {
    const { orchestrator, store } = makeOrchestrator({ finalVerificationGate: false })
    const { run, change, plan, step } = seedRun(store, 'skip')
    ;(orchestrator as unknown as { runner: { runStepWithRetry: () => Promise<StepRecord> } }).runner = {
      runStepWithRetry: async (s: StepRecord) => {
        s.status = 'failed'
        s.claimedOutcome = 'Failed after 3 attempts: boom'
        return s
      },
    }
    await (orchestrator as unknown as { executeRun(r: RunRecord, c: ChangeRecord, p: PlanRecord): Promise<void> }).executeRun(run, change, plan)
    const freshRun = store.runs.get(run.id)!
    expect(freshRun.status).toBe('succeeded')
    const freshStep = store.steps.get(step.id)!
    expect(freshStep.status).toBe('skipped')
    const runContext = store.runContexts.get(run.id)!
    expect(runContext.decisionLog.some((entry) => entry.kind === 'skipped')).toBe(true)
  })
})
