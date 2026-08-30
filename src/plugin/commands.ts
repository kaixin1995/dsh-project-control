/**
 * Slash commands for Project Control.
 * @module dsh-project-control/plugin/commands
 */

import type { Context } from '@deepseek-ai/cordis'
import type { CommandInvocation, CommandResult } from '@deepseek-ai/dsh-commands'
import { GitAdapter } from '../git/adapter.ts'
import { EvidenceManager } from '../analysis/evidence.ts'
import { GenericLanguageAnalyzer } from '../analysis/language.ts'
import { BootstrapPipeline } from '../bootstrap/pipeline.ts'
import { createProjectId } from '../domain/ids.ts'

export const name = 'project-control-commands'
export const inject = ['commands']

export function apply(ctx: Context): void {
  const git = new GitAdapter()
  const evidenceManager = new EvidenceManager()
  const languageAnalyzer = new GenericLanguageAnalyzer()

  ctx.effect(() => {
    const d1 = (ctx as any).commands?.register({
      name: 'insight',
      description: 'Run project change insight analysis over current workspace',
      handler: async (inv: CommandInvocation): Promise<CommandResult> => {
        const cwd = inv.agent.session.header.cwd ?? process.cwd()
        try {
          const status = await git.getStatus(cwd)
          const diff = await git.getDiff(cwd)

          const evidence = evidenceManager.createEvidence({
            projectId: (ctx.projectControl as any)?.currentProject?.id ?? ('prj_command' as any),
            source: 'git_diff',
            truthLevel: 'fact',
            locator: 'git:diff:HEAD..worktree',
            content: diff.patch,
          })

          const text = [
            `### Project Control Insight`,
            `- Branch: **${status.branch ?? 'detached'}** (HEAD: \`${(status.headSha ?? '').substring(0, 7)}\`)`,
            `- Working Tree: **${status.isClean ? 'Clean' : `${status.entries.length} modified file(s)`}**`,
            `- Uncommitted Diff: **${diff.filesChanged} file(s)** changed (+${diff.insertions}/-${diff.deletions})`,
            `- Evidence Recorded: \`${evidence.id}\``,
          ].join('\n')

          return { kind: 'success', text }
        } catch (err: unknown) {
          return { kind: 'error', text: `Insight analysis failed: ${(err as Error).message}` }
        }
      },
    })

    const d2 = (ctx as any).commands?.register({
      name: 'bootstrap',
      description: 'Run 4-stage legacy onboarding bootstrap on current workspace',
      handler: async (inv: CommandInvocation): Promise<CommandResult> => {
        const cwd = inv.agent.session.header.cwd ?? process.cwd()
        try {
          const projectId = (ctx.projectControl as any)?.currentProject?.id ?? createProjectId()
          const mockRepo = {
            save: async () => {},
            get: () => undefined,
            delete: async () => true,
            list: () => [],
            listByProject: () => [],
            size: 0,
          } as any

          const pipeline = new BootstrapPipeline(
            git,
            languageAnalyzer,
            (ctx.projectControl as any)?.store?.checkpoints ?? mockRepo,
          )
          const checkpoint = await pipeline.runBootstrap(projectId, cwd)

          const text = [
            `### Project Bootstrap Complete`,
            `- Tech Stack: **${checkpoint.techStack.join(', ') || 'General Project'}**`,
            `- Manifests Detected: **${checkpoint.manifestFiles.join(', ') || 'None'}**`,
            `- Exported Symbols Indexed: **${checkpoint.topLevelSymbols.length}**`,
            `- Recent Commits Indexed: **${checkpoint.recentCommitSummaries.length}**`,
            `- Checkpoint ID: \`${checkpoint.id}\``,
          ].join('\n')

          return { kind: 'success', text }
        } catch (err: unknown) {
          return { kind: 'error', text: `Bootstrap failed: ${(err as Error).message}` }
        }
      },
    })

    return () => {
      d1?.()
      d2?.()
    }
  }, 'project-control: commands registration')
}

