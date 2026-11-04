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
  accepted: "\u5DF2\u5904\u7406",
  rejected: "\u8BEF\u62A5/\u91CD\u590D"
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
    "picker.undigested": "\u4E0A\u6B21 AI \u603B\u7ED3\u4E4B\u540E\u3001\u4E14\u5C1A\u672A\u751F\u6210\u8FC7 AI \u89E3\u8BFB\u7684\u65B0\u63D0\u4EA4",
    "picker.undigestedCount": "{n} \u4E2A\u63D0\u4EA4\u672A\u6D88\u5316",
    "picker.selectAllUndigested": "\u5168\u9009\u672A\u6D88\u5316",
    "picker.digestAll": "\u4E00\u952E\u6D88\u5316",
    "picker.digestAllHint": "\u9009\u4E2D\u5168\u90E8\u672A\u6D88\u5316\u63D0\u4EA4\u5E76\u6279\u91CF AI \u89E3\u8BFB\uFF08\u5E76\u53D1 3\uFF0C\u6709\u7F13\u5B58\uFF09\uFF0C\u5B8C\u6210\u540E\u81EA\u52A8\u751F\u6210\u6574\u4F53\u53D9\u4E8B\uFF1B\u4E4B\u540E\u5230\u300C\u7B14\u8BB0\u4E0E\u8BB0\u5FC6\u300D\u751F\u6210\u5B66\u4E60\u603B\u7ED3\u5373\u53EF\u91CD\u7F6E\u672A\u6D88\u5316\u6807\u8BB0",
    "narrative.digestHint": "\u6574\u4F53\u53D9\u4E8B\u5DF2\u751F\u6210\u3002\u5230\u300C\u7B14\u8BB0\u4E0E\u8BB0\u5FC6\u300D\u9875\u751F\u6210 AI \u5B66\u4E60\u603B\u7ED3\uFF0C\u5373\u53EF\u91CD\u7F6E\u300C\u672A\u6D88\u5316\u300D\u6807\u8BB0\u3002",
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
    "review.retentionHint": "\u5DF2\u89E3\u51B3/\u8BEF\u62A5\u95EE\u9898\u4FDD\u7559 {days} \u5929\u540E\u81EA\u52A8\u6E05\u7406",
    "review.target": "\u5BF9\u8C61",
    "review.workingTarget": "\u5DE5\u4F5C\u533A",
    "review.exportMd": "\u5BFC\u51FA MD",
    "review.exportMdHint": "\u628A\u5F53\u524D\u7B5B\u9009\u4E0B\u7684\u95EE\u9898\u6E05\u5355\u4E0B\u8F7D\u4E3A .md \u6587\u4EF6",
    "review.exportEmpty": "\u6CA1\u6709\u53EF\u5BFC\u51FA\u7684\u95EE\u9898",
    "review.selectAll": "\u5168\u9009",
    "review.checkedCount": "\u5DF2\u9009 {n} \u6761",
    "review.markHandled": "\u6807\u8BB0\u5DF2\u5904\u7406",
    "review.batchVerify": "\u6279\u91CF\u590D\u68C0",
    "review.batchVerifyConfirmTitle": "\u6279\u91CF\u590D\u68C0\uFF1F",
    "review.batchVerifyConfirmMsg": "\u5C06\u5BF9 {n} \u4E2A\u8BC4\u5BA1\u76EE\u6807\u9010\u4E00\u590D\u68C0\uFF08\u4E32\u884C LLM \u8C03\u7528\uFF0C\u6BCF\u4E2A\u76EE\u6807\u7EA6 10-60 \u79D2\uFF0C\u4F1A\u6D88\u8017\u6A21\u578B\u7528\u91CF\uFF09\uFF1B\u53EF\u968F\u65F6\u505C\u6B62\u3002",
    "review.batchStop": "\u505C\u6B62",
    "review.batchProgress": "\u6279\u91CF\u590D\u68C0\u4E2D {i}/{n}",
    "review.batchDone": "\u6279\u91CF\u590D\u68C0\u5B8C\u6210\uFF1A\u89E3\u51B3 {a} \u6761 \xB7 \u4ECD\u5F85\u5904\u7406 {b} \u6761 \xB7 \u65B0\u95EE\u9898 {c} \u6761 \xB7 \u5931\u8D25 {d} \u4E2A\u76EE\u6807",
    "review.batchStopped": "\u6279\u91CF\u590D\u68C0\u5DF2\u505C\u6B62",
    "review.triage": "\u{1F9F9} \u6574\u4F53\u5206\u8BCA",
    "review.triageHint": "LLM \u6574\u4F53\u626B\u63CF\u5168\u90E8\u5F85\u5904\u7406\u95EE\u9898\uFF1A\u5224\u91CD\u590D/\u8FC7\u65F6/\u4E0D\u6210\u7ACB\u5373\u65F6\u5173\u95ED\uFF08\u5E26\u4F9D\u636E\uFF0C\u53EF\u4EBA\u5DE5\u91CD\u5F00\u590D\u6838\uFF09\uFF0C\u771F\u95EE\u9898\u7559\u4E0B\u518D\u6D3E\u53D1\u4FEE\u590D",
    "review.triageConfirmTitle": "\u6574\u4F53\u5206\u8BCA\uFF1F",
    "review.triageConfirmMsg": "\u5C06\u7528 LLM \u5206\u6279\u626B\u63CF\u5168\u90E8\u5F85\u5904\u7406\u95EE\u9898\uFF08\u6BCF\u6279\u6700\u591A {n} \u6761\uFF0C\u6D88\u8017\u6A21\u578B\u7528\u91CF\uFF09\u3002\u5224\u4E3A\u91CD\u590D/\u8FC7\u65F6/\u4E0D\u6210\u7ACB\u7684\u95EE\u9898\u4F1A\u3010\u7ACB\u5373\u5173\u95ED\u3011\u5E76\u6CE8\u660E\u4F9D\u636E\u2014\u2014\u5168\u90E8\u53EF\u5728\u95EE\u9898\u5361\u590D\u6838\u91CD\u5F00\u3002\u7559\u4E0B\u7684\u771F\u95EE\u9898\u518D\u8D70\u6D3E\u53D1\u4FEE\u590D\u3002",
    "review.triageProgress": "\u5206\u8BCA\u4E2D\uFF1A\u5DF2\u5904\u7406 {n} \u6761\uFF0C\u5269\u4F59\u7EA6 {m} \u6761",
    "review.triageStop": "\u505C\u6B62",
    "review.triageDone": "\u5206\u8BCA\u5B8C\u6210\uFF1A\u5173\u95ED \u91CD\u590D {a} \xB7 \u8FC7\u65F6 {b} \xB7 \u4E0D\u5B58\u5728 {c}\uFF1B\u4FDD\u7559 {d} \u6761\u5F85\u5904\u7406",
    "review.triageStopped": "\u5206\u8BCA\u5DF2\u505C\u6B62\uFF08\u5DF2\u5224\u5B9A\u7684\u4E0D\u4F1A\u91CD\u590D\u6D88\u8017\uFF0C\u53EF\u518D\u6B21\u70B9\u51FB\u7EE7\u7EED\uFF09",
    "review.triageNothing": "\u5F53\u524D\u4F1A\u8BDD\u5B9A\u4F4D\u5230\u7684\u9879\u76EE\u6CA1\u6709\u5F85\u5206\u8BCA\u7684\u5F85\u5904\u7406\u95EE\u9898\uFF08\u82E5\u4E0E\u5217\u8868\u4E0D\u7B26\uFF0C\u8BF7\u786E\u8BA4\u5DE6\u4FA7\u6253\u5F00\u7684\u4F1A\u8BDD\u5C5E\u4E8E\u8BE5\u9879\u76EE\uFF09",
    "review.triageParseFail": "\uFF1B\u6709\u4E00\u6279\u8F93\u51FA\u89E3\u6790\u5931\u8D25\u5DF2\u6309\u4FDD\u7559\u5904\u7406\uFF0C\u53EF\u91CD\u8BD5",
    "review.handledDone": "\u5DF2\u628A {n} \u6761\u95EE\u9898\u6807\u8BB0\u4E3A\u5DF2\u5904\u7406",
    "fix.plan": "\u4FEE\u590D\u65B9\u6848",
    "fix.planApproach": "\u65B9\u6848",
    "fix.planImpact": "\u5F71\u54CD\u8303\u56F4",
    "fix.planBenefit": "\u6536\u76CA",
    "fix.planRisk": "\u98CE\u9669",
    "fix.dispatch": "\u6D3E\u53D1\u4FEE\u590D",
    "fix.dispatchHintMain": "\u628A\u52FE\u9009\u7684\u5F85\u5904\u7406\u95EE\u9898\uFF08\u672A\u52FE\u9009=\u5F53\u524D\u7B5B\u9009\u4E0B\u5168\u90E8\uFF09\u6D3E\u53D1\u7ED9\u5B50 Agent \u5E76\u53D1\u5904\u7406\uFF1A\u76F4\u63A5\u4FEE\u590D=\u4E09\u9053\u95F8\u5224\u5B9A+\u4FEE\u590D+\u56DE\u5199+\u63D0\u4EA4\u5168\u81EA\u52A8\uFF1B\u5148\u51FA\u65B9\u6848=\u53EA\u8BFB\u5206\u6790\u4EA7\u51FA\u7ED3\u6784\u5316\u65B9\u6848\uFF0C\u6279\u51C6\u540E\u518D\u6D3E\u53D1\u6267\u884C",
    "fix.dispatchModeTitle": "\u6D3E\u53D1\u4FEE\u590D\u2014\u2014\u9009\u62E9\u6A21\u5F0F",
    "fix.dispatchModeMsg": "\u5C06\u6D3E\u53D1 {n} \u6761\u5F85\u5904\u7406\u95EE\u9898\u7ED9\u5B50 Agent \u5E76\u53D1\u5904\u7406\uFF08\u6BCF\u4EFB\u52A1\u72EC\u7ACB worktree\uFF0C\u6D88\u8017\u6A21\u578B\u7528\u91CF\uFF0C\u4E0D\u5360\u7528\u804A\u5929\u7A97\u53E3\uFF09\u3002\u26A1 \u76F4\u63A5\u4FEE\u590D\uFF1A\u4E09\u9053\u95F8\u5224\u5B9A + \u4FEE\u590D + \u56DE\u5199 + \u63D0\u4EA4\u5168\u81EA\u52A8\uFF0C\u8BEF\u62A5/\u91CD\u590D/\u8FC7\u65F6\u4F1A\u81EA\u52A8\u5173\u95ED\u3002\u{1F4CB} \u5148\u51FA\u65B9\u6848\uFF1A\u53EA\u8BFB\u5206\u6790\u4EA7\u51FA\u7ED3\u6784\u5316\u65B9\u6848\uFF0C\u4E0D\u6539\u4EFB\u4F55\u4EE3\u7801\uFF1B\u4F60\u5728\u95EE\u9898\u5361\u7684\u65B9\u6848\u5757\u6279\u51C6\u540E\u70B9\u300C\u6D3E\u53D1\u5F85\u5BA1\u65B9\u6848\u300D\u6267\u884C\u3002",
    "fix.dispatchAuto": "\u26A1 \u76F4\u63A5\u4FEE\u590D",
    "fix.dispatchPlan": "\u{1F4CB} \u5148\u51FA\u65B9\u6848",
    "fix.dispatchNoOpen": "\u5F53\u524D\u7B5B\u9009\u4E0B\u6CA1\u6709\u5F85\u5904\u7406\u95EE\u9898\u53EF\u6D3E\u53D1",
    "fix.dispatchPlans": "\u6D3E\u53D1\u5F85\u5BA1\u65B9\u6848",
    "fix.dispatchPlansHint": "\u628A\u5DF2\u4EA7\u51FA\u7684\u5F85\u8BC4\u5BA1\u65B9\u6848\u6D3E\u53D1\u7ED9\u5B50 Agent \u5E76\u53D1\u6267\u884C\u4FEE\u590D\uFF08\u6BCF\u4EFB\u52A1\u72EC\u7ACB worktree\uFF0C\u5408\u5E76\u51B2\u7A81\u81EA\u52A8\u57FA\u4E8E\u6700\u65B0\u4EE3\u7801\u91CD\u505A\uFF09",
    "fix.dispatchDone": "\u5DF2\u6D3E\u53D1 {n} \u4E2A\u4FEE\u590D\u4EFB\u52A1\uFF08\u5E76\u53D1 {c}\uFF09",
    "fix.dispatchEmpty": "\u6CA1\u6709\u53EF\u6D3E\u53D1\u7684\u4EFB\u52A1\uFF08\u52FE\u9009\u5F85\u5904\u7406\u95EE\u9898\u6216\u7B49\u5F85\u65B9\u6848\u4EA7\u51FA\uFF09",
    "fix.status": "\u4FEE\u590D\u6267\u884C",
    "fix.stop": "\u505C\u6B62",
    "fix.stopDone": "\u5DF2\u505C\u6B62 {n} \u4E2A\u4FEE\u590D\u4EFB\u52A1",
    "fix.taskQueued": "\u6392\u961F\u4E2D",
    "fix.taskRunning": "\u8FD0\u884C\u4E2D",
    "fix.taskMerging": "\u5408\u5E76\u4E2D",
    "fix.taskRedo": "\u91CD\u505A\u4E2D",
    "fix.taskDone": "\u5DF2\u5B8C\u6210",
    "fix.taskConflict": "\u51B2\u7A81",
    "fix.taskFailed": "\u5931\u8D25",
    "fix.taskCancelled": "\u5DF2\u505C\u6B62",
    "fix.attempt": "\u7B2C {n} \u6B21",
    "fix.runtime": "\u5DF2\u8FD0\u884C {n} \u5206",
    "fix.resumes": "\u7EED\u8DD1 {n}",
    "fix.probes": "\u63A2\u6D3B {n}",
    "fix.modelTitle": "\u4FEE\u590D\u5E76\u53D1\uFF08\u5B50 Agent \u6C60\uFF09",
    "fix.modelHint": "\u540C\u65F6\u6267\u884C\u7684\u4FEE\u590D\u5B50 Agent \u4E0A\u9650\uFF081-10\uFF09\u3002\u6BCF\u4EFB\u52A1\u72EC\u7ACB worktree \u4E92\u4E0D\u5E72\u6270\uFF1B\u4FEE\u6539\u540E\u7ACB\u5373\u751F\u6548\u3002",
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
    "picker.undigested": "New commits since the last AI summary without AI analysis yet",
    "picker.undigestedCount": "{n} unreviewed commits",
    "picker.selectAllUndigested": "Select undigested",
    "picker.digestAll": "Digest all",
    "picker.digestAllHint": "Select all undigested commits and batch AI analysis (concurrency 3, cached), auto-generate the narrative afterwards; then create an AI summary in Notes & Memory to reset the marker",
    "narrative.digestHint": "Narrative generated. Create an AI summary in Notes & Memory to reset the undigested marker.",
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
    "review.retentionHint": "Resolved / false-positive issues are auto-purged after {days} day(s)",
    "review.target": "Target",
    "review.workingTarget": "Working tree",
    "review.exportMd": "Export MD",
    "review.exportMdHint": "Download the filtered issue list as a .md file",
    "review.exportEmpty": "No issues to export",
    "review.selectAll": "Select all",
    "review.checkedCount": "{n} selected",
    "review.markHandled": "Mark handled",
    "review.batchVerify": "Batch verify",
    "review.batchVerifyConfirmTitle": "Batch verify?",
    "review.batchVerifyConfirmMsg": "Will verify {n} review targets one by one (serial LLM calls, ~10-60s each, consumes model usage); you can stop anytime.",
    "review.batchStop": "Stop",
    "review.batchProgress": "Batch verifying {i}/{n}",
    "review.batchDone": "Batch verify done: {a} resolved \xB7 {b} still open \xB7 {c} new \xB7 {d} failed targets",
    "review.batchStopped": "Batch verify stopped",
    "review.triage": "\u{1F9F9} Triage all",
    "review.triageHint": "LLM holistic scan over all pending issues: duplicates/obsolete/non-issues are closed immediately with evidence (reopenable); real issues stay for fix dispatch",
    "review.triageConfirmTitle": "Triage all pending issues?",
    "review.triageConfirmMsg": "Will scan all pending issues with the LLM in batches (up to {n} per batch, consumes model usage). Issues judged duplicate/obsolete/non-issues are closed IMMEDIATELY with evidence \u2014 every closure is reviewable and reopenable on the issue card. Real issues stay for fix dispatch.",
    "review.triageProgress": "Triaging: {n} processed, ~{m} remaining",
    "review.triageStop": "Stop",
    "review.triageDone": "Triage done: closed {a} duplicate \xB7 {b} obsolete \xB7 {c} non-issues; {d} pending kept",
    "review.triageStopped": "Triage stopped (judged items are not re-billed; click again to continue)",
    "review.triageNothing": "No pending issues to triage for the project this session resolves to (if this looks wrong, check the open session belongs to that project)",
    "review.triageParseFail": "; one batch failed to parse and was kept as-is, retryable",
    "review.handledDone": "{n} issues marked as handled",
    "fix.plan": "Fix plan",
    "fix.planApproach": "Approach",
    "fix.planImpact": "Impact",
    "fix.planBenefit": "Benefit",
    "fix.planRisk": "Risk",
    "fix.dispatch": "Dispatch fixes",
    "fix.dispatchHintMain": "Dispatch the checked pending issues (unchecked = all under the current filter) to concurrent sub-agents: auto fix = three-gate verify + fix + write-back + commit; plan first = read-only structured plans awaiting your approval",
    "fix.dispatchModeTitle": "Dispatch fixes \u2014 pick a mode",
    "fix.dispatchModeMsg": 'Will dispatch {n} pending issues to concurrent sub-agents (one worktree per task, consumes model usage, does not use the chat window). \u26A1 Auto fix: three-gate verify + fix + write-back + commit; false positives/duplicates/obsolete are auto-closed. \u{1F4CB} Plan first: read-only structured plans, no code changes; approve them on the issue card, then press "Dispatch approved plans".',
    "fix.dispatchAuto": "\u26A1 Auto fix",
    "fix.dispatchPlan": "\u{1F4CB} Plan first",
    "fix.dispatchNoOpen": "No pending issues under the current filter to dispatch",
    "fix.dispatchPlans": "Dispatch approved plans",
    "fix.dispatchPlansHint": "Dispatch the approved pending plans to concurrent sub-agent fixes (one worktree per task; conflicts auto-redo on latest HEAD)",
    "fix.dispatchDone": "\u5DF2\u6D3E\u53D1 {n} \u4E2A\u4FEE\u590D\u4EFB\u52A1\uFF08\u5E76\u53D1 {c}\uFF09",
    "fix.dispatchEmpty": "\u6CA1\u6709\u53EF\u6D3E\u53D1\u7684\u4EFB\u52A1\uFF08\u52FE\u9009\u5F85\u5904\u7406\u95EE\u9898\u6216\u7B49\u5F85\u65B9\u6848\u4EA7\u51FA\uFF09",
    "fix.status": "\u4FEE\u590D\u6267\u884C",
    "fix.stop": "\u505C\u6B62",
    "fix.stopDone": "\u5DF2\u505C\u6B62 {n} \u4E2A\u4FEE\u590D\u4EFB\u52A1",
    "fix.taskQueued": "\u6392\u961F\u4E2D",
    "fix.taskRunning": "\u8FD0\u884C\u4E2D",
    "fix.taskMerging": "\u5408\u5E76\u4E2D",
    "fix.taskRedo": "\u91CD\u505A\u4E2D",
    "fix.taskDone": "\u5DF2\u5B8C\u6210",
    "fix.taskConflict": "\u51B2\u7A81",
    "fix.taskFailed": "\u5931\u8D25",
    "fix.taskCancelled": "\u5DF2\u505C\u6B62",
    "fix.attempt": "\u7B2C {n} \u6B21",
    "fix.runtime": "\u5DF2\u8FD0\u884C {n} \u5206",
    "fix.resumes": "\u7EED\u8DD1 {n}",
    "fix.probes": "\u63A2\u6D3B {n}",
    "fix.modelTitle": "\u4FEE\u590D\u5E76\u53D1\uFF08\u5B50 Agent \u6C60\uFF09",
    "fix.modelHint": "\u540C\u65F6\u6267\u884C\u7684\u4FEE\u590D\u5B50 Agent \u4E0A\u9650\uFF081-10\uFF09\u3002\u6BCF\u4EFB\u52A1\u72EC\u7ACB worktree \u4E92\u4E0D\u5E72\u6270\u3002",
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
          { style: { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "18px", flexWrap: "wrap" } },
          import_react2.default.createElement("button", {
            style: { ...styles.secondary, padding: "7px 18px", borderRadius: "8px" },
            onClick: props.onCancel
          }, "\u53D6\u6D88"),
          props.alt !== void 0 && import_react2.default.createElement("button", {
            style: { ...styles.secondary, padding: "7px 18px", borderRadius: "8px", fontWeight: 600 },
            onClick: props.alt.onAlt
          }, props.alt.label),
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
          }, props.confirmLabel ?? "\u786E\u8BA4\u5220\u9664")
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
  const [issueChecked, setIssueChecked] = (0, import_react2.useState)({});
  const [batchVerifyState, setBatchVerifyState] = (0, import_react2.useState)(null);
  const [triageState, setTriageState] = (0, import_react2.useState)(null);
  const batchStopRef = (0, import_react2.useRef)(false);
  const [fixTasks, setFixTasks] = (0, import_react2.useState)([]);
  const [fixConcurrency, setFixConcurrency] = (0, import_react2.useState)("3");
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
  (0, import_react2.useEffect)(() => {
    loadNarrativeRef.current = () => {
      void loadNarrative();
    };
  });
  const selectCommits = (shas) => {
    const added = shas.filter((sha) => !selectedTargets.includes(sha));
    setSelectedTargets((previous) => Array.from(/* @__PURE__ */ new Set([...previous, ...shas])));
    for (const sha of added) loadDetail(sha, false);
  };
  const digestAll = () => {
    const shas = (commitsData?.commits ?? []).filter((commit) => isUndigested(commit)).map((commit) => commit.sha);
    if (shas.length === 0) return;
    setImpact(null);
    setReviews({});
    const needsFetch = shas.some((sha) => !selectedTargets.includes(sha));
    selectCommits(shas);
    if (needsFetch) {
      autoNarrativeRef.current = shas.length >= 2;
    } else if (shas.length >= 2) {
      setTimeout(() => {
        loadNarrativeRef.current();
      }, 0);
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
  const autoNarrativeRef = (0, import_react2.useRef)(false);
  const loadNarrativeRef = (0, import_react2.useRef)(() => {
  });
  const pumpDetailPool = () => {
    const pool = detailPoolRef.current;
    if (pool.active === 0 && pool.pending.length === 0) {
      if (autoNarrativeRef.current && activeRef.current) {
        autoNarrativeRef.current = false;
        loadNarrativeRef.current();
      }
      return;
    }
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
  (0, import_react2.useEffect)(() => {
    if (tab !== "review") return;
    const timer = setInterval(() => {
      void loadIssues();
      void loadFixStatus();
    }, 4e3);
    return () => {
      clearInterval(timer);
    };
  }, [tab, props.sessionId]);
  const loadFixStatus = async () => {
    try {
      const response = await fetch("/project-control/api/fix/status?sessionId=" + encodeURIComponent(props.sessionId ?? ""));
      if (response.ok) {
        const data = await response.json();
        setFixTasks(data.tasks ?? []);
      }
    } catch {
    }
  };
  const dispatchFix = async (planIds, issueIds, mode = "fix") => {
    if (planIds.length === 0 && issueIds.length === 0) {
      setActionResult("\u2717 " + t("fix.dispatchEmpty"));
      return;
    }
    const { ok, data } = await post("/project-control/api/fix/dispatch", { planIds, issueIds, mode });
    if (ok) {
      setActionResult("\u2713 " + t("fix.dispatchDone").replace("{n}", String(data["accepted"] ?? 0)).replace("{c}", String(data["concurrency"] ?? 3)));
      await loadFixStatus();
    } else {
      setActionResult("\u2717 " + String(data["error"] ?? "error"));
    }
  };
  const cancelFix = async () => {
    const { ok, data } = await post("/project-control/api/fix/cancel", {});
    if (ok) setActionResult("\u23F9 " + t("fix.stopDone").replace("{n}", String(data["stopped"] ?? 0)));
    await loadFixStatus();
  };
  const exportIssuesMd = (issues) => {
    if (issues.length === 0) {
      setActionResult("\u2717 " + t("review.exportEmpty"));
      return;
    }
    const severityOrder = { blocker: 0, critical: 1, major: 2, minor: 3, info: 4 };
    const ordered = [...issues].sort((left, right) => (severityOrder[normalizeIssueSeverity(left.severity)] ?? 9) - (severityOrder[normalizeIssueSeverity(right.severity)] ?? 9) || left.createdAt - right.createdAt);
    const lines = [
      "# Review \u95EE\u9898\u6E05\u5355",
      "",
      `- \u9879\u76EE\uFF1A${state?.project?.name ?? "\u2014"}`,
      `- \u4ED3\u5E93\uFF1A${commitsData?.rootPath ?? state?.project?.rootPath ?? "\u2014"}`,
      `- \u5206\u652F\uFF1A${commitsData?.branch ?? "\u2014"}`,
      `- \u5BFC\u51FA\u65F6\u95F4\uFF1A${(/* @__PURE__ */ new Date()).toLocaleString()}`,
      `- \u6570\u91CF\uFF1A${issues.length}\uFF08\u5F85\u5904\u7406 ${issues.filter((issue) => issue.status === "open" || issue.status === "fixing").length}\uFF09`,
      ""
    ];
    ordered.forEach((issue, index) => {
      const target = issue.changeId.startsWith("review:") && issue.changeId !== "review:worktree" ? `\u63D0\u4EA4 ${issue.changeId.slice("review:".length, "review:".length + 8)}` : issue.changeId === "review:worktree" ? "\u5DE5\u4F5C\u533A" : issue.changeId;
      lines.push(`## ${index + 1}. [${issue.severity}][${issue.category || "general"}] ${issue.title}`);
      lines.push("");
      lines.push(`- \u72B6\u6001\uFF1A${ISSUE_STATUS_LABELS[issue.status] ?? issue.status}`);
      lines.push(`- \u5BF9\u8C61\uFF1A${target}`);
      lines.push(`- \u53D1\u73B0\u65F6\u95F4\uFF1A${new Date(issue.createdAt).toLocaleString()}`);
      if ((issue.description ?? "") !== "") lines.push(`- \u63CF\u8FF0\uFF1A${issue.description.replace(/\n/g, " ")}`);
      if ((issue.resolution ?? "") !== "") lines.push(`- \u7ED3\u8BBA\uFF1A${issue.resolution}`);
      lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `review-issues-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
    setActionResult("\u2713 " + t("notes.exportDone"));
  };
  const markIssuesHandled = async (ids) => {
    let done = 0;
    for (const id of ids) {
      const { ok } = await post("/project-control/api/issues/status", { id, status: "accepted" });
      if (ok) done += 1;
    }
    await loadIssues();
    if (done > 0) setActionResult("\u2713 " + t("review.handledDone").replace("{n}", String(done)));
  };
  const runBatchVerify = async (targets) => {
    if (targets.length === 0) return;
    batchStopRef.current = false;
    setBatchVerifyState({ done: 0, total: targets.length });
    let resolvedTotal = 0;
    let openTotal = 0;
    let newTotal = 0;
    let failed = 0;
    for (const [index, target] of targets.entries()) {
      if (batchStopRef.current) break;
      setBatchVerifyState({ done: index, total: targets.length });
      try {
        const { ok, data } = await post("/project-control/api/issues/verify", { target });
        if (!ok) failed += 1;
        else {
          resolvedTotal += (data["resolved"] ?? []).length;
          openTotal += (data["stillOpen"] ?? []).length;
          newTotal += (data["newIssues"] ?? []).length;
        }
      } catch {
        failed += 1;
      }
    }
    setBatchVerifyState(null);
    await loadIssues();
    if (batchStopRef.current) setActionResult("\u23F9 " + t("review.batchStopped"));
    else setActionResult("\u2713 " + t("review.batchDone").replace("{a}", String(resolvedTotal)).replace("{b}", String(openTotal)).replace("{c}", String(newTotal)).replace("{d}", String(failed)));
  };
  const runTriage = async () => {
    batchStopRef.current = false;
    setTriageState({ processed: 0, remaining: -1 });
    const closed = { duplicate: 0, obsolete: 0, false_positive: 0 };
    let kept = 0;
    let processed = 0;
    let parseFailed = false;
    let stopped = false;
    let first = true;
    for (; ; ) {
      if (batchStopRef.current) {
        stopped = true;
        break;
      }
      let outcome;
      try {
        outcome = await post("/project-control/api/issues/triage", { sessionId: props.sessionId ?? "", ...first ? { reset: true } : {} });
      } catch {
        outcome = { ok: false, data: { error: "network error" } };
      }
      first = false;
      if (!outcome.ok) {
        setActionResult("\u2717 " + String(outcome.data["error"] ?? "error"));
        break;
      }
      const data = outcome.data;
      const batchClosed = data["closed"] ?? {};
      closed.duplicate += Number(batchClosed["duplicate"] ?? 0);
      closed.obsolete += Number(batchClosed["obsolete"] ?? 0);
      closed.false_positive += Number(batchClosed["false_positive"] ?? 0);
      kept += Number(data["kept"] ?? 0);
      processed += Number(data["processed"] ?? 0);
      if (data["parseFailed"] === true) parseFailed = true;
      if (data["done"] === true) break;
      setTriageState({ processed, remaining: Number(data["remaining"] ?? 0) });
    }
    setTriageState(null);
    await loadIssues();
    if (stopped) setActionResult("\u23F9 " + t("review.triageStopped"));
    else if (processed === 0) {
      setActionResult("\u2717 " + t("review.triageNothing"));
    } else {
      setActionResult("\u2713 " + t("review.triageDone").replace("{a}", String(closed.duplicate)).replace("{b}", String(closed.obsolete)).replace("{c}", String(closed.false_positive)).replace("{d}", String(kept)) + (parseFailed ? t("review.triageParseFail") : ""));
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
      const concurrency = data.fixConcurrency;
      if (typeof concurrency === "number") setFixConcurrency(String(concurrency));
    } catch {
    }
  };
  const saveModelConfig = async () => {
    if (modelTiers === null) return;
    setModelSaving(true);
    setModelSaved(false);
    try {
      const concurrency = Number(fixConcurrency);
      const response = await fetch("/project-control/api/model-config", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tiers: modelTiers, ...Number.isFinite(concurrency) ? { fixConcurrency: Math.max(1, Math.min(10, Math.trunc(concurrency))) } : {} })
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
  const isUndigested = (commit) => {
    if (commit.sha === "working") return false;
    if (commitBySha.get(commit.sha)?.analyzed === true) return false;
    return lastSummaryAt === void 0 || commit.date > lastSummaryAt;
  };
  const undigestedCount = (commitsData?.commits ?? []).filter((commit) => isUndigested(commit)).length;
  const commitRounds = clusterIntoRounds(commitsData?.commits ?? []);
  const renderPickerRow = (entry) => {
    const commit = commitBySha.get(entry.sha);
    const undigested = commit !== void 0 && isUndigested(commit);
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
              (commitsData?.commits ?? []).some((commit) => isUndigested(commit)) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "button",
                {
                  style: styles.secondary,
                  title: t("picker.undigested"),
                  onClick: () => {
                    selectCommits((commitsData?.commits ?? []).filter((commit) => isUndigested(commit)).map((commit) => commit.sha));
                  },
                  children: [
                    "\u25CF ",
                    t("picker.selectAllUndigested")
                  ]
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
        undigestedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { title: t("picker.undigested"), style: { fontSize: "11px", color: themeAwareText("#d97706") }, children: [
            "\u25CF ",
            t("picker.undigestedCount").replace("{n}", String(undigestedCount))
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: styles.secondary, title: t("picker.digestAllHint"), onClick: digestAll, children: [
            "\u26A1 ",
            t("picker.digestAll")
          ] })
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
      narrative !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)", marginTop: "4px" }, children: t("narrative.digestHint") }),
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", alignItems: "center", marginTop: "8px", padding: "8px 10px", borderRadius: "6px", background: "var(--dsw-alias-bg-layer-1, #fafafa)", border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.1))" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "12px", fontWeight: 600 }, children: [
          "\u{1F916} ",
          t("fix.modelTitle")
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            type: "number",
            min: 1,
            max: 10,
            style: { ...styles.input, width: 64, textAlign: "center" },
            value: fixConcurrency,
            onChange: (e) => {
              setFixConcurrency(e.target.value);
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: t("fix.modelHint") })
      ] }),
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
      const statusFiltered = all.filter((issue) => issueStatusFilter === "" || issue.status === issueStatusFilter);
      const counts = [
        { key: "", label: t("review.filterAll"), count: statusFiltered.length },
        { key: "critical", label: "critical", count: statusFiltered.filter((issue) => issue.severity === "critical" || issue.severity === "blocker").length },
        { key: "major", label: "major", count: statusFiltered.filter((issue) => issue.severity === "major").length },
        { key: "minor", label: "minor", count: statusFiltered.filter((issue) => issue.severity === "minor").length },
        { key: "info", label: "info", count: statusFiltered.filter((issue) => issue.severity === "info").length }
      ];
      const visible = statusFiltered.filter((issue) => {
        if (issueSeverityFilter === "") return true;
        if (issueSeverityFilter === "critical") return issue.severity === "critical" || issue.severity === "blocker";
        return issue.severity === issueSeverityFilter;
      });
      const checkedVisible = visible.filter((issue) => issueChecked[issue.id] === true);
      const checkedOpen = checkedVisible.filter((issue) => issue.status === "open" || issue.status === "fixing");
      const checkedOpenTargets = Array.from(new Set(checkedOpen.map((issue) => issue.changeId)));
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { marginLeft: "16px", fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: [
            openCount,
            " \u5F85\u5904\u7406 / \u5171 ",
            all.length
          ] }),
          (state?.resolvedIssueRetentionDays ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              title: t("review.retentionHint").replace("{days}", String(state?.resolvedIssueRetentionDays ?? 7)),
              style: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "14px", height: "14px", borderRadius: "50%", border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.15))", fontSize: "10px", lineHeight: 1, color: "var(--dsw-alias-label-secondary, #6b7280)", cursor: "help", userSelect: "none", flexShrink: 0 },
              children: "?"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap", marginBottom: "10px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { style: { ...styles.select, width: "auto", padding: "3px 24px 3px 8px" }, value: issueStatusFilter, onChange: (e) => {
            setIssueStatusFilter(e.target.value);
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: t("review.statusAll") }),
            Object.entries(ISSUE_STATUS_LABELS).map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value, children: label }, value))
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              style: styles.secondary,
              onClick: () => {
                setIssueChecked((previous) => {
                  const allChecked = visible.every((issue) => previous[issue.id] === true);
                  const next = { ...previous };
                  for (const issue of visible) next[issue.id] = !allChecked;
                  return next;
                });
              },
              children: t("review.selectAll")
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.secondary, title: t("review.exportMdHint"), onClick: () => {
            exportIssuesMd(visible);
          }, children: t("review.exportMd") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              style: styles.secondary,
              title: t("review.triageHint"),
              onClick: () => {
                const openCount2 = visible.filter((issue) => issue.status === "open" || issue.status === "fixing").length;
                if (openCount2 === 0) {
                  setActionResult("\u2717 " + t("fix.dispatchNoOpen"));
                  return;
                }
                setConfirmDialog({
                  title: t("review.triageConfirmTitle"),
                  message: t("review.triageConfirmMsg").replace("{n}", "40"),
                  danger: false,
                  confirmLabel: t("review.triage"),
                  onConfirm: () => {
                    void runTriage();
                  }
                });
              },
              children: t("review.triage")
            }
          ),
          (() => {
            const openVisible = visible.filter((issue) => issue.status === "open" || issue.status === "fixing");
            const checkedIds = openVisible.filter((issue) => issueChecked[issue.id] === true).map((issue) => issue.id);
            const ids = checkedIds.length > 0 ? checkedIds : openVisible.map((issue) => issue.id);
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                style: { ...styles.secondary, fontWeight: 600 },
                title: t("fix.dispatchHintMain"),
                onClick: () => {
                  if (ids.length === 0) {
                    setActionResult("\u2717 " + t("fix.dispatchNoOpen"));
                    return;
                  }
                  setConfirmDialog({
                    title: t("fix.dispatchModeTitle"),
                    message: t("fix.dispatchModeMsg").replace("{n}", String(ids.length)),
                    danger: false,
                    confirmLabel: t("fix.dispatchAuto"),
                    alt: { label: t("fix.dispatchPlan"), onAlt: () => {
                      void dispatchFix([], ids, "plan");
                    } },
                    onConfirm: () => {
                      void dispatchFix([], ids, "fix");
                    }
                  });
                },
                children: [
                  "\u{1F680} ",
                  t("fix.dispatch"),
                  "(",
                  String(ids.length),
                  ")"
                ]
              }
            );
          })(),
          (() => {
            const pendingPlans = visible.filter((issue) => issue.fixPlan?.status === "pending");
            return pendingPlans.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                style: styles.secondary,
                title: t("fix.dispatchPlansHint"),
                onClick: () => {
                  setConfirmDialog({ title: t("fix.dispatchPlans"), message: `\u5C06\u6D3E\u53D1 ${String(pendingPlans.length)} \u4E2A\u5DF2\u4EA7\u51FA\u7684\u4FEE\u590D\u65B9\u6848\u7ED9\u5B50 Agent \u5E76\u53D1\u6267\u884C\uFF08\u72EC\u7ACB worktree\uFF0C\u6D88\u8017\u6A21\u578B\u7528\u91CF\uFF1B\u5B8C\u6210\u540E\u81EA\u52A8\u56DE\u5199\u5E76\u63D0\u4EA4\uFF09\u3002`, danger: false, confirmLabel: t("fix.dispatchPlans"), onConfirm: () => {
                    void dispatchFix(pendingPlans.map((issue) => issue.fixPlan.id), [], "fix");
                  } });
                },
                children: [
                  "\u{1F4E6} ",
                  t("fix.dispatchPlans"),
                  "(",
                  String(pendingPlans.length),
                  ")"
                ]
              }
            ) : null;
          })(),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.secondary, onClick: () => {
            void loadIssues();
          }, children: t("review.refresh") })
        ] }),
        fixTasks.length > 0 && (() => {
          const FIX_STATUS_LABELS = { queued: t("fix.taskQueued"), running: t("fix.taskRunning"), merging: t("fix.taskMerging"), redo: t("fix.taskRedo"), done: t("fix.taskDone"), conflict: t("fix.taskConflict"), failed: t("fix.taskFailed"), cancelled: t("fix.taskCancelled") };
          const fixActive = fixTasks.some((task) => task.status === "queued" || task.status === "running" || task.status === "merging" || task.status === "redo");
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: "\u{1F916} " + t("fix.status"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px", fontSize: "11px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: [
                String(fixTasks.filter((task) => task.status === "done").length),
                "/",
                String(fixTasks.length),
                " ",
                t("fix.taskDone")
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
              fixActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
                void cancelFix();
              }, children: [
                "\u23F9 ",
                t("fix.stop")
              ] })
            ] }),
            fixTasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "6px", alignItems: "flex-start", padding: "6px 4px", borderBottom: "1px solid var(--dsw-alias-border-l3, rgba(5,5,5,0.06))", fontSize: "11px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.badge(task.status === "done" ? "#4ec9b0" : task.status === "queued" ? "#8b949e" : task.status === "running" || task.status === "merging" || task.status === "redo" ? "#dcdcaa" : "#f14c4c"), children: [
                FIX_STATUS_LABELS[task.status] ?? task.status,
                task.mode === "plan" ? "\xB7\u65B9\u6848" : "",
                task.attempt > 1 ? `\xB7${t("fix.attempt").replace("{n}", String(task.attempt))}` : ""
              ] }),
              (() => {
                const active = task.status === "running" || task.status === "merging" || task.status === "redo";
                if (!active) return null;
                const minutes = Math.max(0, Math.round((Date.now() - (task.startedAt ?? Date.now())) / 6e4));
                const extra = [
                  minutes > 0 ? t("fix.runtime").replace("{n}", String(minutes)) : "",
                  (task.resumes ?? 0) > 0 ? t("fix.resumes").replace("{n}", String(task.resumes)) : "",
                  (task.probes ?? 0) > 0 ? t("fix.probes").replace("{n}", String(task.probes)) : ""
                ].filter((part) => part !== "");
                return extra.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "var(--dsw-alias-label-secondary, #6b7280)", flexShrink: 0 }, children: extra.join(" \xB7 ") }) : null;
              })(),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { minWidth: 0, flex: 1 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { display: "block", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: task.title }),
                (task.status === "running" || task.status === "queued") && task.currentAction !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "block", color: themeAwareText("#d97706"), fontFamily: "var(--dsw-alias-font-mono, ui-monospace, monospace)" }, children: [
                  "\u25B8 ",
                  task.currentAction
                ] }),
                task.summary !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { display: "block", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: task.summary }),
                task.impact !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "block" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.badge(task.impact.riskLevel === "low" ? "#4ec9b0" : task.impact.riskLevel === "medium" ? "#dcdcaa" : "#f14c4c"), children: [
                    "\u5F71\u54CD ",
                    task.impact.riskLevel,
                    "(",
                    String(task.impact.riskScore),
                    ")"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: [
                    " ",
                    "\u76F4\u63A5 ",
                    String(task.impact.direct.length),
                    " \xB7 \u95F4\u63A5 ",
                    String(task.impact.indirect.length),
                    " \xB7 \u6F5C\u5728 ",
                    String(task.impact.potential.length),
                    task.impact.indirect.length > 0 ? `\uFF08\u5982 ${task.impact.indirect.slice(0, 2).join(", ")}\uFF09` : ""
                  ] })
                ] }),
                task.error !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { display: "block", color: themeAwareText("#d1242f") }, children: task.error }),
                (task.files ?? []).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "block", fontFamily: "var(--dsw-alias-font-mono, ui-monospace, monospace)", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: [
                  task.files.slice(0, 4).join(", "),
                  task.commit !== void 0 ? ` \xB7 ${task.commit}` : ""
                ] })
              ] })
            ] }, task.issueId))
          ] });
        })(),
        (checkedVisible.length > 0 || batchVerifyState !== null || triageState !== null) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", padding: "6px 10px", marginBottom: "10px", background: "var(--dsw-alias-bg-layer-1, #fafafa)", border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.1))", borderRadius: "6px", fontSize: "11px" }, children: batchVerifyState !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { color: themeAwareText("#d97706") }, children: [
            "\u23F3 ",
            t("review.batchProgress").replace("{i}", String(batchVerifyState.done)).replace("{n}", String(batchVerifyState.total))
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
            batchStopRef.current = true;
          }, children: t("review.batchStop") })
        ] }) : triageState !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { color: themeAwareText("#d97706") }, children: [
            "\u23F3 ",
            t("review.triageProgress").replace("{n}", String(triageState.processed)).replace("{m}", triageState.remaining >= 0 ? String(triageState.remaining) : "\u2026")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
            batchStopRef.current = true;
          }, children: t("review.triageStop") })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("review.checkedCount").replace("{n}", String(checkedVisible.length)) }),
          checkedOpenTargets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" },
              title: t("review.batchVerifyConfirmMsg").replace("{n}", String(checkedOpenTargets.length)),
              onClick: () => {
                setConfirmDialog({ title: t("review.batchVerifyConfirmTitle"), message: t("review.batchVerifyConfirmMsg").replace("{n}", String(checkedOpenTargets.length)), danger: false, confirmLabel: t("review.batchVerify"), onConfirm: () => {
                  void runBatchVerify(checkedOpenTargets);
                } });
              },
              children: [
                "\u{1F50D} ",
                t("review.batchVerify"),
                "(",
                String(checkedOpenTargets.length),
                ")"
              ]
            }
          ),
          checkedOpen.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
            void markIssuesHandled(checkedOpen.map((issue) => issue.id));
          }, children: [
            "\u2713 ",
            t("review.markHandled")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
            exportIssuesMd(checkedVisible);
          }, children: t("review.exportMd") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
            setIssueChecked({});
          }, children: t("picker.clear") })
        ] }) }),
        all.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: issuesData === null ? "\u2026" : t("review.recordsEmpty") }) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("notes.emptySearch") }) : visible.map((issue) => {
          const expanded = issueExpanded[issue.id] === true;
          const description = issue.description ?? "";
          const long = description.length > 200;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.noteCard, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.noteTitleRow, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "input",
                  {
                    type: "checkbox",
                    checked: issueChecked[issue.id] === true,
                    onChange: () => {
                      setIssueChecked((previous) => ({ ...previous, [issue.id]: !(previous[issue.id] === true) }));
                    },
                    style: { margin: 0, flexShrink: 0, cursor: "pointer", accentColor: "var(--dsw-alias-brand-primary, #2563eb)" }
                  }
                ),
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
                        confirmLabel: t("review.falsePositive"),
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
                ),
                (issue.status === "open" || issue.status === "fixing") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "button",
                  {
                    style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" },
                    title: t("review.markHandled"),
                    onClick: () => {
                      void markIssuesHandled([issue.id]);
                    },
                    children: [
                      "\u2713 ",
                      t("review.markHandled")
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
            issue.fixPlan != null && (() => {
              const plan = issue.fixPlan;
              const planOpen = issueExpanded[`${issue.id}-plan`] === true;
              return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "6px", borderRadius: "6px", background: "rgba(37, 99, 235, 0.05)", border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.12))", fontSize: "11px", overflow: "hidden" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "button",
                  {
                    style: { ...styles.linkBtn, width: "100%", textAlign: "left", padding: "5px 10px", display: "flex", gap: "6px", alignItems: "center" },
                    onClick: () => {
                      setIssueExpanded((previous) => ({ ...previous, [`${issue.id}-plan`]: !(previous[`${issue.id}-plan`] === true) }));
                    },
                    children: [
                      "\u{1F4C4} ",
                      t("fix.plan"),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(plan.status === "pending" ? "#d97706" : "#2563eb"), children: plan.status === "pending" ? "\u5F85\u8BC4\u5BA1" : "\u5DF2\u6D3E\u53D1" }),
                      plan.files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "var(--dsw-alias-label-secondary, #6b7280)", fontFamily: "var(--dsw-alias-font-mono, ui-monospace, monospace)" }, children: plan.files.slice(0, 3).join(", ") }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
                      planOpen ? "\u25B2" : "\u25BC"
                    ]
                  }
                ),
                planOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "2px 10px 8px", lineHeight: 1.7 }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
                      t("fix.planApproach"),
                      "\uFF1A"
                    ] }),
                    plan.approach
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
                      t("fix.planImpact"),
                      "\uFF1A"
                    ] }),
                    plan.impact
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
                      t("fix.planBenefit"),
                      "\uFF1A"
                    ] }),
                    plan.benefit
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
                      t("fix.planRisk"),
                      "\uFF1A"
                    ] }),
                    plan.risk
                  ] })
                ] })
              ] });
            })(),
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
        confirmLabel: confirmDialog.confirmLabel,
        alt: confirmDialog.alt === void 0 ? void 0 : {
          label: confirmDialog.alt.label,
          onAlt: () => {
            confirmDialog.alt.onAlt();
            setConfirmDialog(null);
          }
        },
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NsaWVudC9pbmRleC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdGhlbWUudHMiLCAiLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmtzcGFjZUZyYW1lLnRzeCIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvY29tbWl0LXJvdW5kcy50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvTW9kZXJuV29ya3NwYWNlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBDbGllbnQgcGx1Z2luIGVudHJ5IGZvciBkc2gtcHJvamVjdC1jb250cm9sLlxuICpcbiAqIFx1NUUwM1x1NUM0MFx1NjdCNlx1Njc4NFx1RkYwOFx1NURGMlx1OUE4Q1x1OEJDMVx1RkYwQzIwMjYtMDgtMzBcdUZGMDlcdUZGMUFcbiAqIC0gXHU1REU1XHU0RjVDXHU1M0YwXHU5MDZFXHU4NTNEXHU1Qjk4XHU2NUI5IGBkZXRhaWxzYCBcdTY5RkRcdUZGMDhwcmlvcml0eSAtMTBcdUZGMENcdTVCOThcdTY1QjkgRGV0YWlsc1BhbmVsIFx1NzU1OVx1NTcyOFx1OEQyNlx1NjcyQ1x1NEUwQVx1RkYwQ1xuICogICBcdTUzNzhcdThGN0RcdTYyMTFcdTRFRUNcdTc2ODRcdTZDRThcdTUxOENcdTUzNzNcdTYwNjJcdTU5MERcdUZGMDlcdUZGMENcdTZFMzJcdTY3RDNcdTU3MjhcdTRFM0JcdTY4NDZcdTY3QjYgZGV0YWlscyBcdTUyMTdcdUZGMUJcbiAqIC0gV29ya3NwYWNlRnJhbWUgXHU2Q0U4XHU1MTY1XHU2ODM3XHU1RjBGXHU4ODY4XHVGRjBDXHU2MjhBXHU1Qjk4XHU2NUI5XHU3RjUxXHU2ODNDXHU4OUM2XHU4OUM5XHU2MzYyXHU1MjE3XHVGRjFBXHU4MDRBXHU1OTI5XHVGRjA4Y2VudGVyQ29sXHVGRjA5XHU2NzAwXHU1M0YzXHUzMDAxXG4gKiAgIFx1NURFNVx1NEY1Q1x1NTNGMFx1RkYwOGRldGFpbHNDb2xcdUZGMDlcdTVDNDVcdTRFMkQgMWZyXHVGRjFCXHU2NUUwXHU0RjFBXHU4QkREXHU4NDNEXHU1NzMwXHU5ODc1XHVGRjA4ZGF0YS1kZXRhaWxzLWNvbGxhcHNlZFx1RkYwOVxuICogICBcdTgxRUFcdTUyQThcdTYwNjJcdTU5MERcdTUzOUZcdTc1MUZcdTUyMTdcdTVFOEZcdUZGMUJcbiAqIC0gXHU1REU2XHU0RkE3XHU1Qjk4XHU2NUI5XHU1QkZDXHU4MjJBXHUzMDAxXHU1Qjk4XHU2NUI5XHU4MDRBXHU1OTI5XHU2NzJDXHU0RjUzXHU5NkY2XHU2NTM5XHU1MkE4XHVGRjFCXG4gKiAtIFx1NEZBN1x1OEZCOVx1NjgwRlx1NjMwOVx1OTRBRVx1NTcyOFx1MzAwQ1x1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTNGMCBcdTIxQzQgXHU1Qjk4XHU2NUI5XHU4QkU2XHU2MEM1XHU5NzYyXHU2NzdGXHUzMDBEXHU5NUY0XHU1MjA3XHU2MzYyXHVGRjA4XHU1M0VGXHU5MDA2XHVGRjA5XHVGRjFCXG4gKiAtIGB0b29sLmNhbGwudG9vbHZpZXdgIFx1NEUzQSBhbmFseXplX2NoYW5nZSBcdTRGRERcdTc1NTlcdTRFMTNcdTVDNUVcdTUzNjFcdTcyNDdcdUZGMUJcbiAqIC0gXHU2NTg3XHU2ODQ4XHU1MTY4XHU5MEU4XHU3RUNGIGN0eC5sb2NhbGUgXHU4QkNEXHU1MTc4XHVGRjA4emggLyBlblx1RkYwOVx1MzAwMlxuICpcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2xcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDaGFuZ2VDYXJkIH0gZnJvbSAnLi9jb21wb25lbnRzL0NoYW5nZUNhcmQudHMnXG5pbXBvcnQgeyBXT1JLU1BBQ0VfRElDVCwgV29ya3NwYWNlRnJhbWUgfSBmcm9tICcuL2NvbXBvbmVudHMvV29ya3NwYWNlRnJhbWUudHN4J1xuaW1wb3J0IHsgTW9kZXJuV29ya3NwYWNlIH0gZnJvbSAnLi9jb21wb25lbnRzL01vZGVybldvcmtzcGFjZS50c3gnXG5cbmNvbnN0IE5TID0gJ3Byb2plY3QtY29udHJvbCdcblxuZXhwb3J0IGNvbnN0IG5hbWUgPSAnY2xpZW50LXByb2plY3QtY29udHJvbCdcbmV4cG9ydCBjb25zdCBpbmplY3QgPSBbJ3Nsb3RzJywgJ2xvY2FsZScsICdsYXlvdXQnXVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoY3R4OiBhbnkpOiB2b2lkIHtcbiAgY3R4LmVmZmVjdCgoKSA9PiBjdHgubG9jYWxlLnJlZ2lzdGVyKE5TLCB7IHpoOiBXT1JLU1BBQ0VfRElDVC56aCwgZW46IFdPUktTUEFDRV9ESUNULmVuIH0pLCAncHJvamVjdC1jb250cm9sOiBkaWN0aW9uYXJpZXMnKVxuICBjb25zdCBsYXlvdXQgPSBjdHgubGF5b3V0XG5cbiAgLy8gXHUyNTAwXHUyNTAwIDEuIFx1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTNGMFx1RkYxQVx1OTA2RVx1ODUzRCBkZXRhaWxzIFx1NjlGRFx1RkYwOFx1NTNFRlx1OTAwNlx1RkYwOVx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAvLyBcdTY1QjBcdTdBOTdcdTUzRTNcdTlFRDhcdThCQTRcdTRFMERcdTY2M0VcdTc5M0FcdTVERTVcdTRGNUNcdTUzRjBcdUZGMDhcdTRGRERcdTYzMDFcdTVCOThcdTY1QjlcdTUzOUZcdTc1MUZcdTg5QzZcdTg5RDJcdUZGMDlcdUZGMENcdTc1MzFcdTRGQTdcdThGQjlcdTY4MEZcdTYzMDlcdTk0QUVcdTY2M0VcdTVGMEZcdTYyNTNcdTVGMDBcdTMwMDJcbiAgbGV0IHdvcmtzcGFjZUVuYWJsZWQgPSBmYWxzZVxuICBsZXQgZGlzcG9zZVdvcmtzcGFjZTogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkXG5cbiAgY29uc3QgcmVnaXN0ZXJXb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XG4gICAgZGlzcG9zZVdvcmtzcGFjZSA9IGN0eC5zbG90cy5yZWdpc3RlcihcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2RldGFpbHMnLFxuICAgICAgICBwcmlvcml0eTogLTEwLFxuICAgICAgICBsb2NhbGU6IE5TLFxuICAgICAgfSxcbiAgICAgIC8vIFx1NjMwMlx1OEY3RFx1NTM3M1x1NjI1M1x1NUYwMCBkZXRhaWxzIFx1OEY2OFx1OTA1M1x1RkYwOFx1OTc2Mlx1Njc3Rlx1NTA0Rlx1NTk3RFx1OUVEOFx1OEJBNCAwXHVGRjA5XHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwXHU5NzAwXHU4OTgxXHU3NzFGXHU1QjlFXHU1QkJEXHU1RUE2XHVGRjFCXG4gICAgICAvLyBcdTY1RTBcdTRGMUFcdThCRERcdTg0M0RcdTU3MzBcdTk4NzVcdThGNjhcdTkwNTNcdTYwNTIgMFx1RkYwQ1x1NTkyOVx1NzEzNlx1NEZERFx1NjMwMVx1NTM5Rlx1NzUxRlx1ODJGMVx1OTZDNFx1OTg3NVx1NUUwM1x1NUM0MFx1MzAwMlxuICAgICAgLy8gXHU0RjFBXHU4QkREXHU1MjA3XHU2MzYyXHU2NUY2XHU1Qjk4XHU2NUI5XHU0RjFBIGNsb3NlRGV0YWlscyBcdTIwMTRcdTIwMTQgXHU1RUY2XHU1NDBFXHU0RTAwXHU2MkNEXHU5MUNEXHU2NUIwXHU2NDkxXHU1RjAwXHVGRjA4XHU1QjhGXHU0RUZCXHU1MkExXHU2NjVBXHU0RThFXHU3MjM2XHU3RUE3IGVmZmVjdFx1RkYwOVx1MzAwMlxuICAgICAgKHByb3BzOiBhbnkpID0+IHtcbiAgICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICBsYXlvdXQ/Lm9wZW5EZXRhaWxzPy4oKVxuICAgICAgICB9LCBbXSlcbiAgICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICBpZiAocHJvcHMuc2Vzc2lvbklkID09PSB1bmRlZmluZWQpIHJldHVyblxuICAgICAgICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiBsYXlvdXQ/Lm9wZW5EZXRhaWxzPy4oKSwgMClcbiAgICAgICAgICByZXR1cm4gKCkgPT4geyBjbGVhclRpbWVvdXQodGltZXIpIH1cbiAgICAgICAgfSwgW3Byb3BzLnNlc3Npb25JZF0pXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFdvcmtzcGFjZUZyYW1lLCB7IC4uLnByb3BzLCBrZXk6IHByb3BzLnNlc3Npb25JZCA/PyAnbGFuZGluZycsIGxheW91dCB9KVxuICAgICAgfSxcbiAgICApXG4gIH1cbiAgY29uc3QgdW5yZWdpc3RlcldvcmtzcGFjZSA9ICgpOiB2b2lkID0+IHtcbiAgICBkaXNwb3NlV29ya3NwYWNlPy4oKVxuICAgIGRpc3Bvc2VXb3Jrc3BhY2UgPSB1bmRlZmluZWRcbiAgfVxuXG4gIGN0eC5zbG90cy5pbmplY3QoJ2RldGFpbHMnLCAoKSA9PiB7XG4gICAgaWYgKHdvcmtzcGFjZUVuYWJsZWQpIHJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdW5yZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgfVxuICB9KVxuXG4gIC8vIFx1MjUwMFx1MjUwMCAyLiBcdTRGQTdcdThGQjlcdTY4MEZcdTVFOTVcdTkwRThcdUZGMUFcdTVERTVcdTRGNUNcdTUzRjAgXHUyMUM0IFx1NUI5OFx1NjVCOVx1OEJFNlx1NjBDNSBcdTUyMDdcdTYzNjIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gIC8vIFx1NjMwOVx1OTRBRVx1NzJCNlx1NjAwMVx1NjYwRVx1NzkzQVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1NjYzRVx1NzkzQVx1NEUyRCBcdTIxOTIgXHUzMDBDXHVEODNFXHVEREVEIFx1NURFNVx1NEY1Q1x1NTNGMCBcdTI3MTNcdTMwMERcdUZGMUJcdTVERjJcdTUyMDdcdTVCOThcdTY1QjlcdThCRTZcdTYwQzUgXHUyMTkyIFx1MzAwQ1x1RDgzRVx1RERFRCBcdTYyNTNcdTVGMDBcdTVERTVcdTRGNUNcdTUzRjBcdTMwMERcdTlBRDhcdTRFQUVcdUZGMENcbiAgLy8gXHU3NTI4XHU2MjM3XHU5NjhGXHU2NUY2XHU3NzBCXHU1Rjk3XHU1MjMwXHU2MDBFXHU0RTQ4XHU1MjA3XHU1NkRFXHU2NzY1XHVGRjA4XHU1MjA3XHU2MzYyXHU3RUNGIHdpbmRvdyBcdTRFOEJcdTRFRjZcdTkwMUFcdTc3RTVcdTYzMDlcdTk0QUVcdTkxQ0RcdTZFMzJcdTY3RDNcdUZGMDlcdTMwMDJcbiAgY29uc3QgVE9HR0xFX0VWRU5UID0gJ3BjLXdvcmtzcGFjZS10b2dnbGUnXG4gIGNvbnN0IGZpcmVUb2dnbGUgPSAoZW5hYmxlZDogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChUT0dHTEVfRVZFTlQsIHsgZGV0YWlsOiBlbmFibGVkIH0pKVxuICB9XG4gIGNvbnN0IGRpc21pc3NNb2Rlcm5Xb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XG4gICAgaWYgKCF3b3Jrc3BhY2VFbmFibGVkKSByZXR1cm5cbiAgICB3b3Jrc3BhY2VFbmFibGVkID0gZmFsc2VcbiAgICBmaXJlVG9nZ2xlKGZhbHNlKVxuICB9XG5cbiAgLy8gMC4yLnggXHU3Njg0XHU0RjFBXHU4QkREXHU2NzBEXHU1MkExXHU1M0VGXHU5MDA5XHU2Q0U4XHU1MTY1XHVGRjFBXHU2NUU3XHU3MjQ4XHU2Q0ExXHU2NzA5XHU2NUIwXHU3MjQ4XHU1RTAzXHU1QzQwXHU2M0E1XHU1M0UzXHVGRjBDXHU0RUNEXHU2Q0JGXHU3NTI4IGRldGFpbHMgXHU1MjA2XHU2NTJGXHUzMDAyXG4gIGN0eC5pbmplY3QoWyd1aVNlc3Npb24nXSwgKHNjb3BlOiBhbnkpID0+IHtcbiAgICBpZiAobGF5b3V0LnBhbmVsSW5mbyA9PT0gdW5kZWZpbmVkKSByZXR1cm5cbiAgICBjb25zdCBjdXJyZW50ID0gc2NvcGUudWlTZXNzaW9uLmFkYXB0ZXIuY3VycmVudFxuICAgIHNjb3BlLnNsb3RzLmluamVjdCgnc2hlbGwub3ZlcmxheScsICgpID0+IHNjb3BlLnNsb3RzLnJlZ2lzdGVyKHtcbiAgICAgIG5hbWU6ICdzaGVsbC5vdmVybGF5JywgaWQ6ICdwcm9qZWN0LWNvbnRyb2wtd29ya3NwYWNlJyxcbiAgICB9LCAoKSA9PiB7XG4gICAgICBjb25zdCBbZW5hYmxlZCwgc2V0RW5hYmxlZF0gPSBSZWFjdC51c2VTdGF0ZSh3b3Jrc3BhY2VFbmFibGVkKVxuICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IChldmVudDogRXZlbnQpOiB2b2lkID0+IHsgc2V0RW5hYmxlZCgoZXZlbnQgYXMgQ3VzdG9tRXZlbnQ8Ym9vbGVhbj4pLmRldGFpbCkgfVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpXG4gICAgICAgIHJldHVybiAoKSA9PiB7IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFRPR0dMRV9FVkVOVCwgaGFuZGxlcikgfVxuICAgICAgfSwgW10pXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChNb2Rlcm5Xb3Jrc3BhY2UsIHsgY3VycmVudCwgcGFuZWxJbmZvOiBsYXlvdXQucGFuZWxJbmZvLCBlbmFibGVkLCBvbkRpc21pc3M6IGRpc21pc3NNb2Rlcm5Xb3Jrc3BhY2UgfSlcbiAgICB9KSlcbiAgfSlcblxuICBjdHguc2xvdHMuaW5qZWN0KCdzaWRlYmFyLmZvb3Rlci5hY3Rpb24nLCAoKSA9PiB7XG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XG4gICAgICBuYW1lOiAnc2lkZWJhci5mb290ZXIuYWN0aW9uJyxcbiAgICAgIGlkOiAncHJvamVjdC1jb250cm9sLXRvZ2dsZScsXG4gICAgfSwgKCkgPT4ge1xuICAgICAgY29uc3QgW2VuYWJsZWQsIHNldEVuYWJsZWRdID0gUmVhY3QudXNlU3RhdGUod29ya3NwYWNlRW5hYmxlZClcbiAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQ6IEV2ZW50KTogdm9pZCA9PiB7IHNldEVuYWJsZWQoKGV2ZW50IGFzIEN1c3RvbUV2ZW50PGJvb2xlYW4+KS5kZXRhaWwpIH1cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoVE9HR0xFX0VWRU5ULCBoYW5kbGVyKVxuICAgICAgICByZXR1cm4gKCkgPT4geyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpIH1cbiAgICAgIH0sIFtdKVxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdidXR0b24nLFxuICAgICAgICB7XG4gICAgICAgICAgJ2RhdGEtdGVzdGlkJzogJ3Byb2plY3QtY29udHJvbC1zaWRlYmFyLXRvZ2dsZScsXG4gICAgICAgICAgdGl0bGU6IGVuYWJsZWQgPyAnXHU1RjUzXHU1MjREXHU2NjNFXHU3OTNBXHU5ODc5XHU3NkVFXHU2ODM4XHU2N0U1XHU1M0YwXHUzMDAyXHU3MEI5XHU1MUZCXHU1M0VGXHU0RTM0XHU2NUY2XHU1MjA3XHU2MzYyXHU0RTNBXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHVGRjA4XHU2N0U1XHU3NzBCXHU1REU1XHU1MTc3XHU4QzAzXHU3NTI4XHU3Njg0XHU1QjhDXHU2NTc0XHU4RjkzXHU1MTY1L1x1OEY5M1x1NTFGQVx1RkYwOVx1RkYxQlx1NTE4RFx1NzBCOVx1NjcyQ1x1NjMwOVx1OTRBRVx1NTM3M1x1NjA2Mlx1NTkwRFx1MzAwMicgOiAnXHU1RjUzXHU1MjREXHU2NjNFXHU3OTNBXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHUzMDAyXHU3MEI5XHU1MUZCXHU2MDYyXHU1OTBEXHU5ODc5XHU3NkVFXHU2ODM4XHU2N0U1XHU1M0YwXHUzMDAyJyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnNnB4JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggMTBweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgY29sb3I6IGVuYWJsZWQgPyAnaW5oZXJpdCcgOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IGVuYWJsZWQgPyA0MDAgOiA2MDAsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJywgb3BhY2l0eTogMC45LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgd29ya3NwYWNlRW5hYmxlZCA9ICF3b3Jrc3BhY2VFbmFibGVkXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIGxheW91dD8ub3BlbkRldGFpbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpZiAod29ya3NwYWNlRW5hYmxlZCAmJiBkaXNwb3NlV29ya3NwYWNlID09PSB1bmRlZmluZWQpIHJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghd29ya3NwYWNlRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgICAgdW5yZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgICAgICAgICAgICAgICBsYXlvdXQ/LmNsb3NlRGV0YWlscz8uKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAod29ya3NwYWNlRW5hYmxlZCAmJiBsYXlvdXQucGFuZWxJbmZvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAobGF5b3V0LnBhbmVsSW5mby5nZXRTbmFwc2hvdCgpLmFjdGl2ZVBhbmVsSWQgIT09IG51bGwpIGxheW91dC5zZWxlY3RQYW5lbChudWxsKVxuICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0YmFyID0gY3R4LmdldCgnc2lkZWJhclJpZ2h0JylcbiAgICAgICAgICAgICAgICBpZiAocmlnaHRiYXI/LmlzRXhwYW5kZWQoKSkgcmlnaHRiYXIudG9nZ2xlRXhwYW5kZWQoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgICAgICAgICB3b3Jrc3BhY2VFbmFibGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdbcHJvamVjdC1jb250cm9sXSB3b3Jrc3BhY2UgdG9nZ2xlIGZhaWxlZCcsIGVycm9yKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlyZVRvZ2dsZSh3b3Jrc3BhY2VFbmFibGVkKVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGVuYWJsZWQgPyAnXHVEODNFXHVEREVEIFx1NURFNVx1NEY1Q1x1NTNGMCBcdTI3MTMnIDogJ1x1RDgzRVx1RERFRCBcdTYyNTNcdTVGMDBcdTVERTVcdTRGNUNcdTUzRjAnLFxuICAgICAgKVxuICAgIH0pXG4gIH0pXG5cbiAgLy8gXHUyNTAwXHUyNTAwIDMuIFx1ODA0QVx1NTkyOVx1NURFNVx1NTE3N1x1NTM2MVx1NzI0N1x1RkYwOFx1NjI2N1x1ODg0Qy9cdThCQzRcdTVCQTEvXHU5QThDXHU2NTM2XHVGRjA5XHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gIGNvbnN0IHNpbXBsZVJlc3VsdENhcmQgPSAodGl0bGU6IHN0cmluZyk6ICgocHJvcHM6IGFueSkgPT4gYW55KSA9PiAocHJvcHM6IGFueSkgPT4ge1xuICAgIGNvbnN0IG91dHB1dCA9IHByb3BzPy5vdXRwdXRcbiAgICBjb25zdCB0ZXh0ID0gdHlwZW9mIG91dHB1dCA9PT0gJ3N0cmluZydcbiAgICAgID8gb3V0cHV0XG4gICAgICA6IG91dHB1dD8uc3VtbWFyeSA/PyBvdXRwdXQ/Lmlzc3VlcyA/PyBvdXRwdXQ/LmRldGFpbHMgPz8gKG91dHB1dCA/IEpTT04uc3RyaW5naWZ5KG91dHB1dCwgbnVsbCwgMikgOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHUyMDI2JylcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICdkaXYnLFxuICAgICAge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICBwYWRkaW5nOiAnMTBweCAxMnB4JyxcbiAgICAgICAgICBtYXJnaW46ICc0cHggMCcsXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXG4gICAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjYsXG4gICAgICAgICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyxcbiAgICAgICAgICBtYXhIZWlnaHQ6IDI2MCxcbiAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnNHB4JyB9IH0sIHRpdGxlKSxcbiAgICAgIFN0cmluZyh0ZXh0KSxcbiAgICApXG4gIH1cblxuICAvLyBcdTI1MDBcdTI1MDAgMy4gYW5hbHl6ZV9jaGFuZ2UgXHU0RTEzXHU1QzVFXHU1REU1XHU1MTc3XHU1MzYxXHU3MjQ3IFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICBjdHguc2xvdHMuaW5qZWN0KCd0b29sLmNhbGwudG9vbHZpZXcnLCAoKSA9PiB7XG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XG4gICAgICBuYW1lOiAndG9vbC5jYWxsLnRvb2x2aWV3JyxcbiAgICAgIGtleTogJ2FuYWx5emVfY2hhbmdlJyxcbiAgICB9LCAocHJvcHM6IGFueSkgPT4ge1xuICAgICAgaWYgKHByb3BzPy50b29sTmFtZSAhPT0gJ2FuYWx5emVfY2hhbmdlJykgcmV0dXJuIG51bGxcbiAgICAgIGNvbnN0IG91dHB1dCA9IHByb3BzPy5vdXRwdXRcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENoYW5nZUNhcmQsIHtcbiAgICAgICAgdGl0bGU6ICdcdTUzRDhcdTY2RjRcdTUyMDZcdTY3OTBcdTYyQTVcdTU0NEEgKENoYW5nZSBBbmFseXNpcyknLFxuICAgICAgICBmaWxlc0NoYW5nZWQ6IG91dHB1dD8uZmlsZXNDaGFuZ2VkID8/IDAsXG4gICAgICAgIGluc2VydGlvbnM6IG91dHB1dD8uaW5zZXJ0aW9ucyA/PyAwLFxuICAgICAgICBkZWxldGlvbnM6IG91dHB1dD8uZGVsZXRpb25zID8/IDAsXG4gICAgICAgIGV2aWRlbmNlSWQ6IG91dHB1dD8uZXZpZGVuY2VJZCxcbiAgICAgICAgc3RhdHVzOiBvdXRwdXQgPyAnY29tcGxldGVkJyA6ICdhbmFseXppbmcnLFxuICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG4gIGZvciAoY29uc3QgW3Rvb2xLZXksIHRpdGxlXSBvZiBbXG4gICAgWydzdGFydF9ydW4nLCAnXHVEODNEXHVERTgwIFx1NjI2N1x1ODg0QyBSdW4nXSxcbiAgICBbJ3J1bl9yZXZpZXcnLCAnXHVEODNEXHVERDBEIFx1NEVFM1x1NzgwMVx1OEJDNFx1NUJBMSddLFxuICAgIFsncnVuX3ZlcmlmaWNhdGlvbicsICdcdTI3MDUgXHU5QThDXHU2NTM2XHU5QThDXHU4QkMxJ10sXG4gIF0gYXMgY29uc3QpIHtcbiAgICBjdHguc2xvdHMuaW5qZWN0KCd0b29sLmNhbGwudG9vbHZpZXcnLCAoKSA9PiB7XG4gICAgICByZXR1cm4gY3R4LnNsb3RzLnJlZ2lzdGVyKHsgbmFtZTogJ3Rvb2wuY2FsbC50b29sdmlldycsIGtleTogdG9vbEtleSB9LCBzaW1wbGVSZXN1bHRDYXJkKHRpdGxlKSlcbiAgICB9KVxuICB9XG59XG4iLCAiLyoqXHJcbiAqIFJlYWN0IENvbXBvbmVudDogQ2hhbmdlIC8gSW5zaWdodCBDYXJkIGZvciBDaGF0IFZpZXcuXHJcbiAqIFJlbmRlcnMgc3RydWN0dXJlZCBpbnNpZ2h0cywgZGlmZiBzdGF0aXN0aWNzLCBhbmQgZXZpZGVuY2UgYmFkZ2VzLlxyXG4gKlxyXG4gKiBcdTk4OUNcdTgyNzJcdThENzAgZHN3LWFsaWFzIFx1NEUzQlx1OTg5OFx1NTNEOFx1OTFDRiArIHRoZW1lQXdhcmVUZXh0IFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYxQVxyXG4gKiBcdTZCNjRcdTUyNERcdTc1MjhcdTc2ODQgYC0tZHNoLSpgIFx1NTNEOFx1OTFDRlx1NTcyOFx1NUJCRlx1NEUzQlx1OTFDQ1x1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1NjgzN1x1NUYwRlx1NkMzOFx1OEZEQ1x1ODQzRFx1NTcyOFx1NkRGMVx1ODI3Mlx1NTE1Q1x1NUU5NVx1NEUwQVx1RkYwQ1xyXG4gKiBcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTRFMEJcdTgwNEFcdTU5MjlcdTZENDFcdTkxQ0NcdTUxRkFcdTczQjBcdTdBODFcdTUxNDBcdTlFRDFcdTUzNjFcdUZGMUJcdTY1NzBcdTVCNTdcdTdFRkYvXHU3RUEyXHU0RTVGXHU2NjJGXHU2REYxXHU4MjcyXHU1NDExXHU5MTREXHU4MjcyXHVGRjBDXHU3NjdEXHU1RTk1XHU0RTBEXHU1M0VGXHU4QkZCXHUzMDAyXHJcbiAqXHJcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9DaGFuZ2VDYXJkXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyB0aGVtZUF3YXJlVGV4dCB9IGZyb20gJy4vdGhlbWUudHMnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUNhcmRQcm9wcyB7XHJcbiAgdGl0bGU/OiBzdHJpbmdcclxuICBmaWxlc0NoYW5nZWQ/OiBudW1iZXJcclxuICBpbnNlcnRpb25zPzogbnVtYmVyXHJcbiAgZGVsZXRpb25zPzogbnVtYmVyXHJcbiAgZXZpZGVuY2VJZD86IHN0cmluZ1xyXG4gIHN0YXR1cz86IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ2hhbmdlQ2FyZDogUmVhY3QuRkM8Q2hhbmdlQ2FyZFByb3BzPiA9ICh7XHJcbiAgdGl0bGUgPSAnQ2hhbmdlIEluc2lnaHQnLFxyXG4gIGZpbGVzQ2hhbmdlZCA9IDAsXHJcbiAgaW5zZXJ0aW9ucyA9IDAsXHJcbiAgZGVsZXRpb25zID0gMCxcclxuICBldmlkZW5jZUlkLFxyXG4gIHN0YXR1cyA9ICdhbmFseXplZCcsXHJcbn0pID0+IHtcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICdkaXYnLFxyXG4gICAge1xyXG4gICAgICAnZGF0YS10ZXN0aWQnOiAncHJvamVjdC1jb250cm9sLWNoYW5nZS1jYXJkJyxcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgcGFkZGluZzogJzEwcHggMTRweCcsXHJcbiAgICAgICAgbWFyZ2luOiAnNnB4IDAnLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXHJcbiAgICAgICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgICAgIGZvbnRTaXplOiAnMTNweCcsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgJ2RpdicsXHJcbiAgICAgIHtcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBudWxsLCBgXHVEODNEXHVERDBEICR7dGl0bGV9YCksXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgJ3NwYW4nLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHggNnB4JyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJnLWluc2V0LCByZ2JhKDUsNSw1LDAuMDYpKScsXHJcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgKSxcclxuICAgICksXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEycHgnLCBmb250U2l6ZTogJzEycHgnLCBvcGFjaXR5OiAwLjkgfSB9LFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgbnVsbCwgYFx1RDgzRFx1RENDMSAke2ZpbGVzQ2hhbmdlZH0gZmlsZXNgKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjMWE3ZjM3JykgfSB9LCBgKyR7aW5zZXJ0aW9uc31gKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2YyMjJlJykgfSB9LCBgLSR7ZGVsZXRpb25zfWApLFxyXG4gICAgICBldmlkZW5jZUlkXHJcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgICAnc3BhbicsXHJcbiAgICAgICAgICAgIHsgc3R5bGU6IHsgb3BhY2l0eTogMC43LCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyB9IH0sXHJcbiAgICAgICAgICAgIGBbJHtldmlkZW5jZUlkfV1gLFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIDogbnVsbCxcclxuICAgICksXHJcbiAgKVxyXG59XHJcbiIsICIvKipcbiAqIFx1NUJBMlx1NjIzN1x1N0FFRlx1NEUzQlx1OTg5OFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYwOFx1NkRGMVx1NkQ0NVx1NTNDQ1x1NEUzQlx1OTg5OFx1NTE3MVx1NzUyOFx1NzY4NFx1NTUyRlx1NEUwMFx1NUI5RVx1NzNCMFx1RkYwOVx1MzAwMlxuICpcbiAqIFx1NEUwRFx1NTNEOFx1NUYwRlx1RkYwODIwMjYtMDktMTAgXHU2REYxXHU4MjcyXHU2QTIxXHU1RjBGXHUzMDBDXHU5ODc1XHU3QjdFXHU3NjdEXHU1NzU3XHUzMDBEXHU0RThCXHU2NTQ1XHU1NDBFXHU1NkZBXHU1MzE2XHVGRjBDXHU1MTY4XHU1QkEyXHU2MjM3XHU3QUVGXHU1RkM1XHU5ODdCXHU5MDc1XHU1Qjg4XHVGRjA5XHVGRjFBXG4gKiAxLiBcdTk2OEZcdTRFM0JcdTk4OThcdTUzRDhcdTUzMTZcdTc2ODRcdTVGM0FcdThDMDNcdTgyNzJcdTY1ODdcdTVCNTdcdTVGQzVcdTk4N0JcdTdFQ0YgdGhlbWVBd2FyZVRleHQoKVx1RkYxQVx1NkQ0NVx1ODI3Mlx1NEUzQlx1OTg5OFx1ODFFQVx1NTJBOFx1NkRGMVx1NTMxNlx1NTIzMFx1NzY3RFx1NUU5NVxuICogICAgXHU1QkY5XHU2QkQ0XHU1RUE2IFx1MjI2NTQuNToxXHVGRjBDXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU4MUVBXHU1MkE4XHU2M0QwXHU0RUFFXHU1MjMwXHU2REYxXHU1RTk1IFx1MjI2NTQuNToxXHUzMDAyXHU5ODdCXHU1NzI4XHU2RTMyXHU2N0QzXHU2NzFGXHU4QzAzXHU3NTI4XHVGRjA4XHU3RUM0XHU0RUY2XHU0RjUzXHU1MTg1L1xuICogICAgXHU2RTMyXHU2N0QzXHU1MUZEXHU2NTcwXHU1MTg1XHVGRjA5XHVGRjBDXHU0RTNCXHU5ODk4XHU1MjA3XHU2MzYyXHU1NDBFXHU5NjhGXHU5MUNEXHU2RTMyXHU2N0QzXHU4MUVBXHU1MkE4XHU2NkY0XHU2NUIwXHVGRjFCXHU3OTgxXHU2QjYyXHU1NzI4XHU2QTIxXHU1NzU3XHU1MkEwXHU4RjdEXHU2NzFGXHU2QzQyXHU1MDNDXHU1NDBFXHU1QjU4XHU4RkRCXG4gKiAgICBcdTk3NTlcdTYwMDFcdTY4MzdcdTVGMEZcdTVCRjlcdThDNjFcdTMwMDJcbiAqIDIuIGFjdGl2ZSBcdTlBRDhcdTRFQUVcdTgwQ0NcdTY2NkZcdUZGMDhcdTYzMDlcdTk0QUUgLyBcdTk4NzVcdTdCN0UgLyBcdTdCNUJcdTkwMDlcdTgyQUZcdTcyNDdcdTdCNDlcdTRFMDBcdTUyMDdcIlx1OTAwOVx1NEUyRFx1NTM3M1x1NTg2Qlx1ODI3MlwiXHU3Njg0XHU4ODY4XHU5NzYyXHVGRjA5XHU0RTAwXHU1RjhCXHU3NTI4XG4gKiAgICBgdmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpYFx1RkYwOFx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1NEUwQlx1OTBGRFx1NjYyRlx1ODRERFx1ODI3Mlx1RkYwOVx1RkYwQ1x1OTE0RFx1NzY3RFx1NUI1N1x1MzAwMlxuICogICAgXHU3OTgxXHU2QjYyXHU3NTI4IC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnkgXHU0RjVDXHU4MENDXHU2NjZGXHUyMDE0XHUyMDE0XHU1QjgzXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RjFBXHU4OEFCXG4gKiAgICBcdTVCOENcdTUxNjhcdTU0MUVcdTYzODlcdUZGMDhcdTY3MkNcdTZCMjFcdTRFOEJcdTY1NDVcdTY4MzlcdTU2RTBcdUZGMDlcdTMwMDJcbiAqIDMuIFx1NjVFMFx1NkNENVx1ODlFM1x1Njc5MFx1NzY4NFx1OTg5Q1x1ODI3Mlx1RkYwOENTUyBcdTUzRDhcdTkxQ0ZcdTdCNDlcdUZGMDlcdTUzOUZcdTY4MzdcdThGRDRcdTU2REVcdUZGMUFcdTUzRDhcdTkxQ0ZcdTgyNzJcdTRFQTRcdTc1MzFcdTVCQkZcdTRFM0JcdTRFM0JcdTk4OThcdTdDRkJcdTdFREZcdTRGRERcdThCQzFcdTUzRUZcdThCRkJcdUZGMENcbiAqICAgIFx1NEY0Nlx1NzUzMVx1NkI2NFx1NUI4M1x1NEVFQ1x1NEUwRFx1NUY5N1x1NEUwRVx1Nzg2Q1x1N0YxNlx1NzgwMVx1NTI0RFx1NjY2Rlx1ODI3Mlx1NTNFMFx1NTJBMFx1NEY3Rlx1NzUyOFx1MzAwMlxuICovXG5cbi8qKiBcdTg5RTNcdTY3OTAgI3JyZ2diYiBcdTYyMTYgcmdiKCkvcmdiYSgpIFx1OTg5Q1x1ODI3Mlx1NTI0RFx1NEUwOVx1NEUyQVx1NTIwNlx1OTFDRlx1NEUzQSBbciwgZywgYl1cdUZGMUJcdTY1RTBcdTZDRDVcdTg5RTNcdTY3OTBcdThGRDRcdTU2REUgbnVsbFx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29sb3IoY29sb3I6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IG51bGwge1xuICBjb25zdCBoZXggPSAvXiMoWzAtOWEtZl17Nn0pJC9pLmV4ZWMoY29sb3IpXG4gIGlmIChoZXggIT09IG51bGwpIHtcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlci5wYXJzZUludChoZXhbMV0hLCAxNilcbiAgICByZXR1cm4gWyh2YWx1ZSA+PiAxNikgJiAyNTUsICh2YWx1ZSA+PiA4KSAmIDI1NSwgdmFsdWUgJiAyNTVdXG4gIH1cbiAgY29uc3QgZnVuY3Rpb25hbCA9IC9ecmdiYT9cXChcXHMqKFxcZHsxLDN9KVssXFxzXSsoXFxkezEsM30pWyxcXHNdKyhcXGR7MSwzfSkvaS5leGVjKGNvbG9yKVxuICBpZiAoZnVuY3Rpb25hbCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBbTnVtYmVyKGZ1bmN0aW9uYWxbMV0pLCBOdW1iZXIoZnVuY3Rpb25hbFsyXSksIE51bWJlcihmdW5jdGlvbmFsWzNdKV1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG4vKiogV0NBRyBcdTc2RjhcdTVCRjlcdTRFQUVcdTVFQTZcdUZGMDgwPVx1OUVEMVx1RkYwQzE9XHU3NjdEXHVGRjA5XHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gcmVsYXRpdmVMdW1pbmFuY2UocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IGNoYW5uZWwgPSAodmFsdWU6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdiA9IHZhbHVlIC8gMjU1XG4gICAgcmV0dXJuIHYgPD0gMC4wMzkyOCA/IHYgLyAxMi45MiA6ICgodiArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjRcbiAgfVxuICByZXR1cm4gMC4yMTI2ICogY2hhbm5lbChyKSArIDAuNzE1MiAqIGNoYW5uZWwoZykgKyAwLjA3MjIgKiBjaGFubmVsKGIpXG59XG5cbi8qKiBcdTZERjFcdTUzMTZcdTk4OUNcdTgyNzJcdTc2RjRcdTUyMzBcdTc2N0RcdTVFOTVcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgIzFmMjMyOCBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA+IDAuMTgzOyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4MWYgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHgyMyAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHgyOCAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqIFx1NjNEMFx1NEVBRVx1OTg5Q1x1ODI3Mlx1NzZGNFx1NTIzMFx1NkRGMVx1NUU5NVx1RkYwOCMxNTE1MTdcdUZGMDlcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgI2YwZjZmYyBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpZ2h0ZW5Gb3JEYXJrQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA8IDAuMjE0OyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4ZjAgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHhmNiAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHhmYyAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqXG4gKiBcdTRFM0JcdTk4OThcdTgxRUFcdTkwMDJcdTVFOTRcdTY1ODdcdTVCNTdcdTgyNzJcdUZGMUFcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTZERjFcdTUzMTZcdTUyMzBcdTc2N0RcdTVFOTUgXHUyMjY1NC41OjFcdUZGMUJcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTYzRDBcdTRFQUVcdTUyMzBcdTZERjFcdTVFOTUgXHUyMjY1NC41OjFcbiAqIFx1RkYwOFx1NkRGMVx1ODI3Mlx1NUI1N1x1NTk4MiAjNTc2MDZhIFx1NzZGNFx1NjNBNVx1NjUzRVx1NkRGMVx1NUU5NVx1NTQwQ1x1NjgzN1x1NEUwRFx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlx1NjI0MFx1NjcwOVx1NUYzQVx1OEMwM1x1ODI3Mlx1NjU4N1x1NjcyQ1x1N0VERlx1NEUwMFx1OEQ3MFx1OEZEOVx1OTFDQ1x1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhlbWVBd2FyZVRleHQoY29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJnYiA9IHBhcnNlQ29sb3IoY29sb3IpXG4gIGlmIChyZ2IgPT09IG51bGwpIHJldHVybiBjb2xvclxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5ib2R5Py5oYXNBdHRyaWJ1dGU/LignZGF0YS1kcy1kYXJrLXRoZW1lJykgPT09IHRydWUpIHtcbiAgICByZXR1cm4gbGlnaHRlbkZvckRhcmtCYWNrZ3JvdW5kKHJnYlswXSwgcmdiWzFdLCByZ2JbMl0pXG4gIH1cbiAgcmV0dXJuIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyZ2JbMF0sIHJnYlsxXSwgcmdiWzJdKVxufVxuIiwgIi8qKlxuICogUHJvamVjdCBDb250cm9sIFx1NURFNVx1NEY1Q1x1NTNGMFx1RkYwOFdvcmtzcGFjZUZyYW1lXHVGRjA5djJcdUZGMUFcdTU2RjRcdTdFRDVcIlx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVwiXHU3RUM0XHU3RUM3XHUzMDAyXG4gKlxuICogXHU1NkRCXHU0RTJBXHU5ODc1XHU3QjdFXHVGRjFBXG4gKiAxLiBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdUZGMDhcdTlFRDhcdThCQTRcdUZGMDlcdUZGMUFcdTRFRDNcdTVFOTNcdTY4MEZcdUZGMDhcdTU5MUFcdTRFRDNcdTVFOTNcdTUyMDdcdTYzNjJcdUZGMDkrIFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1RkYwOFx1NTQyQlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOStcbiAqICAgIFx1OEJFNlx1NjBDNVx1OTc2Mlx1Njc3Rlx1RkYwOEFJIFx1ODlFM1x1OEJGQlx1RkYxQVx1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OC9cdTVCOUVcdTczQjBcdTkwM0JcdThGOTEvXHU5OENFXHU5NjY5XHVGRjFCXHU0RTA5XHU3RUE3XHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0IFNWRyBcdTU2RkVcdUZGMUJcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdUZGMDlcdTMwMDJcbiAqIDIuIFx1OTg3OVx1NzZFRVx1NjAzQlx1ODlDOFx1RkYxQVx1OTg3OVx1NzZFRVx1Njg2M1x1Njg0OCArIFx1NUZFQlx1NjM3N1x1NjRDRFx1NEY1QyArIFx1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1RiArIFx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1MzAwMlxuICogMy4gXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHVGRjFBUnVuIFx1OEZEQlx1NUVBNlx1NEUwRVx1NjIxMFx1NjcyQ1x1MzAwMlxuICogNC4gXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHVGRjFBXHU2ODM4XHU2N0U1XHU3QjE0XHU4QkIwXHVGRjA4XHU1M0VGXHU1MTczXHU4MDU0XHU2M0QwXHU0RUE0XHVGRjA5KyBcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdUZGMDhcdTRFQkFcdTVERTVcdTc4NkVcdThCQTRcdUZGMDkrIFx1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNSArIFJldmlldy9cdTlBOENcdTY1MzZcdThCQjBcdTVGNTVcdTMwMDJcbiAqXG4gKiBcdTVFMDNcdTVDNDBcdTY3M0FcdTUyMzZcdTRFMERcdTUzRDhcdUZGMUFcdTkwNkVcdTg1M0RcdTVCOThcdTY1QjkgZGV0YWlscyBcdTY5RkQgKyBcdTZDRThcdTUxNjVcdTY4MzdcdTVGMEZcdTYzNjJcdTUyMTdcdUZGMDhcdTgwNEFcdTU5MjlcdTY3MDBcdTUzRjNcdUZGMDkrIFx1NTIwNlx1OTY5NFx1Njc2MVx1NjJENlx1NjJGRFx1OEJCMFx1NUZDNlx1RkYxQlxuICogXHU3RURGXHU4QkExXHU4ODRDXHU0RTI0XHU4ODRDXHU5NEIzXHU1MjM2XHU3NTMxXHU4RkQwXHU4ODRDXHU2NUY2XHU2MzA5XHU2Nzg0XHU1RUZBXHU1NEM4XHU1RTBDXHU3Q0JFXHU1MUM2XHU2Q0U4XHU1MTY1XHVGRjA4YXBwbHlTdGF0c0xpbmVDbGFtcFx1RkYwOVx1MzAwMlxuICpcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9Xb3Jrc3BhY2VGcmFtZVxuICovXG5cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHBhcnNlQ29sb3IsIHRoZW1lQXdhcmVUZXh0IH0gZnJvbSAnLi90aGVtZS50cydcbmltcG9ydCB7IGNsdXN0ZXJJbnRvUm91bmRzIH0gZnJvbSAnLi9jb21taXQtcm91bmRzLnRzJ1xuXG4vKiogXHU1QkJGXHU0RTNCIC9zdGF0ZSBcdThGRDRcdTU2REVcdTc2ODRcdTVGRUJcdTcxNjdcdTVGNjJcdTcyQjZcdUZGMDhcdTRFMEUgYXBpLXJvdXRlLnRzIGJ1aWxkU3RhdGUgXHU1QkY5XHU5RjUwXHVGRjA5XHUzMDAyICovXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZVN0YXRlIHtcbiAgcmVhZHk/OiBib29sZWFuXG4gIHJlYXNvbj86IHN0cmluZ1xuICBwbHVnaW5WZXJzaW9uPzogc3RyaW5nXG4gIHByb2plY3Q/OiB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgcm9vdFBhdGg6IHN0cmluZzsgY3JlYXRlZEF0OiBudW1iZXIgfSB8IG51bGxcbiAgY2hhbmdlcz86IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZzsgc291cmNlOiBzdHJpbmc7IHVwZGF0ZWRBdDogbnVtYmVyIH0+XG4gIHJ1bnM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBzdGFydGVkQXQ6IG51bWJlciB8IG51bGw7IGZpbmlzaGVkQXQ6IG51bWJlciB8IG51bGw7IGNvc3RVc2Q/OiBudW1iZXI7IHN0ZXBzVG90YWw/OiBudW1iZXI7IHN0ZXBzRG9uZT86IG51bWJlcjsgY3VycmVudFN0ZXA/OiBzdHJpbmcgfCBudWxsIH0+XG4gIGF0dGVtcHRzQ291bnQ/OiBudW1iZXJcbiAgbWVtb3JpZXM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHByb2plY3RJZDogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRydXRoTGV2ZWw6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29udGVudD86IHN0cmluZzsgaXNIdW1hbkNvbmZpcm1lZDogYm9vbGVhbjsgZ2l0QnJhbmNoOiBzdHJpbmcgfCBudWxsOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxuICBldmlkZW5jZUNvdW50PzogbnVtYmVyXG4gIHJlY2VudEV2aWRlbmNlPzogQXJyYXk8eyBpZDogc3RyaW5nOyBzb3VyY2U6IHN0cmluZzsgdHJ1dGhMZXZlbDogc3RyaW5nOyBsb2NhdG9yOiBzdHJpbmc7IHNuaXBwZXQ6IHN0cmluZzsgY3JlYXRlZEF0OiBudW1iZXIgfT5cbiAgcmVzb2x2ZWRJc3N1ZVJldGVudGlvbkRheXM/OiBudW1iZXJcbiAgaW1wb3J0ZWRDaGFuZ2VzPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb21taXRDb3VudDogbnVtYmVyOyBmaXJzdENvbW1pdEF0OiBudW1iZXI7IGxhc3RDb21taXRBdDogbnVtYmVyOyBjb25maWRlbmNlOiBudW1iZXI7IHN0YXR1czogc3RyaW5nIH0+XG4gIGlzc3Vlcz86IEFycmF5PHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgc2V2ZXJpdHk6IHN0cmluZzsgY2F0ZWdvcnk6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmcgfT5cbiAgdmVyaWZpY2F0aW9ucz86IEFycmF5PHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxuICBib290c3RyYXA/OiB7IGlkOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgdGVjaFN0YWNrOiBzdHJpbmdbXTsgbWFuaWZlc3RGaWxlczogc3RyaW5nW107IHN5bWJvbHNDb3VudDogbnVtYmVyOyBjcmVhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxuICBjb25maXJtZWQ/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgdGV4dDogc3RyaW5nOyBmb3JiaWRkZW5QYXRoczogc3RyaW5nW10gfT5cbiAgY29uY2VwdHM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY2F0ZWdvcnk6IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZzsgb2NjdXJyZW5jZXM6IG51bWJlciB9PlxufVxuXG4vKiogR0VUIC9jb21taXRzIFx1NzY4NFx1NjNEMFx1NEVBNFx1Njc2MVx1NzZFRVx1MzAwMmFuYWx5emVkID0gXHU1REYyXHU3NTFGXHU2MjEwXHU4RkM3IEFJIFx1ODlFM1x1OEJGQlx1RkYwOFx1NjcyQVx1NkQ4OFx1NTMxNlx1NTcwNlx1NzBCOVx1NkQ4OFx1NzBCOVx1NEY5RFx1NjM2RVx1RkYwOVx1MzAwMiAqL1xuaW50ZXJmYWNlIENvbW1pdEVudHJ5IHtcbiAgc2hhOiBzdHJpbmdcbiAgc2hvcnRIYXNoOiBzdHJpbmdcbiAgYXV0aG9yOiBzdHJpbmdcbiAgZGF0ZTogbnVtYmVyXG4gIHN1YmplY3Q6IHN0cmluZ1xuICBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IGFkZHM6IG51bWJlcjsgZGVsczogbnVtYmVyIH0+XG4gIGFuYWx5emVkPzogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgQ29tbWl0c1BheWxvYWQge1xuICByb290UGF0aDogc3RyaW5nXG4gIGJyYW5jaDogc3RyaW5nIHwgbnVsbFxuICBoZWFkU2hhOiBzdHJpbmcgfCBudWxsXG4gIHdvcmtpbmc6IHsgZmlsZUNvdW50OiBudW1iZXI7IGlzQ2xlYW46IGJvb2xlYW47IGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmcgfT4gfVxuICBjb21taXRzOiBDb21taXRFbnRyeVtdXG59XG5cbmludGVyZmFjZSBDb21taXREZXRhaWxQYXlsb2FkIHtcbiAgc2hhOiBzdHJpbmdcbiAgaXNXb3JraW5nOiBib29sZWFuXG4gIGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgYWRkczogbnVtYmVyOyBkZWxzOiBudW1iZXIgfT5cbiAgaW5zZXJ0aW9uczogbnVtYmVyXG4gIGRlbGV0aW9uczogbnVtYmVyXG4gIHBhdGNoVHJ1bmNhdGVkOiBib29sZWFuXG4gIHBhdGNoOiBzdHJpbmdcbiAgY29tbWl0OiB7IG1lc3NhZ2U6IHN0cmluZzsgYXV0aG9yOiBzdHJpbmc7IGRhdGU6IG51bWJlciB9IHwgbnVsbFxuICBhbmFseXNpczogeyB3aGF0OiBzdHJpbmc7IGxvZ2ljOiBzdHJpbmdbXTsgcmlza3M6IHN0cmluZ1tdIH1cbiAgYW5hbHlzaXNDYWNoZWQ/OiBib29sZWFuXG4gIGFuYWx5c2lzR2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXG4gIC8qKiBcdTY3MkNcdTZCMjFcdTg5RTNcdThCRkJcdTc2ODQgTExNIFx1NjIxMFx1NjcyQ1x1RkYwOFx1NEYzMFx1RkYwQ1VTRFx1RkYwOVx1RkYxQlx1N0YxM1x1NUI1OFx1NjcyQVx1NUUyNlx1NjIxMFx1NjcyQy9cdTY3MkFcdTRFQTdcdTc1MUZcdThDMDNcdTc1MjhcdTY1RjZcdTdGM0FcdTc3MDFcdTMwMDIgKi9cbiAgYW5hbHlzaXNDb3N0VXNkPzogbnVtYmVyXG4gIGFuYWx5c2lzVG9rZW5zPzogeyBpbnB1dDogbnVtYmVyOyBvdXRwdXQ6IG51bWJlcjsgdG90YWw6IG51bWJlciB9XG59XG5cbmludGVyZmFjZSBJbXBhY3RTY29wZVBheWxvYWQge1xuICBjaGFuZ2VkRmlsZXM6IHN0cmluZ1tdXG4gIHNoYXM/OiBzdHJpbmdbXVxuICByaXNrTGV2ZWw6ICdsb3cnIHwgJ21lZGl1bScgfCAnaGlnaCcgfCAnY3JpdGljYWwnXG4gIHJpc2tTY29yZTogbnVtYmVyXG4gIHJpc2tGYWN0b3JzPzogQXJyYXk8eyB0ZXh0OiBzdHJpbmc7IHBvaW50czogbnVtYmVyIH0+XG4gIGtleUNoYW5nZVBvaW50cz86IHN0cmluZ1tdXG4gIG1lbW9yaWVzPzogQXJyYXk8eyB0aXRsZTogc3RyaW5nOyB0eXBlOiBzdHJpbmcgfT5cbiAgZnVuY3Rpb25JbXBhY3Q/OiBBcnJheTx7XG4gICAgc3ltYm9sOiBzdHJpbmdcbiAgICBkZWZpbmVkSW46IHN0cmluZ1xuICAgIHJvbGU/OiBzdHJpbmdcbiAgICBjaGFuZ2U/OiBzdHJpbmdcbiAgICBpbXBhY3Q/OiBzdHJpbmdcbiAgICBjYWxsZXJzOiBBcnJheTx7IGZpbGU6IHN0cmluZzsgbGluZTogc3RyaW5nOyBzbmlwcGV0OiBzdHJpbmcgfT5cbiAgfT5cbiAgbGV2ZWxzOiBBcnJheTx7IGxldmVsOiBzdHJpbmc7IGRlcHRoOiBudW1iZXI7IHBhdGg6IHN0cmluZzsgY29uZmlkZW5jZTogbnVtYmVyOyByZWFzb246IHN0cmluZyB9PlxuICBkaXJlY3Q6IHN0cmluZ1tdXG4gIGV4cGxhbmF0aW9uc0NhY2hlZD86IGJvb2xlYW5cbiAgZ2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXG4gIC8qKiBcdTUxRkRcdTY1NzBcdTdFQTdcdThCRjRcdTY2MEVcdTkwQTNcdTZCMjEgTExNIFx1OEMwM1x1NzUyOFx1NzY4NFx1NjIxMFx1NjcyQ1x1RkYwOFx1NEYzMFx1RkYwQ1VTRFx1RkYwOVx1MzAwMiAqL1xuICBleHBsYW5hdGlvbnNDb3N0VXNkPzogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmV2aWV3UGF5bG9hZCB7XG4gIGlzc3Vlc0ZvdW5kOiBudW1iZXJcbiAgaXNzdWVzOiBzdHJpbmdcbiAgdmVyZGljdDogc3RyaW5nXG4gIGNhY2hlZD86IGJvb2xlYW5cbiAgZ2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXG4gIGNvc3RVc2Q/OiBudW1iZXJcbiAgaXNzdWVMaXN0PzogQXJyYXk8eyBzZXZlcml0eTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBldmlkZW5jZTogc3RyaW5nOyBmaXg6IHN0cmluZyB9PlxufVxuXG5pbnRlcmZhY2UgTm90ZUVudHJ5IHtcbiAgaWQ6IHN0cmluZ1xuICBwcm9qZWN0SWQ6IHN0cmluZ1xuICBzaGE/OiBzdHJpbmdcbiAgdGl0bGU6IHN0cmluZ1xuICBjb250ZW50OiBzdHJpbmdcbiAgdGFncz86IHN0cmluZ1tdXG4gIHBpbm5lZD86IGJvb2xlYW5cbiAgY3JlYXRlZEF0OiBudW1iZXJcbiAgdXBkYXRlZEF0PzogbnVtYmVyXG59XG5cbi8qKiBHRVQgL2lzc3VlcyBcdTc2ODRcdThCQzRcdTVCQTFcdTk1RUVcdTk4OThcdTY3NjFcdTc2RUVcdUZGMDhSZXZpZXcgXHU5NUVFXHU5ODk4XHU5ODc1XHU3QjdFXHU2NTcwXHU2MzZFXHU2RTkwXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgSXNzdWVFbnRyeSB7XG4gIGlkOiBzdHJpbmdcbiAgY2hhbmdlSWQ6IHN0cmluZ1xuICBzZXZlcml0eTogc3RyaW5nXG4gIGNhdGVnb3J5OiBzdHJpbmdcbiAgdGl0bGU6IHN0cmluZ1xuICBkZXNjcmlwdGlvbjogc3RyaW5nXG4gIHN0YXR1czogc3RyaW5nXG4gIHJlc29sdXRpb246IHN0cmluZ1xuICBmaXhTdGF0czogeyBmaWxlczogbnVtYmVyOyBpbnNlcnRpb25zOiBudW1iZXI7IGRlbGV0aW9uczogbnVtYmVyIH0gfCBudWxsXG4gIGZpeEZpbGVzOiBzdHJpbmdbXVxuICBmaXhJbXBhY3Q6IEFycmF5PHsgc3ltYm9sOiBzdHJpbmc7IGRlZmluZWRJbjogc3RyaW5nOyBjYWxsZXJzOiBBcnJheTx7IGZpbGU6IHN0cmluZzsgbGluZTogc3RyaW5nOyBzbmlwcGV0OiBzdHJpbmcgfT4gfT5cbiAgZml4RGlmZjogc3RyaW5nXG4gIC8qKiBcdTVGODVcdThCQzRcdTVCQTEvXHU1REYyXHU2RDNFXHU1M0QxXHU3Njg0XHU0RkVFXHU1OTBEXHU2NUI5XHU2ODQ4XHVGRjA4XHU2NUI5XHU2ODQ4XHU2QTIxXHU1RjBGXHU0RUE3XHU1MUZBXHVGRjA5XHUzMDAyICovXG4gIGZpeFBsYW4/OiB7IGlkOiBzdHJpbmc7IGFwcHJvYWNoOiBzdHJpbmc7IGZpbGVzOiBzdHJpbmdbXTsgaW1wYWN0OiBzdHJpbmc7IGJlbmVmaXQ6IHN0cmluZzsgcmlzazogc3RyaW5nOyBzdGF0dXM6IHN0cmluZyB9IHwgbnVsbFxuICBjcmVhdGVkQXQ6IG51bWJlclxuICB1cGRhdGVkQXQ6IG51bWJlclxufVxuXG4vKiogXHU0RkVFXHU1OTBEXHU2RDNFXHU1M0QxXHU0RUZCXHU1MkExXHU4OUM2XHU1NkZFXHVGRjA4R0VUIC9maXgvc3RhdHVzXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgRml4VGFza0VudHJ5IHtcbiAgaXNzdWVJZDogc3RyaW5nXG4gIHRpdGxlOiBzdHJpbmdcbiAgc3RhdHVzOiAncXVldWVkJyB8ICdydW5uaW5nJyB8ICdtZXJnaW5nJyB8ICdyZWRvJyB8ICdkb25lJyB8ICdjb25mbGljdCcgfCAnZmFpbGVkJyB8ICdjYW5jZWxsZWQnXG4gIGF0dGVtcHQ6IG51bWJlclxuICBzdW1tYXJ5Pzogc3RyaW5nXG4gIGZpbGVzPzogc3RyaW5nW11cbiAgY29tbWl0Pzogc3RyaW5nXG4gIGVycm9yPzogc3RyaW5nXG4gIC8qKiBcdThGRDBcdTg4NENcdTRFMkRcdTVCNTBcdTRFRTNcdTc0MDZcdTc2ODRcdTY3MDBcdThGRDFcdTUyQThcdTRGNUNcdUZGMDhcdThCRkIvXHU1MTk5XHU1NEVBXHU0RTJBXHU2NTg3XHU0RUY2XHVGRjA5XHUzMDAyICovXG4gIGN1cnJlbnRBY3Rpb24/OiBzdHJpbmdcbiAgLyoqIFx1NUI4Q1x1NjIxMFx1NTQwRVx1NzY4NFx1NUY3MVx1NTRDRFx1NjQ1OFx1ODk4MVx1RkYwOFx1NzZGNFx1NkQzRVx1NEVGQlx1NTJBMVx1ODFFQVx1NTJBOFx1OEJBMVx1N0I5N1x1RkYwOVx1MzAwMiAqL1xuICBpbXBhY3Q/OiB7IHJpc2tMZXZlbDogc3RyaW5nOyByaXNrU2NvcmU6IG51bWJlcjsgZGlyZWN0OiBzdHJpbmdbXTsgaW5kaXJlY3Q6IHN0cmluZ1tdOyBwb3RlbnRpYWw6IHN0cmluZ1tdIH1cbiAgLyoqIFx1NEVGQlx1NTJBMVx1NkEyMVx1NUYwRlx1RkYxQWZpeD1cdTRGRUVcdTU5MERcdUZGMDhcdTlFRDhcdThCQTRcdUZGMDlcdUZGMUJwbGFuPVx1NTNFQVx1OEJGQlx1NTFGQVx1NjVCOVx1Njg0OFx1MzAwMiAqL1xuICBtb2RlPzogJ2ZpeCcgfCAncGxhbidcbiAgLyoqIFx1NkEyMVx1NTc4Qlx1NjJBNVx1OTUxOVx1N0VFRFx1OEREMVx1NkIyMVx1NjU3MCAvIFx1NjNBMlx1NkQzQlx1NkIyMVx1NjU3MFx1RkYwOFx1NkQzQlx1NjAyN1x1NzJCNlx1NjAwMVx1NjczQVx1OTAwRlx1NTFGQVx1RkYwOVx1MzAwMiAqL1xuICByZXN1bWVzPzogbnVtYmVyXG4gIHByb2Jlcz86IG51bWJlclxufVxuXG4vKiogXHU0RkVFXHU1OTBEXHU1REVFXHU1RjAyXHU3Njg0XHU4ODRDXHU3RUE3XHU3NzQwXHU4MjcyXHU2RTMyXHU2N0QzXHVGRjFBKyBcdTdFRkZcdTMwMDEtIFx1N0VBMlx1MzAwMVx1NjU4N1x1NEVGNlx1NTkzNFx1NTJBMFx1N0M5N1x1MzAwMVx1NTE3Nlx1NEY1OVx1NUYzMVx1NTMxNlx1MzAwMiAqL1xuZnVuY3Rpb24gcmVuZGVyRGlmZkxpbmVzKGRpZmY6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdIHtcbiAgaWYgKHR5cGVvZiBkaWZmICE9PSAnc3RyaW5nJyB8fCBkaWZmID09PSAnJykgcmV0dXJuIFtdXG4gIHJldHVybiBkaWZmLnNwbGl0KCdcXG4nKS5zbGljZSgwLCA0MDApLm1hcCgobGluZSwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBzdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcyA9IHtcbiAgICAgIGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknLFxuICAgICAgZm9udFNpemU6ICcxMXB4JywgbGluZUhlaWdodDogMS42LCB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnLFxuICAgIH1cbiAgICBpZiAobGluZS5zdGFydHNXaXRoKCcrKysnKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJy0tLScpIHx8IGxpbmUuc3RhcnRzV2l0aCgnZGlmZiAtLWdpdCcpIHx8IGxpbmUuc3RhcnRzV2l0aCgnQEAnKSkge1xuICAgICAgc3R5bGUuY29sb3IgPSAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknXG4gICAgfSBlbHNlIGlmIChsaW5lLnN0YXJ0c1dpdGgoJysnKSkge1xuICAgICAgc3R5bGUuY29sb3IgPSB0aGVtZUF3YXJlVGV4dCgnIzFhN2YzNycpXG4gICAgICBzdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoNDYsMTYwLDY3LDAuMDgpJ1xuICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKCctJykpIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gdGhlbWVBd2FyZVRleHQoJyNkMTI0MmYnKVxuICAgICAgc3R5bGUuYmFja2dyb3VuZCA9ICdyZ2JhKDIwOSwzNiw0NywwLjA4KSdcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuY29sb3IgPSAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknXG4gICAgfVxuICAgIHJldHVybiA8ZGl2IGtleT17aW5kZXh9IHN0eWxlPXtzdHlsZX0+e2xpbmUgPT09ICcnID8gJ1xcdTAwQTAnIDogbGluZX08L2Rpdj5cbiAgfSlcbn1cblxuLyoqIFx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNFx1OTg3NVx1NzY4NFx1NTNFRlx1N0YxNlx1OEY5MVx1NkI2NVx1OUFBNFx1RkYwOC9ydW5zL3N0YXJ0IFx1OEZENFx1NTZERVx1RkYwOVx1MzAwMiAqL1xuaW50ZXJmYWNlIFBsYW5Db25maXJtU3RlcCB7XG4gIGlkOiBzdHJpbmdcbiAgdGl0bGU6IHN0cmluZ1xuICBkZXNjcmlwdGlvbjogc3RyaW5nXG4gIHRhcmdldEZpbGVzOiBzdHJpbmdbXVxuICByb2xlOiBzdHJpbmdcbiAgYWNjZXB0YW5jZTogc3RyaW5nXG4gIGZhaWx1cmVQb2xpY3k6IHN0cmluZ1xuICBlbmFibGVkOiBib29sZWFuXG4gIG1vZGVsUHJvdmlkZXI6IHN0cmluZ1xuICBtb2RlbElkOiBzdHJpbmdcbn1cblxuLyoqIFBPU1QgL3BlZWsgXHU3Njg0XHU4RjdEXHU4Mzc3XHVGRjA4XHU0RUUzXHU3ODAxXHU0RTBBXHU0RTBCXHU2NTg3XHU2RDZFXHU1QzQyXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgUGVla1BheWxvYWQge1xuICBleGlzdHM6IGJvb2xlYW5cbiAgcGF0aD86IHN0cmluZ1xuICBzdGFydExpbmU/OiBudW1iZXJcbiAgZW5kTGluZT86IG51bWJlclxuICB0b3RhbExpbmVzPzogbnVtYmVyXG4gIGxpbmVzPzogQXJyYXk8eyBuOiBudW1iZXI7IHRleHQ6IHN0cmluZyB9PlxufVxuXG4vKiogXHU0RUNFXHU4MUVBXHU3NTMxXHU2NTg3XHU2NzJDXHU0RTJEXHU4QkM2XHU1MjJCIGZpbGU6bGluZSBcdTVGMTVcdTc1MjhcdUZGMDhcdTU0MkIgZmlsZTpsaW5lLWxpbmUgXHU1MzNBXHU5NUY0XHU1M0Q2XHU4RDc3XHU1OUNCXHU4ODRDXHVGRjA5XHUzMDAyICovXG5jb25zdCBGSUxFX0xJTkVfUEFUVEVSTiA9IC8oKD86W1xcdy4tXStbL1xcXFxdKSpbXFx3Li1dK1xcLltBLVphLXpdezEsNH0pOihcXGR7MSw1fSkoPzotXFxkezEsNX0pPy9nXG5cbi8qKiBHRVQgL3J1bnMvZGV0YWlsIFx1NzY4NFx1OEY3RFx1ODM3N1x1MzAwMiAqL1xuaW50ZXJmYWNlIFJ1bkRldGFpbCB7XG4gIHJ1bjogeyBpZDogc3RyaW5nOyBjaGFuZ2VJZDogc3RyaW5nOyBjaGFuZ2VUaXRsZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZzsgcGF1c2VQb2ludDogeyBzdGVwSWQ6IHN0cmluZzsgcmVhc29uOiBzdHJpbmc7IGF0OiBudW1iZXIgfSB8IG51bGw7IGVycm9yOiB7IG1lc3NhZ2U6IHN0cmluZyB9IHwgbnVsbDsgc3RhcnRlZEF0OiBudW1iZXIgfCBudWxsOyBmaW5pc2hlZEF0OiBudW1iZXIgfCBudWxsIH1cbiAgc3RlcHM6IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgcm9sZTogc3RyaW5nOyBtb2RlbDogc3RyaW5nIHwgbnVsbDsgc3RhdHVzOiBzdHJpbmc7IGF0dGVtcHRzQ291bnQ6IG51bWJlcjsgY2xhaW1lZE91dGNvbWU6IHN0cmluZyB8IG51bGw7IHZlcmlmaWVkOiBib29sZWFuOyBjb3N0VXNkOiBudW1iZXIgfT5cbiAgY29udGV4dDoge1xuICAgIHByb2plY3REaWdlc3Q6IHN0cmluZzsgYnJhbmNoOiBzdHJpbmcgfCBudWxsOyBoZWFkU2hhOiBzdHJpbmcgfCBudWxsXG4gICAgaW5qZWN0ZWRNZW1vcmllczogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nIH0+XG4gICAgc3RlcFN1bW1hcmllczogQXJyYXk8eyBzdGVwVGl0bGU6IHN0cmluZzsgc3VtbWFyeTogc3RyaW5nOyBjaGFuZ2VkRmlsZXM6IHN0cmluZ1tdOyBhdDogbnVtYmVyIH0+XG4gICAgZGVjaXNpb25Mb2c6IEFycmF5PHsga2luZDogc3RyaW5nOyBkZXRhaWw6IHN0cmluZzsgYXQ6IG51bWJlciB9PlxuICB9IHwgbnVsbFxufVxuXG4vKiogR0VUIC9zY2hlZHVsZWQgXHU3Njg0XHU0RUZCXHU1MkExXHU2NzYxXHU3NkVFXHUzMDAyICovXG5pbnRlcmZhY2UgU2NoZWR1bGVkVGFza0VudHJ5IHtcbiAgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgaW50ZXJ2YWxNaW51dGVzOiBudW1iZXI7IGVuYWJsZWQ6IGJvb2xlYW47IGxhc3RSdW5BdDogbnVtYmVyIHwgbnVsbDsgbGFzdFJlc3VsdDogc3RyaW5nOyBuZXh0RHVlQXQ6IG51bWJlclxufVxuXG4vKiogR0VUIC9tZW1vcmllcyBcdTc2ODRcdThCQjBcdTVGQzZcdTY3NjFcdTc2RUVcdUZGMDhcdThCQjBcdTVGQzZcdTk3NjJcdTY3N0ZcdTY1NzBcdTYzNkVcdTZFOTBcdUZGMDlcdTMwMDIgKi9cbmludGVyZmFjZSBNZW1vcnlFbnRyeSB7XG4gIGlkOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29udGVudDogc3RyaW5nOyByZWxhdGVkRmlsZXM6IHN0cmluZ1tdXG4gIGlzSHVtYW5Db25maXJtZWQ6IGJvb2xlYW47IGdpdEJyYW5jaDogc3RyaW5nIHwgbnVsbDsgc2NvcGU6IHN0cmluZzsgc291cmNlVGFnOiBzdHJpbmdcbiAgYmFzaXNTaGE6IHN0cmluZyB8IG51bGw7IHN0YXR1czogc3RyaW5nOyBsYXN0VmVyaWZpZWRTaGE6IHN0cmluZyB8IG51bGxcbiAgY3JlYXRlZEF0OiBudW1iZXI7IHVwZGF0ZWRBdDogbnVtYmVyXG59XG5cbmludGVyZmFjZSBNZW1vcmllc1BheWxvYWQge1xuICBtZW1vcmllczogTWVtb3J5RW50cnlbXVxuICBicmFuY2g6IHN0cmluZyB8IG51bGxcbiAgaGVhZFNoYTogc3RyaW5nIHwgbnVsbFxuICBiYXNlbGluZTogeyBzaGE6IHN0cmluZyB8IG51bGw7IHVwZGF0ZWRBdDogbnVtYmVyIH0gfCBudWxsXG4gIGJlaGluZENvdW50OiBudW1iZXJcbn1cblxuLyoqIFBPU1QgL21lbW9yeS9zeW5jIFx1NzY4NFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QVx1MzAwMiAqL1xuaW50ZXJmYWNlIFN5bmNSZXBvcnQge1xuICBvazogYm9vbGVhblxuICBlcnJvcj86IHN0cmluZ1xuICBiZWhpbmRDb3VudD86IG51bWJlclxuICBzdGFsZVByb3Bvc2Fscz86IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgcmVhc29uOiBzdHJpbmcgfT5cbiAgcmVuZXdlZD86IG51bWJlclxuICBuZXdDYW5kaWRhdGVzPzogQXJyYXk8eyB0eXBlOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZyB9PlxuICB2ZXJkaWN0Pzogc3RyaW5nXG59XG5cbi8qKiBcdThCQzRcdTVCQTFcdTk1RUVcdTk4OThcdTcyQjZcdTYwMDEgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xuY29uc3QgSVNTVUVfU1RBVFVTX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgb3BlbjogJ1x1NUY4NVx1NTkwNFx1NzQwNicsXG4gIGZpeGluZzogJ1x1NEZFRVx1NTkwRFx1NEUyRCcsXG4gIHJlc29sdmVkOiAnXHU1REYyXHU4OUUzXHU1MUIzJyxcbiAgYWNjZXB0ZWQ6ICdcdTVERjJcdTU5MDRcdTc0MDYnLFxuICByZWplY3RlZDogJ1x1OEJFRlx1NjJBNS9cdTkxQ0RcdTU5MEQnLFxufVxuXG4vKiogXHU4QkIwXHU1RkM2XHU3QzdCXHU1NzhCIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IE1FTU9SWV9UWVBFX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgYXJjaGl0ZWN0dXJlX2RlY2lzaW9uOiAnXHU2N0I2XHU2Nzg0XHU1MUIzXHU3QjU2JywgcGF0dGVybl9ydWxlOiAnXHU2QTIxXHU1RjBGXHU4OUM0XHU1MjE5Jywgcmlza19ob3RzcG90OiAnXHU5OENFXHU5NjY5XHU3MEVEXHU3MEI5JyxcbiAgbGVhcm5lZF9jb25jZXB0OiAnXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1JywgdXNlcl9wcm9maWxlOiAnXHU3NTI4XHU2MjM3XHU1MDRGXHU1OTdEJywgcHJvamVjdF9sb2c6ICdcdTk4NzlcdTc2RUVcdTY1RTVcdTVGRDcnLCBkYWlseV9sb2c6ICdcdTY1RTVcdTVGRDcnLFxufVxuXG4vKiogXHU4QkIwXHU1RkM2XHU2NzY1XHU2RTkwIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IE1FTU9SWV9TT1VSQ0VfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBydW46ICdcdTYyNjdcdTg4NENcdTYzRDBcdTcwQkMnLCByZXZpZXc6ICdcdTY4MzhcdTY3RTVcdTZDODlcdTZEQzAnLCBzeW5jOiAnXHU2MkM5XHU1M0Q2XHU1NDBDXHU2QjY1JywgY2hhdDogJ0FJIFx1OEJCMFx1NUY1NScsIG1hbnVhbDogJ1x1NjI0Qlx1NTJBOCcsXG59XG5cbi8qKiBcdTdGMTZcdTYzOTJcdTg5RDJcdTgyNzIgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xuY29uc3QgUk9MRV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIGFuYWx5c2lzOiAnXHU1MjA2XHU2NzkwJywgcGxhbm5pbmc6ICdcdTg5QzRcdTUyMTInLCBjb2Rpbmc6ICdcdTVGMDBcdTUzRDEnLCBvcHM6ICdcdTdCODBcdTUzNTVcdTY0Q0RcdTRGNUMnLCB2ZXJpZmljYXRpb246ICdcdTlBOENcdTY1MzYnLFxufVxuXG4vKiogXHU2QjY1XHU5QUE0XHU1OTMxXHU4RDI1XHU3QjU2XHU3NTY1IFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFBPTElDWV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICdyZXRyeS1lc2NhbGF0ZSc6ICdcdTkxQ0RcdThCRDVcdTVFNzZcdTUzNDdcdTdFQTdcdTZBMjFcdTU3OEInLCAncmV0cnktZmFsbGJhY2snOiAnXHU5MUNEXHU4QkQ1Jywgc2tpcDogJ1x1NTkzMVx1OEQyNVx1NTIxOVx1OERGM1x1OEZDNycsIGFzazogJ1x1NTkzMVx1OEQyNVx1NTIxOVx1NjY4Mlx1NTA1Q1x1OTVFRVx1NEVCQScsXG59XG5cbi8qKiBSdW4gXHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFJVTl9TVEFUVVNfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBxdWV1ZWQ6ICdcdTYzOTJcdTk2MUZcdTRFMkQnLCBydW5uaW5nOiAnXHU4RkQwXHU4ODRDXHU0RTJEJywgcGF1c2VkOiAnXHU1REYyXHU2NjgyXHU1MDVDJywgYmxvY2tlZDogJ1x1OTYzQlx1NTg1RScsIHJldHJ5aW5nOiAnXHU5MUNEXHU4QkQ1XHU0RTJEJyxcbiAgdmVyaWZ5aW5nOiAnXHU2NTM2XHU1QzNFXHU5QThDXHU2NTM2XHU0RTJEJywgc3VjY2VlZGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgY29tcGxldGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgZmFpbGVkOiAnXHU1OTMxXHU4RDI1JywgY2FuY2VsbGVkOiAnXHU1REYyXHU1M0Q2XHU2RDg4JywgaW50ZXJydXB0ZWQ6ICdcdTVERjJcdTRFMkRcdTY1QUQnLFxufVxuXG4vKiogXHU2QjY1XHU5QUE0XHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFNURVBfU1RBVFVTX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgcGVuZGluZzogJ1x1NUY4NVx1NjI2N1x1ODg0QycsIHJlYWR5OiAnXHU1QzMxXHU3RUVBJywgcnVubmluZzogJ1x1NjI2N1x1ODg0Q1x1NEUyRCcsIHBhdXNlZDogJ1x1NjY4Mlx1NTA1QycsIHJldHJ5aW5nOiAnXHU5MUNEXHU4QkQ1XHU0RTJEJyxcbiAgc3VjY2VlZGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgZmFpbGVkOiAnXHU1OTMxXHU4RDI1Jywgc2tpcHBlZDogJ1x1NURGMlx1OERGM1x1OEZDNycsIGJsb2NrZWQ6ICdcdTk2M0JcdTU4NUUnLCBjYW5jZWxsZWQ6ICdcdTVERjJcdTUzRDZcdTZEODgnLCBpbnRlcnJ1cHRlZDogJ1x1NURGMlx1NEUyRFx1NjVBRCcsXG59XG5cbi8qKiBcdThCQzRcdTVCQTFcdTk1RUVcdTk4OThcdTRFMjVcdTkxQ0RcdTVFQTYgXHUyMTkyIFx1NUZCRFx1N0FFMFx1NUU5NVx1ODI3Mlx1MzAwMiAqL1xuZnVuY3Rpb24gc2V2ZXJpdHlDb2xvcihzZXZlcml0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IHNldmVyaXR5ID09PSAnYmxvY2tlcicpIHJldHVybiAnI2NlOTE3OCdcbiAgaWYgKHNldmVyaXR5ID09PSAnbWFqb3InKSByZXR1cm4gJyNkN2JhN2QnXG4gIGlmIChzZXZlcml0eSA9PT0gJ2luZm8nKSByZXR1cm4gJyM2YjhiOGInXG4gIHJldHVybiAnIzU2OWNkNidcbn1cblxuLyoqIFx1NEUyNVx1OTFDRFx1NUVBNlx1NUY1Mlx1NEUwMFx1RkYwOFx1NTE3Q1x1NUJCOVx1NTM4Nlx1NTNGMlx1OEJCMFx1NUY1NVx1OTFDQ1x1NzY4NCBoaWdoL21lZGl1bS9sb3dcdUZGMUJcdTY3MkFcdTc3RTVcdTU2REVcdTg0M0QgbWlub3JcdUZGMDlcdUZGMENcdTdFREZcdThCQTEvXHU3QjVCXHU5MDA5L1x1Nzc0MFx1ODI3Mlx1NTE3MVx1NzUyOFx1MzAwMiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplSXNzdWVTZXZlcml0eShzZXZlcml0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHNldmVyaXR5ID09PSAnaGlnaCcpIHJldHVybiAnbWFqb3InXG4gIGlmIChzZXZlcml0eSA9PT0gJ21lZGl1bScgfHwgc2V2ZXJpdHkgPT09ICdsb3cnKSByZXR1cm4gJ21pbm9yJ1xuICByZXR1cm4gc2V2ZXJpdHkgPT09ICdibG9ja2VyJyB8fCBzZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBzZXZlcml0eSA9PT0gJ21ham9yJyB8fCBzZXZlcml0eSA9PT0gJ21pbm9yJyB8fCBzZXZlcml0eSA9PT0gJ2luZm8nXG4gICAgPyBzZXZlcml0eSA6ICdtaW5vcidcbn1cblxuLy8gXHU0RTNCXHU5ODk4XHU1QkY5XHU2QkQ0XHU1RUE2XHU1RjE1XHU2NENFXHVGRjA4cGFyc2VDb2xvciAvIHJlbGF0aXZlTHVtaW5hbmNlIC8gZGFya2VuL2xpZ2h0ZW4gLyB0aGVtZUF3YXJlVGV4dFx1RkYwOVxuLy8gXHU1REYyXHU2MkJEXHU1M0Q2XHU1MjMwIC4vdGhlbWUudHMgXHU3RURGXHU0RTAwXHU3RUY0XHU2MkE0XHUzMDAyXHU1MTY4XHU2NTg3XHU0RUY2XHU0RTBEXHU1M0Q4XHU1RjBGXHVGRjFBXG4vLyAxKSBcdTVGM0FcdThDMDNcdTgyNzJcdTY1ODdcdTVCNTdcdTVGQzVcdTk4N0JcdTdFQ0YgdGhlbWVBd2FyZVRleHRcdUZGMDhcdTZFMzJcdTY3RDNcdTY3MUZcdThDMDNcdTc1MjhcdUZGMDlcdUZGMUJcbi8vIDIpIGFjdGl2ZSBcdTlBRDhcdTRFQUVcdTgwQ0NcdTY2NkZcdTRFMDBcdTVGOEIgYnV0dG9uLWluZm8tZmlsbFx1RkYwQ1x1Nzk4MVx1NkI2MiBicmFuZC1wcmltYXJ5IFx1NEY1Q1x1ODBDQ1x1NjY2RlxuLy8gICAgXHVGRjA4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU0RTBCXHU4RkQxXHU3NjdEXHVGRjBDXHU5MTREXHU3NjdEXHU1QjU3XHU0RTBEXHU1M0VGXHU4OUMxXHUyMDE0XHUyMDE0XHUzMDBDXHU5ODc1XHU3QjdFXHU3NjdEXHU1NzU3XHUzMDBEXHU0RThCXHU2NTQ1XHU2ODM5XHU1NkUwXHVGRjA5XHUzMDAyXG5cbi8qKiBcdThCQzRcdTVCQTFcdTc2RUVcdTY4MDdcdUZGMDhjaGFuZ2VJZFx1RkYwOVx1MjE5MiBcdTUzRUZcdThCRkJcdTY4MDdcdTdCN0VcdUZGMUFcdTU0MDhcdTYyMTAgcmV2aWV3OjxzaGE+IFx1NjMwN1x1NTQxMVx1NjNEMFx1NEVBNFx1RkYwQ2NoZ18qIFx1NjMwN1x1NTQxMVx1NTNEOFx1NjZGNFx1RkYwQ2FkaG9jIFx1NEUzQVx1NURFNVx1NEY1Q1x1NTMzQVx1MzAwMiAqL1xuZnVuY3Rpb24gaXNzdWVUYXJnZXRMYWJlbChjaGFuZ2VJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgaWQgPSB0eXBlb2YgY2hhbmdlSWQgPT09ICdzdHJpbmcnID8gY2hhbmdlSWQgOiAnJ1xuICBpZiAoaWQuc3RhcnRzV2l0aCgncmV2aWV3OicpKSByZXR1cm4gYFx1NjNEMFx1NEVBNCAke2lkLnNsaWNlKDcsIDE1KX1gXG4gIGlmIChpZCA9PT0gJ2FkaG9jJykgcmV0dXJuICdcdTVERTVcdTRGNUNcdTUzM0EnXG4gIHJldHVybiBgXHU1M0Q4XHU2NkY0ICR7aWQuc2xpY2UoMCwgMTEpfWBcbn1cblxuLyoqIFx1NjAzQlx1N0VEMy9cdTdFRDNcdTY3ODRcdTUzMTZcdTdCMTRcdThCQjBcdTc2ODRcdThGN0JcdTkxQ0YgTWFya2Rvd24gXHU2RTMyXHU2N0QzXHVGRjFBXHUzMDBDIyMgXHUzMDBEXHU4MjgyXHU2ODA3XHU5ODk4XHU3NzQwXHU4MjcyXHU1MkEwXHU3Qzk3XHVGRjBDXHUzMDBDLSBcdTMwMERcdTUyMTdcdTg4NjhcdTUyQTBcdTU3MDZcdTcwQjlcdUZGMENcdTUxNzZcdTRGNTlcdTUzOUZcdTY4MzdcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlbmRlclN0cnVjdHVyZWRDb250ZW50KGNvbnRlbnQ6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdIHtcbiAgaWYgKHR5cGVvZiBjb250ZW50ICE9PSAnc3RyaW5nJyB8fCBjb250ZW50ID09PSAnJykgcmV0dXJuIFtdXG4gIHJldHVybiBjb250ZW50LnNwbGl0KCdcXG4nKS5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnIyMgJykpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEyLjVweCcsIG1hcmdpblRvcDogaW5kZXggPT09IDAgPyAwIDogMTAsIG1hcmdpbkJvdHRvbTogMiwgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19PlxuICAgICAgICAgIHtsaW5lLnNsaWNlKDMpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnLSAnKSkge1xuICAgICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3sgcGFkZGluZ0xlZnQ6IDE0LCB0ZXh0SW5kZW50OiAtMTAgfX0+XHUyMDIyIHtyZW5kZXJXaXRoUGVlayhsaW5lLnNsaWNlKDIpKX08L2Rpdj5cbiAgICB9XG4gICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0+e2xpbmUgPT09ICcnID8gJ1xcdTAwQTAnIDogcmVuZGVyV2l0aFBlZWsobGluZSl9PC9kaXY+XG4gIH0pXG59XG5cbi8qKiBwZWVrIFx1NzBCOVx1NTFGQlx1NTZERVx1OEMwM1x1RkYxQVx1NzUzMSBXb3Jrc3BhY2VGcmFtZSBcdTZDRThcdTUxNjVcdUZGMDhcdTZFMzJcdTY3RDNcdTU2NjhcdTRGRERcdTYzMDFcdTZBMjFcdTU3NTdcdTdFQTdcdTdFQUZcdTUxRkRcdTY1NzBcdUZGMDlcdTMwMDIgKi9cbmxldCBwZWVrT3BlbmVyOiAoKHBhdGg6IHN0cmluZywgbGluZTogbnVtYmVyKSA9PiB2b2lkKSB8IHVuZGVmaW5lZFxuXG4vKiogXHU2MjhBXHU2NTg3XHU2NzJDXHU0RTJEXHU3Njg0IGZpbGU6bGluZSBcdTVGMTVcdTc1MjhcdTZFMzJcdTY3RDNcdTRFM0FcdTUzRUZcdTcwQjlcdTUxRkJcdTgyQUZcdTcyNDdcdUZGMDhcdTcwQjlcdTUxRkJcdTVGMzlcdTUxRkFcdTRFRTNcdTc4MDFcdTRFMEFcdTRFMEJcdTY1ODdcdUZGMDlcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlbmRlcldpdGhQZWVrKHRleHQ6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gIGNvbnN0IG5vZGVzOiBSZWFjdC5SZWFjdE5vZGVbXSA9IFtdXG4gIGxldCBsYXN0ID0gMFxuICBsZXQgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheSB8IG51bGxcbiAgRklMRV9MSU5FX1BBVFRFUk4ubGFzdEluZGV4ID0gMFxuICB3aGlsZSAoKG1hdGNoID0gRklMRV9MSU5FX1BBVFRFUk4uZXhlYyh0ZXh0KSkgIT09IG51bGwpIHtcbiAgICBpZiAobWF0Y2guaW5kZXggPiBsYXN0KSBub2Rlcy5wdXNoKHRleHQuc2xpY2UobGFzdCwgbWF0Y2guaW5kZXgpKVxuICAgIGNvbnN0IFtmdWxsLCBwYXRoLCBsaW5lU3RyXSA9IG1hdGNoXG4gICAgbm9kZXMucHVzaChcbiAgICAgIDxidXR0b25cbiAgICAgICAga2V5PXtgJHttYXRjaC5pbmRleH0tJHtmdWxsfWB9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJywgcGFkZGluZzogJzAgMXB4JywgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsXG4gICAgICAgICAgZm9udFNpemU6ICdpbmhlcml0JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSBkb3R0ZWQnLFxuICAgICAgICB9fVxuICAgICAgICB0aXRsZT1cIlx1NzBCOVx1NTFGQlx1NjdFNVx1NzcwQlx1NEVFM1x1NzgwMVx1NEUwQVx1NEUwQlx1NjU4N1wiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHsgcGVla09wZW5lcj8uKHBhdGgsIE51bWJlcihsaW5lU3RyKSkgfX1cbiAgICAgID57ZnVsbH08L2J1dHRvbj4sXG4gICAgKVxuICAgIGxhc3QgPSBtYXRjaC5pbmRleCArIGZ1bGwubGVuZ3RoXG4gIH1cbiAgaWYgKGxhc3QgPCB0ZXh0Lmxlbmd0aCkgbm9kZXMucHVzaCh0ZXh0LnNsaWNlKGxhc3QpKVxuICByZXR1cm4gbm9kZXMubGVuZ3RoID09PSAxID8gbm9kZXNbMF0gOiA8c3Bhbj57bm9kZXN9PC9zcGFuPlxufVxuXG4vKipcbiAqIFx1ODlDNlx1ODlDOVx1NjM2Mlx1NTIxN1x1NjgzN1x1NUYwRlx1ODg2OFx1RkYxQVx1OTY4Rlx1NjcyQ1x1N0VDNFx1NEVGNlx1NjMwMlx1OEY3RC9cdTUzNzhcdThGN0RcdUZGMDhcdTUzNzhcdThGN0RcdTUzNzNcdTVCOENcdTUxNjhcdTYwNjJcdTU5MERcdTUzOUZcdTc1MUZcdTVFMDNcdTVDNDBcdUZGMDlcdTMwMDJcbiAqIFx1NjM2Mlx1NTIxN1x1NjYyRlx1NjVFMFx1Njc2MVx1NEVGNlx1NzY4NFx1RkYwOFx1NTQyQlx1NjVCMFx1NEYxQVx1OEJERFx1ODQzRFx1NTczMFx1OTg3NVx1RkYwOVx1MjAxNFx1MjAxNFx1NEUxQVx1NEUzQlx1ODlDNFx1NTIxOVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1ODk4MVx1NEU0OFx1NEUwRFx1NjYzRVx1NzkzQVx1MzAwMVx1ODk4MVx1NEU0OFx1NUM0NVx1NEUyRFx1RkYwQ1xuICogXHU1M0YzXHU0RkE3XHU1M0VBXHU1MTQxXHU4QkI4XHU4MDRBXHU1OTI5XHUzMDAyMC4xLjIgXHU2NUIwXHU0RjFBXHU4QkREXHU5ODc1XHU0RTVGXHU1RTI2IGRhdGEtZGV0YWlscy1jb2xsYXBzZWRcdUZGMENcdTY2RkVcdTU2RTBcdTVCRjlcdTVCODNcdThDNDFcdTUxNERcbiAqIFx1NjM2Mlx1NTIxN1x1NUJGQ1x1ODFGNFx1NURFNVx1NEY1Q1x1NTNGMFx1NTcyOFx1NjVCMFx1NEYxQVx1OEJERFx1NEUwQlx1OTAwMFx1NTZERVx1NTM5Rlx1NzUxRlx1NTNGM1x1NEY0RFx1RkYwODIwMjYtMDktMTAgXHU0RkVFXHU1OTBEXHVGRjA5XHUzMDAyXG4gKiBcdTZDRThcdTYxMEZcdUZGMUFcdTc5ODFcdTZCNjJcdTc1MjggOmhhcygpIFx1NTA1QVx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1MjAxNFx1MjAxNFx1NUI5OFx1NjVCOVx1Njc4NFx1NUVGQVx1NEVBN1x1NzI2OVx1NTFFMFx1NTM0MVx1NEUyQVx1N0VDNFx1NEVGNlx1NjgzOVx1N0M3Qlx1OTBGRFx1NTNFQiByb290XHVGRjBDXG4gKiBcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdTRGMUFcdTYyOEFcdTY1NzRcdTRFMkFcdTgwNEFcdTU5MjlcdTVCQjlcdTU2NjhcdThCRUZcdTk0QjNcdTUyMzZcdUZGMDhcdTUzODZcdTUzRjJcdTRFOEJcdTY1NDVcdUZGMDlcdTMwMDJcdTZCNjRcdTg4NjhcdTUzRUFcdTRGRERcdTc1NTlcdTdGNTFcdTY4M0NcdTYzNjJcdTUyMTdcdTRFMEVcdTYyRDZcdTYyRkRcdTY3QzRcdTk2OTBcdTg1Q0ZcdTMwMDJcbiAqL1xuY29uc3QgTEFZT1VUX1NUWUxFID0gYFxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA+IGRpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0geyBvcmRlcjogMzsgfVxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA+IGRpdltjbGFzcyo9XCJkZXRhaWxzQ29sXCJdIHsgb3JkZXI6IDI7IH1cbmRpdltjbGFzcyo9XCJoYW5kbGVcIl1bZGF0YS1zaWRlPVwiZGV0YWlsc1wiXSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSB7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBtaW5tYXgoMCwgMWZyKSB2YXIoLS1wYy1jaGF0LXcsIDM2MHB4KSAhaW1wb3J0YW50O1xufVxuYFxuXG4vKipcbiAqIFx1NEYxQVx1OEJERFx1N0VERlx1OEJBMVx1ODg0Q1x1NzY4NFx1NEUyNFx1ODg0Q1x1OTRCM1x1NTIzNlx1RkYwOFx1NzUyOFx1NjIzN1x1NjMwN1x1NUI5QVx1NzY4NFx1NjgzN1x1NUYwRlx1RkYwOVx1MzAwMlx1NEUwRFx1ODBGRFx1OEQ3MCBDU1MgXHU5MDA5XHU2MkU5XHU1NjY4XHVGRjFBXG4gKiBcdTVCOThcdTY1QjlcdTU5MUFcdTRFMkFcdTZBMjFcdTU3NTdcdTc2ODRcdTY4MzlcdTdDN0JcdTkwRkRcdTUzRUIgYHJvb3RgXHVGRjA4XHU2Nzg0XHU1RUZBXHU1NDBFXHU2NjJGIGBoYXNoX3Jvb3RgXHVGRjA5XHVGRjBDXHU1MTc2XHU0RTJEXG4gKiBDb252ZXJzYXRpb25Sb290IFx1NzY4NFx1NUI1MFx1NjgxMVx1OTFDQ1x1NUMzMVx1NTMwNVx1NTQyQlx1N0VERlx1OEJBMVx1ODg0Q1x1NzY4NCBgaGFzaF9zZXBgIFx1NTIwNlx1OTY5NCBzcGFuXHUyMDE0XHUyMDE0XG4gKiBcdTRFRkJcdTRGNTVcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdUZGMDhcdTU0MkIgOmhhcygpXHVGRjA5XHU5MEZEXHU0RjFBXHU2MjhBXHU2NTc0XHU0RTJBXHU4MDRBXHU1OTI5XHU1QkI5XHU1NjY4XHU5NEIzXHU2MjEwXHU0RTI0XHU4ODRDXHVGRjBDXHU2NzQwXHU2QjdCXHU2RURBXHU1MkE4XHUzMDAyXG4gKiBcdTU2RTBcdTZCNjRcdTU3MjhcdThGRDBcdTg4NENcdTY1RjZcdTYzMDlcdTU1MkZcdTRFMDBcdTVGNjJcdTcyQjZcdTVCOUFcdTRGNERcdUZGMUFcdTVDNDVcdTRFMkRcdTYzOTJcdTcyNDggKyBcdTc2RjRcdTYzQTVcdTVCNTBcdTRFRTNcdTU0MkJcdTY1ODdcdTY3MkMgXCJ8XCIgXHU3Njg0XG4gKiBcdTUyMDZcdTk2OTQgc3Bhblx1RkYwQ1x1NTQ3RFx1NEUyRFx1NTQwRVx1NjI4QVx1NUI5OFx1NjVCOVx1N0M3Qlx1NTQwRFx1NTM5Rlx1NjgzN1x1NTE5OVx1OEZEQlx1NjgzN1x1NUYwRlx1ODg2OFx1RkYwOFx1N0NCRVx1NTFDNlx1NTIzMFx1Njc4NFx1NUVGQVx1NTRDOFx1NUUwQ1x1RkYwOVx1MzAwMlxuICogQHJldHVybnMgXHU2Q0U4XHU1MTY1XHU3Njg0IHN0eWxlIFx1NTE0M1x1N0QyMFx1RkYxQlx1NUI5OFx1NjVCOVx1NjcyQVx1NkUzMlx1NjdEM1x1N0VERlx1OEJBMVx1ODg0Q1x1NjVGNlx1NEUzQSB1bmRlZmluZWRcdTMwMDJcbiAqL1xuY29uc3QgYXBwbHlTdGF0c0xpbmVDbGFtcCA9ICgpOiBIVE1MU3R5bGVFbGVtZW50IHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3Qgc2VwU3BhbiA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MU3BhbkVsZW1lbnQ+KCdkaXZbY2xhc3MqPVwiX3Jvb3RcIl0gPiBzcGFuW2NsYXNzKj1cIl9zZXBcIl0nKSlcbiAgICAuZmluZCgoc3BhbikgPT4gc3Bhbi50ZXh0Q29udGVudCA9PT0gJ3wnKVxuICBjb25zdCByb290RGl2ID0gc2VwU3Bhbj8ucGFyZW50RWxlbWVudFxuICBjb25zdCBoYXNoQ2xhc3MgPSByb290RGl2Py5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5maW5kKChuYW1lKSA9PiBuYW1lLmVuZHNXaXRoKCdfcm9vdCcpKVxuICBpZiAocm9vdERpdiA9PT0gdW5kZWZpbmVkIHx8IHJvb3REaXYgPT09IG51bGwgfHwgaGFzaENsYXNzID09PSB1bmRlZmluZWQgfHwgZ2V0Q29tcHV0ZWRTdHlsZShyb290RGl2KS50ZXh0QWxpZ24gIT09ICdjZW50ZXInKSByZXR1cm4gdW5kZWZpbmVkXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZS5pZCA9ICdwYy1zdGF0cy1jbGFtcCdcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG5kaXZbY2xhc3M9XCIke2hhc2hDbGFzc31cIl0ge1xuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgLXdlYmtpdC1saW5lLWNsYW1wOiAyO1xuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuICB0ZXh0LW92ZXJmbG93OiBjbGlwO1xuICBmb250LXNpemU6IDExcHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cbmBcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSlcbiAgcmV0dXJuIHN0eWxlXG59XG5cbnR5cGUgVGFiS2V5ID0gJ2NvbW1pdHMnIHwgJ292ZXJ2aWV3JyB8ICdleGVjdXRpb24nIHwgJ3JldmlldycgfCAnbm90ZXMnIHwgJ3NldHRpbmdzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZUZyYW1lUHJvcHMge1xuICAvKiogXHU1Qjk4XHU2NUI5IGRldGFpbHMgXHU2OUZEXHU1OTUxXHU3RUE2XHU3Njg0IGxvY2FsZSBcdTZDRThcdTUxNjVcdUZGMDhcdTYyMTFcdTRFRUNcdTZDRThcdTUxOENcdTc2ODQgcHJvamVjdC1jb250cm9sIFx1OEJDRFx1NTE3OFx1RkYwOVx1MzAwMiAqL1xuICB0PzogKGtleTogc3RyaW5nKSA9PiBzdHJpbmdcbiAgLyoqIFx1NUY1M1x1NTI0RFx1NEYxQVx1OEJERCBpZFx1RkYwOFx1NUI5OFx1NjVCOSBzZXNzaW9uIFx1NjgwN1x1NTFDNlx1NUM1RVx1NjAyN1x1RkYxQlx1NTIwN1x1NjM2Mlx1NEYxQVx1OEJERFx1NjVGNlx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1NURFNVx1NEY1Q1x1NTNGMFx1OEY2OFx1OTA1M1x1RkYwOVx1MzAwMiAqL1xuICBzZXNzaW9uSWQ/OiBzdHJpbmdcbiAgLyoqIFx1NjVCMFx1NzI0OFx1NUJCRlx1NEUzQlx1NzUzMVx1NTkxNlx1NUM0Mlx1NTJBMFx1NkNENVx1NkQ2RVx1NUM0Mlx1N0JBMVx1NzQwNlx1NUUwM1x1NUM0MFx1RkYwQ1x1NEUwRFx1NEY3Rlx1NzUyOFx1NjVFN1x1NzI0OCBkZXRhaWxzIFx1NjM2Mlx1NTIxN1x1MzAwMiAqL1xuICBsYXlvdXRNb2RlPzogJ2xlZ2FjeScgfCAnb3ZlcmxheSdcbn1cblxuLyoqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NjU4N1x1Njg0OFx1OEJDRFx1NTE3OFx1RkYwOHpoIC8gZW5cdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBjb25zdCBXT1JLU1BBQ0VfRElDVCA9IHtcbiAgemg6IHtcbiAgICAnd29ya3NwYWNlLnRpdGxlJzogJ1x1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMCcsXG4gICAgJ3dvcmtzcGFjZS5zZWxlY3RTZXNzaW9uJzogJ1x1OEJGN1x1NTE0OFx1NTcyOFx1NURFNlx1NEZBN1x1OTAwOVx1NjJFOVx1OTg3OVx1NzZFRVx1NEUwQlx1NzY4NFx1NEYxQVx1OEJERFx1RkYwQ1x1NURFNVx1NEY1Q1x1NTNGMFx1NjI0RFx1NEYxQVx1NjYzRVx1NzkzQVx1OEJFNVx1OTg3OVx1NzZFRVx1NzY4NFx1NjU3MFx1NjM2RVx1MzAwMicsXG4gICAgJ3RhYi5jb21taXRzJzogJ1x1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNScsXG4gICAgJ3RhYi5vdmVydmlldyc6ICdcdTk4NzlcdTc2RUVcdTYwM0JcdTg5QzgnLFxuICAgICd0YWIuZXhlY3V0aW9uJzogJ1x1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDMycsXG4gICAgJ3RhYi5yZXZpZXcnOiAnUmV2aWV3IFx1OTVFRVx1OTg5OCcsXG4gICAgJ3RhYi5ub3Rlcyc6ICdcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzYnLFxuICAgICd0YWIuc2V0dGluZ3MnOiAnXHU4QkJFXHU3RjZFJyxcbiAgICAnZXJyb3IubG9hZCc6ICdcdTUyQTBcdThGN0RcdTU5MzFcdThEMjUnLFxuICAgICdzdGF0ZS5wcm9qZWN0JzogJ1x1NUY1M1x1NTI0RFx1OTg3OVx1NzZFRScsXG4gICAgJ3N0YXRlLm5vUHJvamVjdCc6ICdcdTVDMUFcdTY3MkFcdTUyMURcdTU5Q0JcdTUzMTZcdTk4NzlcdTc2RUUnLFxuICAgICdzdGF0ZS5ub1Byb2plY3RIaW50JzogJ1x1NzBCOVx1NTFGQlx1MzAwQ1x1NTIxRFx1NTlDQlx1NTMxNlx1OTg3OVx1NzZFRVx1MzAwRFx1NjI2Qlx1NjNDRlx1NEVEM1x1NUU5M1x1N0VEM1x1Njc4NFx1MzAwMVx1NjI4MFx1NjcyRlx1NjgwOFx1NEUwRVx1N0IyNlx1NTNGN1x1N0QyMlx1NUYxNVx1MzAwMicsXG4gICAgJ2FjdGlvbi5ib290c3RyYXAnOiAnXHU1MjFEXHU1OUNCXHU1MzE2XHU5ODc5XHU3NkVFJyxcbiAgICAnYWN0aW9uLnJlc2Nhbic6ICdcdTkxQ0RcdTY1QjBcdTUyMURcdTU5Q0JcdTUzMTYgLyBcdTYyNkJcdTYzQ0YnLFxuICAgICdhY3Rpb24uYW5hbHl6ZSc6ICdcdTUyMDZcdTY3OTBcdTVGNTNcdTUyNERcdTY1MzlcdTUyQTgnLFxuICAgICdhY3Rpb24ucmV2aWV3JzogJ1x1OEJDNFx1NUJBMVx1NUY1M1x1NTI0RFx1NjUzOVx1NTJBOCcsXG4gICAgJ2FjdGlvbi52ZXJpZnknOiAnXHU5QThDXHU2NTM2XHU1RjUzXHU1MjREXHU2NTM5XHU1MkE4JyxcbiAgICAnYWN0aW9uLmNyZWF0ZUNoYW5nZSc6ICdcdTY1QjBcdTVFRkFcdTUzRDhcdTY2RjQnLFxuICAgICdhY3Rpb24ucnVubmluZyc6ICdcdTYyNjdcdTg4NENcdTRFMkRcdTIwMjYnLFxuICAgICdhY3Rpb24ucmVmcmVzaCc6ICdcdTUyMzdcdTY1QjAnLFxuICAgICdmb3JtLmNoYW5nZVRpdGxlJzogJ1x1NTNEOFx1NjZGNFx1NjgwN1x1OTg5OCcsXG4gICAgJ2Zvcm0uY2hhbmdlRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMDhcdTkwMDlcdTU4NkJcdUZGMDknLFxuICAgICdyZXN1bHQucGFuZWwnOiAnXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDJyxcblxuICAgICdyZXBvLnNjYW5IaXN0b3J5JzogJ1x1OTFDRFx1NUVGQVx1NTM4Nlx1NTNGMicsXG4gICAgJ3JlcG8uY29tbWl0cyc6ICdcdTYzRDBcdTRFQTQnLFxuICAgICdyZXBvLmJyYW5jaCc6ICdcdTUyMDZcdTY1MkYnLFxuICAgICdyZXBvLndvcmtpbmcnOiAnXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcbiAgICAncmVwby53b3JraW5nQ2xlYW4nOiAnXHU1REU1XHU0RjVDXHU1MzNBXHU1RTcyXHU1MUMwXHVGRjBDXHU2NUUwXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcbiAgICAncmVwby5lbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTYzRDBcdTRFQTRcdTMwMDInLFxuICAgICdyZXBvLmxvYWRGYWlsZWQnOiAnXHU2M0QwXHU0RUE0XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1JyxcbiAgICAncGlja2VyLnRpdGxlJzogJ1x1OTAwOVx1NjJFOVx1ODk4MVx1NjgzOFx1NjdFNVx1NzY4NFx1NjNEMFx1NEVBNFx1RkYwOFx1NTNFRlx1NTkxQVx1OTAwOVx1RkYwOScsXG4gICAgJ3BpY2tlci5wbGFjZWhvbGRlcic6ICdcdTcwQjlcdTUxRkJcdTkwMDlcdTYyRTlcdTYzRDBcdTRFQTRcdUZGMDhcdTUzRUZcdTU5MUFcdTkwMDlcdUZGMENcdTU0MkJcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQThcdUZGMDknLFxuICAgICdwaWNrZXIuc2VsZWN0ZWQnOiAnXHU1REYyXHU5MDA5JyxcbiAgICAncGlja2VyLmZpbHRlcic6ICdcdTYzMDlcdTY4MDdcdTk4OTgvXHU1NEM4XHU1RTBDL1x1NEY1Q1x1ODAwNVx1OEZDN1x1NkVFNFx1MjAyNicsXG4gICAgJ3BpY2tlci5jbGVhcic6ICdcdTZFMDVcdTdBN0EnLFxuICAgICdwaWNrZXIubm9NYXRjaCc6ICdcdTY1RTBcdTUzMzlcdTkxNERcdTYzRDBcdTRFQTRcdTMwMDInLFxuICAgICdwaWNrZXIuaGludCc6ICdcdTUyRkVcdTkwMDlcdTYzRDBcdTRFQTRcdTU0MEVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTAgQUkgXHU4OUUzXHU4QkZCXHVGRjFCXHU0RTBCXHU2NUI5XHU1M0VGXHU1MThEXHU4REQxXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHU0RTBFXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHUzMDAyJyxcbiAgICAncGlja2VyLnJvdW5kJzogJ1x1N0IyQyB7bn0gXHU4RjZFJyxcbiAgICAncGlja2VyLnJvdW5kTGF0ZXN0JzogJ1x1N0IyQyB7bn0gXHU4RjZFXHVGRjA4XHU2NzAwXHU2NUIwXHVGRjA5JyxcbiAgICAncGlja2VyLnJvdW5kU2VsZWN0JzogJ1x1OTAwOVx1NjU3NFx1OEY2RScsXG4gICAgJ3BpY2tlci5yb3VuZENsZWFyJzogJ1x1NTNENlx1NkQ4OFx1NjcyQ1x1OEY2RScsXG4gICAgJ3BpY2tlci51bmRpZ2VzdGVkJzogJ1x1NEUwQVx1NkIyMSBBSSBcdTYwM0JcdTdFRDNcdTRFNEJcdTU0MEVcdTMwMDFcdTRFMTRcdTVDMUFcdTY3MkFcdTc1MUZcdTYyMTBcdThGQzcgQUkgXHU4OUUzXHU4QkZCXHU3Njg0XHU2NUIwXHU2M0QwXHU0RUE0JyxcbiAgICAncGlja2VyLnVuZGlnZXN0ZWRDb3VudCc6ICd7bn0gXHU0RTJBXHU2M0QwXHU0RUE0XHU2NzJBXHU2RDg4XHU1MzE2JyxcbiAgICAncGlja2VyLnNlbGVjdEFsbFVuZGlnZXN0ZWQnOiAnXHU1MTY4XHU5MDA5XHU2NzJBXHU2RDg4XHU1MzE2JyxcbiAgICAncGlja2VyLmRpZ2VzdEFsbCc6ICdcdTRFMDBcdTk1MkVcdTZEODhcdTUzMTYnLFxuICAgICdwaWNrZXIuZGlnZXN0QWxsSGludCc6ICdcdTkwMDlcdTRFMkRcdTUxNjhcdTkwRThcdTY3MkFcdTZEODhcdTUzMTZcdTYzRDBcdTRFQTRcdTVFNzZcdTYyNzlcdTkxQ0YgQUkgXHU4OUUzXHU4QkZCXHVGRjA4XHU1RTc2XHU1M0QxIDNcdUZGMENcdTY3MDlcdTdGMTNcdTVCNThcdUZGMDlcdUZGMENcdTVCOENcdTYyMTBcdTU0MEVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdTY1NzRcdTRGNTNcdTUzRDlcdTRFOEJcdUZGMUJcdTRFNEJcdTU0MEVcdTUyMzBcdTMwMENcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzZcdTMwMERcdTc1MUZcdTYyMTBcdTVCNjZcdTRFNjBcdTYwM0JcdTdFRDNcdTUzNzNcdTUzRUZcdTkxQ0RcdTdGNkVcdTY3MkFcdTZEODhcdTUzMTZcdTY4MDdcdThCQjAnLFxuICAgICduYXJyYXRpdmUuZGlnZXN0SGludCc6ICdcdTY1NzRcdTRGNTNcdTUzRDlcdTRFOEJcdTVERjJcdTc1MUZcdTYyMTBcdTMwMDJcdTUyMzBcdTMwMENcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzZcdTMwMERcdTk4NzVcdTc1MUZcdTYyMTAgQUkgXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzXHVGRjBDXHU1MzczXHU1M0VGXHU5MUNEXHU3RjZFXHUzMDBDXHU2NzJBXHU2RDg4XHU1MzE2XHUzMDBEXHU2ODA3XHU4QkIwXHUzMDAyJyxcbiAgICAnaW1wYWN0LmZhY3RvcnMnOiAnXHU5OENFXHU5NjY5XHU2Nzg0XHU2MjEwXHVGRjA4XHU0RTNBXHU0RUMwXHU0RTQ4XHU2NjJGXHU4RkQ5XHU0RTJBXHU3QjQ5XHU3RUE3XHVGRjA5JyxcbiAgICAnaW1wYWN0LnBvaW50cyc6ICdcdTVGNzFcdTU0Q0RcdTcwQjlcdTY2MEVcdTdFQzYnLFxuICAgICdpbXBhY3Qua2V5UG9pbnRzJzogJ1x1NTE3M1x1OTUyRVx1N0VDNFx1NEVGNicsXG4gICAgJ2ltcGFjdC5tZW1vcnknOiAnXHU3RUQzXHU1NDA4XHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHU2ODM4XHU2N0U1JyxcbiAgICAnaW1wYWN0LmZ1bmN0aW9ucyc6ICdcdTUzRDdcdTVGNzFcdTU0Q0RcdTUxRkRcdTY1NzBcdUZGMDhcdThDMDFcdThDMDNcdTc1MjhcdTRFODZcdTg4QUJcdTY1MzlcdTc2ODRcdTRFRTNcdTc4MDFcdUZGMDknLFxuICAgICdpbXBhY3QuZnVuY1JvbGUnOiAnXHU1MUZEXHU2NTcwXHU1MjlGXHU4MEZEJyxcbiAgICAnaW1wYWN0LmZ1bmNDaGFuZ2UnOiAnXHU2NzJDXHU2QjIxXHU1M0Q4XHU1MzE2JyxcbiAgICAnaW1wYWN0LmZ1bmNDYWxsZXJzJzogJ1x1NUJGOVx1OEMwM1x1NzUyOFx1NjVCOVx1NzY4NFx1NUY3MVx1NTRDRCcsXG4gICAgJ2NhY2hlLmhpdCc6ICdcdTY3NjVcdTgxRUFcdTdGMTNcdTVCNTgnLFxuICAgICdjYWNoZS5yZWdlbmVyYXRlJzogJ1x1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMCcsXG4gICAgJ2Nvc3QudG9vbHRpcCc6ICdcdTY3MkNcdTZCMjEgQUkgXHU4QzAzXHU3NTI4XHU2MjEwXHU2NzJDXHVGRjA4XHU0RjMwXHU3Qjk3XHVGRjBDXHU2MzA5IERlZXBTZWVrIFx1NEVGN1x1NzZFRVx1NjI5OFx1N0I5N1x1RkYwOScsXG4gICAgJ2V4ZWMuY3JlYXRlJzogJ1x1NjVCMFx1NUVGQVx1NjI2N1x1ODg0QycsXG4gICAgJ2V4ZWMuZm9ybVRpdGxlJzogJ1x1ODk4MVx1NTA1QVx1NEVDMFx1NEU0OFx1RkYwOFx1NEUwMFx1NTNFNVx1OEJERFx1RkYwOScsXG4gICAgJ2V4ZWMuZm9ybURlc2MnOiAnXHU5NzAwXHU2QzQyXHU0RTBFXHU4MENDXHU2NjZGXHVGRjFBXHU3NkVFXHU2ODA3XHUzMDAxXHU2RDg5XHU1M0NBXHU2QTIxXHU1NzU3XHUzMDAxXHU5QThDXHU2NTM2XHU2ODA3XHU1MUM2JyxcbiAgICAnZXhlYy5zdGFydCc6ICdcdTVGMDBcdTU5Q0JcdTYyNjdcdTg4NEMnLFxuICAgICdleGVjLnN0YXJ0aW5nJzogJ1x1NkI2M1x1NTcyOFx1NTQyRlx1NTJBOFx1MjAyNicsXG4gICAgJ2V4ZWMuY3JlYXRlSGludCc6ICdcdTUyMUJcdTVFRkFcdTUzRDhcdTY2RjRcdTVFNzZcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdThCQTFcdTUyMTJcdUZGMENcdTk2OEZcdTU0MEVcdTc1MzEgQUkgXHU1QjUwXHU0RUUzXHU3NDA2XHU5MDEwXHU2QjY1XHU2MjY3XHU4ODRDXHVGRjFCXHU4RkRCXHU1RUE2XHU1NzI4XHU0RTBCXHU2NUI5XHU1QjlFXHU2NUY2XHU1MjM3XHU2NUIwXHVGRjBDXHU2NUUwXHU5NzAwXHU1M0JCXHU4MDRBXHU1OTI5XHUzMDAyJyxcbiAgICAnZXhlYy5tb2RlbERlZmF1bHQnOiAnXHU2MjY3XHU4ODRDXHU2QTIxXHU1NzhCXHVGRjA4XHU4OUQyXHU4MjcyXHU5RUQ4XHU4QkE0XHVGRjFBXHU1MjA2XHU2NzkwL1x1NjRDRFx1NEY1Qz1cdTVGRUJcdUZGMENcdTVGMDBcdTUzRDE9XHU2ODA3XHU1MUM2XHVGRjBDXHU4OUM0XHU1MjEyPVx1NjNBOFx1NzQwNlx1RkYwQ1x1OUE4Q1x1NjUzNj1cdTlBOENcdTY1MzZcdTdFQTdcdUZGMDknLFxuICAgICdiYWRnZS5ydW5uaW5nJzogJ3tufSBcdTRFMkFcdTRFRkJcdTUyQTFcdThGRDBcdTg4NENcdTRFMkRcdUZGMENcdTcwQjlcdTUxRkJcdTY3RTVcdTc3MEInLFxuICAgICduYXJyYXRpdmUudGl0bGUnOiAnXHU1REU1XHU0RjVDXHU4RjZFXHU2QjIxXHU1M0Q5XHU0RThCJyxcbiAgICAnbmFycmF0aXZlLmdlbmVyYXRlJzogJ1x1NjU3NFx1NEY1M1x1ODlFM1x1OEJGQlx1OEZEOVx1OEY2RVx1NURFNVx1NEY1QycsXG4gICAgJ25hcnJhdGl2ZS5ydW5uaW5nJzogJ1x1ODlFM1x1OEJGQlx1NzUxRlx1NjIxMFx1NEUyRFx1MjAyNlx1RkYwOFx1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxuICAgICdiYWRnZS5mYWlsZWQnOiAne259IFx1NEUyQVx1NEVGQlx1NTJBMVx1OTcwMFx1ODk4MVx1NTkwNFx1NzQwNlx1RkYwQ1x1NzBCOVx1NTFGQlx1NjdFNVx1NzcwQicsXG4gICAgJ2V4ZWMuZmxvd0NyZWF0ZSc6ICdcdTU4NkJcdTUxOTlcdTRFRkJcdTUyQTEnLFxuICAgICdleGVjLmZsb3dPcmNoZXN0cmF0ZSc6ICdcdTc4NkVcdThCQTRcdTdGMTZcdTYzOTJcdUZGMDhcdTZCQ0ZcdTZCNjVcdTUzRUZcdTY1MzlcdTZBMjFcdTU3OEIvXHU4OUQyXHU4MjcyL1x1NTkzMVx1OEQyNVx1N0I1Nlx1NzU2NVx1RkYwOScsXG4gICAgJ2V4ZWMuZmxvd1J1bic6ICdcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMDhSdW4gXHU4QkU2XHU2MEM1XHU3NzBCXHU4RkRCXHU1RUE2XHU0RTBFXHU2MjEwXHU2NzJDXHVGRjA5JyxcbiAgICAnZXhlYy5mbG93TWVtb3J5JzogJ1x1ODFFQVx1NTJBOFx1NjNEMFx1NzBCQ1x1OEJCMFx1NUZDNlx1RkYwOFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1Nzg2RVx1OEJBNFx1RkYwOScsXG4gICAgJ2V4ZWMucGxhbm5pbmcnOiAnXHU3RjE2XHU2MzkyXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4TExNIFx1NkI2M1x1NTcyOFx1NjJDNlx1ODlFM1x1NEVGQlx1NTJBMVx1RkYwQ1x1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxuICAgICdleGVjLmNvbC5zdGVwcyc6ICdcdTZCNjVcdTlBQTQnLFxuICAgICdub3Rlcy5lZGl0JzogJ1x1N0YxNlx1OEY5MScsXG4gICAgJ25vdGVzLnRvTWVtb3J5JzogJ1x1OEY2Q1x1OEJCMFx1NUZDNicsXG4gICAgJ25vdGVzLnRvTWVtb3J5SGludCc6ICdcdTYyOEFcdThGRDlcdTY3NjFcdTdCMTRcdThCQjBcdTc2ODRcdTY4MDdcdTk4OThcdTRFMEVcdTUxODVcdTVCQjlcdTU4NkJcdTUxNjVcdTRFMEJcdTY1QjlcdThCQjBcdTVGQzZcdTg4NjhcdTUzNTVcdUZGMENcdTc4NkVcdThCQTRcdTU0MEVcdTUxNjVcdTVFOTMnLFxuICAgICdub3Rlcy50b01lbW9yeURvbmUnOiAnXHUyNzEzIFx1NURGMlx1NTg2Qlx1NTE2NVx1OEJCMFx1NUZDNlx1ODg2OFx1NTM1NVx1RkYwOFx1NTcyOFx1NEUwQlx1NjVCOVx1MzAwQ1x1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNlx1MzAwRFx1NTMzQVx1Nzg2RVx1OEJBNFx1N0M3Qlx1NTc4Qlx1NTQwRVx1NkRGQlx1NTJBMFx1RkYwOScsXG4gICAgJ25vdGVzLmNvcHlNZCc6ICdcdTU5MERcdTUyMzYgTUQnLFxuICAgICdub3Rlcy5jb3B5TWRIaW50JzogJ1x1NjI4QVx1OEZEOVx1Njc2MVx1N0IxNFx1OEJCMFx1NTkwRFx1NTIzNlx1NEUzQSBNYXJrZG93biBcdTUyMzBcdTUyNkFcdThEMzRcdTY3N0YnLFxuICAgICdub3Rlcy5jb3B5TWREb25lJzogJ1x1NURGMlx1NTkwRFx1NTIzNlx1NEUzQSBNYXJrZG93bicsXG4gICAgJ25vdGVzLmV4cG9ydE1kJzogJ1x1NUJGQ1x1NTFGQSBNRCcsXG4gICAgJ25vdGVzLmV4cG9ydE1kSGludCc6ICdcdTRFMEJcdThGN0RcdTRFM0EgLm1kIFx1NjU4N1x1NEVGNicsXG4gICAgJ25vdGVzLmV4cG9ydERvbmUnOiAnXHU1REYyXHU1QkZDXHU1MUZBXHU0RTNBIC5tZCBcdTY1ODdcdTRFRjYnLFxuICAgICdub3Rlcy5kaWdlc3ROZXZlcic6ICdcdTVDMUFcdTY3MkFcdTc1MUZcdTYyMTBcdThGQzcgQUkgXHU2MDNCXHU3RUQzJyxcbiAgICAnbm90ZXMuZGlnZXN0UGVuZGluZyc6ICdcdTRFMEFcdTZCMjFcdTYwM0JcdTdFRDNcdTU0MEVcdTY3MDkge259IFx1NEUyQVx1NjVCMFx1NjNEMFx1NEVBNFx1NjcyQVx1NkQ4OFx1NTMxNicsXG4gICAgJ2RldGFpbC5zYXZlTm90ZSc6ICdcdTVCNThcdTRFM0FcdTdCMTRcdThCQjAnLFxuICAgICdkZXRhaWwuc2F2ZU5vdGVIaW50JzogJ1x1NjI4QVx1NjcyQ1x1NkIyMVx1NjgzOFx1NjdFNVx1N0VEM1x1OEJCQVx1RkYwOFx1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OC9cdTVCOUVcdTczQjBcdTkwM0JcdThGOTEvXHU5OENFXHU5NjY5XHU3MEI5XHVGRjA5XHU0RTAwXHU5NTJFXHU1QjU4XHU0RTNBXHU3RUQzXHU2Nzg0XHU1MzE2XHU3QjE0XHU4QkIwJyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlVGl0bGUnOiAnXHU2ODM4XHU2N0U1XHU4QkIwXHU1RjU1JyxcbiAgICAnZGV0YWlsLnNhdmVNZW1vcnknOiAnXHU2Qzg5XHU2REMwXHU0RTNBXHU4QkIwXHU1RkM2JyxcbiAgICAnZGV0YWlsLnNhdmVNZW1vcnlIaW50JzogJ1x1NjI4QVx1NjcyQ1x1NkIyMVx1NjgzOFx1NjdFNVx1N0VEM1x1OEJCQVx1NkM4OVx1NkRDMFx1NEUzQVx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNlx1RkYwOFx1OEZEQlx1NTE2NVx1NUY4NVx1Nzg2RVx1OEJBNFx1OTYxRlx1NTIxN1x1RkYwOScsXG4gICAgJ25vdGVzLnNhdmUnOiAnXHU0RkREXHU1QjU4JyxcbiAgICAnbm90ZXMuY2FuY2VsJzogJ1x1NTNENlx1NkQ4OCcsXG4gICAgJ21lbW9yeS5icmFuY2hTY29wZSc6ICdcdTUyMDZcdTY1MkYnLFxuICAgICdtZW1vcnkuYnJhbmNoQWxsJzogJ1x1NTE2OFx1OTBFOFx1NTIwNlx1NjUyRicsXG4gICAgJ25vdGVzLnNlYXJjaCc6ICdcdTY0MUNcdTdEMjJcdTdCMTRcdThCQjBcdTIwMjYnLFxuICAgICdtb2RlbC50aXRsZSc6ICdcdTZBMjFcdTU3OEJcdTUyMDZcdTkxNERcdUZGMDhcdTg5RTNcdThCRkIgLyBcdTYwM0JcdTdFRDNcdTdCNDlcdTRFRkJcdTUyQTFcdTc1MjhcdTU0RUFcdTRFMkFcdTZBMjFcdTU3OEJcdUZGMDknLFxuICAgICdtb2RlbC5sb2FkaW5nJzogJ1x1OEJGQlx1NTNENlx1NkEyMVx1NTc4Qlx1NkUwNVx1NTM1NVx1MjAyNicsXG4gICAgJ21vZGVsLmZvbGxvd0NoYXQnOiAnXHU4RERGXHU5NjhGXHU4MDRBXHU1OTI5XHU2QTIxXHU1NzhCJyxcbiAgICAnbW9kZWwuc2F2ZSc6ICdcdTRGRERcdTVCNThcdTVFNzZcdTc1MUZcdTY1NDgnLFxuICAgICdtb2RlbC5zYXZlZCc6ICdcdTVERjJcdTc1MUZcdTY1NDgnLFxuICAgICdtb2RlbC5oaW50JzogJ1x1NEZERFx1NUI1OFx1NTQwRVx1N0FDQlx1NTM3M1x1NzUxRlx1NjU0OFx1NUU3Nlx1NjMwMVx1NEU0NVx1NTMxNlx1RkYwOFx1OTFDRFx1NTQyRlx1NTQwRVx1NEZERFx1NzU1OVx1RkYwOVx1RkYxQlx1NEUwRFx1NUY3MVx1NTRDRFx1ODA0QVx1NTkyOVx1NkEyMVx1NTc4Qlx1MzAwMicsXG4gICAgJ25vdGVzLmFpU3VtbWFyeSc6ICdBSSBcdTYwM0JcdTdFRDNcdTdCMTRcdThCQjAnLFxuICAgICdub3Rlcy5haVN1bW1hcnlSdW4nOiAnXHU2MDNCXHU3RUQzXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4XHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXG4gICAgJ25vdGVzLmV4cGFuZCc6ICdcdTVDNTVcdTVGMDBcdTUxNjhcdTY1ODcnLFxuICAgICdub3Rlcy5jb2xsYXBzZSc6ICdcdTY1MzZcdThENzcnLFxuICAgICdub3Rlcy5zdW1tYXJ5VGFnJzogJ0FJIFx1NjAzQlx1N0VEMycsXG4gICAgJ25vdGVzLmVtcHR5U2VhcmNoJzogJ1x1NjVFMFx1NTMzOVx1OTE0RFx1N0IxNFx1OEJCMFx1MzAwMicsXG4gICAgJ25vdGVzLmNvbnRlbnRIaW50JzogJ1x1N0IxNFx1OEJCMFx1NTE4NVx1NUJCOVx1RkYwOFx1NjUyRlx1NjMwMVx1NTkxQVx1ODg0Q1x1RkYwOVx1RkYxQVx1N0VEM1x1OEJCQVx1MzAwMVx1NzU5MVx1OTVFRVx1MzAwMVx1NUI2Nlx1NEU2MFx1ODk4MVx1NzBCOVx1MzAwMVx1NTE3M1x1OTUyRVx1NTFCM1x1N0I1Nlx1MjAyNicsXG4gICAgJ25vdGVzLnRhZ3NIaW50JzogJ1x1NjgwN1x1N0I3RVx1RkYwOFx1OTAxN1x1NTNGN1x1NTIwNlx1OTY5NFx1RkYwQ1x1OTAwOVx1NTg2Qlx1RkYxQlx1NEZERFx1NUI1OFx1NTQwRVx1NTNFRlx1NzBCOVx1NTFGQlx1N0I1Qlx1OTAwOVx1RkYwOScsXG4gICAgJ25vdGVzLnBpbic6ICdcdTdGNkVcdTk4NzYnLFxuICAgICdub3Rlcy51bnBpbic6ICdcdTUzRDZcdTZEODhcdTdGNkVcdTk4NzYnLFxuICAgICdub3Rlcy5lZGl0ZWRBdCc6ICdcdTdGMTZcdThGOTFcdTRFOEUnLFxuICAgICdyZXZpZXcuZmlsdGVyQWxsJzogJ1x1NTE2OFx1OTBFOCcsXG4gICAgJ3Jldmlldy5zdGF0dXNBbGwnOiAnXHU1MTY4XHU5MEU4XHU3MkI2XHU2MDAxJyxcbiAgICAncmV2aWV3LnZlcmlmeSc6ICdcdTU5MERcdTY4QzAnLFxuICAgICdyZXZpZXcudmVyaWZ5UnVubmluZyc6ICdcdTU5MERcdTY4QzBcdTRFMkRcdTIwMjYnLFxuICAgICdyZXZpZXcudmVyaWZ5SGludCc6ICdcdTRGRUVcdTY1MzlcdTRFRTNcdTc4MDFcdTU0MEVcdTcwQjlcdTUxRkJcdUZGMUFcdTgxRUFcdTUyQThcdTY4QzBcdTZENEJcdTk1RUVcdTk4OThcdTY2MkZcdTU0MjZcdTRGRUVcdTU5MERcdTMwMDFcdTY1MzlcdTUyQThcdTY2MkZcdTU0MjZcdTY3MDBcdTRGMTgvXHU2NzAwXHU1QzBGXHU0RkI1XHU1MTY1XHUzMDAxXHU2NzA5XHU2NUUwXHU2NUIwXHU5NUVFXHU5ODk4XHVGRjFCXHU1MTY4XHU5MEU4XHU5MDFBXHU4RkM3XHU2MjREXHU4MUVBXHU1MkE4XHU3RjZFXHU0RTNBXHU1REYyXHU4OUUzXHU1MUIzJyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmUnOiAnXHU1MjI0XHU1QjlBXHU4QkVGXHU2MkE1JyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVIaW50JzogJ1x1NEVCQVx1NURFNVx1NTIyNFx1NUI5QVx1OEJFNVx1OTVFRVx1OTg5OFx1NEUzQVx1OEJFRlx1NjJBNVx1NUU3Nlx1NTE3M1x1OTVFRFx1RkYwOFx1NEUwRVx1NTkwRFx1NjhDMFx1ODlFM1x1NTFCM1x1NzY4NFx1OEJFRFx1NEU0OVx1NEUwRFx1NTQwQ1x1RkYwOScsXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlVGl0bGUnOiAnXHU1MjI0XHU1QjlBXHU0RTNBXHU4QkVGXHU2MkE1XHVGRjFGJyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVNc2cnOiAnXHUzMDBDe3RpdGxlfVx1MzAwRFx1NUMwNlx1ODhBQlx1NjgwN1x1OEJCMFx1NEUzQVx1OEJFRlx1NjJBNVx1RkYwOFx1NURGMlx1NjJEMlx1N0VERFx1RkYwOVx1NUU3Nlx1NEVDRVx1NUY4NVx1NTkwNFx1NzQwNlx1NEUyRFx1NzlGQlx1OTY2NFx1MzAwMicsXG4gICAgJ3Jldmlldy5maXhEZXRhaWwnOiAnXHU0RkVFXHU1OTBEXHU4QkU2XHU2MEM1JyxcbiAgICAncmV2aWV3LmZpeFN0YXRGaWxlcyc6ICdcdTY1ODdcdTRFRjYnLFxuICAgICdyZXZpZXcuZml4RmlsZXMnOiAnXHU0RkVFXHU1OTBEXHU2RDg5XHU1M0NBXHU2NTg3XHU0RUY2JyxcbiAgICAncmV2aWV3LmZpeEltcGFjdCc6ICdcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdUZGMDhcdTY1MzlcdTUyQThcdTdCMjZcdTUzRjdcdTRFMEVcdThDMDNcdTc1MjhcdTcwQjlcdUZGMDknLFxuICAgICdyZXZpZXcuZGVmaW5lZEluJzogJ1x1NUI5QVx1NEU0OVx1NEU4RScsXG4gICAgJ3Jldmlldy5jYWxsQ291bnQnOiAnXHU1OTA0XHU4QzAzXHU3NTI4JyxcbiAgICAncmV2aWV3LmZpeERpZmYnOiAnXHU0RkVFXHU1OTBEXHU1REVFXHU1RjAyXHVGRjA4XHU3NkY4XHU1QkY5XHU4QkM0XHU1QkExXHU1N0ZBXHU3RUJGXHVGRjA5JyxcbiAgICAncmV2aWV3LnJlZnJlc2gnOiAnXHU1MjM3XHU2NUIwJyxcbiAgICAncmV2aWV3LnJldGVudGlvbkhpbnQnOiAnXHU1REYyXHU4OUUzXHU1MUIzL1x1OEJFRlx1NjJBNVx1OTVFRVx1OTg5OFx1NEZERFx1NzU1OSB7ZGF5c30gXHU1OTI5XHU1NDBFXHU4MUVBXHU1MkE4XHU2RTA1XHU3NDA2JyxcbiAgICAncmV2aWV3LnRhcmdldCc6ICdcdTVCRjlcdThDNjEnLFxuICAgICdyZXZpZXcud29ya2luZ1RhcmdldCc6ICdcdTVERTVcdTRGNUNcdTUzM0EnLFxuICAgICdyZXZpZXcuZXhwb3J0TWQnOiAnXHU1QkZDXHU1MUZBIE1EJyxcbiAgICAncmV2aWV3LmV4cG9ydE1kSGludCc6ICdcdTYyOEFcdTVGNTNcdTUyNERcdTdCNUJcdTkwMDlcdTRFMEJcdTc2ODRcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTRFMEJcdThGN0RcdTRFM0EgLm1kIFx1NjU4N1x1NEVGNicsXG4gICAgJ3Jldmlldy5leHBvcnRFbXB0eSc6ICdcdTZDQTFcdTY3MDlcdTUzRUZcdTVCRkNcdTUxRkFcdTc2ODRcdTk1RUVcdTk4OTgnLFxuICAgICdyZXZpZXcuc2VsZWN0QWxsJzogJ1x1NTE2OFx1OTAwOScsXG4gICAgJ3Jldmlldy5jaGVja2VkQ291bnQnOiAnXHU1REYyXHU5MDA5IHtufSBcdTY3NjEnLFxuICAgICdyZXZpZXcubWFya0hhbmRsZWQnOiAnXHU2ODA3XHU4QkIwXHU1REYyXHU1OTA0XHU3NDA2JyxcbiAgICAncmV2aWV3LmJhdGNoVmVyaWZ5JzogJ1x1NjI3OVx1OTFDRlx1NTkwRFx1NjhDMCcsXG4gICAgJ3Jldmlldy5iYXRjaFZlcmlmeUNvbmZpcm1UaXRsZSc6ICdcdTYyNzlcdTkxQ0ZcdTU5MERcdTY4QzBcdUZGMUYnLFxuICAgICdyZXZpZXcuYmF0Y2hWZXJpZnlDb25maXJtTXNnJzogJ1x1NUMwNlx1NUJGOSB7bn0gXHU0RTJBXHU4QkM0XHU1QkExXHU3NkVFXHU2ODA3XHU5MDEwXHU0RTAwXHU1OTBEXHU2OEMwXHVGRjA4XHU0RTMyXHU4ODRDIExMTSBcdThDMDNcdTc1MjhcdUZGMENcdTZCQ0ZcdTRFMkFcdTc2RUVcdTY4MDdcdTdFQTYgMTAtNjAgXHU3OUQyXHVGRjBDXHU0RjFBXHU2RDg4XHU4MDE3XHU2QTIxXHU1NzhCXHU3NTI4XHU5MUNGXHVGRjA5XHVGRjFCXHU1M0VGXHU5NjhGXHU2NUY2XHU1MDVDXHU2QjYyXHUzMDAyJyxcbiAgICAncmV2aWV3LmJhdGNoU3RvcCc6ICdcdTUwNUNcdTZCNjInLFxuICAgICdyZXZpZXcuYmF0Y2hQcm9ncmVzcyc6ICdcdTYyNzlcdTkxQ0ZcdTU5MERcdTY4QzBcdTRFMkQge2l9L3tufScsXG4gICAgJ3Jldmlldy5iYXRjaERvbmUnOiAnXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwXHU1QjhDXHU2MjEwXHVGRjFBXHU4OUUzXHU1MUIzIHthfSBcdTY3NjEgXHUwMEI3IFx1NEVDRFx1NUY4NVx1NTkwNFx1NzQwNiB7Yn0gXHU2NzYxIFx1MDBCNyBcdTY1QjBcdTk1RUVcdTk4OTgge2N9IFx1Njc2MSBcdTAwQjcgXHU1OTMxXHU4RDI1IHtkfSBcdTRFMkFcdTc2RUVcdTY4MDcnLFxuICAgICdyZXZpZXcuYmF0Y2hTdG9wcGVkJzogJ1x1NjI3OVx1OTFDRlx1NTkwRFx1NjhDMFx1NURGMlx1NTA1Q1x1NkI2MicsXG4gICAgJ3Jldmlldy50cmlhZ2UnOiAnXHVEODNFXHVEREY5IFx1NjU3NFx1NEY1M1x1NTIwNlx1OEJDQScsXG4gICAgJ3Jldmlldy50cmlhZ2VIaW50JzogJ0xMTSBcdTY1NzRcdTRGNTNcdTYyNkJcdTYzQ0ZcdTUxNjhcdTkwRThcdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdUZGMUFcdTUyMjRcdTkxQ0RcdTU5MEQvXHU4RkM3XHU2NUY2L1x1NEUwRFx1NjIxMFx1N0FDQlx1NTM3M1x1NjVGNlx1NTE3M1x1OTVFRFx1RkYwOFx1NUUyNlx1NEY5RFx1NjM2RVx1RkYwQ1x1NTNFRlx1NEVCQVx1NURFNVx1OTFDRFx1NUYwMFx1NTkwRFx1NjgzOFx1RkYwOVx1RkYwQ1x1NzcxRlx1OTVFRVx1OTg5OFx1NzU1OVx1NEUwQlx1NTE4RFx1NkQzRVx1NTNEMVx1NEZFRVx1NTkwRCcsXG4gICAgJ3Jldmlldy50cmlhZ2VDb25maXJtVGl0bGUnOiAnXHU2NTc0XHU0RjUzXHU1MjA2XHU4QkNBXHVGRjFGJyxcbiAgICAncmV2aWV3LnRyaWFnZUNvbmZpcm1Nc2cnOiAnXHU1QzA2XHU3NTI4IExMTSBcdTUyMDZcdTYyNzlcdTYyNkJcdTYzQ0ZcdTUxNjhcdTkwRThcdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdUZGMDhcdTZCQ0ZcdTYyNzlcdTY3MDBcdTU5MUEge259IFx1Njc2MVx1RkYwQ1x1NkQ4OFx1ODAxN1x1NkEyMVx1NTc4Qlx1NzUyOFx1OTFDRlx1RkYwOVx1MzAwMlx1NTIyNFx1NEUzQVx1OTFDRFx1NTkwRC9cdThGQzdcdTY1RjYvXHU0RTBEXHU2MjEwXHU3QUNCXHU3Njg0XHU5NUVFXHU5ODk4XHU0RjFBXHUzMDEwXHU3QUNCXHU1MzczXHU1MTczXHU5NUVEXHUzMDExXHU1RTc2XHU2Q0U4XHU2NjBFXHU0RjlEXHU2MzZFXHUyMDE0XHUyMDE0XHU1MTY4XHU5MEU4XHU1M0VGXHU1NzI4XHU5NUVFXHU5ODk4XHU1MzYxXHU1OTBEXHU2ODM4XHU5MUNEXHU1RjAwXHUzMDAyXHU3NTU5XHU0RTBCXHU3Njg0XHU3NzFGXHU5NUVFXHU5ODk4XHU1MThEXHU4RDcwXHU2RDNFXHU1M0QxXHU0RkVFXHU1OTBEXHUzMDAyJyxcbiAgICAncmV2aWV3LnRyaWFnZVByb2dyZXNzJzogJ1x1NTIwNlx1OEJDQVx1NEUyRFx1RkYxQVx1NURGMlx1NTkwNFx1NzQwNiB7bn0gXHU2NzYxXHVGRjBDXHU1MjY5XHU0RjU5XHU3RUE2IHttfSBcdTY3NjEnLFxuICAgICdyZXZpZXcudHJpYWdlU3RvcCc6ICdcdTUwNUNcdTZCNjInLFxuICAgICdyZXZpZXcudHJpYWdlRG9uZSc6ICdcdTUyMDZcdThCQ0FcdTVCOENcdTYyMTBcdUZGMUFcdTUxNzNcdTk1RUQgXHU5MUNEXHU1OTBEIHthfSBcdTAwQjcgXHU4RkM3XHU2NUY2IHtifSBcdTAwQjcgXHU0RTBEXHU1QjU4XHU1NzI4IHtjfVx1RkYxQlx1NEZERFx1NzU1OSB7ZH0gXHU2NzYxXHU1Rjg1XHU1OTA0XHU3NDA2JyxcbiAgICAncmV2aWV3LnRyaWFnZVN0b3BwZWQnOiAnXHU1MjA2XHU4QkNBXHU1REYyXHU1MDVDXHU2QjYyXHVGRjA4XHU1REYyXHU1MjI0XHU1QjlBXHU3Njg0XHU0RTBEXHU0RjFBXHU5MUNEXHU1OTBEXHU2RDg4XHU4MDE3XHVGRjBDXHU1M0VGXHU1MThEXHU2QjIxXHU3MEI5XHU1MUZCXHU3RUU3XHU3RUVEXHVGRjA5JyxcbiAgICAncmV2aWV3LnRyaWFnZU5vdGhpbmcnOiAnXHU1RjUzXHU1MjREXHU0RjFBXHU4QkREXHU1QjlBXHU0RjREXHU1MjMwXHU3Njg0XHU5ODc5XHU3NkVFXHU2Q0ExXHU2NzA5XHU1Rjg1XHU1MjA2XHU4QkNBXHU3Njg0XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHVGRjA4XHU4MkU1XHU0RTBFXHU1MjE3XHU4ODY4XHU0RTBEXHU3QjI2XHVGRjBDXHU4QkY3XHU3ODZFXHU4QkE0XHU1REU2XHU0RkE3XHU2MjUzXHU1RjAwXHU3Njg0XHU0RjFBXHU4QkREXHU1QzVFXHU0RThFXHU4QkU1XHU5ODc5XHU3NkVFXHVGRjA5JyxcbiAgICAncmV2aWV3LnRyaWFnZVBhcnNlRmFpbCc6ICdcdUZGMUJcdTY3MDlcdTRFMDBcdTYyNzlcdThGOTNcdTUxRkFcdTg5RTNcdTY3OTBcdTU5MzFcdThEMjVcdTVERjJcdTYzMDlcdTRGRERcdTc1NTlcdTU5MDRcdTc0MDZcdUZGMENcdTUzRUZcdTkxQ0RcdThCRDUnLFxuICAgICdyZXZpZXcuaGFuZGxlZERvbmUnOiAnXHU1REYyXHU2MjhBIHtufSBcdTY3NjFcdTk1RUVcdTk4OThcdTY4MDdcdThCQjBcdTRFM0FcdTVERjJcdTU5MDRcdTc0MDYnLFxuICAgICdmaXgucGxhbic6ICdcdTRGRUVcdTU5MERcdTY1QjlcdTY4NDgnLFxuICAgICdmaXgucGxhbkFwcHJvYWNoJzogJ1x1NjVCOVx1Njg0OCcsXG4gICAgJ2ZpeC5wbGFuSW1wYWN0JzogJ1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNCcsXG4gICAgJ2ZpeC5wbGFuQmVuZWZpdCc6ICdcdTY1MzZcdTc2Q0EnLFxuICAgICdmaXgucGxhblJpc2snOiAnXHU5OENFXHU5NjY5JyxcbiAgICAnZml4LmRpc3BhdGNoJzogJ1x1NkQzRVx1NTNEMVx1NEZFRVx1NTkwRCcsXG4gICAgJ2ZpeC5kaXNwYXRjaEhpbnRNYWluJzogJ1x1NjI4QVx1NTJGRVx1OTAwOVx1NzY4NFx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1RkYwOFx1NjcyQVx1NTJGRVx1OTAwOT1cdTVGNTNcdTUyNERcdTdCNUJcdTkwMDlcdTRFMEJcdTUxNjhcdTkwRThcdUZGMDlcdTZEM0VcdTUzRDFcdTdFRDlcdTVCNTAgQWdlbnQgXHU1RTc2XHU1M0QxXHU1OTA0XHU3NDA2XHVGRjFBXHU3NkY0XHU2M0E1XHU0RkVFXHU1OTBEPVx1NEUwOVx1OTA1M1x1OTVGOFx1NTIyNFx1NUI5QStcdTRGRUVcdTU5MEQrXHU1NkRFXHU1MTk5K1x1NjNEMFx1NEVBNFx1NTE2OFx1ODFFQVx1NTJBOFx1RkYxQlx1NTE0OFx1NTFGQVx1NjVCOVx1Njg0OD1cdTUzRUFcdThCRkJcdTUyMDZcdTY3OTBcdTRFQTdcdTUxRkFcdTdFRDNcdTY3ODRcdTUzMTZcdTY1QjlcdTY4NDhcdUZGMENcdTYyNzlcdTUxQzZcdTU0MEVcdTUxOERcdTZEM0VcdTUzRDFcdTYyNjdcdTg4NEMnLFxuICAgICdmaXguZGlzcGF0Y2hNb2RlVGl0bGUnOiAnXHU2RDNFXHU1M0QxXHU0RkVFXHU1OTBEXHUyMDE0XHUyMDE0XHU5MDA5XHU2MkU5XHU2QTIxXHU1RjBGJyxcbiAgICAnZml4LmRpc3BhdGNoTW9kZU1zZyc6ICdcdTVDMDZcdTZEM0VcdTUzRDEge259IFx1Njc2MVx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1N0VEOVx1NUI1MCBBZ2VudCBcdTVFNzZcdTUzRDFcdTU5MDRcdTc0MDZcdUZGMDhcdTZCQ0ZcdTRFRkJcdTUyQTFcdTcyRUNcdTdBQ0Igd29ya3RyZWVcdUZGMENcdTZEODhcdTgwMTdcdTZBMjFcdTU3OEJcdTc1MjhcdTkxQ0ZcdUZGMENcdTRFMERcdTUzNjBcdTc1MjhcdTgwNEFcdTU5MjlcdTdBOTdcdTUzRTNcdUZGMDlcdTMwMDJcdTI2QTEgXHU3NkY0XHU2M0E1XHU0RkVFXHU1OTBEXHVGRjFBXHU0RTA5XHU5MDUzXHU5NUY4XHU1MjI0XHU1QjlBICsgXHU0RkVFXHU1OTBEICsgXHU1NkRFXHU1MTk5ICsgXHU2M0QwXHU0RUE0XHU1MTY4XHU4MUVBXHU1MkE4XHVGRjBDXHU4QkVGXHU2MkE1L1x1OTFDRFx1NTkwRC9cdThGQzdcdTY1RjZcdTRGMUFcdTgxRUFcdTUyQThcdTUxNzNcdTk1RURcdTMwMDJcdUQ4M0RcdURDQ0IgXHU1MTQ4XHU1MUZBXHU2NUI5XHU2ODQ4XHVGRjFBXHU1M0VBXHU4QkZCXHU1MjA2XHU2NzkwXHU0RUE3XHU1MUZBXHU3RUQzXHU2Nzg0XHU1MzE2XHU2NUI5XHU2ODQ4XHVGRjBDXHU0RTBEXHU2NTM5XHU0RUZCXHU0RjU1XHU0RUUzXHU3ODAxXHVGRjFCXHU0RjYwXHU1NzI4XHU5NUVFXHU5ODk4XHU1MzYxXHU3Njg0XHU2NUI5XHU2ODQ4XHU1NzU3XHU2Mjc5XHU1MUM2XHU1NDBFXHU3MEI5XHUzMDBDXHU2RDNFXHU1M0QxXHU1Rjg1XHU1QkExXHU2NUI5XHU2ODQ4XHUzMDBEXHU2MjY3XHU4ODRDXHUzMDAyJyxcbiAgICAnZml4LmRpc3BhdGNoQXV0byc6ICdcdTI2QTEgXHU3NkY0XHU2M0E1XHU0RkVFXHU1OTBEJyxcbiAgICAnZml4LmRpc3BhdGNoUGxhbic6ICdcdUQ4M0RcdURDQ0IgXHU1MTQ4XHU1MUZBXHU2NUI5XHU2ODQ4JyxcbiAgICAnZml4LmRpc3BhdGNoTm9PcGVuJzogJ1x1NUY1M1x1NTI0RFx1N0I1Qlx1OTAwOVx1NEUwQlx1NkNBMVx1NjcwOVx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1NTNFRlx1NkQzRVx1NTNEMScsXG4gICAgJ2ZpeC5kaXNwYXRjaFBsYW5zJzogJ1x1NkQzRVx1NTNEMVx1NUY4NVx1NUJBMVx1NjVCOVx1Njg0OCcsXG4gICAgJ2ZpeC5kaXNwYXRjaFBsYW5zSGludCc6ICdcdTYyOEFcdTVERjJcdTRFQTdcdTUxRkFcdTc2ODRcdTVGODVcdThCQzRcdTVCQTFcdTY1QjlcdTY4NDhcdTZEM0VcdTUzRDFcdTdFRDlcdTVCNTAgQWdlbnQgXHU1RTc2XHU1M0QxXHU2MjY3XHU4ODRDXHU0RkVFXHU1OTBEXHVGRjA4XHU2QkNGXHU0RUZCXHU1MkExXHU3MkVDXHU3QUNCIHdvcmt0cmVlXHVGRjBDXHU1NDA4XHU1RTc2XHU1MUIyXHU3QTgxXHU4MUVBXHU1MkE4XHU1N0ZBXHU0RThFXHU2NzAwXHU2NUIwXHU0RUUzXHU3ODAxXHU5MUNEXHU1MDVBXHVGRjA5JyxcbiAgICAnZml4LmRpc3BhdGNoRG9uZSc6ICdcdTVERjJcdTZEM0VcdTUzRDEge259IFx1NEUyQVx1NEZFRVx1NTkwRFx1NEVGQlx1NTJBMVx1RkYwOFx1NUU3Nlx1NTNEMSB7Y31cdUZGMDknLFxuICAgICdmaXguZGlzcGF0Y2hFbXB0eSc6ICdcdTZDQTFcdTY3MDlcdTUzRUZcdTZEM0VcdTUzRDFcdTc2ODRcdTRFRkJcdTUyQTFcdUZGMDhcdTUyRkVcdTkwMDlcdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdTYyMTZcdTdCNDlcdTVGODVcdTY1QjlcdTY4NDhcdTRFQTdcdTUxRkFcdUZGMDknLFxuICAgICdmaXguc3RhdHVzJzogJ1x1NEZFRVx1NTkwRFx1NjI2N1x1ODg0QycsXG4gICAgJ2ZpeC5zdG9wJzogJ1x1NTA1Q1x1NkI2MicsXG4gICAgJ2ZpeC5zdG9wRG9uZSc6ICdcdTVERjJcdTUwNUNcdTZCNjIge259IFx1NEUyQVx1NEZFRVx1NTkwRFx1NEVGQlx1NTJBMScsXG4gICAgJ2ZpeC50YXNrUXVldWVkJzogJ1x1NjM5Mlx1OTYxRlx1NEUyRCcsXG4gICAgJ2ZpeC50YXNrUnVubmluZyc6ICdcdThGRDBcdTg4NENcdTRFMkQnLFxuICAgICdmaXgudGFza01lcmdpbmcnOiAnXHU1NDA4XHU1RTc2XHU0RTJEJyxcbiAgICAnZml4LnRhc2tSZWRvJzogJ1x1OTFDRFx1NTA1QVx1NEUyRCcsXG4gICAgJ2ZpeC50YXNrRG9uZSc6ICdcdTVERjJcdTVCOENcdTYyMTAnLFxuICAgICdmaXgudGFza0NvbmZsaWN0JzogJ1x1NTFCMlx1N0E4MScsXG4gICAgJ2ZpeC50YXNrRmFpbGVkJzogJ1x1NTkzMVx1OEQyNScsXG4gICAgJ2ZpeC50YXNrQ2FuY2VsbGVkJzogJ1x1NURGMlx1NTA1Q1x1NkI2MicsXG4gICAgJ2ZpeC5hdHRlbXB0JzogJ1x1N0IyQyB7bn0gXHU2QjIxJyxcbiAgICAnZml4LnJ1bnRpbWUnOiAnXHU1REYyXHU4RkQwXHU4ODRDIHtufSBcdTUyMDYnLFxuICAgICdmaXgucmVzdW1lcyc6ICdcdTdFRURcdThERDEge259JyxcbiAgICAnZml4LnByb2Jlcyc6ICdcdTYzQTJcdTZEM0Ige259JyxcbiAgICAnZml4Lm1vZGVsVGl0bGUnOiAnXHU0RkVFXHU1OTBEXHU1RTc2XHU1M0QxXHVGRjA4XHU1QjUwIEFnZW50IFx1NkM2MFx1RkYwOScsXG4gICAgJ2ZpeC5tb2RlbEhpbnQnOiAnXHU1NDBDXHU2NUY2XHU2MjY3XHU4ODRDXHU3Njg0XHU0RkVFXHU1OTBEXHU1QjUwIEFnZW50IFx1NEUwQVx1OTY1MFx1RkYwODEtMTBcdUZGMDlcdTMwMDJcdTZCQ0ZcdTRFRkJcdTUyQTFcdTcyRUNcdTdBQ0Igd29ya3RyZWUgXHU0RTkyXHU0RTBEXHU1RTcyXHU2MjcwXHVGRjFCXHU0RkVFXHU2NTM5XHU1NDBFXHU3QUNCXHU1MzczXHU3NTFGXHU2NTQ4XHUzMDAyJyxcblxuICAgICdwbGFuLnRpdGxlJzogJ1x1N0YxNlx1NjM5Mlx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNCcsXG4gICAgJ3BsYW4uaGludCc6ICdcdTZCQ0ZcdTZCNjVcdTc2ODRcdTg5RDJcdTgyNzJcdTUxQjNcdTVCOUFcdTRFMEFcdTRFMEJcdTY1ODdcdTZDRThcdTUxNjVcdTRFMEVcdTlFRDhcdThCQTRcdTZBMjFcdTU3OEJcdUZGMDhcdTUyMDZcdTY3OTAvXHU2NENEXHU0RjVDPWZhc3RcdUZGMENcdTVGMDBcdTUzRDE9c3RhbmRhcmRcdUZGMENcdTg5QzRcdTUyMTI9cmVhc29uaW5nXHVGRjBDXHU5QThDXHU2NTM2PXZlcmlmaWVyXHVGRjA5XHVGRjFCXHU1M0VGXHU4QzAzXHU2NTc0XHU1NDBFXHU1MThEXHU1NDJGXHU1MkE4XHUzMDAyJyxcbiAgICAncGxhbi5jb2wuc3RlcCc6ICdcdTZCNjVcdTlBQTQnLCAncGxhbi5jb2wucm9sZSc6ICdcdTg5RDJcdTgyNzInLCAncGxhbi5jb2wubW9kZWwnOiAnXHU2QTIxXHU1NzhCJywgJ3BsYW4uY29sLnBvbGljeSc6ICdcdTU5MzFcdThEMjVcdTdCNTZcdTc1NjUnLCAncGxhbi5jb2wuZW5hYmxlZCc6ICdcdTU0MkZcdTc1MjgnLCAncGxhbi5jb2wuYXR0ZW1wdHMnOiAnXHU1QzFEXHU4QkQ1JyxcbiAgICAncGxhbi5tb2RlbERlZmF1bHQnOiAnXHU4RERGXHU5NjhGXHU4OUQyXHU4MjcyXHU5RUQ4XHU4QkE0JyxcbiAgICAncGxhbi5sYXVuY2hFZGl0ZWQnOiAnXHU0RkREXHU1QjU4XHU0RkVFXHU2NTM5XHU1RTc2XHU1NDJGXHU1MkE4JyxcbiAgICAncGxhbi5sYXVuY2hEaXJlY3QnOiAnXHU2MzA5XHU1MzlGXHU4QkExXHU1MjEyXHU1NDJGXHU1MkE4JyxcbiAgICAncGxhbi5kaXNjYXJkJzogJ1x1NjUzRVx1NUYwMycsXG4gICAgJ3BsYW4udmlld0RldGFpbCc6ICdcdThCRTZcdTYwQzUnLCAncGxhbi5yZWZyZXNoRGV0YWlsJzogJ1x1NTIzN1x1NjVCMCcsICdwbGFuLmNsb3NlRGV0YWlsJzogJ1x1NjUzNlx1OEQ3NycsXG4gICAgJ3BsYW4uZGV0YWlsVGl0bGUnOiAnUnVuIFx1OEJFNlx1NjBDNScsXG4gICAgJ3BsYW4ucGF1c2VkQmFubmVyJzogJ1x1NEVGQlx1NTJBMVx1NURGMlx1NjY4Mlx1NTA1Q1x1RkYwQ1x1N0I0OVx1NUY4NVx1NEY2MFx1NzY4NFx1NTFCM1x1N0I1NicsXG4gICAgJ3BsYW4ucmVzdW1lUmV0cnknOiAnXHU5MUNEXHU4QkQ1XHU4QkU1XHU2QjY1XHU5QUE0XHU1RTc2XHU3RUU3XHU3RUVEJyxcbiAgICAncGxhbi5yZXN1bWVTa2lwJzogJ1x1OERGM1x1OEZDN1x1OEJFNVx1NkI2NVx1OUFBNFx1N0VFN1x1N0VFRCcsXG4gICAgJ3BsYW4ucmVzdW1lRmFpbGVkJzogJ1x1NEVDRVx1NTkzMVx1OEQyNVx1NTkwNFx1NjA2Mlx1NTkwRCcsXG4gICAgJ3BsYW4uY29udGV4dFRpdGxlJzogJ1x1NEVGQlx1NTJBMVx1NEUwQVx1NEUwQlx1NjU4N1x1RkYwOFx1NjcyQyBSdW4gXHU2Q0U4XHU1MTY1XHU0RTg2XHU0RUMwXHU0RTQ4XHVGRjA5JyxcbiAgICAncGxhbi5icmFuY2gnOiAnXHU1MjA2XHU2NTJGJywgJ3BsYW4uaW5qZWN0ZWRNZW1vcmllcyc6ICdcdTZDRThcdTUxNjVcdThCQjBcdTVGQzYnLCAncGxhbi5kZWNpc2lvbkxvZyc6ICdcdTUxQjNcdTdCNTZcdTY1RTVcdTVGRDcnLFxuICAgICdleGVjLmNvbC5kZXRhaWwnOiAnXHU4QkU2XHU2MEM1JyxcblxuICAgICdzY2hlZC50aXRsZSc6ICdcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTEnLFxuICAgICdzY2hlZC5mb3JtTmFtZSc6ICdcdTRFRkJcdTUyQTFcdTU0MERcdTc5RjAnLCAnc2NoZWQuZm9ybUludGVydmFsJzogJ1x1OTVGNFx1OTY5NFx1RkYwOFx1NTIwNlx1OTQ5Rlx1RkYwOScsXG4gICAgJ3NjaGVkLnR5cGVSZXZpZXcnOiAnXHU4MUVBXHU1MkE4XHU4QkM0XHU1QkExJywgJ3NjaGVkLnR5cGVTdW1tYXJ5JzogJ0FJIFx1NjAzQlx1N0VEMycsICdzY2hlZC50eXBlUnVuJzogJ1x1NUI5QVx1NjVGNlx1NjI2N1x1ODg0QycsXG4gICAgJ3NjaGVkLmFkZCc6ICdcdTUyMUJcdTVFRkEnLFxuICAgICdzY2hlZC5oaW50JzogJ1x1NTIzMFx1NzBCOVx1ODFFQVx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYxQVx1ODFFQVx1NTJBOFx1OEJDNFx1NUJBMT1cdThCQzRcdTVCQTFcdThGRDEgMjQgXHU1QzBGXHU2NUY2XHU3Njg0XHU2NUIwXHU2M0QwXHU0RUE0XHVGRjA4XHU5NUVFXHU5ODk4XHU4RkRCIFJldmlldyBcdTk3NjJcdTY3N0ZcdUZGMDlcdUZGMUJBSSBcdTYwM0JcdTdFRDM9XHU3NTFGXHU2MjEwXHU1ODlFXHU5MUNGXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzXHVGRjFCXHU1QjlBXHU2NUY2XHU2MjY3XHU4ODRDPVx1NjMwOVx1NkEyMVx1Njc3Rlx1OEREMVx1NEUwMFx1NkIyMVx1N0YxNlx1NjM5Mlx1NEVGQlx1NTJBMVx1MzAwMlx1NjcwMFx1NUMwRiAxIFx1NTIwNlx1OTQ5Rlx1MzAwMicsXG4gICAgJ3NjaGVkLmVtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1MzAwMicsXG4gICAgJ3NjaGVkLmNvbC5uYW1lJzogJ1x1NTQwRFx1NzlGMCcsICdzY2hlZC5jb2wudHlwZSc6ICdcdTdDN0JcdTU3OEInLCAnc2NoZWQuY29sLmludGVydmFsJzogJ1x1NTQ2OFx1NjcxRicsICdzY2hlZC5jb2wubmV4dCc6ICdcdTRFMEJcdTZCMjFcdTYyNjdcdTg4NEMnLCAnc2NoZWQuY29sLmxhc3RSZXN1bHQnOiAnXHU0RTBBXHU2QjIxXHU3RUQzXHU2NzlDJywgJ3NjaGVkLmNvbC5hY3Rpb25zJzogJ1x1NjRDRFx1NEY1QycsXG4gICAgJ3NjaGVkLmRheSc6ICcgXHU1OTI5JywgJ3NjaGVkLmhvdXInOiAnIFx1NUMwRlx1NjVGNicsICdzY2hlZC5taW51dGUnOiAnIFx1NTIwNlx1OTQ5RicsXG4gICAgJ3NjaGVkLmRpc2FibGUnOiAnXHU2NjgyXHU1MDVDJywgJ3NjaGVkLmVuYWJsZSc6ICdcdTU0MkZcdTc1MjgnLCAnc2NoZWQucnVuTm93JzogJ1x1N0FDQlx1NTM3M1x1NjI2N1x1ODg0QycsXG5cbiAgICAnbWVtb3J5LnpvbmVUaXRsZSc6ICdcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzYnLFxuICAgICdtZW1vcnkuc3luY0Jhc2VsaW5lJzogJ1x1NTQwQ1x1NkI2NVx1NTdGQVx1N0VCRicsICdtZW1vcnkuc3luY05vbmUnOiAnXHU2NzJBXHU1NDBDXHU2QjY1JyxcbiAgICAnbWVtb3J5LmJlaGluZCc6ICdcdTg0M0RcdTU0MEUge259IFx1NEUyQVx1NjNEMFx1NEVBNFx1NjcyQVx1NTQwQ1x1NkI2NScsXG4gICAgJ21lbW9yeS5zeW5jJzogJ1x1NTQwQ1x1NkI2NVx1OEJCMFx1NUZDNicsICdtZW1vcnkuc3luY2luZyc6ICdcdTU0MENcdTZCNjVcdTRFMkRcdTIwMjYnLCAnbWVtb3J5LnN5bmNGYWlsZWQnOiAnXHU1NDBDXHU2QjY1XHU1OTMxXHU4RDI1JyxcbiAgICAnbWVtb3J5LnN0YWxlVGl0bGUnOiAnXHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2XHVGRjA4XHU3NkY4XHU1MTczXHU0RUUzXHU3ODAxXHU1REYyXHU4OEFCXHU2NTM5XHU1MkE4XHVGRjBDXHU1Rjg1XHU0RjYwXHU1OTBEXHU2ODM4XHVGRjA5JyxcbiAgICAnbWVtb3J5Lm1hcmtTdGFsZSc6ICdcdTY4MDdcdThCQjBcdThGQzdcdTY1RjYnLCAnbWVtb3J5LmFyY2hpdmVCdG4nOiAnXHU1RjUyXHU2ODYzJywgJ21lbW9yeS5rZWVwQWN0aXZlJzogJ1x1NEVDRFx1NjcwOVx1NjU0OCcsXG4gICAgJ21lbW9yeS5uZXdDYW5kaWRhdGVzJzogJ1x1NjVCMFx1NTg5RVx1NTAxOVx1OTAwOVx1RkYwOFx1NURGMlx1NTE2NVx1NUY4NVx1Nzg2RVx1OEJBNFx1OTYxRlx1NTIxN1x1RkYwOVx1RkYxQScsXG4gICAgJ21lbW9yeS5jbG9zZVJlcG9ydCc6ICdcdTUxNzNcdTk1RURcdTYyQTVcdTU0NEEnLFxuICAgICdtZW1vcnkuc2NvcGVQcm9qZWN0JzogJ1x1NEUzQlx1NUU3Mlx1RkYwOFx1NTE2OFx1NTIwNlx1NjUyRlx1RkYwOScsICdtZW1vcnkuc2NvcGVCcmFuY2gnOiAnXHU0RUM1XHU1RjUzXHU1MjREXHU1MjA2XHU2NTJGJyxcbiAgICAnbWVtb3J5LnBlbmRpbmdRdWV1ZSc6ICdcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTcnLFxuICAgICdtZW1vcnkudG9Ob3RlJzogJ1x1OEY2Q1x1N0IxNFx1OEJCMCcsICdtZW1vcnkubm9ybWFsaXplJzogJ1x1NUY1Mlx1NEUwMFx1NTIzMFx1NEUzQlx1NUU3MicsICdtZW1vcnkucmVzdG9yZSc6ICdcdTYwNjJcdTU5MEQnLFxuICAgICdtZW1vcnkuc3RhdHVzU3RhbGUnOiAnXHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2JyxcbiAgICAnaW1wYWN0LmZ1bmN0aW9uc05vbmUnOiAnXHU2NzJBXHU4QkM2XHU1MjJCXHU1MUZBXHU1MUZEXHU2NTcwXHU3RUE3XHU4QzAzXHU3NTI4XHU1M0Q4XHU1MzE2XHVGRjA4XHU1M0VGXHU4MEZEXHU2NjJGXHU2ODM3XHU1RjBGL1x1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MC9cdTdFQUZcdTkxNERcdTdGNkVcdTY1MzlcdTUyQThcdUZGMDlcdTMwMDInLFxuICAgICdyZXZpZXcuY29sLnNldmVyaXR5JzogJ1x1N0VBN1x1NTIyQicsXG4gICAgJ3Jldmlldy5jb2wuY2F0ZWdvcnknOiAnXHU3QzdCXHU1MjJCJyxcbiAgICAncmV2aWV3LmNvbC50aXRsZSc6ICdcdTk1RUVcdTk4OTgnLFxuICAgICdyZXZpZXcuY29sLmV2aWRlbmNlJzogJ1x1NEY0RFx1N0Y2RScsXG4gICAgJ3Jldmlldy5jb2wuZml4JzogJ1x1NUVGQVx1OEJBRVx1NEZFRVx1NTkwRCcsXG4gICAgJ3Jldmlldy5oaW50JzogJ1x1NzBCOVx1NTFGQlx1NEUwQVx1NjVCOVx1NjMwOVx1OTRBRVx1NUYwMFx1NTlDQlx1NjgzOFx1NjdFNVx1RkYwQ1x1NEVBN1x1NTFGQVx1NjcwMFx1NEYxOFx1NjAyN1x1N0VEM1x1OEJCQVx1NEUwRVx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1MzAwMicsXG4gICAgJ2RpZmYuc2hvdyc6ICdcdTVCRjlcdTZCRDQnLFxuICAgICdkaWZmLmhpZGUnOiAnXHU2NTM2XHU4RDc3XHU1REVFXHU1RjAyJyxcblxuICAgICdkZXRhaWwudGl0bGUnOiAnXHU2ODM4XHU2N0U1XHU4QkU2XHU2MEM1JyxcbiAgICAnZGV0YWlsLnBpY2snOiAnXHUyMTkwIFx1NEVDRVx1NURFNlx1NEZBN1x1OTAwOVx1NjJFOVx1NEUwMFx1NkIyMVx1NjNEMFx1NEVBNFx1RkYwOFx1NjIxNlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOVx1NUYwMFx1NTlDQlx1NjgzOFx1NjdFNScsXG4gICAgJ2RldGFpbC53aGF0JzogJ1x1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OCcsXG4gICAgJ2RldGFpbC5sb2dpYyc6ICdcdTVCOUVcdTczQjBcdTkwM0JcdThGOTEnLFxuICAgICdkZXRhaWwucmlzayc6ICdcdTk4Q0VcdTk2NjlcdTcwQjknLFxuICAgICdkZXRhaWwuZmlsZXMnOiAnXHU2NTg3XHU0RUY2XHU2RTA1XHU1MzU1JyxcbiAgICAnZGV0YWlsLnBhdGNoJzogJ1x1NjdFNVx1NzcwQlx1ODg2NVx1NEUwMVx1NTM5Rlx1NjU4NycsXG4gICAgJ2RldGFpbC5haUxvYWRpbmcnOiAnQUkgXHU4OUUzXHU4QkZCXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4XHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXG4gICAgJ2RldGFpbC5xdWV1ZWQnOiAnXHU4RkQ4XHU2NzA5IHtufSBcdTRFMkFcdTg5RTNcdThCRkJcdTYzOTJcdTk2MUZcdTRFMkRcdUZGMDhcdTgxRUFcdTUyQThcdTVFNzZcdTUzRDFcdTYyNjdcdTg4NENcdUZGMDknLFxuICAgICdkZXRhaWwuY2FyZFF1ZXVlZCc6ICdcdTYzOTJcdTk2MUZcdTdCNDlcdTVGODUgQUkgXHU4OUUzXHU4QkZCXHVGRjA4XHU1RTc2XHU1M0QxXHU0RTBBXHU5NjUwIDNcdUZGMENcdTkwN0ZcdTUxNERcdTYyNTNcdTZFRTFcdTZBMjFcdTU3OEJcdTdGNTFcdTUxNzNcdUZGMDknLFxuICAgICdkZXRhaWwuaW1wYWN0JzogJ1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNFx1NTIwNlx1Njc5MCcsXG4gICAgJ2RldGFpbC5pbXBhY3RMb2FkaW5nJzogJ1x1NUY3MVx1NTRDRFx1NjI2Qlx1NjNDRlx1NEUyRFx1MjAyNlx1RkYwOFx1NUYxNVx1NzUyOFx1NjhDMFx1N0QyMiArIFx1NTZGRVx1OEMzMVx1NEYyMFx1NjRBRFx1RkYwOScsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5JzogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNScsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZyc6ICdcdThCQzRcdTVCQTFcdTRFMkRcdTIwMjZcdUZGMDhcdTRGMUFcdTRFQTdcdTUxRkFcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTRFMEVcdTY3MDBcdTRGMThcdTYwMjdcdTdFRDNcdThCQkFcdUZGMDknLFxuXG4gICAgJ2ltcGFjdC5yaXNrJzogJ1x1OThDRVx1OTY2OScsXG4gICAgJ2ltcGFjdC5jb2wuY2hhbmdlZCc6ICdcdTUzRDhcdTY2RjRcdTY1ODdcdTRFRjYnLFxuICAgICdpbXBhY3QuY29sLmluZGlyZWN0JzogJ1x1OTVGNFx1NjNBNVx1NUY3MVx1NTRDRFx1RkYwOFx1NUYxNVx1NzUyOFx1OTRGRVx1RkYwOScsXG4gICAgJ2ltcGFjdC5jb2wucG90ZW50aWFsJzogJ1x1NkY1Q1x1NTcyOFx1NUY3MVx1NTRDRCcsXG4gICAgJ2ltcGFjdC5ub25lJzogJ1x1NjcyQVx1NTNEMVx1NzNCMFx1NEVEM1x1NUU5M1x1NTE4NVx1NUYxNVx1NzUyOFx1ODAwNVx1RkYwOFx1NjUzOVx1NTJBOFx1NzcwQlx1NEYzQ1x1NzJFQ1x1N0FDQlx1RkYwOVx1MzAwMicsXG4gICAgJ2ltcGFjdC50ZXN0cyc6ICdcdTUxNzNcdTgwNTRcdTZENEJcdThCRDUnLFxuICAgICdpbXBhY3QubGVnZW5kLmNoYW5nZWQnOiAnXHU1M0Q4XHU2NkY0JyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5pbmRpcmVjdCc6ICdcdTk1RjRcdTYzQTUnLFxuICAgICdpbXBhY3QubGVnZW5kLnBvdGVudGlhbCc6ICdcdTZGNUNcdTU3MjgnLFxuXG4gICAgJ3Jldmlldy52ZXJkaWN0JzogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1N0VEM1x1OEJCQScsXG4gICAgJ3Jldmlldy5pc3N1ZXMnOiAnXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1JyxcbiAgICAncmV2aWV3LmNsZWFuJzogJ1x1NjcyQVx1NTNEMVx1NzNCMFx1OTVFRVx1OTg5OFx1MzAwMicsXG5cbiAgICAnbm90ZXMudGl0bGUnOiAnXHU2ODM4XHU2N0U1XHU3QjE0XHU4QkIwJyxcbiAgICAnbm90ZXMuZm9ybVRpdGxlJzogJ1x1N0IxNFx1OEJCMFx1NjgwN1x1OTg5OCcsXG4gICAgJ25vdGVzLmZvcm1Db250ZW50JzogJ1x1N0IxNFx1OEJCMFx1NTE4NVx1NUJCOVx1RkYwOFx1N0VEM1x1OEJCQVx1MzAwMVx1NzU5MVx1OTVFRVx1MzAwMVx1NUI2Nlx1NEU2MFx1ODk4MVx1NzBCOVx1MjAyNlx1RkYwOScsXG4gICAgJ25vdGVzLmFkZCc6ICdcdTZERkJcdTUyQTBcdTdCMTRcdThCQjAnLFxuICAgICdub3Rlcy5ib3VuZFRvJzogJ1x1NUMwNlx1NTE3M1x1ODA1NFx1NTIzMCcsXG4gICAgJ25vdGVzLmNvbC50aW1lJzogJ1x1NjVGNlx1OTVGNCcsXG4gICAgJ25vdGVzLmNvbC50aXRsZSc6ICdcdTY4MDdcdTk4OTgnLFxuICAgICdub3Rlcy5jb2wuY29udGVudCc6ICdcdTUxODVcdTVCQjknLFxuICAgICdub3Rlcy5jb2wuc2hhJzogJ1x1NTE3M1x1ODA1NFx1NjNEMFx1NEVBNCcsXG4gICAgJ25vdGVzLnJlbW92ZSc6ICdcdTUyMjBcdTk2NjQnLFxuICAgICdub3Rlcy5lbXB0eSc6ICdcdThGRDhcdTZDQTFcdTY3MDlcdTdCMTRcdThCQjBcdTMwMDJcdTY4MzhcdTY3RTVcdTYzRDBcdTRFQTRcdTY1RjZcdTk2OEZcdTYyNEJcdThCQjBcdTRFMEJcdTdFRDNcdThCQkFcdTRFMEVcdTc1OTFcdTk1RUVcdUZGMENcdTVDMzFcdTY2MkZcdTRGNjBcdTc2ODRcdTk4NzlcdTc2RUVcdTVCNjZcdTRFNjBcdTY4NjNcdTY4NDhcdTMwMDInLFxuXG4gICAgJ21lbW9yeS5yZWNvcmQnOiAnXHU4QkIwXHU1RjU1XHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2JyxcbiAgICAnZm9ybS5tZW1vcnlUaXRsZSc6ICdcdThCQjBcdTVGQzZcdTY4MDdcdTk4OTgnLFxuICAgICdmb3JtLm1lbW9yeUNvbnRlbnQnOiAnXHU4QkIwXHU1RkM2XHU1MTg1XHU1QkI5XHVGRjA4XHU0RUMwXHU0RTQ4XHU0RTBFXHU0RTNBXHU0RUMwXHU0RTQ4XHVGRjA5JyxcbiAgICAnbWVtb3J5LmNvbC50aXRsZSc6ICdcdTY3NjFcdTc2RUUnLFxuICAgICdtZW1vcnkuY29sLnR5cGUnOiAnXHU3QzdCXHU1NzhCJyxcbiAgICAnbWVtb3J5LmNvbC50cnV0aCc6ICdcdTc3MUZcdTUwM0MnLFxuICAgICdtZW1vcnkuY29sLmJyYW5jaCc6ICdcdTUyMDZcdTY1MkYnLFxuICAgICdtZW1vcnkuY29uZmlybSc6ICdcdTc4NkVcdThCQTQnLFxuICAgICdtZW1vcnkuZW1wdHknOiAnXHU2NjgyXHU2NUUwXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHUzMDAyXHU1M0VGXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1OEJCMFx1NUY1NVx1RkYwQ1x1NjIxNlx1NTcyOFx1NEUwQVx1NjVCOVx1NjI0Qlx1NTJBOFx1NkRGQlx1NTJBMFx1MzAwMicsXG4gICAgJ2NvbmNlcHRzLnRpdGxlJzogJ1x1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNScsXG4gICAgJ2NvbmNlcHRzLm5vbmUnOiAnXHU2NjgyXHU2NUUwXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1XHUzMDAyXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHU4REQxXHU1QjhDXHU1M0Q4XHU2NkY0XHU1NDBFXHU4MUVBXHU1MkE4XHU2Qzg5XHU2REMwXHVGRjBDXHU0RTVGXHU1M0VGXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1NjAzQlx1N0VEM1x1NUI2Nlx1NEU2MFx1ODk4MVx1NzBCOVx1MzAwMicsXG4gICAgJ2NvbmNlcHRzLmNvbC5uYW1lJzogJ1x1Njk4Mlx1NUZGNScsXG4gICAgJ2NvbmNlcHRzLmNvbC5jYXRlZ29yeSc6ICdcdTdDN0JcdTUyMkInLFxuICAgICdjb25jZXB0cy5jb2wuY291bnQnOiAnXHU2QjIxXHU2NTcwJyxcbiAgICAncmV2aWV3LnJlY29yZHNUaXRsZSc6ICdSZXZpZXcgXHU5NUVFXHU5ODk4JyxcbiAgICAncmV2aWV3LnJlY29yZHNFbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTk1RUVcdTk4OThcdThCQjBcdTVGNTVcdTMwMDJcdTYzRDBcdTRFQTRcdTVCQTFcdTY3RTVcdTk4NzVcdThCQzRcdTVCQTFcdTUxRkFcdTc2ODRcdTk1RUVcdTk4OThcdTRGMUFcdTgxRUFcdTUyQThcdTc2N0JcdThCQjBcdTUyMzBcdThGRDlcdTkxQ0NcdUZGMUJcdTkxQ0RcdTY1QjBcdThCQzRcdTVCQTFcdTRGMUFcdTY2RkZcdTYzNjJcdTY1RTdcdThCQjBcdTVGNTVcdTMwMDInLFxuICAgICd2ZXJpZnkucmVjb3Jkcyc6ICdcdTlBOENcdTY1MzZcdThCQjBcdTVGNTUnLFxuICAgICd2ZXJpZnkucmVjb3Jkc0VtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1OUE4Q1x1NjUzNlx1OEJCMFx1NUY1NVx1MzAwMlx1NTcyOFx1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDM1x1NzBCOVx1MzAwQ1x1OUE4Q1x1NjUzNlx1MzAwRFx1NTM3M1x1NzUxRlx1NjIxMFx1MzAwMicsXG5cbiAgICAnY29uZmlybWVkLnRpdGxlJzogJ1x1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1Rlx1RkYwOFx1NEVCQVx1NURFNVx1Nzg2RVx1OEJBNFx1RkYwQ0FJIFx1Nzk4MVx1NjUzOVx1ODFFQVx1NTJBOFx1NjJFNlx1NjIyQVx1RkYwOScsXG4gICAgJ2NvbmZpcm1lZC5hZGQnOiAnXHU2REZCXHU1MkEwXHU3RUE2XHU2NzVGJyxcbiAgICAnY29uZmlybWVkLnRleHQnOiAnXHU3RUE2XHU2NzVGL1x1OTcwMFx1NkM0Mlx1NTE4NVx1NUJCOScsXG4gICAgJ2NvbmZpcm1lZC5wYXRocyc6ICdcdTc5ODFcdTY1MzlcdThERUZcdTVGODRcdUZGMDhcdTkwMTdcdTUzRjdcdTUyMDZcdTk2OTRcdUZGMUJcdTc2RjhcdTVCRjlcdTk4NzlcdTc2RUVcdTY4MzlcdTU5ODIgc3JjL2NvcmVcdUZGMENcdTYyMTZcdTdFRERcdTVCRjlcdThERUZcdTVGODRcdUZGMDknLFxuICAgICdjb25maXJtZWQubm9uZSc6ICdcdTY2ODJcdTY1RTBcdTdFQTZcdTY3NUZcdTMwMDJcdTZERkJcdTUyQTBcdTU0MEVcdUZGMENBSSBcdTRGRUVcdTY1MzlcdTY3MkNcdTk4NzlcdTc2RUVcdTc2ODRcdTc5ODFcdTY1MzlcdThERUZcdTVGODRcdTVDMDZcdTg4QUJcdTgxRUFcdTUyQThcdTYyRDJcdTdFRERcdUZGMDhcdTRFQzVcdTVCRjlcdTY3MkNcdTk4NzlcdTc2RUVcdTc1MUZcdTY1NDhcdUZGMDlcdTMwMDInLFxuXG4gICAgJ2NoYW5nZXMudGl0bGUnOiAnXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExJyxcbiAgICAnc3RhdGUubm9DaGFuZ2VzJzogJ1x1NjY4Mlx1NjVFMFx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1MzAwMlx1NTcyOFx1ODA0QVx1NTkyOVx1NEUyRFx1OEJBOSBBSSBcdTUyMUJcdTVFRkFcdUZGMENcdTYyMTZcdTc1MjhcdTRFMEFcdTY1QjlcdTMwMENcdTY1QjBcdTVFRkFcdTUzRDhcdTY2RjRcdTMwMERcdTMwMDInLFxuICAgICdjaGFuZ2VzLmNvbC50aXRsZSc6ICdcdTY4MDdcdTk4OTgnLFxuICAgICdjaGFuZ2VzLmNvbC50eXBlJzogJ1x1N0M3Qlx1NTc4QicsXG4gICAgJ2NoYW5nZXMuY29sLnN0YXR1cyc6ICdcdTcyQjZcdTYwMDEnLFxuICAgICdjaGFuZ2VzLmNvbC51cGRhdGVkJzogJ1x1NjZGNFx1NjVCMFx1NjVGNlx1OTVGNCcsXG4gICAgJ2V4ZWMuY29sLnN0YXR1cyc6ICdcdTcyQjZcdTYwMDEnLFxuICAgICdleGVjLmNvbC5jaGFuZ2UnOiAnXHU1M0Q4XHU2NkY0JyxcbiAgICAnZXhlYy5jb2wuc3RhcnRlZCc6ICdcdTVGMDBcdTU5Q0InLFxuICAgICdleGVjLmNvbC5jb3N0JzogJ1x1NjIxMFx1NjcyQyhcdTRGMzApJyxcbiAgICAnZXhlYy5hdHRlbXB0cyc6ICdcdTVDMURcdThCRDVcdTZCMjFcdTY1NzAnLFxuICAgICdleGVjLmhpbnQnOiAnXHU2MjY3XHU4ODRDXHVGRjA4c3RhcnRfcnVuXHVGRjA5XHU4QkY3XHU1NzI4XHU1M0YzXHU0RkE3XHU4MDRBXHU1OTI5XHU0RTJEXHU1M0QxXHU4RDc3XHVGRjFBXHU1MjFCXHU1RUZBXHU4QkExXHU1MjEyXHU1NDBFXHU1QkY5IEFJIFx1OEJGNFx1MzAwQ1x1NUYwMFx1NTlDQlx1NjI2N1x1ODg0Q1x1OEJFNSBjaGFuZ2VcdTMwMERcdTMwMDJcdTY3MkNcdTk4NzVcdTY3RTVcdTc3MEJcdThGREJcdTVFQTZcdTRFMEVcdTdFRDNcdTY3OUNcdTMwMDInLFxuICAgICdzdGF0ZS5ub1J1bnMnOiAnXHU2NjgyXHU2NUUwXHU2MjY3XHU4ODRDXHU4QkIwXHU1RjU1XHUzMDAyJyxcbiAgICAnc3RhdGUudGVjaFN0YWNrJzogJ1x1NjI4MFx1NjcyRlx1NjgwOCcsXG4gICAgJ3N0YXRlLnN5bWJvbHMnOiAnXHU1REYyXHU3RDIyXHU1RjE1XHU3QjI2XHU1M0Y3JyxcbiAgICAnc3RhdGUubWFuaWZlc3RzJzogJ1x1NkUwNVx1NTM1NVx1NjU4N1x1NEVGNicsXG4gICAgJ3N0YXRlLmV2aWRlbmNlJzogJ1x1OEJDMVx1NjM2RVx1Njc2MVx1NzZFRScsXG4gIH0sXG4gIGVuOiB7XG4gICAgJ3dvcmtzcGFjZS50aXRsZSc6ICdSZXZpZXcgRGVzaycsXG4gICAgJ3dvcmtzcGFjZS5zZWxlY3RTZXNzaW9uJzogJ1NlbGVjdCBhIHNlc3Npb24gdW5kZXIgYSB3b3Jrc3BhY2Ugb24gdGhlIGxlZnQgdG8gdmlldyBpdHMgcHJvamVjdCBkYXRhLicsXG4gICAgJ3RhYi5jb21taXRzJzogJ0NvbW1pdCBSZXZpZXcnLFxuICAgICd0YWIub3ZlcnZpZXcnOiAnT3ZlcnZpZXcnLFxuICAgICd0YWIuZXhlY3V0aW9uJzogJ0V4ZWN1dGlvbicsXG4gICAgJ3RhYi5yZXZpZXcnOiAnUmV2aWV3IGlzc3VlcycsXG4gICAgJ3RhYi5ub3Rlcyc6ICdOb3RlcyAmIE1lbW9yeScsXG4gICAgJ3RhYi5zZXR0aW5ncyc6ICdTZXR0aW5ncycsXG4gICAgJ2Vycm9yLmxvYWQnOiAnRmFpbGVkIHRvIGxvYWQnLFxuICAgICdzdGF0ZS5wcm9qZWN0JzogJ0N1cnJlbnQgcHJvamVjdCcsXG4gICAgJ3N0YXRlLm5vUHJvamVjdCc6ICdObyBwcm9qZWN0IGluaXRpYWxpemVkJyxcbiAgICAnc3RhdGUubm9Qcm9qZWN0SGludCc6ICdSdW4gXCJJbml0aWFsaXplIHByb2plY3RcIiB0byBzY2FuIHRoZSByZXBvc2l0b3J5IHN0cnVjdHVyZSwgdGVjaCBzdGFjaywgYW5kIHN5bWJvbCBpbmRleC4nLFxuICAgICdhY3Rpb24uYm9vdHN0cmFwJzogJ0luaXRpYWxpemUgcHJvamVjdCcsXG4gICAgJ2FjdGlvbi5yZXNjYW4nOiAnUmUtaW5pdGlhbGl6ZSAvIHNjYW4nLFxuICAgICdhY3Rpb24uYW5hbHl6ZSc6ICdBbmFseXplIHdvcmtpbmcgZGlmZicsXG4gICAgJ2FjdGlvbi5yZXZpZXcnOiAnUmV2aWV3IHdvcmtpbmcgZGlmZicsXG4gICAgJ2FjdGlvbi52ZXJpZnknOiAnVmVyaWZ5IHdvcmtpbmcgZGlmZicsXG4gICAgJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnOiAnQ3JlYXRlIGNoYW5nZScsXG4gICAgJ2FjdGlvbi5ydW5uaW5nJzogJ1J1bm5pbmdcdTIwMjYnLFxuICAgICdhY3Rpb24ucmVmcmVzaCc6ICdSZWZyZXNoJyxcbiAgICAnZm9ybS5jaGFuZ2VUaXRsZSc6ICdDaGFuZ2UgdGl0bGUnLFxuICAgICdmb3JtLmNoYW5nZURlc2MnOiAnUmVxdWlyZW1lbnQgYW5kIGJhY2tncm91bmQgKG9wdGlvbmFsKScsXG4gICAgJ3Jlc3VsdC5wYW5lbCc6ICdBY3Rpb24gcmVzdWx0JyxcblxuICAgICdyZXBvLmFkZCc6ICdBZGQgcmVwbycsXG4gICAgJ3JlcG8uYWRkSGludCc6ICdFbnRlciBhbiBhYnNvbHV0ZSByZXBvIHBhdGggYW5kIHByZXNzIEVudGVyOyBwcmV2aW91c2x5IHVzZWQgcmVwb3MgYXJlIHJlbWVtYmVyZWQnLFxuICAgICdyZXBvLnNjYW5IaXN0b3J5JzogJ1JlYnVpbGQgaGlzdG9yeScsXG4gICAgJ3JlcG8uY29tbWl0cyc6ICdjb21taXRzJyxcbiAgICAncmVwby5icmFuY2gnOiAnYnJhbmNoJyxcbiAgICAncmVwby53b3JraW5nJzogJ1VuY29tbWl0dGVkIGNoYW5nZXMnLFxuICAgICdyZXBvLndvcmtpbmdDbGVhbic6ICdXb3JraW5nIHRyZWUgaXMgY2xlYW4nLFxuICAgICdyZXBvLmVtcHR5JzogJ05vIGNvbW1pdHMuJyxcbiAgICAncmVwby5sb2FkRmFpbGVkJzogJ0ZhaWxlZCB0byBsb2FkIGNvbW1pdHMnLFxuICAgICdwaWNrZXIudGl0bGUnOiAnUGljayBjb21taXRzIHRvIHJldmlldyAobXVsdGktc2VsZWN0KScsXG4gICAgJ3BpY2tlci5wbGFjZWhvbGRlcic6ICdDbGljayB0byBwaWNrIGNvbW1pdHMgKG11bHRpLXNlbGVjdCwgaW5jbHVkZXMgdW5jb21taXR0ZWQpJyxcbiAgICAncGlja2VyLnNlbGVjdGVkJzogJ1NlbGVjdGVkJyxcbiAgICAncGlja2VyLmZpbHRlcic6ICdGaWx0ZXIgYnkgdGl0bGUvaGFzaC9hdXRob3JcdTIwMjYnLFxuICAgICdwaWNrZXIuY2xlYXInOiAnQ2xlYXInLFxuICAgICdwaWNrZXIubm9NYXRjaCc6ICdObyBtYXRjaGluZyBjb21taXQuJyxcbiAgICAncGlja2VyLmhpbnQnOiAnQ2hlY2tpbmcgYSBjb21taXQgZ2VuZXJhdGVzIGl0cyBBSSBleHBsYW5hdGlvbjsgcnVuIGltcGFjdCBhbmQgb3B0aW1hbGl0eSBiZWxvdy4nLFxuICAgICdwaWNrZXIucm91bmQnOiAnUm91bmQge259JyxcbiAgICAncGlja2VyLnJvdW5kTGF0ZXN0JzogJ1JvdW5kIHtufSAobGF0ZXN0KScsXG4gICAgJ3BpY2tlci5yb3VuZFNlbGVjdCc6ICdTZWxlY3Qgcm91bmQnLFxuICAgICdwaWNrZXIucm91bmRDbGVhcic6ICdDbGVhciByb3VuZCcsXG4gICAgJ3BpY2tlci51bmRpZ2VzdGVkJzogJ05ldyBjb21taXRzIHNpbmNlIHRoZSBsYXN0IEFJIHN1bW1hcnkgd2l0aG91dCBBSSBhbmFseXNpcyB5ZXQnLFxuICAgICdwaWNrZXIudW5kaWdlc3RlZENvdW50JzogJ3tufSB1bnJldmlld2VkIGNvbW1pdHMnLFxuICAgICdwaWNrZXIuc2VsZWN0QWxsVW5kaWdlc3RlZCc6ICdTZWxlY3QgdW5kaWdlc3RlZCcsXG4gICAgJ3BpY2tlci5kaWdlc3RBbGwnOiAnRGlnZXN0IGFsbCcsXG4gICAgJ3BpY2tlci5kaWdlc3RBbGxIaW50JzogJ1NlbGVjdCBhbGwgdW5kaWdlc3RlZCBjb21taXRzIGFuZCBiYXRjaCBBSSBhbmFseXNpcyAoY29uY3VycmVuY3kgMywgY2FjaGVkKSwgYXV0by1nZW5lcmF0ZSB0aGUgbmFycmF0aXZlIGFmdGVyd2FyZHM7IHRoZW4gY3JlYXRlIGFuIEFJIHN1bW1hcnkgaW4gTm90ZXMgJiBNZW1vcnkgdG8gcmVzZXQgdGhlIG1hcmtlcicsXG4gICAgJ25hcnJhdGl2ZS5kaWdlc3RIaW50JzogJ05hcnJhdGl2ZSBnZW5lcmF0ZWQuIENyZWF0ZSBhbiBBSSBzdW1tYXJ5IGluIE5vdGVzICYgTWVtb3J5IHRvIHJlc2V0IHRoZSB1bmRpZ2VzdGVkIG1hcmtlci4nLFxuICAgICdpbXBhY3QuZmFjdG9ycyc6ICdSaXNrIGZhY3RvcnMgKHdoeSB0aGlzIGxldmVsKScsXG4gICAgJ2ltcGFjdC5wb2ludHMnOiAnSW1wYWN0ZWQgcG9pbnRzJyxcbiAgICAnaW1wYWN0LmtleVBvaW50cyc6ICdLZXkgY29tcG9uZW50cycsXG4gICAgJ2ltcGFjdC5tZW1vcnknOiAnQ3Jvc3MtY2hlY2sgd2l0aCBwcm9qZWN0IG1lbW9yeScsXG4gICAgJ2ltcGFjdC5mdW5jdGlvbnMnOiAnSW1wYWN0ZWQgZnVuY3Rpb25zICh3aG8gY2FsbHMgdGhlIGNoYW5nZWQgY29kZSknLFxuICAgICdpbXBhY3QuZnVuY1JvbGUnOiAnRnVuY3Rpb24gcm9sZScsXG4gICAgJ2ltcGFjdC5mdW5jQ2hhbmdlJzogJ0NoYW5nZWQgYnkgdGhpcyBjb21taXQnLFxuICAgICdpbXBhY3QuZnVuY0NhbGxlcnMnOiAnSW1wYWN0IG9uIGNhbGxlcnMnLFxuICAgICdjYWNoZS5oaXQnOiAnZnJvbSBjYWNoZScsXG4gICAgJ2NhY2hlLnJlZ2VuZXJhdGUnOiAnUmVnZW5lcmF0ZScsXG4gICAgJ2Nvc3QudG9vbHRpcCc6ICdFc3RpbWF0ZWQgY29zdCBvZiB0aGlzIEFJIGNhbGwgKERlZXBTZWVrIHByaWNpbmcpJyxcbiAgICAnZXhlYy5jcmVhdGUnOiAnTmV3IHJ1bicsXG4gICAgJ2V4ZWMuZm9ybVRpdGxlJzogJ1doYXQgdG8gZG8gKG9uZSBsaW5lKScsXG4gICAgJ2V4ZWMuZm9ybURlc2MnOiAnUmVxdWlyZW1lbnQ6IGdvYWwsIG1vZHVsZXMsIGFjY2VwdGFuY2UnLFxuICAgICdleGVjLnN0YXJ0JzogJ1N0YXJ0IHJ1bicsXG4gICAgJ2V4ZWMuc3RhcnRpbmcnOiAnU3RhcnRpbmdcdTIwMjYnLFxuICAgICdleGVjLmNyZWF0ZUhpbnQnOiAnQ3JlYXRlcyBhIGNoYW5nZSwgZ2VuZXJhdGVzIGEgcGxhbiwgdGhlbiBBSSBzdWJhZ2VudHMgZXhlY3V0ZSBzdGVwIGJ5IHN0ZXA7IHByb2dyZXNzIHJlZnJlc2hlcyBiZWxvdy4nLFxuICAgICdleGVjLm1vZGVsRGVmYXVsdCc6ICdFeGVjdXRpb24gbW9kZWwgKHJvbGUgZGVmYXVsdHM6IGFuYWx5c2lzL29wcz1mYXN0LCBjb2Rpbmc9c3RhbmRhcmQsIHBsYW5uaW5nPXJlYXNvbmluZywgdmVyaWZpY2F0aW9uPXZlcmlmaWVyKScsXG4gICAgJ2JhZGdlLnJ1bm5pbmcnOiAne259IHJ1bnMgaW4gcHJvZ3Jlc3MsIGNsaWNrIHRvIHZpZXcnLFxuICAgICduYXJyYXRpdmUudGl0bGUnOiAnV29yay1yb3VuZCBuYXJyYXRpdmUnLFxuICAgICduYXJyYXRpdmUuZ2VuZXJhdGUnOiAnSW50ZXJwcmV0IHRoaXMgcm91bmQgb2Ygd29yaycsXG4gICAgJ25hcnJhdGl2ZS5ydW5uaW5nJzogJ0dlbmVyYXRpbmdcdTIwMjYgKH4xMC0zMHMpJyxcbiAgICAnYmFkZ2UuZmFpbGVkJzogJ3tufSBydW5zIG5lZWQgYXR0ZW50aW9uLCBjbGljayB0byB2aWV3JyxcbiAgICAnZXhlYy5mbG93Q3JlYXRlJzogJ0Rlc2NyaWJlIHRoZSB0YXNrJyxcbiAgICAnZXhlYy5mbG93T3JjaGVzdHJhdGUnOiAnQ29uZmlybSBvcmNoZXN0cmF0aW9uIChwZXItc3RlcCBtb2RlbC9yb2xlL2ZhaWx1cmUgcG9saWN5KScsXG4gICAgJ2V4ZWMuZmxvd1J1bic6ICdMYXVuY2ggKHRyYWNrIHByb2dyZXNzICYgY29zdCBpbiBydW4gZGV0YWlsKScsXG4gICAgJ2V4ZWMuZmxvd01lbW9yeSc6ICdBdXRvLWRpc3RpbGwgbWVtb3JpZXMgKGNvbmZpcm0gaW4gbWVtb3J5IHBhbmVsKScsXG4gICAgJ2V4ZWMucGxhbm5pbmcnOiAnR2VuZXJhdGluZyBvcmNoZXN0cmF0aW9uXHUyMDI2IChMTE0gaXMgZGVjb21wb3NpbmcgdGhlIHRhc2ssIH4xMC0zMHMpJyxcbiAgICAnZXhlYy5jb2wuc3RlcHMnOiAnU3RlcHMnLFxuICAgICdub3Rlcy5lZGl0JzogJ0VkaXQnLFxuICAgICdub3Rlcy50b01lbW9yeSc6ICdUbyBtZW1vcnknLFxuICAgICdub3Rlcy50b01lbW9yeUhpbnQnOiAnUHJlZmlsbCB0aGUgbWVtb3J5IGZvcm0gYmVsb3cgd2l0aCB0aGlzIG5vdGUnLFxuICAgICdub3Rlcy50b01lbW9yeURvbmUnOiAnXHUyNzEzIFByZWZpbGxlZCB0aGUgbWVtb3J5IGZvcm0gKGNob29zZSBhIHR5cGUgaW4gdGhlIFByb2plY3QgbWVtb3J5IHpvbmUgYmVsb3csIHRoZW4gYWRkKScsXG4gICAgJ25vdGVzLmNvcHlNZCc6ICdDb3B5IE1EJyxcbiAgICAnbm90ZXMuY29weU1kSGludCc6ICdDb3B5IHRoaXMgbm90ZSBhcyBNYXJrZG93biB0byB0aGUgY2xpcGJvYXJkJyxcbiAgICAnbm90ZXMuY29weU1kRG9uZSc6ICdDb3BpZWQgYXMgTWFya2Rvd24nLFxuICAgICdub3Rlcy5leHBvcnRNZCc6ICdFeHBvcnQgTUQnLFxuICAgICdub3Rlcy5leHBvcnRNZEhpbnQnOiAnRG93bmxvYWQgYXMgYSAubWQgZmlsZScsXG4gICAgJ25vdGVzLmV4cG9ydERvbmUnOiAnRXhwb3J0ZWQgYXMgLm1kJyxcbiAgICAnbm90ZXMuZGlnZXN0TmV2ZXInOiAnTm8gQUkgc3VtbWFyeSBnZW5lcmF0ZWQgeWV0JyxcbiAgICAnbm90ZXMuZGlnZXN0UGVuZGluZyc6ICd7bn0gbmV3IGNvbW1pdHMgc2luY2UgdGhlIGxhc3Qgc3VtbWFyeScsXG4gICAgJ2RldGFpbC5zYXZlTm90ZSc6ICdTYXZlIGFzIG5vdGUnLFxuICAgICdkZXRhaWwuc2F2ZU5vdGVIaW50JzogJ1NhdmUgdGhpcyByZXZpZXcgY29uY2x1c2lvbiAod2hhdC9sb2dpYy9yaXNrcykgYXMgYSBzdHJ1Y3R1cmVkIG5vdGUnLFxuICAgICdkZXRhaWwuc2F2ZU5vdGVUaXRsZSc6ICdSZXZpZXcgcmVjb3JkJyxcbiAgICAnZGV0YWlsLnNhdmVNZW1vcnknOiAnRGlzdGlsbCB0byBtZW1vcnknLFxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeUhpbnQnOiAnRGlzdGlsbCB0aGlzIHJldmlldyBjb25jbHVzaW9uIGludG8gYSBwcm9qZWN0IG1lbW9yeSAocXVldWVkIGZvciBjb25maXJtYXRpb24pJyxcbiAgICAnbm90ZXMuc2F2ZSc6ICdTYXZlJyxcbiAgICAnbm90ZXMuY2FuY2VsJzogJ0NhbmNlbCcsXG4gICAgJ21lbW9yeS5icmFuY2hTY29wZSc6ICdCcmFuY2gnLFxuICAgICdtZW1vcnkuYnJhbmNoQWxsJzogJ0FsbCBicmFuY2hlcycsXG4gICAgJ25vdGVzLnNlYXJjaCc6ICdTZWFyY2ggbm90ZXNcdTIwMjYnLFxuICAgICdtb2RlbC50aXRsZSc6ICdNb2RlbCBhc3NpZ25tZW50ICh3aGljaCBtb2RlbCBwZXIgdGFzayknLFxuICAgICdtb2RlbC5sb2FkaW5nJzogJ0xvYWRpbmcgbW9kZWxzXHUyMDI2JyxcbiAgICAnbW9kZWwuZm9sbG93Q2hhdCc6ICdGb2xsb3cgY2hhdCBtb2RlbCcsXG4gICAgJ21vZGVsLnNhdmUnOiAnU2F2ZSAmIGFwcGx5JyxcbiAgICAnbW9kZWwuc2F2ZWQnOiAnQXBwbGllZCcsXG4gICAgJ21vZGVsLmhpbnQnOiAnQXBwbGllcyBpbW1lZGlhdGVseSBhbmQgcGVyc2lzdHMgYWNyb3NzIHJlc3RhcnRzOyBjaGF0IG1vZGVsIHVuYWZmZWN0ZWQuJyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5JzogJ0FJIHN1bW1hcnknLFxuICAgICdub3Rlcy5haVN1bW1hcnlSdW4nOiAnU3VtbWFyaXppbmdcdTIwMjYgKDEwLTMwcyknLFxuICAgICdub3Rlcy5leHBhbmQnOiAnRXhwYW5kJyxcbiAgICAnbm90ZXMuY29sbGFwc2UnOiAnQ29sbGFwc2UnLFxuICAgICdub3Rlcy5zdW1tYXJ5VGFnJzogJ0FJIHN1bW1hcnknLFxuICAgICdub3Rlcy5lbXB0eVNlYXJjaCc6ICdObyBtYXRjaGluZyBub3Rlcy4nLFxuICAgICdub3Rlcy5jb250ZW50SGludCc6ICdOb3RlIGNvbnRlbnQgKG11bHRpLWxpbmUpOiBjb25jbHVzaW9ucywgcXVlc3Rpb25zLCBsZWFybmluZ3NcdTIwMjYnLFxuICAgICdub3Rlcy50YWdzSGludCc6ICdUYWdzIChjb21tYSBzZXBhcmF0ZWQsIG9wdGlvbmFsOyBjbGljayBhIHRhZyB0byBmaWx0ZXIpJyxcbiAgICAnbm90ZXMucGluJzogJ1BpbicsXG4gICAgJ25vdGVzLnVucGluJzogJ1VucGluJyxcbiAgICAnbm90ZXMuZWRpdGVkQXQnOiAnZWRpdGVkJyxcbiAgICAncmV2aWV3LmZpbHRlckFsbCc6ICdBbGwnLFxuICAgICdyZXZpZXcuc3RhdHVzQWxsJzogJ0FsbCBzdGF0dXNlcycsXG4gICAgJ3Jldmlldy52ZXJpZnknOiAnUmUtdmVyaWZ5JyxcbiAgICAncmV2aWV3LnZlcmlmeVJ1bm5pbmcnOiAnVmVyaWZ5aW5nXHUyMDI2JyxcbiAgICAncmV2aWV3LnZlcmlmeUhpbnQnOiAnQWZ0ZXIgZml4aW5nIHRoZSBjb2RlLCBjbGljayB0byByZS1jaGVjazogd2hldGhlciBpc3N1ZXMgYXJlIGZpeGVkLCB3aGV0aGVyIHRoZSBjaGFuZ2UgaXMgb3B0aW1hbCBhbmQgbWluaW1hbGx5IGludmFzaXZlLCBhbmQgd2hldGhlciBuZXcgaXNzdWVzIGFwcGVhcmVkLiBPbmx5IGEgcGFzc2luZyByZS12ZXJpZmljYXRpb24gbWFya3MgaXNzdWVzIHJlc29sdmVkLicsXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlJzogJ0ZhbHNlIHBvc2l0aXZlJyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVIaW50JzogJ0h1bWFuLW1hcmsgdGhpcyBpc3N1ZSBhcyBhIGZhbHNlIHBvc2l0aXZlIGFuZCBjbG9zZSBpdCAoZGlzdGluY3QgZnJvbSBhIHZlcmlmaWVkIGZpeCknLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZVRpdGxlJzogJ01hcmsgYXMgZmFsc2UgcG9zaXRpdmU/JyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVNc2cnOiAnXCJ7dGl0bGV9XCIgd2lsbCBiZSBtYXJrZWQgcmVqZWN0ZWQgYW5kIHJlbW92ZWQgZnJvbSB0aGUgb3BlbiBxdWV1ZS4nLFxuICAgICdyZXZpZXcuZml4RGV0YWlsJzogJ0ZpeCBkZXRhaWxzJyxcbiAgICAncmV2aWV3LmZpeFN0YXRGaWxlcyc6ICdmaWxlcycsXG4gICAgJ3Jldmlldy5maXhGaWxlcyc6ICdGaWxlcyB0b3VjaGVkIGJ5IHRoZSBmaXgnLFxuICAgICdyZXZpZXcuZml4SW1wYWN0JzogJ0ltcGFjdCBzY29wZSAoY2hhbmdlZCBzeW1ib2xzIGFuZCBjYWxsZXJzKScsXG4gICAgJ3Jldmlldy5kZWZpbmVkSW4nOiAnZGVmaW5lZCBpbicsXG4gICAgJ3Jldmlldy5jYWxsQ291bnQnOiAnY2FsbCBzaXRlKHMpJyxcbiAgICAncmV2aWV3LmZpeERpZmYnOiAnRml4IGRpZmYgKHJlbGF0aXZlIHRvIHRoZSByZXZpZXcgYmFzZWxpbmUpJyxcbiAgICAncmV2aWV3LnJlZnJlc2gnOiAnUmVmcmVzaCcsXG4gICAgJ3Jldmlldy5yZXRlbnRpb25IaW50JzogJ1Jlc29sdmVkIC8gZmFsc2UtcG9zaXRpdmUgaXNzdWVzIGFyZSBhdXRvLXB1cmdlZCBhZnRlciB7ZGF5c30gZGF5KHMpJyxcbiAgICAncmV2aWV3LnRhcmdldCc6ICdUYXJnZXQnLFxuICAgICdyZXZpZXcud29ya2luZ1RhcmdldCc6ICdXb3JraW5nIHRyZWUnLFxuICAgICdyZXZpZXcuZXhwb3J0TWQnOiAnRXhwb3J0IE1EJyxcbiAgICAncmV2aWV3LmV4cG9ydE1kSGludCc6ICdEb3dubG9hZCB0aGUgZmlsdGVyZWQgaXNzdWUgbGlzdCBhcyBhIC5tZCBmaWxlJyxcbiAgICAncmV2aWV3LmV4cG9ydEVtcHR5JzogJ05vIGlzc3VlcyB0byBleHBvcnQnLFxuICAgICdyZXZpZXcuc2VsZWN0QWxsJzogJ1NlbGVjdCBhbGwnLFxuICAgICdyZXZpZXcuY2hlY2tlZENvdW50JzogJ3tufSBzZWxlY3RlZCcsXG4gICAgJ3Jldmlldy5tYXJrSGFuZGxlZCc6ICdNYXJrIGhhbmRsZWQnLFxuICAgICdyZXZpZXcuYmF0Y2hWZXJpZnknOiAnQmF0Y2ggdmVyaWZ5JyxcbiAgICAncmV2aWV3LmJhdGNoVmVyaWZ5Q29uZmlybVRpdGxlJzogJ0JhdGNoIHZlcmlmeT8nLFxuICAgICdyZXZpZXcuYmF0Y2hWZXJpZnlDb25maXJtTXNnJzogJ1dpbGwgdmVyaWZ5IHtufSByZXZpZXcgdGFyZ2V0cyBvbmUgYnkgb25lIChzZXJpYWwgTExNIGNhbGxzLCB+MTAtNjBzIGVhY2gsIGNvbnN1bWVzIG1vZGVsIHVzYWdlKTsgeW91IGNhbiBzdG9wIGFueXRpbWUuJyxcbiAgICAncmV2aWV3LmJhdGNoU3RvcCc6ICdTdG9wJyxcbiAgICAncmV2aWV3LmJhdGNoUHJvZ3Jlc3MnOiAnQmF0Y2ggdmVyaWZ5aW5nIHtpfS97bn0nLFxuICAgICdyZXZpZXcuYmF0Y2hEb25lJzogJ0JhdGNoIHZlcmlmeSBkb25lOiB7YX0gcmVzb2x2ZWQgXHUwMEI3IHtifSBzdGlsbCBvcGVuIFx1MDBCNyB7Y30gbmV3IFx1MDBCNyB7ZH0gZmFpbGVkIHRhcmdldHMnLFxuICAgICdyZXZpZXcuYmF0Y2hTdG9wcGVkJzogJ0JhdGNoIHZlcmlmeSBzdG9wcGVkJyxcbiAgICAncmV2aWV3LnRyaWFnZSc6ICdcdUQ4M0VcdURERjkgVHJpYWdlIGFsbCcsXG4gICAgJ3Jldmlldy50cmlhZ2VIaW50JzogJ0xMTSBob2xpc3RpYyBzY2FuIG92ZXIgYWxsIHBlbmRpbmcgaXNzdWVzOiBkdXBsaWNhdGVzL29ic29sZXRlL25vbi1pc3N1ZXMgYXJlIGNsb3NlZCBpbW1lZGlhdGVseSB3aXRoIGV2aWRlbmNlIChyZW9wZW5hYmxlKTsgcmVhbCBpc3N1ZXMgc3RheSBmb3IgZml4IGRpc3BhdGNoJyxcbiAgICAncmV2aWV3LnRyaWFnZUNvbmZpcm1UaXRsZSc6ICdUcmlhZ2UgYWxsIHBlbmRpbmcgaXNzdWVzPycsXG4gICAgJ3Jldmlldy50cmlhZ2VDb25maXJtTXNnJzogJ1dpbGwgc2NhbiBhbGwgcGVuZGluZyBpc3N1ZXMgd2l0aCB0aGUgTExNIGluIGJhdGNoZXMgKHVwIHRvIHtufSBwZXIgYmF0Y2gsIGNvbnN1bWVzIG1vZGVsIHVzYWdlKS4gSXNzdWVzIGp1ZGdlZCBkdXBsaWNhdGUvb2Jzb2xldGUvbm9uLWlzc3VlcyBhcmUgY2xvc2VkIElNTUVESUFURUxZIHdpdGggZXZpZGVuY2UgXHUyMDE0IGV2ZXJ5IGNsb3N1cmUgaXMgcmV2aWV3YWJsZSBhbmQgcmVvcGVuYWJsZSBvbiB0aGUgaXNzdWUgY2FyZC4gUmVhbCBpc3N1ZXMgc3RheSBmb3IgZml4IGRpc3BhdGNoLicsXG4gICAgJ3Jldmlldy50cmlhZ2VQcm9ncmVzcyc6ICdUcmlhZ2luZzoge259IHByb2Nlc3NlZCwgfnttfSByZW1haW5pbmcnLFxuICAgICdyZXZpZXcudHJpYWdlU3RvcCc6ICdTdG9wJyxcbiAgICAncmV2aWV3LnRyaWFnZURvbmUnOiAnVHJpYWdlIGRvbmU6IGNsb3NlZCB7YX0gZHVwbGljYXRlIFx1MDBCNyB7Yn0gb2Jzb2xldGUgXHUwMEI3IHtjfSBub24taXNzdWVzOyB7ZH0gcGVuZGluZyBrZXB0JyxcbiAgICAncmV2aWV3LnRyaWFnZVN0b3BwZWQnOiAnVHJpYWdlIHN0b3BwZWQgKGp1ZGdlZCBpdGVtcyBhcmUgbm90IHJlLWJpbGxlZDsgY2xpY2sgYWdhaW4gdG8gY29udGludWUpJyxcbiAgICAncmV2aWV3LnRyaWFnZU5vdGhpbmcnOiAnTm8gcGVuZGluZyBpc3N1ZXMgdG8gdHJpYWdlIGZvciB0aGUgcHJvamVjdCB0aGlzIHNlc3Npb24gcmVzb2x2ZXMgdG8gKGlmIHRoaXMgbG9va3Mgd3JvbmcsIGNoZWNrIHRoZSBvcGVuIHNlc3Npb24gYmVsb25ncyB0byB0aGF0IHByb2plY3QpJyxcbiAgICAncmV2aWV3LnRyaWFnZVBhcnNlRmFpbCc6ICc7IG9uZSBiYXRjaCBmYWlsZWQgdG8gcGFyc2UgYW5kIHdhcyBrZXB0IGFzLWlzLCByZXRyeWFibGUnLFxuICAgICdyZXZpZXcuaGFuZGxlZERvbmUnOiAne259IGlzc3VlcyBtYXJrZWQgYXMgaGFuZGxlZCcsXG4gICAgJ2ZpeC5wbGFuJzogJ0ZpeCBwbGFuJyxcbiAgICAnZml4LnBsYW5BcHByb2FjaCc6ICdBcHByb2FjaCcsXG4gICAgJ2ZpeC5wbGFuSW1wYWN0JzogJ0ltcGFjdCcsXG4gICAgJ2ZpeC5wbGFuQmVuZWZpdCc6ICdCZW5lZml0JyxcbiAgICAnZml4LnBsYW5SaXNrJzogJ1Jpc2snLFxuICAgICdmaXguZGlzcGF0Y2gnOiAnRGlzcGF0Y2ggZml4ZXMnLFxuICAgICdmaXguZGlzcGF0Y2hIaW50TWFpbic6ICdEaXNwYXRjaCB0aGUgY2hlY2tlZCBwZW5kaW5nIGlzc3VlcyAodW5jaGVja2VkID0gYWxsIHVuZGVyIHRoZSBjdXJyZW50IGZpbHRlcikgdG8gY29uY3VycmVudCBzdWItYWdlbnRzOiBhdXRvIGZpeCA9IHRocmVlLWdhdGUgdmVyaWZ5ICsgZml4ICsgd3JpdGUtYmFjayArIGNvbW1pdDsgcGxhbiBmaXJzdCA9IHJlYWQtb25seSBzdHJ1Y3R1cmVkIHBsYW5zIGF3YWl0aW5nIHlvdXIgYXBwcm92YWwnLFxuICAgICdmaXguZGlzcGF0Y2hNb2RlVGl0bGUnOiAnRGlzcGF0Y2ggZml4ZXMgXHUyMDE0IHBpY2sgYSBtb2RlJyxcbiAgICAnZml4LmRpc3BhdGNoTW9kZU1zZyc6ICdXaWxsIGRpc3BhdGNoIHtufSBwZW5kaW5nIGlzc3VlcyB0byBjb25jdXJyZW50IHN1Yi1hZ2VudHMgKG9uZSB3b3JrdHJlZSBwZXIgdGFzaywgY29uc3VtZXMgbW9kZWwgdXNhZ2UsIGRvZXMgbm90IHVzZSB0aGUgY2hhdCB3aW5kb3cpLiBcdTI2QTEgQXV0byBmaXg6IHRocmVlLWdhdGUgdmVyaWZ5ICsgZml4ICsgd3JpdGUtYmFjayArIGNvbW1pdDsgZmFsc2UgcG9zaXRpdmVzL2R1cGxpY2F0ZXMvb2Jzb2xldGUgYXJlIGF1dG8tY2xvc2VkLiBcdUQ4M0RcdURDQ0IgUGxhbiBmaXJzdDogcmVhZC1vbmx5IHN0cnVjdHVyZWQgcGxhbnMsIG5vIGNvZGUgY2hhbmdlczsgYXBwcm92ZSB0aGVtIG9uIHRoZSBpc3N1ZSBjYXJkLCB0aGVuIHByZXNzIFwiRGlzcGF0Y2ggYXBwcm92ZWQgcGxhbnNcIi4nLFxuICAgICdmaXguZGlzcGF0Y2hBdXRvJzogJ1x1MjZBMSBBdXRvIGZpeCcsXG4gICAgJ2ZpeC5kaXNwYXRjaFBsYW4nOiAnXHVEODNEXHVEQ0NCIFBsYW4gZmlyc3QnLFxuICAgICdmaXguZGlzcGF0Y2hOb09wZW4nOiAnTm8gcGVuZGluZyBpc3N1ZXMgdW5kZXIgdGhlIGN1cnJlbnQgZmlsdGVyIHRvIGRpc3BhdGNoJyxcbiAgICAnZml4LmRpc3BhdGNoUGxhbnMnOiAnRGlzcGF0Y2ggYXBwcm92ZWQgcGxhbnMnLFxuICAgICdmaXguZGlzcGF0Y2hQbGFuc0hpbnQnOiAnRGlzcGF0Y2ggdGhlIGFwcHJvdmVkIHBlbmRpbmcgcGxhbnMgdG8gY29uY3VycmVudCBzdWItYWdlbnQgZml4ZXMgKG9uZSB3b3JrdHJlZSBwZXIgdGFzazsgY29uZmxpY3RzIGF1dG8tcmVkbyBvbiBsYXRlc3QgSEVBRCknLFxuICAgICdmaXguZGlzcGF0Y2hEb25lJzogJ1x1NURGMlx1NkQzRVx1NTNEMSB7bn0gXHU0RTJBXHU0RkVFXHU1OTBEXHU0RUZCXHU1MkExXHVGRjA4XHU1RTc2XHU1M0QxIHtjfVx1RkYwOScsXG4gICAgJ2ZpeC5kaXNwYXRjaEVtcHR5JzogJ1x1NkNBMVx1NjcwOVx1NTNFRlx1NkQzRVx1NTNEMVx1NzY4NFx1NEVGQlx1NTJBMVx1RkYwOFx1NTJGRVx1OTAwOVx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1NjIxNlx1N0I0OVx1NUY4NVx1NjVCOVx1Njg0OFx1NEVBN1x1NTFGQVx1RkYwOScsXG4gICAgJ2ZpeC5zdGF0dXMnOiAnXHU0RkVFXHU1OTBEXHU2MjY3XHU4ODRDJyxcbiAgICAnZml4LnN0b3AnOiAnXHU1MDVDXHU2QjYyJyxcbiAgICAnZml4LnN0b3BEb25lJzogJ1x1NURGMlx1NTA1Q1x1NkI2MiB7bn0gXHU0RTJBXHU0RkVFXHU1OTBEXHU0RUZCXHU1MkExJyxcbiAgICAnZml4LnRhc2tRdWV1ZWQnOiAnXHU2MzkyXHU5NjFGXHU0RTJEJyxcbiAgICAnZml4LnRhc2tSdW5uaW5nJzogJ1x1OEZEMFx1ODg0Q1x1NEUyRCcsXG4gICAgJ2ZpeC50YXNrTWVyZ2luZyc6ICdcdTU0MDhcdTVFNzZcdTRFMkQnLFxuICAgICdmaXgudGFza1JlZG8nOiAnXHU5MUNEXHU1MDVBXHU0RTJEJyxcbiAgICAnZml4LnRhc2tEb25lJzogJ1x1NURGMlx1NUI4Q1x1NjIxMCcsXG4gICAgJ2ZpeC50YXNrQ29uZmxpY3QnOiAnXHU1MUIyXHU3QTgxJyxcbiAgICAnZml4LnRhc2tGYWlsZWQnOiAnXHU1OTMxXHU4RDI1JyxcbiAgICAnZml4LnRhc2tDYW5jZWxsZWQnOiAnXHU1REYyXHU1MDVDXHU2QjYyJyxcbiAgICAnZml4LmF0dGVtcHQnOiAnXHU3QjJDIHtufSBcdTZCMjEnLFxuICAgICdmaXgucnVudGltZSc6ICdcdTVERjJcdThGRDBcdTg4NEMge259IFx1NTIwNicsXG4gICAgJ2ZpeC5yZXN1bWVzJzogJ1x1N0VFRFx1OEREMSB7bn0nLFxuICAgICdmaXgucHJvYmVzJzogJ1x1NjNBMlx1NkQzQiB7bn0nLFxuICAgICdmaXgubW9kZWxUaXRsZSc6ICdcdTRGRUVcdTU5MERcdTVFNzZcdTUzRDFcdUZGMDhcdTVCNTAgQWdlbnQgXHU2QzYwXHVGRjA5JyxcbiAgICAnZml4Lm1vZGVsSGludCc6ICdcdTU0MENcdTY1RjZcdTYyNjdcdTg4NENcdTc2ODRcdTRGRUVcdTU5MERcdTVCNTAgQWdlbnQgXHU0RTBBXHU5NjUwXHVGRjA4MS0xMFx1RkYwOVx1MzAwMlx1NkJDRlx1NEVGQlx1NTJBMVx1NzJFQ1x1N0FDQiB3b3JrdHJlZSBcdTRFOTJcdTRFMERcdTVFNzJcdTYyNzBcdTMwMDInLFxuXG4gICAgJ3BsYW4udGl0bGUnOiAnT3JjaGVzdHJhdGlvbiBwbGFuJyxcbiAgICAncGxhbi5oaW50JzogJ0VhY2ggc3RlcCByb2xlIGRyaXZlcyBjb250ZXh0IGluamVjdGlvbiBhbmQgdGhlIGRlZmF1bHQgbW9kZWwgKGFuYWx5c2lzL29wcz1mYXN0LCBjb2Rpbmc9c3RhbmRhcmQsIHBsYW5uaW5nPXJlYXNvbmluZywgdmVyaWZpY2F0aW9uPXZlcmlmaWVyKTsgYWRqdXN0IGJlZm9yZSBsYXVuY2hpbmcuJyxcbiAgICAncGxhbi5jb2wuc3RlcCc6ICdTdGVwJywgJ3BsYW4uY29sLnJvbGUnOiAnUm9sZScsICdwbGFuLmNvbC5tb2RlbCc6ICdNb2RlbCcsICdwbGFuLmNvbC5wb2xpY3knOiAnRmFpbHVyZSBwb2xpY3knLCAncGxhbi5jb2wuZW5hYmxlZCc6ICdPbicsICdwbGFuLmNvbC5hdHRlbXB0cyc6ICdBdHRlbXB0cycsXG4gICAgJ3BsYW4ubW9kZWxEZWZhdWx0JzogJ1JvbGUgZGVmYXVsdCcsXG4gICAgJ3BsYW4ubGF1bmNoRWRpdGVkJzogJ1NhdmUgZWRpdHMgJiBsYXVuY2gnLFxuICAgICdwbGFuLmxhdW5jaERpcmVjdCc6ICdMYXVuY2ggYXMtaXMnLFxuICAgICdwbGFuLmRpc2NhcmQnOiAnRGlzY2FyZCcsXG4gICAgJ3BsYW4udmlld0RldGFpbCc6ICdEZXRhaWwnLCAncGxhbi5yZWZyZXNoRGV0YWlsJzogJ1JlZnJlc2gnLCAncGxhbi5jbG9zZURldGFpbCc6ICdDbG9zZScsXG4gICAgJ3BsYW4uZGV0YWlsVGl0bGUnOiAnUnVuIGRldGFpbCcsXG4gICAgJ3BsYW4ucGF1c2VkQmFubmVyJzogJ1J1biBwYXVzZWQsIGF3YWl0aW5nIHlvdXIgZGVjaXNpb24nLFxuICAgICdwbGFuLnJlc3VtZVJldHJ5JzogJ1JldHJ5IHN0ZXAgJiBjb250aW51ZScsXG4gICAgJ3BsYW4ucmVzdW1lU2tpcCc6ICdTa2lwIHN0ZXAgJiBjb250aW51ZScsXG4gICAgJ3BsYW4ucmVzdW1lRmFpbGVkJzogJ1Jlc3VtZSBmcm9tIGZhaWx1cmUnLFxuICAgICdwbGFuLmNvbnRleHRUaXRsZSc6ICdSdW4gY29udGV4dCAod2hhdCB3YXMgaW5qZWN0ZWQpJyxcbiAgICAncGxhbi5icmFuY2gnOiAnQnJhbmNoJywgJ3BsYW4uaW5qZWN0ZWRNZW1vcmllcyc6ICdJbmplY3RlZCBtZW1vcmllcycsICdwbGFuLmRlY2lzaW9uTG9nJzogJ0RlY2lzaW9uIGxvZycsXG4gICAgJ2V4ZWMuY29sLmRldGFpbCc6ICdEZXRhaWwnLFxuXG4gICAgJ3NjaGVkLnRpdGxlJzogJ1NjaGVkdWxlZCB0YXNrcycsXG4gICAgJ3NjaGVkLmZvcm1OYW1lJzogJ1Rhc2sgbmFtZScsICdzY2hlZC5mb3JtSW50ZXJ2YWwnOiAnSW50ZXJ2YWwgKG1pbnV0ZXMpJyxcbiAgICAnc2NoZWQudHlwZVJldmlldyc6ICdBdXRvIHJldmlldycsICdzY2hlZC50eXBlU3VtbWFyeSc6ICdBSSBzdW1tYXJ5JywgJ3NjaGVkLnR5cGVSdW4nOiAnVGltZWQgcnVuJyxcbiAgICAnc2NoZWQuYWRkJzogJ0NyZWF0ZScsXG4gICAgJ3NjaGVkLmhpbnQnOiAnUnVucyBhdXRvbWF0aWNhbGx5IHdoZW4gZHVlOiBhdXRvIHJldmlldyA9IHJldmlldyBjb21taXRzIGZyb20gdGhlIGxhc3QgMjRoIChpc3N1ZXMgbGFuZCBpbiB0aGUgUmV2aWV3IHRhYik7IEFJIHN1bW1hcnkgPSBpbmNyZW1lbnRhbCBsZWFybmluZyBzdW1tYXJ5OyB0aW1lZCBydW4gPSBleGVjdXRlIHRoZSB0ZW1wbGF0ZSBhcyBhbiBvcmNoZXN0cmF0ZWQgdGFzay4gTWluaW11bSAxIG1pbnV0ZS4nLFxuICAgICdzY2hlZC5lbXB0eSc6ICdObyBzY2hlZHVsZWQgdGFza3MgeWV0LicsXG4gICAgJ3NjaGVkLmNvbC5uYW1lJzogJ05hbWUnLCAnc2NoZWQuY29sLnR5cGUnOiAnVHlwZScsICdzY2hlZC5jb2wuaW50ZXJ2YWwnOiAnQ3ljbGUnLCAnc2NoZWQuY29sLm5leHQnOiAnTmV4dCBydW4nLCAnc2NoZWQuY29sLmxhc3RSZXN1bHQnOiAnTGFzdCByZXN1bHQnLCAnc2NoZWQuY29sLmFjdGlvbnMnOiAnQWN0aW9ucycsXG4gICAgJ3NjaGVkLmRheSc6ICcgZCcsICdzY2hlZC5ob3VyJzogJyBoJywgJ3NjaGVkLm1pbnV0ZSc6ICcgbWluJyxcbiAgICAnc2NoZWQuZGlzYWJsZSc6ICdQYXVzZScsICdzY2hlZC5lbmFibGUnOiAnRW5hYmxlJywgJ3NjaGVkLnJ1bk5vdyc6ICdSdW4gbm93JyxcblxuICAgICdtZW1vcnkuem9uZVRpdGxlJzogJ1Byb2plY3QgbWVtb3J5JyxcbiAgICAnbWVtb3J5LnN5bmNCYXNlbGluZSc6ICdTeW5jIGJhc2VsaW5lJywgJ21lbW9yeS5zeW5jTm9uZSc6ICduZXZlciBzeW5jZWQnLFxuICAgICdtZW1vcnkuYmVoaW5kJzogJ3tufSBjb21taXRzIGJlaGluZCcsXG4gICAgJ21lbW9yeS5zeW5jJzogJ1N5bmMgbWVtb3J5JywgJ21lbW9yeS5zeW5jaW5nJzogJ1N5bmNpbmdcdTIwMjYnLCAnbWVtb3J5LnN5bmNGYWlsZWQnOiAnU3luYyBmYWlsZWQnLFxuICAgICdtZW1vcnkuc3RhbGVUaXRsZSc6ICdQb3NzaWJseSBzdGFsZSAocmVsYXRlZCBjb2RlIGNoYW5nZWQ7IHJldmlldyBuZWVkZWQpJyxcbiAgICAnbWVtb3J5Lm1hcmtTdGFsZSc6ICdNYXJrIHN0YWxlJywgJ21lbW9yeS5hcmNoaXZlQnRuJzogJ0FyY2hpdmUnLCAnbWVtb3J5LmtlZXBBY3RpdmUnOiAnU3RpbGwgdmFsaWQnLFxuICAgICdtZW1vcnkubmV3Q2FuZGlkYXRlcyc6ICdOZXcgY2FuZGlkYXRlcyAocXVldWVkIGZvciBjb25maXJtYXRpb24pOicsXG4gICAgJ21lbW9yeS5jbG9zZVJlcG9ydCc6ICdDbG9zZSByZXBvcnQnLFxuICAgICdtZW1vcnkuc2NvcGVQcm9qZWN0JzogJ01haW5saW5lIChhbGwgYnJhbmNoZXMpJywgJ21lbW9yeS5zY29wZUJyYW5jaCc6ICdDdXJyZW50IGJyYW5jaCBvbmx5JyxcbiAgICAnbWVtb3J5LnBlbmRpbmdRdWV1ZSc6ICdQZW5kaW5nIGNvbmZpcm1hdGlvbicsXG4gICAgJ21lbW9yeS50b05vdGUnOiAnVG8gbm90ZScsICdtZW1vcnkubm9ybWFsaXplJzogJ05vcm1hbGl6ZSB0byBtYWlubGluZScsICdtZW1vcnkucmVzdG9yZSc6ICdSZXN0b3JlJyxcbiAgICAnbWVtb3J5LnN0YXR1c1N0YWxlJzogJ1N0YWxlJyxcbiAgICAnZnMuYnJvd3NlJzogJ0Jyb3dzZScsXG4gICAgJ2ZzLnVwJzogJ1VwJyxcbiAgICAnZnMudXNlJzogJ1VzZSB0aGlzIGRpcmVjdG9yeScsXG4gICAgJ2ZzLnJlZ2lzdGVyJzogJ0Fsc28gcmVnaXN0ZXIgYXMgc2Vzc2lvbiB3b3Jrc3BhY2UnLFxuICAgICdmcy5sb2FkaW5nJzogJ1JlYWRpbmdcdTIwMjYnLFxuICAgICdmcy5lbXB0eSc6ICdObyBzdWJkaXJlY3Rvcmllcy4nLFxuICAgICdpbXBhY3QuZnVuY3Rpb25zTm9uZSc6ICdObyBmdW5jdGlvbi1sZXZlbCBjYWxsIGltcGFjdCBkZXRlY3RlZCAoc3R5bGUvYXNzZXQvY29uZmlnLW9ubHkgY2hhbmdlKS4nLFxuICAgICdyZXZpZXcuY29sLnNldmVyaXR5JzogJ1NldmVyaXR5JyxcbiAgICAncmV2aWV3LmNvbC5jYXRlZ29yeSc6ICdDYXRlZ29yeScsXG4gICAgJ3Jldmlldy5jb2wudGl0bGUnOiAnSXNzdWUnLFxuICAgICdyZXZpZXcuY29sLmV2aWRlbmNlJzogJ0xvY2F0aW9uJyxcbiAgICAncmV2aWV3LmNvbC5maXgnOiAnU3VnZ2VzdGVkIGZpeCcsXG4gICAgJ3Jldmlldy5oaW50JzogJ0NsaWNrIHRoZSBidXR0b24gYWJvdmUgdG8gcHJvZHVjZSB0aGUgb3B0aW1hbGl0eSB2ZXJkaWN0IGFuZCBpc3N1ZSBsaXN0LicsXG4gICAgJ2RpZmYuc2hvdyc6ICdEaWZmJyxcbiAgICAnZGlmZi5oaWRlJzogJ0hpZGUgZGlmZicsXG5cbiAgICAnZGV0YWlsLnRpdGxlJzogJ1JldmlldyBkZXRhaWwnLFxuICAgICdkZXRhaWwucGljayc6ICdcdTIxOTAgUGljayBhIGNvbW1pdCAob3IgdGhlIHVuY29tbWl0dGVkIGNoYW5nZXMpIG9uIHRoZSBsZWZ0IHRvIHN0YXJ0IHJldmlld2luZycsXG4gICAgJ2RldGFpbC53aGF0JzogJ1doYXQgaXQgZG9lcycsXG4gICAgJ2RldGFpbC5sb2dpYyc6ICdJbXBsZW1lbnRhdGlvbiBsb2dpYycsXG4gICAgJ2RldGFpbC5yaXNrJzogJ1Jpc2tzJyxcbiAgICAnZGV0YWlsLmZpbGVzJzogJ0ZpbGVzJyxcbiAgICAnZGV0YWlsLnBhdGNoJzogJ1Nob3cgcmF3IHBhdGNoJyxcbiAgICAnZGV0YWlsLmFpTG9hZGluZyc6ICdHZW5lcmF0aW5nIEFJIGV4cGxhbmF0aW9uXHUyMDI2ICgxMC0zMHMpJyxcbiAgICAnZGV0YWlsLnF1ZXVlZCc6ICd7bn0gYW5hbHlzZXMgcXVldWVkICh3aWxsIHJ1biBjb25jdXJyZW50bHkpJyxcbiAgICAnZGV0YWlsLmNhcmRRdWV1ZWQnOiAnV2FpdGluZyBpbiB0aGUgYW5hbHlzaXMgcXVldWUgKG1heCAzIGNvbmN1cnJlbnQgdG8gcHJvdGVjdCB0aGUgbW9kZWwgZ2F0ZXdheSknLFxuICAgICdkZXRhaWwuaW1wYWN0JzogJ0ltcGFjdCBzY29wZScsXG4gICAgJ2RldGFpbC5pbXBhY3RMb2FkaW5nJzogJ1NjYW5uaW5nIGltcGFjdFx1MjAyNiAocmVmZXJlbmNlIHNlYXJjaCArIGdyYXBoIHdhbGspJyxcbiAgICAnZGV0YWlsLm9wdGltYWxpdHknOiAnT3B0aW1hbGl0eSByZXZpZXcnLFxuICAgICdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnOiAnUmV2aWV3aW5nXHUyMDI2IChwcm9kdWNlcyBpc3N1ZSBsaXN0IGFuZCBvcHRpbWFsaXR5IHZlcmRpY3QpJyxcblxuICAgICdpbXBhY3Qucmlzayc6ICdSaXNrJyxcbiAgICAnaW1wYWN0LmNvbC5jaGFuZ2VkJzogJ0NoYW5nZWQgZmlsZXMnLFxuICAgICdpbXBhY3QuY29sLmluZGlyZWN0JzogJ0luZGlyZWN0IChyZWZlcmVuY2UgY2hhaW4pJyxcbiAgICAnaW1wYWN0LmNvbC5wb3RlbnRpYWwnOiAnUG90ZW50aWFsJyxcbiAgICAnaW1wYWN0Lm5vbmUnOiAnTm8gaW4tcmVwbyByZWZlcmVuY2VycyBmb3VuZCAodGhlIGNoYW5nZSBsb29rcyBzZWxmLWNvbnRhaW5lZCkuJyxcbiAgICAnaW1wYWN0LnRlc3RzJzogJ1JlbGF0ZWQgdGVzdHMnLFxuICAgICdpbXBhY3QubGVnZW5kLmNoYW5nZWQnOiAnY2hhbmdlZCcsXG4gICAgJ2ltcGFjdC5sZWdlbmQuaW5kaXJlY3QnOiAnaW5kaXJlY3QnLFxuICAgICdpbXBhY3QubGVnZW5kLnBvdGVudGlhbCc6ICdwb3RlbnRpYWwnLFxuXG4gICAgJ3Jldmlldy52ZXJkaWN0JzogJ09wdGltYWxpdHkgdmVyZGljdCcsXG4gICAgJ3Jldmlldy5pc3N1ZXMnOiAnSXNzdWVzJyxcbiAgICAncmV2aWV3LmNsZWFuJzogJ05vIGlzc3VlcyBmb3VuZC4nLFxuXG4gICAgJ25vdGVzLnRpdGxlJzogJ1JldmlldyBub3RlcycsXG4gICAgJ25vdGVzLmZvcm1UaXRsZSc6ICdOb3RlIHRpdGxlJyxcbiAgICAnbm90ZXMuZm9ybUNvbnRlbnQnOiAnTm90ZSBjb250ZW50IChjb25jbHVzaW9ucywgcXVlc3Rpb25zLCBsZWFybmluZ3NcdTIwMjYpJyxcbiAgICAnbm90ZXMuYWRkJzogJ0FkZCBub3RlJyxcbiAgICAnbm90ZXMuYm91bmRUbyc6ICdXaWxsIGJlIGxpbmtlZCB0bycsXG4gICAgJ25vdGVzLmNvbC50aW1lJzogJ1RpbWUnLFxuICAgICdub3Rlcy5jb2wudGl0bGUnOiAnVGl0bGUnLFxuICAgICdub3Rlcy5jb2wuY29udGVudCc6ICdDb250ZW50JyxcbiAgICAnbm90ZXMuY29sLnNoYSc6ICdDb21taXQnLFxuICAgICdub3Rlcy5yZW1vdmUnOiAnRGVsZXRlJyxcbiAgICAnbm90ZXMuZW1wdHknOiAnTm8gbm90ZXMgeWV0LiBOb3RlIGRvd24gY29uY2x1c2lvbnMgYW5kIHF1ZXN0aW9ucyB3aGlsZSByZXZpZXdpbmcgY29tbWl0cyBcdTIwMTQgdGhhdCBpcyB5b3VyIHByb2plY3QgbGVhcm5pbmcgYXJjaGl2ZS4nLFxuXG4gICAgJ21lbW9yeS5yZWNvcmQnOiAnUmVjb3JkIHByb2plY3QgbWVtb3J5JyxcbiAgICAnZm9ybS5tZW1vcnlUaXRsZSc6ICdNZW1vcnkgdGl0bGUnLFxuICAgICdmb3JtLm1lbW9yeUNvbnRlbnQnOiAnTWVtb3J5IGNvbnRlbnQgKHdoYXQgYW5kIHdoeSknLFxuICAgICdtZW1vcnkuY29sLnRpdGxlJzogJ0l0ZW0nLFxuICAgICdtZW1vcnkuY29sLnR5cGUnOiAnVHlwZScsXG4gICAgJ21lbW9yeS5jb2wudHJ1dGgnOiAnVHJ1dGgnLFxuICAgICdtZW1vcnkuY29sLmJyYW5jaCc6ICdCcmFuY2gnLFxuICAgICdtZW1vcnkuY29uZmlybSc6ICdDb25maXJtJyxcbiAgICAnbWVtb3J5LmVtcHR5JzogJ05vIHByb2plY3QgbWVtb3JpZXMgeWV0LiBBc2sgdGhlIEFJIGluIGNoYXQgdG8gcmVjb3JkIG9uZSwgb3IgYWRkIGFib3ZlLicsXG4gICAgJ2NvbmNlcHRzLnRpdGxlJzogJ0xlYXJuaW5nIGNvbmNlcHRzJyxcbiAgICAnY29uY2VwdHMubm9uZSc6ICdObyBsZWFybmluZyBjb25jZXB0cyB5ZXQuIFRoZXkgYWNjdW11bGF0ZSBhZnRlciBzdWNjZXNzZnVsIGNoYW5nZSBydW5zLCBvciBhc2sgdGhlIEFJIHRvIHN1bW1hcml6ZSBsZWFybmluZyBwb2ludHMuJyxcbiAgICAnY29uY2VwdHMuY29sLm5hbWUnOiAnQ29uY2VwdCcsXG4gICAgJ2NvbmNlcHRzLmNvbC5jYXRlZ29yeSc6ICdDYXRlZ29yeScsXG4gICAgJ2NvbmNlcHRzLmNvbC5jb3VudCc6ICdDb3VudCcsXG4gICAgJ3Jldmlldy5yZWNvcmRzVGl0bGUnOiAnUmV2aWV3IGlzc3VlcycsXG4gICAgJ3Jldmlldy5yZWNvcmRzRW1wdHknOiAnTm8gaXNzdWUgcmVjb3JkcyB5ZXQuIElzc3VlcyBmb3VuZCBieSB0aGUgY29tbWl0LXJldmlldyBwYWdlIGFyZSByZWNvcmRlZCBoZXJlIGF1dG9tYXRpY2FsbHk7IHJlLXJldmlld2luZyByZXBsYWNlcyBvbGQgcmVjb3Jkcy4nLFxuICAgICd2ZXJpZnkucmVjb3Jkcyc6ICdWZXJpZmljYXRpb24gcmVjb3JkcycsXG4gICAgJ3ZlcmlmeS5yZWNvcmRzRW1wdHknOiAnTm8gdmVyaWZpY2F0aW9uIHJlY29yZHMgeWV0LiBDbGljayBcIlZlcmlmeVwiIGluIHRoZSBleGVjdXRpb24gdGFiIHRvIGdlbmVyYXRlIG9uZS4nLFxuXG4gICAgJ2NvbmZpcm1lZC50aXRsZSc6ICdDb25maXJtZWQgY29uc3RyYWludHMgKGh1bWFuLWNvbmZpcm1lZDsgQUkgZWRpdHMgdG8gZm9yYmlkZGVuIHBhdGhzIGFyZSBhdXRvLWRlbmllZCknLFxuICAgICdjb25maXJtZWQuYWRkJzogJ0FkZCBjb25zdHJhaW50JyxcbiAgICAnY29uZmlybWVkLnRleHQnOiAnUmVxdWlyZW1lbnQgLyBjb25zdHJhaW50IHRleHQnLFxuICAgICdjb25maXJtZWQucGF0aHMnOiAnRm9yYmlkZGVuIHBhdGhzIChjb21tYSBzZXBhcmF0ZWQ7IHJlbGF0aXZlIHRvIHByb2plY3Qgcm9vdCBsaWtlIHNyYy9jb3JlLCBvciBhYnNvbHV0ZSknLFxuICAgICdjb25maXJtZWQubm9uZSc6ICdObyBjb25zdHJhaW50cyB5ZXQuIE9uY2UgYWRkZWQsIEFJIGVkaXRzIHRvIGZvcmJpZGRlbiBwYXRocyBpbiB0aGlzIHByb2plY3QgYXJlIGF1dG8tZGVuaWVkLicsXG5cbiAgICAnY2hhbmdlcy50aXRsZSc6ICdDaGFuZ2UgdGFza3MnLFxuICAgICdzdGF0ZS5ub0NoYW5nZXMnOiAnTm8gY2hhbmdlIHRhc2tzIHlldC4gQXNrIHRoZSBBSSBpbiBjaGF0IHRvIGNyZWF0ZSBvbmUsIG9yIHVzZSBcIkNyZWF0ZSBjaGFuZ2VcIiBhYm92ZS4nLFxuICAgICdjaGFuZ2VzLmNvbC50aXRsZSc6ICdUaXRsZScsXG4gICAgJ2NoYW5nZXMuY29sLnR5cGUnOiAnVHlwZScsXG4gICAgJ2NoYW5nZXMuY29sLnN0YXR1cyc6ICdTdGF0dXMnLFxuICAgICdjaGFuZ2VzLmNvbC51cGRhdGVkJzogJ1VwZGF0ZWQnLFxuICAgICdleGVjLmNvbC5zdGF0dXMnOiAnU3RhdHVzJyxcbiAgICAnZXhlYy5jb2wuY2hhbmdlJzogJ0NoYW5nZScsXG4gICAgJ2V4ZWMuY29sLnN0YXJ0ZWQnOiAnU3RhcnRlZCcsXG4gICAgJ2V4ZWMuY29sLmNvc3QnOiAnQ29zdCAoZXN0KScsXG4gICAgJ2V4ZWMuYXR0ZW1wdHMnOiAnQXR0ZW1wdHMnLFxuICAgICdleGVjLmhpbnQnOiAnUnVucyAoc3RhcnRfcnVuKSBhcmUgc3RhcnRlZCBmcm9tIGNoYXQ6IGFmdGVyIGEgcGxhbiBleGlzdHMsIHRlbGwgdGhlIEFJIHRvIFwic3RhcnQgcnVuIGZvciB0aGUgY2hhbmdlXCIuIFRoaXMgdGFiIHNob3dzIHByb2dyZXNzIGFuZCByZXN1bHRzLicsXG4gICAgJ3N0YXRlLm5vUnVucyc6ICdObyBydW5zIHlldC4nLFxuICAgICdzdGF0ZS50ZWNoU3RhY2snOiAnVGVjaCBzdGFjaycsXG4gICAgJ3N0YXRlLnN5bWJvbHMnOiAnSW5kZXhlZCBzeW1ib2xzJyxcbiAgICAnc3RhdGUubWFuaWZlc3RzJzogJ01hbmlmZXN0cycsXG4gICAgJ3N0YXRlLmV2aWRlbmNlJzogJ0V2aWRlbmNlIGVudHJpZXMnLFxuICB9LFxufSBhcyBjb25zdFxuXG5mdW5jdGlvbiBmYWxsYmFja1Qoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBkaWN0ID0gV09SS1NQQUNFX0RJQ1QuemggYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPlxuICByZXR1cm4gZGljdFtrZXldID8/IGtleVxufVxuXG4vKiogXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDXHU0RUJBXHU2MDI3XHU1MzE2XHVGRjFBXHUyNzEzL1x1MjcxNyArIFx1NjgwN1x1OTFDRlx1NUI1N1x1NkJCNVx1NzY4NFx1N0QyN1x1NTFEMVx1ODg0Q1x1RkYwOFx1OERGM1x1OEZDN1x1NUQ0Q1x1NTk1N1x1NUJGOVx1OEM2MVx1NEUwRVx1NTM5Rlx1NTlDQiBKU09OXHVGRjA5XHUzMDAyICovXG5mdW5jdGlvbiBmb3JtYXRBY3Rpb25SZXN1bHQoZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBzdHJpbmcge1xuICBjb25zdCBsaW5lczogc3RyaW5nW10gPSBbZGF0YVsnb2snXSA9PT0gZmFsc2UgPyAnXHUyNzE3JyA6ICdcdTI3MTMnXVxuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhkYXRhKSkge1xuICAgIGlmIChrZXkgPT09ICdvaycpIGNvbnRpbnVlXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgbGluZXMucHVzaChgJHtrZXl9XHVGRjFBJHtTdHJpbmcodmFsdWUpLnNsaWNlKDAsIDIwMCl9YClcbiAgICB9XG4gIH1cbiAgaWYgKGxpbmVzLmxlbmd0aCA9PT0gMSkgbGluZXMucHVzaCgnXHU2MjEwXHU1MjlGJylcbiAgcmV0dXJuIGxpbmVzLmpvaW4oJ1xcbicpXG59XG5cbi8qKiBMTE0gXHU2MjEwXHU2NzJDXHVGRjA4XHU0RjMwXHVGRjA5XHU1RkJEXHU2ODA3XHVGRjFBXHU2NUUwXHU1MDNDXHVGRjA4XHU2NzJBXHU0RUE3XHU3NTFGXHU4QzAzXHU3NTI4IC8gXHU2NUU3XHU3RjEzXHU1QjU4XHU0RTBEXHU1RTI2XHU2MjEwXHU2NzJDXHVGRjA5XHU2NUY2XHU4RkQ0XHU1NkRFIG51bGwgXHU0RTBEXHU1MzYwXHU0RjREXHUzMDAyICovXG5mdW5jdGlvbiByZW5kZXJDb3N0QmFkZ2UodXNkOiBudW1iZXIgfCB1bmRlZmluZWQsIHRpdGxlOiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGUge1xuICBpZiAodXNkID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsXG4gIHJldHVybiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI5NDllJyl9IHRpdGxlPXt0aXRsZX0+XHUyMjQ4JHt1c2QudG9GaXhlZCg0KX08L3NwYW4+XG59XG5cbmNvbnN0IHN0eWxlczogUmVjb3JkPHN0cmluZywgUmVhY3QuQ1NTUHJvcGVydGllcz4gPSB7XG4gIHJvb3Q6IHtcbiAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxuICAgIGZvbnRGYW1pbHk6ICd2YXIoLS1kcy1mb250LXNhbnMsIGluaGVyaXQpJyxcbiAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIH0sXG4gIG5hdjoge1xuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICBnYXA6ICc0cHgnLFxuICAgIHBhZGRpbmc6ICc4cHggMTJweCcsXG4gICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDEsIHJnYmEoNSw1LDUsMC4xKSknLFxuICAgIGZsZXg6ICdub25lJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyxcbiAgfSxcbiAgdGl0bGU6IHsgZm9udFNpemU6ICcxM3B4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5JbmxpbmVFbmQ6ICcxMHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknIH0sXG4gIHRhYjogKGFjdGl2ZTogYm9vbGVhbik6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4gKHtcbiAgICBwYWRkaW5nOiAnNXB4IDEycHgnLFxuICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgYm9yZGVyOiAnbm9uZScsXG4gICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAvLyBidXR0b24taW5mby1maWxsIFx1NEUyNFx1NEUzQlx1OTg5OFx1OTBGRFx1ODRERFx1RkYxQmJyYW5kLXByaW1hcnkgXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RjFBXHU4OEFCXHU1NDFFXHU2Mzg5XHVGRjA4XHU5ODc1XHU3QjdFXHU3NjdEXHU1NzU3XHU0RThCXHU2NTQ1XHVGRjA5XHUzMDAyXG4gICAgYmFja2dyb3VuZDogYWN0aXZlID8gJ3ZhcigtLWRzdy1hbGlhcy1idXR0b24taW5mby1maWxsLCAjMjU2M2ViKScgOiAndHJhbnNwYXJlbnQnLFxuICAgIGNvbG9yOiBhY3RpdmUgPyAnI2ZmZicgOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxuICB9KSxcbiAgYm9keTogeyBmbGV4OiAxLCBvdmVyZmxvd1k6ICdhdXRvJywgcGFkZGluZzogJzE0cHggMTZweCcgfSxcbiAgY2FyZDoge1xuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICBwYWRkaW5nOiAnMTJweCAxNHB4JyxcbiAgICBtYXJnaW5Cb3R0b206ICcxMnB4JyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJyxcbiAgfSxcbiAgcm93OiB7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMThweCcsIGZsZXhXcmFwOiAnd3JhcCcsIGZvbnRTaXplOiAnMTJweCcsIG1hcmdpbjogJzZweCAwJyB9LFxuICBsYWJlbDogeyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luSW5saW5lRW5kOiAnNnB4JyB9LFxuICB0YWJsZTogeyB3aWR0aDogJzEwMCUnLCBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJywgZm9udFNpemU6ICcxMnB4JyB9LFxuICB0aDogeyB0ZXh0QWxpZ246ICdzdGFydCcsIHBhZGRpbmc6ICc2cHggOHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDEsIHJnYmEoNSw1LDUsMC4xKSknLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZm9udFdlaWdodDogNTAwIH0sXG4gIHRkOiB7IHBhZGRpbmc6ICc2cHggOHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDMsIHJnYmEoNSw1LDUsMC4wNikpJyB9LFxuICBlbXB0eTogeyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZm9udFNpemU6ICcxMnB4JywgcGFkZGluZzogJzEwcHggNHB4JyB9LFxuICBidXR0b246IHtcbiAgICBwYWRkaW5nOiAnNXB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgLy8gYnV0dG9uLWluZm8tZmlsbCBcdTY2MkZcdTVCQkZcdTRFM0JcdTRFMjRcdTRFMkFcdTRFM0JcdTk4OThcdTRFMEJcdTkwRkRcdTRFM0FcdTg0RERcdTgyNzJcdTMwMDFcdTc2N0RcdTVCNTdcdTUzRUZcdThCRkJcdTc2ODRcdTRFM0JcdTY0Q0RcdTRGNUNcdTgyNzJcdUZGMDhicmFuZC1wcmltYXJ5IFx1NTcyOFx1NkRGMVx1ODI3Mlx1NEUzQlx1OTg5OFx1NjYyRlx1OEZEMVx1NzY3RFx1ODI3Mlx1RkYwQ1x1NzY3RFx1NUI1N1x1NEUwRFx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlxuICAgIGZvbnRTaXplOiAnMTFweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYnV0dG9uLWluZm8tZmlsbCwgIzI1NjNlYiknLCBjb2xvcjogJyNmZmYnLFxuICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICB9LFxuICBzZWNvbmRhcnk6IHtcbiAgICBwYWRkaW5nOiAnNXB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICcxMXB4JyxcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScsXG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIH0sXG4gIGlucHV0OiB7XG4gICAgd2lkdGg6ICcxMDAlJywgcGFkZGluZzogJzZweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgZm9udFNpemU6ICcxMnB4JyxcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScsXG4gICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gIH0sXG4gIGZvcm1Sb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnNnB4JywgbWFyZ2luQm90dG9tOiAnOHB4JyB9LFxuICBmb3JtSW5saW5lOiB7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzhweCcgfSxcbiAgLy8gc2VsZWN0IFx1NzUyOFx1N0NGQlx1N0VERlx1NTkxNlx1ODlDMlx1NjVGNiBXaW5kb3dzIFx1NkQ0NVx1ODI3Mlx1NkEyMVx1NUYwRlx1NEUwQlx1NUYzQVx1NTIzNlx1NzY3RFx1NUU5NVx1RkYwQ1x1NkRGMVx1ODI3Mlx1NEUzQlx1OTg5OFx1NEUwQlx1NEUwRFx1NTNFRlx1OEJGQlx1MjAxNFx1MjAxNFx1ODFFQVx1N0VEOFx1NTkxNlx1ODlDMlx1OEQ3MFx1NEUzQlx1OTg5OFx1NTNEOFx1OTFDRlx1MzAwMlxuICBzZWxlY3Q6IHtcbiAgICBhcHBlYXJhbmNlOiAnbm9uZScsIFdlYmtpdEFwcGVhcmFuY2U6ICdub25lJyxcbiAgICBwYWRkaW5nOiAnNnB4IDI2cHggNnB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7dXRmOCw8c3ZnIHhtbG5zPSUyMmh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJTIyIHdpZHRoPSUyMjEwJTIyIGhlaWdodD0lMjI2JTIyPjxwYXRoIGQ9JTIyTTEgMWw0IDQgNC00JTIyIHN0cm9rZT0lMjIlMjM4ODglMjIgc3Ryb2tlLXdpZHRoPSUyMjEuNSUyMiBmaWxsPSUyMm5vbmUlMjIvPjwvc3ZnPlwiKScsXG4gICAgYmFja2dyb3VuZFJlcGVhdDogJ25vLXJlcGVhdCcsIGJhY2tncm91bmRQb3NpdGlvbjogJ3JpZ2h0IDhweCBjZW50ZXInLFxuICAgIGN1cnNvcjogJ3BvaW50ZXInLCBib3hTaXppbmc6ICdib3JkZXItYm94JywgbWF4V2lkdGg6ICcxMDAlJyxcbiAgfSxcbiAgYWN0aW9uUm93OiB7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH0sXG4gIHJlc3VsdDoge1xuICAgIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNixcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnMTBweCAxMnB4JywgbWF4SGVpZ2h0OiAnMzIwcHgnLCBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgfSxcbiAgYmFkZ2U6IChjb2xvcjogc3RyaW5nKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiB7XG4gICAgY29uc3QgcmdiID0gcGFyc2VDb2xvcihjb2xvcilcbiAgICBpZiAocmdiID09PSBudWxsKSB7XG4gICAgICByZXR1cm4geyBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgcGFkZGluZzogJzFweCA4cHgnLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnLCBiYWNrZ3JvdW5kOiBgJHtjb2xvcn0yMmAsIGNvbG9yIH1cbiAgICB9XG4gICAgY29uc3QgW3IsIGcsIGJdID0gcmdiXG4gICAgLy8gXHU1RTk1XHU4MjcyXHU3RURGXHU0RTAwIDE2JSBcdTgyNzJcdThDMDNcdUZGMUJcdTY1ODdcdTVCNTdcdTgyNzJcdTRFM0JcdTk4OThcdTgxRUFcdTkwMDJcdTVFOTRcdUZGMDhcdTZENDVcdTgyNzJcdTZERjFcdTUzMTZcdTUyMzBcdTc2N0RcdTVFOTVcdTUzRUZcdThCRkJcdUZGMDlcdTMwMDJcbiAgICByZXR1cm4ge1xuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsIHBhZGRpbmc6ICcxcHggOHB4JywgYm9yZGVyUmFkaXVzOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JyxcbiAgICAgIGJhY2tncm91bmQ6IGByZ2JhKCR7cn0sICR7Z30sICR7Yn0sIDAuMTYpYCxcbiAgICAgIGNvbG9yOiB0aGVtZUF3YXJlVGV4dChjb2xvciksXG4gICAgfVxuICB9LFxuICBzZWN0aW9uVGl0bGU6IHsgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEycHgnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH0sXG4gIHdoYXQ6IHsgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS43LCBtYXJnaW46ICc0cHggMCA4cHgnIH0sXG4gIGxvZ2ljU3RlcDogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjgsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9LFxuICByaXNrSXRlbTogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjcsIG1hcmdpbjogJzJweCAwJyB9LFxuICBjb21taXRSb3c6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XG4gICAgcGFkZGluZzogJzhweCAxMHB4JyxcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxuICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGJvcmRlcjogYWN0aXZlID8gJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIDogJzFweCBzb2xpZCB0cmFuc3BhcmVudCcsXG4gICAgYmFja2dyb3VuZDogYWN0aXZlID8gJ3JnYmEoMzcsOTksMjM1LDAuMDYpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgbWFyZ2luQm90dG9tOiAnNHB4JyxcbiAgfSksXG4gIGNvbW1pdFN1YmplY3Q6IHsgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwLCBsaW5lSGVpZ2h0OiAxLjUsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9LFxuICBjb21taXRNZXRhOiB7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Ub3A6ICcycHgnLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcgfSxcbiAgcGF0Y2g6IHtcbiAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4JywgbGluZUhlaWdodDogMS41LCB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxuICAgIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICcxMHB4JywgbWF4SGVpZ2h0OiAnMzIwcHgnLCBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgfSxcbiAgdGV4dGFyZWE6IHtcbiAgICB3aWR0aDogJzEwMCUnLCBwYWRkaW5nOiAnOHB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBib3hTaXppbmc6ICdib3JkZXItYm94JywgcmVzaXplOiAndmVydGljYWwnLCBsaW5lSGVpZ2h0OiAxLjcsIGZvbnRGYW1pbHk6ICdpbmhlcml0JyxcbiAgfSxcbiAgbm90ZUNhcmQ6IHtcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEpKScsXG4gICAgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzEycHggMTRweCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxuICB9LFxuICBub3RlVGl0bGVSb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsIGdhcDogJzhweCcgfSxcbiAgbm90ZVRpdGxlVGV4dDogeyBmb250U2l6ZTogJzEzcHgnLCBmb250V2VpZ2h0OiA2MDAsIGxpbmVIZWlnaHQ6IDEuNSB9LFxuICBub3RlQ29udGVudDoge1xuICAgIGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuODUsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLXdvcmQnLFxuICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJywgbWFyZ2luVG9wOiAnNnB4JyxcbiAgfSxcbiAgbm90ZUNsYW1wOiB7XG4gICAgZGlzcGxheTogJy13ZWJraXQtYm94JywgV2Via2l0TGluZUNsYW1wOiA2LCBXZWJraXRCb3hPcmllbnQ6ICd2ZXJ0aWNhbCcsIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgfSxcbiAgbm90ZU1ldGE6IHtcbiAgICBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnOHB4JyxcbiAgICBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyxcbiAgfSxcbiAgbGlua0J0bjoge1xuICAgIGJhY2tncm91bmQ6ICdub25lJywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzExcHgnLCBwYWRkaW5nOiAnMCcsXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLFxuICB9LFxuICBjaGlwOiAoYWN0aXZlOiBib29sZWFuKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiAoe1xuICAgIHBhZGRpbmc6ICcycHggMTBweCcsIGJvcmRlclJhZGl1czogJzk5OXB4JywgZm9udFNpemU6ICcxMXB4JywgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICAvLyBcdTU0MEMgdGFiXHVGRjFBYWN0aXZlIFx1NTg2Qlx1ODI3Mlx1NEUwMFx1NUY4QiBidXR0b24taW5mby1maWxsXHVGRjA4XHU0RTI0XHU0RTNCXHU5ODk4XHU5MEZEXHU4NEREXHVGRjA5XHVGRjBDXHU3OTgxXHU3NTI4IGJyYW5kLXByaW1hcnlcdTMwMDJcbiAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyAndmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgY29sb3I6IGFjdGl2ZSA/ICcjZmZmJyA6ICdpbmhlcml0JyxcbiAgfSksXG59XG5cbi8qKiBcdTk4Q0VcdTk2NjlcdTdCNDlcdTdFQTcgXHUyMTkyIFx1NUZCRFx1N0FFMFx1OTg5Q1x1ODI3Mlx1MzAwMiAqL1xuY29uc3QgUklTS19DT0xPUjogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgbG93OiAnIzRlYzliMCcsIG1lZGl1bTogJyNkY2RjYWEnLCBoaWdoOiAnI2NlOTE3OCcsIGNyaXRpY2FsOiAnI2YxNGM0YycgfVxuXG4vKipcbiAqIFx1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNCBTVkcgXHU2RDQxXHU3QTBCXHU1NkZFXHVGRjFBXHU0RTA5XHU1MjE3XHU1MjA2XHU1QzQyXHVGRjA4XHU1M0Q4XHU2NkY0IFx1MjE5MiBcdTk1RjRcdTYzQTVcdTVGMTVcdTc1MjhcdTk0RkUgXHUyMTkyIFx1NkY1Q1x1NTcyOFx1RkYwOVx1RkYwQ1xuICogXHU0RjlEXHU2MzZFIC9pbXBhY3Qtc2NvcGUgXHU4RkQ0XHU1NkRFXHU3Njg0IGxldmVsc1x1RkYwOFx1NTQyQlx1NEYyMFx1NjRBRFx1OTRGRSByZWFzb25cdUZGMDlcdTdFRDhcdTUyMzZcdThGREVcdTdFQkZcdTMwMDJcbiAqIFx1NTE2OFx1NUJCRFx1NzUzQlx1NUUwM1x1RkYwOHZpZXdCb3ggMTAwMFx1RkYwOVx1RkYwQ1x1ODI4Mlx1NzBCOVx1NUUyNlx1NzZFRVx1NUY1NVx1NjNEMFx1NzkzQVx1RkYwQ1x1NkRGMVx1NUVBNlx1OEQ4QVx1NkRGMVx1OTg5Q1x1ODI3Mlx1OEQ4QVx1NkQ0NVx1MzAwMlxuICovXG5mdW5jdGlvbiBJbXBhY3RHcmFwaChwcm9wczogeyBkYXRhOiBJbXBhY3RTY29wZVBheWxvYWQ7IHQ6IChrZXk6IHN0cmluZykgPT4gc3RyaW5nIH0pIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBwcm9wc1xuICBjb25zdCBpbmRpcmVjdCA9IGRhdGEubGV2ZWxzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5sZXZlbCA9PT0gJ2luZGlyZWN0JylcbiAgY29uc3QgcG90ZW50aWFsID0gZGF0YS5sZXZlbHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmxldmVsID09PSAncG90ZW50aWFsJylcbiAgY29uc3QgY29sMCA9IGRhdGEuY2hhbmdlZEZpbGVzLnNsaWNlKDAsIDcpXG4gIGNvbnN0IGNvbDEgPSBBcnJheS5mcm9tKG5ldyBTZXQoaW5kaXJlY3QubWFwKChpdGVtKSA9PiBpdGVtLnBhdGgpKSkuc2xpY2UoMCwgOSlcbiAgY29uc3QgY29sMiA9IEFycmF5LmZyb20obmV3IFNldChwb3RlbnRpYWwubWFwKChpdGVtKSA9PiBpdGVtLnBhdGgpKSkuZmlsdGVyKChwKSA9PiAhY29sMS5pbmNsdWRlcyhwKSkuc2xpY2UoMCwgOClcbiAgY29uc3Qgbm9kZUggPSAzMFxuICBjb25zdCBnYXAgPSAxMFxuICBjb25zdCBjb2xYID0gWzMwLCAzODAsIDcyMF1cbiAgY29uc3QgY29sVyA9IDI4MFxuICBjb25zdCByb3dzID0gTWF0aC5tYXgoY29sMC5sZW5ndGgsIGNvbDEubGVuZ3RoLCBjb2wyLmxlbmd0aCwgMSlcbiAgY29uc3QgaGVpZ2h0ID0gcm93cyAqIChub2RlSCArIGdhcCkgKyA2MFxuXG4gIGNvbnN0IGRlcHRoT2YgPSAocGF0aDogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBpdGVtID0gaW5kaXJlY3QuZmluZCgoZW50cnkpID0+IGVudHJ5LnBhdGggPT09IHBhdGgpID8/IHBvdGVudGlhbC5maW5kKChlbnRyeSkgPT4gZW50cnkucGF0aCA9PT0gcGF0aClcbiAgICByZXR1cm4gaXRlbT8uZGVwdGggPz8gMFxuICB9XG5cbiAgY29uc3QgcmVuZGVyQ29sID0gKGNvbDogbnVtYmVyLCBpdGVtczogc3RyaW5nW10sIGNvbG9yOiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSA9PiBpdGVtcy5tYXAoKHBhdGgsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgeSA9IDQ0ICsgaW5kZXggKiAobm9kZUggKyBnYXApXG4gICAgY29uc3QgZGlyID0gcGF0aC5pbmNsdWRlcygnLycpID8gcGF0aC5zbGljZSgwLCBwYXRoLmxhc3RJbmRleE9mKCcvJykpIDogJydcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZycsIHsga2V5OiBgJHtjb2x9LSR7cGF0aH1gIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdyZWN0JywgeyB4OiBjb2xYW2NvbF0sIHksIHdpZHRoOiBjb2xXLCBoZWlnaHQ6IG5vZGVILCByeDogNiwgZmlsbDogY29sb3IsIHN0cm9rZTogJ3JnYmEoMCwwLDAsMC4zKScsIHN0cm9rZVdpZHRoOiAxIH0pLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGV4dCcsIHsgeDogY29sWFtjb2xdICsgMTAsIHk6IHkgKyAxNCwgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA3MDAsIGZpbGw6ICcjZmZmZmZmJyB9LFxuICAgICAgICAocGF0aC5zcGxpdCgnLycpLnBvcCgpID8/IHBhdGgpLnNsaWNlKDAsIDMwKSksXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyB4OiBjb2xYW2NvbF0gKyAxMCwgeTogeSArIDI2LCBmb250U2l6ZTogMTAsIGZpbGw6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpJyB9LFxuICAgICAgICBkaXIuc2xpY2UoMCwgNDApKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3RpdGxlJywgbnVsbCwgcGF0aCksXG4gICAgKVxuICB9KVxuXG4gIGNvbnN0IGNoYWluU3RhcnQgPSAocmVhc29uOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IG1hdGNoID0gcmVhc29uLm1hdGNoKC9wYXRoOiAoLispJC8pXG4gICAgaWYgKG1hdGNoID09PSBudWxsKSByZXR1cm4gZGF0YS5jaGFuZ2VkRmlsZXNbMF0gPz8gJydcbiAgICByZXR1cm4gbWF0Y2hbMV0hLnNwbGl0KCcgLT4gJylbMF0gPz8gZGF0YS5jaGFuZ2VkRmlsZXNbMF0gPz8gJydcbiAgfVxuICBjb25zdCBpbmRleEluID0gKGl0ZW1zOiBzdHJpbmdbXSwgcGF0aDogc3RyaW5nKTogbnVtYmVyID0+IGl0ZW1zLmluZGV4T2YocGF0aClcbiAgY29uc3QgY29sT2YgPSAocGF0aDogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICBpZiAoY29sMC5pbmNsdWRlcyhwYXRoKSkgcmV0dXJuIDBcbiAgICBpZiAoY29sMS5pbmNsdWRlcyhwYXRoKSkgcmV0dXJuIDFcbiAgICBpZiAoY29sMi5pbmNsdWRlcyhwYXRoKSkgcmV0dXJuIDJcbiAgICByZXR1cm4gLTFcbiAgfVxuXG4gIGNvbnN0IGVkZ2VzOiBSZWFjdC5SZWFjdE5vZGVbXSA9IFtdXG4gIGNvbnN0IHB1c2hFZGdlID0gKGZyb21QYXRoOiBzdHJpbmcsIHRvUGF0aDogc3RyaW5nLCBjb2xvcjogc3RyaW5nLCBrZXk6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGZyb21Db2wgPSBjb2xPZihmcm9tUGF0aClcbiAgICBjb25zdCB0b0NvbCA9IGNvbE9mKHRvUGF0aClcbiAgICBpZiAoZnJvbUNvbCA9PT0gLTEgfHwgdG9Db2wgPT09IC0xIHx8IHRvQ29sIDw9IGZyb21Db2wpIHJldHVyblxuICAgIGNvbnN0IHgxID0gY29sWFtmcm9tQ29sXSArIGNvbFdcbiAgICBjb25zdCB5MSA9IDQ0ICsgaW5kZXhJbihbY29sMCwgY29sMSwgY29sMl1bZnJvbUNvbF0gPz8gW10sIGZyb21QYXRoKSAqIChub2RlSCArIGdhcCkgKyBub2RlSCAvIDJcbiAgICBjb25zdCB4MiA9IGNvbFhbdG9Db2xdXG4gICAgY29uc3QgeTIgPSA0NCArIGluZGV4SW4oW2NvbDAsIGNvbDEsIGNvbDJdW3RvQ29sXSA/PyBbXSwgdG9QYXRoKSAqIChub2RlSCArIGdhcCkgKyBub2RlSCAvIDJcbiAgICBlZGdlcy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3BhdGgnLCB7XG4gICAgICBrZXksIGQ6IGBNICR7eDF9ICR7eTF9IEMgJHt4MSArIDMwfSAke3kxfSwgJHt4MiAtIDMwfSAke3kyfSwgJHt4Mn0gJHt5Mn1gLFxuICAgICAgZmlsbDogJ25vbmUnLCBzdHJva2U6IGNvbG9yLCBzdHJva2VXaWR0aDogMS42LCBvcGFjaXR5OiAwLjYsXG4gICAgfSkpXG4gIH1cbiAgZm9yIChjb25zdCBpdGVtIG9mIGluZGlyZWN0LnNsaWNlKDAsIDIwKSkgcHVzaEVkZ2UoY2hhaW5TdGFydChpdGVtLnJlYXNvbiksIGl0ZW0ucGF0aCwgdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSwgYGVpLSR7aXRlbS5wYXRofWApXG4gIGZvciAoY29uc3QgaXRlbSBvZiBwb3RlbnRpYWwuc2xpY2UoMCwgMTYpKSBwdXNoRWRnZShjaGFpblN0YXJ0KGl0ZW0ucmVhc29uKSwgaXRlbS5wYXRoLCB0aGVtZUF3YXJlVGV4dCgnIzU3NjA2YScpLCBgZXAtJHtpdGVtLnBhdGh9YClcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzdmcnLCB7IHdpZHRoOiAnMTAwJScsIHZpZXdCb3g6IGAwIDAgMTAyNCAke2hlaWdodH1gLCBzdHlsZTogeyBtYXhIZWlnaHQ6IDQ4MCB9IH0sXG4gICAgICBbWydcdTUzRDhcdTY2RjRcdTY1ODdcdTRFRjYnLCAwXSwgWydcdTk1RjRcdTYzQTVcdTVGNzFcdTU0Q0RcdUZGMDhcdThDMDFcdTVGMTVcdTc1MjhcdTRFODZcdTVCODNcdUZGMDknLCAxXSwgWydcdTZGNUNcdTU3MjhcdTVGNzFcdTU0Q0RcdUZGMDhcdTRFOENcdTdFQTdcdTRGMjBcdTY0QURcdUZGMDknLCAyXV0ubWFwKChbbmFtZSwgY29sXSkgPT5cbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGV4dCcsIHsga2V5OiBTdHJpbmcoY29sKSwgeDogY29sWFtjb2wgYXMgbnVtYmVyXSwgeTogMjQsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNzAwLCBmaWxsOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9LCBuYW1lIGFzIHN0cmluZykpLFxuICAgICAgcmVuZGVyQ29sKDAsIGNvbDAsICcjMjU2M2ViJyksXG4gICAgICByZW5kZXJDb2woMSwgY29sMSwgJyNkOTc3MDYnKSxcbiAgICAgIHJlbmRlckNvbCgyLCBjb2wyLCAnIzU3NjA2YScpLFxuICAgICAgZWRnZXMsXG4gICAgKSxcbiAgKVxufVxuXG5jb25zdCBESUZGX0tFWVdPUkRTID0gL1xcYihwdWJsaWN8cHJpdmF0ZXxwcm90ZWN0ZWR8aW50ZXJuYWx8c3RhdGljfHZvaWR8Y2xhc3N8c3RydWN0fGludGVyZmFjZXxlbnVtfG5ld3xyZXR1cm58aWZ8ZWxzZXxmb3J8Zm9yZWFjaHx3aGlsZXxzd2l0Y2h8Y2FzZXxicmVha3xjb250aW51ZXx0cnl8Y2F0Y2h8ZmluYWxseXx0aHJvd3x1c2luZ3xuYW1lc3BhY2V8aW1wb3J0fGV4cG9ydHxmcm9tfGNvbnN0fGxldHx2YXJ8YXN5bmN8YXdhaXR8ZnVuY3Rpb258dGhpc3xiYXNlfHN1cGVyfG51bGx8dHJ1ZXxmYWxzZXxvdmVycmlkZXx2aXJ0dWFsfGFic3RyYWN0fHNlYWxlZHxyZWFkb25seXxwYXJhbXN8b3V0fHJlZnx5aWVsZHx0eXBlb2Z8aW5zdGFuY2VvZnxpbnxvZnxkZWZhdWx0fHN0cmluZ3xpbnR8bG9uZ3xkb3VibGV8ZmxvYXR8Ym9vbHxjaGFyfGRlY2ltYWx8b2JqZWN0fHJlY29yZHxwYXJ0aWFsfGdldHxzZXR8cmVxdWlyZXxtb2R1bGV8dHlwZXxpbXBsZW1lbnRzfGV4dGVuZHMpXFxiL2dcblxuLyoqIFx1NTM1NVx1ODg0Q1x1NEVFM1x1NzgwMVx1OUFEOFx1NEVBRVx1RkYxQVx1NkNFOFx1OTFDQSA+IFx1NUI1N1x1N0IyNlx1NEUzMiA+IFx1NTE3M1x1OTUyRVx1NUI1Ny9cdTY1NzBcdTVCNTcgXHU0RTA5XHU1QzQyXHU3NzQwXHU4MjcyXHVGRjA4XHU4RjdCXHU5MUNGXHU2QjYzXHU1MjE5XHVGRjBDXHU1OTFGXHU2ODM4XHU2N0U1XHU3NTI4XHVGRjA5XHUzMDAyICovXG5mdW5jdGlvbiBoaWdobGlnaHRDb2RlTGluZShsaW5lOiBzdHJpbmcsIGtleVByZWZpeDogc3RyaW5nKTogUmVhY3QuUmVhY3ROb2RlW10ge1xuICBjb25zdCB0cmltbWVkID0gbGluZS50cmltU3RhcnQoKVxuICBpZiAodHJpbW1lZC5zdGFydHNXaXRoKCcvLycpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnLy8vJykgfHwgdHJpbW1lZC5zdGFydHNXaXRoKCcqJykgfHwgdHJpbW1lZC5zdGFydHNXaXRoKCcvKicpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnIycpKSB7XG4gICAgcmV0dXJuIFtSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBrZXk6IGAke2tleVByZWZpeH0tY2AsIHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzZhOTk1NScpIH0gfSwgbGluZSldXG4gIH1cbiAgY29uc3QgcGFydHMgPSBsaW5lLnNwbGl0KC8oXCIoPzpbXlwiXFxcXF18XFxcXC4pKlwifCcoPzpbXidcXFxcXXxcXFxcLikqJ3xgKD86W15gXFxcXF18XFxcXC4pKmApL2cpXG4gIHJldHVybiBwYXJ0cy5tYXAoKHBhcnQsIGkpID0+IHtcbiAgICBpZiAoaSAlIDIgPT09IDEpIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBrZXk6IGAke2tleVByZWZpeH0tcyR7aX1gLCBzdHlsZTogeyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNjZTkxNzgnKSB9IH0sIHBhcnQpXG4gICAgY29uc3Qgc3ViOiBSZWFjdC5SZWFjdE5vZGVbXSA9IFtdXG4gICAgbGV0IGxhc3QgPSAwXG4gICAgZm9yIChjb25zdCBtYXRjaCBvZiBwYXJ0Lm1hdGNoQWxsKERJRkZfS0VZV09SRFMpKSB7XG4gICAgICBpZiAobWF0Y2guaW5kZXghID4gbGFzdCkgc3ViLnB1c2gocGFydC5zbGljZShsYXN0LCBtYXRjaC5pbmRleCkpXG4gICAgICBzdWIucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBrZXk6IGAke2tleVByZWZpeH0tayR7aX0tJHttYXRjaC5pbmRleH1gLCBzdHlsZTogeyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM1NjljZDYnKSB9IH0sIG1hdGNoWzBdKSlcbiAgICAgIGxhc3QgPSBtYXRjaC5pbmRleCEgKyBtYXRjaFswXS5sZW5ndGhcbiAgICB9XG4gICAgaWYgKGxhc3QgPCBwYXJ0Lmxlbmd0aCkgc3ViLnB1c2gocGFydC5zbGljZShsYXN0KSlcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgeyBrZXk6IGAke2tleVByZWZpeH0tcCR7aX1gIH0sIHN1YilcbiAgfSlcbn1cblxuLyoqIFx1OUFEOFx1NEVBRVx1NURFRVx1NUYwMlx1ODlDNlx1NTZGRVx1RkYxQVx1ODlFM1x1Njc5MCB1bmlmaWVkIGRpZmZcdUZGMENcdTYzMDkgXHU1ODlFL1x1NTIyMC9cdTU3NTdcdTU5MzQvXHU0RTBBXHU0RTBCXHU2NTg3IFx1Nzc0MFx1ODI3Mlx1MzAwMiAqL1xuZnVuY3Rpb24gRGlmZlZpZXcocHJvcHM6IHsgcGF0Y2g6IHN0cmluZyB9KSB7XG4gIGNvbnN0IGxpbmVzID0gcHJvcHMucGF0Y2guc3BsaXQoJ1xcbicpLmZpbHRlcigobGluZSwgaSkgPT4gIShsaW5lID09PSAnJyAmJiBpID09PSBwcm9wcy5wYXRjaC5zcGxpdCgnXFxuJykubGVuZ3RoIC0gMSkpXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgc3R5bGU6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdDb25zb2xhcywgbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4JywgbGluZUhlaWdodDogMS41NSxcbiAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAwJywgbWF4SGVpZ2h0OiA0MjAsIG92ZXJmbG93WTogJ2F1dG8nLCBtYXJnaW5Ub3A6ICc2cHgnLFxuICAgIH0sXG4gIH0sIGxpbmVzLm1hcCgobGluZSwgaSkgPT4ge1xuICAgIGNvbnN0IGtpbmQgPSBsaW5lLnN0YXJ0c1dpdGgoJysrKycpIHx8IGxpbmUuc3RhcnRzV2l0aCgnLS0tJykgPyAnbWV0YSdcbiAgICAgIDogbGluZS5zdGFydHNXaXRoKCdAQCcpID8gJ2h1bmsnXG4gICAgICAgIDogbGluZS5zdGFydHNXaXRoKCcrJykgPyAnYWRkJ1xuICAgICAgICAgIDogbGluZS5zdGFydHNXaXRoKCctJykgPyAnZGVsJyA6ICdjdHgnXG4gICAgY29uc3QgYmcgPSBraW5kID09PSAnYWRkJyA/ICdyZ2JhKDQ2LDE2MCw2NywwLjE0KScgOiBraW5kID09PSAnZGVsJyA/ICdyZ2JhKDI0OCw4MSw3MywwLjEzKScgOiBraW5kID09PSAnaHVuaycgPyAncmdiYSg1NiwxMzksMjUzLDAuMSknIDogJ3RyYW5zcGFyZW50J1xuICAgIGNvbnN0IGNvbnRlbnQgPSBraW5kID09PSAnbWV0YScgfHwga2luZCA9PT0gJ2h1bmsnXG4gICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzA5NjlkYScpLCBmb250V2VpZ2h0OiA2MDAgfSB9LCBsaW5lKVxuICAgICAgOiBraW5kID09PSAnYWRkJyB8fCBraW5kID09PSAnZGVsJ1xuICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dChraW5kID09PSAnYWRkJyA/ICcjMWE3ZjM3JyA6ICcjY2YyMjJlJyksIGZvbnRXZWlnaHQ6IDYwMCB9IH0sIGxpbmVbMF0pXG4gICAgICAgIDogbnVsbFxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGtleTogaSwgc3R5bGU6IHsgcGFkZGluZzogJzAgMTBweCcsIGJhY2tncm91bmQ6IGJnLCB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH0gfSxcbiAgICAgIGNvbnRlbnQsXG4gICAgICBraW5kID09PSAnYWRkJyB8fCBraW5kID09PSAnZGVsJyA/IGhpZ2hsaWdodENvZGVMaW5lKGxpbmUuc2xpY2UoMSksIGBsJHtpfWApIDogaGlnaGxpZ2h0Q29kZUxpbmUobGluZSwgYGwke2l9YCksXG4gICAgKVxuICB9KSlcbn1cblxuZnVuY3Rpb24gZm9ybWF0VGltZSh2YWx1ZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gJ1x1MjAxNCdcbiAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKS50b0xvY2FsZVN0cmluZygpXG59XG5cbi8qKiBcdTRFOENcdTZCMjFcdTc4NkVcdThCQTRcdTVGMzlcdTdBOTdcdUZGMUFcdTkwNkVcdTdGNjkgKyBcdTVDNDVcdTRFMkRcdTUzNjFcdTcyNDdcdUZGMENcdTUzNzFcdTk2NjlcdTY0Q0RcdTRGNUNcdUZGMDhcdTUyMjBcdTk2NjRcdTdCMTRcdThCQjAvXHU1M0Q4XHU2NkY0L1x1N0VBNlx1Njc1Rlx1RkYwOVx1NTE3MVx1NzUyOFx1RkYxQmFsdCBcdTYzRDBcdTRGOUJcdTdCMkNcdTRFOENcdTc4NkVcdThCQTRcdTUyQThcdTRGNUNcdUZGMDhcdTU5ODJcIlx1NTE0OFx1NTFGQVx1NjVCOVx1Njg0OFwiXHVGRjA5XHUzMDAyICovXG5mdW5jdGlvbiBDb25maXJtRGlhbG9nKHByb3BzOiB7IHRpdGxlOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZzsgZGFuZ2VyPzogYm9vbGVhbjsgY29uZmlybUxhYmVsPzogc3RyaW5nOyBhbHQ/OiB7IGxhYmVsOiBzdHJpbmc7IG9uQWx0OiAoKSA9PiB2b2lkIH07IG9uQ2FuY2VsOiAoKSA9PiB2b2lkOyBvbkNvbmZpcm06ICgpID0+IHZvaWQgfSkge1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAnZGF0YS10ZXN0aWQnOiAncGMtY29uZmlybS1vdmVybGF5JyxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLCBpbnNldDogMCwgekluZGV4OiA5OTksXG4gICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDE1LDIzLDQyLDAuNDUpJywgYmFja2Ryb3BGaWx0ZXI6ICdibHVyKDJweCknLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgIGFuaW1hdGlvbjogJ3BjRmFkZUluIDAuMTVzIGVhc2Utb3V0JyxcbiAgICAgIH0sXG4gICAgICBvbkNsaWNrOiBwcm9wcy5vbkNhbmNlbCxcbiAgICB9LFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAnZGF0YS10ZXN0aWQnOiAncGMtY29uZmlybS1jYXJkJyxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICB3aWR0aDogNDAwLCBtYXhXaWR0aDogJ2NhbGMoMTAwdncgLSA0OHB4KScsXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsIGJveFNoYWRvdzogJzAgMjBweCA1MHB4IHJnYmEoMCwwLDAsMC4yNSknLFxuICAgICAgICAgIHBhZGRpbmc6ICcyMHB4IDIycHggMTZweCcsXG4gICAgICAgICAgb25DbGljazogKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JywgZ2FwOiAnMTBweCcgfSB9LFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHdpZHRoOiAzNCwgaGVpZ2h0OiAzNCwgYm9yZGVyUmFkaXVzOiAnNTAlJywgZmxleFNocmluazogMCxcbiAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICBmb250U2l6ZTogJzE3cHgnLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBwcm9wcy5kYW5nZXIgPyAncmdiYSgyNDQsNjMsOTQsMC4xMiknIDogJ3JnYmEoMzcsOTksMjM1LDAuMSknLFxuICAgICAgICAgICAgICBjb2xvcjogcHJvcHMuZGFuZ2VyID8gdGhlbWVBd2FyZVRleHQoJyNlMTFkNDgnKSA6IHRoZW1lQXdhcmVUZXh0KCcjMjU2M2ViJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sIHByb3BzLmRhbmdlciA/ICchJyA6ICc/JyksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICc2cHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSB9LCBwcm9wcy50aXRsZSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfSB9LCBwcm9wcy5tZXNzYWdlKSxcbiAgICAgICAgICApLFxuICAgICAgICApLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsIGdhcDogJzEwcHgnLCBtYXJnaW5Ub3A6ICcxOHB4JywgZmxleFdyYXA6ICd3cmFwJyB9IH0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xuICAgICAgICAgICAgc3R5bGU6IHsgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzdweCAxOHB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JyB9LFxuICAgICAgICAgICAgb25DbGljazogcHJvcHMub25DYW5jZWwsXG4gICAgICAgICAgfSwgJ1x1NTNENlx1NkQ4OCcpLFxuICAgICAgICAgIHByb3BzLmFsdCAhPT0gdW5kZWZpbmVkICYmIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcbiAgICAgICAgICAgIHN0eWxlOiB7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICc3cHggMThweCcsIGJvcmRlclJhZGl1czogJzhweCcsIGZvbnRXZWlnaHQ6IDYwMCB9LFxuICAgICAgICAgICAgb25DbGljazogcHJvcHMuYWx0Lm9uQWx0LFxuICAgICAgICAgIH0sIHByb3BzLmFsdC5sYWJlbCksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xuICAgICAgICAgICAgJ2RhdGEtdGVzdGlkJzogJ3BjLWNvbmZpcm0tb2snLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgcGFkZGluZzogJzdweCAxOHB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA1MDAsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHByb3BzLmRhbmdlciA/ICcjZTExZDQ4JyA6ICd2YXIoLS1kc3ctYWxpYXMtYnV0dG9uLWluZm8tZmlsbCwgIzI1NjNlYiknLCBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ29uZmlybSxcbiAgICAgICAgICB9LCBwcm9wcy5jb25maXJtTGFiZWwgPz8gJ1x1Nzg2RVx1OEJBNFx1NTIyMFx1OTY2NCcpLFxuICAgICAgICApLFxuICAgICAgKSxcbiAgICApLFxuICApXG59XG5cbi8qKiBcdTlBQThcdTY3QjZcdTVDMEZcdTUzNjFcdTcyNDdcdTMwMDIgKi9cbmZ1bmN0aW9uIENhcmQocHJvcHM6IHsgdGl0bGU/OiBSZWFjdC5SZWFjdE5vZGU7IGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlIH0pIHtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5jYXJkIH0sXG4gICAgcHJvcHMudGl0bGUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiBzdHlsZXMuc2VjdGlvblRpdGxlIH0sIHByb3BzLnRpdGxlKSxcbiAgICBwcm9wcy5jaGlsZHJlbilcbn1cblxuLyoqXG4gKiBcdTVERTVcdTRGNUNcdTUzRjBcdTRFM0JcdTdFQzRcdTRFRjZcdUZGMUFcdTU2REJcdTk4NzVcdTdCN0VcdUZGMDhcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTRFM0FcdTlFRDhcdThCQTRcdUZGMDkrIFx1OEY2RVx1OEJFMlx1NUJCRlx1NEUzQiBBUEkgKyBcdTYzMDlcdTk0QUVcdTUzMTZcdTY0Q0RcdTRGNUNcdTMwMDJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFdvcmtzcGFjZUZyYW1lKHByb3BzOiBXb3Jrc3BhY2VGcmFtZVByb3BzKSB7XG4gIGNvbnN0IHQgPSBwcm9wcy50ID8/IGZhbGxiYWNrVFxuICBjb25zdCBhY3RpdmVSZWYgPSB1c2VSZWYodHJ1ZSlcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBhY3RpdmVSZWYuY3VycmVudCA9IHRydWVcbiAgICByZXR1cm4gKCkgPT4geyBhY3RpdmVSZWYuY3VycmVudCA9IGZhbHNlIH1cbiAgfSwgW10pXG4gIGNvbnN0IFt0YWIsIHNldFRhYl0gPSB1c2VTdGF0ZTxUYWJLZXk+KCdjb21taXRzJylcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZTxXb3Jrc3BhY2VTdGF0ZSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtsb2FkRXJyb3IsIHNldExvYWRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbYm9vdHN0cmFwcGluZywgc2V0Qm9vdHN0cmFwcGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2FjdGlvblJlc3VsdCwgc2V0QWN0aW9uUmVzdWx0XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtjaGFuZ2VUaXRsZSwgc2V0Q2hhbmdlVGl0bGVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtjaGFuZ2VEZXNjLCBzZXRDaGFuZ2VEZXNjXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbWVtb3J5VGl0bGUsIHNldE1lbW9yeVRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbWVtb3J5Q29udGVudCwgc2V0TWVtb3J5Q29udGVudF0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2NvbmZpcm1lZFRleHQsIHNldENvbmZpcm1lZFRleHRdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtjb25maXJtZWRQYXRocywgc2V0Q29uZmlybWVkUGF0aHNdID0gdXNlU3RhdGUoJycpXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1NzJCNlx1NjAwMSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgW2NvbW1pdHNEYXRhLCBzZXRDb21taXRzRGF0YV0gPSB1c2VTdGF0ZTxDb21taXRzUGF5bG9hZCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtjb21taXRzRXJyb3IsIHNldENvbW1pdHNFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbcGlja2VyT3Blbiwgc2V0UGlja2VyT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW3BpY2tlckZpbHRlciwgc2V0UGlja2VyRmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbc2VsZWN0ZWRUYXJnZXRzLCBzZXRTZWxlY3RlZFRhcmdldHNdID0gdXNlU3RhdGU8c3RyaW5nW10+KFtdKVxuICBjb25zdCBbZGV0YWlscywgc2V0RGV0YWlsc10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBDb21taXREZXRhaWxQYXlsb2FkPj4oe30pXG4gIC8qKiBcdTg5RTNcdThCRkJcdTRFRkJcdTUyQTFcdTcyQjZcdTYwMDFcdUZGMUFxdWV1ZWQ9XHU2MzkyXHU5NjFGXHU3QjQ5XHU0RTMyXHU4ODRDXHU5NjFGXHU1MjE3XHVGRjBDcnVubmluZz1cdTZCNjNcdTU3MjhcdThCRjdcdTZDNDJcdUZGMDhcdTU5MUFcdTkwMDkvXHU2NTc0XHU4RjZFXHU2NUY2XHU4MUVBXHU1MkE4XHU5MDEwXHU0RTJBXHU1MjA2XHU2NzkwXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IFtkZXRhaWxTdGF0dXMsIHNldERldGFpbFN0YXR1c10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCAncXVldWVkJyB8ICdydW5uaW5nJz4+KHt9KVxuICBjb25zdCBkZXRhaWxRdWV1ZWRDb3VudCA9IE9iamVjdC52YWx1ZXMoZGV0YWlsU3RhdHVzKS5maWx0ZXIoKHN0YXR1cykgPT4gc3RhdHVzID09PSAncXVldWVkJykubGVuZ3RoXG4gIGNvbnN0IGRldGFpbFJ1bm5pbmdDb3VudCA9IE9iamVjdC52YWx1ZXMoZGV0YWlsU3RhdHVzKS5maWx0ZXIoKHN0YXR1cykgPT4gc3RhdHVzID09PSAncnVubmluZycpLmxlbmd0aFxuICBjb25zdCBbaW1wYWN0LCBzZXRJbXBhY3RdID0gdXNlU3RhdGU8SW1wYWN0U2NvcGVQYXlsb2FkIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2ltcGFjdExvYWRpbmcsIHNldEltcGFjdExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtyZXZpZXdzLCBzZXRSZXZpZXdzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIFJldmlld1BheWxvYWQ+Pih7fSlcbiAgY29uc3QgW3Jldmlld0xvYWRpbmcsIHNldFJldmlld0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtmaWxlRGlmZnMsIHNldEZpbGVEaWZmc10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+Pih7fSlcbiAgY29uc3QgW2NvbmZpcm1EaWFsb2csIHNldENvbmZpcm1EaWFsb2ddID0gdXNlU3RhdGU8eyB0aXRsZTogc3RyaW5nOyBtZXNzYWdlOiBzdHJpbmc7IGRhbmdlcj86IGJvb2xlYW47IGNvbmZpcm1MYWJlbD86IHN0cmluZzsgYWx0PzogeyBsYWJlbDogc3RyaW5nOyBvbkFsdDogKCkgPT4gdm9pZCB9OyBvbkNvbmZpcm06ICgpID0+IHZvaWQgfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtub3Rlcywgc2V0Tm90ZXNdID0gdXNlU3RhdGU8Tm90ZUVudHJ5W10+KFtdKVxuICBjb25zdCBbbm90ZVRpdGxlLCBzZXROb3RlVGl0bGVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtub3RlQ29udGVudCwgc2V0Tm90ZUNvbnRlbnRdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtub3RlVGFncywgc2V0Tm90ZVRhZ3NdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtlZGl0aW5nTm90ZSwgc2V0RWRpdGluZ05vdGVdID0gdXNlU3RhdGU8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmc7IHRhZ3M6IHN0cmluZyB9IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW25vdGVTZWFyY2gsIHNldE5vdGVTZWFyY2hdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtub3RlRXhwYW5kZWQsIHNldE5vdGVFeHBhbmRlZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oe30pXG4gIGNvbnN0IFtpc3N1ZXNEYXRhLCBzZXRJc3N1ZXNEYXRhXSA9IHVzZVN0YXRlPElzc3VlRW50cnlbXSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtpc3N1ZVNldmVyaXR5RmlsdGVyLCBzZXRJc3N1ZVNldmVyaXR5RmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbaXNzdWVTdGF0dXNGaWx0ZXIsIHNldElzc3VlU3RhdHVzRmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbaXNzdWVFeHBhbmRlZCwgc2V0SXNzdWVFeHBhbmRlZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oe30pXG4gIGNvbnN0IFtmaXhFeHBhbmRlZCwgc2V0Rml4RXhwYW5kZWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KVxuICBjb25zdCBbdmVyaWZ5aW5nVGFyZ2V0LCBzZXRWZXJpZnlpbmdUYXJnZXRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2lzc3VlQ2hlY2tlZCwgc2V0SXNzdWVDaGVja2VkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+Pih7fSlcbiAgY29uc3QgW2JhdGNoVmVyaWZ5U3RhdGUsIHNldEJhdGNoVmVyaWZ5U3RhdGVdID0gdXNlU3RhdGU8eyBkb25lOiBudW1iZXI7IHRvdGFsOiBudW1iZXIgfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFt0cmlhZ2VTdGF0ZSwgc2V0VHJpYWdlU3RhdGVdID0gdXNlU3RhdGU8eyBwcm9jZXNzZWQ6IG51bWJlcjsgcmVtYWluaW5nOiBudW1iZXIgfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IGJhdGNoU3RvcFJlZiA9IHVzZVJlZihmYWxzZSlcbiAgY29uc3QgW2ZpeFRhc2tzLCBzZXRGaXhUYXNrc10gPSB1c2VTdGF0ZTxGaXhUYXNrRW50cnlbXT4oW10pXG4gIGNvbnN0IFtmaXhDb25jdXJyZW5jeSwgc2V0Rml4Q29uY3VycmVuY3ldID0gdXNlU3RhdGUoJzMnKVxuICBjb25zdCBbYWlTdW1tYXJpemluZywgc2V0QWlTdW1tYXJpemluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW25hcnJhdGl2ZSwgc2V0TmFycmF0aXZlXSA9IHVzZVN0YXRlPHsgbmFycmF0aXZlOiBzdHJpbmc7IGNhY2hlZDogYm9vbGVhbjsgZ2VuZXJhdGVkQXQ/OiBudW1iZXI7IGNvc3RVc2Q/OiBudW1iZXIgfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtuYXJyYXRpdmVCdXN5LCBzZXROYXJyYXRpdmVCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbcGVlaywgc2V0UGVla10gPSB1c2VTdGF0ZTx7IHBhdGg6IHN0cmluZzsgbGluZTogbnVtYmVyIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBbcGVla0RhdGEsIHNldFBlZWtEYXRhXSA9IHVzZVN0YXRlPFBlZWtQYXlsb2FkIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3BlZWtCdXN5LCBzZXRQZWVrQnVzeV0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW25hcnJhdGl2ZUVycm9yLCBzZXROYXJyYXRpdmVFcnJvcl0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW21vZGVsVGllcnMsIHNldE1vZGVsVGllcnNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgeyBwcm92aWRlcjogc3RyaW5nOyBtb2RlbDogc3RyaW5nIH0+IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW21vZGVsT3B0aW9ucywgc2V0TW9kZWxPcHRpb25zXSA9IHVzZVN0YXRlPEFycmF5PHsgcHJvdmlkZXI6IHN0cmluZzsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nIH0+PihbXSlcbiAgY29uc3QgW21vZGVsU2F2aW5nLCBzZXRNb2RlbFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW21vZGVsU2F2ZWQsIHNldE1vZGVsU2F2ZWRdID0gdXNlU3RhdGUoZmFsc2UpXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdUZGMUFcdThCQTFcdTUyMTJcdTc4NkVcdThCQTQgLyBSdW4gXHU4QkU2XHU2MEM1IC8gXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExIFx1MjUwMFx1MjUwMFxuICBjb25zdCBbcGxhbkNvbmZpcm0sIHNldFBsYW5Db25maXJtXSA9IHVzZVN0YXRlPHsgY2hhbmdlSWQ6IHN0cmluZzsgc3RlcHM6IFBsYW5Db25maXJtU3RlcFtdIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBbcGxhbkJ1c3ksIHNldFBsYW5CdXN5XSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbcnVuRGV0YWlsLCBzZXRSdW5EZXRhaWxdID0gdXNlU3RhdGU8UnVuRGV0YWlsIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3NjaGVkdWxlZERhdGEsIHNldFNjaGVkdWxlZERhdGFdID0gdXNlU3RhdGU8U2NoZWR1bGVkVGFza0VudHJ5W10gfCBudWxsPihudWxsKVxuICBjb25zdCBbc2NoZWROYW1lLCBzZXRTY2hlZE5hbWVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtzY2hlZE9wZW4sIHNldFNjaGVkT3Blbl0gPSB1c2VTdGF0ZSh0cnVlKVxuICBjb25zdCBbc2NoZWRUeXBlLCBzZXRTY2hlZFR5cGVdID0gdXNlU3RhdGUoJ3JldmlldycpXG4gIGNvbnN0IFtzY2hlZFRpdGxlLCBzZXRTY2hlZFRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbc2NoZWREZXNjLCBzZXRTY2hlZERlc2NdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtzY2hlZEludGVydmFsLCBzZXRTY2hlZEludGVydmFsXSA9IHVzZVN0YXRlKCcxNDQwJylcbiAgLy8gXHUyNTAwXHUyNTAwIFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1RkYxQVx1NTE2OFx1OTFDRlx1NjU3MFx1NjM2RSAvIFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgW21lbW9yaWVzRGF0YSwgc2V0TWVtb3JpZXNEYXRhXSA9IHVzZVN0YXRlPE1lbW9yaWVzUGF5bG9hZCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtzeW5jUmVwb3J0LCBzZXRTeW5jUmVwb3J0XSA9IHVzZVN0YXRlPFN5bmNSZXBvcnQgfCBudWxsPihudWxsKVxuICBjb25zdCBbbWVtb3J5U2NvcGUsIHNldE1lbW9yeVNjb3BlXSA9IHVzZVN0YXRlPCdwcm9qZWN0JyB8ICdicmFuY2gnPigncHJvamVjdCcpXG4gIGNvbnN0IFttZW1vcnlUeXBlLCBzZXRNZW1vcnlUeXBlXSA9IHVzZVN0YXRlKCdhcmNoaXRlY3R1cmVfZGVjaXNpb24nKVxuICBjb25zdCBbbWVtb3J5U3luY2luZywgc2V0TWVtb3J5U3luY2luZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2V4ZWNUaXRsZSwgc2V0RXhlY1RpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbZXhlY01vZGVsLCBzZXRFeGVjTW9kZWxdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtleGVjRGVzYywgc2V0RXhlY0Rlc2NdID0gdXNlU3RhdGUoJycpXG5cbiAgLyoqIFx1N0VERlx1NEUwMCBQT1NUXHVGRjFBXHU1RTI2XHU4RDg1XHU2NUY2XHU1MTVDXHU1RTk1XHVGRjA4TExNIFx1N0FFRlx1NzBCOVx1NjcwRFx1NTJBMVx1N0FFRiAxMjBzIFx1NEYxQVx1OTY0RFx1N0VBN1x1OEZENFx1NTZERVx1RkYwQ1x1NUJBMlx1NjIzN1x1N0FFRiAxODBzIFx1NTNFQVx1NTE1Q1x1NUU5NVx1NzcxRlx1NkI2M1x1NzY4NFx1N0Y1MVx1N0VEQ1x1NEUyRFx1NjVBRFx1RkYwOVx1RkYwQ1x1N0VERFx1NEUwRFx1OEJBOVx1OEJGN1x1NkM0Mlx1NjVFMFx1OTY1MFx1NjMwMlx1OEQ3N1x1MzAwMiAqL1xuICBjb25zdCBwb3N0ID0gYXN5bmMgKHBhdGg6IHN0cmluZywgYm9keTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIHRpbWVvdXRNcyA9IDE4MF8wMDApOiBQcm9taXNlPHsgb2s6IGJvb2xlYW47IGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IH0+ID0+IHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpXG4gICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgdGltZW91dE1zKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHBhdGgsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IC4uLmJvZHksIHNlc3Npb25JZDogcHJvcHMuc2Vzc2lvbklkID8/ICcnIH0pLFxuICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgfSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIHJldHVybiB7IG9rOiByZXNwb25zZS5vaywgZGF0YTogKGRhdGEgPz8ge30pIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+IH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBwZWVrXHVGRjFBXHU2MjUzXHU1RjAwXHU2N0QwXHU2NTg3XHU0RUY2XHU2N0QwXHU4ODRDXHU5NjQ0XHU4RkQxXHU3Njg0XHU0RUUzXHU3ODAxXHU0RTBBXHU0RTBCXHU2NTg3XHU2RDZFXHU1QzQyXHVGRjA4XHU2NzA5XHU3NTRDXHU3QjQ5XHU1Rjg1IDEwIFx1NzlEMlx1RkYwOVx1MzAwMiAqL1xuICBwZWVrT3BlbmVyID0gKHBhdGg6IHN0cmluZywgbGluZTogbnVtYmVyKTogdm9pZCA9PiB7IHZvaWQgb3BlblBlZWsocGF0aCwgbGluZSkgfVxuICBjb25zdCBvcGVuUGVlayA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGxpbmU6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldFBlZWsoeyBwYXRoLCBsaW5lIH0pXG4gICAgc2V0UGVla0RhdGEobnVsbClcbiAgICBzZXRQZWVrQnVzeSh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpXG4gICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCAxMF8wMDApXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9wZWVrJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJywgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcGF0aCwgbGluZSwgc2Vzc2lvbklkOiBwcm9wcy5zZXNzaW9uSWQgPz8gJycgfSksXG4gICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICB9KVxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXRQZWVrRGF0YShkYXRhIGFzIFBlZWtQYXlsb2FkKVxuICAgIH0gY2F0Y2gge1xuICAgICAgc2V0UGVla0RhdGEoeyBleGlzdHM6IGZhbHNlIH0pXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFBlZWtCdXN5KGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTVERTVcdTRGNUNcdThGNkVcdTZCMjFcdTUzRDlcdTRFOEJcdUZGMUFcdTU5MUFcdTRFMkFcdTkwMDlcdTRFMkRcdTYzRDBcdTRFQTRcdTRGNUNcdTRFM0FcdTRFMDBcdTRFMkFcdTY1NzRcdTRGNTNcdTg5RTNcdThCRkJcdUZGMDhcdTdGMTNcdTVCNTggKyBcdTUzRUZcdTVGM0FcdTUyMzZcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgbG9hZE5hcnJhdGl2ZSA9IGFzeW5jIChmb3JjZSA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3Qgc2hhcyA9IHNlbGVjdGVkVGFyZ2V0cy5maWx0ZXIoKHRhcmdldCkgPT4gdGFyZ2V0ICE9PSAnd29ya2luZycpXG4gICAgaWYgKHNoYXMubGVuZ3RoIDwgMikgcmV0dXJuXG4gICAgc2V0TmFycmF0aXZlQnVzeSh0cnVlKVxuICAgIHNldE5hcnJhdGl2ZUVycm9yKCcnKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS93b3JrLW5hcnJhdGl2ZScsIHsgc2hhcywgZm9yY2UgfSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0TmFycmF0aXZlRXJyb3IoU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0TmFycmF0aXZlKHtcbiAgICAgICAgbmFycmF0aXZlOiBTdHJpbmcoZGF0YVsnbmFycmF0aXZlJ10gPz8gJycpLFxuICAgICAgICBjYWNoZWQ6IGRhdGFbJ2NhY2hlZCddID09PSB0cnVlLFxuICAgICAgICBnZW5lcmF0ZWRBdDogZGF0YVsnZ2VuZXJhdGVkQXQnXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogTnVtYmVyKGRhdGFbJ2dlbmVyYXRlZEF0J10pLFxuICAgICAgICBjb3N0VXNkOiBkYXRhWydjb3N0VXNkJ10gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IE51bWJlcihkYXRhWydjb3N0VXNkJ10pLFxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0TmFycmF0aXZlRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXROYXJyYXRpdmVCdXN5KGZhbHNlKVxuICAgIH1cbiAgfVxuICAvLyBcdTdFQ0YgcmVmIFx1NjZCNFx1OTczMlx1NjcwMFx1NjVCMFx1OTVFRFx1NTMwNVx1RkYxQVx1NUU3Nlx1NTNEMVx1NkM2MFx1NjM5Mlx1N0E3QVx1ODlFNlx1NTNEMVx1ODFFQVx1NTJBOFx1NTNEOVx1NEU4Qlx1NjVGNlx1OEJGQlx1NTNENlx1NzY4NFx1NjYyRlx1NjcwMFx1NjVCMCBzZWxlY3RlZFRhcmdldHNcdTMwMDJcbiAgdXNlRWZmZWN0KCgpID0+IHsgbG9hZE5hcnJhdGl2ZVJlZi5jdXJyZW50ID0gKCkgPT4geyB2b2lkIGxvYWROYXJyYXRpdmUoKSB9IH0pXG5cbiAgLyoqIFx1NjI3OVx1OTFDRlx1NTJGRVx1OTAwOVx1NjNEMFx1NEVBNFx1RkYwOFx1NjVCMFx1NTg5RVx1NzY4NFx1OTAxMFx1Njc2MVx1ODlFNlx1NTNEMSBBSSBcdTg5RTNcdThCRkJcdUZGMENcdTVERjJcdTY3MDlcdTc2ODRcdThENzBcdTdGMTNcdTVCNThcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3Qgc2VsZWN0Q29tbWl0cyA9IChzaGFzOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGFkZGVkID0gc2hhcy5maWx0ZXIoKHNoYSkgPT4gIXNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhzaGEpKVxuICAgIHNldFNlbGVjdGVkVGFyZ2V0cygocHJldmlvdXMpID0+IEFycmF5LmZyb20obmV3IFNldChbLi4ucHJldmlvdXMsIC4uLnNoYXNdKSkpXG4gICAgZm9yIChjb25zdCBzaGEgb2YgYWRkZWQpIGxvYWREZXRhaWwoc2hhLCBmYWxzZSlcbiAgfVxuXG4gIC8qKiBcdTRFMDBcdTk1MkVcdTZEODhcdTUzMTZcdUZGMUFcdTkwMDlcdTRFMkRcdTUxNjhcdTkwRThcdTY3MkFcdTZEODhcdTUzMTZcdTYzRDBcdTRFQTQgXHUyMTkyIFx1NjI3OVx1OTFDRlx1ODlFM1x1OEJGQiBcdTIxOTIgXHU2MzkyXHU3QTdBXHU1NDBFXHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwXHU2NTc0XHU0RjUzXHU1M0Q5XHU0RThCXHUzMDAyICovXG4gIGNvbnN0IGRpZ2VzdEFsbCA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBzaGFzID0gKGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKS5maWx0ZXIoKGNvbW1pdCkgPT4gaXNVbmRpZ2VzdGVkKGNvbW1pdCkpLm1hcCgoY29tbWl0KSA9PiBjb21taXQuc2hhKVxuICAgIGlmIChzaGFzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgc2V0SW1wYWN0KG51bGwpXG4gICAgc2V0UmV2aWV3cyh7fSlcbiAgICBjb25zdCBuZWVkc0ZldGNoID0gc2hhcy5zb21lKChzaGEpID0+ICFzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoc2hhKSlcbiAgICBzZWxlY3RDb21taXRzKHNoYXMpXG4gICAgaWYgKG5lZWRzRmV0Y2gpIHtcbiAgICAgIGF1dG9OYXJyYXRpdmVSZWYuY3VycmVudCA9IHNoYXMubGVuZ3RoID49IDJcbiAgICB9IGVsc2UgaWYgKHNoYXMubGVuZ3RoID49IDIpIHtcbiAgICAgIC8vIFx1NTE2OFx1OTBFOFx1NURGMlx1NTcyOFx1OTAwOVx1NEUyRFx1OTZDNlx1NTQwOFx1NEUxNFx1ODlFM1x1OEJGQlx1OTYxRlx1NTIxN1x1N0E3QVx1OTVGMlx1RkYxQVx1NzZGNFx1NjNBNVx1NzUxRlx1NjIxMFx1NTNEOVx1NEU4Qlx1RkYwOFx1N0I0OVx1NEUwMFx1NjJDRFx1OEJBOSBzdGF0ZSBcdTg0M0RcdTU3MzBcdUZGMDlcdTMwMDJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBsb2FkTmFycmF0aXZlUmVmLmN1cnJlbnQoKSB9LCAwKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbW1pdHNSZXF1ZXN0UmVmID0gdXNlUmVmKDApXG4gIGNvbnN0IGxvYWRDb21taXRzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSArK2NvbW1pdHNSZXF1ZXN0UmVmLmN1cnJlbnRcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL3Byb2plY3QtY29udHJvbC9hcGkvY29tbWl0cz9zZXNzaW9uSWQ9JHtlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKX0mbGltaXQ9NjBgKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKChkYXRhIGFzIHsgZXJyb3I/OiBzdHJpbmcgfSkuZXJyb3IgPz8gYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YClcbiAgICAgIGlmICghYWN0aXZlUmVmLmN1cnJlbnQgfHwgcmVxdWVzdCAhPT0gY29tbWl0c1JlcXVlc3RSZWYuY3VycmVudCkgcmV0dXJuXG4gICAgICBzZXRDb21taXRzRGF0YShkYXRhIGFzIENvbW1pdHNQYXlsb2FkKVxuICAgICAgc2V0Q29tbWl0c0Vycm9yKG51bGwpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIGlmICghYWN0aXZlUmVmLmN1cnJlbnQgfHwgcmVxdWVzdCAhPT0gY29tbWl0c1JlcXVlc3RSZWYuY3VycmVudCkgcmV0dXJuXG4gICAgICBzZXRDb21taXRzRGF0YShudWxsKVxuICAgICAgc2V0Q29tbWl0c0Vycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkTm90ZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldE5vdGVzKChkYXRhIGFzIHsgbm90ZXM6IE5vdGVFbnRyeVtdIH0pLm5vdGVzID8/IFtdKVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gXHU3QjE0XHU4QkIwXHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXHVGRjFBXHU1MjE3XHU4ODY4XHU0RkREXHU2MzAxXHU1MzlGXHU2ODM3XHUzMDAyXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NTJGRVx1OTAwOS9cdTUzRDZcdTZEODhcdTRFMDBcdTZCMjFcdTYzRDBcdTRFQTRcdUZGMUFcdTkxQ0RcdTdCOTdcdTkwMDlcdTRFMkRcdTk2QzZcdTU0MDhcdUZGMENcdTVFNzZcdTYzMDlcdTk3MDBcdTg4NjVcdTlGNTBcdTZCQ0ZcdTY3NjFcdTYzRDBcdTRFQTRcdTc2ODQgQUkgXHU4OUUzXHU4QkZCXHVGRjA4XHU2NzBEXHU1MkExXHU3QUVGXHU2NzA5XHU3RjEzXHU1QjU4XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHRvZ2dsZVRhcmdldCA9IGFzeW5jICh0YXJnZXQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldFNlbGVjdGVkVGFyZ2V0cygocHJldmlvdXMpID0+IHtcbiAgICAgIGlmIChwcmV2aW91cy5pbmNsdWRlcyh0YXJnZXQpKSByZXR1cm4gcHJldmlvdXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSB0YXJnZXQpXG4gICAgICByZXR1cm4gWy4uLnByZXZpb3VzLCB0YXJnZXRdXG4gICAgfSlcbiAgICBzZXRJbXBhY3QobnVsbClcbiAgICBzZXRSZXZpZXdzKHt9KVxuICAgIGlmICghc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHRhcmdldCkpIHtcbiAgICAgIGxvYWREZXRhaWwodGFyZ2V0LCBmYWxzZSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU2NTc0XHU4RjZFXHU5MDA5XHU2MkU5XHVGRjFBXHU2NTc0XHU4RjZFXHU1REYyXHU5MDA5XHU2NUY2XHU1MThEXHU3MEI5ID0gXHU1M0Q2XHU2RDg4XHU2NTc0XHU4RjZFXHVGRjFCXHU2NUIwXHU1MkZFXHU5MDA5XHU3Njg0XHU2M0QwXHU0RUE0XHU1NDA0XHU4MUVBXHU2MkM5XHU1M0Q2IEFJIFx1ODlFM1x1OEJGQlx1MzAwMiAqL1xuICBjb25zdCBzZWxlY3RSb3VuZCA9IChzaGFzOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICAgIHNldEltcGFjdChudWxsKVxuICAgIHNldFJldmlld3Moe30pXG4gICAgaWYgKHNoYXMuZXZlcnkoKHNoYSkgPT4gc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHNoYSkpKSB7XG4gICAgICBzZXRTZWxlY3RlZFRhcmdldHMoKHByZXZpb3VzKSA9PiBwcmV2aW91cy5maWx0ZXIoKHNoYSkgPT4gIXNoYXMuaW5jbHVkZXMoc2hhKSkpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgYWRkZWQgPSBzaGFzLmZpbHRlcigoc2hhKSA9PiAhc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHNoYSkpXG4gICAgc2V0U2VsZWN0ZWRUYXJnZXRzKChwcmV2aW91cykgPT4gQXJyYXkuZnJvbShuZXcgU2V0KFsuLi5wcmV2aW91cywgLi4uc2hhc10pKSlcbiAgICBmb3IgKGNvbnN0IHNoYSBvZiBhZGRlZCkgbG9hZERldGFpbChzaGEsIGZhbHNlKVxuICB9XG5cbiAgLyoqIFx1ODlFM1x1OEJGQlx1NUU3Nlx1NTNEMVx1NkM2MFx1RkYxQVx1NkEyMVx1NTc4Qlx1N0Y1MVx1NTE3M1x1NUU3Nlx1NTNEMVx1NjcwOVx1OTY1MFx1RkYwQ1x1NTkxQVx1OTAwOS9cdTY1NzRcdThGNkVcdTYyNzlcdTkxQ0ZcdTUyRkVcdTkwMDlcdTY1RjZcdTYzMDlcdTRFMEFcdTk2NTBcdTVFNzZcdTUzRDFcdTUyMDZcdTY3OTBcdUZGMDhcdTlFRDhcdThCQTRcdTY3MDBcdTU5MUEgMyBcdTRFMkFcdTU0MENcdTY1RjZcdUZGMDlcdUZGMENcdThEODVcdTUxRkFcdTc2ODRcdTYzOTJcdTk2MUZcdTdCNDlcdTVGODVcdTVFNzZcdTY2M0VcdTc5M0FcdTk2MUZcdTUyMTdcdTY1NzBcdTMwMDIgKi9cbiAgY29uc3QgTUFYX0RFVEFJTF9DT05DVVJSRU5DWSA9IDNcbiAgY29uc3QgZGV0YWlsUG9vbFJlZiA9IHVzZVJlZjx7IHBlbmRpbmc6IEFycmF5PHsgdGFyZ2V0OiBzdHJpbmc7IGZvcmNlOiBib29sZWFuIH0+OyBhY3RpdmU6IG51bWJlciB9Pih7IHBlbmRpbmc6IFtdLCBhY3RpdmU6IDAgfSlcbiAgY29uc3QgZGV0YWlsSW5GbGlnaHRSZWYgPSB1c2VSZWYobmV3IFNldDxzdHJpbmc+KCkpXG4gIC8qKiBcdTRFMDBcdTk1MkVcdTZEODhcdTUzMTZcdUZGMUFcdTUxNjhcdTkwRThcdTg5RTNcdThCRkJcdThERDFcdTVCOENcdTU0MEVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdTY1NzRcdTRGNTNcdTUzRDlcdTRFOEJcdUZGMDhcdTdFQ0YgcmVmIFx1NTNENlx1NjcwMFx1NjVCMFx1OTVFRFx1NTMwNVx1RkYwQ1x1OTA3Rlx1NTE0RCBzZWxlY3RlZFRhcmdldHMgXHU4RkM3XHU2NzFGXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGF1dG9OYXJyYXRpdmVSZWYgPSB1c2VSZWYoZmFsc2UpXG4gIGNvbnN0IGxvYWROYXJyYXRpdmVSZWYgPSB1c2VSZWY8KCkgPT4gdm9pZD4oKCkgPT4ge30pXG5cbiAgY29uc3QgcHVtcERldGFpbFBvb2wgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgcG9vbCA9IGRldGFpbFBvb2xSZWYuY3VycmVudFxuICAgIGlmIChwb29sLmFjdGl2ZSA9PT0gMCAmJiBwb29sLnBlbmRpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICBpZiAoYXV0b05hcnJhdGl2ZVJlZi5jdXJyZW50ICYmIGFjdGl2ZVJlZi5jdXJyZW50KSB7XG4gICAgICAgIGF1dG9OYXJyYXRpdmVSZWYuY3VycmVudCA9IGZhbHNlXG4gICAgICAgIGxvYWROYXJyYXRpdmVSZWYuY3VycmVudCgpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgd2hpbGUgKGFjdGl2ZVJlZi5jdXJyZW50ICYmIHBvb2wuYWN0aXZlIDwgTUFYX0RFVEFJTF9DT05DVVJSRU5DWSAmJiBwb29sLnBlbmRpbmcubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3Qgam9iID0gcG9vbC5wZW5kaW5nLnNoaWZ0KCkhXG4gICAgICBwb29sLmFjdGl2ZSArPSAxXG4gICAgICB2b2lkIGxvYWREZXRhaWxPbmNlKGpvYi50YXJnZXQsIGpvYi5mb3JjZSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHt9KVxuICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgcG9vbC5hY3RpdmUgLT0gMVxuICAgICAgICAgIHB1bXBEZXRhaWxQb29sKClcbiAgICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkRGV0YWlsID0gKHRhcmdldDogc3RyaW5nLCBmb3JjZTogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIGlmIChkZXRhaWxJbkZsaWdodFJlZi5jdXJyZW50Lmhhcyh0YXJnZXQpKSByZXR1cm5cbiAgICBkZXRhaWxJbkZsaWdodFJlZi5jdXJyZW50LmFkZCh0YXJnZXQpXG4gICAgc2V0RGV0YWlsU3RhdHVzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFt0YXJnZXRdOiAncXVldWVkJyB9KSlcbiAgICBkZXRhaWxQb29sUmVmLmN1cnJlbnQucGVuZGluZy5wdXNoKHsgdGFyZ2V0LCBmb3JjZSB9KVxuICAgIHB1bXBEZXRhaWxQb29sKClcbiAgfVxuXG4gIC8qKiBcdTk2MUZcdTUyMTdcdTRFRkJcdTUyQTFcdTRGNTNcdUZGMUFcdTc3MUZcdTZCNjNcdTUzRDFcdThENzdcdTg5RTNcdThCRkJcdThCRjdcdTZDNDJcdUZGMUJcdTRFRkJcdTRGNTVcdTU5MzFcdThEMjVcdUZGMDhcdTdGNTFcdTdFRENcdTRFMkRcdTY1QUQvXHU4RDg1XHU2NUY2L1x1NjcwRFx1NTJBMVx1NjcyQVx1OEZEMFx1ODg0Q1x1RkYwOVx1OTBGRFx1NTE5OVx1NTE2NVx1NTM2MVx1NzI0N1x1OTUxOVx1OEJFRlx1NTM2MFx1NEY0RFx1RkYwQ1x1N0VERFx1NEUwRFx1NjVFMFx1OTY1MFx1OEY2Q1x1NTcwOFx1MzAwMiAqL1xuICBjb25zdCBsb2FkRGV0YWlsT25jZSA9IGFzeW5jICh0YXJnZXQ6IHN0cmluZywgZm9yY2U6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXREZXRhaWxTdGF0dXMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW3RhcmdldF06ICdydW5uaW5nJyB9KSlcbiAgICBjb25zdCBmYWlsUGxhY2Vob2xkZXIgPSAobWVzc2FnZTogc3RyaW5nKTogQ29tbWl0RGV0YWlsUGF5bG9hZCA9PlxuICAgICAgKHtcbiAgICAgICAgc2hhOiB0YXJnZXQsXG4gICAgICAgIGlzV29ya2luZzogdGFyZ2V0ID09PSAnd29ya2luZycsXG4gICAgICAgIGZpbGVzOiBbXSxcbiAgICAgICAgaW5zZXJ0aW9uczogMCxcbiAgICAgICAgZGVsZXRpb25zOiAwLFxuICAgICAgICBwYXRjaFRydW5jYXRlZDogZmFsc2UsXG4gICAgICAgIHBhdGNoOiAnJyxcbiAgICAgICAgY29tbWl0OiBudWxsLFxuICAgICAgICBhbmFseXNpczogeyB3aGF0OiBtZXNzYWdlLCBsb2dpYzogW10sIHJpc2tzOiBbXSB9LFxuICAgICAgfSkgYXMgdW5rbm93biBhcyBDb21taXREZXRhaWxQYXlsb2FkXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbW1pdC1kZXRhaWwnLCB7IHNoYTogdGFyZ2V0LCBmb3JjZSB9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHtcbiAgICAgICAgICAuLi5wcmV2aW91cyxcbiAgICAgICAgICBbdGFyZ2V0XTogZmFpbFBsYWNlaG9sZGVyKCdBSSBcdTg5RTNcdThCRkJcdTU5MzFcdThEMjVcdUZGMUEnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJycpICsgJ1x1RkYwOFx1NzBCOVx1MzAwQ1x1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1MzAwRFx1NTNFRlx1OTFDRFx1OEJENVx1RkYwOScpLFxuICAgICAgICB9KSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFt0YXJnZXRdOiBkYXRhIGFzIHVua25vd24gYXMgQ29tbWl0RGV0YWlsUGF5bG9hZCB9KSlcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgY29uc3QgcmVhc29uID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpXG4gICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHtcbiAgICAgICAgLi4ucHJldmlvdXMsXG4gICAgICAgIFt0YXJnZXRdOiBmYWlsUGxhY2Vob2xkZXIoYEFJIFx1ODlFM1x1OEJGQlx1NTkzMVx1OEQyNVx1RkYxQSR7cmVhc29uID09PSAnVGhlIHVzZXIgYWJvcnRlZCBhIHJlcXVlc3QuJyA/ICdcdThCRjdcdTZDNDJcdThEODVcdTY1RjZcdTYyMTZcdTY3MERcdTUyQTFcdTRFMkRcdTY1QUQnIDogcmVhc29ufVx1RkYwOFx1NjhDMFx1NjdFNSBkc2ggXHU2NjJGXHU1NDI2XHU1NzI4XHU4RkQwXHU4ODRDXHVGRjFCXHU3MEI5XHUzMDBDXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwXHUzMDBEXHU1M0VGXHU5MUNEXHU4QkQ1XHVGRjA5YCksXG4gICAgICB9KSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgZGV0YWlsSW5GbGlnaHRSZWYuY3VycmVudC5kZWxldGUodGFyZ2V0KVxuICAgICAgc2V0RGV0YWlsU3RhdHVzKChwcmV2aW91cykgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9XG4gICAgICAgIGRlbGV0ZSBuZXh0W3RhcmdldF1cbiAgICAgICAgcmV0dXJuIG5leHRcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZEltcGFjdCA9IGFzeW5jIChmb3JjZSA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDApIHJldHVyblxuICAgIHNldEltcGFjdExvYWRpbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaW1wYWN0LXNjb3BlJywgeyBzaGFzOiBzZWxlY3RlZFRhcmdldHMsIGZvcmNlIH0pXG4gICAgICBzZXRJbXBhY3Qob2sgPyAoZGF0YSBhcyB1bmtub3duIGFzIEltcGFjdFNjb3BlUGF5bG9hZCkgOiBudWxsKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJbXBhY3RMb2FkaW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWRSZXZpZXdzID0gYXN5bmMgKGZvcmNlID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoc2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgc2V0UmV2aWV3TG9hZGluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBzZWxlY3RlZFRhcmdldHMpIHtcbiAgICAgICAgaWYgKCFhY3RpdmVSZWYuY3VycmVudCkgYnJlYWtcbiAgICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcmV2aWV3JywgeyBzaGE6IHRhcmdldCwgZm9yY2UgfSlcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGRhdGEgYXMgdW5rbm93biBhcyBSZXZpZXdQYXlsb2FkXG4gICAgICAgIHNldFJldmlld3MoKHByZXZpb3VzKSA9PiAoe1xuICAgICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICAgIFt0YXJnZXRdOiBvayA/IHBheWxvYWQgOiB7XG4gICAgICAgICAgICBpc3N1ZXNGb3VuZDogMCxcbiAgICAgICAgICAgIGlzc3VlczogJycsXG4gICAgICAgICAgICB2ZXJkaWN0OiAnXHU4QkM0XHU1QkExXHU1OTMxXHU4RDI1XHVGRjFBJyArIFN0cmluZyhwYXlsb2FkWydlcnJvciddID8/ICcnKSArICdcdUZGMDhcdTUzRUZcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdTkxQ0RcdThCRDVcdUZGMDknLFxuICAgICAgICAgICAgaXNzdWVMaXN0OiBbXSxcbiAgICAgICAgICAgIGNhY2hlZDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSkpXG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFJldmlld0xvYWRpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZEZpbGVEaWZmID0gYXN5bmMgKHNoYTogc3RyaW5nLCBwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBrZXkgPSBgJHtzaGF9fCR7cGF0aH1gXG4gICAgaWYgKGZpbGVEaWZmc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNldEZpbGVEaWZmcygocHJldmlvdXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfVxuICAgICAgICBkZWxldGUgbmV4dFtrZXldXG4gICAgICAgIHJldHVybiBuZXh0XG4gICAgICB9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvZmlsZS1kaWZmJywgeyBzaGEsIHBhdGggfSlcbiAgICBzZXRGaWxlRGlmZnMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW2tleV06IFN0cmluZyhkYXRhWydwYXRjaCddID8/ICcnKSB9KSlcbiAgfVxuXG4gIGNvbnN0IGxvYWRJc3N1ZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcz9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgLy8gXHU4RjZFXHU4QkUyXHU1MjM3XHU2NUIwXHU0RTBEXHU2RTA1XHU3QTdBXHU1MkZFXHU5MDA5XHVGRjFBXHU1MkZFXHU5MDA5XHU5NTJFXHU5NjhGXHU5NUVFXHU5ODk4IGlkIFx1OEQ3MFx1RkYwQ1x1NURGMlx1NkQ4OFx1NTkzMVx1NzY4NCBpZCBcdTRFMERcdTVGNzFcdTU0Q0RcdTY2M0VcdTc5M0FcdTMwMDJcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0SXNzdWVzRGF0YSgoZGF0YSBhcyB7IGlzc3VlczogSXNzdWVFbnRyeVtdIH0pLmlzc3VlcyA/PyBbXSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1OTVFRVx1OTg5OFx1NTIxN1x1ODg2OFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2Mlx1RkYxQVx1NTIxN1x1ODg2OFx1NEZERFx1NjMwMVx1NTM5Rlx1NjgzN1x1MzAwMlxuICAgIH1cbiAgfVxuXG4gIC8vIFJldmlldyBcdTk4NzVcdTdCN0VcdTVCOUVcdTY1RjZcdTU0MENcdTZCNjVcdUZGMUFcdTRGRUVcdTU5MERcdTVCNTBcdTRFRTNcdTc0MDZcdTU2REVcdTUxOTlcdTcyQjZcdTYwMDFcdTU0MEVcdUZGMENcdTc3MEJcdTY3N0YgNCBcdTc5RDJcdTUxODVcdThEREZcdTRFMEFcdTMwMDJcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodGFiICE9PSAncmV2aWV3JykgcmV0dXJuXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IHZvaWQgbG9hZElzc3VlcygpOyB2b2lkIGxvYWRGaXhTdGF0dXMoKSB9LCA0MDAwKVxuICAgIHJldHVybiAoKSA9PiB7IGNsZWFySW50ZXJ2YWwodGltZXIpIH1cbiAgfSwgW3RhYiwgcHJvcHMuc2Vzc2lvbklkXSlcblxuICAvKiogXHU2MkM5XHU1M0Q2XHU0RkVFXHU1OTBEXHU2RDNFXHU1M0QxXHU0RUZCXHU1MkExXHU3MkI2XHU2MDAxXHVGRjA4UmV2aWV3IFx1OTg3NVx1OEY2RVx1OEJFMlx1RkYxQlx1NjcwOVx1NkQzQlx1NTJBOFx1NEVGQlx1NTJBMVx1NjVGNlx1OUE3MVx1NTJBOFx1NTIzN1x1NjVCMFx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBsb2FkRml4U3RhdHVzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9maXgvc3RhdHVzP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgICBzZXRGaXhUYXNrcygoZGF0YSBhcyB7IHRhc2tzOiBGaXhUYXNrRW50cnlbXSB9KS50YXNrcyA/PyBbXSlcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1NzJCNlx1NjAwMVx1NjJDOVx1NTNENlx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2Mlx1MzAwMlxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTZEM0VcdTUzRDFcdTRGRUVcdTU5MERcdUZGMUFwbGFuSWRzPVx1NjI3OVx1NTFDNlx1NzY4NFx1NUY4NVx1OEJDNFx1NUJBMVx1NjVCOVx1Njg0OFx1RkYxQmlzc3VlSWRzPVx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1RkYwOG1vZGU9Zml4IFx1NEZFRVx1NTkwRCAvIHBsYW4gXHU1M0VBXHU4QkZCXHU1MUZBXHU2NUI5XHU2ODQ4XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGRpc3BhdGNoRml4ID0gYXN5bmMgKHBsYW5JZHM6IHN0cmluZ1tdLCBpc3N1ZUlkczogc3RyaW5nW10sIG1vZGU6ICdmaXgnIHwgJ3BsYW4nID0gJ2ZpeCcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAocGxhbklkcy5sZW5ndGggPT09IDAgJiYgaXNzdWVJZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgdCgnZml4LmRpc3BhdGNoRW1wdHknKSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9maXgvZGlzcGF0Y2gnLCB7IHBsYW5JZHMsIGlzc3VlSWRzLCBtb2RlIH0pXG4gICAgaWYgKG9rKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgnZml4LmRpc3BhdGNoRG9uZScpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhkYXRhWydhY2NlcHRlZCddID8/IDApKS5yZXBsYWNlKCd7Y30nLCBTdHJpbmcoZGF0YVsnY29uY3VycmVuY3knXSA/PyAzKSkpXG4gICAgICBhd2FpdCBsb2FkRml4U3RhdHVzKClcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTUwNUNcdTZCNjJcdTRGRUVcdTU5MERcdTZEM0VcdTUzRDFcdUZGMUFcdTUzRDZcdTZEODhcdTYzOTJcdTk2MUZcdTRFMEVcdThGRDBcdTg4NENcdTRFMkRcdTc2ODRcdTRFRkJcdTUyQTFcdTMwMDIgKi9cbiAgY29uc3QgY2FuY2VsRml4ID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2ZpeC9jYW5jZWwnLCB7fSlcbiAgICBpZiAob2spIHNldEFjdGlvblJlc3VsdCgnXHUyM0Y5ICcgKyB0KCdmaXguc3RvcERvbmUnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoZGF0YVsnc3RvcHBlZCddID8/IDApKSlcbiAgICBhd2FpdCBsb2FkRml4U3RhdHVzKClcbiAgfVxuXG4gIC8qKiBcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTVCRkNcdTUxRkFcdTRFM0EgTWFya2Rvd25cdUZGMDhcdTYzMDlcdTRFMjVcdTkxQ0RcdTVFQTZcdTYzOTJcdTVFOEZcdUZGMUJcdTU5MERcdTc1MjhcdTdCMTRcdThCQjBcdTVCRkNcdTUxRkFcdTc2ODRcdTRFMEJcdThGN0RcdTY1QjlcdTVGMEZcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgZXhwb3J0SXNzdWVzTWQgPSAoaXNzdWVzOiBJc3N1ZUVudHJ5W10pOiB2b2lkID0+IHtcbiAgICBpZiAoaXNzdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIHQoJ3Jldmlldy5leHBvcnRFbXB0eScpKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHNldmVyaXR5T3JkZXI6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7IGJsb2NrZXI6IDAsIGNyaXRpY2FsOiAxLCBtYWpvcjogMiwgbWlub3I6IDMsIGluZm86IDQgfVxuICAgIGNvbnN0IG9yZGVyZWQgPSBbLi4uaXNzdWVzXS5zb3J0KChsZWZ0LCByaWdodCkgPT5cbiAgICAgIChzZXZlcml0eU9yZGVyW25vcm1hbGl6ZUlzc3VlU2V2ZXJpdHkobGVmdC5zZXZlcml0eSldID8/IDkpIC0gKHNldmVyaXR5T3JkZXJbbm9ybWFsaXplSXNzdWVTZXZlcml0eShyaWdodC5zZXZlcml0eSldID8/IDkpXG4gICAgICB8fCBsZWZ0LmNyZWF0ZWRBdCAtIHJpZ2h0LmNyZWF0ZWRBdClcbiAgICBjb25zdCBsaW5lczogc3RyaW5nW10gPSBbXG4gICAgICAnIyBSZXZpZXcgXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1JyxcbiAgICAgICcnLFxuICAgICAgYC0gXHU5ODc5XHU3NkVFXHVGRjFBJHtzdGF0ZT8ucHJvamVjdD8ubmFtZSA/PyAnXHUyMDE0J31gLFxuICAgICAgYC0gXHU0RUQzXHU1RTkzXHVGRjFBJHtjb21taXRzRGF0YT8ucm9vdFBhdGggPz8gc3RhdGU/LnByb2plY3Q/LnJvb3RQYXRoID8/ICdcdTIwMTQnfWAsXG4gICAgICBgLSBcdTUyMDZcdTY1MkZcdUZGMUEke2NvbW1pdHNEYXRhPy5icmFuY2ggPz8gJ1x1MjAxNCd9YCxcbiAgICAgIGAtIFx1NUJGQ1x1NTFGQVx1NjVGNlx1OTVGNFx1RkYxQSR7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfWAsXG4gICAgICBgLSBcdTY1NzBcdTkxQ0ZcdUZGMUEke2lzc3Vlcy5sZW5ndGh9XHVGRjA4XHU1Rjg1XHU1OTA0XHU3NDA2ICR7aXNzdWVzLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpLmxlbmd0aH1cdUZGMDlgLFxuICAgICAgJycsXG4gICAgXVxuICAgIG9yZGVyZWQuZm9yRWFjaCgoaXNzdWUsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBpc3N1ZS5jaGFuZ2VJZC5zdGFydHNXaXRoKCdyZXZpZXc6JykgJiYgaXNzdWUuY2hhbmdlSWQgIT09ICdyZXZpZXc6d29ya3RyZWUnXG4gICAgICAgID8gYFx1NjNEMFx1NEVBNCAke2lzc3VlLmNoYW5nZUlkLnNsaWNlKCdyZXZpZXc6Jy5sZW5ndGgsICdyZXZpZXc6Jy5sZW5ndGggKyA4KX1gXG4gICAgICAgIDogaXNzdWUuY2hhbmdlSWQgPT09ICdyZXZpZXc6d29ya3RyZWUnID8gJ1x1NURFNVx1NEY1Q1x1NTMzQScgOiBpc3N1ZS5jaGFuZ2VJZFxuICAgICAgbGluZXMucHVzaChgIyMgJHtpbmRleCArIDF9LiBbJHtpc3N1ZS5zZXZlcml0eX1dWyR7aXNzdWUuY2F0ZWdvcnkgfHwgJ2dlbmVyYWwnfV0gJHtpc3N1ZS50aXRsZX1gKVxuICAgICAgbGluZXMucHVzaCgnJylcbiAgICAgIGxpbmVzLnB1c2goYC0gXHU3MkI2XHU2MDAxXHVGRjFBJHtJU1NVRV9TVEFUVVNfTEFCRUxTW2lzc3VlLnN0YXR1c10gPz8gaXNzdWUuc3RhdHVzfWApXG4gICAgICBsaW5lcy5wdXNoKGAtIFx1NUJGOVx1OEM2MVx1RkYxQSR7dGFyZ2V0fWApXG4gICAgICBsaW5lcy5wdXNoKGAtIFx1NTNEMVx1NzNCMFx1NjVGNlx1OTVGNFx1RkYxQSR7bmV3IERhdGUoaXNzdWUuY3JlYXRlZEF0KS50b0xvY2FsZVN0cmluZygpfWApXG4gICAgICBpZiAoKGlzc3VlLmRlc2NyaXB0aW9uID8/ICcnKSAhPT0gJycpIGxpbmVzLnB1c2goYC0gXHU2M0NGXHU4RkYwXHVGRjFBJHtpc3N1ZS5kZXNjcmlwdGlvbiEucmVwbGFjZSgvXFxuL2csICcgJyl9YClcbiAgICAgIGlmICgoaXNzdWUucmVzb2x1dGlvbiA/PyAnJykgIT09ICcnKSBsaW5lcy5wdXNoKGAtIFx1N0VEM1x1OEJCQVx1RkYxQSR7aXNzdWUucmVzb2x1dGlvbn1gKVxuICAgICAgbGluZXMucHVzaCgnJylcbiAgICB9KVxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbbGluZXMuam9pbignXFxuJyldLCB7IHR5cGU6ICd0ZXh0L21hcmtkb3duO2NoYXJzZXQ9dXRmLTgnIH0pXG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxuICAgIGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgIGFuY2hvci5ocmVmID0gdXJsXG4gICAgYW5jaG9yLmRvd25sb2FkID0gYHJldmlldy1pc3N1ZXMtJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApfS5tZGBcbiAgICBhbmNob3IuY2xpY2soKVxuICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKVxuICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzICcgKyB0KCdub3Rlcy5leHBvcnREb25lJykpXG4gIH1cblxuICAvKiogXHU2Mjc5XHU5MUNGXHU2ODA3XHU4QkIwXHU1REYyXHU1OTA0XHU3NDA2XHVGRjA4YWNjZXB0ZWRcdUZGMDlcdUZGMUFcdTRFQkFcdTVERTVcdTc4NkVcdThCQTRcdTY1RTBcdTk3MDBcdTkwMTBcdTY3NjFcdTU5MERcdTY4QzBcdTY1RjZcdTc2RjRcdTYzQTVcdTdFRDNcdTY4NDhcdTMwMDIgKi9cbiAgY29uc3QgbWFya0lzc3Vlc0hhbmRsZWQgPSBhc3luYyAoaWRzOiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCBkb25lID0gMFxuICAgIGZvciAoY29uc3QgaWQgb2YgaWRzKSB7XG4gICAgICBjb25zdCB7IG9rIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXMvc3RhdHVzJywgeyBpZCwgc3RhdHVzOiAnYWNjZXB0ZWQnIH0pXG4gICAgICBpZiAob2spIGRvbmUgKz0gMVxuICAgIH1cbiAgICBhd2FpdCBsb2FkSXNzdWVzKClcbiAgICBpZiAoZG9uZSA+IDApIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzICcgKyB0KCdyZXZpZXcuaGFuZGxlZERvbmUnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoZG9uZSkpKVxuICB9XG5cbiAgLyoqIFx1NjI3OVx1OTFDRlx1NTkwRFx1NjhDMFx1RkYxQVx1NUJGOVx1OTAwOVx1NEUyRFx1NzY4NFx1OEJDNFx1NUJBMVx1NzZFRVx1NjgwN1x1OTAxMFx1NEUyQVx1OEREMVx1NTkwRFx1NjhDMFx1RkYwOFx1NEUzMlx1ODg0QyBMTE1cdUZGMDlcdUZGMENcdTVCOUVcdTY1RjZcdThGREJcdTVFQTZcdTMwMDFcdTUzRUZcdTRFMkRcdTkwMTRcdTUwNUNcdTZCNjJcdTMwMDIgKi9cbiAgY29uc3QgcnVuQmF0Y2hWZXJpZnkgPSBhc3luYyAodGFyZ2V0czogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAodGFyZ2V0cy5sZW5ndGggPT09IDApIHJldHVyblxuICAgIGJhdGNoU3RvcFJlZi5jdXJyZW50ID0gZmFsc2VcbiAgICBzZXRCYXRjaFZlcmlmeVN0YXRlKHsgZG9uZTogMCwgdG90YWw6IHRhcmdldHMubGVuZ3RoIH0pXG4gICAgbGV0IHJlc29sdmVkVG90YWwgPSAwXG4gICAgbGV0IG9wZW5Ub3RhbCA9IDBcbiAgICBsZXQgbmV3VG90YWwgPSAwXG4gICAgbGV0IGZhaWxlZCA9IDBcbiAgICBmb3IgKGNvbnN0IFtpbmRleCwgdGFyZ2V0XSBvZiB0YXJnZXRzLmVudHJpZXMoKSkge1xuICAgICAgaWYgKGJhdGNoU3RvcFJlZi5jdXJyZW50KSBicmVha1xuICAgICAgc2V0QmF0Y2hWZXJpZnlTdGF0ZSh7IGRvbmU6IGluZGV4LCB0b3RhbDogdGFyZ2V0cy5sZW5ndGggfSlcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcy92ZXJpZnknLCB7IHRhcmdldCB9KVxuICAgICAgICBpZiAoIW9rKSBmYWlsZWQgKz0gMVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlZFRvdGFsICs9ICgoZGF0YVsncmVzb2x2ZWQnXSBhcyB1bmtub3duW10pID8/IFtdKS5sZW5ndGhcbiAgICAgICAgICBvcGVuVG90YWwgKz0gKChkYXRhWydzdGlsbE9wZW4nXSBhcyB1bmtub3duW10pID8/IFtdKS5sZW5ndGhcbiAgICAgICAgICBuZXdUb3RhbCArPSAoKGRhdGFbJ25ld0lzc3VlcyddIGFzIHVua25vd25bXSkgPz8gW10pLmxlbmd0aFxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgZmFpbGVkICs9IDFcbiAgICAgIH1cbiAgICB9XG4gICAgc2V0QmF0Y2hWZXJpZnlTdGF0ZShudWxsKVxuICAgIGF3YWl0IGxvYWRJc3N1ZXMoKVxuICAgIGlmIChiYXRjaFN0b3BSZWYuY3VycmVudCkgc2V0QWN0aW9uUmVzdWx0KCdcdTIzRjkgJyArIHQoJ3Jldmlldy5iYXRjaFN0b3BwZWQnKSlcbiAgICBlbHNlIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzICcgKyB0KCdyZXZpZXcuYmF0Y2hEb25lJykucmVwbGFjZSgne2F9JywgU3RyaW5nKHJlc29sdmVkVG90YWwpKS5yZXBsYWNlKCd7Yn0nLCBTdHJpbmcob3BlblRvdGFsKSkucmVwbGFjZSgne2N9JywgU3RyaW5nKG5ld1RvdGFsKSkucmVwbGFjZSgne2R9JywgU3RyaW5nKGZhaWxlZCkpKVxuICB9XG5cbiAgLyoqIFx1NjU3NFx1NEY1M1x1NTIwNlx1OEJDQVx1RkYxQVx1NUZBQVx1NzNBRlx1OEMwM1x1NzUyOCAvaXNzdWVzL3RyaWFnZSBcdTc2RjRcdTgxRjMgZG9uZVx1RkYwOFx1NkJDRlx1NjI3OSA9IFx1NjcwRFx1NTJBMVx1N0FFRlwib3BlbiBcdTRFMTRcdTY3MkNcdThGNkVcdTY3MkFcdTkwMDFcdTVCQTFcIlx1NzY4NFx1NTI0RCBOIFx1Njc2MVx1RkYwOVx1RkYwQ1xuICAgKiBcdTUyMjRcdTVCOUFcdTUzNzNcdTY1RjZcdTUxNzNcdTk1RURcdTMwMDFcdTUzRUZcdTUwNUNcdTZCNjJcdTUzRUZcdTdFRURcdThERDFcdUZGMDhcdTY3MERcdTUyQTFcdTdBRUYgc2VlbiBcdThCQjBcdTVGQzZcdTk2MzJcdTkxQ0RcdTU5MERcdTZEODhcdTgwMTdcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgcnVuVHJpYWdlID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGJhdGNoU3RvcFJlZi5jdXJyZW50ID0gZmFsc2VcbiAgICAvLyByZW1haW5pbmc9LTEgPSBcdTVDMUFcdTY3MkFcdTYyRkZcdTUyMzBcdTk5OTZcdTYyNzlcdTU0Q0RcdTVFOTRcdUZGMDhcdTY2M0VcdTc5M0EgXHUyMDI2IFx1ODAwQ1x1NEUwRFx1NjYyRlx1OEJFRlx1NUJGQ1x1NjAyN1x1NzY4NCAwXHVGRjA5XHUzMDAyXG4gICAgc2V0VHJpYWdlU3RhdGUoeyBwcm9jZXNzZWQ6IDAsIHJlbWFpbmluZzogLTEgfSlcbiAgICBjb25zdCBjbG9zZWQgPSB7IGR1cGxpY2F0ZTogMCwgb2Jzb2xldGU6IDAsIGZhbHNlX3Bvc2l0aXZlOiAwIH1cbiAgICBsZXQga2VwdCA9IDBcbiAgICBsZXQgcHJvY2Vzc2VkID0gMFxuICAgIGxldCBwYXJzZUZhaWxlZCA9IGZhbHNlXG4gICAgbGV0IHN0b3BwZWQgPSBmYWxzZVxuICAgIGxldCBmaXJzdCA9IHRydWVcbiAgICBmb3IgKDs7KSB7XG4gICAgICBpZiAoYmF0Y2hTdG9wUmVmLmN1cnJlbnQpIHsgc3RvcHBlZCA9IHRydWU7IGJyZWFrIH1cbiAgICAgIGxldCBvdXRjb21lOiB7IG9rOiBib29sZWFuOyBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB9XG4gICAgICB0cnkge1xuICAgICAgICBvdXRjb21lID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaXNzdWVzL3RyaWFnZScsIHsgc2Vzc2lvbklkOiBwcm9wcy5zZXNzaW9uSWQgPz8gJycsIC4uLihmaXJzdCA/IHsgcmVzZXQ6IHRydWUgfSA6IHt9KSB9KVxuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIG91dGNvbWUgPSB7IG9rOiBmYWxzZSwgZGF0YTogeyBlcnJvcjogJ25ldHdvcmsgZXJyb3InIH0gfVxuICAgICAgfVxuICAgICAgZmlyc3QgPSBmYWxzZVxuICAgICAgaWYgKCFvdXRjb21lLm9rKSB7IHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcob3V0Y29tZS5kYXRhWydlcnJvciddID8/ICdlcnJvcicpKTsgYnJlYWsgfVxuICAgICAgY29uc3QgZGF0YSA9IG91dGNvbWUuZGF0YVxuICAgICAgLy8gXHU1MTQ4XHU3RDJGXHU1MkEwXHU1MThEXHU1MjI0IGRvbmVcdUZGMUFcdTY3MDBcdTU0MEVcdTRFMDBcdTYyNzlcdUZGMDhkb25lOnRydWUgXHU0RTE0IHByb2Nlc3NlZD4wXHVGRjA5XHU3Njg0XHU4QkExXHU2NTcwXHU0RTBEXHU4MEZEXHU0RTIyXHUzMDAyXG4gICAgICBjb25zdCBiYXRjaENsb3NlZCA9IChkYXRhWydjbG9zZWQnXSA/PyB7fSkgYXMgUmVjb3JkPHN0cmluZywgbnVtYmVyPlxuICAgICAgY2xvc2VkLmR1cGxpY2F0ZSArPSBOdW1iZXIoYmF0Y2hDbG9zZWRbJ2R1cGxpY2F0ZSddID8/IDApXG4gICAgICBjbG9zZWQub2Jzb2xldGUgKz0gTnVtYmVyKGJhdGNoQ2xvc2VkWydvYnNvbGV0ZSddID8/IDApXG4gICAgICBjbG9zZWQuZmFsc2VfcG9zaXRpdmUgKz0gTnVtYmVyKGJhdGNoQ2xvc2VkWydmYWxzZV9wb3NpdGl2ZSddID8/IDApXG4gICAgICBrZXB0ICs9IE51bWJlcihkYXRhWydrZXB0J10gPz8gMClcbiAgICAgIHByb2Nlc3NlZCArPSBOdW1iZXIoZGF0YVsncHJvY2Vzc2VkJ10gPz8gMClcbiAgICAgIGlmIChkYXRhWydwYXJzZUZhaWxlZCddID09PSB0cnVlKSBwYXJzZUZhaWxlZCA9IHRydWVcbiAgICAgIGlmIChkYXRhWydkb25lJ10gPT09IHRydWUpIGJyZWFrXG4gICAgICBzZXRUcmlhZ2VTdGF0ZSh7IHByb2Nlc3NlZCwgcmVtYWluaW5nOiBOdW1iZXIoZGF0YVsncmVtYWluaW5nJ10gPz8gMCkgfSlcbiAgICB9XG4gICAgc2V0VHJpYWdlU3RhdGUobnVsbClcbiAgICBhd2FpdCBsb2FkSXNzdWVzKClcbiAgICBpZiAoc3RvcHBlZCkgc2V0QWN0aW9uUmVzdWx0KCdcdTIzRjkgJyArIHQoJ3Jldmlldy50cmlhZ2VTdG9wcGVkJykpXG4gICAgZWxzZSBpZiAocHJvY2Vzc2VkID09PSAwKSB7XG4gICAgICAvLyBcdTk5OTZcdThGNkVcdTUzNzMgZG9uZSBcdTRFMTRcdTk2RjZcdTU5MDRcdTc0MDZcdUZGMUFcdTVGNTNcdTUyNERcdTRGMUFcdThCRERcdTVCOUFcdTRGNERcdTUyMzBcdTc2ODRcdTk4NzlcdTc2RUVcdTZDQTFcdTY3MDlcdTVGODVcdTUyMDZcdThCQ0FcdTk1RUVcdTk4OThcdTIwMTRcdTIwMTRcdTgyRTVcdTRFMEVcdTUyMTdcdTg4NjhcdTRFMERcdTdCMjZcdUZGMENcdTU5MUFcdTUzNEFcdTY2MkZcdTRGMUFcdThCRERcdTRFMERcdTVDNUVcdTRFOEVcdThCRTVcdTk4NzlcdTc2RUVcdTMwMDJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyB0KCdyZXZpZXcudHJpYWdlTm90aGluZycpKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgncmV2aWV3LnRyaWFnZURvbmUnKVxuICAgICAgICAucmVwbGFjZSgne2F9JywgU3RyaW5nKGNsb3NlZC5kdXBsaWNhdGUpKS5yZXBsYWNlKCd7Yn0nLCBTdHJpbmcoY2xvc2VkLm9ic29sZXRlKSkucmVwbGFjZSgne2N9JywgU3RyaW5nKGNsb3NlZC5mYWxzZV9wb3NpdGl2ZSkpLnJlcGxhY2UoJ3tkfScsIFN0cmluZyhrZXB0KSlcbiAgICAgICAgKyAocGFyc2VGYWlsZWQgPyB0KCdyZXZpZXcudHJpYWdlUGFyc2VGYWlsJykgOiAnJykpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1OTVFRVx1OTg5OFx1NTkwRFx1NjhDMFx1RkYxQVx1NUJGOVx1OEJFNVx1OTVFRVx1OTg5OFx1NjI0MFx1NUM1RVx1OEJDNFx1NUJBMVx1NzZFRVx1NjgwN1x1OTFDRFx1OEREMVx1NjhDMFx1NkQ0Qlx1RkYwOFx1NEZFRVx1NTkwRFx1Nzg2RVx1OEJBNCArIFx1NjcwMFx1NEYxOFx1NjAyNy9cdTY3MDBcdTVDMEZcdTRGQjVcdTUxNjUgKyBcdTY1QjBcdTk1RUVcdTk4OThcdTYyNkJcdTYzQ0ZcdUZGMDlcdUZGMENcbiAgICogXHU1M0VBXHU2NzA5XHU1OTBEXHU2OEMwXHU5MDFBXHU4RkM3XHU2MjREXHU4MUVBXHU1MkE4XHU3RjZFXHU0RTNBXHU1REYyXHU4OUUzXHU1MUIzXHVGRjFCXHU3RUQzXHU2NzlDXHU0RUU1XHU1OTBEXHU2OEMwXHU2MkE1XHU1NDRBXHU1RjYyXHU1RjBGXHU1QzU1XHU3OTNBXHUzMDAyXG4gICAqL1xuICBjb25zdCB2ZXJpZnlJc3N1ZXMgPSBhc3luYyAodGFyZ2V0OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRWZXJpZnlpbmdUYXJnZXQodGFyZ2V0KVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXMvdmVyaWZ5JywgeyB0YXJnZXQgfSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc29sdmVkID0gKGRhdGFbJ3Jlc29sdmVkJ10gYXMgc3RyaW5nW10gfCB1bmRlZmluZWQpID8/IFtdXG4gICAgICBjb25zdCBzdGlsbE9wZW4gPSAoZGF0YVsnc3RpbGxPcGVuJ10gYXMgQXJyYXk8eyB0aXRsZTogc3RyaW5nOyByZWFzb246IHN0cmluZyB9PiB8IHVuZGVmaW5lZCkgPz8gW11cbiAgICAgIGNvbnN0IG5ld0lzc3VlcyA9IChkYXRhWyduZXdJc3N1ZXMnXSBhcyBBcnJheTx7IHNldmVyaXR5OiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT4gfCB1bmRlZmluZWQpID8/IFtdXG4gICAgICBjb25zdCB2ZXJkaWN0ID0gU3RyaW5nKGRhdGFbJ3ZlcmRpY3QnXSA/PyAnJylcbiAgICAgIGNvbnN0IGxpbmVzID0gW1xuICAgICAgICBgXHU1OTBEXHU2OEMwXHU1QjhDXHU2MjEwXHVGRjFBXHU1REYyXHU0RkVFXHU1OTBEICR7cmVzb2x2ZWQubGVuZ3RofSBcdTAwQjcgXHU0RUNEXHU2NzJBXHU0RkVFXHU1OTBEICR7c3RpbGxPcGVuLmxlbmd0aH0gXHUwMEI3IFx1NjVCMFx1NTg5RVx1OTVFRVx1OTg5OCAke25ld0lzc3Vlcy5sZW5ndGh9YCxcbiAgICAgICAgLi4uKHJlc29sdmVkLmxlbmd0aCA+IDAgPyBbYFx1MjcxMyBcdTVERjJcdTRGRUVcdTU5MERcdUZGMUEke3Jlc29sdmVkLmpvaW4oJ1x1RkYxQicpfWBdIDogW10pLFxuICAgICAgICAuLi4oc3RpbGxPcGVuLmxlbmd0aCA+IDAgPyBzdGlsbE9wZW4ubWFwKChpdGVtKSA9PiBgXHUyNzE3IFx1NjcyQVx1NEZFRVx1NTkwRFx1RkYxQSR7aXRlbS50aXRsZX0gXHUyMDE0XHUyMDE0ICR7aXRlbS5yZWFzb259YCkgOiBbXSksXG4gICAgICAgIC4uLihuZXdJc3N1ZXMubGVuZ3RoID4gMCA/IG5ld0lzc3Vlcy5tYXAoKGl0ZW0pID0+IGBcdUZGMEIgXHU2NUIwXHU5NUVFXHU5ODk4XHVGRjFBWyR7aXRlbS5zZXZlcml0eX1dICR7aXRlbS50aXRsZX1gKSA6IFtdKSxcbiAgICAgICAgLi4uKHZlcmRpY3QgPT09ICcnID8gW10gOiBbYFx1NjcwMFx1NEYxOFx1NjAyN1x1RkYxQSR7dmVyZGljdH1gXSksXG4gICAgICBdXG4gICAgICBzZXRBY3Rpb25SZXN1bHQobGluZXMuam9pbignXFxuJykpXG4gICAgICBhd2FpdCBsb2FkSXNzdWVzKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRWZXJpZnlpbmdUYXJnZXQobnVsbClcbiAgICB9XG4gIH1cblxuICBjb25zdCBhZGROb3RlID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChub3RlVGl0bGUudHJpbSgpID09PSAnJyB8fCBub3RlQ29udGVudC50cmltKCkgPT09ICcnKSByZXR1cm5cbiAgICBjb25zdCB7IG9rIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3RlcycsIHtcbiAgICAgIHRpdGxlOiBub3RlVGl0bGUudHJpbSgpLFxuICAgICAgY29udGVudDogbm90ZUNvbnRlbnQudHJpbSgpLFxuICAgICAgdGFnczogbm90ZVRhZ3MsXG4gICAgICBzaGE6IHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiBzZWxlY3RlZFRhcmdldHNbMF0sXG4gICAgfSlcbiAgICBpZiAob2spIHtcbiAgICAgIHNldE5vdGVUaXRsZSgnJylcbiAgICAgIHNldE5vdGVDb250ZW50KCcnKVxuICAgICAgc2V0Tm90ZVRhZ3MoJycpXG4gICAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlbW92ZU5vdGUgPSBhc3luYyAoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL2RlbGV0ZScsIHsgaWQgfSlcbiAgICBpZiAoZWRpdGluZ05vdGUgIT09IG51bGwgJiYgZWRpdGluZ05vdGUuaWQgPT09IGlkKSBzZXRFZGl0aW5nTm90ZShudWxsKVxuICAgIGF3YWl0IGxvYWROb3RlcygpXG4gIH1cblxuICBjb25zdCBzYXZlTm90ZUVkaXQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKGVkaXRpbmdOb3RlID09PSBudWxsKSByZXR1cm5cbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy91cGRhdGUnLCB7IGlkOiBlZGl0aW5nTm90ZS5pZCwgdGl0bGU6IGVkaXRpbmdOb3RlLnRpdGxlLCBjb250ZW50OiBlZGl0aW5nTm90ZS5jb250ZW50LCB0YWdzOiBlZGl0aW5nTm90ZS50YWdzIH0pXG4gICAgc2V0RWRpdGluZ05vdGUobnVsbClcbiAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICB9XG5cbiAgLyoqIFx1N0Y2RVx1OTg3Ni9cdTUzRDZcdTZEODhcdTdGNkVcdTk4NzZcdTRFMDBcdTY3NjFcdTdCMTRcdThCQjBcdTMwMDIgKi9cbiAgY29uc3QgdG9nZ2xlTm90ZVBpbiA9IGFzeW5jIChub3RlOiBOb3RlRW50cnkpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy91cGRhdGUnLCB7IGlkOiBub3RlLmlkLCBwaW5uZWQ6IG5vdGUucGlubmVkICE9PSB0cnVlIH0pXG4gICAgYXdhaXQgbG9hZE5vdGVzKClcbiAgfVxuXG4gIC8qKiBcdTdCMTRcdThCQjBcdTVCRkNcdTUxRkFcdTRFM0EgLm1kIFx1NjU4N1x1NEVGNlx1RkYwOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1N0FFRiBCbG9iIFx1NEUwQlx1OEY3RFx1RkYxQlx1NjU4N1x1NEVGNlx1NTQwRFx1NjMwOVx1NjgwN1x1OTg5OFx1NkUwNVx1NkQxN1x1RkYwQ1x1OTc1RVx1NkNENVx1NUI1N1x1N0IyNlx1NjZGRlx1NjM2Mlx1NEUzQVx1NEUwQlx1NTIxMlx1N0VCRlx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBleHBvcnROb3RlID0gKG5vdGU6IE5vdGVFbnRyeSk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IG1kID0gYCMgJHtub3RlLnRpdGxlfVxcblxcbiR7bm90ZS5jb250ZW50fVxcbmBcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW21kXSwgeyB0eXBlOiAndGV4dC9tYXJrZG93bjtjaGFyc2V0PXV0Zi04JyB9KVxuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgICBjb25zdCBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBhbmNob3IuaHJlZiA9IHVybFxuICAgIGFuY2hvci5kb3dubG9hZCA9IChub3RlLnRpdGxlLnJlcGxhY2UoL1tcXFxcLzoqP1wiPD58XS9nLCAnXycpLnRyaW0oKS5zbGljZSgwLCA2MCkgfHwgJ25vdGUnKSArICcubWQnXG4gICAgYW5jaG9yLmNsaWNrKClcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybClcbiAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgnbm90ZXMuZXhwb3J0RG9uZScpKVxuICB9XG5cbiAgLyoqIEFJIFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1RkYxQVx1NUJGOVx1NkJENFx1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NTA1QVx1NTg5RVx1OTFDRlx1NjZGNFx1NjVCMFx1RkYwQ1x1NjI4QVx1N0IxNFx1OEJCMCtcdTk4NzlcdTc2RUVcdTY4NjNcdTY4NDhcdTYzRDBcdTcwQkNcdTYyMTBcdTRFMDBcdTRFRkRcdTMwMENcdTZEM0JcdTMwMERcdTc2ODRcdTYwM0JcdTdFRDNcdTY1ODdcdTY4NjNcdTMwMDIgKi9cbiAgY29uc3QgYWlTdW1tYXJpemUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0QWlTdW1tYXJpemluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy9haS1zdW1tYXJ5Jywge30pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoZGF0YVsndXBkYXRlZCddID09PSB0cnVlXG4gICAgICAgID8gJ1x1MjcxMyBcdTVERjJcdTVCRjlcdTZCRDRcdTRFMEFcdTZCMjFcdTYwM0JcdTdFRDNcdTVCOENcdTYyMTBcdTU4OUVcdTkxQ0ZcdTY2RjRcdTY1QjBcdUZGMDhcdTY1QjBcdTU4OUVcdTUzRDhcdTUzMTZcdTg5QzFcdTYwM0JcdTdFRDNcdTc2ODRcdTMwMENcdTY3MkNcdTZCMjFcdTY2RjRcdTY1QjBcdTMwMERcdTRFMDBcdTgyODJcdUZGMDlcdUZGMENcdTY1RTdcdTYwM0JcdTdFRDNcdTVERjJcdTU0MDhcdTVFNzZcdTY2RkZcdTYzNjInXG4gICAgICAgIDogJ1x1MjcxMyBcdTVERjJcdTc1MUZcdTYyMTBcdTk5OTZcdTRFRkRcdTVCNjZcdTRFNjBcdTYwM0JcdTdFRDMnKVxuICAgICAgYXdhaXQgbG9hZE5vdGVzKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRBaVN1bW1hcml6aW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTk4NzVcdTk3NjJcdTUyMUJcdTVFRkFcdTYyNjdcdTg4NENcdUZGMUFcdTVFRkFcdTUzRDhcdTY2RjQgXHUyMTkyIExMTSBcdTc1MUZcdTYyMTBcdTdGMTZcdTYzOTJcdThCQTFcdTUyMTIgXHUyMTkyIFx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNFx1OTg3NVx1RkYwOFx1ODlEMlx1ODI3Mi9cdTZBMjFcdTU3OEIvXHU3QjU2XHU3NTY1XHU1M0VGXHU4QzAzXHVGRjA5XHUyMTkyIFx1Nzg2RVx1OEJBNFx1NTQwRVx1NTQyRlx1NTJBOFx1MzAwMiAqL1xuICBjb25zdCBzdGFydFJ1biA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoZXhlY1RpdGxlLnRyaW0oKSA9PT0gJycgfHwgZXhlY0Rlc2MudHJpbSgpID09PSAnJykgcmV0dXJuXG4gICAgc2V0QnVzeSgnc3RhcnRSdW4nKVxuICAgIHNldEFjdGlvblJlc3VsdChudWxsKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL3N0YXJ0Jywge1xuICAgICAgICB0aXRsZTogZXhlY1RpdGxlLnRyaW0oKSwgZGVzY3JpcHRpb246IGV4ZWNEZXNjLnRyaW0oKSxcbiAgICAgICAgLi4uKGV4ZWNNb2RlbCA9PT0gJycgPyB7fSA6ICgoKSA9PiB7IGNvbnN0IFtwcm92aWRlciwgbW9kZWxdID0gZXhlY01vZGVsLnNwbGl0KCcvJyk7IHJldHVybiB7IGRlZmF1bHRNb2RlbFByb3ZpZGVyOiBwcm92aWRlciA/PyAnJywgZGVmYXVsdE1vZGVsSWQ6IG1vZGVsID8/ICcnIH0gfSkoKSksXG4gICAgICB9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKGRhdGFbJ2F1dG9TdGFydGVkJ10gPT09IHRydWUpIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU1REYyXHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHVGRjFBJyArIFN0cmluZyhkYXRhWydydW5JZCddID8/ICcnKSlcbiAgICAgICAgc2V0RXhlY1RpdGxlKCcnKVxuICAgICAgICBzZXRFeGVjRGVzYygnJylcbiAgICAgICAgYXdhaXQgcmVmcmVzaFN0YXRlKClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBzdGVwcyA9IChkYXRhWydzdGVwcyddIGFzIEFycmF5PFJlY29yZDxzdHJpbmcsIHVua25vd24+PiB8IHVuZGVmaW5lZCkgPz8gW11cbiAgICAgIHNldFBsYW5Db25maXJtKHtcbiAgICAgICAgY2hhbmdlSWQ6IFN0cmluZyhkYXRhWydjaGFuZ2VJZCddID8/ICcnKSxcbiAgICAgICAgc3RlcHM6IHN0ZXBzLm1hcCgoc3RlcCkgPT4gKHtcbiAgICAgICAgICBpZDogU3RyaW5nKHN0ZXBbJ2lkJ10gPz8gJycpLFxuICAgICAgICAgIHRpdGxlOiBTdHJpbmcoc3RlcFsndGl0bGUnXSA/PyAnJyksXG4gICAgICAgICAgZGVzY3JpcHRpb246IFN0cmluZyhzdGVwWydkZXNjcmlwdGlvbiddID8/ICcnKSxcbiAgICAgICAgICB0YXJnZXRGaWxlczogKHN0ZXBbJ3RhcmdldEZpbGVzJ10gYXMgc3RyaW5nW10gfCB1bmRlZmluZWQpID8/IFtdLFxuICAgICAgICAgIHJvbGU6IFN0cmluZyhzdGVwWydyb2xlJ10gPz8gJ2NvZGluZycpLFxuICAgICAgICAgIGFjY2VwdGFuY2U6IFN0cmluZyhzdGVwWydhY2NlcHRhbmNlJ10gPz8gJycpLFxuICAgICAgICAgIGZhaWx1cmVQb2xpY3k6IFN0cmluZyhzdGVwWydmYWlsdXJlUG9saWN5J10gPz8gJ3JldHJ5LWVzY2FsYXRlJyksXG4gICAgICAgICAgZW5hYmxlZDogc3RlcFsnZW5hYmxlZCddICE9PSBmYWxzZSxcbiAgICAgICAgICBtb2RlbFByb3ZpZGVyOiAnJyxcbiAgICAgICAgICBtb2RlbElkOiAnJyxcbiAgICAgICAgfSkpLFxuICAgICAgfSlcbiAgICAgIGlmIChtb2RlbE9wdGlvbnMubGVuZ3RoID09PSAwICYmIG1vZGVsVGllcnMgPT09IG51bGwpIHZvaWQgbG9hZE1vZGVsQ29uZmlnKClcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1OEJBMVx1NTIxMlx1NURGMlx1NzUxRlx1NjIxMFx1RkYwQ1x1OEJGN1x1NTcyOFx1NEUwQlx1NjVCOVx1Nzg2RVx1OEJBNFx1N0YxNlx1NjM5Mlx1NTQwRVx1NTQyRlx1NTJBOCcpXG4gICAgICBzZXRFeGVjVGl0bGUoJycpXG4gICAgICBzZXRFeGVjRGVzYygnJylcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRCdXN5KG51bGwpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNFx1OTg3NVx1RkYxQVx1NEZERFx1NUI1OFx1N0YxNlx1OEY5MVx1RkYwOFx1NjVCMFx1NzI0OFx1NjcyQ1x1OEJBMVx1NTIxMlx1RkYwOVx1NUU3Nlx1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1MzAwMiAqL1xuICBjb25zdCBsYXVuY2hQbGFuID0gYXN5bmMgKHdpdGhFZGl0czogYm9vbGVhbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChwbGFuQ29uZmlybSA9PT0gbnVsbCkgcmV0dXJuXG4gICAgc2V0UGxhbkJ1c3kodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgbGV0IGNoYW5nZUlkID0gcGxhbkNvbmZpcm0uY2hhbmdlSWRcbiAgICAgIGlmICh3aXRoRWRpdHMpIHtcbiAgICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9wbGFuL3VwZGF0ZScsIHsgY2hhbmdlSWQsIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcyB9KVxuICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL2xhdW5jaCcsIHsgY2hhbmdlSWQgfSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NURGMlx1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYxQScgKyBTdHJpbmcoZGF0YVsncnVuSWQnXSA/PyAnJykpXG4gICAgICBzZXRQbGFuQ29uZmlybShudWxsKVxuICAgICAgYXdhaXQgcmVmcmVzaFN0YXRlKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRQbGFuQnVzeShmYWxzZSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU1MkEwXHU4RjdEIFJ1biBcdThCRTZcdTYwQzVcdUZGMDhcdTZCNjVcdTlBQTRcdTY1RjZcdTk1RjRcdTdFQkYgKyBcdTRFRkJcdTUyQTFcdTVERTVcdTRGNUNcdThCQjBcdTVGQzZcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgbG9hZFJ1bkRldGFpbCA9IGFzeW5jIChpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvZGV0YWlsP2lkPScgKyBlbmNvZGVVUklDb21wb25lbnQoaWQpICsgJyZzZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXRSdW5EZXRhaWwoZGF0YSBhcyBSdW5EZXRhaWwpXG4gICAgfSBjYXRjaCB7XG4gICAgICBzZXRSdW5EZXRhaWwobnVsbClcbiAgICB9XG4gIH1cblxuICAvKiogXHU2MDYyXHU1OTBEXHU2NjgyXHU1MDVDL1x1NEUyRFx1NjVBRC9cdTU5MzFcdThEMjVcdTc2ODQgUnVuXHUzMDAyICovXG4gIGNvbnN0IHJlc3VtZVJ1biA9IGFzeW5jIChydW5JZDogc3RyaW5nLCBhY3Rpb246ICdjb250aW51ZScgfCAnc2tpcC1jdXJyZW50Jyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvcmVzdW1lJywgeyBydW5JZCwgYWN0aW9uIH0pXG4gICAgaWYgKG9rKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTYwNjJcdTU5MERcdTYyNjdcdTg4NENcdUZGMDgnICsgYWN0aW9uICsgJ1x1RkYwOScpXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgICAgYXdhaXQgbG9hZFJ1bkRldGFpbChydW5JZClcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTUyQTBcdThGN0RcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdTUyMTdcdTg4NjhcdTMwMDIgKi9cbiAgY29uc3QgbG9hZFNjaGVkdWxlZCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvc2NoZWR1bGVkP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldFNjaGVkdWxlZERhdGEoKGRhdGEgYXMgeyB0YXNrczogU2NoZWR1bGVkVGFza0VudHJ5W10gfSkudGFza3MgPz8gW10pXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTUyMTdcdTg4NjhcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcbiAgICB9XG4gIH1cblxuICAvKiogXHU1MjFCXHU1RUZBIC8gXHU2NkY0XHU2NUIwIC8gXHU1MjIwXHU5NjY0IC8gXHU3QUNCXHU1MzczXHU2MjY3XHU4ODRDXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHUzMDAyICovXG4gIGNvbnN0IGFkZFNjaGVkdWxlZCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBpbnRlcnZhbE1pbnV0ZXMgPSBOdW1iZXIoc2NoZWRJbnRlcnZhbClcbiAgICBpZiAoc2NoZWROYW1lLnRyaW0oKSA9PT0gJycgfHwgIU51bWJlci5pc0Zpbml0ZShpbnRlcnZhbE1pbnV0ZXMpIHx8IGludGVydmFsTWludXRlcyA8IDEpIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3IFx1OEJGN1x1NTg2Qlx1NTE5OVx1NEVGQlx1NTJBMVx1NTQwRFx1NzlGMFx1NEUwRVx1NjcwOVx1NjU0OFx1OTVGNFx1OTY5NFx1RkYwOFx1NTIwNlx1OTQ5Rlx1RkYwOScpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvc2NoZWR1bGVkJywge1xuICAgICAgbmFtZTogc2NoZWROYW1lLnRyaW0oKSwgdHlwZTogc2NoZWRUeXBlLCBpbnRlcnZhbE1pbnV0ZXMsXG4gICAgICB0aXRsZTogc2NoZWRUaXRsZS50cmltKCkgfHwgdW5kZWZpbmVkLCBkZXNjcmlwdGlvbjogc2NoZWREZXNjLnRyaW0oKSB8fCB1bmRlZmluZWQsXG4gICAgfSlcbiAgICBpZiAob2spIHtcbiAgICAgIHNldFNjaGVkTmFtZSgnJyk7IHNldFNjaGVkVGl0bGUoJycpOyBzZXRTY2hlZERlc2MoJycpXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdTVERjJcdTUyMUJcdTVFRkEnKVxuICAgICAgYXdhaXQgbG9hZFNjaGVkdWxlZCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBzY2hlZHVsZWRBY3Rpb24gPSBhc3luYyAocGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3NjaGVkdWxlZC8nICsgcGF0aCwgYm9keSlcbiAgICBpZiAob2spIGF3YWl0IGxvYWRTY2hlZHVsZWQoKVxuICAgIGVsc2Ugc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICB9XG5cbiAgLyoqIFx1NTJBMFx1OEY3RFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1NTE2OFx1OTFDRlx1NjU3MFx1NjM2RVx1RkYwOFx1NTQyQlx1NTQwQ1x1NkI2NVx1NTdGQVx1N0VCRlx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBsb2FkTWVtb3JpZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yaWVzP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldE1lbW9yaWVzRGF0YShkYXRhIGFzIE1lbW9yaWVzUGF5bG9hZClcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2MlxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTYyQzlcdTUzRDZcdTU0MENcdTZCNjVcdUZGMUFcdTRFMDlcdTU0MTFcdTUyMjRcdTVCOUFcdUZGMDhcdTU5MzFcdTY1NDhcdTYzRDBcdTY4NDgvXHU2NUIwXHU1ODlFXHU1MDE5XHU5MDA5L1x1ODFFQVx1NTJBOFx1N0VFRFx1NTQ3RFx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBzeW5jTWVtb3JpZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0TWVtb3J5U3luY2luZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvc3luYycsIHt9KVxuICAgICAgaWYgKCFvayAmJiBkYXRhWydlcnJvciddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2V0U3luY1JlcG9ydCh7IG9rOiBmYWxzZSwgZXJyb3I6IFN0cmluZyhkYXRhWydlcnJvciddKSB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldFN5bmNSZXBvcnQoZGF0YSBhcyBTeW5jUmVwb3J0KVxuICAgICAgYXdhaXQgbG9hZE1lbW9yaWVzKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0U3luY1JlcG9ydCh7IG9rOiBmYWxzZSwgZXJyb3I6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSB9KVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRNZW1vcnlTeW5jaW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTU0MENcdTZCNjVcdTYyQTVcdTU0NEFcdTU0MEVcdTdFRURcdUZGMUFcdTYyOEFcdTkwMDlcdTRFMkRcdTc2ODRcdTc1OTFcdTRGM0NcdThGQzdcdTY1RjZcdTk4NzlcdTg0M0RcdTRFM0Egc3RhbGUgLyBcdTVGNTJcdTY4NjNcdTMwMDIgKi9cbiAgY29uc3QgYXBwbHlTeW5jID0gYXN5bmMgKGlkczogc3RyaW5nW10sIGFjdGlvbjogJ21hcmstc3RhbGUnIHwgJ2FyY2hpdmUnKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5L3N5bmMvYXBwbHknLCB7IGlkcywgYWN0aW9uIH0pXG4gICAgc2V0U3luY1JlcG9ydCgocHJldmlvdXMpID0+IHByZXZpb3VzID09PSBudWxsID8gbnVsbCA6IHsgLi4ucHJldmlvdXMsIHN0YWxlUHJvcG9zYWxzOiAocHJldmlvdXMuc3RhbGVQcm9wb3NhbHMgPz8gW10pLmZpbHRlcigocHJvcG9zYWwpID0+ICFpZHMuaW5jbHVkZXMocHJvcG9zYWwuaWQpKSB9KVxuICAgIGF3YWl0IGxvYWRNZW1vcmllcygpXG4gIH1cblxuICAvKiogXHU4QkIwXHU1RkM2XHU3MkI2XHU2MDAxXHU2NENEXHU0RjVDXHVGRjA4XHU1RjUyXHU2ODYzL1x1NjA2Mlx1NTkwRFx1RkYwOVx1NEUwRVx1NTIwNlx1NjUyRlx1NUY1Mlx1NEUwMFx1MzAwMiAqL1xuICBjb25zdCBtZW1vcnlBY3Rpb24gPSBhc3luYyAocGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeS8nICsgcGF0aCwgYm9keSlcbiAgICBpZiAob2spIGF3YWl0IGxvYWRNZW1vcmllcygpXG4gICAgZWxzZSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gIH1cblxuICAvKiogXHU4QkIwXHU1RkM2XHU4RjZDXHU3QjE0XHU4QkIwXHVGRjFBXHU1RjE1XHU3NTI4XHU4RkRCXHU1QjY2XHU0RTYwXHU2ODYzXHU2ODQ4XHUzMDAyICovXG4gIGNvbnN0IG1lbW9yeVRvTm90ZSA9IGFzeW5jIChtZW1vcnk6IE1lbW9yeUVudHJ5KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMnLCB7XG4gICAgICB0aXRsZTogbWVtb3J5LnRpdGxlLFxuICAgICAgY29udGVudDogbWVtb3J5LmNvbnRlbnQgKyAobWVtb3J5LmJhc2lzU2hhICE9PSBudWxsID8gYFxcblx1RkYwOFx1Njc2NVx1NkU5MFx1RkYxQVx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNiAke21lbW9yeS5iYXNpc1NoYS5zbGljZSgwLCA4KX1cdUZGMDlgIDogJycpLFxuICAgICAgdGFnczogJ1x1OEJCMFx1NUZDNiwgJyArIG1lbW9yeS50eXBlLFxuICAgIH0pXG4gICAgaWYgKG9rKSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTYyOEFcdThCQjBcdTVGQzZcdThGNkNcdTRFM0FcdTdCMTRcdThCQjAnKVxuICB9XG5cbiAgLy8gXHU0RjFBXHU4QkREXHU2MjUzXHU1RjAwL1x1NTIwN1x1NjM2Mlx1NjVGNlx1NUI5OFx1NjVCOVx1NEYxQSBjbG9zZURldGFpbHMgXHU2NTM2XHU4RDc3XHU4RjY4XHU5MDUzXHVGRjFCXHU3NzBCXHU5NUU4XHU3MkQ3XHU2QkNGIDUwMG1zIFx1NjhDMFx1NjdFNVx1RkYwQ1xuICAvLyBcdTUzRUFcdTg5ODFcdTVGNTNcdTUyNERcdTY3MDlcdTRGMUFcdThCRERcdTgwMENcdTVERTVcdTRGNUNcdTUzRjBcdTUyMTdcdTVCQkQgPCA1MHB4IFx1NUMzMVx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1RkYwOFx1Nzg2RVx1NUI5QVx1NjAyN1x1RkYwQ1x1NEUwRFx1NEY5RFx1OEQ1NiBlZmZlY3QgXHU2NUY2XHU1RThGXHVGRjA5XHUzMDAyXG4gIC8vIFx1NTQwQ1x1NEUwMFx1NjJDRFx1N0VGNFx1NjMwMVx1N0VERlx1OEJBMVx1ODg0Q1x1OTRCM1x1NTIzNlx1RkYxQVx1NEYxQVx1OEJERFx1NTIwN1x1NjM2Mlx1NEYxQVx1NjM2Mlx1NjM4OVx1N0VERlx1OEJBMVx1ODg0QyBET01cdUZGMENcdTY4MzdcdTVGMEZcdTg4NjhcdTdGM0FcdTU5MzFcdTY1RjZcdTYzMDlcdTVGNTNcdTUyNERcbiAgLy8gXHU2Nzg0XHU1RUZBXHU1NEM4XHU1RTBDXHU5MUNEXHU2Q0U4XHU1MTY1XHVGRjA4XHU1RTQyXHU3QjQ5XHVGRjBDXHU1REYyXHU1QjU4XHU1NzI4XHU1MjE5XHU4REYzXHU4RkM3XHVGRjA5XHUzMDAyXG4gIGNvbnN0IGxheW91dEZhY2UgPSAocHJvcHMgYXMgdW5rbm93biBhcyB7IGxheW91dD86IHsgb3BlbkRldGFpbHM/OiAoKSA9PiB2b2lkIH0gfSkubGF5b3V0XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLmxheW91dE1vZGUgPT09ICdvdmVybGF5JykgcmV0dXJuXG4gICAgYXBwbHlTdGF0c0xpbmVDbGFtcCgpXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BjLXN0YXRzLWNsYW1wJykgPT09IG51bGwpIGFwcGx5U3RhdHNMaW5lQ2xhbXAoKVxuICAgICAgY29uc3QgY2hhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0nKVxuICAgICAgY29uc3Qgd2lkdGggPSBjaGF0ID8gTWF0aC5yb3VuZChjaGF0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSA6IC0xXG4gICAgICBpZiAod2lkdGggIT09IC0xICYmIHdpZHRoIDwgNTApIGxheW91dEZhY2U/Lm9wZW5EZXRhaWxzPy4oKVxuICAgIH0sIDUwMClcbiAgICByZXR1cm4gKCkgPT4geyBjbGVhckludGVydmFsKHRpbWVyKSB9XG4gIH0sIFtwcm9wcy5zZXNzaW9uSWQsIHByb3BzLmxheW91dE1vZGUsIGxheW91dEZhY2VdKVxuXG4gIC8qKiBcdTRFRTUgaW1wb3J0YW50IFx1NTE4NVx1ODA1NFx1NjgzN1x1NUYwRlx1NzZGNFx1NjNBNVx1NTE5OVx1NUI5OFx1NjVCOVx1N0Y1MVx1NjgzQ1x1NkEyMVx1Njc3Rlx1RkYwOFx1NjcwMFx1OUFEOFx1NEYxOFx1NTE0OFx1N0VBN1x1RkYwQ1x1NEVGQlx1NEY1NVx1OTFDRFx1NkUzMlx1NjdEM1x1NEUwRFx1NEYxQVx1ODk4Nlx1NzZENlx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBmcmFtZVRlbXBsYXRlU2V0ID0gKGNoYXRQeDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJzaWRlYmFyQ29sXCJdJylcbiAgICBjb25zdCBzaWRlYmFyVyA9IHNpZGViYXIgPyBNYXRoLm1heCg1NiwgTWF0aC5yb3VuZChzaWRlYmFyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSkgOiAyODBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdJylcbiAgICAgID8uc3R5bGUuc2V0UHJvcGVydHkoJ2dyaWQtdGVtcGxhdGUtY29sdW1ucycsIHNpZGViYXJXICsgJ3B4IG1pbm1heCgwLCAxZnIpICcgKyBjaGF0UHggKyAncHgnLCAnaW1wb3J0YW50JylcbiAgfVxuXG4gIC8qKiBcdTY1MzZcdThENzdcdTYwMDFcdTZBMjFcdTY3N0ZcdUZGMUFcdTdCMkNcdTRFMDlcdTUyMTdcdUZGMDhcdTVCOThcdTY1QjlcdThCRTZcdTYwQzVcdUZGMDkwcHhcdTIwMTRcdTIwMTRcdTVERTVcdTRGNUNcdTUzRjBcdTUxNzNcdTk1RURcdTU0MEVcdTUzRjNcdTRGQTdcdTUzRUFcdTUxNDFcdThCQjhcdTgwNEFcdTU5MjlcdUZGMDhcdTRFMUFcdTRFM0JcdTg5QzRcdTUyMTlcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgY29sbGFwc2VGcmFtZVRlbXBsYXRlID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwic2lkZWJhckNvbFwiXScpXG4gICAgY29uc3Qgc2lkZWJhclcgPSBzaWRlYmFyID8gTWF0aC5tYXgoNTYsIE1hdGgucm91bmQoc2lkZWJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkpIDogMjgwXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXScpXG4gICAgICA/LnN0eWxlLnNldFByb3BlcnR5KCdncmlkLXRlbXBsYXRlLWNvbHVtbnMnLCBzaWRlYmFyVyArICdweCBtaW5tYXgoMCwgMWZyKSAwcHgnLCAnaW1wb3J0YW50JylcbiAgfVxuXG4gIC8vIFx1ODA0QVx1NTkyOVx1NTIxN1x1NUJCRFx1OEJCMFx1NUZDNlx1RkYwOFx1NUI5OFx1NjVCOSBsYXlvdXQgc3RvcmUgXHU3N0FDXHU2MDAxXHVGRjA5XHVGRjFBXHU2MzAyXHU4RjdEXHU2MDYyXHU1OTBEICsgXHU2MkQ2XHU2MkZEXHU3NkY0XHU1MTk5XHU1MTg1XHU4MDU0XHU2QTIxXHU2NzdGXHUzMDAyXG4gIC8vIFx1NUZDNVx1OTg3Qlx1NTE5OSBpbXBvcnRhbnRcdTIwMTRcdTIwMTRMQVlPVVRfU1RZTEUgXHU3Njg0XHU2QTIxXHU2NzdGXHU4OUM0XHU1MjE5XHU0RTVGXHU2NjJGIGltcG9ydGFudFx1RkYwQ1x1OTc1RSBpbXBvcnRhbnRcbiAgLy8gXHU1MTg1XHU4MDU0XHU0RjFBXHU4OEFCXHU1QjgzXHU1MzhCXHU1MjM2XHVGRjA4XHU4RkQ5XHU1QzMxXHU2NjJGXHU2QjY0XHU1MjREXCJcdTYyRDZcdTYyRkRcdTc1MUZcdTY1NDhcdTMwMDFcdTUyMzdcdTY1QjBcdTU0MEVcdThCQjBcdTVGQzZcdTRFMjJcdTU5MzFcIlx1NzY4NFx1NTM5Rlx1NTZFMFx1RkYwOVx1MzAwMlxuICAvLyBcdTVCOThcdTY1QjkgUmVhY3QgXHU5MUNEXHU2RTMyXHU2N0QzXHU0RjFBXHU2NTM5XHU1MTk5XHU1MTg1XHU4MDU0XHU2QTIxXHU2NzdGXHVGRjBDTXV0YXRpb25PYnNlcnZlciBcdTYzMDlcdTVGNTNcdTUyNERcdTUwM0NcdTVCODhcdTUzNkJcdTkxQ0RcdTUxOTlcbiAgLy8gXHVGRjA4XHU1MDNDXHU3NkY4XHU1NDBDXHU0RTBEXHU0RjFBXHU4OUU2XHU1M0QxXHU2NUIwXHU3Njg0IG11dGF0aW9uXHVGRjBDXHU2NUUwXHU1NkRFXHU3M0FGXHVGRjA5XHUzMDAyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLmxheW91dE1vZGUgPT09ICdvdmVybGF5JykgcmV0dXJuXG4gICAgY29uc3Qgc2F2ZWQgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BjLmNoYXRXaWR0aCcpID8/ICcnKVxuICAgIGNvbnN0IGFwcGx5ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgLy8gXHU2MzAyXHU4RjdEL1x1NUI5OFx1NjVCOVx1OTFDRFx1NkUzMlx1NjdEM1x1NjVGNlx1NjVFMFx1Njc2MVx1NEVGNlx1NTkzQVx1NTZERVx1NkEyMVx1Njc3Rlx1RkYwOGltcG9ydGFudCBcdTg5ODZcdTUxOTlcdUZGMUJcdTUwM0NcdTc2RjhcdTU0MENcdTY1RjZcdTVCOThcdTY1QjlcdTY4MzdcdTVGMEZcdTUzRDhcdTY2RjRcbiAgICAgIC8vIFx1NEUwRFx1NEYxQVx1ODlFNlx1NTNEMVx1NjVCMFx1NzY4NCBtdXRhdGlvblx1RkYwQ1x1NjVFMFx1NTZERVx1NzNBRlx1RkYwOVx1MzAwMlx1NURFNVx1NEY1Q1x1NTNGMFx1NUYwMFx1Nzc0MCA9IFx1NTNGM1x1NTIxN1x1ODA0QVx1NTkyOVx1NTZGQVx1NUI5QVx1NUJCRFx1MzAwMlxuICAgICAgY29uc3QgY2hhdFcgPSBOdW1iZXIuaXNGaW5pdGUoc2F2ZWQpICYmIHNhdmVkID49IDI4MCA/IHNhdmVkIDogMzYwXG4gICAgICBmcmFtZVRlbXBsYXRlU2V0KGNoYXRXKVxuICAgIH1cbiAgICBhcHBseSgpXG4gICAgY29uc3QgZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdJylcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHsgYXBwbHkoKSB9KVxuICAgIGlmIChmcmFtZSAhPT0gbnVsbCkgb2JzZXJ2ZXIub2JzZXJ2ZShmcmFtZSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFsnc3R5bGUnXSB9KVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgIC8vIFx1NURFNVx1NEY1Q1x1NTNGMFx1NTM3OFx1OEY3RFx1RkYxQVx1NTE5OVx1NTE2NVx1NjUzNlx1OEQ3N1x1NjAwMVx1NkEyMVx1Njc3Rlx1RkYwOFx1N0IyQ1x1NEUwOVx1NTIxNyAwcHhcdUZGMDlcdTIwMTRcdTIwMTRcdTRFMUFcdTRFM0JcdTg5QzRcdTUyMTlcdUZGMUFcdTVERTVcdTRGNUNcdTUzRjBcdTUxNzMgXHUyMTkyIFx1NTNGM1x1NEZBN1x1NTNFQVx1NTE0MVx1OEJCOFxuICAgICAgLy8gXHU4MDRBXHU1OTI5XHUzMDAyXHU0RTBEXHU4MEZEXHU1MjIwXHU5NjY0XHU1MTg1XHU4MDU0XHU1QzVFXHU2MDI3XHVGRjA4XHU1Qjk4XHU2NUI5IFJlYWN0IFx1NEUwRFx1NEYxQVx1NEUzQlx1NTJBOFx1ODg2NVx1NTE5OVx1RkYwQ1x1NEYxQVx1NUJGQ1x1ODFGNFx1NEUzQlx1NTMzQVx1N0E3QVx1NzY3RFx1RkYwOVx1RkYxQlxuICAgICAgLy8gXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHU4NjdEXHU1NkRFXHU1MjMwXHU4QkU1XHU1MjE3XHU0RjQ2IDAgXHU1QkJEXHU0RTBEXHU1M0VGXHU4OUMxXHVGRjA4MC4xLjIgXHU1QjlFXHU2RDRCXHU1NkRFXHU1RjUyXHVGRjA5XHUzMDAyXG4gICAgICBjb2xsYXBzZUZyYW1lVGVtcGxhdGUoKVxuICAgIH1cbiAgfSwgW3Byb3BzLmxheW91dE1vZGVdKVxuXG4gIC8qKiBcdTUyMDZcdTk2OTRcdTY3NjFcdTYyRDZcdTYyRkRcdUZGMUFcdThDMDNcdTY1NzRcdTgwNEFcdTU5MjlcdTUyMTdcdTVCQkRcdUZGMDhcdTVERTVcdTRGNUNcdTUzRjBcdTU0MzhcdTY1MzZcdTUyNjlcdTRGNTlcdTdBN0FcdTk1RjRcdUZGMDlcdUZGMENcdTUxOTlcdTUxNjUgbG9jYWxTdG9yYWdlIFx1OEJCMFx1NUZDNlx1MzAwMiAqL1xuICBjb25zdCBvbkRpdmlkZXJEb3duID0gKGU6IFJlYWN0LlBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IG9uTW92ZSA9IChldjogUG9pbnRlckV2ZW50KTogdm9pZCA9PiB7XG4gICAgICBjb25zdCB3aWR0aCA9IE1hdGgubWluKDkwMCwgTWF0aC5tYXgoMjgwLCB3aW5kb3cuaW5uZXJXaWR0aCAtIGV2LmNsaWVudFgpKVxuICAgICAgZnJhbWVUZW1wbGF0ZVNldCh3aWR0aClcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYy5jaGF0V2lkdGgnLCBTdHJpbmcod2lkdGgpKVxuICAgIH1cbiAgICBjb25zdCBvblVwID0gKCk6IHZvaWQgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApXG4gICAgfVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcClcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGRpc3Bvc2VkID0gZmFsc2VcbiAgICBsZXQgZ2VuZXJhdGlvbiA9IDBcbiAgICBjb25zdCBsb2FkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgY29uc3QgcmVxdWVzdCA9ICsrZ2VuZXJhdGlvblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvc3RhdGU/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSwgeyBoZWFkZXJzOiB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0gfSlcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApXG4gICAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgICAgaWYgKCFkaXNwb3NlZCAmJiByZXF1ZXN0ID09PSBnZW5lcmF0aW9uKSB7XG4gICAgICAgICAgc2V0U3RhdGUoZGF0YSBhcyBXb3Jrc3BhY2VTdGF0ZSlcbiAgICAgICAgICBzZXRMb2FkRXJyb3IobnVsbClcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgICAgaWYgKCFkaXNwb3NlZCAmJiByZXF1ZXN0ID09PSBnZW5lcmF0aW9uKSBzZXRMb2FkRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgICAgfVxuICAgIH1cbiAgICB2b2lkIGxvYWQoKVxuICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB2b2lkIGxvYWQoKSB9LCA0MDAwKVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkaXNwb3NlZCA9IHRydWVcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgfVxuICB9LCBbcHJvcHMuc2Vzc2lvbklkXSlcblxuICAvLyBcdThGREJcdTUxNjVcdTYzRDBcdTRFQTQvXHU3QjE0XHU4QkIwL1JldmlldyBcdTk4NzVcdTdCN0VcdTY1RjZcdTYzMDlcdTk3MDBcdTYyQzlcdTUzRDZcdUZGMDhcdTYzRDBcdTRFQTRcdTUyMTdcdTg4NjhcdTRGOURcdThENTZcdTRGMUFcdThCRERcdTVERTVcdTRGNUNcdTUzM0FcdUZGMENcdThGNkVcdThCRTJcdTY1RTBcdTYxMEZcdTRFNDlcdUZGMDlcdTMwMDJcbiAgLy8gXHU2M0QwXHU0RUE0XHU5ODc1XHU0RTVGXHU2MkM5XHU3QjE0XHU4QkIwXHVGRjFBXHU4RjZFXHU2QjIxXHU2NzJBXHU2RDg4XHU1MzE2XHU2ODA3XHU4QkIwXHU5NzAwXHU4OTgxXHUzMDBDXHU0RTBBXHU2QjIxIEFJIFx1NjAzQlx1N0VEM1x1NjVGNlx1OTVGNFx1MzAwRFx1MzAwMlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0YWIgPT09ICdjb21taXRzJykgeyB2b2lkIGxvYWRDb21taXRzKCk7IHZvaWQgbG9hZE5vdGVzKCkgfVxuICAgIGlmICh0YWIgPT09ICdub3RlcycpIHsgdm9pZCBsb2FkTm90ZXMoKTsgdm9pZCBsb2FkTWVtb3JpZXMoKTsgaWYgKGNvbW1pdHNEYXRhID09PSBudWxsKSB2b2lkIGxvYWRDb21taXRzKCkgfVxuICAgIGlmICh0YWIgPT09ICdyZXZpZXcnKSB2b2lkIGxvYWRJc3N1ZXMoKVxuICAgIGlmICh0YWIgPT09ICdleGVjdXRpb24nKSB7IHZvaWQgbG9hZFNjaGVkdWxlZCgpOyBpZiAocnVuRGV0YWlsICE9PSBudWxsKSB2b2lkIGxvYWRSdW5EZXRhaWwocnVuRGV0YWlsLnJ1bi5pZCkgfVxuICAgIGlmICh0YWIgPT09ICdzZXR0aW5ncycgJiYgbW9kZWxUaWVycyA9PT0gbnVsbCkgdm9pZCBsb2FkTW9kZWxDb25maWcoKVxuICB9LCBbdGFiLCBwcm9wcy5zZXNzaW9uSWRdKVxuXG4gIGNvbnN0IGxvYWRNb2RlbENvbmZpZyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbW9kZWwtY29uZmlnJylcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHJldHVyblxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgc2V0TW9kZWxUaWVycygoZGF0YSBhcyB7IHRpZXJzOiBSZWNvcmQ8c3RyaW5nLCB7IHByb3ZpZGVyOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmcgfT4gfSkudGllcnMgPz8ge30pXG4gICAgICBzZXRNb2RlbE9wdGlvbnMoKGRhdGEgYXMgeyBvcHRpb25zOiBBcnJheTx7IHByb3ZpZGVyOiBzdHJpbmc7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZyB9PiB9KS5vcHRpb25zID8/IFtdKVxuICAgICAgY29uc3QgY29uY3VycmVuY3kgPSAoZGF0YSBhcyB7IGZpeENvbmN1cnJlbmN5PzogbnVtYmVyIH0pLmZpeENvbmN1cnJlbmN5XG4gICAgICBpZiAodHlwZW9mIGNvbmN1cnJlbmN5ID09PSAnbnVtYmVyJykgc2V0Rml4Q29uY3VycmVuY3koU3RyaW5nKGNvbmN1cnJlbmN5KSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1NkEyMVx1NTc4Qlx1OTE0RFx1N0Y2RVx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2MlxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNhdmVNb2RlbENvbmZpZyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAobW9kZWxUaWVycyA9PT0gbnVsbCkgcmV0dXJuXG4gICAgc2V0TW9kZWxTYXZpbmcodHJ1ZSlcbiAgICBzZXRNb2RlbFNhdmVkKGZhbHNlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb25jdXJyZW5jeSA9IE51bWJlcihmaXhDb25jdXJyZW5jeSlcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21vZGVsLWNvbmZpZycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHRpZXJzOiBtb2RlbFRpZXJzLCAuLi4oTnVtYmVyLmlzRmluaXRlKGNvbmN1cnJlbmN5KSA/IHsgZml4Q29uY3VycmVuY3k6IE1hdGgubWF4KDEsIE1hdGgubWluKDEwLCBNYXRoLnRydW5jKGNvbmN1cnJlbmN5KSkpIH0gOiB7fSkgfSksXG4gICAgICB9KVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHNldE1vZGVsU2F2ZWQodHJ1ZSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHNldE1vZGVsU2F2ZWQoZmFsc2UpIH0sIDI1MDApXG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldE1vZGVsU2F2aW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlZnJlc2hTdGF0ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCByZWZyZXNoZWQgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvc3RhdGU/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSwgeyBoZWFkZXJzOiB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0gfSlcbiAgICBpZiAocmVmcmVzaGVkLm9rKSBzZXRTdGF0ZShhd2FpdCByZWZyZXNoZWQuanNvbigpIGFzIFdvcmtzcGFjZVN0YXRlKVxuICB9XG5cbiAgLyoqIFx1N0VERlx1NEUwMFx1NTJBOFx1NEY1Q1x1NjI2N1x1ODg0Q1x1NTY2OFx1RkYxQVBPU1QgXHU1QkJGXHU0RTNCIEFQSVx1RkYwOFx1NjQzQVx1NUUyNlx1NEYxQVx1OEJERCBpZCBcdTRGOUJcdTY3MERcdTUyQTFcdTdBRUZcdTVCOUFcdTRGNERcdTk4NzlcdTc2RUVcdTVERTVcdTRGNUNcdTUzM0FcdUZGMDlcdUZGMENcdThGOTNcdTUxRkFcdThGREJcdTdFRDNcdTY3OUNcdTk3NjJcdTY3N0ZcdUZGMENcdTVCOENcdTYyMTBcdTU0MEVcdTUyMzdcdTY1QjBcdTcyQjZcdTYwMDFcdTMwMDIgKi9cbiAgY29uc3QgcnVuQWN0aW9uID0gYXN5bmMgKG5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldEJ1c3kobmFtZSlcbiAgICBzZXRBY3Rpb25SZXN1bHQobnVsbClcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdChwYXRoLCBib2R5KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoYFx1MjcxNyAke1N0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpfWApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KGZvcm1hdEFjdGlvblJlc3VsdChkYXRhKSlcbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdChgXHUyNzE3ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWApXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJ1c3kobnVsbClcbiAgICB9XG4gIH1cblxuICBjb25zdCBydW5Cb290c3RyYXAgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0Qm9vdHN0cmFwcGluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ib290c3RyYXAnLCB7fSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0TG9hZEVycm9yKFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldExvYWRFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJvb3RzdHJhcHBpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29uZmlybU1lbW9yeSA9IGFzeW5jIChtZW1vcnlJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5L2NvbmZpcm0nLCB7IG1lbW9yeUlkIH0pXG4gICAgaWYgKG9rKSB7XG4gICAgICBzZXRTdGF0ZSgocHJldmlvdXMpID0+IHByZXZpb3VzID09PSBudWxsID8gcHJldmlvdXMgOiB7XG4gICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICBtZW1vcmllczogcHJldmlvdXMubWVtb3JpZXM/Lm1hcCgobWVtb3J5KSA9PiBtZW1vcnkuaWQgPT09IG1lbW9yeUlkID8geyAuLi5tZW1vcnksIGlzSHVtYW5Db25maXJtZWQ6IHRydWUsIHRydXRoTGV2ZWw6ICdmYWN0JyB9IDogbWVtb3J5KSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcHJvamVjdCA9IHN0YXRlPy5wcm9qZWN0ID8/IG51bGxcbiAgY29uc3QgYm9vdHN0cmFwID0gc3RhdGU/LmJvb3RzdHJhcCA/PyBudWxsXG4gIGNvbnN0IGNoYW5nZXMgPSBzdGF0ZT8uY2hhbmdlcyA/PyBbXVxuICBjb25zdCBydW5zID0gc3RhdGU/LnJ1bnMgPz8gW11cbiAgY29uc3QgdmVyaWZpY2F0aW9ucyA9IHN0YXRlPy52ZXJpZmljYXRpb25zID8/IFtdXG4gIGNvbnN0IGNvbmZpcm1lZCA9IHN0YXRlPy5jb25maXJtZWQgPz8gW11cbiAgY29uc3QgY29uY2VwdHMgPSBzdGF0ZT8uY29uY2VwdHMgPz8gW11cblxuICBjb25zdCB0YWJzOiBBcnJheTx7IGtleTogVGFiS2V5OyBsYWJlbDogc3RyaW5nIH0+ID0gW1xuICAgIHsga2V5OiAnY29tbWl0cycsIGxhYmVsOiB0KCd0YWIuY29tbWl0cycpIH0sXG4gICAgeyBrZXk6ICdvdmVydmlldycsIGxhYmVsOiB0KCd0YWIub3ZlcnZpZXcnKSB9LFxuICAgIHsga2V5OiAnZXhlY3V0aW9uJywgbGFiZWw6IHQoJ3RhYi5leGVjdXRpb24nKSB9LFxuICAgIHsga2V5OiAncmV2aWV3JywgbGFiZWw6IHQoJ3RhYi5yZXZpZXcnKSB9LFxuICAgIHsga2V5OiAnbm90ZXMnLCBsYWJlbDogdCgndGFiLm5vdGVzJykgfSxcbiAgICB7IGtleTogJ3NldHRpbmdzJywgbGFiZWw6IHQoJ3RhYi5zZXR0aW5ncycpIH0sXG4gIF1cblxuICAvKiogXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDXHU5NzYyXHU2NzdGXHVGRjA4XHU2MDNCXHU4OUM4XHU5ODc1XHU3QjdFXHU3Njg0XHU1RkVCXHU2Mzc3XHU1MkE4XHU0RjVDXHU1MTcxXHU3NTI4XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHJlc3VsdFBhbmVsID0gYWN0aW9uUmVzdWx0ICE9PSBudWxsXG4gICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KENhcmQsIHsgdGl0bGU6IHQoJ3Jlc3VsdC5wYW5lbCcpIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5yZXN1bHQgfSwgYWN0aW9uUmVzdWx0KSlcbiAgICA6IG51bGxcbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcbiAgLy8gXHU5ODc2XHU5MEU4XHVGRjFBXHU0RUQzXHU1RTkzXHU2ODBGICsgXHU2M0QwXHU0RUE0XHU1OTFBXHU5MDA5XHU0RTBCXHU2MkM5XHVGRjA4XHU3RUE2IDEvNSBcdTlBRDhcdTVFQTZcdUZGMDlcdUZGMUJcdTRFMEJcdTY1QjlcdTY3N0ZcdTU3NTdcdTUzNjBcdTUxNjhcdTVCQkRcdTMwMDJcbiAgY29uc3QgYWxsVGFyZ2V0czogQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgbWV0YTogc3RyaW5nOyBzaGE6IHN0cmluZyB9PiA9IFtdXG4gIGlmIChjb21taXRzRGF0YSAhPT0gbnVsbCkge1xuICAgIGlmICghY29tbWl0c0RhdGEud29ya2luZy5pc0NsZWFuKSB7XG4gICAgICBhbGxUYXJnZXRzLnB1c2goe1xuICAgICAgICBrZXk6ICd3b3JraW5nJyxcbiAgICAgICAgbGFiZWw6IGBcdTI1Q0YgJHt0KCdyZXBvLndvcmtpbmcnKX1cdUZGMDgke2NvbW1pdHNEYXRhLndvcmtpbmcuZmlsZUNvdW50fVx1RkYwOWAsXG4gICAgICAgIG1ldGE6IGNvbW1pdHNEYXRhLndvcmtpbmcuZmlsZXMuc2xpY2UoMCwgMykubWFwKChmaWxlKSA9PiBmaWxlLnBhdGguc3BsaXQoJy8nKS5wb3AoKSkuam9pbignLCAnKSxcbiAgICAgICAgc2hhOiAnd29ya2luZycsXG4gICAgICB9KVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGNvbW1pdCBvZiBjb21taXRzRGF0YS5jb21taXRzKSB7XG4gICAgICBjb25zdCBhZGRzID0gY29tbWl0LmZpbGVzLnJlZHVjZSgoc3VtLCBmaWxlKSA9PiBzdW0gKyBmaWxlLmFkZHMsIDApXG4gICAgICBjb25zdCBkZWxzID0gY29tbWl0LmZpbGVzLnJlZHVjZSgoc3VtLCBmaWxlKSA9PiBzdW0gKyBmaWxlLmRlbHMsIDApXG4gICAgICBhbGxUYXJnZXRzLnB1c2goe1xuICAgICAgICBrZXk6IGNvbW1pdC5zaGEsXG4gICAgICAgIGxhYmVsOiBjb21taXQuc3ViamVjdCxcbiAgICAgICAgbWV0YTogYCR7Y29tbWl0LnNob3J0SGFzaH0gXHUwMEI3ICR7Y29tbWl0LmF1dGhvcn0gXHUwMEI3ICR7bmV3IERhdGUoY29tbWl0LmRhdGUpLnRvTG9jYWxlU3RyaW5nKCl9IFx1MDBCNyArJHthZGRzfS8tJHtkZWxzfWAsXG4gICAgICAgIHNoYTogY29tbWl0LnNoYSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIGNvbnN0IHNob3J0TGFiZWwgPSAoc2hhOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGlmIChzaGEgPT09ICd3b3JraW5nJykgcmV0dXJuIHQoJ3JlcG8ud29ya2luZycpXG4gICAgY29uc3QgdGFyZ2V0ID0gYWxsVGFyZ2V0cy5maW5kKChlbnRyeSkgPT4gZW50cnkuc2hhID09PSBzaGEpXG4gICAgcmV0dXJuIGAkeyh0YXJnZXQ/Lm1ldGEuc3BsaXQoJyBcdTAwQjcgJylbMF0pID8/IHNoYS5zbGljZSgwLCA3KX0gJHt0YXJnZXQ/LmxhYmVsID8/ICcnfWAudHJpbSgpXG4gIH1cbiAgY29uc3QgZmlsdGVyZWRUYXJnZXRzID0gcGlja2VyRmlsdGVyLnRyaW0oKSA9PT0gJydcbiAgICA/IGFsbFRhcmdldHNcbiAgICA6IGFsbFRhcmdldHMuZmlsdGVyKChlbnRyeSkgPT4gKGVudHJ5LmxhYmVsICsgZW50cnkubWV0YSkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhwaWNrZXJGaWx0ZXIudHJpbSgpLnRvTG93ZXJDYXNlKCkpKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdThGNkVcdTZCMjFcdTgwNUFcdTdDN0JcdTRFMEVcdTY3MkFcdTZEODhcdTUzMTZcdTY4MDdcdThCQjAgXHUyNTAwXHUyNTAwIFx1ODA1QVx1N0M3Qlx1ODlDNFx1NTIxOVx1NEUwRVx1NjcwRFx1NTJBMVx1N0FFRiBjbHVzdGVyQ29tbWl0cyBcdTRFMDBcdTgxRjRcdUZGMDhcdTY1RjZcdTk1RjRcdTdBOTdcdTUzRTMgK1xuICAvLyBcdTY1ODdcdTRFRjZcdTk2RjZcdTkxQ0RcdTUzRTBcdUZGMENcdTg5QzEgY29tbWl0LXJvdW5kcy50c1x1RkYwOVx1RkYxQlx1NjcyQVx1NkQ4OFx1NTMxNiA9IFx1NEUwQVx1NkIyMSBBSSBcdTYwM0JcdTdFRDNcdTRFNEJcdTU0MEVcdTc2ODRcdTYzRDBcdTRFQTRcdTMwMDJcbiAgY29uc3QgY29tbWl0QnlTaGEgPSBuZXcgTWFwKChjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSkubWFwKChjb21taXQpID0+IFtjb21taXQuc2hhLCBjb21taXRdKSlcbiAgY29uc3QgbGFzdFN1bW1hcnlBdCA9IG5vdGVzXG4gICAgLmZpbHRlcigobm90ZSkgPT4gbm90ZS5zaGEgPT09ICdzdW1tYXJ5JylcbiAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+IHJpZ2h0LmNyZWF0ZWRBdCAtIGxlZnQuY3JlYXRlZEF0KVswXT8uY3JlYXRlZEF0XG4gIGNvbnN0IGlzVW5kaWdlc3RlZCA9IChjb21taXQ6IHsgc2hhOiBzdHJpbmc7IGRhdGU6IG51bWJlciB9KTogYm9vbGVhbiA9PiB7XG4gICAgaWYgKGNvbW1pdC5zaGEgPT09ICd3b3JraW5nJykgcmV0dXJuIGZhbHNlXG4gICAgLy8gXHU1REYyXHU3NTFGXHU2MjEwXHU4RkM3IEFJIFx1ODlFM1x1OEJGQlx1RkYwOGFuYWx5emVkIFx1NjgwN1x1OEJCMFx1RkYwOVx1NTM3M1x1ODlDNlx1NEUzQVx1NURGMlx1NkQ4OFx1NTMxNlx1RkYxQlx1NTQyNlx1NTIxOVx1NjVCMFx1NEU4RVx1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NzY4NFx1OTBGRFx1N0I5N1x1NjcyQVx1NkQ4OFx1NTMxNlx1MzAwMlxuICAgIGlmIChjb21taXRCeVNoYS5nZXQoY29tbWl0LnNoYSk/LmFuYWx5emVkID09PSB0cnVlKSByZXR1cm4gZmFsc2VcbiAgICByZXR1cm4gbGFzdFN1bW1hcnlBdCA9PT0gdW5kZWZpbmVkIHx8IGNvbW1pdC5kYXRlID4gbGFzdFN1bW1hcnlBdFxuICB9XG4gIGNvbnN0IHVuZGlnZXN0ZWRDb3VudCA9IChjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSkuZmlsdGVyKChjb21taXQpID0+IGlzVW5kaWdlc3RlZChjb21taXQpKS5sZW5ndGhcbiAgY29uc3QgY29tbWl0Um91bmRzID0gY2x1c3RlckludG9Sb3VuZHMoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pXG5cbiAgLyoqIFx1NEUwQlx1NjJDOVx1Njg0Nlx1NzY4NFx1NjNEMFx1NEVBNFx1ODg0Q1x1RkYwOFx1NTQyQlx1NjcyQVx1NkQ4OFx1NTMxNlx1NTcwNlx1NzBCOVx1RkYxQndvcmtpbmcgXHU2NzYxXHU3NkVFXHU0RTBEXHU2ODA3XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHJlbmRlclBpY2tlclJvdyA9IChlbnRyeTogeyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgbWV0YTogc3RyaW5nOyBzaGE6IHN0cmluZyB9KTogUmVhY3QuUmVhY3ROb2RlID0+IHtcbiAgICBjb25zdCBjb21taXQgPSBjb21taXRCeVNoYS5nZXQoZW50cnkuc2hhKVxuICAgIGNvbnN0IHVuZGlnZXN0ZWQgPSBjb21taXQgIT09IHVuZGVmaW5lZCAmJiBpc1VuZGlnZXN0ZWQoY29tbWl0KVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGtleT17ZW50cnkua2V5fVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBhZGRpbmc6ICc3cHggMTJweCcsIGN1cnNvcjogJ3BvaW50ZXInLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgIGJhY2tncm91bmQ6IHNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhlbnRyeS5zaGEpID8gJ3JnYmEoMzcsOTksMjM1LDAuMDcpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgIH19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCB0b2dnbGVUYXJnZXQoZW50cnkuc2hhKSB9fVxuICAgICAgPlxuICAgICAgICA8c3BhbiBzdHlsZT17eyB3aWR0aDogJzE0cHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsIGZvbnRXZWlnaHQ6IDcwMCB9fT5cbiAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKGVudHJ5LnNoYSkgPyAnXHUyNzEzJyA6ICcnfVxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIHt1bmRpZ2VzdGVkICYmIChcbiAgICAgICAgICA8c3BhbiB0aXRsZT17dCgncGlja2VyLnVuZGlnZXN0ZWQnKX0gc3R5bGU9e3sgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JyksIGZvbnRTaXplOiAnMTBweCcsIGZsZXhTaHJpbms6IDAgfX0+XHUyNUNGPC9zcGFuPlxuICAgICAgICApfVxuICAgICAgICA8c3BhbiBzdHlsZT17eyBtaW5XaWR0aDogMCB9fT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT57ZW50cnkubGFiZWx9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PntlbnRyeS5tZXRhfTwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgY29uc3QgaW1wYWN0Umlza0NvbG9yID0gdGhlbWVBd2FyZVRleHQoaW1wYWN0ID09PSBudWxsID8gJyM1NzYwNmEnIDogKFJJU0tfQ09MT1JbaW1wYWN0LnJpc2tMZXZlbF0gPz8gJyM1NzYwNmEnKSlcblxuICBjb25zdCBjb21taXRzVGFiID0gKFxuICAgIDw+XG4gICAgICB7LyogXHU0RUQzXHU1RTkzXHU2ODBGICovfVxuICAgICAgPENhcmQ+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9Pntjb21taXRzRGF0YT8uYnJhbmNoID8/ICdcdTIwMTQnfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnIH19Pntjb21taXRzRGF0YT8ucm9vdFBhdGggPz8gcHJvamVjdD8ucm9vdFBhdGggPz8gJ1x1MjAxNCd9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZENvbW1pdHMoKSB9fT57dCgnYWN0aW9uLnJlZnJlc2gnKX08L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtidXN5ICE9PSBudWxsfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignc2Nhbkhpc3RvcnknLCAnL3Byb2plY3QtY29udHJvbC9hcGkvYm9vdHN0cmFwJywgeyBpbmNsdWRlSGlzdG9yeTogdHJ1ZSwgc3VtbWFyaXplOiB0cnVlLCBtYXhDb21taXRzOiAzMCB9KSB9fVxuICAgICAgICAgID57YnVzeSA9PT0gJ3NjYW5IaXN0b3J5JyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdyZXBvLnNjYW5IaXN0b3J5Jyl9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9DYXJkPlxuICAgICAgey8qIFx1NjNEMFx1NEVBNFx1NTkxQVx1OTAwOVx1NEUwQlx1NjJDOVx1RkYwOFx1N0QyN1x1NTFEMVx1RkYxQlx1OTAwOVx1NEUyRFx1NTE4NVx1NUJCOVx1NUI4Q1x1NjU3NFx1NUM1NVx1NzkzQVx1RkYwQ1x1NTE0MVx1OEJCOFx1ODFFQVx1NzEzNlx1NjM2Mlx1ODg0Q1x1RkYwOSAqL31cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdwaWNrZXIudGl0bGUnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgd2lkdGg6ICcxMDAlJywgdGV4dEFsaWduOiAnbGVmdCcsIGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCB3aGl0ZVNwYWNlOiAnbm9ybWFsJyB9fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRQaWNrZXJPcGVuKCFwaWNrZXJPcGVuKSB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1pbldpZHRoOiAwIH19PlxuICAgICAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgICAgID8gdCgncGlja2VyLnBsYWNlaG9sZGVyJylcbiAgICAgICAgICAgICAgICA6IGAke3QoJ3BpY2tlci5zZWxlY3RlZCcpfSAke3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGh9XHVGRjFBJHtzZWxlY3RlZFRhcmdldHMubWFwKHNob3J0TGFiZWwpLmpvaW4oJ1x1RkYxQicpfWB9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAnOHB4JywgZmxleFNocmluazogMCB9fT5cdTI1QkU8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAge3BpY2tlck9wZW4gJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIHpJbmRleDogMjkgfX0gb25DbGljaz17KCkgPT4geyBzZXRQaWNrZXJPcGVuKGZhbHNlKSB9fSAvPlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJ2NhbGMoMTAwJSArIDRweCknLCBsZWZ0OiAwLCByaWdodDogMCwgekluZGV4OiAzMCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLCBib3hTaGFkb3c6ICcwIDhweCAyNHB4IHJnYmEoMCwwLDAsMC4xMiknLCBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzhweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLmlucHV0fVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dCgncGlja2VyLmZpbHRlcicpfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cGlja2VyRmlsdGVyfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0UGlja2VyRmlsdGVyKGUudGFyZ2V0LnZhbHVlKSB9fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIHsoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLnNvbWUoKGNvbW1pdCkgPT4gaXNVbmRpZ2VzdGVkKGNvbW1pdCkpICYmIChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fVxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdwaWNrZXIudW5kaWdlc3RlZCcpfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2VsZWN0Q29tbWl0cygoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLmZpbHRlcigoY29tbWl0KSA9PiBpc1VuZGlnZXN0ZWQoY29tbWl0KSkubWFwKChjb21taXQpID0+IGNvbW1pdC5zaGEpKSB9fVxuICAgICAgICAgICAgICAgICAgICA+XHUyNUNGIHt0KCdwaWNrZXIuc2VsZWN0QWxsVW5kaWdlc3RlZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgc2V0U2VsZWN0ZWRUYXJnZXRzKFtdKSB9fT57dCgncGlja2VyLmNsZWFyJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXhIZWlnaHQ6IDQyMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XG4gICAgICAgICAgICAgICAgICB7cGlja2VyRmlsdGVyLnRyaW0oKSA9PT0gJycgPyAoXG4gICAgICAgICAgICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gXHU2RDRGXHU4OUM4XHU4OUM2XHU1NkZFXHVGRjFBd29ya2luZyBcdTY3NjFcdTc2RUUgKyBcdTYzMDlcdThGNkVcdTZCMjFcdTUyMDZcdTdFQzRcdTc2ODRcdTYzRDBcdTRFQTRcdUZGMDhcdTUzNTVcdTYzRDBcdTRFQTRcdThGNkVcdTRFMERcdTY2M0VcdTc5M0FcdTdFQzRcdTU5MzRcdUZGMENcdTkwN0ZcdTUxNERcdTU2NkFcdTk3RjNcdUZGMDlcdTMwMDJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlczogUmVhY3QuUmVhY3ROb2RlW10gPSBbXVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtpbmcgPSBhbGxUYXJnZXRzLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5zaGEgPT09ICd3b3JraW5nJylcbiAgICAgICAgICAgICAgICAgICAgICBpZiAod29ya2luZyAhPT0gdW5kZWZpbmVkKSBub2Rlcy5wdXNoKHJlbmRlclBpY2tlclJvdyh3b3JraW5nKSlcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBieVNoYSA9IG5ldyBNYXAoYWxsVGFyZ2V0cy5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5zaGEgIT09ICd3b3JraW5nJykubWFwKChlbnRyeSkgPT4gW2VudHJ5LnNoYSwgZW50cnldKSlcbiAgICAgICAgICAgICAgICAgICAgICBjb21taXRSb3VuZHMuZm9yRWFjaCgocm91bmQsIHJvdW5kSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudHJpZXMgPSByb3VuZC5jb21taXRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKGNvbW1pdCkgPT4gYnlTaGEuZ2V0KGNvbW1pdC5zaGEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IG1ldGE6IHN0cmluZzsgc2hhOiBzdHJpbmcgfSA9PiBlbnRyeSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJpZXMubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyaWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKHJlbmRlclBpY2tlclJvdyhlbnRyaWVzWzBdISkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hhcyA9IGVudHJpZXMubWFwKChlbnRyeSkgPT4gZW50cnkuc2hhKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsU2VsZWN0ZWQgPSBzaGFzLmV2ZXJ5KChzaGEpID0+IHNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhzaGEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2Byb3VuZC0ke3JvdW5kSW5kZXh9YH0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnOHB4JywgcGFkZGluZzogJzZweCAxMnB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwzLCByZ2JhKDUsNSw1LDAuMDYpKScsIGZvbnRTaXplOiAnMTFweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHVEODNEXHVEREQzIHt0KHJvdW5kSW5kZXggPT09IDAgPyAncGlja2VyLnJvdW5kTGF0ZXN0JyA6ICdwaWNrZXIucm91bmQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcocm91bmRJbmRleCArIDEpKX0gXHUwMEI3IHtTdHJpbmcoZW50cmllcy5sZW5ndGgpfSB7dCgncmVwby5jb21taXRzJyl9IFx1MDBCNyB7bmV3IERhdGUocm91bmQuZmlyc3RBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCl9XHUyMDEze25ldyBEYXRlKHJvdW5kLmxhc3RBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNlbGVjdFJvdW5kKHNoYXMpIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2FsbFNlbGVjdGVkID8gdCgncGlja2VyLnJvdW5kQ2xlYXInKSA6IHQoJ3BpY2tlci5yb3VuZFNlbGVjdCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4sXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIG5vZGVzLnB1c2gocmVuZGVyUGlja2VyUm93KGVudHJ5KSlcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2Rlc1xuICAgICAgICAgICAgICAgICAgICB9KSgpXG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZFRhcmdldHMubWFwKChlbnRyeSkgPT4gcmVuZGVyUGlja2VyUm93KGVudHJ5KSlcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7KHBpY2tlckZpbHRlci50cmltKCkgPT09ICcnID8gYWxsVGFyZ2V0cyA6IGZpbHRlcmVkVGFyZ2V0cykubGVuZ3RoID09PSAwICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3BpY2tlci5ub01hdGNoJyl9PC9kaXY+fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luVG9wOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ3BpY2tlci5oaW50Jyl9PC9zcGFuPlxuICAgICAgICAgIHt1bmRpZ2VzdGVkQ291bnQgPiAwICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxzcGFuIHRpdGxlPXt0KCdwaWNrZXIudW5kaWdlc3RlZCcpfSBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSB9fT5cbiAgICAgICAgICAgICAgICBcdTI1Q0Yge3QoJ3BpY2tlci51bmRpZ2VzdGVkQ291bnQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcodW5kaWdlc3RlZENvdW50KSl9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gdGl0bGU9e3QoJ3BpY2tlci5kaWdlc3RBbGxIaW50Jyl9IG9uQ2xpY2s9e2RpZ2VzdEFsbH0+XHUyNkExIHt0KCdwaWNrZXIuZGlnZXN0QWxsJyl9PC9idXR0b24+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHsoZGV0YWlsUXVldWVkQ291bnQgPiAwIHx8IGRldGFpbFJ1bm5pbmdDb3VudCA+IDApICYmIChcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNkY2RjYWEnKX0+XG4gICAgICAgICAgICAgIHtkZXRhaWxSdW5uaW5nQ291bnQgPiAwID8gdCgnZGV0YWlsLmFpTG9hZGluZycpIDogJyd9XG4gICAgICAgICAgICAgIHtkZXRhaWxSdW5uaW5nQ291bnQgPiAwICYmIGRldGFpbFF1ZXVlZENvdW50ID4gMCA/ICcgJyA6ICcnfVxuICAgICAgICAgICAgICB7ZGV0YWlsUXVldWVkQ291bnQgPiAwID8gJ1x1MjNGMyAnICsgdCgnZGV0YWlsLnF1ZXVlZCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhkZXRhaWxRdWV1ZWRDb3VudCkpIDogJyd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NhcmQ+XG5cbiAgICAgIHtjb21taXRzRXJyb3IgIT09IG51bGwgJiYgPENhcmQ+PGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncmVwby5sb2FkRmFpbGVkJyl9OiB7Y29tbWl0c0Vycm9yfTwvZGl2PjwvQ2FyZD59XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCAmJiA8Q2FyZD48ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdkZXRhaWwucGljaycpfTwvZGl2PjwvQ2FyZD59XG5cbiAgICAgIHsvKiBcdTVERTVcdTRGNUNcdThGNkVcdTZCMjFcdTUzRDlcdTRFOEJcdUZGMUFcdTU5MUFcdTYzRDBcdTRFQTRcdTY1NzRcdTRGNTNcdTg5RTNcdThCRkIgKi99XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmZpbHRlcigodGFyZ2V0KSA9PiB0YXJnZXQgIT09ICd3b3JraW5nJykubGVuZ3RoID49IDIgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17J1x1RDgzRFx1RENENiAnICsgdCgnbmFycmF0aXZlLnRpdGxlJyl9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiBuYXJyYXRpdmUgPT09IG51bGwgPyAnMCcgOiAnOHB4JyB9fT5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtuYXJyYXRpdmVCdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZE5hcnJhdGl2ZSgpIH19PlxuICAgICAgICAgICAgICB7bmFycmF0aXZlQnVzeSA/IHQoJ25hcnJhdGl2ZS5ydW5uaW5nJykgOiAnXHUyNzI4ICcgKyB0KCduYXJyYXRpdmUuZ2VuZXJhdGUnKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAge25hcnJhdGl2ZSAhPT0gbnVsbCAmJiBuYXJyYXRpdmUuY2FjaGVkICYmIChcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ2NhY2hlLmhpdCcpfXtuYXJyYXRpdmUuZ2VuZXJhdGVkQXQgIT09IHVuZGVmaW5lZCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShuYXJyYXRpdmUuZ2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ308L3NwYW4+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge25hcnJhdGl2ZSAhPT0gbnVsbCAmJiByZW5kZXJDb3N0QmFkZ2UobmFycmF0aXZlLmNvc3RVc2QsIHQoJ2Nvc3QudG9vbHRpcCcpKX1cbiAgICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17bmFycmF0aXZlQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWROYXJyYXRpdmUodHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtuYXJyYXRpdmVFcnJvciAhPT0gJycgJiYgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuZW1wdHksIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2QxMjQyZicpIH19PntuYXJyYXRpdmVFcnJvcn08L2Rpdj59XG4gICAgICAgICAge25hcnJhdGl2ZSAhPT0gbnVsbCAmJiA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Ub3A6ICc0cHgnIH19Pnt0KCduYXJyYXRpdmUuZGlnZXN0SGludCcpfTwvZGl2Pn1cbiAgICAgICAgICB7bmFycmF0aXZlICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcgfX0+e3JlbmRlclN0cnVjdHVyZWRDb250ZW50KG5hcnJhdGl2ZS5uYXJyYXRpdmUpfTwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBcdTZCQ0ZcdTY3NjFcdTkwMDlcdTRFMkRcdTYzRDBcdTRFQTRcdTc2ODQgQUkgXHU4OUUzXHU4QkZCICovfVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5tYXAoKHRhcmdldCkgPT4ge1xuICAgICAgICBjb25zdCBkID0gZGV0YWlsc1t0YXJnZXRdXG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IChkPy5jb21taXQ/Lm1lc3NhZ2UgPz8gdGFyZ2V0LnNsaWNlKDAsIDgpKVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxDYXJkIGtleT17YGQtJHt0YXJnZXR9YH0gdGl0bGU9e2BcdUQ4M0RcdUREMEQgJHtsYWJlbH0ke3RhcmdldCAhPT0gJ3dvcmtpbmcnID8gYFx1RkYwOCR7dGFyZ2V0LnNsaWNlKDAsIDgpfVx1RkYwOWAgOiAnJ31gfT5cbiAgICAgICAgICAgIHtkICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAge2QuYW5hbHlzaXNDYWNoZWQgPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57dCgnY2FjaGUuaGl0Jyl9e2QuYW5hbHlzaXNHZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShkLmFuYWx5c2lzR2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7cmVuZGVyQ29zdEJhZGdlKGQuYW5hbHlzaXNDb3N0VXNkLCB0KCdjb3N0LnRvb2x0aXAnKSArIChkLmFuYWx5c2lzVG9rZW5zID8gYFx1RkYwOGluICR7ZC5hbmFseXNpc1Rva2Vucy5pbnB1dH0gLyBvdXQgJHtkLmFuYWx5c2lzVG9rZW5zLm91dHB1dH0gdG9rZW5zXHVGRjA5YCA6ICcnKSl9XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBsb2FkRGV0YWlsKHRhcmdldCwgdHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XG4gICAgICAgICAgICAgICAgICB0aXRsZT17dCgnZGV0YWlsLnNhdmVOb3RlSGludCcpfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGEgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/ICd3b3JraW5nJyA6IHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB2b2lkIHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzJywge1xuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBgJHt0KCdkZXRhaWwuc2F2ZU5vdGVUaXRsZScpfVx1RkYxQSR7KGQuY29tbWl0Py5tZXNzYWdlID8/IHRhcmdldCkuc2xpY2UoMCwgNjApfWAsXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDogW2BcdTMwMTBcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDhcdTMwMTFcXG4ke2QuYW5hbHlzaXMud2hhdH1gLCBgXHUzMDEwXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxXHUzMDExXFxuJHsoZC5hbmFseXNpcy5sb2dpYyA/PyBbXSkuam9pbignXHVGRjFCJyl9YCwgYFx1MzAxMFx1OThDRVx1OTY2OVx1NzBCOVx1MzAxMVxcbiR7KGQuYW5hbHlzaXMucmlza3MgPz8gW10pLmpvaW4oJ1x1RkYxQicpfWBdLmZpbHRlcigoYmxvY2spID0+ICFibG9jay5lbmRzV2l0aCgnXHUzMDExXFxuJykpLmpvaW4oJ1xcblxcbicpLFxuICAgICAgICAgICAgICAgICAgICAgIHNoYSwgdGFnczogJ1x1NjgzOFx1NjdFNScsXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHsgb2sgfSkgPT4geyBzZXRBY3Rpb25SZXN1bHQob2sgPyAnXHUyNzEzIFx1NURGMlx1NUI1OFx1NEUzQVx1N0IxNFx1OEJCMFx1RkYwOFx1N0IxNFx1OEJCMFx1OTg3NVx1NTNFRlx1NjdFNVx1NzcwQlx1RkYwOScgOiAnXHUyNzE3IFx1NEZERFx1NUI1OFx1NTkzMVx1OEQyNScpIDsgaWYgKG9rKSB2b2lkIGxvYWROb3RlcygpIH0pXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cdUQ4M0RcdURDQkUge3QoJ2RldGFpbC5zYXZlTm90ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ2RldGFpbC5zYXZlTWVtb3J5SGludCcpfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGEgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/IHVuZGVmaW5lZCA6IHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB2b2lkIHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeScsIHtcbiAgICAgICAgICAgICAgICAgICAgICBtZW1vcnlUeXBlOiAncmlza19ob3RzcG90Jywgc291cmNlVGFnOiAncmV2aWV3JywgYmFzaXNTaGE6IHNoYSxcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogYFx1NjgzOFx1NjdFNVx1N0VEM1x1OEJCQVx1RkYxQSR7KGQuY29tbWl0Py5tZXNzYWdlID8/IHRhcmdldCkuc2xpY2UoMCwgNjApfWAsXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDogW2QuYW5hbHlzaXMud2hhdCwgKGQuYW5hbHlzaXMucmlza3MgPz8gW10pLmpvaW4oJ1x1RkYxQicpXS5maWx0ZXIoKHBhcnQpID0+IHBhcnQgIT09ICcnKS5qb2luKCdcXG4tLS1cXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoeyBvayB9KSA9PiB7IHNldEFjdGlvblJlc3VsdChvayA/ICdcdTI3MTMgXHU1REYyXHU2Qzg5XHU2REMwXHU0RTNBXHU4QkIwXHU1RkM2XHVGRjA4XHU1Rjg1XHU3ODZFXHU4QkE0XHU5NjFGXHU1MjE3XHVGRjA5JyA6ICdcdTI3MTcgXHU0RkREXHU1QjU4XHU1OTMxXHU4RDI1Jyk7IGlmIChvaykgdm9pZCBsb2FkTWVtb3JpZXMoKSB9KVxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XHVEODNFXHVEREUwIHt0KCdkZXRhaWwuc2F2ZU1lbW9yeScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7ZCA9PT0gdW5kZWZpbmVkID8gKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9PntkZXRhaWxTdGF0dXNbdGFyZ2V0XSA9PT0gJ3F1ZXVlZCcgPyAnXHUyM0YzICcgKyB0KCdkZXRhaWwuY2FyZFF1ZXVlZCcpIDogdCgnZGV0YWlsLmFpTG9hZGluZycpfTwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7ZC5jb21taXQgIT09IG51bGwgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmNvbW1pdE1ldGF9PntkLmNvbW1pdC5hdXRob3J9IFx1MDBCNyB7bmV3IERhdGUoZC5jb21taXQuZGF0ZSkudG9Mb2NhbGVTdHJpbmcoKX0gXHUwMEI3IHtkLmZpbGVzLmxlbmd0aH0ge3QoJ2RldGFpbC5maWxlcycpfSBcdTAwQjcgK3tkLmluc2VydGlvbnN9Ly17ZC5kZWxldGlvbnN9PC9kaXY+fVxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLndoYXQgIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnOHB4JyB9fT57dCgnZGV0YWlsLndoYXQnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLndoYXR9PntkLmFuYWx5c2lzLndoYXR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLmxvZ2ljLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnNlY3Rpb25UaXRsZX0+e3QoJ2RldGFpbC5sb2dpYycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5sb2dpYy5tYXAoKHN0ZXAsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3N0eWxlcy5sb2dpY1N0ZXB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLCBmb250V2VpZ2h0OiA2MDAgfX0+e2kgKyAxfS48L3NwYW4+e3N0ZXB9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5yaXNrcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnNnB4JyB9fT57dCgnZGV0YWlsLnJpc2snKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2QuYW5hbHlzaXMucmlza3MubWFwKChyaXNrLCBpKSA9PiA8ZGl2IGtleT17aX0gc3R5bGU9e3sgLi4uc3R5bGVzLnJpc2tJdGVtLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM5YTY3MDAnKSB9fT5cdTI2QTAge3JlbmRlcldpdGhQZWVrKHJpc2spfTwvZGl2Pil9XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHsvKiBcdTY1ODdcdTRFRjZcdTZFMDVcdTUzNTUgKyBcdTkwMTBcdTY1ODdcdTRFRjZcdTlBRDhcdTRFQUVcdTVCRjlcdTZCRDQgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBtYXJnaW5Ub3A6ICcxMHB4JyB9fT57dCgnZGV0YWlsLmZpbGVzJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICB7ZC5maWxlcy5tYXAoKGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0YXJnZXR9fCR7ZmlsZS5wYXRofWBcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXRjaCA9IGZpbGVEaWZmc1trZXldXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2tleX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+e2ZpbGUucGF0aH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzFhN2YzNycpLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT4re2ZpbGUuYWRkc308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NmMjIyZScpLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT4te2ZpbGUuZGVsc308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRGaWxlRGlmZih0YXJnZXQsIGZpbGUucGF0aCkgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwYXRjaCA9PT0gdW5kZWZpbmVkID8gdCgnZGlmZi5zaG93JykgOiB0KCdkaWZmLmhpZGUnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtwYXRjaCAhPT0gdW5kZWZpbmVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtgJHtrZXl9LWRpZmZgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjb2xTcGFuPXs0fSBzdHlsZT17eyAuLi5zdHlsZXMudGQsIHBhZGRpbmc6IDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEaWZmVmlldyBwYXRjaD17cGF0Y2h9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9DYXJkPlxuICAgICAgICApXG4gICAgICB9KX1cblxuICAgICAgey8qIFx1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNFx1RkYxQVx1NjMwOVx1OTRBRSArIFx1OThDRVx1OTY2OVx1Njc4NFx1NjIxMCArIFx1NTkyN1x1NTZGRSArIFx1NUY3MVx1NTRDRFx1NzBCOVx1NjYwRVx1N0VDNiArIFx1OEJCMFx1NUZDNlx1ODA1NFx1NTJBOCAqL31cbiAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdkZXRhaWwuaW1wYWN0Jyl9PlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtpbXBhY3RMb2FkaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZEltcGFjdCgpIH19PlxuICAgICAgICAgICAge2ltcGFjdExvYWRpbmcgPyB0KCdkZXRhaWwuaW1wYWN0TG9hZGluZycpIDogdCgnZGV0YWlsLmltcGFjdCcpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIHtpbXBhY3QgIT09IG51bGwgJiYgaW1wYWN0LmV4cGxhbmF0aW9uc0NhY2hlZCA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoJyM4YjhiOGInKSwgbWFyZ2luTGVmdDogJzhweCcgfX0+XG4gICAgICAgICAgICAgIHt0KCdjYWNoZS5oaXQnKX17aW1wYWN0LmdlbmVyYXRlZEF0ID8gJyBcdTAwQjcgJyArIG5ldyBEYXRlKGltcGFjdC5nZW5lcmF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKSA6ICcnfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiByZW5kZXJDb3N0QmFkZ2UoaW1wYWN0LmV4cGxhbmF0aW9uc0Nvc3RVc2QsIHQoJ2Nvc3QudG9vbHRpcCcpKX1cbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgbWFyZ2luTGVmdDogJzhweCcsIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17aW1wYWN0TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJbXBhY3QodHJ1ZSkgfX0+XG4gICAgICAgICAgICAgIHt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtpbXBhY3QgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICcxMHB4JywgbWFyZ2luOiAnMTBweCAwIDRweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKGltcGFjdFJpc2tDb2xvciksIGZvbnRTaXplOiAnMTNweCcsIHBhZGRpbmc6ICczcHggMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICB7dCgnaW1wYWN0LnJpc2snKX06IHtpbXBhY3Qucmlza0xldmVsfVx1RkYwOHtpbXBhY3Qucmlza1Njb3JlfVx1RkYwOVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7aW1wYWN0LmtleUNoYW5nZVBvaW50cyAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5rZXlDaGFuZ2VQb2ludHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM5YTY3MDAnKSB9fT5cdTI2QTAge3QoJ2ltcGFjdC5rZXlQb2ludHMnKX06IHtpbXBhY3Qua2V5Q2hhbmdlUG9pbnRzLm1hcCgoZmlsZSkgPT4gZmlsZS5zcGxpdCgnLycpLnBvcCgpKS5qb2luKCdcdTMwMDEnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHtpbXBhY3Qucmlza0ZhY3RvcnMgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3Qucmlza0ZhY3RvcnMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zZWN0aW9uVGl0bGV9Pnt0KCdpbXBhY3QuZmFjdG9ycycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICcycHgnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAge2ltcGFjdC5yaXNrRmFjdG9ycy5tYXAoKGZhY3RvciwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGZvbnRTaXplOiAnMTJweCcsIHBhZGRpbmc6ICczcHggOHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGJvcmRlclJhZGl1czogJzRweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57ZmFjdG9yLnRleHR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IGltcGFjdFJpc2tDb2xvciwgZm9udFdlaWdodDogNjAwIH19Pit7ZmFjdG9yLnBvaW50c308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDxJbXBhY3RHcmFwaCBkYXRhPXtpbXBhY3R9IHQ9e3R9IC8+XG4gICAgICAgICAgICAgIHtpbXBhY3QubGV2ZWxzLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdpbXBhY3Qubm9uZScpfTwvZGl2Pn1cbiAgICAgICAgICAgICAgey8qIFx1NTFGRFx1NjU3MFx1N0VBN1x1NUY3MVx1NTRDRFx1RkYxQVx1NjcyQ1x1NkIyMVx1NEZFRVx1NjUzOVx1NEU4Nlx1NTRFQVx1NEU5Qlx1NTFGRFx1NjU3MFx1MzAwMVx1NkNFMlx1NTNDQVx1NEU4Nlx1OEMwMVx1NzY4NFx1NTRFQVx1NEU5Qlx1NTFGRFx1NjU3MFx1MzAwMVx1OEMwM1x1NzUyOFx1NzBCOVx1NTcyOFx1NTRFQSAqL31cbiAgICAgICAgICAgICAge2ltcGFjdC5mdW5jdGlvbkltcGFjdCAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5mdW5jdGlvbkltcGFjdC5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBtYXJnaW5Ub3A6ICcxMnB4JyB9fT57dCgnaW1wYWN0LmZ1bmN0aW9ucycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICc4cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICB7aW1wYWN0LmZ1bmN0aW9uSW1wYWN0Lm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZW50cnkuc3ltYm9sfSBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnI2Q5NzcwNicpfT57ZW50cnkuc3ltYm9sfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmxhYmVsLCBtYXJnaW5MZWZ0OiAnOHB4JyB9fT57ZW50cnkuZGVmaW5lZElufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LnJvbGUgIT09IHVuZGVmaW5lZCAmJiBlbnRyeS5yb2xlICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQsIG1hcmdpblRvcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT57dCgnaW1wYWN0LmZ1bmNSb2xlJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5yb2xlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2hhbmdlICE9PSB1bmRlZmluZWQgJiYgZW50cnkuY2hhbmdlICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzlhNjcwMCcpIH19Pnt0KCdpbXBhY3QuZnVuY0NoYW5nZScpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuaW1wYWN0ICE9PSB1bmRlZmluZWQgJiYgZW50cnkuaW1wYWN0ICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NlOTE3OCcpIH19Pnt0KCdpbXBhY3QuZnVuY0NhbGxlcnMnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmltcGFjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNhbGxlcnMubWFwKChjYWxsZXIsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7IC4uLnN0eWxlcy5sb2dpY1N0ZXAsIG1hcmdpblRvcDogJzNweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JykgfX0+XHUyMUIzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY3Vyc29yOiAncG9pbnRlcicsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lIGRvdHRlZCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG9wZW5QZWVrKGNhbGxlci5maWxlLCBOdW1iZXIoY2FsbGVyLmxpbmUpKSB9fT57Y2FsbGVyLmZpbGV9OntjYWxsZXIubGluZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Plx1MjAxNCB7Y2FsbGVyLnNuaXBwZXQuc2xpY2UoMCwgODApfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge2ltcGFjdC5mdW5jdGlvbkltcGFjdCAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5mdW5jdGlvbkltcGFjdC5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2ltcGFjdC5mdW5jdGlvbnNOb25lJyl9PC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHtpbXBhY3QubWVtb3JpZXMgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3QubWVtb3JpZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxMHB4JywgcGFkZGluZzogJzhweCAxMHB4JywgYm9yZGVyOiAnMXB4IGRhc2hlZCByZ2JhKDM3LDk5LDIzNSwwLjM1KScsIGJvcmRlclJhZGl1czogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT57dCgnaW1wYWN0Lm1lbW9yeScpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhXcmFwOiAnd3JhcCcsIGdhcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpbXBhY3QubWVtb3JpZXMubWFwKChtZW1vcnksIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e2l9IHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyMyNTYzZWInKX0+e21lbW9yeS50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuXG4gICAgICB7LyogXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHVGRjFBXHU3RUQzXHU4QkJBICsgXHU3RUQzXHU2Nzg0XHU1MzE2XHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1ICovfVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgPENhcmQgdGl0bGU9e3QoJ2RldGFpbC5vcHRpbWFsaXR5Jyl9PlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtyZXZpZXdMb2FkaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJldmlld3MoKSB9fT5cbiAgICAgICAgICAgIHtyZXZpZXdMb2FkaW5nID8gdCgnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJykgOiB0KCdkZXRhaWwub3B0aW1hbGl0eScpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubWFwKCh0YXJnZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSByZXZpZXdzW3RhcmdldF1cbiAgICAgICAgICAgIGlmIChyID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsXG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRhcmdldCA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiB0YXJnZXQuc2xpY2UoMCwgOClcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtgci0ke3RhcmdldH1gfSBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgICAgICAgICB7ci5jYWNoZWQgPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9Pnt0KCdjYWNoZS5oaXQnKX17ci5nZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShyLmdlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIHtyZW5kZXJDb3N0QmFkZ2Uoci5jb3N0VXNkLCB0KCdjb3N0LnRvb2x0aXAnKSl9XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJldmlld3ModHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7ci52ZXJkaWN0ICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wNSknLCBib3JkZXI6ICcxcHggc29saWQgcmdiYSgzNyw5OSwyMzUsMC4yKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMTBweCcgfX0+e3IudmVyZGljdH08L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtyLmlzc3VlTGlzdCAhPT0gdW5kZWZpbmVkICYmIHIuaXNzdWVMaXN0Lmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dHI+e1sncmV2aWV3LmNvbC5zZXZlcml0eScsICdyZXZpZXcuY29sLmNhdGVnb3J5JywgJ3Jldmlldy5jb2wudGl0bGUnLCAncmV2aWV3LmNvbC5ldmlkZW5jZScsICdyZXZpZXcuY29sLmZpeCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICB7ci5pc3N1ZUxpc3QubWFwKChpc3N1ZSwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKGlzc3VlLnNldmVyaXR5ID09PSAnY3JpdGljYWwnID8gJyNmMTRjNGMnIDogaXNzdWUuc2V2ZXJpdHkgPT09ICdoaWdoJyA/ICcjY2U5MTc4JyA6IGlzc3VlLnNldmVyaXR5ID09PSAnbWVkaXVtJyA/ICcjZGNkY2FhJyA6ICcjNTY5Y2Q2Jyl9Pntpc3N1ZS5zZXZlcml0eX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntpc3N1ZS5jYXRlZ29yeX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2lzc3VlLnRpdGxlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19Pntpc3N1ZS5ldmlkZW5jZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2lzc3VlLmZpeH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3Jldmlldy5jbGVhbicpfTwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pfVxuICAgICAgICAgIHtyZXZpZXdMb2FkaW5nICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZycpfTwvZGl2Pn1cbiAgICAgICAgICB7IXJldmlld0xvYWRpbmcgJiYgc2VsZWN0ZWRUYXJnZXRzLmV2ZXJ5KCh0YXJnZXQpID0+IHJldmlld3NbdGFyZ2V0XSA9PT0gdW5kZWZpbmVkKSAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXZpZXcuaGludCcpfTwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG4gICAgPC8+XG4gIClcblxuICAvLyBcdTI1MDBcdTI1MDAgXHU4QkJFXHU3RjZFXHU5ODc1XHU3QjdFIFx1MjUwMFx1MjUwMFxuICBjb25zdCBUSUVSX0xBQkVMUzogQXJyYXk8eyBrZXk6IHN0cmluZzsgemg6IHN0cmluZzsgZGVzYzogc3RyaW5nIH0+ID0gW1xuICAgIHsga2V5OiAnc3RhbmRhcmQnLCB6aDogJ1x1ODlFM1x1OEJGQiAvIFx1NTFGRFx1NjU3MFx1NUY3MVx1NTRDRFx1OEJGNFx1NjYwRScsIGRlc2M6ICdcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTc2ODQgQUkgXHU4OUUzXHU4QkZCXHUzMDAxXHU1RjcxXHU1NENEXHU1MjA2XHU2NzkwJyB9LFxuICAgIHsga2V5OiAncmVhc29uaW5nJywgemg6ICdcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTUgLyBcdTYyNjdcdTg4NENcdThCQTFcdTUyMTInLCBkZXNjOiAnXHU4QkM0XHU1QkExXHUzMDAxXHU4QkExXHU1MjEyXHU3NTFGXHU2MjEwXHUzMDAxQUkgXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzJyB9LFxuICAgIHsga2V5OiAnZmFzdCcsIHpoOiAnXHU1Mzg2XHU1M0YyXHU4RjdCXHU2NzkwJywgZGVzYzogJ1x1NjI2Qlx1NjNDRlx1NTM4Nlx1NTNGMlx1NjVGNlx1NzY4NFx1OTAxMFx1NjNEMFx1NEVBNFx1NEUwMFx1NTNFNVx1OEJERCcgfSxcbiAgICB7IGtleTogJ3ZlcmlmaWVyJywgemg6ICdcdTlBOENcdTY1MzYnLCBkZXNjOiAnXHU2NTM5XHU1MkE4XHU5QThDXHU2NTM2XHU3Njg0IEFJIFx1NTkwRFx1NjgzOCcgfSxcbiAgXVxuXG4gIGNvbnN0IHNldHRpbmdzVGFiID0gKFxuICAgIDw+XG4gICAgICB7LyogXHU2QTIxXHU1NzhCXHU1MjA2XHU5MTREXHVGRjFBXHU1M0VGXHU4OUM2XHU1MzE2XHU1MjA3XHU2MzYyXHU1NDA0XHU0RUZCXHU1MkExXHU3NTI4XHU3Njg0XHU2QTIxXHU1NzhCXHVGRjBDXHU0RkREXHU1QjU4XHU1MzczXHU3NTFGXHU2NTQ4ICovfVxuICAgICAgPENhcmQgdGl0bGU9e3QoJ21vZGVsLnRpdGxlJyl9PlxuICAgICAgICB7bW9kZWxUaWVycyA9PT0gbnVsbCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdtb2RlbC5sb2FkaW5nJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIHtUSUVSX0xBQkVMUy5tYXAoKHRpZXIpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IG1vZGVsVGllcnNbdGllci5rZXldXG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3VycmVudCA/IGN1cnJlbnQucHJvdmlkZXIgKyAnLycgKyBjdXJyZW50Lm1vZGVsIDogJydcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17dGllci5rZXl9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWluV2lkdGg6IDE1MCwgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwIH19Pnt0aWVyLnpofTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6IDI0MCB9fVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHYgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgIGlmICh2ID09PSAnJykgeyBzZXRNb2RlbFRpZXJzKHsgLi4ubW9kZWxUaWVycywgW3RpZXIua2V5XTogeyBwcm92aWRlcjogJycsIG1vZGVsOiAnJyB9IH0pOyByZXR1cm4gfVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtwcm92aWRlciwgLi4ucmVzdF0gPSB2LnNwbGl0KCcvJylcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IHJlc3Quam9pbignLycpXG4gICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZWxUaWVycyh7IC4uLm1vZGVsVGllcnMsIFt0aWVyLmtleV06IHsgcHJvdmlkZXIsIG1vZGVsIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt0KCdtb2RlbC5mb2xsb3dDaGF0Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIHttb2RlbE9wdGlvbnMubWFwKChvcHRpb24pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfSB2YWx1ZT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRpb24ucHJvdmlkZXJ9IC8ge29wdGlvbi5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3RpZXIuZGVzY308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc4cHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknIH19PlxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+XHVEODNFXHVERDE2IHt0KCdmaXgubW9kZWxUaXRsZScpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgbWluPXsxfVxuICAgICAgICAgICAgICAgIG1heD17MTB9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCB3aWR0aDogNjQsIHRleHRBbGlnbjogJ2NlbnRlcicgfX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17Zml4Q29uY3VycmVuY3l9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldEZpeENvbmN1cnJlbmN5KGUudGFyZ2V0LnZhbHVlKSB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnZml4Lm1vZGVsSGludCcpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17bW9kZWxTYXZpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzYXZlTW9kZWxDb25maWcoKSB9fT5cbiAgICAgICAgICAgICAgICB7bW9kZWxTYXZpbmcgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnbW9kZWwuc2F2ZScpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAge21vZGVsU2F2ZWQgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzRlYzliMCcpfT57dCgnbW9kZWwuc2F2ZWQnKX08L3NwYW4+fVxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnbW9kZWwuaGludCcpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgICAgPGRpdiBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC10ZXJ0aWFyeSwgIzljYTNhZiknLCBwYWRkaW5nOiAnOHB4IDAnIH19PlxuICAgICAgICBkc2gtcHJvamVjdC1jb250cm9sIHZ7c3RhdGU/LnBsdWdpblZlcnNpb24gPz8gJz8nfVxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gIClcblxuICBjb25zdCBvdmVydmlld1RhYiA9IChcbiAgICA8PlxuICAgICAgPENhcmQ+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtib290c3RyYXBwaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQm9vdHN0cmFwKCkgfX0+XG4gICAgICAgICAgICB7Ym9vdHN0cmFwcGluZyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24ucmVzY2FuJyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGx9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2FuYWx5emUnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvYW5hbHl6ZScsIHt9KSB9fT5cbiAgICAgICAgICAgIHtidXN5ID09PSAnYW5hbHl6ZScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLmFuYWx5emUnKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbH0gb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbigndmVyaWZ5JywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3ZlcmlmeScsIHt9KSB9fT5cbiAgICAgICAgICAgIHtidXN5ID09PSAndmVyaWZ5JyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24udmVyaWZ5Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9DYXJkPlxuICAgICAge3Jlc3VsdFBhbmVsfVxuICAgICAge3Byb2plY3QgPT09IG51bGwgPyAoXG4gICAgICAgIDxDYXJkPlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEzcHgnLCBtYXJnaW5Cb3R0b206ICc2cHgnIH19Pnt0KCdzdGF0ZS5ub1Byb2plY3QnKX08L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdzdGF0ZS5ub1Byb2plY3RIaW50Jyl9PC9kaXY+XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXtgJHt0KCdzdGF0ZS5wcm9qZWN0Jyl9XHVGRjFBJHtwcm9qZWN0Lm5hbWV9YH0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT5Sb290PC9zcGFuPntwcm9qZWN0LnJvb3RQYXRofTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7Ym9vdHN0cmFwICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS50ZWNoU3RhY2snKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7Ym9vdHN0cmFwLnRlY2hTdGFjay5tYXAoKHRlY2gpID0+IDxzcGFuIGtleT17dGVjaH0gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzRlYzliMCcpfT57dGVjaH08L3NwYW4+KX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUuc3ltYm9scycpfTwvc3Bhbj57U3RyaW5nKGJvb3RzdHJhcC5zeW1ib2xzQ291bnQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUubWFuaWZlc3RzJyl9PC9zcGFuPntTdHJpbmcoYm9vdHN0cmFwLm1hbmlmZXN0RmlsZXMubGVuZ3RoKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLmV2aWRlbmNlJyl9PC9zcGFuPntTdHJpbmcoc3RhdGU/LmV2aWRlbmNlQ291bnQgPz8gMCl9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luVG9wOiAnOHB4JyB9fT57Ym9vdHN0cmFwLnN1bW1hcnl9PC9kaXY+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2NvbmZpcm1lZC50aXRsZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPXsyfSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSBwbGFjZWhvbGRlcj17dCgnY29uZmlybWVkLnRleHQnKX0gdmFsdWU9e2NvbmZpcm1lZFRleHR9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDb25maXJtZWRUZXh0KGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnY29uZmlybWVkLnBhdGhzJyl9IHZhbHVlPXtjb25maXJtZWRQYXRoc30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENvbmZpcm1lZFBhdGhzKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuYnV0dG9ufVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgY29uZmlybWVkVGV4dCA9PT0gJyd9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdhZGRDb25maXJtZWQnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY29uZmlybWVkJywgeyB0eXBlOiAnY29uc3RyYWludCcsIHRleHQ6IGNvbmZpcm1lZFRleHQsIGZvcmJpZGRlblBhdGhzOiBjb25maXJtZWRQYXRocy5zcGxpdCgnLCcpLm1hcCgocGF0aCkgPT4gcGF0aC50cmltKCkpLmZpbHRlcigocGF0aCkgPT4gcGF0aCAhPT0gJycpIH0pLnRoZW4oKCkgPT4geyBzZXRDb25maXJtZWRUZXh0KCcnKTsgc2V0Q29uZmlybWVkUGF0aHMoJycpIH0pIH19XG4gICAgICAgICAgPntidXN5ID09PSAnYWRkQ29uZmlybWVkJyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdjb25maXJtZWQuYWRkJyl9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7Y29uZmlybWVkLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdjb25maXJtZWQubm9uZScpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge2NvbmZpcm1lZC5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtpdGVtLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjYzU4NmMwJyl9PntpdGVtLnR5cGV9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2l0ZW0udGV4dH08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntpdGVtLmZvcmJpZGRlblBhdGhzLmpvaW4oJywgJykgfHwgJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3JlbW92ZUNvbmZpcm1lZCcsICcvcHJvamVjdC1jb250cm9sL2FwaS9jb25maXJtZWQvcmVtb3ZlJywgeyBpZDogaXRlbS5pZCB9KSB9fVxuICAgICAgICAgICAgICAgICAgICA+XHUyNzE1PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0uY2hhbmdlVGl0bGUnKX0gdmFsdWU9e2NoYW5nZVRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q2hhbmdlVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHRleHRhcmVhIHJvd3M9ezJ9IHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLmNoYW5nZURlc2MnKX0gdmFsdWU9e2NoYW5nZURlc2N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDaGFuZ2VEZXNjKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuYnV0dG9ufVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgY2hhbmdlVGl0bGUgPT09ICcnfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignY3JlYXRlQ2hhbmdlJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NoYW5nZXMnLCB7IHRpdGxlOiBjaGFuZ2VUaXRsZSwgZGVzY3JpcHRpb246IGNoYW5nZURlc2MgfSkudGhlbigoKSA9PiB7IHNldENoYW5nZVRpdGxlKCcnKTsgc2V0Q2hhbmdlRGVzYygnJykgfSkgfX1cbiAgICAgICAgICA+e2J1c3kgPT09ICdjcmVhdGVDaGFuZ2UnID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtjaGFuZ2VzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdzdGF0ZS5ub0NoYW5nZXMnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57WydjaGFuZ2VzLmNvbC50aXRsZScsICdjaGFuZ2VzLmNvbC50eXBlJywgJ2NoYW5nZXMuY29sLnN0YXR1cycsICdjaGFuZ2VzLmNvbC51cGRhdGVkJ10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtjaGFuZ2VzLm1hcCgoY2hhbmdlKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17Y2hhbmdlLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Y2hhbmdlLnRpdGxlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShjaGFuZ2Uuc3RhdHVzID09PSAnY29tcGxldGVkJyA/ICcjNGVjOWIwJyA6ICcjNTY5Y2Q2Jyl9PntjaGFuZ2Uuc3RhdHVzfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntmb3JtYXRUaW1lKGNoYW5nZS51cGRhdGVkQXQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyh7IHRpdGxlOiAnXHU1MjIwXHU5NjY0XHU4RkQ5XHU0RTJBXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExXHVGRjFGJywgbWVzc2FnZTogJ1x1MzAwQycgKyBjaGFuZ2UudGl0bGUgKyAnXHUzMDBEXHU1M0NBXHU1MTc2XHU1MTY4XHU5MEU4XHU2MjY3XHU4ODRDXHU4QkIwXHU1RjU1XHUzMDAxXHU4QkExXHU1MjEyXHUzMDAxXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHU1QzA2XHU4OEFCXHU2QzM4XHU0RTQ1XHU1MjIwXHU5NjY0XHUzMDAyJywgZGFuZ2VyOiB0cnVlLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2RlbGV0ZUNoYW5nZScsICcvcHJvamVjdC1jb250cm9sL2FwaS9jaGFuZ2VzL2RlbGV0ZScsIHsgaWQ6IGNoYW5nZS5pZCB9KSB9IH0pIH19Plx1MjcxNTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICA8Lz5cbiAgKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdTk4NzVcdTdCN0VcdUZGMUFcdTk4NzVcdTk3NjJcdTc2RjRcdTYzQTVcdTUyMUJcdTVFRkFcdTVFNzZcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMENcdTgwNEFcdTU5MjlcdTUzRUFcdTY2MkZcdTUzRTZcdTRFMDBcdTc5Q0RcdTUxNjVcdTUzRTMgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IGV4ZWN1dGlvblRhYiA9IChcbiAgICA8PlxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGZsZXhXcmFwOiAnd3JhcCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICcxMHB4JywgcGFkZGluZzogJzdweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMzcsOTksMjM1LDAuMiknLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICA8Yj5cdTI0NjAge3QoJ2V4ZWMuZmxvd0NyZWF0ZScpfTwvYj48c3Bhbj5cdTIxOTI8L3NwYW4+XG4gICAgICAgIDxiPlx1MjQ2MSB7dCgnZXhlYy5mbG93T3JjaGVzdHJhdGUnKX08L2I+PHNwYW4+XHUyMTkyPC9zcGFuPlxuICAgICAgICA8Yj5cdTI0NjIge3QoJ2V4ZWMuZmxvd1J1bicpfTwvYj48c3Bhbj5cdTIxOTI8L3NwYW4+XG4gICAgICAgIDxiPlx1MjQ2MyB7dCgnZXhlYy5mbG93TWVtb3J5Jyl9PC9iPlxuICAgICAgPC9kaXY+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnZXhlYy5jcmVhdGUnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtSW5saW5lfT5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCBmbGV4OiAxLCBtaW5XaWR0aDogMjAwIH19IHBsYWNlaG9sZGVyPXt0KCdleGVjLmZvcm1UaXRsZScpfSB2YWx1ZT17ZXhlY1RpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RXhlY1RpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17ZXhlY01vZGVsfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RXhlY01vZGVsKGUudGFyZ2V0LnZhbHVlKSB9fSB0aXRsZT17dCgncGxhbi5tb2RlbERlZmF1bHQnKX0+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e3QoJ2V4ZWMubW9kZWxEZWZhdWx0Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICB7KG1vZGVsT3B0aW9ucyA/PyBbXSkubWFwKChvcHRpb24pID0+IDxvcHRpb24ga2V5PXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9IHZhbHVlPXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9PntvcHRpb24ucHJvdmlkZXJ9L3tvcHRpb24uaWR9PC9vcHRpb24+KX1cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcm93cz17M30gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybURlc2MnKX0gdmFsdWU9e2V4ZWNEZXNjfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RXhlY0Rlc2MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmFjdGlvblJvd30+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBleGVjVGl0bGUudHJpbSgpID09PSAnJyB8fCBleGVjRGVzYy50cmltKCkgPT09ICcnfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc3RhcnRSdW4oKSB9fT5cbiAgICAgICAgICAgICAge2J1c3kgPT09ICdzdGFydFJ1bicgPyB0KCdleGVjLnBsYW5uaW5nJykgOiB0KCdleGVjLnN0YXJ0Jyl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdleGVjLmNyZWF0ZUhpbnQnKX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9DYXJkPlxuICAgICAge3Jlc3VsdFBhbmVsfVxuICAgICAge3BsYW5Db25maXJtICE9PSBudWxsICYmIChcbiAgICAgICAgPENhcmQgdGl0bGU9e3QoJ3BsYW4udGl0bGUnKX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT57dCgncGxhbi5oaW50Jyl9PC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0cj57WydwbGFuLmNvbC5zdGVwJywgJ3BsYW4uY29sLnJvbGUnLCAncGxhbi5jb2wubW9kZWwnLCAncGxhbi5jb2wucG9saWN5JywgJ3BsYW4uY29sLmVuYWJsZWQnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAge3BsYW5Db25maXJtLnN0ZXBzLm1hcCgoc3RlcCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e3N0ZXAuaWR9IHN0eWxlPXt7IG9wYWNpdHk6IHN0ZXAuZW5hYmxlZCA/IDEgOiAwLjQ1IH19PlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBtaW5XaWR0aDogMjIwIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFdlaWdodDogNjAwIH19PntpbmRleCArIDF9LiB7c3RlcC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PntzdGVwLmRlc2NyaXB0aW9uLnNsaWNlKDAsIDEyMCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAge3N0ZXAudGFyZ2V0RmlsZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJyB9fT57c3RlcC50YXJnZXRGaWxlcy5qb2luKCcsICcpLnNsaWNlKDAsIDEyMCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJywgcGFkZGluZzogJzNweCA2cHgnIH19IHZhbHVlPXtzdGVwLnJvbGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0UGxhbkNvbmZpcm0oeyAuLi5wbGFuQ29uZmlybSwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzLm1hcCgoaXRlbSwgaSkgPT4gaSA9PT0gaW5kZXggPyB7IC4uLml0ZW0sIHJvbGU6IGUudGFyZ2V0LnZhbHVlIH0gOiBpdGVtKSB9KSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtbJ2FuYWx5c2lzJywgJ3BsYW5uaW5nJywgJ2NvZGluZycsICdvcHMnLCAndmVyaWZpY2F0aW9uJ10ubWFwKChyb2xlKSA9PiA8b3B0aW9uIGtleT17cm9sZX0gdmFsdWU9e3JvbGV9PntST0xFX0xBQkVMU1tyb2xlXSA/PyByb2xlfTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggNnB4JyB9fSB2YWx1ZT17c3RlcC5tb2RlbFByb3ZpZGVyICsgJy8nICsgc3RlcC5tb2RlbElkfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtwcm92aWRlciwgbW9kZWxdID0gZS50YXJnZXQudmFsdWUuc3BsaXQoJy8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRQbGFuQ29uZmlybSh7IC4uLnBsYW5Db25maXJtLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMubWFwKChpdGVtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4uaXRlbSwgbW9kZWxQcm92aWRlcjogcHJvdmlkZXIgPz8gJycsIG1vZGVsSWQ6IG1vZGVsID8/ICcnIH0gOiBpdGVtKSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiL1wiPnt0KCdwbGFuLm1vZGVsRGVmYXVsdCcpfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAge21vZGVsT3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gPG9wdGlvbiBrZXk9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0gdmFsdWU9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0+e29wdGlvbi5wcm92aWRlcn0ve29wdGlvbi5pZH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDZweCcgfX0gdmFsdWU9e3N0ZXAuZmFpbHVyZVBvbGljeX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRQbGFuQ29uZmlybSh7IC4uLnBsYW5Db25maXJtLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMubWFwKChpdGVtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4uaXRlbSwgZmFpbHVyZVBvbGljeTogZS50YXJnZXQudmFsdWUgfSA6IGl0ZW0pIH0pIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKFBPTElDWV9MQUJFTFMpLm1hcCgoW3ZhbHVlLCBsYWJlbF0pID0+IDxvcHRpb24ga2V5PXt2YWx1ZX0gdmFsdWU9e3ZhbHVlfT57bGFiZWx9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtzdGVwLmVuYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0UGxhbkNvbmZpcm0oeyAuLi5wbGFuQ29uZmlybSwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzLm1hcCgoaXRlbSwgaSkgPT4gaSA9PT0gaW5kZXggPyB7IC4uLml0ZW0sIGVuYWJsZWQ6IGUudGFyZ2V0LmNoZWNrZWQgfSA6IGl0ZW0pIH0pIH19IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgbWFyZ2luVG9wOiAnMTBweCcgfX0+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17cGxhbkJ1c3l9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsYXVuY2hQbGFuKHRydWUpIH19PntwbGFuQnVzeSA/ICdcdTIwMjYnIDogdCgncGxhbi5sYXVuY2hFZGl0ZWQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtwbGFuQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxhdW5jaFBsYW4oZmFsc2UpIH19Pnt0KCdwbGFuLmxhdW5jaERpcmVjdCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e3BsYW5CdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBsYW5Db25maXJtKG51bGwpIH19Pnt0KCdwbGFuLmRpc2NhcmQnKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cbiAgICAgIDxDYXJkPlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cbiAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnZXhlYy5hdHRlbXB0cycpfTwvc3Bhbj57U3RyaW5nKHN0YXRlPy5hdHRlbXB0c0NvdW50ID8/IDApfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtydW5zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdzdGF0ZS5ub1J1bnMnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ2V4ZWMuY29sLmNoYW5nZScsICdleGVjLmNvbC5zdGVwcycsICdleGVjLmNvbC5zdGF0dXMnLCAnZXhlYy5jb2wuc3RhcnRlZCcsICdleGVjLmNvbC5jb3N0JywgJ2V4ZWMuY29sLmRldGFpbCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7cnVucy5tYXAoKHJ1bikgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3J1bi5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+eyhjaGFuZ2VzLmZpbmQoKGNoYW5nZSkgPT4gY2hhbmdlLmlkID09PSBydW4uY2hhbmdlSWQpPy50aXRsZSkgPz8gcnVuLmNoYW5nZUlkfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3J1bi5zdGVwc1RvdGFsID8gKHJ1bi5zdGVwc0RvbmUgPz8gMCkgKyAnLycgKyBydW4uc3RlcHNUb3RhbCA6ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UocnVuLnN0YXR1cyA9PT0gJ3N1Y2NlZWRlZCcgfHwgcnVuLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgPyAnIzRlYzliMCcgOiBydW4uc3RhdHVzID09PSAnZmFpbGVkJyA/ICcjZjE0YzRjJyA6IHJ1bi5zdGF0dXMgPT09ICdwYXVzZWQnID8gJyNkOTc3MDYnIDogJyNkY2RjYWEnKX0+e1JVTl9TVEFUVVNfTEFCRUxTW3J1bi5zdGF0dXNdID8/IHJ1bi5zdGF0dXN9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICB7cnVuLmN1cnJlbnRTdGVwICE9PSBudWxsICYmIHJ1bi5jdXJyZW50U3RlcCAhPT0gdW5kZWZpbmVkICYmIHJ1bi5zdGF0dXMgPT09ICdydW5uaW5nJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWF4V2lkdGg6IDE2MCwgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19PntydW4uY3VycmVudFN0ZXB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntmb3JtYXRUaW1lKHJ1bi5zdGFydGVkQXQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3J1bi5jb3N0VXNkICE9PSB1bmRlZmluZWQgPyAnJCcgKyBydW4uY29zdFVzZC50b0ZpeGVkKDQpIDogJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSdW5EZXRhaWwocnVuLmlkKSB9fT57cnVuRGV0YWlsPy5ydW4uaWQgPT09IHJ1bi5pZCA/IHQoJ3BsYW4ucmVmcmVzaERldGFpbCcpIDogdCgncGxhbi52aWV3RGV0YWlsJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgICAge3J1bkRldGFpbCAhPT0gbnVsbCAmJiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdwbGFuLmRldGFpbFRpdGxlJykgKyAnIFx1MDBCNyAnICsgcnVuRGV0YWlsLnJ1bi5jaGFuZ2VUaXRsZX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ3N1Y2NlZWRlZCcgfHwgcnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdjb21wbGV0ZWQnID8gJyM0ZWM5YjAnIDogcnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdmYWlsZWQnID8gJyNmMTRjNGMnIDogcnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdwYXVzZWQnID8gJyNkOTc3MDYnIDogJyNkY2RjYWEnKX0+e1JVTl9TVEFUVVNfTEFCRUxTW3J1bkRldGFpbC5ydW4uc3RhdHVzXSA/PyBydW5EZXRhaWwucnVuLnN0YXR1c308L3NwYW4+XG4gICAgICAgICAgICB7cnVuRGV0YWlsLnJ1bi5lcnJvciAhPT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkMTI0MmYnKSB9fT57cnVuRGV0YWlsLnJ1bi5lcnJvci5tZXNzYWdlfTwvc3Bhbj59XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJ1bkRldGFpbChydW5EZXRhaWwucnVuLmlkKSB9fT57dCgncGxhbi5yZWZyZXNoRGV0YWlsJyl9PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFJ1bkRldGFpbChudWxsKSB9fT57dCgncGxhbi5jbG9zZURldGFpbCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ3BhdXNlZCcgJiYgcnVuRGV0YWlsLnJ1bi5wYXVzZVBvaW50ICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzhweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgYmFja2dyb3VuZDogJ3JnYmEoMjE3LDExOSw2LDAuMDgpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMjE3LDExOSw2LDAuMzUpJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTJweCcgfX0+XHUyM0Y4IHt0KCdwbGFuLnBhdXNlZEJhbm5lcicpfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PntydW5EZXRhaWwucnVuLnBhdXNlUG9pbnQucmVhc29ufTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgbWFyZ2luVG9wOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHJlc3VtZVJ1bihydW5EZXRhaWwucnVuLmlkLCAnY29udGludWUnKSB9fT57dCgncGxhbi5yZXN1bWVSZXRyeScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzNweCAxMHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcmVzdW1lUnVuKHJ1bkRldGFpbC5ydW4uaWQsICdza2lwLWN1cnJlbnQnKSB9fT57dCgncGxhbi5yZXN1bWVTa2lwJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7KHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnZmFpbGVkJyB8fCBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2ludGVycnVwdGVkJykgJiYgKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxuICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHJlc3VtZVJ1bihydW5EZXRhaWwucnVuLmlkLCAnY29udGludWUnKSB9fT57dCgncGxhbi5yZXN1bWVGYWlsZWQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57WydwbGFuLmNvbC5zdGVwJywgJ3BsYW4uY29sLnJvbGUnLCAncGxhbi5jb2wubW9kZWwnLCAnZXhlYy5jb2wuc3RhdHVzJywgJ3BsYW4uY29sLmF0dGVtcHRzJywgJ2V4ZWMuY29sLmNvc3QnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3J1bkRldGFpbC5zdGVwcy5tYXAoKHN0ZXAsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17c3RlcC5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+e2luZGV4ICsgMX0uIHtzdGVwLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7c3RlcC5jbGFpbWVkT3V0Y29tZSAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWF4V2lkdGg6IDMyMCwgd2hpdGVTcGFjZTogJ25vcm1hbCcgfX0+e3N0ZXAuY2xhaW1lZE91dGNvbWUuc2xpY2UoMCwgMTYwKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSg4NiwxNTYsMjE0LDAuMjUpJyl9PntST0xFX0xBQkVMU1tzdGVwLnJvbGVdID8/IHN0ZXAucm9sZX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRTaXplOiAnMTFweCcgfX0+e3N0ZXAubW9kZWwgPz8gJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHN0ZXAudmVyaWZpZWQgPyAnIzRlYzliMCcgOiBzdGVwLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgPyAnI2YxNGM0YycgOiBzdGVwLnN0YXR1cyA9PT0gJ3NraXBwZWQnID8gJyM4Yjk0OWUnIDogJyNkY2RjYWEnKX0+e1NURVBfU1RBVFVTX0xBQkVMU1tzdGVwLnN0YXR1c10gPz8gc3RlcC5zdGF0dXN9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e1N0cmluZyhzdGVwLmF0dGVtcHRzQ291bnQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3N0ZXAuY29zdFVzZCA+IDAgPyAnJCcgKyBzdGVwLmNvc3RVc2QudG9GaXhlZCg0KSA6ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0ICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMTBweCcsIGJvcmRlcjogJzFweCBkYXNoZWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBwYWRkaW5nOiAnOHB4IDEycHgnIH19PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnNHB4JyB9fT57dCgncGxhbi5jb250ZXh0VGl0bGUnKX08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cbiAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQucHJvamVjdERpZ2VzdH1cbiAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuYnJhbmNoICE9PSBudWxsID8gYCBcdTAwQjcgJHt0KCdwbGFuLmJyYW5jaCcpfSAke3J1bkRldGFpbC5jb250ZXh0LmJyYW5jaH1gIDogJyd9XG4gICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmhlYWRTaGEgIT09IG51bGwgPyBgIFx1MDBCNyBIRUFEICR7cnVuRGV0YWlsLmNvbnRleHQuaGVhZFNoYS5zbGljZSgwLCA4KX1gIDogJyd9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuaW5qZWN0ZWRNZW1vcmllcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzRweCcsIGZvbnRTaXplOiAnMTFweCcgfX0+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+e3QoJ3BsYW4uaW5qZWN0ZWRNZW1vcmllcycpfVx1RkYxQTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5pbmplY3RlZE1lbW9yaWVzLm1hcCgobWVtb3J5KSA9PiA8c3BhbiBrZXk9e21lbW9yeS5pZH0gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSg3OCwyMDEsMTc2LDAuMiknKX0+e21lbW9yeS50aXRsZX08L3NwYW4+KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmRlY2lzaW9uTG9nLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiAnaW5oZXJpdCcgfX0+e3QoJ3BsYW4uZGVjaXNpb25Mb2cnKX1cdUZGMUE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuZGVjaXNpb25Mb2cuc2xpY2UoLTYpLm1hcCgoZW50cnksIGVudHJ5SW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5SW5kZXh9Plx1MDBCNyBbe2VudHJ5LmtpbmR9XSB7ZW50cnkuZGV0YWlsfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuICAgICAgPENhcmRcbiAgICAgICAgdGl0bGU9e1xuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCB1c2VyU2VsZWN0OiAnbm9uZScgfX0gb25DbGljaz17KCkgPT4geyBzZXRTY2hlZE9wZW4oIXNjaGVkT3BlbikgfX0+XG4gICAgICAgICAgICB7c2NoZWRPcGVuID8gJ1x1MjVCRSAnIDogJ1x1MjVCOCAnfXt0KCdzY2hlZC50aXRsZScpfVxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmxhYmVsLCBtYXJnaW5MZWZ0OiAnOHB4JyB9fT57KHNjaGVkdWxlZERhdGEgPz8gW10pLmxlbmd0aCA+IDAgPyBTdHJpbmcoKHNjaGVkdWxlZERhdGEgPz8gW10pLmxlbmd0aCkgKyAnIFx1NEUyQScgOiAnJ308L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICB9XG4gICAgICA+XG4gICAgICAgIHtzY2hlZE9wZW4gJiYgKFxuICAgICAgICA8PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybUlubGluZX0+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgZmxleDogMSwgbWluV2lkdGg6IDE2MCB9fSBwbGFjZWhvbGRlcj17dCgnc2NoZWQuZm9ybU5hbWUnKX0gdmFsdWU9e3NjaGVkTmFtZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkTmFtZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycgfX0gdmFsdWU9e3NjaGVkVHlwZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkVHlwZShlLnRhcmdldC52YWx1ZSkgfX0+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmV2aWV3XCI+e3QoJ3NjaGVkLnR5cGVSZXZpZXcnKX08L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzdW1tYXJ5XCI+e3QoJ3NjaGVkLnR5cGVTdW1tYXJ5Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicnVuXCI+e3QoJ3NjaGVkLnR5cGVSdW4nKX08L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzeW5jXCI+e3QoJ3NjaGVkLnR5cGVTeW5jJyl9PC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgd2lkdGg6IDEyMCB9fSBwbGFjZWhvbGRlcj17dCgnc2NoZWQuZm9ybUludGVydmFsJyl9IHZhbHVlPXtzY2hlZEludGVydmFsfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWRJbnRlcnZhbChlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICB7c2NoZWRUeXBlID09PSAncnVuJyAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybVRpdGxlJyl9IHZhbHVlPXtzY2hlZFRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWRUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezJ9IHBsYWNlaG9sZGVyPXt0KCdleGVjLmZvcm1EZXNjJyl9IHZhbHVlPXtzY2hlZERlc2N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZERlc2MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtzY2hlZE5hbWUudHJpbSgpID09PSAnJ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFkZFNjaGVkdWxlZCgpIH19Pnt0KCdzY2hlZC5hZGQnKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+e3QoJ3NjaGVkLmhpbnQnKX08L2Rpdj5cbiAgICAgICAgeyhzY2hlZHVsZWREYXRhID8/IFtdKS5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc2NoZWQuZW1wdHknKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ3NjaGVkLmNvbC5uYW1lJywgJ3NjaGVkLmNvbC50eXBlJywgJ3NjaGVkLmNvbC5pbnRlcnZhbCcsICdzY2hlZC5jb2wubmV4dCcsICdzY2hlZC5jb2wubGFzdFJlc3VsdCcsICdzY2hlZC5jb2wuYWN0aW9ucyddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7KHNjaGVkdWxlZERhdGEgPz8gW10pLm1hcCgodGFzaykgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3Rhc2suaWR9IHN0eWxlPXt7IG9wYWNpdHk6IHRhc2suZW5hYmxlZCA/IDEgOiAwLjQ1IH19PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pnt0YXNrLm5hbWV9e3Rhc2sudGl0bGUgIT09ICcnID8gPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHVGRjA4e3Rhc2sudGl0bGV9XHVGRjA5PC9zcGFuPiA6IG51bGx9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHRhc2sudHlwZSA9PT0gJ3JldmlldycgPyAnIzU2OWNkNicgOiB0YXNrLnR5cGUgPT09ICdzdW1tYXJ5JyA/ICcjNGVjOWIwJyA6ICcjZDdiYTdkJyl9Pnt0YXNrLnR5cGUgPT09ICdyZXZpZXcnID8gdCgnc2NoZWQudHlwZVJldmlldycpIDogdGFzay50eXBlID09PSAnc3VtbWFyeScgPyB0KCdzY2hlZC50eXBlU3VtbWFyeScpIDogdCgnc2NoZWQudHlwZVJ1bicpfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pnt0YXNrLmludGVydmFsTWludXRlcyA+PSAxNDQwID8gTWF0aC5yb3VuZCh0YXNrLmludGVydmFsTWludXRlcyAvIDE0NDAgKiAxMCkgLyAxMCArIHQoJ3NjaGVkLmRheScpIDogdGFzay5pbnRlcnZhbE1pbnV0ZXMgPj0gNjAgPyBNYXRoLnJvdW5kKHRhc2suaW50ZXJ2YWxNaW51dGVzIC8gNjAgKiAxMCkgLyAxMCArIHQoJ3NjaGVkLmhvdXInKSA6IHRhc2suaW50ZXJ2YWxNaW51dGVzICsgdCgnc2NoZWQubWludXRlJyl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57dGFzay5lbmFibGVkID8gZm9ybWF0VGltZSh0YXNrLm5leHREdWVBdCkgOiAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1heFdpZHRoOiAyMjAsIHdoaXRlU3BhY2U6ICdub3JtYWwnIH19Pnt0YXNrLmxhc3RSZXN1bHQgfHwgKHRhc2subGFzdFJ1bkF0ICE9PSBudWxsID8gZm9ybWF0VGltZSh0YXNrLmxhc3RSdW5BdCkgOiAnXHUyMDE0Jyl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNjaGVkdWxlZEFjdGlvbigndXBkYXRlJywgeyBpZDogdGFzay5pZCwgZW5hYmxlZDogIXRhc2suZW5hYmxlZCB9KSB9fT57dGFzay5lbmFibGVkID8gdCgnc2NoZWQuZGlzYWJsZScpIDogdCgnc2NoZWQuZW5hYmxlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNjaGVkdWxlZEFjdGlvbigncnVuJywgeyBpZDogdGFzay5pZCB9KSB9fT57dCgnc2NoZWQucnVuTm93Jyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6ICdcdTUyMjBcdTk2NjRcdThGRDlcdTRFMkFcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdUZGMUYnLCBtZXNzYWdlOiAnXHUzMDBDJyArIHRhc2submFtZSArICdcdTMwMERcdTVDMDZcdTg4QUJcdTZDMzhcdTRFNDVcdTUyMjBcdTk2NjRcdTMwMDInLCBkYW5nZXI6IHRydWUsIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHNjaGVkdWxlZEFjdGlvbignZGVsZXRlJywgeyBpZDogdGFzay5pZCB9KSB9IH0pIH19Plx1MjcxNTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgIDwvPlxuICApXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNlx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcbiAgY29uc3Qgbm90ZXNUYWIgPSAoXG4gICAgPD5cbiAgICAgIHsvKiBcdTI1MDBcdTI1MDAgXHU3QjE0XHU4QkIwXHVGRjFBXHU1MzYxXHU3MjQ3XHU1RjBGXHU5NjA1XHU4QkZCICsgXHU1OTFBXHU4ODRDXHU3RjE2XHU4RjkxICsgXHU2NDFDXHU3RDIyICsgQUkgXHU2MDNCXHU3RUQzIFx1MjUwMFx1MjUwMCAqL31cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdub3Rlcy50aXRsZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgd2lkdGg6IDIyMCB9fVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ25vdGVzLnNlYXJjaCcpfVxuICAgICAgICAgICAgdmFsdWU9e25vdGVTZWFyY2h9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVNlYXJjaChlLnRhcmdldC52YWx1ZSkgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTdW1tYXJ5ID0gbm90ZXMuZmlsdGVyKChub3RlKSA9PiBub3RlLnNoYSA9PT0gJ3N1bW1hcnknKS5zb3J0KChhLCBiKSA9PiBiLmNyZWF0ZWRBdCAtIGEuY3JlYXRlZEF0KVswXVxuICAgICAgICAgICAgY29uc3QgbmV3Q29tbWl0cyA9IGxhc3RTdW1tYXJ5ID09PSB1bmRlZmluZWQgPyAtMVxuICAgICAgICAgICAgICA6IChjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSkuZmlsdGVyKChjb21taXQpID0+IGNvbW1pdC5kYXRlID4gbGFzdFN1bW1hcnkuY3JlYXRlZEF0KS5sZW5ndGhcbiAgICAgICAgICAgIGlmIChuZXdDb21taXRzID09PSAtMSkge1xuICAgICAgICAgICAgICByZXR1cm4gPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ25vdGVzLmRpZ2VzdE5ldmVyJyl9PC9zcGFuPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld0NvbW1pdHMgPT09IDApIHJldHVybiBudWxsXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Pnt0KCdub3Rlcy5kaWdlc3RQZW5kaW5nJykucmVwbGFjZSgne259JywgU3RyaW5nKG5ld0NvbW1pdHMpKX08L3NwYW4+XG4gICAgICAgICAgfSkoKX1cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17YWlTdW1tYXJpemluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFpU3VtbWFyaXplKCkgfX0+XG4gICAgICAgICAgICB7YWlTdW1tYXJpemluZyA/IHQoJ25vdGVzLmFpU3VtbWFyeVJ1bicpIDogJ1x1MjcyOCAnICsgdCgnbm90ZXMuYWlTdW1tYXJ5Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5mb3JtUm93LCBib3JkZXI6ICcxcHggZGFzaGVkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzEwcHgnIH19PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMuZm9ybVRpdGxlJyl9IHZhbHVlPXtub3RlVGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXROb3RlVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCB9fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMudGFnc0hpbnQnKX0gdmFsdWU9e25vdGVUYWdzfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVRhZ3MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLnRleHRhcmVhfVxuICAgICAgICAgICAgcm93cz17Nn1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0KCdub3Rlcy5jb250ZW50SGludCcpfVxuICAgICAgICAgICAgdmFsdWU9e25vdGVDb250ZW50fVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVDb250ZW50KGUudGFyZ2V0LnZhbHVlKSB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgIHt0KCdub3Rlcy5ib3VuZFRvJyl9OiB7c2VsZWN0ZWRUYXJnZXRzWzBdID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IHNlbGVjdGVkVGFyZ2V0c1swXS5zbGljZSgwLCA4KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtub3RlVGl0bGUudHJpbSgpID09PSAnJyB8fCBub3RlQ29udGVudC50cmltKCkgPT09ICcnfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYWRkTm90ZSgpIH19Pnt0KCdub3Rlcy5hZGQnKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleXdvcmQgPSBub3RlU2VhcmNoLnRyaW0oKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgY29uc3QgbWF0Y2hlZCA9IGtleXdvcmQgPT09ICcnXG4gICAgICAgICAgICA/IG5vdGVzXG4gICAgICAgICAgICA6IG5vdGVzLmZpbHRlcigobm90ZSkgPT4gKG5vdGUudGl0bGUgKyAnICcgKyBub3RlLmNvbnRlbnQgKyAnICcgKyAobm90ZS50YWdzID8/IFtdKS5qb2luKCcgJykpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoa2V5d29yZCkpXG4gICAgICAgICAgLy8gXHU3RjZFXHU5ODc2XHU0RjE4XHU1MTQ4XHVGRjBDXHU1MTc2XHU0RjU5XHU2MzA5XHU1MjFCXHU1RUZBXHU2NUY2XHU5NUY0XHU1MDEyXHU1RThGXHUzMDAyXG4gICAgICAgICAgY29uc3QgdmlzaWJsZSA9IFsuLi5tYXRjaGVkXS5zb3J0KChsZWZ0LCByaWdodCkgPT5cbiAgICAgICAgICAgIE51bWJlcihyaWdodC5waW5uZWQgPT09IHRydWUpIC0gTnVtYmVyKGxlZnQucGlubmVkID09PSB0cnVlKSB8fCByaWdodC5jcmVhdGVkQXQgLSBsZWZ0LmNyZWF0ZWRBdClcbiAgICAgICAgICBpZiAodmlzaWJsZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pntub3Rlcy5sZW5ndGggPT09IDAgPyB0KCdub3Rlcy5lbXB0eScpIDogdCgnbm90ZXMuZW1wdHlTZWFyY2gnKX08L2Rpdj5cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHZpc2libGUubWFwKChub3RlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1N1bW1hcnkgPSBub3RlLnNoYSA9PT0gJ3N1bW1hcnknXG4gICAgICAgICAgICBjb25zdCBlZGl0aW5nID0gZWRpdGluZ05vdGUgIT09IG51bGwgJiYgZWRpdGluZ05vdGUuaWQgPT09IG5vdGUuaWQgPyBlZGl0aW5nTm90ZSA6IG51bGxcbiAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkID0gbm90ZUV4cGFuZGVkW25vdGUuaWRdID09PSB0cnVlXG4gICAgICAgICAgICBjb25zdCBsb25nID0gbm90ZS5jb250ZW50Lmxlbmd0aCA+IDI2MCB8fCBub3RlLmNvbnRlbnQuc3BsaXQoJ1xcbicpLmxlbmd0aCA+IDZcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e25vdGUuaWR9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcy5ub3RlQ2FyZCxcbiAgICAgICAgICAgICAgICAgIC4uLihpc1N1bW1hcnkgPyB7IGJhY2tncm91bmQ6ICdyZ2JhKDM3LDk5LDIzNSwwLjA0KScsIGJvcmRlckNvbG9yOiAncmdiYSgzNyw5OSwyMzUsMC4zKScgfSA6IHt9KSxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2VkaXRpbmcgIT09IG51bGwgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSB2YWx1ZT17ZWRpdGluZy50aXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgLi4uZWRpdGluZywgdGl0bGU6IGUudGFyZ2V0LnZhbHVlIH0pIH19IC8+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMudGFnc0hpbnQnKX0gdmFsdWU9e2VkaXRpbmcudGFnc30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgLi4uZWRpdGluZywgdGFnczogZS50YXJnZXQudmFsdWUgfSkgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezEwfSB2YWx1ZT17ZWRpdGluZy5jb250ZW50fSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RWRpdGluZ05vdGUoeyAuLi5lZGl0aW5nLCBjb250ZW50OiBlLnRhcmdldC52YWx1ZSB9KSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICc0cHggMTJweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNhdmVOb3RlRWRpdCgpIH19Pnt0KCdub3Rlcy5zYXZlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnNHB4IDEycHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0RWRpdGluZ05vdGUobnVsbCkgfX0+e3QoJ25vdGVzLmNhbmNlbCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e2lzU3VtbWFyeSA/ICdcdUQ4M0RcdURDRDYgJyA6ICcnfXtub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/ICdcdUQ4M0RcdURDQ0MgJyA6ICcnfXtub3RlLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiBub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIDogdW5kZWZpbmVkIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/IHQoJ25vdGVzLnVucGluJykgOiB0KCdub3Rlcy5waW4nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHRvZ2dsZU5vdGVQaW4obm90ZSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdURDQ0M8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IHRpdGxlPXt0KCdub3Rlcy5jb3B5TWRIaW50Jyl9IG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWQgPSBgIyAke25vdGUudGl0bGV9XFxuXFxuJHtub3RlLmNvbnRlbnR9XFxuYFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkIG5hdmlnYXRvci5jbGlwYm9hcmQ/LndyaXRlVGV4dChtZCkudGhlbigoKSA9PiBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgnbm90ZXMuY29weU1kRG9uZScpKSkuY2F0Y2goKCkgPT4gc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgXHU1OTBEXHU1MjM2XHU1OTMxXHU4RDI1JykpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cdUQ4M0RcdURDQ0Ige3QoJ25vdGVzLmNvcHlNZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gdGl0bGU9e3QoJ25vdGVzLmV4cG9ydE1kSGludCcpfSBvbkNsaWNrPXsoKSA9PiB7IGV4cG9ydE5vdGUobm90ZSkgfX0+XHVEODNEXHVEQ0JFIHt0KCdub3Rlcy5leHBvcnRNZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gdGl0bGU9e3QoJ25vdGVzLnRvTWVtb3J5SGludCcpfSBvbkNsaWNrPXsoKSA9PiB7IHNldE1lbW9yeVRpdGxlKG5vdGUudGl0bGUpOyBzZXRNZW1vcnlDb250ZW50KG5vdGUuY29udGVudCk7IHNldEFjdGlvblJlc3VsdCh0KCdub3Rlcy50b01lbW9yeURvbmUnKSkgfX0+XHVEODNFXHVEREUwIHt0KCdub3Rlcy50b01lbW9yeScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRFZGl0aW5nTm90ZSh7IGlkOiBub3RlLmlkLCB0aXRsZTogbm90ZS50aXRsZSwgY29udGVudDogbm90ZS5jb250ZW50LCB0YWdzOiAobm90ZS50YWdzID8/IFtdKS5qb2luKCcsICcpIH0pIH19Pnt0KCdub3Rlcy5lZGl0Jyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogJ1x1NTIyMFx1OTY2NFx1OEZEOVx1Njc2MVx1N0IxNFx1OEJCMFx1RkYxRicsIG1lc3NhZ2U6ICdcdTMwMEMnICsgbm90ZS50aXRsZSArICdcdTMwMERcdTVDMDZcdTg4QUJcdTZDMzhcdTRFNDVcdTUyMjBcdTk2NjRcdUZGMENcdTRFMERcdTUzRUZcdTYwNjJcdTU5MERcdTMwMDInLCBkYW5nZXI6IHRydWUsIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHJlbW92ZU5vdGUobm90ZS5pZCkgfSB9KSB9fT5cdTI3MTU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtpc1N1bW1hcnlcbiAgICAgICAgICAgICAgICAgICAgICA/IDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCAuLi4obG9uZyAmJiAhZXhwYW5kZWQgPyBzdHlsZXMubm90ZUNsYW1wIDoge30pIH19PntyZW5kZXJTdHJ1Y3R1cmVkQ29udGVudChub3RlLmNvbnRlbnQpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDogPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNvbnRlbnQsIC4uLihsb25nICYmICFleHBhbmRlZCA/IHN0eWxlcy5ub3RlQ2xhbXAgOiB7fSkgfX0+e25vdGUuY29udGVudH08L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgIHtsb25nICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMubGlua0J0bn0gb25DbGljaz17KCkgPT4geyBzZXROb3RlRXhwYW5kZWQoeyAuLi5ub3RlRXhwYW5kZWQsIFtub3RlLmlkXTogIWV4cGFuZGVkIH0pIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2V4cGFuZGVkID8gdCgnbm90ZXMuY29sbGFwc2UnKSA6IHQoJ25vdGVzLmV4cGFuZCcpfVx1RkYwOHtub3RlLmNvbnRlbnQubGVuZ3RofSBcdTVCNTdcdUZGMDlcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgeyhub3RlLnRhZ3MgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyhub3RlLnRhZ3MgPz8gW10pLm1hcCgodGFnKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3RhZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoJyMyNTYzZWInKSwgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlcjogJ25vbmUnLCBwYWRkaW5nOiAnMXB4IDhweCcsIGJvcmRlclJhZGl1czogJzk5OXB4JywgZm9udFNpemU6ICcxMHB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0Tm90ZVNlYXJjaCh0YWcpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID4je3RhZ308L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntuZXcgRGF0ZShub3RlLmNyZWF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAge25vdGUudXBkYXRlZEF0ICE9PSB1bmRlZmluZWQgJiYgbm90ZS51cGRhdGVkQXQgPiBub3RlLmNyZWF0ZWRBdCArIDEwMDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHVGRjA4e3QoJ25vdGVzLmVkaXRlZEF0Jyl9IHtuZXcgRGF0ZShub3RlLnVwZGF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX1cdUZGMDk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICB7aXNTdW1tYXJ5ICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyMyNTYzZWInKX0+e3QoJ25vdGVzLnN1bW1hcnlUYWcnKX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgIHtub3RlLnNoYSAhPT0gdW5kZWZpbmVkICYmIG5vdGUuc2hhICE9PSAnc3VtbWFyeScgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57bm90ZS5zaGEgPT09ICd3b3JraW5nJyA/IHQoJ3JlcG8ud29ya2luZycpIDogbm90ZS5zaGEuc2xpY2UoMCwgOCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgfSkoKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdtZW1vcnkuem9uZVRpdGxlJykgKyAocHJvamVjdCAhPT0gbnVsbCA/ICcgXHUwMEI3ICcgKyBwcm9qZWN0Lm5hbWUgOiAnJyl9PlxuICAgICAgICB7LyogXHU1NDBDXHU2QjY1XHU3MkI2XHU2MDAxXHU2NzYxXHVGRjFBXHU1N0ZBXHU3RUJGICsgXHU4NDNEXHU1NDBFXHU2M0QwXHU0RUE0XHU2NTcwICsgXHU1NDBDXHU2QjY1XHU2MzA5XHU5NEFFICsgXHU1NDBDXHU2QjY1XHU2MkE1XHU1NDRBICovfVxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzhweCcsIHBhZGRpbmc6ICc2cHggMTBweCcsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JyB9fT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnIH19Plx1RDgzRFx1REQwNCB7dCgnbWVtb3J5LnN5bmNCYXNlbGluZScpfVx1RkYxQTxiPnttZW1vcmllc0RhdGE/LmJhc2VsaW5lPy5zaGEgIT0gbnVsbCA/IG1lbW9yaWVzRGF0YS5iYXNlbGluZS5zaGEuc2xpY2UoMCwgOCkgOiB0KCdtZW1vcnkuc3luY05vbmUnKX08L2I+PC9zcGFuPlxuICAgICAgICAgIHttZW1vcmllc0RhdGE/LmJyYW5jaCAhPSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM1NjljZDYnKX0+e21lbW9yaWVzRGF0YS5icmFuY2h9PC9zcGFuPn1cbiAgICAgICAgICB7KG1lbW9yaWVzRGF0YT8uYmVoaW5kQ291bnQgPz8gMCkgPiAwICYmIChcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpIH19Pnt0KCdtZW1vcnkuYmVoaW5kJykucmVwbGFjZSgne259JywgU3RyaW5nKG1lbW9yaWVzRGF0YT8uYmVoaW5kQ291bnQgPz8gMCkpfTwvc3Bhbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gZGlzYWJsZWQ9e21lbW9yeVN5bmNpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzeW5jTWVtb3JpZXMoKSB9fT5cbiAgICAgICAgICAgIHttZW1vcnlTeW5jaW5nID8gdCgnbWVtb3J5LnN5bmNpbmcnKSA6ICdcdUQ4M0RcdUREMDQgJyArIHQoJ21lbW9yeS5zeW5jJyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7c3luY1JlcG9ydCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JywgcGFkZGluZzogJzhweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYmFja2dyb3VuZDogc3luY1JlcG9ydC5vayA9PT0gZmFsc2UgPyAncmdiYSgyMDksMzYsNDcsMC4wNiknIDogJ3JnYmEoNzgsMjAxLDE3NiwwLjA2KScsIGJvcmRlcjogJzFweCBzb2xpZCAnICsgKHN5bmNSZXBvcnQub2sgPT09IGZhbHNlID8gJ3JnYmEoMjA5LDM2LDQ3LDAuMyknIDogJ3JnYmEoNzgsMjAxLDE3NiwwLjMpJykgfX0+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fT57c3luY1JlcG9ydC5vayA9PT0gZmFsc2UgPyAnXHUyNzE3ICcgKyB0KCdtZW1vcnkuc3luY0ZhaWxlZCcpIDogJ1x1MjcxMyAnICsgKHN5bmNSZXBvcnQudmVyZGljdCA/PyAnJyl9PC9kaXY+XG4gICAgICAgICAgICB7c3luY1JlcG9ydC5vayAhPT0gZmFsc2UgJiYgKHN5bmNSZXBvcnQuc3RhbGVQcm9wb3NhbHMgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+e3QoJ21lbW9yeS5zdGFsZVRpdGxlJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgeyhzeW5jUmVwb3J0LnN0YWxlUHJvcG9zYWxzID8/IFtdKS5tYXAoKHByb3Bvc2FsKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17cHJvcG9zYWwuaWR9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpblRvcDogJzRweCcsIGZvbnRTaXplOiAnMTFweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0+e3Byb3Bvc2FsLnRpdGxlfSBcdTIwMTRcdTIwMTQge3Byb3Bvc2FsLnJlYXNvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzFweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhcHBseVN5bmMoW3Byb3Bvc2FsLmlkXSwgJ21hcmstc3RhbGUnKSB9fT57dCgnbWVtb3J5Lm1hcmtTdGFsZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcxcHggOHB4JywgZm9udFNpemU6ICcxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYXBwbHlTeW5jKFtwcm9wb3NhbC5pZF0sICdhcmNoaXZlJykgfX0+e3QoJ21lbW9yeS5hcmNoaXZlQnRuJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzFweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0U3luY1JlcG9ydCgocHJldmlvdXMpID0+IHByZXZpb3VzID09PSBudWxsID8gbnVsbCA6IHsgLi4ucHJldmlvdXMsIHN0YWxlUHJvcG9zYWxzOiAocHJldmlvdXMuc3RhbGVQcm9wb3NhbHMgPz8gW10pLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCAhPT0gcHJvcG9zYWwuaWQpIH0pIH19Pnt0KCdtZW1vcnkua2VlcEFjdGl2ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtzeW5jUmVwb3J0Lm9rICE9PSBmYWxzZSAmJiAoc3luY1JlcG9ydC5uZXdDYW5kaWRhdGVzID8/IFtdKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc2cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCB9fT57dCgnbWVtb3J5Lm5ld0NhbmRpZGF0ZXMnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgeyhzeW5jUmVwb3J0Lm5ld0NhbmRpZGF0ZXMgPz8gW10pLm1hcCgoY2FuZGlkYXRlLCBpbmRleCkgPT4gPGRpdiBrZXk9e2luZGV4fT5cdUZGMEIgW3tjYW5kaWRhdGUudHlwZX1dIHtjYW5kaWRhdGUudGl0bGV9PC9kaXY+KX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMubGlua0J0biwgbWFyZ2luVG9wOiAnNHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFN5bmNSZXBvcnQobnVsbCkgfX0+e3QoJ21lbW9yeS5jbG9zZVJlcG9ydCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICB7LyogXHU2MjRCXHU1MkE4XHU2REZCXHU1MkEwXHVGRjFBXHU2ODA3XHU5ODk4IC8gXHU3QzdCXHU1NzhCIC8gXHU0RjVDXHU3NTI4XHU1N0RGIC8gXHU1MTg1XHU1QkI5ICovfVxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLm1lbW9yeVRpdGxlJyl9IHZhbHVlPXttZW1vcnlUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeVRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17bWVtb3J5VHlwZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeVR5cGUoZS50YXJnZXQudmFsdWUpIH19PlxuICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKE1FTU9SWV9UWVBFX0xBQkVMUykubWFwKChbdmFsdWUsIGxhYmVsXSkgPT4gPG9wdGlvbiBrZXk9e3ZhbHVlfSB2YWx1ZT17dmFsdWV9PntsYWJlbH08L29wdGlvbj4pfVxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17bWVtb3J5U2NvcGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRNZW1vcnlTY29wZShlLnRhcmdldC52YWx1ZSBhcyAncHJvamVjdCcgfCAnYnJhbmNoJykgfX0+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicHJvamVjdFwiPnt0KCdtZW1vcnkuc2NvcGVQcm9qZWN0Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYnJhbmNoXCI+e3QoJ21lbW9yeS5zY29wZUJyYW5jaCcpfTwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSByb3dzPXszfSBwbGFjZWhvbGRlcj17dCgnZm9ybS5tZW1vcnlDb250ZW50Jyl9IHZhbHVlPXttZW1vcnlDb250ZW50fSBvbkNoYW5nZT17KGUpID0+IHsgc2V0TWVtb3J5Q29udGVudChlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgbWVtb3J5VGl0bGUudHJpbSgpID09PSAnJyB8fCBtZW1vcnlDb250ZW50LnRyaW0oKSA9PT0gJyd9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3JlY29yZE1lbW9yeScsICcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnknLCB7IG1lbW9yeVR5cGUsIHNjb3BlOiBtZW1vcnlTY29wZSwgdGl0bGU6IG1lbW9yeVRpdGxlLnRyaW0oKSwgY29udGVudDogbWVtb3J5Q29udGVudC50cmltKCkgfSkudGhlbihhc3luYyAoKSA9PiB7IHNldE1lbW9yeVRpdGxlKCcnKTsgc2V0TWVtb3J5Q29udGVudCgnJyk7IGF3YWl0IGxvYWRNZW1vcmllcygpIH0pIH19PlxuICAgICAgICAgICAgICB7YnVzeSA9PT0gJ3JlY29yZE1lbW9yeScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnbWVtb3J5LnJlY29yZCcpfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBhbGwgPSBtZW1vcmllc0RhdGE/Lm1lbW9yaWVzID8/IFtdXG4gICAgICAgICAgY29uc3QgcGVuZGluZyA9IGFsbC5maWx0ZXIoKG1lbW9yeSkgPT4gIW1lbW9yeS5pc0h1bWFuQ29uZmlybWVkICYmIG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnKVxuICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IGFsbC5maWx0ZXIoKG1lbW9yeSkgPT4gbWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZScpXG4gICAgICAgICAgY29uc3QgZ3JvdXBlZCA9IG5ldyBNYXA8c3RyaW5nLCBNZW1vcnlFbnRyeVtdPigpXG4gICAgICAgICAgZm9yIChjb25zdCBtZW1vcnkgb2YgYWN0aXZlKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gZ3JvdXBlZC5nZXQobWVtb3J5LnR5cGUpID8/IFtdXG4gICAgICAgICAgICBsaXN0LnB1c2gobWVtb3J5KVxuICAgICAgICAgICAgZ3JvdXBlZC5zZXQobWVtb3J5LnR5cGUsIGxpc3QpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICB7cGVuZGluZy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+XHUyM0YzIHt0KCdtZW1vcnkucGVuZGluZ1F1ZXVlJyl9XHVGRjA4e1N0cmluZyhwZW5kaW5nLmxlbmd0aCl9XHVGRjA5PC9kaXY+XG4gICAgICAgICAgICAgICAgICB7cGVuZGluZy5tYXAoKG1lbW9yeSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17bWVtb3J5LmlkfSBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNhcmQsIGJvcmRlckNvbG9yOiAncmdiYSgzNyw5OSwyMzUsMC4zKScsIGJhY2tncm91bmQ6ICdyZ2JhKDM3LDk5LDIzNSwwLjAzKScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e21lbW9yeS50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgY29uZmlybU1lbW9yeShtZW1vcnkuaWQpLnRoZW4oKCkgPT4geyB2b2lkIGxvYWRNZW1vcmllcygpIH0pIH19Pnt0KCdtZW1vcnkuY29uZmlybScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5QWN0aW9uKCdzdGF0dXMnLCB7IGlkOiBtZW1vcnkuaWQsIHN0YXR1czogJ2FyY2hpdmVkJyB9KSB9fT57dCgnbWVtb3J5LmFyY2hpdmVCdG4nKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlQ29udGVudH0+e21lbW9yeS5jb250ZW50fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlTWV0YX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCdyZ2JhKDM3LDk5LDIzNSwwLjE1KScpfT57TUVNT1JZX1NPVVJDRV9MQUJFTFNbbWVtb3J5LnNvdXJjZVRhZ10gPz8gbWVtb3J5LnNvdXJjZVRhZ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LmJhc2lzU2hhICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e21lbW9yeS5iYXNpc1NoYS5zbGljZSgwLCA4KX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7Wy4uLmdyb3VwZWQuZW50cmllcygpXS5tYXAoKFt0eXBlLCBpdGVtc10pID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17dHlwZX0gc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2VjdGlvblRpdGxlfT57TUVNT1JZX1RZUEVfTEFCRUxTW3R5cGVdID8/IHR5cGV9XHVGRjA4e1N0cmluZyhpdGVtcy5sZW5ndGgpfVx1RkYwOTwvZGl2PlxuICAgICAgICAgICAgICAgICAge2l0ZW1zLm1hcCgobWVtb3J5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXttZW1vcnkuaWR9IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ2FyZCwgb3BhY2l0eTogbWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZScgPyAxIDogMC42IH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVRleHR9PnttZW1vcnkuaXNIdW1hbkNvbmZpcm1lZCA/ICdcdTI3MDUgJyA6ICcnfXttZW1vcnkudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFNocmluazogMCwgZmxleFdyYXA6ICd3cmFwJywganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHshbWVtb3J5LmlzSHVtYW5Db25maXJtZWQgJiYgbWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJ1dHRvbiwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBjb25maXJtTWVtb3J5KG1lbW9yeS5pZCkudGhlbigoKSA9PiB7IHZvaWQgbG9hZE1lbW9yaWVzKCkgfSkgfX0+e3QoJ21lbW9yeS5jb25maXJtJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5VG9Ob3RlKG1lbW9yeSkgfX0+XHVEODNEXHVEQ0M0IHt0KCdtZW1vcnkudG9Ob3RlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc2NvcGUgPT09ICdicmFuY2gnICYmIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ25vcm1hbGl6ZScsIHsgaWQ6IG1lbW9yeS5pZCB9KSB9fT5cdTIxRjEge3QoJ21lbW9yeS5ub3JtYWxpemUnKX08L2J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeUFjdGlvbignc3RhdHVzJywgeyBpZDogbWVtb3J5LmlkLCBzdGF0dXM6ICdhcmNoaXZlZCcgfSkgfX0+e3QoJ21lbW9yeS5hcmNoaXZlQnRuJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5QWN0aW9uKCdzdGF0dXMnLCB7IGlkOiBtZW1vcnkuaWQsIHN0YXR1czogJ2FjdGl2ZScgfSkgfX0+e3QoJ21lbW9yeS5yZXN0b3JlJyl9PC9idXR0b24+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNvbnRlbnQsIG1heEhlaWdodDogODQsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT57bWVtb3J5LmNvbnRlbnR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVNZXRhfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc3RhdHVzID09PSAnc3RhbGUnICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNkOTc3MDYnKX0+e3QoJ21lbW9yeS5zdGF0dXNTdGFsZScpfTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnNjb3BlID09PSAnYnJhbmNoJyAmJiBtZW1vcnkuZ2l0QnJhbmNoICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM1NjljZDYnKX0+XHUyMzg3IHttZW1vcnkuZ2l0QnJhbmNofTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCdyZ2JhKDM3LDk5LDIzNSwwLjE1KScpfT57TUVNT1JZX1NPVVJDRV9MQUJFTFNbbWVtb3J5LnNvdXJjZVRhZ10gPz8gbWVtb3J5LnNvdXJjZVRhZ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LmJhc2lzU2hhICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e21lbW9yeS5iYXNpc1NoYS5zbGljZSgwLCA4KX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e25ldyBEYXRlKG1lbW9yeS51cGRhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAge2FsbC5sZW5ndGggPT09IDAgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnbWVtb3J5LmVtcHR5Jyl9PC9kaXY+fVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKVxuICAgICAgICB9KSgpfVxuICAgICAgPC9DYXJkPlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2NvbmNlcHRzLnRpdGxlJyl9PlxuICAgICAgICB7Y29uY2VwdHMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2NvbmNlcHRzLm5vbmUnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57Wydjb25jZXB0cy5jb2wubmFtZScsICdjb25jZXB0cy5jb2wuY2F0ZWdvcnknLCAnY29uY2VwdHMuY29sLmNvdW50J10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtjb25jZXB0cy5tYXAoKGNvbmNlcHQpID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtjb25jZXB0LmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Y29uY2VwdC5uYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2NvbmNlcHQuY2F0ZWdvcnl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57U3RyaW5nKGNvbmNlcHQub2NjdXJyZW5jZXMpfTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgPC8+XG4gIClcblxuICAvLyBcdTI1MDBcdTI1MDAgUmV2aWV3IFx1OTVFRVx1OTg5OFx1OTg3NVx1N0I3RVx1RkYxQVx1NTE2OFx1OTFDRlx1OTVFRVx1OTg5OFx1NzcwQlx1Njc3Rlx1RkYwOFx1N0VERlx1OEJBMSArIFx1N0I1Qlx1OTAwOSArIFx1NzJCNlx1NjAwMVx1NkQ0MVx1OEY2Q1x1RkYwOSsgXHU5QThDXHU2NTM2XHU4QkIwXHU1RjU1IFx1MjUwMFx1MjUwMFxuICBjb25zdCByZXZpZXdUYWIgPSAoXG4gICAgPD5cbiAgICAgIHtyZXN1bHRQYW5lbH1cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdyZXZpZXcucmVjb3Jkc1RpdGxlJyl9PlxuICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBhbGwgPSAoaXNzdWVzRGF0YSA/PyBbXSkubWFwKChpc3N1ZSkgPT4gKHsgLi4uaXNzdWUsIHNldmVyaXR5OiBub3JtYWxpemVJc3N1ZVNldmVyaXR5KGlzc3VlLnNldmVyaXR5KSB9KSlcbiAgICAgICAgICBjb25zdCBvcGVuQ291bnQgPSBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykubGVuZ3RoXG4gICAgICAgICAgLy8gXHU4QkExXHU2NTcwIGNoaXBzIFx1OERERlx1OTY4Rlx1NzJCNlx1NjAwMVx1N0I1Qlx1OTAwOVx1RkYwOFwiXHU1MTY4XHU5MEU4XCI9IFx1NzJCNlx1NjAwMVx1N0I1Qlx1OTAwOVx1NTQwRVx1NzY4NFx1NjAzQlx1NjU3MFx1RkYwOVx1RkYxQVx1OTAwOVwiXHU1REYyXHU4OUUzXHU1MUIzXCJcdTU0MEVcdTU0MDRcdTRFMjVcdTkxQ0RcdTVFQTZcdTY1NzBcdTVCNTdcdTdBQ0JcdTUzNzNcdTVCRjlcdTVFOTRcdTVERjJcdTg5RTNcdTUxQjNcdTUyMTdcdTg4NjhcdTMwMDJcbiAgICAgICAgICBjb25zdCBzdGF0dXNGaWx0ZXJlZCA9IGFsbC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZVN0YXR1c0ZpbHRlciA9PT0gJycgfHwgaXNzdWUuc3RhdHVzID09PSBpc3N1ZVN0YXR1c0ZpbHRlcilcbiAgICAgICAgICBjb25zdCBjb3VudHM6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfT4gPSBbXG4gICAgICAgICAgICB7IGtleTogJycsIGxhYmVsOiB0KCdyZXZpZXcuZmlsdGVyQWxsJyksIGNvdW50OiBzdGF0dXNGaWx0ZXJlZC5sZW5ndGggfSxcbiAgICAgICAgICAgIHsga2V5OiAnY3JpdGljYWwnLCBsYWJlbDogJ2NyaXRpY2FsJywgY291bnQ6IHN0YXR1c0ZpbHRlcmVkLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IGlzc3VlLnNldmVyaXR5ID09PSAnYmxvY2tlcicpLmxlbmd0aCB9LFxuICAgICAgICAgICAgeyBrZXk6ICdtYWpvcicsIGxhYmVsOiAnbWFqb3InLCBjb3VudDogc3RhdHVzRmlsdGVyZWQuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdtYWpvcicpLmxlbmd0aCB9LFxuICAgICAgICAgICAgeyBrZXk6ICdtaW5vcicsIGxhYmVsOiAnbWlub3InLCBjb3VudDogc3RhdHVzRmlsdGVyZWQuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdtaW5vcicpLmxlbmd0aCB9LFxuICAgICAgICAgICAgeyBrZXk6ICdpbmZvJywgbGFiZWw6ICdpbmZvJywgY291bnQ6IHN0YXR1c0ZpbHRlcmVkLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnNldmVyaXR5ID09PSAnaW5mbycpLmxlbmd0aCB9LFxuICAgICAgICAgIF1cbiAgICAgICAgICBjb25zdCB2aXNpYmxlID0gc3RhdHVzRmlsdGVyZWRcbiAgICAgICAgICAgIC5maWx0ZXIoKGlzc3VlKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpc3N1ZVNldmVyaXR5RmlsdGVyID09PSAnJykgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgaWYgKGlzc3VlU2V2ZXJpdHlGaWx0ZXIgPT09ICdjcml0aWNhbCcpIHJldHVybiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBpc3N1ZS5zZXZlcml0eSA9PT0gJ2Jsb2NrZXInXG4gICAgICAgICAgICAgIHJldHVybiBpc3N1ZS5zZXZlcml0eSA9PT0gaXNzdWVTZXZlcml0eUZpbHRlclxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBjb25zdCBjaGVja2VkVmlzaWJsZSA9IHZpc2libGUuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWVDaGVja2VkW2lzc3VlLmlkXSA9PT0gdHJ1ZSlcbiAgICAgICAgICBjb25zdCBjaGVja2VkT3BlbiA9IGNoZWNrZWRWaXNpYmxlLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpXG4gICAgICAgICAgY29uc3QgY2hlY2tlZE9wZW5UYXJnZXRzID0gQXJyYXkuZnJvbShuZXcgU2V0KGNoZWNrZWRPcGVuLm1hcCgoaXNzdWUpID0+IGlzc3VlLmNoYW5nZUlkKSkpXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAge2NvdW50cy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxidXR0b24ga2V5PXtpdGVtLmtleSA9PT0gJycgPyAnYWxsJyA6IGl0ZW0ua2V5fSBzdHlsZT17c3R5bGVzLmNoaXAoaXNzdWVTZXZlcml0eUZpbHRlciA9PT0gaXRlbS5rZXkpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldElzc3VlU2V2ZXJpdHlGaWx0ZXIoaXRlbS5rZXkpIH19PlxuICAgICAgICAgICAgICAgICAgICB7aXRlbS5sYWJlbH0gXHUwMEI3IHtpdGVtLmNvdW50fVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWFyZ2luTGVmdDogJzE2cHgnLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cbiAgICAgICAgICAgICAgICAgIHtvcGVuQ291bnR9IFx1NUY4NVx1NTkwNFx1NzQwNiAvIFx1NTE3MSB7YWxsLmxlbmd0aH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgeyhzdGF0ZT8ucmVzb2x2ZWRJc3N1ZVJldGVudGlvbkRheXMgPz8gMCkgPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcucmV0ZW50aW9uSGludCcpLnJlcGxhY2UoJ3tkYXlzfScsIFN0cmluZyhzdGF0ZT8ucmVzb2x2ZWRJc3N1ZVJldGVudGlvbkRheXMgPz8gNykpfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCB3aWR0aDogJzE0cHgnLCBoZWlnaHQ6ICcxNHB4JywgYm9yZGVyUmFkaXVzOiAnNTAlJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJywgZm9udFNpemU6ICcxMHB4JywgbGluZUhlaWdodDogMSwgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGN1cnNvcjogJ2hlbHAnLCB1c2VyU2VsZWN0OiAnbm9uZScsIGZsZXhTaHJpbms6IDAgfX1cbiAgICAgICAgICAgICAgICAgID4/PC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJywgcGFkZGluZzogJzNweCAyNHB4IDNweCA4cHgnIH19IHZhbHVlPXtpc3N1ZVN0YXR1c0ZpbHRlcn0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldElzc3VlU3RhdHVzRmlsdGVyKGUudGFyZ2V0LnZhbHVlKSB9fT5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj57dCgncmV2aWV3LnN0YXR1c0FsbCcpfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKElTU1VFX1NUQVRVU19MQUJFTFMpLm1hcCgoW3ZhbHVlLCBsYWJlbF0pID0+IDxvcHRpb24ga2V5PXt2YWx1ZX0gdmFsdWU9e3ZhbHVlfT57bGFiZWx9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0SXNzdWVDaGVja2VkKChwcmV2aW91cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbENoZWNrZWQgPSB2aXNpYmxlLmV2ZXJ5KChpc3N1ZSkgPT4gcHJldmlvdXNbaXNzdWUuaWRdID09PSB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH1cbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGlzc3VlIG9mIHZpc2libGUpIG5leHRbaXNzdWUuaWRdID0gIWFsbENoZWNrZWRcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+e3QoJ3Jldmlldy5zZWxlY3RBbGwnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSB0aXRsZT17dCgncmV2aWV3LmV4cG9ydE1kSGludCcpfSBvbkNsaWNrPXsoKSA9PiB7IGV4cG9ydElzc3Vlc01kKHZpc2libGUpIH19Pnt0KCdyZXZpZXcuZXhwb3J0TWQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcudHJpYWdlSGludCcpfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcGVuQ291bnQgPSB2aXNpYmxlLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICBpZiAob3BlbkNvdW50ID09PSAwKSB7IHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyB0KCdmaXguZGlzcGF0Y2hOb09wZW4nKSk7IHJldHVybiB9XG4gICAgICAgICAgICAgICAgICAgIHNldENvbmZpcm1EaWFsb2coe1xuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0KCdyZXZpZXcudHJpYWdlQ29uZmlybVRpdGxlJyksXG4gICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogdCgncmV2aWV3LnRyaWFnZUNvbmZpcm1Nc2cnKS5yZXBsYWNlKCd7bn0nLCAnNDAnKSxcbiAgICAgICAgICAgICAgICAgICAgICBkYW5nZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1MYWJlbDogdCgncmV2aWV3LnRyaWFnZScpLFxuICAgICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHJ1blRyaWFnZSgpIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID57dCgncmV2aWV3LnRyaWFnZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgLy8gXHU2RDNFXHU1M0QxXHU1QkY5XHU4QzYxXHVGRjFBXHU1MkZFXHU5MDA5XHU3Njg0XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHU0RjE4XHU1MTQ4XHVGRjFCXHU2NzJBXHU1MkZFXHU5MDA5ID0gXHU1RjUzXHU1MjREXHU3QjVCXHU5MDA5XHU0RTBCXHU1MTY4XHU5MEU4XHU1Rjg1XHU1OTA0XHU3NDA2XHVGRjA4XHU1RTM4XHU5QTdCXHU1MTY1XHU1M0UzXHVGRjBDXHU0RTBEXHU1MThEXHU4NUNGXHVGRjA5XHUzMDAyXG4gICAgICAgICAgICAgICAgICBjb25zdCBvcGVuVmlzaWJsZSA9IHZpc2libGUuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJylcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrZWRJZHMgPSBvcGVuVmlzaWJsZS5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZUNoZWNrZWRbaXNzdWUuaWRdID09PSB0cnVlKS5tYXAoKGlzc3VlKSA9PiBpc3N1ZS5pZClcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlkcyA9IGNoZWNrZWRJZHMubGVuZ3RoID4gMCA/IGNoZWNrZWRJZHMgOiBvcGVuVmlzaWJsZS5tYXAoKGlzc3VlKSA9PiBpc3N1ZS5pZClcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBmb250V2VpZ2h0OiA2MDAgfX1cbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgnZml4LmRpc3BhdGNoSGludE1haW4nKX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWRzLmxlbmd0aCA9PT0gMCkgeyBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgdCgnZml4LmRpc3BhdGNoTm9PcGVuJykpOyByZXR1cm4gfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29uZmlybURpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0KCdmaXguZGlzcGF0Y2hNb2RlVGl0bGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogdCgnZml4LmRpc3BhdGNoTW9kZU1zZycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhpZHMubGVuZ3RoKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRhbmdlcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1MYWJlbDogdCgnZml4LmRpc3BhdGNoQXV0bycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ6IHsgbGFiZWw6IHQoJ2ZpeC5kaXNwYXRjaFBsYW4nKSwgb25BbHQ6ICgpID0+IHsgdm9pZCBkaXNwYXRjaEZpeChbXSwgaWRzLCAncGxhbicpIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgZGlzcGF0Y2hGaXgoW10sIGlkcywgJ2ZpeCcpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdURFODAge3QoJ2ZpeC5kaXNwYXRjaCcpfSh7U3RyaW5nKGlkcy5sZW5ndGgpfSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KSgpfVxuICAgICAgICAgICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcGVuZGluZ1BsYW5zID0gdmlzaWJsZS5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5maXhQbGFuPy5zdGF0dXMgPT09ICdwZW5kaW5nJylcbiAgICAgICAgICAgICAgICAgIHJldHVybiBwZW5kaW5nUGxhbnMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fVxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdmaXguZGlzcGF0Y2hQbGFuc0hpbnQnKX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogdCgnZml4LmRpc3BhdGNoUGxhbnMnKSwgbWVzc2FnZTogYFx1NUMwNlx1NkQzRVx1NTNEMSAke1N0cmluZyhwZW5kaW5nUGxhbnMubGVuZ3RoKX0gXHU0RTJBXHU1REYyXHU0RUE3XHU1MUZBXHU3Njg0XHU0RkVFXHU1OTBEXHU2NUI5XHU2ODQ4XHU3RUQ5XHU1QjUwIEFnZW50IFx1NUU3Nlx1NTNEMVx1NjI2N1x1ODg0Q1x1RkYwOFx1NzJFQ1x1N0FDQiB3b3JrdHJlZVx1RkYwQ1x1NkQ4OFx1ODAxN1x1NkEyMVx1NTc4Qlx1NzUyOFx1OTFDRlx1RkYxQlx1NUI4Q1x1NjIxMFx1NTQwRVx1ODFFQVx1NTJBOFx1NTZERVx1NTE5OVx1NUU3Nlx1NjNEMFx1NEVBNFx1RkYwOVx1MzAwMmAsIGRhbmdlcjogZmFsc2UsIGNvbmZpcm1MYWJlbDogdCgnZml4LmRpc3BhdGNoUGxhbnMnKSwgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgZGlzcGF0Y2hGaXgocGVuZGluZ1BsYW5zLm1hcCgoaXNzdWUpID0+IGlzc3VlLmZpeFBsYW4hLmlkKSwgW10sICdmaXgnKSB9IH0pIH19XG4gICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdURDRTYge3QoJ2ZpeC5kaXNwYXRjaFBsYW5zJyl9KHtTdHJpbmcocGVuZGluZ1BsYW5zLmxlbmd0aCl9KTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgKSA6IG51bGxcbiAgICAgICAgICAgICAgICB9KSgpfVxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkSXNzdWVzKCkgfX0+e3QoJ3Jldmlldy5yZWZyZXNoJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7Zml4VGFza3MubGVuZ3RoID4gMCAmJiAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IEZJWF9TVEFUVVNfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0geyBxdWV1ZWQ6IHQoJ2ZpeC50YXNrUXVldWVkJyksIHJ1bm5pbmc6IHQoJ2ZpeC50YXNrUnVubmluZycpLCBtZXJnaW5nOiB0KCdmaXgudGFza01lcmdpbmcnKSwgcmVkbzogdCgnZml4LnRhc2tSZWRvJyksIGRvbmU6IHQoJ2ZpeC50YXNrRG9uZScpLCBjb25mbGljdDogdCgnZml4LnRhc2tDb25mbGljdCcpLCBmYWlsZWQ6IHQoJ2ZpeC50YXNrRmFpbGVkJyksIGNhbmNlbGxlZDogdCgnZml4LnRhc2tDYW5jZWxsZWQnKSB9XG4gICAgICAgICAgICAgICAgY29uc3QgZml4QWN0aXZlID0gZml4VGFza3Muc29tZSgodGFzaykgPT4gdGFzay5zdGF0dXMgPT09ICdxdWV1ZWQnIHx8IHRhc2suc3RhdHVzID09PSAncnVubmluZycgfHwgdGFzay5zdGF0dXMgPT09ICdtZXJnaW5nJyB8fCB0YXNrLnN0YXR1cyA9PT0gJ3JlZG8nKVxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8Q2FyZCB0aXRsZT17J1x1RDgzRVx1REQxNiAnICsgdCgnZml4LnN0YXR1cycpfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc4cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge1N0cmluZyhmaXhUYXNrcy5maWx0ZXIoKHRhc2spID0+IHRhc2suc3RhdHVzID09PSAnZG9uZScpLmxlbmd0aCl9L3tTdHJpbmcoZml4VGFza3MubGVuZ3RoKX0ge3QoJ2ZpeC50YXNrRG9uZScpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgICAgICAgICAge2ZpeEFjdGl2ZSAmJiA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgY2FuY2VsRml4KCkgfX0+XHUyM0Y5IHt0KCdmaXguc3RvcCcpfTwvYnV0dG9uPn1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtmaXhUYXNrcy5tYXAoKHRhc2spID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17dGFzay5pc3N1ZUlkfSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JywgcGFkZGluZzogJzZweCA0cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMywgcmdiYSg1LDUsNSwwLjA2KSknLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSh0YXNrLnN0YXR1cyA9PT0gJ2RvbmUnID8gJyM0ZWM5YjAnIDogdGFzay5zdGF0dXMgPT09ICdxdWV1ZWQnID8gJyM4Yjk0OWUnIDogdGFzay5zdGF0dXMgPT09ICdydW5uaW5nJyB8fCB0YXNrLnN0YXR1cyA9PT0gJ21lcmdpbmcnIHx8IHRhc2suc3RhdHVzID09PSAncmVkbycgPyAnI2RjZGNhYScgOiAnI2YxNGM0YycpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge0ZJWF9TVEFUVVNfTEFCRUxTW3Rhc2suc3RhdHVzXSA/PyB0YXNrLnN0YXR1c317dGFzay5tb2RlID09PSAncGxhbicgPyAnXHUwMEI3XHU2NUI5XHU2ODQ4JyA6ICcnfXt0YXNrLmF0dGVtcHQgPiAxID8gYFx1MDBCNyR7dCgnZml4LmF0dGVtcHQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcodGFzay5hdHRlbXB0KSl9YCA6ICcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IHRhc2suc3RhdHVzID09PSAncnVubmluZycgfHwgdGFzay5zdGF0dXMgPT09ICdtZXJnaW5nJyB8fCB0YXNrLnN0YXR1cyA9PT0gJ3JlZG8nXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWN0aXZlKSByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5tYXgoMCwgTWF0aC5yb3VuZCgoRGF0ZS5ub3coKSAtICh0YXNrLnN0YXJ0ZWRBdCA/PyBEYXRlLm5vdygpKSkgLyA2MF8wMDApKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBleHRyYSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW51dGVzID4gMCA/IHQoJ2ZpeC5ydW50aW1lJykucmVwbGFjZSgne259JywgU3RyaW5nKG1pbnV0ZXMpKSA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0YXNrLnJlc3VtZXMgPz8gMCkgPiAwID8gdCgnZml4LnJlc3VtZXMnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcodGFzay5yZXN1bWVzKSkgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFzay5wcm9iZXMgPz8gMCkgPiAwID8gdCgnZml4LnByb2JlcycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyh0YXNrLnByb2JlcykpIDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0uZmlsdGVyKChwYXJ0KSA9PiBwYXJ0ICE9PSAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4dHJhLmxlbmd0aCA+IDAgPyA8c3BhbiBzdHlsZT17eyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZmxleFNocmluazogMCB9fT57ZXh0cmEuam9pbignIFx1MDBCNyAnKX08L3NwYW4+IDogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1pbldpZHRoOiAwLCBmbGV4OiAxIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBmb250V2VpZ2h0OiA2MDAsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT57dGFzay50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsodGFzay5zdGF0dXMgPT09ICdydW5uaW5nJyB8fCB0YXNrLnN0YXR1cyA9PT0gJ3F1ZXVlZCcpICYmIHRhc2suY3VycmVudEFjdGlvbiAhPT0gdW5kZWZpbmVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSwgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScgfX0+XHUyNUI4IHt0YXNrLmN1cnJlbnRBY3Rpb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5zdW1tYXJ5ICE9PSB1bmRlZmluZWQgJiYgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3Rhc2suc3VtbWFyeX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5pbXBhY3QgIT09IHVuZGVmaW5lZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UodGFzay5pbXBhY3Qucmlza0xldmVsID09PSAnbG93JyA/ICcjNGVjOWIwJyA6IHRhc2suaW1wYWN0LnJpc2tMZXZlbCA9PT0gJ21lZGl1bScgPyAnI2RjZGNhYScgOiAnI2YxNGM0YycpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHU1RjcxXHU1NENEIHt0YXNrLmltcGFjdC5yaXNrTGV2ZWx9KHtTdHJpbmcodGFzay5pbXBhY3Qucmlza1Njb3JlKX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeycgJ31cdTc2RjRcdTYzQTUge1N0cmluZyh0YXNrLmltcGFjdC5kaXJlY3QubGVuZ3RoKX0gXHUwMEI3IFx1OTVGNFx1NjNBNSB7U3RyaW5nKHRhc2suaW1wYWN0LmluZGlyZWN0Lmxlbmd0aCl9IFx1MDBCNyBcdTZGNUNcdTU3Mjgge1N0cmluZyh0YXNrLmltcGFjdC5wb3RlbnRpYWwubGVuZ3RoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Rhc2suaW1wYWN0LmluZGlyZWN0Lmxlbmd0aCA+IDAgPyBgXHVGRjA4XHU1OTgyICR7dGFzay5pbXBhY3QuaW5kaXJlY3Quc2xpY2UoMCwgMikuam9pbignLCAnKX1cdUZGMDlgIDogJyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5lcnJvciAhPT0gdW5kZWZpbmVkICYmIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2QxMjQyZicpIH19Pnt0YXNrLmVycm9yfTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsodGFzay5maWxlcyA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Rhc2suZmlsZXMhLnNsaWNlKDAsIDQpLmpvaW4oJywgJyl9e3Rhc2suY29tbWl0ICE9PSB1bmRlZmluZWQgPyBgIFx1MDBCNyAke3Rhc2suY29tbWl0fWAgOiAnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9DYXJkPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgICAgeyhjaGVja2VkVmlzaWJsZS5sZW5ndGggPiAwIHx8IGJhdGNoVmVyaWZ5U3RhdGUgIT09IG51bGwgfHwgdHJpYWdlU3RhdGUgIT09IG51bGwpICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIHBhZGRpbmc6ICc2cHggMTBweCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgICAge2JhdGNoVmVyaWZ5U3RhdGUgIT09IG51bGwgPyAoXG4gICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JykgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBcdTIzRjMge3QoJ3Jldmlldy5iYXRjaFByb2dyZXNzJykucmVwbGFjZSgne2l9JywgU3RyaW5nKGJhdGNoVmVyaWZ5U3RhdGUuZG9uZSkpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhiYXRjaFZlcmlmeVN0YXRlLnRvdGFsKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IGJhdGNoU3RvcFJlZi5jdXJyZW50ID0gdHJ1ZSB9fT57dCgncmV2aWV3LmJhdGNoU3RvcCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICkgOiB0cmlhZ2VTdGF0ZSAhPT0gbnVsbCA/IChcbiAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIFx1MjNGMyB7dCgncmV2aWV3LnRyaWFnZVByb2dyZXNzJykucmVwbGFjZSgne259JywgU3RyaW5nKHRyaWFnZVN0YXRlLnByb2Nlc3NlZCkpLnJlcGxhY2UoJ3ttfScsIHRyaWFnZVN0YXRlLnJlbWFpbmluZyA+PSAwID8gU3RyaW5nKHRyaWFnZVN0YXRlLnJlbWFpbmluZykgOiAnXHUyMDI2Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IGJhdGNoU3RvcFJlZi5jdXJyZW50ID0gdHJ1ZSB9fT57dCgncmV2aWV3LnRyaWFnZVN0b3AnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0KCdyZXZpZXcuY2hlY2tlZENvdW50JykucmVwbGFjZSgne259JywgU3RyaW5nKGNoZWNrZWRWaXNpYmxlLmxlbmd0aCkpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICB7Y2hlY2tlZE9wZW5UYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3Jldmlldy5iYXRjaFZlcmlmeUNvbmZpcm1Nc2cnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoY2hlY2tlZE9wZW5UYXJnZXRzLmxlbmd0aCkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogdCgncmV2aWV3LmJhdGNoVmVyaWZ5Q29uZmlybVRpdGxlJyksIG1lc3NhZ2U6IHQoJ3Jldmlldy5iYXRjaFZlcmlmeUNvbmZpcm1Nc2cnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoY2hlY2tlZE9wZW5UYXJnZXRzLmxlbmd0aCkpLCBkYW5nZXI6IGZhbHNlLCBjb25maXJtTGFiZWw6IHQoJ3Jldmlldy5iYXRjaFZlcmlmeScpLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBydW5CYXRjaFZlcmlmeShjaGVja2VkT3BlblRhcmdldHMpIH0gfSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdUREMEQge3QoJ3Jldmlldy5iYXRjaFZlcmlmeScpfSh7U3RyaW5nKGNoZWNrZWRPcGVuVGFyZ2V0cy5sZW5ndGgpfSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIHtjaGVja2VkT3Blbi5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtYXJrSXNzdWVzSGFuZGxlZChjaGVja2VkT3Blbi5tYXAoKGlzc3VlKSA9PiBpc3N1ZS5pZCkpIH19Plx1MjcxMyB7dCgncmV2aWV3Lm1hcmtIYW5kbGVkJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IGV4cG9ydElzc3Vlc01kKGNoZWNrZWRWaXNpYmxlKSB9fT57dCgncmV2aWV3LmV4cG9ydE1kJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0SXNzdWVDaGVja2VkKHt9KSB9fT57dCgncGlja2VyLmNsZWFyJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge2FsbC5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57aXNzdWVzRGF0YSA9PT0gbnVsbCA/ICdcdTIwMjYnIDogdCgncmV2aWV3LnJlY29yZHNFbXB0eScpfTwvZGl2PlxuICAgICAgICAgICAgICApIDogdmlzaWJsZS5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnbm90ZXMuZW1wdHlTZWFyY2gnKX08L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IHZpc2libGUubWFwKChpc3N1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkID0gaXNzdWVFeHBhbmRlZFtpc3N1ZS5pZF0gPT09IHRydWVcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGlzc3VlLmRlc2NyaXB0aW9uID8/ICcnXG4gICAgICAgICAgICAgICAgY29uc3QgbG9uZyA9IGRlc2NyaXB0aW9uLmxlbmd0aCA+IDIwMFxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aXNzdWUuaWR9IHN0eWxlPXtzdHlsZXMubm90ZUNhcmR9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17aXNzdWVDaGVja2VkW2lzc3VlLmlkXSA9PT0gdHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHsgc2V0SXNzdWVDaGVja2VkKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFtpc3N1ZS5pZF06ICEocHJldmlvdXNbaXNzdWUuaWRdID09PSB0cnVlKSB9KSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luOiAwLCBmbGV4U2hyaW5rOiAwLCBjdXJzb3I6ICdwb2ludGVyJywgYWNjZW50Q29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShzZXZlcml0eUNvbG9yKGlzc3VlLnNldmVyaXR5KSl9Pntpc3N1ZS5zZXZlcml0eX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNzdWUuY2F0ZWdvcnkgPyA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNTc2MDZhJyl9Pntpc3N1ZS5jYXRlZ29yeX08L3NwYW4+IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJyA/ICcjZGNkY2FhJyA6IGlzc3VlLnN0YXR1cyA9PT0gJ3Jlc29sdmVkJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdhY2NlcHRlZCcgPyAnIzRlYzliMCcgOiAnIzhiOGI4YicpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge0lTU1VFX1NUQVRVU19MQUJFTFNbaXNzdWUuc3RhdHVzXSA/PyBpc3N1ZS5zdGF0dXN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVRleHR9Pntpc3N1ZS50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt2ZXJpZnlpbmdUYXJnZXQgIT09IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3Jldmlldy52ZXJpZnlIaW50Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHZlcmlmeUlzc3Vlcyhpc3N1ZS5jaGFuZ2VJZCkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPnt2ZXJpZnlpbmdUYXJnZXQgPT09IGlzc3VlLmNoYW5nZUlkID8gdCgncmV2aWV3LnZlcmlmeVJ1bm5pbmcnKSA6ICdcdUQ4M0RcdUREMEQgJyArIHQoJ3Jldmlldy52ZXJpZnknKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcuZmFsc2VQb3NpdGl2ZUhpbnQnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDb25maXJtRGlhbG9nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHQoJ3Jldmlldy5mYWxzZVBvc2l0aXZlVGl0bGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogdCgncmV2aWV3LmZhbHNlUG9zaXRpdmVNc2cnKS5yZXBsYWNlKCd7dGl0bGV9JywgaXNzdWUudGl0bGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW5nZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtTGFiZWw6IHQoJ3Jldmlldy5mYWxzZVBvc2l0aXZlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcy9zdGF0dXMnLCB7IGlkOiBpc3N1ZS5pZCwgc3RhdHVzOiAncmVqZWN0ZWQnIH0pLnRoZW4oYXN5bmMgKHsgb2sgfSkgPT4geyBpZiAob2spIGF3YWl0IGxvYWRJc3N1ZXMoKSB9KSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XHVEODNEXHVERUFCIHt0KCdyZXZpZXcuZmFsc2VQb3NpdGl2ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3Jldmlldy5tYXJrSGFuZGxlZCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtYXJrSXNzdWVzSGFuZGxlZChbaXNzdWUuaWRdKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XHUyNzEzIHt0KCdyZXZpZXcubWFya0hhbmRsZWQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7ZGVzY3JpcHRpb24gIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ29udGVudCwgLi4uKGxvbmcgJiYgIWV4cGFuZGVkID8gc3R5bGVzLm5vdGVDbGFtcCA6IHt9KSB9fT57cmVuZGVyV2l0aFBlZWsoZGVzY3JpcHRpb24pfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICB7aXNzdWUucmVzb2x1dGlvbiA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcsIHBhZGRpbmc6ICc2cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGJhY2tncm91bmQ6ICdyZ2JhKDc4LCAyMDEsIDE3NiwgMC4wOCknLCBib3JkZXI6ICcxcHggc29saWQgcmdiYSg3OCwgMjAxLCAxNzYsIDAuMzUpJywgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgXHUyNzEzIHtpc3N1ZS5yZXNvbHV0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAge2lzc3VlLmZpeFBsYW4gIT0gbnVsbCAmJiAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYW4gPSBpc3N1ZS5maXhQbGFuXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxhbk9wZW4gPSBpc3N1ZUV4cGFuZGVkW2Ake2lzc3VlLmlkfS1wbGFuYF0gPT09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc2cHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBiYWNrZ3JvdW5kOiAncmdiYSgzNywgOTksIDIzNSwgMC4wNSknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEyKSknLCBmb250U2l6ZTogJzExcHgnLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMubGlua0J0biwgd2lkdGg6ICcxMDAlJywgdGV4dEFsaWduOiAnbGVmdCcsIHBhZGRpbmc6ICc1cHggMTBweCcsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldElzc3VlRXhwYW5kZWQoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW2Ake2lzc3VlLmlkfS1wbGFuYF06ICEocHJldmlvdXNbYCR7aXNzdWUuaWR9LXBsYW5gXSA9PT0gdHJ1ZSkgfSkpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdUQ4M0RcdURDQzQge3QoJ2ZpeC5wbGFuJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShwbGFuLnN0YXR1cyA9PT0gJ3BlbmRpbmcnID8gJyNkOTc3MDYnIDogJyMyNTYzZWInKX0+e3BsYW4uc3RhdHVzID09PSAncGVuZGluZycgPyAnXHU1Rjg1XHU4QkM0XHU1QkExJyA6ICdcdTVERjJcdTZEM0VcdTUzRDEnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGxhbi5maWxlcy5sZW5ndGggPiAwICYmIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJyB9fT57cGxhbi5maWxlcy5zbGljZSgwLCAzKS5qb2luKCcsICcpfTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPntwbGFuT3BlbiA/ICdcdTI1QjInIDogJ1x1MjVCQyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7cGxhbk9wZW4gJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzJweCAxMHB4IDhweCcsIGxpbmVIZWlnaHQ6IDEuNyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PGI+e3QoJ2ZpeC5wbGFuQXBwcm9hY2gnKX1cdUZGMUE8L2I+e3BsYW4uYXBwcm9hY2h9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjxiPnt0KCdmaXgucGxhbkltcGFjdCcpfVx1RkYxQTwvYj57cGxhbi5pbXBhY3R9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjxiPnt0KCdmaXgucGxhbkJlbmVmaXQnKX1cdUZGMUE8L2I+e3BsYW4uYmVuZWZpdH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PGI+e3QoJ2ZpeC5wbGFuUmlzaycpfVx1RkYxQTwvYj57cGxhbi5yaXNrfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9KSgpfVxuICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeFN0YXRzICE9IG51bGwgfHwgQm9vbGVhbihpc3N1ZS5maXhEaWZmKSkgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5saW5rQnRuLCBtYXJnaW5Ub3A6ICc0cHgnLCBkaXNwbGF5OiAnYmxvY2snIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0Rml4RXhwYW5kZWQoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW2lzc3VlLmlkXTogIShwcmV2aW91c1tpc3N1ZS5pZF0gPT09IHRydWUpIH0pKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBcdUQ4M0RcdUREMjcge3QoJ3Jldmlldy5maXhEZXRhaWwnKX1cdUZGMDh7U3RyaW5nKGlzc3VlLmZpeFN0YXRzPy5maWxlcyA/PyAwKX0ge3QoJ3Jldmlldy5maXhTdGF0RmlsZXMnKX0gXHUwMEI3ICt7U3RyaW5nKGlzc3VlLmZpeFN0YXRzPy5pbnNlcnRpb25zID8/IDApfSBcdTIyMTJ7U3RyaW5nKGlzc3VlLmZpeFN0YXRzPy5kZWxldGlvbnMgPz8gMCl9XHVGRjA5e2ZpeEV4cGFuZGVkW2lzc3VlLmlkXSA9PT0gdHJ1ZSA/ICdcdTI1QjInIDogJ1x1MjVCQyd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtmaXhFeHBhbmRlZFtpc3N1ZS5pZF0gPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeEZpbGVzID8/IFtdKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzNweCcgfX0+e3QoJ3Jldmlldy5maXhGaWxlcycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeEZpbGVzID8/IFtdKS5tYXAoKGZpbGUpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZmlsZX0gc3R5bGU9e3sgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsIGZvbnRTaXplOiAnMTFweCcgfX0+e2ZpbGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeEltcGFjdCA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICczcHgnIH19Pnt0KCdyZXZpZXcuZml4SW1wYWN0Jyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc3N1ZS5maXhJbXBhY3QubWFwKChlbnRyeSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeS5zeW1ib2x9IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzVweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMDk2OWRhJyl9PntlbnRyeS5zeW1ib2x9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7JyAnfXt0KCdyZXZpZXcuZGVmaW5lZEluJyl9IHtlbnRyeS5kZWZpbmVkSW59IFx1MDBCNyB7U3RyaW5nKGVudHJ5LmNhbGxlcnMubGVuZ3RoKX0ge3QoJ3Jldmlldy5jYWxsQ291bnQnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2FsbGVycy5zbGljZSgwLCA1KS5tYXAoKGNhbGxlciwgY2FsbGVySW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2NhbGxlckluZGV4fSBzdHlsZT17eyBmb250U2l6ZTogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgcGFkZGluZ0xlZnQ6ICcxMnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUgZG90dGVkJyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgb3BlblBlZWsoY2FsbGVyLmZpbGUsIE51bWJlcihjYWxsZXIubGluZSkpIH19PntjYWxsZXIuZmlsZX06e2NhbGxlci5saW5lfTwvc3Bhbj4ge2NhbGxlci5zbmlwcGV0LnNsaWNlKDAsIDgwKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtCb29sZWFuKGlzc3VlLmZpeERpZmYpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICczcHgnIH19Pnt0KCdyZXZpZXcuZml4RGlmZicpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctaW5zZXQsIHJnYmEoNSw1LDUsMC4wMykpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzZweCA4cHgnLCBtYXhIZWlnaHQ6ICczMDBweCcsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZW5kZXJEaWZmTGluZXMoaXNzdWUuZml4RGlmZil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICB7bG9uZyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmxpbmtCdG59IG9uQ2xpY2s9eygpID0+IHsgc2V0SXNzdWVFeHBhbmRlZCh7IC4uLmlzc3VlRXhwYW5kZWQsIFtpc3N1ZS5pZF06ICFleHBhbmRlZCB9KSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtleHBhbmRlZCA/IHQoJ25vdGVzLmNvbGxhcHNlJykgOiB0KCdub3Rlcy5leHBhbmQnKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVNZXRhfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57dCgncmV2aWV3LnRhcmdldCcpfToge2lzc3VlVGFyZ2V0TGFiZWwoaXNzdWUuY2hhbmdlSWQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57Zm9ybWF0VGltZShpc3N1ZS5jcmVhdGVkQXQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKVxuICAgICAgICB9KSgpfVxuICAgICAgPC9DYXJkPlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ3ZlcmlmeS5yZWNvcmRzJyl9PlxuICAgICAgICB7dmVyaWZpY2F0aW9ucy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgndmVyaWZ5LnJlY29yZHNFbXB0eScpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3ZlcmlmaWNhdGlvbnMuc2xpY2UoMCwgMjApLm1hcCgocmVjb3JkKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17cmVjb3JkLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHJlY29yZC5zdGF0dXMgPT09ICdwYXNzZWQnID8gJyM0ZWM5YjAnIDogJyNkY2RjYWEnKX0+e3JlY29yZC5zdGF0dXN9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3JlY29yZC5uYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2Zvcm1hdFRpbWUocmVjb3JkLmNyZWF0ZWRBdCl9PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICA8Lz5cbiAgKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvb3R9IGRhdGEtdGVzdGlkPVwicHJvamVjdC1jb250cm9sLXdvcmtzcGFjZVwiPlxuICAgICAge3Byb3BzLmxheW91dE1vZGUgIT09ICdvdmVybGF5JyAmJiA8c3R5bGU+e0xBWU9VVF9TVFlMRX08L3N0eWxlPn1cbiAgICAgIHtwcm9wcy5sYXlvdXRNb2RlICE9PSAnb3ZlcmxheScgJiYgPGRpdlxuICAgICAgICBkYXRhLXRlc3RpZD1cInByb2plY3QtY29udHJvbC1kaXZpZGVyXCJcbiAgICAgICAgb25Qb2ludGVyRG93bj17b25EaXZpZGVyRG93bn1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAwLCBib3R0b206IDAsIHJpZ2h0OiAtNCwgd2lkdGg6IDgsXG4gICAgICAgICAgY3Vyc29yOiAnY29sLXJlc2l6ZScsIHpJbmRleDogMjAsXG4gICAgICAgIH19XG4gICAgICAvPn1cbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5uYXZ9PlxuICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLnRpdGxlfT57dCgnd29ya3NwYWNlLnRpdGxlJyl9PC9zcGFuPlxuICAgICAgICB7dGFicy5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgPGJ1dHRvbiBrZXk9e2VudHJ5LmtleX0gc3R5bGU9e3N0eWxlcy50YWIodGFiID09PSBlbnRyeS5rZXkpfSBvbkNsaWNrPXsoKSA9PiB7IHNldFRhYihlbnRyeS5rZXkpIH19PntlbnRyeS5sYWJlbH08L2J1dHRvbj5cbiAgICAgICAgKSl9XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJ1bm5pbmdDb3VudCA9IHJ1bnMuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuc3RhdHVzID09PSAncnVubmluZycgfHwgZW50cnkuc3RhdHVzID09PSAncXVldWVkJyB8fCBlbnRyeS5zdGF0dXMgPT09ICd2ZXJpZnlpbmcnKS5sZW5ndGhcbiAgICAgICAgICBjb25zdCBmYWlsZWRDb3VudCA9IHJ1bnMuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuc3RhdHVzID09PSAnZmFpbGVkJyB8fCBlbnRyeS5zdGF0dXMgPT09ICdwYXVzZWQnKS5sZW5ndGhcbiAgICAgICAgICBpZiAocnVubmluZ0NvdW50ID09PSAwICYmIGZhaWxlZENvdW50ID09PSAwKSByZXR1cm4gbnVsbFxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIG1hcmdpbkxlZnQ6ICc0cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAge3J1bm5pbmdDb3VudCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKHRoZW1lQXdhcmVUZXh0KCcjMjU2M2ViJykpLCBjdXJzb3I6ICdwb2ludGVyJywgYm9yZGVyOiAnbm9uZScgfX0gdGl0bGU9e3QoJ2JhZGdlLnJ1bm5pbmcnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcocnVubmluZ0NvdW50KSl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldFRhYignZXhlY3V0aW9uJykgfX0+XHUyNUI2IHtTdHJpbmcocnVubmluZ0NvdW50KX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge2ZhaWxlZENvdW50ID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UodGhlbWVBd2FyZVRleHQoJyNmMTRjNGMnKSksIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXI6ICdub25lJyB9fSB0aXRsZT17dCgnYmFkZ2UuZmFpbGVkJykucmVwbGFjZSgne259JywgU3RyaW5nKGZhaWxlZENvdW50KSl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldFRhYignZXhlY3V0aW9uJykgfX0+XHUyNzE3IHtTdHJpbmcoZmFpbGVkQ291bnQpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIClcbiAgICAgICAgfSkoKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmJvZHl9PlxuICAgICAgICB7cHJvcHMuc2Vzc2lvbklkID09PSB1bmRlZmluZWQgfHwgcHJvcHMuc2Vzc2lvbklkID09PSAnJyA/IDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3dvcmtzcGFjZS5zZWxlY3RTZXNzaW9uJyl9PC9kaXY+IDogPD5cbiAgICAgICAgICB7bG9hZEVycm9yICE9PSBudWxsICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2Vycm9yLmxvYWQnKX06IHtsb2FkRXJyb3J9PC9kaXY+fVxuICAgICAgICAgIHtzdGF0ZT8ucmVhZHkgPT09IGZhbHNlICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3N0YXRlLnJlYXNvbiA/PyAnJ308L2Rpdj59XG4gICAgICAgICAge3RhYiA9PT0gJ2NvbW1pdHMnICYmIGNvbW1pdHNUYWJ9XG4gICAgICAgICAge3RhYiA9PT0gJ292ZXJ2aWV3JyAmJiBvdmVydmlld1RhYn1cbiAgICAgICAgICB7dGFiID09PSAnZXhlY3V0aW9uJyAmJiBleGVjdXRpb25UYWJ9XG4gICAgICAgICAge3RhYiA9PT0gJ3JldmlldycgJiYgcmV2aWV3VGFifVxuICAgICAgICAgIHt0YWIgPT09ICdub3RlcycgJiYgbm90ZXNUYWJ9XG4gICAgICAgICAge3RhYiA9PT0gJ3NldHRpbmdzJyAmJiBzZXR0aW5nc1RhYn1cbiAgICAgICAgPC8+fVxuICAgICAgPC9kaXY+XG4gICAgICB7Y29uZmlybURpYWxvZyAhPT0gbnVsbCAmJiAoXG4gICAgICAgIDxDb25maXJtRGlhbG9nXG4gICAgICAgICAgdGl0bGU9e2NvbmZpcm1EaWFsb2cudGl0bGV9XG4gICAgICAgICAgbWVzc2FnZT17Y29uZmlybURpYWxvZy5tZXNzYWdlfVxuICAgICAgICAgIGRhbmdlcj17Y29uZmlybURpYWxvZy5kYW5nZXJ9XG4gICAgICAgICAgY29uZmlybUxhYmVsPXtjb25maXJtRGlhbG9nLmNvbmZpcm1MYWJlbH1cbiAgICAgICAgICBhbHQ9e2NvbmZpcm1EaWFsb2cuYWx0ID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiB7XG4gICAgICAgICAgICBsYWJlbDogY29uZmlybURpYWxvZy5hbHQubGFiZWwsXG4gICAgICAgICAgICBvbkFsdDogKCkgPT4geyBjb25maXJtRGlhbG9nLmFsdCEub25BbHQoKTsgc2V0Q29uZmlybURpYWxvZyhudWxsKSB9LFxuICAgICAgICAgIH19XG4gICAgICAgICAgb25DYW5jZWw9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyhudWxsKSB9fVxuICAgICAgICAgIG9uQ29uZmlybT17KCkgPT4geyBjb25maXJtRGlhbG9nLm9uQ29uZmlybSgpOyBzZXRDb25maXJtRGlhbG9nKG51bGwpIH19XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAge3BlZWsgIT09IG51bGwgJiYgKFxuICAgICAgICA8ZGl2IGRhdGEtdGVzdGlkPVwicGMtcGVlay1vdmVybGF5XCIgc3R5bGU9e3sgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCBiYWNrZ3JvdW5kOiAncmdiYSgxNSwyMyw0MiwwLjQ1KScsIGJhY2tkcm9wRmlsdGVyOiAnYmx1cigycHgpJywgekluZGV4OiAxMDAwLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0gb25DbGljaz17KCkgPT4geyBzZXRQZWVrKG51bGwpIH19PlxuICAgICAgICAgIDxkaXYgZGF0YS10ZXN0aWQ9XCJwYy1wZWVrLWNhcmRcIiBzdHlsZT17eyB3aWR0aDogJ21pbig3NjBweCwgOTJ2dyknLCBtYXhIZWlnaHQ6ICc4MHZoJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBib3JkZXJSYWRpdXM6ICcxMHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJveFNoYWRvdzogJzAgMTZweCA0OHB4IHJnYmEoMCwwLDAsMC4yNSknLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nIH19IG9uQ2xpY2s9eyhlKSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCkgfX0+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIHBhZGRpbmc6ICcxMHB4IDE0cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEpKScgfX0+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+e3BlZWsucGF0aH06e1N0cmluZyhwZWVrLmxpbmUpfTwvc3Bhbj5cbiAgICAgICAgICAgICAge3BlZWtEYXRhPy5leGlzdHMgPT09IHRydWUgJiYgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e1N0cmluZyhwZWVrRGF0YS5zdGFydExpbmUpfVx1MjAxM3tTdHJpbmcocGVla0RhdGEuZW5kTGluZSl9IC8ge1N0cmluZyhwZWVrRGF0YS50b3RhbExpbmVzKX0gXHU4ODRDPC9zcGFuPn1cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggMTBweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRQZWVrKG51bGwpIH19Plx1MjcxNTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93OiAnYXV0bycsIHBhZGRpbmc6ICcxMHB4IDAnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWluc2V0LCByZ2JhKDUsNSw1LDAuMDMpKScgfX0+XG4gICAgICAgICAgICAgIHtwZWVrQnVzeSAmJiA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5lbXB0eSB9fT5cdThCRkJcdTUzRDZcdTRFMkRcdTIwMjY8L2Rpdj59XG4gICAgICAgICAgICAgIHshcGVla0J1c3kgJiYgcGVla0RhdGEgIT09IG51bGwgJiYgcGVla0RhdGEuZXhpc3RzID09PSBmYWxzZSAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Plx1NjU4N1x1NEVGNlx1NEUwRFx1NUI1OFx1NTcyOFx1RkYwOFx1NTNFRlx1ODBGRFx1NURGMlx1ODhBQlx1NTIyMFx1OTY2NFx1NjIxNlx1NzlGQlx1NTJBOFx1RkYwOTwvZGl2Pn1cbiAgICAgICAgICAgICAgeyFwZWVrQnVzeSAmJiBwZWVrRGF0YT8uZXhpc3RzID09PSB0cnVlICYmIChwZWVrRGF0YS5saW5lcyA/PyBbXSkubWFwKChlbnRyeSkgPT4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeS5ufSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBwYWRkaW5nOiAnMCAxNHB4JywgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsIGZvbnRTaXplOiAnMTEuNXB4JywgbGluZUhlaWdodDogMS43LCBiYWNrZ3JvdW5kOiBlbnRyeS5uID09PSBwZWVrLmxpbmUgPyAncmdiYSgzNyw5OSwyMzUsMC4wOCknIDogJ3RyYW5zcGFyZW50JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IHdpZHRoOiA0MCwgdGV4dEFsaWduOiAncmlnaHQnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZmxleFNocmluazogMCB9fT57U3RyaW5nKGVudHJ5Lm4pfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+e2VudHJ5LnRleHQgPT09ICcnID8gJ1xcdTAwQTAnIDogZW50cnkudGV4dH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKVxufVxuIiwgIi8qKlxuICogXHU2M0QwXHU0RUE0XHU4RjZFXHU2QjIxXHU4MDVBXHU3QzdCXHVGRjA4XHU1QkEyXHU2MjM3XHU3QUVGXHVGRjA5XHVGRjFBXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XHU1M0YwXHU3Njg0XHU0RTBCXHU2MkM5XHU2ODQ2XHU2MzA5XHUzMDBDXHU0RTAwXHU4RjZFXHU1REU1XHU0RjVDXHUzMDBEXHU1MjA2XHU3RUM0XHU1QzU1XHU3OTNBXHUzMDAyXG4gKiBcdTRFMEUgcnVudGltZS9oaXN0b3J5LnRzIFx1NzY4NCBjbHVzdGVyQ29tbWl0cyBcdTRGRERcdTYzMDFcdTU0MENcdTRFMDBcdTU0MkZcdTUzRDFcdTVGMEZcdUZGMDhWMS4wIFx1MDBBNzk3L1x1MDBBNzk5XHVGRjA5XHVGRjFBXG4gKiBcdTc2RjhcdTkwQkJcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdTk1RjRcdTk2OTRcdThEODVcdThGQzdcdTdBOTdcdTUzRTNcdUZGMDhcdTlFRDhcdThCQTQgMzZoXHVGRjA5XHU1MjA3XHU2NUFEXHVGRjFCXHU4RkRFXHU3RUVEIFx1MjI2NTMgXHU0RTJBXHU2M0QwXHU0RUE0XHU1NDBFXHU0RTBFXHU1REYyXHU4MDVBXHU2NTg3XHU0RUY2XG4gKiBcdTk2RjZcdTkxQ0RcdTUzRTBcdTRFNUZcdTUyMDdcdTY1QURcdTMwMDJcdTY3MERcdTUyQTFcdTdBRUZcdTkwQTNcdTRFRkRcdTVERTVcdTRGNUNcdTU3MjggZ2l0IFx1NjI2Qlx1NjNDRlx1NUM0Mlx1RkYwOFx1OTFDRFx1NUVGQVx1NTM4Nlx1NTNGMlx1RkYwOVx1RkYwQ1x1OEZEOVx1NEVGRFx1OTc2Mlx1NTQxMVxuICogL2NvbW1pdHMgXHU4RkQ0XHU1NkRFXHU3Njg0XHU2M0QwXHU0RUE0XHU2NzYxXHU3NkVFXHUyMDE0XHUyMDE0XHU0RTI0XHU1OTA0XHU4OUM0XHU1MjE5XHU2NTM5XHU1MkE4XHU1RkM1XHU5ODdCXHU1NDBDXHU2QjY1XHUzMDAyXG4gKlxuICogQG1vZHVsZSBkc2gtY2xpZW50LXByb2plY3QtY29udHJvbC9jb21wb25lbnRzL2NvbW1pdC1yb3VuZHNcbiAqL1xuXG4vKiogXHU4MDVBXHU3QzdCXHU4RjkzXHU1MTY1XHU3Njg0XHU2NzAwXHU1QzBGXHU1RjYyXHU3MkI2XHVGRjA4L2NvbW1pdHMgXHU3Njg0XHU2M0QwXHU0RUE0XHU2NzYxXHU3NkVFXHU1QjUwXHU5NkM2XHVGRjA5XHUzMDAyICovXG5leHBvcnQgaW50ZXJmYWNlIFJvdW5kQ29tbWl0IHtcbiAgc2hhOiBzdHJpbmdcbiAgLyoqIFx1NjNEMFx1NEVBNFx1NjVGNlx1OTVGNFx1RkYwOFx1NkJFQlx1NzlEMlx1RkYwOVx1MzAwMiAqL1xuICBkYXRlOiBudW1iZXJcbiAgLyoqIFx1NkQ4OVx1NTNDQVx1NjU4N1x1NEVGNlx1OERFRlx1NUY4NFx1RkYwOFx1NzZGOFx1NUJGOVx1NEVEM1x1NUU5M1x1NjgzOVx1RkYwOVx1MzAwMiAqL1xuICBmaWxlczogc3RyaW5nW11cbn1cblxuLyoqIFx1NEUwMFx1OEY2RVx1NURFNVx1NEY1Q1x1RkYxQVx1NEZERFx1NjMwMVx1NEYyMFx1NTE2NVx1OTg3QVx1NUU4Rlx1NzY4NFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1RkYwOC9jb21taXRzIFx1NEUzQVx1NjVCMFx1MjE5Mlx1NjVFN1x1RkYwOSsgXHU2NUY2XHU5NUY0XHU4MzAzXHU1NkY0XHUzMDAyICovXG5leHBvcnQgaW50ZXJmYWNlIENvbW1pdFJvdW5kIHtcbiAgY29tbWl0czogUm91bmRDb21taXRbXVxuICAvKiogXHU4RjZFXHU1MTg1XHU2NzAwXHU2NUU5XHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0XHUzMDAyICovXG4gIGZpcnN0QXQ6IG51bWJlclxuICAvKiogXHU4RjZFXHU1MTg1XHU2NzAwXHU2NjVBXHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0XHUzMDAyICovXG4gIGxhc3RBdDogbnVtYmVyXG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1JPVU5EX0dBUF9NUyA9IDM2ICogNjAgKiA2MCAqIDEwMDBcblxuLyoqIFx1NEUwRVx1NjcwRFx1NTJBMVx1N0FFRiBjbHVzdGVyQ29tbWl0cyBcdTc2RjhcdTU0MENcdTc2ODRcdTkxQ0RcdTUzRTBcdTczODdcdUZGMUFcdTU0N0RcdTRFMkRcdTY1ODdcdTRFRjZcdTY1NzAgLyBtYXgoXHU2NzJDXHU2M0QwXHU0RUE0XHU2NTg3XHU0RUY2XHU2NTcwLCAxKVx1MzAwMiAqL1xuZnVuY3Rpb24gb3ZlcmxhcFJhdGlvKGZpbGVzOiBzdHJpbmdbXSwgZXhpc3Rpbmc6IFNldDxzdHJpbmc+KTogbnVtYmVyIHtcbiAgaWYgKGV4aXN0aW5nLnNpemUgPT09IDApIHJldHVybiAwXG4gIGxldCBoaXRzID0gMFxuICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIGlmIChleGlzdGluZy5oYXMoZmlsZSkpIGhpdHMgKz0gMVxuICByZXR1cm4gaGl0cyAvIE1hdGgubWF4KGZpbGVzLmxlbmd0aCwgMSlcbn1cblxuLyoqXG4gKiBcdTYyOEFcdUZGMDhcdTY1QjBcdTIxOTJcdTY1RTdcdTYyMTZcdTY1RTdcdTIxOTJcdTY1QjBcdTU3NDdcdTUzRUZcdUZGMDlcdThGREVcdTdFRURcdTYzRDBcdTRFQTRcdTgwNUFcdTYyMTBcdThGNkVcdTZCMjFcdTMwMDJcbiAqIFx1NjVGNlx1OTVGNFx1OTVGNFx1OTY5NFx1NTNENlx1N0VERFx1NUJGOVx1NTAzQ1x1RkYxQVx1NTIxN1x1ODg2OFx1OTg3QVx1NUU4Rlx1NEUwRFx1NEZERFx1OEJDMVx1NjVGNlx1OTVGNFx1NjVCOVx1NTQxMVx1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2x1c3RlckludG9Sb3VuZHMoY29tbWl0czogUm91bmRDb21taXRbXSwgY2x1c3RlckdhcE1zOiBudW1iZXIgPSBERUZBVUxUX1JPVU5EX0dBUF9NUyk6IENvbW1pdFJvdW5kW10ge1xuICBjb25zdCByb3VuZHM6IENvbW1pdFJvdW5kW10gPSBbXVxuICBsZXQgY3VycmVudDogUm91bmRDb21taXRbXSA9IFtdXG4gIGxldCBjdXJyZW50RmlsZXMgPSBuZXcgU2V0PHN0cmluZz4oKVxuXG4gIGNvbnN0IHB1c2hSb3VuZCA9ICgpOiB2b2lkID0+IHtcbiAgICBpZiAoY3VycmVudC5sZW5ndGggPT09IDApIHJldHVyblxuICAgIGNvbnN0IHRpbWVzID0gY3VycmVudC5tYXAoKGNvbW1pdCkgPT4gY29tbWl0LmRhdGUpXG4gICAgcm91bmRzLnB1c2goeyBjb21taXRzOiBjdXJyZW50LCBmaXJzdEF0OiBNYXRoLm1pbiguLi50aW1lcyksIGxhc3RBdDogTWF0aC5tYXgoLi4udGltZXMpIH0pXG4gICAgY3VycmVudCA9IFtdXG4gICAgY3VycmVudEZpbGVzID0gbmV3IFNldCgpXG4gIH1cblxuICBmb3IgKGNvbnN0IGNvbW1pdCBvZiBjb21taXRzKSB7XG4gICAgY29uc3QgcHJldmlvdXMgPSBjdXJyZW50W2N1cnJlbnQubGVuZ3RoIC0gMV1cbiAgICBjb25zdCBnYXBCcmVhayA9IHByZXZpb3VzICE9PSB1bmRlZmluZWQgJiYgTWF0aC5hYnMoY29tbWl0LmRhdGUgLSBwcmV2aW91cy5kYXRlKSA+IGNsdXN0ZXJHYXBNc1xuICAgIGNvbnN0IGZpbGVCcmVhayA9IGN1cnJlbnQubGVuZ3RoID49IDMgJiYgb3ZlcmxhcFJhdGlvKGNvbW1pdC5maWxlcywgY3VycmVudEZpbGVzKSA9PT0gMFxuICAgIGlmIChnYXBCcmVhayB8fCBmaWxlQnJlYWspIHB1c2hSb3VuZCgpXG4gICAgY3VycmVudC5wdXNoKGNvbW1pdClcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgY29tbWl0LmZpbGVzKSBjdXJyZW50RmlsZXMuYWRkKGZpbGUpXG4gIH1cbiAgcHVzaFJvdW5kKClcbiAgcmV0dXJuIHJvdW5kc1xufVxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VMYXlvdXRFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUsIHVzZVN5bmNFeHRlcm5hbFN0b3JlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBXb3Jrc3BhY2VGcmFtZSB9IGZyb20gJy4vV29ya3NwYWNlRnJhbWUudHN4J1xuXG5pbnRlcmZhY2UgQ3VycmVudFNlc3Npb24ge1xuICBnZXRTbmFwc2hvdCgpOiB7IGtleT86IHN0cmluZyB9XG4gIHN1YnNjcmliZShsaXN0ZW5lcjogKCkgPT4gdm9pZCk6ICgpID0+IHZvaWRcbn1cblxuaW50ZXJmYWNlIFBhbmVsSW5mbyB7XG4gIGdldFNuYXBzaG90KCk6IHsgYWN0aXZlUGFuZWxJZDogc3RyaW5nIHwgbnVsbCB9XG4gIHN1YnNjcmliZShsaXN0ZW5lcjogKCkgPT4gdm9pZCk6ICgpID0+IHZvaWRcbn1cblxuaW50ZXJmYWNlIE1vZGVybldvcmtzcGFjZVByb3BzIHtcbiAgY3VycmVudDogQ3VycmVudFNlc3Npb25cbiAgcGFuZWxJbmZvOiBQYW5lbEluZm9cbiAgZW5hYmxlZDogYm9vbGVhblxuICBvbkRpc21pc3M6ICgpID0+IHZvaWRcbn1cblxuaW50ZXJmYWNlIEJvdW5kcyB7XG4gIGxlZnQ6IG51bWJlclxuICB0b3A6IG51bWJlclxuICB3aWR0aDogbnVtYmVyXG4gIGhlaWdodDogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3b3Jrc3BhY2VCb3VuZHMoZnJhbWU6IEJvdW5kcywgY2VudGVyOiBCb3VuZHMsIGNoYXRXaWR0aDogbnVtYmVyKTogQm91bmRzIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgYXZhaWxhYmxlID0gTWF0aC5mbG9vcihjZW50ZXIud2lkdGgpXG4gIGlmIChhdmFpbGFibGUgPCA1NjAgfHwgY2VudGVyLmhlaWdodCA8PSAwKSByZXR1cm4gdW5kZWZpbmVkXG4gIGNvbnN0IGNoYXQgPSBNYXRoLm1heCgyODAsIE1hdGgubWluKGNoYXRXaWR0aCwgYXZhaWxhYmxlIC0gMjgwKSlcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiBjZW50ZXIubGVmdCAtIGZyYW1lLmxlZnQsXG4gICAgdG9wOiBjZW50ZXIudG9wIC0gZnJhbWUudG9wLFxuICAgIHdpZHRoOiBhdmFpbGFibGUgLSBjaGF0LFxuICAgIGhlaWdodDogY2VudGVyLmhlaWdodCxcbiAgfVxufVxuXG4vKiogXHU2NUIwXHU3MjQ4XHU1QkJGXHU0RTNCXHU3Njg0XHU1MkEwXHU2Q0Q1XHU2RDZFXHU1QzQyXHVGRjFCXHU0RUM1XHU1MzhCXHU3RjI5XHU0RjFBXHU4QkREXHU1MjE3XHVGRjBDXHU0RTBEXHU2NTM5XHU1M0Q4XHU1Qjk4XHU2NUI5XHU1M0YzXHU0RkE3XHU2ODBGXHU2MjE2XHU3RjUxXHU2ODNDXHU2QTIxXHU2NzdGXHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gTW9kZXJuV29ya3NwYWNlKHsgY3VycmVudCwgcGFuZWxJbmZvLCBlbmFibGVkLCBvbkRpc21pc3MgfTogTW9kZXJuV29ya3NwYWNlUHJvcHMpIHtcbiAgY29uc3Qgc2Vzc2lvbklkID0gdXNlU3luY0V4dGVybmFsU3RvcmUoXG4gICAgKGxpc3RlbmVyKSA9PiBjdXJyZW50LnN1YnNjcmliZShsaXN0ZW5lciksXG4gICAgKCkgPT4gY3VycmVudC5nZXRTbmFwc2hvdCgpLmtleSxcbiAgKVxuICBjb25zdCBhY3RpdmVQYW5lbElkID0gdXNlU3luY0V4dGVybmFsU3RvcmUoXG4gICAgKGxpc3RlbmVyKSA9PiBwYW5lbEluZm8uc3Vic2NyaWJlKGxpc3RlbmVyKSxcbiAgICAoKSA9PiBwYW5lbEluZm8uZ2V0U25hcHNob3QoKS5hY3RpdmVQYW5lbElkLFxuICApXG4gIGNvbnN0IHZpc2libGUgPSBlbmFibGVkICYmIGFjdGl2ZVBhbmVsSWQgPT09IG51bGxcbiAgY29uc3QgZHJhZ0NsZWFudXAgPSB1c2VSZWY8KCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkPigpXG4gIGNvbnN0IFtib3VuZHMsIHNldEJvdW5kc10gPSB1c2VTdGF0ZTxCb3VuZHMgfCB1bmRlZmluZWQ+KClcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+ICgpID0+IHsgZHJhZ0NsZWFudXAuY3VycmVudD8uKCkgfSwgW3Zpc2libGVdKVxuICBjb25zdCBbY2hhdFdpZHRoLCBzZXRDaGF0V2lkdGhdID0gdXNlU3RhdGUoKCkgPT4ge1xuICAgIGNvbnN0IHNhdmVkID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYy5jaGF0V2lkdGgnKSA/PyAnJylcbiAgICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHNhdmVkKSAmJiBzYXZlZCA+PSAyODAgPyBzYXZlZCA6IDM2MFxuICB9KVxuXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCF2aXNpYmxlKSByZXR1cm5cbiAgICBjb25zdCByaWdodGJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCdbZGF0YS1yaWdodGJhci1jb2xdJylcbiAgICBjb25zdCBmcmFtZSA9IHJpZ2h0YmFyPy5wYXJlbnRFbGVtZW50XG4gICAgY29uc3QgY2VudGVycyA9IGZyYW1lPy5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PignOnNjb3BlID4gZGl2W2NsYXNzKj1cImNlbnRlckNvbFwiXScpXG4gICAgaWYgKGZyYW1lID09PSB1bmRlZmluZWQgfHwgZnJhbWUgPT09IG51bGwgfHwgY2VudGVycz8ubGVuZ3RoICE9PSAxKSB7XG4gICAgICBvbkRpc21pc3MoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IGNlbnRlciA9IGNlbnRlcnNbMF0hXG4gICAgY29uc3Qgb2xkUGFkZGluZyA9IGNlbnRlci5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLWxlZnQnKVxuICAgIGNvbnN0IG9sZFBhZGRpbmdQcmlvcml0eSA9IGNlbnRlci5zdHlsZS5nZXRQcm9wZXJ0eVByaW9yaXR5KCdwYWRkaW5nLWxlZnQnKVxuICAgIGNvbnN0IG9sZEJveFNpemluZyA9IGNlbnRlci5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdib3gtc2l6aW5nJylcbiAgICBjb25zdCBvbGRCb3hTaXppbmdQcmlvcml0eSA9IGNlbnRlci5zdHlsZS5nZXRQcm9wZXJ0eVByaW9yaXR5KCdib3gtc2l6aW5nJylcbiAgICBsZXQgYXBwbGllZFBhZGRpbmcgPSAnJ1xuICAgIGxldCBhY3RpdmUgPSB0cnVlXG5cbiAgICBjb25zdCB1cGRhdGUgPSAoKTogdm9pZCA9PiB7XG4gICAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuXG4gICAgICBjb25zdCBuZXh0ID0gd29ya3NwYWNlQm91bmRzKGZyYW1lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBjZW50ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIGNoYXRXaWR0aClcbiAgICAgIGlmIChuZXh0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb25EaXNtaXNzKClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBwYWRkaW5nID0gYCR7bmV4dC53aWR0aH1weGBcbiAgICAgIGlmIChwYWRkaW5nICE9PSBhcHBsaWVkUGFkZGluZykge1xuICAgICAgICBjZW50ZXIuc3R5bGUuc2V0UHJvcGVydHkoJ3BhZGRpbmctbGVmdCcsIHBhZGRpbmcsICdpbXBvcnRhbnQnKVxuICAgICAgICBhcHBsaWVkUGFkZGluZyA9IHBhZGRpbmdcbiAgICAgIH1cbiAgICAgIGNlbnRlci5zdHlsZS5zZXRQcm9wZXJ0eSgnYm94LXNpemluZycsICdib3JkZXItYm94JywgJ2ltcG9ydGFudCcpXG4gICAgICBzZXRCb3VuZHMoKHByZXZpb3VzKSA9PiBwcmV2aW91cz8ubGVmdCA9PT0gbmV4dC5sZWZ0ICYmIHByZXZpb3VzLnRvcCA9PT0gbmV4dC50b3AgJiYgcHJldmlvdXMud2lkdGggPT09IG5leHQud2lkdGggJiYgcHJldmlvdXMuaGVpZ2h0ID09PSBuZXh0LmhlaWdodCA/IHByZXZpb3VzIDogbmV4dClcbiAgICB9XG4gICAgY29uc3QgcmVzaXplID0gbmV3IFJlc2l6ZU9ic2VydmVyKHVwZGF0ZSlcbiAgICByZXNpemUub2JzZXJ2ZShmcmFtZSlcbiAgICByZXNpemUub2JzZXJ2ZShjZW50ZXIpXG4gICAgY29uc3QgbXV0YXRpb25zID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgaWYgKCFmcmFtZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtcmlnaHRiYXItY29sbGFwc2VkJykpIG9uRGlzbWlzcygpXG4gICAgICBlbHNlIHVwZGF0ZSgpXG4gICAgfSlcbiAgICBtdXRhdGlvbnMub2JzZXJ2ZShmcmFtZSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFsnZGF0YS1yaWdodGJhci1jb2xsYXBzZWQnXSB9KVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGUpXG4gICAgdXBkYXRlKClcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWN0aXZlID0gZmFsc2VcbiAgICAgIHJlc2l6ZS5kaXNjb25uZWN0KClcbiAgICAgIG11dGF0aW9ucy5kaXNjb25uZWN0KClcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGUpXG4gICAgICBpZiAoY2VudGVyLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctbGVmdCcpID09PSBhcHBsaWVkUGFkZGluZykge1xuICAgICAgICBpZiAob2xkUGFkZGluZyA9PT0gJycpIGNlbnRlci5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy1sZWZ0JylcbiAgICAgICAgZWxzZSBjZW50ZXIuc3R5bGUuc2V0UHJvcGVydHkoJ3BhZGRpbmctbGVmdCcsIG9sZFBhZGRpbmcsIG9sZFBhZGRpbmdQcmlvcml0eSlcbiAgICAgIH1cbiAgICAgIGlmIChjZW50ZXIuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnYm94LXNpemluZycpID09PSAnYm9yZGVyLWJveCcpIHtcbiAgICAgICAgaWYgKG9sZEJveFNpemluZyA9PT0gJycpIGNlbnRlci5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnYm94LXNpemluZycpXG4gICAgICAgIGVsc2UgY2VudGVyLnN0eWxlLnNldFByb3BlcnR5KCdib3gtc2l6aW5nJywgb2xkQm94U2l6aW5nLCBvbGRCb3hTaXppbmdQcmlvcml0eSlcbiAgICAgIH1cbiAgICAgIHNldEJvdW5kcyh1bmRlZmluZWQpXG4gICAgfVxuICB9LCBbdmlzaWJsZSwgY2hhdFdpZHRoLCBvbkRpc21pc3NdKVxuXG4gIGlmICghdmlzaWJsZSB8fCBib3VuZHMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGxcblxuICBjb25zdCBvbkRpdmlkZXJEb3duID0gKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQpOiB2b2lkID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3Qgb25Nb3ZlID0gKG1vdmU6IFBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignW2RhdGEtcmlnaHRiYXItY29sXScpPy5wYXJlbnRFbGVtZW50XG4gICAgICBjb25zdCBjZW50ZXIgPSBmcmFtZT8ucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJzpzY29wZSA+IGRpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0nKVxuICAgICAgaWYgKGNlbnRlciA9PT0gdW5kZWZpbmVkIHx8IGNlbnRlciA9PT0gbnVsbCkgcmV0dXJuXG4gICAgICBjb25zdCB3aWR0aCA9IE1hdGgubWF4KDI4MCwgTWF0aC5taW4oOTAwLCBNYXRoLnJvdW5kKGNlbnRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5yaWdodCAtIG1vdmUuY2xpZW50WCkpKVxuICAgICAgc2V0Q2hhdFdpZHRoKHdpZHRoKVxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BjLmNoYXRXaWR0aCcsIFN0cmluZyh3aWR0aCkpXG4gICAgfVxuICAgIGNvbnN0IG9uVXAgPSAoKTogdm9pZCA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcClcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyY2FuY2VsJywgb25VcClcbiAgICAgIGRyYWdDbGVhbnVwLmN1cnJlbnQgPSB1bmRlZmluZWRcbiAgICB9XG4gICAgZHJhZ0NsZWFudXAuY3VycmVudD8uKClcbiAgICBkcmFnQ2xlYW51cC5jdXJyZW50ID0gb25VcFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcClcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmNhbmNlbCcsIG9uVXApXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS10ZXN0aWQ9XCJwcm9qZWN0LWNvbnRyb2wtbW9kZXJuLXdvcmtzcGFjZVwiIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCAuLi5ib3VuZHMsIHBvaW50ZXJFdmVudHM6ICdhdXRvJyB9fT5cbiAgICAgIDxXb3Jrc3BhY2VGcmFtZSBrZXk9e3Nlc3Npb25JZCA/PyAnbGFuZGluZyd9IHsuLi4oc2Vzc2lvbklkID09PSB1bmRlZmluZWQgPyB7fSA6IHsgc2Vzc2lvbklkIH0pfSBsYXlvdXRNb2RlPVwib3ZlcmxheVwiIC8+XG4gICAgICA8ZGl2IGRhdGEtdGVzdGlkPVwicHJvamVjdC1jb250cm9sLW1vZGVybi1kaXZpZGVyXCIgb25Qb2ludGVyRG93bj17b25EaXZpZGVyRG93bn0gc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogMCwgYm90dG9tOiAwLCByaWdodDogLTQsIHdpZHRoOiA4LCBjdXJzb3I6ICdjb2wtcmVzaXplJywgekluZGV4OiAyMCB9fSAvPlxuICAgIDwvZGl2PlxuICApXG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBaUJBLElBQUFBLGdCQUFrQjs7O0FDTmxCLG1CQUFrQjs7O0FDTVgsU0FBUyxXQUFXLE9BQWdEO0FBQ3pFLFFBQU0sTUFBTSxvQkFBb0IsS0FBSyxLQUFLO0FBQzFDLE1BQUksUUFBUSxNQUFNO0FBQ2hCLFVBQU0sUUFBUSxPQUFPLFNBQVMsSUFBSSxDQUFDLEdBQUksRUFBRTtBQUN6QyxXQUFPLENBQUUsU0FBUyxLQUFNLEtBQU0sU0FBUyxJQUFLLEtBQUssUUFBUSxHQUFHO0FBQUEsRUFDOUQ7QUFDQSxRQUFNLGFBQWEsc0RBQXNELEtBQUssS0FBSztBQUNuRixNQUFJLGVBQWUsTUFBTTtBQUN2QixXQUFPLENBQUMsT0FBTyxXQUFXLENBQUMsQ0FBQyxHQUFHLE9BQU8sV0FBVyxDQUFDLENBQUMsR0FBRyxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFBQSxFQUM3RTtBQUNBLFNBQU87QUFDVDtBQUdPLFNBQVMsa0JBQWtCLEdBQVcsR0FBVyxHQUFtQjtBQUN6RSxRQUFNLFVBQVUsQ0FBQyxVQUEwQjtBQUN6QyxVQUFNLElBQUksUUFBUTtBQUNsQixXQUFPLEtBQUssVUFBVSxJQUFJLFVBQVUsSUFBSSxTQUFTLFVBQVU7QUFBQSxFQUM3RDtBQUNBLFNBQU8sU0FBUyxRQUFR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c0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsd0JBQXdCO0FBQUEsSUFDeEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIseUJBQXlCO0FBQUEsSUFDekIsMEJBQTBCO0FBQUEsSUFDMUIsMkJBQTJCO0FBQUEsSUFFM0Isa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFFaEIsZUFBZTtBQUFBLElBQ2YsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsYUFBYTtBQUFBLElBQ2IsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBRWYsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIscUJBQXFCO0FBQUEsSUFDckIsa0JBQWtCO0FBQUEsSUFDbEIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUEsSUFDekIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsa0JBQWtCO0FBQUEsSUFDbEIsdUJBQXVCO0FBQUEsSUFFdkIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsSUFFbEIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEs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QUFPLEVBQUUsWUFBWSxLQUFLLGNBQWMsTUFBTSxFQUFFLEdBQUcsS0FBSztBQUFBLE1BQ3JGLE9BQU8sSUFBSTtBQUFBLElBQ2I7QUFBQSxFQUNGO0FBR0EsTUFBSSxNQUFNLE9BQU8sc0JBQXNCLE1BQU07QUFDM0MsV0FBTyxJQUFJLE1BQU0sU0FBUztBQUFBLE1BQ3hCLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNQLEdBQUcsQ0FBQyxVQUFlO0FBQ2pCLFVBQUksT0FBTyxhQUFhLGlCQUFrQixRQUFPO0FBQ2pELFlBQU0sU0FBUyxPQUFPO0FBQ3RCLGFBQU8sY0FBQUEsUUFBTSxjQUFjLFlBQVk7QUFBQSxRQUNyQyxPQUFPO0FBQUEsUUFDUCxjQUFjLFFBQVEsZ0JBQWdCO0FBQUEsUUFDdEMsWUFBWSxRQUFRLGNBQWM7QUFBQSxRQUNsQyxXQUFXLFFBQVEsYUFBYTtBQUFBLFFBQ2hDLFlBQVksUUFBUTtBQUFBLFFBQ3BCLFFBQVEsU0FBUyxjQUFjO0FBQUEsTUFDakMsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELGFBQVcsQ0FBQyxTQUFTLEtBQUssS0FBSztBQUFBLElBQzdCLENBQUMsYUFBYSw0QkFBVztBQUFBLElBQ3pCLENBQUMsY0FBYyxvQ0FBUztBQUFBLElBQ3hCLENBQUMsb0JBQW9CLGlDQUFRO0FBQUEsRUFDL0IsR0FBWTtBQUNWLFFBQUksTUFBTSxPQUFPLHNCQUFzQixNQUFNO0FBQzNDLGFBQU8sSUFBSSxNQUFNLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixLQUFLLFFBQVEsR0FBRyxpQkFBaUIsS0FBSyxDQUFDO0FBQUEsSUFDakcsQ0FBQztBQUFBLEVBQ0g7QUFDRjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJuYW1lIiwgIlJlYWN0IiwgIm9rIiwgImRhdGEiLCAiYXBwbHkiLCAib3BlbkNvdW50IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiXQp9Cg==
