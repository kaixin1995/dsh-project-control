/**
 * Project Control commands plugin entry.
 * @module dsh-project-control/plugin/commands
 */

import { Context } from '@deepseek-ai/cordis'

export function apply(ctx: Context): void {
  ctx.logger.info('ProjectControl commands plugin loaded')
}

export default apply
