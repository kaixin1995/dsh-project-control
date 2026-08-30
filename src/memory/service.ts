/**
 * 项目记忆服务（Project Memory Service）：
 * 记录架构决策、模式规则、风险热点、学习概念、用户偏好与项目日志。
 * 融合 Git 分支感知过滤、5 级真值防降级保护与人类确认晋升机制。
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
  gitBranch?: string
  tags?: string[]
}

export class MemoryService {
  constructor(private readonly memoriesRepo: DomainRepository<MemoryRecord, MemoryId>) {}

  /**
   * 记录新的记忆条目，支持分支绑定与真值等级校验。
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
      gitBranch: params.gitBranch,
      tags: params.tags ?? [],
      createdAt: now,
      updatedAt: now,
    }

    await this.memoriesRepo.save(memory)
    return memory
  }

  /**
   * 人工确认记忆条目，将其晋升为绝对真值 (truthLevel = 'fact') 并标记 isHumanConfirmed = true。
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
   * 更新记忆内容，严格执行 5 级真值防降级检查。
   */
  async updateMemory(
    id: MemoryId,
    updates: Partial<Pick<MemoryRecord, 'title' | 'content' | 'relatedFiles' | 'truthLevel' | 'gitBranch' | 'tags'>>,
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
    if (updates.gitBranch !== undefined) memory.gitBranch = updates.gitBranch
    if (updates.tags) memory.tags = updates.tags
    memory.updatedAt = Date.now()

    await this.memoriesRepo.save(memory)
    return memory
  }

  /**
   * 查询项目记忆，支持按类型、文件路径、人工确认状态以及 Git 分支进行多维过滤。
   */
  queryMemories(
    projectId: ProjectId,
    options: {
      type?: MemoryType
      filePath?: string
      humanConfirmedOnly?: boolean
      gitBranch?: string
      tag?: string
    } = {},
  ): MemoryRecord[] {
    return this.memoriesRepo.list(m => {
      if (m.projectId !== projectId) return false
      if (options.type && m.type !== options.type) return false
      if (options.humanConfirmedOnly && !m.isHumanConfirmed) return false
      if (options.filePath && (!m.relatedFiles || !m.relatedFiles.includes(options.filePath))) {
        return false
      }
      // Git 分支感知过滤：如果指定了分支，匹配该分支的专属记忆以及未限制分支的通用记忆
      if (options.gitBranch && m.gitBranch && m.gitBranch !== options.gitBranch) {
        return false
      }
      if (options.tag && (!m.tags || !m.tags.includes(options.tag))) {
        return false
      }
      return true
    })
  }

  /**
   * 导出项目记忆为 Markdown 格式，便于系统提示词或文档呈现。
   */
  exportToMarkdown(projectId: ProjectId, gitBranch?: string): string {
    const memories = this.queryMemories(projectId, { gitBranch })
    if (memories.length === 0) return '# Project Memory\n\nNo recorded memories yet.'

    const lines: string[] = ['# Project Memory\n']

    const grouped: Record<MemoryType, MemoryRecord[]> = {
      architecture_decision: [],
      pattern_rule: [],
      risk_hotspot: [],
      learned_concept: [],
      user_profile: [],
      project_log: [],
      daily_log: [],
    }

    for (const m of memories) {
      if (grouped[m.type]) {
        grouped[m.type].push(m)
      }
    }

    for (const [type, items] of Object.entries(grouped)) {
      if (items.length === 0) continue
      lines.push(`## ${type.replace(/_/g, ' ').toUpperCase()}`)
      for (const item of items) {
        const badge = item.isHumanConfirmed ? '✅ [Human Confirmed]' : `ℹ️ [Truth: ${item.truthLevel}]`
        const branchBadge = item.gitBranch ? ` [Branch: ${item.gitBranch}]` : ''
        lines.push(`### ${item.title} ${badge}${branchBadge}`)
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
