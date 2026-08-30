import { describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import Storage from '@deepseek-ai/dsh-storage'
import { DomainFacility } from '@deepseek-ai/dsh-storage-domain'
import { MemoryMediaPool, MemoryStorageBackend } from '../../packages/storage/storage-domain/tests/helpers/memory-backend.ts'
import {
  coreDomainSpec,
  analysisDomainSpec,
  historyDomainSpec,
} from '../src/store/domains.ts'
import { DomainRepository, type ProjectControlStore } from '../src/store/repository.ts'
import {
  createProjectId,
  createChangeId,
  createPlanId,
  createRunId,
  createStepId,
  createAttemptId,
  createEvidenceId,
  createIssueId,
  createVerificationId,
  createMemoryId,
} from '../src/domain/ids.ts'
import type {
  ProjectRecord,
  ChangeRecord,
  PlanRecord,
  RunRecord,
  StepRecord,
  AttemptRecord,
  EvidenceRecord,
  ReviewIssueRecord,
  VerificationRecord,
  MemoryRecord,
} from '../src/domain/models.ts'

async function createStore(): Promise<{ store: ProjectControlStore; close: () => Promise<void> }> {
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
    projects: new DomainRepository<ProjectRecord>(core.table('projects')),
    changes: new DomainRepository<ChangeRecord>(core.table('changes')),
    plans: new DomainRepository<PlanRecord>(core.table('plans')),
    runs: new DomainRepository<RunRecord>(core.table('runs')),
    steps: new DomainRepository<StepRecord>(core.table('steps')),
    attempts: new DomainRepository<AttemptRecord>(core.table('attempts')),
    evidence: new DomainRepository<EvidenceRecord>(analysis.table('evidence')),
    issues: new DomainRepository<ReviewIssueRecord>(history.table('issues')),
    verifications: new DomainRepository<VerificationRecord>(history.table('verifications')),
    memories: new DomainRepository<MemoryRecord>(history.table('memories')),
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

describe('Three-Domain Repository System (T1.4)', () => {
  it('performs full lifecycle CRUD and projectId indexing across all repositories', async () => {
    const { store, close } = await createStore()

    const projectId1 = createProjectId()
    const projectId2 = createProjectId()

    // 1. Projects
    const project1: ProjectRecord = {
      id: projectId1,
      name: 'Project 1',
      identity: { rootPath: '/repo1', rootCommitHash: 'sha1' },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await store.projects.save(project1)
    expect(store.projects.get(projectId1)).toEqual(project1)

    // 2. Changes
    const change1: ChangeRecord = {
      id: createChangeId(),
      projectId: projectId1,
      title: 'Feature A',
      description: 'Add feature A',
      status: 'draft',
      baseRevision: 'sha1',
      revision: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    const change2: ChangeRecord = {
      id: createChangeId(),
      projectId: projectId2,
      title: 'Feature B',
      description: 'Add feature B',
      status: 'draft',
      baseRevision: 'sha2',
      revision: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await store.changes.save(change1)
    await store.changes.save(change2)

    // Index by project
    expect(store.changes.listByProject(projectId1)).toEqual([change1])
    expect(store.changes.listByProject(projectId2)).toEqual([change2])

    // 3. Plans
    const plan1: PlanRecord = {
      id: createPlanId(),
      changeId: change1.id,
      projectId: projectId1,
      version: 1,
      title: 'Plan A',
      steps: [{ id: createStepId(), title: 'Step 1', description: 'Do step 1', dependencies: [] }],
      createdAt: Date.now(),
    }
    await store.plans.save(plan1)
    expect(store.plans.get(plan1.id)).toEqual(plan1)

    // 4. Runs & Steps & Attempts
    const run1: RunRecord = {
      id: createRunId(),
      changeId: change1.id,
      planId: plan1.id,
      projectId: projectId1,
      status: 'running',
      isolationMode: 'current',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await store.runs.save(run1)

    const step1: StepRecord = {
      id: createStepId(),
      runId: run1.id,
      planStepId: plan1.steps[0]!.id,
      projectId: projectId1,
      status: 'running',
      attemptsCount: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await store.steps.save(step1)

    const attempt1: AttemptRecord = {
      id: createAttemptId(),
      stepId: step1.id,
      runId: run1.id,
      projectId: projectId1,
      attemptNumber: 1,
      status: 'running',
      startedAt: Date.now(),
    }
    await store.attempts.save(attempt1)

    // 5. Evidence
    const evidence1: EvidenceRecord = {
      id: createEvidenceId(),
      projectId: projectId1,
      changeId: change1.id,
      source: 'git_diff',
      truthLevel: 'fact',
      locator: 'diff:index.ts:L1-L10',
      contentHash: 'hash_123',
      createdAt: Date.now(),
    }
    await store.evidence.save(evidence1)
    expect(store.evidence.listByProject(projectId1)).toEqual([evidence1])

    // 6. Delete item
    await store.changes.delete(change1.id)
    expect(store.changes.get(change1.id)).toBeUndefined()
    expect(store.changes.listByProject(projectId1)).toEqual([])

    await close()
  })
})
