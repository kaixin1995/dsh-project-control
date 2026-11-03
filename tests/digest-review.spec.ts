// 批量消化与 Review 批量处理回归：
// - 已解读标记（commit-detail 成功/缓存命中 → analyzed；LLM 失败不标记）
// - 叙事分段的纯函数切块
// - /issues/to-chat 只发当前项目的问题、经 followup 注入聊天、无活跃会话报 409
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { createServer, type Server } from 'node:http'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { chunkForNarrative, chatVerifyCooldownReason, CHAT_VERIFY_IDLE_MS, CHAT_VERIFY_SENT_WINDOW_MS, registerApiRoute } from '../src/plugin/api-route.ts'
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

describe('applyChatVerdict 聊天复验回写', () => {
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
    expect(fixedRecord?.resolution).toContain('聊天复验修复')

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

describe('转聊天复验重复发送冷却', () => {
  const now = 10_000_000_000

  it('起步锁：发送后未回写，整个发送窗口内拒绝；过期放行', () => {
    const entry = { lastSentAt: now - 60_000, lastToolAt: 0 }
    expect(chatVerifyCooldownReason(entry, now)).toContain('尚无回写')
    expect(chatVerifyCooldownReason({ lastSentAt: now - CHAT_VERIFY_SENT_WINDOW_MS - 1, lastToolAt: 0 }, now)).toBeUndefined()
  })

  it('活跃锁：最后回写在空闲窗口内拒绝（模型仍在处理）', () => {
    const entry = { lastSentAt: now - 3 * 60_000, lastToolAt: now - 30_000 }
    expect(chatVerifyCooldownReason(entry, now)).toContain('回写活动')
  })

  it('停止/完成解锁：最后回写超过空闲窗口即放行', () => {
    const entry = { lastSentAt: now - 3 * 60_000, lastToolAt: now - CHAT_VERIFY_IDLE_MS - 1 }
    expect(chatVerifyCooldownReason(entry, now)).toBeUndefined()
  })

  it('无记录（重启/新会话）直接放行', () => {
    expect(chatVerifyCooldownReason(undefined, now)).toBeUndefined()
  })

  it('端到端：发送后同会话二次发送 409，另一会话不受影响；回写后按空闲窗口解锁', async () => {
    const { ReviewIssueManager } = await import('../src/verification/issues.ts')
    const manager = new ReviewIssueManager(service.store.issues)
    await manager.createIssue({ projectId: projectA as never, changeId: 'review:ffffff' as never, severity: 'minor' as never, category: '测试' as never, title: '冷却问题', description: '证据：x' })
    await manager.createIssue({ projectId: projectB as never, changeId: 'review:f0f0f0f0' as never, severity: 'minor' as never, category: '测试' as never, title: 'B项目问题', description: '证据：y' })
    const first = await post('/issues/to-chat', { sessionId: 'session-a' })
    expect(first.status).toBe(200)
    const second = await post('/issues/to-chat', { sessionId: 'session-a' })
    expect(second.status).toBe(409)
    expect(String(second.data['error'])).toContain('尚无回写')
    // 另一会话（不同项目）不受冷却影响。
    const other = await post('/issues/to-chat', { sessionId: 'session-b' })
    expect(other.status).toBe(200)
    // 回写刷新活跃时间：空闲窗口外解锁。
    const entry = service.chatVerifySessions.get('session-a')!
    entry.lastToolAt = Date.now() - CHAT_VERIFY_IDLE_MS - 1_000
    const third = await post('/issues/to-chat', { sessionId: 'session-a' })
    expect(third.status).toBe(200)
  })
})

describe('/issues/to-chat 转聊天复验', () => {
  it('只发送当前项目的待处理问题，并经 followup 注入（source=plugin）', async () => {
    const { ReviewIssueManager } = await import('../src/verification/issues.ts')
    const manager = new ReviewIssueManager(service.store.issues)
    const issueA = await manager.createIssue({ projectId: projectA as never, changeId: 'review:aaaaaaaa' as never, severity: 'minor' as never, category: '正确性' as never, title: '问题A', description: '证据：A' })
    await manager.createIssue({ projectId: projectB as never, changeId: 'review:bbbbbbbb' as never, severity: 'major' as never, category: '构建' as never, title: '问题B', description: '证据：B' })
    const outcome = await post('/issues/to-chat', { sessionId: 'session-a' })
    expect(outcome.status).toBe(200)
    expect(outcome.data['sent']).toBe(1)
    expect(followup).toHaveBeenCalledTimes(1)
    const message = followup.mock.calls[0]![0] as { content: Array<{ text: string }>; source: { kind: string } }
    // v4 禁用通用 plugin kind（宿主 session-format 校验直接拒绝）；必须用自有生产者 kind。
    expect(message.source).toEqual({ kind: 'project-control' })
    expect(message.content[0]!.text).toContain('问题A')
    expect(message.content[0]!.text).not.toContain('问题B')
    // 闭环要素：id 回写 + 三道闸（存在性/意图/真实性）+ obsolete 判定 + 修复默认动作。
    expect(message.content[0]!.text).toContain(`[id:${issueA.id}]`)
    expect(message.content[0]!.text).toContain('review_issue_update')
    expect(message.content[0]!.text).toContain('already_fixed')
    expect(message.content[0]!.text).toContain('obsolete')
    expect(message.content[0]!.text).toContain('以**当前版本（HEAD）**为准')
    expect(message.content[0]!.text).toContain('第一闸（存在性）')
    expect(message.content[0]!.text).toContain('第二闸（意图）')
    expect(message.content[0]!.text).toContain('立即修复')
    // 防丢码：auto 模式同样要求修复完成后 git 提交且只 add 修复文件。
    expect(message.content[0]!.text).toContain('git 提交')
    expect(message.content[0]!.text).toContain('严禁 git add -A')
  })

  it('方案模式（plan）：判定类回写照常，真实问题只出方案且禁止改代码', async () => {
    const { ReviewIssueManager } = await import('../src/verification/issues.ts')
    const manager = new ReviewIssueManager(service.store.issues)
    const issue = await manager.createIssue({ projectId: projectA as never, changeId: 'review:eeeeeeee' as never, severity: 'minor' as never, category: '测试' as never, title: '问题E', description: '证据：E' })
    await post('/issues/to-chat', { sessionId: 'session-a', ids: [issue.id], mode: 'plan' })
    expect(followup).toHaveBeenCalledTimes(1)
    const text = (followup.mock.calls[0]![0] as { content: Array<{ text: string }> }).content[0]!.text
    expect(text).toContain('方案模式')
    expect(text).toContain('禁止修改任何代码')
    expect(text).toContain('### 方案#N')
    expect(text).toContain('影响范围')
    expect(text).toContain('方案#N 待评审')
    expect(text).not.toContain('立即修复')
    // 防丢码：两种模式都必须带"修复后 git 提交（只 add 修复文件）"规则。
    expect(text).toContain('git 提交')
    expect(text).toContain('严禁 git add -A')
  })

  it('/fix 端点：dispatch（issueIds 自主路径）→ status 轮询 → 回写 resolved；model-config 可调并发', async () => {
    // mock 子代理：在 worktree 写修复文件并调完成工具。
    const agentCtxs: Array<{ sessionId: string; cwd: string; tools: Map<string, { execute: (args: unknown, exec: unknown) => Promise<unknown> }>; issueId: string; attempt: number }> = []
    const baseCtx = service.ctx as any
    baseCtx.agents = baseCtx.agents ?? {}
    baseCtx.agents.create = async (options: { sessionId: string; meta: { cwd: string }; setup: (agentCtx: unknown) => Promise<void> }) => {
      const tools = new Map<string, { execute: (args: unknown, exec: unknown) => Promise<unknown> }>()
      await options.setup({ tools: { register: (tool: { name: string; execute: (args: unknown, exec: unknown) => Promise<unknown> }) => { tools.set(tool.name, tool) } } })
      const parts = options.sessionId.split('-')
      const entry = { sessionId: options.sessionId, cwd: options.meta.cwd, tools, issueId: parts.slice(2, -2).join('-'), attempt: Number(parts.at(-2)) }
      agentCtxs.push(entry)
      return {
        agent: {
          session: { id: options.sessionId },
          followup: () => {
            writeFileSync(join(entry.cwd, 'fixed.txt'), 'ok\n')
            void tools.get('project_control_fix_complete')!.execute({ summary: '修了', changedFiles: ['fixed.txt'] }, { concludeTurn: () => {} })
          },
        },
        dispose: async () => {},
      }
    }
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

  it('显式 ids 跨项目过滤 + 无活跃会话 409 + 空清单不发送', async () => {
    const { ReviewIssueManager } = await import('../src/verification/issues.ts')
    const manager = new ReviewIssueManager(service.store.issues)
    const created = await manager.createIssue({ projectId: projectA as never, changeId: 'review:cccccccc' as never, severity: 'critical' as never, category: '构建' as never, title: '问题C', description: '证据：C' })
    const cross = await post('/issues/to-chat', { sessionId: 'session-a', ids: [created.id, 'not-in-project'] })
    expect(cross.data['sent']).toBe(1)
    // session-c：有项目有问题但无活跃 agent → 409。
    const noAgent = await post('/issues/to-chat', { sessionId: 'session-c' })
    expect(noAgent.status).toBe(409)
    // 空清单走另一会话（session-a 已发送进入冷却，属预期拦截）。
    const empty = await post('/issues/to-chat', { sessionId: 'session-b', ids: ['missing-id'] })
    expect(empty.status).toBe(200)
    expect(empty.data['ok']).toBe(false)
    expect(followup).toHaveBeenCalledTimes(1)
  })
})
