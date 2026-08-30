import { describe, expect, it } from 'vitest'
import { ModelRouter } from '../src/model/routing.ts'
import { CostTracker } from '../src/model/cost.ts'
import { CostGuard, BudgetExceededError } from '../src/model/guard.ts'

describe('Model Routing & Cost Tracking (T5.1 - T5.4)', () => {
  it('T5.1 & T5.2: routes model class and execution stage properly', () => {
    const router = new ModelRouter()

    // 4 Model classes
    const fast = router.resolveModelClass('fast')
    expect(fast.model).toBe('deepseek-chat')
    expect(fast.supportsThinking).toBe(false)

    const reasoning = router.resolveModelClass('reasoning')
    expect(reasoning.model).toBe('deepseek-reasoner')
    expect(reasoning.supportsThinking).toBe(true)

    // Stage based
    expect(router.resolveForStage('git_analysis').modelClass).toBe('fast')
    expect(router.resolveForStage('code_review').modelClass).toBe('reasoning')
    expect(router.resolveForStage('verification').modelClass).toBe('verifier')

    // Override
    const customRouter = new ModelRouter({
      modelOverrides: {
        fast: { provider: 'mock', model: 'mock-fast' },
      },
    })
    expect(customRouter.resolveModelClass('fast').model).toBe('mock-fast')
  })

  it('T5.3: calculates DeepSeek token costs and aggregates multi-tier usage', () => {
    const tracker = new CostTracker()

    // 1. deepseek-chat: 100k input (50k hit, 50k miss) + 10k output
    const chatUsage = {
      input: 100_000,
      cacheHit: 50_000,
      cacheMiss: 50_000,
      output: 10_000,
      total: 110_000,
    }
    const chatCost = tracker.calculateCost('deepseek-chat', chatUsage)
    // 50k * 0.07/M = 0.0035, 50k * 0.27/M = 0.0135, 10k * 1.10/M = 0.011 => total = 0.028 USD
    expect(chatCost.costUsd).toBeCloseTo(0.028, 4)
    expect(chatCost.costCny).toBeCloseTo(0.028 * 7.2, 4)

    // 2. deepseek-reasoner: 100k input + 20k output
    const reasonerUsage = {
      input: 100_000,
      cacheHit: 0,
      cacheMiss: 100_000,
      output: 20_000,
      total: 120_000,
    }
    const reasonerCost = tracker.calculateCost('deepseek-reasoner', reasonerUsage)
    // 100k * 0.55/M = 0.055, 20k * 2.19/M = 0.0438 => total = 0.0988 USD
    expect(reasonerCost.costUsd).toBeCloseTo(0.0988, 4)

    // 3. Aggregate
    const aggregated = tracker.aggregate([chatCost, reasonerCost])
    expect(aggregated.usage.total).toBe(230_000)
    expect(aggregated.costUsd).toBeCloseTo(0.028 + 0.0988, 4)
  })

  it('T5.4: enforces hard budget limits via CostGuard', () => {
    const guard = new CostGuard({
      maxCostPerStepUsd: 0.10,
      maxCostPerRunUsd: 0.50,
      maxCostPerChangeUsd: 2.00,
    })

    // Within budget
    expect(() => guard.checkStepCost(0.05)).not.toThrow()
    expect(() => guard.checkRunCost(0.30)).not.toThrow()
    expect(() => guard.checkChangeCost(1.50)).not.toThrow()

    // Exceed step budget
    expect(() => guard.checkStepCost(0.15)).toThrow(BudgetExceededError)

    // Exceed run budget
    expect(() => guard.checkRunCost(0.60)).toThrow(BudgetExceededError)

    // Exceed change budget
    expect(() => guard.checkChangeCost(2.50)).toThrow(BudgetExceededError)
  })
})
