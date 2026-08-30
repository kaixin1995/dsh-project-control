/**
 * Core entity domain models and schemas for Project Control.
 * @module dsh-project-control/domain/models
 */

import { z } from 'zod'
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
export interface PlanStepDefinition {
  id: StepId
  title: string
  description: string
  dependencies: StepId[]
  targetFiles?: string[]
  suggestedTools?: string[]
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
  activeJobId?: string
  currentStepId?: StepId
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
  status: IssueStatus
  title: string
  description: string
  evidenceIds: EvidenceId[]
  suggestedFix?: string
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
  createdAt: number
  updatedAt: number
}
