// 临时 E2E（验证后删除）：临时仓里真实走一遍 执行中心全链路 + 记忆联动。
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

// ① 建临时 git 仓并注册为项目
rmSync(root, { recursive: true, force: true })
mkdirSync(root, { recursive: true })
const git = (args) => execFileSync('git', args, { cwd: root, env: { ...process.env, GIT_AUTHOR_NAME: 'e2e', GIT_AUTHOR_EMAIL: 'e2e@x', GIT_COMMITTER_NAME: 'e2e', GIT_COMMITTER_EMAIL: 'e2e@x' } })
git(['init', '-q'])
writeFileSync(root + '/calc.js', 'export function add(a, b) { return a + b }\n')
git(['add', '.']); git(['commit', '-qm', 'init'])
console.log('[1] 临时仓就绪:', root)

// ② 注入一条已确认记忆（架构决策 → 执行时全局注入）
const mem = await post('/memory', { rootPath: root, memoryType: 'architecture_decision', title: '模块规范', content: '所有新代码必须放在 src/ 目录内。', scope: 'project' })
await post('/memory/confirm', { memoryId: mem.data.memoryId })
console.log('[2] 已确认记忆注入:', JSON.stringify(mem.data))

// ③ 创建任务 → 生成编排（含角色/模型/策略建议）
const plan = await post('/runs/start', { rootPath: root, title: '新增乘法函数', description: '在 src/mul.js 新增 multiply(a,b) 返回乘积，并加一个调用示例文件。' })
console.log('[3] 编排生成: steps =', plan.data.steps?.length)
for (const s of plan.data.steps ?? []) console.log('    -', s.role, '|', s.title, '| 策略:', s.failurePolicy)
const changeId = plan.data.changeId

// ④ 自定义：把第一步策略改为 ask、第二步指定执行模型（证明编排可改）
const steps = (plan.data.steps ?? []).map((s, i) => i === 0 ? { ...s, failurePolicy: 'ask' } : i === 1 ? { ...s, modelProvider: 'aitool', modelId: 'deepseek-v3.2-exp' } : s)
const upd = await post('/runs/plan/update', { rootPath: root, changeId, steps })
console.log('[4] 编排自定义保存:', JSON.stringify(upd.data))

// ⑤ 启动执行
const launch = await post('/runs/launch', { rootPath: root, changeId })
const runId = launch.data.runId
console.log('[5] 已启动 Run:', runId)

// ⑥ 轮询 Run 详情：进度 / 模型 / 注入记忆 / 决策日志
let detail = null
for (let i = 0; i < 90; i += 1) {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  detail = await (await fetch(base + '/runs/detail?id=' + encodeURIComponent(runId))).json()
  const st = detail.run.status
  const done = detail.steps.filter((s) => ['succeeded', 'skipped', 'failed'].includes(s.status)).length
  console.log(`    [poll ${i}] ${st} 步骤 ${done}/${detail.steps.length}`)
  if (['succeeded', 'failed', 'paused', 'cancelled', 'completed'].includes(st)) break
}
console.log('[6] Run 终态:', detail.run.status, detail.run.error?.message ?? '')
for (const s of detail.steps) console.log('    -', s.role, '|', s.model, '|', s.status, '| 尝试', s.attemptsCount, '|', (s.claimedOutcome ?? '').slice(0, 50))
console.log('    注入记忆:', JSON.stringify(detail.context?.injectedMemories ?? []))
console.log('    决策日志:', (detail.context?.decisionLog ?? []).map((d) => d.kind).join(','))

// ⑦ 记忆联动：Run 提炼的候选（sourceTag=run，待确认）
const memories = await (await fetch(base + '/memories?rootPath=' + encodeURIComponent(root))).json()
const distilled = memories.memories.filter((m) => m.sourceTag === 'run')
console.log('[7] Run 提炼记忆候选:', distilled.length, '条')
for (const m of distilled) console.log('    -', m.title, '（confirmed:', m.isHumanConfirmed, '）')
