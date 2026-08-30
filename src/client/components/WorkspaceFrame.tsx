/**
 * Project Control 工作台（WorkspaceFrame）：
 * 遮蔽官方 `details` 槽（priority -10）后渲染在主框架的 details 列，
 * 并通过注入的样式表把官方网格做视觉换列——
 * 聊天列（centerCol）移到最右，工作台（detailsCol）占据中间 1fr。
 * 左侧导航与官方聊天本体（ConversationRoot 及其全部子槽）零改动。
 *
 * 无会话落地页（data-details-collapsed，details 轨道为 0）恢复原生列序，
 * 英雄页照常显示；工作台此时自然隐藏（0px 轨道）。
 *
 * 数据来自宿主 /project-control/api/state（同源 fetch + 4s 轮询）；
 * 操作按钮（分析/评审/验收/建变更/记忆/影响/历史扫描）POST 宿主 API；
 * 全部文案经 locale 词典（zh/en）。
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

/**
 * 视觉换列样式表：随本组件挂载/卸载（卸载即完全恢复原生布局）。
 * 选择器用 [class*=…] 子串匹配 CSS Modules 哈希类名；
 * [style*="grid-template-columns"] 唯一锚定 AppFrame 的框架 div。
 */
const LAYOUT_STYLE = `
div[class*="frame"][style*="grid-template-columns"] > div[class*="centerCol"] { order: 3; }
div[class*="frame"][style*="grid-template-columns"] > div[class*="detailsCol"] { order: 2; }
div[class*="frame"][style*="grid-template-columns"][data-details-collapsed] > div[class*="centerCol"],
div[class*="frame"][style*="grid-template-columns"][data-details-collapsed] > div[class*="detailsCol"] { order: 0; }
`

type TabKey = 'overview' | 'changes' | 'execution' | 'memory' | 'history'

export interface WorkspaceFrameProps {
  /** 官方 details 槽契约的 locale 注入（我们注册的 project-control 词典）。 */
  t?: (key: string) => string
}

/** 工作台文案词典（zh / en）。 */
export const WORKSPACE_DICT = {
  zh: {
    'workspace.title': '项目工作台',
    'tab.overview': '项目总览',
    'tab.changes': '变更工作台',
    'tab.execution': '执行中心',
    'tab.memory': '记忆与学习',
    'tab.history': '历史',
    'state.project': '当前项目',
    'state.noProject': '尚未初始化项目',
    'state.noProjectHint': '点击「初始化项目」扫描仓库结构、技术栈与符号索引。',
    'action.bootstrap': '初始化项目',
    'action.bootstrapping': '正在初始化…',
    'action.rescan': '重新初始化 / 扫描',
    'action.analyze': '分析当前改动',
    'action.review': '评审当前改动',
    'action.verify': '验收当前改动',
    'action.createChange': '新建变更',
    'action.recordMemory': '记录记忆',
    'action.scanHistory': '扫描历史（含 LLM 轻析）',
    'action.running': '执行中…',
    'form.changeTitle': '变更标题',
    'form.changeDesc': '需求与背景（选填）',
    'form.memoryTitle': '记忆标题',
    'form.memoryContent': '记忆内容（什么与为什么）',
    'result.panel': '操作结果',
    'state.techStack': '技术栈',
    'state.symbols': '已索引符号',
    'state.manifests': '清单文件',
    'state.evidence': '证据条目',
    'state.noChanges': '暂无变更任务。在聊天中让 AI 创建 Change，或用上方「新建变更」。',
    'state.noRuns': '暂无执行记录。',
    'state.noMemories': '暂无项目记忆。',
    'state.noEvidence': '暂无证据记录。',
    'changes.col.title': '标题',
    'changes.col.type': '类型',
    'changes.col.status': '状态',
    'changes.col.updated': '更新时间',
    'memory.col.title': '条目',
    'memory.col.type': '类型',
    'memory.col.truth': '真值',
    'memory.col.branch': '分支',
    'memory.confirm': '确认',
    'exec.col.status': '状态',
    'exec.col.change': '变更',
    'exec.col.started': '开始',
    'exec.attempts': '尝试次数',
    'exec.hint': '执行（start_run）请在右侧聊天中发起：创建计划后对 AI 说「开始执行该 change」。本页查看进度与结果。',
    'history.imported': 'Imported Change（Git 历史重建）',
    'history.col.title': '标题',
    'history.col.commits': '提交数',
    'history.col.period': '时间',
    'history.col.confidence': '置信度',
    'history.col.status': '状态',
    'history.noImported': '暂无历史重建记录。点击「扫描历史」从 git 历史聚类生成。',
    'review.issues': 'Review 问题',
    'review.noIssues': '暂无 Review 问题。',
    'verify.records': '验收记录',
    'verify.noRecords': '暂无验收记录。',
    'evidence.recent': '最近证据',
    'confirmed.title': '已确定事项（人工确认，AI 禁改自动拦截）',
    'confirmed.add': '添加已确定',
    'confirmed.text': '约束/需求内容',
    'confirmed.paths': '禁改路径（逗号分隔，选填）',
    'confirmed.remove': '移除',
    'confirmed.none': '暂无已确定事项。添加后 AI 修改禁改路径将被自动拒绝。',
    'exec.col.cost': '成本(估)',
    'history.continue': '继续扫描（从上次进度）',
    'concepts.title': '学习概念',
    'concepts.none': '暂无学习概念。对 change 调用 summarize_learning 后自动积累。',
    'concepts.col.name': '概念',
    'concepts.col.category': '类别',
    'concepts.col.count': '次数',
    'error.load': '加载失败',
  },
  en: {
    'workspace.title': 'Project Workspace',
    'tab.overview': 'Overview',
    'tab.changes': 'Changes',
    'tab.execution': 'Execution',
    'tab.memory': 'Memory & Learning',
    'tab.history': 'History',
    'state.project': 'Current project',
    'state.noProject': 'No project initialized',
    'state.noProjectHint': 'Run "Initialize project" to scan the repository structure, tech stack, and symbol index.',
    'action.bootstrap': 'Initialize project',
    'action.bootstrapping': 'Initializing…',
    'action.rescan': 'Re-initialize / scan',
    'action.analyze': 'Analyze working diff',
    'action.review': 'Review working diff',
    'action.verify': 'Verify working diff',
    'action.createChange': 'Create change',
    'action.recordMemory': 'Record memory',
    'action.scanHistory': 'Scan history (with LLM notes)',
    'action.running': 'Running…',
    'form.changeTitle': 'Change title',
    'form.changeDesc': 'Requirement and background (optional)',
    'form.memoryTitle': 'Memory title',
    'form.memoryContent': 'Memory content (what and why)',
    'result.panel': 'Action result',
    'state.techStack': 'Tech stack',
    'state.symbols': 'Indexed symbols',
    'state.manifests': 'Manifests',
    'state.evidence': 'Evidence entries',
    'state.noChanges': 'No change tasks yet. Ask the AI in chat to create a Change, or use "Create change" above.',
    'state.noRuns': 'No runs yet.',
    'state.noMemories': 'No project memories yet.',
    'state.noEvidence': 'No evidence recorded yet.',
    'changes.col.title': 'Title',
    'changes.col.type': 'Type',
    'changes.col.status': 'Status',
    'changes.col.updated': 'Updated',
    'memory.col.title': 'Item',
    'memory.col.type': 'Type',
    'memory.col.truth': 'Truth',
    'memory.col.branch': 'Branch',
    'memory.confirm': 'Confirm',
    'exec.col.status': 'Status',
    'exec.col.change': 'Change',
    'exec.col.started': 'Started',
    'exec.attempts': 'Attempts',
    'exec.hint': 'Runs (start_run) are started from chat: after a plan exists, tell the AI to "start run for the change". This tab shows progress and results.',
    'history.imported': 'Imported Change (rebuilt from git history)',
    'history.col.title': 'Title',
    'history.col.commits': 'Commits',
    'history.col.period': 'Period',
    'history.col.confidence': 'Confidence',
    'history.col.status': 'Status',
    'history.noImported': 'No imported changes yet. Click "Scan history" to cluster them from git history.',
    'review.issues': 'Review issues',
    'review.noIssues': 'No review issues.',
    'verify.records': 'Verification records',
    'verify.noRecords': 'No verification records yet.',
    'evidence.recent': 'Recent evidence',
    'confirmed.title': 'Confirmed items (human-confirmed; AI edits to forbidden paths are auto-denied)',
    'confirmed.add': 'Add confirmed item',
    'confirmed.text': 'Requirement / constraint text',
    'confirmed.paths': 'Forbidden paths (comma separated, optional)',
    'confirmed.remove': 'Remove',
    'confirmed.none': 'No confirmed items yet. AI edits to forbidden paths will be auto-denied once added.',
    'exec.col.cost': 'Cost (est)',
    'history.continue': 'Continue scan (from last cursor)',
    'concepts.title': 'Learning concepts',
    'concepts.none': 'No learning concepts yet. Run summarize_learning on a change to accumulate.',
    'concepts.col.name': 'Concept',
    'concepts.col.category': 'Category',
    'concepts.col.count': 'Count',
    'error.load': 'Failed to load',
  },
} as const

function fallbackT(key: string): string {
  const dict = WORKSPACE_DICT.zh as Record<string, string>
  return dict[key] ?? key
}

const styles: Record<string, React.CSSProperties> = {
  root: {
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
    fontSize: '12px', background: 'var(--dsw-alias-brand-primary, #2563eb)', color: '#fff',
  },
  secondary: {
    padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px',
    border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.15))',
    background: 'var(--dsw-alias-bg-layer-1, #fafafa)', color: 'var(--dsw-alias-label-primary, #1f2328)',
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
}

function formatTime(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—'
  return new Date(value).toLocaleString()
}

/** 骨架小卡片。 */
function Card(props: { title?: string; children?: React.ReactNode }) {
  return React.createElement('div', { style: styles.card },
    props.title === undefined ? null : React.createElement('div', { style: { fontWeight: 600, fontSize: '12px', marginBottom: '8px' } }, props.title),
    props.children)
}

/**
 * 工作台主组件：tab 导航 + 数据面板（轮询宿主 API）+ 按钮化操作。
 */
export function WorkspaceFrame(props: WorkspaceFrameProps) {
  const t = props.t ?? fallbackT
  const [tab, setTab] = useState<TabKey>('overview')
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

  const refreshState = async (): Promise<void> => {
    const refreshed = await fetch('/project-control/api/state', { headers: { accept: 'application/json' } })
    if (refreshed.ok) setState(await refreshed.json() as WorkspaceState)
  }

  /** 统一动作执行器：POST 宿主 API，输出进结果面板，完成后刷新状态。 */
  const runAction = async (name: string, path: string, body: Record<string, unknown>): Promise<void> => {
    setBusy(name)
    setActionResult(null)
    try {
      const response = await fetch(path, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data: unknown = await response.json()
      if (!response.ok) {
        const message = (data as { error?: string }).error ?? `HTTP ${response.status}`
        setActionResult(`✗ ${message}`)
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

  const removeConfirmed = async (id: string): Promise<void> => {
    await runAction('removeConfirmed', '/project-control/api/confirmed/remove', { id })
  }

  const runBootstrap = async (): Promise<void> => {
    setBootstrapping(true)
    try {
      const response = await fetch('/project-control/api/bootstrap', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({}),
      })
      const data: unknown = await response.json()
      if (!response.ok) {
        setLoadError((data as { error?: string }).error ?? `HTTP ${response.status}`)
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
    try {
      const response = await fetch('/project-control/api/memory/confirm', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ memoryId }),
      })
      if (!response.ok) {
        const data: unknown = await response.json()
        setLoadError((data as { error?: string }).error ?? `HTTP ${response.status}`)
        return
      }
      setState((previous) => previous === null ? previous : {
        ...previous,
        memories: previous.memories?.map((memory) => memory.id === memoryId ? { ...memory, isHumanConfirmed: true, truthLevel: 'fact' } : memory),
      })
    } catch (error: unknown) {
      setLoadError(error instanceof Error ? error.message : String(error))
    }
  }

  const project = state?.project ?? null
  const bootstrap = state?.bootstrap ?? null
  const changes = state?.changes ?? []
  const runs = state?.runs ?? []
  const memories = state?.memories ?? []
  const importedChanges = state?.importedChanges ?? []
  const issues = state?.issues ?? []
  const verifications = state?.verifications ?? []
  const recentEvidence = state?.recentEvidence ?? []
  const confirmed = state?.confirmed ?? []
  const concepts = state?.concepts ?? []

  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: 'overview', label: t('tab.overview') },
    { key: 'changes', label: t('tab.changes') },
    { key: 'execution', label: t('tab.execution') },
    { key: 'memory', label: t('tab.memory') },
    { key: 'history', label: t('tab.history') },
  ]

  /** 操作结果面板（所有页签共用）。 */
  const resultPanel = actionResult !== null
    ? React.createElement(Card, { title: t('result.panel') },
        React.createElement('div', { style: styles.result }, actionResult))
    : null

  return React.createElement('div', { style: styles.root, 'data-testid': 'project-control-workspace' },
    React.createElement('style', null, LAYOUT_STYLE),
    React.createElement('div', { style: styles.nav },
      React.createElement('span', { style: styles.title }, t('workspace.title')),
      tabs.map((entry) => React.createElement(
        'button',
        { key: entry.key, style: styles.tab(tab === entry.key), onClick: () => { setTab(entry.key) } },
        entry.label,
      )),
    ),
    React.createElement('div', { style: styles.body },
      loadError !== null && React.createElement('div', { style: styles.empty }, `${t('error.load')}: ${loadError}`),
      state?.ready === false && React.createElement('div', { style: styles.empty }, state.reason ?? ''),

      // ── 项目总览：操作栏 + 项目卡 ──
      tab === 'overview' && React.createElement(React.Fragment, null,
        React.createElement(Card, null,
          React.createElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
            React.createElement('button', {
              style: styles.button, disabled: bootstrapping,
              onClick: () => { void runBootstrap() },
            }, bootstrapping ? t('action.running') : t('action.rescan')),
            React.createElement('button', {
              style: styles.secondary, disabled: busy !== null,
              onClick: () => { void runAction('analyze', '/project-control/api/analyze', {}) },
            }, busy === 'analyze' ? t('action.running') : t('action.analyze')),
            React.createElement('button', {
              style: styles.secondary, disabled: busy !== null,
              onClick: () => { void runAction('review', '/project-control/api/review', {}) },
            }, busy === 'review' ? t('action.running') : t('action.review')),
            React.createElement('button', {
              style: styles.secondary, disabled: busy !== null,
              onClick: () => { void runAction('verify', '/project-control/api/verify', {}) },
            }, busy === 'verify' ? t('action.running') : t('action.verify')),
          ),
        ),
        resultPanel,
        project === null
          ? React.createElement(Card, null,
              React.createElement('div', { style: { fontWeight: 600, fontSize: '13px', marginBottom: '6px' } }, t('state.noProject')),
              React.createElement('div', { style: styles.empty }, t('state.noProjectHint')),
            )
          : React.createElement(Card, { title: `${t('state.project')}：${project.name}` },
              React.createElement('div', { style: styles.row },
                React.createElement('span', null, React.createElement('span', { style: styles.label }, 'Root'), project.rootPath),
              ),
              bootstrap !== null && React.createElement(React.Fragment, null,
                React.createElement('div', { style: styles.row },
                  React.createElement('span', null, React.createElement('span', { style: styles.label }, t('state.techStack')),
                    bootstrap.techStack.map((tech) => React.createElement('span', { key: tech, style: styles.badge('#4ec9b0') }, tech))),
                ),
                React.createElement('div', { style: styles.row },
                  React.createElement('span', null, React.createElement('span', { style: styles.label }, t('state.symbols')), String(bootstrap.symbolsCount)),
                  React.createElement('span', null, React.createElement('span', { style: styles.label }, t('state.manifests')), String(bootstrap.manifestFiles.length)),
                  React.createElement('span', null, React.createElement('span', { style: styles.label }, t('state.evidence')), String(state?.evidenceCount ?? 0)),
                ),
                React.createElement('div', { style: { fontSize: '12px', color: 'var(--dsw-alias-label-secondary, #6b7280)', marginTop: '8px' } }, bootstrap.summary),
              ),
            ),
        React.createElement(Card, { title: t('confirmed.title') },
          React.createElement('div', { style: styles.formRow },
            React.createElement('input', { style: styles.input, placeholder: t('confirmed.text'), value: confirmedText, onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setConfirmedText(e.target.value) } }),
            React.createElement('input', { style: styles.input, placeholder: t('confirmed.paths'), value: confirmedPaths, onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setConfirmedPaths(e.target.value) } }),
            React.createElement('button', {
              style: styles.button, disabled: busy !== null || confirmedText === '',
              onClick: () => { void runAction('addConfirmed', '/project-control/api/confirmed', { type: 'constraint', text: confirmedText, forbiddenPaths: confirmedPaths.split(',').map((path) => path.trim()).filter((path) => path !== '') }).then(() => { setConfirmedText(''); setConfirmedPaths('') }) },
            }, busy === 'addConfirmed' ? t('action.running') : t('confirmed.add')),
          ),
          confirmed.length === 0
            ? React.createElement('div', { style: styles.empty }, t('confirmed.none'))
            : React.createElement('table', { style: styles.table },
                React.createElement('tbody', null, confirmed.map((item) => React.createElement('tr', { key: item.id },
                  React.createElement('td', { style: styles.td }, React.createElement('span', { style: styles.badge('#c586c0') }, item.type)),
                  React.createElement('td', { style: styles.td }, item.text),
                  React.createElement('td', { style: styles.td }, item.forbiddenPaths.join(', ') || '—'),
                  React.createElement('td', { style: styles.td }, React.createElement('button', {
                    style: { ...styles.secondary, padding: '2px 8px', fontSize: '11px' },
                    onClick: () => { void removeConfirmed(item.id) },
                  }, t('confirmed.remove'))),
                ))),
              )),
        ),

      // ── 变更工作台：新建表单 + 列表 ──
      tab === 'changes' && React.createElement(React.Fragment, null,
        React.createElement(Card, { title: t('action.createChange') },
          React.createElement('div', { style: styles.formRow },
            React.createElement('input', { style: styles.input, placeholder: t('form.changeTitle'), value: changeTitle, onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setChangeTitle(e.target.value) } }),
            React.createElement('input', { style: styles.input, placeholder: t('form.changeDesc'), value: changeDesc, onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setChangeDesc(e.target.value) } }),
            React.createElement('button', {
              style: styles.button, disabled: busy !== null || changeTitle === '',
              onClick: () => { void runAction('createChange', '/project-control/api/changes', { title: changeTitle, description: changeDesc }).then(() => { setChangeTitle(''); setChangeDesc('') }) },
            }, busy === 'createChange' ? t('action.running') : t('action.createChange')),
          ),
        ),
        resultPanel,
        React.createElement(Card, null,
          changes.length === 0
            ? React.createElement('div', { style: styles.empty }, t('state.noChanges'))
            : React.createElement('table', { style: styles.table },
                React.createElement('thead', null, React.createElement('tr', null,
                  ['changes.col.title', 'changes.col.type', 'changes.col.status', 'changes.col.updated'].map((key) =>
                    React.createElement('th', { key, style: styles.th }, t(key)))),
                ),
                React.createElement('tbody', null, changes.map((change) => React.createElement('tr', { key: change.id },
                  React.createElement('td', { style: styles.td }, change.title),
                  React.createElement('td', { style: styles.td }, change.type),
                  React.createElement('td', { style: styles.td }, React.createElement('span', { style: styles.badge(change.status === 'completed' ? '#4ec9b0' : '#569cd6') }, change.status)),
                  React.createElement('td', { style: styles.td }, formatTime(change.updatedAt)),
                ))),
              )),
      ),

      // ── 执行中心：提示 + 汇总 ──
      tab === 'execution' && React.createElement(React.Fragment, null,
        React.createElement(Card, null,
          React.createElement('div', { style: { fontSize: '12px', color: 'var(--dsw-alias-label-secondary, #6b7280)' } }, t('exec.hint'))),
        React.createElement(Card, null,
          React.createElement('div', { style: styles.row },
            React.createElement('span', null, React.createElement('span', { style: styles.label }, t('exec.attempts')), String(state?.attemptsCount ?? 0))),
          runs.length === 0
            ? React.createElement('div', { style: styles.empty }, t('state.noRuns'))
            : React.createElement('table', { style: styles.table },
                React.createElement('thead', null, React.createElement('tr', null,
                  ['exec.col.change', 'exec.col.status', 'exec.col.started', 'exec.col.cost'].map((key) =>
                    React.createElement('th', { key, style: styles.th }, t(key)))),
                ),
                React.createElement('tbody', null, runs.map((run) => React.createElement('tr', { key: run.id },
                  React.createElement('td', { style: styles.td }, run.changeId),
                  React.createElement('td', { style: styles.td }, React.createElement('span', { style: styles.badge(run.status === 'completed' ? '#4ec9b0' : '#dcdcaa') }, run.status)),
                  React.createElement('td', { style: styles.td }, formatTime(run.startedAt)),
                  React.createElement('td', { style: styles.td }, run.costUsd !== undefined ? '$' + run.costUsd.toFixed(4) : '—'),
                ))),
              )),
      ),

      // ── 记忆与学习：记录表单 + 列表（含确认） + Review/验收/证据 ──
      // ── 记忆与学习：记录表单 + 列表（含确认） + 学习概念 + Review/验收/证据 ──
      tab === 'memory' && React.createElement(React.Fragment, null,
        React.createElement(Card, { title: t('action.recordMemory') },
          React.createElement('div', { style: styles.formRow },
            React.createElement('input', { style: styles.input, placeholder: t('form.memoryTitle'), value: memoryTitle, onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setMemoryTitle(e.target.value) } }),
            React.createElement('input', { style: styles.input, placeholder: t('form.memoryContent'), value: memoryContent, onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setMemoryContent(e.target.value) } }),
            React.createElement('button', {
              style: styles.button, disabled: busy !== null || memoryTitle === '' || memoryContent === '',
              onClick: () => { void runAction('recordMemory', '/project-control/api/memory', { memoryType: 'project_log', title: memoryTitle, content: memoryContent }).then(() => { setMemoryTitle(''); setMemoryContent('') }) },
            }, busy === 'recordMemory' ? t('action.running') : t('action.recordMemory')),
          ),
        ),
        resultPanel,
        React.createElement(Card, null,
          memories.length === 0
            ? React.createElement('div', { style: styles.empty }, t('state.noMemories'))
            : React.createElement('table', { style: styles.table },
                React.createElement('thead', null, React.createElement('tr', null,
                  ['memory.col.title', 'memory.col.type', 'memory.col.truth', 'memory.col.branch', 'memory.confirm'].map((key) =>
                    React.createElement('th', { key, style: styles.th }, t(key)))),
                ),
                React.createElement('tbody', null, memories.map((memory) => React.createElement('tr', { key: memory.id },
                  React.createElement('td', { style: styles.td }, memory.title),
                  React.createElement('td', { style: styles.td }, memory.type),
                  React.createElement('td', { style: styles.td }, React.createElement('span', { style: styles.badge(memory.isHumanConfirmed ? '#4ec9b0' : '#dcdcaa') }, memory.isHumanConfirmed ? 'confirmed' : memory.truthLevel)),
                  React.createElement('td', { style: styles.td }, memory.gitBranch ?? '—'),
                  React.createElement('td', { style: styles.td }, memory.isHumanConfirmed
                    ? React.createElement('span', { style: styles.badge('#4ec9b0') }, '✓')
                    : React.createElement('button', {
                        style: { ...styles.button, padding: '2px 8px', fontSize: '11px' },
                        onClick: () => { void confirmMemory(memory.id) },
                      }, t('memory.confirm'))),
                ))),
              )),
        React.createElement(Card, { title: t('concepts.title') },
          concepts.length === 0
            ? React.createElement('div', { style: styles.empty }, t('concepts.none'))
            : React.createElement('table', { style: styles.table },
                React.createElement('thead', null, React.createElement('tr', null,
                  ['concepts.col.name', 'concepts.col.category', 'concepts.col.count'].map((key) =>
                    React.createElement('th', { key, style: styles.th }, t(key)))),
                ),
                React.createElement('tbody', null, concepts.map((concept) => React.createElement('tr', { key: concept.id },
                  React.createElement('td', { style: styles.td }, concept.name),
                  React.createElement('td', { style: styles.td }, concept.category),
                  React.createElement('td', { style: styles.td }, String(concept.occurrences)),
                ))),
              )),
        React.createElement(Card, { title: t('review.issues') },
          issues.length === 0
            ? React.createElement('div', { style: styles.empty }, t('review.noIssues'))
            : React.createElement('table', { style: styles.table },
                React.createElement('thead', null, React.createElement('tr', null,
                  ['review.col.severity', 'review.col.title', 'review.col.status'].map((key) =>
                    React.createElement('th', { key, style: styles.th }, t(key)))),
                ),
                React.createElement('tbody', null, issues.map((issue) => React.createElement('tr', { key: issue.id },
                  React.createElement('td', { style: styles.td }, React.createElement('span', { style: styles.badge(issue.severity === 'critical' || issue.severity === 'high' ? '#ce9178' : '#569cd6') }, issue.severity)),
                  React.createElement('td', { style: styles.td }, issue.title),
                  React.createElement('td', { style: styles.td }, issue.status),
                ))),
              )),
        React.createElement(Card, { title: t('verify.records') },
          verifications.length === 0
            ? React.createElement('div', { style: styles.empty }, t('verify.noRecords'))
            : React.createElement('table', { style: styles.table },
                React.createElement('tbody', null, verifications.map((record) => React.createElement('tr', { key: record.id },
                  React.createElement('td', { style: styles.td }, React.createElement('span', { style: styles.badge(record.status === 'passed' ? '#4ec9b0' : '#dcdcaa') }, record.status)),
                  React.createElement('td', { style: styles.td }, record.name),
                  React.createElement('td', { style: styles.td }, formatTime(record.createdAt)),
                ))),
              )),
        React.createElement(Card, { title: t('evidence.recent') },
          recentEvidence.length === 0
            ? React.createElement('div', { style: styles.empty }, t('state.noEvidence'))
            : React.createElement('table', { style: styles.table },
                React.createElement('tbody', null, recentEvidence.map((item) => React.createElement('tr', { key: item.id },
                  React.createElement('td', { style: styles.td }, React.createElement('span', { style: styles.badge('#569cd6') }, item.source)),
                  React.createElement('td', { style: styles.td }, item.locator),
                  React.createElement('td', { style: styles.td }, formatTime(item.createdAt)),
                ))),
              )),
      ),

      // ── 历史：扫描/续跑按钮 + Imported Change 列表 ──
      tab === 'history' && React.createElement(React.Fragment, null,
        React.createElement(Card, null,
          React.createElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
            React.createElement('button', {
              style: styles.button, disabled: busy !== null,
              onClick: () => { void runAction('scanHistory', '/project-control/api/bootstrap', { includeHistory: true, summarize: true, maxCommits: 30 }) },
            }, busy === 'scanHistory' ? t('action.running') : t('action.scanHistory')),
            React.createElement('button', {
              style: styles.secondary, disabled: busy !== null,
              onClick: () => { void runAction('continueHistory', '/project-control/api/bootstrap', { includeHistory: true, summarize: true, maxCommits: 30, resume: true }) },
            }, busy === 'continueHistory' ? t('action.running') : t('history.continue')),
          ),
        ),
        resultPanel,
        React.createElement(Card, { title: t('history.imported') },
          importedChanges.length === 0
            ? React.createElement('div', { style: styles.empty }, t('history.noImported'))
            : React.createElement('table', { style: styles.table },
                React.createElement('thead', null, React.createElement('tr', null,
                  ['history.col.title', 'history.col.commits', 'history.col.period', 'history.col.confidence', 'history.col.status'].map((key) =>
                    React.createElement('th', { key, style: styles.th }, t(key)))),
                ),
                React.createElement('tbody', null, importedChanges.map((item) => React.createElement('tr', { key: item.id },
                  React.createElement('td', { style: styles.td }, item.title),
                  React.createElement('td', { style: styles.td }, String(item.commitCount)),
                  React.createElement('td', { style: styles.td }, formatTime(item.firstCommitAt)),
                  React.createElement('td', { style: styles.td }, String(item.confidence)),
                  React.createElement('td', { style: styles.td }, React.createElement('span', { style: styles.badge(item.status === 'confirmed' ? '#4ec9b0' : '#dcdcaa') }, item.status)),
                ))),
              )),
      ),
    ),
  )
}
