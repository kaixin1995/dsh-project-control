/**
 * Concept model and ConceptService for continuous learning from changes and errors.
 * @module dsh-project-control/learning/concept
 */

import { createConceptId, type ConceptId, type ProjectId } from '../domain/ids.ts'
import type { DomainRepository } from '../store/repository.ts'

export interface ConceptExample {
  filePath?: string
  snippet?: string
  diffSummary?: string
}

export interface ConceptRecord {
  id: ConceptId
  projectId: ProjectId
  name: string
  category: 'fix_pattern' | 'architectural_pattern' | 'naming_convention' | 'anti_pattern'
  description: string
  confidence: number // 0.0 to 1.0
  occurrences: number
  examples: ConceptExample[]
  createdAt: number
  updatedAt: number
}

export interface CreateConceptParams {
  projectId: ProjectId
  name: string
  category: ConceptRecord['category']
  description: string
  initialConfidence?: number
  example?: ConceptExample
}

export class ConceptService {
  constructor(private readonly conceptsRepo: DomainRepository<ConceptRecord, ConceptId>) {}

  /**
   * Record or reinforce a concept. If a concept with the same name exists, increments occurrences and boosts confidence.
   */
  async learnConcept(params: CreateConceptParams): Promise<ConceptRecord> {
    const existing = this.conceptsRepo.list(
      c => c.projectId === params.projectId && c.name.toLowerCase() === params.name.toLowerCase(),
    )[0]

    const now = Date.now()

    if (existing) {
      existing.occurrences++
      existing.confidence = Math.min(1.0, existing.confidence + 0.15)
      if (params.example) {
        existing.examples.push(params.example)
      }
      existing.updatedAt = now
      await this.conceptsRepo.save(existing)
      return existing
    }

    const newConcept: ConceptRecord = {
      id: createConceptId(),
      projectId: params.projectId,
      name: params.name,
      category: params.category,
      description: params.description,
      confidence: params.initialConfidence ?? 0.5,
      occurrences: 1,
      examples: params.example ? [params.example] : [],
      createdAt: now,
      updatedAt: now,
    }

    await this.conceptsRepo.save(newConcept)
    return newConcept
  }

  /**
   * List concepts for a project with optional confidence threshold.
   */
  listConcepts(projectId: ProjectId, minConfidence = 0.0): ConceptRecord[] {
    return this.conceptsRepo.list(
      c => c.projectId === projectId && c.confidence >= minConfidence,
    )
  }
}
