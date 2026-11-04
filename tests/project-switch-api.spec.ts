import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createServer, type Server } from 'node:http'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { registerApiRoute } from '../src/plugin/api-route.ts'
import { ProjectControlService } from '../src/plugin/service.ts'
import { ProjectService } from '../src/domain/project.ts'

let temp: string
let server: Server
let base: string
let service: ProjectControlService
let rootA: string
let rootB: string
let projectA: string
let projectB: string

function initRepo(path: string, subject: string): void {
  const env = { ...process.env, GIT_AUTHOR_NAME: 'test', GIT_AUTHOR_EMAIL: 'test@example.invalid', GIT_COMMITTER_NAME: 'test', GIT_COMMITTER_EMAIL: 'test@example.invalid' }
  execFileSync('git', ['init', '-q', '-b', 'main', path], { env })
  writeFileSync(join(path, 'sample.txt'), subject)
  execFileSync('git', ['-C', path, 'add', 'sample.txt'], { env })
  execFileSync('git', ['-C', path, 'commit', '-qm', subject], { env })
}

beforeAll(async () => {
  temp = mkdtempSync(join(tmpdir(), 'pc-project-switch-'))
  rootA = join(temp, 'project-a')
  rootB = join(temp, 'project-b')
  initRepo(rootA, 'first project')
  initRepo(rootB, 'second project')
  const nested = join(rootB, 'nested')
  mkdirSync(nested)
  const sessions = new Map<string, string>([['session-a', rootA], ['session-b', rootB], ['session-nested', nested]])
  const ctx: any = {
    sessions: { get: (id: string) => sessions.has(id) ? { header: { cwd: sessions.get(id) } } : undefined },
    workspaceRegistry: { list: () => [{ path: rootB, sessionIds: ['cold-b'] }] },
    get: () => undefined,
    logger: { warn: () => {} },
    effect: () => {},
    inject(_keys: string[], callback: (ctx: any) => void) { callback(this) },
    webServer: { register(options: { handler: any }) {
      server = createServer((req, res) => { void options.handler(req, res) })
      return () => {}
    } },
  }
  service = new ProjectControlService(ctx)
  const projects = new ProjectService(service.store.projects, (args, cwd) => service.git.runGit(args, cwd))
  const a = await projects.ensureProject(rootA)
  const b = await projects.ensureProject(rootB)
  projectA = a.project.id
  projectB = b.project.id
  service.currentProject = a.project
  registerApiRoute(ctx, service)
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  const address = server.address()
  if (address === null || typeof address === 'string') throw new Error('server address unavailable')
  base = `http://127.0.0.1:${address.port}/project-control/api`
})

afterAll(async () => {
  if (server !== undefined) await new Promise<void>((resolve) => server.close(() => resolve()))
  if (temp !== undefined) rmSync(temp, { recursive: true, force: true })
})

async function get(path: string): Promise<any> {
  const response = await fetch(base + path)
  return { status: response.status, body: await response.json() }
}

describe('会话切换的项目隔离', () => {
  it('两个会话读取各自项目与提交，不受全局当前项目影响', async () => {
    const stateA = await get('/state?sessionId=session-a')
    const stateB = await get('/state?sessionId=session-b')
    expect(stateA.body.project.id).toBe(projectA)
    expect(stateB.body.project.id).toBe(projectB)
    expect((await get('/state?sessionId=session-nested')).body.project.id).toBe(projectB)
    expect(service.currentProject?.id).toBe(projectA)
    const commitsA = await get('/commits?sessionId=session-a')
    const commitsB = await get('/commits?sessionId=session-b')
    expect(commitsA.body.commits[0].subject).toBe('first project')
    expect(commitsB.body.commits[0].subject).toBe('second project')
  })

  it('项目状态和提交请求交错返回时仍各属于自己的会话', async () => {
    const responses = await Promise.all([
      get('/state?sessionId=session-b'),
      get('/commits?sessionId=session-a'),
      get('/state?sessionId=session-a'),
      get('/commits?sessionId=session-b'),
    ])
    expect(responses[0].body.project.id).toBe(projectB)
    expect(responses[1].body.commits[0].subject).toBe('first project')
    expect(responses[2].body.project.id).toBe(projectA)
    expect(responses[3].body.commits[0].subject).toBe('second project')
  })

  it('冷会话可通过工作区登记解析，未知或空会话不得回退到其他项目', async () => {
    expect((await get('/commits?sessionId=cold-b')).body.commits[0].subject).toBe('second project')
    for (const id of ['missing', '']) {
      const state = await get('/state?sessionId=' + id)
      expect(state.body.project).toBeNull()
      expect(state.body.importedChanges).toEqual([])
      const commits = await get('/commits?sessionId=' + id)
      expect(commits.status).toBe(400)
      expect(commits.body.rootPath).toBeUndefined()
    }
  })

  it('同源克隆仍存在时必须保持两个独立工作区', async () => {
    const clone = join(temp, 'project-clone')
    execFileSync('git', ['clone', '-q', rootA, clone])
    const projects = new ProjectService(service.store.projects, (args, cwd) => service.git.runGit(args, cwd))
    const cloned = await projects.ensureProject(clone)
    expect(cloned.project.id).not.toBe(projectA)
    expect(service.store.projects.get(projectA as never)?.identity.rootPath.replace(/\\/g, '/')).toContain('/project-a')
  })

  it('不能从另一个会话修改或删除笔记', async () => {
    await service.store.notes.save({ id: 'note-a', projectId: projectA, title: 'original', content: 'content', createdAt: 1 })
    const update = await fetch(base + '/notes/update', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ sessionId: 'session-b', id: 'note-a', title: 'wrong project' }) })
    const remove = await fetch(base + '/notes/delete', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ sessionId: 'session-b', id: 'note-a' }) })
    expect(update.status).toBe(404)
    expect(remove.status).toBe(404)
    expect(service.store.notes.get('note-a')?.title).toBe('original')
  })

  it('无会话的笔记和初始化请求不能写入其他项目', async () => {
    const before = service.store.notes.size
    const note = await fetch(base + '/notes', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ sessionId: '', title: 'test', content: 'test' }) })
    expect(note.status).toBe(400)
    expect(service.store.notes.size).toBe(before)
    const bootstrap = await fetch(base + '/bootstrap', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ sessionId: 'missing' }) })
    expect(bootstrap.status).toBe(400)
  })
})
