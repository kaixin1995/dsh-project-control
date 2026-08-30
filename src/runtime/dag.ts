/**
 * Plan DAG Scheduler: topological sorting, dependency resolution, and cycle detection.
 * @module dsh-project-control/runtime/dag
 */

import type { StepId } from '../domain/ids.ts'
import type { PlanStepDefinition } from '../domain/models.ts'
import type { StepRecord } from '../domain/models.ts'

export class DagCycleError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DagCycleError'
  }
}

export class PlanDagScheduler {
  /**
   * Sort plan steps topologically by their dependencies.
   * Throws DagCycleError if a dependency cycle is detected.
   */
  topologicalSort(steps: PlanStepDefinition[]): PlanStepDefinition[] {
    const stepMap = new Map<StepId, PlanStepDefinition>()
    const inDegree = new Map<StepId, number>()
    const adj = new Map<StepId, StepId[]>()

    for (const step of steps) {
      stepMap.set(step.id, step)
      inDegree.set(step.id, step.dependencies.length)
      adj.set(step.id, [])
    }

    for (const step of steps) {
      for (const depId of step.dependencies) {
        if (!stepMap.has(depId)) {
          throw new Error(`Step ${step.id} depends on non-existent step ${depId}`)
        }
        adj.get(depId)!.push(step.id)
      }
    }

    const queue: StepId[] = []
    for (const [id, deg] of inDegree.entries()) {
      if (deg === 0) {
        queue.push(id)
      }
    }

    const sorted: PlanStepDefinition[] = []
    while (queue.length > 0) {
      const u = queue.shift()!
      sorted.push(stepMap.get(u)!)

      const neighbors = adj.get(u) ?? []
      for (const v of neighbors) {
        const nextDeg = (inDegree.get(v) ?? 1) - 1
        inDegree.set(v, nextDeg)
        if (nextDeg === 0) {
          queue.push(v)
        }
      }
    }

    if (sorted.length !== steps.length) {
      throw new DagCycleError('Cyclic dependency detected in plan steps')
    }

    return sorted
  }

  /**
   * Determine which steps are ready for execution based on currently completed steps.
   */
  getReadySteps(
    allPlanSteps: PlanStepDefinition[],
    stepRecords: StepRecord[],
  ): PlanStepDefinition[] {
    const completedStepIds = new Set(
      stepRecords.filter(s => s.status === 'succeeded' || s.status === 'skipped').map(s => s.planStepId),
    )
    const inProgressOrFinished = new Set(
      stepRecords.filter(s => s.status !== 'pending').map(s => s.planStepId),
    )

    const ready: PlanStepDefinition[] = []
    for (const step of allPlanSteps) {
      if (inProgressOrFinished.has(step.id)) {
        continue // Already running, succeeded, or failed
      }

      // Check if all dependencies are succeeded/skipped
      const allDepsMet = step.dependencies.every(depId => completedStepIds.has(depId))
      if (allDepsMet) {
        ready.push(step)
      }
    }

    return ready
  }
}
