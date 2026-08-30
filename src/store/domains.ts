/**
 * Project Control 系统的三域存储（storage-domain）规范定义：
 * 1. project_control_core: 权威业务实体（项目、变更、计划、运行、步骤、尝试）
 * 2. project_control_analysis: 可重新派生的分析产物（快照、证据、图谱、影响分析）
 * 3. project_control_history: 历史记录与追溯归档（接入检查点、审查缺陷、验证记录、项目记忆、学习概念）
 *
 * @module dsh-project-control/store/domains
 */

import { z } from 'zod'

/** 存储域格式版本号 */
export const DOMAIN_FORMAT_VERSION = 1

export const UNIT_NAME_RE = /^[a-z0-9_-]+$/i

export function domainTable<K extends string = string, V = unknown>(schema: any) {
  return { valueSchema: schema }
}

export function defineDomain<S extends { name: string; version: number; layout?: string; tables: Record<string, any> }>(spec: S): S {
  if (!UNIT_NAME_RE.test(spec.name)) {
    throw new Error(`domain name '${spec.name}' must match ${UNIT_NAME_RE}`)
  }
  if (!Number.isInteger(spec.version) || spec.version < 0) {
    throw new Error(`domain '${spec.name}' version must be a non-negative integer, got ${spec.version}`)
  }
  return spec
}

/** 冒烟测试基础数据项 Schema */
export const DummyItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  updatedAt: z.number(),
  payload: z.record(z.string(), z.unknown()).optional(),
})
export type DummyItem = z.infer<typeof DummyItemSchema>

/**
 * 1. 核心域（Core Domain）：权威持久化数据表
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
 * 2. 分析域（Analysis Domain）：派生产物数据表（支持 per-record 单独分片）
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
 * 3. 历史域（History Domain）：历史记录与归档数据表
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
    concepts: domainTable(z.any()),
    items: domainTable(DummyItemSchema),
  },
})
