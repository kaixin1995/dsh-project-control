/**
 * Project discovery, repository identity fingerprinter, and ProjectService.
 * @module dsh-project-control/domain/project
 */

import { createProjectId, type ProjectId } from './ids.ts'
import type { ProjectRecord, RepositoryIdentity } from './models.ts'
import type { DomainRepository } from '../store/repository.ts'

export type GitCommandRunner = (args: string[], cwd: string) => Promise<string>

export class ProjectService {
  constructor(
    private readonly projectsRepo: DomainRepository<ProjectRecord, ProjectId>,
    private readonly runGit: GitCommandRunner,
  ) {}

  /**
   * Discover Git repository identity from a working directory.
   */
  async resolveRepositoryIdentity(cwd: string): Promise<RepositoryIdentity | null> {
    try {
      // 1. Get toplevel root path
      const rootPath = (await this.runGit(['rev-parse', '--show-toplevel'], cwd)).trim()
      if (!rootPath) return null

      // 2. Get common dir (handles worktrees)
      let commonDir: string | undefined
      try {
        const rawCommon = (await this.runGit(['rev-parse', '--git-common-dir'], cwd)).trim()
        if (rawCommon) commonDir = rawCommon
      } catch {
        // Older git or normal repo
      }

      // 3. Get origin URL
      let originUrl: string | undefined
      try {
        const rawOrigin = (await this.runGit(['config', '--get', 'remote.origin.url'], cwd)).trim()
        if (rawOrigin) originUrl = rawOrigin
      } catch {
        // No remote configured
      }

      // 4. Get root commit hash (first commit in repository history)
      let rootCommitHash = ''
      try {
        rootCommitHash = (await this.runGit(['rev-list', '--max-parents=0', 'HEAD'], cwd)).trim().split('\n')[0]!
      } catch {
        // Empty repo without commits
        rootCommitHash = 'empty_repository'
      }

      // 5. Get current branch
      let currentBranch: string | undefined
      try {
        const rawBranch = (await this.runGit(['branch', '--show-current'], cwd)).trim()
        if (rawBranch) currentBranch = rawBranch
      } catch {
        // Detached HEAD
      }

      return {
        rootPath,
        commonDir,
        originUrl,
        rootCommitHash,
        currentBranch,
      }
    } catch {
      return null
    }
  }

  /**
   * Ensure a project record exists for the given workspace directory.
   * Matches by rootCommitHash / originUrl if path has relocated.
   */
  async ensureProject(cwd: string, fallbackName?: string): Promise<{
    project: ProjectRecord
    isNew: boolean
    relocatedFrom?: string
  }> {
    const identity = await this.resolveRepositoryIdentity(cwd)
    const now = Date.now()

    if (!identity) {
      // Non-git folder project
      const allProjects = this.projectsRepo.list()
      const existing = allProjects.find(p => p.identity.rootPath === cwd)
      if (existing) {
        return { project: existing, isNew: false }
      }

      const newNonGitProject: ProjectRecord = {
        id: createProjectId(),
        name: fallbackName ?? cwd.split(/[/\\]/).pop() ?? 'workspace',
        identity: { rootPath: cwd, rootCommitHash: 'non_git_workspace' },
        createdAt: now,
        updatedAt: now,
      }
      await this.projectsRepo.save(newNonGitProject)
      return { project: newNonGitProject, isNew: true }
    }

    const allProjects = this.projectsRepo.list()

    // 1. Exact rootPath match
    const exactMatch = allProjects.find(p => p.identity.rootPath === identity.rootPath)
    if (exactMatch) {
      // Update branch / origin if changed
      exactMatch.identity = identity
      exactMatch.updatedAt = now
      await this.projectsRepo.save(exactMatch)
      return { project: exactMatch, isNew: false }
    }

    // 2. Relocation / Re-clone match: same rootCommitHash and non-empty
    if (identity.rootCommitHash && identity.rootCommitHash !== 'empty_repository') {
      const fingerprintMatch = allProjects.find(
        p => p.identity.rootCommitHash === identity.rootCommitHash,
      )
      if (fingerprintMatch) {
        const previousPath = fingerprintMatch.identity.rootPath
        fingerprintMatch.identity = identity
        fingerprintMatch.updatedAt = now
        await this.projectsRepo.save(fingerprintMatch)
        return {
          project: fingerprintMatch,
          isNew: false,
          relocatedFrom: previousPath,
        }
      }
    }

    // 3. Brand new project
    const newProject: ProjectRecord = {
      id: createProjectId(),
      name: fallbackName ?? identity.rootPath.split(/[/\\]/).pop() ?? 'project',
      identity,
      createdAt: now,
      updatedAt: now,
    }
    await this.projectsRepo.save(newProject)
    return { project: newProject, isNew: true }
  }
}
