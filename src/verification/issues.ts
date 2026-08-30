/**
 * 审查问题追踪与阻塞评估管理器（Review Issue Manager）。
 * 跟踪 blocker、critical、major、minor、cosmetic 5 级缺陷；blocker 与 critical 将被判定为阻塞性问题，阻止合并。
 *
 * @module dsh-project-control/verification/issues
 */

import { createIssueId, type IssueId, type ProjectId, type ChangeId, type EvidenceId } from '../domain/ids.ts'
import type { ReviewIssueRecord, IssueSeverity, IssueStatus } from '../domain/models.ts'
import type { DomainRepository } from '../store/repository.ts'

export interface CreateIssueParams {
  projectId: ProjectId
  changeId: ChangeId
  severity: IssueSeverity
  title: string
  description: string
  evidenceIds?: EvidenceId[]
  suggestedFix?: string
}

export class ReviewIssueManager {
  constructor(private readonly issuesRepo: DomainRepository<ReviewIssueRecord, IssueId>) {}

  /**
   * 登记新的审查问题记录。
   */
  async createIssue(params: CreateIssueParams): Promise<ReviewIssueRecord> {
    const now = Date.now()
    const issue: ReviewIssueRecord = {
      id: createIssueId(),
      projectId: params.projectId,
      changeId: params.changeId,
      severity: params.severity,
      status: 'open',
      title: params.title,
      description: params.description,
      evidenceIds: params.evidenceIds ?? [],
      suggestedFix: params.suggestedFix,
      createdAt: now,
      updatedAt: now,
    }

    await this.issuesRepo.save(issue)
    return issue
  }

  /**
   * 更新审查问题的处理状态。
   */
  async updateStatus(issueId: IssueId, status: IssueStatus): Promise<ReviewIssueRecord> {
    const issue = this.issuesRepo.get(issueId)
    if (!issue) throw new Error(`Review issue not found: ${issueId}`)

    issue.status = status
    issue.updatedAt = Date.now()
    await this.issuesRepo.save(issue)
    return issue
  }

  /**
   * 检查指定变更是否存在处于 open/fixing 状态的阻塞性缺陷（blocker / critical）。
   */
  hasBlockingIssues(changeId: ChangeId): boolean {
    const issues = this.issuesRepo.list(
      i => i.changeId === changeId && (i.severity === 'blocker' || i.severity === 'critical'),
    )
    return issues.some(i => i.status === 'open' || i.status === 'fixing')
  }

  /**
   * 列出指定变更的所有缺陷记录。
   */
  listByChange(changeId: ChangeId): ReviewIssueRecord[] {
    return this.issuesRepo.list(i => i.changeId === changeId)
  }
}
