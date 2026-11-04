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
 * - 容错（业主 2026-11-04 要求）：超时/模型故障/额度耗尽=异常中断，worktree
 *   半成品改动一律丢弃（绝不合并可能写坏一半的代码），问题回写保持待处理；
 *   只有"回合正常结束但没调完成工具"才采纳真实改动。进程崩溃/关机：问题状态
 *   与方案库是磁盘事实源（未回写=仍待处理），启动时 recoverInterrupted 中止
 *   主仓 cherry-pick 残留 + dispatched 方案复位待评审；cancel 同样复位方案。
 *   不自动重试消耗额度——重派由业主决定。
 * - 回写：成功 → applyChatVerdict(fixed)；子代理判定误报/重复/过时/早已修复 →
 *   applyChatVerdict 对应结论直接关闭（不改代码）；冲突超限/无改动/blocked →
 *   confirmed（保持待处理并注明原因），绝不静默丢问题。
 * - 模式：fix=判定+修复+合并提交（默认）；plan=只读出方案落 fix_plans 待评审
 *   （不改任何代码、不合并不提交，worktree 用后即弃）。
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
import { ProjectGraph } from '../analysis/graph.ts'
import { ImpactEngine } from '../analysis/impact.ts'

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
  /** fix=判定+修复+合并提交（默认）；plan=只读出方案入库待评审，不改代码。 */
  mode?: 'fix' | 'plan'
}

/** 修复影响摘要（直派任务完成后自动计算，进度卡展示）。 */
export interface FixImpactView {
  riskLevel: string
  riskScore: number
  direct: string[]
  indirect: string[]
  potential: string[]
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
  /** 运行中子代理的最近动作（读了/写了哪个文件），来自会话事件流实时扫描。 */
  currentAction?: string
  /** 完成后的影响摘要（无方案直派任务自动计算；plan 任务看方案块自身的影响字段）。 */
  impact?: FixImpactView
  /** 任务模式：fix=修复（默认）；plan=只读出方案。 */
  mode?: 'fix' | 'plan'
  /** fix 任务且按批准方案执行（进度卡轮次文案「执行·方案#N」用）。 */
  planExec?: boolean
  /** 模型报错后的续跑次数（followup 接续，上下文无损）。 */
  resumes?: number
  /** 总时限到点后的探活次数。 */
  probes?: number
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
  /** 判定结论（不需要改代码，直接回写关闭问题）。 */
  verdict?: '' | 'false_positive' | 'duplicate' | 'obsolete' | 'already_fixed'
  /** plan 模式产出的结构化方案（入库待评审）。 */
  plan?: { approach: string; files: string[]; impact: string; benefit: string; risk: string }
}

/** 子代理回合结果：outcome 未给时，endedClean 区分"正常结束没调工具"（可采纳
 *  worktree 真实改动——真机沙箱死循环但改动完整的场景）与"异常中断"
 *  （连续报错/探活零响应——半成品不可信，一律丢弃，绝不合并）。 */
interface SubAgentResult {
  outcome?: FixOutcome
  endedClean: boolean
  /** apply_fix 实际写过的文件（采纳兜底时作 changedFiles）。 */
  changed: string[]
  /** endedClean=false 时的死因（重派与进度文案用）。 */
  diedAt?: 'model-errors' | 'stalled'
}

/** 子代理运行时共享状态（waitTurn / apply_fix / 完成工具三方共写）。 */
interface SubAgentState {
  outcome?: FixOutcome
  changed: string[]
  /** 最近一次 apply_fix 写文件的时刻（进程内零延迟活性——不依赖宿主批量落盘）。 */
  lastToolAt: number
  /** 最近一次观察到任何活动的时刻（事件增长 / 回合开着 / 工具写入）。 */
  lastActivityAt: number
}

/** 合法判定结论（fix_complete 的 verdict 字段白名单）。 */
export const FIX_VERDICTS = ['false_positive', 'duplicate', 'obsolete', 'already_fixed'] as const
export type FixVerdict = (typeof FIX_VERDICTS)[number]

export const FIX_MAX_ATTEMPTS = 2
/** 模型报错续跑上限（回合 error 收场 → followup 接续，上下文无损；业主 2026-11-04：偶发抖动应可接续）。 */
export const FIX_MAX_RESUMES = 2
/** 总时限到点后的探活上限（先敲门再进门；两次零响应才判停摆）。 */
export const FIX_MAX_PROBES = 2

/** 探活等待窗口：自适应（总时限的 1/4，夹在 3s~90s；真机默认 600s → 90s，测试 1.2s → 3s）。 */
export function probeWindowOf(timeoutMs: number): number {
  return Math.max(3_000, Math.min(90_000, Math.round(timeoutMs / 4)))
}
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
        view: {
          issueId: input.issueId,
          title: input.title,
          status: 'queued',
          attempt: existing !== undefined ? existing.view.attempt + 1 : 1,
          mode: input.mode ?? 'fix',
          planExec: (input.mode ?? 'fix') !== 'plan' && ((input.approach !== undefined && input.approach !== '') || input.planId !== undefined),
        },
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
    const planIdsToReset: string[] = []
    for (const task of this.tasks.values()) {
      if (!this.isTerminal(task.view.status)) {
        task.view.status = 'cancelled'
        task.view.finishedAt = Date.now()
        stopped += 1
        // 被取消任务的方案复位待评审（否则永远停在"已派发"假状态）。
        if (task.planId !== undefined) planIdsToReset.push(task.planId)
      }
    }
    if (planIdsToReset.length > 0) {
      void this.resetPlans(planIdsToReset).catch(() => {})
    }
    // 运行中的子代理由 runTask 的 finally 收尾（active 任务查 status 已 cancelled 即中止）；
    // worktree 兜底清理交给 cleanupOrphans（下一次派发/启动时）。
    void this.cleanupOrphans(projectRoot).catch(() => {})
    return stopped
  }

  /** 把方案状态复位为待评审（取消/崩溃恢复用；best-effort）。 */
  private async resetPlans(planIds: string[]): Promise<void> {
    for (const planId of planIds) {
      const plan = this.service.store?.fixPlans?.get(planId)
      if (plan === undefined || plan.status !== 'dispatched') continue
      plan.status = 'pending'
      plan.updatedAt = Date.now()
      await this.service.store!.fixPlans.save(plan)
    }
  }

  /** 启动恢复（业主 2026-11-04 容错要求）：进程崩溃/强杀/关机后的三件事——
   * ① 主仓 cherry-pick 残留中止（死在冲突瞬间会留 CHERRY_PICK_HEAD 堵住后续合并）；
   * ② dispatched 方案全部复位待评审（启动瞬间不可能有真实任务在跑，dispatched
   *    必为上次中断的遗留，不复位就永远显示"已派发"假状态）；
   * ③ worktree 孤儿清扫仍走 cleanupOrphans（service.start 另行调用）。
   * 问题状态无需恢复：未回写 = 仍是待处理，事实源在磁盘，重派即重放。 */
  async recoverInterrupted(project: { id: string; rootPath: string }): Promise<number> {
    let recovered = 0
    await this.git.runGit(['cherry-pick', '--abort'], project.rootPath).catch(() => {})
    try {
      for (const plan of (this.service.store?.fixPlans?.list() ?? []) as Array<{ id: string; projectId?: string; status?: string; updatedAt?: number }>) {
        if (plan.projectId !== project.id || plan.status !== 'dispatched') continue
        await this.resetPlans([plan.id])
        recovered += 1
      }
    } catch {
      // 存储读失败静默：下次启动再试。
    }
    return recovered
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
      const result = await this.runSubAgent(project, task, worktree)
      if (view.status === 'cancelled') return
      let outcome = result.outcome

      // plan 模式：只读出方案/判定，永不合并提交（worktree 用后即弃）。
      if (task.mode === 'plan') {
        await this.finishPlanTask(project, task, outcome)
        return
      }

      if (outcome === undefined) {
        if (!result.endedClean) {
          // 真死（连续报错续跑不活 / 探活零响应）：半成品丢弃；attempt 未满自动重派一次
          // （抖动续跑救不活的网关故障，重开新 worktree 从头跑；业主 2026-11-04 拍板）。
          view.error = result.diedAt === 'model-errors'
            ? `模型连续报错（续跑 ${FIX_MAX_RESUMES} 轮未恢复），worktree 半成品已丢弃`
            : `长时间零响应（探活 ${FIX_MAX_PROBES} 次无回应），判停摆，半成品已丢弃`
          if (view.attempt < FIX_MAX_ATTEMPTS) {
            view.status = 'redo'
            view.currentAction = `自动重派（第 ${view.attempt + 1} 次）`
            await this.removeWorktree(project.rootPath, task.issueId)
            const redo: FixTask = { ...task, view: { ...view, status: 'queued', attempt: view.attempt + 1, error: undefined, resumes: 0, probes: 0 } }
            this.tasks.set(task.issueId, redo)
            this.queue.push(task.issueId)
            this.pump(project)
            return
          }
          view.status = 'failed'
          await this.writeBack(project, task, 'confirmed', `派发修复异常中断（第 ${view.attempt} 次，已自动重派一次）：${view.error}`)
          return
        }
        // 兜底：回合正常结束但没走完成协议，且 worktree 有真实改动 → 采纳改动继续合并
        // （2026-11-04 真机：模型首次 edit 已成功却在沙箱字段上死循环、从未调
        // 完成工具——有改动即有效修复，合并路径自会校验）。无改动才判失败。
        const strayStatus = await this.git.runGit(['status', '--porcelain'], worktree).catch(() => '')
        if (strayStatus.trim() === '') {
          view.status = 'failed'
          view.error = '子代理结束但未调用完成工具，且 worktree 无任何改动'
          await this.writeBack(project, task, 'confirmed', `派发修复未产出完成报告（第 ${view.attempt} 次）：${view.error}`)
          return
        }
        outcome = { summary: '代理未调用完成工具，但 worktree 有改动（自动采纳，合并器统一提交）', changedFiles: result.changed ?? [] }
      }
      // 空字符串 blocked 视为未设置（2026-11-04 真机：模型完成调用带 blocked:"" 被误判阻塞）。
      if (outcome.blocked !== undefined && outcome.blocked !== '') {
        view.status = 'failed'
        view.error = outcome.blocked
        await this.writeBack(project, task, 'confirmed', `派发修复报告阻塞（第 ${view.attempt} 次）：${outcome.blocked}`)
        return
      }
      // 判定结论（不需要改代码）：直接回写关闭；worktree 里若有改动一并丢弃。
      if (outcome.verdict !== undefined && outcome.verdict !== '') {
        view.status = 'done'
        view.summary = `判定 ${verdictLabel(outcome.verdict)}：${outcome.summary.slice(0, 160)}`
        view.finishedAt = Date.now()
        view.currentAction = undefined
        await this.writeBack(project, task, outcome.verdict, `派发修复判定（第 ${view.attempt} 次）：${outcome.summary}`, outcome.changedFiles)
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
      const commitMessage = `fix(review): ${task.title.slice(0, 80)}\n\nSub-agent fix dispatched from the Review board (attempt ${view.attempt}).`
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
        view.currentAction = undefined
        await this.writeBack(project, task, 'fixed', `派发修复（第 ${view.attempt} 次）：${outcome.summary}`, outcome.changedFiles)
        // 直派任务（无方案）自动补影响分析——plan 任务的方案块自带影响字段，不重复算。
        if (task.approach === undefined || task.approach === '') {
          view.impact = await this.computeFixImpact(project.rootPath, sha).catch(() => undefined)
        }
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
  private async writeBack(project: { id: string }, task: FixTask, verdict: 'fixed' | 'confirmed' | 'already_fixed' | 'false_positive' | 'duplicate' | 'obsolete', note: string, files?: string[]): Promise<void> {
    try {
      const manager = new ReviewIssueManager(this.service.store!.issues)
      await manager.applyChatVerdict(task.issueId as never, verdict, note, files)
      if (task.planId !== undefined) {
        const plan = this.service.store!.fixPlans.get(task.planId)
        if (plan !== undefined) {
          // 修复成功 → completed；保留待处理 → 退回 pending 可再派发；判定关闭（误报/过时等）→ rejected。
          plan.status = verdict === 'fixed' ? 'completed' : verdict === 'confirmed' ? 'pending' : 'rejected'
          plan.updatedAt = Date.now()
          await this.service.store!.fixPlans.save(plan)
        }
      }
      // 问题一旦终局关闭（修好/判定关闭），同问题的其他待评审方案一并作废——
      // 否则方案块永远挂着"待评审"假状态（例：直派修复成功时遗留的旧方案）。
      if (verdict !== 'confirmed') {
        for (const other of (this.service.store?.fixPlans?.list() ?? []) as Array<{ id: string; issueId?: string; status?: string; updatedAt?: number }>) {
          if ((other as { issueId?: string }).issueId !== task.issueId || other.status !== 'pending') continue
          if (task.planId !== undefined && other.id === task.planId) continue
          other.status = 'rejected'
          other.updatedAt = Date.now()
          await this.service.store!.fixPlans.save(other)
        }
      }
    } catch (error: unknown) {
      this.ctx.logger?.warn?.(`project-control: fix write-back failed for ${task.issueId}: ${String(error)}`)
    }
  }

  /** plan 模式收尾：判定结论直接回写关闭；结构化方案落 fix_plans 待评审；
   * 任何代码改动都丢弃（永不合并、永不提交——plan 模式的 worktree 只是只读隔离视图）。 */
  private async finishPlanTask(project: { id: string }, task: FixTask, outcome: FixOutcome | undefined): Promise<void> {
    const view = task.view
    const attempt = `第 ${view.attempt} 次`
    view.currentAction = undefined
    if (outcome === undefined) {
      view.status = 'failed'
      view.error = '方案任务结束但未调用完成工具'
      await this.writeBack(project, task, 'confirmed', `派发出方案未产出完成报告（${attempt}）：${view.error}`)
      return
    }
    if ((outcome.blocked ?? '') !== '') {
      view.status = 'failed'
      view.error = outcome.blocked
      await this.writeBack(project, task, 'confirmed', `派发出方案报告阻塞（${attempt}）：${outcome.blocked}`)
      return
    }
    if (outcome.verdict !== undefined && outcome.verdict !== '') {
      view.status = 'done'
      view.summary = `判定 ${verdictLabel(outcome.verdict)}：${outcome.summary.slice(0, 160)}`
      view.finishedAt = Date.now()
      await this.writeBack(project, task, outcome.verdict, `子代理判定（${attempt}）：${outcome.summary}`, outcome.changedFiles)
      return
    }
    if (outcome.plan !== undefined && outcome.plan.approach !== '') {
      const now = Date.now()
      await this.service.store!.fixPlans.save({
        id: `fix_${now.toString(36)}${Math.random().toString(36).slice(2, 8)}`,
        projectId: project.id as never,
        issueId: task.issueId as never,
        approach: outcome.plan.approach,
        files: outcome.plan.files,
        impact: outcome.plan.impact,
        benefit: outcome.plan.benefit,
        risk: outcome.plan.risk,
        status: 'pending',
        createdAt: now,
        updatedAt: now,
      } as never)
      view.status = 'done'
      view.summary = '方案已产出，待评审派发'
      view.files = outcome.plan.files
      view.finishedAt = Date.now()
      return
    }
    view.status = 'failed'
    view.error = '方案任务既未给出判定也未给出方案'
    await this.writeBack(project, task, 'confirmed', `派发出方案未产出方案或判定（${attempt}）：${outcome.summary.slice(0, 200)}`)
  }

  /** 跑一个子代理修复任务；返回完成协议载荷 + 回合是否正常结束（超时=异常中断）。 */
  private async runSubAgent(project: { id: string; name: string; rootPath: string }, task: FixTask, worktree: string): Promise<SubAgentResult> {
    const state: SubAgentState = { changed: [], lastToolAt: 0, lastActivityAt: Date.now() }
    const sessionId = `pc-fix-${task.issueId}-${task.view.attempt}-${Date.now().toString(36)}`
    const route = resolveDeploymentRoute(this.ctx, 'standard', this.service.liveConfig)
    // 生效禁改路径（已确定约束）：提示词告知 + apply_fix 硬拒双保险。
    const forbiddenPaths = this.activeForbiddenPaths(project.id)
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
        const planMode = task.mode === 'plan'
        // 专用写文件工具（仅 fix 模式注册）：进程内直写 worktree（范本 write_agent_note），
        // 完全绕开 edit/bash 工具的沙箱字段校验——2026-11-04 真机证实网关模型会强制附带
        // sandbox_permissions/justification 并被逐次拒绝，陷入无谓重试。plan 模式不注册：
        // 只读任务物理上不给写入口。
        if (!planMode) {
          const { writeFileSync, readFileSync, existsSync } = await import('node:fs')
          agentCtx.tools.register(defineTool({
            name: 'project_control_apply_fix',
            description: 'Modify one file in your worktree root, relative path. Two modes: mode="full" (default) writes the COMPLETE new file content; mode="replace" applies an exact unique search/replace inside the existing file — ALWAYS use mode="replace" for files larger than ~200 lines or when you do not have the whole file content (never rewrite a big file blindly). Use this for EVERY file modification — do not use edit/bash/pwsh for writing files.',
            parameters: {
              path: { type: 'string', required: true, description: 'Relative file path inside the worktree, e.g. "src/bug.js".' },
              content: { type: 'string', description: 'mode="full": the COMPLETE new file content (not a diff).' },
              mode: { type: 'string', description: '"full" (default) or "replace".' },
              search: { type: 'string', description: 'mode="replace": the EXACT existing text to find. It must appear in the file EXACTLY ONCE — include enough surrounding lines to make it unique. Copy it verbatim from the file.' },
              replace: { type: 'string', description: 'mode="replace": the new text that replaces the search text (empty string = delete the search text).' },
            },
            output: {
              schema: { type: 'string' },
              render: (_args: unknown, value: unknown) => [{ type: 'text', text: String(value) }],
            },
            async execute(args: { path: string; content?: string; mode?: string; search?: string; replace?: string }) {
              const safe = args.path.replace(/\\/g, '/').replace(/^\.?\//, '')
              if (safe.includes('..') || safe === '') throw new Error('path must be a relative path inside the worktree')
              const hit = forbiddenPaths.find((forbidden) => safe === forbidden || safe.startsWith(forbidden + '/'))
              if (hit !== undefined) {
                throw new Error(`「${hit}」是开发者已确定约束的禁改路径（forbidden path），修复不得触碰。若修复确实必须改它，请调 fix_complete 设 blocked 说明，由开发者决策。`)
              }
              const target = join(worktree, safe)
              const markChanged = (): void => {
                if (!state.changed.includes(safe)) state.changed.push(safe)
              }
              if (args.mode === 'replace') {
                // 2026-11-04 真机：47KB/1024 行文件"整文件重写"模型无法安全完成而 blocked。
                // 替换模式只需精确局部文本，避免读截断/写超限双重失败。
                if ((args.search ?? '') === '') throw new Error('mode="replace" requires search (exact unique text copied verbatim from the file)')
                if (!existsSync(target)) throw new Error(`file not found: ${safe}`)
                const current = readFileSync(target, 'utf8')
                const occurrences = (text: string): number => text.split(args.search!).length - 1
                let total = occurrences(current)
                let search = args.search!
                let replace = args.replace ?? ''
                if (total === 0 && search.includes('\n')) {
                  // 行尾容错：文件是 CRLF 而模型按 LF 复制了 search（或反之）——换行风格互换后再试。
                  const swap = (text: string): string => text.includes('\r\n') ? text.replace(/\r\n/g, '\n') : text.replace(/(^|[^r])\n/g, `$1\r\n`)
                  search = swap(search)
                  replace = swap(replace)
                  total = occurrences(current)
                }
                if (total === 0) throw new Error(`search text not found in ${safe} — read the file first and copy the exact text verbatim (watch for whitespace and line endings)`)
                if (total > 1) throw new Error(`search text appears ${total} times in ${safe} — include more surrounding lines so it is unique`)
                writeFileSync(target, current.replace(search, replace), 'utf8')
                markChanged()
                state.lastToolAt = Date.now()
                task.view.currentAction = `替换 ${safe}`
                return `Replaced in ${safe}`
              }
              if ((args.content ?? '') === '') throw new Error('mode="full" requires content (the complete new file content); for large files use mode="replace" instead')
              writeFileSync(target, args.content!, 'utf8')
              markChanged()
              state.lastToolAt = Date.now()
              task.view.currentAction = `写入 ${safe}`
              return `Written: ${safe}`
            },
          }))
        }
        const parseVerdict = (raw: string | undefined): FixOutcome['verdict'] => {
          if (raw === undefined || raw === '') return ''
          if (!(FIX_VERDICTS as readonly string[]).includes(raw)) {
            throw new Error(`verdict must be one of: ${FIX_VERDICTS.join(' | ')} (or omit it when you actually fixed / planned)`)
          }
          return raw as FixOutcome['verdict']
        }
        agentCtx.tools.register(defineTool(planMode
          ? {
              name: 'project_control_fix_complete',
              description: 'Report the plan result. Call exactly once when done: with a verdict when the issue needs NO plan (not a real, still-present defect), or with the full plan fields for real issues.',
              parameters: {
                summary: { type: 'string', required: true, description: 'One-sentence basis: the evidence you verified (for verdicts), or what the plan addresses.' },
                verdict: { type: 'string', description: 'One of false_positive | duplicate | obsolete | already_fixed — ONLY when the issue is not a real, still-present defect. obsolete: code/feature removed or behavior deliberately changed by later commits (cite them); already_fixed: a later commit already fixed it; false_positive: never a real defect; duplicate: same as another known issue.' },
                approach: { type: 'string', description: 'PLAN: how to fix, step by step, against the CURRENT code (which file + what to change).' },
                files: { type: 'array', items: { type: 'string' }, description: 'PLAN: relative paths the fix will touch (best-effort).' },
                impact: { type: 'string', description: 'PLAN: blast radius — affected files/APIs/callers, public behavior changes.' },
                benefit: { type: 'string', description: 'PLAN: what risk/pain the fix removes.' },
                risk: { type: 'string', description: 'PLAN: what the fix itself could break / regression surface.' },
              },
              output: {
                schema: { type: 'string' },
                render: (_args: unknown, value: unknown) => [{ type: 'text', text: String(value) }],
              },
              async execute(args: { summary: string; verdict?: string; approach?: string; files?: string[]; impact?: string; benefit?: string; risk?: string }, exec: ToolRunContext) {
                const verdict = parseVerdict(args.verdict)
                const plan = verdict === '' && (args.approach ?? '') !== ''
                  ? { approach: args.approach ?? '', files: args.files ?? [], impact: args.impact ?? '', benefit: args.benefit ?? '', risk: args.risk ?? '' }
                  : undefined
                state.outcome = { summary: args.summary, changedFiles: [], verdict, plan }
                exec.concludeTurn()
                return 'Plan result recorded.'
              },
            }
          : {
              name: 'project_control_fix_complete',
              description: 'Report the fix result. Call exactly once when done: after applying ALL file changes, or immediately with a verdict (no code change needed) or blocked (cannot proceed).',
              parameters: {
                summary: { type: 'string', required: true, description: 'What was fixed, one or two sentences.' },
                changedFiles: { type: 'array', items: { type: 'string' }, description: 'Relative paths of files changed.' },
                blocked: { type: 'string', description: 'Set only when the fix cannot be applied (needs product decision / missing dependency / forbidden path); describe the blocker.' },
                verdict: { type: 'string', description: 'One of false_positive | duplicate | obsolete | already_fixed — set INSTEAD of fixing when NO code change is needed. obsolete: code/feature removed or behavior deliberately changed by later commits (cite them); already_fixed: a later commit already fixed it; false_positive: never a real defect; duplicate: same as another known issue. In these cases do NOT modify any file.' },
              },
              output: {
                schema: { type: 'string' },
                render: (_args: unknown, value: unknown) => [{ type: 'text', text: String(value) }],
              },
              async execute(args: { summary: string; changedFiles?: string[]; blocked?: string; verdict?: string }, exec: ToolRunContext) {
                state.outcome = { summary: args.summary, changedFiles: args.changedFiles ?? [], blocked: args.blocked, verdict: parseVerdict(args.verdict) }
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
      // 活性状态机（业主 2026-11-04 拍板：抖动=续跑接上，停摆=探活确认，真死=重派兜底）：
      // - 回合 error 收场（模型偶发 429/500）→ followup 续跑（≤FIX_MAX_RESUMES 轮，上下文无损）；
      // - 总时限到点 → 探活（≤FIX_MAX_PROBES 次，窗口内有响应=活着并恢复时限，零响应才判停摆）；
      // - 回合正常结束没调工具 → 催促一轮（原有语义）。
      const timeoutMs = this.service.liveConfig.stepTimeoutMs
      let nudged = false
      let deadline = Date.now() + timeoutMs
      for (;;) {
        if (task.view.status === 'cancelled') return { outcome: state.outcome, endedClean: state.outcome !== undefined, changed: state.changed }
        const settled = await this.waitTurn(handle.agent.session.id, state, task.view, deadline)
        if (settled === 'outcome') return { outcome: state.outcome, endedClean: true, changed: state.changed }
        if (settled === 'ended') {
          if (!nudged) {
            // 催促一轮完成协议（与 orchestrator 相同）。
            nudged = true
            handle.agent.followup(createUserMessage({
              content: [{ type: 'text', text: task.mode === 'plan'
                ? 'You finished your turn WITHOUT calling project_control_fix_complete. Call it now exactly once: with a verdict (false_positive/duplicate/obsolete/already_fixed) if the issue is not a real, still-present defect, or with the full plan fields (approach/files/impact/benefit/risk). Do NOT modify any file.'
                : 'You finished your turn WITHOUT calling project_control_fix_complete. Call it now exactly once with a faithful summary (changedFiles if any); set blocked only if the fix truly cannot proceed, or a verdict if no code change is needed.' }],
              source: { kind: 'project-control' },
            }))
            continue
          }
          return { outcome: undefined, endedClean: true, changed: state.changed }
        }
        if (settled === 'ended-error') {
          const resumes = (task.view.resumes ?? 0) + 1
          if (resumes <= FIX_MAX_RESUMES) {
            task.view.resumes = resumes
            task.view.currentAction = `模型报错，续跑第 ${resumes} 次`
            handle.agent.followup(createUserMessage({
              content: [{ type: 'text', text: '刚才的模型调用出错了（偶发抖动，属正常）。你的会话上下文完整保留——请从上次进度继续完成任务，已读过的文件不必重读。' + (task.mode === 'plan'
                ? '完成后调用 project_control_fix_complete（verdict 判定类 / approach·files·impact·benefit·risk 方案字段），本轮仍不得修改任何文件。'
                : '文件修改仍只用 project_control_apply_fix（大文件用 replace 模式）；完成后调用 project_control_fix_complete。') }],
              source: { kind: 'project-control' },
            }))
            deadline = Date.now() + timeoutMs
            continue
          }
          return { outcome: undefined, endedClean: false, changed: state.changed, diedAt: 'model-errors' }
        }
        // timeout：总时限到点 → 探活（先敲门再进门）。
        const probes = (task.view.probes ?? 0) + 1
        const probeStart = Date.now()
        if (probes <= FIX_MAX_PROBES) {
          task.view.probes = probes
          task.view.currentAction = `长时间无进展，探活第 ${probes} 次`
          handle.agent.followup(createUserMessage({
            content: [{ type: 'text', text: '[系统探活] 长时间未观察到进展。若你仍在工作，请立即回复一句话进度；若已完成或无法继续，请立即调用 project_control_fix_complete 报告结果。持续无响应任务将被终止。' }],
            source: { kind: 'project-control' },
          }))
          const probeSettled = await this.waitTurn(handle.agent.session.id, state, task.view, probeStart + probeWindowOf(timeoutMs))
          if (probeSettled === 'outcome') return { outcome: state.outcome, endedClean: true, changed: state.changed }
          if (probeSettled === 'ended' || probeSettled === 'ended-error') {
            // 回合在探活期间收场：恢复完整时限回主循环（ended-error 由续跑分支接管）。
            deadline = Date.now() + timeoutMs
            continue
          }
          if (state.lastActivityAt > probeStart) {
            // 有响应 = 活着：恢复完整时限继续等。
            deadline = Date.now() + timeoutMs
          } else {
            // 零响应：deadline 置为已过期，主循环立即再超时 → 下一次探活（或终局）。
            deadline = Date.now() + 1
          }
          continue
        }
        return { outcome: undefined, endedClean: false, changed: state.changed, diedAt: 'stalled' }
      }
    } finally {
      await handle.dispose().catch(() => {})
    }
  }

  /** 等待回合演化（活性版，业主 2026-11-04 拍板）。核心原则：**回合开着 = 活着**——
   *  宿主管理回合生命周期，模型请求死了它必然发 turn/end 收场；回合开着时外部事件
   *  静默不算停摆（生成大段代码期间事件批量落盘可长时间静默），只受调用方给的
   *  deadline 约束（到点由 runSubAgent 探活，不在本方法内处决）。
   *  - 最后一个 turn 事件是 turn/end 且 reason 非 completed（error/aborted）→ 'ended-error'
   *    （模型偶发抖动，上层 followup 续跑接上）；
   *  - turn/end(completed) 且静默 2.5s → 'ended'（真结束，上层催促）；
   *  - 尚无任何 turn 事件（起步/宿主未落盘）→ 视作未开始，只受 deadline 约束。 */
  private async waitTurn(sessionId: string, state: SubAgentState, view: FixTaskView, deadline: number): Promise<'outcome' | 'ended' | 'ended-error' | 'timeout'> {
    let lastCount = -1
    while (Date.now() < deadline) {
      if (state.outcome !== undefined) return 'outcome'
      if (view.status === 'cancelled') return 'ended'
      const events = (this.ctx as any).sessions?.get?.(sessionId)?.events as Array<{ type?: string; data?: unknown }> | undefined
      const count = events?.length ?? 0
      const turn = scanTurnState(events ?? [])
      // 进度卡"当前动作"：扫最近一条 assistant/message 里的最后一个工具调用。
      if (events !== undefined && count !== lastCount) {
        const action = latestToolAction(events)
        if (action !== undefined) view.currentAction = action
      }
      // 活性 = 事件增长 / 回合开着 / 进程内工具写入（边沿触发，消费后清零）。
      if (count !== lastCount || turn.open || state.lastToolAt > 0) {
        lastCount = count
        state.lastActivityAt = Date.now()
        state.lastToolAt = 0
      }
      if (!turn.open && turn.endReason !== undefined) {
        if (turn.endReason !== 'completed') return 'ended-error'
        if (Date.now() - state.lastActivityAt > 2500) return 'ended'
      }
      await new Promise((resolve) => setTimeout(resolve, 400))
    }
    return 'timeout'
  }

  /** 直派修复完成后的影响摘要：与 /impact-scope 同引擎（文件引用 2 跳 + ImpactEngine），
   * 以合并提交的 diff 为变更集；失败静默降级（进度卡不带 impact 字段）。 */
  private async computeFixImpact(rootPath: string, sha: string): Promise<FixImpactView | undefined> {
    const NOISE = /\.(md|txt|json|ya?ml|xml|html?|css|scss|lock|csproj|sln|props|targets)$/i
    const normalize = (value: string): string => value.trim().replace(/\\/g, '/')
    const nameOnly = await this.git.runGit(['diff-tree', '--no-commit-id', '--name-only', '-r', sha], rootPath).catch(() => '')
    const changed = nameOnly.split('\n').map(normalize).filter((file) => file !== '')
    if (changed.length === 0) return undefined
    const graph = new ProjectGraph()
    for (const file of changed.slice(0, 20)) {
      graph.addNode({ id: file, type: 'file', label: file, filePath: file })
    }
    const importTokenOf = (filePath: string): string | undefined => {
      const stem = (filePath.split('/').pop() ?? filePath).replace(/\.[^.]+$/, '')
      return stem.length >= 3 && /\D/.test(stem) ? stem : undefined
    }
    const scanned = new Set<string>()
    const hops: string[][] = [changed.slice(0, 20)]
    for (let depth = 0; depth < 2; depth += 1) {
      const nextHop: string[] = []
      for (const target of hops[depth] ?? []) {
        if (scanned.has(target) || scanned.size > 40) continue
        scanned.add(target)
        const token = importTokenOf(target)
        if (token === undefined) continue
        const matches = await this.git.runGit(['grep', '-l', '-F', token, '--', '.'], rootPath)
          .then((out) => out.split('\n').map(normalize)
            .filter((file) => file !== '' && !changed.includes(file) && !NOISE.test(file) && !/test|spec/i.test(file))
            .slice(0, 60))
          .catch(() => [] as string[])
        for (const importer of matches) {
          if (importer === target) continue
          graph.addNode({ id: importer, type: 'file', label: importer, filePath: importer })
          graph.addEdge({ source: importer, target, type: 'references', evidenceId: undefined as never })
          if (!nextHop.includes(importer)) nextHop.push(importer)
        }
      }
      hops.push(nextHop.slice(0, 12))
    }
    const impact = new ImpactEngine().computeImpact(changed, graph)
    return {
      riskLevel: impact.riskLevel,
      riskScore: impact.riskScore,
      direct: impact.impactedItems.filter((item) => item.level === 'direct').map((item) => item.node.id).slice(0, 10),
      indirect: impact.impactedItems.filter((item) => item.level === 'indirect').map((item) => item.node.id).slice(0, 10),
      potential: impact.impactedItems.filter((item) => item.level === 'potential').map((item) => item.node.id).slice(0, 10),
    }
  }

  /** 生效禁改路径：已确定约束（confirmed 表 active 项）的 forbiddenPaths，归一为仓库相对路径。 */
  private activeForbiddenPaths(projectId: string): string[] {
    try {
      const items = (this.service.store?.confirmed.list() ?? []) as Array<{ projectId?: string; status?: string; forbiddenPaths?: string[] }>
      const paths: string[] = []
      for (const item of items) {
        if (item.projectId !== projectId || item.status !== 'active') continue
        for (const raw of item.forbiddenPaths ?? []) {
          const normalized = raw.replace(/\\/g, '/').replace(/^\.?\//, '')
          if (normalized !== '') paths.push(normalized)
        }
      }
      return Array.from(new Set(paths))
    } catch {
      return []
    }
  }

  /** 相关项目记忆（修复上下文注入）：活跃项取标题，最多 N 条，读失败静默降级。 */
  private relevantMemories(projectId: string, limit = 6): string[] {
    try {
      return (this.service.store?.memories.list() ?? [])
        .filter((memory) => (memory as { projectId?: string }).projectId === projectId
          && ((memory as { status?: string }).status ?? 'active') === 'active')
        .sort((left, right) => (right as { updatedAt?: number }).updatedAt! - (left as { updatedAt?: number }).updatedAt!)
        .slice(0, limit)
        .map((memory) => `- [${(memory as { type?: string }).type ?? '记忆'}] ${(memory as { title?: string }).title ?? ''}`)
        .filter((line) => line.length > '- [] '.length)
    } catch {
      return []
    }
  }

  /** 项目档案摘要（最新 bootstrap checkpoint）：技术栈 + 结构规模，一段话。 */
  private projectDigest(projectId: string): string | undefined {
    try {
      const checkpoint = (this.service.store?.checkpoints.list((item) => (item as { projectId?: string }).projectId === projectId) ?? [])
        .sort((left, right) => (right as { createdAt?: number }).createdAt! - (left as { createdAt?: number }).createdAt!)[0] as
        { techStack?: string[]; manifestFiles?: string[]; topLevelSymbols?: unknown[]; summary?: string } | undefined
      if (checkpoint === undefined) return undefined
      return `技术栈 ${checkpoint.techStack?.join('/') || '未知'}；清单 ${checkpoint.manifestFiles?.length ?? 0} 文件、顶层符号 ${checkpoint.topLevelSymbols?.length ?? 0} 个。`
    } catch {
      return undefined
    }
  }

  private composeFixPrompt(project: { id: string; name: string }, task: FixTask, worktree: string): string {
    const planMode = task.mode === 'plan'
    const taskBlock = planMode
      ? [
          '【任务：先过三道闸判定，再出结构化方案——本轮绝对不修代码】',
          '重要背景：本问题是从历史提交评审中提取的，"发现时基线"可能早已过时，一切以当前 HEAD 为准。',
          '第一闸（存在性）：问题指向的文件/函数/功能在当前代码里还存在吗？已删除/重构掉 → verdict=obsolete，summary 注明被哪个提交/变更移除。',
          '第二闸（意图）：代码还在但当前行为可能是后续提交的有意变更（需求转向）→ verdict=obsolete（需求已变更），注明依据。绝不许把有意变更当缺陷出方案。',
          '第三闸（真实性）：从来不是问题 → verdict=false_positive；与其他已知问题重复 → verdict=duplicate；已被之前的提交修好 → verdict=already_fixed（引用修复提交/文件）。',
          '过完三闸仍属实的真问题 → 调工具提交结构化方案（approach/files/impact/benefit/risk 全部填写，基于当前 HEAD 实际读到的代码，不要按老提交上下文臆测）。方案不得以修改禁改路径为前提。',
        ]
      : task.approach !== undefined && task.approach !== ''
        ? [
            '【已批准的修复方案（按此执行，除非代码现状使其不可行——不可行时调工具报 blocked 并说明）】',
            `- 方案：${task.approach}`,
            `- 计划改动文件：${(task.files ?? []).join(', ') || '（方案未指定，自行判断）'}`,
          ]
        : [
            '【无预置方案：自主判定并修复】',
            '先过三道闸：已删除/需求有意变更 → verdict=obsolete（注明依据）；已被之前的提交修好 → verdict=already_fixed；从来不是问题 → verdict=false_positive；与其他问题重复 → verdict=duplicate。这些判定【不改任何代码】，调工具带 verdict 直接回写关闭。',
            '仍属实的真问题 → 立即动手修复（只判定不修复不可接受）。',
          ]
    // 项目上下文注入（2026-11-04 业主要求）：修复/方案代理必须带着对项目的了解干活。
    const forbiddenPaths = this.activeForbiddenPaths(project.id)
    const memories = this.relevantMemories(project.id)
    const digest = this.projectDigest(project.id)
    const contextBlock: string[] = []
    if (digest !== undefined || memories.length > 0) {
      contextBlock.push('', '== 项目上下文（任务期间必须遵守/参考）==')
      if (digest !== undefined) contextBlock.push(`- 项目档案：${digest}`)
      for (const memory of memories) contextBlock.push(`- 项目记忆：${memory}`)
    }
    if (forbiddenPaths.length > 0) {
      contextBlock.push(`- 禁改路径（开发者已确定约束${planMode ? '，方案不得以修改它们为前提' : '，apply_fix 会硬拒'}）：${forbiddenPaths.join(', ')}`)
    }
    const constraints = planMode
      ? [
          '- 本轮只读：禁止修改/创建/删除任何文件；禁止调用任何写文件工具（edit/bash/pwsh/apply 类一概不许，也不要设置 sandbox_permissions 字段）。',
          '- 禁止一切 git 写操作（commit/add/checkout/push 等）。',
          '- 完成后立即调用 project_control_fix_complete：判定类结论带 verdict；真问题带 approach/files/impact/benefit/risk 方案字段。',
        ]
      : [
          '- 只修改 worktree 内的文件（你的工作目录就是 worktree 根）；改动保持最小侵入。',
          '- 禁止执行 git commit / git add——提交由合并器统一处理。',
          '- 禁止 push、禁止改分支。',
          '- 文件修改【只】用 project_control_apply_fix 工具：小文件（≤200 行且你已读过全文）用 mode="full" 传完整新内容；大文件或你只读过片段的文件【必须】用 mode="replace"（search=从文件里逐字复制的唯一精确文本 + replace=新文本）。不要用 edit/bash/pwsh 写文件——它们的沙箱参数校验在此环境会拒绝；也不要在任何工具调用里设置 sandbox_permissions 字段。',
          '- 修复完成（文件已改好）后立即调用 project_control_fix_complete，summary 写清修了什么，changedFiles 列出你改的相对路径。',
          '- 判定类结论（verdict）【不要改任何文件】；无法修复（需要产品决策/依赖缺失/涉及禁改路径）→ 调工具设 blocked 字段说明原因，不要硬修。',
        ]
    return [
      planMode
        ? `你是方案产出代理，工作在独立 git worktree 中（路径：${worktree}，项目：${project.name}）——worktree 只是只读隔离视图，你的产出是方案不是代码。`
        : `你是修复执行代理，工作在独立 git worktree 中（路径：${worktree}，项目：${project.name}）。`,
      `任务：${planMode ? '为以下评审问题产出修复方案（不修代码）' : '修复以下评审问题'}。`,
      '',
      `== 问题 ==`,
      `标题：${task.title}`,
      task.evidence !== '' ? `证据：${task.evidence}` : '',
      '',
      ...taskBlock,
      ...contextBlock,
      '',
      '== 约束 ==',
      ...constraints,
    ].filter((line) => line !== '').join('\n')
  }
}

/** 判定结论的中文标签（进度卡/回写文案用）。 */
function verdictLabel(verdict: Exclude<FixOutcome['verdict'], '' | undefined>): string {
  if (verdict === 'false_positive') return '误报'
  if (verdict === 'duplicate') return '重复'
  if (verdict === 'obsolete') return '功能已移除/需求已变更'
  return '此前已修复'
}

/** 回合状态扫描（纯函数，可单测）：从事件流反推回合开闭与结束原因。
 * open=true → 最后一个 turn 事件是 turn/start（宿主仍在跑模型/工具，回合权威地"活着"）；
 * endReason → 最后一个 turn 事件若是 turn/end，其 reason.kind（completed/error/aborted…）；
 * 两者都空 → 尚无任何 turn 事件（起步/宿主尚未落盘，视作未开始只受 deadline 约束）。 */
export function scanTurnState(events: Array<{ type?: string; data?: unknown }>): { open: boolean; endReason?: string } {
  for (let i = events.length - 1; i >= 0; i -= 1) {
    const type = events[i]!.type
    if (type === 'turn/start') return { open: true }
    if (type === 'turn/end') {
      const reason = (events[i]!.data as { reason?: { kind?: string } } | undefined)?.reason?.kind
      return { open: false, endReason: reason ?? 'unknown' }
    }
  }
  return { open: false }
}

/** 从事件流提取最近一次工具调用的人类可读描述（进度卡"当前动作"数据源）。 */
function latestToolAction(events: Array<{ type?: string; data?: unknown }>): string | undefined {
  for (let i = events.length - 1; i >= 0; i -= 1) {
    const event = events[i]!
    if (event.type !== 'assistant/message') continue
    const message = (event.data as { message?: { content?: unknown } } | undefined)?.message
    const blocks = Array.isArray(message?.content) ? (message!.content as Array<Record<string, unknown>>) : []
    for (let j = blocks.length - 1; j >= 0; j -= 1) {
      const block = blocks[j]!
      if (block['type'] !== 'tool-call') continue
      const name = String(block['name'] ?? block['toolName'] ?? '工具')
      const rawArgs = block['arguments'] ?? block['args'] ?? block['input']
      // 常见参数里挑一个最能说明"在干什么"的字段。
      let detail = ''
      if (typeof rawArgs === 'string') {
        try {
          const parsed = JSON.parse(rawArgs) as Record<string, unknown>
          detail = String(parsed['path'] ?? parsed['file_path'] ?? parsed['filePath'] ?? parsed['command'] ?? '')
        } catch { detail = '' }
      } else if (typeof rawArgs === 'object' && rawArgs !== null) {
        const args = rawArgs as Record<string, unknown>
        detail = String(args['path'] ?? args['file_path'] ?? args['filePath'] ?? args['command'] ?? '')
      }
      return detail !== '' ? `${name} → ${detail.slice(0, 60)}` : name
    }
  }
  return undefined
}
