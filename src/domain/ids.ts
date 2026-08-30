/**
 * Project Control 系统的 12 类名义 ID（Branded ID）及其工厂函数。
 * 所有 ID 统一携带前缀并基于单调 ULID 生成，确保全局唯一与时间有序。
 *
 * @module dsh-project-control/domain/ids
 */

import { type Branded, createBrander } from './brand.ts'
import { generateUlid } from './ulid.ts'

/** 项目 ID (prj_...) */
export type ProjectId = Branded<'ProjectId'>
export const ProjectId = createBrander<'ProjectId'>()
export const createProjectId = (): ProjectId => ProjectId(`prj_${generateUlid()}`)

/** 变更 ID (chg_...) */
export type ChangeId = Branded<'ChangeId'>
export const ChangeId = createBrander<'ChangeId'>()
export const createChangeId = (): ChangeId => ChangeId(`chg_${generateUlid()}`)

/** 计划 ID (pln_...) */
export type PlanId = Branded<'PlanId'>
export const PlanId = createBrander<'PlanId'>()
export const createPlanId = (): PlanId => PlanId(`pln_${generateUlid()}`)

/** 运行实例 ID (run_...) */
export type RunId = Branded<'RunId'>
export const RunId = createBrander<'RunId'>()
export const createRunId = (): RunId => RunId(`run_${generateUlid()}`)

/** 步骤 ID (stp_...) */
export type StepId = Branded<'StepId'>
export const StepId = createBrander<'StepId'>()
export const createStepId = (): StepId => StepId(`stp_${generateUlid()}`)

/** 尝试 ID (att_...) */
export type AttemptId = Branded<'AttemptId'>
export const AttemptId = createBrander<'AttemptId'>()
export const createAttemptId = (): AttemptId => AttemptId(`att_${generateUlid()}`)

/** 证据 ID (evi_...) */
export type EvidenceId = Branded<'EvidenceId'>
export const EvidenceId = createBrander<'EvidenceId'>()
export const createEvidenceId = (): EvidenceId => EvidenceId(`evi_${generateUlid()}`)

/** 审查缺陷/问题 ID (iss_...) */
export type IssueId = Branded<'IssueId'>
export const IssueId = createBrander<'IssueId'>()
export const createIssueId = (): IssueId => IssueId(`iss_${generateUlid()}`)

/** 验收标准 ID (crt_...) */
export type CriterionId = Branded<'CriterionId'>
export const CriterionId = createBrander<'CriterionId'>()
export const createCriterionId = (): CriterionId => CriterionId(`crt_${generateUlid()}`)

/** 验证记录 ID (vrf_...) */
export type VerificationId = Branded<'VerificationId'>
export const VerificationId = createBrander<'VerificationId'>()
export const createVerificationId = (): VerificationId => VerificationId(`vrf_${generateUlid()}`)

/** 记忆 ID (mem_...) */
export type MemoryId = Branded<'MemoryId'>
export const MemoryId = createBrander<'MemoryId'>()
export const createMemoryId = (): MemoryId => MemoryId(`mem_${generateUlid()}`)

/** 概念/模式 ID (cpt_...) */
export type ConceptId = Branded<'ConceptId'>
export const ConceptId = createBrander<'ConceptId'>()
export const createConceptId = (): ConceptId => ConceptId(`cpt_${generateUlid()}`)
