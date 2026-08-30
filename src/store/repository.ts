/**
 * Typed generic Repository implementations over storage-domain tables.
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

  get(id: ID): T | undefined {
    return this.table.get(id)
  }

  async save(record: T): Promise<void> {
    await this.table.put(record.id, record)
  }

  async delete(id: ID): Promise<boolean> {
    return this.table.delete(id)
  }

  list(filter?: (item: T) => boolean): T[] {
    const items: T[] = []
    for (const [, value] of this.table.entries()) {
      if (!filter || filter(value)) {
        items.push(value)
      }
    }
    return items
  }

  listByProject(projectId: ProjectId): T[] {
    return this.list(item => (item as unknown as EntityWithProject).projectId === projectId)
  }

  get size(): number {
    return this.table.size
  }
}

export interface ProjectControlStore {
  projects: DomainRepository<ProjectRecord, ProjectId>
  changes: DomainRepository<ChangeRecord, ChangeId>
  plans: DomainRepository<PlanRecord, PlanId>
  runs: DomainRepository<RunRecord, RunId>
  steps: DomainRepository<StepRecord, StepId>
  attempts: DomainRepository<AttemptRecord, AttemptId>
  evidence: DomainRepository<EvidenceRecord, EvidenceId>
  issues: DomainRepository<ReviewIssueRecord, IssueId>
  verifications: DomainRepository<VerificationRecord, VerificationId>
  memories: DomainRepository<MemoryRecord, MemoryId>
  concepts?: DomainRepository<any, any>
}
