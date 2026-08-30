import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import { Context } from '@deepseek-ai/cordis'
import Storage from '@deepseek-ai/dsh-storage'
import { DomainFacility } from '@deepseek-ai/dsh-storage-domain'
import { MemoryMediaPool, MemoryStorageBackend } from '../../packages/storage/storage-domain/tests/helpers/memory-backend.ts'
import { historyDomainSpec } from '../src/store/domains.ts'
import { DomainRepository } from '../src/store/repository.ts'
import { GitAdapter } from '../src/git/adapter.ts'
import { GenericLanguageAnalyzer } from '../src/analysis/language.ts'
import { BootstrapPipeline, type ProjectBootstrapCheckpoint } from '../src/bootstrap/pipeline.ts'
import { createProjectId } from '../src/domain/ids.ts'

describe('Legacy Bootstrap Pipeline (T8.1 - T8.3)', () => {
  let tempRepo: string
  const git = new GitAdapter()
  const analyzer = new GenericLanguageAnalyzer()

  beforeEach(() => {
    tempRepo = mkdtempSync(join(tmpdir(), 'dsh-bootstrap-test-'))
    execSync('git init -b main', { cwd: tempRepo })
    execSync('git config user.name "Bootstrap Runner"', { cwd: tempRepo })
    execSync('git config user.email "bootstrap@example.com"', { cwd: tempRepo })
    execSync('git config commit.gpgsign false', { cwd: tempRepo })

    // Create package.json & tsconfig.json
    writeFileSync(join(tempRepo, 'package.json'), JSON.stringify({ name: 'sample-project', version: '1.0.0' }), 'utf8')
    writeFileSync(join(tempRepo, 'tsconfig.json'), JSON.stringify({ compilerOptions: {} }), 'utf8')

    // Create source files with exports
    writeFileSync(
      join(tempRepo, 'service.ts'),
      'export interface AppConfig { port: number; }\nexport class ServerApp {\n  public start() {}\n}\n',
      'utf8',
    )

    execSync('git add . && git commit -m "feat: initial project structure"', { cwd: tempRepo })
  })

  afterEach(() => {
    rmSync(tempRepo, { recursive: true, force: true })
  })

  it('runs 4-stage bootstrap pipeline and saves checkpoint to history repository', async () => {
    const ctx = new Context()
    await ctx.plugin(Storage)
    const backend = new MemoryStorageBackend(new MemoryMediaPool())
    ctx.storage.backend.register('memory', backend)
    const facility = new DomainFacility(ctx, { backend: 'memory', routes: {} })
    ctx.storage.mount('domain', facility)

    const history = await facility.open(historyDomainSpec)
    const checkpointsRepo = new DomainRepository<ProjectBootstrapCheckpoint>(history.table('checkpoints'))

    const pipeline = new BootstrapPipeline(git, analyzer, checkpointsRepo)
    const projectId = createProjectId()

    const checkpoint = await pipeline.runBootstrap(projectId, tempRepo)

    expect(checkpoint.id.startsWith('chk_')).toBe(true)
    expect(checkpoint.techStack).toContain('TypeScript')
    expect(checkpoint.manifestFiles).toContain('package.json')
    expect(checkpoint.manifestFiles).toContain('tsconfig.json')
    expect(checkpoint.topLevelSymbols.some(s => s.name === 'AppConfig' && s.kind === 'interface')).toBe(true)
    expect(checkpoint.topLevelSymbols.some(s => s.name === 'ServerApp' && s.kind === 'class')).toBe(true)
    expect(checkpoint.recentCommitSummaries.length).toBeGreaterThanOrEqual(1)

    // Verify stored in checkpoints table
    const stored = checkpointsRepo.get(checkpoint.id)
    expect(stored).toEqual(checkpoint)

    await history.close()
  })
})
