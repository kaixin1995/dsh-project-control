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
 * 数据来自宿主 /project-control/api/state（同源 fetch + 4s 轮询），
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
  runs?: Array<{ id: string; changeId: string; status: string; startedAt: number | null; finishedAt: number | null }>
  attemptsCount?: number
  memories?: Array<{ id: string; type: string; truthLevel: string; title: string; isHumanConfirmed: boolean; gitBranch: string | null; createdAt: number }>
  evidenceCount?: number
  recentEvidence?: Array<{ id: string; source: string; truthLevel: string; locator: string; snippet: string; createdAt: number }>
  bootstrap?: { id: string; summary: string; techStack: string[]; manifestFiles: string[]; symbolsCount: number; createdAt: number } | null
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

type TabKey = 'overview' | 'changes' | 'execution' | 'memory'

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
    'state.project': '当前项目',
    'state.noProject': '尚未初始化项目',
    'state.noProjectHint': '点击「初始化项目」扫描仓库结构、技术栈与符号索引。',
    'action.bootstrap': '初始化项目',
    'action.bootstrapping': '正在初始化…',
    'state.techStack': '技术栈',
    'state.symbols': '已索引符号',
    'state.manifests': '清单文件',
    'state.evidence': '证据条目',
    'state.noChanges': '暂无变更任务。在聊天中让 AI 创建 Change 后，这里会实时展示。',
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
    'exec.col.status': '状态',
    'exec.col.change': '变更',
    'exec.col.started': '开始',
    'exec.attempts': '尝试次数',
    'evidence.recent': '最近证据',
    'error.load': '加载失败',
  },
  en: {
    'workspace.title': 'Project Workspace',
    'tab.overview': 'Overview',
    'tab.changes': 'Changes',
    'tab.execution': 'Execution',
    'tab.memory': 'Memory & Learning',
    'state.project': 'Current project',
    'state.noProject': 'No project initialized',
    'state.noProjectHint': 'Run "Initialize project" to scan the repository structure, tech stack, and symbol index.',
    'action.bootstrap': 'Initialize project',
    'action.bootstrapping': 'Initializing…',
    'state.techStack': 'Tech stack',
    'state.symbols': 'Indexed symbols',
    'state.manifests': 'Manifests',
    'state.evidence': 'Evidence entries',
    'state.noChanges': 'No change tasks yet. Ask the AI in chat to create a Change and it will appear here.',
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
    'exec.col.status': 'Status',
    'exec.col.change': 'Change',
    'exec.col.started': 'Started',
    'exec.attempts': 'Attempts',
    'evidence.recent': 'Recent evidence',
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
    background: 'var(--dsw-alias-bg-base, #1e1e1e)',
    color: 'var(--dsw-alias-text-primary, #ccc)',
    fontFamily: 'var(--ds-font-sans, inherit)',
    overflow: 'hidden',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 12px',
    borderBottom: '1px solid var(--dsw-alias-border-l1, #333)',
    flex: 'none',
  },
  title: { fontSize: '13px', fontWeight: 600, marginInlineEnd: '10px' },
  tab: (active: boolean): React.CSSProperties => ({
    padding: '5px 12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    background: active ? 'var(--dsw-alias-fill-accent, #0e639c)' : 'transparent',
    color: active ? '#fff' : 'var(--dsw-alias-text-secondary, #999)',
  }),
  body: { flex: 1, overflowY: 'auto', padding: '14px 16px' },
  card: {
    border: '1px solid var(--dsw-alias-border-l1, #333)',
    borderRadius: '8px',
    padding: '12px 14px',
    marginBottom: '12px',
    background: 'var(--dsw-alias-bg-elevated, #252526)',
  },
  row: { display: 'flex', gap: '18px', flexWrap: 'wrap', fontSize: '12px', margin: '6px 0' },
  label: { color: 'var(--dsw-alias-text-secondary, #999)', marginInlineEnd: '6px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' },
  th: { textAlign: 'start', padding: '6px 8px', borderBottom: '1px solid var(--dsw-alias-border-l1, #333)', color: 'var(--dsw-alias-text-secondary, #999)', fontWeight: 500 },
  td: { padding: '6px 8px', borderBottom: '1px solid var(--dsw-alias-border-l2, #2a2a2a)' },
  empty: { color: 'var(--dsw-alias-text-secondary, #999)', fontSize: '12px', padding: '10px 4px' },
  button: {
    padding: '5px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer',
    fontSize: '12px', background: 'var(--dsw-alias-fill-accent, #0e639c)', color: '#fff',
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
 * 工作台主组件：tab 导航 + 数据面板（轮询宿主 API）。
 */
export function WorkspaceFrame(props: WorkspaceFrameProps) {
  const t = props.t ?? fallbackT
  const [tab, setTab] = useState<TabKey>('overview')
  const [state, setState] = useState<WorkspaceState | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [bootstrapping, setBootstrapping] = useState(false)

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
        const message = (data as { error?: string }).error ?? `HTTP ${response.status}`
        setLoadError(message)
        return
      }
      const refreshed = await fetch('/project-control/api/state', { headers: { accept: 'application/json' } })
      if (refreshed.ok) setState(await refreshed.json() as WorkspaceState)
    } catch (error: unknown) {
      setLoadError(error instanceof Error ? error.message : String(error))
    } finally {
      setBootstrapping(false)
    }
  }

  const project = state?.project ?? null
  const bootstrap = state?.bootstrap ?? null
  const changes = state?.changes ?? []
  const runs = state?.runs ?? []
  const memories = state?.memories ?? []
  const recentEvidence = state?.recentEvidence ?? []

  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: 'overview', label: t('tab.overview') },
    { key: 'changes', label: t('tab.changes') },
    { key: 'execution', label: t('tab.execution') },
    { key: 'memory', label: t('tab.memory') },
  ]

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

      tab === 'overview' && React.createElement(React.Fragment, null,
        project === null
          ? React.createElement(Card, null,
              React.createElement('div', { style: { fontWeight: 600, fontSize: '13px', marginBottom: '6px' } }, t('state.noProject')),
              React.createElement('div', { style: styles.empty }, t('state.noProjectHint')),
              React.createElement('button', { style: styles.button, disabled: bootstrapping, onClick: () => { void runBootstrap() } },
                bootstrapping ? t('action.bootstrapping') : t('action.bootstrap')),
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
                React.createElement('div', { style: { fontSize: '12px', color: 'var(--dsw-alias-text-secondary, #999)', marginTop: '8px' } }, bootstrap.summary),
              ),
            )),

      tab === 'changes' && React.createElement(Card, null,
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

      tab === 'execution' && React.createElement(Card, null,
        React.createElement('div', { style: styles.row },
          React.createElement('span', null, React.createElement('span', { style: styles.label }, t('exec.attempts')), String(state?.attemptsCount ?? 0))),
        runs.length === 0
          ? React.createElement('div', { style: styles.empty }, t('state.noRuns'))
          : React.createElement('table', { style: styles.table },
              React.createElement('thead', null, React.createElement('tr', null,
                ['exec.col.change', 'exec.col.status', 'exec.col.started'].map((key) =>
                  React.createElement('th', { key, style: styles.th }, t(key)))),
              ),
              React.createElement('tbody', null, runs.map((run) => React.createElement('tr', { key: run.id },
                React.createElement('td', { style: styles.td }, run.changeId),
                React.createElement('td', { style: styles.td }, React.createElement('span', { style: styles.badge(run.status === 'completed' ? '#4ec9b0' : '#dcdcaa') }, run.status)),
                React.createElement('td', { style: styles.td }, formatTime(run.startedAt)),
              ))),
            )),

      tab === 'memory' && React.createElement(React.Fragment, null,
        React.createElement(Card, null,
          memories.length === 0
            ? React.createElement('div', { style: styles.empty }, t('state.noMemories'))
            : React.createElement('table', { style: styles.table },
                React.createElement('thead', null, React.createElement('tr', null,
                  ['memory.col.title', 'memory.col.type', 'memory.col.truth', 'memory.col.branch'].map((key) =>
                    React.createElement('th', { key, style: styles.th }, t(key)))),
                ),
                React.createElement('tbody', null, memories.map((memory) => React.createElement('tr', { key: memory.id },
                  React.createElement('td', { style: styles.td }, memory.title),
                  React.createElement('td', { style: styles.td }, memory.type),
                  React.createElement('td', { style: styles.td }, React.createElement('span', { style: styles.badge(memory.isHumanConfirmed ? '#4ec9b0' : '#dcdcaa') }, memory.isHumanConfirmed ? 'confirmed' : memory.truthLevel)),
                  React.createElement('td', { style: styles.td }, memory.gitBranch ?? '—'),
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
    ),
  )
}
