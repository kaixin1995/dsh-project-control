/**
 * Three storage-domain definitions for Project Control:
 * 1. project-control-core (authoritative records)
 * 2. project-control-analysis (re-derivable analysis artifacts)
 * 3. project-control-history (historical checkpoints and reconstruction)
 *
 * @module dsh-project-control/store/domains
 */

import { z } from 'zod'
import { defineDomain, domainTable } from '@deepseek-ai/dsh-storage-domain'

export const DOMAIN_FORMAT_VERSION = 1

/** Schema for generic key-value item in domain smoke testing */
export const DummyItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  updatedAt: z.number(),
  payload: z.record(z.string(), z.unknown()).optional(),
})
export type DummyItem = z.infer<typeof DummyItemSchema>

/**
 * 1. Core Domain: Authoritative projects, changes, plans, runs, steps, attempts.
 */
export const coreDomainSpec = defineDomain({
  name: 'project_control_core',
  version: DOMAIN_FORMAT_VERSION,
  layout: 'single',
  tables: {
    projects: domainTable(z.any()),
    changes: domainTable(z.any()),
    plans: domainTable(z.any()),
    runs: domainTable(z.any()),
    steps: domainTable(z.any()),
    attempts: domainTable(z.any()),
    items: domainTable(DummyItemSchema),
  },
})

/**
 * 2. Analysis Domain: Git snapshots, diffs, evidence, impact graphs.
 */
export const analysisDomainSpec = defineDomain({
  name: 'project_control_analysis',
  version: DOMAIN_FORMAT_VERSION,
  layout: 'per-record',
  tables: {
    snapshots: domainTable(z.any()),
    evidence: domainTable(z.any()),
    graphs: domainTable(z.any()),
    impacts: domainTable(z.any()),
    items: domainTable(DummyItemSchema),
  },
})

/**
 * 3. History Domain: Historical checkpoints, review issues, verifications, memories.
 */
export const historyDomainSpec = defineDomain({
  name: 'project_control_history',
  version: DOMAIN_FORMAT_VERSION,
  layout: 'single',
  tables: {
    checkpoints: domainTable(z.any()),
    issues: domainTable(z.any()),
    verifications: domainTable(z.any()),
    memories: domainTable(z.any()),
    items: domainTable(DummyItemSchema),
  },
})
