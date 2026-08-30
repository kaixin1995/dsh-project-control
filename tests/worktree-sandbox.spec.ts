import { describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { LocalFileSystem } from '../../packages/fs/fs-local/src/index.ts'

describe('Worktree & Sandbox Path Containment (T0.5)', () => {
  it('validates that worktree inside project root is within sandbox workspace-write boundary', async () => {
    const tempDir = mkdtempSync(join(tmpdir(), 'dsh-worktree-test-'))

    try {
      const ctx = new Context()
      await ctx.plugin(LocalFileSystem, { cwd: tempDir })

      const rootTarget = await ctx.fs.resolve(tempDir)
      const worktreePath = join(tempDir, '.worktrees', 'run-1')
      const worktreeTarget = await ctx.fs.resolve(worktreePath)
      const worktreeFile = await ctx.fs.resolve(join(worktreePath, 'index.ts'))

      // 1. Path containment check
      expect(ctx.fs.contains(rootTarget, worktreeTarget)).toBe(true)
      expect(ctx.fs.contains(rootTarget, worktreeFile)).toBe(true)

      // 2. Out-of-tree path containment check (negative assertion)
      const outsidePath = join(tempDir, '..', 'sibling-dir', 'file.ts')
      const outsideTarget = await ctx.fs.resolve(outsidePath)
      expect(ctx.fs.contains(rootTarget, outsideTarget)).toBe(false)

      // 3. Writing into worktree file via ctx.fs
      const writeOutcome = await ctx.fs.writeText(worktreeFile, 'export const answer = 42\n')
      expect(writeOutcome.version).toBeDefined()

      // 4. Reading back via ctx.fs
      const readText = await ctx.fs.readText(worktreeFile)
      expect(readText).toBe('export const answer = 42\n')
    } finally {
      rmSync(tempDir, { recursive: true, force: true })
    }
  })
})
