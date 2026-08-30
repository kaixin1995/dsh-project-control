/**
 * Project Control 模型工具面（P1–P3 全量）：
 * 变更 / 计划 / 执行：create_change, create_plan, start_run, list_changes
 * 分析：analyze_change（静态证据 + LLM 语义摘要）
 * 审查与验收：run_review（Reasoning 级独立评审）, run_verification（四级验证管道）
 * 记忆：record_memory, confirm_memory, recall_project
 *
 * LLM 结论一律 analysis 级真值；confirm_memory 仅人工调用可升级。
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
import { runLlmAnalysis } from '../analysis/llm-analyzer.ts'
import { resolveDeploymentRoute } from '../config.ts'
import { collectSymbolReferences } from '../analysis/lsp-evidence.ts'
import { GenericLanguageAnalyzer } from '../analysis/language.ts'
import { VerificationRunner } from '../verification/service.ts'
import { DeterministicBuildVerifier } from '../verification/verifier.ts'
import { UnitTestVerifier } from '../verification/verifier.ts'
import { EvidenceDiffVerifier } from '../verification/verifier.ts'
import { LlmReviewVerifier } from '../verification/verifier.ts'
import { ReviewIssueManager } from '../verification/issues.ts'
import type { ProjectControlService } from './service.ts'

export const name = 'project-control-tools'
export const inject = ['tools']

/** 解析一次性 LLM 路由：settings 等级覆盖 → 会话当前路由 → 兜底。 */
function resolveAnalysisRoute(
  service: ProjectControlService,
  tier: 'fast' | 'standard' | 'reasoning' | 'verifier',
  agentSession?: { requestHeader?: () => { config?: { provider: string; model: string } } | undefined },
): { provider: string; model: string } {
  const tierRoute = service.liveConfig.modelTiers[tier]
  if (tierRoute && tierRoute.provider && tierRoute.model) return tierRoute
  const routed = agentSession?.requestHeader?.()?.config
  if (routed && routed.provider && routed.model) return { provider: routed.provider, model: routed.model }
  return resolveDeploymentRoute(ctx, tier, service.liveConfig)
}

/** 统一取当前服务实例。 */
function control(ctx: Context): ProjectControlService {
  const service = (ctx as { projectControl?: ProjectControlService }).projectControl
  if (service === undefined) throw new Error('project-control service is not available')
  return service
}

/** 会话工作目录。 */
function workdir(exec: ToolRunContext): string {
  return exec.agent?.session.header.cwd ?? process.cwd()
}

/** 必须已启动存储。 */
function requireStore(ctx: Context) {
  const service = control(ctx)
  if (service.store === undefined) throw new Error('project-control storage not started (no storageDomain on this plane)')
  return service.store
}

export function registerTools(ctx: Context): void {
  const git = new GitAdapter()
  const evidenceManager = new EvidenceManager()

  const getChange = (changeId: string) => {
    const store = requireStore(ctx)
    const change = store.changes.get(ChangeId(changeId))
    if (change === undefined) throw new Error(`change "${changeId}" not found`)
    return change
  }

  // ── 变更 ──────────────────────────────────────────────────────────────

  const createChangeTool = defineTool({
    name: 'create_change',
    description: 'Create a project-control Change (a tracked unit of development work) for the current project.',
    parameters: {
      title: { type: 'string', required: true, description: 'Short title of the change, e.g. "Add OHT offline detection".' },
      description: { type: 'string', required: true, description: 'The requirement and context for this change.' },
    },
    output: {
      schema: {
        type: 'object',
        properties: {
          changeId: { type: 'string' },
          status: { type: 'string' },
        },
        additionalProperties: false,
      },
      render: (_args: unknown, value: unknown) => {
        const result = value as { changeId: string; status: string }
        return [{ type: 'text', text: `Change created: ${result.changeId} (${result.status})` }]
      },
    },
    async execute(args: { title: string; description: string }, exec: ToolRunContext) {
      const service = control(ctx)
      const cwd = workdir(exec)
      const ensured = await service.ensureCurrentProject(cwd)
      const change = await service.changeService.createChange(
        ensured.project.id,
        args.title,
        args.description,
        cwd,
      )
      return { changeId: change.id, status: change.status }
    },
  })

  const listChangesTool = defineTool({
    name: 'list_changes',
    description: 'List project-control changes for the current project with their status.',
    parameters: {},
    output: {
      schema: { type: 'string' },
      render: (_args: unknown, value: unknown) => [{ type: 'text', text: String(value) }],
    },
    async execute(_args: Record<string, never>) {
      const store = requireStore(ctx)
      const changes = store.changes.list()
      if (changes.length === 0) return 'No changes recorded yet.'
      return changes.map((change) => `- [${change.status}] ${change.id}: ${change.title} (rev ${change.revision})`).join('\n')
    },
  })

  // ── 计划与执行 ────────────────────────────────────────────────────────

  const createPlanTool = defineTool({
    name: 'create_plan',
    description: 'Create a versioned execution plan for a change. The plan is a list of ordered steps; start_run executes it step by step, each step in its own sub-agent attempt.',
    parameters: {
      changeId: { type: 'string', required: true, description: 'Target change id.' },
      title: { type: 'string', required: true, description: 'Plan title.' },
      steps: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Step objective (one sentence).' },
            description: { type: 'string', description: 'What this step must accomplish, with acceptance hints.' },
            targetFiles: { type: 'array', items: { type: 'string' }, description: 'Primary files this step may touch. Omit for read-only analysis steps.' },
          },
          additionalProperties: false,
        },
        description: 'Ordered plan steps.',
      },
    },
    output: {
      schema: {
        type: 'object',
        properties: {
          planId: { type: 'string' },
          version: { type: 'number' },
          steps: { type: 'number' },
        },
        additionalProperties: false,
      },
      render: (_args: unknown, value: unknown) => {
        const result = value as { planId: string; version: number; steps: number }
        return [{ type: 'text', text: `Plan ${result.planId} v${result.version} created with ${result.steps} steps.` }]
      },
    },
    async execute(args: { changeId: string; title: string; steps: Array<{ title: string; description: string; targetFiles?: string[] }> }) {
      const service = control(ctx)
      const orchestrator = service.orchestrator
      if (orchestrator === undefined) throw new Error('project-control orchestrator not started (storage plane required)')
      const change = getChange(args.changeId)
      const plan = await orchestrator.createPlan(change, args.title, args.steps)
      return { planId: plan.id, version: plan.version, steps: plan.steps.length }
    },
  })

  const startRunTool = defineTool({
    name: 'start_run',
    description: 'Start executing the current plan for a change. Each step runs in its own sub-agent attempt with ground-truth verification and retries. Returns immediately with a run id; progress is visible in the project workspace.',
    parameters: {
      changeId: { type: 'string', required: true, description: 'Target change id with an existing plan.' },
      wait: { type: 'string', description: "Set to 'true' to block until the whole run completes (short runs / CLI verification). Default: background execution." },
    },
    output: {
      schema: {
        type: 'object',
        properties: {
          runId: { type: 'string' },
          status: { type: 'string' },
        },
        additionalProperties: false,
      },
      render: (_args: unknown, value: unknown) => {
        const result = value as { runId: string; status: string }
        return [{ type: 'text', text: `Run started: ${result.runId} (${result.status})` }]
      },
    },
    async execute(args: { changeId: string; wait?: string }, exec: ToolRunContext) {
      const service = control(ctx)
      const orchestrator = service.orchestrator
      if (orchestrator === undefined) throw new Error('project-control orchestrator not started (storage plane required)')
      if (exec.agent === undefined) throw new Error('start_run requires a calling agent')
      const change = getChange(args.changeId)
      const wait = args.wait === 'true' || args.wait === 'True'
      const runId = await orchestrator.startRun(exec.agent, change, { wait })
      const run = service.store?.runs.get(runId)
      return { runId, status: run?.status ?? (wait ? 'completed' : 'running') }
    },
  })

  // ── 变更分析 ──────────────────────────────────────────────────────────

  const analyzeChangeTool = defineTool({
    name: 'analyze_change',
    description: 'Analyze code modifications (git diff vs change base) and produce a semantic summary of what changed and why it matters. Falls back to a numeric summary (clearly labeled) when no LLM route is available.',
    parameters: {
      changeId: { type: 'string', description: 'Target Change ID. If omitted, analyzes the current workspace diff.' },
    },
    output: {
      schema: {
        type: 'object',
        properties: {
          summary: { type: 'string' },
          summaryText: { type: 'string' },
          filesChanged: { type: 'number' },
          insertions: { type: 'number' },
          deletions: { type: 'number' },
          diffHash: { type: 'string' },
          evidenceId: { type: 'string' },
        },
        additionalProperties: false,
      },
      render: (_args: unknown, value: unknown) => {
        const result = value as { summaryText: string }
        return [{ type: 'text', text: result.summaryText }]
      },
    },
    async execute(args: { changeId?: string }, exec: ToolRunContext) {
      const service = control(ctx)
      const cwd = workdir(exec)
      const route = resolveAnalysisRoute(service, 'standard', exec.agent?.session)

      let base: { summaryText: string; filesChanged: number; insertions: number; deletions: number; diffHash: string; evidenceId: string }
      if (args.changeId !== undefined && service.store !== undefined) {
        const changeService = new ChangeService(service.store.changes, git, evidenceManager)
        base = await changeService.analyzeChange(ChangeId(args.changeId), cwd)
      } else {
        const diff = await git.getDiff(cwd)
        const evidence = evidenceManager.createEvidence({
          projectId: service.currentProject?.id ?? 'prj_ad_hoc',
          source: 'git_diff',
          truthLevel: 'fact',
          locator: 'git:diff:HEAD..worktree',
          content: diff.patch,
        })
        base = {
          summaryText: `Workspace diff: ${diff.filesChanged} file(s) changed (+${diff.insertions}/-${diff.deletions}).`,
          filesChanged: diff.filesChanged,
          insertions: diff.insertions,
          deletions: diff.deletions,
          diffHash: diff.diffHash,
          evidenceId: evidence.id,
        }
      }

      // LLM 语义摘要（"这次修改做了什么"）；失败降级为纯数字摘要并明示原因。
      try {
        const diff = await git.getDiff(cwd, { maxBytes: 16 * 1024 })
        const analysis = await runLlmAnalysis(ctx, {
          prompt: [
            'Summarize what this code change does in 3-6 bullet points, for a developer who has not seen the diff.',
            'Cover: purpose, behavior added/removed, modules affected, and any public-contract (API/DB/message/config) change.',
            'Be concrete; no speculation. Answer in the same language as the diff context.',
            '',
            `Files: ${diff.filesChanged} (+${diff.insertions}/-${diff.deletions})`,
            '',
            'Diff:',
            diff.patch,
          ].join('\n'),
          provider: route.provider,
          model: route.model,
          maxTokens: service.liveConfig.analysisMaxTokens,
          timeoutMs: service.liveConfig.analysisTimeoutMs,
          sessionId: exec.agent?.session.id,
          purpose: 'project-control-analysis',
        })
        base.summaryText = `${analysis.text}\n\n(numeric: ${base.filesChanged} file(s), +${base.insertions}/-${base.deletions}; evidence ${base.evidenceId})`
      } catch (error: unknown) {
        base.summaryText = `${base.summaryText} (semantic summary unavailable: ${error instanceof Error ? error.message : String(error)})`
      }

      return base
    },
  })

  // ── 影响分析 ──────────────────────────────────────────────────────────

  const queryImpactTool = defineTool({
    name: 'query_impact',
    description: 'Find references of a symbol across the workspace and classify evidence level. Uses the language server when available (semantic, lsp_symbol evidence); degrades to text scan (file_ast evidence) with the degradation labeled.',
    parameters: {
      symbolName: { type: 'string', required: true, description: 'Symbol name to look up.' },
      filePath: { type: 'string', description: 'File where the symbol is defined (used for LSP cursor positioning when a language server is available).' },
      line: { type: 'number', description: 'Zero-based line of the symbol in filePath (for LSP).' },
      character: { type: 'number', description: 'Zero-based character of the symbol in filePath (for LSP).' },
    },
    output: {
      schema: {
        type: 'object',
        properties: {
          evidenceSource: { type: 'string' },
          referenceCount: { type: 'number' },
          references: { type: 'string' },
        },
        additionalProperties: false,
      },
      render: (_args: unknown, value: unknown) => {
        const result = value as { evidenceSource: string; referenceCount: number; references: string }
        return [{ type: 'text', text: `Evidence source: ${result.evidenceSource} (${result.referenceCount} references)
${result.references}` }]
      },
    },
    async execute(args: { symbolName: string; filePath?: string; line?: number; character?: number }, exec: ToolRunContext) {
      const service = control(ctx)
      const cwd = workdir(exec)
      const analyzer = new GenericLanguageAnalyzer()
      const filePath = args.filePath ?? ''
      const evidence = await collectSymbolReferences(
        ctx,
        analyzer,
        args.symbolName,
        cwd,
        filePath,
        { line: args.line ?? 0, character: args.character ?? 0 },
        exec.signal,
      )
      const referenceText = evidence.references.length === 0
        ? 'No references found.'
        : evidence.references.slice(0, 40).map((reference) => `- ${reference.filePath}:${reference.line}`).join('\n')
      return {
        evidenceSource: evidence.source,
        referenceCount: evidence.references.length,
        references: referenceText,
      }
    },
  })

  // ── Review 与 Verification ───────────────────────────────────────────

  const runReviewTool = defineTool({
    name: 'run_review',
    description: 'Run an independent code review over the current workspace diff (read-only; records review issues, never modifies code).',
    parameters: {
      changeId: { type: 'string', description: 'Target change id the review belongs to.' },
    },
    output: {
      schema: {
        type: 'object',
        properties: {
          issuesFound: { type: 'number' },
          issues: { type: 'string' },
        },
        additionalProperties: false,
      },
      render: (_args: unknown, value: unknown) => {
        const result = value as { issuesFound: number; issues: string }
        return [{ type: 'text', text: `Review found ${result.issuesFound} issue(s):\n${result.issues}` }]
      },
    },
    async execute(args: { changeId: string }, exec: ToolRunContext) {
      const service = control(ctx)
      const store = requireStore(ctx)
      const cwd = workdir(exec)
      const change = getChange(args.changeId)
      const diff = await git.getDiff(cwd)
      const route = resolveAnalysisRoute(service, 'reasoning', exec.agent?.session)
      const memoryBlock = service.memoryContextText?.(change.projectId, []) ?? ''
      const analysis = await runLlmAnalysis(ctx, {
        prompt: [
          'You are an independent code reviewer. Review the diff below for correctness, error handling, concurrency, resource leaks, security, and over-reach (changes beyond the stated need).',
          'Answer with one issue per line in the exact format: SEVERITY | category | title | evidence location | suggested fix',
          'SEVERITY is one of critical/high/medium/low/info. If the diff is clean, answer exactly: CLEAN',
          '',
          `Change objective: ${change.title} — ${change.description ?? ''}`,
          memoryBlock === '' ? '' : `Project constraints:\n${memoryBlock}`,
          '',
          'Diff:',
          diff.patch,
        ].filter((line) => line !== undefined).join('\n'),
        provider: route.provider,
        model: route.model,
        maxTokens: service.liveConfig.analysisMaxTokens,
        timeoutMs: service.liveConfig.analysisTimeoutMs,
        sessionId: exec.agent?.session.id,
        purpose: 'project-control-review',
      })

      const issuesManager = new ReviewIssueManager(store.issues)
      const lines = analysis.text.split('\n').map((line) => line.trim()).filter((line) => line.length > 0 && line !== 'CLEAN')
      let counted = 0
      for (const line of lines) {
        const parts = line.split('|').map((part) => part.trim())
        if (parts.length < 4) continue
        const severity = parts[0]!.toLowerCase()
        await issuesManager.createIssue({
          projectId: change.projectId,
          changeId: change.id,
          severity: (['critical', 'high', 'medium', 'low', 'info'].includes(severity) ? severity : 'medium') as never,
          category: parts[1]!,
          title: parts[2]!,
          description: `Evidence: ${parts[3]}. Suggested fix: ${parts[4] ?? 'none'}`,
        })
        counted++
      }
      return { issuesFound: counted, issues: analysis.text }
    },
  })

  const runVerificationTool = defineTool({
    name: 'run_verification',
    description: 'Run the acceptance verification pipeline over a change: deterministic build/test checks (when commands are configured), evidence consistency, and an LLM heuristic review. Deterministic failures cannot be overridden by the LLM layer.',
    parameters: {
      changeId: { type: 'string', description: 'Target change id.' },
    },
    output: {
      schema: {
        type: 'object',
        properties: {
          result: { type: 'string' },
          details: { type: 'string' },
        },
        additionalProperties: false,
      },
      render: (_args: unknown, value: unknown) => {
        const result = value as { result: string; details: string }
        return [{ type: 'text', text: `Verification: ${result.result}\n${result.details}` }]
      },
    },
    async execute(args: { changeId: string }, exec: ToolRunContext) {
      const service = control(ctx)
      const store = requireStore(ctx)
      const cwd = workdir(exec)
      const change = getChange(args.changeId)
      const cfg = service.liveConfig
      const diff = await git.getDiff(cwd)
      const changeEvidence = store.evidence.list((item) => item.changeId === change.id)
      const { execFile } = await import('node:child_process')
      const { promisify } = await import('node:util')
      const runCommand = promisify(execFile)

      const verifiers = [
        ...(cfg.buildCommand
          ? [new DeterministicBuildVerifier(async (dir) => {
              const parts = cfg.buildCommand!.split(' ')
              try {
                await runCommand(parts[0]!, parts.slice(1), { cwd: dir, timeout: 300_000 })
                return { success: true, output: 'build ok' }
              } catch (error) {
                return { success: false, output: String(error) }
              }
            })]
          : []),
        ...(cfg.testCommand
          ? [new UnitTestVerifier(async (dir) => {
              const parts = cfg.testCommand!.split(' ')
              try {
                await runCommand(parts[0]!, parts.slice(1), { cwd: dir, timeout: 600_000 })
                return { passed: true, details: 'tests ok' }
              } catch (error) {
                return { passed: false, details: String(error) }
              }
            })]
          : []),
        new EvidenceDiffVerifier(),
        ...(exec.agent?.session
          ? [new LlmReviewVerifier(async (patch) => {
              const route = resolveAnalysisRoute(service, 'verifier', exec.agent?.session)
              const analysis = runLlmAnalysis(ctx, {
                prompt: `Does this diff look complete and correct for the stated objective? Answer PASS or FAIL on the first line, then a one-paragraph critique.\n\nObjective: ${change.title}\n\nDiff:\n${patch}`,
                provider: route.provider,
                model: route.model,
                maxTokens: service.liveConfig.analysisMaxTokens,
                timeoutMs: service.liveConfig.analysisTimeoutMs,
                sessionId: exec.agent?.session.id,
                purpose: 'project-control-verification',
              })
              return analysis.then((result) => {
                const passed = result.text.toUpperCase().startsWith('PASS')
                return { passed, critique: result.text }
              })
            })]
          : []),
      ]
      const runner = new VerificationRunner(store.verifications, verifiers)
      const pipeline = await runner.runPipeline({
        projectId: change.projectId,
        changeId: change.id,
        cwd,
        changedFiles: [],
        diffPatch: diff.patch,
        evidenceIds: changeEvidence.map((item) => item.id),
      })
      const summary = pipeline.records.map((record) => `${record.name}: ${record.status}`).join('; ')
      const result = pipeline.allPassed ? 'passed' : (pipeline.hasDeterministicFailure ? 'failed' : 'partial')
      return { result, details: summary }
    },
  })

  // ── 记忆 ──────────────────────────────────────────────────────────────

  const recordMemoryTool = defineTool({
    name: 'record_memory',
    description: 'Record a project memory item (architecture decision, pattern rule, risk hotspot). Items are recorded at analysis truth level; only the human can promote them to confirmed.',
    parameters: {
      memoryType: { type: 'string', required: true, description: 'Memory type: architecture_decision | pattern_rule | risk_hotspot | user_preference | project_log.' },
      title: { type: 'string', required: true, description: 'Short title.' },
      content: { type: 'string', required: true, description: 'The memory content (what and why).' },
      relatedFiles: { type: 'array', items: { type: 'string' }, description: 'Files this memory relates to.' },
    },
    output: {
      schema: {
        type: 'object',
        properties: { memoryId: { type: 'string' }, truthLevel: { type: 'string' } },
        additionalProperties: false,
      },
      render: (_args: unknown, value: unknown) => {
        const result = value as { memoryId: string; truthLevel: string }
        return [{ type: 'text', text: `Memory recorded (${result.truthLevel}): ${result.memoryId}` }]
      },
    },
    async execute(args: { memoryType: string; title: string; content: string; relatedFiles?: string[] }, exec: ToolRunContext) {
      const service = control(ctx)
      if (service.memoryService === undefined) throw new Error('memory service unavailable (storage plane required)')
      const memory = await service.memoryService.recordMemory({
        projectId: service.currentProject?.id ?? 'prj_ad_hoc',
        type: args.memoryType as never,
        truthLevel: 'analysis',
        title: args.title,
        content: args.content,
        relatedFiles: args.relatedFiles,
      })
      return { memoryId: memory.id, truthLevel: memory.truthLevel }
    },
  })

  const confirmMemoryTool = defineTool({
    name: 'confirm_memory',
    description: 'HUMAN-ONLY: promote a memory item to confirmed truth. The AI must never call this on its own judgment; only when the developer explicitly asks to confirm a specific item.',
    parameters: {
      memoryId: { type: 'string', required: true, description: 'Memory item id to confirm.' },
    },
    output: {
      schema: {
        type: 'object',
        properties: { confirmed: { type: 'boolean' } },
        additionalProperties: false,
      },
      render: (_args: unknown, value: unknown) => {
        const result = value as { confirmed: boolean }
        return [{ type: 'text', text: result.confirmed ? 'Memory confirmed.' : 'Memory not found.' }]
      },
    },
    async execute(args: { memoryId: string }) {
      const service = control(ctx)
      const store = requireStore(ctx)
      const memory = store.memories.get(args.memoryId as never)
      if (memory === undefined) return { confirmed: false }
      await service.memoryService?.confirmMemory(args.memoryId as never)
      return { confirmed: true }
    },
  })

  const recallProjectTool = defineTool({
    name: 'recall_project',
    description: 'Answer a question about the project from recorded memory (decisions, constraints, risks). Grounded in recorded items only; unrecorded questions get an explicit "not recorded" answer.',
    parameters: {
      query: { type: 'string', required: true, description: 'The question, e.g. "why does OrderService write through Kafka".' },
    },
    output: {
      schema: { type: 'string' },
      render: (_args: unknown, value: unknown) => [{ type: 'text', text: String(value) }],
    },
    async execute(args: { query: string }, exec: ToolRunContext) {
      const service = control(ctx)
      const memories = service.store?.memories.list() ?? []
      if (memories.length === 0) return 'No project memory recorded yet.'
      const route = resolveAnalysisRoute(service, 'standard', exec.agent?.session)
      const listing = memories
        .map((memory) => `- [${memory.truthLevel}${memory.isHumanConfirmed ? '/confirmed' : ''}] (${memory.type}) ${memory.title}: ${memory.content.slice(0, 200)}`)
        .join('\n')
      try {
        const analysis = await runLlmAnalysis(ctx, {
          prompt: `Answer the question using ONLY the recorded memory items below. Cite item titles. If the items do not answer it, say exactly what is missing.\n\nQuestion: ${args.query}\n\nRecorded memory:\n${listing}`,
          provider: route.provider,
          model: route.model,
          maxTokens: service.liveConfig.analysisMaxTokens,
          timeoutMs: service.liveConfig.analysisTimeoutMs,
          sessionId: exec.agent?.session.id,
          purpose: 'project-control-recall',
        })
        return analysis.text
      } catch (error: unknown) {
        return `Memory search unavailable (${error instanceof Error ? error.message : String(error)}). Recorded items:\n${listing}`
      }
    },
  })

  const tools = [
    createChangeTool,
    listChangesTool,
    createPlanTool,
    startRunTool,
    analyzeChangeTool,
    queryImpactTool,
    runReviewTool,
    runVerificationTool,
    recordMemoryTool,
    confirmMemoryTool,
    recallProjectTool,
  ]

  ctx.effect(() => {
    const disposers = tools.map((tool) => ctx.tools.register(tool))
    return () => {
      for (const dispose of disposers) dispose()
    }
  }, 'project-control: tools registration')
}
