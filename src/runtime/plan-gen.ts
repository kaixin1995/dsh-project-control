/**
 * 计划生成器：变更标题/描述 → LLM 产出编排计划（角色/验收标准/失败策略建议）。
 * 页面 /runs/start 与例行任务调度器共用。
 *
 * @module dsh-project-control/runtime/plan-gen
 */

import type { Context } from '@deepseek-ai/cordis'
import type { ProjectControlService } from '../plugin/service.ts'
import { runLlmAnalysis } from '../analysis/llm-analyzer.ts'
import { resolveDeploymentRoute } from '../config.ts'
import type { PlanStepInput } from './orchestrator.ts'

const STEP_ROLES = ['analysis', 'planning', 'coding', 'ops', 'verification'] as const
const POLICIES = ['retry-escalate', 'retry-fallback', 'skip', 'ask'] as const

/** 解析计划 LLM 输出：严格 JSON 数组；解析失败回落单步骤（标题「执行变更」）。 */
export function parsePlanSteps(text: string): PlanStepInput[] {
  const jsonText = text.slice(text.indexOf('['), text.lastIndexOf(']') + 1)
  try {
    const parsed = JSON.parse(jsonText) as Array<Record<string, unknown>>
    const steps = parsed
      .filter((entry) => typeof entry['title'] === 'string' && entry['title'] !== '')
      .map((entry) => ({
        title: String(entry['title']),
        description: typeof entry['description'] === 'string' ? entry['description'] : '',
        targetFiles: Array.isArray(entry['targetFiles'])
          ? entry['targetFiles'].filter((file): file is string => typeof file === 'string')
          : undefined,
        role: STEP_ROLES.includes(entry['role'] as never) ? (entry['role'] as PlanStepInput['role']) : undefined,
        acceptance: typeof entry['acceptance'] === 'string' ? entry['acceptance'] : undefined,
        failurePolicy: POLICIES.includes(entry['failurePolicy'] as never) ? (entry['failurePolicy'] as PlanStepInput['failurePolicy']) : undefined,
      }))
    if (steps.length > 0) return steps
  } catch {
    // 落入单步骤降级
  }
  return [{ title: '执行变更', description: '按变更描述完成全部工作并通过验收。' }]
}

/** 是否为解析失败降级产物（触发一次更强格式指令的重试）。 */
export function isFallbackPlan(steps: PlanStepInput[]): boolean {
  return steps.length === 1 && steps[0]!.title === '执行变更'
}

/**
 * LLM 生成执行计划（严格 JSON；失败带更强指令重试一次，仍失败接受单步骤降级）。
 * @param stackHint 项目技术栈提示（来自引导检查点；可为空串）。
 */
export async function generatePlanSteps(
  ctx: Context,
  service: ProjectControlService,
  title: string,
  description: string,
  stackHint = '',
): Promise<PlanStepInput[]> {
  const basePrompt = [
    '你是技术负责人。为以下变更生成执行计划，输出严格的 JSON 数组、不要任何多余文字：',
    '[{"title":"步骤标题","description":"该步骤要做什么与验收标准","targetFiles":["相关文件路径"],"role":"analysis|planning|coding|ops|verification","acceptance":"完成判定标准","failurePolicy":"retry-escalate|retry-fallback|skip|ask"}]',
    '3 到 6 个步骤，按执行顺序排列；第一步可以是梳理/分析（role=analysis），机械操作（格式化/依赖升级等）用 role=ops，最后一步是构建与测试验证（role=verification）。',
    'role 含义：analysis=只读分析、planning=方案设计、coding=写代码、ops=简单机械操作（用便宜模型）、verification=测试验收。',
    'failurePolicy 缺省 retry-escalate；只有可安全跳过的辅助步骤才用 skip，需要人工决策的关键步骤用 ask。全部用中文。',
    stackHint,
    '',
    `变更标题：${title}`,
    `需求与背景：${description}`,
  ].filter((line) => line !== '').join('\n')
  const route = resolveDeploymentRoute(ctx, 'reasoning', service.liveConfig)
  const call = (prompt: string): Promise<{ text: string }> => runLlmAnalysis(ctx, {
    prompt,
    provider: route.provider,
    model: route.model,
    maxTokens: service.liveConfig.analysisMaxTokens,
    timeoutMs: service.liveConfig.analysisTimeoutMs,
    purpose: 'project-control-plan',
  })
  let steps = parsePlanSteps((await call(basePrompt)).text)
  if (isFallbackPlan(steps)) {
    try {
      const retry = await call([
        '上一次输出不是合法 JSON。这次只输出 JSON 数组本身：不要 Markdown 代码块、不要任何解释文字。',
        '格式：[{"title":"步骤标题","description":"做什么与验收标准","targetFiles":["相关文件"],"role":"analysis|planning|coding|ops|verification","acceptance":"完成判定","failurePolicy":"retry-escalate"}]，3 到 6 步，全部中文。',
        '',
        '变更标题：' + title,
        '需求与背景：' + description,
      ].join('\n'))
      steps = parsePlanSteps(retry.text)
    } catch {
      // 重试失败：维持单步骤降级
    }
  }
  return steps
}
