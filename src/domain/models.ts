/**
 * Core entity domain models and schemas for Project Control.
 * @module dsh-project-control/domain/models
 */

import type {
  ProjectId,
  ChangeId,
  PlanId,
  RunId,
  StepId,
  AttemptId,
  EvidenceId,
  IssueId,
  VerificationId,
  MemoryId,
} from './ids.ts'
import type { ChangeStatus, RunStatus, StepStatus, AttemptStatus } from './state-machine.ts'
import type { TruthLevel } from './truth.ts'

// -----------------------------------------------------------------------------
// 1. Project Entity
// -----------------------------------------------------------------------------
export interface RepositoryIdentity {
  rootPath: string
  commonDir?: string
  originUrl?: string
  rootCommitHash: string
  currentBranch?: string
}

export interface ProjectRecord {
  id: ProjectId
  name: string
  identity: RepositoryIdentity
  createdAt: number
  updatedAt: number
}

// -----------------------------------------------------------------------------
// 2. Change Entity
// -----------------------------------------------------------------------------
export interface ChangeRecord {
  id: ChangeId
  projectId: ProjectId
  title: string
  description: string
  status: ChangeStatus
  baseRevision: string // base commit SHA
  currentPlanId?: PlanId
  revision: number
  createdAt: number
  updatedAt: number
}

// -----------------------------------------------------------------------------
// 3. Plan & Step Definition Entities
// -----------------------------------------------------------------------------
/** 步骤角色：决定上下文组装模板与默认模型档位（编排 DSL 的一部分）。 */
export type StepRole = 'analysis' | 'planning' | 'coding' | 'ops' | 'verification'

/** 步骤失败策略：重试升级（默认）/ 重试降级 / 跳过并记录 / 暂停问人。 */
export type StepFailurePolicy = 'retry-escalate' | 'retry-fallback' | 'skip' | 'ask'

/** 步骤级模型覆盖（计划确认页可改）：空串表示跟随角色默认档位。 */
export interface StepModelOverride {
  provider: string
  model: string
}

export interface PlanStepDefinition {
  id: StepId
  title: string
  description: string
  dependencies: StepId[]
  targetFiles?: string[]
  suggestedTools?: string[]
  /** 编排角色；缺省由标题/描述推断（分析/操作/验收/规划/开发）。 */
  role?: StepRole
  /** 计划确认页的模型覆盖（优先于角色默认档位）。 */
  modelOverride?: StepModelOverride
  /** 验收标准（真值校验与验收步骤的判定依据）。 */
  acceptance?: string
  /** 失败策略（缺省 retry-escalate）。 */
  failurePolicy?: StepFailurePolicy
  /** 计划确认页可禁用单个步骤（launch 时跳过）。 */
  enabled?: boolean
}

export interface PlanRecord {
  id: PlanId
  changeId: ChangeId
  projectId: ProjectId
  version: number
  title: string
  steps: PlanStepDefinition[]
  createdAt: number
}

// -----------------------------------------------------------------------------
// 4. Run, Step, Attempt Entities
// -----------------------------------------------------------------------------
export interface RunRecord {
  id: RunId
  changeId: ChangeId
  planId: PlanId
  projectId: ProjectId
  status: RunStatus
  isolationMode: 'current' | 'isolated-worktree'
  worktreePath?: string
  /** 执行工作目录（'current'=项目根；isolated-worktree 模式为 worktree 路径）。 */
  workspaceId?: string
  activeJobId?: string
  currentStepId?: StepId
  /** 暂停问人时的决策点（步骤 id 与原因），resume 依据。 */
  pausePoint?: { stepId: StepId; reason: string; at: number }
  startedAt?: number
  finishedAt?: number
  error?: { message: string; code?: string }
  createdAt: number
  updatedAt: number
}

export interface StepRecord {
  id: StepId
  runId: RunId
  planStepId: StepId
  projectId: ProjectId
  status: StepStatus
  claimedOutcome?: string
  verifiedOutcome?: boolean
  attemptsCount: number
  createdAt: number
  updatedAt: number
}

export interface AttemptRecord {
  id: AttemptId
  stepId: StepId
  runId: RunId
  projectId: ProjectId
  attemptNumber: number
  sessionId?: string // SessionId of the child agent
  status: AttemptStatus
  modelClass?: 'fast' | 'standard' | 'reasoning' | 'verifier'
  model?: string
  provider?: string
  error?: string
  tokenUsage?: { input: number; output: number; total: number }
  startedAt: number
  finishedAt?: number
}

// -----------------------------------------------------------------------------
// 5. Evidence Entity
// -----------------------------------------------------------------------------
export type EvidenceSource =
  | 'git_diff'
  | 'git_log'
  | 'file_ast'
  | 'lsp_symbol'
  | 'tool_execution'
  | 'test_run'
  | 'build_output'
  | 'manual_user'

export interface EvidenceRecord {
  id: EvidenceId
  projectId: ProjectId
  changeId?: ChangeId
  source: EvidenceSource
  truthLevel: TruthLevel
  locator: string
  contentHash: string
  snippet?: string
  fullArtifactPath?: string // For spilled large patches/logs
  createdAt: number
}

// -----------------------------------------------------------------------------
// 6. Review Issue Entity
// -----------------------------------------------------------------------------
export type IssueSeverity = 'blocker' | 'critical' | 'major' | 'minor' | 'info'
export type IssueStatus = 'open' | 'fixing' | 'resolved' | 'accepted' | 'rejected'

export interface ReviewIssueRecord {
  id: IssueId
  projectId: ProjectId
  changeId: ChangeId
  severity: IssueSeverity
  /** 问题分类（评审输出的自由文本分类，如 并发/错误处理/安全）。 */
  category?: string
  status: IssueStatus
  title: string
  description: string
  evidenceIds: EvidenceId[]
  suggestedFix?: string
  /** 复检通过依据（自动置 resolved 时写入，含时间与一句话判定依据）。 */
  resolution?: string
  /** 修复证据（复检通过时快照）：评审基线以来的变更统计。 */
  fixStats?: { files: number; insertions: number; deletions: number }
  /** 修复涉及的文件（复检判定归因；无归因时为基线以来全部变更文件）。 */
  fixFiles?: string[]
  /** 修复改动的符号及其调用点（确定性 git 扫描快照）。 */
  fixImpact?: Array<{ symbol: string; definedIn: string; callers: Array<{ file: string; line: string; snippet: string }> }>
  /** 修复差异原文（归因文件的补丁，截断保存）。 */
  fixDiff?: string
  createdAt: number
  updatedAt: number
}

// -----------------------------------------------------------------------------
// 7. Verification Entity
// -----------------------------------------------------------------------------
export type VerificationType = 'deterministic_build' | 'unit_test' | 'diff_assertion' | 'evidence_check' | 'llm_eval' | 'human_signoff'
export type VerificationStatus = 'pending' | 'passed' | 'failed' | 'skipped'

export interface VerificationRecord {
  id: VerificationId
  projectId: ProjectId
  changeId: ChangeId
  runId?: RunId
  type: VerificationType
  status: VerificationStatus
  name: string
  details?: string
  verifierPriority: number // 1: deterministic, 2: evidence, 3: llm, 4: human
  evidenceIds: EvidenceId[]
  evaluatedAt: number
}

// -----------------------------------------------------------------------------
// 8. 记忆实体（Memory Entity）
// -----------------------------------------------------------------------------
export type MemoryType =
  | 'architecture_decision'
  | 'pattern_rule'
  | 'risk_hotspot'
  | 'learned_concept'
  | 'user_profile'
  | 'project_log'
  | 'daily_log'

/** 记忆作用域：project=主干（全分支通用）；branch=仅创建时所在分支语境。 */
export type MemoryScope = 'project' | 'branch'

/** 记忆来源：执行 Run / 提交核查 / 拉取同步 / 聊天工具 / 手动。 */
export type MemorySourceTag = 'run' | 'review' | 'sync' | 'chat' | 'manual'

/** 记忆有效性状态：生效 / 疑似过时（相关代码被改，待复核）/ 已取代 / 已归档。 */
export type MemoryStatus = 'active' | 'stale' | 'superseded' | 'archived'

export interface MemoryRecord {
  id: MemoryId
  projectId: ProjectId
  type: MemoryType
  truthLevel: TruthLevel
  title: string
  content: string
  relatedFiles?: string[]
  evidenceIds: EvidenceId[]
  isHumanConfirmed: boolean
  gitBranch?: string
  tags?: string[]
  /** 作用域（缺省 project；branch 时与 gitBranch 配合）。 */
  scope?: MemoryScope
  /** 来源标签（缺省 manual）。 */
  sourceTag?: MemorySourceTag
  /** 血缘：基于哪个提交产生。 */
  basisSha?: string
  /** 有效性状态（缺省 active）。 */
  status?: MemoryStatus
  /** 上次验证仍有效时的 HEAD（拉取同步自动续命刷新）。 */
  lastVerifiedSha?: string
  /** 取代本条的新记忆 id。 */
  supersededBy?: MemoryId
  createdAt: number
  updatedAt: number
}

// -----------------------------------------------------------------------------
// 9. 任务工作记忆（RunContext）：单次 Run 内的上下文档案
// -----------------------------------------------------------------------------
export interface RunStepSummary {
  stepTitle: string
  summary: string
  changedFiles: string[]
  at: number
}

export interface RunDecisionEntry {
  kind: 'blocked' | 'failed' | 'skipped' | 'timeout' | 'paused' | 'resumed' | 'policy'
  detail: string
  at: number
}

export interface RunContextRecord {
  /** 即 runId。 */
  id: string
  runId: RunId
  projectId: ProjectId
  /** 项目档案摘要（技术栈/结构提示），启动时快照。 */
  projectDigest: string
  /** 启动时注入的记忆快照（id+标题，供审计）。 */
  injectedMemories: Array<{ id: string; title: string }>
  /** 已完成步骤的产物摘要（喂给后续步骤与记忆提炼）。 */
  stepSummaries: RunStepSummary[]
  /** 决策日志（阻塞/失败/跳过/暂停等）。 */
  decisionLog: RunDecisionEntry[]
  /** 启动时代码状态。 */
  headSha?: string
  branch?: string
  updatedAt: number
}

// -----------------------------------------------------------------------------
// 10. 记忆基线：每项目每分支的拉取同步游标
// -----------------------------------------------------------------------------
export interface MemoryBaselineRecord {
  /** safeStorageId(`${projectId}|${branch}`)——物理键必须路径安全（storage-json 断言），原始键见派生处。 */
  id: string
  projectId: ProjectId
  branch: string
  lastSyncedSha?: string
  updatedAt: number
}

// -----------------------------------------------------------------------------
// 11. 例行任务：模板 + 定时触发
// -----------------------------------------------------------------------------
export type ScheduledTaskType = 'run' | 'review' | 'summary' | 'sync'

export interface ScheduledTaskRecord {
  id: string
  projectId: ProjectId
  name: string
  type: ScheduledTaskType
  /** type=run 时的任务模板标题/描述。 */
  title?: string
  description?: string
  /** 触发间隔（分钟）；到点自动执行。 */
  intervalMinutes: number
  enabled: boolean
  lastRunAt?: number
  lastResult?: string
  createdAt: number
  updatedAt: number
}
