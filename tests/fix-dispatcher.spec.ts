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

const finishTool = (tools: Map<string, { execute: (args: unknown, exec: unknown) => Promise<unknown> }>, args: { summary: string; changedFiles?: string[]; blocked?: string }): void => {
  void tools.get('project_control_fix_complete')!.execute(args, { concludeTurn: () => {} })
}

function initRepo(path: string): void {
  const env = { ...process.env, GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@x', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@x' }
  execFileSync('git', ['init', '-q', '-b', 'main', path], { env })
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

function makeHarness(opts: { concurrency?: number; onRunning?: () => void; onRunningEnd?: () => void } = {}) {
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
  const service = new ProjectControlService(ctx, { fixConcurrency: opts.concurrency ?? 3 } as never)
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
})
