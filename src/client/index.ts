/**
 * Client plugin entry for dsh-project-control.
 * @module dsh-client-project-control
 */

import type { Context } from '@deepseek-ai/cordis'
import React from 'react'

export const inject = ['slots']

export function apply(ctx: Context): void {
  ctx.effect(() => {
    return ctx.slots?.register?.({
      name: 'sidebar.footer.action',
    }, () => {
      return React.createElement('div', {
        'data-testid': 'project-control-sidebar-entry',
        style: { padding: '4px 8px', fontSize: '12px', opacity: 0.8 },
      }, 'Project Control')
    })
  }, 'dsh-project-control: sidebar action')
}

export default apply
