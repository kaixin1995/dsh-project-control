// 临时检查（验证后删除）：断点续跑是否自动接管了被中断的 Run。
const base = 'http://127.0.0.1:3080/project-control/api'
const state = await (await fetch(base + '/state')).json()
const runs = state.runs ?? []
console.log('runs:', runs.length)
for (const run of runs.slice(0, 6)) {
  console.log(' -', run.status, '|', (run.changeId ?? '').slice(0, 16), '|', run.stepsDone + '/' + run.stepsTotal, '|', run.id.slice(0, 24))
}
// 找 E2E 的 run（变更标题含 乘法）
for (const run of runs) {
  const detail = await (await fetch(base + '/runs/detail?id=' + encodeURIComponent(run.id))).json()
  if ((detail.run.changeTitle ?? '').includes('乘法')) {
    console.log('E2E Run:', detail.run.status, '| 步骤:')
    for (const s of detail.steps) console.log('   -', s.role, '|', s.model, '|', s.status, '| 尝试', s.attemptsCount)
    console.log('   注入记忆:', JSON.stringify(detail.context?.injectedMemories ?? []))
    console.log('   决策日志:', (detail.context?.decisionLog ?? []).map((d) => d.kind).join(','))
  }
}
