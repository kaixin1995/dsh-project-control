// FixDispatcher 回归：worktree 生命周期、cherry-pick 合并、冲突重做、并发上限、
// 回写与清理。用真实 git 仓库 + mock 子代理（followup 时在 worktree 写文件并调
// 完成工具，模拟模型行为）。behavior 按【真实 issueId】动态注册。
import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, existsSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { FixDispatcher } from '../src/runtime/fix-dispatcher.ts'
import { ProjectControlService } from '../src/plugin/service.ts'
import { ProjectService } from '../src/domain/project.ts'
import { ReviewIssueManager } from '../src/verification/issues.ts'
import { GitAdapter } from '../src/git/adapter.ts'

type Behavior = (worktree: string, attempt: number, tools: Map<string, { execute: (args: unknown, exec: unknown) => Promise<unknown> }>) => void

const finishTool = (tools: Map<string, { execute: (args: unknown, exec: unknown) => Promise<unknown> }>, args: { summary: string; changedFiles?: string[]; blocked?: string; verdict?: string; approach?: string; files?: string[]; impact?: string; benefit?: string; risk?: string }): void => {
  void tools.get('project_control_fix_complete')!.execute(args, { concludeTurn: () => {} })
}

function initRepo(path: string): void {
  const env = { ...process.env, GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@x', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@x' }
  execFileSync('git', ['init', '-q', '-b', 'main', path], { env })
  // Windows 全局 autocrlf 会让 worktree checkout 把 LF 转 CRLF——本套件按字节断言，关掉。
  execFileSync('git', ['-C', path, 'config', 'core.autocrlf', 'false'], { env })
  writeFileSync(join(path, 'shared.txt'), 'base\n')
  execFileSync('git', ['-C', path, 'add', '.'], { env })
  execFileSync('git', ['-C', path, 'commit', '-qm', 'base'], { env })
}

async function waitIdle(dispatcher: FixDispatcher, timeoutMs = 30_000): Promise<void> {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    const tasks = dispatcher.status()
    const busy = dispatcher.isBusy()
    const allSettled = tasks.every((task) => ['done', 'conflict', 'failed', 'cancelled'].includes(task.status))
    if (!busy && tasks.length > 0 && allSettled) return
    await new Promise((resolve) => setTimeout(resolve, 150))
  }
  throw new Error(`dispatcher did not settle: ${JSON.stringify(dispatcher.status())}`)
}

function makeHarness(opts: { concurrency?: number; stepTimeoutMs?: number; onRunning?: () => void; onRunningEnd?: () => void } = {}) {
  const behaviors = new Map<string, Behavior>()
  const git = new GitAdapter()
  const ctx: any = {
    agents: {
      create: async (options: { sessionId: string; meta: { cwd: string }; setup: (agentCtx: unknown) => Promise<void> }) => {
        const tools = new Map<string, { execute: (args: unknown, exec: unknown) => Promise<unknown> }>()
        const agentCtx = { tools: { register: (tool: { name: string; execute: (args: unknown, exec: unknown) => Promise<unknown> }) => { tools.set(tool.name, tool) } } }
        await options.setup(agentCtx)
        // sessionId = pc-fix-<issueId>-<attempt>-<ts>；issueId 本身不含 '-'。
        const parts = options.sessionId.split('-')
        const issueId = parts.slice(2, -2).join('-')
        const attempt = Number(parts.at(-2))
        return {
          agent: {
            session: { id: options.sessionId },
            followup: () => {
              opts.onRunning?.()
              try {
                behaviors.get(issueId)?.(options.meta.cwd, attempt, tools)
              } finally {
                opts.onRunningEnd?.()
              }
            },
          },
          dispose: async () => {},
        }
      },
    },
    sessions: { get: () => undefined },
    workspaceRegistry: { list: () => [] },
    get: () => undefined,
    logger: { warn: () => {}, info: () => {} },
    effect: () => {},
    inject(_keys: string[], callback: (ctx: any) => void) { callback(this) },
  }
  const service = new ProjectControlService(ctx, { fixConcurrency: opts.concurrency ?? 3, ...(opts.stepTimeoutMs !== undefined ? { stepTimeoutMs: opts.stepTimeoutMs } : {}) } as never)
  return { ctx, service, git, behaviors }
}

let temp: string
let root: string

beforeEach(() => {
  temp = mkdtempSync(join(tmpdir(), 'pc-fixdisp-'))
  root = join(temp, 'repo')
  mkdirSync(root, { recursive: true })
  initRepo(root)
})

afterEach(async () => {
  // Windows：git worktree 进程可能仍占着目录，稍等再删；失败则留给系统临时清理。
  await new Promise((resolve) => setTimeout(resolve, 1000))
  try {
    rmSync(temp, { recursive: true, force: true })
  } catch {
    console.warn(`[fix-dispatcher.spec] temp cleanup deferred: ${temp}`)
  }
})

async function setupProject(service: ProjectControlService, git: GitAdapter) {
  const project = (await new ProjectService(service.store.projects, (args: string[], cwd: string) => git.runGit(args, cwd)).ensureProject(root)).project
  const manager = new ReviewIssueManager(service.store.issues)
  const mkIssue = (title: string) => manager.createIssue({ projectId: project.id as never, changeId: 'review:aaaaaaaa' as never, severity: 'minor' as never, category: '测试' as never, title, description: '证据：x' })
  return { project, mkIssue }
}

describe('FixDispatcher', () => {
  it('禁改路径：apply_fix 硬拒 + 提示词含约束/记忆/档案', async () => {
    const { ctx, service, git, behaviors } = makeHarness()
    const { project, mkIssue } = await setupProject(service, git)
    // 种子：生效约束（禁改 locked/）+ 一条活跃记忆 + 项目档案（无 checkpoint → 档案段缺席属正常）。
    const now = Date.now()
    await service.store.confirmed.save({
      id: 'cf_test1', projectId: project.id, type: 'constraint',
      text: '锁定核心不动', forbiddenPaths: ['locked/core.ts'], status: 'active', createdAt: now, updatedAt: now,
    } as never)
    await service.store.memories.save({
      id: 'mem_t1', projectId: project.id as never, type: 'architecture_decision' as never,
      truthLevel: 'fact' as never, title: '分层架构：api 不直接依赖 db', content: 'x',
      isHumanConfirmed: true, gitBranch: null, createdAt: now, updatedAt: now, status: 'active',
    } as never)
    let capturedPrompt = ''
    const issue = await mkIssue('碰禁改路径')
    behaviors.set(issue.id, (_worktree, _attempt, tools) => {
      const apply = tools.get('project_control_apply_fix')!
      void apply.execute({ path: 'locked/core.ts', content: 'x' }, {})
        .then(() => finishTool(tools, { summary: '不该成功' }))
        .catch((error: unknown) => finishTool(tools, { summary: '被拒', blocked: String((error as Error).message).slice(0, 80) }))
    })
    const RealFixDispatcher = FixDispatcher
    const dispatcher = new RealFixDispatcher(ctx, service, git)
    // 抓提示词验证上下文注入（hook agents.create 的 followup 文本）。
    const origCreate = ctx.agents.create
    ctx.agents.create = async (options: { sessionId: string; meta: { cwd: string }; setup: (agentCtx: unknown) => Promise<void> }) => {
      const tools = new Map<string, { execute: (args: unknown, exec: unknown) => Promise<unknown> }>()
      await options.setup({ tools: { register: (tool: { name: string; execute: (args: unknown, exec: unknown) => Promise<unknown> }) => { tools.set(tool.name, tool) } } })
      const parts = options.sessionId.split('-')
      const issueId = parts.slice(2, -2).join('-')
      const attempt = Number(parts.at(-2))
      return {
        agent: { session: { id: options.sessionId }, followup: (message: { content?: Array<{ text?: string }> }) => {
          capturedPrompt = message.content?.[0]?.text ?? capturedPrompt
          behaviors.get(issueId)?.(options.meta.cwd, attempt, tools)
        } },
        dispose: async () => {},
      }
    }
    dispatcher.dispatch({ id: project.id, name: project.name, rootPath: root }, [{ issueId: issue.id, title: issue.title, evidence: '' }])
    await waitIdle(dispatcher)
    ctx.agents.create = origCreate
    // 提示词含三样上下文。
    expect(capturedPrompt).toContain('locked/core.ts')
    expect(capturedPrompt).toContain('禁改路径')
    expect(capturedPrompt).toContain('api 不直接依赖 db')
    // 硬拒生效：任务没改成禁改文件，最终按 blocked/无改动失败回写，问题保持 open。
    const issueRecord = service.store.issues.get(issue.id as never)
    expect(issueRecord?.status).toBe('open')
    expect(existsSync(join(root, 'locked'))).toBe(false)
  }, 40_000)

  it('happy path：worktree 修复 → cherry-pick 合并 → 回写 resolved → worktree 删除', async () => {
    const { ctx, service, git, behaviors } = makeHarness()
    const { project, mkIssue } = await setupProject(service, git)
    const issue = await mkIssue('空指针')
    behaviors.set(issue.id, (worktree, _attempt, tools) => {
      writeFileSync(join(worktree, 'fix.txt'), 'fixed\n')
      finishTool(tools, { summary: '加了空值检查', changedFiles: ['fix.txt'] })
    })
    const dispatcher = new FixDispatcher(ctx, service, git)
    const accepted = dispatcher.dispatch({ id: project.id, name: project.name, rootPath: root }, [{ issueId: issue.id, title: issue.title, evidence: '', approach: '补检查' }])
    expect(accepted).toBe(1)
    await waitIdle(dispatcher)
    const view = dispatcher.status()[0]!
    expect(view.status).toBe('done')
    expect(view.commit).toBeDefined()
    expect(service.store.issues.get(issue.id as never)?.status).toBe('resolved')
    expect(service.store.issues.get(issue.id as never)?.fixFiles).toEqual(['fix.txt'])
    const log = await git.runGit(['log', '--oneline', '-2'], root)
    expect(log).toContain('fix(review): 空指针')
    expect(() => { execFileSync('git', ['-C', root, 'show', 'HEAD:fix.txt']) }).not.toThrow()
    expect(existsSync(join(root, '.worktrees', `pc-fix-${issue.id}`))).toBe(false)
  }, 40_000)

  it('子代理无代码改动 → failed + 问题保持待处理', async () => {
    const { ctx, service, git, behaviors } = makeHarness()
    const { project, mkIssue } = await setupProject(service, git)
    const issue = await mkIssue('问题')
    behaviors.set(issue.id, (_worktree, _attempt, tools) => {
      finishTool(tools, { summary: '只是说了说' })
    })
    const dispatcher = new FixDispatcher(ctx, service, git)
    dispatcher.dispatch({ id: project.id, name: project.name, rootPath: root }, [{ issueId: issue.id, title: issue.title, evidence: '' }])
    await waitIdle(dispatcher)
    expect(dispatcher.status()[0]!.status).toBe('failed')
    expect(service.store.issues.get(issue.id as never)?.status).toBe('open')
    expect(existsSync(join(root, '.worktrees', `pc-fix-${issue.id}`))).toBe(false)
  }, 40_000)

  it('直派（无方案）完成后自动计算影响摘要；plan 派发不重复算', async () => {
    const { ctx, service, git, behaviors } = makeHarness()
    const { project, mkIssue } = await setupProject(service, git)
    // 建一个带引用关系的文件：main.js import util.js → 改 util.js 应产生直接影响。
    const env = { ...process.env, GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@x', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@x' }
    writeFileSync(join(root, 'util.js'), 'export const u = 1\n')
    writeFileSync(join(root, 'main.js'), 'import { u } from "./util.js"\nconsole.log(u)\n')
    execFileSync('git', ['-C', root, 'add', '.'], { env })
    execFileSync('git', ['-C', root, 'commit', '-qm', 'refs'], { env })
    // 直派任务：改 util.js。
    const direct = await mkIssue('直派改 util')
    behaviors.set(direct.id, (worktree, _attempt, tools) => {
      writeFileSync(join(worktree, 'util.js'), 'export const u = 2\n')
      finishTool(tools, { summary: '改了 u', changedFiles: ['util.js'] })
    })
    // plan 任务：也改 main.js（approach 提供 → 不自动算 impact）。
    const planned = await mkIssue('plan 改 main')
    behaviors.set(planned.id, (worktree, _attempt, tools) => {
      writeFileSync(join(worktree, 'main.js'), 'import { u } from "./util.js"\nconsole.log(u + 1)\n')
      finishTool(tools, { summary: '改了 main', changedFiles: ['main.js'] })
    })
    await service.store.fixPlans.save({
      id: 'fp_impact', projectId: project.id, issueId: planned.id as never,
      approach: '改 main.js', files: ['main.js'], impact: 'x', benefit: 'y', risk: 'z',
      status: 'pending', createdAt: Date.now(), updatedAt: Date.now(),
    } as never)
    const dispatcher = new FixDispatcher(ctx, service, git)
    dispatcher.dispatch({ id: project.id, name: project.name, rootPath: root }, [
      { issueId: direct.id, title: direct.title, evidence: '' },
      { issueId: planned.id, title: planned.title, evidence: '', approach: '改 main.js', files: ['main.js'], planId: 'fp_impact' },
    ])
    await waitIdle(dispatcher)
    const byTitle = new Map(dispatcher.status().map((task) => [task.title, task]))
    const directView = byTitle.get('直派改 util')!
    const plannedView = byTitle.get('plan 改 main')!
    expect(directView.status).toBe('done')
    expect(plannedView.status).toBe('done')
    // 直派：影响摘要存在；引擎语义 = direct=变更文件本身、importer 落 indirect（main.js 引用 util.js）。
    expect(directView.impact).toBeDefined()
    expect(['low', 'medium', 'high', 'critical']).toContain(directView.impact!.riskLevel)
    expect(directView.impact!.direct).toContain('util.js')
    expect(directView.impact!.indirect).toContain('main.js')
    // plan：不重复计算。
    expect(plannedView.impact).toBeUndefined()
  }, 40_000)

  it('并发=1 时任务严格串行（同一时刻只有一个运行）', async () => {
    let running = 0
    let maxRunning = 0
    const { ctx, service, git, behaviors } = makeHarness({
      concurrency: 1,
      onRunning: () => { running += 1; maxRunning = Math.max(maxRunning, running) },
      onRunningEnd: () => { running -= 1 },
    })
    const { project, mkIssue } = await setupProject(service, git)
    const inputs: Array<{ issueId: string; title: string; evidence: string }> = []
    for (let i = 1; i <= 3; i += 1) {
      const issue = await mkIssue(`问题${i}`)
      behaviors.set(issue.id, (worktree, _attempt, tools) => {
        writeFileSync(join(worktree, `f${worktree.slice(-3)}.txt`), 'x\n')
        finishTool(tools, { summary: `fix${i}`, changedFiles: [] })
      })
      inputs.push({ issueId: issue.id, title: issue.title, evidence: '' })
    }
    const dispatcher = new FixDispatcher(ctx, service, git)
    dispatcher.dispatch({ id: project.id, name: project.name, rootPath: root }, inputs)
    await waitIdle(dispatcher)
    expect(maxRunning).toBe(1)
    expect(dispatcher.status().every((task) => task.status === 'done')).toBe(true)
  }, 40_000)

  it('合并冲突自动重做：并发双改同一文件，后合并者基于新代码重做成功', async () => {
    // 并发=2：两个 worktree 基于同一 HEAD 改同一行 → 先合并者成功，后合并者
    // cherry-pick 冲突 → 删 worktree 基于新 HEAD 重做（追加式，不再冲突）。
    const conflictingFix: Behavior = (worktree, attempt, tools) => {
      if (attempt === 1) {
        writeFileSync(join(worktree, 'shared.txt'), `${readFileSync(join(worktree, 'shared.txt'), 'utf8')} contender\n`)
      } else {
        writeFileSync(join(worktree, 'shared.txt'), `${readFileSync(join(worktree, 'shared.txt'), 'utf8')} redo\n`)
      }
      finishTool(tools, { summary: `attempt${attempt}`, changedFiles: ['shared.txt'] })
    }
    const { ctx, service, git, behaviors } = makeHarness({ concurrency: 2 })
    const { project, mkIssue } = await setupProject(service, git)
    const issueA = await mkIssue('问题A')
    const issueB = await mkIssue('问题B')
    behaviors.set(issueA.id, conflictingFix)
    behaviors.set(issueB.id, conflictingFix)
    const dispatcher = new FixDispatcher(ctx, service, git)
    dispatcher.dispatch({ id: project.id, name: project.name, rootPath: root }, [
      { issueId: issueA.id, title: issueA.title, evidence: '' },
      { issueId: issueB.id, title: issueB.title, evidence: '' },
    ])
    await waitIdle(dispatcher)
    const statuses = dispatcher.status()
    // 两个都最终完成；恰好一个经历冲突重做（attempt=2）。
    expect(statuses.every((task) => task.status === 'done')).toBe(true)
    const attempts = statuses.map((task) => task.attempt).sort()
    expect(attempts).toEqual([1, 2])
    const content = execFileSync('git', ['-C', root, 'show', 'HEAD:shared.txt']).toString()
    expect(content).toContain('contender')
    expect(content).toContain('redo')
  }, 40_000)

  it('cancel：排队/运行中的任务终止并清理 worktree', async () => {
    const { ctx, service, git, behaviors } = makeHarness({ concurrency: 1 })
    const { project, mkIssue } = await setupProject(service, git)
    const issueC = await mkIssue('问题C')
    const issueD = await mkIssue('问题D')
    behaviors.set(issueC.id, () => { /* 挂起不完成 */ })
    behaviors.set(issueD.id, (worktree, _attempt, tools) => {
      writeFileSync(join(worktree, 'd.txt'), 'x\n')
      finishTool(tools, { summary: 'd', changedFiles: ['d.txt'] })
    })
    const dispatcher = new FixDispatcher(ctx, service, git)
    dispatcher.dispatch({ id: project.id, name: project.name, rootPath: root }, [
      { issueId: issueC.id, title: issueC.title, evidence: '' },
      { issueId: issueD.id, title: issueD.title, evidence: '' },
    ])
    await new Promise((resolve) => setTimeout(resolve, 800))
    expect(dispatcher.status().find((task) => task.title === '问题C')!.status).toBe('running')
    expect(dispatcher.status().find((task) => task.title === '问题D')!.status).toBe('queued')
    const stopped = dispatcher.cancel(root)
    expect(stopped).toBe(2)
    expect(dispatcher.status().every((task) => task.status === 'cancelled')).toBe(true)
  }, 40_000)

  it('plan 模式：只读出方案入库待评审——不注册 apply_fix、主仓零提交、问题保持 open', async () => {
    const { ctx, service, git, behaviors } = makeHarness()
    const { project, mkIssue } = await setupProject(service, git)
    const issue = await mkIssue('加号写成了减号')
    const headBefore = execFileSync('git', ['-C', root, 'rev-parse', 'HEAD']).toString().trim()
    let sawApplyFix = true
    behaviors.set(issue.id, (_worktree, _attempt, tools) => {
      // plan 模式物理上不该有写入口。
      sawApplyFix = tools.has('project_control_apply_fix')
      finishTool(tools, { summary: '确认属实', approach: 'calc.js 里把 - 改成 +', files: ['calc.js'], impact: '仅 sum 函数', benefit: '计算正确', risk: '低' })
    })
    const dispatcher = new FixDispatcher(ctx, service, git)
    dispatcher.dispatch({ id: project.id, name: project.name, rootPath: root }, [{ issueId: issue.id, title: issue.title, evidence: '', mode: 'plan' }])
    await waitIdle(dispatcher)
    const view = dispatcher.status()[0]!
    expect(view.status).toBe('done')
    expect(view.mode).toBe('plan')
    expect(view.commit).toBeUndefined()
    expect(view.summary).toContain('待评审')
    expect(sawApplyFix).toBe(false)
    const plans = (service.store.fixPlans.list() ?? []).filter((plan) => (plan as { issueId: string }).issueId === issue.id)
    expect(plans).toHaveLength(1)
    expect(plans[0]!.status).toBe('pending')
    expect(plans[0]!.approach).toContain('calc.js')
    expect(service.store.issues.get(issue.id as never)?.status).toBe('open')
    expect(execFileSync('git', ['-C', root, 'rev-parse', 'HEAD']).toString().trim()).toBe(headBefore)
    expect(existsSync(join(root, '.worktrees'))).toBe(false)
  }, 40_000)

  it('fix 模式 verdict：子代理判误报 → 直接回写关闭，不改代码不提交', async () => {
    const { ctx, service, git, behaviors } = makeHarness()
    const { project, mkIssue } = await setupProject(service, git)
    const issue = await mkIssue('疑似空指针')
    const headBefore = execFileSync('git', ['-C', root, 'rev-parse', 'HEAD']).toString().trim()
    behaviors.set(issue.id, (_worktree, _attempt, tools) => {
      finishTool(tools, { summary: '逻辑本来正确：调用方已保证非空', verdict: 'false_positive' })
    })
    const dispatcher = new FixDispatcher(ctx, service, git)
    dispatcher.dispatch({ id: project.id, name: project.name, rootPath: root }, [{ issueId: issue.id, title: issue.title, evidence: '' }])
    await waitIdle(dispatcher)
    const view = dispatcher.status()[0]!
    expect(view.status).toBe('done')
    expect(view.summary).toContain('误报')
    expect(view.commit).toBeUndefined()
    const record = service.store.issues.get(issue.id as never)
    expect(record?.status).toBe('rejected')
    expect(record?.resolution).toContain('误报')
    expect(execFileSync('git', ['-C', root, 'rev-parse', 'HEAD']).toString().trim()).toBe(headBefore)
    expect(existsSync(join(root, '.worktrees'))).toBe(false)
  }, 40_000)

  it('plan 模式 verdict：过时问题直接关闭且不落方案', async () => {
    const { ctx, service, git, behaviors } = makeHarness()
    const { project, mkIssue } = await setupProject(service, git)
    const issue = await mkIssue('老模块的死代码')
    behaviors.set(issue.id, (_worktree, _attempt, tools) => {
      finishTool(tools, { summary: '该模块在 abc123 中整体移除', verdict: 'obsolete' })
    })
    const dispatcher = new FixDispatcher(ctx, service, git)
    dispatcher.dispatch({ id: project.id, name: project.name, rootPath: root }, [{ issueId: issue.id, title: issue.title, evidence: '', mode: 'plan' }])
    await waitIdle(dispatcher)
    const view = dispatcher.status()[0]!
    expect(view.status).toBe('done')
    expect(view.summary).toContain('功能已移除/需求已变更')
    const record = service.store.issues.get(issue.id as never)
    expect(record?.status).toBe('rejected')
    expect(record?.resolution).toContain('功能已移除/需求已变更')
    expect((service.store.fixPlans.list() ?? []).filter((plan) => (plan as { issueId: string }).issueId === issue.id)).toHaveLength(0)
    expect(existsSync(join(root, '.worktrees'))).toBe(false)
  }, 40_000)

  it('异常中断（超时/额度耗尽模拟）：半成品改动丢弃，不合并不提交，问题保持待处理', async () => {
    const { ctx, service, git, behaviors } = makeHarness({ stepTimeoutMs: 2_500 })
    const { project, mkIssue } = await setupProject(service, git)
    const issue = await mkIssue('修到一半断了')
    const headBefore = execFileSync('git', ['-C', root, 'rev-parse', 'HEAD']).toString().trim()
    behaviors.set(issue.id, (_worktree, _attempt, tools) => {
      // 写了部分文件后"死掉"：不调完成工具，回合此后再无任何产出（模拟额度耗尽/模型故障）。
      void tools.get('project_control_apply_fix')!.execute({ path: 'partial.js', content: 'half-done\n' }, {})
    })
    const dispatcher = new FixDispatcher(ctx, service, git)
    dispatcher.dispatch({ id: project.id, name: project.name, rootPath: root }, [{ issueId: issue.id, title: issue.title, evidence: '' }])
    await waitIdle(dispatcher)
    const view = dispatcher.status()[0]!
    expect(view.status).toBe('failed')
    expect(view.error).toContain('异常中断')
    expect(view.commit).toBeUndefined()
    // 半成品绝不进主仓；worktree 连同半成品一并清理。
    expect(existsSync(join(root, 'partial.js'))).toBe(false)
    expect(existsSync(join(root, '.worktrees'))).toBe(false)
    expect(execFileSync('git', ['-C', root, 'rev-parse', 'HEAD']).toString().trim()).toBe(headBefore)
    // 问题不丢：回写保持待处理并注明中断。
    const record = service.store.issues.get(issue.id as never)
    expect(record?.status).toBe('open')
    expect(record?.description).toContain('异常中断')
  }, 40_000)

  it('启动恢复：dispatched 方案复位待评审 + 主仓 cherry-pick 冲突残留中止', async () => {
    const { ctx, service, git } = makeHarness()
    const { project } = await setupProject(service, git)
    const now = Date.now()
    // 种子：一个崩溃遗留的 dispatched 方案 + 一个正常 pending 方案。
    await service.store.fixPlans.save({ id: 'fix_stale1', projectId: project.id, issueId: 'iss_x' as never, approach: 'a', files: [], impact: 'i', benefit: 'b', risk: 'r', status: 'dispatched', createdAt: now, updatedAt: now } as never)
    await service.store.fixPlans.save({ id: 'fix_pend1', projectId: project.id, issueId: 'iss_y' as never, approach: 'a', files: [], impact: 'i', benefit: 'b', risk: 'r', status: 'pending', createdAt: now, updatedAt: now } as never)
    // 制造 cherry-pick 冲突挂起：side 分支改 shared.txt 一行，main 也改同一行，cherry-pick side → 冲突残留。
    const env = { ...process.env, GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@x', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@x' }
    execFileSync('git', ['-C', root, 'checkout', '-q', '-b', 'side'], { env })
    writeFileSync(join(root, 'shared.txt'), 'side\n')
    execFileSync('git', ['-C', root, 'add', 'shared.txt'], { env })
    execFileSync('git', ['-C', root, 'commit', '-qm', 'side change'], { env })
    execFileSync('git', ['-C', root, 'checkout', '-q', 'main'], { env })
    writeFileSync(join(root, 'shared.txt'), 'main\n')
    execFileSync('git', ['-C', root, 'add', 'shared.txt'], { env })
    execFileSync('git', ['-C', root, 'commit', '-qm', 'main change'], { env })
    try {
      execFileSync('git', ['-C', root, 'cherry-pick', 'side'], { env })
    } catch {
      // 预期冲突（execFileSync 非零退出会抛）。
    }
    expect(existsSync(join(root, '.git', 'CHERRY_PICK_HEAD'))).toBe(true)
    const dispatcher = new FixDispatcher(ctx, service, git)
    const recovered = await dispatcher.recoverInterrupted({ id: project.id, rootPath: root })
    expect(recovered).toBe(1)
    expect(service.store.fixPlans.get('fix_stale1' as never)?.status).toBe('pending')
    expect(service.store.fixPlans.get('fix_pend1' as never)?.status).toBe('pending')
    expect(existsSync(join(root, '.git', 'CHERRY_PICK_HEAD'))).toBe(false)
    // cherry-pick 已不在进行中：后续合并不被堵（abort 后回到冲突前的干净状态）。
    expect(execFileSync('git', ['-C', root, 'status', '--porcelain'], { env }).toString().trim()).toBe('')
  }, 40_000)

  it('cancel：被取消任务的 dispatched 方案复位待评审', async () => {
    const { ctx, service, git, behaviors } = makeHarness({ concurrency: 1 })
    const { project, mkIssue } = await setupProject(service, git)
    const issue = await mkIssue('带方案被停')
    const now = Date.now()
    await service.store.fixPlans.save({ id: 'fix_cancel1', projectId: project.id, issueId: issue.id as never, approach: 'x', files: [], impact: 'i', benefit: 'b', risk: 'r', status: 'dispatched', createdAt: now, updatedAt: now } as never)
    behaviors.set(issue.id, () => { /* 挂起不完成 */ })
    const dispatcher = new FixDispatcher(ctx, service, git)
    dispatcher.dispatch({ id: project.id, name: project.name, rootPath: root }, [{ issueId: issue.id, title: issue.title, evidence: '', approach: 'x', planId: 'fix_cancel1' }])
    await new Promise((resolve) => setTimeout(resolve, 800))
    expect(dispatcher.status()[0]!.status).toBe('running')
    dispatcher.cancel(root)
    // 方案复位是 best-effort 异步：稍等落盘。
    await new Promise((resolve) => setTimeout(resolve, 400))
    expect(service.store.fixPlans.get('fix_cancel1' as never)?.status).toBe('pending')
  }, 40_000)

  it('问题终局关闭时，同问题的其他待评审方案一并作废', async () => {
    const { ctx, service, git, behaviors } = makeHarness()
    const { project, mkIssue } = await setupProject(service, git)
    const issue = await mkIssue('直派修好但有旧方案')
    const now = Date.now()
    await service.store.fixPlans.save({ id: 'fix_stale_p', projectId: project.id, issueId: issue.id as never, approach: '旧方案', files: [], impact: 'i', benefit: 'b', risk: 'r', status: 'pending', createdAt: now, updatedAt: now } as never)
    behaviors.set(issue.id, (worktree, _attempt, tools) => {
      writeFileSync(join(worktree, 'fix.txt'), 'ok\n')
      finishTool(tools, { summary: '修好了', changedFiles: ['fix.txt'] })
    })
    const dispatcher = new FixDispatcher(ctx, service, git)
    // 直派（无 planId）修复成功 → 遗留的 pending 方案应作废，不再假显示待评审。
    dispatcher.dispatch({ id: project.id, name: project.name, rootPath: root }, [{ issueId: issue.id, title: issue.title, evidence: '' }])
    await waitIdle(dispatcher)
    expect(dispatcher.status()[0]!.status).toBe('done')
    expect(service.store.issues.get(issue.id as never)?.status).toBe('resolved')
    expect(service.store.fixPlans.get('fix_stale_p' as never)?.status).toBe('rejected')
  }, 40_000)

  it('apply_fix replace 模式：大文件精确局部替换成功并正常合并', async () => {
    const { ctx, service, git, behaviors } = makeHarness()
    const { project, mkIssue } = await setupProject(service, git)
    const env = { ...process.env, GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@x', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@x' }
    writeFileSync(join(root, 'big.txt'), Array.from({ length: 300 }, (_, i) => `line ${i}\n`).join(''))
    execFileSync('git', ['-C', root, 'add', 'big.txt'], { env })
    execFileSync('git', ['-C', root, 'commit', '-qm', 'add big file'], { env })
    const issue = await mkIssue('大文件局部修改')
    behaviors.set(issue.id, (_worktree, _attempt, tools) => {
      const apply = tools.get('project_control_apply_fix')!
      void apply.execute({ path: 'big.txt', mode: 'replace', search: 'line 5\n', replace: 'line 5 patched\n' }, {})
        .then(() => finishTool(tools, { summary: '局部替换完成', changedFiles: ['big.txt'] }))
        .catch((error: unknown) => finishTool(tools, { summary: '替换失败', blocked: String((error as Error).message).slice(0, 100) }))
    })
    const dispatcher = new FixDispatcher(ctx, service, git)
    dispatcher.dispatch({ id: project.id, name: project.name, rootPath: root }, [{ issueId: issue.id, title: issue.title, evidence: '' }])
    await waitIdle(dispatcher)
    const view = dispatcher.status()[0]!
    expect(view.status).toBe('done')
    expect(view.files).toContain('big.txt')
    const content = execFileSync('git', ['-C', root, 'show', 'HEAD:big.txt']).toString()
    expect(content).toContain('line 5 patched')
    expect(content).toContain('line 299\n')
    expect(service.store.issues.get(issue.id as never)?.status).toBe('resolved')
  }, 40_000)

  it('apply_fix replace 模式：search 不唯一/不存在都报错且不产生改动', async () => {
    const { ctx, service, git, behaviors } = makeHarness()
    const { project, mkIssue } = await setupProject(service, git)
    const env = { ...process.env, GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@x', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@x' }
    writeFileSync(join(root, 'big.txt'), Array.from({ length: 300 }, (_, i) => `line ${i}\n`).join(''))
    execFileSync('git', ['-C', root, 'add', 'big.txt'], { env })
    execFileSync('git', ['-C', root, 'commit', '-qm', 'add big file'], { env })
    const headBefore = execFileSync('git', ['-C', root, 'rev-parse', 'HEAD']).toString().trim()
    const issue = await mkIssue('替换参数错误')
    behaviors.set(issue.id, (_worktree, _attempt, tools) => {
      const apply = tools.get('project_control_apply_fix')!
      const errors: string[] = []
      void apply.execute({ path: 'big.txt', mode: 'replace', search: 'line', replace: 'x' }, {})
        .catch((error: unknown) => errors.push(String((error as Error).message)))
        .then(() => apply.execute({ path: 'big.txt', mode: 'replace', search: 'no such line here', replace: 'x' }, {}))
        .catch((error: unknown) => errors.push(String((error as Error).message)))
        .then(() => finishTool(tools, { summary: '两次替换都被拒', blocked: errors.join(' | ').slice(0, 160) }))
    })
    const dispatcher = new FixDispatcher(ctx, service, git)
    dispatcher.dispatch({ id: project.id, name: project.name, rootPath: root }, [{ issueId: issue.id, title: issue.title, evidence: '' }])
    await waitIdle(dispatcher)
    const view = dispatcher.status()[0]!
    expect(view.status).toBe('failed')
    expect(view.error).toContain('times in')
    expect(view.error).toContain('not found')
    // 主仓零改动，问题保持待处理。
    expect(execFileSync('git', ['-C', root, 'rev-parse', 'HEAD']).toString().trim()).toBe(headBefore)
    expect(service.store.issues.get(issue.id as never)?.status).toBe('open')
  }, 40_000)
})
