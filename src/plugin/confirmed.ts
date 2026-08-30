/**
 * 已确定事项（ConfirmedItem，V1.0 §17/§30/§31）：
 * 存储于核心域 confirmed 表；只有人工确认才能写入。
 * 冲突拦截：监听 tools/pre-execute，AI 试图写「已确定禁改文件」时拒绝（单调，不可被后续监听翻案）。
 *
 * @module dsh-project-control/plugin/confirmed
 */

import type { Context } from '@deepseek-ai/cordis'
import { generateUlid } from '../domain/ulid.ts'
import type { ProjectControlService } from './service.ts'

/** 一条已确定事项。 */
export interface ConfirmedItemRecord {
  id: string
  projectId: string
  type: 'requirement' | 'constraint' | 'decision' | 'non-goal'
  text: string
  /** 禁改路径前缀（constraint 专用；AI 写这些路径会被 pre-execute 拒绝）。 */
  forbiddenPaths: string[]
  status: 'active' | 'removed'
  createdAt: number
}

export const CONFIRMED_ID_PREFIX = 'cfm_'

/** 规范化禁改路径（统一正斜杠、去尾斜杠）。 */
function normalizePath(path: string): string {
  return path.replaceAll('\\', '/').replace(/\/+$/, '')
}

/**
 * 注册冲突拦截监听（在插件入口调用；存储未启动时安全跳过）。
 * 拦截规则：AI 调 write/edit/str_replace_editor 且 file_path 命中任一 active 约束的
 * forbiddenPaths 前缀 → deny（写明命中的已确定事项）。
 */
export function registerConflictGuard(ctx: Context, service: ProjectControlService): void {
  ctx.on('tools/pre-execute', async (exec, next) => {
    if (!['write', 'edit', 'str_replace_editor'].includes(exec.name)) return next()
    const store = service.store
    if (store === undefined) return next()
    const rawPath = (exec.arguments as { file_path?: unknown }).file_path
    if (typeof rawPath !== 'string' || rawPath === '') return next()
    const candidate = normalizePath(rawPath)
    const active = store.confirmed.list((item) => (item as ConfirmedItemRecord).status === 'active') as ConfirmedItemRecord[]
    for (const item of active) {
      const hit = item.forbiddenPaths.some((forbidden) => {
        const normalized = normalizePath(forbidden)
        return candidate === normalized || candidate.startsWith(normalized + '/')
      })
      if (hit) {
        return {
          kind: 'deny' as const,
          reason: `与已确定约束冲突（${item.id}）：「${item.text}」禁止修改 ${item.forbiddenPaths.join(', ')}。如确需修改，请先请开发者在该约束上解禁。`,
        }
      }
    }
    return next()
  })
}

/** 新增一条已确定事项（仅人工路径调用：UI 按钮）。 */
export function addConfirmedItem(
  service: ProjectControlService,
  input: { type: ConfirmedItemRecord['type']; text: string; forbiddenPaths?: string[] },
): ConfirmedItemRecord {
  const projectId = service.currentProject?.id ?? 'prj_ad_hoc'
  const record: ConfirmedItemRecord = {
    id: CONFIRMED_ID_PREFIX + generateUlid(),
    projectId,
    type: input.type,
    text: input.text,
    forbiddenPaths: (input.forbiddenPaths ?? []).map(normalizePath).filter((path) => path.length > 0),
    status: 'active',
    createdAt: Date.now(),
  }
  service.store?.confirmed.save(record as never)
  return record
}

/** 移除（软删）一条已确定事项。 */
export function removeConfirmedItem(service: ProjectControlService, id: string): boolean {
  const item = service.store?.confirmed.get(id) as ConfirmedItemRecord | undefined
  if (item === undefined) return false
  item.status = 'removed'
  service.store?.confirmed.save(item as never)
  return true
}
