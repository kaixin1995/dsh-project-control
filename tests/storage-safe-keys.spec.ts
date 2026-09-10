// 回归测试：存储键必须路径安全（storage-json 断言 /^[A-Za-z0-9_-]+$/，键会成为
// 磁盘文件路径段）。2026-09-10 事故：LLM 缓存键 `cd:D:/Code/...|sha|...|v1|模型`
// 直接写入 per-record 域，assertSafeKey 抛未捕获异常 fatal 掉整个 dsh 进程。
// 本测试用真实 JsonStorageBackend 证明：safeStorageId 键可写可读，原始毒键必拒。
import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Context } from '@deepseek-ai/cordis'
import Storage from '@deepseek-ai/dsh-storage'
import { DomainFacility } from '@deepseek-ai/dsh-storage-domain'
import { JsonStorageBackend } from '../../packages/storage/storage-json/src/index.ts'
import { analysisDomainSpec, historyDomainSpec } from '../src/store/domains.ts'
import { safeStorageId } from '../src/store/repository.ts'

const SAFE_KEY = /^[A-Za-z0-9_-]+$/

describe('safeStorageId（存储键安全化）', () => {
  it('把现实世界的毒键摘要为路径安全键，且确定性、无碰撞方向', () => {
    const poisonKeys = [
      'cd:D:/Code/fabscope2.0|5b79b2bf05fec4890000dc62a00df41b2368a05a|deadbeef|v1|aitool/1M',
      'rv:D:/Code/x|working|deadbeef|v1|deepseek-official/deepseek-v4-flash',
      'wn:D:/Code/x|a,b,c|v1|p/m',
      'fi:D:/Code/x|a|patchhash|v1|p/m',
    ]
    for (const key of poisonKeys) {
      const id = safeStorageId(key)
      expect(id).toMatch(SAFE_KEY)
      expect(safeStorageId(key)).toBe(id)
    }
    // 不同原始键 → 不同摘要
    expect(safeStorageId(poisonKeys[0]!)).not.toBe(safeStorageId(poisonKeys[1]!))
  })

  it('真实 JsonStorageBackend：安全键可写可读可重开，原始毒键写入被拒', async () => {
    const root = mkdtempSync(join(tmpdir(), 'pc-json-backend-'))
    try {
      const ctx = new Context()
      await ctx.plugin(Storage)
      const backend = new JsonStorageBackend(root)
      ctx.storage.backend.register('json', backend)
      const facility = new DomainFacility(ctx, { backend: 'json', routes: {} })

      const analysis = await facility.open(analysisDomainSpec)
      const snapshots = analysis.table('snapshots')

      const poisonKey = 'cd:D:/Code/fabscope2.0|5b79b2bf05fec4890000dc62a00df41b2368a05a|deadbeef|v1|aitool/1M'
      // 事故复现断言：原始毒键写入必须被后端拒绝（否则本测试没有守住这个 bug 类）。
      await expect(snapshots.put(poisonKey, { id: poisonKey })).rejects.toThrow()

      // 修复路径：摘要键写入成功、可读，并持久化到重开之后的会话。
      const safeId = safeStorageId(poisonKey)
      await snapshots.put(safeId, { id: safeId, key: poisonKey, kind: 'commit-detail', payload: { what: 'x' }, createdAt: 1 })
      expect(snapshots.get(safeId)?.['key']).toBe(poisonKey)
      await analysis.close()

      const facility2 = new DomainFacility(ctx, { backend: 'json', routes: {} })
      const analysis2 = await facility2.open(analysisDomainSpec)
      expect(analysis2.table('snapshots').get(safeId)?.['kind']).toBe('commit-detail')
      await analysis2.close()
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('history 域（single 布局）同样写安全键正常', async () => {
    const root = mkdtempSync(join(tmpdir(), 'pc-json-history-'))
    try {
      const ctx = new Context()
      await ctx.plugin(Storage)
      const backend = new JsonStorageBackend(root)
      ctx.storage.backend.register('json', backend)
      const facility = new DomainFacility(ctx, { backend: 'json', routes: {} })
      const history = await facility.open(historyDomainSpec)
      const baselineId = safeStorageId('prj_abc|feature/net8-upgrade')
      await history.table('memory_baselines').put(baselineId, { id: baselineId, branch: 'feature/net8-upgrade', updatedAt: 1 })
      expect(history.table('memory_baselines').get(baselineId)?.['branch']).toBe('feature/net8-upgrade')
      await history.close()
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
