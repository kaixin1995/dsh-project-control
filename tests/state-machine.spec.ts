import { describe, expect, it } from 'vitest'
import {
  CHANGE_STATUSES,
  RUN_STATUSES,
  STEP_STATUSES,
  ATTEMPT_STATUSES,
  canTransitionChange,
  assertChangeTransition,
  canTransitionRun,
  assertRunTransition,
  canTransitionStep,
  assertStepTransition,
  canTransitionAttempt,
  assertAttemptTransition,
  assertNever,
} from '../src/domain/state-machine.ts'

describe('State Machine & Transition Matrix (T1.2)', () => {
  it('validates Change transition matrix', () => {
    expect(canTransitionChange('draft', 'ready')).toBe(true)
    expect(canTransitionChange('ready', 'executing')).toBe(true)
    expect(canTransitionChange('executing', 'reviewing')).toBe(true)
    expect(canTransitionChange('reviewing', 'verifying')).toBe(true)
    expect(canTransitionChange('verifying', 'completed')).toBe(true)

    // Illegal transitions
    expect(canTransitionChange('draft', 'completed')).toBe(false)
    expect(canTransitionChange('completed', 'executing')).toBe(false)
    expect(() => assertChangeTransition('completed', 'draft')).toThrow(/Illegal Change state transition/)
  })

  it('validates Run transition matrix', () => {
    expect(canTransitionRun('queued', 'running')).toBe(true)
    expect(canTransitionRun('running', 'retrying')).toBe(true)
    expect(canTransitionRun('retrying', 'running')).toBe(true)
    expect(canTransitionRun('running', 'verifying')).toBe(true)
    expect(canTransitionRun('verifying', 'succeeded')).toBe(true)
    expect(canTransitionRun('running', 'interrupted')).toBe(true)

    // Illegal transitions
    expect(canTransitionRun('succeeded', 'running')).toBe(false)
    expect(() => assertRunTransition('succeeded', 'queued')).toThrow(/Illegal Run state transition/)
  })

  it('validates Step transition matrix', () => {
    expect(canTransitionStep('pending', 'ready')).toBe(true)
    expect(canTransitionStep('ready', 'running')).toBe(true)
    expect(canTransitionStep('running', 'succeeded')).toBe(true)
    expect(canTransitionStep('running', 'retrying')).toBe(true)
    expect(canTransitionStep('running', 'interrupted')).toBe(true)

    // Illegal transitions
    expect(canTransitionStep('succeeded', 'running')).toBe(false)
    expect(canTransitionStep('cancelled', 'running')).toBe(false)
    expect(() => assertStepTransition('succeeded', 'running')).toThrow(/Illegal Step state transition/)
  })

  it('validates Attempt transition matrix', () => {
    expect(canTransitionAttempt('running', 'succeeded')).toBe(true)
    expect(canTransitionAttempt('running', 'failed')).toBe(true)
    expect(canTransitionAttempt('running', 'interrupted')).toBe(true)
    expect(canTransitionAttempt('running', 'timed_out')).toBe(true)

    // Illegal transitions (all non-running states are terminal)
    expect(canTransitionAttempt('succeeded', 'running')).toBe(false)
    expect(canTransitionAttempt('failed', 'running')).toBe(false)
    expect(canTransitionAttempt('interrupted', 'running')).toBe(false)
    expect(() => assertAttemptTransition('succeeded', 'failed')).toThrow(/Illegal Attempt state transition/)
  })

  it('exhaustively covers all statuses in matrix arrays', () => {
    expect(CHANGE_STATUSES.length).toBe(9)
    expect(RUN_STATUSES.length).toBe(10)
    expect(STEP_STATUSES.length).toBe(11)
    expect(ATTEMPT_STATUSES.length).toBe(6)
  })

  it('assertNever throws descriptive error', () => {
    expect(() => assertNever('bad' as never)).toThrow(/Unexpected value/)
  })
})
