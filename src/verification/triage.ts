/**
 * Review 问题整体分诊引擎（业主 2026-11-04 拍板：LLM 批量判定）。
 *
 * 背景：问题从 60+ 轮历史提交评审提取（可达 160+ 条），存在三类噪声——跨提交
 * 重复报、功能已删/需求已变更的过时项、证据本身不成立的误报。逐条派子代理
 * 修复前先整体扫描一遍，把真问题留下来。
 *
 * 语义（业主已确认）：
 * - 判定枚举 duplicate / obsolete / false_positive / keep；前三者即时回写关闭
 *   （复用 applyChatVerdict，resolution 带「LLM 整体分诊」依据，可人工重开），
 *   keep 保持 open 留给修复阶段（代码现状核验是子代理三道闸的职责，本轮只做
 *   清单级分诊）。
 * - 宁漏关不误关：拿不准一律 keep；解析失败整批按 keep 处理。
 * - 每批附全量指纹附录（每条一行 id+标题），跨批重复也能发现。
 *
 * @module dsh-project-control/verification/triage
 */

import { ReviewIssueManager } from './issues.ts'
import type { DomainRepository } from '../store/repository.ts'
import type { ReviewIssueRecord } from '../domain/models.ts'

/** 每批送审条数（40 条 × 160+ 全量 ≈ 4-6 批）。 */
export const TRIAGE_BATCH_SIZE = 40

export type TriageVerdict = 'duplicate' | 'obsolete' | 'false_positive' | 'keep'

/** 送审问题的紧凑视图（引擎不直接依赖存储记录形状）。 */
export interface TriageIssue {
  id: string
  severity: string
  category: string
  title: string
  description: string
  /** 发现时的对象（review:<sha> 或工作区），仅供指纹与依据参考。 */
  changeId: string
}

/** LLM 对单条的判定。 */
export interface TriageDecision {
  id: string
  verdict: TriageVerdict
  basis: string
  /** duplicate 时指明重复于哪条（id 或标题）。 */
  duplicateOf?: string
}

/** 一批分诊的结果。 */
export interface TriageBatchResult {
  decisions: TriageDecision[]
  closed: { duplicate: number; obsolete: number; false_positive: number }
  kept: number
  /** LLM 输出解析失败（整批按 keep 保留）。 */
  parseFailed: boolean
}

/** 从存储记录构造紧凑视图。 */
export function toTriageIssue(issue: ReviewIssueRecord): TriageIssue {
  // 复检/复验备注行（\n[复检 …]）对分诊是噪声，剥掉。
  const description = (issue.description ?? '').replace(/\n\[复[检验][^\]]*\][^\n]*/g, '').slice(0, 400)
  return { id: issue.id, severity: issue.severity, category: issue.category ?? '', title: issue.title, description, changeId: issue.changeId }
}

/** 全量指纹附录：每条一行，供跨批判重与过时判定参考。 */
function fingerprintBlock(all: TriageIssue[]): string[] {
  return all.map((issue) => `[${issue.id}] [${issue.severity}] ${issue.title} ← ${issue.changeId.startsWith('review:') ? `提交 ${issue.changeId.slice(7, 15)}` : issue.changeId}`)
}

/** 构建分诊提示词（中文；输出严格 JSON）。 */
export function buildTriagePrompt(batch: TriageIssue[], all: TriageIssue[]): string {
  return [
    '你是问题清单分诊员。下面的问题全集提取自同一项目 60+ 轮历史提交的代码评审，噪声很多，你的任务是把真正需要处理的问题留下来。',
    '逐条判定，四选一：',
    '- duplicate：与清单内（含附录）另一条实质上是同一个问题（同一缺陷被相邻/多次提交反复报出）。duplicateOf 填重复于哪条的 id。',
    '- obsolete：从问题描述与对象提交可断定功能已被删除、需求已变更、或该问题已被后续提交修复（basis 必须写明依据，如「提交 xxxx 已将该测试移除」）。',
    '- false_positive：证据本身不成立，从来就不是真问题（如误读了代码语义、断言的"缺陷"实为正确行为）。',
    '- keep：无法仅凭给定信息断定应关闭的，一律 keep——代码现状核验（文件还在吗、行为是有意变更吗）留给后续修复阶段，不要臆测代码库。',
    '纪律：只依据给定材料判定，不要编造提交或代码；拿不准必判 keep；宁可漏关不可误关。',
    '输出：严格 JSON 数组（不要 markdown 围栏、不要任何多余文字），本批每条一项，形如：',
    '[{"id":"iss_xxx","verdict":"duplicate","basis":"与 xxx 同一缺陷","duplicateOf":"iss_yyy"}]',
    'keep 项 basis 可留空字符串；除枚举值外全部用中文。',
    '',
    `== 本批待判（${batch.length} 条）==`,
    ...batch.map((issue) => [
      `[${issue.id}] [${issue.severity}][${issue.category || 'general'}] ${issue.title}`,
      `   证据：${issue.description}`,
      `   对象：${issue.changeId.startsWith('review:') ? `提交 ${issue.changeId.slice(7, 15)}` : issue.changeId}`,
    ].join('\n')),
    '',
    `== 全集指纹附录（${all.length} 条，仅供判重/过时参考，不需逐条输出）==`,
    ...fingerprintBlock(all),
  ].join('\n')
}

/**
 * 解析 LLM 判定输出：剥围栏 → JSON 数组 → 逐条校验（id 必须在本批内、verdict
 * 必须合法）。解析整体失败返回 undefined（调用方整批按 keep）；单条非法跳过。
 */
export function parseTriageDecisions(text: string, batch: TriageIssue[]): TriageDecision[] | undefined {
  const stripped = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  const start = stripped.indexOf('[')
  const end = stripped.lastIndexOf(']')
  if (start === -1 || end === -1 || end <= start) return undefined
  let parsed: unknown
  try {
    parsed = JSON.parse(stripped.slice(start, end + 1))
  } catch {
    return undefined
  }
  if (!Array.isArray(parsed)) return undefined
  const validIds = new Set(batch.map((issue) => issue.id))
  const verdicts: TriageVerdict[] = ['duplicate', 'obsolete', 'false_positive', 'keep']
  const decisions: TriageDecision[] = []
  for (const raw of parsed) {
    if (typeof raw !== 'object' || raw === null) continue
    const item = raw as Record<string, unknown>
    const id = typeof item['id'] === 'string' ? item['id'] : ''
    const verdict = typeof item['verdict'] === 'string' ? item['verdict'] : ''
    if (!validIds.has(id) || !verdicts.includes(verdict as TriageVerdict)) continue
    decisions.push({
      id,
      verdict: verdict as TriageVerdict,
      basis: typeof item['basis'] === 'string' ? item['basis'].slice(0, 200) : '',
      ...(typeof item['duplicateOf'] === 'string' && item['duplicateOf'] !== '' ? { duplicateOf: item['duplicateOf'].slice(0, 60) } : {}),
    })
  }
  return decisions
}

/** 回写判定：duplicate/obsolete/false_positive → 关闭（带 LLM 分诊依据）；keep 不动。 */
async function applyTriageDecision(issuesRepo: DomainRepository<ReviewIssueRecord, never>, decision: TriageDecision): Promise<boolean> {
  if (decision.verdict === 'keep') return false
  const note = decision.verdict === 'duplicate' && (decision.duplicateOf ?? '') !== ''
    ? `LLM 整体分诊：${decision.basis || '与另一条重复'}（重复于 ${decision.duplicateOf}）`
    : `LLM 整体分诊：${decision.basis || '分诊判定关闭'}`
  try {
    await new ReviewIssueManager(issuesRepo).applyChatVerdict(decision.id as never, decision.verdict, note)
    return true
  } catch {
    // 记录已被并发处理/不存在：跳过，不让单条失败拖垮整批。
    return false
  }
}

/** 跑一批分诊：LLM → 解析 → 回写。complete 注入（生产=runLlmAnalysis，测试=假函数）。 */
export async function runTriageBatch(
  issuesRepo: DomainRepository<ReviewIssueRecord, never>,
  batch: TriageIssue[],
  all: TriageIssue[],
  complete: (prompt: string) => Promise<string>,
): Promise<TriageBatchResult> {
  const result: TriageBatchResult = { decisions: [], closed: { duplicate: 0, obsolete: 0, false_positive: 0 }, kept: 0, parseFailed: false }
  if (batch.length === 0) return result
  let decisions: TriageDecision[] | undefined
  try {
    decisions = parseTriageDecisions(await complete(buildTriagePrompt(batch, all)), batch)
  } catch {
    decisions = undefined
  }
  if (decisions === undefined) {
    // 解析失败：整批按 keep 保留（宁漏关不误关）。
    result.parseFailed = true
    result.decisions = batch.map((issue) => ({ id: issue.id, verdict: 'keep' as TriageVerdict, basis: '' }))
    result.kept = batch.length
    return result
  }
  const byId = new Map(decisions.map((decision) => [decision.id, decision]))
  for (const issue of batch) {
    const decision = byId.get(issue.id) ?? { id: issue.id, verdict: 'keep' as TriageVerdict, basis: '' }
    const closed = await applyTriageDecision(issuesRepo, decision)
    if (closed && decision.verdict !== 'keep') result.closed[decision.verdict] += 1
    if (!closed) result.kept += 1
    result.decisions.push(decision)
  }
  return result
}
