// 回归测试：runMemorySync 是从 /memory/sync 路由处理器抽出的共用核心，
// 早退路径不得再引用路由响应对象——历史遗留的 res.* 会抛 ReferenceError
// 被外层 catch 吞掉，把「基线以来无新提交」的良性结论误报为同步失败。
import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import { runMemorySync } from '../src/plugin/api-route.ts'
import { safeStorageId } from '../src/store/repository.ts'
import { GitAdapter } from '../src/git/adapter.ts'
import type { ProjectRecord } from '../src/domain/models.ts'
import type { ProjectControlService } from '../src/plugin/service.ts'

describe('runMemorySync 共用核心（早退路径）', () => {
  let repo: string
  const git = new GitAdapter()

  beforeEach(() => {
    repo = mkdtempSync(join(tmpdir(), 'pc-sync-'))
    const env = { ...process.env, GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@x', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@x' }
    execSync('git init -q -b main', { cwd: repo, env })
    writeFileSync(join(repo, 'a.txt'), 'a\n')
    execSync('git add .', { cwd: repo, env })
    execSync('git commit -qm init', { cwd: repo, env })
  })

  afterEach(() => {
    rmSync(repo, { recursive: true, force: true })
  })

  it('基线已等于 HEAD（无新提交）→ 返回良性结论而非 ReferenceError 失败', async () => {
    const headSha = await git.getHeadSha(repo)
    const service = {
      git,
      memoryService: {},
      store: {
        memoryBaselines: {
          get: (id: string) => id === safeStorageId('p1|main')
            ? { id, projectId: 'p1', branch: 'main', lastSyncedSha: headSha, updatedAt: Date.now() }
            : undefined,
        },
      },
    } as unknown as ProjectControlService
    const project = {
      id: 'p1',
      name: 't',
      identity: { rootPath: repo, rootCommitHash: 'x' },
      createdAt: 0,
      updatedAt: 0,
    } as ProjectRecord

    const outcome = await runMemorySync({} as never, service, project)

    expect(outcome['ok']).toBe(true)
    expect(outcome['behindCount']).toBe(0)
    expect(String(outcome['verdict'])).toContain('无需同步')
  })
})
