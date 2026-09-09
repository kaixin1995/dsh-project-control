// 临时 E2E 第二轮（验证后删除）：先注册工作区再走全链路。
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'

const base = 'http://127.0.0.1:3080/project-control/api'
const root = 'D:/dev-tmp/pc-e2e-demo'
const post = async (path, body) => {
  const res = await fetch(base + path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
  return { ok: res.ok, data: await res.json().catch(() => ({})) }
}
for (let i = 0; i < 30; i++) {
  try { if ((await fetch(base + '/state')).ok) break } catch { /* retry */ }
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

// ① 注册工作区（子代理的文件工具依赖工作区作用域）
const reg = await post('/workspace/register', { path: root })
console.log('[1] 工作区注册:', JSON.stringify(reg.data))

// ② 记忆已在上轮注入并确认；直接创建任务
const plan = await post('/runs/start', { rootPath: root, title: '新增乘法函数（重试）', description: '在仓库根目录新建 mul.js，导出 multiply(a,b) 返回 a*b；新建 demo.js 调用它并 console.log 结果。' })
console.log('[2] 编排生成: steps =', plan.data.steps?.length)
for (const s of plan.data.steps ?? []) console.log('    -', s.role, '|', s.title)
const changeId = plan.data.changeId

// ③ 启动执行并轮询
const launch = await post('/runs/launch', { rootPath: root, changeId })
const runId = launch.data.runId
console.log('[3] 已启动 Run:', runId)
let detail = null
for (let i = 0; i < 120; i += 1) {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  detail = await (await fetch(base + '/runs/detail?id=' + encodeURIComponent(runId))).json()
  const done = detail.steps.filter((s) => ['succeeded', 'skipped', 'failed'].includes(s.status)).length
  if (i % 6 === 0 || ['succeeded', 'failed', 'paused', 'cancelled', 'completed'].includes(detail.run.status)) {
    console.log(`    [poll ${i}] ${detail.run.status} 步骤 ${done}/${detail.steps.length}`)
  }
  if (['succeeded', 'failed', 'paused', 'cancelled', 'completed'].includes(detail.run.status)) break
}
console.log('[4] Run 终态:', detail.run.status, detail.run.error?.message ?? '')
for (const s of detail.steps) console.log('    -', s.role, '|', s.model, '|', s.status, '| 尝试', s.attemptsCount, '|', (s.claimedOutcome ?? '').slice(0, 60).replace(/\n/g, ' '))
console.log('    注入记忆:', JSON.stringify(detail.context?.injectedMemories ?? []))
console.log('    步骤产物:', (detail.context?.stepSummaries ?? []).map((s) => s.stepTitle).join(' → '))
console.log('    决策日志:', (detail.context?.decisionLog ?? []).map((d) => d.kind).join(','))

// ④ 记忆提炼
const memories = await (await fetch(base + '/memories?rootPath=' + encodeURIComponent(root))).json()
const distilled = memories.memories.filter((m) => m.sourceTag === 'run')
console.log('[5] Run 提炼记忆候选:', distilled.length, '条')
for (const m of distilled) console.log('    -', m.title)
