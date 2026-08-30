import { describe, expect, it } from 'vitest'
import { GenericLanguageAnalyzer } from '../src/analysis/language.ts'
import { ProjectGraph } from '../src/analysis/graph.ts'
import { ImpactEngine } from '../src/analysis/impact.ts'
import { ContractAnalyzer } from '../src/analysis/contracts.ts'
import { createEvidenceId } from '../src/domain/ids.ts'

describe('Impact Analysis & Project Graph (T3.1 - T3.4)', () => {
  it('T3.1: extracts symbols using GenericLanguageAnalyzer', async () => {
    const analyzer = new GenericLanguageAnalyzer()
    const tsCode = `
export interface UserDto {
  id: string;
  name: string;
}

export class UserService {
  public async getUser(id: string): Promise<UserDto> {
    return { id, name: 'Alice' };
  }
}

export const helperFn = () => 42;
`
    const symbols = await analyzer.extractSymbols('src/user.ts', tsCode)
    expect(symbols.some(s => s.name === 'UserDto' && s.kind === 'interface')).toBe(true)
    expect(symbols.some(s => s.name === 'UserService' && s.kind === 'class')).toBe(true)
    expect(symbols.some(s => s.name === 'getUser' && s.kind === 'method')).toBe(true)
    expect(symbols.some(s => s.name === 'helperFn' && s.kind === 'function')).toBe(true)
  })

  it('T3.2: builds graph and traverses forward/backward safely with depth limit and cycles', () => {
    const graph = new ProjectGraph()
    const evidenceId = createEvidenceId()

    // Add nodes
    graph.addNode({ id: 'src/a.ts', type: 'file', label: 'a.ts', filePath: 'src/a.ts' })
    graph.addNode({ id: 'src/b.ts', type: 'file', label: 'b.ts', filePath: 'src/b.ts' })
    graph.addNode({ id: 'src/c.ts', type: 'file', label: 'c.ts', filePath: 'src/c.ts' })
    graph.addNode({ id: 'api/route.ts', type: 'api_route', label: '/api/users' })

    // Edges: a -> b -> c -> a (cycle)
    graph.addEdge({ source: 'src/a.ts', target: 'src/b.ts', type: 'imports', evidenceId })
    graph.addEdge({ source: 'src/b.ts', target: 'src/c.ts', type: 'calls' })
    graph.addEdge({ source: 'src/c.ts', target: 'src/a.ts', type: 'references' })
    graph.addEdge({ source: 'api/route.ts', target: 'src/a.ts', type: 'routes_to' })

    expect(graph.nodeCount).toBe(4)
    expect(graph.edgeCount).toBe(4)

    // Forward traversal from a.ts (maxDepth = 2)
    const forward = graph.traverseForward('src/a.ts', 2)
    expect(forward.length).toBe(2)
    expect(forward[0]!.node.id).toBe('src/b.ts')
    expect(forward[1]!.node.id).toBe('src/c.ts')

    // Backward traversal from a.ts (who depends on a.ts?)
    const backward = graph.traverseBackward('src/a.ts', 2)
    expect(backward.some(s => s.node.id === 'api/route.ts')).toBe(true)
    expect(backward.some(s => s.node.id === 'src/c.ts')).toBe(true)
  })

  it('T3.3: computes multi-tier impact analysis and risk scores', () => {
    const graph = new ProjectGraph()
    graph.addNode({ id: 'src/core.ts', type: 'file', label: 'core.ts', filePath: 'src/core.ts' })
    graph.addNode({ id: 'src/service.ts', type: 'file', label: 'service.ts', filePath: 'src/service.ts' })
    graph.addNode({ id: 'src/api.ts', type: 'api_route', label: '/api/v1/data' })
    graph.addNode({ id: 'tests/core.spec.ts', type: 'test_case', label: 'Core Test' })

    graph.addEdge({ source: 'src/service.ts', target: 'src/core.ts', type: 'imports' })
    graph.addEdge({ source: 'src/api.ts', target: 'src/service.ts', type: 'calls' })
    graph.addEdge({ source: 'tests/core.spec.ts', target: 'src/core.ts', type: 'tests' })

    const engine = new ImpactEngine()
    const impact = engine.computeImpact(['src/core.ts'], graph)

    expect(impact.changedFiles).toEqual(['src/core.ts'])
    expect(impact.affectedFiles.includes('src/core.ts')).toBe(true)
    expect(impact.affectedFiles.includes('src/service.ts')).toBe(true)
    expect(impact.affectedRoutes).toContain('/api/v1/data')
    expect(impact.affectedTests).toContain('Core Test')
    expect(impact.riskScore).toBeGreaterThan(0)
  })

  it('T3.4: detects contract modifications and breaking risks', () => {
    const analyzer = new ContractAnalyzer()
    const sampleCode = `
export interface OrderPayload {
  orderId: string;
  amount: number;
}

@Remote('submitOrder')
app.post('/api/orders', (req, res) => {});
`
    const result = analyzer.analyze('src/order.ts', sampleCode)
    expect(result.hasContractModifications).toBe(true)
    expect(result.findings.some(f => f.kind === 'public_interface' && f.name === 'OrderPayload')).toBe(true)
    expect(result.findings.some(f => f.kind === 'api_endpoint' && f.name === '/api/orders')).toBe(true)
    expect(result.findings.some(f => f.name === 'submitOrder')).toBe(true)
  })
})
