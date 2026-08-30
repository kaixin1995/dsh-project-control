/**
 * 符号引用证据收集（T3.1）：
 * 优先 ctx.lsp findReferences（语义级，证据源 lsp_symbol）；
 * LSP 服务 / provider 缺失或查询失败时降级为 generic 分析器的 rg 文件扫描
 * （证据源 file_ast），调用方据此标注证据等级（V1.0 §84 降级路径）。
 *
 * @module dsh-project-control/analysis/lsp-evidence
 */

import type { Context } from '@deepseek-ai/cordis'
import type { GenericLanguageAnalyzer, SymbolReference } from './language.ts'

/** 引用证据结果：来源标注决定证据等级。 */
export interface ReferenceEvidence {
  references: SymbolReference[]
  /** 'lsp_symbol' = 语义级；'file_ast' = rg 文本降级。 */
  source: 'lsp_symbol' | 'file_ast'
  /** LSP 曾存在但查询失败时为 true（降级原因标注）。 */
  lspFailed: boolean
}

/** 从宿主上下文安全取可选 lsp 服务（未挂载返回 undefined）。 */
function optionalLsp(ctx: Context): { query: (request: unknown, signal?: AbortSignal) => Promise<unknown> } | undefined {
  try {
    return (ctx as { lsp?: { query: (request: unknown, signal?: AbortSignal) => Promise<unknown> } }).lsp
  } catch {
    return undefined
  }
}

/**
 * 收集一个符号的引用证据：LSP findReferences 优先，缺失/失败降级 rg 扫描。
 * @param ctx - 宿主上下文（读可选 lsp 服务）。
 * @param analyzer - generic 分析器（降级路径）。
 * @param symbolName - 目标符号名。
 * @param workspaceRoot - 工作区根。
 * @param filePath - 符号定义所在文件（LSP 光标定位用；降级路径忽略）。
 * @param position - 符号在文件中的 0 基 (line, character)（降级路径忽略）。
 * @param signal - 取消信号。
 */
export async function collectSymbolReferences(
  ctx: Context,
  analyzer: GenericLanguageAnalyzer,
  symbolName: string,
  workspaceRoot: string,
  filePath: string,
  position: { line: number; character: number },
  signal?: AbortSignal,
): Promise<ReferenceEvidence> {
  const lsp = optionalLsp(ctx)
  if (lsp !== undefined) {
    try {
      const raw = (await lsp.query({
        operation: 'findReferences',
        filePath,
        position,
        workspaceRoot,
      }, signal)) as { locations?: Array<{ filePath?: string; uri?: string; line?: number; character?: number }> }
      const locations = raw.locations ?? []
      const references = locations.map((location) => ({
        symbolName,
        filePath: location.filePath ?? location.uri ?? '',
        line: (location.line ?? 0) + 1,
        character: location.character ?? 0,
        snippet: '',
        truthLevel: 'fact' as const,
      }))
      return { references, source: 'lsp_symbol', lspFailed: false }
    } catch {
      // LSP 存在但查询失败（无 provider / 无语言服务器 / 超时）→ 降级并标注。
      const references = await analyzer.findReferences(symbolName, workspaceRoot)
      return { references, source: 'file_ast', lspFailed: true }
    }
  }
  const references = await analyzer.findReferences(symbolName, workspaceRoot)
  return { references, source: 'file_ast', lspFailed: false }
}
