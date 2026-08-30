// Unit tests: confirmed-constraint conflict guard (B4) + three-tier impact classification (B1).
import { describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import { registerConflictGuard } from '../src/plugin/confirmed.ts'
import { ProjectGraph } from '../src/analysis/graph.ts'
import { ImpactEngine } from '../src/analysis/impact.ts'
import type { ProjectControlService } from '../src/plugin/service.ts'

/** 内存版 confirmed 仓储（与 DomainRepository 同形的最小面）。 */
function makeConfirmedRepo(items: Array<Record<string, unknown>>) {
  return {
    list: (filter?: (item: unknown) => boolean) => (filter === undefined ? [...items] : items.filter((item) => filter(item))),
    get: (id: string) => items.find((item) => item.id === id),
    save: async (record: Record<string, unknown>) => {
      const index = items.findIndex((item) => item.id === record.id)
      if (index >= 0) items[index] = record
      else items.push(record)
    },
  }
}

function makeService(confirmed: Array<Record<string, unknown>>): ProjectControlService {
  return { store: { confirmed: makeConfirmedRepo(confirmed) } } as unknown as ProjectControlService
}

function makeExec(name: string, filePath?: string) {
  return {
    name,
    callId: 'call-1',
    rootCallId: 'call-1',
    arguments: filePath === undefined ? {} : { file_path: filePath },
    signal: new AbortController().signal,
  }
}

describe('Confirmed constraint conflict guard (B4)', () => {
  it('denies write into a forbidden path and cites the constraint', async () => {
    const ctx = new Context()
    const confirmed = [
      {
        id: 'cfm_test1',
        projectId: 'prj_x',
        type: 'constraint',
        text: '禁止修改 agent-loop 核心文件',
        forbiddenPaths: ['packages/core/agent-loop'],
        status: 'active',
        createdAt: 1,
      },
    ]
    registerConflictGuard(ctx, makeService(confirmed) as never)

    const decision = (await (ctx as any).waterfall(
      ctx,
      'tools/pre-execute',
      makeExec('write', 'packages/core/agent-loop/src/index.ts'),
      () => Promise.resolve({ kind: 'allow' }),
    )) as { kind: string; reason?: string }

    expect(decision.kind).toBe('deny')
    expect(decision.reason).toContain('cfm_test1')
    expect(decision.reason).toContain('agent-loop 核心文件')
  })

  it('denies nested paths but allows unrelated paths (delegates to allow)', async () => {
    const ctx = new Context()
    const confirmed = [
      {
        id: 'cfm_test2',
        projectId: 'prj_x',
        type: 'constraint',
        text: 'lock config dir',
        forbiddenPaths: ['config/'],
        status: 'active',
        createdAt: 1,
      },
    ]
    registerConflictGuard(ctx, makeService(confirmed) as never)

    const nested = (await (ctx as any).waterfall(
      ctx,
      'tools/pre-execute',
      makeExec('edit', 'config/settings.yaml'),
      () => Promise.resolve({ kind: 'allow' }),
    )) as { kind: string }
    expect(nested.kind).toBe('deny')

    const unrelated = (await (ctx as any).waterfall(
      ctx,
      'tools/pre-execute',
      makeExec('write', 'src/other/file.ts'),
      () => Promise.resolve({ kind: 'allow' }),
    )) as { kind: string }
    expect(unrelated.kind).toBe('allow')
  })

  it('ignores non-write tools and removed constraints', async () => {
    const ctx = new Context()
    const confirmed = [
      {
        id: 'cfm_test3',
        projectId: 'prj_x',
        type: 'constraint',
        text: 'x',
        forbiddenPaths: ['packages/core'],
        status: 'removed',
        createdAt: 1,
      },
    ]
    registerConflictGuard(ctx, makeService(confirmed) as never)

    const readTool = (await (ctx as any).waterfall(
      ctx,
      'tools/pre-execute',
      makeExec('read', 'packages/core/agent-loop/src/index.ts'),
      () => Promise.resolve({ kind: 'allow' }),
    )) as { kind: string }
    expect(readTool.kind).toBe('allow')

    const removedConstraint = (await (ctx as any).waterfall(
      ctx,
      'tools/pre-execute',
      makeExec('write', 'packages/core/agent-loop/x.ts'),
      () => Promise.resolve({ kind: 'allow' }),
    )) as { kind: string }
    expect(removedConstraint.kind).toBe('allow')
  })
})

describe('Three-tier impact classification (B1)', () => {
  it('classifies changed file as direct and transitive references as indirect with risk fields', () => {
    const graph = new ProjectGraph()
    // A = changed file; B references A; C references B
    graph.addNode({ id: 'src/a.ts', type: 'file', label: 'src/a.ts', filePath: 'src/a.ts' })
    graph.addEdge({ source: 'src/b.ts', target: 'src/a.ts', type: 'references' })
    graph.addEdge({ source: 'src/c.ts', target: 'src/b.ts', type: 'references' })

    const result = new ImpactEngine().computeImpact(['src/a.ts'], graph)

    expect(result.changedFiles).toEqual(['src/a.ts'])
    const direct = result.impactedItems.filter((item) => item.level === 'direct').map((item) => item.node.id)
    expect(direct).toContain('src/a.ts')
    const indirect = result.impactedItems.filter((item) => item.level === 'indirect').map((item) => item.node.id)
    expect(indirect.length).toBeGreaterThan(0)
    expect(['low', 'medium', 'high', 'critical']).toContain(result.riskLevel)
    expect(typeof result.riskScore).toBe('number')
    expect(Array.isArray(result.affectedFiles)).toBe(true)
  })
})
