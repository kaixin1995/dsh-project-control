/**
 * CAS（Compare-And-Swap）乐观并发控制辅助模块。
 * 基于版本号 (revision) 实施并发安全更新，防止多 Agent 协同覆写。
 *
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

/** 创建包装了 CAS 修订版本的实体记录 */
export function createCasRecord<T>(data: T, initialRevision = 1): CasRecord<T> {
  return {
    data,
    revision: initialRevision,
    updatedAt: Date.now(),
  }
}

/**
 * 执行 CAS 检查并更新数据与版本号。
 * 若当前 record.revision !== expectedRevision 则抛出 CasConflictError。
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
