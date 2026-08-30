/**
 * 项目发现、仓库身份指纹识别与 ProjectService 服务。
 * 依据 Git 仓库的初始根提交（Root Commit Hash）与远程 Origin URL 识别项目唯一身份，支持重定位与重新克隆匹配。
 *
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
   * 从工作区目录解析 Git 仓库身份信息。
   */
  async resolveRepositoryIdentity(cwd: string): Promise<RepositoryIdentity | null> {
    try {
      // 1. 获取工作区根目录绝对路径
      const rootPath = (await this.runGit(['rev-parse', '--show-toplevel'], cwd)).trim()
      if (!rootPath) return null

      // 2. 获取 Git common dir（处理 worktree 场景）
      let commonDir: string | undefined
      try {
        const rawCommon = (await this.runGit(['rev-parse', '--git-common-dir'], cwd)).trim()
        if (rawCommon) commonDir = rawCommon
      } catch {
        // 较早版本 git 或常规仓库
      }

      // 3. 获取远程 origin url
      let originUrl: string | undefined
      try {
        const rawOrigin = (await this.runGit(['config', '--get', 'remote.origin.url'], cwd)).trim()
        if (rawOrigin) originUrl = rawOrigin
      } catch {
        // 未配置远程仓库
      }

      // 4. 获取仓库历史的最初始根提交 Hash（Initial Root Commit SHA）
      let rootCommitHash = ''
      try {
        rootCommitHash = (await this.runGit(['rev-list', '--max-parents=0', 'HEAD'], cwd)).trim().split('\n')[0]!
      } catch {
        // 空仓库尚无提交
        rootCommitHash = 'empty_repository'
      }

      // 5. 获取当前所在分支
      let currentBranch: string | undefined
      try {
        const rawBranch = (await this.runGit(['branch', '--show-current'], cwd)).trim()
        if (rawBranch) currentBranch = rawBranch
      } catch {
        // Detached HEAD 状态
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
   * 确保当前工作区拥有 ProjectRecord 实体记录。
   * 支持通过 rootCommitHash 指纹识别重定位（Relocation）或路径迁移。
   */
  async ensureProject(cwd: string, fallbackName?: string): Promise<{
    project: ProjectRecord
    isNew: boolean
    relocatedFrom?: string
  }> {
    const identity = await this.resolveRepositoryIdentity(cwd)
    const now = Date.now()

    if (!identity) {
      // 非 Git 目录兜底处理
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

    // 1. 路径完全匹配
    const exactMatch = allProjects.find(p => p.identity.rootPath === identity.rootPath)
    if (exactMatch) {
      exactMatch.identity = identity
      exactMatch.updatedAt = now
      await this.projectsRepo.save(exactMatch)
      return { project: exactMatch, isNew: false }
    }

    // 2. 指纹匹配：检测同源迁移或重新克隆（相同 rootCommitHash 且非空）
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

    // 3. 全新项目登记
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
