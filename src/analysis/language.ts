/**
 * LanguageAnalyzer interface and GenericLanguageAnalyzer implementation (ripgrep + regex + optional LSP).
 * Pre-reserves interface for future C# Roslyn host (R4).
 *
 * @module dsh-project-control/analysis/language
 */

import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import type { TruthLevel } from '../domain/truth.ts'

export interface SymbolDefinition {
  name: string
  kind: 'class' | 'interface' | 'function' | 'method' | 'type' | 'variable' | 'contract'
  filePath: string
  line: number
  character: number
  exported: boolean
  signature?: string
}

export interface SymbolReference {
  symbolName: string
  filePath: string
  line: number
  character: number
  snippet: string
  truthLevel: TruthLevel
}

export interface LanguageAnalyzer {
  readonly languageId: string
  supportsFile(filePath: string): boolean
  extractSymbols(filePath: string, content: string): Promise<SymbolDefinition[]>
  findReferences(symbolName: string, workspaceRoot: string, targetFiles?: string[]): Promise<SymbolReference[]>
}

export class GenericLanguageAnalyzer implements LanguageAnalyzer {
  readonly languageId = 'generic'

  supportsFile(_filePath: string): boolean {
    return true
  }

  /**
   * Extract symbols using heuristic regex patterns across TypeScript/JavaScript/Python/C#/Go.
   */
  async extractSymbols(filePath: string, content: string): Promise<SymbolDefinition[]> {
    const symbols: SymbolDefinition[] = []
    const lines = content.split('\n')

    // Patterns for class, interface, function, export
    const classPattern = /^\s*(?:export\s+)?(?:abstract\s+)?class\s+([A-Za-z0-9_$]+)/
    const interfacePattern = /^\s*(?:export\s+)?interface\s+([A-Za-z0-9_$]+)/
    const typePattern = /^\s*(?:export\s+)?type\s+([A-Za-z0-9_$]+)\s*=/
    const functionPattern = /^\s*(?:export\s+)?(?:async\s+)?function\s+([A-Za-z0-9_$]+)/
    const arrowFuncPattern = /^\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s*)?\([^)]*\)\s*(?::\s*[^=]+)?=>/
    const methodPattern = /^\s*(?:public|private|protected|async|static|\s)*([A-Za-z0-9_$]+)\s*\([^)]*\)\s*(?::\s*[^;{]+)?\s*[{;]/

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!
      const lineNum = i + 1
      const isExported = line.includes('export')

      let match = line.match(classPattern)
      if (match && match[1]) {
        symbols.push({ name: match[1], kind: 'class', filePath, line: lineNum, character: line.indexOf(match[1]), exported: isExported, signature: line.trim() })
        continue
      }

      match = line.match(interfacePattern)
      if (match && match[1]) {
        symbols.push({ name: match[1], kind: 'interface', filePath, line: lineNum, character: line.indexOf(match[1]), exported: isExported, signature: line.trim() })
        continue
      }

      match = line.match(typePattern)
      if (match && match[1]) {
        symbols.push({ name: match[1], kind: 'type', filePath, line: lineNum, character: line.indexOf(match[1]), exported: isExported, signature: line.trim() })
        continue
      }

      match = line.match(functionPattern) || line.match(arrowFuncPattern)
      if (match && match[1]) {
        symbols.push({ name: match[1], kind: 'function', filePath, line: lineNum, character: line.indexOf(match[1]), exported: isExported, signature: line.trim() })
        continue
      }

      match = line.match(methodPattern)
      if (match && match[1] && !['if', 'for', 'while', 'switch', 'catch', 'constructor'].includes(match[1])) {
        symbols.push({ name: match[1], kind: 'method', filePath, line: lineNum, character: line.indexOf(match[1]), exported: false, signature: line.trim() })
      }
    }

    return symbols
  }

  /**
   * Find symbol references by scanning files in workspace.
   */
  async findReferences(
    symbolName: string,
    workspaceRoot: string,
    targetFiles?: string[],
  ): Promise<SymbolReference[]> {
    const references: SymbolReference[] = []
    const filesToScan = targetFiles ?? this.listWorkspaceCodeFiles(workspaceRoot)

    const regex = new RegExp(`\\b${symbolName}\\b`, 'g')

    for (const relPath of filesToScan) {
      const fullPath = join(workspaceRoot, relPath)
      if (!existsSync(fullPath)) continue

      try {
        const content = readFileSync(fullPath, 'utf8')
        const lines = content.split('\n')

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]!
          if (regex.test(line)) {
            references.push({
              symbolName,
              filePath: relPath,
              line: i + 1,
              character: line.indexOf(symbolName),
              snippet: line.trim(),
              truthLevel: 'analysis_derived',
            })
          }
        }
      } catch {
        // Skip unreadable files
      }
    }

    return references
  }

  private listWorkspaceCodeFiles(root: string): string[] {
    const files: string[] = []
    const scan = (dir: string, prefix = '') => {
      let entries: string[] = []
      try {
        const { readdirSync } = require('node:fs')
        entries = readdirSync(dir)
      } catch {
        return
      }

      for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist' || entry === 'lib') continue
        const full = join(dir, entry)
        const rel = prefix ? `${prefix}/${entry}` : entry
        try {
          const { statSync } = require('node:fs')
          if (statSync(full).isDirectory()) {
            scan(full, rel)
          } else if (/\.(ts|tsx|js|jsx|cs|py|go|rs|java)$/i.test(entry)) {
            files.push(rel)
          }
        } catch {}
      }
    }
    scan(root)
    return files
  }
}
