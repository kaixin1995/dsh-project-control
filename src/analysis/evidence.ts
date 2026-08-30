/**
 * Evidence modeling, content-addressed indexing, and spill artifact management.
 * @module dsh-project-control/analysis/evidence
 */

import { createHash } from 'node:crypto'
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { createEvidenceId, type EvidenceId, type ProjectId, type ChangeId } from '../domain/ids.ts'
import type { TruthLevel } from '../domain/truth.ts'
import type { EvidenceRecord, EvidenceSource } from '../domain/models.ts'

export type EvidenceType =
  | 'code_diff'
  | 'commit_ref'
  | 'ast_node'
  | 'symbol_ref'
  | 'call_hierarchy'
  | 'tool_io'
  | 'test_failure'
  | 'test_pass'
  | 'build_error'
  | 'runtime_log'
  | 'contract_violation'
  | 'human_note'

export const INLINE_EVIDENCE_MAX_BYTES = 50 * 1024 // 50 KB

export interface CreateEvidenceParams {
  projectId: ProjectId
  changeId?: ChangeId
  source: EvidenceSource
  truthLevel: TruthLevel
  locator: string
  content: string
  artifactStorageDir?: string // Base directory for spilled artifacts
}

export class EvidenceManager {
  /**
   * Create and store an evidence item with automatic inline vs spill storage.
   */
  createEvidence(params: CreateEvidenceParams): EvidenceRecord {
    const bytes = Buffer.byteLength(params.content, 'utf8')
    const contentHash = createHash('sha256').update(params.content).digest('hex')
    const id = createEvidenceId()
    const now = Date.now()

    if (bytes <= INLINE_EVIDENCE_MAX_BYTES) {
      return {
        id,
        projectId: params.projectId,
        changeId: params.changeId,
        source: params.source,
        truthLevel: params.truthLevel,
        locator: params.locator,
        contentHash,
        snippet: params.content,
        createdAt: now,
      }
    }

    // Large artifact spilling
    let fullArtifactPath: string | undefined
    if (params.artifactStorageDir) {
      mkdirSync(params.artifactStorageDir, { recursive: true })
      const fileName = `${id}_${contentHash.substring(0, 12)}.patch`
      fullArtifactPath = join(params.artifactStorageDir, fileName)
      writeFileSync(fullArtifactPath, params.content, 'utf8')
    }

    // Create snippet preview (first 2 KB + last 1 KB)
    const head = params.content.substring(0, 2048)
    const tail = params.content.substring(params.content.length - 1024)
    const snippet = `${head}\n\n... [${bytes - 3072} bytes omitted. Full artifact at: ${fullArtifactPath ?? 'spill'}] ...\n\n${tail}`

    return {
      id,
      projectId: params.projectId,
      changeId: params.changeId,
      source: params.source,
      truthLevel: params.truthLevel,
      locator: params.locator,
      contentHash,
      snippet,
      fullArtifactPath,
      createdAt: now,
    }
  }
}
