/**
 * Model-facing tools for Project Control.
 * @module dsh-project-control/plugin/tools
 */

import type { Context } from '@deepseek-ai/cordis'
import { z as zod } from 'zod'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { GitAdapter } from '../git/adapter.ts'
import { EvidenceManager } from '../analysis/evidence.ts'
import { ChangeService } from '../domain/change.ts'
import { ChangeId } from '../domain/ids.ts'

export const name = 'project-control-tools'
export const inject = ['tools']

export function apply(ctx: Context): void {
  const git = new GitAdapter()
  const evidenceManager = new EvidenceManager()

  const analyzeChangeTool = defineTool({
    name: 'analyze_change',
    description: 'Analyze code modifications, commit history, and diffs between a change base revision and current workspace.',
    parameters: zod.object({
      changeId: zod.string().optional().describe('Target Change ID. If omitted, analyzes active change.'),
    }),
    output: {
      schema: zod.object({
        summary: zod.string(),
        filesChanged: zod.number(),
        insertions: zod.number(),
        deletions: zod.number(),
        diffHash: zod.string(),
        evidenceId: zod.string(),
      }),
      render: (_args, res) => [{ type: 'text', text: res.summary }],
    },
    async execute(args, exec) {
      const cwd = exec.agent.session.header.cwd ?? process.cwd()

      if (args.changeId && ctx.projectControl) {
        // Run against registered change
        const changeId = ChangeId(args.changeId)
        const changeService = new ChangeService(
          (ctx.projectControl as any).store?.changes,
          git,
          evidenceManager,
        )
        const result = await changeService.analyzeChange(changeId, cwd)
        return {
          summary: result.summaryText,
          filesChanged: result.filesChanged,
          insertions: result.insertions,
          deletions: result.deletions,
          diffHash: result.diffHash,
          evidenceId: result.evidenceId,
        }
      }

      // Ad-hoc workspace diff analysis
      const diff = await git.getDiff(cwd)
      const evidence = evidenceManager.createEvidence({
        projectId: (ctx.projectControl as any)?.currentProject?.id ?? ('prj_ad_hoc' as any),
        source: 'git_diff',
        truthLevel: 'fact',
        locator: 'git:diff:HEAD..worktree',
        content: diff.patch,
      })

      const summary = `Workspace diff analysis: ${diff.filesChanged} file(s) changed (+${diff.insertions}/-${diff.deletions}). Evidence ID: ${evidence.id}`

      return {
        summary,
        filesChanged: diff.filesChanged,
        insertions: diff.insertions,
        deletions: diff.deletions,
        diffHash: diff.diffHash,
        evidenceId: evidence.id,
      }
    },
  })

  ctx.effect(() => ctx.tools.register(analyzeChangeTool), 'project-control: analyze_change tool')
}

export default apply
