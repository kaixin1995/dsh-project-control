/**
 * 12 Branded ID types and factory constructors for Project Control.
 * @module dsh-project-control/domain/ids
 */

import { type Branded, createBrander } from './brand.ts'
import { generateUlid } from './ulid.ts'

export type ProjectId = Branded<'ProjectId'>
export const ProjectId = createBrander<'ProjectId'>()
export const createProjectId = (): ProjectId => ProjectId(`prj_${generateUlid()}`)

export type ChangeId = Branded<'ChangeId'>
export const ChangeId = createBrander<'ChangeId'>()
export const createChangeId = (): ChangeId => ChangeId(`chg_${generateUlid()}`)

export type PlanId = Branded<'PlanId'>
export const PlanId = createBrander<'PlanId'>()
export const createPlanId = (): PlanId => PlanId(`pln_${generateUlid()}`)

export type RunId = Branded<'RunId'>
export const RunId = createBrander<'RunId'>()
export const createRunId = (): RunId => RunId(`run_${generateUlid()}`)

export type StepId = Branded<'StepId'>
export const StepId = createBrander<'StepId'>()
export const createStepId = (): StepId => StepId(`stp_${generateUlid()}`)

export type AttemptId = Branded<'AttemptId'>
export const AttemptId = createBrander<'AttemptId'>()
export const createAttemptId = (): AttemptId => AttemptId(`att_${generateUlid()}`)

export type EvidenceId = Branded<'EvidenceId'>
export const EvidenceId = createBrander<'EvidenceId'>()
export const createEvidenceId = (): EvidenceId => EvidenceId(`evi_${generateUlid()}`)

export type IssueId = Branded<'IssueId'>
export const IssueId = createBrander<'IssueId'>()
export const createIssueId = (): IssueId => IssueId(`iss_${generateUlid()}`)

export type CriterionId = Branded<'CriterionId'>
export const CriterionId = createBrander<'CriterionId'>()
export const createCriterionId = (): CriterionId => CriterionId(`crt_${generateUlid()}`)

export type VerificationId = Branded<'VerificationId'>
export const VerificationId = createBrander<'VerificationId'>()
export const createVerificationId = (): VerificationId => VerificationId(`vrf_${generateUlid()}`)

export type MemoryId = Branded<'MemoryId'>
export const MemoryId = createBrander<'MemoryId'>()
export const createMemoryId = (): MemoryId => MemoryId(`mem_${generateUlid()}`)

export type ConceptId = Branded<'ConceptId'>
export const ConceptId = createBrander<'ConceptId'>()
export const createConceptId = (): ConceptId => ConceptId(`cpt_${generateUlid()}`)
