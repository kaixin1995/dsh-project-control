/**
 * dsh-project-control 插件主入口文件。
 * 导出核心服务 (Service)、模型工具 (Tools)、斜杠命令 (Commands)、领域模型 (Domain Models) 与存储定义 (Storage Domains)。
 *
 * @module dsh-project-control
 */

import type { Context } from '@deepseek-ai/cordis'
import servicePlugin, { ProjectControlService } from './plugin/service.ts'
import toolsPlugin from './plugin/tools.ts'
import commandsPlugin from './plugin/commands.ts'

/** 插件名称 */
export const name = 'project-control'
/** 注入的服务依赖 */
export const inject = ['storage', 'tools', 'commands']

/**
 * 插件装配函数：挂载服务插件、工具插件与命令插件
 */
export function apply(ctx: Context): void {
  ctx.plugin(servicePlugin)
  ctx.plugin(toolsPlugin)
  ctx.plugin(commandsPlugin)
}

export default apply

// 导出服务与子插件
export { ProjectControlService, servicePlugin, toolsPlugin, commandsPlugin }

// 导出领域基础与 ID 体系
export * from './domain/brand.ts'
export * from './domain/ids.ts'
export * from './domain/models.ts'
export * from './domain/state-machine.ts'
export * from './domain/truth.ts'
export * from './domain/cas.ts'
export * from './domain/project.ts'
export * from './domain/change.ts'

// 导出 Git 与分析模块
export * from './git/adapter.ts'
export * from './git/snapshot.ts'
export * from './analysis/evidence.ts'
export * from './analysis/language.ts'
export * from './analysis/graph.ts'
export * from './analysis/impact.ts'
export * from './analysis/contracts.ts'

// 导出执行运行时模块
export * from './runtime/dag.ts'
export * from './runtime/runner.ts'
export * from './runtime/worktree.ts'
export * from './runtime/recovery.ts'

// 导出模型路由与成本核算模块
export * from './model/routing.ts'
export * from './model/cost.ts'
export * from './model/guard.ts'

// 导出审查与验证模块
export * from './verification/verifier.ts'
export * from './verification/issues.ts'
export * from './verification/service.ts'

// 导出引导接入、记忆与模式学习模块
export * from './bootstrap/pipeline.ts'
export * from './memory/service.ts'
export * from './memory/context.ts'
export * from './learning/concept.ts'
export * from './learning/patterns.ts'

// 导出存储域与仓储模块
export * from './store/domains.ts'
export * from './store/repository.ts'
