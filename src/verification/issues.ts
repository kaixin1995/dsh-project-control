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
  /** 问题分类（评审输出中的自由文本分类，如 并发/错误处理）。 */
  category?: string
  title: string
  description: string
  evidenceIds?: EvidenceId[]
  suggestedFix?: string
}

/** 复检/复验备注行的形状（`[复检 …] 仍未修复：…` / `[复验 …] 属实待修复：…`）。 */
const NOTE_LINE = /\n\[(复检|复验)[^\]\n]*\] [^\n]*/g

/**
 * 追加一条复检/复验备注并只保留最近 limit 条（含新追加的这条）：
 * 反复复检同一问题不会让 description 无限膨胀；原始证据文案永不动。
 */
export function appendCappedNote(description: string, line: string, limit = 5): string {
  const notes = description.match(NOTE_LINE) ?? []
  const base = notes.length > 0
    ? description.slice(0, description.length - notes.join('').length)
    : description
  const kept = notes.slice(-(limit - 1))
  return `${base}${kept.join('')}\n${line}`
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
      category: params.category,
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

  /**
   * 应用聊天复验结论（转聊天复验闭环的回写端）：
   * - false_positive / duplicate / obsolete → rejected（关闭），resolution 记录结论与依据；
   * - fixed → resolved（解决），记录修复说明与涉及文件；
   * - already_fixed → resolved（解决），此前提交已修复，记录历史修复依据；
   * - confirmed → 保持 open，复验备注追加到 description（属实但尚未修复）。
   * @returns 更新后的记录。
   */
  async applyChatVerdict(
    issueId: IssueId,
    verdict: 'confirmed' | 'fixed' | 'already_fixed' | 'false_positive' | 'duplicate' | 'obsolete',
    note: string,
    fixFiles?: string[],
  ): Promise<ReviewIssueRecord> {
    const issue = this.issuesRepo.get(issueId)
    if (!issue) throw new Error(`Review issue not found: ${issueId}`)
    const stamp = new Date().toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    const safeNote = note.slice(0, 300)
    if (verdict === 'false_positive' || verdict === 'duplicate' || verdict === 'obsolete') {
      const label = verdict === 'false_positive' ? '误报' : verdict === 'duplicate' ? '重复' : '功能已移除/需求已变更'
      issue.status = 'rejected'
      issue.resolution = `${label}（聊天复验 ${stamp}）：${safeNote}`
    } else if (verdict === 'fixed') {
      issue.status = 'resolved'
      issue.resolution = `聊天复验修复（${stamp}）：${safeNote}`
      if (fixFiles !== undefined && fixFiles.length > 0) issue.fixFiles = fixFiles
    } else if (verdict === 'already_fixed') {
      issue.status = 'resolved'
      issue.resolution = `此前已修复（聊天复验 ${stamp}）：${safeNote}`
      if (fixFiles !== undefined && fixFiles.length > 0) issue.fixFiles = fixFiles
    } else {
      issue.status = 'open'
      issue.description = appendCappedNote(issue.description, `[复验 ${stamp}] 属实待修复：${safeNote}`)
    }
    issue.updatedAt = Date.now()
    await this.issuesRepo.save(issue)
    return issue
  }
}
