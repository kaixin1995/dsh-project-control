import { describe, expect, it } from 'vitest'
import {
  truthRank,
  isHigherTruth,
  canOverrideTruth,
  combineTruthLevels,
} from '../src/domain/truth.ts'
import {
  createCasRecord,
  applyCasUpdate,
  CasConflictError,
} from '../src/domain/cas.ts'

describe('Truth Model & CAS Concurrency (T1.3)', () => {
  it('strictly orders truth ranks from unverified (1) to fact (5)', () => {
    expect(truthRank('unverified')).toBe(1)
    expect(truthRank('inferred')).toBe(2)
    expect(truthRank('analysis_derived')).toBe(3)
    expect(truthRank('evidence_observed')).toBe(4)
    expect(truthRank('fact')).toBe(5)

    expect(isHigherTruth('fact', 'inferred')).toBe(true)
    expect(isHigherTruth('inferred', 'fact')).toBe(false)
  })

  it('prevents low-truth levels from overwriting higher-truth facts', () => {
    expect(canOverrideTruth('fact', 'fact')).toBe(true)
    expect(canOverrideTruth('inferred', 'fact')).toBe(true) // Promotion
    expect(canOverrideTruth('fact', 'inferred')).toBe(false) // Downgrade forbidden
    expect(canOverrideTruth('evidence_observed', 'unverified')).toBe(false)
  })

  it('computes weakest-link truth level from a collection', () => {
    expect(combineTruthLevels(['fact', 'fact', 'evidence_observed'])).toBe('evidence_observed')
    expect(combineTruthLevels(['fact', 'inferred', 'analysis_derived'])).toBe('inferred')
    expect(combineTruthLevels(['fact', 'unverified'])).toBe('unverified')
    expect(combineTruthLevels([])).toBe('unverified')
  })

  it('applies CAS updates and increments revision sequentially', () => {
    const record = createCasRecord({ title: 'Initial' }, 1)
    expect(record.revision).toBe(1)

    const updated = applyCasUpdate(record, 1, { title: 'Updated' })
    expect(updated.revision).toBe(2)
    expect(updated.data.title).toBe('Updated')

    const updatedAgain = applyCasUpdate(updated, 2, { title: 'Third' })
    expect(updatedAgain.revision).toBe(3)
    expect(updatedAgain.data.title).toBe('Third')
  })

  it('throws CasConflictError on stale expectedRevision without mutating', () => {
    const record = createCasRecord({ count: 10 }, 5)

    // Expected revision 4 instead of 5
    expect(() => applyCasUpdate(record, 4, { count: 20 })).toThrow(CasConflictError)
    expect(record.revision).toBe(5)
    expect(record.data.count).toBe(10)
  })
})
