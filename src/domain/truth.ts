/**
 * 5 级真值模型（Truth Model）与防降级规则体系。
 * 等级划分：
 * 1. unverified (1): 未经检验的假设或用户口头描述
 * 2. inferred (2): LLM 启发式推断或概率性结论
 * 3. analysis_derived (3): 静态 AST 解析或依赖图推导出的结论
 * 4. evidence_observed (4): 观察到的编译器、测试用例或具体工具运行日志
 * 5. fact (5): Git 提交、磁盘文件、人工确认的绝对地面真值
 *
 * @module dsh-project-control/domain/truth
 */

export type TruthLevel =
  | 'fact'               // 等级 5: 确定性磁盘/Git 观测，零 LLM 幻觉
  | 'evidence_observed'  // 等级 4: 具体工具执行/测试输出/符号查询直接观测
  | 'analysis_derived'   // 等级 3: 确定性代码图谱/静态分析派生
  | 'inferred'           // 等级 2: LLM 启发式推断/概率性结论
  | 'unverified'         // 等级 1: 未经核验的用户口头描述或初始假设

export const TRUTH_LEVEL_RANKS: Record<TruthLevel, number> = {
  unverified: 1,
  inferred: 2,
  analysis_derived: 3,
  evidence_observed: 4,
  fact: 5,
}

/** 获取真值等级的数值权重 */
export function truthRank(level: TruthLevel): number {
  return TRUTH_LEVEL_RANKS[level]
}

/**
 * 判断 incoming 真值是否严格高于 existing。
 */
export function isHigherTruth(incoming: TruthLevel, existing: TruthLevel): boolean {
  return truthRank(incoming) > truthRank(existing)
}

/**
 * 判断 incoming 真值是否有权覆盖已有的 existing 真值。
 * 铁律：高等级或同等级可覆盖；低等级决不允许覆盖或降级高等级真值！
 */
export function canOverrideTruth(existing: TruthLevel, incoming: TruthLevel): boolean {
  return truthRank(incoming) >= truthRank(existing)
}

/**
 * 组合多个真值等级，遵循木桶原理（最低木板原则）。
 */
export function combineTruthLevels(levels: readonly TruthLevel[]): TruthLevel {
  if (levels.length === 0) return 'unverified'
  let lowest: TruthLevel = levels[0]!
  for (let i = 1; i < levels.length; i++) {
    if (truthRank(levels[i]!) < truthRank(lowest)) {
      lowest = levels[i]!
    }
  }
  return lowest
}
