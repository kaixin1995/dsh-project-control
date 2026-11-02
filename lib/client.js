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
var import_react4 = __toESM(require("react"), 1);

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
    "workspace.selectSession": "\u8BF7\u5148\u5728\u5DE6\u4FA7\u9009\u62E9\u9879\u76EE\u4E0B\u7684\u4F1A\u8BDD\uFF0C\u5DE5\u4F5C\u53F0\u624D\u4F1A\u663E\u793A\u8BE5\u9879\u76EE\u7684\u6570\u636E\u3002",
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
    "workspace.selectSession": "Select a session under a workspace on the left to view its project data.",
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
  const activeRef = (0, import_react2.useRef)(true);
  (0, import_react2.useEffect)(() => {
    activeRef.current = true;
    return () => {
      activeRef.current = false;
    };
  }, []);
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
        body: JSON.stringify({ ...body, sessionId: props.sessionId ?? "" }),
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
        body: JSON.stringify({ path, line, sessionId: props.sessionId ?? "" }),
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
  const commitsRequestRef = (0, import_react2.useRef)(0);
  const loadCommits = async () => {
    const request = ++commitsRequestRef.current;
    try {
      const response = await fetch(`/project-control/api/commits?sessionId=${encodeURIComponent(props.sessionId ?? "")}&limit=60`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? `HTTP ${response.status}`);
      if (!activeRef.current || request !== commitsRequestRef.current) return;
      setCommitsData(data);
      setCommitsError(null);
    } catch (error) {
      if (!activeRef.current || request !== commitsRequestRef.current) return;
      setCommitsData(null);
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
    while (activeRef.current && pool.active < MAX_DETAIL_CONCURRENCY && pool.pending.length > 0) {
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
        if (!activeRef.current) break;
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
      const response = await fetch("/project-control/api/runs/detail?id=" + encodeURIComponent(id) + "&sessionId=" + encodeURIComponent(props.sessionId ?? ""));
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
    if (props.layoutMode === "overlay") return;
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
  }, [props.sessionId, props.layoutMode, layoutFace]);
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
    if (props.layoutMode === "overlay") return;
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
  }, [props.layoutMode]);
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
    let generation = 0;
    const load = async () => {
      const request = ++generation;
      try {
        const response = await fetch("/project-control/api/state?sessionId=" + encodeURIComponent(props.sessionId ?? ""), { headers: { accept: "application/json" } });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!disposed && request === generation) {
          setState(data);
          setLoadError(null);
        }
      } catch (error) {
        if (!disposed && request === generation) setLoadError(error instanceof Error ? error.message : String(error));
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
  }, [props.sessionId]);
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
    props.layoutMode !== "overlay" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: LAYOUT_STYLE }),
    props.layoutMode !== "overlay" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.body, children: props.sessionId === void 0 || props.sessionId === "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("workspace.selectSession") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
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
    ] }) }),
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

// src/client/components/ModernWorkspace.tsx
var import_react3 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
function workspaceBounds(frame, center, chatWidth) {
  const available = Math.floor(center.width);
  if (available < 560 || center.height <= 0) return void 0;
  const chat = Math.max(280, Math.min(chatWidth, available - 280));
  return {
    left: center.left - frame.left,
    top: center.top - frame.top,
    width: available - chat,
    height: center.height
  };
}
function ModernWorkspace({ current, panelInfo, enabled, onDismiss }) {
  const sessionId = (0, import_react3.useSyncExternalStore)(
    (listener) => current.subscribe(listener),
    () => current.getSnapshot().key
  );
  const activePanelId = (0, import_react3.useSyncExternalStore)(
    (listener) => panelInfo.subscribe(listener),
    () => panelInfo.getSnapshot().activePanelId
  );
  const visible = enabled && activePanelId === null;
  const dragCleanup = (0, import_react3.useRef)();
  const [bounds, setBounds] = (0, import_react3.useState)();
  (0, import_react3.useLayoutEffect)(() => () => {
    dragCleanup.current?.();
  }, [visible]);
  const [chatWidth, setChatWidth] = (0, import_react3.useState)(() => {
    const saved = Number(localStorage.getItem("pc.chatWidth") ?? "");
    return Number.isFinite(saved) && saved >= 280 ? saved : 360;
  });
  (0, import_react3.useLayoutEffect)(() => {
    if (!visible) return;
    const rightbar = document.querySelector("[data-rightbar-col]");
    const frame = rightbar?.parentElement;
    const centers = frame?.querySelectorAll(':scope > div[class*="centerCol"]');
    if (frame === void 0 || frame === null || centers?.length !== 1) {
      onDismiss();
      return;
    }
    const center = centers[0];
    const oldPadding = center.style.getPropertyValue("padding-left");
    const oldPaddingPriority = center.style.getPropertyPriority("padding-left");
    const oldBoxSizing = center.style.getPropertyValue("box-sizing");
    const oldBoxSizingPriority = center.style.getPropertyPriority("box-sizing");
    let appliedPadding = "";
    let active = true;
    const update = () => {
      if (!active) return;
      const next = workspaceBounds(frame.getBoundingClientRect(), center.getBoundingClientRect(), chatWidth);
      if (next === void 0) {
        onDismiss();
        return;
      }
      const padding = `${next.width}px`;
      if (padding !== appliedPadding) {
        center.style.setProperty("padding-left", padding, "important");
        appliedPadding = padding;
      }
      center.style.setProperty("box-sizing", "border-box", "important");
      setBounds((previous) => previous?.left === next.left && previous.top === next.top && previous.width === next.width && previous.height === next.height ? previous : next);
    };
    const resize = new ResizeObserver(update);
    resize.observe(frame);
    resize.observe(center);
    const mutations = new MutationObserver(() => {
      if (!frame.hasAttribute("data-rightbar-collapsed")) onDismiss();
      else update();
    });
    mutations.observe(frame, { attributes: true, attributeFilter: ["data-rightbar-collapsed"] });
    window.addEventListener("resize", update);
    update();
    return () => {
      active = false;
      resize.disconnect();
      mutations.disconnect();
      window.removeEventListener("resize", update);
      if (center.style.getPropertyValue("padding-left") === appliedPadding) {
        if (oldPadding === "") center.style.removeProperty("padding-left");
        else center.style.setProperty("padding-left", oldPadding, oldPaddingPriority);
      }
      if (center.style.getPropertyValue("box-sizing") === "border-box") {
        if (oldBoxSizing === "") center.style.removeProperty("box-sizing");
        else center.style.setProperty("box-sizing", oldBoxSizing, oldBoxSizingPriority);
      }
      setBounds(void 0);
    };
  }, [visible, chatWidth, onDismiss]);
  if (!visible || bounds === void 0) return null;
  const onDividerDown = (event) => {
    event.preventDefault();
    const onMove = (move) => {
      const frame = document.querySelector("[data-rightbar-col]")?.parentElement;
      const center = frame?.querySelector(':scope > div[class*="centerCol"]');
      if (center === void 0 || center === null) return;
      const width = Math.max(280, Math.min(900, Math.round(center.getBoundingClientRect().right - move.clientX)));
      setChatWidth(width);
      localStorage.setItem("pc.chatWidth", String(width));
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      dragCleanup.current = void 0;
    };
    dragCleanup.current?.();
    dragCleanup.current = onUp;
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { "data-testid": "project-control-modern-workspace", style: { position: "absolute", ...bounds, pointerEvents: "auto" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(WorkspaceFrame, { ...sessionId === void 0 ? {} : { sessionId }, layoutMode: "overlay" }, sessionId ?? "landing"),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { "data-testid": "project-control-modern-divider", onPointerDown: onDividerDown, style: { position: "absolute", top: 0, bottom: 0, right: -4, width: 8, cursor: "col-resize", zIndex: 20 } })
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
        import_react4.default.useEffect(() => {
          layout?.openDetails?.();
        }, []);
        import_react4.default.useEffect(() => {
          if (props.sessionId === void 0) return;
          const timer = setTimeout(() => layout?.openDetails?.(), 0);
          return () => {
            clearTimeout(timer);
          };
        }, [props.sessionId]);
        return import_react4.default.createElement(WorkspaceFrame, { ...props, key: props.sessionId ?? "landing", layout });
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
  const dismissModernWorkspace = () => {
    if (!workspaceEnabled) return;
    workspaceEnabled = false;
    fireToggle(false);
  };
  ctx.inject(["uiSession"], (scope) => {
    if (layout.panelInfo === void 0) return;
    const current = scope.uiSession.adapter.current;
    scope.slots.inject("shell.overlay", () => scope.slots.register({
      name: "shell.overlay",
      id: "project-control-workspace"
    }, () => {
      const [enabled, setEnabled] = import_react4.default.useState(workspaceEnabled);
      import_react4.default.useEffect(() => {
        const handler = (event) => {
          setEnabled(event.detail);
        };
        window.addEventListener(TOGGLE_EVENT, handler);
        return () => {
          window.removeEventListener(TOGGLE_EVENT, handler);
        };
      }, []);
      return import_react4.default.createElement(ModernWorkspace, { current, panelInfo: layout.panelInfo, enabled, onDismiss: dismissModernWorkspace });
    }));
  });
  ctx.slots.inject("sidebar.footer.action", () => {
    return ctx.slots.register({
      name: "sidebar.footer.action",
      id: "project-control-toggle"
    }, () => {
      const [enabled, setEnabled] = import_react4.default.useState(workspaceEnabled);
      import_react4.default.useEffect(() => {
        const handler = (event) => {
          setEnabled(event.detail);
        };
        window.addEventListener(TOGGLE_EVENT, handler);
        return () => {
          window.removeEventListener(TOGGLE_EVENT, handler);
        };
      }, []);
      return import_react4.default.createElement(
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
              if (typeof layout?.openDetails === "function") {
                if (workspaceEnabled && disposeWorkspace === void 0) registerWorkspace();
                else if (!workspaceEnabled) {
                  unregisterWorkspace();
                  layout?.closeDetails?.();
                }
              } else if (workspaceEnabled && layout.panelInfo !== void 0) {
                if (layout.panelInfo.getSnapshot().activePanelId !== null) layout.selectPanel(null);
                const rightbar = ctx.get("sidebarRight");
                if (rightbar?.isExpanded()) rightbar.toggleExpanded();
              }
            } catch (error) {
              workspaceEnabled = false;
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
    return import_react4.default.createElement(
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
      import_react4.default.createElement("div", { style: { fontWeight: 600, marginBottom: "4px" } }, title),
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
      return import_react4.default.createElement(ChangeCard, {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NsaWVudC9pbmRleC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdGhlbWUudHMiLCAiLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmtzcGFjZUZyYW1lLnRzeCIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvY29tbWl0LXJvdW5kcy50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvTW9kZXJuV29ya3NwYWNlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBDbGllbnQgcGx1Z2luIGVudHJ5IGZvciBkc2gtcHJvamVjdC1jb250cm9sLlxuICpcbiAqIFx1NUUwM1x1NUM0MFx1NjdCNlx1Njc4NFx1RkYwOFx1NURGMlx1OUE4Q1x1OEJDMVx1RkYwQzIwMjYtMDgtMzBcdUZGMDlcdUZGMUFcbiAqIC0gXHU1REU1XHU0RjVDXHU1M0YwXHU5MDZFXHU4NTNEXHU1Qjk4XHU2NUI5IGBkZXRhaWxzYCBcdTY5RkRcdUZGMDhwcmlvcml0eSAtMTBcdUZGMENcdTVCOThcdTY1QjkgRGV0YWlsc1BhbmVsIFx1NzU1OVx1NTcyOFx1OEQyNlx1NjcyQ1x1NEUwQVx1RkYwQ1xuICogICBcdTUzNzhcdThGN0RcdTYyMTFcdTRFRUNcdTc2ODRcdTZDRThcdTUxOENcdTUzNzNcdTYwNjJcdTU5MERcdUZGMDlcdUZGMENcdTZFMzJcdTY3RDNcdTU3MjhcdTRFM0JcdTY4NDZcdTY3QjYgZGV0YWlscyBcdTUyMTdcdUZGMUJcbiAqIC0gV29ya3NwYWNlRnJhbWUgXHU2Q0U4XHU1MTY1XHU2ODM3XHU1RjBGXHU4ODY4XHVGRjBDXHU2MjhBXHU1Qjk4XHU2NUI5XHU3RjUxXHU2ODNDXHU4OUM2XHU4OUM5XHU2MzYyXHU1MjE3XHVGRjFBXHU4MDRBXHU1OTI5XHVGRjA4Y2VudGVyQ29sXHVGRjA5XHU2NzAwXHU1M0YzXHUzMDAxXG4gKiAgIFx1NURFNVx1NEY1Q1x1NTNGMFx1RkYwOGRldGFpbHNDb2xcdUZGMDlcdTVDNDVcdTRFMkQgMWZyXHVGRjFCXHU2NUUwXHU0RjFBXHU4QkREXHU4NDNEXHU1NzMwXHU5ODc1XHVGRjA4ZGF0YS1kZXRhaWxzLWNvbGxhcHNlZFx1RkYwOVxuICogICBcdTgxRUFcdTUyQThcdTYwNjJcdTU5MERcdTUzOUZcdTc1MUZcdTUyMTdcdTVFOEZcdUZGMUJcbiAqIC0gXHU1REU2XHU0RkE3XHU1Qjk4XHU2NUI5XHU1QkZDXHU4MjJBXHUzMDAxXHU1Qjk4XHU2NUI5XHU4MDRBXHU1OTI5XHU2NzJDXHU0RjUzXHU5NkY2XHU2NTM5XHU1MkE4XHVGRjFCXG4gKiAtIFx1NEZBN1x1OEZCOVx1NjgwRlx1NjMwOVx1OTRBRVx1NTcyOFx1MzAwQ1x1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTNGMCBcdTIxQzQgXHU1Qjk4XHU2NUI5XHU4QkU2XHU2MEM1XHU5NzYyXHU2NzdGXHUzMDBEXHU5NUY0XHU1MjA3XHU2MzYyXHVGRjA4XHU1M0VGXHU5MDA2XHVGRjA5XHVGRjFCXG4gKiAtIGB0b29sLmNhbGwudG9vbHZpZXdgIFx1NEUzQSBhbmFseXplX2NoYW5nZSBcdTRGRERcdTc1NTlcdTRFMTNcdTVDNUVcdTUzNjFcdTcyNDdcdUZGMUJcbiAqIC0gXHU2NTg3XHU2ODQ4XHU1MTY4XHU5MEU4XHU3RUNGIGN0eC5sb2NhbGUgXHU4QkNEXHU1MTc4XHVGRjA4emggLyBlblx1RkYwOVx1MzAwMlxuICpcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2xcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDaGFuZ2VDYXJkIH0gZnJvbSAnLi9jb21wb25lbnRzL0NoYW5nZUNhcmQudHMnXG5pbXBvcnQgeyBXT1JLU1BBQ0VfRElDVCwgV29ya3NwYWNlRnJhbWUgfSBmcm9tICcuL2NvbXBvbmVudHMvV29ya3NwYWNlRnJhbWUudHN4J1xuaW1wb3J0IHsgTW9kZXJuV29ya3NwYWNlIH0gZnJvbSAnLi9jb21wb25lbnRzL01vZGVybldvcmtzcGFjZS50c3gnXG5cbmNvbnN0IE5TID0gJ3Byb2plY3QtY29udHJvbCdcblxuZXhwb3J0IGNvbnN0IG5hbWUgPSAnY2xpZW50LXByb2plY3QtY29udHJvbCdcbmV4cG9ydCBjb25zdCBpbmplY3QgPSBbJ3Nsb3RzJywgJ2xvY2FsZScsICdsYXlvdXQnXVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoY3R4OiBhbnkpOiB2b2lkIHtcbiAgY3R4LmVmZmVjdCgoKSA9PiBjdHgubG9jYWxlLnJlZ2lzdGVyKE5TLCB7IHpoOiBXT1JLU1BBQ0VfRElDVC56aCwgZW46IFdPUktTUEFDRV9ESUNULmVuIH0pLCAncHJvamVjdC1jb250cm9sOiBkaWN0aW9uYXJpZXMnKVxuICBjb25zdCBsYXlvdXQgPSBjdHgubGF5b3V0XG5cbiAgLy8gXHUyNTAwXHUyNTAwIDEuIFx1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTNGMFx1RkYxQVx1OTA2RVx1ODUzRCBkZXRhaWxzIFx1NjlGRFx1RkYwOFx1NTNFRlx1OTAwNlx1RkYwOVx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAvLyBcdTY1QjBcdTdBOTdcdTUzRTNcdTlFRDhcdThCQTRcdTRFMERcdTY2M0VcdTc5M0FcdTVERTVcdTRGNUNcdTUzRjBcdUZGMDhcdTRGRERcdTYzMDFcdTVCOThcdTY1QjlcdTUzOUZcdTc1MUZcdTg5QzZcdTg5RDJcdUZGMDlcdUZGMENcdTc1MzFcdTRGQTdcdThGQjlcdTY4MEZcdTYzMDlcdTk0QUVcdTY2M0VcdTVGMEZcdTYyNTNcdTVGMDBcdTMwMDJcbiAgbGV0IHdvcmtzcGFjZUVuYWJsZWQgPSBmYWxzZVxuICBsZXQgZGlzcG9zZVdvcmtzcGFjZTogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkXG5cbiAgY29uc3QgcmVnaXN0ZXJXb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XG4gICAgZGlzcG9zZVdvcmtzcGFjZSA9IGN0eC5zbG90cy5yZWdpc3RlcihcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2RldGFpbHMnLFxuICAgICAgICBwcmlvcml0eTogLTEwLFxuICAgICAgICBsb2NhbGU6IE5TLFxuICAgICAgfSxcbiAgICAgIC8vIFx1NjMwMlx1OEY3RFx1NTM3M1x1NjI1M1x1NUYwMCBkZXRhaWxzIFx1OEY2OFx1OTA1M1x1RkYwOFx1OTc2Mlx1Njc3Rlx1NTA0Rlx1NTk3RFx1OUVEOFx1OEJBNCAwXHVGRjA5XHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwXHU5NzAwXHU4OTgxXHU3NzFGXHU1QjlFXHU1QkJEXHU1RUE2XHVGRjFCXG4gICAgICAvLyBcdTY1RTBcdTRGMUFcdThCRERcdTg0M0RcdTU3MzBcdTk4NzVcdThGNjhcdTkwNTNcdTYwNTIgMFx1RkYwQ1x1NTkyOVx1NzEzNlx1NEZERFx1NjMwMVx1NTM5Rlx1NzUxRlx1ODJGMVx1OTZDNFx1OTg3NVx1NUUwM1x1NUM0MFx1MzAwMlxuICAgICAgLy8gXHU0RjFBXHU4QkREXHU1MjA3XHU2MzYyXHU2NUY2XHU1Qjk4XHU2NUI5XHU0RjFBIGNsb3NlRGV0YWlscyBcdTIwMTRcdTIwMTQgXHU1RUY2XHU1NDBFXHU0RTAwXHU2MkNEXHU5MUNEXHU2NUIwXHU2NDkxXHU1RjAwXHVGRjA4XHU1QjhGXHU0RUZCXHU1MkExXHU2NjVBXHU0RThFXHU3MjM2XHU3RUE3IGVmZmVjdFx1RkYwOVx1MzAwMlxuICAgICAgKHByb3BzOiBhbnkpID0+IHtcbiAgICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICBsYXlvdXQ/Lm9wZW5EZXRhaWxzPy4oKVxuICAgICAgICB9LCBbXSlcbiAgICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICBpZiAocHJvcHMuc2Vzc2lvbklkID09PSB1bmRlZmluZWQpIHJldHVyblxuICAgICAgICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiBsYXlvdXQ/Lm9wZW5EZXRhaWxzPy4oKSwgMClcbiAgICAgICAgICByZXR1cm4gKCkgPT4geyBjbGVhclRpbWVvdXQodGltZXIpIH1cbiAgICAgICAgfSwgW3Byb3BzLnNlc3Npb25JZF0pXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFdvcmtzcGFjZUZyYW1lLCB7IC4uLnByb3BzLCBrZXk6IHByb3BzLnNlc3Npb25JZCA/PyAnbGFuZGluZycsIGxheW91dCB9KVxuICAgICAgfSxcbiAgICApXG4gIH1cbiAgY29uc3QgdW5yZWdpc3RlcldvcmtzcGFjZSA9ICgpOiB2b2lkID0+IHtcbiAgICBkaXNwb3NlV29ya3NwYWNlPy4oKVxuICAgIGRpc3Bvc2VXb3Jrc3BhY2UgPSB1bmRlZmluZWRcbiAgfVxuXG4gIGN0eC5zbG90cy5pbmplY3QoJ2RldGFpbHMnLCAoKSA9PiB7XG4gICAgaWYgKHdvcmtzcGFjZUVuYWJsZWQpIHJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdW5yZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgfVxuICB9KVxuXG4gIC8vIFx1MjUwMFx1MjUwMCAyLiBcdTRGQTdcdThGQjlcdTY4MEZcdTVFOTVcdTkwRThcdUZGMUFcdTVERTVcdTRGNUNcdTUzRjAgXHUyMUM0IFx1NUI5OFx1NjVCOVx1OEJFNlx1NjBDNSBcdTUyMDdcdTYzNjIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gIC8vIFx1NjMwOVx1OTRBRVx1NzJCNlx1NjAwMVx1NjYwRVx1NzkzQVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1NjYzRVx1NzkzQVx1NEUyRCBcdTIxOTIgXHUzMDBDXHVEODNFXHVEREVEIFx1NURFNVx1NEY1Q1x1NTNGMCBcdTI3MTNcdTMwMERcdUZGMUJcdTVERjJcdTUyMDdcdTVCOThcdTY1QjlcdThCRTZcdTYwQzUgXHUyMTkyIFx1MzAwQ1x1RDgzRVx1RERFRCBcdTYyNTNcdTVGMDBcdTVERTVcdTRGNUNcdTUzRjBcdTMwMERcdTlBRDhcdTRFQUVcdUZGMENcbiAgLy8gXHU3NTI4XHU2MjM3XHU5NjhGXHU2NUY2XHU3NzBCXHU1Rjk3XHU1MjMwXHU2MDBFXHU0RTQ4XHU1MjA3XHU1NkRFXHU2NzY1XHVGRjA4XHU1MjA3XHU2MzYyXHU3RUNGIHdpbmRvdyBcdTRFOEJcdTRFRjZcdTkwMUFcdTc3RTVcdTYzMDlcdTk0QUVcdTkxQ0RcdTZFMzJcdTY3RDNcdUZGMDlcdTMwMDJcbiAgY29uc3QgVE9HR0xFX0VWRU5UID0gJ3BjLXdvcmtzcGFjZS10b2dnbGUnXG4gIGNvbnN0IGZpcmVUb2dnbGUgPSAoZW5hYmxlZDogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChUT0dHTEVfRVZFTlQsIHsgZGV0YWlsOiBlbmFibGVkIH0pKVxuICB9XG4gIGNvbnN0IGRpc21pc3NNb2Rlcm5Xb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XG4gICAgaWYgKCF3b3Jrc3BhY2VFbmFibGVkKSByZXR1cm5cbiAgICB3b3Jrc3BhY2VFbmFibGVkID0gZmFsc2VcbiAgICBmaXJlVG9nZ2xlKGZhbHNlKVxuICB9XG5cbiAgLy8gMC4yLnggXHU3Njg0XHU0RjFBXHU4QkREXHU2NzBEXHU1MkExXHU1M0VGXHU5MDA5XHU2Q0U4XHU1MTY1XHVGRjFBXHU2NUU3XHU3MjQ4XHU2Q0ExXHU2NzA5XHU2NUIwXHU3MjQ4XHU1RTAzXHU1QzQwXHU2M0E1XHU1M0UzXHVGRjBDXHU0RUNEXHU2Q0JGXHU3NTI4IGRldGFpbHMgXHU1MjA2XHU2NTJGXHUzMDAyXG4gIGN0eC5pbmplY3QoWyd1aVNlc3Npb24nXSwgKHNjb3BlOiBhbnkpID0+IHtcbiAgICBpZiAobGF5b3V0LnBhbmVsSW5mbyA9PT0gdW5kZWZpbmVkKSByZXR1cm5cbiAgICBjb25zdCBjdXJyZW50ID0gc2NvcGUudWlTZXNzaW9uLmFkYXB0ZXIuY3VycmVudFxuICAgIHNjb3BlLnNsb3RzLmluamVjdCgnc2hlbGwub3ZlcmxheScsICgpID0+IHNjb3BlLnNsb3RzLnJlZ2lzdGVyKHtcbiAgICAgIG5hbWU6ICdzaGVsbC5vdmVybGF5JywgaWQ6ICdwcm9qZWN0LWNvbnRyb2wtd29ya3NwYWNlJyxcbiAgICB9LCAoKSA9PiB7XG4gICAgICBjb25zdCBbZW5hYmxlZCwgc2V0RW5hYmxlZF0gPSBSZWFjdC51c2VTdGF0ZSh3b3Jrc3BhY2VFbmFibGVkKVxuICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IChldmVudDogRXZlbnQpOiB2b2lkID0+IHsgc2V0RW5hYmxlZCgoZXZlbnQgYXMgQ3VzdG9tRXZlbnQ8Ym9vbGVhbj4pLmRldGFpbCkgfVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpXG4gICAgICAgIHJldHVybiAoKSA9PiB7IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFRPR0dMRV9FVkVOVCwgaGFuZGxlcikgfVxuICAgICAgfSwgW10pXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChNb2Rlcm5Xb3Jrc3BhY2UsIHsgY3VycmVudCwgcGFuZWxJbmZvOiBsYXlvdXQucGFuZWxJbmZvLCBlbmFibGVkLCBvbkRpc21pc3M6IGRpc21pc3NNb2Rlcm5Xb3Jrc3BhY2UgfSlcbiAgICB9KSlcbiAgfSlcblxuICBjdHguc2xvdHMuaW5qZWN0KCdzaWRlYmFyLmZvb3Rlci5hY3Rpb24nLCAoKSA9PiB7XG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XG4gICAgICBuYW1lOiAnc2lkZWJhci5mb290ZXIuYWN0aW9uJyxcbiAgICAgIGlkOiAncHJvamVjdC1jb250cm9sLXRvZ2dsZScsXG4gICAgfSwgKCkgPT4ge1xuICAgICAgY29uc3QgW2VuYWJsZWQsIHNldEVuYWJsZWRdID0gUmVhY3QudXNlU3RhdGUod29ya3NwYWNlRW5hYmxlZClcbiAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQ6IEV2ZW50KTogdm9pZCA9PiB7IHNldEVuYWJsZWQoKGV2ZW50IGFzIEN1c3RvbUV2ZW50PGJvb2xlYW4+KS5kZXRhaWwpIH1cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoVE9HR0xFX0VWRU5ULCBoYW5kbGVyKVxuICAgICAgICByZXR1cm4gKCkgPT4geyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpIH1cbiAgICAgIH0sIFtdKVxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdidXR0b24nLFxuICAgICAgICB7XG4gICAgICAgICAgJ2RhdGEtdGVzdGlkJzogJ3Byb2plY3QtY29udHJvbC1zaWRlYmFyLXRvZ2dsZScsXG4gICAgICAgICAgdGl0bGU6IGVuYWJsZWQgPyAnXHU1RjUzXHU1MjREXHU2NjNFXHU3OTNBXHU5ODc5XHU3NkVFXHU2ODM4XHU2N0U1XHU1M0YwXHUzMDAyXHU3MEI5XHU1MUZCXHU1M0VGXHU0RTM0XHU2NUY2XHU1MjA3XHU2MzYyXHU0RTNBXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHVGRjA4XHU2N0U1XHU3NzBCXHU1REU1XHU1MTc3XHU4QzAzXHU3NTI4XHU3Njg0XHU1QjhDXHU2NTc0XHU4RjkzXHU1MTY1L1x1OEY5M1x1NTFGQVx1RkYwOVx1RkYxQlx1NTE4RFx1NzBCOVx1NjcyQ1x1NjMwOVx1OTRBRVx1NTM3M1x1NjA2Mlx1NTkwRFx1MzAwMicgOiAnXHU1RjUzXHU1MjREXHU2NjNFXHU3OTNBXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHUzMDAyXHU3MEI5XHU1MUZCXHU2MDYyXHU1OTBEXHU5ODc5XHU3NkVFXHU2ODM4XHU2N0U1XHU1M0YwXHUzMDAyJyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnNnB4JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggMTBweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgY29sb3I6IGVuYWJsZWQgPyAnaW5oZXJpdCcgOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IGVuYWJsZWQgPyA0MDAgOiA2MDAsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJywgb3BhY2l0eTogMC45LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgd29ya3NwYWNlRW5hYmxlZCA9ICF3b3Jrc3BhY2VFbmFibGVkXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIGxheW91dD8ub3BlbkRldGFpbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpZiAod29ya3NwYWNlRW5hYmxlZCAmJiBkaXNwb3NlV29ya3NwYWNlID09PSB1bmRlZmluZWQpIHJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghd29ya3NwYWNlRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgICAgdW5yZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgICAgICAgICAgICAgICBsYXlvdXQ/LmNsb3NlRGV0YWlscz8uKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAod29ya3NwYWNlRW5hYmxlZCAmJiBsYXlvdXQucGFuZWxJbmZvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAobGF5b3V0LnBhbmVsSW5mby5nZXRTbmFwc2hvdCgpLmFjdGl2ZVBhbmVsSWQgIT09IG51bGwpIGxheW91dC5zZWxlY3RQYW5lbChudWxsKVxuICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0YmFyID0gY3R4LmdldCgnc2lkZWJhclJpZ2h0JylcbiAgICAgICAgICAgICAgICBpZiAocmlnaHRiYXI/LmlzRXhwYW5kZWQoKSkgcmlnaHRiYXIudG9nZ2xlRXhwYW5kZWQoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgICAgICAgICB3b3Jrc3BhY2VFbmFibGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdbcHJvamVjdC1jb250cm9sXSB3b3Jrc3BhY2UgdG9nZ2xlIGZhaWxlZCcsIGVycm9yKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlyZVRvZ2dsZSh3b3Jrc3BhY2VFbmFibGVkKVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGVuYWJsZWQgPyAnXHVEODNFXHVEREVEIFx1NURFNVx1NEY1Q1x1NTNGMCBcdTI3MTMnIDogJ1x1RDgzRVx1RERFRCBcdTYyNTNcdTVGMDBcdTVERTVcdTRGNUNcdTUzRjAnLFxuICAgICAgKVxuICAgIH0pXG4gIH0pXG5cbiAgLy8gXHUyNTAwXHUyNTAwIDMuIFx1ODA0QVx1NTkyOVx1NURFNVx1NTE3N1x1NTM2MVx1NzI0N1x1RkYwOFx1NjI2N1x1ODg0Qy9cdThCQzRcdTVCQTEvXHU5QThDXHU2NTM2XHVGRjA5XHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gIGNvbnN0IHNpbXBsZVJlc3VsdENhcmQgPSAodGl0bGU6IHN0cmluZyk6ICgocHJvcHM6IGFueSkgPT4gYW55KSA9PiAocHJvcHM6IGFueSkgPT4ge1xuICAgIGNvbnN0IG91dHB1dCA9IHByb3BzPy5vdXRwdXRcbiAgICBjb25zdCB0ZXh0ID0gdHlwZW9mIG91dHB1dCA9PT0gJ3N0cmluZydcbiAgICAgID8gb3V0cHV0XG4gICAgICA6IG91dHB1dD8uc3VtbWFyeSA/PyBvdXRwdXQ/Lmlzc3VlcyA/PyBvdXRwdXQ/LmRldGFpbHMgPz8gKG91dHB1dCA/IEpTT04uc3RyaW5naWZ5KG91dHB1dCwgbnVsbCwgMikgOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHUyMDI2JylcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICdkaXYnLFxuICAgICAge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICBwYWRkaW5nOiAnMTBweCAxMnB4JyxcbiAgICAgICAgICBtYXJnaW46ICc0cHggMCcsXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXG4gICAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjYsXG4gICAgICAgICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyxcbiAgICAgICAgICBtYXhIZWlnaHQ6IDI2MCxcbiAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnNHB4JyB9IH0sIHRpdGxlKSxcbiAgICAgIFN0cmluZyh0ZXh0KSxcbiAgICApXG4gIH1cblxuICAvLyBcdTI1MDBcdTI1MDAgMy4gYW5hbHl6ZV9jaGFuZ2UgXHU0RTEzXHU1QzVFXHU1REU1XHU1MTc3XHU1MzYxXHU3MjQ3IFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICBjdHguc2xvdHMuaW5qZWN0KCd0b29sLmNhbGwudG9vbHZpZXcnLCAoKSA9PiB7XG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XG4gICAgICBuYW1lOiAndG9vbC5jYWxsLnRvb2x2aWV3JyxcbiAgICAgIGtleTogJ2FuYWx5emVfY2hhbmdlJyxcbiAgICB9LCAocHJvcHM6IGFueSkgPT4ge1xuICAgICAgaWYgKHByb3BzPy50b29sTmFtZSAhPT0gJ2FuYWx5emVfY2hhbmdlJykgcmV0dXJuIG51bGxcbiAgICAgIGNvbnN0IG91dHB1dCA9IHByb3BzPy5vdXRwdXRcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENoYW5nZUNhcmQsIHtcbiAgICAgICAgdGl0bGU6ICdcdTUzRDhcdTY2RjRcdTUyMDZcdTY3OTBcdTYyQTVcdTU0NEEgKENoYW5nZSBBbmFseXNpcyknLFxuICAgICAgICBmaWxlc0NoYW5nZWQ6IG91dHB1dD8uZmlsZXNDaGFuZ2VkID8/IDAsXG4gICAgICAgIGluc2VydGlvbnM6IG91dHB1dD8uaW5zZXJ0aW9ucyA/PyAwLFxuICAgICAgICBkZWxldGlvbnM6IG91dHB1dD8uZGVsZXRpb25zID8/IDAsXG4gICAgICAgIGV2aWRlbmNlSWQ6IG91dHB1dD8uZXZpZGVuY2VJZCxcbiAgICAgICAgc3RhdHVzOiBvdXRwdXQgPyAnY29tcGxldGVkJyA6ICdhbmFseXppbmcnLFxuICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG4gIGZvciAoY29uc3QgW3Rvb2xLZXksIHRpdGxlXSBvZiBbXG4gICAgWydzdGFydF9ydW4nLCAnXHVEODNEXHVERTgwIFx1NjI2N1x1ODg0QyBSdW4nXSxcbiAgICBbJ3J1bl9yZXZpZXcnLCAnXHVEODNEXHVERDBEIFx1NEVFM1x1NzgwMVx1OEJDNFx1NUJBMSddLFxuICAgIFsncnVuX3ZlcmlmaWNhdGlvbicsICdcdTI3MDUgXHU5QThDXHU2NTM2XHU5QThDXHU4QkMxJ10sXG4gIF0gYXMgY29uc3QpIHtcbiAgICBjdHguc2xvdHMuaW5qZWN0KCd0b29sLmNhbGwudG9vbHZpZXcnLCAoKSA9PiB7XG4gICAgICByZXR1cm4gY3R4LnNsb3RzLnJlZ2lzdGVyKHsgbmFtZTogJ3Rvb2wuY2FsbC50b29sdmlldycsIGtleTogdG9vbEtleSB9LCBzaW1wbGVSZXN1bHRDYXJkKHRpdGxlKSlcbiAgICB9KVxuICB9XG59XG4iLCAiLyoqXHJcbiAqIFJlYWN0IENvbXBvbmVudDogQ2hhbmdlIC8gSW5zaWdodCBDYXJkIGZvciBDaGF0IFZpZXcuXHJcbiAqIFJlbmRlcnMgc3RydWN0dXJlZCBpbnNpZ2h0cywgZGlmZiBzdGF0aXN0aWNzLCBhbmQgZXZpZGVuY2UgYmFkZ2VzLlxyXG4gKlxyXG4gKiBcdTk4OUNcdTgyNzJcdThENzAgZHN3LWFsaWFzIFx1NEUzQlx1OTg5OFx1NTNEOFx1OTFDRiArIHRoZW1lQXdhcmVUZXh0IFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYxQVxyXG4gKiBcdTZCNjRcdTUyNERcdTc1MjhcdTc2ODQgYC0tZHNoLSpgIFx1NTNEOFx1OTFDRlx1NTcyOFx1NUJCRlx1NEUzQlx1OTFDQ1x1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1NjgzN1x1NUYwRlx1NkMzOFx1OEZEQ1x1ODQzRFx1NTcyOFx1NkRGMVx1ODI3Mlx1NTE1Q1x1NUU5NVx1NEUwQVx1RkYwQ1xyXG4gKiBcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTRFMEJcdTgwNEFcdTU5MjlcdTZENDFcdTkxQ0NcdTUxRkFcdTczQjBcdTdBODFcdTUxNDBcdTlFRDFcdTUzNjFcdUZGMUJcdTY1NzBcdTVCNTdcdTdFRkYvXHU3RUEyXHU0RTVGXHU2NjJGXHU2REYxXHU4MjcyXHU1NDExXHU5MTREXHU4MjcyXHVGRjBDXHU3NjdEXHU1RTk1XHU0RTBEXHU1M0VGXHU4QkZCXHUzMDAyXHJcbiAqXHJcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9DaGFuZ2VDYXJkXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyB0aGVtZUF3YXJlVGV4dCB9IGZyb20gJy4vdGhlbWUudHMnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUNhcmRQcm9wcyB7XHJcbiAgdGl0bGU/OiBzdHJpbmdcclxuICBmaWxlc0NoYW5nZWQ/OiBudW1iZXJcclxuICBpbnNlcnRpb25zPzogbnVtYmVyXHJcbiAgZGVsZXRpb25zPzogbnVtYmVyXHJcbiAgZXZpZGVuY2VJZD86IHN0cmluZ1xyXG4gIHN0YXR1cz86IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ2hhbmdlQ2FyZDogUmVhY3QuRkM8Q2hhbmdlQ2FyZFByb3BzPiA9ICh7XHJcbiAgdGl0bGUgPSAnQ2hhbmdlIEluc2lnaHQnLFxyXG4gIGZpbGVzQ2hhbmdlZCA9IDAsXHJcbiAgaW5zZXJ0aW9ucyA9IDAsXHJcbiAgZGVsZXRpb25zID0gMCxcclxuICBldmlkZW5jZUlkLFxyXG4gIHN0YXR1cyA9ICdhbmFseXplZCcsXHJcbn0pID0+IHtcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICdkaXYnLFxyXG4gICAge1xyXG4gICAgICAnZGF0YS10ZXN0aWQnOiAncHJvamVjdC1jb250cm9sLWNoYW5nZS1jYXJkJyxcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgcGFkZGluZzogJzEwcHggMTRweCcsXHJcbiAgICAgICAgbWFyZ2luOiAnNnB4IDAnLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXHJcbiAgICAgICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgICAgIGZvbnRTaXplOiAnMTNweCcsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgJ2RpdicsXHJcbiAgICAgIHtcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBudWxsLCBgXHVEODNEXHVERDBEICR7dGl0bGV9YCksXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgJ3NwYW4nLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHggNnB4JyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJnLWluc2V0LCByZ2JhKDUsNSw1LDAuMDYpKScsXHJcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgKSxcclxuICAgICksXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEycHgnLCBmb250U2l6ZTogJzEycHgnLCBvcGFjaXR5OiAwLjkgfSB9LFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgbnVsbCwgYFx1RDgzRFx1RENDMSAke2ZpbGVzQ2hhbmdlZH0gZmlsZXNgKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjMWE3ZjM3JykgfSB9LCBgKyR7aW5zZXJ0aW9uc31gKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2YyMjJlJykgfSB9LCBgLSR7ZGVsZXRpb25zfWApLFxyXG4gICAgICBldmlkZW5jZUlkXHJcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgICAnc3BhbicsXHJcbiAgICAgICAgICAgIHsgc3R5bGU6IHsgb3BhY2l0eTogMC43LCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyB9IH0sXHJcbiAgICAgICAgICAgIGBbJHtldmlkZW5jZUlkfV1gLFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIDogbnVsbCxcclxuICAgICksXHJcbiAgKVxyXG59XHJcbiIsICIvKipcbiAqIFx1NUJBMlx1NjIzN1x1N0FFRlx1NEUzQlx1OTg5OFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYwOFx1NkRGMVx1NkQ0NVx1NTNDQ1x1NEUzQlx1OTg5OFx1NTE3MVx1NzUyOFx1NzY4NFx1NTUyRlx1NEUwMFx1NUI5RVx1NzNCMFx1RkYwOVx1MzAwMlxuICpcbiAqIFx1NEUwRFx1NTNEOFx1NUYwRlx1RkYwODIwMjYtMDktMTAgXHU2REYxXHU4MjcyXHU2QTIxXHU1RjBGXHUzMDBDXHU5ODc1XHU3QjdFXHU3NjdEXHU1NzU3XHUzMDBEXHU0RThCXHU2NTQ1XHU1NDBFXHU1NkZBXHU1MzE2XHVGRjBDXHU1MTY4XHU1QkEyXHU2MjM3XHU3QUVGXHU1RkM1XHU5ODdCXHU5MDc1XHU1Qjg4XHVGRjA5XHVGRjFBXG4gKiAxLiBcdTk2OEZcdTRFM0JcdTk4OThcdTUzRDhcdTUzMTZcdTc2ODRcdTVGM0FcdThDMDNcdTgyNzJcdTY1ODdcdTVCNTdcdTVGQzVcdTk4N0JcdTdFQ0YgdGhlbWVBd2FyZVRleHQoKVx1RkYxQVx1NkQ0NVx1ODI3Mlx1NEUzQlx1OTg5OFx1ODFFQVx1NTJBOFx1NkRGMVx1NTMxNlx1NTIzMFx1NzY3RFx1NUU5NVxuICogICAgXHU1QkY5XHU2QkQ0XHU1RUE2IFx1MjI2NTQuNToxXHVGRjBDXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU4MUVBXHU1MkE4XHU2M0QwXHU0RUFFXHU1MjMwXHU2REYxXHU1RTk1IFx1MjI2NTQuNToxXHUzMDAyXHU5ODdCXHU1NzI4XHU2RTMyXHU2N0QzXHU2NzFGXHU4QzAzXHU3NTI4XHVGRjA4XHU3RUM0XHU0RUY2XHU0RjUzXHU1MTg1L1xuICogICAgXHU2RTMyXHU2N0QzXHU1MUZEXHU2NTcwXHU1MTg1XHVGRjA5XHVGRjBDXHU0RTNCXHU5ODk4XHU1MjA3XHU2MzYyXHU1NDBFXHU5NjhGXHU5MUNEXHU2RTMyXHU2N0QzXHU4MUVBXHU1MkE4XHU2NkY0XHU2NUIwXHVGRjFCXHU3OTgxXHU2QjYyXHU1NzI4XHU2QTIxXHU1NzU3XHU1MkEwXHU4RjdEXHU2NzFGXHU2QzQyXHU1MDNDXHU1NDBFXHU1QjU4XHU4RkRCXG4gKiAgICBcdTk3NTlcdTYwMDFcdTY4MzdcdTVGMEZcdTVCRjlcdThDNjFcdTMwMDJcbiAqIDIuIGFjdGl2ZSBcdTlBRDhcdTRFQUVcdTgwQ0NcdTY2NkZcdUZGMDhcdTYzMDlcdTk0QUUgLyBcdTk4NzVcdTdCN0UgLyBcdTdCNUJcdTkwMDlcdTgyQUZcdTcyNDdcdTdCNDlcdTRFMDBcdTUyMDdcIlx1OTAwOVx1NEUyRFx1NTM3M1x1NTg2Qlx1ODI3MlwiXHU3Njg0XHU4ODY4XHU5NzYyXHVGRjA5XHU0RTAwXHU1RjhCXHU3NTI4XG4gKiAgICBgdmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpYFx1RkYwOFx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1NEUwQlx1OTBGRFx1NjYyRlx1ODRERFx1ODI3Mlx1RkYwOVx1RkYwQ1x1OTE0RFx1NzY3RFx1NUI1N1x1MzAwMlxuICogICAgXHU3OTgxXHU2QjYyXHU3NTI4IC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnkgXHU0RjVDXHU4MENDXHU2NjZGXHUyMDE0XHUyMDE0XHU1QjgzXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RjFBXHU4OEFCXG4gKiAgICBcdTVCOENcdTUxNjhcdTU0MUVcdTYzODlcdUZGMDhcdTY3MkNcdTZCMjFcdTRFOEJcdTY1NDVcdTY4MzlcdTU2RTBcdUZGMDlcdTMwMDJcbiAqIDMuIFx1NjVFMFx1NkNENVx1ODlFM1x1Njc5MFx1NzY4NFx1OTg5Q1x1ODI3Mlx1RkYwOENTUyBcdTUzRDhcdTkxQ0ZcdTdCNDlcdUZGMDlcdTUzOUZcdTY4MzdcdThGRDRcdTU2REVcdUZGMUFcdTUzRDhcdTkxQ0ZcdTgyNzJcdTRFQTRcdTc1MzFcdTVCQkZcdTRFM0JcdTRFM0JcdTk4OThcdTdDRkJcdTdFREZcdTRGRERcdThCQzFcdTUzRUZcdThCRkJcdUZGMENcbiAqICAgIFx1NEY0Nlx1NzUzMVx1NkI2NFx1NUI4M1x1NEVFQ1x1NEUwRFx1NUY5N1x1NEUwRVx1Nzg2Q1x1N0YxNlx1NzgwMVx1NTI0RFx1NjY2Rlx1ODI3Mlx1NTNFMFx1NTJBMFx1NEY3Rlx1NzUyOFx1MzAwMlxuICovXG5cbi8qKiBcdTg5RTNcdTY3OTAgI3JyZ2diYiBcdTYyMTYgcmdiKCkvcmdiYSgpIFx1OTg5Q1x1ODI3Mlx1NTI0RFx1NEUwOVx1NEUyQVx1NTIwNlx1OTFDRlx1NEUzQSBbciwgZywgYl1cdUZGMUJcdTY1RTBcdTZDRDVcdTg5RTNcdTY3OTBcdThGRDRcdTU2REUgbnVsbFx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29sb3IoY29sb3I6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IG51bGwge1xuICBjb25zdCBoZXggPSAvXiMoWzAtOWEtZl17Nn0pJC9pLmV4ZWMoY29sb3IpXG4gIGlmIChoZXggIT09IG51bGwpIHtcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlci5wYXJzZUludChoZXhbMV0hLCAxNilcbiAgICByZXR1cm4gWyh2YWx1ZSA+PiAxNikgJiAyNTUsICh2YWx1ZSA+PiA4KSAmIDI1NSwgdmFsdWUgJiAyNTVdXG4gIH1cbiAgY29uc3QgZnVuY3Rpb25hbCA9IC9ecmdiYT9cXChcXHMqKFxcZHsxLDN9KVssXFxzXSsoXFxkezEsM30pWyxcXHNdKyhcXGR7MSwzfSkvaS5leGVjKGNvbG9yKVxuICBpZiAoZnVuY3Rpb25hbCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBbTnVtYmVyKGZ1bmN0aW9uYWxbMV0pLCBOdW1iZXIoZnVuY3Rpb25hbFsyXSksIE51bWJlcihmdW5jdGlvbmFsWzNdKV1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG4vKiogV0NBRyBcdTc2RjhcdTVCRjlcdTRFQUVcdTVFQTZcdUZGMDgwPVx1OUVEMVx1RkYwQzE9XHU3NjdEXHVGRjA5XHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gcmVsYXRpdmVMdW1pbmFuY2UocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IGNoYW5uZWwgPSAodmFsdWU6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdiA9IHZhbHVlIC8gMjU1XG4gICAgcmV0dXJuIHYgPD0gMC4wMzkyOCA/IHYgLyAxMi45MiA6ICgodiArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjRcbiAgfVxuICByZXR1cm4gMC4yMTI2ICogY2hhbm5lbChyKSArIDAuNzE1MiAqIGNoYW5uZWwoZykgKyAwLjA3MjIgKiBjaGFubmVsKGIpXG59XG5cbi8qKiBcdTZERjFcdTUzMTZcdTk4OUNcdTgyNzJcdTc2RjRcdTUyMzBcdTc2N0RcdTVFOTVcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgIzFmMjMyOCBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA+IDAuMTgzOyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4MWYgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHgyMyAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHgyOCAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqIFx1NjNEMFx1NEVBRVx1OTg5Q1x1ODI3Mlx1NzZGNFx1NTIzMFx1NkRGMVx1NUU5NVx1RkYwOCMxNTE1MTdcdUZGMDlcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgI2YwZjZmYyBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpZ2h0ZW5Gb3JEYXJrQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA8IDAuMjE0OyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4ZjAgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHhmNiAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHhmYyAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqXG4gKiBcdTRFM0JcdTk4OThcdTgxRUFcdTkwMDJcdTVFOTRcdTY1ODdcdTVCNTdcdTgyNzJcdUZGMUFcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTZERjFcdTUzMTZcdTUyMzBcdTc2N0RcdTVFOTUgXHUyMjY1NC41OjFcdUZGMUJcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTYzRDBcdTRFQUVcdTUyMzBcdTZERjFcdTVFOTUgXHUyMjY1NC41OjFcbiAqIFx1RkYwOFx1NkRGMVx1ODI3Mlx1NUI1N1x1NTk4MiAjNTc2MDZhIFx1NzZGNFx1NjNBNVx1NjUzRVx1NkRGMVx1NUU5NVx1NTQwQ1x1NjgzN1x1NEUwRFx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlx1NjI0MFx1NjcwOVx1NUYzQVx1OEMwM1x1ODI3Mlx1NjU4N1x1NjcyQ1x1N0VERlx1NEUwMFx1OEQ3MFx1OEZEOVx1OTFDQ1x1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhlbWVBd2FyZVRleHQoY29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJnYiA9IHBhcnNlQ29sb3IoY29sb3IpXG4gIGlmIChyZ2IgPT09IG51bGwpIHJldHVybiBjb2xvclxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5ib2R5Py5oYXNBdHRyaWJ1dGU/LignZGF0YS1kcy1kYXJrLXRoZW1lJykgPT09IHRydWUpIHtcbiAgICByZXR1cm4gbGlnaHRlbkZvckRhcmtCYWNrZ3JvdW5kKHJnYlswXSwgcmdiWzFdLCByZ2JbMl0pXG4gIH1cbiAgcmV0dXJuIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyZ2JbMF0sIHJnYlsxXSwgcmdiWzJdKVxufVxuIiwgIi8qKlxuICogUHJvamVjdCBDb250cm9sIFx1NURFNVx1NEY1Q1x1NTNGMFx1RkYwOFdvcmtzcGFjZUZyYW1lXHVGRjA5djJcdUZGMUFcdTU2RjRcdTdFRDVcIlx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVwiXHU3RUM0XHU3RUM3XHUzMDAyXG4gKlxuICogXHU1NkRCXHU0RTJBXHU5ODc1XHU3QjdFXHVGRjFBXG4gKiAxLiBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdUZGMDhcdTlFRDhcdThCQTRcdUZGMDlcdUZGMUFcdTRFRDNcdTVFOTNcdTY4MEZcdUZGMDhcdTU5MUFcdTRFRDNcdTVFOTNcdTUyMDdcdTYzNjJcdUZGMDkrIFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1RkYwOFx1NTQyQlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOStcbiAqICAgIFx1OEJFNlx1NjBDNVx1OTc2Mlx1Njc3Rlx1RkYwOEFJIFx1ODlFM1x1OEJGQlx1RkYxQVx1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OC9cdTVCOUVcdTczQjBcdTkwM0JcdThGOTEvXHU5OENFXHU5NjY5XHVGRjFCXHU0RTA5XHU3RUE3XHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0IFNWRyBcdTU2RkVcdUZGMUJcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdUZGMDlcdTMwMDJcbiAqIDIuIFx1OTg3OVx1NzZFRVx1NjAzQlx1ODlDOFx1RkYxQVx1OTg3OVx1NzZFRVx1Njg2M1x1Njg0OCArIFx1NUZFQlx1NjM3N1x1NjRDRFx1NEY1QyArIFx1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1RiArIFx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1MzAwMlxuICogMy4gXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHVGRjFBUnVuIFx1OEZEQlx1NUVBNlx1NEUwRVx1NjIxMFx1NjcyQ1x1MzAwMlxuICogNC4gXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHVGRjFBXHU2ODM4XHU2N0U1XHU3QjE0XHU4QkIwXHVGRjA4XHU1M0VGXHU1MTczXHU4MDU0XHU2M0QwXHU0RUE0XHVGRjA5KyBcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdUZGMDhcdTRFQkFcdTVERTVcdTc4NkVcdThCQTRcdUZGMDkrIFx1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNSArIFJldmlldy9cdTlBOENcdTY1MzZcdThCQjBcdTVGNTVcdTMwMDJcbiAqXG4gKiBcdTVFMDNcdTVDNDBcdTY3M0FcdTUyMzZcdTRFMERcdTUzRDhcdUZGMUFcdTkwNkVcdTg1M0RcdTVCOThcdTY1QjkgZGV0YWlscyBcdTY5RkQgKyBcdTZDRThcdTUxNjVcdTY4MzdcdTVGMEZcdTYzNjJcdTUyMTdcdUZGMDhcdTgwNEFcdTU5MjlcdTY3MDBcdTUzRjNcdUZGMDkrIFx1NTIwNlx1OTY5NFx1Njc2MVx1NjJENlx1NjJGRFx1OEJCMFx1NUZDNlx1RkYxQlxuICogXHU3RURGXHU4QkExXHU4ODRDXHU0RTI0XHU4ODRDXHU5NEIzXHU1MjM2XHU3NTMxXHU4RkQwXHU4ODRDXHU2NUY2XHU2MzA5XHU2Nzg0XHU1RUZBXHU1NEM4XHU1RTBDXHU3Q0JFXHU1MUM2XHU2Q0U4XHU1MTY1XHVGRjA4YXBwbHlTdGF0c0xpbmVDbGFtcFx1RkYwOVx1MzAwMlxuICpcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9Xb3Jrc3BhY2VGcmFtZVxuICovXG5cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHBhcnNlQ29sb3IsIHRoZW1lQXdhcmVUZXh0IH0gZnJvbSAnLi90aGVtZS50cydcbmltcG9ydCB7IGNsdXN0ZXJJbnRvUm91bmRzIH0gZnJvbSAnLi9jb21taXQtcm91bmRzLnRzJ1xuXG4vKiogXHU1QkJGXHU0RTNCIC9zdGF0ZSBcdThGRDRcdTU2REVcdTc2ODRcdTVGRUJcdTcxNjdcdTVGNjJcdTcyQjZcdUZGMDhcdTRFMEUgYXBpLXJvdXRlLnRzIGJ1aWxkU3RhdGUgXHU1QkY5XHU5RjUwXHVGRjA5XHUzMDAyICovXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZVN0YXRlIHtcbiAgcmVhZHk/OiBib29sZWFuXG4gIHJlYXNvbj86IHN0cmluZ1xuICBwbHVnaW5WZXJzaW9uPzogc3RyaW5nXG4gIHByb2plY3Q/OiB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgcm9vdFBhdGg6IHN0cmluZzsgY3JlYXRlZEF0OiBudW1iZXIgfSB8IG51bGxcbiAgY2hhbmdlcz86IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZzsgc291cmNlOiBzdHJpbmc7IHVwZGF0ZWRBdDogbnVtYmVyIH0+XG4gIHJ1bnM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBzdGFydGVkQXQ6IG51bWJlciB8IG51bGw7IGZpbmlzaGVkQXQ6IG51bWJlciB8IG51bGw7IGNvc3RVc2Q/OiBudW1iZXI7IHN0ZXBzVG90YWw/OiBudW1iZXI7IHN0ZXBzRG9uZT86IG51bWJlcjsgY3VycmVudFN0ZXA/OiBzdHJpbmcgfCBudWxsIH0+XG4gIGF0dGVtcHRzQ291bnQ/OiBudW1iZXJcbiAgbWVtb3JpZXM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHByb2plY3RJZDogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRydXRoTGV2ZWw6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29udGVudD86IHN0cmluZzsgaXNIdW1hbkNvbmZpcm1lZDogYm9vbGVhbjsgZ2l0QnJhbmNoOiBzdHJpbmcgfCBudWxsOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxuICBldmlkZW5jZUNvdW50PzogbnVtYmVyXG4gIHJlY2VudEV2aWRlbmNlPzogQXJyYXk8eyBpZDogc3RyaW5nOyBzb3VyY2U6IHN0cmluZzsgdHJ1dGhMZXZlbDogc3RyaW5nOyBsb2NhdG9yOiBzdHJpbmc7IHNuaXBwZXQ6IHN0cmluZzsgY3JlYXRlZEF0OiBudW1iZXIgfT5cbiAgcmVzb2x2ZWRJc3N1ZVJldGVudGlvbkRheXM/OiBudW1iZXJcbiAgaW1wb3J0ZWRDaGFuZ2VzPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb21taXRDb3VudDogbnVtYmVyOyBmaXJzdENvbW1pdEF0OiBudW1iZXI7IGxhc3RDb21taXRBdDogbnVtYmVyOyBjb25maWRlbmNlOiBudW1iZXI7IHN0YXR1czogc3RyaW5nIH0+XG4gIGlzc3Vlcz86IEFycmF5PHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgc2V2ZXJpdHk6IHN0cmluZzsgY2F0ZWdvcnk6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmcgfT5cbiAgdmVyaWZpY2F0aW9ucz86IEFycmF5PHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxuICBib290c3RyYXA/OiB7IGlkOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgdGVjaFN0YWNrOiBzdHJpbmdbXTsgbWFuaWZlc3RGaWxlczogc3RyaW5nW107IHN5bWJvbHNDb3VudDogbnVtYmVyOyBjcmVhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxuICBjb25maXJtZWQ/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgdGV4dDogc3RyaW5nOyBmb3JiaWRkZW5QYXRoczogc3RyaW5nW10gfT5cbiAgY29uY2VwdHM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY2F0ZWdvcnk6IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZzsgb2NjdXJyZW5jZXM6IG51bWJlciB9PlxufVxuXG4vKiogR0VUIC9jb21taXRzIFx1NzY4NFx1NjNEMFx1NEVBNFx1Njc2MVx1NzZFRVx1MzAwMiAqL1xuaW50ZXJmYWNlIENvbW1pdEVudHJ5IHtcbiAgc2hhOiBzdHJpbmdcbiAgc2hvcnRIYXNoOiBzdHJpbmdcbiAgYXV0aG9yOiBzdHJpbmdcbiAgZGF0ZTogbnVtYmVyXG4gIHN1YmplY3Q6IHN0cmluZ1xuICBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IGFkZHM6IG51bWJlcjsgZGVsczogbnVtYmVyIH0+XG59XG5cbmludGVyZmFjZSBDb21taXRzUGF5bG9hZCB7XG4gIHJvb3RQYXRoOiBzdHJpbmdcbiAgYnJhbmNoOiBzdHJpbmcgfCBudWxsXG4gIGhlYWRTaGE6IHN0cmluZyB8IG51bGxcbiAgd29ya2luZzogeyBmaWxlQ291bnQ6IG51bWJlcjsgaXNDbGVhbjogYm9vbGVhbjsgZmlsZXM6IEFycmF5PHsgcGF0aDogc3RyaW5nOyBzdGF0dXM6IHN0cmluZyB9PiB9XG4gIGNvbW1pdHM6IENvbW1pdEVudHJ5W11cbn1cblxuaW50ZXJmYWNlIENvbW1pdERldGFpbFBheWxvYWQge1xuICBzaGE6IHN0cmluZ1xuICBpc1dvcmtpbmc6IGJvb2xlYW5cbiAgZmlsZXM6IEFycmF5PHsgcGF0aDogc3RyaW5nOyBhZGRzOiBudW1iZXI7IGRlbHM6IG51bWJlciB9PlxuICBpbnNlcnRpb25zOiBudW1iZXJcbiAgZGVsZXRpb25zOiBudW1iZXJcbiAgcGF0Y2hUcnVuY2F0ZWQ6IGJvb2xlYW5cbiAgcGF0Y2g6IHN0cmluZ1xuICBjb21taXQ6IHsgbWVzc2FnZTogc3RyaW5nOyBhdXRob3I6IHN0cmluZzsgZGF0ZTogbnVtYmVyIH0gfCBudWxsXG4gIGFuYWx5c2lzOiB7IHdoYXQ6IHN0cmluZzsgbG9naWM6IHN0cmluZ1tdOyByaXNrczogc3RyaW5nW10gfVxuICBhbmFseXNpc0NhY2hlZD86IGJvb2xlYW5cbiAgYW5hbHlzaXNHZW5lcmF0ZWRBdD86IG51bWJlciB8IG51bGxcbiAgLyoqIFx1NjcyQ1x1NkIyMVx1ODlFM1x1OEJGQlx1NzY4NCBMTE0gXHU2MjEwXHU2NzJDXHVGRjA4XHU0RjMwXHVGRjBDVVNEXHVGRjA5XHVGRjFCXHU3RjEzXHU1QjU4XHU2NzJBXHU1RTI2XHU2MjEwXHU2NzJDL1x1NjcyQVx1NEVBN1x1NzUxRlx1OEMwM1x1NzUyOFx1NjVGNlx1N0YzQVx1NzcwMVx1MzAwMiAqL1xuICBhbmFseXNpc0Nvc3RVc2Q/OiBudW1iZXJcbiAgYW5hbHlzaXNUb2tlbnM/OiB7IGlucHV0OiBudW1iZXI7IG91dHB1dDogbnVtYmVyOyB0b3RhbDogbnVtYmVyIH1cbn1cblxuaW50ZXJmYWNlIEltcGFjdFNjb3BlUGF5bG9hZCB7XG4gIGNoYW5nZWRGaWxlczogc3RyaW5nW11cbiAgc2hhcz86IHN0cmluZ1tdXG4gIHJpc2tMZXZlbDogJ2xvdycgfCAnbWVkaXVtJyB8ICdoaWdoJyB8ICdjcml0aWNhbCdcbiAgcmlza1Njb3JlOiBudW1iZXJcbiAgcmlza0ZhY3RvcnM/OiBBcnJheTx7IHRleHQ6IHN0cmluZzsgcG9pbnRzOiBudW1iZXIgfT5cbiAga2V5Q2hhbmdlUG9pbnRzPzogc3RyaW5nW11cbiAgbWVtb3JpZXM/OiBBcnJheTx7IHRpdGxlOiBzdHJpbmc7IHR5cGU6IHN0cmluZyB9PlxuICBmdW5jdGlvbkltcGFjdD86IEFycmF5PHtcbiAgICBzeW1ib2w6IHN0cmluZ1xuICAgIGRlZmluZWRJbjogc3RyaW5nXG4gICAgcm9sZT86IHN0cmluZ1xuICAgIGNoYW5nZT86IHN0cmluZ1xuICAgIGltcGFjdD86IHN0cmluZ1xuICAgIGNhbGxlcnM6IEFycmF5PHsgZmlsZTogc3RyaW5nOyBsaW5lOiBzdHJpbmc7IHNuaXBwZXQ6IHN0cmluZyB9PlxuICB9PlxuICBsZXZlbHM6IEFycmF5PHsgbGV2ZWw6IHN0cmluZzsgZGVwdGg6IG51bWJlcjsgcGF0aDogc3RyaW5nOyBjb25maWRlbmNlOiBudW1iZXI7IHJlYXNvbjogc3RyaW5nIH0+XG4gIGRpcmVjdDogc3RyaW5nW11cbiAgZXhwbGFuYXRpb25zQ2FjaGVkPzogYm9vbGVhblxuICBnZW5lcmF0ZWRBdD86IG51bWJlciB8IG51bGxcbiAgLyoqIFx1NTFGRFx1NjU3MFx1N0VBN1x1OEJGNFx1NjYwRVx1OTBBM1x1NkIyMSBMTE0gXHU4QzAzXHU3NTI4XHU3Njg0XHU2MjEwXHU2NzJDXHVGRjA4XHU0RjMwXHVGRjBDVVNEXHVGRjA5XHUzMDAyICovXG4gIGV4cGxhbmF0aW9uc0Nvc3RVc2Q/OiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXZpZXdQYXlsb2FkIHtcbiAgaXNzdWVzRm91bmQ6IG51bWJlclxuICBpc3N1ZXM6IHN0cmluZ1xuICB2ZXJkaWN0OiBzdHJpbmdcbiAgY2FjaGVkPzogYm9vbGVhblxuICBnZW5lcmF0ZWRBdD86IG51bWJlciB8IG51bGxcbiAgY29zdFVzZD86IG51bWJlclxuICBpc3N1ZUxpc3Q/OiBBcnJheTx7IHNldmVyaXR5OiBzdHJpbmc7IGNhdGVnb3J5OiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGV2aWRlbmNlOiBzdHJpbmc7IGZpeDogc3RyaW5nIH0+XG59XG5cbmludGVyZmFjZSBOb3RlRW50cnkge1xuICBpZDogc3RyaW5nXG4gIHByb2plY3RJZDogc3RyaW5nXG4gIHNoYT86IHN0cmluZ1xuICB0aXRsZTogc3RyaW5nXG4gIGNvbnRlbnQ6IHN0cmluZ1xuICB0YWdzPzogc3RyaW5nW11cbiAgcGlubmVkPzogYm9vbGVhblxuICBjcmVhdGVkQXQ6IG51bWJlclxuICB1cGRhdGVkQXQ/OiBudW1iZXJcbn1cblxuLyoqIEdFVCAvaXNzdWVzIFx1NzY4NFx1OEJDNFx1NUJBMVx1OTVFRVx1OTg5OFx1Njc2MVx1NzZFRVx1RkYwOFJldmlldyBcdTk1RUVcdTk4OThcdTk4NzVcdTdCN0VcdTY1NzBcdTYzNkVcdTZFOTBcdUZGMDlcdTMwMDIgKi9cbmludGVyZmFjZSBJc3N1ZUVudHJ5IHtcbiAgaWQ6IHN0cmluZ1xuICBjaGFuZ2VJZDogc3RyaW5nXG4gIHNldmVyaXR5OiBzdHJpbmdcbiAgY2F0ZWdvcnk6IHN0cmluZ1xuICB0aXRsZTogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgc3RhdHVzOiBzdHJpbmdcbiAgcmVzb2x1dGlvbjogc3RyaW5nXG4gIGZpeFN0YXRzOiB7IGZpbGVzOiBudW1iZXI7IGluc2VydGlvbnM6IG51bWJlcjsgZGVsZXRpb25zOiBudW1iZXIgfSB8IG51bGxcbiAgZml4RmlsZXM6IHN0cmluZ1tdXG4gIGZpeEltcGFjdDogQXJyYXk8eyBzeW1ib2w6IHN0cmluZzsgZGVmaW5lZEluOiBzdHJpbmc7IGNhbGxlcnM6IEFycmF5PHsgZmlsZTogc3RyaW5nOyBsaW5lOiBzdHJpbmc7IHNuaXBwZXQ6IHN0cmluZyB9PiB9PlxuICBmaXhEaWZmOiBzdHJpbmdcbiAgY3JlYXRlZEF0OiBudW1iZXJcbiAgdXBkYXRlZEF0OiBudW1iZXJcbn1cblxuLyoqIFx1NEZFRVx1NTkwRFx1NURFRVx1NUYwMlx1NzY4NFx1ODg0Q1x1N0VBN1x1Nzc0MFx1ODI3Mlx1NkUzMlx1NjdEM1x1RkYxQSsgXHU3RUZGXHUzMDAxLSBcdTdFQTJcdTMwMDFcdTY1ODdcdTRFRjZcdTU5MzRcdTUyQTBcdTdDOTdcdTMwMDFcdTUxNzZcdTRGNTlcdTVGMzFcdTUzMTZcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlbmRlckRpZmZMaW5lcyhkaWZmOiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XG4gIGlmICh0eXBlb2YgZGlmZiAhPT0gJ3N0cmluZycgfHwgZGlmZiA9PT0gJycpIHJldHVybiBbXVxuICByZXR1cm4gZGlmZi5zcGxpdCgnXFxuJykuc2xpY2UoMCwgNDAwKS5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgY29uc3Qgc3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XG4gICAgICBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJyxcbiAgICAgIGZvbnRTaXplOiAnMTFweCcsIGxpbmVIZWlnaHQ6IDEuNiwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyxcbiAgICB9XG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnKysrJykgfHwgbGluZS5zdGFydHNXaXRoKCctLS0nKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJ2RpZmYgLS1naXQnKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJ0BAJykpIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJ1xuICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKCcrJykpIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gdGhlbWVBd2FyZVRleHQoJyMxYTdmMzcnKVxuICAgICAgc3R5bGUuYmFja2dyb3VuZCA9ICdyZ2JhKDQ2LDE2MCw2NywwLjA4KSdcbiAgICB9IGVsc2UgaWYgKGxpbmUuc3RhcnRzV2l0aCgnLScpKSB7XG4gICAgICBzdHlsZS5jb2xvciA9IHRoZW1lQXdhcmVUZXh0KCcjZDEyNDJmJylcbiAgICAgIHN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgyMDksMzYsNDcsMC4wOCknXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJ1xuICAgIH1cbiAgICByZXR1cm4gPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17c3R5bGV9PntsaW5lID09PSAnJyA/ICdcXHUwMEEwJyA6IGxpbmV9PC9kaXY+XG4gIH0pXG59XG5cbi8qKiBcdThCQTFcdTUyMTJcdTc4NkVcdThCQTRcdTk4NzVcdTc2ODRcdTUzRUZcdTdGMTZcdThGOTFcdTZCNjVcdTlBQTRcdUZGMDgvcnVucy9zdGFydCBcdThGRDRcdTU2REVcdUZGMDlcdTMwMDIgKi9cbmludGVyZmFjZSBQbGFuQ29uZmlybVN0ZXAge1xuICBpZDogc3RyaW5nXG4gIHRpdGxlOiBzdHJpbmdcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xuICB0YXJnZXRGaWxlczogc3RyaW5nW11cbiAgcm9sZTogc3RyaW5nXG4gIGFjY2VwdGFuY2U6IHN0cmluZ1xuICBmYWlsdXJlUG9saWN5OiBzdHJpbmdcbiAgZW5hYmxlZDogYm9vbGVhblxuICBtb2RlbFByb3ZpZGVyOiBzdHJpbmdcbiAgbW9kZWxJZDogc3RyaW5nXG59XG5cbi8qKiBQT1NUIC9wZWVrIFx1NzY4NFx1OEY3RFx1ODM3N1x1RkYwOFx1NEVFM1x1NzgwMVx1NEUwQVx1NEUwQlx1NjU4N1x1NkQ2RVx1NUM0Mlx1RkYwOVx1MzAwMiAqL1xuaW50ZXJmYWNlIFBlZWtQYXlsb2FkIHtcbiAgZXhpc3RzOiBib29sZWFuXG4gIHBhdGg/OiBzdHJpbmdcbiAgc3RhcnRMaW5lPzogbnVtYmVyXG4gIGVuZExpbmU/OiBudW1iZXJcbiAgdG90YWxMaW5lcz86IG51bWJlclxuICBsaW5lcz86IEFycmF5PHsgbjogbnVtYmVyOyB0ZXh0OiBzdHJpbmcgfT5cbn1cblxuLyoqIFx1NEVDRVx1ODFFQVx1NzUzMVx1NjU4N1x1NjcyQ1x1NEUyRFx1OEJDNlx1NTIyQiBmaWxlOmxpbmUgXHU1RjE1XHU3NTI4XHVGRjA4XHU1NDJCIGZpbGU6bGluZS1saW5lIFx1NTMzQVx1OTVGNFx1NTNENlx1OEQ3N1x1NTlDQlx1ODg0Q1x1RkYwOVx1MzAwMiAqL1xuY29uc3QgRklMRV9MSU5FX1BBVFRFUk4gPSAvKCg/OltcXHcuLV0rWy9cXFxcXSkqW1xcdy4tXStcXC5bQS1aYS16XXsxLDR9KTooXFxkezEsNX0pKD86LVxcZHsxLDV9KT8vZ1xuXG4vKiogR0VUIC9ydW5zL2RldGFpbCBcdTc2ODRcdThGN0RcdTgzNzdcdTMwMDIgKi9cbmludGVyZmFjZSBSdW5EZXRhaWwge1xuICBydW46IHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgY2hhbmdlVGl0bGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IHBhdXNlUG9pbnQ6IHsgc3RlcElkOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nOyBhdDogbnVtYmVyIH0gfCBudWxsOyBlcnJvcjogeyBtZXNzYWdlOiBzdHJpbmcgfSB8IG51bGw7IHN0YXJ0ZWRBdDogbnVtYmVyIHwgbnVsbDsgZmluaXNoZWRBdDogbnVtYmVyIHwgbnVsbCB9XG4gIHN0ZXBzOiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHJvbGU6IHN0cmluZzsgbW9kZWw6IHN0cmluZyB8IG51bGw7IHN0YXR1czogc3RyaW5nOyBhdHRlbXB0c0NvdW50OiBudW1iZXI7IGNsYWltZWRPdXRjb21lOiBzdHJpbmcgfCBudWxsOyB2ZXJpZmllZDogYm9vbGVhbjsgY29zdFVzZDogbnVtYmVyIH0+XG4gIGNvbnRleHQ6IHtcbiAgICBwcm9qZWN0RGlnZXN0OiBzdHJpbmc7IGJyYW5jaDogc3RyaW5nIHwgbnVsbDsgaGVhZFNoYTogc3RyaW5nIHwgbnVsbFxuICAgIGluamVjdGVkTWVtb3JpZXM6IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZyB9PlxuICAgIHN0ZXBTdW1tYXJpZXM6IEFycmF5PHsgc3RlcFRpdGxlOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgY2hhbmdlZEZpbGVzOiBzdHJpbmdbXTsgYXQ6IG51bWJlciB9PlxuICAgIGRlY2lzaW9uTG9nOiBBcnJheTx7IGtpbmQ6IHN0cmluZzsgZGV0YWlsOiBzdHJpbmc7IGF0OiBudW1iZXIgfT5cbiAgfSB8IG51bGxcbn1cblxuLyoqIEdFVCAvc2NoZWR1bGVkIFx1NzY4NFx1NEVGQlx1NTJBMVx1Njc2MVx1NzZFRVx1MzAwMiAqL1xuaW50ZXJmYWNlIFNjaGVkdWxlZFRhc2tFbnRyeSB7XG4gIGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nXG4gIGludGVydmFsTWludXRlczogbnVtYmVyOyBlbmFibGVkOiBib29sZWFuOyBsYXN0UnVuQXQ6IG51bWJlciB8IG51bGw7IGxhc3RSZXN1bHQ6IHN0cmluZzsgbmV4dER1ZUF0OiBudW1iZXJcbn1cblxuLyoqIEdFVCAvbWVtb3JpZXMgXHU3Njg0XHU4QkIwXHU1RkM2XHU2NzYxXHU3NkVFXHVGRjA4XHU4QkIwXHU1RkM2XHU5NzYyXHU2NzdGXHU2NTcwXHU2MzZFXHU2RTkwXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgTWVtb3J5RW50cnkge1xuICBpZDogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZzsgcmVsYXRlZEZpbGVzOiBzdHJpbmdbXVxuICBpc0h1bWFuQ29uZmlybWVkOiBib29sZWFuOyBnaXRCcmFuY2g6IHN0cmluZyB8IG51bGw7IHNjb3BlOiBzdHJpbmc7IHNvdXJjZVRhZzogc3RyaW5nXG4gIGJhc2lzU2hhOiBzdHJpbmcgfCBudWxsOyBzdGF0dXM6IHN0cmluZzsgbGFzdFZlcmlmaWVkU2hhOiBzdHJpbmcgfCBudWxsXG4gIGNyZWF0ZWRBdDogbnVtYmVyOyB1cGRhdGVkQXQ6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgTWVtb3JpZXNQYXlsb2FkIHtcbiAgbWVtb3JpZXM6IE1lbW9yeUVudHJ5W11cbiAgYnJhbmNoOiBzdHJpbmcgfCBudWxsXG4gIGhlYWRTaGE6IHN0cmluZyB8IG51bGxcbiAgYmFzZWxpbmU6IHsgc2hhOiBzdHJpbmcgfCBudWxsOyB1cGRhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxuICBiZWhpbmRDb3VudDogbnVtYmVyXG59XG5cbi8qKiBQT1NUIC9tZW1vcnkvc3luYyBcdTc2ODRcdTU0MENcdTZCNjVcdTYyQTVcdTU0NEFcdTMwMDIgKi9cbmludGVyZmFjZSBTeW5jUmVwb3J0IHtcbiAgb2s6IGJvb2xlYW5cbiAgZXJyb3I/OiBzdHJpbmdcbiAgYmVoaW5kQ291bnQ/OiBudW1iZXJcbiAgc3RhbGVQcm9wb3NhbHM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0+XG4gIHJlbmV3ZWQ/OiBudW1iZXJcbiAgbmV3Q2FuZGlkYXRlcz86IEFycmF5PHsgdHlwZTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmcgfT5cbiAgdmVyZGljdD86IHN0cmluZ1xufVxuXG4vKiogXHU4QkM0XHU1QkExXHU5NUVFXHU5ODk4XHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IElTU1VFX1NUQVRVU19MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIG9wZW46ICdcdTVGODVcdTU5MDRcdTc0MDYnLFxuICBmaXhpbmc6ICdcdTRGRUVcdTU5MERcdTRFMkQnLFxuICByZXNvbHZlZDogJ1x1NURGMlx1ODlFM1x1NTFCMycsXG4gIGFjY2VwdGVkOiAnXHU1REYyXHU2M0E1XHU1M0Q3JyxcbiAgcmVqZWN0ZWQ6ICdcdTVERjJcdTYyRDJcdTdFREQnLFxufVxuXG4vKiogXHU4QkIwXHU1RkM2XHU3QzdCXHU1NzhCIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IE1FTU9SWV9UWVBFX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgYXJjaGl0ZWN0dXJlX2RlY2lzaW9uOiAnXHU2N0I2XHU2Nzg0XHU1MUIzXHU3QjU2JywgcGF0dGVybl9ydWxlOiAnXHU2QTIxXHU1RjBGXHU4OUM0XHU1MjE5Jywgcmlza19ob3RzcG90OiAnXHU5OENFXHU5NjY5XHU3MEVEXHU3MEI5JyxcbiAgbGVhcm5lZF9jb25jZXB0OiAnXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1JywgdXNlcl9wcm9maWxlOiAnXHU3NTI4XHU2MjM3XHU1MDRGXHU1OTdEJywgcHJvamVjdF9sb2c6ICdcdTk4NzlcdTc2RUVcdTY1RTVcdTVGRDcnLCBkYWlseV9sb2c6ICdcdTY1RTVcdTVGRDcnLFxufVxuXG4vKiogXHU4QkIwXHU1RkM2XHU2NzY1XHU2RTkwIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IE1FTU9SWV9TT1VSQ0VfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBydW46ICdcdTYyNjdcdTg4NENcdTYzRDBcdTcwQkMnLCByZXZpZXc6ICdcdTY4MzhcdTY3RTVcdTZDODlcdTZEQzAnLCBzeW5jOiAnXHU2MkM5XHU1M0Q2XHU1NDBDXHU2QjY1JywgY2hhdDogJ0FJIFx1OEJCMFx1NUY1NScsIG1hbnVhbDogJ1x1NjI0Qlx1NTJBOCcsXG59XG5cbi8qKiBcdTdGMTZcdTYzOTJcdTg5RDJcdTgyNzIgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xuY29uc3QgUk9MRV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIGFuYWx5c2lzOiAnXHU1MjA2XHU2NzkwJywgcGxhbm5pbmc6ICdcdTg5QzRcdTUyMTInLCBjb2Rpbmc6ICdcdTVGMDBcdTUzRDEnLCBvcHM6ICdcdTdCODBcdTUzNTVcdTY0Q0RcdTRGNUMnLCB2ZXJpZmljYXRpb246ICdcdTlBOENcdTY1MzYnLFxufVxuXG4vKiogXHU2QjY1XHU5QUE0XHU1OTMxXHU4RDI1XHU3QjU2XHU3NTY1IFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFBPTElDWV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICdyZXRyeS1lc2NhbGF0ZSc6ICdcdTkxQ0RcdThCRDVcdTVFNzZcdTUzNDdcdTdFQTdcdTZBMjFcdTU3OEInLCAncmV0cnktZmFsbGJhY2snOiAnXHU5MUNEXHU4QkQ1Jywgc2tpcDogJ1x1NTkzMVx1OEQyNVx1NTIxOVx1OERGM1x1OEZDNycsIGFzazogJ1x1NTkzMVx1OEQyNVx1NTIxOVx1NjY4Mlx1NTA1Q1x1OTVFRVx1NEVCQScsXG59XG5cbi8qKiBSdW4gXHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFJVTl9TVEFUVVNfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBxdWV1ZWQ6ICdcdTYzOTJcdTk2MUZcdTRFMkQnLCBydW5uaW5nOiAnXHU4RkQwXHU4ODRDXHU0RTJEJywgcGF1c2VkOiAnXHU1REYyXHU2NjgyXHU1MDVDJywgYmxvY2tlZDogJ1x1OTYzQlx1NTg1RScsIHJldHJ5aW5nOiAnXHU5MUNEXHU4QkQ1XHU0RTJEJyxcbiAgdmVyaWZ5aW5nOiAnXHU2NTM2XHU1QzNFXHU5QThDXHU2NTM2XHU0RTJEJywgc3VjY2VlZGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgY29tcGxldGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgZmFpbGVkOiAnXHU1OTMxXHU4RDI1JywgY2FuY2VsbGVkOiAnXHU1REYyXHU1M0Q2XHU2RDg4JywgaW50ZXJydXB0ZWQ6ICdcdTVERjJcdTRFMkRcdTY1QUQnLFxufVxuXG4vKiogXHU2QjY1XHU5QUE0XHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFNURVBfU1RBVFVTX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgcGVuZGluZzogJ1x1NUY4NVx1NjI2N1x1ODg0QycsIHJlYWR5OiAnXHU1QzMxXHU3RUVBJywgcnVubmluZzogJ1x1NjI2N1x1ODg0Q1x1NEUyRCcsIHBhdXNlZDogJ1x1NjY4Mlx1NTA1QycsIHJldHJ5aW5nOiAnXHU5MUNEXHU4QkQ1XHU0RTJEJyxcbiAgc3VjY2VlZGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgZmFpbGVkOiAnXHU1OTMxXHU4RDI1Jywgc2tpcHBlZDogJ1x1NURGMlx1OERGM1x1OEZDNycsIGJsb2NrZWQ6ICdcdTk2M0JcdTU4NUUnLCBjYW5jZWxsZWQ6ICdcdTVERjJcdTUzRDZcdTZEODgnLCBpbnRlcnJ1cHRlZDogJ1x1NURGMlx1NEUyRFx1NjVBRCcsXG59XG5cbi8qKiBcdThCQzRcdTVCQTFcdTk1RUVcdTk4OThcdTRFMjVcdTkxQ0RcdTVFQTYgXHUyMTkyIFx1NUZCRFx1N0FFMFx1NUU5NVx1ODI3Mlx1MzAwMiAqL1xuZnVuY3Rpb24gc2V2ZXJpdHlDb2xvcihzZXZlcml0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IHNldmVyaXR5ID09PSAnYmxvY2tlcicpIHJldHVybiAnI2NlOTE3OCdcbiAgaWYgKHNldmVyaXR5ID09PSAnbWFqb3InKSByZXR1cm4gJyNkN2JhN2QnXG4gIGlmIChzZXZlcml0eSA9PT0gJ2luZm8nKSByZXR1cm4gJyM2YjhiOGInXG4gIHJldHVybiAnIzU2OWNkNidcbn1cblxuLyoqIFx1NEUyNVx1OTFDRFx1NUVBNlx1NUY1Mlx1NEUwMFx1RkYwOFx1NTE3Q1x1NUJCOVx1NTM4Nlx1NTNGMlx1OEJCMFx1NUY1NVx1OTFDQ1x1NzY4NCBoaWdoL21lZGl1bS9sb3dcdUZGMUJcdTY3MkFcdTc3RTVcdTU2REVcdTg0M0QgbWlub3JcdUZGMDlcdUZGMENcdTdFREZcdThCQTEvXHU3QjVCXHU5MDA5L1x1Nzc0MFx1ODI3Mlx1NTE3MVx1NzUyOFx1MzAwMiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplSXNzdWVTZXZlcml0eShzZXZlcml0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHNldmVyaXR5ID09PSAnaGlnaCcpIHJldHVybiAnbWFqb3InXG4gIGlmIChzZXZlcml0eSA9PT0gJ21lZGl1bScgfHwgc2V2ZXJpdHkgPT09ICdsb3cnKSByZXR1cm4gJ21pbm9yJ1xuICByZXR1cm4gc2V2ZXJpdHkgPT09ICdibG9ja2VyJyB8fCBzZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBzZXZlcml0eSA9PT0gJ21ham9yJyB8fCBzZXZlcml0eSA9PT0gJ21pbm9yJyB8fCBzZXZlcml0eSA9PT0gJ2luZm8nXG4gICAgPyBzZXZlcml0eSA6ICdtaW5vcidcbn1cblxuLy8gXHU0RTNCXHU5ODk4XHU1QkY5XHU2QkQ0XHU1RUE2XHU1RjE1XHU2NENFXHVGRjA4cGFyc2VDb2xvciAvIHJlbGF0aXZlTHVtaW5hbmNlIC8gZGFya2VuL2xpZ2h0ZW4gLyB0aGVtZUF3YXJlVGV4dFx1RkYwOVxuLy8gXHU1REYyXHU2MkJEXHU1M0Q2XHU1MjMwIC4vdGhlbWUudHMgXHU3RURGXHU0RTAwXHU3RUY0XHU2MkE0XHUzMDAyXHU1MTY4XHU2NTg3XHU0RUY2XHU0RTBEXHU1M0Q4XHU1RjBGXHVGRjFBXG4vLyAxKSBcdTVGM0FcdThDMDNcdTgyNzJcdTY1ODdcdTVCNTdcdTVGQzVcdTk4N0JcdTdFQ0YgdGhlbWVBd2FyZVRleHRcdUZGMDhcdTZFMzJcdTY3RDNcdTY3MUZcdThDMDNcdTc1MjhcdUZGMDlcdUZGMUJcbi8vIDIpIGFjdGl2ZSBcdTlBRDhcdTRFQUVcdTgwQ0NcdTY2NkZcdTRFMDBcdTVGOEIgYnV0dG9uLWluZm8tZmlsbFx1RkYwQ1x1Nzk4MVx1NkI2MiBicmFuZC1wcmltYXJ5IFx1NEY1Q1x1ODBDQ1x1NjY2RlxuLy8gICAgXHVGRjA4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU0RTBCXHU4RkQxXHU3NjdEXHVGRjBDXHU5MTREXHU3NjdEXHU1QjU3XHU0RTBEXHU1M0VGXHU4OUMxXHUyMDE0XHUyMDE0XHUzMDBDXHU5ODc1XHU3QjdFXHU3NjdEXHU1NzU3XHUzMDBEXHU0RThCXHU2NTQ1XHU2ODM5XHU1NkUwXHVGRjA5XHUzMDAyXG5cbi8qKiBcdThCQzRcdTVCQTFcdTc2RUVcdTY4MDdcdUZGMDhjaGFuZ2VJZFx1RkYwOVx1MjE5MiBcdTUzRUZcdThCRkJcdTY4MDdcdTdCN0VcdUZGMUFcdTU0MDhcdTYyMTAgcmV2aWV3OjxzaGE+IFx1NjMwN1x1NTQxMVx1NjNEMFx1NEVBNFx1RkYwQ2NoZ18qIFx1NjMwN1x1NTQxMVx1NTNEOFx1NjZGNFx1RkYwQ2FkaG9jIFx1NEUzQVx1NURFNVx1NEY1Q1x1NTMzQVx1MzAwMiAqL1xuZnVuY3Rpb24gaXNzdWVUYXJnZXRMYWJlbChjaGFuZ2VJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgaWQgPSB0eXBlb2YgY2hhbmdlSWQgPT09ICdzdHJpbmcnID8gY2hhbmdlSWQgOiAnJ1xuICBpZiAoaWQuc3RhcnRzV2l0aCgncmV2aWV3OicpKSByZXR1cm4gYFx1NjNEMFx1NEVBNCAke2lkLnNsaWNlKDcsIDE1KX1gXG4gIGlmIChpZCA9PT0gJ2FkaG9jJykgcmV0dXJuICdcdTVERTVcdTRGNUNcdTUzM0EnXG4gIHJldHVybiBgXHU1M0Q4XHU2NkY0ICR7aWQuc2xpY2UoMCwgMTEpfWBcbn1cblxuLyoqIFx1NjAzQlx1N0VEMy9cdTdFRDNcdTY3ODRcdTUzMTZcdTdCMTRcdThCQjBcdTc2ODRcdThGN0JcdTkxQ0YgTWFya2Rvd24gXHU2RTMyXHU2N0QzXHVGRjFBXHUzMDBDIyMgXHUzMDBEXHU4MjgyXHU2ODA3XHU5ODk4XHU3NzQwXHU4MjcyXHU1MkEwXHU3Qzk3XHVGRjBDXHUzMDBDLSBcdTMwMERcdTUyMTdcdTg4NjhcdTUyQTBcdTU3MDZcdTcwQjlcdUZGMENcdTUxNzZcdTRGNTlcdTUzOUZcdTY4MzdcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlbmRlclN0cnVjdHVyZWRDb250ZW50KGNvbnRlbnQ6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdIHtcbiAgaWYgKHR5cGVvZiBjb250ZW50ICE9PSAnc3RyaW5nJyB8fCBjb250ZW50ID09PSAnJykgcmV0dXJuIFtdXG4gIHJldHVybiBjb250ZW50LnNwbGl0KCdcXG4nKS5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnIyMgJykpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEyLjVweCcsIG1hcmdpblRvcDogaW5kZXggPT09IDAgPyAwIDogMTAsIG1hcmdpbkJvdHRvbTogMiwgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19PlxuICAgICAgICAgIHtsaW5lLnNsaWNlKDMpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnLSAnKSkge1xuICAgICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3sgcGFkZGluZ0xlZnQ6IDE0LCB0ZXh0SW5kZW50OiAtMTAgfX0+XHUyMDIyIHtyZW5kZXJXaXRoUGVlayhsaW5lLnNsaWNlKDIpKX08L2Rpdj5cbiAgICB9XG4gICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0+e2xpbmUgPT09ICcnID8gJ1xcdTAwQTAnIDogcmVuZGVyV2l0aFBlZWsobGluZSl9PC9kaXY+XG4gIH0pXG59XG5cbi8qKiBwZWVrIFx1NzBCOVx1NTFGQlx1NTZERVx1OEMwM1x1RkYxQVx1NzUzMSBXb3Jrc3BhY2VGcmFtZSBcdTZDRThcdTUxNjVcdUZGMDhcdTZFMzJcdTY3RDNcdTU2NjhcdTRGRERcdTYzMDFcdTZBMjFcdTU3NTdcdTdFQTdcdTdFQUZcdTUxRkRcdTY1NzBcdUZGMDlcdTMwMDIgKi9cbmxldCBwZWVrT3BlbmVyOiAoKHBhdGg6IHN0cmluZywgbGluZTogbnVtYmVyKSA9PiB2b2lkKSB8IHVuZGVmaW5lZFxuXG4vKiogXHU2MjhBXHU2NTg3XHU2NzJDXHU0RTJEXHU3Njg0IGZpbGU6bGluZSBcdTVGMTVcdTc1MjhcdTZFMzJcdTY3RDNcdTRFM0FcdTUzRUZcdTcwQjlcdTUxRkJcdTgyQUZcdTcyNDdcdUZGMDhcdTcwQjlcdTUxRkJcdTVGMzlcdTUxRkFcdTRFRTNcdTc4MDFcdTRFMEFcdTRFMEJcdTY1ODdcdUZGMDlcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlbmRlcldpdGhQZWVrKHRleHQ6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gIGNvbnN0IG5vZGVzOiBSZWFjdC5SZWFjdE5vZGVbXSA9IFtdXG4gIGxldCBsYXN0ID0gMFxuICBsZXQgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheSB8IG51bGxcbiAgRklMRV9MSU5FX1BBVFRFUk4ubGFzdEluZGV4ID0gMFxuICB3aGlsZSAoKG1hdGNoID0gRklMRV9MSU5FX1BBVFRFUk4uZXhlYyh0ZXh0KSkgIT09IG51bGwpIHtcbiAgICBpZiAobWF0Y2guaW5kZXggPiBsYXN0KSBub2Rlcy5wdXNoKHRleHQuc2xpY2UobGFzdCwgbWF0Y2guaW5kZXgpKVxuICAgIGNvbnN0IFtmdWxsLCBwYXRoLCBsaW5lU3RyXSA9IG1hdGNoXG4gICAgbm9kZXMucHVzaChcbiAgICAgIDxidXR0b25cbiAgICAgICAga2V5PXtgJHttYXRjaC5pbmRleH0tJHtmdWxsfWB9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJywgcGFkZGluZzogJzAgMXB4JywgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsXG4gICAgICAgICAgZm9udFNpemU6ICdpbmhlcml0JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSBkb3R0ZWQnLFxuICAgICAgICB9fVxuICAgICAgICB0aXRsZT1cIlx1NzBCOVx1NTFGQlx1NjdFNVx1NzcwQlx1NEVFM1x1NzgwMVx1NEUwQVx1NEUwQlx1NjU4N1wiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHsgcGVla09wZW5lcj8uKHBhdGgsIE51bWJlcihsaW5lU3RyKSkgfX1cbiAgICAgID57ZnVsbH08L2J1dHRvbj4sXG4gICAgKVxuICAgIGxhc3QgPSBtYXRjaC5pbmRleCArIGZ1bGwubGVuZ3RoXG4gIH1cbiAgaWYgKGxhc3QgPCB0ZXh0Lmxlbmd0aCkgbm9kZXMucHVzaCh0ZXh0LnNsaWNlKGxhc3QpKVxuICByZXR1cm4gbm9kZXMubGVuZ3RoID09PSAxID8gbm9kZXNbMF0gOiA8c3Bhbj57bm9kZXN9PC9zcGFuPlxufVxuXG4vKipcbiAqIFx1ODlDNlx1ODlDOVx1NjM2Mlx1NTIxN1x1NjgzN1x1NUYwRlx1ODg2OFx1RkYxQVx1OTY4Rlx1NjcyQ1x1N0VDNFx1NEVGNlx1NjMwMlx1OEY3RC9cdTUzNzhcdThGN0RcdUZGMDhcdTUzNzhcdThGN0RcdTUzNzNcdTVCOENcdTUxNjhcdTYwNjJcdTU5MERcdTUzOUZcdTc1MUZcdTVFMDNcdTVDNDBcdUZGMDlcdTMwMDJcbiAqIFx1NjM2Mlx1NTIxN1x1NjYyRlx1NjVFMFx1Njc2MVx1NEVGNlx1NzY4NFx1RkYwOFx1NTQyQlx1NjVCMFx1NEYxQVx1OEJERFx1ODQzRFx1NTczMFx1OTg3NVx1RkYwOVx1MjAxNFx1MjAxNFx1NEUxQVx1NEUzQlx1ODlDNFx1NTIxOVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1ODk4MVx1NEU0OFx1NEUwRFx1NjYzRVx1NzkzQVx1MzAwMVx1ODk4MVx1NEU0OFx1NUM0NVx1NEUyRFx1RkYwQ1xuICogXHU1M0YzXHU0RkE3XHU1M0VBXHU1MTQxXHU4QkI4XHU4MDRBXHU1OTI5XHUzMDAyMC4xLjIgXHU2NUIwXHU0RjFBXHU4QkREXHU5ODc1XHU0RTVGXHU1RTI2IGRhdGEtZGV0YWlscy1jb2xsYXBzZWRcdUZGMENcdTY2RkVcdTU2RTBcdTVCRjlcdTVCODNcdThDNDFcdTUxNERcbiAqIFx1NjM2Mlx1NTIxN1x1NUJGQ1x1ODFGNFx1NURFNVx1NEY1Q1x1NTNGMFx1NTcyOFx1NjVCMFx1NEYxQVx1OEJERFx1NEUwQlx1OTAwMFx1NTZERVx1NTM5Rlx1NzUxRlx1NTNGM1x1NEY0RFx1RkYwODIwMjYtMDktMTAgXHU0RkVFXHU1OTBEXHVGRjA5XHUzMDAyXG4gKiBcdTZDRThcdTYxMEZcdUZGMUFcdTc5ODFcdTZCNjJcdTc1MjggOmhhcygpIFx1NTA1QVx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1MjAxNFx1MjAxNFx1NUI5OFx1NjVCOVx1Njc4NFx1NUVGQVx1NEVBN1x1NzI2OVx1NTFFMFx1NTM0MVx1NEUyQVx1N0VDNFx1NEVGNlx1NjgzOVx1N0M3Qlx1OTBGRFx1NTNFQiByb290XHVGRjBDXG4gKiBcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdTRGMUFcdTYyOEFcdTY1NzRcdTRFMkFcdTgwNEFcdTU5MjlcdTVCQjlcdTU2NjhcdThCRUZcdTk0QjNcdTUyMzZcdUZGMDhcdTUzODZcdTUzRjJcdTRFOEJcdTY1NDVcdUZGMDlcdTMwMDJcdTZCNjRcdTg4NjhcdTUzRUFcdTRGRERcdTc1NTlcdTdGNTFcdTY4M0NcdTYzNjJcdTUyMTdcdTRFMEVcdTYyRDZcdTYyRkRcdTY3QzRcdTk2OTBcdTg1Q0ZcdTMwMDJcbiAqL1xuY29uc3QgTEFZT1VUX1NUWUxFID0gYFxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA+IGRpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0geyBvcmRlcjogMzsgfVxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA+IGRpdltjbGFzcyo9XCJkZXRhaWxzQ29sXCJdIHsgb3JkZXI6IDI7IH1cbmRpdltjbGFzcyo9XCJoYW5kbGVcIl1bZGF0YS1zaWRlPVwiZGV0YWlsc1wiXSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSB7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBtaW5tYXgoMCwgMWZyKSB2YXIoLS1wYy1jaGF0LXcsIDM2MHB4KSAhaW1wb3J0YW50O1xufVxuYFxuXG4vKipcbiAqIFx1NEYxQVx1OEJERFx1N0VERlx1OEJBMVx1ODg0Q1x1NzY4NFx1NEUyNFx1ODg0Q1x1OTRCM1x1NTIzNlx1RkYwOFx1NzUyOFx1NjIzN1x1NjMwN1x1NUI5QVx1NzY4NFx1NjgzN1x1NUYwRlx1RkYwOVx1MzAwMlx1NEUwRFx1ODBGRFx1OEQ3MCBDU1MgXHU5MDA5XHU2MkU5XHU1NjY4XHVGRjFBXG4gKiBcdTVCOThcdTY1QjlcdTU5MUFcdTRFMkFcdTZBMjFcdTU3NTdcdTc2ODRcdTY4MzlcdTdDN0JcdTkwRkRcdTUzRUIgYHJvb3RgXHVGRjA4XHU2Nzg0XHU1RUZBXHU1NDBFXHU2NjJGIGBoYXNoX3Jvb3RgXHVGRjA5XHVGRjBDXHU1MTc2XHU0RTJEXG4gKiBDb252ZXJzYXRpb25Sb290IFx1NzY4NFx1NUI1MFx1NjgxMVx1OTFDQ1x1NUMzMVx1NTMwNVx1NTQyQlx1N0VERlx1OEJBMVx1ODg0Q1x1NzY4NCBgaGFzaF9zZXBgIFx1NTIwNlx1OTY5NCBzcGFuXHUyMDE0XHUyMDE0XG4gKiBcdTRFRkJcdTRGNTVcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdUZGMDhcdTU0MkIgOmhhcygpXHVGRjA5XHU5MEZEXHU0RjFBXHU2MjhBXHU2NTc0XHU0RTJBXHU4MDRBXHU1OTI5XHU1QkI5XHU1NjY4XHU5NEIzXHU2MjEwXHU0RTI0XHU4ODRDXHVGRjBDXHU2NzQwXHU2QjdCXHU2RURBXHU1MkE4XHUzMDAyXG4gKiBcdTU2RTBcdTZCNjRcdTU3MjhcdThGRDBcdTg4NENcdTY1RjZcdTYzMDlcdTU1MkZcdTRFMDBcdTVGNjJcdTcyQjZcdTVCOUFcdTRGNERcdUZGMUFcdTVDNDVcdTRFMkRcdTYzOTJcdTcyNDggKyBcdTc2RjRcdTYzQTVcdTVCNTBcdTRFRTNcdTU0MkJcdTY1ODdcdTY3MkMgXCJ8XCIgXHU3Njg0XG4gKiBcdTUyMDZcdTk2OTQgc3Bhblx1RkYwQ1x1NTQ3RFx1NEUyRFx1NTQwRVx1NjI4QVx1NUI5OFx1NjVCOVx1N0M3Qlx1NTQwRFx1NTM5Rlx1NjgzN1x1NTE5OVx1OEZEQlx1NjgzN1x1NUYwRlx1ODg2OFx1RkYwOFx1N0NCRVx1NTFDNlx1NTIzMFx1Njc4NFx1NUVGQVx1NTRDOFx1NUUwQ1x1RkYwOVx1MzAwMlxuICogQHJldHVybnMgXHU2Q0U4XHU1MTY1XHU3Njg0IHN0eWxlIFx1NTE0M1x1N0QyMFx1RkYxQlx1NUI5OFx1NjVCOVx1NjcyQVx1NkUzMlx1NjdEM1x1N0VERlx1OEJBMVx1ODg0Q1x1NjVGNlx1NEUzQSB1bmRlZmluZWRcdTMwMDJcbiAqL1xuY29uc3QgYXBwbHlTdGF0c0xpbmVDbGFtcCA9ICgpOiBIVE1MU3R5bGVFbGVtZW50IHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3Qgc2VwU3BhbiA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MU3BhbkVsZW1lbnQ+KCdkaXZbY2xhc3MqPVwiX3Jvb3RcIl0gPiBzcGFuW2NsYXNzKj1cIl9zZXBcIl0nKSlcbiAgICAuZmluZCgoc3BhbikgPT4gc3Bhbi50ZXh0Q29udGVudCA9PT0gJ3wnKVxuICBjb25zdCByb290RGl2ID0gc2VwU3Bhbj8ucGFyZW50RWxlbWVudFxuICBjb25zdCBoYXNoQ2xhc3MgPSByb290RGl2Py5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5maW5kKChuYW1lKSA9PiBuYW1lLmVuZHNXaXRoKCdfcm9vdCcpKVxuICBpZiAocm9vdERpdiA9PT0gdW5kZWZpbmVkIHx8IHJvb3REaXYgPT09IG51bGwgfHwgaGFzaENsYXNzID09PSB1bmRlZmluZWQgfHwgZ2V0Q29tcHV0ZWRTdHlsZShyb290RGl2KS50ZXh0QWxpZ24gIT09ICdjZW50ZXInKSByZXR1cm4gdW5kZWZpbmVkXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZS5pZCA9ICdwYy1zdGF0cy1jbGFtcCdcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG5kaXZbY2xhc3M9XCIke2hhc2hDbGFzc31cIl0ge1xuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgLXdlYmtpdC1saW5lLWNsYW1wOiAyO1xuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuICB0ZXh0LW92ZXJmbG93OiBjbGlwO1xuICBmb250LXNpemU6IDExcHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cbmBcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSlcbiAgcmV0dXJuIHN0eWxlXG59XG5cbnR5cGUgVGFiS2V5ID0gJ2NvbW1pdHMnIHwgJ292ZXJ2aWV3JyB8ICdleGVjdXRpb24nIHwgJ3JldmlldycgfCAnbm90ZXMnIHwgJ3NldHRpbmdzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZUZyYW1lUHJvcHMge1xuICAvKiogXHU1Qjk4XHU2NUI5IGRldGFpbHMgXHU2OUZEXHU1OTUxXHU3RUE2XHU3Njg0IGxvY2FsZSBcdTZDRThcdTUxNjVcdUZGMDhcdTYyMTFcdTRFRUNcdTZDRThcdTUxOENcdTc2ODQgcHJvamVjdC1jb250cm9sIFx1OEJDRFx1NTE3OFx1RkYwOVx1MzAwMiAqL1xuICB0PzogKGtleTogc3RyaW5nKSA9PiBzdHJpbmdcbiAgLyoqIFx1NUY1M1x1NTI0RFx1NEYxQVx1OEJERCBpZFx1RkYwOFx1NUI5OFx1NjVCOSBzZXNzaW9uIFx1NjgwN1x1NTFDNlx1NUM1RVx1NjAyN1x1RkYxQlx1NTIwN1x1NjM2Mlx1NEYxQVx1OEJERFx1NjVGNlx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1NURFNVx1NEY1Q1x1NTNGMFx1OEY2OFx1OTA1M1x1RkYwOVx1MzAwMiAqL1xuICBzZXNzaW9uSWQ/OiBzdHJpbmdcbiAgLyoqIFx1NjVCMFx1NzI0OFx1NUJCRlx1NEUzQlx1NzUzMVx1NTkxNlx1NUM0Mlx1NTJBMFx1NkNENVx1NkQ2RVx1NUM0Mlx1N0JBMVx1NzQwNlx1NUUwM1x1NUM0MFx1RkYwQ1x1NEUwRFx1NEY3Rlx1NzUyOFx1NjVFN1x1NzI0OCBkZXRhaWxzIFx1NjM2Mlx1NTIxN1x1MzAwMiAqL1xuICBsYXlvdXRNb2RlPzogJ2xlZ2FjeScgfCAnb3ZlcmxheSdcbn1cblxuLyoqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NjU4N1x1Njg0OFx1OEJDRFx1NTE3OFx1RkYwOHpoIC8gZW5cdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBjb25zdCBXT1JLU1BBQ0VfRElDVCA9IHtcbiAgemg6IHtcbiAgICAnd29ya3NwYWNlLnRpdGxlJzogJ1x1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMCcsXG4gICAgJ3dvcmtzcGFjZS5zZWxlY3RTZXNzaW9uJzogJ1x1OEJGN1x1NTE0OFx1NTcyOFx1NURFNlx1NEZBN1x1OTAwOVx1NjJFOVx1OTg3OVx1NzZFRVx1NEUwQlx1NzY4NFx1NEYxQVx1OEJERFx1RkYwQ1x1NURFNVx1NEY1Q1x1NTNGMFx1NjI0RFx1NEYxQVx1NjYzRVx1NzkzQVx1OEJFNVx1OTg3OVx1NzZFRVx1NzY4NFx1NjU3MFx1NjM2RVx1MzAwMicsXG4gICAgJ3RhYi5jb21taXRzJzogJ1x1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNScsXG4gICAgJ3RhYi5vdmVydmlldyc6ICdcdTk4NzlcdTc2RUVcdTYwM0JcdTg5QzgnLFxuICAgICd0YWIuZXhlY3V0aW9uJzogJ1x1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDMycsXG4gICAgJ3RhYi5yZXZpZXcnOiAnUmV2aWV3IFx1OTVFRVx1OTg5OCcsXG4gICAgJ3RhYi5ub3Rlcyc6ICdcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzYnLFxuICAgICd0YWIuc2V0dGluZ3MnOiAnXHU4QkJFXHU3RjZFJyxcbiAgICAnZXJyb3IubG9hZCc6ICdcdTUyQTBcdThGN0RcdTU5MzFcdThEMjUnLFxuICAgICdzdGF0ZS5wcm9qZWN0JzogJ1x1NUY1M1x1NTI0RFx1OTg3OVx1NzZFRScsXG4gICAgJ3N0YXRlLm5vUHJvamVjdCc6ICdcdTVDMUFcdTY3MkFcdTUyMURcdTU5Q0JcdTUzMTZcdTk4NzlcdTc2RUUnLFxuICAgICdzdGF0ZS5ub1Byb2plY3RIaW50JzogJ1x1NzBCOVx1NTFGQlx1MzAwQ1x1NTIxRFx1NTlDQlx1NTMxNlx1OTg3OVx1NzZFRVx1MzAwRFx1NjI2Qlx1NjNDRlx1NEVEM1x1NUU5M1x1N0VEM1x1Njc4NFx1MzAwMVx1NjI4MFx1NjcyRlx1NjgwOFx1NEUwRVx1N0IyNlx1NTNGN1x1N0QyMlx1NUYxNVx1MzAwMicsXG4gICAgJ2FjdGlvbi5ib290c3RyYXAnOiAnXHU1MjFEXHU1OUNCXHU1MzE2XHU5ODc5XHU3NkVFJyxcbiAgICAnYWN0aW9uLnJlc2Nhbic6ICdcdTkxQ0RcdTY1QjBcdTUyMURcdTU5Q0JcdTUzMTYgLyBcdTYyNkJcdTYzQ0YnLFxuICAgICdhY3Rpb24uYW5hbHl6ZSc6ICdcdTUyMDZcdTY3OTBcdTVGNTNcdTUyNERcdTY1MzlcdTUyQTgnLFxuICAgICdhY3Rpb24ucmV2aWV3JzogJ1x1OEJDNFx1NUJBMVx1NUY1M1x1NTI0RFx1NjUzOVx1NTJBOCcsXG4gICAgJ2FjdGlvbi52ZXJpZnknOiAnXHU5QThDXHU2NTM2XHU1RjUzXHU1MjREXHU2NTM5XHU1MkE4JyxcbiAgICAnYWN0aW9uLmNyZWF0ZUNoYW5nZSc6ICdcdTY1QjBcdTVFRkFcdTUzRDhcdTY2RjQnLFxuICAgICdhY3Rpb24ucnVubmluZyc6ICdcdTYyNjdcdTg4NENcdTRFMkRcdTIwMjYnLFxuICAgICdhY3Rpb24ucmVmcmVzaCc6ICdcdTUyMzdcdTY1QjAnLFxuICAgICdmb3JtLmNoYW5nZVRpdGxlJzogJ1x1NTNEOFx1NjZGNFx1NjgwN1x1OTg5OCcsXG4gICAgJ2Zvcm0uY2hhbmdlRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMDhcdTkwMDlcdTU4NkJcdUZGMDknLFxuICAgICdyZXN1bHQucGFuZWwnOiAnXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDJyxcblxuICAgICdyZXBvLnNjYW5IaXN0b3J5JzogJ1x1OTFDRFx1NUVGQVx1NTM4Nlx1NTNGMicsXG4gICAgJ3JlcG8uY29tbWl0cyc6ICdcdTYzRDBcdTRFQTQnLFxuICAgICdyZXBvLmJyYW5jaCc6ICdcdTUyMDZcdTY1MkYnLFxuICAgICdyZXBvLndvcmtpbmcnOiAnXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcbiAgICAncmVwby53b3JraW5nQ2xlYW4nOiAnXHU1REU1XHU0RjVDXHU1MzNBXHU1RTcyXHU1MUMwXHVGRjBDXHU2NUUwXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcbiAgICAncmVwby5lbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTYzRDBcdTRFQTRcdTMwMDInLFxuICAgICdyZXBvLmxvYWRGYWlsZWQnOiAnXHU2M0QwXHU0RUE0XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1JyxcbiAgICAncGlja2VyLnRpdGxlJzogJ1x1OTAwOVx1NjJFOVx1ODk4MVx1NjgzOFx1NjdFNVx1NzY4NFx1NjNEMFx1NEVBNFx1RkYwOFx1NTNFRlx1NTkxQVx1OTAwOVx1RkYwOScsXG4gICAgJ3BpY2tlci5wbGFjZWhvbGRlcic6ICdcdTcwQjlcdTUxRkJcdTkwMDlcdTYyRTlcdTYzRDBcdTRFQTRcdUZGMDhcdTUzRUZcdTU5MUFcdTkwMDlcdUZGMENcdTU0MkJcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQThcdUZGMDknLFxuICAgICdwaWNrZXIuc2VsZWN0ZWQnOiAnXHU1REYyXHU5MDA5JyxcbiAgICAncGlja2VyLmZpbHRlcic6ICdcdTYzMDlcdTY4MDdcdTk4OTgvXHU1NEM4XHU1RTBDL1x1NEY1Q1x1ODAwNVx1OEZDN1x1NkVFNFx1MjAyNicsXG4gICAgJ3BpY2tlci5jbGVhcic6ICdcdTZFMDVcdTdBN0EnLFxuICAgICdwaWNrZXIubm9NYXRjaCc6ICdcdTY1RTBcdTUzMzlcdTkxNERcdTYzRDBcdTRFQTRcdTMwMDInLFxuICAgICdwaWNrZXIuaGludCc6ICdcdTUyRkVcdTkwMDlcdTYzRDBcdTRFQTRcdTU0MEVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTAgQUkgXHU4OUUzXHU4QkZCXHVGRjFCXHU0RTBCXHU2NUI5XHU1M0VGXHU1MThEXHU4REQxXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHU0RTBFXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHUzMDAyJyxcbiAgICAncGlja2VyLnJvdW5kJzogJ1x1N0IyQyB7bn0gXHU4RjZFJyxcbiAgICAncGlja2VyLnJvdW5kTGF0ZXN0JzogJ1x1N0IyQyB7bn0gXHU4RjZFXHVGRjA4XHU2NzAwXHU2NUIwXHVGRjA5JyxcbiAgICAncGlja2VyLnJvdW5kU2VsZWN0JzogJ1x1OTAwOVx1NjU3NFx1OEY2RScsXG4gICAgJ3BpY2tlci5yb3VuZENsZWFyJzogJ1x1NTNENlx1NkQ4OFx1NjcyQ1x1OEY2RScsXG4gICAgJ3BpY2tlci51bmRpZ2VzdGVkJzogJ1x1NEUwQVx1NkIyMSBBSSBcdTYwM0JcdTdFRDNcdTRFNEJcdTU0MEVcdTc2ODRcdTY1QjBcdTYzRDBcdTRFQTRcdUZGMENcdTVDMUFcdTY3MkFcdTY4MzhcdTY3RTVcdTZEODhcdTUzMTYnLFxuICAgICdwaWNrZXIudW5kaWdlc3RlZENvdW50JzogJ3tufSBcdTRFMkFcdTYzRDBcdTRFQTRcdTY3MkFcdTZEODhcdTUzMTYnLFxuICAgICdpbXBhY3QuZmFjdG9ycyc6ICdcdTk4Q0VcdTk2NjlcdTY3ODRcdTYyMTBcdUZGMDhcdTRFM0FcdTRFQzBcdTRFNDhcdTY2MkZcdThGRDlcdTRFMkFcdTdCNDlcdTdFQTdcdUZGMDknLFxuICAgICdpbXBhY3QucG9pbnRzJzogJ1x1NUY3MVx1NTRDRFx1NzBCOVx1NjYwRVx1N0VDNicsXG4gICAgJ2ltcGFjdC5rZXlQb2ludHMnOiAnXHU1MTczXHU5NTJFXHU3RUM0XHU0RUY2JyxcbiAgICAnaW1wYWN0Lm1lbW9yeSc6ICdcdTdFRDNcdTU0MDhcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdTY4MzhcdTY3RTUnLFxuICAgICdpbXBhY3QuZnVuY3Rpb25zJzogJ1x1NTNEN1x1NUY3MVx1NTRDRFx1NTFGRFx1NjU3MFx1RkYwOFx1OEMwMVx1OEMwM1x1NzUyOFx1NEU4Nlx1ODhBQlx1NjUzOVx1NzY4NFx1NEVFM1x1NzgwMVx1RkYwOScsXG4gICAgJ2ltcGFjdC5mdW5jUm9sZSc6ICdcdTUxRkRcdTY1NzBcdTUyOUZcdTgwRkQnLFxuICAgICdpbXBhY3QuZnVuY0NoYW5nZSc6ICdcdTY3MkNcdTZCMjFcdTUzRDhcdTUzMTYnLFxuICAgICdpbXBhY3QuZnVuY0NhbGxlcnMnOiAnXHU1QkY5XHU4QzAzXHU3NTI4XHU2NUI5XHU3Njg0XHU1RjcxXHU1NENEJyxcbiAgICAnY2FjaGUuaGl0JzogJ1x1Njc2NVx1ODFFQVx1N0YxM1x1NUI1OCcsXG4gICAgJ2NhY2hlLnJlZ2VuZXJhdGUnOiAnXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwJyxcbiAgICAnY29zdC50b29sdGlwJzogJ1x1NjcyQ1x1NkIyMSBBSSBcdThDMDNcdTc1MjhcdTYyMTBcdTY3MkNcdUZGMDhcdTRGMzBcdTdCOTdcdUZGMENcdTYzMDkgRGVlcFNlZWsgXHU0RUY3XHU3NkVFXHU2Mjk4XHU3Qjk3XHVGRjA5JyxcbiAgICAnZXhlYy5jcmVhdGUnOiAnXHU2NUIwXHU1RUZBXHU2MjY3XHU4ODRDJyxcbiAgICAnZXhlYy5mb3JtVGl0bGUnOiAnXHU4OTgxXHU1MDVBXHU0RUMwXHU0RTQ4XHVGRjA4XHU0RTAwXHU1M0U1XHU4QkREXHVGRjA5JyxcbiAgICAnZXhlYy5mb3JtRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMUFcdTc2RUVcdTY4MDdcdTMwMDFcdTZEODlcdTUzQ0FcdTZBMjFcdTU3NTdcdTMwMDFcdTlBOENcdTY1MzZcdTY4MDdcdTUxQzYnLFxuICAgICdleGVjLnN0YXJ0JzogJ1x1NUYwMFx1NTlDQlx1NjI2N1x1ODg0QycsXG4gICAgJ2V4ZWMuc3RhcnRpbmcnOiAnXHU2QjYzXHU1NzI4XHU1NDJGXHU1MkE4XHUyMDI2JyxcbiAgICAnZXhlYy5jcmVhdGVIaW50JzogJ1x1NTIxQlx1NUVGQVx1NTNEOFx1NjZGNFx1NUU3Nlx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1OEJBMVx1NTIxMlx1RkYwQ1x1OTY4Rlx1NTQwRVx1NzUzMSBBSSBcdTVCNTBcdTRFRTNcdTc0MDZcdTkwMTBcdTZCNjVcdTYyNjdcdTg4NENcdUZGMUJcdThGREJcdTVFQTZcdTU3MjhcdTRFMEJcdTY1QjlcdTVCOUVcdTY1RjZcdTUyMzdcdTY1QjBcdUZGMENcdTY1RTBcdTk3MDBcdTUzQkJcdTgwNEFcdTU5MjlcdTMwMDInLFxuICAgICdleGVjLm1vZGVsRGVmYXVsdCc6ICdcdTYyNjdcdTg4NENcdTZBMjFcdTU3OEJcdUZGMDhcdTg5RDJcdTgyNzJcdTlFRDhcdThCQTRcdUZGMUFcdTUyMDZcdTY3OTAvXHU2NENEXHU0RjVDPVx1NUZFQlx1RkYwQ1x1NUYwMFx1NTNEMT1cdTY4MDdcdTUxQzZcdUZGMENcdTg5QzRcdTUyMTI9XHU2M0E4XHU3NDA2XHVGRjBDXHU5QThDXHU2NTM2PVx1OUE4Q1x1NjUzNlx1N0VBN1x1RkYwOScsXG4gICAgJ2JhZGdlLnJ1bm5pbmcnOiAne259IFx1NEUyQVx1NEVGQlx1NTJBMVx1OEZEMFx1ODg0Q1x1NEUyRFx1RkYwQ1x1NzBCOVx1NTFGQlx1NjdFNVx1NzcwQicsXG4gICAgJ25hcnJhdGl2ZS50aXRsZSc6ICdcdTVERTVcdTRGNUNcdThGNkVcdTZCMjFcdTUzRDlcdTRFOEInLFxuICAgICduYXJyYXRpdmUuZ2VuZXJhdGUnOiAnXHU2NTc0XHU0RjUzXHU4OUUzXHU4QkZCXHU4RkQ5XHU4RjZFXHU1REU1XHU0RjVDJyxcbiAgICAnbmFycmF0aXZlLnJ1bm5pbmcnOiAnXHU4OUUzXHU4QkZCXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4XHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXG4gICAgJ2JhZGdlLmZhaWxlZCc6ICd7bn0gXHU0RTJBXHU0RUZCXHU1MkExXHU5NzAwXHU4OTgxXHU1OTA0XHU3NDA2XHVGRjBDXHU3MEI5XHU1MUZCXHU2N0U1XHU3NzBCJyxcbiAgICAnZXhlYy5mbG93Q3JlYXRlJzogJ1x1NTg2Qlx1NTE5OVx1NEVGQlx1NTJBMScsXG4gICAgJ2V4ZWMuZmxvd09yY2hlc3RyYXRlJzogJ1x1Nzg2RVx1OEJBNFx1N0YxNlx1NjM5Mlx1RkYwOFx1NkJDRlx1NkI2NVx1NTNFRlx1NjUzOVx1NkEyMVx1NTc4Qi9cdTg5RDJcdTgyNzIvXHU1OTMxXHU4RDI1XHU3QjU2XHU3NTY1XHVGRjA5JyxcbiAgICAnZXhlYy5mbG93UnVuJzogJ1x1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYwOFJ1biBcdThCRTZcdTYwQzVcdTc3MEJcdThGREJcdTVFQTZcdTRFMEVcdTYyMTBcdTY3MkNcdUZGMDknLFxuICAgICdleGVjLmZsb3dNZW1vcnknOiAnXHU4MUVBXHU1MkE4XHU2M0QwXHU3MEJDXHU4QkIwXHU1RkM2XHVGRjA4XHU4QkIwXHU1RkM2XHU5NzYyXHU2NzdGXHU3ODZFXHU4QkE0XHVGRjA5JyxcbiAgICAnZXhlYy5wbGFubmluZyc6ICdcdTdGMTZcdTYzOTJcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhMTE0gXHU2QjYzXHU1NzI4XHU2MkM2XHU4OUUzXHU0RUZCXHU1MkExXHVGRjBDXHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXG4gICAgJ2V4ZWMuY29sLnN0ZXBzJzogJ1x1NkI2NVx1OUFBNCcsXG4gICAgJ25vdGVzLmVkaXQnOiAnXHU3RjE2XHU4RjkxJyxcbiAgICAnbm90ZXMudG9NZW1vcnknOiAnXHU4RjZDXHU4QkIwXHU1RkM2JyxcbiAgICAnbm90ZXMudG9NZW1vcnlIaW50JzogJ1x1NjI4QVx1OEZEOVx1Njc2MVx1N0IxNFx1OEJCMFx1NzY4NFx1NjgwN1x1OTg5OFx1NEUwRVx1NTE4NVx1NUJCOVx1NTg2Qlx1NTE2NVx1NEUwQlx1NjVCOVx1OEJCMFx1NUZDNlx1ODg2OFx1NTM1NVx1RkYwQ1x1Nzg2RVx1OEJBNFx1NTQwRVx1NTE2NVx1NUU5MycsXG4gICAgJ25vdGVzLnRvTWVtb3J5RG9uZSc6ICdcdTI3MTMgXHU1REYyXHU1ODZCXHU1MTY1XHU4QkIwXHU1RkM2XHU4ODY4XHU1MzU1XHVGRjA4XHU1NzI4XHU0RTBCXHU2NUI5XHUzMDBDXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHUzMDBEXHU1MzNBXHU3ODZFXHU4QkE0XHU3QzdCXHU1NzhCXHU1NDBFXHU2REZCXHU1MkEwXHVGRjA5JyxcbiAgICAnbm90ZXMuY29weU1kJzogJ1x1NTkwRFx1NTIzNiBNRCcsXG4gICAgJ25vdGVzLmNvcHlNZEhpbnQnOiAnXHU2MjhBXHU4RkQ5XHU2NzYxXHU3QjE0XHU4QkIwXHU1OTBEXHU1MjM2XHU0RTNBIE1hcmtkb3duIFx1NTIzMFx1NTI2QVx1OEQzNFx1Njc3RicsXG4gICAgJ25vdGVzLmNvcHlNZERvbmUnOiAnXHU1REYyXHU1OTBEXHU1MjM2XHU0RTNBIE1hcmtkb3duJyxcbiAgICAnbm90ZXMuZXhwb3J0TWQnOiAnXHU1QkZDXHU1MUZBIE1EJyxcbiAgICAnbm90ZXMuZXhwb3J0TWRIaW50JzogJ1x1NEUwQlx1OEY3RFx1NEUzQSAubWQgXHU2NTg3XHU0RUY2JyxcbiAgICAnbm90ZXMuZXhwb3J0RG9uZSc6ICdcdTVERjJcdTVCRkNcdTUxRkFcdTRFM0EgLm1kIFx1NjU4N1x1NEVGNicsXG4gICAgJ25vdGVzLmRpZ2VzdE5ldmVyJzogJ1x1NUMxQVx1NjcyQVx1NzUxRlx1NjIxMFx1OEZDNyBBSSBcdTYwM0JcdTdFRDMnLFxuICAgICdub3Rlcy5kaWdlc3RQZW5kaW5nJzogJ1x1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NTQwRVx1NjcwOSB7bn0gXHU0RTJBXHU2NUIwXHU2M0QwXHU0RUE0XHU2NzJBXHU2RDg4XHU1MzE2JyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlJzogJ1x1NUI1OFx1NEUzQVx1N0IxNFx1OEJCMCcsXG4gICAgJ2RldGFpbC5zYXZlTm90ZUhpbnQnOiAnXHU2MjhBXHU2NzJDXHU2QjIxXHU2ODM4XHU2N0U1XHU3RUQzXHU4QkJBXHVGRjA4XHU2NTM5XHU0RTg2XHU0RUMwXHU0RTQ4L1x1NUI5RVx1NzNCMFx1OTAzQlx1OEY5MS9cdTk4Q0VcdTk2NjlcdTcwQjlcdUZGMDlcdTRFMDBcdTk1MkVcdTVCNThcdTRFM0FcdTdFRDNcdTY3ODRcdTUzMTZcdTdCMTRcdThCQjAnLFxuICAgICdkZXRhaWwuc2F2ZU5vdGVUaXRsZSc6ICdcdTY4MzhcdTY3RTVcdThCQjBcdTVGNTUnLFxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeSc6ICdcdTZDODlcdTZEQzBcdTRFM0FcdThCQjBcdTVGQzYnLFxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeUhpbnQnOiAnXHU2MjhBXHU2NzJDXHU2QjIxXHU2ODM4XHU2N0U1XHU3RUQzXHU4QkJBXHU2Qzg5XHU2REMwXHU0RTNBXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHVGRjA4XHU4RkRCXHU1MTY1XHU1Rjg1XHU3ODZFXHU4QkE0XHU5NjFGXHU1MjE3XHVGRjA5JyxcbiAgICAnbm90ZXMuc2F2ZSc6ICdcdTRGRERcdTVCNTgnLFxuICAgICdub3Rlcy5jYW5jZWwnOiAnXHU1M0Q2XHU2RDg4JyxcbiAgICAnbWVtb3J5LmJyYW5jaFNjb3BlJzogJ1x1NTIwNlx1NjUyRicsXG4gICAgJ21lbW9yeS5icmFuY2hBbGwnOiAnXHU1MTY4XHU5MEU4XHU1MjA2XHU2NTJGJyxcbiAgICAnbm90ZXMuc2VhcmNoJzogJ1x1NjQxQ1x1N0QyMlx1N0IxNFx1OEJCMFx1MjAyNicsXG4gICAgJ21vZGVsLnRpdGxlJzogJ1x1NkEyMVx1NTc4Qlx1NTIwNlx1OTE0RFx1RkYwOFx1ODlFM1x1OEJGQiAvIFx1NjAzQlx1N0VEM1x1N0I0OVx1NEVGQlx1NTJBMVx1NzUyOFx1NTRFQVx1NEUyQVx1NkEyMVx1NTc4Qlx1RkYwOScsXG4gICAgJ21vZGVsLmxvYWRpbmcnOiAnXHU4QkZCXHU1M0Q2XHU2QTIxXHU1NzhCXHU2RTA1XHU1MzU1XHUyMDI2JyxcbiAgICAnbW9kZWwuZm9sbG93Q2hhdCc6ICdcdThEREZcdTk2OEZcdTgwNEFcdTU5MjlcdTZBMjFcdTU3OEInLFxuICAgICdtb2RlbC5zYXZlJzogJ1x1NEZERFx1NUI1OFx1NUU3Nlx1NzUxRlx1NjU0OCcsXG4gICAgJ21vZGVsLnNhdmVkJzogJ1x1NURGMlx1NzUxRlx1NjU0OCcsXG4gICAgJ21vZGVsLmhpbnQnOiAnXHU0RkREXHU1QjU4XHU1NDBFXHU3QUNCXHU1MzczXHU3NTFGXHU2NTQ4XHU1RTc2XHU2MzAxXHU0RTQ1XHU1MzE2XHVGRjA4XHU5MUNEXHU1NDJGXHU1NDBFXHU0RkREXHU3NTU5XHVGRjA5XHVGRjFCXHU0RTBEXHU1RjcxXHU1NENEXHU4MDRBXHU1OTI5XHU2QTIxXHU1NzhCXHUzMDAyJyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5JzogJ0FJIFx1NjAzQlx1N0VEM1x1N0IxNFx1OEJCMCcsXG4gICAgJ25vdGVzLmFpU3VtbWFyeVJ1bic6ICdcdTYwM0JcdTdFRDNcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhcdTdFQTYgMTAtMzAgXHU3OUQyXHVGRjA5JyxcbiAgICAnbm90ZXMuZXhwYW5kJzogJ1x1NUM1NVx1NUYwMFx1NTE2OFx1NjU4NycsXG4gICAgJ25vdGVzLmNvbGxhcHNlJzogJ1x1NjUzNlx1OEQ3NycsXG4gICAgJ25vdGVzLnN1bW1hcnlUYWcnOiAnQUkgXHU2MDNCXHU3RUQzJyxcbiAgICAnbm90ZXMuZW1wdHlTZWFyY2gnOiAnXHU2NUUwXHU1MzM5XHU5MTREXHU3QjE0XHU4QkIwXHUzMDAyJyxcbiAgICAnbm90ZXMuY29udGVudEhpbnQnOiAnXHU3QjE0XHU4QkIwXHU1MTg1XHU1QkI5XHVGRjA4XHU2NTJGXHU2MzAxXHU1OTFBXHU4ODRDXHVGRjA5XHVGRjFBXHU3RUQzXHU4QkJBXHUzMDAxXHU3NTkxXHU5NUVFXHUzMDAxXHU1QjY2XHU0RTYwXHU4OTgxXHU3MEI5XHUzMDAxXHU1MTczXHU5NTJFXHU1MUIzXHU3QjU2XHUyMDI2JyxcbiAgICAnbm90ZXMudGFnc0hpbnQnOiAnXHU2ODA3XHU3QjdFXHVGRjA4XHU5MDE3XHU1M0Y3XHU1MjA2XHU5Njk0XHVGRjBDXHU5MDA5XHU1ODZCXHVGRjFCXHU0RkREXHU1QjU4XHU1NDBFXHU1M0VGXHU3MEI5XHU1MUZCXHU3QjVCXHU5MDA5XHVGRjA5JyxcbiAgICAnbm90ZXMucGluJzogJ1x1N0Y2RVx1OTg3NicsXG4gICAgJ25vdGVzLnVucGluJzogJ1x1NTNENlx1NkQ4OFx1N0Y2RVx1OTg3NicsXG4gICAgJ25vdGVzLmVkaXRlZEF0JzogJ1x1N0YxNlx1OEY5MVx1NEU4RScsXG4gICAgJ3Jldmlldy5maWx0ZXJBbGwnOiAnXHU1MTY4XHU5MEU4JyxcbiAgICAncmV2aWV3LnN0YXR1c0FsbCc6ICdcdTUxNjhcdTkwRThcdTcyQjZcdTYwMDEnLFxuICAgICdyZXZpZXcudmVyaWZ5JzogJ1x1NTkwRFx1NjhDMCcsXG4gICAgJ3Jldmlldy52ZXJpZnlSdW5uaW5nJzogJ1x1NTkwRFx1NjhDMFx1NEUyRFx1MjAyNicsXG4gICAgJ3Jldmlldy52ZXJpZnlIaW50JzogJ1x1NEZFRVx1NjUzOVx1NEVFM1x1NzgwMVx1NTQwRVx1NzBCOVx1NTFGQlx1RkYxQVx1ODFFQVx1NTJBOFx1NjhDMFx1NkQ0Qlx1OTVFRVx1OTg5OFx1NjYyRlx1NTQyNlx1NEZFRVx1NTkwRFx1MzAwMVx1NjUzOVx1NTJBOFx1NjYyRlx1NTQyNlx1NjcwMFx1NEYxOC9cdTY3MDBcdTVDMEZcdTRGQjVcdTUxNjVcdTMwMDFcdTY3MDlcdTY1RTBcdTY1QjBcdTk1RUVcdTk4OThcdUZGMUJcdTUxNjhcdTkwRThcdTkwMUFcdThGQzdcdTYyNERcdTgxRUFcdTUyQThcdTdGNkVcdTRFM0FcdTVERjJcdTg5RTNcdTUxQjMnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZSc6ICdcdTUyMjRcdTVCOUFcdThCRUZcdTYyQTUnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZUhpbnQnOiAnXHU0RUJBXHU1REU1XHU1MjI0XHU1QjlBXHU4QkU1XHU5NUVFXHU5ODk4XHU0RTNBXHU4QkVGXHU2MkE1XHU1RTc2XHU1MTczXHU5NUVEXHVGRjA4XHU0RTBFXHU1OTBEXHU2OEMwXHU4OUUzXHU1MUIzXHU3Njg0XHU4QkVEXHU0RTQ5XHU0RTBEXHU1NDBDXHVGRjA5JyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVUaXRsZSc6ICdcdTUyMjRcdTVCOUFcdTRFM0FcdThCRUZcdTYyQTVcdUZGMUYnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZU1zZyc6ICdcdTMwMEN7dGl0bGV9XHUzMDBEXHU1QzA2XHU4OEFCXHU2ODA3XHU4QkIwXHU0RTNBXHU4QkVGXHU2MkE1XHVGRjA4XHU1REYyXHU2MkQyXHU3RUREXHVGRjA5XHU1RTc2XHU0RUNFXHU1Rjg1XHU1OTA0XHU3NDA2XHU0RTJEXHU3OUZCXHU5NjY0XHUzMDAyJyxcbiAgICAncmV2aWV3LmZpeERldGFpbCc6ICdcdTRGRUVcdTU5MERcdThCRTZcdTYwQzUnLFxuICAgICdyZXZpZXcuZml4U3RhdEZpbGVzJzogJ1x1NjU4N1x1NEVGNicsXG4gICAgJ3Jldmlldy5maXhGaWxlcyc6ICdcdTRGRUVcdTU5MERcdTZEODlcdTUzQ0FcdTY1ODdcdTRFRjYnLFxuICAgICdyZXZpZXcuZml4SW1wYWN0JzogJ1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNFx1RkYwOFx1NjUzOVx1NTJBOFx1N0IyNlx1NTNGN1x1NEUwRVx1OEMwM1x1NzUyOFx1NzBCOVx1RkYwOScsXG4gICAgJ3Jldmlldy5kZWZpbmVkSW4nOiAnXHU1QjlBXHU0RTQ5XHU0RThFJyxcbiAgICAncmV2aWV3LmNhbGxDb3VudCc6ICdcdTU5MDRcdThDMDNcdTc1MjgnLFxuICAgICdyZXZpZXcuZml4RGlmZic6ICdcdTRGRUVcdTU5MERcdTVERUVcdTVGMDJcdUZGMDhcdTc2RjhcdTVCRjlcdThCQzRcdTVCQTFcdTU3RkFcdTdFQkZcdUZGMDknLFxuICAgICdyZXZpZXcucmVmcmVzaCc6ICdcdTUyMzdcdTY1QjAnLFxuICAgICdyZXZpZXcucmV0ZW50aW9uSGludCc6ICdcdTVERjJcdTg5RTNcdTUxQjNcdTk1RUVcdTk4OThcdTRGRERcdTc1NTkge2RheXN9IFx1NTkyOVx1NTQwRVx1ODFFQVx1NTJBOFx1NkUwNVx1NzQwNicsXG4gICAgJ3Jldmlldy50YXJnZXQnOiAnXHU1QkY5XHU4QzYxJyxcbiAgICAncmV2aWV3LndvcmtpbmdUYXJnZXQnOiAnXHU1REU1XHU0RjVDXHU1MzNBJyxcblxuICAgICdwbGFuLnRpdGxlJzogJ1x1N0YxNlx1NjM5Mlx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNCcsXG4gICAgJ3BsYW4uaGludCc6ICdcdTZCQ0ZcdTZCNjVcdTc2ODRcdTg5RDJcdTgyNzJcdTUxQjNcdTVCOUFcdTRFMEFcdTRFMEJcdTY1ODdcdTZDRThcdTUxNjVcdTRFMEVcdTlFRDhcdThCQTRcdTZBMjFcdTU3OEJcdUZGMDhcdTUyMDZcdTY3OTAvXHU2NENEXHU0RjVDPWZhc3RcdUZGMENcdTVGMDBcdTUzRDE9c3RhbmRhcmRcdUZGMENcdTg5QzRcdTUyMTI9cmVhc29uaW5nXHVGRjBDXHU5QThDXHU2NTM2PXZlcmlmaWVyXHVGRjA5XHVGRjFCXHU1M0VGXHU4QzAzXHU2NTc0XHU1NDBFXHU1MThEXHU1NDJGXHU1MkE4XHUzMDAyJyxcbiAgICAncGxhbi5jb2wuc3RlcCc6ICdcdTZCNjVcdTlBQTQnLCAncGxhbi5jb2wucm9sZSc6ICdcdTg5RDJcdTgyNzInLCAncGxhbi5jb2wubW9kZWwnOiAnXHU2QTIxXHU1NzhCJywgJ3BsYW4uY29sLnBvbGljeSc6ICdcdTU5MzFcdThEMjVcdTdCNTZcdTc1NjUnLCAncGxhbi5jb2wuZW5hYmxlZCc6ICdcdTU0MkZcdTc1MjgnLCAncGxhbi5jb2wuYXR0ZW1wdHMnOiAnXHU1QzFEXHU4QkQ1JyxcbiAgICAncGxhbi5tb2RlbERlZmF1bHQnOiAnXHU4RERGXHU5NjhGXHU4OUQyXHU4MjcyXHU5RUQ4XHU4QkE0JyxcbiAgICAncGxhbi5sYXVuY2hFZGl0ZWQnOiAnXHU0RkREXHU1QjU4XHU0RkVFXHU2NTM5XHU1RTc2XHU1NDJGXHU1MkE4JyxcbiAgICAncGxhbi5sYXVuY2hEaXJlY3QnOiAnXHU2MzA5XHU1MzlGXHU4QkExXHU1MjEyXHU1NDJGXHU1MkE4JyxcbiAgICAncGxhbi5kaXNjYXJkJzogJ1x1NjUzRVx1NUYwMycsXG4gICAgJ3BsYW4udmlld0RldGFpbCc6ICdcdThCRTZcdTYwQzUnLCAncGxhbi5yZWZyZXNoRGV0YWlsJzogJ1x1NTIzN1x1NjVCMCcsICdwbGFuLmNsb3NlRGV0YWlsJzogJ1x1NjUzNlx1OEQ3NycsXG4gICAgJ3BsYW4uZGV0YWlsVGl0bGUnOiAnUnVuIFx1OEJFNlx1NjBDNScsXG4gICAgJ3BsYW4ucGF1c2VkQmFubmVyJzogJ1x1NEVGQlx1NTJBMVx1NURGMlx1NjY4Mlx1NTA1Q1x1RkYwQ1x1N0I0OVx1NUY4NVx1NEY2MFx1NzY4NFx1NTFCM1x1N0I1NicsXG4gICAgJ3BsYW4ucmVzdW1lUmV0cnknOiAnXHU5MUNEXHU4QkQ1XHU4QkU1XHU2QjY1XHU5QUE0XHU1RTc2XHU3RUU3XHU3RUVEJyxcbiAgICAncGxhbi5yZXN1bWVTa2lwJzogJ1x1OERGM1x1OEZDN1x1OEJFNVx1NkI2NVx1OUFBNFx1N0VFN1x1N0VFRCcsXG4gICAgJ3BsYW4ucmVzdW1lRmFpbGVkJzogJ1x1NEVDRVx1NTkzMVx1OEQyNVx1NTkwNFx1NjA2Mlx1NTkwRCcsXG4gICAgJ3BsYW4uY29udGV4dFRpdGxlJzogJ1x1NEVGQlx1NTJBMVx1NEUwQVx1NEUwQlx1NjU4N1x1RkYwOFx1NjcyQyBSdW4gXHU2Q0U4XHU1MTY1XHU0RTg2XHU0RUMwXHU0RTQ4XHVGRjA5JyxcbiAgICAncGxhbi5icmFuY2gnOiAnXHU1MjA2XHU2NTJGJywgJ3BsYW4uaW5qZWN0ZWRNZW1vcmllcyc6ICdcdTZDRThcdTUxNjVcdThCQjBcdTVGQzYnLCAncGxhbi5kZWNpc2lvbkxvZyc6ICdcdTUxQjNcdTdCNTZcdTY1RTVcdTVGRDcnLFxuICAgICdleGVjLmNvbC5kZXRhaWwnOiAnXHU4QkU2XHU2MEM1JyxcblxuICAgICdzY2hlZC50aXRsZSc6ICdcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTEnLFxuICAgICdzY2hlZC5mb3JtTmFtZSc6ICdcdTRFRkJcdTUyQTFcdTU0MERcdTc5RjAnLCAnc2NoZWQuZm9ybUludGVydmFsJzogJ1x1OTVGNFx1OTY5NFx1RkYwOFx1NTIwNlx1OTQ5Rlx1RkYwOScsXG4gICAgJ3NjaGVkLnR5cGVSZXZpZXcnOiAnXHU4MUVBXHU1MkE4XHU4QkM0XHU1QkExJywgJ3NjaGVkLnR5cGVTdW1tYXJ5JzogJ0FJIFx1NjAzQlx1N0VEMycsICdzY2hlZC50eXBlUnVuJzogJ1x1NUI5QVx1NjVGNlx1NjI2N1x1ODg0QycsXG4gICAgJ3NjaGVkLmFkZCc6ICdcdTUyMUJcdTVFRkEnLFxuICAgICdzY2hlZC5oaW50JzogJ1x1NTIzMFx1NzBCOVx1ODFFQVx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYxQVx1ODFFQVx1NTJBOFx1OEJDNFx1NUJBMT1cdThCQzRcdTVCQTFcdThGRDEgMjQgXHU1QzBGXHU2NUY2XHU3Njg0XHU2NUIwXHU2M0QwXHU0RUE0XHVGRjA4XHU5NUVFXHU5ODk4XHU4RkRCIFJldmlldyBcdTk3NjJcdTY3N0ZcdUZGMDlcdUZGMUJBSSBcdTYwM0JcdTdFRDM9XHU3NTFGXHU2MjEwXHU1ODlFXHU5MUNGXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzXHVGRjFCXHU1QjlBXHU2NUY2XHU2MjY3XHU4ODRDPVx1NjMwOVx1NkEyMVx1Njc3Rlx1OEREMVx1NEUwMFx1NkIyMVx1N0YxNlx1NjM5Mlx1NEVGQlx1NTJBMVx1MzAwMlx1NjcwMFx1NUMwRiAxIFx1NTIwNlx1OTQ5Rlx1MzAwMicsXG4gICAgJ3NjaGVkLmVtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1MzAwMicsXG4gICAgJ3NjaGVkLmNvbC5uYW1lJzogJ1x1NTQwRFx1NzlGMCcsICdzY2hlZC5jb2wudHlwZSc6ICdcdTdDN0JcdTU3OEInLCAnc2NoZWQuY29sLmludGVydmFsJzogJ1x1NTQ2OFx1NjcxRicsICdzY2hlZC5jb2wubmV4dCc6ICdcdTRFMEJcdTZCMjFcdTYyNjdcdTg4NEMnLCAnc2NoZWQuY29sLmxhc3RSZXN1bHQnOiAnXHU0RTBBXHU2QjIxXHU3RUQzXHU2NzlDJywgJ3NjaGVkLmNvbC5hY3Rpb25zJzogJ1x1NjRDRFx1NEY1QycsXG4gICAgJ3NjaGVkLmRheSc6ICcgXHU1OTI5JywgJ3NjaGVkLmhvdXInOiAnIFx1NUMwRlx1NjVGNicsICdzY2hlZC5taW51dGUnOiAnIFx1NTIwNlx1OTQ5RicsXG4gICAgJ3NjaGVkLmRpc2FibGUnOiAnXHU2NjgyXHU1MDVDJywgJ3NjaGVkLmVuYWJsZSc6ICdcdTU0MkZcdTc1MjgnLCAnc2NoZWQucnVuTm93JzogJ1x1N0FDQlx1NTM3M1x1NjI2N1x1ODg0QycsXG5cbiAgICAnbWVtb3J5LnpvbmVUaXRsZSc6ICdcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzYnLFxuICAgICdtZW1vcnkuc3luY0Jhc2VsaW5lJzogJ1x1NTQwQ1x1NkI2NVx1NTdGQVx1N0VCRicsICdtZW1vcnkuc3luY05vbmUnOiAnXHU2NzJBXHU1NDBDXHU2QjY1JyxcbiAgICAnbWVtb3J5LmJlaGluZCc6ICdcdTg0M0RcdTU0MEUge259IFx1NEUyQVx1NjNEMFx1NEVBNFx1NjcyQVx1NTQwQ1x1NkI2NScsXG4gICAgJ21lbW9yeS5zeW5jJzogJ1x1NTQwQ1x1NkI2NVx1OEJCMFx1NUZDNicsICdtZW1vcnkuc3luY2luZyc6ICdcdTU0MENcdTZCNjVcdTRFMkRcdTIwMjYnLCAnbWVtb3J5LnN5bmNGYWlsZWQnOiAnXHU1NDBDXHU2QjY1XHU1OTMxXHU4RDI1JyxcbiAgICAnbWVtb3J5LnN0YWxlVGl0bGUnOiAnXHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2XHVGRjA4XHU3NkY4XHU1MTczXHU0RUUzXHU3ODAxXHU1REYyXHU4OEFCXHU2NTM5XHU1MkE4XHVGRjBDXHU1Rjg1XHU0RjYwXHU1OTBEXHU2ODM4XHVGRjA5JyxcbiAgICAnbWVtb3J5Lm1hcmtTdGFsZSc6ICdcdTY4MDdcdThCQjBcdThGQzdcdTY1RjYnLCAnbWVtb3J5LmFyY2hpdmVCdG4nOiAnXHU1RjUyXHU2ODYzJywgJ21lbW9yeS5rZWVwQWN0aXZlJzogJ1x1NEVDRFx1NjcwOVx1NjU0OCcsXG4gICAgJ21lbW9yeS5uZXdDYW5kaWRhdGVzJzogJ1x1NjVCMFx1NTg5RVx1NTAxOVx1OTAwOVx1RkYwOFx1NURGMlx1NTE2NVx1NUY4NVx1Nzg2RVx1OEJBNFx1OTYxRlx1NTIxN1x1RkYwOVx1RkYxQScsXG4gICAgJ21lbW9yeS5jbG9zZVJlcG9ydCc6ICdcdTUxNzNcdTk1RURcdTYyQTVcdTU0NEEnLFxuICAgICdtZW1vcnkuc2NvcGVQcm9qZWN0JzogJ1x1NEUzQlx1NUU3Mlx1RkYwOFx1NTE2OFx1NTIwNlx1NjUyRlx1RkYwOScsICdtZW1vcnkuc2NvcGVCcmFuY2gnOiAnXHU0RUM1XHU1RjUzXHU1MjREXHU1MjA2XHU2NTJGJyxcbiAgICAnbWVtb3J5LnBlbmRpbmdRdWV1ZSc6ICdcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTcnLFxuICAgICdtZW1vcnkudG9Ob3RlJzogJ1x1OEY2Q1x1N0IxNFx1OEJCMCcsICdtZW1vcnkubm9ybWFsaXplJzogJ1x1NUY1Mlx1NEUwMFx1NTIzMFx1NEUzQlx1NUU3MicsICdtZW1vcnkucmVzdG9yZSc6ICdcdTYwNjJcdTU5MEQnLFxuICAgICdtZW1vcnkuc3RhdHVzU3RhbGUnOiAnXHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2JyxcbiAgICAnaW1wYWN0LmZ1bmN0aW9uc05vbmUnOiAnXHU2NzJBXHU4QkM2XHU1MjJCXHU1MUZBXHU1MUZEXHU2NTcwXHU3RUE3XHU4QzAzXHU3NTI4XHU1M0Q4XHU1MzE2XHVGRjA4XHU1M0VGXHU4MEZEXHU2NjJGXHU2ODM3XHU1RjBGL1x1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MC9cdTdFQUZcdTkxNERcdTdGNkVcdTY1MzlcdTUyQThcdUZGMDlcdTMwMDInLFxuICAgICdyZXZpZXcuY29sLnNldmVyaXR5JzogJ1x1N0VBN1x1NTIyQicsXG4gICAgJ3Jldmlldy5jb2wuY2F0ZWdvcnknOiAnXHU3QzdCXHU1MjJCJyxcbiAgICAncmV2aWV3LmNvbC50aXRsZSc6ICdcdTk1RUVcdTk4OTgnLFxuICAgICdyZXZpZXcuY29sLmV2aWRlbmNlJzogJ1x1NEY0RFx1N0Y2RScsXG4gICAgJ3Jldmlldy5jb2wuZml4JzogJ1x1NUVGQVx1OEJBRVx1NEZFRVx1NTkwRCcsXG4gICAgJ3Jldmlldy5oaW50JzogJ1x1NzBCOVx1NTFGQlx1NEUwQVx1NjVCOVx1NjMwOVx1OTRBRVx1NUYwMFx1NTlDQlx1NjgzOFx1NjdFNVx1RkYwQ1x1NEVBN1x1NTFGQVx1NjcwMFx1NEYxOFx1NjAyN1x1N0VEM1x1OEJCQVx1NEUwRVx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1MzAwMicsXG4gICAgJ2RpZmYuc2hvdyc6ICdcdTVCRjlcdTZCRDQnLFxuICAgICdkaWZmLmhpZGUnOiAnXHU2NTM2XHU4RDc3XHU1REVFXHU1RjAyJyxcblxuICAgICdkZXRhaWwudGl0bGUnOiAnXHU2ODM4XHU2N0U1XHU4QkU2XHU2MEM1JyxcbiAgICAnZGV0YWlsLnBpY2snOiAnXHUyMTkwIFx1NEVDRVx1NURFNlx1NEZBN1x1OTAwOVx1NjJFOVx1NEUwMFx1NkIyMVx1NjNEMFx1NEVBNFx1RkYwOFx1NjIxNlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOVx1NUYwMFx1NTlDQlx1NjgzOFx1NjdFNScsXG4gICAgJ2RldGFpbC53aGF0JzogJ1x1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OCcsXG4gICAgJ2RldGFpbC5sb2dpYyc6ICdcdTVCOUVcdTczQjBcdTkwM0JcdThGOTEnLFxuICAgICdkZXRhaWwucmlzayc6ICdcdTk4Q0VcdTk2NjlcdTcwQjknLFxuICAgICdkZXRhaWwuZmlsZXMnOiAnXHU2NTg3XHU0RUY2XHU2RTA1XHU1MzU1JyxcbiAgICAnZGV0YWlsLnBhdGNoJzogJ1x1NjdFNVx1NzcwQlx1ODg2NVx1NEUwMVx1NTM5Rlx1NjU4NycsXG4gICAgJ2RldGFpbC5haUxvYWRpbmcnOiAnQUkgXHU4OUUzXHU4QkZCXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4XHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXG4gICAgJ2RldGFpbC5xdWV1ZWQnOiAnXHU4RkQ4XHU2NzA5IHtufSBcdTRFMkFcdTg5RTNcdThCRkJcdTYzOTJcdTk2MUZcdTRFMkRcdUZGMDhcdTgxRUFcdTUyQThcdTVFNzZcdTUzRDFcdTYyNjdcdTg4NENcdUZGMDknLFxuICAgICdkZXRhaWwuY2FyZFF1ZXVlZCc6ICdcdTYzOTJcdTk2MUZcdTdCNDlcdTVGODUgQUkgXHU4OUUzXHU4QkZCXHVGRjA4XHU1RTc2XHU1M0QxXHU0RTBBXHU5NjUwIDNcdUZGMENcdTkwN0ZcdTUxNERcdTYyNTNcdTZFRTFcdTZBMjFcdTU3OEJcdTdGNTFcdTUxNzNcdUZGMDknLFxuICAgICdkZXRhaWwuaW1wYWN0JzogJ1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNFx1NTIwNlx1Njc5MCcsXG4gICAgJ2RldGFpbC5pbXBhY3RMb2FkaW5nJzogJ1x1NUY3MVx1NTRDRFx1NjI2Qlx1NjNDRlx1NEUyRFx1MjAyNlx1RkYwOFx1NUYxNVx1NzUyOFx1NjhDMFx1N0QyMiArIFx1NTZGRVx1OEMzMVx1NEYyMFx1NjRBRFx1RkYwOScsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5JzogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNScsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZyc6ICdcdThCQzRcdTVCQTFcdTRFMkRcdTIwMjZcdUZGMDhcdTRGMUFcdTRFQTdcdTUxRkFcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTRFMEVcdTY3MDBcdTRGMThcdTYwMjdcdTdFRDNcdThCQkFcdUZGMDknLFxuXG4gICAgJ2ltcGFjdC5yaXNrJzogJ1x1OThDRVx1OTY2OScsXG4gICAgJ2ltcGFjdC5jb2wuY2hhbmdlZCc6ICdcdTUzRDhcdTY2RjRcdTY1ODdcdTRFRjYnLFxuICAgICdpbXBhY3QuY29sLmluZGlyZWN0JzogJ1x1OTVGNFx1NjNBNVx1NUY3MVx1NTRDRFx1RkYwOFx1NUYxNVx1NzUyOFx1OTRGRVx1RkYwOScsXG4gICAgJ2ltcGFjdC5jb2wucG90ZW50aWFsJzogJ1x1NkY1Q1x1NTcyOFx1NUY3MVx1NTRDRCcsXG4gICAgJ2ltcGFjdC5ub25lJzogJ1x1NjcyQVx1NTNEMVx1NzNCMFx1NEVEM1x1NUU5M1x1NTE4NVx1NUYxNVx1NzUyOFx1ODAwNVx1RkYwOFx1NjUzOVx1NTJBOFx1NzcwQlx1NEYzQ1x1NzJFQ1x1N0FDQlx1RkYwOVx1MzAwMicsXG4gICAgJ2ltcGFjdC50ZXN0cyc6ICdcdTUxNzNcdTgwNTRcdTZENEJcdThCRDUnLFxuICAgICdpbXBhY3QubGVnZW5kLmNoYW5nZWQnOiAnXHU1M0Q4XHU2NkY0JyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5pbmRpcmVjdCc6ICdcdTk1RjRcdTYzQTUnLFxuICAgICdpbXBhY3QubGVnZW5kLnBvdGVudGlhbCc6ICdcdTZGNUNcdTU3MjgnLFxuXG4gICAgJ3Jldmlldy52ZXJkaWN0JzogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1N0VEM1x1OEJCQScsXG4gICAgJ3Jldmlldy5pc3N1ZXMnOiAnXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1JyxcbiAgICAncmV2aWV3LmNsZWFuJzogJ1x1NjcyQVx1NTNEMVx1NzNCMFx1OTVFRVx1OTg5OFx1MzAwMicsXG5cbiAgICAnbm90ZXMudGl0bGUnOiAnXHU2ODM4XHU2N0U1XHU3QjE0XHU4QkIwJyxcbiAgICAnbm90ZXMuZm9ybVRpdGxlJzogJ1x1N0IxNFx1OEJCMFx1NjgwN1x1OTg5OCcsXG4gICAgJ25vdGVzLmZvcm1Db250ZW50JzogJ1x1N0IxNFx1OEJCMFx1NTE4NVx1NUJCOVx1RkYwOFx1N0VEM1x1OEJCQVx1MzAwMVx1NzU5MVx1OTVFRVx1MzAwMVx1NUI2Nlx1NEU2MFx1ODk4MVx1NzBCOVx1MjAyNlx1RkYwOScsXG4gICAgJ25vdGVzLmFkZCc6ICdcdTZERkJcdTUyQTBcdTdCMTRcdThCQjAnLFxuICAgICdub3Rlcy5ib3VuZFRvJzogJ1x1NUMwNlx1NTE3M1x1ODA1NFx1NTIzMCcsXG4gICAgJ25vdGVzLmNvbC50aW1lJzogJ1x1NjVGNlx1OTVGNCcsXG4gICAgJ25vdGVzLmNvbC50aXRsZSc6ICdcdTY4MDdcdTk4OTgnLFxuICAgICdub3Rlcy5jb2wuY29udGVudCc6ICdcdTUxODVcdTVCQjknLFxuICAgICdub3Rlcy5jb2wuc2hhJzogJ1x1NTE3M1x1ODA1NFx1NjNEMFx1NEVBNCcsXG4gICAgJ25vdGVzLnJlbW92ZSc6ICdcdTUyMjBcdTk2NjQnLFxuICAgICdub3Rlcy5lbXB0eSc6ICdcdThGRDhcdTZDQTFcdTY3MDlcdTdCMTRcdThCQjBcdTMwMDJcdTY4MzhcdTY3RTVcdTYzRDBcdTRFQTRcdTY1RjZcdTk2OEZcdTYyNEJcdThCQjBcdTRFMEJcdTdFRDNcdThCQkFcdTRFMEVcdTc1OTFcdTk1RUVcdUZGMENcdTVDMzFcdTY2MkZcdTRGNjBcdTc2ODRcdTk4NzlcdTc2RUVcdTVCNjZcdTRFNjBcdTY4NjNcdTY4NDhcdTMwMDInLFxuXG4gICAgJ21lbW9yeS5yZWNvcmQnOiAnXHU4QkIwXHU1RjU1XHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2JyxcbiAgICAnZm9ybS5tZW1vcnlUaXRsZSc6ICdcdThCQjBcdTVGQzZcdTY4MDdcdTk4OTgnLFxuICAgICdmb3JtLm1lbW9yeUNvbnRlbnQnOiAnXHU4QkIwXHU1RkM2XHU1MTg1XHU1QkI5XHVGRjA4XHU0RUMwXHU0RTQ4XHU0RTBFXHU0RTNBXHU0RUMwXHU0RTQ4XHVGRjA5JyxcbiAgICAnbWVtb3J5LmNvbC50aXRsZSc6ICdcdTY3NjFcdTc2RUUnLFxuICAgICdtZW1vcnkuY29sLnR5cGUnOiAnXHU3QzdCXHU1NzhCJyxcbiAgICAnbWVtb3J5LmNvbC50cnV0aCc6ICdcdTc3MUZcdTUwM0MnLFxuICAgICdtZW1vcnkuY29sLmJyYW5jaCc6ICdcdTUyMDZcdTY1MkYnLFxuICAgICdtZW1vcnkuY29uZmlybSc6ICdcdTc4NkVcdThCQTQnLFxuICAgICdtZW1vcnkuZW1wdHknOiAnXHU2NjgyXHU2NUUwXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHUzMDAyXHU1M0VGXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1OEJCMFx1NUY1NVx1RkYwQ1x1NjIxNlx1NTcyOFx1NEUwQVx1NjVCOVx1NjI0Qlx1NTJBOFx1NkRGQlx1NTJBMFx1MzAwMicsXG4gICAgJ2NvbmNlcHRzLnRpdGxlJzogJ1x1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNScsXG4gICAgJ2NvbmNlcHRzLm5vbmUnOiAnXHU2NjgyXHU2NUUwXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1XHUzMDAyXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHU4REQxXHU1QjhDXHU1M0Q4XHU2NkY0XHU1NDBFXHU4MUVBXHU1MkE4XHU2Qzg5XHU2REMwXHVGRjBDXHU0RTVGXHU1M0VGXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1NjAzQlx1N0VEM1x1NUI2Nlx1NEU2MFx1ODk4MVx1NzBCOVx1MzAwMicsXG4gICAgJ2NvbmNlcHRzLmNvbC5uYW1lJzogJ1x1Njk4Mlx1NUZGNScsXG4gICAgJ2NvbmNlcHRzLmNvbC5jYXRlZ29yeSc6ICdcdTdDN0JcdTUyMkInLFxuICAgICdjb25jZXB0cy5jb2wuY291bnQnOiAnXHU2QjIxXHU2NTcwJyxcbiAgICAncmV2aWV3LnJlY29yZHNUaXRsZSc6ICdSZXZpZXcgXHU5NUVFXHU5ODk4JyxcbiAgICAncmV2aWV3LnJlY29yZHNFbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTk1RUVcdTk4OThcdThCQjBcdTVGNTVcdTMwMDJcdTYzRDBcdTRFQTRcdTVCQTFcdTY3RTVcdTk4NzVcdThCQzRcdTVCQTFcdTUxRkFcdTc2ODRcdTk1RUVcdTk4OThcdTRGMUFcdTgxRUFcdTUyQThcdTc2N0JcdThCQjBcdTUyMzBcdThGRDlcdTkxQ0NcdUZGMUJcdTkxQ0RcdTY1QjBcdThCQzRcdTVCQTFcdTRGMUFcdTY2RkZcdTYzNjJcdTY1RTdcdThCQjBcdTVGNTVcdTMwMDInLFxuICAgICd2ZXJpZnkucmVjb3Jkcyc6ICdcdTlBOENcdTY1MzZcdThCQjBcdTVGNTUnLFxuICAgICd2ZXJpZnkucmVjb3Jkc0VtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1OUE4Q1x1NjUzNlx1OEJCMFx1NUY1NVx1MzAwMlx1NTcyOFx1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDM1x1NzBCOVx1MzAwQ1x1OUE4Q1x1NjUzNlx1MzAwRFx1NTM3M1x1NzUxRlx1NjIxMFx1MzAwMicsXG5cbiAgICAnY29uZmlybWVkLnRpdGxlJzogJ1x1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1Rlx1RkYwOFx1NEVCQVx1NURFNVx1Nzg2RVx1OEJBNFx1RkYwQ0FJIFx1Nzk4MVx1NjUzOVx1ODFFQVx1NTJBOFx1NjJFNlx1NjIyQVx1RkYwOScsXG4gICAgJ2NvbmZpcm1lZC5hZGQnOiAnXHU2REZCXHU1MkEwXHU3RUE2XHU2NzVGJyxcbiAgICAnY29uZmlybWVkLnRleHQnOiAnXHU3RUE2XHU2NzVGL1x1OTcwMFx1NkM0Mlx1NTE4NVx1NUJCOScsXG4gICAgJ2NvbmZpcm1lZC5wYXRocyc6ICdcdTc5ODFcdTY1MzlcdThERUZcdTVGODRcdUZGMDhcdTkwMTdcdTUzRjdcdTUyMDZcdTk2OTRcdUZGMUJcdTc2RjhcdTVCRjlcdTk4NzlcdTc2RUVcdTY4MzlcdTU5ODIgc3JjL2NvcmVcdUZGMENcdTYyMTZcdTdFRERcdTVCRjlcdThERUZcdTVGODRcdUZGMDknLFxuICAgICdjb25maXJtZWQubm9uZSc6ICdcdTY2ODJcdTY1RTBcdTdFQTZcdTY3NUZcdTMwMDJcdTZERkJcdTUyQTBcdTU0MEVcdUZGMENBSSBcdTRGRUVcdTY1MzlcdTY3MkNcdTk4NzlcdTc2RUVcdTc2ODRcdTc5ODFcdTY1MzlcdThERUZcdTVGODRcdTVDMDZcdTg4QUJcdTgxRUFcdTUyQThcdTYyRDJcdTdFRERcdUZGMDhcdTRFQzVcdTVCRjlcdTY3MkNcdTk4NzlcdTc2RUVcdTc1MUZcdTY1NDhcdUZGMDlcdTMwMDInLFxuXG4gICAgJ2NoYW5nZXMudGl0bGUnOiAnXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExJyxcbiAgICAnc3RhdGUubm9DaGFuZ2VzJzogJ1x1NjY4Mlx1NjVFMFx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1MzAwMlx1NTcyOFx1ODA0QVx1NTkyOVx1NEUyRFx1OEJBOSBBSSBcdTUyMUJcdTVFRkFcdUZGMENcdTYyMTZcdTc1MjhcdTRFMEFcdTY1QjlcdTMwMENcdTY1QjBcdTVFRkFcdTUzRDhcdTY2RjRcdTMwMERcdTMwMDInLFxuICAgICdjaGFuZ2VzLmNvbC50aXRsZSc6ICdcdTY4MDdcdTk4OTgnLFxuICAgICdjaGFuZ2VzLmNvbC50eXBlJzogJ1x1N0M3Qlx1NTc4QicsXG4gICAgJ2NoYW5nZXMuY29sLnN0YXR1cyc6ICdcdTcyQjZcdTYwMDEnLFxuICAgICdjaGFuZ2VzLmNvbC51cGRhdGVkJzogJ1x1NjZGNFx1NjVCMFx1NjVGNlx1OTVGNCcsXG4gICAgJ2V4ZWMuY29sLnN0YXR1cyc6ICdcdTcyQjZcdTYwMDEnLFxuICAgICdleGVjLmNvbC5jaGFuZ2UnOiAnXHU1M0Q4XHU2NkY0JyxcbiAgICAnZXhlYy5jb2wuc3RhcnRlZCc6ICdcdTVGMDBcdTU5Q0InLFxuICAgICdleGVjLmNvbC5jb3N0JzogJ1x1NjIxMFx1NjcyQyhcdTRGMzApJyxcbiAgICAnZXhlYy5hdHRlbXB0cyc6ICdcdTVDMURcdThCRDVcdTZCMjFcdTY1NzAnLFxuICAgICdleGVjLmhpbnQnOiAnXHU2MjY3XHU4ODRDXHVGRjA4c3RhcnRfcnVuXHVGRjA5XHU4QkY3XHU1NzI4XHU1M0YzXHU0RkE3XHU4MDRBXHU1OTI5XHU0RTJEXHU1M0QxXHU4RDc3XHVGRjFBXHU1MjFCXHU1RUZBXHU4QkExXHU1MjEyXHU1NDBFXHU1QkY5IEFJIFx1OEJGNFx1MzAwQ1x1NUYwMFx1NTlDQlx1NjI2N1x1ODg0Q1x1OEJFNSBjaGFuZ2VcdTMwMERcdTMwMDJcdTY3MkNcdTk4NzVcdTY3RTVcdTc3MEJcdThGREJcdTVFQTZcdTRFMEVcdTdFRDNcdTY3OUNcdTMwMDInLFxuICAgICdzdGF0ZS5ub1J1bnMnOiAnXHU2NjgyXHU2NUUwXHU2MjY3XHU4ODRDXHU4QkIwXHU1RjU1XHUzMDAyJyxcbiAgICAnc3RhdGUudGVjaFN0YWNrJzogJ1x1NjI4MFx1NjcyRlx1NjgwOCcsXG4gICAgJ3N0YXRlLnN5bWJvbHMnOiAnXHU1REYyXHU3RDIyXHU1RjE1XHU3QjI2XHU1M0Y3JyxcbiAgICAnc3RhdGUubWFuaWZlc3RzJzogJ1x1NkUwNVx1NTM1NVx1NjU4N1x1NEVGNicsXG4gICAgJ3N0YXRlLmV2aWRlbmNlJzogJ1x1OEJDMVx1NjM2RVx1Njc2MVx1NzZFRScsXG4gIH0sXG4gIGVuOiB7XG4gICAgJ3dvcmtzcGFjZS50aXRsZSc6ICdSZXZpZXcgRGVzaycsXG4gICAgJ3dvcmtzcGFjZS5zZWxlY3RTZXNzaW9uJzogJ1NlbGVjdCBhIHNlc3Npb24gdW5kZXIgYSB3b3Jrc3BhY2Ugb24gdGhlIGxlZnQgdG8gdmlldyBpdHMgcHJvamVjdCBkYXRhLicsXG4gICAgJ3RhYi5jb21taXRzJzogJ0NvbW1pdCBSZXZpZXcnLFxuICAgICd0YWIub3ZlcnZpZXcnOiAnT3ZlcnZpZXcnLFxuICAgICd0YWIuZXhlY3V0aW9uJzogJ0V4ZWN1dGlvbicsXG4gICAgJ3RhYi5yZXZpZXcnOiAnUmV2aWV3IGlzc3VlcycsXG4gICAgJ3RhYi5ub3Rlcyc6ICdOb3RlcyAmIE1lbW9yeScsXG4gICAgJ3RhYi5zZXR0aW5ncyc6ICdTZXR0aW5ncycsXG4gICAgJ2Vycm9yLmxvYWQnOiAnRmFpbGVkIHRvIGxvYWQnLFxuICAgICdzdGF0ZS5wcm9qZWN0JzogJ0N1cnJlbnQgcHJvamVjdCcsXG4gICAgJ3N0YXRlLm5vUHJvamVjdCc6ICdObyBwcm9qZWN0IGluaXRpYWxpemVkJyxcbiAgICAnc3RhdGUubm9Qcm9qZWN0SGludCc6ICdSdW4gXCJJbml0aWFsaXplIHByb2plY3RcIiB0byBzY2FuIHRoZSByZXBvc2l0b3J5IHN0cnVjdHVyZSwgdGVjaCBzdGFjaywgYW5kIHN5bWJvbCBpbmRleC4nLFxuICAgICdhY3Rpb24uYm9vdHN0cmFwJzogJ0luaXRpYWxpemUgcHJvamVjdCcsXG4gICAgJ2FjdGlvbi5yZXNjYW4nOiAnUmUtaW5pdGlhbGl6ZSAvIHNjYW4nLFxuICAgICdhY3Rpb24uYW5hbHl6ZSc6ICdBbmFseXplIHdvcmtpbmcgZGlmZicsXG4gICAgJ2FjdGlvbi5yZXZpZXcnOiAnUmV2aWV3IHdvcmtpbmcgZGlmZicsXG4gICAgJ2FjdGlvbi52ZXJpZnknOiAnVmVyaWZ5IHdvcmtpbmcgZGlmZicsXG4gICAgJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnOiAnQ3JlYXRlIGNoYW5nZScsXG4gICAgJ2FjdGlvbi5ydW5uaW5nJzogJ1J1bm5pbmdcdTIwMjYnLFxuICAgICdhY3Rpb24ucmVmcmVzaCc6ICdSZWZyZXNoJyxcbiAgICAnZm9ybS5jaGFuZ2VUaXRsZSc6ICdDaGFuZ2UgdGl0bGUnLFxuICAgICdmb3JtLmNoYW5nZURlc2MnOiAnUmVxdWlyZW1lbnQgYW5kIGJhY2tncm91bmQgKG9wdGlvbmFsKScsXG4gICAgJ3Jlc3VsdC5wYW5lbCc6ICdBY3Rpb24gcmVzdWx0JyxcblxuICAgICdyZXBvLmFkZCc6ICdBZGQgcmVwbycsXG4gICAgJ3JlcG8uYWRkSGludCc6ICdFbnRlciBhbiBhYnNvbHV0ZSByZXBvIHBhdGggYW5kIHByZXNzIEVudGVyOyBwcmV2aW91c2x5IHVzZWQgcmVwb3MgYXJlIHJlbWVtYmVyZWQnLFxuICAgICdyZXBvLnNjYW5IaXN0b3J5JzogJ1JlYnVpbGQgaGlzdG9yeScsXG4gICAgJ3JlcG8uY29tbWl0cyc6ICdjb21taXRzJyxcbiAgICAncmVwby5icmFuY2gnOiAnYnJhbmNoJyxcbiAgICAncmVwby53b3JraW5nJzogJ1VuY29tbWl0dGVkIGNoYW5nZXMnLFxuICAgICdyZXBvLndvcmtpbmdDbGVhbic6ICdXb3JraW5nIHRyZWUgaXMgY2xlYW4nLFxuICAgICdyZXBvLmVtcHR5JzogJ05vIGNvbW1pdHMuJyxcbiAgICAncmVwby5sb2FkRmFpbGVkJzogJ0ZhaWxlZCB0byBsb2FkIGNvbW1pdHMnLFxuICAgICdwaWNrZXIudGl0bGUnOiAnUGljayBjb21taXRzIHRvIHJldmlldyAobXVsdGktc2VsZWN0KScsXG4gICAgJ3BpY2tlci5wbGFjZWhvbGRlcic6ICdDbGljayB0byBwaWNrIGNvbW1pdHMgKG11bHRpLXNlbGVjdCwgaW5jbHVkZXMgdW5jb21taXR0ZWQpJyxcbiAgICAncGlja2VyLnNlbGVjdGVkJzogJ1NlbGVjdGVkJyxcbiAgICAncGlja2VyLmZpbHRlcic6ICdGaWx0ZXIgYnkgdGl0bGUvaGFzaC9hdXRob3JcdTIwMjYnLFxuICAgICdwaWNrZXIuY2xlYXInOiAnQ2xlYXInLFxuICAgICdwaWNrZXIubm9NYXRjaCc6ICdObyBtYXRjaGluZyBjb21taXQuJyxcbiAgICAncGlja2VyLmhpbnQnOiAnQ2hlY2tpbmcgYSBjb21taXQgZ2VuZXJhdGVzIGl0cyBBSSBleHBsYW5hdGlvbjsgcnVuIGltcGFjdCBhbmQgb3B0aW1hbGl0eSBiZWxvdy4nLFxuICAgICdwaWNrZXIucm91bmQnOiAnUm91bmQge259JyxcbiAgICAncGlja2VyLnJvdW5kTGF0ZXN0JzogJ1JvdW5kIHtufSAobGF0ZXN0KScsXG4gICAgJ3BpY2tlci5yb3VuZFNlbGVjdCc6ICdTZWxlY3Qgcm91bmQnLFxuICAgICdwaWNrZXIucm91bmRDbGVhcic6ICdDbGVhciByb3VuZCcsXG4gICAgJ3BpY2tlci51bmRpZ2VzdGVkJzogJ05ldyBjb21taXRzIHNpbmNlIHRoZSBsYXN0IEFJIHN1bW1hcnkgKG5vdCB5ZXQgcmV2aWV3ZWQpJyxcbiAgICAncGlja2VyLnVuZGlnZXN0ZWRDb3VudCc6ICd7bn0gdW5yZXZpZXdlZCBjb21taXRzJyxcbiAgICAnaW1wYWN0LmZhY3RvcnMnOiAnUmlzayBmYWN0b3JzICh3aHkgdGhpcyBsZXZlbCknLFxuICAgICdpbXBhY3QucG9pbnRzJzogJ0ltcGFjdGVkIHBvaW50cycsXG4gICAgJ2ltcGFjdC5rZXlQb2ludHMnOiAnS2V5IGNvbXBvbmVudHMnLFxuICAgICdpbXBhY3QubWVtb3J5JzogJ0Nyb3NzLWNoZWNrIHdpdGggcHJvamVjdCBtZW1vcnknLFxuICAgICdpbXBhY3QuZnVuY3Rpb25zJzogJ0ltcGFjdGVkIGZ1bmN0aW9ucyAod2hvIGNhbGxzIHRoZSBjaGFuZ2VkIGNvZGUpJyxcbiAgICAnaW1wYWN0LmZ1bmNSb2xlJzogJ0Z1bmN0aW9uIHJvbGUnLFxuICAgICdpbXBhY3QuZnVuY0NoYW5nZSc6ICdDaGFuZ2VkIGJ5IHRoaXMgY29tbWl0JyxcbiAgICAnaW1wYWN0LmZ1bmNDYWxsZXJzJzogJ0ltcGFjdCBvbiBjYWxsZXJzJyxcbiAgICAnY2FjaGUuaGl0JzogJ2Zyb20gY2FjaGUnLFxuICAgICdjYWNoZS5yZWdlbmVyYXRlJzogJ1JlZ2VuZXJhdGUnLFxuICAgICdjb3N0LnRvb2x0aXAnOiAnRXN0aW1hdGVkIGNvc3Qgb2YgdGhpcyBBSSBjYWxsIChEZWVwU2VlayBwcmljaW5nKScsXG4gICAgJ2V4ZWMuY3JlYXRlJzogJ05ldyBydW4nLFxuICAgICdleGVjLmZvcm1UaXRsZSc6ICdXaGF0IHRvIGRvIChvbmUgbGluZSknLFxuICAgICdleGVjLmZvcm1EZXNjJzogJ1JlcXVpcmVtZW50OiBnb2FsLCBtb2R1bGVzLCBhY2NlcHRhbmNlJyxcbiAgICAnZXhlYy5zdGFydCc6ICdTdGFydCBydW4nLFxuICAgICdleGVjLnN0YXJ0aW5nJzogJ1N0YXJ0aW5nXHUyMDI2JyxcbiAgICAnZXhlYy5jcmVhdGVIaW50JzogJ0NyZWF0ZXMgYSBjaGFuZ2UsIGdlbmVyYXRlcyBhIHBsYW4sIHRoZW4gQUkgc3ViYWdlbnRzIGV4ZWN1dGUgc3RlcCBieSBzdGVwOyBwcm9ncmVzcyByZWZyZXNoZXMgYmVsb3cuJyxcbiAgICAnZXhlYy5tb2RlbERlZmF1bHQnOiAnRXhlY3V0aW9uIG1vZGVsIChyb2xlIGRlZmF1bHRzOiBhbmFseXNpcy9vcHM9ZmFzdCwgY29kaW5nPXN0YW5kYXJkLCBwbGFubmluZz1yZWFzb25pbmcsIHZlcmlmaWNhdGlvbj12ZXJpZmllciknLFxuICAgICdiYWRnZS5ydW5uaW5nJzogJ3tufSBydW5zIGluIHByb2dyZXNzLCBjbGljayB0byB2aWV3JyxcbiAgICAnbmFycmF0aXZlLnRpdGxlJzogJ1dvcmstcm91bmQgbmFycmF0aXZlJyxcbiAgICAnbmFycmF0aXZlLmdlbmVyYXRlJzogJ0ludGVycHJldCB0aGlzIHJvdW5kIG9mIHdvcmsnLFxuICAgICduYXJyYXRpdmUucnVubmluZyc6ICdHZW5lcmF0aW5nXHUyMDI2ICh+MTAtMzBzKScsXG4gICAgJ2JhZGdlLmZhaWxlZCc6ICd7bn0gcnVucyBuZWVkIGF0dGVudGlvbiwgY2xpY2sgdG8gdmlldycsXG4gICAgJ2V4ZWMuZmxvd0NyZWF0ZSc6ICdEZXNjcmliZSB0aGUgdGFzaycsXG4gICAgJ2V4ZWMuZmxvd09yY2hlc3RyYXRlJzogJ0NvbmZpcm0gb3JjaGVzdHJhdGlvbiAocGVyLXN0ZXAgbW9kZWwvcm9sZS9mYWlsdXJlIHBvbGljeSknLFxuICAgICdleGVjLmZsb3dSdW4nOiAnTGF1bmNoICh0cmFjayBwcm9ncmVzcyAmIGNvc3QgaW4gcnVuIGRldGFpbCknLFxuICAgICdleGVjLmZsb3dNZW1vcnknOiAnQXV0by1kaXN0aWxsIG1lbW9yaWVzIChjb25maXJtIGluIG1lbW9yeSBwYW5lbCknLFxuICAgICdleGVjLnBsYW5uaW5nJzogJ0dlbmVyYXRpbmcgb3JjaGVzdHJhdGlvblx1MjAyNiAoTExNIGlzIGRlY29tcG9zaW5nIHRoZSB0YXNrLCB+MTAtMzBzKScsXG4gICAgJ2V4ZWMuY29sLnN0ZXBzJzogJ1N0ZXBzJyxcbiAgICAnbm90ZXMuZWRpdCc6ICdFZGl0JyxcbiAgICAnbm90ZXMudG9NZW1vcnknOiAnVG8gbWVtb3J5JyxcbiAgICAnbm90ZXMudG9NZW1vcnlIaW50JzogJ1ByZWZpbGwgdGhlIG1lbW9yeSBmb3JtIGJlbG93IHdpdGggdGhpcyBub3RlJyxcbiAgICAnbm90ZXMudG9NZW1vcnlEb25lJzogJ1x1MjcxMyBQcmVmaWxsZWQgdGhlIG1lbW9yeSBmb3JtIChjaG9vc2UgYSB0eXBlIGluIHRoZSBQcm9qZWN0IG1lbW9yeSB6b25lIGJlbG93LCB0aGVuIGFkZCknLFxuICAgICdub3Rlcy5jb3B5TWQnOiAnQ29weSBNRCcsXG4gICAgJ25vdGVzLmNvcHlNZEhpbnQnOiAnQ29weSB0aGlzIG5vdGUgYXMgTWFya2Rvd24gdG8gdGhlIGNsaXBib2FyZCcsXG4gICAgJ25vdGVzLmNvcHlNZERvbmUnOiAnQ29waWVkIGFzIE1hcmtkb3duJyxcbiAgICAnbm90ZXMuZXhwb3J0TWQnOiAnRXhwb3J0IE1EJyxcbiAgICAnbm90ZXMuZXhwb3J0TWRIaW50JzogJ0Rvd25sb2FkIGFzIGEgLm1kIGZpbGUnLFxuICAgICdub3Rlcy5leHBvcnREb25lJzogJ0V4cG9ydGVkIGFzIC5tZCcsXG4gICAgJ25vdGVzLmRpZ2VzdE5ldmVyJzogJ05vIEFJIHN1bW1hcnkgZ2VuZXJhdGVkIHlldCcsXG4gICAgJ25vdGVzLmRpZ2VzdFBlbmRpbmcnOiAne259IG5ldyBjb21taXRzIHNpbmNlIHRoZSBsYXN0IHN1bW1hcnknLFxuICAgICdkZXRhaWwuc2F2ZU5vdGUnOiAnU2F2ZSBhcyBub3RlJyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlSGludCc6ICdTYXZlIHRoaXMgcmV2aWV3IGNvbmNsdXNpb24gKHdoYXQvbG9naWMvcmlza3MpIGFzIGEgc3RydWN0dXJlZCBub3RlJyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlVGl0bGUnOiAnUmV2aWV3IHJlY29yZCcsXG4gICAgJ2RldGFpbC5zYXZlTWVtb3J5JzogJ0Rpc3RpbGwgdG8gbWVtb3J5JyxcbiAgICAnZGV0YWlsLnNhdmVNZW1vcnlIaW50JzogJ0Rpc3RpbGwgdGhpcyByZXZpZXcgY29uY2x1c2lvbiBpbnRvIGEgcHJvamVjdCBtZW1vcnkgKHF1ZXVlZCBmb3IgY29uZmlybWF0aW9uKScsXG4gICAgJ25vdGVzLnNhdmUnOiAnU2F2ZScsXG4gICAgJ25vdGVzLmNhbmNlbCc6ICdDYW5jZWwnLFxuICAgICdtZW1vcnkuYnJhbmNoU2NvcGUnOiAnQnJhbmNoJyxcbiAgICAnbWVtb3J5LmJyYW5jaEFsbCc6ICdBbGwgYnJhbmNoZXMnLFxuICAgICdub3Rlcy5zZWFyY2gnOiAnU2VhcmNoIG5vdGVzXHUyMDI2JyxcbiAgICAnbW9kZWwudGl0bGUnOiAnTW9kZWwgYXNzaWdubWVudCAod2hpY2ggbW9kZWwgcGVyIHRhc2spJyxcbiAgICAnbW9kZWwubG9hZGluZyc6ICdMb2FkaW5nIG1vZGVsc1x1MjAyNicsXG4gICAgJ21vZGVsLmZvbGxvd0NoYXQnOiAnRm9sbG93IGNoYXQgbW9kZWwnLFxuICAgICdtb2RlbC5zYXZlJzogJ1NhdmUgJiBhcHBseScsXG4gICAgJ21vZGVsLnNhdmVkJzogJ0FwcGxpZWQnLFxuICAgICdtb2RlbC5oaW50JzogJ0FwcGxpZXMgaW1tZWRpYXRlbHkgYW5kIHBlcnNpc3RzIGFjcm9zcyByZXN0YXJ0czsgY2hhdCBtb2RlbCB1bmFmZmVjdGVkLicsXG4gICAgJ25vdGVzLmFpU3VtbWFyeSc6ICdBSSBzdW1tYXJ5JyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5UnVuJzogJ1N1bW1hcml6aW5nXHUyMDI2ICgxMC0zMHMpJyxcbiAgICAnbm90ZXMuZXhwYW5kJzogJ0V4cGFuZCcsXG4gICAgJ25vdGVzLmNvbGxhcHNlJzogJ0NvbGxhcHNlJyxcbiAgICAnbm90ZXMuc3VtbWFyeVRhZyc6ICdBSSBzdW1tYXJ5JyxcbiAgICAnbm90ZXMuZW1wdHlTZWFyY2gnOiAnTm8gbWF0Y2hpbmcgbm90ZXMuJyxcbiAgICAnbm90ZXMuY29udGVudEhpbnQnOiAnTm90ZSBjb250ZW50IChtdWx0aS1saW5lKTogY29uY2x1c2lvbnMsIHF1ZXN0aW9ucywgbGVhcm5pbmdzXHUyMDI2JyxcbiAgICAnbm90ZXMudGFnc0hpbnQnOiAnVGFncyAoY29tbWEgc2VwYXJhdGVkLCBvcHRpb25hbDsgY2xpY2sgYSB0YWcgdG8gZmlsdGVyKScsXG4gICAgJ25vdGVzLnBpbic6ICdQaW4nLFxuICAgICdub3Rlcy51bnBpbic6ICdVbnBpbicsXG4gICAgJ25vdGVzLmVkaXRlZEF0JzogJ2VkaXRlZCcsXG4gICAgJ3Jldmlldy5maWx0ZXJBbGwnOiAnQWxsJyxcbiAgICAncmV2aWV3LnN0YXR1c0FsbCc6ICdBbGwgc3RhdHVzZXMnLFxuICAgICdyZXZpZXcudmVyaWZ5JzogJ1JlLXZlcmlmeScsXG4gICAgJ3Jldmlldy52ZXJpZnlSdW5uaW5nJzogJ1ZlcmlmeWluZ1x1MjAyNicsXG4gICAgJ3Jldmlldy52ZXJpZnlIaW50JzogJ0FmdGVyIGZpeGluZyB0aGUgY29kZSwgY2xpY2sgdG8gcmUtY2hlY2s6IHdoZXRoZXIgaXNzdWVzIGFyZSBmaXhlZCwgd2hldGhlciB0aGUgY2hhbmdlIGlzIG9wdGltYWwgYW5kIG1pbmltYWxseSBpbnZhc2l2ZSwgYW5kIHdoZXRoZXIgbmV3IGlzc3VlcyBhcHBlYXJlZC4gT25seSBhIHBhc3NpbmcgcmUtdmVyaWZpY2F0aW9uIG1hcmtzIGlzc3VlcyByZXNvbHZlZC4nLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZSc6ICdGYWxzZSBwb3NpdGl2ZScsXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlSGludCc6ICdIdW1hbi1tYXJrIHRoaXMgaXNzdWUgYXMgYSBmYWxzZSBwb3NpdGl2ZSBhbmQgY2xvc2UgaXQgKGRpc3RpbmN0IGZyb20gYSB2ZXJpZmllZCBmaXgpJyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVUaXRsZSc6ICdNYXJrIGFzIGZhbHNlIHBvc2l0aXZlPycsXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlTXNnJzogJ1wie3RpdGxlfVwiIHdpbGwgYmUgbWFya2VkIHJlamVjdGVkIGFuZCByZW1vdmVkIGZyb20gdGhlIG9wZW4gcXVldWUuJyxcbiAgICAncmV2aWV3LmZpeERldGFpbCc6ICdGaXggZGV0YWlscycsXG4gICAgJ3Jldmlldy5maXhTdGF0RmlsZXMnOiAnZmlsZXMnLFxuICAgICdyZXZpZXcuZml4RmlsZXMnOiAnRmlsZXMgdG91Y2hlZCBieSB0aGUgZml4JyxcbiAgICAncmV2aWV3LmZpeEltcGFjdCc6ICdJbXBhY3Qgc2NvcGUgKGNoYW5nZWQgc3ltYm9scyBhbmQgY2FsbGVycyknLFxuICAgICdyZXZpZXcuZGVmaW5lZEluJzogJ2RlZmluZWQgaW4nLFxuICAgICdyZXZpZXcuY2FsbENvdW50JzogJ2NhbGwgc2l0ZShzKScsXG4gICAgJ3Jldmlldy5maXhEaWZmJzogJ0ZpeCBkaWZmIChyZWxhdGl2ZSB0byB0aGUgcmV2aWV3IGJhc2VsaW5lKScsXG4gICAgJ3Jldmlldy5yZWZyZXNoJzogJ1JlZnJlc2gnLFxuICAgICdyZXZpZXcucmV0ZW50aW9uSGludCc6ICdSZXNvbHZlZCBpc3N1ZXMgYXJlIGF1dG8tcHVyZ2VkIGFmdGVyIHtkYXlzfSBkYXkocyknLFxuICAgICdyZXZpZXcudGFyZ2V0JzogJ1RhcmdldCcsXG4gICAgJ3Jldmlldy53b3JraW5nVGFyZ2V0JzogJ1dvcmtpbmcgdHJlZScsXG5cbiAgICAncGxhbi50aXRsZSc6ICdPcmNoZXN0cmF0aW9uIHBsYW4nLFxuICAgICdwbGFuLmhpbnQnOiAnRWFjaCBzdGVwIHJvbGUgZHJpdmVzIGNvbnRleHQgaW5qZWN0aW9uIGFuZCB0aGUgZGVmYXVsdCBtb2RlbCAoYW5hbHlzaXMvb3BzPWZhc3QsIGNvZGluZz1zdGFuZGFyZCwgcGxhbm5pbmc9cmVhc29uaW5nLCB2ZXJpZmljYXRpb249dmVyaWZpZXIpOyBhZGp1c3QgYmVmb3JlIGxhdW5jaGluZy4nLFxuICAgICdwbGFuLmNvbC5zdGVwJzogJ1N0ZXAnLCAncGxhbi5jb2wucm9sZSc6ICdSb2xlJywgJ3BsYW4uY29sLm1vZGVsJzogJ01vZGVsJywgJ3BsYW4uY29sLnBvbGljeSc6ICdGYWlsdXJlIHBvbGljeScsICdwbGFuLmNvbC5lbmFibGVkJzogJ09uJywgJ3BsYW4uY29sLmF0dGVtcHRzJzogJ0F0dGVtcHRzJyxcbiAgICAncGxhbi5tb2RlbERlZmF1bHQnOiAnUm9sZSBkZWZhdWx0JyxcbiAgICAncGxhbi5sYXVuY2hFZGl0ZWQnOiAnU2F2ZSBlZGl0cyAmIGxhdW5jaCcsXG4gICAgJ3BsYW4ubGF1bmNoRGlyZWN0JzogJ0xhdW5jaCBhcy1pcycsXG4gICAgJ3BsYW4uZGlzY2FyZCc6ICdEaXNjYXJkJyxcbiAgICAncGxhbi52aWV3RGV0YWlsJzogJ0RldGFpbCcsICdwbGFuLnJlZnJlc2hEZXRhaWwnOiAnUmVmcmVzaCcsICdwbGFuLmNsb3NlRGV0YWlsJzogJ0Nsb3NlJyxcbiAgICAncGxhbi5kZXRhaWxUaXRsZSc6ICdSdW4gZGV0YWlsJyxcbiAgICAncGxhbi5wYXVzZWRCYW5uZXInOiAnUnVuIHBhdXNlZCwgYXdhaXRpbmcgeW91ciBkZWNpc2lvbicsXG4gICAgJ3BsYW4ucmVzdW1lUmV0cnknOiAnUmV0cnkgc3RlcCAmIGNvbnRpbnVlJyxcbiAgICAncGxhbi5yZXN1bWVTa2lwJzogJ1NraXAgc3RlcCAmIGNvbnRpbnVlJyxcbiAgICAncGxhbi5yZXN1bWVGYWlsZWQnOiAnUmVzdW1lIGZyb20gZmFpbHVyZScsXG4gICAgJ3BsYW4uY29udGV4dFRpdGxlJzogJ1J1biBjb250ZXh0ICh3aGF0IHdhcyBpbmplY3RlZCknLFxuICAgICdwbGFuLmJyYW5jaCc6ICdCcmFuY2gnLCAncGxhbi5pbmplY3RlZE1lbW9yaWVzJzogJ0luamVjdGVkIG1lbW9yaWVzJywgJ3BsYW4uZGVjaXNpb25Mb2cnOiAnRGVjaXNpb24gbG9nJyxcbiAgICAnZXhlYy5jb2wuZGV0YWlsJzogJ0RldGFpbCcsXG5cbiAgICAnc2NoZWQudGl0bGUnOiAnU2NoZWR1bGVkIHRhc2tzJyxcbiAgICAnc2NoZWQuZm9ybU5hbWUnOiAnVGFzayBuYW1lJywgJ3NjaGVkLmZvcm1JbnRlcnZhbCc6ICdJbnRlcnZhbCAobWludXRlcyknLFxuICAgICdzY2hlZC50eXBlUmV2aWV3JzogJ0F1dG8gcmV2aWV3JywgJ3NjaGVkLnR5cGVTdW1tYXJ5JzogJ0FJIHN1bW1hcnknLCAnc2NoZWQudHlwZVJ1bic6ICdUaW1lZCBydW4nLFxuICAgICdzY2hlZC5hZGQnOiAnQ3JlYXRlJyxcbiAgICAnc2NoZWQuaGludCc6ICdSdW5zIGF1dG9tYXRpY2FsbHkgd2hlbiBkdWU6IGF1dG8gcmV2aWV3ID0gcmV2aWV3IGNvbW1pdHMgZnJvbSB0aGUgbGFzdCAyNGggKGlzc3VlcyBsYW5kIGluIHRoZSBSZXZpZXcgdGFiKTsgQUkgc3VtbWFyeSA9IGluY3JlbWVudGFsIGxlYXJuaW5nIHN1bW1hcnk7IHRpbWVkIHJ1biA9IGV4ZWN1dGUgdGhlIHRlbXBsYXRlIGFzIGFuIG9yY2hlc3RyYXRlZCB0YXNrLiBNaW5pbXVtIDEgbWludXRlLicsXG4gICAgJ3NjaGVkLmVtcHR5JzogJ05vIHNjaGVkdWxlZCB0YXNrcyB5ZXQuJyxcbiAgICAnc2NoZWQuY29sLm5hbWUnOiAnTmFtZScsICdzY2hlZC5jb2wudHlwZSc6ICdUeXBlJywgJ3NjaGVkLmNvbC5pbnRlcnZhbCc6ICdDeWNsZScsICdzY2hlZC5jb2wubmV4dCc6ICdOZXh0IHJ1bicsICdzY2hlZC5jb2wubGFzdFJlc3VsdCc6ICdMYXN0IHJlc3VsdCcsICdzY2hlZC5jb2wuYWN0aW9ucyc6ICdBY3Rpb25zJyxcbiAgICAnc2NoZWQuZGF5JzogJyBkJywgJ3NjaGVkLmhvdXInOiAnIGgnLCAnc2NoZWQubWludXRlJzogJyBtaW4nLFxuICAgICdzY2hlZC5kaXNhYmxlJzogJ1BhdXNlJywgJ3NjaGVkLmVuYWJsZSc6ICdFbmFibGUnLCAnc2NoZWQucnVuTm93JzogJ1J1biBub3cnLFxuXG4gICAgJ21lbW9yeS56b25lVGl0bGUnOiAnUHJvamVjdCBtZW1vcnknLFxuICAgICdtZW1vcnkuc3luY0Jhc2VsaW5lJzogJ1N5bmMgYmFzZWxpbmUnLCAnbWVtb3J5LnN5bmNOb25lJzogJ25ldmVyIHN5bmNlZCcsXG4gICAgJ21lbW9yeS5iZWhpbmQnOiAne259IGNvbW1pdHMgYmVoaW5kJyxcbiAgICAnbWVtb3J5LnN5bmMnOiAnU3luYyBtZW1vcnknLCAnbWVtb3J5LnN5bmNpbmcnOiAnU3luY2luZ1x1MjAyNicsICdtZW1vcnkuc3luY0ZhaWxlZCc6ICdTeW5jIGZhaWxlZCcsXG4gICAgJ21lbW9yeS5zdGFsZVRpdGxlJzogJ1Bvc3NpYmx5IHN0YWxlIChyZWxhdGVkIGNvZGUgY2hhbmdlZDsgcmV2aWV3IG5lZWRlZCknLFxuICAgICdtZW1vcnkubWFya1N0YWxlJzogJ01hcmsgc3RhbGUnLCAnbWVtb3J5LmFyY2hpdmVCdG4nOiAnQXJjaGl2ZScsICdtZW1vcnkua2VlcEFjdGl2ZSc6ICdTdGlsbCB2YWxpZCcsXG4gICAgJ21lbW9yeS5uZXdDYW5kaWRhdGVzJzogJ05ldyBjYW5kaWRhdGVzIChxdWV1ZWQgZm9yIGNvbmZpcm1hdGlvbik6JyxcbiAgICAnbWVtb3J5LmNsb3NlUmVwb3J0JzogJ0Nsb3NlIHJlcG9ydCcsXG4gICAgJ21lbW9yeS5zY29wZVByb2plY3QnOiAnTWFpbmxpbmUgKGFsbCBicmFuY2hlcyknLCAnbWVtb3J5LnNjb3BlQnJhbmNoJzogJ0N1cnJlbnQgYnJhbmNoIG9ubHknLFxuICAgICdtZW1vcnkucGVuZGluZ1F1ZXVlJzogJ1BlbmRpbmcgY29uZmlybWF0aW9uJyxcbiAgICAnbWVtb3J5LnRvTm90ZSc6ICdUbyBub3RlJywgJ21lbW9yeS5ub3JtYWxpemUnOiAnTm9ybWFsaXplIHRvIG1haW5saW5lJywgJ21lbW9yeS5yZXN0b3JlJzogJ1Jlc3RvcmUnLFxuICAgICdtZW1vcnkuc3RhdHVzU3RhbGUnOiAnU3RhbGUnLFxuICAgICdmcy5icm93c2UnOiAnQnJvd3NlJyxcbiAgICAnZnMudXAnOiAnVXAnLFxuICAgICdmcy51c2UnOiAnVXNlIHRoaXMgZGlyZWN0b3J5JyxcbiAgICAnZnMucmVnaXN0ZXInOiAnQWxzbyByZWdpc3RlciBhcyBzZXNzaW9uIHdvcmtzcGFjZScsXG4gICAgJ2ZzLmxvYWRpbmcnOiAnUmVhZGluZ1x1MjAyNicsXG4gICAgJ2ZzLmVtcHR5JzogJ05vIHN1YmRpcmVjdG9yaWVzLicsXG4gICAgJ2ltcGFjdC5mdW5jdGlvbnNOb25lJzogJ05vIGZ1bmN0aW9uLWxldmVsIGNhbGwgaW1wYWN0IGRldGVjdGVkIChzdHlsZS9hc3NldC9jb25maWctb25seSBjaGFuZ2UpLicsXG4gICAgJ3Jldmlldy5jb2wuc2V2ZXJpdHknOiAnU2V2ZXJpdHknLFxuICAgICdyZXZpZXcuY29sLmNhdGVnb3J5JzogJ0NhdGVnb3J5JyxcbiAgICAncmV2aWV3LmNvbC50aXRsZSc6ICdJc3N1ZScsXG4gICAgJ3Jldmlldy5jb2wuZXZpZGVuY2UnOiAnTG9jYXRpb24nLFxuICAgICdyZXZpZXcuY29sLmZpeCc6ICdTdWdnZXN0ZWQgZml4JyxcbiAgICAncmV2aWV3LmhpbnQnOiAnQ2xpY2sgdGhlIGJ1dHRvbiBhYm92ZSB0byBwcm9kdWNlIHRoZSBvcHRpbWFsaXR5IHZlcmRpY3QgYW5kIGlzc3VlIGxpc3QuJyxcbiAgICAnZGlmZi5zaG93JzogJ0RpZmYnLFxuICAgICdkaWZmLmhpZGUnOiAnSGlkZSBkaWZmJyxcblxuICAgICdkZXRhaWwudGl0bGUnOiAnUmV2aWV3IGRldGFpbCcsXG4gICAgJ2RldGFpbC5waWNrJzogJ1x1MjE5MCBQaWNrIGEgY29tbWl0IChvciB0aGUgdW5jb21taXR0ZWQgY2hhbmdlcykgb24gdGhlIGxlZnQgdG8gc3RhcnQgcmV2aWV3aW5nJyxcbiAgICAnZGV0YWlsLndoYXQnOiAnV2hhdCBpdCBkb2VzJyxcbiAgICAnZGV0YWlsLmxvZ2ljJzogJ0ltcGxlbWVudGF0aW9uIGxvZ2ljJyxcbiAgICAnZGV0YWlsLnJpc2snOiAnUmlza3MnLFxuICAgICdkZXRhaWwuZmlsZXMnOiAnRmlsZXMnLFxuICAgICdkZXRhaWwucGF0Y2gnOiAnU2hvdyByYXcgcGF0Y2gnLFxuICAgICdkZXRhaWwuYWlMb2FkaW5nJzogJ0dlbmVyYXRpbmcgQUkgZXhwbGFuYXRpb25cdTIwMjYgKDEwLTMwcyknLFxuICAgICdkZXRhaWwucXVldWVkJzogJ3tufSBhbmFseXNlcyBxdWV1ZWQgKHdpbGwgcnVuIGNvbmN1cnJlbnRseSknLFxuICAgICdkZXRhaWwuY2FyZFF1ZXVlZCc6ICdXYWl0aW5nIGluIHRoZSBhbmFseXNpcyBxdWV1ZSAobWF4IDMgY29uY3VycmVudCB0byBwcm90ZWN0IHRoZSBtb2RlbCBnYXRld2F5KScsXG4gICAgJ2RldGFpbC5pbXBhY3QnOiAnSW1wYWN0IHNjb3BlJyxcbiAgICAnZGV0YWlsLmltcGFjdExvYWRpbmcnOiAnU2Nhbm5pbmcgaW1wYWN0XHUyMDI2IChyZWZlcmVuY2Ugc2VhcmNoICsgZ3JhcGggd2FsayknLFxuICAgICdkZXRhaWwub3B0aW1hbGl0eSc6ICdPcHRpbWFsaXR5IHJldmlldycsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZyc6ICdSZXZpZXdpbmdcdTIwMjYgKHByb2R1Y2VzIGlzc3VlIGxpc3QgYW5kIG9wdGltYWxpdHkgdmVyZGljdCknLFxuXG4gICAgJ2ltcGFjdC5yaXNrJzogJ1Jpc2snLFxuICAgICdpbXBhY3QuY29sLmNoYW5nZWQnOiAnQ2hhbmdlZCBmaWxlcycsXG4gICAgJ2ltcGFjdC5jb2wuaW5kaXJlY3QnOiAnSW5kaXJlY3QgKHJlZmVyZW5jZSBjaGFpbiknLFxuICAgICdpbXBhY3QuY29sLnBvdGVudGlhbCc6ICdQb3RlbnRpYWwnLFxuICAgICdpbXBhY3Qubm9uZSc6ICdObyBpbi1yZXBvIHJlZmVyZW5jZXJzIGZvdW5kICh0aGUgY2hhbmdlIGxvb2tzIHNlbGYtY29udGFpbmVkKS4nLFxuICAgICdpbXBhY3QudGVzdHMnOiAnUmVsYXRlZCB0ZXN0cycsXG4gICAgJ2ltcGFjdC5sZWdlbmQuY2hhbmdlZCc6ICdjaGFuZ2VkJyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5pbmRpcmVjdCc6ICdpbmRpcmVjdCcsXG4gICAgJ2ltcGFjdC5sZWdlbmQucG90ZW50aWFsJzogJ3BvdGVudGlhbCcsXG5cbiAgICAncmV2aWV3LnZlcmRpY3QnOiAnT3B0aW1hbGl0eSB2ZXJkaWN0JyxcbiAgICAncmV2aWV3Lmlzc3Vlcyc6ICdJc3N1ZXMnLFxuICAgICdyZXZpZXcuY2xlYW4nOiAnTm8gaXNzdWVzIGZvdW5kLicsXG5cbiAgICAnbm90ZXMudGl0bGUnOiAnUmV2aWV3IG5vdGVzJyxcbiAgICAnbm90ZXMuZm9ybVRpdGxlJzogJ05vdGUgdGl0bGUnLFxuICAgICdub3Rlcy5mb3JtQ29udGVudCc6ICdOb3RlIGNvbnRlbnQgKGNvbmNsdXNpb25zLCBxdWVzdGlvbnMsIGxlYXJuaW5nc1x1MjAyNiknLFxuICAgICdub3Rlcy5hZGQnOiAnQWRkIG5vdGUnLFxuICAgICdub3Rlcy5ib3VuZFRvJzogJ1dpbGwgYmUgbGlua2VkIHRvJyxcbiAgICAnbm90ZXMuY29sLnRpbWUnOiAnVGltZScsXG4gICAgJ25vdGVzLmNvbC50aXRsZSc6ICdUaXRsZScsXG4gICAgJ25vdGVzLmNvbC5jb250ZW50JzogJ0NvbnRlbnQnLFxuICAgICdub3Rlcy5jb2wuc2hhJzogJ0NvbW1pdCcsXG4gICAgJ25vdGVzLnJlbW92ZSc6ICdEZWxldGUnLFxuICAgICdub3Rlcy5lbXB0eSc6ICdObyBub3RlcyB5ZXQuIE5vdGUgZG93biBjb25jbHVzaW9ucyBhbmQgcXVlc3Rpb25zIHdoaWxlIHJldmlld2luZyBjb21taXRzIFx1MjAxNCB0aGF0IGlzIHlvdXIgcHJvamVjdCBsZWFybmluZyBhcmNoaXZlLicsXG5cbiAgICAnbWVtb3J5LnJlY29yZCc6ICdSZWNvcmQgcHJvamVjdCBtZW1vcnknLFxuICAgICdmb3JtLm1lbW9yeVRpdGxlJzogJ01lbW9yeSB0aXRsZScsXG4gICAgJ2Zvcm0ubWVtb3J5Q29udGVudCc6ICdNZW1vcnkgY29udGVudCAod2hhdCBhbmQgd2h5KScsXG4gICAgJ21lbW9yeS5jb2wudGl0bGUnOiAnSXRlbScsXG4gICAgJ21lbW9yeS5jb2wudHlwZSc6ICdUeXBlJyxcbiAgICAnbWVtb3J5LmNvbC50cnV0aCc6ICdUcnV0aCcsXG4gICAgJ21lbW9yeS5jb2wuYnJhbmNoJzogJ0JyYW5jaCcsXG4gICAgJ21lbW9yeS5jb25maXJtJzogJ0NvbmZpcm0nLFxuICAgICdtZW1vcnkuZW1wdHknOiAnTm8gcHJvamVjdCBtZW1vcmllcyB5ZXQuIEFzayB0aGUgQUkgaW4gY2hhdCB0byByZWNvcmQgb25lLCBvciBhZGQgYWJvdmUuJyxcbiAgICAnY29uY2VwdHMudGl0bGUnOiAnTGVhcm5pbmcgY29uY2VwdHMnLFxuICAgICdjb25jZXB0cy5ub25lJzogJ05vIGxlYXJuaW5nIGNvbmNlcHRzIHlldC4gVGhleSBhY2N1bXVsYXRlIGFmdGVyIHN1Y2Nlc3NmdWwgY2hhbmdlIHJ1bnMsIG9yIGFzayB0aGUgQUkgdG8gc3VtbWFyaXplIGxlYXJuaW5nIHBvaW50cy4nLFxuICAgICdjb25jZXB0cy5jb2wubmFtZSc6ICdDb25jZXB0JyxcbiAgICAnY29uY2VwdHMuY29sLmNhdGVnb3J5JzogJ0NhdGVnb3J5JyxcbiAgICAnY29uY2VwdHMuY29sLmNvdW50JzogJ0NvdW50JyxcbiAgICAncmV2aWV3LnJlY29yZHNUaXRsZSc6ICdSZXZpZXcgaXNzdWVzJyxcbiAgICAncmV2aWV3LnJlY29yZHNFbXB0eSc6ICdObyBpc3N1ZSByZWNvcmRzIHlldC4gSXNzdWVzIGZvdW5kIGJ5IHRoZSBjb21taXQtcmV2aWV3IHBhZ2UgYXJlIHJlY29yZGVkIGhlcmUgYXV0b21hdGljYWxseTsgcmUtcmV2aWV3aW5nIHJlcGxhY2VzIG9sZCByZWNvcmRzLicsXG4gICAgJ3ZlcmlmeS5yZWNvcmRzJzogJ1ZlcmlmaWNhdGlvbiByZWNvcmRzJyxcbiAgICAndmVyaWZ5LnJlY29yZHNFbXB0eSc6ICdObyB2ZXJpZmljYXRpb24gcmVjb3JkcyB5ZXQuIENsaWNrIFwiVmVyaWZ5XCIgaW4gdGhlIGV4ZWN1dGlvbiB0YWIgdG8gZ2VuZXJhdGUgb25lLicsXG5cbiAgICAnY29uZmlybWVkLnRpdGxlJzogJ0NvbmZpcm1lZCBjb25zdHJhaW50cyAoaHVtYW4tY29uZmlybWVkOyBBSSBlZGl0cyB0byBmb3JiaWRkZW4gcGF0aHMgYXJlIGF1dG8tZGVuaWVkKScsXG4gICAgJ2NvbmZpcm1lZC5hZGQnOiAnQWRkIGNvbnN0cmFpbnQnLFxuICAgICdjb25maXJtZWQudGV4dCc6ICdSZXF1aXJlbWVudCAvIGNvbnN0cmFpbnQgdGV4dCcsXG4gICAgJ2NvbmZpcm1lZC5wYXRocyc6ICdGb3JiaWRkZW4gcGF0aHMgKGNvbW1hIHNlcGFyYXRlZDsgcmVsYXRpdmUgdG8gcHJvamVjdCByb290IGxpa2Ugc3JjL2NvcmUsIG9yIGFic29sdXRlKScsXG4gICAgJ2NvbmZpcm1lZC5ub25lJzogJ05vIGNvbnN0cmFpbnRzIHlldC4gT25jZSBhZGRlZCwgQUkgZWRpdHMgdG8gZm9yYmlkZGVuIHBhdGhzIGluIHRoaXMgcHJvamVjdCBhcmUgYXV0by1kZW5pZWQuJyxcblxuICAgICdjaGFuZ2VzLnRpdGxlJzogJ0NoYW5nZSB0YXNrcycsXG4gICAgJ3N0YXRlLm5vQ2hhbmdlcyc6ICdObyBjaGFuZ2UgdGFza3MgeWV0LiBBc2sgdGhlIEFJIGluIGNoYXQgdG8gY3JlYXRlIG9uZSwgb3IgdXNlIFwiQ3JlYXRlIGNoYW5nZVwiIGFib3ZlLicsXG4gICAgJ2NoYW5nZXMuY29sLnRpdGxlJzogJ1RpdGxlJyxcbiAgICAnY2hhbmdlcy5jb2wudHlwZSc6ICdUeXBlJyxcbiAgICAnY2hhbmdlcy5jb2wuc3RhdHVzJzogJ1N0YXR1cycsXG4gICAgJ2NoYW5nZXMuY29sLnVwZGF0ZWQnOiAnVXBkYXRlZCcsXG4gICAgJ2V4ZWMuY29sLnN0YXR1cyc6ICdTdGF0dXMnLFxuICAgICdleGVjLmNvbC5jaGFuZ2UnOiAnQ2hhbmdlJyxcbiAgICAnZXhlYy5jb2wuc3RhcnRlZCc6ICdTdGFydGVkJyxcbiAgICAnZXhlYy5jb2wuY29zdCc6ICdDb3N0IChlc3QpJyxcbiAgICAnZXhlYy5hdHRlbXB0cyc6ICdBdHRlbXB0cycsXG4gICAgJ2V4ZWMuaGludCc6ICdSdW5zIChzdGFydF9ydW4pIGFyZSBzdGFydGVkIGZyb20gY2hhdDogYWZ0ZXIgYSBwbGFuIGV4aXN0cywgdGVsbCB0aGUgQUkgdG8gXCJzdGFydCBydW4gZm9yIHRoZSBjaGFuZ2VcIi4gVGhpcyB0YWIgc2hvd3MgcHJvZ3Jlc3MgYW5kIHJlc3VsdHMuJyxcbiAgICAnc3RhdGUubm9SdW5zJzogJ05vIHJ1bnMgeWV0LicsXG4gICAgJ3N0YXRlLnRlY2hTdGFjayc6ICdUZWNoIHN0YWNrJyxcbiAgICAnc3RhdGUuc3ltYm9scyc6ICdJbmRleGVkIHN5bWJvbHMnLFxuICAgICdzdGF0ZS5tYW5pZmVzdHMnOiAnTWFuaWZlc3RzJyxcbiAgICAnc3RhdGUuZXZpZGVuY2UnOiAnRXZpZGVuY2UgZW50cmllcycsXG4gIH0sXG59IGFzIGNvbnN0XG5cbmZ1bmN0aW9uIGZhbGxiYWNrVChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGRpY3QgPSBXT1JLU1BBQ0VfRElDVC56aCBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG4gIHJldHVybiBkaWN0W2tleV0gPz8ga2V5XG59XG5cbi8qKiBcdTY0Q0RcdTRGNUNcdTdFRDNcdTY3OUNcdTRFQkFcdTYwMjdcdTUzMTZcdUZGMUFcdTI3MTMvXHUyNzE3ICsgXHU2ODA3XHU5MUNGXHU1QjU3XHU2QkI1XHU3Njg0XHU3RDI3XHU1MUQxXHU4ODRDXHVGRjA4XHU4REYzXHU4RkM3XHU1RDRDXHU1OTU3XHU1QkY5XHU4QzYxXHU0RTBFXHU1MzlGXHU1OUNCIEpTT05cdUZGMDlcdTMwMDIgKi9cbmZ1bmN0aW9uIGZvcm1hdEFjdGlvblJlc3VsdChkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IHN0cmluZyB7XG4gIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IFtkYXRhWydvayddID09PSBmYWxzZSA/ICdcdTI3MTcnIDogJ1x1MjcxMyddXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGEpKSB7XG4gICAgaWYgKGtleSA9PT0gJ29rJykgY29udGludWVcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBsaW5lcy5wdXNoKGAke2tleX1cdUZGMUEke1N0cmluZyh2YWx1ZSkuc2xpY2UoMCwgMjAwKX1gKVxuICAgIH1cbiAgfVxuICBpZiAobGluZXMubGVuZ3RoID09PSAxKSBsaW5lcy5wdXNoKCdcdTYyMTBcdTUyOUYnKVxuICByZXR1cm4gbGluZXMuam9pbignXFxuJylcbn1cblxuLyoqIExMTSBcdTYyMTBcdTY3MkNcdUZGMDhcdTRGMzBcdUZGMDlcdTVGQkRcdTY4MDdcdUZGMUFcdTY1RTBcdTUwM0NcdUZGMDhcdTY3MkFcdTRFQTdcdTc1MUZcdThDMDNcdTc1MjggLyBcdTY1RTdcdTdGMTNcdTVCNThcdTRFMERcdTVFMjZcdTYyMTBcdTY3MkNcdUZGMDlcdTY1RjZcdThGRDRcdTU2REUgbnVsbCBcdTRFMERcdTUzNjBcdTRGNERcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlbmRlckNvc3RCYWRnZSh1c2Q6IG51bWJlciB8IHVuZGVmaW5lZCwgdGl0bGU6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gIGlmICh1c2QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGxcbiAgcmV0dXJuIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4Yjk0OWUnKX0gdGl0bGU9e3RpdGxlfT5cdTIyNDgke3VzZC50b0ZpeGVkKDQpfTwvc3Bhbj5cbn1cblxuY29uc3Qgc3R5bGVzOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5DU1NQcm9wZXJ0aWVzPiA9IHtcbiAgcm9vdDoge1xuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgIGhlaWdodDogJzEwMCUnLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyxcbiAgICBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScsXG4gICAgZm9udEZhbWlseTogJ3ZhcigtLWRzLWZvbnQtc2FucywgaW5oZXJpdCknLFxuICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgfSxcbiAgbmF2OiB7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIGdhcDogJzRweCcsXG4gICAgcGFkZGluZzogJzhweCAxMnB4JyxcbiAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMSwgcmdiYSg1LDUsNSwwLjEpKScsXG4gICAgZmxleDogJ25vbmUnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxuICB9LFxuICB0aXRsZTogeyBmb250U2l6ZTogJzEzcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbklubGluZUVuZDogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSxcbiAgdGFiOiAoYWN0aXZlOiBib29sZWFuKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiAoe1xuICAgIHBhZGRpbmc6ICc1cHggMTJweCcsXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcbiAgICBib3JkZXI6ICdub25lJyxcbiAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICBmb250U2l6ZTogJzEycHgnLFxuICAgIC8vIGJ1dHRvbi1pbmZvLWZpbGwgXHU0RTI0XHU0RTNCXHU5ODk4XHU5MEZEXHU4NEREXHVGRjFCYnJhbmQtcHJpbWFyeSBcdTU3MjhcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTY2MkZcdThGRDFcdTc2N0RcdTgyNzJcdUZGMENcdTc2N0RcdTVCNTdcdTRGMUFcdTg4QUJcdTU0MUVcdTYzODlcdUZGMDhcdTk4NzVcdTdCN0VcdTc2N0RcdTU3NTdcdTRFOEJcdTY1NDVcdUZGMDlcdTMwMDJcbiAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyAndmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgY29sb3I6IGFjdGl2ZSA/ICcjZmZmJyA6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsXG4gIH0pLFxuICBib2R5OiB7IGZsZXg6IDEsIG92ZXJmbG93WTogJ2F1dG8nLCBwYWRkaW5nOiAnMTRweCAxNnB4JyB9LFxuICBjYXJkOiB7XG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcbiAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgIHBhZGRpbmc6ICcxMnB4IDE0cHgnLFxuICAgIG1hcmdpbkJvdHRvbTogJzEycHgnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLFxuICB9LFxuICByb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxOHB4JywgZmxleFdyYXA6ICd3cmFwJywgZm9udFNpemU6ICcxMnB4JywgbWFyZ2luOiAnNnB4IDAnIH0sXG4gIGxhYmVsOiB7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnIH0sXG4gIHRhYmxlOiB7IHdpZHRoOiAnMTAwJScsIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLCBmb250U2l6ZTogJzEycHgnIH0sXG4gIHRoOiB7IHRleHRBbGlnbjogJ3N0YXJ0JywgcGFkZGluZzogJzZweCA4cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMSwgcmdiYSg1LDUsNSwwLjEpKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250V2VpZ2h0OiA1MDAgfSxcbiAgdGQ6IHsgcGFkZGluZzogJzZweCA4cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMywgcmdiYSg1LDUsNSwwLjA2KSknIH0sXG4gIGVtcHR5OiB7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250U2l6ZTogJzEycHgnLCBwYWRkaW5nOiAnMTBweCA0cHgnIH0sXG4gIGJ1dHRvbjoge1xuICAgIHBhZGRpbmc6ICc1cHggMTJweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAvLyBidXR0b24taW5mby1maWxsIFx1NjYyRlx1NUJCRlx1NEUzQlx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1NEUwQlx1OTBGRFx1NEUzQVx1ODRERFx1ODI3Mlx1MzAwMVx1NzY3RFx1NUI1N1x1NTNFRlx1OEJGQlx1NzY4NFx1NEUzQlx1NjRDRFx1NEY1Q1x1ODI3Mlx1RkYwOGJyYW5kLXByaW1hcnkgXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RTBEXHU1M0VGXHU4QkZCXHVGRjA5XHUzMDAyXG4gICAgZm9udFNpemU6ICcxMXB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1idXR0b24taW5mby1maWxsLCAjMjU2M2ViKScsIGNvbG9yOiAnI2ZmZicsXG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIH0sXG4gIHNlY29uZGFyeToge1xuICAgIHBhZGRpbmc6ICc1cHggMTJweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzExcHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgfSxcbiAgaW5wdXQ6IHtcbiAgICB3aWR0aDogJzEwMCUnLCBwYWRkaW5nOiAnNnB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgfSxcbiAgZm9ybVJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICc2cHgnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH0sXG4gIGZvcm1JbmxpbmU6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9LFxuICAvLyBzZWxlY3QgXHU3NTI4XHU3Q0ZCXHU3RURGXHU1OTE2XHU4OUMyXHU2NUY2IFdpbmRvd3MgXHU2RDQ1XHU4MjcyXHU2QTIxXHU1RjBGXHU0RTBCXHU1RjNBXHU1MjM2XHU3NjdEXHU1RTk1XHVGRjBDXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU0RTBCXHU0RTBEXHU1M0VGXHU4QkZCXHUyMDE0XHUyMDE0XHU4MUVBXHU3RUQ4XHU1OTE2XHU4OUMyXHU4RDcwXHU0RTNCXHU5ODk4XHU1M0Q4XHU5MUNGXHUzMDAyXG4gIHNlbGVjdDoge1xuICAgIGFwcGVhcmFuY2U6ICdub25lJywgV2Via2l0QXBwZWFyYW5jZTogJ25vbmUnLFxuICAgIHBhZGRpbmc6ICc2cHggMjZweCA2cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxuICAgIGJhY2tncm91bmRJbWFnZTogJ3VybChcImRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LDxzdmcgeG1sbnM9JTIyaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmclMjIgd2lkdGg9JTIyMTAlMjIgaGVpZ2h0PSUyMjYlMjI+PHBhdGggZD0lMjJNMSAxbDQgNCA0LTQlMjIgc3Ryb2tlPSUyMiUyMzg4OCUyMiBzdHJva2Utd2lkdGg9JTIyMS41JTIyIGZpbGw9JTIybm9uZSUyMi8+PC9zdmc+XCIpJyxcbiAgICBiYWNrZ3JvdW5kUmVwZWF0OiAnbm8tcmVwZWF0JywgYmFja2dyb3VuZFBvc2l0aW9uOiAncmlnaHQgOHB4IGNlbnRlcicsXG4gICAgY3Vyc29yOiAncG9pbnRlcicsIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCBtYXhXaWR0aDogJzEwMCUnLFxuICB9LFxuICBhY3Rpb25Sb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxMHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfSxcbiAgcmVzdWx0OiB7XG4gICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS42LFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxuICAgIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICcxMHB4IDEycHgnLCBtYXhIZWlnaHQ6ICczMjBweCcsIG92ZXJmbG93WTogJ2F1dG8nLFxuICB9LFxuICBiYWRnZTogKGNvbG9yOiBzdHJpbmcpOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+IHtcbiAgICBjb25zdCByZ2IgPSBwYXJzZUNvbG9yKGNvbG9yKVxuICAgIGlmIChyZ2IgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCBwYWRkaW5nOiAnMXB4IDhweCcsIGJvcmRlclJhZGl1czogJzRweCcsIGZvbnRTaXplOiAnMTFweCcsIGJhY2tncm91bmQ6IGAke2NvbG9yfTIyYCwgY29sb3IgfVxuICAgIH1cbiAgICBjb25zdCBbciwgZywgYl0gPSByZ2JcbiAgICAvLyBcdTVFOTVcdTgyNzJcdTdFREZcdTRFMDAgMTYlIFx1ODI3Mlx1OEMwM1x1RkYxQlx1NjU4N1x1NUI1N1x1ODI3Mlx1NEUzQlx1OTg5OFx1ODFFQVx1OTAwMlx1NUU5NFx1RkYwOFx1NkQ0NVx1ODI3Mlx1NkRGMVx1NTMxNlx1NTIzMFx1NzY3RFx1NUU5NVx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlxuICAgIHJldHVybiB7XG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgcGFkZGluZzogJzFweCA4cHgnLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnLFxuICAgICAgYmFja2dyb3VuZDogYHJnYmEoJHtyfSwgJHtnfSwgJHtifSwgMC4xNilgLFxuICAgICAgY29sb3I6IHRoZW1lQXdhcmVUZXh0KGNvbG9yKSxcbiAgICB9XG4gIH0sXG4gIHNlY3Rpb25UaXRsZTogeyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTJweCcsIG1hcmdpbkJvdHRvbTogJzhweCcgfSxcbiAgd2hhdDogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjcsIG1hcmdpbjogJzRweCAwIDhweCcgfSxcbiAgbG9naWNTdGVwOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuOCwgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnIH0sXG4gIHJpc2tJdGVtOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNywgbWFyZ2luOiAnMnB4IDAnIH0sXG4gIGNvbW1pdFJvdzogKGFjdGl2ZTogYm9vbGVhbik6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4gKHtcbiAgICBwYWRkaW5nOiAnOHB4IDEwcHgnLFxuICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgYm9yZGVyOiBhY3RpdmUgPyAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgOiAnMXB4IHNvbGlkIHRyYW5zcGFyZW50JyxcbiAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyAncmdiYSgzNyw5OSwyMzUsMC4wNiknIDogJ3RyYW5zcGFyZW50JyxcbiAgICBtYXJnaW5Cb3R0b206ICc0cHgnLFxuICB9KSxcbiAgY29tbWl0U3ViamVjdDogeyBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAsIGxpbmVIZWlnaHQ6IDEuNSwgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH0sXG4gIGNvbW1pdE1ldGE6IHsgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpblRvcDogJzJweCcsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JyB9LFxuICBwYXRjaDoge1xuICAgIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCBsaW5lSGVpZ2h0OiAxLjUsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzEwcHgnLCBtYXhIZWlnaHQ6ICczMjBweCcsIG92ZXJmbG93WTogJ2F1dG8nLFxuICB9LFxuICB0ZXh0YXJlYToge1xuICAgIHdpZHRoOiAnMTAwJScsIHBhZGRpbmc6ICc4cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxuICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCByZXNpemU6ICd2ZXJ0aWNhbCcsIGxpbmVIZWlnaHQ6IDEuNywgZm9udEZhbWlseTogJ2luaGVyaXQnLFxuICB9LFxuICBub3RlQ2FyZDoge1xuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJyxcbiAgICBib3JkZXJSYWRpdXM6ICc4cHgnLCBwYWRkaW5nOiAnMTJweCAxNHB4JywgbWFyZ2luQm90dG9tOiAnMTBweCcsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXG4gIH0sXG4gIG5vdGVUaXRsZVJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JywgZ2FwOiAnOHB4JyB9LFxuICBub3RlVGl0bGVUZXh0OiB7IGZvbnRTaXplOiAnMTNweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbGluZUhlaWdodDogMS41IH0sXG4gIG5vdGVDb250ZW50OiB7XG4gICAgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS44NSwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstd29yZCcsXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLCBtYXJnaW5Ub3A6ICc2cHgnLFxuICB9LFxuICBub3RlQ2xhbXA6IHtcbiAgICBkaXNwbGF5OiAnLXdlYmtpdC1ib3gnLCBXZWJraXRMaW5lQ2xhbXA6IDYsIFdlYmtpdEJveE9yaWVudDogJ3ZlcnRpY2FsJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICB9LFxuICBub3RlTWV0YToge1xuICAgIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc4cHgnLFxuICAgIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxuICB9LFxuICBsaW5rQnRuOiB7XG4gICAgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsIGZvbnRTaXplOiAnMTFweCcsIHBhZGRpbmc6ICcwJyxcbiAgICBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsXG4gIH0sXG4gIGNoaXA6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XG4gICAgcGFkZGluZzogJzJweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnOTk5cHgnLCBmb250U2l6ZTogJzExcHgnLCBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgIC8vIFx1NTQwQyB0YWJcdUZGMUFhY3RpdmUgXHU1ODZCXHU4MjcyXHU0RTAwXHU1RjhCIGJ1dHRvbi1pbmZvLWZpbGxcdUZGMDhcdTRFMjRcdTRFM0JcdTk4OThcdTkwRkRcdTg0RERcdUZGMDlcdUZGMENcdTc5ODFcdTc1MjggYnJhbmQtcHJpbWFyeVx1MzAwMlxuICAgIGJhY2tncm91bmQ6IGFjdGl2ZSA/ICd2YXIoLS1kc3ctYWxpYXMtYnV0dG9uLWluZm8tZmlsbCwgIzI1NjNlYiknIDogJ3RyYW5zcGFyZW50JyxcbiAgICBjb2xvcjogYWN0aXZlID8gJyNmZmYnIDogJ2luaGVyaXQnLFxuICB9KSxcbn1cblxuLyoqIFx1OThDRVx1OTY2OVx1N0I0OVx1N0VBNyBcdTIxOTIgXHU1RkJEXHU3QUUwXHU5ODlDXHU4MjcyXHUzMDAyICovXG5jb25zdCBSSVNLX0NPTE9SOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0geyBsb3c6ICcjNGVjOWIwJywgbWVkaXVtOiAnI2RjZGNhYScsIGhpZ2g6ICcjY2U5MTc4JywgY3JpdGljYWw6ICcjZjE0YzRjJyB9XG5cbi8qKlxuICogXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0IFNWRyBcdTZENDFcdTdBMEJcdTU2RkVcdUZGMUFcdTRFMDlcdTUyMTdcdTUyMDZcdTVDNDJcdUZGMDhcdTUzRDhcdTY2RjQgXHUyMTkyIFx1OTVGNFx1NjNBNVx1NUYxNVx1NzUyOFx1OTRGRSBcdTIxOTIgXHU2RjVDXHU1NzI4XHVGRjA5XHVGRjBDXG4gKiBcdTRGOURcdTYzNkUgL2ltcGFjdC1zY29wZSBcdThGRDRcdTU2REVcdTc2ODQgbGV2ZWxzXHVGRjA4XHU1NDJCXHU0RjIwXHU2NEFEXHU5NEZFIHJlYXNvblx1RkYwOVx1N0VEOFx1NTIzNlx1OEZERVx1N0VCRlx1MzAwMlxuICogXHU1MTY4XHU1QkJEXHU3NTNCXHU1RTAzXHVGRjA4dmlld0JveCAxMDAwXHVGRjA5XHVGRjBDXHU4MjgyXHU3MEI5XHU1RTI2XHU3NkVFXHU1RjU1XHU2M0QwXHU3OTNBXHVGRjBDXHU2REYxXHU1RUE2XHU4RDhBXHU2REYxXHU5ODlDXHU4MjcyXHU4RDhBXHU2RDQ1XHUzMDAyXG4gKi9cbmZ1bmN0aW9uIEltcGFjdEdyYXBoKHByb3BzOiB7IGRhdGE6IEltcGFjdFNjb3BlUGF5bG9hZDsgdDogKGtleTogc3RyaW5nKSA9PiBzdHJpbmcgfSkge1xuICBjb25zdCB7IGRhdGEgfSA9IHByb3BzXG4gIGNvbnN0IGluZGlyZWN0ID0gZGF0YS5sZXZlbHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmxldmVsID09PSAnaW5kaXJlY3QnKVxuICBjb25zdCBwb3RlbnRpYWwgPSBkYXRhLmxldmVscy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwgPT09ICdwb3RlbnRpYWwnKVxuICBjb25zdCBjb2wwID0gZGF0YS5jaGFuZ2VkRmlsZXMuc2xpY2UoMCwgNylcbiAgY29uc3QgY29sMSA9IEFycmF5LmZyb20obmV3IFNldChpbmRpcmVjdC5tYXAoKGl0ZW0pID0+IGl0ZW0ucGF0aCkpKS5zbGljZSgwLCA5KVxuICBjb25zdCBjb2wyID0gQXJyYXkuZnJvbShuZXcgU2V0KHBvdGVudGlhbC5tYXAoKGl0ZW0pID0+IGl0ZW0ucGF0aCkpKS5maWx0ZXIoKHApID0+ICFjb2wxLmluY2x1ZGVzKHApKS5zbGljZSgwLCA4KVxuICBjb25zdCBub2RlSCA9IDMwXG4gIGNvbnN0IGdhcCA9IDEwXG4gIGNvbnN0IGNvbFggPSBbMzAsIDM4MCwgNzIwXVxuICBjb25zdCBjb2xXID0gMjgwXG4gIGNvbnN0IHJvd3MgPSBNYXRoLm1heChjb2wwLmxlbmd0aCwgY29sMS5sZW5ndGgsIGNvbDIubGVuZ3RoLCAxKVxuICBjb25zdCBoZWlnaHQgPSByb3dzICogKG5vZGVIICsgZ2FwKSArIDYwXG5cbiAgY29uc3QgZGVwdGhPZiA9IChwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSBpbmRpcmVjdC5maW5kKChlbnRyeSkgPT4gZW50cnkucGF0aCA9PT0gcGF0aCkgPz8gcG90ZW50aWFsLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5wYXRoID09PSBwYXRoKVxuICAgIHJldHVybiBpdGVtPy5kZXB0aCA/PyAwXG4gIH1cblxuICBjb25zdCByZW5kZXJDb2wgPSAoY29sOiBudW1iZXIsIGl0ZW1zOiBzdHJpbmdbXSwgY29sb3I6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdID0+IGl0ZW1zLm1hcCgocGF0aCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCB5ID0gNDQgKyBpbmRleCAqIChub2RlSCArIGdhcClcbiAgICBjb25zdCBkaXIgPSBwYXRoLmluY2x1ZGVzKCcvJykgPyBwYXRoLnNsaWNlKDAsIHBhdGgubGFzdEluZGV4T2YoJy8nKSkgOiAnJ1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdnJywgeyBrZXk6IGAke2NvbH0tJHtwYXRofWAgfSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3JlY3QnLCB7IHg6IGNvbFhbY29sXSwgeSwgd2lkdGg6IGNvbFcsIGhlaWdodDogbm9kZUgsIHJ4OiA2LCBmaWxsOiBjb2xvciwgc3Ryb2tlOiAncmdiYSgwLDAsMCwwLjMpJywgc3Ryb2tlV2lkdGg6IDEgfSksXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyB4OiBjb2xYW2NvbF0gKyAxMCwgeTogeSArIDE0LCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgZmlsbDogJyNmZmZmZmYnIH0sXG4gICAgICAgIChwYXRoLnNwbGl0KCcvJykucG9wKCkgPz8gcGF0aCkuc2xpY2UoMCwgMzApKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3RleHQnLCB7IHg6IGNvbFhbY29sXSArIDEwLCB5OiB5ICsgMjYsIGZvbnRTaXplOiAxMCwgZmlsbDogJ3JnYmEoMjU1LDI1NSwyNTUsMC45MiknIH0sXG4gICAgICAgIGRpci5zbGljZSgwLCA0MCkpLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGl0bGUnLCBudWxsLCBwYXRoKSxcbiAgICApXG4gIH0pXG5cbiAgY29uc3QgY2hhaW5TdGFydCA9IChyZWFzb246IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgbWF0Y2ggPSByZWFzb24ubWF0Y2goL3BhdGg6ICguKykkLylcbiAgICBpZiAobWF0Y2ggPT09IG51bGwpIHJldHVybiBkYXRhLmNoYW5nZWRGaWxlc1swXSA/PyAnJ1xuICAgIHJldHVybiBtYXRjaFsxXSEuc3BsaXQoJyAtPiAnKVswXSA/PyBkYXRhLmNoYW5nZWRGaWxlc1swXSA/PyAnJ1xuICB9XG4gIGNvbnN0IGluZGV4SW4gPSAoaXRlbXM6IHN0cmluZ1tdLCBwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4gaXRlbXMuaW5kZXhPZihwYXRoKVxuICBjb25zdCBjb2xPZiA9IChwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGlmIChjb2wwLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMFxuICAgIGlmIChjb2wxLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMVxuICAgIGlmIChjb2wyLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMlxuICAgIHJldHVybiAtMVxuICB9XG5cbiAgY29uc3QgZWRnZXM6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cbiAgY29uc3QgcHVzaEVkZ2UgPSAoZnJvbVBhdGg6IHN0cmluZywgdG9QYXRoOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcsIGtleTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZnJvbUNvbCA9IGNvbE9mKGZyb21QYXRoKVxuICAgIGNvbnN0IHRvQ29sID0gY29sT2YodG9QYXRoKVxuICAgIGlmIChmcm9tQ29sID09PSAtMSB8fCB0b0NvbCA9PT0gLTEgfHwgdG9Db2wgPD0gZnJvbUNvbCkgcmV0dXJuXG4gICAgY29uc3QgeDEgPSBjb2xYW2Zyb21Db2xdICsgY29sV1xuICAgIGNvbnN0IHkxID0gNDQgKyBpbmRleEluKFtjb2wwLCBjb2wxLCBjb2wyXVtmcm9tQ29sXSA/PyBbXSwgZnJvbVBhdGgpICogKG5vZGVIICsgZ2FwKSArIG5vZGVIIC8gMlxuICAgIGNvbnN0IHgyID0gY29sWFt0b0NvbF1cbiAgICBjb25zdCB5MiA9IDQ0ICsgaW5kZXhJbihbY29sMCwgY29sMSwgY29sMl1bdG9Db2xdID8/IFtdLCB0b1BhdGgpICogKG5vZGVIICsgZ2FwKSArIG5vZGVIIC8gMlxuICAgIGVkZ2VzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudCgncGF0aCcsIHtcbiAgICAgIGtleSwgZDogYE0gJHt4MX0gJHt5MX0gQyAke3gxICsgMzB9ICR7eTF9LCAke3gyIC0gMzB9ICR7eTJ9LCAke3gyfSAke3kyfWAsXG4gICAgICBmaWxsOiAnbm9uZScsIHN0cm9rZTogY29sb3IsIHN0cm9rZVdpZHRoOiAxLjYsIG9wYWNpdHk6IDAuNixcbiAgICB9KSlcbiAgfVxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaW5kaXJlY3Quc2xpY2UoMCwgMjApKSBwdXNoRWRnZShjaGFpblN0YXJ0KGl0ZW0ucmVhc29uKSwgaXRlbS5wYXRoLCB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpLCBgZWktJHtpdGVtLnBhdGh9YClcbiAgZm9yIChjb25zdCBpdGVtIG9mIHBvdGVudGlhbC5zbGljZSgwLCAxNikpIHB1c2hFZGdlKGNoYWluU3RhcnQoaXRlbS5yZWFzb24pLCBpdGVtLnBhdGgsIHRoZW1lQXdhcmVUZXh0KCcjNTc2MDZhJyksIGBlcC0ke2l0ZW0ucGF0aH1gKVxuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3N2ZycsIHsgd2lkdGg6ICcxMDAlJywgdmlld0JveDogYDAgMCAxMDI0ICR7aGVpZ2h0fWAsIHN0eWxlOiB7IG1heEhlaWdodDogNDgwIH0gfSxcbiAgICAgIFtbJ1x1NTNEOFx1NjZGNFx1NjU4N1x1NEVGNicsIDBdLCBbJ1x1OTVGNFx1NjNBNVx1NUY3MVx1NTRDRFx1RkYwOFx1OEMwMVx1NUYxNVx1NzUyOFx1NEU4Nlx1NUI4M1x1RkYwOScsIDFdLCBbJ1x1NkY1Q1x1NTcyOFx1NUY3MVx1NTRDRFx1RkYwOFx1NEU4Q1x1N0VBN1x1NEYyMFx1NjRBRFx1RkYwOScsIDJdXS5tYXAoKFtuYW1lLCBjb2xdKSA9PlxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyBrZXk6IFN0cmluZyhjb2wpLCB4OiBjb2xYW2NvbCBhcyBudW1iZXJdLCB5OiAyNCwgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA3MDAsIGZpbGw6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknIH0sIG5hbWUgYXMgc3RyaW5nKSksXG4gICAgICByZW5kZXJDb2woMCwgY29sMCwgJyMyNTYzZWInKSxcbiAgICAgIHJlbmRlckNvbCgxLCBjb2wxLCAnI2Q5NzcwNicpLFxuICAgICAgcmVuZGVyQ29sKDIsIGNvbDIsICcjNTc2MDZhJyksXG4gICAgICBlZGdlcyxcbiAgICApLFxuICApXG59XG5cbmNvbnN0IERJRkZfS0VZV09SRFMgPSAvXFxiKHB1YmxpY3xwcml2YXRlfHByb3RlY3RlZHxpbnRlcm5hbHxzdGF0aWN8dm9pZHxjbGFzc3xzdHJ1Y3R8aW50ZXJmYWNlfGVudW18bmV3fHJldHVybnxpZnxlbHNlfGZvcnxmb3JlYWNofHdoaWxlfHN3aXRjaHxjYXNlfGJyZWFrfGNvbnRpbnVlfHRyeXxjYXRjaHxmaW5hbGx5fHRocm93fHVzaW5nfG5hbWVzcGFjZXxpbXBvcnR8ZXhwb3J0fGZyb218Y29uc3R8bGV0fHZhcnxhc3luY3xhd2FpdHxmdW5jdGlvbnx0aGlzfGJhc2V8c3VwZXJ8bnVsbHx0cnVlfGZhbHNlfG92ZXJyaWRlfHZpcnR1YWx8YWJzdHJhY3R8c2VhbGVkfHJlYWRvbmx5fHBhcmFtc3xvdXR8cmVmfHlpZWxkfHR5cGVvZnxpbnN0YW5jZW9mfGlufG9mfGRlZmF1bHR8c3RyaW5nfGludHxsb25nfGRvdWJsZXxmbG9hdHxib29sfGNoYXJ8ZGVjaW1hbHxvYmplY3R8cmVjb3JkfHBhcnRpYWx8Z2V0fHNldHxyZXF1aXJlfG1vZHVsZXx0eXBlfGltcGxlbWVudHN8ZXh0ZW5kcylcXGIvZ1xuXG4vKiogXHU1MzU1XHU4ODRDXHU0RUUzXHU3ODAxXHU5QUQ4XHU0RUFFXHVGRjFBXHU2Q0U4XHU5MUNBID4gXHU1QjU3XHU3QjI2XHU0RTMyID4gXHU1MTczXHU5NTJFXHU1QjU3L1x1NjU3MFx1NUI1NyBcdTRFMDlcdTVDNDJcdTc3NDBcdTgyNzJcdUZGMDhcdThGN0JcdTkxQ0ZcdTZCNjNcdTUyMTlcdUZGMENcdTU5MUZcdTY4MzhcdTY3RTVcdTc1MjhcdUZGMDlcdTMwMDIgKi9cbmZ1bmN0aW9uIGhpZ2hsaWdodENvZGVMaW5lKGxpbmU6IHN0cmluZywga2V5UHJlZml4OiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XG4gIGNvbnN0IHRyaW1tZWQgPSBsaW5lLnRyaW1TdGFydCgpXG4gIGlmICh0cmltbWVkLnN0YXJ0c1dpdGgoJy8vJykgfHwgdHJpbW1lZC5zdGFydHNXaXRoKCcvLy8nKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJyonKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJy8qJykgfHwgdHJpbW1lZC5zdGFydHNXaXRoKCcjJykpIHtcbiAgICByZXR1cm4gW1JlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1jYCwgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjNmE5OTU1JykgfSB9LCBsaW5lKV1cbiAgfVxuICBjb25zdCBwYXJ0cyA9IGxpbmUuc3BsaXQoLyhcIig/OlteXCJcXFxcXXxcXFxcLikqXCJ8Jyg/OlteJ1xcXFxdfFxcXFwuKSonfGAoPzpbXmBcXFxcXXxcXFxcLikqYCkvZylcbiAgcmV0dXJuIHBhcnRzLm1hcCgocGFydCwgaSkgPT4ge1xuICAgIGlmIChpICUgMiA9PT0gMSkgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1zJHtpfWAsIHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NlOTE3OCcpIH0gfSwgcGFydClcbiAgICBjb25zdCBzdWI6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cbiAgICBsZXQgbGFzdCA9IDBcbiAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIHBhcnQubWF0Y2hBbGwoRElGRl9LRVlXT1JEUykpIHtcbiAgICAgIGlmIChtYXRjaC5pbmRleCEgPiBsYXN0KSBzdWIucHVzaChwYXJ0LnNsaWNlKGxhc3QsIG1hdGNoLmluZGV4KSlcbiAgICAgIHN1Yi5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1rJHtpfS0ke21hdGNoLmluZGV4fWAsIHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzU2OWNkNicpIH0gfSwgbWF0Y2hbMF0pKVxuICAgICAgbGFzdCA9IG1hdGNoLmluZGV4ISArIG1hdGNoWzBdLmxlbmd0aFxuICAgIH1cbiAgICBpZiAobGFzdCA8IHBhcnQubGVuZ3RoKSBzdWIucHVzaChwYXJ0LnNsaWNlKGxhc3QpKVxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCB7IGtleTogYCR7a2V5UHJlZml4fS1wJHtpfWAgfSwgc3ViKVxuICB9KVxufVxuXG4vKiogXHU5QUQ4XHU0RUFFXHU1REVFXHU1RjAyXHU4OUM2XHU1NkZFXHVGRjFBXHU4OUUzXHU2NzkwIHVuaWZpZWQgZGlmZlx1RkYwQ1x1NjMwOSBcdTU4OUUvXHU1MjIwL1x1NTc1N1x1NTkzNC9cdTRFMEFcdTRFMEJcdTY1ODcgXHU3NzQwXHU4MjcyXHUzMDAyICovXG5mdW5jdGlvbiBEaWZmVmlldyhwcm9wczogeyBwYXRjaDogc3RyaW5nIH0pIHtcbiAgY29uc3QgbGluZXMgPSBwcm9wcy5wYXRjaC5zcGxpdCgnXFxuJykuZmlsdGVyKChsaW5lLCBpKSA9PiAhKGxpbmUgPT09ICcnICYmIGkgPT09IHByb3BzLnBhdGNoLnNwbGl0KCdcXG4nKS5sZW5ndGggLSAxKSlcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICBzdHlsZToge1xuICAgICAgZm9udEZhbWlseTogJ0NvbnNvbGFzLCBtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCBsaW5lSGVpZ2h0OiAxLjU1LFxuICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDAnLCBtYXhIZWlnaHQ6IDQyMCwgb3ZlcmZsb3dZOiAnYXV0bycsIG1hcmdpblRvcDogJzZweCcsXG4gICAgfSxcbiAgfSwgbGluZXMubWFwKChsaW5lLCBpKSA9PiB7XG4gICAgY29uc3Qga2luZCA9IGxpbmUuc3RhcnRzV2l0aCgnKysrJykgfHwgbGluZS5zdGFydHNXaXRoKCctLS0nKSA/ICdtZXRhJ1xuICAgICAgOiBsaW5lLnN0YXJ0c1dpdGgoJ0BAJykgPyAnaHVuaydcbiAgICAgICAgOiBsaW5lLnN0YXJ0c1dpdGgoJysnKSA/ICdhZGQnXG4gICAgICAgICAgOiBsaW5lLnN0YXJ0c1dpdGgoJy0nKSA/ICdkZWwnIDogJ2N0eCdcbiAgICBjb25zdCBiZyA9IGtpbmQgPT09ICdhZGQnID8gJ3JnYmEoNDYsMTYwLDY3LDAuMTQpJyA6IGtpbmQgPT09ICdkZWwnID8gJ3JnYmEoMjQ4LDgxLDczLDAuMTMpJyA6IGtpbmQgPT09ICdodW5rJyA/ICdyZ2JhKDU2LDEzOSwyNTMsMC4xKScgOiAndHJhbnNwYXJlbnQnXG4gICAgY29uc3QgY29udGVudCA9IGtpbmQgPT09ICdtZXRhJyB8fCBraW5kID09PSAnaHVuaydcbiAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjMDk2OWRhJyksIGZvbnRXZWlnaHQ6IDYwMCB9IH0sIGxpbmUpXG4gICAgICA6IGtpbmQgPT09ICdhZGQnIHx8IGtpbmQgPT09ICdkZWwnXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KGtpbmQgPT09ICdhZGQnID8gJyMxYTdmMzcnIDogJyNjZjIyMmUnKSwgZm9udFdlaWdodDogNjAwIH0gfSwgbGluZVswXSlcbiAgICAgICAgOiBudWxsXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsga2V5OiBpLCBzdHlsZTogeyBwYWRkaW5nOiAnMCAxMHB4JywgYmFja2dyb3VuZDogYmcsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfSB9LFxuICAgICAgY29udGVudCxcbiAgICAgIGtpbmQgPT09ICdhZGQnIHx8IGtpbmQgPT09ICdkZWwnID8gaGlnaGxpZ2h0Q29kZUxpbmUobGluZS5zbGljZSgxKSwgYGwke2l9YCkgOiBoaWdobGlnaHRDb2RlTGluZShsaW5lLCBgbCR7aX1gKSxcbiAgICApXG4gIH0pKVxufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiAnXHUyMDE0J1xuICByZXR1cm4gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlU3RyaW5nKClcbn1cblxuLyoqIFx1NEU4Q1x1NkIyMVx1Nzg2RVx1OEJBNFx1NUYzOVx1N0E5N1x1RkYxQVx1OTA2RVx1N0Y2OSArIFx1NUM0NVx1NEUyRFx1NTM2MVx1NzI0N1x1RkYwQ1x1NTM3MVx1OTY2OVx1NjRDRFx1NEY1Q1x1RkYwOFx1NTIyMFx1OTY2NFx1N0IxNFx1OEJCMC9cdTUzRDhcdTY2RjQvXHU3RUE2XHU2NzVGXHVGRjA5XHU1MTcxXHU3NTI4XHUzMDAyICovXG5mdW5jdGlvbiBDb25maXJtRGlhbG9nKHByb3BzOiB7IHRpdGxlOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZzsgZGFuZ2VyPzogYm9vbGVhbjsgb25DYW5jZWw6ICgpID0+IHZvaWQ7IG9uQ29uZmlybTogKCkgPT4gdm9pZCB9KSB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLW92ZXJsYXknLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCB6SW5kZXg6IDk5OSxcbiAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMTUsMjMsNDIsMC40NSknLCBiYWNrZHJvcEZpbHRlcjogJ2JsdXIoMnB4KScsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgYW5pbWF0aW9uOiAncGNGYWRlSW4gMC4xNXMgZWFzZS1vdXQnLFxuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ2FuY2VsLFxuICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLWNhcmQnLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHdpZHRoOiA0MDAsIG1heFdpZHRoOiAnY2FsYygxMDB2dyAtIDQ4cHgpJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JywgYm94U2hhZG93OiAnMCAyMHB4IDUwcHggcmdiYSgwLDAsMCwwLjI1KScsXG4gICAgICAgICAgcGFkZGluZzogJzIwcHggMjJweCAxNnB4JyxcbiAgICAgICAgICBvbkNsaWNrOiAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCBnYXA6ICcxMHB4JyB9IH0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgd2lkdGg6IDM0LCBoZWlnaHQ6IDM0LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBmbGV4U2hyaW5rOiAwLFxuICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnMTdweCcsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHByb3BzLmRhbmdlciA/ICdyZ2JhKDI0NCw2Myw5NCwwLjEyKScgOiAncmdiYSgzNyw5OSwyMzUsMC4xKScsXG4gICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5kYW5nZXIgPyB0aGVtZUF3YXJlVGV4dCgnI2UxMWQ0OCcpIDogdGhlbWVBd2FyZVRleHQoJyMyNTYzZWInKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSwgcHJvcHMuZGFuZ2VyID8gJyEnIDogJz8nKSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzZweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9IH0sIHByb3BzLnRpdGxlKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS43LCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9IH0sIHByb3BzLm1lc3NhZ2UpLFxuICAgICAgICAgICksXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJywgZ2FwOiAnMTBweCcsIG1hcmdpblRvcDogJzE4cHgnIH0gfSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XG4gICAgICAgICAgICBzdHlsZTogeyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnN3B4IDE4cHgnLCBib3JkZXJSYWRpdXM6ICc4cHgnIH0sXG4gICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5vbkNhbmNlbCxcbiAgICAgICAgICB9LCAnXHU1M0Q2XHU2RDg4JyksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xuICAgICAgICAgICAgJ2RhdGEtdGVzdGlkJzogJ3BjLWNvbmZpcm0tb2snLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgcGFkZGluZzogJzdweCAxOHB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA1MDAsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHByb3BzLmRhbmdlciA/ICcjZTExZDQ4JyA6ICd2YXIoLS1kc3ctYWxpYXMtYnV0dG9uLWluZm8tZmlsbCwgIzI1NjNlYiknLCBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ29uZmlybSxcbiAgICAgICAgICB9LCAnXHU3ODZFXHU4QkE0XHU1MjIwXHU5NjY0JyksXG4gICAgICAgICksXG4gICAgICApLFxuICAgICksXG4gIClcbn1cblxuLyoqIFx1OUFBOFx1NjdCNlx1NUMwRlx1NTM2MVx1NzI0N1x1MzAwMiAqL1xuZnVuY3Rpb24gQ2FyZChwcm9wczogeyB0aXRsZT86IFJlYWN0LlJlYWN0Tm9kZTsgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLmNhcmQgfSxcbiAgICBwcm9wcy50aXRsZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5zZWN0aW9uVGl0bGUgfSwgcHJvcHMudGl0bGUpLFxuICAgIHByb3BzLmNoaWxkcmVuKVxufVxuXG4vKipcbiAqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NEUzQlx1N0VDNFx1NEVGNlx1RkYxQVx1NTZEQlx1OTg3NVx1N0I3RVx1RkYwOFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1NEUzQVx1OUVEOFx1OEJBNFx1RkYwOSsgXHU4RjZFXHU4QkUyXHU1QkJGXHU0RTNCIEFQSSArIFx1NjMwOVx1OTRBRVx1NTMxNlx1NjRDRFx1NEY1Q1x1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gV29ya3NwYWNlRnJhbWUocHJvcHM6IFdvcmtzcGFjZUZyYW1lUHJvcHMpIHtcbiAgY29uc3QgdCA9IHByb3BzLnQgPz8gZmFsbGJhY2tUXG4gIGNvbnN0IGFjdGl2ZVJlZiA9IHVzZVJlZih0cnVlKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFjdGl2ZVJlZi5jdXJyZW50ID0gdHJ1ZVxuICAgIHJldHVybiAoKSA9PiB7IGFjdGl2ZVJlZi5jdXJyZW50ID0gZmFsc2UgfVxuICB9LCBbXSlcbiAgY29uc3QgW3RhYiwgc2V0VGFiXSA9IHVzZVN0YXRlPFRhYktleT4oJ2NvbW1pdHMnKVxuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlPFdvcmtzcGFjZVN0YXRlIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2xvYWRFcnJvciwgc2V0TG9hZEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtib290c3RyYXBwaW5nLCBzZXRCb290c3RyYXBwaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbYWN0aW9uUmVzdWx0LCBzZXRBY3Rpb25SZXN1bHRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2NoYW5nZVRpdGxlLCBzZXRDaGFuZ2VUaXRsZV0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2NoYW5nZURlc2MsIHNldENoYW5nZURlc2NdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFttZW1vcnlUaXRsZSwgc2V0TWVtb3J5VGl0bGVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFttZW1vcnlDb250ZW50LCBzZXRNZW1vcnlDb250ZW50XSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbY29uZmlybWVkVGV4dCwgc2V0Q29uZmlybWVkVGV4dF0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2NvbmZpcm1lZFBhdGhzLCBzZXRDb25maXJtZWRQYXRoc10gPSB1c2VTdGF0ZSgnJylcblxuICAvLyBcdTI1MDBcdTI1MDAgXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XHU3MkI2XHU2MDAxIFx1MjUwMFx1MjUwMFxuICBjb25zdCBbY29tbWl0c0RhdGEsIHNldENvbW1pdHNEYXRhXSA9IHVzZVN0YXRlPENvbW1pdHNQYXlsb2FkIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2NvbW1pdHNFcnJvciwgc2V0Q29tbWl0c0Vycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtwaWNrZXJPcGVuLCBzZXRQaWNrZXJPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbcGlja2VyRmlsdGVyLCBzZXRQaWNrZXJGaWx0ZXJdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtzZWxlY3RlZFRhcmdldHMsIHNldFNlbGVjdGVkVGFyZ2V0c10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pXG4gIGNvbnN0IFtkZXRhaWxzLCBzZXREZXRhaWxzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIENvbW1pdERldGFpbFBheWxvYWQ+Pih7fSlcbiAgLyoqIFx1ODlFM1x1OEJGQlx1NEVGQlx1NTJBMVx1NzJCNlx1NjAwMVx1RkYxQXF1ZXVlZD1cdTYzOTJcdTk2MUZcdTdCNDlcdTRFMzJcdTg4NENcdTk2MUZcdTUyMTdcdUZGMENydW5uaW5nPVx1NkI2M1x1NTcyOFx1OEJGN1x1NkM0Mlx1RkYwOFx1NTkxQVx1OTAwOS9cdTY1NzRcdThGNkVcdTY1RjZcdTgxRUFcdTUyQThcdTkwMTBcdTRFMkFcdTUyMDZcdTY3OTBcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgW2RldGFpbFN0YXR1cywgc2V0RGV0YWlsU3RhdHVzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsICdxdWV1ZWQnIHwgJ3J1bm5pbmcnPj4oe30pXG4gIGNvbnN0IGRldGFpbFF1ZXVlZENvdW50ID0gT2JqZWN0LnZhbHVlcyhkZXRhaWxTdGF0dXMpLmZpbHRlcigoc3RhdHVzKSA9PiBzdGF0dXMgPT09ICdxdWV1ZWQnKS5sZW5ndGhcbiAgY29uc3QgZGV0YWlsUnVubmluZ0NvdW50ID0gT2JqZWN0LnZhbHVlcyhkZXRhaWxTdGF0dXMpLmZpbHRlcigoc3RhdHVzKSA9PiBzdGF0dXMgPT09ICdydW5uaW5nJykubGVuZ3RoXG4gIGNvbnN0IFtpbXBhY3QsIHNldEltcGFjdF0gPSB1c2VTdGF0ZTxJbXBhY3RTY29wZVBheWxvYWQgfCBudWxsPihudWxsKVxuICBjb25zdCBbaW1wYWN0TG9hZGluZywgc2V0SW1wYWN0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW3Jldmlld3MsIHNldFJldmlld3NdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgUmV2aWV3UGF5bG9hZD4+KHt9KVxuICBjb25zdCBbcmV2aWV3TG9hZGluZywgc2V0UmV2aWV3TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2ZpbGVEaWZmcywgc2V0RmlsZURpZmZzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KHt9KVxuICBjb25zdCBbY29uZmlybURpYWxvZywgc2V0Q29uZmlybURpYWxvZ10gPSB1c2VTdGF0ZTx7IHRpdGxlOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZzsgZGFuZ2VyPzogYm9vbGVhbjsgb25Db25maXJtOiAoKSA9PiB2b2lkIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBbbm90ZXMsIHNldE5vdGVzXSA9IHVzZVN0YXRlPE5vdGVFbnRyeVtdPihbXSlcbiAgY29uc3QgW25vdGVUaXRsZSwgc2V0Tm90ZVRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbm90ZUNvbnRlbnQsIHNldE5vdGVDb250ZW50XSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbm90ZVRhZ3MsIHNldE5vdGVUYWdzXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbZWRpdGluZ05vdGUsIHNldEVkaXRpbmdOb3RlXSA9IHVzZVN0YXRlPHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29udGVudDogc3RyaW5nOyB0YWdzOiBzdHJpbmcgfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtub3RlU2VhcmNoLCBzZXROb3RlU2VhcmNoXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbm90ZUV4cGFuZGVkLCBzZXROb3RlRXhwYW5kZWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KVxuICBjb25zdCBbaXNzdWVzRGF0YSwgc2V0SXNzdWVzRGF0YV0gPSB1c2VTdGF0ZTxJc3N1ZUVudHJ5W10gfCBudWxsPihudWxsKVxuICBjb25zdCBbaXNzdWVTZXZlcml0eUZpbHRlciwgc2V0SXNzdWVTZXZlcml0eUZpbHRlcl0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2lzc3VlU3RhdHVzRmlsdGVyLCBzZXRJc3N1ZVN0YXR1c0ZpbHRlcl0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2lzc3VlRXhwYW5kZWQsIHNldElzc3VlRXhwYW5kZWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KVxuICBjb25zdCBbZml4RXhwYW5kZWQsIHNldEZpeEV4cGFuZGVkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+Pih7fSlcbiAgY29uc3QgW3ZlcmlmeWluZ1RhcmdldCwgc2V0VmVyaWZ5aW5nVGFyZ2V0XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFthaVN1bW1hcml6aW5nLCBzZXRBaVN1bW1hcml6aW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbbmFycmF0aXZlLCBzZXROYXJyYXRpdmVdID0gdXNlU3RhdGU8eyBuYXJyYXRpdmU6IHN0cmluZzsgY2FjaGVkOiBib29sZWFuOyBnZW5lcmF0ZWRBdD86IG51bWJlcjsgY29zdFVzZD86IG51bWJlciB9IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW25hcnJhdGl2ZUJ1c3ksIHNldE5hcnJhdGl2ZUJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtwZWVrLCBzZXRQZWVrXSA9IHVzZVN0YXRlPHsgcGF0aDogc3RyaW5nOyBsaW5lOiBudW1iZXIgfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtwZWVrRGF0YSwgc2V0UGVla0RhdGFdID0gdXNlU3RhdGU8UGVla1BheWxvYWQgfCBudWxsPihudWxsKVxuICBjb25zdCBbcGVla0J1c3ksIHNldFBlZWtCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbbmFycmF0aXZlRXJyb3IsIHNldE5hcnJhdGl2ZUVycm9yXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbW9kZWxUaWVycywgc2V0TW9kZWxUaWVyc10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCB7IHByb3ZpZGVyOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmcgfT4gfCBudWxsPihudWxsKVxuICBjb25zdCBbbW9kZWxPcHRpb25zLCBzZXRNb2RlbE9wdGlvbnNdID0gdXNlU3RhdGU8QXJyYXk8eyBwcm92aWRlcjogc3RyaW5nOyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfT4+KFtdKVxuICBjb25zdCBbbW9kZWxTYXZpbmcsIHNldE1vZGVsU2F2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbbW9kZWxTYXZlZCwgc2V0TW9kZWxTYXZlZF0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDM1x1RkYxQVx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNCAvIFJ1biBcdThCRTZcdTYwQzUgLyBcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTEgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IFtwbGFuQ29uZmlybSwgc2V0UGxhbkNvbmZpcm1dID0gdXNlU3RhdGU8eyBjaGFuZ2VJZDogc3RyaW5nOyBzdGVwczogUGxhbkNvbmZpcm1TdGVwW10gfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtwbGFuQnVzeSwgc2V0UGxhbkJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtydW5EZXRhaWwsIHNldFJ1bkRldGFpbF0gPSB1c2VTdGF0ZTxSdW5EZXRhaWwgfCBudWxsPihudWxsKVxuICBjb25zdCBbc2NoZWR1bGVkRGF0YSwgc2V0U2NoZWR1bGVkRGF0YV0gPSB1c2VTdGF0ZTxTY2hlZHVsZWRUYXNrRW50cnlbXSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtzY2hlZE5hbWUsIHNldFNjaGVkTmFtZV0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW3NjaGVkT3Blbiwgc2V0U2NoZWRPcGVuXSA9IHVzZVN0YXRlKHRydWUpXG4gIGNvbnN0IFtzY2hlZFR5cGUsIHNldFNjaGVkVHlwZV0gPSB1c2VTdGF0ZSgncmV2aWV3JylcbiAgY29uc3QgW3NjaGVkVGl0bGUsIHNldFNjaGVkVGl0bGVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtzY2hlZERlc2MsIHNldFNjaGVkRGVzY10gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW3NjaGVkSW50ZXJ2YWwsIHNldFNjaGVkSW50ZXJ2YWxdID0gdXNlU3RhdGUoJzE0NDAnKVxuICAvLyBcdTI1MDBcdTI1MDAgXHU4QkIwXHU1RkM2XHU5NzYyXHU2NzdGXHVGRjFBXHU1MTY4XHU5MUNGXHU2NTcwXHU2MzZFIC8gXHU1NDBDXHU2QjY1XHU2MkE1XHU1NDRBIFx1MjUwMFx1MjUwMFxuICBjb25zdCBbbWVtb3JpZXNEYXRhLCBzZXRNZW1vcmllc0RhdGFdID0gdXNlU3RhdGU8TWVtb3JpZXNQYXlsb2FkIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3N5bmNSZXBvcnQsIHNldFN5bmNSZXBvcnRdID0gdXNlU3RhdGU8U3luY1JlcG9ydCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFttZW1vcnlTY29wZSwgc2V0TWVtb3J5U2NvcGVdID0gdXNlU3RhdGU8J3Byb2plY3QnIHwgJ2JyYW5jaCc+KCdwcm9qZWN0JylcbiAgY29uc3QgW21lbW9yeVR5cGUsIHNldE1lbW9yeVR5cGVdID0gdXNlU3RhdGUoJ2FyY2hpdGVjdHVyZV9kZWNpc2lvbicpXG4gIGNvbnN0IFttZW1vcnlTeW5jaW5nLCBzZXRNZW1vcnlTeW5jaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbZXhlY1RpdGxlLCBzZXRFeGVjVGl0bGVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtleGVjTW9kZWwsIHNldEV4ZWNNb2RlbF0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2V4ZWNEZXNjLCBzZXRFeGVjRGVzY10gPSB1c2VTdGF0ZSgnJylcblxuICAvKiogXHU3RURGXHU0RTAwIFBPU1RcdUZGMUFcdTVFMjZcdThEODVcdTY1RjZcdTUxNUNcdTVFOTVcdUZGMDhMTE0gXHU3QUVGXHU3MEI5XHU2NzBEXHU1MkExXHU3QUVGIDEyMHMgXHU0RjFBXHU5NjREXHU3RUE3XHU4RkQ0XHU1NkRFXHVGRjBDXHU1QkEyXHU2MjM3XHU3QUVGIDE4MHMgXHU1M0VBXHU1MTVDXHU1RTk1XHU3NzFGXHU2QjYzXHU3Njg0XHU3RjUxXHU3RURDXHU0RTJEXHU2NUFEXHVGRjA5XHVGRjBDXHU3RUREXHU0RTBEXHU4QkE5XHU4QkY3XHU2QzQyXHU2NUUwXHU5NjUwXHU2MzAyXHU4RDc3XHUzMDAyICovXG4gIGNvbnN0IHBvc3QgPSBhc3luYyAocGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgdGltZW91dE1zID0gMTgwXzAwMCk6IFByb21pc2U8eyBvazogYm9vbGVhbjsgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfT4gPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKClcbiAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCB0aW1lb3V0TXMpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocGF0aCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgLi4uYm9keSwgc2Vzc2lvbklkOiBwcm9wcy5zZXNzaW9uSWQgPz8gJycgfSksXG4gICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICB9KVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgcmV0dXJuIHsgb2s6IHJlc3BvbnNlLm9rLCBkYXRhOiAoZGF0YSA/PyB7fSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgfVxuICB9XG5cbiAgLyoqIHBlZWtcdUZGMUFcdTYyNTNcdTVGMDBcdTY3RDBcdTY1ODdcdTRFRjZcdTY3RDBcdTg4NENcdTk2NDRcdThGRDFcdTc2ODRcdTRFRTNcdTc4MDFcdTRFMEFcdTRFMEJcdTY1ODdcdTZENkVcdTVDNDJcdUZGMDhcdTY3MDlcdTc1NENcdTdCNDlcdTVGODUgMTAgXHU3OUQyXHVGRjA5XHUzMDAyICovXG4gIHBlZWtPcGVuZXIgPSAocGF0aDogc3RyaW5nLCBsaW5lOiBudW1iZXIpOiB2b2lkID0+IHsgdm9pZCBvcGVuUGVlayhwYXRoLCBsaW5lKSB9XG4gIGNvbnN0IG9wZW5QZWVrID0gYXN5bmMgKHBhdGg6IHN0cmluZywgbGluZTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0UGVlayh7IHBhdGgsIGxpbmUgfSlcbiAgICBzZXRQZWVrRGF0YShudWxsKVxuICAgIHNldFBlZWtCdXN5KHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKClcbiAgICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiBjb250cm9sbGVyLmFib3J0KCksIDEwXzAwMClcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3BlZWsnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLCBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBwYXRoLCBsaW5lLCBzZXNzaW9uSWQ6IHByb3BzLnNlc3Npb25JZCA/PyAnJyB9KSxcbiAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgIH0pXG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldFBlZWtEYXRhKGRhdGEgYXMgUGVla1BheWxvYWQpXG4gICAgfSBjYXRjaCB7XG4gICAgICBzZXRQZWVrRGF0YSh7IGV4aXN0czogZmFsc2UgfSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0UGVla0J1c3koZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NURFNVx1NEY1Q1x1OEY2RVx1NkIyMVx1NTNEOVx1NEU4Qlx1RkYxQVx1NTkxQVx1NEUyQVx1OTAwOVx1NEUyRFx1NjNEMFx1NEVBNFx1NEY1Q1x1NEUzQVx1NEUwMFx1NEUyQVx1NjU3NFx1NEY1M1x1ODlFM1x1OEJGQlx1RkYwOFx1N0YxM1x1NUI1OCArIFx1NTNFRlx1NUYzQVx1NTIzNlx1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBsb2FkTmFycmF0aXZlID0gYXN5bmMgKGZvcmNlID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBzaGFzID0gc2VsZWN0ZWRUYXJnZXRzLmZpbHRlcigodGFyZ2V0KSA9PiB0YXJnZXQgIT09ICd3b3JraW5nJylcbiAgICBpZiAoc2hhcy5sZW5ndGggPCAyKSByZXR1cm5cbiAgICBzZXROYXJyYXRpdmVCdXN5KHRydWUpXG4gICAgc2V0TmFycmF0aXZlRXJyb3IoJycpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3dvcmstbmFycmF0aXZlJywgeyBzaGFzLCBmb3JjZSB9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXROYXJyYXRpdmVFcnJvcihTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXROYXJyYXRpdmUoe1xuICAgICAgICBuYXJyYXRpdmU6IFN0cmluZyhkYXRhWyduYXJyYXRpdmUnXSA/PyAnJyksXG4gICAgICAgIGNhY2hlZDogZGF0YVsnY2FjaGVkJ10gPT09IHRydWUsXG4gICAgICAgIGdlbmVyYXRlZEF0OiBkYXRhWydnZW5lcmF0ZWRBdCddID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBOdW1iZXIoZGF0YVsnZ2VuZXJhdGVkQXQnXSksXG4gICAgICAgIGNvc3RVc2Q6IGRhdGFbJ2Nvc3RVc2QnXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogTnVtYmVyKGRhdGFbJ2Nvc3RVc2QnXSksXG4gICAgICB9KVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXROYXJyYXRpdmVFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldE5hcnJhdGl2ZUJ1c3koZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29tbWl0c1JlcXVlc3RSZWYgPSB1c2VSZWYoMClcbiAgY29uc3QgbG9hZENvbW1pdHMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9ICsrY29tbWl0c1JlcXVlc3RSZWYuY3VycmVudFxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvcHJvamVjdC1jb250cm9sL2FwaS9jb21taXRzP3Nlc3Npb25JZD0ke2VuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpfSZsaW1pdD02MGApXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoKGRhdGEgYXMgeyBlcnJvcj86IHN0cmluZyB9KS5lcnJvciA/PyBgSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKVxuICAgICAgaWYgKCFhY3RpdmVSZWYuY3VycmVudCB8fCByZXF1ZXN0ICE9PSBjb21taXRzUmVxdWVzdFJlZi5jdXJyZW50KSByZXR1cm5cbiAgICAgIHNldENvbW1pdHNEYXRhKGRhdGEgYXMgQ29tbWl0c1BheWxvYWQpXG4gICAgICBzZXRDb21taXRzRXJyb3IobnVsbClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgaWYgKCFhY3RpdmVSZWYuY3VycmVudCB8fCByZXF1ZXN0ICE9PSBjb21taXRzUmVxdWVzdFJlZi5jdXJyZW50KSByZXR1cm5cbiAgICAgIHNldENvbW1pdHNEYXRhKG51bGwpXG4gICAgICBzZXRDb21taXRzRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWROb3RlcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXM/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0Tm90ZXMoKGRhdGEgYXMgeyBub3RlczogTm90ZUVudHJ5W10gfSkubm90ZXMgPz8gW10pXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTdCMTRcdThCQjBcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcdUZGMUFcdTUyMTdcdTg4NjhcdTRGRERcdTYzMDFcdTUzOUZcdTY4MzdcdTMwMDJcbiAgICB9XG4gIH1cblxuICAvKiogXHU1MkZFXHU5MDA5L1x1NTNENlx1NkQ4OFx1NEUwMFx1NkIyMVx1NjNEMFx1NEVBNFx1RkYxQVx1OTFDRFx1N0I5N1x1OTAwOVx1NEUyRFx1OTZDNlx1NTQwOFx1RkYwQ1x1NUU3Nlx1NjMwOVx1OTcwMFx1ODg2NVx1OUY1MFx1NkJDRlx1Njc2MVx1NjNEMFx1NEVBNFx1NzY4NCBBSSBcdTg5RTNcdThCRkJcdUZGMDhcdTY3MERcdTUyQTFcdTdBRUZcdTY3MDlcdTdGMTNcdTVCNThcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgdG9nZ2xlVGFyZ2V0ID0gYXN5bmMgKHRhcmdldDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0U2VsZWN0ZWRUYXJnZXRzKChwcmV2aW91cykgPT4ge1xuICAgICAgaWYgKHByZXZpb3VzLmluY2x1ZGVzKHRhcmdldCkpIHJldHVybiBwcmV2aW91cy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IHRhcmdldClcbiAgICAgIHJldHVybiBbLi4ucHJldmlvdXMsIHRhcmdldF1cbiAgICB9KVxuICAgIHNldEltcGFjdChudWxsKVxuICAgIHNldFJldmlld3Moe30pXG4gICAgaWYgKCFzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXModGFyZ2V0KSkge1xuICAgICAgbG9hZERldGFpbCh0YXJnZXQsIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTY1NzRcdThGNkVcdTkwMDlcdTYyRTlcdUZGMUFcdTY1NzRcdThGNkVcdTVERjJcdTkwMDlcdTY1RjZcdTUxOERcdTcwQjkgPSBcdTUzRDZcdTZEODhcdTY1NzRcdThGNkVcdUZGMUJcdTY1QjBcdTUyRkVcdTkwMDlcdTc2ODRcdTYzRDBcdTRFQTRcdTU0MDRcdTgxRUFcdTYyQzlcdTUzRDYgQUkgXHU4OUUzXHU4QkZCXHUzMDAyICovXG4gIGNvbnN0IHNlbGVjdFJvdW5kID0gKHNoYXM6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gICAgc2V0SW1wYWN0KG51bGwpXG4gICAgc2V0UmV2aWV3cyh7fSlcbiAgICBpZiAoc2hhcy5ldmVyeSgoc2hhKSA9PiBzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoc2hhKSkpIHtcbiAgICAgIHNldFNlbGVjdGVkVGFyZ2V0cygocHJldmlvdXMpID0+IHByZXZpb3VzLmZpbHRlcigoc2hhKSA9PiAhc2hhcy5pbmNsdWRlcyhzaGEpKSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBhZGRlZCA9IHNoYXMuZmlsdGVyKChzaGEpID0+ICFzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoc2hhKSlcbiAgICBzZXRTZWxlY3RlZFRhcmdldHMoKHByZXZpb3VzKSA9PiBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLnByZXZpb3VzLCAuLi5zaGFzXSkpKVxuICAgIGZvciAoY29uc3Qgc2hhIG9mIGFkZGVkKSBsb2FkRGV0YWlsKHNoYSwgZmFsc2UpXG4gIH1cblxuICAvKiogXHU4OUUzXHU4QkZCXHU1RTc2XHU1M0QxXHU2QzYwXHVGRjFBXHU2QTIxXHU1NzhCXHU3RjUxXHU1MTczXHU1RTc2XHU1M0QxXHU2NzA5XHU5NjUwXHVGRjBDXHU1OTFBXHU5MDA5L1x1NjU3NFx1OEY2RVx1NjI3OVx1OTFDRlx1NTJGRVx1OTAwOVx1NjVGNlx1NjMwOVx1NEUwQVx1OTY1MFx1NUU3Nlx1NTNEMVx1NTIwNlx1Njc5MFx1RkYwOFx1OUVEOFx1OEJBNFx1NjcwMFx1NTkxQSAzIFx1NEUyQVx1NTQwQ1x1NjVGNlx1RkYwOVx1RkYwQ1x1OEQ4NVx1NTFGQVx1NzY4NFx1NjM5Mlx1OTYxRlx1N0I0OVx1NUY4NVx1NUU3Nlx1NjYzRVx1NzkzQVx1OTYxRlx1NTIxN1x1NjU3MFx1MzAwMiAqL1xuICBjb25zdCBNQVhfREVUQUlMX0NPTkNVUlJFTkNZID0gM1xuICBjb25zdCBkZXRhaWxQb29sUmVmID0gdXNlUmVmPHsgcGVuZGluZzogQXJyYXk8eyB0YXJnZXQ6IHN0cmluZzsgZm9yY2U6IGJvb2xlYW4gfT47IGFjdGl2ZTogbnVtYmVyIH0+KHsgcGVuZGluZzogW10sIGFjdGl2ZTogMCB9KVxuICBjb25zdCBkZXRhaWxJbkZsaWdodFJlZiA9IHVzZVJlZihuZXcgU2V0PHN0cmluZz4oKSlcblxuICBjb25zdCBwdW1wRGV0YWlsUG9vbCA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBwb29sID0gZGV0YWlsUG9vbFJlZi5jdXJyZW50XG4gICAgd2hpbGUgKGFjdGl2ZVJlZi5jdXJyZW50ICYmIHBvb2wuYWN0aXZlIDwgTUFYX0RFVEFJTF9DT05DVVJSRU5DWSAmJiBwb29sLnBlbmRpbmcubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3Qgam9iID0gcG9vbC5wZW5kaW5nLnNoaWZ0KCkhXG4gICAgICBwb29sLmFjdGl2ZSArPSAxXG4gICAgICB2b2lkIGxvYWREZXRhaWxPbmNlKGpvYi50YXJnZXQsIGpvYi5mb3JjZSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHt9KVxuICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgcG9vbC5hY3RpdmUgLT0gMVxuICAgICAgICAgIHB1bXBEZXRhaWxQb29sKClcbiAgICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkRGV0YWlsID0gKHRhcmdldDogc3RyaW5nLCBmb3JjZTogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIGlmIChkZXRhaWxJbkZsaWdodFJlZi5jdXJyZW50Lmhhcyh0YXJnZXQpKSByZXR1cm5cbiAgICBkZXRhaWxJbkZsaWdodFJlZi5jdXJyZW50LmFkZCh0YXJnZXQpXG4gICAgc2V0RGV0YWlsU3RhdHVzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFt0YXJnZXRdOiAncXVldWVkJyB9KSlcbiAgICBkZXRhaWxQb29sUmVmLmN1cnJlbnQucGVuZGluZy5wdXNoKHsgdGFyZ2V0LCBmb3JjZSB9KVxuICAgIHB1bXBEZXRhaWxQb29sKClcbiAgfVxuXG4gIC8qKiBcdTk2MUZcdTUyMTdcdTRFRkJcdTUyQTFcdTRGNTNcdUZGMUFcdTc3MUZcdTZCNjNcdTUzRDFcdThENzdcdTg5RTNcdThCRkJcdThCRjdcdTZDNDJcdUZGMUJcdTRFRkJcdTRGNTVcdTU5MzFcdThEMjVcdUZGMDhcdTdGNTFcdTdFRENcdTRFMkRcdTY1QUQvXHU4RDg1XHU2NUY2L1x1NjcwRFx1NTJBMVx1NjcyQVx1OEZEMFx1ODg0Q1x1RkYwOVx1OTBGRFx1NTE5OVx1NTE2NVx1NTM2MVx1NzI0N1x1OTUxOVx1OEJFRlx1NTM2MFx1NEY0RFx1RkYwQ1x1N0VERFx1NEUwRFx1NjVFMFx1OTY1MFx1OEY2Q1x1NTcwOFx1MzAwMiAqL1xuICBjb25zdCBsb2FkRGV0YWlsT25jZSA9IGFzeW5jICh0YXJnZXQ6IHN0cmluZywgZm9yY2U6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXREZXRhaWxTdGF0dXMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW3RhcmdldF06ICdydW5uaW5nJyB9KSlcbiAgICBjb25zdCBmYWlsUGxhY2Vob2xkZXIgPSAobWVzc2FnZTogc3RyaW5nKTogQ29tbWl0RGV0YWlsUGF5bG9hZCA9PlxuICAgICAgKHtcbiAgICAgICAgc2hhOiB0YXJnZXQsXG4gICAgICAgIGlzV29ya2luZzogdGFyZ2V0ID09PSAnd29ya2luZycsXG4gICAgICAgIGZpbGVzOiBbXSxcbiAgICAgICAgaW5zZXJ0aW9uczogMCxcbiAgICAgICAgZGVsZXRpb25zOiAwLFxuICAgICAgICBwYXRjaFRydW5jYXRlZDogZmFsc2UsXG4gICAgICAgIHBhdGNoOiAnJyxcbiAgICAgICAgY29tbWl0OiBudWxsLFxuICAgICAgICBhbmFseXNpczogeyB3aGF0OiBtZXNzYWdlLCBsb2dpYzogW10sIHJpc2tzOiBbXSB9LFxuICAgICAgfSkgYXMgdW5rbm93biBhcyBDb21taXREZXRhaWxQYXlsb2FkXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbW1pdC1kZXRhaWwnLCB7IHNoYTogdGFyZ2V0LCBmb3JjZSB9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHtcbiAgICAgICAgICAuLi5wcmV2aW91cyxcbiAgICAgICAgICBbdGFyZ2V0XTogZmFpbFBsYWNlaG9sZGVyKCdBSSBcdTg5RTNcdThCRkJcdTU5MzFcdThEMjVcdUZGMUEnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJycpICsgJ1x1RkYwOFx1NzBCOVx1MzAwQ1x1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1MzAwRFx1NTNFRlx1OTFDRFx1OEJENVx1RkYwOScpLFxuICAgICAgICB9KSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFt0YXJnZXRdOiBkYXRhIGFzIHVua25vd24gYXMgQ29tbWl0RGV0YWlsUGF5bG9hZCB9KSlcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgY29uc3QgcmVhc29uID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpXG4gICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHtcbiAgICAgICAgLi4ucHJldmlvdXMsXG4gICAgICAgIFt0YXJnZXRdOiBmYWlsUGxhY2Vob2xkZXIoYEFJIFx1ODlFM1x1OEJGQlx1NTkzMVx1OEQyNVx1RkYxQSR7cmVhc29uID09PSAnVGhlIHVzZXIgYWJvcnRlZCBhIHJlcXVlc3QuJyA/ICdcdThCRjdcdTZDNDJcdThEODVcdTY1RjZcdTYyMTZcdTY3MERcdTUyQTFcdTRFMkRcdTY1QUQnIDogcmVhc29ufVx1RkYwOFx1NjhDMFx1NjdFNSBkc2ggXHU2NjJGXHU1NDI2XHU1NzI4XHU4RkQwXHU4ODRDXHVGRjFCXHU3MEI5XHUzMDBDXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwXHUzMDBEXHU1M0VGXHU5MUNEXHU4QkQ1XHVGRjA5YCksXG4gICAgICB9KSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgZGV0YWlsSW5GbGlnaHRSZWYuY3VycmVudC5kZWxldGUodGFyZ2V0KVxuICAgICAgc2V0RGV0YWlsU3RhdHVzKChwcmV2aW91cykgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9XG4gICAgICAgIGRlbGV0ZSBuZXh0W3RhcmdldF1cbiAgICAgICAgcmV0dXJuIG5leHRcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZEltcGFjdCA9IGFzeW5jIChmb3JjZSA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDApIHJldHVyblxuICAgIHNldEltcGFjdExvYWRpbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaW1wYWN0LXNjb3BlJywgeyBzaGFzOiBzZWxlY3RlZFRhcmdldHMsIGZvcmNlIH0pXG4gICAgICBzZXRJbXBhY3Qob2sgPyAoZGF0YSBhcyB1bmtub3duIGFzIEltcGFjdFNjb3BlUGF5bG9hZCkgOiBudWxsKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJbXBhY3RMb2FkaW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWRSZXZpZXdzID0gYXN5bmMgKGZvcmNlID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoc2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgc2V0UmV2aWV3TG9hZGluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBzZWxlY3RlZFRhcmdldHMpIHtcbiAgICAgICAgaWYgKCFhY3RpdmVSZWYuY3VycmVudCkgYnJlYWtcbiAgICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcmV2aWV3JywgeyBzaGE6IHRhcmdldCwgZm9yY2UgfSlcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGRhdGEgYXMgdW5rbm93biBhcyBSZXZpZXdQYXlsb2FkXG4gICAgICAgIHNldFJldmlld3MoKHByZXZpb3VzKSA9PiAoe1xuICAgICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICAgIFt0YXJnZXRdOiBvayA/IHBheWxvYWQgOiB7XG4gICAgICAgICAgICBpc3N1ZXNGb3VuZDogMCxcbiAgICAgICAgICAgIGlzc3VlczogJycsXG4gICAgICAgICAgICB2ZXJkaWN0OiAnXHU4QkM0XHU1QkExXHU1OTMxXHU4RDI1XHVGRjFBJyArIFN0cmluZyhwYXlsb2FkWydlcnJvciddID8/ICcnKSArICdcdUZGMDhcdTUzRUZcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdTkxQ0RcdThCRDVcdUZGMDknLFxuICAgICAgICAgICAgaXNzdWVMaXN0OiBbXSxcbiAgICAgICAgICAgIGNhY2hlZDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSkpXG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFJldmlld0xvYWRpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZEZpbGVEaWZmID0gYXN5bmMgKHNoYTogc3RyaW5nLCBwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBrZXkgPSBgJHtzaGF9fCR7cGF0aH1gXG4gICAgaWYgKGZpbGVEaWZmc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNldEZpbGVEaWZmcygocHJldmlvdXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfVxuICAgICAgICBkZWxldGUgbmV4dFtrZXldXG4gICAgICAgIHJldHVybiBuZXh0XG4gICAgICB9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvZmlsZS1kaWZmJywgeyBzaGEsIHBhdGggfSlcbiAgICBzZXRGaWxlRGlmZnMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW2tleV06IFN0cmluZyhkYXRhWydwYXRjaCddID8/ICcnKSB9KSlcbiAgfVxuXG4gIGNvbnN0IGxvYWRJc3N1ZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcz9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXRJc3N1ZXNEYXRhKChkYXRhIGFzIHsgaXNzdWVzOiBJc3N1ZUVudHJ5W10gfSkuaXNzdWVzID8/IFtdKVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gXHU5NUVFXHU5ODk4XHU1MjE3XHU4ODY4XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXHVGRjFBXHU1MjE3XHU4ODY4XHU0RkREXHU2MzAxXHU1MzlGXHU2ODM3XHUzMDAyXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1OTVFRVx1OTg5OFx1NTkwRFx1NjhDMFx1RkYxQVx1NUJGOVx1OEJFNVx1OTVFRVx1OTg5OFx1NjI0MFx1NUM1RVx1OEJDNFx1NUJBMVx1NzZFRVx1NjgwN1x1OTFDRFx1OEREMVx1NjhDMFx1NkQ0Qlx1RkYwOFx1NEZFRVx1NTkwRFx1Nzg2RVx1OEJBNCArIFx1NjcwMFx1NEYxOFx1NjAyNy9cdTY3MDBcdTVDMEZcdTRGQjVcdTUxNjUgKyBcdTY1QjBcdTk1RUVcdTk4OThcdTYyNkJcdTYzQ0ZcdUZGMDlcdUZGMENcbiAgICogXHU1M0VBXHU2NzA5XHU1OTBEXHU2OEMwXHU5MDFBXHU4RkM3XHU2MjREXHU4MUVBXHU1MkE4XHU3RjZFXHU0RTNBXHU1REYyXHU4OUUzXHU1MUIzXHVGRjFCXHU3RUQzXHU2NzlDXHU0RUU1XHU1OTBEXHU2OEMwXHU2MkE1XHU1NDRBXHU1RjYyXHU1RjBGXHU1QzU1XHU3OTNBXHUzMDAyXG4gICAqL1xuICBjb25zdCB2ZXJpZnlJc3N1ZXMgPSBhc3luYyAodGFyZ2V0OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRWZXJpZnlpbmdUYXJnZXQodGFyZ2V0KVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXMvdmVyaWZ5JywgeyB0YXJnZXQgfSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc29sdmVkID0gKGRhdGFbJ3Jlc29sdmVkJ10gYXMgc3RyaW5nW10gfCB1bmRlZmluZWQpID8/IFtdXG4gICAgICBjb25zdCBzdGlsbE9wZW4gPSAoZGF0YVsnc3RpbGxPcGVuJ10gYXMgQXJyYXk8eyB0aXRsZTogc3RyaW5nOyByZWFzb246IHN0cmluZyB9PiB8IHVuZGVmaW5lZCkgPz8gW11cbiAgICAgIGNvbnN0IG5ld0lzc3VlcyA9IChkYXRhWyduZXdJc3N1ZXMnXSBhcyBBcnJheTx7IHNldmVyaXR5OiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT4gfCB1bmRlZmluZWQpID8/IFtdXG4gICAgICBjb25zdCB2ZXJkaWN0ID0gU3RyaW5nKGRhdGFbJ3ZlcmRpY3QnXSA/PyAnJylcbiAgICAgIGNvbnN0IGxpbmVzID0gW1xuICAgICAgICBgXHU1OTBEXHU2OEMwXHU1QjhDXHU2MjEwXHVGRjFBXHU1REYyXHU0RkVFXHU1OTBEICR7cmVzb2x2ZWQubGVuZ3RofSBcdTAwQjcgXHU0RUNEXHU2NzJBXHU0RkVFXHU1OTBEICR7c3RpbGxPcGVuLmxlbmd0aH0gXHUwMEI3IFx1NjVCMFx1NTg5RVx1OTVFRVx1OTg5OCAke25ld0lzc3Vlcy5sZW5ndGh9YCxcbiAgICAgICAgLi4uKHJlc29sdmVkLmxlbmd0aCA+IDAgPyBbYFx1MjcxMyBcdTVERjJcdTRGRUVcdTU5MERcdUZGMUEke3Jlc29sdmVkLmpvaW4oJ1x1RkYxQicpfWBdIDogW10pLFxuICAgICAgICAuLi4oc3RpbGxPcGVuLmxlbmd0aCA+IDAgPyBzdGlsbE9wZW4ubWFwKChpdGVtKSA9PiBgXHUyNzE3IFx1NjcyQVx1NEZFRVx1NTkwRFx1RkYxQSR7aXRlbS50aXRsZX0gXHUyMDE0XHUyMDE0ICR7aXRlbS5yZWFzb259YCkgOiBbXSksXG4gICAgICAgIC4uLihuZXdJc3N1ZXMubGVuZ3RoID4gMCA/IG5ld0lzc3Vlcy5tYXAoKGl0ZW0pID0+IGBcdUZGMEIgXHU2NUIwXHU5NUVFXHU5ODk4XHVGRjFBWyR7aXRlbS5zZXZlcml0eX1dICR7aXRlbS50aXRsZX1gKSA6IFtdKSxcbiAgICAgICAgLi4uKHZlcmRpY3QgPT09ICcnID8gW10gOiBbYFx1NjcwMFx1NEYxOFx1NjAyN1x1RkYxQSR7dmVyZGljdH1gXSksXG4gICAgICBdXG4gICAgICBzZXRBY3Rpb25SZXN1bHQobGluZXMuam9pbignXFxuJykpXG4gICAgICBhd2FpdCBsb2FkSXNzdWVzKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRWZXJpZnlpbmdUYXJnZXQobnVsbClcbiAgICB9XG4gIH1cblxuICBjb25zdCBhZGROb3RlID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChub3RlVGl0bGUudHJpbSgpID09PSAnJyB8fCBub3RlQ29udGVudC50cmltKCkgPT09ICcnKSByZXR1cm5cbiAgICBjb25zdCB7IG9rIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3RlcycsIHtcbiAgICAgIHRpdGxlOiBub3RlVGl0bGUudHJpbSgpLFxuICAgICAgY29udGVudDogbm90ZUNvbnRlbnQudHJpbSgpLFxuICAgICAgdGFnczogbm90ZVRhZ3MsXG4gICAgICBzaGE6IHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiBzZWxlY3RlZFRhcmdldHNbMF0sXG4gICAgfSlcbiAgICBpZiAob2spIHtcbiAgICAgIHNldE5vdGVUaXRsZSgnJylcbiAgICAgIHNldE5vdGVDb250ZW50KCcnKVxuICAgICAgc2V0Tm90ZVRhZ3MoJycpXG4gICAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlbW92ZU5vdGUgPSBhc3luYyAoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL2RlbGV0ZScsIHsgaWQgfSlcbiAgICBpZiAoZWRpdGluZ05vdGUgIT09IG51bGwgJiYgZWRpdGluZ05vdGUuaWQgPT09IGlkKSBzZXRFZGl0aW5nTm90ZShudWxsKVxuICAgIGF3YWl0IGxvYWROb3RlcygpXG4gIH1cblxuICBjb25zdCBzYXZlTm90ZUVkaXQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKGVkaXRpbmdOb3RlID09PSBudWxsKSByZXR1cm5cbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy91cGRhdGUnLCB7IGlkOiBlZGl0aW5nTm90ZS5pZCwgdGl0bGU6IGVkaXRpbmdOb3RlLnRpdGxlLCBjb250ZW50OiBlZGl0aW5nTm90ZS5jb250ZW50LCB0YWdzOiBlZGl0aW5nTm90ZS50YWdzIH0pXG4gICAgc2V0RWRpdGluZ05vdGUobnVsbClcbiAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICB9XG5cbiAgLyoqIFx1N0Y2RVx1OTg3Ni9cdTUzRDZcdTZEODhcdTdGNkVcdTk4NzZcdTRFMDBcdTY3NjFcdTdCMTRcdThCQjBcdTMwMDIgKi9cbiAgY29uc3QgdG9nZ2xlTm90ZVBpbiA9IGFzeW5jIChub3RlOiBOb3RlRW50cnkpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy91cGRhdGUnLCB7IGlkOiBub3RlLmlkLCBwaW5uZWQ6IG5vdGUucGlubmVkICE9PSB0cnVlIH0pXG4gICAgYXdhaXQgbG9hZE5vdGVzKClcbiAgfVxuXG4gIC8qKiBcdTdCMTRcdThCQjBcdTVCRkNcdTUxRkFcdTRFM0EgLm1kIFx1NjU4N1x1NEVGNlx1RkYwOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1N0FFRiBCbG9iIFx1NEUwQlx1OEY3RFx1RkYxQlx1NjU4N1x1NEVGNlx1NTQwRFx1NjMwOVx1NjgwN1x1OTg5OFx1NkUwNVx1NkQxN1x1RkYwQ1x1OTc1RVx1NkNENVx1NUI1N1x1N0IyNlx1NjZGRlx1NjM2Mlx1NEUzQVx1NEUwQlx1NTIxMlx1N0VCRlx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBleHBvcnROb3RlID0gKG5vdGU6IE5vdGVFbnRyeSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IG1kID0gYCMgJHtub3RlLnRpdGxlfVxcblxcbiR7bm90ZS5jb250ZW50fVxcbmBcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW21kXSwgeyB0eXBlOiAndGV4dC9tYXJrZG93bjtjaGFyc2V0PXV0Zi04JyB9KVxuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgICBjb25zdCBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBhbmNob3IuaHJlZiA9IHVybFxuICAgIGFuY2hvci5kb3dubG9hZCA9IChub3RlLnRpdGxlLnJlcGxhY2UoL1tcXFxcLzoqP1wiPD58XS9nLCAnXycpLnRyaW0oKS5zbGljZSgwLCA2MCkgfHwgJ25vdGUnKSArICcubWQnXG4gICAgYW5jaG9yLmNsaWNrKClcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybClcbiAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgnbm90ZXMuZXhwb3J0RG9uZScpKVxuICB9XG5cbiAgLyoqIEFJIFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1RkYxQVx1NUJGOVx1NkJENFx1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NTA1QVx1NTg5RVx1OTFDRlx1NjZGNFx1NjVCMFx1RkYwQ1x1NjI4QVx1N0IxNFx1OEJCMCtcdTk4NzlcdTc2RUVcdTY4NjNcdTY4NDhcdTYzRDBcdTcwQkNcdTYyMTBcdTRFMDBcdTRFRkRcdTMwMENcdTZEM0JcdTMwMERcdTc2ODRcdTYwM0JcdTdFRDNcdTY1ODdcdTY4NjNcdTMwMDIgKi9cbiAgY29uc3QgYWlTdW1tYXJpemUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0QWlTdW1tYXJpemluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy9haS1zdW1tYXJ5Jywge30pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoZGF0YVsndXBkYXRlZCddID09PSB0cnVlXG4gICAgICAgID8gJ1x1MjcxMyBcdTVERjJcdTVCRjlcdTZCRDRcdTRFMEFcdTZCMjFcdTYwM0JcdTdFRDNcdTVCOENcdTYyMTBcdTU4OUVcdTkxQ0ZcdTY2RjRcdTY1QjBcdUZGMDhcdTY1QjBcdTU4OUVcdTUzRDhcdTUzMTZcdTg5QzFcdTYwM0JcdTdFRDNcdTc2ODRcdTMwMENcdTY3MkNcdTZCMjFcdTY2RjRcdTY1QjBcdTMwMERcdTRFMDBcdTgyODJcdUZGMDlcdUZGMENcdTY1RTdcdTYwM0JcdTdFRDNcdTVERjJcdTU0MDhcdTVFNzZcdTY2RkZcdTYzNjInXG4gICAgICAgIDogJ1x1MjcxMyBcdTVERjJcdTc1MUZcdTYyMTBcdTk5OTZcdTRFRkRcdTVCNjZcdTRFNjBcdTYwM0JcdTdFRDMnKVxuICAgICAgYXdhaXQgbG9hZE5vdGVzKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRBaVN1bW1hcml6aW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTk4NzVcdTk3NjJcdTUyMUJcdTVFRkFcdTYyNjdcdTg4NENcdUZGMUFcdTVFRkFcdTUzRDhcdTY2RjQgXHUyMTkyIExMTSBcdTc1MUZcdTYyMTBcdTdGMTZcdTYzOTJcdThCQTFcdTUyMTIgXHUyMTkyIFx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNFx1OTg3NVx1RkYwOFx1ODlEMlx1ODI3Mi9cdTZBMjFcdTU3OEIvXHU3QjU2XHU3NTY1XHU1M0VGXHU4QzAzXHVGRjA5XHUyMTkyIFx1Nzg2RVx1OEJBNFx1NTQwRVx1NTQyRlx1NTJBOFx1MzAwMiAqL1xuICBjb25zdCBzdGFydFJ1biA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoZXhlY1RpdGxlLnRyaW0oKSA9PT0gJycgfHwgZXhlY0Rlc2MudHJpbSgpID09PSAnJykgcmV0dXJuXG4gICAgc2V0QnVzeSgnc3RhcnRSdW4nKVxuICAgIHNldEFjdGlvblJlc3VsdChudWxsKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL3N0YXJ0Jywge1xuICAgICAgICB0aXRsZTogZXhlY1RpdGxlLnRyaW0oKSwgZGVzY3JpcHRpb246IGV4ZWNEZXNjLnRyaW0oKSxcbiAgICAgICAgLi4uKGV4ZWNNb2RlbCA9PT0gJycgPyB7fSA6ICgoKSA9PiB7IGNvbnN0IFtwcm92aWRlciwgbW9kZWxdID0gZXhlY01vZGVsLnNwbGl0KCcvJyk7IHJldHVybiB7IGRlZmF1bHRNb2RlbFByb3ZpZGVyOiBwcm92aWRlciA/PyAnJywgZGVmYXVsdE1vZGVsSWQ6IG1vZGVsID8/ICcnIH0gfSkoKSksXG4gICAgICB9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKGRhdGFbJ2F1dG9TdGFydGVkJ10gPT09IHRydWUpIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU1REYyXHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHVGRjFBJyArIFN0cmluZyhkYXRhWydydW5JZCddID8/ICcnKSlcbiAgICAgICAgc2V0RXhlY1RpdGxlKCcnKVxuICAgICAgICBzZXRFeGVjRGVzYygnJylcbiAgICAgICAgYXdhaXQgcmVmcmVzaFN0YXRlKClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBzdGVwcyA9IChkYXRhWydzdGVwcyddIGFzIEFycmF5PFJlY29yZDxzdHJpbmcsIHVua25vd24+PiB8IHVuZGVmaW5lZCkgPz8gW11cbiAgICAgIHNldFBsYW5Db25maXJtKHtcbiAgICAgICAgY2hhbmdlSWQ6IFN0cmluZyhkYXRhWydjaGFuZ2VJZCddID8/ICcnKSxcbiAgICAgICAgc3RlcHM6IHN0ZXBzLm1hcCgoc3RlcCkgPT4gKHtcbiAgICAgICAgICBpZDogU3RyaW5nKHN0ZXBbJ2lkJ10gPz8gJycpLFxuICAgICAgICAgIHRpdGxlOiBTdHJpbmcoc3RlcFsndGl0bGUnXSA/PyAnJyksXG4gICAgICAgICAgZGVzY3JpcHRpb246IFN0cmluZyhzdGVwWydkZXNjcmlwdGlvbiddID8/ICcnKSxcbiAgICAgICAgICB0YXJnZXRGaWxlczogKHN0ZXBbJ3RhcmdldEZpbGVzJ10gYXMgc3RyaW5nW10gfCB1bmRlZmluZWQpID8/IFtdLFxuICAgICAgICAgIHJvbGU6IFN0cmluZyhzdGVwWydyb2xlJ10gPz8gJ2NvZGluZycpLFxuICAgICAgICAgIGFjY2VwdGFuY2U6IFN0cmluZyhzdGVwWydhY2NlcHRhbmNlJ10gPz8gJycpLFxuICAgICAgICAgIGZhaWx1cmVQb2xpY3k6IFN0cmluZyhzdGVwWydmYWlsdXJlUG9saWN5J10gPz8gJ3JldHJ5LWVzY2FsYXRlJyksXG4gICAgICAgICAgZW5hYmxlZDogc3RlcFsnZW5hYmxlZCddICE9PSBmYWxzZSxcbiAgICAgICAgICBtb2RlbFByb3ZpZGVyOiAnJyxcbiAgICAgICAgICBtb2RlbElkOiAnJyxcbiAgICAgICAgfSkpLFxuICAgICAgfSlcbiAgICAgIGlmIChtb2RlbE9wdGlvbnMubGVuZ3RoID09PSAwICYmIG1vZGVsVGllcnMgPT09IG51bGwpIHZvaWQgbG9hZE1vZGVsQ29uZmlnKClcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1OEJBMVx1NTIxMlx1NURGMlx1NzUxRlx1NjIxMFx1RkYwQ1x1OEJGN1x1NTcyOFx1NEUwQlx1NjVCOVx1Nzg2RVx1OEJBNFx1N0YxNlx1NjM5Mlx1NTQwRVx1NTQyRlx1NTJBOCcpXG4gICAgICBzZXRFeGVjVGl0bGUoJycpXG4gICAgICBzZXRFeGVjRGVzYygnJylcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRCdXN5KG51bGwpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNFx1OTg3NVx1RkYxQVx1NEZERFx1NUI1OFx1N0YxNlx1OEY5MVx1RkYwOFx1NjVCMFx1NzI0OFx1NjcyQ1x1OEJBMVx1NTIxMlx1RkYwOVx1NUU3Nlx1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1MzAwMiAqL1xuICBjb25zdCBsYXVuY2hQbGFuID0gYXN5bmMgKHdpdGhFZGl0czogYm9vbGVhbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChwbGFuQ29uZmlybSA9PT0gbnVsbCkgcmV0dXJuXG4gICAgc2V0UGxhbkJ1c3kodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgbGV0IGNoYW5nZUlkID0gcGxhbkNvbmZpcm0uY2hhbmdlSWRcbiAgICAgIGlmICh3aXRoRWRpdHMpIHtcbiAgICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9wbGFuL3VwZGF0ZScsIHsgY2hhbmdlSWQsIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcyB9KVxuICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL2xhdW5jaCcsIHsgY2hhbmdlSWQgfSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NURGMlx1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYxQScgKyBTdHJpbmcoZGF0YVsncnVuSWQnXSA/PyAnJykpXG4gICAgICBzZXRQbGFuQ29uZmlybShudWxsKVxuICAgICAgYXdhaXQgcmVmcmVzaFN0YXRlKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRQbGFuQnVzeShmYWxzZSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU1MkEwXHU4RjdEIFJ1biBcdThCRTZcdTYwQzVcdUZGMDhcdTZCNjVcdTlBQTRcdTY1RjZcdTk1RjRcdTdFQkYgKyBcdTRFRkJcdTUyQTFcdTVERTVcdTRGNUNcdThCQjBcdTVGQzZcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgbG9hZFJ1bkRldGFpbCA9IGFzeW5jIChpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvZGV0YWlsP2lkPScgKyBlbmNvZGVVUklDb21wb25lbnQoaWQpICsgJyZzZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXRSdW5EZXRhaWwoZGF0YSBhcyBSdW5EZXRhaWwpXG4gICAgfSBjYXRjaCB7XG4gICAgICBzZXRSdW5EZXRhaWwobnVsbClcbiAgICB9XG4gIH1cblxuICAvKiogXHU2MDYyXHU1OTBEXHU2NjgyXHU1MDVDL1x1NEUyRFx1NjVBRC9cdTU5MzFcdThEMjVcdTc2ODQgUnVuXHUzMDAyICovXG4gIGNvbnN0IHJlc3VtZVJ1biA9IGFzeW5jIChydW5JZDogc3RyaW5nLCBhY3Rpb246ICdjb250aW51ZScgfCAnc2tpcC1jdXJyZW50Jyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvcmVzdW1lJywgeyBydW5JZCwgYWN0aW9uIH0pXG4gICAgaWYgKG9rKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTYwNjJcdTU5MERcdTYyNjdcdTg4NENcdUZGMDgnICsgYWN0aW9uICsgJ1x1RkYwOScpXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgICAgYXdhaXQgbG9hZFJ1bkRldGFpbChydW5JZClcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTUyQTBcdThGN0RcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdTUyMTdcdTg4NjhcdTMwMDIgKi9cbiAgY29uc3QgbG9hZFNjaGVkdWxlZCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvc2NoZWR1bGVkP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldFNjaGVkdWxlZERhdGEoKGRhdGEgYXMgeyB0YXNrczogU2NoZWR1bGVkVGFza0VudHJ5W10gfSkudGFza3MgPz8gW10pXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTUyMTdcdTg4NjhcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcbiAgICB9XG4gIH1cblxuICAvKiogXHU1MjFCXHU1RUZBIC8gXHU2NkY0XHU2NUIwIC8gXHU1MjIwXHU5NjY0IC8gXHU3QUNCXHU1MzczXHU2MjY3XHU4ODRDXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHUzMDAyICovXG4gIGNvbnN0IGFkZFNjaGVkdWxlZCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBpbnRlcnZhbE1pbnV0ZXMgPSBOdW1iZXIoc2NoZWRJbnRlcnZhbClcbiAgICBpZiAoc2NoZWROYW1lLnRyaW0oKSA9PT0gJycgfHwgIU51bWJlci5pc0Zpbml0ZShpbnRlcnZhbE1pbnV0ZXMpIHx8IGludGVydmFsTWludXRlcyA8IDEpIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3IFx1OEJGN1x1NTg2Qlx1NTE5OVx1NEVGQlx1NTJBMVx1NTQwRFx1NzlGMFx1NEUwRVx1NjcwOVx1NjU0OFx1OTVGNFx1OTY5NFx1RkYwOFx1NTIwNlx1OTQ5Rlx1RkYwOScpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvc2NoZWR1bGVkJywge1xuICAgICAgbmFtZTogc2NoZWROYW1lLnRyaW0oKSwgdHlwZTogc2NoZWRUeXBlLCBpbnRlcnZhbE1pbnV0ZXMsXG4gICAgICB0aXRsZTogc2NoZWRUaXRsZS50cmltKCkgfHwgdW5kZWZpbmVkLCBkZXNjcmlwdGlvbjogc2NoZWREZXNjLnRyaW0oKSB8fCB1bmRlZmluZWQsXG4gICAgfSlcbiAgICBpZiAob2spIHtcbiAgICAgIHNldFNjaGVkTmFtZSgnJyk7IHNldFNjaGVkVGl0bGUoJycpOyBzZXRTY2hlZERlc2MoJycpXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdTVERjJcdTUyMUJcdTVFRkEnKVxuICAgICAgYXdhaXQgbG9hZFNjaGVkdWxlZCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBzY2hlZHVsZWRBY3Rpb24gPSBhc3luYyAocGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3NjaGVkdWxlZC8nICsgcGF0aCwgYm9keSlcbiAgICBpZiAob2spIGF3YWl0IGxvYWRTY2hlZHVsZWQoKVxuICAgIGVsc2Ugc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICB9XG5cbiAgLyoqIFx1NTJBMFx1OEY3RFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1NTE2OFx1OTFDRlx1NjU3MFx1NjM2RVx1RkYwOFx1NTQyQlx1NTQwQ1x1NkI2NVx1NTdGQVx1N0VCRlx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBsb2FkTWVtb3JpZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yaWVzP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldE1lbW9yaWVzRGF0YShkYXRhIGFzIE1lbW9yaWVzUGF5bG9hZClcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2MlxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTYyQzlcdTUzRDZcdTU0MENcdTZCNjVcdUZGMUFcdTRFMDlcdTU0MTFcdTUyMjRcdTVCOUFcdUZGMDhcdTU5MzFcdTY1NDhcdTYzRDBcdTY4NDgvXHU2NUIwXHU1ODlFXHU1MDE5XHU5MDA5L1x1ODFFQVx1NTJBOFx1N0VFRFx1NTQ3RFx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBzeW5jTWVtb3JpZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0TWVtb3J5U3luY2luZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvc3luYycsIHt9KVxuICAgICAgaWYgKCFvayAmJiBkYXRhWydlcnJvciddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2V0U3luY1JlcG9ydCh7IG9rOiBmYWxzZSwgZXJyb3I6IFN0cmluZyhkYXRhWydlcnJvciddKSB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldFN5bmNSZXBvcnQoZGF0YSBhcyBTeW5jUmVwb3J0KVxuICAgICAgYXdhaXQgbG9hZE1lbW9yaWVzKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0U3luY1JlcG9ydCh7IG9rOiBmYWxzZSwgZXJyb3I6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSB9KVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRNZW1vcnlTeW5jaW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTU0MENcdTZCNjVcdTYyQTVcdTU0NEFcdTU0MEVcdTdFRURcdUZGMUFcdTYyOEFcdTkwMDlcdTRFMkRcdTc2ODRcdTc1OTFcdTRGM0NcdThGQzdcdTY1RjZcdTk4NzlcdTg0M0RcdTRFM0Egc3RhbGUgLyBcdTVGNTJcdTY4NjNcdTMwMDIgKi9cbiAgY29uc3QgYXBwbHlTeW5jID0gYXN5bmMgKGlkczogc3RyaW5nW10sIGFjdGlvbjogJ21hcmstc3RhbGUnIHwgJ2FyY2hpdmUnKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5L3N5bmMvYXBwbHknLCB7IGlkcywgYWN0aW9uIH0pXG4gICAgc2V0U3luY1JlcG9ydCgocHJldmlvdXMpID0+IHByZXZpb3VzID09PSBudWxsID8gbnVsbCA6IHsgLi4ucHJldmlvdXMsIHN0YWxlUHJvcG9zYWxzOiAocHJldmlvdXMuc3RhbGVQcm9wb3NhbHMgPz8gW10pLmZpbHRlcigocHJvcG9zYWwpID0+ICFpZHMuaW5jbHVkZXMocHJvcG9zYWwuaWQpKSB9KVxuICAgIGF3YWl0IGxvYWRNZW1vcmllcygpXG4gIH1cblxuICAvKiogXHU4QkIwXHU1RkM2XHU3MkI2XHU2MDAxXHU2NENEXHU0RjVDXHVGRjA4XHU1RjUyXHU2ODYzL1x1NjA2Mlx1NTkwRFx1RkYwOVx1NEUwRVx1NTIwNlx1NjUyRlx1NUY1Mlx1NEUwMFx1MzAwMiAqL1xuICBjb25zdCBtZW1vcnlBY3Rpb24gPSBhc3luYyAocGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeS8nICsgcGF0aCwgYm9keSlcbiAgICBpZiAob2spIGF3YWl0IGxvYWRNZW1vcmllcygpXG4gICAgZWxzZSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gIH1cblxuICAvKiogXHU4QkIwXHU1RkM2XHU4RjZDXHU3QjE0XHU4QkIwXHVGRjFBXHU1RjE1XHU3NTI4XHU4RkRCXHU1QjY2XHU0RTYwXHU2ODYzXHU2ODQ4XHUzMDAyICovXG4gIGNvbnN0IG1lbW9yeVRvTm90ZSA9IGFzeW5jIChtZW1vcnk6IE1lbW9yeUVudHJ5KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMnLCB7XG4gICAgICB0aXRsZTogbWVtb3J5LnRpdGxlLFxuICAgICAgY29udGVudDogbWVtb3J5LmNvbnRlbnQgKyAobWVtb3J5LmJhc2lzU2hhICE9PSBudWxsID8gYFxcblx1RkYwOFx1Njc2NVx1NkU5MFx1RkYxQVx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNiAke21lbW9yeS5iYXNpc1NoYS5zbGljZSgwLCA4KX1cdUZGMDlgIDogJycpLFxuICAgICAgdGFnczogJ1x1OEJCMFx1NUZDNiwgJyArIG1lbW9yeS50eXBlLFxuICAgIH0pXG4gICAgaWYgKG9rKSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTYyOEFcdThCQjBcdTVGQzZcdThGNkNcdTRFM0FcdTdCMTRcdThCQjAnKVxuICB9XG5cbiAgLy8gXHU0RjFBXHU4QkREXHU2MjUzXHU1RjAwL1x1NTIwN1x1NjM2Mlx1NjVGNlx1NUI5OFx1NjVCOVx1NEYxQSBjbG9zZURldGFpbHMgXHU2NTM2XHU4RDc3XHU4RjY4XHU5MDUzXHVGRjFCXHU3NzBCXHU5NUU4XHU3MkQ3XHU2QkNGIDUwMG1zIFx1NjhDMFx1NjdFNVx1RkYwQ1xuICAvLyBcdTUzRUFcdTg5ODFcdTVGNTNcdTUyNERcdTY3MDlcdTRGMUFcdThCRERcdTgwMENcdTVERTVcdTRGNUNcdTUzRjBcdTUyMTdcdTVCQkQgPCA1MHB4IFx1NUMzMVx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1RkYwOFx1Nzg2RVx1NUI5QVx1NjAyN1x1RkYwQ1x1NEUwRFx1NEY5RFx1OEQ1NiBlZmZlY3QgXHU2NUY2XHU1RThGXHVGRjA5XHUzMDAyXG4gIC8vIFx1NTQwQ1x1NEUwMFx1NjJDRFx1N0VGNFx1NjMwMVx1N0VERlx1OEJBMVx1ODg0Q1x1OTRCM1x1NTIzNlx1RkYxQVx1NEYxQVx1OEJERFx1NTIwN1x1NjM2Mlx1NEYxQVx1NjM2Mlx1NjM4OVx1N0VERlx1OEJBMVx1ODg0QyBET01cdUZGMENcdTY4MzdcdTVGMEZcdTg4NjhcdTdGM0FcdTU5MzFcdTY1RjZcdTYzMDlcdTVGNTNcdTUyNERcbiAgLy8gXHU2Nzg0XHU1RUZBXHU1NEM4XHU1RTBDXHU5MUNEXHU2Q0U4XHU1MTY1XHVGRjA4XHU1RTQyXHU3QjQ5XHVGRjBDXHU1REYyXHU1QjU4XHU1NzI4XHU1MjE5XHU4REYzXHU4RkM3XHVGRjA5XHUzMDAyXG4gIGNvbnN0IGxheW91dEZhY2UgPSAocHJvcHMgYXMgdW5rbm93biBhcyB7IGxheW91dD86IHsgb3BlbkRldGFpbHM/OiAoKSA9PiB2b2lkIH0gfSkubGF5b3V0XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLmxheW91dE1vZGUgPT09ICdvdmVybGF5JykgcmV0dXJuXG4gICAgYXBwbHlTdGF0c0xpbmVDbGFtcCgpXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BjLXN0YXRzLWNsYW1wJykgPT09IG51bGwpIGFwcGx5U3RhdHNMaW5lQ2xhbXAoKVxuICAgICAgY29uc3QgY2hhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0nKVxuICAgICAgY29uc3Qgd2lkdGggPSBjaGF0ID8gTWF0aC5yb3VuZChjaGF0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSA6IC0xXG4gICAgICBpZiAod2lkdGggIT09IC0xICYmIHdpZHRoIDwgNTApIGxheW91dEZhY2U/Lm9wZW5EZXRhaWxzPy4oKVxuICAgIH0sIDUwMClcbiAgICByZXR1cm4gKCkgPT4geyBjbGVhckludGVydmFsKHRpbWVyKSB9XG4gIH0sIFtwcm9wcy5zZXNzaW9uSWQsIHByb3BzLmxheW91dE1vZGUsIGxheW91dEZhY2VdKVxuXG4gIC8qKiBcdTRFRTUgaW1wb3J0YW50IFx1NTE4NVx1ODA1NFx1NjgzN1x1NUYwRlx1NzZGNFx1NjNBNVx1NTE5OVx1NUI5OFx1NjVCOVx1N0Y1MVx1NjgzQ1x1NkEyMVx1Njc3Rlx1RkYwOFx1NjcwMFx1OUFEOFx1NEYxOFx1NTE0OFx1N0VBN1x1RkYwQ1x1NEVGQlx1NEY1NVx1OTFDRFx1NkUzMlx1NjdEM1x1NEUwRFx1NEYxQVx1ODk4Nlx1NzZENlx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBmcmFtZVRlbXBsYXRlU2V0ID0gKGNoYXRQeDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJzaWRlYmFyQ29sXCJdJylcbiAgICBjb25zdCBzaWRlYmFyVyA9IHNpZGViYXIgPyBNYXRoLm1heCg1NiwgTWF0aC5yb3VuZChzaWRlYmFyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSkgOiAyODBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdJylcbiAgICAgID8uc3R5bGUuc2V0UHJvcGVydHkoJ2dyaWQtdGVtcGxhdGUtY29sdW1ucycsIHNpZGViYXJXICsgJ3B4IG1pbm1heCgwLCAxZnIpICcgKyBjaGF0UHggKyAncHgnLCAnaW1wb3J0YW50JylcbiAgfVxuXG4gIC8qKiBcdTY1MzZcdThENzdcdTYwMDFcdTZBMjFcdTY3N0ZcdUZGMUFcdTdCMkNcdTRFMDlcdTUyMTdcdUZGMDhcdTVCOThcdTY1QjlcdThCRTZcdTYwQzVcdUZGMDkwcHhcdTIwMTRcdTIwMTRcdTVERTVcdTRGNUNcdTUzRjBcdTUxNzNcdTk1RURcdTU0MEVcdTUzRjNcdTRGQTdcdTUzRUFcdTUxNDFcdThCQjhcdTgwNEFcdTU5MjlcdUZGMDhcdTRFMUFcdTRFM0JcdTg5QzRcdTUyMTlcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgY29sbGFwc2VGcmFtZVRlbXBsYXRlID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwic2lkZWJhckNvbFwiXScpXG4gICAgY29uc3Qgc2lkZWJhclcgPSBzaWRlYmFyID8gTWF0aC5tYXgoNTYsIE1hdGgucm91bmQoc2lkZWJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkpIDogMjgwXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXScpXG4gICAgICA/LnN0eWxlLnNldFByb3BlcnR5KCdncmlkLXRlbXBsYXRlLWNvbHVtbnMnLCBzaWRlYmFyVyArICdweCBtaW5tYXgoMCwgMWZyKSAwcHgnLCAnaW1wb3J0YW50JylcbiAgfVxuXG4gIC8vIFx1ODA0QVx1NTkyOVx1NTIxN1x1NUJCRFx1OEJCMFx1NUZDNlx1RkYwOFx1NUI5OFx1NjVCOSBsYXlvdXQgc3RvcmUgXHU3N0FDXHU2MDAxXHVGRjA5XHVGRjFBXHU2MzAyXHU4RjdEXHU2MDYyXHU1OTBEICsgXHU2MkQ2XHU2MkZEXHU3NkY0XHU1MTk5XHU1MTg1XHU4MDU0XHU2QTIxXHU2NzdGXHUzMDAyXG4gIC8vIFx1NUZDNVx1OTg3Qlx1NTE5OSBpbXBvcnRhbnRcdTIwMTRcdTIwMTRMQVlPVVRfU1RZTEUgXHU3Njg0XHU2QTIxXHU2NzdGXHU4OUM0XHU1MjE5XHU0RTVGXHU2NjJGIGltcG9ydGFudFx1RkYwQ1x1OTc1RSBpbXBvcnRhbnRcbiAgLy8gXHU1MTg1XHU4MDU0XHU0RjFBXHU4OEFCXHU1QjgzXHU1MzhCXHU1MjM2XHVGRjA4XHU4RkQ5XHU1QzMxXHU2NjJGXHU2QjY0XHU1MjREXCJcdTYyRDZcdTYyRkRcdTc1MUZcdTY1NDhcdTMwMDFcdTUyMzdcdTY1QjBcdTU0MEVcdThCQjBcdTVGQzZcdTRFMjJcdTU5MzFcIlx1NzY4NFx1NTM5Rlx1NTZFMFx1RkYwOVx1MzAwMlxuICAvLyBcdTVCOThcdTY1QjkgUmVhY3QgXHU5MUNEXHU2RTMyXHU2N0QzXHU0RjFBXHU2NTM5XHU1MTk5XHU1MTg1XHU4MDU0XHU2QTIxXHU2NzdGXHVGRjBDTXV0YXRpb25PYnNlcnZlciBcdTYzMDlcdTVGNTNcdTUyNERcdTUwM0NcdTVCODhcdTUzNkJcdTkxQ0RcdTUxOTlcbiAgLy8gXHVGRjA4XHU1MDNDXHU3NkY4XHU1NDBDXHU0RTBEXHU0RjFBXHU4OUU2XHU1M0QxXHU2NUIwXHU3Njg0IG11dGF0aW9uXHVGRjBDXHU2NUUwXHU1NkRFXHU3M0FGXHVGRjA5XHUzMDAyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLmxheW91dE1vZGUgPT09ICdvdmVybGF5JykgcmV0dXJuXG4gICAgY29uc3Qgc2F2ZWQgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BjLmNoYXRXaWR0aCcpID8/ICcnKVxuICAgIGNvbnN0IGFwcGx5ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgLy8gXHU2MzAyXHU4RjdEL1x1NUI5OFx1NjVCOVx1OTFDRFx1NkUzMlx1NjdEM1x1NjVGNlx1NjVFMFx1Njc2MVx1NEVGNlx1NTkzQVx1NTZERVx1NkEyMVx1Njc3Rlx1RkYwOGltcG9ydGFudCBcdTg5ODZcdTUxOTlcdUZGMUJcdTUwM0NcdTc2RjhcdTU0MENcdTY1RjZcdTVCOThcdTY1QjlcdTY4MzdcdTVGMEZcdTUzRDhcdTY2RjRcbiAgICAgIC8vIFx1NEUwRFx1NEYxQVx1ODlFNlx1NTNEMVx1NjVCMFx1NzY4NCBtdXRhdGlvblx1RkYwQ1x1NjVFMFx1NTZERVx1NzNBRlx1RkYwOVx1MzAwMlx1NURFNVx1NEY1Q1x1NTNGMFx1NUYwMFx1Nzc0MCA9IFx1NTNGM1x1NTIxN1x1ODA0QVx1NTkyOVx1NTZGQVx1NUI5QVx1NUJCRFx1MzAwMlxuICAgICAgY29uc3QgY2hhdFcgPSBOdW1iZXIuaXNGaW5pdGUoc2F2ZWQpICYmIHNhdmVkID49IDI4MCA/IHNhdmVkIDogMzYwXG4gICAgICBmcmFtZVRlbXBsYXRlU2V0KGNoYXRXKVxuICAgIH1cbiAgICBhcHBseSgpXG4gICAgY29uc3QgZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdJylcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHsgYXBwbHkoKSB9KVxuICAgIGlmIChmcmFtZSAhPT0gbnVsbCkgb2JzZXJ2ZXIub2JzZXJ2ZShmcmFtZSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFsnc3R5bGUnXSB9KVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgIC8vIFx1NURFNVx1NEY1Q1x1NTNGMFx1NTM3OFx1OEY3RFx1RkYxQVx1NTE5OVx1NTE2NVx1NjUzNlx1OEQ3N1x1NjAwMVx1NkEyMVx1Njc3Rlx1RkYwOFx1N0IyQ1x1NEUwOVx1NTIxNyAwcHhcdUZGMDlcdTIwMTRcdTIwMTRcdTRFMUFcdTRFM0JcdTg5QzRcdTUyMTlcdUZGMUFcdTVERTVcdTRGNUNcdTUzRjBcdTUxNzMgXHUyMTkyIFx1NTNGM1x1NEZBN1x1NTNFQVx1NTE0MVx1OEJCOFxuICAgICAgLy8gXHU4MDRBXHU1OTI5XHUzMDAyXHU0RTBEXHU4MEZEXHU1MjIwXHU5NjY0XHU1MTg1XHU4MDU0XHU1QzVFXHU2MDI3XHVGRjA4XHU1Qjk4XHU2NUI5IFJlYWN0IFx1NEUwRFx1NEYxQVx1NEUzQlx1NTJBOFx1ODg2NVx1NTE5OVx1RkYwQ1x1NEYxQVx1NUJGQ1x1ODFGNFx1NEUzQlx1NTMzQVx1N0E3QVx1NzY3RFx1RkYwOVx1RkYxQlxuICAgICAgLy8gXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHU4NjdEXHU1NkRFXHU1MjMwXHU4QkU1XHU1MjE3XHU0RjQ2IDAgXHU1QkJEXHU0RTBEXHU1M0VGXHU4OUMxXHVGRjA4MC4xLjIgXHU1QjlFXHU2RDRCXHU1NkRFXHU1RjUyXHVGRjA5XHUzMDAyXG4gICAgICBjb2xsYXBzZUZyYW1lVGVtcGxhdGUoKVxuICAgIH1cbiAgfSwgW3Byb3BzLmxheW91dE1vZGVdKVxuXG4gIC8qKiBcdTUyMDZcdTk2OTRcdTY3NjFcdTYyRDZcdTYyRkRcdUZGMUFcdThDMDNcdTY1NzRcdTgwNEFcdTU5MjlcdTUyMTdcdTVCQkRcdUZGMDhcdTVERTVcdTRGNUNcdTUzRjBcdTU0MzhcdTY1MzZcdTUyNjlcdTRGNTlcdTdBN0FcdTk1RjRcdUZGMDlcdUZGMENcdTUxOTlcdTUxNjUgbG9jYWxTdG9yYWdlIFx1OEJCMFx1NUZDNlx1MzAwMiAqL1xuICBjb25zdCBvbkRpdmlkZXJEb3duID0gKGU6IFJlYWN0LlBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IG9uTW92ZSA9IChldjogUG9pbnRlckV2ZW50KTogdm9pZCA9PiB7XG4gICAgICBjb25zdCB3aWR0aCA9IE1hdGgubWluKDkwMCwgTWF0aC5tYXgoMjgwLCB3aW5kb3cuaW5uZXJXaWR0aCAtIGV2LmNsaWVudFgpKVxuICAgICAgZnJhbWVUZW1wbGF0ZVNldCh3aWR0aClcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYy5jaGF0V2lkdGgnLCBTdHJpbmcod2lkdGgpKVxuICAgIH1cbiAgICBjb25zdCBvblVwID0gKCk6IHZvaWQgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApXG4gICAgfVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcClcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGRpc3Bvc2VkID0gZmFsc2VcbiAgICBsZXQgZ2VuZXJhdGlvbiA9IDBcbiAgICBjb25zdCBsb2FkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgY29uc3QgcmVxdWVzdCA9ICsrZ2VuZXJhdGlvblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvc3RhdGU/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSwgeyBoZWFkZXJzOiB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0gfSlcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApXG4gICAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgICAgaWYgKCFkaXNwb3NlZCAmJiByZXF1ZXN0ID09PSBnZW5lcmF0aW9uKSB7XG4gICAgICAgICAgc2V0U3RhdGUoZGF0YSBhcyBXb3Jrc3BhY2VTdGF0ZSlcbiAgICAgICAgICBzZXRMb2FkRXJyb3IobnVsbClcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgICAgaWYgKCFkaXNwb3NlZCAmJiByZXF1ZXN0ID09PSBnZW5lcmF0aW9uKSBzZXRMb2FkRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgICAgfVxuICAgIH1cbiAgICB2b2lkIGxvYWQoKVxuICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB2b2lkIGxvYWQoKSB9LCA0MDAwKVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkaXNwb3NlZCA9IHRydWVcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgfVxuICB9LCBbcHJvcHMuc2Vzc2lvbklkXSlcblxuICAvLyBcdThGREJcdTUxNjVcdTYzRDBcdTRFQTQvXHU3QjE0XHU4QkIwL1JldmlldyBcdTk4NzVcdTdCN0VcdTY1RjZcdTYzMDlcdTk3MDBcdTYyQzlcdTUzRDZcdUZGMDhcdTYzRDBcdTRFQTRcdTUyMTdcdTg4NjhcdTRGOURcdThENTZcdTRGMUFcdThCRERcdTVERTVcdTRGNUNcdTUzM0FcdUZGMENcdThGNkVcdThCRTJcdTY1RTBcdTYxMEZcdTRFNDlcdUZGMDlcdTMwMDJcbiAgLy8gXHU2M0QwXHU0RUE0XHU5ODc1XHU0RTVGXHU2MkM5XHU3QjE0XHU4QkIwXHVGRjFBXHU4RjZFXHU2QjIxXHU2NzJBXHU2RDg4XHU1MzE2XHU2ODA3XHU4QkIwXHU5NzAwXHU4OTgxXHUzMDBDXHU0RTBBXHU2QjIxIEFJIFx1NjAzQlx1N0VEM1x1NjVGNlx1OTVGNFx1MzAwRFx1MzAwMlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0YWIgPT09ICdjb21taXRzJykgeyB2b2lkIGxvYWRDb21taXRzKCk7IHZvaWQgbG9hZE5vdGVzKCkgfVxuICAgIGlmICh0YWIgPT09ICdub3RlcycpIHsgdm9pZCBsb2FkTm90ZXMoKTsgdm9pZCBsb2FkTWVtb3JpZXMoKTsgaWYgKGNvbW1pdHNEYXRhID09PSBudWxsKSB2b2lkIGxvYWRDb21taXRzKCkgfVxuICAgIGlmICh0YWIgPT09ICdyZXZpZXcnKSB2b2lkIGxvYWRJc3N1ZXMoKVxuICAgIGlmICh0YWIgPT09ICdleGVjdXRpb24nKSB7IHZvaWQgbG9hZFNjaGVkdWxlZCgpOyBpZiAocnVuRGV0YWlsICE9PSBudWxsKSB2b2lkIGxvYWRSdW5EZXRhaWwocnVuRGV0YWlsLnJ1bi5pZCkgfVxuICAgIGlmICh0YWIgPT09ICdzZXR0aW5ncycgJiYgbW9kZWxUaWVycyA9PT0gbnVsbCkgdm9pZCBsb2FkTW9kZWxDb25maWcoKVxuICB9LCBbdGFiLCBwcm9wcy5zZXNzaW9uSWRdKVxuXG4gIGNvbnN0IGxvYWRNb2RlbENvbmZpZyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbW9kZWwtY29uZmlnJylcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHJldHVyblxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgc2V0TW9kZWxUaWVycygoZGF0YSBhcyB7IHRpZXJzOiBSZWNvcmQ8c3RyaW5nLCB7IHByb3ZpZGVyOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmcgfT4gfSkudGllcnMgPz8ge30pXG4gICAgICBzZXRNb2RlbE9wdGlvbnMoKGRhdGEgYXMgeyBvcHRpb25zOiBBcnJheTx7IHByb3ZpZGVyOiBzdHJpbmc7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZyB9PiB9KS5vcHRpb25zID8/IFtdKVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gXHU2QTIxXHU1NzhCXHU5MTREXHU3RjZFXHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc2F2ZU1vZGVsQ29uZmlnID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChtb2RlbFRpZXJzID09PSBudWxsKSByZXR1cm5cbiAgICBzZXRNb2RlbFNhdmluZyh0cnVlKVxuICAgIHNldE1vZGVsU2F2ZWQoZmFsc2UpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21vZGVsLWNvbmZpZycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHRpZXJzOiBtb2RlbFRpZXJzIH0pLFxuICAgICAgfSlcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICBzZXRNb2RlbFNhdmVkKHRydWUpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBzZXRNb2RlbFNhdmVkKGZhbHNlKSB9LCAyNTAwKVxuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRNb2RlbFNhdmluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCByZWZyZXNoU3RhdGUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgcmVmcmVzaGVkID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3N0YXRlP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJyksIHsgaGVhZGVyczogeyBhY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyB9IH0pXG4gICAgaWYgKHJlZnJlc2hlZC5vaykgc2V0U3RhdGUoYXdhaXQgcmVmcmVzaGVkLmpzb24oKSBhcyBXb3Jrc3BhY2VTdGF0ZSlcbiAgfVxuXG4gIC8qKiBcdTdFREZcdTRFMDBcdTUyQThcdTRGNUNcdTYyNjdcdTg4NENcdTU2NjhcdUZGMUFQT1NUIFx1NUJCRlx1NEUzQiBBUElcdUZGMDhcdTY0M0FcdTVFMjZcdTRGMUFcdThCREQgaWQgXHU0RjlCXHU2NzBEXHU1MkExXHU3QUVGXHU1QjlBXHU0RjREXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1MzNBXHVGRjA5XHVGRjBDXHU4RjkzXHU1MUZBXHU4RkRCXHU3RUQzXHU2NzlDXHU5NzYyXHU2NzdGXHVGRjBDXHU1QjhDXHU2MjEwXHU1NDBFXHU1MjM3XHU2NUIwXHU3MkI2XHU2MDAxXHUzMDAyICovXG4gIGNvbnN0IHJ1bkFjdGlvbiA9IGFzeW5jIChuYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgYm9keTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRCdXN5KG5hbWUpXG4gICAgc2V0QWN0aW9uUmVzdWx0KG51bGwpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QocGF0aCwgYm9keSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KGBcdTI3MTcgJHtTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKX1gKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldEFjdGlvblJlc3VsdChmb3JtYXRBY3Rpb25SZXN1bHQoZGF0YSkpXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoYFx1MjcxNyAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKX1gKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRCdXN5KG51bGwpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcnVuQm9vdHN0cmFwID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldEJvb3RzdHJhcHBpbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvYm9vdHN0cmFwJywge30pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldExvYWRFcnJvcihTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRMb2FkRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRCb290c3RyYXBwaW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbmZpcm1NZW1vcnkgPSBhc3luYyAobWVtb3J5SWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeS9jb25maXJtJywgeyBtZW1vcnlJZCB9KVxuICAgIGlmIChvaykge1xuICAgICAgc2V0U3RhdGUoKHByZXZpb3VzKSA9PiBwcmV2aW91cyA9PT0gbnVsbCA/IHByZXZpb3VzIDoge1xuICAgICAgICAuLi5wcmV2aW91cyxcbiAgICAgICAgbWVtb3JpZXM6IHByZXZpb3VzLm1lbW9yaWVzPy5tYXAoKG1lbW9yeSkgPT4gbWVtb3J5LmlkID09PSBtZW1vcnlJZCA/IHsgLi4ubWVtb3J5LCBpc0h1bWFuQ29uZmlybWVkOiB0cnVlLCB0cnV0aExldmVsOiAnZmFjdCcgfSA6IG1lbW9yeSksXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHByb2plY3QgPSBzdGF0ZT8ucHJvamVjdCA/PyBudWxsXG4gIGNvbnN0IGJvb3RzdHJhcCA9IHN0YXRlPy5ib290c3RyYXAgPz8gbnVsbFxuICBjb25zdCBjaGFuZ2VzID0gc3RhdGU/LmNoYW5nZXMgPz8gW11cbiAgY29uc3QgcnVucyA9IHN0YXRlPy5ydW5zID8/IFtdXG4gIGNvbnN0IHZlcmlmaWNhdGlvbnMgPSBzdGF0ZT8udmVyaWZpY2F0aW9ucyA/PyBbXVxuICBjb25zdCBjb25maXJtZWQgPSBzdGF0ZT8uY29uZmlybWVkID8/IFtdXG4gIGNvbnN0IGNvbmNlcHRzID0gc3RhdGU/LmNvbmNlcHRzID8/IFtdXG5cbiAgY29uc3QgdGFiczogQXJyYXk8eyBrZXk6IFRhYktleTsgbGFiZWw6IHN0cmluZyB9PiA9IFtcbiAgICB7IGtleTogJ2NvbW1pdHMnLCBsYWJlbDogdCgndGFiLmNvbW1pdHMnKSB9LFxuICAgIHsga2V5OiAnb3ZlcnZpZXcnLCBsYWJlbDogdCgndGFiLm92ZXJ2aWV3JykgfSxcbiAgICB7IGtleTogJ2V4ZWN1dGlvbicsIGxhYmVsOiB0KCd0YWIuZXhlY3V0aW9uJykgfSxcbiAgICB7IGtleTogJ3JldmlldycsIGxhYmVsOiB0KCd0YWIucmV2aWV3JykgfSxcbiAgICB7IGtleTogJ25vdGVzJywgbGFiZWw6IHQoJ3RhYi5ub3RlcycpIH0sXG4gICAgeyBrZXk6ICdzZXR0aW5ncycsIGxhYmVsOiB0KCd0YWIuc2V0dGluZ3MnKSB9LFxuICBdXG5cbiAgLyoqIFx1NjRDRFx1NEY1Q1x1N0VEM1x1Njc5Q1x1OTc2Mlx1Njc3Rlx1RkYwOFx1NjAzQlx1ODlDOFx1OTg3NVx1N0I3RVx1NzY4NFx1NUZFQlx1NjM3N1x1NTJBOFx1NEY1Q1x1NTE3MVx1NzUyOFx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCByZXN1bHRQYW5lbCA9IGFjdGlvblJlc3VsdCAhPT0gbnVsbFxuICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChDYXJkLCB7IHRpdGxlOiB0KCdyZXN1bHQucGFuZWwnKSB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiBzdHlsZXMucmVzdWx0IH0sIGFjdGlvblJlc3VsdCkpXG4gICAgOiBudWxsXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTk4NzVcdTdCN0UgXHUyNTAwXHUyNTAwXG4gIC8vIFx1OTg3Nlx1OTBFOFx1RkYxQVx1NEVEM1x1NUU5M1x1NjgwRiArIFx1NjNEMFx1NEVBNFx1NTkxQVx1OTAwOVx1NEUwQlx1NjJDOVx1RkYwOFx1N0VBNiAxLzUgXHU5QUQ4XHU1RUE2XHVGRjA5XHVGRjFCXHU0RTBCXHU2NUI5XHU2NzdGXHU1NzU3XHU1MzYwXHU1MTY4XHU1QkJEXHUzMDAyXG4gIGNvbnN0IGFsbFRhcmdldHM6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IG1ldGE6IHN0cmluZzsgc2hhOiBzdHJpbmcgfT4gPSBbXVxuICBpZiAoY29tbWl0c0RhdGEgIT09IG51bGwpIHtcbiAgICBpZiAoIWNvbW1pdHNEYXRhLndvcmtpbmcuaXNDbGVhbikge1xuICAgICAgYWxsVGFyZ2V0cy5wdXNoKHtcbiAgICAgICAga2V5OiAnd29ya2luZycsXG4gICAgICAgIGxhYmVsOiBgXHUyNUNGICR7dCgncmVwby53b3JraW5nJyl9XHVGRjA4JHtjb21taXRzRGF0YS53b3JraW5nLmZpbGVDb3VudH1cdUZGMDlgLFxuICAgICAgICBtZXRhOiBjb21taXRzRGF0YS53b3JraW5nLmZpbGVzLnNsaWNlKDAsIDMpLm1hcCgoZmlsZSkgPT4gZmlsZS5wYXRoLnNwbGl0KCcvJykucG9wKCkpLmpvaW4oJywgJyksXG4gICAgICAgIHNoYTogJ3dvcmtpbmcnLFxuICAgICAgfSlcbiAgICB9XG4gICAgZm9yIChjb25zdCBjb21taXQgb2YgY29tbWl0c0RhdGEuY29tbWl0cykge1xuICAgICAgY29uc3QgYWRkcyA9IGNvbW1pdC5maWxlcy5yZWR1Y2UoKHN1bSwgZmlsZSkgPT4gc3VtICsgZmlsZS5hZGRzLCAwKVxuICAgICAgY29uc3QgZGVscyA9IGNvbW1pdC5maWxlcy5yZWR1Y2UoKHN1bSwgZmlsZSkgPT4gc3VtICsgZmlsZS5kZWxzLCAwKVxuICAgICAgYWxsVGFyZ2V0cy5wdXNoKHtcbiAgICAgICAga2V5OiBjb21taXQuc2hhLFxuICAgICAgICBsYWJlbDogY29tbWl0LnN1YmplY3QsXG4gICAgICAgIG1ldGE6IGAke2NvbW1pdC5zaG9ydEhhc2h9IFx1MDBCNyAke2NvbW1pdC5hdXRob3J9IFx1MDBCNyAke25ldyBEYXRlKGNvbW1pdC5kYXRlKS50b0xvY2FsZVN0cmluZygpfSBcdTAwQjcgKyR7YWRkc30vLSR7ZGVsc31gLFxuICAgICAgICBzaGE6IGNvbW1pdC5zaGEsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBjb25zdCBzaG9ydExhYmVsID0gKHNoYTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBpZiAoc2hhID09PSAnd29ya2luZycpIHJldHVybiB0KCdyZXBvLndvcmtpbmcnKVxuICAgIGNvbnN0IHRhcmdldCA9IGFsbFRhcmdldHMuZmluZCgoZW50cnkpID0+IGVudHJ5LnNoYSA9PT0gc2hhKVxuICAgIHJldHVybiBgJHsodGFyZ2V0Py5tZXRhLnNwbGl0KCcgXHUwMEI3ICcpWzBdKSA/PyBzaGEuc2xpY2UoMCwgNyl9ICR7dGFyZ2V0Py5sYWJlbCA/PyAnJ31gLnRyaW0oKVxuICB9XG4gIGNvbnN0IGZpbHRlcmVkVGFyZ2V0cyA9IHBpY2tlckZpbHRlci50cmltKCkgPT09ICcnXG4gICAgPyBhbGxUYXJnZXRzXG4gICAgOiBhbGxUYXJnZXRzLmZpbHRlcigoZW50cnkpID0+IChlbnRyeS5sYWJlbCArIGVudHJ5Lm1ldGEpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocGlja2VyRmlsdGVyLnRyaW0oKS50b0xvd2VyQ2FzZSgpKSlcblxuICAvLyBcdTI1MDBcdTI1MDAgXHU4RjZFXHU2QjIxXHU4MDVBXHU3QzdCXHU0RTBFXHU2NzJBXHU2RDg4XHU1MzE2XHU2ODA3XHU4QkIwIFx1MjUwMFx1MjUwMCBcdTgwNUFcdTdDN0JcdTg5QzRcdTUyMTlcdTRFMEVcdTY3MERcdTUyQTFcdTdBRUYgY2x1c3RlckNvbW1pdHMgXHU0RTAwXHU4MUY0XHVGRjA4XHU2NUY2XHU5NUY0XHU3QTk3XHU1M0UzICtcbiAgLy8gXHU2NTg3XHU0RUY2XHU5NkY2XHU5MUNEXHU1M0UwXHVGRjBDXHU4OUMxIGNvbW1pdC1yb3VuZHMudHNcdUZGMDlcdUZGMUJcdTY3MkFcdTZEODhcdTUzMTYgPSBcdTRFMEFcdTZCMjEgQUkgXHU2MDNCXHU3RUQzXHU0RTRCXHU1NDBFXHU3Njg0XHU2M0QwXHU0RUE0XHUzMDAyXG4gIGNvbnN0IGNvbW1pdEJ5U2hhID0gbmV3IE1hcCgoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLm1hcCgoY29tbWl0KSA9PiBbY29tbWl0LnNoYSwgY29tbWl0XSkpXG4gIGNvbnN0IGxhc3RTdW1tYXJ5QXQgPSBub3Rlc1xuICAgIC5maWx0ZXIoKG5vdGUpID0+IG5vdGUuc2hhID09PSAnc3VtbWFyeScpXG4gICAgLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiByaWdodC5jcmVhdGVkQXQgLSBsZWZ0LmNyZWF0ZWRBdClbMF0/LmNyZWF0ZWRBdFxuICBjb25zdCBpc1VuZGlnZXN0ZWQgPSAoZGF0ZTogbnVtYmVyKTogYm9vbGVhbiA9PiBsYXN0U3VtbWFyeUF0ID09PSB1bmRlZmluZWQgfHwgZGF0ZSA+IGxhc3RTdW1tYXJ5QXRcbiAgY29uc3QgdW5kaWdlc3RlZENvdW50ID0gKGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKS5maWx0ZXIoKGNvbW1pdCkgPT4gaXNVbmRpZ2VzdGVkKGNvbW1pdC5kYXRlKSkubGVuZ3RoXG4gIGNvbnN0IGNvbW1pdFJvdW5kcyA9IGNsdXN0ZXJJbnRvUm91bmRzKGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKVxuXG4gIC8qKiBcdTRFMEJcdTYyQzlcdTY4NDZcdTc2ODRcdTYzRDBcdTRFQTRcdTg4NENcdUZGMDhcdTU0MkJcdTY3MkFcdTZEODhcdTUzMTZcdTU3MDZcdTcwQjlcdUZGMUJ3b3JraW5nIFx1Njc2MVx1NzZFRVx1NEUwRFx1NjgwN1x1RkYwOVx1MzAwMiAqL1xuICBjb25zdCByZW5kZXJQaWNrZXJSb3cgPSAoZW50cnk6IHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IG1ldGE6IHN0cmluZzsgc2hhOiBzdHJpbmcgfSk6IFJlYWN0LlJlYWN0Tm9kZSA9PiB7XG4gICAgY29uc3QgY29tbWl0ID0gY29tbWl0QnlTaGEuZ2V0KGVudHJ5LnNoYSlcbiAgICBjb25zdCB1bmRpZ2VzdGVkID0gY29tbWl0ICE9PSB1bmRlZmluZWQgJiYgaXNVbmRpZ2VzdGVkKGNvbW1pdC5kYXRlKVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGtleT17ZW50cnkua2V5fVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBhZGRpbmc6ICc3cHggMTJweCcsIGN1cnNvcjogJ3BvaW50ZXInLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgIGJhY2tncm91bmQ6IHNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhlbnRyeS5zaGEpID8gJ3JnYmEoMzcsOTksMjM1LDAuMDcpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgIH19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCB0b2dnbGVUYXJnZXQoZW50cnkuc2hhKSB9fVxuICAgICAgPlxuICAgICAgICA8c3BhbiBzdHlsZT17eyB3aWR0aDogJzE0cHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsIGZvbnRXZWlnaHQ6IDcwMCB9fT5cbiAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKGVudHJ5LnNoYSkgPyAnXHUyNzEzJyA6ICcnfVxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIHt1bmRpZ2VzdGVkICYmIChcbiAgICAgICAgICA8c3BhbiB0aXRsZT17dCgncGlja2VyLnVuZGlnZXN0ZWQnKX0gc3R5bGU9e3sgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JyksIGZvbnRTaXplOiAnMTBweCcsIGZsZXhTaHJpbms6IDAgfX0+XHUyNUNGPC9zcGFuPlxuICAgICAgICApfVxuICAgICAgICA8c3BhbiBzdHlsZT17eyBtaW5XaWR0aDogMCB9fT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT57ZW50cnkubGFiZWx9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PntlbnRyeS5tZXRhfTwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgY29uc3QgaW1wYWN0Umlza0NvbG9yID0gdGhlbWVBd2FyZVRleHQoaW1wYWN0ID09PSBudWxsID8gJyM1NzYwNmEnIDogKFJJU0tfQ09MT1JbaW1wYWN0LnJpc2tMZXZlbF0gPz8gJyM1NzYwNmEnKSlcblxuICBjb25zdCBjb21taXRzVGFiID0gKFxuICAgIDw+XG4gICAgICB7LyogXHU0RUQzXHU1RTkzXHU2ODBGICovfVxuICAgICAgPENhcmQ+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9Pntjb21taXRzRGF0YT8uYnJhbmNoID8/ICdcdTIwMTQnfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnIH19Pntjb21taXRzRGF0YT8ucm9vdFBhdGggPz8gcHJvamVjdD8ucm9vdFBhdGggPz8gJ1x1MjAxNCd9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZENvbW1pdHMoKSB9fT57dCgnYWN0aW9uLnJlZnJlc2gnKX08L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtidXN5ICE9PSBudWxsfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignc2Nhbkhpc3RvcnknLCAnL3Byb2plY3QtY29udHJvbC9hcGkvYm9vdHN0cmFwJywgeyBpbmNsdWRlSGlzdG9yeTogdHJ1ZSwgc3VtbWFyaXplOiB0cnVlLCBtYXhDb21taXRzOiAzMCB9KSB9fVxuICAgICAgICAgID57YnVzeSA9PT0gJ3NjYW5IaXN0b3J5JyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdyZXBvLnNjYW5IaXN0b3J5Jyl9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9DYXJkPlxuICAgICAgey8qIFx1NjNEMFx1NEVBNFx1NTkxQVx1OTAwOVx1NEUwQlx1NjJDOVx1RkYwOFx1N0QyN1x1NTFEMVx1RkYxQlx1OTAwOVx1NEUyRFx1NTE4NVx1NUJCOVx1NUI4Q1x1NjU3NFx1NUM1NVx1NzkzQVx1RkYwQ1x1NTE0MVx1OEJCOFx1ODFFQVx1NzEzNlx1NjM2Mlx1ODg0Q1x1RkYwOSAqL31cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdwaWNrZXIudGl0bGUnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgd2lkdGg6ICcxMDAlJywgdGV4dEFsaWduOiAnbGVmdCcsIGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCB3aGl0ZVNwYWNlOiAnbm9ybWFsJyB9fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRQaWNrZXJPcGVuKCFwaWNrZXJPcGVuKSB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1pbldpZHRoOiAwIH19PlxuICAgICAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgICAgID8gdCgncGlja2VyLnBsYWNlaG9sZGVyJylcbiAgICAgICAgICAgICAgICA6IGAke3QoJ3BpY2tlci5zZWxlY3RlZCcpfSAke3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGh9XHVGRjFBJHtzZWxlY3RlZFRhcmdldHMubWFwKHNob3J0TGFiZWwpLmpvaW4oJ1x1RkYxQicpfWB9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAnOHB4JywgZmxleFNocmluazogMCB9fT5cdTI1QkU8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAge3BpY2tlck9wZW4gJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIHpJbmRleDogMjkgfX0gb25DbGljaz17KCkgPT4geyBzZXRQaWNrZXJPcGVuKGZhbHNlKSB9fSAvPlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJ2NhbGMoMTAwJSArIDRweCknLCBsZWZ0OiAwLCByaWdodDogMCwgekluZGV4OiAzMCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLCBib3hTaGFkb3c6ICcwIDhweCAyNHB4IHJnYmEoMCwwLDAsMC4xMiknLCBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzhweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLmlucHV0fVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dCgncGlja2VyLmZpbHRlcicpfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cGlja2VyRmlsdGVyfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0UGlja2VyRmlsdGVyKGUudGFyZ2V0LnZhbHVlKSB9fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgc2V0U2VsZWN0ZWRUYXJnZXRzKFtdKSB9fT57dCgncGlja2VyLmNsZWFyJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXhIZWlnaHQ6IDQyMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XG4gICAgICAgICAgICAgICAgICB7cGlja2VyRmlsdGVyLnRyaW0oKSA9PT0gJycgPyAoXG4gICAgICAgICAgICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gXHU2RDRGXHU4OUM4XHU4OUM2XHU1NkZFXHVGRjFBd29ya2luZyBcdTY3NjFcdTc2RUUgKyBcdTYzMDlcdThGNkVcdTZCMjFcdTUyMDZcdTdFQzRcdTc2ODRcdTYzRDBcdTRFQTRcdUZGMDhcdTUzNTVcdTYzRDBcdTRFQTRcdThGNkVcdTRFMERcdTY2M0VcdTc5M0FcdTdFQzRcdTU5MzRcdUZGMENcdTkwN0ZcdTUxNERcdTU2NkFcdTk3RjNcdUZGMDlcdTMwMDJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlczogUmVhY3QuUmVhY3ROb2RlW10gPSBbXVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtpbmcgPSBhbGxUYXJnZXRzLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5zaGEgPT09ICd3b3JraW5nJylcbiAgICAgICAgICAgICAgICAgICAgICBpZiAod29ya2luZyAhPT0gdW5kZWZpbmVkKSBub2Rlcy5wdXNoKHJlbmRlclBpY2tlclJvdyh3b3JraW5nKSlcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBieVNoYSA9IG5ldyBNYXAoYWxsVGFyZ2V0cy5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5zaGEgIT09ICd3b3JraW5nJykubWFwKChlbnRyeSkgPT4gW2VudHJ5LnNoYSwgZW50cnldKSlcbiAgICAgICAgICAgICAgICAgICAgICBjb21taXRSb3VuZHMuZm9yRWFjaCgocm91bmQsIHJvdW5kSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudHJpZXMgPSByb3VuZC5jb21taXRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKGNvbW1pdCkgPT4gYnlTaGEuZ2V0KGNvbW1pdC5zaGEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IG1ldGE6IHN0cmluZzsgc2hhOiBzdHJpbmcgfSA9PiBlbnRyeSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJpZXMubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyaWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKHJlbmRlclBpY2tlclJvdyhlbnRyaWVzWzBdISkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hhcyA9IGVudHJpZXMubWFwKChlbnRyeSkgPT4gZW50cnkuc2hhKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsU2VsZWN0ZWQgPSBzaGFzLmV2ZXJ5KChzaGEpID0+IHNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhzaGEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2Byb3VuZC0ke3JvdW5kSW5kZXh9YH0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnOHB4JywgcGFkZGluZzogJzZweCAxMnB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwzLCByZ2JhKDUsNSw1LDAuMDYpKScsIGZvbnRTaXplOiAnMTFweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHVEODNEXHVEREQzIHt0KHJvdW5kSW5kZXggPT09IDAgPyAncGlja2VyLnJvdW5kTGF0ZXN0JyA6ICdwaWNrZXIucm91bmQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcocm91bmRJbmRleCArIDEpKX0gXHUwMEI3IHtTdHJpbmcoZW50cmllcy5sZW5ndGgpfSB7dCgncmVwby5jb21taXRzJyl9IFx1MDBCNyB7bmV3IERhdGUocm91bmQuZmlyc3RBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCl9XHUyMDEze25ldyBEYXRlKHJvdW5kLmxhc3RBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNlbGVjdFJvdW5kKHNoYXMpIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2FsbFNlbGVjdGVkID8gdCgncGlja2VyLnJvdW5kQ2xlYXInKSA6IHQoJ3BpY2tlci5yb3VuZFNlbGVjdCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4sXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIG5vZGVzLnB1c2gocmVuZGVyUGlja2VyUm93KGVudHJ5KSlcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2Rlc1xuICAgICAgICAgICAgICAgICAgICB9KSgpXG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZFRhcmdldHMubWFwKChlbnRyeSkgPT4gcmVuZGVyUGlja2VyUm93KGVudHJ5KSlcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7KHBpY2tlckZpbHRlci50cmltKCkgPT09ICcnID8gYWxsVGFyZ2V0cyA6IGZpbHRlcmVkVGFyZ2V0cykubGVuZ3RoID09PSAwICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3BpY2tlci5ub01hdGNoJyl9PC9kaXY+fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luVG9wOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ3BpY2tlci5oaW50Jyl9PC9zcGFuPlxuICAgICAgICAgIHt1bmRpZ2VzdGVkQ291bnQgPiAwICYmIChcbiAgICAgICAgICAgIDxzcGFuIHRpdGxlPXt0KCdwaWNrZXIudW5kaWdlc3RlZCcpfSBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSB9fT5cbiAgICAgICAgICAgICAgXHUyNUNGIHt0KCdwaWNrZXIudW5kaWdlc3RlZENvdW50JykucmVwbGFjZSgne259JywgU3RyaW5nKHVuZGlnZXN0ZWRDb3VudCkpfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICl9XG4gICAgICAgICAgeyhkZXRhaWxRdWV1ZWRDb3VudCA+IDAgfHwgZGV0YWlsUnVubmluZ0NvdW50ID4gMCkgJiYgKFxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnI2RjZGNhYScpfT5cbiAgICAgICAgICAgICAge2RldGFpbFJ1bm5pbmdDb3VudCA+IDAgPyB0KCdkZXRhaWwuYWlMb2FkaW5nJykgOiAnJ31cbiAgICAgICAgICAgICAge2RldGFpbFJ1bm5pbmdDb3VudCA+IDAgJiYgZGV0YWlsUXVldWVkQ291bnQgPiAwID8gJyAnIDogJyd9XG4gICAgICAgICAgICAgIHtkZXRhaWxRdWV1ZWRDb3VudCA+IDAgPyAnXHUyM0YzICcgKyB0KCdkZXRhaWwucXVldWVkJykucmVwbGFjZSgne259JywgU3RyaW5nKGRldGFpbFF1ZXVlZENvdW50KSkgOiAnJ31cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FyZD5cblxuICAgICAge2NvbW1pdHNFcnJvciAhPT0gbnVsbCAmJiA8Q2FyZD48ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXBvLmxvYWRGYWlsZWQnKX06IHtjb21taXRzRXJyb3J9PC9kaXY+PC9DYXJkPn1cbiAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwICYmIDxDYXJkPjxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2RldGFpbC5waWNrJyl9PC9kaXY+PC9DYXJkPn1cblxuICAgICAgey8qIFx1NURFNVx1NEY1Q1x1OEY2RVx1NkIyMVx1NTNEOVx1NEU4Qlx1RkYxQVx1NTkxQVx1NjNEMFx1NEVBNFx1NjU3NFx1NEY1M1x1ODlFM1x1OEJGQiAqL31cbiAgICAgIHtzZWxlY3RlZFRhcmdldHMuZmlsdGVyKCh0YXJnZXQpID0+IHRhcmdldCAhPT0gJ3dvcmtpbmcnKS5sZW5ndGggPj0gMiAmJiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXsnXHVEODNEXHVEQ0Q2ICcgKyB0KCduYXJyYXRpdmUudGl0bGUnKX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206IG5hcnJhdGl2ZSA9PT0gbnVsbCA/ICcwJyA6ICc4cHgnIH19PlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e25hcnJhdGl2ZUJ1c3l9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkTmFycmF0aXZlKCkgfX0+XG4gICAgICAgICAgICAgIHtuYXJyYXRpdmVCdXN5ID8gdCgnbmFycmF0aXZlLnJ1bm5pbmcnKSA6ICdcdTI3MjggJyArIHQoJ25hcnJhdGl2ZS5nZW5lcmF0ZScpfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICB7bmFycmF0aXZlICE9PSBudWxsICYmIG5hcnJhdGl2ZS5jYWNoZWQgJiYgKFxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnY2FjaGUuaGl0Jyl9e25hcnJhdGl2ZS5nZW5lcmF0ZWRBdCAhPT0gdW5kZWZpbmVkID8gJyBcdTAwQjcgJyArIG5ldyBEYXRlKG5hcnJhdGl2ZS5nZW5lcmF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKSA6ICcnfTwvc3Bhbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7bmFycmF0aXZlICE9PSBudWxsICYmIHJlbmRlckNvc3RCYWRnZShuYXJyYXRpdmUuY29zdFVzZCwgdCgnY29zdC50b29sdGlwJykpfVxuICAgICAgICAgICAge25hcnJhdGl2ZSAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IGRpc2FibGVkPXtuYXJyYXRpdmVCdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZE5hcnJhdGl2ZSh0cnVlKSB9fT57dCgnY2FjaGUucmVnZW5lcmF0ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge25hcnJhdGl2ZUVycm9yICE9PSAnJyAmJiA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5lbXB0eSwgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDEyNDJmJykgfX0+e25hcnJhdGl2ZUVycm9yfTwvZGl2Pn1cbiAgICAgICAgICB7bmFycmF0aXZlICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcgfX0+e3JlbmRlclN0cnVjdHVyZWRDb250ZW50KG5hcnJhdGl2ZS5uYXJyYXRpdmUpfTwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBcdTZCQ0ZcdTY3NjFcdTkwMDlcdTRFMkRcdTYzRDBcdTRFQTRcdTc2ODQgQUkgXHU4OUUzXHU4QkZCICovfVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5tYXAoKHRhcmdldCkgPT4ge1xuICAgICAgICBjb25zdCBkID0gZGV0YWlsc1t0YXJnZXRdXG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IChkPy5jb21taXQ/Lm1lc3NhZ2UgPz8gdGFyZ2V0LnNsaWNlKDAsIDgpKVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxDYXJkIGtleT17YGQtJHt0YXJnZXR9YH0gdGl0bGU9e2BcdUQ4M0RcdUREMEQgJHtsYWJlbH0ke3RhcmdldCAhPT0gJ3dvcmtpbmcnID8gYFx1RkYwOCR7dGFyZ2V0LnNsaWNlKDAsIDgpfVx1RkYwOWAgOiAnJ31gfT5cbiAgICAgICAgICAgIHtkICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAge2QuYW5hbHlzaXNDYWNoZWQgPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57dCgnY2FjaGUuaGl0Jyl9e2QuYW5hbHlzaXNHZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShkLmFuYWx5c2lzR2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7cmVuZGVyQ29zdEJhZGdlKGQuYW5hbHlzaXNDb3N0VXNkLCB0KCdjb3N0LnRvb2x0aXAnKSArIChkLmFuYWx5c2lzVG9rZW5zID8gYFx1RkYwOGluICR7ZC5hbmFseXNpc1Rva2Vucy5pbnB1dH0gLyBvdXQgJHtkLmFuYWx5c2lzVG9rZW5zLm91dHB1dH0gdG9rZW5zXHVGRjA5YCA6ICcnKSl9XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBsb2FkRGV0YWlsKHRhcmdldCwgdHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XG4gICAgICAgICAgICAgICAgICB0aXRsZT17dCgnZGV0YWlsLnNhdmVOb3RlSGludCcpfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGEgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/ICd3b3JraW5nJyA6IHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB2b2lkIHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzJywge1xuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBgJHt0KCdkZXRhaWwuc2F2ZU5vdGVUaXRsZScpfVx1RkYxQSR7KGQuY29tbWl0Py5tZXNzYWdlID8/IHRhcmdldCkuc2xpY2UoMCwgNjApfWAsXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDogW2BcdTMwMTBcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDhcdTMwMTFcXG4ke2QuYW5hbHlzaXMud2hhdH1gLCBgXHUzMDEwXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxXHUzMDExXFxuJHsoZC5hbmFseXNpcy5sb2dpYyA/PyBbXSkuam9pbignXHVGRjFCJyl9YCwgYFx1MzAxMFx1OThDRVx1OTY2OVx1NzBCOVx1MzAxMVxcbiR7KGQuYW5hbHlzaXMucmlza3MgPz8gW10pLmpvaW4oJ1x1RkYxQicpfWBdLmZpbHRlcigoYmxvY2spID0+ICFibG9jay5lbmRzV2l0aCgnXHUzMDExXFxuJykpLmpvaW4oJ1xcblxcbicpLFxuICAgICAgICAgICAgICAgICAgICAgIHNoYSwgdGFnczogJ1x1NjgzOFx1NjdFNScsXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHsgb2sgfSkgPT4geyBzZXRBY3Rpb25SZXN1bHQob2sgPyAnXHUyNzEzIFx1NURGMlx1NUI1OFx1NEUzQVx1N0IxNFx1OEJCMFx1RkYwOFx1N0IxNFx1OEJCMFx1OTg3NVx1NTNFRlx1NjdFNVx1NzcwQlx1RkYwOScgOiAnXHUyNzE3IFx1NEZERFx1NUI1OFx1NTkzMVx1OEQyNScpIDsgaWYgKG9rKSB2b2lkIGxvYWROb3RlcygpIH0pXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cdUQ4M0RcdURDQkUge3QoJ2RldGFpbC5zYXZlTm90ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ2RldGFpbC5zYXZlTWVtb3J5SGludCcpfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGEgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/IHVuZGVmaW5lZCA6IHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB2b2lkIHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeScsIHtcbiAgICAgICAgICAgICAgICAgICAgICBtZW1vcnlUeXBlOiAncmlza19ob3RzcG90Jywgc291cmNlVGFnOiAncmV2aWV3JywgYmFzaXNTaGE6IHNoYSxcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogYFx1NjgzOFx1NjdFNVx1N0VEM1x1OEJCQVx1RkYxQSR7KGQuY29tbWl0Py5tZXNzYWdlID8/IHRhcmdldCkuc2xpY2UoMCwgNjApfWAsXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDogW2QuYW5hbHlzaXMud2hhdCwgKGQuYW5hbHlzaXMucmlza3MgPz8gW10pLmpvaW4oJ1x1RkYxQicpXS5maWx0ZXIoKHBhcnQpID0+IHBhcnQgIT09ICcnKS5qb2luKCdcXG4tLS1cXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoeyBvayB9KSA9PiB7IHNldEFjdGlvblJlc3VsdChvayA/ICdcdTI3MTMgXHU1REYyXHU2Qzg5XHU2REMwXHU0RTNBXHU4QkIwXHU1RkM2XHVGRjA4XHU1Rjg1XHU3ODZFXHU4QkE0XHU5NjFGXHU1MjE3XHVGRjA5JyA6ICdcdTI3MTcgXHU0RkREXHU1QjU4XHU1OTMxXHU4RDI1Jyk7IGlmIChvaykgdm9pZCBsb2FkTWVtb3JpZXMoKSB9KVxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XHVEODNFXHVEREUwIHt0KCdkZXRhaWwuc2F2ZU1lbW9yeScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7ZCA9PT0gdW5kZWZpbmVkID8gKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9PntkZXRhaWxTdGF0dXNbdGFyZ2V0XSA9PT0gJ3F1ZXVlZCcgPyAnXHUyM0YzICcgKyB0KCdkZXRhaWwuY2FyZFF1ZXVlZCcpIDogdCgnZGV0YWlsLmFpTG9hZGluZycpfTwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7ZC5jb21taXQgIT09IG51bGwgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmNvbW1pdE1ldGF9PntkLmNvbW1pdC5hdXRob3J9IFx1MDBCNyB7bmV3IERhdGUoZC5jb21taXQuZGF0ZSkudG9Mb2NhbGVTdHJpbmcoKX0gXHUwMEI3IHtkLmZpbGVzLmxlbmd0aH0ge3QoJ2RldGFpbC5maWxlcycpfSBcdTAwQjcgK3tkLmluc2VydGlvbnN9Ly17ZC5kZWxldGlvbnN9PC9kaXY+fVxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLndoYXQgIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnOHB4JyB9fT57dCgnZGV0YWlsLndoYXQnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLndoYXR9PntkLmFuYWx5c2lzLndoYXR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLmxvZ2ljLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnNlY3Rpb25UaXRsZX0+e3QoJ2RldGFpbC5sb2dpYycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5sb2dpYy5tYXAoKHN0ZXAsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3N0eWxlcy5sb2dpY1N0ZXB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLCBmb250V2VpZ2h0OiA2MDAgfX0+e2kgKyAxfS48L3NwYW4+e3N0ZXB9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5yaXNrcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnNnB4JyB9fT57dCgnZGV0YWlsLnJpc2snKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2QuYW5hbHlzaXMucmlza3MubWFwKChyaXNrLCBpKSA9PiA8ZGl2IGtleT17aX0gc3R5bGU9e3sgLi4uc3R5bGVzLnJpc2tJdGVtLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM5YTY3MDAnKSB9fT5cdTI2QTAge3JlbmRlcldpdGhQZWVrKHJpc2spfTwvZGl2Pil9XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHsvKiBcdTY1ODdcdTRFRjZcdTZFMDVcdTUzNTUgKyBcdTkwMTBcdTY1ODdcdTRFRjZcdTlBRDhcdTRFQUVcdTVCRjlcdTZCRDQgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBtYXJnaW5Ub3A6ICcxMHB4JyB9fT57dCgnZGV0YWlsLmZpbGVzJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICB7ZC5maWxlcy5tYXAoKGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0YXJnZXR9fCR7ZmlsZS5wYXRofWBcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXRjaCA9IGZpbGVEaWZmc1trZXldXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2tleX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+e2ZpbGUucGF0aH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzFhN2YzNycpLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT4re2ZpbGUuYWRkc308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NmMjIyZScpLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT4te2ZpbGUuZGVsc308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRGaWxlRGlmZih0YXJnZXQsIGZpbGUucGF0aCkgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwYXRjaCA9PT0gdW5kZWZpbmVkID8gdCgnZGlmZi5zaG93JykgOiB0KCdkaWZmLmhpZGUnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtwYXRjaCAhPT0gdW5kZWZpbmVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtgJHtrZXl9LWRpZmZgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjb2xTcGFuPXs0fSBzdHlsZT17eyAuLi5zdHlsZXMudGQsIHBhZGRpbmc6IDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEaWZmVmlldyBwYXRjaD17cGF0Y2h9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9DYXJkPlxuICAgICAgICApXG4gICAgICB9KX1cblxuICAgICAgey8qIFx1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNFx1RkYxQVx1NjMwOVx1OTRBRSArIFx1OThDRVx1OTY2OVx1Njc4NFx1NjIxMCArIFx1NTkyN1x1NTZGRSArIFx1NUY3MVx1NTRDRFx1NzBCOVx1NjYwRVx1N0VDNiArIFx1OEJCMFx1NUZDNlx1ODA1NFx1NTJBOCAqL31cbiAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdkZXRhaWwuaW1wYWN0Jyl9PlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtpbXBhY3RMb2FkaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZEltcGFjdCgpIH19PlxuICAgICAgICAgICAge2ltcGFjdExvYWRpbmcgPyB0KCdkZXRhaWwuaW1wYWN0TG9hZGluZycpIDogdCgnZGV0YWlsLmltcGFjdCcpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIHtpbXBhY3QgIT09IG51bGwgJiYgaW1wYWN0LmV4cGxhbmF0aW9uc0NhY2hlZCA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoJyM4YjhiOGInKSwgbWFyZ2luTGVmdDogJzhweCcgfX0+XG4gICAgICAgICAgICAgIHt0KCdjYWNoZS5oaXQnKX17aW1wYWN0LmdlbmVyYXRlZEF0ID8gJyBcdTAwQjcgJyArIG5ldyBEYXRlKGltcGFjdC5nZW5lcmF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKSA6ICcnfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiByZW5kZXJDb3N0QmFkZ2UoaW1wYWN0LmV4cGxhbmF0aW9uc0Nvc3RVc2QsIHQoJ2Nvc3QudG9vbHRpcCcpKX1cbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgbWFyZ2luTGVmdDogJzhweCcsIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17aW1wYWN0TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJbXBhY3QodHJ1ZSkgfX0+XG4gICAgICAgICAgICAgIHt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtpbXBhY3QgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICcxMHB4JywgbWFyZ2luOiAnMTBweCAwIDRweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKGltcGFjdFJpc2tDb2xvciksIGZvbnRTaXplOiAnMTNweCcsIHBhZGRpbmc6ICczcHggMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICB7dCgnaW1wYWN0LnJpc2snKX06IHtpbXBhY3Qucmlza0xldmVsfVx1RkYwOHtpbXBhY3Qucmlza1Njb3JlfVx1RkYwOVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7aW1wYWN0LmtleUNoYW5nZVBvaW50cyAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5rZXlDaGFuZ2VQb2ludHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM5YTY3MDAnKSB9fT5cdTI2QTAge3QoJ2ltcGFjdC5rZXlQb2ludHMnKX06IHtpbXBhY3Qua2V5Q2hhbmdlUG9pbnRzLm1hcCgoZmlsZSkgPT4gZmlsZS5zcGxpdCgnLycpLnBvcCgpKS5qb2luKCdcdTMwMDEnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHtpbXBhY3Qucmlza0ZhY3RvcnMgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3Qucmlza0ZhY3RvcnMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zZWN0aW9uVGl0bGV9Pnt0KCdpbXBhY3QuZmFjdG9ycycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICcycHgnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAge2ltcGFjdC5yaXNrRmFjdG9ycy5tYXAoKGZhY3RvciwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGZvbnRTaXplOiAnMTJweCcsIHBhZGRpbmc6ICczcHggOHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGJvcmRlclJhZGl1czogJzRweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57ZmFjdG9yLnRleHR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IGltcGFjdFJpc2tDb2xvciwgZm9udFdlaWdodDogNjAwIH19Pit7ZmFjdG9yLnBvaW50c308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDxJbXBhY3RHcmFwaCBkYXRhPXtpbXBhY3R9IHQ9e3R9IC8+XG4gICAgICAgICAgICAgIHtpbXBhY3QubGV2ZWxzLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdpbXBhY3Qubm9uZScpfTwvZGl2Pn1cbiAgICAgICAgICAgICAgey8qIFx1NTFGRFx1NjU3MFx1N0VBN1x1NUY3MVx1NTRDRFx1RkYxQVx1NjcyQ1x1NkIyMVx1NEZFRVx1NjUzOVx1NEU4Nlx1NTRFQVx1NEU5Qlx1NTFGRFx1NjU3MFx1MzAwMVx1NkNFMlx1NTNDQVx1NEU4Nlx1OEMwMVx1NzY4NFx1NTRFQVx1NEU5Qlx1NTFGRFx1NjU3MFx1MzAwMVx1OEMwM1x1NzUyOFx1NzBCOVx1NTcyOFx1NTRFQSAqL31cbiAgICAgICAgICAgICAge2ltcGFjdC5mdW5jdGlvbkltcGFjdCAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5mdW5jdGlvbkltcGFjdC5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBtYXJnaW5Ub3A6ICcxMnB4JyB9fT57dCgnaW1wYWN0LmZ1bmN0aW9ucycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICc4cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICB7aW1wYWN0LmZ1bmN0aW9uSW1wYWN0Lm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZW50cnkuc3ltYm9sfSBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnI2Q5NzcwNicpfT57ZW50cnkuc3ltYm9sfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmxhYmVsLCBtYXJnaW5MZWZ0OiAnOHB4JyB9fT57ZW50cnkuZGVmaW5lZElufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LnJvbGUgIT09IHVuZGVmaW5lZCAmJiBlbnRyeS5yb2xlICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQsIG1hcmdpblRvcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT57dCgnaW1wYWN0LmZ1bmNSb2xlJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5yb2xlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2hhbmdlICE9PSB1bmRlZmluZWQgJiYgZW50cnkuY2hhbmdlICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzlhNjcwMCcpIH19Pnt0KCdpbXBhY3QuZnVuY0NoYW5nZScpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuaW1wYWN0ICE9PSB1bmRlZmluZWQgJiYgZW50cnkuaW1wYWN0ICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NlOTE3OCcpIH19Pnt0KCdpbXBhY3QuZnVuY0NhbGxlcnMnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmltcGFjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNhbGxlcnMubWFwKChjYWxsZXIsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7IC4uLnN0eWxlcy5sb2dpY1N0ZXAsIG1hcmdpblRvcDogJzNweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JykgfX0+XHUyMUIzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY3Vyc29yOiAncG9pbnRlcicsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lIGRvdHRlZCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG9wZW5QZWVrKGNhbGxlci5maWxlLCBOdW1iZXIoY2FsbGVyLmxpbmUpKSB9fT57Y2FsbGVyLmZpbGV9OntjYWxsZXIubGluZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Plx1MjAxNCB7Y2FsbGVyLnNuaXBwZXQuc2xpY2UoMCwgODApfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge2ltcGFjdC5mdW5jdGlvbkltcGFjdCAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5mdW5jdGlvbkltcGFjdC5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2ltcGFjdC5mdW5jdGlvbnNOb25lJyl9PC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHtpbXBhY3QubWVtb3JpZXMgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3QubWVtb3JpZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxMHB4JywgcGFkZGluZzogJzhweCAxMHB4JywgYm9yZGVyOiAnMXB4IGRhc2hlZCByZ2JhKDM3LDk5LDIzNSwwLjM1KScsIGJvcmRlclJhZGl1czogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT57dCgnaW1wYWN0Lm1lbW9yeScpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhXcmFwOiAnd3JhcCcsIGdhcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpbXBhY3QubWVtb3JpZXMubWFwKChtZW1vcnksIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e2l9IHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyMyNTYzZWInKX0+e21lbW9yeS50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuXG4gICAgICB7LyogXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHVGRjFBXHU3RUQzXHU4QkJBICsgXHU3RUQzXHU2Nzg0XHU1MzE2XHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1ICovfVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgPENhcmQgdGl0bGU9e3QoJ2RldGFpbC5vcHRpbWFsaXR5Jyl9PlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtyZXZpZXdMb2FkaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJldmlld3MoKSB9fT5cbiAgICAgICAgICAgIHtyZXZpZXdMb2FkaW5nID8gdCgnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJykgOiB0KCdkZXRhaWwub3B0aW1hbGl0eScpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubWFwKCh0YXJnZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSByZXZpZXdzW3RhcmdldF1cbiAgICAgICAgICAgIGlmIChyID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsXG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRhcmdldCA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiB0YXJnZXQuc2xpY2UoMCwgOClcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtgci0ke3RhcmdldH1gfSBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgICAgICAgICB7ci5jYWNoZWQgPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9Pnt0KCdjYWNoZS5oaXQnKX17ci5nZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShyLmdlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIHtyZW5kZXJDb3N0QmFkZ2Uoci5jb3N0VXNkLCB0KCdjb3N0LnRvb2x0aXAnKSl9XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJldmlld3ModHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7ci52ZXJkaWN0ICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wNSknLCBib3JkZXI6ICcxcHggc29saWQgcmdiYSgzNyw5OSwyMzUsMC4yKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMTBweCcgfX0+e3IudmVyZGljdH08L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtyLmlzc3VlTGlzdCAhPT0gdW5kZWZpbmVkICYmIHIuaXNzdWVMaXN0Lmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dHI+e1sncmV2aWV3LmNvbC5zZXZlcml0eScsICdyZXZpZXcuY29sLmNhdGVnb3J5JywgJ3Jldmlldy5jb2wudGl0bGUnLCAncmV2aWV3LmNvbC5ldmlkZW5jZScsICdyZXZpZXcuY29sLmZpeCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICB7ci5pc3N1ZUxpc3QubWFwKChpc3N1ZSwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKGlzc3VlLnNldmVyaXR5ID09PSAnY3JpdGljYWwnID8gJyNmMTRjNGMnIDogaXNzdWUuc2V2ZXJpdHkgPT09ICdoaWdoJyA/ICcjY2U5MTc4JyA6IGlzc3VlLnNldmVyaXR5ID09PSAnbWVkaXVtJyA/ICcjZGNkY2FhJyA6ICcjNTY5Y2Q2Jyl9Pntpc3N1ZS5zZXZlcml0eX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntpc3N1ZS5jYXRlZ29yeX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2lzc3VlLnRpdGxlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19Pntpc3N1ZS5ldmlkZW5jZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2lzc3VlLmZpeH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3Jldmlldy5jbGVhbicpfTwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pfVxuICAgICAgICAgIHtyZXZpZXdMb2FkaW5nICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZycpfTwvZGl2Pn1cbiAgICAgICAgICB7IXJldmlld0xvYWRpbmcgJiYgc2VsZWN0ZWRUYXJnZXRzLmV2ZXJ5KCh0YXJnZXQpID0+IHJldmlld3NbdGFyZ2V0XSA9PT0gdW5kZWZpbmVkKSAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXZpZXcuaGludCcpfTwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG4gICAgPC8+XG4gIClcblxuICAvLyBcdTI1MDBcdTI1MDAgXHU4QkJFXHU3RjZFXHU5ODc1XHU3QjdFIFx1MjUwMFx1MjUwMFxuICBjb25zdCBUSUVSX0xBQkVMUzogQXJyYXk8eyBrZXk6IHN0cmluZzsgemg6IHN0cmluZzsgZGVzYzogc3RyaW5nIH0+ID0gW1xuICAgIHsga2V5OiAnc3RhbmRhcmQnLCB6aDogJ1x1ODlFM1x1OEJGQiAvIFx1NTFGRFx1NjU3MFx1NUY3MVx1NTRDRFx1OEJGNFx1NjYwRScsIGRlc2M6ICdcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTc2ODQgQUkgXHU4OUUzXHU4QkZCXHUzMDAxXHU1RjcxXHU1NENEXHU1MjA2XHU2NzkwJyB9LFxuICAgIHsga2V5OiAncmVhc29uaW5nJywgemg6ICdcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTUgLyBcdTYyNjdcdTg4NENcdThCQTFcdTUyMTInLCBkZXNjOiAnXHU4QkM0XHU1QkExXHUzMDAxXHU4QkExXHU1MjEyXHU3NTFGXHU2MjEwXHUzMDAxQUkgXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzJyB9LFxuICAgIHsga2V5OiAnZmFzdCcsIHpoOiAnXHU1Mzg2XHU1M0YyXHU4RjdCXHU2NzkwJywgZGVzYzogJ1x1NjI2Qlx1NjNDRlx1NTM4Nlx1NTNGMlx1NjVGNlx1NzY4NFx1OTAxMFx1NjNEMFx1NEVBNFx1NEUwMFx1NTNFNVx1OEJERCcgfSxcbiAgICB7IGtleTogJ3ZlcmlmaWVyJywgemg6ICdcdTlBOENcdTY1MzYnLCBkZXNjOiAnXHU2NTM5XHU1MkE4XHU5QThDXHU2NTM2XHU3Njg0IEFJIFx1NTkwRFx1NjgzOCcgfSxcbiAgXVxuXG4gIGNvbnN0IHNldHRpbmdzVGFiID0gKFxuICAgIDw+XG4gICAgICB7LyogXHU2QTIxXHU1NzhCXHU1MjA2XHU5MTREXHVGRjFBXHU1M0VGXHU4OUM2XHU1MzE2XHU1MjA3XHU2MzYyXHU1NDA0XHU0RUZCXHU1MkExXHU3NTI4XHU3Njg0XHU2QTIxXHU1NzhCXHVGRjBDXHU0RkREXHU1QjU4XHU1MzczXHU3NTFGXHU2NTQ4ICovfVxuICAgICAgPENhcmQgdGl0bGU9e3QoJ21vZGVsLnRpdGxlJyl9PlxuICAgICAgICB7bW9kZWxUaWVycyA9PT0gbnVsbCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdtb2RlbC5sb2FkaW5nJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIHtUSUVSX0xBQkVMUy5tYXAoKHRpZXIpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IG1vZGVsVGllcnNbdGllci5rZXldXG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3VycmVudCA/IGN1cnJlbnQucHJvdmlkZXIgKyAnLycgKyBjdXJyZW50Lm1vZGVsIDogJydcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17dGllci5rZXl9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWluV2lkdGg6IDE1MCwgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwIH19Pnt0aWVyLnpofTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6IDI0MCB9fVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHYgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgIGlmICh2ID09PSAnJykgeyBzZXRNb2RlbFRpZXJzKHsgLi4ubW9kZWxUaWVycywgW3RpZXIua2V5XTogeyBwcm92aWRlcjogJycsIG1vZGVsOiAnJyB9IH0pOyByZXR1cm4gfVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtwcm92aWRlciwgLi4ucmVzdF0gPSB2LnNwbGl0KCcvJylcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IHJlc3Quam9pbignLycpXG4gICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZWxUaWVycyh7IC4uLm1vZGVsVGllcnMsIFt0aWVyLmtleV06IHsgcHJvdmlkZXIsIG1vZGVsIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt0KCdtb2RlbC5mb2xsb3dDaGF0Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIHttb2RlbE9wdGlvbnMubWFwKChvcHRpb24pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfSB2YWx1ZT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRpb24ucHJvdmlkZXJ9IC8ge29wdGlvbi5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3RpZXIuZGVzY308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17bW9kZWxTYXZpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzYXZlTW9kZWxDb25maWcoKSB9fT5cbiAgICAgICAgICAgICAgICB7bW9kZWxTYXZpbmcgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnbW9kZWwuc2F2ZScpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAge21vZGVsU2F2ZWQgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzRlYzliMCcpfT57dCgnbW9kZWwuc2F2ZWQnKX08L3NwYW4+fVxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnbW9kZWwuaGludCcpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgICAgPGRpdiBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC10ZXJ0aWFyeSwgIzljYTNhZiknLCBwYWRkaW5nOiAnOHB4IDAnIH19PlxuICAgICAgICBkc2gtcHJvamVjdC1jb250cm9sIHZ7c3RhdGU/LnBsdWdpblZlcnNpb24gPz8gJz8nfVxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gIClcblxuICBjb25zdCBvdmVydmlld1RhYiA9IChcbiAgICA8PlxuICAgICAgPENhcmQ+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtib290c3RyYXBwaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQm9vdHN0cmFwKCkgfX0+XG4gICAgICAgICAgICB7Ym9vdHN0cmFwcGluZyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24ucmVzY2FuJyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGx9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2FuYWx5emUnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvYW5hbHl6ZScsIHt9KSB9fT5cbiAgICAgICAgICAgIHtidXN5ID09PSAnYW5hbHl6ZScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLmFuYWx5emUnKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbH0gb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbigndmVyaWZ5JywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3ZlcmlmeScsIHt9KSB9fT5cbiAgICAgICAgICAgIHtidXN5ID09PSAndmVyaWZ5JyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24udmVyaWZ5Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9DYXJkPlxuICAgICAge3Jlc3VsdFBhbmVsfVxuICAgICAge3Byb2plY3QgPT09IG51bGwgPyAoXG4gICAgICAgIDxDYXJkPlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEzcHgnLCBtYXJnaW5Cb3R0b206ICc2cHgnIH19Pnt0KCdzdGF0ZS5ub1Byb2plY3QnKX08L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdzdGF0ZS5ub1Byb2plY3RIaW50Jyl9PC9kaXY+XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXtgJHt0KCdzdGF0ZS5wcm9qZWN0Jyl9XHVGRjFBJHtwcm9qZWN0Lm5hbWV9YH0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT5Sb290PC9zcGFuPntwcm9qZWN0LnJvb3RQYXRofTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7Ym9vdHN0cmFwICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS50ZWNoU3RhY2snKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7Ym9vdHN0cmFwLnRlY2hTdGFjay5tYXAoKHRlY2gpID0+IDxzcGFuIGtleT17dGVjaH0gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzRlYzliMCcpfT57dGVjaH08L3NwYW4+KX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUuc3ltYm9scycpfTwvc3Bhbj57U3RyaW5nKGJvb3RzdHJhcC5zeW1ib2xzQ291bnQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUubWFuaWZlc3RzJyl9PC9zcGFuPntTdHJpbmcoYm9vdHN0cmFwLm1hbmlmZXN0RmlsZXMubGVuZ3RoKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLmV2aWRlbmNlJyl9PC9zcGFuPntTdHJpbmcoc3RhdGU/LmV2aWRlbmNlQ291bnQgPz8gMCl9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luVG9wOiAnOHB4JyB9fT57Ym9vdHN0cmFwLnN1bW1hcnl9PC9kaXY+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2NvbmZpcm1lZC50aXRsZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPXsyfSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSBwbGFjZWhvbGRlcj17dCgnY29uZmlybWVkLnRleHQnKX0gdmFsdWU9e2NvbmZpcm1lZFRleHR9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDb25maXJtZWRUZXh0KGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnY29uZmlybWVkLnBhdGhzJyl9IHZhbHVlPXtjb25maXJtZWRQYXRoc30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENvbmZpcm1lZFBhdGhzKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuYnV0dG9ufVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgY29uZmlybWVkVGV4dCA9PT0gJyd9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdhZGRDb25maXJtZWQnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY29uZmlybWVkJywgeyB0eXBlOiAnY29uc3RyYWludCcsIHRleHQ6IGNvbmZpcm1lZFRleHQsIGZvcmJpZGRlblBhdGhzOiBjb25maXJtZWRQYXRocy5zcGxpdCgnLCcpLm1hcCgocGF0aCkgPT4gcGF0aC50cmltKCkpLmZpbHRlcigocGF0aCkgPT4gcGF0aCAhPT0gJycpIH0pLnRoZW4oKCkgPT4geyBzZXRDb25maXJtZWRUZXh0KCcnKTsgc2V0Q29uZmlybWVkUGF0aHMoJycpIH0pIH19XG4gICAgICAgICAgPntidXN5ID09PSAnYWRkQ29uZmlybWVkJyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdjb25maXJtZWQuYWRkJyl9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7Y29uZmlybWVkLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdjb25maXJtZWQubm9uZScpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge2NvbmZpcm1lZC5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtpdGVtLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjYzU4NmMwJyl9PntpdGVtLnR5cGV9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2l0ZW0udGV4dH08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntpdGVtLmZvcmJpZGRlblBhdGhzLmpvaW4oJywgJykgfHwgJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3JlbW92ZUNvbmZpcm1lZCcsICcvcHJvamVjdC1jb250cm9sL2FwaS9jb25maXJtZWQvcmVtb3ZlJywgeyBpZDogaXRlbS5pZCB9KSB9fVxuICAgICAgICAgICAgICAgICAgICA+XHUyNzE1PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0uY2hhbmdlVGl0bGUnKX0gdmFsdWU9e2NoYW5nZVRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q2hhbmdlVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHRleHRhcmVhIHJvd3M9ezJ9IHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLmNoYW5nZURlc2MnKX0gdmFsdWU9e2NoYW5nZURlc2N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDaGFuZ2VEZXNjKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuYnV0dG9ufVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgY2hhbmdlVGl0bGUgPT09ICcnfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignY3JlYXRlQ2hhbmdlJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NoYW5nZXMnLCB7IHRpdGxlOiBjaGFuZ2VUaXRsZSwgZGVzY3JpcHRpb246IGNoYW5nZURlc2MgfSkudGhlbigoKSA9PiB7IHNldENoYW5nZVRpdGxlKCcnKTsgc2V0Q2hhbmdlRGVzYygnJykgfSkgfX1cbiAgICAgICAgICA+e2J1c3kgPT09ICdjcmVhdGVDaGFuZ2UnID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtjaGFuZ2VzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdzdGF0ZS5ub0NoYW5nZXMnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57WydjaGFuZ2VzLmNvbC50aXRsZScsICdjaGFuZ2VzLmNvbC50eXBlJywgJ2NoYW5nZXMuY29sLnN0YXR1cycsICdjaGFuZ2VzLmNvbC51cGRhdGVkJ10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtjaGFuZ2VzLm1hcCgoY2hhbmdlKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17Y2hhbmdlLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Y2hhbmdlLnRpdGxlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShjaGFuZ2Uuc3RhdHVzID09PSAnY29tcGxldGVkJyA/ICcjNGVjOWIwJyA6ICcjNTY5Y2Q2Jyl9PntjaGFuZ2Uuc3RhdHVzfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntmb3JtYXRUaW1lKGNoYW5nZS51cGRhdGVkQXQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyh7IHRpdGxlOiAnXHU1MjIwXHU5NjY0XHU4RkQ5XHU0RTJBXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExXHVGRjFGJywgbWVzc2FnZTogJ1x1MzAwQycgKyBjaGFuZ2UudGl0bGUgKyAnXHUzMDBEXHU1M0NBXHU1MTc2XHU1MTY4XHU5MEU4XHU2MjY3XHU4ODRDXHU4QkIwXHU1RjU1XHUzMDAxXHU4QkExXHU1MjEyXHUzMDAxXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHU1QzA2XHU4OEFCXHU2QzM4XHU0RTQ1XHU1MjIwXHU5NjY0XHUzMDAyJywgZGFuZ2VyOiB0cnVlLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2RlbGV0ZUNoYW5nZScsICcvcHJvamVjdC1jb250cm9sL2FwaS9jaGFuZ2VzL2RlbGV0ZScsIHsgaWQ6IGNoYW5nZS5pZCB9KSB9IH0pIH19Plx1MjcxNTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICA8Lz5cbiAgKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdTk4NzVcdTdCN0VcdUZGMUFcdTk4NzVcdTk3NjJcdTc2RjRcdTYzQTVcdTUyMUJcdTVFRkFcdTVFNzZcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMENcdTgwNEFcdTU5MjlcdTUzRUFcdTY2MkZcdTUzRTZcdTRFMDBcdTc5Q0RcdTUxNjVcdTUzRTMgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IGV4ZWN1dGlvblRhYiA9IChcbiAgICA8PlxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGZsZXhXcmFwOiAnd3JhcCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICcxMHB4JywgcGFkZGluZzogJzdweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMzcsOTksMjM1LDAuMiknLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICA8Yj5cdTI0NjAge3QoJ2V4ZWMuZmxvd0NyZWF0ZScpfTwvYj48c3Bhbj5cdTIxOTI8L3NwYW4+XG4gICAgICAgIDxiPlx1MjQ2MSB7dCgnZXhlYy5mbG93T3JjaGVzdHJhdGUnKX08L2I+PHNwYW4+XHUyMTkyPC9zcGFuPlxuICAgICAgICA8Yj5cdTI0NjIge3QoJ2V4ZWMuZmxvd1J1bicpfTwvYj48c3Bhbj5cdTIxOTI8L3NwYW4+XG4gICAgICAgIDxiPlx1MjQ2MyB7dCgnZXhlYy5mbG93TWVtb3J5Jyl9PC9iPlxuICAgICAgPC9kaXY+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnZXhlYy5jcmVhdGUnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtSW5saW5lfT5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCBmbGV4OiAxLCBtaW5XaWR0aDogMjAwIH19IHBsYWNlaG9sZGVyPXt0KCdleGVjLmZvcm1UaXRsZScpfSB2YWx1ZT17ZXhlY1RpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RXhlY1RpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17ZXhlY01vZGVsfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RXhlY01vZGVsKGUudGFyZ2V0LnZhbHVlKSB9fSB0aXRsZT17dCgncGxhbi5tb2RlbERlZmF1bHQnKX0+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e3QoJ2V4ZWMubW9kZWxEZWZhdWx0Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICB7KG1vZGVsT3B0aW9ucyA/PyBbXSkubWFwKChvcHRpb24pID0+IDxvcHRpb24ga2V5PXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9IHZhbHVlPXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9PntvcHRpb24ucHJvdmlkZXJ9L3tvcHRpb24uaWR9PC9vcHRpb24+KX1cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcm93cz17M30gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybURlc2MnKX0gdmFsdWU9e2V4ZWNEZXNjfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RXhlY0Rlc2MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmFjdGlvblJvd30+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBleGVjVGl0bGUudHJpbSgpID09PSAnJyB8fCBleGVjRGVzYy50cmltKCkgPT09ICcnfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc3RhcnRSdW4oKSB9fT5cbiAgICAgICAgICAgICAge2J1c3kgPT09ICdzdGFydFJ1bicgPyB0KCdleGVjLnBsYW5uaW5nJykgOiB0KCdleGVjLnN0YXJ0Jyl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdleGVjLmNyZWF0ZUhpbnQnKX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9DYXJkPlxuICAgICAge3Jlc3VsdFBhbmVsfVxuICAgICAge3BsYW5Db25maXJtICE9PSBudWxsICYmIChcbiAgICAgICAgPENhcmQgdGl0bGU9e3QoJ3BsYW4udGl0bGUnKX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT57dCgncGxhbi5oaW50Jyl9PC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0cj57WydwbGFuLmNvbC5zdGVwJywgJ3BsYW4uY29sLnJvbGUnLCAncGxhbi5jb2wubW9kZWwnLCAncGxhbi5jb2wucG9saWN5JywgJ3BsYW4uY29sLmVuYWJsZWQnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAge3BsYW5Db25maXJtLnN0ZXBzLm1hcCgoc3RlcCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e3N0ZXAuaWR9IHN0eWxlPXt7IG9wYWNpdHk6IHN0ZXAuZW5hYmxlZCA/IDEgOiAwLjQ1IH19PlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBtaW5XaWR0aDogMjIwIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFdlaWdodDogNjAwIH19PntpbmRleCArIDF9LiB7c3RlcC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PntzdGVwLmRlc2NyaXB0aW9uLnNsaWNlKDAsIDEyMCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAge3N0ZXAudGFyZ2V0RmlsZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJyB9fT57c3RlcC50YXJnZXRGaWxlcy5qb2luKCcsICcpLnNsaWNlKDAsIDEyMCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJywgcGFkZGluZzogJzNweCA2cHgnIH19IHZhbHVlPXtzdGVwLnJvbGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0UGxhbkNvbmZpcm0oeyAuLi5wbGFuQ29uZmlybSwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzLm1hcCgoaXRlbSwgaSkgPT4gaSA9PT0gaW5kZXggPyB7IC4uLml0ZW0sIHJvbGU6IGUudGFyZ2V0LnZhbHVlIH0gOiBpdGVtKSB9KSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtbJ2FuYWx5c2lzJywgJ3BsYW5uaW5nJywgJ2NvZGluZycsICdvcHMnLCAndmVyaWZpY2F0aW9uJ10ubWFwKChyb2xlKSA9PiA8b3B0aW9uIGtleT17cm9sZX0gdmFsdWU9e3JvbGV9PntST0xFX0xBQkVMU1tyb2xlXSA/PyByb2xlfTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggNnB4JyB9fSB2YWx1ZT17c3RlcC5tb2RlbFByb3ZpZGVyICsgJy8nICsgc3RlcC5tb2RlbElkfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtwcm92aWRlciwgbW9kZWxdID0gZS50YXJnZXQudmFsdWUuc3BsaXQoJy8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRQbGFuQ29uZmlybSh7IC4uLnBsYW5Db25maXJtLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMubWFwKChpdGVtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4uaXRlbSwgbW9kZWxQcm92aWRlcjogcHJvdmlkZXIgPz8gJycsIG1vZGVsSWQ6IG1vZGVsID8/ICcnIH0gOiBpdGVtKSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiL1wiPnt0KCdwbGFuLm1vZGVsRGVmYXVsdCcpfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAge21vZGVsT3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gPG9wdGlvbiBrZXk9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0gdmFsdWU9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0+e29wdGlvbi5wcm92aWRlcn0ve29wdGlvbi5pZH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDZweCcgfX0gdmFsdWU9e3N0ZXAuZmFpbHVyZVBvbGljeX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRQbGFuQ29uZmlybSh7IC4uLnBsYW5Db25maXJtLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMubWFwKChpdGVtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4uaXRlbSwgZmFpbHVyZVBvbGljeTogZS50YXJnZXQudmFsdWUgfSA6IGl0ZW0pIH0pIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKFBPTElDWV9MQUJFTFMpLm1hcCgoW3ZhbHVlLCBsYWJlbF0pID0+IDxvcHRpb24ga2V5PXt2YWx1ZX0gdmFsdWU9e3ZhbHVlfT57bGFiZWx9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtzdGVwLmVuYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0UGxhbkNvbmZpcm0oeyAuLi5wbGFuQ29uZmlybSwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzLm1hcCgoaXRlbSwgaSkgPT4gaSA9PT0gaW5kZXggPyB7IC4uLml0ZW0sIGVuYWJsZWQ6IGUudGFyZ2V0LmNoZWNrZWQgfSA6IGl0ZW0pIH0pIH19IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgbWFyZ2luVG9wOiAnMTBweCcgfX0+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17cGxhbkJ1c3l9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsYXVuY2hQbGFuKHRydWUpIH19PntwbGFuQnVzeSA/ICdcdTIwMjYnIDogdCgncGxhbi5sYXVuY2hFZGl0ZWQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtwbGFuQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxhdW5jaFBsYW4oZmFsc2UpIH19Pnt0KCdwbGFuLmxhdW5jaERpcmVjdCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e3BsYW5CdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBsYW5Db25maXJtKG51bGwpIH19Pnt0KCdwbGFuLmRpc2NhcmQnKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cbiAgICAgIDxDYXJkPlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cbiAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnZXhlYy5hdHRlbXB0cycpfTwvc3Bhbj57U3RyaW5nKHN0YXRlPy5hdHRlbXB0c0NvdW50ID8/IDApfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtydW5zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdzdGF0ZS5ub1J1bnMnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ2V4ZWMuY29sLmNoYW5nZScsICdleGVjLmNvbC5zdGVwcycsICdleGVjLmNvbC5zdGF0dXMnLCAnZXhlYy5jb2wuc3RhcnRlZCcsICdleGVjLmNvbC5jb3N0JywgJ2V4ZWMuY29sLmRldGFpbCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7cnVucy5tYXAoKHJ1bikgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3J1bi5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+eyhjaGFuZ2VzLmZpbmQoKGNoYW5nZSkgPT4gY2hhbmdlLmlkID09PSBydW4uY2hhbmdlSWQpPy50aXRsZSkgPz8gcnVuLmNoYW5nZUlkfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3J1bi5zdGVwc1RvdGFsID8gKHJ1bi5zdGVwc0RvbmUgPz8gMCkgKyAnLycgKyBydW4uc3RlcHNUb3RhbCA6ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UocnVuLnN0YXR1cyA9PT0gJ3N1Y2NlZWRlZCcgfHwgcnVuLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgPyAnIzRlYzliMCcgOiBydW4uc3RhdHVzID09PSAnZmFpbGVkJyA/ICcjZjE0YzRjJyA6IHJ1bi5zdGF0dXMgPT09ICdwYXVzZWQnID8gJyNkOTc3MDYnIDogJyNkY2RjYWEnKX0+e1JVTl9TVEFUVVNfTEFCRUxTW3J1bi5zdGF0dXNdID8/IHJ1bi5zdGF0dXN9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICB7cnVuLmN1cnJlbnRTdGVwICE9PSBudWxsICYmIHJ1bi5jdXJyZW50U3RlcCAhPT0gdW5kZWZpbmVkICYmIHJ1bi5zdGF0dXMgPT09ICdydW5uaW5nJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWF4V2lkdGg6IDE2MCwgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19PntydW4uY3VycmVudFN0ZXB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntmb3JtYXRUaW1lKHJ1bi5zdGFydGVkQXQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3J1bi5jb3N0VXNkICE9PSB1bmRlZmluZWQgPyAnJCcgKyBydW4uY29zdFVzZC50b0ZpeGVkKDQpIDogJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSdW5EZXRhaWwocnVuLmlkKSB9fT57cnVuRGV0YWlsPy5ydW4uaWQgPT09IHJ1bi5pZCA/IHQoJ3BsYW4ucmVmcmVzaERldGFpbCcpIDogdCgncGxhbi52aWV3RGV0YWlsJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgICAge3J1bkRldGFpbCAhPT0gbnVsbCAmJiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdwbGFuLmRldGFpbFRpdGxlJykgKyAnIFx1MDBCNyAnICsgcnVuRGV0YWlsLnJ1bi5jaGFuZ2VUaXRsZX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ3N1Y2NlZWRlZCcgfHwgcnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdjb21wbGV0ZWQnID8gJyM0ZWM5YjAnIDogcnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdmYWlsZWQnID8gJyNmMTRjNGMnIDogcnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdwYXVzZWQnID8gJyNkOTc3MDYnIDogJyNkY2RjYWEnKX0+e1JVTl9TVEFUVVNfTEFCRUxTW3J1bkRldGFpbC5ydW4uc3RhdHVzXSA/PyBydW5EZXRhaWwucnVuLnN0YXR1c308L3NwYW4+XG4gICAgICAgICAgICB7cnVuRGV0YWlsLnJ1bi5lcnJvciAhPT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkMTI0MmYnKSB9fT57cnVuRGV0YWlsLnJ1bi5lcnJvci5tZXNzYWdlfTwvc3Bhbj59XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJ1bkRldGFpbChydW5EZXRhaWwucnVuLmlkKSB9fT57dCgncGxhbi5yZWZyZXNoRGV0YWlsJyl9PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFJ1bkRldGFpbChudWxsKSB9fT57dCgncGxhbi5jbG9zZURldGFpbCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ3BhdXNlZCcgJiYgcnVuRGV0YWlsLnJ1bi5wYXVzZVBvaW50ICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzhweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgYmFja2dyb3VuZDogJ3JnYmEoMjE3LDExOSw2LDAuMDgpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMjE3LDExOSw2LDAuMzUpJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTJweCcgfX0+XHUyM0Y4IHt0KCdwbGFuLnBhdXNlZEJhbm5lcicpfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PntydW5EZXRhaWwucnVuLnBhdXNlUG9pbnQucmVhc29ufTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgbWFyZ2luVG9wOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHJlc3VtZVJ1bihydW5EZXRhaWwucnVuLmlkLCAnY29udGludWUnKSB9fT57dCgncGxhbi5yZXN1bWVSZXRyeScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzNweCAxMHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcmVzdW1lUnVuKHJ1bkRldGFpbC5ydW4uaWQsICdza2lwLWN1cnJlbnQnKSB9fT57dCgncGxhbi5yZXN1bWVTa2lwJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7KHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnZmFpbGVkJyB8fCBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2ludGVycnVwdGVkJykgJiYgKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxuICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHJlc3VtZVJ1bihydW5EZXRhaWwucnVuLmlkLCAnY29udGludWUnKSB9fT57dCgncGxhbi5yZXN1bWVGYWlsZWQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57WydwbGFuLmNvbC5zdGVwJywgJ3BsYW4uY29sLnJvbGUnLCAncGxhbi5jb2wubW9kZWwnLCAnZXhlYy5jb2wuc3RhdHVzJywgJ3BsYW4uY29sLmF0dGVtcHRzJywgJ2V4ZWMuY29sLmNvc3QnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3J1bkRldGFpbC5zdGVwcy5tYXAoKHN0ZXAsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17c3RlcC5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+e2luZGV4ICsgMX0uIHtzdGVwLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7c3RlcC5jbGFpbWVkT3V0Y29tZSAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWF4V2lkdGg6IDMyMCwgd2hpdGVTcGFjZTogJ25vcm1hbCcgfX0+e3N0ZXAuY2xhaW1lZE91dGNvbWUuc2xpY2UoMCwgMTYwKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSg4NiwxNTYsMjE0LDAuMjUpJyl9PntST0xFX0xBQkVMU1tzdGVwLnJvbGVdID8/IHN0ZXAucm9sZX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRTaXplOiAnMTFweCcgfX0+e3N0ZXAubW9kZWwgPz8gJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHN0ZXAudmVyaWZpZWQgPyAnIzRlYzliMCcgOiBzdGVwLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgPyAnI2YxNGM0YycgOiBzdGVwLnN0YXR1cyA9PT0gJ3NraXBwZWQnID8gJyM4Yjk0OWUnIDogJyNkY2RjYWEnKX0+e1NURVBfU1RBVFVTX0xBQkVMU1tzdGVwLnN0YXR1c10gPz8gc3RlcC5zdGF0dXN9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e1N0cmluZyhzdGVwLmF0dGVtcHRzQ291bnQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3N0ZXAuY29zdFVzZCA+IDAgPyAnJCcgKyBzdGVwLmNvc3RVc2QudG9GaXhlZCg0KSA6ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0ICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMTBweCcsIGJvcmRlcjogJzFweCBkYXNoZWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBwYWRkaW5nOiAnOHB4IDEycHgnIH19PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnNHB4JyB9fT57dCgncGxhbi5jb250ZXh0VGl0bGUnKX08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cbiAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQucHJvamVjdERpZ2VzdH1cbiAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuYnJhbmNoICE9PSBudWxsID8gYCBcdTAwQjcgJHt0KCdwbGFuLmJyYW5jaCcpfSAke3J1bkRldGFpbC5jb250ZXh0LmJyYW5jaH1gIDogJyd9XG4gICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmhlYWRTaGEgIT09IG51bGwgPyBgIFx1MDBCNyBIRUFEICR7cnVuRGV0YWlsLmNvbnRleHQuaGVhZFNoYS5zbGljZSgwLCA4KX1gIDogJyd9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuaW5qZWN0ZWRNZW1vcmllcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzRweCcsIGZvbnRTaXplOiAnMTFweCcgfX0+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+e3QoJ3BsYW4uaW5qZWN0ZWRNZW1vcmllcycpfVx1RkYxQTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5pbmplY3RlZE1lbW9yaWVzLm1hcCgobWVtb3J5KSA9PiA8c3BhbiBrZXk9e21lbW9yeS5pZH0gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSg3OCwyMDEsMTc2LDAuMiknKX0+e21lbW9yeS50aXRsZX08L3NwYW4+KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmRlY2lzaW9uTG9nLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiAnaW5oZXJpdCcgfX0+e3QoJ3BsYW4uZGVjaXNpb25Mb2cnKX1cdUZGMUE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuZGVjaXNpb25Mb2cuc2xpY2UoLTYpLm1hcCgoZW50cnksIGVudHJ5SW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5SW5kZXh9Plx1MDBCNyBbe2VudHJ5LmtpbmR9XSB7ZW50cnkuZGV0YWlsfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuICAgICAgPENhcmRcbiAgICAgICAgdGl0bGU9e1xuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCB1c2VyU2VsZWN0OiAnbm9uZScgfX0gb25DbGljaz17KCkgPT4geyBzZXRTY2hlZE9wZW4oIXNjaGVkT3BlbikgfX0+XG4gICAgICAgICAgICB7c2NoZWRPcGVuID8gJ1x1MjVCRSAnIDogJ1x1MjVCOCAnfXt0KCdzY2hlZC50aXRsZScpfVxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmxhYmVsLCBtYXJnaW5MZWZ0OiAnOHB4JyB9fT57KHNjaGVkdWxlZERhdGEgPz8gW10pLmxlbmd0aCA+IDAgPyBTdHJpbmcoKHNjaGVkdWxlZERhdGEgPz8gW10pLmxlbmd0aCkgKyAnIFx1NEUyQScgOiAnJ308L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICB9XG4gICAgICA+XG4gICAgICAgIHtzY2hlZE9wZW4gJiYgKFxuICAgICAgICA8PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybUlubGluZX0+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgZmxleDogMSwgbWluV2lkdGg6IDE2MCB9fSBwbGFjZWhvbGRlcj17dCgnc2NoZWQuZm9ybU5hbWUnKX0gdmFsdWU9e3NjaGVkTmFtZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkTmFtZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycgfX0gdmFsdWU9e3NjaGVkVHlwZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkVHlwZShlLnRhcmdldC52YWx1ZSkgfX0+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmV2aWV3XCI+e3QoJ3NjaGVkLnR5cGVSZXZpZXcnKX08L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzdW1tYXJ5XCI+e3QoJ3NjaGVkLnR5cGVTdW1tYXJ5Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicnVuXCI+e3QoJ3NjaGVkLnR5cGVSdW4nKX08L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzeW5jXCI+e3QoJ3NjaGVkLnR5cGVTeW5jJyl9PC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgd2lkdGg6IDEyMCB9fSBwbGFjZWhvbGRlcj17dCgnc2NoZWQuZm9ybUludGVydmFsJyl9IHZhbHVlPXtzY2hlZEludGVydmFsfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWRJbnRlcnZhbChlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICB7c2NoZWRUeXBlID09PSAncnVuJyAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybVRpdGxlJyl9IHZhbHVlPXtzY2hlZFRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWRUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezJ9IHBsYWNlaG9sZGVyPXt0KCdleGVjLmZvcm1EZXNjJyl9IHZhbHVlPXtzY2hlZERlc2N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZERlc2MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtzY2hlZE5hbWUudHJpbSgpID09PSAnJ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFkZFNjaGVkdWxlZCgpIH19Pnt0KCdzY2hlZC5hZGQnKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+e3QoJ3NjaGVkLmhpbnQnKX08L2Rpdj5cbiAgICAgICAgeyhzY2hlZHVsZWREYXRhID8/IFtdKS5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc2NoZWQuZW1wdHknKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ3NjaGVkLmNvbC5uYW1lJywgJ3NjaGVkLmNvbC50eXBlJywgJ3NjaGVkLmNvbC5pbnRlcnZhbCcsICdzY2hlZC5jb2wubmV4dCcsICdzY2hlZC5jb2wubGFzdFJlc3VsdCcsICdzY2hlZC5jb2wuYWN0aW9ucyddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7KHNjaGVkdWxlZERhdGEgPz8gW10pLm1hcCgodGFzaykgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3Rhc2suaWR9IHN0eWxlPXt7IG9wYWNpdHk6IHRhc2suZW5hYmxlZCA/IDEgOiAwLjQ1IH19PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pnt0YXNrLm5hbWV9e3Rhc2sudGl0bGUgIT09ICcnID8gPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHVGRjA4e3Rhc2sudGl0bGV9XHVGRjA5PC9zcGFuPiA6IG51bGx9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHRhc2sudHlwZSA9PT0gJ3JldmlldycgPyAnIzU2OWNkNicgOiB0YXNrLnR5cGUgPT09ICdzdW1tYXJ5JyA/ICcjNGVjOWIwJyA6ICcjZDdiYTdkJyl9Pnt0YXNrLnR5cGUgPT09ICdyZXZpZXcnID8gdCgnc2NoZWQudHlwZVJldmlldycpIDogdGFzay50eXBlID09PSAnc3VtbWFyeScgPyB0KCdzY2hlZC50eXBlU3VtbWFyeScpIDogdCgnc2NoZWQudHlwZVJ1bicpfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pnt0YXNrLmludGVydmFsTWludXRlcyA+PSAxNDQwID8gTWF0aC5yb3VuZCh0YXNrLmludGVydmFsTWludXRlcyAvIDE0NDAgKiAxMCkgLyAxMCArIHQoJ3NjaGVkLmRheScpIDogdGFzay5pbnRlcnZhbE1pbnV0ZXMgPj0gNjAgPyBNYXRoLnJvdW5kKHRhc2suaW50ZXJ2YWxNaW51dGVzIC8gNjAgKiAxMCkgLyAxMCArIHQoJ3NjaGVkLmhvdXInKSA6IHRhc2suaW50ZXJ2YWxNaW51dGVzICsgdCgnc2NoZWQubWludXRlJyl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57dGFzay5lbmFibGVkID8gZm9ybWF0VGltZSh0YXNrLm5leHREdWVBdCkgOiAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1heFdpZHRoOiAyMjAsIHdoaXRlU3BhY2U6ICdub3JtYWwnIH19Pnt0YXNrLmxhc3RSZXN1bHQgfHwgKHRhc2subGFzdFJ1bkF0ICE9PSBudWxsID8gZm9ybWF0VGltZSh0YXNrLmxhc3RSdW5BdCkgOiAnXHUyMDE0Jyl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNjaGVkdWxlZEFjdGlvbigndXBkYXRlJywgeyBpZDogdGFzay5pZCwgZW5hYmxlZDogIXRhc2suZW5hYmxlZCB9KSB9fT57dGFzay5lbmFibGVkID8gdCgnc2NoZWQuZGlzYWJsZScpIDogdCgnc2NoZWQuZW5hYmxlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNjaGVkdWxlZEFjdGlvbigncnVuJywgeyBpZDogdGFzay5pZCB9KSB9fT57dCgnc2NoZWQucnVuTm93Jyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6ICdcdTUyMjBcdTk2NjRcdThGRDlcdTRFMkFcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdUZGMUYnLCBtZXNzYWdlOiAnXHUzMDBDJyArIHRhc2submFtZSArICdcdTMwMERcdTVDMDZcdTg4QUJcdTZDMzhcdTRFNDVcdTUyMjBcdTk2NjRcdTMwMDInLCBkYW5nZXI6IHRydWUsIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHNjaGVkdWxlZEFjdGlvbignZGVsZXRlJywgeyBpZDogdGFzay5pZCB9KSB9IH0pIH19Plx1MjcxNTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgIDwvPlxuICApXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNlx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcbiAgY29uc3Qgbm90ZXNUYWIgPSAoXG4gICAgPD5cbiAgICAgIHsvKiBcdTI1MDBcdTI1MDAgXHU3QjE0XHU4QkIwXHVGRjFBXHU1MzYxXHU3MjQ3XHU1RjBGXHU5NjA1XHU4QkZCICsgXHU1OTFBXHU4ODRDXHU3RjE2XHU4RjkxICsgXHU2NDFDXHU3RDIyICsgQUkgXHU2MDNCXHU3RUQzIFx1MjUwMFx1MjUwMCAqL31cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdub3Rlcy50aXRsZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgd2lkdGg6IDIyMCB9fVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ25vdGVzLnNlYXJjaCcpfVxuICAgICAgICAgICAgdmFsdWU9e25vdGVTZWFyY2h9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVNlYXJjaChlLnRhcmdldC52YWx1ZSkgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTdW1tYXJ5ID0gbm90ZXMuZmlsdGVyKChub3RlKSA9PiBub3RlLnNoYSA9PT0gJ3N1bW1hcnknKS5zb3J0KChhLCBiKSA9PiBiLmNyZWF0ZWRBdCAtIGEuY3JlYXRlZEF0KVswXVxuICAgICAgICAgICAgY29uc3QgbmV3Q29tbWl0cyA9IGxhc3RTdW1tYXJ5ID09PSB1bmRlZmluZWQgPyAtMVxuICAgICAgICAgICAgICA6IChjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSkuZmlsdGVyKChjb21taXQpID0+IGNvbW1pdC5kYXRlID4gbGFzdFN1bW1hcnkuY3JlYXRlZEF0KS5sZW5ndGhcbiAgICAgICAgICAgIGlmIChuZXdDb21taXRzID09PSAtMSkge1xuICAgICAgICAgICAgICByZXR1cm4gPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ25vdGVzLmRpZ2VzdE5ldmVyJyl9PC9zcGFuPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld0NvbW1pdHMgPT09IDApIHJldHVybiBudWxsXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Pnt0KCdub3Rlcy5kaWdlc3RQZW5kaW5nJykucmVwbGFjZSgne259JywgU3RyaW5nKG5ld0NvbW1pdHMpKX08L3NwYW4+XG4gICAgICAgICAgfSkoKX1cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17YWlTdW1tYXJpemluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFpU3VtbWFyaXplKCkgfX0+XG4gICAgICAgICAgICB7YWlTdW1tYXJpemluZyA/IHQoJ25vdGVzLmFpU3VtbWFyeVJ1bicpIDogJ1x1MjcyOCAnICsgdCgnbm90ZXMuYWlTdW1tYXJ5Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5mb3JtUm93LCBib3JkZXI6ICcxcHggZGFzaGVkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzEwcHgnIH19PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMuZm9ybVRpdGxlJyl9IHZhbHVlPXtub3RlVGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXROb3RlVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCB9fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMudGFnc0hpbnQnKX0gdmFsdWU9e25vdGVUYWdzfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVRhZ3MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLnRleHRhcmVhfVxuICAgICAgICAgICAgcm93cz17Nn1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0KCdub3Rlcy5jb250ZW50SGludCcpfVxuICAgICAgICAgICAgdmFsdWU9e25vdGVDb250ZW50fVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVDb250ZW50KGUudGFyZ2V0LnZhbHVlKSB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgIHt0KCdub3Rlcy5ib3VuZFRvJyl9OiB7c2VsZWN0ZWRUYXJnZXRzWzBdID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IHNlbGVjdGVkVGFyZ2V0c1swXS5zbGljZSgwLCA4KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtub3RlVGl0bGUudHJpbSgpID09PSAnJyB8fCBub3RlQ29udGVudC50cmltKCkgPT09ICcnfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYWRkTm90ZSgpIH19Pnt0KCdub3Rlcy5hZGQnKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleXdvcmQgPSBub3RlU2VhcmNoLnRyaW0oKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgY29uc3QgbWF0Y2hlZCA9IGtleXdvcmQgPT09ICcnXG4gICAgICAgICAgICA/IG5vdGVzXG4gICAgICAgICAgICA6IG5vdGVzLmZpbHRlcigobm90ZSkgPT4gKG5vdGUudGl0bGUgKyAnICcgKyBub3RlLmNvbnRlbnQgKyAnICcgKyAobm90ZS50YWdzID8/IFtdKS5qb2luKCcgJykpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoa2V5d29yZCkpXG4gICAgICAgICAgLy8gXHU3RjZFXHU5ODc2XHU0RjE4XHU1MTQ4XHVGRjBDXHU1MTc2XHU0RjU5XHU2MzA5XHU1MjFCXHU1RUZBXHU2NUY2XHU5NUY0XHU1MDEyXHU1RThGXHUzMDAyXG4gICAgICAgICAgY29uc3QgdmlzaWJsZSA9IFsuLi5tYXRjaGVkXS5zb3J0KChsZWZ0LCByaWdodCkgPT5cbiAgICAgICAgICAgIE51bWJlcihyaWdodC5waW5uZWQgPT09IHRydWUpIC0gTnVtYmVyKGxlZnQucGlubmVkID09PSB0cnVlKSB8fCByaWdodC5jcmVhdGVkQXQgLSBsZWZ0LmNyZWF0ZWRBdClcbiAgICAgICAgICBpZiAodmlzaWJsZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pntub3Rlcy5sZW5ndGggPT09IDAgPyB0KCdub3Rlcy5lbXB0eScpIDogdCgnbm90ZXMuZW1wdHlTZWFyY2gnKX08L2Rpdj5cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHZpc2libGUubWFwKChub3RlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1N1bW1hcnkgPSBub3RlLnNoYSA9PT0gJ3N1bW1hcnknXG4gICAgICAgICAgICBjb25zdCBlZGl0aW5nID0gZWRpdGluZ05vdGUgIT09IG51bGwgJiYgZWRpdGluZ05vdGUuaWQgPT09IG5vdGUuaWQgPyBlZGl0aW5nTm90ZSA6IG51bGxcbiAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkID0gbm90ZUV4cGFuZGVkW25vdGUuaWRdID09PSB0cnVlXG4gICAgICAgICAgICBjb25zdCBsb25nID0gbm90ZS5jb250ZW50Lmxlbmd0aCA+IDI2MCB8fCBub3RlLmNvbnRlbnQuc3BsaXQoJ1xcbicpLmxlbmd0aCA+IDZcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e25vdGUuaWR9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcy5ub3RlQ2FyZCxcbiAgICAgICAgICAgICAgICAgIC4uLihpc1N1bW1hcnkgPyB7IGJhY2tncm91bmQ6ICdyZ2JhKDM3LDk5LDIzNSwwLjA0KScsIGJvcmRlckNvbG9yOiAncmdiYSgzNyw5OSwyMzUsMC4zKScgfSA6IHt9KSxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2VkaXRpbmcgIT09IG51bGwgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSB2YWx1ZT17ZWRpdGluZy50aXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgLi4uZWRpdGluZywgdGl0bGU6IGUudGFyZ2V0LnZhbHVlIH0pIH19IC8+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMudGFnc0hpbnQnKX0gdmFsdWU9e2VkaXRpbmcudGFnc30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgLi4uZWRpdGluZywgdGFnczogZS50YXJnZXQudmFsdWUgfSkgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezEwfSB2YWx1ZT17ZWRpdGluZy5jb250ZW50fSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RWRpdGluZ05vdGUoeyAuLi5lZGl0aW5nLCBjb250ZW50OiBlLnRhcmdldC52YWx1ZSB9KSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICc0cHggMTJweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNhdmVOb3RlRWRpdCgpIH19Pnt0KCdub3Rlcy5zYXZlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnNHB4IDEycHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0RWRpdGluZ05vdGUobnVsbCkgfX0+e3QoJ25vdGVzLmNhbmNlbCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e2lzU3VtbWFyeSA/ICdcdUQ4M0RcdURDRDYgJyA6ICcnfXtub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/ICdcdUQ4M0RcdURDQ0MgJyA6ICcnfXtub3RlLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiBub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIDogdW5kZWZpbmVkIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/IHQoJ25vdGVzLnVucGluJykgOiB0KCdub3Rlcy5waW4nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHRvZ2dsZU5vdGVQaW4obm90ZSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdURDQ0M8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IHRpdGxlPXt0KCdub3Rlcy5jb3B5TWRIaW50Jyl9IG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWQgPSBgIyAke25vdGUudGl0bGV9XFxuXFxuJHtub3RlLmNvbnRlbnR9XFxuYFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkIG5hdmlnYXRvci5jbGlwYm9hcmQ/LndyaXRlVGV4dChtZCkudGhlbigoKSA9PiBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgnbm90ZXMuY29weU1kRG9uZScpKSkuY2F0Y2goKCkgPT4gc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgXHU1OTBEXHU1MjM2XHU1OTMxXHU4RDI1JykpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cdUQ4M0RcdURDQ0Ige3QoJ25vdGVzLmNvcHlNZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gdGl0bGU9e3QoJ25vdGVzLmV4cG9ydE1kSGludCcpfSBvbkNsaWNrPXsoKSA9PiB7IGV4cG9ydE5vdGUobm90ZSkgfX0+XHVEODNEXHVEQ0JFIHt0KCdub3Rlcy5leHBvcnRNZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gdGl0bGU9e3QoJ25vdGVzLnRvTWVtb3J5SGludCcpfSBvbkNsaWNrPXsoKSA9PiB7IHNldE1lbW9yeVRpdGxlKG5vdGUudGl0bGUpOyBzZXRNZW1vcnlDb250ZW50KG5vdGUuY29udGVudCk7IHNldEFjdGlvblJlc3VsdCh0KCdub3Rlcy50b01lbW9yeURvbmUnKSkgfX0+XHVEODNFXHVEREUwIHt0KCdub3Rlcy50b01lbW9yeScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRFZGl0aW5nTm90ZSh7IGlkOiBub3RlLmlkLCB0aXRsZTogbm90ZS50aXRsZSwgY29udGVudDogbm90ZS5jb250ZW50LCB0YWdzOiAobm90ZS50YWdzID8/IFtdKS5qb2luKCcsICcpIH0pIH19Pnt0KCdub3Rlcy5lZGl0Jyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogJ1x1NTIyMFx1OTY2NFx1OEZEOVx1Njc2MVx1N0IxNFx1OEJCMFx1RkYxRicsIG1lc3NhZ2U6ICdcdTMwMEMnICsgbm90ZS50aXRsZSArICdcdTMwMERcdTVDMDZcdTg4QUJcdTZDMzhcdTRFNDVcdTUyMjBcdTk2NjRcdUZGMENcdTRFMERcdTUzRUZcdTYwNjJcdTU5MERcdTMwMDInLCBkYW5nZXI6IHRydWUsIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHJlbW92ZU5vdGUobm90ZS5pZCkgfSB9KSB9fT5cdTI3MTU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtpc1N1bW1hcnlcbiAgICAgICAgICAgICAgICAgICAgICA/IDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCAuLi4obG9uZyAmJiAhZXhwYW5kZWQgPyBzdHlsZXMubm90ZUNsYW1wIDoge30pIH19PntyZW5kZXJTdHJ1Y3R1cmVkQ29udGVudChub3RlLmNvbnRlbnQpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDogPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNvbnRlbnQsIC4uLihsb25nICYmICFleHBhbmRlZCA/IHN0eWxlcy5ub3RlQ2xhbXAgOiB7fSkgfX0+e25vdGUuY29udGVudH08L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgIHtsb25nICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMubGlua0J0bn0gb25DbGljaz17KCkgPT4geyBzZXROb3RlRXhwYW5kZWQoeyAuLi5ub3RlRXhwYW5kZWQsIFtub3RlLmlkXTogIWV4cGFuZGVkIH0pIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2V4cGFuZGVkID8gdCgnbm90ZXMuY29sbGFwc2UnKSA6IHQoJ25vdGVzLmV4cGFuZCcpfVx1RkYwOHtub3RlLmNvbnRlbnQubGVuZ3RofSBcdTVCNTdcdUZGMDlcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgeyhub3RlLnRhZ3MgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyhub3RlLnRhZ3MgPz8gW10pLm1hcCgodGFnKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3RhZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoJyMyNTYzZWInKSwgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlcjogJ25vbmUnLCBwYWRkaW5nOiAnMXB4IDhweCcsIGJvcmRlclJhZGl1czogJzk5OXB4JywgZm9udFNpemU6ICcxMHB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0Tm90ZVNlYXJjaCh0YWcpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID4je3RhZ308L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntuZXcgRGF0ZShub3RlLmNyZWF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAge25vdGUudXBkYXRlZEF0ICE9PSB1bmRlZmluZWQgJiYgbm90ZS51cGRhdGVkQXQgPiBub3RlLmNyZWF0ZWRBdCArIDEwMDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHVGRjA4e3QoJ25vdGVzLmVkaXRlZEF0Jyl9IHtuZXcgRGF0ZShub3RlLnVwZGF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX1cdUZGMDk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICB7aXNTdW1tYXJ5ICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyMyNTYzZWInKX0+e3QoJ25vdGVzLnN1bW1hcnlUYWcnKX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgIHtub3RlLnNoYSAhPT0gdW5kZWZpbmVkICYmIG5vdGUuc2hhICE9PSAnc3VtbWFyeScgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57bm90ZS5zaGEgPT09ICd3b3JraW5nJyA/IHQoJ3JlcG8ud29ya2luZycpIDogbm90ZS5zaGEuc2xpY2UoMCwgOCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgfSkoKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdtZW1vcnkuem9uZVRpdGxlJykgKyAocHJvamVjdCAhPT0gbnVsbCA/ICcgXHUwMEI3ICcgKyBwcm9qZWN0Lm5hbWUgOiAnJyl9PlxuICAgICAgICB7LyogXHU1NDBDXHU2QjY1XHU3MkI2XHU2MDAxXHU2NzYxXHVGRjFBXHU1N0ZBXHU3RUJGICsgXHU4NDNEXHU1NDBFXHU2M0QwXHU0RUE0XHU2NTcwICsgXHU1NDBDXHU2QjY1XHU2MzA5XHU5NEFFICsgXHU1NDBDXHU2QjY1XHU2MkE1XHU1NDRBICovfVxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzhweCcsIHBhZGRpbmc6ICc2cHggMTBweCcsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JyB9fT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnIH19Plx1RDgzRFx1REQwNCB7dCgnbWVtb3J5LnN5bmNCYXNlbGluZScpfVx1RkYxQTxiPnttZW1vcmllc0RhdGE/LmJhc2VsaW5lPy5zaGEgIT0gbnVsbCA/IG1lbW9yaWVzRGF0YS5iYXNlbGluZS5zaGEuc2xpY2UoMCwgOCkgOiB0KCdtZW1vcnkuc3luY05vbmUnKX08L2I+PC9zcGFuPlxuICAgICAgICAgIHttZW1vcmllc0RhdGE/LmJyYW5jaCAhPSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM1NjljZDYnKX0+e21lbW9yaWVzRGF0YS5icmFuY2h9PC9zcGFuPn1cbiAgICAgICAgICB7KG1lbW9yaWVzRGF0YT8uYmVoaW5kQ291bnQgPz8gMCkgPiAwICYmIChcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpIH19Pnt0KCdtZW1vcnkuYmVoaW5kJykucmVwbGFjZSgne259JywgU3RyaW5nKG1lbW9yaWVzRGF0YT8uYmVoaW5kQ291bnQgPz8gMCkpfTwvc3Bhbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gZGlzYWJsZWQ9e21lbW9yeVN5bmNpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzeW5jTWVtb3JpZXMoKSB9fT5cbiAgICAgICAgICAgIHttZW1vcnlTeW5jaW5nID8gdCgnbWVtb3J5LnN5bmNpbmcnKSA6ICdcdUQ4M0RcdUREMDQgJyArIHQoJ21lbW9yeS5zeW5jJyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7c3luY1JlcG9ydCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JywgcGFkZGluZzogJzhweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYmFja2dyb3VuZDogc3luY1JlcG9ydC5vayA9PT0gZmFsc2UgPyAncmdiYSgyMDksMzYsNDcsMC4wNiknIDogJ3JnYmEoNzgsMjAxLDE3NiwwLjA2KScsIGJvcmRlcjogJzFweCBzb2xpZCAnICsgKHN5bmNSZXBvcnQub2sgPT09IGZhbHNlID8gJ3JnYmEoMjA5LDM2LDQ3LDAuMyknIDogJ3JnYmEoNzgsMjAxLDE3NiwwLjMpJykgfX0+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fT57c3luY1JlcG9ydC5vayA9PT0gZmFsc2UgPyAnXHUyNzE3ICcgKyB0KCdtZW1vcnkuc3luY0ZhaWxlZCcpIDogJ1x1MjcxMyAnICsgKHN5bmNSZXBvcnQudmVyZGljdCA/PyAnJyl9PC9kaXY+XG4gICAgICAgICAgICB7c3luY1JlcG9ydC5vayAhPT0gZmFsc2UgJiYgKHN5bmNSZXBvcnQuc3RhbGVQcm9wb3NhbHMgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+e3QoJ21lbW9yeS5zdGFsZVRpdGxlJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgeyhzeW5jUmVwb3J0LnN0YWxlUHJvcG9zYWxzID8/IFtdKS5tYXAoKHByb3Bvc2FsKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17cHJvcG9zYWwuaWR9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpblRvcDogJzRweCcsIGZvbnRTaXplOiAnMTFweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0+e3Byb3Bvc2FsLnRpdGxlfSBcdTIwMTRcdTIwMTQge3Byb3Bvc2FsLnJlYXNvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzFweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhcHBseVN5bmMoW3Byb3Bvc2FsLmlkXSwgJ21hcmstc3RhbGUnKSB9fT57dCgnbWVtb3J5Lm1hcmtTdGFsZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcxcHggOHB4JywgZm9udFNpemU6ICcxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYXBwbHlTeW5jKFtwcm9wb3NhbC5pZF0sICdhcmNoaXZlJykgfX0+e3QoJ21lbW9yeS5hcmNoaXZlQnRuJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzFweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0U3luY1JlcG9ydCgocHJldmlvdXMpID0+IHByZXZpb3VzID09PSBudWxsID8gbnVsbCA6IHsgLi4ucHJldmlvdXMsIHN0YWxlUHJvcG9zYWxzOiAocHJldmlvdXMuc3RhbGVQcm9wb3NhbHMgPz8gW10pLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCAhPT0gcHJvcG9zYWwuaWQpIH0pIH19Pnt0KCdtZW1vcnkua2VlcEFjdGl2ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtzeW5jUmVwb3J0Lm9rICE9PSBmYWxzZSAmJiAoc3luY1JlcG9ydC5uZXdDYW5kaWRhdGVzID8/IFtdKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc2cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCB9fT57dCgnbWVtb3J5Lm5ld0NhbmRpZGF0ZXMnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgeyhzeW5jUmVwb3J0Lm5ld0NhbmRpZGF0ZXMgPz8gW10pLm1hcCgoY2FuZGlkYXRlLCBpbmRleCkgPT4gPGRpdiBrZXk9e2luZGV4fT5cdUZGMEIgW3tjYW5kaWRhdGUudHlwZX1dIHtjYW5kaWRhdGUudGl0bGV9PC9kaXY+KX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMubGlua0J0biwgbWFyZ2luVG9wOiAnNHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFN5bmNSZXBvcnQobnVsbCkgfX0+e3QoJ21lbW9yeS5jbG9zZVJlcG9ydCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICB7LyogXHU2MjRCXHU1MkE4XHU2REZCXHU1MkEwXHVGRjFBXHU2ODA3XHU5ODk4IC8gXHU3QzdCXHU1NzhCIC8gXHU0RjVDXHU3NTI4XHU1N0RGIC8gXHU1MTg1XHU1QkI5ICovfVxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLm1lbW9yeVRpdGxlJyl9IHZhbHVlPXttZW1vcnlUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeVRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17bWVtb3J5VHlwZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeVR5cGUoZS50YXJnZXQudmFsdWUpIH19PlxuICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKE1FTU9SWV9UWVBFX0xBQkVMUykubWFwKChbdmFsdWUsIGxhYmVsXSkgPT4gPG9wdGlvbiBrZXk9e3ZhbHVlfSB2YWx1ZT17dmFsdWV9PntsYWJlbH08L29wdGlvbj4pfVxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17bWVtb3J5U2NvcGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRNZW1vcnlTY29wZShlLnRhcmdldC52YWx1ZSBhcyAncHJvamVjdCcgfCAnYnJhbmNoJykgfX0+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicHJvamVjdFwiPnt0KCdtZW1vcnkuc2NvcGVQcm9qZWN0Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYnJhbmNoXCI+e3QoJ21lbW9yeS5zY29wZUJyYW5jaCcpfTwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSByb3dzPXszfSBwbGFjZWhvbGRlcj17dCgnZm9ybS5tZW1vcnlDb250ZW50Jyl9IHZhbHVlPXttZW1vcnlDb250ZW50fSBvbkNoYW5nZT17KGUpID0+IHsgc2V0TWVtb3J5Q29udGVudChlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgbWVtb3J5VGl0bGUudHJpbSgpID09PSAnJyB8fCBtZW1vcnlDb250ZW50LnRyaW0oKSA9PT0gJyd9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3JlY29yZE1lbW9yeScsICcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnknLCB7IG1lbW9yeVR5cGUsIHNjb3BlOiBtZW1vcnlTY29wZSwgdGl0bGU6IG1lbW9yeVRpdGxlLnRyaW0oKSwgY29udGVudDogbWVtb3J5Q29udGVudC50cmltKCkgfSkudGhlbihhc3luYyAoKSA9PiB7IHNldE1lbW9yeVRpdGxlKCcnKTsgc2V0TWVtb3J5Q29udGVudCgnJyk7IGF3YWl0IGxvYWRNZW1vcmllcygpIH0pIH19PlxuICAgICAgICAgICAgICB7YnVzeSA9PT0gJ3JlY29yZE1lbW9yeScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnbWVtb3J5LnJlY29yZCcpfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBhbGwgPSBtZW1vcmllc0RhdGE/Lm1lbW9yaWVzID8/IFtdXG4gICAgICAgICAgY29uc3QgcGVuZGluZyA9IGFsbC5maWx0ZXIoKG1lbW9yeSkgPT4gIW1lbW9yeS5pc0h1bWFuQ29uZmlybWVkICYmIG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnKVxuICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IGFsbC5maWx0ZXIoKG1lbW9yeSkgPT4gbWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZScpXG4gICAgICAgICAgY29uc3QgZ3JvdXBlZCA9IG5ldyBNYXA8c3RyaW5nLCBNZW1vcnlFbnRyeVtdPigpXG4gICAgICAgICAgZm9yIChjb25zdCBtZW1vcnkgb2YgYWN0aXZlKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gZ3JvdXBlZC5nZXQobWVtb3J5LnR5cGUpID8/IFtdXG4gICAgICAgICAgICBsaXN0LnB1c2gobWVtb3J5KVxuICAgICAgICAgICAgZ3JvdXBlZC5zZXQobWVtb3J5LnR5cGUsIGxpc3QpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICB7cGVuZGluZy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+XHUyM0YzIHt0KCdtZW1vcnkucGVuZGluZ1F1ZXVlJyl9XHVGRjA4e1N0cmluZyhwZW5kaW5nLmxlbmd0aCl9XHVGRjA5PC9kaXY+XG4gICAgICAgICAgICAgICAgICB7cGVuZGluZy5tYXAoKG1lbW9yeSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17bWVtb3J5LmlkfSBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNhcmQsIGJvcmRlckNvbG9yOiAncmdiYSgzNyw5OSwyMzUsMC4zKScsIGJhY2tncm91bmQ6ICdyZ2JhKDM3LDk5LDIzNSwwLjAzKScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e21lbW9yeS50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgY29uZmlybU1lbW9yeShtZW1vcnkuaWQpLnRoZW4oKCkgPT4geyB2b2lkIGxvYWRNZW1vcmllcygpIH0pIH19Pnt0KCdtZW1vcnkuY29uZmlybScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5QWN0aW9uKCdzdGF0dXMnLCB7IGlkOiBtZW1vcnkuaWQsIHN0YXR1czogJ2FyY2hpdmVkJyB9KSB9fT57dCgnbWVtb3J5LmFyY2hpdmVCdG4nKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlQ29udGVudH0+e21lbW9yeS5jb250ZW50fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlTWV0YX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCdyZ2JhKDM3LDk5LDIzNSwwLjE1KScpfT57TUVNT1JZX1NPVVJDRV9MQUJFTFNbbWVtb3J5LnNvdXJjZVRhZ10gPz8gbWVtb3J5LnNvdXJjZVRhZ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LmJhc2lzU2hhICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e21lbW9yeS5iYXNpc1NoYS5zbGljZSgwLCA4KX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7Wy4uLmdyb3VwZWQuZW50cmllcygpXS5tYXAoKFt0eXBlLCBpdGVtc10pID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17dHlwZX0gc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2VjdGlvblRpdGxlfT57TUVNT1JZX1RZUEVfTEFCRUxTW3R5cGVdID8/IHR5cGV9XHVGRjA4e1N0cmluZyhpdGVtcy5sZW5ndGgpfVx1RkYwOTwvZGl2PlxuICAgICAgICAgICAgICAgICAge2l0ZW1zLm1hcCgobWVtb3J5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXttZW1vcnkuaWR9IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ2FyZCwgb3BhY2l0eTogbWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZScgPyAxIDogMC42IH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVRleHR9PnttZW1vcnkuaXNIdW1hbkNvbmZpcm1lZCA/ICdcdTI3MDUgJyA6ICcnfXttZW1vcnkudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFNocmluazogMCwgZmxleFdyYXA6ICd3cmFwJywganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHshbWVtb3J5LmlzSHVtYW5Db25maXJtZWQgJiYgbWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJ1dHRvbiwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBjb25maXJtTWVtb3J5KG1lbW9yeS5pZCkudGhlbigoKSA9PiB7IHZvaWQgbG9hZE1lbW9yaWVzKCkgfSkgfX0+e3QoJ21lbW9yeS5jb25maXJtJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5VG9Ob3RlKG1lbW9yeSkgfX0+XHVEODNEXHVEQ0M0IHt0KCdtZW1vcnkudG9Ob3RlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc2NvcGUgPT09ICdicmFuY2gnICYmIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ25vcm1hbGl6ZScsIHsgaWQ6IG1lbW9yeS5pZCB9KSB9fT5cdTIxRjEge3QoJ21lbW9yeS5ub3JtYWxpemUnKX08L2J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeUFjdGlvbignc3RhdHVzJywgeyBpZDogbWVtb3J5LmlkLCBzdGF0dXM6ICdhcmNoaXZlZCcgfSkgfX0+e3QoJ21lbW9yeS5hcmNoaXZlQnRuJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5QWN0aW9uKCdzdGF0dXMnLCB7IGlkOiBtZW1vcnkuaWQsIHN0YXR1czogJ2FjdGl2ZScgfSkgfX0+e3QoJ21lbW9yeS5yZXN0b3JlJyl9PC9idXR0b24+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNvbnRlbnQsIG1heEhlaWdodDogODQsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT57bWVtb3J5LmNvbnRlbnR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVNZXRhfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc3RhdHVzID09PSAnc3RhbGUnICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNkOTc3MDYnKX0+e3QoJ21lbW9yeS5zdGF0dXNTdGFsZScpfTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnNjb3BlID09PSAnYnJhbmNoJyAmJiBtZW1vcnkuZ2l0QnJhbmNoICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM1NjljZDYnKX0+XHUyMzg3IHttZW1vcnkuZ2l0QnJhbmNofTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCdyZ2JhKDM3LDk5LDIzNSwwLjE1KScpfT57TUVNT1JZX1NPVVJDRV9MQUJFTFNbbWVtb3J5LnNvdXJjZVRhZ10gPz8gbWVtb3J5LnNvdXJjZVRhZ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LmJhc2lzU2hhICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e21lbW9yeS5iYXNpc1NoYS5zbGljZSgwLCA4KX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e25ldyBEYXRlKG1lbW9yeS51cGRhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAge2FsbC5sZW5ndGggPT09IDAgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnbWVtb3J5LmVtcHR5Jyl9PC9kaXY+fVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKVxuICAgICAgICB9KSgpfVxuICAgICAgPC9DYXJkPlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2NvbmNlcHRzLnRpdGxlJyl9PlxuICAgICAgICB7Y29uY2VwdHMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2NvbmNlcHRzLm5vbmUnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57Wydjb25jZXB0cy5jb2wubmFtZScsICdjb25jZXB0cy5jb2wuY2F0ZWdvcnknLCAnY29uY2VwdHMuY29sLmNvdW50J10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtjb25jZXB0cy5tYXAoKGNvbmNlcHQpID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtjb25jZXB0LmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Y29uY2VwdC5uYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2NvbmNlcHQuY2F0ZWdvcnl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57U3RyaW5nKGNvbmNlcHQub2NjdXJyZW5jZXMpfTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgPC8+XG4gIClcblxuICAvLyBcdTI1MDBcdTI1MDAgUmV2aWV3IFx1OTVFRVx1OTg5OFx1OTg3NVx1N0I3RVx1RkYxQVx1NTE2OFx1OTFDRlx1OTVFRVx1OTg5OFx1NzcwQlx1Njc3Rlx1RkYwOFx1N0VERlx1OEJBMSArIFx1N0I1Qlx1OTAwOSArIFx1NzJCNlx1NjAwMVx1NkQ0MVx1OEY2Q1x1RkYwOSsgXHU5QThDXHU2NTM2XHU4QkIwXHU1RjU1IFx1MjUwMFx1MjUwMFxuICBjb25zdCByZXZpZXdUYWIgPSAoXG4gICAgPD5cbiAgICAgIHtyZXN1bHRQYW5lbH1cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdyZXZpZXcucmVjb3Jkc1RpdGxlJyl9PlxuICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBhbGwgPSAoaXNzdWVzRGF0YSA/PyBbXSkubWFwKChpc3N1ZSkgPT4gKHsgLi4uaXNzdWUsIHNldmVyaXR5OiBub3JtYWxpemVJc3N1ZVNldmVyaXR5KGlzc3VlLnNldmVyaXR5KSB9KSlcbiAgICAgICAgICBjb25zdCBvcGVuQ291bnQgPSBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykubGVuZ3RoXG4gICAgICAgICAgY29uc3QgY291bnRzOiBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH0+ID0gW1xuICAgICAgICAgICAgeyBrZXk6ICcnLCBsYWJlbDogdCgncmV2aWV3LmZpbHRlckFsbCcpLCBjb3VudDogYWxsLmxlbmd0aCB9LFxuICAgICAgICAgICAgeyBrZXk6ICdjcml0aWNhbCcsIGxhYmVsOiAnY3JpdGljYWwnLCBjb3VudDogYWxsLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IGlzc3VlLnNldmVyaXR5ID09PSAnYmxvY2tlcicpLmxlbmd0aCB9LFxuICAgICAgICAgICAgeyBrZXk6ICdtYWpvcicsIGxhYmVsOiAnbWFqb3InLCBjb3VudDogYWxsLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnNldmVyaXR5ID09PSAnbWFqb3InKS5sZW5ndGggfSxcbiAgICAgICAgICAgIHsga2V5OiAnbWlub3InLCBsYWJlbDogJ21pbm9yJywgY291bnQ6IGFsbC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zZXZlcml0eSA9PT0gJ21pbm9yJykubGVuZ3RoIH0sXG4gICAgICAgICAgICB7IGtleTogJ2luZm8nLCBsYWJlbDogJ2luZm8nLCBjb3VudDogYWxsLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnNldmVyaXR5ID09PSAnaW5mbycpLmxlbmd0aCB9LFxuICAgICAgICAgIF1cbiAgICAgICAgICBjb25zdCB2aXNpYmxlID0gYWxsXG4gICAgICAgICAgICAuZmlsdGVyKChpc3N1ZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoaXNzdWVTZXZlcml0eUZpbHRlciA9PT0gJycpIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgIGlmIChpc3N1ZVNldmVyaXR5RmlsdGVyID09PSAnY3JpdGljYWwnKSByZXR1cm4gaXNzdWUuc2V2ZXJpdHkgPT09ICdjcml0aWNhbCcgfHwgaXNzdWUuc2V2ZXJpdHkgPT09ICdibG9ja2VyJ1xuICAgICAgICAgICAgICByZXR1cm4gaXNzdWUuc2V2ZXJpdHkgPT09IGlzc3VlU2V2ZXJpdHlGaWx0ZXJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWVTdGF0dXNGaWx0ZXIgPT09ICcnIHx8IGlzc3VlLnN0YXR1cyA9PT0gaXNzdWVTdGF0dXNGaWx0ZXIpXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAge2NvdW50cy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxidXR0b24ga2V5PXtpdGVtLmtleSA9PT0gJycgPyAnYWxsJyA6IGl0ZW0ua2V5fSBzdHlsZT17c3R5bGVzLmNoaXAoaXNzdWVTZXZlcml0eUZpbHRlciA9PT0gaXRlbS5rZXkpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldElzc3VlU2V2ZXJpdHlGaWx0ZXIoaXRlbS5rZXkpIH19PlxuICAgICAgICAgICAgICAgICAgICB7aXRlbS5sYWJlbH0gXHUwMEI3IHtpdGVtLmNvdW50fVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICAgICAge29wZW5Db3VudH0gXHU1Rjg1XHU1OTA0XHU3NDA2IC8gXHU1MTcxIHthbGwubGVuZ3RofVxuICAgICAgICAgICAgICAgICAgeyhzdGF0ZT8ucmVzb2x2ZWRJc3N1ZVJldGVudGlvbkRheXMgPz8gMCkgPiAwID8gYCBcdTAwQjcgJHt0KCdyZXZpZXcucmV0ZW50aW9uSGludCcpLnJlcGxhY2UoJ3tkYXlzfScsIFN0cmluZyhzdGF0ZT8ucmVzb2x2ZWRJc3N1ZVJldGVudGlvbkRheXMgPz8gNykpfWAgOiAnJ31cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDhweCcgfX0gdmFsdWU9e2lzc3VlU3RhdHVzRmlsdGVyfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0SXNzdWVTdGF0dXNGaWx0ZXIoZS50YXJnZXQudmFsdWUpIH19PlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt0KCdyZXZpZXcuc3RhdHVzQWxsJyl9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoSVNTVUVfU1RBVFVTX0xBQkVMUykubWFwKChbdmFsdWUsIGxhYmVsXSkgPT4gPG9wdGlvbiBrZXk9e3ZhbHVlfSB2YWx1ZT17dmFsdWV9PntsYWJlbH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkSXNzdWVzKCkgfX0+e3QoJ3Jldmlldy5yZWZyZXNoJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7YWxsLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pntpc3N1ZXNEYXRhID09PSBudWxsID8gJ1x1MjAyNicgOiB0KCdyZXZpZXcucmVjb3Jkc0VtcHR5Jyl9PC9kaXY+XG4gICAgICAgICAgICAgICkgOiB2aXNpYmxlLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdub3Rlcy5lbXB0eVNlYXJjaCcpfTwvZGl2PlxuICAgICAgICAgICAgICApIDogdmlzaWJsZS5tYXAoKGlzc3VlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXhwYW5kZWQgPSBpc3N1ZUV4cGFuZGVkW2lzc3VlLmlkXSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gaXNzdWUuZGVzY3JpcHRpb24gPz8gJydcbiAgICAgICAgICAgICAgICBjb25zdCBsb25nID0gZGVzY3JpcHRpb24ubGVuZ3RoID4gMjAwXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpc3N1ZS5pZH0gc3R5bGU9e3N0eWxlcy5ub3RlQ2FyZH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2Uoc2V2ZXJpdHlDb2xvcihpc3N1ZS5zZXZlcml0eSkpfT57aXNzdWUuc2V2ZXJpdHl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge2lzc3VlLmNhdGVnb3J5ID8gPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzU3NjA2YScpfT57aXNzdWUuY2F0ZWdvcnl9PC9zcGFuPiA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycgPyAnI2RjZGNhYScgOiBpc3N1ZS5zdGF0dXMgPT09ICdyZXNvbHZlZCcgfHwgaXNzdWUuc3RhdHVzID09PSAnYWNjZXB0ZWQnID8gJyM0ZWM5YjAnIDogJyM4YjhiOGInKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtJU1NVRV9TVEFUVVNfTEFCRUxTW2lzc3VlLnN0YXR1c10gPz8gaXNzdWUuc3RhdHVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVUZXh0fT57aXNzdWUudGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dmVyaWZ5aW5nVGFyZ2V0ICE9PSBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcudmVyaWZ5SGludCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCB2ZXJpZnlJc3N1ZXMoaXNzdWUuY2hhbmdlSWQpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID57dmVyaWZ5aW5nVGFyZ2V0ID09PSBpc3N1ZS5jaGFuZ2VJZCA/IHQoJ3Jldmlldy52ZXJpZnlSdW5uaW5nJykgOiAnXHVEODNEXHVERDBEICcgKyB0KCdyZXZpZXcudmVyaWZ5Jyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgncmV2aWV3LmZhbHNlUG9zaXRpdmVIaW50Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29uZmlybURpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0KCdyZXZpZXcuZmFsc2VQb3NpdGl2ZVRpdGxlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHQoJ3Jldmlldy5mYWxzZVBvc2l0aXZlTXNnJykucmVwbGFjZSgne3RpdGxlfScsIGlzc3VlLnRpdGxlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFuZ2VyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaXNzdWVzL3N0YXR1cycsIHsgaWQ6IGlzc3VlLmlkLCBzdGF0dXM6ICdyZWplY3RlZCcgfSkudGhlbihhc3luYyAoeyBvayB9KSA9PiB7IGlmIChvaykgYXdhaXQgbG9hZElzc3VlcygpIH0pIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdURFQUIge3QoJ3Jldmlldy5mYWxzZVBvc2l0aXZlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2Rlc2NyaXB0aW9uICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNvbnRlbnQsIC4uLihsb25nICYmICFleHBhbmRlZCA/IHN0eWxlcy5ub3RlQ2xhbXAgOiB7fSkgfX0+e3JlbmRlcldpdGhQZWVrKGRlc2NyaXB0aW9uKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge2lzc3VlLnJlc29sdXRpb24gPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc2cHgnLCBwYWRkaW5nOiAnNnB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBiYWNrZ3JvdW5kOiAncmdiYSg3OCwgMjAxLCAxNzYsIDAuMDgpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoNzgsIDIwMSwgMTc2LCAwLjM1KScsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIFx1MjcxMyB7aXNzdWUucmVzb2x1dGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4U3RhdHMgIT0gbnVsbCB8fCBCb29sZWFuKGlzc3VlLmZpeERpZmYpKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmxpbmtCdG4sIG1hcmdpblRvcDogJzRweCcsIGRpc3BsYXk6ICdibG9jaycgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRGaXhFeHBhbmRlZCgocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBbaXNzdWUuaWRdOiAhKHByZXZpb3VzW2lzc3VlLmlkXSA9PT0gdHJ1ZSkgfSkpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFx1RDgzRFx1REQyNyB7dCgncmV2aWV3LmZpeERldGFpbCcpfVx1RkYwOHtTdHJpbmcoaXNzdWUuZml4U3RhdHM/LmZpbGVzID8/IDApfSB7dCgncmV2aWV3LmZpeFN0YXRGaWxlcycpfSBcdTAwQjcgK3tTdHJpbmcoaXNzdWUuZml4U3RhdHM/Lmluc2VydGlvbnMgPz8gMCl9IFx1MjIxMntTdHJpbmcoaXNzdWUuZml4U3RhdHM/LmRlbGV0aW9ucyA/PyAwKX1cdUZGMDl7Zml4RXhwYW5kZWRbaXNzdWUuaWRdID09PSB0cnVlID8gJ1x1MjVCMicgOiAnXHUyNUJDJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAge2ZpeEV4cGFuZGVkW2lzc3VlLmlkXSA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4RmlsZXMgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnM3B4JyB9fT57dCgncmV2aWV3LmZpeEZpbGVzJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4RmlsZXMgPz8gW10pLm1hcCgoZmlsZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtmaWxlfSBzdHlsZT17eyBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJywgZm9udFNpemU6ICcxMXB4JyB9fT57ZmlsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4SW1wYWN0ID8/IFtdKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzNweCcgfX0+e3QoJ3Jldmlldy5maXhJbXBhY3QnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzc3VlLmZpeEltcGFjdC5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5LnN5bWJvbH0gc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnNXB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyMwOTY5ZGEnKX0+e2VudHJ5LnN5bWJvbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsnICd9e3QoJ3Jldmlldy5kZWZpbmVkSW4nKX0ge2VudHJ5LmRlZmluZWRJbn0gXHUwMEI3IHtTdHJpbmcoZW50cnkuY2FsbGVycy5sZW5ndGgpfSB7dCgncmV2aWV3LmNhbGxDb3VudCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5jYWxsZXJzLnNsaWNlKDAsIDUpLm1hcCgoY2FsbGVyLCBjYWxsZXJJbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17Y2FsbGVySW5kZXh9IHN0eWxlPXt7IGZvbnRTaXplOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBwYWRkaW5nTGVmdDogJzEycHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSBkb3R0ZWQnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBvcGVuUGVlayhjYWxsZXIuZmlsZSwgTnVtYmVyKGNhbGxlci5saW5lKSkgfX0+e2NhbGxlci5maWxlfTp7Y2FsbGVyLmxpbmV9PC9zcGFuPiB7Y2FsbGVyLnNuaXBwZXQuc2xpY2UoMCwgODApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge0Jvb2xlYW4oaXNzdWUuZml4RGlmZikgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzNweCcgfX0+e3QoJ3Jldmlldy5maXhEaWZmJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1pbnNldCwgcmdiYSg1LDUsNSwwLjAzKSknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnNnB4IDhweCcsIG1heEhlaWdodDogJzMwMHB4Jywgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3JlbmRlckRpZmZMaW5lcyhpc3N1ZS5maXhEaWZmKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtsb25nICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMubGlua0J0bn0gb25DbGljaz17KCkgPT4geyBzZXRJc3N1ZUV4cGFuZGVkKHsgLi4uaXNzdWVFeHBhbmRlZCwgW2lzc3VlLmlkXTogIWV4cGFuZGVkIH0pIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2V4cGFuZGVkID8gdCgnbm90ZXMuY29sbGFwc2UnKSA6IHQoJ25vdGVzLmV4cGFuZCcpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0KCdyZXZpZXcudGFyZ2V0Jyl9OiB7aXNzdWVUYXJnZXRMYWJlbChpc3N1ZS5jaGFuZ2VJZCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntmb3JtYXRUaW1lKGlzc3VlLmNyZWF0ZWRBdCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApXG4gICAgICAgIH0pKCl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgndmVyaWZ5LnJlY29yZHMnKX0+XG4gICAgICAgIHt2ZXJpZmljYXRpb25zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCd2ZXJpZnkucmVjb3Jkc0VtcHR5Jyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7dmVyaWZpY2F0aW9ucy5zbGljZSgwLCAyMCkubWFwKChyZWNvcmQpID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtyZWNvcmQuaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UocmVjb3JkLnN0YXR1cyA9PT0gJ3Bhc3NlZCcgPyAnIzRlYzliMCcgOiAnI2RjZGNhYScpfT57cmVjb3JkLnN0YXR1c308L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57cmVjb3JkLm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Zm9ybWF0VGltZShyZWNvcmQuY3JlYXRlZEF0KX08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgIDwvPlxuICApXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm9vdH0gZGF0YS10ZXN0aWQ9XCJwcm9qZWN0LWNvbnRyb2wtd29ya3NwYWNlXCI+XG4gICAgICB7cHJvcHMubGF5b3V0TW9kZSAhPT0gJ292ZXJsYXknICYmIDxzdHlsZT57TEFZT1VUX1NUWUxFfTwvc3R5bGU+fVxuICAgICAge3Byb3BzLmxheW91dE1vZGUgIT09ICdvdmVybGF5JyAmJiA8ZGl2XG4gICAgICAgIGRhdGEtdGVzdGlkPVwicHJvamVjdC1jb250cm9sLWRpdmlkZXJcIlxuICAgICAgICBvblBvaW50ZXJEb3duPXtvbkRpdmlkZXJEb3dufVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IC00LCB3aWR0aDogOCxcbiAgICAgICAgICBjdXJzb3I6ICdjb2wtcmVzaXplJywgekluZGV4OiAyMCxcbiAgICAgICAgfX1cbiAgICAgIC8+fVxuICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5hdn0+XG4gICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMudGl0bGV9Pnt0KCd3b3Jrc3BhY2UudGl0bGUnKX08L3NwYW4+XG4gICAgICAgIHt0YWJzLm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICA8YnV0dG9uIGtleT17ZW50cnkua2V5fSBzdHlsZT17c3R5bGVzLnRhYih0YWIgPT09IGVudHJ5LmtleSl9IG9uQ2xpY2s9eygpID0+IHsgc2V0VGFiKGVudHJ5LmtleSkgfX0+e2VudHJ5LmxhYmVsfTwvYnV0dG9uPlxuICAgICAgICApKX1cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcnVubmluZ0NvdW50ID0gcnVucy5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5zdGF0dXMgPT09ICdydW5uaW5nJyB8fCBlbnRyeS5zdGF0dXMgPT09ICdxdWV1ZWQnIHx8IGVudHJ5LnN0YXR1cyA9PT0gJ3ZlcmlmeWluZycpLmxlbmd0aFxuICAgICAgICAgIGNvbnN0IGZhaWxlZENvdW50ID0gcnVucy5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5zdGF0dXMgPT09ICdmYWlsZWQnIHx8IGVudHJ5LnN0YXR1cyA9PT0gJ3BhdXNlZCcpLmxlbmd0aFxuICAgICAgICAgIGlmIChydW5uaW5nQ291bnQgPT09IDAgJiYgZmFpbGVkQ291bnQgPT09IDApIHJldHVybiBudWxsXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgbWFyZ2luTGVmdDogJzRweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICB7cnVubmluZ0NvdW50ID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UodGhlbWVBd2FyZVRleHQoJyMyNTYzZWInKSksIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXI6ICdub25lJyB9fSB0aXRsZT17dCgnYmFkZ2UucnVubmluZycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhydW5uaW5nQ291bnQpKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0VGFiKCdleGVjdXRpb24nKSB9fT5cdTI1QjYge1N0cmluZyhydW5uaW5nQ291bnQpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7ZmFpbGVkQ291bnQgPiAwICYmIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5iYWRnZSh0aGVtZUF3YXJlVGV4dCgnI2YxNGM0YycpKSwgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlcjogJ25vbmUnIH19IHRpdGxlPXt0KCdiYWRnZS5mYWlsZWQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoZmFpbGVkQ291bnQpKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0VGFiKCdleGVjdXRpb24nKSB9fT5cdTI3MTcge1N0cmluZyhmYWlsZWRDb3VudCl9PC9idXR0b24+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKVxuICAgICAgICB9KSgpfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuYm9keX0+XG4gICAgICAgIHtwcm9wcy5zZXNzaW9uSWQgPT09IHVuZGVmaW5lZCB8fCBwcm9wcy5zZXNzaW9uSWQgPT09ICcnID8gPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnd29ya3NwYWNlLnNlbGVjdFNlc3Npb24nKX08L2Rpdj4gOiA8PlxuICAgICAgICAgIHtsb2FkRXJyb3IgIT09IG51bGwgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZXJyb3IubG9hZCcpfToge2xvYWRFcnJvcn08L2Rpdj59XG4gICAgICAgICAge3N0YXRlPy5yZWFkeSA9PT0gZmFsc2UgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57c3RhdGUucmVhc29uID8/ICcnfTwvZGl2Pn1cbiAgICAgICAgICB7dGFiID09PSAnY29tbWl0cycgJiYgY29tbWl0c1RhYn1cbiAgICAgICAgICB7dGFiID09PSAnb3ZlcnZpZXcnICYmIG92ZXJ2aWV3VGFifVxuICAgICAgICAgIHt0YWIgPT09ICdleGVjdXRpb24nICYmIGV4ZWN1dGlvblRhYn1cbiAgICAgICAgICB7dGFiID09PSAncmV2aWV3JyAmJiByZXZpZXdUYWJ9XG4gICAgICAgICAge3RhYiA9PT0gJ25vdGVzJyAmJiBub3Rlc1RhYn1cbiAgICAgICAgICB7dGFiID09PSAnc2V0dGluZ3MnICYmIHNldHRpbmdzVGFifVxuICAgICAgICA8Lz59XG4gICAgICA8L2Rpdj5cbiAgICAgIHtjb25maXJtRGlhbG9nICE9PSBudWxsICYmIChcbiAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICB0aXRsZT17Y29uZmlybURpYWxvZy50aXRsZX1cbiAgICAgICAgICBtZXNzYWdlPXtjb25maXJtRGlhbG9nLm1lc3NhZ2V9XG4gICAgICAgICAgZGFuZ2VyPXtjb25maXJtRGlhbG9nLmRhbmdlcn1cbiAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKG51bGwpIH19XG4gICAgICAgICAgb25Db25maXJtPXsoKSA9PiB7IGNvbmZpcm1EaWFsb2cub25Db25maXJtKCk7IHNldENvbmZpcm1EaWFsb2cobnVsbCkgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7cGVlayAhPT0gbnVsbCAmJiAoXG4gICAgICAgIDxkaXYgZGF0YS10ZXN0aWQ9XCJwYy1wZWVrLW92ZXJsYXlcIiBzdHlsZT17eyBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIGJhY2tncm91bmQ6ICdyZ2JhKDE1LDIzLDQyLDAuNDUpJywgYmFja2Ryb3BGaWx0ZXI6ICdibHVyKDJweCknLCB6SW5kZXg6IDEwMDAsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBlZWsobnVsbCkgfX0+XG4gICAgICAgICAgPGRpdiBkYXRhLXRlc3RpZD1cInBjLXBlZWstY2FyZFwiIHN0eWxlPXt7IHdpZHRoOiAnbWluKDc2MHB4LCA5MnZ3KScsIG1heEhlaWdodDogJzgwdmgnLCBvdmVyZmxvdzogJ2hpZGRlbicsIGJvcmRlclJhZGl1czogJzEwcHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm94U2hhZG93OiAnMCAxNnB4IDQ4cHggcmdiYSgwLDAsMCwwLjI1KScsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicgfX0gb25DbGljaz17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKSB9fT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgcGFkZGluZzogJzEwcHggMTRweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJyB9fT5cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCwgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57cGVlay5wYXRofTp7U3RyaW5nKHBlZWsubGluZSl9PC9zcGFuPlxuICAgICAgICAgICAgICB7cGVla0RhdGE/LmV4aXN0cyA9PT0gdHJ1ZSAmJiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57U3RyaW5nKHBlZWtEYXRhLnN0YXJ0TGluZSl9XHUyMDEze1N0cmluZyhwZWVrRGF0YS5lbmRMaW5lKX0gLyB7U3RyaW5nKHBlZWtEYXRhLnRvdGFsTGluZXMpfSBcdTg4NEM8L3NwYW4+fVxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCAxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBlZWsobnVsbCkgfX0+XHUyNzE1PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3c6ICdhdXRvJywgcGFkZGluZzogJzEwcHggMCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctaW5zZXQsIHJnYmEoNSw1LDUsMC4wMykpJyB9fT5cbiAgICAgICAgICAgICAge3BlZWtCdXN5ICYmIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLmVtcHR5IH19Plx1OEJGQlx1NTNENlx1NEUyRFx1MjAyNjwvZGl2Pn1cbiAgICAgICAgICAgICAgeyFwZWVrQnVzeSAmJiBwZWVrRGF0YSAhPT0gbnVsbCAmJiBwZWVrRGF0YS5leGlzdHMgPT09IGZhbHNlICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+XHU2NTg3XHU0RUY2XHU0RTBEXHU1QjU4XHU1NzI4XHVGRjA4XHU1M0VGXHU4MEZEXHU1REYyXHU4OEFCXHU1MjIwXHU5NjY0XHU2MjE2XHU3OUZCXHU1MkE4XHVGRjA5PC9kaXY+fVxuICAgICAgICAgICAgICB7IXBlZWtCdXN5ICYmIHBlZWtEYXRhPy5leGlzdHMgPT09IHRydWUgJiYgKHBlZWtEYXRhLmxpbmVzID8/IFtdKS5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5Lm59IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIHBhZGRpbmc6ICcwIDE0cHgnLCBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJywgZm9udFNpemU6ICcxMS41cHgnLCBsaW5lSGVpZ2h0OiAxLjcsIGJhY2tncm91bmQ6IGVudHJ5Lm4gPT09IHBlZWsubGluZSA/ICdyZ2JhKDM3LDk5LDIzNSwwLjA4KScgOiAndHJhbnNwYXJlbnQnIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2lkdGg6IDQwLCB0ZXh0QWxpZ246ICdyaWdodCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmbGV4U2hyaW5rOiAwIH19PntTdHJpbmcoZW50cnkubil9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57ZW50cnkudGV4dCA9PT0gJycgPyAnXFx1MDBBMCcgOiBlbnRyeS50ZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApXG59XG4iLCAiLyoqXG4gKiBcdTYzRDBcdTRFQTRcdThGNkVcdTZCMjFcdTgwNUFcdTdDN0JcdUZGMDhcdTVCQTJcdTYyMzdcdTdBRUZcdUZGMDlcdUZGMUFcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTUzRjBcdTc2ODRcdTRFMEJcdTYyQzlcdTY4NDZcdTYzMDlcdTMwMENcdTRFMDBcdThGNkVcdTVERTVcdTRGNUNcdTMwMERcdTUyMDZcdTdFQzRcdTVDNTVcdTc5M0FcdTMwMDJcbiAqIFx1NEUwRSBydW50aW1lL2hpc3RvcnkudHMgXHU3Njg0IGNsdXN0ZXJDb21taXRzIFx1NEZERFx1NjMwMVx1NTQwQ1x1NEUwMFx1NTQyRlx1NTNEMVx1NUYwRlx1RkYwOFYxLjAgXHUwMEE3OTcvXHUwMEE3OTlcdUZGMDlcdUZGMUFcbiAqIFx1NzZGOFx1OTBCQlx1NjNEMFx1NEVBNFx1NjVGNlx1OTVGNFx1OTVGNFx1OTY5NFx1OEQ4NVx1OEZDN1x1N0E5N1x1NTNFM1x1RkYwOFx1OUVEOFx1OEJBNCAzNmhcdUZGMDlcdTUyMDdcdTY1QURcdUZGMUJcdThGREVcdTdFRUQgXHUyMjY1MyBcdTRFMkFcdTYzRDBcdTRFQTRcdTU0MEVcdTRFMEVcdTVERjJcdTgwNUFcdTY1ODdcdTRFRjZcbiAqIFx1OTZGNlx1OTFDRFx1NTNFMFx1NEU1Rlx1NTIwN1x1NjVBRFx1MzAwMlx1NjcwRFx1NTJBMVx1N0FFRlx1OTBBM1x1NEVGRFx1NURFNVx1NEY1Q1x1NTcyOCBnaXQgXHU2MjZCXHU2M0NGXHU1QzQyXHVGRjA4XHU5MUNEXHU1RUZBXHU1Mzg2XHU1M0YyXHVGRjA5XHVGRjBDXHU4RkQ5XHU0RUZEXHU5NzYyXHU1NDExXG4gKiAvY29tbWl0cyBcdThGRDRcdTU2REVcdTc2ODRcdTYzRDBcdTRFQTRcdTY3NjFcdTc2RUVcdTIwMTRcdTIwMTRcdTRFMjRcdTU5MDRcdTg5QzRcdTUyMTlcdTY1MzlcdTUyQThcdTVGQzVcdTk4N0JcdTU0MENcdTZCNjVcdTMwMDJcbiAqXG4gKiBAbW9kdWxlIGRzaC1jbGllbnQtcHJvamVjdC1jb250cm9sL2NvbXBvbmVudHMvY29tbWl0LXJvdW5kc1xuICovXG5cbi8qKiBcdTgwNUFcdTdDN0JcdThGOTNcdTUxNjVcdTc2ODRcdTY3MDBcdTVDMEZcdTVGNjJcdTcyQjZcdUZGMDgvY29tbWl0cyBcdTc2ODRcdTYzRDBcdTRFQTRcdTY3NjFcdTc2RUVcdTVCNTBcdTk2QzZcdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBpbnRlcmZhY2UgUm91bmRDb21taXQge1xuICBzaGE6IHN0cmluZ1xuICAvKiogXHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0XHVGRjA4XHU2QkVCXHU3OUQyXHVGRjA5XHUzMDAyICovXG4gIGRhdGU6IG51bWJlclxuICAvKiogXHU2RDg5XHU1M0NBXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0XHVGRjA4XHU3NkY4XHU1QkY5XHU0RUQzXHU1RTkzXHU2ODM5XHVGRjA5XHUzMDAyICovXG4gIGZpbGVzOiBzdHJpbmdbXVxufVxuXG4vKiogXHU0RTAwXHU4RjZFXHU1REU1XHU0RjVDXHVGRjFBXHU0RkREXHU2MzAxXHU0RjIwXHU1MTY1XHU5ODdBXHU1RThGXHU3Njg0XHU2M0QwXHU0RUE0XHU1MjE3XHU4ODY4XHVGRjA4L2NvbW1pdHMgXHU0RTNBXHU2NUIwXHUyMTkyXHU2NUU3XHVGRjA5KyBcdTY1RjZcdTk1RjRcdTgzMDNcdTU2RjRcdTMwMDIgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0Um91bmQge1xuICBjb21taXRzOiBSb3VuZENvbW1pdFtdXG4gIC8qKiBcdThGNkVcdTUxODVcdTY3MDBcdTY1RTlcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdTMwMDIgKi9cbiAgZmlyc3RBdDogbnVtYmVyXG4gIC8qKiBcdThGNkVcdTUxODVcdTY3MDBcdTY2NUFcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdTMwMDIgKi9cbiAgbGFzdEF0OiBudW1iZXJcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUk9VTkRfR0FQX01TID0gMzYgKiA2MCAqIDYwICogMTAwMFxuXG4vKiogXHU0RTBFXHU2NzBEXHU1MkExXHU3QUVGIGNsdXN0ZXJDb21taXRzIFx1NzZGOFx1NTQwQ1x1NzY4NFx1OTFDRFx1NTNFMFx1NzM4N1x1RkYxQVx1NTQ3RFx1NEUyRFx1NjU4N1x1NEVGNlx1NjU3MCAvIG1heChcdTY3MkNcdTYzRDBcdTRFQTRcdTY1ODdcdTRFRjZcdTY1NzAsIDEpXHUzMDAyICovXG5mdW5jdGlvbiBvdmVybGFwUmF0aW8oZmlsZXM6IHN0cmluZ1tdLCBleGlzdGluZzogU2V0PHN0cmluZz4pOiBudW1iZXIge1xuICBpZiAoZXhpc3Rpbmcuc2l6ZSA9PT0gMCkgcmV0dXJuIDBcbiAgbGV0IGhpdHMgPSAwXG4gIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykgaWYgKGV4aXN0aW5nLmhhcyhmaWxlKSkgaGl0cyArPSAxXG4gIHJldHVybiBoaXRzIC8gTWF0aC5tYXgoZmlsZXMubGVuZ3RoLCAxKVxufVxuXG4vKipcbiAqIFx1NjI4QVx1RkYwOFx1NjVCMFx1MjE5Mlx1NjVFN1x1NjIxNlx1NjVFN1x1MjE5Mlx1NjVCMFx1NTc0N1x1NTNFRlx1RkYwOVx1OEZERVx1N0VFRFx1NjNEMFx1NEVBNFx1ODA1QVx1NjIxMFx1OEY2RVx1NkIyMVx1MzAwMlxuICogXHU2NUY2XHU5NUY0XHU5NUY0XHU5Njk0XHU1M0Q2XHU3RUREXHU1QkY5XHU1MDNDXHVGRjFBXHU1MjE3XHU4ODY4XHU5ODdBXHU1RThGXHU0RTBEXHU0RkREXHU4QkMxXHU2NUY2XHU5NUY0XHU2NUI5XHU1NDExXHUzMDAyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbHVzdGVySW50b1JvdW5kcyhjb21taXRzOiBSb3VuZENvbW1pdFtdLCBjbHVzdGVyR2FwTXM6IG51bWJlciA9IERFRkFVTFRfUk9VTkRfR0FQX01TKTogQ29tbWl0Um91bmRbXSB7XG4gIGNvbnN0IHJvdW5kczogQ29tbWl0Um91bmRbXSA9IFtdXG4gIGxldCBjdXJyZW50OiBSb3VuZENvbW1pdFtdID0gW11cbiAgbGV0IGN1cnJlbnRGaWxlcyA9IG5ldyBTZXQ8c3RyaW5nPigpXG5cbiAgY29uc3QgcHVzaFJvdW5kID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmIChjdXJyZW50Lmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgY29uc3QgdGltZXMgPSBjdXJyZW50Lm1hcCgoY29tbWl0KSA9PiBjb21taXQuZGF0ZSlcbiAgICByb3VuZHMucHVzaCh7IGNvbW1pdHM6IGN1cnJlbnQsIGZpcnN0QXQ6IE1hdGgubWluKC4uLnRpbWVzKSwgbGFzdEF0OiBNYXRoLm1heCguLi50aW1lcykgfSlcbiAgICBjdXJyZW50ID0gW11cbiAgICBjdXJyZW50RmlsZXMgPSBuZXcgU2V0KClcbiAgfVxuXG4gIGZvciAoY29uc3QgY29tbWl0IG9mIGNvbW1pdHMpIHtcbiAgICBjb25zdCBwcmV2aW91cyA9IGN1cnJlbnRbY3VycmVudC5sZW5ndGggLSAxXVxuICAgIGNvbnN0IGdhcEJyZWFrID0gcHJldmlvdXMgIT09IHVuZGVmaW5lZCAmJiBNYXRoLmFicyhjb21taXQuZGF0ZSAtIHByZXZpb3VzLmRhdGUpID4gY2x1c3RlckdhcE1zXG4gICAgY29uc3QgZmlsZUJyZWFrID0gY3VycmVudC5sZW5ndGggPj0gMyAmJiBvdmVybGFwUmF0aW8oY29tbWl0LmZpbGVzLCBjdXJyZW50RmlsZXMpID09PSAwXG4gICAgaWYgKGdhcEJyZWFrIHx8IGZpbGVCcmVhaykgcHVzaFJvdW5kKClcbiAgICBjdXJyZW50LnB1c2goY29tbWl0KVxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBjb21taXQuZmlsZXMpIGN1cnJlbnRGaWxlcy5hZGQoZmlsZSlcbiAgfVxuICBwdXNoUm91bmQoKVxuICByZXR1cm4gcm91bmRzXG59XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUxheW91dEVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSwgdXNlU3luY0V4dGVybmFsU3RvcmUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFdvcmtzcGFjZUZyYW1lIH0gZnJvbSAnLi9Xb3Jrc3BhY2VGcmFtZS50c3gnXG5cbmludGVyZmFjZSBDdXJyZW50U2Vzc2lvbiB7XG4gIGdldFNuYXBzaG90KCk6IHsga2V5Pzogc3RyaW5nIH1cbiAgc3Vic2NyaWJlKGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogKCkgPT4gdm9pZFxufVxuXG5pbnRlcmZhY2UgUGFuZWxJbmZvIHtcbiAgZ2V0U25hcHNob3QoKTogeyBhY3RpdmVQYW5lbElkOiBzdHJpbmcgfCBudWxsIH1cbiAgc3Vic2NyaWJlKGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogKCkgPT4gdm9pZFxufVxuXG5pbnRlcmZhY2UgTW9kZXJuV29ya3NwYWNlUHJvcHMge1xuICBjdXJyZW50OiBDdXJyZW50U2Vzc2lvblxuICBwYW5lbEluZm86IFBhbmVsSW5mb1xuICBlbmFibGVkOiBib29sZWFuXG4gIG9uRGlzbWlzczogKCkgPT4gdm9pZFxufVxuXG5pbnRlcmZhY2UgQm91bmRzIHtcbiAgbGVmdDogbnVtYmVyXG4gIHRvcDogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdvcmtzcGFjZUJvdW5kcyhmcmFtZTogQm91bmRzLCBjZW50ZXI6IEJvdW5kcywgY2hhdFdpZHRoOiBudW1iZXIpOiBCb3VuZHMgfCB1bmRlZmluZWQge1xuICBjb25zdCBhdmFpbGFibGUgPSBNYXRoLmZsb29yKGNlbnRlci53aWR0aClcbiAgaWYgKGF2YWlsYWJsZSA8IDU2MCB8fCBjZW50ZXIuaGVpZ2h0IDw9IDApIHJldHVybiB1bmRlZmluZWRcbiAgY29uc3QgY2hhdCA9IE1hdGgubWF4KDI4MCwgTWF0aC5taW4oY2hhdFdpZHRoLCBhdmFpbGFibGUgLSAyODApKVxuICByZXR1cm4ge1xuICAgIGxlZnQ6IGNlbnRlci5sZWZ0IC0gZnJhbWUubGVmdCxcbiAgICB0b3A6IGNlbnRlci50b3AgLSBmcmFtZS50b3AsXG4gICAgd2lkdGg6IGF2YWlsYWJsZSAtIGNoYXQsXG4gICAgaGVpZ2h0OiBjZW50ZXIuaGVpZ2h0LFxuICB9XG59XG5cbi8qKiBcdTY1QjBcdTcyNDhcdTVCQkZcdTRFM0JcdTc2ODRcdTUyQTBcdTZDRDVcdTZENkVcdTVDNDJcdUZGMUJcdTRFQzVcdTUzOEJcdTdGMjlcdTRGMUFcdThCRERcdTUyMTdcdUZGMENcdTRFMERcdTY1MzlcdTUzRDhcdTVCOThcdTY1QjlcdTUzRjNcdTRGQTdcdTY4MEZcdTYyMTZcdTdGNTFcdTY4M0NcdTZBMjFcdTY3N0ZcdTMwMDIgKi9cbmV4cG9ydCBmdW5jdGlvbiBNb2Rlcm5Xb3Jrc3BhY2UoeyBjdXJyZW50LCBwYW5lbEluZm8sIGVuYWJsZWQsIG9uRGlzbWlzcyB9OiBNb2Rlcm5Xb3Jrc3BhY2VQcm9wcykge1xuICBjb25zdCBzZXNzaW9uSWQgPSB1c2VTeW5jRXh0ZXJuYWxTdG9yZShcbiAgICAobGlzdGVuZXIpID0+IGN1cnJlbnQuc3Vic2NyaWJlKGxpc3RlbmVyKSxcbiAgICAoKSA9PiBjdXJyZW50LmdldFNuYXBzaG90KCkua2V5LFxuICApXG4gIGNvbnN0IGFjdGl2ZVBhbmVsSWQgPSB1c2VTeW5jRXh0ZXJuYWxTdG9yZShcbiAgICAobGlzdGVuZXIpID0+IHBhbmVsSW5mby5zdWJzY3JpYmUobGlzdGVuZXIpLFxuICAgICgpID0+IHBhbmVsSW5mby5nZXRTbmFwc2hvdCgpLmFjdGl2ZVBhbmVsSWQsXG4gIClcbiAgY29uc3QgdmlzaWJsZSA9IGVuYWJsZWQgJiYgYWN0aXZlUGFuZWxJZCA9PT0gbnVsbFxuICBjb25zdCBkcmFnQ2xlYW51cCA9IHVzZVJlZjwoKCkgPT4gdm9pZCkgfCB1bmRlZmluZWQ+KClcbiAgY29uc3QgW2JvdW5kcywgc2V0Qm91bmRzXSA9IHVzZVN0YXRlPEJvdW5kcyB8IHVuZGVmaW5lZD4oKVxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4gKCkgPT4geyBkcmFnQ2xlYW51cC5jdXJyZW50Py4oKSB9LCBbdmlzaWJsZV0pXG4gIGNvbnN0IFtjaGF0V2lkdGgsIHNldENoYXRXaWR0aF0gPSB1c2VTdGF0ZSgoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BjLmNoYXRXaWR0aCcpID8/ICcnKVxuICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUoc2F2ZWQpICYmIHNhdmVkID49IDI4MCA/IHNhdmVkIDogMzYwXG4gIH0pXG5cbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXZpc2libGUpIHJldHVyblxuICAgIGNvbnN0IHJpZ2h0YmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJ1tkYXRhLXJpZ2h0YmFyLWNvbF0nKVxuICAgIGNvbnN0IGZyYW1lID0gcmlnaHRiYXI/LnBhcmVudEVsZW1lbnRcbiAgICBjb25zdCBjZW50ZXJzID0gZnJhbWU/LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KCc6c2NvcGUgPiBkaXZbY2xhc3MqPVwiY2VudGVyQ29sXCJdJylcbiAgICBpZiAoZnJhbWUgPT09IHVuZGVmaW5lZCB8fCBmcmFtZSA9PT0gbnVsbCB8fCBjZW50ZXJzPy5sZW5ndGggIT09IDEpIHtcbiAgICAgIG9uRGlzbWlzcygpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgY2VudGVyID0gY2VudGVyc1swXSFcbiAgICBjb25zdCBvbGRQYWRkaW5nID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctbGVmdCcpXG4gICAgY29uc3Qgb2xkUGFkZGluZ1ByaW9yaXR5ID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5UHJpb3JpdHkoJ3BhZGRpbmctbGVmdCcpXG4gICAgY29uc3Qgb2xkQm94U2l6aW5nID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2JveC1zaXppbmcnKVxuICAgIGNvbnN0IG9sZEJveFNpemluZ1ByaW9yaXR5ID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5UHJpb3JpdHkoJ2JveC1zaXppbmcnKVxuICAgIGxldCBhcHBsaWVkUGFkZGluZyA9ICcnXG4gICAgbGV0IGFjdGl2ZSA9IHRydWVcblxuICAgIGNvbnN0IHVwZGF0ZSA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICghYWN0aXZlKSByZXR1cm5cbiAgICAgIGNvbnN0IG5leHQgPSB3b3Jrc3BhY2VCb3VuZHMoZnJhbWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIGNlbnRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgY2hhdFdpZHRoKVxuICAgICAgaWYgKG5leHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvbkRpc21pc3MoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhZGRpbmcgPSBgJHtuZXh0LndpZHRofXB4YFxuICAgICAgaWYgKHBhZGRpbmcgIT09IGFwcGxpZWRQYWRkaW5nKSB7XG4gICAgICAgIGNlbnRlci5zdHlsZS5zZXRQcm9wZXJ0eSgncGFkZGluZy1sZWZ0JywgcGFkZGluZywgJ2ltcG9ydGFudCcpXG4gICAgICAgIGFwcGxpZWRQYWRkaW5nID0gcGFkZGluZ1xuICAgICAgfVxuICAgICAgY2VudGVyLnN0eWxlLnNldFByb3BlcnR5KCdib3gtc2l6aW5nJywgJ2JvcmRlci1ib3gnLCAnaW1wb3J0YW50JylcbiAgICAgIHNldEJvdW5kcygocHJldmlvdXMpID0+IHByZXZpb3VzPy5sZWZ0ID09PSBuZXh0LmxlZnQgJiYgcHJldmlvdXMudG9wID09PSBuZXh0LnRvcCAmJiBwcmV2aW91cy53aWR0aCA9PT0gbmV4dC53aWR0aCAmJiBwcmV2aW91cy5oZWlnaHQgPT09IG5leHQuaGVpZ2h0ID8gcHJldmlvdXMgOiBuZXh0KVxuICAgIH1cbiAgICBjb25zdCByZXNpemUgPSBuZXcgUmVzaXplT2JzZXJ2ZXIodXBkYXRlKVxuICAgIHJlc2l6ZS5vYnNlcnZlKGZyYW1lKVxuICAgIHJlc2l6ZS5vYnNlcnZlKGNlbnRlcilcbiAgICBjb25zdCBtdXRhdGlvbnMgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAoIWZyYW1lLmhhc0F0dHJpYnV0ZSgnZGF0YS1yaWdodGJhci1jb2xsYXBzZWQnKSkgb25EaXNtaXNzKClcbiAgICAgIGVsc2UgdXBkYXRlKClcbiAgICB9KVxuICAgIG11dGF0aW9ucy5vYnNlcnZlKGZyYW1lLCB7IGF0dHJpYnV0ZXM6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogWydkYXRhLXJpZ2h0YmFyLWNvbGxhcHNlZCddIH0pXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZSlcbiAgICB1cGRhdGUoKVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBhY3RpdmUgPSBmYWxzZVxuICAgICAgcmVzaXplLmRpc2Nvbm5lY3QoKVxuICAgICAgbXV0YXRpb25zLmRpc2Nvbm5lY3QoKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZSlcbiAgICAgIGlmIChjZW50ZXIuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1sZWZ0JykgPT09IGFwcGxpZWRQYWRkaW5nKSB7XG4gICAgICAgIGlmIChvbGRQYWRkaW5nID09PSAnJykgY2VudGVyLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLWxlZnQnKVxuICAgICAgICBlbHNlIGNlbnRlci5zdHlsZS5zZXRQcm9wZXJ0eSgncGFkZGluZy1sZWZ0Jywgb2xkUGFkZGluZywgb2xkUGFkZGluZ1ByaW9yaXR5KVxuICAgICAgfVxuICAgICAgaWYgKGNlbnRlci5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdib3gtc2l6aW5nJykgPT09ICdib3JkZXItYm94Jykge1xuICAgICAgICBpZiAob2xkQm94U2l6aW5nID09PSAnJykgY2VudGVyLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdib3gtc2l6aW5nJylcbiAgICAgICAgZWxzZSBjZW50ZXIuc3R5bGUuc2V0UHJvcGVydHkoJ2JveC1zaXppbmcnLCBvbGRCb3hTaXppbmcsIG9sZEJveFNpemluZ1ByaW9yaXR5KVxuICAgICAgfVxuICAgICAgc2V0Qm91bmRzKHVuZGVmaW5lZClcbiAgICB9XG4gIH0sIFt2aXNpYmxlLCBjaGF0V2lkdGgsIG9uRGlzbWlzc10pXG5cbiAgaWYgKCF2aXNpYmxlIHx8IGJvdW5kcyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IG9uRGl2aWRlckRvd24gPSAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zdCBvbk1vdmUgPSAobW92ZTogUG9pbnRlckV2ZW50KTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCdbZGF0YS1yaWdodGJhci1jb2xdJyk/LnBhcmVudEVsZW1lbnRcbiAgICAgIGNvbnN0IGNlbnRlciA9IGZyYW1lPy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignOnNjb3BlID4gZGl2W2NsYXNzKj1cImNlbnRlckNvbFwiXScpXG4gICAgICBpZiAoY2VudGVyID09PSB1bmRlZmluZWQgfHwgY2VudGVyID09PSBudWxsKSByZXR1cm5cbiAgICAgIGNvbnN0IHdpZHRoID0gTWF0aC5tYXgoMjgwLCBNYXRoLm1pbig5MDAsIE1hdGgucm91bmQoY2VudGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0IC0gbW92ZS5jbGllbnRYKSkpXG4gICAgICBzZXRDaGF0V2lkdGgod2lkdGgpXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGMuY2hhdFdpZHRoJywgU3RyaW5nKHdpZHRoKSlcbiAgICB9XG4gICAgY29uc3Qgb25VcCA9ICgpOiB2b2lkID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSlcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJjYW5jZWwnLCBvblVwKVxuICAgICAgZHJhZ0NsZWFudXAuY3VycmVudCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgICBkcmFnQ2xlYW51cC5jdXJyZW50Py4oKVxuICAgIGRyYWdDbGVhbnVwLmN1cnJlbnQgPSBvblVwXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyY2FuY2VsJywgb25VcClcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXRlc3RpZD1cInByb2plY3QtY29udHJvbC1tb2Rlcm4td29ya3NwYWNlXCIgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIC4uLmJvdW5kcywgcG9pbnRlckV2ZW50czogJ2F1dG8nIH19PlxuICAgICAgPFdvcmtzcGFjZUZyYW1lIGtleT17c2Vzc2lvbklkID8/ICdsYW5kaW5nJ30gey4uLihzZXNzaW9uSWQgPT09IHVuZGVmaW5lZCA/IHt9IDogeyBzZXNzaW9uSWQgfSl9IGxheW91dE1vZGU9XCJvdmVybGF5XCIgLz5cbiAgICAgIDxkaXYgZGF0YS10ZXN0aWQ9XCJwcm9qZWN0LWNvbnRyb2wtbW9kZXJuLWRpdmlkZXJcIiBvblBvaW50ZXJEb3duPXtvbkRpdmlkZXJEb3dufSBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAwLCBib3R0b206IDAsIHJpZ2h0OiAtNCwgd2lkdGg6IDgsIGN1cnNvcjogJ2NvbC1yZXNpemUnLCB6SW5kZXg6IDIwIH19IC8+XG4gICAgPC9kaXY+XG4gIClcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpQkEsSUFBQUEsZ0JBQWtCOzs7QUNObEIsbUJBQWtCOzs7QUNNWCxTQUFTLFdBQVcsT0FBZ0Q7QUFDekUsUUFBTSxNQUFNLG9CQUFvQixLQUFLLEtBQUs7QUFDMUMsTUFBSSxRQUFRLE1BQU07QUFDaEIsVUFBTSxRQUFRLE9BQU8sU0FBUyxJQUFJLENBQUMsR0FBSSxFQUFFO0FBQ3pDLFdBQU8sQ0FBRSxTQUFTLEtBQU0sS0FBTSxTQUFTLElBQUssS0FBSyxRQUFRLEdBQUc7QUFBQSxFQUM5RDtBQUNBLFFBQU0sYUFBYSxzREFBc0QsS0FBSyxLQUFLO0FBQ25GLE1BQUksZUFBZSxNQUFNO0FBQ3ZCLFdBQU8sQ0FBQyxPQUFPLFdBQVcs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QjtBQUFBLElBQ2hCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLElBQ2hCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGlCQUFpQjtBQUFBLElBQ2pCLHVCQUF1QjtBQUFBLElBQ3ZCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBRWhCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHFCQUFxQjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLDBCQUEwQjtBQUFBLElBQzFCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLGFBQWE7QUFBQSxJQUNiLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHdCQUF3QjtBQUFBLElBQ3hCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHlCQUF5QjtBQUFBLElBQ3pCLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElB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ZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsZ0JBQWdCO0FBQUEsSUFDaEIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsd0JBQXdCO0FBQUEsSUFDeEIscUJBQXFCO0FBQUEsSUFDckIsNEJBQTRCO0FBQUEsSUFFNUIsZUFBZTtBQUFBLElBQ2Ysc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsd0JBQXdCO0FBQUEsSUFDeEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIseUJBQXlCO0FBQUEsSUFDekIsMEJBQTBCO0FBQUEsSUFDMUIsMkJBQTJCO0FBQUEsSUFFM0Isa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFFaEIsZUFBZTtBQUFBLElBQ2YsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsYUFBYTtBQUFBLElBQ2IsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBRWYsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIscUJBQXFCO0FBQUEsSUFDckIsa0JBQWtCO0FBQUEsSUFDbEIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUEsSUFDekIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsa0JBQWtCO0FBQUEsSUFDbEIsdUJBQXVCO0FBQUEsSUFFdkIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsSUFFbEIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsbUJBQW1CO0FBQUEsSUFDbkIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsaUJBQWlCO0FBQUEsSUFDakIsYUFBYTtBQUFBLElBQ2IsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsRUFDcEI7QUFBQSxFQUNBLElBQUk7QUFBQSxJQUNGLG1CQUFtQjtBQUFBLElBQ25CLDJCQUEyQjtBQUFBLElBQzNCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLElBQ2hCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGlCQUFpQjtBQUFBLElBQ2pCLHVCQUF1QjtBQUFBLElBQ3ZCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBRWhCLFlBQVk7QUFBQSxJQUNaLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHFCQUFxQjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLDBCQUEwQjtBQUFBLElBQzFCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLGFBQWE7QUFBQSxJQUNiLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHdCQUF3QjtBQUFBLElBQ3hCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElB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RyxLQUFLO0FBQUEsTUFDckYsT0FBTyxJQUFJO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFHQSxNQUFJLE1BQU0sT0FBTyxzQkFBc0IsTUFBTTtBQUMzQyxXQUFPLElBQUksTUFBTSxTQUFTO0FBQUEsTUFDeEIsTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLElBQ1AsR0FBRyxDQUFDLFVBQWU7QUFDakIsVUFBSSxPQUFPLGFBQWEsaUJBQWtCLFFBQU87QUFDakQsWUFBTSxTQUFTLE9BQU87QUFDdEIsYUFBTyxjQUFBQSxRQUFNLGNBQWMsWUFBWTtBQUFBLFFBQ3JDLE9BQU87QUFBQSxRQUNQLGNBQWMsUUFBUSxnQkFBZ0I7QUFBQSxRQUN0QyxZQUFZLFFBQVEsY0FBYztBQUFBLFFBQ2xDLFdBQVcsUUFBUSxhQUFhO0FBQUEsUUFDaEMsWUFBWSxRQUFRO0FBQUEsUUFDcEIsUUFBUSxTQUFTLGNBQWM7QUFBQSxNQUNqQyxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsYUFBVyxDQUFDLFNBQVMsS0FBSyxLQUFLO0FBQUEsSUFDN0IsQ0FBQyxhQUFhLDRCQUFXO0FBQUEsSUFDekIsQ0FBQyxjQUFjLG9DQUFTO0FBQUEsSUFDeEIsQ0FBQyxvQkFBb0IsaUNBQVE7QUFBQSxFQUMvQixHQUFZO0FBQ1YsUUFBSSxNQUFNLE9BQU8sc0JBQXNCLE1BQU07QUFDM0MsYUFBTyxJQUFJLE1BQU0sU0FBUyxFQUFFLE1BQU0sc0JBQXNCLEtBQUssUUFBUSxHQUFHLGlCQUFpQixLQUFLLENBQUM7QUFBQSxJQUNqRyxDQUFDO0FBQUEsRUFDSDtBQUNGOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIm5hbWUiLCAiUmVhY3QiLCAib2siLCAiZGF0YSIsICJhcHBseSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0Il0KfQo=
