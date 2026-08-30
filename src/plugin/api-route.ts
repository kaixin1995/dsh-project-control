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
import { ProjectService } from '../domain/project.ts'
import type { ProjectControlService } from './service.ts'

export const name = 'project-control-api'
export const inject = ['webServer', 'projectControl']

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
export function apply(ctx: Context): void {
  const service = ctx.projectControl as ProjectControlService
  const webServer = ctx.webServer
  if (webServer === undefined || webServer === null) {
    throw new Error('project-control-api: ctx.webServer is not available (web profile only)')
  }

  const disposeRoute = webServer.register({
    kind: 'prefix',
    path: ROUTE_PREFIX,
    handler: async (req: IncomingMessage, res: ServerResponse) => {
      const denied = trustFence(req, res)
      if (denied !== undefined) return

      const url = new URL(req.url ?? '/', 'http://localhost')
      const routePath = url.pathname.slice(ROUTE_PREFIX.length)

      if (req.method === 'GET' && routePath === '/state') {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify(buildState(service)))
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
          res.writeHead(200, { 'content-type': 'application/json' })
          res.end(JSON.stringify({
            ok: true,
            checkpointId: checkpoint.id,
            summary: checkpoint.summary,
            techStack: checkpoint.techStack,
            symbolsCount: checkpoint.topLevelSymbols.length,
          }))
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
}
