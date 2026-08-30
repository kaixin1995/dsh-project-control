/**
 * Project Memory Service: records architecture decisions, patterns, risk hotspots, and learned concepts.
 * Implements truth-level protection and human confirmation promotion.
 *
 * @module dsh-project-control/memory/service
 */

import { createMemoryId, type MemoryId, type ProjectId, type EvidenceId } from '../domain/ids.ts'
import type { MemoryRecord, MemoryType } from '../domain/models.ts'
import type { TruthLevel } from '../domain/truth.ts'
import { canOverrideTruth } from '../domain/truth.ts'
import type { DomainRepository } from '../store/repository.ts'

export interface RecordMemoryParams {
  projectId: ProjectId
  type: MemoryType
  truthLevel: TruthLevel
  title: string
  content: string
  relatedFiles?: string[]
  evidenceIds?: EvidenceId[]
  isHumanConfirmed?: boolean
}

export class MemoryService {
  constructor(private readonly memoriesRepo: DomainRepository<MemoryRecord, MemoryId>) {}

  /**
   * Record a new memory entry with truth level validation.
   */
  async recordMemory(params: RecordMemoryParams): Promise<MemoryRecord> {
    const now = Date.now()
    const memory: MemoryRecord = {
      id: createMemoryId(),
      projectId: params.projectId,
      type: params.type,
      truthLevel: params.isHumanConfirmed ? 'fact' : params.truthLevel,
      title: params.title,
      content: params.content,
      relatedFiles: params.relatedFiles ?? [],
      evidenceIds: params.evidenceIds ?? [],
      isHumanConfirmed: params.isHumanConfirmed ?? false,
      createdAt: now,
      updatedAt: now,
    }

    await this.memoriesRepo.save(memory)
    return memory
  }

  /**
   * Confirm a memory entry by human, promoting its truthLevel to 'fact' and setting isHumanConfirmed = true.
   */
  async confirmMemory(id: MemoryId): Promise<MemoryRecord> {
    const memory = this.memoriesRepo.get(id)
    if (!memory) throw new Error(`Memory not found: ${id}`)

    memory.isHumanConfirmed = true
    memory.truthLevel = 'fact'
    memory.updatedAt = Date.now()
    await this.memoriesRepo.save(memory)
    return memory
  }

  /**
   * Update existing memory ensuring no truth level downgrade.
   */
  async updateMemory(
    id: MemoryId,
    updates: Partial<Pick<MemoryRecord, 'title' | 'content' | 'relatedFiles' | 'truthLevel'>>,
  ): Promise<MemoryRecord> {
    const memory = this.memoriesRepo.get(id)
    if (!memory) throw new Error(`Memory not found: ${id}`)

    if (updates.truthLevel && !canOverrideTruth(memory.truthLevel, updates.truthLevel)) {
      throw new Error(
        `Cannot downgrade truth level from "${memory.truthLevel}" to "${updates.truthLevel}"`,
      )
    }

    if (updates.title) memory.title = updates.title
    if (updates.content) memory.content = updates.content
    if (updates.relatedFiles) memory.relatedFiles = updates.relatedFiles
    if (updates.truthLevel) memory.truthLevel = updates.truthLevel
    memory.updatedAt = Date.now()

    await this.memoriesRepo.save(memory)
    return memory
  }

  /**
   * Query memories by project and optional filters.
   */
  queryMemories(
    projectId: ProjectId,
    options: {
      type?: MemoryType
      filePath?: string
      humanConfirmedOnly?: boolean
    } = {},
  ): MemoryRecord[] {
    return this.memoriesRepo.list(m => {
      if (m.projectId !== projectId) return false
      if (options.type && m.type !== options.type) return false
      if (options.humanConfirmedOnly && !m.isHumanConfirmed) return false
      if (options.filePath && (!m.relatedFiles || !m.relatedFiles.includes(options.filePath))) {
        return false
      }
      return true
    })
  }

  /**
   * Export all confirmed project memories to Markdown format for documentation or context injection.
   */
  exportToMarkdown(projectId: ProjectId): string {
    const memories = this.queryMemories(projectId)
    if (memories.length === 0) return '# Project Memory\n\nNo recorded memories yet.'

    const lines: string[] = ['# Project Memory\n']

    const grouped: Record<MemoryType, MemoryRecord[]> = {
      architecture_decision: [],
      pattern_rule: [],
      risk_hotspot: [],
      learned_concept: [],
    }

    for (const m of memories) {
      grouped[m.type].push(m)
    }

    for (const [type, items] of Object.entries(grouped)) {
      if (items.length === 0) continue
      lines.push(`## ${type.replace(/_/g, ' ').toUpperCase()}`)
      for (const item of items) {
        const badge = item.isHumanConfirmed ? '✅ [Human Confirmed]' : `ℹ️ [Truth: ${item.truthLevel}]`
        lines.push(`### ${item.title} ${badge}`)
        lines.push(item.content)
        if (item.relatedFiles && item.relatedFiles.length > 0) {
          lines.push(`*Related files*: ${item.relatedFiles.map(f => `\`${f}\``).join(', ')}`)
        }
        lines.push('')
      }
    }

    return lines.join('\n')
  }
}
