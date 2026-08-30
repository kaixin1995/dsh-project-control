import { describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import Storage from '@deepseek-ai/dsh-storage'
import { DomainFacility } from '@deepseek-ai/dsh-storage-domain'
import { MemoryMediaPool, MemoryStorageBackend } from '../../packages/storage/storage-domain/tests/helpers/memory-backend.ts'
import {
  coreDomainSpec,
  analysisDomainSpec,
  historyDomainSpec,
  DOMAIN_FORMAT_VERSION,
} from '../src/store/domains.ts'

async function createTestFacility(pool: MemoryMediaPool = new MemoryMediaPool()) {
  const ctx = new Context()
  await ctx.plugin(Storage)
  const backend = new MemoryStorageBackend(pool)
  ctx.storage.backend.register('memory', backend)
  const facility = new DomainFacility(ctx, { backend: 'memory', routes: {} })
  ctx.storage.mount('domain', facility)
  return { ctx, facility, pool }
}

describe('Storage Domain Routing & Round-trip (T0.4)', () => {
  it('opens all three project-control domains and performs CRUD operations', async () => {
    const { facility } = await createTestFacility()

    // 1. Core Domain
    const core = await facility.open(coreDomainSpec)
    const itemsTable = core.table('items')
    const item1 = { id: 'core-1', name: 'Core Item', updatedAt: Date.now() }
    await itemsTable.put('item-1', item1)
    expect(itemsTable.get('item-1')).toEqual(item1)
    expect(itemsTable.size).toBe(1)

    // 2. Analysis Domain (per-record layout)
    const analysis = await facility.open(analysisDomainSpec)
    const analysisTable = analysis.table('items')
    const item2 = { id: 'analysis-1', name: 'Analysis Item', updatedAt: Date.now() }
    await analysisTable.put('item-2', item2)
    expect(analysisTable.get('item-2')).toEqual(item2)

    // 3. History Domain
    const history = await facility.open(historyDomainSpec)
    const historyTable = history.table('items')
    const item3 = { id: 'history-1', name: 'History Item', updatedAt: Date.now() }
    await historyTable.put('item-3', item3)
    expect(historyTable.get('item-3')).toEqual(item3)

    // Close domains
    await core.close()
    await analysis.close()
    await history.close()
  })

  it('preserves data across domain reopening with the same medium pool', async () => {
    const pool = new MemoryMediaPool()

    // First session: write data
    {
      const { facility } = await createTestFacility(pool)
      const core = await facility.open(coreDomainSpec)
      await core.table('items').put('persisted-1', { id: 'p1', name: 'Persisted', updatedAt: 12345 })
      await core.close()
    }

    // Second session: read data back
    {
      const { facility } = await createTestFacility(pool)
      const core = await facility.open(coreDomainSpec)
      expect(core.table('items').get('persisted-1')).toEqual({ id: 'p1', name: 'Persisted', updatedAt: 12345 })
      await core.close()
    }
  })

  it('rejects opening a domain when on-medium version does not match', async () => {
    const pool = new MemoryMediaPool()
    // Stamp a different version on medium
    pool.versions.set(coreDomainSpec.name, DOMAIN_FORMAT_VERSION + 99)

    const { facility } = await createTestFacility(pool)
    await expect(facility.open(coreDomainSpec)).rejects.toThrow()
  })
})
