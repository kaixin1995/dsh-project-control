import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import { Context } from '@deepseek-ai/cordis'
import Storage from '@deepseek-ai/dsh-storage'
import { DomainFacility } from '@deepseek-ai/dsh-storage-domain'
import { MemoryMediaPool, MemoryStorageBackend } from '../../packages/storage/storage-domain/tests/helpers/memory-backend.ts'
import {
  coreDomainSpec,
  analysisDomainSpec,
  historyDomainSpec,
  DomainRepository,
  ProjectService,
  GitAdapter,
  GenericLanguageAnalyzer,
  BootstrapPipeline,
  ChangeService,
  PlanDagScheduler,
  WorktreeManager,
  StepAttemptRunner,
  EvidenceManager,
  ProjectGraph,
  ImpactEngine,
  ContractAnalyzer,
  DeterministicBuildVerifier,
  UnitTestVerifier,
  EvidenceDiffVerifier,
  LlmReviewVerifier,
  VerificationRunner,
  ReviewIssueManager,
  MemoryService,
  ConceptService,
  PatternLearner,
  createPlanId,
  createStepId,
  type ProjectControlStore,
  type ProjectRecord,
  type ChangeRecord,
  type PlanRecord,
  type StepRecord,
  type AttemptRecord,
  type EvidenceRecord,
  type ReviewIssueRecord,
  type VerificationRecord,
  type MemoryRecord,
  type ConceptRecord,
} from '../src/index.ts'

async function createFullStore(): Promise<{ store: ProjectControlStore; close: () => Promise<void> }> {
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
    runs: new DomainRepository(core.table('runs')),
    steps: new DomainRepository<StepRecord>(core.table('steps')),
    attempts: new DomainRepository<AttemptRecord>(core.table('attempts')),
    evidence: new DomainRepository<EvidenceRecord>(analysis.table('evidence')),
    issues: new DomainRepository<ReviewIssueRecord>(history.table('issues')),
    verifications: new DomainRepository<VerificationRecord>(history.table('verifications')),
    memories: new DomainRepository<MemoryRecord>(history.table('memories')),
    concepts: new DomainRepository<ConceptRecord>(history.table('concepts')),
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

describe('End-to-End Full Lifecycle Integration (T11.2)', () => {
  let tempRepo: string
  const git = new GitAdapter()
  const languageAnalyzer = new GenericLanguageAnalyzer()
  const evidenceManager = new EvidenceManager()
  const contractAnalyzer = new ContractAnalyzer()

  beforeEach(() => {
    tempRepo = mkdtempSync(join(tmpdir(), 'dsh-e2e-test-'))
    execSync('git init -b main', { cwd: tempRepo })
    execSync('git config user.name "E2E Runner"', { cwd: tempRepo })
    execSync('git config user.email "e2e@example.com"', { cwd: tempRepo })
    execSync('git config commit.gpgsign false', { cwd: tempRepo })

    writeFileSync(join(tempRepo, 'package.json'), JSON.stringify({ name: 'my-e2e-app', version: '1.0.0' }), 'utf8')
    writeFileSync(
      join(tempRepo, 'app.ts'),
      'export interface User { id: string; name: string }\nexport function getUser(id: string): User { return { id, name: "Alice" } }\n',
      'utf8',
    )
    execSync('git add . && git commit -m "feat: initial commit"', { cwd: tempRepo })
  })

  afterEach(() => {
    rmSync(tempRepo, { recursive: true, force: true })
  })

  it('runs complete lifecycle: Project -> Bootstrap -> Change -> Plan -> Worktree -> Run -> Impact -> Verification -> Memory -> Learning', async () => {
    const { store, close } = await createFullStore()

    // -------------------------------------------------------------------------
    // 1. Project Identification
    // -------------------------------------------------------------------------
    const projectService = new ProjectService(store.projects, (args, cwd) => git.runGit(args, cwd))
    const projectResult = await projectService.ensureProject(tempRepo, 'E2E App')
    expect(projectResult.project.id.startsWith('prj_')).toBe(true)
    const projectId = projectResult.project.id

    // -------------------------------------------------------------------------
    // 2. Legacy Bootstrap Onboarding
    // -------------------------------------------------------------------------
    const bootstrapPipeline = new BootstrapPipeline(git, languageAnalyzer, store.projects as any)
    const checkpoint = await bootstrapPipeline.runBootstrap(projectId, tempRepo)
    expect(checkpoint.techStack).toContain('Node.js / TypeScript / JavaScript')
    expect(checkpoint.topLevelSymbols.some(s => s.name === 'getUser')).toBe(true)

    // -------------------------------------------------------------------------
    // 3. Create Change & Pin baseRevision
    // -------------------------------------------------------------------------
    const changeService = new ChangeService(store.changes, git, evidenceManager)
    const change = await changeService.createChange(projectId, 'Add Payment Module', 'Implement Stripe webhook', tempRepo)
    expect(change.status).toBe('draft')

    // -------------------------------------------------------------------------
    // 4. Plan Generation & DAG Topological Sort
    // -------------------------------------------------------------------------
    const dagScheduler = new PlanDagScheduler()
    const step1Id = createStepId()
    const step2Id = createStepId()

    const planRecord: PlanRecord = {
      id: createPlanId(),
      changeId: change.id,
      projectId,
      version: 1,
      title: 'Payment Integration Plan',
      steps: [
        { id: step1Id, title: 'Add payment DTO', description: 'Create types', dependencies: [] },
        { id: step2Id, title: 'Add payment service', description: 'Call Stripe API', dependencies: [step1Id] },
      ],
      createdAt: Date.now(),
    }
    await store.plans.save(planRecord)

    const sortedSteps = dagScheduler.topologicalSort(planRecord.steps)
    expect(sortedSteps[0]!.id).toBe(step1Id)
    expect(sortedSteps[1]!.id).toBe(step2Id)

    // -------------------------------------------------------------------------
    // 5. Worktree Isolation & Execution
    // -------------------------------------------------------------------------
    const worktreeManager = new WorktreeManager(git)
    const runId = createPlanId() as any
    const worktree = await worktreeManager.createIsolatedWorktree(tempRepo, runId)

    // Write change files inside worktree
    writeFileSync(
      join(worktree.worktreePath, 'payment.ts'),
      'export interface PaymentPayload { amount: number }\nexport function processPayment(p: PaymentPayload) { return true }\n',
      'utf8',
    )
    execSync('git add payment.ts && git commit -m "feat(payment): add payment logic"', { cwd: worktree.worktreePath })

    // Step Execution with StepAttemptRunner
    const stepRecord: StepRecord = {
      id: step1Id,
      runId,
      planStepId: step1Id,
      projectId,
      status: 'pending',
      attemptsCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await store.steps.save(stepRecord)

    const stepRunner = new StepAttemptRunner(store.steps, store.attempts, async () => {
      return { claimedSuccess: true, verifiedSuccess: true }
    })
    const executedStep = await stepRunner.runStepWithRetry(stepRecord, worktree.worktreePath)
    expect(executedStep.status).toBe('succeeded')

    // Clean up worktree
    await worktree.dispose()

    // -------------------------------------------------------------------------
    // 6. Merge & Git Change Analysis
    // -------------------------------------------------------------------------
    writeFileSync(
      join(tempRepo, 'payment.ts'),
      'export interface PaymentPayload { amount: number }\nexport function processPayment(p: PaymentPayload) { return true }\n',
      'utf8',
    )
    execSync('git add payment.ts && git commit -m "feat(payment): merge payment logic"', { cwd: tempRepo })

    const changeAnalysis = await changeService.analyzeChange(change.id, tempRepo)
    expect(changeAnalysis.filesChanged).toBeGreaterThanOrEqual(1)
    expect(changeAnalysis.commits.length).toBeGreaterThanOrEqual(1)
    expect(changeAnalysis.evidenceId.startsWith('evi_')).toBe(true)

    // -------------------------------------------------------------------------
    // 7. Impact Engine & Contract Analysis
    // -------------------------------------------------------------------------
    const graph = new ProjectGraph()
    graph.addNode({ id: 'payment.ts', type: 'file', label: 'payment.ts', filePath: 'payment.ts' })
    graph.addNode({ id: 'app.ts', type: 'file', label: 'app.ts', filePath: 'app.ts' })
    graph.addEdge({ source: 'app.ts', target: 'payment.ts', type: 'imports' })

    const impactEngine = new ImpactEngine()
    const impact = impactEngine.computeImpact(['payment.ts'], graph)
    expect(impact.affectedFiles).toContain('payment.ts')
    expect(impact.affectedFiles).toContain('app.ts')

    const contractResult = contractAnalyzer.analyze('payment.ts', 'export interface PaymentPayload { amount: number }')
    expect(contractResult.hasContractModifications).toBe(true)
    expect(contractResult.findings[0]!.name).toBe('PaymentPayload')

    // -------------------------------------------------------------------------
    // 8. 4-Tier Verification Pipeline & Review Issues
    // -------------------------------------------------------------------------
    const issueManager = new ReviewIssueManager(store.issues)
    const verificationRunner = new VerificationRunner(store.verifications, [
      new DeterministicBuildVerifier(async () => ({ success: true, output: 'Build passed' })),
      new UnitTestVerifier(async () => ({ passed: true, details: 'All tests passed' })),
      new EvidenceDiffVerifier(),
      new LlmReviewVerifier(async () => ({ passed: true, critique: 'Well structured' })),
    ])

    const verificationOutcome = await verificationRunner.runPipeline({
      projectId,
      changeId: change.id,
      cwd: tempRepo,
      changedFiles: ['payment.ts'],
      diffPatch: '+export interface PaymentPayload',
      evidenceIds: [changeAnalysis.evidenceId as any],
    })
    expect(verificationOutcome.allPassed).toBe(true)
    expect(verificationOutcome.records.length).toBe(4)

    // Verify change status transitions to completed
    await changeService.updateStatus(change.id, 'ready')
    await changeService.updateStatus(change.id, 'executing')
    await changeService.updateStatus(change.id, 'reviewing')
    await changeService.updateStatus(change.id, 'verifying')
    const completedChange = await changeService.updateStatus(change.id, 'completed')
    expect(completedChange.status).toBe('completed')

    // -------------------------------------------------------------------------
    // 9. Memory Crystallization & Continuous Learning
    // -------------------------------------------------------------------------
    const memoryService = new MemoryService(store.memories)
    const decisionMemory = await memoryService.recordMemory({
      projectId,
      type: 'architecture_decision',
      truthLevel: 'fact',
      title: 'Stripe Webhook Isolation',
      content: 'Payment module isolated into dedicated handler with verified idempotency',
      relatedFiles: ['payment.ts'],
      isHumanConfirmed: true,
    })
    expect(decisionMemory.truthLevel).toBe('fact')

    const conceptService = new ConceptService(store.concepts!)
    const patternLearner = new PatternLearner(conceptService)
    const learnedConcept = await patternLearner.learnFromResolution(projectId, {
      failedError: 'Stripe API signature mismatch',
      successfulResolution: 'Compute HMAC with raw request body buffer',
      filePath: 'payment.ts',
    })
    expect(learnedConcept.occurrences).toBe(1)
    expect(learnedConcept.examples[0]!.filePath).toBe('payment.ts')

    await close()
  })
})
