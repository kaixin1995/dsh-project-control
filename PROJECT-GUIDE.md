# dsh-project-control 项目全量指南（新会话必读）

> **目的**：新 AI 会话打开本文件即可完整接手项目——背景、铁律、架构、函数级地图、数据模型、API 清单、构建/测试/发布流程、已验证事实、未完成事项，全部在此。
> **最后更新**：2026-09-10 · 版本 v0.3.4 · 87/87 测试绿

---

## 1. 项目定位

`dsh-project-control` 是 [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)（dsh，一个全插件 Cordis agent 宿主）的**仓外插件**，位于 `D:\Code\deepseek-harness\dsh-project-insight\`（本体仓库根目录内但被 `.git/info/exclude` 屏蔽，是**独立 git 仓库**）。

业主的核心诉求（原话归纳）：**AI 写码太多太快，人需要工具来核查、理解、记忆**。一句话链路：

```
代码变化 → 功能变化 → 影响范围 → 方案核查 → 复检闭环 → 执行控制 → 项目记忆 → 学习笔记
```

GitHub 远端：`https://github.com/kaixin1995/dsh-project-control.git`（公开，他人可 `dsh plugin --profile web add github:kaixin1995/dsh-project-control#v0.3.4` 安装）。

---

## 2. 铁律（违反任何一条都是事故）

1. **零本体改动**：绝不修改 `D:\Code\deepseek-harness` 内任何被 git 跟踪的文件。每次收尾用 `git -C D:\Code\deepseek-harness status --short | wc -l` 确认为 0。
2. **提交纪律**（业主最新指示）：修改完成 → 功能验证**绝对**无问题 → 才提交；**不频繁提交**（攒一批一次提交）。不主动 push 除非业主说了或已授权的发布流程。
3. **生效纪律**：修改完成后必须立即生效；服务端改动（`lib/`）需重启 dsh 的就自己重启（见 §10 重启协议），不等业主催。
4. **不做失败自动回滚**：业主明确拍板"太危险不做"，不要再提议。
5. **单机单实例**：存储是单写者 SQLite，同一台机器只能跑一个 dsh。业主用 `C:\Users\Administrator\Desktop\启动DSH.ps1` 启动（它会杀全部 dsh 再前台启动）。
6. **禁止 `:has()` CSS 祖先匹配**：官方构建产物几十个组件根类都叫 `root`，会把整个聊天容器误钳制（历史事故）。只允许按形状特征运行时定位。
7. **禁止新增 SessionEventMap 事件类型**：仓外插件新增事件重启后日志会被本体拒读。插件持久状态走 storage-domain；模型可见内容经工具结果/deferContext/agent.inject() 进入。
8. **esbuild 不查类型**：`pnpm run build` 会成功即使有 TS 错误。类型门控靠 `pnpm run typecheck`（但插件目录下 react/vendor 有既有噪音，见 §11）。
9. **中文 grep 客户端 bundle 会假阴性**：esbuild 把非 ASCII 转义为 `\uXXXX`。验证 bundle 用 ASCII 键名（如 `narrative.title`）或 node 读文件。
10. **补丁方法论**：复杂代码修改用 `scripts/tmp-*.mjs` 补丁脚本（Write 工具写，`node scripts/tmp-xxx.mjs` 执行，验证后删除；注意 CRLF：脚本里 `raw.includes('\r\n')` 检测并保真回写）。bash 内联 node -e 遇嵌套模板字面量/引号必炸。

---

## 3. 业主全部功能需求记录（按时间顺序，均已实现）

| # | 需求（业主原意） | 状态 |
|---|---|---|
| 1 | 看指定 git 提交（多选/未提交），影响范围+流程图+实现逻辑+最优性+最小侵入 | ✅ 提交核查页 |
| 2 | 记忆、笔记——跟随项目+分支，不跟会话 | ✅ 记忆系统 |
| 3 | 笔记要详细好用：标签、置顶、搜索、编辑痕迹、复制 MD、AI 增量总结（对比上次带"本次更新"节） | ✅ |
| 4 | Review 问题独立板块（看整体），复检闭环：改代码后自动检测修复/最优/最小侵入/新问题，全过才自动解决；不允许人工标"已解决"；误报可人工"判定误报" | ✅ |
| 5 | 已解决问题超 7 天自动清理（`resolvedIssueRetentionDays` 可配，0=永久） | ✅ |
| 6 | 执行中心=中控驾驶舱：任务编排（角色/模型/失败策略可调）、计划确认页、断点续跑、停滞检测、强制收尾验收门、Run→记忆提炼、例行任务（定时执行/评审/AI总结/记忆同步） | ✅ |
| 7 | 执行模型自定义：创建表单选执行模型（作为全计划默认），计划确认页可逐步改 | ✅ |
| 8 | 记忆带生命周期：血缘（基于哪个提交）、来源、有效性状态（疑似过时/归档）、分支作用域（主干全分支 vs 分支隔离）、拉取同步（基线..HEAD 三向判定：失效提案+新候选+自动续命）、合并归一（手动按钮） | ✅ |
| 9 | 约束（已确定禁改路径）：跟项目走，跨项目不串显不误拦；**聊天和执行都受约束**（事前告知+事后拦截双保险）；相对/绝对路径都可 | ✅ |
| 10 | 模型分配可视化（设置页四档：解读/最优性核查/轻析/验收，各自选模型） | ✅ |
| 11 | 工作台 UI：新窗口默认不显示（🧭 按钮显式打开）；关闭时收起右轨不留空态面板；深浅主题对比度 WCAG≥4.5:1 双向自适应 | ✅ |
| 12 | 修复可视化：复检通过的问题展示修复详情（涉及文件/改动符号与调用点/着色 diff） | ✅ |
| 13 | 提交核查一键存笔记/沉淀记忆；笔记↔记忆双向桥（转笔记/转记忆） | ✅ |
| 14 | 工作轮次叙事：多选≥2 提交整体解读（分几步、每步对应哪些提交、演进脉络） | ✅ |
| 15 | peek：任何 file:line（风险点/调用点/问题证据）可点击弹出代码上下文 | ✅ |
| 16 | 顶栏运行徽标 ▶N/✗N；AI 总结消化度提示（上次后有 N 新提交未消化） | ✅ |
| 17 | 提交自动聚类：核查下拉按「轮次」分组（时间窗口+文件重叠），「选整轮」一键多选，未消化提交圆点标记 | ✅ |
| 18 | 核查页 LLM 成本展示：解读/影响函数说明/最优性/轮次叙事各带 ≈$ 成本徽标（缓存命中也带生成时成本） | ✅ |
| 19 | 笔记导出为 .md 文件（浏览器 Blob 下载，文件名按标题清洗） | ✅ |
| 20 | AI 解读并发池：多选/整轮批量勾选时按上限 **3 并发**同时分析，超出的排队等待并显示队列数；所有请求 180s 超时兜底，服务中断/超时写卡片错误占位而非无限转圈 | ✅ |

**明确不做**：失败自动回滚 git 改动（危险）；聊天区与工作台界面层互通（低性价比）；步骤 DAG 并行、敏感步骤审批门（四期增强，未排期）；npm 发布（GitHub 安装已够用）。

**已知简化交付**：分支合并自动提醒归一（现手动按钮）。

---

## 4. 目录结构与文件职责（函数级地图）

```
dsh-project-insight/              ← 独立 git 仓库（peer 于本体 packages）
├── cordis.yml                    ← 开发 overlay（file:// 直载 ts 源码，Windows 路径必须 file:// URL）
├── cordis.patch.yml              ← 用户 patch 层示例
├── package.json                  ← v0.3.4；files:[lib,cordis.yml,cordis.patch.yml,README.md]；无 prepare（lib 预构建随仓库）
├── build.mjs / build-client.mjs  ← esbuild 构建（host lib/index.js + client lib/client.js，包裹 __ModuleLoader__ 工厂）
├── vitest.config.ts              ← alias zod/react 到本体 .pnpm；include tests/**/*.spec.ts
├── PROJECT-GUIDE.md              ← 本文件
├── docs/REQUIREMENTS-LOG.md      ← 业主全部原始需求编年记录（63 条 + 五句关键原话 + 七条规矩）
├── docs/                         ← 产品总纲、V1.0 技术设计（工程权威）、design-scope/v04-mapping（历史参考）
│                                   （development-plan.md 与 SESSION-HANDOFF.md 已按业主要求删除）
├── lib/                          ← 预构建产物，随 git 提交（远端机器无法本地构建——vendor 别名是机器本地）
├── tests/                        ← 26 spec 文件 84 测试
└── src/
    ├── index.ts                  ← 插件主入口（见 §5.1）
    ├── config.ts                 ← 全量配置 schema + 默认值 + resolveFullConfig（见 §6）
    ├── domain/
    │   ├── models.ts             ← 全部实体接口（见 §7）
    │   ├── ids.ts                ← 品牌 ID 工厂（createProjectId 等）
    │   ├── state-machine.ts      ← Change(9态)/Run(10态)/Step(11态)/Attempt(6态) 状态机 + assertXxxTransition
    │   ├── truth.ts              ← 真值 5 级：fact>evidence_observed>analysis_derived>inferred>unverified + canOverrideTruth
    │   ├── project.ts            ← ProjectService.resolveRepositoryIdentity/ensureProject（身份指纹识别迁移）
    │   └── change.ts             ← ChangeService.createChange（baseRevision 锚定）
    ├── git/
    │   ├── adapter.ts            ← GitAdapter：runGit（execFile 封装,10MB 上限,GIT_TERMINAL_PROMPT=0）、
    │   │                            getStatus（porcelain v1 解析→statusHash）、getDiff（--patch-with-stat,500KB 截断,stat 正则）、
    │   │                            getLog（\x1f/\x00/\x01 分隔格式）、revParse、isGitRepo、getHeadSha
    │   └── snapshot.ts           ← WorkspaceSnapshotManager.capture（headSha+statusHash+diffHash 联合指纹，真值校验用）
    ├── analysis/
    │   ├── llm-analyzer.ts       ← runLlmAnalysis(ctx,{prompt,provider,model,maxTokens,timeoutMs,purpose})：经 ctx.llm 走部署路由
    │   ├── evidence.ts           ← EvidenceManager.createEvidence（fact 级证据落盘）
    │   ├── impact.ts / graph.ts  ← ImpactEngine.computeImpact、ProjectGraph（file 节点 references 边，2 跳传播）
    │   └── lsp-evidence.ts       ← collectSymbolReferences（LSP 语义级优先，降级文本扫描）
    ├── memory/
    │   ├── service.ts            ← MemoryService：recordMemory(scope/sourceTag/basisSha 注入)、confirmMemory(fact 升级)、
    │   │                            updateMemory(真值防降级)、queryMemories(类型/文件/确认/分支/标签多维过滤)、
    │   │                            exportToMarkdown、updateStatus(stale/archived)、renewBaseline(自动续命)、normalizeToProject
    │   └── context.ts            ← MemoryContextInjector.relevantMemories(projectId,activeFiles,branch)
    │                             ←   分支作用域过滤：branch 记忆仅同名分支可见，非 active 状态剔除
    │                             ←   synthesizeContext → <project_memory_context> 块
    ├── verification/
    │   ├── issues.ts             ← ReviewIssueManager：createIssue/updateStatus/hasBlockingIssues(blocker|critical)/listByChange
    │   ├── verifier.ts           ← DeterministicBuildVerifier、UnitTestVerifier、EvidenceDiffVerifier、LlmReviewVerifier
    │   └── service.ts            ← VerificationRunner.runPipeline（优先级 1确定性→2证据→3LLM→4人工；确定性失败不可被 LLM 覆盖）
    ├── runtime/
    │   ├── orchestrator.ts       ← RunOrchestrator（核心，见 §5.3）
    │   ├── runner.ts             ← StepAttemptRunner.runStepWithRetry（maxAttempts/backoffDelaysMs 构造注入；
    │   │                            verifiedSuccess→claimedOutcome ??= 'Success verified by checks'；耗尽→failed）
    │   ├── scheduler.ts          ← ScheduledTaskRunner：start()（Node setInterval 60s——**cordis ctx 无 setInterval**，
    │   │                            曾因此静默死亡）、tick(now)（到期判定+串行防重入）、executeTask(task)（run/review/summary/sync 四型）
    │   ├── plan-gen.ts           ← generatePlanSteps（LLM 严格 JSON 编排：title/desc/targetFiles/role/acceptance/failurePolicy；
    │   │                            parsePlanSteps 失败回落单步「执行变更」；isFallbackPlan 判定触发一次更强格式重试）
    │   ├── recovery.ts           ← RecoveryScanner.scanAndRecover：启动时 running→interrupted 标记
    │   ├── history.ts            ← scanHistory：L0 纯 git 扫描→时间窗+文件重叠聚类→ImportedChangeRecord
    │   └── worktree.ts           ← WorktreeManager.createIsolatedWorktree（isolated-worktree 模式）
    ├── plugin/
    │   ├── service.ts            ← ProjectControlService（见 §5.2）
    │   ├── api-route.ts          ← registerApiRoute：45 条 HTTP 路由（见 §8）+ 4 个导出核心函数
    │   ├── tools.ts              ← registerTools：14 个 AI 聊天工具（create_change/list_changes/create_plan/start_run/
    │   │                            analyze_change/query_impact/explain_concept/summarize_learning/run_review/
    │   │                            run_verification/record_memory/confirm_memory/recall_project/write_agent_note）
    │   ├── commands.ts           ← 聊天命令（/project-control 等）
    │   └── confirmed.ts          ← 已确定约束：registerConflictGuard（tools/pre-execute 拦截 write/edit/str_replace_editor，
    │                             ←   按约束归属项目根限定，相对/绝对路径均可，匹配→deny 带原因）、
    │                             ←   addConfirmedItem（adoptProject 后打 projectId）、removeConfirmedItem
    ├── store/
    │   ├── domains.ts            ← 三域 spec：core(projects/changes/plans/runs/steps/attempts/confirmed/notes/plugin_settings/
    │   │                            run_contexts/scheduled_tasks)、analysis(snapshots/evidence/graphs/impacts)、
    │   │                            history(checkpoints/imported_changes/history_cursor/issues/verifications/memories/concepts/
    │   │                            memory_baselines)。同版本加表安全（版本戳不匹配才拒绝）
    │   └── repository.ts         ← DomainRepository<T>(get/save/delete/list(filter))、createInMemoryStore（测试用）、
    │                             ←   ProjectControlStore 聚合接口、ProjectNoteRecord
    └── client/
        ├── index.ts              ← 客户端插件入口（见 §5.4）
        └── components/
            ├── theme.ts          ← 主题对比度引擎（唯一实现）：themeAwareText 双向 ≥4.5:1；
            │                       不变式：强调色文字必须经 themeAwareText（渲染期调用），
            │                       active 高亮背景一律 button-info-fill，禁止 brand-primary 作背景
            ├── commit-rounds.ts  ← 提交轮次聚类（时间窗口+文件重叠，与服务端 clusterCommits 同规则
            │                       ——两处改动必须同步；核查下拉分组/选整轮/未消化标记用）
            ├── WorkspaceFrame.tsx ← 3400 行主组件（六页签全部 UI，见 §5.5）
            └── ChangeCard.ts      ← analyze_change 聊天卡片（dsw-alias 主题变量）
```

---

## 5. 五个装配层详解

### 5.1 `src/index.ts` — 主入口（147 行）
```
apply(ctx, config):
  ├─ ctx.locale.register(zh/en 词典)
  ├─ installSettingsSection（settings 面板集成）
  ├─ ctx.inject(['storageDomain'], scope => service.start(scope.storageDomain))  ← 无存储面时静默跳过（headless）
  ├─ ctx.inject(['settings'], ...)                                              ← settings.yaml → liveConfig
  ├─ registerConflictGuard(ctx, service)                                        ← 约束事后拦截（全局 tools/pre-execute）
  ├─ systemPrompt.section('project-control:policy', order 3000)                 ← 习惯引导（analyze_change/record_memory/start_run）
  ├─ systemPrompt.section('project-control:constraints', order 3001)            ← ★聊天约束事前告知：
  │     text(context) 回调里 context.agent.session.header.cwd（AssembleContext 由 dispatch 扩展携带 agent）
  │     → normalizePath 匹配 projects → 该项目 active 且有 forbiddenPaths 的约束 → 英文指令行注入
  ├─ registerTools / registerCommands / registerApiRoute
inject = ['tools','commands','agents','jobs','sessions','llm','systemPrompt','workspaceRegistry']
```

### 5.2 `src/plugin/service.ts` — ProjectControlService（233 行）
```
属性：store / orchestrator / scheduler / memoryService / conceptService / liveConfig / currentProject
      version（new URL('../package.json', import.meta.url) 运行时读，供设置页显示）
initStore(store)：装配全部 DomainRepository + new RunOrchestrator({...deps})
start(storageDomain)：
  ├─ open 三域 → initStore（真实表）
  ├─ pluginSettings['model-tiers'] 覆盖 liveConfig（页面保存的可视化模型分配优先于 settings.yaml）
  ├─ RecoveryScanner.scanAndRecover()（running→interrupted）
  ├─ autoResumeRuns!==false → 对每个 interrupted run 调 orchestrator.resumeRun(run.id,'continue')
  │    （断点续跑：executeRun 跳过 verifiedOutcome===true 的步骤）
  └─ scheduler = new ScheduledTaskRunner(ctx,this); start()（独立 try/catch 容错——曾因 cordis 无 setInterval 静默死亡）
```

### 5.3 `src/runtime/orchestrator.ts` — RunOrchestrator（971 行，核心）
```
createPlan(change,title,steps)：版本化（旧版永不覆盖），step.role 缺省由 inferStepRole(title,desc) 推断
  ├─ ROLE_TIER：analysis→fast / planning→reasoning / coding→standard / ops→fast / verification→verifier
  ├─ inferStepRole 关键词：ops(格式化|重命名|依赖升级|format|rename|bump…) / verification(测试|验收|构建|test|verify|build)
  │    / planning(规划|设计|方案|plan|design) / analysis(分析|审查|阅读|调研|梳理|总结|检查|analy|review|read…) / 其余 coding
startRun(owner, change, {wait})：owner=undefined（页面/定时）→ void executeRun 后台分离执行；owner 传给 ctx.jobs
resumeRun(runId, action)：
  ├─ 'skip-current'：pausePoint 步骤 → skipped；'continue'：重置该步 attemptsCount=0、delete claimedOutcome
  ├─ 无 pausePoint（中断/失败恢复）：重置全部未完成步骤（interrupted→**ready**、failed/skipped→pending——状态机只允许这两条路）
  ├─ failed 先 →queued（failed→running 非法，必须两跳）
  └─ status='running' → void executeRun
executeRun(run,change,plan)：
  ├─ loadRunContext：首次建 RunContextRecord（projectDigest=技术栈摘要、injectedMemories=relevantMemories 快照、
  │    headSha/branch=git getStatus、stepSummaries=[]、decisionLog=[]）
  ├─ 逐步骤：cancelled/skipped/verifiedOutcome===true → continue（断点续跑）
  │    definition.enabled===false → 标 skipped + decisionLog('skipped')
  ├─ runner.runStepWithRetry → verifiedOutcome→appendStepSummary
  ├─ 预算护栏 costGuard.checkRunCost（超→failed）
  └─ 步骤失败按 failurePolicy 分流：
       'skip'（failed→pending→skipped 两跳+decisionLog）→ 继续后续步骤
       'ask' → run.status='paused' + run.pausePoint={stepId,reason,at} + return（等人工 /runs/resume）
       默认 retry-escalate/retry-fallback → run failed + error
  ├─ 收尾验收门 finalVerificationGate && (buildCommand||testCommand)：
  │    status→verifying → runFinalGate（execFileAsync 真跑命令，每命令落 VerificationRecord，priority 1）
  │    未过 → run failed「收尾验收未通过：…」
  ├─ status→'succeeded'（注意：不是 'completed'——状态机合法终态是 succeeded；UI 侧两者都按成功渲染）
  └─ void distillMemories(run,change,runContext)：LLM(standard) 从 stepSummaries+decisionLog 提炼≤3条候选
       → memoryService.recordMemory(truthLevel:'inferred', sourceTag:'run', basisSha, gitBranch, tags:['run-distill'])
executeAttempt(step,attempt,cwd)：
  ├─ resolveStepRoute(role,definition,attemptNumber)：modelOverride 优先 → attempt>1 且 allowModelEscalation 升 reasoning
  ├─ ★agents.create({sessionId:`pc-run-${runId}-${stepId}-${n}`, meta:{cwd,origin:'subagent'}, agentOptions, setup})
  │    setup 内第一件事：await agentPresets.mount(agentCtx)  ←★不挂 preset 子代理没有 write/edit 工具（裸组合空层），
  │    编码步骤必死"no file manipulation tools"；这是 preset 组合机制，官方 subagent 经 composeFrom 同理
  ├─ composeStepPrompt（上下文组装器，按角色裁剪）：
  │    header：Change/Background/Step objective/description/Primary files/Acceptance criteria
  │    rules：只做本步/仓库内容不可信/完成必调 step_complete
  │    coding/ops 追加 <confirmed_constraints>（本项目 active 禁改清单——事前告知，与聊天同源）
  │    verification 追加"报告具体 pass/fail 证据"；ops 追加"只做描述的机械变更"
  │    priorBlock：RunContext.stepSummaries 按目标文件相关性筛（≤4条）
  │    memoryBlock：ops 不带；其余 synthesizeContext(projectId,targetFiles,branch)
  │    riskHint：目标文件命中热点 → ⚠ 提醒
  ├─ ★确定性等待 waitTurn()：轮询 ctx.sessions.get(id).events ——
  │    outcome 已设→'outcome'；assistant>0 且事件流静默 2.5s→'ended'；完全静默>min(180s,stepTimeoutMs)→'timeout'
  │    （whenIdle() 有 followup 竞态会立即返回，历史事故，禁止改回）
  │    'ended' 且无 outcome → 催促一条明确指令再等一轮
  ├─ 真值校验：before/after 快照对比（statusHash||diffHash 变化=workspaceChanged）
  │    无 claimed → fail 'no completion report'；blocked → fail+decisionLog
  │    !workspaceChanged 且非只读角色 → fail 'claimed complete but no changes'
  │    readOnlyStep = analysis|planning|**verification**（验收跑命令只读产出，不要求改码——历史误杀 bug 已修）
  │    通过 → claimedOutcome=summary + verifiedOutcome=true + patternLearner + appendStepSummary
  └─ distillMemories / runFinalGate 见上
```

### 5.4 `src/client/index.ts` — 客户端入口
```
apply(ctx)：workspaceEnabled 默认 **false**（新窗口不显示工作台）
  ├─ slots.inject('details')：enabled 时 register（priority -10 遮蔽官方 DetailsPanel）
  │    挂载 effect：layout.openDetails()（会话切换 setTimeout 0 再撑一次）
  ├─ sidebar.footer.action：🧭 按钮 toggle——
  │    on：registerWorkspace；off：unregister + layout.closeDetails()（否则官方空态面板残留——历史 bug）
  │    状态经 window CustomEvent('pc-workspace-toggle') 通知按钮重渲染
  └─ tool.call.toolview：analyze_change 专属卡 + start_run/run_review/run_verification 简卡
```

### 5.5 `src/client/components/WorkspaceFrame.tsx` — 主组件（3441 行）
```
模块级工具（组件外纯函数）：
  parseColor/relativeLuminance/darkenForWhiteBackground/lightenForDarkBackground/themeAwareText
    ← 双向对比度引擎：浅色主题深化到白底≥4.5:1，深色主题提亮到深底≥4.5:1（按 body[data-ds-dark-theme]）
  badge(color)：底色 16% 色调 + themeAwareText 文字（styles.badge）
  renderDiffLines(diff)：修复差异 +绿 -红 行级着色
  renderStructuredContent(content)：## 标题着色 / - 列表圆点（内部走 renderWithPeek）
  renderWithPeek(text)：FILE_LINE_PATTERN 匹配 file:line → 可点击芯片 → peekOpener（组件内注入）
  标签映射：ISSUE_STATUS_LABELS / MEMORY_TYPE_LABELS / MEMORY_SOURCE_LABELS / ROLE_LABELS / POLICY_LABELS /
           RUN_STATUS_LABELS / STEP_STATUS_LABELS
组件状态（节选）：tab / state(/state 轮询 4s) / commitsData+details+impact+reviews / planConfirm / runDetail /
  scheduledData / memoriesData+syncReport / issuesData / notes / confirmDialog / peek
六页签：commits（提交核查：多选 picker→AI 解读→影响范围→最优性→文件 diff→叙事卡→peek）
       overview（总览：档案/约束/快捷动作） execution（执行中心：导览条→创建表单(执行模型下拉)→计划确认表格
       (角色/模型/策略/启停)→运行表→Run 详情(步骤时间线+注入记忆+决策日志+暂停恢复按钮)→例行任务卡(默认展开)）
       review（问题看板：级别统计芯片→状态筛选→问题卡(复检/判定误报/修复详情展开)）+验收记录
       notes（笔记：搜索/标签/📌置顶/复制MD/转记忆 + 记忆区：同步条(基线/落后N)→同步报告(标记过时/归档/仍有效)
              →手动表单(类型/作用域)→待确认队列→分组卡片(状态徽标/来源/血缘/分支/归一/归档) + 学习概念）
       settings（模型分配 4 档 + 版本号脚注）
布局守护：applyStatsLineClamp（官方统计行钳制，500ms 看门狗）+ 500ms 列宽看门狗（openDetails 重撑）
顶栏徽标：▶运行中/✗需处理（点击 setTab('execution')）
弹层：ConfirmDialog（危险确认）+ peek 浮层（行号+高亮目标行）
```

---

## 6. 配置（`src/config.ts`，settings 面板 `project-control` 命名空间或 cordis.yml）

| 字段 | 默认 | 说明 |
|---|---|---|
| modelTiers.{fast,standard,reasoning,verifier} | 空=回落会话路由 | 四档模型路由（设置页可视化保存到 pluginSettings，优先于 yaml） |
| budgets.maxCostPerStep/Run/ChangeUsd | 无 | 预算护栏 |
| retry.{maxAttempts,baseDelayMs,maxDelayMs,allowModelEscalation} | 3/2000/60000/true | 重试+指数退避（真接线，非测试常量） |
| bootstrap.{defaultMaxCommits,maxCommitsPerRun,historySummaries} | 50/500/false | 历史重建范围 |
| buildCommand / testCommand | 无 | 确定性验收命令（配置后 Run 必须过收尾门） |
| workspaceMode | current | current / isolated-worktree |
| analysisMaxTokens / analysisTimeoutMs | 4096 / 120000 | 一次性 LLM 上限 |
| resolvedIssueRetentionDays | 7 | 已解决问题保留天数（0=永久），GET /issues 时清理 |
| stepTimeoutMs | 600000 | 单次尝试总超时（另有静默 180s 独立判定） |
| finalVerificationGate | true | 收尾验收门开关 |
| autoResumeRuns | true | 启动自动恢复 interrupted Run |
| scheduledTasksEnabled | true | 例行任务调度器开关 |

---

## 7. 核心数据模型（`src/domain/models.ts`）

```
ProjectRecord{id,name,identity:{rootPath,rootCommitHash,originUrl?,currentBranch?},createdAt,updatedAt}
ChangeRecord{id,projectId,title,description,status,baseRevision,currentPlanId?,revision,createdAt,updatedAt}
PlanStepDefinition{id,title,description,dependencies,targetFiles?,role?,modelOverride?,acceptance?,failurePolicy?,enabled?}
RunRecord{id,changeId,planId,projectId,status,isolationMode,workspaceId?,pausePoint?{stepId,reason,at},
          startedAt?,finishedAt?,error?}
StepRecord{id,runId,planStepId,projectId,status,claimedOutcome?,verifiedOutcome?,attemptsCount}
AttemptRecord{id,stepId,runId,attemptNumber,status,modelClass?,model?,provider?,tokenUsage?,error?}
ReviewIssueRecord{id,projectId,changeId,severity,category?,status,title,description,resolution?,   ← 复检依据
                 fixStats?,fixFiles?,fixImpact?,fixDiff?,createdAt,updatedAt}                      ← 修复证据快照
VerificationRecord{id,projectId,changeId,runId?,type,status,name,details?,verifierPriority,evidenceIds,evaluatedAt}
MemoryRecord{id,projectId,type,truthLevel,title,content,relatedFiles?,isHumanConfirmed,gitBranch?,tags?,
             scope?('project'|'branch'),sourceTag?('run'|'review'|'sync'|'chat'|'manual'),
             basisSha?,status?('active'|'stale'|'superseded'|'archived'),lastVerifiedSha?,supersededBy?}
RunContextRecord{id=runId,projectDigest,injectedMemories[],stepSummaries[],decisionLog[],headSha?,branch?}
MemoryBaselineRecord{id=`${projectId}|${branch}`,lastSyncedSha?,updatedAt}
ScheduledTaskRecord{id,projectId,name,type('run'|'review'|'summary'|'sync'),title?,description?,
                    intervalMinutes,enabled,lastRunAt?,lastResult?}
ProjectNoteRecord{id,projectId,sha?('working'|summary|提交),title,content,tags?,pinned?,createdAt,updatedAt}
ConfirmedItemRecord{id,projectId,type,forbiddenPaths[],status,createdAt}   ← 已确定约束
```

状态机要点：Run `succeeded` 是合法终态（不是 completed，UI 两名都认）；`failed→queued→running` 两跳；步骤 `interrupted→ready`、`failed/skipped→pending`。

---

## 8. HTTP API 全清单（`/project-control/api/*`，45 条）

**核查链**：`POST /commits`(GET 提交列表) · `POST /commit-detail`(WHAT/LOGIC/RISK LLM+缓存+成本) · `POST /impact-scope`(函数级影响+LLM 逐函数说明+成本) · `POST /review`(评审→issueList 落库，带成本) · `POST /file-diff`(文件对比) · `POST /work-narrative`(轮次叙事，带成本) · `POST /peek`(代码上下文，**路径逃逸 403**)

**执行链**：`POST /runs/start`(建变更+生成编排**不启动**，defaultModelProvider/Id 作全计划默认) · `POST /runs/plan/update`(编辑编排=新版本计划) · `POST /runs/launch` · `GET /runs/detail`(步骤时间线+RunContext) · `POST /runs/resume`(continue|skip-current) · `POST /verify`(验收，真跑 build/test 命令)

**问题链**：`GET /issues`(全量+严重度归一+超期清理) · `POST /issues/status`(含 rejected 判定误报) · `POST /issues/verify`(复检：FIXED/NOT_FIXED/NEW/OPTIMALITY→自动落态+修复证据快照)

**记忆链**：`GET /memories`(全字段+基线+落后数) · `POST /memory` · `POST /memory/confirm` · `POST /memory/sync`(三向判定，核心已抽出为**导出函数 runMemorySync**) · `POST /memory/sync/apply`(标记过时/归档) · `POST /memory/status` · `POST /memory/normalize`

**笔记链**：`GET /notes` · `POST /notes` · `/notes/update`(含 tags/pinned) · `/notes/delete` · `POST /notes/ai-summary`(核心已抽出为**导出函数 runIncrementalAiSummary**：上次总结+新素材→「本次更新」节+合并完整版，旧总结替换)

**例行任务**：`GET /scheduled` · `POST /scheduled`(type 含 sync) · `/scheduled/update`(启停/间隔) · `/scheduled/delete` · `/scheduled/run`(立即执行)

**模型**：`GET /model-config`(当前分配+可选清单) · `POST /model-config`

**其他**：`GET /state`(核心快照；**支持 sessionId/rootPath 按会话解析项目**，纯内存匹配不跑 git) · `POST /bootstrap` · `/analyze` · `/impact` · `/history/status` · `/confirmed`(+remove) · `/fs/list` · `/workspace/register`

**导出共用核心**（调度器 import 自 api-route.ts，避免双份漂移）：`executeReviewForTarget(ctx,service,cwd,project,target,force,changeId)` · `runIncrementalAiSummary(ctx,service,project)` · `runMemorySync(ctx,service,project)`

---

## 9. 构建 / 测试 / 发布

```sh
cd D:\Code\deepseek-harness\dsh-project-insight
pnpm run build        # build.mjs(host lib/index.js) + build-client.mjs(lib/client.js)；esbuild 不查类型
pnpm test             # vitest 27 文件 87 测试（无 key 也全跑；内存库+临时 git 仓+真 json 后端）
pnpm run typecheck    # tsc --noEmit（react/vendor/analysis 三处有既有基线噪音，见 §11）
```

发布流程（业主授权后）：bump package.json 版本 → `pnpm run build && pnpm test` → `git add -A && git commit` → `git tag vX.Y.Z` → `git push origin master vX.Y.Z`。**lib/ 随仓库提交**（远端机器无法本地构建）。

---

## 10. dsh 重启协议（改完服务端必须执行）

```sh
# 杀当前 3080 实例
pid=$(netstat -ano | grep ":3080" | grep LISTEN | head -1 | awk '{print $NF}'); taskkill //PID $pid //F
# 后台启动（隐藏）
node "C:/Users/Administrator/AppData/Roaming/npm/node_modules/@deepseek-ai/dsh/lib/bin.js" \
  --profile web --port 3080 --no-open --trusted-host 192.168.3.111:13080 192.168.3.111:3080 localhost:13080
# 等 /state ready:true
```

业主的 `启动DSH.ps1` 会先杀全部 dsh（包括我们的后台实例）——收到 background task failed 通知是**预期**，重启即可。浏览器验证可用 computer-use（Cent Browser pid 变化，地址 127.0.0.1:3080，cookie 已认证）或 ZCode 内置浏览器（browser-use 技能，自带实例零打扰；IAB 在 localhost 可直接打开），但**不要打扰业主正在用的窗口**。

**0.1.2-rc.1 起 web 面有认证墙**（2026-09-10 升级，业主确认保留）：`GET /` 返回 303「authentication required」；启动日志打印一次性 `http://127.0.0.1:3080/?token=...`（每次启动随机生成）。打开一次该 URL 即换取 **30 天有效、跨重启存活**的 cookie（签名密钥持久，已实测）——业主书签每月开一次新 token URL 即可。命令行验证页面：`curl -c ck.txt "http://127.0.0.1:3080/?token=..." -o /dev/null && curl -b ck.txt http://127.0.0.1:3080/`。注意：`/project-control/api/*` 插件路由**不受**认证墙影响（curl 可直接访问），别把 API 通误判为页面可打开。

---

## 11. 已验证事实与历史事故（防止重蹈覆辙）

| 事实/事故 | 教训 |
|---|---|
| 子代理不挂 agentPresets.mount 就没有文件工具 | agents.create 的 setup 里必须先 await mount(agentCtx) |
| whenIdle() 竞态：followup 未生效时立即返回 | 必须用事件轮询 waitTurn（静默 2.5s/180s 判定） |
| cordis Context 没有 setInterval | 用 Node 原生 setInterval + ctx.effect 托管清理 |
| esbuild 不查类型/引用 | 缺 import 的 ReferenceError 只有真跑才炸（验收按钮曾因此必炸）；改完路由要真调一次 |
| 代码拼接脚本边界判断错曾整段吞掉 6 条路由 | 拼接后必须 `grep -c "routePath === '` 对照全量路由清单（§8 就是清单） |
| `:has()` 祖先匹配钳死整个聊天容器 | 禁用；只按形状特征运行时定位 |
| brand-primary 在深色主题是近白色 | 一切 active 高亮背景（按钮/页签/筛选芯片）用 button-info-fill（两主题都蓝）+ 白字；**禁止 brand-primary 作任何背景**。2026-09-10「页签白块」事故：tab/chip active 用了 brand-primary，深色下白底白字整个消失。对比度引擎已抽取到 src/client/components/theme.ts（themeAwareText），硬编码随主题变化的文字色一律禁止；守卫 grep：`background.*brand-primary` 必须零命中 |
| select 系统外观在深色主题强制白底 | styles.select 自绘外观（appearance:none+SVG 箭头） |
| 中文 grep client bundle 假阴性 | esbuild 转义非 ASCII；用 ASCII 键名验证 |
| npm cache 迁移到 D:\dev-cache 曾掏空 zod/全局包 | 修复手法：npm pack 手动放回 / pnpm store add；业主的 ~/.dsh 和 D:\Code **不是缓存**不可迁移 |
| LLM 网关偶发挂起 | 静默 180s 判停滞进重试；所有等待必须有界（AbortController+固定轮数） |
| run 终态是 succeeded 不是 completed | UI 双名兼容；写代码用 succeeded |
| 单写者存储 | 永远单实例；并发实例会损坏数据 |
| **存储键必须路径安全（json 后端断言 `/^[A-Za-z0-9_-]+$/`）** | LLM 缓存键/记忆基线键曾含 `:` `/` `\|`，写入即 assertSafeKey 抛未捕获异常 fatal 掉整个 dsh（2026-09-10 业主另一台机器崩溃 + 本机潜伏 54 条毒键）。修复：所有复合键经 `safeStorageId()`（sha256 hex，src/store/repository.ts）摘要；`void save()` 一律带 `.catch`。收尾守卫：grep `.save({ id:` 不得出现裸模板键。已中毒的存储文件需停机清理（删键或直接删 analysis 文件——纯可再生缓存） |
| 验收(verification)角色是只读 | 真值校验豁免（analysis/planning/verification），coding/ops 才要求改码 |
| 演示用临时仓 | `D:\dev-tmp\pc-e2e-demo`（含两次全绿 Run 与提炼记忆，可给业主演示；不需要可删） |

**已实测通过的关键链路**（有真实证据，可直接信赖）：Run 全绿到 succeeded ×2（编码真实写文件）、记忆注入（Run 详情可见）、Run→记忆提炼（2 条真实候选）、断点续跑（interrupted→自动恢复）、验收门两走向（node -v 过/exit 1 挂）、ask 暂停+skip 继续（单测）、例行任务 139s 到点真触发、拉取同步三向判定（5 提交 5 候选 3 续命）、复检闭环（4/4 自动解决含修复证据）、peek 安全三态、约束注入（单测）、工作轮次叙事（真实 LLM 产出）。

---

## 12. 遗留事项（下一步可选）

1. **分支合并自动提醒归一**（现在手动按钮）
2. **DAG 并行步骤 / 敏感步骤审批门**（四期，未排期）
3. `src/analysis/` 三个文件的基线 TS 类型噪音（运行正常，从未清）
4. ops 角色完成协议服从率依赖模型（催促已加，非 100%；skip 策略兜底）
5. npm 发布（GitHub 安装已可用；如做：npmjs 注册→npm login→npm publish，包名 dsh-project-control 可用）

---

## 13. 新会话快速上手清单

1. 读本文件 + `AGENTS.md`（工程铁律细节）+ `README.md`（对外说明）
2. `git -C D:\Code\deepseek-harness status --short | wc -l` 必须为 0（本体零改动）
3. `pnpm test` 确认 87/87
4. 业主提需求 → 对照 §3 确认是否已实现 → 开发（补丁方法论 §2.10）→ 构建 → 测试 → **有界**线上验证 → 重启（§10）→ 验证无问题后一次提交（§2.2）
5. 永远不要：改本体、无限等待、频繁碎提交、:has()、新增会话事件、并发第二实例
