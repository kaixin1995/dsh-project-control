/**
 * Model-facing tools for Project Control.
 * @module dsh-project-control/plugin/tools
 */

import type { Context } from '@deepseek-ai/cordis'
import { z as zod } from 'zod'

export function defineTool<T>(options: T): T {
  return options
}
import { GitAdapter } from '../git/adapter.ts'
import { EvidenceManager } from '../analysis/evidence.ts'
import { ChangeService } from '../domain/change.ts'
import { ChangeId, createProjectId } from '../domain/ids.ts'
import { GenericLanguageAnalyzer } from '../analysis/language.ts'
import { BootstrapPipeline } from '../bootstrap/pipeline.ts'

export const name = 'project-control-tools'
export const inject = ['tools']

export function apply(ctx: Context): void {
  const git = new GitAdapter()
  const evidenceManager = new EvidenceManager()
  const languageAnalyzer = new GenericLanguageAnalyzer()

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

  const bootstrapProjectTool = defineTool({
    name: 'bootstrap_project',
    description: 'Run 4-stage lightweight legacy bootstrap onboarding to index workspace structures, symbols, and history.',
    parameters: zod.object({
      projectId: zod.string().optional().describe('Optional Project ID'),
    }),
    output: {
      schema: zod.object({
        summary: zod.string(),
        techStack: zod.array(zod.string()),
        manifestFiles: zod.array(zod.string()),
        symbolsCount: zod.number(),
        checkpointId: zod.string(),
      }),
      render: (_args, res) => [{ type: 'text', text: res.summary }],
    },
    async execute(args, exec) {
      const cwd = exec.agent.session.header.cwd ?? process.cwd()
      const projectId = (args.projectId ? (args.projectId as any) : (ctx.projectControl as any)?.currentProject?.id ?? createProjectId())

      const mockRepo = {
        save: async () => {},
        get: () => undefined,
        delete: async () => true,
        list: () => [],
        listByProject: () => [],
        size: 0,
      } as any

      const pipeline = new BootstrapPipeline(git, languageAnalyzer, (ctx.projectControl as any)?.store?.checkpoints ?? mockRepo)
      const checkpoint = await pipeline.runBootstrap(projectId, cwd)

      return {
        summary: checkpoint.summary,
        techStack: checkpoint.techStack,
        manifestFiles: checkpoint.manifestFiles,
        symbolsCount: checkpoint.topLevelSymbols.length,
        checkpointId: checkpoint.id,
      }
    },
  })

  ctx.effect(() => {
    const d1 = ctx.tools.register(analyzeChangeTool)
    const d2 = ctx.tools.register(bootstrapProjectTool)
    return () => {
      d1()
      d2()
    }
  }, 'project-control: tools registration')
}

