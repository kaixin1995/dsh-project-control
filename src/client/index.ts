/**
 * Client plugin entry for dsh-project-control.
 * Registers UI components into authorized additive slots:
 * - sidebar.footer.action
 * - tool.call.toolview
 * - conversation.session.header.actions
 * - conversation.view
 *
 * @module dsh-client-project-control
 */

import React from 'react'
import { ChangeCard } from './components/ChangeCard.ts'

export const name = 'client-project-control'
export const inject = ['slots']

export function apply(ctx: any): void {
  const slots = ctx.get('slots')
  if (!slots) return

  // 1. 侧边栏底部操作入口 (Sidebar Footer Action)
  slots.register({
    name: 'sidebar.footer.action',
  }, () => {
    return React.createElement(
      'button',
      {
        'data-testid': 'project-control-sidebar-entry',
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 10px',
          fontSize: '12px',
          background: 'none',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          opacity: 0.85,
        },
        onClick: () => {
          console.log('Project Control sidebar entry clicked')
        },
      },
      '📊 项目控制 (Project Control)',
    )
  })

  // 2. 自定义变更卡片工具视图 (Tool Call Toolview for analyze_change)
  slots.register({
    name: 'tool.call.toolview',
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

  // 3. 会话标题状态徽标 (Conversation Session Header Actions)
  slots.register({
    name: 'conversation.session.header.actions',
  }, () => {
    return React.createElement(
      'div',
      {
        'data-testid': 'project-control-header-badge',
        style: {
          fontSize: '11px',
          padding: '2px 8px',
          borderRadius: '4px',
          backgroundColor: 'var(--dsh-status-bg, rgba(78, 201, 176, 0.15))',
          color: 'var(--dsh-status-text, #4ec9b0)',
          display: 'inline-flex',
          alignItems: 'center',
        },
      },
      '🛡️ Project Insight 运行中',
    )
  })

  // 4. 会话视图扩展插槽 (Conversation View)
  slots.register({
    name: 'conversation.view',
  }, () => {
    return React.createElement(
      'div',
      {
        'data-testid': 'project-control-panel-overlay',
        style: {
          padding: '8px 12px',
          fontSize: '12px',
          opacity: 0.9,
        },
      },
    )
  })
}
