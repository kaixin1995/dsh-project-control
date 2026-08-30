/**
 * Model class definitions, DeepSeek mappings, and stage-based dynamic routing.
 * @module dsh-project-control/model/routing
 */

export type ModelClass = 'fast' | 'standard' | 'reasoning' | 'verifier'

export type ExecutionStage =
  | 'git_analysis'
  | 'impact_analysis'
  | 'plan_generation'
  | 'step_attempt'
  | 'code_review'
  | 'verification'
  | 'memory_synthesis'

export interface ModelDescriptor {
  modelClass: ModelClass
  provider: string
  model: string
  contextWindow: number
  supportsThinking: boolean
}

export interface ModelRoutingConfig {
  defaultProvider?: string
  modelOverrides?: Partial<Record<ModelClass, { provider: string; model: string }>>
}

export const DEFAULT_DEEPSEEK_MODELS: Record<ModelClass, ModelDescriptor> = {
  fast: {
    modelClass: 'fast',
    provider: 'deepseek',
    model: 'deepseek-chat',
    contextWindow: 64 * 1024,
    supportsThinking: false,
  },
  standard: {
    modelClass: 'standard',
    provider: 'deepseek',
    model: 'deepseek-chat',
    contextWindow: 64 * 1024,
    supportsThinking: false,
  },
  reasoning: {
    modelClass: 'reasoning',
    provider: 'deepseek',
    model: 'deepseek-reasoner',
    contextWindow: 64 * 1024,
    supportsThinking: true,
  },
  verifier: {
    modelClass: 'verifier',
    provider: 'deepseek',
    model: 'deepseek-reasoner',
    contextWindow: 64 * 1024,
    supportsThinking: true,
  },
}

export const STAGE_MODEL_CLASS_MAP: Record<ExecutionStage, ModelClass> = {
  git_analysis: 'fast',
  impact_analysis: 'reasoning',
  plan_generation: 'reasoning',
  step_attempt: 'standard',
  code_review: 'reasoning',
  verification: 'verifier',
  memory_synthesis: 'standard',
}

export class ModelRouter {
  constructor(private readonly config: ModelRoutingConfig = {}) {}

  /**
   * Resolve model descriptor for a specific model class.
   */
  resolveModelClass(modelClass: ModelClass): ModelDescriptor {
    const defaultDesc = DEFAULT_DEEPSEEK_MODELS[modelClass]
    const override = this.config.modelOverrides?.[modelClass]

    if (override) {
      return {
        ...defaultDesc,
        provider: override.provider,
        model: override.model,
      }
    }

    return defaultDesc
  }

  /**
   * Resolve model descriptor dynamically by execution stage.
   */
  resolveForStage(stage: ExecutionStage, forceReasoning = false): ModelDescriptor {
    if (forceReasoning) {
      return this.resolveModelClass('reasoning')
    }
    const modelClass = STAGE_MODEL_CLASS_MAP[stage] ?? 'standard'
    return this.resolveModelClass(modelClass)
  }
}
