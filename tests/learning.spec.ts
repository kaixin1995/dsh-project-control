import { describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import Storage from '@deepseek-ai/dsh-storage'
import { DomainFacility } from '@deepseek-ai/dsh-storage-domain'
import { MemoryMediaPool, MemoryStorageBackend } from '../../packages/storage/storage-domain/tests/helpers/memory-backend.ts'
import { historyDomainSpec } from '../src/store/domains.ts'
import { DomainRepository } from '../src/store/repository.ts'
import { ConceptService } from '../src/learning/concept.ts'
import { PatternLearner } from '../src/learning/patterns.ts'
import { createProjectId } from '../src/domain/ids.ts'
import type { ConceptRecord } from '../src/learning/concept.ts'

async function createConceptRepo() {
  const ctx = new Context()
  await ctx.plugin(Storage)
  const backend = new MemoryStorageBackend(new MemoryMediaPool())
  ctx.storage.backend.register('memory', backend)
  const facility = new DomainFacility(ctx, { backend: 'memory', routes: {} })
  ctx.storage.mount('domain', facility)

  const history = await facility.open(historyDomainSpec)
  const repo = new DomainRepository<ConceptRecord>(history.table('memories') as any)
  return { repo, close: () => history.close() }
}

describe('Continuous Learning & Pattern Extraction (T10.1 - T10.3)', () => {
  it('T10.1: learns and reinforces concepts with confidence growth', async () => {
    const { repo, close } = await createConceptRepo()
    const service = new ConceptService(repo)
    const projectId = createProjectId()

    // 1. Initial learning
    const c1 = await service.learnConcept({
      projectId,
      name: 'Async Error Boundary',
      category: 'architectural_pattern',
      description: 'Wrap async operations in try-catch with error conversion',
      initialConfidence: 0.5,
    })

    expect(c1.occurrences).toBe(1)
    expect(c1.confidence).toBe(0.5)

    // 2. Reinforcement
    const c2 = await service.learnConcept({
      projectId,
      name: 'Async Error Boundary',
      category: 'architectural_pattern',
      description: 'Wrap async operations in try-catch with error conversion',
    })

    expect(c2.occurrences).toBe(2)
    expect(c2.confidence).toBeCloseTo(0.65, 2)

    await close()
  })

  it('T10.2 & T10.3: extracts fix patterns from error resolutions', async () => {
    const { repo, close } = await createConceptRepo()
    const conceptService = new ConceptService(repo)
    const learner = new PatternLearner(conceptService)
    const projectId = createProjectId()

    const learned = await learner.learnFromResolution(projectId, {
      failedError: 'Cannot find module ./utils.ts',
      successfulResolution: 'Fixed relative import path to ../utils.ts',
      filePath: 'src/components/card.ts',
    })

    expect(learned.name).toBe('Module Import Resolution Pattern')
    expect(learned.category).toBe('fix_pattern')
    expect(learned.examples.length).toBe(1)
    expect(learned.examples[0]!.snippet).toBe('Fixed relative import path to ../utils.ts')

    const highConfidenceConcepts = conceptService.listConcepts(projectId, 0.5)
    expect(highConfidenceConcepts.length).toBe(1)

    await close()
  })
})
