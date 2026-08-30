/**
 * Project Control 系统的三域存储（storage-domain）规范定义：
 * 1. project_control_core: 权威业务实体（项目、变更、计划、运行、步骤、尝试）
 * 2. project_control_analysis: 可重新派生的分析产物（快照、证据、图谱、影响分析）
 * 3. project_control_history: 历史记录与追溯归档（引导检查点、审查缺陷、验证记录、项目记忆、学习概念）
 *
 * 表 schema 使用 @deepseek-ai/schemastery（harness 原生 schema 库，运行时只需
 * 提供 .parse；storage-domain 逐记录校验失败即 `invalid-record`）。
 *
 * @module dsh-project-control/store/domains
 */

import { z } from 'zod'

/** 存储域格式版本号 */
export const DOMAIN_FORMAT_VERSION = 1

/** 宽松记录 schema：仓储层字段校验由领域服务负责，这里只要求可解析。z.any() 的 .parse 恒等返回。 */
const recordSchema = z.any()

export function domainTable<K extends string = string, V = unknown>(schema: any) {
  return { valueSchema: schema }
}

export function defineDomain<S extends { name: string; version: number; layout?: string; tables: Record<string, any> }>(spec: S): S {
  if (!/^[a-z][a-z0-9_-]*$/i.test(spec.name)) {
    throw new Error(`domain name '${spec.name}' is not a valid unit name`)
  }
  if (!Number.isInteger(spec.version) || spec.version < 0) {
    throw new Error(`domain '${spec.name}' version must be a non-negative integer, got ${spec.version}`)
  }
  return spec
}

/**
 * 1. 核心域（Core Domain）：权威持久化数据表
 */
export const coreDomainSpec = defineDomain({
  name: 'project_control_core',
  version: DOMAIN_FORMAT_VERSION,
  layout: 'single',
  tables: {
    projects: domainTable(recordSchema),
    changes: domainTable(recordSchema),
    plans: domainTable(recordSchema),
    runs: domainTable(recordSchema),
    steps: domainTable(recordSchema),
    attempts: domainTable(recordSchema),
    confirmed: domainTable(recordSchema),
  },
})

/**
 * 2. 分析域（Analysis Domain）：派生产物数据表（per-record 单独分片）
 */
export const analysisDomainSpec = defineDomain({
  name: 'project_control_analysis',
  version: DOMAIN_FORMAT_VERSION,
  layout: 'per-record',
  tables: {
    snapshots: domainTable(recordSchema),
    evidence: domainTable(recordSchema),
    graphs: domainTable(recordSchema),
    impacts: domainTable(recordSchema),
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
    checkpoints: domainTable(recordSchema),
    imported_changes: domainTable(recordSchema),
    history_cursor: domainTable(recordSchema),
    issues: domainTable(recordSchema),
    verifications: domainTable(recordSchema),
    memories: domainTable(recordSchema),
    concepts: domainTable(recordSchema),
  },
})
