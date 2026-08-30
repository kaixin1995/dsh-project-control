# AGENTS.md —— 本插件仓库的工程铁律

本仓库是 deepseek-harness（dsh）的**仓外插件**。以下规则来自对 dsh 本体源码的逐条验证（2026-08-30），违反任何一条都会破坏"零本体改动"的承诺或直接导致运行时故障。

## 不可违背的约束

1. **零本体改动**：绝不修改 `deepseek-harness/` 内任何被 git 跟踪的文件。本体对本目录的屏蔽靠其 `.git/info/exclude`（本地文件，非本体内容）。需要本体新能力时，先确认它是否已是文档化扩展点；不是则调整本插件设计，而不是改本体。
2. **禁止新增会话事件类型**：仓外插件新增 `SessionEventMap` 事件可以在运行中追加，但**重启后持久化日志会被本体拒读**（`KNOWN_SESSION_EVENT_TYPES` 只扫描本体 `packages/*/*/src`，见本体 `packages/core/session/src/known-event-types.ts` 头注释）。本插件持久状态走 storage-domain；模型可见内容经工具结果 / `deferContext` / `agent.inject()` 进入；**聊天卡片（Run/Review/Verification Card）一律骑核心事件类型**：插件工具的 `tool/call`+`tool/result`（meta 携带卡片数据）与命令的 `command/run`+`command/done`——ConversationNode 匹配这些即可回放（V1.0 §118–124 据此修正，见 development-plan R1）。
3. **ESM**：`"type": "module"`，`.ts` 相对导入带 `.ts` 后缀。开发期经本体 tsx ESM 钩子加载。
4. **bundle 依赖声明**：`cordis.patch.yml` 中每个裸名插件行必须是本包 `package.json` 的**生产依赖**，否则不会被链入 profile 的 `node_modules`（本体 `verify-cordis-config` 门禁与 `healProfileModuleFallback` 均按此规则工作）。
5. **注册即效果**：所有注册走 `ctx.effect()` / `ctx.on()` / 注册方法返回的 disposer；瀑布监听（`tools/pre-execute`、`tools/execute`、`tools/post-execute`、`agent/pre-step`、`agent/request`、`llm/stream`、`system-prompt/assemble`）**必须调用 `next()`** 委托。
6. **可配置不硬编码**：部署间可能不同的值必须是 schemastery `Config` 字段（cordis.yml 可改）；自包含约束写进 schema 让加载期失败。
7. **UI 文案走词典**：客户端组件文案经 `ctx.locale.register(ns, { zh, en })`，不硬编码。
8. **禁止向本体仓库写任何内容**——包括本体 `.agents/notes/proposed/`（V1.0 §154 Phase 0 据此取消）。设计记录只在本仓库 `docs/`。
9. **执行归本体、插件做编排**：Run/Step 引用本体会话事实（每 Attempt 一个独立 Agent Session，经 `ctx.agents.create` + `setup()` 注册插件工具）；`ctx.jobs` 只是运行时载体（JobId≠RunId）；重试/退避/断点由插件 Retry 引擎与本体会话 resume 协作，不重建执行引擎。

## 命名与存储决策（2026-08-30 定）

- 命名按 V1.0 文档：服务键 `ctx.projectControl`、设置 namespace `project-control`、npm 包 `dsh-project-control`（客户端 `dsh-client-project-control`）；仓库名 `dsh-project-insight` 保留为历史目录名。
- 存储走本体 storage-domain 三域：`project-control-core`（权威状态）/`project-control-analysis`（可再生）/`project-control-history`（历史重建），数据落 DSH_HOME（不进目标项目 git）；目标项目内长期文档经 Agent-Note 集成（T9.3）补回仓库。早期 `.insight/` 文件方案已废弃。
- C# Roslyn 外部分析宿主后置（接口按 V1.0 §79 预留），首版用 generic analyzer。
- worktree 一律建在目标项目根内（默认 `<root>/.worktrees/<runId>/`），否则被沙箱 workspace-write 拒绝。

## 允许使用的扩展点（白名单）

| 用途 | 机制 | 本体范本 |
|---|---|---|
| 模型工具 | `ctx.tools.register(defineTool({...}))` | `packages/todo/tool-todo`、MCP 客户端 |
| 斜杠命令 | `ctx.commands.register({name, description, handler})`；`command/run`、`command/done` 由框架自动落日志 | `packages/goal/command-goal`、`packages/compaction/command-compact` |
| prompt 段落 | `ctx.systemPrompt.section({name, order, text})`；外部插件 order 用任意有限值（规划用 3000） | `packages/plan/plan-mode`（plan:policy） |
| 一次性 LLM 调用 | `ctx.llm.stream(GenerateOptions)` + `BlockAssembler`；deadline/上限仿 session-title-llm | `packages/compaction/compaction-basic/src/summarizer.ts` |
| 外部进程（git/rg） | `ctx.subprocess.spawn({argv, cwd, stdio collect, graceMs, signal})`；工作目录 = 沙箱 workspaceRoot 优先、回落 `session.header.cwd` | `packages/fs/tool-fs-search/src/search-core.ts` |
| 符号引用证据 | `ctx.lsp.query`（`ctx.get('lsp')` 可选注入；缺失降级 rg） | `packages/lsp/lsp-stdio` |
| 文件读写 | `ctx.fs` + CAS 意图（`createIfAbsent` / `replaceIfVersion`）；`FS_STALE_VERSION` = 人先改了 → 重读合并 | `packages/fs/fs/src/types.ts` |
| 后台 HTTP 路由 | `ctx.webServer.register`（自有前缀路由；处理器内自复刻 Origin/Host 信任围栏，本体内置围栏只护 `/api` 与 mux） | `packages/host/webserver` |
| 注入提醒 | `agent.inject(createUserMessage({...source:{kind:'plugin',...}}))` | `packages/guard/repeat-tool-reminder`、hooks-codex |
| Web UI | 双入口包：`package.json` 声明 `dsh.client`（platform web + inject 依赖行）+ 预构建 `lib/client.js`；客户端经 `ctx.slots.register` / `ctx.slots.inject('tool.call.toolview', ...)` / `ctx.uiConversation.events.register` 注册 | `packages/client/ui-goal`、`packages/client/ui-skill` |

### 插槽边界（已验证，2026-08-30）

- **只用加法**（list/keyed 槽）：`sidebar.footer.action`（侧边入口，范本 ui-cordis）、`conversation.view`（**主区域整页页签**，范本 ui-trajectory，`replaceRisk: none`）、`conversation.session.header.actions`（会话头按钮，范本 ui-jobs）、`tool.call.toolview`（工具卡片）、`shell.overlay`（无会话全屏浮层）。
- **禁止 shadow 任何 single 槽**（root/sidebar/conversation/details…）：低优先级注册会驱逐出厂 UI 及其全部子槽，破坏性。
- 本体默认落地视图硬编码（`DEFAULT_VIEW_ID='chat'`，ConversationSession.tsx:26）："首页优先于聊天"无仓外无破坏实现 → 一律实现为「项目认知」页签 + `openView()` 一键直达 + 侧边仪表盘。
- 无路由概念：页面切换 = 会话选择 + `conversation.view` 页签状态（每会话持久化）。

## 客户端打包格式契约（本体不发布构建预设，需自行复刻）

- 产物：CJS，`lib/client.js`，`package.json` 的 `exports['./client']` 指向它。
- 包裹器（逐字）：
  - banner：`window.__ModuleLoader__.load({ id: <包名>, factory: (require) => {`
  - intro：`var module = { exports: {} };`
  - footer：`return module.exports; } });`
- 外部依赖仅限 8 个平台词：`react`、`react/jsx-runtime`、`react-dom`、`react-dom/client`、`@deepseek-ai/cordis`、`@deepseek-ai/dsh-client-store`、`@deepseek-ai/dsh-client-ui-slots`、`@deepseek-ai/dsh-client-ui-primitives`；其余跨包运行时依赖必须在 `dsh.client.external` 声明为图内行。
- 客户端跨包规则：跨特性包**只允许 type-only 导入**；值只能经 cordis 服务传递。
- 开发期：自带 watcher 重写 `lib/client.js` → 本体宿主侧 HMR（按图轮询）自动热重载页面；本体的 `pnpm dev:web` 不会构建本目录，客户端构建始终自己负责。

## 已查明的本体事实（避免重复踩坑）

**工具与启动（2026-08-30 真机验证）**
- 插件入口**禁止 `export default apply`**：loader 的 `unwrapExports` 先取 `exports.default`，函数插件会丢失 `inject` 元数据 → 启动报 `cannot get property "X" without inject`。
- `defineTool` 的 schema DSL 严格约定：`parameters` 可选字段**省略 `required`**（写 `required: false` 即 `UNSUPPORTED_SCHEMA`）；`output.schema` 不支持 `required` 数组；object 必须显式 `additionalProperties: true|false`。
- Windows 下 `cordis.yml`/patch 的绝对路径必须是 `file:///D:/...` URL（tsx ESM loader 拒绝 `D:` 协议，`ERR_UNSUPPORTED_ESM_URL_SCHEME`）。
- 仓库根 `pnpm dsh`（repo CLI）与全局安装的 `dsh` 是**两个运行时**：cwd 不在本体仓库根时 `pnpm dsh` 会落到全局安装；profile 的 fallback 链接锚定创建它的 CLI。两者数据/包版本错位会互炸（例：仓库版 `.credentials.yaml` 嵌套布局 vs rc.7 旧版期望平铺字符串版）。
- 本体源码运行的前置：`pnpm run build:lib:host`（typert-loader 需要 lib/typert.host.js）；web 面前端前置：`pnpm run build:lib:client` + `pnpm run build:web`（否则 SPA fallback 404）。
- 本机 3080 的 web 是全局 dsh `lib/bin.js web`；验证用 `--no-open --port 3101` 防端口冲突。

**UI 机制（已源码验证，2026-08-30）**
- `__DSH_BOOT__` 运行时从挂载条目派生，挂载即生效、无需重建 Web 应用。
- 客户端插件进图 = `package.json` 声明 `dsh.client`（platform web + inject 行）+ `exports['./client']` 指向预构建 `lib/client.js`（惰性 CJS 工厂格式，见"客户端打包格式契约"）。
- `renderSlot` 有槽位所有权校验（`entry.children?.[key]`）→ **遮蔽 single 槽后无法重托管其子槽**；遮蔽 `conversation` 不可行。
- **已验证可行的主区域重排方案**：遮蔽 `details` 单槽（priority -10，可逆——卸载即恢复官方 DetailsPanel）+ 组件注入样式表做网格列序视觉交换（`centerCol→order:3` 聊天最右，`detailsCol→order:2` 工作台居中；`[data-details-collapsed]` 无会话落地页恢复原生列序）。已实现于 `src/client/components/WorkspaceFrame.tsx`。
- AppFrame 网格列是 CSS Modules 哈希类名 div，可用 `[class*="centerCol"]` 子串选择器定位；`[style*="grid-template-columns"]` 唯一锚定框架 div。
- Web 聊天的 markdown **不支持 mermaid**；工具的 `presentCall/presentResult` 不被 Web 客户端消费（富卡片必须注册 keyed toolview）。
- `dsh` CLI 源码启动走 tsx ESM-only 钩子；仓外插件按 ESM 编写即可。
- 本体压缩功能依赖模型 contextWindow 元数据：自定义路由缺 `contextWindow` 时自动压缩静默失效（只 warn 一次），详见本体根 `AGENT_PROJECT_GUIDE.md` 的排错记录。
- 本体资料总览见 `../AGENT_PROJECT_GUIDE.md`（本体根目录的本地未跟踪文件）。

**rc.2 全局 CLI 运行时事实（2026-08-30 真机验证）**
- `ctx.plugin(fn)` 挂载函数子插件时**不识别 fn 的 `inject` 导出**，子 fiber 内读取未声明服务会抛 `cannot get property without inject` 且被静默吞掉 → bundle 入口（index.ts）**内联注册全部能力**，服务经闭包传递；子入口文件的 apply 仅保留给 Loader 行挂载（Loader 行会正常识别 inject）。
- 0.1.1 起 storage 栈（storage/storage-json/storage-domain）只在 web / sdk 面 mount，headless 没有 → 插件对 storageDomain / webServer 一律用 `ctx.inject([...], cb)` 动态可选注入，静默降级。
- domain schema 用 zod（schemastery 无 `.any()`，`z.any` 为 undefined → 记录校验必炸）；插件仓库 node_modules/zod 是指向本体 .pnpm 存储的 Windows junction，供开发期解析。
- 全局 dsh 已升级 0.1.0-rc.7 → **0.1.1-rc.2**（npm latest）；credentials 嵌套布局兼容 ✓。rc.2 端到端：headless 模型真实回复 ✓；web bootstrap 扫描真实仓库入库 ✓ + /state 真实状态 ✓ + client bundle 进启动图 ✓ + Origin 围栏 403 ✓。
- 源码启动（repo CLI）下 web 的 __DSH_BOOT__ 图为空的异常仍在待查（全局 CLI 无此问题）。

**bundle patch / 存储面事实（2026-08-30）**
- 同一 id 的**二次 insert** 会 fail loud（duplicate loader entry id）——bundle 间覆盖只能由用户层 update 型行完成；本 bundle 不重述 storage 行。
- 0.1.1 起 headless 不挂 storage 栈：需要持久化的 headless profile 在其 cordis.patch.yml 用户层补 storage/storage-json/storage-domain 三行（用户 headless profile 已配置）。
- json 存储后端是单写者假设：跨进程写入对已打开实例不可见（重启后可见）——跨实例验证时先重启 web。
- defineTool 参数**必填字段必须显式 required: true**（省略即可选）；参数名避免用 type（与 DSL 元键同名易混淆，已改 memoryType）。
- 一次性 LLM 分析走 ctx.llm.stream + BlockAssembler + deadline（analysis/llm-analyzer.ts）；路由解析：settings 等级覆盖 → 会话当前路由 → deepseek 兜底。
- ctx.agents.create 子代理：meta.origin='subagent'，setup 注册 project_control_step_complete；usage 从子会话 assistant/message 事件聚合。
- 客户端 details 槽面板默认轨道宽 0：WorkspaceFrame 挂载时调用 ctx.layout.openDetails()（inject 需声明 'layout'）打开轨道；无会话落地页轨道恒 0，原生英雄页不受影响。

**待查证（下一会话优先）**
- 源码启动（repo CLI）下 web 的 `__DSH_BOOT__` 图为空（连官方 ui 包都未进图，无告警——疑似 `loader.internal.resolveSync` 在 tsx/Windows 下静默失败、warn 被内部 logger 吞掉）。用户日常 3080 用的是全局安装 rc.7，图正常。需决定：插件验证走哪条运行时路径，或定位 resolveSync 问题（vendor 代码，受零改动铁律约束，只能上报或绕过）。

## 术语

- **本体**：`deepseek-harness/` 仓库（D:\Code\deepseek-harness）。
- **插件 / 本仓库**：`dsh-project-insight/`，独立本地 git 仓库，暂不推送云端。
- **业主**：本插件的产品决策人。
- **文档层级**：`docs/AI 项目认知与开发控制插件.md` = **V1.0 技术设计（工程权威，161 节；§118–124/§127/§154-Phase0 已被 development-plan R1–R3 修正）**；`docs/development-plan.md` = 开发任务清单（唯一执行依据，含修正决定 R1–R7）；`docs/SESSION-HANDOFF.md` = 新会话入口；`docs/product-master-plan.md` = 产品总纲（V0.4，业主确认）；`docs/v04-section-mapping.md`、`docs/design-scope.md` = 历史参考（design-scope 的存储/UI/Plan 决策已被 V1.0 取代）。冲突时：产品以总纲定方向，工程以 V1.0+development-plan 定做法。
