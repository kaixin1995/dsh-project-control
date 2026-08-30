/**
 * Pattern Learner: analyzes failed and recovered attempts to deduce reusable fix patterns.
 * @module dsh-project-control/learning/patterns
 */

import type { ProjectId } from '../domain/ids.ts'
import type { ConceptService, ConceptRecord } from './concept.ts'

export interface AttemptResolution {
  failedError: string
  successfulResolution: string
  filePath?: string
}

export class PatternLearner {
  constructor(private readonly conceptService: ConceptService) {}

  /**
   * Extract and learn pattern from an attempt resolution.
   */
  async learnFromResolution(projectId: ProjectId, resolution: AttemptResolution): Promise<ConceptRecord> {
    let patternName = 'General Bug Fix Pattern'
    let category: ConceptRecord['category'] = 'fix_pattern'

    if (/import|module not found|cannot find module/i.test(resolution.failedError)) {
      patternName = 'Module Import Resolution Pattern'
    } else if (/type|not assignable|mismatch/i.test(resolution.failedError)) {
      patternName = 'Type Narrowing & Alignment Pattern'
    } else if (/null|undefined|property of undefined/i.test(resolution.failedError)) {
      patternName = 'Null Safety & Guard Pattern'
    } else if (/timeout|aborted/i.test(resolution.failedError)) {
      patternName = 'Async Concurrency & Timeout Pattern'
    }

    const description = `When encountering error "${resolution.failedError.substring(0, 100)}", resolved by: ${resolution.successfulResolution}`

    return this.conceptService.learnConcept({
      projectId,
      name: patternName,
      category,
      description,
      initialConfidence: 0.6,
      example: {
        filePath: resolution.filePath,
        snippet: resolution.successfulResolution,
      },
    })
  }
}
