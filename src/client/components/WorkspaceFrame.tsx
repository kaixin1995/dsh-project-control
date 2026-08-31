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

/** 宿主 /state 返回的快照形状（与 api-route.ts buildState 对齐）。 */
export interface WorkspaceState {
  ready?: boolean
  reason?: string
  project?: { id: string; name: string; rootPath: string; createdAt: number } | null
  changes?: Array<{ id: string; title: string; type: string; status: string; source: string; updatedAt: number }>
  runs?: Array<{ id: string; changeId: string; status: string; startedAt: number | null; finishedAt: number | null; costUsd?: number }>
  attemptsCount?: number
  memories?: Array<{ id: string; type: string; truthLevel: string; title: string; isHumanConfirmed: boolean; gitBranch: string | null; createdAt: number }>
  evidenceCount?: number
  recentEvidence?: Array<{ id: string; source: string; truthLevel: string; locator: string; snippet: string; createdAt: number }>
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
}

interface ImpactScopePayload {
  changedFiles: string[]
  shas?: string[]
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  riskScore: number
  riskFactors?: Array<{ text: string; points: number }>
  keyChangePoints?: string[]
  memories?: Array<{ title: string; type: string }>
  levels: Array<{ level: string; depth: number; path: string; confidence: number; reason: string }>
  direct: string[]
  affectedTests: string[]
}

export interface ReviewPayload {
  issuesFound: number
  issues: string
  verdict: string
  issueList?: Array<{ severity: string; category: string; title: string; evidence: string; fix: string }>
}

interface NoteEntry {
  id: string
  projectId: string
  sha?: string
  title: string
  content: string
  createdAt: number
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

type TabKey = 'commits' | 'overview' | 'execution' | 'notes'

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
    'tab.notes': '笔记与记忆',
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

    'repo.add': '添加仓库',
    'repo.addHint': '输入本机仓库绝对路径后回车；历史仓库已自动记忆',
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
    'impact.factors': '风险构成（为什么是这个等级）',
    'impact.points': '影响点明细',
    'impact.keyPoints': '关键组件',
    'impact.memory': '结合项目记忆核查',
    'impact.col.level': '层级',
    'impact.col.path': '文件',
    'impact.col.depth': '深度',
    'impact.col.conf': '置信度',
    'impact.col.chain': '引用链',
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
    'concepts.none': '暂无学习概念。对变更调用 summarize_learning 后自动积累。',
    'concepts.col.name': '概念',
    'concepts.col.category': '类别',
    'concepts.col.count': '次数',
    'review.recordsTitle': 'Review 问题',
    'verify.records': '验收记录',

    'confirmed.title': '已确定约束（人工确认，AI 禁改自动拦截）',
    'confirmed.add': '添加约束',
    'confirmed.text': '约束/需求内容',
    'confirmed.paths': '禁改路径（逗号分隔，选填）',
    'confirmed.none': '暂无约束。添加后 AI 修改禁改路径将被自动拒绝。',

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
    'tab.notes': 'Notes & Memory',
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
    'impact.factors': 'Risk factors (why this level)',
    'impact.points': 'Impacted points',
    'impact.keyPoints': 'Key components',
    'impact.memory': 'Cross-check with project memory',
    'impact.col.level': 'Level',
    'impact.col.path': 'File',
    'impact.col.depth': 'Depth',
    'impact.col.conf': 'Conf.',
    'impact.col.chain': 'Reference chain',
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
    'concepts.none': 'No learning concepts yet. Run summarize_learning on a change to accumulate.',
    'concepts.col.name': 'Concept',
    'concepts.col.category': 'Category',
    'concepts.col.count': 'Count',
    'review.recordsTitle': 'Review issues',
    'verify.records': 'Verification records',

    'confirmed.title': 'Confirmed constraints (human-confirmed; AI edits to forbidden paths are auto-denied)',
    'confirmed.add': 'Add constraint',
    'confirmed.text': 'Requirement / constraint text',
    'confirmed.paths': 'Forbidden paths (comma separated, optional)',
    'confirmed.none': 'No constraints yet. AI edits to forbidden paths will be auto-denied once added.',

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
    background: active ? 'var(--dsw-alias-brand-primary, #2563eb)' : 'transparent',
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
    fontSize: '11px', background: 'var(--dsw-alias-brand-primary, #2563eb)', color: '#fff',
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
  result: {
    whiteSpace: 'pre-wrap', fontSize: '12px', lineHeight: 1.6,
    background: 'var(--dsw-alias-bg-base, #fff)', border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))',
    borderRadius: '6px', padding: '10px 12px', maxHeight: '320px', overflowY: 'auto',
  },
  badge: (color: string): React.CSSProperties => ({
    display: 'inline-block', padding: '1px 8px', borderRadius: '4px', fontSize: '11px',
    background: `${color}22`, color,
  }),
  sectionTitle: { fontWeight: 600, fontSize: '12px', marginBottom: '8px' },
  what: { fontSize: '12px', lineHeight: 1.7, margin: '4px 0 8px' },
  logicStep: { fontSize: '12px', lineHeight: 1.8, display: 'flex', gap: '6px' },
  riskItem: { fontSize: '12px', lineHeight: 1.7, color: '#9a6700', margin: '2px 0' },
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
  chip: (active: boolean): React.CSSProperties => ({
    padding: '2px 10px', borderRadius: '999px', fontSize: '11px', cursor: 'pointer',
    border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.15))',
    background: active ? 'var(--dsw-alias-brand-primary, #2563eb)' : 'transparent',
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
    const dim = col > 0 ? Math.min(0.55, 0.18 + depthOf(path) * 0.12) : 0.1
    const dir = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : ''
    return React.createElement('g', { key: `${col}-${path}` },
      React.createElement('rect', { x: colX[col], y, width: colW, height: nodeH, rx: 6, fill: `${color}${Math.round((1 - dim) * 255).toString(16).padStart(2, '0')}`, stroke: color, strokeWidth: 1.4 }),
      React.createElement('text', { x: colX[col] + 10, y: y + 14, fontSize: 11, fontWeight: 600, fill: 'var(--dsw-alias-label-primary, #1f2328)' },
        (path.split('/').pop() ?? path).slice(0, 30)),
      React.createElement('text', { x: colX[col] + 10, y: y + 26, fontSize: 9, fill: 'var(--dsw-alias-label-tertiary, #8b8b8b)' },
        dir.slice(0, 38)),
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
  for (const item of indirect.slice(0, 20)) pushEdge(chainStart(item.reason), item.path, '#d97706', `ei-${item.path}`)
  for (const item of potential.slice(0, 16)) pushEdge(chainStart(item.reason), item.path, '#8b8b8b', `ep-${item.path}`)

  return React.createElement('div', null,
    React.createElement('svg', { width: '100%', viewBox: `0 0 1024 ${height}`, style: { maxHeight: 480 } },
      [['变更文件', 0], ['间接影响（谁引用了它）', 1], ['潜在影响（二级传播）', 2]].map(([name, col]) =>
        React.createElement('text', { key: String(col), x: colX[col as number], y: 24, fontSize: 12, fontWeight: 600, fill: 'var(--dsw-alias-label-secondary, #6b7280)' }, name as string)),
      renderCol(0, col0, '#2563eb'),
      renderCol(1, col1, '#d97706'),
      renderCol(2, col2, '#8b8b8b'),
      edges,
    ),
  )
}

const DIFF_KEYWORDS = /\b(public|private|protected|internal|static|void|class|struct|interface|enum|new|return|if|else|for|foreach|while|switch|case|break|continue|try|catch|finally|throw|using|namespace|import|export|from|const|let|var|async|await|function|this|base|super|null|true|false|override|virtual|abstract|sealed|readonly|params|out|ref|yield|typeof|instanceof|in|of|default|string|int|long|double|float|bool|char|decimal|object|record|partial|get|set|require|module|type|implements|extends)\b/g

/** 单行代码高亮：注释 > 字符串 > 关键字/数字 三层着色（轻量正则，够核查用）。 */
function highlightCodeLine(line: string, keyPrefix: string): React.ReactNode[] {
  const trimmed = line.trimStart()
  if (trimmed.startsWith('//') || trimmed.startsWith('///') || trimmed.startsWith('*') || trimmed.startsWith('/*') || trimmed.startsWith('#')) {
    return [React.createElement('span', { key: `${keyPrefix}-c`, style: { color: '#6a9955' } }, line)]
  }
  const parts = line.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g)
  return parts.map((part, i) => {
    if (i % 2 === 1) return React.createElement('span', { key: `${keyPrefix}-s${i}`, style: { color: '#ce9178' } }, part)
    const sub: React.ReactNode[] = []
    let last = 0
    for (const match of part.matchAll(DIFF_KEYWORDS)) {
      if (match.index! > last) sub.push(part.slice(last, match.index))
      sub.push(React.createElement('span', { key: `${keyPrefix}-k${i}-${match.index}`, style: { color: '#569cd6' } }, match[0]))
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
      ? React.createElement('span', { style: { color: '#388bfd', fontWeight: 600 } }, line)
      : kind === 'add' || kind === 'del'
        ? React.createElement('span', { style: { color: kind === 'add' ? '#1a7f37' : '#cf222e', fontWeight: 600 } }, line[0])
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

/** 骨架小卡片。 */
function Card(props: { title?: string; children?: React.ReactNode }) {
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
  const [repoInput, setRepoInput] = useState('')
  const [knownRepos, setKnownRepos] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('pc.repos') ?? '[]') as string[]
    } catch {
      return []
    }
  })

  // ── 笔记状态 ──
  const [notes, setNotes] = useState<NoteEntry[]>([])
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')

  const post = async (path: string, body: Record<string, unknown>): Promise<{ ok: boolean; data: Record<string, unknown> }> => {
    const response = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...body, sessionId: props.sessionId }),
    })
    const data: unknown = await response.json()
    return { ok: response.ok, data: (data ?? {}) as Record<string, unknown> }
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
      const response = await fetch('/project-control/api/notes')
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
      setDetailLoading(true)
      try {
        const { data } = await post('/project-control/api/commit-detail', { sha: target })
        setDetails((previous) => ({ ...previous, [target]: data as unknown as CommitDetailPayload }))
      } catch (error: unknown) {
        setLoadError(error instanceof Error ? error.message : String(error))
      } finally {
        setDetailLoading(false)
      }
    }
  }

  const loadImpact = async (): Promise<void> => {
    if (selectedTargets.length === 0) return
    setImpactLoading(true)
    try {
      const { ok, data } = await post('/project-control/api/impact-scope', { shas: selectedTargets })
      setImpact(ok ? (data as unknown as ImpactScopePayload) : null)
    } finally {
      setImpactLoading(false)
    }
  }

  const loadReviews = async (): Promise<void> => {
    if (selectedTargets.length === 0) return
    setReviewLoading(true)
    try {
      for (const target of selectedTargets) {
        const { data } = await post('/project-control/api/review', { sha: target })
        setReviews((previous) => ({ ...previous, [target]: data as unknown as ReviewPayload }))
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

  const switchRepo = async (rootPath: string): Promise<void> => {
    setBusy('switchRepo')
    try {
      await post('/project-control/api/bootstrap', { rootPath })
      const next = Array.from(new Set([rootPath, ...knownRepos])).slice(0, 8)
      setKnownRepos(next)
      localStorage.setItem('pc.repos', JSON.stringify(next))
      setRepoInput('')
      await loadCommits()
      const refreshed = await fetch('/project-control/api/state')
      if (refreshed.ok) setState(await refreshed.json() as WorkspaceState)
    } finally {
      setBusy(null)
    }
  }

  const addNote = async (): Promise<void> => {
    if (noteTitle.trim() === '' || noteContent.trim() === '') return
    const { ok } = await post('/project-control/api/notes', {
      title: noteTitle.trim(),
      content: noteContent.trim(),
      sha: selectedTargets.length === 0 ? undefined : selectedTargets[0],
    })
    if (ok) {
      setNoteTitle('')
      setNoteContent('')
      await loadNotes()
    }
  }

  const removeNote = async (id: string): Promise<void> => {
    await post('/project-control/api/notes/delete', { id })
    await loadNotes()
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
        const response = await fetch('/project-control/api/state', { headers: { accept: 'application/json' } })
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

  // 进入提交/笔记页签时按需拉取（提交列表依赖会话工作区，轮询无意义）。
  useEffect(() => {
    if (tab === 'commits') void loadCommits()
    if (tab === 'notes') void loadNotes()
  }, [tab, props.sessionId])

  const refreshState = async (): Promise<void> => {
    const refreshed = await fetch('/project-control/api/state', { headers: { accept: 'application/json' } })
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
      setActionResult(JSON.stringify(data, null, 2))
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
  const memories = state?.memories ?? []
  const issues = state?.issues ?? []
  const verifications = state?.verifications ?? []
  const confirmed = state?.confirmed ?? []
  const concepts = state?.concepts ?? []

  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: 'commits', label: t('tab.commits') },
    { key: 'overview', label: t('tab.overview') },
    { key: 'execution', label: t('tab.execution') },
    { key: 'notes', label: t('tab.notes') },
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
    return `${(target?.meta.split(' · ')[0]) ?? sha.slice(0, 7)} ${target?.label.slice(0, 18) ?? ''}`.trim()
  }
  const filteredTargets = pickerFilter.trim() === ''
    ? allTargets
    : allTargets.filter((entry) => (entry.label + entry.meta).toLowerCase().includes(pickerFilter.trim().toLowerCase()))

  const impactRiskColor = impact === null ? '#8b8b8b' : (RISK_COLOR[impact.riskLevel] ?? '#8b8b8b')

  const commitsTab = (
    <>
      {/* 仓库栏 */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
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
        {knownRepos.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {knownRepos.map((repo) => (
              <span
                key={repo}
                style={styles.chip(repo === (commitsData?.rootPath ?? ''))}
                onClick={() => { void switchRepo(repo) }}
                title={repo}
              >{repo.split(/[\\/]/).filter(Boolean).pop() ?? repo}</span>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: '6px' }}>
          <input
            style={styles.input}
            placeholder={t('repo.addHint')}
            value={repoInput}
            onChange={(e) => { setRepoInput(e.target.value) }}
            onKeyDown={(e) => { if (e.key === 'Enter' && repoInput.trim() !== '') void switchRepo(repoInput.trim()) }}
          />
          <button style={styles.button} disabled={busy !== null || repoInput.trim() === ''} onClick={() => { void switchRepo(repoInput.trim()) }}>
            {busy === 'switchRepo' ? t('action.running') : t('repo.add')}
          </button>
        </div>
      </Card>

      {/* 提交多选下拉（紧凑，约 1/5 高度以内） */}
      <Card title={t('picker.title')}>
        <div style={{ position: 'relative' }}>
          <button style={{ ...styles.secondary, width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => { setPickerOpen(!pickerOpen) }}>
            <span>{selectedTargets.length === 0
              ? t('picker.placeholder')
              : `${t('picker.selected')} ${selectedTargets.length}：${selectedTargets.map(shortLabel).join('；').slice(0, 80)}`}</span>
            <span style={{ marginLeft: '8px' }}>▾</span>
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
                <div style={{ maxHeight: 280, overflowY: 'auto' }}>
                  {allTargets.map((entry) => (
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
                      <span style={{ minWidth: 0 }}>
                        <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.label}</span>
                        <span style={{ display: 'block', fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>{entry.meta}</span>
                      </span>
                    </div>
                  ))}
                  {filteredTargets.length === 0 && <div style={styles.empty}>{t('picker.noMatch')}</div>}
                </div>
              </div>
            </>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>{t('picker.hint')}</span>
          {detailLoading && <span style={styles.badge('#dcdcaa')}>{t('detail.aiLoading')}</span>}
        </div>
      </Card>

      {commitsError !== null && <Card><div style={styles.empty}>{t('repo.loadFailed')}: {commitsError}</div></Card>}
      {selectedTargets.length === 0 && <Card><div style={styles.empty}>{t('detail.pick')}</div></Card>}

      {/* 每条选中提交的 AI 解读 */}
      {selectedTargets.map((target) => {
        const d = details[target]
        const label = target === 'working' ? t('repo.working') : (d?.commit?.message ?? target.slice(0, 8))
        return (
          <Card key={`d-${target}`} title={`🔍 ${label}${target !== 'working' ? `（${target.slice(0, 8)}）` : ''}`}>
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
                    {d.analysis.risks.map((risk, i) => <div key={i} style={styles.riskItem}>⚠ {risk}</div>)}
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
                            <td style={{ ...styles.td, color: '#2da44e', whiteSpace: 'nowrap' }}>+{file.adds}</td>
                            <td style={{ ...styles.td, color: '#cf222e', whiteSpace: 'nowrap' }}>-{file.dels}</td>
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
          {impact !== null && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0 4px', flexWrap: 'wrap' }}>
                <span style={{ ...styles.badge(impactRiskColor), fontSize: '13px', padding: '3px 10px' }}>
                  {t('impact.risk')}: {impact.riskLevel}（{impact.riskScore}）
                </span>
                {impact.keyChangePoints !== undefined && impact.keyChangePoints.length > 0 && (
                  <span style={{ fontSize: '11px', color: '#9a6700' }}>⚠ {t('impact.keyPoints')}: {impact.keyChangePoints.map((file) => file.split('/').pop()).join('、')}</span>
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
              {impact.levels.length > 0 && (
                <>
                  <div style={{ ...styles.sectionTitle, marginTop: '10px' }}>{t('impact.points')}</div>
                  <table style={styles.table}>
                    <thead>
                      <tr>{['impact.col.level', 'impact.col.path', 'impact.col.depth', 'impact.col.conf', 'impact.col.chain'].map((key) => <th key={key} style={styles.th}>{t(key)}</th>)}</tr>
                    </thead>
                    <tbody>
                      {impact.levels.map((item, i) => (
                        <tr key={i}>
                          <td style={styles.td}>
                            <span style={styles.badge(item.level === 'indirect' ? '#d97706' : '#8b8b8b')}>{item.level === 'indirect' ? t('impact.legend.indirect') : t('impact.legend.potential')}</span>
                          </td>
                          <td style={{ ...styles.td, fontFamily: 'monospace', fontSize: '11px', wordBreak: 'break-all' }}>{item.path}</td>
                          <td style={styles.td}>{item.depth}</td>
                          <td style={styles.td}>{item.confidence}</td>
                          <td style={{ ...styles.td, fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>{item.reason.replace(/^Indirectly affected via /, '').replace(/ path: /, ' ← ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
              {impact.levels.length === 0 && <div style={styles.empty}>{t('impact.none')}</div>}
              {impact.affectedTests.length > 0 && (
                <div style={styles.row}>
                  <span><span style={styles.label}>{t('impact.tests')}</span>{impact.affectedTests.join(', ')}</span>
                </div>
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
                <div style={{ ...styles.sectionTitle }}>{label}</div>
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

  // ── 项目总览页签 ──
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
          <input style={styles.input} placeholder={t('confirmed.text')} value={confirmedText} onChange={(e) => { setConfirmedText(e.target.value) }} />
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
          <input style={styles.input} placeholder={t('form.changeDesc')} value={changeDesc} onChange={(e) => { setChangeDesc(e.target.value) }} />
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
                  <td style={styles.td}>{change.type}</td>
                  <td style={styles.td}><span style={styles.badge(change.status === 'completed' ? '#4ec9b0' : '#569cd6')}>{change.status}</span></td>
                  <td style={styles.td}>{formatTime(change.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </>
  )

  // ── 执行中心页签 ──
  const executionTab = (
    <>
      <Card>
        <div style={{ fontSize: '12px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>{t('exec.hint')}</div>
      </Card>
      <Card>
        <div style={styles.row}>
          <span><span style={styles.label}>{t('exec.attempts')}</span>{String(state?.attemptsCount ?? 0)}</span>
        </div>
        {runs.length === 0 ? (
          <div style={styles.empty}>{t('state.noRuns')}</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>{['exec.col.change', 'exec.col.status', 'exec.col.started', 'exec.col.cost'].map((key) => <th key={key} style={styles.th}>{t(key)}</th>)}</tr>
            </thead>
            <tbody>
              {runs.map((run) => (
                <tr key={run.id}>
                  <td style={styles.td}>{run.changeId}</td>
                  <td style={styles.td}><span style={styles.badge(run.status === 'completed' ? '#4ec9b0' : '#dcdcaa')}>{run.status}</span></td>
                  <td style={styles.td}>{formatTime(run.startedAt)}</td>
                  <td style={styles.td}>{run.costUsd !== undefined ? '$' + run.costUsd.toFixed(4) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </>
  )

  // ── 笔记与记忆页签 ──
  const notesTab = (
    <>
      <Card title={t('notes.title')}>
        <div style={styles.formRow}>
          <input style={styles.input} placeholder={t('notes.formTitle')} value={noteTitle} onChange={(e) => { setNoteTitle(e.target.value) }} />
          <input style={styles.input} placeholder={t('notes.formContent')} value={noteContent} onChange={(e) => { setNoteContent(e.target.value) }} />
          {selectedTargets.length > 0 && (
            <div style={{ fontSize: '11px', color: 'var(--dsw-alias-label-secondary, #6b7280)' }}>
              {t('notes.boundTo')}: {selectedTargets[0] === 'working' ? t('repo.working') : selectedTargets[0].slice(0, 8)}
            </div>
          )}
          <button style={styles.button} disabled={noteTitle.trim() === '' || noteContent.trim() === ''} onClick={() => { void addNote() }}>{t('notes.add')}</button>
        </div>
        {notes.length === 0 ? (
          <div style={styles.empty}>{t('notes.empty')}</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>{['notes.col.time', 'notes.col.title', 'notes.col.content', 'notes.col.sha', ''].map((key, i) => <th key={i} style={styles.th}>{key === '' ? '' : t(key)}</th>)}</tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr key={note.id}>
                  <td style={{ ...styles.td, whiteSpace: 'nowrap' }}>{new Date(note.createdAt).toLocaleString()}</td>
                  <td style={styles.td}>{note.title}</td>
                  <td style={styles.td}>{note.content}</td>
                  <td style={styles.td}>{note.sha === undefined ? '—' : note.sha === 'working' ? t('repo.working') : note.sha.slice(0, 8)}</td>
                  <td style={styles.td}>
                    <button style={{ ...styles.secondary, padding: '2px 8px', fontSize: '11px' }} onClick={() => { void removeNote(note.id) }}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
      <Card title={t('memory.record')}>
        <div style={styles.formRow}>
          <input style={styles.input} placeholder={t('form.memoryTitle')} value={memoryTitle} onChange={(e) => { setMemoryTitle(e.target.value) }} />
          <input style={styles.input} placeholder={t('form.memoryContent')} value={memoryContent} onChange={(e) => { setMemoryContent(e.target.value) }} />
          <button
            style={styles.button}
            disabled={busy !== null || memoryTitle === '' || memoryContent === ''}
            onClick={() => { void runAction('recordMemory', '/project-control/api/memory', { memoryType: 'project_log', title: memoryTitle, content: memoryContent }).then(() => { setMemoryTitle(''); setMemoryContent('') }) }}
          >{busy === 'recordMemory' ? t('action.running') : t('memory.record')}</button>
        </div>
        {memories.length === 0 ? (
          <div style={styles.empty}>{t('memory.empty')}</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>{['memory.col.title', 'memory.col.type', 'memory.col.truth', 'memory.col.branch', 'memory.confirm'].map((key) => <th key={key} style={styles.th}>{t(key)}</th>)}</tr>
            </thead>
            <tbody>
              {memories.map((memory) => (
                <tr key={memory.id}>
                  <td style={styles.td}>{memory.title}</td>
                  <td style={styles.td}>{memory.type}</td>
                  <td style={styles.td}><span style={styles.badge(memory.isHumanConfirmed ? '#4ec9b0' : '#dcdcaa')}>{memory.isHumanConfirmed ? 'confirmed' : memory.truthLevel}</span></td>
                  <td style={styles.td}>{memory.gitBranch ?? '—'}</td>
                  <td style={styles.td}>
                    {memory.isHumanConfirmed
                      ? <span style={styles.badge('#4ec9b0')}>✓</span>
                      : <button style={{ ...styles.button, padding: '2px 8px', fontSize: '11px' }} onClick={() => { void confirmMemory(memory.id) }}>{t('memory.confirm')}</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
      <Card title={t('review.recordsTitle')}>
        {issues.length === 0 ? (
          <div style={styles.empty}>—</div>
        ) : (
          <table style={styles.table}>
            <tbody>
              {issues.slice(0, 20).map((issue) => (
                <tr key={issue.id}>
                  <td style={styles.td}><span style={styles.badge(issue.severity === 'critical' || issue.severity === 'high' ? '#ce9178' : '#569cd6')}>{issue.severity}</span></td>
                  <td style={styles.td}>{issue.title}</td>
                  <td style={styles.td}>{issue.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
      <Card title={t('verify.records')}>
        {verifications.length === 0 ? (
          <div style={styles.empty}>—</div>
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
      </div>
      <div style={styles.body}>
        {loadError !== null && <div style={styles.empty}>{t('error.load')}: {loadError}</div>}
        {state?.ready === false && <div style={styles.empty}>{state.reason ?? ''}</div>}
        {tab === 'commits' && commitsTab}
        {tab === 'overview' && overviewTab}
        {tab === 'execution' && executionTab}
        {tab === 'notes' && notesTab}
      </div>
    </div>
  )
}
