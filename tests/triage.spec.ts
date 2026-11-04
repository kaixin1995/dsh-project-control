// 整体分诊引擎回归：判定回写闭环（duplicate/obsolete 关闭、keep 保留）、
// 脏输出降级（宁漏关不误关）、提示词要素（全集指纹 + 四枚举 + 纪律）。
import { describe, expect, it } from 'vitest'
import { buildTriagePrompt, parseTriageDecisions, runTriageBatch, toTriageIssue, type TriageIssue } from '../src/verification/triage.ts'
import { ProjectControlService } from '../src/plugin/service.ts'
import { ReviewIssueManager } from '../src/verification/issues.ts'

function fakeService(): ProjectControlService {
  const ctx: any = { get: () => undefined, effect: () => {}, inject(_k: string[], cb: (c: unknown) => void) { cb(this) } }
  return new ProjectControlService(ctx)
}

async function seedIssues(service: ProjectControlService, titles: string[]): Promise<string[]> {
  const manager = new ReviewIssueManager(service.store.issues)
  const ids: string[] = []
  for (const title of titles) {
    const issue = await manager.createIssue({ projectId: 'prj_test' as never, changeId: 'review:aaaa1111' as never, severity: 'minor' as never, category: '测试' as never, title, description: '证据：x' })
    ids.push(issue.id)
  }
  return ids
}

describe('整体分诊引擎', () => {
  it('判定回写闭环：重复/过时关闭带依据，keep 保留，计数正确', async () => {
    const service = fakeService()
    const [dupId, originId, obsoleteId, keepId] = await seedIssues(service, ['重复问题A', '原始问题A', '功能已删的问题', '真实问题'])
    const issues = (service.store.issues.list() ?? []).map(toTriageIssue)
    const decisions = JSON.stringify([
      { id: dupId, verdict: 'duplicate', basis: '与原始问题A同一缺陷', duplicateOf: originId },
      { id: originId, verdict: 'keep', basis: '' },
      { id: obsoleteId, verdict: 'obsolete', basis: '提交 bbbb2222 已将该功能整体移除' },
      { id: keepId, verdict: 'keep', basis: '' },
    ])
    const result = await runTriageBatch(service.store.issues as never, issues, issues, async () => decisions)
    expect(result.parseFailed).toBe(false)
    expect(result.closed).toEqual({ duplicate: 1, obsolete: 1, false_positive: 0 })
    expect(result.kept).toBe(2)
    const dup = service.store.issues.get(dupId as never)
    expect(dup?.status).toBe('rejected')
    expect(dup?.resolution).toContain('重复')
    expect(dup?.resolution).toContain('LLM 整体分诊')
    expect(dup?.resolution).toContain(originId)
    const obsolete = service.store.issues.get(obsoleteId as never)
    expect(obsolete?.status).toBe('rejected')
    expect(obsolete?.resolution).toContain('功能已移除/需求已变更')
    expect(service.store.issues.get(keepId as never)?.status).toBe('open')
    expect(service.store.issues.get(originId as never)?.status).toBe('open')
  }, 20_000)

  it('脏输出降级：解析失败整批按 keep 保留，不误关任何一条', async () => {
    const service = fakeService()
    const ids = await seedIssues(service, ['问题1', '问题2', '问题3'])
    const issues = (service.store.issues.list() ?? []).map(toTriageIssue)
    const result = await runTriageBatch(service.store.issues as never, issues, issues, async () => '抱歉，我无法按要求输出 JSON 格式的结果。')
    expect(result.parseFailed).toBe(true)
    expect(result.kept).toBe(3)
    expect(result.closed).toEqual({ duplicate: 0, obsolete: 0, false_positive: 0 })
    for (const id of ids) expect(service.store.issues.get(id as never)?.status).toBe('open')
  }, 20_000)

  it('LLM 抛错同样整批保留（complete 异常 = 解析失败路径）', async () => {
    const service = fakeService()
    await seedIssues(service, ['问题1'])
    const issues = (service.store.issues.list() ?? []).map(toTriageIssue)
    const result = await runTriageBatch(service.store.issues as never, issues, issues, async () => { throw new Error('quota exceeded') })
    expect(result.parseFailed).toBe(true)
    expect(result.kept).toBe(1)
  }, 20_000)

  it('提示词要素：全集指纹附录 + 四枚举 + 宁漏关不误关纪律 + 严格 JSON 要求', async () => {
    const batch: TriageIssue[] = [
      { id: 'iss_b1', severity: 'major', category: '并发', title: '批内问题', description: '证据：d', changeId: 'review:cccc3333' },
    ]
    const all: TriageIssue[] = [...batch, { id: 'iss_f1', severity: 'minor', category: '', title: '指纹问题', description: '', changeId: 'review:dddd4444' }]
    const prompt = buildTriagePrompt(batch, all)
    expect(prompt).toContain('duplicate')
    expect(prompt).toContain('obsolete')
    expect(prompt).toContain('false_positive')
    expect(prompt).toContain('keep')
    expect(prompt).toContain('宁可漏关不可误关')
    expect(prompt).toContain('[iss_f1]')
    expect(prompt).toContain('[iss_b1]')
    expect(prompt).toContain('JSON 数组')
  })

  it('parseTriageDecisions 容错：剥围栏/截噪声、非法 id 与非法 verdict 跳过、缺失条目由调用方按 keep 兜底', () => {
    const batch: TriageIssue[] = [
      { id: 'iss_a', severity: 'minor', category: '', title: 'a', description: '', changeId: 'review:x' },
      { id: 'iss_b', severity: 'minor', category: '', title: 'b', description: '', changeId: 'review:x' },
    ]
    const text = '前置噪声\n```json\n[{"id":"iss_a","verdict":"false_positive","basis":"证据不成立"},{"id":"iss_z","verdict":"keep","basis":""},{"id":"iss_b","verdict":"nonsense","basis":""}]\n```'
    const decisions = parseTriageDecisions(text, batch)
    expect(decisions).toHaveLength(1)
    expect(decisions![0]).toMatchObject({ id: 'iss_a', verdict: 'false_positive' })
    expect(parseTriageDecisions('完全不是 JSON', batch)).toBeUndefined()
  })
})
