/**
 * 提交轮次聚类（客户端）：提交核查台的下拉框按「一轮工作」分组展示。
 * 与 runtime/history.ts 的 clusterCommits 保持同一启发式（V1.0 §97/§99）：
 * 相邻提交时间间隔超过窗口（默认 36h）切断；连续 ≥3 个提交后与已聚文件
 * 零重叠也切断。服务端那份工作在 git 扫描层（重建历史），这份面向
 * /commits 返回的提交条目——两处规则改动必须同步。
 *
 * @module dsh-client-project-control/components/commit-rounds
 */

/** 聚类输入的最小形状（/commits 的提交条目子集）。 */
export interface RoundCommit {
  sha: string
  /** 提交时间（毫秒）。 */
  date: number
  /** 涉及文件路径（相对仓库根）。 */
  files: string[]
}

/** 一轮工作：保持传入顺序的提交列表（/commits 为新→旧）+ 时间范围。 */
export interface CommitRound {
  commits: RoundCommit[]
  /** 轮内最早提交时间。 */
  firstAt: number
  /** 轮内最晚提交时间。 */
  lastAt: number
}

export const DEFAULT_ROUND_GAP_MS = 36 * 60 * 60 * 1000

/** 与服务端 clusterCommits 相同的重叠率：命中文件数 / max(本提交文件数, 1)。 */
function overlapRatio(files: string[], existing: Set<string>): number {
  if (existing.size === 0) return 0
  let hits = 0
  for (const file of files) if (existing.has(file)) hits += 1
  return hits / Math.max(files.length, 1)
}

/**
 * 把（新→旧或旧→新均可）连续提交聚成轮次。
 * 时间间隔取绝对值：列表顺序不保证时间方向。
 */
export function clusterIntoRounds(commits: RoundCommit[], clusterGapMs: number = DEFAULT_ROUND_GAP_MS): CommitRound[] {
  const rounds: CommitRound[] = []
  let current: RoundCommit[] = []
  let currentFiles = new Set<string>()

  const pushRound = (): void => {
    if (current.length === 0) return
    const times = current.map((commit) => commit.date)
    rounds.push({ commits: current, firstAt: Math.min(...times), lastAt: Math.max(...times) })
    current = []
    currentFiles = new Set()
  }

  for (const commit of commits) {
    const previous = current[current.length - 1]
    const gapBreak = previous !== undefined && Math.abs(commit.date - previous.date) > clusterGapMs
    const fileBreak = current.length >= 3 && overlapRatio(commit.files, currentFiles) === 0
    if (gapBreak || fileBreak) pushRound()
    current.push(commit)
    for (const file of commit.files) currentFiles.add(file)
  }
  pushRound()
  return rounds
}
