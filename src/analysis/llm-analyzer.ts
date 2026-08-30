/**
 * 一次性 LLM 分析调用助手：
 * 基于本体 ctx.llm.stream + BlockAssembler 的单次分析调用，
 * 带 deadline、token 上限与 usage 采集（范本：本体 session-title-llm / compaction summarizer）。
 *
 * @module dsh-project-control/analysis/llm-analyzer
 */

import type { Context } from '@deepseek-ai/cordis'
import { BlockAssembler, createUserMessage, LlmError } from '@deepseek-ai/dsh-llm'
import type { GenerateOptions, Message, TokenUsage } from '@deepseek-ai/dsh-llm'
import type { SessionId } from '../domain/ids.ts'

/** 一次性分析请求。 */
export interface LlmAnalysisRequest {
  /** 可选 system 段（KV 前缀缓存友好：复用会话 system 时前缀不变）。 */
  system?: string
  /** 分析指令与证据上下文。 */
  prompt: string
  /** 路由：缺省由调用方解析后显式传入。 */
  provider: string
  model: string
  maxTokens: number
  timeoutMs: number
  /** 关联会话（成本/遥测归因）。 */
  sessionId?: SessionId
  /** 本体 purpose 标记（区别于普通对话请求）。 */
  purpose?: string
  signal?: AbortSignal
}

/** 一次性分析结果。 */
export interface LlmAnalysisResult {
  text: string
  usage?: TokenUsage
}

/** deadline 助手：组合外部 signal 与超时。 */
function withTimeout(ms: number): { signal: AbortSignal; dispose: () => void } {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(new Error(`llm analysis timed out after ${ms}ms`)), ms)
  return { signal: controller.signal, dispose: () => clearTimeout(timer) }
}

/** 把 finish 原因映射为错误（fail-closed：不产出部分结果）。 */
function finishError(finish: ReturnType<BlockAssembler['finish']>): Error | undefined {
  if (finish.kind === 'error') return new LlmError(finish.failure.message, finish.failure.code, finish.failure)
  if (finish.kind === 'aborted') return new LlmError('llm analysis aborted', 'ABORTED')
  if (finish.kind === 'max-tokens') return new LlmError('llm analysis hit max tokens', 'MAX_TOKENS')
  return undefined
}

/**
 * 执行一次 LLM 分析调用。
 * @throws 路由缺失 / 超时 / 上游错误 / 截断——调用方决定降级策略。
 */
export async function runLlmAnalysis(ctx: Context, req: LlmAnalysisRequest): Promise<LlmAnalysisResult> {
  if (!req.provider || !req.model) {
    throw new Error('llm-analyzer: no provider/model route resolved')
  }
  const using = withTimeout(req.timeoutMs)
  try {
    const messages: Message[] = [
      createUserMessage({
        content: [{ type: 'text', text: req.prompt }],
        source: { kind: 'plugin', plugin: 'project-control', form: 'notice' },
      }),
    ]
    const options: GenerateOptions = {
      provider: req.provider,
      model: req.model,
      messages,
      ...(req.system === undefined ? {} : { system: req.system }),
      maxTokens: req.maxTokens,
      ...(req.sessionId === undefined ? {} : { sessionId: req.sessionId }),
      purpose: req.purpose ?? 'project-control-analysis',
      signal: using.signal,
    }
    const assembler = new BlockAssembler()
    for await (const chunk of ctx.llm.stream(options)) {
      assembler.push(chunk)
    }
    const error = finishError(assembler.finish)
    if (error !== undefined) throw error
    const text = assembler.blocks()
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('')
      .trim()
    return { text, usage: assembler.usage }
  } finally {
    using.dispose()
  }
}
