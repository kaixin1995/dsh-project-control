import { describe, expect, it } from 'vitest'
import { purgeResolvedIssues } from '../src/plugin/api-route.ts'
import { Context } from '@deepseek-ai/cordis'
import Storage from '@deepseek-ai/dsh-storage'
import { DomainFacility } from '@deepseek-ai/dsh-storage-domain'
import { MemoryMediaPool, MemoryStorageBackend } from '../../packages/storage/storage-domain/tests/helpers/memory-backend.ts'
import { historyDomainSpec } from '../src/store/domains.ts'
import { DomainRepository } from '../src/store/repository.ts'
import {
  DeterministicBuildVerifier,
  UnitTestVerifier,
  EvidenceDiffVerifier,
  LlmReviewVerifier,
} from '../src/verification/verifier.ts'
import { ReviewIssueManager } from '../src/verification/issues.ts'
import { VerificationRunner } from '../src/verification/service.ts'
import { createProjectId, createChangeId, createEvidenceId } from '../src/domain/ids.ts'
import type { ReviewIssueRecord, VerificationRecord } from '../src/domain/models.ts'

async function createVerificationRepos() {
  const ctx = new Context()
  await ctx.plugin(Storage)
  const backend = new MemoryStorageBackend(new MemoryMediaPool())
  ctx.storage.backend.register('memory', backend)
  const facility = new DomainFacility(ctx, { backend: 'memory', routes: {} })
  ctx.storage.mount('domain', facility)

  const history = await facility.open(historyDomainSpec)
  const issuesRepo = new DomainRepository<ReviewIssueRecord>(history.table('issues'))
  const verificationsRepo = new DomainRepository<VerificationRecord>(history.table('verifications'))

  return {
    issuesRepo,
    verificationsRepo,
    close: () => history.close(),
  }
}

describe('Review & Verification Engine (T6.1 - T6.4)', () => {
  it('T6.1 & T6.4: runs verification pipeline with tier short-circuiting', async () => {
    const { verificationsRepo, close } = await createVerificationRepos()
    const projectId = createProjectId()
    const changeId = createChangeId()
    const evidenceId = createEvidenceId()

    let llmCalled = false
    const buildVerifier = new DeterministicBuildVerifier(async () => ({ success: false, output: 'SyntaxError' }))
    const testVerifier = new UnitTestVerifier(async () => ({ passed: true, details: '10 tests passed' }))
    const evidenceVerifier = new EvidenceDiffVerifier()
    const llmVerifier = new LlmReviewVerifier(async () => {
      llmCalled = true
      return { passed: true, critique: 'LGTM' }
    })

    const runner = new VerificationRunner(verificationsRepo, [
      buildVerifier,
      testVerifier,
      evidenceVerifier,
      llmVerifier,
    ])

    const result = await runner.runPipeline({
      projectId,
      changeId,
      cwd: '/workspace',
      changedFiles: ['index.ts'],
      diffPatch: 'diff --git a/index.ts b/index.ts',
      evidenceIds: [evidenceId],
    })

    expect(result.allPassed).toBe(false)
    expect(result.hasDeterministicFailure).toBe(true)
    // Deterministic build failed, so Tier 3 LLM review should have been short-circuited!
    expect(llmCalled).toBe(false)

    await close()
  })

  it('T6.1: passes all tiers when build and tests succeed', async () => {
    const { verificationsRepo, close } = await createVerificationRepos()
    const projectId = createProjectId()
    const changeId = createChangeId()
    const evidenceId = createEvidenceId()

    let llmCalled = false
    const buildVerifier = new DeterministicBuildVerifier(async () => ({ success: true, output: 'Build OK' }))
    const testVerifier = new UnitTestVerifier(async () => ({ passed: true, details: 'All tests OK' }))
    const evidenceVerifier = new EvidenceDiffVerifier()
    const llmVerifier = new LlmReviewVerifier(async () => {
      llmCalled = true
      return { passed: true, critique: 'Clean architecture' }
    })

    const runner = new VerificationRunner(verificationsRepo, [
      buildVerifier,
      testVerifier,
      evidenceVerifier,
      llmVerifier,
    ])

    const result = await runner.runPipeline({
      projectId,
      changeId,
      cwd: '/workspace',
      changedFiles: ['src/main.ts'],
      diffPatch: '+export const a = 1;',
      evidenceIds: [evidenceId],
    })

    expect(result.allPassed).toBe(true)
    expect(result.hasDeterministicFailure).toBe(false)
    expect(llmCalled).toBe(true)
    expect(result.records.length).toBe(4)

    await close()
  })

  it('T6.2 & T6.3: tracks review issues and identifies blocking issues', async () => {
    const { issuesRepo, close } = await createVerificationRepos()
    const projectId = createProjectId()
    const changeId = createChangeId()

    const issueManager = new ReviewIssueManager(issuesRepo)

    // 1. Create minor issue
    const minorIssue = await issueManager.createIssue({
      projectId,
      changeId,
      severity: 'minor',
      title: 'Code style issue',
      description: 'Missing trailing comma',
    })
    expect(issueManager.hasBlockingIssues(changeId)).toBe(false)

    // 2. Create blocker issue
    const blocker = await issueManager.createIssue({
      projectId,
      changeId,
      severity: 'blocker',
      title: 'Security vulnerability',
      description: 'Unsanitized input in shell execution',
    })
    expect(issueManager.hasBlockingIssues(changeId)).toBe(true)

    // 3. Resolve blocker
    await issueManager.updateStatus(blocker.id, 'resolved')
    expect(issueManager.hasBlockingIssues(changeId)).toBe(false)

    await close()
  })
})

describe('Resolved issue retention purge', () => {
  function makeIssuesRepo(records: Array<Record<string, unknown>>) {
    return {
      list: (filter?: (item: unknown) => boolean) => (filter === undefined ? [...records] : records.filter((item) => filter(item))),
      get: (id: string) => records.find((item) => item.id === id),
      delete: async (id: string) => {
        const index = records.findIndex((item) => item.id === id)
        if (index < 0) return false
        records.splice(index, 1)
        return true
      },
    }
  }

  function makeService(records: Array<Record<string, unknown>>, retentionDays: number) {
    return {
      liveConfig: { resolvedIssueRetentionDays: retentionDays },
      store: { issues: makeIssuesRepo(records) },
    }
  }

  const day = 24 * 60 * 60 * 1000
  const now = Date.now()
  const records = () => [
    { id: 'old-resolved', projectId: 'p1', changeId: 'c1', status: 'resolved', updatedAt: now - 8 * day },
    { id: 'new-resolved', projectId: 'p1', changeId: 'c1', status: 'resolved', updatedAt: now - 2 * day },
    { id: 'old-accepted', projectId: 'p1', changeId: 'c1', status: 'accepted', updatedAt: now - 9 * day },
    { id: 'old-open', projectId: 'p1', changeId: 'c1', status: 'open', updatedAt: now - 30 * day },
    { id: 'old-rejected', projectId: 'p1', changeId: 'c1', status: 'rejected', updatedAt: now - 10 * day },
    { id: 'new-rejected', projectId: 'p1', changeId: 'c1', status: 'rejected', updatedAt: now - 1 * day },
  ]

  it('deletes resolved/accepted/rejected issues older than the retention window and keeps the rest', async () => {
    const service = makeService(records(), 7)
    await purgeResolvedIssues(service as never)
    const remaining = service.store.issues.list().map((issue: { id: string }) => issue.id)
    expect(remaining).toEqual(['new-resolved', 'old-open', 'new-rejected'])
  })

  it('keeps everything when retention is 0 (permanent)', async () => {
    const service = makeService(records(), 0)
    await purgeResolvedIssues(service as never)
    expect(service.store.issues.list()).toHaveLength(6)
  })
})

describe('appendCappedNote 复检备注封顶', () => {
  it('反复追加只保留最近 5 条，原始证据文案不动', async () => {
    const { appendCappedNote } = await import('../src/verification/issues.ts')
    let description = '证据：空指针风险'
    for (let i = 1; i <= 8; i += 1) {
      description = appendCappedNote(description, `[复检 1/1 ${String(i).padStart(2, '0')}:00] 仍未修复：第${i}次原因`)
    }
    expect(description.startsWith('证据：空指针风险')).toBe(true)
    expect(description).not.toContain('第1次原因')
    expect(description).not.toContain('第3次原因')
    expect(description).toContain('第4次原因')
    expect(description).toContain('第8次原因')
    const noteCount = (description.match(/\[复检/g) ?? []).length
    expect(noteCount).toBe(5)
  })

  it('复检与复验混合备注同样按总数封顶', async () => {
    const { appendCappedNote } = await import('../src/verification/issues.ts')
    let description = '证据：x'
    description = appendCappedNote(description, '[复检 1/1 10:00] 仍未修复：a')
    description = appendCappedNote(description, '[复验 1/1 11:00] 属实待修复：b')
    description = appendCappedNote(description, '[复检 1/1 12:00] 仍未修复：c')
    description = appendCappedNote(description, '[复检 1/1 13:00] 仍未修复：d')
    description = appendCappedNote(description, '[复检 1/1 14:00] 仍未修复：e')
    description = appendCappedNote(description, '[复检 1/1 15:00] 仍未修复：f')
    expect(description.startsWith('证据：x')).toBe(true)
    expect(description).not.toContain('仍未修复：a')
    expect(description).toContain('属实待修复：b')
    expect(description).toContain('仍未修复：c')
    expect((description.match(/\[(复检|复验)/g) ?? []).length).toBe(5)
  })
})
