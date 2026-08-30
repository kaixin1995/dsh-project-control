/**
 * 状态机模型与合法状态迁移校验矩阵。
 * 覆盖变更 (Change/9状态)、运行 (Run/10状态)、步骤 (Step/11状态)、尝试 (Attempt/6状态)。
 *
 * @module dsh-project-control/domain/state-machine
 */

/**
 * 穷举检查兜底函数：当联合类型产生未处理分支时抛出异常。
 */
export function assertNever(x: never, message = 'Unexpected value in exhaustive check'): never {
  throw new Error(`${message}: ${JSON.stringify(x)}`)
}

// -----------------------------------------------------------------------------
// 1. 变更状态（Change Status - 9 种状态）
// -----------------------------------------------------------------------------
/**
 * 变更状态枚举：
 * - draft: 草稿中
 * - analyzing: 变更分析中
 * - ready: 就绪（可开始执行）
 * - executing: 正在执行中
 * - reviewing: 审查中
 * - verifying: 验证中
 * - completed: 已完成（终态）
 * - failed: 失败（可恢复/重新规划）
 * - cancelled: 已取消
 */
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
  completed: [], // 终态
  failed: ['ready', 'analyzing', 'draft'], // 可恢复重试
  cancelled: ['draft'], // 可重新激活回草稿
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
// 2. 运行状态（Run Status - 10 种状态）
// -----------------------------------------------------------------------------
/**
 * 运行实例状态枚举：
 * - queued: 排队中
 * - running: 运行中
 * - paused: 暂停
 * - blocked: 阻塞中
 * - retrying: 重试中
 * - verifying: 校验中
 * - succeeded: 成功（终态）
 * - failed: 失败
 * - cancelled: 取消
 * - interrupted: 异常中断（可恢复）
 */
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
  succeeded: [], // 终态
  failed: ['queued'], // 可重新加入队列
  cancelled: [], // 终态
  interrupted: ['queued', 'running', 'failed', 'cancelled'], // 崩溃扫描器可恢复
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
// 3. 步骤状态（Step Status - 11 种状态）
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
  succeeded: [], // 终态
  failed: ['ready', 'pending'], // 可重置
  skipped: ['ready', 'pending'], // 可重新启用
  blocked: ['ready', 'cancelled', 'failed'],
  cancelled: [], // 终态
  interrupted: ['ready', 'failed', 'cancelled'], // 可恢复
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
// 4. 单次尝试状态（Attempt Status - 6 种状态）
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
  succeeded: [], // 终态
  failed: [], // 终态
  cancelled: [], // 终态
  timed_out: [], // 终态
  interrupted: [], // 终态（中断恢复后开启新 Attempt）
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
