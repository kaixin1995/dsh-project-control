/**
 * React Component: Change / Insight Card for Chat View.
 * Renders structured insights, diff statistics, and evidence badges.
 *
 * 颜色走 dsw-alias 主题变量 + themeAwareText 对比度引擎：
 * 此前用的 `--dsh-*` 变量在宿主里不存在，样式永远落在深色兜底上，
 * 浅色主题下聊天流里出现突兀黑卡；数字绿/红也是深色向配色，白底不可读。
 *
 * @module dsh-client-project-control/components/ChangeCard
 */

import React from 'react'
import { themeAwareText } from './theme.ts'

export interface ChangeCardProps {
  title?: string
  filesChanged?: number
  insertions?: number
  deletions?: number
  evidenceId?: string
  status?: string
}

export const ChangeCard: React.FC<ChangeCardProps> = ({
  title = 'Change Insight',
  filesChanged = 0,
  insertions = 0,
  deletions = 0,
  evidenceId,
  status = 'analyzed',
}) => {
  return React.createElement(
    'div',
    {
      'data-testid': 'project-control-change-card',
      style: {
        border: '1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))',
        borderRadius: '6px',
        padding: '10px 14px',
        margin: '6px 0',
        backgroundColor: 'var(--dsw-alias-bg-layer-1, #fafafa)',
        color: 'var(--dsw-alias-label-primary, #1f2328)',
        fontSize: '13px',
      },
    },
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '6px',
          fontWeight: '600',
        },
      },
      React.createElement('span', null, `🔍 ${title}`),
      React.createElement(
        'span',
        {
          style: {
            fontSize: '11px',
            padding: '2px 6px',
            borderRadius: '4px',
            backgroundColor: 'var(--dsw-alias-bg-inset, rgba(5,5,5,0.06))',
            color: 'var(--dsw-alias-label-secondary, #6b7280)',
          },
        },
        status,
      ),
    ),
    React.createElement(
      'div',
      { style: { display: 'flex', gap: '12px', fontSize: '12px', opacity: 0.9 } },
      React.createElement('span', null, `📁 ${filesChanged} files`),
      React.createElement('span', { style: { color: themeAwareText('#1a7f37') } }, `+${insertions}`),
      React.createElement('span', { style: { color: themeAwareText('#cf222e') } }, `-${deletions}`),
      evidenceId
        ? React.createElement(
            'span',
            { style: { opacity: 0.7, fontFamily: 'monospace' } },
            `[${evidenceId}]`,
          )
        : null,
    ),
  )
}
