/**
 * 类型安全的 DomainRepository 仓储层实现。
 * 封装底层的 @deepseek-ai/dsh-storage-domain 数据表操作，提供统一的 CRUD 与项目隔离过滤接口。
 *
 * @module dsh-project-control/store/repository
 */

import type { KvTable } from '@deepseek-ai/dsh-storage-domain'
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
} from '../domain/models.ts'

export interface EntityWithProject {
  projectId: ProjectId
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
export interface ProjectControlStore {
  projects: DomainRepository<ProjectRecord, ProjectId>
  changes: DomainRepository<ChangeRecord, ChangeId>
  plans: DomainRepository<PlanRecord, PlanId>
  runs: DomainRepository<RunRecord, RunId>
  steps: DomainRepository<StepRecord, StepId>
  attempts: DomainRepository<AttemptRecord, AttemptId>
  /** 引导检查点仓储（history 域） */
  checkpoints: DomainRepository<ProjectBootstrapCheckpoint, string>
  evidence: DomainRepository<EvidenceRecord, EvidenceId>
  issues: DomainRepository<ReviewIssueRecord, IssueId>
  verifications: DomainRepository<VerificationRecord, VerificationId>
  memories: DomainRepository<MemoryRecord, MemoryId>
  concepts?: DomainRepository<any, any>
}
