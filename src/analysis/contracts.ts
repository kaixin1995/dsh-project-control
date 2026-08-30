/**
 * Contract Analyzer: detects API, DTO, public interfaces, and configuration schema modifications.
 * @module dsh-project-control/analysis/contracts
 */

export interface ContractFinding {
  kind: 'api_endpoint' | 'dto_schema' | 'public_interface' | 'config_schema' | 'exported_type'
  name: string
  filePath: string
  line?: number
  isBreakingRisk: boolean
  description: string
}

export interface ContractAnalysisResult {
  hasContractModifications: boolean
  findings: ContractFinding[]
  breakingRisks: ContractFinding[]
}

export class ContractAnalyzer {
  /**
   * Scan code or diff for public contract patterns.
   */
  analyze(filePath: string, contentOrDiff: string): ContractAnalysisResult {
    const findings: ContractFinding[] = []
    const lines = contentOrDiff.split('\n')

    // Patterns
    const apiRoutePattern = /(?:app|router|server)\.(?:get|post|put|delete|patch)\(\s*['"`]([^'"`]+)['"`]/i
    const rpcPattern = /@Remote\(\s*['"`]([^'"`]+)['"`]/
    const exportedInterfacePattern = /^\s*export\s+interface\s+([A-Za-z0-9_$]+)/
    const exportedTypePattern = /^\s*export\s+type\s+([A-Za-z0-9_$]+)/
    const configSchemaPattern = /(?:Config|SettingsSchema|OptionsSchema)\s*=\s*(?:z\.|zod\.)/

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!
      const lineNum = i + 1

      // 1. API route detection
      const apiMatch = line.match(apiRoutePattern)
      if (apiMatch && apiMatch[1]) {
        findings.push({
          kind: 'api_endpoint',
          name: apiMatch[1],
          filePath,
          line: lineNum,
          isBreakingRisk: line.startsWith('-') || line.startsWith('+'),
          description: `HTTP API route: ${apiMatch[1]}`,
        })
      }

      // 2. RPC detection
      const rpcMatch = line.match(rpcPattern)
      if (rpcMatch && rpcMatch[1]) {
        findings.push({
          kind: 'api_endpoint',
          name: rpcMatch[1],
          filePath,
          line: lineNum,
          isBreakingRisk: true,
          description: `Typert Remote RPC method: ${rpcMatch[1]}`,
        })
      }

      // 3. Exported Interface
      const ifaceMatch = line.match(exportedInterfacePattern)
      if (ifaceMatch && ifaceMatch[1]) {
        findings.push({
          kind: 'public_interface',
          name: ifaceMatch[1],
          filePath,
          line: lineNum,
          isBreakingRisk: line.startsWith('-'),
          description: `Exported interface: ${ifaceMatch[1]}`,
        })
      }

      // 4. Exported Type
      const typeMatch = line.match(exportedTypePattern)
      if (typeMatch && typeMatch[1]) {
        findings.push({
          kind: 'exported_type',
          name: typeMatch[1],
          filePath,
          line: lineNum,
          isBreakingRisk: line.startsWith('-'),
          description: `Exported type alias: ${typeMatch[1]}`,
        })
      }

      // 5. Config Schema
      if (configSchemaPattern.test(line)) {
        findings.push({
          kind: 'config_schema',
          name: 'PluginConfig',
          filePath,
          line: lineNum,
          isBreakingRisk: true,
          description: 'Plugin configuration schema',
        })
      }
    }

    const breakingRisks = findings.filter(f => f.isBreakingRisk)

    return {
      hasContractModifications: findings.length > 0,
      findings,
      breakingRisks,
    }
  }
}
