# dsh-project-insight

AI 项目变更认知与核查工具 —— [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)（dsh）的**仓外插件**。

## 定位

> AI 可以帮助我们写更多代码，但开发者必须拥有比以前更强的项目认知能力。

本插件围绕 **代码变更、项目理解、影响分析、方案核查、开发学习和长期项目记忆**，形成一条完整链路：

```
代码变化 → 功能变化 → 影响范围 → 方案核查 → 项目记忆
```

核心竞争力不是又一份 AI Code Review，而是「**变更影响图 + 项目记忆 + 最小侵入分析**」。

## 与 dsh 本体的关系

- **零本体改动**：本插件只通过 dsh 文档化扩展点工作（工具、命令、prompt section、一次性 LLM 调用、subprocess/LSP、`ctx.fs`、`ctx.webServer`、客户端插槽系统）。
- 本仓库位于 `deepseek-harness/` 仓库根目录下仅为开发便利（`pnpm dsh --patch <绝对路径>` 从本体根启动、tsx 源码加载需要向上解析本体 workspace 的 `node_modules`）；本体通过 `.git/info/exclude` 屏蔽本目录，两边 git 互不可见。
- 本仓库目前是**纯本地仓库**（无 remote，不推送云端）。

## 仓库状态

- [x] 产品总纲（业主确认）：[docs/product-master-plan.md](docs/product-master-plan.md)（V0.4 全文收编）
- [x] 技术设计（工程权威）：[docs/AI 项目认知与开发控制插件.md](docs/AI%20项目认知与开发控制插件.md)（V1.0，161 节；三处仓外约束修正见开发计划 R1–R3）
- [x] **开发任务清单：[docs/development-plan.md](docs/development-plan.md)**（T0–T11 全任务分解 + 测试清单；**当前执行依据**）
- [x] 新会话入口：[docs/SESSION-HANDOFF.md](docs/SESSION-HANDOFF.md)
- [x] 历史参考：[docs/v04-section-mapping.md](docs/v04-section-mapping.md)、[docs/design-scope.md](docs/design-scope.md)（部分被 V1.0 取代）
- [x] **T0 前置验证与脚手架**（已完成：脚手架/服务冒烟/客户端bundle/storage-domain/worktree验证）
- [x] **T1 领域模型与存储**（已完成：12种Branded ID/ULID/状态机矩阵/Truth model/CAS/三域Repository/ProjectService）
- [x] **T2 Git 变更分析**（已完成：GitAdapter/WorkspaceSnapshot/baseRevision追踪/EvidenceManager/ChangeService/analyze_change工具/insight命令）
- [x] **T3 影响分析**（已完成：GenericLanguageAnalyzer/ProjectGraph/4级ImpactEngine/ContractAnalyzer）
- [ ] **T4 执行运行时** ← 下一步（development-plan §三）
- [ ] T5 模型路由/成本 → T6 Review/Verification → T7 客户端 UI → T8 Legacy Bootstrap（简化）= **首版**
- [ ] T9 记忆 → T10 学习 → T11 打包安装 →（后置：C# Roslyn 宿主、并行 Plan）

任务、完成标准与测试细节见 [docs/development-plan.md](docs/development-plan.md)。

## 开发与安装（规划）

```sh
# 开发循环（在本体仓库根目录执行；需本体已完成 pnpm install）
pnpm dsh web --patch /绝对路径/deepseek-harness/dsh-project-insight/cordis.yml

# 安装为正式 bundle（M6 之后）
dsh plugin --profile <name> add /绝对路径/dsh-project-insight
dsh --profile <name> --dump-config   # 验证层
```

## 给 agent 的说明

本仓库内的自动化会话请先读 [AGENTS.md](AGENTS.md) —— 它规定了不可违背的工程铁律（零本体改动、扩展点白名单、已验证的仓外插件硬约束）。
