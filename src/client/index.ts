/**
 * Client plugin entry for dsh-project-control.
 *
 * 布局架构（已验证，2026-08-30）：
 * - 工作台遮蔽官方 `details` 槽（priority -10，官方 DetailsPanel 留在账本上，
 *   卸载我们的注册即恢复），渲染在主框架 details 列；
 * - WorkspaceFrame 注入样式表，把官方网格视觉换列：聊天（centerCol）最右、
 *   工作台（detailsCol）居中 1fr；无会话落地页（data-details-collapsed）
 *   自动恢复原生列序；
 * - 左侧官方导航、官方聊天本体零改动；
 * - 侧边栏按钮在「项目工作台 ⇄ 官方详情面板」间切换（可逆）；
 * - `tool.call.toolview` 为 analyze_change 保留专属卡片；
 * - 文案全部经 ctx.locale 词典（zh / en）。
 *
 * @module dsh-client-project-control
 */

import React from 'react'
import { ChangeCard } from './components/ChangeCard.ts'
import { WORKSPACE_DICT, WorkspaceFrame } from './components/WorkspaceFrame.tsx'

const NS = 'project-control'

export const name = 'client-project-control'
export const inject = ['slots', 'locale', 'layout']

export function apply(ctx: any): void {
  ctx.effect(() => ctx.locale.register(NS, { zh: WORKSPACE_DICT.zh, en: WORKSPACE_DICT.en }), 'project-control: dictionaries')
  const layout = ctx.layout

  // ── 1. 项目工作台：遮蔽 details 槽（可逆）───────────────────────────────
  let workspaceEnabled = true
  let disposeWorkspace: (() => void) | undefined

  const registerWorkspace = (): void => {
    disposeWorkspace = ctx.slots.register(
      {
        name: 'details',
        priority: -10,
        locale: NS,
      },
      // 挂载即打开 details 轨道（面板偏好默认 0）：工作台需要真实宽度；
      // 无会话落地页轨道恒 0，天然保持原生英雄页布局。
      // 会话切换时官方会 closeDetails —— 延后一拍重新撑开（宏任务晚于父级 effect）。
      (props: any) => {
        ;(window as any).__pcDbg = ((window as any).__pcDbg ?? []).concat({ sessionId: props.sessionId, hadLayout: !!layout, hadOpen: typeof layout?.openDetails })
        React.useEffect(() => {
          layout?.openDetails?.()
        }, [])
        React.useEffect(() => {
          if (props.sessionId === undefined) return
          const timer = setTimeout(() => layout?.openDetails?.(), 0)
          return () => { clearTimeout(timer) }
        }, [props.sessionId])
        return React.createElement(WorkspaceFrame, { ...props, layout })
      },
    )
  }
  const unregisterWorkspace = (): void => {
    disposeWorkspace?.()
    disposeWorkspace = undefined
  }

  ctx.slots.inject('details', () => {
    if (workspaceEnabled) registerWorkspace()
    return () => {
      unregisterWorkspace()
    }
  })

  // ── 2. 侧边栏底部：工作台 ⇄ 官方详情 切换 ─────────────────────────────
  ctx.slots.inject('sidebar.footer.action', () => {
    return ctx.slots.register({
      name: 'sidebar.footer.action',
      id: 'project-control-toggle',
    }, () => {
      return React.createElement(
        'button',
        {
          'data-testid': 'project-control-sidebar-toggle',
          title: '项目工作台 ⇄ 详情面板',
          style: {
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '6px 10px', fontSize: '12px',
            background: 'none', border: 'none',
            color: 'inherit', cursor: 'pointer', opacity: 0.85,
          },
          onClick: () => {
            workspaceEnabled = !workspaceEnabled
            try {
              if (workspaceEnabled && disposeWorkspace === undefined) registerWorkspace()
              else if (!workspaceEnabled) unregisterWorkspace()
            } catch (error: unknown) {
              console.warn('[project-control] workspace toggle failed', error)
            }
          },
        },
        '🧭 工作台',
      )
    })
  })

  // ── 3. 聊天工具卡片（执行/评审/验收）──────────────────────────────────
  const simpleResultCard = (title: string): ((props: any) => any) => (props: any) => {
    const output = props?.output
    const text = typeof output === 'string'
      ? output
      : output?.summary ?? output?.issues ?? output?.details ?? (output ? JSON.stringify(output, null, 2) : '执行中…')
    return React.createElement(
      'div',
      {
        style: {
          border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))',
          borderRadius: '8px',
          padding: '10px 12px',
          margin: '4px 0',
          background: 'var(--dsw-alias-bg-layer-1, #fafafa)',
          fontSize: '12px',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
          maxHeight: 260,
          overflowY: 'auto',
        },
      },
      React.createElement('div', { style: { fontWeight: 600, marginBottom: '4px' } }, title),
      String(text),
    )
  }

  // ── 3. analyze_change 专属工具卡片 ─────────────────────────────────────
  ctx.slots.inject('tool.call.toolview', () => {
    return ctx.slots.register({
      name: 'tool.call.toolview',
      key: 'analyze_change',
    }, (props: any) => {
      if (props?.toolName !== 'analyze_change') return null
      const output = props?.output
      return React.createElement(ChangeCard, {
        title: '变更分析报告 (Change Analysis)',
        filesChanged: output?.filesChanged ?? 0,
        insertions: output?.insertions ?? 0,
        deletions: output?.deletions ?? 0,
        evidenceId: output?.evidenceId,
        status: output ? 'completed' : 'analyzing',
      })
    })
  })

  for (const [toolKey, title] of [
    ['start_run', '🚀 执行 Run'],
    ['run_review', '🔍 代码评审'],
    ['run_verification', '✅ 验收验证'],
  ] as const) {
    ctx.slots.inject('tool.call.toolview', () => {
      return ctx.slots.register({ name: 'tool.call.toolview', key: toolKey }, simpleResultCard(title))
    })
  }
}
