import { describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import Storage from '@deepseek-ai/dsh-storage'
import { DomainFacility } from '@deepseek-ai/dsh-storage-domain'
import { MemoryMediaPool, MemoryStorageBackend } from '../../packages/storage/storage-domain/tests/helpers/memory-backend.ts'
import { coreDomainSpec } from '../src/store/domains.ts'
import { DomainRepository } from '../src/store/repository.ts'
import { ProjectService, type GitCommandRunner } from '../src/domain/project.ts'
import type { ProjectRecord } from '../src/domain/models.ts'

async function createProjectRepo() {
  const ctx = new Context()
  await ctx.plugin(Storage)
  const backend = new MemoryStorageBackend(new MemoryMediaPool())
  ctx.storage.backend.register('memory', backend)
  const facility = new DomainFacility(ctx, { backend: 'memory', routes: {} })
  ctx.storage.mount('domain', facility)
  const core = await facility.open(coreDomainSpec)
  return new DomainRepository<ProjectRecord>(core.table('projects'))
}

describe('ProjectService & Repository Identity (T1.5)', () => {
  it('discovers git repository identity and creates new ProjectRecord', async () => {
    const repo = await createProjectRepo()
    const gitRunner: GitCommandRunner = async (args) => {
      const cmd = args.join(' ')
      if (cmd.includes('--show-toplevel')) return 'D:/MyRepo'
      if (cmd.includes('--git-common-dir')) return 'D:/MyRepo/.git'
      if (cmd.includes('remote.origin.url')) return 'https://github.com/org/my-repo.git'
      if (cmd.includes('--max-parents=0')) return 'root_sha_123456789\n'
      if (cmd.includes('--show-current')) return 'main'
      return ''
    }

    const service = new ProjectService(repo, gitRunner)
    const result = await service.ensureProject('D:/MyRepo', 'My Project')

    expect(result.isNew).toBe(true)
    expect(result.project.name).toBe('My Project')
    expect(result.project.identity.rootCommitHash).toBe('root_sha_123456789')
    expect(result.project.identity.originUrl).toBe('https://github.com/org/my-repo.git')
    expect(result.project.identity.currentBranch).toBe('main')
  })

  it('recognizes relocated repository by root commit fingerprint', async () => {
    const repo = await createProjectRepo()
    const firstGitRunner: GitCommandRunner = async (args) => {
      const cmd = args.join(' ')
      if (cmd.includes('--show-toplevel')) return 'D:/OldPath'
      if (cmd.includes('--max-parents=0')) return 'root_sha_common'
      return ''
    }

    const service1 = new ProjectService(repo, firstGitRunner)
    const firstResult = await service1.ensureProject('D:/OldPath')
    expect(firstResult.isNew).toBe(true)
    const originalId = firstResult.project.id

    // Now repository moved to D:/NewPath, same root commit
    const movedGitRunner: GitCommandRunner = async (args) => {
      const cmd = args.join(' ')
      if (cmd.includes('--show-toplevel')) return 'D:/NewPath'
      if (cmd.includes('--max-parents=0')) return 'root_sha_common'
      return ''
    }

    const service2 = new ProjectService(repo, movedGitRunner)
    const movedResult = await service2.ensureProject('D:/NewPath')

    expect(movedResult.isNew).toBe(false)
    expect(movedResult.project.id).toBe(originalId)
    expect(movedResult.relocatedFrom).toBe('D:/OldPath')
    expect(movedResult.project.identity.rootPath).toBe('D:/NewPath')
  })

  it('handles non-git workspace gracefully', async () => {
    const repo = await createProjectRepo()
    const nonGitRunner: GitCommandRunner = async () => {
      throw new Error('Not a git repository')
    }

    const service = new ProjectService(repo, nonGitRunner)
    const result = await service.ensureProject('D:/ScratchPad')

    expect(result.isNew).toBe(true)
    expect(result.project.identity.rootPath).toBe('D:/ScratchPad')
    expect(result.project.identity.rootCommitHash).toBe('non_git_workspace')
  })
})
