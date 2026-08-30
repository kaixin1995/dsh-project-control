/**
 * Client plugin entry for dsh-project-control.
 * Registers UI components using ctx.slots.inject to wait on slot declarations safely:
 * - conversation.view: 📊 项目控制 (Project Control Dashboard View Tab)
 * - sidebar.footer.action: 📊 项目控制 (Sidebar Action Button)
 * - tool.call.toolview: Custom change card for analyze_change
 * - conversation.session.header.actions: Header badge
 *
 * @module dsh-client-project-control
 */

import React from 'react'
import { ChangeCard } from './components/ChangeCard.ts'
import { ProjectControlView } from './components/ProjectControlView.tsx'

export const name = 'client-project-control'
export const inject = ['slots']

export function apply(ctx: any): void {
  const slots = ctx.get('slots')
  if (!slots || typeof slots.inject !== 'function') return

  // 1. 会话主视图 Tab 页签 (Conversation View Tab) - 与 Chat / Trajectory 并列
  slots.inject('conversation.view', () => {
    return slots.register({
      name: 'conversation.view',
      id: 'project-control',
      order: 20,
      label: () => '📊 项目控制',
    }, (props: any) => {
      return React.createElement(ProjectControlView, props)
    })
  })

  // 2. 侧边栏底部操作入口 (Sidebar Footer Action)
  slots.inject('sidebar.footer.action', () => {
    return slots.register({
      name: 'sidebar.footer.action',
      id: 'project-control-action',
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
        '📊 项目控制',
      )
    })
  })

  // 3. 自定义变更卡片工具视图 (Tool Call Toolview for analyze_change)
  slots.inject('tool.call.toolview', () => {
    return slots.register({
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

  // 4. 会话标题状态徽标 (Conversation Session Header Actions)
  slots.inject('conversation.session.header.actions', () => {
    return slots.register({
      name: 'conversation.session.header.actions',
      id: 'project-control-badge',
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
        '🛡️ Project Insight 活跃',
      )
    })
  })
}
