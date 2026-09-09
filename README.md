# dsh-project-control

**AI 项目认知与开发控制插件** —— [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)（dsh）的仓外插件。让开发者在 AI 大量参与开发后，依然拥有对项目的**理解权、判断权、控制权**。

```text
代码变化 → 功能变化 → 影响范围 → 方案核查 → 复检闭环 → 执行控制 → 项目记忆 → 学习笔记
```

核心竞争力：**变更影响图 + 函数级影响说明 + 项目记忆 + 最小侵入分析 + 独立 Review/Verifier + 复检闭环**（不是又一份 AI Code Review）。

## 工作台导览（web 面六页签）

| 页签 | 内容 |
|---|---|
| **提交核查** | 核心页：顶部多选提交（含未提交改动）→ 改了什么 / 实现逻辑 / 风险点解读 → 影响范围图（哪些函数被改、调用方受何影响，附 LLM 逐函数说明）→ 最优性核查（结构化中文问题清单）→ 文件级高亮 diff 对比（默认折叠）→ 一键记笔记 |
| **项目总览** | 项目档案 / 引导检查点 / 证据流 / 已确定约束（AI 禁改拦截） |
| **执行中心** | 中控驾驶舱：计划确认页（每步角色/模型/失败策略可调）→ 后台子代理逐步执行 → Run 详情时间线（步骤/模型/成本/注入上下文/决策日志）→ 暂停问人/恢复 → **例行任务**（定时评审/总结/执行） |
| **Review 问题** | 全项目问题看板：按级别统计筛选、按状态过滤；**复检闭环**（见下）；附验收记录 |
| **笔记与记忆** | 项目笔记（标签 / 置顶 / 搜索 / 编辑痕迹）+ 增量 AI 学习总结 + **项目记忆**（血缘 / 有效性状态 / 待确认队列 / 分支作用域 / 拉取同步）+ 学习概念 |
| **设置** | 四类任务（解读 / 最优性核查 / 轻析 / 验收）的模型分配可视化 + 插件版本号 |

所有列表按项目隔离（会话工作区决定当前项目，跨项目数据不串显）。

### 复检闭环（Review 问题如何算「已解决」）

问题**不允许人工标记已解决**。修改代码后点「🔍 复检」，系统对该评审目标自动执行：

1. 取 `git diff <评审基线>..当前`（提交评审以该提交为基线，工作区评审以 HEAD 为基线）；
2. 逐条判定原问题 FIXED / NOT_FIXED（必须引用差异中的具体变化）；
3. 对当前改动做正向复审（正确性 / 错误处理 / 并发 / 资源泄漏 / 安全）+ 最优性与最小侵入评价；
4. 扫描是否引入新问题（发现即自动登记）。

只有判定 FIXED 才自动置为已解决（卡片保留复检依据，并附**修复详情**：涉及文件、改动符号与全仓库调用点、相对基线的着色 diff）；未修复的保持待处理并附「仍未修复」原因。已解决问题默认保留 7 天后自动清理（`resolvedIssueRetentionDays` 可配，`0` 为永久保留）。评审确有误报时可「判定误报」（rejected，与已解决是两回事）。

### AI 学习总结是增量式的

每次「AI 总结笔记」都会带上一次总结 + 自上次以来的新素材（新提交 / 新笔记 / 新记忆 / 新评审问题），先输出「## 本次更新」差异节，再输出合并去重后的完整总结；旧总结被替换（一份活文档，不堆积雷同副本）。

## 能力总览

| 能力 | 说明 |
|---|---|
| 提交核查 | 提交（多选）或未提交改动 → WHAT/LOGIC/RISK 解读 + 函数级影响 + 最优性核查 + 文件 diff |
| 影响分析 | 符号引用检索（LSP 语义级优先，降级文本扫描并标注证据等级）；函数级「改了什么、调用方受何影响」逐条说明 |
| 结果持久化 | 两层 LLM 缓存（内存 + SQLite 快照，按 diff 哈希 + 提示版本 + 模型键控）；调用方（git grep）每次实时重扫；页面上「重新生成」强制刷新 |
| 独立 Review | `run_review` 与页面评审产出统一落盘 Review Issue（严重度 / 分类 / 证据 / 建议），重新评审替换旧记录 |
| 独立验收 | 确定性 build/test → 证据一致性 → LLM 启发 → 人工；**确定性失败不可被 LLM 覆盖** |
| 计划与执行 | 编排 DSL：每步带**角色**（分析=fast / 操作=fast / 开发=standard / 规划=reasoning / 验收=verifier，可单步覆盖模型）+ 验收标准 + **失败策略**（重试升级 / 跳过 / 暂停问人）；上下文组装器按角色注入项目记忆与 RunContext 任务工作记忆；真值校验（**AI 不能自己宣布成功**）+ 停滞超时 + 断点续跑 + 预算护栏 + 强制收尾验收门 + Run→记忆提炼 |
| 已确定约束 | 人工确认的需求/约束/禁改路径；AI 写禁改路径在 `tools/pre-execute` 被拒（按项目根限定，相对/绝对路径均可） |
| 项目记忆 | 带生命周期的活知识：血缘（基于哪个提交）/ 来源（执行提炼·核查沉淀·拉取同步·手动）/ 有效性状态（疑似过时·已归档）/ **分支作用域**（主干全分支 vs 分支隔离，合并归一）；`record_memory`（inferred 级，LLM 启发式）/ 人工确认升级 confirmed；执行注入按分支隔离；**拉取同步**（基线..HEAD 三向判定：失效提案 + 新候选 + 自动续命）；例行任务定时触发 |
| 历史重建 | commit 扫描 + 时间窗口/文件重叠聚类 → Imported Change；可选 L1 逐提交轻析 |
| 模型分级 | fast / standard / reasoning / verifier 四级路由（设置页可视化分配）+ 成本估算与三级预算护栏 |

真值模型贯穿全部数据：`fact`（代码/git/build/test）→ `confirmed`（仅人工）→ `analysis`（LLM，永不自动升级）。

## 安装

要求 dsh ≥ 0.1.1-rc.2（`npm i -g @deepseek-ai/dsh@latest`）。

```sh
# 方式一：从 GitHub 安装（推荐；仓库内置预构建产物，目标机器无需构建）
dsh plugin --profile web add github:kaixin1995/dsh-project-control            # 跟随 master
dsh plugin --profile web add github:kaixin1995/dsh-project-control#v0.2.2     # 锁定版本（分享时推荐）

# 方式二：本地目录
dsh plugin --profile web add /绝对路径/dsh-project-insight

dsh --profile web --dump-config   # 验证组合层出现 "# == dsh-project-control"
dsh --profile web                 # 启动；web 面打开后侧栏底部点「🧭 打开工作台」
```

- **web / sdk 面**：存储栈由面自带，开箱即用。
- **headless 面**：0.1.1 起不挂存储栈；需要持久化时在该 profile 的 `cordis.patch.yml` 用户层补三行（见 [cordis.patch.yml](cordis.patch.yml) 内注释模板）。
- **单机单实例**：存储为单写者 SQLite，同一台机器只运行一个 dsh 实例。

## 配置

settings 面板 `project-control` 命名空间或 cordis.yml 均可覆盖（模型分配也可直接在工作台「设置」页修改并即时生效、持久化）：

- `modelTiers` — fast / standard / reasoning / verifier 四级模型路由（缺省回落会话当前路由）
- `budgets` — step / run / change 美元预算护栏
- `retry` — 最大尝试次数、退避上下限、模型升级开关
- `bootstrap` — 扫描范围、单次上限、`historySummaries` 逐提交轻析开关
- `buildCommand` / `testCommand` — 确定性验收命令（按项目技术栈配置）
- `analysisMaxTokens` / `analysisTimeoutMs` — 一次性分析上限
- `resolvedIssueRetentionDays` — 已解决评审问题保留天数（默认 7，超期自动清理；`0` 永久保留）
- `stepTimeoutMs` — 单次步骤尝试的停滞超时（默认 10 分钟，超时判失败进入重试）
- `finalVerificationGate` — Run 结束是否强制通过确定性 build/test 收尾验收（默认开）
- `autoResumeRuns` — 启动时自动恢复被中断的 Run（断点续跑，默认开）
- `scheduledTasksEnabled` — 例行任务调度器开关（默认开）

## 面向 agent 的说明

本仓库内的自动化会话必须先读 [AGENTS.md](AGENTS.md)——工程铁律（零本体改动、扩展点白名单、客户端打包契约、rc.2 运行时事实）与本体事实库都在那里。

## 文档

- 产品总纲（业主确认）：[docs/product-master-plan.md](docs/product-master-plan.md)
- 技术设计 V1.0（工程权威）：[docs/AI 项目认知与开发控制插件.md](docs/AI%20项目认知与开发控制插件.md)

## 许可

随宿主分发策略（MIT，同 deepseek-harness）。
