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

- [x] 立项与设计范围文档：[docs/design-scope.md](docs/design-scope.md)（**待业主审查**，审查通过前不开发）
- [ ] M1 宿主骨架 + git 证据 + `/insight` 变更摘要报告
- [ ] M2 影响三级图 + 侵入核查 + 风险/测试建议
- [ ] M3 项目记忆库 + `/why` + 记忆工具
- [ ] M4 开发笔记 + 学习模式
- [ ] M5 Web UI（客户端打包管线 + 工具卡片 + 侧边面板）
- [ ] M6 自动提醒 + bundle 打包 + `dsh plugin add` 安装验证

里程碑与范围细节见 [docs/design-scope.md](docs/design-scope.md)。

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
