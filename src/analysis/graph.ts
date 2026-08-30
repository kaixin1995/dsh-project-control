/**
 * Project Graph modeling: 10 node types, 11 edge types, with bounded traversal.
 * @module dsh-project-control/analysis/graph
 */

import type { EvidenceId } from '../domain/ids.ts'

export type GraphNodeType =
  | 'file'
  | 'directory'
  | 'module'
  | 'symbol_class'
  | 'symbol_function'
  | 'symbol_interface'
  | 'api_route'
  | 'config_entry'
  | 'test_case'
  | 'database_table'

export type GraphEdgeType =
  | 'imports'
  | 'declares'
  | 'calls'
  | 'implements'
  | 'extends'
  | 'references'
  | 'tests'
  | 'reads_config'
  | 'writes_db'
  | 'routes_to'
  | 'impacts'

export interface GraphNode {
  id: string
  type: GraphNodeType
  label: string
  filePath?: string
  metadata?: Record<string, unknown>
}

export interface GraphEdge {
  source: string
  target: string
  type: GraphEdgeType
  evidenceId?: EvidenceId
  weight?: number
}

export interface TraversalStep {
  node: GraphNode
  depth: number
  path: string[]
  edgeType?: GraphEdgeType
  evidenceId?: EvidenceId
}

export class ProjectGraph {
  private readonly nodes = new Map<string, GraphNode>()
  private readonly outEdges = new Map<string, GraphEdge[]>()
  private readonly inEdges = new Map<string, GraphEdge[]>()

  addNode(node: GraphNode): void {
    this.nodes.set(node.id, node)
    if (!this.outEdges.has(node.id)) this.outEdges.set(node.id, [])
    if (!this.inEdges.has(node.id)) this.inEdges.set(node.id, [])
  }

  getNode(id: string): GraphNode | undefined {
    return this.nodes.get(id)
  }

  hasNode(id: string): boolean {
    return this.nodes.has(id)
  }

  addEdge(edge: GraphEdge): void {
    if (!this.nodes.has(edge.source)) {
      this.addNode({ id: edge.source, type: 'file', label: edge.source })
    }
    if (!this.nodes.has(edge.target)) {
      this.addNode({ id: edge.target, type: 'file', label: edge.target })
    }

    const outList = this.outEdges.get(edge.source) ?? []
    outList.push(edge)
    this.outEdges.set(edge.source, outList)

    const inList = this.inEdges.get(edge.target) ?? []
    inList.push(edge)
    this.inEdges.set(edge.target, inList)
  }

  getOutgoing(nodeId: string): GraphEdge[] {
    return this.outEdges.get(nodeId) ?? []
  }

  getIncoming(nodeId: string): GraphEdge[] {
    return this.inEdges.get(nodeId) ?? []
  }

  /**
   * Bounded BFS forward traversal (dependency direction).
   * @param startId - root node ID
   * @param maxDepth - maximum traversal hops (default: 3)
   */
  traverseForward(startId: string, maxDepth = 3): TraversalStep[] {
    return this.traverse(startId, maxDepth, id => this.getOutgoing(id), e => e.target)
  }

  /**
   * Bounded BFS backward traversal (dependents / callers direction).
   * @param targetId - target node ID
   * @param maxDepth - maximum traversal hops (default: 3)
   */
  traverseBackward(targetId: string, maxDepth = 3): TraversalStep[] {
    return this.traverse(targetId, maxDepth, id => this.getIncoming(id), e => e.source)
  }

  private traverse(
    startId: string,
    maxDepth: number,
    getEdges: (id: string) => GraphEdge[],
    getNextId: (edge: GraphEdge) => string,
  ): TraversalStep[] {
    const startNode = this.nodes.get(startId)
    if (!startNode) return []

    const visited = new Set<string>([startId])
    const results: TraversalStep[] = []
    const queue: Array<{ id: string; depth: number; path: string[]; edge?: GraphEdge }> = [
      { id: startId, depth: 0, path: [startId] },
    ]

    while (queue.length > 0) {
      const { id, depth, path, edge } = queue.shift()!
      const node = this.nodes.get(id)
      if (!node) continue

      if (depth > 0) {
        results.push({
          node,
          depth,
          path,
          edgeType: edge?.type,
          evidenceId: edge?.evidenceId,
        })
      }

      if (depth < maxDepth) {
        const edges = getEdges(id)
        for (const nextEdge of edges) {
          const nextId = getNextId(nextEdge)
          if (!visited.has(nextId)) {
            visited.add(nextId)
            queue.push({
              id: nextId,
              depth: depth + 1,
              path: [...path, nextId],
              edge: nextEdge,
            })
          }
        }
      }
    }

    return results
  }

  get nodeCount(): number {
    return this.nodes.size
  }

  get edgeCount(): number {
    let total = 0
    for (const edges of this.outEdges.values()) {
      total += edges.length
    }
    return total
  }
}
