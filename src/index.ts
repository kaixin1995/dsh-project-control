/**
 * Main entry point for dsh-project-control plugin.
 * @module dsh-project-control
 */

import { Context } from '@deepseek-ai/cordis'
import { ProjectControlService, type ProjectControlConfig } from './plugin/service.ts'
import * as tools from './plugin/tools.ts'
import * as commands from './plugin/commands.ts'

export * from './plugin/service.ts'

export function apply(ctx: Context, config?: ProjectControlConfig): void {
  ctx.plugin(ProjectControlService, config)
  ctx.plugin(tools)
  ctx.plugin(commands)
}

export default apply
