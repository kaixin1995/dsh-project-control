/**
 * State machine models and transition validation matrices.
 * Implements Change(9), Run(10), Step(11), Attempt(6) states.
 *
 * @module dsh-project-control/domain/state-machine
 */

export function assertNever(x: never, message = 'Unexpected value in exhaustive check'): never {
  throw new Error(`${message}: ${JSON.stringify(x)}`)
}

// -----------------------------------------------------------------------------
// 1. Change Status (9 states)
// -----------------------------------------------------------------------------
export type ChangeStatus =
  | 'draft'
  | 'analyzing'
  | 'ready'
  | 'executing'
  | 'reviewing'
  | 'verifying'
  | 'completed'
  | 'failed'
  | 'cancelled'

export const CHANGE_STATUSES: readonly ChangeStatus[] = [
  'draft',
  'analyzing',
  'ready',
  'executing',
  'reviewing',
  'verifying',
  'completed',
  'failed',
  'cancelled',
] as const

const CHANGE_TRANSITIONS: Record<ChangeStatus, readonly ChangeStatus[]> = {
  draft: ['analyzing', 'ready', 'cancelled'],
  analyzing: ['ready', 'draft', 'failed', 'cancelled'],
  ready: ['executing', 'analyzing', 'cancelled'],
  executing: ['reviewing', 'verifying', 'ready', 'failed', 'cancelled'],
  reviewing: ['verifying', 'executing', 'failed', 'cancelled'],
  verifying: ['completed', 'reviewing', 'executing', 'failed', 'cancelled'],
  completed: [], // Terminal
  failed: ['ready', 'analyzing', 'draft'], // Recoverable
  cancelled: ['draft'], // Can be reopened to draft
}

export function canTransitionChange(from: ChangeStatus, to: ChangeStatus): boolean {
  if (from === to) return true
  const allowed = CHANGE_TRANSITIONS[from]
  return allowed ? allowed.includes(to) : false
}

export function assertChangeTransition(from: ChangeStatus, to: ChangeStatus): void {
  if (!canTransitionChange(from, to)) {
    throw new Error(`Illegal Change state transition from "${from}" to "${to}"`)
  }
}

// -----------------------------------------------------------------------------
// 2. Run Status (10 states)
// -----------------------------------------------------------------------------
export type RunStatus =
  | 'queued'
  | 'running'
  | 'paused'
  | 'blocked'
  | 'retrying'
  | 'verifying'
  | 'succeeded'
  | 'failed'
  | 'cancelled'
  | 'interrupted'

export const RUN_STATUSES: readonly RunStatus[] = [
  'queued',
  'running',
  'paused',
  'blocked',
  'retrying',
  'verifying',
  'succeeded',
  'failed',
  'cancelled',
  'interrupted',
] as const

const RUN_TRANSITIONS: Record<RunStatus, readonly RunStatus[]> = {
  queued: ['running', 'cancelled', 'interrupted'],
  running: ['paused', 'blocked', 'retrying', 'verifying', 'succeeded', 'failed', 'cancelled', 'interrupted'],
  paused: ['running', 'cancelled', 'interrupted'],
  blocked: ['running', 'cancelled', 'failed', 'interrupted'],
  retrying: ['running', 'failed', 'cancelled', 'interrupted'],
  verifying: ['succeeded', 'failed', 'running', 'cancelled', 'interrupted'],
  succeeded: [], // Terminal
  failed: ['queued'], // Rerunnable
  cancelled: [], // Terminal
  interrupted: ['queued', 'running', 'failed', 'cancelled'], // Recoverable via recovery scanner
}

export function canTransitionRun(from: RunStatus, to: RunStatus): boolean {
  if (from === to) return true
  const allowed = RUN_TRANSITIONS[from]
  return allowed ? allowed.includes(to) : false
}

export function assertRunTransition(from: RunStatus, to: RunStatus): void {
  if (!canTransitionRun(from, to)) {
    throw new Error(`Illegal Run state transition from "${from}" to "${to}"`)
  }
}

// -----------------------------------------------------------------------------
// 3. Step Status (11 states)
// -----------------------------------------------------------------------------
export type StepStatus =
  | 'pending'
  | 'ready'
  | 'running'
  | 'paused'
  | 'retrying'
  | 'succeeded'
  | 'failed'
  | 'skipped'
  | 'blocked'
  | 'cancelled'
  | 'interrupted'

export const STEP_STATUSES: readonly StepStatus[] = [
  'pending',
  'ready',
  'running',
  'paused',
  'retrying',
  'succeeded',
  'failed',
  'skipped',
  'blocked',
  'cancelled',
  'interrupted',
] as const

const STEP_TRANSITIONS: Record<StepStatus, readonly StepStatus[]> = {
  pending: ['ready', 'skipped', 'cancelled'],
  ready: ['running', 'blocked', 'skipped', 'cancelled'],
  running: ['paused', 'retrying', 'succeeded', 'failed', 'blocked', 'cancelled', 'interrupted'],
  paused: ['running', 'cancelled', 'interrupted'],
  retrying: ['running', 'failed', 'cancelled', 'interrupted'],
  succeeded: [], // Terminal
  failed: ['ready', 'pending'], // Rerunnable
  skipped: ['ready', 'pending'], // Resettable
  blocked: ['ready', 'cancelled', 'failed'],
  cancelled: [], // Terminal
  interrupted: ['ready', 'failed', 'cancelled'], // Recoverable
}

export function canTransitionStep(from: StepStatus, to: StepStatus): boolean {
  if (from === to) return true
  const allowed = STEP_TRANSITIONS[from]
  return allowed ? allowed.includes(to) : false
}

export function assertStepTransition(from: StepStatus, to: StepStatus): void {
  if (!canTransitionStep(from, to)) {
    throw new Error(`Illegal Step state transition from "${from}" to "${to}"`)
  }
}

// -----------------------------------------------------------------------------
// 4. Attempt Status (6 states)
// -----------------------------------------------------------------------------
export type AttemptStatus =
  | 'running'
  | 'succeeded'
  | 'failed'
  | 'cancelled'
  | 'timed_out'
  | 'interrupted'

export const ATTEMPT_STATUSES: readonly AttemptStatus[] = [
  'running',
  'succeeded',
  'failed',
  'cancelled',
  'timed_out',
  'interrupted',
] as const

const ATTEMPT_TRANSITIONS: Record<AttemptStatus, readonly AttemptStatus[]> = {
  running: ['succeeded', 'failed', 'cancelled', 'timed_out', 'interrupted'],
  succeeded: [], // Terminal
  failed: [], // Terminal
  cancelled: [], // Terminal
  timed_out: [], // Terminal
  interrupted: [], // Terminal (Recovery creates a NEW Attempt)
}

export function canTransitionAttempt(from: AttemptStatus, to: AttemptStatus): boolean {
  if (from === to) return true
  const allowed = ATTEMPT_TRANSITIONS[from]
  return allowed ? allowed.includes(to) : false
}

export function assertAttemptTransition(from: AttemptStatus, to: AttemptStatus): void {
  if (!canTransitionAttempt(from, to)) {
    throw new Error(`Illegal Attempt state transition from "${from}" to "${to}"`)
  }
}
