/**
 * 例行任务调度器：定时触发模板任务（执行 Run / 自动评审 / AI 总结）。
 * 每 60s 扫描一次到期任务（intervalMinutes 周期，单写者串行执行），
 * 执行结果写回 lastRunAt/lastResult。type=review/summary 复用 api-route
 * 导出的核心逻辑（单一实现，页面与定时行为一致）。
 *
 * @module dsh-project-control/runtime/scheduler
 */

import type { Context } from '@deepseek-ai/cordis'
import type { ProjectControlService } from '../plugin/service.ts'
import { ChangeService } from '../domain/change.ts'
import { generatePlanSteps } from './plan-gen.ts'

export class ScheduledTaskRunner {
  private running = false

  constructor(
    private readonly ctx: Context,
    private readonly service: ProjectControlService,
  ) {}

  /** 启动周期扫描（ctx.effect 托管清理）。 */
  start(): void {
    this.ctx.effect(() => {
      const timer = this.ctx.setInterval(() => { void this.tick() }, 60_000)
      return () => clearInterval(timer)
    }, 'project-control: scheduled task runner')
  }

  /** 扫描并执行到期任务（串行防重入）。 */
  async tick(now = Date.now()): Promise<number> {
    if (this.running || this.service.store === undefined) return 0
    if (this.service.liveConfig.scheduledTasksEnabled === false) return 0
    this.running = true
    let executed = 0
    try {
      const tasks = this.service.store.scheduledTasks.list((task) => task.enabled)
      for (const task of tasks) {
        const dueAt = (task.lastRunAt ?? task.createdAt) + task.intervalMinutes * 60_000
        if (dueAt > now) continue
        const result = await this.executeTask(task).catch((error: unknown) => `执行失败：${String(error)}`)
        task.lastRunAt = now
        task.lastResult = String(result).slice(0, 300)
        task.updatedAt = now
        await this.service.store.scheduledTasks.save(task)
        executed += 1
      }
    } finally {
      this.running = false
    }
    return executed
  }

  /** 按类型执行单个任务（也供「立即执行」按钮复用）。 */
  async executeTask(task: {
    id: string
    projectId: string
    type: 'run' | 'review' | 'summary'
    title?: string
    description?: string
  }): Promise<string> {
    const project = this.service.store?.projects.get(task.projectId as never)
    const cwd = project?.identity?.rootPath
    if (project === undefined || cwd === undefined) return '项目不存在（可能已迁移）'

    if (task.type === 'run') {
      if (this.service.orchestrator === undefined || this.service.store === undefined) return '编排器未就绪，跳过本次执行'
      const title = task.title ?? task.id
      const description = task.description ?? ''
      const changeService = new ChangeService(this.service.store.changes, this.service.git, this.service.evidenceManager)
      const change = await changeService.createChange(project.id as never, title, description, cwd)
      const steps = await generatePlanSteps(this.ctx, this.service, title, description)
      await this.service.orchestrator.createPlan(change, `${title} · 例行计划`, steps)
      const runId = await this.service.orchestrator.startRun(undefined, change)
      return `已启动执行 Run：${runId}（${steps.length} 步）`
    }

    // review / summary 复用 api-route 的核心实现（避免双份漂移）。
    const { executeReviewForTarget, runIncrementalAiSummary } = await import('../plugin/api-route.ts')
    if (task.type === 'review') {
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      const log = await this.service.git.runGit(['log', '--since=' + since, '--format=%H'], cwd).catch(() => '')
      const shas = log.split('\n').map((line) => line.trim()).filter((line) => line !== '').slice(0, 5)
      if (shas.length === 0) return '近 24 小时无新提交，未执行评审'
      let total = 0
      for (const sha of shas) {
        const outcome = await executeReviewForTarget(this.ctx, this.service, cwd, project, sha)
        total += outcome.issuesFound
      }
      return `已评审 ${shas.length} 个提交，新增问题 ${total} 条`
    }
    const summary = await runIncrementalAiSummary(this.ctx, this.service, project)
    return summary.ok ? `AI 总结完成${summary.updated === true ? '（增量更新）' : ''}` : `AI 总结失败：${summary.error ?? ''}`
  }
}
