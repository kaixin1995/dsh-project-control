/**
 * 5-level Truth Model hierarchy for Project Control.
 * @module dsh-project-control/domain/truth
 */

export type TruthLevel =
  | 'fact'               // Level 5: Deterministic disk/git observation, zero-LLM ground truth
  | 'evidence_observed'  // Level 4: Concrete tool result / compiler / test output
  | 'analysis_derived'   // Level 3: Deterministic graph / static AST analysis
  | 'inferred'           // Level 2: LLM heuristic inference / probabilistic deduction
  | 'unverified'         // Level 1: Unverified assumption or uninspected user claim

export const TRUTH_LEVEL_RANKS: Record<TruthLevel, number> = {
  unverified: 1,
  inferred: 2,
  analysis_derived: 3,
  evidence_observed: 4,
  fact: 5,
}

export function truthRank(level: TruthLevel): number {
  return TRUTH_LEVEL_RANKS[level]
}

/**
 * Checks if incoming truth level is strictly higher than existing.
 */
export function isHigherTruth(incoming: TruthLevel, existing: TruthLevel): boolean {
  return truthRank(incoming) > truthRank(existing)
}

/**
 * Checks if incoming truth level can overwrite existing truth level.
 * Rule: Equal or higher rank can overwrite; lower rank CANNOT downgrade higher truth.
 */
export function canOverrideTruth(existing: TruthLevel, incoming: TruthLevel): boolean {
  return truthRank(incoming) >= truthRank(existing)
}

/**
 * Combines multiple truth levels down to their lowest common denominator (weakest link principle).
 */
export function combineTruthLevels(levels: readonly TruthLevel[]): TruthLevel {
  if (levels.length === 0) return 'unverified'
  let lowest: TruthLevel = levels[0]!
  for (let i = 1; i < levels.length; i++) {
    if (truthRank(levels[i]!) < truthRank(lowest)) {
      lowest = levels[i]!
    }
  }
  return lowest
}
