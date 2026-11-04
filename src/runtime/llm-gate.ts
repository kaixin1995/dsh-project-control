/**
 * 全局模型并发闸门（业主 2026-11-04：并发必须是总并发，占满排队）。
 *
 * 一个进程内所有 LLM 消费方共用一个信号量：修复子代理（整个任务时长占 1 槽）
 * 与全部一次性分析调用（解读/分诊/复检/评审/叙事，单次调用时长占 1 槽）。
 * 预算 = liveConfig.fixConcurrency（设置页「模型总并发」，默认 3，1-10）。
 * FIFO 排队，设置实时调整（调大立即放行等待者）。
 *
 * @module dsh-project-control/runtime/llm-gate
 */

/** 异步信号量：acquire 拿槽（无槽则 FIFO 排队），release 归还；run() 包异常安全。 */
export class LlmGate {
  private limit: number
  private active = 0
  private readonly waiters: Array<() => void> = []

  constructor(limit: number) {
    this.limit = Math.max(1, Math.trunc(limit))
  }

  /** 设置实时生效：调大后立即放行足够多的等待者。 */
  updateLimit(limit: number): void {
    this.limit = Math.max(1, Math.trunc(limit))
    this.drain()
  }

  currentLimit(): number {
    return this.limit
  }

  stats(): { limit: number; active: number; queued: number } {
    return { limit: this.limit, active: this.active, queued: this.waiters.length }
  }

  private drain(): void {
    while (this.active < this.limit && this.waiters.length > 0) {
      const wake = this.waiters.shift()!
      this.active += 1
      wake()
    }
  }

  async acquire(): Promise<void> {
    if (this.active < this.limit) {
      this.active += 1
      return
    }
    await new Promise<void>((resolve) => { this.waiters.push(resolve) })
    // drain() 在唤醒前已代为 active += 1（保持 FIFO 严格性，唤醒即持槽）。
  }

  release(): void {
    if (this.active > 0) this.active -= 1
    this.drain()
  }

  /** 占槽执行；异常也保证归还。 */
  async run<T>(operation: () => Promise<T>): Promise<T> {
    await this.acquire()
    try {
      return await operation()
    } finally {
      this.release()
    }
  }
}
