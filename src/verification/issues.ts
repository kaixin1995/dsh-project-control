/**
 * Review Issue tracking and blocker evaluation.
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
   * Create and record a new review issue.
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
   * Update issue status.
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
   * Check if change has unresolved blocking issues (blocker or critical in open/fixing state).
   */
  hasBlockingIssues(changeId: ChangeId): boolean {
    const issues = this.issuesRepo.list(
      i => i.changeId === changeId && (i.severity === 'blocker' || i.severity === 'critical'),
    )
    return issues.some(i => i.status === 'open' || i.status === 'fixing')
  }

  /**
   * List all issues for a change.
   */
  listByChange(changeId: ChangeId): ReviewIssueRecord[] {
    return this.issuesRepo.list(i => i.changeId === changeId)
  }
}
