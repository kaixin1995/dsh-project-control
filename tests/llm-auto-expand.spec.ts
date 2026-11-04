// 解读自动放大重试回归：MAX_TOKENS → 自动放大 maxTokens 重试一次；其他错误不重试。
import { describe, expect, it } from 'vitest'
import { runLlmAnalysisAutoExpand, LLM_ANALYSIS_MAX_TOKENS_CAP } from '../src/analysis/llm-analyzer.ts'
import type { StreamChunk } from '@deepseek-ai/dsh-llm'

/** 构造一次"流式响应"：text 块 + 终止原因。 */
function streamOf(text: string, finishKind: 'completed' | 'max-tokens'): { calls: Array<{ maxTokens: number }>; stream: (options: { maxTokens: number }) => AsyncIterable<StreamChunk> } {
  const calls: Array<{ maxTokens: number }> = []
  return {
    calls,
    stream: async function* (options: { maxTokens: number }) {
      calls.push({ maxTokens: options.maxTokens })
      yield { type: 'block-start', index: 0, blockType: 'text' } as StreamChunk
      yield { type: 'text-delta', index: 0, text } as StreamChunk
      yield { type: 'block-end', index: 0, block: { type: 'text', text } } as unknown as StreamChunk
      yield { type: 'finish', reason: { kind: finishKind } } as StreamChunk
    },
  }
}

const baseReq = {
  prompt: '解释这个改动',
  provider: 'p', model: 'm',
  maxTokens: 4096, timeoutMs: 5_000,
} as const

describe('解读自动放大重试', () => {
  it('MAX_TOKENS → 自动放大 ×4（8192..32768）重试一次，成功即返回', async () => {
    const calls: Array<{ maxTokens: number }> = []
    const ctx: any = { llm: { stream: async function* (options: { maxTokens: number }) {
      calls.push({ maxTokens: options.maxTokens })
      // 第一次输出截断；放大后的第二次成功完成。
      const kind = calls.length === 1 ? 'max-tokens' : 'completed'
      yield { type: 'block-start', index: 0, blockType: 'text' } as StreamChunk
      yield { type: 'text-delta', index: 0, text: '解读完成' } as StreamChunk
      yield { type: 'block-end', index: 0, block: { type: 'text', text: '解读完成' } } as unknown as StreamChunk
      yield { type: 'finish', reason: { kind } } as StreamChunk
    } } }
    const result = await runLlmAnalysisAutoExpand(ctx, baseReq)
    expect(result.text).toBe('解读完成')
    expect(calls).toHaveLength(2)
    expect(calls[0]!.maxTokens).toBe(4096)
    expect(calls[1]!.maxTokens).toBe(16_384)
  })

  it('首次就成功 → 只调一次，不放大', async () => {
    const mock = streamOf('一次成功', 'completed')
    const ctx: any = { llm: { stream: mock.stream } }
    const result = await runLlmAnalysisAutoExpand(ctx, baseReq)
    expect(result.text).toBe('一次成功')
    expect(mock.calls).toHaveLength(1)
  })

  it('放大后仍 MAX_TOKENS → 抛错（不无限重试）', async () => {
    const mock = streamOf('', 'max-tokens')
    const ctx: any = { llm: { stream: mock.stream } }
    await expect(runLlmAnalysisAutoExpand(ctx, baseReq)).rejects.toThrow('max tokens')
    expect(mock.calls).toHaveLength(2)
    expect(mock.calls[1]!.maxTokens).toBe(16_384)
  })

  it('已贴上限（32768）时 MAX_TOKENS → 不再放大，直接抛', async () => {
    const mock = streamOf('', 'max-tokens')
    const ctx: any = { llm: { stream: mock.stream } }
    await expect(runLlmAnalysisAutoExpand(ctx, { ...baseReq, maxTokens: LLM_ANALYSIS_MAX_TOKENS_CAP })).rejects.toThrow('max tokens')
    expect(mock.calls).toHaveLength(1)
  })

  it('非 MAX_TOKENS 错误（如 aborted）→ 原样抛出不重试', async () => {
    const mock = streamOf('', 'completed')
    const ctx: any = { llm: { stream: () => { throw new Error('network down') } } }
    await expect(runLlmAnalysisAutoExpand(ctx, baseReq)).rejects.toThrow('network down')
  })
})
