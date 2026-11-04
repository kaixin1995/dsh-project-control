// 批量消化与 Review 批量处理回归：
// - 已解读标记（commit-detail 成功/缓存命中 → analyzed；LLM 失败不标记）
// - 叙事分段的纯函数切块
// - /fix/dispatch 子 Agent 派发（fix 模式全链 + plan 模式只读出方案）
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { createServer, type Server } from 'node:http'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { chunkForNarrative, registerApiRoute } from '../src/plugin/api-route.ts'
import { ProjectControlService } from '../src/plugin/service.ts'
import { ProjectService } from '../src/domain/project.ts'
import { safeStorageId } from '../src/store/repository.ts'

let temp: string
let server: Server
let base: string
let service: ProjectControlService
let rootA: string
let projectA: string
let projectB: string
let shaA: string
const followup = vi.fn()

function initRepo(path: string, subject: string): string {
  const env = { ...process.env, GIT_AUTHOR_NAME: 'test', GIT_AUTHOR_EMAIL: 'test@example.invalid', GIT_COMMITTER_NAME: 'test', GIT_COMMITTER_EMAIL: 'test@example.invalid' }
  execFileSync('git', ['init', '-q', '-b', 'main', path], { env })
  writeFileSync(join(path, 'sample.txt'), subject)
  execFileSync('git', ['-C', path, 'add', 'sample.txt'], { env })
  execFileSync('git', ['-C', path, 'commit', '-qm', subject], { env })
  return execFileSync('git', ['-C', path, 'rev-parse', 'HEAD'], { env }).toString().trim()
}

beforeEach(async () => {
  temp = mkdtempSync(join(tmpdir(), 'pc-digest-review-'))
  rootA = join(temp, 'project-a')
  const rootB = join(temp, 'project-b')
  shaA = initRepo(rootA, 'first project')
  initRepo(rootB, 'second project')
  const sessions = new Map<string, string>([['session-a', rootA], ['session-b', rootB], ['session-c', rootA]])
  const agentMock = { followup }
  const ctx: any = {
    sessions: { get: (id: string) => sessions.has(id) ? { header: { cwd: sessions.get(id) } } : undefined },
    workspaceRegistry: { list: () => [] },
    agents: { get: (id: string) => id === 'session-a' || id === 'session-b' ? agentMock : undefined },
    get: () => undefined,
    logger: { warn: () => {} },
    effect: () => {},
    inject(_keys: string[], callback: (ctx: any) => void) { callback(this) },
    webServer: { register(options: { handler: any }) {
      server = createServer((req, res) => { void options.handler(req, res) })
      return () => {}
    } },
  }
  service = new ProjectControlService(ctx)
  const projects = new ProjectService(service.store.projects, (args, cwd) => service.git.runGit(args, cwd))
  projectA = (await projects.ensureProject(rootA)).project.id
  projectB = (await projects.ensureProject(rootB)).project.id
  registerApiRoute(ctx, service)
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  const address = server.address()
  if (address === null || typeof address === 'string') throw new Error('server address unavailable')
  base = `http://127.0.0.1:${address.port}/project-control/api`
})

afterEach(async () => {
  followup.mockClear()
  if (server !== undefined) await new Promise<void>((resolve) => server.close(() => resolve()))
  // Windows：/fix 用例的 git worktree 进程可能仍占用目录，等待后容错删除。
  await new Promise((resolve) => setTimeout(resolve, 800))
  if (temp !== undefined) {
    try {
      rmSync(temp, { recursive: true, force: true })
    } catch {
      console.warn(`[digest-review.spec] temp cleanup deferred: ${temp}`)
    }
  }
})

async function post(path: string, body: Record<string, unknown>): Promise<{ status: number; data: any }> {
  const response = await fetch(base + path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
  return { status: response.status, data: await response.json() }
}

async function get(path: string): Promise<{ status: number; data: any }> {
  const response = await fetch(base + path)
  return { status: response.status, data: await response.json() }
}

describe('叙事分段切块', () => {
  it('按上限切块、边界正确、空集返回单个空段', () => {
    const shas = Array.from({ length: 65 }, (_, index) => `sha-${index}`)
    expect(chunkForNarrative(shas).map((chunk) => chunk.length)).toEqual([30, 30, 5])
    expect(chunkForNarrative(shas.slice(0, 30))).toHaveLength(1)
    expect(chunkForNarrative(shas.slice(0, 31))).toHaveLength(2)
    expect(chunkForNarrative([])).toEqual([[]])
  })
})

describe('已解读标记', () => {
  it('缓存命中的解读会把提交标记为 analyzed，LLM 失败不会', async () => {
    // 缓存键用项目记录里的规范化根路径（git rev-parse 返回长路径）+ 与路由相同的空树回退规则。
    const storedRoot = (service.store.projects.get(projectA as never) as unknown as { identity: { rootPath: string } }).identity.rootPath
    const diff = await service.git.getDiff(storedRoot, { from: '4b825dc642cb6eb9a060e54bf8d69288fbee4904', to: shaA })
    service.store.snapshots.save({
      id: safeStorageId(`cd:${storedRoot}|${shaA}|${diff.diffHash}|v1|deepseek-official/deepseek-v4-reasoner`),
      key: 'seed', kind: 'commit-detail',
      payload: { what: 'seed analysis', logic: ['step'], risks: [] },
      createdAt: Date.now(),
    })
    const detail = await post('/commit-detail', { sessionId: 'session-a', sha: shaA })
    expect(detail.status).toBe(200)
    expect(detail.data['analysisCached']).toBe(true)
    const commits = await get('/commits?sessionId=session-a')
    expect(commits.data['commits'][0]['analyzed']).toBe(true)

    // 无缓存的提交：LLM 不可用 → 解读失败占位 → 不得标记 analyzed。
    const env = { ...process.env, GIT_AUTHOR_NAME: 'test', GIT_AUTHOR_EMAIL: 'test@example.invalid', GIT_COMMITTER_NAME: 'test', GIT_COMMITTER_EMAIL: 'test@example.invalid' }
    writeFileSync(join(rootA, 'extra.txt'), 'more\n')
    execFileSync('git', ['-C', rootA, 'add', 'extra.txt'], { env })
    execFileSync('git', ['-C', rootA, 'commit', '-qm', 'second commit'], { env })
    const sha2 = execFileSync('git', ['-C', rootA, 'rev-parse', 'HEAD'], { env }).toString().trim()
    const detail2 = await post('/commit-detail', { sessionId: 'session-a', sha: sha2 })
    expect(detail2.status).toBe(200)
    expect(String(detail2.data['analysis']['what'])).toContain('解读失败')
    const commits2 = await get('/commits?sessionId=session-a')
    const analyzedFlags = Object.fromEntries(commits2.data['commits'].map((commit: any) => [commit.sha, commit.analyzed]))
    expect(analyzedFlags[shaA]).toBe(true)
    expect(analyzedFlags[sha2]).toBe(false)
  })
})

describe('applyChatVerdict 复验回写', () => {
  it('四种判定各自落到正确状态：误报/重复→rejected，修复/历史修复→resolved，属实→保持 open 加备注', async () => {
    const { ReviewIssueManager } = await import('../src/verification/issues.ts')
    const manager = new ReviewIssueManager(service.store.issues)
    const mk = async (title: string) => manager.createIssue({
      projectId: projectA as never, changeId: 'review:dddddddd' as never,
      severity: 'minor' as never, category: '测试' as never, title, description: '证据：x',
    })
    const fp = await mk('误报项')
    await manager.applyChatVerdict(fp.id, 'false_positive', '条件分支实际覆盖')
    expect(service.store.issues.get(fp.id as never)?.status).toBe('rejected')
    expect(service.store.issues.get(fp.id as never)?.resolution).toContain('误报')

    const dup = await mk('重复项')
    await manager.applyChatVerdict(dup.id, 'duplicate', '与 #1 重复')
    expect(service.store.issues.get(dup.id as never)?.status).toBe('rejected')
    expect(service.store.issues.get(dup.id as never)?.resolution).toContain('重复')

    const fixed = await mk('修复项')
    await manager.applyChatVerdict(fixed.id, 'fixed', '补了空值检查', ['src/a.ts'])
    const fixedRecord = service.store.issues.get(fixed.id as never)
    expect(fixedRecord?.status).toBe('resolved')
    expect(fixedRecord?.fixFiles).toEqual(['src/a.ts'])
    expect(fixedRecord?.resolution).toContain('复验修复')

    const already = await mk('历史修复项')
    await manager.applyChatVerdict(already.id, 'already_fixed', '提交 abc123 已处理', ['src/b.ts'])
    const alreadyRecord = service.store.issues.get(already.id as never)
    expect(alreadyRecord?.status).toBe('resolved')
    expect(alreadyRecord?.fixFiles).toEqual(['src/b.ts'])
    expect(alreadyRecord?.resolution).toContain('此前已修复')

    const obsolete = await mk('功能已删除项')
    await manager.applyChatVerdict(obsolete.id, 'obsolete', '该模块在提交 def456 中整体移除', ['src/old/'])
    const obsoleteRecord = service.store.issues.get(obsolete.id as never)
    expect(obsoleteRecord?.status).toBe('rejected')
    expect(obsoleteRecord?.resolution).toContain('功能已移除/需求已变更')

    const confirmed = await mk('属实项')
    await manager.applyChatVerdict(confirmed.id, 'confirmed', '影响面大需人工决策')
    const confirmedRecord = service.store.issues.get(confirmed.id as never)
    expect(confirmedRecord?.status).toBe('open')
    expect(confirmedRecord?.description).toContain('属实待修复')
  })
})

describe('/fix 子 Agent 派发', () => {
  /** mock 子代理：fix 模式（注册了 apply_fix）写修复文件；plan 模式只交结构化方案。 */
  function installAgentMock(): void {
    const baseCtx = service.ctx as any
    baseCtx.agents = baseCtx.agents ?? {}
    baseCtx.agents.create = async (options: { sessionId: string; meta: { cwd: string }; setup: (agentCtx: unknown) => Promise<void> }) => {
      const tools = new Map<string, { execute: (args: unknown, exec: unknown) => Promise<unknown> }>()
      await options.setup({ tools: { register: (tool: { name: string; execute: (args: unknown, exec: unknown) => Promise<unknown> }) => { tools.set(tool.name, tool) } } })
      return {
        agent: {
          session: { id: options.sessionId },
          followup: () => {
            if (tools.has('project_control_apply_fix')) {
              writeFileSync(join(options.meta.cwd, 'fixed.txt'), 'ok\n')
              void tools.get('project_control_fix_complete')!.execute({ summary: '修了', changedFiles: ['fixed.txt'] }, { concludeTurn: () => {} })
            } else {
              // plan 模式：不写任何文件，只交方案。
              void tools.get('project_control_fix_complete')!.execute({ summary: '确认属实', approach: '把 calc.js 里的减号改成加号', files: ['calc.js'], impact: '仅该函数', benefit: '计算正确', risk: '低' }, { concludeTurn: () => {} })
            }
          },
        },
        dispose: async () => {},
      }
    }
  }

  it('/fix 端点：dispatch（issueIds 修复路径）→ status 轮询 → 回写 resolved；model-config 可调并发', async () => {
    installAgentMock()
    const { ReviewIssueManager } = await import('../src/verification/issues.ts')
    const manager = new ReviewIssueManager(service.store.issues)
    const issue = await manager.createIssue({ projectId: projectA as never, changeId: 'review:fixfix01' as never, severity: 'minor' as never, category: '测试' as never, title: '待派发问题', description: '证据：x' })
    const dispatch = await post('/fix/dispatch', { sessionId: 'session-a', issueIds: [issue.id] })
    expect(dispatch.status).toBe(200)
    expect(dispatch.data['accepted']).toBe(1)
    // 轮询 status 至终态。
    let final: any
    for (let i = 0; i < 100; i += 1) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      const status = await get('/fix/status?sessionId=session-a')
      final = status.data['tasks']?.[0]
      if (final !== undefined && ['done', 'conflict', 'failed', 'cancelled'].includes(final.status)) break
    }
    expect(final.status).toBe('done')
    expect(final.commit).toBeDefined()
    expect(service.store.issues.get(issue.id as never)?.status).toBe('resolved')
    // model-config：并发读取与保存。
    const before = await get('/model-config')
    expect(before.data['fixConcurrency']).toBe(3)
    const save = await post('/model-config', { fixConcurrency: 5 })
    expect(save.status).toBe(200)
    expect((await get('/model-config')).data['fixConcurrency']).toBe(5)
  }, 40_000)

  it('plan 模式派发：只读出方案入库待评审，问题不关、主仓无新提交；已有待审方案再派会跳过', async () => {
    installAgentMock()
    const { ReviewIssueManager } = await import('../src/verification/issues.ts')
    const manager = new ReviewIssueManager(service.store.issues)
    const issue = await manager.createIssue({ projectId: projectA as never, changeId: 'review:planplan1' as never, severity: 'minor' as never, category: '测试' as never, title: '待出方案问题', description: '证据：x' })
    const headBefore = execFileSync('git', ['-C', rootA, 'rev-parse', 'HEAD']).toString().trim()
    const dispatch = await post('/fix/dispatch', { sessionId: 'session-a', issueIds: [issue.id], mode: 'plan' })
    expect(dispatch.status).toBe(200)
    expect(dispatch.data['accepted']).toBe(1)
    let final: any
    for (let i = 0; i < 100; i += 1) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      const status = await get('/fix/status?sessionId=session-a')
      final = status.data['tasks']?.[0]
      if (final !== undefined && ['done', 'conflict', 'failed', 'cancelled'].includes(final.status)) break
    }
    expect(final.status).toBe('done')
    expect(final.mode).toBe('plan')
    expect(final.commit).toBeUndefined()
    // 方案入库待评审；问题保持待处理；主仓零提交。
    const plans = (service.store.fixPlans.list() ?? []).filter((plan) => (plan as { issueId: string }).issueId === issue.id)
    expect(plans).toHaveLength(1)
    expect(plans[0]!.status).toBe('pending')
    expect(plans[0]!.approach).toContain('加号')
    expect(service.store.issues.get(issue.id as never)?.status).toBe('open')
    expect(execFileSync('git', ['-C', rootA, 'rev-parse', 'HEAD']).toString().trim()).toBe(headBefore)
    // 已有 pending 方案的问题再派 plan 模式 → 服务端跳过（防重复产出）。
    const again = await post('/fix/dispatch', { sessionId: 'session-a', issueIds: [issue.id], mode: 'plan' })
    expect(again.status).toBe(200)
    expect(again.data['accepted']).toBe(0)
  }, 40_000)

  it('/issues/triage：无 LLM 环境整批降级保留，seen 记忆推进到 done；只碰当前项目', async () => {
    const { ReviewIssueManager } = await import('../src/verification/issues.ts')
    const manager = new ReviewIssueManager(service.store.issues)
    const created = await manager.createIssue({ projectId: projectA as never, changeId: 'review:triage001' as never, severity: 'minor' as never, category: '测试' as never, title: '分诊目标', description: '证据：x' })
    await manager.createIssue({ projectId: projectB as never, changeId: 'review:triage002' as never, severity: 'minor' as never, category: '测试' as never, title: 'B项目不该被动', description: '证据：y' })
    // 第一轮（reset）：ctx.llm 不存在 → complete 抛错 → 引擎按解析失败整批保留。
    const first = await post('/issues/triage', { sessionId: 'session-a', reset: true })
    expect(first.status).toBe(200)
    expect(first.data['ok']).toBe(true)
    expect(first.data['processed']).toBe(1)
    expect(first.data['parseFailed']).toBe(true)
    expect(first.data['done']).toBe(true)
    // 问题全部保留，B 项目问题不受影响。
    expect(service.store.issues.get(created.id as never)?.status).toBe('open')
    // 第二轮（无 reset）：seen 记忆内无剩余 → done 且零处理。
    const second = await post('/issues/triage', { sessionId: 'session-a' })
    expect(second.data['done']).toBe(true)
    expect(second.data['processed']).toBe(0)
  }, 40_000)
})
