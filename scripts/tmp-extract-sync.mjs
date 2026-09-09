// 一次性抽取（验证后删除）：/memory/sync 核心逻辑 → 导出 runMemorySync(ctx, service, project)，
// 路由与调度器共用；调度器/模型/UI 增加 sync 类型。
import { readFileSync, writeFileSync } from 'node:fs'

// ── ① api-route.ts：抽出同步核心 ──
{
  const p = 'src/plugin/api-route.ts'
  const raw = readFileSync(p, 'utf8')
  const crlf = raw.includes('\r\n')
  let s = crlf ? raw.replaceAll('\r\n', '\n') : raw

  // 找到 sync 路由主体（从 adoptProject 之后到 res.end(JSON.stringify({...verdict...})) 之间）
  const startMarker = "            const pid = project.id as string\n            const status = await service.git.getStatus(cwd)"
  const endMarker = "            res.writeHead(200, { 'content-type': 'application/json' })\n            res.end(JSON.stringify({\n              ok: true,\n              behindCount: commitLines.length,\n              staleProposals,\n              renewed,\n              newCandidates: newCandidates.slice(0, 5),\n              verdict: `同步完成：${commitLines.length} 个新提交；${staleProposals.length} 条疑似过期待复核；新增 ${Math.min(newCandidates.length, 5)} 条候选；${renewed} 条自动续命。`,\n            }))"
  const startIdx = s.indexOf(startMarker)
  if (startIdx < 0) throw new Error('sync core start not found')
  const endIdx = s.indexOf(endMarker, startIdx)
  if (endIdx < 0) throw new Error('sync core end not found')
  const core = s.slice(startIdx, endIdx)

  // 构造导出函数（去一层缩进；ctx 参数替换路由闭包里的 ctx）
  const coreDedented = core.replaceAll('\n            ', '\n          ').replaceAll('\n          ', '\n      ')
  void coreDedented

  // 简化：不做精细去缩进，直接整段搬移并函数体包一层 try（原样保留缩进风格）
  const fn = `/**
 * 拉取同步核心（/memory/sync 路由与例行任务调度共用）：
 * 基线..HEAD 三向判定 → 失效提案 + 新候选 + 自动续命 + 基线前移。
 */
export async function runMemorySync(
  ctx: Context,
  service: ProjectControlService,
  project: ProjectRecord,
): Promise<Record<string, unknown>> {
  if (service.store === undefined || service.memoryService === undefined) {
    return { ok: false, error: 'service not started' }
  }
  const cwd = project.identity?.rootPath
  if (cwd === undefined) {
    return { ok: false, error: 'no project root' }
  }
  try {
${core.split('\n').map((l) => l).join('\n')}
    return {
      ok: true,
      behindCount: commitLines.length,
      staleProposals,
      renewed,
      newCandidates: newCandidates.slice(0, 5),
      verdict: \`同步完成：\${commitLines.length} 个新提交；\${staleProposals.length} 条疑似过期待复核；新增 \${Math.min(newCandidates.length, 5)} 条候选；\${renewed} 条自动续命。\`,
    }
  } catch (error: unknown) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) }
  }
}
`
  // 插到 purgeResolvedIssues 前
  const anchor = '/**\n * 数据生命周期：清理超期的已解决评审问题'
  const ai = s.indexOf(anchor)
  if (ai < 0) throw new Error('insert anchor not found')
  s = s.slice(0, ai) + fn + '\n' + s.slice(ai)

  // 路由体改为委托
  const routeBody = `        if (req.method === 'POST' && routePath === '/memory/sync') {
          if (service.store === undefined || service.memoryService === undefined) {
            res.writeHead(503, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: 'service not started' }))
            return
          }
          try {
            const body = await readJsonBody(req)
            const project = await adoptProject(service, body)
            if (project === undefined) {
              res.writeHead(400, { 'content-type': 'application/json' })
              res.end(JSON.stringify({ error: 'no project initialized' }))
              return
            }
            const outcome = await runMemorySync(ctx, service, project)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify(outcome))
          } catch (error: unknown) {
            res.writeHead(500, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
          return
        }
`
  // 用路由头尾定位替换整段
  const rStart = s.indexOf("        if (req.method === 'POST' && routePath === '/memory/sync') {")
  const rEndMarker = "        // 同步报告的后续动作：把确认的疑似过时项落为 stale / 归档。"
  const rEnd = s.indexOf(rEndMarker)
  if (rStart < 0 || rEnd < 0) throw new Error('route span not found')
  s = s.slice(0, rStart) + routeBody + '\n' + s.slice(rEnd)

  writeFileSync(p, crlf ? s.replaceAll('\n', '\r\n') : s)
  console.log('api-route: sync core extracted + route delegates')
}

// ── ② models.ts：ScheduledTaskType 加 sync ──
{
  const p = 'src/domain/models.ts'
  const raw = readFileSync(p, 'utf8')
  const crlf = raw.includes('\r\n')
  let s = crlf ? raw.replaceAll('\r\n', '\n') : raw
  const from = "export type ScheduledTaskType = 'run' | 'review' | 'summary'"
  if (!s.includes(from)) throw new Error('models type anchor')
  s = s.replace(from, "export type ScheduledTaskType = 'run' | 'review' | 'summary' | 'sync'")
  writeFileSync(p, crlf ? s.replaceAll('\n', '\r\n') : s)
  console.log('models: sync type added')
}

// ── ③ scheduler.ts：sync 分支 ──
{
  const p = 'src/runtime/scheduler.ts'
  const raw = readFileSync(p, 'utf8')
  const crlf = raw.includes('\r\n')
  let s = crlf ? raw.replaceAll('\r\n', '\n') : raw
  const from = "    type: 'run' | 'review' | 'summary'"
  if (!s.includes(from)) throw new Error('scheduler type anchor')
  s = s.replace(from, "    type: 'run' | 'review' | 'summary' | 'sync'")
  const summaryAnchor = "    const summary = await runIncrementalAiSummary(this.ctx, this.service, project)"
  if (!s.includes(summaryAnchor)) throw new Error('summary anchor')
  s = s.replace(summaryAnchor, `    if (task.type === 'sync') {
      const { runMemorySync } = await import('../plugin/api-route.ts')
      const outcome = await runMemorySync(this.ctx, this.service, project)
      return outcome.ok === true ? String(outcome.verdict ?? '记忆同步完成') : \`记忆同步失败：\${String(outcome.error ?? '')}\`
    }
${summaryAnchor}`)
  writeFileSync(p, crlf ? s.replaceAll('\n', '\r\n') : s)
  console.log('scheduler: sync branch added')
}

// ── ④ api-route /scheduled 创建校验 + UI select 加选项 ──
{
  const p = 'src/plugin/api-route.ts'
  const raw = readFileSync(p, 'utf8')
  const crlf = raw.includes('\r\n')
  let s = crlf ? raw.replaceAll('\r\n', '\n') : raw
  const from = "['run', 'review', 'summary'].includes(body['type']) ? body['type'] : ''"
  if (!s.includes(from)) throw new Error('scheduled validation anchor')
  s = s.replace(from, "['run', 'review', 'summary', 'sync'].includes(body['type']) ? body['type'] : ''")
  writeFileSync(p, crlf ? s.replaceAll('\n', '\r\n') : s)
  console.log('api-route: scheduled validation allows sync')
}
{
  const p = 'src/client/components/WorkspaceFrame.tsx'
  const raw = readFileSync(p, 'utf8')
  const crlf = raw.includes('\r\n')
  let s = crlf ? raw.replaceAll('\r\n', '\n') : raw
  // zh 选项
  const zhOpt = "<option value=\"summary\">{t('sched.typeSummary')}</option>"
  if (!s.includes(zhOpt)) throw new Error('ui select anchor')
  s = s.replaceAll(zhOpt, zhOpt + '\n            <option value="sync">{t(\'sched.typeSync\')}</option>')
  // i18n
  const zhI = "    'sched.typeRun': '定时执行',"
  if (!s.includes(zhI)) throw new Error('zh i18n anchor')
  s = s.replace(zhI, zhI + "\n    'sched.typeSync': '记忆同步',")
  const enI = "    'sched.typeRun': 'Timed run',"
  if (!s.includes(enI)) throw new Error('en i18n anchor')
  s = s.replace(enI, enI + "\n    'sched.typeSync': 'Memory sync',")
  writeFileSync(p, crlf ? s.replaceAll('\n', '\r\n') : s)
  console.log('ui: sync option added')
}
