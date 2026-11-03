/**
 * 修复派发器（FixDispatcher）：把评审问题的修复派发给并发子 Agent，每任务独立
 * git worktree 物理隔离，完成后串行 cherry-pick 回主分支。
 *
 * 设计要点（业主 2026-11-03 批准）：
 * - 并发：上限取 liveConfig.fixConcurrency（默认 3）；worktree 隔离无需文件锁。
 * - 合并串行：主仓库 cherry-pick 一次只跑一个（mergeLock）；冲突 = 执行期间主分支
 *   已被其他任务推进 → 删 worktree 基于新 HEAD 重做（模型修复可重放），重试上限 2。
 * - worktree 生命周期：`.worktrees/pc-fix-<issueId>/`，成功/失败/跳过即删；
 *   进程崩溃残留由 cleanupOrphans 在启动/派发前清扫。
 * - 回写：成功 → applyChatVerdict(fixed)；冲突超限/无改动/blocked → confirmed（保持
 *   待处理并注明原因），绝不静默丢问题。
 * - 子代理约束：只许改 worktree 内文件、禁止自行 git commit（合并器统一提交）、
 *   完成必须调 project_control_fix_complete 工具。
 *
 * @module dsh-project-control/runtime/fix-dispatcher
 */

import type { Context } from '@deepseek-ai/cordis'
import { createUserMessage } from '@deepseek-ai/dsh-llm'
import { defineTool } from '@deepseek-ai/dsh-tools'
import type { ToolRunContext } from '@deepseek-ai/dsh-tools'
import { join } from 'node:path'
import { rmSync } from 'node:fs'
import { readdirSync } from 'node:fs'
import type { ProjectControlService } from '../plugin/service.ts'
import type { GitAdapter } from '../git/adapter.ts'
import { ReviewIssueManager } from '../verification/issues.ts'
import { resolveDeploymentRoute } from '../config.ts'

/** 单个修复任务（派发输入）。 */
export interface FixTaskInput {
  issueId: string
  title: string
  evidence: string
  /** 方案文本（plan 来源时有；为空则子代理自主判定+修复）。 */
  approach?: string
  /** 方案声明的文件（参考性）。 */
  files?: string[]
  planId?: string
}

/** 任务运行视图（API 暴露给面板）。 */
export interface FixTaskView {
  issueId: string
  title: string
  status: 'queued' | 'running' | 'merging' | 'redo' | 'done' | 'conflict' | 'failed' | 'cancelled'
  attempt: number
  summary?: string
  files?: string[]
  commit?: string
  error?: string
  startedAt?: number
  finishedAt?: number
}

interface FixTask extends FixTaskInput {
  view: FixTaskView
}

/** 子代理完成协议的载荷。 */
interface FixOutcome {
  summary: string
  changedFiles: string[]
  blocked?: string
}

export const FIX_MAX_ATTEMPTS = 2
const FIX_WORKTREE_PREFIX = 'pc-fix-'

export class FixDispatcher {
  private readonly tasks = new Map<string, FixTask>()
  private readonly queue: string[] = []
  private active = 0
  private cancelled = false
  /** 主仓库合并互斥（cherry-pick 串行）。 */
  private mergeLock: Promise<unknown> = Promise.resolve()

  constructor(
    private readonly ctx: Context,
    private readonly service: ProjectControlService,
    private readonly git: GitAdapter,
  ) {}

  /** 当前并发上限（设置页可调，实时生效）。 */
  private get concurrency(): number {
    return Math.max(1, Math.min(10, this.service.liveConfig.fixConcurrency ?? 3))
  }

  status(): FixTaskView[] {
    return [...this.tasks.values()].map((task) => ({ ...task.view }))
  }

  /** 是否有任务在跑/排队（防止对同批重复派发）。 */
  isBusy(): boolean {
    return this.active > 0 || this.queue.length > 0
  }

  /** 派发一批任务；已在队列/运行中的 issueId 跳过。返回实际接受数。 */
  dispatch(project: { id: string; name: string; rootPath: string }, inputs: FixTaskInput[]): number {
    this.cancelled = false
    let accepted = 0
    for (const input of inputs) {
      const existing = this.tasks.get(input.issueId)
      if (existing !== undefined && !this.isTerminal(existing.view.status)) continue
      const task: FixTask = {
        ...input,
        view: { issueId: input.issueId, title: input.title, status: 'queued', attempt: existing !== undefined ? existing.view.attempt + 1 : 1 },
      }
      this.tasks.set(input.issueId, task)
      this.queue.push(task.issueId)
      accepted += 1
    }
    this.pump(project)
    return accepted
  }

  /** 取消：停止派发新任务，终止运行中的子代理，清理 worktree。 */
  cancel(projectRoot: string): number {
    this.cancelled = true
    this.queue.length = 0
    let stopped = 0
    for (const task of this.tasks.values()) {
      if (!this.isTerminal(task.view.status)) {
        task.view.status = 'cancelled'
        task.view.finishedAt = Date.now()
        stopped += 1
      }
    }
    // 运行中的子代理由 runTask 的 finally 收尾（active 任务查 status 已 cancelled 即中止）；
    // worktree 兜底清理交给 cleanupOrphans（下一次派发/启动时）。
    void this.cleanupOrphans(projectRoot).catch(() => {})
    return stopped
  }

  private isTerminal(status: FixTaskView['status']): boolean {
    return status === 'done' || status === 'conflict' || status === 'failed' || status === 'cancelled'
  }

  private pump(project: { id: string; name: string; rootPath: string }): void {
    while (!this.cancelled && this.active < this.concurrency && this.queue.length > 0) {
      const issueId = this.queue.shift()!
      const task = this.tasks.get(issueId)
      if (task === undefined || this.isTerminal(task.view.status)) continue
      this.active += 1
      void this.runTask(project, task)
        .catch((error: unknown) => {
          task.view.status = 'failed'
          task.view.error = error instanceof Error ? error.message : String(error)
          // 真机排障：空 message 的异常只有栈可辨（2026-11-04 真机 8 秒空错误）。
          console.error('[pc-fix] task crashed:', error)
        })
        .finally(() => {
          this.active -= 1
          this.pump(project)
        })
    }
  }

  private worktreePath(root: string, issueId: string): string {
    const safeId = issueId.replace(/[^A-Za-z0-9_-]/g, '_')
    return join(root, '.worktrees', `${FIX_WORKTREE_PREFIX}${safeId}`)
  }

  /** 创建（先清已有）基于当前 HEAD 的 detached worktree。 */
  private async createWorktree(root: string, issueId: string): Promise<string> {
    const path = this.worktreePath(root, issueId)
    await this.git.runGit(['worktree', 'remove', '--force', path], root).catch(() => {})
    await this.git.runGit(['worktree', 'prune'], root).catch(() => {})
    await this.git.runGit(['worktree', 'add', '--detach', path, 'HEAD'], root)
    return path
  }

  private async removeWorktree(root: string, issueId: string): Promise<void> {
    const path = this.worktreePath(root, issueId)
    await this.git.runGit(['worktree', 'remove', '--force', path], root).catch(() => {})
    await this.git.runGit(['worktree', 'prune'], root).catch(() => {})
    // git 只删 worktree 本体，.worktrees 父目录会空壳残留——一并清掉（目录非空则不动）。
    const parent = join(root, '.worktrees')
    try {
      const { readdirSync, rmdirSync } = await import('node:fs')
      if (readdirSync(parent).length === 0) rmdirSync(parent)
    } catch {
      // 目录不存在或非空：无事可做。
    }
  }

  /** 清扫崩溃残留的修复 worktree（启动/派发前调用）。 */
  async cleanupOrphans(root: string): Promise<number> {
    const dir = join(root, '.worktrees')
    let removed = 0
    try {
      for (const name of readdirSync(dir)) {
        if (!name.startsWith(FIX_WORKTREE_PREFIX)) continue
        await this.git.runGit(['worktree', 'remove', '--force', join(dir, name)], root).catch(() => {})
        rmSync(join(dir, name), { recursive: true, force: true })
        removed += 1
      }
      await this.git.runGit(['worktree', 'prune'], root).catch(() => {})
    } catch {
      // .worktrees 目录不存在等：无事可清。
    }
    return removed
  }

  private async runTask(project: { id: string; name: string; rootPath: string }, task: FixTask): Promise<void> {
    const view = task.view
    view.status = 'running'
    view.startedAt = Date.now()
    const worktree = await this.createWorktree(project.rootPath, task.issueId)
    try {
      let outcome = await this.runSubAgent(project, task, worktree)
      if (view.status === 'cancelled') return

      if (outcome === undefined) {
        // 兜底：代理没走完成协议，但 worktree 有真实改动 → 采纳改动继续合并
        // （2026-11-04 真机：模型首次 edit 已成功却在沙箱字段上死循环、从未调
        // 完成工具——有改动即有效修复，合并路径自会校验）。无改动才判失败。
        const strayStatus = await this.git.runGit(['status', '--porcelain'], worktree).catch(() => '')
        if (strayStatus.trim() === '') {
          view.status = 'failed'
          view.error = '子代理结束但未调用完成工具，且 worktree 无任何改动'
          await this.writeBack(project, task, 'confirmed', `派发修复未产出完成报告（第 ${view.attempt} 次）：${view.error}`)
          return
        }
        outcome = { summary: '代理未调用完成工具，但 worktree 有改动（自动采纳，合并器统一提交）', changedFiles: state.changed }
      }
      // 空字符串 blocked 视为未设置（2026-11-04 真机：模型完成调用带 blocked:"" 被误判阻塞）。
      if (outcome.blocked !== undefined && outcome.blocked !== '') {
        view.status = 'failed'
        view.error = outcome.blocked
        await this.writeBack(project, task, 'confirmed', `派发修复报告阻塞（第 ${view.attempt} 次）：${outcome.blocked}`)
        return
      }

      // worktree 内改动检查：status 非空即有改动。
      const status = await this.git.runGit(['status', '--porcelain'], worktree).catch(() => '')
      if (status.trim() === '') {
        view.status = 'failed'
        view.error = '子代理报告完成但 worktree 无任何改动'
        await this.writeBack(project, task, 'confirmed', `派发修复无代码改动（第 ${view.attempt} 次）：${outcome.summary.slice(0, 200)}`)
        return
      }

      // 合并（串行）：worktree 提交 → 主仓 cherry-pick。
      view.status = 'merging'
      const commitMessage = `fix(review): ${task.title.slice(0, 80)}\n\nChat-verified fix dispatched to sub-agent (attempt ${view.attempt}).`
      await this.git.runGit(['add', '-A'], worktree)
      await this.git.runGit(['-c', 'user.name=pc-fix-agent', '-c', 'user.email=pc-fix@project-control.local', 'commit', '-m', commitMessage], worktree)
      const sha = (await this.git.runGit(['rev-parse', 'HEAD'], worktree)).trim()

      const merged = await this.serialMerge(async () => {
        const pick = await this.git.runGit(['cherry-pick', sha], project.rootPath)
        return pick
      })
      if (merged.ok) {
        view.status = 'done'
        view.summary = outcome.summary
        view.files = outcome.changedFiles
        view.commit = sha.slice(0, 8)
        view.finishedAt = Date.now()
        await this.writeBack(project, task, 'fixed', `派发修复（第 ${view.attempt} 次）：${outcome.summary}`, outcome.changedFiles)
        return
      }

      // 冲突：cherry-pick 失败 → abort，判断重做或终局。
      await this.git.runGit(['cherry-pick', '--abort'], project.rootPath).catch(() => {})
      view.error = `合并冲突（主分支在执行期间已推进）：${merged.error.slice(0, 200)}`
      if (view.attempt < FIX_MAX_ATTEMPTS) {
        view.status = 'redo'
        await this.removeWorktree(project.rootPath, task.issueId)
        const redo: FixTask = { ...task, view: { ...view, status: 'queued', attempt: view.attempt + 1, error: undefined } }
        this.tasks.set(task.issueId, redo)
        this.queue.push(task.issueId)
        this.pump(project)
        return
      }
      view.status = 'conflict'
      view.finishedAt = Date.now()
      await this.writeBack(project, task, 'confirmed', `派发修复合并冲突且重做超限（${view.attempt} 次）：保留待处理，建议人工处理。原始方案：${task.approach?.slice(0, 150) ?? ''}`)
    } finally {
      if (view.status !== 'redo') {
        await this.removeWorktree(project.rootPath, task.issueId).catch(() => {})
      }
    }
  }

  /** 串行合并：主仓库的 cherry-pick 全局互斥。 */
  private serialMerge<T>(operation: () => Promise<T>): Promise<{ ok: true; value: T } | { ok: false; error: string }> {
    const run = this.mergeLock.then(async () => {
      try {
        const value = await operation()
        return { ok: true as const, value }
      } catch (error: unknown) {
        return { ok: false as const, error: error instanceof Error ? error.message : String(error) }
      }
    })
    this.mergeLock = run.then(() => undefined, () => undefined)
    return run
  }

  /** 回写问题状态 + 方案状态。 */
  private async writeBack(project: { id: string }, task: FixTask, verdict: 'fixed' | 'confirmed', note: string, files?: string[]): Promise<void> {
    try {
      const manager = new ReviewIssueManager(this.service.store!.issues)
      await manager.applyChatVerdict(task.issueId as never, verdict, note, files)
      if (task.planId !== undefined) {
        const plan = this.service.store!.fixPlans.get(task.planId)
        if (plan !== undefined) {
          plan.status = verdict === 'fixed' ? 'completed' : 'pending'
          plan.updatedAt = Date.now()
          await this.service.store!.fixPlans.save(plan)
        }
      }
    } catch (error: unknown) {
      this.ctx.logger?.warn?.(`project-control: fix write-back failed for ${task.issueId}: ${String(error)}`)
    }
  }

  /** 跑一个子代理修复任务；返回完成协议载荷（未调用工具返回 undefined）。 */
  private async runSubAgent(project: { id: string; name: string; rootPath: string }, task: FixTask, worktree: string): Promise<FixOutcome | undefined> {
    const state: { outcome?: FixOutcome; changed: string[] } = { changed: [] }
    const sessionId = `pc-fix-${task.issueId}-${task.view.attempt}-${Date.now().toString(36)}`
    const route = resolveDeploymentRoute(this.ctx, 'standard', this.service.liveConfig)
    const handle = await (this.ctx as any).agents.create({
      sessionId,
      meta: { cwd: worktree, origin: 'subagent' },
      agentOptions: { provider: route.provider, model: route.model },
      setup: async (agentCtx: Context) => {
        try {
          await (agentCtx as unknown as { get(name: 'agentPresets'): { mount(c: Context, id?: string): Promise<unknown> } | undefined })
            .get('agentPresets')?.mount(agentCtx)
        } catch (error: unknown) {
          this.ctx.logger?.warn?.(`project-control: fix subagent preset mount failed: ${String(error)}`)
        }
        // 专用写文件工具：进程内直写 worktree（范本 write_agent_note），完全绕开
        // edit/bash 工具的沙箱字段校验——2026-11-04 真机证实网关模型会强制附带
        // sandbox_permissions/justification 并被逐次拒绝，陷入无谓重试。
        const { writeFileSync } = await import('node:fs')
        agentCtx.tools.register(defineTool({
          name: 'project_control_apply_fix',
          description: 'Write one file with its full new content, relative to your worktree root. Use this for EVERY file modification in the fix — do not use edit/bash/pwsh for writing files.',
          parameters: {
            path: { type: 'string', required: true, description: 'Relative file path inside the worktree, e.g. "src/bug.js".' },
            content: { type: 'string', required: true, description: 'The COMPLETE new file content (not a diff).' },
          },
          output: {
            schema: { type: 'string' },
            render: (_args: unknown, value: unknown) => [{ type: 'text', text: String(value) }],
          },
          async execute(args: { path: string; content: string }) {
            const safe = args.path.replace(/\\/g, '/').replace(/^\.?\//, '')
            if (safe.includes('..') || safe === '') throw new Error('path must be a relative path inside the worktree')
            const target = join(worktree, safe)
            writeFileSync(target, args.content, 'utf8')
            state.changed.push(safe)
            return `Written: ${safe}`
          },
        }))
        agentCtx.tools.register(defineTool({
          name: 'project_control_fix_complete',
          description: 'Report the fix result. Call exactly once when done: after applying ALL file changes (or immediately when blocked).',
          parameters: {
            summary: { type: 'string', required: true, description: 'What was fixed, one or two sentences.' },
            changedFiles: { type: 'array', items: { type: 'string' }, description: 'Relative paths of files changed.' },
            blocked: { type: 'string', description: 'Set only when the fix cannot be applied; describe the blocker.' },
          },
          output: {
            schema: { type: 'string' },
            render: (_args: unknown, value: unknown) => [{ type: 'text', text: String(value) }],
          },
          async execute(args: { summary: string; changedFiles?: string[]; blocked?: string }, exec: ToolRunContext) {
            state.outcome = { summary: args.summary, changedFiles: args.changedFiles ?? [], blocked: args.blocked }
            exec.concludeTurn()
            return 'Fix result recorded.'
          },
        }))
      },
    })
    try {
      const prompt = this.composeFixPrompt(project, task, worktree)
      handle.agent.followup(createUserMessage({
        content: [{ type: 'text', text: prompt }],
        source: { kind: 'project-control' },
      }))
      const settled = await this.waitTurn(handle.agent.session.id, state, task.view)
      if (settled === 'outcome') return state.outcome
      if (settled === 'ended' && state.outcome === undefined) {
        // 催促一轮完成协议（与 orchestrator 相同）。
        handle.agent.followup(createUserMessage({
          content: [{ type: 'text', text: 'You finished your turn WITHOUT calling project_control_fix_complete. Call it now exactly once with a faithful summary (changedFiles if any); set blocked only if the fix truly cannot proceed.' }],
          source: { kind: 'project-control' },
        }))
        const retry = await this.waitTurn(handle.agent.session.id, state, task.view)
        if (retry === 'outcome') return state.outcome
      }
      return state.outcome
    } finally {
      await handle.dispose().catch(() => {})
    }
  }

  /** 确定性等待回合结束。回合真关闭的判定：事件流里最后一个 turn 事件是 turn/end
   *  （0.1.x 宿主事件按 attempt 整段批量落盘，模型生成期间事件流长时间静默——
   *  纯静默阈值会把生成中误判为结束并过早 dispose 掐死回合，2026-11-04 真机事故）。 */
  private async waitTurn(sessionId: string, state: { outcome?: FixOutcome }, view?: FixTaskView): Promise<'outcome' | 'ended' | 'timeout'> {
    const timeoutMs = this.service.liveConfig.stepTimeoutMs
    const deadline = Date.now() + timeoutMs
    const silenceLimitMs = Math.min(180_000, timeoutMs)
    let lastCount = -1
    let lastProgressAt = Date.now()
    while (Date.now() < deadline) {
      if (state.outcome !== undefined) return 'outcome'
      // 任务被取消：立即结束等待（runTask 侧按 cancelled 收尾）。
      if (view !== undefined && view.status === 'cancelled') return 'ended'
      const events = (this.ctx as any).sessions?.get?.(sessionId)?.events as Array<{ type?: string }> | undefined
      const count = events?.length ?? 0
      // 回合是否仍开着：最后一个 turn/start|turn/end 事件决定。
      let turnOpen = false
      let assistant = 0
      if (events !== undefined) {
        for (let i = events.length - 1; i >= 0; i -= 1) {
          const type = events[i]!.type
          if (type === 'turn/start') { turnOpen = true; break }
          if (type === 'turn/end') break
        }
        assistant = events.filter((event) => event.type === 'assistant/message').length
      }
      if (count !== lastCount || turnOpen) {
        // 回合开着 = 模型仍在生成/执行工具，事件未增长也算活跃。
        lastCount = count
        lastProgressAt = Date.now()
      }
      if (!turnOpen && assistant > 0 && Date.now() - lastProgressAt > 2500) return 'ended'
      if (Date.now() - lastProgressAt > silenceLimitMs) return 'timeout'
      await new Promise((resolve) => setTimeout(resolve, 400))
    }
    return 'timeout'
  }

  private composeFixPrompt(project: { id: string; name: string }, task: FixTask, worktree: string): string {
    const planBlock = task.approach !== undefined && task.approach !== ''
      ? [
          '【已批准的修复方案（按此执行，除非代码现状使其不可行——不可行时调工具报 blocked 并说明）】',
          `- 方案：${task.approach}`,
          `- 计划改动文件：${(task.files ?? []).join(', ') || '（方案未指定，自行判断）'}`,
        ]
      : [
          '【无预置方案：自主判定并修复】',
          '先确认问题在当前代码仍真实存在（文件/符号还在、行为不是有意变更）；不存在或属有意设计 → 调工具报 blocked 说明"问题已过时"。',
        ]
    return [
      `你是修复执行代理，工作在独立 git worktree 中（路径：${worktree}，项目：${project.name}）。`,
      `任务：修复以下评审问题。`,
      '',
      `== 问题 ==`,
      `标题：${task.title}`,
      task.evidence !== '' ? `证据：${task.evidence}` : '',
      '',
      ...planBlock,
      '',
      '== 约束 ==',
      '- 只修改 worktree 内的文件（你的工作目录就是 worktree 根）；改动保持最小侵入。',
      '- 禁止执行 git commit / git add——提交由合并器统一处理。',
      '- 禁止 push、禁止改分支。',
      '- 文件修改【只】用 project_control_apply_fix 工具（参数 path + 完整新内容 content）写入。不要用 edit/bash/pwsh 写文件——它们的沙箱参数校验在此环境会拒绝；也不要在任何工具调用里设置 sandbox_permissions 字段。',
      '- 修复完成（文件已改好）后立即调用 project_control_fix_complete，summary 写清修了什么，changedFiles 列出你改的相对路径。',
      '- 无法修复（问题已过时/需要产品决策/依赖缺失）→ 同样调用工具并设置 blocked 字段说明原因，不要硬修。',
    ].filter((line) => line !== '').join('\n')
  }
}
