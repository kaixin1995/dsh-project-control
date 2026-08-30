import { describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import Storage from '@deepseek-ai/dsh-storage'
import { DomainFacility } from '@deepseek-ai/dsh-storage-domain'
import { MemoryMediaPool, MemoryStorageBackend } from '../../packages/storage/storage-domain/tests/helpers/memory-backend.ts'
import { historyDomainSpec } from '../src/store/domains.ts'
import { DomainRepository } from '../src/store/repository.ts'
import { MemoryService } from '../src/memory/service.ts'
import { MemoryContextInjector } from '../src/memory/context.ts'
import { createProjectId, createEvidenceId } from '../src/domain/ids.ts'
import type { MemoryRecord } from '../src/domain/models.ts'

async function createMemoryRepo() {
  const ctx = new Context()
  await ctx.plugin(Storage)
  const backend = new MemoryStorageBackend(new MemoryMediaPool())
  ctx.storage.backend.register('memory', backend)
  const facility = new DomainFacility(ctx, { backend: 'memory', routes: {} })
  ctx.storage.mount('domain', facility)

  const history = await facility.open(historyDomainSpec)
  const repo = new DomainRepository<MemoryRecord>(history.table('memories'))
  return { repo, close: () => history.close() }
}

describe('Project Memory & Context Injection (T9.1 - T9.3)', () => {
  it('T9.1 & T9.2: records, promotes, and protects truth levels of memories', async () => {
    const { repo, close } = await createMemoryRepo()
    const service = new MemoryService(repo)
    const projectId = createProjectId()
    const evidenceId = createEvidenceId()

    // 1. Record inferred architecture decision
    const mem1 = await service.recordMemory({
      projectId,
      type: 'architecture_decision',
      truthLevel: 'inferred',
      title: 'Use PostgreSQL for ACID transactions',
      content: 'Selected PostgreSQL over MongoDB due to transaction requirements',
      relatedFiles: ['src/db/schema.ts'],
      evidenceIds: [evidenceId],
    })

    expect(mem1.truthLevel).toBe('inferred')
    expect(mem1.isHumanConfirmed).toBe(false)

    // 2. Human confirms memory -> promoted to 'fact'
    const confirmed = await service.confirmMemory(mem1.id)
    expect(confirmed.truthLevel).toBe('fact')
    expect(confirmed.isHumanConfirmed).toBe(true)

    // 3. Attempt to downgrade truth level -> throws
    await expect(
      service.updateMemory(mem1.id, { truthLevel: 'inferred' }),
    ).rejects.toThrow(/Cannot downgrade truth level/)

    // 4. Query memories by file
    const fileQuery = service.queryMemories(projectId, { filePath: 'src/db/schema.ts' })
    expect(fileQuery.length).toBe(1)
    expect(fileQuery[0]!.id).toBe(mem1.id)

    // 5. Export markdown
    const md = service.exportToMarkdown(projectId)
    expect(md.includes('ARCHITECTURE DECISION')).toBe(true)
    expect(md.includes('Use PostgreSQL')).toBe(true)
    expect(md.includes('Human Confirmed')).toBe(true)

    await close()
  })

  it('T9.3: injects relevant memory context into agent instructions', async () => {
    const { repo, close } = await createMemoryRepo()
    const service = new MemoryService(repo)
    const projectId = createProjectId()

    await service.recordMemory({
      projectId,
      type: 'risk_hotspot',
      truthLevel: 'fact',
      title: 'Payment Webhook Idempotency',
      content: 'Do not modify webhook transaction locks without security review',
      relatedFiles: ['src/payment/webhook.ts'],
    })

    const injector = new MemoryContextInjector(service)
    const prompt = injector.synthesizeContext(projectId, ['src/payment/webhook.ts'])

    expect(prompt.includes('<project_memory_context>')).toBe(true)
    expect(prompt.includes('Payment Webhook Idempotency')).toBe(true)

    await close()
  })
})
