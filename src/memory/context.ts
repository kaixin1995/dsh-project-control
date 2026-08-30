/**
 * Memory Context Injector: synthesizes relevant project memory into agent instructions.
 * @module dsh-project-control/memory/context
 */

import type { ProjectId } from '../domain/ids.ts'
import type { MemoryService } from './service.ts'

export class MemoryContextInjector {
  constructor(private readonly memoryService: MemoryService) {}

  /**
   * Synthesize relevant memory prompt for the given project and active files.
   */
  synthesizeContext(projectId: ProjectId, activeFiles: string[] = []): string {
    const allMemories = this.memoryService.queryMemories(projectId)
    if (allMemories.length === 0) return ''

    // Filter relevant memories: either globally confirmed decisions or related to active files
    const relevant = allMemories.filter(m => {
      if (m.type === 'architecture_decision' || m.type === 'risk_hotspot') return true
      if (activeFiles.some(f => m.relatedFiles?.includes(f))) return true
      return false
    })

    if (relevant.length === 0) return ''

    const lines = ['<project_memory_context>']
    for (const m of relevant) {
      lines.push(`- [${m.type}] ${m.title}: ${m.content}`)
    }
    lines.push('</project_memory_context>')

    return lines.join('\n')
  }
}
