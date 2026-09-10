window.__ModuleLoader__.load({ id: "dsh-project-control", factory: (require) => {
var module = { exports: {} };
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);
var import_react3 = __toESM(require("react"), 1);

// src/client/components/ChangeCard.ts
var import_react = __toESM(require("react"), 1);

// src/client/components/theme.ts
function parseColor(color) {
  const hex = /^#([0-9a-f]{6})$/i.exec(color);
  if (hex !== null) {
    const value = Number.parseInt(hex[1], 16);
    return [value >> 16 & 255, value >> 8 & 255, value & 255];
  }
  const functional = /^rgba?\(\s*(\d{1,3})[,\s]+(\d{1,3})[,\s]+(\d{1,3})/i.exec(color);
  if (functional !== null) {
    return [Number(functional[1]), Number(functional[2]), Number(functional[3])];
  }
  return null;
}
function relativeLuminance(r, g, b) {
  const channel = (value) => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}
function darkenForWhiteBackground(r, g, b) {
  let red = r;
  let green = g;
  let blue = b;
  for (let step = 0; step < 12 && relativeLuminance(red, green, blue) > 0.183; step += 1) {
    red = Math.round(red * 0.8 + 31 * 0.2);
    green = Math.round(green * 0.8 + 35 * 0.2);
    blue = Math.round(blue * 0.8 + 40 * 0.2);
  }
  return `rgb(${red}, ${green}, ${blue})`;
}
function lightenForDarkBackground(r, g, b) {
  let red = r;
  let green = g;
  let blue = b;
  for (let step = 0; step < 12 && relativeLuminance(red, green, blue) < 0.214; step += 1) {
    red = Math.round(red * 0.8 + 240 * 0.2);
    green = Math.round(green * 0.8 + 246 * 0.2);
    blue = Math.round(blue * 0.8 + 252 * 0.2);
  }
  return `rgb(${red}, ${green}, ${blue})`;
}
function themeAwareText(color) {
  const rgb = parseColor(color);
  if (rgb === null) return color;
  if (typeof document !== "undefined" && document.body?.hasAttribute?.("data-ds-dark-theme") === true) {
    return lightenForDarkBackground(rgb[0], rgb[1], rgb[2]);
  }
  return darkenForWhiteBackground(rgb[0], rgb[1], rgb[2]);
}

// src/client/components/ChangeCard.ts
var ChangeCard = ({
  title = "Change Insight",
  filesChanged = 0,
  insertions = 0,
  deletions = 0,
  evidenceId,
  status = "analyzed"
}) => {
  return import_react.default.createElement(
    "div",
    {
      "data-testid": "project-control-change-card",
      style: {
        border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))",
        borderRadius: "6px",
        padding: "10px 14px",
        margin: "6px 0",
        backgroundColor: "var(--dsw-alias-bg-layer-1, #fafafa)",
        color: "var(--dsw-alias-label-primary, #1f2328)",
        fontSize: "13px"
      }
    },
    import_react.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px",
          fontWeight: "600"
        }
      },
      import_react.default.createElement("span", null, `\u{1F50D} ${title}`),
      import_react.default.createElement(
        "span",
        {
          style: {
            fontSize: "11px",
            padding: "2px 6px",
            borderRadius: "4px",
            backgroundColor: "var(--dsw-alias-bg-inset, rgba(5,5,5,0.06))",
            color: "var(--dsw-alias-label-secondary, #6b7280)"
          }
        },
        status
      )
    ),
    import_react.default.createElement(
      "div",
      { style: { display: "flex", gap: "12px", fontSize: "12px", opacity: 0.9 } },
      import_react.default.createElement("span", null, `\u{1F4C1} ${filesChanged} files`),
      import_react.default.createElement("span", { style: { color: themeAwareText("#1a7f37") } }, `+${insertions}`),
      import_react.default.createElement("span", { style: { color: themeAwareText("#cf222e") } }, `-${deletions}`),
      evidenceId ? import_react.default.createElement(
        "span",
        { style: { opacity: 0.7, fontFamily: "monospace" } },
        `[${evidenceId}]`
      ) : null
    )
  );
};

// src/client/components/WorkspaceFrame.tsx
var import_react2 = __toESM(require("react"), 1);

// src/client/components/commit-rounds.ts
var DEFAULT_ROUND_GAP_MS = 36 * 60 * 60 * 1e3;
function overlapRatio(files, existing) {
  if (existing.size === 0) return 0;
  let hits = 0;
  for (const file of files) if (existing.has(file)) hits += 1;
  return hits / Math.max(files.length, 1);
}
function clusterIntoRounds(commits, clusterGapMs = DEFAULT_ROUND_GAP_MS) {
  const rounds = [];
  let current = [];
  let currentFiles = /* @__PURE__ */ new Set();
  const pushRound = () => {
    if (current.length === 0) return;
    const times = current.map((commit) => commit.date);
    rounds.push({ commits: current, firstAt: Math.min(...times), lastAt: Math.max(...times) });
    current = [];
    currentFiles = /* @__PURE__ */ new Set();
  };
  for (const commit of commits) {
    const previous = current[current.length - 1];
    const gapBreak = previous !== void 0 && Math.abs(commit.date - previous.date) > clusterGapMs;
    const fileBreak = current.length >= 3 && overlapRatio(commit.files, currentFiles) === 0;
    if (gapBreak || fileBreak) pushRound();
    current.push(commit);
    for (const file of commit.files) currentFiles.add(file);
  }
  pushRound();
  return rounds;
}

// src/client/components/WorkspaceFrame.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function renderDiffLines(diff) {
  if (typeof diff !== "string" || diff === "") return [];
  return diff.split("\n").slice(0, 400).map((line, index) => {
    const style = {
      fontFamily: "var(--dsw-alias-font-mono, ui-monospace, monospace)",
      fontSize: "11px",
      lineHeight: 1.6,
      whiteSpace: "pre-wrap",
      wordBreak: "break-all"
    };
    if (line.startsWith("+++") || line.startsWith("---") || line.startsWith("diff --git") || line.startsWith("@@")) {
      style.color = "var(--dsw-alias-label-secondary, #6b7280)";
    } else if (line.startsWith("+")) {
      style.color = themeAwareText("#1a7f37");
      style.background = "rgba(46,160,67,0.08)";
    } else if (line.startsWith("-")) {
      style.color = themeAwareText("#d1242f");
      style.background = "rgba(209,36,47,0.08)";
    } else {
      style.color = "var(--dsw-alias-label-secondary, #6b7280)";
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style, children: line === "" ? "\xA0" : line }, index);
  });
}
var FILE_LINE_PATTERN = /((?:[\w.-]+[/\\])*[\w.-]+\.[A-Za-z]{1,4}):(\d{1,5})(?:-\d{1,5})?/g;
var ISSUE_STATUS_LABELS = {
  open: "\u5F85\u5904\u7406",
  fixing: "\u4FEE\u590D\u4E2D",
  resolved: "\u5DF2\u89E3\u51B3",
  accepted: "\u5DF2\u63A5\u53D7",
  rejected: "\u5DF2\u62D2\u7EDD"
};
var MEMORY_TYPE_LABELS = {
  architecture_decision: "\u67B6\u6784\u51B3\u7B56",
  pattern_rule: "\u6A21\u5F0F\u89C4\u5219",
  risk_hotspot: "\u98CE\u9669\u70ED\u70B9",
  learned_concept: "\u5B66\u4E60\u6982\u5FF5",
  user_profile: "\u7528\u6237\u504F\u597D",
  project_log: "\u9879\u76EE\u65E5\u5FD7",
  daily_log: "\u65E5\u5FD7"
};
var MEMORY_SOURCE_LABELS = {
  run: "\u6267\u884C\u63D0\u70BC",
  review: "\u6838\u67E5\u6C89\u6DC0",
  sync: "\u62C9\u53D6\u540C\u6B65",
  chat: "AI \u8BB0\u5F55",
  manual: "\u624B\u52A8"
};
var ROLE_LABELS = {
  analysis: "\u5206\u6790",
  planning: "\u89C4\u5212",
  coding: "\u5F00\u53D1",
  ops: "\u7B80\u5355\u64CD\u4F5C",
  verification: "\u9A8C\u6536"
};
var POLICY_LABELS = {
  "retry-escalate": "\u91CD\u8BD5\u5E76\u5347\u7EA7\u6A21\u578B",
  "retry-fallback": "\u91CD\u8BD5",
  skip: "\u5931\u8D25\u5219\u8DF3\u8FC7",
  ask: "\u5931\u8D25\u5219\u6682\u505C\u95EE\u4EBA"
};
var RUN_STATUS_LABELS = {
  queued: "\u6392\u961F\u4E2D",
  running: "\u8FD0\u884C\u4E2D",
  paused: "\u5DF2\u6682\u505C",
  blocked: "\u963B\u585E",
  retrying: "\u91CD\u8BD5\u4E2D",
  verifying: "\u6536\u5C3E\u9A8C\u6536\u4E2D",
  succeeded: "\u5DF2\u6210\u529F",
  completed: "\u5DF2\u6210\u529F",
  failed: "\u5931\u8D25",
  cancelled: "\u5DF2\u53D6\u6D88",
  interrupted: "\u5DF2\u4E2D\u65AD"
};
var STEP_STATUS_LABELS = {
  pending: "\u5F85\u6267\u884C",
  ready: "\u5C31\u7EEA",
  running: "\u6267\u884C\u4E2D",
  paused: "\u6682\u505C",
  retrying: "\u91CD\u8BD5\u4E2D",
  succeeded: "\u5DF2\u6210\u529F",
  failed: "\u5931\u8D25",
  skipped: "\u5DF2\u8DF3\u8FC7",
  blocked: "\u963B\u585E",
  cancelled: "\u5DF2\u53D6\u6D88",
  interrupted: "\u5DF2\u4E2D\u65AD"
};
function severityColor(severity) {
  if (severity === "critical" || severity === "blocker") return "#ce9178";
  if (severity === "major") return "#d7ba7d";
  if (severity === "info") return "#6b8b8b";
  return "#569cd6";
}
function normalizeIssueSeverity(severity) {
  if (severity === "high") return "major";
  if (severity === "medium" || severity === "low") return "minor";
  return severity === "blocker" || severity === "critical" || severity === "major" || severity === "minor" || severity === "info" ? severity : "minor";
}
function issueTargetLabel(changeId) {
  const id = typeof changeId === "string" ? changeId : "";
  if (id.startsWith("review:")) return `\u63D0\u4EA4 ${id.slice(7, 15)}`;
  if (id === "adhoc") return "\u5DE5\u4F5C\u533A";
  return `\u53D8\u66F4 ${id.slice(0, 11)}`;
}
function renderStructuredContent(content) {
  if (typeof content !== "string" || content === "") return [];
  return content.split("\n").map((line, index) => {
    if (line.startsWith("## ")) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontWeight: 600, fontSize: "12.5px", marginTop: index === 0 ? 0 : 10, marginBottom: 2, color: "var(--dsw-alias-brand-primary, #2563eb)" }, children: line.slice(3) }, index);
    }
    if (line.startsWith("- ")) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { paddingLeft: 14, textIndent: -10 }, children: [
        "\u2022 ",
        renderWithPeek(line.slice(2))
      ] }, index);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: line === "" ? "\xA0" : renderWithPeek(line) }, index);
  });
}
var peekOpener;
function renderWithPeek(text) {
  const nodes = [];
  let last = 0;
  let match;
  FILE_LINE_PATTERN.lastIndex = 0;
  while ((match = FILE_LINE_PATTERN.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const [full, path, lineStr] = match;
    nodes.push(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          style: {
            background: "none",
            border: "none",
            padding: "0 1px",
            cursor: "pointer",
            fontFamily: "var(--dsw-alias-font-mono, ui-monospace, monospace)",
            fontSize: "inherit",
            color: "var(--dsw-alias-brand-primary, #2563eb)",
            textDecoration: "underline dotted"
          },
          title: "\u70B9\u51FB\u67E5\u770B\u4EE3\u7801\u4E0A\u4E0B\u6587",
          onClick: () => {
            peekOpener?.(path, Number(lineStr));
          },
          children: full
        },
        `${match.index}-${full}`
      )
    );
    last = match.index + full.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length === 1 ? nodes[0] : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: nodes });
}
var LAYOUT_STYLE = `
div[class*="frame"][style*="grid-template-columns"] > div[class*="centerCol"] { order: 3; }
div[class*="frame"][style*="grid-template-columns"] > div[class*="detailsCol"] { order: 2; }
div[class*="handle"][data-side="details"] { display: none !important; }
div[class*="frame"][style*="grid-template-columns"] {
  grid-template-columns: auto minmax(0, 1fr) var(--pc-chat-w, 360px) !important;
}
`;
var applyStatsLineClamp = () => {
  const sepSpan = Array.from(document.querySelectorAll('div[class*="_root"] > span[class*="_sep"]')).find((span) => span.textContent === "|");
  const rootDiv = sepSpan?.parentElement;
  const hashClass = rootDiv?.className.split(/\s+/).find((name2) => name2.endsWith("_root"));
  if (rootDiv === void 0 || rootDiv === null || hashClass === void 0 || getComputedStyle(rootDiv).textAlign !== "center") return void 0;
  const style = document.createElement("style");
  style.id = "pc-stats-clamp";
  style.textContent = `
div[class="${hashClass}"] {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  text-overflow: clip;
  font-size: 11px;
  line-height: 1.5;
  max-width: 100%;
}
`;
  document.head.appendChild(style);
  return style;
};
var WORKSPACE_DICT = {
  zh: {
    "workspace.title": "\u9879\u76EE\u6838\u67E5\u53F0",
    "tab.commits": "\u63D0\u4EA4\u6838\u67E5",
    "tab.overview": "\u9879\u76EE\u603B\u89C8",
    "tab.execution": "\u6267\u884C\u4E2D\u5FC3",
    "tab.review": "Review \u95EE\u9898",
    "tab.notes": "\u7B14\u8BB0\u4E0E\u8BB0\u5FC6",
    "tab.settings": "\u8BBE\u7F6E",
    "error.load": "\u52A0\u8F7D\u5931\u8D25",
    "state.project": "\u5F53\u524D\u9879\u76EE",
    "state.noProject": "\u5C1A\u672A\u521D\u59CB\u5316\u9879\u76EE",
    "state.noProjectHint": "\u70B9\u51FB\u300C\u521D\u59CB\u5316\u9879\u76EE\u300D\u626B\u63CF\u4ED3\u5E93\u7ED3\u6784\u3001\u6280\u672F\u6808\u4E0E\u7B26\u53F7\u7D22\u5F15\u3002",
    "action.bootstrap": "\u521D\u59CB\u5316\u9879\u76EE",
    "action.rescan": "\u91CD\u65B0\u521D\u59CB\u5316 / \u626B\u63CF",
    "action.analyze": "\u5206\u6790\u5F53\u524D\u6539\u52A8",
    "action.review": "\u8BC4\u5BA1\u5F53\u524D\u6539\u52A8",
    "action.verify": "\u9A8C\u6536\u5F53\u524D\u6539\u52A8",
    "action.createChange": "\u65B0\u5EFA\u53D8\u66F4",
    "action.running": "\u6267\u884C\u4E2D\u2026",
    "action.refresh": "\u5237\u65B0",
    "form.changeTitle": "\u53D8\u66F4\u6807\u9898",
    "form.changeDesc": "\u9700\u6C42\u4E0E\u80CC\u666F\uFF08\u9009\u586B\uFF09",
    "result.panel": "\u64CD\u4F5C\u7ED3\u679C",
    "repo.scanHistory": "\u91CD\u5EFA\u5386\u53F2",
    "repo.commits": "\u63D0\u4EA4",
    "repo.branch": "\u5206\u652F",
    "repo.working": "\u672A\u63D0\u4EA4\u6539\u52A8",
    "repo.workingClean": "\u5DE5\u4F5C\u533A\u5E72\u51C0\uFF0C\u65E0\u672A\u63D0\u4EA4\u6539\u52A8",
    "repo.empty": "\u6682\u65E0\u63D0\u4EA4\u3002",
    "repo.loadFailed": "\u63D0\u4EA4\u52A0\u8F7D\u5931\u8D25",
    "picker.title": "\u9009\u62E9\u8981\u6838\u67E5\u7684\u63D0\u4EA4\uFF08\u53EF\u591A\u9009\uFF09",
    "picker.placeholder": "\u70B9\u51FB\u9009\u62E9\u63D0\u4EA4\uFF08\u53EF\u591A\u9009\uFF0C\u542B\u672A\u63D0\u4EA4\u6539\u52A8\uFF09",
    "picker.selected": "\u5DF2\u9009",
    "picker.filter": "\u6309\u6807\u9898/\u54C8\u5E0C/\u4F5C\u8005\u8FC7\u6EE4\u2026",
    "picker.clear": "\u6E05\u7A7A",
    "picker.noMatch": "\u65E0\u5339\u914D\u63D0\u4EA4\u3002",
    "picker.hint": "\u52FE\u9009\u63D0\u4EA4\u540E\u81EA\u52A8\u751F\u6210 AI \u89E3\u8BFB\uFF1B\u4E0B\u65B9\u53EF\u518D\u8DD1\u5F71\u54CD\u8303\u56F4\u4E0E\u6700\u4F18\u6027\u6838\u67E5\u3002",
    "picker.round": "\u7B2C {n} \u8F6E",
    "picker.roundLatest": "\u7B2C {n} \u8F6E\uFF08\u6700\u65B0\uFF09",
    "picker.roundSelect": "\u9009\u6574\u8F6E",
    "picker.roundClear": "\u53D6\u6D88\u672C\u8F6E",
    "picker.undigested": "\u4E0A\u6B21 AI \u603B\u7ED3\u4E4B\u540E\u7684\u65B0\u63D0\u4EA4\uFF0C\u5C1A\u672A\u6838\u67E5\u6D88\u5316",
    "picker.undigestedCount": "{n} \u4E2A\u63D0\u4EA4\u672A\u6D88\u5316",
    "impact.factors": "\u98CE\u9669\u6784\u6210\uFF08\u4E3A\u4EC0\u4E48\u662F\u8FD9\u4E2A\u7B49\u7EA7\uFF09",
    "impact.points": "\u5F71\u54CD\u70B9\u660E\u7EC6",
    "impact.keyPoints": "\u5173\u952E\u7EC4\u4EF6",
    "impact.memory": "\u7ED3\u5408\u9879\u76EE\u8BB0\u5FC6\u6838\u67E5",
    "impact.functions": "\u53D7\u5F71\u54CD\u51FD\u6570\uFF08\u8C01\u8C03\u7528\u4E86\u88AB\u6539\u7684\u4EE3\u7801\uFF09",
    "impact.funcRole": "\u51FD\u6570\u529F\u80FD",
    "impact.funcChange": "\u672C\u6B21\u53D8\u5316",
    "impact.funcCallers": "\u5BF9\u8C03\u7528\u65B9\u7684\u5F71\u54CD",
    "cache.hit": "\u6765\u81EA\u7F13\u5B58",
    "cache.regenerate": "\u91CD\u65B0\u751F\u6210",
    "cost.tooltip": "\u672C\u6B21 AI \u8C03\u7528\u6210\u672C\uFF08\u4F30\u7B97\uFF0C\u6309 DeepSeek \u4EF7\u76EE\u6298\u7B97\uFF09",
    "exec.create": "\u65B0\u5EFA\u6267\u884C",
    "exec.formTitle": "\u8981\u505A\u4EC0\u4E48\uFF08\u4E00\u53E5\u8BDD\uFF09",
    "exec.formDesc": "\u9700\u6C42\u4E0E\u80CC\u666F\uFF1A\u76EE\u6807\u3001\u6D89\u53CA\u6A21\u5757\u3001\u9A8C\u6536\u6807\u51C6",
    "exec.start": "\u5F00\u59CB\u6267\u884C",
    "exec.starting": "\u6B63\u5728\u542F\u52A8\u2026",
    "exec.createHint": "\u521B\u5EFA\u53D8\u66F4\u5E76\u81EA\u52A8\u751F\u6210\u8BA1\u5212\uFF0C\u968F\u540E\u7531 AI \u5B50\u4EE3\u7406\u9010\u6B65\u6267\u884C\uFF1B\u8FDB\u5EA6\u5728\u4E0B\u65B9\u5B9E\u65F6\u5237\u65B0\uFF0C\u65E0\u9700\u53BB\u804A\u5929\u3002",
    "exec.modelDefault": "\u6267\u884C\u6A21\u578B\uFF08\u89D2\u8272\u9ED8\u8BA4\uFF1A\u5206\u6790/\u64CD\u4F5C=\u5FEB\uFF0C\u5F00\u53D1=\u6807\u51C6\uFF0C\u89C4\u5212=\u63A8\u7406\uFF0C\u9A8C\u6536=\u9A8C\u6536\u7EA7\uFF09",
    "badge.running": "{n} \u4E2A\u4EFB\u52A1\u8FD0\u884C\u4E2D\uFF0C\u70B9\u51FB\u67E5\u770B",
    "narrative.title": "\u5DE5\u4F5C\u8F6E\u6B21\u53D9\u4E8B",
    "narrative.generate": "\u6574\u4F53\u89E3\u8BFB\u8FD9\u8F6E\u5DE5\u4F5C",
    "narrative.running": "\u89E3\u8BFB\u751F\u6210\u4E2D\u2026\uFF08\u7EA6 10-30 \u79D2\uFF09",
    "badge.failed": "{n} \u4E2A\u4EFB\u52A1\u9700\u8981\u5904\u7406\uFF0C\u70B9\u51FB\u67E5\u770B",
    "exec.flowCreate": "\u586B\u5199\u4EFB\u52A1",
    "exec.flowOrchestrate": "\u786E\u8BA4\u7F16\u6392\uFF08\u6BCF\u6B65\u53EF\u6539\u6A21\u578B/\u89D2\u8272/\u5931\u8D25\u7B56\u7565\uFF09",
    "exec.flowRun": "\u542F\u52A8\u6267\u884C\uFF08Run \u8BE6\u60C5\u770B\u8FDB\u5EA6\u4E0E\u6210\u672C\uFF09",
    "exec.flowMemory": "\u81EA\u52A8\u63D0\u70BC\u8BB0\u5FC6\uFF08\u8BB0\u5FC6\u9762\u677F\u786E\u8BA4\uFF09",
    "exec.planning": "\u7F16\u6392\u751F\u6210\u4E2D\u2026\uFF08LLM \u6B63\u5728\u62C6\u89E3\u4EFB\u52A1\uFF0C\u7EA6 10-30 \u79D2\uFF09",
    "exec.col.steps": "\u6B65\u9AA4",
    "notes.edit": "\u7F16\u8F91",
    "notes.toMemory": "\u8F6C\u8BB0\u5FC6",
    "notes.toMemoryHint": "\u628A\u8FD9\u6761\u7B14\u8BB0\u7684\u6807\u9898\u4E0E\u5185\u5BB9\u586B\u5165\u4E0B\u65B9\u8BB0\u5FC6\u8868\u5355\uFF0C\u786E\u8BA4\u540E\u5165\u5E93",
    "notes.toMemoryDone": "\u2713 \u5DF2\u586B\u5165\u8BB0\u5FC6\u8868\u5355\uFF08\u5728\u4E0B\u65B9\u300C\u9879\u76EE\u8BB0\u5FC6\u300D\u533A\u786E\u8BA4\u7C7B\u578B\u540E\u6DFB\u52A0\uFF09",
    "notes.copyMd": "\u590D\u5236 MD",
    "notes.copyMdHint": "\u628A\u8FD9\u6761\u7B14\u8BB0\u590D\u5236\u4E3A Markdown \u5230\u526A\u8D34\u677F",
    "notes.copyMdDone": "\u5DF2\u590D\u5236\u4E3A Markdown",
    "notes.exportMd": "\u5BFC\u51FA MD",
    "notes.exportMdHint": "\u4E0B\u8F7D\u4E3A .md \u6587\u4EF6",
    "notes.exportDone": "\u5DF2\u5BFC\u51FA\u4E3A .md \u6587\u4EF6",
    "notes.digestNever": "\u5C1A\u672A\u751F\u6210\u8FC7 AI \u603B\u7ED3",
    "notes.digestPending": "\u4E0A\u6B21\u603B\u7ED3\u540E\u6709 {n} \u4E2A\u65B0\u63D0\u4EA4\u672A\u6D88\u5316",
    "detail.saveNote": "\u5B58\u4E3A\u7B14\u8BB0",
    "detail.saveNoteHint": "\u628A\u672C\u6B21\u6838\u67E5\u7ED3\u8BBA\uFF08\u6539\u4E86\u4EC0\u4E48/\u5B9E\u73B0\u903B\u8F91/\u98CE\u9669\u70B9\uFF09\u4E00\u952E\u5B58\u4E3A\u7ED3\u6784\u5316\u7B14\u8BB0",
    "detail.saveNoteTitle": "\u6838\u67E5\u8BB0\u5F55",
    "detail.saveMemory": "\u6C89\u6DC0\u4E3A\u8BB0\u5FC6",
    "detail.saveMemoryHint": "\u628A\u672C\u6B21\u6838\u67E5\u7ED3\u8BBA\u6C89\u6DC0\u4E3A\u9879\u76EE\u8BB0\u5FC6\uFF08\u8FDB\u5165\u5F85\u786E\u8BA4\u961F\u5217\uFF09",
    "notes.save": "\u4FDD\u5B58",
    "notes.cancel": "\u53D6\u6D88",
    "memory.branchScope": "\u5206\u652F",
    "memory.branchAll": "\u5168\u90E8\u5206\u652F",
    "notes.search": "\u641C\u7D22\u7B14\u8BB0\u2026",
    "model.title": "\u6A21\u578B\u5206\u914D\uFF08\u89E3\u8BFB / \u603B\u7ED3\u7B49\u4EFB\u52A1\u7528\u54EA\u4E2A\u6A21\u578B\uFF09",
    "model.loading": "\u8BFB\u53D6\u6A21\u578B\u6E05\u5355\u2026",
    "model.followChat": "\u8DDF\u968F\u804A\u5929\u6A21\u578B",
    "model.save": "\u4FDD\u5B58\u5E76\u751F\u6548",
    "model.saved": "\u5DF2\u751F\u6548",
    "model.hint": "\u4FDD\u5B58\u540E\u7ACB\u5373\u751F\u6548\u5E76\u6301\u4E45\u5316\uFF08\u91CD\u542F\u540E\u4FDD\u7559\uFF09\uFF1B\u4E0D\u5F71\u54CD\u804A\u5929\u6A21\u578B\u3002",
    "notes.aiSummary": "AI \u603B\u7ED3\u7B14\u8BB0",
    "notes.aiSummaryRun": "\u603B\u7ED3\u751F\u6210\u4E2D\u2026\uFF08\u7EA6 10-30 \u79D2\uFF09",
    "notes.expand": "\u5C55\u5F00\u5168\u6587",
    "notes.collapse": "\u6536\u8D77",
    "notes.summaryTag": "AI \u603B\u7ED3",
    "notes.emptySearch": "\u65E0\u5339\u914D\u7B14\u8BB0\u3002",
    "notes.contentHint": "\u7B14\u8BB0\u5185\u5BB9\uFF08\u652F\u6301\u591A\u884C\uFF09\uFF1A\u7ED3\u8BBA\u3001\u7591\u95EE\u3001\u5B66\u4E60\u8981\u70B9\u3001\u5173\u952E\u51B3\u7B56\u2026",
    "notes.tagsHint": "\u6807\u7B7E\uFF08\u9017\u53F7\u5206\u9694\uFF0C\u9009\u586B\uFF1B\u4FDD\u5B58\u540E\u53EF\u70B9\u51FB\u7B5B\u9009\uFF09",
    "notes.pin": "\u7F6E\u9876",
    "notes.unpin": "\u53D6\u6D88\u7F6E\u9876",
    "notes.editedAt": "\u7F16\u8F91\u4E8E",
    "review.filterAll": "\u5168\u90E8",
    "review.statusAll": "\u5168\u90E8\u72B6\u6001",
    "review.verify": "\u590D\u68C0",
    "review.verifyRunning": "\u590D\u68C0\u4E2D\u2026",
    "review.verifyHint": "\u4FEE\u6539\u4EE3\u7801\u540E\u70B9\u51FB\uFF1A\u81EA\u52A8\u68C0\u6D4B\u95EE\u9898\u662F\u5426\u4FEE\u590D\u3001\u6539\u52A8\u662F\u5426\u6700\u4F18/\u6700\u5C0F\u4FB5\u5165\u3001\u6709\u65E0\u65B0\u95EE\u9898\uFF1B\u5168\u90E8\u901A\u8FC7\u624D\u81EA\u52A8\u7F6E\u4E3A\u5DF2\u89E3\u51B3",
    "review.falsePositive": "\u5224\u5B9A\u8BEF\u62A5",
    "review.falsePositiveHint": "\u4EBA\u5DE5\u5224\u5B9A\u8BE5\u95EE\u9898\u4E3A\u8BEF\u62A5\u5E76\u5173\u95ED\uFF08\u4E0E\u590D\u68C0\u89E3\u51B3\u7684\u8BED\u4E49\u4E0D\u540C\uFF09",
    "review.falsePositiveTitle": "\u5224\u5B9A\u4E3A\u8BEF\u62A5\uFF1F",
    "review.falsePositiveMsg": "\u300C{title}\u300D\u5C06\u88AB\u6807\u8BB0\u4E3A\u8BEF\u62A5\uFF08\u5DF2\u62D2\u7EDD\uFF09\u5E76\u4ECE\u5F85\u5904\u7406\u4E2D\u79FB\u9664\u3002",
    "review.fixDetail": "\u4FEE\u590D\u8BE6\u60C5",
    "review.fixStatFiles": "\u6587\u4EF6",
    "review.fixFiles": "\u4FEE\u590D\u6D89\u53CA\u6587\u4EF6",
    "review.fixImpact": "\u5F71\u54CD\u8303\u56F4\uFF08\u6539\u52A8\u7B26\u53F7\u4E0E\u8C03\u7528\u70B9\uFF09",
    "review.definedIn": "\u5B9A\u4E49\u4E8E",
    "review.callCount": "\u5904\u8C03\u7528",
    "review.fixDiff": "\u4FEE\u590D\u5DEE\u5F02\uFF08\u76F8\u5BF9\u8BC4\u5BA1\u57FA\u7EBF\uFF09",
    "review.refresh": "\u5237\u65B0",
    "review.retentionHint": "\u5DF2\u89E3\u51B3\u95EE\u9898\u4FDD\u7559 {days} \u5929\u540E\u81EA\u52A8\u6E05\u7406",
    "review.target": "\u5BF9\u8C61",
    "review.workingTarget": "\u5DE5\u4F5C\u533A",
    "plan.title": "\u7F16\u6392\u8BA1\u5212\u786E\u8BA4",
    "plan.hint": "\u6BCF\u6B65\u7684\u89D2\u8272\u51B3\u5B9A\u4E0A\u4E0B\u6587\u6CE8\u5165\u4E0E\u9ED8\u8BA4\u6A21\u578B\uFF08\u5206\u6790/\u64CD\u4F5C=fast\uFF0C\u5F00\u53D1=standard\uFF0C\u89C4\u5212=reasoning\uFF0C\u9A8C\u6536=verifier\uFF09\uFF1B\u53EF\u8C03\u6574\u540E\u518D\u542F\u52A8\u3002",
    "plan.col.step": "\u6B65\u9AA4",
    "plan.col.role": "\u89D2\u8272",
    "plan.col.model": "\u6A21\u578B",
    "plan.col.policy": "\u5931\u8D25\u7B56\u7565",
    "plan.col.enabled": "\u542F\u7528",
    "plan.col.attempts": "\u5C1D\u8BD5",
    "plan.modelDefault": "\u8DDF\u968F\u89D2\u8272\u9ED8\u8BA4",
    "plan.launchEdited": "\u4FDD\u5B58\u4FEE\u6539\u5E76\u542F\u52A8",
    "plan.launchDirect": "\u6309\u539F\u8BA1\u5212\u542F\u52A8",
    "plan.discard": "\u653E\u5F03",
    "plan.viewDetail": "\u8BE6\u60C5",
    "plan.refreshDetail": "\u5237\u65B0",
    "plan.closeDetail": "\u6536\u8D77",
    "plan.detailTitle": "Run \u8BE6\u60C5",
    "plan.pausedBanner": "\u4EFB\u52A1\u5DF2\u6682\u505C\uFF0C\u7B49\u5F85\u4F60\u7684\u51B3\u7B56",
    "plan.resumeRetry": "\u91CD\u8BD5\u8BE5\u6B65\u9AA4\u5E76\u7EE7\u7EED",
    "plan.resumeSkip": "\u8DF3\u8FC7\u8BE5\u6B65\u9AA4\u7EE7\u7EED",
    "plan.resumeFailed": "\u4ECE\u5931\u8D25\u5904\u6062\u590D",
    "plan.contextTitle": "\u4EFB\u52A1\u4E0A\u4E0B\u6587\uFF08\u672C Run \u6CE8\u5165\u4E86\u4EC0\u4E48\uFF09",
    "plan.branch": "\u5206\u652F",
    "plan.injectedMemories": "\u6CE8\u5165\u8BB0\u5FC6",
    "plan.decisionLog": "\u51B3\u7B56\u65E5\u5FD7",
    "exec.col.detail": "\u8BE6\u60C5",
    "sched.title": "\u4F8B\u884C\u4EFB\u52A1",
    "sched.formName": "\u4EFB\u52A1\u540D\u79F0",
    "sched.formInterval": "\u95F4\u9694\uFF08\u5206\u949F\uFF09",
    "sched.typeReview": "\u81EA\u52A8\u8BC4\u5BA1",
    "sched.typeSummary": "AI \u603B\u7ED3",
    "sched.typeRun": "\u5B9A\u65F6\u6267\u884C",
    "sched.add": "\u521B\u5EFA",
    "sched.hint": "\u5230\u70B9\u81EA\u52A8\u6267\u884C\uFF1A\u81EA\u52A8\u8BC4\u5BA1=\u8BC4\u5BA1\u8FD1 24 \u5C0F\u65F6\u7684\u65B0\u63D0\u4EA4\uFF08\u95EE\u9898\u8FDB Review \u9762\u677F\uFF09\uFF1BAI \u603B\u7ED3=\u751F\u6210\u589E\u91CF\u5B66\u4E60\u603B\u7ED3\uFF1B\u5B9A\u65F6\u6267\u884C=\u6309\u6A21\u677F\u8DD1\u4E00\u6B21\u7F16\u6392\u4EFB\u52A1\u3002\u6700\u5C0F 1 \u5206\u949F\u3002",
    "sched.empty": "\u6682\u65E0\u4F8B\u884C\u4EFB\u52A1\u3002",
    "sched.col.name": "\u540D\u79F0",
    "sched.col.type": "\u7C7B\u578B",
    "sched.col.interval": "\u5468\u671F",
    "sched.col.next": "\u4E0B\u6B21\u6267\u884C",
    "sched.col.lastResult": "\u4E0A\u6B21\u7ED3\u679C",
    "sched.col.actions": "\u64CD\u4F5C",
    "sched.day": " \u5929",
    "sched.hour": " \u5C0F\u65F6",
    "sched.minute": " \u5206\u949F",
    "sched.disable": "\u6682\u505C",
    "sched.enable": "\u542F\u7528",
    "sched.runNow": "\u7ACB\u5373\u6267\u884C",
    "memory.zoneTitle": "\u9879\u76EE\u8BB0\u5FC6",
    "memory.syncBaseline": "\u540C\u6B65\u57FA\u7EBF",
    "memory.syncNone": "\u672A\u540C\u6B65",
    "memory.behind": "\u843D\u540E {n} \u4E2A\u63D0\u4EA4\u672A\u540C\u6B65",
    "memory.sync": "\u540C\u6B65\u8BB0\u5FC6",
    "memory.syncing": "\u540C\u6B65\u4E2D\u2026",
    "memory.syncFailed": "\u540C\u6B65\u5931\u8D25",
    "memory.staleTitle": "\u7591\u4F3C\u8FC7\u65F6\uFF08\u76F8\u5173\u4EE3\u7801\u5DF2\u88AB\u6539\u52A8\uFF0C\u5F85\u4F60\u590D\u6838\uFF09",
    "memory.markStale": "\u6807\u8BB0\u8FC7\u65F6",
    "memory.archiveBtn": "\u5F52\u6863",
    "memory.keepActive": "\u4ECD\u6709\u6548",
    "memory.newCandidates": "\u65B0\u589E\u5019\u9009\uFF08\u5DF2\u5165\u5F85\u786E\u8BA4\u961F\u5217\uFF09\uFF1A",
    "memory.closeReport": "\u5173\u95ED\u62A5\u544A",
    "memory.scopeProject": "\u4E3B\u5E72\uFF08\u5168\u5206\u652F\uFF09",
    "memory.scopeBranch": "\u4EC5\u5F53\u524D\u5206\u652F",
    "memory.pendingQueue": "\u5F85\u786E\u8BA4\u961F\u5217",
    "memory.toNote": "\u8F6C\u7B14\u8BB0",
    "memory.normalize": "\u5F52\u4E00\u5230\u4E3B\u5E72",
    "memory.restore": "\u6062\u590D",
    "memory.statusStale": "\u7591\u4F3C\u8FC7\u65F6",
    "impact.functionsNone": "\u672A\u8BC6\u522B\u51FA\u51FD\u6570\u7EA7\u8C03\u7528\u53D8\u5316\uFF08\u53EF\u80FD\u662F\u6837\u5F0F/\u9759\u6001\u8D44\u6E90/\u7EAF\u914D\u7F6E\u6539\u52A8\uFF09\u3002",
    "review.col.severity": "\u7EA7\u522B",
    "review.col.category": "\u7C7B\u522B",
    "review.col.title": "\u95EE\u9898",
    "review.col.evidence": "\u4F4D\u7F6E",
    "review.col.fix": "\u5EFA\u8BAE\u4FEE\u590D",
    "review.hint": "\u70B9\u51FB\u4E0A\u65B9\u6309\u94AE\u5F00\u59CB\u6838\u67E5\uFF0C\u4EA7\u51FA\u6700\u4F18\u6027\u7ED3\u8BBA\u4E0E\u95EE\u9898\u6E05\u5355\u3002",
    "diff.show": "\u5BF9\u6BD4",
    "diff.hide": "\u6536\u8D77\u5DEE\u5F02",
    "detail.title": "\u6838\u67E5\u8BE6\u60C5",
    "detail.pick": "\u2190 \u4ECE\u5DE6\u4FA7\u9009\u62E9\u4E00\u6B21\u63D0\u4EA4\uFF08\u6216\u672A\u63D0\u4EA4\u6539\u52A8\uFF09\u5F00\u59CB\u6838\u67E5",
    "detail.what": "\u6539\u4E86\u4EC0\u4E48",
    "detail.logic": "\u5B9E\u73B0\u903B\u8F91",
    "detail.risk": "\u98CE\u9669\u70B9",
    "detail.files": "\u6587\u4EF6\u6E05\u5355",
    "detail.patch": "\u67E5\u770B\u8865\u4E01\u539F\u6587",
    "detail.aiLoading": "AI \u89E3\u8BFB\u751F\u6210\u4E2D\u2026\uFF08\u7EA6 10-30 \u79D2\uFF09",
    "detail.queued": "\u8FD8\u6709 {n} \u4E2A\u89E3\u8BFB\u6392\u961F\u4E2D\uFF08\u81EA\u52A8\u5E76\u53D1\u6267\u884C\uFF09",
    "detail.cardQueued": "\u6392\u961F\u7B49\u5F85 AI \u89E3\u8BFB\uFF08\u5E76\u53D1\u4E0A\u9650 3\uFF0C\u907F\u514D\u6253\u6EE1\u6A21\u578B\u7F51\u5173\uFF09",
    "detail.impact": "\u5F71\u54CD\u8303\u56F4\u5206\u6790",
    "detail.impactLoading": "\u5F71\u54CD\u626B\u63CF\u4E2D\u2026\uFF08\u5F15\u7528\u68C0\u7D22 + \u56FE\u8C31\u4F20\u64AD\uFF09",
    "detail.optimality": "\u6700\u4F18\u6027\u6838\u67E5",
    "detail.optimalityLoading": "\u8BC4\u5BA1\u4E2D\u2026\uFF08\u4F1A\u4EA7\u51FA\u95EE\u9898\u6E05\u5355\u4E0E\u6700\u4F18\u6027\u7ED3\u8BBA\uFF09",
    "impact.risk": "\u98CE\u9669",
    "impact.col.changed": "\u53D8\u66F4\u6587\u4EF6",
    "impact.col.indirect": "\u95F4\u63A5\u5F71\u54CD\uFF08\u5F15\u7528\u94FE\uFF09",
    "impact.col.potential": "\u6F5C\u5728\u5F71\u54CD",
    "impact.none": "\u672A\u53D1\u73B0\u4ED3\u5E93\u5185\u5F15\u7528\u8005\uFF08\u6539\u52A8\u770B\u4F3C\u72EC\u7ACB\uFF09\u3002",
    "impact.tests": "\u5173\u8054\u6D4B\u8BD5",
    "impact.legend.changed": "\u53D8\u66F4",
    "impact.legend.indirect": "\u95F4\u63A5",
    "impact.legend.potential": "\u6F5C\u5728",
    "review.verdict": "\u6700\u4F18\u6027\u7ED3\u8BBA",
    "review.issues": "\u95EE\u9898\u6E05\u5355",
    "review.clean": "\u672A\u53D1\u73B0\u95EE\u9898\u3002",
    "notes.title": "\u6838\u67E5\u7B14\u8BB0",
    "notes.formTitle": "\u7B14\u8BB0\u6807\u9898",
    "notes.formContent": "\u7B14\u8BB0\u5185\u5BB9\uFF08\u7ED3\u8BBA\u3001\u7591\u95EE\u3001\u5B66\u4E60\u8981\u70B9\u2026\uFF09",
    "notes.add": "\u6DFB\u52A0\u7B14\u8BB0",
    "notes.boundTo": "\u5C06\u5173\u8054\u5230",
    "notes.col.time": "\u65F6\u95F4",
    "notes.col.title": "\u6807\u9898",
    "notes.col.content": "\u5185\u5BB9",
    "notes.col.sha": "\u5173\u8054\u63D0\u4EA4",
    "notes.remove": "\u5220\u9664",
    "notes.empty": "\u8FD8\u6CA1\u6709\u7B14\u8BB0\u3002\u6838\u67E5\u63D0\u4EA4\u65F6\u968F\u624B\u8BB0\u4E0B\u7ED3\u8BBA\u4E0E\u7591\u95EE\uFF0C\u5C31\u662F\u4F60\u7684\u9879\u76EE\u5B66\u4E60\u6863\u6848\u3002",
    "memory.record": "\u8BB0\u5F55\u9879\u76EE\u8BB0\u5FC6",
    "form.memoryTitle": "\u8BB0\u5FC6\u6807\u9898",
    "form.memoryContent": "\u8BB0\u5FC6\u5185\u5BB9\uFF08\u4EC0\u4E48\u4E0E\u4E3A\u4EC0\u4E48\uFF09",
    "memory.col.title": "\u6761\u76EE",
    "memory.col.type": "\u7C7B\u578B",
    "memory.col.truth": "\u771F\u503C",
    "memory.col.branch": "\u5206\u652F",
    "memory.confirm": "\u786E\u8BA4",
    "memory.empty": "\u6682\u65E0\u9879\u76EE\u8BB0\u5FC6\u3002\u53EF\u5728\u804A\u5929\u4E2D\u8BA9 AI \u8BB0\u5F55\uFF0C\u6216\u5728\u4E0A\u65B9\u624B\u52A8\u6DFB\u52A0\u3002",
    "concepts.title": "\u5B66\u4E60\u6982\u5FF5",
    "concepts.none": "\u6682\u65E0\u5B66\u4E60\u6982\u5FF5\u3002\u6267\u884C\u4E2D\u5FC3\u8DD1\u5B8C\u53D8\u66F4\u540E\u81EA\u52A8\u6C89\u6DC0\uFF0C\u4E5F\u53EF\u5728\u804A\u5929\u4E2D\u8BA9 AI \u603B\u7ED3\u5B66\u4E60\u8981\u70B9\u3002",
    "concepts.col.name": "\u6982\u5FF5",
    "concepts.col.category": "\u7C7B\u522B",
    "concepts.col.count": "\u6B21\u6570",
    "review.recordsTitle": "Review \u95EE\u9898",
    "review.recordsEmpty": "\u6682\u65E0\u95EE\u9898\u8BB0\u5F55\u3002\u63D0\u4EA4\u5BA1\u67E5\u9875\u8BC4\u5BA1\u51FA\u7684\u95EE\u9898\u4F1A\u81EA\u52A8\u767B\u8BB0\u5230\u8FD9\u91CC\uFF1B\u91CD\u65B0\u8BC4\u5BA1\u4F1A\u66FF\u6362\u65E7\u8BB0\u5F55\u3002",
    "verify.records": "\u9A8C\u6536\u8BB0\u5F55",
    "verify.recordsEmpty": "\u6682\u65E0\u9A8C\u6536\u8BB0\u5F55\u3002\u5728\u6267\u884C\u4E2D\u5FC3\u70B9\u300C\u9A8C\u6536\u300D\u5373\u751F\u6210\u3002",
    "confirmed.title": "\u5DF2\u786E\u5B9A\u7EA6\u675F\uFF08\u4EBA\u5DE5\u786E\u8BA4\uFF0CAI \u7981\u6539\u81EA\u52A8\u62E6\u622A\uFF09",
    "confirmed.add": "\u6DFB\u52A0\u7EA6\u675F",
    "confirmed.text": "\u7EA6\u675F/\u9700\u6C42\u5185\u5BB9",
    "confirmed.paths": "\u7981\u6539\u8DEF\u5F84\uFF08\u9017\u53F7\u5206\u9694\uFF1B\u76F8\u5BF9\u9879\u76EE\u6839\u5982 src/core\uFF0C\u6216\u7EDD\u5BF9\u8DEF\u5F84\uFF09",
    "confirmed.none": "\u6682\u65E0\u7EA6\u675F\u3002\u6DFB\u52A0\u540E\uFF0CAI \u4FEE\u6539\u672C\u9879\u76EE\u7684\u7981\u6539\u8DEF\u5F84\u5C06\u88AB\u81EA\u52A8\u62D2\u7EDD\uFF08\u4EC5\u5BF9\u672C\u9879\u76EE\u751F\u6548\uFF09\u3002",
    "changes.title": "\u53D8\u66F4\u4EFB\u52A1",
    "state.noChanges": "\u6682\u65E0\u53D8\u66F4\u4EFB\u52A1\u3002\u5728\u804A\u5929\u4E2D\u8BA9 AI \u521B\u5EFA\uFF0C\u6216\u7528\u4E0A\u65B9\u300C\u65B0\u5EFA\u53D8\u66F4\u300D\u3002",
    "changes.col.title": "\u6807\u9898",
    "changes.col.type": "\u7C7B\u578B",
    "changes.col.status": "\u72B6\u6001",
    "changes.col.updated": "\u66F4\u65B0\u65F6\u95F4",
    "exec.col.status": "\u72B6\u6001",
    "exec.col.change": "\u53D8\u66F4",
    "exec.col.started": "\u5F00\u59CB",
    "exec.col.cost": "\u6210\u672C(\u4F30)",
    "exec.attempts": "\u5C1D\u8BD5\u6B21\u6570",
    "exec.hint": "\u6267\u884C\uFF08start_run\uFF09\u8BF7\u5728\u53F3\u4FA7\u804A\u5929\u4E2D\u53D1\u8D77\uFF1A\u521B\u5EFA\u8BA1\u5212\u540E\u5BF9 AI \u8BF4\u300C\u5F00\u59CB\u6267\u884C\u8BE5 change\u300D\u3002\u672C\u9875\u67E5\u770B\u8FDB\u5EA6\u4E0E\u7ED3\u679C\u3002",
    "state.noRuns": "\u6682\u65E0\u6267\u884C\u8BB0\u5F55\u3002",
    "state.techStack": "\u6280\u672F\u6808",
    "state.symbols": "\u5DF2\u7D22\u5F15\u7B26\u53F7",
    "state.manifests": "\u6E05\u5355\u6587\u4EF6",
    "state.evidence": "\u8BC1\u636E\u6761\u76EE"
  },
  en: {
    "workspace.title": "Review Desk",
    "tab.commits": "Commit Review",
    "tab.overview": "Overview",
    "tab.execution": "Execution",
    "tab.review": "Review issues",
    "tab.notes": "Notes & Memory",
    "tab.settings": "Settings",
    "error.load": "Failed to load",
    "state.project": "Current project",
    "state.noProject": "No project initialized",
    "state.noProjectHint": 'Run "Initialize project" to scan the repository structure, tech stack, and symbol index.',
    "action.bootstrap": "Initialize project",
    "action.rescan": "Re-initialize / scan",
    "action.analyze": "Analyze working diff",
    "action.review": "Review working diff",
    "action.verify": "Verify working diff",
    "action.createChange": "Create change",
    "action.running": "Running\u2026",
    "action.refresh": "Refresh",
    "form.changeTitle": "Change title",
    "form.changeDesc": "Requirement and background (optional)",
    "result.panel": "Action result",
    "repo.add": "Add repo",
    "repo.addHint": "Enter an absolute repo path and press Enter; previously used repos are remembered",
    "repo.scanHistory": "Rebuild history",
    "repo.commits": "commits",
    "repo.branch": "branch",
    "repo.working": "Uncommitted changes",
    "repo.workingClean": "Working tree is clean",
    "repo.empty": "No commits.",
    "repo.loadFailed": "Failed to load commits",
    "picker.title": "Pick commits to review (multi-select)",
    "picker.placeholder": "Click to pick commits (multi-select, includes uncommitted)",
    "picker.selected": "Selected",
    "picker.filter": "Filter by title/hash/author\u2026",
    "picker.clear": "Clear",
    "picker.noMatch": "No matching commit.",
    "picker.hint": "Checking a commit generates its AI explanation; run impact and optimality below.",
    "picker.round": "Round {n}",
    "picker.roundLatest": "Round {n} (latest)",
    "picker.roundSelect": "Select round",
    "picker.roundClear": "Clear round",
    "picker.undigested": "New commits since the last AI summary (not yet reviewed)",
    "picker.undigestedCount": "{n} unreviewed commits",
    "impact.factors": "Risk factors (why this level)",
    "impact.points": "Impacted points",
    "impact.keyPoints": "Key components",
    "impact.memory": "Cross-check with project memory",
    "impact.functions": "Impacted functions (who calls the changed code)",
    "impact.funcRole": "Function role",
    "impact.funcChange": "Changed by this commit",
    "impact.funcCallers": "Impact on callers",
    "cache.hit": "from cache",
    "cache.regenerate": "Regenerate",
    "cost.tooltip": "Estimated cost of this AI call (DeepSeek pricing)",
    "exec.create": "New run",
    "exec.formTitle": "What to do (one line)",
    "exec.formDesc": "Requirement: goal, modules, acceptance",
    "exec.start": "Start run",
    "exec.starting": "Starting\u2026",
    "exec.createHint": "Creates a change, generates a plan, then AI subagents execute step by step; progress refreshes below.",
    "exec.modelDefault": "Execution model (role defaults: analysis/ops=fast, coding=standard, planning=reasoning, verification=verifier)",
    "badge.running": "{n} runs in progress, click to view",
    "narrative.title": "Work-round narrative",
    "narrative.generate": "Interpret this round of work",
    "narrative.running": "Generating\u2026 (~10-30s)",
    "badge.failed": "{n} runs need attention, click to view",
    "exec.flowCreate": "Describe the task",
    "exec.flowOrchestrate": "Confirm orchestration (per-step model/role/failure policy)",
    "exec.flowRun": "Launch (track progress & cost in run detail)",
    "exec.flowMemory": "Auto-distill memories (confirm in memory panel)",
    "exec.planning": "Generating orchestration\u2026 (LLM is decomposing the task, ~10-30s)",
    "exec.col.steps": "Steps",
    "notes.edit": "Edit",
    "notes.toMemory": "To memory",
    "notes.toMemoryHint": "Prefill the memory form below with this note",
    "notes.toMemoryDone": "\u2713 Prefilled the memory form (choose a type in the Project memory zone below, then add)",
    "notes.copyMd": "Copy MD",
    "notes.copyMdHint": "Copy this note as Markdown to the clipboard",
    "notes.copyMdDone": "Copied as Markdown",
    "notes.exportMd": "Export MD",
    "notes.exportMdHint": "Download as a .md file",
    "notes.exportDone": "Exported as .md",
    "notes.digestNever": "No AI summary generated yet",
    "notes.digestPending": "{n} new commits since the last summary",
    "detail.saveNote": "Save as note",
    "detail.saveNoteHint": "Save this review conclusion (what/logic/risks) as a structured note",
    "detail.saveNoteTitle": "Review record",
    "detail.saveMemory": "Distill to memory",
    "detail.saveMemoryHint": "Distill this review conclusion into a project memory (queued for confirmation)",
    "notes.save": "Save",
    "notes.cancel": "Cancel",
    "memory.branchScope": "Branch",
    "memory.branchAll": "All branches",
    "notes.search": "Search notes\u2026",
    "model.title": "Model assignment (which model per task)",
    "model.loading": "Loading models\u2026",
    "model.followChat": "Follow chat model",
    "model.save": "Save & apply",
    "model.saved": "Applied",
    "model.hint": "Applies immediately and persists across restarts; chat model unaffected.",
    "notes.aiSummary": "AI summary",
    "notes.aiSummaryRun": "Summarizing\u2026 (10-30s)",
    "notes.expand": "Expand",
    "notes.collapse": "Collapse",
    "notes.summaryTag": "AI summary",
    "notes.emptySearch": "No matching notes.",
    "notes.contentHint": "Note content (multi-line): conclusions, questions, learnings\u2026",
    "notes.tagsHint": "Tags (comma separated, optional; click a tag to filter)",
    "notes.pin": "Pin",
    "notes.unpin": "Unpin",
    "notes.editedAt": "edited",
    "review.filterAll": "All",
    "review.statusAll": "All statuses",
    "review.verify": "Re-verify",
    "review.verifyRunning": "Verifying\u2026",
    "review.verifyHint": "After fixing the code, click to re-check: whether issues are fixed, whether the change is optimal and minimally invasive, and whether new issues appeared. Only a passing re-verification marks issues resolved.",
    "review.falsePositive": "False positive",
    "review.falsePositiveHint": "Human-mark this issue as a false positive and close it (distinct from a verified fix)",
    "review.falsePositiveTitle": "Mark as false positive?",
    "review.falsePositiveMsg": '"{title}" will be marked rejected and removed from the open queue.',
    "review.fixDetail": "Fix details",
    "review.fixStatFiles": "files",
    "review.fixFiles": "Files touched by the fix",
    "review.fixImpact": "Impact scope (changed symbols and callers)",
    "review.definedIn": "defined in",
    "review.callCount": "call site(s)",
    "review.fixDiff": "Fix diff (relative to the review baseline)",
    "review.refresh": "Refresh",
    "review.retentionHint": "Resolved issues are auto-purged after {days} day(s)",
    "review.target": "Target",
    "review.workingTarget": "Working tree",
    "plan.title": "Orchestration plan",
    "plan.hint": "Each step role drives context injection and the default model (analysis/ops=fast, coding=standard, planning=reasoning, verification=verifier); adjust before launching.",
    "plan.col.step": "Step",
    "plan.col.role": "Role",
    "plan.col.model": "Model",
    "plan.col.policy": "Failure policy",
    "plan.col.enabled": "On",
    "plan.col.attempts": "Attempts",
    "plan.modelDefault": "Role default",
    "plan.launchEdited": "Save edits & launch",
    "plan.launchDirect": "Launch as-is",
    "plan.discard": "Discard",
    "plan.viewDetail": "Detail",
    "plan.refreshDetail": "Refresh",
    "plan.closeDetail": "Close",
    "plan.detailTitle": "Run detail",
    "plan.pausedBanner": "Run paused, awaiting your decision",
    "plan.resumeRetry": "Retry step & continue",
    "plan.resumeSkip": "Skip step & continue",
    "plan.resumeFailed": "Resume from failure",
    "plan.contextTitle": "Run context (what was injected)",
    "plan.branch": "Branch",
    "plan.injectedMemories": "Injected memories",
    "plan.decisionLog": "Decision log",
    "exec.col.detail": "Detail",
    "sched.title": "Scheduled tasks",
    "sched.formName": "Task name",
    "sched.formInterval": "Interval (minutes)",
    "sched.typeReview": "Auto review",
    "sched.typeSummary": "AI summary",
    "sched.typeRun": "Timed run",
    "sched.add": "Create",
    "sched.hint": "Runs automatically when due: auto review = review commits from the last 24h (issues land in the Review tab); AI summary = incremental learning summary; timed run = execute the template as an orchestrated task. Minimum 1 minute.",
    "sched.empty": "No scheduled tasks yet.",
    "sched.col.name": "Name",
    "sched.col.type": "Type",
    "sched.col.interval": "Cycle",
    "sched.col.next": "Next run",
    "sched.col.lastResult": "Last result",
    "sched.col.actions": "Actions",
    "sched.day": " d",
    "sched.hour": " h",
    "sched.minute": " min",
    "sched.disable": "Pause",
    "sched.enable": "Enable",
    "sched.runNow": "Run now",
    "memory.zoneTitle": "Project memory",
    "memory.syncBaseline": "Sync baseline",
    "memory.syncNone": "never synced",
    "memory.behind": "{n} commits behind",
    "memory.sync": "Sync memory",
    "memory.syncing": "Syncing\u2026",
    "memory.syncFailed": "Sync failed",
    "memory.staleTitle": "Possibly stale (related code changed; review needed)",
    "memory.markStale": "Mark stale",
    "memory.archiveBtn": "Archive",
    "memory.keepActive": "Still valid",
    "memory.newCandidates": "New candidates (queued for confirmation):",
    "memory.closeReport": "Close report",
    "memory.scopeProject": "Mainline (all branches)",
    "memory.scopeBranch": "Current branch only",
    "memory.pendingQueue": "Pending confirmation",
    "memory.toNote": "To note",
    "memory.normalize": "Normalize to mainline",
    "memory.restore": "Restore",
    "memory.statusStale": "Stale",
    "fs.browse": "Browse",
    "fs.up": "Up",
    "fs.use": "Use this directory",
    "fs.register": "Also register as session workspace",
    "fs.loading": "Reading\u2026",
    "fs.empty": "No subdirectories.",
    "impact.functionsNone": "No function-level call impact detected (style/asset/config-only change).",
    "review.col.severity": "Severity",
    "review.col.category": "Category",
    "review.col.title": "Issue",
    "review.col.evidence": "Location",
    "review.col.fix": "Suggested fix",
    "review.hint": "Click the button above to produce the optimality verdict and issue list.",
    "diff.show": "Diff",
    "diff.hide": "Hide diff",
    "detail.title": "Review detail",
    "detail.pick": "\u2190 Pick a commit (or the uncommitted changes) on the left to start reviewing",
    "detail.what": "What it does",
    "detail.logic": "Implementation logic",
    "detail.risk": "Risks",
    "detail.files": "Files",
    "detail.patch": "Show raw patch",
    "detail.aiLoading": "Generating AI explanation\u2026 (10-30s)",
    "detail.queued": "{n} analyses queued (will run concurrently)",
    "detail.cardQueued": "Waiting in the analysis queue (max 3 concurrent to protect the model gateway)",
    "detail.impact": "Impact scope",
    "detail.impactLoading": "Scanning impact\u2026 (reference search + graph walk)",
    "detail.optimality": "Optimality review",
    "detail.optimalityLoading": "Reviewing\u2026 (produces issue list and optimality verdict)",
    "impact.risk": "Risk",
    "impact.col.changed": "Changed files",
    "impact.col.indirect": "Indirect (reference chain)",
    "impact.col.potential": "Potential",
    "impact.none": "No in-repo referencers found (the change looks self-contained).",
    "impact.tests": "Related tests",
    "impact.legend.changed": "changed",
    "impact.legend.indirect": "indirect",
    "impact.legend.potential": "potential",
    "review.verdict": "Optimality verdict",
    "review.issues": "Issues",
    "review.clean": "No issues found.",
    "notes.title": "Review notes",
    "notes.formTitle": "Note title",
    "notes.formContent": "Note content (conclusions, questions, learnings\u2026)",
    "notes.add": "Add note",
    "notes.boundTo": "Will be linked to",
    "notes.col.time": "Time",
    "notes.col.title": "Title",
    "notes.col.content": "Content",
    "notes.col.sha": "Commit",
    "notes.remove": "Delete",
    "notes.empty": "No notes yet. Note down conclusions and questions while reviewing commits \u2014 that is your project learning archive.",
    "memory.record": "Record project memory",
    "form.memoryTitle": "Memory title",
    "form.memoryContent": "Memory content (what and why)",
    "memory.col.title": "Item",
    "memory.col.type": "Type",
    "memory.col.truth": "Truth",
    "memory.col.branch": "Branch",
    "memory.confirm": "Confirm",
    "memory.empty": "No project memories yet. Ask the AI in chat to record one, or add above.",
    "concepts.title": "Learning concepts",
    "concepts.none": "No learning concepts yet. They accumulate after successful change runs, or ask the AI to summarize learning points.",
    "concepts.col.name": "Concept",
    "concepts.col.category": "Category",
    "concepts.col.count": "Count",
    "review.recordsTitle": "Review issues",
    "review.recordsEmpty": "No issue records yet. Issues found by the commit-review page are recorded here automatically; re-reviewing replaces old records.",
    "verify.records": "Verification records",
    "verify.recordsEmpty": 'No verification records yet. Click "Verify" in the execution tab to generate one.',
    "confirmed.title": "Confirmed constraints (human-confirmed; AI edits to forbidden paths are auto-denied)",
    "confirmed.add": "Add constraint",
    "confirmed.text": "Requirement / constraint text",
    "confirmed.paths": "Forbidden paths (comma separated; relative to project root like src/core, or absolute)",
    "confirmed.none": "No constraints yet. Once added, AI edits to forbidden paths in this project are auto-denied.",
    "changes.title": "Change tasks",
    "state.noChanges": 'No change tasks yet. Ask the AI in chat to create one, or use "Create change" above.',
    "changes.col.title": "Title",
    "changes.col.type": "Type",
    "changes.col.status": "Status",
    "changes.col.updated": "Updated",
    "exec.col.status": "Status",
    "exec.col.change": "Change",
    "exec.col.started": "Started",
    "exec.col.cost": "Cost (est)",
    "exec.attempts": "Attempts",
    "exec.hint": 'Runs (start_run) are started from chat: after a plan exists, tell the AI to "start run for the change". This tab shows progress and results.',
    "state.noRuns": "No runs yet.",
    "state.techStack": "Tech stack",
    "state.symbols": "Indexed symbols",
    "state.manifests": "Manifests",
    "state.evidence": "Evidence entries"
  }
};
function fallbackT(key) {
  const dict = WORKSPACE_DICT.zh;
  return dict[key] ?? key;
}
function formatActionResult(data) {
  const lines = [data["ok"] === false ? "\u2717" : "\u2713"];
  for (const [key, value] of Object.entries(data)) {
    if (key === "ok") continue;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      lines.push(`${key}\uFF1A${String(value).slice(0, 200)}`);
    }
  }
  if (lines.length === 1) lines.push("\u6210\u529F");
  return lines.join("\n");
}
function renderCostBadge(usd, title) {
  if (usd === void 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.badge("#8b949e"), title, children: [
    "\u2248$",
    usd.toFixed(4)
  ] });
}
var styles = {
  root: {
    position: "relative",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "var(--dsw-alias-bg-base, #fff)",
    color: "var(--dsw-alias-label-primary, #1f2328)",
    fontFamily: "var(--ds-font-sans, inherit)",
    overflow: "hidden"
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "8px 12px",
    borderBottom: "1px solid var(--dsw-alias-border-l1, rgba(5,5,5,0.1))",
    flex: "none",
    background: "var(--dsw-alias-bg-base, #fff)"
  },
  title: { fontSize: "13px", fontWeight: 600, marginInlineEnd: "10px", color: "var(--dsw-alias-label-primary, #1f2328)" },
  tab: (active) => ({
    padding: "5px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    // button-info-fill 两主题都蓝；brand-primary 在深色主题是近白色，白字会被吞掉（页签白块事故）。
    background: active ? "var(--dsw-alias-button-info-fill, #2563eb)" : "transparent",
    color: active ? "#fff" : "var(--dsw-alias-label-secondary, #6b7280)"
  }),
  body: { flex: 1, overflowY: "auto", padding: "14px 16px" },
  card: {
    border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))",
    borderRadius: "8px",
    padding: "12px 14px",
    marginBottom: "12px",
    background: "var(--dsw-alias-bg-layer-1, #fafafa)"
  },
  row: { display: "flex", gap: "18px", flexWrap: "wrap", fontSize: "12px", margin: "6px 0" },
  label: { color: "var(--dsw-alias-label-secondary, #6b7280)", marginInlineEnd: "6px" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "12px" },
  th: { textAlign: "start", padding: "6px 8px", borderBottom: "1px solid var(--dsw-alias-border-l1, rgba(5,5,5,0.1))", color: "var(--dsw-alias-label-secondary, #6b7280)", fontWeight: 500 },
  td: { padding: "6px 8px", borderBottom: "1px solid var(--dsw-alias-border-l3, rgba(5,5,5,0.06))" },
  empty: { color: "var(--dsw-alias-label-secondary, #6b7280)", fontSize: "12px", padding: "10px 4px" },
  button: {
    padding: "5px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    // button-info-fill 是宿主两个主题下都为蓝色、白字可读的主操作色（brand-primary 在深色主题是近白色，白字不可读）。
    fontSize: "11px",
    background: "var(--dsw-alias-button-info-fill, #2563eb)",
    color: "#fff",
    whiteSpace: "nowrap"
  },
  secondary: {
    padding: "5px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "11px",
    border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.15))",
    background: "var(--dsw-alias-bg-layer-1, #fafafa)",
    color: "var(--dsw-alias-label-primary, #1f2328)",
    whiteSpace: "nowrap"
  },
  input: {
    width: "100%",
    padding: "6px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.15))",
    background: "var(--dsw-alias-bg-base, #fff)",
    color: "var(--dsw-alias-label-primary, #1f2328)",
    boxSizing: "border-box"
  },
  formRow: { display: "flex", flexDirection: "column", gap: "6px", marginBottom: "8px" },
  formInline: { display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", marginBottom: "8px" },
  // select 用系统外观时 Windows 浅色模式下强制白底，深色主题下不可读——自绘外观走主题变量。
  select: {
    appearance: "none",
    WebkitAppearance: "none",
    padding: "6px 26px 6px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.15))",
    background: "var(--dsw-alias-bg-base, #fff)",
    color: "var(--dsw-alias-label-primary, #1f2328)",
    backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%226%22><path d=%22M1 1l4 4 4-4%22 stroke=%22%23888%22 stroke-width=%221.5%22 fill=%22none%22/></svg>")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 8px center",
    cursor: "pointer",
    boxSizing: "border-box",
    maxWidth: "100%"
  },
  actionRow: { display: "flex", gap: "10px", alignItems: "center" },
  result: {
    whiteSpace: "pre-wrap",
    fontSize: "12px",
    lineHeight: 1.6,
    background: "var(--dsw-alias-bg-base, #fff)",
    border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))",
    borderRadius: "6px",
    padding: "10px 12px",
    maxHeight: "320px",
    overflowY: "auto"
  },
  badge: (color) => {
    const rgb = parseColor(color);
    if (rgb === null) {
      return { display: "inline-block", padding: "1px 8px", borderRadius: "4px", fontSize: "11px", background: `${color}22`, color };
    }
    const [r, g, b] = rgb;
    return {
      display: "inline-block",
      padding: "1px 8px",
      borderRadius: "4px",
      fontSize: "11px",
      background: `rgba(${r}, ${g}, ${b}, 0.16)`,
      color: themeAwareText(color)
    };
  },
  sectionTitle: { fontWeight: 600, fontSize: "12px", marginBottom: "8px" },
  what: { fontSize: "12px", lineHeight: 1.7, margin: "4px 0 8px" },
  logicStep: { fontSize: "12px", lineHeight: 1.8, display: "flex", gap: "6px" },
  riskItem: { fontSize: "12px", lineHeight: 1.7, margin: "2px 0" },
  commitRow: (active) => ({
    padding: "8px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    border: active ? "1px solid var(--dsw-alias-brand-primary, #2563eb)" : "1px solid transparent",
    background: active ? "rgba(37,99,235,0.06)" : "transparent",
    marginBottom: "4px"
  }),
  commitSubject: { fontSize: "12px", fontWeight: 600, lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  commitMeta: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)", marginTop: "2px", display: "flex", gap: "8px" },
  patch: {
    fontFamily: "monospace",
    fontSize: "11px",
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
    background: "var(--dsw-alias-bg-base, #fff)",
    border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))",
    borderRadius: "6px",
    padding: "10px",
    maxHeight: "320px",
    overflowY: "auto"
  },
  textarea: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.15))",
    background: "var(--dsw-alias-bg-base, #fff)",
    color: "var(--dsw-alias-label-primary, #1f2328)",
    boxSizing: "border-box",
    resize: "vertical",
    lineHeight: 1.7,
    fontFamily: "inherit"
  },
  noteCard: {
    border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.1))",
    borderRadius: "8px",
    padding: "12px 14px",
    marginBottom: "10px",
    background: "var(--dsw-alias-bg-base, #fff)"
  },
  noteTitleRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" },
  noteTitleText: { fontSize: "13px", fontWeight: 600, lineHeight: 1.5 },
  noteContent: {
    fontSize: "12px",
    lineHeight: 1.85,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    color: "var(--dsw-alias-label-primary, #1f2328)",
    marginTop: "6px"
  },
  noteClamp: {
    display: "-webkit-box",
    WebkitLineClamp: 6,
    WebkitBoxOrient: "vertical",
    overflow: "hidden"
  },
  noteMeta: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginTop: "8px",
    fontSize: "11px",
    color: "var(--dsw-alias-label-secondary, #6b7280)"
  },
  linkBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "11px",
    padding: "0",
    color: "var(--dsw-alias-brand-primary, #2563eb)"
  },
  chip: (active) => ({
    padding: "2px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    cursor: "pointer",
    border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.15))",
    // 同 tab：active 填色一律 button-info-fill（两主题都蓝），禁用 brand-primary。
    background: active ? "var(--dsw-alias-button-info-fill, #2563eb)" : "transparent",
    color: active ? "#fff" : "inherit"
  })
};
var RISK_COLOR = { low: "#4ec9b0", medium: "#dcdcaa", high: "#ce9178", critical: "#f14c4c" };
function ImpactGraph(props) {
  const { data } = props;
  const indirect = data.levels.filter((item) => item.level === "indirect");
  const potential = data.levels.filter((item) => item.level === "potential");
  const col0 = data.changedFiles.slice(0, 7);
  const col1 = Array.from(new Set(indirect.map((item) => item.path))).slice(0, 9);
  const col2 = Array.from(new Set(potential.map((item) => item.path))).filter((p) => !col1.includes(p)).slice(0, 8);
  const nodeH = 30;
  const gap = 10;
  const colX = [30, 380, 720];
  const colW = 280;
  const rows = Math.max(col0.length, col1.length, col2.length, 1);
  const height = rows * (nodeH + gap) + 60;
  const depthOf = (path) => {
    const item = indirect.find((entry) => entry.path === path) ?? potential.find((entry) => entry.path === path);
    return item?.depth ?? 0;
  };
  const renderCol = (col, items, color) => items.map((path, index) => {
    const y = 44 + index * (nodeH + gap);
    const dir = path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "";
    return import_react2.default.createElement(
      "g",
      { key: `${col}-${path}` },
      import_react2.default.createElement("rect", { x: colX[col], y, width: colW, height: nodeH, rx: 6, fill: color, stroke: "rgba(0,0,0,0.3)", strokeWidth: 1 }),
      import_react2.default.createElement(
        "text",
        { x: colX[col] + 10, y: y + 14, fontSize: 12, fontWeight: 700, fill: "#ffffff" },
        (path.split("/").pop() ?? path).slice(0, 30)
      ),
      import_react2.default.createElement(
        "text",
        { x: colX[col] + 10, y: y + 26, fontSize: 10, fill: "rgba(255,255,255,0.92)" },
        dir.slice(0, 40)
      ),
      import_react2.default.createElement("title", null, path)
    );
  });
  const chainStart = (reason) => {
    const match = reason.match(/path: (.+)$/);
    if (match === null) return data.changedFiles[0] ?? "";
    return match[1].split(" -> ")[0] ?? data.changedFiles[0] ?? "";
  };
  const indexIn = (items, path) => items.indexOf(path);
  const colOf = (path) => {
    if (col0.includes(path)) return 0;
    if (col1.includes(path)) return 1;
    if (col2.includes(path)) return 2;
    return -1;
  };
  const edges = [];
  const pushEdge = (fromPath, toPath, color, key) => {
    const fromCol = colOf(fromPath);
    const toCol = colOf(toPath);
    if (fromCol === -1 || toCol === -1 || toCol <= fromCol) return;
    const x1 = colX[fromCol] + colW;
    const y1 = 44 + indexIn([col0, col1, col2][fromCol] ?? [], fromPath) * (nodeH + gap) + nodeH / 2;
    const x2 = colX[toCol];
    const y2 = 44 + indexIn([col0, col1, col2][toCol] ?? [], toPath) * (nodeH + gap) + nodeH / 2;
    edges.push(import_react2.default.createElement("path", {
      key,
      d: `M ${x1} ${y1} C ${x1 + 30} ${y1}, ${x2 - 30} ${y2}, ${x2} ${y2}`,
      fill: "none",
      stroke: color,
      strokeWidth: 1.6,
      opacity: 0.6
    }));
  };
  for (const item of indirect.slice(0, 20)) pushEdge(chainStart(item.reason), item.path, themeAwareText("#d97706"), `ei-${item.path}`);
  for (const item of potential.slice(0, 16)) pushEdge(chainStart(item.reason), item.path, themeAwareText("#57606a"), `ep-${item.path}`);
  return import_react2.default.createElement(
    "div",
    null,
    import_react2.default.createElement(
      "svg",
      { width: "100%", viewBox: `0 0 1024 ${height}`, style: { maxHeight: 480 } },
      [["\u53D8\u66F4\u6587\u4EF6", 0], ["\u95F4\u63A5\u5F71\u54CD\uFF08\u8C01\u5F15\u7528\u4E86\u5B83\uFF09", 1], ["\u6F5C\u5728\u5F71\u54CD\uFF08\u4E8C\u7EA7\u4F20\u64AD\uFF09", 2]].map(([name2, col]) => import_react2.default.createElement("text", { key: String(col), x: colX[col], y: 24, fontSize: 12, fontWeight: 700, fill: "var(--dsw-alias-label-primary, #1f2328)" }, name2)),
      renderCol(0, col0, "#2563eb"),
      renderCol(1, col1, "#d97706"),
      renderCol(2, col2, "#57606a"),
      edges
    )
  );
}
var DIFF_KEYWORDS = /\b(public|private|protected|internal|static|void|class|struct|interface|enum|new|return|if|else|for|foreach|while|switch|case|break|continue|try|catch|finally|throw|using|namespace|import|export|from|const|let|var|async|await|function|this|base|super|null|true|false|override|virtual|abstract|sealed|readonly|params|out|ref|yield|typeof|instanceof|in|of|default|string|int|long|double|float|bool|char|decimal|object|record|partial|get|set|require|module|type|implements|extends)\b/g;
function highlightCodeLine(line, keyPrefix) {
  const trimmed = line.trimStart();
  if (trimmed.startsWith("//") || trimmed.startsWith("///") || trimmed.startsWith("*") || trimmed.startsWith("/*") || trimmed.startsWith("#")) {
    return [import_react2.default.createElement("span", { key: `${keyPrefix}-c`, style: { color: themeAwareText("#6a9955") } }, line)];
  }
  const parts = line.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) return import_react2.default.createElement("span", { key: `${keyPrefix}-s${i}`, style: { color: themeAwareText("#ce9178") } }, part);
    const sub = [];
    let last = 0;
    for (const match of part.matchAll(DIFF_KEYWORDS)) {
      if (match.index > last) sub.push(part.slice(last, match.index));
      sub.push(import_react2.default.createElement("span", { key: `${keyPrefix}-k${i}-${match.index}`, style: { color: themeAwareText("#569cd6") } }, match[0]));
      last = match.index + match[0].length;
    }
    if (last < part.length) sub.push(part.slice(last));
    return import_react2.default.createElement(import_react2.default.Fragment, { key: `${keyPrefix}-p${i}` }, sub);
  });
}
function DiffView(props) {
  const lines = props.patch.split("\n").filter((line, i) => !(line === "" && i === props.patch.split("\n").length - 1));
  return import_react2.default.createElement("div", {
    style: {
      fontFamily: "Consolas, monospace",
      fontSize: "11px",
      lineHeight: 1.55,
      background: "var(--dsw-alias-bg-base, #fff)",
      border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))",
      borderRadius: "6px",
      padding: "8px 0",
      maxHeight: 420,
      overflowY: "auto",
      marginTop: "6px"
    }
  }, lines.map((line, i) => {
    const kind = line.startsWith("+++") || line.startsWith("---") ? "meta" : line.startsWith("@@") ? "hunk" : line.startsWith("+") ? "add" : line.startsWith("-") ? "del" : "ctx";
    const bg = kind === "add" ? "rgba(46,160,67,0.14)" : kind === "del" ? "rgba(248,81,73,0.13)" : kind === "hunk" ? "rgba(56,139,253,0.1)" : "transparent";
    const content = kind === "meta" || kind === "hunk" ? import_react2.default.createElement("span", { style: { color: themeAwareText("#0969da"), fontWeight: 600 } }, line) : kind === "add" || kind === "del" ? import_react2.default.createElement("span", { style: { color: themeAwareText(kind === "add" ? "#1a7f37" : "#cf222e"), fontWeight: 600 } }, line[0]) : null;
    return import_react2.default.createElement(
      "div",
      { key: i, style: { padding: "0 10px", background: bg, whiteSpace: "pre-wrap", wordBreak: "break-all" } },
      content,
      kind === "add" || kind === "del" ? highlightCodeLine(line.slice(1), `l${i}`) : highlightCodeLine(line, `l${i}`)
    );
  }));
}
function formatTime(value) {
  if (value === null || value === void 0) return "\u2014";
  return new Date(value).toLocaleString();
}
function ConfirmDialog(props) {
  return import_react2.default.createElement(
    import_react2.default.Fragment,
    null,
    import_react2.default.createElement(
      "div",
      {
        "data-testid": "pc-confirm-overlay",
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "rgba(15,23,42,0.45)",
          backdropFilter: "blur(2px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "pcFadeIn 0.15s ease-out"
        },
        onClick: props.onCancel
      },
      import_react2.default.createElement(
        "div",
        {
          "data-testid": "pc-confirm-card",
          style: {
            width: 400,
            maxWidth: "calc(100vw - 48px)",
            background: "var(--dsw-alias-bg-base, #fff)",
            borderRadius: "12px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
            padding: "20px 22px 16px",
            onClick: (e) => {
              e.stopPropagation();
            }
          }
        },
        import_react2.default.createElement(
          "div",
          { style: { display: "flex", alignItems: "flex-start", gap: "10px" } },
          import_react2.default.createElement("div", {
            style: {
              width: 34,
              height: 34,
              borderRadius: "50%",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "17px",
              background: props.danger ? "rgba(244,63,94,0.12)" : "rgba(37,99,235,0.1)",
              color: props.danger ? themeAwareText("#e11d48") : themeAwareText("#2563eb")
            }
          }, props.danger ? "!" : "?"),
          import_react2.default.createElement(
            "div",
            null,
            import_react2.default.createElement("div", { style: { fontSize: "14px", fontWeight: 600, marginBottom: "6px", color: "var(--dsw-alias-label-primary, #1f2328)" } }, props.title),
            import_react2.default.createElement("div", { style: { fontSize: "12px", lineHeight: 1.7, color: "var(--dsw-alias-label-secondary, #6b7280)" } }, props.message)
          )
        ),
        import_react2.default.createElement(
          "div",
          { style: { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "18px" } },
          import_react2.default.createElement("button", {
            style: { ...styles.secondary, padding: "7px 18px", borderRadius: "8px" },
            onClick: props.onCancel
          }, "\u53D6\u6D88"),
          import_react2.default.createElement("button", {
            "data-testid": "pc-confirm-ok",
            style: {
              padding: "7px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 500,
              background: props.danger ? "#e11d48" : "var(--dsw-alias-button-info-fill, #2563eb)",
              color: "#fff"
            },
            onClick: props.onConfirm
          }, "\u786E\u8BA4\u5220\u9664")
        )
      )
    )
  );
}
function Card(props) {
  return import_react2.default.createElement(
    "div",
    { style: styles.card },
    props.title === void 0 ? null : import_react2.default.createElement("div", { style: styles.sectionTitle }, props.title),
    props.children
  );
}
function WorkspaceFrame(props) {
  const t = props.t ?? fallbackT;
  const [tab, setTab] = (0, import_react2.useState)("commits");
  const [state, setState] = (0, import_react2.useState)(null);
  const [loadError, setLoadError] = (0, import_react2.useState)(null);
  const [bootstrapping, setBootstrapping] = (0, import_react2.useState)(false);
  const [busy, setBusy] = (0, import_react2.useState)(null);
  const [actionResult, setActionResult] = (0, import_react2.useState)(null);
  const [changeTitle, setChangeTitle] = (0, import_react2.useState)("");
  const [changeDesc, setChangeDesc] = (0, import_react2.useState)("");
  const [memoryTitle, setMemoryTitle] = (0, import_react2.useState)("");
  const [memoryContent, setMemoryContent] = (0, import_react2.useState)("");
  const [confirmedText, setConfirmedText] = (0, import_react2.useState)("");
  const [confirmedPaths, setConfirmedPaths] = (0, import_react2.useState)("");
  const [commitsData, setCommitsData] = (0, import_react2.useState)(null);
  const [commitsError, setCommitsError] = (0, import_react2.useState)(null);
  const [pickerOpen, setPickerOpen] = (0, import_react2.useState)(false);
  const [pickerFilter, setPickerFilter] = (0, import_react2.useState)("");
  const [selectedTargets, setSelectedTargets] = (0, import_react2.useState)([]);
  const [details, setDetails] = (0, import_react2.useState)({});
  const [detailStatus, setDetailStatus] = (0, import_react2.useState)({});
  const detailQueuedCount = Object.values(detailStatus).filter((status) => status === "queued").length;
  const detailRunningCount = Object.values(detailStatus).filter((status) => status === "running").length;
  const [impact, setImpact] = (0, import_react2.useState)(null);
  const [impactLoading, setImpactLoading] = (0, import_react2.useState)(false);
  const [reviews, setReviews] = (0, import_react2.useState)({});
  const [reviewLoading, setReviewLoading] = (0, import_react2.useState)(false);
  const [fileDiffs, setFileDiffs] = (0, import_react2.useState)({});
  const [confirmDialog, setConfirmDialog] = (0, import_react2.useState)(null);
  const [notes, setNotes] = (0, import_react2.useState)([]);
  const [noteTitle, setNoteTitle] = (0, import_react2.useState)("");
  const [noteContent, setNoteContent] = (0, import_react2.useState)("");
  const [noteTags, setNoteTags] = (0, import_react2.useState)("");
  const [editingNote, setEditingNote] = (0, import_react2.useState)(null);
  const [noteSearch, setNoteSearch] = (0, import_react2.useState)("");
  const [noteExpanded, setNoteExpanded] = (0, import_react2.useState)({});
  const [issuesData, setIssuesData] = (0, import_react2.useState)(null);
  const [issueSeverityFilter, setIssueSeverityFilter] = (0, import_react2.useState)("");
  const [issueStatusFilter, setIssueStatusFilter] = (0, import_react2.useState)("");
  const [issueExpanded, setIssueExpanded] = (0, import_react2.useState)({});
  const [fixExpanded, setFixExpanded] = (0, import_react2.useState)({});
  const [verifyingTarget, setVerifyingTarget] = (0, import_react2.useState)(null);
  const [aiSummarizing, setAiSummarizing] = (0, import_react2.useState)(false);
  const [narrative, setNarrative] = (0, import_react2.useState)(null);
  const [narrativeBusy, setNarrativeBusy] = (0, import_react2.useState)(false);
  const [peek, setPeek] = (0, import_react2.useState)(null);
  const [peekData, setPeekData] = (0, import_react2.useState)(null);
  const [peekBusy, setPeekBusy] = (0, import_react2.useState)(false);
  const [narrativeError, setNarrativeError] = (0, import_react2.useState)("");
  const [modelTiers, setModelTiers] = (0, import_react2.useState)(null);
  const [modelOptions, setModelOptions] = (0, import_react2.useState)([]);
  const [modelSaving, setModelSaving] = (0, import_react2.useState)(false);
  const [modelSaved, setModelSaved] = (0, import_react2.useState)(false);
  const [planConfirm, setPlanConfirm] = (0, import_react2.useState)(null);
  const [planBusy, setPlanBusy] = (0, import_react2.useState)(false);
  const [runDetail, setRunDetail] = (0, import_react2.useState)(null);
  const [scheduledData, setScheduledData] = (0, import_react2.useState)(null);
  const [schedName, setSchedName] = (0, import_react2.useState)("");
  const [schedOpen, setSchedOpen] = (0, import_react2.useState)(true);
  const [schedType, setSchedType] = (0, import_react2.useState)("review");
  const [schedTitle, setSchedTitle] = (0, import_react2.useState)("");
  const [schedDesc, setSchedDesc] = (0, import_react2.useState)("");
  const [schedInterval, setSchedInterval] = (0, import_react2.useState)("1440");
  const [memoriesData, setMemoriesData] = (0, import_react2.useState)(null);
  const [syncReport, setSyncReport] = (0, import_react2.useState)(null);
  const [memoryScope, setMemoryScope] = (0, import_react2.useState)("project");
  const [memoryType, setMemoryType] = (0, import_react2.useState)("architecture_decision");
  const [memorySyncing, setMemorySyncing] = (0, import_react2.useState)(false);
  const [execTitle, setExecTitle] = (0, import_react2.useState)("");
  const [execModel, setExecModel] = (0, import_react2.useState)("");
  const [execDesc, setExecDesc] = (0, import_react2.useState)("");
  const post = async (path, body, timeoutMs = 18e4) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...body, sessionId: props.sessionId }),
        signal: controller.signal
      });
      const data = await response.json();
      return { ok: response.ok, data: data ?? {} };
    } finally {
      clearTimeout(timer);
    }
  };
  peekOpener = (path, line) => {
    void openPeek(path, line);
  };
  const openPeek = async (path, line) => {
    setPeek({ path, line });
    setPeekData(null);
    setPeekBusy(true);
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 1e4);
      const response = await fetch("/project-control/api/peek", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ path, line, sessionId: props.sessionId }),
        signal: controller.signal
      });
      clearTimeout(timer);
      const data = await response.json();
      if (response.ok) setPeekData(data);
    } catch {
      setPeekData({ exists: false });
    } finally {
      setPeekBusy(false);
    }
  };
  const loadNarrative = async (force = false) => {
    const shas = selectedTargets.filter((target) => target !== "working");
    if (shas.length < 2) return;
    setNarrativeBusy(true);
    setNarrativeError("");
    try {
      const { ok, data } = await post("/project-control/api/work-narrative", { shas, force });
      if (!ok) {
        setNarrativeError(String(data["error"] ?? "error"));
        return;
      }
      setNarrative({
        narrative: String(data["narrative"] ?? ""),
        cached: data["cached"] === true,
        generatedAt: data["generatedAt"] === void 0 ? void 0 : Number(data["generatedAt"]),
        costUsd: data["costUsd"] === void 0 ? void 0 : Number(data["costUsd"])
      });
    } catch (error) {
      setNarrativeError(error instanceof Error ? error.message : String(error));
    } finally {
      setNarrativeBusy(false);
    }
  };
  const loadCommits = async () => {
    try {
      const response = await fetch(`/project-control/api/commits?sessionId=${encodeURIComponent(props.sessionId ?? "")}&limit=60`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? `HTTP ${response.status}`);
      setCommitsData(data);
      setCommitsError(null);
    } catch (error) {
      setCommitsError(error instanceof Error ? error.message : String(error));
    }
  };
  const loadNotes = async () => {
    try {
      const response = await fetch("/project-control/api/notes?sessionId=" + encodeURIComponent(props.sessionId ?? ""));
      const data = await response.json();
      if (response.ok) setNotes(data.notes ?? []);
    } catch {
    }
  };
  const toggleTarget = async (target) => {
    setSelectedTargets((previous) => {
      if (previous.includes(target)) return previous.filter((item) => item !== target);
      return [...previous, target];
    });
    setImpact(null);
    setReviews({});
    if (!selectedTargets.includes(target)) {
      loadDetail(target, false);
    }
  };
  const selectRound = (shas) => {
    setImpact(null);
    setReviews({});
    if (shas.every((sha) => selectedTargets.includes(sha))) {
      setSelectedTargets((previous) => previous.filter((sha) => !shas.includes(sha)));
      return;
    }
    const added = shas.filter((sha) => !selectedTargets.includes(sha));
    setSelectedTargets((previous) => Array.from(/* @__PURE__ */ new Set([...previous, ...shas])));
    for (const sha of added) loadDetail(sha, false);
  };
  const MAX_DETAIL_CONCURRENCY = 3;
  const detailPoolRef = (0, import_react2.useRef)({ pending: [], active: 0 });
  const detailInFlightRef = (0, import_react2.useRef)(/* @__PURE__ */ new Set());
  const pumpDetailPool = () => {
    const pool = detailPoolRef.current;
    while (pool.active < MAX_DETAIL_CONCURRENCY && pool.pending.length > 0) {
      const job = pool.pending.shift();
      pool.active += 1;
      void loadDetailOnce(job.target, job.force).catch(() => {
      }).finally(() => {
        pool.active -= 1;
        pumpDetailPool();
      });
    }
  };
  const loadDetail = (target, force) => {
    if (detailInFlightRef.current.has(target)) return;
    detailInFlightRef.current.add(target);
    setDetailStatus((previous) => ({ ...previous, [target]: "queued" }));
    detailPoolRef.current.pending.push({ target, force });
    pumpDetailPool();
  };
  const loadDetailOnce = async (target, force) => {
    setDetailStatus((previous) => ({ ...previous, [target]: "running" }));
    const failPlaceholder = (message) => ({
      sha: target,
      isWorking: target === "working",
      files: [],
      insertions: 0,
      deletions: 0,
      patchTruncated: false,
      patch: "",
      commit: null,
      analysis: { what: message, logic: [], risks: [] }
    });
    try {
      const { ok, data } = await post("/project-control/api/commit-detail", { sha: target, force });
      if (!ok) {
        setDetails((previous) => ({
          ...previous,
          [target]: failPlaceholder("AI \u89E3\u8BFB\u5931\u8D25\uFF1A" + String(data["error"] ?? "") + "\uFF08\u70B9\u300C\u91CD\u65B0\u751F\u6210\u300D\u53EF\u91CD\u8BD5\uFF09")
        }));
        return;
      }
      setDetails((previous) => ({ ...previous, [target]: data }));
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      setDetails((previous) => ({
        ...previous,
        [target]: failPlaceholder(`AI \u89E3\u8BFB\u5931\u8D25\uFF1A${reason === "The user aborted a request." ? "\u8BF7\u6C42\u8D85\u65F6\u6216\u670D\u52A1\u4E2D\u65AD" : reason}\uFF08\u68C0\u67E5 dsh \u662F\u5426\u5728\u8FD0\u884C\uFF1B\u70B9\u300C\u91CD\u65B0\u751F\u6210\u300D\u53EF\u91CD\u8BD5\uFF09`)
      }));
    } finally {
      detailInFlightRef.current.delete(target);
      setDetailStatus((previous) => {
        const next = { ...previous };
        delete next[target];
        return next;
      });
    }
  };
  const loadImpact = async (force = false) => {
    if (selectedTargets.length === 0) return;
    setImpactLoading(true);
    try {
      const { ok, data } = await post("/project-control/api/impact-scope", { shas: selectedTargets, force });
      setImpact(ok ? data : null);
    } finally {
      setImpactLoading(false);
    }
  };
  const loadReviews = async (force = false) => {
    if (selectedTargets.length === 0) return;
    setReviewLoading(true);
    try {
      for (const target of selectedTargets) {
        const { ok, data } = await post("/project-control/api/review", { sha: target, force });
        const payload = data;
        setReviews((previous) => ({
          ...previous,
          [target]: ok ? payload : {
            issuesFound: 0,
            issues: "",
            verdict: "\u8BC4\u5BA1\u5931\u8D25\uFF1A" + String(payload["error"] ?? "") + "\uFF08\u53EF\u91CD\u65B0\u751F\u6210\u91CD\u8BD5\uFF09",
            issueList: [],
            cached: false
          }
        }));
      }
    } finally {
      setReviewLoading(false);
    }
  };
  const loadFileDiff = async (sha, path) => {
    const key = `${sha}|${path}`;
    if (fileDiffs[key] !== void 0) {
      setFileDiffs((previous) => {
        const next = { ...previous };
        delete next[key];
        return next;
      });
      return;
    }
    const { data } = await post("/project-control/api/file-diff", { sha, path });
    setFileDiffs((previous) => ({ ...previous, [key]: String(data["patch"] ?? "") }));
  };
  const loadIssues = async () => {
    try {
      const response = await fetch("/project-control/api/issues?sessionId=" + encodeURIComponent(props.sessionId ?? ""));
      const data = await response.json();
      if (response.ok) setIssuesData(data.issues ?? []);
    } catch {
    }
  };
  const verifyIssues = async (target) => {
    setVerifyingTarget(target);
    try {
      const { ok, data } = await post("/project-control/api/issues/verify", { target });
      if (!ok) {
        setActionResult("\u2717 " + String(data["error"] ?? "error"));
        return;
      }
      const resolved = data["resolved"] ?? [];
      const stillOpen = data["stillOpen"] ?? [];
      const newIssues = data["newIssues"] ?? [];
      const verdict = String(data["verdict"] ?? "");
      const lines = [
        `\u590D\u68C0\u5B8C\u6210\uFF1A\u5DF2\u4FEE\u590D ${resolved.length} \xB7 \u4ECD\u672A\u4FEE\u590D ${stillOpen.length} \xB7 \u65B0\u589E\u95EE\u9898 ${newIssues.length}`,
        ...resolved.length > 0 ? [`\u2713 \u5DF2\u4FEE\u590D\uFF1A${resolved.join("\uFF1B")}`] : [],
        ...stillOpen.length > 0 ? stillOpen.map((item) => `\u2717 \u672A\u4FEE\u590D\uFF1A${item.title} \u2014\u2014 ${item.reason}`) : [],
        ...newIssues.length > 0 ? newIssues.map((item) => `\uFF0B \u65B0\u95EE\u9898\uFF1A[${item.severity}] ${item.title}`) : [],
        ...verdict === "" ? [] : [`\u6700\u4F18\u6027\uFF1A${verdict}`]
      ];
      setActionResult(lines.join("\n"));
      await loadIssues();
    } catch (error) {
      setActionResult("\u2717 " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setVerifyingTarget(null);
    }
  };
  const addNote = async () => {
    if (noteTitle.trim() === "" || noteContent.trim() === "") return;
    const { ok } = await post("/project-control/api/notes", {
      title: noteTitle.trim(),
      content: noteContent.trim(),
      tags: noteTags,
      sha: selectedTargets.length === 0 ? void 0 : selectedTargets[0]
    });
    if (ok) {
      setNoteTitle("");
      setNoteContent("");
      setNoteTags("");
      await loadNotes();
    }
  };
  const removeNote = async (id) => {
    await post("/project-control/api/notes/delete", { id });
    if (editingNote !== null && editingNote.id === id) setEditingNote(null);
    await loadNotes();
  };
  const saveNoteEdit = async () => {
    if (editingNote === null) return;
    await post("/project-control/api/notes/update", { id: editingNote.id, title: editingNote.title, content: editingNote.content, tags: editingNote.tags });
    setEditingNote(null);
    await loadNotes();
  };
  const toggleNotePin = async (note) => {
    await post("/project-control/api/notes/update", { id: note.id, pinned: note.pinned !== true });
    await loadNotes();
  };
  const exportNote = (note) => {
    const md = `# ${note.title}

${note.content}
`;
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = (note.title.replace(/[\\/:*?"<>|]/g, "_").trim().slice(0, 60) || "note") + ".md";
    anchor.click();
    URL.revokeObjectURL(url);
    setActionResult("\u2713 " + t("notes.exportDone"));
  };
  const aiSummarize = async () => {
    setAiSummarizing(true);
    try {
      const { ok, data } = await post("/project-control/api/notes/ai-summary", {});
      if (!ok) {
        setActionResult("\u2717 " + String(data["error"] ?? "error"));
        return;
      }
      setActionResult(data["updated"] === true ? "\u2713 \u5DF2\u5BF9\u6BD4\u4E0A\u6B21\u603B\u7ED3\u5B8C\u6210\u589E\u91CF\u66F4\u65B0\uFF08\u65B0\u589E\u53D8\u5316\u89C1\u603B\u7ED3\u7684\u300C\u672C\u6B21\u66F4\u65B0\u300D\u4E00\u8282\uFF09\uFF0C\u65E7\u603B\u7ED3\u5DF2\u5408\u5E76\u66FF\u6362" : "\u2713 \u5DF2\u751F\u6210\u9996\u4EFD\u5B66\u4E60\u603B\u7ED3");
      await loadNotes();
    } catch (error) {
      setActionResult("\u2717 " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setAiSummarizing(false);
    }
  };
  const startRun = async () => {
    if (execTitle.trim() === "" || execDesc.trim() === "") return;
    setBusy("startRun");
    setActionResult(null);
    try {
      const { ok, data } = await post("/project-control/api/runs/start", {
        title: execTitle.trim(),
        description: execDesc.trim(),
        ...execModel === "" ? {} : (() => {
          const [provider, model] = execModel.split("/");
          return { defaultModelProvider: provider ?? "", defaultModelId: model ?? "" };
        })()
      });
      if (!ok) {
        setActionResult("\u2717 " + String(data["error"] ?? "error"));
        return;
      }
      if (data["autoStarted"] === true) {
        setActionResult("\u2713 \u5DF2\u542F\u52A8\u6267\u884C\uFF1A" + String(data["runId"] ?? ""));
        setExecTitle("");
        setExecDesc("");
        await refreshState();
        return;
      }
      const steps = data["steps"] ?? [];
      setPlanConfirm({
        changeId: String(data["changeId"] ?? ""),
        steps: steps.map((step) => ({
          id: String(step["id"] ?? ""),
          title: String(step["title"] ?? ""),
          description: String(step["description"] ?? ""),
          targetFiles: step["targetFiles"] ?? [],
          role: String(step["role"] ?? "coding"),
          acceptance: String(step["acceptance"] ?? ""),
          failurePolicy: String(step["failurePolicy"] ?? "retry-escalate"),
          enabled: step["enabled"] !== false,
          modelProvider: "",
          modelId: ""
        }))
      });
      if (modelOptions.length === 0 && modelTiers === null) void loadModelConfig();
      setActionResult("\u2713 \u8BA1\u5212\u5DF2\u751F\u6210\uFF0C\u8BF7\u5728\u4E0B\u65B9\u786E\u8BA4\u7F16\u6392\u540E\u542F\u52A8");
      setExecTitle("");
      setExecDesc("");
    } catch (error) {
      setActionResult("\u2717 " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setBusy(null);
    }
  };
  const launchPlan = async (withEdits) => {
    if (planConfirm === null) return;
    setPlanBusy(true);
    try {
      let changeId = planConfirm.changeId;
      if (withEdits) {
        const { ok: ok2, data: data2 } = await post("/project-control/api/runs/plan/update", { changeId, steps: planConfirm.steps });
        if (!ok2) {
          setActionResult("\u2717 " + String(data2["error"] ?? "error"));
          return;
        }
      }
      const { ok, data } = await post("/project-control/api/runs/launch", { changeId });
      if (!ok) {
        setActionResult("\u2717 " + String(data["error"] ?? "error"));
        return;
      }
      setActionResult("\u2713 \u5DF2\u542F\u52A8\u6267\u884C\uFF1A" + String(data["runId"] ?? ""));
      setPlanConfirm(null);
      await refreshState();
    } catch (error) {
      setActionResult("\u2717 " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setPlanBusy(false);
    }
  };
  const loadRunDetail = async (id) => {
    try {
      const response = await fetch("/project-control/api/runs/detail?id=" + encodeURIComponent(id));
      const data = await response.json();
      if (response.ok) setRunDetail(data);
    } catch {
      setRunDetail(null);
    }
  };
  const resumeRun = async (runId, action) => {
    const { ok, data } = await post("/project-control/api/runs/resume", { runId, action });
    if (ok) {
      setActionResult("\u2713 \u5DF2\u6062\u590D\u6267\u884C\uFF08" + action + "\uFF09");
      await refreshState();
      await loadRunDetail(runId);
    } else {
      setActionResult("\u2717 " + String(data["error"] ?? "error"));
    }
  };
  const loadScheduled = async () => {
    try {
      const response = await fetch("/project-control/api/scheduled?sessionId=" + encodeURIComponent(props.sessionId ?? ""));
      const data = await response.json();
      if (response.ok) setScheduledData(data.tasks ?? []);
    } catch {
    }
  };
  const addScheduled = async () => {
    const intervalMinutes = Number(schedInterval);
    if (schedName.trim() === "" || !Number.isFinite(intervalMinutes) || intervalMinutes < 1) {
      setActionResult("\u2717 \u8BF7\u586B\u5199\u4EFB\u52A1\u540D\u79F0\u4E0E\u6709\u6548\u95F4\u9694\uFF08\u5206\u949F\uFF09");
      return;
    }
    const { ok, data } = await post("/project-control/api/scheduled", {
      name: schedName.trim(),
      type: schedType,
      intervalMinutes,
      title: schedTitle.trim() || void 0,
      description: schedDesc.trim() || void 0
    });
    if (ok) {
      setSchedName("");
      setSchedTitle("");
      setSchedDesc("");
      setActionResult("\u2713 \u4F8B\u884C\u4EFB\u52A1\u5DF2\u521B\u5EFA");
      await loadScheduled();
    } else {
      setActionResult("\u2717 " + String(data["error"] ?? "error"));
    }
  };
  const scheduledAction = async (path, body) => {
    const { ok, data } = await post("/project-control/api/scheduled/" + path, body);
    if (ok) await loadScheduled();
    else setActionResult("\u2717 " + String(data["error"] ?? "error"));
  };
  const loadMemories = async () => {
    try {
      const response = await fetch("/project-control/api/memories?sessionId=" + encodeURIComponent(props.sessionId ?? ""));
      const data = await response.json();
      if (response.ok) setMemoriesData(data);
    } catch {
    }
  };
  const syncMemories = async () => {
    setMemorySyncing(true);
    try {
      const { ok, data } = await post("/project-control/api/memory/sync", {});
      if (!ok && data["error"] !== void 0) {
        setSyncReport({ ok: false, error: String(data["error"]) });
        return;
      }
      setSyncReport(data);
      await loadMemories();
    } catch (error) {
      setSyncReport({ ok: false, error: error instanceof Error ? error.message : String(error) });
    } finally {
      setMemorySyncing(false);
    }
  };
  const applySync = async (ids, action) => {
    await post("/project-control/api/memory/sync/apply", { ids, action });
    setSyncReport((previous) => previous === null ? null : { ...previous, staleProposals: (previous.staleProposals ?? []).filter((proposal) => !ids.includes(proposal.id)) });
    await loadMemories();
  };
  const memoryAction = async (path, body) => {
    const { ok, data } = await post("/project-control/api/memory/" + path, body);
    if (ok) await loadMemories();
    else setActionResult("\u2717 " + String(data["error"] ?? "error"));
  };
  const memoryToNote = async (memory) => {
    const { ok } = await post("/project-control/api/notes", {
      title: memory.title,
      content: memory.content + (memory.basisSha !== null ? `
\uFF08\u6765\u6E90\uFF1A\u9879\u76EE\u8BB0\u5FC6 ${memory.basisSha.slice(0, 8)}\uFF09` : ""),
      tags: "\u8BB0\u5FC6, " + memory.type
    });
    if (ok) setActionResult("\u2713 \u5DF2\u628A\u8BB0\u5FC6\u8F6C\u4E3A\u7B14\u8BB0");
  };
  const layoutFace = props.layout;
  (0, import_react2.useEffect)(() => {
    applyStatsLineClamp();
    const timer = setInterval(() => {
      if (document.getElementById("pc-stats-clamp") === null) applyStatsLineClamp();
      const chat = document.querySelector('div[class*="centerCol"]');
      const width = chat ? Math.round(chat.getBoundingClientRect().width) : -1;
      if (width !== -1 && width < 50) layoutFace?.openDetails?.();
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, [props.sessionId, layoutFace]);
  const frameTemplateSet = (chatPx) => {
    const sidebar = document.querySelector('div[class*="sidebarCol"]');
    const sidebarW = sidebar ? Math.max(56, Math.round(sidebar.getBoundingClientRect().width)) : 280;
    document.querySelector('div[class*="frame"][style*="grid-template-columns"]')?.style.setProperty("grid-template-columns", sidebarW + "px minmax(0, 1fr) " + chatPx + "px", "important");
  };
  const collapseFrameTemplate = () => {
    const sidebar = document.querySelector('div[class*="sidebarCol"]');
    const sidebarW = sidebar ? Math.max(56, Math.round(sidebar.getBoundingClientRect().width)) : 280;
    document.querySelector('div[class*="frame"][style*="grid-template-columns"]')?.style.setProperty("grid-template-columns", sidebarW + "px minmax(0, 1fr) 0px", "important");
  };
  (0, import_react2.useEffect)(() => {
    const saved = Number(localStorage.getItem("pc.chatWidth") ?? "");
    const apply2 = () => {
      const chatW = Number.isFinite(saved) && saved >= 280 ? saved : 360;
      frameTemplateSet(chatW);
    };
    apply2();
    const frame = document.querySelector('div[class*="frame"][style*="grid-template-columns"]');
    const observer = new MutationObserver(() => {
      apply2();
    });
    if (frame !== null) observer.observe(frame, { attributes: true, attributeFilter: ["style"] });
    return () => {
      observer.disconnect();
      collapseFrameTemplate();
    };
  }, []);
  const onDividerDown = (e) => {
    e.preventDefault();
    const onMove = (ev) => {
      const width = Math.min(900, Math.max(280, window.innerWidth - ev.clientX));
      frameTemplateSet(width);
      localStorage.setItem("pc.chatWidth", String(width));
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };
  (0, import_react2.useEffect)(() => {
    let disposed = false;
    const load = async () => {
      try {
        const response = await fetch("/project-control/api/state?sessionId=" + encodeURIComponent(props.sessionId ?? ""), { headers: { accept: "application/json" } });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!disposed) {
          setState(data);
          setLoadError(null);
        }
      } catch (error) {
        if (!disposed) setLoadError(error instanceof Error ? error.message : String(error));
      }
    };
    void load();
    const timer = setInterval(() => {
      void load();
    }, 4e3);
    return () => {
      disposed = true;
      clearInterval(timer);
    };
  }, []);
  (0, import_react2.useEffect)(() => {
    if (tab === "commits") {
      void loadCommits();
      void loadNotes();
    }
    if (tab === "notes") {
      void loadNotes();
      void loadMemories();
      if (commitsData === null) void loadCommits();
    }
    if (tab === "review") void loadIssues();
    if (tab === "execution") {
      void loadScheduled();
      if (runDetail !== null) void loadRunDetail(runDetail.run.id);
    }
    if (tab === "settings" && modelTiers === null) void loadModelConfig();
  }, [tab, props.sessionId]);
  const loadModelConfig = async () => {
    try {
      const response = await fetch("/project-control/api/model-config");
      if (!response.ok) return;
      const data = await response.json();
      setModelTiers(data.tiers ?? {});
      setModelOptions(data.options ?? []);
    } catch {
    }
  };
  const saveModelConfig = async () => {
    if (modelTiers === null) return;
    setModelSaving(true);
    setModelSaved(false);
    try {
      const response = await fetch("/project-control/api/model-config", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tiers: modelTiers })
      });
      if (response.ok) {
        setModelSaved(true);
        setTimeout(() => {
          setModelSaved(false);
        }, 2500);
      }
    } finally {
      setModelSaving(false);
    }
  };
  const refreshState = async () => {
    const refreshed = await fetch("/project-control/api/state?sessionId=" + encodeURIComponent(props.sessionId ?? ""), { headers: { accept: "application/json" } });
    if (refreshed.ok) setState(await refreshed.json());
  };
  const runAction = async (name2, path, body) => {
    setBusy(name2);
    setActionResult(null);
    try {
      const { ok, data } = await post(path, body);
      if (!ok) {
        setActionResult(`\u2717 ${String(data["error"] ?? "error")}`);
        return;
      }
      setActionResult(formatActionResult(data));
      await refreshState();
    } catch (error) {
      setActionResult(`\u2717 ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setBusy(null);
    }
  };
  const runBootstrap = async () => {
    setBootstrapping(true);
    try {
      const { ok, data } = await post("/project-control/api/bootstrap", {});
      if (!ok) {
        setLoadError(String(data["error"] ?? "error"));
        return;
      }
      await refreshState();
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : String(error));
    } finally {
      setBootstrapping(false);
    }
  };
  const confirmMemory = async (memoryId) => {
    const { ok } = await post("/project-control/api/memory/confirm", { memoryId });
    if (ok) {
      setState((previous) => previous === null ? previous : {
        ...previous,
        memories: previous.memories?.map((memory) => memory.id === memoryId ? { ...memory, isHumanConfirmed: true, truthLevel: "fact" } : memory)
      });
    }
  };
  const project = state?.project ?? null;
  const bootstrap = state?.bootstrap ?? null;
  const changes = state?.changes ?? [];
  const runs = state?.runs ?? [];
  const verifications = state?.verifications ?? [];
  const confirmed = state?.confirmed ?? [];
  const concepts = state?.concepts ?? [];
  const tabs = [
    { key: "commits", label: t("tab.commits") },
    { key: "overview", label: t("tab.overview") },
    { key: "execution", label: t("tab.execution") },
    { key: "review", label: t("tab.review") },
    { key: "notes", label: t("tab.notes") },
    { key: "settings", label: t("tab.settings") }
  ];
  const resultPanel = actionResult !== null ? import_react2.default.createElement(
    Card,
    { title: t("result.panel") },
    import_react2.default.createElement("div", { style: styles.result }, actionResult)
  ) : null;
  const allTargets = [];
  if (commitsData !== null) {
    if (!commitsData.working.isClean) {
      allTargets.push({
        key: "working",
        label: `\u25CF ${t("repo.working")}\uFF08${commitsData.working.fileCount}\uFF09`,
        meta: commitsData.working.files.slice(0, 3).map((file) => file.path.split("/").pop()).join(", "),
        sha: "working"
      });
    }
    for (const commit of commitsData.commits) {
      const adds = commit.files.reduce((sum, file) => sum + file.adds, 0);
      const dels = commit.files.reduce((sum, file) => sum + file.dels, 0);
      allTargets.push({
        key: commit.sha,
        label: commit.subject,
        meta: `${commit.shortHash} \xB7 ${commit.author} \xB7 ${new Date(commit.date).toLocaleString()} \xB7 +${adds}/-${dels}`,
        sha: commit.sha
      });
    }
  }
  const shortLabel = (sha) => {
    if (sha === "working") return t("repo.working");
    const target = allTargets.find((entry) => entry.sha === sha);
    return `${target?.meta.split(" \xB7 ")[0] ?? sha.slice(0, 7)} ${target?.label ?? ""}`.trim();
  };
  const filteredTargets = pickerFilter.trim() === "" ? allTargets : allTargets.filter((entry) => (entry.label + entry.meta).toLowerCase().includes(pickerFilter.trim().toLowerCase()));
  const commitBySha = new Map((commitsData?.commits ?? []).map((commit) => [commit.sha, commit]));
  const lastSummaryAt = notes.filter((note) => note.sha === "summary").sort((left, right) => right.createdAt - left.createdAt)[0]?.createdAt;
  const isUndigested = (date) => lastSummaryAt === void 0 || date > lastSummaryAt;
  const undigestedCount = (commitsData?.commits ?? []).filter((commit) => isUndigested(commit.date)).length;
  const commitRounds = clusterIntoRounds(commitsData?.commits ?? []);
  const renderPickerRow = (entry) => {
    const commit = commitBySha.get(entry.sha);
    const undigested = commit !== void 0 && isUndigested(commit.date);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          padding: "7px 12px",
          cursor: "pointer",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          background: selectedTargets.includes(entry.sha) ? "rgba(37,99,235,0.07)" : "transparent"
        },
        onClick: () => {
          void toggleTarget(entry.sha);
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: "14px", color: "var(--dsw-alias-brand-primary, #2563eb)", fontWeight: 700 }, children: selectedTargets.includes(entry.sha) ? "\u2713" : "" }),
          undigested && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { title: t("picker.undigested"), style: { color: themeAwareText("#d97706"), fontSize: "10px", flexShrink: 0 }, children: "\u25CF" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { minWidth: 0 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { display: "block", fontSize: "12px", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: entry.label }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { display: "block", fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: entry.meta })
          ] })
        ]
      },
      entry.key
    );
  };
  const impactRiskColor = themeAwareText(impact === null ? "#57606a" : RISK_COLOR[impact.riskLevel] ?? "#57606a");
  const commitsTab = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#2563eb"), children: commitsData?.branch ?? "\u2014" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "12px" }, children: commitsData?.rootPath ?? project?.rootPath ?? "\u2014" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.secondary, onClick: () => {
        void loadCommits();
      }, children: t("action.refresh") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          style: styles.secondary,
          disabled: busy !== null,
          onClick: () => {
            void runAction("scanHistory", "/project-control/api/bootstrap", { includeHistory: true, summarize: true, maxCommits: 30 });
          },
          children: busy === "scanHistory" ? t("action.running") : t("repo.scanHistory")
        }
      )
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: t("picker.title"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            style: { ...styles.secondary, width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "flex-start", whiteSpace: "normal" },
            onClick: () => {
              setPickerOpen(!pickerOpen);
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { minWidth: 0 }, children: selectedTargets.length === 0 ? t("picker.placeholder") : `${t("picker.selected")} ${selectedTargets.length}\uFF1A${selectedTargets.map(shortLabel).join("\uFF1B")}` }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { marginLeft: "8px", flexShrink: 0 }, children: "\u25BE" })
            ]
          }
        ),
        pickerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "fixed", inset: 0, zIndex: 29 }, onClick: () => {
            setPickerOpen(false);
          } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 30,
            background: "var(--dsw-alias-bg-base, #fff)",
            border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.15))",
            borderRadius: "8px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            overflow: "hidden"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "8px", borderBottom: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))", display: "flex", gap: "6px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  style: styles.input,
                  placeholder: t("picker.filter"),
                  value: pickerFilter,
                  onChange: (e) => {
                    setPickerFilter(e.target.value);
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.secondary, onClick: () => {
                setSelectedTargets([]);
              }, children: t("picker.clear") })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { maxHeight: 420, overflowY: "auto" }, children: [
              pickerFilter.trim() === "" ? (() => {
                const nodes = [];
                const working = allTargets.find((entry) => entry.sha === "working");
                if (working !== void 0) nodes.push(renderPickerRow(working));
                const bySha = new Map(allTargets.filter((entry) => entry.sha !== "working").map((entry) => [entry.sha, entry]));
                commitRounds.forEach((round, roundIndex) => {
                  const entries = round.commits.map((commit) => bySha.get(commit.sha)).filter((entry) => entry !== void 0);
                  if (entries.length === 0) return;
                  if (entries.length === 1) {
                    nodes.push(renderPickerRow(entries[0]));
                    return;
                  }
                  const shas = entries.map((entry) => entry.sha);
                  const allSelected = shas.every((sha) => selectedTargets.includes(sha));
                  nodes.push(
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "8px", padding: "6px 12px", background: "var(--dsw-alias-bg-layer-1, #fafafa)", borderBottom: "1px solid var(--dsw-alias-border-l3, rgba(5,5,5,0.06))", fontSize: "11px" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontWeight: 600 }, children: [
                        "\u{1F5D3} ",
                        t(roundIndex === 0 ? "picker.roundLatest" : "picker.round").replace("{n}", String(roundIndex + 1)),
                        " \xB7 ",
                        String(entries.length),
                        " ",
                        t("repo.commits"),
                        " \xB7 ",
                        new Date(round.firstAt).toLocaleDateString(),
                        "\u2013",
                        new Date(round.lastAt).toLocaleDateString()
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "10px" }, onClick: () => {
                        selectRound(shas);
                      }, children: allSelected ? t("picker.roundClear") : t("picker.roundSelect") })
                    ] }, `round-${roundIndex}`)
                  );
                  for (const entry of entries) nodes.push(renderPickerRow(entry));
                });
                return nodes;
              })() : filteredTargets.map((entry) => renderPickerRow(entry)),
              (pickerFilter.trim() === "" ? allTargets : filteredTargets).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("picker.noMatch") })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px", alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: t("picker.hint") }),
        undigestedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { title: t("picker.undigested"), style: { fontSize: "11px", color: themeAwareText("#d97706") }, children: [
          "\u25CF ",
          t("picker.undigestedCount").replace("{n}", String(undigestedCount))
        ] }),
        (detailQueuedCount > 0 || detailRunningCount > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.badge("#dcdcaa"), children: [
          detailRunningCount > 0 ? t("detail.aiLoading") : "",
          detailRunningCount > 0 && detailQueuedCount > 0 ? " " : "",
          detailQueuedCount > 0 ? "\u23F3 " + t("detail.queued").replace("{n}", String(detailQueuedCount)) : ""
        ] })
      ] })
    ] }),
    commitsError !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.empty, children: [
      t("repo.loadFailed"),
      ": ",
      commitsError
    ] }) }),
    selectedTargets.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("detail.pick") }) }),
    selectedTargets.filter((target) => target !== "working").length >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: "\u{1F4D6} " + t("narrative.title"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", alignItems: "center", marginBottom: narrative === null ? "0" : "8px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.secondary, disabled: narrativeBusy, onClick: () => {
          void loadNarrative();
        }, children: narrativeBusy ? t("narrative.running") : "\u2728 " + t("narrative.generate") }),
        narrative !== null && narrative.cached && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: [
          t("cache.hit"),
          narrative.generatedAt !== void 0 ? " \xB7 " + new Date(narrative.generatedAt).toLocaleString() : ""
        ] }),
        narrative !== null && renderCostBadge(narrative.costUsd, t("cost.tooltip")),
        narrative !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, disabled: narrativeBusy, onClick: () => {
            void loadNarrative(true);
          }, children: t("cache.regenerate") })
        ] })
      ] }),
      narrativeError !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.empty, color: themeAwareText("#d1242f") }, children: narrativeError }),
      narrative !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.what, whiteSpace: "pre-wrap" }, children: renderStructuredContent(narrative.narrative) })
    ] }),
    selectedTargets.map((target) => {
      const d = details[target];
      const label = target === "working" ? t("repo.working") : d?.commit?.message ?? target.slice(0, 8);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: `\u{1F50D} ${label}${target !== "working" ? `\uFF08${target.slice(0, 8)}\uFF09` : ""}`, children: [
        d !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }, children: [
          d.analysisCached === true && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.badge("#8b8b8b"), children: [
            t("cache.hit"),
            d.analysisGeneratedAt ? " \xB7 " + new Date(d.analysisGeneratedAt).toLocaleString() : ""
          ] }),
          renderCostBadge(d.analysisCostUsd, t("cost.tooltip") + (d.analysisTokens ? `\uFF08in ${d.analysisTokens.input} / out ${d.analysisTokens.output} tokens\uFF09` : "")),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
            loadDetail(target, true);
          }, children: t("cache.regenerate") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" },
              title: t("detail.saveNoteHint"),
              onClick: () => {
                const sha = target === "working" ? "working" : target;
                void post("/project-control/api/notes", {
                  title: `${t("detail.saveNoteTitle")}\uFF1A${(d.commit?.message ?? target).slice(0, 60)}`,
                  content: [`\u3010\u6539\u4E86\u4EC0\u4E48\u3011
${d.analysis.what}`, `\u3010\u5B9E\u73B0\u903B\u8F91\u3011
${(d.analysis.logic ?? []).join("\uFF1B")}`, `\u3010\u98CE\u9669\u70B9\u3011
${(d.analysis.risks ?? []).join("\uFF1B")}`].filter((block) => !block.endsWith("\u3011\n")).join("\n\n"),
                  sha,
                  tags: "\u6838\u67E5"
                }).then(({ ok }) => {
                  setActionResult(ok ? "\u2713 \u5DF2\u5B58\u4E3A\u7B14\u8BB0\uFF08\u7B14\u8BB0\u9875\u53EF\u67E5\u770B\uFF09" : "\u2717 \u4FDD\u5B58\u5931\u8D25");
                  if (ok) void loadNotes();
                });
              },
              children: [
                "\u{1F4BE} ",
                t("detail.saveNote")
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" },
              title: t("detail.saveMemoryHint"),
              onClick: () => {
                const sha = target === "working" ? void 0 : target;
                void post("/project-control/api/memory", {
                  memoryType: "risk_hotspot",
                  sourceTag: "review",
                  basisSha: sha,
                  title: `\u6838\u67E5\u7ED3\u8BBA\uFF1A${(d.commit?.message ?? target).slice(0, 60)}`,
                  content: [d.analysis.what, (d.analysis.risks ?? []).join("\uFF1B")].filter((part) => part !== "").join("\n---\n")
                }).then(({ ok }) => {
                  setActionResult(ok ? "\u2713 \u5DF2\u6C89\u6DC0\u4E3A\u8BB0\u5FC6\uFF08\u5F85\u786E\u8BA4\u961F\u5217\uFF09" : "\u2717 \u4FDD\u5B58\u5931\u8D25");
                  if (ok) void loadMemories();
                });
              },
              children: [
                "\u{1F9E0} ",
                t("detail.saveMemory")
              ]
            }
          )
        ] }),
        d === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: detailStatus[target] === "queued" ? "\u23F3 " + t("detail.cardQueued") : t("detail.aiLoading") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          d.commit !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.commitMeta, children: [
            d.commit.author,
            " \xB7 ",
            new Date(d.commit.date).toLocaleString(),
            " \xB7 ",
            d.files.length,
            " ",
            t("detail.files"),
            " \xB7 +",
            d.insertions,
            "/-",
            d.deletions
          ] }),
          d.analysis.what !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.sectionTitle, marginTop: "8px" }, children: t("detail.what") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.what, children: d.analysis.what })
          ] }),
          d.analysis.logic.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.sectionTitle, children: t("detail.logic") }),
            d.analysis.logic.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.logicStep, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { color: "var(--dsw-alias-brand-primary, #2563eb)", fontWeight: 600 }, children: [
                i + 1,
                "."
              ] }),
              step
            ] }, i))
          ] }),
          d.analysis.risks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.sectionTitle, marginTop: "6px" }, children: t("detail.risk") }),
            d.analysis.risks.map((risk, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...styles.riskItem, color: themeAwareText("#9a6700") }, children: [
              "\u26A0 ",
              renderWithPeek(risk)
            ] }, i))
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.sectionTitle, marginTop: "10px" }, children: t("detail.files") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", { style: styles.table, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: d.files.map((file) => {
            const key = `${target}|${file.path}`;
            const patch = fileDiffs[key];
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: { ...styles.td, fontFamily: "monospace", fontSize: "11px", wordBreak: "break-all" }, children: file.path }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { style: { ...styles.td, color: themeAwareText("#1a7f37"), whiteSpace: "nowrap" }, children: [
                  "+",
                  file.adds
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { style: { ...styles.td, color: themeAwareText("#cf222e"), whiteSpace: "nowrap" }, children: [
                  "-",
                  file.dels
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: { ...styles.td, whiteSpace: "nowrap" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.secondary, onClick: () => {
                  void loadFileDiff(target, file.path);
                }, children: patch === void 0 ? t("diff.show") : t("diff.hide") }) })
              ] }, key),
              patch !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { colSpan: 4, style: { ...styles.td, padding: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffView, { patch }) }) }, `${key}-diff`)
            ] });
          }) }) })
        ] })
      ] }, `d-${target}`);
    }),
    selectedTargets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: t("detail.impact"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.button, disabled: impactLoading, onClick: () => {
        void loadImpact();
      }, children: impactLoading ? t("detail.impactLoading") : t("detail.impact") }),
      impact !== null && impact.explanationsCached === true && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { ...styles.badge("#8b8b8b"), marginLeft: "8px" }, children: [
        t("cache.hit"),
        impact.generatedAt ? " \xB7 " + new Date(impact.generatedAt).toLocaleString() : ""
      ] }),
      impact !== null && renderCostBadge(impact.explanationsCostUsd, t("cost.tooltip")),
      impact !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, marginLeft: "8px", padding: "2px 8px", fontSize: "11px" }, disabled: impactLoading, onClick: () => {
        void loadImpact(true);
      }, children: t("cache.regenerate") }),
      impact !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "10px", margin: "10px 0 4px", flexWrap: "wrap" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { ...styles.badge(impactRiskColor), fontSize: "13px", padding: "3px 10px" }, children: [
            t("impact.risk"),
            ": ",
            impact.riskLevel,
            "\uFF08",
            impact.riskScore,
            "\uFF09"
          ] }),
          impact.keyChangePoints !== void 0 && impact.keyChangePoints.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "11px", color: themeAwareText("#9a6700") }, children: [
            "\u26A0 ",
            t("impact.keyPoints"),
            ": ",
            impact.keyChangePoints.map((file) => file.split("/").pop()).join("\u3001")
          ] })
        ] }),
        impact.riskFactors !== void 0 && impact.riskFactors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.sectionTitle, children: t("impact.factors") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: "2px", marginBottom: "10px" }, children: impact.riskFactors.map((factor, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "12px", padding: "3px 8px", background: "var(--dsw-alias-bg-layer-1, #fafafa)", borderRadius: "4px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: factor.text }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { color: impactRiskColor, fontWeight: 600 }, children: [
              "+",
              factor.points
            ] })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImpactGraph, { data: impact, t }),
        impact.levels.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("impact.none") }),
        impact.functionImpact !== void 0 && impact.functionImpact.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.sectionTitle, marginTop: "12px" }, children: t("impact.functions") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: impact.functionImpact.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))", borderRadius: "6px", padding: "8px 10px", background: "var(--dsw-alias-bg-base, #fff)" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: "12px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#d97706"), children: entry.symbol }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { ...styles.label, marginLeft: "8px" }, children: entry.definedIn })
            ] }),
            entry.role !== void 0 && entry.role !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...styles.what, marginTop: "6px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { ...styles.sectionTitle, display: "inline", marginInlineEnd: "6px", color: "var(--dsw-alias-brand-primary, #2563eb)" }, children: t("impact.funcRole") }),
              entry.role
            ] }),
            entry.change !== void 0 && entry.change !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...styles.what }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { ...styles.sectionTitle, display: "inline", marginInlineEnd: "6px", color: themeAwareText("#9a6700") }, children: t("impact.funcChange") }),
              entry.change
            ] }),
            entry.impact !== void 0 && entry.impact !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...styles.what, marginBottom: "6px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { ...styles.sectionTitle, display: "inline", marginInlineEnd: "6px", color: themeAwareText("#ce9178") }, children: t("impact.funcCallers") }),
              entry.impact
            ] }),
            entry.callers.map((caller, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...styles.logicStep, marginTop: "3px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: themeAwareText("#d97706") }, children: "\u21B3" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontFamily: "monospace", fontSize: "11px", wordBreak: "break-all" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { cursor: "pointer", textDecoration: "underline dotted" }, onClick: () => {
                void openPeek(caller.file, Number(caller.line));
              }, children: [
                caller.file,
                ":",
                caller.line
              ] }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: [
                "\u2014 ",
                caller.snippet.slice(0, 80)
              ] })
            ] }, i))
          ] }, entry.symbol)) })
        ] }),
        impact.functionImpact !== void 0 && impact.functionImpact.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("impact.functionsNone") }),
        impact.memories !== void 0 && impact.memories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "10px", padding: "8px 10px", border: "1px dashed rgba(37,99,235,0.35)", borderRadius: "6px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.sectionTitle, color: "var(--dsw-alias-brand-primary, #2563eb)" }, children: t("impact.memory") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: "6px" }, children: impact.memories.map((memory, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#2563eb"), children: memory.title }, i)) })
        ] })
      ] })
    ] }),
    selectedTargets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: t("detail.optimality"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.button, disabled: reviewLoading, onClick: () => {
        void loadReviews();
      }, children: reviewLoading ? t("detail.optimalityLoading") : t("detail.optimality") }),
      selectedTargets.map((target) => {
        const r = reviews[target];
        if (r === void 0) return null;
        const label = target === "working" ? t("repo.working") : target.slice(0, 8);
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "10px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...styles.sectionTitle, display: "flex", gap: "8px", alignItems: "center" }, children: [
            label,
            r.cached === true && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.badge("#8b8b8b"), children: [
              t("cache.hit"),
              r.generatedAt ? " \xB7 " + new Date(r.generatedAt).toLocaleString() : ""
            ] }),
            renderCostBadge(r.costUsd, t("cost.tooltip")),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
              void loadReviews(true);
            }, children: t("cache.regenerate") })
          ] }),
          r.verdict !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.what, background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: "6px", padding: "8px 10px" }, children: r.verdict }),
          r.issueList !== void 0 && r.issueList.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { style: styles.table, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: ["review.col.severity", "review.col.category", "review.col.title", "review.col.evidence", "review.col.fix"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { style: styles.th, children: t(key) }, key)) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: r.issueList.map((issue, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(issue.severity === "critical" ? "#f14c4c" : issue.severity === "high" ? "#ce9178" : issue.severity === "medium" ? "#dcdcaa" : "#569cd6"), children: issue.severity }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: issue.category }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: issue.title }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: { ...styles.td, fontFamily: "monospace", fontSize: "11px", wordBreak: "break-all" }, children: issue.evidence }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: issue.fix })
            ] }, i)) })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("review.clean") })
        ] }, `r-${target}`);
      }),
      reviewLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("detail.optimalityLoading") }),
      !reviewLoading && selectedTargets.every((target) => reviews[target] === void 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("review.hint") })
    ] })
  ] });
  const TIER_LABELS = [
    { key: "standard", zh: "\u89E3\u8BFB / \u51FD\u6570\u5F71\u54CD\u8BF4\u660E", desc: "\u63D0\u4EA4\u6838\u67E5\u7684 AI \u89E3\u8BFB\u3001\u5F71\u54CD\u5206\u6790" },
    { key: "reasoning", zh: "\u6700\u4F18\u6027\u6838\u67E5 / \u6267\u884C\u8BA1\u5212", desc: "\u8BC4\u5BA1\u3001\u8BA1\u5212\u751F\u6210\u3001AI \u5B66\u4E60\u603B\u7ED3" },
    { key: "fast", zh: "\u5386\u53F2\u8F7B\u6790", desc: "\u626B\u63CF\u5386\u53F2\u65F6\u7684\u9010\u63D0\u4EA4\u4E00\u53E5\u8BDD" },
    { key: "verifier", zh: "\u9A8C\u6536", desc: "\u6539\u52A8\u9A8C\u6536\u7684 AI \u590D\u6838" }
  ];
  const settingsTab = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { title: t("model.title"), children: modelTiers === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("model.loading") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      TIER_LABELS.map((tier) => {
        const current = modelTiers[tier.key];
        const value = current ? current.provider + "/" + current.model : "";
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px", flexWrap: "wrap" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { minWidth: 150, fontSize: "12px", fontWeight: 600 }, children: tier.zh }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "select",
            {
              style: { ...styles.select, width: 240 },
              value,
              onChange: (e) => {
                const v = e.target.value;
                if (v === "") {
                  setModelTiers({ ...modelTiers, [tier.key]: { provider: "", model: "" } });
                  return;
                }
                const [provider, ...rest] = v.split("/");
                const model = rest.join("/");
                setModelTiers({ ...modelTiers, [tier.key]: { provider, model } });
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: t("model.followChat") }),
                modelOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", { value: option.provider + "/" + option.id, children: [
                  option.provider,
                  " / ",
                  option.name
                ] }, option.provider + "/" + option.id))
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: tier.desc })
        ] }, tier.key);
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", alignItems: "center", marginTop: "6px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.button, disabled: modelSaving, onClick: () => {
          void saveModelConfig();
        }, children: modelSaving ? t("action.running") : t("model.save") }),
        modelSaved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#4ec9b0"), children: t("model.saved") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: t("model.hint") })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { textAlign: "center", fontSize: "11px", color: "var(--dsw-alias-label-tertiary, #9ca3af)", padding: "8px 0" }, children: [
      "dsh-project-control v",
      state?.pluginVersion ?? "?"
    ] })
  ] });
  const overviewTab = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.button, disabled: bootstrapping, onClick: () => {
        void runBootstrap();
      }, children: bootstrapping ? t("action.running") : t("action.rescan") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.secondary, disabled: busy !== null, onClick: () => {
        void runAction("analyze", "/project-control/api/analyze", {});
      }, children: busy === "analyze" ? t("action.running") : t("action.analyze") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.secondary, disabled: busy !== null, onClick: () => {
        void runAction("verify", "/project-control/api/verify", {});
      }, children: busy === "verify" ? t("action.running") : t("action.verify") })
    ] }) }),
    resultPanel,
    project === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontWeight: 600, fontSize: "13px", marginBottom: "6px" }, children: t("state.noProject") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("state.noProjectHint") })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: `${t("state.project")}\uFF1A${project.name}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.row, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.label, children: "Root" }),
        project.rootPath
      ] }) }),
      bootstrap !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.row, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.label, children: t("state.techStack") }),
          bootstrap.techStack.map((tech) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#4ec9b0"), children: tech }, tech))
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.row, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.label, children: t("state.symbols") }),
            String(bootstrap.symbolsCount)
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.label, children: t("state.manifests") }),
            String(bootstrap.manifestFiles.length)
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.label, children: t("state.evidence") }),
            String(state?.evidenceCount ?? 0)
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "12px", color: "var(--dsw-alias-label-secondary, #6b7280)", marginTop: "8px" }, children: bootstrap.summary })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: t("confirmed.title"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.formRow, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { rows: 2, style: styles.textarea, placeholder: t("confirmed.text"), value: confirmedText, onChange: (e) => {
          setConfirmedText(e.target.value);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { style: styles.input, placeholder: t("confirmed.paths"), value: confirmedPaths, onChange: (e) => {
          setConfirmedPaths(e.target.value);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            style: styles.button,
            disabled: busy !== null || confirmedText === "",
            onClick: () => {
              void runAction("addConfirmed", "/project-control/api/confirmed", { type: "constraint", text: confirmedText, forbiddenPaths: confirmedPaths.split(",").map((path) => path.trim()).filter((path) => path !== "") }).then(() => {
                setConfirmedText("");
                setConfirmedPaths("");
              });
            },
            children: busy === "addConfirmed" ? t("action.running") : t("confirmed.add")
          }
        )
      ] }),
      confirmed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("confirmed.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", { style: styles.table, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: confirmed.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#c586c0"), children: item.type }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: item.text }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: item.forbiddenPaths.join(", ") || "\u2014" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" },
            onClick: () => {
              void runAction("removeConfirmed", "/project-control/api/confirmed/remove", { id: item.id });
            },
            children: "\u2715"
          }
        ) })
      ] }, item.id)) }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: t("action.createChange"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.formRow, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { style: styles.input, placeholder: t("form.changeTitle"), value: changeTitle, onChange: (e) => {
          setChangeTitle(e.target.value);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { rows: 2, style: styles.textarea, placeholder: t("form.changeDesc"), value: changeDesc, onChange: (e) => {
          setChangeDesc(e.target.value);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            style: styles.button,
            disabled: busy !== null || changeTitle === "",
            onClick: () => {
              void runAction("createChange", "/project-control/api/changes", { title: changeTitle, description: changeDesc }).then(() => {
                setChangeTitle("");
                setChangeDesc("");
              });
            },
            children: busy === "createChange" ? t("action.running") : t("action.createChange")
          }
        )
      ] }),
      changes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("state.noChanges") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { style: styles.table, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: ["changes.col.title", "changes.col.type", "changes.col.status", "changes.col.updated"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { style: styles.th, children: t(key) }, key)) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: changes.map((change) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: change.title }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(change.status === "completed" ? "#4ec9b0" : "#569cd6"), children: change.status }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: formatTime(change.updatedAt) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
            setConfirmDialog({ title: "\u5220\u9664\u8FD9\u4E2A\u53D8\u66F4\u4EFB\u52A1\uFF1F", message: "\u300C" + change.title + "\u300D\u53CA\u5176\u5168\u90E8\u6267\u884C\u8BB0\u5F55\u3001\u8BA1\u5212\u3001\u95EE\u9898\u6E05\u5355\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002", danger: true, onConfirm: () => {
              void runAction("deleteChange", "/project-control/api/changes/delete", { id: change.id });
            } });
          }, children: "\u2715" }) })
        ] }, change.id)) })
      ] })
    ] })
  ] });
  const executionTab = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center", marginBottom: "10px", padding: "7px 12px", borderRadius: "8px", background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.2)", fontSize: "11px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
        "\u2460 ",
        t("exec.flowCreate")
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u2192" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
        "\u2461 ",
        t("exec.flowOrchestrate")
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u2192" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
        "\u2462 ",
        t("exec.flowRun")
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u2192" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
        "\u2463 ",
        t("exec.flowMemory")
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: t("exec.create"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.formInline, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { style: { ...styles.input, flex: 1, minWidth: 200 }, placeholder: t("exec.formTitle"), value: execTitle, onChange: (e) => {
          setExecTitle(e.target.value);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { style: { ...styles.select, width: "auto" }, value: execModel, onChange: (e) => {
          setExecModel(e.target.value);
        }, title: t("plan.modelDefault"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: t("exec.modelDefault") }),
          (modelOptions ?? []).map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", { value: option.provider + "/" + option.id, children: [
            option.provider,
            "/",
            option.id
          ] }, option.provider + "/" + option.id))
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.formRow, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { style: styles.textarea, rows: 3, placeholder: t("exec.formDesc"), value: execDesc, onChange: (e) => {
          setExecDesc(e.target.value);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.actionRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.button, disabled: busy !== null || execTitle.trim() === "" || execDesc.trim() === "", onClick: () => {
            void startRun();
          }, children: busy === "startRun" ? t("exec.planning") : t("exec.start") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: t("exec.createHint") })
        ] })
      ] })
    ] }),
    resultPanel,
    planConfirm !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: t("plan.title"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)", marginBottom: "8px" }, children: t("plan.hint") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { style: styles.table, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: ["plan.col.step", "plan.col.role", "plan.col.model", "plan.col.policy", "plan.col.enabled"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { style: styles.th, children: t(key) }, key)) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: planConfirm.steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { style: { opacity: step.enabled ? 1 : 0.45 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { style: { ...styles.td, minWidth: 220 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontWeight: 600 }, children: [
              index + 1,
              ". ",
              step.title
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: step.description.slice(0, 120) }),
            step.targetFiles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "10px", color: "var(--dsw-alias-label-secondary, #6b7280)", fontFamily: "var(--dsw-alias-font-mono, ui-monospace, monospace)" }, children: step.targetFiles.join(", ").slice(0, 120) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "select",
            {
              style: { ...styles.select, width: "auto", padding: "3px 6px" },
              value: step.role,
              onChange: (e) => {
                setPlanConfirm({ ...planConfirm, steps: planConfirm.steps.map((item, i) => i === index ? { ...item, role: e.target.value } : item) });
              },
              children: ["analysis", "planning", "coding", "ops", "verification"].map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: role, children: ROLE_LABELS[role] ?? role }, role))
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "select",
            {
              style: { ...styles.select, width: "auto", padding: "3px 6px" },
              value: step.modelProvider + "/" + step.modelId,
              onChange: (e) => {
                const [provider, model] = e.target.value.split("/");
                setPlanConfirm({ ...planConfirm, steps: planConfirm.steps.map((item, i) => i === index ? { ...item, modelProvider: provider ?? "", modelId: model ?? "" } : item) });
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "/", children: t("plan.modelDefault") }),
                modelOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", { value: option.provider + "/" + option.id, children: [
                  option.provider,
                  "/",
                  option.id
                ] }, option.provider + "/" + option.id))
              ]
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "select",
            {
              style: { ...styles.select, width: "auto", padding: "3px 6px" },
              value: step.failurePolicy,
              onChange: (e) => {
                setPlanConfirm({ ...planConfirm, steps: planConfirm.steps.map((item, i) => i === index ? { ...item, failurePolicy: e.target.value } : item) });
              },
              children: Object.entries(POLICY_LABELS).map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value, children: label }, value))
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              type: "checkbox",
              checked: step.enabled,
              onChange: (e) => {
                setPlanConfirm({ ...planConfirm, steps: planConfirm.steps.map((item, i) => i === index ? { ...item, enabled: e.target.checked } : item) });
              }
            }
          ) })
        ] }, step.id)) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", marginTop: "10px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.button, disabled: planBusy, onClick: () => {
          void launchPlan(true);
        }, children: planBusy ? "\u2026" : t("plan.launchEdited") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.secondary, disabled: planBusy, onClick: () => {
          void launchPlan(false);
        }, children: t("plan.launchDirect") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.secondary, disabled: planBusy, onClick: () => {
          setPlanConfirm(null);
        }, children: t("plan.discard") })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.row, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.label, children: t("exec.attempts") }),
        String(state?.attemptsCount ?? 0)
      ] }) }),
      runs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("state.noRuns") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { style: styles.table, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: ["exec.col.change", "exec.col.steps", "exec.col.status", "exec.col.started", "exec.col.cost", "exec.col.detail"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { style: styles.th, children: t(key) }, key)) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: runs.map((run) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: changes.find((change) => change.id === run.changeId)?.title ?? run.changeId }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: run.stepsTotal ? (run.stepsDone ?? 0) + "/" + run.stepsTotal : "\u2014" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { style: styles.td, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(run.status === "succeeded" || run.status === "completed" ? "#4ec9b0" : run.status === "failed" ? "#f14c4c" : run.status === "paused" ? "#d97706" : "#dcdcaa"), children: RUN_STATUS_LABELS[run.status] ?? run.status }),
            run.currentStep !== null && run.currentStep !== void 0 && run.status === "running" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: run.currentStep })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: formatTime(run.startedAt) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: run.costUsd !== void 0 ? "$" + run.costUsd.toFixed(4) : "\u2014" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
            void loadRunDetail(run.id);
          }, children: runDetail?.run.id === run.id ? t("plan.refreshDetail") : t("plan.viewDetail") }) })
        ] }, run.id)) })
      ] }) })
    ] }),
    runDetail !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: t("plan.detailTitle") + " \xB7 " + runDetail.run.changeTitle, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "8px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(runDetail.run.status === "succeeded" || runDetail.run.status === "completed" ? "#4ec9b0" : runDetail.run.status === "failed" ? "#f14c4c" : runDetail.run.status === "paused" ? "#d97706" : "#dcdcaa"), children: RUN_STATUS_LABELS[runDetail.run.status] ?? runDetail.run.status }),
        runDetail.run.error !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "11px", color: themeAwareText("#d1242f") }, children: runDetail.run.error.message }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
          void loadRunDetail(runDetail.run.id);
        }, children: t("plan.refreshDetail") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
          setRunDetail(null);
        }, children: t("plan.closeDetail") })
      ] }),
      runDetail.run.status === "paused" && runDetail.run.pausePoint !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "8px 12px", borderRadius: "6px", background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.35)", marginBottom: "8px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontWeight: 600, fontSize: "12px" }, children: [
          "\u23F8 ",
          t("plan.pausedBanner")
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: runDetail.run.pausePoint.reason }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "6px", marginTop: "6px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.button, padding: "3px 10px", fontSize: "11px" }, onClick: () => {
            void resumeRun(runDetail.run.id, "continue");
          }, children: t("plan.resumeRetry") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "3px 10px", fontSize: "11px" }, onClick: () => {
            void resumeRun(runDetail.run.id, "skip-current");
          }, children: t("plan.resumeSkip") })
        ] })
      ] }),
      (runDetail.run.status === "failed" || runDetail.run.status === "interrupted") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginBottom: "8px" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.button, padding: "3px 10px", fontSize: "11px" }, onClick: () => {
        void resumeRun(runDetail.run.id, "continue");
      }, children: t("plan.resumeFailed") }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { style: styles.table, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: ["plan.col.step", "plan.col.role", "plan.col.model", "exec.col.status", "plan.col.attempts", "exec.col.cost"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { style: styles.th, children: t(key) }, key)) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: runDetail.steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { style: styles.td, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              index + 1,
              ". ",
              step.title
            ] }),
            step.claimedOutcome !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)", maxWidth: 320, whiteSpace: "normal" }, children: step.claimedOutcome.slice(0, 160) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("rgba(86,156,214,0.25)"), children: ROLE_LABELS[step.role] ?? step.role }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: { ...styles.td, fontSize: "11px" }, children: step.model ?? "\u2014" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(step.verified ? "#4ec9b0" : step.status === "failed" ? "#f14c4c" : step.status === "skipped" ? "#8b949e" : "#dcdcaa"), children: STEP_STATUS_LABELS[step.status] ?? step.status }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: String(step.attemptsCount) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: step.costUsd > 0 ? "$" + step.costUsd.toFixed(4) : "\u2014" })
        ] }, step.id)) })
      ] }) }),
      runDetail.context !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "10px", border: "1px dashed var(--dsw-alias-border-l2, rgba(5,5,5,0.15))", borderRadius: "8px", padding: "8px 12px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", fontWeight: 600, marginBottom: "4px" }, children: t("plan.contextTitle") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: [
          runDetail.context.projectDigest,
          runDetail.context.branch !== null ? ` \xB7 ${t("plan.branch")} ${runDetail.context.branch}` : "",
          runDetail.context.headSha !== null ? ` \xB7 HEAD ${runDetail.context.headSha.slice(0, 8)}` : ""
        ] }),
        runDetail.context.injectedMemories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "4px", fontSize: "11px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontWeight: 600 }, children: [
            t("plan.injectedMemories"),
            "\uFF1A"
          ] }),
          runDetail.context.injectedMemories.map((memory) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("rgba(78,201,176,0.2)"), children: memory.title }, memory.id))
        ] }),
        runDetail.context.decisionLog.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "4px", fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontWeight: 600, color: "inherit" }, children: [
            t("plan.decisionLog"),
            "\uFF1A"
          ] }),
          runDetail.context.decisionLog.slice(-6).map((entry, entryIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            "\xB7 [",
            entry.kind,
            "] ",
            entry.detail
          ] }, entryIndex))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Card,
      {
        title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { cursor: "pointer", userSelect: "none" }, onClick: () => {
          setSchedOpen(!schedOpen);
        }, children: [
          schedOpen ? "\u25BE " : "\u25B8 ",
          t("sched.title"),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { ...styles.label, marginLeft: "8px" }, children: (scheduledData ?? []).length > 0 ? String((scheduledData ?? []).length) + " \u4E2A" : "" })
        ] }),
        children: schedOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.formInline, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { style: { ...styles.input, flex: 1, minWidth: 160 }, placeholder: t("sched.formName"), value: schedName, onChange: (e) => {
              setSchedName(e.target.value);
            } }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { style: { ...styles.select, width: "auto" }, value: schedType, onChange: (e) => {
              setSchedType(e.target.value);
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "review", children: t("sched.typeReview") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "summary", children: t("sched.typeSummary") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "run", children: t("sched.typeRun") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "sync", children: t("sched.typeSync") })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { style: { ...styles.input, width: 120 }, placeholder: t("sched.formInterval"), value: schedInterval, onChange: (e) => {
              setSchedInterval(e.target.value);
            } }),
            schedType === "run" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { style: styles.input, placeholder: t("exec.formTitle"), value: schedTitle, onChange: (e) => {
                setSchedTitle(e.target.value);
              } }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { style: styles.textarea, rows: 2, placeholder: t("exec.formDesc"), value: schedDesc, onChange: (e) => {
                setSchedDesc(e.target.value);
              } })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.button, disabled: schedName.trim() === "", onClick: () => {
              void addScheduled();
            }, children: t("sched.add") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)", marginBottom: "8px" }, children: t("sched.hint") }),
          (scheduledData ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("sched.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { style: styles.table, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: ["sched.col.name", "sched.col.type", "sched.col.interval", "sched.col.next", "sched.col.lastResult", "sched.col.actions"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { style: styles.th, children: t(key) }, key)) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (scheduledData ?? []).map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { style: { opacity: task.enabled ? 1 : 0.45 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { style: styles.td, children: [
                task.name,
                task.title !== "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: [
                  "\uFF08",
                  task.title,
                  "\uFF09"
                ] }) : null
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(task.type === "review" ? "#569cd6" : task.type === "summary" ? "#4ec9b0" : "#d7ba7d"), children: task.type === "review" ? t("sched.typeReview") : task.type === "summary" ? t("sched.typeSummary") : t("sched.typeRun") }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: task.intervalMinutes >= 1440 ? Math.round(task.intervalMinutes / 1440 * 10) / 10 + t("sched.day") : task.intervalMinutes >= 60 ? Math.round(task.intervalMinutes / 60 * 10) / 10 + t("sched.hour") : task.intervalMinutes + t("sched.minute") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: task.enabled ? formatTime(task.nextDueAt) : "\u2014" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: { ...styles.td, fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)", maxWidth: 220, whiteSpace: "normal" }, children: task.lastResult || (task.lastRunAt !== null ? formatTime(task.lastRunAt) : "\u2014") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "4px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
                  void scheduledAction("update", { id: task.id, enabled: !task.enabled });
                }, children: task.enabled ? t("sched.disable") : t("sched.enable") }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
                  void scheduledAction("run", { id: task.id });
                }, children: t("sched.runNow") }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
                  setConfirmDialog({ title: "\u5220\u9664\u8FD9\u4E2A\u4F8B\u884C\u4EFB\u52A1\uFF1F", message: "\u300C" + task.name + "\u300D\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002", danger: true, onConfirm: () => {
                    void scheduledAction("delete", { id: task.id });
                  } });
                }, children: "\u2715" })
              ] }) })
            ] }, task.id)) })
          ] }) })
        ] })
      }
    )
  ] });
  const notesTab = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: t("notes.title"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "10px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            style: { ...styles.input, width: 220 },
            placeholder: t("notes.search"),
            value: noteSearch,
            onChange: (e) => {
              setNoteSearch(e.target.value);
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
        (() => {
          const lastSummary = notes.filter((note) => note.sha === "summary").sort((a, b) => b.createdAt - a.createdAt)[0];
          const newCommits = lastSummary === void 0 ? -1 : (commitsData?.commits ?? []).filter((commit) => commit.date > lastSummary.createdAt).length;
          if (newCommits === -1) {
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: t("notes.digestNever") });
          }
          if (newCommits === 0) return null;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "11px", color: "var(--dsw-alias-brand-primary, #2563eb)" }, children: t("notes.digestPending").replace("{n}", String(newCommits)) });
        })(),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.secondary, disabled: aiSummarizing, onClick: () => {
          void aiSummarize();
        }, children: aiSummarizing ? t("notes.aiSummaryRun") : "\u2728 " + t("notes.aiSummary") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...styles.formRow, border: "1px dashed var(--dsw-alias-border-l2, rgba(5,5,5,0.15))", borderRadius: "8px", padding: "10px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { style: styles.input, placeholder: t("notes.formTitle"), value: noteTitle, onChange: (e) => {
          setNoteTitle(e.target.value);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { style: { ...styles.input }, placeholder: t("notes.tagsHint"), value: noteTags, onChange: (e) => {
          setNoteTags(e.target.value);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "textarea",
          {
            style: styles.textarea,
            rows: 6,
            placeholder: t("notes.contentHint"),
            value: noteContent,
            onChange: (e) => {
              setNoteContent(e.target.value);
            }
          }
        ),
        selectedTargets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: [
          t("notes.boundTo"),
          ": ",
          selectedTargets[0] === "working" ? t("repo.working") : selectedTargets[0].slice(0, 8)
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.button, disabled: noteTitle.trim() === "" || noteContent.trim() === "", onClick: () => {
          void addNote();
        }, children: t("notes.add") }) })
      ] }),
      (() => {
        const keyword = noteSearch.trim().toLowerCase();
        const matched = keyword === "" ? notes : notes.filter((note) => (note.title + " " + note.content + " " + (note.tags ?? []).join(" ")).toLowerCase().includes(keyword));
        const visible = [...matched].sort((left, right) => Number(right.pinned === true) - Number(left.pinned === true) || right.createdAt - left.createdAt);
        if (visible.length === 0) {
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: notes.length === 0 ? t("notes.empty") : t("notes.emptySearch") });
        }
        return visible.map((note) => {
          const isSummary = note.sha === "summary";
          const editing = editingNote !== null && editingNote.id === note.id ? editingNote : null;
          const expanded = noteExpanded[note.id] === true;
          const long = note.content.length > 260 || note.content.split("\n").length > 6;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              style: {
                ...styles.noteCard,
                ...isSummary ? { background: "rgba(37,99,235,0.04)", borderColor: "rgba(37,99,235,0.3)" } : {}
              },
              children: editing !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.formRow, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { style: styles.input, value: editing.title, onChange: (e) => {
                  setEditingNote({ ...editing, title: e.target.value });
                } }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { style: styles.input, placeholder: t("notes.tagsHint"), value: editing.tags, onChange: (e) => {
                  setEditingNote({ ...editing, tags: e.target.value });
                } }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { style: styles.textarea, rows: 10, value: editing.content, onChange: (e) => {
                  setEditingNote({ ...editing, content: e.target.value });
                } }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "6px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.button, padding: "4px 12px" }, onClick: () => {
                    void saveNoteEdit();
                  }, children: t("notes.save") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "4px 12px" }, onClick: () => {
                    setEditingNote(null);
                  }, children: t("notes.cancel") })
                ] })
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.noteTitleRow, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.noteTitleText, children: [
                    isSummary ? "\u{1F4D6} " : "",
                    note.pinned === true ? "\u{1F4CC} " : "",
                    note.title
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "4px", flexShrink: 0 }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "button",
                      {
                        style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px", color: note.pinned === true ? "var(--dsw-alias-brand-primary, #2563eb)" : void 0 },
                        title: note.pinned === true ? t("notes.unpin") : t("notes.pin"),
                        onClick: () => {
                          void toggleNotePin(note);
                        },
                        children: "\u{1F4CC}"
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, title: t("notes.copyMdHint"), onClick: () => {
                      const md = `# ${note.title}

${note.content}
`;
                      void navigator.clipboard?.writeText(md).then(() => setActionResult("\u2713 " + t("notes.copyMdDone"))).catch(() => setActionResult("\u2717 \u590D\u5236\u5931\u8D25"));
                    }, children: [
                      "\u{1F4CB} ",
                      t("notes.copyMd")
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, title: t("notes.exportMdHint"), onClick: () => {
                      exportNote(note);
                    }, children: [
                      "\u{1F4BE} ",
                      t("notes.exportMd")
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, title: t("notes.toMemoryHint"), onClick: () => {
                      setMemoryTitle(note.title);
                      setMemoryContent(note.content);
                      setActionResult(t("notes.toMemoryDone"));
                    }, children: [
                      "\u{1F9E0} ",
                      t("notes.toMemory")
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
                      setEditingNote({ id: note.id, title: note.title, content: note.content, tags: (note.tags ?? []).join(", ") });
                    }, children: t("notes.edit") }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
                      setConfirmDialog({ title: "\u5220\u9664\u8FD9\u6761\u7B14\u8BB0\uFF1F", message: "\u300C" + note.title + "\u300D\u5C06\u88AB\u6C38\u4E45\u5220\u9664\uFF0C\u4E0D\u53EF\u6062\u590D\u3002", danger: true, onConfirm: () => {
                        void removeNote(note.id);
                      } });
                    }, children: "\u2715" })
                  ] })
                ] }),
                isSummary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.noteContent, ...long && !expanded ? styles.noteClamp : {} }, children: renderStructuredContent(note.content) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.noteContent, ...long && !expanded ? styles.noteClamp : {} }, children: note.content }),
                long && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: styles.linkBtn, onClick: () => {
                  setNoteExpanded({ ...noteExpanded, [note.id]: !expanded });
                }, children: [
                  expanded ? t("notes.collapse") : t("notes.expand"),
                  "\uFF08",
                  note.content.length,
                  " \u5B57\uFF09"
                ] }),
                (note.tags ?? []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "6px" }, children: (note.tags ?? []).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "button",
                  {
                    style: { ...styles.badge("#2563eb"), cursor: "pointer", border: "none", padding: "1px 8px", borderRadius: "999px", fontSize: "10px" },
                    onClick: () => {
                      setNoteSearch(tag);
                    },
                    children: [
                      "#",
                      tag
                    ]
                  },
                  tag
                )) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.noteMeta, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(note.createdAt).toLocaleString() }),
                  note.updatedAt !== void 0 && note.updatedAt > note.createdAt + 1e3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
                    "\uFF08",
                    t("notes.editedAt"),
                    " ",
                    new Date(note.updatedAt).toLocaleString(),
                    "\uFF09"
                  ] }),
                  isSummary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#2563eb"), children: t("notes.summaryTag") }),
                  note.sha !== void 0 && note.sha !== "summary" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#8b8b8b"), children: note.sha === "working" ? t("repo.working") : note.sha.slice(0, 8) })
                ] })
              ] })
            },
            note.id
          );
        });
      })()
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: t("memory.zoneTitle") + (project !== null ? " \xB7 " + project.name : ""), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "8px", padding: "6px 10px", border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.1))", borderRadius: "8px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "11px" }, children: [
          "\u{1F504} ",
          t("memory.syncBaseline"),
          "\uFF1A",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: memoriesData?.baseline?.sha != null ? memoriesData.baseline.sha.slice(0, 8) : t("memory.syncNone") })
        ] }),
        memoriesData?.branch != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#569cd6"), children: memoriesData.branch }),
        (memoriesData?.behindCount ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "11px", color: themeAwareText("#d97706") }, children: t("memory.behind").replace("{n}", String(memoriesData?.behindCount ?? 0)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "3px 10px", fontSize: "11px" }, disabled: memorySyncing, onClick: () => {
          void syncMemories();
        }, children: memorySyncing ? t("memory.syncing") : "\u{1F504} " + t("memory.sync") })
      ] }),
      syncReport !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: "10px", padding: "8px 12px", borderRadius: "8px", background: syncReport.ok === false ? "rgba(209,36,47,0.06)" : "rgba(78,201,176,0.06)", border: "1px solid " + (syncReport.ok === false ? "rgba(209,36,47,0.3)" : "rgba(78,201,176,0.3)") }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "12px", fontWeight: 600 }, children: syncReport.ok === false ? "\u2717 " + t("memory.syncFailed") : "\u2713 " + (syncReport.verdict ?? "") }),
        syncReport.ok !== false && (syncReport.staleProposals ?? []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "6px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", fontWeight: 600 }, children: t("memory.staleTitle") }),
          (syncReport.staleProposals ?? []).map((proposal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "6px", alignItems: "center", marginTop: "4px", fontSize: "11px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { flex: 1 }, children: [
              proposal.title,
              " \u2014\u2014 ",
              proposal.reason
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "1px 8px", fontSize: "10px" }, onClick: () => {
              void applySync([proposal.id], "mark-stale");
            }, children: t("memory.markStale") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "1px 8px", fontSize: "10px" }, onClick: () => {
              void applySync([proposal.id], "archive");
            }, children: t("memory.archiveBtn") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "1px 8px", fontSize: "10px" }, onClick: () => {
              setSyncReport((previous) => previous === null ? null : { ...previous, staleProposals: (previous.staleProposals ?? []).filter((item) => item.id !== proposal.id) });
            }, children: t("memory.keepActive") })
          ] }, proposal.id))
        ] }),
        syncReport.ok !== false && (syncReport.newCandidates ?? []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "6px", fontSize: "11px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontWeight: 600 }, children: t("memory.newCandidates") }),
          (syncReport.newCandidates ?? []).map((candidate, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            "\uFF0B [",
            candidate.type,
            "] ",
            candidate.title
          ] }, index))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.linkBtn, marginTop: "4px" }, onClick: () => {
          setSyncReport(null);
        }, children: t("memory.closeReport") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.formRow, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { style: styles.input, placeholder: t("form.memoryTitle"), value: memoryTitle, onChange: (e) => {
          setMemoryTitle(e.target.value);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { style: { ...styles.select, width: "auto" }, value: memoryType, onChange: (e) => {
          setMemoryType(e.target.value);
        }, children: Object.entries(MEMORY_TYPE_LABELS).map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value, children: label }, value)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { style: { ...styles.select, width: "auto" }, value: memoryScope, onChange: (e) => {
          setMemoryScope(e.target.value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "project", children: t("memory.scopeProject") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "branch", children: t("memory.scopeBranch") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { style: styles.textarea, rows: 3, placeholder: t("form.memoryContent"), value: memoryContent, onChange: (e) => {
          setMemoryContent(e.target.value);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            style: styles.button,
            disabled: busy !== null || memoryTitle.trim() === "" || memoryContent.trim() === "",
            onClick: () => {
              void runAction("recordMemory", "/project-control/api/memory", { memoryType, scope: memoryScope, title: memoryTitle.trim(), content: memoryContent.trim() }).then(async () => {
                setMemoryTitle("");
                setMemoryContent("");
                await loadMemories();
              });
            },
            children: busy === "recordMemory" ? t("action.running") : t("memory.record")
          }
        ) })
      ] }),
      (() => {
        const all = memoriesData?.memories ?? [];
        const pending = all.filter((memory) => !memory.isHumanConfirmed && memory.status === "active");
        const active = all.filter((memory) => memory.status === "active");
        const grouped = /* @__PURE__ */ new Map();
        for (const memory of active) {
          const list = grouped.get(memory.type) ?? [];
          list.push(memory);
          grouped.set(memory.type, list);
        }
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          pending.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: "10px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...styles.sectionTitle, color: "var(--dsw-alias-brand-primary, #2563eb)" }, children: [
              "\u23F3 ",
              t("memory.pendingQueue"),
              "\uFF08",
              String(pending.length),
              "\uFF09"
            ] }),
            pending.map((memory) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...styles.noteCard, borderColor: "rgba(37,99,235,0.3)", background: "rgba(37,99,235,0.03)" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.noteTitleRow, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.noteTitleText, children: memory.title }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "4px", flexShrink: 0 }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.button, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
                    void confirmMemory(memory.id).then(() => {
                      void loadMemories();
                    });
                  }, children: t("memory.confirm") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
                    void memoryAction("status", { id: memory.id, status: "archived" });
                  }, children: t("memory.archiveBtn") })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.noteContent, children: memory.content }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.noteMeta, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("rgba(37,99,235,0.15)"), children: MEMORY_SOURCE_LABELS[memory.sourceTag] ?? memory.sourceTag }),
                memory.basisSha !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#8b8b8b"), children: memory.basisSha.slice(0, 8) })
              ] })
            ] }, memory.id))
          ] }),
          [...grouped.entries()].map(([type, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: "10px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.sectionTitle, children: [
              MEMORY_TYPE_LABELS[type] ?? type,
              "\uFF08",
              String(items.length),
              "\uFF09"
            ] }),
            items.map((memory) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...styles.noteCard, opacity: memory.status === "active" ? 1 : 0.6 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.noteTitleRow, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.noteTitleText, children: [
                  memory.isHumanConfirmed ? "\u2705 " : "",
                  memory.title
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "4px", flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }, children: [
                  !memory.isHumanConfirmed && memory.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.button, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
                    void confirmMemory(memory.id).then(() => {
                      void loadMemories();
                    });
                  }, children: t("memory.confirm") }) : null,
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
                    void memoryToNote(memory);
                  }, children: [
                    "\u{1F4C4} ",
                    t("memory.toNote")
                  ] }),
                  memory.scope === "branch" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
                    void memoryAction("normalize", { id: memory.id });
                  }, children: [
                    "\u21F1 ",
                    t("memory.normalize")
                  ] }),
                  memory.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
                    void memoryAction("status", { id: memory.id, status: "archived" });
                  }, children: t("memory.archiveBtn") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
                    void memoryAction("status", { id: memory.id, status: "active" });
                  }, children: t("memory.restore") })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.noteContent, maxHeight: 84, overflow: "hidden" }, children: memory.content }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.noteMeta, children: [
                memory.status === "stale" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#d97706"), children: t("memory.statusStale") }),
                memory.scope === "branch" && memory.gitBranch !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.badge("#569cd6"), children: [
                  "\u2387 ",
                  memory.gitBranch
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("rgba(37,99,235,0.15)"), children: MEMORY_SOURCE_LABELS[memory.sourceTag] ?? memory.sourceTag }),
                memory.basisSha !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#8b8b8b"), children: memory.basisSha.slice(0, 8) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(memory.updatedAt).toLocaleString() })
              ] })
            ] }, memory.id))
          ] }, type)),
          all.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("memory.empty") })
        ] });
      })()
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { title: t("concepts.title"), children: concepts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("concepts.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { style: styles.table, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: ["concepts.col.name", "concepts.col.category", "concepts.col.count"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { style: styles.th, children: t(key) }, key)) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: concepts.map((concept) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: concept.name }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: concept.category }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: String(concept.occurrences) })
      ] }, concept.id)) })
    ] }) })
  ] });
  const reviewTab = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    resultPanel,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { title: t("review.recordsTitle"), children: (() => {
      const all = (issuesData ?? []).map((issue) => ({ ...issue, severity: normalizeIssueSeverity(issue.severity) }));
      const openCount = all.filter((issue) => issue.status === "open" || issue.status === "fixing").length;
      const counts = [
        { key: "", label: t("review.filterAll"), count: all.length },
        { key: "critical", label: "critical", count: all.filter((issue) => issue.severity === "critical" || issue.severity === "blocker").length },
        { key: "major", label: "major", count: all.filter((issue) => issue.severity === "major").length },
        { key: "minor", label: "minor", count: all.filter((issue) => issue.severity === "minor").length },
        { key: "info", label: "info", count: all.filter((issue) => issue.severity === "info").length }
      ];
      const visible = all.filter((issue) => {
        if (issueSeverityFilter === "") return true;
        if (issueSeverityFilter === "critical") return issue.severity === "critical" || issue.severity === "blocker";
        return issue.severity === issueSeverityFilter;
      }).filter((issue) => issueStatusFilter === "" || issue.status === issueStatusFilter);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap", marginBottom: "10px" }, children: [
          counts.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              style: styles.chip(issueSeverityFilter === item.key),
              onClick: () => {
                setIssueSeverityFilter(item.key);
              },
              children: [
                item.label,
                " \xB7 ",
                item.count
              ]
            },
            item.key === "" ? "all" : item.key
          )),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: [
            openCount,
            " \u5F85\u5904\u7406 / \u5171 ",
            all.length,
            (state?.resolvedIssueRetentionDays ?? 0) > 0 ? ` \xB7 ${t("review.retentionHint").replace("{days}", String(state?.resolvedIssueRetentionDays ?? 7))}` : ""
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { style: { ...styles.select, width: "auto", padding: "3px 8px" }, value: issueStatusFilter, onChange: (e) => {
            setIssueStatusFilter(e.target.value);
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: t("review.statusAll") }),
            Object.entries(ISSUE_STATUS_LABELS).map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value, children: label }, value))
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.secondary, onClick: () => {
            void loadIssues();
          }, children: t("review.refresh") })
        ] }),
        all.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: issuesData === null ? "\u2026" : t("review.recordsEmpty") }) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("notes.emptySearch") }) : visible.map((issue) => {
          const expanded = issueExpanded[issue.id] === true;
          const description = issue.description ?? "";
          const long = description.length > 200;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.noteCard, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.noteTitleRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(severityColor(issue.severity)), children: issue.severity }),
                issue.category ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#57606a"), children: issue.category }) : null,
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(issue.status === "open" || issue.status === "fixing" ? "#dcdcaa" : issue.status === "resolved" || issue.status === "accepted" ? "#4ec9b0" : "#8b8b8b"), children: ISSUE_STATUS_LABELS[issue.status] ?? issue.status }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.noteTitleText, children: issue.title })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "4px", flexShrink: 0 }, children: [
                (issue.status === "open" || issue.status === "fixing") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" },
                    disabled: verifyingTarget !== null,
                    title: t("review.verifyHint"),
                    onClick: () => {
                      void verifyIssues(issue.changeId);
                    },
                    children: verifyingTarget === issue.changeId ? t("review.verifyRunning") : "\u{1F50D} " + t("review.verify")
                  }
                ),
                (issue.status === "open" || issue.status === "fixing") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "button",
                  {
                    style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" },
                    title: t("review.falsePositiveHint"),
                    onClick: () => {
                      setConfirmDialog({
                        title: t("review.falsePositiveTitle"),
                        message: t("review.falsePositiveMsg").replace("{title}", issue.title),
                        danger: false,
                        onConfirm: () => {
                          void post("/project-control/api/issues/status", { id: issue.id, status: "rejected" }).then(async ({ ok }) => {
                            if (ok) await loadIssues();
                          });
                        }
                      });
                    },
                    children: [
                      "\u{1F6AB} ",
                      t("review.falsePositive")
                    ]
                  }
                )
              ] })
            ] }),
            description !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.noteContent, ...long && !expanded ? styles.noteClamp : {} }, children: renderWithPeek(description) }),
            issue.resolution ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "6px", padding: "6px 10px", borderRadius: "6px", background: "rgba(78, 201, 176, 0.08)", border: "1px solid rgba(78, 201, 176, 0.35)", fontSize: "11px", color: "var(--dsw-alias-label-primary, #1f2328)" }, children: [
              "\u2713 ",
              issue.resolution
            ] }) : null,
            (issue.fixStats != null || Boolean(issue.fixDiff)) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "button",
                {
                  style: { ...styles.linkBtn, marginTop: "4px", display: "block" },
                  onClick: () => {
                    setFixExpanded((previous) => ({ ...previous, [issue.id]: !(previous[issue.id] === true) }));
                  },
                  children: [
                    "\u{1F527} ",
                    t("review.fixDetail"),
                    "\uFF08",
                    String(issue.fixStats?.files ?? 0),
                    " ",
                    t("review.fixStatFiles"),
                    " \xB7 +",
                    String(issue.fixStats?.insertions ?? 0),
                    " \u2212",
                    String(issue.fixStats?.deletions ?? 0),
                    "\uFF09",
                    fixExpanded[issue.id] === true ? "\u25B2" : "\u25BC"
                  ]
                }
              ),
              fixExpanded[issue.id] === true && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "6px", border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.1))", borderRadius: "6px", padding: "8px 10px" }, children: [
                (issue.fixFiles ?? []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: "8px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", fontWeight: 600, marginBottom: "3px" }, children: t("review.fixFiles") }),
                  (issue.fixFiles ?? []).map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontFamily: "var(--dsw-alias-font-mono, ui-monospace, monospace)", fontSize: "11px" }, children: file }, file))
                ] }),
                (issue.fixImpact ?? []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: "8px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", fontWeight: 600, marginBottom: "3px" }, children: t("review.fixImpact") }),
                  issue.fixImpact.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: "5px" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#0969da"), children: entry.symbol }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "10px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: [
                        " ",
                        t("review.definedIn"),
                        " ",
                        entry.definedIn,
                        " \xB7 ",
                        String(entry.callers.length),
                        " ",
                        t("review.callCount")
                      ] })
                    ] }),
                    entry.callers.slice(0, 5).map((caller, callerIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: "10px", color: "var(--dsw-alias-label-secondary, #6b7280)", paddingLeft: "12px" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { cursor: "pointer", textDecoration: "underline dotted" }, onClick: () => {
                        void openPeek(caller.file, Number(caller.line));
                      }, children: [
                        caller.file,
                        ":",
                        caller.line
                      ] }),
                      " ",
                      caller.snippet.slice(0, 80)
                    ] }, callerIndex))
                  ] }, entry.symbol))
                ] }),
                Boolean(issue.fixDiff) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", fontWeight: 600, marginBottom: "3px" }, children: t("review.fixDiff") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: "var(--dsw-alias-bg-inset, rgba(5,5,5,0.03))", borderRadius: "6px", padding: "6px 8px", maxHeight: "300px", overflowY: "auto" }, children: renderDiffLines(issue.fixDiff) })
                ] })
              ] })
            ] }),
            long && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.linkBtn, onClick: () => {
              setIssueExpanded({ ...issueExpanded, [issue.id]: !expanded });
            }, children: expanded ? t("notes.collapse") : t("notes.expand") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.noteMeta, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
                t("review.target"),
                ": ",
                issueTargetLabel(issue.changeId)
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTime(issue.createdAt) })
            ] })
          ] }, issue.id);
        })
      ] });
    })() }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { title: t("verify.records"), children: verifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("verify.recordsEmpty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", { style: styles.table, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: verifications.slice(0, 20).map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(record.status === "passed" ? "#4ec9b0" : "#dcdcaa"), children: record.status }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: record.name }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: formatTime(record.createdAt) })
    ] }, record.id)) }) }) })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.root, "data-testid": "project-control-workspace", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: LAYOUT_STYLE }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-testid": "project-control-divider",
        onPointerDown: onDividerDown,
        style: {
          position: "absolute",
          top: 0,
          bottom: 0,
          right: -4,
          width: 8,
          cursor: "col-resize",
          zIndex: 20
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.nav, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.title, children: t("workspace.title") }),
      tabs.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.tab(tab === entry.key), onClick: () => {
        setTab(entry.key);
      }, children: entry.label }, entry.key)),
      (() => {
        const runningCount = runs.filter((entry) => entry.status === "running" || entry.status === "queued" || entry.status === "verifying").length;
        const failedCount = runs.filter((entry) => entry.status === "failed" || entry.status === "paused").length;
        if (runningCount === 0 && failedCount === 0) return null;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "flex", gap: "4px", marginLeft: "4px", alignItems: "center" }, children: [
          runningCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              style: { ...styles.badge(themeAwareText("#2563eb")), cursor: "pointer", border: "none" },
              title: t("badge.running").replace("{n}", String(runningCount)),
              onClick: () => {
                setTab("execution");
              },
              children: [
                "\u25B6 ",
                String(runningCount)
              ]
            }
          ),
          failedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              style: { ...styles.badge(themeAwareText("#f14c4c")), cursor: "pointer", border: "none" },
              title: t("badge.failed").replace("{n}", String(failedCount)),
              onClick: () => {
                setTab("execution");
              },
              children: [
                "\u2717 ",
                String(failedCount)
              ]
            }
          )
        ] });
      })()
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.body, children: [
      loadError !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.empty, children: [
        t("error.load"),
        ": ",
        loadError
      ] }),
      state?.ready === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: state.reason ?? "" }),
      tab === "commits" && commitsTab,
      tab === "overview" && overviewTab,
      tab === "execution" && executionTab,
      tab === "review" && reviewTab,
      tab === "notes" && notesTab,
      tab === "settings" && settingsTab
    ] }),
    confirmDialog !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ConfirmDialog,
      {
        title: confirmDialog.title,
        message: confirmDialog.message,
        danger: confirmDialog.danger,
        onCancel: () => {
          setConfirmDialog(null);
        },
        onConfirm: () => {
          confirmDialog.onConfirm();
          setConfirmDialog(null);
        }
      }
    ),
    peek !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-testid": "pc-peek-overlay", style: { position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", backdropFilter: "blur(2px)", zIndex: 1e3, display: "flex", alignItems: "center", justifyContent: "center" }, onClick: () => {
      setPeek(null);
    }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { "data-testid": "pc-peek-card", style: { width: "min(760px, 92vw)", maxHeight: "80vh", overflow: "hidden", borderRadius: "10px", background: "var(--dsw-alias-bg-base, #fff)", boxShadow: "0 16px 48px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column" }, onClick: (e) => {
      e.stopPropagation();
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.1))" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontFamily: "var(--dsw-alias-font-mono, ui-monospace, monospace)", fontSize: "12px", fontWeight: 600, wordBreak: "break-all" }, children: [
          peek.path,
          ":",
          String(peek.line)
        ] }),
        peekData?.exists === true && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: [
          String(peekData.startLine),
          "\u2013",
          String(peekData.endLine),
          " / ",
          String(peekData.totalLines),
          " \u884C"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 10px" }, onClick: () => {
          setPeek(null);
        }, children: "\u2715" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { overflow: "auto", padding: "10px 0", background: "var(--dsw-alias-bg-inset, rgba(5,5,5,0.03))" }, children: [
        peekBusy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.empty }, children: "\u8BFB\u53D6\u4E2D\u2026" }),
        !peekBusy && peekData !== null && peekData.exists === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: "\u6587\u4EF6\u4E0D\u5B58\u5728\uFF08\u53EF\u80FD\u5DF2\u88AB\u5220\u9664\u6216\u79FB\u52A8\uFF09" }),
        !peekBusy && peekData?.exists === true && (peekData.lines ?? []).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "10px", padding: "0 14px", fontFamily: "var(--dsw-alias-font-mono, ui-monospace, monospace)", fontSize: "11.5px", lineHeight: 1.7, background: entry.n === peek.line ? "rgba(37,99,235,0.08)" : "transparent" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: 40, textAlign: "right", color: "var(--dsw-alias-label-secondary, #6b7280)", flexShrink: 0 }, children: String(entry.n) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { whiteSpace: "pre-wrap", wordBreak: "break-all" }, children: entry.text === "" ? "\xA0" : entry.text })
        ] }, entry.n))
      ] })
    ] }) })
  ] });
}

// src/client/index.ts
var NS = "project-control";
var name = "client-project-control";
var inject = ["slots", "locale", "layout"];
function apply(ctx) {
  ctx.effect(() => ctx.locale.register(NS, { zh: WORKSPACE_DICT.zh, en: WORKSPACE_DICT.en }), "project-control: dictionaries");
  const layout = ctx.layout;
  let workspaceEnabled = false;
  let disposeWorkspace;
  const registerWorkspace = () => {
    disposeWorkspace = ctx.slots.register(
      {
        name: "details",
        priority: -10,
        locale: NS
      },
      // 挂载即打开 details 轨道（面板偏好默认 0）：工作台需要真实宽度；
      // 无会话落地页轨道恒 0，天然保持原生英雄页布局。
      // 会话切换时官方会 closeDetails —— 延后一拍重新撑开（宏任务晚于父级 effect）。
      (props) => {
        import_react3.default.useEffect(() => {
          layout?.openDetails?.();
        }, []);
        import_react3.default.useEffect(() => {
          if (props.sessionId === void 0) return;
          const timer = setTimeout(() => layout?.openDetails?.(), 0);
          return () => {
            clearTimeout(timer);
          };
        }, [props.sessionId]);
        return import_react3.default.createElement(WorkspaceFrame, { ...props, layout });
      }
    );
  };
  const unregisterWorkspace = () => {
    disposeWorkspace?.();
    disposeWorkspace = void 0;
  };
  ctx.slots.inject("details", () => {
    if (workspaceEnabled) registerWorkspace();
    return () => {
      unregisterWorkspace();
    };
  });
  const TOGGLE_EVENT = "pc-workspace-toggle";
  const fireToggle = (enabled) => {
    window.dispatchEvent(new CustomEvent(TOGGLE_EVENT, { detail: enabled }));
  };
  ctx.slots.inject("sidebar.footer.action", () => {
    return ctx.slots.register({
      name: "sidebar.footer.action",
      id: "project-control-toggle"
    }, () => {
      const [enabled, setEnabled] = import_react3.default.useState(workspaceEnabled);
      import_react3.default.useEffect(() => {
        const handler = (event) => {
          setEnabled(event.detail);
        };
        window.addEventListener(TOGGLE_EVENT, handler);
        return () => {
          window.removeEventListener(TOGGLE_EVENT, handler);
        };
      }, []);
      return import_react3.default.createElement(
        "button",
        {
          "data-testid": "project-control-sidebar-toggle",
          title: enabled ? "\u5F53\u524D\u663E\u793A\u9879\u76EE\u6838\u67E5\u53F0\u3002\u70B9\u51FB\u53EF\u4E34\u65F6\u5207\u6362\u4E3A\u5B98\u65B9\u300C\u8BE6\u60C5\u300D\u9762\u677F\uFF08\u67E5\u770B\u5DE5\u5177\u8C03\u7528\u7684\u5B8C\u6574\u8F93\u5165/\u8F93\u51FA\uFF09\uFF1B\u518D\u70B9\u672C\u6309\u94AE\u5373\u6062\u590D\u3002" : "\u5F53\u524D\u663E\u793A\u5B98\u65B9\u300C\u8BE6\u60C5\u300D\u9762\u677F\u3002\u70B9\u51FB\u6062\u590D\u9879\u76EE\u6838\u67E5\u53F0\u3002",
          style: {
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 10px",
            fontSize: "12px",
            background: "none",
            border: "none",
            color: enabled ? "inherit" : "var(--dsw-alias-brand-primary, #2563eb)",
            fontWeight: enabled ? 400 : 600,
            cursor: "pointer",
            opacity: 0.9
          },
          onClick: () => {
            workspaceEnabled = !workspaceEnabled;
            try {
              if (workspaceEnabled && disposeWorkspace === void 0) registerWorkspace();
              else if (!workspaceEnabled) {
                unregisterWorkspace();
                layout?.closeDetails?.();
              }
            } catch (error) {
              console.warn("[project-control] workspace toggle failed", error);
            }
            fireToggle(workspaceEnabled);
          }
        },
        enabled ? "\u{1F9ED} \u5DE5\u4F5C\u53F0 \u2713" : "\u{1F9ED} \u6253\u5F00\u5DE5\u4F5C\u53F0"
      );
    });
  });
  const simpleResultCard = (title) => (props) => {
    const output = props?.output;
    const text = typeof output === "string" ? output : output?.summary ?? output?.issues ?? output?.details ?? (output ? JSON.stringify(output, null, 2) : "\u6267\u884C\u4E2D\u2026");
    return import_react3.default.createElement(
      "div",
      {
        style: {
          border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.08))",
          borderRadius: "8px",
          padding: "10px 12px",
          margin: "4px 0",
          background: "var(--dsw-alias-bg-layer-1, #fafafa)",
          fontSize: "12px",
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
          maxHeight: 260,
          overflowY: "auto"
        }
      },
      import_react3.default.createElement("div", { style: { fontWeight: 600, marginBottom: "4px" } }, title),
      String(text)
    );
  };
  ctx.slots.inject("tool.call.toolview", () => {
    return ctx.slots.register({
      name: "tool.call.toolview",
      key: "analyze_change"
    }, (props) => {
      if (props?.toolName !== "analyze_change") return null;
      const output = props?.output;
      return import_react3.default.createElement(ChangeCard, {
        title: "\u53D8\u66F4\u5206\u6790\u62A5\u544A (Change Analysis)",
        filesChanged: output?.filesChanged ?? 0,
        insertions: output?.insertions ?? 0,
        deletions: output?.deletions ?? 0,
        evidenceId: output?.evidenceId,
        status: output ? "completed" : "analyzing"
      });
    });
  });
  for (const [toolKey, title] of [
    ["start_run", "\u{1F680} \u6267\u884C Run"],
    ["run_review", "\u{1F50D} \u4EE3\u7801\u8BC4\u5BA1"],
    ["run_verification", "\u2705 \u9A8C\u6536\u9A8C\u8BC1"]
  ]) {
    ctx.slots.inject("tool.call.toolview", () => {
      return ctx.slots.register({ name: "tool.call.toolview", key: toolKey }, simpleResultCard(title));
    });
  }
}
return module.exports; } });
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NsaWVudC9pbmRleC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdGhlbWUudHMiLCAiLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmtzcGFjZUZyYW1lLnRzeCIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvY29tbWl0LXJvdW5kcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBDbGllbnQgcGx1Z2luIGVudHJ5IGZvciBkc2gtcHJvamVjdC1jb250cm9sLlxuICpcbiAqIFx1NUUwM1x1NUM0MFx1NjdCNlx1Njc4NFx1RkYwOFx1NURGMlx1OUE4Q1x1OEJDMVx1RkYwQzIwMjYtMDgtMzBcdUZGMDlcdUZGMUFcbiAqIC0gXHU1REU1XHU0RjVDXHU1M0YwXHU5MDZFXHU4NTNEXHU1Qjk4XHU2NUI5IGBkZXRhaWxzYCBcdTY5RkRcdUZGMDhwcmlvcml0eSAtMTBcdUZGMENcdTVCOThcdTY1QjkgRGV0YWlsc1BhbmVsIFx1NzU1OVx1NTcyOFx1OEQyNlx1NjcyQ1x1NEUwQVx1RkYwQ1xuICogICBcdTUzNzhcdThGN0RcdTYyMTFcdTRFRUNcdTc2ODRcdTZDRThcdTUxOENcdTUzNzNcdTYwNjJcdTU5MERcdUZGMDlcdUZGMENcdTZFMzJcdTY3RDNcdTU3MjhcdTRFM0JcdTY4NDZcdTY3QjYgZGV0YWlscyBcdTUyMTdcdUZGMUJcbiAqIC0gV29ya3NwYWNlRnJhbWUgXHU2Q0U4XHU1MTY1XHU2ODM3XHU1RjBGXHU4ODY4XHVGRjBDXHU2MjhBXHU1Qjk4XHU2NUI5XHU3RjUxXHU2ODNDXHU4OUM2XHU4OUM5XHU2MzYyXHU1MjE3XHVGRjFBXHU4MDRBXHU1OTI5XHVGRjA4Y2VudGVyQ29sXHVGRjA5XHU2NzAwXHU1M0YzXHUzMDAxXG4gKiAgIFx1NURFNVx1NEY1Q1x1NTNGMFx1RkYwOGRldGFpbHNDb2xcdUZGMDlcdTVDNDVcdTRFMkQgMWZyXHVGRjFCXHU2NUUwXHU0RjFBXHU4QkREXHU4NDNEXHU1NzMwXHU5ODc1XHVGRjA4ZGF0YS1kZXRhaWxzLWNvbGxhcHNlZFx1RkYwOVxuICogICBcdTgxRUFcdTUyQThcdTYwNjJcdTU5MERcdTUzOUZcdTc1MUZcdTUyMTdcdTVFOEZcdUZGMUJcbiAqIC0gXHU1REU2XHU0RkE3XHU1Qjk4XHU2NUI5XHU1QkZDXHU4MjJBXHUzMDAxXHU1Qjk4XHU2NUI5XHU4MDRBXHU1OTI5XHU2NzJDXHU0RjUzXHU5NkY2XHU2NTM5XHU1MkE4XHVGRjFCXG4gKiAtIFx1NEZBN1x1OEZCOVx1NjgwRlx1NjMwOVx1OTRBRVx1NTcyOFx1MzAwQ1x1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTNGMCBcdTIxQzQgXHU1Qjk4XHU2NUI5XHU4QkU2XHU2MEM1XHU5NzYyXHU2NzdGXHUzMDBEXHU5NUY0XHU1MjA3XHU2MzYyXHVGRjA4XHU1M0VGXHU5MDA2XHVGRjA5XHVGRjFCXG4gKiAtIGB0b29sLmNhbGwudG9vbHZpZXdgIFx1NEUzQSBhbmFseXplX2NoYW5nZSBcdTRGRERcdTc1NTlcdTRFMTNcdTVDNUVcdTUzNjFcdTcyNDdcdUZGMUJcbiAqIC0gXHU2NTg3XHU2ODQ4XHU1MTY4XHU5MEU4XHU3RUNGIGN0eC5sb2NhbGUgXHU4QkNEXHU1MTc4XHVGRjA4emggLyBlblx1RkYwOVx1MzAwMlxuICpcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2xcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDaGFuZ2VDYXJkIH0gZnJvbSAnLi9jb21wb25lbnRzL0NoYW5nZUNhcmQudHMnXG5pbXBvcnQgeyBXT1JLU1BBQ0VfRElDVCwgV29ya3NwYWNlRnJhbWUgfSBmcm9tICcuL2NvbXBvbmVudHMvV29ya3NwYWNlRnJhbWUudHN4J1xuXG5jb25zdCBOUyA9ICdwcm9qZWN0LWNvbnRyb2wnXG5cbmV4cG9ydCBjb25zdCBuYW1lID0gJ2NsaWVudC1wcm9qZWN0LWNvbnRyb2wnXG5leHBvcnQgY29uc3QgaW5qZWN0ID0gWydzbG90cycsICdsb2NhbGUnLCAnbGF5b3V0J11cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KGN0eDogYW55KTogdm9pZCB7XG4gIGN0eC5lZmZlY3QoKCkgPT4gY3R4LmxvY2FsZS5yZWdpc3RlcihOUywgeyB6aDogV09SS1NQQUNFX0RJQ1QuemgsIGVuOiBXT1JLU1BBQ0VfRElDVC5lbiB9KSwgJ3Byb2plY3QtY29udHJvbDogZGljdGlvbmFyaWVzJylcbiAgY29uc3QgbGF5b3V0ID0gY3R4LmxheW91dFxuXG4gIC8vIFx1MjUwMFx1MjUwMCAxLiBcdTk4NzlcdTc2RUVcdTVERTVcdTRGNUNcdTUzRjBcdUZGMUFcdTkwNkVcdTg1M0QgZGV0YWlscyBcdTY5RkRcdUZGMDhcdTUzRUZcdTkwMDZcdUZGMDlcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgLy8gXHU2NUIwXHU3QTk3XHU1M0UzXHU5RUQ4XHU4QkE0XHU0RTBEXHU2NjNFXHU3OTNBXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4XHU0RkREXHU2MzAxXHU1Qjk4XHU2NUI5XHU1MzlGXHU3NTFGXHU4OUM2XHU4OUQyXHVGRjA5XHVGRjBDXHU3NTMxXHU0RkE3XHU4RkI5XHU2ODBGXHU2MzA5XHU5NEFFXHU2NjNFXHU1RjBGXHU2MjUzXHU1RjAwXHUzMDAyXG4gIGxldCB3b3Jrc3BhY2VFbmFibGVkID0gZmFsc2VcbiAgbGV0IGRpc3Bvc2VXb3Jrc3BhY2U6ICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZFxuXG4gIGNvbnN0IHJlZ2lzdGVyV29ya3NwYWNlID0gKCk6IHZvaWQgPT4ge1xuICAgIGRpc3Bvc2VXb3Jrc3BhY2UgPSBjdHguc2xvdHMucmVnaXN0ZXIoXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdkZXRhaWxzJyxcbiAgICAgICAgcHJpb3JpdHk6IC0xMCxcbiAgICAgICAgbG9jYWxlOiBOUyxcbiAgICAgIH0sXG4gICAgICAvLyBcdTYzMDJcdThGN0RcdTUzNzNcdTYyNTNcdTVGMDAgZGV0YWlscyBcdThGNjhcdTkwNTNcdUZGMDhcdTk3NjJcdTY3N0ZcdTUwNEZcdTU5N0RcdTlFRDhcdThCQTQgMFx1RkYwOVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1OTcwMFx1ODk4MVx1NzcxRlx1NUI5RVx1NUJCRFx1NUVBNlx1RkYxQlxuICAgICAgLy8gXHU2NUUwXHU0RjFBXHU4QkREXHU4NDNEXHU1NzMwXHU5ODc1XHU4RjY4XHU5MDUzXHU2MDUyIDBcdUZGMENcdTU5MjlcdTcxMzZcdTRGRERcdTYzMDFcdTUzOUZcdTc1MUZcdTgyRjFcdTk2QzRcdTk4NzVcdTVFMDNcdTVDNDBcdTMwMDJcbiAgICAgIC8vIFx1NEYxQVx1OEJERFx1NTIwN1x1NjM2Mlx1NjVGNlx1NUI5OFx1NjVCOVx1NEYxQSBjbG9zZURldGFpbHMgXHUyMDE0XHUyMDE0IFx1NUVGNlx1NTQwRVx1NEUwMFx1NjJDRFx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1RkYwOFx1NUI4Rlx1NEVGQlx1NTJBMVx1NjY1QVx1NEU4RVx1NzIzNlx1N0VBNyBlZmZlY3RcdUZGMDlcdTMwMDJcbiAgICAgIChwcm9wczogYW55KSA9PiB7XG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgbGF5b3V0Py5vcGVuRGV0YWlscz8uKClcbiAgICAgICAgfSwgW10pXG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHByb3BzLnNlc3Npb25JZCA9PT0gdW5kZWZpbmVkKSByZXR1cm5cbiAgICAgICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gbGF5b3V0Py5vcGVuRGV0YWlscz8uKCksIDApXG4gICAgICAgICAgcmV0dXJuICgpID0+IHsgY2xlYXJUaW1lb3V0KHRpbWVyKSB9XG4gICAgICAgIH0sIFtwcm9wcy5zZXNzaW9uSWRdKVxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChXb3Jrc3BhY2VGcmFtZSwgeyAuLi5wcm9wcywgbGF5b3V0IH0pXG4gICAgICB9LFxuICAgIClcbiAgfVxuICBjb25zdCB1bnJlZ2lzdGVyV29ya3NwYWNlID0gKCk6IHZvaWQgPT4ge1xuICAgIGRpc3Bvc2VXb3Jrc3BhY2U/LigpXG4gICAgZGlzcG9zZVdvcmtzcGFjZSA9IHVuZGVmaW5lZFxuICB9XG5cbiAgY3R4LnNsb3RzLmluamVjdCgnZGV0YWlscycsICgpID0+IHtcbiAgICBpZiAod29ya3NwYWNlRW5hYmxlZCkgcmVnaXN0ZXJXb3Jrc3BhY2UoKVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB1bnJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICB9XG4gIH0pXG5cbiAgLy8gXHUyNTAwXHUyNTAwIDIuIFx1NEZBN1x1OEZCOVx1NjgwRlx1NUU5NVx1OTBFOFx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMCBcdTIxQzQgXHU1Qjk4XHU2NUI5XHU4QkU2XHU2MEM1IFx1NTIwN1x1NjM2MiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgLy8gXHU2MzA5XHU5NEFFXHU3MkI2XHU2MDAxXHU2NjBFXHU3OTNBXHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwXHU2NjNFXHU3OTNBXHU0RTJEIFx1MjE5MiBcdTMwMENcdUQ4M0VcdURERUQgXHU1REU1XHU0RjVDXHU1M0YwIFx1MjcxM1x1MzAwRFx1RkYxQlx1NURGMlx1NTIwN1x1NUI5OFx1NjVCOVx1OEJFNlx1NjBDNSBcdTIxOTIgXHUzMDBDXHVEODNFXHVEREVEIFx1NjI1M1x1NUYwMFx1NURFNVx1NEY1Q1x1NTNGMFx1MzAwRFx1OUFEOFx1NEVBRVx1RkYwQ1xuICAvLyBcdTc1MjhcdTYyMzdcdTk2OEZcdTY1RjZcdTc3MEJcdTVGOTdcdTUyMzBcdTYwMEVcdTRFNDhcdTUyMDdcdTU2REVcdTY3NjVcdUZGMDhcdTUyMDdcdTYzNjJcdTdFQ0Ygd2luZG93IFx1NEU4Qlx1NEVGNlx1OTAxQVx1NzdFNVx1NjMwOVx1OTRBRVx1OTFDRFx1NkUzMlx1NjdEM1x1RkYwOVx1MzAwMlxuICBjb25zdCBUT0dHTEVfRVZFTlQgPSAncGMtd29ya3NwYWNlLXRvZ2dsZSdcbiAgY29uc3QgZmlyZVRvZ2dsZSA9IChlbmFibGVkOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFRPR0dMRV9FVkVOVCwgeyBkZXRhaWw6IGVuYWJsZWQgfSkpXG4gIH1cbiAgY3R4LnNsb3RzLmluamVjdCgnc2lkZWJhci5mb290ZXIuYWN0aW9uJywgKCkgPT4ge1xuICAgIHJldHVybiBjdHguc2xvdHMucmVnaXN0ZXIoe1xuICAgICAgbmFtZTogJ3NpZGViYXIuZm9vdGVyLmFjdGlvbicsXG4gICAgICBpZDogJ3Byb2plY3QtY29udHJvbC10b2dnbGUnLFxuICAgIH0sICgpID0+IHtcbiAgICAgIGNvbnN0IFtlbmFibGVkLCBzZXRFbmFibGVkXSA9IFJlYWN0LnVzZVN0YXRlKHdvcmtzcGFjZUVuYWJsZWQpXG4gICAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gKGV2ZW50OiBFdmVudCk6IHZvaWQgPT4geyBzZXRFbmFibGVkKChldmVudCBhcyBDdXN0b21FdmVudDxib29sZWFuPikuZGV0YWlsKSB9XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFRPR0dMRV9FVkVOVCwgaGFuZGxlcilcbiAgICAgICAgcmV0dXJuICgpID0+IHsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoVE9HR0xFX0VWRU5ULCBoYW5kbGVyKSB9XG4gICAgICB9LCBbXSlcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAge1xuICAgICAgICAgICdkYXRhLXRlc3RpZCc6ICdwcm9qZWN0LWNvbnRyb2wtc2lkZWJhci10b2dnbGUnLFxuICAgICAgICAgIHRpdGxlOiBlbmFibGVkID8gJ1x1NUY1M1x1NTI0RFx1NjYzRVx1NzkzQVx1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMFx1MzAwMlx1NzBCOVx1NTFGQlx1NTNFRlx1NEUzNFx1NjVGNlx1NTIwN1x1NjM2Mlx1NEUzQVx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1RkYwOFx1NjdFNVx1NzcwQlx1NURFNVx1NTE3N1x1OEMwM1x1NzUyOFx1NzY4NFx1NUI4Q1x1NjU3NFx1OEY5M1x1NTE2NS9cdThGOTNcdTUxRkFcdUZGMDlcdUZGMUJcdTUxOERcdTcwQjlcdTY3MkNcdTYzMDlcdTk0QUVcdTUzNzNcdTYwNjJcdTU5MERcdTMwMDInIDogJ1x1NUY1M1x1NTI0RFx1NjYzRVx1NzkzQVx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1MzAwMlx1NzBCOVx1NTFGQlx1NjA2Mlx1NTkwRFx1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMFx1MzAwMicsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzZweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEwcHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgIGNvbG9yOiBlbmFibGVkID8gJ2luaGVyaXQnIDogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiBlbmFibGVkID8gNDAwIDogNjAwLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsIG9wYWNpdHk6IDAuOSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgIHdvcmtzcGFjZUVuYWJsZWQgPSAhd29ya3NwYWNlRW5hYmxlZFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKHdvcmtzcGFjZUVuYWJsZWQgJiYgZGlzcG9zZVdvcmtzcGFjZSA9PT0gdW5kZWZpbmVkKSByZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgICAgICAgICAgIGVsc2UgaWYgKCF3b3Jrc3BhY2VFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgdW5yZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgICAgICAgICAgICAgLy8gXHU2NTM2XHU4RDc3XHU1M0YzXHU0RkE3XHU4RjY4XHU5MDUzXHVGRjFBXHU1NDI2XHU1MjE5XHU1Qjk4XHU2NUI5IERldGFpbHNQYW5lbCBcdTk4NzZcdTU2REVcdTY3NjVcdUZGMENcdTZCOEJcdTc1NTlcdTdBN0FcdTYwMDFcdTk3NjJcdTY3N0ZcbiAgICAgICAgICAgICAgICAvLyBcdUZGMDhcdTMwMENcdTcwQjlcdTUxRkJcdTZEODhcdTYwNkZcdTZENDFcdTRFMkRcdTc2ODRcdTVERTVcdTUxNzdcdTg4NENcdTY3RTVcdTc3MEJcdThCRTZcdTYwQzVcdTMwMERcdUZGMDlcdTMwMDJcbiAgICAgICAgICAgICAgICBsYXlvdXQ/LmNsb3NlRGV0YWlscz8uKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdbcHJvamVjdC1jb250cm9sXSB3b3Jrc3BhY2UgdG9nZ2xlIGZhaWxlZCcsIGVycm9yKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlyZVRvZ2dsZSh3b3Jrc3BhY2VFbmFibGVkKVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGVuYWJsZWQgPyAnXHVEODNFXHVEREVEIFx1NURFNVx1NEY1Q1x1NTNGMCBcdTI3MTMnIDogJ1x1RDgzRVx1RERFRCBcdTYyNTNcdTVGMDBcdTVERTVcdTRGNUNcdTUzRjAnLFxuICAgICAgKVxuICAgIH0pXG4gIH0pXG5cbiAgLy8gXHUyNTAwXHUyNTAwIDMuIFx1ODA0QVx1NTkyOVx1NURFNVx1NTE3N1x1NTM2MVx1NzI0N1x1RkYwOFx1NjI2N1x1ODg0Qy9cdThCQzRcdTVCQTEvXHU5QThDXHU2NTM2XHVGRjA5XHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gIGNvbnN0IHNpbXBsZVJlc3VsdENhcmQgPSAodGl0bGU6IHN0cmluZyk6ICgocHJvcHM6IGFueSkgPT4gYW55KSA9PiAocHJvcHM6IGFueSkgPT4ge1xuICAgIGNvbnN0IG91dHB1dCA9IHByb3BzPy5vdXRwdXRcbiAgICBjb25zdCB0ZXh0ID0gdHlwZW9mIG91dHB1dCA9PT0gJ3N0cmluZydcbiAgICAgID8gb3V0cHV0XG4gICAgICA6IG91dHB1dD8uc3VtbWFyeSA/PyBvdXRwdXQ/Lmlzc3VlcyA/PyBvdXRwdXQ/LmRldGFpbHMgPz8gKG91dHB1dCA/IEpTT04uc3RyaW5naWZ5KG91dHB1dCwgbnVsbCwgMikgOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHUyMDI2JylcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICdkaXYnLFxuICAgICAge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICBwYWRkaW5nOiAnMTBweCAxMnB4JyxcbiAgICAgICAgICBtYXJnaW46ICc0cHggMCcsXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXG4gICAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjYsXG4gICAgICAgICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyxcbiAgICAgICAgICBtYXhIZWlnaHQ6IDI2MCxcbiAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnNHB4JyB9IH0sIHRpdGxlKSxcbiAgICAgIFN0cmluZyh0ZXh0KSxcbiAgICApXG4gIH1cblxuICAvLyBcdTI1MDBcdTI1MDAgMy4gYW5hbHl6ZV9jaGFuZ2UgXHU0RTEzXHU1QzVFXHU1REU1XHU1MTc3XHU1MzYxXHU3MjQ3IFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICBjdHguc2xvdHMuaW5qZWN0KCd0b29sLmNhbGwudG9vbHZpZXcnLCAoKSA9PiB7XG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XG4gICAgICBuYW1lOiAndG9vbC5jYWxsLnRvb2x2aWV3JyxcbiAgICAgIGtleTogJ2FuYWx5emVfY2hhbmdlJyxcbiAgICB9LCAocHJvcHM6IGFueSkgPT4ge1xuICAgICAgaWYgKHByb3BzPy50b29sTmFtZSAhPT0gJ2FuYWx5emVfY2hhbmdlJykgcmV0dXJuIG51bGxcbiAgICAgIGNvbnN0IG91dHB1dCA9IHByb3BzPy5vdXRwdXRcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENoYW5nZUNhcmQsIHtcbiAgICAgICAgdGl0bGU6ICdcdTUzRDhcdTY2RjRcdTUyMDZcdTY3OTBcdTYyQTVcdTU0NEEgKENoYW5nZSBBbmFseXNpcyknLFxuICAgICAgICBmaWxlc0NoYW5nZWQ6IG91dHB1dD8uZmlsZXNDaGFuZ2VkID8/IDAsXG4gICAgICAgIGluc2VydGlvbnM6IG91dHB1dD8uaW5zZXJ0aW9ucyA/PyAwLFxuICAgICAgICBkZWxldGlvbnM6IG91dHB1dD8uZGVsZXRpb25zID8/IDAsXG4gICAgICAgIGV2aWRlbmNlSWQ6IG91dHB1dD8uZXZpZGVuY2VJZCxcbiAgICAgICAgc3RhdHVzOiBvdXRwdXQgPyAnY29tcGxldGVkJyA6ICdhbmFseXppbmcnLFxuICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG4gIGZvciAoY29uc3QgW3Rvb2xLZXksIHRpdGxlXSBvZiBbXG4gICAgWydzdGFydF9ydW4nLCAnXHVEODNEXHVERTgwIFx1NjI2N1x1ODg0QyBSdW4nXSxcbiAgICBbJ3J1bl9yZXZpZXcnLCAnXHVEODNEXHVERDBEIFx1NEVFM1x1NzgwMVx1OEJDNFx1NUJBMSddLFxuICAgIFsncnVuX3ZlcmlmaWNhdGlvbicsICdcdTI3MDUgXHU5QThDXHU2NTM2XHU5QThDXHU4QkMxJ10sXG4gIF0gYXMgY29uc3QpIHtcbiAgICBjdHguc2xvdHMuaW5qZWN0KCd0b29sLmNhbGwudG9vbHZpZXcnLCAoKSA9PiB7XG4gICAgICByZXR1cm4gY3R4LnNsb3RzLnJlZ2lzdGVyKHsgbmFtZTogJ3Rvb2wuY2FsbC50b29sdmlldycsIGtleTogdG9vbEtleSB9LCBzaW1wbGVSZXN1bHRDYXJkKHRpdGxlKSlcbiAgICB9KVxuICB9XG59XG4iLCAiLyoqXHJcbiAqIFJlYWN0IENvbXBvbmVudDogQ2hhbmdlIC8gSW5zaWdodCBDYXJkIGZvciBDaGF0IFZpZXcuXHJcbiAqIFJlbmRlcnMgc3RydWN0dXJlZCBpbnNpZ2h0cywgZGlmZiBzdGF0aXN0aWNzLCBhbmQgZXZpZGVuY2UgYmFkZ2VzLlxyXG4gKlxyXG4gKiBcdTk4OUNcdTgyNzJcdThENzAgZHN3LWFsaWFzIFx1NEUzQlx1OTg5OFx1NTNEOFx1OTFDRiArIHRoZW1lQXdhcmVUZXh0IFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYxQVxyXG4gKiBcdTZCNjRcdTUyNERcdTc1MjhcdTc2ODQgYC0tZHNoLSpgIFx1NTNEOFx1OTFDRlx1NTcyOFx1NUJCRlx1NEUzQlx1OTFDQ1x1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1NjgzN1x1NUYwRlx1NkMzOFx1OEZEQ1x1ODQzRFx1NTcyOFx1NkRGMVx1ODI3Mlx1NTE1Q1x1NUU5NVx1NEUwQVx1RkYwQ1xyXG4gKiBcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTRFMEJcdTgwNEFcdTU5MjlcdTZENDFcdTkxQ0NcdTUxRkFcdTczQjBcdTdBODFcdTUxNDBcdTlFRDFcdTUzNjFcdUZGMUJcdTY1NzBcdTVCNTdcdTdFRkYvXHU3RUEyXHU0RTVGXHU2NjJGXHU2REYxXHU4MjcyXHU1NDExXHU5MTREXHU4MjcyXHVGRjBDXHU3NjdEXHU1RTk1XHU0RTBEXHU1M0VGXHU4QkZCXHUzMDAyXHJcbiAqXHJcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9DaGFuZ2VDYXJkXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyB0aGVtZUF3YXJlVGV4dCB9IGZyb20gJy4vdGhlbWUudHMnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUNhcmRQcm9wcyB7XHJcbiAgdGl0bGU/OiBzdHJpbmdcclxuICBmaWxlc0NoYW5nZWQ/OiBudW1iZXJcclxuICBpbnNlcnRpb25zPzogbnVtYmVyXHJcbiAgZGVsZXRpb25zPzogbnVtYmVyXHJcbiAgZXZpZGVuY2VJZD86IHN0cmluZ1xyXG4gIHN0YXR1cz86IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ2hhbmdlQ2FyZDogUmVhY3QuRkM8Q2hhbmdlQ2FyZFByb3BzPiA9ICh7XHJcbiAgdGl0bGUgPSAnQ2hhbmdlIEluc2lnaHQnLFxyXG4gIGZpbGVzQ2hhbmdlZCA9IDAsXHJcbiAgaW5zZXJ0aW9ucyA9IDAsXHJcbiAgZGVsZXRpb25zID0gMCxcclxuICBldmlkZW5jZUlkLFxyXG4gIHN0YXR1cyA9ICdhbmFseXplZCcsXHJcbn0pID0+IHtcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICdkaXYnLFxyXG4gICAge1xyXG4gICAgICAnZGF0YS10ZXN0aWQnOiAncHJvamVjdC1jb250cm9sLWNoYW5nZS1jYXJkJyxcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgcGFkZGluZzogJzEwcHggMTRweCcsXHJcbiAgICAgICAgbWFyZ2luOiAnNnB4IDAnLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXHJcbiAgICAgICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgICAgIGZvbnRTaXplOiAnMTNweCcsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgJ2RpdicsXHJcbiAgICAgIHtcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBudWxsLCBgXHVEODNEXHVERDBEICR7dGl0bGV9YCksXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgJ3NwYW4nLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHggNnB4JyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJnLWluc2V0LCByZ2JhKDUsNSw1LDAuMDYpKScsXHJcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgKSxcclxuICAgICksXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEycHgnLCBmb250U2l6ZTogJzEycHgnLCBvcGFjaXR5OiAwLjkgfSB9LFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgbnVsbCwgYFx1RDgzRFx1RENDMSAke2ZpbGVzQ2hhbmdlZH0gZmlsZXNgKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjMWE3ZjM3JykgfSB9LCBgKyR7aW5zZXJ0aW9uc31gKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2YyMjJlJykgfSB9LCBgLSR7ZGVsZXRpb25zfWApLFxyXG4gICAgICBldmlkZW5jZUlkXHJcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgICAnc3BhbicsXHJcbiAgICAgICAgICAgIHsgc3R5bGU6IHsgb3BhY2l0eTogMC43LCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyB9IH0sXHJcbiAgICAgICAgICAgIGBbJHtldmlkZW5jZUlkfV1gLFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIDogbnVsbCxcclxuICAgICksXHJcbiAgKVxyXG59XHJcbiIsICIvKipcbiAqIFx1NUJBMlx1NjIzN1x1N0FFRlx1NEUzQlx1OTg5OFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYwOFx1NkRGMVx1NkQ0NVx1NTNDQ1x1NEUzQlx1OTg5OFx1NTE3MVx1NzUyOFx1NzY4NFx1NTUyRlx1NEUwMFx1NUI5RVx1NzNCMFx1RkYwOVx1MzAwMlxuICpcbiAqIFx1NEUwRFx1NTNEOFx1NUYwRlx1RkYwODIwMjYtMDktMTAgXHU2REYxXHU4MjcyXHU2QTIxXHU1RjBGXHUzMDBDXHU5ODc1XHU3QjdFXHU3NjdEXHU1NzU3XHUzMDBEXHU0RThCXHU2NTQ1XHU1NDBFXHU1NkZBXHU1MzE2XHVGRjBDXHU1MTY4XHU1QkEyXHU2MjM3XHU3QUVGXHU1RkM1XHU5ODdCXHU5MDc1XHU1Qjg4XHVGRjA5XHVGRjFBXG4gKiAxLiBcdTk2OEZcdTRFM0JcdTk4OThcdTUzRDhcdTUzMTZcdTc2ODRcdTVGM0FcdThDMDNcdTgyNzJcdTY1ODdcdTVCNTdcdTVGQzVcdTk4N0JcdTdFQ0YgdGhlbWVBd2FyZVRleHQoKVx1RkYxQVx1NkQ0NVx1ODI3Mlx1NEUzQlx1OTg5OFx1ODFFQVx1NTJBOFx1NkRGMVx1NTMxNlx1NTIzMFx1NzY3RFx1NUU5NVxuICogICAgXHU1QkY5XHU2QkQ0XHU1RUE2IFx1MjI2NTQuNToxXHVGRjBDXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU4MUVBXHU1MkE4XHU2M0QwXHU0RUFFXHU1MjMwXHU2REYxXHU1RTk1IFx1MjI2NTQuNToxXHUzMDAyXHU5ODdCXHU1NzI4XHU2RTMyXHU2N0QzXHU2NzFGXHU4QzAzXHU3NTI4XHVGRjA4XHU3RUM0XHU0RUY2XHU0RjUzXHU1MTg1L1xuICogICAgXHU2RTMyXHU2N0QzXHU1MUZEXHU2NTcwXHU1MTg1XHVGRjA5XHVGRjBDXHU0RTNCXHU5ODk4XHU1MjA3XHU2MzYyXHU1NDBFXHU5NjhGXHU5MUNEXHU2RTMyXHU2N0QzXHU4MUVBXHU1MkE4XHU2NkY0XHU2NUIwXHVGRjFCXHU3OTgxXHU2QjYyXHU1NzI4XHU2QTIxXHU1NzU3XHU1MkEwXHU4RjdEXHU2NzFGXHU2QzQyXHU1MDNDXHU1NDBFXHU1QjU4XHU4RkRCXG4gKiAgICBcdTk3NTlcdTYwMDFcdTY4MzdcdTVGMEZcdTVCRjlcdThDNjFcdTMwMDJcbiAqIDIuIGFjdGl2ZSBcdTlBRDhcdTRFQUVcdTgwQ0NcdTY2NkZcdUZGMDhcdTYzMDlcdTk0QUUgLyBcdTk4NzVcdTdCN0UgLyBcdTdCNUJcdTkwMDlcdTgyQUZcdTcyNDdcdTdCNDlcdTRFMDBcdTUyMDdcIlx1OTAwOVx1NEUyRFx1NTM3M1x1NTg2Qlx1ODI3MlwiXHU3Njg0XHU4ODY4XHU5NzYyXHVGRjA5XHU0RTAwXHU1RjhCXHU3NTI4XG4gKiAgICBgdmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpYFx1RkYwOFx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1NEUwQlx1OTBGRFx1NjYyRlx1ODRERFx1ODI3Mlx1RkYwOVx1RkYwQ1x1OTE0RFx1NzY3RFx1NUI1N1x1MzAwMlxuICogICAgXHU3OTgxXHU2QjYyXHU3NTI4IC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnkgXHU0RjVDXHU4MENDXHU2NjZGXHUyMDE0XHUyMDE0XHU1QjgzXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RjFBXHU4OEFCXG4gKiAgICBcdTVCOENcdTUxNjhcdTU0MUVcdTYzODlcdUZGMDhcdTY3MkNcdTZCMjFcdTRFOEJcdTY1NDVcdTY4MzlcdTU2RTBcdUZGMDlcdTMwMDJcbiAqIDMuIFx1NjVFMFx1NkNENVx1ODlFM1x1Njc5MFx1NzY4NFx1OTg5Q1x1ODI3Mlx1RkYwOENTUyBcdTUzRDhcdTkxQ0ZcdTdCNDlcdUZGMDlcdTUzOUZcdTY4MzdcdThGRDRcdTU2REVcdUZGMUFcdTUzRDhcdTkxQ0ZcdTgyNzJcdTRFQTRcdTc1MzFcdTVCQkZcdTRFM0JcdTRFM0JcdTk4OThcdTdDRkJcdTdFREZcdTRGRERcdThCQzFcdTUzRUZcdThCRkJcdUZGMENcbiAqICAgIFx1NEY0Nlx1NzUzMVx1NkI2NFx1NUI4M1x1NEVFQ1x1NEUwRFx1NUY5N1x1NEUwRVx1Nzg2Q1x1N0YxNlx1NzgwMVx1NTI0RFx1NjY2Rlx1ODI3Mlx1NTNFMFx1NTJBMFx1NEY3Rlx1NzUyOFx1MzAwMlxuICovXG5cbi8qKiBcdTg5RTNcdTY3OTAgI3JyZ2diYiBcdTYyMTYgcmdiKCkvcmdiYSgpIFx1OTg5Q1x1ODI3Mlx1NTI0RFx1NEUwOVx1NEUyQVx1NTIwNlx1OTFDRlx1NEUzQSBbciwgZywgYl1cdUZGMUJcdTY1RTBcdTZDRDVcdTg5RTNcdTY3OTBcdThGRDRcdTU2REUgbnVsbFx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29sb3IoY29sb3I6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IG51bGwge1xuICBjb25zdCBoZXggPSAvXiMoWzAtOWEtZl17Nn0pJC9pLmV4ZWMoY29sb3IpXG4gIGlmIChoZXggIT09IG51bGwpIHtcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlci5wYXJzZUludChoZXhbMV0hLCAxNilcbiAgICByZXR1cm4gWyh2YWx1ZSA+PiAxNikgJiAyNTUsICh2YWx1ZSA+PiA4KSAmIDI1NSwgdmFsdWUgJiAyNTVdXG4gIH1cbiAgY29uc3QgZnVuY3Rpb25hbCA9IC9ecmdiYT9cXChcXHMqKFxcZHsxLDN9KVssXFxzXSsoXFxkezEsM30pWyxcXHNdKyhcXGR7MSwzfSkvaS5leGVjKGNvbG9yKVxuICBpZiAoZnVuY3Rpb25hbCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBbTnVtYmVyKGZ1bmN0aW9uYWxbMV0pLCBOdW1iZXIoZnVuY3Rpb25hbFsyXSksIE51bWJlcihmdW5jdGlvbmFsWzNdKV1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG4vKiogV0NBRyBcdTc2RjhcdTVCRjlcdTRFQUVcdTVFQTZcdUZGMDgwPVx1OUVEMVx1RkYwQzE9XHU3NjdEXHVGRjA5XHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gcmVsYXRpdmVMdW1pbmFuY2UocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IGNoYW5uZWwgPSAodmFsdWU6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdiA9IHZhbHVlIC8gMjU1XG4gICAgcmV0dXJuIHYgPD0gMC4wMzkyOCA/IHYgLyAxMi45MiA6ICgodiArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjRcbiAgfVxuICByZXR1cm4gMC4yMTI2ICogY2hhbm5lbChyKSArIDAuNzE1MiAqIGNoYW5uZWwoZykgKyAwLjA3MjIgKiBjaGFubmVsKGIpXG59XG5cbi8qKiBcdTZERjFcdTUzMTZcdTk4OUNcdTgyNzJcdTc2RjRcdTUyMzBcdTc2N0RcdTVFOTVcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgIzFmMjMyOCBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA+IDAuMTgzOyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4MWYgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHgyMyAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHgyOCAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqIFx1NjNEMFx1NEVBRVx1OTg5Q1x1ODI3Mlx1NzZGNFx1NTIzMFx1NkRGMVx1NUU5NVx1RkYwOCMxNTE1MTdcdUZGMDlcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgI2YwZjZmYyBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpZ2h0ZW5Gb3JEYXJrQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA8IDAuMjE0OyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4ZjAgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHhmNiAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHhmYyAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqXG4gKiBcdTRFM0JcdTk4OThcdTgxRUFcdTkwMDJcdTVFOTRcdTY1ODdcdTVCNTdcdTgyNzJcdUZGMUFcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTZERjFcdTUzMTZcdTUyMzBcdTc2N0RcdTVFOTUgXHUyMjY1NC41OjFcdUZGMUJcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTYzRDBcdTRFQUVcdTUyMzBcdTZERjFcdTVFOTUgXHUyMjY1NC41OjFcbiAqIFx1RkYwOFx1NkRGMVx1ODI3Mlx1NUI1N1x1NTk4MiAjNTc2MDZhIFx1NzZGNFx1NjNBNVx1NjUzRVx1NkRGMVx1NUU5NVx1NTQwQ1x1NjgzN1x1NEUwRFx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlx1NjI0MFx1NjcwOVx1NUYzQVx1OEMwM1x1ODI3Mlx1NjU4N1x1NjcyQ1x1N0VERlx1NEUwMFx1OEQ3MFx1OEZEOVx1OTFDQ1x1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhlbWVBd2FyZVRleHQoY29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJnYiA9IHBhcnNlQ29sb3IoY29sb3IpXG4gIGlmIChyZ2IgPT09IG51bGwpIHJldHVybiBjb2xvclxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5ib2R5Py5oYXNBdHRyaWJ1dGU/LignZGF0YS1kcy1kYXJrLXRoZW1lJykgPT09IHRydWUpIHtcbiAgICByZXR1cm4gbGlnaHRlbkZvckRhcmtCYWNrZ3JvdW5kKHJnYlswXSwgcmdiWzFdLCByZ2JbMl0pXG4gIH1cbiAgcmV0dXJuIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyZ2JbMF0sIHJnYlsxXSwgcmdiWzJdKVxufVxuIiwgIi8qKlxuICogUHJvamVjdCBDb250cm9sIFx1NURFNVx1NEY1Q1x1NTNGMFx1RkYwOFdvcmtzcGFjZUZyYW1lXHVGRjA5djJcdUZGMUFcdTU2RjRcdTdFRDVcIlx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVwiXHU3RUM0XHU3RUM3XHUzMDAyXG4gKlxuICogXHU1NkRCXHU0RTJBXHU5ODc1XHU3QjdFXHVGRjFBXG4gKiAxLiBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdUZGMDhcdTlFRDhcdThCQTRcdUZGMDlcdUZGMUFcdTRFRDNcdTVFOTNcdTY4MEZcdUZGMDhcdTU5MUFcdTRFRDNcdTVFOTNcdTUyMDdcdTYzNjJcdUZGMDkrIFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1RkYwOFx1NTQyQlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOStcbiAqICAgIFx1OEJFNlx1NjBDNVx1OTc2Mlx1Njc3Rlx1RkYwOEFJIFx1ODlFM1x1OEJGQlx1RkYxQVx1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OC9cdTVCOUVcdTczQjBcdTkwM0JcdThGOTEvXHU5OENFXHU5NjY5XHVGRjFCXHU0RTA5XHU3RUE3XHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0IFNWRyBcdTU2RkVcdUZGMUJcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdUZGMDlcdTMwMDJcbiAqIDIuIFx1OTg3OVx1NzZFRVx1NjAzQlx1ODlDOFx1RkYxQVx1OTg3OVx1NzZFRVx1Njg2M1x1Njg0OCArIFx1NUZFQlx1NjM3N1x1NjRDRFx1NEY1QyArIFx1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1RiArIFx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1MzAwMlxuICogMy4gXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHVGRjFBUnVuIFx1OEZEQlx1NUVBNlx1NEUwRVx1NjIxMFx1NjcyQ1x1MzAwMlxuICogNC4gXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHVGRjFBXHU2ODM4XHU2N0U1XHU3QjE0XHU4QkIwXHVGRjA4XHU1M0VGXHU1MTczXHU4MDU0XHU2M0QwXHU0RUE0XHVGRjA5KyBcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdUZGMDhcdTRFQkFcdTVERTVcdTc4NkVcdThCQTRcdUZGMDkrIFx1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNSArIFJldmlldy9cdTlBOENcdTY1MzZcdThCQjBcdTVGNTVcdTMwMDJcbiAqXG4gKiBcdTVFMDNcdTVDNDBcdTY3M0FcdTUyMzZcdTRFMERcdTUzRDhcdUZGMUFcdTkwNkVcdTg1M0RcdTVCOThcdTY1QjkgZGV0YWlscyBcdTY5RkQgKyBcdTZDRThcdTUxNjVcdTY4MzdcdTVGMEZcdTYzNjJcdTUyMTdcdUZGMDhcdTgwNEFcdTU5MjlcdTY3MDBcdTUzRjNcdUZGMDkrIFx1NTIwNlx1OTY5NFx1Njc2MVx1NjJENlx1NjJGRFx1OEJCMFx1NUZDNlx1RkYxQlxuICogXHU3RURGXHU4QkExXHU4ODRDXHU0RTI0XHU4ODRDXHU5NEIzXHU1MjM2XHU3NTMxXHU4RkQwXHU4ODRDXHU2NUY2XHU2MzA5XHU2Nzg0XHU1RUZBXHU1NEM4XHU1RTBDXHU3Q0JFXHU1MUM2XHU2Q0U4XHU1MTY1XHVGRjA4YXBwbHlTdGF0c0xpbmVDbGFtcFx1RkYwOVx1MzAwMlxuICpcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9Xb3Jrc3BhY2VGcmFtZVxuICovXG5cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHBhcnNlQ29sb3IsIHRoZW1lQXdhcmVUZXh0IH0gZnJvbSAnLi90aGVtZS50cydcbmltcG9ydCB7IGNsdXN0ZXJJbnRvUm91bmRzIH0gZnJvbSAnLi9jb21taXQtcm91bmRzLnRzJ1xuXG4vKiogXHU1QkJGXHU0RTNCIC9zdGF0ZSBcdThGRDRcdTU2REVcdTc2ODRcdTVGRUJcdTcxNjdcdTVGNjJcdTcyQjZcdUZGMDhcdTRFMEUgYXBpLXJvdXRlLnRzIGJ1aWxkU3RhdGUgXHU1QkY5XHU5RjUwXHVGRjA5XHUzMDAyICovXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZVN0YXRlIHtcbiAgcmVhZHk/OiBib29sZWFuXG4gIHJlYXNvbj86IHN0cmluZ1xuICBwbHVnaW5WZXJzaW9uPzogc3RyaW5nXG4gIHByb2plY3Q/OiB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgcm9vdFBhdGg6IHN0cmluZzsgY3JlYXRlZEF0OiBudW1iZXIgfSB8IG51bGxcbiAgY2hhbmdlcz86IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZzsgc291cmNlOiBzdHJpbmc7IHVwZGF0ZWRBdDogbnVtYmVyIH0+XG4gIHJ1bnM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBzdGFydGVkQXQ6IG51bWJlciB8IG51bGw7IGZpbmlzaGVkQXQ6IG51bWJlciB8IG51bGw7IGNvc3RVc2Q/OiBudW1iZXI7IHN0ZXBzVG90YWw/OiBudW1iZXI7IHN0ZXBzRG9uZT86IG51bWJlcjsgY3VycmVudFN0ZXA/OiBzdHJpbmcgfCBudWxsIH0+XG4gIGF0dGVtcHRzQ291bnQ/OiBudW1iZXJcbiAgbWVtb3JpZXM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHByb2plY3RJZDogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRydXRoTGV2ZWw6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29udGVudD86IHN0cmluZzsgaXNIdW1hbkNvbmZpcm1lZDogYm9vbGVhbjsgZ2l0QnJhbmNoOiBzdHJpbmcgfCBudWxsOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxuICBldmlkZW5jZUNvdW50PzogbnVtYmVyXG4gIHJlY2VudEV2aWRlbmNlPzogQXJyYXk8eyBpZDogc3RyaW5nOyBzb3VyY2U6IHN0cmluZzsgdHJ1dGhMZXZlbDogc3RyaW5nOyBsb2NhdG9yOiBzdHJpbmc7IHNuaXBwZXQ6IHN0cmluZzsgY3JlYXRlZEF0OiBudW1iZXIgfT5cbiAgcmVzb2x2ZWRJc3N1ZVJldGVudGlvbkRheXM/OiBudW1iZXJcbiAgaW1wb3J0ZWRDaGFuZ2VzPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb21taXRDb3VudDogbnVtYmVyOyBmaXJzdENvbW1pdEF0OiBudW1iZXI7IGxhc3RDb21taXRBdDogbnVtYmVyOyBjb25maWRlbmNlOiBudW1iZXI7IHN0YXR1czogc3RyaW5nIH0+XG4gIGlzc3Vlcz86IEFycmF5PHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgc2V2ZXJpdHk6IHN0cmluZzsgY2F0ZWdvcnk6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmcgfT5cbiAgdmVyaWZpY2F0aW9ucz86IEFycmF5PHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxuICBib290c3RyYXA/OiB7IGlkOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgdGVjaFN0YWNrOiBzdHJpbmdbXTsgbWFuaWZlc3RGaWxlczogc3RyaW5nW107IHN5bWJvbHNDb3VudDogbnVtYmVyOyBjcmVhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxuICBjb25maXJtZWQ/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgdGV4dDogc3RyaW5nOyBmb3JiaWRkZW5QYXRoczogc3RyaW5nW10gfT5cbiAgY29uY2VwdHM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY2F0ZWdvcnk6IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZzsgb2NjdXJyZW5jZXM6IG51bWJlciB9PlxufVxuXG4vKiogR0VUIC9jb21taXRzIFx1NzY4NFx1NjNEMFx1NEVBNFx1Njc2MVx1NzZFRVx1MzAwMiAqL1xuaW50ZXJmYWNlIENvbW1pdEVudHJ5IHtcbiAgc2hhOiBzdHJpbmdcbiAgc2hvcnRIYXNoOiBzdHJpbmdcbiAgYXV0aG9yOiBzdHJpbmdcbiAgZGF0ZTogbnVtYmVyXG4gIHN1YmplY3Q6IHN0cmluZ1xuICBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IGFkZHM6IG51bWJlcjsgZGVsczogbnVtYmVyIH0+XG59XG5cbmludGVyZmFjZSBDb21taXRzUGF5bG9hZCB7XG4gIHJvb3RQYXRoOiBzdHJpbmdcbiAgYnJhbmNoOiBzdHJpbmcgfCBudWxsXG4gIGhlYWRTaGE6IHN0cmluZyB8IG51bGxcbiAgd29ya2luZzogeyBmaWxlQ291bnQ6IG51bWJlcjsgaXNDbGVhbjogYm9vbGVhbjsgZmlsZXM6IEFycmF5PHsgcGF0aDogc3RyaW5nOyBzdGF0dXM6IHN0cmluZyB9PiB9XG4gIGNvbW1pdHM6IENvbW1pdEVudHJ5W11cbn1cblxuaW50ZXJmYWNlIENvbW1pdERldGFpbFBheWxvYWQge1xuICBzaGE6IHN0cmluZ1xuICBpc1dvcmtpbmc6IGJvb2xlYW5cbiAgZmlsZXM6IEFycmF5PHsgcGF0aDogc3RyaW5nOyBhZGRzOiBudW1iZXI7IGRlbHM6IG51bWJlciB9PlxuICBpbnNlcnRpb25zOiBudW1iZXJcbiAgZGVsZXRpb25zOiBudW1iZXJcbiAgcGF0Y2hUcnVuY2F0ZWQ6IGJvb2xlYW5cbiAgcGF0Y2g6IHN0cmluZ1xuICBjb21taXQ6IHsgbWVzc2FnZTogc3RyaW5nOyBhdXRob3I6IHN0cmluZzsgZGF0ZTogbnVtYmVyIH0gfCBudWxsXG4gIGFuYWx5c2lzOiB7IHdoYXQ6IHN0cmluZzsgbG9naWM6IHN0cmluZ1tdOyByaXNrczogc3RyaW5nW10gfVxuICBhbmFseXNpc0NhY2hlZD86IGJvb2xlYW5cbiAgYW5hbHlzaXNHZW5lcmF0ZWRBdD86IG51bWJlciB8IG51bGxcbiAgLyoqIFx1NjcyQ1x1NkIyMVx1ODlFM1x1OEJGQlx1NzY4NCBMTE0gXHU2MjEwXHU2NzJDXHVGRjA4XHU0RjMwXHVGRjBDVVNEXHVGRjA5XHVGRjFCXHU3RjEzXHU1QjU4XHU2NzJBXHU1RTI2XHU2MjEwXHU2NzJDL1x1NjcyQVx1NEVBN1x1NzUxRlx1OEMwM1x1NzUyOFx1NjVGNlx1N0YzQVx1NzcwMVx1MzAwMiAqL1xuICBhbmFseXNpc0Nvc3RVc2Q/OiBudW1iZXJcbiAgYW5hbHlzaXNUb2tlbnM/OiB7IGlucHV0OiBudW1iZXI7IG91dHB1dDogbnVtYmVyOyB0b3RhbDogbnVtYmVyIH1cbn1cblxuaW50ZXJmYWNlIEltcGFjdFNjb3BlUGF5bG9hZCB7XG4gIGNoYW5nZWRGaWxlczogc3RyaW5nW11cbiAgc2hhcz86IHN0cmluZ1tdXG4gIHJpc2tMZXZlbDogJ2xvdycgfCAnbWVkaXVtJyB8ICdoaWdoJyB8ICdjcml0aWNhbCdcbiAgcmlza1Njb3JlOiBudW1iZXJcbiAgcmlza0ZhY3RvcnM/OiBBcnJheTx7IHRleHQ6IHN0cmluZzsgcG9pbnRzOiBudW1iZXIgfT5cbiAga2V5Q2hhbmdlUG9pbnRzPzogc3RyaW5nW11cbiAgbWVtb3JpZXM/OiBBcnJheTx7IHRpdGxlOiBzdHJpbmc7IHR5cGU6IHN0cmluZyB9PlxuICBmdW5jdGlvbkltcGFjdD86IEFycmF5PHtcbiAgICBzeW1ib2w6IHN0cmluZ1xuICAgIGRlZmluZWRJbjogc3RyaW5nXG4gICAgcm9sZT86IHN0cmluZ1xuICAgIGNoYW5nZT86IHN0cmluZ1xuICAgIGltcGFjdD86IHN0cmluZ1xuICAgIGNhbGxlcnM6IEFycmF5PHsgZmlsZTogc3RyaW5nOyBsaW5lOiBzdHJpbmc7IHNuaXBwZXQ6IHN0cmluZyB9PlxuICB9PlxuICBsZXZlbHM6IEFycmF5PHsgbGV2ZWw6IHN0cmluZzsgZGVwdGg6IG51bWJlcjsgcGF0aDogc3RyaW5nOyBjb25maWRlbmNlOiBudW1iZXI7IHJlYXNvbjogc3RyaW5nIH0+XG4gIGRpcmVjdDogc3RyaW5nW11cbiAgZXhwbGFuYXRpb25zQ2FjaGVkPzogYm9vbGVhblxuICBnZW5lcmF0ZWRBdD86IG51bWJlciB8IG51bGxcbiAgLyoqIFx1NTFGRFx1NjU3MFx1N0VBN1x1OEJGNFx1NjYwRVx1OTBBM1x1NkIyMSBMTE0gXHU4QzAzXHU3NTI4XHU3Njg0XHU2MjEwXHU2NzJDXHVGRjA4XHU0RjMwXHVGRjBDVVNEXHVGRjA5XHUzMDAyICovXG4gIGV4cGxhbmF0aW9uc0Nvc3RVc2Q/OiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXZpZXdQYXlsb2FkIHtcbiAgaXNzdWVzRm91bmQ6IG51bWJlclxuICBpc3N1ZXM6IHN0cmluZ1xuICB2ZXJkaWN0OiBzdHJpbmdcbiAgY2FjaGVkPzogYm9vbGVhblxuICBnZW5lcmF0ZWRBdD86IG51bWJlciB8IG51bGxcbiAgY29zdFVzZD86IG51bWJlclxuICBpc3N1ZUxpc3Q/OiBBcnJheTx7IHNldmVyaXR5OiBzdHJpbmc7IGNhdGVnb3J5OiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGV2aWRlbmNlOiBzdHJpbmc7IGZpeDogc3RyaW5nIH0+XG59XG5cbmludGVyZmFjZSBOb3RlRW50cnkge1xuICBpZDogc3RyaW5nXG4gIHByb2plY3RJZDogc3RyaW5nXG4gIHNoYT86IHN0cmluZ1xuICB0aXRsZTogc3RyaW5nXG4gIGNvbnRlbnQ6IHN0cmluZ1xuICB0YWdzPzogc3RyaW5nW11cbiAgcGlubmVkPzogYm9vbGVhblxuICBjcmVhdGVkQXQ6IG51bWJlclxuICB1cGRhdGVkQXQ/OiBudW1iZXJcbn1cblxuLyoqIEdFVCAvaXNzdWVzIFx1NzY4NFx1OEJDNFx1NUJBMVx1OTVFRVx1OTg5OFx1Njc2MVx1NzZFRVx1RkYwOFJldmlldyBcdTk1RUVcdTk4OThcdTk4NzVcdTdCN0VcdTY1NzBcdTYzNkVcdTZFOTBcdUZGMDlcdTMwMDIgKi9cbmludGVyZmFjZSBJc3N1ZUVudHJ5IHtcbiAgaWQ6IHN0cmluZ1xuICBjaGFuZ2VJZDogc3RyaW5nXG4gIHNldmVyaXR5OiBzdHJpbmdcbiAgY2F0ZWdvcnk6IHN0cmluZ1xuICB0aXRsZTogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgc3RhdHVzOiBzdHJpbmdcbiAgcmVzb2x1dGlvbjogc3RyaW5nXG4gIGZpeFN0YXRzOiB7IGZpbGVzOiBudW1iZXI7IGluc2VydGlvbnM6IG51bWJlcjsgZGVsZXRpb25zOiBudW1iZXIgfSB8IG51bGxcbiAgZml4RmlsZXM6IHN0cmluZ1tdXG4gIGZpeEltcGFjdDogQXJyYXk8eyBzeW1ib2w6IHN0cmluZzsgZGVmaW5lZEluOiBzdHJpbmc7IGNhbGxlcnM6IEFycmF5PHsgZmlsZTogc3RyaW5nOyBsaW5lOiBzdHJpbmc7IHNuaXBwZXQ6IHN0cmluZyB9PiB9PlxuICBmaXhEaWZmOiBzdHJpbmdcbiAgY3JlYXRlZEF0OiBudW1iZXJcbiAgdXBkYXRlZEF0OiBudW1iZXJcbn1cblxuLyoqIFx1NEZFRVx1NTkwRFx1NURFRVx1NUYwMlx1NzY4NFx1ODg0Q1x1N0VBN1x1Nzc0MFx1ODI3Mlx1NkUzMlx1NjdEM1x1RkYxQSsgXHU3RUZGXHUzMDAxLSBcdTdFQTJcdTMwMDFcdTY1ODdcdTRFRjZcdTU5MzRcdTUyQTBcdTdDOTdcdTMwMDFcdTUxNzZcdTRGNTlcdTVGMzFcdTUzMTZcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlbmRlckRpZmZMaW5lcyhkaWZmOiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XG4gIGlmICh0eXBlb2YgZGlmZiAhPT0gJ3N0cmluZycgfHwgZGlmZiA9PT0gJycpIHJldHVybiBbXVxuICByZXR1cm4gZGlmZi5zcGxpdCgnXFxuJykuc2xpY2UoMCwgNDAwKS5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgY29uc3Qgc3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XG4gICAgICBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJyxcbiAgICAgIGZvbnRTaXplOiAnMTFweCcsIGxpbmVIZWlnaHQ6IDEuNiwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyxcbiAgICB9XG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnKysrJykgfHwgbGluZS5zdGFydHNXaXRoKCctLS0nKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJ2RpZmYgLS1naXQnKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJ0BAJykpIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJ1xuICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKCcrJykpIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gdGhlbWVBd2FyZVRleHQoJyMxYTdmMzcnKVxuICAgICAgc3R5bGUuYmFja2dyb3VuZCA9ICdyZ2JhKDQ2LDE2MCw2NywwLjA4KSdcbiAgICB9IGVsc2UgaWYgKGxpbmUuc3RhcnRzV2l0aCgnLScpKSB7XG4gICAgICBzdHlsZS5jb2xvciA9IHRoZW1lQXdhcmVUZXh0KCcjZDEyNDJmJylcbiAgICAgIHN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgyMDksMzYsNDcsMC4wOCknXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJ1xuICAgIH1cbiAgICByZXR1cm4gPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17c3R5bGV9PntsaW5lID09PSAnJyA/ICdcXHUwMEEwJyA6IGxpbmV9PC9kaXY+XG4gIH0pXG59XG5cbi8qKiBcdThCQTFcdTUyMTJcdTc4NkVcdThCQTRcdTk4NzVcdTc2ODRcdTUzRUZcdTdGMTZcdThGOTFcdTZCNjVcdTlBQTRcdUZGMDgvcnVucy9zdGFydCBcdThGRDRcdTU2REVcdUZGMDlcdTMwMDIgKi9cbmludGVyZmFjZSBQbGFuQ29uZmlybVN0ZXAge1xuICBpZDogc3RyaW5nXG4gIHRpdGxlOiBzdHJpbmdcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xuICB0YXJnZXRGaWxlczogc3RyaW5nW11cbiAgcm9sZTogc3RyaW5nXG4gIGFjY2VwdGFuY2U6IHN0cmluZ1xuICBmYWlsdXJlUG9saWN5OiBzdHJpbmdcbiAgZW5hYmxlZDogYm9vbGVhblxuICBtb2RlbFByb3ZpZGVyOiBzdHJpbmdcbiAgbW9kZWxJZDogc3RyaW5nXG59XG5cbi8qKiBQT1NUIC9wZWVrIFx1NzY4NFx1OEY3RFx1ODM3N1x1RkYwOFx1NEVFM1x1NzgwMVx1NEUwQVx1NEUwQlx1NjU4N1x1NkQ2RVx1NUM0Mlx1RkYwOVx1MzAwMiAqL1xuaW50ZXJmYWNlIFBlZWtQYXlsb2FkIHtcbiAgZXhpc3RzOiBib29sZWFuXG4gIHBhdGg/OiBzdHJpbmdcbiAgc3RhcnRMaW5lPzogbnVtYmVyXG4gIGVuZExpbmU/OiBudW1iZXJcbiAgdG90YWxMaW5lcz86IG51bWJlclxuICBsaW5lcz86IEFycmF5PHsgbjogbnVtYmVyOyB0ZXh0OiBzdHJpbmcgfT5cbn1cblxuLyoqIFx1NEVDRVx1ODFFQVx1NzUzMVx1NjU4N1x1NjcyQ1x1NEUyRFx1OEJDNlx1NTIyQiBmaWxlOmxpbmUgXHU1RjE1XHU3NTI4XHVGRjA4XHU1NDJCIGZpbGU6bGluZS1saW5lIFx1NTMzQVx1OTVGNFx1NTNENlx1OEQ3N1x1NTlDQlx1ODg0Q1x1RkYwOVx1MzAwMiAqL1xuY29uc3QgRklMRV9MSU5FX1BBVFRFUk4gPSAvKCg/OltcXHcuLV0rWy9cXFxcXSkqW1xcdy4tXStcXC5bQS1aYS16XXsxLDR9KTooXFxkezEsNX0pKD86LVxcZHsxLDV9KT8vZ1xuXG4vKiogR0VUIC9ydW5zL2RldGFpbCBcdTc2ODRcdThGN0RcdTgzNzdcdTMwMDIgKi9cbmludGVyZmFjZSBSdW5EZXRhaWwge1xuICBydW46IHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgY2hhbmdlVGl0bGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IHBhdXNlUG9pbnQ6IHsgc3RlcElkOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nOyBhdDogbnVtYmVyIH0gfCBudWxsOyBlcnJvcjogeyBtZXNzYWdlOiBzdHJpbmcgfSB8IG51bGw7IHN0YXJ0ZWRBdDogbnVtYmVyIHwgbnVsbDsgZmluaXNoZWRBdDogbnVtYmVyIHwgbnVsbCB9XG4gIHN0ZXBzOiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHJvbGU6IHN0cmluZzsgbW9kZWw6IHN0cmluZyB8IG51bGw7IHN0YXR1czogc3RyaW5nOyBhdHRlbXB0c0NvdW50OiBudW1iZXI7IGNsYWltZWRPdXRjb21lOiBzdHJpbmcgfCBudWxsOyB2ZXJpZmllZDogYm9vbGVhbjsgY29zdFVzZDogbnVtYmVyIH0+XG4gIGNvbnRleHQ6IHtcbiAgICBwcm9qZWN0RGlnZXN0OiBzdHJpbmc7IGJyYW5jaDogc3RyaW5nIHwgbnVsbDsgaGVhZFNoYTogc3RyaW5nIHwgbnVsbFxuICAgIGluamVjdGVkTWVtb3JpZXM6IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZyB9PlxuICAgIHN0ZXBTdW1tYXJpZXM6IEFycmF5PHsgc3RlcFRpdGxlOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgY2hhbmdlZEZpbGVzOiBzdHJpbmdbXTsgYXQ6IG51bWJlciB9PlxuICAgIGRlY2lzaW9uTG9nOiBBcnJheTx7IGtpbmQ6IHN0cmluZzsgZGV0YWlsOiBzdHJpbmc7IGF0OiBudW1iZXIgfT5cbiAgfSB8IG51bGxcbn1cblxuLyoqIEdFVCAvc2NoZWR1bGVkIFx1NzY4NFx1NEVGQlx1NTJBMVx1Njc2MVx1NzZFRVx1MzAwMiAqL1xuaW50ZXJmYWNlIFNjaGVkdWxlZFRhc2tFbnRyeSB7XG4gIGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nXG4gIGludGVydmFsTWludXRlczogbnVtYmVyOyBlbmFibGVkOiBib29sZWFuOyBsYXN0UnVuQXQ6IG51bWJlciB8IG51bGw7IGxhc3RSZXN1bHQ6IHN0cmluZzsgbmV4dER1ZUF0OiBudW1iZXJcbn1cblxuLyoqIEdFVCAvbWVtb3JpZXMgXHU3Njg0XHU4QkIwXHU1RkM2XHU2NzYxXHU3NkVFXHVGRjA4XHU4QkIwXHU1RkM2XHU5NzYyXHU2NzdGXHU2NTcwXHU2MzZFXHU2RTkwXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgTWVtb3J5RW50cnkge1xuICBpZDogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZzsgcmVsYXRlZEZpbGVzOiBzdHJpbmdbXVxuICBpc0h1bWFuQ29uZmlybWVkOiBib29sZWFuOyBnaXRCcmFuY2g6IHN0cmluZyB8IG51bGw7IHNjb3BlOiBzdHJpbmc7IHNvdXJjZVRhZzogc3RyaW5nXG4gIGJhc2lzU2hhOiBzdHJpbmcgfCBudWxsOyBzdGF0dXM6IHN0cmluZzsgbGFzdFZlcmlmaWVkU2hhOiBzdHJpbmcgfCBudWxsXG4gIGNyZWF0ZWRBdDogbnVtYmVyOyB1cGRhdGVkQXQ6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgTWVtb3JpZXNQYXlsb2FkIHtcbiAgbWVtb3JpZXM6IE1lbW9yeUVudHJ5W11cbiAgYnJhbmNoOiBzdHJpbmcgfCBudWxsXG4gIGhlYWRTaGE6IHN0cmluZyB8IG51bGxcbiAgYmFzZWxpbmU6IHsgc2hhOiBzdHJpbmcgfCBudWxsOyB1cGRhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxuICBiZWhpbmRDb3VudDogbnVtYmVyXG59XG5cbi8qKiBQT1NUIC9tZW1vcnkvc3luYyBcdTc2ODRcdTU0MENcdTZCNjVcdTYyQTVcdTU0NEFcdTMwMDIgKi9cbmludGVyZmFjZSBTeW5jUmVwb3J0IHtcbiAgb2s6IGJvb2xlYW5cbiAgZXJyb3I/OiBzdHJpbmdcbiAgYmVoaW5kQ291bnQ/OiBudW1iZXJcbiAgc3RhbGVQcm9wb3NhbHM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0+XG4gIHJlbmV3ZWQ/OiBudW1iZXJcbiAgbmV3Q2FuZGlkYXRlcz86IEFycmF5PHsgdHlwZTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmcgfT5cbiAgdmVyZGljdD86IHN0cmluZ1xufVxuXG4vKiogXHU4QkM0XHU1QkExXHU5NUVFXHU5ODk4XHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IElTU1VFX1NUQVRVU19MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIG9wZW46ICdcdTVGODVcdTU5MDRcdTc0MDYnLFxuICBmaXhpbmc6ICdcdTRGRUVcdTU5MERcdTRFMkQnLFxuICByZXNvbHZlZDogJ1x1NURGMlx1ODlFM1x1NTFCMycsXG4gIGFjY2VwdGVkOiAnXHU1REYyXHU2M0E1XHU1M0Q3JyxcbiAgcmVqZWN0ZWQ6ICdcdTVERjJcdTYyRDJcdTdFREQnLFxufVxuXG4vKiogXHU4QkIwXHU1RkM2XHU3QzdCXHU1NzhCIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IE1FTU9SWV9UWVBFX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgYXJjaGl0ZWN0dXJlX2RlY2lzaW9uOiAnXHU2N0I2XHU2Nzg0XHU1MUIzXHU3QjU2JywgcGF0dGVybl9ydWxlOiAnXHU2QTIxXHU1RjBGXHU4OUM0XHU1MjE5Jywgcmlza19ob3RzcG90OiAnXHU5OENFXHU5NjY5XHU3MEVEXHU3MEI5JyxcbiAgbGVhcm5lZF9jb25jZXB0OiAnXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1JywgdXNlcl9wcm9maWxlOiAnXHU3NTI4XHU2MjM3XHU1MDRGXHU1OTdEJywgcHJvamVjdF9sb2c6ICdcdTk4NzlcdTc2RUVcdTY1RTVcdTVGRDcnLCBkYWlseV9sb2c6ICdcdTY1RTVcdTVGRDcnLFxufVxuXG4vKiogXHU4QkIwXHU1RkM2XHU2NzY1XHU2RTkwIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IE1FTU9SWV9TT1VSQ0VfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBydW46ICdcdTYyNjdcdTg4NENcdTYzRDBcdTcwQkMnLCByZXZpZXc6ICdcdTY4MzhcdTY3RTVcdTZDODlcdTZEQzAnLCBzeW5jOiAnXHU2MkM5XHU1M0Q2XHU1NDBDXHU2QjY1JywgY2hhdDogJ0FJIFx1OEJCMFx1NUY1NScsIG1hbnVhbDogJ1x1NjI0Qlx1NTJBOCcsXG59XG5cbi8qKiBcdTdGMTZcdTYzOTJcdTg5RDJcdTgyNzIgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xuY29uc3QgUk9MRV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIGFuYWx5c2lzOiAnXHU1MjA2XHU2NzkwJywgcGxhbm5pbmc6ICdcdTg5QzRcdTUyMTInLCBjb2Rpbmc6ICdcdTVGMDBcdTUzRDEnLCBvcHM6ICdcdTdCODBcdTUzNTVcdTY0Q0RcdTRGNUMnLCB2ZXJpZmljYXRpb246ICdcdTlBOENcdTY1MzYnLFxufVxuXG4vKiogXHU2QjY1XHU5QUE0XHU1OTMxXHU4RDI1XHU3QjU2XHU3NTY1IFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFBPTElDWV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICdyZXRyeS1lc2NhbGF0ZSc6ICdcdTkxQ0RcdThCRDVcdTVFNzZcdTUzNDdcdTdFQTdcdTZBMjFcdTU3OEInLCAncmV0cnktZmFsbGJhY2snOiAnXHU5MUNEXHU4QkQ1Jywgc2tpcDogJ1x1NTkzMVx1OEQyNVx1NTIxOVx1OERGM1x1OEZDNycsIGFzazogJ1x1NTkzMVx1OEQyNVx1NTIxOVx1NjY4Mlx1NTA1Q1x1OTVFRVx1NEVCQScsXG59XG5cbi8qKiBSdW4gXHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFJVTl9TVEFUVVNfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBxdWV1ZWQ6ICdcdTYzOTJcdTk2MUZcdTRFMkQnLCBydW5uaW5nOiAnXHU4RkQwXHU4ODRDXHU0RTJEJywgcGF1c2VkOiAnXHU1REYyXHU2NjgyXHU1MDVDJywgYmxvY2tlZDogJ1x1OTYzQlx1NTg1RScsIHJldHJ5aW5nOiAnXHU5MUNEXHU4QkQ1XHU0RTJEJyxcbiAgdmVyaWZ5aW5nOiAnXHU2NTM2XHU1QzNFXHU5QThDXHU2NTM2XHU0RTJEJywgc3VjY2VlZGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgY29tcGxldGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgZmFpbGVkOiAnXHU1OTMxXHU4RDI1JywgY2FuY2VsbGVkOiAnXHU1REYyXHU1M0Q2XHU2RDg4JywgaW50ZXJydXB0ZWQ6ICdcdTVERjJcdTRFMkRcdTY1QUQnLFxufVxuXG4vKiogXHU2QjY1XHU5QUE0XHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFNURVBfU1RBVFVTX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgcGVuZGluZzogJ1x1NUY4NVx1NjI2N1x1ODg0QycsIHJlYWR5OiAnXHU1QzMxXHU3RUVBJywgcnVubmluZzogJ1x1NjI2N1x1ODg0Q1x1NEUyRCcsIHBhdXNlZDogJ1x1NjY4Mlx1NTA1QycsIHJldHJ5aW5nOiAnXHU5MUNEXHU4QkQ1XHU0RTJEJyxcbiAgc3VjY2VlZGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgZmFpbGVkOiAnXHU1OTMxXHU4RDI1Jywgc2tpcHBlZDogJ1x1NURGMlx1OERGM1x1OEZDNycsIGJsb2NrZWQ6ICdcdTk2M0JcdTU4NUUnLCBjYW5jZWxsZWQ6ICdcdTVERjJcdTUzRDZcdTZEODgnLCBpbnRlcnJ1cHRlZDogJ1x1NURGMlx1NEUyRFx1NjVBRCcsXG59XG5cbi8qKiBcdThCQzRcdTVCQTFcdTk1RUVcdTk4OThcdTRFMjVcdTkxQ0RcdTVFQTYgXHUyMTkyIFx1NUZCRFx1N0FFMFx1NUU5NVx1ODI3Mlx1MzAwMiAqL1xuZnVuY3Rpb24gc2V2ZXJpdHlDb2xvcihzZXZlcml0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IHNldmVyaXR5ID09PSAnYmxvY2tlcicpIHJldHVybiAnI2NlOTE3OCdcbiAgaWYgKHNldmVyaXR5ID09PSAnbWFqb3InKSByZXR1cm4gJyNkN2JhN2QnXG4gIGlmIChzZXZlcml0eSA9PT0gJ2luZm8nKSByZXR1cm4gJyM2YjhiOGInXG4gIHJldHVybiAnIzU2OWNkNidcbn1cblxuLyoqIFx1NEUyNVx1OTFDRFx1NUVBNlx1NUY1Mlx1NEUwMFx1RkYwOFx1NTE3Q1x1NUJCOVx1NTM4Nlx1NTNGMlx1OEJCMFx1NUY1NVx1OTFDQ1x1NzY4NCBoaWdoL21lZGl1bS9sb3dcdUZGMUJcdTY3MkFcdTc3RTVcdTU2REVcdTg0M0QgbWlub3JcdUZGMDlcdUZGMENcdTdFREZcdThCQTEvXHU3QjVCXHU5MDA5L1x1Nzc0MFx1ODI3Mlx1NTE3MVx1NzUyOFx1MzAwMiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplSXNzdWVTZXZlcml0eShzZXZlcml0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHNldmVyaXR5ID09PSAnaGlnaCcpIHJldHVybiAnbWFqb3InXG4gIGlmIChzZXZlcml0eSA9PT0gJ21lZGl1bScgfHwgc2V2ZXJpdHkgPT09ICdsb3cnKSByZXR1cm4gJ21pbm9yJ1xuICByZXR1cm4gc2V2ZXJpdHkgPT09ICdibG9ja2VyJyB8fCBzZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBzZXZlcml0eSA9PT0gJ21ham9yJyB8fCBzZXZlcml0eSA9PT0gJ21pbm9yJyB8fCBzZXZlcml0eSA9PT0gJ2luZm8nXG4gICAgPyBzZXZlcml0eSA6ICdtaW5vcidcbn1cblxuLy8gXHU0RTNCXHU5ODk4XHU1QkY5XHU2QkQ0XHU1RUE2XHU1RjE1XHU2NENFXHVGRjA4cGFyc2VDb2xvciAvIHJlbGF0aXZlTHVtaW5hbmNlIC8gZGFya2VuL2xpZ2h0ZW4gLyB0aGVtZUF3YXJlVGV4dFx1RkYwOVxuLy8gXHU1REYyXHU2MkJEXHU1M0Q2XHU1MjMwIC4vdGhlbWUudHMgXHU3RURGXHU0RTAwXHU3RUY0XHU2MkE0XHUzMDAyXHU1MTY4XHU2NTg3XHU0RUY2XHU0RTBEXHU1M0Q4XHU1RjBGXHVGRjFBXG4vLyAxKSBcdTVGM0FcdThDMDNcdTgyNzJcdTY1ODdcdTVCNTdcdTVGQzVcdTk4N0JcdTdFQ0YgdGhlbWVBd2FyZVRleHRcdUZGMDhcdTZFMzJcdTY3RDNcdTY3MUZcdThDMDNcdTc1MjhcdUZGMDlcdUZGMUJcbi8vIDIpIGFjdGl2ZSBcdTlBRDhcdTRFQUVcdTgwQ0NcdTY2NkZcdTRFMDBcdTVGOEIgYnV0dG9uLWluZm8tZmlsbFx1RkYwQ1x1Nzk4MVx1NkI2MiBicmFuZC1wcmltYXJ5IFx1NEY1Q1x1ODBDQ1x1NjY2RlxuLy8gICAgXHVGRjA4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU0RTBCXHU4RkQxXHU3NjdEXHVGRjBDXHU5MTREXHU3NjdEXHU1QjU3XHU0RTBEXHU1M0VGXHU4OUMxXHUyMDE0XHUyMDE0XHUzMDBDXHU5ODc1XHU3QjdFXHU3NjdEXHU1NzU3XHUzMDBEXHU0RThCXHU2NTQ1XHU2ODM5XHU1NkUwXHVGRjA5XHUzMDAyXG5cbi8qKiBcdThCQzRcdTVCQTFcdTc2RUVcdTY4MDdcdUZGMDhjaGFuZ2VJZFx1RkYwOVx1MjE5MiBcdTUzRUZcdThCRkJcdTY4MDdcdTdCN0VcdUZGMUFcdTU0MDhcdTYyMTAgcmV2aWV3OjxzaGE+IFx1NjMwN1x1NTQxMVx1NjNEMFx1NEVBNFx1RkYwQ2NoZ18qIFx1NjMwN1x1NTQxMVx1NTNEOFx1NjZGNFx1RkYwQ2FkaG9jIFx1NEUzQVx1NURFNVx1NEY1Q1x1NTMzQVx1MzAwMiAqL1xuZnVuY3Rpb24gaXNzdWVUYXJnZXRMYWJlbChjaGFuZ2VJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgaWQgPSB0eXBlb2YgY2hhbmdlSWQgPT09ICdzdHJpbmcnID8gY2hhbmdlSWQgOiAnJ1xuICBpZiAoaWQuc3RhcnRzV2l0aCgncmV2aWV3OicpKSByZXR1cm4gYFx1NjNEMFx1NEVBNCAke2lkLnNsaWNlKDcsIDE1KX1gXG4gIGlmIChpZCA9PT0gJ2FkaG9jJykgcmV0dXJuICdcdTVERTVcdTRGNUNcdTUzM0EnXG4gIHJldHVybiBgXHU1M0Q4XHU2NkY0ICR7aWQuc2xpY2UoMCwgMTEpfWBcbn1cblxuLyoqIFx1NjAzQlx1N0VEMy9cdTdFRDNcdTY3ODRcdTUzMTZcdTdCMTRcdThCQjBcdTc2ODRcdThGN0JcdTkxQ0YgTWFya2Rvd24gXHU2RTMyXHU2N0QzXHVGRjFBXHUzMDBDIyMgXHUzMDBEXHU4MjgyXHU2ODA3XHU5ODk4XHU3NzQwXHU4MjcyXHU1MkEwXHU3Qzk3XHVGRjBDXHUzMDBDLSBcdTMwMERcdTUyMTdcdTg4NjhcdTUyQTBcdTU3MDZcdTcwQjlcdUZGMENcdTUxNzZcdTRGNTlcdTUzOUZcdTY4MzdcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlbmRlclN0cnVjdHVyZWRDb250ZW50KGNvbnRlbnQ6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdIHtcbiAgaWYgKHR5cGVvZiBjb250ZW50ICE9PSAnc3RyaW5nJyB8fCBjb250ZW50ID09PSAnJykgcmV0dXJuIFtdXG4gIHJldHVybiBjb250ZW50LnNwbGl0KCdcXG4nKS5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnIyMgJykpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEyLjVweCcsIG1hcmdpblRvcDogaW5kZXggPT09IDAgPyAwIDogMTAsIG1hcmdpbkJvdHRvbTogMiwgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19PlxuICAgICAgICAgIHtsaW5lLnNsaWNlKDMpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnLSAnKSkge1xuICAgICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3sgcGFkZGluZ0xlZnQ6IDE0LCB0ZXh0SW5kZW50OiAtMTAgfX0+XHUyMDIyIHtyZW5kZXJXaXRoUGVlayhsaW5lLnNsaWNlKDIpKX08L2Rpdj5cbiAgICB9XG4gICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0+e2xpbmUgPT09ICcnID8gJ1xcdTAwQTAnIDogcmVuZGVyV2l0aFBlZWsobGluZSl9PC9kaXY+XG4gIH0pXG59XG5cbi8qKiBwZWVrIFx1NzBCOVx1NTFGQlx1NTZERVx1OEMwM1x1RkYxQVx1NzUzMSBXb3Jrc3BhY2VGcmFtZSBcdTZDRThcdTUxNjVcdUZGMDhcdTZFMzJcdTY3RDNcdTU2NjhcdTRGRERcdTYzMDFcdTZBMjFcdTU3NTdcdTdFQTdcdTdFQUZcdTUxRkRcdTY1NzBcdUZGMDlcdTMwMDIgKi9cbmxldCBwZWVrT3BlbmVyOiAoKHBhdGg6IHN0cmluZywgbGluZTogbnVtYmVyKSA9PiB2b2lkKSB8IHVuZGVmaW5lZFxuXG4vKiogXHU2MjhBXHU2NTg3XHU2NzJDXHU0RTJEXHU3Njg0IGZpbGU6bGluZSBcdTVGMTVcdTc1MjhcdTZFMzJcdTY3RDNcdTRFM0FcdTUzRUZcdTcwQjlcdTUxRkJcdTgyQUZcdTcyNDdcdUZGMDhcdTcwQjlcdTUxRkJcdTVGMzlcdTUxRkFcdTRFRTNcdTc4MDFcdTRFMEFcdTRFMEJcdTY1ODdcdUZGMDlcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlbmRlcldpdGhQZWVrKHRleHQ6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gIGNvbnN0IG5vZGVzOiBSZWFjdC5SZWFjdE5vZGVbXSA9IFtdXG4gIGxldCBsYXN0ID0gMFxuICBsZXQgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheSB8IG51bGxcbiAgRklMRV9MSU5FX1BBVFRFUk4ubGFzdEluZGV4ID0gMFxuICB3aGlsZSAoKG1hdGNoID0gRklMRV9MSU5FX1BBVFRFUk4uZXhlYyh0ZXh0KSkgIT09IG51bGwpIHtcbiAgICBpZiAobWF0Y2guaW5kZXggPiBsYXN0KSBub2Rlcy5wdXNoKHRleHQuc2xpY2UobGFzdCwgbWF0Y2guaW5kZXgpKVxuICAgIGNvbnN0IFtmdWxsLCBwYXRoLCBsaW5lU3RyXSA9IG1hdGNoXG4gICAgbm9kZXMucHVzaChcbiAgICAgIDxidXR0b25cbiAgICAgICAga2V5PXtgJHttYXRjaC5pbmRleH0tJHtmdWxsfWB9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJywgcGFkZGluZzogJzAgMXB4JywgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsXG4gICAgICAgICAgZm9udFNpemU6ICdpbmhlcml0JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSBkb3R0ZWQnLFxuICAgICAgICB9fVxuICAgICAgICB0aXRsZT1cIlx1NzBCOVx1NTFGQlx1NjdFNVx1NzcwQlx1NEVFM1x1NzgwMVx1NEUwQVx1NEUwQlx1NjU4N1wiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHsgcGVla09wZW5lcj8uKHBhdGgsIE51bWJlcihsaW5lU3RyKSkgfX1cbiAgICAgID57ZnVsbH08L2J1dHRvbj4sXG4gICAgKVxuICAgIGxhc3QgPSBtYXRjaC5pbmRleCArIGZ1bGwubGVuZ3RoXG4gIH1cbiAgaWYgKGxhc3QgPCB0ZXh0Lmxlbmd0aCkgbm9kZXMucHVzaCh0ZXh0LnNsaWNlKGxhc3QpKVxuICByZXR1cm4gbm9kZXMubGVuZ3RoID09PSAxID8gbm9kZXNbMF0gOiA8c3Bhbj57bm9kZXN9PC9zcGFuPlxufVxuXG4vKipcbiAqIFx1ODlDNlx1ODlDOVx1NjM2Mlx1NTIxN1x1NjgzN1x1NUYwRlx1ODg2OFx1RkYxQVx1OTY4Rlx1NjcyQ1x1N0VDNFx1NEVGNlx1NjMwMlx1OEY3RC9cdTUzNzhcdThGN0RcdUZGMDhcdTUzNzhcdThGN0RcdTUzNzNcdTVCOENcdTUxNjhcdTYwNjJcdTU5MERcdTUzOUZcdTc1MUZcdTVFMDNcdTVDNDBcdUZGMDlcdTMwMDJcbiAqIFx1NjM2Mlx1NTIxN1x1NjYyRlx1NjVFMFx1Njc2MVx1NEVGNlx1NzY4NFx1RkYwOFx1NTQyQlx1NjVCMFx1NEYxQVx1OEJERFx1ODQzRFx1NTczMFx1OTg3NVx1RkYwOVx1MjAxNFx1MjAxNFx1NEUxQVx1NEUzQlx1ODlDNFx1NTIxOVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1ODk4MVx1NEU0OFx1NEUwRFx1NjYzRVx1NzkzQVx1MzAwMVx1ODk4MVx1NEU0OFx1NUM0NVx1NEUyRFx1RkYwQ1xuICogXHU1M0YzXHU0RkE3XHU1M0VBXHU1MTQxXHU4QkI4XHU4MDRBXHU1OTI5XHUzMDAyMC4xLjIgXHU2NUIwXHU0RjFBXHU4QkREXHU5ODc1XHU0RTVGXHU1RTI2IGRhdGEtZGV0YWlscy1jb2xsYXBzZWRcdUZGMENcdTY2RkVcdTU2RTBcdTVCRjlcdTVCODNcdThDNDFcdTUxNERcbiAqIFx1NjM2Mlx1NTIxN1x1NUJGQ1x1ODFGNFx1NURFNVx1NEY1Q1x1NTNGMFx1NTcyOFx1NjVCMFx1NEYxQVx1OEJERFx1NEUwQlx1OTAwMFx1NTZERVx1NTM5Rlx1NzUxRlx1NTNGM1x1NEY0RFx1RkYwODIwMjYtMDktMTAgXHU0RkVFXHU1OTBEXHVGRjA5XHUzMDAyXG4gKiBcdTZDRThcdTYxMEZcdUZGMUFcdTc5ODFcdTZCNjJcdTc1MjggOmhhcygpIFx1NTA1QVx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1MjAxNFx1MjAxNFx1NUI5OFx1NjVCOVx1Njc4NFx1NUVGQVx1NEVBN1x1NzI2OVx1NTFFMFx1NTM0MVx1NEUyQVx1N0VDNFx1NEVGNlx1NjgzOVx1N0M3Qlx1OTBGRFx1NTNFQiByb290XHVGRjBDXG4gKiBcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdTRGMUFcdTYyOEFcdTY1NzRcdTRFMkFcdTgwNEFcdTU5MjlcdTVCQjlcdTU2NjhcdThCRUZcdTk0QjNcdTUyMzZcdUZGMDhcdTUzODZcdTUzRjJcdTRFOEJcdTY1NDVcdUZGMDlcdTMwMDJcdTZCNjRcdTg4NjhcdTUzRUFcdTRGRERcdTc1NTlcdTdGNTFcdTY4M0NcdTYzNjJcdTUyMTdcdTRFMEVcdTYyRDZcdTYyRkRcdTY3QzRcdTk2OTBcdTg1Q0ZcdTMwMDJcbiAqL1xuY29uc3QgTEFZT1VUX1NUWUxFID0gYFxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA+IGRpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0geyBvcmRlcjogMzsgfVxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA+IGRpdltjbGFzcyo9XCJkZXRhaWxzQ29sXCJdIHsgb3JkZXI6IDI7IH1cbmRpdltjbGFzcyo9XCJoYW5kbGVcIl1bZGF0YS1zaWRlPVwiZGV0YWlsc1wiXSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSB7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBtaW5tYXgoMCwgMWZyKSB2YXIoLS1wYy1jaGF0LXcsIDM2MHB4KSAhaW1wb3J0YW50O1xufVxuYFxuXG4vKipcbiAqIFx1NEYxQVx1OEJERFx1N0VERlx1OEJBMVx1ODg0Q1x1NzY4NFx1NEUyNFx1ODg0Q1x1OTRCM1x1NTIzNlx1RkYwOFx1NzUyOFx1NjIzN1x1NjMwN1x1NUI5QVx1NzY4NFx1NjgzN1x1NUYwRlx1RkYwOVx1MzAwMlx1NEUwRFx1ODBGRFx1OEQ3MCBDU1MgXHU5MDA5XHU2MkU5XHU1NjY4XHVGRjFBXG4gKiBcdTVCOThcdTY1QjlcdTU5MUFcdTRFMkFcdTZBMjFcdTU3NTdcdTc2ODRcdTY4MzlcdTdDN0JcdTkwRkRcdTUzRUIgYHJvb3RgXHVGRjA4XHU2Nzg0XHU1RUZBXHU1NDBFXHU2NjJGIGBoYXNoX3Jvb3RgXHVGRjA5XHVGRjBDXHU1MTc2XHU0RTJEXG4gKiBDb252ZXJzYXRpb25Sb290IFx1NzY4NFx1NUI1MFx1NjgxMVx1OTFDQ1x1NUMzMVx1NTMwNVx1NTQyQlx1N0VERlx1OEJBMVx1ODg0Q1x1NzY4NCBgaGFzaF9zZXBgIFx1NTIwNlx1OTY5NCBzcGFuXHUyMDE0XHUyMDE0XG4gKiBcdTRFRkJcdTRGNTVcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdUZGMDhcdTU0MkIgOmhhcygpXHVGRjA5XHU5MEZEXHU0RjFBXHU2MjhBXHU2NTc0XHU0RTJBXHU4MDRBXHU1OTI5XHU1QkI5XHU1NjY4XHU5NEIzXHU2MjEwXHU0RTI0XHU4ODRDXHVGRjBDXHU2NzQwXHU2QjdCXHU2RURBXHU1MkE4XHUzMDAyXG4gKiBcdTU2RTBcdTZCNjRcdTU3MjhcdThGRDBcdTg4NENcdTY1RjZcdTYzMDlcdTU1MkZcdTRFMDBcdTVGNjJcdTcyQjZcdTVCOUFcdTRGNERcdUZGMUFcdTVDNDVcdTRFMkRcdTYzOTJcdTcyNDggKyBcdTc2RjRcdTYzQTVcdTVCNTBcdTRFRTNcdTU0MkJcdTY1ODdcdTY3MkMgXCJ8XCIgXHU3Njg0XG4gKiBcdTUyMDZcdTk2OTQgc3Bhblx1RkYwQ1x1NTQ3RFx1NEUyRFx1NTQwRVx1NjI4QVx1NUI5OFx1NjVCOVx1N0M3Qlx1NTQwRFx1NTM5Rlx1NjgzN1x1NTE5OVx1OEZEQlx1NjgzN1x1NUYwRlx1ODg2OFx1RkYwOFx1N0NCRVx1NTFDNlx1NTIzMFx1Njc4NFx1NUVGQVx1NTRDOFx1NUUwQ1x1RkYwOVx1MzAwMlxuICogQHJldHVybnMgXHU2Q0U4XHU1MTY1XHU3Njg0IHN0eWxlIFx1NTE0M1x1N0QyMFx1RkYxQlx1NUI5OFx1NjVCOVx1NjcyQVx1NkUzMlx1NjdEM1x1N0VERlx1OEJBMVx1ODg0Q1x1NjVGNlx1NEUzQSB1bmRlZmluZWRcdTMwMDJcbiAqL1xuY29uc3QgYXBwbHlTdGF0c0xpbmVDbGFtcCA9ICgpOiBIVE1MU3R5bGVFbGVtZW50IHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3Qgc2VwU3BhbiA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MU3BhbkVsZW1lbnQ+KCdkaXZbY2xhc3MqPVwiX3Jvb3RcIl0gPiBzcGFuW2NsYXNzKj1cIl9zZXBcIl0nKSlcbiAgICAuZmluZCgoc3BhbikgPT4gc3Bhbi50ZXh0Q29udGVudCA9PT0gJ3wnKVxuICBjb25zdCByb290RGl2ID0gc2VwU3Bhbj8ucGFyZW50RWxlbWVudFxuICBjb25zdCBoYXNoQ2xhc3MgPSByb290RGl2Py5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5maW5kKChuYW1lKSA9PiBuYW1lLmVuZHNXaXRoKCdfcm9vdCcpKVxuICBpZiAocm9vdERpdiA9PT0gdW5kZWZpbmVkIHx8IHJvb3REaXYgPT09IG51bGwgfHwgaGFzaENsYXNzID09PSB1bmRlZmluZWQgfHwgZ2V0Q29tcHV0ZWRTdHlsZShyb290RGl2KS50ZXh0QWxpZ24gIT09ICdjZW50ZXInKSByZXR1cm4gdW5kZWZpbmVkXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZS5pZCA9ICdwYy1zdGF0cy1jbGFtcCdcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG5kaXZbY2xhc3M9XCIke2hhc2hDbGFzc31cIl0ge1xuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgLXdlYmtpdC1saW5lLWNsYW1wOiAyO1xuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuICB0ZXh0LW92ZXJmbG93OiBjbGlwO1xuICBmb250LXNpemU6IDExcHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cbmBcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSlcbiAgcmV0dXJuIHN0eWxlXG59XG5cbnR5cGUgVGFiS2V5ID0gJ2NvbW1pdHMnIHwgJ292ZXJ2aWV3JyB8ICdleGVjdXRpb24nIHwgJ3JldmlldycgfCAnbm90ZXMnIHwgJ3NldHRpbmdzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZUZyYW1lUHJvcHMge1xuICAvKiogXHU1Qjk4XHU2NUI5IGRldGFpbHMgXHU2OUZEXHU1OTUxXHU3RUE2XHU3Njg0IGxvY2FsZSBcdTZDRThcdTUxNjVcdUZGMDhcdTYyMTFcdTRFRUNcdTZDRThcdTUxOENcdTc2ODQgcHJvamVjdC1jb250cm9sIFx1OEJDRFx1NTE3OFx1RkYwOVx1MzAwMiAqL1xuICB0PzogKGtleTogc3RyaW5nKSA9PiBzdHJpbmdcbiAgLyoqIFx1NUY1M1x1NTI0RFx1NEYxQVx1OEJERCBpZFx1RkYwOFx1NUI5OFx1NjVCOSBzZXNzaW9uIFx1NjgwN1x1NTFDNlx1NUM1RVx1NjAyN1x1RkYxQlx1NTIwN1x1NjM2Mlx1NEYxQVx1OEJERFx1NjVGNlx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1NURFNVx1NEY1Q1x1NTNGMFx1OEY2OFx1OTA1M1x1RkYwOVx1MzAwMiAqL1xuICBzZXNzaW9uSWQ/OiBzdHJpbmdcbn1cblxuLyoqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NjU4N1x1Njg0OFx1OEJDRFx1NTE3OFx1RkYwOHpoIC8gZW5cdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBjb25zdCBXT1JLU1BBQ0VfRElDVCA9IHtcbiAgemg6IHtcbiAgICAnd29ya3NwYWNlLnRpdGxlJzogJ1x1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMCcsXG4gICAgJ3RhYi5jb21taXRzJzogJ1x1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNScsXG4gICAgJ3RhYi5vdmVydmlldyc6ICdcdTk4NzlcdTc2RUVcdTYwM0JcdTg5QzgnLFxuICAgICd0YWIuZXhlY3V0aW9uJzogJ1x1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDMycsXG4gICAgJ3RhYi5yZXZpZXcnOiAnUmV2aWV3IFx1OTVFRVx1OTg5OCcsXG4gICAgJ3RhYi5ub3Rlcyc6ICdcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzYnLFxuICAgICd0YWIuc2V0dGluZ3MnOiAnXHU4QkJFXHU3RjZFJyxcbiAgICAnZXJyb3IubG9hZCc6ICdcdTUyQTBcdThGN0RcdTU5MzFcdThEMjUnLFxuICAgICdzdGF0ZS5wcm9qZWN0JzogJ1x1NUY1M1x1NTI0RFx1OTg3OVx1NzZFRScsXG4gICAgJ3N0YXRlLm5vUHJvamVjdCc6ICdcdTVDMUFcdTY3MkFcdTUyMURcdTU5Q0JcdTUzMTZcdTk4NzlcdTc2RUUnLFxuICAgICdzdGF0ZS5ub1Byb2plY3RIaW50JzogJ1x1NzBCOVx1NTFGQlx1MzAwQ1x1NTIxRFx1NTlDQlx1NTMxNlx1OTg3OVx1NzZFRVx1MzAwRFx1NjI2Qlx1NjNDRlx1NEVEM1x1NUU5M1x1N0VEM1x1Njc4NFx1MzAwMVx1NjI4MFx1NjcyRlx1NjgwOFx1NEUwRVx1N0IyNlx1NTNGN1x1N0QyMlx1NUYxNVx1MzAwMicsXG4gICAgJ2FjdGlvbi5ib290c3RyYXAnOiAnXHU1MjFEXHU1OUNCXHU1MzE2XHU5ODc5XHU3NkVFJyxcbiAgICAnYWN0aW9uLnJlc2Nhbic6ICdcdTkxQ0RcdTY1QjBcdTUyMURcdTU5Q0JcdTUzMTYgLyBcdTYyNkJcdTYzQ0YnLFxuICAgICdhY3Rpb24uYW5hbHl6ZSc6ICdcdTUyMDZcdTY3OTBcdTVGNTNcdTUyNERcdTY1MzlcdTUyQTgnLFxuICAgICdhY3Rpb24ucmV2aWV3JzogJ1x1OEJDNFx1NUJBMVx1NUY1M1x1NTI0RFx1NjUzOVx1NTJBOCcsXG4gICAgJ2FjdGlvbi52ZXJpZnknOiAnXHU5QThDXHU2NTM2XHU1RjUzXHU1MjREXHU2NTM5XHU1MkE4JyxcbiAgICAnYWN0aW9uLmNyZWF0ZUNoYW5nZSc6ICdcdTY1QjBcdTVFRkFcdTUzRDhcdTY2RjQnLFxuICAgICdhY3Rpb24ucnVubmluZyc6ICdcdTYyNjdcdTg4NENcdTRFMkRcdTIwMjYnLFxuICAgICdhY3Rpb24ucmVmcmVzaCc6ICdcdTUyMzdcdTY1QjAnLFxuICAgICdmb3JtLmNoYW5nZVRpdGxlJzogJ1x1NTNEOFx1NjZGNFx1NjgwN1x1OTg5OCcsXG4gICAgJ2Zvcm0uY2hhbmdlRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMDhcdTkwMDlcdTU4NkJcdUZGMDknLFxuICAgICdyZXN1bHQucGFuZWwnOiAnXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDJyxcblxuICAgICdyZXBvLnNjYW5IaXN0b3J5JzogJ1x1OTFDRFx1NUVGQVx1NTM4Nlx1NTNGMicsXG4gICAgJ3JlcG8uY29tbWl0cyc6ICdcdTYzRDBcdTRFQTQnLFxuICAgICdyZXBvLmJyYW5jaCc6ICdcdTUyMDZcdTY1MkYnLFxuICAgICdyZXBvLndvcmtpbmcnOiAnXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcbiAgICAncmVwby53b3JraW5nQ2xlYW4nOiAnXHU1REU1XHU0RjVDXHU1MzNBXHU1RTcyXHU1MUMwXHVGRjBDXHU2NUUwXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcbiAgICAncmVwby5lbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTYzRDBcdTRFQTRcdTMwMDInLFxuICAgICdyZXBvLmxvYWRGYWlsZWQnOiAnXHU2M0QwXHU0RUE0XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1JyxcbiAgICAncGlja2VyLnRpdGxlJzogJ1x1OTAwOVx1NjJFOVx1ODk4MVx1NjgzOFx1NjdFNVx1NzY4NFx1NjNEMFx1NEVBNFx1RkYwOFx1NTNFRlx1NTkxQVx1OTAwOVx1RkYwOScsXG4gICAgJ3BpY2tlci5wbGFjZWhvbGRlcic6ICdcdTcwQjlcdTUxRkJcdTkwMDlcdTYyRTlcdTYzRDBcdTRFQTRcdUZGMDhcdTUzRUZcdTU5MUFcdTkwMDlcdUZGMENcdTU0MkJcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQThcdUZGMDknLFxuICAgICdwaWNrZXIuc2VsZWN0ZWQnOiAnXHU1REYyXHU5MDA5JyxcbiAgICAncGlja2VyLmZpbHRlcic6ICdcdTYzMDlcdTY4MDdcdTk4OTgvXHU1NEM4XHU1RTBDL1x1NEY1Q1x1ODAwNVx1OEZDN1x1NkVFNFx1MjAyNicsXG4gICAgJ3BpY2tlci5jbGVhcic6ICdcdTZFMDVcdTdBN0EnLFxuICAgICdwaWNrZXIubm9NYXRjaCc6ICdcdTY1RTBcdTUzMzlcdTkxNERcdTYzRDBcdTRFQTRcdTMwMDInLFxuICAgICdwaWNrZXIuaGludCc6ICdcdTUyRkVcdTkwMDlcdTYzRDBcdTRFQTRcdTU0MEVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTAgQUkgXHU4OUUzXHU4QkZCXHVGRjFCXHU0RTBCXHU2NUI5XHU1M0VGXHU1MThEXHU4REQxXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHU0RTBFXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHUzMDAyJyxcbiAgICAncGlja2VyLnJvdW5kJzogJ1x1N0IyQyB7bn0gXHU4RjZFJyxcbiAgICAncGlja2VyLnJvdW5kTGF0ZXN0JzogJ1x1N0IyQyB7bn0gXHU4RjZFXHVGRjA4XHU2NzAwXHU2NUIwXHVGRjA5JyxcbiAgICAncGlja2VyLnJvdW5kU2VsZWN0JzogJ1x1OTAwOVx1NjU3NFx1OEY2RScsXG4gICAgJ3BpY2tlci5yb3VuZENsZWFyJzogJ1x1NTNENlx1NkQ4OFx1NjcyQ1x1OEY2RScsXG4gICAgJ3BpY2tlci51bmRpZ2VzdGVkJzogJ1x1NEUwQVx1NkIyMSBBSSBcdTYwM0JcdTdFRDNcdTRFNEJcdTU0MEVcdTc2ODRcdTY1QjBcdTYzRDBcdTRFQTRcdUZGMENcdTVDMUFcdTY3MkFcdTY4MzhcdTY3RTVcdTZEODhcdTUzMTYnLFxuICAgICdwaWNrZXIudW5kaWdlc3RlZENvdW50JzogJ3tufSBcdTRFMkFcdTYzRDBcdTRFQTRcdTY3MkFcdTZEODhcdTUzMTYnLFxuICAgICdpbXBhY3QuZmFjdG9ycyc6ICdcdTk4Q0VcdTk2NjlcdTY3ODRcdTYyMTBcdUZGMDhcdTRFM0FcdTRFQzBcdTRFNDhcdTY2MkZcdThGRDlcdTRFMkFcdTdCNDlcdTdFQTdcdUZGMDknLFxuICAgICdpbXBhY3QucG9pbnRzJzogJ1x1NUY3MVx1NTRDRFx1NzBCOVx1NjYwRVx1N0VDNicsXG4gICAgJ2ltcGFjdC5rZXlQb2ludHMnOiAnXHU1MTczXHU5NTJFXHU3RUM0XHU0RUY2JyxcbiAgICAnaW1wYWN0Lm1lbW9yeSc6ICdcdTdFRDNcdTU0MDhcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdTY4MzhcdTY3RTUnLFxuICAgICdpbXBhY3QuZnVuY3Rpb25zJzogJ1x1NTNEN1x1NUY3MVx1NTRDRFx1NTFGRFx1NjU3MFx1RkYwOFx1OEMwMVx1OEMwM1x1NzUyOFx1NEU4Nlx1ODhBQlx1NjUzOVx1NzY4NFx1NEVFM1x1NzgwMVx1RkYwOScsXG4gICAgJ2ltcGFjdC5mdW5jUm9sZSc6ICdcdTUxRkRcdTY1NzBcdTUyOUZcdTgwRkQnLFxuICAgICdpbXBhY3QuZnVuY0NoYW5nZSc6ICdcdTY3MkNcdTZCMjFcdTUzRDhcdTUzMTYnLFxuICAgICdpbXBhY3QuZnVuY0NhbGxlcnMnOiAnXHU1QkY5XHU4QzAzXHU3NTI4XHU2NUI5XHU3Njg0XHU1RjcxXHU1NENEJyxcbiAgICAnY2FjaGUuaGl0JzogJ1x1Njc2NVx1ODFFQVx1N0YxM1x1NUI1OCcsXG4gICAgJ2NhY2hlLnJlZ2VuZXJhdGUnOiAnXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwJyxcbiAgICAnY29zdC50b29sdGlwJzogJ1x1NjcyQ1x1NkIyMSBBSSBcdThDMDNcdTc1MjhcdTYyMTBcdTY3MkNcdUZGMDhcdTRGMzBcdTdCOTdcdUZGMENcdTYzMDkgRGVlcFNlZWsgXHU0RUY3XHU3NkVFXHU2Mjk4XHU3Qjk3XHVGRjA5JyxcbiAgICAnZXhlYy5jcmVhdGUnOiAnXHU2NUIwXHU1RUZBXHU2MjY3XHU4ODRDJyxcbiAgICAnZXhlYy5mb3JtVGl0bGUnOiAnXHU4OTgxXHU1MDVBXHU0RUMwXHU0RTQ4XHVGRjA4XHU0RTAwXHU1M0U1XHU4QkREXHVGRjA5JyxcbiAgICAnZXhlYy5mb3JtRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMUFcdTc2RUVcdTY4MDdcdTMwMDFcdTZEODlcdTUzQ0FcdTZBMjFcdTU3NTdcdTMwMDFcdTlBOENcdTY1MzZcdTY4MDdcdTUxQzYnLFxuICAgICdleGVjLnN0YXJ0JzogJ1x1NUYwMFx1NTlDQlx1NjI2N1x1ODg0QycsXG4gICAgJ2V4ZWMuc3RhcnRpbmcnOiAnXHU2QjYzXHU1NzI4XHU1NDJGXHU1MkE4XHUyMDI2JyxcbiAgICAnZXhlYy5jcmVhdGVIaW50JzogJ1x1NTIxQlx1NUVGQVx1NTNEOFx1NjZGNFx1NUU3Nlx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1OEJBMVx1NTIxMlx1RkYwQ1x1OTY4Rlx1NTQwRVx1NzUzMSBBSSBcdTVCNTBcdTRFRTNcdTc0MDZcdTkwMTBcdTZCNjVcdTYyNjdcdTg4NENcdUZGMUJcdThGREJcdTVFQTZcdTU3MjhcdTRFMEJcdTY1QjlcdTVCOUVcdTY1RjZcdTUyMzdcdTY1QjBcdUZGMENcdTY1RTBcdTk3MDBcdTUzQkJcdTgwNEFcdTU5MjlcdTMwMDInLFxuICAgICdleGVjLm1vZGVsRGVmYXVsdCc6ICdcdTYyNjdcdTg4NENcdTZBMjFcdTU3OEJcdUZGMDhcdTg5RDJcdTgyNzJcdTlFRDhcdThCQTRcdUZGMUFcdTUyMDZcdTY3OTAvXHU2NENEXHU0RjVDPVx1NUZFQlx1RkYwQ1x1NUYwMFx1NTNEMT1cdTY4MDdcdTUxQzZcdUZGMENcdTg5QzRcdTUyMTI9XHU2M0E4XHU3NDA2XHVGRjBDXHU5QThDXHU2NTM2PVx1OUE4Q1x1NjUzNlx1N0VBN1x1RkYwOScsXG4gICAgJ2JhZGdlLnJ1bm5pbmcnOiAne259IFx1NEUyQVx1NEVGQlx1NTJBMVx1OEZEMFx1ODg0Q1x1NEUyRFx1RkYwQ1x1NzBCOVx1NTFGQlx1NjdFNVx1NzcwQicsXG4gICAgJ25hcnJhdGl2ZS50aXRsZSc6ICdcdTVERTVcdTRGNUNcdThGNkVcdTZCMjFcdTUzRDlcdTRFOEInLFxuICAgICduYXJyYXRpdmUuZ2VuZXJhdGUnOiAnXHU2NTc0XHU0RjUzXHU4OUUzXHU4QkZCXHU4RkQ5XHU4RjZFXHU1REU1XHU0RjVDJyxcbiAgICAnbmFycmF0aXZlLnJ1bm5pbmcnOiAnXHU4OUUzXHU4QkZCXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4XHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXG4gICAgJ2JhZGdlLmZhaWxlZCc6ICd7bn0gXHU0RTJBXHU0RUZCXHU1MkExXHU5NzAwXHU4OTgxXHU1OTA0XHU3NDA2XHVGRjBDXHU3MEI5XHU1MUZCXHU2N0U1XHU3NzBCJyxcbiAgICAnZXhlYy5mbG93Q3JlYXRlJzogJ1x1NTg2Qlx1NTE5OVx1NEVGQlx1NTJBMScsXG4gICAgJ2V4ZWMuZmxvd09yY2hlc3RyYXRlJzogJ1x1Nzg2RVx1OEJBNFx1N0YxNlx1NjM5Mlx1RkYwOFx1NkJDRlx1NkI2NVx1NTNFRlx1NjUzOVx1NkEyMVx1NTc4Qi9cdTg5RDJcdTgyNzIvXHU1OTMxXHU4RDI1XHU3QjU2XHU3NTY1XHVGRjA5JyxcbiAgICAnZXhlYy5mbG93UnVuJzogJ1x1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYwOFJ1biBcdThCRTZcdTYwQzVcdTc3MEJcdThGREJcdTVFQTZcdTRFMEVcdTYyMTBcdTY3MkNcdUZGMDknLFxuICAgICdleGVjLmZsb3dNZW1vcnknOiAnXHU4MUVBXHU1MkE4XHU2M0QwXHU3MEJDXHU4QkIwXHU1RkM2XHVGRjA4XHU4QkIwXHU1RkM2XHU5NzYyXHU2NzdGXHU3ODZFXHU4QkE0XHVGRjA5JyxcbiAgICAnZXhlYy5wbGFubmluZyc6ICdcdTdGMTZcdTYzOTJcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhMTE0gXHU2QjYzXHU1NzI4XHU2MkM2XHU4OUUzXHU0RUZCXHU1MkExXHVGRjBDXHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXG4gICAgJ2V4ZWMuY29sLnN0ZXBzJzogJ1x1NkI2NVx1OUFBNCcsXG4gICAgJ25vdGVzLmVkaXQnOiAnXHU3RjE2XHU4RjkxJyxcbiAgICAnbm90ZXMudG9NZW1vcnknOiAnXHU4RjZDXHU4QkIwXHU1RkM2JyxcbiAgICAnbm90ZXMudG9NZW1vcnlIaW50JzogJ1x1NjI4QVx1OEZEOVx1Njc2MVx1N0IxNFx1OEJCMFx1NzY4NFx1NjgwN1x1OTg5OFx1NEUwRVx1NTE4NVx1NUJCOVx1NTg2Qlx1NTE2NVx1NEUwQlx1NjVCOVx1OEJCMFx1NUZDNlx1ODg2OFx1NTM1NVx1RkYwQ1x1Nzg2RVx1OEJBNFx1NTQwRVx1NTE2NVx1NUU5MycsXG4gICAgJ25vdGVzLnRvTWVtb3J5RG9uZSc6ICdcdTI3MTMgXHU1REYyXHU1ODZCXHU1MTY1XHU4QkIwXHU1RkM2XHU4ODY4XHU1MzU1XHVGRjA4XHU1NzI4XHU0RTBCXHU2NUI5XHUzMDBDXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHUzMDBEXHU1MzNBXHU3ODZFXHU4QkE0XHU3QzdCXHU1NzhCXHU1NDBFXHU2REZCXHU1MkEwXHVGRjA5JyxcbiAgICAnbm90ZXMuY29weU1kJzogJ1x1NTkwRFx1NTIzNiBNRCcsXG4gICAgJ25vdGVzLmNvcHlNZEhpbnQnOiAnXHU2MjhBXHU4RkQ5XHU2NzYxXHU3QjE0XHU4QkIwXHU1OTBEXHU1MjM2XHU0RTNBIE1hcmtkb3duIFx1NTIzMFx1NTI2QVx1OEQzNFx1Njc3RicsXG4gICAgJ25vdGVzLmNvcHlNZERvbmUnOiAnXHU1REYyXHU1OTBEXHU1MjM2XHU0RTNBIE1hcmtkb3duJyxcbiAgICAnbm90ZXMuZXhwb3J0TWQnOiAnXHU1QkZDXHU1MUZBIE1EJyxcbiAgICAnbm90ZXMuZXhwb3J0TWRIaW50JzogJ1x1NEUwQlx1OEY3RFx1NEUzQSAubWQgXHU2NTg3XHU0RUY2JyxcbiAgICAnbm90ZXMuZXhwb3J0RG9uZSc6ICdcdTVERjJcdTVCRkNcdTUxRkFcdTRFM0EgLm1kIFx1NjU4N1x1NEVGNicsXG4gICAgJ25vdGVzLmRpZ2VzdE5ldmVyJzogJ1x1NUMxQVx1NjcyQVx1NzUxRlx1NjIxMFx1OEZDNyBBSSBcdTYwM0JcdTdFRDMnLFxuICAgICdub3Rlcy5kaWdlc3RQZW5kaW5nJzogJ1x1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NTQwRVx1NjcwOSB7bn0gXHU0RTJBXHU2NUIwXHU2M0QwXHU0RUE0XHU2NzJBXHU2RDg4XHU1MzE2JyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlJzogJ1x1NUI1OFx1NEUzQVx1N0IxNFx1OEJCMCcsXG4gICAgJ2RldGFpbC5zYXZlTm90ZUhpbnQnOiAnXHU2MjhBXHU2NzJDXHU2QjIxXHU2ODM4XHU2N0U1XHU3RUQzXHU4QkJBXHVGRjA4XHU2NTM5XHU0RTg2XHU0RUMwXHU0RTQ4L1x1NUI5RVx1NzNCMFx1OTAzQlx1OEY5MS9cdTk4Q0VcdTk2NjlcdTcwQjlcdUZGMDlcdTRFMDBcdTk1MkVcdTVCNThcdTRFM0FcdTdFRDNcdTY3ODRcdTUzMTZcdTdCMTRcdThCQjAnLFxuICAgICdkZXRhaWwuc2F2ZU5vdGVUaXRsZSc6ICdcdTY4MzhcdTY3RTVcdThCQjBcdTVGNTUnLFxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeSc6ICdcdTZDODlcdTZEQzBcdTRFM0FcdThCQjBcdTVGQzYnLFxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeUhpbnQnOiAnXHU2MjhBXHU2NzJDXHU2QjIxXHU2ODM4XHU2N0U1XHU3RUQzXHU4QkJBXHU2Qzg5XHU2REMwXHU0RTNBXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHVGRjA4XHU4RkRCXHU1MTY1XHU1Rjg1XHU3ODZFXHU4QkE0XHU5NjFGXHU1MjE3XHVGRjA5JyxcbiAgICAnbm90ZXMuc2F2ZSc6ICdcdTRGRERcdTVCNTgnLFxuICAgICdub3Rlcy5jYW5jZWwnOiAnXHU1M0Q2XHU2RDg4JyxcbiAgICAnbWVtb3J5LmJyYW5jaFNjb3BlJzogJ1x1NTIwNlx1NjUyRicsXG4gICAgJ21lbW9yeS5icmFuY2hBbGwnOiAnXHU1MTY4XHU5MEU4XHU1MjA2XHU2NTJGJyxcbiAgICAnbm90ZXMuc2VhcmNoJzogJ1x1NjQxQ1x1N0QyMlx1N0IxNFx1OEJCMFx1MjAyNicsXG4gICAgJ21vZGVsLnRpdGxlJzogJ1x1NkEyMVx1NTc4Qlx1NTIwNlx1OTE0RFx1RkYwOFx1ODlFM1x1OEJGQiAvIFx1NjAzQlx1N0VEM1x1N0I0OVx1NEVGQlx1NTJBMVx1NzUyOFx1NTRFQVx1NEUyQVx1NkEyMVx1NTc4Qlx1RkYwOScsXG4gICAgJ21vZGVsLmxvYWRpbmcnOiAnXHU4QkZCXHU1M0Q2XHU2QTIxXHU1NzhCXHU2RTA1XHU1MzU1XHUyMDI2JyxcbiAgICAnbW9kZWwuZm9sbG93Q2hhdCc6ICdcdThEREZcdTk2OEZcdTgwNEFcdTU5MjlcdTZBMjFcdTU3OEInLFxuICAgICdtb2RlbC5zYXZlJzogJ1x1NEZERFx1NUI1OFx1NUU3Nlx1NzUxRlx1NjU0OCcsXG4gICAgJ21vZGVsLnNhdmVkJzogJ1x1NURGMlx1NzUxRlx1NjU0OCcsXG4gICAgJ21vZGVsLmhpbnQnOiAnXHU0RkREXHU1QjU4XHU1NDBFXHU3QUNCXHU1MzczXHU3NTFGXHU2NTQ4XHU1RTc2XHU2MzAxXHU0RTQ1XHU1MzE2XHVGRjA4XHU5MUNEXHU1NDJGXHU1NDBFXHU0RkREXHU3NTU5XHVGRjA5XHVGRjFCXHU0RTBEXHU1RjcxXHU1NENEXHU4MDRBXHU1OTI5XHU2QTIxXHU1NzhCXHUzMDAyJyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5JzogJ0FJIFx1NjAzQlx1N0VEM1x1N0IxNFx1OEJCMCcsXG4gICAgJ25vdGVzLmFpU3VtbWFyeVJ1bic6ICdcdTYwM0JcdTdFRDNcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhcdTdFQTYgMTAtMzAgXHU3OUQyXHVGRjA5JyxcbiAgICAnbm90ZXMuZXhwYW5kJzogJ1x1NUM1NVx1NUYwMFx1NTE2OFx1NjU4NycsXG4gICAgJ25vdGVzLmNvbGxhcHNlJzogJ1x1NjUzNlx1OEQ3NycsXG4gICAgJ25vdGVzLnN1bW1hcnlUYWcnOiAnQUkgXHU2MDNCXHU3RUQzJyxcbiAgICAnbm90ZXMuZW1wdHlTZWFyY2gnOiAnXHU2NUUwXHU1MzM5XHU5MTREXHU3QjE0XHU4QkIwXHUzMDAyJyxcbiAgICAnbm90ZXMuY29udGVudEhpbnQnOiAnXHU3QjE0XHU4QkIwXHU1MTg1XHU1QkI5XHVGRjA4XHU2NTJGXHU2MzAxXHU1OTFBXHU4ODRDXHVGRjA5XHVGRjFBXHU3RUQzXHU4QkJBXHUzMDAxXHU3NTkxXHU5NUVFXHUzMDAxXHU1QjY2XHU0RTYwXHU4OTgxXHU3MEI5XHUzMDAxXHU1MTczXHU5NTJFXHU1MUIzXHU3QjU2XHUyMDI2JyxcbiAgICAnbm90ZXMudGFnc0hpbnQnOiAnXHU2ODA3XHU3QjdFXHVGRjA4XHU5MDE3XHU1M0Y3XHU1MjA2XHU5Njk0XHVGRjBDXHU5MDA5XHU1ODZCXHVGRjFCXHU0RkREXHU1QjU4XHU1NDBFXHU1M0VGXHU3MEI5XHU1MUZCXHU3QjVCXHU5MDA5XHVGRjA5JyxcbiAgICAnbm90ZXMucGluJzogJ1x1N0Y2RVx1OTg3NicsXG4gICAgJ25vdGVzLnVucGluJzogJ1x1NTNENlx1NkQ4OFx1N0Y2RVx1OTg3NicsXG4gICAgJ25vdGVzLmVkaXRlZEF0JzogJ1x1N0YxNlx1OEY5MVx1NEU4RScsXG4gICAgJ3Jldmlldy5maWx0ZXJBbGwnOiAnXHU1MTY4XHU5MEU4JyxcbiAgICAncmV2aWV3LnN0YXR1c0FsbCc6ICdcdTUxNjhcdTkwRThcdTcyQjZcdTYwMDEnLFxuICAgICdyZXZpZXcudmVyaWZ5JzogJ1x1NTkwRFx1NjhDMCcsXG4gICAgJ3Jldmlldy52ZXJpZnlSdW5uaW5nJzogJ1x1NTkwRFx1NjhDMFx1NEUyRFx1MjAyNicsXG4gICAgJ3Jldmlldy52ZXJpZnlIaW50JzogJ1x1NEZFRVx1NjUzOVx1NEVFM1x1NzgwMVx1NTQwRVx1NzBCOVx1NTFGQlx1RkYxQVx1ODFFQVx1NTJBOFx1NjhDMFx1NkQ0Qlx1OTVFRVx1OTg5OFx1NjYyRlx1NTQyNlx1NEZFRVx1NTkwRFx1MzAwMVx1NjUzOVx1NTJBOFx1NjYyRlx1NTQyNlx1NjcwMFx1NEYxOC9cdTY3MDBcdTVDMEZcdTRGQjVcdTUxNjVcdTMwMDFcdTY3MDlcdTY1RTBcdTY1QjBcdTk1RUVcdTk4OThcdUZGMUJcdTUxNjhcdTkwRThcdTkwMUFcdThGQzdcdTYyNERcdTgxRUFcdTUyQThcdTdGNkVcdTRFM0FcdTVERjJcdTg5RTNcdTUxQjMnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZSc6ICdcdTUyMjRcdTVCOUFcdThCRUZcdTYyQTUnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZUhpbnQnOiAnXHU0RUJBXHU1REU1XHU1MjI0XHU1QjlBXHU4QkU1XHU5NUVFXHU5ODk4XHU0RTNBXHU4QkVGXHU2MkE1XHU1RTc2XHU1MTczXHU5NUVEXHVGRjA4XHU0RTBFXHU1OTBEXHU2OEMwXHU4OUUzXHU1MUIzXHU3Njg0XHU4QkVEXHU0RTQ5XHU0RTBEXHU1NDBDXHVGRjA5JyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVUaXRsZSc6ICdcdTUyMjRcdTVCOUFcdTRFM0FcdThCRUZcdTYyQTVcdUZGMUYnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZU1zZyc6ICdcdTMwMEN7dGl0bGV9XHUzMDBEXHU1QzA2XHU4OEFCXHU2ODA3XHU4QkIwXHU0RTNBXHU4QkVGXHU2MkE1XHVGRjA4XHU1REYyXHU2MkQyXHU3RUREXHVGRjA5XHU1RTc2XHU0RUNFXHU1Rjg1XHU1OTA0XHU3NDA2XHU0RTJEXHU3OUZCXHU5NjY0XHUzMDAyJyxcbiAgICAncmV2aWV3LmZpeERldGFpbCc6ICdcdTRGRUVcdTU5MERcdThCRTZcdTYwQzUnLFxuICAgICdyZXZpZXcuZml4U3RhdEZpbGVzJzogJ1x1NjU4N1x1NEVGNicsXG4gICAgJ3Jldmlldy5maXhGaWxlcyc6ICdcdTRGRUVcdTU5MERcdTZEODlcdTUzQ0FcdTY1ODdcdTRFRjYnLFxuICAgICdyZXZpZXcuZml4SW1wYWN0JzogJ1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNFx1RkYwOFx1NjUzOVx1NTJBOFx1N0IyNlx1NTNGN1x1NEUwRVx1OEMwM1x1NzUyOFx1NzBCOVx1RkYwOScsXG4gICAgJ3Jldmlldy5kZWZpbmVkSW4nOiAnXHU1QjlBXHU0RTQ5XHU0RThFJyxcbiAgICAncmV2aWV3LmNhbGxDb3VudCc6ICdcdTU5MDRcdThDMDNcdTc1MjgnLFxuICAgICdyZXZpZXcuZml4RGlmZic6ICdcdTRGRUVcdTU5MERcdTVERUVcdTVGMDJcdUZGMDhcdTc2RjhcdTVCRjlcdThCQzRcdTVCQTFcdTU3RkFcdTdFQkZcdUZGMDknLFxuICAgICdyZXZpZXcucmVmcmVzaCc6ICdcdTUyMzdcdTY1QjAnLFxuICAgICdyZXZpZXcucmV0ZW50aW9uSGludCc6ICdcdTVERjJcdTg5RTNcdTUxQjNcdTk1RUVcdTk4OThcdTRGRERcdTc1NTkge2RheXN9IFx1NTkyOVx1NTQwRVx1ODFFQVx1NTJBOFx1NkUwNVx1NzQwNicsXG4gICAgJ3Jldmlldy50YXJnZXQnOiAnXHU1QkY5XHU4QzYxJyxcbiAgICAncmV2aWV3LndvcmtpbmdUYXJnZXQnOiAnXHU1REU1XHU0RjVDXHU1MzNBJyxcblxuICAgICdwbGFuLnRpdGxlJzogJ1x1N0YxNlx1NjM5Mlx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNCcsXG4gICAgJ3BsYW4uaGludCc6ICdcdTZCQ0ZcdTZCNjVcdTc2ODRcdTg5RDJcdTgyNzJcdTUxQjNcdTVCOUFcdTRFMEFcdTRFMEJcdTY1ODdcdTZDRThcdTUxNjVcdTRFMEVcdTlFRDhcdThCQTRcdTZBMjFcdTU3OEJcdUZGMDhcdTUyMDZcdTY3OTAvXHU2NENEXHU0RjVDPWZhc3RcdUZGMENcdTVGMDBcdTUzRDE9c3RhbmRhcmRcdUZGMENcdTg5QzRcdTUyMTI9cmVhc29uaW5nXHVGRjBDXHU5QThDXHU2NTM2PXZlcmlmaWVyXHVGRjA5XHVGRjFCXHU1M0VGXHU4QzAzXHU2NTc0XHU1NDBFXHU1MThEXHU1NDJGXHU1MkE4XHUzMDAyJyxcbiAgICAncGxhbi5jb2wuc3RlcCc6ICdcdTZCNjVcdTlBQTQnLCAncGxhbi5jb2wucm9sZSc6ICdcdTg5RDJcdTgyNzInLCAncGxhbi5jb2wubW9kZWwnOiAnXHU2QTIxXHU1NzhCJywgJ3BsYW4uY29sLnBvbGljeSc6ICdcdTU5MzFcdThEMjVcdTdCNTZcdTc1NjUnLCAncGxhbi5jb2wuZW5hYmxlZCc6ICdcdTU0MkZcdTc1MjgnLCAncGxhbi5jb2wuYXR0ZW1wdHMnOiAnXHU1QzFEXHU4QkQ1JyxcbiAgICAncGxhbi5tb2RlbERlZmF1bHQnOiAnXHU4RERGXHU5NjhGXHU4OUQyXHU4MjcyXHU5RUQ4XHU4QkE0JyxcbiAgICAncGxhbi5sYXVuY2hFZGl0ZWQnOiAnXHU0RkREXHU1QjU4XHU0RkVFXHU2NTM5XHU1RTc2XHU1NDJGXHU1MkE4JyxcbiAgICAncGxhbi5sYXVuY2hEaXJlY3QnOiAnXHU2MzA5XHU1MzlGXHU4QkExXHU1MjEyXHU1NDJGXHU1MkE4JyxcbiAgICAncGxhbi5kaXNjYXJkJzogJ1x1NjUzRVx1NUYwMycsXG4gICAgJ3BsYW4udmlld0RldGFpbCc6ICdcdThCRTZcdTYwQzUnLCAncGxhbi5yZWZyZXNoRGV0YWlsJzogJ1x1NTIzN1x1NjVCMCcsICdwbGFuLmNsb3NlRGV0YWlsJzogJ1x1NjUzNlx1OEQ3NycsXG4gICAgJ3BsYW4uZGV0YWlsVGl0bGUnOiAnUnVuIFx1OEJFNlx1NjBDNScsXG4gICAgJ3BsYW4ucGF1c2VkQmFubmVyJzogJ1x1NEVGQlx1NTJBMVx1NURGMlx1NjY4Mlx1NTA1Q1x1RkYwQ1x1N0I0OVx1NUY4NVx1NEY2MFx1NzY4NFx1NTFCM1x1N0I1NicsXG4gICAgJ3BsYW4ucmVzdW1lUmV0cnknOiAnXHU5MUNEXHU4QkQ1XHU4QkU1XHU2QjY1XHU5QUE0XHU1RTc2XHU3RUU3XHU3RUVEJyxcbiAgICAncGxhbi5yZXN1bWVTa2lwJzogJ1x1OERGM1x1OEZDN1x1OEJFNVx1NkI2NVx1OUFBNFx1N0VFN1x1N0VFRCcsXG4gICAgJ3BsYW4ucmVzdW1lRmFpbGVkJzogJ1x1NEVDRVx1NTkzMVx1OEQyNVx1NTkwNFx1NjA2Mlx1NTkwRCcsXG4gICAgJ3BsYW4uY29udGV4dFRpdGxlJzogJ1x1NEVGQlx1NTJBMVx1NEUwQVx1NEUwQlx1NjU4N1x1RkYwOFx1NjcyQyBSdW4gXHU2Q0U4XHU1MTY1XHU0RTg2XHU0RUMwXHU0RTQ4XHVGRjA5JyxcbiAgICAncGxhbi5icmFuY2gnOiAnXHU1MjA2XHU2NTJGJywgJ3BsYW4uaW5qZWN0ZWRNZW1vcmllcyc6ICdcdTZDRThcdTUxNjVcdThCQjBcdTVGQzYnLCAncGxhbi5kZWNpc2lvbkxvZyc6ICdcdTUxQjNcdTdCNTZcdTY1RTVcdTVGRDcnLFxuICAgICdleGVjLmNvbC5kZXRhaWwnOiAnXHU4QkU2XHU2MEM1JyxcblxuICAgICdzY2hlZC50aXRsZSc6ICdcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTEnLFxuICAgICdzY2hlZC5mb3JtTmFtZSc6ICdcdTRFRkJcdTUyQTFcdTU0MERcdTc5RjAnLCAnc2NoZWQuZm9ybUludGVydmFsJzogJ1x1OTVGNFx1OTY5NFx1RkYwOFx1NTIwNlx1OTQ5Rlx1RkYwOScsXG4gICAgJ3NjaGVkLnR5cGVSZXZpZXcnOiAnXHU4MUVBXHU1MkE4XHU4QkM0XHU1QkExJywgJ3NjaGVkLnR5cGVTdW1tYXJ5JzogJ0FJIFx1NjAzQlx1N0VEMycsICdzY2hlZC50eXBlUnVuJzogJ1x1NUI5QVx1NjVGNlx1NjI2N1x1ODg0QycsXG4gICAgJ3NjaGVkLmFkZCc6ICdcdTUyMUJcdTVFRkEnLFxuICAgICdzY2hlZC5oaW50JzogJ1x1NTIzMFx1NzBCOVx1ODFFQVx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYxQVx1ODFFQVx1NTJBOFx1OEJDNFx1NUJBMT1cdThCQzRcdTVCQTFcdThGRDEgMjQgXHU1QzBGXHU2NUY2XHU3Njg0XHU2NUIwXHU2M0QwXHU0RUE0XHVGRjA4XHU5NUVFXHU5ODk4XHU4RkRCIFJldmlldyBcdTk3NjJcdTY3N0ZcdUZGMDlcdUZGMUJBSSBcdTYwM0JcdTdFRDM9XHU3NTFGXHU2MjEwXHU1ODlFXHU5MUNGXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzXHVGRjFCXHU1QjlBXHU2NUY2XHU2MjY3XHU4ODRDPVx1NjMwOVx1NkEyMVx1Njc3Rlx1OEREMVx1NEUwMFx1NkIyMVx1N0YxNlx1NjM5Mlx1NEVGQlx1NTJBMVx1MzAwMlx1NjcwMFx1NUMwRiAxIFx1NTIwNlx1OTQ5Rlx1MzAwMicsXG4gICAgJ3NjaGVkLmVtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1MzAwMicsXG4gICAgJ3NjaGVkLmNvbC5uYW1lJzogJ1x1NTQwRFx1NzlGMCcsICdzY2hlZC5jb2wudHlwZSc6ICdcdTdDN0JcdTU3OEInLCAnc2NoZWQuY29sLmludGVydmFsJzogJ1x1NTQ2OFx1NjcxRicsICdzY2hlZC5jb2wubmV4dCc6ICdcdTRFMEJcdTZCMjFcdTYyNjdcdTg4NEMnLCAnc2NoZWQuY29sLmxhc3RSZXN1bHQnOiAnXHU0RTBBXHU2QjIxXHU3RUQzXHU2NzlDJywgJ3NjaGVkLmNvbC5hY3Rpb25zJzogJ1x1NjRDRFx1NEY1QycsXG4gICAgJ3NjaGVkLmRheSc6ICcgXHU1OTI5JywgJ3NjaGVkLmhvdXInOiAnIFx1NUMwRlx1NjVGNicsICdzY2hlZC5taW51dGUnOiAnIFx1NTIwNlx1OTQ5RicsXG4gICAgJ3NjaGVkLmRpc2FibGUnOiAnXHU2NjgyXHU1MDVDJywgJ3NjaGVkLmVuYWJsZSc6ICdcdTU0MkZcdTc1MjgnLCAnc2NoZWQucnVuTm93JzogJ1x1N0FDQlx1NTM3M1x1NjI2N1x1ODg0QycsXG5cbiAgICAnbWVtb3J5LnpvbmVUaXRsZSc6ICdcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzYnLFxuICAgICdtZW1vcnkuc3luY0Jhc2VsaW5lJzogJ1x1NTQwQ1x1NkI2NVx1NTdGQVx1N0VCRicsICdtZW1vcnkuc3luY05vbmUnOiAnXHU2NzJBXHU1NDBDXHU2QjY1JyxcbiAgICAnbWVtb3J5LmJlaGluZCc6ICdcdTg0M0RcdTU0MEUge259IFx1NEUyQVx1NjNEMFx1NEVBNFx1NjcyQVx1NTQwQ1x1NkI2NScsXG4gICAgJ21lbW9yeS5zeW5jJzogJ1x1NTQwQ1x1NkI2NVx1OEJCMFx1NUZDNicsICdtZW1vcnkuc3luY2luZyc6ICdcdTU0MENcdTZCNjVcdTRFMkRcdTIwMjYnLCAnbWVtb3J5LnN5bmNGYWlsZWQnOiAnXHU1NDBDXHU2QjY1XHU1OTMxXHU4RDI1JyxcbiAgICAnbWVtb3J5LnN0YWxlVGl0bGUnOiAnXHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2XHVGRjA4XHU3NkY4XHU1MTczXHU0RUUzXHU3ODAxXHU1REYyXHU4OEFCXHU2NTM5XHU1MkE4XHVGRjBDXHU1Rjg1XHU0RjYwXHU1OTBEXHU2ODM4XHVGRjA5JyxcbiAgICAnbWVtb3J5Lm1hcmtTdGFsZSc6ICdcdTY4MDdcdThCQjBcdThGQzdcdTY1RjYnLCAnbWVtb3J5LmFyY2hpdmVCdG4nOiAnXHU1RjUyXHU2ODYzJywgJ21lbW9yeS5rZWVwQWN0aXZlJzogJ1x1NEVDRFx1NjcwOVx1NjU0OCcsXG4gICAgJ21lbW9yeS5uZXdDYW5kaWRhdGVzJzogJ1x1NjVCMFx1NTg5RVx1NTAxOVx1OTAwOVx1RkYwOFx1NURGMlx1NTE2NVx1NUY4NVx1Nzg2RVx1OEJBNFx1OTYxRlx1NTIxN1x1RkYwOVx1RkYxQScsXG4gICAgJ21lbW9yeS5jbG9zZVJlcG9ydCc6ICdcdTUxNzNcdTk1RURcdTYyQTVcdTU0NEEnLFxuICAgICdtZW1vcnkuc2NvcGVQcm9qZWN0JzogJ1x1NEUzQlx1NUU3Mlx1RkYwOFx1NTE2OFx1NTIwNlx1NjUyRlx1RkYwOScsICdtZW1vcnkuc2NvcGVCcmFuY2gnOiAnXHU0RUM1XHU1RjUzXHU1MjREXHU1MjA2XHU2NTJGJyxcbiAgICAnbWVtb3J5LnBlbmRpbmdRdWV1ZSc6ICdcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTcnLFxuICAgICdtZW1vcnkudG9Ob3RlJzogJ1x1OEY2Q1x1N0IxNFx1OEJCMCcsICdtZW1vcnkubm9ybWFsaXplJzogJ1x1NUY1Mlx1NEUwMFx1NTIzMFx1NEUzQlx1NUU3MicsICdtZW1vcnkucmVzdG9yZSc6ICdcdTYwNjJcdTU5MEQnLFxuICAgICdtZW1vcnkuc3RhdHVzU3RhbGUnOiAnXHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2JyxcbiAgICAnaW1wYWN0LmZ1bmN0aW9uc05vbmUnOiAnXHU2NzJBXHU4QkM2XHU1MjJCXHU1MUZBXHU1MUZEXHU2NTcwXHU3RUE3XHU4QzAzXHU3NTI4XHU1M0Q4XHU1MzE2XHVGRjA4XHU1M0VGXHU4MEZEXHU2NjJGXHU2ODM3XHU1RjBGL1x1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MC9cdTdFQUZcdTkxNERcdTdGNkVcdTY1MzlcdTUyQThcdUZGMDlcdTMwMDInLFxuICAgICdyZXZpZXcuY29sLnNldmVyaXR5JzogJ1x1N0VBN1x1NTIyQicsXG4gICAgJ3Jldmlldy5jb2wuY2F0ZWdvcnknOiAnXHU3QzdCXHU1MjJCJyxcbiAgICAncmV2aWV3LmNvbC50aXRsZSc6ICdcdTk1RUVcdTk4OTgnLFxuICAgICdyZXZpZXcuY29sLmV2aWRlbmNlJzogJ1x1NEY0RFx1N0Y2RScsXG4gICAgJ3Jldmlldy5jb2wuZml4JzogJ1x1NUVGQVx1OEJBRVx1NEZFRVx1NTkwRCcsXG4gICAgJ3Jldmlldy5oaW50JzogJ1x1NzBCOVx1NTFGQlx1NEUwQVx1NjVCOVx1NjMwOVx1OTRBRVx1NUYwMFx1NTlDQlx1NjgzOFx1NjdFNVx1RkYwQ1x1NEVBN1x1NTFGQVx1NjcwMFx1NEYxOFx1NjAyN1x1N0VEM1x1OEJCQVx1NEUwRVx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1MzAwMicsXG4gICAgJ2RpZmYuc2hvdyc6ICdcdTVCRjlcdTZCRDQnLFxuICAgICdkaWZmLmhpZGUnOiAnXHU2NTM2XHU4RDc3XHU1REVFXHU1RjAyJyxcblxuICAgICdkZXRhaWwudGl0bGUnOiAnXHU2ODM4XHU2N0U1XHU4QkU2XHU2MEM1JyxcbiAgICAnZGV0YWlsLnBpY2snOiAnXHUyMTkwIFx1NEVDRVx1NURFNlx1NEZBN1x1OTAwOVx1NjJFOVx1NEUwMFx1NkIyMVx1NjNEMFx1NEVBNFx1RkYwOFx1NjIxNlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOVx1NUYwMFx1NTlDQlx1NjgzOFx1NjdFNScsXG4gICAgJ2RldGFpbC53aGF0JzogJ1x1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OCcsXG4gICAgJ2RldGFpbC5sb2dpYyc6ICdcdTVCOUVcdTczQjBcdTkwM0JcdThGOTEnLFxuICAgICdkZXRhaWwucmlzayc6ICdcdTk4Q0VcdTk2NjlcdTcwQjknLFxuICAgICdkZXRhaWwuZmlsZXMnOiAnXHU2NTg3XHU0RUY2XHU2RTA1XHU1MzU1JyxcbiAgICAnZGV0YWlsLnBhdGNoJzogJ1x1NjdFNVx1NzcwQlx1ODg2NVx1NEUwMVx1NTM5Rlx1NjU4NycsXG4gICAgJ2RldGFpbC5haUxvYWRpbmcnOiAnQUkgXHU4OUUzXHU4QkZCXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4XHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXG4gICAgJ2RldGFpbC5xdWV1ZWQnOiAnXHU4RkQ4XHU2NzA5IHtufSBcdTRFMkFcdTg5RTNcdThCRkJcdTYzOTJcdTk2MUZcdTRFMkRcdUZGMDhcdTgxRUFcdTUyQThcdTVFNzZcdTUzRDFcdTYyNjdcdTg4NENcdUZGMDknLFxuICAgICdkZXRhaWwuY2FyZFF1ZXVlZCc6ICdcdTYzOTJcdTk2MUZcdTdCNDlcdTVGODUgQUkgXHU4OUUzXHU4QkZCXHVGRjA4XHU1RTc2XHU1M0QxXHU0RTBBXHU5NjUwIDNcdUZGMENcdTkwN0ZcdTUxNERcdTYyNTNcdTZFRTFcdTZBMjFcdTU3OEJcdTdGNTFcdTUxNzNcdUZGMDknLFxuICAgICdkZXRhaWwuaW1wYWN0JzogJ1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNFx1NTIwNlx1Njc5MCcsXG4gICAgJ2RldGFpbC5pbXBhY3RMb2FkaW5nJzogJ1x1NUY3MVx1NTRDRFx1NjI2Qlx1NjNDRlx1NEUyRFx1MjAyNlx1RkYwOFx1NUYxNVx1NzUyOFx1NjhDMFx1N0QyMiArIFx1NTZGRVx1OEMzMVx1NEYyMFx1NjRBRFx1RkYwOScsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5JzogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNScsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZyc6ICdcdThCQzRcdTVCQTFcdTRFMkRcdTIwMjZcdUZGMDhcdTRGMUFcdTRFQTdcdTUxRkFcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTRFMEVcdTY3MDBcdTRGMThcdTYwMjdcdTdFRDNcdThCQkFcdUZGMDknLFxuXG4gICAgJ2ltcGFjdC5yaXNrJzogJ1x1OThDRVx1OTY2OScsXG4gICAgJ2ltcGFjdC5jb2wuY2hhbmdlZCc6ICdcdTUzRDhcdTY2RjRcdTY1ODdcdTRFRjYnLFxuICAgICdpbXBhY3QuY29sLmluZGlyZWN0JzogJ1x1OTVGNFx1NjNBNVx1NUY3MVx1NTRDRFx1RkYwOFx1NUYxNVx1NzUyOFx1OTRGRVx1RkYwOScsXG4gICAgJ2ltcGFjdC5jb2wucG90ZW50aWFsJzogJ1x1NkY1Q1x1NTcyOFx1NUY3MVx1NTRDRCcsXG4gICAgJ2ltcGFjdC5ub25lJzogJ1x1NjcyQVx1NTNEMVx1NzNCMFx1NEVEM1x1NUU5M1x1NTE4NVx1NUYxNVx1NzUyOFx1ODAwNVx1RkYwOFx1NjUzOVx1NTJBOFx1NzcwQlx1NEYzQ1x1NzJFQ1x1N0FDQlx1RkYwOVx1MzAwMicsXG4gICAgJ2ltcGFjdC50ZXN0cyc6ICdcdTUxNzNcdTgwNTRcdTZENEJcdThCRDUnLFxuICAgICdpbXBhY3QubGVnZW5kLmNoYW5nZWQnOiAnXHU1M0Q4XHU2NkY0JyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5pbmRpcmVjdCc6ICdcdTk1RjRcdTYzQTUnLFxuICAgICdpbXBhY3QubGVnZW5kLnBvdGVudGlhbCc6ICdcdTZGNUNcdTU3MjgnLFxuXG4gICAgJ3Jldmlldy52ZXJkaWN0JzogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1N0VEM1x1OEJCQScsXG4gICAgJ3Jldmlldy5pc3N1ZXMnOiAnXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1JyxcbiAgICAncmV2aWV3LmNsZWFuJzogJ1x1NjcyQVx1NTNEMVx1NzNCMFx1OTVFRVx1OTg5OFx1MzAwMicsXG5cbiAgICAnbm90ZXMudGl0bGUnOiAnXHU2ODM4XHU2N0U1XHU3QjE0XHU4QkIwJyxcbiAgICAnbm90ZXMuZm9ybVRpdGxlJzogJ1x1N0IxNFx1OEJCMFx1NjgwN1x1OTg5OCcsXG4gICAgJ25vdGVzLmZvcm1Db250ZW50JzogJ1x1N0IxNFx1OEJCMFx1NTE4NVx1NUJCOVx1RkYwOFx1N0VEM1x1OEJCQVx1MzAwMVx1NzU5MVx1OTVFRVx1MzAwMVx1NUI2Nlx1NEU2MFx1ODk4MVx1NzBCOVx1MjAyNlx1RkYwOScsXG4gICAgJ25vdGVzLmFkZCc6ICdcdTZERkJcdTUyQTBcdTdCMTRcdThCQjAnLFxuICAgICdub3Rlcy5ib3VuZFRvJzogJ1x1NUMwNlx1NTE3M1x1ODA1NFx1NTIzMCcsXG4gICAgJ25vdGVzLmNvbC50aW1lJzogJ1x1NjVGNlx1OTVGNCcsXG4gICAgJ25vdGVzLmNvbC50aXRsZSc6ICdcdTY4MDdcdTk4OTgnLFxuICAgICdub3Rlcy5jb2wuY29udGVudCc6ICdcdTUxODVcdTVCQjknLFxuICAgICdub3Rlcy5jb2wuc2hhJzogJ1x1NTE3M1x1ODA1NFx1NjNEMFx1NEVBNCcsXG4gICAgJ25vdGVzLnJlbW92ZSc6ICdcdTUyMjBcdTk2NjQnLFxuICAgICdub3Rlcy5lbXB0eSc6ICdcdThGRDhcdTZDQTFcdTY3MDlcdTdCMTRcdThCQjBcdTMwMDJcdTY4MzhcdTY3RTVcdTYzRDBcdTRFQTRcdTY1RjZcdTk2OEZcdTYyNEJcdThCQjBcdTRFMEJcdTdFRDNcdThCQkFcdTRFMEVcdTc1OTFcdTk1RUVcdUZGMENcdTVDMzFcdTY2MkZcdTRGNjBcdTc2ODRcdTk4NzlcdTc2RUVcdTVCNjZcdTRFNjBcdTY4NjNcdTY4NDhcdTMwMDInLFxuXG4gICAgJ21lbW9yeS5yZWNvcmQnOiAnXHU4QkIwXHU1RjU1XHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2JyxcbiAgICAnZm9ybS5tZW1vcnlUaXRsZSc6ICdcdThCQjBcdTVGQzZcdTY4MDdcdTk4OTgnLFxuICAgICdmb3JtLm1lbW9yeUNvbnRlbnQnOiAnXHU4QkIwXHU1RkM2XHU1MTg1XHU1QkI5XHVGRjA4XHU0RUMwXHU0RTQ4XHU0RTBFXHU0RTNBXHU0RUMwXHU0RTQ4XHVGRjA5JyxcbiAgICAnbWVtb3J5LmNvbC50aXRsZSc6ICdcdTY3NjFcdTc2RUUnLFxuICAgICdtZW1vcnkuY29sLnR5cGUnOiAnXHU3QzdCXHU1NzhCJyxcbiAgICAnbWVtb3J5LmNvbC50cnV0aCc6ICdcdTc3MUZcdTUwM0MnLFxuICAgICdtZW1vcnkuY29sLmJyYW5jaCc6ICdcdTUyMDZcdTY1MkYnLFxuICAgICdtZW1vcnkuY29uZmlybSc6ICdcdTc4NkVcdThCQTQnLFxuICAgICdtZW1vcnkuZW1wdHknOiAnXHU2NjgyXHU2NUUwXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHUzMDAyXHU1M0VGXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1OEJCMFx1NUY1NVx1RkYwQ1x1NjIxNlx1NTcyOFx1NEUwQVx1NjVCOVx1NjI0Qlx1NTJBOFx1NkRGQlx1NTJBMFx1MzAwMicsXG4gICAgJ2NvbmNlcHRzLnRpdGxlJzogJ1x1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNScsXG4gICAgJ2NvbmNlcHRzLm5vbmUnOiAnXHU2NjgyXHU2NUUwXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1XHUzMDAyXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHU4REQxXHU1QjhDXHU1M0Q4XHU2NkY0XHU1NDBFXHU4MUVBXHU1MkE4XHU2Qzg5XHU2REMwXHVGRjBDXHU0RTVGXHU1M0VGXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1NjAzQlx1N0VEM1x1NUI2Nlx1NEU2MFx1ODk4MVx1NzBCOVx1MzAwMicsXG4gICAgJ2NvbmNlcHRzLmNvbC5uYW1lJzogJ1x1Njk4Mlx1NUZGNScsXG4gICAgJ2NvbmNlcHRzLmNvbC5jYXRlZ29yeSc6ICdcdTdDN0JcdTUyMkInLFxuICAgICdjb25jZXB0cy5jb2wuY291bnQnOiAnXHU2QjIxXHU2NTcwJyxcbiAgICAncmV2aWV3LnJlY29yZHNUaXRsZSc6ICdSZXZpZXcgXHU5NUVFXHU5ODk4JyxcbiAgICAncmV2aWV3LnJlY29yZHNFbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTk1RUVcdTk4OThcdThCQjBcdTVGNTVcdTMwMDJcdTYzRDBcdTRFQTRcdTVCQTFcdTY3RTVcdTk4NzVcdThCQzRcdTVCQTFcdTUxRkFcdTc2ODRcdTk1RUVcdTk4OThcdTRGMUFcdTgxRUFcdTUyQThcdTc2N0JcdThCQjBcdTUyMzBcdThGRDlcdTkxQ0NcdUZGMUJcdTkxQ0RcdTY1QjBcdThCQzRcdTVCQTFcdTRGMUFcdTY2RkZcdTYzNjJcdTY1RTdcdThCQjBcdTVGNTVcdTMwMDInLFxuICAgICd2ZXJpZnkucmVjb3Jkcyc6ICdcdTlBOENcdTY1MzZcdThCQjBcdTVGNTUnLFxuICAgICd2ZXJpZnkucmVjb3Jkc0VtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1OUE4Q1x1NjUzNlx1OEJCMFx1NUY1NVx1MzAwMlx1NTcyOFx1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDM1x1NzBCOVx1MzAwQ1x1OUE4Q1x1NjUzNlx1MzAwRFx1NTM3M1x1NzUxRlx1NjIxMFx1MzAwMicsXG5cbiAgICAnY29uZmlybWVkLnRpdGxlJzogJ1x1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1Rlx1RkYwOFx1NEVCQVx1NURFNVx1Nzg2RVx1OEJBNFx1RkYwQ0FJIFx1Nzk4MVx1NjUzOVx1ODFFQVx1NTJBOFx1NjJFNlx1NjIyQVx1RkYwOScsXG4gICAgJ2NvbmZpcm1lZC5hZGQnOiAnXHU2REZCXHU1MkEwXHU3RUE2XHU2NzVGJyxcbiAgICAnY29uZmlybWVkLnRleHQnOiAnXHU3RUE2XHU2NzVGL1x1OTcwMFx1NkM0Mlx1NTE4NVx1NUJCOScsXG4gICAgJ2NvbmZpcm1lZC5wYXRocyc6ICdcdTc5ODFcdTY1MzlcdThERUZcdTVGODRcdUZGMDhcdTkwMTdcdTUzRjdcdTUyMDZcdTk2OTRcdUZGMUJcdTc2RjhcdTVCRjlcdTk4NzlcdTc2RUVcdTY4MzlcdTU5ODIgc3JjL2NvcmVcdUZGMENcdTYyMTZcdTdFRERcdTVCRjlcdThERUZcdTVGODRcdUZGMDknLFxuICAgICdjb25maXJtZWQubm9uZSc6ICdcdTY2ODJcdTY1RTBcdTdFQTZcdTY3NUZcdTMwMDJcdTZERkJcdTUyQTBcdTU0MEVcdUZGMENBSSBcdTRGRUVcdTY1MzlcdTY3MkNcdTk4NzlcdTc2RUVcdTc2ODRcdTc5ODFcdTY1MzlcdThERUZcdTVGODRcdTVDMDZcdTg4QUJcdTgxRUFcdTUyQThcdTYyRDJcdTdFRERcdUZGMDhcdTRFQzVcdTVCRjlcdTY3MkNcdTk4NzlcdTc2RUVcdTc1MUZcdTY1NDhcdUZGMDlcdTMwMDInLFxuXG4gICAgJ2NoYW5nZXMudGl0bGUnOiAnXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExJyxcbiAgICAnc3RhdGUubm9DaGFuZ2VzJzogJ1x1NjY4Mlx1NjVFMFx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1MzAwMlx1NTcyOFx1ODA0QVx1NTkyOVx1NEUyRFx1OEJBOSBBSSBcdTUyMUJcdTVFRkFcdUZGMENcdTYyMTZcdTc1MjhcdTRFMEFcdTY1QjlcdTMwMENcdTY1QjBcdTVFRkFcdTUzRDhcdTY2RjRcdTMwMERcdTMwMDInLFxuICAgICdjaGFuZ2VzLmNvbC50aXRsZSc6ICdcdTY4MDdcdTk4OTgnLFxuICAgICdjaGFuZ2VzLmNvbC50eXBlJzogJ1x1N0M3Qlx1NTc4QicsXG4gICAgJ2NoYW5nZXMuY29sLnN0YXR1cyc6ICdcdTcyQjZcdTYwMDEnLFxuICAgICdjaGFuZ2VzLmNvbC51cGRhdGVkJzogJ1x1NjZGNFx1NjVCMFx1NjVGNlx1OTVGNCcsXG4gICAgJ2V4ZWMuY29sLnN0YXR1cyc6ICdcdTcyQjZcdTYwMDEnLFxuICAgICdleGVjLmNvbC5jaGFuZ2UnOiAnXHU1M0Q4XHU2NkY0JyxcbiAgICAnZXhlYy5jb2wuc3RhcnRlZCc6ICdcdTVGMDBcdTU5Q0InLFxuICAgICdleGVjLmNvbC5jb3N0JzogJ1x1NjIxMFx1NjcyQyhcdTRGMzApJyxcbiAgICAnZXhlYy5hdHRlbXB0cyc6ICdcdTVDMURcdThCRDVcdTZCMjFcdTY1NzAnLFxuICAgICdleGVjLmhpbnQnOiAnXHU2MjY3XHU4ODRDXHVGRjA4c3RhcnRfcnVuXHVGRjA5XHU4QkY3XHU1NzI4XHU1M0YzXHU0RkE3XHU4MDRBXHU1OTI5XHU0RTJEXHU1M0QxXHU4RDc3XHVGRjFBXHU1MjFCXHU1RUZBXHU4QkExXHU1MjEyXHU1NDBFXHU1QkY5IEFJIFx1OEJGNFx1MzAwQ1x1NUYwMFx1NTlDQlx1NjI2N1x1ODg0Q1x1OEJFNSBjaGFuZ2VcdTMwMERcdTMwMDJcdTY3MkNcdTk4NzVcdTY3RTVcdTc3MEJcdThGREJcdTVFQTZcdTRFMEVcdTdFRDNcdTY3OUNcdTMwMDInLFxuICAgICdzdGF0ZS5ub1J1bnMnOiAnXHU2NjgyXHU2NUUwXHU2MjY3XHU4ODRDXHU4QkIwXHU1RjU1XHUzMDAyJyxcbiAgICAnc3RhdGUudGVjaFN0YWNrJzogJ1x1NjI4MFx1NjcyRlx1NjgwOCcsXG4gICAgJ3N0YXRlLnN5bWJvbHMnOiAnXHU1REYyXHU3RDIyXHU1RjE1XHU3QjI2XHU1M0Y3JyxcbiAgICAnc3RhdGUubWFuaWZlc3RzJzogJ1x1NkUwNVx1NTM1NVx1NjU4N1x1NEVGNicsXG4gICAgJ3N0YXRlLmV2aWRlbmNlJzogJ1x1OEJDMVx1NjM2RVx1Njc2MVx1NzZFRScsXG4gIH0sXG4gIGVuOiB7XG4gICAgJ3dvcmtzcGFjZS50aXRsZSc6ICdSZXZpZXcgRGVzaycsXG4gICAgJ3RhYi5jb21taXRzJzogJ0NvbW1pdCBSZXZpZXcnLFxuICAgICd0YWIub3ZlcnZpZXcnOiAnT3ZlcnZpZXcnLFxuICAgICd0YWIuZXhlY3V0aW9uJzogJ0V4ZWN1dGlvbicsXG4gICAgJ3RhYi5yZXZpZXcnOiAnUmV2aWV3IGlzc3VlcycsXG4gICAgJ3RhYi5ub3Rlcyc6ICdOb3RlcyAmIE1lbW9yeScsXG4gICAgJ3RhYi5zZXR0aW5ncyc6ICdTZXR0aW5ncycsXG4gICAgJ2Vycm9yLmxvYWQnOiAnRmFpbGVkIHRvIGxvYWQnLFxuICAgICdzdGF0ZS5wcm9qZWN0JzogJ0N1cnJlbnQgcHJvamVjdCcsXG4gICAgJ3N0YXRlLm5vUHJvamVjdCc6ICdObyBwcm9qZWN0IGluaXRpYWxpemVkJyxcbiAgICAnc3RhdGUubm9Qcm9qZWN0SGludCc6ICdSdW4gXCJJbml0aWFsaXplIHByb2plY3RcIiB0byBzY2FuIHRoZSByZXBvc2l0b3J5IHN0cnVjdHVyZSwgdGVjaCBzdGFjaywgYW5kIHN5bWJvbCBpbmRleC4nLFxuICAgICdhY3Rpb24uYm9vdHN0cmFwJzogJ0luaXRpYWxpemUgcHJvamVjdCcsXG4gICAgJ2FjdGlvbi5yZXNjYW4nOiAnUmUtaW5pdGlhbGl6ZSAvIHNjYW4nLFxuICAgICdhY3Rpb24uYW5hbHl6ZSc6ICdBbmFseXplIHdvcmtpbmcgZGlmZicsXG4gICAgJ2FjdGlvbi5yZXZpZXcnOiAnUmV2aWV3IHdvcmtpbmcgZGlmZicsXG4gICAgJ2FjdGlvbi52ZXJpZnknOiAnVmVyaWZ5IHdvcmtpbmcgZGlmZicsXG4gICAgJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnOiAnQ3JlYXRlIGNoYW5nZScsXG4gICAgJ2FjdGlvbi5ydW5uaW5nJzogJ1J1bm5pbmdcdTIwMjYnLFxuICAgICdhY3Rpb24ucmVmcmVzaCc6ICdSZWZyZXNoJyxcbiAgICAnZm9ybS5jaGFuZ2VUaXRsZSc6ICdDaGFuZ2UgdGl0bGUnLFxuICAgICdmb3JtLmNoYW5nZURlc2MnOiAnUmVxdWlyZW1lbnQgYW5kIGJhY2tncm91bmQgKG9wdGlvbmFsKScsXG4gICAgJ3Jlc3VsdC5wYW5lbCc6ICdBY3Rpb24gcmVzdWx0JyxcblxuICAgICdyZXBvLmFkZCc6ICdBZGQgcmVwbycsXG4gICAgJ3JlcG8uYWRkSGludCc6ICdFbnRlciBhbiBhYnNvbHV0ZSByZXBvIHBhdGggYW5kIHByZXNzIEVudGVyOyBwcmV2aW91c2x5IHVzZWQgcmVwb3MgYXJlIHJlbWVtYmVyZWQnLFxuICAgICdyZXBvLnNjYW5IaXN0b3J5JzogJ1JlYnVpbGQgaGlzdG9yeScsXG4gICAgJ3JlcG8uY29tbWl0cyc6ICdjb21taXRzJyxcbiAgICAncmVwby5icmFuY2gnOiAnYnJhbmNoJyxcbiAgICAncmVwby53b3JraW5nJzogJ1VuY29tbWl0dGVkIGNoYW5nZXMnLFxuICAgICdyZXBvLndvcmtpbmdDbGVhbic6ICdXb3JraW5nIHRyZWUgaXMgY2xlYW4nLFxuICAgICdyZXBvLmVtcHR5JzogJ05vIGNvbW1pdHMuJyxcbiAgICAncmVwby5sb2FkRmFpbGVkJzogJ0ZhaWxlZCB0byBsb2FkIGNvbW1pdHMnLFxuICAgICdwaWNrZXIudGl0bGUnOiAnUGljayBjb21taXRzIHRvIHJldmlldyAobXVsdGktc2VsZWN0KScsXG4gICAgJ3BpY2tlci5wbGFjZWhvbGRlcic6ICdDbGljayB0byBwaWNrIGNvbW1pdHMgKG11bHRpLXNlbGVjdCwgaW5jbHVkZXMgdW5jb21taXR0ZWQpJyxcbiAgICAncGlja2VyLnNlbGVjdGVkJzogJ1NlbGVjdGVkJyxcbiAgICAncGlja2VyLmZpbHRlcic6ICdGaWx0ZXIgYnkgdGl0bGUvaGFzaC9hdXRob3JcdTIwMjYnLFxuICAgICdwaWNrZXIuY2xlYXInOiAnQ2xlYXInLFxuICAgICdwaWNrZXIubm9NYXRjaCc6ICdObyBtYXRjaGluZyBjb21taXQuJyxcbiAgICAncGlja2VyLmhpbnQnOiAnQ2hlY2tpbmcgYSBjb21taXQgZ2VuZXJhdGVzIGl0cyBBSSBleHBsYW5hdGlvbjsgcnVuIGltcGFjdCBhbmQgb3B0aW1hbGl0eSBiZWxvdy4nLFxuICAgICdwaWNrZXIucm91bmQnOiAnUm91bmQge259JyxcbiAgICAncGlja2VyLnJvdW5kTGF0ZXN0JzogJ1JvdW5kIHtufSAobGF0ZXN0KScsXG4gICAgJ3BpY2tlci5yb3VuZFNlbGVjdCc6ICdTZWxlY3Qgcm91bmQnLFxuICAgICdwaWNrZXIucm91bmRDbGVhcic6ICdDbGVhciByb3VuZCcsXG4gICAgJ3BpY2tlci51bmRpZ2VzdGVkJzogJ05ldyBjb21taXRzIHNpbmNlIHRoZSBsYXN0IEFJIHN1bW1hcnkgKG5vdCB5ZXQgcmV2aWV3ZWQpJyxcbiAgICAncGlja2VyLnVuZGlnZXN0ZWRDb3VudCc6ICd7bn0gdW5yZXZpZXdlZCBjb21taXRzJyxcbiAgICAnaW1wYWN0LmZhY3RvcnMnOiAnUmlzayBmYWN0b3JzICh3aHkgdGhpcyBsZXZlbCknLFxuICAgICdpbXBhY3QucG9pbnRzJzogJ0ltcGFjdGVkIHBvaW50cycsXG4gICAgJ2ltcGFjdC5rZXlQb2ludHMnOiAnS2V5IGNvbXBvbmVudHMnLFxuICAgICdpbXBhY3QubWVtb3J5JzogJ0Nyb3NzLWNoZWNrIHdpdGggcHJvamVjdCBtZW1vcnknLFxuICAgICdpbXBhY3QuZnVuY3Rpb25zJzogJ0ltcGFjdGVkIGZ1bmN0aW9ucyAod2hvIGNhbGxzIHRoZSBjaGFuZ2VkIGNvZGUpJyxcbiAgICAnaW1wYWN0LmZ1bmNSb2xlJzogJ0Z1bmN0aW9uIHJvbGUnLFxuICAgICdpbXBhY3QuZnVuY0NoYW5nZSc6ICdDaGFuZ2VkIGJ5IHRoaXMgY29tbWl0JyxcbiAgICAnaW1wYWN0LmZ1bmNDYWxsZXJzJzogJ0ltcGFjdCBvbiBjYWxsZXJzJyxcbiAgICAnY2FjaGUuaGl0JzogJ2Zyb20gY2FjaGUnLFxuICAgICdjYWNoZS5yZWdlbmVyYXRlJzogJ1JlZ2VuZXJhdGUnLFxuICAgICdjb3N0LnRvb2x0aXAnOiAnRXN0aW1hdGVkIGNvc3Qgb2YgdGhpcyBBSSBjYWxsIChEZWVwU2VlayBwcmljaW5nKScsXG4gICAgJ2V4ZWMuY3JlYXRlJzogJ05ldyBydW4nLFxuICAgICdleGVjLmZvcm1UaXRsZSc6ICdXaGF0IHRvIGRvIChvbmUgbGluZSknLFxuICAgICdleGVjLmZvcm1EZXNjJzogJ1JlcXVpcmVtZW50OiBnb2FsLCBtb2R1bGVzLCBhY2NlcHRhbmNlJyxcbiAgICAnZXhlYy5zdGFydCc6ICdTdGFydCBydW4nLFxuICAgICdleGVjLnN0YXJ0aW5nJzogJ1N0YXJ0aW5nXHUyMDI2JyxcbiAgICAnZXhlYy5jcmVhdGVIaW50JzogJ0NyZWF0ZXMgYSBjaGFuZ2UsIGdlbmVyYXRlcyBhIHBsYW4sIHRoZW4gQUkgc3ViYWdlbnRzIGV4ZWN1dGUgc3RlcCBieSBzdGVwOyBwcm9ncmVzcyByZWZyZXNoZXMgYmVsb3cuJyxcbiAgICAnZXhlYy5tb2RlbERlZmF1bHQnOiAnRXhlY3V0aW9uIG1vZGVsIChyb2xlIGRlZmF1bHRzOiBhbmFseXNpcy9vcHM9ZmFzdCwgY29kaW5nPXN0YW5kYXJkLCBwbGFubmluZz1yZWFzb25pbmcsIHZlcmlmaWNhdGlvbj12ZXJpZmllciknLFxuICAgICdiYWRnZS5ydW5uaW5nJzogJ3tufSBydW5zIGluIHByb2dyZXNzLCBjbGljayB0byB2aWV3JyxcbiAgICAnbmFycmF0aXZlLnRpdGxlJzogJ1dvcmstcm91bmQgbmFycmF0aXZlJyxcbiAgICAnbmFycmF0aXZlLmdlbmVyYXRlJzogJ0ludGVycHJldCB0aGlzIHJvdW5kIG9mIHdvcmsnLFxuICAgICduYXJyYXRpdmUucnVubmluZyc6ICdHZW5lcmF0aW5nXHUyMDI2ICh+MTAtMzBzKScsXG4gICAgJ2JhZGdlLmZhaWxlZCc6ICd7bn0gcnVucyBuZWVkIGF0dGVudGlvbiwgY2xpY2sgdG8gdmlldycsXG4gICAgJ2V4ZWMuZmxvd0NyZWF0ZSc6ICdEZXNjcmliZSB0aGUgdGFzaycsXG4gICAgJ2V4ZWMuZmxvd09yY2hlc3RyYXRlJzogJ0NvbmZpcm0gb3JjaGVzdHJhdGlvbiAocGVyLXN0ZXAgbW9kZWwvcm9sZS9mYWlsdXJlIHBvbGljeSknLFxuICAgICdleGVjLmZsb3dSdW4nOiAnTGF1bmNoICh0cmFjayBwcm9ncmVzcyAmIGNvc3QgaW4gcnVuIGRldGFpbCknLFxuICAgICdleGVjLmZsb3dNZW1vcnknOiAnQXV0by1kaXN0aWxsIG1lbW9yaWVzIChjb25maXJtIGluIG1lbW9yeSBwYW5lbCknLFxuICAgICdleGVjLnBsYW5uaW5nJzogJ0dlbmVyYXRpbmcgb3JjaGVzdHJhdGlvblx1MjAyNiAoTExNIGlzIGRlY29tcG9zaW5nIHRoZSB0YXNrLCB+MTAtMzBzKScsXG4gICAgJ2V4ZWMuY29sLnN0ZXBzJzogJ1N0ZXBzJyxcbiAgICAnbm90ZXMuZWRpdCc6ICdFZGl0JyxcbiAgICAnbm90ZXMudG9NZW1vcnknOiAnVG8gbWVtb3J5JyxcbiAgICAnbm90ZXMudG9NZW1vcnlIaW50JzogJ1ByZWZpbGwgdGhlIG1lbW9yeSBmb3JtIGJlbG93IHdpdGggdGhpcyBub3RlJyxcbiAgICAnbm90ZXMudG9NZW1vcnlEb25lJzogJ1x1MjcxMyBQcmVmaWxsZWQgdGhlIG1lbW9yeSBmb3JtIChjaG9vc2UgYSB0eXBlIGluIHRoZSBQcm9qZWN0IG1lbW9yeSB6b25lIGJlbG93LCB0aGVuIGFkZCknLFxuICAgICdub3Rlcy5jb3B5TWQnOiAnQ29weSBNRCcsXG4gICAgJ25vdGVzLmNvcHlNZEhpbnQnOiAnQ29weSB0aGlzIG5vdGUgYXMgTWFya2Rvd24gdG8gdGhlIGNsaXBib2FyZCcsXG4gICAgJ25vdGVzLmNvcHlNZERvbmUnOiAnQ29waWVkIGFzIE1hcmtkb3duJyxcbiAgICAnbm90ZXMuZXhwb3J0TWQnOiAnRXhwb3J0IE1EJyxcbiAgICAnbm90ZXMuZXhwb3J0TWRIaW50JzogJ0Rvd25sb2FkIGFzIGEgLm1kIGZpbGUnLFxuICAgICdub3Rlcy5leHBvcnREb25lJzogJ0V4cG9ydGVkIGFzIC5tZCcsXG4gICAgJ25vdGVzLmRpZ2VzdE5ldmVyJzogJ05vIEFJIHN1bW1hcnkgZ2VuZXJhdGVkIHlldCcsXG4gICAgJ25vdGVzLmRpZ2VzdFBlbmRpbmcnOiAne259IG5ldyBjb21taXRzIHNpbmNlIHRoZSBsYXN0IHN1bW1hcnknLFxuICAgICdkZXRhaWwuc2F2ZU5vdGUnOiAnU2F2ZSBhcyBub3RlJyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlSGludCc6ICdTYXZlIHRoaXMgcmV2aWV3IGNvbmNsdXNpb24gKHdoYXQvbG9naWMvcmlza3MpIGFzIGEgc3RydWN0dXJlZCBub3RlJyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlVGl0bGUnOiAnUmV2aWV3IHJlY29yZCcsXG4gICAgJ2RldGFpbC5zYXZlTWVtb3J5JzogJ0Rpc3RpbGwgdG8gbWVtb3J5JyxcbiAgICAnZGV0YWlsLnNhdmVNZW1vcnlIaW50JzogJ0Rpc3RpbGwgdGhpcyByZXZpZXcgY29uY2x1c2lvbiBpbnRvIGEgcHJvamVjdCBtZW1vcnkgKHF1ZXVlZCBmb3IgY29uZmlybWF0aW9uKScsXG4gICAgJ25vdGVzLnNhdmUnOiAnU2F2ZScsXG4gICAgJ25vdGVzLmNhbmNlbCc6ICdDYW5jZWwnLFxuICAgICdtZW1vcnkuYnJhbmNoU2NvcGUnOiAnQnJhbmNoJyxcbiAgICAnbWVtb3J5LmJyYW5jaEFsbCc6ICdBbGwgYnJhbmNoZXMnLFxuICAgICdub3Rlcy5zZWFyY2gnOiAnU2VhcmNoIG5vdGVzXHUyMDI2JyxcbiAgICAnbW9kZWwudGl0bGUnOiAnTW9kZWwgYXNzaWdubWVudCAod2hpY2ggbW9kZWwgcGVyIHRhc2spJyxcbiAgICAnbW9kZWwubG9hZGluZyc6ICdMb2FkaW5nIG1vZGVsc1x1MjAyNicsXG4gICAgJ21vZGVsLmZvbGxvd0NoYXQnOiAnRm9sbG93IGNoYXQgbW9kZWwnLFxuICAgICdtb2RlbC5zYXZlJzogJ1NhdmUgJiBhcHBseScsXG4gICAgJ21vZGVsLnNhdmVkJzogJ0FwcGxpZWQnLFxuICAgICdtb2RlbC5oaW50JzogJ0FwcGxpZXMgaW1tZWRpYXRlbHkgYW5kIHBlcnNpc3RzIGFjcm9zcyByZXN0YXJ0czsgY2hhdCBtb2RlbCB1bmFmZmVjdGVkLicsXG4gICAgJ25vdGVzLmFpU3VtbWFyeSc6ICdBSSBzdW1tYXJ5JyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5UnVuJzogJ1N1bW1hcml6aW5nXHUyMDI2ICgxMC0zMHMpJyxcbiAgICAnbm90ZXMuZXhwYW5kJzogJ0V4cGFuZCcsXG4gICAgJ25vdGVzLmNvbGxhcHNlJzogJ0NvbGxhcHNlJyxcbiAgICAnbm90ZXMuc3VtbWFyeVRhZyc6ICdBSSBzdW1tYXJ5JyxcbiAgICAnbm90ZXMuZW1wdHlTZWFyY2gnOiAnTm8gbWF0Y2hpbmcgbm90ZXMuJyxcbiAgICAnbm90ZXMuY29udGVudEhpbnQnOiAnTm90ZSBjb250ZW50IChtdWx0aS1saW5lKTogY29uY2x1c2lvbnMsIHF1ZXN0aW9ucywgbGVhcm5pbmdzXHUyMDI2JyxcbiAgICAnbm90ZXMudGFnc0hpbnQnOiAnVGFncyAoY29tbWEgc2VwYXJhdGVkLCBvcHRpb25hbDsgY2xpY2sgYSB0YWcgdG8gZmlsdGVyKScsXG4gICAgJ25vdGVzLnBpbic6ICdQaW4nLFxuICAgICdub3Rlcy51bnBpbic6ICdVbnBpbicsXG4gICAgJ25vdGVzLmVkaXRlZEF0JzogJ2VkaXRlZCcsXG4gICAgJ3Jldmlldy5maWx0ZXJBbGwnOiAnQWxsJyxcbiAgICAncmV2aWV3LnN0YXR1c0FsbCc6ICdBbGwgc3RhdHVzZXMnLFxuICAgICdyZXZpZXcudmVyaWZ5JzogJ1JlLXZlcmlmeScsXG4gICAgJ3Jldmlldy52ZXJpZnlSdW5uaW5nJzogJ1ZlcmlmeWluZ1x1MjAyNicsXG4gICAgJ3Jldmlldy52ZXJpZnlIaW50JzogJ0FmdGVyIGZpeGluZyB0aGUgY29kZSwgY2xpY2sgdG8gcmUtY2hlY2s6IHdoZXRoZXIgaXNzdWVzIGFyZSBmaXhlZCwgd2hldGhlciB0aGUgY2hhbmdlIGlzIG9wdGltYWwgYW5kIG1pbmltYWxseSBpbnZhc2l2ZSwgYW5kIHdoZXRoZXIgbmV3IGlzc3VlcyBhcHBlYXJlZC4gT25seSBhIHBhc3NpbmcgcmUtdmVyaWZpY2F0aW9uIG1hcmtzIGlzc3VlcyByZXNvbHZlZC4nLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZSc6ICdGYWxzZSBwb3NpdGl2ZScsXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlSGludCc6ICdIdW1hbi1tYXJrIHRoaXMgaXNzdWUgYXMgYSBmYWxzZSBwb3NpdGl2ZSBhbmQgY2xvc2UgaXQgKGRpc3RpbmN0IGZyb20gYSB2ZXJpZmllZCBmaXgpJyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVUaXRsZSc6ICdNYXJrIGFzIGZhbHNlIHBvc2l0aXZlPycsXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlTXNnJzogJ1wie3RpdGxlfVwiIHdpbGwgYmUgbWFya2VkIHJlamVjdGVkIGFuZCByZW1vdmVkIGZyb20gdGhlIG9wZW4gcXVldWUuJyxcbiAgICAncmV2aWV3LmZpeERldGFpbCc6ICdGaXggZGV0YWlscycsXG4gICAgJ3Jldmlldy5maXhTdGF0RmlsZXMnOiAnZmlsZXMnLFxuICAgICdyZXZpZXcuZml4RmlsZXMnOiAnRmlsZXMgdG91Y2hlZCBieSB0aGUgZml4JyxcbiAgICAncmV2aWV3LmZpeEltcGFjdCc6ICdJbXBhY3Qgc2NvcGUgKGNoYW5nZWQgc3ltYm9scyBhbmQgY2FsbGVycyknLFxuICAgICdyZXZpZXcuZGVmaW5lZEluJzogJ2RlZmluZWQgaW4nLFxuICAgICdyZXZpZXcuY2FsbENvdW50JzogJ2NhbGwgc2l0ZShzKScsXG4gICAgJ3Jldmlldy5maXhEaWZmJzogJ0ZpeCBkaWZmIChyZWxhdGl2ZSB0byB0aGUgcmV2aWV3IGJhc2VsaW5lKScsXG4gICAgJ3Jldmlldy5yZWZyZXNoJzogJ1JlZnJlc2gnLFxuICAgICdyZXZpZXcucmV0ZW50aW9uSGludCc6ICdSZXNvbHZlZCBpc3N1ZXMgYXJlIGF1dG8tcHVyZ2VkIGFmdGVyIHtkYXlzfSBkYXkocyknLFxuICAgICdyZXZpZXcudGFyZ2V0JzogJ1RhcmdldCcsXG4gICAgJ3Jldmlldy53b3JraW5nVGFyZ2V0JzogJ1dvcmtpbmcgdHJlZScsXG5cbiAgICAncGxhbi50aXRsZSc6ICdPcmNoZXN0cmF0aW9uIHBsYW4nLFxuICAgICdwbGFuLmhpbnQnOiAnRWFjaCBzdGVwIHJvbGUgZHJpdmVzIGNvbnRleHQgaW5qZWN0aW9uIGFuZCB0aGUgZGVmYXVsdCBtb2RlbCAoYW5hbHlzaXMvb3BzPWZhc3QsIGNvZGluZz1zdGFuZGFyZCwgcGxhbm5pbmc9cmVhc29uaW5nLCB2ZXJpZmljYXRpb249dmVyaWZpZXIpOyBhZGp1c3QgYmVmb3JlIGxhdW5jaGluZy4nLFxuICAgICdwbGFuLmNvbC5zdGVwJzogJ1N0ZXAnLCAncGxhbi5jb2wucm9sZSc6ICdSb2xlJywgJ3BsYW4uY29sLm1vZGVsJzogJ01vZGVsJywgJ3BsYW4uY29sLnBvbGljeSc6ICdGYWlsdXJlIHBvbGljeScsICdwbGFuLmNvbC5lbmFibGVkJzogJ09uJywgJ3BsYW4uY29sLmF0dGVtcHRzJzogJ0F0dGVtcHRzJyxcbiAgICAncGxhbi5tb2RlbERlZmF1bHQnOiAnUm9sZSBkZWZhdWx0JyxcbiAgICAncGxhbi5sYXVuY2hFZGl0ZWQnOiAnU2F2ZSBlZGl0cyAmIGxhdW5jaCcsXG4gICAgJ3BsYW4ubGF1bmNoRGlyZWN0JzogJ0xhdW5jaCBhcy1pcycsXG4gICAgJ3BsYW4uZGlzY2FyZCc6ICdEaXNjYXJkJyxcbiAgICAncGxhbi52aWV3RGV0YWlsJzogJ0RldGFpbCcsICdwbGFuLnJlZnJlc2hEZXRhaWwnOiAnUmVmcmVzaCcsICdwbGFuLmNsb3NlRGV0YWlsJzogJ0Nsb3NlJyxcbiAgICAncGxhbi5kZXRhaWxUaXRsZSc6ICdSdW4gZGV0YWlsJyxcbiAgICAncGxhbi5wYXVzZWRCYW5uZXInOiAnUnVuIHBhdXNlZCwgYXdhaXRpbmcgeW91ciBkZWNpc2lvbicsXG4gICAgJ3BsYW4ucmVzdW1lUmV0cnknOiAnUmV0cnkgc3RlcCAmIGNvbnRpbnVlJyxcbiAgICAncGxhbi5yZXN1bWVTa2lwJzogJ1NraXAgc3RlcCAmIGNvbnRpbnVlJyxcbiAgICAncGxhbi5yZXN1bWVGYWlsZWQnOiAnUmVzdW1lIGZyb20gZmFpbHVyZScsXG4gICAgJ3BsYW4uY29udGV4dFRpdGxlJzogJ1J1biBjb250ZXh0ICh3aGF0IHdhcyBpbmplY3RlZCknLFxuICAgICdwbGFuLmJyYW5jaCc6ICdCcmFuY2gnLCAncGxhbi5pbmplY3RlZE1lbW9yaWVzJzogJ0luamVjdGVkIG1lbW9yaWVzJywgJ3BsYW4uZGVjaXNpb25Mb2cnOiAnRGVjaXNpb24gbG9nJyxcbiAgICAnZXhlYy5jb2wuZGV0YWlsJzogJ0RldGFpbCcsXG5cbiAgICAnc2NoZWQudGl0bGUnOiAnU2NoZWR1bGVkIHRhc2tzJyxcbiAgICAnc2NoZWQuZm9ybU5hbWUnOiAnVGFzayBuYW1lJywgJ3NjaGVkLmZvcm1JbnRlcnZhbCc6ICdJbnRlcnZhbCAobWludXRlcyknLFxuICAgICdzY2hlZC50eXBlUmV2aWV3JzogJ0F1dG8gcmV2aWV3JywgJ3NjaGVkLnR5cGVTdW1tYXJ5JzogJ0FJIHN1bW1hcnknLCAnc2NoZWQudHlwZVJ1bic6ICdUaW1lZCBydW4nLFxuICAgICdzY2hlZC5hZGQnOiAnQ3JlYXRlJyxcbiAgICAnc2NoZWQuaGludCc6ICdSdW5zIGF1dG9tYXRpY2FsbHkgd2hlbiBkdWU6IGF1dG8gcmV2aWV3ID0gcmV2aWV3IGNvbW1pdHMgZnJvbSB0aGUgbGFzdCAyNGggKGlzc3VlcyBsYW5kIGluIHRoZSBSZXZpZXcgdGFiKTsgQUkgc3VtbWFyeSA9IGluY3JlbWVudGFsIGxlYXJuaW5nIHN1bW1hcnk7IHRpbWVkIHJ1biA9IGV4ZWN1dGUgdGhlIHRlbXBsYXRlIGFzIGFuIG9yY2hlc3RyYXRlZCB0YXNrLiBNaW5pbXVtIDEgbWludXRlLicsXG4gICAgJ3NjaGVkLmVtcHR5JzogJ05vIHNjaGVkdWxlZCB0YXNrcyB5ZXQuJyxcbiAgICAnc2NoZWQuY29sLm5hbWUnOiAnTmFtZScsICdzY2hlZC5jb2wudHlwZSc6ICdUeXBlJywgJ3NjaGVkLmNvbC5pbnRlcnZhbCc6ICdDeWNsZScsICdzY2hlZC5jb2wubmV4dCc6ICdOZXh0IHJ1bicsICdzY2hlZC5jb2wubGFzdFJlc3VsdCc6ICdMYXN0IHJlc3VsdCcsICdzY2hlZC5jb2wuYWN0aW9ucyc6ICdBY3Rpb25zJyxcbiAgICAnc2NoZWQuZGF5JzogJyBkJywgJ3NjaGVkLmhvdXInOiAnIGgnLCAnc2NoZWQubWludXRlJzogJyBtaW4nLFxuICAgICdzY2hlZC5kaXNhYmxlJzogJ1BhdXNlJywgJ3NjaGVkLmVuYWJsZSc6ICdFbmFibGUnLCAnc2NoZWQucnVuTm93JzogJ1J1biBub3cnLFxuXG4gICAgJ21lbW9yeS56b25lVGl0bGUnOiAnUHJvamVjdCBtZW1vcnknLFxuICAgICdtZW1vcnkuc3luY0Jhc2VsaW5lJzogJ1N5bmMgYmFzZWxpbmUnLCAnbWVtb3J5LnN5bmNOb25lJzogJ25ldmVyIHN5bmNlZCcsXG4gICAgJ21lbW9yeS5iZWhpbmQnOiAne259IGNvbW1pdHMgYmVoaW5kJyxcbiAgICAnbWVtb3J5LnN5bmMnOiAnU3luYyBtZW1vcnknLCAnbWVtb3J5LnN5bmNpbmcnOiAnU3luY2luZ1x1MjAyNicsICdtZW1vcnkuc3luY0ZhaWxlZCc6ICdTeW5jIGZhaWxlZCcsXG4gICAgJ21lbW9yeS5zdGFsZVRpdGxlJzogJ1Bvc3NpYmx5IHN0YWxlIChyZWxhdGVkIGNvZGUgY2hhbmdlZDsgcmV2aWV3IG5lZWRlZCknLFxuICAgICdtZW1vcnkubWFya1N0YWxlJzogJ01hcmsgc3RhbGUnLCAnbWVtb3J5LmFyY2hpdmVCdG4nOiAnQXJjaGl2ZScsICdtZW1vcnkua2VlcEFjdGl2ZSc6ICdTdGlsbCB2YWxpZCcsXG4gICAgJ21lbW9yeS5uZXdDYW5kaWRhdGVzJzogJ05ldyBjYW5kaWRhdGVzIChxdWV1ZWQgZm9yIGNvbmZpcm1hdGlvbik6JyxcbiAgICAnbWVtb3J5LmNsb3NlUmVwb3J0JzogJ0Nsb3NlIHJlcG9ydCcsXG4gICAgJ21lbW9yeS5zY29wZVByb2plY3QnOiAnTWFpbmxpbmUgKGFsbCBicmFuY2hlcyknLCAnbWVtb3J5LnNjb3BlQnJhbmNoJzogJ0N1cnJlbnQgYnJhbmNoIG9ubHknLFxuICAgICdtZW1vcnkucGVuZGluZ1F1ZXVlJzogJ1BlbmRpbmcgY29uZmlybWF0aW9uJyxcbiAgICAnbWVtb3J5LnRvTm90ZSc6ICdUbyBub3RlJywgJ21lbW9yeS5ub3JtYWxpemUnOiAnTm9ybWFsaXplIHRvIG1haW5saW5lJywgJ21lbW9yeS5yZXN0b3JlJzogJ1Jlc3RvcmUnLFxuICAgICdtZW1vcnkuc3RhdHVzU3RhbGUnOiAnU3RhbGUnLFxuICAgICdmcy5icm93c2UnOiAnQnJvd3NlJyxcbiAgICAnZnMudXAnOiAnVXAnLFxuICAgICdmcy51c2UnOiAnVXNlIHRoaXMgZGlyZWN0b3J5JyxcbiAgICAnZnMucmVnaXN0ZXInOiAnQWxzbyByZWdpc3RlciBhcyBzZXNzaW9uIHdvcmtzcGFjZScsXG4gICAgJ2ZzLmxvYWRpbmcnOiAnUmVhZGluZ1x1MjAyNicsXG4gICAgJ2ZzLmVtcHR5JzogJ05vIHN1YmRpcmVjdG9yaWVzLicsXG4gICAgJ2ltcGFjdC5mdW5jdGlvbnNOb25lJzogJ05vIGZ1bmN0aW9uLWxldmVsIGNhbGwgaW1wYWN0IGRldGVjdGVkIChzdHlsZS9hc3NldC9jb25maWctb25seSBjaGFuZ2UpLicsXG4gICAgJ3Jldmlldy5jb2wuc2V2ZXJpdHknOiAnU2V2ZXJpdHknLFxuICAgICdyZXZpZXcuY29sLmNhdGVnb3J5JzogJ0NhdGVnb3J5JyxcbiAgICAncmV2aWV3LmNvbC50aXRsZSc6ICdJc3N1ZScsXG4gICAgJ3Jldmlldy5jb2wuZXZpZGVuY2UnOiAnTG9jYXRpb24nLFxuICAgICdyZXZpZXcuY29sLmZpeCc6ICdTdWdnZXN0ZWQgZml4JyxcbiAgICAncmV2aWV3LmhpbnQnOiAnQ2xpY2sgdGhlIGJ1dHRvbiBhYm92ZSB0byBwcm9kdWNlIHRoZSBvcHRpbWFsaXR5IHZlcmRpY3QgYW5kIGlzc3VlIGxpc3QuJyxcbiAgICAnZGlmZi5zaG93JzogJ0RpZmYnLFxuICAgICdkaWZmLmhpZGUnOiAnSGlkZSBkaWZmJyxcblxuICAgICdkZXRhaWwudGl0bGUnOiAnUmV2aWV3IGRldGFpbCcsXG4gICAgJ2RldGFpbC5waWNrJzogJ1x1MjE5MCBQaWNrIGEgY29tbWl0IChvciB0aGUgdW5jb21taXR0ZWQgY2hhbmdlcykgb24gdGhlIGxlZnQgdG8gc3RhcnQgcmV2aWV3aW5nJyxcbiAgICAnZGV0YWlsLndoYXQnOiAnV2hhdCBpdCBkb2VzJyxcbiAgICAnZGV0YWlsLmxvZ2ljJzogJ0ltcGxlbWVudGF0aW9uIGxvZ2ljJyxcbiAgICAnZGV0YWlsLnJpc2snOiAnUmlza3MnLFxuICAgICdkZXRhaWwuZmlsZXMnOiAnRmlsZXMnLFxuICAgICdkZXRhaWwucGF0Y2gnOiAnU2hvdyByYXcgcGF0Y2gnLFxuICAgICdkZXRhaWwuYWlMb2FkaW5nJzogJ0dlbmVyYXRpbmcgQUkgZXhwbGFuYXRpb25cdTIwMjYgKDEwLTMwcyknLFxuICAgICdkZXRhaWwucXVldWVkJzogJ3tufSBhbmFseXNlcyBxdWV1ZWQgKHdpbGwgcnVuIGNvbmN1cnJlbnRseSknLFxuICAgICdkZXRhaWwuY2FyZFF1ZXVlZCc6ICdXYWl0aW5nIGluIHRoZSBhbmFseXNpcyBxdWV1ZSAobWF4IDMgY29uY3VycmVudCB0byBwcm90ZWN0IHRoZSBtb2RlbCBnYXRld2F5KScsXG4gICAgJ2RldGFpbC5pbXBhY3QnOiAnSW1wYWN0IHNjb3BlJyxcbiAgICAnZGV0YWlsLmltcGFjdExvYWRpbmcnOiAnU2Nhbm5pbmcgaW1wYWN0XHUyMDI2IChyZWZlcmVuY2Ugc2VhcmNoICsgZ3JhcGggd2FsayknLFxuICAgICdkZXRhaWwub3B0aW1hbGl0eSc6ICdPcHRpbWFsaXR5IHJldmlldycsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZyc6ICdSZXZpZXdpbmdcdTIwMjYgKHByb2R1Y2VzIGlzc3VlIGxpc3QgYW5kIG9wdGltYWxpdHkgdmVyZGljdCknLFxuXG4gICAgJ2ltcGFjdC5yaXNrJzogJ1Jpc2snLFxuICAgICdpbXBhY3QuY29sLmNoYW5nZWQnOiAnQ2hhbmdlZCBmaWxlcycsXG4gICAgJ2ltcGFjdC5jb2wuaW5kaXJlY3QnOiAnSW5kaXJlY3QgKHJlZmVyZW5jZSBjaGFpbiknLFxuICAgICdpbXBhY3QuY29sLnBvdGVudGlhbCc6ICdQb3RlbnRpYWwnLFxuICAgICdpbXBhY3Qubm9uZSc6ICdObyBpbi1yZXBvIHJlZmVyZW5jZXJzIGZvdW5kICh0aGUgY2hhbmdlIGxvb2tzIHNlbGYtY29udGFpbmVkKS4nLFxuICAgICdpbXBhY3QudGVzdHMnOiAnUmVsYXRlZCB0ZXN0cycsXG4gICAgJ2ltcGFjdC5sZWdlbmQuY2hhbmdlZCc6ICdjaGFuZ2VkJyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5pbmRpcmVjdCc6ICdpbmRpcmVjdCcsXG4gICAgJ2ltcGFjdC5sZWdlbmQucG90ZW50aWFsJzogJ3BvdGVudGlhbCcsXG5cbiAgICAncmV2aWV3LnZlcmRpY3QnOiAnT3B0aW1hbGl0eSB2ZXJkaWN0JyxcbiAgICAncmV2aWV3Lmlzc3Vlcyc6ICdJc3N1ZXMnLFxuICAgICdyZXZpZXcuY2xlYW4nOiAnTm8gaXNzdWVzIGZvdW5kLicsXG5cbiAgICAnbm90ZXMudGl0bGUnOiAnUmV2aWV3IG5vdGVzJyxcbiAgICAnbm90ZXMuZm9ybVRpdGxlJzogJ05vdGUgdGl0bGUnLFxuICAgICdub3Rlcy5mb3JtQ29udGVudCc6ICdOb3RlIGNvbnRlbnQgKGNvbmNsdXNpb25zLCBxdWVzdGlvbnMsIGxlYXJuaW5nc1x1MjAyNiknLFxuICAgICdub3Rlcy5hZGQnOiAnQWRkIG5vdGUnLFxuICAgICdub3Rlcy5ib3VuZFRvJzogJ1dpbGwgYmUgbGlua2VkIHRvJyxcbiAgICAnbm90ZXMuY29sLnRpbWUnOiAnVGltZScsXG4gICAgJ25vdGVzLmNvbC50aXRsZSc6ICdUaXRsZScsXG4gICAgJ25vdGVzLmNvbC5jb250ZW50JzogJ0NvbnRlbnQnLFxuICAgICdub3Rlcy5jb2wuc2hhJzogJ0NvbW1pdCcsXG4gICAgJ25vdGVzLnJlbW92ZSc6ICdEZWxldGUnLFxuICAgICdub3Rlcy5lbXB0eSc6ICdObyBub3RlcyB5ZXQuIE5vdGUgZG93biBjb25jbHVzaW9ucyBhbmQgcXVlc3Rpb25zIHdoaWxlIHJldmlld2luZyBjb21taXRzIFx1MjAxNCB0aGF0IGlzIHlvdXIgcHJvamVjdCBsZWFybmluZyBhcmNoaXZlLicsXG5cbiAgICAnbWVtb3J5LnJlY29yZCc6ICdSZWNvcmQgcHJvamVjdCBtZW1vcnknLFxuICAgICdmb3JtLm1lbW9yeVRpdGxlJzogJ01lbW9yeSB0aXRsZScsXG4gICAgJ2Zvcm0ubWVtb3J5Q29udGVudCc6ICdNZW1vcnkgY29udGVudCAod2hhdCBhbmQgd2h5KScsXG4gICAgJ21lbW9yeS5jb2wudGl0bGUnOiAnSXRlbScsXG4gICAgJ21lbW9yeS5jb2wudHlwZSc6ICdUeXBlJyxcbiAgICAnbWVtb3J5LmNvbC50cnV0aCc6ICdUcnV0aCcsXG4gICAgJ21lbW9yeS5jb2wuYnJhbmNoJzogJ0JyYW5jaCcsXG4gICAgJ21lbW9yeS5jb25maXJtJzogJ0NvbmZpcm0nLFxuICAgICdtZW1vcnkuZW1wdHknOiAnTm8gcHJvamVjdCBtZW1vcmllcyB5ZXQuIEFzayB0aGUgQUkgaW4gY2hhdCB0byByZWNvcmQgb25lLCBvciBhZGQgYWJvdmUuJyxcbiAgICAnY29uY2VwdHMudGl0bGUnOiAnTGVhcm5pbmcgY29uY2VwdHMnLFxuICAgICdjb25jZXB0cy5ub25lJzogJ05vIGxlYXJuaW5nIGNvbmNlcHRzIHlldC4gVGhleSBhY2N1bXVsYXRlIGFmdGVyIHN1Y2Nlc3NmdWwgY2hhbmdlIHJ1bnMsIG9yIGFzayB0aGUgQUkgdG8gc3VtbWFyaXplIGxlYXJuaW5nIHBvaW50cy4nLFxuICAgICdjb25jZXB0cy5jb2wubmFtZSc6ICdDb25jZXB0JyxcbiAgICAnY29uY2VwdHMuY29sLmNhdGVnb3J5JzogJ0NhdGVnb3J5JyxcbiAgICAnY29uY2VwdHMuY29sLmNvdW50JzogJ0NvdW50JyxcbiAgICAncmV2aWV3LnJlY29yZHNUaXRsZSc6ICdSZXZpZXcgaXNzdWVzJyxcbiAgICAncmV2aWV3LnJlY29yZHNFbXB0eSc6ICdObyBpc3N1ZSByZWNvcmRzIHlldC4gSXNzdWVzIGZvdW5kIGJ5IHRoZSBjb21taXQtcmV2aWV3IHBhZ2UgYXJlIHJlY29yZGVkIGhlcmUgYXV0b21hdGljYWxseTsgcmUtcmV2aWV3aW5nIHJlcGxhY2VzIG9sZCByZWNvcmRzLicsXG4gICAgJ3ZlcmlmeS5yZWNvcmRzJzogJ1ZlcmlmaWNhdGlvbiByZWNvcmRzJyxcbiAgICAndmVyaWZ5LnJlY29yZHNFbXB0eSc6ICdObyB2ZXJpZmljYXRpb24gcmVjb3JkcyB5ZXQuIENsaWNrIFwiVmVyaWZ5XCIgaW4gdGhlIGV4ZWN1dGlvbiB0YWIgdG8gZ2VuZXJhdGUgb25lLicsXG5cbiAgICAnY29uZmlybWVkLnRpdGxlJzogJ0NvbmZpcm1lZCBjb25zdHJhaW50cyAoaHVtYW4tY29uZmlybWVkOyBBSSBlZGl0cyB0byBmb3JiaWRkZW4gcGF0aHMgYXJlIGF1dG8tZGVuaWVkKScsXG4gICAgJ2NvbmZpcm1lZC5hZGQnOiAnQWRkIGNvbnN0cmFpbnQnLFxuICAgICdjb25maXJtZWQudGV4dCc6ICdSZXF1aXJlbWVudCAvIGNvbnN0cmFpbnQgdGV4dCcsXG4gICAgJ2NvbmZpcm1lZC5wYXRocyc6ICdGb3JiaWRkZW4gcGF0aHMgKGNvbW1hIHNlcGFyYXRlZDsgcmVsYXRpdmUgdG8gcHJvamVjdCByb290IGxpa2Ugc3JjL2NvcmUsIG9yIGFic29sdXRlKScsXG4gICAgJ2NvbmZpcm1lZC5ub25lJzogJ05vIGNvbnN0cmFpbnRzIHlldC4gT25jZSBhZGRlZCwgQUkgZWRpdHMgdG8gZm9yYmlkZGVuIHBhdGhzIGluIHRoaXMgcHJvamVjdCBhcmUgYXV0by1kZW5pZWQuJyxcblxuICAgICdjaGFuZ2VzLnRpdGxlJzogJ0NoYW5nZSB0YXNrcycsXG4gICAgJ3N0YXRlLm5vQ2hhbmdlcyc6ICdObyBjaGFuZ2UgdGFza3MgeWV0LiBBc2sgdGhlIEFJIGluIGNoYXQgdG8gY3JlYXRlIG9uZSwgb3IgdXNlIFwiQ3JlYXRlIGNoYW5nZVwiIGFib3ZlLicsXG4gICAgJ2NoYW5nZXMuY29sLnRpdGxlJzogJ1RpdGxlJyxcbiAgICAnY2hhbmdlcy5jb2wudHlwZSc6ICdUeXBlJyxcbiAgICAnY2hhbmdlcy5jb2wuc3RhdHVzJzogJ1N0YXR1cycsXG4gICAgJ2NoYW5nZXMuY29sLnVwZGF0ZWQnOiAnVXBkYXRlZCcsXG4gICAgJ2V4ZWMuY29sLnN0YXR1cyc6ICdTdGF0dXMnLFxuICAgICdleGVjLmNvbC5jaGFuZ2UnOiAnQ2hhbmdlJyxcbiAgICAnZXhlYy5jb2wuc3RhcnRlZCc6ICdTdGFydGVkJyxcbiAgICAnZXhlYy5jb2wuY29zdCc6ICdDb3N0IChlc3QpJyxcbiAgICAnZXhlYy5hdHRlbXB0cyc6ICdBdHRlbXB0cycsXG4gICAgJ2V4ZWMuaGludCc6ICdSdW5zIChzdGFydF9ydW4pIGFyZSBzdGFydGVkIGZyb20gY2hhdDogYWZ0ZXIgYSBwbGFuIGV4aXN0cywgdGVsbCB0aGUgQUkgdG8gXCJzdGFydCBydW4gZm9yIHRoZSBjaGFuZ2VcIi4gVGhpcyB0YWIgc2hvd3MgcHJvZ3Jlc3MgYW5kIHJlc3VsdHMuJyxcbiAgICAnc3RhdGUubm9SdW5zJzogJ05vIHJ1bnMgeWV0LicsXG4gICAgJ3N0YXRlLnRlY2hTdGFjayc6ICdUZWNoIHN0YWNrJyxcbiAgICAnc3RhdGUuc3ltYm9scyc6ICdJbmRleGVkIHN5bWJvbHMnLFxuICAgICdzdGF0ZS5tYW5pZmVzdHMnOiAnTWFuaWZlc3RzJyxcbiAgICAnc3RhdGUuZXZpZGVuY2UnOiAnRXZpZGVuY2UgZW50cmllcycsXG4gIH0sXG59IGFzIGNvbnN0XG5cbmZ1bmN0aW9uIGZhbGxiYWNrVChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGRpY3QgPSBXT1JLU1BBQ0VfRElDVC56aCBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG4gIHJldHVybiBkaWN0W2tleV0gPz8ga2V5XG59XG5cbi8qKiBcdTY0Q0RcdTRGNUNcdTdFRDNcdTY3OUNcdTRFQkFcdTYwMjdcdTUzMTZcdUZGMUFcdTI3MTMvXHUyNzE3ICsgXHU2ODA3XHU5MUNGXHU1QjU3XHU2QkI1XHU3Njg0XHU3RDI3XHU1MUQxXHU4ODRDXHVGRjA4XHU4REYzXHU4RkM3XHU1RDRDXHU1OTU3XHU1QkY5XHU4QzYxXHU0RTBFXHU1MzlGXHU1OUNCIEpTT05cdUZGMDlcdTMwMDIgKi9cbmZ1bmN0aW9uIGZvcm1hdEFjdGlvblJlc3VsdChkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IHN0cmluZyB7XG4gIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IFtkYXRhWydvayddID09PSBmYWxzZSA/ICdcdTI3MTcnIDogJ1x1MjcxMyddXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGEpKSB7XG4gICAgaWYgKGtleSA9PT0gJ29rJykgY29udGludWVcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBsaW5lcy5wdXNoKGAke2tleX1cdUZGMUEke1N0cmluZyh2YWx1ZSkuc2xpY2UoMCwgMjAwKX1gKVxuICAgIH1cbiAgfVxuICBpZiAobGluZXMubGVuZ3RoID09PSAxKSBsaW5lcy5wdXNoKCdcdTYyMTBcdTUyOUYnKVxuICByZXR1cm4gbGluZXMuam9pbignXFxuJylcbn1cblxuLyoqIExMTSBcdTYyMTBcdTY3MkNcdUZGMDhcdTRGMzBcdUZGMDlcdTVGQkRcdTY4MDdcdUZGMUFcdTY1RTBcdTUwM0NcdUZGMDhcdTY3MkFcdTRFQTdcdTc1MUZcdThDMDNcdTc1MjggLyBcdTY1RTdcdTdGMTNcdTVCNThcdTRFMERcdTVFMjZcdTYyMTBcdTY3MkNcdUZGMDlcdTY1RjZcdThGRDRcdTU2REUgbnVsbCBcdTRFMERcdTUzNjBcdTRGNERcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlbmRlckNvc3RCYWRnZSh1c2Q6IG51bWJlciB8IHVuZGVmaW5lZCwgdGl0bGU6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gIGlmICh1c2QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGxcbiAgcmV0dXJuIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4Yjk0OWUnKX0gdGl0bGU9e3RpdGxlfT5cdTIyNDgke3VzZC50b0ZpeGVkKDQpfTwvc3Bhbj5cbn1cblxuY29uc3Qgc3R5bGVzOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5DU1NQcm9wZXJ0aWVzPiA9IHtcbiAgcm9vdDoge1xuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgIGhlaWdodDogJzEwMCUnLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyxcbiAgICBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScsXG4gICAgZm9udEZhbWlseTogJ3ZhcigtLWRzLWZvbnQtc2FucywgaW5oZXJpdCknLFxuICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgfSxcbiAgbmF2OiB7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIGdhcDogJzRweCcsXG4gICAgcGFkZGluZzogJzhweCAxMnB4JyxcbiAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMSwgcmdiYSg1LDUsNSwwLjEpKScsXG4gICAgZmxleDogJ25vbmUnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxuICB9LFxuICB0aXRsZTogeyBmb250U2l6ZTogJzEzcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbklubGluZUVuZDogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSxcbiAgdGFiOiAoYWN0aXZlOiBib29sZWFuKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiAoe1xuICAgIHBhZGRpbmc6ICc1cHggMTJweCcsXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcbiAgICBib3JkZXI6ICdub25lJyxcbiAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICBmb250U2l6ZTogJzEycHgnLFxuICAgIC8vIGJ1dHRvbi1pbmZvLWZpbGwgXHU0RTI0XHU0RTNCXHU5ODk4XHU5MEZEXHU4NEREXHVGRjFCYnJhbmQtcHJpbWFyeSBcdTU3MjhcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTY2MkZcdThGRDFcdTc2N0RcdTgyNzJcdUZGMENcdTc2N0RcdTVCNTdcdTRGMUFcdTg4QUJcdTU0MUVcdTYzODlcdUZGMDhcdTk4NzVcdTdCN0VcdTc2N0RcdTU3NTdcdTRFOEJcdTY1NDVcdUZGMDlcdTMwMDJcbiAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyAndmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgY29sb3I6IGFjdGl2ZSA/ICcjZmZmJyA6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsXG4gIH0pLFxuICBib2R5OiB7IGZsZXg6IDEsIG92ZXJmbG93WTogJ2F1dG8nLCBwYWRkaW5nOiAnMTRweCAxNnB4JyB9LFxuICBjYXJkOiB7XG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcbiAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgIHBhZGRpbmc6ICcxMnB4IDE0cHgnLFxuICAgIG1hcmdpbkJvdHRvbTogJzEycHgnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLFxuICB9LFxuICByb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxOHB4JywgZmxleFdyYXA6ICd3cmFwJywgZm9udFNpemU6ICcxMnB4JywgbWFyZ2luOiAnNnB4IDAnIH0sXG4gIGxhYmVsOiB7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnIH0sXG4gIHRhYmxlOiB7IHdpZHRoOiAnMTAwJScsIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLCBmb250U2l6ZTogJzEycHgnIH0sXG4gIHRoOiB7IHRleHRBbGlnbjogJ3N0YXJ0JywgcGFkZGluZzogJzZweCA4cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMSwgcmdiYSg1LDUsNSwwLjEpKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250V2VpZ2h0OiA1MDAgfSxcbiAgdGQ6IHsgcGFkZGluZzogJzZweCA4cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMywgcmdiYSg1LDUsNSwwLjA2KSknIH0sXG4gIGVtcHR5OiB7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250U2l6ZTogJzEycHgnLCBwYWRkaW5nOiAnMTBweCA0cHgnIH0sXG4gIGJ1dHRvbjoge1xuICAgIHBhZGRpbmc6ICc1cHggMTJweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAvLyBidXR0b24taW5mby1maWxsIFx1NjYyRlx1NUJCRlx1NEUzQlx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1NEUwQlx1OTBGRFx1NEUzQVx1ODRERFx1ODI3Mlx1MzAwMVx1NzY3RFx1NUI1N1x1NTNFRlx1OEJGQlx1NzY4NFx1NEUzQlx1NjRDRFx1NEY1Q1x1ODI3Mlx1RkYwOGJyYW5kLXByaW1hcnkgXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RTBEXHU1M0VGXHU4QkZCXHVGRjA5XHUzMDAyXG4gICAgZm9udFNpemU6ICcxMXB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1idXR0b24taW5mby1maWxsLCAjMjU2M2ViKScsIGNvbG9yOiAnI2ZmZicsXG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIH0sXG4gIHNlY29uZGFyeToge1xuICAgIHBhZGRpbmc6ICc1cHggMTJweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzExcHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgfSxcbiAgaW5wdXQ6IHtcbiAgICB3aWR0aDogJzEwMCUnLCBwYWRkaW5nOiAnNnB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgfSxcbiAgZm9ybVJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICc2cHgnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH0sXG4gIGZvcm1JbmxpbmU6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9LFxuICAvLyBzZWxlY3QgXHU3NTI4XHU3Q0ZCXHU3RURGXHU1OTE2XHU4OUMyXHU2NUY2IFdpbmRvd3MgXHU2RDQ1XHU4MjcyXHU2QTIxXHU1RjBGXHU0RTBCXHU1RjNBXHU1MjM2XHU3NjdEXHU1RTk1XHVGRjBDXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU0RTBCXHU0RTBEXHU1M0VGXHU4QkZCXHUyMDE0XHUyMDE0XHU4MUVBXHU3RUQ4XHU1OTE2XHU4OUMyXHU4RDcwXHU0RTNCXHU5ODk4XHU1M0Q4XHU5MUNGXHUzMDAyXG4gIHNlbGVjdDoge1xuICAgIGFwcGVhcmFuY2U6ICdub25lJywgV2Via2l0QXBwZWFyYW5jZTogJ25vbmUnLFxuICAgIHBhZGRpbmc6ICc2cHggMjZweCA2cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxuICAgIGJhY2tncm91bmRJbWFnZTogJ3VybChcImRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LDxzdmcgeG1sbnM9JTIyaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmclMjIgd2lkdGg9JTIyMTAlMjIgaGVpZ2h0PSUyMjYlMjI+PHBhdGggZD0lMjJNMSAxbDQgNCA0LTQlMjIgc3Ryb2tlPSUyMiUyMzg4OCUyMiBzdHJva2Utd2lkdGg9JTIyMS41JTIyIGZpbGw9JTIybm9uZSUyMi8+PC9zdmc+XCIpJyxcbiAgICBiYWNrZ3JvdW5kUmVwZWF0OiAnbm8tcmVwZWF0JywgYmFja2dyb3VuZFBvc2l0aW9uOiAncmlnaHQgOHB4IGNlbnRlcicsXG4gICAgY3Vyc29yOiAncG9pbnRlcicsIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCBtYXhXaWR0aDogJzEwMCUnLFxuICB9LFxuICBhY3Rpb25Sb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxMHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfSxcbiAgcmVzdWx0OiB7XG4gICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS42LFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxuICAgIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICcxMHB4IDEycHgnLCBtYXhIZWlnaHQ6ICczMjBweCcsIG92ZXJmbG93WTogJ2F1dG8nLFxuICB9LFxuICBiYWRnZTogKGNvbG9yOiBzdHJpbmcpOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+IHtcbiAgICBjb25zdCByZ2IgPSBwYXJzZUNvbG9yKGNvbG9yKVxuICAgIGlmIChyZ2IgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCBwYWRkaW5nOiAnMXB4IDhweCcsIGJvcmRlclJhZGl1czogJzRweCcsIGZvbnRTaXplOiAnMTFweCcsIGJhY2tncm91bmQ6IGAke2NvbG9yfTIyYCwgY29sb3IgfVxuICAgIH1cbiAgICBjb25zdCBbciwgZywgYl0gPSByZ2JcbiAgICAvLyBcdTVFOTVcdTgyNzJcdTdFREZcdTRFMDAgMTYlIFx1ODI3Mlx1OEMwM1x1RkYxQlx1NjU4N1x1NUI1N1x1ODI3Mlx1NEUzQlx1OTg5OFx1ODFFQVx1OTAwMlx1NUU5NFx1RkYwOFx1NkQ0NVx1ODI3Mlx1NkRGMVx1NTMxNlx1NTIzMFx1NzY3RFx1NUU5NVx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlxuICAgIHJldHVybiB7XG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgcGFkZGluZzogJzFweCA4cHgnLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnLFxuICAgICAgYmFja2dyb3VuZDogYHJnYmEoJHtyfSwgJHtnfSwgJHtifSwgMC4xNilgLFxuICAgICAgY29sb3I6IHRoZW1lQXdhcmVUZXh0KGNvbG9yKSxcbiAgICB9XG4gIH0sXG4gIHNlY3Rpb25UaXRsZTogeyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTJweCcsIG1hcmdpbkJvdHRvbTogJzhweCcgfSxcbiAgd2hhdDogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjcsIG1hcmdpbjogJzRweCAwIDhweCcgfSxcbiAgbG9naWNTdGVwOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuOCwgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnIH0sXG4gIHJpc2tJdGVtOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNywgbWFyZ2luOiAnMnB4IDAnIH0sXG4gIGNvbW1pdFJvdzogKGFjdGl2ZTogYm9vbGVhbik6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4gKHtcbiAgICBwYWRkaW5nOiAnOHB4IDEwcHgnLFxuICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgYm9yZGVyOiBhY3RpdmUgPyAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgOiAnMXB4IHNvbGlkIHRyYW5zcGFyZW50JyxcbiAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyAncmdiYSgzNyw5OSwyMzUsMC4wNiknIDogJ3RyYW5zcGFyZW50JyxcbiAgICBtYXJnaW5Cb3R0b206ICc0cHgnLFxuICB9KSxcbiAgY29tbWl0U3ViamVjdDogeyBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAsIGxpbmVIZWlnaHQ6IDEuNSwgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH0sXG4gIGNvbW1pdE1ldGE6IHsgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpblRvcDogJzJweCcsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JyB9LFxuICBwYXRjaDoge1xuICAgIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCBsaW5lSGVpZ2h0OiAxLjUsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzEwcHgnLCBtYXhIZWlnaHQ6ICczMjBweCcsIG92ZXJmbG93WTogJ2F1dG8nLFxuICB9LFxuICB0ZXh0YXJlYToge1xuICAgIHdpZHRoOiAnMTAwJScsIHBhZGRpbmc6ICc4cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxuICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCByZXNpemU6ICd2ZXJ0aWNhbCcsIGxpbmVIZWlnaHQ6IDEuNywgZm9udEZhbWlseTogJ2luaGVyaXQnLFxuICB9LFxuICBub3RlQ2FyZDoge1xuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJyxcbiAgICBib3JkZXJSYWRpdXM6ICc4cHgnLCBwYWRkaW5nOiAnMTJweCAxNHB4JywgbWFyZ2luQm90dG9tOiAnMTBweCcsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXG4gIH0sXG4gIG5vdGVUaXRsZVJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JywgZ2FwOiAnOHB4JyB9LFxuICBub3RlVGl0bGVUZXh0OiB7IGZvbnRTaXplOiAnMTNweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbGluZUhlaWdodDogMS41IH0sXG4gIG5vdGVDb250ZW50OiB7XG4gICAgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS44NSwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstd29yZCcsXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLCBtYXJnaW5Ub3A6ICc2cHgnLFxuICB9LFxuICBub3RlQ2xhbXA6IHtcbiAgICBkaXNwbGF5OiAnLXdlYmtpdC1ib3gnLCBXZWJraXRMaW5lQ2xhbXA6IDYsIFdlYmtpdEJveE9yaWVudDogJ3ZlcnRpY2FsJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICB9LFxuICBub3RlTWV0YToge1xuICAgIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc4cHgnLFxuICAgIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxuICB9LFxuICBsaW5rQnRuOiB7XG4gICAgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsIGZvbnRTaXplOiAnMTFweCcsIHBhZGRpbmc6ICcwJyxcbiAgICBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsXG4gIH0sXG4gIGNoaXA6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XG4gICAgcGFkZGluZzogJzJweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnOTk5cHgnLCBmb250U2l6ZTogJzExcHgnLCBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgIC8vIFx1NTQwQyB0YWJcdUZGMUFhY3RpdmUgXHU1ODZCXHU4MjcyXHU0RTAwXHU1RjhCIGJ1dHRvbi1pbmZvLWZpbGxcdUZGMDhcdTRFMjRcdTRFM0JcdTk4OThcdTkwRkRcdTg0RERcdUZGMDlcdUZGMENcdTc5ODFcdTc1MjggYnJhbmQtcHJpbWFyeVx1MzAwMlxuICAgIGJhY2tncm91bmQ6IGFjdGl2ZSA/ICd2YXIoLS1kc3ctYWxpYXMtYnV0dG9uLWluZm8tZmlsbCwgIzI1NjNlYiknIDogJ3RyYW5zcGFyZW50JyxcbiAgICBjb2xvcjogYWN0aXZlID8gJyNmZmYnIDogJ2luaGVyaXQnLFxuICB9KSxcbn1cblxuLyoqIFx1OThDRVx1OTY2OVx1N0I0OVx1N0VBNyBcdTIxOTIgXHU1RkJEXHU3QUUwXHU5ODlDXHU4MjcyXHUzMDAyICovXG5jb25zdCBSSVNLX0NPTE9SOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0geyBsb3c6ICcjNGVjOWIwJywgbWVkaXVtOiAnI2RjZGNhYScsIGhpZ2g6ICcjY2U5MTc4JywgY3JpdGljYWw6ICcjZjE0YzRjJyB9XG5cbi8qKlxuICogXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0IFNWRyBcdTZENDFcdTdBMEJcdTU2RkVcdUZGMUFcdTRFMDlcdTUyMTdcdTUyMDZcdTVDNDJcdUZGMDhcdTUzRDhcdTY2RjQgXHUyMTkyIFx1OTVGNFx1NjNBNVx1NUYxNVx1NzUyOFx1OTRGRSBcdTIxOTIgXHU2RjVDXHU1NzI4XHVGRjA5XHVGRjBDXG4gKiBcdTRGOURcdTYzNkUgL2ltcGFjdC1zY29wZSBcdThGRDRcdTU2REVcdTc2ODQgbGV2ZWxzXHVGRjA4XHU1NDJCXHU0RjIwXHU2NEFEXHU5NEZFIHJlYXNvblx1RkYwOVx1N0VEOFx1NTIzNlx1OEZERVx1N0VCRlx1MzAwMlxuICogXHU1MTY4XHU1QkJEXHU3NTNCXHU1RTAzXHVGRjA4dmlld0JveCAxMDAwXHVGRjA5XHVGRjBDXHU4MjgyXHU3MEI5XHU1RTI2XHU3NkVFXHU1RjU1XHU2M0QwXHU3OTNBXHVGRjBDXHU2REYxXHU1RUE2XHU4RDhBXHU2REYxXHU5ODlDXHU4MjcyXHU4RDhBXHU2RDQ1XHUzMDAyXG4gKi9cbmZ1bmN0aW9uIEltcGFjdEdyYXBoKHByb3BzOiB7IGRhdGE6IEltcGFjdFNjb3BlUGF5bG9hZDsgdDogKGtleTogc3RyaW5nKSA9PiBzdHJpbmcgfSkge1xuICBjb25zdCB7IGRhdGEgfSA9IHByb3BzXG4gIGNvbnN0IGluZGlyZWN0ID0gZGF0YS5sZXZlbHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmxldmVsID09PSAnaW5kaXJlY3QnKVxuICBjb25zdCBwb3RlbnRpYWwgPSBkYXRhLmxldmVscy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwgPT09ICdwb3RlbnRpYWwnKVxuICBjb25zdCBjb2wwID0gZGF0YS5jaGFuZ2VkRmlsZXMuc2xpY2UoMCwgNylcbiAgY29uc3QgY29sMSA9IEFycmF5LmZyb20obmV3IFNldChpbmRpcmVjdC5tYXAoKGl0ZW0pID0+IGl0ZW0ucGF0aCkpKS5zbGljZSgwLCA5KVxuICBjb25zdCBjb2wyID0gQXJyYXkuZnJvbShuZXcgU2V0KHBvdGVudGlhbC5tYXAoKGl0ZW0pID0+IGl0ZW0ucGF0aCkpKS5maWx0ZXIoKHApID0+ICFjb2wxLmluY2x1ZGVzKHApKS5zbGljZSgwLCA4KVxuICBjb25zdCBub2RlSCA9IDMwXG4gIGNvbnN0IGdhcCA9IDEwXG4gIGNvbnN0IGNvbFggPSBbMzAsIDM4MCwgNzIwXVxuICBjb25zdCBjb2xXID0gMjgwXG4gIGNvbnN0IHJvd3MgPSBNYXRoLm1heChjb2wwLmxlbmd0aCwgY29sMS5sZW5ndGgsIGNvbDIubGVuZ3RoLCAxKVxuICBjb25zdCBoZWlnaHQgPSByb3dzICogKG5vZGVIICsgZ2FwKSArIDYwXG5cbiAgY29uc3QgZGVwdGhPZiA9IChwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSBpbmRpcmVjdC5maW5kKChlbnRyeSkgPT4gZW50cnkucGF0aCA9PT0gcGF0aCkgPz8gcG90ZW50aWFsLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5wYXRoID09PSBwYXRoKVxuICAgIHJldHVybiBpdGVtPy5kZXB0aCA/PyAwXG4gIH1cblxuICBjb25zdCByZW5kZXJDb2wgPSAoY29sOiBudW1iZXIsIGl0ZW1zOiBzdHJpbmdbXSwgY29sb3I6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdID0+IGl0ZW1zLm1hcCgocGF0aCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCB5ID0gNDQgKyBpbmRleCAqIChub2RlSCArIGdhcClcbiAgICBjb25zdCBkaXIgPSBwYXRoLmluY2x1ZGVzKCcvJykgPyBwYXRoLnNsaWNlKDAsIHBhdGgubGFzdEluZGV4T2YoJy8nKSkgOiAnJ1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdnJywgeyBrZXk6IGAke2NvbH0tJHtwYXRofWAgfSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3JlY3QnLCB7IHg6IGNvbFhbY29sXSwgeSwgd2lkdGg6IGNvbFcsIGhlaWdodDogbm9kZUgsIHJ4OiA2LCBmaWxsOiBjb2xvciwgc3Ryb2tlOiAncmdiYSgwLDAsMCwwLjMpJywgc3Ryb2tlV2lkdGg6IDEgfSksXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyB4OiBjb2xYW2NvbF0gKyAxMCwgeTogeSArIDE0LCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgZmlsbDogJyNmZmZmZmYnIH0sXG4gICAgICAgIChwYXRoLnNwbGl0KCcvJykucG9wKCkgPz8gcGF0aCkuc2xpY2UoMCwgMzApKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3RleHQnLCB7IHg6IGNvbFhbY29sXSArIDEwLCB5OiB5ICsgMjYsIGZvbnRTaXplOiAxMCwgZmlsbDogJ3JnYmEoMjU1LDI1NSwyNTUsMC45MiknIH0sXG4gICAgICAgIGRpci5zbGljZSgwLCA0MCkpLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGl0bGUnLCBudWxsLCBwYXRoKSxcbiAgICApXG4gIH0pXG5cbiAgY29uc3QgY2hhaW5TdGFydCA9IChyZWFzb246IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgbWF0Y2ggPSByZWFzb24ubWF0Y2goL3BhdGg6ICguKykkLylcbiAgICBpZiAobWF0Y2ggPT09IG51bGwpIHJldHVybiBkYXRhLmNoYW5nZWRGaWxlc1swXSA/PyAnJ1xuICAgIHJldHVybiBtYXRjaFsxXSEuc3BsaXQoJyAtPiAnKVswXSA/PyBkYXRhLmNoYW5nZWRGaWxlc1swXSA/PyAnJ1xuICB9XG4gIGNvbnN0IGluZGV4SW4gPSAoaXRlbXM6IHN0cmluZ1tdLCBwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4gaXRlbXMuaW5kZXhPZihwYXRoKVxuICBjb25zdCBjb2xPZiA9IChwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGlmIChjb2wwLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMFxuICAgIGlmIChjb2wxLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMVxuICAgIGlmIChjb2wyLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMlxuICAgIHJldHVybiAtMVxuICB9XG5cbiAgY29uc3QgZWRnZXM6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cbiAgY29uc3QgcHVzaEVkZ2UgPSAoZnJvbVBhdGg6IHN0cmluZywgdG9QYXRoOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcsIGtleTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZnJvbUNvbCA9IGNvbE9mKGZyb21QYXRoKVxuICAgIGNvbnN0IHRvQ29sID0gY29sT2YodG9QYXRoKVxuICAgIGlmIChmcm9tQ29sID09PSAtMSB8fCB0b0NvbCA9PT0gLTEgfHwgdG9Db2wgPD0gZnJvbUNvbCkgcmV0dXJuXG4gICAgY29uc3QgeDEgPSBjb2xYW2Zyb21Db2xdICsgY29sV1xuICAgIGNvbnN0IHkxID0gNDQgKyBpbmRleEluKFtjb2wwLCBjb2wxLCBjb2wyXVtmcm9tQ29sXSA/PyBbXSwgZnJvbVBhdGgpICogKG5vZGVIICsgZ2FwKSArIG5vZGVIIC8gMlxuICAgIGNvbnN0IHgyID0gY29sWFt0b0NvbF1cbiAgICBjb25zdCB5MiA9IDQ0ICsgaW5kZXhJbihbY29sMCwgY29sMSwgY29sMl1bdG9Db2xdID8/IFtdLCB0b1BhdGgpICogKG5vZGVIICsgZ2FwKSArIG5vZGVIIC8gMlxuICAgIGVkZ2VzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudCgncGF0aCcsIHtcbiAgICAgIGtleSwgZDogYE0gJHt4MX0gJHt5MX0gQyAke3gxICsgMzB9ICR7eTF9LCAke3gyIC0gMzB9ICR7eTJ9LCAke3gyfSAke3kyfWAsXG4gICAgICBmaWxsOiAnbm9uZScsIHN0cm9rZTogY29sb3IsIHN0cm9rZVdpZHRoOiAxLjYsIG9wYWNpdHk6IDAuNixcbiAgICB9KSlcbiAgfVxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaW5kaXJlY3Quc2xpY2UoMCwgMjApKSBwdXNoRWRnZShjaGFpblN0YXJ0KGl0ZW0ucmVhc29uKSwgaXRlbS5wYXRoLCB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpLCBgZWktJHtpdGVtLnBhdGh9YClcbiAgZm9yIChjb25zdCBpdGVtIG9mIHBvdGVudGlhbC5zbGljZSgwLCAxNikpIHB1c2hFZGdlKGNoYWluU3RhcnQoaXRlbS5yZWFzb24pLCBpdGVtLnBhdGgsIHRoZW1lQXdhcmVUZXh0KCcjNTc2MDZhJyksIGBlcC0ke2l0ZW0ucGF0aH1gKVxuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3N2ZycsIHsgd2lkdGg6ICcxMDAlJywgdmlld0JveDogYDAgMCAxMDI0ICR7aGVpZ2h0fWAsIHN0eWxlOiB7IG1heEhlaWdodDogNDgwIH0gfSxcbiAgICAgIFtbJ1x1NTNEOFx1NjZGNFx1NjU4N1x1NEVGNicsIDBdLCBbJ1x1OTVGNFx1NjNBNVx1NUY3MVx1NTRDRFx1RkYwOFx1OEMwMVx1NUYxNVx1NzUyOFx1NEU4Nlx1NUI4M1x1RkYwOScsIDFdLCBbJ1x1NkY1Q1x1NTcyOFx1NUY3MVx1NTRDRFx1RkYwOFx1NEU4Q1x1N0VBN1x1NEYyMFx1NjRBRFx1RkYwOScsIDJdXS5tYXAoKFtuYW1lLCBjb2xdKSA9PlxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyBrZXk6IFN0cmluZyhjb2wpLCB4OiBjb2xYW2NvbCBhcyBudW1iZXJdLCB5OiAyNCwgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA3MDAsIGZpbGw6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknIH0sIG5hbWUgYXMgc3RyaW5nKSksXG4gICAgICByZW5kZXJDb2woMCwgY29sMCwgJyMyNTYzZWInKSxcbiAgICAgIHJlbmRlckNvbCgxLCBjb2wxLCAnI2Q5NzcwNicpLFxuICAgICAgcmVuZGVyQ29sKDIsIGNvbDIsICcjNTc2MDZhJyksXG4gICAgICBlZGdlcyxcbiAgICApLFxuICApXG59XG5cbmNvbnN0IERJRkZfS0VZV09SRFMgPSAvXFxiKHB1YmxpY3xwcml2YXRlfHByb3RlY3RlZHxpbnRlcm5hbHxzdGF0aWN8dm9pZHxjbGFzc3xzdHJ1Y3R8aW50ZXJmYWNlfGVudW18bmV3fHJldHVybnxpZnxlbHNlfGZvcnxmb3JlYWNofHdoaWxlfHN3aXRjaHxjYXNlfGJyZWFrfGNvbnRpbnVlfHRyeXxjYXRjaHxmaW5hbGx5fHRocm93fHVzaW5nfG5hbWVzcGFjZXxpbXBvcnR8ZXhwb3J0fGZyb218Y29uc3R8bGV0fHZhcnxhc3luY3xhd2FpdHxmdW5jdGlvbnx0aGlzfGJhc2V8c3VwZXJ8bnVsbHx0cnVlfGZhbHNlfG92ZXJyaWRlfHZpcnR1YWx8YWJzdHJhY3R8c2VhbGVkfHJlYWRvbmx5fHBhcmFtc3xvdXR8cmVmfHlpZWxkfHR5cGVvZnxpbnN0YW5jZW9mfGlufG9mfGRlZmF1bHR8c3RyaW5nfGludHxsb25nfGRvdWJsZXxmbG9hdHxib29sfGNoYXJ8ZGVjaW1hbHxvYmplY3R8cmVjb3JkfHBhcnRpYWx8Z2V0fHNldHxyZXF1aXJlfG1vZHVsZXx0eXBlfGltcGxlbWVudHN8ZXh0ZW5kcylcXGIvZ1xuXG4vKiogXHU1MzU1XHU4ODRDXHU0RUUzXHU3ODAxXHU5QUQ4XHU0RUFFXHVGRjFBXHU2Q0U4XHU5MUNBID4gXHU1QjU3XHU3QjI2XHU0RTMyID4gXHU1MTczXHU5NTJFXHU1QjU3L1x1NjU3MFx1NUI1NyBcdTRFMDlcdTVDNDJcdTc3NDBcdTgyNzJcdUZGMDhcdThGN0JcdTkxQ0ZcdTZCNjNcdTUyMTlcdUZGMENcdTU5MUZcdTY4MzhcdTY3RTVcdTc1MjhcdUZGMDlcdTMwMDIgKi9cbmZ1bmN0aW9uIGhpZ2hsaWdodENvZGVMaW5lKGxpbmU6IHN0cmluZywga2V5UHJlZml4OiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XG4gIGNvbnN0IHRyaW1tZWQgPSBsaW5lLnRyaW1TdGFydCgpXG4gIGlmICh0cmltbWVkLnN0YXJ0c1dpdGgoJy8vJykgfHwgdHJpbW1lZC5zdGFydHNXaXRoKCcvLy8nKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJyonKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJy8qJykgfHwgdHJpbW1lZC5zdGFydHNXaXRoKCcjJykpIHtcbiAgICByZXR1cm4gW1JlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1jYCwgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjNmE5OTU1JykgfSB9LCBsaW5lKV1cbiAgfVxuICBjb25zdCBwYXJ0cyA9IGxpbmUuc3BsaXQoLyhcIig/OlteXCJcXFxcXXxcXFxcLikqXCJ8Jyg/OlteJ1xcXFxdfFxcXFwuKSonfGAoPzpbXmBcXFxcXXxcXFxcLikqYCkvZylcbiAgcmV0dXJuIHBhcnRzLm1hcCgocGFydCwgaSkgPT4ge1xuICAgIGlmIChpICUgMiA9PT0gMSkgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1zJHtpfWAsIHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NlOTE3OCcpIH0gfSwgcGFydClcbiAgICBjb25zdCBzdWI6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cbiAgICBsZXQgbGFzdCA9IDBcbiAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIHBhcnQubWF0Y2hBbGwoRElGRl9LRVlXT1JEUykpIHtcbiAgICAgIGlmIChtYXRjaC5pbmRleCEgPiBsYXN0KSBzdWIucHVzaChwYXJ0LnNsaWNlKGxhc3QsIG1hdGNoLmluZGV4KSlcbiAgICAgIHN1Yi5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1rJHtpfS0ke21hdGNoLmluZGV4fWAsIHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzU2OWNkNicpIH0gfSwgbWF0Y2hbMF0pKVxuICAgICAgbGFzdCA9IG1hdGNoLmluZGV4ISArIG1hdGNoWzBdLmxlbmd0aFxuICAgIH1cbiAgICBpZiAobGFzdCA8IHBhcnQubGVuZ3RoKSBzdWIucHVzaChwYXJ0LnNsaWNlKGxhc3QpKVxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCB7IGtleTogYCR7a2V5UHJlZml4fS1wJHtpfWAgfSwgc3ViKVxuICB9KVxufVxuXG4vKiogXHU5QUQ4XHU0RUFFXHU1REVFXHU1RjAyXHU4OUM2XHU1NkZFXHVGRjFBXHU4OUUzXHU2NzkwIHVuaWZpZWQgZGlmZlx1RkYwQ1x1NjMwOSBcdTU4OUUvXHU1MjIwL1x1NTc1N1x1NTkzNC9cdTRFMEFcdTRFMEJcdTY1ODcgXHU3NzQwXHU4MjcyXHUzMDAyICovXG5mdW5jdGlvbiBEaWZmVmlldyhwcm9wczogeyBwYXRjaDogc3RyaW5nIH0pIHtcbiAgY29uc3QgbGluZXMgPSBwcm9wcy5wYXRjaC5zcGxpdCgnXFxuJykuZmlsdGVyKChsaW5lLCBpKSA9PiAhKGxpbmUgPT09ICcnICYmIGkgPT09IHByb3BzLnBhdGNoLnNwbGl0KCdcXG4nKS5sZW5ndGggLSAxKSlcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICBzdHlsZToge1xuICAgICAgZm9udEZhbWlseTogJ0NvbnNvbGFzLCBtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCBsaW5lSGVpZ2h0OiAxLjU1LFxuICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDAnLCBtYXhIZWlnaHQ6IDQyMCwgb3ZlcmZsb3dZOiAnYXV0bycsIG1hcmdpblRvcDogJzZweCcsXG4gICAgfSxcbiAgfSwgbGluZXMubWFwKChsaW5lLCBpKSA9PiB7XG4gICAgY29uc3Qga2luZCA9IGxpbmUuc3RhcnRzV2l0aCgnKysrJykgfHwgbGluZS5zdGFydHNXaXRoKCctLS0nKSA/ICdtZXRhJ1xuICAgICAgOiBsaW5lLnN0YXJ0c1dpdGgoJ0BAJykgPyAnaHVuaydcbiAgICAgICAgOiBsaW5lLnN0YXJ0c1dpdGgoJysnKSA/ICdhZGQnXG4gICAgICAgICAgOiBsaW5lLnN0YXJ0c1dpdGgoJy0nKSA/ICdkZWwnIDogJ2N0eCdcbiAgICBjb25zdCBiZyA9IGtpbmQgPT09ICdhZGQnID8gJ3JnYmEoNDYsMTYwLDY3LDAuMTQpJyA6IGtpbmQgPT09ICdkZWwnID8gJ3JnYmEoMjQ4LDgxLDczLDAuMTMpJyA6IGtpbmQgPT09ICdodW5rJyA/ICdyZ2JhKDU2LDEzOSwyNTMsMC4xKScgOiAndHJhbnNwYXJlbnQnXG4gICAgY29uc3QgY29udGVudCA9IGtpbmQgPT09ICdtZXRhJyB8fCBraW5kID09PSAnaHVuaydcbiAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjMDk2OWRhJyksIGZvbnRXZWlnaHQ6IDYwMCB9IH0sIGxpbmUpXG4gICAgICA6IGtpbmQgPT09ICdhZGQnIHx8IGtpbmQgPT09ICdkZWwnXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KGtpbmQgPT09ICdhZGQnID8gJyMxYTdmMzcnIDogJyNjZjIyMmUnKSwgZm9udFdlaWdodDogNjAwIH0gfSwgbGluZVswXSlcbiAgICAgICAgOiBudWxsXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsga2V5OiBpLCBzdHlsZTogeyBwYWRkaW5nOiAnMCAxMHB4JywgYmFja2dyb3VuZDogYmcsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfSB9LFxuICAgICAgY29udGVudCxcbiAgICAgIGtpbmQgPT09ICdhZGQnIHx8IGtpbmQgPT09ICdkZWwnID8gaGlnaGxpZ2h0Q29kZUxpbmUobGluZS5zbGljZSgxKSwgYGwke2l9YCkgOiBoaWdobGlnaHRDb2RlTGluZShsaW5lLCBgbCR7aX1gKSxcbiAgICApXG4gIH0pKVxufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiAnXHUyMDE0J1xuICByZXR1cm4gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlU3RyaW5nKClcbn1cblxuLyoqIFx1NEU4Q1x1NkIyMVx1Nzg2RVx1OEJBNFx1NUYzOVx1N0E5N1x1RkYxQVx1OTA2RVx1N0Y2OSArIFx1NUM0NVx1NEUyRFx1NTM2MVx1NzI0N1x1RkYwQ1x1NTM3MVx1OTY2OVx1NjRDRFx1NEY1Q1x1RkYwOFx1NTIyMFx1OTY2NFx1N0IxNFx1OEJCMC9cdTUzRDhcdTY2RjQvXHU3RUE2XHU2NzVGXHVGRjA5XHU1MTcxXHU3NTI4XHUzMDAyICovXG5mdW5jdGlvbiBDb25maXJtRGlhbG9nKHByb3BzOiB7IHRpdGxlOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZzsgZGFuZ2VyPzogYm9vbGVhbjsgb25DYW5jZWw6ICgpID0+IHZvaWQ7IG9uQ29uZmlybTogKCkgPT4gdm9pZCB9KSB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLW92ZXJsYXknLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCB6SW5kZXg6IDk5OSxcbiAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMTUsMjMsNDIsMC40NSknLCBiYWNrZHJvcEZpbHRlcjogJ2JsdXIoMnB4KScsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgYW5pbWF0aW9uOiAncGNGYWRlSW4gMC4xNXMgZWFzZS1vdXQnLFxuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ2FuY2VsLFxuICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLWNhcmQnLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHdpZHRoOiA0MDAsIG1heFdpZHRoOiAnY2FsYygxMDB2dyAtIDQ4cHgpJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JywgYm94U2hhZG93OiAnMCAyMHB4IDUwcHggcmdiYSgwLDAsMCwwLjI1KScsXG4gICAgICAgICAgcGFkZGluZzogJzIwcHggMjJweCAxNnB4JyxcbiAgICAgICAgICBvbkNsaWNrOiAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCBnYXA6ICcxMHB4JyB9IH0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgd2lkdGg6IDM0LCBoZWlnaHQ6IDM0LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBmbGV4U2hyaW5rOiAwLFxuICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnMTdweCcsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHByb3BzLmRhbmdlciA/ICdyZ2JhKDI0NCw2Myw5NCwwLjEyKScgOiAncmdiYSgzNyw5OSwyMzUsMC4xKScsXG4gICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5kYW5nZXIgPyB0aGVtZUF3YXJlVGV4dCgnI2UxMWQ0OCcpIDogdGhlbWVBd2FyZVRleHQoJyMyNTYzZWInKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSwgcHJvcHMuZGFuZ2VyID8gJyEnIDogJz8nKSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzZweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9IH0sIHByb3BzLnRpdGxlKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS43LCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9IH0sIHByb3BzLm1lc3NhZ2UpLFxuICAgICAgICAgICksXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJywgZ2FwOiAnMTBweCcsIG1hcmdpblRvcDogJzE4cHgnIH0gfSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XG4gICAgICAgICAgICBzdHlsZTogeyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnN3B4IDE4cHgnLCBib3JkZXJSYWRpdXM6ICc4cHgnIH0sXG4gICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5vbkNhbmNlbCxcbiAgICAgICAgICB9LCAnXHU1M0Q2XHU2RDg4JyksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xuICAgICAgICAgICAgJ2RhdGEtdGVzdGlkJzogJ3BjLWNvbmZpcm0tb2snLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgcGFkZGluZzogJzdweCAxOHB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA1MDAsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHByb3BzLmRhbmdlciA/ICcjZTExZDQ4JyA6ICd2YXIoLS1kc3ctYWxpYXMtYnV0dG9uLWluZm8tZmlsbCwgIzI1NjNlYiknLCBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ29uZmlybSxcbiAgICAgICAgICB9LCAnXHU3ODZFXHU4QkE0XHU1MjIwXHU5NjY0JyksXG4gICAgICAgICksXG4gICAgICApLFxuICAgICksXG4gIClcbn1cblxuLyoqIFx1OUFBOFx1NjdCNlx1NUMwRlx1NTM2MVx1NzI0N1x1MzAwMiAqL1xuZnVuY3Rpb24gQ2FyZChwcm9wczogeyB0aXRsZT86IFJlYWN0LlJlYWN0Tm9kZTsgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLmNhcmQgfSxcbiAgICBwcm9wcy50aXRsZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5zZWN0aW9uVGl0bGUgfSwgcHJvcHMudGl0bGUpLFxuICAgIHByb3BzLmNoaWxkcmVuKVxufVxuXG4vKipcbiAqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NEUzQlx1N0VDNFx1NEVGNlx1RkYxQVx1NTZEQlx1OTg3NVx1N0I3RVx1RkYwOFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1NEUzQVx1OUVEOFx1OEJBNFx1RkYwOSsgXHU4RjZFXHU4QkUyXHU1QkJGXHU0RTNCIEFQSSArIFx1NjMwOVx1OTRBRVx1NTMxNlx1NjRDRFx1NEY1Q1x1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gV29ya3NwYWNlRnJhbWUocHJvcHM6IFdvcmtzcGFjZUZyYW1lUHJvcHMpIHtcbiAgY29uc3QgdCA9IHByb3BzLnQgPz8gZmFsbGJhY2tUXG4gIGNvbnN0IFt0YWIsIHNldFRhYl0gPSB1c2VTdGF0ZTxUYWJLZXk+KCdjb21taXRzJylcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZTxXb3Jrc3BhY2VTdGF0ZSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtsb2FkRXJyb3IsIHNldExvYWRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbYm9vdHN0cmFwcGluZywgc2V0Qm9vdHN0cmFwcGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2FjdGlvblJlc3VsdCwgc2V0QWN0aW9uUmVzdWx0XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtjaGFuZ2VUaXRsZSwgc2V0Q2hhbmdlVGl0bGVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtjaGFuZ2VEZXNjLCBzZXRDaGFuZ2VEZXNjXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbWVtb3J5VGl0bGUsIHNldE1lbW9yeVRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbWVtb3J5Q29udGVudCwgc2V0TWVtb3J5Q29udGVudF0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2NvbmZpcm1lZFRleHQsIHNldENvbmZpcm1lZFRleHRdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtjb25maXJtZWRQYXRocywgc2V0Q29uZmlybWVkUGF0aHNdID0gdXNlU3RhdGUoJycpXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1NzJCNlx1NjAwMSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgW2NvbW1pdHNEYXRhLCBzZXRDb21taXRzRGF0YV0gPSB1c2VTdGF0ZTxDb21taXRzUGF5bG9hZCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtjb21taXRzRXJyb3IsIHNldENvbW1pdHNFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbcGlja2VyT3Blbiwgc2V0UGlja2VyT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW3BpY2tlckZpbHRlciwgc2V0UGlja2VyRmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbc2VsZWN0ZWRUYXJnZXRzLCBzZXRTZWxlY3RlZFRhcmdldHNdID0gdXNlU3RhdGU8c3RyaW5nW10+KFtdKVxuICBjb25zdCBbZGV0YWlscywgc2V0RGV0YWlsc10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBDb21taXREZXRhaWxQYXlsb2FkPj4oe30pXG4gIC8qKiBcdTg5RTNcdThCRkJcdTRFRkJcdTUyQTFcdTcyQjZcdTYwMDFcdUZGMUFxdWV1ZWQ9XHU2MzkyXHU5NjFGXHU3QjQ5XHU0RTMyXHU4ODRDXHU5NjFGXHU1MjE3XHVGRjBDcnVubmluZz1cdTZCNjNcdTU3MjhcdThCRjdcdTZDNDJcdUZGMDhcdTU5MUFcdTkwMDkvXHU2NTc0XHU4RjZFXHU2NUY2XHU4MUVBXHU1MkE4XHU5MDEwXHU0RTJBXHU1MjA2XHU2NzkwXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IFtkZXRhaWxTdGF0dXMsIHNldERldGFpbFN0YXR1c10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCAncXVldWVkJyB8ICdydW5uaW5nJz4+KHt9KVxuICBjb25zdCBkZXRhaWxRdWV1ZWRDb3VudCA9IE9iamVjdC52YWx1ZXMoZGV0YWlsU3RhdHVzKS5maWx0ZXIoKHN0YXR1cykgPT4gc3RhdHVzID09PSAncXVldWVkJykubGVuZ3RoXG4gIGNvbnN0IGRldGFpbFJ1bm5pbmdDb3VudCA9IE9iamVjdC52YWx1ZXMoZGV0YWlsU3RhdHVzKS5maWx0ZXIoKHN0YXR1cykgPT4gc3RhdHVzID09PSAncnVubmluZycpLmxlbmd0aFxuICBjb25zdCBbaW1wYWN0LCBzZXRJbXBhY3RdID0gdXNlU3RhdGU8SW1wYWN0U2NvcGVQYXlsb2FkIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2ltcGFjdExvYWRpbmcsIHNldEltcGFjdExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtyZXZpZXdzLCBzZXRSZXZpZXdzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIFJldmlld1BheWxvYWQ+Pih7fSlcbiAgY29uc3QgW3Jldmlld0xvYWRpbmcsIHNldFJldmlld0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtmaWxlRGlmZnMsIHNldEZpbGVEaWZmc10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+Pih7fSlcbiAgY29uc3QgW2NvbmZpcm1EaWFsb2csIHNldENvbmZpcm1EaWFsb2ddID0gdXNlU3RhdGU8eyB0aXRsZTogc3RyaW5nOyBtZXNzYWdlOiBzdHJpbmc7IGRhbmdlcj86IGJvb2xlYW47IG9uQ29uZmlybTogKCkgPT4gdm9pZCB9IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW25vdGVzLCBzZXROb3Rlc10gPSB1c2VTdGF0ZTxOb3RlRW50cnlbXT4oW10pXG4gIGNvbnN0IFtub3RlVGl0bGUsIHNldE5vdGVUaXRsZV0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW25vdGVDb250ZW50LCBzZXROb3RlQ29udGVudF0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW25vdGVUYWdzLCBzZXROb3RlVGFnc10gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2VkaXRpbmdOb3RlLCBzZXRFZGl0aW5nTm90ZV0gPSB1c2VTdGF0ZTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZzsgdGFnczogc3RyaW5nIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBbbm90ZVNlYXJjaCwgc2V0Tm90ZVNlYXJjaF0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW25vdGVFeHBhbmRlZCwgc2V0Tm90ZUV4cGFuZGVkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+Pih7fSlcbiAgY29uc3QgW2lzc3Vlc0RhdGEsIHNldElzc3Vlc0RhdGFdID0gdXNlU3RhdGU8SXNzdWVFbnRyeVtdIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2lzc3VlU2V2ZXJpdHlGaWx0ZXIsIHNldElzc3VlU2V2ZXJpdHlGaWx0ZXJdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtpc3N1ZVN0YXR1c0ZpbHRlciwgc2V0SXNzdWVTdGF0dXNGaWx0ZXJdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtpc3N1ZUV4cGFuZGVkLCBzZXRJc3N1ZUV4cGFuZGVkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+Pih7fSlcbiAgY29uc3QgW2ZpeEV4cGFuZGVkLCBzZXRGaXhFeHBhbmRlZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oe30pXG4gIGNvbnN0IFt2ZXJpZnlpbmdUYXJnZXQsIHNldFZlcmlmeWluZ1RhcmdldF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbYWlTdW1tYXJpemluZywgc2V0QWlTdW1tYXJpemluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW25hcnJhdGl2ZSwgc2V0TmFycmF0aXZlXSA9IHVzZVN0YXRlPHsgbmFycmF0aXZlOiBzdHJpbmc7IGNhY2hlZDogYm9vbGVhbjsgZ2VuZXJhdGVkQXQ/OiBudW1iZXI7IGNvc3RVc2Q/OiBudW1iZXIgfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtuYXJyYXRpdmVCdXN5LCBzZXROYXJyYXRpdmVCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbcGVlaywgc2V0UGVla10gPSB1c2VTdGF0ZTx7IHBhdGg6IHN0cmluZzsgbGluZTogbnVtYmVyIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBbcGVla0RhdGEsIHNldFBlZWtEYXRhXSA9IHVzZVN0YXRlPFBlZWtQYXlsb2FkIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3BlZWtCdXN5LCBzZXRQZWVrQnVzeV0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW25hcnJhdGl2ZUVycm9yLCBzZXROYXJyYXRpdmVFcnJvcl0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW21vZGVsVGllcnMsIHNldE1vZGVsVGllcnNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgeyBwcm92aWRlcjogc3RyaW5nOyBtb2RlbDogc3RyaW5nIH0+IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW21vZGVsT3B0aW9ucywgc2V0TW9kZWxPcHRpb25zXSA9IHVzZVN0YXRlPEFycmF5PHsgcHJvdmlkZXI6IHN0cmluZzsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nIH0+PihbXSlcbiAgY29uc3QgW21vZGVsU2F2aW5nLCBzZXRNb2RlbFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW21vZGVsU2F2ZWQsIHNldE1vZGVsU2F2ZWRdID0gdXNlU3RhdGUoZmFsc2UpXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdUZGMUFcdThCQTFcdTUyMTJcdTc4NkVcdThCQTQgLyBSdW4gXHU4QkU2XHU2MEM1IC8gXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExIFx1MjUwMFx1MjUwMFxuICBjb25zdCBbcGxhbkNvbmZpcm0sIHNldFBsYW5Db25maXJtXSA9IHVzZVN0YXRlPHsgY2hhbmdlSWQ6IHN0cmluZzsgc3RlcHM6IFBsYW5Db25maXJtU3RlcFtdIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBbcGxhbkJ1c3ksIHNldFBsYW5CdXN5XSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbcnVuRGV0YWlsLCBzZXRSdW5EZXRhaWxdID0gdXNlU3RhdGU8UnVuRGV0YWlsIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3NjaGVkdWxlZERhdGEsIHNldFNjaGVkdWxlZERhdGFdID0gdXNlU3RhdGU8U2NoZWR1bGVkVGFza0VudHJ5W10gfCBudWxsPihudWxsKVxuICBjb25zdCBbc2NoZWROYW1lLCBzZXRTY2hlZE5hbWVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtzY2hlZE9wZW4sIHNldFNjaGVkT3Blbl0gPSB1c2VTdGF0ZSh0cnVlKVxuICBjb25zdCBbc2NoZWRUeXBlLCBzZXRTY2hlZFR5cGVdID0gdXNlU3RhdGUoJ3JldmlldycpXG4gIGNvbnN0IFtzY2hlZFRpdGxlLCBzZXRTY2hlZFRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbc2NoZWREZXNjLCBzZXRTY2hlZERlc2NdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtzY2hlZEludGVydmFsLCBzZXRTY2hlZEludGVydmFsXSA9IHVzZVN0YXRlKCcxNDQwJylcbiAgLy8gXHUyNTAwXHUyNTAwIFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1RkYxQVx1NTE2OFx1OTFDRlx1NjU3MFx1NjM2RSAvIFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgW21lbW9yaWVzRGF0YSwgc2V0TWVtb3JpZXNEYXRhXSA9IHVzZVN0YXRlPE1lbW9yaWVzUGF5bG9hZCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtzeW5jUmVwb3J0LCBzZXRTeW5jUmVwb3J0XSA9IHVzZVN0YXRlPFN5bmNSZXBvcnQgfCBudWxsPihudWxsKVxuICBjb25zdCBbbWVtb3J5U2NvcGUsIHNldE1lbW9yeVNjb3BlXSA9IHVzZVN0YXRlPCdwcm9qZWN0JyB8ICdicmFuY2gnPigncHJvamVjdCcpXG4gIGNvbnN0IFttZW1vcnlUeXBlLCBzZXRNZW1vcnlUeXBlXSA9IHVzZVN0YXRlKCdhcmNoaXRlY3R1cmVfZGVjaXNpb24nKVxuICBjb25zdCBbbWVtb3J5U3luY2luZywgc2V0TWVtb3J5U3luY2luZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2V4ZWNUaXRsZSwgc2V0RXhlY1RpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbZXhlY01vZGVsLCBzZXRFeGVjTW9kZWxdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtleGVjRGVzYywgc2V0RXhlY0Rlc2NdID0gdXNlU3RhdGUoJycpXG5cbiAgLyoqIFx1N0VERlx1NEUwMCBQT1NUXHVGRjFBXHU1RTI2XHU4RDg1XHU2NUY2XHU1MTVDXHU1RTk1XHVGRjA4TExNIFx1N0FFRlx1NzBCOVx1NjcwRFx1NTJBMVx1N0FFRiAxMjBzIFx1NEYxQVx1OTY0RFx1N0VBN1x1OEZENFx1NTZERVx1RkYwQ1x1NUJBMlx1NjIzN1x1N0FFRiAxODBzIFx1NTNFQVx1NTE1Q1x1NUU5NVx1NzcxRlx1NkI2M1x1NzY4NFx1N0Y1MVx1N0VEQ1x1NEUyRFx1NjVBRFx1RkYwOVx1RkYwQ1x1N0VERFx1NEUwRFx1OEJBOVx1OEJGN1x1NkM0Mlx1NjVFMFx1OTY1MFx1NjMwMlx1OEQ3N1x1MzAwMiAqL1xuICBjb25zdCBwb3N0ID0gYXN5bmMgKHBhdGg6IHN0cmluZywgYm9keTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIHRpbWVvdXRNcyA9IDE4MF8wMDApOiBQcm9taXNlPHsgb2s6IGJvb2xlYW47IGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IH0+ID0+IHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpXG4gICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgdGltZW91dE1zKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHBhdGgsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IC4uLmJvZHksIHNlc3Npb25JZDogcHJvcHMuc2Vzc2lvbklkIH0pLFxuICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgfSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIHJldHVybiB7IG9rOiByZXNwb25zZS5vaywgZGF0YTogKGRhdGEgPz8ge30pIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+IH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBwZWVrXHVGRjFBXHU2MjUzXHU1RjAwXHU2N0QwXHU2NTg3XHU0RUY2XHU2N0QwXHU4ODRDXHU5NjQ0XHU4RkQxXHU3Njg0XHU0RUUzXHU3ODAxXHU0RTBBXHU0RTBCXHU2NTg3XHU2RDZFXHU1QzQyXHVGRjA4XHU2NzA5XHU3NTRDXHU3QjQ5XHU1Rjg1IDEwIFx1NzlEMlx1RkYwOVx1MzAwMiAqL1xuICBwZWVrT3BlbmVyID0gKHBhdGg6IHN0cmluZywgbGluZTogbnVtYmVyKTogdm9pZCA9PiB7IHZvaWQgb3BlblBlZWsocGF0aCwgbGluZSkgfVxuICBjb25zdCBvcGVuUGVlayA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGxpbmU6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldFBlZWsoeyBwYXRoLCBsaW5lIH0pXG4gICAgc2V0UGVla0RhdGEobnVsbClcbiAgICBzZXRQZWVrQnVzeSh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpXG4gICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCAxMF8wMDApXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9wZWVrJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJywgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcGF0aCwgbGluZSwgc2Vzc2lvbklkOiBwcm9wcy5zZXNzaW9uSWQgfSksXG4gICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICB9KVxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXRQZWVrRGF0YShkYXRhIGFzIFBlZWtQYXlsb2FkKVxuICAgIH0gY2F0Y2gge1xuICAgICAgc2V0UGVla0RhdGEoeyBleGlzdHM6IGZhbHNlIH0pXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFBlZWtCdXN5KGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTVERTVcdTRGNUNcdThGNkVcdTZCMjFcdTUzRDlcdTRFOEJcdUZGMUFcdTU5MUFcdTRFMkFcdTkwMDlcdTRFMkRcdTYzRDBcdTRFQTRcdTRGNUNcdTRFM0FcdTRFMDBcdTRFMkFcdTY1NzRcdTRGNTNcdTg5RTNcdThCRkJcdUZGMDhcdTdGMTNcdTVCNTggKyBcdTUzRUZcdTVGM0FcdTUyMzZcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgbG9hZE5hcnJhdGl2ZSA9IGFzeW5jIChmb3JjZSA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3Qgc2hhcyA9IHNlbGVjdGVkVGFyZ2V0cy5maWx0ZXIoKHRhcmdldCkgPT4gdGFyZ2V0ICE9PSAnd29ya2luZycpXG4gICAgaWYgKHNoYXMubGVuZ3RoIDwgMikgcmV0dXJuXG4gICAgc2V0TmFycmF0aXZlQnVzeSh0cnVlKVxuICAgIHNldE5hcnJhdGl2ZUVycm9yKCcnKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS93b3JrLW5hcnJhdGl2ZScsIHsgc2hhcywgZm9yY2UgfSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0TmFycmF0aXZlRXJyb3IoU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0TmFycmF0aXZlKHtcbiAgICAgICAgbmFycmF0aXZlOiBTdHJpbmcoZGF0YVsnbmFycmF0aXZlJ10gPz8gJycpLFxuICAgICAgICBjYWNoZWQ6IGRhdGFbJ2NhY2hlZCddID09PSB0cnVlLFxuICAgICAgICBnZW5lcmF0ZWRBdDogZGF0YVsnZ2VuZXJhdGVkQXQnXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogTnVtYmVyKGRhdGFbJ2dlbmVyYXRlZEF0J10pLFxuICAgICAgICBjb3N0VXNkOiBkYXRhWydjb3N0VXNkJ10gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IE51bWJlcihkYXRhWydjb3N0VXNkJ10pLFxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0TmFycmF0aXZlRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXROYXJyYXRpdmVCdXN5KGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWRDb21taXRzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvcHJvamVjdC1jb250cm9sL2FwaS9jb21taXRzP3Nlc3Npb25JZD0ke2VuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpfSZsaW1pdD02MGApXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoKGRhdGEgYXMgeyBlcnJvcj86IHN0cmluZyB9KS5lcnJvciA/PyBgSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKVxuICAgICAgc2V0Q29tbWl0c0RhdGEoZGF0YSBhcyBDb21taXRzUGF5bG9hZClcbiAgICAgIHNldENvbW1pdHNFcnJvcihudWxsKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRDb21taXRzRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWROb3RlcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXM/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0Tm90ZXMoKGRhdGEgYXMgeyBub3RlczogTm90ZUVudHJ5W10gfSkubm90ZXMgPz8gW10pXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTdCMTRcdThCQjBcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcdUZGMUFcdTUyMTdcdTg4NjhcdTRGRERcdTYzMDFcdTUzOUZcdTY4MzdcdTMwMDJcbiAgICB9XG4gIH1cblxuICAvKiogXHU1MkZFXHU5MDA5L1x1NTNENlx1NkQ4OFx1NEUwMFx1NkIyMVx1NjNEMFx1NEVBNFx1RkYxQVx1OTFDRFx1N0I5N1x1OTAwOVx1NEUyRFx1OTZDNlx1NTQwOFx1RkYwQ1x1NUU3Nlx1NjMwOVx1OTcwMFx1ODg2NVx1OUY1MFx1NkJDRlx1Njc2MVx1NjNEMFx1NEVBNFx1NzY4NCBBSSBcdTg5RTNcdThCRkJcdUZGMDhcdTY3MERcdTUyQTFcdTdBRUZcdTY3MDlcdTdGMTNcdTVCNThcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgdG9nZ2xlVGFyZ2V0ID0gYXN5bmMgKHRhcmdldDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0U2VsZWN0ZWRUYXJnZXRzKChwcmV2aW91cykgPT4ge1xuICAgICAgaWYgKHByZXZpb3VzLmluY2x1ZGVzKHRhcmdldCkpIHJldHVybiBwcmV2aW91cy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IHRhcmdldClcbiAgICAgIHJldHVybiBbLi4ucHJldmlvdXMsIHRhcmdldF1cbiAgICB9KVxuICAgIHNldEltcGFjdChudWxsKVxuICAgIHNldFJldmlld3Moe30pXG4gICAgaWYgKCFzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXModGFyZ2V0KSkge1xuICAgICAgbG9hZERldGFpbCh0YXJnZXQsIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTY1NzRcdThGNkVcdTkwMDlcdTYyRTlcdUZGMUFcdTY1NzRcdThGNkVcdTVERjJcdTkwMDlcdTY1RjZcdTUxOERcdTcwQjkgPSBcdTUzRDZcdTZEODhcdTY1NzRcdThGNkVcdUZGMUJcdTY1QjBcdTUyRkVcdTkwMDlcdTc2ODRcdTYzRDBcdTRFQTRcdTU0MDRcdTgxRUFcdTYyQzlcdTUzRDYgQUkgXHU4OUUzXHU4QkZCXHUzMDAyICovXG4gIGNvbnN0IHNlbGVjdFJvdW5kID0gKHNoYXM6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gICAgc2V0SW1wYWN0KG51bGwpXG4gICAgc2V0UmV2aWV3cyh7fSlcbiAgICBpZiAoc2hhcy5ldmVyeSgoc2hhKSA9PiBzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoc2hhKSkpIHtcbiAgICAgIHNldFNlbGVjdGVkVGFyZ2V0cygocHJldmlvdXMpID0+IHByZXZpb3VzLmZpbHRlcigoc2hhKSA9PiAhc2hhcy5pbmNsdWRlcyhzaGEpKSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBhZGRlZCA9IHNoYXMuZmlsdGVyKChzaGEpID0+ICFzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoc2hhKSlcbiAgICBzZXRTZWxlY3RlZFRhcmdldHMoKHByZXZpb3VzKSA9PiBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLnByZXZpb3VzLCAuLi5zaGFzXSkpKVxuICAgIGZvciAoY29uc3Qgc2hhIG9mIGFkZGVkKSBsb2FkRGV0YWlsKHNoYSwgZmFsc2UpXG4gIH1cblxuICAvKiogXHU4OUUzXHU4QkZCXHU1RTc2XHU1M0QxXHU2QzYwXHVGRjFBXHU2QTIxXHU1NzhCXHU3RjUxXHU1MTczXHU1RTc2XHU1M0QxXHU2NzA5XHU5NjUwXHVGRjBDXHU1OTFBXHU5MDA5L1x1NjU3NFx1OEY2RVx1NjI3OVx1OTFDRlx1NTJGRVx1OTAwOVx1NjVGNlx1NjMwOVx1NEUwQVx1OTY1MFx1NUU3Nlx1NTNEMVx1NTIwNlx1Njc5MFx1RkYwOFx1OUVEOFx1OEJBNFx1NjcwMFx1NTkxQSAzIFx1NEUyQVx1NTQwQ1x1NjVGNlx1RkYwOVx1RkYwQ1x1OEQ4NVx1NTFGQVx1NzY4NFx1NjM5Mlx1OTYxRlx1N0I0OVx1NUY4NVx1NUU3Nlx1NjYzRVx1NzkzQVx1OTYxRlx1NTIxN1x1NjU3MFx1MzAwMiAqL1xuICBjb25zdCBNQVhfREVUQUlMX0NPTkNVUlJFTkNZID0gM1xuICBjb25zdCBkZXRhaWxQb29sUmVmID0gdXNlUmVmPHsgcGVuZGluZzogQXJyYXk8eyB0YXJnZXQ6IHN0cmluZzsgZm9yY2U6IGJvb2xlYW4gfT47IGFjdGl2ZTogbnVtYmVyIH0+KHsgcGVuZGluZzogW10sIGFjdGl2ZTogMCB9KVxuICBjb25zdCBkZXRhaWxJbkZsaWdodFJlZiA9IHVzZVJlZihuZXcgU2V0PHN0cmluZz4oKSlcblxuICBjb25zdCBwdW1wRGV0YWlsUG9vbCA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBwb29sID0gZGV0YWlsUG9vbFJlZi5jdXJyZW50XG4gICAgd2hpbGUgKHBvb2wuYWN0aXZlIDwgTUFYX0RFVEFJTF9DT05DVVJSRU5DWSAmJiBwb29sLnBlbmRpbmcubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3Qgam9iID0gcG9vbC5wZW5kaW5nLnNoaWZ0KCkhXG4gICAgICBwb29sLmFjdGl2ZSArPSAxXG4gICAgICB2b2lkIGxvYWREZXRhaWxPbmNlKGpvYi50YXJnZXQsIGpvYi5mb3JjZSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHt9KVxuICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgcG9vbC5hY3RpdmUgLT0gMVxuICAgICAgICAgIHB1bXBEZXRhaWxQb29sKClcbiAgICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkRGV0YWlsID0gKHRhcmdldDogc3RyaW5nLCBmb3JjZTogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIGlmIChkZXRhaWxJbkZsaWdodFJlZi5jdXJyZW50Lmhhcyh0YXJnZXQpKSByZXR1cm5cbiAgICBkZXRhaWxJbkZsaWdodFJlZi5jdXJyZW50LmFkZCh0YXJnZXQpXG4gICAgc2V0RGV0YWlsU3RhdHVzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFt0YXJnZXRdOiAncXVldWVkJyB9KSlcbiAgICBkZXRhaWxQb29sUmVmLmN1cnJlbnQucGVuZGluZy5wdXNoKHsgdGFyZ2V0LCBmb3JjZSB9KVxuICAgIHB1bXBEZXRhaWxQb29sKClcbiAgfVxuXG4gIC8qKiBcdTk2MUZcdTUyMTdcdTRFRkJcdTUyQTFcdTRGNTNcdUZGMUFcdTc3MUZcdTZCNjNcdTUzRDFcdThENzdcdTg5RTNcdThCRkJcdThCRjdcdTZDNDJcdUZGMUJcdTRFRkJcdTRGNTVcdTU5MzFcdThEMjVcdUZGMDhcdTdGNTFcdTdFRENcdTRFMkRcdTY1QUQvXHU4RDg1XHU2NUY2L1x1NjcwRFx1NTJBMVx1NjcyQVx1OEZEMFx1ODg0Q1x1RkYwOVx1OTBGRFx1NTE5OVx1NTE2NVx1NTM2MVx1NzI0N1x1OTUxOVx1OEJFRlx1NTM2MFx1NEY0RFx1RkYwQ1x1N0VERFx1NEUwRFx1NjVFMFx1OTY1MFx1OEY2Q1x1NTcwOFx1MzAwMiAqL1xuICBjb25zdCBsb2FkRGV0YWlsT25jZSA9IGFzeW5jICh0YXJnZXQ6IHN0cmluZywgZm9yY2U6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXREZXRhaWxTdGF0dXMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW3RhcmdldF06ICdydW5uaW5nJyB9KSlcbiAgICBjb25zdCBmYWlsUGxhY2Vob2xkZXIgPSAobWVzc2FnZTogc3RyaW5nKTogQ29tbWl0RGV0YWlsUGF5bG9hZCA9PlxuICAgICAgKHtcbiAgICAgICAgc2hhOiB0YXJnZXQsXG4gICAgICAgIGlzV29ya2luZzogdGFyZ2V0ID09PSAnd29ya2luZycsXG4gICAgICAgIGZpbGVzOiBbXSxcbiAgICAgICAgaW5zZXJ0aW9uczogMCxcbiAgICAgICAgZGVsZXRpb25zOiAwLFxuICAgICAgICBwYXRjaFRydW5jYXRlZDogZmFsc2UsXG4gICAgICAgIHBhdGNoOiAnJyxcbiAgICAgICAgY29tbWl0OiBudWxsLFxuICAgICAgICBhbmFseXNpczogeyB3aGF0OiBtZXNzYWdlLCBsb2dpYzogW10sIHJpc2tzOiBbXSB9LFxuICAgICAgfSkgYXMgdW5rbm93biBhcyBDb21taXREZXRhaWxQYXlsb2FkXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbW1pdC1kZXRhaWwnLCB7IHNoYTogdGFyZ2V0LCBmb3JjZSB9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHtcbiAgICAgICAgICAuLi5wcmV2aW91cyxcbiAgICAgICAgICBbdGFyZ2V0XTogZmFpbFBsYWNlaG9sZGVyKCdBSSBcdTg5RTNcdThCRkJcdTU5MzFcdThEMjVcdUZGMUEnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJycpICsgJ1x1RkYwOFx1NzBCOVx1MzAwQ1x1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1MzAwRFx1NTNFRlx1OTFDRFx1OEJENVx1RkYwOScpLFxuICAgICAgICB9KSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFt0YXJnZXRdOiBkYXRhIGFzIHVua25vd24gYXMgQ29tbWl0RGV0YWlsUGF5bG9hZCB9KSlcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgY29uc3QgcmVhc29uID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpXG4gICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHtcbiAgICAgICAgLi4ucHJldmlvdXMsXG4gICAgICAgIFt0YXJnZXRdOiBmYWlsUGxhY2Vob2xkZXIoYEFJIFx1ODlFM1x1OEJGQlx1NTkzMVx1OEQyNVx1RkYxQSR7cmVhc29uID09PSAnVGhlIHVzZXIgYWJvcnRlZCBhIHJlcXVlc3QuJyA/ICdcdThCRjdcdTZDNDJcdThEODVcdTY1RjZcdTYyMTZcdTY3MERcdTUyQTFcdTRFMkRcdTY1QUQnIDogcmVhc29ufVx1RkYwOFx1NjhDMFx1NjdFNSBkc2ggXHU2NjJGXHU1NDI2XHU1NzI4XHU4RkQwXHU4ODRDXHVGRjFCXHU3MEI5XHUzMDBDXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwXHUzMDBEXHU1M0VGXHU5MUNEXHU4QkQ1XHVGRjA5YCksXG4gICAgICB9KSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgZGV0YWlsSW5GbGlnaHRSZWYuY3VycmVudC5kZWxldGUodGFyZ2V0KVxuICAgICAgc2V0RGV0YWlsU3RhdHVzKChwcmV2aW91cykgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9XG4gICAgICAgIGRlbGV0ZSBuZXh0W3RhcmdldF1cbiAgICAgICAgcmV0dXJuIG5leHRcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZEltcGFjdCA9IGFzeW5jIChmb3JjZSA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDApIHJldHVyblxuICAgIHNldEltcGFjdExvYWRpbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaW1wYWN0LXNjb3BlJywgeyBzaGFzOiBzZWxlY3RlZFRhcmdldHMsIGZvcmNlIH0pXG4gICAgICBzZXRJbXBhY3Qob2sgPyAoZGF0YSBhcyB1bmtub3duIGFzIEltcGFjdFNjb3BlUGF5bG9hZCkgOiBudWxsKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJbXBhY3RMb2FkaW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWRSZXZpZXdzID0gYXN5bmMgKGZvcmNlID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoc2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgc2V0UmV2aWV3TG9hZGluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBzZWxlY3RlZFRhcmdldHMpIHtcbiAgICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcmV2aWV3JywgeyBzaGE6IHRhcmdldCwgZm9yY2UgfSlcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGRhdGEgYXMgdW5rbm93biBhcyBSZXZpZXdQYXlsb2FkXG4gICAgICAgIHNldFJldmlld3MoKHByZXZpb3VzKSA9PiAoe1xuICAgICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICAgIFt0YXJnZXRdOiBvayA/IHBheWxvYWQgOiB7XG4gICAgICAgICAgICBpc3N1ZXNGb3VuZDogMCxcbiAgICAgICAgICAgIGlzc3VlczogJycsXG4gICAgICAgICAgICB2ZXJkaWN0OiAnXHU4QkM0XHU1QkExXHU1OTMxXHU4RDI1XHVGRjFBJyArIFN0cmluZyhwYXlsb2FkWydlcnJvciddID8/ICcnKSArICdcdUZGMDhcdTUzRUZcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdTkxQ0RcdThCRDVcdUZGMDknLFxuICAgICAgICAgICAgaXNzdWVMaXN0OiBbXSxcbiAgICAgICAgICAgIGNhY2hlZDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSkpXG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFJldmlld0xvYWRpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZEZpbGVEaWZmID0gYXN5bmMgKHNoYTogc3RyaW5nLCBwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBrZXkgPSBgJHtzaGF9fCR7cGF0aH1gXG4gICAgaWYgKGZpbGVEaWZmc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNldEZpbGVEaWZmcygocHJldmlvdXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfVxuICAgICAgICBkZWxldGUgbmV4dFtrZXldXG4gICAgICAgIHJldHVybiBuZXh0XG4gICAgICB9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvZmlsZS1kaWZmJywgeyBzaGEsIHBhdGggfSlcbiAgICBzZXRGaWxlRGlmZnMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW2tleV06IFN0cmluZyhkYXRhWydwYXRjaCddID8/ICcnKSB9KSlcbiAgfVxuXG4gIGNvbnN0IGxvYWRJc3N1ZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcz9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXRJc3N1ZXNEYXRhKChkYXRhIGFzIHsgaXNzdWVzOiBJc3N1ZUVudHJ5W10gfSkuaXNzdWVzID8/IFtdKVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gXHU5NUVFXHU5ODk4XHU1MjE3XHU4ODY4XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXHVGRjFBXHU1MjE3XHU4ODY4XHU0RkREXHU2MzAxXHU1MzlGXHU2ODM3XHUzMDAyXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1OTVFRVx1OTg5OFx1NTkwRFx1NjhDMFx1RkYxQVx1NUJGOVx1OEJFNVx1OTVFRVx1OTg5OFx1NjI0MFx1NUM1RVx1OEJDNFx1NUJBMVx1NzZFRVx1NjgwN1x1OTFDRFx1OEREMVx1NjhDMFx1NkQ0Qlx1RkYwOFx1NEZFRVx1NTkwRFx1Nzg2RVx1OEJBNCArIFx1NjcwMFx1NEYxOFx1NjAyNy9cdTY3MDBcdTVDMEZcdTRGQjVcdTUxNjUgKyBcdTY1QjBcdTk1RUVcdTk4OThcdTYyNkJcdTYzQ0ZcdUZGMDlcdUZGMENcbiAgICogXHU1M0VBXHU2NzA5XHU1OTBEXHU2OEMwXHU5MDFBXHU4RkM3XHU2MjREXHU4MUVBXHU1MkE4XHU3RjZFXHU0RTNBXHU1REYyXHU4OUUzXHU1MUIzXHVGRjFCXHU3RUQzXHU2NzlDXHU0RUU1XHU1OTBEXHU2OEMwXHU2MkE1XHU1NDRBXHU1RjYyXHU1RjBGXHU1QzU1XHU3OTNBXHUzMDAyXG4gICAqL1xuICBjb25zdCB2ZXJpZnlJc3N1ZXMgPSBhc3luYyAodGFyZ2V0OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRWZXJpZnlpbmdUYXJnZXQodGFyZ2V0KVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXMvdmVyaWZ5JywgeyB0YXJnZXQgfSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc29sdmVkID0gKGRhdGFbJ3Jlc29sdmVkJ10gYXMgc3RyaW5nW10gfCB1bmRlZmluZWQpID8/IFtdXG4gICAgICBjb25zdCBzdGlsbE9wZW4gPSAoZGF0YVsnc3RpbGxPcGVuJ10gYXMgQXJyYXk8eyB0aXRsZTogc3RyaW5nOyByZWFzb246IHN0cmluZyB9PiB8IHVuZGVmaW5lZCkgPz8gW11cbiAgICAgIGNvbnN0IG5ld0lzc3VlcyA9IChkYXRhWyduZXdJc3N1ZXMnXSBhcyBBcnJheTx7IHNldmVyaXR5OiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT4gfCB1bmRlZmluZWQpID8/IFtdXG4gICAgICBjb25zdCB2ZXJkaWN0ID0gU3RyaW5nKGRhdGFbJ3ZlcmRpY3QnXSA/PyAnJylcbiAgICAgIGNvbnN0IGxpbmVzID0gW1xuICAgICAgICBgXHU1OTBEXHU2OEMwXHU1QjhDXHU2MjEwXHVGRjFBXHU1REYyXHU0RkVFXHU1OTBEICR7cmVzb2x2ZWQubGVuZ3RofSBcdTAwQjcgXHU0RUNEXHU2NzJBXHU0RkVFXHU1OTBEICR7c3RpbGxPcGVuLmxlbmd0aH0gXHUwMEI3IFx1NjVCMFx1NTg5RVx1OTVFRVx1OTg5OCAke25ld0lzc3Vlcy5sZW5ndGh9YCxcbiAgICAgICAgLi4uKHJlc29sdmVkLmxlbmd0aCA+IDAgPyBbYFx1MjcxMyBcdTVERjJcdTRGRUVcdTU5MERcdUZGMUEke3Jlc29sdmVkLmpvaW4oJ1x1RkYxQicpfWBdIDogW10pLFxuICAgICAgICAuLi4oc3RpbGxPcGVuLmxlbmd0aCA+IDAgPyBzdGlsbE9wZW4ubWFwKChpdGVtKSA9PiBgXHUyNzE3IFx1NjcyQVx1NEZFRVx1NTkwRFx1RkYxQSR7aXRlbS50aXRsZX0gXHUyMDE0XHUyMDE0ICR7aXRlbS5yZWFzb259YCkgOiBbXSksXG4gICAgICAgIC4uLihuZXdJc3N1ZXMubGVuZ3RoID4gMCA/IG5ld0lzc3Vlcy5tYXAoKGl0ZW0pID0+IGBcdUZGMEIgXHU2NUIwXHU5NUVFXHU5ODk4XHVGRjFBWyR7aXRlbS5zZXZlcml0eX1dICR7aXRlbS50aXRsZX1gKSA6IFtdKSxcbiAgICAgICAgLi4uKHZlcmRpY3QgPT09ICcnID8gW10gOiBbYFx1NjcwMFx1NEYxOFx1NjAyN1x1RkYxQSR7dmVyZGljdH1gXSksXG4gICAgICBdXG4gICAgICBzZXRBY3Rpb25SZXN1bHQobGluZXMuam9pbignXFxuJykpXG4gICAgICBhd2FpdCBsb2FkSXNzdWVzKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRWZXJpZnlpbmdUYXJnZXQobnVsbClcbiAgICB9XG4gIH1cblxuICBjb25zdCBhZGROb3RlID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChub3RlVGl0bGUudHJpbSgpID09PSAnJyB8fCBub3RlQ29udGVudC50cmltKCkgPT09ICcnKSByZXR1cm5cbiAgICBjb25zdCB7IG9rIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3RlcycsIHtcbiAgICAgIHRpdGxlOiBub3RlVGl0bGUudHJpbSgpLFxuICAgICAgY29udGVudDogbm90ZUNvbnRlbnQudHJpbSgpLFxuICAgICAgdGFnczogbm90ZVRhZ3MsXG4gICAgICBzaGE6IHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiBzZWxlY3RlZFRhcmdldHNbMF0sXG4gICAgfSlcbiAgICBpZiAob2spIHtcbiAgICAgIHNldE5vdGVUaXRsZSgnJylcbiAgICAgIHNldE5vdGVDb250ZW50KCcnKVxuICAgICAgc2V0Tm90ZVRhZ3MoJycpXG4gICAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlbW92ZU5vdGUgPSBhc3luYyAoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL2RlbGV0ZScsIHsgaWQgfSlcbiAgICBpZiAoZWRpdGluZ05vdGUgIT09IG51bGwgJiYgZWRpdGluZ05vdGUuaWQgPT09IGlkKSBzZXRFZGl0aW5nTm90ZShudWxsKVxuICAgIGF3YWl0IGxvYWROb3RlcygpXG4gIH1cblxuICBjb25zdCBzYXZlTm90ZUVkaXQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKGVkaXRpbmdOb3RlID09PSBudWxsKSByZXR1cm5cbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy91cGRhdGUnLCB7IGlkOiBlZGl0aW5nTm90ZS5pZCwgdGl0bGU6IGVkaXRpbmdOb3RlLnRpdGxlLCBjb250ZW50OiBlZGl0aW5nTm90ZS5jb250ZW50LCB0YWdzOiBlZGl0aW5nTm90ZS50YWdzIH0pXG4gICAgc2V0RWRpdGluZ05vdGUobnVsbClcbiAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICB9XG5cbiAgLyoqIFx1N0Y2RVx1OTg3Ni9cdTUzRDZcdTZEODhcdTdGNkVcdTk4NzZcdTRFMDBcdTY3NjFcdTdCMTRcdThCQjBcdTMwMDIgKi9cbiAgY29uc3QgdG9nZ2xlTm90ZVBpbiA9IGFzeW5jIChub3RlOiBOb3RlRW50cnkpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy91cGRhdGUnLCB7IGlkOiBub3RlLmlkLCBwaW5uZWQ6IG5vdGUucGlubmVkICE9PSB0cnVlIH0pXG4gICAgYXdhaXQgbG9hZE5vdGVzKClcbiAgfVxuXG4gIC8qKiBcdTdCMTRcdThCQjBcdTVCRkNcdTUxRkFcdTRFM0EgLm1kIFx1NjU4N1x1NEVGNlx1RkYwOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1N0FFRiBCbG9iIFx1NEUwQlx1OEY3RFx1RkYxQlx1NjU4N1x1NEVGNlx1NTQwRFx1NjMwOVx1NjgwN1x1OTg5OFx1NkUwNVx1NkQxN1x1RkYwQ1x1OTc1RVx1NkNENVx1NUI1N1x1N0IyNlx1NjZGRlx1NjM2Mlx1NEUzQVx1NEUwQlx1NTIxMlx1N0VCRlx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBleHBvcnROb3RlID0gKG5vdGU6IE5vdGVFbnRyeSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IG1kID0gYCMgJHtub3RlLnRpdGxlfVxcblxcbiR7bm90ZS5jb250ZW50fVxcbmBcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW21kXSwgeyB0eXBlOiAndGV4dC9tYXJrZG93bjtjaGFyc2V0PXV0Zi04JyB9KVxuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgICBjb25zdCBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBhbmNob3IuaHJlZiA9IHVybFxuICAgIGFuY2hvci5kb3dubG9hZCA9IChub3RlLnRpdGxlLnJlcGxhY2UoL1tcXFxcLzoqP1wiPD58XS9nLCAnXycpLnRyaW0oKS5zbGljZSgwLCA2MCkgfHwgJ25vdGUnKSArICcubWQnXG4gICAgYW5jaG9yLmNsaWNrKClcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybClcbiAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgnbm90ZXMuZXhwb3J0RG9uZScpKVxuICB9XG5cbiAgLyoqIEFJIFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1RkYxQVx1NUJGOVx1NkJENFx1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NTA1QVx1NTg5RVx1OTFDRlx1NjZGNFx1NjVCMFx1RkYwQ1x1NjI4QVx1N0IxNFx1OEJCMCtcdTk4NzlcdTc2RUVcdTY4NjNcdTY4NDhcdTYzRDBcdTcwQkNcdTYyMTBcdTRFMDBcdTRFRkRcdTMwMENcdTZEM0JcdTMwMERcdTc2ODRcdTYwM0JcdTdFRDNcdTY1ODdcdTY4NjNcdTMwMDIgKi9cbiAgY29uc3QgYWlTdW1tYXJpemUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0QWlTdW1tYXJpemluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy9haS1zdW1tYXJ5Jywge30pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoZGF0YVsndXBkYXRlZCddID09PSB0cnVlXG4gICAgICAgID8gJ1x1MjcxMyBcdTVERjJcdTVCRjlcdTZCRDRcdTRFMEFcdTZCMjFcdTYwM0JcdTdFRDNcdTVCOENcdTYyMTBcdTU4OUVcdTkxQ0ZcdTY2RjRcdTY1QjBcdUZGMDhcdTY1QjBcdTU4OUVcdTUzRDhcdTUzMTZcdTg5QzFcdTYwM0JcdTdFRDNcdTc2ODRcdTMwMENcdTY3MkNcdTZCMjFcdTY2RjRcdTY1QjBcdTMwMERcdTRFMDBcdTgyODJcdUZGMDlcdUZGMENcdTY1RTdcdTYwM0JcdTdFRDNcdTVERjJcdTU0MDhcdTVFNzZcdTY2RkZcdTYzNjInXG4gICAgICAgIDogJ1x1MjcxMyBcdTVERjJcdTc1MUZcdTYyMTBcdTk5OTZcdTRFRkRcdTVCNjZcdTRFNjBcdTYwM0JcdTdFRDMnKVxuICAgICAgYXdhaXQgbG9hZE5vdGVzKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRBaVN1bW1hcml6aW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTk4NzVcdTk3NjJcdTUyMUJcdTVFRkFcdTYyNjdcdTg4NENcdUZGMUFcdTVFRkFcdTUzRDhcdTY2RjQgXHUyMTkyIExMTSBcdTc1MUZcdTYyMTBcdTdGMTZcdTYzOTJcdThCQTFcdTUyMTIgXHUyMTkyIFx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNFx1OTg3NVx1RkYwOFx1ODlEMlx1ODI3Mi9cdTZBMjFcdTU3OEIvXHU3QjU2XHU3NTY1XHU1M0VGXHU4QzAzXHVGRjA5XHUyMTkyIFx1Nzg2RVx1OEJBNFx1NTQwRVx1NTQyRlx1NTJBOFx1MzAwMiAqL1xuICBjb25zdCBzdGFydFJ1biA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoZXhlY1RpdGxlLnRyaW0oKSA9PT0gJycgfHwgZXhlY0Rlc2MudHJpbSgpID09PSAnJykgcmV0dXJuXG4gICAgc2V0QnVzeSgnc3RhcnRSdW4nKVxuICAgIHNldEFjdGlvblJlc3VsdChudWxsKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL3N0YXJ0Jywge1xuICAgICAgICB0aXRsZTogZXhlY1RpdGxlLnRyaW0oKSwgZGVzY3JpcHRpb246IGV4ZWNEZXNjLnRyaW0oKSxcbiAgICAgICAgLi4uKGV4ZWNNb2RlbCA9PT0gJycgPyB7fSA6ICgoKSA9PiB7IGNvbnN0IFtwcm92aWRlciwgbW9kZWxdID0gZXhlY01vZGVsLnNwbGl0KCcvJyk7IHJldHVybiB7IGRlZmF1bHRNb2RlbFByb3ZpZGVyOiBwcm92aWRlciA/PyAnJywgZGVmYXVsdE1vZGVsSWQ6IG1vZGVsID8/ICcnIH0gfSkoKSksXG4gICAgICB9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKGRhdGFbJ2F1dG9TdGFydGVkJ10gPT09IHRydWUpIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU1REYyXHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHVGRjFBJyArIFN0cmluZyhkYXRhWydydW5JZCddID8/ICcnKSlcbiAgICAgICAgc2V0RXhlY1RpdGxlKCcnKVxuICAgICAgICBzZXRFeGVjRGVzYygnJylcbiAgICAgICAgYXdhaXQgcmVmcmVzaFN0YXRlKClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBzdGVwcyA9IChkYXRhWydzdGVwcyddIGFzIEFycmF5PFJlY29yZDxzdHJpbmcsIHVua25vd24+PiB8IHVuZGVmaW5lZCkgPz8gW11cbiAgICAgIHNldFBsYW5Db25maXJtKHtcbiAgICAgICAgY2hhbmdlSWQ6IFN0cmluZyhkYXRhWydjaGFuZ2VJZCddID8/ICcnKSxcbiAgICAgICAgc3RlcHM6IHN0ZXBzLm1hcCgoc3RlcCkgPT4gKHtcbiAgICAgICAgICBpZDogU3RyaW5nKHN0ZXBbJ2lkJ10gPz8gJycpLFxuICAgICAgICAgIHRpdGxlOiBTdHJpbmcoc3RlcFsndGl0bGUnXSA/PyAnJyksXG4gICAgICAgICAgZGVzY3JpcHRpb246IFN0cmluZyhzdGVwWydkZXNjcmlwdGlvbiddID8/ICcnKSxcbiAgICAgICAgICB0YXJnZXRGaWxlczogKHN0ZXBbJ3RhcmdldEZpbGVzJ10gYXMgc3RyaW5nW10gfCB1bmRlZmluZWQpID8/IFtdLFxuICAgICAgICAgIHJvbGU6IFN0cmluZyhzdGVwWydyb2xlJ10gPz8gJ2NvZGluZycpLFxuICAgICAgICAgIGFjY2VwdGFuY2U6IFN0cmluZyhzdGVwWydhY2NlcHRhbmNlJ10gPz8gJycpLFxuICAgICAgICAgIGZhaWx1cmVQb2xpY3k6IFN0cmluZyhzdGVwWydmYWlsdXJlUG9saWN5J10gPz8gJ3JldHJ5LWVzY2FsYXRlJyksXG4gICAgICAgICAgZW5hYmxlZDogc3RlcFsnZW5hYmxlZCddICE9PSBmYWxzZSxcbiAgICAgICAgICBtb2RlbFByb3ZpZGVyOiAnJyxcbiAgICAgICAgICBtb2RlbElkOiAnJyxcbiAgICAgICAgfSkpLFxuICAgICAgfSlcbiAgICAgIGlmIChtb2RlbE9wdGlvbnMubGVuZ3RoID09PSAwICYmIG1vZGVsVGllcnMgPT09IG51bGwpIHZvaWQgbG9hZE1vZGVsQ29uZmlnKClcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1OEJBMVx1NTIxMlx1NURGMlx1NzUxRlx1NjIxMFx1RkYwQ1x1OEJGN1x1NTcyOFx1NEUwQlx1NjVCOVx1Nzg2RVx1OEJBNFx1N0YxNlx1NjM5Mlx1NTQwRVx1NTQyRlx1NTJBOCcpXG4gICAgICBzZXRFeGVjVGl0bGUoJycpXG4gICAgICBzZXRFeGVjRGVzYygnJylcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRCdXN5KG51bGwpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNFx1OTg3NVx1RkYxQVx1NEZERFx1NUI1OFx1N0YxNlx1OEY5MVx1RkYwOFx1NjVCMFx1NzI0OFx1NjcyQ1x1OEJBMVx1NTIxMlx1RkYwOVx1NUU3Nlx1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1MzAwMiAqL1xuICBjb25zdCBsYXVuY2hQbGFuID0gYXN5bmMgKHdpdGhFZGl0czogYm9vbGVhbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChwbGFuQ29uZmlybSA9PT0gbnVsbCkgcmV0dXJuXG4gICAgc2V0UGxhbkJ1c3kodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgbGV0IGNoYW5nZUlkID0gcGxhbkNvbmZpcm0uY2hhbmdlSWRcbiAgICAgIGlmICh3aXRoRWRpdHMpIHtcbiAgICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9wbGFuL3VwZGF0ZScsIHsgY2hhbmdlSWQsIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcyB9KVxuICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL2xhdW5jaCcsIHsgY2hhbmdlSWQgfSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NURGMlx1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYxQScgKyBTdHJpbmcoZGF0YVsncnVuSWQnXSA/PyAnJykpXG4gICAgICBzZXRQbGFuQ29uZmlybShudWxsKVxuICAgICAgYXdhaXQgcmVmcmVzaFN0YXRlKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRQbGFuQnVzeShmYWxzZSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU1MkEwXHU4RjdEIFJ1biBcdThCRTZcdTYwQzVcdUZGMDhcdTZCNjVcdTlBQTRcdTY1RjZcdTk1RjRcdTdFQkYgKyBcdTRFRkJcdTUyQTFcdTVERTVcdTRGNUNcdThCQjBcdTVGQzZcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgbG9hZFJ1bkRldGFpbCA9IGFzeW5jIChpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvZGV0YWlsP2lkPScgKyBlbmNvZGVVUklDb21wb25lbnQoaWQpKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXRSdW5EZXRhaWwoZGF0YSBhcyBSdW5EZXRhaWwpXG4gICAgfSBjYXRjaCB7XG4gICAgICBzZXRSdW5EZXRhaWwobnVsbClcbiAgICB9XG4gIH1cblxuICAvKiogXHU2MDYyXHU1OTBEXHU2NjgyXHU1MDVDL1x1NEUyRFx1NjVBRC9cdTU5MzFcdThEMjVcdTc2ODQgUnVuXHUzMDAyICovXG4gIGNvbnN0IHJlc3VtZVJ1biA9IGFzeW5jIChydW5JZDogc3RyaW5nLCBhY3Rpb246ICdjb250aW51ZScgfCAnc2tpcC1jdXJyZW50Jyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvcmVzdW1lJywgeyBydW5JZCwgYWN0aW9uIH0pXG4gICAgaWYgKG9rKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTYwNjJcdTU5MERcdTYyNjdcdTg4NENcdUZGMDgnICsgYWN0aW9uICsgJ1x1RkYwOScpXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgICAgYXdhaXQgbG9hZFJ1bkRldGFpbChydW5JZClcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTUyQTBcdThGN0RcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdTUyMTdcdTg4NjhcdTMwMDIgKi9cbiAgY29uc3QgbG9hZFNjaGVkdWxlZCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvc2NoZWR1bGVkP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldFNjaGVkdWxlZERhdGEoKGRhdGEgYXMgeyB0YXNrczogU2NoZWR1bGVkVGFza0VudHJ5W10gfSkudGFza3MgPz8gW10pXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTUyMTdcdTg4NjhcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcbiAgICB9XG4gIH1cblxuICAvKiogXHU1MjFCXHU1RUZBIC8gXHU2NkY0XHU2NUIwIC8gXHU1MjIwXHU5NjY0IC8gXHU3QUNCXHU1MzczXHU2MjY3XHU4ODRDXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHUzMDAyICovXG4gIGNvbnN0IGFkZFNjaGVkdWxlZCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBpbnRlcnZhbE1pbnV0ZXMgPSBOdW1iZXIoc2NoZWRJbnRlcnZhbClcbiAgICBpZiAoc2NoZWROYW1lLnRyaW0oKSA9PT0gJycgfHwgIU51bWJlci5pc0Zpbml0ZShpbnRlcnZhbE1pbnV0ZXMpIHx8IGludGVydmFsTWludXRlcyA8IDEpIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3IFx1OEJGN1x1NTg2Qlx1NTE5OVx1NEVGQlx1NTJBMVx1NTQwRFx1NzlGMFx1NEUwRVx1NjcwOVx1NjU0OFx1OTVGNFx1OTY5NFx1RkYwOFx1NTIwNlx1OTQ5Rlx1RkYwOScpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvc2NoZWR1bGVkJywge1xuICAgICAgbmFtZTogc2NoZWROYW1lLnRyaW0oKSwgdHlwZTogc2NoZWRUeXBlLCBpbnRlcnZhbE1pbnV0ZXMsXG4gICAgICB0aXRsZTogc2NoZWRUaXRsZS50cmltKCkgfHwgdW5kZWZpbmVkLCBkZXNjcmlwdGlvbjogc2NoZWREZXNjLnRyaW0oKSB8fCB1bmRlZmluZWQsXG4gICAgfSlcbiAgICBpZiAob2spIHtcbiAgICAgIHNldFNjaGVkTmFtZSgnJyk7IHNldFNjaGVkVGl0bGUoJycpOyBzZXRTY2hlZERlc2MoJycpXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdTVERjJcdTUyMUJcdTVFRkEnKVxuICAgICAgYXdhaXQgbG9hZFNjaGVkdWxlZCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBzY2hlZHVsZWRBY3Rpb24gPSBhc3luYyAocGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3NjaGVkdWxlZC8nICsgcGF0aCwgYm9keSlcbiAgICBpZiAob2spIGF3YWl0IGxvYWRTY2hlZHVsZWQoKVxuICAgIGVsc2Ugc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICB9XG5cbiAgLyoqIFx1NTJBMFx1OEY3RFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1NTE2OFx1OTFDRlx1NjU3MFx1NjM2RVx1RkYwOFx1NTQyQlx1NTQwQ1x1NkI2NVx1NTdGQVx1N0VCRlx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBsb2FkTWVtb3JpZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yaWVzP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldE1lbW9yaWVzRGF0YShkYXRhIGFzIE1lbW9yaWVzUGF5bG9hZClcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2MlxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTYyQzlcdTUzRDZcdTU0MENcdTZCNjVcdUZGMUFcdTRFMDlcdTU0MTFcdTUyMjRcdTVCOUFcdUZGMDhcdTU5MzFcdTY1NDhcdTYzRDBcdTY4NDgvXHU2NUIwXHU1ODlFXHU1MDE5XHU5MDA5L1x1ODFFQVx1NTJBOFx1N0VFRFx1NTQ3RFx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBzeW5jTWVtb3JpZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0TWVtb3J5U3luY2luZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvc3luYycsIHt9KVxuICAgICAgaWYgKCFvayAmJiBkYXRhWydlcnJvciddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2V0U3luY1JlcG9ydCh7IG9rOiBmYWxzZSwgZXJyb3I6IFN0cmluZyhkYXRhWydlcnJvciddKSB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldFN5bmNSZXBvcnQoZGF0YSBhcyBTeW5jUmVwb3J0KVxuICAgICAgYXdhaXQgbG9hZE1lbW9yaWVzKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0U3luY1JlcG9ydCh7IG9rOiBmYWxzZSwgZXJyb3I6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSB9KVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRNZW1vcnlTeW5jaW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTU0MENcdTZCNjVcdTYyQTVcdTU0NEFcdTU0MEVcdTdFRURcdUZGMUFcdTYyOEFcdTkwMDlcdTRFMkRcdTc2ODRcdTc1OTFcdTRGM0NcdThGQzdcdTY1RjZcdTk4NzlcdTg0M0RcdTRFM0Egc3RhbGUgLyBcdTVGNTJcdTY4NjNcdTMwMDIgKi9cbiAgY29uc3QgYXBwbHlTeW5jID0gYXN5bmMgKGlkczogc3RyaW5nW10sIGFjdGlvbjogJ21hcmstc3RhbGUnIHwgJ2FyY2hpdmUnKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5L3N5bmMvYXBwbHknLCB7IGlkcywgYWN0aW9uIH0pXG4gICAgc2V0U3luY1JlcG9ydCgocHJldmlvdXMpID0+IHByZXZpb3VzID09PSBudWxsID8gbnVsbCA6IHsgLi4ucHJldmlvdXMsIHN0YWxlUHJvcG9zYWxzOiAocHJldmlvdXMuc3RhbGVQcm9wb3NhbHMgPz8gW10pLmZpbHRlcigocHJvcG9zYWwpID0+ICFpZHMuaW5jbHVkZXMocHJvcG9zYWwuaWQpKSB9KVxuICAgIGF3YWl0IGxvYWRNZW1vcmllcygpXG4gIH1cblxuICAvKiogXHU4QkIwXHU1RkM2XHU3MkI2XHU2MDAxXHU2NENEXHU0RjVDXHVGRjA4XHU1RjUyXHU2ODYzL1x1NjA2Mlx1NTkwRFx1RkYwOVx1NEUwRVx1NTIwNlx1NjUyRlx1NUY1Mlx1NEUwMFx1MzAwMiAqL1xuICBjb25zdCBtZW1vcnlBY3Rpb24gPSBhc3luYyAocGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeS8nICsgcGF0aCwgYm9keSlcbiAgICBpZiAob2spIGF3YWl0IGxvYWRNZW1vcmllcygpXG4gICAgZWxzZSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gIH1cblxuICAvKiogXHU4QkIwXHU1RkM2XHU4RjZDXHU3QjE0XHU4QkIwXHVGRjFBXHU1RjE1XHU3NTI4XHU4RkRCXHU1QjY2XHU0RTYwXHU2ODYzXHU2ODQ4XHUzMDAyICovXG4gIGNvbnN0IG1lbW9yeVRvTm90ZSA9IGFzeW5jIChtZW1vcnk6IE1lbW9yeUVudHJ5KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMnLCB7XG4gICAgICB0aXRsZTogbWVtb3J5LnRpdGxlLFxuICAgICAgY29udGVudDogbWVtb3J5LmNvbnRlbnQgKyAobWVtb3J5LmJhc2lzU2hhICE9PSBudWxsID8gYFxcblx1RkYwOFx1Njc2NVx1NkU5MFx1RkYxQVx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNiAke21lbW9yeS5iYXNpc1NoYS5zbGljZSgwLCA4KX1cdUZGMDlgIDogJycpLFxuICAgICAgdGFnczogJ1x1OEJCMFx1NUZDNiwgJyArIG1lbW9yeS50eXBlLFxuICAgIH0pXG4gICAgaWYgKG9rKSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTYyOEFcdThCQjBcdTVGQzZcdThGNkNcdTRFM0FcdTdCMTRcdThCQjAnKVxuICB9XG5cbiAgLy8gXHU0RjFBXHU4QkREXHU2MjUzXHU1RjAwL1x1NTIwN1x1NjM2Mlx1NjVGNlx1NUI5OFx1NjVCOVx1NEYxQSBjbG9zZURldGFpbHMgXHU2NTM2XHU4RDc3XHU4RjY4XHU5MDUzXHVGRjFCXHU3NzBCXHU5NUU4XHU3MkQ3XHU2QkNGIDUwMG1zIFx1NjhDMFx1NjdFNVx1RkYwQ1xuICAvLyBcdTUzRUFcdTg5ODFcdTVGNTNcdTUyNERcdTY3MDlcdTRGMUFcdThCRERcdTgwMENcdTVERTVcdTRGNUNcdTUzRjBcdTUyMTdcdTVCQkQgPCA1MHB4IFx1NUMzMVx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1RkYwOFx1Nzg2RVx1NUI5QVx1NjAyN1x1RkYwQ1x1NEUwRFx1NEY5RFx1OEQ1NiBlZmZlY3QgXHU2NUY2XHU1RThGXHVGRjA5XHUzMDAyXG4gIC8vIFx1NTQwQ1x1NEUwMFx1NjJDRFx1N0VGNFx1NjMwMVx1N0VERlx1OEJBMVx1ODg0Q1x1OTRCM1x1NTIzNlx1RkYxQVx1NEYxQVx1OEJERFx1NTIwN1x1NjM2Mlx1NEYxQVx1NjM2Mlx1NjM4OVx1N0VERlx1OEJBMVx1ODg0QyBET01cdUZGMENcdTY4MzdcdTVGMEZcdTg4NjhcdTdGM0FcdTU5MzFcdTY1RjZcdTYzMDlcdTVGNTNcdTUyNERcbiAgLy8gXHU2Nzg0XHU1RUZBXHU1NEM4XHU1RTBDXHU5MUNEXHU2Q0U4XHU1MTY1XHVGRjA4XHU1RTQyXHU3QjQ5XHVGRjBDXHU1REYyXHU1QjU4XHU1NzI4XHU1MjE5XHU4REYzXHU4RkM3XHVGRjA5XHUzMDAyXG4gIGNvbnN0IGxheW91dEZhY2UgPSAocHJvcHMgYXMgdW5rbm93biBhcyB7IGxheW91dD86IHsgb3BlbkRldGFpbHM/OiAoKSA9PiB2b2lkIH0gfSkubGF5b3V0XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYXBwbHlTdGF0c0xpbmVDbGFtcCgpXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BjLXN0YXRzLWNsYW1wJykgPT09IG51bGwpIGFwcGx5U3RhdHNMaW5lQ2xhbXAoKVxuICAgICAgY29uc3QgY2hhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0nKVxuICAgICAgY29uc3Qgd2lkdGggPSBjaGF0ID8gTWF0aC5yb3VuZChjaGF0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSA6IC0xXG4gICAgICBpZiAod2lkdGggIT09IC0xICYmIHdpZHRoIDwgNTApIGxheW91dEZhY2U/Lm9wZW5EZXRhaWxzPy4oKVxuICAgIH0sIDUwMClcbiAgICByZXR1cm4gKCkgPT4geyBjbGVhckludGVydmFsKHRpbWVyKSB9XG4gIH0sIFtwcm9wcy5zZXNzaW9uSWQsIGxheW91dEZhY2VdKVxuXG4gIC8qKiBcdTRFRTUgaW1wb3J0YW50IFx1NTE4NVx1ODA1NFx1NjgzN1x1NUYwRlx1NzZGNFx1NjNBNVx1NTE5OVx1NUI5OFx1NjVCOVx1N0Y1MVx1NjgzQ1x1NkEyMVx1Njc3Rlx1RkYwOFx1NjcwMFx1OUFEOFx1NEYxOFx1NTE0OFx1N0VBN1x1RkYwQ1x1NEVGQlx1NEY1NVx1OTFDRFx1NkUzMlx1NjdEM1x1NEUwRFx1NEYxQVx1ODk4Nlx1NzZENlx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBmcmFtZVRlbXBsYXRlU2V0ID0gKGNoYXRQeDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJzaWRlYmFyQ29sXCJdJylcbiAgICBjb25zdCBzaWRlYmFyVyA9IHNpZGViYXIgPyBNYXRoLm1heCg1NiwgTWF0aC5yb3VuZChzaWRlYmFyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSkgOiAyODBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdJylcbiAgICAgID8uc3R5bGUuc2V0UHJvcGVydHkoJ2dyaWQtdGVtcGxhdGUtY29sdW1ucycsIHNpZGViYXJXICsgJ3B4IG1pbm1heCgwLCAxZnIpICcgKyBjaGF0UHggKyAncHgnLCAnaW1wb3J0YW50JylcbiAgfVxuXG4gIC8qKiBcdTY1MzZcdThENzdcdTYwMDFcdTZBMjFcdTY3N0ZcdUZGMUFcdTdCMkNcdTRFMDlcdTUyMTdcdUZGMDhcdTVCOThcdTY1QjlcdThCRTZcdTYwQzVcdUZGMDkwcHhcdTIwMTRcdTIwMTRcdTVERTVcdTRGNUNcdTUzRjBcdTUxNzNcdTk1RURcdTU0MEVcdTUzRjNcdTRGQTdcdTUzRUFcdTUxNDFcdThCQjhcdTgwNEFcdTU5MjlcdUZGMDhcdTRFMUFcdTRFM0JcdTg5QzRcdTUyMTlcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgY29sbGFwc2VGcmFtZVRlbXBsYXRlID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwic2lkZWJhckNvbFwiXScpXG4gICAgY29uc3Qgc2lkZWJhclcgPSBzaWRlYmFyID8gTWF0aC5tYXgoNTYsIE1hdGgucm91bmQoc2lkZWJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkpIDogMjgwXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXScpXG4gICAgICA/LnN0eWxlLnNldFByb3BlcnR5KCdncmlkLXRlbXBsYXRlLWNvbHVtbnMnLCBzaWRlYmFyVyArICdweCBtaW5tYXgoMCwgMWZyKSAwcHgnLCAnaW1wb3J0YW50JylcbiAgfVxuXG4gIC8vIFx1ODA0QVx1NTkyOVx1NTIxN1x1NUJCRFx1OEJCMFx1NUZDNlx1RkYwOFx1NUI5OFx1NjVCOSBsYXlvdXQgc3RvcmUgXHU3N0FDXHU2MDAxXHVGRjA5XHVGRjFBXHU2MzAyXHU4RjdEXHU2MDYyXHU1OTBEICsgXHU2MkQ2XHU2MkZEXHU3NkY0XHU1MTk5XHU1MTg1XHU4MDU0XHU2QTIxXHU2NzdGXHUzMDAyXG4gIC8vIFx1NUZDNVx1OTg3Qlx1NTE5OSBpbXBvcnRhbnRcdTIwMTRcdTIwMTRMQVlPVVRfU1RZTEUgXHU3Njg0XHU2QTIxXHU2NzdGXHU4OUM0XHU1MjE5XHU0RTVGXHU2NjJGIGltcG9ydGFudFx1RkYwQ1x1OTc1RSBpbXBvcnRhbnRcbiAgLy8gXHU1MTg1XHU4MDU0XHU0RjFBXHU4OEFCXHU1QjgzXHU1MzhCXHU1MjM2XHVGRjA4XHU4RkQ5XHU1QzMxXHU2NjJGXHU2QjY0XHU1MjREXCJcdTYyRDZcdTYyRkRcdTc1MUZcdTY1NDhcdTMwMDFcdTUyMzdcdTY1QjBcdTU0MEVcdThCQjBcdTVGQzZcdTRFMjJcdTU5MzFcIlx1NzY4NFx1NTM5Rlx1NTZFMFx1RkYwOVx1MzAwMlxuICAvLyBcdTVCOThcdTY1QjkgUmVhY3QgXHU5MUNEXHU2RTMyXHU2N0QzXHU0RjFBXHU2NTM5XHU1MTk5XHU1MTg1XHU4MDU0XHU2QTIxXHU2NzdGXHVGRjBDTXV0YXRpb25PYnNlcnZlciBcdTYzMDlcdTVGNTNcdTUyNERcdTUwM0NcdTVCODhcdTUzNkJcdTkxQ0RcdTUxOTlcbiAgLy8gXHVGRjA4XHU1MDNDXHU3NkY4XHU1NDBDXHU0RTBEXHU0RjFBXHU4OUU2XHU1M0QxXHU2NUIwXHU3Njg0IG11dGF0aW9uXHVGRjBDXHU2NUUwXHU1NkRFXHU3M0FGXHVGRjA5XHUzMDAyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BjLmNoYXRXaWR0aCcpID8/ICcnKVxuICAgIGNvbnN0IGFwcGx5ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgLy8gXHU2MzAyXHU4RjdEL1x1NUI5OFx1NjVCOVx1OTFDRFx1NkUzMlx1NjdEM1x1NjVGNlx1NjVFMFx1Njc2MVx1NEVGNlx1NTkzQVx1NTZERVx1NkEyMVx1Njc3Rlx1RkYwOGltcG9ydGFudCBcdTg5ODZcdTUxOTlcdUZGMUJcdTUwM0NcdTc2RjhcdTU0MENcdTY1RjZcdTVCOThcdTY1QjlcdTY4MzdcdTVGMEZcdTUzRDhcdTY2RjRcbiAgICAgIC8vIFx1NEUwRFx1NEYxQVx1ODlFNlx1NTNEMVx1NjVCMFx1NzY4NCBtdXRhdGlvblx1RkYwQ1x1NjVFMFx1NTZERVx1NzNBRlx1RkYwOVx1MzAwMlx1NURFNVx1NEY1Q1x1NTNGMFx1NUYwMFx1Nzc0MCA9IFx1NTNGM1x1NTIxN1x1ODA0QVx1NTkyOVx1NTZGQVx1NUI5QVx1NUJCRFx1MzAwMlxuICAgICAgY29uc3QgY2hhdFcgPSBOdW1iZXIuaXNGaW5pdGUoc2F2ZWQpICYmIHNhdmVkID49IDI4MCA/IHNhdmVkIDogMzYwXG4gICAgICBmcmFtZVRlbXBsYXRlU2V0KGNoYXRXKVxuICAgIH1cbiAgICBhcHBseSgpXG4gICAgY29uc3QgZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdJylcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHsgYXBwbHkoKSB9KVxuICAgIGlmIChmcmFtZSAhPT0gbnVsbCkgb2JzZXJ2ZXIub2JzZXJ2ZShmcmFtZSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFsnc3R5bGUnXSB9KVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgIC8vIFx1NURFNVx1NEY1Q1x1NTNGMFx1NTM3OFx1OEY3RFx1RkYxQVx1NTE5OVx1NTE2NVx1NjUzNlx1OEQ3N1x1NjAwMVx1NkEyMVx1Njc3Rlx1RkYwOFx1N0IyQ1x1NEUwOVx1NTIxNyAwcHhcdUZGMDlcdTIwMTRcdTIwMTRcdTRFMUFcdTRFM0JcdTg5QzRcdTUyMTlcdUZGMUFcdTVERTVcdTRGNUNcdTUzRjBcdTUxNzMgXHUyMTkyIFx1NTNGM1x1NEZBN1x1NTNFQVx1NTE0MVx1OEJCOFxuICAgICAgLy8gXHU4MDRBXHU1OTI5XHUzMDAyXHU0RTBEXHU4MEZEXHU1MjIwXHU5NjY0XHU1MTg1XHU4MDU0XHU1QzVFXHU2MDI3XHVGRjA4XHU1Qjk4XHU2NUI5IFJlYWN0IFx1NEUwRFx1NEYxQVx1NEUzQlx1NTJBOFx1ODg2NVx1NTE5OVx1RkYwQ1x1NEYxQVx1NUJGQ1x1ODFGNFx1NEUzQlx1NTMzQVx1N0E3QVx1NzY3RFx1RkYwOVx1RkYxQlxuICAgICAgLy8gXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHU4NjdEXHU1NkRFXHU1MjMwXHU4QkU1XHU1MjE3XHU0RjQ2IDAgXHU1QkJEXHU0RTBEXHU1M0VGXHU4OUMxXHVGRjA4MC4xLjIgXHU1QjlFXHU2RDRCXHU1NkRFXHU1RjUyXHVGRjA5XHUzMDAyXG4gICAgICBjb2xsYXBzZUZyYW1lVGVtcGxhdGUoKVxuICAgIH1cbiAgfSwgW10pXG5cbiAgLyoqIFx1NTIwNlx1OTY5NFx1Njc2MVx1NjJENlx1NjJGRFx1RkYxQVx1OEMwM1x1NjU3NFx1ODA0QVx1NTkyOVx1NTIxN1x1NUJCRFx1RkYwOFx1NURFNVx1NEY1Q1x1NTNGMFx1NTQzOFx1NjUzNlx1NTI2OVx1NEY1OVx1N0E3QVx1OTVGNFx1RkYwOVx1RkYwQ1x1NTE5OVx1NTE2NSBsb2NhbFN0b3JhZ2UgXHU4QkIwXHU1RkM2XHUzMDAyICovXG4gIGNvbnN0IG9uRGl2aWRlckRvd24gPSAoZTogUmVhY3QuUG9pbnRlckV2ZW50KTogdm9pZCA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3Qgb25Nb3ZlID0gKGV2OiBQb2ludGVyRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IHdpZHRoID0gTWF0aC5taW4oOTAwLCBNYXRoLm1heCgyODAsIHdpbmRvdy5pbm5lcldpZHRoIC0gZXYuY2xpZW50WCkpXG4gICAgICBmcmFtZVRlbXBsYXRlU2V0KHdpZHRoKVxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BjLmNoYXRXaWR0aCcsIFN0cmluZyh3aWR0aCkpXG4gICAgfVxuICAgIGNvbnN0IG9uVXAgPSAoKTogdm9pZCA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcClcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKVxuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgZGlzcG9zZWQgPSBmYWxzZVxuICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9zdGF0ZT9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpLCB7IGhlYWRlcnM6IHsgYWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicgfSB9KVxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YClcbiAgICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgICBpZiAoIWRpc3Bvc2VkKSB7XG4gICAgICAgICAgc2V0U3RhdGUoZGF0YSBhcyBXb3Jrc3BhY2VTdGF0ZSlcbiAgICAgICAgICBzZXRMb2FkRXJyb3IobnVsbClcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgICAgaWYgKCFkaXNwb3NlZCkgc2V0TG9hZEVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcbiAgICAgIH1cbiAgICB9XG4gICAgdm9pZCBsb2FkKClcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHsgdm9pZCBsb2FkKCkgfSwgNDAwMClcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZGlzcG9zZWQgPSB0cnVlXG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgIH1cbiAgfSwgW10pXG5cbiAgLy8gXHU4RkRCXHU1MTY1XHU2M0QwXHU0RUE0L1x1N0IxNFx1OEJCMC9SZXZpZXcgXHU5ODc1XHU3QjdFXHU2NUY2XHU2MzA5XHU5NzAwXHU2MkM5XHU1M0Q2XHVGRjA4XHU2M0QwXHU0RUE0XHU1MjE3XHU4ODY4XHU0RjlEXHU4RDU2XHU0RjFBXHU4QkREXHU1REU1XHU0RjVDXHU1MzNBXHVGRjBDXHU4RjZFXHU4QkUyXHU2NUUwXHU2MTBGXHU0RTQ5XHVGRjA5XHUzMDAyXG4gIC8vIFx1NjNEMFx1NEVBNFx1OTg3NVx1NEU1Rlx1NjJDOVx1N0IxNFx1OEJCMFx1RkYxQVx1OEY2RVx1NkIyMVx1NjcyQVx1NkQ4OFx1NTMxNlx1NjgwN1x1OEJCMFx1OTcwMFx1ODk4MVx1MzAwQ1x1NEUwQVx1NkIyMSBBSSBcdTYwM0JcdTdFRDNcdTY1RjZcdTk1RjRcdTMwMERcdTMwMDJcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodGFiID09PSAnY29tbWl0cycpIHsgdm9pZCBsb2FkQ29tbWl0cygpOyB2b2lkIGxvYWROb3RlcygpIH1cbiAgICBpZiAodGFiID09PSAnbm90ZXMnKSB7IHZvaWQgbG9hZE5vdGVzKCk7IHZvaWQgbG9hZE1lbW9yaWVzKCk7IGlmIChjb21taXRzRGF0YSA9PT0gbnVsbCkgdm9pZCBsb2FkQ29tbWl0cygpIH1cbiAgICBpZiAodGFiID09PSAncmV2aWV3Jykgdm9pZCBsb2FkSXNzdWVzKClcbiAgICBpZiAodGFiID09PSAnZXhlY3V0aW9uJykgeyB2b2lkIGxvYWRTY2hlZHVsZWQoKTsgaWYgKHJ1bkRldGFpbCAhPT0gbnVsbCkgdm9pZCBsb2FkUnVuRGV0YWlsKHJ1bkRldGFpbC5ydW4uaWQpIH1cbiAgICBpZiAodGFiID09PSAnc2V0dGluZ3MnICYmIG1vZGVsVGllcnMgPT09IG51bGwpIHZvaWQgbG9hZE1vZGVsQ29uZmlnKClcbiAgfSwgW3RhYiwgcHJvcHMuc2Vzc2lvbklkXSlcblxuICBjb25zdCBsb2FkTW9kZWxDb25maWcgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21vZGVsLWNvbmZpZycpXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSByZXR1cm5cbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIHNldE1vZGVsVGllcnMoKGRhdGEgYXMgeyB0aWVyczogUmVjb3JkPHN0cmluZywgeyBwcm92aWRlcjogc3RyaW5nOyBtb2RlbDogc3RyaW5nIH0+IH0pLnRpZXJzID8/IHt9KVxuICAgICAgc2V0TW9kZWxPcHRpb25zKChkYXRhIGFzIHsgb3B0aW9uczogQXJyYXk8eyBwcm92aWRlcjogc3RyaW5nOyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfT4gfSkub3B0aW9ucyA/PyBbXSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1NkEyMVx1NTc4Qlx1OTE0RFx1N0Y2RVx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2MlxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNhdmVNb2RlbENvbmZpZyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAobW9kZWxUaWVycyA9PT0gbnVsbCkgcmV0dXJuXG4gICAgc2V0TW9kZWxTYXZpbmcodHJ1ZSlcbiAgICBzZXRNb2RlbFNhdmVkKGZhbHNlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9tb2RlbC1jb25maWcnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB0aWVyczogbW9kZWxUaWVycyB9KSxcbiAgICAgIH0pXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgc2V0TW9kZWxTYXZlZCh0cnVlKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgc2V0TW9kZWxTYXZlZChmYWxzZSkgfSwgMjUwMClcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TW9kZWxTYXZpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVmcmVzaFN0YXRlID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHJlZnJlc2hlZCA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9zdGF0ZT9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpLCB7IGhlYWRlcnM6IHsgYWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicgfSB9KVxuICAgIGlmIChyZWZyZXNoZWQub2spIHNldFN0YXRlKGF3YWl0IHJlZnJlc2hlZC5qc29uKCkgYXMgV29ya3NwYWNlU3RhdGUpXG4gIH1cblxuICAvKiogXHU3RURGXHU0RTAwXHU1MkE4XHU0RjVDXHU2MjY3XHU4ODRDXHU1NjY4XHVGRjFBUE9TVCBcdTVCQkZcdTRFM0IgQVBJXHVGRjA4XHU2NDNBXHU1RTI2XHU0RjFBXHU4QkREIGlkIFx1NEY5Qlx1NjcwRFx1NTJBMVx1N0FFRlx1NUI5QVx1NEY0RFx1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTMzQVx1RkYwOVx1RkYwQ1x1OEY5M1x1NTFGQVx1OEZEQlx1N0VEM1x1Njc5Q1x1OTc2Mlx1Njc3Rlx1RkYwQ1x1NUI4Q1x1NjIxMFx1NTQwRVx1NTIzN1x1NjVCMFx1NzJCNlx1NjAwMVx1MzAwMiAqL1xuICBjb25zdCBydW5BY3Rpb24gPSBhc3luYyAobmFtZTogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0QnVzeShuYW1lKVxuICAgIHNldEFjdGlvblJlc3VsdChudWxsKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KHBhdGgsIGJvZHkpXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldEFjdGlvblJlc3VsdChgXHUyNzE3ICR7U3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJyl9YClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoZm9ybWF0QWN0aW9uUmVzdWx0KGRhdGEpKVxuICAgICAgYXdhaXQgcmVmcmVzaFN0YXRlKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KGBcdTI3MTcgJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcil9YClcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0QnVzeShudWxsKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJ1bkJvb3RzdHJhcCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRCb290c3RyYXBwaW5nKHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2Jvb3RzdHJhcCcsIHt9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRMb2FkRXJyb3IoU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgYXdhaXQgcmVmcmVzaFN0YXRlKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0TG9hZEVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0Qm9vdHN0cmFwcGluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb25maXJtTWVtb3J5ID0gYXN5bmMgKG1lbW9yeUlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IG9rIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvY29uZmlybScsIHsgbWVtb3J5SWQgfSlcbiAgICBpZiAob2spIHtcbiAgICAgIHNldFN0YXRlKChwcmV2aW91cykgPT4gcHJldmlvdXMgPT09IG51bGwgPyBwcmV2aW91cyA6IHtcbiAgICAgICAgLi4ucHJldmlvdXMsXG4gICAgICAgIG1lbW9yaWVzOiBwcmV2aW91cy5tZW1vcmllcz8ubWFwKChtZW1vcnkpID0+IG1lbW9yeS5pZCA9PT0gbWVtb3J5SWQgPyB7IC4uLm1lbW9yeSwgaXNIdW1hbkNvbmZpcm1lZDogdHJ1ZSwgdHJ1dGhMZXZlbDogJ2ZhY3QnIH0gOiBtZW1vcnkpLFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBwcm9qZWN0ID0gc3RhdGU/LnByb2plY3QgPz8gbnVsbFxuICBjb25zdCBib290c3RyYXAgPSBzdGF0ZT8uYm9vdHN0cmFwID8/IG51bGxcbiAgY29uc3QgY2hhbmdlcyA9IHN0YXRlPy5jaGFuZ2VzID8/IFtdXG4gIGNvbnN0IHJ1bnMgPSBzdGF0ZT8ucnVucyA/PyBbXVxuICBjb25zdCB2ZXJpZmljYXRpb25zID0gc3RhdGU/LnZlcmlmaWNhdGlvbnMgPz8gW11cbiAgY29uc3QgY29uZmlybWVkID0gc3RhdGU/LmNvbmZpcm1lZCA/PyBbXVxuICBjb25zdCBjb25jZXB0cyA9IHN0YXRlPy5jb25jZXB0cyA/PyBbXVxuXG4gIGNvbnN0IHRhYnM6IEFycmF5PHsga2V5OiBUYWJLZXk7IGxhYmVsOiBzdHJpbmcgfT4gPSBbXG4gICAgeyBrZXk6ICdjb21taXRzJywgbGFiZWw6IHQoJ3RhYi5jb21taXRzJykgfSxcbiAgICB7IGtleTogJ292ZXJ2aWV3JywgbGFiZWw6IHQoJ3RhYi5vdmVydmlldycpIH0sXG4gICAgeyBrZXk6ICdleGVjdXRpb24nLCBsYWJlbDogdCgndGFiLmV4ZWN1dGlvbicpIH0sXG4gICAgeyBrZXk6ICdyZXZpZXcnLCBsYWJlbDogdCgndGFiLnJldmlldycpIH0sXG4gICAgeyBrZXk6ICdub3RlcycsIGxhYmVsOiB0KCd0YWIubm90ZXMnKSB9LFxuICAgIHsga2V5OiAnc2V0dGluZ3MnLCBsYWJlbDogdCgndGFiLnNldHRpbmdzJykgfSxcbiAgXVxuXG4gIC8qKiBcdTY0Q0RcdTRGNUNcdTdFRDNcdTY3OUNcdTk3NjJcdTY3N0ZcdUZGMDhcdTYwM0JcdTg5QzhcdTk4NzVcdTdCN0VcdTc2ODRcdTVGRUJcdTYzNzdcdTUyQThcdTRGNUNcdTUxNzFcdTc1MjhcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgcmVzdWx0UGFuZWwgPSBhY3Rpb25SZXN1bHQgIT09IG51bGxcbiAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ2FyZCwgeyB0aXRsZTogdCgncmVzdWx0LnBhbmVsJykgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLnJlc3VsdCB9LCBhY3Rpb25SZXN1bHQpKVxuICAgIDogbnVsbFxuICAvLyBcdTI1MDBcdTI1MDAgXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XHU5ODc1XHU3QjdFIFx1MjUwMFx1MjUwMFxuICAvLyBcdTk4NzZcdTkwRThcdUZGMUFcdTRFRDNcdTVFOTNcdTY4MEYgKyBcdTYzRDBcdTRFQTRcdTU5MUFcdTkwMDlcdTRFMEJcdTYyQzlcdUZGMDhcdTdFQTYgMS81IFx1OUFEOFx1NUVBNlx1RkYwOVx1RkYxQlx1NEUwQlx1NjVCOVx1Njc3Rlx1NTc1N1x1NTM2MFx1NTE2OFx1NUJCRFx1MzAwMlxuICBjb25zdCBhbGxUYXJnZXRzOiBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBtZXRhOiBzdHJpbmc7IHNoYTogc3RyaW5nIH0+ID0gW11cbiAgaWYgKGNvbW1pdHNEYXRhICE9PSBudWxsKSB7XG4gICAgaWYgKCFjb21taXRzRGF0YS53b3JraW5nLmlzQ2xlYW4pIHtcbiAgICAgIGFsbFRhcmdldHMucHVzaCh7XG4gICAgICAgIGtleTogJ3dvcmtpbmcnLFxuICAgICAgICBsYWJlbDogYFx1MjVDRiAke3QoJ3JlcG8ud29ya2luZycpfVx1RkYwOCR7Y29tbWl0c0RhdGEud29ya2luZy5maWxlQ291bnR9XHVGRjA5YCxcbiAgICAgICAgbWV0YTogY29tbWl0c0RhdGEud29ya2luZy5maWxlcy5zbGljZSgwLCAzKS5tYXAoKGZpbGUpID0+IGZpbGUucGF0aC5zcGxpdCgnLycpLnBvcCgpKS5qb2luKCcsICcpLFxuICAgICAgICBzaGE6ICd3b3JraW5nJyxcbiAgICAgIH0pXG4gICAgfVxuICAgIGZvciAoY29uc3QgY29tbWl0IG9mIGNvbW1pdHNEYXRhLmNvbW1pdHMpIHtcbiAgICAgIGNvbnN0IGFkZHMgPSBjb21taXQuZmlsZXMucmVkdWNlKChzdW0sIGZpbGUpID0+IHN1bSArIGZpbGUuYWRkcywgMClcbiAgICAgIGNvbnN0IGRlbHMgPSBjb21taXQuZmlsZXMucmVkdWNlKChzdW0sIGZpbGUpID0+IHN1bSArIGZpbGUuZGVscywgMClcbiAgICAgIGFsbFRhcmdldHMucHVzaCh7XG4gICAgICAgIGtleTogY29tbWl0LnNoYSxcbiAgICAgICAgbGFiZWw6IGNvbW1pdC5zdWJqZWN0LFxuICAgICAgICBtZXRhOiBgJHtjb21taXQuc2hvcnRIYXNofSBcdTAwQjcgJHtjb21taXQuYXV0aG9yfSBcdTAwQjcgJHtuZXcgRGF0ZShjb21taXQuZGF0ZSkudG9Mb2NhbGVTdHJpbmcoKX0gXHUwMEI3ICske2FkZHN9Ly0ke2RlbHN9YCxcbiAgICAgICAgc2hhOiBjb21taXQuc2hhLFxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgY29uc3Qgc2hvcnRMYWJlbCA9IChzaGE6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgaWYgKHNoYSA9PT0gJ3dvcmtpbmcnKSByZXR1cm4gdCgncmVwby53b3JraW5nJylcbiAgICBjb25zdCB0YXJnZXQgPSBhbGxUYXJnZXRzLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5zaGEgPT09IHNoYSlcbiAgICByZXR1cm4gYCR7KHRhcmdldD8ubWV0YS5zcGxpdCgnIFx1MDBCNyAnKVswXSkgPz8gc2hhLnNsaWNlKDAsIDcpfSAke3RhcmdldD8ubGFiZWwgPz8gJyd9YC50cmltKClcbiAgfVxuICBjb25zdCBmaWx0ZXJlZFRhcmdldHMgPSBwaWNrZXJGaWx0ZXIudHJpbSgpID09PSAnJ1xuICAgID8gYWxsVGFyZ2V0c1xuICAgIDogYWxsVGFyZ2V0cy5maWx0ZXIoKGVudHJ5KSA9PiAoZW50cnkubGFiZWwgKyBlbnRyeS5tZXRhKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHBpY2tlckZpbHRlci50cmltKCkudG9Mb3dlckNhc2UoKSkpXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1OEY2RVx1NkIyMVx1ODA1QVx1N0M3Qlx1NEUwRVx1NjcyQVx1NkQ4OFx1NTMxNlx1NjgwN1x1OEJCMCBcdTI1MDBcdTI1MDAgXHU4MDVBXHU3QzdCXHU4OUM0XHU1MjE5XHU0RTBFXHU2NzBEXHU1MkExXHU3QUVGIGNsdXN0ZXJDb21taXRzIFx1NEUwMFx1ODFGNFx1RkYwOFx1NjVGNlx1OTVGNFx1N0E5N1x1NTNFMyArXG4gIC8vIFx1NjU4N1x1NEVGNlx1OTZGNlx1OTFDRFx1NTNFMFx1RkYwQ1x1ODlDMSBjb21taXQtcm91bmRzLnRzXHVGRjA5XHVGRjFCXHU2NzJBXHU2RDg4XHU1MzE2ID0gXHU0RTBBXHU2QjIxIEFJIFx1NjAzQlx1N0VEM1x1NEU0Qlx1NTQwRVx1NzY4NFx1NjNEMFx1NEVBNFx1MzAwMlxuICBjb25zdCBjb21taXRCeVNoYSA9IG5ldyBNYXAoKGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKS5tYXAoKGNvbW1pdCkgPT4gW2NvbW1pdC5zaGEsIGNvbW1pdF0pKVxuICBjb25zdCBsYXN0U3VtbWFyeUF0ID0gbm90ZXNcbiAgICAuZmlsdGVyKChub3RlKSA9PiBub3RlLnNoYSA9PT0gJ3N1bW1hcnknKVxuICAgIC5zb3J0KChsZWZ0LCByaWdodCkgPT4gcmlnaHQuY3JlYXRlZEF0IC0gbGVmdC5jcmVhdGVkQXQpWzBdPy5jcmVhdGVkQXRcbiAgY29uc3QgaXNVbmRpZ2VzdGVkID0gKGRhdGU6IG51bWJlcik6IGJvb2xlYW4gPT4gbGFzdFN1bW1hcnlBdCA9PT0gdW5kZWZpbmVkIHx8IGRhdGUgPiBsYXN0U3VtbWFyeUF0XG4gIGNvbnN0IHVuZGlnZXN0ZWRDb3VudCA9IChjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSkuZmlsdGVyKChjb21taXQpID0+IGlzVW5kaWdlc3RlZChjb21taXQuZGF0ZSkpLmxlbmd0aFxuICBjb25zdCBjb21taXRSb3VuZHMgPSBjbHVzdGVySW50b1JvdW5kcyhjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSlcblxuICAvKiogXHU0RTBCXHU2MkM5XHU2ODQ2XHU3Njg0XHU2M0QwXHU0RUE0XHU4ODRDXHVGRjA4XHU1NDJCXHU2NzJBXHU2RDg4XHU1MzE2XHU1NzA2XHU3MEI5XHVGRjFCd29ya2luZyBcdTY3NjFcdTc2RUVcdTRFMERcdTY4MDdcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgcmVuZGVyUGlja2VyUm93ID0gKGVudHJ5OiB7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBtZXRhOiBzdHJpbmc7IHNoYTogc3RyaW5nIH0pOiBSZWFjdC5SZWFjdE5vZGUgPT4ge1xuICAgIGNvbnN0IGNvbW1pdCA9IGNvbW1pdEJ5U2hhLmdldChlbnRyeS5zaGEpXG4gICAgY29uc3QgdW5kaWdlc3RlZCA9IGNvbW1pdCAhPT0gdW5kZWZpbmVkICYmIGlzVW5kaWdlc3RlZChjb21taXQuZGF0ZSlcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBrZXk9e2VudHJ5LmtleX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwYWRkaW5nOiAnN3B4IDEycHgnLCBjdXJzb3I6ICdwb2ludGVyJywgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoZW50cnkuc2hhKSA/ICdyZ2JhKDM3LDk5LDIzNSwwLjA3KScgOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICB9fVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgdG9nZ2xlVGFyZ2V0KGVudHJ5LnNoYSkgfX1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2lkdGg6ICcxNHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLCBmb250V2VpZ2h0OiA3MDAgfX0+XG4gICAgICAgICAge3NlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhlbnRyeS5zaGEpID8gJ1x1MjcxMycgOiAnJ31cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICB7dW5kaWdlc3RlZCAmJiAoXG4gICAgICAgICAgPHNwYW4gdGl0bGU9e3QoJ3BpY2tlci51bmRpZ2VzdGVkJyl9IHN0eWxlPXt7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpLCBmb250U2l6ZTogJzEwcHgnLCBmbGV4U2hyaW5rOiAwIH19Plx1MjVDRjwvc3Bhbj5cbiAgICAgICAgKX1cbiAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWluV2lkdGg6IDAgfX0+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+e2VudHJ5LmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57ZW50cnkubWV0YX08L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIGNvbnN0IGltcGFjdFJpc2tDb2xvciA9IHRoZW1lQXdhcmVUZXh0KGltcGFjdCA9PT0gbnVsbCA/ICcjNTc2MDZhJyA6IChSSVNLX0NPTE9SW2ltcGFjdC5yaXNrTGV2ZWxdID8/ICcjNTc2MDZhJykpXG5cbiAgY29uc3QgY29tbWl0c1RhYiA9IChcbiAgICA8PlxuICAgICAgey8qIFx1NEVEM1x1NUU5M1x1NjgwRiAqL31cbiAgICAgIDxDYXJkPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzI1NjNlYicpfT57Y29tbWl0c0RhdGE/LmJyYW5jaCA/PyAnXHUyMDE0J308L3NwYW4+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JyB9fT57Y29tbWl0c0RhdGE/LnJvb3RQYXRoID8/IHByb2plY3Q/LnJvb3RQYXRoID8/ICdcdTIwMTQnfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRDb21taXRzKCkgfX0+e3QoJ2FjdGlvbi5yZWZyZXNoJyl9PC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9XG4gICAgICAgICAgICBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3NjYW5IaXN0b3J5JywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2Jvb3RzdHJhcCcsIHsgaW5jbHVkZUhpc3Rvcnk6IHRydWUsIHN1bW1hcml6ZTogdHJ1ZSwgbWF4Q29tbWl0czogMzAgfSkgfX1cbiAgICAgICAgICA+e2J1c3kgPT09ICdzY2FuSGlzdG9yeScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgncmVwby5zY2FuSGlzdG9yeScpfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FyZD5cbiAgICAgIHsvKiBcdTYzRDBcdTRFQTRcdTU5MUFcdTkwMDlcdTRFMEJcdTYyQzlcdUZGMDhcdTdEMjdcdTUxRDFcdUZGMUJcdTkwMDlcdTRFMkRcdTUxODVcdTVCQjlcdTVCOENcdTY1NzRcdTVDNTVcdTc5M0FcdUZGMENcdTUxNDFcdThCQjhcdTgxRUFcdTcxMzZcdTYzNjJcdTg4NENcdUZGMDkgKi99XG4gICAgICA8Q2FyZCB0aXRsZT17dCgncGlja2VyLnRpdGxlJyl9PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH19PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHdpZHRoOiAnMTAwJScsIHRleHRBbGlnbjogJ2xlZnQnLCBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0Jywgd2hpdGVTcGFjZTogJ25vcm1hbCcgfX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0UGlja2VyT3BlbighcGlja2VyT3BlbikgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtaW5XaWR0aDogMCB9fT5cbiAgICAgICAgICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDBcbiAgICAgICAgICAgICAgICA/IHQoJ3BpY2tlci5wbGFjZWhvbGRlcicpXG4gICAgICAgICAgICAgICAgOiBgJHt0KCdwaWNrZXIuc2VsZWN0ZWQnKX0gJHtzZWxlY3RlZFRhcmdldHMubGVuZ3RofVx1RkYxQSR7c2VsZWN0ZWRUYXJnZXRzLm1hcChzaG9ydExhYmVsKS5qb2luKCdcdUZGMUInKX1gfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWFyZ2luTGVmdDogJzhweCcsIGZsZXhTaHJpbms6IDAgfX0+XHUyNUJFPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIHtwaWNrZXJPcGVuICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCB6SW5kZXg6IDI5IH19IG9uQ2xpY2s9eygpID0+IHsgc2V0UGlja2VyT3BlbihmYWxzZSkgfX0gLz5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICdjYWxjKDEwMCUgKyA0cHgpJywgbGVmdDogMCwgcmlnaHQ6IDAsIHpJbmRleDogMzAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JywgYm94U2hhZG93OiAnMCA4cHggMjRweCByZ2JhKDAsMCwwLDAuMTIpJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc4cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5pbnB1dH1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ3BpY2tlci5maWx0ZXInKX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3BpY2tlckZpbHRlcn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBpY2tlckZpbHRlcihlLnRhcmdldC52YWx1ZSkgfX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHNldFNlbGVjdGVkVGFyZ2V0cyhbXSkgfX0+e3QoJ3BpY2tlci5jbGVhcicpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWF4SGVpZ2h0OiA0MjAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgICAge3BpY2tlckZpbHRlci50cmltKCkgPT09ICcnID8gKFxuICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFx1NkQ0Rlx1ODlDOFx1ODlDNlx1NTZGRVx1RkYxQXdvcmtpbmcgXHU2NzYxXHU3NkVFICsgXHU2MzA5XHU4RjZFXHU2QjIxXHU1MjA2XHU3RUM0XHU3Njg0XHU2M0QwXHU0RUE0XHVGRjA4XHU1MzU1XHU2M0QwXHU0RUE0XHU4RjZFXHU0RTBEXHU2NjNFXHU3OTNBXHU3RUM0XHU1OTM0XHVGRjBDXHU5MDdGXHU1MTREXHU1NjZBXHU5N0YzXHVGRjA5XHUzMDAyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZXM6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3b3JraW5nID0gYWxsVGFyZ2V0cy5maW5kKChlbnRyeSkgPT4gZW50cnkuc2hhID09PSAnd29ya2luZycpXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmtpbmcgIT09IHVuZGVmaW5lZCkgbm9kZXMucHVzaChyZW5kZXJQaWNrZXJSb3cod29ya2luZykpXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnlTaGEgPSBuZXcgTWFwKGFsbFRhcmdldHMuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuc2hhICE9PSAnd29ya2luZycpLm1hcCgoZW50cnkpID0+IFtlbnRyeS5zaGEsIGVudHJ5XSkpXG4gICAgICAgICAgICAgICAgICAgICAgY29tbWl0Um91bmRzLmZvckVhY2goKHJvdW5kLCByb3VuZEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRyaWVzID0gcm91bmQuY29tbWl0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChjb21taXQpID0+IGJ5U2hhLmdldChjb21taXQuc2hhKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyB7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBtZXRhOiBzdHJpbmc7IHNoYTogc3RyaW5nIH0gPT4gZW50cnkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyaWVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cmllcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMucHVzaChyZW5kZXJQaWNrZXJSb3coZW50cmllc1swXSEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoYXMgPSBlbnRyaWVzLm1hcCgoZW50cnkpID0+IGVudHJ5LnNoYSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbFNlbGVjdGVkID0gc2hhcy5ldmVyeSgoc2hhKSA9PiBzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoc2hhKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtgcm91bmQtJHtyb3VuZEluZGV4fWB9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzhweCcsIHBhZGRpbmc6ICc2cHggMTJweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMywgcmdiYSg1LDUsNSwwLjA2KSknLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx1RDgzRFx1REREMyB7dChyb3VuZEluZGV4ID09PSAwID8gJ3BpY2tlci5yb3VuZExhdGVzdCcgOiAncGlja2VyLnJvdW5kJykucmVwbGFjZSgne259JywgU3RyaW5nKHJvdW5kSW5kZXggKyAxKSl9IFx1MDBCNyB7U3RyaW5nKGVudHJpZXMubGVuZ3RoKX0ge3QoJ3JlcG8uY29tbWl0cycpfSBcdTAwQjcge25ldyBEYXRlKHJvdW5kLmZpcnN0QXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpfVx1MjAxM3tuZXcgRGF0ZShyb3VuZC5sYXN0QXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTBweCcgfX0gb25DbGljaz17KCkgPT4geyBzZWxlY3RSb3VuZChzaGFzKSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthbGxTZWxlY3RlZCA/IHQoJ3BpY2tlci5yb3VuZENsZWFyJykgOiB0KCdwaWNrZXIucm91bmRTZWxlY3QnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSBub2Rlcy5wdXNoKHJlbmRlclBpY2tlclJvdyhlbnRyeSkpXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgfSkoKVxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRUYXJnZXRzLm1hcCgoZW50cnkpID0+IHJlbmRlclBpY2tlclJvdyhlbnRyeSkpXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgeyhwaWNrZXJGaWx0ZXIudHJpbSgpID09PSAnJyA/IGFsbFRhcmdldHMgOiBmaWx0ZXJlZFRhcmdldHMpLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdwaWNrZXIubm9NYXRjaCcpfTwvZGl2Pn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpblRvcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdwaWNrZXIuaGludCcpfTwvc3Bhbj5cbiAgICAgICAgICB7dW5kaWdlc3RlZENvdW50ID4gMCAmJiAoXG4gICAgICAgICAgICA8c3BhbiB0aXRsZT17dCgncGlja2VyLnVuZGlnZXN0ZWQnKX0gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JykgfX0+XG4gICAgICAgICAgICAgIFx1MjVDRiB7dCgncGlja2VyLnVuZGlnZXN0ZWRDb3VudCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyh1bmRpZ2VzdGVkQ291bnQpKX1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHsoZGV0YWlsUXVldWVkQ291bnQgPiAwIHx8IGRldGFpbFJ1bm5pbmdDb3VudCA+IDApICYmIChcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNkY2RjYWEnKX0+XG4gICAgICAgICAgICAgIHtkZXRhaWxSdW5uaW5nQ291bnQgPiAwID8gdCgnZGV0YWlsLmFpTG9hZGluZycpIDogJyd9XG4gICAgICAgICAgICAgIHtkZXRhaWxSdW5uaW5nQ291bnQgPiAwICYmIGRldGFpbFF1ZXVlZENvdW50ID4gMCA/ICcgJyA6ICcnfVxuICAgICAgICAgICAgICB7ZGV0YWlsUXVldWVkQ291bnQgPiAwID8gJ1x1MjNGMyAnICsgdCgnZGV0YWlsLnF1ZXVlZCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhkZXRhaWxRdWV1ZWRDb3VudCkpIDogJyd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NhcmQ+XG5cbiAgICAgIHtjb21taXRzRXJyb3IgIT09IG51bGwgJiYgPENhcmQ+PGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncmVwby5sb2FkRmFpbGVkJyl9OiB7Y29tbWl0c0Vycm9yfTwvZGl2PjwvQ2FyZD59XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCAmJiA8Q2FyZD48ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdkZXRhaWwucGljaycpfTwvZGl2PjwvQ2FyZD59XG5cbiAgICAgIHsvKiBcdTVERTVcdTRGNUNcdThGNkVcdTZCMjFcdTUzRDlcdTRFOEJcdUZGMUFcdTU5MUFcdTYzRDBcdTRFQTRcdTY1NzRcdTRGNTNcdTg5RTNcdThCRkIgKi99XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmZpbHRlcigodGFyZ2V0KSA9PiB0YXJnZXQgIT09ICd3b3JraW5nJykubGVuZ3RoID49IDIgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17J1x1RDgzRFx1RENENiAnICsgdCgnbmFycmF0aXZlLnRpdGxlJyl9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiBuYXJyYXRpdmUgPT09IG51bGwgPyAnMCcgOiAnOHB4JyB9fT5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtuYXJyYXRpdmVCdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZE5hcnJhdGl2ZSgpIH19PlxuICAgICAgICAgICAgICB7bmFycmF0aXZlQnVzeSA/IHQoJ25hcnJhdGl2ZS5ydW5uaW5nJykgOiAnXHUyNzI4ICcgKyB0KCduYXJyYXRpdmUuZ2VuZXJhdGUnKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAge25hcnJhdGl2ZSAhPT0gbnVsbCAmJiBuYXJyYXRpdmUuY2FjaGVkICYmIChcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ2NhY2hlLmhpdCcpfXtuYXJyYXRpdmUuZ2VuZXJhdGVkQXQgIT09IHVuZGVmaW5lZCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShuYXJyYXRpdmUuZ2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ308L3NwYW4+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge25hcnJhdGl2ZSAhPT0gbnVsbCAmJiByZW5kZXJDb3N0QmFkZ2UobmFycmF0aXZlLmNvc3RVc2QsIHQoJ2Nvc3QudG9vbHRpcCcpKX1cbiAgICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17bmFycmF0aXZlQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWROYXJyYXRpdmUodHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtuYXJyYXRpdmVFcnJvciAhPT0gJycgJiYgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuZW1wdHksIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2QxMjQyZicpIH19PntuYXJyYXRpdmVFcnJvcn08L2Rpdj59XG4gICAgICAgICAge25hcnJhdGl2ZSAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnIH19PntyZW5kZXJTdHJ1Y3R1cmVkQ29udGVudChuYXJyYXRpdmUubmFycmF0aXZlKX08L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuXG4gICAgICB7LyogXHU2QkNGXHU2NzYxXHU5MDA5XHU0RTJEXHU2M0QwXHU0RUE0XHU3Njg0IEFJIFx1ODlFM1x1OEJGQiAqL31cbiAgICAgIHtzZWxlY3RlZFRhcmdldHMubWFwKCh0YXJnZXQpID0+IHtcbiAgICAgICAgY29uc3QgZCA9IGRldGFpbHNbdGFyZ2V0XVxuICAgICAgICBjb25zdCBsYWJlbCA9IHRhcmdldCA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiAoZD8uY29tbWl0Py5tZXNzYWdlID8/IHRhcmdldC5zbGljZSgwLCA4KSlcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Q2FyZCBrZXk9e2BkLSR7dGFyZ2V0fWB9IHRpdGxlPXtgXHVEODNEXHVERDBEICR7bGFiZWx9JHt0YXJnZXQgIT09ICd3b3JraW5nJyA/IGBcdUZGMDgke3RhcmdldC5zbGljZSgwLCA4KX1cdUZGMDlgIDogJyd9YH0+XG4gICAgICAgICAgICB7ZCAhPT0gdW5kZWZpbmVkICYmIChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzQ2FjaGVkID09PSB0cnVlICYmIChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e3QoJ2NhY2hlLmhpdCcpfXtkLmFuYWx5c2lzR2VuZXJhdGVkQXQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUoZC5hbmFseXNpc0dlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge3JlbmRlckNvc3RCYWRnZShkLmFuYWx5c2lzQ29zdFVzZCwgdCgnY29zdC50b29sdGlwJykgKyAoZC5hbmFseXNpc1Rva2VucyA/IGBcdUZGMDhpbiAke2QuYW5hbHlzaXNUb2tlbnMuaW5wdXR9IC8gb3V0ICR7ZC5hbmFseXNpc1Rva2Vucy5vdXRwdXR9IHRva2Vuc1x1RkYwOWAgOiAnJykpfVxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgbG9hZERldGFpbCh0YXJnZXQsIHRydWUpIH19Pnt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ2RldGFpbC5zYXZlTm90ZUhpbnQnKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hhID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyAnd29ya2luZycgOiB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3RlcycsIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogYCR7dCgnZGV0YWlsLnNhdmVOb3RlVGl0bGUnKX1cdUZGMUEkeyhkLmNvbW1pdD8ubWVzc2FnZSA/PyB0YXJnZXQpLnNsaWNlKDAsIDYwKX1gLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFtgXHUzMDEwXHU2NTM5XHU0RTg2XHU0RUMwXHU0RTQ4XHUzMDExXFxuJHtkLmFuYWx5c2lzLndoYXR9YCwgYFx1MzAxMFx1NUI5RVx1NzNCMFx1OTAzQlx1OEY5MVx1MzAxMVxcbiR7KGQuYW5hbHlzaXMubG9naWMgPz8gW10pLmpvaW4oJ1x1RkYxQicpfWAsIGBcdTMwMTBcdTk4Q0VcdTk2NjlcdTcwQjlcdTMwMTFcXG4keyhkLmFuYWx5c2lzLnJpc2tzID8/IFtdKS5qb2luKCdcdUZGMUInKX1gXS5maWx0ZXIoKGJsb2NrKSA9PiAhYmxvY2suZW5kc1dpdGgoJ1x1MzAxMVxcbicpKS5qb2luKCdcXG5cXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgICBzaGEsIHRhZ3M6ICdcdTY4MzhcdTY3RTUnLFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCh7IG9rIH0pID0+IHsgc2V0QWN0aW9uUmVzdWx0KG9rID8gJ1x1MjcxMyBcdTVERjJcdTVCNThcdTRFM0FcdTdCMTRcdThCQjBcdUZGMDhcdTdCMTRcdThCQjBcdTk4NzVcdTUzRUZcdTY3RTVcdTc3MEJcdUZGMDknIDogJ1x1MjcxNyBcdTRGRERcdTVCNThcdTU5MzFcdThEMjUnKSA7IGlmIChvaykgdm9pZCBsb2FkTm90ZXMoKSB9KVxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XHVEODNEXHVEQ0JFIHt0KCdkZXRhaWwuc2F2ZU5vdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdkZXRhaWwuc2F2ZU1lbW9yeUhpbnQnKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hhID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyB1bmRlZmluZWQgOiB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnknLCB7XG4gICAgICAgICAgICAgICAgICAgICAgbWVtb3J5VHlwZTogJ3Jpc2tfaG90c3BvdCcsIHNvdXJjZVRhZzogJ3JldmlldycsIGJhc2lzU2hhOiBzaGEsXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGBcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdUZGMUEkeyhkLmNvbW1pdD8ubWVzc2FnZSA/PyB0YXJnZXQpLnNsaWNlKDAsIDYwKX1gLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFtkLmFuYWx5c2lzLndoYXQsIChkLmFuYWx5c2lzLnJpc2tzID8/IFtdKS5qb2luKCdcdUZGMUInKV0uZmlsdGVyKChwYXJ0KSA9PiBwYXJ0ICE9PSAnJykuam9pbignXFxuLS0tXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHsgb2sgfSkgPT4geyBzZXRBY3Rpb25SZXN1bHQob2sgPyAnXHUyNzEzIFx1NURGMlx1NkM4OVx1NkRDMFx1NEUzQVx1OEJCMFx1NUZDNlx1RkYwOFx1NUY4NVx1Nzg2RVx1OEJBNFx1OTYxRlx1NTIxN1x1RkYwOScgOiAnXHUyNzE3IFx1NEZERFx1NUI1OFx1NTkzMVx1OEQyNScpOyBpZiAob2spIHZvaWQgbG9hZE1lbW9yaWVzKCkgfSlcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlx1RDgzRVx1RERFMCB7dCgnZGV0YWlsLnNhdmVNZW1vcnknKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2QgPT09IHVuZGVmaW5lZCA/IChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57ZGV0YWlsU3RhdHVzW3RhcmdldF0gPT09ICdxdWV1ZWQnID8gJ1x1MjNGMyAnICsgdCgnZGV0YWlsLmNhcmRRdWV1ZWQnKSA6IHQoJ2RldGFpbC5haUxvYWRpbmcnKX08L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAge2QuY29tbWl0ICE9PSBudWxsICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5jb21taXRNZXRhfT57ZC5jb21taXQuYXV0aG9yfSBcdTAwQjcge25ldyBEYXRlKGQuY29tbWl0LmRhdGUpLnRvTG9jYWxlU3RyaW5nKCl9IFx1MDBCNyB7ZC5maWxlcy5sZW5ndGh9IHt0KCdkZXRhaWwuZmlsZXMnKX0gXHUwMEI3ICt7ZC5pbnNlcnRpb25zfS8te2QuZGVsZXRpb25zfTwvZGl2Pn1cbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy53aGF0ICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzhweCcgfX0+e3QoJ2RldGFpbC53aGF0Jyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy53aGF0fT57ZC5hbmFseXNpcy53aGF0fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5sb2dpYy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zZWN0aW9uVGl0bGV9Pnt0KCdkZXRhaWwubG9naWMnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2QuYW5hbHlzaXMubG9naWMubWFwKChzdGVwLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXtzdHlsZXMubG9naWNTdGVwfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJywgZm9udFdlaWdodDogNjAwIH19PntpICsgMX0uPC9zcGFuPntzdGVwfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2QuYW5hbHlzaXMucmlza3MubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzZweCcgfX0+e3QoJ2RldGFpbC5yaXNrJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLnJpc2tzLm1hcCgocmlzaywgaSkgPT4gPGRpdiBrZXk9e2l9IHN0eWxlPXt7IC4uLnN0eWxlcy5yaXNrSXRlbSwgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjOWE2NzAwJykgfX0+XHUyNkEwIHtyZW5kZXJXaXRoUGVlayhyaXNrKX08L2Rpdj4pfVxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7LyogXHU2NTg3XHU0RUY2XHU2RTA1XHU1MzU1ICsgXHU5MDEwXHU2NTg3XHU0RUY2XHU5QUQ4XHU0RUFFXHU1QkY5XHU2QkQ0ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnMTBweCcgfX0+e3QoJ2RldGFpbC5maWxlcycpfTwvZGl2PlxuICAgICAgICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAge2QuZmlsZXMubWFwKChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7dGFyZ2V0fXwke2ZpbGUucGF0aH1gXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF0Y2ggPSBmaWxlRGlmZnNba2V5XVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtrZXl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19PntmaWxlLnBhdGh9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyMxYTdmMzcnKSwgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+K3tmaWxlLmFkZHN9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNjZjIyMmUnKSwgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+LXtmaWxlLmRlbHN9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkRmlsZURpZmYodGFyZ2V0LCBmaWxlLnBhdGgpIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGF0Y2ggPT09IHVuZGVmaW5lZCA/IHQoJ2RpZmYuc2hvdycpIDogdCgnZGlmZi5oaWRlJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7cGF0Y2ggIT09IHVuZGVmaW5lZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17YCR7a2V5fS1kaWZmYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY29sU3Bhbj17NH0gc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBwYWRkaW5nOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGlmZlZpZXcgcGF0Y2g9e3BhdGNofSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQ2FyZD5cbiAgICAgICAgKVxuICAgICAgfSl9XG5cbiAgICAgIHsvKiBcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdUZGMUFcdTYzMDlcdTk0QUUgKyBcdTk4Q0VcdTk2NjlcdTY3ODRcdTYyMTAgKyBcdTU5MjdcdTU2RkUgKyBcdTVGNzFcdTU0Q0RcdTcwQjlcdTY2MEVcdTdFQzYgKyBcdThCQjBcdTVGQzZcdTgwNTRcdTUyQTggKi99XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17dCgnZGV0YWlsLmltcGFjdCcpfT5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17aW1wYWN0TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJbXBhY3QoKSB9fT5cbiAgICAgICAgICAgIHtpbXBhY3RMb2FkaW5nID8gdCgnZGV0YWlsLmltcGFjdExvYWRpbmcnKSA6IHQoJ2RldGFpbC5pbXBhY3QnKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIGltcGFjdC5leHBsYW5hdGlvbnNDYWNoZWQgPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKCcjOGI4YjhiJyksIG1hcmdpbkxlZnQ6ICc4cHgnIH19PlxuICAgICAgICAgICAgICB7dCgnY2FjaGUuaGl0Jyl9e2ltcGFjdC5nZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShpbXBhY3QuZ2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ31cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtpbXBhY3QgIT09IG51bGwgJiYgcmVuZGVyQ29zdEJhZGdlKGltcGFjdC5leHBsYW5hdGlvbnNDb3N0VXNkLCB0KCdjb3N0LnRvb2x0aXAnKSl9XG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIG1hcmdpbkxlZnQ6ICc4cHgnLCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gZGlzYWJsZWQ9e2ltcGFjdExvYWRpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkSW1wYWN0KHRydWUpIH19PlxuICAgICAgICAgICAgICB7dCgnY2FjaGUucmVnZW5lcmF0ZScpfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnMTBweCcsIG1hcmdpbjogJzEwcHggMCA0cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5iYWRnZShpbXBhY3RSaXNrQ29sb3IpLCBmb250U2l6ZTogJzEzcHgnLCBwYWRkaW5nOiAnM3B4IDEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAge3QoJ2ltcGFjdC5yaXNrJyl9OiB7aW1wYWN0LnJpc2tMZXZlbH1cdUZGMDh7aW1wYWN0LnJpc2tTY29yZX1cdUZGMDlcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAge2ltcGFjdC5rZXlDaGFuZ2VQb2ludHMgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3Qua2V5Q2hhbmdlUG9pbnRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjOWE2NzAwJykgfX0+XHUyNkEwIHt0KCdpbXBhY3Qua2V5UG9pbnRzJyl9OiB7aW1wYWN0LmtleUNoYW5nZVBvaW50cy5tYXAoKGZpbGUpID0+IGZpbGUuc3BsaXQoJy8nKS5wb3AoKSkuam9pbignXHUzMDAxJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7aW1wYWN0LnJpc2tGYWN0b3JzICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LnJpc2tGYWN0b3JzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2VjdGlvblRpdGxlfT57dCgnaW1wYWN0LmZhY3RvcnMnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnMnB4JywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpbXBhY3Qucmlza0ZhY3RvcnMubWFwKChmYWN0b3IsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBmb250U2l6ZTogJzEycHgnLCBwYWRkaW5nOiAnM3B4IDhweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLCBib3JkZXJSYWRpdXM6ICc0cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2ZhY3Rvci50ZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBpbXBhY3RSaXNrQ29sb3IsIGZvbnRXZWlnaHQ6IDYwMCB9fT4re2ZhY3Rvci5wb2ludHN9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8SW1wYWN0R3JhcGggZGF0YT17aW1wYWN0fSB0PXt0fSAvPlxuICAgICAgICAgICAgICB7aW1wYWN0LmxldmVscy5sZW5ndGggPT09IDAgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnaW1wYWN0Lm5vbmUnKX08L2Rpdj59XG4gICAgICAgICAgICAgIHsvKiBcdTUxRkRcdTY1NzBcdTdFQTdcdTVGNzFcdTU0Q0RcdUZGMUFcdTY3MkNcdTZCMjFcdTRGRUVcdTY1MzlcdTRFODZcdTU0RUFcdTRFOUJcdTUxRkRcdTY1NzBcdTMwMDFcdTZDRTJcdTUzQ0FcdTRFODZcdThDMDFcdTc2ODRcdTU0RUFcdTRFOUJcdTUxRkRcdTY1NzBcdTMwMDFcdThDMDNcdTc1MjhcdTcwQjlcdTU3MjhcdTU0RUEgKi99XG4gICAgICAgICAgICAgIHtpbXBhY3QuZnVuY3Rpb25JbXBhY3QgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3QuZnVuY3Rpb25JbXBhY3QubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnMTJweCcgfX0+e3QoJ2ltcGFjdC5mdW5jdGlvbnMnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAge2ltcGFjdC5mdW5jdGlvbkltcGFjdC5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5LnN5bWJvbH0gc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAxMHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNkOTc3MDYnKX0+e2VudHJ5LnN5bWJvbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5sYWJlbCwgbWFyZ2luTGVmdDogJzhweCcgfX0+e2VudHJ5LmRlZmluZWRJbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5yb2xlICE9PSB1bmRlZmluZWQgJiYgZW50cnkucm9sZSAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdpbmxpbmUnLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+e3QoJ2ltcGFjdC5mdW5jUm9sZScpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkucm9sZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNoYW5nZSAhPT0gdW5kZWZpbmVkICYmIGVudHJ5LmNoYW5nZSAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0IH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdpbmxpbmUnLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM5YTY3MDAnKSB9fT57dCgnaW1wYWN0LmZ1bmNDaGFuZ2UnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmltcGFjdCAhPT0gdW5kZWZpbmVkICYmIGVudHJ5LmltcGFjdCAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBtYXJnaW5Cb3R0b206ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdpbmxpbmUnLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNjZTkxNzgnKSB9fT57dCgnaW1wYWN0LmZ1bmNDYWxsZXJzJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5pbXBhY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5jYWxsZXJzLm1hcCgoY2FsbGVyLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyAuLi5zdHlsZXMubG9naWNTdGVwLCBtYXJnaW5Ub3A6ICczcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpIH19Plx1MjFCMzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4Jywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSBkb3R0ZWQnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBvcGVuUGVlayhjYWxsZXIuZmlsZSwgTnVtYmVyKGNhbGxlci5saW5lKSkgfX0+e2NhbGxlci5maWxlfTp7Y2FsbGVyLmxpbmV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cdTIwMTQge2NhbGxlci5zbmlwcGV0LnNsaWNlKDAsIDgwKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHtpbXBhY3QuZnVuY3Rpb25JbXBhY3QgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3QuZnVuY3Rpb25JbXBhY3QubGVuZ3RoID09PSAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdpbXBhY3QuZnVuY3Rpb25zTm9uZScpfTwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7aW1wYWN0Lm1lbW9yaWVzICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0Lm1lbW9yaWVzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMTBweCcsIHBhZGRpbmc6ICc4cHggMTBweCcsIGJvcmRlcjogJzFweCBkYXNoZWQgcmdiYSgzNyw5OSwyMzUsMC4zNSknLCBib3JkZXJSYWRpdXM6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+e3QoJ2ltcGFjdC5tZW1vcnknKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4V3JhcDogJ3dyYXAnLCBnYXA6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICB7aW1wYWN0Lm1lbW9yaWVzLm1hcCgobWVtb3J5LCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4ga2V5PXtpfSBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9PnttZW1vcnkudGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cblxuICAgICAgey8qIFx1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNVx1RkYxQVx1N0VEM1x1OEJCQSArIFx1N0VEM1x1Njc4NFx1NTMxNlx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NSAqL31cbiAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdkZXRhaWwub3B0aW1hbGl0eScpfT5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17cmV2aWV3TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSZXZpZXdzKCkgfX0+XG4gICAgICAgICAgICB7cmV2aWV3TG9hZGluZyA/IHQoJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZycpIDogdCgnZGV0YWlsLm9wdGltYWxpdHknKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLm1hcCgodGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByID0gcmV2aWV3c1t0YXJnZXRdXG4gICAgICAgICAgICBpZiAociA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbFxuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/IHQoJ3JlcG8ud29ya2luZycpIDogdGFyZ2V0LnNsaWNlKDAsIDgpXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17YHItJHt0YXJnZXR9YH0gc3R5bGU9e3sgbWFyZ2luVG9wOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgICAgICAgICAge3IuY2FjaGVkID09PSB0cnVlICYmIChcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57dCgnY2FjaGUuaGl0Jyl9e3IuZ2VuZXJhdGVkQXQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUoci5nZW5lcmF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKSA6ICcnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7cmVuZGVyQ29zdEJhZGdlKHIuY29zdFVzZCwgdCgnY29zdC50b29sdGlwJykpfVxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSZXZpZXdzKHRydWUpIH19Pnt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge3IudmVyZGljdCAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCwgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDUpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMzcsOTksMjM1LDAuMiknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnIH19PntyLnZlcmRpY3R9PC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7ci5pc3N1ZUxpc3QgIT09IHVuZGVmaW5lZCAmJiByLmlzc3VlTGlzdC5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRyPntbJ3Jldmlldy5jb2wuc2V2ZXJpdHknLCAncmV2aWV3LmNvbC5jYXRlZ29yeScsICdyZXZpZXcuY29sLnRpdGxlJywgJ3Jldmlldy5jb2wuZXZpZGVuY2UnLCAncmV2aWV3LmNvbC5maXgnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAge3IuaXNzdWVMaXN0Lm1hcCgoaXNzdWUsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShpc3N1ZS5zZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyA/ICcjZjE0YzRjJyA6IGlzc3VlLnNldmVyaXR5ID09PSAnaGlnaCcgPyAnI2NlOTE3OCcgOiBpc3N1ZS5zZXZlcml0eSA9PT0gJ21lZGl1bScgPyAnI2RjZGNhYScgOiAnIzU2OWNkNicpfT57aXNzdWUuc2V2ZXJpdHl9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXNzdWUuY2F0ZWdvcnl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntpc3N1ZS50aXRsZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4Jywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57aXNzdWUuZXZpZGVuY2V9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntpc3N1ZS5maXh9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXZpZXcuY2xlYW4nKX08L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KX1cbiAgICAgICAgICB7cmV2aWV3TG9hZGluZyAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnKX08L2Rpdj59XG4gICAgICAgICAgeyFyZXZpZXdMb2FkaW5nICYmIHNlbGVjdGVkVGFyZ2V0cy5ldmVyeSgodGFyZ2V0KSA9PiByZXZpZXdzW3RhcmdldF0gPT09IHVuZGVmaW5lZCkgJiYgKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncmV2aWV3LmhpbnQnKX08L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuICAgIDwvPlxuICApXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1OEJCRVx1N0Y2RVx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgVElFUl9MQUJFTFM6IEFycmF5PHsga2V5OiBzdHJpbmc7IHpoOiBzdHJpbmc7IGRlc2M6IHN0cmluZyB9PiA9IFtcbiAgICB7IGtleTogJ3N0YW5kYXJkJywgemg6ICdcdTg5RTNcdThCRkIgLyBcdTUxRkRcdTY1NzBcdTVGNzFcdTU0Q0RcdThCRjRcdTY2MEUnLCBkZXNjOiAnXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XHU3Njg0IEFJIFx1ODlFM1x1OEJGQlx1MzAwMVx1NUY3MVx1NTRDRFx1NTIwNlx1Njc5MCcgfSxcbiAgICB7IGtleTogJ3JlYXNvbmluZycsIHpoOiAnXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1IC8gXHU2MjY3XHU4ODRDXHU4QkExXHU1MjEyJywgZGVzYzogJ1x1OEJDNFx1NUJBMVx1MzAwMVx1OEJBMVx1NTIxMlx1NzUxRlx1NjIxMFx1MzAwMUFJIFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEMycgfSxcbiAgICB7IGtleTogJ2Zhc3QnLCB6aDogJ1x1NTM4Nlx1NTNGMlx1OEY3Qlx1Njc5MCcsIGRlc2M6ICdcdTYyNkJcdTYzQ0ZcdTUzODZcdTUzRjJcdTY1RjZcdTc2ODRcdTkwMTBcdTYzRDBcdTRFQTRcdTRFMDBcdTUzRTVcdThCREQnIH0sXG4gICAgeyBrZXk6ICd2ZXJpZmllcicsIHpoOiAnXHU5QThDXHU2NTM2JywgZGVzYzogJ1x1NjUzOVx1NTJBOFx1OUE4Q1x1NjUzNlx1NzY4NCBBSSBcdTU5MERcdTY4MzgnIH0sXG4gIF1cblxuICBjb25zdCBzZXR0aW5nc1RhYiA9IChcbiAgICA8PlxuICAgICAgey8qIFx1NkEyMVx1NTc4Qlx1NTIwNlx1OTE0RFx1RkYxQVx1NTNFRlx1ODlDNlx1NTMxNlx1NTIwN1x1NjM2Mlx1NTQwNFx1NEVGQlx1NTJBMVx1NzUyOFx1NzY4NFx1NkEyMVx1NTc4Qlx1RkYwQ1x1NEZERFx1NUI1OFx1NTM3M1x1NzUxRlx1NjU0OCAqL31cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdtb2RlbC50aXRsZScpfT5cbiAgICAgICAge21vZGVsVGllcnMgPT09IG51bGwgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnbW9kZWwubG9hZGluZycpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICB7VElFUl9MQUJFTFMubWFwKCh0aWVyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBtb2RlbFRpZXJzW3RpZXIua2V5XVxuICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnQgPyBjdXJyZW50LnByb3ZpZGVyICsgJy8nICsgY3VycmVudC5tb2RlbCA6ICcnXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e3RpZXIua2V5fSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1pbldpZHRoOiAxNTAsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fT57dGllci56aH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAyNDAgfX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2ID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodiA9PT0gJycpIHsgc2V0TW9kZWxUaWVycyh7IC4uLm1vZGVsVGllcnMsIFt0aWVyLmtleV06IHsgcHJvdmlkZXI6ICcnLCBtb2RlbDogJycgfSB9KTsgcmV0dXJuIH1cbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbcHJvdmlkZXIsIC4uLnJlc3RdID0gdi5zcGxpdCgnLycpXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZWwgPSByZXN0LmpvaW4oJy8nKVxuICAgICAgICAgICAgICAgICAgICAgIHNldE1vZGVsVGllcnMoeyAuLi5tb2RlbFRpZXJzLCBbdGllci5rZXldOiB7IHByb3ZpZGVyLCBtb2RlbCB9IH0pXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj57dCgnbW9kZWwuZm9sbG93Q2hhdCcpfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICB7bW9kZWxPcHRpb25zLm1hcCgob3B0aW9uKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0gdmFsdWU9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7b3B0aW9uLnByb3ZpZGVyfSAvIHtvcHRpb24ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0aWVyLmRlc2N9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e21vZGVsU2F2aW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc2F2ZU1vZGVsQ29uZmlnKCkgfX0+XG4gICAgICAgICAgICAgICAge21vZGVsU2F2aW5nID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ21vZGVsLnNhdmUnKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIHttb2RlbFNhdmVkICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM0ZWM5YjAnKX0+e3QoJ21vZGVsLnNhdmVkJyl9PC9zcGFuPn1cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ21vZGVsLmhpbnQnKX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxkaXYgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJywgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtdGVydGlhcnksICM5Y2EzYWYpJywgcGFkZGluZzogJzhweCAwJyB9fT5cbiAgICAgICAgZHNoLXByb2plY3QtY29udHJvbCB2e3N0YXRlPy5wbHVnaW5WZXJzaW9uID8/ICc/J31cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApXG5cbiAgY29uc3Qgb3ZlcnZpZXdUYWIgPSAoXG4gICAgPD5cbiAgICAgIDxDYXJkPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17Ym9vdHN0cmFwcGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkJvb3RzdHJhcCgpIH19PlxuICAgICAgICAgICAge2Jvb3RzdHJhcHBpbmcgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLnJlc2NhbicpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtidXN5ICE9PSBudWxsfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdhbmFseXplJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2FuYWx5emUnLCB7fSkgfX0+XG4gICAgICAgICAgICB7YnVzeSA9PT0gJ2FuYWx5emUnID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi5hbmFseXplJyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGx9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3ZlcmlmeScsICcvcHJvamVjdC1jb250cm9sL2FwaS92ZXJpZnknLCB7fSkgfX0+XG4gICAgICAgICAgICB7YnVzeSA9PT0gJ3ZlcmlmeScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLnZlcmlmeScpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FyZD5cbiAgICAgIHtyZXN1bHRQYW5lbH1cbiAgICAgIHtwcm9qZWN0ID09PSBudWxsID8gKFxuICAgICAgICA8Q2FyZD5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCwgZm9udFNpemU6ICcxM3B4JywgbWFyZ2luQm90dG9tOiAnNnB4JyB9fT57dCgnc3RhdGUubm9Qcm9qZWN0Jyl9PC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc3RhdGUubm9Qcm9qZWN0SGludCcpfTwvZGl2PlxuICAgICAgICA8L0NhcmQ+XG4gICAgICApIDogKFxuICAgICAgICA8Q2FyZCB0aXRsZT17YCR7dCgnc3RhdGUucHJvamVjdCcpfVx1RkYxQSR7cHJvamVjdC5uYW1lfWB9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+Um9vdDwvc3Bhbj57cHJvamVjdC5yb290UGF0aH08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2Jvb3RzdHJhcCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUudGVjaFN0YWNrJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAge2Jvb3RzdHJhcC50ZWNoU3RhY2subWFwKCh0ZWNoKSA9PiA8c3BhbiBrZXk9e3RlY2h9IHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM0ZWM5YjAnKX0+e3RlY2h9PC9zcGFuPil9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLnN5bWJvbHMnKX08L3NwYW4+e1N0cmluZyhib290c3RyYXAuc3ltYm9sc0NvdW50KX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLm1hbmlmZXN0cycpfTwvc3Bhbj57U3RyaW5nKGJvb3RzdHJhcC5tYW5pZmVzdEZpbGVzLmxlbmd0aCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS5ldmlkZW5jZScpfTwvc3Bhbj57U3RyaW5nKHN0YXRlPy5ldmlkZW5jZUNvdW50ID8/IDApfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpblRvcDogJzhweCcgfX0+e2Jvb3RzdHJhcC5zdW1tYXJ5fTwvZGl2PlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdjb25maXJtZWQudGl0bGUnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICA8dGV4dGFyZWEgcm93cz17Mn0gc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcGxhY2Vob2xkZXI9e3QoJ2NvbmZpcm1lZC50ZXh0Jyl9IHZhbHVlPXtjb25maXJtZWRUZXh0fSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q29uZmlybWVkVGV4dChlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2NvbmZpcm1lZC5wYXRocycpfSB2YWx1ZT17Y29uZmlybWVkUGF0aHN9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDb25maXJtZWRQYXRocyhlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLmJ1dHRvbn1cbiAgICAgICAgICAgIGRpc2FibGVkPXtidXN5ICE9PSBudWxsIHx8IGNvbmZpcm1lZFRleHQgPT09ICcnfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignYWRkQ29uZmlybWVkJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbmZpcm1lZCcsIHsgdHlwZTogJ2NvbnN0cmFpbnQnLCB0ZXh0OiBjb25maXJtZWRUZXh0LCBmb3JiaWRkZW5QYXRoczogY29uZmlybWVkUGF0aHMuc3BsaXQoJywnKS5tYXAoKHBhdGgpID0+IHBhdGgudHJpbSgpKS5maWx0ZXIoKHBhdGgpID0+IHBhdGggIT09ICcnKSB9KS50aGVuKCgpID0+IHsgc2V0Q29uZmlybWVkVGV4dCgnJyk7IHNldENvbmZpcm1lZFBhdGhzKCcnKSB9KSB9fVxuICAgICAgICAgID57YnVzeSA9PT0gJ2FkZENvbmZpcm1lZCcgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnY29uZmlybWVkLmFkZCcpfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2NvbmZpcm1lZC5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnY29uZmlybWVkLm5vbmUnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtjb25maXJtZWQubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17aXRlbS5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnI2M1ODZjMCcpfT57aXRlbS50eXBlfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntpdGVtLnRleHR9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXRlbS5mb3JiaWRkZW5QYXRocy5qb2luKCcsICcpIHx8ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdyZW1vdmVDb25maXJtZWQnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY29uZmlybWVkL3JlbW92ZScsIHsgaWQ6IGl0ZW0uaWQgfSkgfX1cbiAgICAgICAgICAgICAgICAgICAgPlx1MjcxNTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdhY3Rpb24uY3JlYXRlQ2hhbmdlJyl9PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLmNoYW5nZVRpdGxlJyl9IHZhbHVlPXtjaGFuZ2VUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENoYW5nZVRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPXsyfSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSBwbGFjZWhvbGRlcj17dCgnZm9ybS5jaGFuZ2VEZXNjJyl9IHZhbHVlPXtjaGFuZ2VEZXNjfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q2hhbmdlRGVzYyhlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLmJ1dHRvbn1cbiAgICAgICAgICAgIGRpc2FibGVkPXtidXN5ICE9PSBudWxsIHx8IGNoYW5nZVRpdGxlID09PSAnJ31cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2NyZWF0ZUNoYW5nZScsICcvcHJvamVjdC1jb250cm9sL2FwaS9jaGFuZ2VzJywgeyB0aXRsZTogY2hhbmdlVGl0bGUsIGRlc2NyaXB0aW9uOiBjaGFuZ2VEZXNjIH0pLnRoZW4oKCkgPT4geyBzZXRDaGFuZ2VUaXRsZSgnJyk7IHNldENoYW5nZURlc2MoJycpIH0pIH19XG4gICAgICAgICAgPntidXN5ID09PSAnY3JlYXRlQ2hhbmdlJyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24uY3JlYXRlQ2hhbmdlJyl9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7Y2hhbmdlcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc3RhdGUubm9DaGFuZ2VzJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+e1snY2hhbmdlcy5jb2wudGl0bGUnLCAnY2hhbmdlcy5jb2wudHlwZScsICdjaGFuZ2VzLmNvbC5zdGF0dXMnLCAnY2hhbmdlcy5jb2wudXBkYXRlZCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7Y2hhbmdlcy5tYXAoKGNoYW5nZSkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e2NoYW5nZS5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2NoYW5nZS50aXRsZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoY2hhbmdlLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgPyAnIzRlYzliMCcgOiAnIzU2OWNkNicpfT57Y2hhbmdlLnN0YXR1c308L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Zm9ybWF0VGltZShjaGFuZ2UudXBkYXRlZEF0KX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogJ1x1NTIyMFx1OTY2NFx1OEZEOVx1NEUyQVx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1RkYxRicsIG1lc3NhZ2U6ICdcdTMwMEMnICsgY2hhbmdlLnRpdGxlICsgJ1x1MzAwRFx1NTNDQVx1NTE3Nlx1NTE2OFx1OTBFOFx1NjI2N1x1ODg0Q1x1OEJCMFx1NUY1NVx1MzAwMVx1OEJBMVx1NTIxMlx1MzAwMVx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1NUMwNlx1ODhBQlx1NkMzOFx1NEU0NVx1NTIyMFx1OTY2NFx1MzAwMicsIGRhbmdlcjogdHJ1ZSwgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdkZWxldGVDaGFuZ2UnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY2hhbmdlcy9kZWxldGUnLCB7IGlkOiBjaGFuZ2UuaWQgfSkgfSB9KSB9fT5cdTI3MTU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgPC8+XG4gIClcblxuICAvLyBcdTI1MDBcdTI1MDAgXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHU5ODc1XHU3QjdFXHVGRjFBXHU5ODc1XHU5NzYyXHU3NkY0XHU2M0E1XHU1MjFCXHU1RUZBXHU1RTc2XHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHVGRjBDXHU4MDRBXHU1OTI5XHU1M0VBXHU2NjJGXHU1M0U2XHU0RTAwXHU3OUNEXHU1MTY1XHU1M0UzIFx1MjUwMFx1MjUwMFxuICBjb25zdCBleGVjdXRpb25UYWIgPSAoXG4gICAgPD5cbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnMTBweCcsIHBhZGRpbmc6ICc3cHggMTJweCcsIGJvcmRlclJhZGl1czogJzhweCcsIGJhY2tncm91bmQ6ICdyZ2JhKDM3LDk5LDIzNSwwLjA2KScsIGJvcmRlcjogJzFweCBzb2xpZCByZ2JhKDM3LDk5LDIzNSwwLjIpJywgZm9udFNpemU6ICcxMXB4JyB9fT5cbiAgICAgICAgPGI+XHUyNDYwIHt0KCdleGVjLmZsb3dDcmVhdGUnKX08L2I+PHNwYW4+XHUyMTkyPC9zcGFuPlxuICAgICAgICA8Yj5cdTI0NjEge3QoJ2V4ZWMuZmxvd09yY2hlc3RyYXRlJyl9PC9iPjxzcGFuPlx1MjE5Mjwvc3Bhbj5cbiAgICAgICAgPGI+XHUyNDYyIHt0KCdleGVjLmZsb3dSdW4nKX08L2I+PHNwYW4+XHUyMTkyPC9zcGFuPlxuICAgICAgICA8Yj5cdTI0NjMge3QoJ2V4ZWMuZmxvd01lbW9yeScpfTwvYj5cbiAgICAgIDwvZGl2PlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2V4ZWMuY3JlYXRlJyl9PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybUlubGluZX0+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgZmxleDogMSwgbWluV2lkdGg6IDIwMCB9fSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtVGl0bGUnKX0gdmFsdWU9e2V4ZWNUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEV4ZWNUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycgfX0gdmFsdWU9e2V4ZWNNb2RlbH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEV4ZWNNb2RlbChlLnRhcmdldC52YWx1ZSkgfX0gdGl0bGU9e3QoJ3BsYW4ubW9kZWxEZWZhdWx0Jyl9PlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt0KCdleGVjLm1vZGVsRGVmYXVsdCcpfTwvb3B0aW9uPlxuICAgICAgICAgICAgeyhtb2RlbE9wdGlvbnMgPz8gW10pLm1hcCgob3B0aW9uKSA9PiA8b3B0aW9uIGtleT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfSB2YWx1ZT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfT57b3B0aW9uLnByb3ZpZGVyfS97b3B0aW9uLmlkfTwvb3B0aW9uPil9XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezN9IHBsYWNlaG9sZGVyPXt0KCdleGVjLmZvcm1EZXNjJyl9IHZhbHVlPXtleGVjRGVzY30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEV4ZWNEZXNjKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5hY3Rpb25Sb3d9PlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgZXhlY1RpdGxlLnRyaW0oKSA9PT0gJycgfHwgZXhlY0Rlc2MudHJpbSgpID09PSAnJ30gb25DbGljaz17KCkgPT4geyB2b2lkIHN0YXJ0UnVuKCkgfX0+XG4gICAgICAgICAgICAgIHtidXN5ID09PSAnc3RhcnRSdW4nID8gdCgnZXhlYy5wbGFubmluZycpIDogdCgnZXhlYy5zdGFydCcpfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnZXhlYy5jcmVhdGVIaW50Jyl9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FyZD5cbiAgICAgIHtyZXN1bHRQYW5lbH1cbiAgICAgIHtwbGFuQ29uZmlybSAhPT0gbnVsbCAmJiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdwbGFuLnRpdGxlJyl9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+e3QoJ3BsYW4uaGludCcpfTwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XG4gICAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHI+e1sncGxhbi5jb2wuc3RlcCcsICdwbGFuLmNvbC5yb2xlJywgJ3BsYW4uY29sLm1vZGVsJywgJ3BsYW4uY29sLnBvbGljeScsICdwbGFuLmNvbC5lbmFibGVkJ10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIHtwbGFuQ29uZmlybS5zdGVwcy5tYXAoKHN0ZXAsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8dHIga2V5PXtzdGVwLmlkfSBzdHlsZT17eyBvcGFjaXR5OiBzdGVwLmVuYWJsZWQgPyAxIDogMC40NSB9fT5cbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgbWluV2lkdGg6IDIyMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCB9fT57aW5kZXggKyAxfS4ge3N0ZXAudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57c3RlcC5kZXNjcmlwdGlvbi5zbGljZSgwLCAxMjApfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIHtzdGVwLnRhcmdldEZpbGVzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScgfX0+e3N0ZXAudGFyZ2V0RmlsZXMuam9pbignLCAnKS5zbGljZSgwLCAxMjApfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggNnB4JyB9fSB2YWx1ZT17c3RlcC5yb2xlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBsYW5Db25maXJtKHsgLi4ucGxhbkNvbmZpcm0sIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcy5tYXAoKGl0ZW0sIGkpID0+IGkgPT09IGluZGV4ID8geyAuLi5pdGVtLCByb2xlOiBlLnRhcmdldC52YWx1ZSB9IDogaXRlbSkgfSkgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7WydhbmFseXNpcycsICdwbGFubmluZycsICdjb2RpbmcnLCAnb3BzJywgJ3ZlcmlmaWNhdGlvbiddLm1hcCgocm9sZSkgPT4gPG9wdGlvbiBrZXk9e3JvbGV9IHZhbHVlPXtyb2xlfT57Uk9MRV9MQUJFTFNbcm9sZV0gPz8gcm9sZX08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDZweCcgfX0gdmFsdWU9e3N0ZXAubW9kZWxQcm92aWRlciArICcvJyArIHN0ZXAubW9kZWxJZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbcHJvdmlkZXIsIG1vZGVsXSA9IGUudGFyZ2V0LnZhbHVlLnNwbGl0KCcvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxhbkNvbmZpcm0oeyAuLi5wbGFuQ29uZmlybSwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzLm1hcCgoaXRlbSwgaSkgPT4gaSA9PT0gaW5kZXggPyB7IC4uLml0ZW0sIG1vZGVsUHJvdmlkZXI6IHByb3ZpZGVyID8/ICcnLCBtb2RlbElkOiBtb2RlbCA/PyAnJyB9IDogaXRlbSkgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIi9cIj57dCgncGxhbi5tb2RlbERlZmF1bHQnKX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHttb2RlbE9wdGlvbnMubWFwKChvcHRpb24pID0+IDxvcHRpb24ga2V5PXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9IHZhbHVlPXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9PntvcHRpb24ucHJvdmlkZXJ9L3tvcHRpb24uaWR9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJywgcGFkZGluZzogJzNweCA2cHgnIH19IHZhbHVlPXtzdGVwLmZhaWx1cmVQb2xpY3l9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0UGxhbkNvbmZpcm0oeyAuLi5wbGFuQ29uZmlybSwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzLm1hcCgoaXRlbSwgaSkgPT4gaSA9PT0gaW5kZXggPyB7IC4uLml0ZW0sIGZhaWx1cmVQb2xpY3k6IGUudGFyZ2V0LnZhbHVlIH0gOiBpdGVtKSB9KSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhQT0xJQ1lfTEFCRUxTKS5tYXAoKFt2YWx1ZSwgbGFiZWxdKSA9PiA8b3B0aW9uIGtleT17dmFsdWV9IHZhbHVlPXt2YWx1ZX0+e2xhYmVsfTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17c3RlcC5lbmFibGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBsYW5Db25maXJtKHsgLi4ucGxhbkNvbmZpcm0sIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcy5tYXAoKGl0ZW0sIGkpID0+IGkgPT09IGluZGV4ID8geyAuLi5pdGVtLCBlbmFibGVkOiBlLnRhcmdldC5jaGVja2VkIH0gOiBpdGVtKSB9KSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIG1hcmdpblRvcDogJzEwcHgnIH19PlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e3BsYW5CdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbGF1bmNoUGxhbih0cnVlKSB9fT57cGxhbkJ1c3kgPyAnXHUyMDI2JyA6IHQoJ3BsYW4ubGF1bmNoRWRpdGVkJyl9PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17cGxhbkJ1c3l9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsYXVuY2hQbGFuKGZhbHNlKSB9fT57dCgncGxhbi5sYXVuY2hEaXJlY3QnKX08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtwbGFuQnVzeX0gb25DbGljaz17KCkgPT4geyBzZXRQbGFuQ29uZmlybShudWxsKSB9fT57dCgncGxhbi5kaXNjYXJkJyl9PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG4gICAgICA8Q2FyZD5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ2V4ZWMuYXR0ZW1wdHMnKX08L3NwYW4+e1N0cmluZyhzdGF0ZT8uYXR0ZW1wdHNDb3VudCA/PyAwKX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7cnVucy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc3RhdGUubm9SdW5zJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57WydleGVjLmNvbC5jaGFuZ2UnLCAnZXhlYy5jb2wuc3RlcHMnLCAnZXhlYy5jb2wuc3RhdHVzJywgJ2V4ZWMuY29sLnN0YXJ0ZWQnLCAnZXhlYy5jb2wuY29zdCcsICdleGVjLmNvbC5kZXRhaWwnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3J1bnMubWFwKChydW4pID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtydW4uaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PnsoY2hhbmdlcy5maW5kKChjaGFuZ2UpID0+IGNoYW5nZS5pZCA9PT0gcnVuLmNoYW5nZUlkKT8udGl0bGUpID8/IHJ1bi5jaGFuZ2VJZH08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntydW4uc3RlcHNUb3RhbCA/IChydW4uc3RlcHNEb25lID8/IDApICsgJy8nICsgcnVuLnN0ZXBzVG90YWwgOiAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHJ1bi5zdGF0dXMgPT09ICdzdWNjZWVkZWQnIHx8IHJ1bi5zdGF0dXMgPT09ICdjb21wbGV0ZWQnID8gJyM0ZWM5YjAnIDogcnVuLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgPyAnI2YxNGM0YycgOiBydW4uc3RhdHVzID09PSAncGF1c2VkJyA/ICcjZDk3NzA2JyA6ICcjZGNkY2FhJyl9PntSVU5fU1RBVFVTX0xBQkVMU1tydW4uc3RhdHVzXSA/PyBydW4uc3RhdHVzfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge3J1bi5jdXJyZW50U3RlcCAhPT0gbnVsbCAmJiBydW4uY3VycmVudFN0ZXAgIT09IHVuZGVmaW5lZCAmJiBydW4uc3RhdHVzID09PSAncnVubmluZycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1heFdpZHRoOiAxNjAsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT57cnVuLmN1cnJlbnRTdGVwfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Zm9ybWF0VGltZShydW4uc3RhcnRlZEF0KX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntydW4uY29zdFVzZCAhPT0gdW5kZWZpbmVkID8gJyQnICsgcnVuLmNvc3RVc2QudG9GaXhlZCg0KSA6ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkUnVuRGV0YWlsKHJ1bi5pZCkgfX0+e3J1bkRldGFpbD8ucnVuLmlkID09PSBydW4uaWQgPyB0KCdwbGFuLnJlZnJlc2hEZXRhaWwnKSA6IHQoJ3BsYW4udmlld0RldGFpbCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIHtydW5EZXRhaWwgIT09IG51bGwgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17dCgncGxhbi5kZXRhaWxUaXRsZScpICsgJyBcdTAwQjcgJyArIHJ1bkRldGFpbC5ydW4uY2hhbmdlVGl0bGV9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UocnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdzdWNjZWVkZWQnIHx8IHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnY29tcGxldGVkJyA/ICcjNGVjOWIwJyA6IHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnZmFpbGVkJyA/ICcjZjE0YzRjJyA6IHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAncGF1c2VkJyA/ICcjZDk3NzA2JyA6ICcjZGNkY2FhJyl9PntSVU5fU1RBVFVTX0xBQkVMU1tydW5EZXRhaWwucnVuLnN0YXR1c10gPz8gcnVuRGV0YWlsLnJ1bi5zdGF0dXN9PC9zcGFuPlxuICAgICAgICAgICAge3J1bkRldGFpbC5ydW4uZXJyb3IgIT09IG51bGwgJiYgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDEyNDJmJykgfX0+e3J1bkRldGFpbC5ydW4uZXJyb3IubWVzc2FnZX08L3NwYW4+fVxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSdW5EZXRhaWwocnVuRGV0YWlsLnJ1bi5pZCkgfX0+e3QoJ3BsYW4ucmVmcmVzaERldGFpbCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRSdW5EZXRhaWwobnVsbCkgfX0+e3QoJ3BsYW4uY2xvc2VEZXRhaWwnKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7cnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdwYXVzZWQnICYmIHJ1bkRldGFpbC5ydW4ucGF1c2VQb2ludCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc4cHggMTJweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGJhY2tncm91bmQ6ICdyZ2JhKDIxNywxMTksNiwwLjA4KScsIGJvcmRlcjogJzFweCBzb2xpZCByZ2JhKDIxNywxMTksNiwwLjM1KScsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEycHgnIH19Plx1MjNGOCB7dCgncGxhbi5wYXVzZWRCYW5uZXInKX08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57cnVuRGV0YWlsLnJ1bi5wYXVzZVBvaW50LnJlYXNvbn08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIG1hcmdpblRvcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCByZXN1bWVSdW4ocnVuRGV0YWlsLnJ1bi5pZCwgJ2NvbnRpbnVlJykgfX0+e3QoJ3BsYW4ucmVzdW1lUmV0cnknKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHJlc3VtZVJ1bihydW5EZXRhaWwucnVuLmlkLCAnc2tpcC1jdXJyZW50JykgfX0+e3QoJ3BsYW4ucmVzdW1lU2tpcCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgeyhydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgfHwgcnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdpbnRlcnJ1cHRlZCcpICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCByZXN1bWVSdW4ocnVuRGV0YWlsLnJ1bi5pZCwgJ2NvbnRpbnVlJykgfX0+e3QoJ3BsYW4ucmVzdW1lRmFpbGVkJyl9PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+e1sncGxhbi5jb2wuc3RlcCcsICdwbGFuLmNvbC5yb2xlJywgJ3BsYW4uY29sLm1vZGVsJywgJ2V4ZWMuY29sLnN0YXR1cycsICdwbGFuLmNvbC5hdHRlbXB0cycsICdleGVjLmNvbC5jb3N0J10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtydW5EZXRhaWwuc3RlcHMubWFwKChzdGVwLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3N0ZXAuaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PntpbmRleCArIDF9LiB7c3RlcC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge3N0ZXAuY2xhaW1lZE91dGNvbWUgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1heFdpZHRoOiAzMjAsIHdoaXRlU3BhY2U6ICdub3JtYWwnIH19PntzdGVwLmNsYWltZWRPdXRjb21lLnNsaWNlKDAsIDE2MCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJ3JnYmEoODYsMTU2LDIxNCwwLjI1KScpfT57Uk9MRV9MQUJFTFNbc3RlcC5yb2xlXSA/PyBzdGVwLnJvbGV9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBmb250U2l6ZTogJzExcHgnIH19PntzdGVwLm1vZGVsID8/ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShzdGVwLnZlcmlmaWVkID8gJyM0ZWM5YjAnIDogc3RlcC5zdGF0dXMgPT09ICdmYWlsZWQnID8gJyNmMTRjNGMnIDogc3RlcC5zdGF0dXMgPT09ICdza2lwcGVkJyA/ICcjOGI5NDllJyA6ICcjZGNkY2FhJyl9PntTVEVQX1NUQVRVU19MQUJFTFNbc3RlcC5zdGF0dXNdID8/IHN0ZXAuc3RhdHVzfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntTdHJpbmcoc3RlcC5hdHRlbXB0c0NvdW50KX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntzdGVwLmNvc3RVc2QgPiAwID8gJyQnICsgc3RlcC5jb3N0VXNkLnRvRml4ZWQoNCkgOiAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnLCBib3JkZXI6ICcxcHggZGFzaGVkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzhweCAxMnB4JyB9fT5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzRweCcgfX0+e3QoJ3BsYW4uY29udGV4dFRpdGxlJyl9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LnByb2plY3REaWdlc3R9XG4gICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmJyYW5jaCAhPT0gbnVsbCA/IGAgXHUwMEI3ICR7dCgncGxhbi5icmFuY2gnKX0gJHtydW5EZXRhaWwuY29udGV4dC5icmFuY2h9YCA6ICcnfVxuICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5oZWFkU2hhICE9PSBudWxsID8gYCBcdTAwQjcgSEVBRCAke3J1bkRldGFpbC5jb250ZXh0LmhlYWRTaGEuc2xpY2UoMCwgOCl9YCA6ICcnfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmluamVjdGVkTWVtb3JpZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwIH19Pnt0KCdwbGFuLmluamVjdGVkTWVtb3JpZXMnKX1cdUZGMUE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuaW5qZWN0ZWRNZW1vcmllcy5tYXAoKG1lbW9yeSkgPT4gPHNwYW4ga2V5PXttZW1vcnkuaWR9IHN0eWxlPXtzdHlsZXMuYmFkZ2UoJ3JnYmEoNzgsMjAxLDE3NiwwLjIpJyl9PnttZW1vcnkudGl0bGV9PC9zcGFuPil9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5kZWNpc2lvbkxvZy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzRweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBjb2xvcjogJ2luaGVyaXQnIH19Pnt0KCdwbGFuLmRlY2lzaW9uTG9nJyl9XHVGRjFBPC9zcGFuPlxuICAgICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmRlY2lzaW9uTG9nLnNsaWNlKC02KS5tYXAoKGVudHJ5LCBlbnRyeUluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeUluZGV4fT5cdTAwQjcgW3tlbnRyeS5raW5kfV0ge2VudHJ5LmRldGFpbH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cbiAgICAgIDxDYXJkXG4gICAgICAgIHRpdGxlPXtcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgdXNlclNlbGVjdDogJ25vbmUnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0U2NoZWRPcGVuKCFzY2hlZE9wZW4pIH19PlxuICAgICAgICAgICAge3NjaGVkT3BlbiA/ICdcdTI1QkUgJyA6ICdcdTI1QjggJ317dCgnc2NoZWQudGl0bGUnKX1cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5sYWJlbCwgbWFyZ2luTGVmdDogJzhweCcgfX0+eyhzY2hlZHVsZWREYXRhID8/IFtdKS5sZW5ndGggPiAwID8gU3RyaW5nKChzY2hlZHVsZWREYXRhID8/IFtdKS5sZW5ndGgpICsgJyBcdTRFMkEnIDogJyd9PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgfVxuICAgICAgPlxuICAgICAgICB7c2NoZWRPcGVuICYmIChcbiAgICAgICAgPD5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1JbmxpbmV9PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIGZsZXg6IDEsIG1pbldpZHRoOiAxNjAgfX0gcGxhY2Vob2xkZXI9e3QoJ3NjaGVkLmZvcm1OYW1lJyl9IHZhbHVlPXtzY2hlZE5hbWV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZE5hbWUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nIH19IHZhbHVlPXtzY2hlZFR5cGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZFR5cGUoZS50YXJnZXQudmFsdWUpIH19PlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJldmlld1wiPnt0KCdzY2hlZC50eXBlUmV2aWV3Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic3VtbWFyeVwiPnt0KCdzY2hlZC50eXBlU3VtbWFyeScpfTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJ1blwiPnt0KCdzY2hlZC50eXBlUnVuJyl9PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic3luY1wiPnt0KCdzY2hlZC50eXBlU3luYycpfTwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIHdpZHRoOiAxMjAgfX0gcGxhY2Vob2xkZXI9e3QoJ3NjaGVkLmZvcm1JbnRlcnZhbCcpfSB2YWx1ZT17c2NoZWRJbnRlcnZhbH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkSW50ZXJ2YWwoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAge3NjaGVkVHlwZSA9PT0gJ3J1bicgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdleGVjLmZvcm1UaXRsZScpfSB2YWx1ZT17c2NoZWRUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSByb3dzPXsyfSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtRGVzYycpfSB2YWx1ZT17c2NoZWREZXNjfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWREZXNjKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17c2NoZWROYW1lLnRyaW0oKSA9PT0gJyd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhZGRTY2hlZHVsZWQoKSB9fT57dCgnc2NoZWQuYWRkJyl9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Cb3R0b206ICc4cHgnIH19Pnt0KCdzY2hlZC5oaW50Jyl9PC9kaXY+XG4gICAgICAgIHsoc2NoZWR1bGVkRGF0YSA/PyBbXSkubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3NjaGVkLmVtcHR5Jyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57WydzY2hlZC5jb2wubmFtZScsICdzY2hlZC5jb2wudHlwZScsICdzY2hlZC5jb2wuaW50ZXJ2YWwnLCAnc2NoZWQuY29sLm5leHQnLCAnc2NoZWQuY29sLmxhc3RSZXN1bHQnLCAnc2NoZWQuY29sLmFjdGlvbnMnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgeyhzY2hlZHVsZWREYXRhID8/IFtdKS5tYXAoKHRhc2spID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXt0YXNrLmlkfSBzdHlsZT17eyBvcGFjaXR5OiB0YXNrLmVuYWJsZWQgPyAxIDogMC40NSB9fT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57dGFzay5uYW1lfXt0YXNrLnRpdGxlICE9PSAnJyA/IDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Plx1RkYwOHt0YXNrLnRpdGxlfVx1RkYwOTwvc3Bhbj4gOiBudWxsfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSh0YXNrLnR5cGUgPT09ICdyZXZpZXcnID8gJyM1NjljZDYnIDogdGFzay50eXBlID09PSAnc3VtbWFyeScgPyAnIzRlYzliMCcgOiAnI2Q3YmE3ZCcpfT57dGFzay50eXBlID09PSAncmV2aWV3JyA/IHQoJ3NjaGVkLnR5cGVSZXZpZXcnKSA6IHRhc2sudHlwZSA9PT0gJ3N1bW1hcnknID8gdCgnc2NoZWQudHlwZVN1bW1hcnknKSA6IHQoJ3NjaGVkLnR5cGVSdW4nKX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57dGFzay5pbnRlcnZhbE1pbnV0ZXMgPj0gMTQ0MCA/IE1hdGgucm91bmQodGFzay5pbnRlcnZhbE1pbnV0ZXMgLyAxNDQwICogMTApIC8gMTAgKyB0KCdzY2hlZC5kYXknKSA6IHRhc2suaW50ZXJ2YWxNaW51dGVzID49IDYwID8gTWF0aC5yb3VuZCh0YXNrLmludGVydmFsTWludXRlcyAvIDYwICogMTApIC8gMTAgKyB0KCdzY2hlZC5ob3VyJykgOiB0YXNrLmludGVydmFsTWludXRlcyArIHQoJ3NjaGVkLm1pbnV0ZScpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3Rhc2suZW5hYmxlZCA/IGZvcm1hdFRpbWUodGFzay5uZXh0RHVlQXQpIDogJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXhXaWR0aDogMjIwLCB3aGl0ZVNwYWNlOiAnbm9ybWFsJyB9fT57dGFzay5sYXN0UmVzdWx0IHx8ICh0YXNrLmxhc3RSdW5BdCAhPT0gbnVsbCA/IGZvcm1hdFRpbWUodGFzay5sYXN0UnVuQXQpIDogJ1x1MjAxNCcpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzY2hlZHVsZWRBY3Rpb24oJ3VwZGF0ZScsIHsgaWQ6IHRhc2suaWQsIGVuYWJsZWQ6ICF0YXNrLmVuYWJsZWQgfSkgfX0+e3Rhc2suZW5hYmxlZCA/IHQoJ3NjaGVkLmRpc2FibGUnKSA6IHQoJ3NjaGVkLmVuYWJsZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzY2hlZHVsZWRBY3Rpb24oJ3J1bicsIHsgaWQ6IHRhc2suaWQgfSkgfX0+e3QoJ3NjaGVkLnJ1bk5vdycpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyh7IHRpdGxlOiAnXHU1MjIwXHU5NjY0XHU4RkQ5XHU0RTJBXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHVGRjFGJywgbWVzc2FnZTogJ1x1MzAwQycgKyB0YXNrLm5hbWUgKyAnXHUzMDBEXHU1QzA2XHU4OEFCXHU2QzM4XHU0RTQ1XHU1MjIwXHU5NjY0XHUzMDAyJywgZGFuZ2VyOiB0cnVlLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBzY2hlZHVsZWRBY3Rpb24oJ2RlbGV0ZScsIHsgaWQ6IHRhc2suaWQgfSkgfSB9KSB9fT5cdTI3MTU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICA8Lz5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICA8Lz5cbiAgKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzZcdTk4NzVcdTdCN0UgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IG5vdGVzVGFiID0gKFxuICAgIDw+XG4gICAgICB7LyogXHUyNTAwXHUyNTAwIFx1N0IxNFx1OEJCMFx1RkYxQVx1NTM2MVx1NzI0N1x1NUYwRlx1OTYwNVx1OEJGQiArIFx1NTkxQVx1ODg0Q1x1N0YxNlx1OEY5MSArIFx1NjQxQ1x1N0QyMiArIEFJIFx1NjAzQlx1N0VEMyBcdTI1MDBcdTI1MDAgKi99XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnbm90ZXMudGl0bGUnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIHdpZHRoOiAyMjAgfX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0KCdub3Rlcy5zZWFyY2gnKX1cbiAgICAgICAgICAgIHZhbHVlPXtub3RlU2VhcmNofVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVTZWFyY2goZS50YXJnZXQudmFsdWUpIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsYXN0U3VtbWFyeSA9IG5vdGVzLmZpbHRlcigobm90ZSkgPT4gbm90ZS5zaGEgPT09ICdzdW1tYXJ5Jykuc29ydCgoYSwgYikgPT4gYi5jcmVhdGVkQXQgLSBhLmNyZWF0ZWRBdClbMF1cbiAgICAgICAgICAgIGNvbnN0IG5ld0NvbW1pdHMgPSBsYXN0U3VtbWFyeSA9PT0gdW5kZWZpbmVkID8gLTFcbiAgICAgICAgICAgICAgOiAoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLmZpbHRlcigoY29tbWl0KSA9PiBjb21taXQuZGF0ZSA+IGxhc3RTdW1tYXJ5LmNyZWF0ZWRBdCkubGVuZ3RoXG4gICAgICAgICAgICBpZiAobmV3Q29tbWl0cyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdub3Rlcy5kaWdlc3ROZXZlcicpfTwvc3Bhbj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXdDb21taXRzID09PSAwKSByZXR1cm4gbnVsbFxuICAgICAgICAgICAgcmV0dXJuIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT57dCgnbm90ZXMuZGlnZXN0UGVuZGluZycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhuZXdDb21taXRzKSl9PC9zcGFuPlxuICAgICAgICAgIH0pKCl9XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e2FpU3VtbWFyaXppbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhaVN1bW1hcml6ZSgpIH19PlxuICAgICAgICAgICAge2FpU3VtbWFyaXppbmcgPyB0KCdub3Rlcy5haVN1bW1hcnlSdW4nKSA6ICdcdTI3MjggJyArIHQoJ25vdGVzLmFpU3VtbWFyeScpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuZm9ybVJvdywgYm9yZGVyOiAnMXB4IGRhc2hlZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsIGJvcmRlclJhZGl1czogJzhweCcsIHBhZGRpbmc6ICcxMHB4JyB9fT5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ25vdGVzLmZvcm1UaXRsZScpfSB2YWx1ZT17bm90ZVRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQgfX0gcGxhY2Vob2xkZXI9e3QoJ25vdGVzLnRhZ3NIaW50Jyl9IHZhbHVlPXtub3RlVGFnc30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVUYWdzKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX1cbiAgICAgICAgICAgIHJvd3M9ezZ9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17dCgnbm90ZXMuY29udGVudEhpbnQnKX1cbiAgICAgICAgICAgIHZhbHVlPXtub3RlQ29udGVudH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXROb3RlQ29udGVudChlLnRhcmdldC52YWx1ZSkgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICB7dCgnbm90ZXMuYm91bmRUbycpfToge3NlbGVjdGVkVGFyZ2V0c1swXSA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiBzZWxlY3RlZFRhcmdldHNbMF0uc2xpY2UoMCwgOCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17bm90ZVRpdGxlLnRyaW0oKSA9PT0gJycgfHwgbm90ZUNvbnRlbnQudHJpbSgpID09PSAnJ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFkZE5vdGUoKSB9fT57dCgnbm90ZXMuYWRkJyl9PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBrZXl3b3JkID0gbm90ZVNlYXJjaC50cmltKCkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgIGNvbnN0IG1hdGNoZWQgPSBrZXl3b3JkID09PSAnJ1xuICAgICAgICAgICAgPyBub3Rlc1xuICAgICAgICAgICAgOiBub3Rlcy5maWx0ZXIoKG5vdGUpID0+IChub3RlLnRpdGxlICsgJyAnICsgbm90ZS5jb250ZW50ICsgJyAnICsgKG5vdGUudGFncyA/PyBbXSkuam9pbignICcpKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGtleXdvcmQpKVxuICAgICAgICAgIC8vIFx1N0Y2RVx1OTg3Nlx1NEYxOFx1NTE0OFx1RkYwQ1x1NTE3Nlx1NEY1OVx1NjMwOVx1NTIxQlx1NUVGQVx1NjVGNlx1OTVGNFx1NTAxMlx1NUU4Rlx1MzAwMlxuICAgICAgICAgIGNvbnN0IHZpc2libGUgPSBbLi4ubWF0Y2hlZF0uc29ydCgobGVmdCwgcmlnaHQpID0+XG4gICAgICAgICAgICBOdW1iZXIocmlnaHQucGlubmVkID09PSB0cnVlKSAtIE51bWJlcihsZWZ0LnBpbm5lZCA9PT0gdHJ1ZSkgfHwgcmlnaHQuY3JlYXRlZEF0IC0gbGVmdC5jcmVhdGVkQXQpXG4gICAgICAgICAgaWYgKHZpc2libGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57bm90ZXMubGVuZ3RoID09PSAwID8gdCgnbm90ZXMuZW1wdHknKSA6IHQoJ25vdGVzLmVtcHR5U2VhcmNoJyl9PC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB2aXNpYmxlLm1hcCgobm90ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNTdW1tYXJ5ID0gbm90ZS5zaGEgPT09ICdzdW1tYXJ5J1xuICAgICAgICAgICAgY29uc3QgZWRpdGluZyA9IGVkaXRpbmdOb3RlICE9PSBudWxsICYmIGVkaXRpbmdOb3RlLmlkID09PSBub3RlLmlkID8gZWRpdGluZ05vdGUgOiBudWxsXG4gICAgICAgICAgICBjb25zdCBleHBhbmRlZCA9IG5vdGVFeHBhbmRlZFtub3RlLmlkXSA9PT0gdHJ1ZVxuICAgICAgICAgICAgY29uc3QgbG9uZyA9IG5vdGUuY29udGVudC5sZW5ndGggPiAyNjAgfHwgbm90ZS5jb250ZW50LnNwbGl0KCdcXG4nKS5sZW5ndGggPiA2XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtub3RlLmlkfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAuLi5zdHlsZXMubm90ZUNhcmQsXG4gICAgICAgICAgICAgICAgICAuLi4oaXNTdW1tYXJ5ID8geyBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wNCknLCBib3JkZXJDb2xvcjogJ3JnYmEoMzcsOTksMjM1LDAuMyknIH0gOiB7fSksXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtlZGl0aW5nICE9PSBudWxsID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gdmFsdWU9e2VkaXRpbmcudGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFZGl0aW5nTm90ZSh7IC4uLmVkaXRpbmcsIHRpdGxlOiBlLnRhcmdldC52YWx1ZSB9KSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ25vdGVzLnRhZ3NIaW50Jyl9IHZhbHVlPXtlZGl0aW5nLnRhZ3N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFZGl0aW5nTm90ZSh7IC4uLmVkaXRpbmcsIHRhZ3M6IGUudGFyZ2V0LnZhbHVlIH0pIH19IC8+XG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSByb3dzPXsxMH0gdmFsdWU9e2VkaXRpbmcuY29udGVudH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgLi4uZWRpdGluZywgY29udGVudDogZS50YXJnZXQudmFsdWUgfSkgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnNHB4IDEycHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzYXZlTm90ZUVkaXQoKSB9fT57dCgnbm90ZXMuc2F2ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzRweCAxMnB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldEVkaXRpbmdOb3RlKG51bGwpIH19Pnt0KCdub3Rlcy5jYW5jZWwnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVRleHR9Pntpc1N1bW1hcnkgPyAnXHVEODNEXHVEQ0Q2ICcgOiAnJ317bm90ZS5waW5uZWQgPT09IHRydWUgPyAnXHVEODNEXHVEQ0NDICcgOiAnJ317bm90ZS50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFNocmluazogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogbm90ZS5waW5uZWQgPT09IHRydWUgPyAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyA6IHVuZGVmaW5lZCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17bm90ZS5waW5uZWQgPT09IHRydWUgPyB0KCdub3Rlcy51bnBpbicpIDogdCgnbm90ZXMucGluJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCB0b2dnbGVOb3RlUGluKG5vdGUpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XHVEODNEXHVEQ0NDPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSB0aXRsZT17dCgnbm90ZXMuY29weU1kSGludCcpfSBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1kID0gYCMgJHtub3RlLnRpdGxlfVxcblxcbiR7bm90ZS5jb250ZW50fVxcbmBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCBuYXZpZ2F0b3IuY2xpcGJvYXJkPy53cml0ZVRleHQobWQpLnRoZW4oKCkgPT4gc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgJyArIHQoJ25vdGVzLmNvcHlNZERvbmUnKSkpLmNhdGNoKCgpID0+IHNldEFjdGlvblJlc3VsdCgnXHUyNzE3IFx1NTkwRFx1NTIzNlx1NTkzMVx1OEQyNScpKVxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHVEODNEXHVEQ0NCIHt0KCdub3Rlcy5jb3B5TWQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IHRpdGxlPXt0KCdub3Rlcy5leHBvcnRNZEhpbnQnKX0gb25DbGljaz17KCkgPT4geyBleHBvcnROb3RlKG5vdGUpIH19Plx1RDgzRFx1RENCRSB7dCgnbm90ZXMuZXhwb3J0TWQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IHRpdGxlPXt0KCdub3Rlcy50b01lbW9yeUhpbnQnKX0gb25DbGljaz17KCkgPT4geyBzZXRNZW1vcnlUaXRsZShub3RlLnRpdGxlKTsgc2V0TWVtb3J5Q29udGVudChub3RlLmNvbnRlbnQpOyBzZXRBY3Rpb25SZXN1bHQodCgnbm90ZXMudG9NZW1vcnlEb25lJykpIH19Plx1RDgzRVx1RERFMCB7dCgnbm90ZXMudG9NZW1vcnknKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0RWRpdGluZ05vdGUoeyBpZDogbm90ZS5pZCwgdGl0bGU6IG5vdGUudGl0bGUsIGNvbnRlbnQ6IG5vdGUuY29udGVudCwgdGFnczogKG5vdGUudGFncyA/PyBbXSkuam9pbignLCAnKSB9KSB9fT57dCgnbm90ZXMuZWRpdCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6ICdcdTUyMjBcdTk2NjRcdThGRDlcdTY3NjFcdTdCMTRcdThCQjBcdUZGMUYnLCBtZXNzYWdlOiAnXHUzMDBDJyArIG5vdGUudGl0bGUgKyAnXHUzMDBEXHU1QzA2XHU4OEFCXHU2QzM4XHU0RTQ1XHU1MjIwXHU5NjY0XHVGRjBDXHU0RTBEXHU1M0VGXHU2MDYyXHU1OTBEXHUzMDAyJywgZGFuZ2VyOiB0cnVlLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCByZW1vdmVOb3RlKG5vdGUuaWQpIH0gfSkgfX0+XHUyNzE1PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7aXNTdW1tYXJ5XG4gICAgICAgICAgICAgICAgICAgICAgPyA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ29udGVudCwgLi4uKGxvbmcgJiYgIWV4cGFuZGVkID8gc3R5bGVzLm5vdGVDbGFtcCA6IHt9KSB9fT57cmVuZGVyU3RydWN0dXJlZENvbnRlbnQobm90ZS5jb250ZW50KX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA6IDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCAuLi4obG9uZyAmJiAhZXhwYW5kZWQgPyBzdHlsZXMubm90ZUNsYW1wIDoge30pIH19Pntub3RlLmNvbnRlbnR9PC9kaXY+fVxuICAgICAgICAgICAgICAgICAgICB7bG9uZyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmxpbmtCdG59IG9uQ2xpY2s9eygpID0+IHsgc2V0Tm90ZUV4cGFuZGVkKHsgLi4ubm90ZUV4cGFuZGVkLCBbbm90ZS5pZF06ICFleHBhbmRlZCB9KSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtleHBhbmRlZCA/IHQoJ25vdGVzLmNvbGxhcHNlJykgOiB0KCdub3Rlcy5leHBhbmQnKX1cdUZGMDh7bm90ZS5jb250ZW50Lmxlbmd0aH0gXHU1QjU3XHVGRjA5XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHsobm90ZS50YWdzID8/IFtdKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luVG9wOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsobm90ZS50YWdzID8/IFtdKS5tYXAoKHRhZykgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0YWd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKCcjMjU2M2ViJyksIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXI6ICdub25lJywgcGFkZGluZzogJzFweCA4cHgnLCBib3JkZXJSYWRpdXM6ICc5OTlweCcsIGZvbnRTaXplOiAnMTBweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldE5vdGVTZWFyY2godGFnKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+I3t0YWd9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVNZXRhfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bmV3IERhdGUobm90ZS5jcmVhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHtub3RlLnVwZGF0ZWRBdCAhPT0gdW5kZWZpbmVkICYmIG5vdGUudXBkYXRlZEF0ID4gbm90ZS5jcmVhdGVkQXQgKyAxMDAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlx1RkYwOHt0KCdub3Rlcy5lZGl0ZWRBdCcpfSB7bmV3IERhdGUobm90ZS51cGRhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCl9XHVGRjA5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAge2lzU3VtbWFyeSAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9Pnt0KCdub3Rlcy5zdW1tYXJ5VGFnJyl9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICB7bm90ZS5zaGEgIT09IHVuZGVmaW5lZCAmJiBub3RlLnNoYSAhPT0gJ3N1bW1hcnknICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e25vdGUuc2hhID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IG5vdGUuc2hhLnNsaWNlKDAsIDgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pKCl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnbWVtb3J5LnpvbmVUaXRsZScpICsgKHByb2plY3QgIT09IG51bGwgPyAnIFx1MDBCNyAnICsgcHJvamVjdC5uYW1lIDogJycpfT5cbiAgICAgICAgey8qIFx1NTQwQ1x1NkI2NVx1NzJCNlx1NjAwMVx1Njc2MVx1RkYxQVx1NTdGQVx1N0VCRiArIFx1ODQzRFx1NTQwRVx1NjNEMFx1NEVBNFx1NjU3MCArIFx1NTQwQ1x1NkI2NVx1NjMwOVx1OTRBRSArIFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QSAqL31cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICc4cHgnLCBwYWRkaW5nOiAnNnB4IDEwcHgnLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEpKScsIGJvcmRlclJhZGl1czogJzhweCcgfX0+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JyB9fT5cdUQ4M0RcdUREMDQge3QoJ21lbW9yeS5zeW5jQmFzZWxpbmUnKX1cdUZGMUE8Yj57bWVtb3JpZXNEYXRhPy5iYXNlbGluZT8uc2hhICE9IG51bGwgPyBtZW1vcmllc0RhdGEuYmFzZWxpbmUuc2hhLnNsaWNlKDAsIDgpIDogdCgnbWVtb3J5LnN5bmNOb25lJyl9PC9iPjwvc3Bhbj5cbiAgICAgICAgICB7bWVtb3JpZXNEYXRhPy5icmFuY2ggIT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNTY5Y2Q2Jyl9PnttZW1vcmllc0RhdGEuYnJhbmNofTwvc3Bhbj59XG4gICAgICAgICAgeyhtZW1vcmllc0RhdGE/LmJlaGluZENvdW50ID8/IDApID4gMCAmJiAoXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSB9fT57dCgnbWVtb3J5LmJlaGluZCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhtZW1vcmllc0RhdGE/LmJlaGluZENvdW50ID8/IDApKX08L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IGRpc2FibGVkPXttZW1vcnlTeW5jaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc3luY01lbW9yaWVzKCkgfX0+XG4gICAgICAgICAgICB7bWVtb3J5U3luY2luZyA/IHQoJ21lbW9yeS5zeW5jaW5nJykgOiAnXHVEODNEXHVERDA0ICcgKyB0KCdtZW1vcnkuc3luYycpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3N5bmNSZXBvcnQgIT09IG51bGwgJiYgKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcsIHBhZGRpbmc6ICc4cHggMTJweCcsIGJvcmRlclJhZGl1czogJzhweCcsIGJhY2tncm91bmQ6IHN5bmNSZXBvcnQub2sgPT09IGZhbHNlID8gJ3JnYmEoMjA5LDM2LDQ3LDAuMDYpJyA6ICdyZ2JhKDc4LDIwMSwxNzYsMC4wNiknLCBib3JkZXI6ICcxcHggc29saWQgJyArIChzeW5jUmVwb3J0Lm9rID09PSBmYWxzZSA/ICdyZ2JhKDIwOSwzNiw0NywwLjMpJyA6ICdyZ2JhKDc4LDIwMSwxNzYsMC4zKScpIH19PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+e3N5bmNSZXBvcnQub2sgPT09IGZhbHNlID8gJ1x1MjcxNyAnICsgdCgnbWVtb3J5LnN5bmNGYWlsZWQnKSA6ICdcdTI3MTMgJyArIChzeW5jUmVwb3J0LnZlcmRpY3QgPz8gJycpfTwvZGl2PlxuICAgICAgICAgICAge3N5bmNSZXBvcnQub2sgIT09IGZhbHNlICYmIChzeW5jUmVwb3J0LnN0YWxlUHJvcG9zYWxzID8/IFtdKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwIH19Pnt0KCdtZW1vcnkuc3RhbGVUaXRsZScpfTwvZGl2PlxuICAgICAgICAgICAgICAgIHsoc3luY1JlcG9ydC5zdGFsZVByb3Bvc2FscyA/PyBbXSkubWFwKChwcm9wb3NhbCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e3Byb3Bvc2FsLmlkfSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19Pntwcm9wb3NhbC50aXRsZX0gXHUyMDE0XHUyMDE0IHtwcm9wb3NhbC5yZWFzb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcxcHggOHB4JywgZm9udFNpemU6ICcxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYXBwbHlTeW5jKFtwcm9wb3NhbC5pZF0sICdtYXJrLXN0YWxlJykgfX0+e3QoJ21lbW9yeS5tYXJrU3RhbGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMXB4IDhweCcsIGZvbnRTaXplOiAnMTBweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGFwcGx5U3luYyhbcHJvcG9zYWwuaWRdLCAnYXJjaGl2ZScpIH19Pnt0KCdtZW1vcnkuYXJjaGl2ZUJ0bicpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcxcHggOHB4JywgZm9udFNpemU6ICcxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFN5bmNSZXBvcnQoKHByZXZpb3VzKSA9PiBwcmV2aW91cyA9PT0gbnVsbCA/IG51bGwgOiB7IC4uLnByZXZpb3VzLCBzdGFsZVByb3Bvc2FsczogKHByZXZpb3VzLnN0YWxlUHJvcG9zYWxzID8/IFtdKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT09IHByb3Bvc2FsLmlkKSB9KSB9fT57dCgnbWVtb3J5LmtlZXBBY3RpdmUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7c3luY1JlcG9ydC5vayAhPT0gZmFsc2UgJiYgKHN5bmNSZXBvcnQubmV3Q2FuZGlkYXRlcyA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JywgZm9udFNpemU6ICcxMXB4JyB9fT5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+e3QoJ21lbW9yeS5uZXdDYW5kaWRhdGVzJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIHsoc3luY1JlcG9ydC5uZXdDYW5kaWRhdGVzID8/IFtdKS5tYXAoKGNhbmRpZGF0ZSwgaW5kZXgpID0+IDxkaXYga2V5PXtpbmRleH0+XHVGRjBCIFt7Y2FuZGlkYXRlLnR5cGV9XSB7Y2FuZGlkYXRlLnRpdGxlfTwvZGl2Pil9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmxpbmtCdG4sIG1hcmdpblRvcDogJzRweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRTeW5jUmVwb3J0KG51bGwpIH19Pnt0KCdtZW1vcnkuY2xvc2VSZXBvcnQnKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgey8qIFx1NjI0Qlx1NTJBOFx1NkRGQlx1NTJBMFx1RkYxQVx1NjgwN1x1OTg5OCAvIFx1N0M3Qlx1NTc4QiAvIFx1NEY1Q1x1NzUyOFx1NTdERiAvIFx1NTE4NVx1NUJCOSAqL31cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnZm9ybS5tZW1vcnlUaXRsZScpfSB2YWx1ZT17bWVtb3J5VGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRNZW1vcnlUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycgfX0gdmFsdWU9e21lbW9yeVR5cGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRNZW1vcnlUeXBlKGUudGFyZ2V0LnZhbHVlKSB9fT5cbiAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhNRU1PUllfVFlQRV9MQUJFTFMpLm1hcCgoW3ZhbHVlLCBsYWJlbF0pID0+IDxvcHRpb24ga2V5PXt2YWx1ZX0gdmFsdWU9e3ZhbHVlfT57bGFiZWx9PC9vcHRpb24+KX1cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycgfX0gdmFsdWU9e21lbW9yeVNjb3BlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0TWVtb3J5U2NvcGUoZS50YXJnZXQudmFsdWUgYXMgJ3Byb2plY3QnIHwgJ2JyYW5jaCcpIH19PlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInByb2plY3RcIj57dCgnbWVtb3J5LnNjb3BlUHJvamVjdCcpfTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJyYW5jaFwiPnt0KCdtZW1vcnkuc2NvcGVCcmFuY2gnKX08L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcm93cz17M30gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0ubWVtb3J5Q29udGVudCcpfSB2YWx1ZT17bWVtb3J5Q29udGVudH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeUNvbnRlbnQoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtidXN5ICE9PSBudWxsIHx8IG1lbW9yeVRpdGxlLnRyaW0oKSA9PT0gJycgfHwgbWVtb3J5Q29udGVudC50cmltKCkgPT09ICcnfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdyZWNvcmRNZW1vcnknLCAnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5JywgeyBtZW1vcnlUeXBlLCBzY29wZTogbWVtb3J5U2NvcGUsIHRpdGxlOiBtZW1vcnlUaXRsZS50cmltKCksIGNvbnRlbnQ6IG1lbW9yeUNvbnRlbnQudHJpbSgpIH0pLnRoZW4oYXN5bmMgKCkgPT4geyBzZXRNZW1vcnlUaXRsZSgnJyk7IHNldE1lbW9yeUNvbnRlbnQoJycpOyBhd2FpdCBsb2FkTWVtb3JpZXMoKSB9KSB9fT5cbiAgICAgICAgICAgICAge2J1c3kgPT09ICdyZWNvcmRNZW1vcnknID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ21lbW9yeS5yZWNvcmQnKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYWxsID0gbWVtb3JpZXNEYXRhPy5tZW1vcmllcyA/PyBbXVxuICAgICAgICAgIGNvbnN0IHBlbmRpbmcgPSBhbGwuZmlsdGVyKChtZW1vcnkpID0+ICFtZW1vcnkuaXNIdW1hbkNvbmZpcm1lZCAmJiBtZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJylcbiAgICAgICAgICBjb25zdCBhY3RpdmUgPSBhbGwuZmlsdGVyKChtZW1vcnkpID0+IG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnKVxuICAgICAgICAgIGNvbnN0IGdyb3VwZWQgPSBuZXcgTWFwPHN0cmluZywgTWVtb3J5RW50cnlbXT4oKVxuICAgICAgICAgIGZvciAoY29uc3QgbWVtb3J5IG9mIGFjdGl2ZSkge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IGdyb3VwZWQuZ2V0KG1lbW9yeS50eXBlKSA/PyBbXVxuICAgICAgICAgICAgbGlzdC5wdXNoKG1lbW9yeSlcbiAgICAgICAgICAgIGdyb3VwZWQuc2V0KG1lbW9yeS50eXBlLCBsaXN0KVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAge3BlbmRpbmcubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Plx1MjNGMyB7dCgnbWVtb3J5LnBlbmRpbmdRdWV1ZScpfVx1RkYwOHtTdHJpbmcocGVuZGluZy5sZW5ndGgpfVx1RkYwOTwvZGl2PlxuICAgICAgICAgICAgICAgICAge3BlbmRpbmcubWFwKChtZW1vcnkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e21lbW9yeS5pZH0gc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDYXJkLCBib3JkZXJDb2xvcjogJ3JnYmEoMzcsOTksMjM1LDAuMyknLCBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wMyknIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVRleHR9PnttZW1vcnkudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFNocmluazogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGNvbmZpcm1NZW1vcnkobWVtb3J5LmlkKS50aGVuKCgpID0+IHsgdm9pZCBsb2FkTWVtb3JpZXMoKSB9KSB9fT57dCgnbWVtb3J5LmNvbmZpcm0nKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeUFjdGlvbignc3RhdHVzJywgeyBpZDogbWVtb3J5LmlkLCBzdGF0dXM6ICdhcmNoaXZlZCcgfSkgfX0+e3QoJ21lbW9yeS5hcmNoaXZlQnRuJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZUNvbnRlbnR9PnttZW1vcnkuY29udGVudH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSgzNyw5OSwyMzUsMC4xNSknKX0+e01FTU9SWV9TT1VSQ0VfTEFCRUxTW21lbW9yeS5zb3VyY2VUYWddID8/IG1lbW9yeS5zb3VyY2VUYWd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5iYXNpc1NoYSAhPT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9PnttZW1vcnkuYmFzaXNTaGEuc2xpY2UoMCwgOCl9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge1suLi5ncm91cGVkLmVudHJpZXMoKV0ubWFwKChbdHlwZSwgaXRlbXNdKSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e3R5cGV9IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnNlY3Rpb25UaXRsZX0+e01FTU9SWV9UWVBFX0xBQkVMU1t0eXBlXSA/PyB0eXBlfVx1RkYwOHtTdHJpbmcoaXRlbXMubGVuZ3RoKX1cdUZGMDk8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHtpdGVtcy5tYXAoKG1lbW9yeSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17bWVtb3J5LmlkfSBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNhcmQsIG9wYWNpdHk6IG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnID8gMSA6IDAuNiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVUZXh0fT57bWVtb3J5LmlzSHVtYW5Db25maXJtZWQgPyAnXHUyNzA1ICcgOiAnJ317bWVtb3J5LnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAsIGZsZXhXcmFwOiAnd3JhcCcsIGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IW1lbW9yeS5pc0h1bWFuQ29uZmlybWVkICYmIG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgY29uZmlybU1lbW9yeShtZW1vcnkuaWQpLnRoZW4oKCkgPT4geyB2b2lkIGxvYWRNZW1vcmllcygpIH0pIH19Pnt0KCdtZW1vcnkuY29uZmlybScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeVRvTm90ZShtZW1vcnkpIH19Plx1RDgzRFx1RENDNCB7dCgnbWVtb3J5LnRvTm90ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnNjb3BlID09PSAnYnJhbmNoJyAmJiA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5QWN0aW9uKCdub3JtYWxpemUnLCB7IGlkOiBtZW1vcnkuaWQgfSkgfX0+XHUyMUYxIHt0KCdtZW1vcnkubm9ybWFsaXplJyl9PC9idXR0b24+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ3N0YXR1cycsIHsgaWQ6IG1lbW9yeS5pZCwgc3RhdHVzOiAnYXJjaGl2ZWQnIH0pIH19Pnt0KCdtZW1vcnkuYXJjaGl2ZUJ0bicpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeUFjdGlvbignc3RhdHVzJywgeyBpZDogbWVtb3J5LmlkLCBzdGF0dXM6ICdhY3RpdmUnIH0pIH19Pnt0KCdtZW1vcnkucmVzdG9yZScpfTwvYnV0dG9uPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCBtYXhIZWlnaHQ6IDg0LCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+e21lbW9yeS5jb250ZW50fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlTWV0YX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnN0YXR1cyA9PT0gJ3N0YWxlJyAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjZDk3NzA2Jyl9Pnt0KCdtZW1vcnkuc3RhdHVzU3RhbGUnKX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5zY29wZSA9PT0gJ2JyYW5jaCcgJiYgbWVtb3J5LmdpdEJyYW5jaCAhPT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNTY5Y2Q2Jyl9Plx1MjM4NyB7bWVtb3J5LmdpdEJyYW5jaH08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSgzNyw5OSwyMzUsMC4xNSknKX0+e01FTU9SWV9TT1VSQ0VfTEFCRUxTW21lbW9yeS5zb3VyY2VUYWddID8/IG1lbW9yeS5zb3VyY2VUYWd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5iYXNpc1NoYSAhPT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9PnttZW1vcnkuYmFzaXNTaGEuc2xpY2UoMCwgOCl9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntuZXcgRGF0ZShtZW1vcnkudXBkYXRlZEF0KS50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIHthbGwubGVuZ3RoID09PSAwICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ21lbW9yeS5lbXB0eScpfTwvZGl2Pn1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgIClcbiAgICAgICAgfSkoKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdjb25jZXB0cy50aXRsZScpfT5cbiAgICAgICAge2NvbmNlcHRzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdjb25jZXB0cy5ub25lJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+e1snY29uY2VwdHMuY29sLm5hbWUnLCAnY29uY2VwdHMuY29sLmNhdGVnb3J5JywgJ2NvbmNlcHRzLmNvbC5jb3VudCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7Y29uY2VwdHMubWFwKChjb25jZXB0KSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17Y29uY2VwdC5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2NvbmNlcHQubmFtZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntjb25jZXB0LmNhdGVnb3J5fTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e1N0cmluZyhjb25jZXB0Lm9jY3VycmVuY2VzKX08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgIDwvPlxuICApXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFJldmlldyBcdTk1RUVcdTk4OThcdTk4NzVcdTdCN0VcdUZGMUFcdTUxNjhcdTkxQ0ZcdTk1RUVcdTk4OThcdTc3MEJcdTY3N0ZcdUZGMDhcdTdFREZcdThCQTEgKyBcdTdCNUJcdTkwMDkgKyBcdTcyQjZcdTYwMDFcdTZENDFcdThGNkNcdUZGMDkrIFx1OUE4Q1x1NjUzNlx1OEJCMFx1NUY1NSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgcmV2aWV3VGFiID0gKFxuICAgIDw+XG4gICAgICB7cmVzdWx0UGFuZWx9XG4gICAgICA8Q2FyZCB0aXRsZT17dCgncmV2aWV3LnJlY29yZHNUaXRsZScpfT5cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYWxsID0gKGlzc3Vlc0RhdGEgPz8gW10pLm1hcCgoaXNzdWUpID0+ICh7IC4uLmlzc3VlLCBzZXZlcml0eTogbm9ybWFsaXplSXNzdWVTZXZlcml0eShpc3N1ZS5zZXZlcml0eSkgfSkpXG4gICAgICAgICAgY29uc3Qgb3BlbkNvdW50ID0gYWxsLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpLmxlbmd0aFxuICAgICAgICAgIGNvbnN0IGNvdW50czogQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgY291bnQ6IG51bWJlciB9PiA9IFtcbiAgICAgICAgICAgIHsga2V5OiAnJywgbGFiZWw6IHQoJ3Jldmlldy5maWx0ZXJBbGwnKSwgY291bnQ6IGFsbC5sZW5ndGggfSxcbiAgICAgICAgICAgIHsga2V5OiAnY3JpdGljYWwnLCBsYWJlbDogJ2NyaXRpY2FsJywgY291bnQ6IGFsbC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBpc3N1ZS5zZXZlcml0eSA9PT0gJ2Jsb2NrZXInKS5sZW5ndGggfSxcbiAgICAgICAgICAgIHsga2V5OiAnbWFqb3InLCBsYWJlbDogJ21ham9yJywgY291bnQ6IGFsbC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zZXZlcml0eSA9PT0gJ21ham9yJykubGVuZ3RoIH0sXG4gICAgICAgICAgICB7IGtleTogJ21pbm9yJywgbGFiZWw6ICdtaW5vcicsIGNvdW50OiBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdtaW5vcicpLmxlbmd0aCB9LFxuICAgICAgICAgICAgeyBrZXk6ICdpbmZvJywgbGFiZWw6ICdpbmZvJywgY291bnQ6IGFsbC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2luZm8nKS5sZW5ndGggfSxcbiAgICAgICAgICBdXG4gICAgICAgICAgY29uc3QgdmlzaWJsZSA9IGFsbFxuICAgICAgICAgICAgLmZpbHRlcigoaXNzdWUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGlzc3VlU2V2ZXJpdHlGaWx0ZXIgPT09ICcnKSByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICBpZiAoaXNzdWVTZXZlcml0eUZpbHRlciA9PT0gJ2NyaXRpY2FsJykgcmV0dXJuIGlzc3VlLnNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IGlzc3VlLnNldmVyaXR5ID09PSAnYmxvY2tlcidcbiAgICAgICAgICAgICAgcmV0dXJuIGlzc3VlLnNldmVyaXR5ID09PSBpc3N1ZVNldmVyaXR5RmlsdGVyXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlU3RhdHVzRmlsdGVyID09PSAnJyB8fCBpc3N1ZS5zdGF0dXMgPT09IGlzc3VlU3RhdHVzRmlsdGVyKVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgIHtjb3VudHMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGtleT17aXRlbS5rZXkgPT09ICcnID8gJ2FsbCcgOiBpdGVtLmtleX0gc3R5bGU9e3N0eWxlcy5jaGlwKGlzc3VlU2V2ZXJpdHlGaWx0ZXIgPT09IGl0ZW0ua2V5KX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRJc3N1ZVNldmVyaXR5RmlsdGVyKGl0ZW0ua2V5KSB9fT5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0ubGFiZWx9IFx1MDBCNyB7aXRlbS5jb3VudH1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cbiAgICAgICAgICAgICAgICAgIHtvcGVuQ291bnR9IFx1NUY4NVx1NTkwNFx1NzQwNiAvIFx1NTE3MSB7YWxsLmxlbmd0aH1cbiAgICAgICAgICAgICAgICAgIHsoc3RhdGU/LnJlc29sdmVkSXNzdWVSZXRlbnRpb25EYXlzID8/IDApID4gMCA/IGAgXHUwMEI3ICR7dCgncmV2aWV3LnJldGVudGlvbkhpbnQnKS5yZXBsYWNlKCd7ZGF5c30nLCBTdHJpbmcoc3RhdGU/LnJlc29sdmVkSXNzdWVSZXRlbnRpb25EYXlzID8/IDcpKX1gIDogJyd9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJywgcGFkZGluZzogJzNweCA4cHgnIH19IHZhbHVlPXtpc3N1ZVN0YXR1c0ZpbHRlcn0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldElzc3VlU3RhdHVzRmlsdGVyKGUudGFyZ2V0LnZhbHVlKSB9fT5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj57dCgncmV2aWV3LnN0YXR1c0FsbCcpfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKElTU1VFX1NUQVRVU19MQUJFTFMpLm1hcCgoW3ZhbHVlLCBsYWJlbF0pID0+IDxvcHRpb24ga2V5PXt2YWx1ZX0gdmFsdWU9e3ZhbHVlfT57bGFiZWx9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZElzc3VlcygpIH19Pnt0KCdyZXZpZXcucmVmcmVzaCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge2FsbC5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57aXNzdWVzRGF0YSA9PT0gbnVsbCA/ICdcdTIwMjYnIDogdCgncmV2aWV3LnJlY29yZHNFbXB0eScpfTwvZGl2PlxuICAgICAgICAgICAgICApIDogdmlzaWJsZS5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnbm90ZXMuZW1wdHlTZWFyY2gnKX08L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IHZpc2libGUubWFwKChpc3N1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkID0gaXNzdWVFeHBhbmRlZFtpc3N1ZS5pZF0gPT09IHRydWVcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGlzc3VlLmRlc2NyaXB0aW9uID8/ICcnXG4gICAgICAgICAgICAgICAgY29uc3QgbG9uZyA9IGRlc2NyaXB0aW9uLmxlbmd0aCA+IDIwMFxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aXNzdWUuaWR9IHN0eWxlPXtzdHlsZXMubm90ZUNhcmR9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHNldmVyaXR5Q29sb3IoaXNzdWUuc2V2ZXJpdHkpKX0+e2lzc3VlLnNldmVyaXR5fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpc3N1ZS5jYXRlZ29yeSA/IDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM1NzYwNmEnKX0+e2lzc3VlLmNhdGVnb3J5fTwvc3Bhbj4gOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnID8gJyNkY2RjYWEnIDogaXNzdWUuc3RhdHVzID09PSAncmVzb2x2ZWQnIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2FjY2VwdGVkJyA/ICcjNGVjOWIwJyA6ICcjOGI4YjhiJyl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7SVNTVUVfU1RBVFVTX0xBQkVMU1tpc3N1ZS5zdGF0dXNdID8/IGlzc3VlLnN0YXR1c31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e2lzc3VlLnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFNocmluazogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3ZlcmlmeWluZ1RhcmdldCAhPT0gbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgncmV2aWV3LnZlcmlmeUhpbnQnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgdmVyaWZ5SXNzdWVzKGlzc3VlLmNoYW5nZUlkKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+e3ZlcmlmeWluZ1RhcmdldCA9PT0gaXNzdWUuY2hhbmdlSWQgPyB0KCdyZXZpZXcudmVyaWZ5UnVubmluZycpIDogJ1x1RDgzRFx1REQwRCAnICsgdCgncmV2aWV3LnZlcmlmeScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3Jldmlldy5mYWxzZVBvc2l0aXZlSGludCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbmZpcm1EaWFsb2coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdCgncmV2aWV3LmZhbHNlUG9zaXRpdmVUaXRsZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB0KCdyZXZpZXcuZmFsc2VQb3NpdGl2ZU1zZycpLnJlcGxhY2UoJ3t0aXRsZX0nLCBpc3N1ZS50aXRsZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhbmdlcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcy9zdGF0dXMnLCB7IGlkOiBpc3N1ZS5pZCwgc3RhdHVzOiAncmVqZWN0ZWQnIH0pLnRoZW4oYXN5bmMgKHsgb2sgfSkgPT4geyBpZiAob2spIGF3YWl0IGxvYWRJc3N1ZXMoKSB9KSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XHVEODNEXHVERUFCIHt0KCdyZXZpZXcuZmFsc2VQb3NpdGl2ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtkZXNjcmlwdGlvbiAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCAuLi4obG9uZyAmJiAhZXhwYW5kZWQgPyBzdHlsZXMubm90ZUNsYW1wIDoge30pIH19PntyZW5kZXJXaXRoUGVlayhkZXNjcmlwdGlvbil9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtpc3N1ZS5yZXNvbHV0aW9uID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JywgcGFkZGluZzogJzZweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgYmFja2dyb3VuZDogJ3JnYmEoNzgsIDIwMSwgMTc2LCAwLjA4KScsIGJvcmRlcjogJzFweCBzb2xpZCByZ2JhKDc4LCAyMDEsIDE3NiwgMC4zNSknLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBcdTI3MTMge2lzc3VlLnJlc29sdXRpb259XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeFN0YXRzICE9IG51bGwgfHwgQm9vbGVhbihpc3N1ZS5maXhEaWZmKSkgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5saW5rQnRuLCBtYXJnaW5Ub3A6ICc0cHgnLCBkaXNwbGF5OiAnYmxvY2snIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0Rml4RXhwYW5kZWQoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW2lzc3VlLmlkXTogIShwcmV2aW91c1tpc3N1ZS5pZF0gPT09IHRydWUpIH0pKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBcdUQ4M0RcdUREMjcge3QoJ3Jldmlldy5maXhEZXRhaWwnKX1cdUZGMDh7U3RyaW5nKGlzc3VlLmZpeFN0YXRzPy5maWxlcyA/PyAwKX0ge3QoJ3Jldmlldy5maXhTdGF0RmlsZXMnKX0gXHUwMEI3ICt7U3RyaW5nKGlzc3VlLmZpeFN0YXRzPy5pbnNlcnRpb25zID8/IDApfSBcdTIyMTJ7U3RyaW5nKGlzc3VlLmZpeFN0YXRzPy5kZWxldGlvbnMgPz8gMCl9XHVGRjA5e2ZpeEV4cGFuZGVkW2lzc3VlLmlkXSA9PT0gdHJ1ZSA/ICdcdTI1QjInIDogJ1x1MjVCQyd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtmaXhFeHBhbmRlZFtpc3N1ZS5pZF0gPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeEZpbGVzID8/IFtdKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzNweCcgfX0+e3QoJ3Jldmlldy5maXhGaWxlcycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeEZpbGVzID8/IFtdKS5tYXAoKGZpbGUpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZmlsZX0gc3R5bGU9e3sgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsIGZvbnRTaXplOiAnMTFweCcgfX0+e2ZpbGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeEltcGFjdCA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICczcHgnIH19Pnt0KCdyZXZpZXcuZml4SW1wYWN0Jyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc3N1ZS5maXhJbXBhY3QubWFwKChlbnRyeSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeS5zeW1ib2x9IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzVweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMDk2OWRhJyl9PntlbnRyeS5zeW1ib2x9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7JyAnfXt0KCdyZXZpZXcuZGVmaW5lZEluJyl9IHtlbnRyeS5kZWZpbmVkSW59IFx1MDBCNyB7U3RyaW5nKGVudHJ5LmNhbGxlcnMubGVuZ3RoKX0ge3QoJ3Jldmlldy5jYWxsQ291bnQnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2FsbGVycy5zbGljZSgwLCA1KS5tYXAoKGNhbGxlciwgY2FsbGVySW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2NhbGxlckluZGV4fSBzdHlsZT17eyBmb250U2l6ZTogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgcGFkZGluZ0xlZnQ6ICcxMnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUgZG90dGVkJyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgb3BlblBlZWsoY2FsbGVyLmZpbGUsIE51bWJlcihjYWxsZXIubGluZSkpIH19PntjYWxsZXIuZmlsZX06e2NhbGxlci5saW5lfTwvc3Bhbj4ge2NhbGxlci5zbmlwcGV0LnNsaWNlKDAsIDgwKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtCb29sZWFuKGlzc3VlLmZpeERpZmYpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICczcHgnIH19Pnt0KCdyZXZpZXcuZml4RGlmZicpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctaW5zZXQsIHJnYmEoNSw1LDUsMC4wMykpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzZweCA4cHgnLCBtYXhIZWlnaHQ6ICczMDBweCcsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZW5kZXJEaWZmTGluZXMoaXNzdWUuZml4RGlmZil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICB7bG9uZyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmxpbmtCdG59IG9uQ2xpY2s9eygpID0+IHsgc2V0SXNzdWVFeHBhbmRlZCh7IC4uLmlzc3VlRXhwYW5kZWQsIFtpc3N1ZS5pZF06ICFleHBhbmRlZCB9KSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtleHBhbmRlZCA/IHQoJ25vdGVzLmNvbGxhcHNlJykgOiB0KCdub3Rlcy5leHBhbmQnKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVNZXRhfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57dCgncmV2aWV3LnRhcmdldCcpfToge2lzc3VlVGFyZ2V0TGFiZWwoaXNzdWUuY2hhbmdlSWQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57Zm9ybWF0VGltZShpc3N1ZS5jcmVhdGVkQXQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKVxuICAgICAgICB9KSgpfVxuICAgICAgPC9DYXJkPlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ3ZlcmlmeS5yZWNvcmRzJyl9PlxuICAgICAgICB7dmVyaWZpY2F0aW9ucy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgndmVyaWZ5LnJlY29yZHNFbXB0eScpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3ZlcmlmaWNhdGlvbnMuc2xpY2UoMCwgMjApLm1hcCgocmVjb3JkKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17cmVjb3JkLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHJlY29yZC5zdGF0dXMgPT09ICdwYXNzZWQnID8gJyM0ZWM5YjAnIDogJyNkY2RjYWEnKX0+e3JlY29yZC5zdGF0dXN9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3JlY29yZC5uYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2Zvcm1hdFRpbWUocmVjb3JkLmNyZWF0ZWRBdCl9PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICA8Lz5cbiAgKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvb3R9IGRhdGEtdGVzdGlkPVwicHJvamVjdC1jb250cm9sLXdvcmtzcGFjZVwiPlxuICAgICAgPHN0eWxlPntMQVlPVVRfU1RZTEV9PC9zdHlsZT5cbiAgICAgIDxkaXZcbiAgICAgICAgZGF0YS10ZXN0aWQ9XCJwcm9qZWN0LWNvbnRyb2wtZGl2aWRlclwiXG4gICAgICAgIG9uUG9pbnRlckRvd249e29uRGl2aWRlckRvd259XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogMCwgYm90dG9tOiAwLCByaWdodDogLTQsIHdpZHRoOiA4LFxuICAgICAgICAgIGN1cnNvcjogJ2NvbC1yZXNpemUnLCB6SW5kZXg6IDIwLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5uYXZ9PlxuICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLnRpdGxlfT57dCgnd29ya3NwYWNlLnRpdGxlJyl9PC9zcGFuPlxuICAgICAgICB7dGFicy5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgPGJ1dHRvbiBrZXk9e2VudHJ5LmtleX0gc3R5bGU9e3N0eWxlcy50YWIodGFiID09PSBlbnRyeS5rZXkpfSBvbkNsaWNrPXsoKSA9PiB7IHNldFRhYihlbnRyeS5rZXkpIH19PntlbnRyeS5sYWJlbH08L2J1dHRvbj5cbiAgICAgICAgKSl9XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJ1bm5pbmdDb3VudCA9IHJ1bnMuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuc3RhdHVzID09PSAncnVubmluZycgfHwgZW50cnkuc3RhdHVzID09PSAncXVldWVkJyB8fCBlbnRyeS5zdGF0dXMgPT09ICd2ZXJpZnlpbmcnKS5sZW5ndGhcbiAgICAgICAgICBjb25zdCBmYWlsZWRDb3VudCA9IHJ1bnMuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuc3RhdHVzID09PSAnZmFpbGVkJyB8fCBlbnRyeS5zdGF0dXMgPT09ICdwYXVzZWQnKS5sZW5ndGhcbiAgICAgICAgICBpZiAocnVubmluZ0NvdW50ID09PSAwICYmIGZhaWxlZENvdW50ID09PSAwKSByZXR1cm4gbnVsbFxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIG1hcmdpbkxlZnQ6ICc0cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAge3J1bm5pbmdDb3VudCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKHRoZW1lQXdhcmVUZXh0KCcjMjU2M2ViJykpLCBjdXJzb3I6ICdwb2ludGVyJywgYm9yZGVyOiAnbm9uZScgfX0gdGl0bGU9e3QoJ2JhZGdlLnJ1bm5pbmcnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcocnVubmluZ0NvdW50KSl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldFRhYignZXhlY3V0aW9uJykgfX0+XHUyNUI2IHtTdHJpbmcocnVubmluZ0NvdW50KX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge2ZhaWxlZENvdW50ID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UodGhlbWVBd2FyZVRleHQoJyNmMTRjNGMnKSksIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXI6ICdub25lJyB9fSB0aXRsZT17dCgnYmFkZ2UuZmFpbGVkJykucmVwbGFjZSgne259JywgU3RyaW5nKGZhaWxlZENvdW50KSl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldFRhYignZXhlY3V0aW9uJykgfX0+XHUyNzE3IHtTdHJpbmcoZmFpbGVkQ291bnQpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIClcbiAgICAgICAgfSkoKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmJvZHl9PlxuICAgICAgICB7bG9hZEVycm9yICE9PSBudWxsICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2Vycm9yLmxvYWQnKX06IHtsb2FkRXJyb3J9PC9kaXY+fVxuICAgICAgICB7c3RhdGU/LnJlYWR5ID09PSBmYWxzZSAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9PntzdGF0ZS5yZWFzb24gPz8gJyd9PC9kaXY+fVxuICAgICAgICB7dGFiID09PSAnY29tbWl0cycgJiYgY29tbWl0c1RhYn1cbiAgICAgICAge3RhYiA9PT0gJ292ZXJ2aWV3JyAmJiBvdmVydmlld1RhYn1cbiAgICAgICAge3RhYiA9PT0gJ2V4ZWN1dGlvbicgJiYgZXhlY3V0aW9uVGFifVxuICAgICAgICB7dGFiID09PSAncmV2aWV3JyAmJiByZXZpZXdUYWJ9XG4gICAgICAgIHt0YWIgPT09ICdub3RlcycgJiYgbm90ZXNUYWJ9XG4gICAgICAgIHt0YWIgPT09ICdzZXR0aW5ncycgJiYgc2V0dGluZ3NUYWJ9XG4gICAgICA8L2Rpdj5cbiAgICAgIHtjb25maXJtRGlhbG9nICE9PSBudWxsICYmIChcbiAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICB0aXRsZT17Y29uZmlybURpYWxvZy50aXRsZX1cbiAgICAgICAgICBtZXNzYWdlPXtjb25maXJtRGlhbG9nLm1lc3NhZ2V9XG4gICAgICAgICAgZGFuZ2VyPXtjb25maXJtRGlhbG9nLmRhbmdlcn1cbiAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKG51bGwpIH19XG4gICAgICAgICAgb25Db25maXJtPXsoKSA9PiB7IGNvbmZpcm1EaWFsb2cub25Db25maXJtKCk7IHNldENvbmZpcm1EaWFsb2cobnVsbCkgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7cGVlayAhPT0gbnVsbCAmJiAoXG4gICAgICAgIDxkaXYgZGF0YS10ZXN0aWQ9XCJwYy1wZWVrLW92ZXJsYXlcIiBzdHlsZT17eyBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIGJhY2tncm91bmQ6ICdyZ2JhKDE1LDIzLDQyLDAuNDUpJywgYmFja2Ryb3BGaWx0ZXI6ICdibHVyKDJweCknLCB6SW5kZXg6IDEwMDAsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBlZWsobnVsbCkgfX0+XG4gICAgICAgICAgPGRpdiBkYXRhLXRlc3RpZD1cInBjLXBlZWstY2FyZFwiIHN0eWxlPXt7IHdpZHRoOiAnbWluKDc2MHB4LCA5MnZ3KScsIG1heEhlaWdodDogJzgwdmgnLCBvdmVyZmxvdzogJ2hpZGRlbicsIGJvcmRlclJhZGl1czogJzEwcHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm94U2hhZG93OiAnMCAxNnB4IDQ4cHggcmdiYSgwLDAsMCwwLjI1KScsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicgfX0gb25DbGljaz17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKSB9fT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgcGFkZGluZzogJzEwcHggMTRweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJyB9fT5cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCwgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57cGVlay5wYXRofTp7U3RyaW5nKHBlZWsubGluZSl9PC9zcGFuPlxuICAgICAgICAgICAgICB7cGVla0RhdGE/LmV4aXN0cyA9PT0gdHJ1ZSAmJiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57U3RyaW5nKHBlZWtEYXRhLnN0YXJ0TGluZSl9XHUyMDEze1N0cmluZyhwZWVrRGF0YS5lbmRMaW5lKX0gLyB7U3RyaW5nKHBlZWtEYXRhLnRvdGFsTGluZXMpfSBcdTg4NEM8L3NwYW4+fVxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCAxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBlZWsobnVsbCkgfX0+XHUyNzE1PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3c6ICdhdXRvJywgcGFkZGluZzogJzEwcHggMCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctaW5zZXQsIHJnYmEoNSw1LDUsMC4wMykpJyB9fT5cbiAgICAgICAgICAgICAge3BlZWtCdXN5ICYmIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLmVtcHR5IH19Plx1OEJGQlx1NTNENlx1NEUyRFx1MjAyNjwvZGl2Pn1cbiAgICAgICAgICAgICAgeyFwZWVrQnVzeSAmJiBwZWVrRGF0YSAhPT0gbnVsbCAmJiBwZWVrRGF0YS5leGlzdHMgPT09IGZhbHNlICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+XHU2NTg3XHU0RUY2XHU0RTBEXHU1QjU4XHU1NzI4XHVGRjA4XHU1M0VGXHU4MEZEXHU1REYyXHU4OEFCXHU1MjIwXHU5NjY0XHU2MjE2XHU3OUZCXHU1MkE4XHVGRjA5PC9kaXY+fVxuICAgICAgICAgICAgICB7IXBlZWtCdXN5ICYmIHBlZWtEYXRhPy5leGlzdHMgPT09IHRydWUgJiYgKHBlZWtEYXRhLmxpbmVzID8/IFtdKS5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5Lm59IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIHBhZGRpbmc6ICcwIDE0cHgnLCBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJywgZm9udFNpemU6ICcxMS41cHgnLCBsaW5lSGVpZ2h0OiAxLjcsIGJhY2tncm91bmQ6IGVudHJ5Lm4gPT09IHBlZWsubGluZSA/ICdyZ2JhKDM3LDk5LDIzNSwwLjA4KScgOiAndHJhbnNwYXJlbnQnIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2lkdGg6IDQwLCB0ZXh0QWxpZ246ICdyaWdodCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmbGV4U2hyaW5rOiAwIH19PntTdHJpbmcoZW50cnkubil9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57ZW50cnkudGV4dCA9PT0gJycgPyAnXFx1MDBBMCcgOiBlbnRyeS50ZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApXG59XG4iLCAiLyoqXG4gKiBcdTYzRDBcdTRFQTRcdThGNkVcdTZCMjFcdTgwNUFcdTdDN0JcdUZGMDhcdTVCQTJcdTYyMzdcdTdBRUZcdUZGMDlcdUZGMUFcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTUzRjBcdTc2ODRcdTRFMEJcdTYyQzlcdTY4NDZcdTYzMDlcdTMwMENcdTRFMDBcdThGNkVcdTVERTVcdTRGNUNcdTMwMERcdTUyMDZcdTdFQzRcdTVDNTVcdTc5M0FcdTMwMDJcbiAqIFx1NEUwRSBydW50aW1lL2hpc3RvcnkudHMgXHU3Njg0IGNsdXN0ZXJDb21taXRzIFx1NEZERFx1NjMwMVx1NTQwQ1x1NEUwMFx1NTQyRlx1NTNEMVx1NUYwRlx1RkYwOFYxLjAgXHUwMEE3OTcvXHUwMEE3OTlcdUZGMDlcdUZGMUFcbiAqIFx1NzZGOFx1OTBCQlx1NjNEMFx1NEVBNFx1NjVGNlx1OTVGNFx1OTVGNFx1OTY5NFx1OEQ4NVx1OEZDN1x1N0E5N1x1NTNFM1x1RkYwOFx1OUVEOFx1OEJBNCAzNmhcdUZGMDlcdTUyMDdcdTY1QURcdUZGMUJcdThGREVcdTdFRUQgXHUyMjY1MyBcdTRFMkFcdTYzRDBcdTRFQTRcdTU0MEVcdTRFMEVcdTVERjJcdTgwNUFcdTY1ODdcdTRFRjZcbiAqIFx1OTZGNlx1OTFDRFx1NTNFMFx1NEU1Rlx1NTIwN1x1NjVBRFx1MzAwMlx1NjcwRFx1NTJBMVx1N0FFRlx1OTBBM1x1NEVGRFx1NURFNVx1NEY1Q1x1NTcyOCBnaXQgXHU2MjZCXHU2M0NGXHU1QzQyXHVGRjA4XHU5MUNEXHU1RUZBXHU1Mzg2XHU1M0YyXHVGRjA5XHVGRjBDXHU4RkQ5XHU0RUZEXHU5NzYyXHU1NDExXG4gKiAvY29tbWl0cyBcdThGRDRcdTU2REVcdTc2ODRcdTYzRDBcdTRFQTRcdTY3NjFcdTc2RUVcdTIwMTRcdTIwMTRcdTRFMjRcdTU5MDRcdTg5QzRcdTUyMTlcdTY1MzlcdTUyQThcdTVGQzVcdTk4N0JcdTU0MENcdTZCNjVcdTMwMDJcbiAqXG4gKiBAbW9kdWxlIGRzaC1jbGllbnQtcHJvamVjdC1jb250cm9sL2NvbXBvbmVudHMvY29tbWl0LXJvdW5kc1xuICovXG5cbi8qKiBcdTgwNUFcdTdDN0JcdThGOTNcdTUxNjVcdTc2ODRcdTY3MDBcdTVDMEZcdTVGNjJcdTcyQjZcdUZGMDgvY29tbWl0cyBcdTc2ODRcdTYzRDBcdTRFQTRcdTY3NjFcdTc2RUVcdTVCNTBcdTk2QzZcdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBpbnRlcmZhY2UgUm91bmRDb21taXQge1xuICBzaGE6IHN0cmluZ1xuICAvKiogXHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0XHVGRjA4XHU2QkVCXHU3OUQyXHVGRjA5XHUzMDAyICovXG4gIGRhdGU6IG51bWJlclxuICAvKiogXHU2RDg5XHU1M0NBXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0XHVGRjA4XHU3NkY4XHU1QkY5XHU0RUQzXHU1RTkzXHU2ODM5XHVGRjA5XHUzMDAyICovXG4gIGZpbGVzOiBzdHJpbmdbXVxufVxuXG4vKiogXHU0RTAwXHU4RjZFXHU1REU1XHU0RjVDXHVGRjFBXHU0RkREXHU2MzAxXHU0RjIwXHU1MTY1XHU5ODdBXHU1RThGXHU3Njg0XHU2M0QwXHU0RUE0XHU1MjE3XHU4ODY4XHVGRjA4L2NvbW1pdHMgXHU0RTNBXHU2NUIwXHUyMTkyXHU2NUU3XHVGRjA5KyBcdTY1RjZcdTk1RjRcdTgzMDNcdTU2RjRcdTMwMDIgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0Um91bmQge1xuICBjb21taXRzOiBSb3VuZENvbW1pdFtdXG4gIC8qKiBcdThGNkVcdTUxODVcdTY3MDBcdTY1RTlcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdTMwMDIgKi9cbiAgZmlyc3RBdDogbnVtYmVyXG4gIC8qKiBcdThGNkVcdTUxODVcdTY3MDBcdTY2NUFcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdTMwMDIgKi9cbiAgbGFzdEF0OiBudW1iZXJcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUk9VTkRfR0FQX01TID0gMzYgKiA2MCAqIDYwICogMTAwMFxuXG4vKiogXHU0RTBFXHU2NzBEXHU1MkExXHU3QUVGIGNsdXN0ZXJDb21taXRzIFx1NzZGOFx1NTQwQ1x1NzY4NFx1OTFDRFx1NTNFMFx1NzM4N1x1RkYxQVx1NTQ3RFx1NEUyRFx1NjU4N1x1NEVGNlx1NjU3MCAvIG1heChcdTY3MkNcdTYzRDBcdTRFQTRcdTY1ODdcdTRFRjZcdTY1NzAsIDEpXHUzMDAyICovXG5mdW5jdGlvbiBvdmVybGFwUmF0aW8oZmlsZXM6IHN0cmluZ1tdLCBleGlzdGluZzogU2V0PHN0cmluZz4pOiBudW1iZXIge1xuICBpZiAoZXhpc3Rpbmcuc2l6ZSA9PT0gMCkgcmV0dXJuIDBcbiAgbGV0IGhpdHMgPSAwXG4gIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykgaWYgKGV4aXN0aW5nLmhhcyhmaWxlKSkgaGl0cyArPSAxXG4gIHJldHVybiBoaXRzIC8gTWF0aC5tYXgoZmlsZXMubGVuZ3RoLCAxKVxufVxuXG4vKipcbiAqIFx1NjI4QVx1RkYwOFx1NjVCMFx1MjE5Mlx1NjVFN1x1NjIxNlx1NjVFN1x1MjE5Mlx1NjVCMFx1NTc0N1x1NTNFRlx1RkYwOVx1OEZERVx1N0VFRFx1NjNEMFx1NEVBNFx1ODA1QVx1NjIxMFx1OEY2RVx1NkIyMVx1MzAwMlxuICogXHU2NUY2XHU5NUY0XHU5NUY0XHU5Njk0XHU1M0Q2XHU3RUREXHU1QkY5XHU1MDNDXHVGRjFBXHU1MjE3XHU4ODY4XHU5ODdBXHU1RThGXHU0RTBEXHU0RkREXHU4QkMxXHU2NUY2XHU5NUY0XHU2NUI5XHU1NDExXHUzMDAyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbHVzdGVySW50b1JvdW5kcyhjb21taXRzOiBSb3VuZENvbW1pdFtdLCBjbHVzdGVyR2FwTXM6IG51bWJlciA9IERFRkFVTFRfUk9VTkRfR0FQX01TKTogQ29tbWl0Um91bmRbXSB7XG4gIGNvbnN0IHJvdW5kczogQ29tbWl0Um91bmRbXSA9IFtdXG4gIGxldCBjdXJyZW50OiBSb3VuZENvbW1pdFtdID0gW11cbiAgbGV0IGN1cnJlbnRGaWxlcyA9IG5ldyBTZXQ8c3RyaW5nPigpXG5cbiAgY29uc3QgcHVzaFJvdW5kID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmIChjdXJyZW50Lmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgY29uc3QgdGltZXMgPSBjdXJyZW50Lm1hcCgoY29tbWl0KSA9PiBjb21taXQuZGF0ZSlcbiAgICByb3VuZHMucHVzaCh7IGNvbW1pdHM6IGN1cnJlbnQsIGZpcnN0QXQ6IE1hdGgubWluKC4uLnRpbWVzKSwgbGFzdEF0OiBNYXRoLm1heCguLi50aW1lcykgfSlcbiAgICBjdXJyZW50ID0gW11cbiAgICBjdXJyZW50RmlsZXMgPSBuZXcgU2V0KClcbiAgfVxuXG4gIGZvciAoY29uc3QgY29tbWl0IG9mIGNvbW1pdHMpIHtcbiAgICBjb25zdCBwcmV2aW91cyA9IGN1cnJlbnRbY3VycmVudC5sZW5ndGggLSAxXVxuICAgIGNvbnN0IGdhcEJyZWFrID0gcHJldmlvdXMgIT09IHVuZGVmaW5lZCAmJiBNYXRoLmFicyhjb21taXQuZGF0ZSAtIHByZXZpb3VzLmRhdGUpID4gY2x1c3RlckdhcE1zXG4gICAgY29uc3QgZmlsZUJyZWFrID0gY3VycmVudC5sZW5ndGggPj0gMyAmJiBvdmVybGFwUmF0aW8oY29tbWl0LmZpbGVzLCBjdXJyZW50RmlsZXMpID09PSAwXG4gICAgaWYgKGdhcEJyZWFrIHx8IGZpbGVCcmVhaykgcHVzaFJvdW5kKClcbiAgICBjdXJyZW50LnB1c2goY29tbWl0KVxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBjb21taXQuZmlsZXMpIGN1cnJlbnRGaWxlcy5hZGQoZmlsZSlcbiAgfVxuICBwdXNoUm91bmQoKVxuICByZXR1cm4gcm91bmRzXG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBaUJBLElBQUFBLGdCQUFrQjs7O0FDTmxCLG1CQUFrQjs7O0FDTVgsU0FBUyxXQUFXLE9BQWdEO0FBQ3pFLFFBQU0sTUFBTSxvQkFBb0IsS0FBSyxLQUFLO0FBQzFDLE1BQUksUUFBUSxNQUFNO0FBQ2hCLFVBQU0sUUFBUSxPQUFPLFNBQVMsSUFBSSxDQUFDLEdBQUksRUFBRTtBQUN6QyxXQUFPLENBQUUsU0FBUyxLQUFNLEtBQU0sU0FBUyxJQUFLLEtBQUssUUFBUSxHQUFHO0FBQUEsRUFDOUQ7QUFDQSxRQUFNLGFBQWEsc0RBQXNELEtBQUssS0FBSztBQUNuRixNQUFJLGVBQWUsTUFBTTtBQUN2QixXQUFPLENBQUMsT0FBTyxXQUFXLENBQUMsQ0FBQyxHQUFHLE9BQU8sV0FBVyxDQUFDLENBQUMsR0FBRyxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFBQSxFQUM3RTtBQUNBLFNBQU87QUFDVDtBQUdPLFNBQVMsa0JBQWtCLEdBQVcsR0FBVyxHQUFtQjtBQUN6RSxRQUFNLFVBQVUsQ0FBQyxVQUEwQjtBQUN6QyxVQUFNLElBQUksUUFBUTtBQUNsQixXQUFPLEtBQUssVUFBVSxJQUFJLFVBQVUsSUFBSSxTQUFTLFVBQVU7QUFBQSxFQUM3RDtBQUNBLFNBQU8sU0FBUyxRQUFRLENBQUMsSUFBSSxTQUFTLFFBQVEsQ0FBQyxJQUFJLFNB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LElBQ1QsVUFBVTtBQUFBLElBQ1YsZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLElBQ2QsWUFBWTtBQUFBLElBQ1osd0JBQXdCO0FBQUEsSUFDeEIsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsb0JBQW9CO0FBQUEsSUFDcEIsdUJBQXVCO0FBQUEsSUFDdkIsa0JBQWtCO0FBQUEsSUFDbEIsZUFBZTtBQUFBLElBQ2YsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBRWIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsZ0JBQWdCO0FBQUEsSUFDaEIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsd0JBQXdCO0FBQUEsSUFDeEIscUJBQXFCO0FBQUEsSUFDckIsNEJBQTRCO0FBQUEsSUFFNUIsZUFBZTtBQUFBLElBQ2Ysc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsd0JBQXdCO0FBQUEsSUFDeEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIseUJBQXlCO0FBQUEsSUFDekIsMEJBQTBCO0FBQUEsSUFDMUIsMkJBQTJCO0FBQUEsSUFFM0Isa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFFaEIsZUFBZTtBQUFBLElBQ2YsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsYUFBYTtBQUFBLElBQ2IsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBRWYsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsc0JB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
