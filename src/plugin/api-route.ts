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
import { createHash } from 'node:crypto'
import { readdir } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { BootstrapPipeline } from '../bootstrap/pipeline.ts'
import { GenericLanguageAnalyzer } from '../analysis/language.ts'
import { collectSymbolReferences } from '../analysis/lsp-evidence.ts'
import { ImpactEngine } from '../analysis/impact.ts'
import { CostTracker } from '../model/cost.ts'
import { ProjectGraph } from '../analysis/graph.ts'
import { ProjectService } from '../domain/project.ts'
import { ChangeService } from '../domain/change.ts'
import { scanHistory } from '../runtime/history.ts'
import { runLlmAnalysis } from '../analysis/llm-analyzer.ts'
import { addConfirmedItem, removeConfirmedItem } from './confirmed.ts'
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

/** 统一路径分隔符为 POSIX 风格（git 输出在 Windows 上已是 /，防御性归一）。 */
function normalizePath(path: string): string {
  return path.trim().replace(/\\/g, '/')
}

/** 解析 `git diff --numstat` 输出为逐文件增删行数（二进制文件计 0）。 */
function parseNumstat(raw: string): Array<{ path: string; adds: number; dels: number }> {
  const files: Array<{ path: string; adds: number; dels: number }> = []
  for (const line of raw.split('\n')) {
    const parts = line.split('\t').map((part) => part.trim())
    if (parts.length < 3 || parts[0] === undefined || parts[1] === undefined || parts[2] === undefined) continue
    if (!/^\d+$|^-$/.test(parts[0]) || !/^\d+$|^-$/.test(parts[1])) continue
    files.push({
      path: parts[2],
      adds: parts[0] === '-' ? 0 : Number(parts[0]),
      dels: parts[1] === '-' ? 0 : Number(parts[1]),
    })
  }
  return files
}

/**
 * 变更文件的引用检索 token：取去扩展名的文件基名（foo.tsx → foo）。
 * 过短（<3 字符）或纯数字的 token 无法可靠 grep，返回 undefined 跳过。
 */
function importTokenOf(filePath: string): string | undefined {
  const base = filePath.split('/').pop() ?? filePath
  const stem = base.replace(/\.[^.]+$/, '')
  return stem.length >= 3 && /\D/.test(stem) ? stem : undefined
}

/** /commit-detail 的 LLM 解读结果。 */
export interface CommitAnalysis {
  what: string
  logic: string[]
  risks: string[]
}

/** 宽松解析 LLM 的 WHAT/LOGIC/RISK 结构化输出；缺段时降级为原文。 */
function parseCommitAnalysis(text: string): CommitAnalysis {
  const whatMatch = text.match(/WHAT[:：]\s*(.+)/)
  const riskMatch = text.match(/RISK[:：]\s*([\s\S]*)/)
  const logicBlock = text.slice(
    text.search(/LOGIC[:：]/) === -1 ? 0 : text.search(/LOGIC[:：]/) + 6,
    riskMatch !== null ? riskMatch.index : text.length,
  )
  const logic = logicBlock
    .split('\n')
    .map((line) => line.replace(/^\s*\d+[.、)]\s*/, '').trim())
    .filter((line) => line !== '' && !/^(WHAT|LOGIC|RISK)[:：]/.test(line))
  const risks = (riskMatch?.[1] ?? '')
    .split(/[；;\n]/)
    .map((part) => part.replace(/^RISK[:：]\s*/, '').trim())
    .filter((part) => part !== '' && part !== '无')
  return {
    what: whatMatch?.[1]?.trim() ?? text.trim().slice(0, 500),
    logic: logic.slice(0, 10),
    risks: risks.slice(0, 5),
  }
}

/** /commit-detail 解读缓存：key = root|sha|diffHash，LRU 上限 40 条（进程内）。 */
const commitAnalysisCache = new Map<string, CommitAnalysis>()

/**
 * 从补丁的新增行提取本次修改/新增的符号名（方法、类、函数），
 * 供函数级影响反查。过滤 get/set/if 等无意义短名。
 */
function extractChangedSymbols(patch: string): string[] {
  const symbols = new Set<string>()
  for (const line of patch.split('\n')) {
    if (!line.startsWith('+') || line.startsWith('+++')) continue
    const content = line.slice(1)
    for (const match of content.matchAll(/\b(?:public|private|protected|internal)\s+(?:[\w<>\[\],\.\?]+\s+)*?(\w+)\s*\(/g)) {
      if (match[1] !== undefined) symbols.add(match[1])
    }
    for (const match of content.matchAll(/\bclass\s+(\w+)/g)) {
      if (match[1] !== undefined) symbols.add(match[1])
    }
    for (const match of content.matchAll(/\bfunction\s+(\w+)/g)) {
      if (match[1] !== undefined) symbols.add(match[1])
    }
    for (const match of content.matchAll(/\b(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?\(/g)) {
      if (match[1] !== undefined) symbols.add(match[1])
    }
  }
  const generic = new Set(['main', 'get', 'set', 'toString', 'constructor', 'then', 'catch'])
  return Array.from(symbols)
    .filter((symbol) => symbol.length >= 4 && !generic.has(symbol))
    .slice(0, 12)
}

/**
 * 分析产物持久化：analysis 域 snapshots 表。
 * 键 = kind + 仓库 + 提交/提交组 + diff 指纹 + 提示词版本 + 模型；
 * 提交内容不可变可永久缓存，工作区 diff 指纹一变键自然失效。
 */
const PROMPT_VERSION = 1

/** 读取一条持久化缓存（不存在返回 undefined）。 */
function cacheRead(service: ProjectControlService, key: string): { payload: Record<string, unknown>; createdAt: number } | undefined {
  const record = service.store?.snapshots?.get(key)
  if (record === undefined) return undefined
  return { payload: (record['payload'] ?? {}) as Record<string, unknown>, createdAt: Number(record['createdAt'] ?? 0) }
}

/** 写入一条持久化缓存并触发容量清理；返回生成时间。 */
function cacheWrite(service: ProjectControlService, key: string, kind: string, payload: Record<string, unknown>): number {
  if (service.store?.snapshots === undefined) return Date.now()
  const createdAt = Date.now()
  void service.store.snapshots.save({ id: key, kind, payload, createdAt })
  // 淘汰成本取舍：写入频率是"每次 LLM 分析"（分钟级），超限才排序 ≤401 个元素（微秒级），
  // 简单全量排序优于维护时间链表的复杂度。
  const all = service.store.snapshots.list()
  if (all.length > 400) {
    const ordered = [...all].sort((left, right) => Number(left['createdAt'] ?? 0) - Number(right['createdAt'] ?? 0))
    for (const record of ordered.slice(0, all.length - 400)) {
      void service.store.snapshots.delete(String(record['id'] ?? ''))
    }
  }
  return createdAt
}

/** 解析 FUNC/ROLE/CHANGE/CALLER_IMPACT 批量输出为按符号索引的说明表。 */
function parseFunctionExplanations(text: string): Record<string, { role: string; change: string; impact: string }> {
  const result: Record<string, { role: string; change: string; impact: string }> = {}
  let current: string | null = null
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    const funcMatch = line.match(/^FUNC[:：]\s*(\w+)/)
    if (funcMatch !== null) {
      current = funcMatch[1]!
      result[current] = { role: '', change: '', impact: '' }
      continue
    }
    if (current === null) continue
    const entry = result[current]!
    const role = line.match(/^ROLE[:：]\s*(.*)/)
    if (role !== null) { entry.role = role[1]!.trim(); continue }
    const change = line.match(/^CHANGE[:：]\s*(.*)/)
    if (change !== null) { entry.change = change[1]!.trim(); continue }
    const callerImpact = line.match(/^CALLER_IMPACT[:：]\s*(.*)/)
    if (callerImpact !== null) { entry.impact = callerImpact[1]!.trim(); continue }
  }
  return result
}

/** 解析计划 LLM 输出的 JSON 步骤数组；解析失败回落为单步骤（原文即描述）。 */
function parsePlanSteps(text: string): Array<{ title: string; description: string; targetFiles?: string[] }> {
  const match = text.match(/\[[\s\S]*\]/)
  if (match !== null) {
    try {
      const parsed: unknown = JSON.parse(match[0])
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.slice(0, 10).map((item) => {
          const entry = item as Record<string, unknown>
          return {
            title: String(entry['title'] ?? '步骤').slice(0, 80),
            description: String(entry['description'] ?? '').slice(0, 600),
            ...(Array.isArray(entry['targetFiles']) ? { targetFiles: (entry['targetFiles'] as unknown[]).map(String).slice(0, 8) } : {}),
          }
        })
      }
    } catch {
      // JSON 不合法：回落单步骤。
    }
  }
  return [{ title: '执行变更', description: text.slice(0, 800) }]
}

/** 读取请求体（JSON，≤1 MiB）。 */
function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {  return new Promise((resolve, reject) => {
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

/** 读取历史扫描游标（分块续跑；无游标返回空对象）。 */
function readHistoryCursor(service: ProjectControlService): { lastCommit?: string; processedCount?: number } {
  const cursor = service.store?.historyCursor?.get('cursor')
  if (cursor === undefined || cursor === null) return {}
  return cursor as { lastCommit?: string; processedCount?: number }
}

/** 写历史扫描游标。 */
function writeHistoryCursor(service: ProjectControlService, lastCommit: string, processedCount: number): void {
  void service.store?.historyCursor?.save({ id: 'cursor', lastCommit, processedCount })
}

/** 从请求体取出会话 id（工作台按钮都会携带），并反查该会话的工作目录。 */
function sessionCwdOf(service: ProjectControlService, body: Record<string, unknown>): string | undefined {
  const sessionId = body['sessionId']
  if (typeof sessionId !== 'string' || sessionId === '') return undefined
  const session = (service.ctx as any)?.sessions?.get?.(sessionId)
  const cwd = session?.header?.cwd
  return typeof cwd === 'string' && cwd !== '' ? cwd : undefined
}

/**
 * 采纳当前项目，按优先级：
 * 1. 已采纳项目；
 * 2. 请求携带 sessionId 时反查会话工作目录并 ensureProject（多项目/换工作区场景，页面按钮的主路径）；
 * 3. 回落最后一个已持久化项目（重启后首次调用）。
 */
async function adoptProject(service: ProjectControlService, body: Record<string, unknown> = {}): Promise<{ id: string } | undefined> {
  const cwd = sessionCwdOf(service, body)
  if (service.currentProject === undefined || cwd !== undefined) {
    const root = cwd ?? service.currentProject?.identity.rootPath
    if (root !== undefined) {
      const projectService = new ProjectService(
        service.store.projects,
        (args, dir) => service.git.runGit(args, dir),
      )
      const ensured = await projectService.ensureProject(root)
      service.currentProject = ensured.project
      return service.currentProject
    }
  }
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
  const costTracker = new CostTracker()
  const runCostUsd = (runId: string): number => {
    let usd = 0
    for (const attempt of store.attempts.list((attempt) => attempt.runId === runId)) {
      if (attempt.tokenUsage === undefined) continue
      usd += costTracker.calculateCost(attempt.model ?? 'deepseek-v4-flash', {
        input: attempt.tokenUsage.input,
        output: attempt.tokenUsage.output,
        total: attempt.tokenUsage.total,
      }).costUsd
    }
    return Number(usd.toFixed(4))
  }
  return {
    ready: true,
    pluginVersion: service.version,
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
    runs: runs.map((run) => {
      const runSteps = store.steps.list((step) => step.runId === run.id)
      const change = store.changes.get(run.changeId)
      const plan = change?.currentPlanId === undefined ? undefined : store.plans.get(change.currentPlanId)
      const titleOf = (step: { planStepId: string }): string | null =>
        plan?.steps.find((definition) => definition.id === step.planStepId)?.title ?? null
      // 步骤执行后 orchestrator 只写 claimedOutcome（status 恒为 pending），完成判定以它为准。
      const doneSteps = runSteps.filter((step) => step.claimedOutcome !== undefined)
      const current = runSteps.find((step) => step.claimedOutcome === undefined)
      return {
        id: run.id,
        changeId: run.changeId,
        status: run.status,
        startedAt: run.startedAt ?? null,
        finishedAt: run.finishedAt ?? null,
        costUsd: runCostUsd(run.id),
        stepsTotal: runSteps.length,
        stepsDone: doneSteps.length,
        currentStep: run.status === 'running' && current !== undefined ? (titleOf(current) ?? '执行中') : null,
      }
    }),
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
    confirmed: (store.confirmed?.list() ?? []).filter((item) => (item as { status?: string }).status === 'active').map((item) => ({
      id: (item as { id: string }).id,
      type: (item as { type: string }).type,
      text: (item as { text: string }).text,
      forbiddenPaths: (item as { forbiddenPaths?: string[] }).forbiddenPaths ?? [],
    })),
    concepts: (store.concepts?.list() ?? []).slice(-50).map((concept) => ({
      id: concept.id,
      name: concept.name,
      category: concept.category,
      description: concept.description,
      occurrences: concept.occurrences,
    })),
    memories: memories.map((memory) => ({
      id: memory.id,
      projectId: memory.projectId,
      type: memory.type,
      truthLevel: memory.truthLevel,
      title: memory.title,
      content: trimSnippet(memory.content ?? '', 200),
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
              : sessionCwdOf(service, body)
                  ?? service.currentProject?.identity.rootPath
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
          const resume = body['resume'] === true
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
            const maxCommits = typeof body['maxCommits'] === 'number' ? Math.min(body['maxCommits'], service.liveConfig.bootstrap.maxCommitsPerRun) : service.liveConfig.bootstrap.defaultMaxCommits
            const cursor = readHistoryCursor(service)
            const imported = resume && cursor.lastCommit !== undefined
              ? await scanHistory(service.git, rootPath, ensured.project.id, service.store.importedChanges, { maxCommits, summaries, fromCommit: cursor.lastCommit })
              : await scanHistory(service.git, rootPath, ensured.project.id, service.store.importedChanges, { maxCommits, summaries })
            importedCount = imported.length
            const lastHash = await service.git.getHeadSha(rootPath)
            if (lastHash !== undefined) writeHistoryCursor(service, lastHash, importedCount)
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
        if (req.method === 'POST' && routePath === '/confirmed') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const text = typeof body['text'] === 'string' ? body['text'] : ''
            if (text === '') {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'text is required' }))
              return
            }
            const item = addConfirmedItem(service, {
              type: (typeof body['type'] === 'string' && ['requirement', 'constraint', 'decision', 'non-goal'].includes(body['type']) ? body['type'] : 'constraint') as never,
              text,
              forbiddenPaths: Array.isArray(body['forbiddenPaths']) ? body['forbiddenPaths'] as string[] : [],
            })
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, id: item.id }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        if (req.method === 'POST' && routePath === '/confirmed/remove') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const id = typeof body['id'] === 'string' ? body['id'] : ''
            const removed = id === '' ? false : removeConfirmedItem(service, id)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: removed }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        if (req.method === 'GET' && routePath === '/history/status') {
          const cursor = readHistoryCursor(service)
          res.writeHead(200, { 'content-type': 'application/json' })
          res.end(JSON.stringify({
            cursor,
            importedChanges: service.store?.importedChanges?.list().length ?? 0,
            canResume: cursor.lastCommit !== undefined,
          }))
          return
        }

        if (req.method === 'POST' && routePath === '/analyze') {
          try {
            const body = await readJsonBody(req)
            const project = await adoptProject(service, body)
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
            const project = await adoptProject(service, body)
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

        // 删除变更（级联清理计划/运行/步骤/尝试/问题/验收记录）。
        if (req.method === 'POST' && routePath === '/changes/delete') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const id = typeof body['id'] === 'string' ? body['id'] : ''
            const change = id === '' ? undefined : service.store.changes.get(id as never)
            if (change === undefined) {
              res.writeHead(404, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'change not found' }))
              return
            }
            // 先取消运行中的 Run：后台执行循环否则会在记录删除后继续写入（孤儿尝试/状态污染）。
            for (const active of service.store.runs.list((candidate) => candidate.changeId === id
              && (candidate.status === 'running' || candidate.status === 'queued' || candidate.status === 'retrying' || candidate.status === 'verifying'))) {
              await service.orchestrator?.cancelRun(active.id as never).catch(() => {})
            }
            // 删除顺序取舍：子记录在前、变更（父）最后——中途崩溃最坏是"删除不完整"（重删补齐），
            // 不会产生查得到子、查不到父的孤儿；引入存储事务的复杂度收益配不上。
            for (const run of service.store.runs.list((candidate) => candidate.changeId === id)) {
              for (const step of service.store.steps.list((step) => step.runId === run.id)) {
                await service.store.steps.delete(step.id)
              }
              for (const attempt of service.store.attempts.list((attempt) => attempt.runId === run.id)) {
                await service.store.attempts.delete(attempt.id)
              }
              await service.store.runs.delete(run.id)
            }
            for (const plan of service.store.plans.list((plan) => plan.changeId === id)) {
              await service.store.plans.delete(plan.id)
            }
            for (const issue of service.store.issues.list((issue) => issue.changeId === id)) {
              await service.store.issues.delete(issue.id)
            }
            for (const verification of service.store.verifications.list((verification) => verification.changeId === id)) {
              await service.store.verifications.delete(verification.id)
            }
            await service.store.changes.delete(id as never)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true }))
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
            const project = await adoptProject(service, body)
            const cwd = project?.identity?.rootPath
            if (project === undefined || cwd === undefined) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'no project initialized' }))
              return
            }
            const reviewSha = typeof body['sha'] === 'string' && body['sha'] !== '' && body['sha'] !== 'working'
              ? body['sha'] : undefined
            const reviewForce = body['force'] === true
            const diff = reviewSha !== undefined
              ? await service.git.getDiff(cwd, { from: `${reviewSha}^`, to: reviewSha, maxBytes: 200 * 1024 })
              : await service.git.getDiff(cwd)
            if (diff.filesChanged === 0) {
              res.writeHead(200, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ issuesFound: 0, issues: reviewSha !== undefined ? '该提交无差异内容。' : '工作区无改动，无可评审内容。', verdict: '', issueList: [], cached: false }))
              return
            }
            const reviewRoute = resolveDeploymentRoute(ctx, 'reasoning', service.liveConfig)
            const reviewStoreKey = `rv:${cwd}|${reviewSha ?? 'working'}|${diff.diffHash}|v${PROMPT_VERSION}|${reviewRoute.provider}/${reviewRoute.model}`
            if (!reviewForce) {
              const storeHit = cacheRead(service, reviewStoreKey)
              if (storeHit !== undefined) {
                res.writeHead(200, { 'content-type': 'application/json' })
                res.end(JSON.stringify({
                  issuesFound: Number(storeHit.payload['issuesFound'] ?? 0),
                  issues: String(storeHit.payload['issues'] ?? ''),
                  verdict: String(storeHit.payload['verdict'] ?? ''),
                  issueList: storeHit.payload['issueList'] ?? [],
                  cached: true,
                  generatedAt: storeHit.createdAt,
                }))
                return
              }
            }
            const route = reviewRoute
            const changeId = typeof body['changeId'] === 'string' ? body['changeId'] : undefined
            let analysis: { text: string }
            try {
              analysis = await runLlmAnalysis(ctx, {
                prompt: [
                  'You are an independent code reviewer. Review the diff below for correctness, error handling, concurrency, resource leaks, security, and over-reach.',
                  'Answer with one issue per line in the exact format: SEVERITY | category | title | evidence location | suggested fix',
                  'SEVERITY is one of critical/high/medium/low/info. If the diff is clean, answer exactly: CLEAN',
                  'Write category, title, evidence location and suggested fix in Chinese (keep the SEVERITY keyword in English).',
                  'After the issues (or CLEAN), always append one final line:',
                  'OPTIMALITY: <用中文 1-3 句评价：该改动是否侵入式最小、是否最优实现；若有明显更优方案请指出>',
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
            } catch (error: unknown) {
              // 评审失败不 500：降级为可见的失败结论，页面保持可用并可重试。
              const message = error instanceof Error ? error.message : String(error)
              res.writeHead(200, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ issuesFound: 0, issues: '', verdict: `评审失败：${message}（点「重新生成」可重试）`, issueList: [], cached: false, failed: true }))
              return
            }
            const verdictMatch = analysis.text.match(/OPTIMALITY[:：]\s*([\s\S]*)/)
            const verdict = verdictMatch?.[1]?.trim() ?? ''
            const lines = analysis.text.slice(0, verdictMatch?.index ?? analysis.text.length)
              .split('\n').map((line) => line.trim()).filter((line) => line.length > 0 && line !== 'CLEAN')
            const issueList = lines.map((line) => {
              const parts = line.split('|').map((part) => part.trim())
              return {
                severity: parts[0] ?? 'medium',
                category: parts[1] ?? '',
                title: parts[2] ?? line,
                evidence: parts[3] ?? '',
                fix: parts[4] ?? '',
              }
            })
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
            const generatedAt = Date.now()
            cacheWrite(service, reviewStoreKey, 'review', { issuesFound: lines.length, issues: analysis.text, verdict, issueList })
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ issuesFound: lines.length, issues: analysis.text, verdict, issueList, cached: false, generatedAt }))
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
            const project = await adoptProject(service, body)
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
            const project = await adoptProject(service, body)
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

            // 三级影响图（V1.0 §85-90）：把引用边 + 变更文件投进 ProjectGraph，
            // ImpactEngine 归类 direct/indirect + 风险分。
            const graph = new ProjectGraph()
            for (const reference of evidence.references) {
              if (reference.filePath === '') continue
              graph.addNode({ id: reference.filePath, type: 'file', label: reference.filePath, filePath: reference.filePath })
              graph.addEdge({ source: reference.filePath, target: filePath, type: 'references', evidenceId: undefined })
            }
            const engine = new ImpactEngine()
            const impact = engine.computeImpact([filePath || symbolName], graph)

            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({
              evidenceSource: evidence.source,
              lspFailed: evidence.lspFailed,
              referenceCount: evidence.references.length,
              references: evidence.references.slice(0, 40).map((reference) => ({
                filePath: reference.filePath,
                line: reference.line,
              })),
              impact: {
                riskLevel: impact.riskLevel,
                riskScore: impact.riskScore,
                direct: impact.impactedItems.filter((item) => item.level === 'direct').map((item) => item.node.id).slice(0, 30),
                indirect: impact.impactedItems.filter((item) => item.level === 'indirect').map((item) => item.node.id).slice(0, 30),
                potential: impact.impactedItems.filter((item) => item.level === 'potential').map((item) => item.node.id).slice(0, 30),
                affectedTests: impact.affectedTests.slice(0, 20),
              },
            }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 提交列表（含未提交工作区改动）——提交核查台主数据源。
        if (req.method === 'GET' && routePath === '/commits') {
          try {
            const query: Record<string, unknown> = {}
            for (const [key, value] of url.searchParams.entries()) query[key] = value
            const project = await adoptProject(service, query)
            const cwd = project?.identity?.rootPath
            if (cwd === undefined) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'no project initialized' }))
              return
            }
            const limitRaw = Number(query['limit'] ?? 50)
            const limit = Number.isFinite(limitRaw) ? Math.min(200, Math.max(1, Math.trunc(limitRaw))) : 50
            const status = await service.git.getStatus(cwd)
            const raw = await service.git.runGit(
              ['log', '-n', String(limit), '--date-order', '--format=%H%x1f%h%x1f%an%x1f%at%x1f%s%x1e', '--numstat'],
              cwd,
            )
            const commits: Array<Record<string, unknown>> = []
            let current: Record<string, unknown> | undefined
            for (const line of raw.split('\n')) {
              if (line.includes('\x1f')) {
                const [hash, shortHash, authorName, dateStr, subject] = line.split('\x1e')[0]!.split('\x1f')
                current = {
                  sha: hash?.trim() ?? '',
                  shortHash: shortHash?.trim() ?? '',
                  author: authorName?.trim() ?? '',
                  date: Number(dateStr ?? 0) * 1000,
                  subject: subject?.trim() ?? '',
                  files: [] as Array<{ path: string; adds: number; dels: number }>,
                }
                commits.push(current)
                continue
              }
              const numstat = line.split('\t').map((part) => part.trim())
              if (current !== undefined && numstat.length >= 3 && numstat[0] !== undefined && numstat[1] !== undefined && numstat[2] !== undefined) {
                current.files.push({
                  path: numstat[2],
                  adds: numstat[0] === '-' ? 0 : Number(numstat[0]),
                  dels: numstat[1] === '-' ? 0 : Number(numstat[1]),
                })
              }
            }
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({
              rootPath: cwd,
              branch: status.branch ?? null,
              headSha: status.headSha ?? null,
              working: {
                fileCount: status.entries.length,
                isClean: status.isClean,
                files: status.entries.slice(0, 40).map((entry) => ({ path: entry.path, status: entry.status })),
              },
              commits,
            }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 单次提交/未提交改动的核查详情：文件清单 + 补丁 + LLM 解读（改了什么/实现逻辑/风险）。
        if (req.method === 'POST' && routePath === '/commit-detail') {
          try {
            const body = await readJsonBody(req)
            const project = await adoptProject(service, body)
            const cwd = project?.identity?.rootPath
            if (cwd === undefined) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'no project initialized' }))
              return
            }
            const sha = typeof body['sha'] === 'string' && body['sha'] !== '' ? body['sha'] : 'working'
            const isWorking = sha === 'working'
            const rangeArgs = isWorking ? ['HEAD'] : [`${sha}^..${sha}`]
            let numstatRaw: string
            try {
              numstatRaw = await service.git.runGit(['diff', '--no-color', '--numstat', ...rangeArgs], cwd)
            } catch {
              // 根提交没有父提交：与空树比对。
              numstatRaw = await service.git.runGit(
                ['diff', '--no-color', '--numstat', isWorking ? 'HEAD' : `4b825dc642cb6eb9a060e54bf8d69288fbee4904..${sha}`],
                cwd,
              )
            }
            const files = parseNumstat(numstatRaw)
            const insertions = files.reduce((sum, file) => sum + file.adds, 0)
            const deletions = files.reduce((sum, file) => sum + file.dels, 0)
            const diff = isWorking
              ? await service.git.getDiff(cwd, { from: 'HEAD', maxBytes: 200 * 1024 })
              : await service.git.getDiff(cwd, { from: `${sha}^`, to: sha, maxBytes: 200 * 1024 })
            let commitMeta: { message: string; author: string; date: number } | undefined
            if (!isWorking) {
              const show = await service.git.runGit(['show', '-s', '--format=%an%x1f%at%x1f%s', sha], cwd).catch(() => '')
              const [author, dateStr, subject] = show.trim().split('\x1f')
              commitMeta = { author: author ?? '', date: Number(dateStr ?? 0) * 1000, message: subject ?? '' }
            }

            const force = body['force'] === true
            const detailRoute = resolveDeploymentRoute(ctx, 'reasoning', service.liveConfig)
            const memoryKey = `${cwd}|${sha}|${diff.diffHash}`
            const modelTag = detailRoute.provider + '/' + detailRoute.model
            const storeKey = `cd:${cwd}|${sha}|${diff.diffHash}|v${PROMPT_VERSION}|${detailRoute.provider}/${detailRoute.model}`
            let analysis: CommitAnalysis | undefined
            let analysisCached = false
            let analysisGeneratedAt: number | undefined
            if (!force) {
              const memoryHit = commitAnalysisCache.get(memoryKey)
              if (memoryHit !== undefined) {
                analysis = memoryHit
                analysisCached = true
              } else {
                const storeHit = cacheRead(service, storeKey)
                if (storeHit !== undefined) {
                  analysis = {
                    what: String(storeHit.payload['what'] ?? ''),
                    logic: Array.isArray(storeHit.payload['logic']) ? (storeHit.payload['logic'] as string[]) : [],
                    risks: Array.isArray(storeHit.payload['risks']) ? (storeHit.payload['risks'] as string[]) : [],
                  }
                  analysisCached = true
                  analysisGeneratedAt = storeHit.createdAt
                  commitAnalysisCache.set(memoryKey, analysis)
                }
              }
            }
            if (analysis === undefined) {
              try {
                const llm = await runLlmAnalysis(ctx, {
                prompt: [
                  'You are explaining a git change to a senior developer who must review AI-written code.',
                  'Answer in Chinese, STRICTLY in this format (no extra text):',
                  'WHAT: <2-3 句话说明这次改动做了什么>',
                  'LOGIC:',
                  '1. <实现逻辑步骤>',
                  '2. <实现逻辑步骤>',
                  'RISK: <最多 3 条潜在风险/注意点，用「；」分隔；没有就写「无»',
                  '',
                  `Changed files: ${files.map((file) => file.path).join(', ')}`,
                  '',
                  'Diff:',
                  diff.patch.slice(0, 60_000),
                ].join('\n'),
                provider: detailRoute.provider,
                model: detailRoute.model,
                maxTokens: service.liveConfig.analysisMaxTokens,
                timeoutMs: service.liveConfig.analysisTimeoutMs,
                purpose: 'project-control-commit-detail',
              })
              analysis = parseCommitAnalysis(llm.text)
              analysisGeneratedAt = Date.now()
              commitAnalysisCache.set(memoryKey, analysis)
              cacheWrite(service, storeKey, 'commit-detail', { ...analysis })
              if (commitAnalysisCache.size > 40) {
                commitAnalysisCache.delete(commitAnalysisCache.keys().next().value as string)
              }
              } catch (error: unknown) {
                // LLM 失败不拖垮整个核查卡：降级为可见的错误说明（文件清单/补丁照常可用）。
                const message = error instanceof Error ? error.message : String(error)
                analysis = { what: `AI 解读失败：${message}（点「重新生成」可重试）`, logic: [], risks: [] }
                analysisCached = false
              }
            }
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({
              sha, isWorking, files, insertions, deletions,
              patchTruncated: diff.isTruncated,
              patch: diff.patch,
              commit: commitMeta ?? null,
              analysis,
              analysisCached,
              analysisGeneratedAt: analysisGeneratedAt ?? null,
              model: modelTag,
            }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 变更级三级影响范围（直接/间接/潜在 + 风险构成 + 记忆联动），供工作台影响图渲染。
        // body.shas 支持多提交联合（取变更文件并集）。
        if (req.method === 'POST' && routePath === '/impact-scope') {
          try {
            const body = await readJsonBody(req)
            const project = await adoptProject(service, body)
            const cwd = project?.identity?.rootPath
            if (cwd === undefined) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'no project initialized' }))
              return
            }
            const shas: string[] = Array.isArray(body['shas']) && body['shas'].length > 0
              ? (body['shas'] as unknown[]).filter((item): item is string => typeof item === 'string' && item !== '')
              : [typeof body['sha'] === 'string' && body['sha'] !== '' ? body['sha'] : 'working']
            const changedFiles = new Set<string>()
            for (const target of shas) {
              const isWorking = target === 'working'
              const rangeArgs = isWorking ? ['HEAD'] : [`${target}^..${target}`]
              let numstatRaw: string
              try {
                numstatRaw = await service.git.runGit(['diff', '--no-color', '--numstat', ...rangeArgs], cwd)
              } catch {
                numstatRaw = await service.git.runGit(
                  ['diff', '--no-color', '--numstat', isWorking ? 'HEAD' : `4b825dc642cb6eb9a060e54bf8d69288fbee4904..${target}`],
                  cwd,
                )
              }
              for (const file of parseNumstat(numstatRaw)) changedFiles.add(normalizePath(file.path))
            }
            const changedList = Array.from(changedFiles)
            const graph = new ProjectGraph()
            for (const file of changedList.slice(0, 20)) {
              graph.addNode({ id: file, type: 'file', label: file, filePath: file })
            }
            // 反向引用扫描：谁引用了变更文件（1 跳）与引用者的引用者（2 跳，供间接层）。
            // 文档/配置类文件不是代码引用关系，从引用者中剔除。
            const NOISE = /\.(md|txt|json|ya?ml|xml|html?|css|scss|lock|csproj|sln|props|targets)$/i
            const scanned = new Set<string>()
            const hops: string[][] = [changedList.slice(0, 20)]
            for (let depth = 0; depth < 2; depth += 1) {
              const nextHop: string[] = []
              for (const target of hops[depth] ?? []) {
                if (scanned.has(target) || scanned.size > 40) continue
                scanned.add(target)
                const token = importTokenOf(target)
                if (token === undefined) continue
                const matches = await service.git.runGit(['grep', '-l', '-F', token, '--', '.'], cwd)
                  .then((out) => out.split('\n').map(normalizePath)
                    .filter((p) => p !== '' && !changedFiles.has(p) && !NOISE.test(p) && !/test|spec/i.test(p))
                    .slice(0, 60))
                  .catch(() => [] as string[])
                for (const importer of matches) {
                  if (importer === target) continue
                  graph.addNode({ id: importer, type: 'file', label: importer, filePath: importer })
                  graph.addEdge({ source: importer, target, type: 'references', evidenceId: undefined })
                  if (!nextHop.includes(importer)) nextHop.push(importer)
                }
              }
              hops.push(nextHop.slice(0, 12))
            }
            const impact = new ImpactEngine().computeImpact(changedList, graph)
            // 函数级影响：从每个选中提交自己的补丁提取修改过的符号（方法/类），
            // 反查全仓库调用点（文件:行号:代码），直接回答"哪些函数被波及"。
            let combinedPatch = ''
            for (const target of shas) {
              const isWorking = target === 'working'
              const rangeArgs = isWorking ? ['HEAD'] : [`${target}^..${target}`]
              try {
                combinedPatch += '\n' + await service.git.runGit(['diff', '--no-color', ...rangeArgs], cwd)
              } catch {
                combinedPatch += '\n' + await service.git.runGit(
                  ['diff', '--no-color', isWorking ? 'HEAD' : `4b825dc642cb6eb9a060e54bf8d69288fbee4904..${target}`],
                  cwd,
                ).catch(() => '')
              }
              if (combinedPatch.length > 400 * 1024) break
            }
            const changedSymbols = extractChangedSymbols(combinedPatch)
            const functionImpact: Array<{ symbol: string; definedIn: string; callers: Array<{ file: string; line: string; snippet: string }> }> = []
            for (const symbol of changedSymbols) {
              const grep = await service.git.runGit(['grep', '-n', '-F', symbol, '--', '.'], cwd).catch(() => '')
              const callers: Array<{ file: string; line: string; snippet: string }> = []
              for (const line of grep.split('\n')) {
                const first = line.indexOf(':')
                if (first === -1) continue
                const file = normalizePath(line.slice(0, first))
                if (file === '' || NOISE.test(file) || /test|spec/i.test(file)) continue
                const rest = line.slice(first + 1)
                const lineNo = rest.split(':')[0] ?? ''
                const content = rest.slice(rest.indexOf(':') + 1).trim()
                if (content.length < 5) continue
                // 定义行本身不算调用方
                if (new RegExp(`\\b${symbol}\\s*\\(`).test(content) && /\b(public|private|protected|internal|function)\b/.test(content)) continue
                callers.push({ file, line: lineNo, snippet: content.slice(0, 140) })
                if (callers.length >= 8) break
              }
              if (callers.length > 0) {
                const definedIn = changedList.find((file) => file.includes(symbol)) ?? changedList[0] ?? ''
                functionImpact.push({ symbol, definedIn, callers })
              }
              if (functionImpact.length >= 10) break
            }
            // LLM 解读每个被波及函数的功能与受影响方式（单次调用，批量产出）。
            // 说明文本持久化到 snapshots；调用点本身每次实时重扫，保证关系图新鲜。
            let explanationsCached = false
            let explanationsGeneratedAt: number | undefined
            if (functionImpact.length > 0) {
              const explainRoute = resolveDeploymentRoute(ctx, 'standard', service.liveConfig)
              const explainForce = body['force'] === true
              const callerDigest = functionImpact
                .map((fi) => `FUNC: ${fi.symbol}（定义于 ${fi.definedIn}）\n` +
                  fi.callers.map((caller) => `  调用点 ${caller.file}:${caller.line} \`${caller.snippet}\``).join('\n'))
                .join('\n')
              const patchHash = createHash('sha256').update(combinedPatch).digest('hex').slice(0, 16)
              const cacheKey = `fi:${cwd}|${shas.slice().sort().join(',')}|${patchHash}|v${PROMPT_VERSION}|${explainRoute.provider}/${explainRoute.model}`
              const memoryExplain = explainForce ? undefined : commitAnalysisCache.get(cacheKey)
              const storeExplain = (memoryExplain === undefined && !explainForce) ? cacheRead(service, cacheKey) : undefined
              let explanations: Record<string, { role: string; change: string; impact: string }>
              if (memoryExplain !== undefined) {
                explanations = memoryExplain as unknown as Record<string, { role: string; change: string; impact: string }>
                explanationsCached = true
              } else if (storeExplain !== undefined) {
                explanations = storeExplain.payload as unknown as Record<string, { role: string; change: string; impact: string }>
                explanationsCached = true
                explanationsGeneratedAt = storeExplain.createdAt
                commitAnalysisCache.set(cacheKey, explanations as unknown as CommitAnalysis)
              } else {
                let llmText = ''
                try {
                  const llm = await runLlmAnalysis(ctx, {
                    prompt: [
                      '以下是本次提交修改的函数（含补丁）与全仓库调用点。请说明每个函数的功能、本次修改改变了它的什么行为、以及对调用方代码的影响。',
                      '严格按以下格式输出（每个函数一组，符号名保持原样，全部用中文）：',
                      'FUNC: <符号名>',
                      'ROLE: <该函数的功能，一句话>',
                      'CHANGE: <本次修改改变了它的什么（行为/返回值/异常/性能）>',
                      'CALLER_IMPACT: <对调用该函数的代码的具体影响，一句话>',
                      '',
                      '补丁：',
                      combinedPatch.slice(0, 40_000),
                      '',
                      '符号与调用点：',
                      callerDigest.slice(0, 12_000),
                    ].join('\n'),
                    provider: explainRoute.provider,
                    model: explainRoute.model,
                    maxTokens: service.liveConfig.analysisMaxTokens,
                    timeoutMs: service.liveConfig.analysisTimeoutMs,
                    purpose: 'project-control-function-impact',
                  })
                  llmText = llm.text
                } catch {
                  // 说明生成失败不影响影响图：函数调用点照常返回，仅说明缺失。
                  llmText = ''
                }
                explanations = parseFunctionExplanations(llmText)
                explanationsGeneratedAt = Date.now()
                commitAnalysisCache.set(cacheKey, explanations as unknown as CommitAnalysis)
                cacheWrite(service, cacheKey, 'function-impact', { ...explanations })
                if (commitAnalysisCache.size > 40) {
                  commitAnalysisCache.delete(commitAnalysisCache.keys().next().value as string)
                }
              }
              for (const fi of functionImpact) {
                const explain = explanations[fi.symbol]
                if (explain !== undefined) {
                  fi.role = explain.role
                  fi.change = explain.change
                  fi.impact = explain.impact
                }
              }
            }
            const indirectItems = impact.impactedItems.filter((item) => item.level === 'indirect')
            // 风险构成：把评分拆成可见的因子，说明"风险在哪"。
            const keyPoints = changedList.filter((file) => /controller|service|repository|manager|gateway|middleware|host|program|startup/i.test(file))
            const riskFactors: Array<{ text: string; points: number }> = [
              { text: `变更文件 ${changedList.length} 个（每项 +5）`, points: changedList.length * 5 },
              ...(indirectItems.length > 0
                ? [{ text: `${indirectItems.length} 个引用方受传播影响（每项 +3）`, points: indirectItems.length * 3 }]
                : []),
              ...(keyPoints.length > 0
                ? [{ text: `涉及关键组件：${keyPoints.map((file) => file.split('/').pop()).slice(0, 4).join('、')}`, points: keyPoints.length * 10 }]
                : []),
              ...(changedSymbols.length === 0
                ? []
                : [{ text: `${changedSymbols.length} 个函数/类被修改（每项 +4）`, points: changedSymbols.length * 4 }]),
            ]
            // 结合项目记忆：已确认记忆按新近度带出，供核查时对照。
            const memories = (service.store?.memories?.list() ?? [])
              .filter((memory) => memory.isHumanConfirmed)
              .sort((left, right) => right.createdAt - left.createdAt)
              .slice(0, 6)
              .map((memory) => ({ title: memory.title, type: memory.type }))
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({
              changedFiles: changedList,
              shas,
              riskLevel: impact.riskLevel,
              riskScore: impact.riskScore,
              riskFactors,
              keyChangePoints: keyPoints.slice(0, 10),
              memories,
              functionImpact,
              explanationsCached,
              generatedAt: explanationsGeneratedAt ?? null,
              levels: impact.impactedItems
                .filter((item) => item.level !== 'direct')
                .map((item) => ({
                  level: item.level,
                  depth: item.depth,
                  path: item.node.filePath ?? item.node.id,
                  confidence: Number(item.confidence.toFixed(2)),
                  reason: item.reason,
                }))
                .slice(0, 80),
              direct: impact.impactedItems.filter((item) => item.level === 'direct').map((item) => item.node.filePath ?? item.node.id),
            }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 单文件差异（提交内或工作区），供工作台代码高亮对比视图。
        if (req.method === 'POST' && routePath === '/file-diff') {
          try {
            const body = await readJsonBody(req)
            const project = await adoptProject(service, body)
            const cwd = project?.identity?.rootPath
            const path = typeof body['path'] === 'string' ? body['path'] : ''
            if (cwd === undefined || path === '') {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'path and an initialized project are required' }))
              return
            }
            const sha = typeof body['sha'] === 'string' && body['sha'] !== '' ? body['sha'] : 'working'
            const isWorking = sha === 'working'
            const rangeArgs = isWorking ? ['HEAD'] : [`${sha}^..${sha}`]
            let patch = ''
            try {
              patch = await service.git.runGit(['diff', '--no-color', ...rangeArgs, '--', path], cwd)
            } catch {
              patch = await service.git.runGit(
                ['diff', '--no-color', isWorking ? 'HEAD' : `4b825dc642cb6eb9a060e54bf8d69288fbee4904..${sha}`, '--', path],
                cwd,
              )
            }
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ path, patch: patch.slice(0, 120 * 1024) }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 页面一键启动执行：创建变更 → LLM 生成计划 → 无会话 owner agent 后台执行。
        if (req.method === 'POST' && routePath === '/runs/start') {
          if (service.store === undefined || service.orchestrator === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const title = typeof body['title'] === 'string' ? body['title'].trim() : ''
            const description = typeof body['description'] === 'string' ? body['description'].trim() : ''
            if (title === '' || description === '') {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'title and description are required' }))
              return
            }
            const project = await adoptProject(service, body)
            const cwd = project?.identity?.rootPath
            if (project === undefined || cwd === undefined) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'no project initialized' }))
              return
            }
            const changeService = new ChangeService(service.store.changes, service.git, service.evidenceManager)
            const change = await changeService.createChange(project.id as never, title, description, cwd)
            // LLM 生成执行计划（严格 JSON 数组；解析失败回落单步骤）。
            const planRoute = resolveDeploymentRoute(ctx, 'reasoning', service.liveConfig)
            const bootstrap = service.store.checkpoints.list().at(-1)
            // .at(-1) 空数组返回 undefined：null/undefined 都要挡住，否则未初始化的项目执行必炸。
            const stackHint = bootstrap != null ? `仓库技术栈：${bootstrap.techStack.join(', ') || '未知'}` : ''
            const llm = await runLlmAnalysis(ctx, {
              prompt: [
                '你是技术负责人。为以下变更生成执行计划，输出严格的 JSON 数组、不要任何多余文字：',
                '[{"title":"步骤标题","description":"该步骤要做什么与验收标准","targetFiles":["相关文件路径"]}]',
                '3 到 6 个步骤，按执行顺序排列；第一步可以是梳理/分析，最后一步是构建与测试验证。全部用中文。',
                stackHint,
                '',
                `变更标题：${title}`,
                `需求与背景：${description}`,
              ].filter((line) => line !== '').join('\n'),
              provider: planRoute.provider,
              model: planRoute.model,
              maxTokens: service.liveConfig.analysisMaxTokens,
              timeoutMs: service.liveConfig.analysisTimeoutMs,
              purpose: 'project-control-plan',
            })
            let steps = parsePlanSteps(llm.text)
            if (steps.length === 1 && steps[0]!.title === '执行变更') {
              // 解析失败回落发生了：带更强格式指令重试一次，仍失败才接受单步骤降级。
              try {
                const retry = await runLlmAnalysis(ctx, {
                  prompt: [
                    '上一次输出不是合法 JSON。这次只输出 JSON 数组本身：不要 Markdown 代码块、不要任何解释文字。',
                    '格式：[{"title":"步骤标题","description":"做什么与验收标准","targetFiles":["相关文件"]}]，3 到 6 步，全部中文。',
                    '',
                    '变更标题：' + title,
                    '需求与背景：' + description,
                  ].join('\n'),
                  provider: planRoute.provider,
                  model: planRoute.model,
                  maxTokens: service.liveConfig.analysisMaxTokens,
                  timeoutMs: service.liveConfig.analysisTimeoutMs,
                  purpose: 'project-control-plan-retry',
                })
                steps = parsePlanSteps(retry.text)
              } catch {
                // 重试失败：维持单步骤降级
              }
            }
            await service.orchestrator.createPlan(change, `${title} · 计划`, steps)
            // 页面触发的执行没有聊天会话：owner 传 undefined → 分离后台执行，取消走 cancelRun。
            const runId = await service.orchestrator.startRun(undefined, change)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, runId, changeId: change.id, steps: steps.length }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 模型分配：读取当前各任务等级的模型 + 可选模型清单（可视化切换用）。
        if (req.method === 'GET' && routePath === '/model-config') {
          try {
            const tierKeys = ['standard', 'fast', 'reasoning', 'verifier'] as const
            const allTiers = service.liveConfig.modelTiers as Record<string, unknown>
            const tiers: Record<string, { provider: string; model: string }> = {}
            for (const key of tierKeys) {
              const entry = allTiers[key]
              if (typeof entry === 'object' && entry !== null) {
                const provider = String((entry as Record<string, unknown>)['provider'] ?? '')
                const model = String((entry as Record<string, unknown>)['model'] ?? '')
                if (provider !== '' && model !== '') tiers[key] = { provider, model }
              }
            }
            const options: Array<{ provider: string; id: string; name: string }> = []
            const llm = (ctx as any).llm
            if (llm?.listProviders !== undefined) {
              for (const info of llm.listProviders()) {
                try {
                  const models = await llm.listModels(info.id ?? info.provider)
                  for (const model of models) options.push({ provider: info.id ?? info.provider, id: model.id, name: model.name })
                } catch {
                  // 单个提供方模型列举失败不影响其它提供方
                }
              }
            }
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ tiers, options }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 保存模型分配：立即生效（liveConfig）+ 落库（重启后覆盖 settings.yaml）。
        if (req.method === 'POST' && routePath === '/model-config') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const tiers = body['tiers']
            const CLASSES = ['standard', 'fast', 'reasoning', 'verifier']
            if (typeof tiers !== 'object' || tiers === null) throw new Error('tiers object required')
            const next: Record<string, { provider: string; model: string }> = { ...service.liveConfig.modelTiers }
            let touched = false
            for (const key of CLASSES) {
              const entry = (tiers as Record<string, unknown>)[key]
              if (typeof entry !== 'object' || entry === null) continue
              touched = true
              const provider = String((entry as Record<string, unknown>)['provider'] ?? '')
              const model = String((entry as Record<string, unknown>)['model'] ?? '')
              if (provider === '' || model === '') {
                // 空字段 = 清除该级覆盖（回落跟随聊天模型）
                delete next[key]
              } else {
                next[key] = { provider, model }
              }
            }
            if (!touched) throw new Error('no tier entries in payload')
            service.liveConfig = { ...service.liveConfig, modelTiers: next } as typeof service.liveConfig
            await service.store.pluginSettings.save({ id: 'model-tiers', ...next })
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 目录浏览（替代原生对话框）：列出某目录下的子目录，供网页端逐级导航。
        if (req.method === 'POST' && routePath === '/fs/list') {
          // 路径解析在 try 外：catch 也要回传 target（否则读目录失败时 catch 自身引用不到 target）。
          const body = await readJsonBody(req).catch(() => ({}) as Record<string, unknown>)
          // 默认路径回退链：显式路径 > 当前项目根 > D:/Code（业主指定）> 用户主目录。
          const project = await adoptProject(service, body).catch(() => undefined)
          const explicit = typeof body['path'] === 'string' && body['path'].trim() !== '' ? body['path'].trim() : undefined
          const rawPath = explicit ?? project?.identity?.rootPath ?? 'D:/Code'
          const target = resolve(rawPath === '' ? homedir() : rawPath)
          try {
            const entries = await readdir(target, { withFileTypes: true })
            const dirs = entries
              .filter((entry) => (entry.isDirectory() || entry.isSymbolicLink()) && !entry.name.startsWith('.'))
              .map((entry) => join(target, entry.name))
              .sort((left, right) => left.localeCompare(right))
              .slice(0, 500)
            const parent = dirname(target)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ path: target, parent: parent === target ? null : parent, dirs }))
          } catch (error: unknown) {
            // 失败也回传原路径：前端导航状态不被清空，可继续走上级目录。
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ path: target, parent: dirname(target), dirs: [], error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 把目录登记为正式工作区（写入本体工作区注册表，会话即可选用，无需原生对话框）。
        if (req.method === 'POST' && routePath === '/workspace/register') {
          try {
            const body = await readJsonBody(req)
            const path = typeof body['path'] === 'string' && body['path'].trim() !== '' ? body['path'].trim() : ''
            if (path === '') {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'path is required' }))
              return
            }
            const registry = (ctx as any).workspaceRegistry
            if (registry?.create === undefined) {
              res.writeHead(503, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'workspace registry unavailable' }))
              return
            }
            const title = path.split(/[\\/]/).filter(Boolean).pop() ?? path
            const workspace = await registry.create(path, title)
            // 同步采纳为核查项目，登记即可开始核查。
            await service.ensureCurrentProject(path)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, workspaceId: workspace?.id ?? null, path }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 笔记：人工/AI 的核查批注，可关联提交。
        if (req.method === 'GET' && routePath === '/notes') {
          const query: Record<string, unknown> = {}
          for (const [key, value] of url.searchParams.entries()) query[key] = value
          const project = await adoptProject(service, query)
          const pid = project?.id
          const notes = (service.store?.notes?.list() ?? [])
            .filter((note) => pid === undefined || note.projectId === pid)
            .sort((left, right) => right.createdAt - left.createdAt)
            .slice(0, 200)
          res.writeHead(200, { 'content-type': 'application/json' })
          res.end(JSON.stringify({ notes }))
          return
        }
        if (req.method === 'POST' && routePath === '/notes') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const project = await adoptProject(service, body)
            const title = typeof body['title'] === 'string' ? body['title'].trim() : ''
            const content = typeof body['content'] === 'string' ? body['content'].trim() : ''
            if (title === '' || content === '') {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'title and content are required' }))
              return
            }
            const note = {
              id: `note_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
              projectId: project?.id ?? 'prj_ad_hoc',
              sha: typeof body['sha'] === 'string' && body['sha'] !== '' ? body['sha'] : undefined,
              title,
              content,
              createdAt: Date.now(),
            }
            await service.store.notes.save(note)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, id: note.id }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }
        // AI 学习总结：把已有笔记 + 项目档案提炼为一份结构化学习笔记并入库（sha='summary' 标记）。
        if (req.method === 'POST' && routePath === '/notes/ai-summary') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const project = await adoptProject(service, body)
            const pid = project?.id
            const notes = (service.store.notes?.list() ?? [])
              .filter((note) => note.sha !== 'summary' && (pid === undefined || note.projectId === pid))
              .sort((left, right) => right.createdAt - left.createdAt)
              .slice(0, 60)
            const memories = (service.store?.memories?.list() ?? [])
              .filter((memory) => pid === undefined || memory.projectId === pid)
              .slice(0, 30)
              .map((memory) => `- [${memory.isHumanConfirmed ? '已确认' : memory.truthLevel}] ${memory.title}：${String(memory.content ?? '').slice(0, 120)}`)
            const bootstrap = service.store.checkpoints.list().at(-1) ?? null
            const recentChanges = (service.store.changes?.list() ?? [])
              .filter((change) => pid === undefined || change.projectId === pid)
              .slice(0, 10)
              .map((change) => `- ${change.title}（${change.status}）`)
            // 真实提交历史：总结的基底素材（即使笔记还很少，项目实际在做什么永远有据可依）。
            const cwd = project?.identity?.rootPath
            const commitLines: string[] = []
            if (cwd !== undefined) {
              const log = await service.git.runGit(['log', '-n', '12', '--date=short', '--format=- %ad %s'], cwd).catch(() => '')
              for (const line of log.split('\n')) {
                const trimmed = line.trim()
                if (trimmed !== '') commitLines.push(trimmed)
              }
            }
            const route = resolveDeploymentRoute(ctx, 'reasoning', service.liveConfig)
            let summaryText: string
            try {
              const llm = await runLlmAnalysis(ctx, {
                prompt: [
                  '你是学习助理。根据以下项目材料，产出一份结构化的学习总结笔记，供开发者复习、也给 AI 助手日后阅读。',
                  '用 Markdown 风格分节输出（用「## 」做节标题），必须包含以下节：',
                  '## 核心要点（3-6 条，每条一行：这个项目是做什么的、关键结构/模块、当前状态）',
                  '## 关键决策与理由（来自记忆/笔记/提交历史中体现的取舍；没有就写（暂无））',
                  '## 易错点与风险（值得反复提醒的；没有就写（暂无））',
                  '## 近期工作脉络（必填：按提交历史归纳最近在做什么，结合变更记录与笔记）',
                  '全部用中文；内容必须来自给定材料，不要编造；「近期提交」是最权威的工作脉络来源。',
                  '',
                  `项目：${project?.name ?? '未知'}（${project?.identity?.rootPath ?? ''}）`,
                  `技术栈：${bootstrap?.techStack.join(', ') || '未知'}`,
                  '',
                  '== 近期提交（git 历史）==',
                  ...(commitLines.length > 0 ? commitLines : ['（暂无）']),
                  '',
                  '== 已确认记忆 ==',
                  ...(memories.length > 0 ? memories : ['（暂无）']),
                  '',
                  '== 已有笔记 ==',
                  ...(notes.length > 0 ? notes.map((note) => `- ${note.title}：${(note.content ?? '').slice(0, 200)}`) : ['（暂无）']),
                  '',
                  '== 近期变更 ==',
                  ...(recentChanges.length > 0 ? recentChanges : ['（暂无）']),
                ].join('\n'),
                provider: route.provider,
                model: route.model,
                maxTokens: service.liveConfig.analysisMaxTokens,
                timeoutMs: service.liveConfig.analysisTimeoutMs,
                purpose: 'project-control-notes-summary',
              })
              summaryText = llm.text.trim()
            } catch (error: unknown) {
              const message = error instanceof Error ? error.message : String(error)
              res.writeHead(200, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ ok: false, error: `AI 总结失败：${message}（可重试）` }))
              return
            }
            const note = {
              id: `note_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
              projectId: project?.id ?? 'prj_ad_hoc',
              sha: 'summary',
              title: `📖 学习总结 · ${new Date().toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`,
              content: summaryText,
              createdAt: Date.now(),
            }
            await service.store.notes.save(note)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, id: note.id }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        if (req.method === 'POST' && routePath === '/notes/update') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const id = typeof body['id'] === 'string' ? body['id'] : ''
            const note = id === '' ? undefined : service.store.notes.get(id)
            if (note === undefined) {
              res.writeHead(404, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'note not found' }))
              return
            }
            const title = typeof body['title'] === 'string' ? body['title'].trim() : ''
            const content = typeof body['content'] === 'string' ? body['content'].trim() : ''
            if (title !== '') note.title = title
            if (content !== '') note.content = content
            await service.store.notes.save(note)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }
        if (req.method === 'POST' && routePath === '/notes/delete') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const id = typeof body['id'] === 'string' ? body['id'] : ''
            const removed = id === '' ? false : await service.store.notes.delete(id)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: removed }))
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
            const project = await adoptProject(service, body)
            const cwd = project?.identity?.rootPath
            // 记忆跟随项目 + 分支：落库时打上当前仓库分支戳。
            const branch = cwd === undefined
              ? undefined
              : await service.git.getStatus(cwd).then((status) => status.branch).catch(() => undefined)
            const memory = await service.memoryService.recordMemory({
              projectId: (project?.id ?? service.currentProject?.id ?? 'prj_ad_hoc') as never,
              type: (typeof body['memoryType'] === 'string' ? body['memoryType'] : 'project_log') as never,
              truthLevel: 'analysis',
              title,
              content,
              gitBranch: branch,
              relatedFiles: Array.isArray(body['relatedFiles']) ? body['relatedFiles'] as string[] : undefined,
            })
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, memoryId: memory.id, truthLevel: memory.truthLevel, branch: branch ?? null }))
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
