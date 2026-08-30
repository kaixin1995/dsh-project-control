/**
 * Compare-And-Swap (CAS) optimistic concurrency control wrapper.
 * @module dsh-project-control/domain/cas
 */

export class CasConflictError extends Error {
  constructor(
    public readonly expectedRevision: number,
    public readonly actualRevision: number,
    message = `CAS revision conflict: expected ${expectedRevision}, but found ${actualRevision}`,
  ) {
    super(message)
    this.name = 'CasConflictError'
  }
}

export interface CasRecord<T> {
  data: T
  revision: number
  updatedAt: number
}

export function createCasRecord<T>(data: T, initialRevision = 1): CasRecord<T> {
  return {
    data,
    revision: initialRevision,
    updatedAt: Date.now(),
  }
}

/**
 * Applies a CAS update to a CasRecord.
 * Throws CasConflictError if record.revision !== expectedRevision.
 */
export function applyCasUpdate<T>(
  record: CasRecord<T>,
  expectedRevision: number,
  nextData: T,
): CasRecord<T> {
  if (record.revision !== expectedRevision) {
    throw new CasConflictError(expectedRevision, record.revision)
  }
  return {
    data: nextData,
    revision: record.revision + 1,
    updatedAt: Date.now(),
  }
}
