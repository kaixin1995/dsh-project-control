/**
 * Main plugin entry point for dsh-project-control.
 * Exports Core Service, Tools, Commands, Domain Models, and Storage definitions.
 *
 * @module dsh-project-control
 */

import type { Context } from '@deepseek-ai/cordis'
import servicePlugin, { ProjectControlService } from './plugin/service.ts'
import toolsPlugin from './plugin/tools.ts'
import commandsPlugin from './plugin/commands.ts'

export const name = 'project-control'
export const inject = ['storage', 'tools', 'commands']

export function apply(ctx: Context): void {
  ctx.plugin(servicePlugin)
  ctx.plugin(toolsPlugin)
  ctx.plugin(commandsPlugin)
}

export default apply

// Service & Plugin exports
export { ProjectControlService, servicePlugin, toolsPlugin, commandsPlugin }

// Domain & ID exports
export * from './domain/brand.ts'
export * from './domain/ids.ts'
export * from './domain/models.ts'
export * from './domain/state-machine.ts'
export * from './domain/truth.ts'
export * from './domain/cas.ts'
export * from './domain/project.ts'
export * from './domain/change.ts'

// Git & Analysis exports
export * from './git/adapter.ts'
export * from './git/snapshot.ts'
export * from './analysis/evidence.ts'
export * from './analysis/language.ts'
export * from './analysis/graph.ts'
export * from './analysis/impact.ts'
export * from './analysis/contracts.ts'

// Runtime exports
export * from './runtime/dag.ts'
export * from './runtime/runner.ts'
export * from './runtime/worktree.ts'
export * from './runtime/recovery.ts'

// Model & Cost exports
export * from './model/routing.ts'
export * from './model/cost.ts'
export * from './model/guard.ts'

// Verification exports
export * from './verification/verifier.ts'
export * from './verification/issues.ts'
export * from './verification/service.ts'

// Bootstrap, Memory, Learning exports
export * from './bootstrap/pipeline.ts'
export * from './memory/service.ts'
export * from './memory/context.ts'
export * from './learning/concept.ts'
export * from './learning/patterns.ts'

// Store & Repository exports
export * from './store/domains.ts'
export * from './store/repository.ts'
