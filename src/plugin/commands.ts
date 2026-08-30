/**
 * Slash commands for Project Control.
 * @module dsh-project-control/plugin/commands
 */

import type { Context } from '@deepseek-ai/cordis'
import type { CommandInvocation, CommandResult } from '@deepseek-ai/dsh-commands'
import { GitAdapter } from '../git/adapter.ts'
import { EvidenceManager } from '../analysis/evidence.ts'

export const name = 'project-control-commands'
export const inject = ['commands']

export function apply(ctx: Context): void {
  const git = new GitAdapter()
  const evidenceManager = new EvidenceManager()

  ctx.effect(() => {
    return (ctx as any).commands?.register({
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
  }, 'project-control: insight command')
}

export default apply
