/**
 * Model-facing tools for Project Control.
 * 使用本体 @deepseek-ai/dsh-tools 的 defineTool（参数 spec → JSON Schema、
 * args 类型推断与模型参数校验），schema 自动进入 prompt 组装。
 *
 * @module dsh-project-control/plugin/tools
 */

import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'
import type { ToolRunContext } from '@deepseek-ai/dsh-tools'
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
    parameters: {
      changeId: { type: 'string', description: 'Target Change ID. If omitted, analyzes the current workspace diff.' },
    },
    output: {
      schema: {
        type: 'object',
        properties: {
          summary: { type: 'string' },
          filesChanged: { type: 'number' },
          insertions: { type: 'number' },
          deletions: { type: 'number' },
          diffHash: { type: 'string' },
          evidenceId: { type: 'string' },
        },
        additionalProperties: false,
      },
      render: (_args: unknown, value: unknown) => {
        const result = value as { summary: string }
        return [{ type: 'text', text: result.summary }]
      },
    },
    async execute(args: { changeId?: string }, exec: ToolRunContext) {
      const cwd = exec.agent?.session.header.cwd ?? process.cwd()
      const control = (ctx as any).projectControl

      if (args.changeId !== undefined && control?.store?.changes !== undefined) {
        const changeService = new ChangeService(control.store.changes, git, evidenceManager)
        const result = await changeService.analyzeChange(ChangeId(args.changeId), cwd)
        return {
          summary: result.summaryText,
          filesChanged: result.filesChanged,
          insertions: result.insertions,
          deletions: result.deletions,
          diffHash: result.diffHash,
          evidenceId: result.evidenceId,
        }
      }

      const diff = await git.getDiff(cwd)
      const evidence = evidenceManager.createEvidence({
        projectId: control?.currentProject?.id ?? 'prj_ad_hoc',
        source: 'git_diff',
        truthLevel: 'fact',
        locator: 'git:diff:HEAD..worktree',
        content: diff.patch,
      })
      return {
        summary: `Workspace diff: ${diff.filesChanged} file(s) changed (+${diff.insertions}/-${diff.deletions}). Evidence: ${evidence.id}`,
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
