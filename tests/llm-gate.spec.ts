// 全局模型并发闸门回归：限流/FIFO/实时调整/异常归还；分析调用经闸门限流；
// 修复子代理与其他消费方共享同一预算（占满排队）。
import { describe, expect, it, afterEach } from 'vitest'
import { LlmGate } from '../src/runtime/llm-gate.ts'
import { runLlmAnalysis, setLlmGate } from '../src/analysis/llm-analyzer.ts'
import type { StreamChunk } from '@deepseek-ai/dsh-llm'

afterEach(() => { setLlmGate(undefined) })

describe('LlmGate 信号量', () => {
  it('限流：并发不超上限，超出的排队等待', async () => {
    const gate = new LlmGate(2)
    let active = 0
    let peak = 0
    const job = async (): Promise<void> => {
      active += 1
      peak = Math.max(peak, active)
      await new Promise((resolve) => setTimeout(resolve, 60))
      active -= 1
    }
    await Promise.all(Array.from({ length: 6 }, () => gate.run(job)))
    expect(peak).toBe(2)
    expect(gate.stats()).toEqual({ limit: 2, active: 0, queued: 0 })
  })

  it('FIFO：先排队的先拿到槽', async () => {
    const gate = new LlmGate(1)
    const order: number[] = []
    const job = (n: number) => async (): Promise<void> => { order.push(n) }
    const p1 = gate.run(job(1))
    const p2 = gate.run(job(2))
    const p3 = gate.run(job(3))
    await Promise.all([p1, p2, p3])
    expect(order).toEqual([1, 2, 3])
  })

  it('实时调大立即放行等待者（第二个在第一个未完时即启动）；异常也归还槽位', async () => {
    const gate = new LlmGate(1)
    let firstDone = false
    let secondStartedWhileFirstRunning = false
    const first = gate.run(async () => { await new Promise((resolve) => setTimeout(resolve, 120)); firstDone = true })
    const second = gate.run(async () => { secondStartedWhileFirstRunning = !firstDone })
    await new Promise((resolve) => setTimeout(resolve, 20))
    // 调大前：第二个仍排队。
    expect(gate.stats().queued).toBe(1)
    gate.updateLimit(2)
    await Promise.all([first, second])
    expect(secondStartedWhileFirstRunning).toBe(true)
    expect(firstDone).toBe(true)
    // 异常归还：抛错后槽位可用。
    await expect(gate.run(async () => { throw new Error('boom') })).rejects.toThrow('boom')
    expect(gate.stats().active).toBe(0)
    await gate.run(async () => undefined)
  })
})

describe('一次性分析经全局闸门', () => {
  it('闸门=1 时并行两次 runLlmAnalysis 实际串行', async () => {
    const gate = new LlmGate(1)
    setLlmGate(gate)
    let active = 0
    let peak = 0
    const ctx: any = { llm: { stream: async function* () {
      active += 1
      peak = Math.max(peak, active)
      yield { type: 'block-start', index: 0, blockType: 'text' } as StreamChunk
      yield { type: 'text-delta', index: 0, text: 'ok' } as StreamChunk
      yield { type: 'block-end', index: 0, block: { type: 'text', text: 'ok' } } as unknown as StreamChunk
      yield { type: 'finish', reason: { kind: 'completed' } } as StreamChunk
      await new Promise((resolve) => setTimeout(resolve, 50))
      active -= 1
    } } }
    const req = { prompt: 'p', provider: 'p', model: 'm', maxTokens: 100, timeoutMs: 5_000 } as const
    await Promise.all([runLlmAnalysis(ctx, req), runLlmAnalysis(ctx, req), runLlmAnalysis(ctx, req)])
    expect(peak).toBe(1)
    expect(gate.stats().active).toBe(0)
  })
})
