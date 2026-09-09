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
import { generatePlanSteps } from '../runtime/plan-gen.ts'
import { runLlmAnalysis } from '../analysis/llm-analyzer.ts'
import { addConfirmedItem, removeConfirmedItem } from './confirmed.ts'
import type { ConfirmedItemRecord } from './confirmed.ts'
import { ReviewIssueManager } from '../verification/issues.ts'
import { DeterministicBuildVerifier, UnitTestVerifier, EvidenceDiffVerifier, LlmReviewVerifier } from '../verification/verifier.ts'
import { VerificationRunner } from '../verification/service.ts'
import type { IssueSeverity, ProjectRecord } from '../domain/models.ts'
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
 * 1. 请求显式携带 rootPath（与 /bootstrap 一致的直连方式，测试与脚本用）；
 * 2. 请求携带 sessionId 时反查会话工作目录并 ensureProject（多项目/换工作区场景，页面按钮的主路径）；
 * 3. 已采纳项目；
 * 4. 回落最后一个已持久化项目（重启后首次调用）。
 */
async function adoptProject(service: ProjectControlService, body: Record<string, unknown> = {}): Promise<ProjectRecord | undefined> {
  // 显式 rootPath 优先（与 /bootstrap 一致的调用方直连方式），其次会话工作目录。
  const explicitRoot = typeof body['rootPath'] === 'string' && body['rootPath'] !== '' ? body['rootPath'] : undefined
  const cwd = explicitRoot ?? sessionCwdOf(service, body)
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

/**
 * LLM 评审严重度（critical/high/medium/low/info）→ 领域枚举（blocker/critical/major/minor/info）。
 * 保持严重度序不变：仅 critical 映射为可阻塞级（hasBlockingIssues 只认 blocker/critical）。
 * 旧版落库的历史记录未做该映射，读取边界统一归一。
 */
const ISSUE_SEVERITY_MAP: Record<string, IssueSeverity> = {
  critical: 'critical',
  high: 'major',
  medium: 'minor',
  low: 'minor',
  info: 'info',
}

/** 严重度归一（未知值回落 minor）：GET /issues 读取边界使用，兼容历史记录。 */
function normalizeSeverity(severity: string): IssueSeverity {
  return ISSUE_SEVERITY_MAP[severity] ?? 'minor'
}

/** 解析请求体里的标签字段：接受逗号分隔字符串或字符串数组；无有效标签返回 undefined。 */
function parseTags(raw: unknown): string[] | undefined {
  const list = typeof raw === 'string' ? raw.split(/[,，]/) : Array.isArray(raw) ? raw : []
  const tags = list.filter((tag): tag is string => typeof tag === 'string')
    .map((tag) => tag.trim()).filter((tag) => tag !== '')
  return tags.length > 0 ? Array.from(new Set(tags)) : undefined
}

/** 评审问题清单条目（/review 解析结果与缓存载荷共用）。 */
interface ReviewIssueEntry {
  severity: string
  category: string
  title: string
  evidence: string
  fix: string
}

/**
 * 确定性扫描补丁的变更符号与全仓库调用点（复检修复证据用，规则与 /impact-scope 一致）。
 */
async function scanFixImpact(
  service: ProjectControlService,
  cwd: string,
  patch: string,
  changedFiles: string[],
): Promise<Array<{ symbol: string; definedIn: string; callers: Array<{ file: string; line: string; snippet: string }> }>> {
  const NOISE = /\.(md|txt|json|ya?ml|xml|html?|css|scss|lock|csproj|sln|props|targets)$/i
  const result: Array<{ symbol: string; definedIn: string; callers: Array<{ file: string; line: string; snippet: string }> }> = []
  for (const symbol of extractChangedSymbols(patch)) {
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
      const definedIn = changedFiles.find((file) => file.includes(symbol)) ?? changedFiles[0] ?? ''
      result.push({ symbol, definedIn, callers })
    }
    if (result.length >= 10) break
  }
  return result
}

/**
 * 从完整补丁中截取指定文件的差异段（修复证据归因展示用）。
 * 无匹配文件时返回空串，由调用方回落到整段补丁。
 */
function slicePatchByFiles(patch: string, files: string[], maxChars: number): string {
  if (files.length === 0) return ''
  const sections = patch.split(/^(?=diff --git )/m).filter((section) => section.trim() !== '')
  const wanted = sections.filter((section) => {
    const match = section.match(/^diff --git a\/(\S+) b\/(\S+)/)
    const path = normalizePath(match?.[2] ?? '')
    return path !== '' && files.some((file) => path === file || path.endsWith('/' + file) || file.endsWith('/' + path))
  })
  return wanted.join('').slice(0, maxChars)
}

/**
 * 评审核心（页面 /review 路由与例行任务调度共用）：
 * 对指定目标（提交 sha / 工作区）执行 LLM 评审并落库，含两层缓存与补写。
 */
export async function executeReviewForTarget(
  ctx: Context,
  service: ProjectControlService,
  cwd: string,
  project: { id: string },
  target: string,
  force = false,
  changeId?: string,
): Promise<{ issuesFound: number; issues: string; verdict: string; issueList: ReviewIssueEntry[]; cached: boolean; generatedAt?: number; failed?: boolean }> {
  if (service.store === undefined) {
    return { issuesFound: 0, issues: '', verdict: 'service not started', issueList: [], cached: false, failed: true }
  }
  const reviewSha = target !== 'working' ? target : undefined
  const diff = reviewSha !== undefined
    ? await service.git.getDiff(cwd, { from: `${reviewSha}^`, to: reviewSha, maxBytes: 200 * 1024 })
    : await service.git.getDiff(cwd)
  if (diff.filesChanged === 0) {
    return { issuesFound: 0, issues: reviewSha !== undefined ? '该提交无差异内容。' : '工作区无改动，无可评审内容。', verdict: '', issueList: [], cached: false }
  }
  const reviewRoute = resolveDeploymentRoute(ctx, 'reasoning', service.liveConfig)
  const reviewStoreKey = `rv:${cwd}|${reviewSha ?? 'working'}|${diff.diffHash}|v${PROMPT_VERSION}|${reviewRoute.provider}/${reviewRoute.model}`
  // 评审问题落库目标：请求带有效 changeId 时挂靠该变更，否则按评审对象（提交 sha / 工作区）建合成目标。
  const boundChange = changeId !== undefined && changeId !== ''
    ? service.store.changes.get(changeId as never)
    : undefined
  const issueTarget = boundChange !== undefined ? boundChange.id : `review:${reviewSha ?? 'worktree'}`
  if (!force) {
    const storeHit = cacheRead(service, reviewStoreKey)
    if (storeHit !== undefined) {
      const cachedList = (storeHit.payload['issueList'] ?? []) as ReviewIssueEntry[]
      // 缓存命中也保证落库：该目标尚无记录时补写一次（后续命中不再重复写）。
      if (cachedList.length > 0
        && service.store.issues.list((issue) => issue.changeId === issueTarget).length === 0) {
        await persistReviewIssues(service, project.id, issueTarget, cachedList)
      }
      return {
        issuesFound: Number(storeHit.payload['issuesFound'] ?? 0),
        issues: String(storeHit.payload['issues'] ?? ''),
        verdict: String(storeHit.payload['verdict'] ?? ''),
        issueList: cachedList,
        cached: true,
        generatedAt: storeHit.createdAt,
      }
    }
  }
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
      provider: reviewRoute.provider,
      model: reviewRoute.model,
      maxTokens: service.liveConfig.analysisMaxTokens,
      timeoutMs: service.liveConfig.analysisTimeoutMs,
      purpose: 'project-control-review',
    })
  } catch (error: unknown) {
    // 评审失败不 500：降级为可见的失败结论，页面保持可用并可重试。
    const message = error instanceof Error ? error.message : String(error)
    return { issuesFound: 0, issues: '', verdict: `评审失败：${message}（点「重新生成」可重试）`, issueList: [], cached: false, failed: true }
  }
  const verdictMatch = analysis.text.match(/OPTIMALITY[:：]\s*([\s\S]*)/)
  const verdict = verdictMatch?.[1]?.trim() ?? ''
  const lines = analysis.text.slice(0, verdictMatch?.index ?? analysis.text.length)
    .split('\n').map((line) => line.trim()).filter((line) => line.length > 0 && line !== 'CLEAN')
  const issueList: ReviewIssueEntry[] = lines.map((line) => {
    const parts = line.split('|').map((part) => part.trim())
    return {
      severity: parts[0] ?? 'medium',
      category: parts[1] ?? '',
      title: parts[2] ?? line,
      evidence: parts[3] ?? '',
      fix: parts[4] ?? '',
    }
  })
  await persistReviewIssues(service, project.id, issueTarget, issueList)
  const generatedAt = Date.now()
  cacheWrite(service, reviewStoreKey, 'review', { issuesFound: lines.length, issues: analysis.text, verdict, issueList })
  return { issuesFound: lines.length, issues: analysis.text, verdict, issueList, cached: false, generatedAt }
}

/**
 * 增量 AI 学习总结核心（页面 /notes/ai-summary 路由与例行任务调度共用）：
 * 上次总结 + 自上次以来的新素材 → 「本次更新」差异节 + 合并完整版；旧总结替换不堆积。
 */
export async function runIncrementalAiSummary(
  ctx: Context,
  service: ProjectControlService,
  project: { id: string; name?: string; identity?: { rootPath?: string } },
): Promise<{ ok: true; id: string; updated: boolean } | { ok: false; error: string }> {
  if (service.store === undefined) {
    return { ok: false, error: 'service not started' }
  }
  const pid = project.id
  const allNotes = (service.store.notes?.list() ?? [])
    .filter((note) => note.projectId === pid)
  // 上一次总结（sha='summary' 的最新一条）：本次做增量对比的基线。
  const previousSummaries = allNotes
    .filter((note) => note.sha === 'summary')
    .sort((left, right) => right.createdAt - left.createdAt)
  const previous = previousSummaries[0] ?? null
  const sinceMs = previous?.createdAt
  const notes = allNotes
    .filter((note) => note.sha !== 'summary')
    .filter((note) => sinceMs === undefined || note.createdAt > sinceMs)
    .sort((left, right) => right.createdAt - left.createdAt)
    .slice(0, 30)
  const memories = (service.store?.memories?.list() ?? [])
    .filter((memory) => memory.projectId === pid)
    .filter((memory) => sinceMs === undefined || memory.createdAt > sinceMs)
    .slice(0, 20)
    .map((memory) => `- [${memory.isHumanConfirmed ? '已确认' : memory.truthLevel}] ${memory.title}：${String(memory.content ?? '').slice(0, 120)}`)
  const bootstrap = service.store.checkpoints.list().at(-1) ?? null
  const recentChanges = (service.store.changes?.list() ?? [])
    .filter((change) => change.projectId === pid)
    .filter((change) => sinceMs === undefined || change.updatedAt > sinceMs)
    .slice(0, 10)
    .map((change) => `- ${change.title}（${change.status}）`)
  const reviewIssues = (service.store?.issues.list() ?? [])
    .filter((issue) => issue.projectId === pid)
    .filter((issue) => sinceMs === undefined || issue.createdAt > sinceMs)
    .slice(0, 10)
    .map((issue) => `- [${issue.severity}] ${issue.title}`)
  // 真实提交历史：总结的基底素材；有基线时只取上次总结以来的新提交。
  const cwd = project.identity?.rootPath
  const commitLines: string[] = []
  if (cwd !== undefined) {
    const logArgs = ['log', '--date=short', '--format=- %ad %s']
    if (sinceMs === undefined) logArgs.push('-n', '12')
    else { logArgs.push('-n', '40', `--since=${new Date(sinceMs).toISOString()}`) }
    const log = await service.git.runGit(logArgs, cwd).catch(() => '')
    for (const line of log.split('\n')) {
      const trimmed = line.trim()
      if (trimmed !== '') commitLines.push(trimmed)
    }
  }
  const route = resolveDeploymentRoute(ctx, 'reasoning', service.liveConfig)
  const sinceLabel = sinceMs === undefined ? ''
    : new Date(sinceMs).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  let summaryText: string
  try {
    const llm = await runLlmAnalysis(ctx, {
      prompt: previous === null
        ? [
          '你是学习助理。根据以下项目材料，产出一份结构化的学习总结笔记，供开发者复习、也给 AI 助手日后阅读。',
          '用 Markdown 风格分节输出（用「## 」做节标题），必须包含以下节：',
          '## 核心要点（3-6 条，每条一行：这个项目是做什么的、关键结构/模块、当前状态）',
          '## 关键决策与理由（来自记忆/笔记/提交历史中体现的取舍；没有就写（暂无））',
          '## 易错点与风险（值得反复提醒的；没有就写（暂无））',
          '## 近期工作脉络（必填：按提交历史归纳最近在做什么，结合变更记录与笔记）',
          '全部用中文；内容必须来自给定材料，不要编造；「近期提交」是最权威的工作脉络来源。',
          '',
          `项目：${project.name ?? '未知'}（${project.identity?.rootPath ?? ''}）`,
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
        ].join('\n')
        : [
          '你是学习助理。下面有「上一次的学习总结」和「自上次总结以来的新增材料」。请产出更新版总结。',
          '要求：',
          '1. 第一节必须是「## 本次更新」：3-6 条列出相对上次的新增与变化（新提交做了什么、新笔记、新记忆、新评审问题）；若新增材料无实质内容，如实写明「自上次总结以来无新增素材」，不要硬凑。',
          '2. 之后输出完整总结正文（不是差异补丁，而是合并后的完整可独立阅读版本）：保留上次总结中仍然有效的内容，吸收新增材料，合并重复项，删除已被新提交取代的过时项。',
          '必须包含节：## 本次更新 / ## 核心要点 / ## 关键决策与理由 / ## 易错点与风险 / ## 近期工作脉络',
          '全部用中文；内容必须来自给定材料，不要编造。',
          '',
          `项目：${project.name ?? '未知'}（${project.identity?.rootPath ?? ''}）`,
          `技术栈：${bootstrap?.techStack.join(', ') || '未知'}`,
          `上次总结时间：${sinceLabel}`,
          '',
          '== 上一次的学习总结 ==',
          (previous.content ?? '').slice(0, 4000),
          '',
          `== 自上次总结以来的新增提交（${sinceLabel} 起）==`,
          ...(commitLines.length > 0 ? commitLines : ['（暂无）']),
          '',
          '== 新增记忆 ==',
          ...(memories.length > 0 ? memories : ['（暂无）']),
          '',
          '== 新增笔记 ==',
          ...(notes.length > 0 ? notes.map((note) => `- ${note.title}：${(note.content ?? '').slice(0, 200)}`) : ['（暂无）']),
          '',
          '== 新增/更新的变更 ==',
          ...(recentChanges.length > 0 ? recentChanges : ['（暂无）']),
          '',
          '== 新增评审问题 ==',
          ...(reviewIssues.length > 0 ? reviewIssues : ['（暂无）']),
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
    return { ok: false, error: `AI 总结失败：${message}（可重试）` }
  }
  const now = Date.now()
  const note = {
    id: `note_${now.toString(36)}${Math.random().toString(36).slice(2, 8)}`,
    projectId: pid,
    sha: 'summary',
    title: `📖 学习总结 · ${new Date().toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}${previous === null ? '' : '（增量更新）'}`,
    content: summaryText,
    createdAt: now,
    updatedAt: now,
  }
  // 总结是一份「活文档」：保存新版前移除本项目的旧总结，避免重复雷同的总结堆积。
  for (const stale of previousSummaries) {
    if (stale.id !== note.id) await service.store.notes.delete(stale.id)
  }
  await service.store.notes.save(note)
  return { ok: true, id: note.id, updated: previous !== null }
}

/**
 * 数据生命周期：清理超期的已解决评审问题（resolved/accepted，按 updatedAt 计龄）。
 * resolvedIssueRetentionDays=0 表示永久保留。读取问题列表前执行，页面所见即清理后状态。
 */
export async function purgeResolvedIssues(service: ProjectControlService): Promise<void> {
  const retentionDays = service.liveConfig.resolvedIssueRetentionDays ?? 7
  if (retentionDays <= 0) return
  const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000
  for (const issue of service.store.issues.list()) {
    if ((issue.status === 'resolved' || issue.status === 'accepted') && issue.updatedAt < cutoff) {
      await service.store.issues.delete(issue.id)
    }
  }
}

/**
 * 把评审结果落到 issues 表（「Review 问题」板块数据源）：
 * 同一评审目标先清旧记录再写入，重新评审替换而非堆积。
 */
async function persistReviewIssues(
  service: ProjectControlService,
  projectId: string,
  issueTarget: string,
  issueList: ReviewIssueEntry[],
): Promise<void> {
  for (const stale of service.store.issues.list((issue) => issue.changeId === issueTarget)) {
    await service.store.issues.delete(stale.id)
  }
  const issuesManager = new ReviewIssueManager(service.store.issues)
  for (const entry of issueList) {
    await issuesManager.createIssue({
      projectId: projectId as never,
      changeId: issueTarget as never,
      severity: ISSUE_SEVERITY_MAP[entry.severity] ?? 'minor',
      category: entry.category,
      title: entry.title,
      description: `证据：${entry.evidence}${entry.fix === '' ? '' : `；建议：${entry.fix}`}`,
    })
  }
}

/** 工作台所需的完整状态快照（来自 storage-domain 真实数据）。 */
function buildState(service: ProjectControlService, projectOverride?: ProjectRecord): Record<string, unknown> {
  const store = service.store
  if (store === undefined) {
    return { ready: false, reason: 'service not started' }
  }
  const projects = store.projects.list()
  const project = projectOverride ?? service.currentProject ?? projects.at(-1) ?? null
  // 工作台是项目级视图：所有业务列表按当前项目过滤，跨项目数据不串显。
  const pid = project?.id
  const inProject = <T extends { projectId: string }>(records: T[]): T[] =>
    pid === undefined ? [] : records.filter((record) => record.projectId === pid)
  const changes = inProject(store.changes.list())
  const runs = inProject(store.runs.list())
  const attempts = inProject(store.attempts.list())
  const memories = inProject(store.memories.list())
  const evidence = inProject(store.evidence.list())
  const checkpoint = inProject(store.checkpoints.list()).at(-1) ?? null
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
    resolvedIssueRetentionDays: service.liveConfig.resolvedIssueRetentionDays ?? 7,
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
      status: change.status,
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
    importedChanges: (store.importedChanges?.list() ?? [])
      .filter((item) => pid === undefined || (item as { projectId?: string }).projectId === pid)
      .slice(-100).map((item) => {
        const record = item as { id: string; title: string; commitShas: string[]; firstCommitAt: number; lastCommitAt: number; confidence: number; status: string }
        return {
          id: record.id,
          title: record.title,
          commitCount: record.commitShas.length,
          firstCommitAt: record.firstCommitAt,
          lastCommitAt: record.lastCommitAt,
          confidence: record.confidence,
          status: record.status,
        }
      }),
    issues: inProject(store.issues.list()).slice(-50).map((issue) => ({
      id: issue.id,
      changeId: issue.changeId,
      severity: issue.severity,
      category: issue.category ?? '',
      title: issue.title,
      status: issue.status,
    })),
    verifications: inProject(store.verifications.list()).slice(-50).map((verification) => ({
      id: verification.id,
      changeId: verification.changeId,
      name: verification.name,
      type: verification.type,
      status: verification.status,
      createdAt: verification.evaluatedAt,
    })),
    confirmed: inProject((store.confirmed?.list() ?? []) as unknown as ConfirmedItemRecord[])
      .filter((item) => item.status === 'active')
      .map((item) => ({
        id: item.id,
        type: item.type,
        text: item.text,
        forbiddenPaths: item.forbiddenPaths ?? [],
      })),
    concepts: inProject(store.concepts?.list() ?? []).slice(-50).map((concept) => ({
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
      snippet: trimSnippet(item.snippet ?? ''),
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
    const webServer = (scope as unknown as { webServer?: { register(options: Record<string, unknown>): () => void } }).webServer
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
            // 视图按会话归属项目解析：请求带 sessionId/rootPath 时与已注册项目按根目录
            // 匹配（纯内存查询，不跑 git 不建项目），多会话并行互不串显。
            const query: Record<string, unknown> = {}
            for (const [key, value] of url.searchParams.entries()) query[key] = value
            const requestedRoot = sessionCwdOf(service, query)
              ?? (typeof query['rootPath'] === 'string' && query['rootPath'] !== '' ? query['rootPath'] : undefined)
            let override: ProjectRecord | undefined
            if (requestedRoot !== undefined && service.store !== undefined) {
              const normalized = normalizePath(requestedRoot)
              override = service.store.projects.list().find(
                (candidate) => normalizePath(candidate.identity.rootPath) === normalized,
              )
              if (override !== undefined) service.currentProject = override
            }
            const body = JSON.stringify(buildState(service, override))
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(body)
          } catch (error: unknown) {
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
              ? await scanHistory(service.git, rootPath, ensured.project.id, service.store.importedChanges, { maxCommits, ...(summaries === undefined ? {} : { summaries }), fromCommit: cursor.lastCommit })
              : await scanHistory(service.git, rootPath, ensured.project.id, service.store.importedChanges, { maxCommits, ...(summaries === undefined ? {} : { summaries }) })
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
            // 约束归属当前会话项目：无项目时明确报错，而不是错标到 prj_ad_hoc。
            const project = await adoptProject(service, body)
            if (project === undefined) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'no project initialized; open a project workspace first' }))
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
              projectId: (service.currentProject?.id ?? 'prj_ad_hoc') as never,
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
            const target = typeof body['sha'] === 'string' && body['sha'] !== '' && body['sha'] !== 'working' ? body['sha'] : 'working'
            const outcome = await executeReviewForTarget(
              ctx, service, cwd, project, target,
              body['force'] === true,
              typeof body['changeId'] === 'string' ? body['changeId'] : undefined,
            )
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify(outcome))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

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
              graph.addEdge({ source: reference.filePath, target: filePath, type: 'references', evidenceId: undefined as never })
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
            interface CommitDraft { sha: string; shortHash: string; author: string; date: number; subject: string; files: Array<{ path: string; adds: number; dels: number }> }
            const commits: CommitDraft[] = []
            let current: CommitDraft | undefined
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
                  graph.addEdge({ source: importer, target, type: 'references', evidenceId: undefined as never })
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
              for (const fi of (functionImpact as unknown as Array<{ symbol: string } & Record<string, unknown>>)) {
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
            const bootstrap = service.store.checkpoints.list().at(-1)
            const stackHint = bootstrap != null ? `仓库技术栈：${bootstrap.techStack.join(', ') || '未知'}` : ''
            const steps = await generatePlanSteps(ctx, service, title, description, stackHint)
            const plan = await service.orchestrator.createPlan(change, `${title} · 计划`, steps)
            // 默认停在计划确认（页面展示编排、可调整模型/策略后 launch）；
            // autoStart=true（调度器/兼容路径）跳过确认直接执行。
            if (body['autoStart'] === true) {
              const runId = await service.orchestrator.startRun(undefined, change)
              res.writeHead(200, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ ok: true, runId, changeId: change.id, steps: steps.length, autoStarted: true }))
              return
            }
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, changeId: change.id, planId: plan.id, steps: plan.steps.map((step) => ({ id: step.id, title: step.title, description: step.description, targetFiles: step.targetFiles ?? [], role: step.role ?? 'coding', acceptance: step.acceptance ?? '', failurePolicy: step.failurePolicy ?? 'retry-escalate', enabled: step.enabled !== false })) }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 计划确认页保存编辑：新版本计划（角色/模型/验收/策略/启停），旧版本永不覆盖。
        if (req.method === 'POST' && routePath === '/runs/plan/update') {
          if (service.store === undefined || service.orchestrator === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const changeId = typeof body['changeId'] === 'string' ? body['changeId'] : ''
            const change = changeId === '' ? undefined : service.store.changes.get(changeId as never)
            if (change === undefined) {
              res.writeHead(404, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'change not found' }))
              return
            }
            const rawSteps = Array.isArray(body['steps']) ? body['steps'] : []
            const steps = rawSteps
              .filter((entry: unknown): entry is Record<string, unknown> => typeof entry === 'object' && entry !== null && typeof (entry as Record<string, unknown>)['title'] === 'string' && (entry as Record<string, unknown>)['title'] !== '')
              .map((entry: Record<string, unknown>) => ({
                title: String(entry['title']),
                description: typeof entry['description'] === 'string' ? entry['description'] : '',
                targetFiles: Array.isArray(entry['targetFiles']) ? entry['targetFiles'].filter((file): file is string => typeof file === 'string') : undefined,
                ...(entry['role'] !== undefined && ['analysis', 'planning', 'coding', 'ops', 'verification'].includes(String(entry['role'])) ? { role: entry['role'] as never } : {}),
                ...(typeof entry['acceptance'] === 'string' && entry['acceptance'] !== '' ? { acceptance: entry['acceptance'] as string } : {}),
                ...(entry['failurePolicy'] !== undefined && ['retry-escalate', 'retry-fallback', 'skip', 'ask'].includes(String(entry['failurePolicy'])) ? { failurePolicy: entry['failurePolicy'] as never } : {}),
                enabled: entry['enabled'] !== false,
                ...(typeof entry['modelProvider'] === 'string' && entry['modelProvider'] !== '' && typeof entry['modelId'] === 'string' && entry['modelId'] !== ''
                  ? { modelOverride: { provider: String(entry['modelProvider']), model: String(entry['modelId']) } }
                  : {}),
              }))
            if (steps.length === 0) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'steps must be a non-empty array' }))
              return
            }
            const plan = await service.orchestrator.createPlan(change, `${change.title} · 计划`, steps)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, planId: plan.id, steps: plan.steps.length }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 确认后启动执行。
        if (req.method === 'POST' && routePath === '/runs/launch') {
          if (service.store === undefined || service.orchestrator === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const changeId = typeof body['changeId'] === 'string' ? body['changeId'] : ''
            const change = changeId === '' ? undefined : service.store.changes.get(changeId as never)
            if (change === undefined) {
              res.writeHead(404, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'change not found' }))
              return
            }
            const runId = await service.orchestrator.startRun(undefined, change)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, runId }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // Run 详情：步骤时间线（角色/模型/尝试/状态）+ 任务工作记忆摘要。
        if (req.method === 'GET' && routePath === '/runs/detail') {
          const query: Record<string, unknown> = {}
          for (const [key, value] of url.searchParams.entries()) query[key] = value
          const id = typeof query['id'] === 'string' ? query['id'] : ''
          const run = id === '' ? undefined : service.store?.runs.get(id as never)
          if (run === undefined) {
            res.writeHead(404, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'run not found' }))
            return
          }
          const change = service.store?.changes.get(run.changeId)
          const plan = change?.currentPlanId === undefined ? undefined : service.store?.plans.get(change.currentPlanId)
          const stepByPlanId = new Map((plan?.steps ?? []).map((definition) => [definition.id, definition]))
          const costTracker = new CostTracker()
          const steps = (service.store?.steps.list((step) => step.runId === run.id) ?? [])
            .sort((left, right) => left.createdAt - right.createdAt)
            .map((step) => {
              const definition = stepByPlanId.get(step.planStepId)
              const attempts = (service.store?.attempts.list((attempt) => attempt.stepId === step.id) ?? [])
              let costUsd = 0
              for (const attempt of attempts) {
                if (attempt.tokenUsage === undefined) continue
                costUsd += costTracker.calculateCost(attempt.model ?? 'deepseek-chat', {
                  input: attempt.tokenUsage.input,
                  output: attempt.tokenUsage.output,
                  total: attempt.tokenUsage.total,
                }).costUsd
              }
              const lastAttempt = attempts.at(-1)
              return {
                id: step.id,
                title: definition?.title ?? step.planStepId,
                role: definition?.role ?? 'coding',
                model: lastAttempt?.model ?? null,
                status: step.status,
                attemptsCount: step.attemptsCount,
                claimedOutcome: step.claimedOutcome ?? null,
                verified: step.verifiedOutcome === true,
                costUsd: Number(costUsd.toFixed(4)),
              }
            })
          const runContext = service.store?.runContexts.get(run.id)
          res.writeHead(200, { 'content-type': 'application/json' })
          res.end(JSON.stringify({
            run: {
              id: run.id,
              changeId: run.changeId,
              changeTitle: change?.title ?? run.changeId,
              status: run.status,
              pausePoint: run.pausePoint ?? null,
              error: run.error ?? null,
              startedAt: run.startedAt ?? null,
              finishedAt: run.finishedAt ?? null,
            },
            steps,
            context: runContext === undefined ? null : {
              projectDigest: runContext.projectDigest,
              branch: runContext.branch ?? null,
              headSha: runContext.headSha ?? null,
              injectedMemories: runContext.injectedMemories,
              stepSummaries: runContext.stepSummaries,
              decisionLog: runContext.decisionLog,
            },
          }))
          return
        }

        // 恢复暂停/中断/失败的 Run：continue=重试暂停点；skip-current=跳过继续。
        if (req.method === 'POST' && routePath === '/runs/resume') {
          if (service.store === undefined || service.orchestrator === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const runId = typeof body['runId'] === 'string' ? body['runId'] : ''
            const action = body['action'] === 'skip-current' ? 'skip-current' : 'continue'
            if (runId === '') {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'runId is required' }))
              return
            }
            await service.orchestrator.resumeRun(runId as never, action as never)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, action }))
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
        // ── Review 问题板块（独立页签数据源）：全量、按严重度排序；读取前清理超期已解决项。 ──
        if (req.method === 'GET' && routePath === '/issues') {
          if (service.store !== undefined) await purgeResolvedIssues(service).catch(() => undefined)
          const query: Record<string, unknown> = {}
          for (const [key, value] of url.searchParams.entries()) query[key] = value
          const project = await adoptProject(service, query)
          const pid = project?.id
          const severityWeight: Record<string, number> = { blocker: 0, critical: 1, major: 2, minor: 3, info: 4 }
          const issues = (service.store?.issues.list() ?? [])
            .filter((issue) => pid === undefined || issue.projectId === pid)
            .sort((left, right) =>
              (severityWeight[left.severity] ?? 9) - (severityWeight[right.severity] ?? 9)
              || right.createdAt - left.createdAt)
            .map((issue) => ({
              id: issue.id,
              changeId: issue.changeId,
              severity: normalizeSeverity(issue.severity),
              category: issue.category ?? '',
              title: issue.title,
              description: issue.description ?? '',
              status: issue.status,
              resolution: issue.resolution ?? '',
              fixStats: issue.fixStats ?? null,
              fixFiles: issue.fixFiles ?? [],
              fixImpact: issue.fixImpact ?? [],
              fixDiff: issue.fixDiff ?? '',
              createdAt: issue.createdAt,
              updatedAt: issue.updatedAt,
            }))
          res.writeHead(200, { 'content-type': 'application/json' })
          res.end(JSON.stringify({ issues }))
          return
        }
        if (req.method === 'POST' && routePath === '/issues/status') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const id = typeof body['id'] === 'string' ? body['id'] : ''
            const status = typeof body['status'] === 'string' ? body['status'] : ''
            const allowed = ['open', 'fixing', 'resolved', 'accepted', 'rejected']
            if (id === '' || !allowed.includes(status)) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'id and a valid status are required' }))
              return
            }
            const manager = new ReviewIssueManager(service.store.issues)
            await manager.updateStatus(id as never, status as never)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }
        // 问题复检：对一组未解决问题重跑检测（修复确认 + 最优性/最小侵入 + 新问题扫描）。
        // 只有复检判定 FIXED 才置 resolved；人工不直接标记解决状态。
        if (req.method === 'POST' && routePath === '/issues/verify') {
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
            const target = typeof body['target'] === 'string' && body['target'] !== '' ? body['target'] : ''
            if (target === '') {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'target is required' }))
              return
            }
            const openIssues = service.store.issues.list(
              (issue) => issue.projectId === project.id && issue.changeId === target
                && (issue.status === 'open' || issue.status === 'fixing'),
            ).sort((left, right) => left.createdAt - right.createdAt)
            // 评审基线：提交评审取该提交，工作区/变更评审取 HEAD（未提交改动）。
            const baseSha = target.startsWith('review:') && target !== 'review:worktree' ? target.slice('review:'.length) : undefined
            const diff = baseSha !== undefined
              ? await service.git.getDiff(cwd, { from: baseSha, maxBytes: 200 * 1024 })
              : await service.git.getDiff(cwd)
            const targetLabel = target.startsWith('review:') && target !== 'review:worktree'
              ? `提交 ${target.slice('review:'.length, 'review:'.length + 8)}` : '工作区'
            if (diff.filesChanged === 0) {
              res.writeHead(200, { 'content-type': 'application/json' })
              res.end(JSON.stringify({
                ok: true,
                target,
                resolved: [],
                stillOpen: openIssues.map((issue) => ({ title: issue.title, reason: '评审基线以来代码无改动，问题不可能已修复' })),
                newIssues: [],
                verdict: `复检对象（${targetLabel}）自评审基线以来无任何代码改动。`,
              }))
              return
            }
            const route = resolveDeploymentRoute(ctx, 'reasoning', service.liveConfig)
            let analysis: { text: string }
            try {
              analysis = await runLlmAnalysis(ctx, {
                prompt: [
                  '你是代码评审复检员。下面是「此前评审发现且尚未解决的问题清单」和「当前代码相对评审基线的完整差异」。',
                  '任务一（修复确认）：逐条判断每个问题在当前代码中是否已修复，每行输出：',
                  'FIXED | 问题序号 | 一句话依据（引用差异中的具体变化） | 修复涉及文件: 相对路径1, 相对路径2（修复该问题涉及的文件，无法归因则此列留空）',
                  '或 NOT_FIXED | 问题序号 | 一句话说明当前代码为何仍存在该问题',
                  '任务二（新问题扫描）：对当前差异做一次完整复审——正确性、错误处理、并发、资源泄漏、安全、侵入式是否最小、实现是否最优；每个新问题一行：',
                  'NEW | SEVERITY | category | title | evidence location | suggested fix',
                  '（SEVERITY 为 critical/high/medium/low/info；无新问题则只输出：NEW | CLEAN）',
                  '任务三：最后一行输出 OPTIMALITY: <中文 1-3 句：当前改动是否最优实现、是否最小侵入；若有更优方案请指出>',
                  '判定只能依据给定材料，不要编造。除 FIXED/NOT_FIXED/NEW/SEVERITY 关键字外全部用中文。',
                  '',
                  `== 待复检问题清单（对象：${targetLabel}）==`,
                  ...(openIssues.length > 0
                    ? openIssues.map((issue, index) => `#${index + 1} [${issue.severity}] ${issue.title}\n   ${issue.description}`)
                    : ['（无未解决问题，仅做新问题扫描）']),
                  '',
                  '== 当前代码相对评审基线的差异 ==',
                  diff.patch,
                ].join('\n'),
                provider: route.provider,
                model: route.model,
                maxTokens: service.liveConfig.analysisMaxTokens,
                timeoutMs: service.liveConfig.analysisTimeoutMs,
                purpose: 'project-control-issue-verify',
              })
            } catch (error: unknown) {
              // 复检失败不 500：返回可见的失败结论，可重试。
              const message = error instanceof Error ? error.message : String(error)
              res.writeHead(200, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ ok: false, error: `复检失败：${message}（可重试）` }))
              return
            }
            const verdict = analysis.text.match(/OPTIMALITY[:：]\s*([\s\S]*)/)?.[1]?.trim() ?? ''
            const verifyLines = analysis.text.slice(0, analysis.text.match(/OPTIMALITY[:：]\s*/)?.index ?? analysis.text.length)
            const now = Date.now()
            const resolved: string[] = []
            const stillOpen: Array<{ title: string; reason: string }> = []
            const existingTitles = new Set(openIssues.map((issue) => issue.title.trim().toLowerCase()))
            const newIssues: Array<{ severity: string; title: string }> = []
            const issuesManager = new ReviewIssueManager(service.store.issues)
            // 第一阶段：解析判定（问题序号 → FIXED/NOT_FIXED + 归因文件）与新问题。
            const verdicts = new Map<number, { fixed: boolean; reason: string; files: string[] }>()
            for (const rawLine of verifyLines.split('\n')) {
              const line = rawLine.trim()
              if (line.startsWith('FIXED |') || line.startsWith('NOT_FIXED |')) {
                const parts = line.split('|').map((part) => part.trim())
                const index = Number.parseInt((parts[1] ?? '').replace('#', ''), 10)
                if (!Number.isInteger(index) || index < 1 || index > openIssues.length) continue
                const files = (parts[3] ?? '').replace(/^修复涉及文件[:：]?/i, '')
                  .split(/[,，]/).map((file) => normalizePath(file)).filter((file) => file !== '')
                verdicts.set(index, {
                  fixed: line.startsWith('FIXED |'),
                  reason: parts[2] || '复检未给出依据',
                  files,
                })
              } else if (line.startsWith('NEW |') && !line.startsWith('NEW | CLEAN')) {
                const parts = line.split('|').map((part) => part.trim())
                if (parts.length < 4) continue
                const title = parts[3] ?? ''
                if (title === '' || existingTitles.has(title.toLowerCase())) continue
                existingTitles.add(title.toLowerCase())
                await issuesManager.createIssue({
                  projectId: project.id as never,
                  changeId: target as never,
                  severity: ISSUE_SEVERITY_MAP[parts[1] ?? ''] ?? 'minor',
                  category: parts[2] ?? '',
                  title,
                  description: `证据：${parts[4] ?? ''}${(parts[5] ?? '') === '' ? '' : `；建议：${parts[5]}`}`,
                })
                newIssues.push({ severity: parts[1] ?? '', title })
              }
            }
            // 第二阶段：有判 FIXED 的问题时快照修复证据（基线以来的文件/统计/符号调用点/归因差异）。
            const hasFixed = [...verdicts.values()].some((entry) => entry.fixed)
            let fixChangedFiles: string[] = []
            let fixImpact: Array<{ symbol: string; definedIn: string; callers: Array<{ file: string; line: string; snippet: string }> }> = []
            if (hasFixed) {
              const numstat = await service.git.runGit(
                ['diff', '--no-color', '--numstat', ...(baseSha !== undefined ? [baseSha] : [])],
                cwd,
              ).catch(() => '')
              fixChangedFiles = parseNumstat(numstat).map((file) => normalizePath(file.path))
              fixImpact = await scanFixImpact(service, cwd, diff.patch, fixChangedFiles)
            }
            for (const [index, entry] of verdicts) {
              const issue = openIssues[index - 1]!
              if (entry.fixed) {
                issue.status = 'resolved'
                issue.resolution = `复检通过（${new Date(now).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}）：${entry.reason.slice(0, 300)}`
                if (hasFixed) {
                  issue.fixStats = { files: fixChangedFiles.length, insertions: diff.insertions, deletions: diff.deletions }
                  issue.fixFiles = entry.files.length > 0 ? entry.files : fixChangedFiles
                  issue.fixImpact = fixImpact
                  issue.fixDiff = slicePatchByFiles(diff.patch, entry.files, 16_000) || diff.patch.slice(0, 16_000)
                }
                issue.updatedAt = now
                await service.store.issues.save(issue)
                resolved.push(issue.title)
              } else {
                issue.description = `${issue.description}\n[复检 ${new Date(now).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}] 仍未修复：${entry.reason.slice(0, 200)}`
                issue.updatedAt = now
                await service.store.issues.save(issue)
                stillOpen.push({ title: issue.title, reason: entry.reason })
              }
            }
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, target, resolved, stillOpen, newIssues, verdict }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }
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
            const now = Date.now()
            const note = {
              id: `note_${now.toString(36)}${Math.random().toString(36).slice(2, 8)}`,
              projectId: project?.id ?? 'prj_ad_hoc',
              title,
              content,
              tags: parseTags(body['tags']),
              pinned: body['pinned'] === true,
              createdAt: now,
              updatedAt: now,
            }
            if (typeof body['sha'] === 'string' && body['sha'] !== '') note.sha = body['sha']
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
            if (project === undefined) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'no project initialized' }))
              return
            }
            const outcome = await runIncrementalAiSummary(ctx, service, project)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify(outcome))
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
            if (body['tags'] !== undefined) { const t = parseTags(body['tags']); if (t !== undefined) note.tags = t }
            if (body['pinned'] !== undefined) note.pinned = body['pinned'] === true
            note.updatedAt = Date.now()
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
            const memoryParams = {
              projectId: (project?.id ?? service.currentProject?.id ?? 'prj_ad_hoc') as never,
              type: (typeof body['memoryType'] === 'string' ? body['memoryType'] : 'project_log') as never,
              truthLevel: 'inferred' as never,
              title,
              content,
              relatedFiles: Array.isArray(body['relatedFiles']) ? body['relatedFiles'] as string[] : undefined,
              scope: body['scope'] === 'branch' ? 'branch' : 'project',
              sourceTag: (['run', 'review', 'sync', 'chat', 'manual'].includes(String(body['sourceTag']))
                ? body['sourceTag'] : 'manual') as never,
            }
            if (branch !== undefined) memoryParams.gitBranch = branch
            if (typeof body['basisSha'] === 'string' && body['basisSha'] !== '') memoryParams.basisSha = body['basisSha']
            const memory = await service.memoryService.recordMemory(memoryParams)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, memoryId: memory.id, truthLevel: memory.truthLevel, branch: branch ?? null }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // ── 记忆面板数据源：全量字段 + 同步基线 + 分支清单。 ──────────────
        if (req.method === 'GET' && routePath === '/memories') {
          const query: Record<string, unknown> = {}
          for (const [key, value] of url.searchParams.entries()) query[key] = value
          const project = await adoptProject(service, query)
          const pid = project?.id
          const cwd = project?.identity?.rootPath
          const branch = cwd === undefined
            ? undefined
            : await service.git.getStatus(cwd).then((status) => status.branch).catch(() => undefined)
          const all = (service.store?.memories.list() ?? [])
            .filter((memory) => pid === undefined || memory.projectId === pid)
            .sort((left, right) => right.updatedAt - left.updatedAt)
          const memories = all.map((memory) => ({
            id: memory.id,
            type: memory.type,
            title: memory.title,
            content: memory.content,
            relatedFiles: memory.relatedFiles ?? [],
            isHumanConfirmed: memory.isHumanConfirmed,
            gitBranch: memory.gitBranch ?? null,
            scope: memory.scope ?? 'project',
            sourceTag: memory.sourceTag ?? 'manual',
            basisSha: memory.basisSha ?? null,
            status: memory.status ?? 'active',
            lastVerifiedSha: memory.lastVerifiedSha ?? null,
            createdAt: memory.createdAt,
            updatedAt: memory.updatedAt,
          }))
          const baseline = branch === undefined || pid === undefined
            ? null
            : (service.store?.memoryBaselines.get(`${pid}|${branch}`) ?? null)
          const headSha = cwd === undefined ? null : await service.git.getHeadSha(cwd).catch(() => undefined) ?? null
          const behindCount = baseline?.lastSyncedSha !== undefined && headSha !== null && baseline.lastSyncedSha !== headSha
            ? await service.git.runGit(['rev-list', '--count', `${baseline.lastSyncedSha}..HEAD`], cwd).then((out) => Number(out.trim())).catch(() => 0)
            : 0
          res.writeHead(200, { 'content-type': 'application/json' })
          res.end(JSON.stringify({
            memories,
            branch: branch ?? null,
            headSha,
            baseline: baseline === null ? null : { sha: baseline.lastSyncedSha ?? null, updatedAt: baseline.updatedAt },
            behindCount,
          }))
          return
        }

        // 拉取同步：基线..HEAD 的提交与 diff 对照记忆清单做三向判定（失效/新增/续命）。
        if (req.method === 'POST' && routePath === '/memory/sync') {
          if (service.store === undefined || service.memoryService === undefined) {
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
            const pid = project.id as string
            const status = await service.git.getStatus(cwd)
            const branch = status.branch ?? 'HEAD'
            const headSha = status.headSha
            const baselineId = `${pid}|${branch}`
            const baseline = service.store.memoryBaselines.get(baselineId)
            const baseSha = baseline?.lastSyncedSha
            const log = baseSha === undefined
              ? await service.git.runGit(['log', '-n', '20', '--date=short', '--format=- %ad %h %s'], cwd).catch(() => '')
              : await service.git.runGit(['log', `${baseSha}..HEAD`, '--date=short', '--format=- %ad %h %s'], cwd).catch(() => '')
            const commitLines = log.split('\n').map((line) => line.trim()).filter((line) => line !== '')
            const diff = baseSha === undefined
              ? await service.git.getDiff(cwd, { maxBytes: 120 * 1024 })
              : await service.git.getDiff(cwd, { from: baseSha, maxBytes: 120 * 1024 })
            if (headSha === undefined || commitLines.length === 0) {
              res.writeHead(200, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ ok: true, behindCount: 0, staleProposals: [], renewed: 0, newCandidates: [], verdict: '基线以来无新提交，无需同步。' }))
              return
            }
            const activeMemories = service.store.memories.list(
              (memory) => memory.projectId === pid && (memory.status ?? 'active') === 'active',
            )
            const route = resolveDeploymentRoute(ctx, 'standard', service.liveConfig)
            let analysis: { text: string }
            try {
              analysis = await runLlmAnalysis(ctx, {
                prompt: [
                  '你是项目记忆同步员。以下是「当前生效的项目记忆清单」和「自上次同步以来的代码变更」。做三向判定：',
                  '1. 对每条可能失效的记忆输出一行：STALE | 记忆ID | 一句话依据（哪个文件/哪部分被改动使其疑似过时）',
                  '2. 对改动引入的值得长期记住的新知识输出一行：NEW | type | 标题 | 内容（1-3 句；type 为 architecture_decision/pattern_rule/risk_hotspot）',
                  '3. 其余记忆无需输出（视为仍然有效）。',
                  '判定只能依据给定材料；没有把握判失效就不要输出 STALE。除关键字外全部用中文。',
                  '',
                  '== 当前生效记忆 ==',
                  ...(activeMemories.length > 0
                    ? activeMemories.map((memory) => `ID=${memory.id} [${memory.type}] ${memory.title}：${String(memory.content).slice(0, 160)}${(memory.relatedFiles ?? []).length > 0 ? `（关联：${memory.relatedFiles.join(',')}）` : ''}`)
                    : ['（无）']),
                  '',
                  '== 自上次同步以来的提交 ==',
                  ...commitLines,
                  '',
                  '== 变更差异（节选）==',
                  diff.patch.slice(0, 60_000),
                ].join('\n'),
                provider: route.provider,
                model: route.model,
                maxTokens: service.liveConfig.analysisMaxTokens,
                timeoutMs: service.liveConfig.analysisTimeoutMs,
                purpose: 'project-control-memory-sync',
              })
            } catch (error: unknown) {
              const message = error instanceof Error ? error.message : String(error)
              res.writeHead(200, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ ok: false, error: `同步判定失败：${message}（可重试）` }))
              return
            }
            const staleProposals: Array<{ id: string; title: string; reason: string }> = []
            const newCandidates: Array<{ type: string; title: string; content: string }> = []
            for (const rawLine of analysis.text.split('\n')) {
              const line = rawLine.trim()
              if (line.startsWith('STALE |')) {
                const parts = line.split('|').map((part) => part.trim())
                const id = parts[1] ?? ''
                if (activeMemories.some((memory) => memory.id === id)) {
                  staleProposals.push({ id, title: activeMemories.find((memory) => memory.id === id)!.title, reason: parts.slice(2).join('：') || '相关代码被改动' })
                }
              } else if (line.startsWith('NEW |')) {
                const parts = line.split('|').map((part) => part.trim())
                if (parts.length >= 4 && parts[2] !== '') {
                  newCandidates.push({ type: parts[1] ?? 'project_log', title: parts[2]!, content: parts.slice(3).join('：') })
                }
              }
            }
            // 自动续命：未被判定失效的记忆刷新验证基线（fact 级判定，无需人工确认）。
            const renewedIds = activeMemories.filter((memory) => !staleProposals.some((proposal) => proposal.id === memory.id)).map((memory) => memory.id as never)
            const renewed = await service.memoryService.renewBaseline(renewedIds, headSha)
            for (const candidate of newCandidates.slice(0, 5)) {
              await service.memoryService.recordMemory({
                projectId: pid as never,
                type: (['architecture_decision', 'pattern_rule', 'risk_hotspot'].includes(candidate.type) ? candidate.type : 'project_log') as never,
                truthLevel: 'inferred' as never,
                title: candidate.title,
                content: candidate.content,
                sourceTag: 'sync',
                basisSha: headSha,
                gitBranch: branch,
                tags: ['sync'],
              })
            }
            const now = Date.now()
            await service.store.memoryBaselines.save({ id: baselineId, projectId: pid as never, branch, lastSyncedSha: headSha, updatedAt: now } as never)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({
              ok: true,
              behindCount: commitLines.length,
              staleProposals,
              renewed,
              newCandidates: newCandidates.slice(0, 5),
              verdict: `同步完成：${commitLines.length} 个新提交；${staleProposals.length} 条疑似过期待复核；新增 ${Math.min(newCandidates.length, 5)} 条候选；${renewed} 条自动续命。`,
            }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 同步报告的后续动作：把确认的疑似过时项落为 stale / 归档。
        if (req.method === 'POST' && routePath === '/memory/sync/apply') {
          if (service.memoryService === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'memory service unavailable' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const action = body['action'] === 'archive' ? 'archive' : 'mark-stale'
            const ids = Array.isArray(body['ids']) ? body['ids'].filter((id): id is string => typeof id === 'string') : []
            for (const id of ids) {
              await service.memoryService.updateStatus(id as never, action === 'archive' ? 'archived' : 'stale')
            }
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, applied: ids.length, action }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // 记忆状态管理（归档/恢复生效）与分支归一。
        if (req.method === 'POST' && routePath === '/memory/status') {
          if (service.memoryService === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'memory service unavailable' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const id = typeof body['id'] === 'string' ? body['id'] : ''
            const status = typeof body['status'] === 'string' ? body['status'] : ''
            if (id === '' || !['active', 'stale', 'superseded', 'archived'].includes(status)) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'id and a valid status are required' }))
              return
            }
            await service.memoryService.updateStatus(id as never, status as never)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }
        if (req.method === 'POST' && routePath === '/memory/normalize') {
          if (service.memoryService === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'memory service unavailable' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const id = typeof body['id'] === 'string' ? body['id'] : ''
            if (id === '') {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'id is required' }))
              return
            }
            await service.memoryService.normalizeToProject(id as never)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }

        // ── 例行任务 CRUD 与立即执行 ─────────────────────────────────────
        if (req.method === 'GET' && routePath === '/scheduled') {
          const query: Record<string, unknown> = {}
          for (const [key, value] of url.searchParams.entries()) query[key] = value
          const project = await adoptProject(service, query)
          const pid = project?.id
          const tasks = (service.store?.scheduledTasks.list() ?? [])
            .filter((task) => pid === undefined || task.projectId === pid)
            .sort((left, right) => left.createdAt - right.createdAt)
            .map((task) => ({
              id: task.id,
              name: task.name,
              type: task.type,
              title: task.title ?? '',
              description: task.description ?? '',
              intervalMinutes: task.intervalMinutes,
              enabled: task.enabled,
              lastRunAt: task.lastRunAt ?? null,
              lastResult: task.lastResult ?? '',
              nextDueAt: (task.lastRunAt ?? task.createdAt) + task.intervalMinutes * 60_000,
            }))
          res.writeHead(200, { 'content-type': 'application/json' })
          res.end(JSON.stringify({ tasks }))
          return
        }
        if (req.method === 'POST' && routePath === '/scheduled') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const project = await adoptProject(service, body)
            if (project === undefined) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'no project initialized' }))
              return
            }
            const name = typeof body['name'] === 'string' ? body['name'].trim() : ''
            const type = typeof body['type'] === 'string' && ['run', 'review', 'summary'].includes(body['type']) ? body['type'] : ''
            const intervalMinutes = Number(body['intervalMinutes'])
            if (name === '' || type === '' || !Number.isFinite(intervalMinutes) || intervalMinutes < 1 || intervalMinutes > 43200) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'name, type(run|review|summary), intervalMinutes(1-43200) are required' }))
              return
            }
            const now = Date.now()
            const task = {
              id: `sch_${now.toString(36)}${Math.random().toString(36).slice(2, 8)}`,
              projectId: project.id,
              name,
              type,
              title: typeof body['title'] === 'string' ? body['title'] : undefined,
              description: typeof body['description'] === 'string' ? body['description'] : undefined,
              intervalMinutes: Math.floor(intervalMinutes),
              enabled: true,
              createdAt: now,
              updatedAt: now,
            }
            await service.store.scheduledTasks.save(task as never)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, id: task.id }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }
        if (req.method === 'POST' && routePath === '/scheduled/update') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const id = typeof body['id'] === 'string' ? body['id'] : ''
            const task = id === '' ? undefined : service.store.scheduledTasks.get(id)
            if (task === undefined) {
              res.writeHead(404, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'task not found' }))
              return
            }
            if (body['enabled'] !== undefined) task.enabled = body['enabled'] === true
            if (typeof body['intervalMinutes'] === 'number' && Number.isFinite(body['intervalMinutes'])) {
              task.intervalMinutes = Math.max(1, Math.floor(body['intervalMinutes']))
            }
            task.updatedAt = Date.now()
            await service.store.scheduledTasks.save(task)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }
        if (req.method === 'POST' && routePath === '/scheduled/delete') {
          if (service.store === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const id = typeof body['id'] === 'string' ? body['id'] : ''
            const removed = id === '' ? false : await service.store.scheduledTasks.delete(id)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: removed }))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }
        if (req.method === 'POST' && routePath === '/scheduled/run') {
          if (service.store === undefined || service.scheduler === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const id = typeof body['id'] === 'string' ? body['id'] : ''
            const task = id === '' ? undefined : service.store.scheduledTasks.get(id)
            if (task === undefined) {
              res.writeHead(404, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'task not found' }))
              return
            }
            const result = await service.scheduler.executeTask(task)
            task.lastRunAt = Date.now()
            task.lastResult = String(result).slice(0, 300)
            task.updatedAt = Date.now()
            await service.store.scheduledTasks.save(task)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ ok: true, result }))
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
