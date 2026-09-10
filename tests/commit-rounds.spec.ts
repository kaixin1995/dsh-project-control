// 提交轮次聚类单测：提交核查台「选整轮」的分组逻辑。
// 规则与服务端 runtime/history.ts 的 clusterCommits 对齐（时间窗口 + 文件零重叠）。
import { describe, expect, it } from 'vitest'
import { clusterIntoRounds } from '../src/client/components/commit-rounds.ts'

describe('提交轮次聚类（clusterIntoRounds）', () => {
  const day = 24 * 60 * 60 * 1000
  const c = (sha: string, date: number, files: string[]) => ({ sha, date, files })

  it('时间间隔超过窗口 → 切开新轮（新→旧顺序下同样生效）', () => {
    const now = Date.now()
    const rounds = clusterIntoRounds([
      c('b', now, ['x.ts']),
      c('a', now - 3 * day, ['x.ts']),
    ], day)
    expect(rounds).toHaveLength(2)
    expect(rounds[0]!.commits.map((x) => x.sha)).toEqual(['b'])
    expect(rounds[1]!.commits.map((x) => x.sha)).toEqual(['a'])
  })

  it('窗口内且文件重叠 → 聚为一轮；保持列表顺序，时间范围为 min..max', () => {
    const base = Date.now()
    const rounds = clusterIntoRounds([
      c('c3', base, ['a.ts', 'b.ts']),
      c('c2', base - 3_600_000, ['b.ts']),
      c('c1', base - 7_200_000, ['a.ts']),
    ])
    expect(rounds).toHaveLength(1)
    expect(rounds[0]!.commits.map((x) => x.sha)).toEqual(['c3', 'c2', 'c1'])
    expect(rounds[0]!.firstAt).toBe(base - 7_200_000)
    expect(rounds[0]!.lastAt).toBe(base)
  })

  it('连续 ≥3 个提交后文件零重叠 → 零重叠者开启新轮（服务端同规则）', () => {
    const base = Date.now()
    const rounds = clusterIntoRounds([
      c('f4', base, ['z.ts']),
      c('f3', base - 1000, ['c.ts']),
      c('f2', base - 2000, ['b.ts']),
      c('f1', base - 3000, ['a.ts']),
    ])
    expect(rounds).toHaveLength(2)
    expect(rounds[0]!.commits.map((x) => x.sha)).toEqual(['f4', 'f3', 'f2'])
    expect(rounds[1]!.commits.map((x) => x.sha)).toEqual(['f1'])
  })

  it('空列表 → 空轮次；单提交 → 单轮', () => {
    expect(clusterIntoRounds([])).toEqual([])
    const single = clusterIntoRounds([c('only', 5, ['a.ts'])])
    expect(single).toHaveLength(1)
    expect(single[0]!.commits).toHaveLength(1)
    expect(single[0]!.firstAt).toBe(5)
    expect(single[0]!.lastAt).toBe(5)
  })
})
