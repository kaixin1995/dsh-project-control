/**
 * Memory Context Injector: 按分支作用域筛选相关记忆并组装注入上下文。
 * 消费隔离：只注入主干（scope=project）记忆 + 当前分支的 branch 记忆，
 * 防止其他分支的实验方案污染本次执行判断。
 * @module dsh-project-control/memory/context
 */

import type { ProjectId } from '../domain/ids.ts'
import type { MemoryRecord } from '../domain/models.ts'
import type { MemoryService } from './service.ts'

export class MemoryContextInjector {
  constructor(private readonly memoryService: MemoryService) {}

  /**
   * 分支作用域过滤后的相关记忆清单（编排器同时用于注入与 RunContext 审计快照）。
   * @param branch 当前执行分支；branch 记忆仅在该分支匹配时可见。
   */
  relevantMemories(projectId: ProjectId, activeFiles: string[] = [], branch?: string): MemoryRecord[] {
    const allMemories = this.memoryService.queryMemories(projectId)
    return allMemories.filter((memory) => {
      if (memory.status !== undefined && memory.status !== 'active') return false
      // 分支作用域：branch 记忆只在同名分支可见；主干记忆全分支可见。
      if (memory.scope === 'branch') {
        if (branch === undefined || memory.gitBranch !== branch) return false
      }
      if (memory.type === 'architecture_decision' || memory.type === 'risk_hotspot') return true
      if (activeFiles.some((file) => memory.relatedFiles?.includes(file))) return true
      return false
    })
  }

  /**
   * Synthesize relevant memory prompt for the given project and active files.
   */
  synthesizeContext(projectId: ProjectId, activeFiles: string[] = [], branch?: string): string {
    const relevant = this.relevantMemories(projectId, activeFiles, branch)
    if (relevant.length === 0) return ''

    const lines = ['<project_memory_context>']
    for (const m of relevant) {
      lines.push(`- [${m.type}] ${m.title}: ${m.content}`)
    }
    lines.push('</project_memory_context>')

    return lines.join('\n')
  }
}
