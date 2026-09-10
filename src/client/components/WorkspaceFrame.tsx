/**
 * Project Control 工作台（WorkspaceFrame）v2：围绕"提交核查"组织。
 *
 * 四个页签：
 * 1. 提交核查（默认）：仓库栏（多仓库切换）+ 提交列表（含未提交改动）+
 *    详情面板（AI 解读：改了什么/实现逻辑/风险；三级影响范围 SVG 图；最优性核查结论）。
 * 2. 项目总览：项目档案 + 快捷操作 + 已确定约束 + 变更任务。
 * 3. 执行中心：Run 进度与成本。
 * 4. 笔记与记忆：核查笔记（可关联提交）+ 项目记忆（人工确认）+ 学习概念 + Review/验收记录。
 *
 * 布局机制不变：遮蔽官方 details 槽 + 注入样式换列（聊天最右）+ 分隔条拖拽记忆；
 * 统计行两行钳制由运行时按构建哈希精准注入（applyStatsLineClamp）。
 *
 * @module dsh-client-project-control/components/WorkspaceFrame
 */

import React, { useEffect, useState } from 'react'
import { parseColor, themeAwareText } from './theme.ts'
import { clusterIntoRounds } from './commit-rounds.ts'

/** 宿主 /state 返回的快照形状（与 api-route.ts buildState 对齐）。 */
export interface WorkspaceState {
  ready?: boolean
  reason?: string
  pluginVersion?: string
  project?: { id: string; name: string; rootPath: string; createdAt: number } | null
  changes?: Array<{ id: string; title: string; type: string; status: string; source: string; updatedAt: number }>
  runs?: Array<{ id: string; changeId: string; status: string; startedAt: number | null; finishedAt: number | null; costUsd?: number; stepsTotal?: number; stepsDone?: number; currentStep?: string | null }>
  attemptsCount?: number
  memories?: Array<{ id: string; projectId: string; type: string; truthLevel: string; title: string; content?: string; isHumanConfirmed: boolean; gitBranch: string | null; createdAt: number }>
  evidenceCount?: number
  recentEvidence?: Array<{ id: string; source: string; truthLevel: string; locator: string; snippet: string; createdAt: number }>
  resolvedIssueRetentionDays?: number
  importedChanges?: Array<{ id: string; title: string; commitCount: number; firstCommitAt: number; lastCommitAt: number; confidence: number; status: string }>
  issues?: Array<{ id: string; changeId: string; severity: string; category: string; title: string; status: string }>
  verifications?: Array<{ id: string; changeId: string; name: string; type: string; status: string; createdAt: number }>
  bootstrap?: { id: string; summary: string; techStack: string[]; manifestFiles: string[]; symbolsCount: number; createdAt: number } | null
  confirmed?: Array<{ id: string; type: string; text: string; forbiddenPaths: string[] }>
  concepts?: Array<{ id: string; name: string; category: string; description: string; occurrences: number }>
}

/** GET /commits 的提交条目。 */
interface CommitEntry {
  sha: string
  shortHash: string
  author: string
  date: number
  subject: string
  files: Array<{ path: string; adds: number; dels: number }>
}

interface CommitsPayload {
  rootPath: string
  branch: string | null
  headSha: string | null
  working: { fileCount: number; isClean: boolean; files: Array<{ path: string; status: string }> }
  commits: CommitEntry[]
}

interface CommitDetailPayload {
  sha: string
  isWorking: boolean
  files: Array<{ path: string; adds: number; dels: number }>
  insertions: number
  deletions: number
  patchTruncated: boolean
  patch: string
  commit: { message: string; author: string; date: number } | null
  analysis: { what: string; logic: string[]; risks: string[] }
  analysisCached?: boolean
  analysisGeneratedAt?: number | null
  /** 本次解读的 LLM 成本（估，USD）；缓存未带成本/未产生调用时缺省。 */
  analysisCostUsd?: number
  analysisTokens?: { input: number; output: number; total: number }
}

interface ImpactScopePayload {
  changedFiles: string[]
  shas?: string[]
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  riskScore: number
  riskFactors?: Array<{ text: string; points: number }>
  keyChangePoints?: string[]
  memories?: Array<{ title: string; type: string }>
  functionImpact?: Array<{
    symbol: string
    definedIn: string
    role?: string
    change?: string
    impact?: string
    callers: Array<{ file: string; line: string; snippet: string }>
  }>
  levels: Array<{ level: string; depth: number; path: string; confidence: number; reason: string }>
  direct: string[]
  explanationsCached?: boolean
  generatedAt?: number | null
  /** 函数级说明那次 LLM 调用的成本（估，USD）。 */
  explanationsCostUsd?: number
}

export interface ReviewPayload {
  issuesFound: number
  issues: string
  verdict: string
  cached?: boolean
  generatedAt?: number | null
  costUsd?: number
  issueList?: Array<{ severity: string; category: string; title: string; evidence: string; fix: string }>
}

interface NoteEntry {
  id: string
  projectId: string
  sha?: string
  title: string
  content: string
  tags?: string[]
  pinned?: boolean
  createdAt: number
  updatedAt?: number
}

/** GET /issues 的评审问题条目（Review 问题页签数据源）。 */
interface IssueEntry {
  id: string
  changeId: string
  severity: string
  category: string
  title: string
  description: string
  status: string
  resolution: string
  fixStats: { files: number; insertions: number; deletions: number } | null
  fixFiles: string[]
  fixImpact: Array<{ symbol: string; definedIn: string; callers: Array<{ file: string; line: string; snippet: string }> }>
  fixDiff: string
  createdAt: number
  updatedAt: number
}

/** 修复差异的行级着色渲染：+ 绿、- 红、文件头加粗、其余弱化。 */
function renderDiffLines(diff: string): React.ReactNode[] {
  if (typeof diff !== 'string' || diff === '') return []
  return diff.split('\n').slice(0, 400).map((line, index) => {
    const style: React.CSSProperties = {
      fontFamily: 'var(--dsw-alias-font-mono, ui-monospace, monospace)',
      fontSize: '11px', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-all',
    }
    if (line.startsWith('+++') || line.startsWith('---') || line.startsWith('diff --git') || line.startsWith('@@')) {
      style.color = 'var(--dsw-alias-label-secondary, #6b7280)'
    } else if (line.startsWith('+')) {
      style.color = themeAwareText('#1a7f37')
      style.background = 'rgba(46,160,67,0.08)'
    } else if (line.startsWith('-')) {
      style.color = themeAwareText('#d1242f')
      style.background = 'rgba(209,36,47,0.08)'
    } else {
      style.color = 'var(--dsw-alias-label-secondary, #6b7280)'
    }
    return <div key={index} style={style}>{line === '' ? '\u00A0' : line}</div>
  })
}

/** 计划确认页的可编辑步骤（/runs/start 返回）。 */
interface PlanConfirmStep {
  id: string
  title: string
  description: string
  targetFiles: string[]
  role: string
  acceptance: string
  failurePolicy: string
  enabled: boolean
  modelProvider: string
  modelId: string
}

/** POST /peek 的载荷（代码上下文浮层）。 */
interface PeekPayload {
  exists: boolean
  path?: string
  startLine?: number
  endLine?: number
  totalLines?: number
  lines?: Array<{ n: number; text: string }>
}

/** 从自由文本中识别 file:line 引用（含 file:line-line 区间取起始行）。 */
const FILE_LINE_PATTERN = /((?:[\w.-]+[/\\])*[\w.-]+\.[A-Za-z]{1,4}):(\d{1,5})(?:-\d{1,5})?/g

/** GET /runs/detail 的载荷。 */
interface RunDetail {
  run: { id: string; changeId: string; changeTitle: string; status: string; pausePoint: { stepId: string; reason: string; at: number } | null; error: { message: string } | null; startedAt: number | null; finishedAt: number | null }
  steps: Array<{ id: string; title: string; role: string; model: string | null; status: string; attemptsCount: number; claimedOutcome: string | null; verified: boolean; costUsd: number }>
  context: {
    projectDigest: string; branch: string | null; headSha: string | null
    injectedMemories: Array<{ id: string; title: string }>
    stepSummaries: Array<{ stepTitle: string; summary: string; changedFiles: string[]; at: number }>
    decisionLog: Array<{ kind: string; detail: string; at: number }>
  } | null
}

/** GET /scheduled 的任务条目。 */
interface ScheduledTaskEntry {
  id: string; name: string; type: string; title: string; description: string
  intervalMinutes: number; enabled: boolean; lastRunAt: number | null; lastResult: string; nextDueAt: number
}

/** GET /memories 的记忆条目（记忆面板数据源）。 */
interface MemoryEntry {
  id: string; type: string; title: string; content: string; relatedFiles: string[]
  isHumanConfirmed: boolean; gitBranch: string | null; scope: string; sourceTag: string
  basisSha: string | null; status: string; lastVerifiedSha: string | null
  createdAt: number; updatedAt: number
}

interface MemoriesPayload {
  memories: MemoryEntry[]
  branch: string | null
  headSha: string | null
  baseline: { sha: string | null; updatedAt: number } | null
  behindCount: number
}

/** POST /memory/sync 的同步报告。 */
interface SyncReport {
  ok: boolean
  error?: string
  behindCount?: number
  staleProposals?: Array<{ id: string; title: string; reason: string }>
  renewed?: number
  newCandidates?: Array<{ type: string; title: string; content: string }>
  verdict?: string
}

/** 评审问题状态 → 中文标签。 */
const ISSUE_STATUS_LABELS: Record<string, string> = {
  open: '待处理',
  fixing: '修复中',
  resolved: '已解决',
  accepted: '已接受',
  rejected: '已拒绝',
}

/** 记忆类型 → 中文标签。 */
const MEMORY_TYPE_LABELS: Record<string, string> = {
  architecture_decision: '架构决策', pattern_rule: '模式规则', risk_hotspot: '风险热点',
  learned_concept: '学习概念', user_profile: '用户偏好', project_log: '项目日志', daily_log: '日志',
}

/** 记忆来源 → 中文标签。 */
const MEMORY_SOURCE_LABELS: Record<string, string> = {
  run: '执行提炼', review: '核查沉淀', sync: '拉取同步', chat: 'AI 记录', manual: '手动',
}

/** 编排角色 → 中文标签。 */
const ROLE_LABELS: Record<string, string> = {
  analysis: '分析', planning: '规划', coding: '开发', ops: '简单操作', verification: '验收',
}

/** 步骤失败策略 → 中文标签。 */
const POLICY_LABELS: Record<string, string> = {
  'retry-escalate': '重试并升级模型', 'retry-fallback': '重试', skip: '失败则跳过', ask: '失败则暂停问人',
}

/** Run 状态 → 中文标签。 */
const RUN_STATUS_LABELS: Record<string, string> = {
  queued: '排队中', running: '运行中', paused: '已暂停', blocked: '阻塞', retrying: '重试中',
  verifying: '收尾验收中', succeeded: '已成功', completed: '已成功', failed: '失败', cancelled: '已取消', interrupted: '已中断',
}

/** 步骤状态 → 中文标签。 */
const STEP_STATUS_LABELS: Record<string, string> = {
  pending: '待执行', ready: '就绪', running: '执行中', paused: '暂停', retrying: '重试中',
  succeeded: '已成功', failed: '失败', skipped: '已跳过', blocked: '阻塞', cancelled: '已取消', interrupted: '已中断',
}

/** 评审问题严重度 → 徽章底色。 */
function severityColor(severity: string): string {
  if (severity === 'critical' || severity === 'blocker') return '#ce9178'
  if (severity === 'major') return '#d7ba7d'
  if (severity === 'info') return '#6b8b8b'
  return '#569cd6'
}

/** 严重度归一（兼容历史记录里的 high/medium/low；未知回落 minor），统计/筛选/着色共用。 */
function normalizeIssueSeverity(severity: string): string {
  if (severity === 'high') return 'major'
  if (severity === 'medium' || severity === 'low') return 'minor'
  return severity === 'blocker' || severity === 'critical' || severity === 'major' || severity === 'minor' || severity === 'info'
    ? severity : 'minor'
}

// 主题对比度引擎（parseColor / relativeLuminance / darken/lighten / themeAwareText）
// 已抽取到 ./theme.ts 统一维护。全文件不变式：
// 1) 强调色文字必须经 themeAwareText（渲染期调用）；
// 2) active 高亮背景一律 button-info-fill，禁止 brand-primary 作背景
//    （深色主题下近白，配白字不可见——「页签白块」事故根因）。

/** 评审目标（changeId）→ 可读标签：合成 review:<sha> 指向提交，chg_* 指向变更，adhoc 为工作区。 */
function issueTargetLabel(changeId: string): string {
  const id = typeof changeId === 'string' ? changeId : ''
  if (id.startsWith('review:')) return `提交 ${id.slice(7, 15)}`
  if (id === 'adhoc') return '工作区'
  return `变更 ${id.slice(0, 11)}`
}

/** 总结/结构化笔记的轻量 Markdown 渲染：「## 」节标题着色加粗，「- 」列表加圆点，其余原样。 */
function renderStructuredContent(content: string): React.ReactNode[] {
  if (typeof content !== 'string' || content === '') return []
  return content.split('\n').map((line, index) => {
    if (line.startsWith('## ')) {
      return (
        <div key={index} style={{ fontWeight: 600, fontSize: '12.5px', marginTop: index === 0 ? 0 : 10, marginBottom: 2, color: 'var(--dsw-alias-brand-primary, #2563eb)' }}>
          {line.slice(3)}
        </div>
      )
    }
    if (line.startsWith('- ')) {
      return <div key={index} style={{ paddingLeft: 14, textIndent: -10 }}>• {renderWithPeek(line.slice(2))}</div>
    }
    return <div key={index}>{line === '' ? '\u00A0' : renderWithPeek(line)}</div>
  })
}

/** peek 点击回调：由 WorkspaceFrame 注入（渲染器保持模块级纯函数）。 */
let peekOpener: ((path: string, line: number) => void) | undefined

/** 把文本中的 file:line 引用渲染为可点击芯片（点击弹出代码上下文）。 */
function renderWithPeek(text: string): React.ReactNode {
  const nodes: React.ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  FILE_LINE_PATTERN.lastIndex = 0
  while ((match = FILE_LINE_PATTERN.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const [full, path, lineStr] = match
    nodes.push(
      <button
        key={`${match.index}-${full}`}
        style={{
          background: 'none', border: 'none', padding: '0 1px', cursor: 'pointer',
          fontFamily: 'var(--dsw-alias-font-mono, ui-monospace, monospace)',
          fontSize: 'inherit', color: 'var(--dsw-alias-brand-primary, #2563eb)', textDecoration: 'underline dotted',
        }}
        title="点击查看代码上下文"
        onClick={() => { peekOpener?.(path, Number(lineStr)) }}
      >{full}</button>,
    )
    last = match.index + full.length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes.length === 1 ? nodes[0] : <span>{nodes}</span>
}

/**
 * 视觉换列样式表：随本组件挂载/卸载（卸载即完全恢复原生布局）。
 * 注意：禁止用 :has() 做祖先匹配——官方构建产物几十个组件根类都叫 root，
 * 祖先匹配会把整个聊天容器误钳制（历史事故）。此表只保留网格换列与拖拽柄隐藏。
 */
const LAYOUT_STYLE = `
div[class*="frame"][style*="grid-template-columns"] > div[class*="centerCol"] { order: 3; }
div[class*="frame"][style*="grid-template-columns"] > div[class*="detailsCol"] { order: 2; }
div[class*="frame"][style*="grid-template-columns"][data-details-collapsed] > div[class*="centerCol"],
div[class*="frame"][style*="grid-template-columns"][data-details-collapsed] > div[class*="detailsCol"] { order: 0; }
div[class*="handle"][data-side="details"] { display: none !important; }
div[class*="frame"][style*="grid-template-columns"]:not([data-details-collapsed]) {
  grid-template-columns: auto minmax(0, 1fr) var(--pc-chat-w, 360px) !important;
}
`

/**
 * 会话统计行的两行钳制（用户指定的样式）。不能走 CSS 选择器：
 * 官方多个模块的根类都叫 `root`（构建后是 `hash_root`），其中
 * ConversationRoot 的子树里就包含统计行的 `hash_sep` 分隔 span——
 * 任何祖先匹配（含 :has()）都会把整个聊天容器钳成两行，杀死滚动。
 * 因此在运行时按唯一形状定位：居中排版 + 直接子代含文本 "|" 的
 * 分隔 span，命中后把官方类名原样写进样式表（精准到构建哈希）。
 * @returns 注入的 style 元素；官方未渲染统计行时为 undefined。
 */
const applyStatsLineClamp = (): HTMLStyleElement | undefined => {
  const sepSpan = Array.from(document.querySelectorAll<HTMLSpanElement>('div[class*="_root"] > span[class*="_sep"]'))
    .find((span) => span.textContent === '|')
  const rootDiv = sepSpan?.parentElement
  const hashClass = rootDiv?.className.split(/\s+/).find((name) => name.endsWith('_root'))
  if (rootDiv === undefined || rootDiv === null || hashClass === undefined || getComputedStyle(rootDiv).textAlign !== 'center') return undefined
  const style = document.createElement('style')
  style.id = 'pc-stats-clamp'
  style.textContent = `
div[class="${hashClass}"] {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  text-overflow: clip;
  font-size: 11px;
  line-height: 1.5;
  max-width: 100%;
}
`
  document.head.appendChild(style)
  return style
}

type TabKey = 'commits' | 'overview' | 'execution' | 'review' | 'notes' | 'settings'

export interface WorkspaceFrameProps {
  /** 官方 details 槽契约的 locale 注入（我们注册的 project-control 词典）。 */
  t?: (key: string) => string
  /** 当前会话 id（官方 session 标准属性；切换会话时重新撑开工作台轨道）。 */
  sessionId?: string
}

/** 工作台文案词典（zh / en）。 */
export const WORKSPACE_DICT = {
  zh: {
    'workspace.title': '项目核查台',
    'tab.commits': '提交核查',
    'tab.overview': '项目总览',
    'tab.execution': '执行中心',
    'tab.review': 'Review 问题',
    'tab.notes': '笔记与记忆',
    'tab.settings': '设置',
    'error.load': '加载失败',
    'state.project': '当前项目',
    'state.noProject': '尚未初始化项目',
    'state.noProjectHint': '点击「初始化项目」扫描仓库结构、技术栈与符号索引。',
    'action.bootstrap': '初始化项目',
    'action.rescan': '重新初始化 / 扫描',
    'action.analyze': '分析当前改动',
    'action.review': '评审当前改动',
    'action.verify': '验收当前改动',
    'action.createChange': '新建变更',
    'action.running': '执行中…',
    'action.refresh': '刷新',
    'form.changeTitle': '变更标题',
    'form.changeDesc': '需求与背景（选填）',
    'result.panel': '操作结果',

    'repo.scanHistory': '重建历史',
    'repo.commits': '提交',
    'repo.branch': '分支',
    'repo.working': '未提交改动',
    'repo.workingClean': '工作区干净，无未提交改动',
    'repo.empty': '暂无提交。',
    'repo.loadFailed': '提交加载失败',
    'picker.title': '选择要核查的提交（可多选）',
    'picker.placeholder': '点击选择提交（可多选，含未提交改动）',
    'picker.selected': '已选',
    'picker.filter': '按标题/哈希/作者过滤…',
    'picker.clear': '清空',
    'picker.noMatch': '无匹配提交。',
    'picker.hint': '勾选提交后自动生成 AI 解读；下方可再跑影响范围与最优性核查。',
    'picker.round': '第 {n} 轮',
    'picker.roundLatest': '第 {n} 轮（最新）',
    'picker.roundSelect': '选整轮',
    'picker.roundClear': '取消本轮',
    'picker.undigested': '上次 AI 总结之后的新提交，尚未核查消化',
    'picker.undigestedCount': '{n} 个提交未消化',
    'impact.factors': '风险构成（为什么是这个等级）',
    'impact.points': '影响点明细',
    'impact.keyPoints': '关键组件',
    'impact.memory': '结合项目记忆核查',
    'impact.functions': '受影响函数（谁调用了被改的代码）',
    'impact.funcRole': '函数功能',
    'impact.funcChange': '本次变化',
    'impact.funcCallers': '对调用方的影响',
    'cache.hit': '来自缓存',
    'cache.regenerate': '重新生成',
    'cost.tooltip': '本次 AI 调用成本（估算，按 DeepSeek 价目折算）',
    'exec.create': '新建执行',
    'exec.formTitle': '要做什么（一句话）',
    'exec.formDesc': '需求与背景：目标、涉及模块、验收标准',
    'exec.start': '开始执行',
    'exec.starting': '正在启动…',
    'exec.createHint': '创建变更并自动生成计划，随后由 AI 子代理逐步执行；进度在下方实时刷新，无需去聊天。',
    'exec.modelDefault': '执行模型（角色默认：分析/操作=快，开发=标准，规划=推理，验收=验收级）',
    'badge.running': '{n} 个任务运行中，点击查看',
    'narrative.title': '工作轮次叙事',
    'narrative.generate': '整体解读这轮工作',
    'narrative.running': '解读生成中…（约 10-30 秒）',
    'badge.failed': '{n} 个任务需要处理，点击查看',
    'exec.flowCreate': '填写任务',
    'exec.flowOrchestrate': '确认编排（每步可改模型/角色/失败策略）',
    'exec.flowRun': '启动执行（Run 详情看进度与成本）',
    'exec.flowMemory': '自动提炼记忆（记忆面板确认）',
    'exec.planning': '编排生成中…（LLM 正在拆解任务，约 10-30 秒）',
    'exec.col.steps': '步骤',
    'notes.edit': '编辑',
    'notes.toMemory': '转记忆',
    'notes.toMemoryHint': '把这条笔记的标题与内容填入下方记忆表单，确认后入库',
    'notes.toMemoryDone': '✓ 已填入记忆表单（在下方「项目记忆」区确认类型后添加）',
    'notes.copyMd': '复制 MD',
    'notes.copyMdHint': '把这条笔记复制为 Markdown 到剪贴板',
    'notes.copyMdDone': '已复制为 Markdown',
    'notes.exportMd': '导出 MD',
    'notes.exportMdHint': '下载为 .md 文件',
    'notes.exportDone': '已导出为 .md 文件',
    'notes.digestNever': '尚未生成过 AI 总结',
    'notes.digestPending': '上次总结后有 {n} 个新提交未消化',
    'detail.saveNote': '存为笔记',
    'detail.saveNoteHint': '把本次核查结论（改了什么/实现逻辑/风险点）一键存为结构化笔记',
    'detail.saveNoteTitle': '核查记录',
    'detail.saveMemory': '沉淀为记忆',
    'detail.saveMemoryHint': '把本次核查结论沉淀为项目记忆（进入待确认队列）',
    'notes.save': '保存',
    'notes.cancel': '取消',
    'memory.branchScope': '分支',
    'memory.branchAll': '全部分支',
    'notes.search': '搜索笔记…',
    'model.title': '模型分配（解读 / 总结等任务用哪个模型）',
    'model.loading': '读取模型清单…',
    'model.followChat': '跟随聊天模型',
    'model.save': '保存并生效',
    'model.saved': '已生效',
    'model.hint': '保存后立即生效并持久化（重启后保留）；不影响聊天模型。',
    'notes.aiSummary': 'AI 总结笔记',
    'notes.aiSummaryRun': '总结生成中…（约 10-30 秒）',
    'notes.expand': '展开全文',
    'notes.collapse': '收起',
    'notes.summaryTag': 'AI 总结',
    'notes.emptySearch': '无匹配笔记。',
    'notes.contentHint': '笔记内容（支持多行）：结论、疑问、学习要点、关键决策…',
    'notes.tagsHint': '标签（逗号分隔，选填；保存后可点击筛选）',
    'notes.pin': '置顶',
    'notes.unpin': '取消置顶',
    'notes.editedAt': '编辑于',
    'review.filterAll': '全部',
    'review.statusAll': '全部状态',
    'review.verify': '复检',
    'review.verifyRunning': '复检中…',
    'review.verifyHint': '修改代码后点击：自动检测问题是否修复、改动是否最优/最小侵入、有无新问题；全部通过才自动置为已解决',
    'review.falsePositive': '判定误报',
    'review.falsePositiveHint': '人工判定该问题为误报并关闭（与复检解决的语义不同）',
    'review.falsePositiveTitle': '判定为误报？',
    'review.falsePositiveMsg': '「{title}」将被标记为误报（已拒绝）并从待处理中移除。',
    'review.fixDetail': '修复详情',
    'review.fixStatFiles': '文件',
    'review.fixFiles': '修复涉及文件',
    'review.fixImpact': '影响范围（改动符号与调用点）',
    'review.definedIn': '定义于',
    'review.callCount': '处调用',
    'review.fixDiff': '修复差异（相对评审基线）',
    'review.refresh': '刷新',
    'review.retentionHint': '已解决问题保留 {days} 天后自动清理',
    'review.target': '对象',
    'review.workingTarget': '工作区',

    'plan.title': '编排计划确认',
    'plan.hint': '每步的角色决定上下文注入与默认模型（分析/操作=fast，开发=standard，规划=reasoning，验收=verifier）；可调整后再启动。',
    'plan.col.step': '步骤', 'plan.col.role': '角色', 'plan.col.model': '模型', 'plan.col.policy': '失败策略', 'plan.col.enabled': '启用', 'plan.col.attempts': '尝试',
    'plan.modelDefault': '跟随角色默认',
    'plan.launchEdited': '保存修改并启动',
    'plan.launchDirect': '按原计划启动',
    'plan.discard': '放弃',
    'plan.viewDetail': '详情', 'plan.refreshDetail': '刷新', 'plan.closeDetail': '收起',
    'plan.detailTitle': 'Run 详情',
    'plan.pausedBanner': '任务已暂停，等待你的决策',
    'plan.resumeRetry': '重试该步骤并继续',
    'plan.resumeSkip': '跳过该步骤继续',
    'plan.resumeFailed': '从失败处恢复',
    'plan.contextTitle': '任务上下文（本 Run 注入了什么）',
    'plan.branch': '分支', 'plan.injectedMemories': '注入记忆', 'plan.decisionLog': '决策日志',
    'exec.col.detail': '详情',

    'sched.title': '例行任务',
    'sched.formName': '任务名称', 'sched.formInterval': '间隔（分钟）',
    'sched.typeReview': '自动评审', 'sched.typeSummary': 'AI 总结', 'sched.typeRun': '定时执行',
    'sched.add': '创建',
    'sched.hint': '到点自动执行：自动评审=评审近 24 小时的新提交（问题进 Review 面板）；AI 总结=生成增量学习总结；定时执行=按模板跑一次编排任务。最小 1 分钟。',
    'sched.empty': '暂无例行任务。',
    'sched.col.name': '名称', 'sched.col.type': '类型', 'sched.col.interval': '周期', 'sched.col.next': '下次执行', 'sched.col.lastResult': '上次结果', 'sched.col.actions': '操作',
    'sched.day': ' 天', 'sched.hour': ' 小时', 'sched.minute': ' 分钟',
    'sched.disable': '暂停', 'sched.enable': '启用', 'sched.runNow': '立即执行',

    'memory.zoneTitle': '项目记忆',
    'memory.syncBaseline': '同步基线', 'memory.syncNone': '未同步',
    'memory.behind': '落后 {n} 个提交未同步',
    'memory.sync': '同步记忆', 'memory.syncing': '同步中…', 'memory.syncFailed': '同步失败',
    'memory.staleTitle': '疑似过时（相关代码已被改动，待你复核）',
    'memory.markStale': '标记过时', 'memory.archiveBtn': '归档', 'memory.keepActive': '仍有效',
    'memory.newCandidates': '新增候选（已入待确认队列）：',
    'memory.closeReport': '关闭报告',
    'memory.scopeProject': '主干（全分支）', 'memory.scopeBranch': '仅当前分支',
    'memory.pendingQueue': '待确认队列',
    'memory.toNote': '转笔记', 'memory.normalize': '归一到主干', 'memory.restore': '恢复',
    'memory.statusStale': '疑似过时',
    'impact.functionsNone': '未识别出函数级调用变化（可能是样式/静态资源/纯配置改动）。',
    'review.col.severity': '级别',
    'review.col.category': '类别',
    'review.col.title': '问题',
    'review.col.evidence': '位置',
    'review.col.fix': '建议修复',
    'review.hint': '点击上方按钮开始核查，产出最优性结论与问题清单。',
    'diff.show': '对比',
    'diff.hide': '收起差异',

    'detail.title': '核查详情',
    'detail.pick': '← 从左侧选择一次提交（或未提交改动）开始核查',
    'detail.what': '改了什么',
    'detail.logic': '实现逻辑',
    'detail.risk': '风险点',
    'detail.files': '文件清单',
    'detail.patch': '查看补丁原文',
    'detail.aiLoading': 'AI 解读生成中…（约 10-30 秒）',
    'detail.impact': '影响范围分析',
    'detail.impactLoading': '影响扫描中…（引用检索 + 图谱传播）',
    'detail.optimality': '最优性核查',
    'detail.optimalityLoading': '评审中…（会产出问题清单与最优性结论）',

    'impact.risk': '风险',
    'impact.col.changed': '变更文件',
    'impact.col.indirect': '间接影响（引用链）',
    'impact.col.potential': '潜在影响',
    'impact.none': '未发现仓库内引用者（改动看似独立）。',
    'impact.tests': '关联测试',
    'impact.legend.changed': '变更',
    'impact.legend.indirect': '间接',
    'impact.legend.potential': '潜在',

    'review.verdict': '最优性结论',
    'review.issues': '问题清单',
    'review.clean': '未发现问题。',

    'notes.title': '核查笔记',
    'notes.formTitle': '笔记标题',
    'notes.formContent': '笔记内容（结论、疑问、学习要点…）',
    'notes.add': '添加笔记',
    'notes.boundTo': '将关联到',
    'notes.col.time': '时间',
    'notes.col.title': '标题',
    'notes.col.content': '内容',
    'notes.col.sha': '关联提交',
    'notes.remove': '删除',
    'notes.empty': '还没有笔记。核查提交时随手记下结论与疑问，就是你的项目学习档案。',

    'memory.record': '记录项目记忆',
    'form.memoryTitle': '记忆标题',
    'form.memoryContent': '记忆内容（什么与为什么）',
    'memory.col.title': '条目',
    'memory.col.type': '类型',
    'memory.col.truth': '真值',
    'memory.col.branch': '分支',
    'memory.confirm': '确认',
    'memory.empty': '暂无项目记忆。可在聊天中让 AI 记录，或在上方手动添加。',
    'concepts.title': '学习概念',
    'concepts.none': '暂无学习概念。执行中心跑完变更后自动沉淀，也可在聊天中让 AI 总结学习要点。',
    'concepts.col.name': '概念',
    'concepts.col.category': '类别',
    'concepts.col.count': '次数',
    'review.recordsTitle': 'Review 问题',
    'review.recordsEmpty': '暂无问题记录。提交审查页评审出的问题会自动登记到这里；重新评审会替换旧记录。',
    'verify.records': '验收记录',
    'verify.recordsEmpty': '暂无验收记录。在执行中心点「验收」即生成。',

    'confirmed.title': '已确定约束（人工确认，AI 禁改自动拦截）',
    'confirmed.add': '添加约束',
    'confirmed.text': '约束/需求内容',
    'confirmed.paths': '禁改路径（逗号分隔；相对项目根如 src/core，或绝对路径）',
    'confirmed.none': '暂无约束。添加后，AI 修改本项目的禁改路径将被自动拒绝（仅对本项目生效）。',

    'changes.title': '变更任务',
    'state.noChanges': '暂无变更任务。在聊天中让 AI 创建，或用上方「新建变更」。',
    'changes.col.title': '标题',
    'changes.col.type': '类型',
    'changes.col.status': '状态',
    'changes.col.updated': '更新时间',
    'exec.col.status': '状态',
    'exec.col.change': '变更',
    'exec.col.started': '开始',
    'exec.col.cost': '成本(估)',
    'exec.attempts': '尝试次数',
    'exec.hint': '执行（start_run）请在右侧聊天中发起：创建计划后对 AI 说「开始执行该 change」。本页查看进度与结果。',
    'state.noRuns': '暂无执行记录。',
    'state.techStack': '技术栈',
    'state.symbols': '已索引符号',
    'state.manifests': '清单文件',
    'state.evidence': '证据条目',
  },
  en: {
    'workspace.title': 'Review Desk',
    'tab.commits': 'Commit Review',
    'tab.overview': 'Overview',
    'tab.execution': 'Execution',
    'tab.review': 'Review issues',
    'tab.notes': 'Notes & Memory',
    'tab.settings': 'Settings',
    'error.load': 'Failed to load',
    'state.project': 'Current project',
    'state.noProject': 'No project initialized',
    'state.noProjectHint': 'Run "Initialize project" to scan the repository structure, tech stack, and symbol index.',
    'action.bootstrap': 'Initialize project',
    'action.rescan': 'Re-initialize / scan',
    'action.analyze': 'Analyze working diff',
    'action.review': 'Review working diff',
    'action.verify': 'Verify working diff',
    'action.createChange': 'Create change',
    'action.running': 'Running…',
    'action.refresh': 'Refresh',
    'form.changeTitle': 'Change title',
    'form.changeDesc': 'Requirement and background (optional)',
    'result.panel': 'Action result',

    'repo.add': 'Add repo',
    'repo.addHint': 'Enter an absolute repo path and press Enter; previously used repos are remembered',
    'repo.scanHistory': 'Rebuild history',
    'repo.commits': 'commits',
    'repo.branch': 'branch',
    'repo.working': 'Uncommitted changes',
    'repo.workingClean': 'Working tree is clean',
    'repo.empty': 'No commits.',
    'repo.loadFailed': 'Failed to load commits',
    'picker.title': 'Pick commits to review (multi-select)',
    'picker.placeholder': 'Click to pick commits (multi-select, includes uncommitted)',
    'picker.selected': 'Selected',
    'picker.filter': 'Filter by title/hash/author…',
    'picker.clear': 'Clear',
    'picker.noMatch': 'No matching commit.',
    'picker.hint': 'Checking a commit generates its AI explanation; run impact and optimality below.',
    'picker.round': 'Round {n}',
    'picker.roundLatest': 'Round {n} (latest)',
    'picker.roundSelect': 'Select round',
    'picker.roundClear': 'Clear round',
    'picker.undigested': 'New commits since the last AI summary (not yet reviewed)',
    'picker.undigestedCount': '{n} unreviewed commits',
    'impact.factors': 'Risk factors (why this level)',
    'impact.points': 'Impacted points',
    'impact.keyPoints': 'Key components',
    'impact.memory': 'Cross-check with project memory',
    'impact.functions': 'Impacted functions (who calls the changed code)',
    'impact.funcRole': 'Function role',
    'impact.funcChange': 'Changed by this commit',
    'impact.funcCallers': 'Impact on callers',
    'cache.hit': 'from cache',
    'cache.regenerate': 'Regenerate',
    'cost.tooltip': 'Estimated cost of this AI call (DeepSeek pricing)',
    'exec.create': 'New run',
    'exec.formTitle': 'What to do (one line)',
    'exec.formDesc': 'Requirement: goal, modules, acceptance',
    'exec.start': 'Start run',
    'exec.starting': 'Starting…',
    'exec.createHint': 'Creates a change, generates a plan, then AI subagents execute step by step; progress refreshes below.',
    'exec.modelDefault': 'Execution model (role defaults: analysis/ops=fast, coding=standard, planning=reasoning, verification=verifier)',
    'badge.running': '{n} runs in progress, click to view',
    'narrative.title': 'Work-round narrative',
    'narrative.generate': 'Interpret this round of work',
    'narrative.running': 'Generating… (~10-30s)',
    'badge.failed': '{n} runs need attention, click to view',
    'exec.flowCreate': 'Describe the task',
    'exec.flowOrchestrate': 'Confirm orchestration (per-step model/role/failure policy)',
    'exec.flowRun': 'Launch (track progress & cost in run detail)',
    'exec.flowMemory': 'Auto-distill memories (confirm in memory panel)',
    'exec.planning': 'Generating orchestration… (LLM is decomposing the task, ~10-30s)',
    'exec.col.steps': 'Steps',
    'notes.edit': 'Edit',
    'notes.toMemory': 'To memory',
    'notes.toMemoryHint': 'Prefill the memory form below with this note',
    'notes.toMemoryDone': '✓ Prefilled the memory form (choose a type in the Project memory zone below, then add)',
    'notes.copyMd': 'Copy MD',
    'notes.copyMdHint': 'Copy this note as Markdown to the clipboard',
    'notes.copyMdDone': 'Copied as Markdown',
    'notes.exportMd': 'Export MD',
    'notes.exportMdHint': 'Download as a .md file',
    'notes.exportDone': 'Exported as .md',
    'notes.digestNever': 'No AI summary generated yet',
    'notes.digestPending': '{n} new commits since the last summary',
    'detail.saveNote': 'Save as note',
    'detail.saveNoteHint': 'Save this review conclusion (what/logic/risks) as a structured note',
    'detail.saveNoteTitle': 'Review record',
    'detail.saveMemory': 'Distill to memory',
    'detail.saveMemoryHint': 'Distill this review conclusion into a project memory (queued for confirmation)',
    'notes.save': 'Save',
    'notes.cancel': 'Cancel',
    'memory.branchScope': 'Branch',
    'memory.branchAll': 'All branches',
    'notes.search': 'Search notes…',
    'model.title': 'Model assignment (which model per task)',
    'model.loading': 'Loading models…',
    'model.followChat': 'Follow chat model',
    'model.save': 'Save & apply',
    'model.saved': 'Applied',
    'model.hint': 'Applies immediately and persists across restarts; chat model unaffected.',
    'notes.aiSummary': 'AI summary',
    'notes.aiSummaryRun': 'Summarizing… (10-30s)',
    'notes.expand': 'Expand',
    'notes.collapse': 'Collapse',
    'notes.summaryTag': 'AI summary',
    'notes.emptySearch': 'No matching notes.',
    'notes.contentHint': 'Note content (multi-line): conclusions, questions, learnings…',
    'notes.tagsHint': 'Tags (comma separated, optional; click a tag to filter)',
    'notes.pin': 'Pin',
    'notes.unpin': 'Unpin',
    'notes.editedAt': 'edited',
    'review.filterAll': 'All',
    'review.statusAll': 'All statuses',
    'review.verify': 'Re-verify',
    'review.verifyRunning': 'Verifying…',
    'review.verifyHint': 'After fixing the code, click to re-check: whether issues are fixed, whether the change is optimal and minimally invasive, and whether new issues appeared. Only a passing re-verification marks issues resolved.',
    'review.falsePositive': 'False positive',
    'review.falsePositiveHint': 'Human-mark this issue as a false positive and close it (distinct from a verified fix)',
    'review.falsePositiveTitle': 'Mark as false positive?',
    'review.falsePositiveMsg': '"{title}" will be marked rejected and removed from the open queue.',
    'review.fixDetail': 'Fix details',
    'review.fixStatFiles': 'files',
    'review.fixFiles': 'Files touched by the fix',
    'review.fixImpact': 'Impact scope (changed symbols and callers)',
    'review.definedIn': 'defined in',
    'review.callCount': 'call site(s)',
    'review.fixDiff': 'Fix diff (relative to the review baseline)',
    'review.refresh': 'Refresh',
    'review.retentionHint': 'Resolved issues are auto-purged after {days} day(s)',
    'review.target': 'Target',
    'review.workingTarget': 'Working tree',

    'plan.title': 'Orchestration plan',
    'plan.hint': 'Each step role drives context injection and the default model (analysis/ops=fast, coding=standard, planning=reasoning, verification=verifier); adjust before launching.',
    'plan.col.step': 'Step', 'plan.col.role': 'Role', 'plan.col.model': 'Model', 'plan.col.policy': 'Failure policy', 'plan.col.enabled': 'On', 'plan.col.attempts': 'Attempts',
    'plan.modelDefault': 'Role default',
    'plan.launchEdited': 'Save edits & launch',
    'plan.launchDirect': 'Launch as-is',
    'plan.discard': 'Discard',
    'plan.viewDetail': 'Detail', 'plan.refreshDetail': 'Refresh', 'plan.closeDetail': 'Close',
    'plan.detailTitle': 'Run detail',
    'plan.pausedBanner': 'Run paused, awaiting your decision',
    'plan.resumeRetry': 'Retry step & continue',
    'plan.resumeSkip': 'Skip step & continue',
    'plan.resumeFailed': 'Resume from failure',
    'plan.contextTitle': 'Run context (what was injected)',
    'plan.branch': 'Branch', 'plan.injectedMemories': 'Injected memories', 'plan.decisionLog': 'Decision log',
    'exec.col.detail': 'Detail',

    'sched.title': 'Scheduled tasks',
    'sched.formName': 'Task name', 'sched.formInterval': 'Interval (minutes)',
    'sched.typeReview': 'Auto review', 'sched.typeSummary': 'AI summary', 'sched.typeRun': 'Timed run',
    'sched.add': 'Create',
    'sched.hint': 'Runs automatically when due: auto review = review commits from the last 24h (issues land in the Review tab); AI summary = incremental learning summary; timed run = execute the template as an orchestrated task. Minimum 1 minute.',
    'sched.empty': 'No scheduled tasks yet.',
    'sched.col.name': 'Name', 'sched.col.type': 'Type', 'sched.col.interval': 'Cycle', 'sched.col.next': 'Next run', 'sched.col.lastResult': 'Last result', 'sched.col.actions': 'Actions',
    'sched.day': ' d', 'sched.hour': ' h', 'sched.minute': ' min',
    'sched.disable': 'Pause', 'sched.enable': 'Enable', 'sched.runNow': 'Run now',

    'memory.zoneTitle': 'Project memory',
    'memory.syncBaseline': 'Sync baseline', 'memory.syncNone': 'never synced',
    'memory.behind': '{n} commits behind',
    'memory.sync': 'Sync memory', 'memory.syncing': 'Syncing…', 'memory.syncFailed': 'Sync failed',
    'memory.staleTitle': 'Possibly stale (related code changed; review needed)',
    'memory.markStale': 'Mark stale', 'memory.archiveBtn': 'Archive', 'memory.keepActive': 'Still valid',
    'memory.newCandidates': 'New candidates (queued for confirmation):',
    'memory.closeReport': 'Close report',
    'memory.scopeProject': 'Mainline (all branches)', 'memory.scopeBranch': 'Current branch only',
    'memory.pendingQueue': 'Pending confirmation',
    'memory.toNote': 'To note', 'memory.normalize': 'Normalize to mainline', 'memory.restore': 'Restore',
    'memory.statusStale': 'Stale',
    'fs.browse': 'Browse',
    'fs.up': 'Up',
    'fs.use': 'Use this directory',
    'fs.register': 'Also register as session workspace',
    'fs.loading': 'Reading…',
    'fs.empty': 'No subdirectories.',
    'impact.functionsNone': 'No function-level call impact detected (style/asset/config-only change).',
    'review.col.severity': 'Severity',
    'review.col.category': 'Category',
    'review.col.title': 'Issue',
    'review.col.evidence': 'Location',
    'review.col.fix': 'Suggested fix',
    'review.hint': 'Click the button above to produce the optimality verdict and issue list.',
    'diff.show': 'Diff',
    'diff.hide': 'Hide diff',

    'detail.title': 'Review detail',
    'detail.pick': '← Pick a commit (or the uncommitted changes) on the left to start reviewing',
    'detail.what': 'What it does',
    'detail.logic': 'Implementation logic',
    'detail.risk': 'Risks',
    'detail.files': 'Files',
    'detail.patch': 'Show raw patch',
    'detail.aiLoading': 'Generating AI explanation… (10-30s)',
    'detail.impact': 'Impact scope',
    'detail.impactLoading': 'Scanning impact… (reference search + graph walk)',
    'detail.optimality': 'Optimality review',
    'detail.optimalityLoading': 'Reviewing… (produces issue list and optimality verdict)',

    'impact.risk': 'Risk',
    'impact.col.changed': 'Changed files',
    'impact.col.indirect': 'Indirect (reference chain)',
    'impact.col.potential': 'Potential',
    'impact.none': 'No in-repo referencers found (the change looks self-contained).',
    'impact.tests': 'Related tests',
    'impact.legend.changed': 'changed',
    'impact.legend.indirect': 'indirect',
    'impact.legend.potential': 'potential',

    'review.verdict': 'Optimality verdict',
    'review.issues': 'Issues',
    'review.clean': 'No issues found.',

    'notes.title': 'Review notes',
    'notes.formTitle': 'Note title',
    'notes.formContent': 'Note content (conclusions, questions, learnings…)',
    'notes.add': 'Add note',
    'notes.boundTo': 'Will be linked to',
    'notes.col.time': 'Time',
    'notes.col.title': 'Title',
    'notes.col.content': 'Content',
    'notes.col.sha': 'Commit',
    'notes.remove': 'Delete',
    'notes.empty': 'No notes yet. Note down conclusions and questions while reviewing commits — that is your project learning archive.',

    'memory.record': 'Record project memory',
    'form.memoryTitle': 'Memory title',
    'form.memoryContent': 'Memory content (what and why)',
    'memory.col.title': 'Item',
    'memory.col.type': 'Type',
    'memory.col.truth': 'Truth',
    'memory.col.branch': 'Branch',
    'memory.confirm': 'Confirm',
    'memory.empty': 'No project memories yet. Ask the AI in chat to record one, or add above.',
    'concepts.title': 'Learning concepts',
    'concepts.none': 'No learning concepts yet. They accumulate after successful change runs, or ask the AI to summarize learning points.',
    'concepts.col.name': 'Concept',
    'concepts.col.category': 'Category',
    'concepts.col.count': 'Count',
    'review.recordsTitle': 'Review issues',
    'review.recordsEmpty': 'No issue records yet. Issues found by the commit-review page are recorded here automatically; re-reviewing replaces old records.',
    'verify.records': 'Verification records',
    'verify.recordsEmpty': 'No verification records yet. Click "Verify" in the execution tab to generate one.',

    'confirmed.title': 'Confirmed constraints (human-confirmed; AI edits to forbidden paths are auto-denied)',
    'confirmed.add': 'Add constraint',
    'confirmed.text': 'Requirement / constraint text',
    'confirmed.paths': 'Forbidden paths (comma separated; relative to project root like src/core, or absolute)',
    'confirmed.none': 'No constraints yet. Once added, AI edits to forbidden paths in this project are auto-denied.',

    'changes.title': 'Change tasks',
    'state.noChanges': 'No change tasks yet. Ask the AI in chat to create one, or use "Create change" above.',
    'changes.col.title': 'Title',
    'changes.col.type': 'Type',
    'changes.col.status': 'Status',
    'changes.col.updated': 'Updated',
    'exec.col.status': 'Status',
    'exec.col.change': 'Change',
    'exec.col.started': 'Started',
    'exec.col.cost': 'Cost (est)',
    'exec.attempts': 'Attempts',
    'exec.hint': 'Runs (start_run) are started from chat: after a plan exists, tell the AI to "start run for the change". This tab shows progress and results.',
    'state.noRuns': 'No runs yet.',
    'state.techStack': 'Tech stack',
    'state.symbols': 'Indexed symbols',
    'state.manifests': 'Manifests',
    'state.evidence': 'Evidence entries',
  },
} as const

function fallbackT(key: string): string {
  const dict = WORKSPACE_DICT.zh as Record<string, string>
  return dict[key] ?? key
}

/** 操作结果人性化：✓/✗ + 标量字段的紧凑行（跳过嵌套对象与原始 JSON）。 */
function formatActionResult(data: Record<string, unknown>): string {
  const lines: string[] = [data['ok'] === false ? '✗' : '✓']
  for (const [key, value] of Object.entries(data)) {
    if (key === 'ok') continue
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      lines.push(`${key}：${String(value).slice(0, 200)}`)
    }
  }
  if (lines.length === 1) lines.push('成功')
  return lines.join('\n')
}

/** LLM 成本（估）徽标：无值（未产生调用 / 旧缓存不带成本）时返回 null 不占位。 */
function renderCostBadge(usd: number | undefined, title: string): React.ReactNode {
  if (usd === undefined) return null
  return <span style={styles.badge('#8b949e')} title={title}>≈${usd.toFixed(4)}</span>
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--dsw-alias-bg-base, #fff)',
    color: 'var(--dsw-alias-label-primary, #1f2328)',
    fontFamily: 'var(--ds-font-sans, inherit)',
    overflow: 'hidden',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 12px',
    borderBottom: '1px solid var(--dsw-alias-border-l1, rgba(5,5,5,0.1))',
    flex: 'none',
    background: 'var(--dsw-alias-bg-base, #fff)',
  },
  title: { fontSize: '13px', fontWeight: 600, marginInlineEnd: '10px', color: 'var(--dsw-alias-label-primary, #1f2328)' },
  tab: (active: boolean): React.CSSProperties => ({
    padding: '5px 12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    // button-info-fill 两主题都蓝；brand-primary 在深色主题是近白色，白字会被吞掉（页签白块事故）。
    background: active ? 'var(--dsw-alias-button-info-fill, #2563eb)' : 'transparent',
    color: active ? '#fff' : 'var(--dsw-alias-label-secondary, #6b7280)',
  }),
  body: { flex: 1, overflowY: 'auto', padding: '14px 16px' },
  card: {
    border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))',
    borderRadius: '8px',
    padding: '12px 14px',
    marginBottom: '12px',
    background: 'var(--dsw-alias-bg-layer-1, #fafafa)',
  },
  row: { display: 'flex', gap: '18px', flexWrap: 'wrap', fontSize: '12px', margin: '6px 0' },
  label: { color: 'var(--dsw-alias-label-secondary, #6b7280)', marginInlineEnd: '6px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' },
  th: { textAlign: 'start', padding: '6px 8px', borderBottom: '1px solid var(--dsw-alias-border-l1, rgba(5,5,5,0.1))', color: 'var(--dsw-alias-label-secondary, #6b7280)', fontWeight: 500 },
  td: { padding: '6px 8px', borderBottom: '1px solid var(--dsw-alias-border-l3, rgba(5,5,5,0.06))' },
  empty: { color: 'var(--dsw-alias-label-secondary, #6b7280)', fontSize: '12px', padding: '10px 4px' },
  button: {
    padding: '5px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer',
    // button-info-fill 是宿主两个主题下都为蓝色、白字可读的主操作色（brand-primary 在深色主题是近白色，白字不可读）。
    fontSize: '11px', background: 'var(--dsw-alias-button-info-fill, #2563eb)', color: '#fff',
    whiteSpace: 'nowrap',
  },
  secondary: {
    padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px',
    border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.15))',
    background: 'var(--dsw-alias-bg-layer-1, #fafafa)', color: 'var(--dsw-alias-label-primary, #1f2328)',
    whiteSpace: 'nowrap',
  },
  input: {
    width: '100%', padding: '6px 10px', borderRadius: '6px', fontSize: '12px',
    border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.15))',
    background: 'var(--dsw-alias-bg-base, #fff)', color: 'var(--dsw-alias-label-primary, #1f2328)',
    boxSizing: 'border-box',
  },
  formRow: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' },
  formInline: { display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '8px' },
  // select 用系统外观时 Windows 浅色模式下强制白底，深色主题下不可读——自绘外观走主题变量。
  select: {
    appearance: 'none', WebkitAppearance: 'none',
    padding: '6px 26px 6px 10px', borderRadius: '6px', fontSize: '12px',
    border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.15))',
    background: 'var(--dsw-alias-bg-base, #fff)', color: 'var(--dsw-alias-label-primary, #1f2328)',
    backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%226%22><path d=%22M1 1l4 4 4-4%22 stroke=%22%23888%22 stroke-width=%221.5%22 fill=%22none%22/></svg>")',
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center',
    cursor: 'pointer', boxSizing: 'border-box', maxWidth: '100%',
  },
  actionRow: { display: 'flex', gap: '10px', alignItems: 'center' },
  result: {
    whiteSpace: 'pre-wrap', fontSize: '12px', lineHeight: 1.6,
    background: 'var(--dsw-alias-bg-base, #fff)', border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))',
    borderRadius: '6px', padding: '10px 12px', maxHeight: '320px', overflowY: 'auto',
  },
  badge: (color: string): React.CSSProperties => {
    const rgb = parseColor(color)
    if (rgb === null) {
      return { display: 'inline-block', padding: '1px 8px', borderRadius: '4px', fontSize: '11px', background: `${color}22`, color }
    }
    const [r, g, b] = rgb
    // 底色统一 16% 色调；文字色主题自适应（浅色深化到白底可读）。
    return {
      display: 'inline-block', padding: '1px 8px', borderRadius: '4px', fontSize: '11px',
      background: `rgba(${r}, ${g}, ${b}, 0.16)`,
      color: themeAwareText(color),
    }
  },
  sectionTitle: { fontWeight: 600, fontSize: '12px', marginBottom: '8px' },
  what: { fontSize: '12px', lineHeight: 1.7, margin: '4px 0 8px' },
  logicStep: { fontSize: '12px', lineHeight: 1.8, display: 'flex', gap: '6px' },
  riskItem: { fontSize: '12px', lineHeight: 1.7, margin: '2px 0' },
  commitRow: (active: boolean): React.CSSProperties => ({
    padding: '8px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    border: active ? '1px solid var(--dsw-alias-brand-primary, #2563eb)' : '1px solid transparent',
    background: active ? 'rgba(37,99,235,0.06)' : 'transparent',
    marginBottom: '4px',
  }),
  commitSubject: { fontSize: '12px', fontWeight: 600, lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  commitMeta: { fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)', marginTop: '2px', display: 'flex', gap: '8px' },
  patch: {
    fontFamily: 'monospace', fontSize: '11px', lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-all',
    background: 'var(--dsw-alias-bg-base, #fff)', border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))',
    borderRadius: '6px', padding: '10px', maxHeight: '320px', overflowY: 'auto',
  },
  textarea: {
    width: '100%', padding: '8px 10px', borderRadius: '6px', fontSize: '12px',
    border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.15))',
    background: 'var(--dsw-alias-bg-base, #fff)', color: 'var(--dsw-alias-label-primary, #1f2328)',
    boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.7, fontFamily: 'inherit',
  },
  noteCard: {
    border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.1))',
    borderRadius: '8px', padding: '12px 14px', marginBottom: '10px',
    background: 'var(--dsw-alias-bg-base, #fff)',
  },
  noteTitleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' },
  noteTitleText: { fontSize: '13px', fontWeight: 600, lineHeight: 1.5 },
  noteContent: {
    fontSize: '12px', lineHeight: 1.85, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
    color: 'var(--dsw-alias-label-primary, #1f2328)', marginTop: '6px',
  },
  noteClamp: {
    display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical', overflow: 'hidden',
  },
  noteMeta: {
    display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px',
    fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)',
  },
  linkBtn: {
    background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', padding: '0',
    color: 'var(--dsw-alias-brand-primary, #2563eb)',
  },
  chip: (active: boolean): React.CSSProperties => ({
    padding: '2px 10px', borderRadius: '999px', fontSize: '11px', cursor: 'pointer',
    border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.15))',
    // 同 tab：active 填色一律 button-info-fill（两主题都蓝），禁用 brand-primary。
    background: active ? 'var(--dsw-alias-button-info-fill, #2563eb)' : 'transparent',
    color: active ? '#fff' : 'inherit',
  }),
}

/** 风险等级 → 徽章颜色。 */
const RISK_COLOR: Record<string, string> = { low: '#4ec9b0', medium: '#dcdcaa', high: '#ce9178', critical: '#f14c4c' }

/**
 * 影响范围 SVG 流程图：三列分层（变更 → 间接引用链 → 潜在），
 * 依据 /impact-scope 返回的 levels（含传播链 reason）绘制连线。
 * 全宽画布（viewBox 1000），节点带目录提示，深度越深颜色越浅。
 */
function ImpactGraph(props: { data: ImpactScopePayload; t: (key: string) => string }) {
  const { data } = props
  const indirect = data.levels.filter((item) => item.level === 'indirect')
  const potential = data.levels.filter((item) => item.level === 'potential')
  const col0 = data.changedFiles.slice(0, 7)
  const col1 = Array.from(new Set(indirect.map((item) => item.path))).slice(0, 9)
  const col2 = Array.from(new Set(potential.map((item) => item.path))).filter((p) => !col1.includes(p)).slice(0, 8)
  const nodeH = 30
  const gap = 10
  const colX = [30, 380, 720]
  const colW = 280
  const rows = Math.max(col0.length, col1.length, col2.length, 1)
  const height = rows * (nodeH + gap) + 60

  const depthOf = (path: string): number => {
    const item = indirect.find((entry) => entry.path === path) ?? potential.find((entry) => entry.path === path)
    return item?.depth ?? 0
  }

  const renderCol = (col: number, items: string[], color: string): React.ReactNode[] => items.map((path, index) => {
    const y = 44 + index * (nodeH + gap)
    const dir = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : ''
    return React.createElement('g', { key: `${col}-${path}` },
      React.createElement('rect', { x: colX[col], y, width: colW, height: nodeH, rx: 6, fill: color, stroke: 'rgba(0,0,0,0.3)', strokeWidth: 1 }),
      React.createElement('text', { x: colX[col] + 10, y: y + 14, fontSize: 12, fontWeight: 700, fill: '#ffffff' },
        (path.split('/').pop() ?? path).slice(0, 30)),
      React.createElement('text', { x: colX[col] + 10, y: y + 26, fontSize: 10, fill: 'rgba(255,255,255,0.92)' },
        dir.slice(0, 40)),
      React.createElement('title', null, path),
    )
  })

  const chainStart = (reason: string): string => {
    const match = reason.match(/path: (.+)$/)
    if (match === null) return data.changedFiles[0] ?? ''
    return match[1]!.split(' -> ')[0] ?? data.changedFiles[0] ?? ''
  }
  const indexIn = (items: string[], path: string): number => items.indexOf(path)
  const colOf = (path: string): number => {
    if (col0.includes(path)) return 0
    if (col1.includes(path)) return 1
    if (col2.includes(path)) return 2
    return -1
  }

  const edges: React.ReactNode[] = []
  const pushEdge = (fromPath: string, toPath: string, color: string, key: string): void => {
    const fromCol = colOf(fromPath)
    const toCol = colOf(toPath)
    if (fromCol === -1 || toCol === -1 || toCol <= fromCol) return
    const x1 = colX[fromCol] + colW
    const y1 = 44 + indexIn([col0, col1, col2][fromCol] ?? [], fromPath) * (nodeH + gap) + nodeH / 2
    const x2 = colX[toCol]
    const y2 = 44 + indexIn([col0, col1, col2][toCol] ?? [], toPath) * (nodeH + gap) + nodeH / 2
    edges.push(React.createElement('path', {
      key, d: `M ${x1} ${y1} C ${x1 + 30} ${y1}, ${x2 - 30} ${y2}, ${x2} ${y2}`,
      fill: 'none', stroke: color, strokeWidth: 1.6, opacity: 0.6,
    }))
  }
  for (const item of indirect.slice(0, 20)) pushEdge(chainStart(item.reason), item.path, themeAwareText('#d97706'), `ei-${item.path}`)
  for (const item of potential.slice(0, 16)) pushEdge(chainStart(item.reason), item.path, themeAwareText('#57606a'), `ep-${item.path}`)

  return React.createElement('div', null,
    React.createElement('svg', { width: '100%', viewBox: `0 0 1024 ${height}`, style: { maxHeight: 480 } },
      [['变更文件', 0], ['间接影响（谁引用了它）', 1], ['潜在影响（二级传播）', 2]].map(([name, col]) =>
        React.createElement('text', { key: String(col), x: colX[col as number], y: 24, fontSize: 12, fontWeight: 700, fill: 'var(--dsw-alias-label-primary, #1f2328)' }, name as string)),
      renderCol(0, col0, '#2563eb'),
      renderCol(1, col1, '#d97706'),
      renderCol(2, col2, '#57606a'),
      edges,
    ),
  )
}

const DIFF_KEYWORDS = /\b(public|private|protected|internal|static|void|class|struct|interface|enum|new|return|if|else|for|foreach|while|switch|case|break|continue|try|catch|finally|throw|using|namespace|import|export|from|const|let|var|async|await|function|this|base|super|null|true|false|override|virtual|abstract|sealed|readonly|params|out|ref|yield|typeof|instanceof|in|of|default|string|int|long|double|float|bool|char|decimal|object|record|partial|get|set|require|module|type|implements|extends)\b/g

/** 单行代码高亮：注释 > 字符串 > 关键字/数字 三层着色（轻量正则，够核查用）。 */
function highlightCodeLine(line: string, keyPrefix: string): React.ReactNode[] {
  const trimmed = line.trimStart()
  if (trimmed.startsWith('//') || trimmed.startsWith('///') || trimmed.startsWith('*') || trimmed.startsWith('/*') || trimmed.startsWith('#')) {
    return [React.createElement('span', { key: `${keyPrefix}-c`, style: { color: themeAwareText('#6a9955') } }, line)]
  }
  const parts = line.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g)
  return parts.map((part, i) => {
    if (i % 2 === 1) return React.createElement('span', { key: `${keyPrefix}-s${i}`, style: { color: themeAwareText('#ce9178') } }, part)
    const sub: React.ReactNode[] = []
    let last = 0
    for (const match of part.matchAll(DIFF_KEYWORDS)) {
      if (match.index! > last) sub.push(part.slice(last, match.index))
      sub.push(React.createElement('span', { key: `${keyPrefix}-k${i}-${match.index}`, style: { color: themeAwareText('#569cd6') } }, match[0]))
      last = match.index! + match[0].length
    }
    if (last < part.length) sub.push(part.slice(last))
    return React.createElement(React.Fragment, { key: `${keyPrefix}-p${i}` }, sub)
  })
}

/** 高亮差异视图：解析 unified diff，按 增/删/块头/上下文 着色。 */
function DiffView(props: { patch: string }) {
  const lines = props.patch.split('\n').filter((line, i) => !(line === '' && i === props.patch.split('\n').length - 1))
  return React.createElement('div', {
    style: {
      fontFamily: 'Consolas, monospace', fontSize: '11px', lineHeight: 1.55,
      background: 'var(--dsw-alias-bg-base, #fff)', border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))',
      borderRadius: '6px', padding: '8px 0', maxHeight: 420, overflowY: 'auto', marginTop: '6px',
    },
  }, lines.map((line, i) => {
    const kind = line.startsWith('+++') || line.startsWith('---') ? 'meta'
      : line.startsWith('@@') ? 'hunk'
        : line.startsWith('+') ? 'add'
          : line.startsWith('-') ? 'del' : 'ctx'
    const bg = kind === 'add' ? 'rgba(46,160,67,0.14)' : kind === 'del' ? 'rgba(248,81,73,0.13)' : kind === 'hunk' ? 'rgba(56,139,253,0.1)' : 'transparent'
    const content = kind === 'meta' || kind === 'hunk'
      ? React.createElement('span', { style: { color: themeAwareText('#0969da'), fontWeight: 600 } }, line)
      : kind === 'add' || kind === 'del'
        ? React.createElement('span', { style: { color: themeAwareText(kind === 'add' ? '#1a7f37' : '#cf222e'), fontWeight: 600 } }, line[0])
        : null
    return React.createElement('div', { key: i, style: { padding: '0 10px', background: bg, whiteSpace: 'pre-wrap', wordBreak: 'break-all' } },
      content,
      kind === 'add' || kind === 'del' ? highlightCodeLine(line.slice(1), `l${i}`) : highlightCodeLine(line, `l${i}`),
    )
  }))
}

function formatTime(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—'
  return new Date(value).toLocaleString()
}

/** 二次确认弹窗：遮罩 + 居中卡片，危险操作（删除笔记/变更/约束）共用。 */
function ConfirmDialog(props: { title: string; message: string; danger?: boolean; onCancel: () => void; onConfirm: () => void }) {
  return React.createElement(React.Fragment, null,
    React.createElement('div', {
      'data-testid': 'pc-confirm-overlay',
      style: {
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(2px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'pcFadeIn 0.15s ease-out',
      },
      onClick: props.onCancel,
    },
      React.createElement('div', {
        'data-testid': 'pc-confirm-card',
        style: {
          width: 400, maxWidth: 'calc(100vw - 48px)',
          background: 'var(--dsw-alias-bg-base, #fff)',
          borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          padding: '20px 22px 16px',
          onClick: (e: React.MouseEvent) => { e.stopPropagation() },
        },
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '10px' } },
          React.createElement('div', {
            style: {
              width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '17px',
              background: props.danger ? 'rgba(244,63,94,0.12)' : 'rgba(37,99,235,0.1)',
              color: props.danger ? themeAwareText('#e11d48') : themeAwareText('#2563eb'),
            },
          }, props.danger ? '!' : '?'),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: '14px', fontWeight: 600, marginBottom: '6px', color: 'var(--dsw-alias-label-primary, #1f2328)' } }, props.title),
            React.createElement('div', { style: { fontSize: '12px', lineHeight: 1.7, color: 'var(--dsw-alias-label-secondary, #6b7280)' } }, props.message),
          ),
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '18px' } },
          React.createElement('button', {
            style: { ...styles.secondary, padding: '7px 18px', borderRadius: '8px' },
            onClick: props.onCancel,
          }, '取消'),
          React.createElement('button', {
            'data-testid': 'pc-confirm-ok',
            style: {
              padding: '7px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 500,
              background: props.danger ? '#e11d48' : 'var(--dsw-alias-button-info-fill, #2563eb)', color: '#fff',
            },
            onClick: props.onConfirm,
          }, '确认删除'),
        ),
      ),
    ),
  )
}

/** 骨架小卡片。 */
function Card(props: { title?: React.ReactNode; children?: React.ReactNode }) {
  return React.createElement('div', { style: styles.card },
    props.title === undefined ? null : React.createElement('div', { style: styles.sectionTitle }, props.title),
    props.children)
}

/**
 * 工作台主组件：四页签（提交核查为默认）+ 轮询宿主 API + 按钮化操作。
 */
export function WorkspaceFrame(props: WorkspaceFrameProps) {
  const t = props.t ?? fallbackT
  const [tab, setTab] = useState<TabKey>('commits')
  const [state, setState] = useState<WorkspaceState | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [bootstrapping, setBootstrapping] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)
  const [actionResult, setActionResult] = useState<string | null>(null)
  const [changeTitle, setChangeTitle] = useState('')
  const [changeDesc, setChangeDesc] = useState('')
  const [memoryTitle, setMemoryTitle] = useState('')
  const [memoryContent, setMemoryContent] = useState('')
  const [confirmedText, setConfirmedText] = useState('')
  const [confirmedPaths, setConfirmedPaths] = useState('')

  // ── 提交核查状态 ──
  const [commitsData, setCommitsData] = useState<CommitsPayload | null>(null)
  const [commitsError, setCommitsError] = useState<string | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerFilter, setPickerFilter] = useState('')
  const [selectedTargets, setSelectedTargets] = useState<string[]>([])
  const [details, setDetails] = useState<Record<string, CommitDetailPayload>>({})
  const [detailLoading, setDetailLoading] = useState(false)
  const [impact, setImpact] = useState<ImpactScopePayload | null>(null)
  const [impactLoading, setImpactLoading] = useState(false)
  const [reviews, setReviews] = useState<Record<string, ReviewPayload>>({})
  const [reviewLoading, setReviewLoading] = useState(false)
  const [fileDiffs, setFileDiffs] = useState<Record<string, string>>({})
  const [confirmDialog, setConfirmDialog] = useState<{ title: string; message: string; danger?: boolean; onConfirm: () => void } | null>(null)
  const [notes, setNotes] = useState<NoteEntry[]>([])
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [noteTags, setNoteTags] = useState('')
  const [editingNote, setEditingNote] = useState<{ id: string; title: string; content: string; tags: string } | null>(null)
  const [noteSearch, setNoteSearch] = useState('')
  const [noteExpanded, setNoteExpanded] = useState<Record<string, boolean>>({})
  const [issuesData, setIssuesData] = useState<IssueEntry[] | null>(null)
  const [issueSeverityFilter, setIssueSeverityFilter] = useState('')
  const [issueStatusFilter, setIssueStatusFilter] = useState('')
  const [issueExpanded, setIssueExpanded] = useState<Record<string, boolean>>({})
  const [fixExpanded, setFixExpanded] = useState<Record<string, boolean>>({})
  const [verifyingTarget, setVerifyingTarget] = useState<string | null>(null)
  const [aiSummarizing, setAiSummarizing] = useState(false)
  const [narrative, setNarrative] = useState<{ narrative: string; cached: boolean; generatedAt?: number; costUsd?: number } | null>(null)
  const [narrativeBusy, setNarrativeBusy] = useState(false)
  const [peek, setPeek] = useState<{ path: string; line: number } | null>(null)
  const [peekData, setPeekData] = useState<PeekPayload | null>(null)
  const [peekBusy, setPeekBusy] = useState(false)
  const [narrativeError, setNarrativeError] = useState('')
  const [modelTiers, setModelTiers] = useState<Record<string, { provider: string; model: string }> | null>(null)
  const [modelOptions, setModelOptions] = useState<Array<{ provider: string; id: string; name: string }>>([])
  const [modelSaving, setModelSaving] = useState(false)
  const [modelSaved, setModelSaved] = useState(false)
  // ── 执行中心：计划确认 / Run 详情 / 例行任务 ──
  const [planConfirm, setPlanConfirm] = useState<{ changeId: string; steps: PlanConfirmStep[] } | null>(null)
  const [planBusy, setPlanBusy] = useState(false)
  const [runDetail, setRunDetail] = useState<RunDetail | null>(null)
  const [scheduledData, setScheduledData] = useState<ScheduledTaskEntry[] | null>(null)
  const [schedName, setSchedName] = useState('')
  const [schedOpen, setSchedOpen] = useState(true)
  const [schedType, setSchedType] = useState('review')
  const [schedTitle, setSchedTitle] = useState('')
  const [schedDesc, setSchedDesc] = useState('')
  const [schedInterval, setSchedInterval] = useState('1440')
  // ── 记忆面板：全量数据 / 同步报告 ──
  const [memoriesData, setMemoriesData] = useState<MemoriesPayload | null>(null)
  const [syncReport, setSyncReport] = useState<SyncReport | null>(null)
  const [memoryScope, setMemoryScope] = useState<'project' | 'branch'>('project')
  const [memoryType, setMemoryType] = useState('architecture_decision')
  const [memorySyncing, setMemorySyncing] = useState(false)
  const [execTitle, setExecTitle] = useState('')
  const [execModel, setExecModel] = useState('')
  const [execDesc, setExecDesc] = useState('')

  const post = async (path: string, body: Record<string, unknown>): Promise<{ ok: boolean; data: Record<string, unknown> }> => {
    const response = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...body, sessionId: props.sessionId }),
    })
    const data: unknown = await response.json()
    return { ok: response.ok, data: (data ?? {}) as Record<string, unknown> }
  }

  /** peek：打开某文件某行附近的代码上下文浮层（有界等待 10 秒）。 */
  peekOpener = (path: string, line: number): void => { void openPeek(path, line) }
  const openPeek = async (path: string, line: number): Promise<void> => {
    setPeek({ path, line })
    setPeekData(null)
    setPeekBusy(true)
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 10_000)
      const response = await fetch('/project-control/api/peek', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ path, line, sessionId: props.sessionId }),
        signal: controller.signal,
      })
      clearTimeout(timer)
      const data: unknown = await response.json()
      if (response.ok) setPeekData(data as PeekPayload)
    } catch {
      setPeekData({ exists: false })
    } finally {
      setPeekBusy(false)
    }
  }

  /** 工作轮次叙事：多个选中提交作为一个整体解读（缓存 + 可强制重新生成）。 */
  const loadNarrative = async (force = false): Promise<void> => {
    const shas = selectedTargets.filter((target) => target !== 'working')
    if (shas.length < 2) return
    setNarrativeBusy(true)
    setNarrativeError('')
    try {
      const { ok, data } = await post('/project-control/api/work-narrative', { shas, force })
      if (!ok) {
        setNarrativeError(String(data['error'] ?? 'error'))
        return
      }
      setNarrative({
        narrative: String(data['narrative'] ?? ''),
        cached: data['cached'] === true,
        generatedAt: data['generatedAt'] === undefined ? undefined : Number(data['generatedAt']),
        costUsd: data['costUsd'] === undefined ? undefined : Number(data['costUsd']),
      })
    } catch (error: unknown) {
      setNarrativeError(error instanceof Error ? error.message : String(error))
    } finally {
      setNarrativeBusy(false)
    }
  }

  const loadCommits = async (): Promise<void> => {
    try {
      const response = await fetch(`/project-control/api/commits?sessionId=${encodeURIComponent(props.sessionId ?? '')}&limit=60`)
      const data: unknown = await response.json()
      if (!response.ok) throw new Error((data as { error?: string }).error ?? `HTTP ${response.status}`)
      setCommitsData(data as CommitsPayload)
      setCommitsError(null)
    } catch (error: unknown) {
      setCommitsError(error instanceof Error ? error.message : String(error))
    }
  }

  const loadNotes = async (): Promise<void> => {
    try {
      const response = await fetch('/project-control/api/notes?sessionId=' + encodeURIComponent(props.sessionId ?? ''))
      const data: unknown = await response.json()
      if (response.ok) setNotes((data as { notes: NoteEntry[] }).notes ?? [])
    } catch {
      // 笔记加载失败不打断页面：列表保持原样。
    }
  }

  /** 勾选/取消一次提交：重算选中集合，并按需补齐每条提交的 AI 解读（服务端有缓存）。 */
  const toggleTarget = async (target: string): Promise<void> => {
    setSelectedTargets((previous) => {
      if (previous.includes(target)) return previous.filter((item) => item !== target)
      return [...previous, target]
    })
    setImpact(null)
    setReviews({})
    if (!selectedTargets.includes(target)) {
      await loadDetail(target, false)
    }
  }

  /** 整轮选择：整轮已选时再点 = 取消整轮；新勾选的提交各自拉取 AI 解读。 */
  const selectRound = (shas: string[]): void => {
    setImpact(null)
    setReviews({})
    if (shas.every((sha) => selectedTargets.includes(sha))) {
      setSelectedTargets((previous) => previous.filter((sha) => !shas.includes(sha)))
      return
    }
    const added = shas.filter((sha) => !selectedTargets.includes(sha))
    setSelectedTargets((previous) => Array.from(new Set([...previous, ...shas])))
    for (const sha of added) void loadDetail(sha, false)
  }

  /** 拉取单条提交的 AI 解读；force=true 时绕过缓存强制重算。失败写入错误占位（卡片不崩溃）。 */
  const loadDetail = async (target: string, force: boolean): Promise<void> => {
    setDetailLoading(true)
    try {
      const { ok, data } = await post('/project-control/api/commit-detail', { sha: target, force })
      if (!ok) {
        setDetails((previous) => ({
          ...previous,
          [target]: {
            sha: target,
            isWorking: target === 'working',
            files: [],
            insertions: 0,
            deletions: 0,
            patchTruncated: false,
            patch: '',
            commit: null,
            analysis: { what: 'AI 解读失败：' + String(data['error'] ?? '') + '（点「重新生成」可重试）', logic: [], risks: [] },
          } as unknown as CommitDetailPayload,
        }))
        return
      }
      setDetails((previous) => ({ ...previous, [target]: data as unknown as CommitDetailPayload }))
    } catch (error: unknown) {
      setLoadError(error instanceof Error ? error.message : String(error))
    } finally {
      setDetailLoading(false)
    }
  }

  const loadImpact = async (force = false): Promise<void> => {
    if (selectedTargets.length === 0) return
    setImpactLoading(true)
    try {
      const { ok, data } = await post('/project-control/api/impact-scope', { shas: selectedTargets, force })
      setImpact(ok ? (data as unknown as ImpactScopePayload) : null)
    } finally {
      setImpactLoading(false)
    }
  }

  const loadReviews = async (force = false): Promise<void> => {
    if (selectedTargets.length === 0) return
    setReviewLoading(true)
    try {
      for (const target of selectedTargets) {
        const { ok, data } = await post('/project-control/api/review', { sha: target, force })
        const payload = data as unknown as ReviewPayload
        setReviews((previous) => ({
          ...previous,
          [target]: ok ? payload : {
            issuesFound: 0,
            issues: '',
            verdict: '评审失败：' + String(payload['error'] ?? '') + '（可重新生成重试）',
            issueList: [],
            cached: false,
          },
        }))
      }
    } finally {
      setReviewLoading(false)
    }
  }

  const loadFileDiff = async (sha: string, path: string): Promise<void> => {
    const key = `${sha}|${path}`
    if (fileDiffs[key] !== undefined) {
      setFileDiffs((previous) => {
        const next = { ...previous }
        delete next[key]
        return next
      })
      return
    }
    const { data } = await post('/project-control/api/file-diff', { sha, path })
    setFileDiffs((previous) => ({ ...previous, [key]: String(data['patch'] ?? '') }))
  }

  const loadIssues = async (): Promise<void> => {
    try {
      const response = await fetch('/project-control/api/issues?sessionId=' + encodeURIComponent(props.sessionId ?? ''))
      const data: unknown = await response.json()
      if (response.ok) setIssuesData((data as { issues: IssueEntry[] }).issues ?? [])
    } catch {
      // 问题列表加载失败不打断页面：列表保持原样。
    }
  }

  /**
   * 问题复检：对该问题所属评审目标重跑检测（修复确认 + 最优性/最小侵入 + 新问题扫描），
   * 只有复检通过才自动置为已解决；结果以复检报告形式展示。
   */
  const verifyIssues = async (target: string): Promise<void> => {
    setVerifyingTarget(target)
    try {
      const { ok, data } = await post('/project-control/api/issues/verify', { target })
      if (!ok) {
        setActionResult('✗ ' + String(data['error'] ?? 'error'))
        return
      }
      const resolved = (data['resolved'] as string[] | undefined) ?? []
      const stillOpen = (data['stillOpen'] as Array<{ title: string; reason: string }> | undefined) ?? []
      const newIssues = (data['newIssues'] as Array<{ severity: string; title: string }> | undefined) ?? []
      const verdict = String(data['verdict'] ?? '')
      const lines = [
        `复检完成：已修复 ${resolved.length} · 仍未修复 ${stillOpen.length} · 新增问题 ${newIssues.length}`,
        ...(resolved.length > 0 ? [`✓ 已修复：${resolved.join('；')}`] : []),
        ...(stillOpen.length > 0 ? stillOpen.map((item) => `✗ 未修复：${item.title} —— ${item.reason}`) : []),
        ...(newIssues.length > 0 ? newIssues.map((item) => `＋ 新问题：[${item.severity}] ${item.title}`) : []),
        ...(verdict === '' ? [] : [`最优性：${verdict}`]),
      ]
      setActionResult(lines.join('\n'))
      await loadIssues()
    } catch (error: unknown) {
      setActionResult('✗ ' + (error instanceof Error ? error.message : String(error)))
    } finally {
      setVerifyingTarget(null)
    }
  }

  const addNote = async (): Promise<void> => {
    if (noteTitle.trim() === '' || noteContent.trim() === '') return
    const { ok } = await post('/project-control/api/notes', {
      title: noteTitle.trim(),
      content: noteContent.trim(),
      tags: noteTags,
      sha: selectedTargets.length === 0 ? undefined : selectedTargets[0],
    })
    if (ok) {
      setNoteTitle('')
      setNoteContent('')
      setNoteTags('')
      await loadNotes()
    }
  }

  const removeNote = async (id: string): Promise<void> => {
    await post('/project-control/api/notes/delete', { id })
    if (editingNote !== null && editingNote.id === id) setEditingNote(null)
    await loadNotes()
  }

  const saveNoteEdit = async (): Promise<void> => {
    if (editingNote === null) return
    await post('/project-control/api/notes/update', { id: editingNote.id, title: editingNote.title, content: editingNote.content, tags: editingNote.tags })
    setEditingNote(null)
    await loadNotes()
  }

  /** 置顶/取消置顶一条笔记。 */
  const toggleNotePin = async (note: NoteEntry): Promise<void> => {
    await post('/project-control/api/notes/update', { id: note.id, pinned: note.pinned !== true })
    await loadNotes()
  }

  /** 笔记导出为 .md 文件（浏览器端 Blob 下载；文件名按标题清洗，非法字符替换为下划线）。 */
  const exportNote = (note: NoteEntry): void => {
    const md = `# ${note.title}\n\n${note.content}\n`
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = (note.title.replace(/[\\/:*?"<>|]/g, '_').trim().slice(0, 60) || 'note') + '.md'
    anchor.click()
    URL.revokeObjectURL(url)
    setActionResult('✓ ' + t('notes.exportDone'))
  }

  /** AI 学习总结：对比上次总结做增量更新，把笔记+项目档案提炼成一份「活」的总结文档。 */
  const aiSummarize = async (): Promise<void> => {
    setAiSummarizing(true)
    try {
      const { ok, data } = await post('/project-control/api/notes/ai-summary', {})
      if (!ok) {
        setActionResult('✗ ' + String(data['error'] ?? 'error'))
        return
      }
      setActionResult(data['updated'] === true
        ? '✓ 已对比上次总结完成增量更新（新增变化见总结的「本次更新」一节），旧总结已合并替换'
        : '✓ 已生成首份学习总结')
      await loadNotes()
    } catch (error: unknown) {
      setActionResult('✗ ' + (error instanceof Error ? error.message : String(error)))
    } finally {
      setAiSummarizing(false)
    }
  }

  /** 页面创建执行：建变更 → LLM 生成编排计划 → 计划确认页（角色/模型/策略可调）→ 确认后启动。 */
  const startRun = async (): Promise<void> => {
    if (execTitle.trim() === '' || execDesc.trim() === '') return
    setBusy('startRun')
    setActionResult(null)
    try {
      const { ok, data } = await post('/project-control/api/runs/start', {
        title: execTitle.trim(), description: execDesc.trim(),
        ...(execModel === '' ? {} : (() => { const [provider, model] = execModel.split('/'); return { defaultModelProvider: provider ?? '', defaultModelId: model ?? '' } })()),
      })
      if (!ok) {
        setActionResult('✗ ' + String(data['error'] ?? 'error'))
        return
      }
      if (data['autoStarted'] === true) {
        setActionResult('✓ 已启动执行：' + String(data['runId'] ?? ''))
        setExecTitle('')
        setExecDesc('')
        await refreshState()
        return
      }
      const steps = (data['steps'] as Array<Record<string, unknown>> | undefined) ?? []
      setPlanConfirm({
        changeId: String(data['changeId'] ?? ''),
        steps: steps.map((step) => ({
          id: String(step['id'] ?? ''),
          title: String(step['title'] ?? ''),
          description: String(step['description'] ?? ''),
          targetFiles: (step['targetFiles'] as string[] | undefined) ?? [],
          role: String(step['role'] ?? 'coding'),
          acceptance: String(step['acceptance'] ?? ''),
          failurePolicy: String(step['failurePolicy'] ?? 'retry-escalate'),
          enabled: step['enabled'] !== false,
          modelProvider: '',
          modelId: '',
        })),
      })
      if (modelOptions.length === 0 && modelTiers === null) void loadModelConfig()
      setActionResult('✓ 计划已生成，请在下方确认编排后启动')
      setExecTitle('')
      setExecDesc('')
    } catch (error: unknown) {
      setActionResult('✗ ' + (error instanceof Error ? error.message : String(error)))
    } finally {
      setBusy(null)
    }
  }

  /** 计划确认页：保存编辑（新版本计划）并启动执行。 */
  const launchPlan = async (withEdits: boolean): Promise<void> => {
    if (planConfirm === null) return
    setPlanBusy(true)
    try {
      let changeId = planConfirm.changeId
      if (withEdits) {
        const { ok, data } = await post('/project-control/api/runs/plan/update', { changeId, steps: planConfirm.steps })
        if (!ok) {
          setActionResult('✗ ' + String(data['error'] ?? 'error'))
          return
        }
      }
      const { ok, data } = await post('/project-control/api/runs/launch', { changeId })
      if (!ok) {
        setActionResult('✗ ' + String(data['error'] ?? 'error'))
        return
      }
      setActionResult('✓ 已启动执行：' + String(data['runId'] ?? ''))
      setPlanConfirm(null)
      await refreshState()
    } catch (error: unknown) {
      setActionResult('✗ ' + (error instanceof Error ? error.message : String(error)))
    } finally {
      setPlanBusy(false)
    }
  }

  /** 加载 Run 详情（步骤时间线 + 任务工作记忆）。 */
  const loadRunDetail = async (id: string): Promise<void> => {
    try {
      const response = await fetch('/project-control/api/runs/detail?id=' + encodeURIComponent(id))
      const data: unknown = await response.json()
      if (response.ok) setRunDetail(data as RunDetail)
    } catch {
      setRunDetail(null)
    }
  }

  /** 恢复暂停/中断/失败的 Run。 */
  const resumeRun = async (runId: string, action: 'continue' | 'skip-current'): Promise<void> => {
    const { ok, data } = await post('/project-control/api/runs/resume', { runId, action })
    if (ok) {
      setActionResult('✓ 已恢复执行（' + action + '）')
      await refreshState()
      await loadRunDetail(runId)
    } else {
      setActionResult('✗ ' + String(data['error'] ?? 'error'))
    }
  }

  /** 加载例行任务列表。 */
  const loadScheduled = async (): Promise<void> => {
    try {
      const response = await fetch('/project-control/api/scheduled?sessionId=' + encodeURIComponent(props.sessionId ?? ''))
      const data: unknown = await response.json()
      if (response.ok) setScheduledData((data as { tasks: ScheduledTaskEntry[] }).tasks ?? [])
    } catch {
      // 列表加载失败不打断页面
    }
  }

  /** 创建 / 更新 / 删除 / 立即执行例行任务。 */
  const addScheduled = async (): Promise<void> => {
    const intervalMinutes = Number(schedInterval)
    if (schedName.trim() === '' || !Number.isFinite(intervalMinutes) || intervalMinutes < 1) {
      setActionResult('✗ 请填写任务名称与有效间隔（分钟）')
      return
    }
    const { ok, data } = await post('/project-control/api/scheduled', {
      name: schedName.trim(), type: schedType, intervalMinutes,
      title: schedTitle.trim() || undefined, description: schedDesc.trim() || undefined,
    })
    if (ok) {
      setSchedName(''); setSchedTitle(''); setSchedDesc('')
      setActionResult('✓ 例行任务已创建')
      await loadScheduled()
    } else {
      setActionResult('✗ ' + String(data['error'] ?? 'error'))
    }
  }

  const scheduledAction = async (path: string, body: Record<string, unknown>): Promise<void> => {
    const { ok, data } = await post('/project-control/api/scheduled/' + path, body)
    if (ok) await loadScheduled()
    else setActionResult('✗ ' + String(data['error'] ?? 'error'))
  }

  /** 加载记忆面板全量数据（含同步基线）。 */
  const loadMemories = async (): Promise<void> => {
    try {
      const response = await fetch('/project-control/api/memories?sessionId=' + encodeURIComponent(props.sessionId ?? ''))
      const data: unknown = await response.json()
      if (response.ok) setMemoriesData(data as MemoriesPayload)
    } catch {
      // 加载失败不打断页面
    }
  }

  /** 拉取同步：三向判定（失效提案/新增候选/自动续命）。 */
  const syncMemories = async (): Promise<void> => {
    setMemorySyncing(true)
    try {
      const { ok, data } = await post('/project-control/api/memory/sync', {})
      if (!ok && data['error'] !== undefined) {
        setSyncReport({ ok: false, error: String(data['error']) })
        return
      }
      setSyncReport(data as SyncReport)
      await loadMemories()
    } catch (error: unknown) {
      setSyncReport({ ok: false, error: error instanceof Error ? error.message : String(error) })
    } finally {
      setMemorySyncing(false)
    }
  }

  /** 同步报告后续：把选中的疑似过时项落为 stale / 归档。 */
  const applySync = async (ids: string[], action: 'mark-stale' | 'archive'): Promise<void> => {
    await post('/project-control/api/memory/sync/apply', { ids, action })
    setSyncReport((previous) => previous === null ? null : { ...previous, staleProposals: (previous.staleProposals ?? []).filter((proposal) => !ids.includes(proposal.id)) })
    await loadMemories()
  }

  /** 记忆状态操作（归档/恢复）与分支归一。 */
  const memoryAction = async (path: string, body: Record<string, unknown>): Promise<void> => {
    const { ok, data } = await post('/project-control/api/memory/' + path, body)
    if (ok) await loadMemories()
    else setActionResult('✗ ' + String(data['error'] ?? 'error'))
  }

  /** 记忆转笔记：引用进学习档案。 */
  const memoryToNote = async (memory: MemoryEntry): Promise<void> => {
    const { ok } = await post('/project-control/api/notes', {
      title: memory.title,
      content: memory.content + (memory.basisSha !== null ? `\n（来源：项目记忆 ${memory.basisSha.slice(0, 8)}）` : ''),
      tags: '记忆, ' + memory.type,
    })
    if (ok) setActionResult('✓ 已把记忆转为笔记')
  }

  // 会话打开/切换时官方会 closeDetails 收起轨道；看门狗每 500ms 检查，
  // 只要当前有会话而工作台列宽 < 50px 就重新撑开（确定性，不依赖 effect 时序）。
  // 同一拍维持统计行钳制：会话切换会换掉统计行 DOM，样式表缺失时按当前
  // 构建哈希重注入（幂等，已存在则跳过）。
  const layoutFace = (props as unknown as { layout?: { openDetails?: () => void } }).layout
  useEffect(() => {
    applyStatsLineClamp()
    const timer = setInterval(() => {
      if (document.getElementById('pc-stats-clamp') === null) applyStatsLineClamp()
      const chat = document.querySelector('div[class*="centerCol"]')
      const width = chat ? Math.round(chat.getBoundingClientRect().width) : -1
      if (width !== -1 && width < 50) layoutFace?.openDetails?.()
    }, 500)
    return () => { clearInterval(timer) }
  }, [props.sessionId, layoutFace])

  /** 以 important 内联样式直接写官方网格模板（最高优先级，任何重渲染不会覆盖）。 */
  const frameTemplateSet = (chatPx: number): void => {
    const sidebar = document.querySelector('div[class*="sidebarCol"]')
    const sidebarW = sidebar ? Math.max(56, Math.round(sidebar.getBoundingClientRect().width)) : 280
    document.querySelector('div[class*="frame"][style*="grid-template-columns"]')
      ?.style.setProperty('grid-template-columns', sidebarW + 'px minmax(0, 1fr) ' + chatPx + 'px', 'important')
  }

  // 聊天列宽记忆（官方 layout store 瞬态）：挂载恢复 + 拖拽直写内联模板。
  // 必须写 important——LAYOUT_STYLE 的模板规则也是 important，非 important
  // 内联会被它压制（这就是此前"拖拽生效、刷新后记忆丢失"的原因）。
  // 官方 React 重渲染会改写内联模板，MutationObserver 按当前值守卫重写
  // （值相同不会触发新的 mutation，无回环）。
  useEffect(() => {
    const saved = Number(localStorage.getItem('pc.chatWidth') ?? '')
    const apply = (): void => {
      const frame = document.querySelector('div[class*="frame"][style*="grid-template-columns"]') as HTMLElement | null
      // 仅当内联模板不是我们的 important 声明时写入：官方 React 重渲染会把
      // 内联改回非 important（此时样式表规则接管、聊天宽回落 360），观察器
      // 随即重写夺回；我们自己的写入保持 important，不再触发下一轮。
      if (frame === null || frame.style.getPropertyPriority('grid-template-columns') === 'important') return
      const chatW = Number.isFinite(saved) && saved >= 280 ? saved : 360
      frameTemplateSet(chatW)
    }
    apply()
    const frame = document.querySelector('div[class*="frame"][style*="grid-template-columns"]')
    const observer = new MutationObserver(() => { apply() })
    if (frame !== null) observer.observe(frame, { attributes: true, attributeFilter: ['style'] })
    return () => { observer.disconnect() }
  }, [])

  /** 分隔条拖拽：调整聊天列宽（工作台吸收剩余空间），写入 localStorage 记忆。 */
  const onDividerDown = (e: React.PointerEvent): void => {
    e.preventDefault()
    const onMove = (ev: PointerEvent): void => {
      const width = Math.min(900, Math.max(280, window.innerWidth - ev.clientX))
      frameTemplateSet(width)
      localStorage.setItem('pc.chatWidth', String(width))
    }
    const onUp = (): void => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  useEffect(() => {
    let disposed = false
    const load = async (): Promise<void> => {
      try {
        const response = await fetch('/project-control/api/state?sessionId=' + encodeURIComponent(props.sessionId ?? ''), { headers: { accept: 'application/json' } })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data: unknown = await response.json()
        if (!disposed) {
          setState(data as WorkspaceState)
          setLoadError(null)
        }
      } catch (error: unknown) {
        if (!disposed) setLoadError(error instanceof Error ? error.message : String(error))
      }
    }
    void load()
    const timer = setInterval(() => { void load() }, 4000)
    return () => {
      disposed = true
      clearInterval(timer)
    }
  }, [])

  // 进入提交/笔记/Review 页签时按需拉取（提交列表依赖会话工作区，轮询无意义）。
  // 提交页也拉笔记：轮次未消化标记需要「上次 AI 总结时间」。
  useEffect(() => {
    if (tab === 'commits') { void loadCommits(); void loadNotes() }
    if (tab === 'notes') { void loadNotes(); void loadMemories(); if (commitsData === null) void loadCommits() }
    if (tab === 'review') void loadIssues()
    if (tab === 'execution') { void loadScheduled(); if (runDetail !== null) void loadRunDetail(runDetail.run.id) }
    if (tab === 'settings' && modelTiers === null) void loadModelConfig()
  }, [tab, props.sessionId])

  const loadModelConfig = async (): Promise<void> => {
    try {
      const response = await fetch('/project-control/api/model-config')
      if (!response.ok) return
      const data: unknown = await response.json()
      setModelTiers((data as { tiers: Record<string, { provider: string; model: string }> }).tiers ?? {})
      setModelOptions((data as { options: Array<{ provider: string; id: string; name: string }> }).options ?? [])
    } catch {
      // 模型配置加载失败不打断页面
    }
  }

  const saveModelConfig = async (): Promise<void> => {
    if (modelTiers === null) return
    setModelSaving(true)
    setModelSaved(false)
    try {
      const response = await fetch('/project-control/api/model-config', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ tiers: modelTiers }),
      })
      if (response.ok) {
        setModelSaved(true)
        setTimeout(() => { setModelSaved(false) }, 2500)
      }
    } finally {
      setModelSaving(false)
    }
  }

  const refreshState = async (): Promise<void> => {
    const refreshed = await fetch('/project-control/api/state?sessionId=' + encodeURIComponent(props.sessionId ?? ''), { headers: { accept: 'application/json' } })
    if (refreshed.ok) setState(await refreshed.json() as WorkspaceState)
  }

  /** 统一动作执行器：POST 宿主 API（携带会话 id 供服务端定位项目工作区），输出进结果面板，完成后刷新状态。 */
  const runAction = async (name: string, path: string, body: Record<string, unknown>): Promise<void> => {
    setBusy(name)
    setActionResult(null)
    try {
      const { ok, data } = await post(path, body)
      if (!ok) {
        setActionResult(`✗ ${String(data['error'] ?? 'error')}`)
        return
      }
      setActionResult(formatActionResult(data))
      await refreshState()
    } catch (error: unknown) {
      setActionResult(`✗ ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setBusy(null)
    }
  }

  const runBootstrap = async (): Promise<void> => {
    setBootstrapping(true)
    try {
      const { ok, data } = await post('/project-control/api/bootstrap', {})
      if (!ok) {
        setLoadError(String(data['error'] ?? 'error'))
        return
      }
      await refreshState()
    } catch (error: unknown) {
      setLoadError(error instanceof Error ? error.message : String(error))
    } finally {
      setBootstrapping(false)
    }
  }

  const confirmMemory = async (memoryId: string): Promise<void> => {
    const { ok } = await post('/project-control/api/memory/confirm', { memoryId })
    if (ok) {
      setState((previous) => previous === null ? previous : {
        ...previous,
        memories: previous.memories?.map((memory) => memory.id === memoryId ? { ...memory, isHumanConfirmed: true, truthLevel: 'fact' } : memory),
      })
    }
  }

  const project = state?.project ?? null
  const bootstrap = state?.bootstrap ?? null
  const changes = state?.changes ?? []
  const runs = state?.runs ?? []
  const verifications = state?.verifications ?? []
  const confirmed = state?.confirmed ?? []
  const concepts = state?.concepts ?? []

  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: 'commits', label: t('tab.commits') },
    { key: 'overview', label: t('tab.overview') },
    { key: 'execution', label: t('tab.execution') },
    { key: 'review', label: t('tab.review') },
    { key: 'notes', label: t('tab.notes') },
    { key: 'settings', label: t('tab.settings') },
  ]

  /** 操作结果面板（总览页签的快捷动作共用）。 */
  const resultPanel = actionResult !== null
    ? React.createElement(Card, { title: t('result.panel') },
        React.createElement('div', { style: styles.result }, actionResult))
    : null
  // ── 提交核查页签 ──
  // 顶部：仓库栏 + 提交多选下拉（约 1/5 高度）；下方板块占全宽。
  const allTargets: Array<{ key: string; label: string; meta: string; sha: string }> = []
  if (commitsData !== null) {
    if (!commitsData.working.isClean) {
      allTargets.push({
        key: 'working',
        label: `● ${t('repo.working')}（${commitsData.working.fileCount}）`,
        meta: commitsData.working.files.slice(0, 3).map((file) => file.path.split('/').pop()).join(', '),
        sha: 'working',
      })
    }
    for (const commit of commitsData.commits) {
      const adds = commit.files.reduce((sum, file) => sum + file.adds, 0)
      const dels = commit.files.reduce((sum, file) => sum + file.dels, 0)
      allTargets.push({
        key: commit.sha,
        label: commit.subject,
        meta: `${commit.shortHash} · ${commit.author} · ${new Date(commit.date).toLocaleString()} · +${adds}/-${dels}`,
        sha: commit.sha,
      })
    }
  }
  const shortLabel = (sha: string): string => {
    if (sha === 'working') return t('repo.working')
    const target = allTargets.find((entry) => entry.sha === sha)
    return `${(target?.meta.split(' · ')[0]) ?? sha.slice(0, 7)} ${target?.label ?? ''}`.trim()
  }
  const filteredTargets = pickerFilter.trim() === ''
    ? allTargets
    : allTargets.filter((entry) => (entry.label + entry.meta).toLowerCase().includes(pickerFilter.trim().toLowerCase()))

  // ── 轮次聚类与未消化标记 ── 聚类规则与服务端 clusterCommits 一致（时间窗口 +
  // 文件零重叠，见 commit-rounds.ts）；未消化 = 上次 AI 总结之后的提交。
  const commitBySha = new Map((commitsData?.commits ?? []).map((commit) => [commit.sha, commit]))
  const lastSummaryAt = notes
    .filter((note) => note.sha === 'summary')
    .sort((left, right) => right.createdAt - left.createdAt)[0]?.createdAt
  const isUndigested = (date: number): boolean => lastSummaryAt === undefined || date > lastSummaryAt
  const undigestedCount = (commitsData?.commits ?? []).filter((commit) => isUndigested(commit.date)).length
  const commitRounds = clusterIntoRounds(commitsData?.commits ?? [])

  /** 下拉框的提交行（含未消化圆点；working 条目不标）。 */
  const renderPickerRow = (entry: { key: string; label: string; meta: string; sha: string }): React.ReactNode => {
    const commit = commitBySha.get(entry.sha)
    const undigested = commit !== undefined && isUndigested(commit.date)
    return (
      <div
        key={entry.key}
        style={{
          padding: '7px 12px', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center',
          background: selectedTargets.includes(entry.sha) ? 'rgba(37,99,235,0.07)' : 'transparent',
        }}
        onClick={() => { void toggleTarget(entry.sha) }}
      >
        <span style={{ width: '14px', color: 'var(--dsw-alias-brand-primary, #2563eb)', fontWeight: 700 }}>
          {selectedTargets.includes(entry.sha) ? '✓' : ''}
        </span>
        {undigested && (
          <span title={t('picker.undigested')} style={{ color: themeAwareText('#d97706'), fontSize: '10px', flexShrink: 0 }}>●</span>
        )}
        <span style={{ minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.label}</span>
          <span style={{ display: 'block', fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>{entry.meta}</span>
        </span>
      </div>
    )
  }

  const impactRiskColor = themeAwareText(impact === null ? '#57606a' : (RISK_COLOR[impact.riskLevel] ?? '#57606a'))

  const commitsTab = (
    <>
      {/* 仓库栏 */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={styles.badge('#2563eb')}>{commitsData?.branch ?? '—'}</span>
          <span style={{ fontSize: '12px' }}>{commitsData?.rootPath ?? project?.rootPath ?? '—'}</span>
          <span style={{ flex: 1 }} />
          <button style={styles.secondary} onClick={() => { void loadCommits() }}>{t('action.refresh')}</button>
          <button
            style={styles.secondary}
            disabled={busy !== null}
            onClick={() => { void runAction('scanHistory', '/project-control/api/bootstrap', { includeHistory: true, summarize: true, maxCommits: 30 }) }}
          >{busy === 'scanHistory' ? t('action.running') : t('repo.scanHistory')}</button>
        </div>
      </Card>
      {/* 提交多选下拉（紧凑；选中内容完整展示，允许自然换行） */}
      <Card title={t('picker.title')}>
        <div style={{ position: 'relative' }}>
          <button
            style={{ ...styles.secondary, width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', whiteSpace: 'normal' }}
            onClick={() => { setPickerOpen(!pickerOpen) }}
          >
            <span style={{ minWidth: 0 }}>
              {selectedTargets.length === 0
                ? t('picker.placeholder')
                : `${t('picker.selected')} ${selectedTargets.length}：${selectedTargets.map(shortLabel).join('；')}`}
            </span>
            <span style={{ marginLeft: '8px', flexShrink: 0 }}>▾</span>
          </button>
          {pickerOpen && (
            <>
              <div style={{ position: 'fixed', inset: 0, zIndex: 29 }} onClick={() => { setPickerOpen(false) }} />
              <div style={{
                position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 30,
                background: 'var(--dsw-alias-bg-base, #fff)', border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.15))',
                borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', overflow: 'hidden',
              }}>
                <div style={{ padding: '8px', borderBottom: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))', display: 'flex', gap: '6px' }}>
                  <input
                    style={styles.input}
                    placeholder={t('picker.filter')}
                    value={pickerFilter}
                    onChange={(e) => { setPickerFilter(e.target.value) }}
                  />
                  <button style={styles.secondary} onClick={() => { setSelectedTargets([]) }}>{t('picker.clear')}</button>
                </div>
                <div style={{ maxHeight: 420, overflowY: 'auto' }}>
                  {pickerFilter.trim() === '' ? (
                    (() => {
                      // 浏览视图：working 条目 + 按轮次分组的提交（单提交轮不显示组头，避免噪音）。
                      const nodes: React.ReactNode[] = []
                      const working = allTargets.find((entry) => entry.sha === 'working')
                      if (working !== undefined) nodes.push(renderPickerRow(working))
                      const bySha = new Map(allTargets.filter((entry) => entry.sha !== 'working').map((entry) => [entry.sha, entry]))
                      commitRounds.forEach((round, roundIndex) => {
                        const entries = round.commits
                          .map((commit) => bySha.get(commit.sha))
                          .filter((entry): entry is { key: string; label: string; meta: string; sha: string } => entry !== undefined)
                        if (entries.length === 0) return
                        if (entries.length === 1) {
                          nodes.push(renderPickerRow(entries[0]!))
                          return
                        }
                        const shas = entries.map((entry) => entry.sha)
                        const allSelected = shas.every((sha) => selectedTargets.includes(sha))
                        nodes.push(
                          <div key={`round-${roundIndex}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'var(--dsw-alias-bg-layer-1, #fafafa)', borderBottom: '1px solid var(--dsw-alias-border-l3, rgba(5,5,5,0.06))', fontSize: '11px' }}>
                            <span style={{ fontWeight: 600 }}>
                              🗓 {t(roundIndex === 0 ? 'picker.roundLatest' : 'picker.round').replace('{n}', String(roundIndex + 1))} · {String(entries.length)} {t('repo.commits')} · {new Date(round.firstAt).toLocaleDateString()}–{new Date(round.lastAt).toLocaleDateString()}
                            </span>
                            <span style={{ flex: 1 }} />
                            <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '10px' }} onClick={() => { selectRound(shas) }}>
                              {allSelected ? t('picker.roundClear') : t('picker.roundSelect')}
                            </button>
                          </div>,
                        )
                        for (const entry of entries) nodes.push(renderPickerRow(entry))
                      })
                      return nodes
                    })()
                  ) : (
                    filteredTargets.map((entry) => renderPickerRow(entry))
                  )}
                  {(pickerFilter.trim() === '' ? allTargets : filteredTargets).length === 0 && <div style={styles.empty}>{t('picker.noMatch')}</div>}
                </div>
              </div>
            </>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>{t('picker.hint')}</span>
          {undigestedCount > 0 && (
            <span title={t('picker.undigested')} style={{ fontSize: '11px', color: themeAwareText('#d97706') }}>
              ● {t('picker.undigestedCount').replace('{n}', String(undigestedCount))}
            </span>
          )}
          {detailLoading && <span style={styles.badge('#dcdcaa')}>{t('detail.aiLoading')}</span>}
        </div>
      </Card>

      {commitsError !== null && <Card><div style={styles.empty}>{t('repo.loadFailed')}: {commitsError}</div></Card>}
      {selectedTargets.length === 0 && <Card><div style={styles.empty}>{t('detail.pick')}</div></Card>}

      {/* 工作轮次叙事：多提交整体解读 */}
      {selectedTargets.filter((target) => target !== 'working').length >= 2 && (
        <Card title={'📖 ' + t('narrative.title')}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: narrative === null ? '0' : '8px' }}>
            <button style={styles.secondary} disabled={narrativeBusy} onClick={() => { void loadNarrative() }}>
              {narrativeBusy ? t('narrative.running') : '✨ ' + t('narrative.generate')}
            </button>
            {narrative !== null && narrative.cached && (
              <span style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>{t('cache.hit')}{narrative.generatedAt !== undefined ? ' · ' + new Date(narrative.generatedAt).toLocaleString() : ''}</span>
            )}
            {narrative !== null && renderCostBadge(narrative.costUsd, t('cost.tooltip'))}
            {narrative !== null && (
              <>
                <span style={{ flex: 1 }} />
                <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} disabled={narrativeBusy} onClick={() => { void loadNarrative(true) }}>{t('cache.regenerate')}</button>
              </>
            )}
          </div>
          {narrativeError !== '' && <div style={{ ...styles.empty, color: themeAwareText('#d1242f') }}>{narrativeError}</div>}
          {narrative !== null && (
            <div style={{ ...styles.what, whiteSpace: 'pre-wrap' }}>{renderStructuredContent(narrative.narrative)}</div>
          )}
        </Card>
      )}

      {/* 每条选中提交的 AI 解读 */}
      {selectedTargets.map((target) => {
        const d = details[target]
        const label = target === 'working' ? t('repo.working') : (d?.commit?.message ?? target.slice(0, 8))
        return (
          <Card key={`d-${target}`} title={`🔍 ${label}${target !== 'working' ? `（${target.slice(0, 8)}）` : ''}`}>
            {d !== undefined && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                {d.analysisCached === true && (
                  <span style={styles.badge('#8b8b8b')}>{t('cache.hit')}{d.analysisGeneratedAt ? ' · ' + new Date(d.analysisGeneratedAt).toLocaleString() : ''}</span>
                )}
                {renderCostBadge(d.analysisCostUsd, t('cost.tooltip') + (d.analysisTokens ? `（in ${d.analysisTokens.input} / out ${d.analysisTokens.output} tokens）` : ''))}
                <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { void loadDetail(target, true) }}>{t('cache.regenerate')}</button>
                <span style={{ flex: 1 }} />
                <button
                  style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }}
                  title={t('detail.saveNoteHint')}
                  onClick={() => {
                    const sha = target === 'working' ? 'working' : target
                    void post('/project-control/api/notes', {
                      title: `${t('detail.saveNoteTitle')}：${(d.commit?.message ?? target).slice(0, 60)}`,
                      content: [`【改了什么】\n${d.analysis.what}`, `【实现逻辑】\n${(d.analysis.logic ?? []).join('；')}`, `【风险点】\n${(d.analysis.risks ?? []).join('；')}`].filter((block) => !block.endsWith('】\n')).join('\n\n'),
                      sha, tags: '核查',
                    }).then(({ ok }) => { setActionResult(ok ? '✓ 已存为笔记（笔记页可查看）' : '✗ 保存失败') ; if (ok) void loadNotes() })
                  }}
                >💾 {t('detail.saveNote')}</button>
                <button
                  style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }}
                  title={t('detail.saveMemoryHint')}
                  onClick={() => {
                    const sha = target === 'working' ? undefined : target
                    void post('/project-control/api/memory', {
                      memoryType: 'risk_hotspot', sourceTag: 'review', basisSha: sha,
                      title: `核查结论：${(d.commit?.message ?? target).slice(0, 60)}`,
                      content: [d.analysis.what, (d.analysis.risks ?? []).join('；')].filter((part) => part !== '').join('\n---\n'),
                    }).then(({ ok }) => { setActionResult(ok ? '✓ 已沉淀为记忆（待确认队列）' : '✗ 保存失败'); if (ok) void loadMemories() })
                  }}
                >🧠 {t('detail.saveMemory')}</button>
              </div>
            )}
            {d === undefined ? (
              <div style={styles.empty}>{t('detail.aiLoading')}</div>
            ) : (
              <>
                {d.commit !== null && <div style={styles.commitMeta}>{d.commit.author} · {new Date(d.commit.date).toLocaleString()} · {d.files.length} {t('detail.files')} · +{d.insertions}/-{d.deletions}</div>}
                {d.analysis.what !== '' && (
                  <>
                    <div style={{ ...styles.sectionTitle, marginTop: '8px' }}>{t('detail.what')}</div>
                    <div style={styles.what}>{d.analysis.what}</div>
                  </>
                )}
                {d.analysis.logic.length > 0 && (
                  <>
                    <div style={styles.sectionTitle}>{t('detail.logic')}</div>
                    {d.analysis.logic.map((step, i) => (
                      <div key={i} style={styles.logicStep}>
                        <span style={{ color: 'var(--dsw-alias-brand-primary, #2563eb)', fontWeight: 600 }}>{i + 1}.</span>{step}
                      </div>
                    ))}
                  </>
                )}
                {d.analysis.risks.length > 0 && (
                  <>
                    <div style={{ ...styles.sectionTitle, marginTop: '6px' }}>{t('detail.risk')}</div>
                    {d.analysis.risks.map((risk, i) => <div key={i} style={{ ...styles.riskItem, color: themeAwareText('#9a6700') }}>⚠ {renderWithPeek(risk)}</div>)}
                  </>
                )}
                {/* 文件清单 + 逐文件高亮对比 */}
                <div style={{ ...styles.sectionTitle, marginTop: '10px' }}>{t('detail.files')}</div>
                <table style={styles.table}>
                  <tbody>
                    {d.files.map((file) => {
                      const key = `${target}|${file.path}`
                      const patch = fileDiffs[key]
                      return (
                        <>
                          <tr key={key}>
                            <td style={{ ...styles.td, fontFamily: 'monospace', fontSize: '11px', wordBreak: 'break-all' }}>{file.path}</td>
                            <td style={{ ...styles.td, color: themeAwareText('#1a7f37'), whiteSpace: 'nowrap' }}>+{file.adds}</td>
                            <td style={{ ...styles.td, color: themeAwareText('#cf222e'), whiteSpace: 'nowrap' }}>-{file.dels}</td>
                            <td style={{ ...styles.td, whiteSpace: 'nowrap' }}>
                              <button style={styles.secondary} onClick={() => { void loadFileDiff(target, file.path) }}>
                                {patch === undefined ? t('diff.show') : t('diff.hide')}
                              </button>
                            </td>
                          </tr>
                          {patch !== undefined && (
                            <tr key={`${key}-diff`}>
                              <td colSpan={4} style={{ ...styles.td, padding: 0 }}>
                                <DiffView patch={patch} />
                              </td>
                            </tr>
                          )}
                        </>
                      )
                    })}
                  </tbody>
                </table>
              </>
            )}
          </Card>
        )
      })}

      {/* 影响范围：按钮 + 风险构成 + 大图 + 影响点明细 + 记忆联动 */}
      {selectedTargets.length > 0 && (
        <Card title={t('detail.impact')}>
          <button style={styles.button} disabled={impactLoading} onClick={() => { void loadImpact() }}>
            {impactLoading ? t('detail.impactLoading') : t('detail.impact')}
          </button>
          {impact !== null && impact.explanationsCached === true && (
            <span style={{ ...styles.badge('#8b8b8b'), marginLeft: '8px' }}>
              {t('cache.hit')}{impact.generatedAt ? ' · ' + new Date(impact.generatedAt).toLocaleString() : ''}
            </span>
          )}
          {impact !== null && renderCostBadge(impact.explanationsCostUsd, t('cost.tooltip'))}
          {impact !== null && (
            <button style={{ ...styles.secondary, marginLeft: '8px', padding: '2px 8px', fontSize: '11px' }} disabled={impactLoading} onClick={() => { void loadImpact(true) }}>
              {t('cache.regenerate')}
            </button>
          )}
          {impact !== null && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0 4px', flexWrap: 'wrap' }}>
                <span style={{ ...styles.badge(impactRiskColor), fontSize: '13px', padding: '3px 10px' }}>
                  {t('impact.risk')}: {impact.riskLevel}（{impact.riskScore}）
                </span>
                {impact.keyChangePoints !== undefined && impact.keyChangePoints.length > 0 && (
                  <span style={{ fontSize: '11px', color: themeAwareText('#9a6700') }}>⚠ {t('impact.keyPoints')}: {impact.keyChangePoints.map((file) => file.split('/').pop()).join('、')}</span>
                )}
              </div>
              {impact.riskFactors !== undefined && impact.riskFactors.length > 0 && (
                <>
                  <div style={styles.sectionTitle}>{t('impact.factors')}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '10px' }}>
                    {impact.riskFactors.map((factor, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '3px 8px', background: 'var(--dsw-alias-bg-layer-1, #fafafa)', borderRadius: '4px' }}>
                        <span>{factor.text}</span>
                        <span style={{ color: impactRiskColor, fontWeight: 600 }}>+{factor.points}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <ImpactGraph data={impact} t={t} />
              {impact.levels.length === 0 && <div style={styles.empty}>{t('impact.none')}</div>}
              {/* 函数级影响：本次修改了哪些函数、波及了谁的哪些函数、调用点在哪 */}
              {impact.functionImpact !== undefined && impact.functionImpact.length > 0 && (
                <>
                  <div style={{ ...styles.sectionTitle, marginTop: '12px' }}>{t('impact.functions')}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {impact.functionImpact.map((entry) => (
                      <div key={entry.symbol} style={{ border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))', borderRadius: '6px', padding: '8px 10px', background: 'var(--dsw-alias-bg-base, #fff)' }}>
                        <div style={{ fontSize: '12px' }}>
                          <span style={styles.badge('#d97706')}>{entry.symbol}</span>
                          <span style={{ ...styles.label, marginLeft: '8px' }}>{entry.definedIn}</span>
                        </div>
                        {entry.role !== undefined && entry.role !== '' && (
                          <div style={{ ...styles.what, marginTop: '6px' }}>
                            <span style={{ ...styles.sectionTitle, display: 'inline', marginInlineEnd: '6px', color: 'var(--dsw-alias-brand-primary, #2563eb)' }}>{t('impact.funcRole')}</span>
                            {entry.role}
                          </div>
                        )}
                        {entry.change !== undefined && entry.change !== '' && (
                          <div style={{ ...styles.what }}>
                            <span style={{ ...styles.sectionTitle, display: 'inline', marginInlineEnd: '6px', color: themeAwareText('#9a6700') }}>{t('impact.funcChange')}</span>
                            {entry.change}
                          </div>
                        )}
                        {entry.impact !== undefined && entry.impact !== '' && (
                          <div style={{ ...styles.what, marginBottom: '6px' }}>
                            <span style={{ ...styles.sectionTitle, display: 'inline', marginInlineEnd: '6px', color: themeAwareText('#ce9178') }}>{t('impact.funcCallers')}</span>
                            {entry.impact}
                          </div>
                        )}
                        {entry.callers.map((caller, i) => (
                          <div key={i} style={{ ...styles.logicStep, marginTop: '3px' }}>
                            <span style={{ color: themeAwareText('#d97706') }}>↳</span>
                            <span style={{ fontFamily: 'monospace', fontSize: '11px', wordBreak: 'break-all' }}>
                              <span style={{ cursor: 'pointer', textDecoration: 'underline dotted' }} onClick={() => { void openPeek(caller.file, Number(caller.line)) }}>{caller.file}:{caller.line}</span>
                            </span>
                            <span style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>— {caller.snippet.slice(0, 80)}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {impact.functionImpact !== undefined && impact.functionImpact.length === 0 && (
                <div style={styles.empty}>{t('impact.functionsNone')}</div>
              )}
              {impact.memories !== undefined && impact.memories.length > 0 && (
                <div style={{ marginTop: '10px', padding: '8px 10px', border: '1px dashed rgba(37,99,235,0.35)', borderRadius: '6px' }}>
                  <div style={{ ...styles.sectionTitle, color: 'var(--dsw-alias-brand-primary, #2563eb)' }}>{t('impact.memory')}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {impact.memories.map((memory, i) => (
                      <span key={i} style={styles.badge('#2563eb')}>{memory.title}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </Card>
      )}

      {/* 最优性核查：结论 + 结构化问题清单 */}
      {selectedTargets.length > 0 && (
        <Card title={t('detail.optimality')}>
          <button style={styles.button} disabled={reviewLoading} onClick={() => { void loadReviews() }}>
            {reviewLoading ? t('detail.optimalityLoading') : t('detail.optimality')}
          </button>
          {selectedTargets.map((target) => {
            const r = reviews[target]
            if (r === undefined) return null
            const label = target === 'working' ? t('repo.working') : target.slice(0, 8)
            return (
              <div key={`r-${target}`} style={{ marginTop: '10px' }}>
                <div style={{ ...styles.sectionTitle, display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {label}
                  {r.cached === true && (
                    <span style={styles.badge('#8b8b8b')}>{t('cache.hit')}{r.generatedAt ? ' · ' + new Date(r.generatedAt).toLocaleString() : ''}</span>
                  )}
                  {renderCostBadge(r.costUsd, t('cost.tooltip'))}
                  <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { void loadReviews(true) }}>{t('cache.regenerate')}</button>
                </div>
                {r.verdict !== '' && (
                  <div style={{ ...styles.what, background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: '6px', padding: '8px 10px' }}>{r.verdict}</div>
                )}
                {r.issueList !== undefined && r.issueList.length > 0 ? (
                  <table style={styles.table}>
                    <thead>
                      <tr>{['review.col.severity', 'review.col.category', 'review.col.title', 'review.col.evidence', 'review.col.fix'].map((key) => <th key={key} style={styles.th}>{t(key)}</th>)}</tr>
                    </thead>
                    <tbody>
                      {r.issueList.map((issue, i) => (
                        <tr key={i}>
                          <td style={styles.td}><span style={styles.badge(issue.severity === 'critical' ? '#f14c4c' : issue.severity === 'high' ? '#ce9178' : issue.severity === 'medium' ? '#dcdcaa' : '#569cd6')}>{issue.severity}</span></td>
                          <td style={styles.td}>{issue.category}</td>
                          <td style={styles.td}>{issue.title}</td>
                          <td style={{ ...styles.td, fontFamily: 'monospace', fontSize: '11px', wordBreak: 'break-all' }}>{issue.evidence}</td>
                          <td style={styles.td}>{issue.fix}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div style={styles.empty}>{t('review.clean')}</div>
                )}
              </div>
            )
          })}
          {reviewLoading && <div style={styles.empty}>{t('detail.optimalityLoading')}</div>}
          {!reviewLoading && selectedTargets.every((target) => reviews[target] === undefined) && (
            <div style={styles.empty}>{t('review.hint')}</div>
          )}
        </Card>
      )}
    </>
  )

  // ── 设置页签 ──
  const TIER_LABELS: Array<{ key: string; zh: string; desc: string }> = [
    { key: 'standard', zh: '解读 / 函数影响说明', desc: '提交核查的 AI 解读、影响分析' },
    { key: 'reasoning', zh: '最优性核查 / 执行计划', desc: '评审、计划生成、AI 学习总结' },
    { key: 'fast', zh: '历史轻析', desc: '扫描历史时的逐提交一句话' },
    { key: 'verifier', zh: '验收', desc: '改动验收的 AI 复核' },
  ]

  const settingsTab = (
    <>
      {/* 模型分配：可视化切换各任务用的模型，保存即生效 */}
      <Card title={t('model.title')}>
        {modelTiers === null ? (
          <div style={styles.empty}>{t('model.loading')}</div>
        ) : (
          <>
            {TIER_LABELS.map((tier) => {
              const current = modelTiers[tier.key]
              const value = current ? current.provider + '/' + current.model : ''
              return (
                <div key={tier.key} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ minWidth: 150, fontSize: '12px', fontWeight: 600 }}>{tier.zh}</span>
                  <select
                    style={{ ...styles.select, width: 240 }}
                    value={value}
                    onChange={(e) => {
                      const v = e.target.value
                      if (v === '') { setModelTiers({ ...modelTiers, [tier.key]: { provider: '', model: '' } }); return }
                      const [provider, ...rest] = v.split('/')
                      const model = rest.join('/')
                      setModelTiers({ ...modelTiers, [tier.key]: { provider, model } })
                    }}
                  >
                    <option value="">{t('model.followChat')}</option>
                    {modelOptions.map((option) => (
                      <option key={option.provider + '/' + option.id} value={option.provider + '/' + option.id}>
                        {option.provider} / {option.name}
                      </option>
                    ))}
                  </select>
                  <span style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>{tier.desc}</span>
                </div>
              )
            })}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
              <button style={styles.button} disabled={modelSaving} onClick={() => { void saveModelConfig() }}>
                {modelSaving ? t('action.running') : t('model.save')}
              </button>
              {modelSaved && <span style={styles.badge('#4ec9b0')}>{t('model.saved')}</span>}
              <span style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>{t('model.hint')}</span>
            </div>
          </>
        )}
      </Card>
      <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--dsw-alias-label-tertiary, #9ca3af)', padding: '8px 0' }}>
        dsh-project-control v{state?.pluginVersion ?? '?'}
      </div>
    </>
  )

  const overviewTab = (
    <>
      <Card>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button style={styles.button} disabled={bootstrapping} onClick={() => { void runBootstrap() }}>
            {bootstrapping ? t('action.running') : t('action.rescan')}
          </button>
          <button style={styles.secondary} disabled={busy !== null} onClick={() => { void runAction('analyze', '/project-control/api/analyze', {}) }}>
            {busy === 'analyze' ? t('action.running') : t('action.analyze')}
          </button>
          <button style={styles.secondary} disabled={busy !== null} onClick={() => { void runAction('verify', '/project-control/api/verify', {}) }}>
            {busy === 'verify' ? t('action.running') : t('action.verify')}
          </button>
        </div>
      </Card>
      {resultPanel}
      {project === null ? (
        <Card>
          <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '6px' }}>{t('state.noProject')}</div>
          <div style={styles.empty}>{t('state.noProjectHint')}</div>
        </Card>
      ) : (
        <Card title={`${t('state.project')}：${project.name}`}>
          <div style={styles.row}>
            <span><span style={styles.label}>Root</span>{project.rootPath}</span>
          </div>
          {bootstrap !== null && (
            <>
              <div style={styles.row}>
                <span><span style={styles.label}>{t('state.techStack')}</span>
                  {bootstrap.techStack.map((tech) => <span key={tech} style={styles.badge('#4ec9b0')}>{tech}</span>)}
                </span>
              </div>
              <div style={styles.row}>
                <span><span style={styles.label}>{t('state.symbols')}</span>{String(bootstrap.symbolsCount)}</span>
                <span><span style={styles.label}>{t('state.manifests')}</span>{String(bootstrap.manifestFiles.length)}</span>
                <span><span style={styles.label}>{t('state.evidence')}</span>{String(state?.evidenceCount ?? 0)}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--dsw-alias-label-secondary, #6b7280)', marginTop: '8px' }}>{bootstrap.summary}</div>
            </>
          )}
        </Card>
      )}
      <Card title={t('confirmed.title')}>
        <div style={styles.formRow}>
          <textarea rows={2} style={styles.textarea} placeholder={t('confirmed.text')} value={confirmedText} onChange={(e) => { setConfirmedText(e.target.value) }} />
          <input style={styles.input} placeholder={t('confirmed.paths')} value={confirmedPaths} onChange={(e) => { setConfirmedPaths(e.target.value) }} />
          <button
            style={styles.button}
            disabled={busy !== null || confirmedText === ''}
            onClick={() => { void runAction('addConfirmed', '/project-control/api/confirmed', { type: 'constraint', text: confirmedText, forbiddenPaths: confirmedPaths.split(',').map((path) => path.trim()).filter((path) => path !== '') }).then(() => { setConfirmedText(''); setConfirmedPaths('') }) }}
          >{busy === 'addConfirmed' ? t('action.running') : t('confirmed.add')}</button>
        </div>
        {confirmed.length === 0 ? (
          <div style={styles.empty}>{t('confirmed.none')}</div>
        ) : (
          <table style={styles.table}>
            <tbody>
              {confirmed.map((item) => (
                <tr key={item.id}>
                  <td style={styles.td}><span style={styles.badge('#c586c0')}>{item.type}</span></td>
                  <td style={styles.td}>{item.text}</td>
                  <td style={styles.td}>{item.forbiddenPaths.join(', ') || '—'}</td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }}
                      onClick={() => { void runAction('removeConfirmed', '/project-control/api/confirmed/remove', { id: item.id }) }}
                    >✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
      <Card title={t('action.createChange')}>
        <div style={styles.formRow}>
          <input style={styles.input} placeholder={t('form.changeTitle')} value={changeTitle} onChange={(e) => { setChangeTitle(e.target.value) }} />
          <textarea rows={2} style={styles.textarea} placeholder={t('form.changeDesc')} value={changeDesc} onChange={(e) => { setChangeDesc(e.target.value) }} />
          <button
            style={styles.button}
            disabled={busy !== null || changeTitle === ''}
            onClick={() => { void runAction('createChange', '/project-control/api/changes', { title: changeTitle, description: changeDesc }).then(() => { setChangeTitle(''); setChangeDesc('') }) }}
          >{busy === 'createChange' ? t('action.running') : t('action.createChange')}</button>
        </div>
        {changes.length === 0 ? (
          <div style={styles.empty}>{t('state.noChanges')}</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>{['changes.col.title', 'changes.col.type', 'changes.col.status', 'changes.col.updated'].map((key) => <th key={key} style={styles.th}>{t(key)}</th>)}</tr>
            </thead>
            <tbody>
              {changes.map((change) => (
                <tr key={change.id}>
                  <td style={styles.td}>{change.title}</td>
                  <td style={styles.td}><span style={styles.badge(change.status === 'completed' ? '#4ec9b0' : '#569cd6')}>{change.status}</span></td>
                  <td style={styles.td}>{formatTime(change.updatedAt)}</td>
                  <td style={styles.td}>
                    <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { setConfirmDialog({ title: '删除这个变更任务？', message: '「' + change.title + '」及其全部执行记录、计划、问题清单将被永久删除。', danger: true, onConfirm: () => { void runAction('deleteChange', '/project-control/api/changes/delete', { id: change.id }) } }) }}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </>
  )

  // ── 执行中心页签：页面直接创建并启动执行，聊天只是另一种入口 ──
  const executionTab = (
    <>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '10px', padding: '7px 12px', borderRadius: '8px', background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.2)', fontSize: '11px' }}>
        <b>① {t('exec.flowCreate')}</b><span>→</span>
        <b>② {t('exec.flowOrchestrate')}</b><span>→</span>
        <b>③ {t('exec.flowRun')}</b><span>→</span>
        <b>④ {t('exec.flowMemory')}</b>
      </div>
      <Card title={t('exec.create')}>
        <div style={styles.formInline}>
          <input style={{ ...styles.input, flex: 1, minWidth: 200 }} placeholder={t('exec.formTitle')} value={execTitle} onChange={(e) => { setExecTitle(e.target.value) }} />
          <select style={{ ...styles.select, width: 'auto' }} value={execModel} onChange={(e) => { setExecModel(e.target.value) }} title={t('plan.modelDefault')}>
            <option value="">{t('exec.modelDefault')}</option>
            {(modelOptions ?? []).map((option) => <option key={option.provider + '/' + option.id} value={option.provider + '/' + option.id}>{option.provider}/{option.id}</option>)}
          </select>
        </div>
        <div style={styles.formRow}>
          <textarea style={styles.textarea} rows={3} placeholder={t('exec.formDesc')} value={execDesc} onChange={(e) => { setExecDesc(e.target.value) }} />
          <div style={styles.actionRow}>
            <button style={styles.button} disabled={busy !== null || execTitle.trim() === '' || execDesc.trim() === ''} onClick={() => { void startRun() }}>
              {busy === 'startRun' ? t('exec.planning') : t('exec.start')}
            </button>
            <span style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>{t('exec.createHint')}</span>
          </div>
        </div>
      </Card>
      {resultPanel}
      {planConfirm !== null && (
        <Card title={t('plan.title')}>
          <div style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)', marginBottom: '8px' }}>{t('plan.hint')}</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>{['plan.col.step', 'plan.col.role', 'plan.col.model', 'plan.col.policy', 'plan.col.enabled'].map((key) => <th key={key} style={styles.th}>{t(key)}</th>)}</tr>
              </thead>
              <tbody>
                {planConfirm.steps.map((step, index) => (
                  <tr key={step.id} style={{ opacity: step.enabled ? 1 : 0.45 }}>
                    <td style={{ ...styles.td, minWidth: 220 }}>
                      <div style={{ fontWeight: 600 }}>{index + 1}. {step.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>{step.description.slice(0, 120)}</div>
                      {step.targetFiles.length > 0 && (
                        <div style={{ fontSize: '10px', color: 'var(--dsw-alias-label-secondary, #6b7280)', fontFamily: 'var(--dsw-alias-font-mono, ui-monospace, monospace)' }}>{step.targetFiles.join(', ').slice(0, 120)}</div>
                      )}
                    </td>
                    <td style={styles.td}>
                      <select style={{ ...styles.select, width: 'auto', padding: '3px 6px' }} value={step.role}
                        onChange={(e) => { setPlanConfirm({ ...planConfirm, steps: planConfirm.steps.map((item, i) => i === index ? { ...item, role: e.target.value } : item) }) }}>
                        {['analysis', 'planning', 'coding', 'ops', 'verification'].map((role) => <option key={role} value={role}>{ROLE_LABELS[role] ?? role}</option>)}
                      </select>
                    </td>
                    <td style={styles.td}>
                      <select style={{ ...styles.select, width: 'auto', padding: '3px 6px' }} value={step.modelProvider + '/' + step.modelId}
                        onChange={(e) => {
                          const [provider, model] = e.target.value.split('/')
                          setPlanConfirm({ ...planConfirm, steps: planConfirm.steps.map((item, i) => i === index ? { ...item, modelProvider: provider ?? '', modelId: model ?? '' } : item) })
                        }}>
                        <option value="/">{t('plan.modelDefault')}</option>
                        {modelOptions.map((option) => <option key={option.provider + '/' + option.id} value={option.provider + '/' + option.id}>{option.provider}/{option.id}</option>)}
                      </select>
                    </td>
                    <td style={styles.td}>
                      <select style={{ ...styles.select, width: 'auto', padding: '3px 6px' }} value={step.failurePolicy}
                        onChange={(e) => { setPlanConfirm({ ...planConfirm, steps: planConfirm.steps.map((item, i) => i === index ? { ...item, failurePolicy: e.target.value } : item) }) }}>
                        {Object.entries(POLICY_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                      </select>
                    </td>
                    <td style={styles.td}>
                      <input type="checkbox" checked={step.enabled}
                        onChange={(e) => { setPlanConfirm({ ...planConfirm, steps: planConfirm.steps.map((item, i) => i === index ? { ...item, enabled: e.target.checked } : item) }) }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button style={styles.button} disabled={planBusy} onClick={() => { void launchPlan(true) }}>{planBusy ? '…' : t('plan.launchEdited')}</button>
            <button style={styles.secondary} disabled={planBusy} onClick={() => { void launchPlan(false) }}>{t('plan.launchDirect')}</button>
            <button style={styles.secondary} disabled={planBusy} onClick={() => { setPlanConfirm(null) }}>{t('plan.discard')}</button>
          </div>
        </Card>
      )}
      <Card>
        <div style={styles.row}>
          <span><span style={styles.label}>{t('exec.attempts')}</span>{String(state?.attemptsCount ?? 0)}</span>
        </div>
        {runs.length === 0 ? (
          <div style={styles.empty}>{t('state.noRuns')}</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>{['exec.col.change', 'exec.col.steps', 'exec.col.status', 'exec.col.started', 'exec.col.cost', 'exec.col.detail'].map((key) => <th key={key} style={styles.th}>{t(key)}</th>)}</tr>
            </thead>
            <tbody>
              {runs.map((run) => (
                <tr key={run.id}>
                  <td style={styles.td}>{(changes.find((change) => change.id === run.changeId)?.title) ?? run.changeId}</td>
                  <td style={styles.td}>{run.stepsTotal ? (run.stepsDone ?? 0) + '/' + run.stepsTotal : '—'}</td>
                  <td style={styles.td}>
                    <span style={styles.badge(run.status === 'succeeded' || run.status === 'completed' ? '#4ec9b0' : run.status === 'failed' ? '#f14c4c' : run.status === 'paused' ? '#d97706' : '#dcdcaa')}>{RUN_STATUS_LABELS[run.status] ?? run.status}</span>
                    {run.currentStep !== null && run.currentStep !== undefined && run.status === 'running' && (
                      <div style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{run.currentStep}</div>
                    )}
                  </td>
                  <td style={styles.td}>{formatTime(run.startedAt)}</td>
                  <td style={styles.td}>{run.costUsd !== undefined ? '$' + run.costUsd.toFixed(4) : '—'}</td>
                  <td style={styles.td}>
                    <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { void loadRunDetail(run.id) }}>{runDetail?.run.id === run.id ? t('plan.refreshDetail') : t('plan.viewDetail')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </Card>
      {runDetail !== null && (
        <Card title={t('plan.detailTitle') + ' · ' + runDetail.run.changeTitle}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '8px' }}>
            <span style={styles.badge(runDetail.run.status === 'succeeded' || runDetail.run.status === 'completed' ? '#4ec9b0' : runDetail.run.status === 'failed' ? '#f14c4c' : runDetail.run.status === 'paused' ? '#d97706' : '#dcdcaa')}>{RUN_STATUS_LABELS[runDetail.run.status] ?? runDetail.run.status}</span>
            {runDetail.run.error !== null && <span style={{ fontSize: '11px', color: themeAwareText('#d1242f') }}>{runDetail.run.error.message}</span>}
            <span style={{ flex: 1 }} />
            <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { void loadRunDetail(runDetail.run.id) }}>{t('plan.refreshDetail')}</button>
            <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { setRunDetail(null) }}>{t('plan.closeDetail')}</button>
          </div>
          {runDetail.run.status === 'paused' && runDetail.run.pausePoint !== null && (
            <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.35)', marginBottom: '8px' }}>
              <div style={{ fontWeight: 600, fontSize: '12px' }}>⏸ {t('plan.pausedBanner')}</div>
              <div style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>{runDetail.run.pausePoint.reason}</div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                <button style={{ ...styles.button, padding: '3px 10px', fontSize: '11px' }} onClick={() => { void resumeRun(runDetail.run.id, 'continue') }}>{t('plan.resumeRetry')}</button>
                <button style={{ ...styles.secondary, padding: '3px 10px', fontSize: '11px' }} onClick={() => { void resumeRun(runDetail.run.id, 'skip-current') }}>{t('plan.resumeSkip')}</button>
              </div>
            </div>
          )}
          {(runDetail.run.status === 'failed' || runDetail.run.status === 'interrupted') && (
            <div style={{ marginBottom: '8px' }}>
              <button style={{ ...styles.button, padding: '3px 10px', fontSize: '11px' }} onClick={() => { void resumeRun(runDetail.run.id, 'continue') }}>{t('plan.resumeFailed')}</button>
            </div>
          )}
          <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>{['plan.col.step', 'plan.col.role', 'plan.col.model', 'exec.col.status', 'plan.col.attempts', 'exec.col.cost'].map((key) => <th key={key} style={styles.th}>{t(key)}</th>)}</tr>
            </thead>
            <tbody>
              {runDetail.steps.map((step, index) => (
                <tr key={step.id}>
                  <td style={styles.td}>
                    <div>{index + 1}. {step.title}</div>
                    {step.claimedOutcome !== null && (
                      <div style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)', maxWidth: 320, whiteSpace: 'normal' }}>{step.claimedOutcome.slice(0, 160)}</div>
                    )}
                  </td>
                  <td style={styles.td}><span style={styles.badge('rgba(86,156,214,0.25)')}>{ROLE_LABELS[step.role] ?? step.role}</span></td>
                  <td style={{ ...styles.td, fontSize: '11px' }}>{step.model ?? '—'}</td>
                  <td style={styles.td}><span style={styles.badge(step.verified ? '#4ec9b0' : step.status === 'failed' ? '#f14c4c' : step.status === 'skipped' ? '#8b949e' : '#dcdcaa')}>{STEP_STATUS_LABELS[step.status] ?? step.status}</span></td>
                  <td style={styles.td}>{String(step.attemptsCount)}</td>
                  <td style={styles.td}>{step.costUsd > 0 ? '$' + step.costUsd.toFixed(4) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {runDetail.context !== null && (
            <div style={{ marginTop: '10px', border: '1px dashed var(--dsw-alias-border-l2, rgba(5,5,5,0.15))', borderRadius: '8px', padding: '8px 12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '4px' }}>{t('plan.contextTitle')}</div>
              <div style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>
                {runDetail.context.projectDigest}
                {runDetail.context.branch !== null ? ` · ${t('plan.branch')} ${runDetail.context.branch}` : ''}
                {runDetail.context.headSha !== null ? ` · HEAD ${runDetail.context.headSha.slice(0, 8)}` : ''}
              </div>
              {runDetail.context.injectedMemories.length > 0 && (
                <div style={{ marginTop: '4px', fontSize: '11px' }}>
                  <span style={{ fontWeight: 600 }}>{t('plan.injectedMemories')}：</span>
                  {runDetail.context.injectedMemories.map((memory) => <span key={memory.id} style={styles.badge('rgba(78,201,176,0.2)')}>{memory.title}</span>)}
                </div>
              )}
              {runDetail.context.decisionLog.length > 0 && (
                <div style={{ marginTop: '4px', fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>
                  <span style={{ fontWeight: 600, color: 'inherit' }}>{t('plan.decisionLog')}：</span>
                  {runDetail.context.decisionLog.slice(-6).map((entry, entryIndex) => (
                    <div key={entryIndex}>· [{entry.kind}] {entry.detail}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Card>
      )}
      <Card
        title={
          <span style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => { setSchedOpen(!schedOpen) }}>
            {schedOpen ? '▾ ' : '▸ '}{t('sched.title')}
            <span style={{ ...styles.label, marginLeft: '8px' }}>{(scheduledData ?? []).length > 0 ? String((scheduledData ?? []).length) + ' 个' : ''}</span>
          </span>
        }
      >
        {schedOpen && (
        <>
        <div style={styles.formInline}>
          <input style={{ ...styles.input, flex: 1, minWidth: 160 }} placeholder={t('sched.formName')} value={schedName} onChange={(e) => { setSchedName(e.target.value) }} />
          <select style={{ ...styles.select, width: 'auto' }} value={schedType} onChange={(e) => { setSchedType(e.target.value) }}>
            <option value="review">{t('sched.typeReview')}</option>
            <option value="summary">{t('sched.typeSummary')}</option>
            <option value="run">{t('sched.typeRun')}</option>
            <option value="sync">{t('sched.typeSync')}</option>
          </select>
          <input style={{ ...styles.input, width: 120 }} placeholder={t('sched.formInterval')} value={schedInterval} onChange={(e) => { setSchedInterval(e.target.value) }} />
          {schedType === 'run' && (
            <>
              <input style={styles.input} placeholder={t('exec.formTitle')} value={schedTitle} onChange={(e) => { setSchedTitle(e.target.value) }} />
              <textarea style={styles.textarea} rows={2} placeholder={t('exec.formDesc')} value={schedDesc} onChange={(e) => { setSchedDesc(e.target.value) }} />
            </>
          )}
          <button style={styles.button} disabled={schedName.trim() === ''} onClick={() => { void addScheduled() }}>{t('sched.add')}</button>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)', marginBottom: '8px' }}>{t('sched.hint')}</div>
        {(scheduledData ?? []).length === 0 ? (
          <div style={styles.empty}>{t('sched.empty')}</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>{['sched.col.name', 'sched.col.type', 'sched.col.interval', 'sched.col.next', 'sched.col.lastResult', 'sched.col.actions'].map((key) => <th key={key} style={styles.th}>{t(key)}</th>)}</tr>
            </thead>
            <tbody>
              {(scheduledData ?? []).map((task) => (
                <tr key={task.id} style={{ opacity: task.enabled ? 1 : 0.45 }}>
                  <td style={styles.td}>{task.name}{task.title !== '' ? <span style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>（{task.title}）</span> : null}</td>
                  <td style={styles.td}><span style={styles.badge(task.type === 'review' ? '#569cd6' : task.type === 'summary' ? '#4ec9b0' : '#d7ba7d')}>{task.type === 'review' ? t('sched.typeReview') : task.type === 'summary' ? t('sched.typeSummary') : t('sched.typeRun')}</span></td>
                  <td style={styles.td}>{task.intervalMinutes >= 1440 ? Math.round(task.intervalMinutes / 1440 * 10) / 10 + t('sched.day') : task.intervalMinutes >= 60 ? Math.round(task.intervalMinutes / 60 * 10) / 10 + t('sched.hour') : task.intervalMinutes + t('sched.minute')}</td>
                  <td style={styles.td}>{task.enabled ? formatTime(task.nextDueAt) : '—'}</td>
                  <td style={{ ...styles.td, fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)', maxWidth: 220, whiteSpace: 'normal' }}>{task.lastResult || (task.lastRunAt !== null ? formatTime(task.lastRunAt) : '—')}</td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { void scheduledAction('update', { id: task.id, enabled: !task.enabled }) }}>{task.enabled ? t('sched.disable') : t('sched.enable')}</button>
                      <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { void scheduledAction('run', { id: task.id }) }}>{t('sched.runNow')}</button>
                      <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { setConfirmDialog({ title: '删除这个例行任务？', message: '「' + task.name + '」将被永久删除。', danger: true, onConfirm: () => { void scheduledAction('delete', { id: task.id }) } }) }}>✕</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
        </>
        )}
      </Card>
    </>
  )

  // ── 笔记与记忆页签 ──
  const notesTab = (
    <>
      {/* ── 笔记：卡片式阅读 + 多行编辑 + 搜索 + AI 总结 ── */}
      <Card title={t('notes.title')}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
          <input
            style={{ ...styles.input, width: 220 }}
            placeholder={t('notes.search')}
            value={noteSearch}
            onChange={(e) => { setNoteSearch(e.target.value) }}
          />
          <span style={{ flex: 1 }} />
          {(() => {
            const lastSummary = notes.filter((note) => note.sha === 'summary').sort((a, b) => b.createdAt - a.createdAt)[0]
            const newCommits = lastSummary === undefined ? -1
              : (commitsData?.commits ?? []).filter((commit) => commit.date > lastSummary.createdAt).length
            if (newCommits === -1) {
              return <span style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>{t('notes.digestNever')}</span>
            }
            if (newCommits === 0) return null
            return <span style={{ fontSize: '11px', color: 'var(--dsw-alias-brand-primary, #2563eb)' }}>{t('notes.digestPending').replace('{n}', String(newCommits))}</span>
          })()}
          <button style={styles.secondary} disabled={aiSummarizing} onClick={() => { void aiSummarize() }}>
            {aiSummarizing ? t('notes.aiSummaryRun') : '✨ ' + t('notes.aiSummary')}
          </button>
        </div>
        <div style={{ ...styles.formRow, border: '1px dashed var(--dsw-alias-border-l2, rgba(5,5,5,0.15))', borderRadius: '8px', padding: '10px' }}>
          <input style={styles.input} placeholder={t('notes.formTitle')} value={noteTitle} onChange={(e) => { setNoteTitle(e.target.value) }} />
          <input style={{ ...styles.input }} placeholder={t('notes.tagsHint')} value={noteTags} onChange={(e) => { setNoteTags(e.target.value) }} />
          <textarea
            style={styles.textarea}
            rows={6}
            placeholder={t('notes.contentHint')}
            value={noteContent}
            onChange={(e) => { setNoteContent(e.target.value) }}
          />
          {selectedTargets.length > 0 && (
            <div style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>
              {t('notes.boundTo')}: {selectedTargets[0] === 'working' ? t('repo.working') : selectedTargets[0].slice(0, 8)}
            </div>
          )}
          <div>
            <button style={styles.button} disabled={noteTitle.trim() === '' || noteContent.trim() === ''} onClick={() => { void addNote() }}>{t('notes.add')}</button>
          </div>
        </div>
        {(() => {
          const keyword = noteSearch.trim().toLowerCase()
          const matched = keyword === ''
            ? notes
            : notes.filter((note) => (note.title + ' ' + note.content + ' ' + (note.tags ?? []).join(' ')).toLowerCase().includes(keyword))
          // 置顶优先，其余按创建时间倒序。
          const visible = [...matched].sort((left, right) =>
            Number(right.pinned === true) - Number(left.pinned === true) || right.createdAt - left.createdAt)
          if (visible.length === 0) {
            return <div style={styles.empty}>{notes.length === 0 ? t('notes.empty') : t('notes.emptySearch')}</div>
          }
          return visible.map((note) => {
            const isSummary = note.sha === 'summary'
            const editing = editingNote !== null && editingNote.id === note.id ? editingNote : null
            const expanded = noteExpanded[note.id] === true
            const long = note.content.length > 260 || note.content.split('\n').length > 6
            return (
              <div
                key={note.id}
                style={{
                  ...styles.noteCard,
                  ...(isSummary ? { background: 'rgba(37,99,235,0.04)', borderColor: 'rgba(37,99,235,0.3)' } : {}),
                }}
              >
                {editing !== null ? (
                  <div style={styles.formRow}>
                    <input style={styles.input} value={editing.title} onChange={(e) => { setEditingNote({ ...editing, title: e.target.value }) }} />
                    <input style={styles.input} placeholder={t('notes.tagsHint')} value={editing.tags} onChange={(e) => { setEditingNote({ ...editing, tags: e.target.value }) }} />
                    <textarea style={styles.textarea} rows={10} value={editing.content} onChange={(e) => { setEditingNote({ ...editing, content: e.target.value }) }} />
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button style={{ ...styles.button, padding: '4px 12px' }} onClick={() => { void saveNoteEdit() }}>{t('notes.save')}</button>
                      <button style={{ ...styles.secondary, padding: '4px 12px' }} onClick={() => { setEditingNote(null) }}>{t('notes.cancel')}</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={styles.noteTitleRow}>
                      <div style={styles.noteTitleText}>{isSummary ? '📖 ' : ''}{note.pinned === true ? '📌 ' : ''}{note.title}</div>
                      <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                        <button
                          style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px', color: note.pinned === true ? 'var(--dsw-alias-brand-primary, #2563eb)' : undefined }}
                          title={note.pinned === true ? t('notes.unpin') : t('notes.pin')}
                          onClick={() => { void toggleNotePin(note) }}
                        >📌</button>
                        <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} title={t('notes.copyMdHint')} onClick={() => {
                          const md = `# ${note.title}\n\n${note.content}\n`
                          void navigator.clipboard?.writeText(md).then(() => setActionResult('✓ ' + t('notes.copyMdDone'))).catch(() => setActionResult('✗ 复制失败'))
                        }}>📋 {t('notes.copyMd')}</button>
                        <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} title={t('notes.exportMdHint')} onClick={() => { exportNote(note) }}>💾 {t('notes.exportMd')}</button>
                        <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} title={t('notes.toMemoryHint')} onClick={() => { setMemoryTitle(note.title); setMemoryContent(note.content); setActionResult(t('notes.toMemoryDone')) }}>🧠 {t('notes.toMemory')}</button>
                        <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { setEditingNote({ id: note.id, title: note.title, content: note.content, tags: (note.tags ?? []).join(', ') }) }}>{t('notes.edit')}</button>
                        <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { setConfirmDialog({ title: '删除这条笔记？', message: '「' + note.title + '」将被永久删除，不可恢复。', danger: true, onConfirm: () => { void removeNote(note.id) } }) }}>✕</button>
                      </div>
                    </div>
                    {isSummary
                      ? <div style={{ ...styles.noteContent, ...(long && !expanded ? styles.noteClamp : {}) }}>{renderStructuredContent(note.content)}</div>
                      : <div style={{ ...styles.noteContent, ...(long && !expanded ? styles.noteClamp : {}) }}>{note.content}</div>}
                    {long && (
                      <button style={styles.linkBtn} onClick={() => { setNoteExpanded({ ...noteExpanded, [note.id]: !expanded }) }}>
                        {expanded ? t('notes.collapse') : t('notes.expand')}（{note.content.length} 字）
                      </button>
                    )}
                    {(note.tags ?? []).length > 0 && (
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
                        {(note.tags ?? []).map((tag) => (
                          <button
                            key={tag}
                            style={{ ...styles.badge('#2563eb'), cursor: 'pointer', border: 'none', padding: '1px 8px', borderRadius: '999px', fontSize: '10px' }}
                            onClick={() => { setNoteSearch(tag) }}
                          >#{tag}</button>
                        ))}
                      </div>
                    )}
                    <div style={styles.noteMeta}>
                      <span>{new Date(note.createdAt).toLocaleString()}</span>
                      {note.updatedAt !== undefined && note.updatedAt > note.createdAt + 1000 && (
                        <span>（{t('notes.editedAt')} {new Date(note.updatedAt).toLocaleString()}）</span>
                      )}
                      {isSummary && <span style={styles.badge('#2563eb')}>{t('notes.summaryTag')}</span>}
                      {note.sha !== undefined && note.sha !== 'summary' && (
                        <span style={styles.badge('#8b8b8b')}>{note.sha === 'working' ? t('repo.working') : note.sha.slice(0, 8)}</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })
        })()}
      </Card>
      <Card title={t('memory.zoneTitle') + (project !== null ? ' · ' + project.name : '')}>
        {/* 同步状态条：基线 + 落后提交数 + 同步按钮 + 同步报告 */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '8px', padding: '6px 10px', border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.1))', borderRadius: '8px' }}>
          <span style={{ fontSize: '11px' }}>🔄 {t('memory.syncBaseline')}：<b>{memoriesData?.baseline?.sha != null ? memoriesData.baseline.sha.slice(0, 8) : t('memory.syncNone')}</b></span>
          {memoriesData?.branch != null && <span style={styles.badge('#569cd6')}>{memoriesData.branch}</span>}
          {(memoriesData?.behindCount ?? 0) > 0 && (
            <span style={{ fontSize: '11px', color: themeAwareText('#d97706') }}>{t('memory.behind').replace('{n}', String(memoriesData?.behindCount ?? 0))}</span>
          )}
          <span style={{ flex: 1 }} />
          <button style={{ ...styles.secondary, padding: '3px 10px', fontSize: '11px' }} disabled={memorySyncing} onClick={() => { void syncMemories() }}>
            {memorySyncing ? t('memory.syncing') : '🔄 ' + t('memory.sync')}
          </button>
        </div>
        {syncReport !== null && (
          <div style={{ marginBottom: '10px', padding: '8px 12px', borderRadius: '8px', background: syncReport.ok === false ? 'rgba(209,36,47,0.06)' : 'rgba(78,201,176,0.06)', border: '1px solid ' + (syncReport.ok === false ? 'rgba(209,36,47,0.3)' : 'rgba(78,201,176,0.3)') }}>
            <div style={{ fontSize: '12px', fontWeight: 600 }}>{syncReport.ok === false ? '✗ ' + t('memory.syncFailed') : '✓ ' + (syncReport.verdict ?? '')}</div>
            {syncReport.ok !== false && (syncReport.staleProposals ?? []).length > 0 && (
              <div style={{ marginTop: '6px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600 }}>{t('memory.staleTitle')}</div>
                {(syncReport.staleProposals ?? []).map((proposal) => (
                  <div key={proposal.id} style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '4px', fontSize: '11px' }}>
                    <span style={{ flex: 1 }}>{proposal.title} —— {proposal.reason}</span>
                    <button style={{ ...styles.secondary, padding: '1px 8px', fontSize: '10px' }} onClick={() => { void applySync([proposal.id], 'mark-stale') }}>{t('memory.markStale')}</button>
                    <button style={{ ...styles.secondary, padding: '1px 8px', fontSize: '10px' }} onClick={() => { void applySync([proposal.id], 'archive') }}>{t('memory.archiveBtn')}</button>
                    <button style={{ ...styles.secondary, padding: '1px 8px', fontSize: '10px' }} onClick={() => { setSyncReport((previous) => previous === null ? null : { ...previous, staleProposals: (previous.staleProposals ?? []).filter((item) => item.id !== proposal.id) }) }}>{t('memory.keepActive')}</button>
                  </div>
                ))}
              </div>
            )}
            {syncReport.ok !== false && (syncReport.newCandidates ?? []).length > 0 && (
              <div style={{ marginTop: '6px', fontSize: '11px' }}>
                <span style={{ fontWeight: 600 }}>{t('memory.newCandidates')}</span>
                {(syncReport.newCandidates ?? []).map((candidate, index) => <div key={index}>＋ [{candidate.type}] {candidate.title}</div>)}
              </div>
            )}
            <button style={{ ...styles.linkBtn, marginTop: '4px' }} onClick={() => { setSyncReport(null) }}>{t('memory.closeReport')}</button>
          </div>
        )}
        {/* 手动添加：标题 / 类型 / 作用域 / 内容 */}
        <div style={styles.formRow}>
          <input style={styles.input} placeholder={t('form.memoryTitle')} value={memoryTitle} onChange={(e) => { setMemoryTitle(e.target.value) }} />
          <select style={{ ...styles.select, width: 'auto' }} value={memoryType} onChange={(e) => { setMemoryType(e.target.value) }}>
            {Object.entries(MEMORY_TYPE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <select style={{ ...styles.select, width: 'auto' }} value={memoryScope} onChange={(e) => { setMemoryScope(e.target.value as 'project' | 'branch') }}>
            <option value="project">{t('memory.scopeProject')}</option>
            <option value="branch">{t('memory.scopeBranch')}</option>
          </select>
          <textarea style={styles.textarea} rows={3} placeholder={t('form.memoryContent')} value={memoryContent} onChange={(e) => { setMemoryContent(e.target.value) }} />
          <div>
            <button style={styles.button} disabled={busy !== null || memoryTitle.trim() === '' || memoryContent.trim() === ''}
              onClick={() => { void runAction('recordMemory', '/project-control/api/memory', { memoryType, scope: memoryScope, title: memoryTitle.trim(), content: memoryContent.trim() }).then(async () => { setMemoryTitle(''); setMemoryContent(''); await loadMemories() }) }}>
              {busy === 'recordMemory' ? t('action.running') : t('memory.record')}
            </button>
          </div>
        </div>
        {(() => {
          const all = memoriesData?.memories ?? []
          const pending = all.filter((memory) => !memory.isHumanConfirmed && memory.status === 'active')
          const active = all.filter((memory) => memory.status === 'active')
          const grouped = new Map<string, MemoryEntry[]>()
          for (const memory of active) {
            const list = grouped.get(memory.type) ?? []
            list.push(memory)
            grouped.set(memory.type, list)
          }
          return (
            <>
              {pending.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ ...styles.sectionTitle, color: 'var(--dsw-alias-brand-primary, #2563eb)' }}>⏳ {t('memory.pendingQueue')}（{String(pending.length)}）</div>
                  {pending.map((memory) => (
                    <div key={memory.id} style={{ ...styles.noteCard, borderColor: 'rgba(37,99,235,0.3)', background: 'rgba(37,99,235,0.03)' }}>
                      <div style={styles.noteTitleRow}>
                        <div style={styles.noteTitleText}>{memory.title}</div>
                        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                          <button style={{ ...styles.button, padding: '2px 8px', fontSize: '11px' }} onClick={() => { void confirmMemory(memory.id).then(() => { void loadMemories() }) }}>{t('memory.confirm')}</button>
                          <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { void memoryAction('status', { id: memory.id, status: 'archived' }) }}>{t('memory.archiveBtn')}</button>
                        </div>
                      </div>
                      <div style={styles.noteContent}>{memory.content}</div>
                      <div style={styles.noteMeta}>
                        <span style={styles.badge('rgba(37,99,235,0.15)')}>{MEMORY_SOURCE_LABELS[memory.sourceTag] ?? memory.sourceTag}</span>
                        {memory.basisSha !== null && <span style={styles.badge('#8b8b8b')}>{memory.basisSha.slice(0, 8)}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {[...grouped.entries()].map(([type, items]) => (
                <div key={type} style={{ marginBottom: '10px' }}>
                  <div style={styles.sectionTitle}>{MEMORY_TYPE_LABELS[type] ?? type}（{String(items.length)}）</div>
                  {items.map((memory) => (
                    <div key={memory.id} style={{ ...styles.noteCard, opacity: memory.status === 'active' ? 1 : 0.6 }}>
                      <div style={styles.noteTitleRow}>
                        <div style={styles.noteTitleText}>{memory.isHumanConfirmed ? '✅ ' : ''}{memory.title}</div>
                        <div style={{ display: 'flex', gap: '4px', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                          {!memory.isHumanConfirmed && memory.status === 'active'
                            ? <button style={{ ...styles.button, padding: '2px 8px', fontSize: '11px' }} onClick={() => { void confirmMemory(memory.id).then(() => { void loadMemories() }) }}>{t('memory.confirm')}</button>
                            : null}
                          <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { void memoryToNote(memory) }}>📄 {t('memory.toNote')}</button>
                          {memory.scope === 'branch' && <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { void memoryAction('normalize', { id: memory.id }) }}>⇱ {t('memory.normalize')}</button>}
                          {memory.status === 'active'
                            ? <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { void memoryAction('status', { id: memory.id, status: 'archived' }) }}>{t('memory.archiveBtn')}</button>
                            : <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { void memoryAction('status', { id: memory.id, status: 'active' }) }}>{t('memory.restore')}</button>}
                        </div>
                      </div>
                      <div style={{ ...styles.noteContent, maxHeight: 84, overflow: 'hidden' }}>{memory.content}</div>
                      <div style={styles.noteMeta}>
                        {memory.status === 'stale' && <span style={styles.badge('#d97706')}>{t('memory.statusStale')}</span>}
                        {memory.scope === 'branch' && memory.gitBranch !== null && <span style={styles.badge('#569cd6')}>⎇ {memory.gitBranch}</span>}
                        <span style={styles.badge('rgba(37,99,235,0.15)')}>{MEMORY_SOURCE_LABELS[memory.sourceTag] ?? memory.sourceTag}</span>
                        {memory.basisSha !== null && <span style={styles.badge('#8b8b8b')}>{memory.basisSha.slice(0, 8)}</span>}
                        <span>{new Date(memory.updatedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {all.length === 0 && <div style={styles.empty}>{t('memory.empty')}</div>}
            </>
          )
        })()}
      </Card>
      <Card title={t('concepts.title')}>
        {concepts.length === 0 ? (
          <div style={styles.empty}>{t('concepts.none')}</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>{['concepts.col.name', 'concepts.col.category', 'concepts.col.count'].map((key) => <th key={key} style={styles.th}>{t(key)}</th>)}</tr>
            </thead>
            <tbody>
              {concepts.map((concept) => (
                <tr key={concept.id}>
                  <td style={styles.td}>{concept.name}</td>
                  <td style={styles.td}>{concept.category}</td>
                  <td style={styles.td}>{String(concept.occurrences)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </>
  )

  // ── Review 问题页签：全量问题看板（统计 + 筛选 + 状态流转）+ 验收记录 ──
  const reviewTab = (
    <>
      {resultPanel}
      <Card title={t('review.recordsTitle')}>
        {(() => {
          const all = (issuesData ?? []).map((issue) => ({ ...issue, severity: normalizeIssueSeverity(issue.severity) }))
          const openCount = all.filter((issue) => issue.status === 'open' || issue.status === 'fixing').length
          const counts: Array<{ key: string; label: string; count: number }> = [
            { key: '', label: t('review.filterAll'), count: all.length },
            { key: 'critical', label: 'critical', count: all.filter((issue) => issue.severity === 'critical' || issue.severity === 'blocker').length },
            { key: 'major', label: 'major', count: all.filter((issue) => issue.severity === 'major').length },
            { key: 'minor', label: 'minor', count: all.filter((issue) => issue.severity === 'minor').length },
            { key: 'info', label: 'info', count: all.filter((issue) => issue.severity === 'info').length },
          ]
          const visible = all
            .filter((issue) => {
              if (issueSeverityFilter === '') return true
              if (issueSeverityFilter === 'critical') return issue.severity === 'critical' || issue.severity === 'blocker'
              return issue.severity === issueSeverityFilter
            })
            .filter((issue) => issueStatusFilter === '' || issue.status === issueStatusFilter)
          return (
            <>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
                {counts.map((item) => (
                  <button key={item.key === '' ? 'all' : item.key} style={styles.chip(issueSeverityFilter === item.key)}
                    onClick={() => { setIssueSeverityFilter(item.key) }}>
                    {item.label} · {item.count}
                  </button>
                ))}
                <span style={{ flex: 1 }} />
                <span style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>
                  {openCount} 待处理 / 共 {all.length}
                  {(state?.resolvedIssueRetentionDays ?? 0) > 0 ? ` · ${t('review.retentionHint').replace('{days}', String(state?.resolvedIssueRetentionDays ?? 7))}` : ''}
                </span>
                <select style={{ ...styles.select, width: 'auto', padding: '3px 8px' }} value={issueStatusFilter} onChange={(e) => { setIssueStatusFilter(e.target.value) }}>
                  <option value="">{t('review.statusAll')}</option>
                  {Object.entries(ISSUE_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
                <button style={styles.secondary} onClick={() => { void loadIssues() }}>{t('review.refresh')}</button>
              </div>
              {all.length === 0 ? (
                <div style={styles.empty}>{issuesData === null ? '…' : t('review.recordsEmpty')}</div>
              ) : visible.length === 0 ? (
                <div style={styles.empty}>{t('notes.emptySearch')}</div>
              ) : visible.map((issue) => {
                const expanded = issueExpanded[issue.id] === true
                const description = issue.description ?? ''
                const long = description.length > 200
                return (
                  <div key={issue.id} style={styles.noteCard}>
                    <div style={styles.noteTitleRow}>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={styles.badge(severityColor(issue.severity))}>{issue.severity}</span>
                        {issue.category ? <span style={styles.badge('#57606a')}>{issue.category}</span> : null}
                        <span style={styles.badge(issue.status === 'open' || issue.status === 'fixing' ? '#dcdcaa' : issue.status === 'resolved' || issue.status === 'accepted' ? '#4ec9b0' : '#8b8b8b')}>
                          {ISSUE_STATUS_LABELS[issue.status] ?? issue.status}
                        </span>
                        <span style={styles.noteTitleText}>{issue.title}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                        {(issue.status === 'open' || issue.status === 'fixing') && (
                          <button
                            style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }}
                            disabled={verifyingTarget !== null}
                            title={t('review.verifyHint')}
                            onClick={() => { void verifyIssues(issue.changeId) }}
                          >{verifyingTarget === issue.changeId ? t('review.verifyRunning') : '🔍 ' + t('review.verify')}</button>
                        )}
                        {(issue.status === 'open' || issue.status === 'fixing') && (
                          <button
                            style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }}
                            title={t('review.falsePositiveHint')}
                            onClick={() => {
                              setConfirmDialog({
                                title: t('review.falsePositiveTitle'),
                                message: t('review.falsePositiveMsg').replace('{title}', issue.title),
                                danger: false,
                                onConfirm: () => { void post('/project-control/api/issues/status', { id: issue.id, status: 'rejected' }).then(async ({ ok }) => { if (ok) await loadIssues() }) },
                              })
                            }}
                          >🚫 {t('review.falsePositive')}</button>
                        )}
                      </div>
                    </div>
                    {description !== '' && (
                      <div style={{ ...styles.noteContent, ...(long && !expanded ? styles.noteClamp : {}) }}>{renderWithPeek(description)}</div>
                    )}
                    {issue.resolution ? (
                      <div style={{ marginTop: '6px', padding: '6px 10px', borderRadius: '6px', background: 'rgba(78, 201, 176, 0.08)', border: '1px solid rgba(78, 201, 176, 0.35)', fontSize: '11px', color: 'var(--dsw-alias-label-primary, #1f2328)' }}>
                        ✓ {issue.resolution}
                      </div>
                    ) : null}
                    {(issue.fixStats != null || Boolean(issue.fixDiff)) && (
                      <>
                        <button
                          style={{ ...styles.linkBtn, marginTop: '4px', display: 'block' }}
                          onClick={() => { setFixExpanded((previous) => ({ ...previous, [issue.id]: !(previous[issue.id] === true) })) }}
                        >
                          🔧 {t('review.fixDetail')}（{String(issue.fixStats?.files ?? 0)} {t('review.fixStatFiles')} · +{String(issue.fixStats?.insertions ?? 0)} −{String(issue.fixStats?.deletions ?? 0)}）{fixExpanded[issue.id] === true ? '▲' : '▼'}
                        </button>
                        {fixExpanded[issue.id] === true && (
                          <div style={{ marginTop: '6px', border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.1))', borderRadius: '6px', padding: '8px 10px' }}>
                            {(issue.fixFiles ?? []).length > 0 && (
                              <div style={{ marginBottom: '8px' }}>
                                <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '3px' }}>{t('review.fixFiles')}</div>
                                {(issue.fixFiles ?? []).map((file) => (
                                  <div key={file} style={{ fontFamily: 'var(--dsw-alias-font-mono, ui-monospace, monospace)', fontSize: '11px' }}>{file}</div>
                                ))}
                              </div>
                            )}
                            {(issue.fixImpact ?? []).length > 0 && (
                              <div style={{ marginBottom: '8px' }}>
                                <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '3px' }}>{t('review.fixImpact')}</div>
                                {issue.fixImpact.map((entry) => (
                                  <div key={entry.symbol} style={{ marginBottom: '5px' }}>
                                    <div>
                                      <span style={styles.badge('#0969da')}>{entry.symbol}</span>
                                      <span style={{ fontSize: '10px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>
                                        {' '}{t('review.definedIn')} {entry.definedIn} · {String(entry.callers.length)} {t('review.callCount')}
                                      </span>
                                    </div>
                                    {entry.callers.slice(0, 5).map((caller, callerIndex) => (
                                      <div key={callerIndex} style={{ fontSize: '10px', color: 'var(--dsw-alias-label-secondary, #6b7280)', paddingLeft: '12px' }}>
                                        <span style={{ cursor: 'pointer', textDecoration: 'underline dotted' }} onClick={() => { void openPeek(caller.file, Number(caller.line)) }}>{caller.file}:{caller.line}</span> {caller.snippet.slice(0, 80)}
                                      </div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            )}
                            {Boolean(issue.fixDiff) && (
                              <div>
                                <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '3px' }}>{t('review.fixDiff')}</div>
                                <div style={{ background: 'var(--dsw-alias-bg-inset, rgba(5,5,5,0.03))', borderRadius: '6px', padding: '6px 8px', maxHeight: '300px', overflowY: 'auto' }}>
                                  {renderDiffLines(issue.fixDiff)}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                    {long && (
                      <button style={styles.linkBtn} onClick={() => { setIssueExpanded({ ...issueExpanded, [issue.id]: !expanded }) }}>
                        {expanded ? t('notes.collapse') : t('notes.expand')}
                      </button>
                    )}
                    <div style={styles.noteMeta}>
                      <span>{t('review.target')}: {issueTargetLabel(issue.changeId)}</span>
                      <span>{formatTime(issue.createdAt)}</span>
                    </div>
                  </div>
                )
              })}
            </>
          )
        })()}
      </Card>
      <Card title={t('verify.records')}>
        {verifications.length === 0 ? (
          <div style={styles.empty}>{t('verify.recordsEmpty')}</div>
        ) : (
          <table style={styles.table}>
            <tbody>
              {verifications.slice(0, 20).map((record) => (
                <tr key={record.id}>
                  <td style={styles.td}><span style={styles.badge(record.status === 'passed' ? '#4ec9b0' : '#dcdcaa')}>{record.status}</span></td>
                  <td style={styles.td}>{record.name}</td>
                  <td style={styles.td}>{formatTime(record.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </>
  )

  return (
    <div style={styles.root} data-testid="project-control-workspace">
      <style>{LAYOUT_STYLE}</style>
      <div
        data-testid="project-control-divider"
        onPointerDown={onDividerDown}
        style={{
          position: 'absolute', top: 0, bottom: 0, right: -4, width: 8,
          cursor: 'col-resize', zIndex: 20,
        }}
      />
      <div style={styles.nav}>
        <span style={styles.title}>{t('workspace.title')}</span>
        {tabs.map((entry) => (
          <button key={entry.key} style={styles.tab(tab === entry.key)} onClick={() => { setTab(entry.key) }}>{entry.label}</button>
        ))}
        {(() => {
          const runningCount = runs.filter((entry) => entry.status === 'running' || entry.status === 'queued' || entry.status === 'verifying').length
          const failedCount = runs.filter((entry) => entry.status === 'failed' || entry.status === 'paused').length
          if (runningCount === 0 && failedCount === 0) return null
          return (
            <span style={{ display: 'flex', gap: '4px', marginLeft: '4px', alignItems: 'center' }}>
              {runningCount > 0 && (
                <button style={{ ...styles.badge(themeAwareText('#2563eb')), cursor: 'pointer', border: 'none' }} title={t('badge.running').replace('{n}', String(runningCount))}
                  onClick={() => { setTab('execution') }}>▶ {String(runningCount)}</button>
              )}
              {failedCount > 0 && (
                <button style={{ ...styles.badge(themeAwareText('#f14c4c')), cursor: 'pointer', border: 'none' }} title={t('badge.failed').replace('{n}', String(failedCount))}
                  onClick={() => { setTab('execution') }}>✗ {String(failedCount)}</button>
              )}
            </span>
          )
        })()}
      </div>
      <div style={styles.body}>
        {loadError !== null && <div style={styles.empty}>{t('error.load')}: {loadError}</div>}
        {state?.ready === false && <div style={styles.empty}>{state.reason ?? ''}</div>}
        {tab === 'commits' && commitsTab}
        {tab === 'overview' && overviewTab}
        {tab === 'execution' && executionTab}
        {tab === 'review' && reviewTab}
        {tab === 'notes' && notesTab}
        {tab === 'settings' && settingsTab}
      </div>
      {confirmDialog !== null && (
        <ConfirmDialog
          title={confirmDialog.title}
          message={confirmDialog.message}
          danger={confirmDialog.danger}
          onCancel={() => { setConfirmDialog(null) }}
          onConfirm={() => { confirmDialog.onConfirm(); setConfirmDialog(null) }}
        />
      )}
      {peek !== null && (
        <div data-testid="pc-peek-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(2px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => { setPeek(null) }}>
          <div data-testid="pc-peek-card" style={{ width: 'min(760px, 92vw)', maxHeight: '80vh', overflow: 'hidden', borderRadius: '10px', background: 'var(--dsw-alias-bg-base, #fff)', boxShadow: '0 16px 48px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column' }} onClick={(e) => { e.stopPropagation() }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.1))' }}>
              <span style={{ fontFamily: 'var(--dsw-alias-font-mono, ui-monospace, monospace)', fontSize: '12px', fontWeight: 600, wordBreak: 'break-all' }}>{peek.path}:{String(peek.line)}</span>
              {peekData?.exists === true && <span style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>{String(peekData.startLine)}–{String(peekData.endLine)} / {String(peekData.totalLines)} 行</span>}
              <span style={{ flex: 1 }} />
              <button style={{ ...styles.secondary, padding: '2px 10px' }} onClick={() => { setPeek(null) }}>✕</button>
            </div>
            <div style={{ overflow: 'auto', padding: '10px 0', background: 'var(--dsw-alias-bg-inset, rgba(5,5,5,0.03))' }}>
              {peekBusy && <div style={{ ...styles.empty }}>读取中…</div>}
              {!peekBusy && peekData !== null && peekData.exists === false && <div style={styles.empty}>文件不存在（可能已被删除或移动）</div>}
              {!peekBusy && peekData?.exists === true && (peekData.lines ?? []).map((entry) => (
                <div key={entry.n} style={{ display: 'flex', gap: '10px', padding: '0 14px', fontFamily: 'var(--dsw-alias-font-mono, ui-monospace, monospace)', fontSize: '11.5px', lineHeight: 1.7, background: entry.n === peek.line ? 'rgba(37,99,235,0.08)' : 'transparent' }}>
                  <span style={{ width: 40, textAlign: 'right', color: 'var(--dsw-alias-label-secondary, #6b7280)', flexShrink: 0 }}>{String(entry.n)}</span>
                  <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{entry.text === '' ? '\u00A0' : entry.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
