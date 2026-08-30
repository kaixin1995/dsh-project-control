/**
 * 验证执行管道服务（Verification Runner）。
 * 依据 4 层优先级严格顺序执行验证器，在 Tier 1 确定性构建/单测失败时短路拦截，并持久化全部验证记录。
 *
 * @module dsh-project-control/verification/service
 */

import { createVerificationId, type VerificationId, type ProjectId, type ChangeId, type RunId, type EvidenceId } from '../domain/ids.ts'
import type { VerificationRecord } from '../domain/models.ts'
import type { DomainRepository } from '../store/repository.ts'
import type { Verifier, VerificationResult } from './verifier.ts'

export interface RunVerificationParams {
  projectId: ProjectId
  changeId: ChangeId
  runId?: RunId
  cwd: string
  changedFiles: string[]
  diffPatch?: string
  evidenceIds: EvidenceId[]
  skipLlmIfDeterministicPass?: boolean
}

export interface VerificationPipelineResult {
  allPassed: boolean
  hasDeterministicFailure: boolean
  records: VerificationRecord[]
  summary: string
}

export class VerificationRunner {
  constructor(
    private readonly verificationsRepo: DomainRepository<VerificationRecord, VerificationId>,
    private readonly verifiers: Verifier[],
  ) {}

  /**
   * 按照 4 层优先级继承体系执行验证管道。
   */
  async runPipeline(params: RunVerificationParams): Promise<VerificationPipelineResult> {
    // 按优先级升序排序（1 为最高优先级）
    const sortedVerifiers = [...this.verifiers].sort((a, b) => a.priority - b.priority)

    const records: VerificationRecord[] = []
    let allPassed = true
    let hasDeterministicFailure = false

    for (const verifier of sortedVerifiers) {
      // 短路逻辑：若 Tier 1 确定性检验失败，直接跳过后续低优先级检查
      if (hasDeterministicFailure && verifier.priority > 1) {
        continue
      }

      const result: VerificationResult = await verifier.verify({
        cwd: params.cwd,
        changedFiles: params.changedFiles,
        diffPatch: params.diffPatch,
        evidenceIds: params.evidenceIds,
      })

      const record: VerificationRecord = {
        id: createVerificationId(),
        projectId: params.projectId,
        changeId: params.changeId,
        runId: params.runId,
        type: result.type,
        status: result.status,
        name: result.name,
        details: result.details,
        verifierPriority: result.priority,
        evidenceIds: result.evidenceIds,
        evaluatedAt: Date.now(),
      }

      await this.verificationsRepo.save(record)
      records.push(record)

      if (result.status === 'failed') {
        allPassed = false
        if (result.priority === 1) {
          hasDeterministicFailure = true
        }
      }
    }

    const passedCount = records.filter(r => r.status === 'passed').length
    const totalCount = records.length
    const summary = `Verification Pipeline: ${passedCount}/${totalCount} passed. (Deterministic failure: ${hasDeterministicFailure})`

    return {
      allPassed,
      hasDeterministicFailure,
      records,
      summary,
    }
  }
}
