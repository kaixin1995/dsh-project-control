/**
 * 类型安全的 DomainRepository 仓储层实现。
 * 封装底层的 @deepseek-ai/dsh-storage-domain 数据表操作，提供统一的 CRUD 与项目隔离过滤接口。
 *
 * @module dsh-project-control/store/repository
 */

import type { KvTable } from '@deepseek-ai/dsh-storage-domain'
import { createHash } from 'node:crypto'
import type {
  ProjectId,
  ChangeId,
  PlanId,
  RunId,
  StepId,
  AttemptId,
  EvidenceId,
  IssueId,
  VerificationId,
  MemoryId,
} from '../domain/ids.ts'
import type {
  ProjectRecord,
  ChangeRecord,
  PlanRecord,
  RunRecord,
  StepRecord,
  AttemptRecord,
  EvidenceRecord,
  ReviewIssueRecord,
  VerificationRecord,
  MemoryRecord,
  RunContextRecord,
  MemoryBaselineRecord,
  ScheduledTaskRecord,
  ImportedChangeRecord,
} from '../domain/models.ts'

export interface EntityWithProject {
  projectId: ProjectId
}

/**
 * 存储键安全化：storage-json 后端要求 key 满足 /^[A-Za-z0-9_-]+$/（键会成为
 * 磁盘文件路径段），不安全键在写入时断言抛异常——而 `void save()` 的未处理
 * 拒绝会 fatal 掉整个 dsh 进程（2026-09-10 业主另一台机器 + 本机潜伏事故：
 * LLM 缓存键含 `:` `/` `|`，记忆基线键含 `|`）。
 * 业务天然键统一经此摘要为 64 位十六进制物理键；原始键随记录体保存（rawKey
 * 字段）便于排查。所有新增存储键必须先过本函数——收尾守卫：全库 grep
 * `.save({ id:` 确认无裸模板键。
 */
export function safeStorageId(rawKey: string): string {
  return createHash('sha256').update(rawKey).digest('hex')
}

export class DomainRepository<T extends { id: string }, ID extends string = string> {
  constructor(private readonly table: KvTable<string, T>) {}

  /** 按 ID 获取实体 */
  get(id: ID): T | undefined {
    return this.table.get(id)
  }

  /** 保存或更新实体 */
  async save(record: T): Promise<void> {
    await this.table.put(record.id, record)
  }

  /** 按 ID 删除实体 */
  async delete(id: ID): Promise<boolean> {
    return this.table.delete(id)
  }

  /** 按条件过滤查询实体列表 */
  list(filter?: (item: T) => boolean): T[] {
    const items: T[] = []
    for (const [, value] of this.table.entries()) {
      if (!filter || filter(value)) {
        items.push(value)
      }
    }
    return items
  }

  /** 按项目 ID 快速筛选归属实体 */
  listByProject(projectId: ProjectId): T[] {
    return this.list(item => (item as unknown as EntityWithProject).projectId === projectId)
  }

  /** 获取当前表中记录总数 */
  get size(): number {
    return this.table.size
  }
}

/**
 * Project Control 系统的完整存储仓储聚合接口
 */
export interface MemoryStoreOptions {
  // optional configuration
}

export function createMemoryKvTable<T extends { id: string }>(): KvTable<string, T> {
  const map = new Map<string, T>()
  return {
    get(key: string): T | undefined {
      return map.get(key)
    },
    entries(): IterableIterator<[string, T]> {
      return map.entries()
    },
    keys(): IterableIterator<string> {
      return map.keys()
    },
    get size(): number {
      return map.size
    },
    async put(key: string, value: T): Promise<void> {
      map.set(key, value)
    },
    async delete(key: string): Promise<boolean> {
      return map.delete(key)
    },
    async update(key: string, fn: (current: T) => T): Promise<T> {
      const current = map.get(key)
      if (current === undefined) throw new Error(`missing-key: ${key}`)
      const next = fn(current)
      map.set(key, next)
      return next
    },
  }
}

export function createInMemoryStore(): ProjectControlStore {
  return {
    projects: new DomainRepository<ProjectRecord, ProjectId>(createMemoryKvTable<ProjectRecord>()),
    changes: new DomainRepository<ChangeRecord, ChangeId>(createMemoryKvTable<ChangeRecord>()),
    plans: new DomainRepository<PlanRecord, PlanId>(createMemoryKvTable<PlanRecord>()),
    runs: new DomainRepository<RunRecord, RunId>(createMemoryKvTable<RunRecord>()),
    steps: new DomainRepository<StepRecord, StepId>(createMemoryKvTable<StepRecord>()),
    attempts: new DomainRepository<AttemptRecord, AttemptId>(createMemoryKvTable<AttemptRecord>()),
    checkpoints: new DomainRepository<ProjectBootstrapCheckpoint, string>(createMemoryKvTable<ProjectBootstrapCheckpoint>()),
    importedChanges: new DomainRepository<ImportedChangeRecord, string>(createMemoryKvTable<ImportedChangeRecord>()),
    historyCursor: new DomainRepository<Record<string, unknown>, string>(createMemoryKvTable<Record<string, unknown>>()),
    confirmed: new DomainRepository<Record<string, unknown>, string>(createMemoryKvTable<Record<string, unknown>>()),
    snapshots: new DomainRepository<Record<string, unknown>, string>(createMemoryKvTable<Record<string, unknown>>()),
    evidence: new DomainRepository<EvidenceRecord, EvidenceId>(createMemoryKvTable<EvidenceRecord>()),
    issues: new DomainRepository<ReviewIssueRecord, IssueId>(createMemoryKvTable<ReviewIssueRecord>()),
    verifications: new DomainRepository<VerificationRecord, VerificationId>(createMemoryKvTable<VerificationRecord>()),
    memories: new DomainRepository<MemoryRecord, MemoryId>(createMemoryKvTable<MemoryRecord>()),
    concepts: new DomainRepository<any, any>(createMemoryKvTable<any>()),
    notes: new DomainRepository<ProjectNoteRecord, string>(createMemoryKvTable<ProjectNoteRecord>()),
    pluginSettings: new DomainRepository<Record<string, unknown>, string>(createMemoryKvTable<Record<string, unknown>>()),
    runContexts: new DomainRepository<RunContextRecord, string>(createMemoryKvTable<RunContextRecord>()),
    scheduledTasks: new DomainRepository<ScheduledTaskRecord, string>(createMemoryKvTable<ScheduledTaskRecord>()),
    memoryBaselines: new DomainRepository<MemoryBaselineRecord, string>(createMemoryKvTable<MemoryBaselineRecord>()),
  }
}

/** 用户/代理批注的一条笔记（可关联某次提交或工作区改动）。 */
export interface ProjectNoteRecord {
  id: string
  projectId: string
  /** 关联的提交 SHA；'working' 表示未提交改动；undefined 表示纯项目级笔记。 */
  sha?: string
  title: string
  content: string
  /** 标签（用户自定义分类，点击可筛选）。 */
  tags?: string[]
  /** 置顶：笔记列表排在最前。 */
  pinned?: boolean
  createdAt: number
  /** 最后编辑时间；创建时与 createdAt 相同。 */
  updatedAt?: number
}

/** Project Control 系统的完整存储仓储聚合接口。 */
export interface ProjectControlStore {
  projects: DomainRepository<ProjectRecord, ProjectId>
  changes: DomainRepository<ChangeRecord, ChangeId>
  plans: DomainRepository<PlanRecord, PlanId>
  runs: DomainRepository<RunRecord, RunId>
  steps: DomainRepository<StepRecord, StepId>
  attempts: DomainRepository<AttemptRecord, AttemptId>
  checkpoints: DomainRepository<ProjectBootstrapCheckpoint, string>
  importedChanges: DomainRepository<ImportedChangeRecord, string>
  historyCursor: DomainRepository<Record<string, unknown>, string>
  confirmed: DomainRepository<Record<string, unknown>, string>
  snapshots: DomainRepository<Record<string, unknown>, string>
  evidence: DomainRepository<EvidenceRecord, EvidenceId>
  issues: DomainRepository<ReviewIssueRecord, IssueId>
  verifications: DomainRepository<VerificationRecord, VerificationId>
  memories: DomainRepository<MemoryRecord, MemoryId>
  concepts: DomainRepository<any, any>
  notes: DomainRepository<ProjectNoteRecord, string>
  pluginSettings: DomainRepository<Record<string, unknown>, string>
  /** 任务工作记忆（RunContext），id 即 runId。 */
  runContexts: DomainRepository<RunContextRecord, string>
  /** 例行任务（定时触发模板）。 */
  scheduledTasks: DomainRepository<ScheduledTaskRecord, string>
  /** 记忆拉取同步基线（每项目每分支一条）。 */
  memoryBaselines: DomainRepository<MemoryBaselineRecord, string>
}
