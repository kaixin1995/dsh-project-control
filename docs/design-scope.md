# dsh-project-insight 工程实施案（V1 · 基于产品总纲 V0.4）

> ⚠️ **历史参考文档（2026-08-30 起部分取代）**：工程技术决策已被 [AI 项目认知与开发控制插件.md](AI%20项目认知与开发控制插件.md)（V1.0 技术设计）取代——存储改走 storage-domain 三域（废弃 `.insight/` 文件方案）、Plan 为插件自有持久对象（非对接 plan-mode）、UI 经加法插槽。本文件保留五阶段产品映射视角供参考。

> 状态：**待业主审查**。审查通过前不进入开发。
> 文档关系：[product-master-plan.md](product-master-plan.md) = 产品方向唯一权威（业主确认）；本文档 = 工程实施映射；[v04-section-mapping.md](v04-section-mapping.md) = 总纲全部 101 节的逐节穷尽映射。
> 铁律：**零 dsh 本体改动**；全部通过本体文档化扩展点实现。

---

## 一、架构总原则（把总纲翻译成工程约束的四条）

1. **执行归本体，插件做编排与采证。** Run/Step/断点/重试全部复用本体（会话 turn/step 全落日志、会话 resume 即断点恢复、`llm-retry` 指数退避、`jobs` 后台作业、`agent.cancel()` 停止）；插件不建第二个执行引擎（仓外插件也没有驱动循环的权限面）。插件的 Run/Step 是**对本体事实的引用与聚合**，不是重放。
2. **事实优先，AI 结论分级。** 插件只从可验证来源采证（git、会话日志 `tool/result`、Build/Test 输出、`assistant/message` 自带的 usage）；一切 AI 判断落盘时带 `confidence: fact | confirmed | inferred`（对应总纲 §84），推断永不静默升级为事实。
3. **持久状态全部落目标仓库 `.insight/`。** 仓外插件禁止新增会话事件类型（重启会被本体拒读），模型可见内容经工具结果 / `deferContext` / `agent.inject()` 进入。
4. **UI 只做插槽加法。** 只往 list/keyed 槽注册（`sidebar.footer.action`、`conversation.view`、`conversation.session.header.actions`、`tool.call.toolview`、`shell.overlay`）；**绝不 shadow 任何 single 槽**（会驱逐出厂 UI，破坏性且不可逆于体验）。

---

## 二、五阶段工程映射（对应总纲 §93–97）

### P1 —— "AI 到底改了什么"（总纲 §93）

| 项 | 内容 |
|---|---|
| 交付 | 项目识别（新旧项目检测）；**老项目轻量初始化**（最近 N commit 的 Imported Change 重建，走 L0+L1+L2 分层，见 §四）；Change 对象（创建/关联会话/基础状态）；`analyze_change` 完整分析管线（摘要/影响三级+无法确认/最小侵入/方案合理性与备选/风险/测试建议/轻量学习点）；基础流程图（文本链）；开发笔记；Commit 关联；`recall_project`/`record_decision`/`write_dev_note` 工具；`/insight` `/note` `/why` 命令；Web：工具卡片 + 「项目认知」页签（`conversation.view`）+ 侧边入口 |
| 复用本体 | tools / commands / systemPrompt / llm（一次性调用）/ subprocess（git、rg）/ lsp（可选）/ fs / 插槽系统 + 客户端打包管线 |
| 验证点 | M5 首日先以最小空客户端插件验证 `lib/client.js` 加载 |

### P2 —— "AI 开发过程怎么控制"（总纲 §94）

| 项 | 内容 |
|---|---|
| 交付 | Change 完整状态机（待分析→讨论中→方案确认→开发中→待 Review→待验证→完成/归档/取消）；需求管理（原始需求自动取自会话日志 + AI 整理 + 待确认清单）；**已确定事项 + 冲突检测**（监听 `fs/observed` 与 `tools/post-execute`，对照 confirmed 规则提示冲突）；执行中心视图（聚合本体 jobs + 会话状态 + 暂停/停止走编排级 `agent.cancel()`）；**Plan 对接本体 plan-mode**（引用 `/plan`、`exit_plan_mode`、`plan/mode` 日志状态，不自建 Plan 对象）；Build/Test 结果采证（从会话 `tool/result` 提取）；修改前后流程对比 |
| 复用本体 | plan-mode、jobs、会话 resume（断点）、fs 事件、commands |

### P3 —— "AI 到底有没有真正做好"（总纲 §95）

| 项 | 内容 |
|---|---|
| 交付 | **Reviewer**（隔离子代理：`ctx.subagents` 起 per-child model 的独立审查代理，或一次性 LLM 评审）；**Verifier**（同机制 + 采证：需求逐条核对、已确定核查、Build/Test 证据、Review Issue 处理状态）；Review Issue 落盘与状态流转；证据式验收报告；**模型等级体系**（Fast/Standard/Reasoning/Verifier → 具体 provider/model 的配置映射，`modelTiers` 配置节）；经济/均衡/高质量策略预设；自动升级建议器（修改面过大/触碰公共契约/连续失败时建议升级）；成本统计（聚合会话 usage，按 Change/阶段分账） |
| 复用本体 | subagents（per-child model）、会话 usage 数据、token-meter 投影 |

### P4 —— "项目为什么变成今天这样"（总纲 §96）

| 项 | 内容 |
|---|---|
| 交付 | **完整 Legacy Bootstrap**（范围选择+规模预估、进度页、暂停/继续/断点续跑）；Commit 聚类成 Imported Change（时间窗口+文件重叠启发式）；模块演化（模块卡历史聚合）；功能演化（Feature 版本链）；项目时间线；历史补充确认（[确认]/[修改描述]/[不确定]/[忽略] → confidence 升级）；历史风险提醒（修改高频事故模块时主动 recall） |
| 复用本体 | git（subprocess）、记忆库机制（P1 建立） |

### P5 —— "开发者是否真正理解"（总纲 §97）

| 项 | 内容 |
|---|---|
| 交付 | 学习模式配置（主语言/项目语言）；跨语言解释（学习管线）；Review 教学模式（Reviewer 输出的教学变体）；Change 学习总结（3–5 知识点，P1 已有轻量版深化）；知识接触记录（`.insight/learning/`：已接触/频繁出现/建议重点学习） |

---

## 三、已验证的可行性结论（不变，沿用前版）

| 需求 | 可行性 | 机制 |
|---|---|---|
| 模型工具 / 斜杠命令 / prompt 段落 | ✅ 纯运行时 API | `ctx.tools.register(defineTool)`、`ctx.commands.register`、`ctx.systemPrompt.section` |
| 一次性 LLM 分析调用 | ✅ | `ctx.llm.stream` + BlockAssembler（范本：本体 compaction summarizer） |
| git / rg / LSP 证据 | ✅ | `ctx.subprocess.spawn`；`ctx.lsp` 可选注入 |
| 文件写入（沙箱/E2B 兼容） | ✅ | `ctx.fs` + CAS 意图 |
| 隔离 Reviewer/Verifier | ✅ | `ctx.subagents`（per-child model） |
| 自定义 Web UI | ✅ 有条件 | `dsh.client` 双入口包 + 预构建 `lib/client.js`（惰性 CJS 工厂格式，自行用 esbuild 复刻，契约见 AGENTS.md）；运行时进入 `__DSH_BOOT__` 图 |
| 持久会话事件 | ❌ 绕开 | 零会话事件；状态全走 `.insight/` |
| 默认落地视图改为项目首页 | ❌ 不做破坏性方案 | 本体 `DEFAULT_VIEW_ID='chat'` 硬编码；改为"一键可达"的首页仪表盘页签（见 §五） |

## 四、Legacy Bootstrap 分层预算（总纲 §8–20 的成本设计）

**原则：LLM 只花在判断上，事实零成本。**

| 层 | 内容 | 成本 |
|---|---|---|
| L0 事实层 | `git log` 统计、文件清单、模块聚合、高频修改榜、时间窗口——纯本地计算 | 零 LLM |
| L1 全量轻析 | 每个 commit 仅一句话"改了什么/涉及哪些模块"（Fast 等级；输入只给 stat + 关键 diff 摘要，≤2KB/commit） | ~150 token 出/2K 入 × commit 数 |
| L2 聚类 | 时间窗口 + 文件重叠 + 分支启发式聚成 Imported Change；仅歧义处用 Fast 裁决 | 近零 |
| L3 重点详析 | 仅对"大 Change / 触碰公共契约 / 用户指定"用 Standard 详析（背景/取舍/后果） | 按选择 |

配套机制：游标文件记录分析进度（`.insight/history/cursor.json`），支持暂停/续跑/重开续；范围选项（50/100 commit、6 个月、1 年、全量、指定区间）+ 预估规模展示（L0 先算）；`maxCommitsPerRun` 防失控。Imported Change 一律标 `confidence: inferred`，人工确认后升级 `confirmed`。

## 五、UI 能力边界（已验证，2026-08-30）

| 总纲需求 | 结论 | 机制 |
|---|---|---|
| 侧边面板/入口 | ✅ 加法 | `sidebar.footer.action`（list；范本 ui-cordis 的 CordisPanel） |
| 主区域整页（项目认知/Change 工作台/执行中心/历史页） | ✅ 加法 | `conversation.view`（list；自带页签；范本 ui-trajectory；`replaceRisk: none`） |
| 会话头操作按钮 | ✅ 加法 | `conversation.session.header.actions`（list；范本 ui-jobs） |
| 工具富卡片 | ✅ | `tool.call.toolview`（keyed 按工具名） |
| 无会话全屏面板 | ✅ | `shell.overlay`（list；自行接管指针事件） |
| **默认落地视图 = 项目首页** | ⚠️ 调整实现 | 本体硬编码；改为「项目认知」页签 + `openView()` 一键直达 + 侧边仪表盘。**不做 single 槽 shadow**（驱逐出厂 UI） |

布局调整原则：一切经插槽加法完成，页面内部布局由本插件组件自管。

---

## 六、数据模型（`.insight/`）

```
.insight/
├── insight.config.yaml
├── project.md                     # 项目卡（名称/语言/框架/数据库/消息系统/核心模块索引）
├── changes/<id>/                  # 原生 Change
│   ├── change.md                  # frontmatter{id,title,type,status,createdAt,sessionRefs[],commits[],confidence}
│   ├── requirements.md            # 原始需求（会话原文摘录）+ AI 整理 + 待确认清单
│   ├── confirmed.md               # 已确定事项（规则，供冲突检测）
│   ├── analysis/*.md              # 变更分析报告
│   ├── review/*.md                # Review Issue
│   ├── verification.md            # 证据式验收记录
│   └── notes.md                   # 开发笔记
├── history/                       # Git 历史重建（P4）
│   ├── imported-changes/*.md      # frontmatter{commits[],period,confidence:inferred}
│   ├── timeline.md                # 项目时间线
│   └── cursor.json                # 重建进度游标
├── memory/
│   ├── modules/*.md               # 模块卡（frontmatter 含 confidence）
│   ├── decisions/*.md             # 决策卡
│   ├── flows/*.md                 # 流程卡（level: project|feature|code）
│   └── rules.md                   # 项目规则（总纲 §73）
├── notes/                         # 独立开发笔记
├── analysis/                      # 未挂 Change 的临时分析
└── learning/                      # P5：知识接触记录
```

记忆机制沿用前版四范本合成：渐进披露（目录注入 + 工具按需加载）、摘要抑制（SHA digest）、变更感知（FsVersion+SHA 缓存）、CAS 写入（`FS_STALE_VERSION`=人先改→重读合并）、召回内容 `<untrusted>` 框。**新增**：全部卡片 frontmatter 带 `confidence` 字段（fact/confirmed/inferred），查询回答按总纲 §83/§85 标注来源与不确定性。

## 七、分析管线 / 工具与命令 / 配置 / 测试（沿用前版，要点）

- 管线：静态证据（git diff/status/log + rg 引用 + 可选 LSP findReferences，全部 file:line 可溯源）→ 任务上下文（会话日志取本 turn 用户原文）→ LLM 综合（JSON schema：summary / impacts 四级（直接/间接/潜在/**无法确认**）/ intrusion+alternatives / risks / testSuggestions / learnings / flows；失败重试 1 次降级纯文本）→ 落盘 + 索引。
- 工具：`analyze_change`、`query_impact`、`recall_project`、`record_decision`、`write_dev_note`（P1）；P2 增 `confirm_fact`/`check_conflicts`；P3 增 `run_review`、`run_verification`。
- 命令：`/insight`、`/note`、`/why`（P1）；P2 增 `/change`、`/confirmed`；P3 增 `/review`、`/verify`。
- 配置新增：`modelTiers{fast,standard,reasoning,verifier}`（等级→provider/model 映射）、`legacyBootstrap{defaultCommits,maxCommitsPerRun,inputBudgetPerCommit}`、`projectLanguage`/`userPrimaryLanguage`（P5）。
- 测试：vitest 纯函数 + git 临时仓库 fixture；`pnpm mock:llm` + headless `--patch` 集成；UI 经 watcher→本体 HMR 手动验收；`dsh plugin add` 安装验证（P 末期）。

## 八、风险与开放问题

1. 客户端打包格式复刻仍是最大工程风险（P1 首日最小验证）。
2. 自有 JSON 路由需自复刻 Origin/Host 信任围栏。
3. 大历史重建成本靠 §四 分层控制；L1 单 commit 输入预算超限自动降级为仅 L0。
4. LSP 缺失自动降级 rg 并标注证据等级。
5. 「首页优先」按 §五 调整为实现为"一键可达"；如未来本体开放默认视图扩展点再跟进（不改本体）。
