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

import type { Context } from '@deepseek-ai/cordis'
import React from 'react'
import { ChangeCard } from './components/ChangeCard.ts'

export const inject = ['slots']

export function apply(ctx: Context): void {
  // 1. Sidebar Action Entry
  ctx.effect(() => {
    return ctx.slots?.register?.({
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
            console.log('Project Control clicked')
          },
        },
        '📊 Project Control',
      )
    })
  }, 'dsh-project-control: sidebar action')

  // 2. Custom Tool View for analyze_change
  ctx.effect(() => {
    return ctx.slots?.register?.({
      name: 'tool.call.toolview',
    }, (props: any) => {
      if (props?.toolName !== 'analyze_change') return null

      const output = props?.output
      return React.createElement(ChangeCard, {
        title: 'Change Analysis',
        filesChanged: output?.filesChanged ?? 0,
        insertions: output?.insertions ?? 0,
        deletions: output?.deletions ?? 0,
        evidenceId: output?.evidenceId,
        status: output ? 'completed' : 'analyzing',
      })
    })
  }, 'dsh-project-control: analyze_change toolview')

  // 3. Conversation Header Action (Run Status)
  ctx.effect(() => {
    return ctx.slots?.register?.({
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
        '🛡️ Project Insight Active',
      )
    })
  }, 'dsh-project-control: header actions')

  // 4. Conversation View Panel
  ctx.effect(() => {
    return ctx.slots?.register?.({
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
  }, 'dsh-project-control: conversation view')
}

export default apply
