import { describe, expect, it } from 'vitest'
import { generateUlid, decodeUlidTime } from '../src/domain/ulid.ts'
import {
  ProjectId,
  ChangeId,
  createProjectId,
  createChangeId,
  createPlanId,
  createRunId,
  createStepId,
  createAttemptId,
  createEvidenceId,
  createIssueId,
  createCriterionId,
  createVerificationId,
  createMemoryId,
  createConceptId,
} from '../src/domain/ids.ts'

describe('ID & ULID System (T1.1)', () => {
  it('generates 1000 strictly unique and monotonic ULIDs in rapid succession', () => {
    const count = 1000
    const ids: string[] = []
    for (let i = 0; i < count; i++) {
      ids.push(generateUlid())
    }

    const uniqueSet = new Set(ids)
    expect(uniqueSet.size).toBe(count)

    // Verify sort order matches generation order
    const sorted = [...ids].sort()
    expect(ids).toEqual(sorted)
  })

  it('decodes accurate timestamp from generated ULID', () => {
    const now = Date.now()
    const id = generateUlid(now)
    const decoded = decodeUlidTime(id)
    expect(decoded).toBe(now)
  })

  it('mints all 12 branded IDs with distinctive prefixes', () => {
    const prj = createProjectId()
    const chg = createChangeId()
    const pln = createPlanId()
    const run = createRunId()
    const stp = createStepId()
    const att = createAttemptId()
    const evi = createEvidenceId()
    const iss = createIssueId()
    const crt = createCriterionId()
    const vrf = createVerificationId()
    const mem = createMemoryId()
    const cpt = createConceptId()

    expect(prj.startsWith('prj_')).toBe(true)
    expect(chg.startsWith('chg_')).toBe(true)
    expect(pln.startsWith('pln_')).toBe(true)
    expect(run.startsWith('run_')).toBe(true)
    expect(stp.startsWith('stp_')).toBe(true)
    expect(att.startsWith('att_')).toBe(true)
    expect(evi.startsWith('evi_')).toBe(true)
    expect(iss.startsWith('iss_')).toBe(true)
    expect(crt.startsWith('crt_')).toBe(true)
    expect(vrf.startsWith('vrf_')).toBe(true)
    expect(mem.startsWith('mem_')).toBe(true)
    expect(cpt.startsWith('cpt_')).toBe(true)

    // Type caster
    const manualPrj = ProjectId('prj_manual')
    expect(manualPrj).toBe('prj_manual')
    const manualChg = ChangeId('chg_manual')
    expect(manualChg).toBe('chg_manual')
  })
})
