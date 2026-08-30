# 会话交接（SESSION HANDOFF）—— 新会话从这里开始

> 本文件是任何新 agent 会话进入本仓库后的**第一个读取入口**。读完本文件 + 按§三顺序读完文档，即可直接继续开发，无需重新探索。

## 一、这是什么项目

**dsh-project-control**（仓库名 `dsh-project-insight`，本地 git，无远端）：deepseek-harness（dsh）的**仓外插件**——"AI 项目认知与开发控制工具"。产品愿景：变更分析 → 影响图 → 方案核查 → 执行控制 → 项目记忆 → 学习模式，核心是让开发者在 AI 大量写代码后仍拥有项目的理解权、判断权、控制权。

**铁律（违反任何一条即返工）**：
1. **零 dsh 本体改动**——不改本体任何被跟踪文件（含本体 `.agents/notes/`；本体经 `.git/info/exclude` 屏蔽本目录）。
2. **禁止新增 SessionEventMap 事件类型**——聊天卡片只骑核心事件（插件工具 `tool/call`+`tool/result`、命令 `command/run`+`command/done`）。
3. **UI 只用加法插槽**（`conversation.view`/`sidebar.footer.action`/`conversation.session.header.actions`/`tool.call.toolview`/`shell.overlay`），禁 shadow single 槽，禁"改本体加扩展点"的念头。
4. ESM、注册即效果、瀑布必 `next()`、可配置不硬编码、UI 文案走 locale 词典。

## 二、当前状态（2026-08-30）

- **T0（脚手架与前置验证）与 T1（领域模型与存储）已全部完成并通过完整单测**。
- 阶段：T0/T1 已完成，**下一步 = 从 T2.1（Git 变更分析与适配层）开始执行**（见 [development-plan.md](development-plan.md) §三）。
- 业主已确认：V0.4 产品总纲、V1.0 技术设计（含三处工程修正，见 development-plan §一 R1–R7）。
- 首版范围已锁定（development-plan §六）。

## 三、文档阅读顺序（必读，按序）

| 顺序 | 文件 | 角色 |
|---|---|---|
| 1 | [AGENTS.md](../AGENTS.md) | 工程铁律 + 扩展点白名单 + 客户端打包契约 |
| 2 | [development-plan.md](development-plan.md) | **开发任务清单（唯一执行依据）**：T0–T11 每任务产出/完成标准/测试 + 修正决定 R1–R7 + 测试策略 |
| 3 | [AI 项目认知与开发控制插件.md](AI%20项目认知与开发控制插件.md) | V1.0 技术设计（161 节，工程权威：数据模型/状态机/Retry/Router/Evidence/Impact/Review/Verification/Bootstrap/§158 边界表）。注意其中 §118–124、§127、§154-Phase0 已被 R1–R3 修正 |
| 4 | [product-master-plan.md](product-master-plan.md) | V0.4 产品总纲（业主确认，产品方向权威） |
| 5 | （参考）[v04-section-mapping.md](v04-section-mapping.md)、[design-scope.md](design-scope.md) | 历史映射；design-scope 的存储/UI/Plan 决策已被 V1.0 取代 |

**dsh 本体知识**：本体仓库根的 `AGENT_PROJECT_GUIDE.md`（本地未跟踪文件，D:\Code\deepseek-harness\AGENT_PROJECT_GUIDE.md）——本体架构总览 + 插件开发指南 + 仓外约束，一文件即可恢复背景。

## 四、环境速查

- 本体：`D:\Code\deepseek-harness`（Windows/Git Bash；`pnpm install` 已就绪）
- 本仓库：`D:\Code\deepseek-harness\dsh-project-insight`（独立 git；identity: kaixin1995）
- 开发加载：从本体根 `pnpm dsh --profile headless --patch <绝对路径>/dsh-project-insight/cordis.yml "..."`；web 同理（端口 3080）
- 无 key 测试：`pnpm mock:llm`（本体的 mock LLM 服务）
- 客户端构建：`node build-client.mjs --watch`（esbuild 复刻惰性 CJS 工厂格式；本体 HMR 自动重载）
- 安装验证（T11）：`dsh plugin --profile demo add <绝对路径>` → `dsh --profile demo --dump-config`
- 模型配置注意：自定义路由需声明 `contextWindow`，否则本体自动压缩静默失效（详见本体 AGENT_PROJECT_GUIDE §8）

## 五、新会话工作流

1. 读完 §三文档 → 2. 打开 development-plan.md 找到当前未完成的最早任务 ID → 3. 按"产出/完成标准/测试"执行 → 4. 完成后在本文件§二更新状态、勾掉 README 里程碑 → 5. git commit（本仓库）。
- 提交规范：`feat|fix|docs|test|chore(scope): 摘要`；一个任务一提交为宜。
- 遇到与文档冲突的本体行为：**以验证为准**，先小实验证伪（仿 T0 系列），把结论补进 AGENTS.md"已查明的本体事实"。
- 禁止事项重申：不向本体仓库提交任何内容；不新增会话事件类型；不 shadow single 插槽。
