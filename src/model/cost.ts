/**
 * Cost tracking, DeepSeek token pricing calculator, and 4-tier cost aggregation.
 * @module dsh-project-control/model/cost
 */

export interface TokenUsage {
  input: number
  output: number
  cacheHit?: number
  cacheMiss?: number
  total: number
}

export interface CostRecord {
  usage: TokenUsage
  costUsd: number
  costCny: number
}

export interface ModelPricing {
  inputPerMillionUsd: number
  inputCacheHitPerMillionUsd: number
  outputPerMillionUsd: number
}

// USD to CNY conversion rate default (7.2)
export const USD_TO_CNY = 7.2

export const DEEPSEEK_PRICING: Record<string, ModelPricing> = {
  'deepseek-chat': {
    inputPerMillionUsd: 0.27,
    inputCacheHitPerMillionUsd: 0.07,
    outputPerMillionUsd: 1.10,
  },
  'deepseek-reasoner': {
    inputPerMillionUsd: 0.55,
    inputCacheHitPerMillionUsd: 0.14,
    outputPerMillionUsd: 2.19,
  },
}

export class CostTracker {
  /**
   * Calculate exact cost in USD and CNY for given token usage and model.
   */
  calculateCost(model: string, usage: TokenUsage): CostRecord {
    const pricing = DEEPSEEK_PRICING[model] ?? DEEPSEEK_PRICING['deepseek-chat']!

    const cacheHit = usage.cacheHit ?? 0
    const cacheMiss = usage.cacheMiss ?? Math.max(0, usage.input - cacheHit)
    const output = usage.output

    const inputCost = (cacheMiss / 1_000_000) * pricing.inputPerMillionUsd
    const cacheHitCost = (cacheHit / 1_000_000) * pricing.inputCacheHitPerMillionUsd
    const outputCost = (output / 1_000_000) * pricing.outputPerMillionUsd

    const totalUsd = inputCost + cacheHitCost + outputCost
    const totalCny = totalUsd * USD_TO_CNY

    return {
      usage,
      costUsd: Number(totalUsd.toFixed(6)),
      costCny: Number(totalCny.toFixed(6)),
    }
  }

  /**
   * Aggregate multiple token usages and costs.
   */
  aggregate(costs: CostRecord[]): CostRecord {
    const totalUsage: TokenUsage = {
      input: 0,
      output: 0,
      cacheHit: 0,
      cacheMiss: 0,
      total: 0,
    }
    let totalUsd = 0
    let totalCny = 0

    for (const item of costs) {
      totalUsage.input += item.usage.input
      totalUsage.output += item.usage.output
      totalUsage.cacheHit = (totalUsage.cacheHit ?? 0) + (item.usage.cacheHit ?? 0)
      totalUsage.cacheMiss = (totalUsage.cacheMiss ?? 0) + (item.usage.cacheMiss ?? 0)
      totalUsage.total += item.usage.total

      totalUsd += item.costUsd
      totalCny += item.costCny
    }

    return {
      usage: totalUsage,
      costUsd: Number(totalUsd.toFixed(6)),
      costCny: Number(totalCny.toFixed(6)),
    }
  }
}
