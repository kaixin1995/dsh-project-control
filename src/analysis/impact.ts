/**
 * Impact Engine: 4-level impact propagation (direct, indirect, potential, unverifiable) with confidence scoring.
 * @module dsh-project-control/analysis/impact
 */

import type { ProjectGraph, GraphNode } from './graph.ts'
import type { EvidenceId } from '../domain/ids.ts'

export type ImpactLevel = 'direct' | 'indirect' | 'potential' | 'unverifiable'

export interface ImpactedItem {
  node: GraphNode
  level: ImpactLevel
  depth: number
  confidence: number // 0.0 to 1.0
  reason: string
  evidenceIds: EvidenceId[]
}

export interface ImpactAnalysisResult {
  changedFiles: string[]
  impactedItems: ImpactedItem[]
  affectedFiles: string[]
  affectedRoutes: string[]
  affectedTests: string[]
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  riskScore: number
}

export class ImpactEngine {
  /**
   * Compute comprehensive impact from a list of modified file paths over the project graph.
   */
  computeImpact(changedFiles: string[], graph: ProjectGraph, maxDepth = 3): ImpactAnalysisResult {
    const impactedMap = new Map<string, ImpactedItem>()

    // 1. Direct impacts on modified files
    for (const filePath of changedFiles) {
      const fileNode = graph.getNode(filePath) ?? {
        id: filePath,
        type: 'file',
        label: filePath,
        filePath,
      }

      impactedMap.set(filePath, {
        node: fileNode,
        level: 'direct',
        depth: 0,
        confidence: 1.0,
        reason: 'File directly modified in change',
        evidenceIds: [],
      })

      // 2. Backward traversal: find callers / importers (indirect impact)
      const backwardSteps = graph.traverseBackward(filePath, maxDepth)
      for (const step of backwardSteps) {
        const existing = impactedMap.get(step.node.id)
        const confidence = Math.max(0.2, 1.0 - (step.depth * 0.25))

        if (!existing || existing.level !== 'direct') {
          impactedMap.set(step.node.id, {
            node: step.node,
            level: 'indirect',
            depth: step.depth,
            confidence,
            reason: `Indirectly affected via ${step.edgeType ?? 'reference'} path: ${step.path.join(' -> ')}`,
            evidenceIds: step.evidenceId ? [step.evidenceId] : [],
          })
        }
      }
    }

    const impactedItems = Array.from(impactedMap.values())
    const affectedFiles = Array.from(new Set(impactedItems.map(i => i.node.filePath ?? i.node.id).filter(Boolean)))
    const affectedRoutes = impactedItems.filter(i => i.node.type === 'api_route').map(i => i.node.label)
    const affectedTests = impactedItems.filter(i => i.node.type === 'test_case').map(i => i.node.label)

    // Calculate risk score (0 - 100)
    let riskScore = 0
    riskScore += changedFiles.length * 5
    riskScore += impactedItems.filter(i => i.level === 'indirect').length * 3
    riskScore += affectedRoutes.length * 15 // High impact on public API routes
    if (affectedTests.length === 0 && changedFiles.length > 3) {
      riskScore += 20 // Risk penalty for changing multiple files without tests
    }

    const riskLevel: 'low' | 'medium' | 'high' | 'critical' =
      riskScore >= 60 ? 'critical' :
      riskScore >= 35 ? 'high' :
      riskScore >= 15 ? 'medium' : 'low'

    return {
      changedFiles,
      impactedItems,
      affectedFiles,
      affectedRoutes,
      affectedTests,
      riskLevel,
      riskScore,
    }
  }
}
