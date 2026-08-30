/**
 * Project Control 全量配置：schema（settings 面可见 + cordis.yml 可覆盖）与解析。
 * 遵循本体规范：部署间可能不同的值必须是配置字段；自包含约束在 schema/加载期验证。
 *
 * @module dsh-project-control/config
 */

import z from '@deepseek-ai/schemastery'
import type { ModelClass } from './model/routing.ts'

/** 模型等级 → provider/model 映射（空字符串 =回落会话当前路由）。 */
export interface ModelTierConfig {
  fast?: { provider: string; model: string }
  standard?: { provider: string; model: string }
  reasoning?: { provider: string; model: string }
  verifier?: { provider: string; model: string }
}

/** 完整插件配置。 */
export interface ProjectControlFullConfig {
  /** 总开关（默认开）。 */
  enabled: boolean
  /** 模型等级路由覆盖。 */
  modelTiers: ModelTierConfig
  /** 成本预算（USD）。 */
  budgets: {
    maxCostPerStepUsd?: number
    maxCostPerRunUsd?: number
    maxCostPerChangeUsd?: number
  }
  /** Attempt 重试策略。 */
  retry: {
    maxAttempts: number
    baseDelayMs: number
    maxDelayMs: number
    allowModelEscalation: boolean
  }
  /** Legacy Bootstrap 范围与预算。 */
  bootstrap: {
    defaultMaxCommits: number
    maxCommitsPerRun: number
    /** 每个提交的 L1 轻析开关（Fast 逐提交一句话；默认关以控成本） */
    historySummaries: boolean
  }
  /** 确定性验收命令（按项目技术栈在 cordis.yml / settings 配置）。 */
  buildCommand?: string
  testCommand?: string
  /** 一次性 LLM 调用上限。 */
  analysisMaxTokens: number
  analysisTimeoutMs: number
}

/** 解析后的配置（全部字段就绪）。 */
export type ResolvedProjectControlConfig = ProjectControlFullConfig

export const PROJECT_CONTROL_SETTINGS_SCHEMA: z<ProjectControlFullConfig> = z.object({
  enabled: z.boolean().default(true),
  modelTiers: z.object({
    fast: z.object({ provider: z.string().default(''), model: z.string().default('') }),
    standard: z.object({ provider: z.string().default(''), model: z.string().default('') }),
    reasoning: z.object({ provider: z.string().default(''), model: z.string().default('') }),
    verifier: z.object({ provider: z.string().default(''), model: z.string().default('') }),
  }),
  budgets: z.object({
    maxCostPerStepUsd: z.number(),
    maxCostPerRunUsd: z.number(),
    maxCostPerChangeUsd: z.number(),
  }),
  retry: z.object({
    maxAttempts: z.number().min(1).max(20).default(3),
    baseDelayMs: z.number().min(0).default(2000),
    maxDelayMs: z.number().min(0).default(60000),
    allowModelEscalation: z.boolean().default(true),
  }),
  bootstrap: z.object({
    defaultMaxCommits: z.number().min(1).default(50),
    maxCommitsPerRun: z.number().min(1).default(500),
    historySummaries: z.boolean().default(false),
  }),
  buildCommand: z.string(),
  testCommand: z.string(),
  analysisMaxTokens: z.number().min(256).default(4096),
  analysisTimeoutMs: z.number().min(5000).default(120000),
})

export const PROJECT_CONTROL_DEFAULTS: ProjectControlFullConfig = {
  enabled: true,
  modelTiers: {},
  budgets: {},
  retry: {
    maxAttempts: 3,
    baseDelayMs: 2000,
    maxDelayMs: 60000,
    allowModelEscalation: true,
  },
  bootstrap: {
    defaultMaxCommits: 50,
    maxCommitsPerRun: 500,
    historySummaries: false,
  },
  analysisMaxTokens: 4096,
  analysisTimeoutMs: 120000,
}

/** 解析用户配置：合并默认值并做加载期校验（fail loud）。 */
export function resolveFullConfig(input?: Partial<ProjectControlFullConfig>): ResolvedProjectControlConfig {
  const merged: ProjectControlFullConfig = {
    ...PROJECT_CONTROL_DEFAULTS,
    ...input,
    modelTiers: { ...PROJECT_CONTROL_DEFAULTS.modelTiers, ...input?.modelTiers },
    budgets: { ...PROJECT_CONTROL_DEFAULTS.budgets, ...input?.budgets },
    retry: { ...PROJECT_CONTROL_DEFAULTS.retry, ...input?.retry },
    bootstrap: { ...PROJECT_CONTROL_DEFAULTS.bootstrap, ...input?.bootstrap },
  }
  if (merged.retry.baseDelayMs > merged.retry.maxDelayMs) {
    throw new Error('project-control: retry.baseDelayMs must not exceed retry.maxDelayMs')
  }
  if (merged.bootstrap.maxCommitsPerRun < merged.bootstrap.defaultMaxCommits) {
    throw new Error('project-control: bootstrap.maxCommitsPerRun must be >= bootstrap.defaultMaxCommits')
  }
  return merged
}

/** 从配置解析某模型等级的具体路由；未配置的等级返回 undefined（由调用方回落）。 */
export function resolveTierRoute(
  config: ResolvedProjectControlConfig,
  modelClass: ModelClass,
): { provider: string; model: string } | undefined {
  const tier = config.modelTiers[modelClass]
  if (tier && tier.provider && tier.model) return { provider: tier.provider, model: tier.model }
  return undefined
}

/** 部署级默认路由解析：settings 等级覆盖 → agent-default-model 服务 → 旧式兜底。 */
export function resolveDeploymentRoute(
  ctx: unknown,
  modelClass: ModelClass,
  config: ResolvedProjectControlConfig,
): { provider: string; model: string } {
  const tier = config.modelTiers[modelClass]
  if (tier && tier.provider && tier.model) return { provider: tier.provider, model: tier.model }
  try {
    // ctx.get 是可选服务的官方读取通道（不触发属性代理的 inject 门禁）。
    const selection = (ctx as { get?: (name: string) => unknown }).get?.('agentDefaultModel') as
      | { currentSelection?: () => { provider?: string; model?: string } }
      | undefined
    const current = selection?.currentSelection?.()
    if (current?.provider && current?.model) return { provider: current.provider, model: current.model }
  } catch {
    // 服务未挂载 / 抛错：继续兜底
  }
  const fallbackModel = modelClass === 'reasoning' || modelClass === 'verifier' ? 'deepseek-v4-reasoner' : 'deepseek-v4-flash'
  return { provider: 'deepseek-official', model: fallbackModel }
}
