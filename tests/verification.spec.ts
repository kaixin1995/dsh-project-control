import { describe, expect, it } from 'vitest'
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
