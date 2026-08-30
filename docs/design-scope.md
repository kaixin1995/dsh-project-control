# dsh-project-insight 设计范围文档

> 状态：**待业主审查** —— 审查通过前不进入开发。审查意见请直接批注在本文件。
> 依据：业主产品初稿《AI 项目变更认知与核查工具》+ 对 dsh 本体源码的逐条可行性验证（2026-08-30）。
> 铁律：零 dsh 本体改动；全部通过本体文档化扩展点实现。

---

## 一、可行性结论（已逐条代码验证）

| 需求 | 可行性 | 机制 |
|---|---|---|
| 模型工具 / 斜杠命令 / prompt 段落 | ✅ 纯运行时 API | `ctx.tools.register(defineTool)`、`ctx.commands.register`、`ctx.systemPrompt.section` |
| 一次性 LLM 分析调用 | ✅ | `ctx.llm.stream` + BlockAssembler（范本：本体 compaction summarizer、session-title-llm） |
| git / rg / LSP 证据收集 | ✅ | `ctx.subprocess.spawn`（范本：本体 tool-fs-search 的 ripgrep）；`ctx.lsp` 可选注入 |
| 文件写入（沙箱/E2B 远程世界兼容） | ✅ | `ctx.fs.writeText` + CAS 意图（`createIfAbsent` / `replaceIfVersion`） |
| **自定义 Web UI（面板/布局/卡片）** | ✅ 有条件 | `dsh.client` 双入口包 + 预构建 `lib/client.js`（惰性 CJS 工厂格式），运行时进入 `__DSH_BOOT__` 图，经 `/plugins` 路由下发，无需重建 Web 应用（本体文档明示此路径零仓库改动） |
| 持久会话事件 | ❌ 硬约束绕开 | 仓外插件新增 SessionEventMap 类型重启后会被本体拒读 → 本插件零会话事件，持久状态全走 `.insight/` 文件 |

**两个必须正视的成本**：

1. **客户端打包格式需自行复刻**：产物必须是 CJS、`entryFileNames: 'client.js'`、逐字包裹 `window.__ModuleLoader__.load({ id: <pkg>, factory: (require) => { … return module.exports } })`；外部依赖仅限 8 个平台词（react、react-dom、cordis、client-store、ui-slots、ui-primitives 及其子路径）+ `dsh.client.external` 声明的图内行。本体不发布该构建预设（`packages/client/tsdown.client.ts` 为仓内文件），本插件用 esbuild 写等效配置（约 30 行）。开发期自带 watcher 重写 `lib/client.js`，本体宿主侧 HMR 自动热重载页面。
2. **面板数据通道**：仓外无法使用 typert 生成的 Remote 命名空间（本体构建期工具、仓内专属）。方案：宿主半边在 `ctx.webServer` 注册自有 JSON 路由（`/insight-plugin/api/...`），处理器内自复刻本体 Origin/Host 信任围栏；工具卡片数据直接来自落盘的 `tool/result` meta，无需 RPC。

---

## 二、包结构与组成（规划）

```
dsh-project-insight/                     # npm 包（业主自有 scope）
├── package.json                         # dsh.bundle.patch + dsh.client + exports['./client'] + 生产依赖声明
├── cordis.patch.yml                     # bundle 安装层：插入宿主行（裸名=自身子路径导出）
├── src/                                 # ── 宿主半边（Node）──
│   ├── service.ts                       # ProjectInsightService → ctx.projectInsight（编排器）
│   ├── git.ts                           # git status/diff/log/show（ctx.subprocess，cwd=会话 cwd∩沙箱根）
│   ├── evidence.ts                      # 证据收集：diff 解析、文件分组、rg 引用、可选 LSP findReferences
│   ├── session-task.ts                  # 从会话日志取本 turn 任务原文（"为什么改"的唯一权威来源）
│   ├── analyzer.ts                      # LLM 综合分析（JSON schema 输出，失败重试 1 次→降级纯文本）
│   ├── report.ts                        # Markdown 报告/笔记渲染
│   ├── memory.ts                        # .insight/ 记忆库：目录/索引/CAS 写入/摘要抑制
│   ├── tools.ts                         # 5 个模型工具
│   ├── commands.ts                      # /insight /note /why
│   ├── api-route.ts                     # 面板 JSON 路由（webServer + 信任围栏）
│   └── prompts.ts                       # insight:policy 段落 + 分析提示词
├── src/client/                          # ── 浏览器半边 ──
│   ├── index.ts                         # dsh.client 入口：注册 UI
│   ├── toolviews/                       # analyze_change / query_impact 专属工具卡片（keyed toolview）
│   ├── panel/                           # 「项目认知」侧边面板：最近分析、commit 时间线、决策浏览
│   └── locales.ts                       # ctx.locale.register(ns, {zh,en})
├── build-client.mjs                     # esbuild 复刻惰性 CJS 工厂格式
└── tests/                               # vitest：纯函数 + git 临时仓库 fixture
```

宿主行（cordis.patch.yml 插入 4 行）：`service`（inject: llm,subprocess,fs,webServer）、`tools`、`commands`、`insight-ui`（空 apply，仅为携带 dsh.client 进图）。

---

## 三、项目记忆设计（四套本体范本合成）

### 3.1 存储：仓库内 `.insight/`（可配置根，默认目标项目仓库根）

```
.insight/
├── insight.config.yaml      # 项目级覆盖（可选）
├── memory/
│   ├── modules/*.md         # 模块卡：frontmatter{name,path,tags} + 正文(职责/关键类/表/消息/依赖)
│   ├── decisions/*.md       # 决策卡：frontmatter{date,title,commits,modules,status} + 正文(背景/取舍/后果)
│   └── flows/*.md           # 流程卡：frontmatter{name,level:project|feature|code,entry} + 正文(链路描述)
├── notes/*.md               # 开发笔记：frontmatter{date,task,commits} + 模板章节(功能/需求/修改/影响/未影响/设计说明/风险/测试)
├── analysis/*.md            # 变更分析报告：frontmatter{rev,date,task} + 正文(摘要/影响三级/侵入核查/替代方案/风险/测试建议/学习点)
└── index.json               # 派生索引（可随时重建；建议 gitignore）
```

全部为 frontmatter Markdown（与本体 skill-filesystem 同构格式），git 可 diff、人工可直接编辑、跨工具可迁移。默认约定：`.insight/` 进 git（团队共享记忆）；`.insight/index.json` 忽略。

### 3.2 机制（逐条对应本体范本）

| 机制 | 本体范本 | 要点 |
|---|---|---|
| 渐进披露 | skill-filesystem + tool-skill | 注入模型的常驻内容只有目录（每条 name + 一句话摘要，字节预算内）；全文由 `recall_project` 工具按需加载 |
| 摘要抑制 | skill-catalog 的 SHA 摘要 | 目录内容未变（digest 相同）不重复注入；变化时整体替换而非追加 |
| 变更感知 | agent-instructions | `FsVersion` + 内容 SHA 缓存：未变文件不重读；人/模型改动记忆文件产生 set/replace/remove 增量通知 |
| 写入安全 | fs CAS | `stat` 取版本 → `replaceIfVersion` 写回；`FS_STALE_VERSION` = 人先改了 → 重读合并（人的编辑永远优先） |
| 信任边界 | session-reference | 召回的历史正文包 `<untrusted>` 框注入，防止记忆内容被当指令执行 |
| 监视 | skill-filesystem | chokidar（depth 限制 + awaitWriteFinish）+ 监听 `fs/observed` 加速本方写入失效 |

### 3.3 写入权与生命周期

- **模型起草、人生效**：`record_decision` / `write_dev_note` / 模块卡更新由模型生成草稿落盘 → 开发者 `git diff` 审阅 → 随 commit 进库（"人是最终决策者"）。
- **分析报告自动生成**：每次 `/insight` 或 `analyze_change` 落盘，frontmatter 记录 rev/task 关联。
- **查询**：`/why <问题>` 与 `recall_project` = rg 检索索引 → 命中卡片 → LLM 归纳作答（附 file:line 溯源）。

---

## 四、分析管线（静态证据 + LLM 综合）

1. **证据（无模型，全部可溯源）**：`git status --porcelain`、`git diff [--cached]`、`git log/show`（collect 输出上限 `maxDiffBytes`，lossy 报错）；变更文件按模块分组；变更符号的 rg 引用检索；`ctx.lsp` 可用时 `findReferences`（`ctx.get('lsp')` 可选，缺失降级 rg 并在报告标注证据等级）。
2. **任务上下文**：`session-task.ts` 从 `exec.agent.session` 派生本 turn 用户消息原文。
3. **LLM 综合**：一次 `ctx.llm.stream` 调用（路由 config 指定，缺省回落会话当前路由；deadline/输入上限仿 session-title-llm）。输出 JSON schema：`summary`、`impacts{direct/indirect/potential}`（每项带证据引用）、`intrusion{touched,expected,verdict,alternatives[{name,pros,cons,recommended}]}`、`risks[]`、`testSuggestions[]`、`learnings[≤3]`、`flows[]`。校验失败重试 1 次 → 降级纯文本。
4. **产物**：Markdown 报告落 `.insight/analysis/`，索引同步；工具结果返回摘要 + 报告路径 + 结构化 meta（供 UI 卡片渲染）。

**流程图呈现**：报告内为 mermaid 代码块 + 文本链；Web 卡片中用自定义 React 树组件渲染（本体聊天 markdown 不支持 mermaid，不引本体改动）。

---

## 五、交互面清单

**模型工具（5 个，含 presentCall/presentResult 与并发分类）**：

| 工具 | 作用 |
|---|---|
| `analyze_change(scope, depth)` | 完整变更分析（quick/full；full 含学习点与替代方案） |
| `query_impact(target)` | 文件/符号的三级影响图 |
| `recall_project(query)` | 检索项目记忆并归纳作答 |
| `record_decision(title, rationale, refs)` | 起草决策卡落盘 |
| `write_dev_note(draft)` | 按模板起草开发笔记 |

**斜杠命令**：`/insight [quick|full]`（命令内直接跑管线，不占模型轮）、`/note <text>`、`/why <query>`。

**prompt 段落**：`insight:policy`（order 3000）——告知工具存在与使用时机（提交前分析、重大取舍后记决策）。

**Web UI（一期交付）**：

- `analyze_change` / `query_impact` 专属工具卡片（keyed toolview，按工具名注册）：三级影响树、侵入核查结论、替代方案对照。
- 「项目认知」侧边面板：最近分析列表、commit 时间线（点开看该次分析/笔记/决策）、决策记录浏览。
- 布局经插槽系统融入（侧边列表项、会话节点），不改本体布局代码。
- 文案全部经 `ctx.locale.register`（zh/en 双语）。

**自动提醒（默认关，`remindBeforeCommit` 配置）**：监听 `fs/observed` 按 agent 记录本 turn 写入；`agent/turn-stopping` 时有写且未分析 → `agent.inject()` 一条提醒（只提醒不强制）。

---

## 六、配置（schemastery，全部 cordis.yml 可覆盖）

| 字段 | 默认 | 说明 |
|---|---|---|
| `memoryRoot` | `.insight` | 记忆根（相对目标项目仓库根） |
| `analysisProvider` / `analysisModel` | 空（回落会话路由） | 分析用模型 |
| `analysisMaxTokens` | `4096` | 单次分析输出上限 |
| `analysisTimeoutMs` | `120000` | 分析 deadline |
| `maxDiffBytes` | `262144` | diff 证据字节预算 |
| `lspEvidence` | `true` | LSP 可用则用 |
| `remindBeforeCommit` | `false` | turn 末未分析提醒 |
| `reportLanguage` | `auto` | 报告语言（跟随会话输入语言） |
| `panelEnabled` | `true` | 侧边面板开关 |

---

## 七、里程碑（每步可独立验收）

| 阶段 | 交付 |
|---|---|
| M1 | 宿主骨架 + git 证据 + `/insight` 变更摘要报告落盘 |
| M2 | 影响三级图（rg/LSP 证据）+ 侵入核查 + 替代方案 + 风险/测试建议 |
| M3 | 记忆库全套（modules/decisions/flows/notes + 目录注入 + 摘要抑制）+ `/why` + recall/record 工具 |
| M4 | 开发笔记模板 + 学习模式（Top3 学习点） |
| M5 | Web UI：client 打包管线 + 工具卡片 + 侧边面板 + i18n + JSON 路由 |
| M6 | 自动提醒 + bundle 打包（`dsh.bundle.patch` + 生产依赖声明）+ `dsh plugin add` 安装验证 + README |

## 八、测试与验证

- vitest 单测：diff 解析、报告渲染、索引/CAS、目录摘要抑制；git fixture 用临时目录 init。
- 集成：本体自带 `pnpm mock:llm`（无 key）+ `pnpm dsh --profile headless --patch ./dsh-project-insight/cordis.yml "..."`。
- UI：dev watcher 重写 `lib/client.js` → 本体 HMR 自动重载 → 浏览器手动验收 + 截图。
- 安装：`dsh plugin --profile demo add ./dsh-project-insight` → `--dump-config` 验证层 → 启动验证。

## 九、一期明确不做

自动修改代码、CI/CD、需求/Bug 管理、权限系统、跨项目聚合、远程/团队同步记忆、mermaid 富渲染（一期树/文本）、Python SDK 专属面（工具自动可用，无专属 UI）、typert Remote 命名空间。

## 十、风险与开放问题

1. **客户端打包格式复刻**是最大工程风险：格式契约已完全查明（wrapper/externals/命名），M5 首日先用最小空插件验证加载，再铺 UI。
2. 自有 JSON 路由需自复刻 Origin/Host 信任围栏（本体内置围栏只护 `/api` 与 mux）。
3. LSP 依赖语言服务器存在，缺失自动降级并标注。
4. 大 diff 截断策略（按文件采样，报告明示）。
5. 本仓库位于本体仓库根目录内仅为开发便利（tsx 加载与 node_modules 解析），本体经 `.git/info/exclude` 屏蔽；未来发布走独立 npm/仓库。
