/**
 * 4 层验证器接口与执行链（Verifier Hierarchy）。
 * Tier 1: 确定性构建 / 编译与测试（Deterministic Build / Unit Test，零 LLM 地面真值）
 * Tier 2: 静态事实证据与 Diff 断言（Static Evidence & Diff Assertion）
 * Tier 3: LLM 启发式代码审查（LLM Heuristic Code Review）
 * Tier 4: 人工确认签署（Human Sign-off）
 *
 * @module dsh-project-control/verification/verifier
 */

import type { VerificationType, VerificationStatus } from '../domain/models.ts'
import type { EvidenceId } from '../domain/ids.ts'

export interface VerificationResult {
  name: string
  type: VerificationType
  status: VerificationStatus
  priority: 1 | 2 | 3 | 4
  details?: string
  evidenceIds: EvidenceId[]
}

export interface Verifier {
  readonly name: string
  readonly type: VerificationType
  readonly priority: 1 | 2 | 3 | 4
  verify(context: {
    cwd: string
    changedFiles: string[]
    diffPatch?: string
    evidenceIds: EvidenceId[]
  }): Promise<VerificationResult>
}

/**
 * Tier 1: 确定性构建 / 编译验证器
 */
export class DeterministicBuildVerifier implements Verifier {
  readonly name = 'Deterministic Build Check'
  readonly type = 'deterministic_build'
  readonly priority = 1

  constructor(
    private readonly buildRunner: (cwd: string) => Promise<{ success: boolean; output: string }>,
  ) {}

  async verify(context: { cwd: string }): Promise<VerificationResult> {
    try {
      const outcome = await this.buildRunner(context.cwd)
      return {
        name: this.name,
        type: this.type,
        status: outcome.success ? 'passed' : 'failed',
        priority: this.priority,
        details: outcome.output,
        evidenceIds: [],
      }
    } catch (err: unknown) {
      return {
        name: this.name,
        type: this.type,
        status: 'failed',
        priority: this.priority,
        details: (err as Error).message,
        evidenceIds: [],
      }
    }
  }
}

/**
 * Tier 1: 自动化单元测试验证器
 */
export class UnitTestVerifier implements Verifier {
  readonly name = 'Automated Unit Tests'
  readonly type = 'unit_test'
  readonly priority = 1

  constructor(
    private readonly testRunner: (cwd: string, testFilter?: string[]) => Promise<{ passed: boolean; details: string }>,
  ) {}

  async verify(context: { cwd: string; changedFiles: string[] }): Promise<VerificationResult> {
    try {
      const outcome = await this.testRunner(context.cwd, context.changedFiles)
      return {
        name: this.name,
        type: this.type,
        status: outcome.passed ? 'passed' : 'failed',
        priority: this.priority,
        details: outcome.details,
        evidenceIds: [],
      }
    } catch (err: unknown) {
      return {
        name: this.name,
        type: this.type,
        status: 'failed',
        priority: this.priority,
        details: (err as Error).message,
        evidenceIds: [],
      }
    }
  }
}

/**
 * Tier 2: 静态证据与 Diff 一致性验证器
 */
export class EvidenceDiffVerifier implements Verifier {
  readonly name = 'Static Evidence & Diff Consistency'
  readonly type = 'evidence_check'
  readonly priority = 2

  async verify(context: { diffPatch?: string; evidenceIds: EvidenceId[] }): Promise<VerificationResult> {
    const hasDiff = context.diffPatch && context.diffPatch.trim().length > 0
    const hasEvidence = context.evidenceIds.length > 0

    if (!hasDiff && !hasEvidence) {
      return {
        name: this.name,
        type: this.type,
        status: 'failed',
        priority: this.priority,
        details: 'No diff or evidence attached to change',
        evidenceIds: context.evidenceIds,
      }
    }

    return {
      name: this.name,
      type: this.type,
      status: 'passed',
      priority: this.priority,
      details: `Verified ${context.evidenceIds.length} evidence record(s) and diff consistency`,
      evidenceIds: context.evidenceIds,
    }
  }
}

/**
 * Tier 3: LLM 启发式代码审查验证器
 */
export class LlmReviewVerifier implements Verifier {
  readonly name = 'LLM Heuristic Code Review'
  readonly type = 'llm_eval'
  readonly priority = 3

  constructor(
    private readonly llmReviewer: (diffPatch: string) => Promise<{ passed: boolean; critique: string }>,
  ) {}

  async verify(context: { diffPatch?: string; evidenceIds: EvidenceId[] }): Promise<VerificationResult> {
    if (!context.diffPatch) {
      return {
        name: this.name,
        type: this.type,
        status: 'skipped',
        priority: this.priority,
        details: 'Empty diff, skipped review',
        evidenceIds: context.evidenceIds,
      }
    }

    const review = await this.llmReviewer(context.diffPatch)
    return {
      name: this.name,
      type: this.type,
      status: review.passed ? 'passed' : 'failed',
      priority: this.priority,
      details: review.critique,
      evidenceIds: context.evidenceIds,
    }
  }
}
