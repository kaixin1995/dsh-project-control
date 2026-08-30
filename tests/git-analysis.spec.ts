import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import { Context } from '@deepseek-ai/cordis'
import Storage from '@deepseek-ai/dsh-storage'
import { DomainFacility } from '@deepseek-ai/dsh-storage-domain'
import { MemoryMediaPool, MemoryStorageBackend } from '../../packages/storage/storage-domain/tests/helpers/memory-backend.ts'
import { coreDomainSpec } from '../src/store/domains.ts'
import { DomainRepository } from '../src/store/repository.ts'
import { GitAdapter } from '../src/git/adapter.ts'
import { WorkspaceSnapshotManager } from '../src/git/snapshot.ts'
import { EvidenceManager } from '../src/analysis/evidence.ts'
import { ChangeService } from '../src/domain/change.ts'
import { createProjectId } from '../src/domain/ids.ts'
import type { ChangeRecord } from '../src/domain/models.ts'

describe('Git Change Analysis & Evidence (T2.1 - T2.5)', () => {
  let tempDir: string
  const git = new GitAdapter()
  const evidenceManager = new EvidenceManager()

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'dsh-git-test-'))
    execSync('git init -b main', { cwd: tempDir })
    execSync('git config user.name "Test Runner"', { cwd: tempDir })
    execSync('git config user.email "test@example.com"', { cwd: tempDir })
    execSync('git config commit.gpgsign false', { cwd: tempDir })

    // Create initial commit
    writeFileSync(join(tempDir, 'README.md'), '# Initial Repo\n', 'utf8')
    execSync('git add README.md && git commit -m "initial commit"', { cwd: tempDir })
  })

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true })
  })

  it('T2.1: parses status, diff, and logs accurately', async () => {
    // 1. Initial clean status
    const initialStatus = await git.getStatus(tempDir)
    expect(initialStatus.isClean).toBe(true)
    expect(initialStatus.branch).toBe('main')
    expect(initialStatus.headSha).toBeDefined()

    // 2. Modify, add untracked, delete
    writeFileSync(join(tempDir, 'README.md'), '# Modified Repo\nLine 2\n', 'utf8')
    writeFileSync(join(tempDir, 'new-file.txt'), 'Hello world\n', 'utf8')

    const dirtyStatus = await git.getStatus(tempDir)
    expect(dirtyStatus.isClean).toBe(false)
    expect(dirtyStatus.entries.length).toBe(2)

    // 3. Diff verification
    const diff = await git.getDiff(tempDir)
    expect(diff.filesChanged).toBeGreaterThanOrEqual(1)
    expect(diff.insertions).toBeGreaterThanOrEqual(1)
    expect(diff.patch.includes('Modified Repo')).toBe(true)

    // 4. Log verification
    execSync('git add . && git commit -m "second commit"', { cwd: tempDir })
    const logs = await git.getLog(tempDir, { maxCount: 2 })
    expect(logs.length).toBe(2)
    expect(logs[0]!.message).toBe('second commit')
  })

  it('T2.2: detects workspace divergence between snapshots', async () => {
    const snapshotManager = new WorkspaceSnapshotManager(git)

    // Baseline snapshot
    const baseline = await snapshotManager.capture(tempDir)
    expect(baseline.isClean).toBe(true)

    // Verify same state has zero divergence
    const current = await snapshotManager.capture(tempDir)
    const check1 = snapshotManager.compare(baseline, current)
    expect(check1.diverged).toBe(false)

    // External modification
    writeFileSync(join(tempDir, 'external.txt'), 'External change\n', 'utf8')
    const divergedSnapshot = await snapshotManager.capture(tempDir)
    const check2 = snapshotManager.compare(baseline, divergedSnapshot)

    expect(check2.diverged).toBe(true)
    expect(check2.statusChanged).toBe(true)
    expect(check2.reasons.length).toBeGreaterThan(0)
  })

  it('T2.3 & T2.5: ChangeService tracks baseRevision and analyzes full scope', async () => {
    const ctx = new Context()
    await ctx.plugin(Storage)
    const backend = new MemoryStorageBackend(new MemoryMediaPool())
    ctx.storage.backend.register('memory', backend)
    const facility = new DomainFacility(ctx, { backend: 'memory', routes: {} })
    ctx.storage.mount('domain', facility)
    const core = await facility.open(coreDomainSpec)
    const changesRepo = new DomainRepository<ChangeRecord>(core.table('changes'))

    const changeService = new ChangeService(changesRepo, git, evidenceManager)
    const projectId = createProjectId()

    // 1. Create Change (pins baseRevision)
    const change = await changeService.createChange(projectId, 'Feature 1', 'Add new features', tempDir)
    expect(change.status).toBe('draft')
    expect(change.baseRevision).toBeDefined()

    // 2. Perform two intermediate commits
    writeFileSync(join(tempDir, 'feature.ts'), 'export const f = 1\n', 'utf8')
    execSync('git add feature.ts && git commit -m "add feature.ts"', { cwd: tempDir })

    writeFileSync(join(tempDir, 'feature2.ts'), 'export const f2 = 2\n', 'utf8')
    execSync('git add feature2.ts && git commit -m "add feature2.ts"', { cwd: tempDir })

    // Plus uncommitted dirty file
    writeFileSync(join(tempDir, 'wip.txt'), 'work in progress\n', 'utf8')

    // 3. Analyze Change
    const analysis = await changeService.analyzeChange(change.id, tempDir)
    expect(analysis.commits.length).toBe(2)
    expect(analysis.commits[0]!.message).toBe('add feature2.ts')
    expect(analysis.commits[1]!.message).toBe('add feature.ts')
    expect(analysis.filesChanged).toBeGreaterThanOrEqual(2)
    expect(analysis.evidenceId.startsWith('evi_')).toBe(true)

    // 4. Update status transition
    const updated = await changeService.updateStatus(change.id, 'ready')
    expect(updated.status).toBe('ready')
    expect(updated.revision).toBe(2)

    await core.close()
  })

  it('T2.4: EvidenceManager handles inline and spilled artifact storage', () => {
    const projectId = createProjectId()

    // 1. Inline small evidence
    const smallContent = 'const x = 1;\nconst y = 2;\n'
    const smallEvidence = evidenceManager.createEvidence({
      projectId,
      source: 'git_diff',
      truthLevel: 'fact',
      locator: 'git:diff:HEAD',
      content: smallContent,
    })

    expect(smallEvidence.snippet).toBe(smallContent)
    expect(smallEvidence.fullArtifactPath).toBeUndefined()

    // 2. Large spilled evidence (> 50 KB)
    const largeContent = 'a'.repeat(60 * 1024)
    const artifactDir = join(tempDir, '.artifacts')
    const largeEvidence = evidenceManager.createEvidence({
      projectId,
      source: 'git_diff',
      truthLevel: 'fact',
      locator: 'git:diff:large',
      content: largeContent,
      artifactStorageDir: artifactDir,
    })

    expect(largeEvidence.fullArtifactPath).toBeDefined()
    expect(largeEvidence.snippet?.includes('omitted')).toBe(true)
  })
})
