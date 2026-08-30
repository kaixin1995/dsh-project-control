/**
 * Verification Runner executing verifiers by strict priority order and recording results.
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
   * Run verification pipeline adhering to the 4-tier priority hierarchy.
   */
  async runPipeline(params: RunVerificationParams): Promise<VerificationPipelineResult> {
    // Sort verifiers by priority ascending (1 is highest priority)
    const sortedVerifiers = [...this.verifiers].sort((a, b) => a.priority - b.priority)

    const records: VerificationRecord[] = []
    let allPassed = true
    let hasDeterministicFailure = false

    for (const verifier of sortedVerifiers) {
      // Short-circuit: If a Tier 1 deterministic check failed, skip lower priority checks
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
