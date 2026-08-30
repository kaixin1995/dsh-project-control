/**
 * React Component: Change / Insight Card for Chat View.
 * Renders structured insights, diff statistics, and evidence badges.
 *
 * @module dsh-project-control/client/components/ChangeCard
 */

import React from 'react'

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
        border: '1px solid var(--dsh-border, #333)',
        borderRadius: '6px',
        padding: '10px 14px',
        margin: '6px 0',
        backgroundColor: 'var(--dsh-bg-subtle, #1e1e1e)',
        color: 'var(--dsh-text, #eee)',
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
            backgroundColor: 'var(--dsh-badge-bg, #2a2a2a)',
            color: 'var(--dsh-badge-text, #aaa)',
          },
        },
        status,
      ),
    ),
    React.createElement(
      'div',
      { style: { display: 'flex', gap: '12px', fontSize: '12px', opacity: 0.9 } },
      React.createElement('span', null, `📁 ${filesChanged} files`),
      React.createElement('span', { style: { color: '#4ec9b0' } }, `+${insertions}`),
      React.createElement('span', { style: { color: '#f14c4c' } }, `-${deletions}`),
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
