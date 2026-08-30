/**
 * ProjectControlService 后台常驻服务与 Cordis 插件装配。
 * 负责打开 3 个 storage-domain，初始化各领域仓储与生命周期管理。
 *
 * @module dsh-project-control/plugin/service
 */

import z from '@deepseek-ai/schemastery'
import { coreDomainSpec, analysisDomainSpec, historyDomainSpec } from '../store/domains.ts'
import { DomainRepository, createInMemoryStore, type ProjectControlStore } from '../store/repository.ts'
import type {
  ProjectRecord,
  ChangeRecord,
  PlanRecord,
  RunRecord,
  StepRecord,
  AttemptRecord,
  EvidenceRecord,
  ReviewIssueRecord,
  VerificationRecord,
  MemoryRecord,
} from '../domain/models.ts'
import { ProjectService } from '../domain/project.ts'
import { ChangeService } from '../domain/change.ts'
import { GitAdapter } from '../git/adapter.ts'
import { EvidenceManager } from '../analysis/evidence.ts'
import { MemoryService } from '../memory/service.ts'
import { MemoryContextInjector } from '../memory/context.ts'
import { ConceptService } from '../learning/concept.ts'
import { RecoveryScanner } from '../runtime/recovery.ts'
import { RunOrchestrator } from '../runtime/orchestrator.ts'
import { resolveFullConfig, type ResolvedProjectControlConfig } from '../config.ts'

export interface ProjectControlConfig {
  enabled?: boolean
}

export class ProjectControlService {
  public store!: ProjectControlStore
  public projectService!: ProjectService
  public changeService!: ChangeService
  public git = new GitAdapter()
  public evidenceManager = new EvidenceManager()
  public currentProject?: ProjectRecord
  public orchestrator?: RunOrchestrator
  public memoryService?: MemoryService
  public conceptService?: ConceptService
  public liveConfig: ResolvedProjectControlConfig

  private coreDomainHandle: any
  private analysisDomainHandle: any
  private historyDomainHandle: any

  constructor(public readonly ctx: any, config: ProjectControlConfig = {}) {
    this.liveConfig = resolveFullConfig(config as never)
    // 默认初始化内存 Store，保证在无 storageDomain 的环境（如 headless 面或测试环境）下基础操作仍可用
    this.initStore(createInMemoryStore())
  }

  public initStore(store: ProjectControlStore): void {
    this.store = store
    this.projectService = new ProjectService(this.store.projects, (args, cwd) => this.git.runGit(args, cwd))
    this.changeService = new ChangeService(this.store.changes, this.git, this.evidenceManager)
    this.memoryService = new MemoryService(this.store.memories)
    this.memoryContextInjector ??= new MemoryContextInjector(this.memoryService)
    this.conceptService = new ConceptService(this.store.concepts)
    this.orchestrator = new RunOrchestrator({
      ctx: this.ctx,
      store: this.store,
      git: this.git,
      config: () => this.liveConfig,
      evidenceManager: this.evidenceManager,
      memoryService: this.memoryService,
      conceptService: this.conceptService,
    })
  }

  /**
   * 服务启动：开启存储域、初始化仓储并执行崩溃扫描恢复。
   * @param storageDomain - 宿主 storage-domain 设施（web/sdk 面挂载；headless
   * 无此服务时本方法不会被调用，插件以无持久化形态激活）。
   */
  async start(storageDomain: any): Promise<void> {
    if (!storageDomain) {
      return
    }

    this.coreDomainHandle = await storageDomain.open(coreDomainSpec)
    this.analysisDomainHandle = await storageDomain.open(analysisDomainSpec)
    this.historyDomainHandle = await storageDomain.open(historyDomainSpec)

    this.initStore({
      projects: new DomainRepository<ProjectRecord>(this.coreDomainHandle.table('projects')),
      changes: new DomainRepository<ChangeRecord>(this.coreDomainHandle.table('changes')),
      plans: new DomainRepository<PlanRecord>(this.coreDomainHandle.table('plans')),
      runs: new DomainRepository<RunRecord>(this.coreDomainHandle.table('runs')),
      steps: new DomainRepository<StepRecord>(this.coreDomainHandle.table('steps')),
      attempts: new DomainRepository<AttemptRecord>(this.coreDomainHandle.table('attempts')),
      checkpoints: new DomainRepository<ProjectBootstrapCheckpoint>(this.historyDomainHandle.table('checkpoints')),
      importedChanges: new DomainRepository<Record<string, unknown>>(this.historyDomainHandle.table('imported_changes')),
      historyCursor: new DomainRepository<Record<string, unknown>>(this.historyDomainHandle.table('history_cursor')),
      confirmed: new DomainRepository<Record<string, unknown>>(this.coreDomainHandle.table('confirmed')),
      evidence: new DomainRepository<EvidenceRecord>(this.analysisDomainHandle.table('evidence')),
      issues: new DomainRepository<ReviewIssueRecord>(this.historyDomainHandle.table('issues')),
      verifications: new DomainRepository<VerificationRecord>(this.historyDomainHandle.table('verifications')),
      memories: new DomainRepository<MemoryRecord>(this.historyDomainHandle.table('memories')),
      concepts: new DomainRepository<any>(this.historyDomainHandle.table('concepts')),
    })

    // 执行系统启动时的未完成任务恢复扫描
    const recoveryScanner = new RecoveryScanner(this.store)
    await recoveryScanner.scanAndRecover()
  }

  /**
   * 服务停止：安全关闭并释放 3 个存储域句柄
   */
  async stop(): Promise<void> {
    await this.coreDomainHandle?.close()
    await this.analysisDomainHandle?.close()
    await this.historyDomainHandle?.close()
  }

  /**
   * 确保当前工作目录已有 Project 记录（身份指纹识别迁移/重克隆），并记为当前项目。
   */
  async ensureCurrentProject(cwd: string): Promise<{ project: Record<string, unknown> & { id: never }; isNew: boolean }> {
    const { ProjectService } = await import('../domain/project.ts')
    const projectService = new ProjectService(this.store!.projects, (args, dir) => this.git.runGit(args, dir))
    const ensured = await projectService.ensureProject(cwd)
    this.currentProject = ensured.project as never
    return ensured as never
  }

  /**
   * 相关项目记忆的提示文本（预算内；供审查/执行上下文注入）。
   */
  memoryContextText(projectId: unknown, activeFiles: string[]): string | undefined {
    return this.memoryContextInjector?.synthesizeContext(projectId as never, activeFiles) || undefined
  }

  private memoryContextInjector?: MemoryContextInjector
}

export const name = 'project-control-service'
/** storageDomain 是面（plane）级服务：0.1.1 起 headless 不挂，改为可选动态注入 */
export const inject: string[] = []
export const Config: z<ProjectControlConfig> = z.object({
  enabled: z.boolean().default(true),
})

export function apply(ctx: any, config: ProjectControlConfig & Record<string, unknown> = {}): void {
  const service = new ProjectControlService(ctx, config)
  ctx.provide('projectControl', service)

  // storageDomain 只存在于挂载了 storage 栈的 composition（web / sdk 面）：
  // headless 下回调不触发，插件以无持久化形态激活，不产生 pending。
  ctx.inject(['storageDomain'], (scope: any) => {
    void service.start(scope.storageDomain).catch((error: unknown) => {
      scope.logger?.warn?.(`project-control: storage start failed: ${String(error)}`)
    })
  })

  ctx.on('dispose', async () => {
    await service.stop()
  })
}

