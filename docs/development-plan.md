# dsh-project-control 开发计划（任务分解 · V1）

> 状态：**可执行**。本文档是唯一开发任务清单，按 T0→T11 顺序推进，首版交付范围见 §六。
> 权威链：产品 = [product-master-plan.md](product-master-plan.md)（V0.4）；**工程技术设计 = [AI 项目认知与开发控制插件.md](AI%20项目认知与开发控制插件.md)（V1.0，161 节，工程权威）**；历史参考 = [design-scope.md](design-scope.md)（部分被 V1.0 取代）。
> 铁律：零 dsh 本体改动；插件经 `dsh plugin --profile <name> add` 安装到 **Harness home 的 profile**（不是本体源码仓库）。

---

## 一、评审修正决定（对 V1.0 文档的三处硬伤 + 三项决策，开发中必须遵守）

| # | V1.0 原文 | 修正 | 原因 |
|---|---|---|---|
| R1 | §118–124 新增 `project-control/*` SessionEventMap 事件 | **禁止新增会话事件类型**。聊天卡片（Run/Review/Verification Card）一律骑在**核心事件类型**上：插件工具的 `tool/call`+`tool/result`（meta 携带结构化卡片数据）、命令的 `command/run`+`command/done`。ConversationNode 匹配这些类型回放 | 本体 `KNOWN_SESSION_EVENT_TYPES` 只扫描本体包；仓外事件类型重启后日志被 `assertEventsSupported` 整体拒读（已源码验证） |
| R2 | §127 "必要时修改 Harness Core 增加通用 UI 扩展点" | **删除该备选路径**。UI 只用已验证的加法插槽：`conversation.view`（主区域整页页签，范本 ui-trajectory）、`sidebar.footer.action`、`conversation.session.header.actions`、`tool.call.toolview`、`shell.overlay`。禁 shadow single 槽 | 业主铁律零本体改动；插槽已验证足够（2026-08-30）。无会话全屏用 `shell.overlay`；默认落地视图（chat）不可改也不改 |
| R3 | §154 Phase 0 在本体 `.agents/notes/proposed/` 建 Agent Note | **取消**。设计记录 = 本仓库 `docs/` | 写本体被跟踪目录即改本体 |
| R4 | §82 C# Roslyn 分析宿主（.NET 8 外部进程） | **后置**到 T3.x 可选阶段；首版用 Generic Analyzer（rg + `ctx.lsp` 可选 + git + LLM），接口按 V1.0 §79 预留 | Roslyn 宿主是完整 .NET 子项目；V1.0 §84/§155 自身允许降级 |
| R5 | §38 worktree 隔离 | worktree 必须创建在**目标项目根内**（默认 `<root>/.worktrees/<runId>/`） | 超出项目根会被沙箱 workspace-write 拒绝 |
| R6 | 命名 | 服务键 `ctx.projectControl`、设置 namespace `project-control`、npm 包 `dsh-project-control`（客户端 `dsh-client-project-control`）；本仓库名 `dsh-project-insight` 保留（历史目录名，不影响包名） | 统一按 V1.0 文档命名 |
| R7 | §4–10 存储走 storage-domain | 采纳（取代早期 `.insight/` 文件方案）。注意：数据落 **DSH_HOME**（宿主本地、不进目标项目 git）——单机使用符合预期；目标项目内的长期文档经 T9.3（Agent-Note 式文件）补回仓库 | V1.0 §4 明确禁止自建 SQLite |

## 二、开发环境与循环

```sh
# 目录：D:\Code\deepseek-harness\dsh-project-insight\（独立本地 git 仓库）
# 开发加载（从本体仓库根执行；cordis.yml 用绝对 .ts 路径，tsx 直跑源码）
pnpm dsh --profile headless --patch /绝对路径/dsh-project-insight/cordis.yml "..."
pnpm dsh web --patch /绝对路径/dsh-project-insight/cordis.yml     # http://127.0.0.1:3080
pnpm mock:llm                                                     # 本体自带 mock LLM（无 key 集成测试）
# 单测（本仓库内）
npx vitest run
# 客户端构建（自带 watcher；本体宿主 HMR 检测 lib/client.js 变化自动热重载页面）
node build-client.mjs --watch
# 安装验证（T11）
dsh plugin --profile demo add /绝对路径/dsh-project-insight
dsh --profile demo --dump-config
```

包结构（MVP 六包内聚，按 V1.0 §131/§132）：

```
src/
├── domain/      类型、ID(ULID+Brand)、状态机、Truth model、schema
├── store/       三个 storage-domain（core/analysis/history）、Repository、artifact 区
├── git/         scanner、diff、history、workspace snapshot、worktree
├── analysis/    evidence、graph、impact、contracts、language registry(generic)
├── runtime/     plan、run、scheduler、retry、model router、executor、review、verification
├── memory/      memory、agent-notes 集成、context builder
├── learning/    concept、cross-language、summary
├── plugin/      组合入口（service/tools/commands 三个插件行）
└── client/      Web UI（dsh.client 双入口）+ api-route
build-client.mjs  esbuild 复刻惰性 CJS 工厂格式（契约见 AGENTS.md）
```

---

## 三、任务分解

> 每个任务含：产出 / 完成标准 / 测试。标注 ⚙ 的为 R1–R7 修正落点。

### T0 前置验证与脚手架（先证伪，再铺开）

| ID | 任务 | 产出与完成标准 | 测试 |
|---|---|---|---|
| T0.1 | 仓库脚手架 | package.json（`dsh-project-control`，type:module，exports 含 `./client`）、tsconfig、vitest 配置、目录骨架、cordis.yml（绝对路径开发 overlay） | `npx vitest run` 空套件通过；tsc 无错 |
| T0.2 | 宿主插件冒烟 | 空 `plugin/service.ts`（注册 `ctx.projectControl` 空服务）+ cordis.yml 行；`pnpm dsh --profile headless --patch` 启动 | 启动日志出现插件名，退出码 0 |
| T0.3 | 客户端 bundle 冒烟 ⚙R2 | `build-client.mjs`（esbuild，逐字 wrapper，externals=8 平台词）；空 client 插件注册 `sidebar.footer.action` 入口 | web 启动后侧边出现入口（手动+截图归档 `docs/evidence/`） |
| T0.4 | storage-domain 路由验证 ⚙R7 | `defineDomain` 三域定义 + open；确认默认组合下路由可用，不可用则经 bundle patch 增补 storage 后端行（注意：patch 整行替换 config，须完整重述） | 单测：三域写入→读取 round-trip；版本不匹配拒绝 |
| T0.5 | worktree/沙箱验证 ⚙R5 | 在临时项目根 `.worktrees/x` 创建 worktree 并经 `ctx.fs` 写入 | e2e：workspace-write 下写入成功；项目根外写入被拒（对照断言） |

### T1 领域模型与存储（V1.0 §5–18）

| ID | 任务 | 产出与完成标准 | 测试 |
|---|---|---|---|
| T1.1 | ID 体系 | 全部 12 种 Branded ID + 零依赖 ULID（单调、可排序） | 单测：1000 个 ID 唯一且升序；brand 编译期隔离 |
| T1.2 | 状态机 | Change(9)/Run(10)/Step(11)/Attempt 状态 + 合法迁移表 + `assertNever` 兜底 | 单测：全迁移矩阵穷举——合法通过、非法抛错 |
| T1.3 | Truth model + CAS | `TruthLevel` 工具函数；`revision` 比较交换（expectedRevision 不符即拒） | 单测：旧 revision 写入被拒且计数不变 |
| T1.4 | 三域 Repository | core/analysis/history 域 schema v1；CRUD + 按 projectId 索引 | 单测：round-trip、域间隔离、严格版本拒绝 |
| T1.5 | ProjectService | git 检测、`RepositoryIdentity`（root+commonDir+origin+根提交指纹）、移动/重克隆复用提示（不自动合并） | git fixture：clone→移动目录→识别同指纹 |

### T2 Git 变更分析——"AI 改了什么"（V1.0 §73–77、§93–94）

| ID | 任务 | 产出与完成标准 | 测试 |
|---|---|---|---|
| T2.1 | git 适配层 | `ctx.subprocess.spawn` 封装 status/diff/log/show/rev-parse；collect 上限 + lossy 报错；cwd=沙箱根∩会话 cwd | git fixture：rename/delete/merge/dirty/超大 diff 截断 |
| T2.2 | WorkspaceSnapshot | branch/headSha/statusHash/diffHash；divergence 判定 | fixture：同状态 hash 稳定；外部改动→diverged |
| T2.3 | baseRevision 范围分析 | Change 创建时记 base；分析 base→current（用户中途 commit 范围不丢） | fixture：base 后 commit 两次，范围含两 commit |
| T2.4 | Evidence 基础 | Evidence 模型（8 源/12 类型/locator）；已提交内容只存引用；未提交 diff 存 patch+hash；超大 patch 转内容寻址 artifact 区 | 单测：哈希寻址、超限转存、artifact 元数据正确 |
| T2.5 | ChangeService + 首批工具/命令 | Change CRUD；`/insight` 命令（直接跑管线）；`analyze_change` 工具（LLM 摘要：做了什么/模块/行为增删）；结果落 analysis 域 | 集成（mock:llm）：命令产物入库、工具输出含摘要+证据引用 |

### T3 影响分析——"改了影响什么"（V1.0 §79–92）⚙R4

| ID | 任务 | 产出与完成标准 | 测试 |
|---|---|---|---|
| T3.1 | LanguageAnalyzer 接口 + generic 实现 | 接口按 V1.0 §79 全量预留；generic=rg 引用检索 + `ctx.get('lsp')` 可选 findReferences + git；缺失降级并标注证据等级 | fixture：符号引用命中/漏检标注 |
| T3.2 | Project Graph | 节点 10 类/边 11 类，每边绑 Evidence | 单测：图构建、间接遍历深度上限（防爆图） |
| T3.3 | Impact Engine | direct（图确定性）/indirect（限深遍历）/potential（Reasoning+证据+置信度）/unverifiable 四级 | fixture 图断言 + mock LLM 输出校验（必须带 evidenceRefs） |
| T3.4 | Contract Analyzer（generic） | API/DTO/公共方法/配置/消息模式的启发式识别；契约触碰→风险升级 | fixture：已知契约样本全部命中 |
| T3.5 | （可选后置）C# Roslyn 宿主 | `language-csharp` 适配 + .NET 8 JSON-RPC 进程 | 独立里程碑，不阻塞首版 |

### T4 执行运行时（V1.0 §19–46）

| ID | 任务 | 产出与完成标准 | 测试 |
|---|---|---|---|
| T4.1 | Plan 对象 | Plan/PlanStepDefinition；版本化（不覆盖，Change 存 currentPlanId） | 单测：V1→V3 链完整可溯 |
| T4.2 | Run/Step/Attempt 存储 | 全状态持久化；Recovery Scanner：无活 Job 的 running→interrupted | 崩溃恢复测试：杀进程→重启→已完成 Step 保留、running→interrupted、续跑建新 Attempt |
| T4.3 | jobs 集成 | JobKindMap 并入 `project-control-run/bootstrap/analysis`；Run=持久身份、JobId=运行时身份（映射表） | 单测：Job 完成/取消正确回写 Run |
| T4.4 | Scheduler | DAG 就绪判定（依赖全 succeeded/skipped→ready）；首版 UI 默认生成顺序 Plan | 单测：DAG 矩阵（并行/阻塞/跳过传播） |
| T4.5 | Attempt 执行器 | 每 Attempt 一个 `ctx.agents.create` 子代理（per-child model）；`setup()` 注册 `project_control_step_complete` 工具；构造 StepContext（预算内）注入；claimedOutcome≠成功 | 集成：mock 下完成协议；对抗：声称完成但工作区无变化→Step 不得置 succeeded |
| T4.6 | Retry 引擎 | full-jitter 指数退避；Retry-After 优先；ErrorClass 15 类分类；可重试集/诊断集分派；升级开关 | 单测（fake clock+random）：退避序列精确、上限停止、Retry-After 覆盖 |
| T4.7 | 暂停/恢复/取消 | 编排级 pause/cancel（含 `agent.cancel()` 转发）；恢复前 divergence 复检→blocked(workspace-diverged) | 状态机 + fixture：恢复时外部改动被阻断 |
| T4.8 | worktree 隔离 ⚙R5 | `current`/`isolated-worktree` 两模式；建/清/最终 diff 生成 | fixture：隔离 run 不污染主工作区；diff 完整 |

### T5 模型路由与成本（V1.0 §62–72）

| ID | 任务 | 产出与完成标准 | 测试 |
|---|---|---|---|
| T5.1 | ModelClass + Settings | fast/standard/reasoning/verifier 四级映射；注册 `project-control` settings namespace（本体 `installSettingsSection`） | 单测：配置缺省回落会话路由；非法配置加载期报错 |
| T5.2 | ModelRouter | 输入信号→等级+reason；策略 economy/balanced/quality/custom | 单测：信号组合规则表穷举 |
| T5.3 | 升级策略 | 连续失败/低置信→升级；`ModelEscalationLimit` 到顶→waiting-human | 单测：fake 失败序列 |
| T5.4 | 成本核算 | 会话 usage 聚合按 Attempt/Run/Change 分账；价格快照（含生效日期）入库存证；UI 一律 "Estimated"；三级预算→waiting-human | 单测：调价后历史成本不变（用旧快照） |

### T6 Review 与 Verification（V1.0 §103–112、§142–144）

| ID | 任务 | 产出与完成标准 | 测试 |
|---|---|---|---|
| T6.1 | ReviewIssue | 模型 + open→fixing→resolved/accepted/rejected 流转（re-review 更新不删除） | 单测：状态机 + 不可变性 |
| T6.2 | Reviewer | 只读权限子代理（注入证据=diff+static+impact+约束+历史风险）；Issue 落库 | 集成（mock）：产出 Issue 带证据引用；对抗：无证据 Issue 被拒 |
| T6.3 | Acceptance Matrix | Criterion（7 类型×3 verifier）/VerificationItem/Verification 生成 | 单测：由需求+确认项+验收标准生成矩阵 |
| T6.4 | Verifier 优先级 | deterministic→evidence→llm→human 顺序；**LLM 不得覆盖确定性失败** | 对抗测试①：声称完成+零文件变化→fail；②：代码在+build fail→fail |
| T6.5 | Commit 关联复核 | commit 时记 SHA↔Change↔Run↔Verification；commit 后重算 tree hash 比对验收版本 | fixture：verify 后又改两行→不一致告警 |

### T7 客户端 UI（V1.0 §123–126）⚙R1/R2

| ID | 任务 | 产出与完成标准 | 测试 |
|---|---|---|---|
| T7.1 | 客户端骨架 | `dsh.client` 双入口；locale（zh/en）；宿主侧 api-route（`/project-control/api/*` + 自复刻 Origin/Host 围栏） | 路由测试：无 Origin/跨 Host→403；正常→200 |
| T7.2 | 项目总览页 | `conversation.view` 页签：项目状态/当前 Change/待 Review/待确认/高风险 | 手动 + 数据快照 |
| T7.3 | Change Workbench | 页签内多区：概览/需求/已确定/Plan/执行/影响/风险/测试/Review/Verification/笔记 | 手动清单（逐区走查） |
| T7.4 | Execution Center | 运行中/等待/重试/验证/失败 聚合视图（api-route 轮询，进度不进会话日志 ⚙R1） | 手动：进度实时、刷新可恢复 |
| T7.5 | 聊天卡片（回放安全）⚙R1 | ConversationNode 匹配**核心事件**（插件工具 tool/call+result 的 meta、command/run+done）渲染 Run/Review/Verification Card | 回放测试：重载页面三卡正确恢复 |
| T7.6 | 工具卡片 toolview | `tool.call.toolview` 按 `analyze_change`/`project_control_step_complete` 等注册 | 回放 + 手动 |

### T8 Legacy Bootstrap 简化首版（V1.0 §95–102）

| ID | 任务 | 产出与完成标准 | 测试 |
|---|---|---|---|
| T8.1 | 枚举+断点 | commit 枚举（first-parent 主线，merge 作边界）；每 100 commit checkpoint | 断点续跑测试：中断→续→不重不漏 |
| T8.2 | L0/L1 分层 | L0 纯 git 事实零 LLM；L1 Fast 逐 commit 一句话（输入≤2KB 预算） | 批处理测试（mock）：预算超限自动降级仅 L0 |
| T8.3 | 聚类 | 时间+文件重叠+模块特征→ImportedChange（confidence=inferred，标 Imported 不冒充原生） | fixture 聚类断言（构造 A–E 五 commit 场景归一） |
| T8.4 | 确认升级 | inferred→confirmed 人工操作流 | 状态流转单测 |

### T9 记忆与上下文（V1.0 §113–117、§148–149）

| ID | 任务 | 产出与完成标准 | 测试 |
|---|---|---|---|
| T9.1 | MemoryService | MemoryItem（scope/truthLevel/type/status）；promotion：fact 自动、analysis 候选、**confirmed 仅人工** | 规则单测（LLM 产出永不成 confirmed） |
| T9.2 | ContextPacket | 相关性检索（模块/Feature/历史）+ token 预算构造 | 单测：预算截断保序 |
| T9.3 | Agent-Note 集成 | 重要决策建议在**目标项目**生成 `.agents/notes/` 式文档；Memory 存路径引用 | 生成阈值规则单测（普通 bug 不生成） |
| T9.4 | 历史风险提醒 | 修改高频事故模块时注入提醒 | 集成：触发条件断言 |

### T10 学习（V1.0 §145–147）

| ID | 任务 | 产出与完成标准 | 测试 |
|---|---|---|---|
| T10.1 | ConceptEncounter | 消费现成分析产物；understood 仅用户确认 | 规则单测 |
| T10.2 | 学习输出 | 跨语言解释（主语言↔项目语言映射）/ Review 教学 / Change 学习总结 | mock 输出结构校验 |

### T11 打包与安装

| ID | 任务 | 产出与完成标准 | 测试 |
|---|---|---|---|
| T11.1 | bundle 化 | `dsh.bundle.patch`；裸名行全部为自身生产依赖 ⚙；cordis.patch.yml 插入 service/tools/commands/insight-ui 四行 | `dsh plugin --profile demo add` 成功；`--dump-config` 见层 |
| T11.2 | 安装验证 | demo profile 启动 web+headless 全链路 | 手动清单 + 冒烟脚本 |

---

## 四、测试策略总章（对应 V1.0 §157 + 补充）

| 层 | 工具/方法 | 覆盖 |
|---|---|---|
| Domain Unit | vitest 纯函数 | 全部状态机矩阵、CAS、Truth model、ULID |
| Retry | fake clock + fake random + fake provider | 退避序列、Retry-After、上限、升级 |
| Crash Recovery | 子进程真实杀死 + 重启 | Step 保留/不重复提交/不误判完成 |
| Git Fixture | 临时仓库（commit/branch/merge/rename/delete/dirty） | T2/T8 全部 git 依赖任务 |
| Verifier 对抗 | 伪造"已完成" | 零变化→fail；build fail→fail；LLM 不得翻案 |
| UI 回放 | 重载页面 | Run/Review/Verification 卡经核心事件恢复 ⚙R1 |
| 集成 | `pnpm mock:llm` + `--profile headless --patch` | 工具/命令/分析管线全链路（无 key） |
| 手动 UI | web 走查清单（存 `docs/evidence/` 截图） | 页签/工作台/执行中心/卡片 |
| 安装 | demo profile | bundle 解析、层序、启动 |

## 五、依赖与顺序

T0 → T1 → T2 →（T3 ∥ T4 可并行）→ T5 → T6 → T7（T7.1–7.2 可在 T4 后提前做骨架）→ T8 → T9 → T10 → T11。
首版（对外可用）= T0–T7 + T8 简化版；T9/T10 紧随；T3.5（Roslyn）与 T11 完整发布为后续。

## 六、首版交付范围（= V1.0 §155 + 修正）

Project / Change / ConfirmedItem / Git Diff / WorkspaceSnapshot / Evidence / 基础 Impact（generic analyzer）/ Plan / Run / Step / Attempt / Job Runtime / Retry / Model Router / Review / Verifier / Change Workbench + 简化 Legacy Bootstrap（扫描+摘要+基础 Imported Change）。
明确不含：Roslyn 深度分析、并行 Plan、学习全家桶（接口预留）。
