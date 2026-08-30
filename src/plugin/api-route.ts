/**
 * 项目控制宿主 API 路由：
 * 在 ctx.webServer 上注册自有 JSON 路由前缀（/project-control/api/*），
 * 为浏览器工作台面板提供真实数据（项目 / 变更 / 运行 / 记忆 / 证据 / 引导检查点）。
 *
 * 安全围栏（自复刻本体 /api 的浏览器信任围栏，本体围栏不覆盖自有路由）：
 * 1. Host 围栏：Host 头的主机名必须是回环地址（DNS 重绑定无法伪造 Host）。
 * 2. Origin 围栏：携带 Origin 的请求，其 authority 必须与 Host 完全一致
 *    （拒绝跨站点页面发起的请求）。
 * 本体 webServer 只监听 127.0.0.1 / 0.0.0.0；远程部署场景一期明确不支持本路由。
 *
 * @module dsh-project-control/plugin/api-route
 */

import type { Context } from '@deepseek-ai/cordis'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { BootstrapPipeline } from '../bootstrap/pipeline.ts'
import { GenericLanguageAnalyzer } from '../analysis/language.ts'
import { collectSymbolReferences } from '../analysis/lsp-evidence.ts'
import { ProjectService } from '../domain/project.ts'
import { scanHistory } from '../runtime/history.ts'
import { runLlmAnalysis } from '../analysis/llm-analyzer.ts'
import { resolveDeploymentRoute } from '../config.ts'
import type { ProjectControlService } from './service.ts'

export const name = 'project-control-api'
export const inject = ['projectControl']

const ROUTE_PREFIX = '/project-control/api'

/** 判定主机名是否为回环地址（IPv4 / IPv6 / localhost）。 */
function isLoopbackHostname(hostname: string): boolean {
  const normalized = hostname.toLowerCase().replace(/^\[|\]$/g, '')
  return normalized === 'localhost' || normalized === '127.0.0.1' || normalized === '::1'
}

/** 规范化 authority：主机名小写、保留显式端口、去 IPv6 方括号。 */
function canonicalAuthority(authority: string): string | undefined {
  try {
    const url = new URL(`http://${authority}`)
    const port = url.port === '' ? '' : `:${url.port}`
    return `${url.hostname.toLowerCase()}${port}`
  } catch {
    return undefined
  }
}

/**
 * 浏览器信任围栏（参见模块 JSDoc）。
 * @returns 通过返回 undefined，拒绝返回已写出的 HTTP 状态码。
 */
function trustFence(req: IncomingMessage, res: ServerResponse): number | undefined {
  const hostHeader = req.headers.host
  if (hostHeader === undefined) {
    res.writeHead(403, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ error: 'missing host header' }))
    return 403
  }
  const hostAuthority = canonicalAuthority(hostHeader)
  const hostHostname = hostAuthority === undefined
    ? undefined
    : new URL(`http://${hostAuthority}`).hostname
  if (hostAuthority === undefined || hostHostname === undefined || !isLoopbackHostname(hostHostname)) {
    res.writeHead(403, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ error: 'host not trusted (loopback only)' }))
    return 403
  }
  const origin = req.headers.origin
  if (origin !== undefined) {
    let originAuthority: string | undefined
    try {
      originAuthority = canonicalAuthority(new URL(origin).host)
    } catch {
      originAuthority = undefined
    }
    if (originAuthority !== hostAuthority) {
      res.writeHead(403, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ error: 'cross-origin request rejected' }))
      return 403
    }
  }
  return undefined
}

/** 读取请求体（JSON，≤1 MiB）。 */
function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > 1024 * 1024) {
        reject(new Error('request body too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      const text = Buffer.concat(chunks).toString('utf8')
      if (text === '') {
        resolve({})
        return
      }
      try {
        const parsed: unknown = JSON.parse(text)
        if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
          reject(new Error('request body must be a JSON object'))
          return
        }
        resolve(parsed as Record<string, unknown>)
      } catch {
        reject(new Error('request body is not valid JSON'))
      }
    })
    req.on('error', reject)
  })
}

/** 采纳当前项目：内存未恢复时回落最后一个已持久化项目（重启后首次 API 调用场景）。 */
  function adoptProject(service: ProjectControlService): { id: string } | undefined {
    if (service.currentProject !== undefined) return service.currentProject
    const last = service.store?.projects.list().at(-1)
    if (last === undefined) return undefined
    service.currentProject = last
    return last
  }

  /** 截断证据摘要用于列表展示。 */
function trimSnippet(text: string, max = 160): string {
  return text.length <= max ? text : `${text.slice(0, max)}…`
}

/** 工作台所需的完整状态快照（来自 storage-domain 真实数据）。 */
function buildState(service: ProjectControlService): Record<string, unknown> {
  const store = service.store
  if (store === undefined) {
    return { ready: false, reason: 'service not started' }
  }
  const projects = store.projects.list()
  const project = service.currentProject ?? projects.at(-1) ?? null
  const changes = store.changes.list()
  const runs = store.runs.list()
  const attempts = store.attempts.list()
  const memories = store.memories.list()
  const evidence = store.evidence.list()
  const checkpoint = store.checkpoints.list().at(-1) ?? null
  return {
    ready: true,
    project: project === null ? null : {
      id: project.id,
      name: project.name,
      rootPath: project.identity.rootPath,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    },
    changes: changes.map((change) => ({
      id: change.id,
      title: change.title,
      type: change.type,
      status: change.status,
      source: change.source,
      updatedAt: change.updatedAt,
    })),
    runs: runs.map((run) => ({
      id: run.id,
      changeId: run.changeId,
      status: run.status,
      startedAt: run.startedAt ?? null,
      finishedAt: run.finishedAt ?? null,
    })),
    attemptsCount: attempts.length,
    importedChanges: (store.importedChanges?.list() ?? []).slice(-100).map((item) => ({
      id: item.id,
      title: item.title,
      commitCount: item.commitShas.length,
      firstCommitAt: item.firstCommitAt,
      lastCommitAt: item.lastCommitAt,
      confidence: item.confidence,
      status: item.status,
    })),
    issues: store.issues.list().slice(-50).map((issue) => ({
      id: issue.id,
      changeId: issue.changeId,
      severity: issue.severity,
      category: issue.category,
      title: issue.title,
      status: issue.status,
    })),
    verifications: store.verifications.list().slice(-50).map((verification) => ({
      id: verification.id,
      changeId: verification.changeId,
      name: verification.name,
      type: verification.type,
      status: verification.status,
      createdAt: verification.createdAt,
    })),
    memories: memories.map((memory) => ({
      id: memory.id,
      type: memory.type,
      truthLevel: memory.truthLevel,
      title: memory.title,
      isHumanConfirmed: memory.isHumanConfirmed,
      gitBranch: memory.gitBranch ?? null,
      createdAt: memory.createdAt,
    })),
    evidenceCount: evidence.length,
    recentEvidence: evidence.slice(-20).reverse().map((item) => ({
      id: item.id,
      source: item.source,
      truthLevel: item.truthLevel,
      locator: item.locator,
      snippet: trimSnippet(item.snippet),
      createdAt: item.createdAt,
    })),
    bootstrap: checkpoint === null ? null : {
      id: checkpoint.id,
      summary: checkpoint.summary,
      techStack: checkpoint.techStack,
      manifestFiles: checkpoint.manifestFiles,
      symbolsCount: checkpoint.topLevelSymbols.length,
      createdAt: checkpoint.createdAt,
    },
  }
}

/**
 * 注册 API 路由（独立插件入口，由 cordis.yml / cordis.patch.yml 挂载）。
 */
export function registerApiRoute(ctx: Context, service: ProjectControlService): void {
  // webServer 只存在于挂载了 web 面的 composition：headless / sdk / acp 无此服务，
  // ctx.inject 静默不触发，插件照常激活（不产生 pending）。
  ctx.inject(['webServer'], (scope: Context) => {
    const webServer = scope.webServer
    if (webServer === undefined || webServer === null) return

    const disposeRoute = webServer.register({
      kind: 'prefix',
      path: ROUTE_PREFIX,
      handler: async (req: IncomingMessage, res: ServerResponse) => {
        const denied = trustFence(req, res)
        if (denied !== undefined) return

        const url = new URL(req.url ?? '/', 'http://localhost')
        const routePath = url.pathname.slice(ROUTE_PREFIX.length)

        if (req.method === 'GET' && routePath === '/state') {
          try {
            const body = JSON.stringify(buildState(service))
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(body)
          } catch (error) {
            ctx.logger?.warn?.(`project-control: state build failed: ${String(error)}`)
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        if (req.method === 'POST' && routePath === '/bootstrap') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const rootPathRaw = body['rootPath']
            const rootPath = typeof rootPathRaw === 'string' && rootPathRaw.length > 0
              ? rootPathRaw
              : service.currentProject?.identity.rootPath
            if (rootPath === undefined) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'no project root known; pass rootPath' }))
              return
            }
            const projectService = new ProjectService(
              service.store.projects,
              (args, cwd) => service.git.runGit(args, cwd),
            )
            const ensured = await projectService.ensureProject(rootPath)
            service.currentProject = ensured.project
            const pipeline = new BootstrapPipeline(
              service.git,
              new GenericLanguageAnalyzer(),
              service.store.checkpoints,
            )
            const checkpoint = await pipeline.runBootstrap(ensured.project.id, rootPath)
          const scanHistoryFlag = body['includeHistory'] === true
          const wantSummaries = service.liveConfig.bootstrap.historySummaries || body['summarize'] === true
          let importedCount = 0
          if (scanHistoryFlag && service.store.importedChanges !== undefined) {
            // L1 逐提交轻析：config 开关或调用方显式请求时启用；Fast 等级路由，成本有界。
            const summaries = wantSummaries
              ? {
                  maxSummarized: 30,
                  run: async (fact: { subject: string; files: string[]; insertions: number; deletions: number }) => {
                    const route = resolveDeploymentRoute(ctx, 'fast', service.liveConfig)
                    const provider = route.provider
                    const model = route.model
                    const result = await runLlmAnalysis(ctx, {
                      prompt: [
                        'Summarize what this commit changed in ONE short sentence (<= 25 words), in the same language as the commit message.',
                        '',
                        `Subject: ${fact.subject}`,
                        `Files (${fact.files.length}): ${fact.files.slice(0, 10).join(', ')}`,
                        `Lines: +${fact.insertions}/-${fact.deletions}`,
                      ].join('\n'),
                      provider,
                      model,
                      maxTokens: 128,
                      timeoutMs: 30_000,
                      purpose: 'project-control-history',
                    })
                    return result.text
                  },
                }
              : undefined
            const imported = await scanHistory(service.git, rootPath, ensured.project.id, service.store.importedChanges, { maxCommits: typeof body['maxCommits'] === 'number' ? Math.min(body['maxCommits'], service.liveConfig.bootstrap.maxCommitsPerRun) : service.liveConfig.bootstrap.defaultMaxCommits, summaries })
            importedCount = imported.length
          }
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({
              ok: true,
              checkpointId: checkpoint.id,
              summary: checkpoint.summary,
              techStack: checkpoint.techStack,
              symbolsCount: checkpoint.topLevelSymbols.length,
              importedChanges: importedCount,
            }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // ── 工作台按钮化操作端点（全部走部署路由，不依赖聊天会话）──────────

        // 分析当前改动（数字证据 + LLM 语义摘要；changeId 可选挂靠）。
        if (req.method === 'POST' && routePath === '/analyze') {
          try {
            const body = await readJsonBody(req)
            const project = adoptProject(service)
            const cwd = project?.identity?.rootPath
            if (project === undefined || cwd === undefined) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'no project initialized; click Initialize first' }))
              return
            }
            const route = resolveDeploymentRoute(ctx, 'standard', service.liveConfig)
            const diff = await service.git.getDiff(cwd)
            const evidence = service.evidenceManager.createEvidence({
              projectId: service.currentProject?.id ?? 'prj_ad_hoc',
              source: 'git_diff',
              truthLevel: 'fact',
              locator: 'git:diff:HEAD..worktree',
              content: diff.patch,
            })
            let semantic = ''
            if (diff.filesChanged > 0) {
              try {
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
                  purpose: 'project-control-analysis',
                })
                semantic = analysis.text
              } catch (error: unknown) {
                semantic = `(semantic summary unavailable: ${error instanceof Error ? error.message : String(error)})`
              }
            }
            const summary = [
              semantic === '' ? '工作区当前无未提交改动。' : semantic,
              `(numeric: ${diff.filesChanged} file(s), +${diff.insertions}/-${diff.deletions}; evidence ${evidence.id})`,
            ].join('\n')
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({
              summary,
              filesChanged: diff.filesChanged,
              insertions: diff.insertions,
              deletions: diff.deletions,
              diffHash: diff.diffHash,
              evidenceId: evidence.id,
            }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 新建变更。
        if (req.method === 'POST' && routePath === '/changes') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const title = typeof body['title'] === 'string' ? body['title'] : ''
            const description = typeof body['description'] === 'string' ? body['description'] : ''
            if (title === '') {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'title is required' }))
              return
            }
            const project = adoptProject(service)
            const cwd = project?.identity?.rootPath
            if (project === undefined || cwd === undefined) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'no project initialized; run bootstrap first' }))
              return
            }
            const changeService = new ChangeService(service.store.changes, service.git, service.evidenceManager)
            const change = await changeService.createChange(project.id as never, title, description, cwd)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, changeId: change.id, status: change.status }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 独立评审当前改动（Reasoning 级；changeId 提供时落 Issue，否则只返回文本）。
        if (req.method === 'POST' && routePath === '/review') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const project = adoptProject(service)
            const cwd = project?.identity?.rootPath
            if (project === undefined || cwd === undefined) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'no project initialized' }))
              return
            }
            const diff = await service.git.getDiff(cwd)
            if (diff.filesChanged === 0) {
              res.writeHead(200, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ issuesFound: 0, issues: '工作区无改动，无可评审内容。' }))
              return
            }
            const route = resolveDeploymentRoute(ctx, 'reasoning', service.liveConfig)
            const changeId = typeof body['changeId'] === 'string' ? body['changeId'] : undefined
            const analysis = await runLlmAnalysis(ctx, {
              prompt: [
                'You are an independent code reviewer. Review the diff below for correctness, error handling, concurrency, resource leaks, security, and over-reach.',
                'Answer with one issue per line in the exact format: SEVERITY | category | title | evidence location | suggested fix',
                'SEVERITY is one of critical/high/medium/low/info. If the diff is clean, answer exactly: CLEAN',
                '',
                'Diff:',
                diff.patch,
              ].join('\n'),
              provider: route.provider,
              model: route.model,
              maxTokens: service.liveConfig.analysisMaxTokens,
              timeoutMs: service.liveConfig.analysisTimeoutMs,
              purpose: 'project-control-review',
            })
            const lines = analysis.text.split('\n').map((line) => line.trim()).filter((line) => line.length > 0 && line !== 'CLEAN')
            if (changeId !== undefined && changeId !== '') {
              const change = service.store.changes.get(changeId as never)
              if (change !== undefined) {
                const issuesManager = new ReviewIssueManager(service.store.issues)
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
                }
              }
            }
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ issuesFound: lines.length, issues: analysis.text }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 验收当前改动（确定性命令按配置；changeId 提供时落验收记录）。
        if (req.method === 'POST' && routePath === '/verify') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const project = adoptProject(service)
            const cwd = project?.identity?.rootPath
            if (project === undefined || cwd === undefined) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'no project initialized' }))
              return
            }
            const cfg = service.liveConfig
            const diff = await service.git.getDiff(cwd)
            const changeId = typeof body['changeId'] === 'string' && body['changeId'] !== ''
              ? body['changeId'] : undefined
            const change = changeId === undefined ? undefined : service.store.changes.get(changeId as never)
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
              new LlmReviewVerifier(async (patch) => {
                const route = resolveDeploymentRoute(ctx, 'verifier', service.liveConfig)
                const analysis = await runLlmAnalysis(ctx, {
                  prompt: `Does this diff look complete and correct? Answer PASS or FAIL on the first line, then a one-paragraph critique.\n\nDiff:\n${patch}`,
                  provider: route.provider,
                  model: route.model,
                  maxTokens: service.liveConfig.analysisMaxTokens,
                  timeoutMs: service.liveConfig.analysisTimeoutMs,
                  purpose: 'project-control-verification',
                })
                return { passed: analysis.text.toUpperCase().startsWith('PASS'), critique: analysis.text }
              }),
            ]
            const runner = new VerificationRunner(service.store.verifications, verifiers)
            const pipeline = await runner.runPipeline({
              projectId: (service.currentProject?.id ?? 'prj_ad_hoc') as never,
              changeId: (change?.id ?? 'adhoc') as never,
              cwd,
              changedFiles: [],
              diffPatch: diff.patch,
              evidenceIds: [],
            })
            const summary = pipeline.records.map((record) => `${record.name}: ${record.status}`).join('; ')
            const result = pipeline.allPassed ? 'passed' : (pipeline.hasDeterministicFailure ? 'failed' : 'partial')
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ result, details: summary }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 符号影响查询（LSP 优先，降级 rg；证据来源标注）。
        if (req.method === 'POST' && routePath === '/impact') {
          try {
            const body = await readJsonBody(req)
            const symbolName = typeof body['symbolName'] === 'string' ? body['symbolName'] : ''
            const filePath = typeof body['filePath'] === 'string' ? body['filePath'] : ''
            const project = adoptProject(service)
            const cwd = project?.identity?.rootPath
            if (symbolName === '' || cwd === undefined) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'symbolName and an initialized project are required' }))
              return
            }
            const evidence = await collectSymbolReferences(
              ctx,
              new GenericLanguageAnalyzer(),
              symbolName,
              cwd,
              filePath,
              {
                line: typeof body['line'] === 'number' ? body['line'] : 0,
                character: typeof body['character'] === 'number' ? body['character'] : 0,
              },
            )
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({
              evidenceSource: evidence.source,
              lspFailed: evidence.lspFailed,
              referenceCount: evidence.references.length,
              references: evidence.references.slice(0, 40).map((reference) => ({
                filePath: reference.filePath,
                line: reference.line,
              })),
            }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 记录项目记忆（analysis 级；确认走 /memory/confirm）。
        if (req.method === 'POST' && routePath === '/memory') {
          if (service.memoryService === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'memory service unavailable' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const title = typeof body['title'] === 'string' ? body['title'] : ''
            const content = typeof body['content'] === 'string' ? body['content'] : ''
            if (title === '' || content === '') {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'title and content are required' }))
              return
            }
            const memory = await service.memoryService.recordMemory({
              projectId: service.currentProject?.id ?? 'prj_ad_hoc',
              type: (typeof body['memoryType'] === 'string' ? body['memoryType'] : 'project_log') as never,
              truthLevel: 'analysis',
              title,
              content,
              relatedFiles: Array.isArray(body['relatedFiles']) ? body['relatedFiles'] as string[] : undefined,
            })
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, memoryId: memory.id, truthLevel: memory.truthLevel }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        if (req.method === 'POST' && routePath === '/memory/confirm') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const memoryId = typeof body['memoryId'] === 'string' ? body['memoryId'] : ''
            const memory = memoryId === '' ? undefined : service.store.memories.get(memoryId as never)
            if (memory === undefined) {
              res.writeHead(404, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'memory not found' }))
              return
            }
            await service.memoryService?.confirmMemory(memoryId as never)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, memoryId }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        res.writeHead(404, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ error: 'not found' }))
      },
    })

    ctx.effect(() => disposeRoute, 'project-control: api route')
  })
}

/** 独立挂载入口（Loader 行；bundle 路径经 index.ts 的 registerApiRoute 内联注册）。 */
export function apply(ctx: Context): void {
  registerApiRoute(ctx, ctx.projectControl as ProjectControlService)
}
