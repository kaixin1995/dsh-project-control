# dsh-project-control

**AI 项目认知与开发控制插件** —— [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)（dsh）的仓外插件。让开发者在 AI 大量参与开发后，依然拥有对项目的**理解权、判断权、控制权**。

```text
代码变化 → 功能变化 → 影响范围 → 方案核查 → 执行控制 → 项目记忆 → 学习模式
```

核心竞争力：**变更影响图 + 项目记忆 + 最小侵入分析 + 独立 Review/Verifier**（不是又一份 AI Code Review）。

## 功能总览（首版已全部交付并真机验证）

| 能力 | 说明 |
|---|---|
| 项目认知 | 一键初始化：仓库结构 / 技术栈 / 符号索引 / 近期提交扫描 |
| 变更分析 | `analyze_change`：git diff 证据 + LLM 语义摘要（"这次修改做了什么"），全部结论可溯源到 file:line |
| 影响分析 | `query_impact`：符号引用检索——LSP 语义级优先（lsp_symbol 证据），缺失自动降级文本扫描（file_ast 证据）并标注证据等级 |
| 计划与执行 | `create_plan`（版本化）/ `start_run`：每步骤独立子代理 Attempt 执行，`project_control_step_complete` 完成协议 + 工作区真值校验 + 重试/成本预算，**AI 不能自己宣布成功** |
| 独立 Review | `run_review`：Reasoning 级只读评审 → Review Issue 落盘 |
| 独立验收 | `run_verification`：确定性 build/test → 证据一致性 → LLM 启发 → 人工，**确定性失败不可被 LLM 覆盖** |
| 项目记忆 | `record_memory`（analysis 级）/ 人工确认升级 confirmed / `recall_project` 有据回答；执行时自动注入相关约束上下文 |
| 历史重建 | Legacy Bootstrap：commit 扫描 + 时间窗口/文件重叠聚类 → Imported Change（inferred 置信度）；可选 L1 逐提交 LLM 轻析（`historySummaries` 开关或调用时 `summarize`） |
| Web 工作台 | 官方侧栏不动；**工作台居中**（总览/变更/执行/记忆/历史五页签，真实数据 4s 轮询）+ **聊天最右**；明暗主题自适应；🧭按钮可逆切换工作台⇄官方详情面板 |
| 模型分级 | fast / standard / reasoning / verifier 四级路由映射 + 成本估算与三级预算护栏 |

真值模型贯穿全部数据：`fact`（代码/git/build/test）→ `confirmed`（仅人工）→ `analysis`（LLM，永不自动升级）。

## 安装

要求 dsh ≥ 0.1.1-rc.2（`npm i -g @deepseek-ai/dsh@latest`）。

```sh
# 从本目录安装到任一 profile（web / headless / sdk / 自定义均可）
dsh plugin --profile <name> add /绝对路径/dsh-project-insight
dsh --profile <name> --dump-config   # 验证组合层出现 "# == dsh-project-control"
dsh --profile <name>                 # 启动；web 面打开后侧栏底部点「🧭 工作台」
```

- **web / sdk 面**：存储栈由面自带，开箱即用。
- **headless 面**：0.1.1 起不挂存储栈；需要持久化时在该 profile 的 `cordis.patch.yml` 用户层补三行（见 [cordis.patch.yml](cordis.patch.yml) 内注释模板）。

## 配置

settings 面板 `project-control` 命名空间或 cordis.yml 均可覆盖：

- `modelTiers` — fast / standard / reasoning / verifier 四级模型路由（缺省回落会话当前路由）
- `budgets` — step / run / change 美元预算护栏
- `retry` — 最大尝试次数、退避上下限、模型升级开关
- `bootstrap` — 扫描范围、单次上限、`historySummaries` 逐提交轻析开关
- `buildCommand` / `testCommand` — 确定性验收命令（按项目技术栈配置）
- `analysisMaxTokens` / `analysisTimeoutMs` — 一次性分析上限

## 面向 agent 的说明

本仓库内的自动化会话必须先读 [AGENTS.md](AGENTS.md)——工程铁律（零本体改动、扩展点白名单、客户端打包契约、rc.2 运行时事实）与本体事实库都在那里。新会话入口：[docs/SESSION-HANDOFF.md](docs/SESSION-HANDOFF.md)。

## 文档

- 产品总纲（业主确认）：[docs/product-master-plan.md](docs/product-master-plan.md)
- 技术设计 V1.0（工程权威）：[docs/AI 项目认知与开发控制插件.md](docs/AI%20项目认知与开发控制插件.md)
- 开发任务清单：[docs/development-plan.md](docs/development-plan.md)
- 会话交接：[docs/SESSION-HANDOFF.md](docs/SESSION-HANDOFF.md)

## 许可

随宿主分发策略（MIT，同 deepseek-harness）。
