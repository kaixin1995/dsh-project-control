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
- [x] 工程实施案：[docs/design-scope.md](docs/design-scope.md)（五阶段映射，**待业主审查**，审查通过前不开发）
- [x] 总纲逐节映射：[docs/v04-section-mapping.md](docs/v04-section-mapping.md)（101 节穷尽，含 3 处已论证的字面差异）
- [ ] P1 "AI 到底改了什么"：项目识别 + 老项目轻量初始化 + Change + 分析管线 + 记忆库 + Web 首块 UI
- [ ] P2 "过程怎么控制"：状态机 + 已确定/冲突检测 + 执行中心 + Plan 对接本体
- [ ] P3 "真的做好了吗"：Reviewer/Verifier + Review Issue + 模型等级 + 成本统计
- [ ] P4 "项目为什么变成今天这样"：完整 Git 历史重建 + 演化 + 时间线
- [ ] P5 "开发者理解了吗"：学习模式全家桶

阶段与范围细节见 [docs/design-scope.md](docs/design-scope.md)。

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
