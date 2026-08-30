import { describe, expect, it } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Context } from '@deepseek-ai/cordis'
import { GenericLanguageAnalyzer } from '../src/analysis/language.ts'
import { collectSymbolReferences } from '../src/analysis/lsp-evidence.ts'

function makeFixture(): string {
  const root = mkdtempSync(join(tmpdir(), 'pc-lsp-'))
  mkdirSync(join(root, 'src'), { recursive: true })
  writeFileSync(
    join(root, 'src', 'order-service.ts'),
    [
      'export class OrderService {',
      '  save(): void {}',
      '}',
      '',
      'export function createOrder() {',
      '  const service = new OrderService()',
      '  service.save()',
      '  return service',
      '}',
      '',
      'export const other = 1',
    ].join('\n'),
  )
  return root
}

describe('LSP evidence hook (T3.1)', () => {
  it('degrades to rg file scan with file_ast source when no lsp service is mounted', async () => {
    const ctx = new Context()
    const analyzer = new GenericLanguageAnalyzer()
    const root = makeFixture()

    const evidence = await collectSymbolReferences(
      ctx,
      analyzer,
      'OrderService',
      root,
      'src/order-service.ts',
      { line: 0, character: 13 },
    )

    expect(evidence.source).toBe('file_ast')
    expect(evidence.lspFailed).toBe(false)
    expect(evidence.references.length).toBeGreaterThanOrEqual(2)
    expect(evidence.references.every((reference) => reference.symbolName === 'OrderService')).toBe(true)
  })

  it('uses lsp findReferences and labels lsp_symbol when the service answers', async () => {
    const ctx = new Context()
    await ctx.provide('lsp', {
      query: async (request: unknown) => {
        const req = request as { operation: string; position: { line: number } }
        expect(req.operation).toBe('findReferences')
        return {
          locations: [
            { filePath: 'src/consumer.ts', line: 9, character: 5 },
            { filePath: 'src/other.ts', line: 2, character: 0 },
          ],
        }
      },
    })
    const analyzer = new GenericLanguageAnalyzer()
    const root = makeFixture()

    const evidence = await collectSymbolReferences(
      ctx,
      analyzer,
      'OrderService',
      root,
      'src/order-service.ts',
      { line: 0, character: 13 },
    )

    expect(evidence.source).toBe('lsp_symbol')
    expect(evidence.lspFailed).toBe(false)
    expect(evidence.references).toHaveLength(2)
    expect(evidence.references[0]!.filePath).toBe('src/consumer.ts')
  })

  it('falls back to rg and labels the degradation when lsp exists but the query fails', async () => {
    const ctx = new Context()
    await ctx.provide('lsp', {
      query: async () => {
        throw new Error('no language server for this workspace')
      },
    })
    const analyzer = new GenericLanguageAnalyzer()
    const root = makeFixture()

    const evidence = await collectSymbolReferences(
      ctx,
      analyzer,
      'OrderService',
      root,
      'src/order-service.ts',
      { line: 0, character: 13 },
    )

    expect(evidence.source).toBe('file_ast')
    expect(evidence.lspFailed).toBe(true)
    expect(evidence.references.length).toBeGreaterThanOrEqual(2)
  })
})
