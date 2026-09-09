/**
 * dsh-project-control 插件主入口（bundle 安装路径）。
 *
 * 直接在入口 apply 内联注册全部能力（服务 / 存储启动 / 工具 / 命令 / API 路由），
 * 不经 ctx.plugin 挂子插件：rc.2 的 ctx.plugin 不识别函数插件的 inject 导出，
 * 子 fiber 内读取服务会抛 "cannot get property without inject" 且被静默吞掉
 * （2026-08-30 真机定位）。子入口文件（plugin/*.ts 的 apply）仍保留供
 * cordis.yml 开发 overlay 按 Loader 行独立挂载——Loader 行的 inject 会被正常识别。
 *
 * @module dsh-project-control
 */

import type { Context } from '@deepseek-ai/cordis'
import { normalize as normalizePosix } from 'node:path'
import { ProjectControlService, apply as serviceApply } from './plugin/service.ts'
import { apply as toolsApply, registerTools } from './plugin/tools.ts'
import { apply as commandsApply, registerCommands } from './plugin/commands.ts'
import { apply as apiRouteApply, registerApiRoute } from './plugin/api-route.ts'
import { registerConflictGuard } from './plugin/confirmed.ts'
import { installSettingsSection, settingsNamespace } from '@deepseek-ai/dsh-settings'
import { PROJECT_CONTROL_SETTINGS_SCHEMA } from './config.ts'
import { resolveFullConfig, type ProjectControlFullConfig } from './config.ts'
import type { ProjectControlConfig } from './plugin/service.ts'

/** 插件名称 */
export const name = 'project-control'
/**
 * 注入的服务依赖（直接读取的服务必须在此声明；storageDomain / webServer 为
 * 可选动态注入——headless 等面不挂载，静默降级，不阻塞激活）。
 */
export const inject = ['tools', 'commands', 'agents', 'jobs', 'sessions', 'llm', 'systemPrompt', 'workspaceRegistry']

/**
 * 插件装配函数：创建服务、提供 projectControl、启动存储（动态）、
 * 注册工具 / 命令 / API 路由。
 */
export function apply(ctx: Context, config: ProjectControlConfig = {}): void {
  const fullConfig = resolveFullConfig(config as unknown as Partial<ProjectControlFullConfig>)
  const service = new ProjectControlService(ctx, config)
  service.liveConfig = fullConfig
  ctx.provide('projectControl', service)
  ctx.effect(() => () => service.stop(), 'project-control: service stop')

  // 存储栈是面级服务：web / sdk 面挂载，headless 不挂载。动态注入，静默降级。
  ctx.inject(['storageDomain'], (scope: Context) => {
    void service.start((scope as any).storageDomain).catch((error: unknown) => {
      ctx.logger?.warn?.()
    })
  })

  // settings namespace：用户可通过 settings 面板 / cordis.yml 调整模型等级、预算、重试等
  ctx.inject(['settings'], (scope: Context) => {
    installSettingsSection(scope, settingsNamespace('project-control'), PROJECT_CONTROL_SETTINGS_SCHEMA, config, {
      validate: (value: unknown) => {
        void resolveFullConfig(value as never)
      },
      setSource: (current: unknown) => {
        // 以组合配置为基底合并用户设置层（空层/缺字段不得重置组合值，如 workspaceMode）
        service.liveConfig = resolveFullConfig({ ...fullConfig, ...((current as object) ?? {}) } as never)
      },
      onChange: () => {},
    })
  })

  // 已确定约束冲突拦截（V1.0 §31）：AI 写禁改文件 → deny
  registerConflictGuard(ctx, service)

  // 习惯引导段落（V0.4 §11 自动链 + extension-cookbook「Memory」行）：
  // 引导 AI 在提交前分析、重大取舍后记决策/记忆。
  ctx.systemPrompt?.section?.({
    name: 'project-control:policy',
    order: 3000,
    text: () => [
      'Project control habits:',
      '- BEFORE declaring a coding task complete (and before the developer commits), call analyze_change on the working diff so the change record has a semantic summary.',
      '- AFTER a significant design decision or trade-off, call record_memory (architecture_decision) with the decision and its rationale.',
      '- For multi-step work, create a plan first; execute it with start_run so progress is tracked and verified.',
      '- Never call confirm_memory yourself: only the developer confirms memory items.',
    ].join('\n'),
  })

  // 聊天约束事前告知：按会话工作目录匹配项目，把生效的禁改清单注入系统提示
  // （与执行中心同源同规则；拦截守卫仍是兜底）。AssembleContext 由 dispatch 扩展携带 agent。
  ctx.systemPrompt?.section?.({
    name: 'project-control:constraints',
    order: 3001,
    text: (context: { agent?: { session?: { header?: { cwd?: string } } } }) => {
      const cwd = context.agent?.session?.header?.cwd
      if (typeof cwd !== 'string' || cwd === '' || service.store === undefined) return ''
      const normalize = (value: string): string => normalizePosix(value).replaceAll('\\', '/').replace(/\/+$/, '')
      const project = service.store.projects.list().find((candidate) => normalize(candidate.identity.rootPath) === normalize(cwd))
      if (project === undefined) return ''
      const active = (service.store.confirmed.list() as Array<{ projectId?: string; status?: string; text?: string; forbiddenPaths?: string[] }>)
        .filter((item) => item.projectId === project.id && item.status === 'active' && (item.forbiddenPaths ?? []).length > 0)
      if (active.length === 0) return ''
      return [
        'Confirmed constraints (developer-confirmed; writes to these paths WILL BE REJECTED):',
        ...active.map((item) => `- 「${item.text ?? ''}」禁止修改：${(item.forbiddenPaths ?? []).join(', ')}`),
      ].join('\n')
    },
  })

  registerTools(ctx)
  registerCommands(ctx)
  registerApiRoute(ctx, service)
}

// 导出服务与子入口（子入口 apply 供 cordis.yml 开发 overlay / 独立挂载使用）
export { ProjectControlService, serviceApply, toolsApply, commandsApply, apiRouteApply }
export * from './domain/brand.ts'
export * from './domain/ids.ts'
export * from './domain/models.ts'
export * from './domain/state-machine.ts'
export * from './domain/truth.ts'
export * from './domain/cas.ts'
export * from './domain/project.ts'
export * from './domain/change.ts'

export * from './git/adapter.ts'
export * from './git/snapshot.ts'
export * from './analysis/evidence.ts'
export * from './analysis/language.ts'
export * from './analysis/graph.ts'
export * from './analysis/impact.ts'
export * from './analysis/contracts.ts'

export * from './runtime/dag.ts'
export * from './runtime/runner.ts'
export * from './runtime/worktree.ts'
export * from './runtime/recovery.ts'

export * from './model/routing.ts'
export * from './model/cost.ts'
export * from './model/guard.ts'

export * from './verification/verifier.ts'
export * from './verification/issues.ts'
export * from './verification/service.ts'

export * from './bootstrap/pipeline.ts'
export * from './memory/service.ts'
export * from './memory/context.ts'
export * from './learning/concept.ts'
export * from './learning/patterns.ts'

export * from './store/domains.ts'
export * from './store/repository.ts'
