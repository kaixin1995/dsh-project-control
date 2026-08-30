/**
 * Cost Guard and hard budget limit enforcement.
 * @module dsh-project-control/model/guard
 */

export class BudgetExceededError extends Error {
  constructor(
    public readonly scope: 'change' | 'run' | 'step',
    public readonly currentCostUsd: number,
    public readonly maxBudgetUsd: number,
    message = `Budget exceeded in ${scope} scope: spent $${currentCostUsd.toFixed(4)}, limit is $${maxBudgetUsd.toFixed(4)}`,
  ) {
    super(message)
    this.name = 'BudgetExceededError'
  }
}

export interface BudgetConfig {
  maxCostPerChangeUsd?: number
  maxCostPerRunUsd?: number
  maxCostPerStepUsd?: number
}

export class CostGuard {
  constructor(private readonly config: BudgetConfig = {}) {}

  /**
   * Check if current cost violates step budget.
   */
  checkStepCost(currentCostUsd: number, overrideLimit?: number): void {
    const limit = overrideLimit ?? this.config.maxCostPerStepUsd
    if (limit !== undefined && currentCostUsd > limit) {
      throw new BudgetExceededError('step', currentCostUsd, limit)
    }
  }

  /**
   * Check if current cost violates run budget.
   */
  checkRunCost(currentCostUsd: number, overrideLimit?: number): void {
    const limit = overrideLimit ?? this.config.maxCostPerRunUsd
    if (limit !== undefined && currentCostUsd > limit) {
      throw new BudgetExceededError('run', currentCostUsd, limit)
    }
  }

  /**
   * Check if current cost violates change budget.
   */
  checkChangeCost(currentCostUsd: number, overrideLimit?: number): void {
    const limit = overrideLimit ?? this.config.maxCostPerChangeUsd
    if (limit !== undefined && currentCostUsd > limit) {
      throw new BudgetExceededError('change', currentCostUsd, limit)
    }
  }
}
