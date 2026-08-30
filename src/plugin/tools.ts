/**
 * Project Control model tools plugin entry.
 * @module dsh-project-control/plugin/tools
 */

import { Context } from '@deepseek-ai/cordis'

export function apply(ctx: Context): void {
  ctx.logger.info('ProjectControl tools plugin loaded')
}

export default apply
