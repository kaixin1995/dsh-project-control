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
    "review.purgeOpen": "\u{1F5D1} \u6E05\u7A7A\u672A\u89E3\u51B3",
    "review.purgeOpenHint": "\u628A\u5F53\u524D\u7B5B\u9009\u4E0B\u5168\u90E8\u672A\u89E3\u51B3\u95EE\u9898\u4E00\u952E\u7F6E\u4E3A\u5DF2\u5904\u7406\uFF08\u4E0D\u4FEE\u4EFB\u4F55\u4EE3\u7801\uFF09\uFF1B\u4FDD\u7559\u671F\u540E\u81EA\u52A8\u7269\u7406\u6E05\u7406",
    "review.purgeOpenConfirmTitle": "\u6E05\u7A7A\u5168\u90E8\u672A\u89E3\u51B3\u95EE\u9898\uFF1F",
    "review.purgeOpenConfirmMsg": "\u5C06\u628A {n} \u6761\u672A\u89E3\u51B3\u95EE\u9898\u5168\u90E8\u7F6E\u4E3A\u300C\u5DF2\u5904\u7406\u300D\u2014\u2014\u4E0D\u4F1A\u4FEE\u6539\u4EFB\u4F55\u4EE3\u7801\uFF0C\u4EC5\u5173\u95ED\u6E05\u5355\u6761\u76EE\u3002\u5DF2\u89E3\u51B3/\u5DF2\u62D2\u7EDD\u7684\u95EE\u9898\u4E0D\u53D7\u5F71\u54CD\u3002\u6B64\u64CD\u4F5C\u4E0D\u53EF\u4E00\u952E\u64A4\u9500\uFF0C\u4F46\u6BCF\u6761\u53EF\u5355\u72EC\u5728\u5361\u7247\u91CC\u6539\u56DE\u300C\u5F85\u5904\u7406\u300D\u3002",
    "review.purgeOpenDone": "\u5DF2\u6E05\u7A7A {n} \u6761\u672A\u89E3\u51B3\u95EE\u9898\uFF08\u7F6E\u4E3A\u5DF2\u5904\u7406\uFF09",
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
    "review.purgeOpen": "\u{1F5D1} Purge pending",
    "review.purgeOpenHint": "Mark every pending issue under the current filter as handled in one shot (no code changes); auto-purged after the retention window",
    "review.purgeOpenConfirmTitle": "Purge all pending issues?",
    "review.purgeOpenConfirmMsg": 'Will mark {n} pending issues as "handled" \u2014 no code is modified, only the list entries are closed. Resolved/rejected issues are untouched. Not one-click undoable, but each issue can be set back to pending on its card.',
    "review.purgeOpenDone": "\u5DF2\u6E05\u7A7A {n} \u6761\u672A\u89E3\u51B3\u95EE\u9898\uFF08\u7F6E\u4E3A\u5DF2\u5904\u7406\uFF09",
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
  const purgeOpenIssues = async () => {
    const { ok, data } = await post("/project-control/api/issues/purge-open", { sessionId: props.sessionId ?? "" });
    await loadIssues();
    setActionResult(ok ? "\u2713 " + t("review.purgeOpenDone").replace("{n}", String(data["purged"] ?? 0)) : "\u2717 " + String(data["error"] ?? "error"));
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              style: { ...styles.secondary, color: themeAwareText("#d1242f") },
              title: t("review.purgeOpenHint"),
              onClick: () => {
                const openCount2 = visible.filter((issue) => issue.status === "open" || issue.status === "fixing").length;
                if (openCount2 === 0) {
                  setActionResult("\u2717 " + t("fix.dispatchNoOpen"));
                  return;
                }
                setConfirmDialog({
                  title: t("review.purgeOpenConfirmTitle"),
                  message: t("review.purgeOpenConfirmMsg").replace("{n}", String(openCount2)),
                  danger: true,
                  confirmLabel: t("review.purgeOpen"),
                  onConfirm: () => {
                    void purgeOpenIssues();
                  }
                });
              },
              children: t("review.purgeOpen")
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NsaWVudC9pbmRleC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdGhlbWUudHMiLCAiLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmtzcGFjZUZyYW1lLnRzeCIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvY29tbWl0LXJvdW5kcy50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvTW9kZXJuV29ya3NwYWNlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXHJcbiAqIENsaWVudCBwbHVnaW4gZW50cnkgZm9yIGRzaC1wcm9qZWN0LWNvbnRyb2wuXHJcbiAqXHJcbiAqIFx1NUUwM1x1NUM0MFx1NjdCNlx1Njc4NFx1RkYwOFx1NURGMlx1OUE4Q1x1OEJDMVx1RkYwQzIwMjYtMDgtMzBcdUZGMDlcdUZGMUFcclxuICogLSBcdTVERTVcdTRGNUNcdTUzRjBcdTkwNkVcdTg1M0RcdTVCOThcdTY1QjkgYGRldGFpbHNgIFx1NjlGRFx1RkYwOHByaW9yaXR5IC0xMFx1RkYwQ1x1NUI5OFx1NjVCOSBEZXRhaWxzUGFuZWwgXHU3NTU5XHU1NzI4XHU4RDI2XHU2NzJDXHU0RTBBXHVGRjBDXHJcbiAqICAgXHU1Mzc4XHU4RjdEXHU2MjExXHU0RUVDXHU3Njg0XHU2Q0U4XHU1MThDXHU1MzczXHU2MDYyXHU1OTBEXHVGRjA5XHVGRjBDXHU2RTMyXHU2N0QzXHU1NzI4XHU0RTNCXHU2ODQ2XHU2N0I2IGRldGFpbHMgXHU1MjE3XHVGRjFCXHJcbiAqIC0gV29ya3NwYWNlRnJhbWUgXHU2Q0U4XHU1MTY1XHU2ODM3XHU1RjBGXHU4ODY4XHVGRjBDXHU2MjhBXHU1Qjk4XHU2NUI5XHU3RjUxXHU2ODNDXHU4OUM2XHU4OUM5XHU2MzYyXHU1MjE3XHVGRjFBXHU4MDRBXHU1OTI5XHVGRjA4Y2VudGVyQ29sXHVGRjA5XHU2NzAwXHU1M0YzXHUzMDAxXHJcbiAqICAgXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4ZGV0YWlsc0NvbFx1RkYwOVx1NUM0NVx1NEUyRCAxZnJcdUZGMUJcdTY1RTBcdTRGMUFcdThCRERcdTg0M0RcdTU3MzBcdTk4NzVcdUZGMDhkYXRhLWRldGFpbHMtY29sbGFwc2VkXHVGRjA5XHJcbiAqICAgXHU4MUVBXHU1MkE4XHU2MDYyXHU1OTBEXHU1MzlGXHU3NTFGXHU1MjE3XHU1RThGXHVGRjFCXHJcbiAqIC0gXHU1REU2XHU0RkE3XHU1Qjk4XHU2NUI5XHU1QkZDXHU4MjJBXHUzMDAxXHU1Qjk4XHU2NUI5XHU4MDRBXHU1OTI5XHU2NzJDXHU0RjUzXHU5NkY2XHU2NTM5XHU1MkE4XHVGRjFCXHJcbiAqIC0gXHU0RkE3XHU4RkI5XHU2ODBGXHU2MzA5XHU5NEFFXHU1NzI4XHUzMDBDXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1M0YwIFx1MjFDNCBcdTVCOThcdTY1QjlcdThCRTZcdTYwQzVcdTk3NjJcdTY3N0ZcdTMwMERcdTk1RjRcdTUyMDdcdTYzNjJcdUZGMDhcdTUzRUZcdTkwMDZcdUZGMDlcdUZGMUJcclxuICogLSBgdG9vbC5jYWxsLnRvb2x2aWV3YCBcdTRFM0EgYW5hbHl6ZV9jaGFuZ2UgXHU0RkREXHU3NTU5XHU0RTEzXHU1QzVFXHU1MzYxXHU3MjQ3XHVGRjFCXHJcbiAqIC0gXHU2NTg3XHU2ODQ4XHU1MTY4XHU5MEU4XHU3RUNGIGN0eC5sb2NhbGUgXHU4QkNEXHU1MTc4XHVGRjA4emggLyBlblx1RkYwOVx1MzAwMlxyXG4gKlxyXG4gKiBAbW9kdWxlIGRzaC1jbGllbnQtcHJvamVjdC1jb250cm9sXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBDaGFuZ2VDYXJkIH0gZnJvbSAnLi9jb21wb25lbnRzL0NoYW5nZUNhcmQudHMnXHJcbmltcG9ydCB7IFdPUktTUEFDRV9ESUNULCBXb3Jrc3BhY2VGcmFtZSB9IGZyb20gJy4vY29tcG9uZW50cy9Xb3Jrc3BhY2VGcmFtZS50c3gnXHJcbmltcG9ydCB7IE1vZGVybldvcmtzcGFjZSB9IGZyb20gJy4vY29tcG9uZW50cy9Nb2Rlcm5Xb3Jrc3BhY2UudHN4J1xyXG5cclxuY29uc3QgTlMgPSAncHJvamVjdC1jb250cm9sJ1xyXG5cclxuZXhwb3J0IGNvbnN0IG5hbWUgPSAnY2xpZW50LXByb2plY3QtY29udHJvbCdcclxuZXhwb3J0IGNvbnN0IGluamVjdCA9IFsnc2xvdHMnLCAnbG9jYWxlJywgJ2xheW91dCddXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoY3R4OiBhbnkpOiB2b2lkIHtcclxuICBjdHguZWZmZWN0KCgpID0+IGN0eC5sb2NhbGUucmVnaXN0ZXIoTlMsIHsgemg6IFdPUktTUEFDRV9ESUNULnpoLCBlbjogV09SS1NQQUNFX0RJQ1QuZW4gfSksICdwcm9qZWN0LWNvbnRyb2w6IGRpY3Rpb25hcmllcycpXHJcbiAgY29uc3QgbGF5b3V0ID0gY3R4LmxheW91dFxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgMS4gXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1M0YwXHVGRjFBXHU5MDZFXHU4NTNEIGRldGFpbHMgXHU2OUZEXHVGRjA4XHU1M0VGXHU5MDA2XHVGRjA5XHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgLy8gXHU2NUIwXHU3QTk3XHU1M0UzXHU5RUQ4XHU4QkE0XHU0RTBEXHU2NjNFXHU3OTNBXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4XHU0RkREXHU2MzAxXHU1Qjk4XHU2NUI5XHU1MzlGXHU3NTFGXHU4OUM2XHU4OUQyXHVGRjA5XHVGRjBDXHU3NTMxXHU0RkE3XHU4RkI5XHU2ODBGXHU2MzA5XHU5NEFFXHU2NjNFXHU1RjBGXHU2MjUzXHU1RjAwXHUzMDAyXHJcbiAgbGV0IHdvcmtzcGFjZUVuYWJsZWQgPSBmYWxzZVxyXG4gIGxldCBkaXNwb3NlV29ya3NwYWNlOiAoKCkgPT4gdm9pZCkgfCB1bmRlZmluZWRcclxuXHJcbiAgY29uc3QgcmVnaXN0ZXJXb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBkaXNwb3NlV29ya3NwYWNlID0gY3R4LnNsb3RzLnJlZ2lzdGVyKFxyXG4gICAgICB7XHJcbiAgICAgICAgbmFtZTogJ2RldGFpbHMnLFxyXG4gICAgICAgIHByaW9yaXR5OiAtMTAsXHJcbiAgICAgICAgbG9jYWxlOiBOUyxcclxuICAgICAgfSxcclxuICAgICAgLy8gXHU2MzAyXHU4RjdEXHU1MzczXHU2MjUzXHU1RjAwIGRldGFpbHMgXHU4RjY4XHU5MDUzXHVGRjA4XHU5NzYyXHU2NzdGXHU1MDRGXHU1OTdEXHU5RUQ4XHU4QkE0IDBcdUZGMDlcdUZGMUFcdTVERTVcdTRGNUNcdTUzRjBcdTk3MDBcdTg5ODFcdTc3MUZcdTVCOUVcdTVCQkRcdTVFQTZcdUZGMUJcclxuICAgICAgLy8gXHU2NUUwXHU0RjFBXHU4QkREXHU4NDNEXHU1NzMwXHU5ODc1XHU4RjY4XHU5MDUzXHU2MDUyIDBcdUZGMENcdTU5MjlcdTcxMzZcdTRGRERcdTYzMDFcdTUzOUZcdTc1MUZcdTgyRjFcdTk2QzRcdTk4NzVcdTVFMDNcdTVDNDBcdTMwMDJcclxuICAgICAgLy8gXHU0RjFBXHU4QkREXHU1MjA3XHU2MzYyXHU2NUY2XHU1Qjk4XHU2NUI5XHU0RjFBIGNsb3NlRGV0YWlscyBcdTIwMTRcdTIwMTQgXHU1RUY2XHU1NDBFXHU0RTAwXHU2MkNEXHU5MUNEXHU2NUIwXHU2NDkxXHU1RjAwXHVGRjA4XHU1QjhGXHU0RUZCXHU1MkExXHU2NjVBXHU0RThFXHU3MjM2XHU3RUE3IGVmZmVjdFx1RkYwOVx1MzAwMlxyXG4gICAgICAocHJvcHM6IGFueSkgPT4ge1xyXG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgICBsYXlvdXQ/Lm9wZW5EZXRhaWxzPy4oKVxyXG4gICAgICAgIH0sIFtdKVxyXG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgICBpZiAocHJvcHMuc2Vzc2lvbklkID09PSB1bmRlZmluZWQpIHJldHVyblxyXG4gICAgICAgICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IGxheW91dD8ub3BlbkRldGFpbHM/LigpLCAwKVxyXG4gICAgICAgICAgcmV0dXJuICgpID0+IHsgY2xlYXJUaW1lb3V0KHRpbWVyKSB9XHJcbiAgICAgICAgfSwgW3Byb3BzLnNlc3Npb25JZF0pXHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoV29ya3NwYWNlRnJhbWUsIHsgLi4ucHJvcHMsIGtleTogcHJvcHMuc2Vzc2lvbklkID8/ICdsYW5kaW5nJywgbGF5b3V0IH0pXHJcbiAgICAgIH0sXHJcbiAgICApXHJcbiAgfVxyXG4gIGNvbnN0IHVucmVnaXN0ZXJXb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBkaXNwb3NlV29ya3NwYWNlPy4oKVxyXG4gICAgZGlzcG9zZVdvcmtzcGFjZSA9IHVuZGVmaW5lZFxyXG4gIH1cclxuXHJcbiAgY3R4LnNsb3RzLmluamVjdCgnZGV0YWlscycsICgpID0+IHtcclxuICAgIGlmICh3b3Jrc3BhY2VFbmFibGVkKSByZWdpc3RlcldvcmtzcGFjZSgpXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB1bnJlZ2lzdGVyV29ya3NwYWNlKClcclxuICAgIH1cclxuICB9KVxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgMi4gXHU0RkE3XHU4RkI5XHU2ODBGXHU1RTk1XHU5MEU4XHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwIFx1MjFDNCBcdTVCOThcdTY1QjlcdThCRTZcdTYwQzUgXHU1MjA3XHU2MzYyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIC8vIFx1NjMwOVx1OTRBRVx1NzJCNlx1NjAwMVx1NjYwRVx1NzkzQVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1NjYzRVx1NzkzQVx1NEUyRCBcdTIxOTIgXHUzMDBDXHVEODNFXHVEREVEIFx1NURFNVx1NEY1Q1x1NTNGMCBcdTI3MTNcdTMwMERcdUZGMUJcdTVERjJcdTUyMDdcdTVCOThcdTY1QjlcdThCRTZcdTYwQzUgXHUyMTkyIFx1MzAwQ1x1RDgzRVx1RERFRCBcdTYyNTNcdTVGMDBcdTVERTVcdTRGNUNcdTUzRjBcdTMwMERcdTlBRDhcdTRFQUVcdUZGMENcclxuICAvLyBcdTc1MjhcdTYyMzdcdTk2OEZcdTY1RjZcdTc3MEJcdTVGOTdcdTUyMzBcdTYwMEVcdTRFNDhcdTUyMDdcdTU2REVcdTY3NjVcdUZGMDhcdTUyMDdcdTYzNjJcdTdFQ0Ygd2luZG93IFx1NEU4Qlx1NEVGNlx1OTAxQVx1NzdFNVx1NjMwOVx1OTRBRVx1OTFDRFx1NkUzMlx1NjdEM1x1RkYwOVx1MzAwMlxyXG4gIGNvbnN0IFRPR0dMRV9FVkVOVCA9ICdwYy13b3Jrc3BhY2UtdG9nZ2xlJ1xyXG4gIGNvbnN0IGZpcmVUb2dnbGUgPSAoZW5hYmxlZDogYm9vbGVhbik6IHZvaWQgPT4ge1xyXG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFRPR0dMRV9FVkVOVCwgeyBkZXRhaWw6IGVuYWJsZWQgfSkpXHJcbiAgfVxyXG4gIGNvbnN0IGRpc21pc3NNb2Rlcm5Xb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBpZiAoIXdvcmtzcGFjZUVuYWJsZWQpIHJldHVyblxyXG4gICAgd29ya3NwYWNlRW5hYmxlZCA9IGZhbHNlXHJcbiAgICBmaXJlVG9nZ2xlKGZhbHNlKVxyXG4gIH1cclxuXHJcbiAgLy8gMC4yLnggXHU3Njg0XHU0RjFBXHU4QkREXHU2NzBEXHU1MkExXHU1M0VGXHU5MDA5XHU2Q0U4XHU1MTY1XHVGRjFBXHU2NUU3XHU3MjQ4XHU2Q0ExXHU2NzA5XHU2NUIwXHU3MjQ4XHU1RTAzXHU1QzQwXHU2M0E1XHU1M0UzXHVGRjBDXHU0RUNEXHU2Q0JGXHU3NTI4IGRldGFpbHMgXHU1MjA2XHU2NTJGXHUzMDAyXHJcbiAgY3R4LmluamVjdChbJ3VpU2Vzc2lvbiddLCAoc2NvcGU6IGFueSkgPT4ge1xyXG4gICAgaWYgKGxheW91dC5wYW5lbEluZm8gPT09IHVuZGVmaW5lZCkgcmV0dXJuXHJcbiAgICBjb25zdCBjdXJyZW50ID0gc2NvcGUudWlTZXNzaW9uLmFkYXB0ZXIuY3VycmVudFxyXG4gICAgc2NvcGUuc2xvdHMuaW5qZWN0KCdzaGVsbC5vdmVybGF5JywgKCkgPT4gc2NvcGUuc2xvdHMucmVnaXN0ZXIoe1xyXG4gICAgICBuYW1lOiAnc2hlbGwub3ZlcmxheScsIGlkOiAncHJvamVjdC1jb250cm9sLXdvcmtzcGFjZScsXHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IFtlbmFibGVkLCBzZXRFbmFibGVkXSA9IFJlYWN0LnVzZVN0YXRlKHdvcmtzcGFjZUVuYWJsZWQpXHJcbiAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IChldmVudDogRXZlbnQpOiB2b2lkID0+IHsgc2V0RW5hYmxlZCgoZXZlbnQgYXMgQ3VzdG9tRXZlbnQ8Ym9vbGVhbj4pLmRldGFpbCkgfVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFRPR0dMRV9FVkVOVCwgaGFuZGxlcilcclxuICAgICAgICByZXR1cm4gKCkgPT4geyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpIH1cclxuICAgICAgfSwgW10pXHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGVybldvcmtzcGFjZSwgeyBjdXJyZW50LCBwYW5lbEluZm86IGxheW91dC5wYW5lbEluZm8sIGVuYWJsZWQsIG9uRGlzbWlzczogZGlzbWlzc01vZGVybldvcmtzcGFjZSB9KVxyXG4gICAgfSkpXHJcbiAgfSlcclxuXHJcbiAgY3R4LnNsb3RzLmluamVjdCgnc2lkZWJhci5mb290ZXIuYWN0aW9uJywgKCkgPT4ge1xyXG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XHJcbiAgICAgIG5hbWU6ICdzaWRlYmFyLmZvb3Rlci5hY3Rpb24nLFxyXG4gICAgICBpZDogJ3Byb2plY3QtY29udHJvbC10b2dnbGUnLFxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICBjb25zdCBbZW5hYmxlZCwgc2V0RW5hYmxlZF0gPSBSZWFjdC51c2VTdGF0ZSh3b3Jrc3BhY2VFbmFibGVkKVxyXG4gICAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQ6IEV2ZW50KTogdm9pZCA9PiB7IHNldEVuYWJsZWQoKGV2ZW50IGFzIEN1c3RvbUV2ZW50PGJvb2xlYW4+KS5kZXRhaWwpIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoVE9HR0xFX0VWRU5ULCBoYW5kbGVyKSB9XHJcbiAgICAgIH0sIFtdKVxyXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgICAnYnV0dG9uJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAnZGF0YS10ZXN0aWQnOiAncHJvamVjdC1jb250cm9sLXNpZGViYXItdG9nZ2xlJyxcclxuICAgICAgICAgIHRpdGxlOiBlbmFibGVkID8gJ1x1NUY1M1x1NTI0RFx1NjYzRVx1NzkzQVx1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMFx1MzAwMlx1NzBCOVx1NTFGQlx1NTNFRlx1NEUzNFx1NjVGNlx1NTIwN1x1NjM2Mlx1NEUzQVx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1RkYwOFx1NjdFNVx1NzcwQlx1NURFNVx1NTE3N1x1OEMwM1x1NzUyOFx1NzY4NFx1NUI4Q1x1NjU3NFx1OEY5M1x1NTE2NS9cdThGOTNcdTUxRkFcdUZGMDlcdUZGMUJcdTUxOERcdTcwQjlcdTY3MkNcdTYzMDlcdTk0QUVcdTUzNzNcdTYwNjJcdTU5MERcdTMwMDInIDogJ1x1NUY1M1x1NTI0RFx1NjYzRVx1NzkzQVx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1MzAwMlx1NzBCOVx1NTFGQlx1NjA2Mlx1NTkwRFx1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMFx1MzAwMicsXHJcbiAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc2cHgnLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEwcHgnLCBmb250U2l6ZTogJzEycHgnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICBjb2xvcjogZW5hYmxlZCA/ICdpbmhlcml0JyA6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiBlbmFibGVkID8gNDAwIDogNjAwLFxyXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJywgb3BhY2l0eTogMC45LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgd29ya3NwYWNlRW5hYmxlZCA9ICF3b3Jrc3BhY2VFbmFibGVkXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBsYXlvdXQ/Lm9wZW5EZXRhaWxzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAod29ya3NwYWNlRW5hYmxlZCAmJiBkaXNwb3NlV29ya3NwYWNlID09PSB1bmRlZmluZWQpIHJlZ2lzdGVyV29ya3NwYWNlKClcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCF3b3Jrc3BhY2VFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgIHVucmVnaXN0ZXJXb3Jrc3BhY2UoKVxyXG4gICAgICAgICAgICAgICAgICBsYXlvdXQ/LmNsb3NlRGV0YWlscz8uKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdvcmtzcGFjZUVuYWJsZWQgJiYgbGF5b3V0LnBhbmVsSW5mbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGF5b3V0LnBhbmVsSW5mby5nZXRTbmFwc2hvdCgpLmFjdGl2ZVBhbmVsSWQgIT09IG51bGwpIGxheW91dC5zZWxlY3RQYW5lbChudWxsKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmlnaHRiYXIgPSBjdHguZ2V0KCdzaWRlYmFyUmlnaHQnKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0YmFyPy5pc0V4cGFuZGVkKCkpIHJpZ2h0YmFyLnRvZ2dsZUV4cGFuZGVkKClcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgICAgICAgICAgd29ya3NwYWNlRW5hYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdbcHJvamVjdC1jb250cm9sXSB3b3Jrc3BhY2UgdG9nZ2xlIGZhaWxlZCcsIGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmVUb2dnbGUod29ya3NwYWNlRW5hYmxlZClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbmFibGVkID8gJ1x1RDgzRVx1RERFRCBcdTVERTVcdTRGNUNcdTUzRjAgXHUyNzEzJyA6ICdcdUQ4M0VcdURERUQgXHU2MjUzXHU1RjAwXHU1REU1XHU0RjVDXHU1M0YwJyxcclxuICAgICAgKVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgMy4gXHU4MDRBXHU1OTI5XHU1REU1XHU1MTc3XHU1MzYxXHU3MjQ3XHVGRjA4XHU2MjY3XHU4ODRDL1x1OEJDNFx1NUJBMS9cdTlBOENcdTY1MzZcdUZGMDlcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBzaW1wbGVSZXN1bHRDYXJkID0gKHRpdGxlOiBzdHJpbmcpOiAoKHByb3BzOiBhbnkpID0+IGFueSkgPT4gKHByb3BzOiBhbnkpID0+IHtcclxuICAgIGNvbnN0IG91dHB1dCA9IHByb3BzPy5vdXRwdXRcclxuICAgIGNvbnN0IHRleHQgPSB0eXBlb2Ygb3V0cHV0ID09PSAnc3RyaW5nJ1xyXG4gICAgICA/IG91dHB1dFxyXG4gICAgICA6IG91dHB1dD8uc3VtbWFyeSA/PyBvdXRwdXQ/Lmlzc3VlcyA/PyBvdXRwdXQ/LmRldGFpbHMgPz8gKG91dHB1dCA/IEpTT04uc3RyaW5naWZ5KG91dHB1dCwgbnVsbCwgMikgOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHUyMDI2JylcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAge1xyXG4gICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgIHBhZGRpbmc6ICcxMHB4IDEycHgnLFxyXG4gICAgICAgICAgbWFyZ2luOiAnNHB4IDAnLFxyXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXHJcbiAgICAgICAgICBmb250U2l6ZTogJzEycHgnLFxyXG4gICAgICAgICAgbGluZUhlaWdodDogMS42LFxyXG4gICAgICAgICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyxcclxuICAgICAgICAgIG1heEhlaWdodDogMjYwLFxyXG4gICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzRweCcgfSB9LCB0aXRsZSksXHJcbiAgICAgIFN0cmluZyh0ZXh0KSxcclxuICAgIClcclxuICB9XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCAzLiBhbmFseXplX2NoYW5nZSBcdTRFMTNcdTVDNUVcdTVERTVcdTUxNzdcdTUzNjFcdTcyNDcgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY3R4LnNsb3RzLmluamVjdCgndG9vbC5jYWxsLnRvb2x2aWV3JywgKCkgPT4ge1xyXG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XHJcbiAgICAgIG5hbWU6ICd0b29sLmNhbGwudG9vbHZpZXcnLFxyXG4gICAgICBrZXk6ICdhbmFseXplX2NoYW5nZScsXHJcbiAgICB9LCAocHJvcHM6IGFueSkgPT4ge1xyXG4gICAgICBpZiAocHJvcHM/LnRvb2xOYW1lICE9PSAnYW5hbHl6ZV9jaGFuZ2UnKSByZXR1cm4gbnVsbFxyXG4gICAgICBjb25zdCBvdXRwdXQgPSBwcm9wcz8ub3V0cHV0XHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENoYW5nZUNhcmQsIHtcclxuICAgICAgICB0aXRsZTogJ1x1NTNEOFx1NjZGNFx1NTIwNlx1Njc5MFx1NjJBNVx1NTQ0QSAoQ2hhbmdlIEFuYWx5c2lzKScsXHJcbiAgICAgICAgZmlsZXNDaGFuZ2VkOiBvdXRwdXQ/LmZpbGVzQ2hhbmdlZCA/PyAwLFxyXG4gICAgICAgIGluc2VydGlvbnM6IG91dHB1dD8uaW5zZXJ0aW9ucyA/PyAwLFxyXG4gICAgICAgIGRlbGV0aW9uczogb3V0cHV0Py5kZWxldGlvbnMgPz8gMCxcclxuICAgICAgICBldmlkZW5jZUlkOiBvdXRwdXQ/LmV2aWRlbmNlSWQsXHJcbiAgICAgICAgc3RhdHVzOiBvdXRwdXQgPyAnY29tcGxldGVkJyA6ICdhbmFseXppbmcnLFxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICBmb3IgKGNvbnN0IFt0b29sS2V5LCB0aXRsZV0gb2YgW1xyXG4gICAgWydzdGFydF9ydW4nLCAnXHVEODNEXHVERTgwIFx1NjI2N1x1ODg0QyBSdW4nXSxcclxuICAgIFsncnVuX3JldmlldycsICdcdUQ4M0RcdUREMEQgXHU0RUUzXHU3ODAxXHU4QkM0XHU1QkExJ10sXHJcbiAgICBbJ3J1bl92ZXJpZmljYXRpb24nLCAnXHUyNzA1IFx1OUE4Q1x1NjUzNlx1OUE4Q1x1OEJDMSddLFxyXG4gIF0gYXMgY29uc3QpIHtcclxuICAgIGN0eC5zbG90cy5pbmplY3QoJ3Rvb2wuY2FsbC50b29sdmlldycsICgpID0+IHtcclxuICAgICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7IG5hbWU6ICd0b29sLmNhbGwudG9vbHZpZXcnLCBrZXk6IHRvb2xLZXkgfSwgc2ltcGxlUmVzdWx0Q2FyZCh0aXRsZSkpXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iLCAiLyoqXHJcbiAqIFJlYWN0IENvbXBvbmVudDogQ2hhbmdlIC8gSW5zaWdodCBDYXJkIGZvciBDaGF0IFZpZXcuXHJcbiAqIFJlbmRlcnMgc3RydWN0dXJlZCBpbnNpZ2h0cywgZGlmZiBzdGF0aXN0aWNzLCBhbmQgZXZpZGVuY2UgYmFkZ2VzLlxyXG4gKlxyXG4gKiBcdTk4OUNcdTgyNzJcdThENzAgZHN3LWFsaWFzIFx1NEUzQlx1OTg5OFx1NTNEOFx1OTFDRiArIHRoZW1lQXdhcmVUZXh0IFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYxQVxyXG4gKiBcdTZCNjRcdTUyNERcdTc1MjhcdTc2ODQgYC0tZHNoLSpgIFx1NTNEOFx1OTFDRlx1NTcyOFx1NUJCRlx1NEUzQlx1OTFDQ1x1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1NjgzN1x1NUYwRlx1NkMzOFx1OEZEQ1x1ODQzRFx1NTcyOFx1NkRGMVx1ODI3Mlx1NTE1Q1x1NUU5NVx1NEUwQVx1RkYwQ1xyXG4gKiBcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTRFMEJcdTgwNEFcdTU5MjlcdTZENDFcdTkxQ0NcdTUxRkFcdTczQjBcdTdBODFcdTUxNDBcdTlFRDFcdTUzNjFcdUZGMUJcdTY1NzBcdTVCNTdcdTdFRkYvXHU3RUEyXHU0RTVGXHU2NjJGXHU2REYxXHU4MjcyXHU1NDExXHU5MTREXHU4MjcyXHVGRjBDXHU3NjdEXHU1RTk1XHU0RTBEXHU1M0VGXHU4QkZCXHUzMDAyXHJcbiAqXHJcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9DaGFuZ2VDYXJkXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyB0aGVtZUF3YXJlVGV4dCB9IGZyb20gJy4vdGhlbWUudHMnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUNhcmRQcm9wcyB7XHJcbiAgdGl0bGU/OiBzdHJpbmdcclxuICBmaWxlc0NoYW5nZWQ/OiBudW1iZXJcclxuICBpbnNlcnRpb25zPzogbnVtYmVyXHJcbiAgZGVsZXRpb25zPzogbnVtYmVyXHJcbiAgZXZpZGVuY2VJZD86IHN0cmluZ1xyXG4gIHN0YXR1cz86IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ2hhbmdlQ2FyZDogUmVhY3QuRkM8Q2hhbmdlQ2FyZFByb3BzPiA9ICh7XHJcbiAgdGl0bGUgPSAnQ2hhbmdlIEluc2lnaHQnLFxyXG4gIGZpbGVzQ2hhbmdlZCA9IDAsXHJcbiAgaW5zZXJ0aW9ucyA9IDAsXHJcbiAgZGVsZXRpb25zID0gMCxcclxuICBldmlkZW5jZUlkLFxyXG4gIHN0YXR1cyA9ICdhbmFseXplZCcsXHJcbn0pID0+IHtcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICdkaXYnLFxyXG4gICAge1xyXG4gICAgICAnZGF0YS10ZXN0aWQnOiAncHJvamVjdC1jb250cm9sLWNoYW5nZS1jYXJkJyxcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgcGFkZGluZzogJzEwcHggMTRweCcsXHJcbiAgICAgICAgbWFyZ2luOiAnNnB4IDAnLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXHJcbiAgICAgICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgICAgIGZvbnRTaXplOiAnMTNweCcsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgJ2RpdicsXHJcbiAgICAgIHtcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBudWxsLCBgXHVEODNEXHVERDBEICR7dGl0bGV9YCksXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgJ3NwYW4nLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHggNnB4JyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJnLWluc2V0LCByZ2JhKDUsNSw1LDAuMDYpKScsXHJcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgKSxcclxuICAgICksXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEycHgnLCBmb250U2l6ZTogJzEycHgnLCBvcGFjaXR5OiAwLjkgfSB9LFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgbnVsbCwgYFx1RDgzRFx1RENDMSAke2ZpbGVzQ2hhbmdlZH0gZmlsZXNgKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjMWE3ZjM3JykgfSB9LCBgKyR7aW5zZXJ0aW9uc31gKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2YyMjJlJykgfSB9LCBgLSR7ZGVsZXRpb25zfWApLFxyXG4gICAgICBldmlkZW5jZUlkXHJcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgICAnc3BhbicsXHJcbiAgICAgICAgICAgIHsgc3R5bGU6IHsgb3BhY2l0eTogMC43LCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyB9IH0sXHJcbiAgICAgICAgICAgIGBbJHtldmlkZW5jZUlkfV1gLFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIDogbnVsbCxcclxuICAgICksXHJcbiAgKVxyXG59XHJcbiIsICIvKipcbiAqIFx1NUJBMlx1NjIzN1x1N0FFRlx1NEUzQlx1OTg5OFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYwOFx1NkRGMVx1NkQ0NVx1NTNDQ1x1NEUzQlx1OTg5OFx1NTE3MVx1NzUyOFx1NzY4NFx1NTUyRlx1NEUwMFx1NUI5RVx1NzNCMFx1RkYwOVx1MzAwMlxuICpcbiAqIFx1NEUwRFx1NTNEOFx1NUYwRlx1RkYwODIwMjYtMDktMTAgXHU2REYxXHU4MjcyXHU2QTIxXHU1RjBGXHUzMDBDXHU5ODc1XHU3QjdFXHU3NjdEXHU1NzU3XHUzMDBEXHU0RThCXHU2NTQ1XHU1NDBFXHU1NkZBXHU1MzE2XHVGRjBDXHU1MTY4XHU1QkEyXHU2MjM3XHU3QUVGXHU1RkM1XHU5ODdCXHU5MDc1XHU1Qjg4XHVGRjA5XHVGRjFBXG4gKiAxLiBcdTk2OEZcdTRFM0JcdTk4OThcdTUzRDhcdTUzMTZcdTc2ODRcdTVGM0FcdThDMDNcdTgyNzJcdTY1ODdcdTVCNTdcdTVGQzVcdTk4N0JcdTdFQ0YgdGhlbWVBd2FyZVRleHQoKVx1RkYxQVx1NkQ0NVx1ODI3Mlx1NEUzQlx1OTg5OFx1ODFFQVx1NTJBOFx1NkRGMVx1NTMxNlx1NTIzMFx1NzY3RFx1NUU5NVxuICogICAgXHU1QkY5XHU2QkQ0XHU1RUE2IFx1MjI2NTQuNToxXHVGRjBDXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU4MUVBXHU1MkE4XHU2M0QwXHU0RUFFXHU1MjMwXHU2REYxXHU1RTk1IFx1MjI2NTQuNToxXHUzMDAyXHU5ODdCXHU1NzI4XHU2RTMyXHU2N0QzXHU2NzFGXHU4QzAzXHU3NTI4XHVGRjA4XHU3RUM0XHU0RUY2XHU0RjUzXHU1MTg1L1xuICogICAgXHU2RTMyXHU2N0QzXHU1MUZEXHU2NTcwXHU1MTg1XHVGRjA5XHVGRjBDXHU0RTNCXHU5ODk4XHU1MjA3XHU2MzYyXHU1NDBFXHU5NjhGXHU5MUNEXHU2RTMyXHU2N0QzXHU4MUVBXHU1MkE4XHU2NkY0XHU2NUIwXHVGRjFCXHU3OTgxXHU2QjYyXHU1NzI4XHU2QTIxXHU1NzU3XHU1MkEwXHU4RjdEXHU2NzFGXHU2QzQyXHU1MDNDXHU1NDBFXHU1QjU4XHU4RkRCXG4gKiAgICBcdTk3NTlcdTYwMDFcdTY4MzdcdTVGMEZcdTVCRjlcdThDNjFcdTMwMDJcbiAqIDIuIGFjdGl2ZSBcdTlBRDhcdTRFQUVcdTgwQ0NcdTY2NkZcdUZGMDhcdTYzMDlcdTk0QUUgLyBcdTk4NzVcdTdCN0UgLyBcdTdCNUJcdTkwMDlcdTgyQUZcdTcyNDdcdTdCNDlcdTRFMDBcdTUyMDdcIlx1OTAwOVx1NEUyRFx1NTM3M1x1NTg2Qlx1ODI3MlwiXHU3Njg0XHU4ODY4XHU5NzYyXHVGRjA5XHU0RTAwXHU1RjhCXHU3NTI4XG4gKiAgICBgdmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpYFx1RkYwOFx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1NEUwQlx1OTBGRFx1NjYyRlx1ODRERFx1ODI3Mlx1RkYwOVx1RkYwQ1x1OTE0RFx1NzY3RFx1NUI1N1x1MzAwMlxuICogICAgXHU3OTgxXHU2QjYyXHU3NTI4IC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnkgXHU0RjVDXHU4MENDXHU2NjZGXHUyMDE0XHUyMDE0XHU1QjgzXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RjFBXHU4OEFCXG4gKiAgICBcdTVCOENcdTUxNjhcdTU0MUVcdTYzODlcdUZGMDhcdTY3MkNcdTZCMjFcdTRFOEJcdTY1NDVcdTY4MzlcdTU2RTBcdUZGMDlcdTMwMDJcbiAqIDMuIFx1NjVFMFx1NkNENVx1ODlFM1x1Njc5MFx1NzY4NFx1OTg5Q1x1ODI3Mlx1RkYwOENTUyBcdTUzRDhcdTkxQ0ZcdTdCNDlcdUZGMDlcdTUzOUZcdTY4MzdcdThGRDRcdTU2REVcdUZGMUFcdTUzRDhcdTkxQ0ZcdTgyNzJcdTRFQTRcdTc1MzFcdTVCQkZcdTRFM0JcdTRFM0JcdTk4OThcdTdDRkJcdTdFREZcdTRGRERcdThCQzFcdTUzRUZcdThCRkJcdUZGMENcbiAqICAgIFx1NEY0Nlx1NzUzMVx1NkI2NFx1NUI4M1x1NEVFQ1x1NEUwRFx1NUY5N1x1NEUwRVx1Nzg2Q1x1N0YxNlx1NzgwMVx1NTI0RFx1NjY2Rlx1ODI3Mlx1NTNFMFx1NTJBMFx1NEY3Rlx1NzUyOFx1MzAwMlxuICovXG5cbi8qKiBcdTg5RTNcdTY3OTAgI3JyZ2diYiBcdTYyMTYgcmdiKCkvcmdiYSgpIFx1OTg5Q1x1ODI3Mlx1NTI0RFx1NEUwOVx1NEUyQVx1NTIwNlx1OTFDRlx1NEUzQSBbciwgZywgYl1cdUZGMUJcdTY1RTBcdTZDRDVcdTg5RTNcdTY3OTBcdThGRDRcdTU2REUgbnVsbFx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29sb3IoY29sb3I6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IG51bGwge1xuICBjb25zdCBoZXggPSAvXiMoWzAtOWEtZl17Nn0pJC9pLmV4ZWMoY29sb3IpXG4gIGlmIChoZXggIT09IG51bGwpIHtcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlci5wYXJzZUludChoZXhbMV0hLCAxNilcbiAgICByZXR1cm4gWyh2YWx1ZSA+PiAxNikgJiAyNTUsICh2YWx1ZSA+PiA4KSAmIDI1NSwgdmFsdWUgJiAyNTVdXG4gIH1cbiAgY29uc3QgZnVuY3Rpb25hbCA9IC9ecmdiYT9cXChcXHMqKFxcZHsxLDN9KVssXFxzXSsoXFxkezEsM30pWyxcXHNdKyhcXGR7MSwzfSkvaS5leGVjKGNvbG9yKVxuICBpZiAoZnVuY3Rpb25hbCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBbTnVtYmVyKGZ1bmN0aW9uYWxbMV0pLCBOdW1iZXIoZnVuY3Rpb25hbFsyXSksIE51bWJlcihmdW5jdGlvbmFsWzNdKV1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG4vKiogV0NBRyBcdTc2RjhcdTVCRjlcdTRFQUVcdTVFQTZcdUZGMDgwPVx1OUVEMVx1RkYwQzE9XHU3NjdEXHVGRjA5XHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gcmVsYXRpdmVMdW1pbmFuY2UocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IGNoYW5uZWwgPSAodmFsdWU6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdiA9IHZhbHVlIC8gMjU1XG4gICAgcmV0dXJuIHYgPD0gMC4wMzkyOCA/IHYgLyAxMi45MiA6ICgodiArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjRcbiAgfVxuICByZXR1cm4gMC4yMTI2ICogY2hhbm5lbChyKSArIDAuNzE1MiAqIGNoYW5uZWwoZykgKyAwLjA3MjIgKiBjaGFubmVsKGIpXG59XG5cbi8qKiBcdTZERjFcdTUzMTZcdTk4OUNcdTgyNzJcdTc2RjRcdTUyMzBcdTc2N0RcdTVFOTVcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgIzFmMjMyOCBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA+IDAuMTgzOyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4MWYgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHgyMyAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHgyOCAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqIFx1NjNEMFx1NEVBRVx1OTg5Q1x1ODI3Mlx1NzZGNFx1NTIzMFx1NkRGMVx1NUU5NVx1RkYwOCMxNTE1MTdcdUZGMDlcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgI2YwZjZmYyBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpZ2h0ZW5Gb3JEYXJrQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA8IDAuMjE0OyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4ZjAgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHhmNiAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHhmYyAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqXG4gKiBcdTRFM0JcdTk4OThcdTgxRUFcdTkwMDJcdTVFOTRcdTY1ODdcdTVCNTdcdTgyNzJcdUZGMUFcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTZERjFcdTUzMTZcdTUyMzBcdTc2N0RcdTVFOTUgXHUyMjY1NC41OjFcdUZGMUJcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTYzRDBcdTRFQUVcdTUyMzBcdTZERjFcdTVFOTUgXHUyMjY1NC41OjFcbiAqIFx1RkYwOFx1NkRGMVx1ODI3Mlx1NUI1N1x1NTk4MiAjNTc2MDZhIFx1NzZGNFx1NjNBNVx1NjUzRVx1NkRGMVx1NUU5NVx1NTQwQ1x1NjgzN1x1NEUwRFx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlx1NjI0MFx1NjcwOVx1NUYzQVx1OEMwM1x1ODI3Mlx1NjU4N1x1NjcyQ1x1N0VERlx1NEUwMFx1OEQ3MFx1OEZEOVx1OTFDQ1x1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhlbWVBd2FyZVRleHQoY29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJnYiA9IHBhcnNlQ29sb3IoY29sb3IpXG4gIGlmIChyZ2IgPT09IG51bGwpIHJldHVybiBjb2xvclxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5ib2R5Py5oYXNBdHRyaWJ1dGU/LignZGF0YS1kcy1kYXJrLXRoZW1lJykgPT09IHRydWUpIHtcbiAgICByZXR1cm4gbGlnaHRlbkZvckRhcmtCYWNrZ3JvdW5kKHJnYlswXSwgcmdiWzFdLCByZ2JbMl0pXG4gIH1cbiAgcmV0dXJuIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyZ2JbMF0sIHJnYlsxXSwgcmdiWzJdKVxufVxuIiwgIi8qKlxyXG4gKiBQcm9qZWN0IENvbnRyb2wgXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4V29ya3NwYWNlRnJhbWVcdUZGMDl2Mlx1RkYxQVx1NTZGNFx1N0VENVwiXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XCJcdTdFQzRcdTdFQzdcdTMwMDJcclxuICpcclxuICogXHU1NkRCXHU0RTJBXHU5ODc1XHU3QjdFXHVGRjFBXHJcbiAqIDEuIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1RkYwOFx1OUVEOFx1OEJBNFx1RkYwOVx1RkYxQVx1NEVEM1x1NUU5M1x1NjgwRlx1RkYwOFx1NTkxQVx1NEVEM1x1NUU5M1x1NTIwN1x1NjM2Mlx1RkYwOSsgXHU2M0QwXHU0RUE0XHU1MjE3XHU4ODY4XHVGRjA4XHU1NDJCXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4XHVGRjA5K1xyXG4gKiAgICBcdThCRTZcdTYwQzVcdTk3NjJcdTY3N0ZcdUZGMDhBSSBcdTg5RTNcdThCRkJcdUZGMUFcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDgvXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxL1x1OThDRVx1OTY2OVx1RkYxQlx1NEUwOVx1N0VBN1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNCBTVkcgXHU1NkZFXHVGRjFCXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHU3RUQzXHU4QkJBXHVGRjA5XHUzMDAyXHJcbiAqIDIuIFx1OTg3OVx1NzZFRVx1NjAzQlx1ODlDOFx1RkYxQVx1OTg3OVx1NzZFRVx1Njg2M1x1Njg0OCArIFx1NUZFQlx1NjM3N1x1NjRDRFx1NEY1QyArIFx1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1RiArIFx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1MzAwMlxyXG4gKiAzLiBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdUZGMUFSdW4gXHU4RkRCXHU1RUE2XHU0RTBFXHU2MjEwXHU2NzJDXHUzMDAyXHJcbiAqIDQuIFx1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNlx1RkYxQVx1NjgzOFx1NjdFNVx1N0IxNFx1OEJCMFx1RkYwOFx1NTNFRlx1NTE3M1x1ODA1NFx1NjNEMFx1NEVBNFx1RkYwOSsgXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHVGRjA4XHU0RUJBXHU1REU1XHU3ODZFXHU4QkE0XHVGRjA5KyBcdTVCNjZcdTRFNjBcdTY5ODJcdTVGRjUgKyBSZXZpZXcvXHU5QThDXHU2NTM2XHU4QkIwXHU1RjU1XHUzMDAyXHJcbiAqXHJcbiAqIFx1NUUwM1x1NUM0MFx1NjczQVx1NTIzNlx1NEUwRFx1NTNEOFx1RkYxQVx1OTA2RVx1ODUzRFx1NUI5OFx1NjVCOSBkZXRhaWxzIFx1NjlGRCArIFx1NkNFOFx1NTE2NVx1NjgzN1x1NUYwRlx1NjM2Mlx1NTIxN1x1RkYwOFx1ODA0QVx1NTkyOVx1NjcwMFx1NTNGM1x1RkYwOSsgXHU1MjA2XHU5Njk0XHU2NzYxXHU2MkQ2XHU2MkZEXHU4QkIwXHU1RkM2XHVGRjFCXHJcbiAqIFx1N0VERlx1OEJBMVx1ODg0Q1x1NEUyNFx1ODg0Q1x1OTRCM1x1NTIzNlx1NzUzMVx1OEZEMFx1ODg0Q1x1NjVGNlx1NjMwOVx1Njc4NFx1NUVGQVx1NTRDOFx1NUUwQ1x1N0NCRVx1NTFDNlx1NkNFOFx1NTE2NVx1RkYwOGFwcGx5U3RhdHNMaW5lQ2xhbXBcdUZGMDlcdTMwMDJcclxuICpcclxuICogQG1vZHVsZSBkc2gtY2xpZW50LXByb2plY3QtY29udHJvbC9jb21wb25lbnRzL1dvcmtzcGFjZUZyYW1lXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBwYXJzZUNvbG9yLCB0aGVtZUF3YXJlVGV4dCB9IGZyb20gJy4vdGhlbWUudHMnXHJcbmltcG9ydCB7IGNsdXN0ZXJJbnRvUm91bmRzIH0gZnJvbSAnLi9jb21taXQtcm91bmRzLnRzJ1xyXG5cclxuLyoqIFx1NUJCRlx1NEUzQiAvc3RhdGUgXHU4RkQ0XHU1NkRFXHU3Njg0XHU1RkVCXHU3MTY3XHU1RjYyXHU3MkI2XHVGRjA4XHU0RTBFIGFwaS1yb3V0ZS50cyBidWlsZFN0YXRlIFx1NUJGOVx1OUY1MFx1RkYwOVx1MzAwMiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZVN0YXRlIHtcclxuICByZWFkeT86IGJvb2xlYW5cclxuICByZWFzb24/OiBzdHJpbmdcclxuICBwbHVnaW5WZXJzaW9uPzogc3RyaW5nXHJcbiAgcHJvamVjdD86IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyByb290UGF0aDogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxyXG4gIGNoYW5nZXM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IHNvdXJjZTogc3RyaW5nOyB1cGRhdGVkQXQ6IG51bWJlciB9PlxyXG4gIHJ1bnM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBzdGFydGVkQXQ6IG51bWJlciB8IG51bGw7IGZpbmlzaGVkQXQ6IG51bWJlciB8IG51bGw7IGNvc3RVc2Q/OiBudW1iZXI7IHN0ZXBzVG90YWw/OiBudW1iZXI7IHN0ZXBzRG9uZT86IG51bWJlcjsgY3VycmVudFN0ZXA/OiBzdHJpbmcgfCBudWxsIH0+XHJcbiAgYXR0ZW1wdHNDb3VudD86IG51bWJlclxyXG4gIG1lbW9yaWVzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBwcm9qZWN0SWQ6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0cnV0aExldmVsOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ/OiBzdHJpbmc7IGlzSHVtYW5Db25maXJtZWQ6IGJvb2xlYW47IGdpdEJyYW5jaDogc3RyaW5nIHwgbnVsbDsgY3JlYXRlZEF0OiBudW1iZXIgfT5cclxuICBldmlkZW5jZUNvdW50PzogbnVtYmVyXHJcbiAgcmVjZW50RXZpZGVuY2U/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHNvdXJjZTogc3RyaW5nOyB0cnV0aExldmVsOiBzdHJpbmc7IGxvY2F0b3I6IHN0cmluZzsgc25pcHBldDogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxyXG4gIHJlc29sdmVkSXNzdWVSZXRlbnRpb25EYXlzPzogbnVtYmVyXHJcbiAgaW1wb3J0ZWRDaGFuZ2VzPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb21taXRDb3VudDogbnVtYmVyOyBmaXJzdENvbW1pdEF0OiBudW1iZXI7IGxhc3RDb21taXRBdDogbnVtYmVyOyBjb25maWRlbmNlOiBudW1iZXI7IHN0YXR1czogc3RyaW5nIH0+XHJcbiAgaXNzdWVzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBjaGFuZ2VJZDogc3RyaW5nOyBzZXZlcml0eTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZyB9PlxyXG4gIHZlcmlmaWNhdGlvbnM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZzsgY3JlYXRlZEF0OiBudW1iZXIgfT5cclxuICBib290c3RyYXA/OiB7IGlkOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgdGVjaFN0YWNrOiBzdHJpbmdbXTsgbWFuaWZlc3RGaWxlczogc3RyaW5nW107IHN5bWJvbHNDb3VudDogbnVtYmVyOyBjcmVhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxyXG4gIGNvbmZpcm1lZD86IEFycmF5PHsgaWQ6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmc7IGZvcmJpZGRlblBhdGhzOiBzdHJpbmdbXSB9PlxyXG4gIGNvbmNlcHRzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNhdGVnb3J5OiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmc7IG9jY3VycmVuY2VzOiBudW1iZXIgfT5cclxufVxyXG5cclxuLyoqIEdFVCAvY29tbWl0cyBcdTc2ODRcdTYzRDBcdTRFQTRcdTY3NjFcdTc2RUVcdTMwMDJhbmFseXplZCA9IFx1NURGMlx1NzUxRlx1NjIxMFx1OEZDNyBBSSBcdTg5RTNcdThCRkJcdUZGMDhcdTY3MkFcdTZEODhcdTUzMTZcdTU3MDZcdTcwQjlcdTZEODhcdTcwQjlcdTRGOURcdTYzNkVcdUZGMDlcdTMwMDIgKi9cclxuaW50ZXJmYWNlIENvbW1pdEVudHJ5IHtcclxuICBzaGE6IHN0cmluZ1xyXG4gIHNob3J0SGFzaDogc3RyaW5nXHJcbiAgYXV0aG9yOiBzdHJpbmdcclxuICBkYXRlOiBudW1iZXJcclxuICBzdWJqZWN0OiBzdHJpbmdcclxuICBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IGFkZHM6IG51bWJlcjsgZGVsczogbnVtYmVyIH0+XHJcbiAgYW5hbHl6ZWQ/OiBib29sZWFuXHJcbn1cclxuXHJcbmludGVyZmFjZSBDb21taXRzUGF5bG9hZCB7XHJcbiAgcm9vdFBhdGg6IHN0cmluZ1xyXG4gIGJyYW5jaDogc3RyaW5nIHwgbnVsbFxyXG4gIGhlYWRTaGE6IHN0cmluZyB8IG51bGxcclxuICB3b3JraW5nOiB7IGZpbGVDb3VudDogbnVtYmVyOyBpc0NsZWFuOiBib29sZWFuOyBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nIH0+IH1cclxuICBjb21taXRzOiBDb21taXRFbnRyeVtdXHJcbn1cclxuXHJcbmludGVyZmFjZSBDb21taXREZXRhaWxQYXlsb2FkIHtcclxuICBzaGE6IHN0cmluZ1xyXG4gIGlzV29ya2luZzogYm9vbGVhblxyXG4gIGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgYWRkczogbnVtYmVyOyBkZWxzOiBudW1iZXIgfT5cclxuICBpbnNlcnRpb25zOiBudW1iZXJcclxuICBkZWxldGlvbnM6IG51bWJlclxyXG4gIHBhdGNoVHJ1bmNhdGVkOiBib29sZWFuXHJcbiAgcGF0Y2g6IHN0cmluZ1xyXG4gIGNvbW1pdDogeyBtZXNzYWdlOiBzdHJpbmc7IGF1dGhvcjogc3RyaW5nOyBkYXRlOiBudW1iZXIgfSB8IG51bGxcclxuICBhbmFseXNpczogeyB3aGF0OiBzdHJpbmc7IGxvZ2ljOiBzdHJpbmdbXTsgcmlza3M6IHN0cmluZ1tdIH1cclxuICBhbmFseXNpc0NhY2hlZD86IGJvb2xlYW5cclxuICBhbmFseXNpc0dlbmVyYXRlZEF0PzogbnVtYmVyIHwgbnVsbFxyXG4gIC8qKiBcdTY3MkNcdTZCMjFcdTg5RTNcdThCRkJcdTc2ODQgTExNIFx1NjIxMFx1NjcyQ1x1RkYwOFx1NEYzMFx1RkYwQ1VTRFx1RkYwOVx1RkYxQlx1N0YxM1x1NUI1OFx1NjcyQVx1NUUyNlx1NjIxMFx1NjcyQy9cdTY3MkFcdTRFQTdcdTc1MUZcdThDMDNcdTc1MjhcdTY1RjZcdTdGM0FcdTc3MDFcdTMwMDIgKi9cclxuICBhbmFseXNpc0Nvc3RVc2Q/OiBudW1iZXJcclxuICBhbmFseXNpc1Rva2Vucz86IHsgaW5wdXQ6IG51bWJlcjsgb3V0cHV0OiBudW1iZXI7IHRvdGFsOiBudW1iZXIgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSW1wYWN0U2NvcGVQYXlsb2FkIHtcclxuICBjaGFuZ2VkRmlsZXM6IHN0cmluZ1tdXHJcbiAgc2hhcz86IHN0cmluZ1tdXHJcbiAgcmlza0xldmVsOiAnbG93JyB8ICdtZWRpdW0nIHwgJ2hpZ2gnIHwgJ2NyaXRpY2FsJ1xyXG4gIHJpc2tTY29yZTogbnVtYmVyXHJcbiAgcmlza0ZhY3RvcnM/OiBBcnJheTx7IHRleHQ6IHN0cmluZzsgcG9pbnRzOiBudW1iZXIgfT5cclxuICBrZXlDaGFuZ2VQb2ludHM/OiBzdHJpbmdbXVxyXG4gIG1lbW9yaWVzPzogQXJyYXk8eyB0aXRsZTogc3RyaW5nOyB0eXBlOiBzdHJpbmcgfT5cclxuICBmdW5jdGlvbkltcGFjdD86IEFycmF5PHtcclxuICAgIHN5bWJvbDogc3RyaW5nXHJcbiAgICBkZWZpbmVkSW46IHN0cmluZ1xyXG4gICAgcm9sZT86IHN0cmluZ1xyXG4gICAgY2hhbmdlPzogc3RyaW5nXHJcbiAgICBpbXBhY3Q/OiBzdHJpbmdcclxuICAgIGNhbGxlcnM6IEFycmF5PHsgZmlsZTogc3RyaW5nOyBsaW5lOiBzdHJpbmc7IHNuaXBwZXQ6IHN0cmluZyB9PlxyXG4gIH0+XHJcbiAgbGV2ZWxzOiBBcnJheTx7IGxldmVsOiBzdHJpbmc7IGRlcHRoOiBudW1iZXI7IHBhdGg6IHN0cmluZzsgY29uZmlkZW5jZTogbnVtYmVyOyByZWFzb246IHN0cmluZyB9PlxyXG4gIGRpcmVjdDogc3RyaW5nW11cclxuICBleHBsYW5hdGlvbnNDYWNoZWQ/OiBib29sZWFuXHJcbiAgZ2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXHJcbiAgLyoqIFx1NTFGRFx1NjU3MFx1N0VBN1x1OEJGNFx1NjYwRVx1OTBBM1x1NkIyMSBMTE0gXHU4QzAzXHU3NTI4XHU3Njg0XHU2MjEwXHU2NzJDXHVGRjA4XHU0RjMwXHVGRjBDVVNEXHVGRjA5XHUzMDAyICovXHJcbiAgZXhwbGFuYXRpb25zQ29zdFVzZD86IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJldmlld1BheWxvYWQge1xyXG4gIGlzc3Vlc0ZvdW5kOiBudW1iZXJcclxuICBpc3N1ZXM6IHN0cmluZ1xyXG4gIHZlcmRpY3Q6IHN0cmluZ1xyXG4gIGNhY2hlZD86IGJvb2xlYW5cclxuICBnZW5lcmF0ZWRBdD86IG51bWJlciB8IG51bGxcclxuICBjb3N0VXNkPzogbnVtYmVyXHJcbiAgaXNzdWVMaXN0PzogQXJyYXk8eyBzZXZlcml0eTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBldmlkZW5jZTogc3RyaW5nOyBmaXg6IHN0cmluZyB9PlxyXG59XHJcblxyXG5pbnRlcmZhY2UgTm90ZUVudHJ5IHtcclxuICBpZDogc3RyaW5nXHJcbiAgcHJvamVjdElkOiBzdHJpbmdcclxuICBzaGE/OiBzdHJpbmdcclxuICB0aXRsZTogc3RyaW5nXHJcbiAgY29udGVudDogc3RyaW5nXHJcbiAgdGFncz86IHN0cmluZ1tdXHJcbiAgcGlubmVkPzogYm9vbGVhblxyXG4gIGNyZWF0ZWRBdDogbnVtYmVyXHJcbiAgdXBkYXRlZEF0PzogbnVtYmVyXHJcbn1cclxuXHJcbi8qKiBHRVQgL2lzc3VlcyBcdTc2ODRcdThCQzRcdTVCQTFcdTk1RUVcdTk4OThcdTY3NjFcdTc2RUVcdUZGMDhSZXZpZXcgXHU5NUVFXHU5ODk4XHU5ODc1XHU3QjdFXHU2NTcwXHU2MzZFXHU2RTkwXHVGRjA5XHUzMDAyICovXHJcbmludGVyZmFjZSBJc3N1ZUVudHJ5IHtcclxuICBpZDogc3RyaW5nXHJcbiAgY2hhbmdlSWQ6IHN0cmluZ1xyXG4gIHNldmVyaXR5OiBzdHJpbmdcclxuICBjYXRlZ29yeTogc3RyaW5nXHJcbiAgdGl0bGU6IHN0cmluZ1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcclxuICBzdGF0dXM6IHN0cmluZ1xyXG4gIHJlc29sdXRpb246IHN0cmluZ1xyXG4gIGZpeFN0YXRzOiB7IGZpbGVzOiBudW1iZXI7IGluc2VydGlvbnM6IG51bWJlcjsgZGVsZXRpb25zOiBudW1iZXIgfSB8IG51bGxcclxuICBmaXhGaWxlczogc3RyaW5nW11cclxuICBmaXhJbXBhY3Q6IEFycmF5PHsgc3ltYm9sOiBzdHJpbmc7IGRlZmluZWRJbjogc3RyaW5nOyBjYWxsZXJzOiBBcnJheTx7IGZpbGU6IHN0cmluZzsgbGluZTogc3RyaW5nOyBzbmlwcGV0OiBzdHJpbmcgfT4gfT5cclxuICBmaXhEaWZmOiBzdHJpbmdcclxuICAvKiogXHU1Rjg1XHU4QkM0XHU1QkExL1x1NURGMlx1NkQzRVx1NTNEMVx1NzY4NFx1NEZFRVx1NTkwRFx1NjVCOVx1Njg0OFx1RkYwOFx1NjVCOVx1Njg0OFx1NkEyMVx1NUYwRlx1NEVBN1x1NTFGQVx1RkYwOVx1MzAwMiAqL1xyXG4gIGZpeFBsYW4/OiB7IGlkOiBzdHJpbmc7IGFwcHJvYWNoOiBzdHJpbmc7IGZpbGVzOiBzdHJpbmdbXTsgaW1wYWN0OiBzdHJpbmc7IGJlbmVmaXQ6IHN0cmluZzsgcmlzazogc3RyaW5nOyBzdGF0dXM6IHN0cmluZyB9IHwgbnVsbFxyXG4gIGNyZWF0ZWRBdDogbnVtYmVyXHJcbiAgdXBkYXRlZEF0OiBudW1iZXJcclxufVxyXG5cclxuLyoqIFx1NEZFRVx1NTkwRFx1NkQzRVx1NTNEMVx1NEVGQlx1NTJBMVx1ODlDNlx1NTZGRVx1RkYwOEdFVCAvZml4L3N0YXR1c1x1RkYwOVx1MzAwMiAqL1xyXG5pbnRlcmZhY2UgRml4VGFza0VudHJ5IHtcclxuICBpc3N1ZUlkOiBzdHJpbmdcclxuICB0aXRsZTogc3RyaW5nXHJcbiAgc3RhdHVzOiAncXVldWVkJyB8ICdydW5uaW5nJyB8ICdtZXJnaW5nJyB8ICdyZWRvJyB8ICdkb25lJyB8ICdjb25mbGljdCcgfCAnZmFpbGVkJyB8ICdjYW5jZWxsZWQnXHJcbiAgYXR0ZW1wdDogbnVtYmVyXHJcbiAgc3VtbWFyeT86IHN0cmluZ1xyXG4gIGZpbGVzPzogc3RyaW5nW11cclxuICBjb21taXQ/OiBzdHJpbmdcclxuICBlcnJvcj86IHN0cmluZ1xyXG4gIC8qKiBcdThGRDBcdTg4NENcdTRFMkRcdTVCNTBcdTRFRTNcdTc0MDZcdTc2ODRcdTY3MDBcdThGRDFcdTUyQThcdTRGNUNcdUZGMDhcdThCRkIvXHU1MTk5XHU1NEVBXHU0RTJBXHU2NTg3XHU0RUY2XHVGRjA5XHUzMDAyICovXHJcbiAgY3VycmVudEFjdGlvbj86IHN0cmluZ1xyXG4gIC8qKiBcdTVCOENcdTYyMTBcdTU0MEVcdTc2ODRcdTVGNzFcdTU0Q0RcdTY0NThcdTg5ODFcdUZGMDhcdTc2RjRcdTZEM0VcdTRFRkJcdTUyQTFcdTgxRUFcdTUyQThcdThCQTFcdTdCOTdcdUZGMDlcdTMwMDIgKi9cclxuICBpbXBhY3Q/OiB7IHJpc2tMZXZlbDogc3RyaW5nOyByaXNrU2NvcmU6IG51bWJlcjsgZGlyZWN0OiBzdHJpbmdbXTsgaW5kaXJlY3Q6IHN0cmluZ1tdOyBwb3RlbnRpYWw6IHN0cmluZ1tdIH1cclxuICAvKiogXHU0RUZCXHU1MkExXHU2QTIxXHU1RjBGXHVGRjFBZml4PVx1NEZFRVx1NTkwRFx1RkYwOFx1OUVEOFx1OEJBNFx1RkYwOVx1RkYxQnBsYW49XHU1M0VBXHU4QkZCXHU1MUZBXHU2NUI5XHU2ODQ4XHUzMDAyICovXHJcbiAgbW9kZT86ICdmaXgnIHwgJ3BsYW4nXHJcbiAgLyoqIFx1NkEyMVx1NTc4Qlx1NjJBNVx1OTUxOVx1N0VFRFx1OEREMVx1NkIyMVx1NjU3MCAvIFx1NjNBMlx1NkQzQlx1NkIyMVx1NjU3MFx1RkYwOFx1NkQzQlx1NjAyN1x1NzJCNlx1NjAwMVx1NjczQVx1OTAwRlx1NTFGQVx1RkYwOVx1MzAwMiAqL1xyXG4gIHJlc3VtZXM/OiBudW1iZXJcclxuICBwcm9iZXM/OiBudW1iZXJcclxufVxyXG5cclxuLyoqIFx1NEZFRVx1NTkwRFx1NURFRVx1NUYwMlx1NzY4NFx1ODg0Q1x1N0VBN1x1Nzc0MFx1ODI3Mlx1NkUzMlx1NjdEM1x1RkYxQSsgXHU3RUZGXHUzMDAxLSBcdTdFQTJcdTMwMDFcdTY1ODdcdTRFRjZcdTU5MzRcdTUyQTBcdTdDOTdcdTMwMDFcdTUxNzZcdTRGNTlcdTVGMzFcdTUzMTZcdTMwMDIgKi9cclxuZnVuY3Rpb24gcmVuZGVyRGlmZkxpbmVzKGRpZmY6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdIHtcclxuICBpZiAodHlwZW9mIGRpZmYgIT09ICdzdHJpbmcnIHx8IGRpZmYgPT09ICcnKSByZXR1cm4gW11cclxuICByZXR1cm4gZGlmZi5zcGxpdCgnXFxuJykuc2xpY2UoMCwgNDAwKS5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XHJcbiAgICBjb25zdCBzdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcyA9IHtcclxuICAgICAgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsXHJcbiAgICAgIGZvbnRTaXplOiAnMTFweCcsIGxpbmVIZWlnaHQ6IDEuNiwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyxcclxuICAgIH1cclxuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJysrKycpIHx8IGxpbmUuc3RhcnRzV2l0aCgnLS0tJykgfHwgbGluZS5zdGFydHNXaXRoKCdkaWZmIC0tZ2l0JykgfHwgbGluZS5zdGFydHNXaXRoKCdAQCcpKSB7XHJcbiAgICAgIHN0eWxlLmNvbG9yID0gJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJ1xyXG4gICAgfSBlbHNlIGlmIChsaW5lLnN0YXJ0c1dpdGgoJysnKSkge1xyXG4gICAgICBzdHlsZS5jb2xvciA9IHRoZW1lQXdhcmVUZXh0KCcjMWE3ZjM3JylcclxuICAgICAgc3R5bGUuYmFja2dyb3VuZCA9ICdyZ2JhKDQ2LDE2MCw2NywwLjA4KSdcclxuICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKCctJykpIHtcclxuICAgICAgc3R5bGUuY29sb3IgPSB0aGVtZUF3YXJlVGV4dCgnI2QxMjQyZicpXHJcbiAgICAgIHN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgyMDksMzYsNDcsMC4wOCknXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdHlsZS5jb2xvciA9ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKSdcclxuICAgIH1cclxuICAgIHJldHVybiA8ZGl2IGtleT17aW5kZXh9IHN0eWxlPXtzdHlsZX0+e2xpbmUgPT09ICcnID8gJ1xcdTAwQTAnIDogbGluZX08L2Rpdj5cclxuICB9KVxyXG59XHJcblxyXG4vKiogXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0XHU5ODc1XHU3Njg0XHU1M0VGXHU3RjE2XHU4RjkxXHU2QjY1XHU5QUE0XHVGRjA4L3J1bnMvc3RhcnQgXHU4RkQ0XHU1NkRFXHVGRjA5XHUzMDAyICovXHJcbmludGVyZmFjZSBQbGFuQ29uZmlybVN0ZXAge1xyXG4gIGlkOiBzdHJpbmdcclxuICB0aXRsZTogc3RyaW5nXHJcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xyXG4gIHRhcmdldEZpbGVzOiBzdHJpbmdbXVxyXG4gIHJvbGU6IHN0cmluZ1xyXG4gIGFjY2VwdGFuY2U6IHN0cmluZ1xyXG4gIGZhaWx1cmVQb2xpY3k6IHN0cmluZ1xyXG4gIGVuYWJsZWQ6IGJvb2xlYW5cclxuICBtb2RlbFByb3ZpZGVyOiBzdHJpbmdcclxuICBtb2RlbElkOiBzdHJpbmdcclxufVxyXG5cclxuLyoqIFBPU1QgL3BlZWsgXHU3Njg0XHU4RjdEXHU4Mzc3XHVGRjA4XHU0RUUzXHU3ODAxXHU0RTBBXHU0RTBCXHU2NTg3XHU2RDZFXHU1QzQyXHVGRjA5XHUzMDAyICovXHJcbmludGVyZmFjZSBQZWVrUGF5bG9hZCB7XHJcbiAgZXhpc3RzOiBib29sZWFuXHJcbiAgcGF0aD86IHN0cmluZ1xyXG4gIHN0YXJ0TGluZT86IG51bWJlclxyXG4gIGVuZExpbmU/OiBudW1iZXJcclxuICB0b3RhbExpbmVzPzogbnVtYmVyXHJcbiAgbGluZXM/OiBBcnJheTx7IG46IG51bWJlcjsgdGV4dDogc3RyaW5nIH0+XHJcbn1cclxuXHJcbi8qKiBcdTRFQ0VcdTgxRUFcdTc1MzFcdTY1ODdcdTY3MkNcdTRFMkRcdThCQzZcdTUyMkIgZmlsZTpsaW5lIFx1NUYxNVx1NzUyOFx1RkYwOFx1NTQyQiBmaWxlOmxpbmUtbGluZSBcdTUzM0FcdTk1RjRcdTUzRDZcdThENzdcdTU5Q0JcdTg4NENcdUZGMDlcdTMwMDIgKi9cclxuY29uc3QgRklMRV9MSU5FX1BBVFRFUk4gPSAvKCg/OltcXHcuLV0rWy9cXFxcXSkqW1xcdy4tXStcXC5bQS1aYS16XXsxLDR9KTooXFxkezEsNX0pKD86LVxcZHsxLDV9KT8vZ1xyXG5cclxuLyoqIEdFVCAvcnVucy9kZXRhaWwgXHU3Njg0XHU4RjdEXHU4Mzc3XHUzMDAyICovXHJcbmludGVyZmFjZSBSdW5EZXRhaWwge1xyXG4gIHJ1bjogeyBpZDogc3RyaW5nOyBjaGFuZ2VJZDogc3RyaW5nOyBjaGFuZ2VUaXRsZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZzsgcGF1c2VQb2ludDogeyBzdGVwSWQ6IHN0cmluZzsgcmVhc29uOiBzdHJpbmc7IGF0OiBudW1iZXIgfSB8IG51bGw7IGVycm9yOiB7IG1lc3NhZ2U6IHN0cmluZyB9IHwgbnVsbDsgc3RhcnRlZEF0OiBudW1iZXIgfCBudWxsOyBmaW5pc2hlZEF0OiBudW1iZXIgfCBudWxsIH1cclxuICBzdGVwczogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyByb2xlOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmcgfCBudWxsOyBzdGF0dXM6IHN0cmluZzsgYXR0ZW1wdHNDb3VudDogbnVtYmVyOyBjbGFpbWVkT3V0Y29tZTogc3RyaW5nIHwgbnVsbDsgdmVyaWZpZWQ6IGJvb2xlYW47IGNvc3RVc2Q6IG51bWJlciB9PlxyXG4gIGNvbnRleHQ6IHtcclxuICAgIHByb2plY3REaWdlc3Q6IHN0cmluZzsgYnJhbmNoOiBzdHJpbmcgfCBudWxsOyBoZWFkU2hhOiBzdHJpbmcgfCBudWxsXHJcbiAgICBpbmplY3RlZE1lbW9yaWVzOiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT5cclxuICAgIHN0ZXBTdW1tYXJpZXM6IEFycmF5PHsgc3RlcFRpdGxlOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgY2hhbmdlZEZpbGVzOiBzdHJpbmdbXTsgYXQ6IG51bWJlciB9PlxyXG4gICAgZGVjaXNpb25Mb2c6IEFycmF5PHsga2luZDogc3RyaW5nOyBkZXRhaWw6IHN0cmluZzsgYXQ6IG51bWJlciB9PlxyXG4gIH0gfCBudWxsXHJcbn1cclxuXHJcbi8qKiBHRVQgL3NjaGVkdWxlZCBcdTc2ODRcdTRFRkJcdTUyQTFcdTY3NjFcdTc2RUVcdTMwMDIgKi9cclxuaW50ZXJmYWNlIFNjaGVkdWxlZFRhc2tFbnRyeSB7XHJcbiAgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmdcclxuICBpbnRlcnZhbE1pbnV0ZXM6IG51bWJlcjsgZW5hYmxlZDogYm9vbGVhbjsgbGFzdFJ1bkF0OiBudW1iZXIgfCBudWxsOyBsYXN0UmVzdWx0OiBzdHJpbmc7IG5leHREdWVBdDogbnVtYmVyXHJcbn1cclxuXHJcbi8qKiBHRVQgL21lbW9yaWVzIFx1NzY4NFx1OEJCMFx1NUZDNlx1Njc2MVx1NzZFRVx1RkYwOFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1NjU3MFx1NjM2RVx1NkU5MFx1RkYwOVx1MzAwMiAqL1xyXG5pbnRlcmZhY2UgTWVtb3J5RW50cnkge1xyXG4gIGlkOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29udGVudDogc3RyaW5nOyByZWxhdGVkRmlsZXM6IHN0cmluZ1tdXHJcbiAgaXNIdW1hbkNvbmZpcm1lZDogYm9vbGVhbjsgZ2l0QnJhbmNoOiBzdHJpbmcgfCBudWxsOyBzY29wZTogc3RyaW5nOyBzb3VyY2VUYWc6IHN0cmluZ1xyXG4gIGJhc2lzU2hhOiBzdHJpbmcgfCBudWxsOyBzdGF0dXM6IHN0cmluZzsgbGFzdFZlcmlmaWVkU2hhOiBzdHJpbmcgfCBudWxsXHJcbiAgY3JlYXRlZEF0OiBudW1iZXI7IHVwZGF0ZWRBdDogbnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBNZW1vcmllc1BheWxvYWQge1xyXG4gIG1lbW9yaWVzOiBNZW1vcnlFbnRyeVtdXHJcbiAgYnJhbmNoOiBzdHJpbmcgfCBudWxsXHJcbiAgaGVhZFNoYTogc3RyaW5nIHwgbnVsbFxyXG4gIGJhc2VsaW5lOiB7IHNoYTogc3RyaW5nIHwgbnVsbDsgdXBkYXRlZEF0OiBudW1iZXIgfSB8IG51bGxcclxuICBiZWhpbmRDb3VudDogbnVtYmVyXHJcbn1cclxuXHJcbi8qKiBQT1NUIC9tZW1vcnkvc3luYyBcdTc2ODRcdTU0MENcdTZCNjVcdTYyQTVcdTU0NEFcdTMwMDIgKi9cclxuaW50ZXJmYWNlIFN5bmNSZXBvcnQge1xyXG4gIG9rOiBib29sZWFuXHJcbiAgZXJyb3I/OiBzdHJpbmdcclxuICBiZWhpbmRDb3VudD86IG51bWJlclxyXG4gIHN0YWxlUHJvcG9zYWxzPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyByZWFzb246IHN0cmluZyB9PlxyXG4gIHJlbmV3ZWQ/OiBudW1iZXJcclxuICBuZXdDYW5kaWRhdGVzPzogQXJyYXk8eyB0eXBlOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZyB9PlxyXG4gIHZlcmRpY3Q/OiBzdHJpbmdcclxufVxyXG5cclxuLyoqIFx1OEJDNFx1NUJBMVx1OTVFRVx1OTg5OFx1NzJCNlx1NjAwMSBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXHJcbmNvbnN0IElTU1VFX1NUQVRVU19MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgb3BlbjogJ1x1NUY4NVx1NTkwNFx1NzQwNicsXHJcbiAgZml4aW5nOiAnXHU0RkVFXHU1OTBEXHU0RTJEJyxcclxuICByZXNvbHZlZDogJ1x1NURGMlx1ODlFM1x1NTFCMycsXHJcbiAgYWNjZXB0ZWQ6ICdcdTVERjJcdTU5MDRcdTc0MDYnLFxyXG4gIHJlamVjdGVkOiAnXHU4QkVGXHU2MkE1L1x1OTFDRFx1NTkwRCcsXHJcbn1cclxuXHJcbi8qKiBcdThCQjBcdTVGQzZcdTdDN0JcdTU3OEIgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xyXG5jb25zdCBNRU1PUllfVFlQRV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgYXJjaGl0ZWN0dXJlX2RlY2lzaW9uOiAnXHU2N0I2XHU2Nzg0XHU1MUIzXHU3QjU2JywgcGF0dGVybl9ydWxlOiAnXHU2QTIxXHU1RjBGXHU4OUM0XHU1MjE5Jywgcmlza19ob3RzcG90OiAnXHU5OENFXHU5NjY5XHU3MEVEXHU3MEI5JyxcclxuICBsZWFybmVkX2NvbmNlcHQ6ICdcdTVCNjZcdTRFNjBcdTY5ODJcdTVGRjUnLCB1c2VyX3Byb2ZpbGU6ICdcdTc1MjhcdTYyMzdcdTUwNEZcdTU5N0QnLCBwcm9qZWN0X2xvZzogJ1x1OTg3OVx1NzZFRVx1NjVFNVx1NUZENycsIGRhaWx5X2xvZzogJ1x1NjVFNVx1NUZENycsXHJcbn1cclxuXHJcbi8qKiBcdThCQjBcdTVGQzZcdTY3NjVcdTZFOTAgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xyXG5jb25zdCBNRU1PUllfU09VUkNFX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICBydW46ICdcdTYyNjdcdTg4NENcdTYzRDBcdTcwQkMnLCByZXZpZXc6ICdcdTY4MzhcdTY3RTVcdTZDODlcdTZEQzAnLCBzeW5jOiAnXHU2MkM5XHU1M0Q2XHU1NDBDXHU2QjY1JywgY2hhdDogJ0FJIFx1OEJCMFx1NUY1NScsIG1hbnVhbDogJ1x1NjI0Qlx1NTJBOCcsXHJcbn1cclxuXHJcbi8qKiBcdTdGMTZcdTYzOTJcdTg5RDJcdTgyNzIgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xyXG5jb25zdCBST0xFX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICBhbmFseXNpczogJ1x1NTIwNlx1Njc5MCcsIHBsYW5uaW5nOiAnXHU4OUM0XHU1MjEyJywgY29kaW5nOiAnXHU1RjAwXHU1M0QxJywgb3BzOiAnXHU3QjgwXHU1MzU1XHU2NENEXHU0RjVDJywgdmVyaWZpY2F0aW9uOiAnXHU5QThDXHU2NTM2JyxcclxufVxyXG5cclxuLyoqIFx1NkI2NVx1OUFBNFx1NTkzMVx1OEQyNVx1N0I1Nlx1NzU2NSBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXHJcbmNvbnN0IFBPTElDWV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgJ3JldHJ5LWVzY2FsYXRlJzogJ1x1OTFDRFx1OEJENVx1NUU3Nlx1NTM0N1x1N0VBN1x1NkEyMVx1NTc4QicsICdyZXRyeS1mYWxsYmFjayc6ICdcdTkxQ0RcdThCRDUnLCBza2lwOiAnXHU1OTMxXHU4RDI1XHU1MjE5XHU4REYzXHU4RkM3JywgYXNrOiAnXHU1OTMxXHU4RDI1XHU1MjE5XHU2NjgyXHU1MDVDXHU5NUVFXHU0RUJBJyxcclxufVxyXG5cclxuLyoqIFJ1biBcdTcyQjZcdTYwMDEgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xyXG5jb25zdCBSVU5fU1RBVFVTX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICBxdWV1ZWQ6ICdcdTYzOTJcdTk2MUZcdTRFMkQnLCBydW5uaW5nOiAnXHU4RkQwXHU4ODRDXHU0RTJEJywgcGF1c2VkOiAnXHU1REYyXHU2NjgyXHU1MDVDJywgYmxvY2tlZDogJ1x1OTYzQlx1NTg1RScsIHJldHJ5aW5nOiAnXHU5MUNEXHU4QkQ1XHU0RTJEJyxcclxuICB2ZXJpZnlpbmc6ICdcdTY1MzZcdTVDM0VcdTlBOENcdTY1MzZcdTRFMkQnLCBzdWNjZWVkZWQ6ICdcdTVERjJcdTYyMTBcdTUyOUYnLCBjb21wbGV0ZWQ6ICdcdTVERjJcdTYyMTBcdTUyOUYnLCBmYWlsZWQ6ICdcdTU5MzFcdThEMjUnLCBjYW5jZWxsZWQ6ICdcdTVERjJcdTUzRDZcdTZEODgnLCBpbnRlcnJ1cHRlZDogJ1x1NURGMlx1NEUyRFx1NjVBRCcsXHJcbn1cclxuXHJcbi8qKiBcdTZCNjVcdTlBQTRcdTcyQjZcdTYwMDEgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xyXG5jb25zdCBTVEVQX1NUQVRVU19MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgcGVuZGluZzogJ1x1NUY4NVx1NjI2N1x1ODg0QycsIHJlYWR5OiAnXHU1QzMxXHU3RUVBJywgcnVubmluZzogJ1x1NjI2N1x1ODg0Q1x1NEUyRCcsIHBhdXNlZDogJ1x1NjY4Mlx1NTA1QycsIHJldHJ5aW5nOiAnXHU5MUNEXHU4QkQ1XHU0RTJEJyxcclxuICBzdWNjZWVkZWQ6ICdcdTVERjJcdTYyMTBcdTUyOUYnLCBmYWlsZWQ6ICdcdTU5MzFcdThEMjUnLCBza2lwcGVkOiAnXHU1REYyXHU4REYzXHU4RkM3JywgYmxvY2tlZDogJ1x1OTYzQlx1NTg1RScsIGNhbmNlbGxlZDogJ1x1NURGMlx1NTNENlx1NkQ4OCcsIGludGVycnVwdGVkOiAnXHU1REYyXHU0RTJEXHU2NUFEJyxcclxufVxyXG5cclxuLyoqIFx1OEJDNFx1NUJBMVx1OTVFRVx1OTg5OFx1NEUyNVx1OTFDRFx1NUVBNiBcdTIxOTIgXHU1RkJEXHU3QUUwXHU1RTk1XHU4MjcyXHUzMDAyICovXHJcbmZ1bmN0aW9uIHNldmVyaXR5Q29sb3Ioc2V2ZXJpdHk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgaWYgKHNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IHNldmVyaXR5ID09PSAnYmxvY2tlcicpIHJldHVybiAnI2NlOTE3OCdcclxuICBpZiAoc2V2ZXJpdHkgPT09ICdtYWpvcicpIHJldHVybiAnI2Q3YmE3ZCdcclxuICBpZiAoc2V2ZXJpdHkgPT09ICdpbmZvJykgcmV0dXJuICcjNmI4YjhiJ1xyXG4gIHJldHVybiAnIzU2OWNkNidcclxufVxyXG5cclxuLyoqIFx1NEUyNVx1OTFDRFx1NUVBNlx1NUY1Mlx1NEUwMFx1RkYwOFx1NTE3Q1x1NUJCOVx1NTM4Nlx1NTNGMlx1OEJCMFx1NUY1NVx1OTFDQ1x1NzY4NCBoaWdoL21lZGl1bS9sb3dcdUZGMUJcdTY3MkFcdTc3RTVcdTU2REVcdTg0M0QgbWlub3JcdUZGMDlcdUZGMENcdTdFREZcdThCQTEvXHU3QjVCXHU5MDA5L1x1Nzc0MFx1ODI3Mlx1NTE3MVx1NzUyOFx1MzAwMiAqL1xyXG5mdW5jdGlvbiBub3JtYWxpemVJc3N1ZVNldmVyaXR5KHNldmVyaXR5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGlmIChzZXZlcml0eSA9PT0gJ2hpZ2gnKSByZXR1cm4gJ21ham9yJ1xyXG4gIGlmIChzZXZlcml0eSA9PT0gJ21lZGl1bScgfHwgc2V2ZXJpdHkgPT09ICdsb3cnKSByZXR1cm4gJ21pbm9yJ1xyXG4gIHJldHVybiBzZXZlcml0eSA9PT0gJ2Jsb2NrZXInIHx8IHNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IHNldmVyaXR5ID09PSAnbWFqb3InIHx8IHNldmVyaXR5ID09PSAnbWlub3InIHx8IHNldmVyaXR5ID09PSAnaW5mbydcclxuICAgID8gc2V2ZXJpdHkgOiAnbWlub3InXHJcbn1cclxuXHJcbi8vIFx1NEUzQlx1OTg5OFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYwOHBhcnNlQ29sb3IgLyByZWxhdGl2ZUx1bWluYW5jZSAvIGRhcmtlbi9saWdodGVuIC8gdGhlbWVBd2FyZVRleHRcdUZGMDlcclxuLy8gXHU1REYyXHU2MkJEXHU1M0Q2XHU1MjMwIC4vdGhlbWUudHMgXHU3RURGXHU0RTAwXHU3RUY0XHU2MkE0XHUzMDAyXHU1MTY4XHU2NTg3XHU0RUY2XHU0RTBEXHU1M0Q4XHU1RjBGXHVGRjFBXHJcbi8vIDEpIFx1NUYzQVx1OEMwM1x1ODI3Mlx1NjU4N1x1NUI1N1x1NUZDNVx1OTg3Qlx1N0VDRiB0aGVtZUF3YXJlVGV4dFx1RkYwOFx1NkUzMlx1NjdEM1x1NjcxRlx1OEMwM1x1NzUyOFx1RkYwOVx1RkYxQlxyXG4vLyAyKSBhY3RpdmUgXHU5QUQ4XHU0RUFFXHU4MENDXHU2NjZGXHU0RTAwXHU1RjhCIGJ1dHRvbi1pbmZvLWZpbGxcdUZGMENcdTc5ODFcdTZCNjIgYnJhbmQtcHJpbWFyeSBcdTRGNUNcdTgwQ0NcdTY2NkZcclxuLy8gICAgXHVGRjA4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU0RTBCXHU4RkQxXHU3NjdEXHVGRjBDXHU5MTREXHU3NjdEXHU1QjU3XHU0RTBEXHU1M0VGXHU4OUMxXHUyMDE0XHUyMDE0XHUzMDBDXHU5ODc1XHU3QjdFXHU3NjdEXHU1NzU3XHUzMDBEXHU0RThCXHU2NTQ1XHU2ODM5XHU1NkUwXHVGRjA5XHUzMDAyXHJcblxyXG4vKiogXHU4QkM0XHU1QkExXHU3NkVFXHU2ODA3XHVGRjA4Y2hhbmdlSWRcdUZGMDlcdTIxOTIgXHU1M0VGXHU4QkZCXHU2ODA3XHU3QjdFXHVGRjFBXHU1NDA4XHU2MjEwIHJldmlldzo8c2hhPiBcdTYzMDdcdTU0MTFcdTYzRDBcdTRFQTRcdUZGMENjaGdfKiBcdTYzMDdcdTU0MTFcdTUzRDhcdTY2RjRcdUZGMENhZGhvYyBcdTRFM0FcdTVERTVcdTRGNUNcdTUzM0FcdTMwMDIgKi9cclxuZnVuY3Rpb24gaXNzdWVUYXJnZXRMYWJlbChjaGFuZ2VJZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICBjb25zdCBpZCA9IHR5cGVvZiBjaGFuZ2VJZCA9PT0gJ3N0cmluZycgPyBjaGFuZ2VJZCA6ICcnXHJcbiAgaWYgKGlkLnN0YXJ0c1dpdGgoJ3JldmlldzonKSkgcmV0dXJuIGBcdTYzRDBcdTRFQTQgJHtpZC5zbGljZSg3LCAxNSl9YFxyXG4gIGlmIChpZCA9PT0gJ2FkaG9jJykgcmV0dXJuICdcdTVERTVcdTRGNUNcdTUzM0EnXHJcbiAgcmV0dXJuIGBcdTUzRDhcdTY2RjQgJHtpZC5zbGljZSgwLCAxMSl9YFxyXG59XHJcblxyXG4vKiogXHU2MDNCXHU3RUQzL1x1N0VEM1x1Njc4NFx1NTMxNlx1N0IxNFx1OEJCMFx1NzY4NFx1OEY3Qlx1OTFDRiBNYXJrZG93biBcdTZFMzJcdTY3RDNcdUZGMUFcdTMwMEMjIyBcdTMwMERcdTgyODJcdTY4MDdcdTk4OThcdTc3NDBcdTgyNzJcdTUyQTBcdTdDOTdcdUZGMENcdTMwMEMtIFx1MzAwRFx1NTIxN1x1ODg2OFx1NTJBMFx1NTcwNlx1NzBCOVx1RkYwQ1x1NTE3Nlx1NEY1OVx1NTM5Rlx1NjgzN1x1MzAwMiAqL1xyXG5mdW5jdGlvbiByZW5kZXJTdHJ1Y3R1cmVkQ29udGVudChjb250ZW50OiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XHJcbiAgaWYgKHR5cGVvZiBjb250ZW50ICE9PSAnc3RyaW5nJyB8fCBjb250ZW50ID09PSAnJykgcmV0dXJuIFtdXHJcbiAgcmV0dXJuIGNvbnRlbnQuc3BsaXQoJ1xcbicpLm1hcCgobGluZSwgaW5kZXgpID0+IHtcclxuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJyMjICcpKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTIuNXB4JywgbWFyZ2luVG9wOiBpbmRleCA9PT0gMCA/IDAgOiAxMCwgbWFyZ2luQm90dG9tOiAyLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+XHJcbiAgICAgICAgICB7bGluZS5zbGljZSgzKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKVxyXG4gICAgfVxyXG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnLSAnKSkge1xyXG4gICAgICByZXR1cm4gPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17eyBwYWRkaW5nTGVmdDogMTQsIHRleHRJbmRlbnQ6IC0xMCB9fT5cdTIwMjIge3JlbmRlcldpdGhQZWVrKGxpbmUuc2xpY2UoMikpfTwvZGl2PlxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0+e2xpbmUgPT09ICcnID8gJ1xcdTAwQTAnIDogcmVuZGVyV2l0aFBlZWsobGluZSl9PC9kaXY+XHJcbiAgfSlcclxufVxyXG5cclxuLyoqIHBlZWsgXHU3MEI5XHU1MUZCXHU1NkRFXHU4QzAzXHVGRjFBXHU3NTMxIFdvcmtzcGFjZUZyYW1lIFx1NkNFOFx1NTE2NVx1RkYwOFx1NkUzMlx1NjdEM1x1NTY2OFx1NEZERFx1NjMwMVx1NkEyMVx1NTc1N1x1N0VBN1x1N0VBRlx1NTFGRFx1NjU3MFx1RkYwOVx1MzAwMiAqL1xyXG5sZXQgcGVla09wZW5lcjogKChwYXRoOiBzdHJpbmcsIGxpbmU6IG51bWJlcikgPT4gdm9pZCkgfCB1bmRlZmluZWRcclxuXHJcbi8qKiBcdTYyOEFcdTY1ODdcdTY3MkNcdTRFMkRcdTc2ODQgZmlsZTpsaW5lIFx1NUYxNVx1NzUyOFx1NkUzMlx1NjdEM1x1NEUzQVx1NTNFRlx1NzBCOVx1NTFGQlx1ODJBRlx1NzI0N1x1RkYwOFx1NzBCOVx1NTFGQlx1NUYzOVx1NTFGQVx1NEVFM1x1NzgwMVx1NEUwQVx1NEUwQlx1NjU4N1x1RkYwOVx1MzAwMiAqL1xyXG5mdW5jdGlvbiByZW5kZXJXaXRoUGVlayh0ZXh0OiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGUge1xyXG4gIGNvbnN0IG5vZGVzOiBSZWFjdC5SZWFjdE5vZGVbXSA9IFtdXHJcbiAgbGV0IGxhc3QgPSAwXHJcbiAgbGV0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXkgfCBudWxsXHJcbiAgRklMRV9MSU5FX1BBVFRFUk4ubGFzdEluZGV4ID0gMFxyXG4gIHdoaWxlICgobWF0Y2ggPSBGSUxFX0xJTkVfUEFUVEVSTi5leGVjKHRleHQpKSAhPT0gbnVsbCkge1xyXG4gICAgaWYgKG1hdGNoLmluZGV4ID4gbGFzdCkgbm9kZXMucHVzaCh0ZXh0LnNsaWNlKGxhc3QsIG1hdGNoLmluZGV4KSlcclxuICAgIGNvbnN0IFtmdWxsLCBwYXRoLCBsaW5lU3RyXSA9IG1hdGNoXHJcbiAgICBub2Rlcy5wdXNoKFxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAga2V5PXtgJHttYXRjaC5pbmRleH0tJHtmdWxsfWB9XHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJywgYm9yZGVyOiAnbm9uZScsIHBhZGRpbmc6ICcwIDFweCcsIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsXHJcbiAgICAgICAgICBmb250U2l6ZTogJ2luaGVyaXQnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lIGRvdHRlZCcsXHJcbiAgICAgICAgfX1cclxuICAgICAgICB0aXRsZT1cIlx1NzBCOVx1NTFGQlx1NjdFNVx1NzcwQlx1NEVFM1x1NzgwMVx1NEUwQVx1NEUwQlx1NjU4N1wiXHJcbiAgICAgICAgb25DbGljaz17KCkgPT4geyBwZWVrT3BlbmVyPy4ocGF0aCwgTnVtYmVyKGxpbmVTdHIpKSB9fVxyXG4gICAgICA+e2Z1bGx9PC9idXR0b24+LFxyXG4gICAgKVxyXG4gICAgbGFzdCA9IG1hdGNoLmluZGV4ICsgZnVsbC5sZW5ndGhcclxuICB9XHJcbiAgaWYgKGxhc3QgPCB0ZXh0Lmxlbmd0aCkgbm9kZXMucHVzaCh0ZXh0LnNsaWNlKGxhc3QpKVxyXG4gIHJldHVybiBub2Rlcy5sZW5ndGggPT09IDEgPyBub2Rlc1swXSA6IDxzcGFuPntub2Rlc308L3NwYW4+XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBcdTg5QzZcdTg5QzlcdTYzNjJcdTUyMTdcdTY4MzdcdTVGMEZcdTg4NjhcdUZGMUFcdTk2OEZcdTY3MkNcdTdFQzRcdTRFRjZcdTYzMDJcdThGN0QvXHU1Mzc4XHU4RjdEXHVGRjA4XHU1Mzc4XHU4RjdEXHU1MzczXHU1QjhDXHU1MTY4XHU2MDYyXHU1OTBEXHU1MzlGXHU3NTFGXHU1RTAzXHU1QzQwXHVGRjA5XHUzMDAyXHJcbiAqIFx1NjM2Mlx1NTIxN1x1NjYyRlx1NjVFMFx1Njc2MVx1NEVGNlx1NzY4NFx1RkYwOFx1NTQyQlx1NjVCMFx1NEYxQVx1OEJERFx1ODQzRFx1NTczMFx1OTg3NVx1RkYwOVx1MjAxNFx1MjAxNFx1NEUxQVx1NEUzQlx1ODlDNFx1NTIxOVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1ODk4MVx1NEU0OFx1NEUwRFx1NjYzRVx1NzkzQVx1MzAwMVx1ODk4MVx1NEU0OFx1NUM0NVx1NEUyRFx1RkYwQ1xyXG4gKiBcdTUzRjNcdTRGQTdcdTUzRUFcdTUxNDFcdThCQjhcdTgwNEFcdTU5MjlcdTMwMDIwLjEuMiBcdTY1QjBcdTRGMUFcdThCRERcdTk4NzVcdTRFNUZcdTVFMjYgZGF0YS1kZXRhaWxzLWNvbGxhcHNlZFx1RkYwQ1x1NjZGRVx1NTZFMFx1NUJGOVx1NUI4M1x1OEM0MVx1NTE0RFxyXG4gKiBcdTYzNjJcdTUyMTdcdTVCRkNcdTgxRjRcdTVERTVcdTRGNUNcdTUzRjBcdTU3MjhcdTY1QjBcdTRGMUFcdThCRERcdTRFMEJcdTkwMDBcdTU2REVcdTUzOUZcdTc1MUZcdTUzRjNcdTRGNERcdUZGMDgyMDI2LTA5LTEwIFx1NEZFRVx1NTkwRFx1RkYwOVx1MzAwMlxyXG4gKiBcdTZDRThcdTYxMEZcdUZGMUFcdTc5ODFcdTZCNjJcdTc1MjggOmhhcygpIFx1NTA1QVx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1MjAxNFx1MjAxNFx1NUI5OFx1NjVCOVx1Njc4NFx1NUVGQVx1NEVBN1x1NzI2OVx1NTFFMFx1NTM0MVx1NEUyQVx1N0VDNFx1NEVGNlx1NjgzOVx1N0M3Qlx1OTBGRFx1NTNFQiByb290XHVGRjBDXHJcbiAqIFx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1NEYxQVx1NjI4QVx1NjU3NFx1NEUyQVx1ODA0QVx1NTkyOVx1NUJCOVx1NTY2OFx1OEJFRlx1OTRCM1x1NTIzNlx1RkYwOFx1NTM4Nlx1NTNGMlx1NEU4Qlx1NjU0NVx1RkYwOVx1MzAwMlx1NkI2NFx1ODg2OFx1NTNFQVx1NEZERFx1NzU1OVx1N0Y1MVx1NjgzQ1x1NjM2Mlx1NTIxN1x1NEUwRVx1NjJENlx1NjJGRFx1NjdDNFx1OTY5MFx1ODVDRlx1MzAwMlxyXG4gKi9cclxuY29uc3QgTEFZT1VUX1NUWUxFID0gYFxyXG5kaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdID4gZGl2W2NsYXNzKj1cImNlbnRlckNvbFwiXSB7IG9yZGVyOiAzOyB9XHJcbmRpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0gPiBkaXZbY2xhc3MqPVwiZGV0YWlsc0NvbFwiXSB7IG9yZGVyOiAyOyB9XHJcbmRpdltjbGFzcyo9XCJoYW5kbGVcIl1bZGF0YS1zaWRlPVwiZGV0YWlsc1wiXSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxyXG5kaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdIHtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gbWlubWF4KDAsIDFmcikgdmFyKC0tcGMtY2hhdC13LCAzNjBweCkgIWltcG9ydGFudDtcclxufVxyXG5gXHJcblxyXG4vKipcclxuICogXHU0RjFBXHU4QkREXHU3RURGXHU4QkExXHU4ODRDXHU3Njg0XHU0RTI0XHU4ODRDXHU5NEIzXHU1MjM2XHVGRjA4XHU3NTI4XHU2MjM3XHU2MzA3XHU1QjlBXHU3Njg0XHU2ODM3XHU1RjBGXHVGRjA5XHUzMDAyXHU0RTBEXHU4MEZEXHU4RDcwIENTUyBcdTkwMDlcdTYyRTlcdTU2NjhcdUZGMUFcclxuICogXHU1Qjk4XHU2NUI5XHU1OTFBXHU0RTJBXHU2QTIxXHU1NzU3XHU3Njg0XHU2ODM5XHU3QzdCXHU5MEZEXHU1M0VCIGByb290YFx1RkYwOFx1Njc4NFx1NUVGQVx1NTQwRVx1NjYyRiBgaGFzaF9yb290YFx1RkYwOVx1RkYwQ1x1NTE3Nlx1NEUyRFxyXG4gKiBDb252ZXJzYXRpb25Sb290IFx1NzY4NFx1NUI1MFx1NjgxMVx1OTFDQ1x1NUMzMVx1NTMwNVx1NTQyQlx1N0VERlx1OEJBMVx1ODg0Q1x1NzY4NCBgaGFzaF9zZXBgIFx1NTIwNlx1OTY5NCBzcGFuXHUyMDE0XHUyMDE0XHJcbiAqIFx1NEVGQlx1NEY1NVx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1RkYwOFx1NTQyQiA6aGFzKClcdUZGMDlcdTkwRkRcdTRGMUFcdTYyOEFcdTY1NzRcdTRFMkFcdTgwNEFcdTU5MjlcdTVCQjlcdTU2NjhcdTk0QjNcdTYyMTBcdTRFMjRcdTg4NENcdUZGMENcdTY3NDBcdTZCN0JcdTZFREFcdTUyQThcdTMwMDJcclxuICogXHU1NkUwXHU2QjY0XHU1NzI4XHU4RkQwXHU4ODRDXHU2NUY2XHU2MzA5XHU1NTJGXHU0RTAwXHU1RjYyXHU3MkI2XHU1QjlBXHU0RjREXHVGRjFBXHU1QzQ1XHU0RTJEXHU2MzkyXHU3MjQ4ICsgXHU3NkY0XHU2M0E1XHU1QjUwXHU0RUUzXHU1NDJCXHU2NTg3XHU2NzJDIFwifFwiIFx1NzY4NFxyXG4gKiBcdTUyMDZcdTk2OTQgc3Bhblx1RkYwQ1x1NTQ3RFx1NEUyRFx1NTQwRVx1NjI4QVx1NUI5OFx1NjVCOVx1N0M3Qlx1NTQwRFx1NTM5Rlx1NjgzN1x1NTE5OVx1OEZEQlx1NjgzN1x1NUYwRlx1ODg2OFx1RkYwOFx1N0NCRVx1NTFDNlx1NTIzMFx1Njc4NFx1NUVGQVx1NTRDOFx1NUUwQ1x1RkYwOVx1MzAwMlxyXG4gKiBAcmV0dXJucyBcdTZDRThcdTUxNjVcdTc2ODQgc3R5bGUgXHU1MTQzXHU3RDIwXHVGRjFCXHU1Qjk4XHU2NUI5XHU2NzJBXHU2RTMyXHU2N0QzXHU3RURGXHU4QkExXHU4ODRDXHU2NUY2XHU0RTNBIHVuZGVmaW5lZFx1MzAwMlxyXG4gKi9cclxuY29uc3QgYXBwbHlTdGF0c0xpbmVDbGFtcCA9ICgpOiBIVE1MU3R5bGVFbGVtZW50IHwgdW5kZWZpbmVkID0+IHtcclxuICBjb25zdCBzZXBTcGFuID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxTcGFuRWxlbWVudD4oJ2RpdltjbGFzcyo9XCJfcm9vdFwiXSA+IHNwYW5bY2xhc3MqPVwiX3NlcFwiXScpKVxyXG4gICAgLmZpbmQoKHNwYW4pID0+IHNwYW4udGV4dENvbnRlbnQgPT09ICd8JylcclxuICBjb25zdCByb290RGl2ID0gc2VwU3Bhbj8ucGFyZW50RWxlbWVudFxyXG4gIGNvbnN0IGhhc2hDbGFzcyA9IHJvb3REaXY/LmNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pLmZpbmQoKG5hbWUpID0+IG5hbWUuZW5kc1dpdGgoJ19yb290JykpXHJcbiAgaWYgKHJvb3REaXYgPT09IHVuZGVmaW5lZCB8fCByb290RGl2ID09PSBudWxsIHx8IGhhc2hDbGFzcyA9PT0gdW5kZWZpbmVkIHx8IGdldENvbXB1dGVkU3R5bGUocm9vdERpdikudGV4dEFsaWduICE9PSAnY2VudGVyJykgcmV0dXJuIHVuZGVmaW5lZFxyXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxyXG4gIHN0eWxlLmlkID0gJ3BjLXN0YXRzLWNsYW1wJ1xyXG4gIHN0eWxlLnRleHRDb250ZW50ID0gYFxyXG5kaXZbY2xhc3M9XCIke2hhc2hDbGFzc31cIl0ge1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gIC13ZWJraXQtbGluZS1jbGFtcDogMjtcclxuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcclxuICB0ZXh0LW92ZXJmbG93OiBjbGlwO1xyXG4gIGZvbnQtc2l6ZTogMTFweDtcclxuICBsaW5lLWhlaWdodDogMS41O1xyXG4gIG1heC13aWR0aDogMTAwJTtcclxufVxyXG5gXHJcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSlcclxuICByZXR1cm4gc3R5bGVcclxufVxyXG5cclxudHlwZSBUYWJLZXkgPSAnY29tbWl0cycgfCAnb3ZlcnZpZXcnIHwgJ2V4ZWN1dGlvbicgfCAncmV2aWV3JyB8ICdub3RlcycgfCAnc2V0dGluZ3MnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZUZyYW1lUHJvcHMge1xyXG4gIC8qKiBcdTVCOThcdTY1QjkgZGV0YWlscyBcdTY5RkRcdTU5NTFcdTdFQTZcdTc2ODQgbG9jYWxlIFx1NkNFOFx1NTE2NVx1RkYwOFx1NjIxMVx1NEVFQ1x1NkNFOFx1NTE4Q1x1NzY4NCBwcm9qZWN0LWNvbnRyb2wgXHU4QkNEXHU1MTc4XHVGRjA5XHUzMDAyICovXHJcbiAgdD86IChrZXk6IHN0cmluZykgPT4gc3RyaW5nXHJcbiAgLyoqIFx1NUY1M1x1NTI0RFx1NEYxQVx1OEJERCBpZFx1RkYwOFx1NUI5OFx1NjVCOSBzZXNzaW9uIFx1NjgwN1x1NTFDNlx1NUM1RVx1NjAyN1x1RkYxQlx1NTIwN1x1NjM2Mlx1NEYxQVx1OEJERFx1NjVGNlx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1NURFNVx1NEY1Q1x1NTNGMFx1OEY2OFx1OTA1M1x1RkYwOVx1MzAwMiAqL1xyXG4gIHNlc3Npb25JZD86IHN0cmluZ1xyXG4gIC8qKiBcdTY1QjBcdTcyNDhcdTVCQkZcdTRFM0JcdTc1MzFcdTU5MTZcdTVDNDJcdTUyQTBcdTZDRDVcdTZENkVcdTVDNDJcdTdCQTFcdTc0MDZcdTVFMDNcdTVDNDBcdUZGMENcdTRFMERcdTRGN0ZcdTc1MjhcdTY1RTdcdTcyNDggZGV0YWlscyBcdTYzNjJcdTUyMTdcdTMwMDIgKi9cclxuICBsYXlvdXRNb2RlPzogJ2xlZ2FjeScgfCAnb3ZlcmxheSdcclxufVxyXG5cclxuLyoqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NjU4N1x1Njg0OFx1OEJDRFx1NTE3OFx1RkYwOHpoIC8gZW5cdUZGMDlcdTMwMDIgKi9cclxuZXhwb3J0IGNvbnN0IFdPUktTUEFDRV9ESUNUID0ge1xyXG4gIHpoOiB7XHJcbiAgICAnd29ya3NwYWNlLnRpdGxlJzogJ1x1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMCcsXHJcbiAgICAnd29ya3NwYWNlLnNlbGVjdFNlc3Npb24nOiAnXHU4QkY3XHU1MTQ4XHU1NzI4XHU1REU2XHU0RkE3XHU5MDA5XHU2MkU5XHU5ODc5XHU3NkVFXHU0RTBCXHU3Njg0XHU0RjFBXHU4QkREXHVGRjBDXHU1REU1XHU0RjVDXHU1M0YwXHU2MjREXHU0RjFBXHU2NjNFXHU3OTNBXHU4QkU1XHU5ODc5XHU3NkVFXHU3Njg0XHU2NTcwXHU2MzZFXHUzMDAyJyxcclxuICAgICd0YWIuY29tbWl0cyc6ICdcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTUnLFxyXG4gICAgJ3RhYi5vdmVydmlldyc6ICdcdTk4NzlcdTc2RUVcdTYwM0JcdTg5QzgnLFxyXG4gICAgJ3RhYi5leGVjdXRpb24nOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzJyxcclxuICAgICd0YWIucmV2aWV3JzogJ1JldmlldyBcdTk1RUVcdTk4OTgnLFxyXG4gICAgJ3RhYi5ub3Rlcyc6ICdcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzYnLFxyXG4gICAgJ3RhYi5zZXR0aW5ncyc6ICdcdThCQkVcdTdGNkUnLFxyXG4gICAgJ2Vycm9yLmxvYWQnOiAnXHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1JyxcclxuICAgICdzdGF0ZS5wcm9qZWN0JzogJ1x1NUY1M1x1NTI0RFx1OTg3OVx1NzZFRScsXHJcbiAgICAnc3RhdGUubm9Qcm9qZWN0JzogJ1x1NUMxQVx1NjcyQVx1NTIxRFx1NTlDQlx1NTMxNlx1OTg3OVx1NzZFRScsXHJcbiAgICAnc3RhdGUubm9Qcm9qZWN0SGludCc6ICdcdTcwQjlcdTUxRkJcdTMwMENcdTUyMURcdTU5Q0JcdTUzMTZcdTk4NzlcdTc2RUVcdTMwMERcdTYyNkJcdTYzQ0ZcdTRFRDNcdTVFOTNcdTdFRDNcdTY3ODRcdTMwMDFcdTYyODBcdTY3MkZcdTY4MDhcdTRFMEVcdTdCMjZcdTUzRjdcdTdEMjJcdTVGMTVcdTMwMDInLFxyXG4gICAgJ2FjdGlvbi5ib290c3RyYXAnOiAnXHU1MjFEXHU1OUNCXHU1MzE2XHU5ODc5XHU3NkVFJyxcclxuICAgICdhY3Rpb24ucmVzY2FuJzogJ1x1OTFDRFx1NjVCMFx1NTIxRFx1NTlDQlx1NTMxNiAvIFx1NjI2Qlx1NjNDRicsXHJcbiAgICAnYWN0aW9uLmFuYWx5emUnOiAnXHU1MjA2XHU2NzkwXHU1RjUzXHU1MjREXHU2NTM5XHU1MkE4JyxcclxuICAgICdhY3Rpb24ucmV2aWV3JzogJ1x1OEJDNFx1NUJBMVx1NUY1M1x1NTI0RFx1NjUzOVx1NTJBOCcsXHJcbiAgICAnYWN0aW9uLnZlcmlmeSc6ICdcdTlBOENcdTY1MzZcdTVGNTNcdTUyNERcdTY1MzlcdTUyQTgnLFxyXG4gICAgJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnOiAnXHU2NUIwXHU1RUZBXHU1M0Q4XHU2NkY0JyxcclxuICAgICdhY3Rpb24ucnVubmluZyc6ICdcdTYyNjdcdTg4NENcdTRFMkRcdTIwMjYnLFxyXG4gICAgJ2FjdGlvbi5yZWZyZXNoJzogJ1x1NTIzN1x1NjVCMCcsXHJcbiAgICAnZm9ybS5jaGFuZ2VUaXRsZSc6ICdcdTUzRDhcdTY2RjRcdTY4MDdcdTk4OTgnLFxyXG4gICAgJ2Zvcm0uY2hhbmdlRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMDhcdTkwMDlcdTU4NkJcdUZGMDknLFxyXG4gICAgJ3Jlc3VsdC5wYW5lbCc6ICdcdTY0Q0RcdTRGNUNcdTdFRDNcdTY3OUMnLFxyXG5cclxuICAgICdyZXBvLnNjYW5IaXN0b3J5JzogJ1x1OTFDRFx1NUVGQVx1NTM4Nlx1NTNGMicsXHJcbiAgICAncmVwby5jb21taXRzJzogJ1x1NjNEMFx1NEVBNCcsXHJcbiAgICAncmVwby5icmFuY2gnOiAnXHU1MjA2XHU2NTJGJyxcclxuICAgICdyZXBvLndvcmtpbmcnOiAnXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcclxuICAgICdyZXBvLndvcmtpbmdDbGVhbic6ICdcdTVERTVcdTRGNUNcdTUzM0FcdTVFNzJcdTUxQzBcdUZGMENcdTY1RTBcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQTgnLFxyXG4gICAgJ3JlcG8uZW1wdHknOiAnXHU2NjgyXHU2NUUwXHU2M0QwXHU0RUE0XHUzMDAyJyxcclxuICAgICdyZXBvLmxvYWRGYWlsZWQnOiAnXHU2M0QwXHU0RUE0XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1JyxcclxuICAgICdwaWNrZXIudGl0bGUnOiAnXHU5MDA5XHU2MkU5XHU4OTgxXHU2ODM4XHU2N0U1XHU3Njg0XHU2M0QwXHU0RUE0XHVGRjA4XHU1M0VGXHU1OTFBXHU5MDA5XHVGRjA5JyxcclxuICAgICdwaWNrZXIucGxhY2Vob2xkZXInOiAnXHU3MEI5XHU1MUZCXHU5MDA5XHU2MkU5XHU2M0QwXHU0RUE0XHVGRjA4XHU1M0VGXHU1OTFBXHU5MDA5XHVGRjBDXHU1NDJCXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4XHVGRjA5JyxcclxuICAgICdwaWNrZXIuc2VsZWN0ZWQnOiAnXHU1REYyXHU5MDA5JyxcclxuICAgICdwaWNrZXIuZmlsdGVyJzogJ1x1NjMwOVx1NjgwN1x1OTg5OC9cdTU0QzhcdTVFMEMvXHU0RjVDXHU4MDA1XHU4RkM3XHU2RUU0XHUyMDI2JyxcclxuICAgICdwaWNrZXIuY2xlYXInOiAnXHU2RTA1XHU3QTdBJyxcclxuICAgICdwaWNrZXIubm9NYXRjaCc6ICdcdTY1RTBcdTUzMzlcdTkxNERcdTYzRDBcdTRFQTRcdTMwMDInLFxyXG4gICAgJ3BpY2tlci5oaW50JzogJ1x1NTJGRVx1OTAwOVx1NjNEMFx1NEVBNFx1NTQwRVx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMCBBSSBcdTg5RTNcdThCRkJcdUZGMUJcdTRFMEJcdTY1QjlcdTUzRUZcdTUxOERcdThERDFcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdTRFMEVcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTVcdTMwMDInLFxyXG4gICAgJ3BpY2tlci5yb3VuZCc6ICdcdTdCMkMge259IFx1OEY2RScsXHJcbiAgICAncGlja2VyLnJvdW5kTGF0ZXN0JzogJ1x1N0IyQyB7bn0gXHU4RjZFXHVGRjA4XHU2NzAwXHU2NUIwXHVGRjA5JyxcclxuICAgICdwaWNrZXIucm91bmRTZWxlY3QnOiAnXHU5MDA5XHU2NTc0XHU4RjZFJyxcclxuICAgICdwaWNrZXIucm91bmRDbGVhcic6ICdcdTUzRDZcdTZEODhcdTY3MkNcdThGNkUnLFxyXG4gICAgJ3BpY2tlci51bmRpZ2VzdGVkJzogJ1x1NEUwQVx1NkIyMSBBSSBcdTYwM0JcdTdFRDNcdTRFNEJcdTU0MEVcdTMwMDFcdTRFMTRcdTVDMUFcdTY3MkFcdTc1MUZcdTYyMTBcdThGQzcgQUkgXHU4OUUzXHU4QkZCXHU3Njg0XHU2NUIwXHU2M0QwXHU0RUE0JyxcclxuICAgICdwaWNrZXIudW5kaWdlc3RlZENvdW50JzogJ3tufSBcdTRFMkFcdTYzRDBcdTRFQTRcdTY3MkFcdTZEODhcdTUzMTYnLFxyXG4gICAgJ3BpY2tlci5zZWxlY3RBbGxVbmRpZ2VzdGVkJzogJ1x1NTE2OFx1OTAwOVx1NjcyQVx1NkQ4OFx1NTMxNicsXHJcbiAgICAncGlja2VyLmRpZ2VzdEFsbCc6ICdcdTRFMDBcdTk1MkVcdTZEODhcdTUzMTYnLFxyXG4gICAgJ3BpY2tlci5kaWdlc3RBbGxIaW50JzogJ1x1OTAwOVx1NEUyRFx1NTE2OFx1OTBFOFx1NjcyQVx1NkQ4OFx1NTMxNlx1NjNEMFx1NEVBNFx1NUU3Nlx1NjI3OVx1OTFDRiBBSSBcdTg5RTNcdThCRkJcdUZGMDhcdTVFNzZcdTUzRDEgM1x1RkYwQ1x1NjcwOVx1N0YxM1x1NUI1OFx1RkYwOVx1RkYwQ1x1NUI4Q1x1NjIxMFx1NTQwRVx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1NjU3NFx1NEY1M1x1NTNEOVx1NEU4Qlx1RkYxQlx1NEU0Qlx1NTQwRVx1NTIzMFx1MzAwQ1x1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNlx1MzAwRFx1NzUxRlx1NjIxMFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1NTM3M1x1NTNFRlx1OTFDRFx1N0Y2RVx1NjcyQVx1NkQ4OFx1NTMxNlx1NjgwN1x1OEJCMCcsXHJcbiAgICAnbmFycmF0aXZlLmRpZ2VzdEhpbnQnOiAnXHU2NTc0XHU0RjUzXHU1M0Q5XHU0RThCXHU1REYyXHU3NTFGXHU2MjEwXHUzMDAyXHU1MjMwXHUzMDBDXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHUzMDBEXHU5ODc1XHU3NTFGXHU2MjEwIEFJIFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1RkYwQ1x1NTM3M1x1NTNFRlx1OTFDRFx1N0Y2RVx1MzAwQ1x1NjcyQVx1NkQ4OFx1NTMxNlx1MzAwRFx1NjgwN1x1OEJCMFx1MzAwMicsXHJcbiAgICAnaW1wYWN0LmZhY3RvcnMnOiAnXHU5OENFXHU5NjY5XHU2Nzg0XHU2MjEwXHVGRjA4XHU0RTNBXHU0RUMwXHU0RTQ4XHU2NjJGXHU4RkQ5XHU0RTJBXHU3QjQ5XHU3RUE3XHVGRjA5JyxcclxuICAgICdpbXBhY3QucG9pbnRzJzogJ1x1NUY3MVx1NTRDRFx1NzBCOVx1NjYwRVx1N0VDNicsXHJcbiAgICAnaW1wYWN0LmtleVBvaW50cyc6ICdcdTUxNzNcdTk1MkVcdTdFQzRcdTRFRjYnLFxyXG4gICAgJ2ltcGFjdC5tZW1vcnknOiAnXHU3RUQzXHU1NDA4XHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHU2ODM4XHU2N0U1JyxcclxuICAgICdpbXBhY3QuZnVuY3Rpb25zJzogJ1x1NTNEN1x1NUY3MVx1NTRDRFx1NTFGRFx1NjU3MFx1RkYwOFx1OEMwMVx1OEMwM1x1NzUyOFx1NEU4Nlx1ODhBQlx1NjUzOVx1NzY4NFx1NEVFM1x1NzgwMVx1RkYwOScsXHJcbiAgICAnaW1wYWN0LmZ1bmNSb2xlJzogJ1x1NTFGRFx1NjU3MFx1NTI5Rlx1ODBGRCcsXHJcbiAgICAnaW1wYWN0LmZ1bmNDaGFuZ2UnOiAnXHU2NzJDXHU2QjIxXHU1M0Q4XHU1MzE2JyxcclxuICAgICdpbXBhY3QuZnVuY0NhbGxlcnMnOiAnXHU1QkY5XHU4QzAzXHU3NTI4XHU2NUI5XHU3Njg0XHU1RjcxXHU1NENEJyxcclxuICAgICdjYWNoZS5oaXQnOiAnXHU2NzY1XHU4MUVBXHU3RjEzXHU1QjU4JyxcclxuICAgICdjYWNoZS5yZWdlbmVyYXRlJzogJ1x1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMCcsXHJcbiAgICAnY29zdC50b29sdGlwJzogJ1x1NjcyQ1x1NkIyMSBBSSBcdThDMDNcdTc1MjhcdTYyMTBcdTY3MkNcdUZGMDhcdTRGMzBcdTdCOTdcdUZGMENcdTYzMDkgRGVlcFNlZWsgXHU0RUY3XHU3NkVFXHU2Mjk4XHU3Qjk3XHVGRjA5JyxcclxuICAgICdleGVjLmNyZWF0ZSc6ICdcdTY1QjBcdTVFRkFcdTYyNjdcdTg4NEMnLFxyXG4gICAgJ2V4ZWMuZm9ybVRpdGxlJzogJ1x1ODk4MVx1NTA1QVx1NEVDMFx1NEU0OFx1RkYwOFx1NEUwMFx1NTNFNVx1OEJERFx1RkYwOScsXHJcbiAgICAnZXhlYy5mb3JtRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMUFcdTc2RUVcdTY4MDdcdTMwMDFcdTZEODlcdTUzQ0FcdTZBMjFcdTU3NTdcdTMwMDFcdTlBOENcdTY1MzZcdTY4MDdcdTUxQzYnLFxyXG4gICAgJ2V4ZWMuc3RhcnQnOiAnXHU1RjAwXHU1OUNCXHU2MjY3XHU4ODRDJyxcclxuICAgICdleGVjLnN0YXJ0aW5nJzogJ1x1NkI2M1x1NTcyOFx1NTQyRlx1NTJBOFx1MjAyNicsXHJcbiAgICAnZXhlYy5jcmVhdGVIaW50JzogJ1x1NTIxQlx1NUVGQVx1NTNEOFx1NjZGNFx1NUU3Nlx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1OEJBMVx1NTIxMlx1RkYwQ1x1OTY4Rlx1NTQwRVx1NzUzMSBBSSBcdTVCNTBcdTRFRTNcdTc0MDZcdTkwMTBcdTZCNjVcdTYyNjdcdTg4NENcdUZGMUJcdThGREJcdTVFQTZcdTU3MjhcdTRFMEJcdTY1QjlcdTVCOUVcdTY1RjZcdTUyMzdcdTY1QjBcdUZGMENcdTY1RTBcdTk3MDBcdTUzQkJcdTgwNEFcdTU5MjlcdTMwMDInLFxyXG4gICAgJ2V4ZWMubW9kZWxEZWZhdWx0JzogJ1x1NjI2N1x1ODg0Q1x1NkEyMVx1NTc4Qlx1RkYwOFx1ODlEMlx1ODI3Mlx1OUVEOFx1OEJBNFx1RkYxQVx1NTIwNlx1Njc5MC9cdTY0Q0RcdTRGNUM9XHU1RkVCXHVGRjBDXHU1RjAwXHU1M0QxPVx1NjgwN1x1NTFDNlx1RkYwQ1x1ODlDNFx1NTIxMj1cdTYzQThcdTc0MDZcdUZGMENcdTlBOENcdTY1MzY9XHU5QThDXHU2NTM2XHU3RUE3XHVGRjA5JyxcclxuICAgICdiYWRnZS5ydW5uaW5nJzogJ3tufSBcdTRFMkFcdTRFRkJcdTUyQTFcdThGRDBcdTg4NENcdTRFMkRcdUZGMENcdTcwQjlcdTUxRkJcdTY3RTVcdTc3MEInLFxyXG4gICAgJ25hcnJhdGl2ZS50aXRsZSc6ICdcdTVERTVcdTRGNUNcdThGNkVcdTZCMjFcdTUzRDlcdTRFOEInLFxyXG4gICAgJ25hcnJhdGl2ZS5nZW5lcmF0ZSc6ICdcdTY1NzRcdTRGNTNcdTg5RTNcdThCRkJcdThGRDlcdThGNkVcdTVERTVcdTRGNUMnLFxyXG4gICAgJ25hcnJhdGl2ZS5ydW5uaW5nJzogJ1x1ODlFM1x1OEJGQlx1NzUxRlx1NjIxMFx1NEUyRFx1MjAyNlx1RkYwOFx1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxyXG4gICAgJ2JhZGdlLmZhaWxlZCc6ICd7bn0gXHU0RTJBXHU0RUZCXHU1MkExXHU5NzAwXHU4OTgxXHU1OTA0XHU3NDA2XHVGRjBDXHU3MEI5XHU1MUZCXHU2N0U1XHU3NzBCJyxcclxuICAgICdleGVjLmZsb3dDcmVhdGUnOiAnXHU1ODZCXHU1MTk5XHU0RUZCXHU1MkExJyxcclxuICAgICdleGVjLmZsb3dPcmNoZXN0cmF0ZSc6ICdcdTc4NkVcdThCQTRcdTdGMTZcdTYzOTJcdUZGMDhcdTZCQ0ZcdTZCNjVcdTUzRUZcdTY1MzlcdTZBMjFcdTU3OEIvXHU4OUQyXHU4MjcyL1x1NTkzMVx1OEQyNVx1N0I1Nlx1NzU2NVx1RkYwOScsXHJcbiAgICAnZXhlYy5mbG93UnVuJzogJ1x1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYwOFJ1biBcdThCRTZcdTYwQzVcdTc3MEJcdThGREJcdTVFQTZcdTRFMEVcdTYyMTBcdTY3MkNcdUZGMDknLFxyXG4gICAgJ2V4ZWMuZmxvd01lbW9yeSc6ICdcdTgxRUFcdTUyQThcdTYzRDBcdTcwQkNcdThCQjBcdTVGQzZcdUZGMDhcdThCQjBcdTVGQzZcdTk3NjJcdTY3N0ZcdTc4NkVcdThCQTRcdUZGMDknLFxyXG4gICAgJ2V4ZWMucGxhbm5pbmcnOiAnXHU3RjE2XHU2MzkyXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4TExNIFx1NkI2M1x1NTcyOFx1NjJDNlx1ODlFM1x1NEVGQlx1NTJBMVx1RkYwQ1x1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxyXG4gICAgJ2V4ZWMuY29sLnN0ZXBzJzogJ1x1NkI2NVx1OUFBNCcsXHJcbiAgICAnbm90ZXMuZWRpdCc6ICdcdTdGMTZcdThGOTEnLFxyXG4gICAgJ25vdGVzLnRvTWVtb3J5JzogJ1x1OEY2Q1x1OEJCMFx1NUZDNicsXHJcbiAgICAnbm90ZXMudG9NZW1vcnlIaW50JzogJ1x1NjI4QVx1OEZEOVx1Njc2MVx1N0IxNFx1OEJCMFx1NzY4NFx1NjgwN1x1OTg5OFx1NEUwRVx1NTE4NVx1NUJCOVx1NTg2Qlx1NTE2NVx1NEUwQlx1NjVCOVx1OEJCMFx1NUZDNlx1ODg2OFx1NTM1NVx1RkYwQ1x1Nzg2RVx1OEJBNFx1NTQwRVx1NTE2NVx1NUU5MycsXHJcbiAgICAnbm90ZXMudG9NZW1vcnlEb25lJzogJ1x1MjcxMyBcdTVERjJcdTU4NkJcdTUxNjVcdThCQjBcdTVGQzZcdTg4NjhcdTUzNTVcdUZGMDhcdTU3MjhcdTRFMEJcdTY1QjlcdTMwMENcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdTMwMERcdTUzM0FcdTc4NkVcdThCQTRcdTdDN0JcdTU3OEJcdTU0MEVcdTZERkJcdTUyQTBcdUZGMDknLFxyXG4gICAgJ25vdGVzLmNvcHlNZCc6ICdcdTU5MERcdTUyMzYgTUQnLFxyXG4gICAgJ25vdGVzLmNvcHlNZEhpbnQnOiAnXHU2MjhBXHU4RkQ5XHU2NzYxXHU3QjE0XHU4QkIwXHU1OTBEXHU1MjM2XHU0RTNBIE1hcmtkb3duIFx1NTIzMFx1NTI2QVx1OEQzNFx1Njc3RicsXHJcbiAgICAnbm90ZXMuY29weU1kRG9uZSc6ICdcdTVERjJcdTU5MERcdTUyMzZcdTRFM0EgTWFya2Rvd24nLFxyXG4gICAgJ25vdGVzLmV4cG9ydE1kJzogJ1x1NUJGQ1x1NTFGQSBNRCcsXHJcbiAgICAnbm90ZXMuZXhwb3J0TWRIaW50JzogJ1x1NEUwQlx1OEY3RFx1NEUzQSAubWQgXHU2NTg3XHU0RUY2JyxcclxuICAgICdub3Rlcy5leHBvcnREb25lJzogJ1x1NURGMlx1NUJGQ1x1NTFGQVx1NEUzQSAubWQgXHU2NTg3XHU0RUY2JyxcclxuICAgICdub3Rlcy5kaWdlc3ROZXZlcic6ICdcdTVDMUFcdTY3MkFcdTc1MUZcdTYyMTBcdThGQzcgQUkgXHU2MDNCXHU3RUQzJyxcclxuICAgICdub3Rlcy5kaWdlc3RQZW5kaW5nJzogJ1x1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NTQwRVx1NjcwOSB7bn0gXHU0RTJBXHU2NUIwXHU2M0QwXHU0RUE0XHU2NzJBXHU2RDg4XHU1MzE2JyxcclxuICAgICdkZXRhaWwuc2F2ZU5vdGUnOiAnXHU1QjU4XHU0RTNBXHU3QjE0XHU4QkIwJyxcclxuICAgICdkZXRhaWwuc2F2ZU5vdGVIaW50JzogJ1x1NjI4QVx1NjcyQ1x1NkIyMVx1NjgzOFx1NjdFNVx1N0VEM1x1OEJCQVx1RkYwOFx1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OC9cdTVCOUVcdTczQjBcdTkwM0JcdThGOTEvXHU5OENFXHU5NjY5XHU3MEI5XHVGRjA5XHU0RTAwXHU5NTJFXHU1QjU4XHU0RTNBXHU3RUQzXHU2Nzg0XHU1MzE2XHU3QjE0XHU4QkIwJyxcclxuICAgICdkZXRhaWwuc2F2ZU5vdGVUaXRsZSc6ICdcdTY4MzhcdTY3RTVcdThCQjBcdTVGNTUnLFxyXG4gICAgJ2RldGFpbC5zYXZlTWVtb3J5JzogJ1x1NkM4OVx1NkRDMFx1NEUzQVx1OEJCMFx1NUZDNicsXHJcbiAgICAnZGV0YWlsLnNhdmVNZW1vcnlIaW50JzogJ1x1NjI4QVx1NjcyQ1x1NkIyMVx1NjgzOFx1NjdFNVx1N0VEM1x1OEJCQVx1NkM4OVx1NkRDMFx1NEUzQVx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNlx1RkYwOFx1OEZEQlx1NTE2NVx1NUY4NVx1Nzg2RVx1OEJBNFx1OTYxRlx1NTIxN1x1RkYwOScsXHJcbiAgICAnbm90ZXMuc2F2ZSc6ICdcdTRGRERcdTVCNTgnLFxyXG4gICAgJ25vdGVzLmNhbmNlbCc6ICdcdTUzRDZcdTZEODgnLFxyXG4gICAgJ21lbW9yeS5icmFuY2hTY29wZSc6ICdcdTUyMDZcdTY1MkYnLFxyXG4gICAgJ21lbW9yeS5icmFuY2hBbGwnOiAnXHU1MTY4XHU5MEU4XHU1MjA2XHU2NTJGJyxcclxuICAgICdub3Rlcy5zZWFyY2gnOiAnXHU2NDFDXHU3RDIyXHU3QjE0XHU4QkIwXHUyMDI2JyxcclxuICAgICdtb2RlbC50aXRsZSc6ICdcdTZBMjFcdTU3OEJcdTUyMDZcdTkxNERcdUZGMDhcdTg5RTNcdThCRkIgLyBcdTYwM0JcdTdFRDNcdTdCNDlcdTRFRkJcdTUyQTFcdTc1MjhcdTU0RUFcdTRFMkFcdTZBMjFcdTU3OEJcdUZGMDknLFxyXG4gICAgJ21vZGVsLmxvYWRpbmcnOiAnXHU4QkZCXHU1M0Q2XHU2QTIxXHU1NzhCXHU2RTA1XHU1MzU1XHUyMDI2JyxcclxuICAgICdtb2RlbC5mb2xsb3dDaGF0JzogJ1x1OERERlx1OTY4Rlx1ODA0QVx1NTkyOVx1NkEyMVx1NTc4QicsXHJcbiAgICAnbW9kZWwuc2F2ZSc6ICdcdTRGRERcdTVCNThcdTVFNzZcdTc1MUZcdTY1NDgnLFxyXG4gICAgJ21vZGVsLnNhdmVkJzogJ1x1NURGMlx1NzUxRlx1NjU0OCcsXHJcbiAgICAnbW9kZWwuaGludCc6ICdcdTRGRERcdTVCNThcdTU0MEVcdTdBQ0JcdTUzNzNcdTc1MUZcdTY1NDhcdTVFNzZcdTYzMDFcdTRFNDVcdTUzMTZcdUZGMDhcdTkxQ0RcdTU0MkZcdTU0MEVcdTRGRERcdTc1NTlcdUZGMDlcdUZGMUJcdTRFMERcdTVGNzFcdTU0Q0RcdTgwNEFcdTU5MjlcdTZBMjFcdTU3OEJcdTMwMDInLFxyXG4gICAgJ25vdGVzLmFpU3VtbWFyeSc6ICdBSSBcdTYwM0JcdTdFRDNcdTdCMTRcdThCQjAnLFxyXG4gICAgJ25vdGVzLmFpU3VtbWFyeVJ1bic6ICdcdTYwM0JcdTdFRDNcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhcdTdFQTYgMTAtMzAgXHU3OUQyXHVGRjA5JyxcclxuICAgICdub3Rlcy5leHBhbmQnOiAnXHU1QzU1XHU1RjAwXHU1MTY4XHU2NTg3JyxcclxuICAgICdub3Rlcy5jb2xsYXBzZSc6ICdcdTY1MzZcdThENzcnLFxyXG4gICAgJ25vdGVzLnN1bW1hcnlUYWcnOiAnQUkgXHU2MDNCXHU3RUQzJyxcclxuICAgICdub3Rlcy5lbXB0eVNlYXJjaCc6ICdcdTY1RTBcdTUzMzlcdTkxNERcdTdCMTRcdThCQjBcdTMwMDInLFxyXG4gICAgJ25vdGVzLmNvbnRlbnRIaW50JzogJ1x1N0IxNFx1OEJCMFx1NTE4NVx1NUJCOVx1RkYwOFx1NjUyRlx1NjMwMVx1NTkxQVx1ODg0Q1x1RkYwOVx1RkYxQVx1N0VEM1x1OEJCQVx1MzAwMVx1NzU5MVx1OTVFRVx1MzAwMVx1NUI2Nlx1NEU2MFx1ODk4MVx1NzBCOVx1MzAwMVx1NTE3M1x1OTUyRVx1NTFCM1x1N0I1Nlx1MjAyNicsXHJcbiAgICAnbm90ZXMudGFnc0hpbnQnOiAnXHU2ODA3XHU3QjdFXHVGRjA4XHU5MDE3XHU1M0Y3XHU1MjA2XHU5Njk0XHVGRjBDXHU5MDA5XHU1ODZCXHVGRjFCXHU0RkREXHU1QjU4XHU1NDBFXHU1M0VGXHU3MEI5XHU1MUZCXHU3QjVCXHU5MDA5XHVGRjA5JyxcclxuICAgICdub3Rlcy5waW4nOiAnXHU3RjZFXHU5ODc2JyxcclxuICAgICdub3Rlcy51bnBpbic6ICdcdTUzRDZcdTZEODhcdTdGNkVcdTk4NzYnLFxyXG4gICAgJ25vdGVzLmVkaXRlZEF0JzogJ1x1N0YxNlx1OEY5MVx1NEU4RScsXHJcbiAgICAncmV2aWV3LmZpbHRlckFsbCc6ICdcdTUxNjhcdTkwRTgnLFxyXG4gICAgJ3Jldmlldy5zdGF0dXNBbGwnOiAnXHU1MTY4XHU5MEU4XHU3MkI2XHU2MDAxJyxcclxuICAgICdyZXZpZXcudmVyaWZ5JzogJ1x1NTkwRFx1NjhDMCcsXHJcbiAgICAncmV2aWV3LnZlcmlmeVJ1bm5pbmcnOiAnXHU1OTBEXHU2OEMwXHU0RTJEXHUyMDI2JyxcclxuICAgICdyZXZpZXcudmVyaWZ5SGludCc6ICdcdTRGRUVcdTY1MzlcdTRFRTNcdTc4MDFcdTU0MEVcdTcwQjlcdTUxRkJcdUZGMUFcdTgxRUFcdTUyQThcdTY4QzBcdTZENEJcdTk1RUVcdTk4OThcdTY2MkZcdTU0MjZcdTRGRUVcdTU5MERcdTMwMDFcdTY1MzlcdTUyQThcdTY2MkZcdTU0MjZcdTY3MDBcdTRGMTgvXHU2NzAwXHU1QzBGXHU0RkI1XHU1MTY1XHUzMDAxXHU2NzA5XHU2NUUwXHU2NUIwXHU5NUVFXHU5ODk4XHVGRjFCXHU1MTY4XHU5MEU4XHU5MDFBXHU4RkM3XHU2MjREXHU4MUVBXHU1MkE4XHU3RjZFXHU0RTNBXHU1REYyXHU4OUUzXHU1MUIzJyxcclxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZSc6ICdcdTUyMjRcdTVCOUFcdThCRUZcdTYyQTUnLFxyXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlSGludCc6ICdcdTRFQkFcdTVERTVcdTUyMjRcdTVCOUFcdThCRTVcdTk1RUVcdTk4OThcdTRFM0FcdThCRUZcdTYyQTVcdTVFNzZcdTUxNzNcdTk1RURcdUZGMDhcdTRFMEVcdTU5MERcdTY4QzBcdTg5RTNcdTUxQjNcdTc2ODRcdThCRURcdTRFNDlcdTRFMERcdTU0MENcdUZGMDknLFxyXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlVGl0bGUnOiAnXHU1MjI0XHU1QjlBXHU0RTNBXHU4QkVGXHU2MkE1XHVGRjFGJyxcclxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZU1zZyc6ICdcdTMwMEN7dGl0bGV9XHUzMDBEXHU1QzA2XHU4OEFCXHU2ODA3XHU4QkIwXHU0RTNBXHU4QkVGXHU2MkE1XHVGRjA4XHU1REYyXHU2MkQyXHU3RUREXHVGRjA5XHU1RTc2XHU0RUNFXHU1Rjg1XHU1OTA0XHU3NDA2XHU0RTJEXHU3OUZCXHU5NjY0XHUzMDAyJyxcclxuICAgICdyZXZpZXcuZml4RGV0YWlsJzogJ1x1NEZFRVx1NTkwRFx1OEJFNlx1NjBDNScsXHJcbiAgICAncmV2aWV3LmZpeFN0YXRGaWxlcyc6ICdcdTY1ODdcdTRFRjYnLFxyXG4gICAgJ3Jldmlldy5maXhGaWxlcyc6ICdcdTRGRUVcdTU5MERcdTZEODlcdTUzQ0FcdTY1ODdcdTRFRjYnLFxyXG4gICAgJ3Jldmlldy5maXhJbXBhY3QnOiAnXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHVGRjA4XHU2NTM5XHU1MkE4XHU3QjI2XHU1M0Y3XHU0RTBFXHU4QzAzXHU3NTI4XHU3MEI5XHVGRjA5JyxcclxuICAgICdyZXZpZXcuZGVmaW5lZEluJzogJ1x1NUI5QVx1NEU0OVx1NEU4RScsXHJcbiAgICAncmV2aWV3LmNhbGxDb3VudCc6ICdcdTU5MDRcdThDMDNcdTc1MjgnLFxyXG4gICAgJ3Jldmlldy5maXhEaWZmJzogJ1x1NEZFRVx1NTkwRFx1NURFRVx1NUYwMlx1RkYwOFx1NzZGOFx1NUJGOVx1OEJDNFx1NUJBMVx1NTdGQVx1N0VCRlx1RkYwOScsXHJcbiAgICAncmV2aWV3LnJlZnJlc2gnOiAnXHU1MjM3XHU2NUIwJyxcclxuICAgICdyZXZpZXcucmV0ZW50aW9uSGludCc6ICdcdTVERjJcdTg5RTNcdTUxQjMvXHU4QkVGXHU2MkE1XHU5NUVFXHU5ODk4XHU0RkREXHU3NTU5IHtkYXlzfSBcdTU5MjlcdTU0MEVcdTgxRUFcdTUyQThcdTZFMDVcdTc0MDYnLFxyXG4gICAgJ3Jldmlldy50YXJnZXQnOiAnXHU1QkY5XHU4QzYxJyxcclxuICAgICdyZXZpZXcud29ya2luZ1RhcmdldCc6ICdcdTVERTVcdTRGNUNcdTUzM0EnLFxyXG4gICAgJ3Jldmlldy5leHBvcnRNZCc6ICdcdTVCRkNcdTUxRkEgTUQnLFxyXG4gICAgJ3Jldmlldy5leHBvcnRNZEhpbnQnOiAnXHU2MjhBXHU1RjUzXHU1MjREXHU3QjVCXHU5MDA5XHU0RTBCXHU3Njg0XHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHU0RTBCXHU4RjdEXHU0RTNBIC5tZCBcdTY1ODdcdTRFRjYnLFxyXG4gICAgJ3Jldmlldy5leHBvcnRFbXB0eSc6ICdcdTZDQTFcdTY3MDlcdTUzRUZcdTVCRkNcdTUxRkFcdTc2ODRcdTk1RUVcdTk4OTgnLFxyXG4gICAgJ3Jldmlldy5zZWxlY3RBbGwnOiAnXHU1MTY4XHU5MDA5JyxcclxuICAgICdyZXZpZXcuY2hlY2tlZENvdW50JzogJ1x1NURGMlx1OTAwOSB7bn0gXHU2NzYxJyxcclxuICAgICdyZXZpZXcubWFya0hhbmRsZWQnOiAnXHU2ODA3XHU4QkIwXHU1REYyXHU1OTA0XHU3NDA2JyxcclxuICAgICdyZXZpZXcuYmF0Y2hWZXJpZnknOiAnXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwJyxcclxuICAgICdyZXZpZXcuYmF0Y2hWZXJpZnlDb25maXJtVGl0bGUnOiAnXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwXHVGRjFGJyxcclxuICAgICdyZXZpZXcuYmF0Y2hWZXJpZnlDb25maXJtTXNnJzogJ1x1NUMwNlx1NUJGOSB7bn0gXHU0RTJBXHU4QkM0XHU1QkExXHU3NkVFXHU2ODA3XHU5MDEwXHU0RTAwXHU1OTBEXHU2OEMwXHVGRjA4XHU0RTMyXHU4ODRDIExMTSBcdThDMDNcdTc1MjhcdUZGMENcdTZCQ0ZcdTRFMkFcdTc2RUVcdTY4MDdcdTdFQTYgMTAtNjAgXHU3OUQyXHVGRjBDXHU0RjFBXHU2RDg4XHU4MDE3XHU2QTIxXHU1NzhCXHU3NTI4XHU5MUNGXHVGRjA5XHVGRjFCXHU1M0VGXHU5NjhGXHU2NUY2XHU1MDVDXHU2QjYyXHUzMDAyJyxcclxuICAgICdyZXZpZXcuYmF0Y2hTdG9wJzogJ1x1NTA1Q1x1NkI2MicsXHJcbiAgICAncmV2aWV3LmJhdGNoUHJvZ3Jlc3MnOiAnXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwXHU0RTJEIHtpfS97bn0nLFxyXG4gICAgJ3Jldmlldy5iYXRjaERvbmUnOiAnXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwXHU1QjhDXHU2MjEwXHVGRjFBXHU4OUUzXHU1MUIzIHthfSBcdTY3NjEgXHUwMEI3IFx1NEVDRFx1NUY4NVx1NTkwNFx1NzQwNiB7Yn0gXHU2NzYxIFx1MDBCNyBcdTY1QjBcdTk1RUVcdTk4OTgge2N9IFx1Njc2MSBcdTAwQjcgXHU1OTMxXHU4RDI1IHtkfSBcdTRFMkFcdTc2RUVcdTY4MDcnLFxyXG4gICAgJ3Jldmlldy5iYXRjaFN0b3BwZWQnOiAnXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwXHU1REYyXHU1MDVDXHU2QjYyJyxcclxuICAgICdyZXZpZXcudHJpYWdlJzogJ1x1RDgzRVx1RERGOSBcdTY1NzRcdTRGNTNcdTUyMDZcdThCQ0EnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VIaW50JzogJ0xMTSBcdTY1NzRcdTRGNTNcdTYyNkJcdTYzQ0ZcdTUxNjhcdTkwRThcdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdUZGMUFcdTUyMjRcdTkxQ0RcdTU5MEQvXHU4RkM3XHU2NUY2L1x1NEUwRFx1NjIxMFx1N0FDQlx1NTM3M1x1NjVGNlx1NTE3M1x1OTVFRFx1RkYwOFx1NUUyNlx1NEY5RFx1NjM2RVx1RkYwQ1x1NTNFRlx1NEVCQVx1NURFNVx1OTFDRFx1NUYwMFx1NTkwRFx1NjgzOFx1RkYwOVx1RkYwQ1x1NzcxRlx1OTVFRVx1OTg5OFx1NzU1OVx1NEUwQlx1NTE4RFx1NkQzRVx1NTNEMVx1NEZFRVx1NTkwRCcsXHJcbiAgICAncmV2aWV3LnRyaWFnZUNvbmZpcm1UaXRsZSc6ICdcdTY1NzRcdTRGNTNcdTUyMDZcdThCQ0FcdUZGMUYnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VDb25maXJtTXNnJzogJ1x1NUMwNlx1NzUyOCBMTE0gXHU1MjA2XHU2Mjc5XHU2MjZCXHU2M0NGXHU1MTY4XHU5MEU4XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHVGRjA4XHU2QkNGXHU2Mjc5XHU2NzAwXHU1OTFBIHtufSBcdTY3NjFcdUZGMENcdTZEODhcdTgwMTdcdTZBMjFcdTU3OEJcdTc1MjhcdTkxQ0ZcdUZGMDlcdTMwMDJcdTUyMjRcdTRFM0FcdTkxQ0RcdTU5MEQvXHU4RkM3XHU2NUY2L1x1NEUwRFx1NjIxMFx1N0FDQlx1NzY4NFx1OTVFRVx1OTg5OFx1NEYxQVx1MzAxMFx1N0FDQlx1NTM3M1x1NTE3M1x1OTVFRFx1MzAxMVx1NUU3Nlx1NkNFOFx1NjYwRVx1NEY5RFx1NjM2RVx1MjAxNFx1MjAxNFx1NTE2OFx1OTBFOFx1NTNFRlx1NTcyOFx1OTVFRVx1OTg5OFx1NTM2MVx1NTkwRFx1NjgzOFx1OTFDRFx1NUYwMFx1MzAwMlx1NzU1OVx1NEUwQlx1NzY4NFx1NzcxRlx1OTVFRVx1OTg5OFx1NTE4RFx1OEQ3MFx1NkQzRVx1NTNEMVx1NEZFRVx1NTkwRFx1MzAwMicsXHJcbiAgICAncmV2aWV3LnRyaWFnZVByb2dyZXNzJzogJ1x1NTIwNlx1OEJDQVx1NEUyRFx1RkYxQVx1NURGMlx1NTkwNFx1NzQwNiB7bn0gXHU2NzYxXHVGRjBDXHU1MjY5XHU0RjU5XHU3RUE2IHttfSBcdTY3NjEnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VTdG9wJzogJ1x1NTA1Q1x1NkI2MicsXHJcbiAgICAncmV2aWV3LnRyaWFnZURvbmUnOiAnXHU1MjA2XHU4QkNBXHU1QjhDXHU2MjEwXHVGRjFBXHU1MTczXHU5NUVEIFx1OTFDRFx1NTkwRCB7YX0gXHUwMEI3IFx1OEZDN1x1NjVGNiB7Yn0gXHUwMEI3IFx1NEUwRFx1NUI1OFx1NTcyOCB7Y31cdUZGMUJcdTRGRERcdTc1NTkge2R9IFx1Njc2MVx1NUY4NVx1NTkwNFx1NzQwNicsXHJcbiAgICAncmV2aWV3LnRyaWFnZVN0b3BwZWQnOiAnXHU1MjA2XHU4QkNBXHU1REYyXHU1MDVDXHU2QjYyXHVGRjA4XHU1REYyXHU1MjI0XHU1QjlBXHU3Njg0XHU0RTBEXHU0RjFBXHU5MUNEXHU1OTBEXHU2RDg4XHU4MDE3XHVGRjBDXHU1M0VGXHU1MThEXHU2QjIxXHU3MEI5XHU1MUZCXHU3RUU3XHU3RUVEXHVGRjA5JyxcclxuICAgICdyZXZpZXcudHJpYWdlTm90aGluZyc6ICdcdTVGNTNcdTUyNERcdTRGMUFcdThCRERcdTVCOUFcdTRGNERcdTUyMzBcdTc2ODRcdTk4NzlcdTc2RUVcdTZDQTFcdTY3MDlcdTVGODVcdTUyMDZcdThCQ0FcdTc2ODRcdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdUZGMDhcdTgyRTVcdTRFMEVcdTUyMTdcdTg4NjhcdTRFMERcdTdCMjZcdUZGMENcdThCRjdcdTc4NkVcdThCQTRcdTVERTZcdTRGQTdcdTYyNTNcdTVGMDBcdTc2ODRcdTRGMUFcdThCRERcdTVDNUVcdTRFOEVcdThCRTVcdTk4NzlcdTc2RUVcdUZGMDknLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VQYXJzZUZhaWwnOiAnXHVGRjFCXHU2NzA5XHU0RTAwXHU2Mjc5XHU4RjkzXHU1MUZBXHU4OUUzXHU2NzkwXHU1OTMxXHU4RDI1XHU1REYyXHU2MzA5XHU0RkREXHU3NTU5XHU1OTA0XHU3NDA2XHVGRjBDXHU1M0VGXHU5MUNEXHU4QkQ1JyxcclxuICAgICdyZXZpZXcucHVyZ2VPcGVuJzogJ1x1RDgzRFx1REREMSBcdTZFMDVcdTdBN0FcdTY3MkFcdTg5RTNcdTUxQjMnLFxyXG4gICAgJ3Jldmlldy5wdXJnZU9wZW5IaW50JzogJ1x1NjI4QVx1NUY1M1x1NTI0RFx1N0I1Qlx1OTAwOVx1NEUwQlx1NTE2OFx1OTBFOFx1NjcyQVx1ODlFM1x1NTFCM1x1OTVFRVx1OTg5OFx1NEUwMFx1OTUyRVx1N0Y2RVx1NEUzQVx1NURGMlx1NTkwNFx1NzQwNlx1RkYwOFx1NEUwRFx1NEZFRVx1NEVGQlx1NEY1NVx1NEVFM1x1NzgwMVx1RkYwOVx1RkYxQlx1NEZERFx1NzU1OVx1NjcxRlx1NTQwRVx1ODFFQVx1NTJBOFx1NzI2OVx1NzQwNlx1NkUwNVx1NzQwNicsXHJcbiAgICAncmV2aWV3LnB1cmdlT3BlbkNvbmZpcm1UaXRsZSc6ICdcdTZFMDVcdTdBN0FcdTUxNjhcdTkwRThcdTY3MkFcdTg5RTNcdTUxQjNcdTk1RUVcdTk4OThcdUZGMUYnLFxyXG4gICAgJ3Jldmlldy5wdXJnZU9wZW5Db25maXJtTXNnJzogJ1x1NUMwNlx1NjI4QSB7bn0gXHU2NzYxXHU2NzJBXHU4OUUzXHU1MUIzXHU5NUVFXHU5ODk4XHU1MTY4XHU5MEU4XHU3RjZFXHU0RTNBXHUzMDBDXHU1REYyXHU1OTA0XHU3NDA2XHUzMDBEXHUyMDE0XHUyMDE0XHU0RTBEXHU0RjFBXHU0RkVFXHU2NTM5XHU0RUZCXHU0RjU1XHU0RUUzXHU3ODAxXHVGRjBDXHU0RUM1XHU1MTczXHU5NUVEXHU2RTA1XHU1MzU1XHU2NzYxXHU3NkVFXHUzMDAyXHU1REYyXHU4OUUzXHU1MUIzL1x1NURGMlx1NjJEMlx1N0VERFx1NzY4NFx1OTVFRVx1OTg5OFx1NEUwRFx1NTNEN1x1NUY3MVx1NTRDRFx1MzAwMlx1NkI2NFx1NjRDRFx1NEY1Q1x1NEUwRFx1NTNFRlx1NEUwMFx1OTUyRVx1NjRBNFx1OTUwMFx1RkYwQ1x1NEY0Nlx1NkJDRlx1Njc2MVx1NTNFRlx1NTM1NVx1NzJFQ1x1NTcyOFx1NTM2MVx1NzI0N1x1OTFDQ1x1NjUzOVx1NTZERVx1MzAwQ1x1NUY4NVx1NTkwNFx1NzQwNlx1MzAwRFx1MzAwMicsXHJcbiAgICAncmV2aWV3LnB1cmdlT3BlbkRvbmUnOiAnXHU1REYyXHU2RTA1XHU3QTdBIHtufSBcdTY3NjFcdTY3MkFcdTg5RTNcdTUxQjNcdTk1RUVcdTk4OThcdUZGMDhcdTdGNkVcdTRFM0FcdTVERjJcdTU5MDRcdTc0MDZcdUZGMDknLFxyXG4gICAgJ3Jldmlldy5oYW5kbGVkRG9uZSc6ICdcdTVERjJcdTYyOEEge259IFx1Njc2MVx1OTVFRVx1OTg5OFx1NjgwN1x1OEJCMFx1NEUzQVx1NURGMlx1NTkwNFx1NzQwNicsXHJcbiAgICAnZml4LnBsYW4nOiAnXHU0RkVFXHU1OTBEXHU2NUI5XHU2ODQ4JyxcclxuICAgICdmaXgucGxhbkFwcHJvYWNoJzogJ1x1NjVCOVx1Njg0OCcsXHJcbiAgICAnZml4LnBsYW5JbXBhY3QnOiAnXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0JyxcclxuICAgICdmaXgucGxhbkJlbmVmaXQnOiAnXHU2NTM2XHU3NkNBJyxcclxuICAgICdmaXgucGxhblJpc2snOiAnXHU5OENFXHU5NjY5JyxcclxuICAgICdmaXguZGlzcGF0Y2gnOiAnXHU2RDNFXHU1M0QxXHU0RkVFXHU1OTBEJyxcclxuICAgICdmaXguZGlzcGF0Y2hIaW50TWFpbic6ICdcdTYyOEFcdTUyRkVcdTkwMDlcdTc2ODRcdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdUZGMDhcdTY3MkFcdTUyRkVcdTkwMDk9XHU1RjUzXHU1MjREXHU3QjVCXHU5MDA5XHU0RTBCXHU1MTY4XHU5MEU4XHVGRjA5XHU2RDNFXHU1M0QxXHU3RUQ5XHU1QjUwIEFnZW50IFx1NUU3Nlx1NTNEMVx1NTkwNFx1NzQwNlx1RkYxQVx1NzZGNFx1NjNBNVx1NEZFRVx1NTkwRD1cdTRFMDlcdTkwNTNcdTk1RjhcdTUyMjRcdTVCOUErXHU0RkVFXHU1OTBEK1x1NTZERVx1NTE5OStcdTYzRDBcdTRFQTRcdTUxNjhcdTgxRUFcdTUyQThcdUZGMUJcdTUxNDhcdTUxRkFcdTY1QjlcdTY4NDg9XHU1M0VBXHU4QkZCXHU1MjA2XHU2NzkwXHU0RUE3XHU1MUZBXHU3RUQzXHU2Nzg0XHU1MzE2XHU2NUI5XHU2ODQ4XHVGRjBDXHU2Mjc5XHU1MUM2XHU1NDBFXHU1MThEXHU2RDNFXHU1M0QxXHU2MjY3XHU4ODRDJyxcclxuICAgICdmaXguZGlzcGF0Y2hNb2RlVGl0bGUnOiAnXHU2RDNFXHU1M0QxXHU0RkVFXHU1OTBEXHUyMDE0XHUyMDE0XHU5MDA5XHU2MkU5XHU2QTIxXHU1RjBGJyxcclxuICAgICdmaXguZGlzcGF0Y2hNb2RlTXNnJzogJ1x1NUMwNlx1NkQzRVx1NTNEMSB7bn0gXHU2NzYxXHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHU3RUQ5XHU1QjUwIEFnZW50IFx1NUU3Nlx1NTNEMVx1NTkwNFx1NzQwNlx1RkYwOFx1NkJDRlx1NEVGQlx1NTJBMVx1NzJFQ1x1N0FDQiB3b3JrdHJlZVx1RkYwQ1x1NkQ4OFx1ODAxN1x1NkEyMVx1NTc4Qlx1NzUyOFx1OTFDRlx1RkYwQ1x1NEUwRFx1NTM2MFx1NzUyOFx1ODA0QVx1NTkyOVx1N0E5N1x1NTNFM1x1RkYwOVx1MzAwMlx1MjZBMSBcdTc2RjRcdTYzQTVcdTRGRUVcdTU5MERcdUZGMUFcdTRFMDlcdTkwNTNcdTk1RjhcdTUyMjRcdTVCOUEgKyBcdTRGRUVcdTU5MEQgKyBcdTU2REVcdTUxOTkgKyBcdTYzRDBcdTRFQTRcdTUxNjhcdTgxRUFcdTUyQThcdUZGMENcdThCRUZcdTYyQTUvXHU5MUNEXHU1OTBEL1x1OEZDN1x1NjVGNlx1NEYxQVx1ODFFQVx1NTJBOFx1NTE3M1x1OTVFRFx1MzAwMlx1RDgzRFx1RENDQiBcdTUxNDhcdTUxRkFcdTY1QjlcdTY4NDhcdUZGMUFcdTUzRUFcdThCRkJcdTUyMDZcdTY3OTBcdTRFQTdcdTUxRkFcdTdFRDNcdTY3ODRcdTUzMTZcdTY1QjlcdTY4NDhcdUZGMENcdTRFMERcdTY1MzlcdTRFRkJcdTRGNTVcdTRFRTNcdTc4MDFcdUZGMUJcdTRGNjBcdTU3MjhcdTk1RUVcdTk4OThcdTUzNjFcdTc2ODRcdTY1QjlcdTY4NDhcdTU3NTdcdTYyNzlcdTUxQzZcdTU0MEVcdTcwQjlcdTMwMENcdTZEM0VcdTUzRDFcdTVGODVcdTVCQTFcdTY1QjlcdTY4NDhcdTMwMERcdTYyNjdcdTg4NENcdTMwMDInLFxyXG4gICAgJ2ZpeC5kaXNwYXRjaEF1dG8nOiAnXHUyNkExIFx1NzZGNFx1NjNBNVx1NEZFRVx1NTkwRCcsXHJcbiAgICAnZml4LmRpc3BhdGNoUGxhbic6ICdcdUQ4M0RcdURDQ0IgXHU1MTQ4XHU1MUZBXHU2NUI5XHU2ODQ4JyxcclxuICAgICdmaXguZGlzcGF0Y2hOb09wZW4nOiAnXHU1RjUzXHU1MjREXHU3QjVCXHU5MDA5XHU0RTBCXHU2Q0ExXHU2NzA5XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHU1M0VGXHU2RDNFXHU1M0QxJyxcclxuICAgICdmaXguZGlzcGF0Y2hQbGFucyc6ICdcdTZEM0VcdTUzRDFcdTVGODVcdTVCQTFcdTY1QjlcdTY4NDgnLFxyXG4gICAgJ2ZpeC5kaXNwYXRjaFBsYW5zSGludCc6ICdcdTYyOEFcdTVERjJcdTRFQTdcdTUxRkFcdTc2ODRcdTVGODVcdThCQzRcdTVCQTFcdTY1QjlcdTY4NDhcdTZEM0VcdTUzRDFcdTdFRDlcdTVCNTAgQWdlbnQgXHU1RTc2XHU1M0QxXHU2MjY3XHU4ODRDXHU0RkVFXHU1OTBEXHVGRjA4XHU2QkNGXHU0RUZCXHU1MkExXHU3MkVDXHU3QUNCIHdvcmt0cmVlXHVGRjBDXHU1NDA4XHU1RTc2XHU1MUIyXHU3QTgxXHU4MUVBXHU1MkE4XHU1N0ZBXHU0RThFXHU2NzAwXHU2NUIwXHU0RUUzXHU3ODAxXHU5MUNEXHU1MDVBXHVGRjA5JyxcclxuICAgICdmaXguZGlzcGF0Y2hEb25lJzogJ1x1NURGMlx1NkQzRVx1NTNEMSB7bn0gXHU0RTJBXHU0RkVFXHU1OTBEXHU0RUZCXHU1MkExXHVGRjA4XHU1RTc2XHU1M0QxIHtjfVx1RkYwOScsXHJcbiAgICAnZml4LmRpc3BhdGNoRW1wdHknOiAnXHU2Q0ExXHU2NzA5XHU1M0VGXHU2RDNFXHU1M0QxXHU3Njg0XHU0RUZCXHU1MkExXHVGRjA4XHU1MkZFXHU5MDA5XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHU2MjE2XHU3QjQ5XHU1Rjg1XHU2NUI5XHU2ODQ4XHU0RUE3XHU1MUZBXHVGRjA5JyxcclxuICAgICdmaXguc3RhdHVzJzogJ1x1NEZFRVx1NTkwRFx1NjI2N1x1ODg0QycsXHJcbiAgICAnZml4LnN0b3AnOiAnXHU1MDVDXHU2QjYyJyxcclxuICAgICdmaXguc3RvcERvbmUnOiAnXHU1REYyXHU1MDVDXHU2QjYyIHtufSBcdTRFMkFcdTRGRUVcdTU5MERcdTRFRkJcdTUyQTEnLFxyXG4gICAgJ2ZpeC50YXNrUXVldWVkJzogJ1x1NjM5Mlx1OTYxRlx1NEUyRCcsXHJcbiAgICAnZml4LnRhc2tSdW5uaW5nJzogJ1x1OEZEMFx1ODg0Q1x1NEUyRCcsXHJcbiAgICAnZml4LnRhc2tNZXJnaW5nJzogJ1x1NTQwOFx1NUU3Nlx1NEUyRCcsXHJcbiAgICAnZml4LnRhc2tSZWRvJzogJ1x1OTFDRFx1NTA1QVx1NEUyRCcsXHJcbiAgICAnZml4LnRhc2tEb25lJzogJ1x1NURGMlx1NUI4Q1x1NjIxMCcsXHJcbiAgICAnZml4LnRhc2tDb25mbGljdCc6ICdcdTUxQjJcdTdBODEnLFxyXG4gICAgJ2ZpeC50YXNrRmFpbGVkJzogJ1x1NTkzMVx1OEQyNScsXHJcbiAgICAnZml4LnRhc2tDYW5jZWxsZWQnOiAnXHU1REYyXHU1MDVDXHU2QjYyJyxcclxuICAgICdmaXguYXR0ZW1wdCc6ICdcdTdCMkMge259IFx1NkIyMScsXHJcbiAgICAnZml4LnJ1bnRpbWUnOiAnXHU1REYyXHU4RkQwXHU4ODRDIHtufSBcdTUyMDYnLFxyXG4gICAgJ2ZpeC5yZXN1bWVzJzogJ1x1N0VFRFx1OEREMSB7bn0nLFxyXG4gICAgJ2ZpeC5wcm9iZXMnOiAnXHU2M0EyXHU2RDNCIHtufScsXHJcbiAgICAnZml4Lm1vZGVsVGl0bGUnOiAnXHU0RkVFXHU1OTBEXHU1RTc2XHU1M0QxXHVGRjA4XHU1QjUwIEFnZW50IFx1NkM2MFx1RkYwOScsXHJcbiAgICAnZml4Lm1vZGVsSGludCc6ICdcdTU0MENcdTY1RjZcdTYyNjdcdTg4NENcdTc2ODRcdTRGRUVcdTU5MERcdTVCNTAgQWdlbnQgXHU0RTBBXHU5NjUwXHVGRjA4MS0xMFx1RkYwOVx1MzAwMlx1NkJDRlx1NEVGQlx1NTJBMVx1NzJFQ1x1N0FDQiB3b3JrdHJlZSBcdTRFOTJcdTRFMERcdTVFNzJcdTYyNzBcdUZGMUJcdTRGRUVcdTY1MzlcdTU0MEVcdTdBQ0JcdTUzNzNcdTc1MUZcdTY1NDhcdTMwMDInLFxyXG5cclxuICAgICdwbGFuLnRpdGxlJzogJ1x1N0YxNlx1NjM5Mlx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNCcsXHJcbiAgICAncGxhbi5oaW50JzogJ1x1NkJDRlx1NkI2NVx1NzY4NFx1ODlEMlx1ODI3Mlx1NTFCM1x1NUI5QVx1NEUwQVx1NEUwQlx1NjU4N1x1NkNFOFx1NTE2NVx1NEUwRVx1OUVEOFx1OEJBNFx1NkEyMVx1NTc4Qlx1RkYwOFx1NTIwNlx1Njc5MC9cdTY0Q0RcdTRGNUM9ZmFzdFx1RkYwQ1x1NUYwMFx1NTNEMT1zdGFuZGFyZFx1RkYwQ1x1ODlDNFx1NTIxMj1yZWFzb25pbmdcdUZGMENcdTlBOENcdTY1MzY9dmVyaWZpZXJcdUZGMDlcdUZGMUJcdTUzRUZcdThDMDNcdTY1NzRcdTU0MEVcdTUxOERcdTU0MkZcdTUyQThcdTMwMDInLFxyXG4gICAgJ3BsYW4uY29sLnN0ZXAnOiAnXHU2QjY1XHU5QUE0JywgJ3BsYW4uY29sLnJvbGUnOiAnXHU4OUQyXHU4MjcyJywgJ3BsYW4uY29sLm1vZGVsJzogJ1x1NkEyMVx1NTc4QicsICdwbGFuLmNvbC5wb2xpY3knOiAnXHU1OTMxXHU4RDI1XHU3QjU2XHU3NTY1JywgJ3BsYW4uY29sLmVuYWJsZWQnOiAnXHU1NDJGXHU3NTI4JywgJ3BsYW4uY29sLmF0dGVtcHRzJzogJ1x1NUMxRFx1OEJENScsXHJcbiAgICAncGxhbi5tb2RlbERlZmF1bHQnOiAnXHU4RERGXHU5NjhGXHU4OUQyXHU4MjcyXHU5RUQ4XHU4QkE0JyxcclxuICAgICdwbGFuLmxhdW5jaEVkaXRlZCc6ICdcdTRGRERcdTVCNThcdTRGRUVcdTY1MzlcdTVFNzZcdTU0MkZcdTUyQTgnLFxyXG4gICAgJ3BsYW4ubGF1bmNoRGlyZWN0JzogJ1x1NjMwOVx1NTM5Rlx1OEJBMVx1NTIxMlx1NTQyRlx1NTJBOCcsXHJcbiAgICAncGxhbi5kaXNjYXJkJzogJ1x1NjUzRVx1NUYwMycsXHJcbiAgICAncGxhbi52aWV3RGV0YWlsJzogJ1x1OEJFNlx1NjBDNScsICdwbGFuLnJlZnJlc2hEZXRhaWwnOiAnXHU1MjM3XHU2NUIwJywgJ3BsYW4uY2xvc2VEZXRhaWwnOiAnXHU2NTM2XHU4RDc3JyxcclxuICAgICdwbGFuLmRldGFpbFRpdGxlJzogJ1J1biBcdThCRTZcdTYwQzUnLFxyXG4gICAgJ3BsYW4ucGF1c2VkQmFubmVyJzogJ1x1NEVGQlx1NTJBMVx1NURGMlx1NjY4Mlx1NTA1Q1x1RkYwQ1x1N0I0OVx1NUY4NVx1NEY2MFx1NzY4NFx1NTFCM1x1N0I1NicsXHJcbiAgICAncGxhbi5yZXN1bWVSZXRyeSc6ICdcdTkxQ0RcdThCRDVcdThCRTVcdTZCNjVcdTlBQTRcdTVFNzZcdTdFRTdcdTdFRUQnLFxyXG4gICAgJ3BsYW4ucmVzdW1lU2tpcCc6ICdcdThERjNcdThGQzdcdThCRTVcdTZCNjVcdTlBQTRcdTdFRTdcdTdFRUQnLFxyXG4gICAgJ3BsYW4ucmVzdW1lRmFpbGVkJzogJ1x1NEVDRVx1NTkzMVx1OEQyNVx1NTkwNFx1NjA2Mlx1NTkwRCcsXHJcbiAgICAncGxhbi5jb250ZXh0VGl0bGUnOiAnXHU0RUZCXHU1MkExXHU0RTBBXHU0RTBCXHU2NTg3XHVGRjA4XHU2NzJDIFJ1biBcdTZDRThcdTUxNjVcdTRFODZcdTRFQzBcdTRFNDhcdUZGMDknLFxyXG4gICAgJ3BsYW4uYnJhbmNoJzogJ1x1NTIwNlx1NjUyRicsICdwbGFuLmluamVjdGVkTWVtb3JpZXMnOiAnXHU2Q0U4XHU1MTY1XHU4QkIwXHU1RkM2JywgJ3BsYW4uZGVjaXNpb25Mb2cnOiAnXHU1MUIzXHU3QjU2XHU2NUU1XHU1RkQ3JyxcclxuICAgICdleGVjLmNvbC5kZXRhaWwnOiAnXHU4QkU2XHU2MEM1JyxcclxuXHJcbiAgICAnc2NoZWQudGl0bGUnOiAnXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExJyxcclxuICAgICdzY2hlZC5mb3JtTmFtZSc6ICdcdTRFRkJcdTUyQTFcdTU0MERcdTc5RjAnLCAnc2NoZWQuZm9ybUludGVydmFsJzogJ1x1OTVGNFx1OTY5NFx1RkYwOFx1NTIwNlx1OTQ5Rlx1RkYwOScsXHJcbiAgICAnc2NoZWQudHlwZVJldmlldyc6ICdcdTgxRUFcdTUyQThcdThCQzRcdTVCQTEnLCAnc2NoZWQudHlwZVN1bW1hcnknOiAnQUkgXHU2MDNCXHU3RUQzJywgJ3NjaGVkLnR5cGVSdW4nOiAnXHU1QjlBXHU2NUY2XHU2MjY3XHU4ODRDJyxcclxuICAgICdzY2hlZC5hZGQnOiAnXHU1MjFCXHU1RUZBJyxcclxuICAgICdzY2hlZC5oaW50JzogJ1x1NTIzMFx1NzBCOVx1ODFFQVx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYxQVx1ODFFQVx1NTJBOFx1OEJDNFx1NUJBMT1cdThCQzRcdTVCQTFcdThGRDEgMjQgXHU1QzBGXHU2NUY2XHU3Njg0XHU2NUIwXHU2M0QwXHU0RUE0XHVGRjA4XHU5NUVFXHU5ODk4XHU4RkRCIFJldmlldyBcdTk3NjJcdTY3N0ZcdUZGMDlcdUZGMUJBSSBcdTYwM0JcdTdFRDM9XHU3NTFGXHU2MjEwXHU1ODlFXHU5MUNGXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzXHVGRjFCXHU1QjlBXHU2NUY2XHU2MjY3XHU4ODRDPVx1NjMwOVx1NkEyMVx1Njc3Rlx1OEREMVx1NEUwMFx1NkIyMVx1N0YxNlx1NjM5Mlx1NEVGQlx1NTJBMVx1MzAwMlx1NjcwMFx1NUMwRiAxIFx1NTIwNlx1OTQ5Rlx1MzAwMicsXHJcbiAgICAnc2NoZWQuZW1wdHknOiAnXHU2NjgyXHU2NUUwXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHUzMDAyJyxcclxuICAgICdzY2hlZC5jb2wubmFtZSc6ICdcdTU0MERcdTc5RjAnLCAnc2NoZWQuY29sLnR5cGUnOiAnXHU3QzdCXHU1NzhCJywgJ3NjaGVkLmNvbC5pbnRlcnZhbCc6ICdcdTU0NjhcdTY3MUYnLCAnc2NoZWQuY29sLm5leHQnOiAnXHU0RTBCXHU2QjIxXHU2MjY3XHU4ODRDJywgJ3NjaGVkLmNvbC5sYXN0UmVzdWx0JzogJ1x1NEUwQVx1NkIyMVx1N0VEM1x1Njc5QycsICdzY2hlZC5jb2wuYWN0aW9ucyc6ICdcdTY0Q0RcdTRGNUMnLFxyXG4gICAgJ3NjaGVkLmRheSc6ICcgXHU1OTI5JywgJ3NjaGVkLmhvdXInOiAnIFx1NUMwRlx1NjVGNicsICdzY2hlZC5taW51dGUnOiAnIFx1NTIwNlx1OTQ5RicsXHJcbiAgICAnc2NoZWQuZGlzYWJsZSc6ICdcdTY2ODJcdTUwNUMnLCAnc2NoZWQuZW5hYmxlJzogJ1x1NTQyRlx1NzUyOCcsICdzY2hlZC5ydW5Ob3cnOiAnXHU3QUNCXHU1MzczXHU2MjY3XHU4ODRDJyxcclxuXHJcbiAgICAnbWVtb3J5LnpvbmVUaXRsZSc6ICdcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzYnLFxyXG4gICAgJ21lbW9yeS5zeW5jQmFzZWxpbmUnOiAnXHU1NDBDXHU2QjY1XHU1N0ZBXHU3RUJGJywgJ21lbW9yeS5zeW5jTm9uZSc6ICdcdTY3MkFcdTU0MENcdTZCNjUnLFxyXG4gICAgJ21lbW9yeS5iZWhpbmQnOiAnXHU4NDNEXHU1NDBFIHtufSBcdTRFMkFcdTYzRDBcdTRFQTRcdTY3MkFcdTU0MENcdTZCNjUnLFxyXG4gICAgJ21lbW9yeS5zeW5jJzogJ1x1NTQwQ1x1NkI2NVx1OEJCMFx1NUZDNicsICdtZW1vcnkuc3luY2luZyc6ICdcdTU0MENcdTZCNjVcdTRFMkRcdTIwMjYnLCAnbWVtb3J5LnN5bmNGYWlsZWQnOiAnXHU1NDBDXHU2QjY1XHU1OTMxXHU4RDI1JyxcclxuICAgICdtZW1vcnkuc3RhbGVUaXRsZSc6ICdcdTc1OTFcdTRGM0NcdThGQzdcdTY1RjZcdUZGMDhcdTc2RjhcdTUxNzNcdTRFRTNcdTc4MDFcdTVERjJcdTg4QUJcdTY1MzlcdTUyQThcdUZGMENcdTVGODVcdTRGNjBcdTU5MERcdTY4MzhcdUZGMDknLFxyXG4gICAgJ21lbW9yeS5tYXJrU3RhbGUnOiAnXHU2ODA3XHU4QkIwXHU4RkM3XHU2NUY2JywgJ21lbW9yeS5hcmNoaXZlQnRuJzogJ1x1NUY1Mlx1Njg2MycsICdtZW1vcnkua2VlcEFjdGl2ZSc6ICdcdTRFQ0RcdTY3MDlcdTY1NDgnLFxyXG4gICAgJ21lbW9yeS5uZXdDYW5kaWRhdGVzJzogJ1x1NjVCMFx1NTg5RVx1NTAxOVx1OTAwOVx1RkYwOFx1NURGMlx1NTE2NVx1NUY4NVx1Nzg2RVx1OEJBNFx1OTYxRlx1NTIxN1x1RkYwOVx1RkYxQScsXHJcbiAgICAnbWVtb3J5LmNsb3NlUmVwb3J0JzogJ1x1NTE3M1x1OTVFRFx1NjJBNVx1NTQ0QScsXHJcbiAgICAnbWVtb3J5LnNjb3BlUHJvamVjdCc6ICdcdTRFM0JcdTVFNzJcdUZGMDhcdTUxNjhcdTUyMDZcdTY1MkZcdUZGMDknLCAnbWVtb3J5LnNjb3BlQnJhbmNoJzogJ1x1NEVDNVx1NUY1M1x1NTI0RFx1NTIwNlx1NjUyRicsXHJcbiAgICAnbWVtb3J5LnBlbmRpbmdRdWV1ZSc6ICdcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTcnLFxyXG4gICAgJ21lbW9yeS50b05vdGUnOiAnXHU4RjZDXHU3QjE0XHU4QkIwJywgJ21lbW9yeS5ub3JtYWxpemUnOiAnXHU1RjUyXHU0RTAwXHU1MjMwXHU0RTNCXHU1RTcyJywgJ21lbW9yeS5yZXN0b3JlJzogJ1x1NjA2Mlx1NTkwRCcsXHJcbiAgICAnbWVtb3J5LnN0YXR1c1N0YWxlJzogJ1x1NzU5MVx1NEYzQ1x1OEZDN1x1NjVGNicsXHJcbiAgICAnaW1wYWN0LmZ1bmN0aW9uc05vbmUnOiAnXHU2NzJBXHU4QkM2XHU1MjJCXHU1MUZBXHU1MUZEXHU2NTcwXHU3RUE3XHU4QzAzXHU3NTI4XHU1M0Q4XHU1MzE2XHVGRjA4XHU1M0VGXHU4MEZEXHU2NjJGXHU2ODM3XHU1RjBGL1x1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MC9cdTdFQUZcdTkxNERcdTdGNkVcdTY1MzlcdTUyQThcdUZGMDlcdTMwMDInLFxyXG4gICAgJ3Jldmlldy5jb2wuc2V2ZXJpdHknOiAnXHU3RUE3XHU1MjJCJyxcclxuICAgICdyZXZpZXcuY29sLmNhdGVnb3J5JzogJ1x1N0M3Qlx1NTIyQicsXHJcbiAgICAncmV2aWV3LmNvbC50aXRsZSc6ICdcdTk1RUVcdTk4OTgnLFxyXG4gICAgJ3Jldmlldy5jb2wuZXZpZGVuY2UnOiAnXHU0RjREXHU3RjZFJyxcclxuICAgICdyZXZpZXcuY29sLmZpeCc6ICdcdTVFRkFcdThCQUVcdTRGRUVcdTU5MEQnLFxyXG4gICAgJ3Jldmlldy5oaW50JzogJ1x1NzBCOVx1NTFGQlx1NEUwQVx1NjVCOVx1NjMwOVx1OTRBRVx1NUYwMFx1NTlDQlx1NjgzOFx1NjdFNVx1RkYwQ1x1NEVBN1x1NTFGQVx1NjcwMFx1NEYxOFx1NjAyN1x1N0VEM1x1OEJCQVx1NEUwRVx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1MzAwMicsXHJcbiAgICAnZGlmZi5zaG93JzogJ1x1NUJGOVx1NkJENCcsXHJcbiAgICAnZGlmZi5oaWRlJzogJ1x1NjUzNlx1OEQ3N1x1NURFRVx1NUYwMicsXHJcblxyXG4gICAgJ2RldGFpbC50aXRsZSc6ICdcdTY4MzhcdTY3RTVcdThCRTZcdTYwQzUnLFxyXG4gICAgJ2RldGFpbC5waWNrJzogJ1x1MjE5MCBcdTRFQ0VcdTVERTZcdTRGQTdcdTkwMDlcdTYyRTlcdTRFMDBcdTZCMjFcdTYzRDBcdTRFQTRcdUZGMDhcdTYyMTZcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQThcdUZGMDlcdTVGMDBcdTU5Q0JcdTY4MzhcdTY3RTUnLFxyXG4gICAgJ2RldGFpbC53aGF0JzogJ1x1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OCcsXHJcbiAgICAnZGV0YWlsLmxvZ2ljJzogJ1x1NUI5RVx1NzNCMFx1OTAzQlx1OEY5MScsXHJcbiAgICAnZGV0YWlsLnJpc2snOiAnXHU5OENFXHU5NjY5XHU3MEI5JyxcclxuICAgICdkZXRhaWwuZmlsZXMnOiAnXHU2NTg3XHU0RUY2XHU2RTA1XHU1MzU1JyxcclxuICAgICdkZXRhaWwucGF0Y2gnOiAnXHU2N0U1XHU3NzBCXHU4ODY1XHU0RTAxXHU1MzlGXHU2NTg3JyxcclxuICAgICdkZXRhaWwuYWlMb2FkaW5nJzogJ0FJIFx1ODlFM1x1OEJGQlx1NzUxRlx1NjIxMFx1NEUyRFx1MjAyNlx1RkYwOFx1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxyXG4gICAgJ2RldGFpbC5xdWV1ZWQnOiAnXHU4RkQ4XHU2NzA5IHtufSBcdTRFMkFcdTg5RTNcdThCRkJcdTYzOTJcdTk2MUZcdTRFMkRcdUZGMDhcdTgxRUFcdTUyQThcdTVFNzZcdTUzRDFcdTYyNjdcdTg4NENcdUZGMDknLFxyXG4gICAgJ2RldGFpbC5jYXJkUXVldWVkJzogJ1x1NjM5Mlx1OTYxRlx1N0I0OVx1NUY4NSBBSSBcdTg5RTNcdThCRkJcdUZGMDhcdTVFNzZcdTUzRDFcdTRFMEFcdTk2NTAgM1x1RkYwQ1x1OTA3Rlx1NTE0RFx1NjI1M1x1NkVFMVx1NkEyMVx1NTc4Qlx1N0Y1MVx1NTE3M1x1RkYwOScsXHJcbiAgICAnZGV0YWlsLmltcGFjdCc6ICdcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdTUyMDZcdTY3OTAnLFxyXG4gICAgJ2RldGFpbC5pbXBhY3RMb2FkaW5nJzogJ1x1NUY3MVx1NTRDRFx1NjI2Qlx1NjNDRlx1NEUyRFx1MjAyNlx1RkYwOFx1NUYxNVx1NzUyOFx1NjhDMFx1N0QyMiArIFx1NTZGRVx1OEMzMVx1NEYyMFx1NjRBRFx1RkYwOScsXHJcbiAgICAnZGV0YWlsLm9wdGltYWxpdHknOiAnXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1JyxcclxuICAgICdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnOiAnXHU4QkM0XHU1QkExXHU0RTJEXHUyMDI2XHVGRjA4XHU0RjFBXHU0RUE3XHU1MUZBXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHU0RTBFXHU2NzAwXHU0RjE4XHU2MDI3XHU3RUQzXHU4QkJBXHVGRjA5JyxcclxuXHJcbiAgICAnaW1wYWN0LnJpc2snOiAnXHU5OENFXHU5NjY5JyxcclxuICAgICdpbXBhY3QuY29sLmNoYW5nZWQnOiAnXHU1M0Q4XHU2NkY0XHU2NTg3XHU0RUY2JyxcclxuICAgICdpbXBhY3QuY29sLmluZGlyZWN0JzogJ1x1OTVGNFx1NjNBNVx1NUY3MVx1NTRDRFx1RkYwOFx1NUYxNVx1NzUyOFx1OTRGRVx1RkYwOScsXHJcbiAgICAnaW1wYWN0LmNvbC5wb3RlbnRpYWwnOiAnXHU2RjVDXHU1NzI4XHU1RjcxXHU1NENEJyxcclxuICAgICdpbXBhY3Qubm9uZSc6ICdcdTY3MkFcdTUzRDFcdTczQjBcdTRFRDNcdTVFOTNcdTUxODVcdTVGMTVcdTc1MjhcdTgwMDVcdUZGMDhcdTY1MzlcdTUyQThcdTc3MEJcdTRGM0NcdTcyRUNcdTdBQ0JcdUZGMDlcdTMwMDInLFxyXG4gICAgJ2ltcGFjdC50ZXN0cyc6ICdcdTUxNzNcdTgwNTRcdTZENEJcdThCRDUnLFxyXG4gICAgJ2ltcGFjdC5sZWdlbmQuY2hhbmdlZCc6ICdcdTUzRDhcdTY2RjQnLFxyXG4gICAgJ2ltcGFjdC5sZWdlbmQuaW5kaXJlY3QnOiAnXHU5NUY0XHU2M0E1JyxcclxuICAgICdpbXBhY3QubGVnZW5kLnBvdGVudGlhbCc6ICdcdTZGNUNcdTU3MjgnLFxyXG5cclxuICAgICdyZXZpZXcudmVyZGljdCc6ICdcdTY3MDBcdTRGMThcdTYwMjdcdTdFRDNcdThCQkEnLFxyXG4gICAgJ3Jldmlldy5pc3N1ZXMnOiAnXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1JyxcclxuICAgICdyZXZpZXcuY2xlYW4nOiAnXHU2NzJBXHU1M0QxXHU3M0IwXHU5NUVFXHU5ODk4XHUzMDAyJyxcclxuXHJcbiAgICAnbm90ZXMudGl0bGUnOiAnXHU2ODM4XHU2N0U1XHU3QjE0XHU4QkIwJyxcclxuICAgICdub3Rlcy5mb3JtVGl0bGUnOiAnXHU3QjE0XHU4QkIwXHU2ODA3XHU5ODk4JyxcclxuICAgICdub3Rlcy5mb3JtQ29udGVudCc6ICdcdTdCMTRcdThCQjBcdTUxODVcdTVCQjlcdUZGMDhcdTdFRDNcdThCQkFcdTMwMDFcdTc1OTFcdTk1RUVcdTMwMDFcdTVCNjZcdTRFNjBcdTg5ODFcdTcwQjlcdTIwMjZcdUZGMDknLFxyXG4gICAgJ25vdGVzLmFkZCc6ICdcdTZERkJcdTUyQTBcdTdCMTRcdThCQjAnLFxyXG4gICAgJ25vdGVzLmJvdW5kVG8nOiAnXHU1QzA2XHU1MTczXHU4MDU0XHU1MjMwJyxcclxuICAgICdub3Rlcy5jb2wudGltZSc6ICdcdTY1RjZcdTk1RjQnLFxyXG4gICAgJ25vdGVzLmNvbC50aXRsZSc6ICdcdTY4MDdcdTk4OTgnLFxyXG4gICAgJ25vdGVzLmNvbC5jb250ZW50JzogJ1x1NTE4NVx1NUJCOScsXHJcbiAgICAnbm90ZXMuY29sLnNoYSc6ICdcdTUxNzNcdTgwNTRcdTYzRDBcdTRFQTQnLFxyXG4gICAgJ25vdGVzLnJlbW92ZSc6ICdcdTUyMjBcdTk2NjQnLFxyXG4gICAgJ25vdGVzLmVtcHR5JzogJ1x1OEZEOFx1NkNBMVx1NjcwOVx1N0IxNFx1OEJCMFx1MzAwMlx1NjgzOFx1NjdFNVx1NjNEMFx1NEVBNFx1NjVGNlx1OTY4Rlx1NjI0Qlx1OEJCMFx1NEUwQlx1N0VEM1x1OEJCQVx1NEUwRVx1NzU5MVx1OTVFRVx1RkYwQ1x1NUMzMVx1NjYyRlx1NEY2MFx1NzY4NFx1OTg3OVx1NzZFRVx1NUI2Nlx1NEU2MFx1Njg2M1x1Njg0OFx1MzAwMicsXHJcblxyXG4gICAgJ21lbW9yeS5yZWNvcmQnOiAnXHU4QkIwXHU1RjU1XHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2JyxcclxuICAgICdmb3JtLm1lbW9yeVRpdGxlJzogJ1x1OEJCMFx1NUZDNlx1NjgwN1x1OTg5OCcsXHJcbiAgICAnZm9ybS5tZW1vcnlDb250ZW50JzogJ1x1OEJCMFx1NUZDNlx1NTE4NVx1NUJCOVx1RkYwOFx1NEVDMFx1NEU0OFx1NEUwRVx1NEUzQVx1NEVDMFx1NEU0OFx1RkYwOScsXHJcbiAgICAnbWVtb3J5LmNvbC50aXRsZSc6ICdcdTY3NjFcdTc2RUUnLFxyXG4gICAgJ21lbW9yeS5jb2wudHlwZSc6ICdcdTdDN0JcdTU3OEInLFxyXG4gICAgJ21lbW9yeS5jb2wudHJ1dGgnOiAnXHU3NzFGXHU1MDNDJyxcclxuICAgICdtZW1vcnkuY29sLmJyYW5jaCc6ICdcdTUyMDZcdTY1MkYnLFxyXG4gICAgJ21lbW9yeS5jb25maXJtJzogJ1x1Nzg2RVx1OEJBNCcsXHJcbiAgICAnbWVtb3J5LmVtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNlx1MzAwMlx1NTNFRlx1NTcyOFx1ODA0QVx1NTkyOVx1NEUyRFx1OEJBOSBBSSBcdThCQjBcdTVGNTVcdUZGMENcdTYyMTZcdTU3MjhcdTRFMEFcdTY1QjlcdTYyNEJcdTUyQThcdTZERkJcdTUyQTBcdTMwMDInLFxyXG4gICAgJ2NvbmNlcHRzLnRpdGxlJzogJ1x1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNScsXHJcbiAgICAnY29uY2VwdHMubm9uZSc6ICdcdTY2ODJcdTY1RTBcdTVCNjZcdTRFNjBcdTY5ODJcdTVGRjVcdTMwMDJcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdThERDFcdTVCOENcdTUzRDhcdTY2RjRcdTU0MEVcdTgxRUFcdTUyQThcdTZDODlcdTZEQzBcdUZGMENcdTRFNUZcdTUzRUZcdTU3MjhcdTgwNEFcdTU5MjlcdTRFMkRcdThCQTkgQUkgXHU2MDNCXHU3RUQzXHU1QjY2XHU0RTYwXHU4OTgxXHU3MEI5XHUzMDAyJyxcclxuICAgICdjb25jZXB0cy5jb2wubmFtZSc6ICdcdTY5ODJcdTVGRjUnLFxyXG4gICAgJ2NvbmNlcHRzLmNvbC5jYXRlZ29yeSc6ICdcdTdDN0JcdTUyMkInLFxyXG4gICAgJ2NvbmNlcHRzLmNvbC5jb3VudCc6ICdcdTZCMjFcdTY1NzAnLFxyXG4gICAgJ3Jldmlldy5yZWNvcmRzVGl0bGUnOiAnUmV2aWV3IFx1OTVFRVx1OTg5OCcsXHJcbiAgICAncmV2aWV3LnJlY29yZHNFbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTk1RUVcdTk4OThcdThCQjBcdTVGNTVcdTMwMDJcdTYzRDBcdTRFQTRcdTVCQTFcdTY3RTVcdTk4NzVcdThCQzRcdTVCQTFcdTUxRkFcdTc2ODRcdTk1RUVcdTk4OThcdTRGMUFcdTgxRUFcdTUyQThcdTc2N0JcdThCQjBcdTUyMzBcdThGRDlcdTkxQ0NcdUZGMUJcdTkxQ0RcdTY1QjBcdThCQzRcdTVCQTFcdTRGMUFcdTY2RkZcdTYzNjJcdTY1RTdcdThCQjBcdTVGNTVcdTMwMDInLFxyXG4gICAgJ3ZlcmlmeS5yZWNvcmRzJzogJ1x1OUE4Q1x1NjUzNlx1OEJCMFx1NUY1NScsXHJcbiAgICAndmVyaWZ5LnJlY29yZHNFbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTlBOENcdTY1MzZcdThCQjBcdTVGNTVcdTMwMDJcdTU3MjhcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdTcwQjlcdTMwMENcdTlBOENcdTY1MzZcdTMwMERcdTUzNzNcdTc1MUZcdTYyMTBcdTMwMDInLFxyXG5cclxuICAgICdjb25maXJtZWQudGl0bGUnOiAnXHU1REYyXHU3ODZFXHU1QjlBXHU3RUE2XHU2NzVGXHVGRjA4XHU0RUJBXHU1REU1XHU3ODZFXHU4QkE0XHVGRjBDQUkgXHU3OTgxXHU2NTM5XHU4MUVBXHU1MkE4XHU2MkU2XHU2MjJBXHVGRjA5JyxcclxuICAgICdjb25maXJtZWQuYWRkJzogJ1x1NkRGQlx1NTJBMFx1N0VBNlx1Njc1RicsXHJcbiAgICAnY29uZmlybWVkLnRleHQnOiAnXHU3RUE2XHU2NzVGL1x1OTcwMFx1NkM0Mlx1NTE4NVx1NUJCOScsXHJcbiAgICAnY29uZmlybWVkLnBhdGhzJzogJ1x1Nzk4MVx1NjUzOVx1OERFRlx1NUY4NFx1RkYwOFx1OTAxN1x1NTNGN1x1NTIwNlx1OTY5NFx1RkYxQlx1NzZGOFx1NUJGOVx1OTg3OVx1NzZFRVx1NjgzOVx1NTk4MiBzcmMvY29yZVx1RkYwQ1x1NjIxNlx1N0VERFx1NUJGOVx1OERFRlx1NUY4NFx1RkYwOScsXHJcbiAgICAnY29uZmlybWVkLm5vbmUnOiAnXHU2NjgyXHU2NUUwXHU3RUE2XHU2NzVGXHUzMDAyXHU2REZCXHU1MkEwXHU1NDBFXHVGRjBDQUkgXHU0RkVFXHU2NTM5XHU2NzJDXHU5ODc5XHU3NkVFXHU3Njg0XHU3OTgxXHU2NTM5XHU4REVGXHU1Rjg0XHU1QzA2XHU4OEFCXHU4MUVBXHU1MkE4XHU2MkQyXHU3RUREXHVGRjA4XHU0RUM1XHU1QkY5XHU2NzJDXHU5ODc5XHU3NkVFXHU3NTFGXHU2NTQ4XHVGRjA5XHUzMDAyJyxcclxuXHJcbiAgICAnY2hhbmdlcy50aXRsZSc6ICdcdTUzRDhcdTY2RjRcdTRFRkJcdTUyQTEnLFxyXG4gICAgJ3N0YXRlLm5vQ2hhbmdlcyc6ICdcdTY2ODJcdTY1RTBcdTUzRDhcdTY2RjRcdTRFRkJcdTUyQTFcdTMwMDJcdTU3MjhcdTgwNEFcdTU5MjlcdTRFMkRcdThCQTkgQUkgXHU1MjFCXHU1RUZBXHVGRjBDXHU2MjE2XHU3NTI4XHU0RTBBXHU2NUI5XHUzMDBDXHU2NUIwXHU1RUZBXHU1M0Q4XHU2NkY0XHUzMDBEXHUzMDAyJyxcclxuICAgICdjaGFuZ2VzLmNvbC50aXRsZSc6ICdcdTY4MDdcdTk4OTgnLFxyXG4gICAgJ2NoYW5nZXMuY29sLnR5cGUnOiAnXHU3QzdCXHU1NzhCJyxcclxuICAgICdjaGFuZ2VzLmNvbC5zdGF0dXMnOiAnXHU3MkI2XHU2MDAxJyxcclxuICAgICdjaGFuZ2VzLmNvbC51cGRhdGVkJzogJ1x1NjZGNFx1NjVCMFx1NjVGNlx1OTVGNCcsXHJcbiAgICAnZXhlYy5jb2wuc3RhdHVzJzogJ1x1NzJCNlx1NjAwMScsXHJcbiAgICAnZXhlYy5jb2wuY2hhbmdlJzogJ1x1NTNEOFx1NjZGNCcsXHJcbiAgICAnZXhlYy5jb2wuc3RhcnRlZCc6ICdcdTVGMDBcdTU5Q0InLFxyXG4gICAgJ2V4ZWMuY29sLmNvc3QnOiAnXHU2MjEwXHU2NzJDKFx1NEYzMCknLFxyXG4gICAgJ2V4ZWMuYXR0ZW1wdHMnOiAnXHU1QzFEXHU4QkQ1XHU2QjIxXHU2NTcwJyxcclxuICAgICdleGVjLmhpbnQnOiAnXHU2MjY3XHU4ODRDXHVGRjA4c3RhcnRfcnVuXHVGRjA5XHU4QkY3XHU1NzI4XHU1M0YzXHU0RkE3XHU4MDRBXHU1OTI5XHU0RTJEXHU1M0QxXHU4RDc3XHVGRjFBXHU1MjFCXHU1RUZBXHU4QkExXHU1MjEyXHU1NDBFXHU1QkY5IEFJIFx1OEJGNFx1MzAwQ1x1NUYwMFx1NTlDQlx1NjI2N1x1ODg0Q1x1OEJFNSBjaGFuZ2VcdTMwMERcdTMwMDJcdTY3MkNcdTk4NzVcdTY3RTVcdTc3MEJcdThGREJcdTVFQTZcdTRFMEVcdTdFRDNcdTY3OUNcdTMwMDInLFxyXG4gICAgJ3N0YXRlLm5vUnVucyc6ICdcdTY2ODJcdTY1RTBcdTYyNjdcdTg4NENcdThCQjBcdTVGNTVcdTMwMDInLFxyXG4gICAgJ3N0YXRlLnRlY2hTdGFjayc6ICdcdTYyODBcdTY3MkZcdTY4MDgnLFxyXG4gICAgJ3N0YXRlLnN5bWJvbHMnOiAnXHU1REYyXHU3RDIyXHU1RjE1XHU3QjI2XHU1M0Y3JyxcclxuICAgICdzdGF0ZS5tYW5pZmVzdHMnOiAnXHU2RTA1XHU1MzU1XHU2NTg3XHU0RUY2JyxcclxuICAgICdzdGF0ZS5ldmlkZW5jZSc6ICdcdThCQzFcdTYzNkVcdTY3NjFcdTc2RUUnLFxyXG4gIH0sXHJcbiAgZW46IHtcclxuICAgICd3b3Jrc3BhY2UudGl0bGUnOiAnUmV2aWV3IERlc2snLFxyXG4gICAgJ3dvcmtzcGFjZS5zZWxlY3RTZXNzaW9uJzogJ1NlbGVjdCBhIHNlc3Npb24gdW5kZXIgYSB3b3Jrc3BhY2Ugb24gdGhlIGxlZnQgdG8gdmlldyBpdHMgcHJvamVjdCBkYXRhLicsXHJcbiAgICAndGFiLmNvbW1pdHMnOiAnQ29tbWl0IFJldmlldycsXHJcbiAgICAndGFiLm92ZXJ2aWV3JzogJ092ZXJ2aWV3JyxcclxuICAgICd0YWIuZXhlY3V0aW9uJzogJ0V4ZWN1dGlvbicsXHJcbiAgICAndGFiLnJldmlldyc6ICdSZXZpZXcgaXNzdWVzJyxcclxuICAgICd0YWIubm90ZXMnOiAnTm90ZXMgJiBNZW1vcnknLFxyXG4gICAgJ3RhYi5zZXR0aW5ncyc6ICdTZXR0aW5ncycsXHJcbiAgICAnZXJyb3IubG9hZCc6ICdGYWlsZWQgdG8gbG9hZCcsXHJcbiAgICAnc3RhdGUucHJvamVjdCc6ICdDdXJyZW50IHByb2plY3QnLFxyXG4gICAgJ3N0YXRlLm5vUHJvamVjdCc6ICdObyBwcm9qZWN0IGluaXRpYWxpemVkJyxcclxuICAgICdzdGF0ZS5ub1Byb2plY3RIaW50JzogJ1J1biBcIkluaXRpYWxpemUgcHJvamVjdFwiIHRvIHNjYW4gdGhlIHJlcG9zaXRvcnkgc3RydWN0dXJlLCB0ZWNoIHN0YWNrLCBhbmQgc3ltYm9sIGluZGV4LicsXHJcbiAgICAnYWN0aW9uLmJvb3RzdHJhcCc6ICdJbml0aWFsaXplIHByb2plY3QnLFxyXG4gICAgJ2FjdGlvbi5yZXNjYW4nOiAnUmUtaW5pdGlhbGl6ZSAvIHNjYW4nLFxyXG4gICAgJ2FjdGlvbi5hbmFseXplJzogJ0FuYWx5emUgd29ya2luZyBkaWZmJyxcclxuICAgICdhY3Rpb24ucmV2aWV3JzogJ1JldmlldyB3b3JraW5nIGRpZmYnLFxyXG4gICAgJ2FjdGlvbi52ZXJpZnknOiAnVmVyaWZ5IHdvcmtpbmcgZGlmZicsXHJcbiAgICAnYWN0aW9uLmNyZWF0ZUNoYW5nZSc6ICdDcmVhdGUgY2hhbmdlJyxcclxuICAgICdhY3Rpb24ucnVubmluZyc6ICdSdW5uaW5nXHUyMDI2JyxcclxuICAgICdhY3Rpb24ucmVmcmVzaCc6ICdSZWZyZXNoJyxcclxuICAgICdmb3JtLmNoYW5nZVRpdGxlJzogJ0NoYW5nZSB0aXRsZScsXHJcbiAgICAnZm9ybS5jaGFuZ2VEZXNjJzogJ1JlcXVpcmVtZW50IGFuZCBiYWNrZ3JvdW5kIChvcHRpb25hbCknLFxyXG4gICAgJ3Jlc3VsdC5wYW5lbCc6ICdBY3Rpb24gcmVzdWx0JyxcclxuXHJcbiAgICAncmVwby5hZGQnOiAnQWRkIHJlcG8nLFxyXG4gICAgJ3JlcG8uYWRkSGludCc6ICdFbnRlciBhbiBhYnNvbHV0ZSByZXBvIHBhdGggYW5kIHByZXNzIEVudGVyOyBwcmV2aW91c2x5IHVzZWQgcmVwb3MgYXJlIHJlbWVtYmVyZWQnLFxyXG4gICAgJ3JlcG8uc2Nhbkhpc3RvcnknOiAnUmVidWlsZCBoaXN0b3J5JyxcclxuICAgICdyZXBvLmNvbW1pdHMnOiAnY29tbWl0cycsXHJcbiAgICAncmVwby5icmFuY2gnOiAnYnJhbmNoJyxcclxuICAgICdyZXBvLndvcmtpbmcnOiAnVW5jb21taXR0ZWQgY2hhbmdlcycsXHJcbiAgICAncmVwby53b3JraW5nQ2xlYW4nOiAnV29ya2luZyB0cmVlIGlzIGNsZWFuJyxcclxuICAgICdyZXBvLmVtcHR5JzogJ05vIGNvbW1pdHMuJyxcclxuICAgICdyZXBvLmxvYWRGYWlsZWQnOiAnRmFpbGVkIHRvIGxvYWQgY29tbWl0cycsXHJcbiAgICAncGlja2VyLnRpdGxlJzogJ1BpY2sgY29tbWl0cyB0byByZXZpZXcgKG11bHRpLXNlbGVjdCknLFxyXG4gICAgJ3BpY2tlci5wbGFjZWhvbGRlcic6ICdDbGljayB0byBwaWNrIGNvbW1pdHMgKG11bHRpLXNlbGVjdCwgaW5jbHVkZXMgdW5jb21taXR0ZWQpJyxcclxuICAgICdwaWNrZXIuc2VsZWN0ZWQnOiAnU2VsZWN0ZWQnLFxyXG4gICAgJ3BpY2tlci5maWx0ZXInOiAnRmlsdGVyIGJ5IHRpdGxlL2hhc2gvYXV0aG9yXHUyMDI2JyxcclxuICAgICdwaWNrZXIuY2xlYXInOiAnQ2xlYXInLFxyXG4gICAgJ3BpY2tlci5ub01hdGNoJzogJ05vIG1hdGNoaW5nIGNvbW1pdC4nLFxyXG4gICAgJ3BpY2tlci5oaW50JzogJ0NoZWNraW5nIGEgY29tbWl0IGdlbmVyYXRlcyBpdHMgQUkgZXhwbGFuYXRpb247IHJ1biBpbXBhY3QgYW5kIG9wdGltYWxpdHkgYmVsb3cuJyxcclxuICAgICdwaWNrZXIucm91bmQnOiAnUm91bmQge259JyxcclxuICAgICdwaWNrZXIucm91bmRMYXRlc3QnOiAnUm91bmQge259IChsYXRlc3QpJyxcclxuICAgICdwaWNrZXIucm91bmRTZWxlY3QnOiAnU2VsZWN0IHJvdW5kJyxcclxuICAgICdwaWNrZXIucm91bmRDbGVhcic6ICdDbGVhciByb3VuZCcsXHJcbiAgICAncGlja2VyLnVuZGlnZXN0ZWQnOiAnTmV3IGNvbW1pdHMgc2luY2UgdGhlIGxhc3QgQUkgc3VtbWFyeSB3aXRob3V0IEFJIGFuYWx5c2lzIHlldCcsXHJcbiAgICAncGlja2VyLnVuZGlnZXN0ZWRDb3VudCc6ICd7bn0gdW5yZXZpZXdlZCBjb21taXRzJyxcclxuICAgICdwaWNrZXIuc2VsZWN0QWxsVW5kaWdlc3RlZCc6ICdTZWxlY3QgdW5kaWdlc3RlZCcsXHJcbiAgICAncGlja2VyLmRpZ2VzdEFsbCc6ICdEaWdlc3QgYWxsJyxcclxuICAgICdwaWNrZXIuZGlnZXN0QWxsSGludCc6ICdTZWxlY3QgYWxsIHVuZGlnZXN0ZWQgY29tbWl0cyBhbmQgYmF0Y2ggQUkgYW5hbHlzaXMgKGNvbmN1cnJlbmN5IDMsIGNhY2hlZCksIGF1dG8tZ2VuZXJhdGUgdGhlIG5hcnJhdGl2ZSBhZnRlcndhcmRzOyB0aGVuIGNyZWF0ZSBhbiBBSSBzdW1tYXJ5IGluIE5vdGVzICYgTWVtb3J5IHRvIHJlc2V0IHRoZSBtYXJrZXInLFxyXG4gICAgJ25hcnJhdGl2ZS5kaWdlc3RIaW50JzogJ05hcnJhdGl2ZSBnZW5lcmF0ZWQuIENyZWF0ZSBhbiBBSSBzdW1tYXJ5IGluIE5vdGVzICYgTWVtb3J5IHRvIHJlc2V0IHRoZSB1bmRpZ2VzdGVkIG1hcmtlci4nLFxyXG4gICAgJ2ltcGFjdC5mYWN0b3JzJzogJ1Jpc2sgZmFjdG9ycyAod2h5IHRoaXMgbGV2ZWwpJyxcclxuICAgICdpbXBhY3QucG9pbnRzJzogJ0ltcGFjdGVkIHBvaW50cycsXHJcbiAgICAnaW1wYWN0LmtleVBvaW50cyc6ICdLZXkgY29tcG9uZW50cycsXHJcbiAgICAnaW1wYWN0Lm1lbW9yeSc6ICdDcm9zcy1jaGVjayB3aXRoIHByb2plY3QgbWVtb3J5JyxcclxuICAgICdpbXBhY3QuZnVuY3Rpb25zJzogJ0ltcGFjdGVkIGZ1bmN0aW9ucyAod2hvIGNhbGxzIHRoZSBjaGFuZ2VkIGNvZGUpJyxcclxuICAgICdpbXBhY3QuZnVuY1JvbGUnOiAnRnVuY3Rpb24gcm9sZScsXHJcbiAgICAnaW1wYWN0LmZ1bmNDaGFuZ2UnOiAnQ2hhbmdlZCBieSB0aGlzIGNvbW1pdCcsXHJcbiAgICAnaW1wYWN0LmZ1bmNDYWxsZXJzJzogJ0ltcGFjdCBvbiBjYWxsZXJzJyxcclxuICAgICdjYWNoZS5oaXQnOiAnZnJvbSBjYWNoZScsXHJcbiAgICAnY2FjaGUucmVnZW5lcmF0ZSc6ICdSZWdlbmVyYXRlJyxcclxuICAgICdjb3N0LnRvb2x0aXAnOiAnRXN0aW1hdGVkIGNvc3Qgb2YgdGhpcyBBSSBjYWxsIChEZWVwU2VlayBwcmljaW5nKScsXHJcbiAgICAnZXhlYy5jcmVhdGUnOiAnTmV3IHJ1bicsXHJcbiAgICAnZXhlYy5mb3JtVGl0bGUnOiAnV2hhdCB0byBkbyAob25lIGxpbmUpJyxcclxuICAgICdleGVjLmZvcm1EZXNjJzogJ1JlcXVpcmVtZW50OiBnb2FsLCBtb2R1bGVzLCBhY2NlcHRhbmNlJyxcclxuICAgICdleGVjLnN0YXJ0JzogJ1N0YXJ0IHJ1bicsXHJcbiAgICAnZXhlYy5zdGFydGluZyc6ICdTdGFydGluZ1x1MjAyNicsXHJcbiAgICAnZXhlYy5jcmVhdGVIaW50JzogJ0NyZWF0ZXMgYSBjaGFuZ2UsIGdlbmVyYXRlcyBhIHBsYW4sIHRoZW4gQUkgc3ViYWdlbnRzIGV4ZWN1dGUgc3RlcCBieSBzdGVwOyBwcm9ncmVzcyByZWZyZXNoZXMgYmVsb3cuJyxcclxuICAgICdleGVjLm1vZGVsRGVmYXVsdCc6ICdFeGVjdXRpb24gbW9kZWwgKHJvbGUgZGVmYXVsdHM6IGFuYWx5c2lzL29wcz1mYXN0LCBjb2Rpbmc9c3RhbmRhcmQsIHBsYW5uaW5nPXJlYXNvbmluZywgdmVyaWZpY2F0aW9uPXZlcmlmaWVyKScsXHJcbiAgICAnYmFkZ2UucnVubmluZyc6ICd7bn0gcnVucyBpbiBwcm9ncmVzcywgY2xpY2sgdG8gdmlldycsXHJcbiAgICAnbmFycmF0aXZlLnRpdGxlJzogJ1dvcmstcm91bmQgbmFycmF0aXZlJyxcclxuICAgICduYXJyYXRpdmUuZ2VuZXJhdGUnOiAnSW50ZXJwcmV0IHRoaXMgcm91bmQgb2Ygd29yaycsXHJcbiAgICAnbmFycmF0aXZlLnJ1bm5pbmcnOiAnR2VuZXJhdGluZ1x1MjAyNiAofjEwLTMwcyknLFxyXG4gICAgJ2JhZGdlLmZhaWxlZCc6ICd7bn0gcnVucyBuZWVkIGF0dGVudGlvbiwgY2xpY2sgdG8gdmlldycsXHJcbiAgICAnZXhlYy5mbG93Q3JlYXRlJzogJ0Rlc2NyaWJlIHRoZSB0YXNrJyxcclxuICAgICdleGVjLmZsb3dPcmNoZXN0cmF0ZSc6ICdDb25maXJtIG9yY2hlc3RyYXRpb24gKHBlci1zdGVwIG1vZGVsL3JvbGUvZmFpbHVyZSBwb2xpY3kpJyxcclxuICAgICdleGVjLmZsb3dSdW4nOiAnTGF1bmNoICh0cmFjayBwcm9ncmVzcyAmIGNvc3QgaW4gcnVuIGRldGFpbCknLFxyXG4gICAgJ2V4ZWMuZmxvd01lbW9yeSc6ICdBdXRvLWRpc3RpbGwgbWVtb3JpZXMgKGNvbmZpcm0gaW4gbWVtb3J5IHBhbmVsKScsXHJcbiAgICAnZXhlYy5wbGFubmluZyc6ICdHZW5lcmF0aW5nIG9yY2hlc3RyYXRpb25cdTIwMjYgKExMTSBpcyBkZWNvbXBvc2luZyB0aGUgdGFzaywgfjEwLTMwcyknLFxyXG4gICAgJ2V4ZWMuY29sLnN0ZXBzJzogJ1N0ZXBzJyxcclxuICAgICdub3Rlcy5lZGl0JzogJ0VkaXQnLFxyXG4gICAgJ25vdGVzLnRvTWVtb3J5JzogJ1RvIG1lbW9yeScsXHJcbiAgICAnbm90ZXMudG9NZW1vcnlIaW50JzogJ1ByZWZpbGwgdGhlIG1lbW9yeSBmb3JtIGJlbG93IHdpdGggdGhpcyBub3RlJyxcclxuICAgICdub3Rlcy50b01lbW9yeURvbmUnOiAnXHUyNzEzIFByZWZpbGxlZCB0aGUgbWVtb3J5IGZvcm0gKGNob29zZSBhIHR5cGUgaW4gdGhlIFByb2plY3QgbWVtb3J5IHpvbmUgYmVsb3csIHRoZW4gYWRkKScsXHJcbiAgICAnbm90ZXMuY29weU1kJzogJ0NvcHkgTUQnLFxyXG4gICAgJ25vdGVzLmNvcHlNZEhpbnQnOiAnQ29weSB0aGlzIG5vdGUgYXMgTWFya2Rvd24gdG8gdGhlIGNsaXBib2FyZCcsXHJcbiAgICAnbm90ZXMuY29weU1kRG9uZSc6ICdDb3BpZWQgYXMgTWFya2Rvd24nLFxyXG4gICAgJ25vdGVzLmV4cG9ydE1kJzogJ0V4cG9ydCBNRCcsXHJcbiAgICAnbm90ZXMuZXhwb3J0TWRIaW50JzogJ0Rvd25sb2FkIGFzIGEgLm1kIGZpbGUnLFxyXG4gICAgJ25vdGVzLmV4cG9ydERvbmUnOiAnRXhwb3J0ZWQgYXMgLm1kJyxcclxuICAgICdub3Rlcy5kaWdlc3ROZXZlcic6ICdObyBBSSBzdW1tYXJ5IGdlbmVyYXRlZCB5ZXQnLFxyXG4gICAgJ25vdGVzLmRpZ2VzdFBlbmRpbmcnOiAne259IG5ldyBjb21taXRzIHNpbmNlIHRoZSBsYXN0IHN1bW1hcnknLFxyXG4gICAgJ2RldGFpbC5zYXZlTm90ZSc6ICdTYXZlIGFzIG5vdGUnLFxyXG4gICAgJ2RldGFpbC5zYXZlTm90ZUhpbnQnOiAnU2F2ZSB0aGlzIHJldmlldyBjb25jbHVzaW9uICh3aGF0L2xvZ2ljL3Jpc2tzKSBhcyBhIHN0cnVjdHVyZWQgbm90ZScsXHJcbiAgICAnZGV0YWlsLnNhdmVOb3RlVGl0bGUnOiAnUmV2aWV3IHJlY29yZCcsXHJcbiAgICAnZGV0YWlsLnNhdmVNZW1vcnknOiAnRGlzdGlsbCB0byBtZW1vcnknLFxyXG4gICAgJ2RldGFpbC5zYXZlTWVtb3J5SGludCc6ICdEaXN0aWxsIHRoaXMgcmV2aWV3IGNvbmNsdXNpb24gaW50byBhIHByb2plY3QgbWVtb3J5IChxdWV1ZWQgZm9yIGNvbmZpcm1hdGlvbiknLFxyXG4gICAgJ25vdGVzLnNhdmUnOiAnU2F2ZScsXHJcbiAgICAnbm90ZXMuY2FuY2VsJzogJ0NhbmNlbCcsXHJcbiAgICAnbWVtb3J5LmJyYW5jaFNjb3BlJzogJ0JyYW5jaCcsXHJcbiAgICAnbWVtb3J5LmJyYW5jaEFsbCc6ICdBbGwgYnJhbmNoZXMnLFxyXG4gICAgJ25vdGVzLnNlYXJjaCc6ICdTZWFyY2ggbm90ZXNcdTIwMjYnLFxyXG4gICAgJ21vZGVsLnRpdGxlJzogJ01vZGVsIGFzc2lnbm1lbnQgKHdoaWNoIG1vZGVsIHBlciB0YXNrKScsXHJcbiAgICAnbW9kZWwubG9hZGluZyc6ICdMb2FkaW5nIG1vZGVsc1x1MjAyNicsXHJcbiAgICAnbW9kZWwuZm9sbG93Q2hhdCc6ICdGb2xsb3cgY2hhdCBtb2RlbCcsXHJcbiAgICAnbW9kZWwuc2F2ZSc6ICdTYXZlICYgYXBwbHknLFxyXG4gICAgJ21vZGVsLnNhdmVkJzogJ0FwcGxpZWQnLFxyXG4gICAgJ21vZGVsLmhpbnQnOiAnQXBwbGllcyBpbW1lZGlhdGVseSBhbmQgcGVyc2lzdHMgYWNyb3NzIHJlc3RhcnRzOyBjaGF0IG1vZGVsIHVuYWZmZWN0ZWQuJyxcclxuICAgICdub3Rlcy5haVN1bW1hcnknOiAnQUkgc3VtbWFyeScsXHJcbiAgICAnbm90ZXMuYWlTdW1tYXJ5UnVuJzogJ1N1bW1hcml6aW5nXHUyMDI2ICgxMC0zMHMpJyxcclxuICAgICdub3Rlcy5leHBhbmQnOiAnRXhwYW5kJyxcclxuICAgICdub3Rlcy5jb2xsYXBzZSc6ICdDb2xsYXBzZScsXHJcbiAgICAnbm90ZXMuc3VtbWFyeVRhZyc6ICdBSSBzdW1tYXJ5JyxcclxuICAgICdub3Rlcy5lbXB0eVNlYXJjaCc6ICdObyBtYXRjaGluZyBub3Rlcy4nLFxyXG4gICAgJ25vdGVzLmNvbnRlbnRIaW50JzogJ05vdGUgY29udGVudCAobXVsdGktbGluZSk6IGNvbmNsdXNpb25zLCBxdWVzdGlvbnMsIGxlYXJuaW5nc1x1MjAyNicsXHJcbiAgICAnbm90ZXMudGFnc0hpbnQnOiAnVGFncyAoY29tbWEgc2VwYXJhdGVkLCBvcHRpb25hbDsgY2xpY2sgYSB0YWcgdG8gZmlsdGVyKScsXHJcbiAgICAnbm90ZXMucGluJzogJ1BpbicsXHJcbiAgICAnbm90ZXMudW5waW4nOiAnVW5waW4nLFxyXG4gICAgJ25vdGVzLmVkaXRlZEF0JzogJ2VkaXRlZCcsXHJcbiAgICAncmV2aWV3LmZpbHRlckFsbCc6ICdBbGwnLFxyXG4gICAgJ3Jldmlldy5zdGF0dXNBbGwnOiAnQWxsIHN0YXR1c2VzJyxcclxuICAgICdyZXZpZXcudmVyaWZ5JzogJ1JlLXZlcmlmeScsXHJcbiAgICAncmV2aWV3LnZlcmlmeVJ1bm5pbmcnOiAnVmVyaWZ5aW5nXHUyMDI2JyxcclxuICAgICdyZXZpZXcudmVyaWZ5SGludCc6ICdBZnRlciBmaXhpbmcgdGhlIGNvZGUsIGNsaWNrIHRvIHJlLWNoZWNrOiB3aGV0aGVyIGlzc3VlcyBhcmUgZml4ZWQsIHdoZXRoZXIgdGhlIGNoYW5nZSBpcyBvcHRpbWFsIGFuZCBtaW5pbWFsbHkgaW52YXNpdmUsIGFuZCB3aGV0aGVyIG5ldyBpc3N1ZXMgYXBwZWFyZWQuIE9ubHkgYSBwYXNzaW5nIHJlLXZlcmlmaWNhdGlvbiBtYXJrcyBpc3N1ZXMgcmVzb2x2ZWQuJyxcclxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZSc6ICdGYWxzZSBwb3NpdGl2ZScsXHJcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVIaW50JzogJ0h1bWFuLW1hcmsgdGhpcyBpc3N1ZSBhcyBhIGZhbHNlIHBvc2l0aXZlIGFuZCBjbG9zZSBpdCAoZGlzdGluY3QgZnJvbSBhIHZlcmlmaWVkIGZpeCknLFxyXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlVGl0bGUnOiAnTWFyayBhcyBmYWxzZSBwb3NpdGl2ZT8nLFxyXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlTXNnJzogJ1wie3RpdGxlfVwiIHdpbGwgYmUgbWFya2VkIHJlamVjdGVkIGFuZCByZW1vdmVkIGZyb20gdGhlIG9wZW4gcXVldWUuJyxcclxuICAgICdyZXZpZXcuZml4RGV0YWlsJzogJ0ZpeCBkZXRhaWxzJyxcclxuICAgICdyZXZpZXcuZml4U3RhdEZpbGVzJzogJ2ZpbGVzJyxcclxuICAgICdyZXZpZXcuZml4RmlsZXMnOiAnRmlsZXMgdG91Y2hlZCBieSB0aGUgZml4JyxcclxuICAgICdyZXZpZXcuZml4SW1wYWN0JzogJ0ltcGFjdCBzY29wZSAoY2hhbmdlZCBzeW1ib2xzIGFuZCBjYWxsZXJzKScsXHJcbiAgICAncmV2aWV3LmRlZmluZWRJbic6ICdkZWZpbmVkIGluJyxcclxuICAgICdyZXZpZXcuY2FsbENvdW50JzogJ2NhbGwgc2l0ZShzKScsXHJcbiAgICAncmV2aWV3LmZpeERpZmYnOiAnRml4IGRpZmYgKHJlbGF0aXZlIHRvIHRoZSByZXZpZXcgYmFzZWxpbmUpJyxcclxuICAgICdyZXZpZXcucmVmcmVzaCc6ICdSZWZyZXNoJyxcclxuICAgICdyZXZpZXcucmV0ZW50aW9uSGludCc6ICdSZXNvbHZlZCAvIGZhbHNlLXBvc2l0aXZlIGlzc3VlcyBhcmUgYXV0by1wdXJnZWQgYWZ0ZXIge2RheXN9IGRheShzKScsXHJcbiAgICAncmV2aWV3LnRhcmdldCc6ICdUYXJnZXQnLFxyXG4gICAgJ3Jldmlldy53b3JraW5nVGFyZ2V0JzogJ1dvcmtpbmcgdHJlZScsXHJcbiAgICAncmV2aWV3LmV4cG9ydE1kJzogJ0V4cG9ydCBNRCcsXHJcbiAgICAncmV2aWV3LmV4cG9ydE1kSGludCc6ICdEb3dubG9hZCB0aGUgZmlsdGVyZWQgaXNzdWUgbGlzdCBhcyBhIC5tZCBmaWxlJyxcclxuICAgICdyZXZpZXcuZXhwb3J0RW1wdHknOiAnTm8gaXNzdWVzIHRvIGV4cG9ydCcsXHJcbiAgICAncmV2aWV3LnNlbGVjdEFsbCc6ICdTZWxlY3QgYWxsJyxcclxuICAgICdyZXZpZXcuY2hlY2tlZENvdW50JzogJ3tufSBzZWxlY3RlZCcsXHJcbiAgICAncmV2aWV3Lm1hcmtIYW5kbGVkJzogJ01hcmsgaGFuZGxlZCcsXHJcbiAgICAncmV2aWV3LmJhdGNoVmVyaWZ5JzogJ0JhdGNoIHZlcmlmeScsXHJcbiAgICAncmV2aWV3LmJhdGNoVmVyaWZ5Q29uZmlybVRpdGxlJzogJ0JhdGNoIHZlcmlmeT8nLFxyXG4gICAgJ3Jldmlldy5iYXRjaFZlcmlmeUNvbmZpcm1Nc2cnOiAnV2lsbCB2ZXJpZnkge259IHJldmlldyB0YXJnZXRzIG9uZSBieSBvbmUgKHNlcmlhbCBMTE0gY2FsbHMsIH4xMC02MHMgZWFjaCwgY29uc3VtZXMgbW9kZWwgdXNhZ2UpOyB5b3UgY2FuIHN0b3AgYW55dGltZS4nLFxyXG4gICAgJ3Jldmlldy5iYXRjaFN0b3AnOiAnU3RvcCcsXHJcbiAgICAncmV2aWV3LmJhdGNoUHJvZ3Jlc3MnOiAnQmF0Y2ggdmVyaWZ5aW5nIHtpfS97bn0nLFxyXG4gICAgJ3Jldmlldy5iYXRjaERvbmUnOiAnQmF0Y2ggdmVyaWZ5IGRvbmU6IHthfSByZXNvbHZlZCBcdTAwQjcge2J9IHN0aWxsIG9wZW4gXHUwMEI3IHtjfSBuZXcgXHUwMEI3IHtkfSBmYWlsZWQgdGFyZ2V0cycsXHJcbiAgICAncmV2aWV3LmJhdGNoU3RvcHBlZCc6ICdCYXRjaCB2ZXJpZnkgc3RvcHBlZCcsXHJcbiAgICAncmV2aWV3LnRyaWFnZSc6ICdcdUQ4M0VcdURERjkgVHJpYWdlIGFsbCcsXHJcbiAgICAncmV2aWV3LnRyaWFnZUhpbnQnOiAnTExNIGhvbGlzdGljIHNjYW4gb3ZlciBhbGwgcGVuZGluZyBpc3N1ZXM6IGR1cGxpY2F0ZXMvb2Jzb2xldGUvbm9uLWlzc3VlcyBhcmUgY2xvc2VkIGltbWVkaWF0ZWx5IHdpdGggZXZpZGVuY2UgKHJlb3BlbmFibGUpOyByZWFsIGlzc3VlcyBzdGF5IGZvciBmaXggZGlzcGF0Y2gnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VDb25maXJtVGl0bGUnOiAnVHJpYWdlIGFsbCBwZW5kaW5nIGlzc3Vlcz8nLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VDb25maXJtTXNnJzogJ1dpbGwgc2NhbiBhbGwgcGVuZGluZyBpc3N1ZXMgd2l0aCB0aGUgTExNIGluIGJhdGNoZXMgKHVwIHRvIHtufSBwZXIgYmF0Y2gsIGNvbnN1bWVzIG1vZGVsIHVzYWdlKS4gSXNzdWVzIGp1ZGdlZCBkdXBsaWNhdGUvb2Jzb2xldGUvbm9uLWlzc3VlcyBhcmUgY2xvc2VkIElNTUVESUFURUxZIHdpdGggZXZpZGVuY2UgXHUyMDE0IGV2ZXJ5IGNsb3N1cmUgaXMgcmV2aWV3YWJsZSBhbmQgcmVvcGVuYWJsZSBvbiB0aGUgaXNzdWUgY2FyZC4gUmVhbCBpc3N1ZXMgc3RheSBmb3IgZml4IGRpc3BhdGNoLicsXHJcbiAgICAncmV2aWV3LnRyaWFnZVByb2dyZXNzJzogJ1RyaWFnaW5nOiB7bn0gcHJvY2Vzc2VkLCB+e219IHJlbWFpbmluZycsXHJcbiAgICAncmV2aWV3LnRyaWFnZVN0b3AnOiAnU3RvcCcsXHJcbiAgICAncmV2aWV3LnRyaWFnZURvbmUnOiAnVHJpYWdlIGRvbmU6IGNsb3NlZCB7YX0gZHVwbGljYXRlIFx1MDBCNyB7Yn0gb2Jzb2xldGUgXHUwMEI3IHtjfSBub24taXNzdWVzOyB7ZH0gcGVuZGluZyBrZXB0JyxcclxuICAgICdyZXZpZXcudHJpYWdlU3RvcHBlZCc6ICdUcmlhZ2Ugc3RvcHBlZCAoanVkZ2VkIGl0ZW1zIGFyZSBub3QgcmUtYmlsbGVkOyBjbGljayBhZ2FpbiB0byBjb250aW51ZSknLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VOb3RoaW5nJzogJ05vIHBlbmRpbmcgaXNzdWVzIHRvIHRyaWFnZSBmb3IgdGhlIHByb2plY3QgdGhpcyBzZXNzaW9uIHJlc29sdmVzIHRvIChpZiB0aGlzIGxvb2tzIHdyb25nLCBjaGVjayB0aGUgb3BlbiBzZXNzaW9uIGJlbG9uZ3MgdG8gdGhhdCBwcm9qZWN0KScsXHJcbiAgICAncmV2aWV3LnRyaWFnZVBhcnNlRmFpbCc6ICc7IG9uZSBiYXRjaCBmYWlsZWQgdG8gcGFyc2UgYW5kIHdhcyBrZXB0IGFzLWlzLCByZXRyeWFibGUnLFxyXG4gICAgJ3Jldmlldy5wdXJnZU9wZW4nOiAnXHVEODNEXHVEREQxIFB1cmdlIHBlbmRpbmcnLFxyXG4gICAgJ3Jldmlldy5wdXJnZU9wZW5IaW50JzogJ01hcmsgZXZlcnkgcGVuZGluZyBpc3N1ZSB1bmRlciB0aGUgY3VycmVudCBmaWx0ZXIgYXMgaGFuZGxlZCBpbiBvbmUgc2hvdCAobm8gY29kZSBjaGFuZ2VzKTsgYXV0by1wdXJnZWQgYWZ0ZXIgdGhlIHJldGVudGlvbiB3aW5kb3cnLFxyXG4gICAgJ3Jldmlldy5wdXJnZU9wZW5Db25maXJtVGl0bGUnOiAnUHVyZ2UgYWxsIHBlbmRpbmcgaXNzdWVzPycsXHJcbiAgICAncmV2aWV3LnB1cmdlT3BlbkNvbmZpcm1Nc2cnOiAnV2lsbCBtYXJrIHtufSBwZW5kaW5nIGlzc3VlcyBhcyBcImhhbmRsZWRcIiBcdTIwMTQgbm8gY29kZSBpcyBtb2RpZmllZCwgb25seSB0aGUgbGlzdCBlbnRyaWVzIGFyZSBjbG9zZWQuIFJlc29sdmVkL3JlamVjdGVkIGlzc3VlcyBhcmUgdW50b3VjaGVkLiBOb3Qgb25lLWNsaWNrIHVuZG9hYmxlLCBidXQgZWFjaCBpc3N1ZSBjYW4gYmUgc2V0IGJhY2sgdG8gcGVuZGluZyBvbiBpdHMgY2FyZC4nLFxyXG4gICAgJ3Jldmlldy5wdXJnZU9wZW5Eb25lJzogJ1x1NURGMlx1NkUwNVx1N0E3QSB7bn0gXHU2NzYxXHU2NzJBXHU4OUUzXHU1MUIzXHU5NUVFXHU5ODk4XHVGRjA4XHU3RjZFXHU0RTNBXHU1REYyXHU1OTA0XHU3NDA2XHVGRjA5JyxcclxuICAgICdyZXZpZXcuaGFuZGxlZERvbmUnOiAne259IGlzc3VlcyBtYXJrZWQgYXMgaGFuZGxlZCcsXHJcbiAgICAnZml4LnBsYW4nOiAnRml4IHBsYW4nLFxyXG4gICAgJ2ZpeC5wbGFuQXBwcm9hY2gnOiAnQXBwcm9hY2gnLFxyXG4gICAgJ2ZpeC5wbGFuSW1wYWN0JzogJ0ltcGFjdCcsXHJcbiAgICAnZml4LnBsYW5CZW5lZml0JzogJ0JlbmVmaXQnLFxyXG4gICAgJ2ZpeC5wbGFuUmlzayc6ICdSaXNrJyxcclxuICAgICdmaXguZGlzcGF0Y2gnOiAnRGlzcGF0Y2ggZml4ZXMnLFxyXG4gICAgJ2ZpeC5kaXNwYXRjaEhpbnRNYWluJzogJ0Rpc3BhdGNoIHRoZSBjaGVja2VkIHBlbmRpbmcgaXNzdWVzICh1bmNoZWNrZWQgPSBhbGwgdW5kZXIgdGhlIGN1cnJlbnQgZmlsdGVyKSB0byBjb25jdXJyZW50IHN1Yi1hZ2VudHM6IGF1dG8gZml4ID0gdGhyZWUtZ2F0ZSB2ZXJpZnkgKyBmaXggKyB3cml0ZS1iYWNrICsgY29tbWl0OyBwbGFuIGZpcnN0ID0gcmVhZC1vbmx5IHN0cnVjdHVyZWQgcGxhbnMgYXdhaXRpbmcgeW91ciBhcHByb3ZhbCcsXHJcbiAgICAnZml4LmRpc3BhdGNoTW9kZVRpdGxlJzogJ0Rpc3BhdGNoIGZpeGVzIFx1MjAxNCBwaWNrIGEgbW9kZScsXHJcbiAgICAnZml4LmRpc3BhdGNoTW9kZU1zZyc6ICdXaWxsIGRpc3BhdGNoIHtufSBwZW5kaW5nIGlzc3VlcyB0byBjb25jdXJyZW50IHN1Yi1hZ2VudHMgKG9uZSB3b3JrdHJlZSBwZXIgdGFzaywgY29uc3VtZXMgbW9kZWwgdXNhZ2UsIGRvZXMgbm90IHVzZSB0aGUgY2hhdCB3aW5kb3cpLiBcdTI2QTEgQXV0byBmaXg6IHRocmVlLWdhdGUgdmVyaWZ5ICsgZml4ICsgd3JpdGUtYmFjayArIGNvbW1pdDsgZmFsc2UgcG9zaXRpdmVzL2R1cGxpY2F0ZXMvb2Jzb2xldGUgYXJlIGF1dG8tY2xvc2VkLiBcdUQ4M0RcdURDQ0IgUGxhbiBmaXJzdDogcmVhZC1vbmx5IHN0cnVjdHVyZWQgcGxhbnMsIG5vIGNvZGUgY2hhbmdlczsgYXBwcm92ZSB0aGVtIG9uIHRoZSBpc3N1ZSBjYXJkLCB0aGVuIHByZXNzIFwiRGlzcGF0Y2ggYXBwcm92ZWQgcGxhbnNcIi4nLFxyXG4gICAgJ2ZpeC5kaXNwYXRjaEF1dG8nOiAnXHUyNkExIEF1dG8gZml4JyxcclxuICAgICdmaXguZGlzcGF0Y2hQbGFuJzogJ1x1RDgzRFx1RENDQiBQbGFuIGZpcnN0JyxcclxuICAgICdmaXguZGlzcGF0Y2hOb09wZW4nOiAnTm8gcGVuZGluZyBpc3N1ZXMgdW5kZXIgdGhlIGN1cnJlbnQgZmlsdGVyIHRvIGRpc3BhdGNoJyxcclxuICAgICdmaXguZGlzcGF0Y2hQbGFucyc6ICdEaXNwYXRjaCBhcHByb3ZlZCBwbGFucycsXHJcbiAgICAnZml4LmRpc3BhdGNoUGxhbnNIaW50JzogJ0Rpc3BhdGNoIHRoZSBhcHByb3ZlZCBwZW5kaW5nIHBsYW5zIHRvIGNvbmN1cnJlbnQgc3ViLWFnZW50IGZpeGVzIChvbmUgd29ya3RyZWUgcGVyIHRhc2s7IGNvbmZsaWN0cyBhdXRvLXJlZG8gb24gbGF0ZXN0IEhFQUQpJyxcclxuICAgICdmaXguZGlzcGF0Y2hEb25lJzogJ1x1NURGMlx1NkQzRVx1NTNEMSB7bn0gXHU0RTJBXHU0RkVFXHU1OTBEXHU0RUZCXHU1MkExXHVGRjA4XHU1RTc2XHU1M0QxIHtjfVx1RkYwOScsXHJcbiAgICAnZml4LmRpc3BhdGNoRW1wdHknOiAnXHU2Q0ExXHU2NzA5XHU1M0VGXHU2RDNFXHU1M0QxXHU3Njg0XHU0RUZCXHU1MkExXHVGRjA4XHU1MkZFXHU5MDA5XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHU2MjE2XHU3QjQ5XHU1Rjg1XHU2NUI5XHU2ODQ4XHU0RUE3XHU1MUZBXHVGRjA5JyxcclxuICAgICdmaXguc3RhdHVzJzogJ1x1NEZFRVx1NTkwRFx1NjI2N1x1ODg0QycsXHJcbiAgICAnZml4LnN0b3AnOiAnXHU1MDVDXHU2QjYyJyxcclxuICAgICdmaXguc3RvcERvbmUnOiAnXHU1REYyXHU1MDVDXHU2QjYyIHtufSBcdTRFMkFcdTRGRUVcdTU5MERcdTRFRkJcdTUyQTEnLFxyXG4gICAgJ2ZpeC50YXNrUXVldWVkJzogJ1x1NjM5Mlx1OTYxRlx1NEUyRCcsXHJcbiAgICAnZml4LnRhc2tSdW5uaW5nJzogJ1x1OEZEMFx1ODg0Q1x1NEUyRCcsXHJcbiAgICAnZml4LnRhc2tNZXJnaW5nJzogJ1x1NTQwOFx1NUU3Nlx1NEUyRCcsXHJcbiAgICAnZml4LnRhc2tSZWRvJzogJ1x1OTFDRFx1NTA1QVx1NEUyRCcsXHJcbiAgICAnZml4LnRhc2tEb25lJzogJ1x1NURGMlx1NUI4Q1x1NjIxMCcsXHJcbiAgICAnZml4LnRhc2tDb25mbGljdCc6ICdcdTUxQjJcdTdBODEnLFxyXG4gICAgJ2ZpeC50YXNrRmFpbGVkJzogJ1x1NTkzMVx1OEQyNScsXHJcbiAgICAnZml4LnRhc2tDYW5jZWxsZWQnOiAnXHU1REYyXHU1MDVDXHU2QjYyJyxcclxuICAgICdmaXguYXR0ZW1wdCc6ICdcdTdCMkMge259IFx1NkIyMScsXHJcbiAgICAnZml4LnJ1bnRpbWUnOiAnXHU1REYyXHU4RkQwXHU4ODRDIHtufSBcdTUyMDYnLFxyXG4gICAgJ2ZpeC5yZXN1bWVzJzogJ1x1N0VFRFx1OEREMSB7bn0nLFxyXG4gICAgJ2ZpeC5wcm9iZXMnOiAnXHU2M0EyXHU2RDNCIHtufScsXHJcbiAgICAnZml4Lm1vZGVsVGl0bGUnOiAnXHU0RkVFXHU1OTBEXHU1RTc2XHU1M0QxXHVGRjA4XHU1QjUwIEFnZW50IFx1NkM2MFx1RkYwOScsXHJcbiAgICAnZml4Lm1vZGVsSGludCc6ICdcdTU0MENcdTY1RjZcdTYyNjdcdTg4NENcdTc2ODRcdTRGRUVcdTU5MERcdTVCNTAgQWdlbnQgXHU0RTBBXHU5NjUwXHVGRjA4MS0xMFx1RkYwOVx1MzAwMlx1NkJDRlx1NEVGQlx1NTJBMVx1NzJFQ1x1N0FDQiB3b3JrdHJlZSBcdTRFOTJcdTRFMERcdTVFNzJcdTYyNzBcdTMwMDInLFxyXG5cclxuICAgICdwbGFuLnRpdGxlJzogJ09yY2hlc3RyYXRpb24gcGxhbicsXHJcbiAgICAncGxhbi5oaW50JzogJ0VhY2ggc3RlcCByb2xlIGRyaXZlcyBjb250ZXh0IGluamVjdGlvbiBhbmQgdGhlIGRlZmF1bHQgbW9kZWwgKGFuYWx5c2lzL29wcz1mYXN0LCBjb2Rpbmc9c3RhbmRhcmQsIHBsYW5uaW5nPXJlYXNvbmluZywgdmVyaWZpY2F0aW9uPXZlcmlmaWVyKTsgYWRqdXN0IGJlZm9yZSBsYXVuY2hpbmcuJyxcclxuICAgICdwbGFuLmNvbC5zdGVwJzogJ1N0ZXAnLCAncGxhbi5jb2wucm9sZSc6ICdSb2xlJywgJ3BsYW4uY29sLm1vZGVsJzogJ01vZGVsJywgJ3BsYW4uY29sLnBvbGljeSc6ICdGYWlsdXJlIHBvbGljeScsICdwbGFuLmNvbC5lbmFibGVkJzogJ09uJywgJ3BsYW4uY29sLmF0dGVtcHRzJzogJ0F0dGVtcHRzJyxcclxuICAgICdwbGFuLm1vZGVsRGVmYXVsdCc6ICdSb2xlIGRlZmF1bHQnLFxyXG4gICAgJ3BsYW4ubGF1bmNoRWRpdGVkJzogJ1NhdmUgZWRpdHMgJiBsYXVuY2gnLFxyXG4gICAgJ3BsYW4ubGF1bmNoRGlyZWN0JzogJ0xhdW5jaCBhcy1pcycsXHJcbiAgICAncGxhbi5kaXNjYXJkJzogJ0Rpc2NhcmQnLFxyXG4gICAgJ3BsYW4udmlld0RldGFpbCc6ICdEZXRhaWwnLCAncGxhbi5yZWZyZXNoRGV0YWlsJzogJ1JlZnJlc2gnLCAncGxhbi5jbG9zZURldGFpbCc6ICdDbG9zZScsXHJcbiAgICAncGxhbi5kZXRhaWxUaXRsZSc6ICdSdW4gZGV0YWlsJyxcclxuICAgICdwbGFuLnBhdXNlZEJhbm5lcic6ICdSdW4gcGF1c2VkLCBhd2FpdGluZyB5b3VyIGRlY2lzaW9uJyxcclxuICAgICdwbGFuLnJlc3VtZVJldHJ5JzogJ1JldHJ5IHN0ZXAgJiBjb250aW51ZScsXHJcbiAgICAncGxhbi5yZXN1bWVTa2lwJzogJ1NraXAgc3RlcCAmIGNvbnRpbnVlJyxcclxuICAgICdwbGFuLnJlc3VtZUZhaWxlZCc6ICdSZXN1bWUgZnJvbSBmYWlsdXJlJyxcclxuICAgICdwbGFuLmNvbnRleHRUaXRsZSc6ICdSdW4gY29udGV4dCAod2hhdCB3YXMgaW5qZWN0ZWQpJyxcclxuICAgICdwbGFuLmJyYW5jaCc6ICdCcmFuY2gnLCAncGxhbi5pbmplY3RlZE1lbW9yaWVzJzogJ0luamVjdGVkIG1lbW9yaWVzJywgJ3BsYW4uZGVjaXNpb25Mb2cnOiAnRGVjaXNpb24gbG9nJyxcclxuICAgICdleGVjLmNvbC5kZXRhaWwnOiAnRGV0YWlsJyxcclxuXHJcbiAgICAnc2NoZWQudGl0bGUnOiAnU2NoZWR1bGVkIHRhc2tzJyxcclxuICAgICdzY2hlZC5mb3JtTmFtZSc6ICdUYXNrIG5hbWUnLCAnc2NoZWQuZm9ybUludGVydmFsJzogJ0ludGVydmFsIChtaW51dGVzKScsXHJcbiAgICAnc2NoZWQudHlwZVJldmlldyc6ICdBdXRvIHJldmlldycsICdzY2hlZC50eXBlU3VtbWFyeSc6ICdBSSBzdW1tYXJ5JywgJ3NjaGVkLnR5cGVSdW4nOiAnVGltZWQgcnVuJyxcclxuICAgICdzY2hlZC5hZGQnOiAnQ3JlYXRlJyxcclxuICAgICdzY2hlZC5oaW50JzogJ1J1bnMgYXV0b21hdGljYWxseSB3aGVuIGR1ZTogYXV0byByZXZpZXcgPSByZXZpZXcgY29tbWl0cyBmcm9tIHRoZSBsYXN0IDI0aCAoaXNzdWVzIGxhbmQgaW4gdGhlIFJldmlldyB0YWIpOyBBSSBzdW1tYXJ5ID0gaW5jcmVtZW50YWwgbGVhcm5pbmcgc3VtbWFyeTsgdGltZWQgcnVuID0gZXhlY3V0ZSB0aGUgdGVtcGxhdGUgYXMgYW4gb3JjaGVzdHJhdGVkIHRhc2suIE1pbmltdW0gMSBtaW51dGUuJyxcclxuICAgICdzY2hlZC5lbXB0eSc6ICdObyBzY2hlZHVsZWQgdGFza3MgeWV0LicsXHJcbiAgICAnc2NoZWQuY29sLm5hbWUnOiAnTmFtZScsICdzY2hlZC5jb2wudHlwZSc6ICdUeXBlJywgJ3NjaGVkLmNvbC5pbnRlcnZhbCc6ICdDeWNsZScsICdzY2hlZC5jb2wubmV4dCc6ICdOZXh0IHJ1bicsICdzY2hlZC5jb2wubGFzdFJlc3VsdCc6ICdMYXN0IHJlc3VsdCcsICdzY2hlZC5jb2wuYWN0aW9ucyc6ICdBY3Rpb25zJyxcclxuICAgICdzY2hlZC5kYXknOiAnIGQnLCAnc2NoZWQuaG91cic6ICcgaCcsICdzY2hlZC5taW51dGUnOiAnIG1pbicsXHJcbiAgICAnc2NoZWQuZGlzYWJsZSc6ICdQYXVzZScsICdzY2hlZC5lbmFibGUnOiAnRW5hYmxlJywgJ3NjaGVkLnJ1bk5vdyc6ICdSdW4gbm93JyxcclxuXHJcbiAgICAnbWVtb3J5LnpvbmVUaXRsZSc6ICdQcm9qZWN0IG1lbW9yeScsXHJcbiAgICAnbWVtb3J5LnN5bmNCYXNlbGluZSc6ICdTeW5jIGJhc2VsaW5lJywgJ21lbW9yeS5zeW5jTm9uZSc6ICduZXZlciBzeW5jZWQnLFxyXG4gICAgJ21lbW9yeS5iZWhpbmQnOiAne259IGNvbW1pdHMgYmVoaW5kJyxcclxuICAgICdtZW1vcnkuc3luYyc6ICdTeW5jIG1lbW9yeScsICdtZW1vcnkuc3luY2luZyc6ICdTeW5jaW5nXHUyMDI2JywgJ21lbW9yeS5zeW5jRmFpbGVkJzogJ1N5bmMgZmFpbGVkJyxcclxuICAgICdtZW1vcnkuc3RhbGVUaXRsZSc6ICdQb3NzaWJseSBzdGFsZSAocmVsYXRlZCBjb2RlIGNoYW5nZWQ7IHJldmlldyBuZWVkZWQpJyxcclxuICAgICdtZW1vcnkubWFya1N0YWxlJzogJ01hcmsgc3RhbGUnLCAnbWVtb3J5LmFyY2hpdmVCdG4nOiAnQXJjaGl2ZScsICdtZW1vcnkua2VlcEFjdGl2ZSc6ICdTdGlsbCB2YWxpZCcsXHJcbiAgICAnbWVtb3J5Lm5ld0NhbmRpZGF0ZXMnOiAnTmV3IGNhbmRpZGF0ZXMgKHF1ZXVlZCBmb3IgY29uZmlybWF0aW9uKTonLFxyXG4gICAgJ21lbW9yeS5jbG9zZVJlcG9ydCc6ICdDbG9zZSByZXBvcnQnLFxyXG4gICAgJ21lbW9yeS5zY29wZVByb2plY3QnOiAnTWFpbmxpbmUgKGFsbCBicmFuY2hlcyknLCAnbWVtb3J5LnNjb3BlQnJhbmNoJzogJ0N1cnJlbnQgYnJhbmNoIG9ubHknLFxyXG4gICAgJ21lbW9yeS5wZW5kaW5nUXVldWUnOiAnUGVuZGluZyBjb25maXJtYXRpb24nLFxyXG4gICAgJ21lbW9yeS50b05vdGUnOiAnVG8gbm90ZScsICdtZW1vcnkubm9ybWFsaXplJzogJ05vcm1hbGl6ZSB0byBtYWlubGluZScsICdtZW1vcnkucmVzdG9yZSc6ICdSZXN0b3JlJyxcclxuICAgICdtZW1vcnkuc3RhdHVzU3RhbGUnOiAnU3RhbGUnLFxyXG4gICAgJ2ZzLmJyb3dzZSc6ICdCcm93c2UnLFxyXG4gICAgJ2ZzLnVwJzogJ1VwJyxcclxuICAgICdmcy51c2UnOiAnVXNlIHRoaXMgZGlyZWN0b3J5JyxcclxuICAgICdmcy5yZWdpc3Rlcic6ICdBbHNvIHJlZ2lzdGVyIGFzIHNlc3Npb24gd29ya3NwYWNlJyxcclxuICAgICdmcy5sb2FkaW5nJzogJ1JlYWRpbmdcdTIwMjYnLFxyXG4gICAgJ2ZzLmVtcHR5JzogJ05vIHN1YmRpcmVjdG9yaWVzLicsXHJcbiAgICAnaW1wYWN0LmZ1bmN0aW9uc05vbmUnOiAnTm8gZnVuY3Rpb24tbGV2ZWwgY2FsbCBpbXBhY3QgZGV0ZWN0ZWQgKHN0eWxlL2Fzc2V0L2NvbmZpZy1vbmx5IGNoYW5nZSkuJyxcclxuICAgICdyZXZpZXcuY29sLnNldmVyaXR5JzogJ1NldmVyaXR5JyxcclxuICAgICdyZXZpZXcuY29sLmNhdGVnb3J5JzogJ0NhdGVnb3J5JyxcclxuICAgICdyZXZpZXcuY29sLnRpdGxlJzogJ0lzc3VlJyxcclxuICAgICdyZXZpZXcuY29sLmV2aWRlbmNlJzogJ0xvY2F0aW9uJyxcclxuICAgICdyZXZpZXcuY29sLmZpeCc6ICdTdWdnZXN0ZWQgZml4JyxcclxuICAgICdyZXZpZXcuaGludCc6ICdDbGljayB0aGUgYnV0dG9uIGFib3ZlIHRvIHByb2R1Y2UgdGhlIG9wdGltYWxpdHkgdmVyZGljdCBhbmQgaXNzdWUgbGlzdC4nLFxyXG4gICAgJ2RpZmYuc2hvdyc6ICdEaWZmJyxcclxuICAgICdkaWZmLmhpZGUnOiAnSGlkZSBkaWZmJyxcclxuXHJcbiAgICAnZGV0YWlsLnRpdGxlJzogJ1JldmlldyBkZXRhaWwnLFxyXG4gICAgJ2RldGFpbC5waWNrJzogJ1x1MjE5MCBQaWNrIGEgY29tbWl0IChvciB0aGUgdW5jb21taXR0ZWQgY2hhbmdlcykgb24gdGhlIGxlZnQgdG8gc3RhcnQgcmV2aWV3aW5nJyxcclxuICAgICdkZXRhaWwud2hhdCc6ICdXaGF0IGl0IGRvZXMnLFxyXG4gICAgJ2RldGFpbC5sb2dpYyc6ICdJbXBsZW1lbnRhdGlvbiBsb2dpYycsXHJcbiAgICAnZGV0YWlsLnJpc2snOiAnUmlza3MnLFxyXG4gICAgJ2RldGFpbC5maWxlcyc6ICdGaWxlcycsXHJcbiAgICAnZGV0YWlsLnBhdGNoJzogJ1Nob3cgcmF3IHBhdGNoJyxcclxuICAgICdkZXRhaWwuYWlMb2FkaW5nJzogJ0dlbmVyYXRpbmcgQUkgZXhwbGFuYXRpb25cdTIwMjYgKDEwLTMwcyknLFxyXG4gICAgJ2RldGFpbC5xdWV1ZWQnOiAne259IGFuYWx5c2VzIHF1ZXVlZCAod2lsbCBydW4gY29uY3VycmVudGx5KScsXHJcbiAgICAnZGV0YWlsLmNhcmRRdWV1ZWQnOiAnV2FpdGluZyBpbiB0aGUgYW5hbHlzaXMgcXVldWUgKG1heCAzIGNvbmN1cnJlbnQgdG8gcHJvdGVjdCB0aGUgbW9kZWwgZ2F0ZXdheSknLFxyXG4gICAgJ2RldGFpbC5pbXBhY3QnOiAnSW1wYWN0IHNjb3BlJyxcclxuICAgICdkZXRhaWwuaW1wYWN0TG9hZGluZyc6ICdTY2FubmluZyBpbXBhY3RcdTIwMjYgKHJlZmVyZW5jZSBzZWFyY2ggKyBncmFwaCB3YWxrKScsXHJcbiAgICAnZGV0YWlsLm9wdGltYWxpdHknOiAnT3B0aW1hbGl0eSByZXZpZXcnLFxyXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZyc6ICdSZXZpZXdpbmdcdTIwMjYgKHByb2R1Y2VzIGlzc3VlIGxpc3QgYW5kIG9wdGltYWxpdHkgdmVyZGljdCknLFxyXG5cclxuICAgICdpbXBhY3Qucmlzayc6ICdSaXNrJyxcclxuICAgICdpbXBhY3QuY29sLmNoYW5nZWQnOiAnQ2hhbmdlZCBmaWxlcycsXHJcbiAgICAnaW1wYWN0LmNvbC5pbmRpcmVjdCc6ICdJbmRpcmVjdCAocmVmZXJlbmNlIGNoYWluKScsXHJcbiAgICAnaW1wYWN0LmNvbC5wb3RlbnRpYWwnOiAnUG90ZW50aWFsJyxcclxuICAgICdpbXBhY3Qubm9uZSc6ICdObyBpbi1yZXBvIHJlZmVyZW5jZXJzIGZvdW5kICh0aGUgY2hhbmdlIGxvb2tzIHNlbGYtY29udGFpbmVkKS4nLFxyXG4gICAgJ2ltcGFjdC50ZXN0cyc6ICdSZWxhdGVkIHRlc3RzJyxcclxuICAgICdpbXBhY3QubGVnZW5kLmNoYW5nZWQnOiAnY2hhbmdlZCcsXHJcbiAgICAnaW1wYWN0LmxlZ2VuZC5pbmRpcmVjdCc6ICdpbmRpcmVjdCcsXHJcbiAgICAnaW1wYWN0LmxlZ2VuZC5wb3RlbnRpYWwnOiAncG90ZW50aWFsJyxcclxuXHJcbiAgICAncmV2aWV3LnZlcmRpY3QnOiAnT3B0aW1hbGl0eSB2ZXJkaWN0JyxcclxuICAgICdyZXZpZXcuaXNzdWVzJzogJ0lzc3VlcycsXHJcbiAgICAncmV2aWV3LmNsZWFuJzogJ05vIGlzc3VlcyBmb3VuZC4nLFxyXG5cclxuICAgICdub3Rlcy50aXRsZSc6ICdSZXZpZXcgbm90ZXMnLFxyXG4gICAgJ25vdGVzLmZvcm1UaXRsZSc6ICdOb3RlIHRpdGxlJyxcclxuICAgICdub3Rlcy5mb3JtQ29udGVudCc6ICdOb3RlIGNvbnRlbnQgKGNvbmNsdXNpb25zLCBxdWVzdGlvbnMsIGxlYXJuaW5nc1x1MjAyNiknLFxyXG4gICAgJ25vdGVzLmFkZCc6ICdBZGQgbm90ZScsXHJcbiAgICAnbm90ZXMuYm91bmRUbyc6ICdXaWxsIGJlIGxpbmtlZCB0bycsXHJcbiAgICAnbm90ZXMuY29sLnRpbWUnOiAnVGltZScsXHJcbiAgICAnbm90ZXMuY29sLnRpdGxlJzogJ1RpdGxlJyxcclxuICAgICdub3Rlcy5jb2wuY29udGVudCc6ICdDb250ZW50JyxcclxuICAgICdub3Rlcy5jb2wuc2hhJzogJ0NvbW1pdCcsXHJcbiAgICAnbm90ZXMucmVtb3ZlJzogJ0RlbGV0ZScsXHJcbiAgICAnbm90ZXMuZW1wdHknOiAnTm8gbm90ZXMgeWV0LiBOb3RlIGRvd24gY29uY2x1c2lvbnMgYW5kIHF1ZXN0aW9ucyB3aGlsZSByZXZpZXdpbmcgY29tbWl0cyBcdTIwMTQgdGhhdCBpcyB5b3VyIHByb2plY3QgbGVhcm5pbmcgYXJjaGl2ZS4nLFxyXG5cclxuICAgICdtZW1vcnkucmVjb3JkJzogJ1JlY29yZCBwcm9qZWN0IG1lbW9yeScsXHJcbiAgICAnZm9ybS5tZW1vcnlUaXRsZSc6ICdNZW1vcnkgdGl0bGUnLFxyXG4gICAgJ2Zvcm0ubWVtb3J5Q29udGVudCc6ICdNZW1vcnkgY29udGVudCAod2hhdCBhbmQgd2h5KScsXHJcbiAgICAnbWVtb3J5LmNvbC50aXRsZSc6ICdJdGVtJyxcclxuICAgICdtZW1vcnkuY29sLnR5cGUnOiAnVHlwZScsXHJcbiAgICAnbWVtb3J5LmNvbC50cnV0aCc6ICdUcnV0aCcsXHJcbiAgICAnbWVtb3J5LmNvbC5icmFuY2gnOiAnQnJhbmNoJyxcclxuICAgICdtZW1vcnkuY29uZmlybSc6ICdDb25maXJtJyxcclxuICAgICdtZW1vcnkuZW1wdHknOiAnTm8gcHJvamVjdCBtZW1vcmllcyB5ZXQuIEFzayB0aGUgQUkgaW4gY2hhdCB0byByZWNvcmQgb25lLCBvciBhZGQgYWJvdmUuJyxcclxuICAgICdjb25jZXB0cy50aXRsZSc6ICdMZWFybmluZyBjb25jZXB0cycsXHJcbiAgICAnY29uY2VwdHMubm9uZSc6ICdObyBsZWFybmluZyBjb25jZXB0cyB5ZXQuIFRoZXkgYWNjdW11bGF0ZSBhZnRlciBzdWNjZXNzZnVsIGNoYW5nZSBydW5zLCBvciBhc2sgdGhlIEFJIHRvIHN1bW1hcml6ZSBsZWFybmluZyBwb2ludHMuJyxcclxuICAgICdjb25jZXB0cy5jb2wubmFtZSc6ICdDb25jZXB0JyxcclxuICAgICdjb25jZXB0cy5jb2wuY2F0ZWdvcnknOiAnQ2F0ZWdvcnknLFxyXG4gICAgJ2NvbmNlcHRzLmNvbC5jb3VudCc6ICdDb3VudCcsXHJcbiAgICAncmV2aWV3LnJlY29yZHNUaXRsZSc6ICdSZXZpZXcgaXNzdWVzJyxcclxuICAgICdyZXZpZXcucmVjb3Jkc0VtcHR5JzogJ05vIGlzc3VlIHJlY29yZHMgeWV0LiBJc3N1ZXMgZm91bmQgYnkgdGhlIGNvbW1pdC1yZXZpZXcgcGFnZSBhcmUgcmVjb3JkZWQgaGVyZSBhdXRvbWF0aWNhbGx5OyByZS1yZXZpZXdpbmcgcmVwbGFjZXMgb2xkIHJlY29yZHMuJyxcclxuICAgICd2ZXJpZnkucmVjb3Jkcyc6ICdWZXJpZmljYXRpb24gcmVjb3JkcycsXHJcbiAgICAndmVyaWZ5LnJlY29yZHNFbXB0eSc6ICdObyB2ZXJpZmljYXRpb24gcmVjb3JkcyB5ZXQuIENsaWNrIFwiVmVyaWZ5XCIgaW4gdGhlIGV4ZWN1dGlvbiB0YWIgdG8gZ2VuZXJhdGUgb25lLicsXHJcblxyXG4gICAgJ2NvbmZpcm1lZC50aXRsZSc6ICdDb25maXJtZWQgY29uc3RyYWludHMgKGh1bWFuLWNvbmZpcm1lZDsgQUkgZWRpdHMgdG8gZm9yYmlkZGVuIHBhdGhzIGFyZSBhdXRvLWRlbmllZCknLFxyXG4gICAgJ2NvbmZpcm1lZC5hZGQnOiAnQWRkIGNvbnN0cmFpbnQnLFxyXG4gICAgJ2NvbmZpcm1lZC50ZXh0JzogJ1JlcXVpcmVtZW50IC8gY29uc3RyYWludCB0ZXh0JyxcclxuICAgICdjb25maXJtZWQucGF0aHMnOiAnRm9yYmlkZGVuIHBhdGhzIChjb21tYSBzZXBhcmF0ZWQ7IHJlbGF0aXZlIHRvIHByb2plY3Qgcm9vdCBsaWtlIHNyYy9jb3JlLCBvciBhYnNvbHV0ZSknLFxyXG4gICAgJ2NvbmZpcm1lZC5ub25lJzogJ05vIGNvbnN0cmFpbnRzIHlldC4gT25jZSBhZGRlZCwgQUkgZWRpdHMgdG8gZm9yYmlkZGVuIHBhdGhzIGluIHRoaXMgcHJvamVjdCBhcmUgYXV0by1kZW5pZWQuJyxcclxuXHJcbiAgICAnY2hhbmdlcy50aXRsZSc6ICdDaGFuZ2UgdGFza3MnLFxyXG4gICAgJ3N0YXRlLm5vQ2hhbmdlcyc6ICdObyBjaGFuZ2UgdGFza3MgeWV0LiBBc2sgdGhlIEFJIGluIGNoYXQgdG8gY3JlYXRlIG9uZSwgb3IgdXNlIFwiQ3JlYXRlIGNoYW5nZVwiIGFib3ZlLicsXHJcbiAgICAnY2hhbmdlcy5jb2wudGl0bGUnOiAnVGl0bGUnLFxyXG4gICAgJ2NoYW5nZXMuY29sLnR5cGUnOiAnVHlwZScsXHJcbiAgICAnY2hhbmdlcy5jb2wuc3RhdHVzJzogJ1N0YXR1cycsXHJcbiAgICAnY2hhbmdlcy5jb2wudXBkYXRlZCc6ICdVcGRhdGVkJyxcclxuICAgICdleGVjLmNvbC5zdGF0dXMnOiAnU3RhdHVzJyxcclxuICAgICdleGVjLmNvbC5jaGFuZ2UnOiAnQ2hhbmdlJyxcclxuICAgICdleGVjLmNvbC5zdGFydGVkJzogJ1N0YXJ0ZWQnLFxyXG4gICAgJ2V4ZWMuY29sLmNvc3QnOiAnQ29zdCAoZXN0KScsXHJcbiAgICAnZXhlYy5hdHRlbXB0cyc6ICdBdHRlbXB0cycsXHJcbiAgICAnZXhlYy5oaW50JzogJ1J1bnMgKHN0YXJ0X3J1bikgYXJlIHN0YXJ0ZWQgZnJvbSBjaGF0OiBhZnRlciBhIHBsYW4gZXhpc3RzLCB0ZWxsIHRoZSBBSSB0byBcInN0YXJ0IHJ1biBmb3IgdGhlIGNoYW5nZVwiLiBUaGlzIHRhYiBzaG93cyBwcm9ncmVzcyBhbmQgcmVzdWx0cy4nLFxyXG4gICAgJ3N0YXRlLm5vUnVucyc6ICdObyBydW5zIHlldC4nLFxyXG4gICAgJ3N0YXRlLnRlY2hTdGFjayc6ICdUZWNoIHN0YWNrJyxcclxuICAgICdzdGF0ZS5zeW1ib2xzJzogJ0luZGV4ZWQgc3ltYm9scycsXHJcbiAgICAnc3RhdGUubWFuaWZlc3RzJzogJ01hbmlmZXN0cycsXHJcbiAgICAnc3RhdGUuZXZpZGVuY2UnOiAnRXZpZGVuY2UgZW50cmllcycsXHJcbiAgfSxcclxufSBhcyBjb25zdFxyXG5cclxuZnVuY3Rpb24gZmFsbGJhY2tUKGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuICBjb25zdCBkaWN0ID0gV09SS1NQQUNFX0RJQ1QuemggYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPlxyXG4gIHJldHVybiBkaWN0W2tleV0gPz8ga2V5XHJcbn1cclxuXHJcbi8qKiBcdTY0Q0RcdTRGNUNcdTdFRDNcdTY3OUNcdTRFQkFcdTYwMjdcdTUzMTZcdUZGMUFcdTI3MTMvXHUyNzE3ICsgXHU2ODA3XHU5MUNGXHU1QjU3XHU2QkI1XHU3Njg0XHU3RDI3XHU1MUQxXHU4ODRDXHVGRjA4XHU4REYzXHU4RkM3XHU1RDRDXHU1OTU3XHU1QkY5XHU4QzYxXHU0RTBFXHU1MzlGXHU1OUNCIEpTT05cdUZGMDlcdTMwMDIgKi9cclxuZnVuY3Rpb24gZm9ybWF0QWN0aW9uUmVzdWx0KGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogc3RyaW5nIHtcclxuICBjb25zdCBsaW5lczogc3RyaW5nW10gPSBbZGF0YVsnb2snXSA9PT0gZmFsc2UgPyAnXHUyNzE3JyA6ICdcdTI3MTMnXVxyXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGEpKSB7XHJcbiAgICBpZiAoa2V5ID09PSAnb2snKSBjb250aW51ZVxyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xyXG4gICAgICBsaW5lcy5wdXNoKGAke2tleX1cdUZGMUEke1N0cmluZyh2YWx1ZSkuc2xpY2UoMCwgMjAwKX1gKVxyXG4gICAgfVxyXG4gIH1cclxuICBpZiAobGluZXMubGVuZ3RoID09PSAxKSBsaW5lcy5wdXNoKCdcdTYyMTBcdTUyOUYnKVxyXG4gIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKVxyXG59XHJcblxyXG4vKiogTExNIFx1NjIxMFx1NjcyQ1x1RkYwOFx1NEYzMFx1RkYwOVx1NUZCRFx1NjgwN1x1RkYxQVx1NjVFMFx1NTAzQ1x1RkYwOFx1NjcyQVx1NEVBN1x1NzUxRlx1OEMwM1x1NzUyOCAvIFx1NjVFN1x1N0YxM1x1NUI1OFx1NEUwRFx1NUUyNlx1NjIxMFx1NjcyQ1x1RkYwOVx1NjVGNlx1OEZENFx1NTZERSBudWxsIFx1NEUwRFx1NTM2MFx1NEY0RFx1MzAwMiAqL1xyXG5mdW5jdGlvbiByZW5kZXJDb3N0QmFkZ2UodXNkOiBudW1iZXIgfCB1bmRlZmluZWQsIHRpdGxlOiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGUge1xyXG4gIGlmICh1c2QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGxcclxuICByZXR1cm4gPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOTQ5ZScpfSB0aXRsZT17dGl0bGV9Plx1MjI0OCR7dXNkLnRvRml4ZWQoNCl9PC9zcGFuPlxyXG59XHJcblxyXG5jb25zdCBzdHlsZXM6IFJlY29yZDxzdHJpbmcsIFJlYWN0LkNTU1Byb3BlcnRpZXM+ID0ge1xyXG4gIHJvb3Q6IHtcclxuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxyXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgZm9udEZhbWlseTogJ3ZhcigtLWRzLWZvbnQtc2FucywgaW5oZXJpdCknLFxyXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gIH0sXHJcbiAgbmF2OiB7XHJcbiAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgIGdhcDogJzRweCcsXHJcbiAgICBwYWRkaW5nOiAnOHB4IDEycHgnLFxyXG4gICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDEsIHJnYmEoNSw1LDUsMC4xKSknLFxyXG4gICAgZmxleDogJ25vbmUnLFxyXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXHJcbiAgfSxcclxuICB0aXRsZTogeyBmb250U2l6ZTogJzEzcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbklubGluZUVuZDogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSxcclxuICB0YWI6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XHJcbiAgICBwYWRkaW5nOiAnNXB4IDEycHgnLFxyXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcclxuICAgIGJvcmRlcjogJ25vbmUnLFxyXG4gICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICBmb250U2l6ZTogJzEycHgnLFxyXG4gICAgLy8gYnV0dG9uLWluZm8tZmlsbCBcdTRFMjRcdTRFM0JcdTk4OThcdTkwRkRcdTg0RERcdUZGMUJicmFuZC1wcmltYXJ5IFx1NTcyOFx1NkRGMVx1ODI3Mlx1NEUzQlx1OTg5OFx1NjYyRlx1OEZEMVx1NzY3RFx1ODI3Mlx1RkYwQ1x1NzY3RFx1NUI1N1x1NEYxQVx1ODhBQlx1NTQxRVx1NjM4OVx1RkYwOFx1OTg3NVx1N0I3RVx1NzY3RFx1NTc1N1x1NEU4Qlx1NjU0NVx1RkYwOVx1MzAwMlxyXG4gICAgYmFja2dyb3VuZDogYWN0aXZlID8gJ3ZhcigtLWRzdy1hbGlhcy1idXR0b24taW5mby1maWxsLCAjMjU2M2ViKScgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgY29sb3I6IGFjdGl2ZSA/ICcjZmZmJyA6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsXHJcbiAgfSksXHJcbiAgYm9keTogeyBmbGV4OiAxLCBvdmVyZmxvd1k6ICdhdXRvJywgcGFkZGluZzogJzE0cHggMTZweCcgfSxcclxuICBjYXJkOiB7XHJcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgIHBhZGRpbmc6ICcxMnB4IDE0cHgnLFxyXG4gICAgbWFyZ2luQm90dG9tOiAnMTJweCcsXHJcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJyxcclxuICB9LFxyXG4gIHJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzE4cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBmb250U2l6ZTogJzEycHgnLCBtYXJnaW46ICc2cHggMCcgfSxcclxuICBsYWJlbDogeyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luSW5saW5lRW5kOiAnNnB4JyB9LFxyXG4gIHRhYmxlOiB7IHdpZHRoOiAnMTAwJScsIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLCBmb250U2l6ZTogJzEycHgnIH0sXHJcbiAgdGg6IHsgdGV4dEFsaWduOiAnc3RhcnQnLCBwYWRkaW5nOiAnNnB4IDhweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwxLCByZ2JhKDUsNSw1LDAuMSkpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGZvbnRXZWlnaHQ6IDUwMCB9LFxyXG4gIHRkOiB7IHBhZGRpbmc6ICc2cHggOHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDMsIHJnYmEoNSw1LDUsMC4wNikpJyB9LFxyXG4gIGVtcHR5OiB7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250U2l6ZTogJzEycHgnLCBwYWRkaW5nOiAnMTBweCA0cHgnIH0sXHJcbiAgYnV0dG9uOiB7XHJcbiAgICBwYWRkaW5nOiAnNXB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAvLyBidXR0b24taW5mby1maWxsIFx1NjYyRlx1NUJCRlx1NEUzQlx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1NEUwQlx1OTBGRFx1NEUzQVx1ODRERFx1ODI3Mlx1MzAwMVx1NzY3RFx1NUI1N1x1NTNFRlx1OEJGQlx1NzY4NFx1NEUzQlx1NjRDRFx1NEY1Q1x1ODI3Mlx1RkYwOGJyYW5kLXByaW1hcnkgXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RTBEXHU1M0VGXHU4QkZCXHVGRjA5XHUzMDAyXHJcbiAgICBmb250U2l6ZTogJzExcHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpJywgY29sb3I6ICcjZmZmJyxcclxuICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxyXG4gIH0sXHJcbiAgc2Vjb25kYXJ5OiB7XHJcbiAgICBwYWRkaW5nOiAnNXB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICcxMXB4JyxcclxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXHJcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXHJcbiAgfSxcclxuICBpbnB1dDoge1xyXG4gICAgd2lkdGg6ICcxMDAlJywgcGFkZGluZzogJzZweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgZm9udFNpemU6ICcxMnB4JyxcclxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXHJcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXHJcbiAgfSxcclxuICBmb3JtUm93OiB7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogJzZweCcsIG1hcmdpbkJvdHRvbTogJzhweCcgfSxcclxuICBmb3JtSW5saW5lOiB7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzhweCcgfSxcclxuICAvLyBzZWxlY3QgXHU3NTI4XHU3Q0ZCXHU3RURGXHU1OTE2XHU4OUMyXHU2NUY2IFdpbmRvd3MgXHU2RDQ1XHU4MjcyXHU2QTIxXHU1RjBGXHU0RTBCXHU1RjNBXHU1MjM2XHU3NjdEXHU1RTk1XHVGRjBDXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU0RTBCXHU0RTBEXHU1M0VGXHU4QkZCXHUyMDE0XHUyMDE0XHU4MUVBXHU3RUQ4XHU1OTE2XHU4OUMyXHU4RDcwXHU0RTNCXHU5ODk4XHU1M0Q4XHU5MUNGXHUzMDAyXHJcbiAgc2VsZWN0OiB7XHJcbiAgICBhcHBlYXJhbmNlOiAnbm9uZScsIFdlYmtpdEFwcGVhcmFuY2U6ICdub25lJyxcclxuICAgIHBhZGRpbmc6ICc2cHggMjZweCA2cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTJweCcsXHJcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxyXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcclxuICAgIGJhY2tncm91bmRJbWFnZTogJ3VybChcImRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LDxzdmcgeG1sbnM9JTIyaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmclMjIgd2lkdGg9JTIyMTAlMjIgaGVpZ2h0PSUyMjYlMjI+PHBhdGggZD0lMjJNMSAxbDQgNCA0LTQlMjIgc3Ryb2tlPSUyMiUyMzg4OCUyMiBzdHJva2Utd2lkdGg9JTIyMS41JTIyIGZpbGw9JTIybm9uZSUyMi8+PC9zdmc+XCIpJyxcclxuICAgIGJhY2tncm91bmRSZXBlYXQ6ICduby1yZXBlYXQnLCBiYWNrZ3JvdW5kUG9zaXRpb246ICdyaWdodCA4cHggY2VudGVyJyxcclxuICAgIGN1cnNvcjogJ3BvaW50ZXInLCBib3hTaXppbmc6ICdib3JkZXItYm94JywgbWF4V2lkdGg6ICcxMDAlJyxcclxuICB9LFxyXG4gIGFjdGlvblJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9LFxyXG4gIHJlc3VsdDoge1xyXG4gICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS42LFxyXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXHJcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnMTBweCAxMnB4JywgbWF4SGVpZ2h0OiAnMzIwcHgnLCBvdmVyZmxvd1k6ICdhdXRvJyxcclxuICB9LFxyXG4gIGJhZGdlOiAoY29sb3I6IHN0cmluZyk6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4ge1xyXG4gICAgY29uc3QgcmdiID0gcGFyc2VDb2xvcihjb2xvcilcclxuICAgIGlmIChyZ2IgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHsgZGlzcGxheTogJ2lubGluZS1ibG9jaycsIHBhZGRpbmc6ICcxcHggOHB4JywgYm9yZGVyUmFkaXVzOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JywgYmFja2dyb3VuZDogYCR7Y29sb3J9MjJgLCBjb2xvciB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBbciwgZywgYl0gPSByZ2JcclxuICAgIC8vIFx1NUU5NVx1ODI3Mlx1N0VERlx1NEUwMCAxNiUgXHU4MjcyXHU4QzAzXHVGRjFCXHU2NTg3XHU1QjU3XHU4MjcyXHU0RTNCXHU5ODk4XHU4MUVBXHU5MDAyXHU1RTk0XHVGRjA4XHU2RDQ1XHU4MjcyXHU2REYxXHU1MzE2XHU1MjMwXHU3NjdEXHU1RTk1XHU1M0VGXHU4QkZCXHVGRjA5XHUzMDAyXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgcGFkZGluZzogJzFweCA4cHgnLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnLFxyXG4gICAgICBiYWNrZ3JvdW5kOiBgcmdiYSgke3J9LCAke2d9LCAke2J9LCAwLjE2KWAsXHJcbiAgICAgIGNvbG9yOiB0aGVtZUF3YXJlVGV4dChjb2xvciksXHJcbiAgICB9XHJcbiAgfSxcclxuICBzZWN0aW9uVGl0bGU6IHsgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEycHgnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH0sXHJcbiAgd2hhdDogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjcsIG1hcmdpbjogJzRweCAwIDhweCcgfSxcclxuICBsb2dpY1N0ZXA6IHsgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS44LCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcgfSxcclxuICByaXNrSXRlbTogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjcsIG1hcmdpbjogJzJweCAwJyB9LFxyXG4gIGNvbW1pdFJvdzogKGFjdGl2ZTogYm9vbGVhbik6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4gKHtcclxuICAgIHBhZGRpbmc6ICc4cHggMTBweCcsXHJcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxyXG4gICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICBib3JkZXI6IGFjdGl2ZSA/ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyA6ICcxcHggc29saWQgdHJhbnNwYXJlbnQnLFxyXG4gICAgYmFja2dyb3VuZDogYWN0aXZlID8gJ3JnYmEoMzcsOTksMjM1LDAuMDYpJyA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICBtYXJnaW5Cb3R0b206ICc0cHgnLFxyXG4gIH0pLFxyXG4gIGNvbW1pdFN1YmplY3Q6IHsgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwLCBsaW5lSGVpZ2h0OiAxLjUsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9LFxyXG4gIGNvbW1pdE1ldGE6IHsgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpblRvcDogJzJweCcsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JyB9LFxyXG4gIHBhdGNoOiB7XHJcbiAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4JywgbGluZUhlaWdodDogMS41LCB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnLFxyXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXHJcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnMTBweCcsIG1heEhlaWdodDogJzMyMHB4Jywgb3ZlcmZsb3dZOiAnYXV0bycsXHJcbiAgfSxcclxuICB0ZXh0YXJlYToge1xyXG4gICAgd2lkdGg6ICcxMDAlJywgcGFkZGluZzogJzhweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgZm9udFNpemU6ICcxMnB4JyxcclxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXHJcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsIHJlc2l6ZTogJ3ZlcnRpY2FsJywgbGluZUhlaWdodDogMS43LCBmb250RmFtaWx5OiAnaW5oZXJpdCcsXHJcbiAgfSxcclxuICBub3RlQ2FyZDoge1xyXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknLFxyXG4gICAgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzEycHggMTRweCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnLFxyXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXHJcbiAgfSxcclxuICBub3RlVGl0bGVSb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsIGdhcDogJzhweCcgfSxcclxuICBub3RlVGl0bGVUZXh0OiB7IGZvbnRTaXplOiAnMTNweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbGluZUhlaWdodDogMS41IH0sXHJcbiAgbm90ZUNvbnRlbnQ6IHtcclxuICAgIGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuODUsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLXdvcmQnLFxyXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLCBtYXJnaW5Ub3A6ICc2cHgnLFxyXG4gIH0sXHJcbiAgbm90ZUNsYW1wOiB7XHJcbiAgICBkaXNwbGF5OiAnLXdlYmtpdC1ib3gnLCBXZWJraXRMaW5lQ2xhbXA6IDYsIFdlYmtpdEJveE9yaWVudDogJ3ZlcnRpY2FsJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gIH0sXHJcbiAgbm90ZU1ldGE6IHtcclxuICAgIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc4cHgnLFxyXG4gICAgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsXHJcbiAgfSxcclxuICBsaW5rQnRuOiB7XHJcbiAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICcxMXB4JywgcGFkZGluZzogJzAnLFxyXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLFxyXG4gIH0sXHJcbiAgY2hpcDogKGFjdGl2ZTogYm9vbGVhbik6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4gKHtcclxuICAgIHBhZGRpbmc6ICcycHggMTBweCcsIGJvcmRlclJhZGl1czogJzk5OXB4JywgZm9udFNpemU6ICcxMXB4JywgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxyXG4gICAgLy8gXHU1NDBDIHRhYlx1RkYxQWFjdGl2ZSBcdTU4NkJcdTgyNzJcdTRFMDBcdTVGOEIgYnV0dG9uLWluZm8tZmlsbFx1RkYwOFx1NEUyNFx1NEUzQlx1OTg5OFx1OTBGRFx1ODRERFx1RkYwOVx1RkYwQ1x1Nzk4MVx1NzUyOCBicmFuZC1wcmltYXJ5XHUzMDAyXHJcbiAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyAndmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpJyA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICBjb2xvcjogYWN0aXZlID8gJyNmZmYnIDogJ2luaGVyaXQnLFxyXG4gIH0pLFxyXG59XHJcblxyXG4vKiogXHU5OENFXHU5NjY5XHU3QjQ5XHU3RUE3IFx1MjE5MiBcdTVGQkRcdTdBRTBcdTk4OUNcdTgyNzJcdTMwMDIgKi9cclxuY29uc3QgUklTS19DT0xPUjogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgbG93OiAnIzRlYzliMCcsIG1lZGl1bTogJyNkY2RjYWEnLCBoaWdoOiAnI2NlOTE3OCcsIGNyaXRpY2FsOiAnI2YxNGM0YycgfVxyXG5cclxuLyoqXHJcbiAqIFx1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNCBTVkcgXHU2RDQxXHU3QTBCXHU1NkZFXHVGRjFBXHU0RTA5XHU1MjE3XHU1MjA2XHU1QzQyXHVGRjA4XHU1M0Q4XHU2NkY0IFx1MjE5MiBcdTk1RjRcdTYzQTVcdTVGMTVcdTc1MjhcdTk0RkUgXHUyMTkyIFx1NkY1Q1x1NTcyOFx1RkYwOVx1RkYwQ1xyXG4gKiBcdTRGOURcdTYzNkUgL2ltcGFjdC1zY29wZSBcdThGRDRcdTU2REVcdTc2ODQgbGV2ZWxzXHVGRjA4XHU1NDJCXHU0RjIwXHU2NEFEXHU5NEZFIHJlYXNvblx1RkYwOVx1N0VEOFx1NTIzNlx1OEZERVx1N0VCRlx1MzAwMlxyXG4gKiBcdTUxNjhcdTVCQkRcdTc1M0JcdTVFMDNcdUZGMDh2aWV3Qm94IDEwMDBcdUZGMDlcdUZGMENcdTgyODJcdTcwQjlcdTVFMjZcdTc2RUVcdTVGNTVcdTYzRDBcdTc5M0FcdUZGMENcdTZERjFcdTVFQTZcdThEOEFcdTZERjFcdTk4OUNcdTgyNzJcdThEOEFcdTZENDVcdTMwMDJcclxuICovXHJcbmZ1bmN0aW9uIEltcGFjdEdyYXBoKHByb3BzOiB7IGRhdGE6IEltcGFjdFNjb3BlUGF5bG9hZDsgdDogKGtleTogc3RyaW5nKSA9PiBzdHJpbmcgfSkge1xyXG4gIGNvbnN0IHsgZGF0YSB9ID0gcHJvcHNcclxuICBjb25zdCBpbmRpcmVjdCA9IGRhdGEubGV2ZWxzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5sZXZlbCA9PT0gJ2luZGlyZWN0JylcclxuICBjb25zdCBwb3RlbnRpYWwgPSBkYXRhLmxldmVscy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwgPT09ICdwb3RlbnRpYWwnKVxyXG4gIGNvbnN0IGNvbDAgPSBkYXRhLmNoYW5nZWRGaWxlcy5zbGljZSgwLCA3KVxyXG4gIGNvbnN0IGNvbDEgPSBBcnJheS5mcm9tKG5ldyBTZXQoaW5kaXJlY3QubWFwKChpdGVtKSA9PiBpdGVtLnBhdGgpKSkuc2xpY2UoMCwgOSlcclxuICBjb25zdCBjb2wyID0gQXJyYXkuZnJvbShuZXcgU2V0KHBvdGVudGlhbC5tYXAoKGl0ZW0pID0+IGl0ZW0ucGF0aCkpKS5maWx0ZXIoKHApID0+ICFjb2wxLmluY2x1ZGVzKHApKS5zbGljZSgwLCA4KVxyXG4gIGNvbnN0IG5vZGVIID0gMzBcclxuICBjb25zdCBnYXAgPSAxMFxyXG4gIGNvbnN0IGNvbFggPSBbMzAsIDM4MCwgNzIwXVxyXG4gIGNvbnN0IGNvbFcgPSAyODBcclxuICBjb25zdCByb3dzID0gTWF0aC5tYXgoY29sMC5sZW5ndGgsIGNvbDEubGVuZ3RoLCBjb2wyLmxlbmd0aCwgMSlcclxuICBjb25zdCBoZWlnaHQgPSByb3dzICogKG5vZGVIICsgZ2FwKSArIDYwXHJcblxyXG4gIGNvbnN0IGRlcHRoT2YgPSAocGF0aDogc3RyaW5nKTogbnVtYmVyID0+IHtcclxuICAgIGNvbnN0IGl0ZW0gPSBpbmRpcmVjdC5maW5kKChlbnRyeSkgPT4gZW50cnkucGF0aCA9PT0gcGF0aCkgPz8gcG90ZW50aWFsLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5wYXRoID09PSBwYXRoKVxyXG4gICAgcmV0dXJuIGl0ZW0/LmRlcHRoID8/IDBcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlbmRlckNvbCA9IChjb2w6IG51bWJlciwgaXRlbXM6IHN0cmluZ1tdLCBjb2xvcjogc3RyaW5nKTogUmVhY3QuUmVhY3ROb2RlW10gPT4gaXRlbXMubWFwKChwYXRoLCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3QgeSA9IDQ0ICsgaW5kZXggKiAobm9kZUggKyBnYXApXHJcbiAgICBjb25zdCBkaXIgPSBwYXRoLmluY2x1ZGVzKCcvJykgPyBwYXRoLnNsaWNlKDAsIHBhdGgubGFzdEluZGV4T2YoJy8nKSkgOiAnJ1xyXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2cnLCB7IGtleTogYCR7Y29sfS0ke3BhdGh9YCB9LFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdyZWN0JywgeyB4OiBjb2xYW2NvbF0sIHksIHdpZHRoOiBjb2xXLCBoZWlnaHQ6IG5vZGVILCByeDogNiwgZmlsbDogY29sb3IsIHN0cm9rZTogJ3JnYmEoMCwwLDAsMC4zKScsIHN0cm9rZVdpZHRoOiAxIH0pLFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyB4OiBjb2xYW2NvbF0gKyAxMCwgeTogeSArIDE0LCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgZmlsbDogJyNmZmZmZmYnIH0sXHJcbiAgICAgICAgKHBhdGguc3BsaXQoJy8nKS5wb3AoKSA/PyBwYXRoKS5zbGljZSgwLCAzMCkpLFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyB4OiBjb2xYW2NvbF0gKyAxMCwgeTogeSArIDI2LCBmb250U2l6ZTogMTAsIGZpbGw6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpJyB9LFxyXG4gICAgICAgIGRpci5zbGljZSgwLCA0MCkpLFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0aXRsZScsIG51bGwsIHBhdGgpLFxyXG4gICAgKVxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IGNoYWluU3RhcnQgPSAocmVhc29uOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gICAgY29uc3QgbWF0Y2ggPSByZWFzb24ubWF0Y2goL3BhdGg6ICguKykkLylcclxuICAgIGlmIChtYXRjaCA9PT0gbnVsbCkgcmV0dXJuIGRhdGEuY2hhbmdlZEZpbGVzWzBdID8/ICcnXHJcbiAgICByZXR1cm4gbWF0Y2hbMV0hLnNwbGl0KCcgLT4gJylbMF0gPz8gZGF0YS5jaGFuZ2VkRmlsZXNbMF0gPz8gJydcclxuICB9XHJcbiAgY29uc3QgaW5kZXhJbiA9IChpdGVtczogc3RyaW5nW10sIHBhdGg6IHN0cmluZyk6IG51bWJlciA9PiBpdGVtcy5pbmRleE9mKHBhdGgpXHJcbiAgY29uc3QgY29sT2YgPSAocGF0aDogc3RyaW5nKTogbnVtYmVyID0+IHtcclxuICAgIGlmIChjb2wwLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMFxyXG4gICAgaWYgKGNvbDEuaW5jbHVkZXMocGF0aCkpIHJldHVybiAxXHJcbiAgICBpZiAoY29sMi5pbmNsdWRlcyhwYXRoKSkgcmV0dXJuIDJcclxuICAgIHJldHVybiAtMVxyXG4gIH1cclxuXHJcbiAgY29uc3QgZWRnZXM6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cclxuICBjb25zdCBwdXNoRWRnZSA9IChmcm9tUGF0aDogc3RyaW5nLCB0b1BhdGg6IHN0cmluZywgY29sb3I6IHN0cmluZywga2V5OiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGZyb21Db2wgPSBjb2xPZihmcm9tUGF0aClcclxuICAgIGNvbnN0IHRvQ29sID0gY29sT2YodG9QYXRoKVxyXG4gICAgaWYgKGZyb21Db2wgPT09IC0xIHx8IHRvQ29sID09PSAtMSB8fCB0b0NvbCA8PSBmcm9tQ29sKSByZXR1cm5cclxuICAgIGNvbnN0IHgxID0gY29sWFtmcm9tQ29sXSArIGNvbFdcclxuICAgIGNvbnN0IHkxID0gNDQgKyBpbmRleEluKFtjb2wwLCBjb2wxLCBjb2wyXVtmcm9tQ29sXSA/PyBbXSwgZnJvbVBhdGgpICogKG5vZGVIICsgZ2FwKSArIG5vZGVIIC8gMlxyXG4gICAgY29uc3QgeDIgPSBjb2xYW3RvQ29sXVxyXG4gICAgY29uc3QgeTIgPSA0NCArIGluZGV4SW4oW2NvbDAsIGNvbDEsIGNvbDJdW3RvQ29sXSA/PyBbXSwgdG9QYXRoKSAqIChub2RlSCArIGdhcCkgKyBub2RlSCAvIDJcclxuICAgIGVkZ2VzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudCgncGF0aCcsIHtcclxuICAgICAga2V5LCBkOiBgTSAke3gxfSAke3kxfSBDICR7eDEgKyAzMH0gJHt5MX0sICR7eDIgLSAzMH0gJHt5Mn0sICR7eDJ9ICR7eTJ9YCxcclxuICAgICAgZmlsbDogJ25vbmUnLCBzdHJva2U6IGNvbG9yLCBzdHJva2VXaWR0aDogMS42LCBvcGFjaXR5OiAwLjYsXHJcbiAgICB9KSlcclxuICB9XHJcbiAgZm9yIChjb25zdCBpdGVtIG9mIGluZGlyZWN0LnNsaWNlKDAsIDIwKSkgcHVzaEVkZ2UoY2hhaW5TdGFydChpdGVtLnJlYXNvbiksIGl0ZW0ucGF0aCwgdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSwgYGVpLSR7aXRlbS5wYXRofWApXHJcbiAgZm9yIChjb25zdCBpdGVtIG9mIHBvdGVudGlhbC5zbGljZSgwLCAxNikpIHB1c2hFZGdlKGNoYWluU3RhcnQoaXRlbS5yZWFzb24pLCBpdGVtLnBhdGgsIHRoZW1lQXdhcmVUZXh0KCcjNTc2MDZhJyksIGBlcC0ke2l0ZW0ucGF0aH1gKVxyXG5cclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCxcclxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3N2ZycsIHsgd2lkdGg6ICcxMDAlJywgdmlld0JveDogYDAgMCAxMDI0ICR7aGVpZ2h0fWAsIHN0eWxlOiB7IG1heEhlaWdodDogNDgwIH0gfSxcclxuICAgICAgW1snXHU1M0Q4XHU2NkY0XHU2NTg3XHU0RUY2JywgMF0sIFsnXHU5NUY0XHU2M0E1XHU1RjcxXHU1NENEXHVGRjA4XHU4QzAxXHU1RjE1XHU3NTI4XHU0RTg2XHU1QjgzXHVGRjA5JywgMV0sIFsnXHU2RjVDXHU1NzI4XHU1RjcxXHU1NENEXHVGRjA4XHU0RThDXHU3RUE3XHU0RjIwXHU2NEFEXHVGRjA5JywgMl1dLm1hcCgoW25hbWUsIGNvbF0pID0+XHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGV4dCcsIHsga2V5OiBTdHJpbmcoY29sKSwgeDogY29sWFtjb2wgYXMgbnVtYmVyXSwgeTogMjQsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNzAwLCBmaWxsOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9LCBuYW1lIGFzIHN0cmluZykpLFxyXG4gICAgICByZW5kZXJDb2woMCwgY29sMCwgJyMyNTYzZWInKSxcclxuICAgICAgcmVuZGVyQ29sKDEsIGNvbDEsICcjZDk3NzA2JyksXHJcbiAgICAgIHJlbmRlckNvbCgyLCBjb2wyLCAnIzU3NjA2YScpLFxyXG4gICAgICBlZGdlcyxcclxuICAgICksXHJcbiAgKVxyXG59XHJcblxyXG5jb25zdCBESUZGX0tFWVdPUkRTID0gL1xcYihwdWJsaWN8cHJpdmF0ZXxwcm90ZWN0ZWR8aW50ZXJuYWx8c3RhdGljfHZvaWR8Y2xhc3N8c3RydWN0fGludGVyZmFjZXxlbnVtfG5ld3xyZXR1cm58aWZ8ZWxzZXxmb3J8Zm9yZWFjaHx3aGlsZXxzd2l0Y2h8Y2FzZXxicmVha3xjb250aW51ZXx0cnl8Y2F0Y2h8ZmluYWxseXx0aHJvd3x1c2luZ3xuYW1lc3BhY2V8aW1wb3J0fGV4cG9ydHxmcm9tfGNvbnN0fGxldHx2YXJ8YXN5bmN8YXdhaXR8ZnVuY3Rpb258dGhpc3xiYXNlfHN1cGVyfG51bGx8dHJ1ZXxmYWxzZXxvdmVycmlkZXx2aXJ0dWFsfGFic3RyYWN0fHNlYWxlZHxyZWFkb25seXxwYXJhbXN8b3V0fHJlZnx5aWVsZHx0eXBlb2Z8aW5zdGFuY2VvZnxpbnxvZnxkZWZhdWx0fHN0cmluZ3xpbnR8bG9uZ3xkb3VibGV8ZmxvYXR8Ym9vbHxjaGFyfGRlY2ltYWx8b2JqZWN0fHJlY29yZHxwYXJ0aWFsfGdldHxzZXR8cmVxdWlyZXxtb2R1bGV8dHlwZXxpbXBsZW1lbnRzfGV4dGVuZHMpXFxiL2dcclxuXHJcbi8qKiBcdTUzNTVcdTg4NENcdTRFRTNcdTc4MDFcdTlBRDhcdTRFQUVcdUZGMUFcdTZDRThcdTkxQ0EgPiBcdTVCNTdcdTdCMjZcdTRFMzIgPiBcdTUxNzNcdTk1MkVcdTVCNTcvXHU2NTcwXHU1QjU3IFx1NEUwOVx1NUM0Mlx1Nzc0MFx1ODI3Mlx1RkYwOFx1OEY3Qlx1OTFDRlx1NkI2M1x1NTIxOVx1RkYwQ1x1NTkxRlx1NjgzOFx1NjdFNVx1NzUyOFx1RkYwOVx1MzAwMiAqL1xyXG5mdW5jdGlvbiBoaWdobGlnaHRDb2RlTGluZShsaW5lOiBzdHJpbmcsIGtleVByZWZpeDogc3RyaW5nKTogUmVhY3QuUmVhY3ROb2RlW10ge1xyXG4gIGNvbnN0IHRyaW1tZWQgPSBsaW5lLnRyaW1TdGFydCgpXHJcbiAgaWYgKHRyaW1tZWQuc3RhcnRzV2l0aCgnLy8nKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJy8vLycpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnKicpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnLyonKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJyMnKSkge1xyXG4gICAgcmV0dXJuIFtSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBrZXk6IGAke2tleVByZWZpeH0tY2AsIHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzZhOTk1NScpIH0gfSwgbGluZSldXHJcbiAgfVxyXG4gIGNvbnN0IHBhcnRzID0gbGluZS5zcGxpdCgvKFwiKD86W15cIlxcXFxdfFxcXFwuKSpcInwnKD86W14nXFxcXF18XFxcXC4pKid8YCg/OlteYFxcXFxdfFxcXFwuKSpgKS9nKVxyXG4gIHJldHVybiBwYXJ0cy5tYXAoKHBhcnQsIGkpID0+IHtcclxuICAgIGlmIChpICUgMiA9PT0gMSkgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1zJHtpfWAsIHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NlOTE3OCcpIH0gfSwgcGFydClcclxuICAgIGNvbnN0IHN1YjogUmVhY3QuUmVhY3ROb2RlW10gPSBbXVxyXG4gICAgbGV0IGxhc3QgPSAwXHJcbiAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIHBhcnQubWF0Y2hBbGwoRElGRl9LRVlXT1JEUykpIHtcclxuICAgICAgaWYgKG1hdGNoLmluZGV4ISA+IGxhc3QpIHN1Yi5wdXNoKHBhcnQuc2xpY2UobGFzdCwgbWF0Y2guaW5kZXgpKVxyXG4gICAgICBzdWIucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBrZXk6IGAke2tleVByZWZpeH0tayR7aX0tJHttYXRjaC5pbmRleH1gLCBzdHlsZTogeyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM1NjljZDYnKSB9IH0sIG1hdGNoWzBdKSlcclxuICAgICAgbGFzdCA9IG1hdGNoLmluZGV4ISArIG1hdGNoWzBdLmxlbmd0aFxyXG4gICAgfVxyXG4gICAgaWYgKGxhc3QgPCBwYXJ0Lmxlbmd0aCkgc3ViLnB1c2gocGFydC5zbGljZShsYXN0KSlcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCB7IGtleTogYCR7a2V5UHJlZml4fS1wJHtpfWAgfSwgc3ViKVxyXG4gIH0pXHJcbn1cclxuXHJcbi8qKiBcdTlBRDhcdTRFQUVcdTVERUVcdTVGMDJcdTg5QzZcdTU2RkVcdUZGMUFcdTg5RTNcdTY3OTAgdW5pZmllZCBkaWZmXHVGRjBDXHU2MzA5IFx1NTg5RS9cdTUyMjAvXHU1NzU3XHU1OTM0L1x1NEUwQVx1NEUwQlx1NjU4NyBcdTc3NDBcdTgyNzJcdTMwMDIgKi9cclxuZnVuY3Rpb24gRGlmZlZpZXcocHJvcHM6IHsgcGF0Y2g6IHN0cmluZyB9KSB7XHJcbiAgY29uc3QgbGluZXMgPSBwcm9wcy5wYXRjaC5zcGxpdCgnXFxuJykuZmlsdGVyKChsaW5lLCBpKSA9PiAhKGxpbmUgPT09ICcnICYmIGkgPT09IHByb3BzLnBhdGNoLnNwbGl0KCdcXG4nKS5sZW5ndGggLSAxKSlcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgc3R5bGU6IHtcclxuICAgICAgZm9udEZhbWlseTogJ0NvbnNvbGFzLCBtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCBsaW5lSGVpZ2h0OiAxLjU1LFxyXG4gICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcclxuICAgICAgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAwJywgbWF4SGVpZ2h0OiA0MjAsIG92ZXJmbG93WTogJ2F1dG8nLCBtYXJnaW5Ub3A6ICc2cHgnLFxyXG4gICAgfSxcclxuICB9LCBsaW5lcy5tYXAoKGxpbmUsIGkpID0+IHtcclxuICAgIGNvbnN0IGtpbmQgPSBsaW5lLnN0YXJ0c1dpdGgoJysrKycpIHx8IGxpbmUuc3RhcnRzV2l0aCgnLS0tJykgPyAnbWV0YSdcclxuICAgICAgOiBsaW5lLnN0YXJ0c1dpdGgoJ0BAJykgPyAnaHVuaydcclxuICAgICAgICA6IGxpbmUuc3RhcnRzV2l0aCgnKycpID8gJ2FkZCdcclxuICAgICAgICAgIDogbGluZS5zdGFydHNXaXRoKCctJykgPyAnZGVsJyA6ICdjdHgnXHJcbiAgICBjb25zdCBiZyA9IGtpbmQgPT09ICdhZGQnID8gJ3JnYmEoNDYsMTYwLDY3LDAuMTQpJyA6IGtpbmQgPT09ICdkZWwnID8gJ3JnYmEoMjQ4LDgxLDczLDAuMTMpJyA6IGtpbmQgPT09ICdodW5rJyA/ICdyZ2JhKDU2LDEzOSwyNTMsMC4xKScgOiAndHJhbnNwYXJlbnQnXHJcbiAgICBjb25zdCBjb250ZW50ID0ga2luZCA9PT0gJ21ldGEnIHx8IGtpbmQgPT09ICdodW5rJ1xyXG4gICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzA5NjlkYScpLCBmb250V2VpZ2h0OiA2MDAgfSB9LCBsaW5lKVxyXG4gICAgICA6IGtpbmQgPT09ICdhZGQnIHx8IGtpbmQgPT09ICdkZWwnXHJcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBzdHlsZTogeyBjb2xvcjogdGhlbWVBd2FyZVRleHQoa2luZCA9PT0gJ2FkZCcgPyAnIzFhN2YzNycgOiAnI2NmMjIyZScpLCBmb250V2VpZ2h0OiA2MDAgfSB9LCBsaW5lWzBdKVxyXG4gICAgICAgIDogbnVsbFxyXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsga2V5OiBpLCBzdHlsZTogeyBwYWRkaW5nOiAnMCAxMHB4JywgYmFja2dyb3VuZDogYmcsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfSB9LFxyXG4gICAgICBjb250ZW50LFxyXG4gICAgICBraW5kID09PSAnYWRkJyB8fCBraW5kID09PSAnZGVsJyA/IGhpZ2hsaWdodENvZGVMaW5lKGxpbmUuc2xpY2UoMSksIGBsJHtpfWApIDogaGlnaGxpZ2h0Q29kZUxpbmUobGluZSwgYGwke2l9YCksXHJcbiAgICApXHJcbiAgfSkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdFRpbWUodmFsdWU6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gJ1x1MjAxNCdcclxuICByZXR1cm4gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlU3RyaW5nKClcclxufVxyXG5cclxuLyoqIFx1NEU4Q1x1NkIyMVx1Nzg2RVx1OEJBNFx1NUYzOVx1N0E5N1x1RkYxQVx1OTA2RVx1N0Y2OSArIFx1NUM0NVx1NEUyRFx1NTM2MVx1NzI0N1x1RkYwQ1x1NTM3MVx1OTY2OVx1NjRDRFx1NEY1Q1x1RkYwOFx1NTIyMFx1OTY2NFx1N0IxNFx1OEJCMC9cdTUzRDhcdTY2RjQvXHU3RUE2XHU2NzVGXHVGRjA5XHU1MTcxXHU3NTI4XHVGRjFCYWx0IFx1NjNEMFx1NEY5Qlx1N0IyQ1x1NEU4Q1x1Nzg2RVx1OEJBNFx1NTJBOFx1NEY1Q1x1RkYwOFx1NTk4MlwiXHU1MTQ4XHU1MUZBXHU2NUI5XHU2ODQ4XCJcdUZGMDlcdTMwMDIgKi9cclxuZnVuY3Rpb24gQ29uZmlybURpYWxvZyhwcm9wczogeyB0aXRsZTogc3RyaW5nOyBtZXNzYWdlOiBzdHJpbmc7IGRhbmdlcj86IGJvb2xlYW47IGNvbmZpcm1MYWJlbD86IHN0cmluZzsgYWx0PzogeyBsYWJlbDogc3RyaW5nOyBvbkFsdDogKCkgPT4gdm9pZCB9OyBvbkNhbmNlbDogKCkgPT4gdm9pZDsgb25Db25maXJtOiAoKSA9PiB2b2lkIH0pIHtcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcclxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgJ2RhdGEtdGVzdGlkJzogJ3BjLWNvbmZpcm0tb3ZlcmxheScsXHJcbiAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCB6SW5kZXg6IDk5OSxcclxuICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgxNSwyMyw0MiwwLjQ1KScsIGJhY2tkcm9wRmlsdGVyOiAnYmx1cigycHgpJyxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgYW5pbWF0aW9uOiAncGNGYWRlSW4gMC4xNXMgZWFzZS1vdXQnLFxyXG4gICAgICB9LFxyXG4gICAgICBvbkNsaWNrOiBwcm9wcy5vbkNhbmNlbCxcclxuICAgIH0sXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAnZGF0YS10ZXN0aWQnOiAncGMtY29uZmlybS1jYXJkJyxcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgd2lkdGg6IDQwMCwgbWF4V2lkdGg6ICdjYWxjKDEwMHZ3IC0gNDhweCknLFxyXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JywgYm94U2hhZG93OiAnMCAyMHB4IDUwcHggcmdiYSgwLDAsMCwwLjI1KScsXHJcbiAgICAgICAgICBwYWRkaW5nOiAnMjBweCAyMnB4IDE2cHgnLFxyXG4gICAgICAgICAgb25DbGljazogKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKSB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JywgZ2FwOiAnMTBweCcgfSB9LFxyXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgIHdpZHRoOiAzNCwgaGVpZ2h0OiAzNCwgYm9yZGVyUmFkaXVzOiAnNTAlJywgZmxleFNocmluazogMCxcclxuICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxN3B4JyxcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBwcm9wcy5kYW5nZXIgPyAncmdiYSgyNDQsNjMsOTQsMC4xMiknIDogJ3JnYmEoMzcsOTksMjM1LDAuMSknLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5kYW5nZXIgPyB0aGVtZUF3YXJlVGV4dCgnI2UxMWQ0OCcpIDogdGhlbWVBd2FyZVRleHQoJyMyNTYzZWInKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sIHByb3BzLmRhbmdlciA/ICchJyA6ICc/JyksXHJcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRTaXplOiAnMTRweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnNnB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknIH0gfSwgcHJvcHMudGl0bGUpLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfSB9LCBwcm9wcy5tZXNzYWdlKSxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgKSxcclxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsIGdhcDogJzEwcHgnLCBtYXJnaW5Ub3A6ICcxOHB4JywgZmxleFdyYXA6ICd3cmFwJyB9IH0sXHJcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcbiAgICAgICAgICAgIHN0eWxlOiB7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICc3cHggMThweCcsIGJvcmRlclJhZGl1czogJzhweCcgfSxcclxuICAgICAgICAgICAgb25DbGljazogcHJvcHMub25DYW5jZWwsXHJcbiAgICAgICAgICB9LCAnXHU1M0Q2XHU2RDg4JyksXHJcbiAgICAgICAgICBwcm9wcy5hbHQgIT09IHVuZGVmaW5lZCAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcbiAgICAgICAgICAgIHN0eWxlOiB7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICc3cHggMThweCcsIGJvcmRlclJhZGl1czogJzhweCcsIGZvbnRXZWlnaHQ6IDYwMCB9LFxyXG4gICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5hbHQub25BbHQsXHJcbiAgICAgICAgICB9LCBwcm9wcy5hbHQubGFiZWwpLFxyXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICAnZGF0YS10ZXN0aWQnOiAncGMtY29uZmlybS1vaycsXHJcbiAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgcGFkZGluZzogJzdweCAxOHB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA1MDAsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogcHJvcHMuZGFuZ2VyID8gJyNlMTFkNDgnIDogJ3ZhcigtLWRzdy1hbGlhcy1idXR0b24taW5mby1maWxsLCAjMjU2M2ViKScsIGNvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ29uZmlybSxcclxuICAgICAgICAgIH0sIHByb3BzLmNvbmZpcm1MYWJlbCA/PyAnXHU3ODZFXHU4QkE0XHU1MjIwXHU5NjY0JyksXHJcbiAgICAgICAgKSxcclxuICAgICAgKSxcclxuICAgICksXHJcbiAgKVxyXG59XHJcblxyXG4vKiogXHU5QUE4XHU2N0I2XHU1QzBGXHU1MzYxXHU3MjQ3XHUzMDAyICovXHJcbmZ1bmN0aW9uIENhcmQocHJvcHM6IHsgdGl0bGU/OiBSZWFjdC5SZWFjdE5vZGU7IGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlIH0pIHtcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLmNhcmQgfSxcclxuICAgIHByb3BzLnRpdGxlID09PSB1bmRlZmluZWQgPyBudWxsIDogUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLnNlY3Rpb25UaXRsZSB9LCBwcm9wcy50aXRsZSksXHJcbiAgICBwcm9wcy5jaGlsZHJlbilcclxufVxyXG5cclxuLyoqXHJcbiAqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NEUzQlx1N0VDNFx1NEVGNlx1RkYxQVx1NTZEQlx1OTg3NVx1N0I3RVx1RkYwOFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1NEUzQVx1OUVEOFx1OEJBNFx1RkYwOSsgXHU4RjZFXHU4QkUyXHU1QkJGXHU0RTNCIEFQSSArIFx1NjMwOVx1OTRBRVx1NTMxNlx1NjRDRFx1NEY1Q1x1MzAwMlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIFdvcmtzcGFjZUZyYW1lKHByb3BzOiBXb3Jrc3BhY2VGcmFtZVByb3BzKSB7XHJcbiAgY29uc3QgdCA9IHByb3BzLnQgPz8gZmFsbGJhY2tUXHJcbiAgY29uc3QgYWN0aXZlUmVmID0gdXNlUmVmKHRydWUpXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGFjdGl2ZVJlZi5jdXJyZW50ID0gdHJ1ZVxyXG4gICAgcmV0dXJuICgpID0+IHsgYWN0aXZlUmVmLmN1cnJlbnQgPSBmYWxzZSB9XHJcbiAgfSwgW10pXHJcbiAgY29uc3QgW3RhYiwgc2V0VGFiXSA9IHVzZVN0YXRlPFRhYktleT4oJ2NvbW1pdHMnKVxyXG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGU8V29ya3NwYWNlU3RhdGUgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtsb2FkRXJyb3IsIHNldExvYWRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtib290c3RyYXBwaW5nLCBzZXRCb290c3RyYXBwaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW2FjdGlvblJlc3VsdCwgc2V0QWN0aW9uUmVzdWx0XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW2NoYW5nZVRpdGxlLCBzZXRDaGFuZ2VUaXRsZV0gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbY2hhbmdlRGVzYywgc2V0Q2hhbmdlRGVzY10gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbbWVtb3J5VGl0bGUsIHNldE1lbW9yeVRpdGxlXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFttZW1vcnlDb250ZW50LCBzZXRNZW1vcnlDb250ZW50XSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtjb25maXJtZWRUZXh0LCBzZXRDb25maXJtZWRUZXh0XSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtjb25maXJtZWRQYXRocywgc2V0Q29uZmlybWVkUGF0aHNdID0gdXNlU3RhdGUoJycpXHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTcyQjZcdTYwMDEgXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW2NvbW1pdHNEYXRhLCBzZXRDb21taXRzRGF0YV0gPSB1c2VTdGF0ZTxDb21taXRzUGF5bG9hZCB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW2NvbW1pdHNFcnJvciwgc2V0Q29tbWl0c0Vycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW3BpY2tlck9wZW4sIHNldFBpY2tlck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgY29uc3QgW3BpY2tlckZpbHRlciwgc2V0UGlja2VyRmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtzZWxlY3RlZFRhcmdldHMsIHNldFNlbGVjdGVkVGFyZ2V0c10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pXHJcbiAgY29uc3QgW2RldGFpbHMsIHNldERldGFpbHNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgQ29tbWl0RGV0YWlsUGF5bG9hZD4+KHt9KVxyXG4gIC8qKiBcdTg5RTNcdThCRkJcdTRFRkJcdTUyQTFcdTcyQjZcdTYwMDFcdUZGMUFxdWV1ZWQ9XHU2MzkyXHU5NjFGXHU3QjQ5XHU0RTMyXHU4ODRDXHU5NjFGXHU1MjE3XHVGRjBDcnVubmluZz1cdTZCNjNcdTU3MjhcdThCRjdcdTZDNDJcdUZGMDhcdTU5MUFcdTkwMDkvXHU2NTc0XHU4RjZFXHU2NUY2XHU4MUVBXHU1MkE4XHU5MDEwXHU0RTJBXHU1MjA2XHU2NzkwXHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgW2RldGFpbFN0YXR1cywgc2V0RGV0YWlsU3RhdHVzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsICdxdWV1ZWQnIHwgJ3J1bm5pbmcnPj4oe30pXHJcbiAgY29uc3QgZGV0YWlsUXVldWVkQ291bnQgPSBPYmplY3QudmFsdWVzKGRldGFpbFN0YXR1cykuZmlsdGVyKChzdGF0dXMpID0+IHN0YXR1cyA9PT0gJ3F1ZXVlZCcpLmxlbmd0aFxyXG4gIGNvbnN0IGRldGFpbFJ1bm5pbmdDb3VudCA9IE9iamVjdC52YWx1ZXMoZGV0YWlsU3RhdHVzKS5maWx0ZXIoKHN0YXR1cykgPT4gc3RhdHVzID09PSAncnVubmluZycpLmxlbmd0aFxyXG4gIGNvbnN0IFtpbXBhY3QsIHNldEltcGFjdF0gPSB1c2VTdGF0ZTxJbXBhY3RTY29wZVBheWxvYWQgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtpbXBhY3RMb2FkaW5nLCBzZXRJbXBhY3RMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IFtyZXZpZXdzLCBzZXRSZXZpZXdzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIFJldmlld1BheWxvYWQ+Pih7fSlcclxuICBjb25zdCBbcmV2aWV3TG9hZGluZywgc2V0UmV2aWV3TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcclxuICBjb25zdCBbZmlsZURpZmZzLCBzZXRGaWxlRGlmZnNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oe30pXHJcbiAgY29uc3QgW2NvbmZpcm1EaWFsb2csIHNldENvbmZpcm1EaWFsb2ddID0gdXNlU3RhdGU8eyB0aXRsZTogc3RyaW5nOyBtZXNzYWdlOiBzdHJpbmc7IGRhbmdlcj86IGJvb2xlYW47IGNvbmZpcm1MYWJlbD86IHN0cmluZzsgYWx0PzogeyBsYWJlbDogc3RyaW5nOyBvbkFsdDogKCkgPT4gdm9pZCB9OyBvbkNvbmZpcm06ICgpID0+IHZvaWQgfSB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW25vdGVzLCBzZXROb3Rlc10gPSB1c2VTdGF0ZTxOb3RlRW50cnlbXT4oW10pXHJcbiAgY29uc3QgW25vdGVUaXRsZSwgc2V0Tm90ZVRpdGxlXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtub3RlQ29udGVudCwgc2V0Tm90ZUNvbnRlbnRdID0gdXNlU3RhdGUoJycpXHJcbiAgY29uc3QgW25vdGVUYWdzLCBzZXROb3RlVGFnc10gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbZWRpdGluZ05vdGUsIHNldEVkaXRpbmdOb3RlXSA9IHVzZVN0YXRlPHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29udGVudDogc3RyaW5nOyB0YWdzOiBzdHJpbmcgfSB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW25vdGVTZWFyY2gsIHNldE5vdGVTZWFyY2hdID0gdXNlU3RhdGUoJycpXHJcbiAgY29uc3QgW25vdGVFeHBhbmRlZCwgc2V0Tm90ZUV4cGFuZGVkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+Pih7fSlcclxuICBjb25zdCBbaXNzdWVzRGF0YSwgc2V0SXNzdWVzRGF0YV0gPSB1c2VTdGF0ZTxJc3N1ZUVudHJ5W10gfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtpc3N1ZVNldmVyaXR5RmlsdGVyLCBzZXRJc3N1ZVNldmVyaXR5RmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtpc3N1ZVN0YXR1c0ZpbHRlciwgc2V0SXNzdWVTdGF0dXNGaWx0ZXJdID0gdXNlU3RhdGUoJycpXHJcbiAgY29uc3QgW2lzc3VlRXhwYW5kZWQsIHNldElzc3VlRXhwYW5kZWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KVxyXG4gIGNvbnN0IFtmaXhFeHBhbmRlZCwgc2V0Rml4RXhwYW5kZWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KVxyXG4gIGNvbnN0IFt2ZXJpZnlpbmdUYXJnZXQsIHNldFZlcmlmeWluZ1RhcmdldF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtpc3N1ZUNoZWNrZWQsIHNldElzc3VlQ2hlY2tlZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oe30pXHJcbiAgY29uc3QgW2JhdGNoVmVyaWZ5U3RhdGUsIHNldEJhdGNoVmVyaWZ5U3RhdGVdID0gdXNlU3RhdGU8eyBkb25lOiBudW1iZXI7IHRvdGFsOiBudW1iZXIgfSB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW3RyaWFnZVN0YXRlLCBzZXRUcmlhZ2VTdGF0ZV0gPSB1c2VTdGF0ZTx7IHByb2Nlc3NlZDogbnVtYmVyOyByZW1haW5pbmc6IG51bWJlciB9IHwgbnVsbD4obnVsbClcclxuICBjb25zdCBiYXRjaFN0b3BSZWYgPSB1c2VSZWYoZmFsc2UpXHJcbiAgY29uc3QgW2ZpeFRhc2tzLCBzZXRGaXhUYXNrc10gPSB1c2VTdGF0ZTxGaXhUYXNrRW50cnlbXT4oW10pXHJcbiAgY29uc3QgW2ZpeENvbmN1cnJlbmN5LCBzZXRGaXhDb25jdXJyZW5jeV0gPSB1c2VTdGF0ZSgnMycpXHJcbiAgY29uc3QgW2FpU3VtbWFyaXppbmcsIHNldEFpU3VtbWFyaXppbmddID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgY29uc3QgW25hcnJhdGl2ZSwgc2V0TmFycmF0aXZlXSA9IHVzZVN0YXRlPHsgbmFycmF0aXZlOiBzdHJpbmc7IGNhY2hlZDogYm9vbGVhbjsgZ2VuZXJhdGVkQXQ/OiBudW1iZXI7IGNvc3RVc2Q/OiBudW1iZXIgfSB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW25hcnJhdGl2ZUJ1c3ksIHNldE5hcnJhdGl2ZUJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgY29uc3QgW3BlZWssIHNldFBlZWtdID0gdXNlU3RhdGU8eyBwYXRoOiBzdHJpbmc7IGxpbmU6IG51bWJlciB9IHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbcGVla0RhdGEsIHNldFBlZWtEYXRhXSA9IHVzZVN0YXRlPFBlZWtQYXlsb2FkIHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbcGVla0J1c3ksIHNldFBlZWtCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IFtuYXJyYXRpdmVFcnJvciwgc2V0TmFycmF0aXZlRXJyb3JdID0gdXNlU3RhdGUoJycpXHJcbiAgY29uc3QgW21vZGVsVGllcnMsIHNldE1vZGVsVGllcnNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgeyBwcm92aWRlcjogc3RyaW5nOyBtb2RlbDogc3RyaW5nIH0+IHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbbW9kZWxPcHRpb25zLCBzZXRNb2RlbE9wdGlvbnNdID0gdXNlU3RhdGU8QXJyYXk8eyBwcm92aWRlcjogc3RyaW5nOyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfT4+KFtdKVxyXG4gIGNvbnN0IFttb2RlbFNhdmluZywgc2V0TW9kZWxTYXZpbmddID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgY29uc3QgW21vZGVsU2F2ZWQsIHNldE1vZGVsU2F2ZWRdID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDM1x1RkYxQVx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNCAvIFJ1biBcdThCRTZcdTYwQzUgLyBcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTEgXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW3BsYW5Db25maXJtLCBzZXRQbGFuQ29uZmlybV0gPSB1c2VTdGF0ZTx7IGNoYW5nZUlkOiBzdHJpbmc7IHN0ZXBzOiBQbGFuQ29uZmlybVN0ZXBbXSB9IHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbcGxhbkJ1c3ksIHNldFBsYW5CdXN5XSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IFtydW5EZXRhaWwsIHNldFJ1bkRldGFpbF0gPSB1c2VTdGF0ZTxSdW5EZXRhaWwgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtzY2hlZHVsZWREYXRhLCBzZXRTY2hlZHVsZWREYXRhXSA9IHVzZVN0YXRlPFNjaGVkdWxlZFRhc2tFbnRyeVtdIHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbc2NoZWROYW1lLCBzZXRTY2hlZE5hbWVdID0gdXNlU3RhdGUoJycpXHJcbiAgY29uc3QgW3NjaGVkT3Blbiwgc2V0U2NoZWRPcGVuXSA9IHVzZVN0YXRlKHRydWUpXHJcbiAgY29uc3QgW3NjaGVkVHlwZSwgc2V0U2NoZWRUeXBlXSA9IHVzZVN0YXRlKCdyZXZpZXcnKVxyXG4gIGNvbnN0IFtzY2hlZFRpdGxlLCBzZXRTY2hlZFRpdGxlXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtzY2hlZERlc2MsIHNldFNjaGVkRGVzY10gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbc2NoZWRJbnRlcnZhbCwgc2V0U2NoZWRJbnRlcnZhbF0gPSB1c2VTdGF0ZSgnMTQ0MCcpXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1RkYxQVx1NTE2OFx1OTFDRlx1NjU3MFx1NjM2RSAvIFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QSBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBbbWVtb3JpZXNEYXRhLCBzZXRNZW1vcmllc0RhdGFdID0gdXNlU3RhdGU8TWVtb3JpZXNQYXlsb2FkIHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbc3luY1JlcG9ydCwgc2V0U3luY1JlcG9ydF0gPSB1c2VTdGF0ZTxTeW5jUmVwb3J0IHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbbWVtb3J5U2NvcGUsIHNldE1lbW9yeVNjb3BlXSA9IHVzZVN0YXRlPCdwcm9qZWN0JyB8ICdicmFuY2gnPigncHJvamVjdCcpXHJcbiAgY29uc3QgW21lbW9yeVR5cGUsIHNldE1lbW9yeVR5cGVdID0gdXNlU3RhdGUoJ2FyY2hpdGVjdHVyZV9kZWNpc2lvbicpXHJcbiAgY29uc3QgW21lbW9yeVN5bmNpbmcsIHNldE1lbW9yeVN5bmNpbmddID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgY29uc3QgW2V4ZWNUaXRsZSwgc2V0RXhlY1RpdGxlXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtleGVjTW9kZWwsIHNldEV4ZWNNb2RlbF0gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbZXhlY0Rlc2MsIHNldEV4ZWNEZXNjXSA9IHVzZVN0YXRlKCcnKVxyXG5cclxuICAvKiogXHU3RURGXHU0RTAwIFBPU1RcdUZGMUFcdTVFMjZcdThEODVcdTY1RjZcdTUxNUNcdTVFOTVcdUZGMDhMTE0gXHU3QUVGXHU3MEI5XHU2NzBEXHU1MkExXHU3QUVGIDEyMHMgXHU0RjFBXHU5NjREXHU3RUE3XHU4RkQ0XHU1NkRFXHVGRjBDXHU1QkEyXHU2MjM3XHU3QUVGIDE4MHMgXHU1M0VBXHU1MTVDXHU1RTk1XHU3NzFGXHU2QjYzXHU3Njg0XHU3RjUxXHU3RURDXHU0RTJEXHU2NUFEXHVGRjA5XHVGRjBDXHU3RUREXHU0RTBEXHU4QkE5XHU4QkY3XHU2QzQyXHU2NUUwXHU5NjUwXHU2MzAyXHU4RDc3XHUzMDAyICovXHJcbiAgY29uc3QgcG9zdCA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCB0aW1lb3V0TXMgPSAxODBfMDAwKTogUHJvbWlzZTx7IG9rOiBib29sZWFuOyBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB9PiA9PiB7XHJcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpXHJcbiAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCB0aW1lb3V0TXMpXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHBhdGgsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IC4uLmJvZHksIHNlc3Npb25JZDogcHJvcHMuc2Vzc2lvbklkID8/ICcnIH0pLFxyXG4gICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgIH0pXHJcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgICAgcmV0dXJuIHsgb2s6IHJlc3BvbnNlLm9rLCBkYXRhOiAoZGF0YSA/PyB7fSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfVxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIHBlZWtcdUZGMUFcdTYyNTNcdTVGMDBcdTY3RDBcdTY1ODdcdTRFRjZcdTY3RDBcdTg4NENcdTk2NDRcdThGRDFcdTc2ODRcdTRFRTNcdTc4MDFcdTRFMEFcdTRFMEJcdTY1ODdcdTZENkVcdTVDNDJcdUZGMDhcdTY3MDlcdTc1NENcdTdCNDlcdTVGODUgMTAgXHU3OUQyXHVGRjA5XHUzMDAyICovXHJcbiAgcGVla09wZW5lciA9IChwYXRoOiBzdHJpbmcsIGxpbmU6IG51bWJlcik6IHZvaWQgPT4geyB2b2lkIG9wZW5QZWVrKHBhdGgsIGxpbmUpIH1cclxuICBjb25zdCBvcGVuUGVlayA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGxpbmU6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgc2V0UGVlayh7IHBhdGgsIGxpbmUgfSlcclxuICAgIHNldFBlZWtEYXRhKG51bGwpXHJcbiAgICBzZXRQZWVrQnVzeSh0cnVlKVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKVxyXG4gICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCAxMF8wMDApXHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3BlZWsnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcGF0aCwgbGluZSwgc2Vzc2lvbklkOiBwcm9wcy5zZXNzaW9uSWQgPz8gJycgfSksXHJcbiAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgfSlcclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxyXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0UGVla0RhdGEoZGF0YSBhcyBQZWVrUGF5bG9hZClcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICBzZXRQZWVrRGF0YSh7IGV4aXN0czogZmFsc2UgfSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldFBlZWtCdXN5KGZhbHNlKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NURFNVx1NEY1Q1x1OEY2RVx1NkIyMVx1NTNEOVx1NEU4Qlx1RkYxQVx1NTkxQVx1NEUyQVx1OTAwOVx1NEUyRFx1NjNEMFx1NEVBNFx1NEY1Q1x1NEUzQVx1NEUwMFx1NEUyQVx1NjU3NFx1NEY1M1x1ODlFM1x1OEJGQlx1RkYwOFx1N0YxM1x1NUI1OCArIFx1NTNFRlx1NUYzQVx1NTIzNlx1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1RkYwOVx1MzAwMiAqL1xyXG4gIGNvbnN0IGxvYWROYXJyYXRpdmUgPSBhc3luYyAoZm9yY2UgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3Qgc2hhcyA9IHNlbGVjdGVkVGFyZ2V0cy5maWx0ZXIoKHRhcmdldCkgPT4gdGFyZ2V0ICE9PSAnd29ya2luZycpXHJcbiAgICBpZiAoc2hhcy5sZW5ndGggPCAyKSByZXR1cm5cclxuICAgIHNldE5hcnJhdGl2ZUJ1c3kodHJ1ZSlcclxuICAgIHNldE5hcnJhdGl2ZUVycm9yKCcnKVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvd29yay1uYXJyYXRpdmUnLCB7IHNoYXMsIGZvcmNlIH0pXHJcbiAgICAgIGlmICghb2spIHtcclxuICAgICAgICBzZXROYXJyYXRpdmVFcnJvcihTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBzZXROYXJyYXRpdmUoe1xyXG4gICAgICAgIG5hcnJhdGl2ZTogU3RyaW5nKGRhdGFbJ25hcnJhdGl2ZSddID8/ICcnKSxcclxuICAgICAgICBjYWNoZWQ6IGRhdGFbJ2NhY2hlZCddID09PSB0cnVlLFxyXG4gICAgICAgIGdlbmVyYXRlZEF0OiBkYXRhWydnZW5lcmF0ZWRBdCddID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBOdW1iZXIoZGF0YVsnZ2VuZXJhdGVkQXQnXSksXHJcbiAgICAgICAgY29zdFVzZDogZGF0YVsnY29zdFVzZCddID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBOdW1iZXIoZGF0YVsnY29zdFVzZCddKSxcclxuICAgICAgfSlcclxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgIHNldE5hcnJhdGl2ZUVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldE5hcnJhdGl2ZUJ1c3koZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIFx1N0VDRiByZWYgXHU2NkI0XHU5NzMyXHU2NzAwXHU2NUIwXHU5NUVEXHU1MzA1XHVGRjFBXHU1RTc2XHU1M0QxXHU2QzYwXHU2MzkyXHU3QTdBXHU4OUU2XHU1M0QxXHU4MUVBXHU1MkE4XHU1M0Q5XHU0RThCXHU2NUY2XHU4QkZCXHU1M0Q2XHU3Njg0XHU2NjJGXHU2NzAwXHU2NUIwIHNlbGVjdGVkVGFyZ2V0c1x1MzAwMlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7IGxvYWROYXJyYXRpdmVSZWYuY3VycmVudCA9ICgpID0+IHsgdm9pZCBsb2FkTmFycmF0aXZlKCkgfSB9KVxyXG5cclxuICAvKiogXHU2Mjc5XHU5MUNGXHU1MkZFXHU5MDA5XHU2M0QwXHU0RUE0XHVGRjA4XHU2NUIwXHU1ODlFXHU3Njg0XHU5MDEwXHU2NzYxXHU4OUU2XHU1M0QxIEFJIFx1ODlFM1x1OEJGQlx1RkYwQ1x1NURGMlx1NjcwOVx1NzY4NFx1OEQ3MFx1N0YxM1x1NUI1OFx1RkYwOVx1MzAwMiAqL1xyXG4gIGNvbnN0IHNlbGVjdENvbW1pdHMgPSAoc2hhczogc3RyaW5nW10pOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGFkZGVkID0gc2hhcy5maWx0ZXIoKHNoYSkgPT4gIXNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhzaGEpKVxyXG4gICAgc2V0U2VsZWN0ZWRUYXJnZXRzKChwcmV2aW91cykgPT4gQXJyYXkuZnJvbShuZXcgU2V0KFsuLi5wcmV2aW91cywgLi4uc2hhc10pKSlcclxuICAgIGZvciAoY29uc3Qgc2hhIG9mIGFkZGVkKSBsb2FkRGV0YWlsKHNoYSwgZmFsc2UpXHJcbiAgfVxyXG5cclxuICAvKiogXHU0RTAwXHU5NTJFXHU2RDg4XHU1MzE2XHVGRjFBXHU5MDA5XHU0RTJEXHU1MTY4XHU5MEU4XHU2NzJBXHU2RDg4XHU1MzE2XHU2M0QwXHU0RUE0IFx1MjE5MiBcdTYyNzlcdTkxQ0ZcdTg5RTNcdThCRkIgXHUyMTkyIFx1NjM5Mlx1N0E3QVx1NTQwRVx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1NjU3NFx1NEY1M1x1NTNEOVx1NEU4Qlx1MzAwMiAqL1xyXG4gIGNvbnN0IGRpZ2VzdEFsbCA9ICgpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IHNoYXMgPSAoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLmZpbHRlcigoY29tbWl0KSA9PiBpc1VuZGlnZXN0ZWQoY29tbWl0KSkubWFwKChjb21taXQpID0+IGNvbW1pdC5zaGEpXHJcbiAgICBpZiAoc2hhcy5sZW5ndGggPT09IDApIHJldHVyblxyXG4gICAgc2V0SW1wYWN0KG51bGwpXHJcbiAgICBzZXRSZXZpZXdzKHt9KVxyXG4gICAgY29uc3QgbmVlZHNGZXRjaCA9IHNoYXMuc29tZSgoc2hhKSA9PiAhc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHNoYSkpXHJcbiAgICBzZWxlY3RDb21taXRzKHNoYXMpXHJcbiAgICBpZiAobmVlZHNGZXRjaCkge1xyXG4gICAgICBhdXRvTmFycmF0aXZlUmVmLmN1cnJlbnQgPSBzaGFzLmxlbmd0aCA+PSAyXHJcbiAgICB9IGVsc2UgaWYgKHNoYXMubGVuZ3RoID49IDIpIHtcclxuICAgICAgLy8gXHU1MTY4XHU5MEU4XHU1REYyXHU1NzI4XHU5MDA5XHU0RTJEXHU5NkM2XHU1NDA4XHU0RTE0XHU4OUUzXHU4QkZCXHU5NjFGXHU1MjE3XHU3QTdBXHU5NUYyXHVGRjFBXHU3NkY0XHU2M0E1XHU3NTFGXHU2MjEwXHU1M0Q5XHU0RThCXHVGRjA4XHU3QjQ5XHU0RTAwXHU2MkNEXHU4QkE5IHN0YXRlIFx1ODQzRFx1NTczMFx1RkYwOVx1MzAwMlxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgbG9hZE5hcnJhdGl2ZVJlZi5jdXJyZW50KCkgfSwgMClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbW1pdHNSZXF1ZXN0UmVmID0gdXNlUmVmKDApXHJcbiAgY29uc3QgbG9hZENvbW1pdHMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gKytjb21taXRzUmVxdWVzdFJlZi5jdXJyZW50XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvcHJvamVjdC1jb250cm9sL2FwaS9jb21taXRzP3Nlc3Npb25JZD0ke2VuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpfSZsaW1pdD02MGApXHJcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKChkYXRhIGFzIHsgZXJyb3I/OiBzdHJpbmcgfSkuZXJyb3IgPz8gYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YClcclxuICAgICAgaWYgKCFhY3RpdmVSZWYuY3VycmVudCB8fCByZXF1ZXN0ICE9PSBjb21taXRzUmVxdWVzdFJlZi5jdXJyZW50KSByZXR1cm5cclxuICAgICAgc2V0Q29tbWl0c0RhdGEoZGF0YSBhcyBDb21taXRzUGF5bG9hZClcclxuICAgICAgc2V0Q29tbWl0c0Vycm9yKG51bGwpXHJcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xyXG4gICAgICBpZiAoIWFjdGl2ZVJlZi5jdXJyZW50IHx8IHJlcXVlc3QgIT09IGNvbW1pdHNSZXF1ZXN0UmVmLmN1cnJlbnQpIHJldHVyblxyXG4gICAgICBzZXRDb21taXRzRGF0YShudWxsKVxyXG4gICAgICBzZXRDb21taXRzRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgbG9hZE5vdGVzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXM/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcclxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldE5vdGVzKChkYXRhIGFzIHsgbm90ZXM6IE5vdGVFbnRyeVtdIH0pLm5vdGVzID8/IFtdKVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIFx1N0IxNFx1OEJCMFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2Mlx1RkYxQVx1NTIxN1x1ODg2OFx1NEZERFx1NjMwMVx1NTM5Rlx1NjgzN1x1MzAwMlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NTJGRVx1OTAwOS9cdTUzRDZcdTZEODhcdTRFMDBcdTZCMjFcdTYzRDBcdTRFQTRcdUZGMUFcdTkxQ0RcdTdCOTdcdTkwMDlcdTRFMkRcdTk2QzZcdTU0MDhcdUZGMENcdTVFNzZcdTYzMDlcdTk3MDBcdTg4NjVcdTlGNTBcdTZCQ0ZcdTY3NjFcdTYzRDBcdTRFQTRcdTc2ODQgQUkgXHU4OUUzXHU4QkZCXHVGRjA4XHU2NzBEXHU1MkExXHU3QUVGXHU2NzA5XHU3RjEzXHU1QjU4XHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgdG9nZ2xlVGFyZ2V0ID0gYXN5bmMgKHRhcmdldDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZFRhcmdldHMoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGlmIChwcmV2aW91cy5pbmNsdWRlcyh0YXJnZXQpKSByZXR1cm4gcHJldmlvdXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSB0YXJnZXQpXHJcbiAgICAgIHJldHVybiBbLi4ucHJldmlvdXMsIHRhcmdldF1cclxuICAgIH0pXHJcbiAgICBzZXRJbXBhY3QobnVsbClcclxuICAgIHNldFJldmlld3Moe30pXHJcbiAgICBpZiAoIXNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyh0YXJnZXQpKSB7XHJcbiAgICAgIGxvYWREZXRhaWwodGFyZ2V0LCBmYWxzZSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBcdTY1NzRcdThGNkVcdTkwMDlcdTYyRTlcdUZGMUFcdTY1NzRcdThGNkVcdTVERjJcdTkwMDlcdTY1RjZcdTUxOERcdTcwQjkgPSBcdTUzRDZcdTZEODhcdTY1NzRcdThGNkVcdUZGMUJcdTY1QjBcdTUyRkVcdTkwMDlcdTc2ODRcdTYzRDBcdTRFQTRcdTU0MDRcdTgxRUFcdTYyQzlcdTUzRDYgQUkgXHU4OUUzXHU4QkZCXHUzMDAyICovXHJcbiAgY29uc3Qgc2VsZWN0Um91bmQgPSAoc2hhczogc3RyaW5nW10pOiB2b2lkID0+IHtcclxuICAgIHNldEltcGFjdChudWxsKVxyXG4gICAgc2V0UmV2aWV3cyh7fSlcclxuICAgIGlmIChzaGFzLmV2ZXJ5KChzaGEpID0+IHNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhzaGEpKSkge1xyXG4gICAgICBzZXRTZWxlY3RlZFRhcmdldHMoKHByZXZpb3VzKSA9PiBwcmV2aW91cy5maWx0ZXIoKHNoYSkgPT4gIXNoYXMuaW5jbHVkZXMoc2hhKSkpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgY29uc3QgYWRkZWQgPSBzaGFzLmZpbHRlcigoc2hhKSA9PiAhc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHNoYSkpXHJcbiAgICBzZXRTZWxlY3RlZFRhcmdldHMoKHByZXZpb3VzKSA9PiBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLnByZXZpb3VzLCAuLi5zaGFzXSkpKVxyXG4gICAgZm9yIChjb25zdCBzaGEgb2YgYWRkZWQpIGxvYWREZXRhaWwoc2hhLCBmYWxzZSlcclxuICB9XHJcblxyXG4gIC8qKiBcdTg5RTNcdThCRkJcdTVFNzZcdTUzRDFcdTZDNjBcdUZGMUFcdTZBMjFcdTU3OEJcdTdGNTFcdTUxNzNcdTVFNzZcdTUzRDFcdTY3MDlcdTk2NTBcdUZGMENcdTU5MUFcdTkwMDkvXHU2NTc0XHU4RjZFXHU2Mjc5XHU5MUNGXHU1MkZFXHU5MDA5XHU2NUY2XHU2MzA5XHU0RTBBXHU5NjUwXHU1RTc2XHU1M0QxXHU1MjA2XHU2NzkwXHVGRjA4XHU5RUQ4XHU4QkE0XHU2NzAwXHU1OTFBIDMgXHU0RTJBXHU1NDBDXHU2NUY2XHVGRjA5XHVGRjBDXHU4RDg1XHU1MUZBXHU3Njg0XHU2MzkyXHU5NjFGXHU3QjQ5XHU1Rjg1XHU1RTc2XHU2NjNFXHU3OTNBXHU5NjFGXHU1MjE3XHU2NTcwXHUzMDAyICovXHJcbiAgY29uc3QgTUFYX0RFVEFJTF9DT05DVVJSRU5DWSA9IDNcclxuICBjb25zdCBkZXRhaWxQb29sUmVmID0gdXNlUmVmPHsgcGVuZGluZzogQXJyYXk8eyB0YXJnZXQ6IHN0cmluZzsgZm9yY2U6IGJvb2xlYW4gfT47IGFjdGl2ZTogbnVtYmVyIH0+KHsgcGVuZGluZzogW10sIGFjdGl2ZTogMCB9KVxyXG4gIGNvbnN0IGRldGFpbEluRmxpZ2h0UmVmID0gdXNlUmVmKG5ldyBTZXQ8c3RyaW5nPigpKVxyXG4gIC8qKiBcdTRFMDBcdTk1MkVcdTZEODhcdTUzMTZcdUZGMUFcdTUxNjhcdTkwRThcdTg5RTNcdThCRkJcdThERDFcdTVCOENcdTU0MEVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdTY1NzRcdTRGNTNcdTUzRDlcdTRFOEJcdUZGMDhcdTdFQ0YgcmVmIFx1NTNENlx1NjcwMFx1NjVCMFx1OTVFRFx1NTMwNVx1RkYwQ1x1OTA3Rlx1NTE0RCBzZWxlY3RlZFRhcmdldHMgXHU4RkM3XHU2NzFGXHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgYXV0b05hcnJhdGl2ZVJlZiA9IHVzZVJlZihmYWxzZSlcclxuICBjb25zdCBsb2FkTmFycmF0aXZlUmVmID0gdXNlUmVmPCgpID0+IHZvaWQ+KCgpID0+IHt9KVxyXG5cclxuICBjb25zdCBwdW1wRGV0YWlsUG9vbCA9ICgpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IHBvb2wgPSBkZXRhaWxQb29sUmVmLmN1cnJlbnRcclxuICAgIGlmIChwb29sLmFjdGl2ZSA9PT0gMCAmJiBwb29sLnBlbmRpbmcubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGlmIChhdXRvTmFycmF0aXZlUmVmLmN1cnJlbnQgJiYgYWN0aXZlUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBhdXRvTmFycmF0aXZlUmVmLmN1cnJlbnQgPSBmYWxzZVxyXG4gICAgICAgIGxvYWROYXJyYXRpdmVSZWYuY3VycmVudCgpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB3aGlsZSAoYWN0aXZlUmVmLmN1cnJlbnQgJiYgcG9vbC5hY3RpdmUgPCBNQVhfREVUQUlMX0NPTkNVUlJFTkNZICYmIHBvb2wucGVuZGluZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGpvYiA9IHBvb2wucGVuZGluZy5zaGlmdCgpIVxyXG4gICAgICBwb29sLmFjdGl2ZSArPSAxXHJcbiAgICAgIHZvaWQgbG9hZERldGFpbE9uY2Uoam9iLnRhcmdldCwgam9iLmZvcmNlKVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7fSlcclxuICAgICAgICAuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgICAgICBwb29sLmFjdGl2ZSAtPSAxXHJcbiAgICAgICAgICBwdW1wRGV0YWlsUG9vbCgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGxvYWREZXRhaWwgPSAodGFyZ2V0OiBzdHJpbmcsIGZvcmNlOiBib29sZWFuKTogdm9pZCA9PiB7XHJcbiAgICBpZiAoZGV0YWlsSW5GbGlnaHRSZWYuY3VycmVudC5oYXModGFyZ2V0KSkgcmV0dXJuXHJcbiAgICBkZXRhaWxJbkZsaWdodFJlZi5jdXJyZW50LmFkZCh0YXJnZXQpXHJcbiAgICBzZXREZXRhaWxTdGF0dXMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW3RhcmdldF06ICdxdWV1ZWQnIH0pKVxyXG4gICAgZGV0YWlsUG9vbFJlZi5jdXJyZW50LnBlbmRpbmcucHVzaCh7IHRhcmdldCwgZm9yY2UgfSlcclxuICAgIHB1bXBEZXRhaWxQb29sKClcclxuICB9XHJcblxyXG4gIC8qKiBcdTk2MUZcdTUyMTdcdTRFRkJcdTUyQTFcdTRGNTNcdUZGMUFcdTc3MUZcdTZCNjNcdTUzRDFcdThENzdcdTg5RTNcdThCRkJcdThCRjdcdTZDNDJcdUZGMUJcdTRFRkJcdTRGNTVcdTU5MzFcdThEMjVcdUZGMDhcdTdGNTFcdTdFRENcdTRFMkRcdTY1QUQvXHU4RDg1XHU2NUY2L1x1NjcwRFx1NTJBMVx1NjcyQVx1OEZEMFx1ODg0Q1x1RkYwOVx1OTBGRFx1NTE5OVx1NTE2NVx1NTM2MVx1NzI0N1x1OTUxOVx1OEJFRlx1NTM2MFx1NEY0RFx1RkYwQ1x1N0VERFx1NEUwRFx1NjVFMFx1OTY1MFx1OEY2Q1x1NTcwOFx1MzAwMiAqL1xyXG4gIGNvbnN0IGxvYWREZXRhaWxPbmNlID0gYXN5bmMgKHRhcmdldDogc3RyaW5nLCBmb3JjZTogYm9vbGVhbik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgc2V0RGV0YWlsU3RhdHVzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFt0YXJnZXRdOiAncnVubmluZycgfSkpXHJcbiAgICBjb25zdCBmYWlsUGxhY2Vob2xkZXIgPSAobWVzc2FnZTogc3RyaW5nKTogQ29tbWl0RGV0YWlsUGF5bG9hZCA9PlxyXG4gICAgICAoe1xyXG4gICAgICAgIHNoYTogdGFyZ2V0LFxyXG4gICAgICAgIGlzV29ya2luZzogdGFyZ2V0ID09PSAnd29ya2luZycsXHJcbiAgICAgICAgZmlsZXM6IFtdLFxyXG4gICAgICAgIGluc2VydGlvbnM6IDAsXHJcbiAgICAgICAgZGVsZXRpb25zOiAwLFxyXG4gICAgICAgIHBhdGNoVHJ1bmNhdGVkOiBmYWxzZSxcclxuICAgICAgICBwYXRjaDogJycsXHJcbiAgICAgICAgY29tbWl0OiBudWxsLFxyXG4gICAgICAgIGFuYWx5c2lzOiB7IHdoYXQ6IG1lc3NhZ2UsIGxvZ2ljOiBbXSwgcmlza3M6IFtdIH0sXHJcbiAgICAgIH0pIGFzIHVua25vd24gYXMgQ29tbWl0RGV0YWlsUGF5bG9hZFxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvY29tbWl0LWRldGFpbCcsIHsgc2hhOiB0YXJnZXQsIGZvcmNlIH0pXHJcbiAgICAgIGlmICghb2spIHtcclxuICAgICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHtcclxuICAgICAgICAgIC4uLnByZXZpb3VzLFxyXG4gICAgICAgICAgW3RhcmdldF06IGZhaWxQbGFjZWhvbGRlcignQUkgXHU4OUUzXHU4QkZCXHU1OTMxXHU4RDI1XHVGRjFBJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICcnKSArICdcdUZGMDhcdTcwQjlcdTMwMENcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdTMwMERcdTUzRUZcdTkxQ0RcdThCRDVcdUZGMDknKSxcclxuICAgICAgICB9KSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFt0YXJnZXRdOiBkYXRhIGFzIHVua25vd24gYXMgQ29tbWl0RGV0YWlsUGF5bG9hZCB9KSlcclxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgIGNvbnN0IHJlYXNvbiA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKVxyXG4gICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHtcclxuICAgICAgICAuLi5wcmV2aW91cyxcclxuICAgICAgICBbdGFyZ2V0XTogZmFpbFBsYWNlaG9sZGVyKGBBSSBcdTg5RTNcdThCRkJcdTU5MzFcdThEMjVcdUZGMUEke3JlYXNvbiA9PT0gJ1RoZSB1c2VyIGFib3J0ZWQgYSByZXF1ZXN0LicgPyAnXHU4QkY3XHU2QzQyXHU4RDg1XHU2NUY2XHU2MjE2XHU2NzBEXHU1MkExXHU0RTJEXHU2NUFEJyA6IHJlYXNvbn1cdUZGMDhcdTY4QzBcdTY3RTUgZHNoIFx1NjYyRlx1NTQyNlx1NTcyOFx1OEZEMFx1ODg0Q1x1RkYxQlx1NzBCOVx1MzAwQ1x1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1MzAwRFx1NTNFRlx1OTFDRFx1OEJENVx1RkYwOWApLFxyXG4gICAgICB9KSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIGRldGFpbEluRmxpZ2h0UmVmLmN1cnJlbnQuZGVsZXRlKHRhcmdldClcclxuICAgICAgc2V0RGV0YWlsU3RhdHVzKChwcmV2aW91cykgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH1cclxuICAgICAgICBkZWxldGUgbmV4dFt0YXJnZXRdXHJcbiAgICAgICAgcmV0dXJuIG5leHRcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGxvYWRJbXBhY3QgPSBhc3luYyAoZm9yY2UgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgaWYgKHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDApIHJldHVyblxyXG4gICAgc2V0SW1wYWN0TG9hZGluZyh0cnVlKVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaW1wYWN0LXNjb3BlJywgeyBzaGFzOiBzZWxlY3RlZFRhcmdldHMsIGZvcmNlIH0pXHJcbiAgICAgIHNldEltcGFjdChvayA/IChkYXRhIGFzIHVua25vd24gYXMgSW1wYWN0U2NvcGVQYXlsb2FkKSA6IG51bGwpXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJbXBhY3RMb2FkaW5nKGZhbHNlKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgbG9hZFJldmlld3MgPSBhc3luYyAoZm9yY2UgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgaWYgKHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDApIHJldHVyblxyXG4gICAgc2V0UmV2aWV3TG9hZGluZyh0cnVlKVxyXG4gICAgdHJ5IHtcclxuICAgICAgZm9yIChjb25zdCB0YXJnZXQgb2Ygc2VsZWN0ZWRUYXJnZXRzKSB7XHJcbiAgICAgICAgaWYgKCFhY3RpdmVSZWYuY3VycmVudCkgYnJlYWtcclxuICAgICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9yZXZpZXcnLCB7IHNoYTogdGFyZ2V0LCBmb3JjZSB9KVxyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBkYXRhIGFzIHVua25vd24gYXMgUmV2aWV3UGF5bG9hZFxyXG4gICAgICAgIHNldFJldmlld3MoKHByZXZpb3VzKSA9PiAoe1xyXG4gICAgICAgICAgLi4ucHJldmlvdXMsXHJcbiAgICAgICAgICBbdGFyZ2V0XTogb2sgPyBwYXlsb2FkIDoge1xyXG4gICAgICAgICAgICBpc3N1ZXNGb3VuZDogMCxcclxuICAgICAgICAgICAgaXNzdWVzOiAnJyxcclxuICAgICAgICAgICAgdmVyZGljdDogJ1x1OEJDNFx1NUJBMVx1NTkzMVx1OEQyNVx1RkYxQScgKyBTdHJpbmcocGF5bG9hZFsnZXJyb3InXSA/PyAnJykgKyAnXHVGRjA4XHU1M0VGXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwXHU5MUNEXHU4QkQ1XHVGRjA5JyxcclxuICAgICAgICAgICAgaXNzdWVMaXN0OiBbXSxcclxuICAgICAgICAgICAgY2FjaGVkOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSkpXHJcbiAgICAgIH1cclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldFJldmlld0xvYWRpbmcoZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBsb2FkRmlsZURpZmYgPSBhc3luYyAoc2hhOiBzdHJpbmcsIHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gYCR7c2hhfXwke3BhdGh9YFxyXG4gICAgaWYgKGZpbGVEaWZmc1trZXldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc2V0RmlsZURpZmZzKChwcmV2aW91cykgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH1cclxuICAgICAgICBkZWxldGUgbmV4dFtrZXldXHJcbiAgICAgICAgcmV0dXJuIG5leHRcclxuICAgICAgfSlcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2ZpbGUtZGlmZicsIHsgc2hhLCBwYXRoIH0pXHJcbiAgICBzZXRGaWxlRGlmZnMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW2tleV06IFN0cmluZyhkYXRhWydwYXRjaCddID8/ICcnKSB9KSlcclxuICB9XHJcblxyXG4gIGNvbnN0IGxvYWRJc3N1ZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXM/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcclxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAvLyBcdThGNkVcdThCRTJcdTUyMzdcdTY1QjBcdTRFMERcdTZFMDVcdTdBN0FcdTUyRkVcdTkwMDlcdUZGMUFcdTUyRkVcdTkwMDlcdTk1MkVcdTk2OEZcdTk1RUVcdTk4OTggaWQgXHU4RDcwXHVGRjBDXHU1REYyXHU2RDg4XHU1OTMxXHU3Njg0IGlkIFx1NEUwRFx1NUY3MVx1NTRDRFx1NjYzRVx1NzkzQVx1MzAwMlxyXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldElzc3Vlc0RhdGEoKGRhdGEgYXMgeyBpc3N1ZXM6IElzc3VlRW50cnlbXSB9KS5pc3N1ZXMgPz8gW10pXHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gXHU5NUVFXHU5ODk4XHU1MjE3XHU4ODY4XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXHVGRjFBXHU1MjE3XHU4ODY4XHU0RkREXHU2MzAxXHU1MzlGXHU2ODM3XHUzMDAyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBSZXZpZXcgXHU5ODc1XHU3QjdFXHU1QjlFXHU2NUY2XHU1NDBDXHU2QjY1XHVGRjFBXHU0RkVFXHU1OTBEXHU1QjUwXHU0RUUzXHU3NDA2XHU1NkRFXHU1MTk5XHU3MkI2XHU2MDAxXHU1NDBFXHVGRjBDXHU3NzBCXHU2NzdGIDQgXHU3OUQyXHU1MTg1XHU4RERGXHU0RTBBXHUzMDAyXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0YWIgIT09ICdyZXZpZXcnKSByZXR1cm5cclxuICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB2b2lkIGxvYWRJc3N1ZXMoKTsgdm9pZCBsb2FkRml4U3RhdHVzKCkgfSwgNDAwMClcclxuICAgIHJldHVybiAoKSA9PiB7IGNsZWFySW50ZXJ2YWwodGltZXIpIH1cclxuICB9LCBbdGFiLCBwcm9wcy5zZXNzaW9uSWRdKVxyXG5cclxuICAvKiogXHU2MkM5XHU1M0Q2XHU0RkVFXHU1OTBEXHU2RDNFXHU1M0QxXHU0RUZCXHU1MkExXHU3MkI2XHU2MDAxXHVGRjA4UmV2aWV3IFx1OTg3NVx1OEY2RVx1OEJFMlx1RkYxQlx1NjcwOVx1NkQzQlx1NTJBOFx1NEVGQlx1NTJBMVx1NjVGNlx1OUE3MVx1NTJBOFx1NTIzN1x1NjVCMFx1RkYwOVx1MzAwMiAqL1xyXG4gIGNvbnN0IGxvYWRGaXhTdGF0dXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9maXgvc3RhdHVzP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgICAgICBzZXRGaXhUYXNrcygoZGF0YSBhcyB7IHRhc2tzOiBGaXhUYXNrRW50cnlbXSB9KS50YXNrcyA/PyBbXSlcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIFx1NzJCNlx1NjAwMVx1NjJDOVx1NTNENlx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2Mlx1MzAwMlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NkQzRVx1NTNEMVx1NEZFRVx1NTkwRFx1RkYxQXBsYW5JZHM9XHU2Mjc5XHU1MUM2XHU3Njg0XHU1Rjg1XHU4QkM0XHU1QkExXHU2NUI5XHU2ODQ4XHVGRjFCaXNzdWVJZHM9XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHVGRjA4bW9kZT1maXggXHU0RkVFXHU1OTBEIC8gcGxhbiBcdTUzRUFcdThCRkJcdTUxRkFcdTY1QjlcdTY4NDhcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBkaXNwYXRjaEZpeCA9IGFzeW5jIChwbGFuSWRzOiBzdHJpbmdbXSwgaXNzdWVJZHM6IHN0cmluZ1tdLCBtb2RlOiAnZml4JyB8ICdwbGFuJyA9ICdmaXgnKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBpZiAocGxhbklkcy5sZW5ndGggPT09IDAgJiYgaXNzdWVJZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyB0KCdmaXguZGlzcGF0Y2hFbXB0eScpKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2ZpeC9kaXNwYXRjaCcsIHsgcGxhbklkcywgaXNzdWVJZHMsIG1vZGUgfSlcclxuICAgIGlmIChvaykge1xyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgnZml4LmRpc3BhdGNoRG9uZScpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhkYXRhWydhY2NlcHRlZCddID8/IDApKS5yZXBsYWNlKCd7Y30nLCBTdHJpbmcoZGF0YVsnY29uY3VycmVuY3knXSA/PyAzKSkpXHJcbiAgICAgIGF3YWl0IGxvYWRGaXhTdGF0dXMoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NTA1Q1x1NkI2Mlx1NEZFRVx1NTkwRFx1NkQzRVx1NTNEMVx1RkYxQVx1NTNENlx1NkQ4OFx1NjM5Mlx1OTYxRlx1NEUwRVx1OEZEMFx1ODg0Q1x1NEUyRFx1NzY4NFx1NEVGQlx1NTJBMVx1MzAwMiAqL1xyXG4gIGNvbnN0IGNhbmNlbEZpeCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2ZpeC9jYW5jZWwnLCB7fSlcclxuICAgIGlmIChvaykgc2V0QWN0aW9uUmVzdWx0KCdcdTIzRjkgJyArIHQoJ2ZpeC5zdG9wRG9uZScpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhkYXRhWydzdG9wcGVkJ10gPz8gMCkpKVxyXG4gICAgYXdhaXQgbG9hZEZpeFN0YXR1cygpXHJcbiAgfVxyXG5cclxuICAvKiogXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHU1QkZDXHU1MUZBXHU0RTNBIE1hcmtkb3duXHVGRjA4XHU2MzA5XHU0RTI1XHU5MUNEXHU1RUE2XHU2MzkyXHU1RThGXHVGRjFCXHU1OTBEXHU3NTI4XHU3QjE0XHU4QkIwXHU1QkZDXHU1MUZBXHU3Njg0XHU0RTBCXHU4RjdEXHU2NUI5XHU1RjBGXHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgZXhwb3J0SXNzdWVzTWQgPSAoaXNzdWVzOiBJc3N1ZUVudHJ5W10pOiB2b2lkID0+IHtcclxuICAgIGlmIChpc3N1ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyB0KCdyZXZpZXcuZXhwb3J0RW1wdHknKSlcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCBzZXZlcml0eU9yZGVyOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0geyBibG9ja2VyOiAwLCBjcml0aWNhbDogMSwgbWFqb3I6IDIsIG1pbm9yOiAzLCBpbmZvOiA0IH1cclxuICAgIGNvbnN0IG9yZGVyZWQgPSBbLi4uaXNzdWVzXS5zb3J0KChsZWZ0LCByaWdodCkgPT5cclxuICAgICAgKHNldmVyaXR5T3JkZXJbbm9ybWFsaXplSXNzdWVTZXZlcml0eShsZWZ0LnNldmVyaXR5KV0gPz8gOSkgLSAoc2V2ZXJpdHlPcmRlcltub3JtYWxpemVJc3N1ZVNldmVyaXR5KHJpZ2h0LnNldmVyaXR5KV0gPz8gOSlcclxuICAgICAgfHwgbGVmdC5jcmVhdGVkQXQgLSByaWdodC5jcmVhdGVkQXQpXHJcbiAgICBjb25zdCBsaW5lczogc3RyaW5nW10gPSBbXHJcbiAgICAgICcjIFJldmlldyBcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTUnLFxyXG4gICAgICAnJyxcclxuICAgICAgYC0gXHU5ODc5XHU3NkVFXHVGRjFBJHtzdGF0ZT8ucHJvamVjdD8ubmFtZSA/PyAnXHUyMDE0J31gLFxyXG4gICAgICBgLSBcdTRFRDNcdTVFOTNcdUZGMUEke2NvbW1pdHNEYXRhPy5yb290UGF0aCA/PyBzdGF0ZT8ucHJvamVjdD8ucm9vdFBhdGggPz8gJ1x1MjAxNCd9YCxcclxuICAgICAgYC0gXHU1MjA2XHU2NTJGXHVGRjFBJHtjb21taXRzRGF0YT8uYnJhbmNoID8/ICdcdTIwMTQnfWAsXHJcbiAgICAgIGAtIFx1NUJGQ1x1NTFGQVx1NjVGNlx1OTVGNFx1RkYxQSR7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfWAsXHJcbiAgICAgIGAtIFx1NjU3MFx1OTFDRlx1RkYxQSR7aXNzdWVzLmxlbmd0aH1cdUZGMDhcdTVGODVcdTU5MDRcdTc0MDYgJHtpc3N1ZXMuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykubGVuZ3RofVx1RkYwOWAsXHJcbiAgICAgICcnLFxyXG4gICAgXVxyXG4gICAgb3JkZXJlZC5mb3JFYWNoKChpc3N1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gaXNzdWUuY2hhbmdlSWQuc3RhcnRzV2l0aCgncmV2aWV3OicpICYmIGlzc3VlLmNoYW5nZUlkICE9PSAncmV2aWV3Ondvcmt0cmVlJ1xyXG4gICAgICAgID8gYFx1NjNEMFx1NEVBNCAke2lzc3VlLmNoYW5nZUlkLnNsaWNlKCdyZXZpZXc6Jy5sZW5ndGgsICdyZXZpZXc6Jy5sZW5ndGggKyA4KX1gXHJcbiAgICAgICAgOiBpc3N1ZS5jaGFuZ2VJZCA9PT0gJ3Jldmlldzp3b3JrdHJlZScgPyAnXHU1REU1XHU0RjVDXHU1MzNBJyA6IGlzc3VlLmNoYW5nZUlkXHJcbiAgICAgIGxpbmVzLnB1c2goYCMjICR7aW5kZXggKyAxfS4gWyR7aXNzdWUuc2V2ZXJpdHl9XVske2lzc3VlLmNhdGVnb3J5IHx8ICdnZW5lcmFsJ31dICR7aXNzdWUudGl0bGV9YClcclxuICAgICAgbGluZXMucHVzaCgnJylcclxuICAgICAgbGluZXMucHVzaChgLSBcdTcyQjZcdTYwMDFcdUZGMUEke0lTU1VFX1NUQVRVU19MQUJFTFNbaXNzdWUuc3RhdHVzXSA/PyBpc3N1ZS5zdGF0dXN9YClcclxuICAgICAgbGluZXMucHVzaChgLSBcdTVCRjlcdThDNjFcdUZGMUEke3RhcmdldH1gKVxyXG4gICAgICBsaW5lcy5wdXNoKGAtIFx1NTNEMVx1NzNCMFx1NjVGNlx1OTVGNFx1RkYxQSR7bmV3IERhdGUoaXNzdWUuY3JlYXRlZEF0KS50b0xvY2FsZVN0cmluZygpfWApXHJcbiAgICAgIGlmICgoaXNzdWUuZGVzY3JpcHRpb24gPz8gJycpICE9PSAnJykgbGluZXMucHVzaChgLSBcdTYzQ0ZcdThGRjBcdUZGMUEke2lzc3VlLmRlc2NyaXB0aW9uIS5yZXBsYWNlKC9cXG4vZywgJyAnKX1gKVxyXG4gICAgICBpZiAoKGlzc3VlLnJlc29sdXRpb24gPz8gJycpICE9PSAnJykgbGluZXMucHVzaChgLSBcdTdFRDNcdThCQkFcdUZGMUEke2lzc3VlLnJlc29sdXRpb259YClcclxuICAgICAgbGluZXMucHVzaCgnJylcclxuICAgIH0pXHJcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2xpbmVzLmpvaW4oJ1xcbicpXSwgeyB0eXBlOiAndGV4dC9tYXJrZG93bjtjaGFyc2V0PXV0Zi04JyB9KVxyXG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxyXG4gICAgY29uc3QgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXHJcbiAgICBhbmNob3IuaHJlZiA9IHVybFxyXG4gICAgYW5jaG9yLmRvd25sb2FkID0gYHJldmlldy1pc3N1ZXMtJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApfS5tZGBcclxuICAgIGFuY2hvci5jbGljaygpXHJcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybClcclxuICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzICcgKyB0KCdub3Rlcy5leHBvcnREb25lJykpXHJcbiAgfVxyXG5cclxuICAvKiogXHU0RTAwXHU5NTJFXHU2RTA1XHU3QTdBXHU2NzJBXHU4OUUzXHU1MUIzXHU5NUVFXHU5ODk4XHVGRjFBXHU2NzBEXHU1MkExXHU3QUVGXHU1MzlGXHU1QjUwXHU3RjZFIGFjY2VwdGVkXHVGRjA4XHU0RTBEXHU0RkVFXHU0RUUzXHU3ODAxXHVGRjA5XHUzMDAyXHU2NTcwXHU5MUNGXHU1NzI4IEpTWCBcdTUxODVcdTgwNTRcdThCQTFcdTdCOTdcclxuICAgKiAgXHVGRjA4dmlzaWJsZSBcdTY2MkZcdTk4NzVcdTdCN0VcdTVDNDBcdTkwRThcdTUzRDhcdTkxQ0ZcdUZGMENcdTY3MkNcdTUxRkRcdTY1NzBcdTRFMERcdTUzRUZcdTVGMTVcdTc1MjhcdTIwMTRcdTIwMTRcdTY2RkVcdTU2RTBcdTZCNjQgUmVmZXJlbmNlRXJyb3JcdUZGMEMyMDI2LTExLTA0XHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgcHVyZ2VPcGVuSXNzdWVzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaXNzdWVzL3B1cmdlLW9wZW4nLCB7IHNlc3Npb25JZDogcHJvcHMuc2Vzc2lvbklkID8/ICcnIH0pXHJcbiAgICBhd2FpdCBsb2FkSXNzdWVzKClcclxuICAgIHNldEFjdGlvblJlc3VsdChva1xyXG4gICAgICA/ICdcdTI3MTMgJyArIHQoJ3Jldmlldy5wdXJnZU9wZW5Eb25lJykucmVwbGFjZSgne259JywgU3RyaW5nKGRhdGFbJ3B1cmdlZCddID8/IDApKVxyXG4gICAgICA6ICdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NjI3OVx1OTFDRlx1NjgwN1x1OEJCMFx1NURGMlx1NTkwNFx1NzQwNlx1RkYwOGFjY2VwdGVkXHVGRjA5XHVGRjFBXHU0RUJBXHU1REU1XHU3ODZFXHU4QkE0XHU2NUUwXHU5NzAwXHU5MDEwXHU2NzYxXHU1OTBEXHU2OEMwXHU2NUY2XHU3NkY0XHU2M0E1XHU3RUQzXHU2ODQ4XHUzMDAyICovXHJcbiAgY29uc3QgbWFya0lzc3Vlc0hhbmRsZWQgPSBhc3luYyAoaWRzOiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgbGV0IGRvbmUgPSAwXHJcbiAgICBmb3IgKGNvbnN0IGlkIG9mIGlkcykge1xyXG4gICAgICBjb25zdCB7IG9rIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXMvc3RhdHVzJywgeyBpZCwgc3RhdHVzOiAnYWNjZXB0ZWQnIH0pXHJcbiAgICAgIGlmIChvaykgZG9uZSArPSAxXHJcbiAgICB9XHJcbiAgICBhd2FpdCBsb2FkSXNzdWVzKClcclxuICAgIGlmIChkb25lID4gMCkgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgJyArIHQoJ3Jldmlldy5oYW5kbGVkRG9uZScpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhkb25lKSkpXHJcbiAgfVxyXG5cclxuICAvKiogXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwXHVGRjFBXHU1QkY5XHU5MDA5XHU0RTJEXHU3Njg0XHU4QkM0XHU1QkExXHU3NkVFXHU2ODA3XHU5MDEwXHU0RTJBXHU4REQxXHU1OTBEXHU2OEMwXHVGRjA4XHU0RTMyXHU4ODRDIExMTVx1RkYwOVx1RkYwQ1x1NUI5RVx1NjVGNlx1OEZEQlx1NUVBNlx1MzAwMVx1NTNFRlx1NEUyRFx1OTAxNFx1NTA1Q1x1NkI2Mlx1MzAwMiAqL1xyXG4gIGNvbnN0IHJ1bkJhdGNoVmVyaWZ5ID0gYXN5bmMgKHRhcmdldHM6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBpZiAodGFyZ2V0cy5sZW5ndGggPT09IDApIHJldHVyblxyXG4gICAgYmF0Y2hTdG9wUmVmLmN1cnJlbnQgPSBmYWxzZVxyXG4gICAgc2V0QmF0Y2hWZXJpZnlTdGF0ZSh7IGRvbmU6IDAsIHRvdGFsOiB0YXJnZXRzLmxlbmd0aCB9KVxyXG4gICAgbGV0IHJlc29sdmVkVG90YWwgPSAwXHJcbiAgICBsZXQgb3BlblRvdGFsID0gMFxyXG4gICAgbGV0IG5ld1RvdGFsID0gMFxyXG4gICAgbGV0IGZhaWxlZCA9IDBcclxuICAgIGZvciAoY29uc3QgW2luZGV4LCB0YXJnZXRdIG9mIHRhcmdldHMuZW50cmllcygpKSB7XHJcbiAgICAgIGlmIChiYXRjaFN0b3BSZWYuY3VycmVudCkgYnJlYWtcclxuICAgICAgc2V0QmF0Y2hWZXJpZnlTdGF0ZSh7IGRvbmU6IGluZGV4LCB0b3RhbDogdGFyZ2V0cy5sZW5ndGggfSlcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXMvdmVyaWZ5JywgeyB0YXJnZXQgfSlcclxuICAgICAgICBpZiAoIW9rKSBmYWlsZWQgKz0gMVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgcmVzb2x2ZWRUb3RhbCArPSAoKGRhdGFbJ3Jlc29sdmVkJ10gYXMgdW5rbm93bltdKSA/PyBbXSkubGVuZ3RoXHJcbiAgICAgICAgICBvcGVuVG90YWwgKz0gKChkYXRhWydzdGlsbE9wZW4nXSBhcyB1bmtub3duW10pID8/IFtdKS5sZW5ndGhcclxuICAgICAgICAgIG5ld1RvdGFsICs9ICgoZGF0YVsnbmV3SXNzdWVzJ10gYXMgdW5rbm93bltdKSA/PyBbXSkubGVuZ3RoXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICBmYWlsZWQgKz0gMVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXRCYXRjaFZlcmlmeVN0YXRlKG51bGwpXHJcbiAgICBhd2FpdCBsb2FkSXNzdWVzKClcclxuICAgIGlmIChiYXRjaFN0b3BSZWYuY3VycmVudCkgc2V0QWN0aW9uUmVzdWx0KCdcdTIzRjkgJyArIHQoJ3Jldmlldy5iYXRjaFN0b3BwZWQnKSlcclxuICAgIGVsc2Ugc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgJyArIHQoJ3Jldmlldy5iYXRjaERvbmUnKS5yZXBsYWNlKCd7YX0nLCBTdHJpbmcocmVzb2x2ZWRUb3RhbCkpLnJlcGxhY2UoJ3tifScsIFN0cmluZyhvcGVuVG90YWwpKS5yZXBsYWNlKCd7Y30nLCBTdHJpbmcobmV3VG90YWwpKS5yZXBsYWNlKCd7ZH0nLCBTdHJpbmcoZmFpbGVkKSkpXHJcbiAgfVxyXG5cclxuICAvKiogXHU2NTc0XHU0RjUzXHU1MjA2XHU4QkNBXHVGRjFBXHU1RkFBXHU3M0FGXHU4QzAzXHU3NTI4IC9pc3N1ZXMvdHJpYWdlIFx1NzZGNFx1ODFGMyBkb25lXHVGRjA4XHU2QkNGXHU2Mjc5ID0gXHU2NzBEXHU1MkExXHU3QUVGXCJvcGVuIFx1NEUxNFx1NjcyQ1x1OEY2RVx1NjcyQVx1OTAwMVx1NUJBMVwiXHU3Njg0XHU1MjREIE4gXHU2NzYxXHVGRjA5XHVGRjBDXHJcbiAgICogXHU1MjI0XHU1QjlBXHU1MzczXHU2NUY2XHU1MTczXHU5NUVEXHUzMDAxXHU1M0VGXHU1MDVDXHU2QjYyXHU1M0VGXHU3RUVEXHU4REQxXHVGRjA4XHU2NzBEXHU1MkExXHU3QUVGIHNlZW4gXHU4QkIwXHU1RkM2XHU5NjMyXHU5MUNEXHU1OTBEXHU2RDg4XHU4MDE3XHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgcnVuVHJpYWdlID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgYmF0Y2hTdG9wUmVmLmN1cnJlbnQgPSBmYWxzZVxyXG4gICAgLy8gcmVtYWluaW5nPS0xID0gXHU1QzFBXHU2NzJBXHU2MkZGXHU1MjMwXHU5OTk2XHU2Mjc5XHU1NENEXHU1RTk0XHVGRjA4XHU2NjNFXHU3OTNBIFx1MjAyNiBcdTgwMENcdTRFMERcdTY2MkZcdThCRUZcdTVCRkNcdTYwMjdcdTc2ODQgMFx1RkYwOVx1MzAwMlxyXG4gICAgc2V0VHJpYWdlU3RhdGUoeyBwcm9jZXNzZWQ6IDAsIHJlbWFpbmluZzogLTEgfSlcclxuICAgIGNvbnN0IGNsb3NlZCA9IHsgZHVwbGljYXRlOiAwLCBvYnNvbGV0ZTogMCwgZmFsc2VfcG9zaXRpdmU6IDAgfVxyXG4gICAgbGV0IGtlcHQgPSAwXHJcbiAgICBsZXQgcHJvY2Vzc2VkID0gMFxyXG4gICAgbGV0IHBhcnNlRmFpbGVkID0gZmFsc2VcclxuICAgIGxldCBzdG9wcGVkID0gZmFsc2VcclxuICAgIGxldCBmaXJzdCA9IHRydWVcclxuICAgIGZvciAoOzspIHtcclxuICAgICAgaWYgKGJhdGNoU3RvcFJlZi5jdXJyZW50KSB7IHN0b3BwZWQgPSB0cnVlOyBicmVhayB9XHJcbiAgICAgIGxldCBvdXRjb21lOiB7IG9rOiBib29sZWFuOyBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB9XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgb3V0Y29tZSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcy90cmlhZ2UnLCB7IHNlc3Npb25JZDogcHJvcHMuc2Vzc2lvbklkID8/ICcnLCAuLi4oZmlyc3QgPyB7IHJlc2V0OiB0cnVlIH0gOiB7fSkgfSlcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgb3V0Y29tZSA9IHsgb2s6IGZhbHNlLCBkYXRhOiB7IGVycm9yOiAnbmV0d29yayBlcnJvcicgfSB9XHJcbiAgICAgIH1cclxuICAgICAgZmlyc3QgPSBmYWxzZVxyXG4gICAgICBpZiAoIW91dGNvbWUub2spIHsgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhvdXRjb21lLmRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpOyBicmVhayB9XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBvdXRjb21lLmRhdGFcclxuICAgICAgLy8gXHU1MTQ4XHU3RDJGXHU1MkEwXHU1MThEXHU1MjI0IGRvbmVcdUZGMUFcdTY3MDBcdTU0MEVcdTRFMDBcdTYyNzlcdUZGMDhkb25lOnRydWUgXHU0RTE0IHByb2Nlc3NlZD4wXHVGRjA5XHU3Njg0XHU4QkExXHU2NTcwXHU0RTBEXHU4MEZEXHU0RTIyXHUzMDAyXHJcbiAgICAgIGNvbnN0IGJhdGNoQ2xvc2VkID0gKGRhdGFbJ2Nsb3NlZCddID8/IHt9KSBhcyBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+XHJcbiAgICAgIGNsb3NlZC5kdXBsaWNhdGUgKz0gTnVtYmVyKGJhdGNoQ2xvc2VkWydkdXBsaWNhdGUnXSA/PyAwKVxyXG4gICAgICBjbG9zZWQub2Jzb2xldGUgKz0gTnVtYmVyKGJhdGNoQ2xvc2VkWydvYnNvbGV0ZSddID8/IDApXHJcbiAgICAgIGNsb3NlZC5mYWxzZV9wb3NpdGl2ZSArPSBOdW1iZXIoYmF0Y2hDbG9zZWRbJ2ZhbHNlX3Bvc2l0aXZlJ10gPz8gMClcclxuICAgICAga2VwdCArPSBOdW1iZXIoZGF0YVsna2VwdCddID8/IDApXHJcbiAgICAgIHByb2Nlc3NlZCArPSBOdW1iZXIoZGF0YVsncHJvY2Vzc2VkJ10gPz8gMClcclxuICAgICAgaWYgKGRhdGFbJ3BhcnNlRmFpbGVkJ10gPT09IHRydWUpIHBhcnNlRmFpbGVkID0gdHJ1ZVxyXG4gICAgICBpZiAoZGF0YVsnZG9uZSddID09PSB0cnVlKSBicmVha1xyXG4gICAgICBzZXRUcmlhZ2VTdGF0ZSh7IHByb2Nlc3NlZCwgcmVtYWluaW5nOiBOdW1iZXIoZGF0YVsncmVtYWluaW5nJ10gPz8gMCkgfSlcclxuICAgIH1cclxuICAgIHNldFRyaWFnZVN0YXRlKG51bGwpXHJcbiAgICBhd2FpdCBsb2FkSXNzdWVzKClcclxuICAgIGlmIChzdG9wcGVkKSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjNGOSAnICsgdCgncmV2aWV3LnRyaWFnZVN0b3BwZWQnKSlcclxuICAgIGVsc2UgaWYgKHByb2Nlc3NlZCA9PT0gMCkge1xyXG4gICAgICAvLyBcdTk5OTZcdThGNkVcdTUzNzMgZG9uZSBcdTRFMTRcdTk2RjZcdTU5MDRcdTc0MDZcdUZGMUFcdTVGNTNcdTUyNERcdTRGMUFcdThCRERcdTVCOUFcdTRGNERcdTUyMzBcdTc2ODRcdTk4NzlcdTc2RUVcdTZDQTFcdTY3MDlcdTVGODVcdTUyMDZcdThCQ0FcdTk1RUVcdTk4OThcdTIwMTRcdTIwMTRcdTgyRTVcdTRFMEVcdTUyMTdcdTg4NjhcdTRFMERcdTdCMjZcdUZGMENcdTU5MUFcdTUzNEFcdTY2MkZcdTRGMUFcdThCRERcdTRFMERcdTVDNUVcdTRFOEVcdThCRTVcdTk4NzlcdTc2RUVcdTMwMDJcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIHQoJ3Jldmlldy50cmlhZ2VOb3RoaW5nJykpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgncmV2aWV3LnRyaWFnZURvbmUnKVxyXG4gICAgICAgIC5yZXBsYWNlKCd7YX0nLCBTdHJpbmcoY2xvc2VkLmR1cGxpY2F0ZSkpLnJlcGxhY2UoJ3tifScsIFN0cmluZyhjbG9zZWQub2Jzb2xldGUpKS5yZXBsYWNlKCd7Y30nLCBTdHJpbmcoY2xvc2VkLmZhbHNlX3Bvc2l0aXZlKSkucmVwbGFjZSgne2R9JywgU3RyaW5nKGtlcHQpKVxyXG4gICAgICAgICsgKHBhcnNlRmFpbGVkID8gdCgncmV2aWV3LnRyaWFnZVBhcnNlRmFpbCcpIDogJycpKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogXHU5NUVFXHU5ODk4XHU1OTBEXHU2OEMwXHVGRjFBXHU1QkY5XHU4QkU1XHU5NUVFXHU5ODk4XHU2MjQwXHU1QzVFXHU4QkM0XHU1QkExXHU3NkVFXHU2ODA3XHU5MUNEXHU4REQxXHU2OEMwXHU2RDRCXHVGRjA4XHU0RkVFXHU1OTBEXHU3ODZFXHU4QkE0ICsgXHU2NzAwXHU0RjE4XHU2MDI3L1x1NjcwMFx1NUMwRlx1NEZCNVx1NTE2NSArIFx1NjVCMFx1OTVFRVx1OTg5OFx1NjI2Qlx1NjNDRlx1RkYwOVx1RkYwQ1xyXG4gICAqIFx1NTNFQVx1NjcwOVx1NTkwRFx1NjhDMFx1OTAxQVx1OEZDN1x1NjI0RFx1ODFFQVx1NTJBOFx1N0Y2RVx1NEUzQVx1NURGMlx1ODlFM1x1NTFCM1x1RkYxQlx1N0VEM1x1Njc5Q1x1NEVFNVx1NTkwRFx1NjhDMFx1NjJBNVx1NTQ0QVx1NUY2Mlx1NUYwRlx1NUM1NVx1NzkzQVx1MzAwMlxyXG4gICAqL1xyXG4gIGNvbnN0IHZlcmlmeUlzc3VlcyA9IGFzeW5jICh0YXJnZXQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgc2V0VmVyaWZ5aW5nVGFyZ2V0KHRhcmdldClcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcy92ZXJpZnknLCB7IHRhcmdldCB9KVxyXG4gICAgICBpZiAoIW9rKSB7XHJcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkID0gKGRhdGFbJ3Jlc29sdmVkJ10gYXMgc3RyaW5nW10gfCB1bmRlZmluZWQpID8/IFtdXHJcbiAgICAgIGNvbnN0IHN0aWxsT3BlbiA9IChkYXRhWydzdGlsbE9wZW4nXSBhcyBBcnJheTx7IHRpdGxlOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0+IHwgdW5kZWZpbmVkKSA/PyBbXVxyXG4gICAgICBjb25zdCBuZXdJc3N1ZXMgPSAoZGF0YVsnbmV3SXNzdWVzJ10gYXMgQXJyYXk8eyBzZXZlcml0eTogc3RyaW5nOyB0aXRsZTogc3RyaW5nIH0+IHwgdW5kZWZpbmVkKSA/PyBbXVxyXG4gICAgICBjb25zdCB2ZXJkaWN0ID0gU3RyaW5nKGRhdGFbJ3ZlcmRpY3QnXSA/PyAnJylcclxuICAgICAgY29uc3QgbGluZXMgPSBbXHJcbiAgICAgICAgYFx1NTkwRFx1NjhDMFx1NUI4Q1x1NjIxMFx1RkYxQVx1NURGMlx1NEZFRVx1NTkwRCAke3Jlc29sdmVkLmxlbmd0aH0gXHUwMEI3IFx1NEVDRFx1NjcyQVx1NEZFRVx1NTkwRCAke3N0aWxsT3Blbi5sZW5ndGh9IFx1MDBCNyBcdTY1QjBcdTU4OUVcdTk1RUVcdTk4OTggJHtuZXdJc3N1ZXMubGVuZ3RofWAsXHJcbiAgICAgICAgLi4uKHJlc29sdmVkLmxlbmd0aCA+IDAgPyBbYFx1MjcxMyBcdTVERjJcdTRGRUVcdTU5MERcdUZGMUEke3Jlc29sdmVkLmpvaW4oJ1x1RkYxQicpfWBdIDogW10pLFxyXG4gICAgICAgIC4uLihzdGlsbE9wZW4ubGVuZ3RoID4gMCA/IHN0aWxsT3Blbi5tYXAoKGl0ZW0pID0+IGBcdTI3MTcgXHU2NzJBXHU0RkVFXHU1OTBEXHVGRjFBJHtpdGVtLnRpdGxlfSBcdTIwMTRcdTIwMTQgJHtpdGVtLnJlYXNvbn1gKSA6IFtdKSxcclxuICAgICAgICAuLi4obmV3SXNzdWVzLmxlbmd0aCA+IDAgPyBuZXdJc3N1ZXMubWFwKChpdGVtKSA9PiBgXHVGRjBCIFx1NjVCMFx1OTVFRVx1OTg5OFx1RkYxQVske2l0ZW0uc2V2ZXJpdHl9XSAke2l0ZW0udGl0bGV9YCkgOiBbXSksXHJcbiAgICAgICAgLi4uKHZlcmRpY3QgPT09ICcnID8gW10gOiBbYFx1NjcwMFx1NEYxOFx1NjAyN1x1RkYxQSR7dmVyZGljdH1gXSksXHJcbiAgICAgIF1cclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KGxpbmVzLmpvaW4oJ1xcbicpKVxyXG4gICAgICBhd2FpdCBsb2FkSXNzdWVzKClcclxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldFZlcmlmeWluZ1RhcmdldChudWxsKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgYWRkTm90ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGlmIChub3RlVGl0bGUudHJpbSgpID09PSAnJyB8fCBub3RlQ29udGVudC50cmltKCkgPT09ICcnKSByZXR1cm5cclxuICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzJywge1xyXG4gICAgICB0aXRsZTogbm90ZVRpdGxlLnRyaW0oKSxcclxuICAgICAgY29udGVudDogbm90ZUNvbnRlbnQudHJpbSgpLFxyXG4gICAgICB0YWdzOiBub3RlVGFncyxcclxuICAgICAgc2hhOiBzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwID8gdW5kZWZpbmVkIDogc2VsZWN0ZWRUYXJnZXRzWzBdLFxyXG4gICAgfSlcclxuICAgIGlmIChvaykge1xyXG4gICAgICBzZXROb3RlVGl0bGUoJycpXHJcbiAgICAgIHNldE5vdGVDb250ZW50KCcnKVxyXG4gICAgICBzZXROb3RlVGFncygnJylcclxuICAgICAgYXdhaXQgbG9hZE5vdGVzKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHJlbW92ZU5vdGUgPSBhc3luYyAoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMvZGVsZXRlJywgeyBpZCB9KVxyXG4gICAgaWYgKGVkaXRpbmdOb3RlICE9PSBudWxsICYmIGVkaXRpbmdOb3RlLmlkID09PSBpZCkgc2V0RWRpdGluZ05vdGUobnVsbClcclxuICAgIGF3YWl0IGxvYWROb3RlcygpXHJcbiAgfVxyXG5cclxuICBjb25zdCBzYXZlTm90ZUVkaXQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBpZiAoZWRpdGluZ05vdGUgPT09IG51bGwpIHJldHVyblxyXG4gICAgYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMvdXBkYXRlJywgeyBpZDogZWRpdGluZ05vdGUuaWQsIHRpdGxlOiBlZGl0aW5nTm90ZS50aXRsZSwgY29udGVudDogZWRpdGluZ05vdGUuY29udGVudCwgdGFnczogZWRpdGluZ05vdGUudGFncyB9KVxyXG4gICAgc2V0RWRpdGluZ05vdGUobnVsbClcclxuICAgIGF3YWl0IGxvYWROb3RlcygpXHJcbiAgfVxyXG5cclxuICAvKiogXHU3RjZFXHU5ODc2L1x1NTNENlx1NkQ4OFx1N0Y2RVx1OTg3Nlx1NEUwMFx1Njc2MVx1N0IxNFx1OEJCMFx1MzAwMiAqL1xyXG4gIGNvbnN0IHRvZ2dsZU5vdGVQaW4gPSBhc3luYyAobm90ZTogTm90ZUVudHJ5KTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy91cGRhdGUnLCB7IGlkOiBub3RlLmlkLCBwaW5uZWQ6IG5vdGUucGlubmVkICE9PSB0cnVlIH0pXHJcbiAgICBhd2FpdCBsb2FkTm90ZXMoKVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1N0IxNFx1OEJCMFx1NUJGQ1x1NTFGQVx1NEUzQSAubWQgXHU2NTg3XHU0RUY2XHVGRjA4XHU2RDRGXHU4OUM4XHU1NjY4XHU3QUVGIEJsb2IgXHU0RTBCXHU4RjdEXHVGRjFCXHU2NTg3XHU0RUY2XHU1NDBEXHU2MzA5XHU2ODA3XHU5ODk4XHU2RTA1XHU2RDE3XHVGRjBDXHU5NzVFXHU2Q0Q1XHU1QjU3XHU3QjI2XHU2NkZGXHU2MzYyXHU0RTNBXHU0RTBCXHU1MjEyXHU3RUJGXHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgZXhwb3J0Tm90ZSA9IChub3RlOiBOb3RlRW50cnkpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IG1kID0gYCMgJHtub3RlLnRpdGxlfVxcblxcbiR7bm90ZS5jb250ZW50fVxcbmBcclxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbbWRdLCB7IHR5cGU6ICd0ZXh0L21hcmtkb3duO2NoYXJzZXQ9dXRmLTgnIH0pXHJcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXHJcbiAgICBjb25zdCBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcclxuICAgIGFuY2hvci5ocmVmID0gdXJsXHJcbiAgICBhbmNob3IuZG93bmxvYWQgPSAobm90ZS50aXRsZS5yZXBsYWNlKC9bXFxcXC86Kj9cIjw+fF0vZywgJ18nKS50cmltKCkuc2xpY2UoMCwgNjApIHx8ICdub3RlJykgKyAnLm1kJ1xyXG4gICAgYW5jaG9yLmNsaWNrKClcclxuICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKVxyXG4gICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgJyArIHQoJ25vdGVzLmV4cG9ydERvbmUnKSlcclxuICB9XHJcblxyXG4gIC8qKiBBSSBcdTVCNjZcdTRFNjBcdTYwM0JcdTdFRDNcdUZGMUFcdTVCRjlcdTZCRDRcdTRFMEFcdTZCMjFcdTYwM0JcdTdFRDNcdTUwNUFcdTU4OUVcdTkxQ0ZcdTY2RjRcdTY1QjBcdUZGMENcdTYyOEFcdTdCMTRcdThCQjArXHU5ODc5XHU3NkVFXHU2ODYzXHU2ODQ4XHU2M0QwXHU3MEJDXHU2MjEwXHU0RTAwXHU0RUZEXHUzMDBDXHU2RDNCXHUzMDBEXHU3Njg0XHU2MDNCXHU3RUQzXHU2NTg3XHU2ODYzXHUzMDAyICovXHJcbiAgY29uc3QgYWlTdW1tYXJpemUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBzZXRBaVN1bW1hcml6aW5nKHRydWUpXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy9haS1zdW1tYXJ5Jywge30pXHJcbiAgICAgIGlmICghb2spIHtcclxuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KGRhdGFbJ3VwZGF0ZWQnXSA9PT0gdHJ1ZVxyXG4gICAgICAgID8gJ1x1MjcxMyBcdTVERjJcdTVCRjlcdTZCRDRcdTRFMEFcdTZCMjFcdTYwM0JcdTdFRDNcdTVCOENcdTYyMTBcdTU4OUVcdTkxQ0ZcdTY2RjRcdTY1QjBcdUZGMDhcdTY1QjBcdTU4OUVcdTUzRDhcdTUzMTZcdTg5QzFcdTYwM0JcdTdFRDNcdTc2ODRcdTMwMENcdTY3MkNcdTZCMjFcdTY2RjRcdTY1QjBcdTMwMERcdTRFMDBcdTgyODJcdUZGMDlcdUZGMENcdTY1RTdcdTYwM0JcdTdFRDNcdTVERjJcdTU0MDhcdTVFNzZcdTY2RkZcdTYzNjInXHJcbiAgICAgICAgOiAnXHUyNzEzIFx1NURGMlx1NzUxRlx1NjIxMFx1OTk5Nlx1NEVGRFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEMycpXHJcbiAgICAgIGF3YWl0IGxvYWROb3RlcygpXHJcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSkpXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRBaVN1bW1hcml6aW5nKGZhbHNlKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1OTg3NVx1OTc2Mlx1NTIxQlx1NUVGQVx1NjI2N1x1ODg0Q1x1RkYxQVx1NUVGQVx1NTNEOFx1NjZGNCBcdTIxOTIgTExNIFx1NzUxRlx1NjIxMFx1N0YxNlx1NjM5Mlx1OEJBMVx1NTIxMiBcdTIxOTIgXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0XHU5ODc1XHVGRjA4XHU4OUQyXHU4MjcyL1x1NkEyMVx1NTc4Qi9cdTdCNTZcdTc1NjVcdTUzRUZcdThDMDNcdUZGMDlcdTIxOTIgXHU3ODZFXHU4QkE0XHU1NDBFXHU1NDJGXHU1MkE4XHUzMDAyICovXHJcbiAgY29uc3Qgc3RhcnRSdW4gPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBpZiAoZXhlY1RpdGxlLnRyaW0oKSA9PT0gJycgfHwgZXhlY0Rlc2MudHJpbSgpID09PSAnJykgcmV0dXJuXHJcbiAgICBzZXRCdXN5KCdzdGFydFJ1bicpXHJcbiAgICBzZXRBY3Rpb25SZXN1bHQobnVsbClcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvc3RhcnQnLCB7XHJcbiAgICAgICAgdGl0bGU6IGV4ZWNUaXRsZS50cmltKCksIGRlc2NyaXB0aW9uOiBleGVjRGVzYy50cmltKCksXHJcbiAgICAgICAgLi4uKGV4ZWNNb2RlbCA9PT0gJycgPyB7fSA6ICgoKSA9PiB7IGNvbnN0IFtwcm92aWRlciwgbW9kZWxdID0gZXhlY01vZGVsLnNwbGl0KCcvJyk7IHJldHVybiB7IGRlZmF1bHRNb2RlbFByb3ZpZGVyOiBwcm92aWRlciA/PyAnJywgZGVmYXVsdE1vZGVsSWQ6IG1vZGVsID8/ICcnIH0gfSkoKSksXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmICghb2spIHtcclxuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRhdGFbJ2F1dG9TdGFydGVkJ10gPT09IHRydWUpIHtcclxuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMUEnICsgU3RyaW5nKGRhdGFbJ3J1bklkJ10gPz8gJycpKVxyXG4gICAgICAgIHNldEV4ZWNUaXRsZSgnJylcclxuICAgICAgICBzZXRFeGVjRGVzYygnJylcclxuICAgICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHN0ZXBzID0gKGRhdGFbJ3N0ZXBzJ10gYXMgQXJyYXk8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+IHwgdW5kZWZpbmVkKSA/PyBbXVxyXG4gICAgICBzZXRQbGFuQ29uZmlybSh7XHJcbiAgICAgICAgY2hhbmdlSWQ6IFN0cmluZyhkYXRhWydjaGFuZ2VJZCddID8/ICcnKSxcclxuICAgICAgICBzdGVwczogc3RlcHMubWFwKChzdGVwKSA9PiAoe1xyXG4gICAgICAgICAgaWQ6IFN0cmluZyhzdGVwWydpZCddID8/ICcnKSxcclxuICAgICAgICAgIHRpdGxlOiBTdHJpbmcoc3RlcFsndGl0bGUnXSA/PyAnJyksXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogU3RyaW5nKHN0ZXBbJ2Rlc2NyaXB0aW9uJ10gPz8gJycpLFxyXG4gICAgICAgICAgdGFyZ2V0RmlsZXM6IChzdGVwWyd0YXJnZXRGaWxlcyddIGFzIHN0cmluZ1tdIHwgdW5kZWZpbmVkKSA/PyBbXSxcclxuICAgICAgICAgIHJvbGU6IFN0cmluZyhzdGVwWydyb2xlJ10gPz8gJ2NvZGluZycpLFxyXG4gICAgICAgICAgYWNjZXB0YW5jZTogU3RyaW5nKHN0ZXBbJ2FjY2VwdGFuY2UnXSA/PyAnJyksXHJcbiAgICAgICAgICBmYWlsdXJlUG9saWN5OiBTdHJpbmcoc3RlcFsnZmFpbHVyZVBvbGljeSddID8/ICdyZXRyeS1lc2NhbGF0ZScpLFxyXG4gICAgICAgICAgZW5hYmxlZDogc3RlcFsnZW5hYmxlZCddICE9PSBmYWxzZSxcclxuICAgICAgICAgIG1vZGVsUHJvdmlkZXI6ICcnLFxyXG4gICAgICAgICAgbW9kZWxJZDogJycsXHJcbiAgICAgICAgfSkpLFxyXG4gICAgICB9KVxyXG4gICAgICBpZiAobW9kZWxPcHRpb25zLmxlbmd0aCA9PT0gMCAmJiBtb2RlbFRpZXJzID09PSBudWxsKSB2b2lkIGxvYWRNb2RlbENvbmZpZygpXHJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1OEJBMVx1NTIxMlx1NURGMlx1NzUxRlx1NjIxMFx1RkYwQ1x1OEJGN1x1NTcyOFx1NEUwQlx1NjVCOVx1Nzg2RVx1OEJBNFx1N0YxNlx1NjM5Mlx1NTQwRVx1NTQyRlx1NTJBOCcpXHJcbiAgICAgIHNldEV4ZWNUaXRsZSgnJylcclxuICAgICAgc2V0RXhlY0Rlc2MoJycpXHJcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSkpXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRCdXN5KG51bGwpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0XHU5ODc1XHVGRjFBXHU0RkREXHU1QjU4XHU3RjE2XHU4RjkxXHVGRjA4XHU2NUIwXHU3MjQ4XHU2NzJDXHU4QkExXHU1MjEyXHVGRjA5XHU1RTc2XHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHUzMDAyICovXHJcbiAgY29uc3QgbGF1bmNoUGxhbiA9IGFzeW5jICh3aXRoRWRpdHM6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGlmIChwbGFuQ29uZmlybSA9PT0gbnVsbCkgcmV0dXJuXHJcbiAgICBzZXRQbGFuQnVzeSh0cnVlKVxyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IGNoYW5nZUlkID0gcGxhbkNvbmZpcm0uY2hhbmdlSWRcclxuICAgICAgaWYgKHdpdGhFZGl0cykge1xyXG4gICAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvcGxhbi91cGRhdGUnLCB7IGNoYW5nZUlkLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMgfSlcclxuICAgICAgICBpZiAoIW9rKSB7XHJcbiAgICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9sYXVuY2gnLCB7IGNoYW5nZUlkIH0pXHJcbiAgICAgIGlmICghb2spIHtcclxuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU1REYyXHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHVGRjFBJyArIFN0cmluZyhkYXRhWydydW5JZCddID8/ICcnKSlcclxuICAgICAgc2V0UGxhbkNvbmZpcm0obnVsbClcclxuICAgICAgYXdhaXQgcmVmcmVzaFN0YXRlKClcclxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldFBsYW5CdXN5KGZhbHNlKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NTJBMFx1OEY3RCBSdW4gXHU4QkU2XHU2MEM1XHVGRjA4XHU2QjY1XHU5QUE0XHU2NUY2XHU5NUY0XHU3RUJGICsgXHU0RUZCXHU1MkExXHU1REU1XHU0RjVDXHU4QkIwXHU1RkM2XHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgbG9hZFJ1bkRldGFpbCA9IGFzeW5jIChpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL2RldGFpbD9pZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlkKSArICcmc2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcclxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldFJ1bkRldGFpbChkYXRhIGFzIFJ1bkRldGFpbClcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICBzZXRSdW5EZXRhaWwobnVsbClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBcdTYwNjJcdTU5MERcdTY2ODJcdTUwNUMvXHU0RTJEXHU2NUFEL1x1NTkzMVx1OEQyNVx1NzY4NCBSdW5cdTMwMDIgKi9cclxuICBjb25zdCByZXN1bWVSdW4gPSBhc3luYyAocnVuSWQ6IHN0cmluZywgYWN0aW9uOiAnY29udGludWUnIHwgJ3NraXAtY3VycmVudCcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvcmVzdW1lJywgeyBydW5JZCwgYWN0aW9uIH0pXHJcbiAgICBpZiAob2spIHtcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU1REYyXHU2MDYyXHU1OTBEXHU2MjY3XHU4ODRDXHVGRjA4JyArIGFjdGlvbiArICdcdUZGMDknKVxyXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxyXG4gICAgICBhd2FpdCBsb2FkUnVuRGV0YWlsKHJ1bklkKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NTJBMFx1OEY3RFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1NTIxN1x1ODg2OFx1MzAwMiAqL1xyXG4gIGNvbnN0IGxvYWRTY2hlZHVsZWQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9zY2hlZHVsZWQ/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcclxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldFNjaGVkdWxlZERhdGEoKGRhdGEgYXMgeyB0YXNrczogU2NoZWR1bGVkVGFza0VudHJ5W10gfSkudGFza3MgPz8gW10pXHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gXHU1MjE3XHU4ODY4XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogXHU1MjFCXHU1RUZBIC8gXHU2NkY0XHU2NUIwIC8gXHU1MjIwXHU5NjY0IC8gXHU3QUNCXHU1MzczXHU2MjY3XHU4ODRDXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHUzMDAyICovXHJcbiAgY29uc3QgYWRkU2NoZWR1bGVkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3QgaW50ZXJ2YWxNaW51dGVzID0gTnVtYmVyKHNjaGVkSW50ZXJ2YWwpXHJcbiAgICBpZiAoc2NoZWROYW1lLnRyaW0oKSA9PT0gJycgfHwgIU51bWJlci5pc0Zpbml0ZShpbnRlcnZhbE1pbnV0ZXMpIHx8IGludGVydmFsTWludXRlcyA8IDEpIHtcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgXHU4QkY3XHU1ODZCXHU1MTk5XHU0RUZCXHU1MkExXHU1NDBEXHU3OUYwXHU0RTBFXHU2NzA5XHU2NTQ4XHU5NUY0XHU5Njk0XHVGRjA4XHU1MjA2XHU5NDlGXHVGRjA5JylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9zY2hlZHVsZWQnLCB7XHJcbiAgICAgIG5hbWU6IHNjaGVkTmFtZS50cmltKCksIHR5cGU6IHNjaGVkVHlwZSwgaW50ZXJ2YWxNaW51dGVzLFxyXG4gICAgICB0aXRsZTogc2NoZWRUaXRsZS50cmltKCkgfHwgdW5kZWZpbmVkLCBkZXNjcmlwdGlvbjogc2NoZWREZXNjLnRyaW0oKSB8fCB1bmRlZmluZWQsXHJcbiAgICB9KVxyXG4gICAgaWYgKG9rKSB7XHJcbiAgICAgIHNldFNjaGVkTmFtZSgnJyk7IHNldFNjaGVkVGl0bGUoJycpOyBzZXRTY2hlZERlc2MoJycpXHJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1NURGMlx1NTIxQlx1NUVGQScpXHJcbiAgICAgIGF3YWl0IGxvYWRTY2hlZHVsZWQoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3Qgc2NoZWR1bGVkQWN0aW9uID0gYXN5bmMgKHBhdGg6IHN0cmluZywgYm9keTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3NjaGVkdWxlZC8nICsgcGF0aCwgYm9keSlcclxuICAgIGlmIChvaykgYXdhaXQgbG9hZFNjaGVkdWxlZCgpXHJcbiAgICBlbHNlIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcclxuICB9XHJcblxyXG4gIC8qKiBcdTUyQTBcdThGN0RcdThCQjBcdTVGQzZcdTk3NjJcdTY3N0ZcdTUxNjhcdTkxQ0ZcdTY1NzBcdTYzNkVcdUZGMDhcdTU0MkJcdTU0MENcdTZCNjVcdTU3RkFcdTdFQkZcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBsb2FkTWVtb3JpZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcmllcz9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxyXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0TWVtb3JpZXNEYXRhKGRhdGEgYXMgTWVtb3JpZXNQYXlsb2FkKVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2MlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NjJDOVx1NTNENlx1NTQwQ1x1NkI2NVx1RkYxQVx1NEUwOVx1NTQxMVx1NTIyNFx1NUI5QVx1RkYwOFx1NTkzMVx1NjU0OFx1NjNEMFx1Njg0OC9cdTY1QjBcdTU4OUVcdTUwMTlcdTkwMDkvXHU4MUVBXHU1MkE4XHU3RUVEXHU1NDdEXHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3Qgc3luY01lbW9yaWVzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgc2V0TWVtb3J5U3luY2luZyh0cnVlKVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5L3N5bmMnLCB7fSlcclxuICAgICAgaWYgKCFvayAmJiBkYXRhWydlcnJvciddICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzZXRTeW5jUmVwb3J0KHsgb2s6IGZhbHNlLCBlcnJvcjogU3RyaW5nKGRhdGFbJ2Vycm9yJ10pIH0pXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgc2V0U3luY1JlcG9ydChkYXRhIGFzIFN5bmNSZXBvcnQpXHJcbiAgICAgIGF3YWl0IGxvYWRNZW1vcmllcygpXHJcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xyXG4gICAgICBzZXRTeW5jUmVwb3J0KHsgb2s6IGZhbHNlLCBlcnJvcjogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpIH0pXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRNZW1vcnlTeW5jaW5nKGZhbHNlKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QVx1NTQwRVx1N0VFRFx1RkYxQVx1NjI4QVx1OTAwOVx1NEUyRFx1NzY4NFx1NzU5MVx1NEYzQ1x1OEZDN1x1NjVGNlx1OTg3OVx1ODQzRFx1NEUzQSBzdGFsZSAvIFx1NUY1Mlx1Njg2M1x1MzAwMiAqL1xyXG4gIGNvbnN0IGFwcGx5U3luYyA9IGFzeW5jIChpZHM6IHN0cmluZ1tdLCBhY3Rpb246ICdtYXJrLXN0YWxlJyB8ICdhcmNoaXZlJyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5L3N5bmMvYXBwbHknLCB7IGlkcywgYWN0aW9uIH0pXHJcbiAgICBzZXRTeW5jUmVwb3J0KChwcmV2aW91cykgPT4gcHJldmlvdXMgPT09IG51bGwgPyBudWxsIDogeyAuLi5wcmV2aW91cywgc3RhbGVQcm9wb3NhbHM6IChwcmV2aW91cy5zdGFsZVByb3Bvc2FscyA/PyBbXSkuZmlsdGVyKChwcm9wb3NhbCkgPT4gIWlkcy5pbmNsdWRlcyhwcm9wb3NhbC5pZCkpIH0pXHJcbiAgICBhd2FpdCBsb2FkTWVtb3JpZXMoKVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1OEJCMFx1NUZDNlx1NzJCNlx1NjAwMVx1NjRDRFx1NEY1Q1x1RkYwOFx1NUY1Mlx1Njg2My9cdTYwNjJcdTU5MERcdUZGMDlcdTRFMEVcdTUyMDZcdTY1MkZcdTVGNTJcdTRFMDBcdTMwMDIgKi9cclxuICBjb25zdCBtZW1vcnlBY3Rpb24gPSBhc3luYyAocGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5LycgKyBwYXRoLCBib2R5KVxyXG4gICAgaWYgKG9rKSBhd2FpdCBsb2FkTWVtb3JpZXMoKVxyXG4gICAgZWxzZSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXHJcbiAgfVxyXG5cclxuICAvKiogXHU4QkIwXHU1RkM2XHU4RjZDXHU3QjE0XHU4QkIwXHVGRjFBXHU1RjE1XHU3NTI4XHU4RkRCXHU1QjY2XHU0RTYwXHU2ODYzXHU2ODQ4XHUzMDAyICovXHJcbiAgY29uc3QgbWVtb3J5VG9Ob3RlID0gYXN5bmMgKG1lbW9yeTogTWVtb3J5RW50cnkpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzJywge1xyXG4gICAgICB0aXRsZTogbWVtb3J5LnRpdGxlLFxyXG4gICAgICBjb250ZW50OiBtZW1vcnkuY29udGVudCArIChtZW1vcnkuYmFzaXNTaGEgIT09IG51bGwgPyBgXFxuXHVGRjA4XHU2NzY1XHU2RTkwXHVGRjFBXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2ICR7bWVtb3J5LmJhc2lzU2hhLnNsaWNlKDAsIDgpfVx1RkYwOWAgOiAnJyksXHJcbiAgICAgIHRhZ3M6ICdcdThCQjBcdTVGQzYsICcgKyBtZW1vcnkudHlwZSxcclxuICAgIH0pXHJcbiAgICBpZiAob2spIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NURGMlx1NjI4QVx1OEJCMFx1NUZDNlx1OEY2Q1x1NEUzQVx1N0IxNFx1OEJCMCcpXHJcbiAgfVxyXG5cclxuICAvLyBcdTRGMUFcdThCRERcdTYyNTNcdTVGMDAvXHU1MjA3XHU2MzYyXHU2NUY2XHU1Qjk4XHU2NUI5XHU0RjFBIGNsb3NlRGV0YWlscyBcdTY1MzZcdThENzdcdThGNjhcdTkwNTNcdUZGMUJcdTc3MEJcdTk1RThcdTcyRDdcdTZCQ0YgNTAwbXMgXHU2OEMwXHU2N0U1XHVGRjBDXHJcbiAgLy8gXHU1M0VBXHU4OTgxXHU1RjUzXHU1MjREXHU2NzA5XHU0RjFBXHU4QkREXHU4MDBDXHU1REU1XHU0RjVDXHU1M0YwXHU1MjE3XHU1QkJEIDwgNTBweCBcdTVDMzFcdTkxQ0RcdTY1QjBcdTY0OTFcdTVGMDBcdUZGMDhcdTc4NkVcdTVCOUFcdTYwMjdcdUZGMENcdTRFMERcdTRGOURcdThENTYgZWZmZWN0IFx1NjVGNlx1NUU4Rlx1RkYwOVx1MzAwMlxyXG4gIC8vIFx1NTQwQ1x1NEUwMFx1NjJDRFx1N0VGNFx1NjMwMVx1N0VERlx1OEJBMVx1ODg0Q1x1OTRCM1x1NTIzNlx1RkYxQVx1NEYxQVx1OEJERFx1NTIwN1x1NjM2Mlx1NEYxQVx1NjM2Mlx1NjM4OVx1N0VERlx1OEJBMVx1ODg0QyBET01cdUZGMENcdTY4MzdcdTVGMEZcdTg4NjhcdTdGM0FcdTU5MzFcdTY1RjZcdTYzMDlcdTVGNTNcdTUyNERcclxuICAvLyBcdTY3ODRcdTVFRkFcdTU0QzhcdTVFMENcdTkxQ0RcdTZDRThcdTUxNjVcdUZGMDhcdTVFNDJcdTdCNDlcdUZGMENcdTVERjJcdTVCNThcdTU3MjhcdTUyMTlcdThERjNcdThGQzdcdUZGMDlcdTMwMDJcclxuICBjb25zdCBsYXlvdXRGYWNlID0gKHByb3BzIGFzIHVua25vd24gYXMgeyBsYXlvdXQ/OiB7IG9wZW5EZXRhaWxzPzogKCkgPT4gdm9pZCB9IH0pLmxheW91dFxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAocHJvcHMubGF5b3V0TW9kZSA9PT0gJ292ZXJsYXknKSByZXR1cm5cclxuICAgIGFwcGx5U3RhdHNMaW5lQ2xhbXAoKVxyXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGMtc3RhdHMtY2xhbXAnKSA9PT0gbnVsbCkgYXBwbHlTdGF0c0xpbmVDbGFtcCgpXHJcbiAgICAgIGNvbnN0IGNoYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiY2VudGVyQ29sXCJdJylcclxuICAgICAgY29uc3Qgd2lkdGggPSBjaGF0ID8gTWF0aC5yb3VuZChjaGF0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSA6IC0xXHJcbiAgICAgIGlmICh3aWR0aCAhPT0gLTEgJiYgd2lkdGggPCA1MCkgbGF5b3V0RmFjZT8ub3BlbkRldGFpbHM/LigpXHJcbiAgICB9LCA1MDApXHJcbiAgICByZXR1cm4gKCkgPT4geyBjbGVhckludGVydmFsKHRpbWVyKSB9XHJcbiAgfSwgW3Byb3BzLnNlc3Npb25JZCwgcHJvcHMubGF5b3V0TW9kZSwgbGF5b3V0RmFjZV0pXHJcblxyXG4gIC8qKiBcdTRFRTUgaW1wb3J0YW50IFx1NTE4NVx1ODA1NFx1NjgzN1x1NUYwRlx1NzZGNFx1NjNBNVx1NTE5OVx1NUI5OFx1NjVCOVx1N0Y1MVx1NjgzQ1x1NkEyMVx1Njc3Rlx1RkYwOFx1NjcwMFx1OUFEOFx1NEYxOFx1NTE0OFx1N0VBN1x1RkYwQ1x1NEVGQlx1NEY1NVx1OTFDRFx1NkUzMlx1NjdEM1x1NEUwRFx1NEYxQVx1ODk4Nlx1NzZENlx1RkYwOVx1MzAwMiAqL1xyXG4gIGNvbnN0IGZyYW1lVGVtcGxhdGVTZXQgPSAoY2hhdFB4OiBudW1iZXIpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwic2lkZWJhckNvbFwiXScpXHJcbiAgICBjb25zdCBzaWRlYmFyVyA9IHNpZGViYXIgPyBNYXRoLm1heCg1NiwgTWF0aC5yb3VuZChzaWRlYmFyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSkgOiAyODBcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0nKVxyXG4gICAgICA/LnN0eWxlLnNldFByb3BlcnR5KCdncmlkLXRlbXBsYXRlLWNvbHVtbnMnLCBzaWRlYmFyVyArICdweCBtaW5tYXgoMCwgMWZyKSAnICsgY2hhdFB4ICsgJ3B4JywgJ2ltcG9ydGFudCcpXHJcbiAgfVxyXG5cclxuICAvKiogXHU2NTM2XHU4RDc3XHU2MDAxXHU2QTIxXHU2NzdGXHVGRjFBXHU3QjJDXHU0RTA5XHU1MjE3XHVGRjA4XHU1Qjk4XHU2NUI5XHU4QkU2XHU2MEM1XHVGRjA5MHB4XHUyMDE0XHUyMDE0XHU1REU1XHU0RjVDXHU1M0YwXHU1MTczXHU5NUVEXHU1NDBFXHU1M0YzXHU0RkE3XHU1M0VBXHU1MTQxXHU4QkI4XHU4MDRBXHU1OTI5XHVGRjA4XHU0RTFBXHU0RTNCXHU4OUM0XHU1MjE5XHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgY29sbGFwc2VGcmFtZVRlbXBsYXRlID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJzaWRlYmFyQ29sXCJdJylcclxuICAgIGNvbnN0IHNpZGViYXJXID0gc2lkZWJhciA/IE1hdGgubWF4KDU2LCBNYXRoLnJvdW5kKHNpZGViYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpKSA6IDI4MFxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXScpXHJcbiAgICAgID8uc3R5bGUuc2V0UHJvcGVydHkoJ2dyaWQtdGVtcGxhdGUtY29sdW1ucycsIHNpZGViYXJXICsgJ3B4IG1pbm1heCgwLCAxZnIpIDBweCcsICdpbXBvcnRhbnQnKVxyXG4gIH1cclxuXHJcbiAgLy8gXHU4MDRBXHU1OTI5XHU1MjE3XHU1QkJEXHU4QkIwXHU1RkM2XHVGRjA4XHU1Qjk4XHU2NUI5IGxheW91dCBzdG9yZSBcdTc3QUNcdTYwMDFcdUZGMDlcdUZGMUFcdTYzMDJcdThGN0RcdTYwNjJcdTU5MEQgKyBcdTYyRDZcdTYyRkRcdTc2RjRcdTUxOTlcdTUxODVcdTgwNTRcdTZBMjFcdTY3N0ZcdTMwMDJcclxuICAvLyBcdTVGQzVcdTk4N0JcdTUxOTkgaW1wb3J0YW50XHUyMDE0XHUyMDE0TEFZT1VUX1NUWUxFIFx1NzY4NFx1NkEyMVx1Njc3Rlx1ODlDNFx1NTIxOVx1NEU1Rlx1NjYyRiBpbXBvcnRhbnRcdUZGMENcdTk3NUUgaW1wb3J0YW50XHJcbiAgLy8gXHU1MTg1XHU4MDU0XHU0RjFBXHU4OEFCXHU1QjgzXHU1MzhCXHU1MjM2XHVGRjA4XHU4RkQ5XHU1QzMxXHU2NjJGXHU2QjY0XHU1MjREXCJcdTYyRDZcdTYyRkRcdTc1MUZcdTY1NDhcdTMwMDFcdTUyMzdcdTY1QjBcdTU0MEVcdThCQjBcdTVGQzZcdTRFMjJcdTU5MzFcIlx1NzY4NFx1NTM5Rlx1NTZFMFx1RkYwOVx1MzAwMlxyXG4gIC8vIFx1NUI5OFx1NjVCOSBSZWFjdCBcdTkxQ0RcdTZFMzJcdTY3RDNcdTRGMUFcdTY1MzlcdTUxOTlcdTUxODVcdTgwNTRcdTZBMjFcdTY3N0ZcdUZGMENNdXRhdGlvbk9ic2VydmVyIFx1NjMwOVx1NUY1M1x1NTI0RFx1NTAzQ1x1NUI4OFx1NTM2Qlx1OTFDRFx1NTE5OVxyXG4gIC8vIFx1RkYwOFx1NTAzQ1x1NzZGOFx1NTQwQ1x1NEUwRFx1NEYxQVx1ODlFNlx1NTNEMVx1NjVCMFx1NzY4NCBtdXRhdGlvblx1RkYwQ1x1NjVFMFx1NTZERVx1NzNBRlx1RkYwOVx1MzAwMlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAocHJvcHMubGF5b3V0TW9kZSA9PT0gJ292ZXJsYXknKSByZXR1cm5cclxuICAgIGNvbnN0IHNhdmVkID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYy5jaGF0V2lkdGgnKSA/PyAnJylcclxuICAgIGNvbnN0IGFwcGx5ID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAvLyBcdTYzMDJcdThGN0QvXHU1Qjk4XHU2NUI5XHU5MUNEXHU2RTMyXHU2N0QzXHU2NUY2XHU2NUUwXHU2NzYxXHU0RUY2XHU1OTNBXHU1NkRFXHU2QTIxXHU2NzdGXHVGRjA4aW1wb3J0YW50IFx1ODk4Nlx1NTE5OVx1RkYxQlx1NTAzQ1x1NzZGOFx1NTQwQ1x1NjVGNlx1NUI5OFx1NjVCOVx1NjgzN1x1NUYwRlx1NTNEOFx1NjZGNFxyXG4gICAgICAvLyBcdTRFMERcdTRGMUFcdTg5RTZcdTUzRDFcdTY1QjBcdTc2ODQgbXV0YXRpb25cdUZGMENcdTY1RTBcdTU2REVcdTczQUZcdUZGMDlcdTMwMDJcdTVERTVcdTRGNUNcdTUzRjBcdTVGMDBcdTc3NDAgPSBcdTUzRjNcdTUyMTdcdTgwNEFcdTU5MjlcdTU2RkFcdTVCOUFcdTVCQkRcdTMwMDJcclxuICAgICAgY29uc3QgY2hhdFcgPSBOdW1iZXIuaXNGaW5pdGUoc2F2ZWQpICYmIHNhdmVkID49IDI4MCA/IHNhdmVkIDogMzYwXHJcbiAgICAgIGZyYW1lVGVtcGxhdGVTZXQoY2hhdFcpXHJcbiAgICB9XHJcbiAgICBhcHBseSgpXHJcbiAgICBjb25zdCBmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0nKVxyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7IGFwcGx5KCkgfSlcclxuICAgIGlmIChmcmFtZSAhPT0gbnVsbCkgb2JzZXJ2ZXIub2JzZXJ2ZShmcmFtZSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFsnc3R5bGUnXSB9KVxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXHJcbiAgICAgIC8vIFx1NURFNVx1NEY1Q1x1NTNGMFx1NTM3OFx1OEY3RFx1RkYxQVx1NTE5OVx1NTE2NVx1NjUzNlx1OEQ3N1x1NjAwMVx1NkEyMVx1Njc3Rlx1RkYwOFx1N0IyQ1x1NEUwOVx1NTIxNyAwcHhcdUZGMDlcdTIwMTRcdTIwMTRcdTRFMUFcdTRFM0JcdTg5QzRcdTUyMTlcdUZGMUFcdTVERTVcdTRGNUNcdTUzRjBcdTUxNzMgXHUyMTkyIFx1NTNGM1x1NEZBN1x1NTNFQVx1NTE0MVx1OEJCOFxyXG4gICAgICAvLyBcdTgwNEFcdTU5MjlcdTMwMDJcdTRFMERcdTgwRkRcdTUyMjBcdTk2NjRcdTUxODVcdTgwNTRcdTVDNUVcdTYwMjdcdUZGMDhcdTVCOThcdTY1QjkgUmVhY3QgXHU0RTBEXHU0RjFBXHU0RTNCXHU1MkE4XHU4ODY1XHU1MTk5XHVGRjBDXHU0RjFBXHU1QkZDXHU4MUY0XHU0RTNCXHU1MzNBXHU3QTdBXHU3NjdEXHVGRjA5XHVGRjFCXHJcbiAgICAgIC8vIFx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1ODY3RFx1NTZERVx1NTIzMFx1OEJFNVx1NTIxN1x1NEY0NiAwIFx1NUJCRFx1NEUwRFx1NTNFRlx1ODlDMVx1RkYwODAuMS4yIFx1NUI5RVx1NkQ0Qlx1NTZERVx1NUY1Mlx1RkYwOVx1MzAwMlxyXG4gICAgICBjb2xsYXBzZUZyYW1lVGVtcGxhdGUoKVxyXG4gICAgfVxyXG4gIH0sIFtwcm9wcy5sYXlvdXRNb2RlXSlcclxuXHJcbiAgLyoqIFx1NTIwNlx1OTY5NFx1Njc2MVx1NjJENlx1NjJGRFx1RkYxQVx1OEMwM1x1NjU3NFx1ODA0QVx1NTkyOVx1NTIxN1x1NUJCRFx1RkYwOFx1NURFNVx1NEY1Q1x1NTNGMFx1NTQzOFx1NjUzNlx1NTI2OVx1NEY1OVx1N0E3QVx1OTVGNFx1RkYwOVx1RkYwQ1x1NTE5OVx1NTE2NSBsb2NhbFN0b3JhZ2UgXHU4QkIwXHU1RkM2XHUzMDAyICovXHJcbiAgY29uc3Qgb25EaXZpZGVyRG93biA9IChlOiBSZWFjdC5Qb2ludGVyRXZlbnQpOiB2b2lkID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgY29uc3Qgb25Nb3ZlID0gKGV2OiBQb2ludGVyRXZlbnQpOiB2b2lkID0+IHtcclxuICAgICAgY29uc3Qgd2lkdGggPSBNYXRoLm1pbig5MDAsIE1hdGgubWF4KDI4MCwgd2luZG93LmlubmVyV2lkdGggLSBldi5jbGllbnRYKSlcclxuICAgICAgZnJhbWVUZW1wbGF0ZVNldCh3aWR0aClcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BjLmNoYXRXaWR0aCcsIFN0cmluZyh3aWR0aCkpXHJcbiAgICB9XHJcbiAgICBjb25zdCBvblVwID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpXHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKVxyXG4gICAgfVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApXHJcbiAgfVxyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGV0IGRpc3Bvc2VkID0gZmFsc2VcclxuICAgIGxldCBnZW5lcmF0aW9uID0gMFxyXG4gICAgY29uc3QgbG9hZCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgICAgY29uc3QgcmVxdWVzdCA9ICsrZ2VuZXJhdGlvblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3N0YXRlP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJyksIHsgaGVhZGVyczogeyBhY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyB9IH0pXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApXHJcbiAgICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgIGlmICghZGlzcG9zZWQgJiYgcmVxdWVzdCA9PT0gZ2VuZXJhdGlvbikge1xyXG4gICAgICAgICAgc2V0U3RhdGUoZGF0YSBhcyBXb3Jrc3BhY2VTdGF0ZSlcclxuICAgICAgICAgIHNldExvYWRFcnJvcihudWxsKVxyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcclxuICAgICAgICBpZiAoIWRpc3Bvc2VkICYmIHJlcXVlc3QgPT09IGdlbmVyYXRpb24pIHNldExvYWRFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHZvaWQgbG9hZCgpXHJcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHsgdm9pZCBsb2FkKCkgfSwgNDAwMClcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGRpc3Bvc2VkID0gdHJ1ZVxyXG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKVxyXG4gICAgfVxyXG4gIH0sIFtwcm9wcy5zZXNzaW9uSWRdKVxyXG5cclxuICAvLyBcdThGREJcdTUxNjVcdTYzRDBcdTRFQTQvXHU3QjE0XHU4QkIwL1JldmlldyBcdTk4NzVcdTdCN0VcdTY1RjZcdTYzMDlcdTk3MDBcdTYyQzlcdTUzRDZcdUZGMDhcdTYzRDBcdTRFQTRcdTUyMTdcdTg4NjhcdTRGOURcdThENTZcdTRGMUFcdThCRERcdTVERTVcdTRGNUNcdTUzM0FcdUZGMENcdThGNkVcdThCRTJcdTY1RTBcdTYxMEZcdTRFNDlcdUZGMDlcdTMwMDJcclxuICAvLyBcdTYzRDBcdTRFQTRcdTk4NzVcdTRFNUZcdTYyQzlcdTdCMTRcdThCQjBcdUZGMUFcdThGNkVcdTZCMjFcdTY3MkFcdTZEODhcdTUzMTZcdTY4MDdcdThCQjBcdTk3MDBcdTg5ODFcdTMwMENcdTRFMEFcdTZCMjEgQUkgXHU2MDNCXHU3RUQzXHU2NUY2XHU5NUY0XHUzMDBEXHUzMDAyXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0YWIgPT09ICdjb21taXRzJykgeyB2b2lkIGxvYWRDb21taXRzKCk7IHZvaWQgbG9hZE5vdGVzKCkgfVxyXG4gICAgaWYgKHRhYiA9PT0gJ25vdGVzJykgeyB2b2lkIGxvYWROb3RlcygpOyB2b2lkIGxvYWRNZW1vcmllcygpOyBpZiAoY29tbWl0c0RhdGEgPT09IG51bGwpIHZvaWQgbG9hZENvbW1pdHMoKSB9XHJcbiAgICBpZiAodGFiID09PSAncmV2aWV3Jykgdm9pZCBsb2FkSXNzdWVzKClcclxuICAgIGlmICh0YWIgPT09ICdleGVjdXRpb24nKSB7IHZvaWQgbG9hZFNjaGVkdWxlZCgpOyBpZiAocnVuRGV0YWlsICE9PSBudWxsKSB2b2lkIGxvYWRSdW5EZXRhaWwocnVuRGV0YWlsLnJ1bi5pZCkgfVxyXG4gICAgaWYgKHRhYiA9PT0gJ3NldHRpbmdzJyAmJiBtb2RlbFRpZXJzID09PSBudWxsKSB2b2lkIGxvYWRNb2RlbENvbmZpZygpXHJcbiAgfSwgW3RhYiwgcHJvcHMuc2Vzc2lvbklkXSlcclxuXHJcbiAgY29uc3QgbG9hZE1vZGVsQ29uZmlnID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbW9kZWwtY29uZmlnJylcclxuICAgICAgaWYgKCFyZXNwb25zZS5vaykgcmV0dXJuXHJcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgICAgc2V0TW9kZWxUaWVycygoZGF0YSBhcyB7IHRpZXJzOiBSZWNvcmQ8c3RyaW5nLCB7IHByb3ZpZGVyOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmcgfT4gfSkudGllcnMgPz8ge30pXHJcbiAgICAgIHNldE1vZGVsT3B0aW9ucygoZGF0YSBhcyB7IG9wdGlvbnM6IEFycmF5PHsgcHJvdmlkZXI6IHN0cmluZzsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nIH0+IH0pLm9wdGlvbnMgPz8gW10pXHJcbiAgICAgIGNvbnN0IGNvbmN1cnJlbmN5ID0gKGRhdGEgYXMgeyBmaXhDb25jdXJyZW5jeT86IG51bWJlciB9KS5maXhDb25jdXJyZW5jeVxyXG4gICAgICBpZiAodHlwZW9mIGNvbmN1cnJlbmN5ID09PSAnbnVtYmVyJykgc2V0Rml4Q29uY3VycmVuY3koU3RyaW5nKGNvbmN1cnJlbmN5KSlcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBcdTZBMjFcdTU3OEJcdTkxNERcdTdGNkVcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHNhdmVNb2RlbENvbmZpZyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGlmIChtb2RlbFRpZXJzID09PSBudWxsKSByZXR1cm5cclxuICAgIHNldE1vZGVsU2F2aW5nKHRydWUpXHJcbiAgICBzZXRNb2RlbFNhdmVkKGZhbHNlKVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY29uY3VycmVuY3kgPSBOdW1iZXIoZml4Q29uY3VycmVuY3kpXHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21vZGVsLWNvbmZpZycsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHRpZXJzOiBtb2RlbFRpZXJzLCAuLi4oTnVtYmVyLmlzRmluaXRlKGNvbmN1cnJlbmN5KSA/IHsgZml4Q29uY3VycmVuY3k6IE1hdGgubWF4KDEsIE1hdGgubWluKDEwLCBNYXRoLnRydW5jKGNvbmN1cnJlbmN5KSkpIH0gOiB7fSkgfSksXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIHNldE1vZGVsU2F2ZWQodHJ1ZSlcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgc2V0TW9kZWxTYXZlZChmYWxzZSkgfSwgMjUwMClcclxuICAgICAgfVxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0TW9kZWxTYXZpbmcoZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWZyZXNoU3RhdGUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBjb25zdCByZWZyZXNoZWQgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvc3RhdGU/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSwgeyBoZWFkZXJzOiB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0gfSlcclxuICAgIGlmIChyZWZyZXNoZWQub2spIHNldFN0YXRlKGF3YWl0IHJlZnJlc2hlZC5qc29uKCkgYXMgV29ya3NwYWNlU3RhdGUpXHJcbiAgfVxyXG5cclxuICAvKiogXHU3RURGXHU0RTAwXHU1MkE4XHU0RjVDXHU2MjY3XHU4ODRDXHU1NjY4XHVGRjFBUE9TVCBcdTVCQkZcdTRFM0IgQVBJXHVGRjA4XHU2NDNBXHU1RTI2XHU0RjFBXHU4QkREIGlkIFx1NEY5Qlx1NjcwRFx1NTJBMVx1N0FFRlx1NUI5QVx1NEY0RFx1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTMzQVx1RkYwOVx1RkYwQ1x1OEY5M1x1NTFGQVx1OEZEQlx1N0VEM1x1Njc5Q1x1OTc2Mlx1Njc3Rlx1RkYwQ1x1NUI4Q1x1NjIxMFx1NTQwRVx1NTIzN1x1NjVCMFx1NzJCNlx1NjAwMVx1MzAwMiAqL1xyXG4gIGNvbnN0IHJ1bkFjdGlvbiA9IGFzeW5jIChuYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgYm9keTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIHNldEJ1c3kobmFtZSlcclxuICAgIHNldEFjdGlvblJlc3VsdChudWxsKVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdChwYXRoLCBib2R5KVxyXG4gICAgICBpZiAoIW9rKSB7XHJcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KGBcdTI3MTcgJHtTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKX1gKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdChmb3JtYXRBY3Rpb25SZXN1bHQoZGF0YSkpXHJcbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXHJcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoYFx1MjcxNyAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKX1gKVxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0QnVzeShudWxsKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcnVuQm9vdHN0cmFwID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgc2V0Qm9vdHN0cmFwcGluZyh0cnVlKVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvYm9vdHN0cmFwJywge30pXHJcbiAgICAgIGlmICghb2spIHtcclxuICAgICAgICBzZXRMb2FkRXJyb3IoU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgYXdhaXQgcmVmcmVzaFN0YXRlKClcclxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgIHNldExvYWRFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRCb290c3RyYXBwaW5nKGZhbHNlKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgY29uZmlybU1lbW9yeSA9IGFzeW5jIChtZW1vcnlJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBjb25zdCB7IG9rIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvY29uZmlybScsIHsgbWVtb3J5SWQgfSlcclxuICAgIGlmIChvaykge1xyXG4gICAgICBzZXRTdGF0ZSgocHJldmlvdXMpID0+IHByZXZpb3VzID09PSBudWxsID8gcHJldmlvdXMgOiB7XHJcbiAgICAgICAgLi4ucHJldmlvdXMsXHJcbiAgICAgICAgbWVtb3JpZXM6IHByZXZpb3VzLm1lbW9yaWVzPy5tYXAoKG1lbW9yeSkgPT4gbWVtb3J5LmlkID09PSBtZW1vcnlJZCA/IHsgLi4ubWVtb3J5LCBpc0h1bWFuQ29uZmlybWVkOiB0cnVlLCB0cnV0aExldmVsOiAnZmFjdCcgfSA6IG1lbW9yeSksXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBwcm9qZWN0ID0gc3RhdGU/LnByb2plY3QgPz8gbnVsbFxyXG4gIGNvbnN0IGJvb3RzdHJhcCA9IHN0YXRlPy5ib290c3RyYXAgPz8gbnVsbFxyXG4gIGNvbnN0IGNoYW5nZXMgPSBzdGF0ZT8uY2hhbmdlcyA/PyBbXVxyXG4gIGNvbnN0IHJ1bnMgPSBzdGF0ZT8ucnVucyA/PyBbXVxyXG4gIGNvbnN0IHZlcmlmaWNhdGlvbnMgPSBzdGF0ZT8udmVyaWZpY2F0aW9ucyA/PyBbXVxyXG4gIGNvbnN0IGNvbmZpcm1lZCA9IHN0YXRlPy5jb25maXJtZWQgPz8gW11cclxuICBjb25zdCBjb25jZXB0cyA9IHN0YXRlPy5jb25jZXB0cyA/PyBbXVxyXG5cclxuICBjb25zdCB0YWJzOiBBcnJheTx7IGtleTogVGFiS2V5OyBsYWJlbDogc3RyaW5nIH0+ID0gW1xyXG4gICAgeyBrZXk6ICdjb21taXRzJywgbGFiZWw6IHQoJ3RhYi5jb21taXRzJykgfSxcclxuICAgIHsga2V5OiAnb3ZlcnZpZXcnLCBsYWJlbDogdCgndGFiLm92ZXJ2aWV3JykgfSxcclxuICAgIHsga2V5OiAnZXhlY3V0aW9uJywgbGFiZWw6IHQoJ3RhYi5leGVjdXRpb24nKSB9LFxyXG4gICAgeyBrZXk6ICdyZXZpZXcnLCBsYWJlbDogdCgndGFiLnJldmlldycpIH0sXHJcbiAgICB7IGtleTogJ25vdGVzJywgbGFiZWw6IHQoJ3RhYi5ub3RlcycpIH0sXHJcbiAgICB7IGtleTogJ3NldHRpbmdzJywgbGFiZWw6IHQoJ3RhYi5zZXR0aW5ncycpIH0sXHJcbiAgXVxyXG5cclxuICAvKiogXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDXHU5NzYyXHU2NzdGXHVGRjA4XHU2MDNCXHU4OUM4XHU5ODc1XHU3QjdFXHU3Njg0XHU1RkVCXHU2Mzc3XHU1MkE4XHU0RjVDXHU1MTcxXHU3NTI4XHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgcmVzdWx0UGFuZWwgPSBhY3Rpb25SZXN1bHQgIT09IG51bGxcclxuICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChDYXJkLCB7IHRpdGxlOiB0KCdyZXN1bHQucGFuZWwnKSB9LFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5yZXN1bHQgfSwgYWN0aW9uUmVzdWx0KSlcclxuICAgIDogbnVsbFxyXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTk4NzVcdTdCN0UgXHUyNTAwXHUyNTAwXHJcbiAgLy8gXHU5ODc2XHU5MEU4XHVGRjFBXHU0RUQzXHU1RTkzXHU2ODBGICsgXHU2M0QwXHU0RUE0XHU1OTFBXHU5MDA5XHU0RTBCXHU2MkM5XHVGRjA4XHU3RUE2IDEvNSBcdTlBRDhcdTVFQTZcdUZGMDlcdUZGMUJcdTRFMEJcdTY1QjlcdTY3N0ZcdTU3NTdcdTUzNjBcdTUxNjhcdTVCQkRcdTMwMDJcclxuICBjb25zdCBhbGxUYXJnZXRzOiBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBtZXRhOiBzdHJpbmc7IHNoYTogc3RyaW5nIH0+ID0gW11cclxuICBpZiAoY29tbWl0c0RhdGEgIT09IG51bGwpIHtcclxuICAgIGlmICghY29tbWl0c0RhdGEud29ya2luZy5pc0NsZWFuKSB7XHJcbiAgICAgIGFsbFRhcmdldHMucHVzaCh7XHJcbiAgICAgICAga2V5OiAnd29ya2luZycsXHJcbiAgICAgICAgbGFiZWw6IGBcdTI1Q0YgJHt0KCdyZXBvLndvcmtpbmcnKX1cdUZGMDgke2NvbW1pdHNEYXRhLndvcmtpbmcuZmlsZUNvdW50fVx1RkYwOWAsXHJcbiAgICAgICAgbWV0YTogY29tbWl0c0RhdGEud29ya2luZy5maWxlcy5zbGljZSgwLCAzKS5tYXAoKGZpbGUpID0+IGZpbGUucGF0aC5zcGxpdCgnLycpLnBvcCgpKS5qb2luKCcsICcpLFxyXG4gICAgICAgIHNoYTogJ3dvcmtpbmcnLFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBjb21taXQgb2YgY29tbWl0c0RhdGEuY29tbWl0cykge1xyXG4gICAgICBjb25zdCBhZGRzID0gY29tbWl0LmZpbGVzLnJlZHVjZSgoc3VtLCBmaWxlKSA9PiBzdW0gKyBmaWxlLmFkZHMsIDApXHJcbiAgICAgIGNvbnN0IGRlbHMgPSBjb21taXQuZmlsZXMucmVkdWNlKChzdW0sIGZpbGUpID0+IHN1bSArIGZpbGUuZGVscywgMClcclxuICAgICAgYWxsVGFyZ2V0cy5wdXNoKHtcclxuICAgICAgICBrZXk6IGNvbW1pdC5zaGEsXHJcbiAgICAgICAgbGFiZWw6IGNvbW1pdC5zdWJqZWN0LFxyXG4gICAgICAgIG1ldGE6IGAke2NvbW1pdC5zaG9ydEhhc2h9IFx1MDBCNyAke2NvbW1pdC5hdXRob3J9IFx1MDBCNyAke25ldyBEYXRlKGNvbW1pdC5kYXRlKS50b0xvY2FsZVN0cmluZygpfSBcdTAwQjcgKyR7YWRkc30vLSR7ZGVsc31gLFxyXG4gICAgICAgIHNoYTogY29tbWl0LnNoYSxcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiAgY29uc3Qgc2hvcnRMYWJlbCA9IChzaGE6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgICBpZiAoc2hhID09PSAnd29ya2luZycpIHJldHVybiB0KCdyZXBvLndvcmtpbmcnKVxyXG4gICAgY29uc3QgdGFyZ2V0ID0gYWxsVGFyZ2V0cy5maW5kKChlbnRyeSkgPT4gZW50cnkuc2hhID09PSBzaGEpXHJcbiAgICByZXR1cm4gYCR7KHRhcmdldD8ubWV0YS5zcGxpdCgnIFx1MDBCNyAnKVswXSkgPz8gc2hhLnNsaWNlKDAsIDcpfSAke3RhcmdldD8ubGFiZWwgPz8gJyd9YC50cmltKClcclxuICB9XHJcbiAgY29uc3QgZmlsdGVyZWRUYXJnZXRzID0gcGlja2VyRmlsdGVyLnRyaW0oKSA9PT0gJydcclxuICAgID8gYWxsVGFyZ2V0c1xyXG4gICAgOiBhbGxUYXJnZXRzLmZpbHRlcigoZW50cnkpID0+IChlbnRyeS5sYWJlbCArIGVudHJ5Lm1ldGEpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocGlja2VyRmlsdGVyLnRyaW0oKS50b0xvd2VyQ2FzZSgpKSlcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFx1OEY2RVx1NkIyMVx1ODA1QVx1N0M3Qlx1NEUwRVx1NjcyQVx1NkQ4OFx1NTMxNlx1NjgwN1x1OEJCMCBcdTI1MDBcdTI1MDAgXHU4MDVBXHU3QzdCXHU4OUM0XHU1MjE5XHU0RTBFXHU2NzBEXHU1MkExXHU3QUVGIGNsdXN0ZXJDb21taXRzIFx1NEUwMFx1ODFGNFx1RkYwOFx1NjVGNlx1OTVGNFx1N0E5N1x1NTNFMyArXHJcbiAgLy8gXHU2NTg3XHU0RUY2XHU5NkY2XHU5MUNEXHU1M0UwXHVGRjBDXHU4OUMxIGNvbW1pdC1yb3VuZHMudHNcdUZGMDlcdUZGMUJcdTY3MkFcdTZEODhcdTUzMTYgPSBcdTRFMEFcdTZCMjEgQUkgXHU2MDNCXHU3RUQzXHU0RTRCXHU1NDBFXHU3Njg0XHU2M0QwXHU0RUE0XHUzMDAyXHJcbiAgY29uc3QgY29tbWl0QnlTaGEgPSBuZXcgTWFwKChjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSkubWFwKChjb21taXQpID0+IFtjb21taXQuc2hhLCBjb21taXRdKSlcclxuICBjb25zdCBsYXN0U3VtbWFyeUF0ID0gbm90ZXNcclxuICAgIC5maWx0ZXIoKG5vdGUpID0+IG5vdGUuc2hhID09PSAnc3VtbWFyeScpXHJcbiAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+IHJpZ2h0LmNyZWF0ZWRBdCAtIGxlZnQuY3JlYXRlZEF0KVswXT8uY3JlYXRlZEF0XHJcbiAgY29uc3QgaXNVbmRpZ2VzdGVkID0gKGNvbW1pdDogeyBzaGE6IHN0cmluZzsgZGF0ZTogbnVtYmVyIH0pOiBib29sZWFuID0+IHtcclxuICAgIGlmIChjb21taXQuc2hhID09PSAnd29ya2luZycpIHJldHVybiBmYWxzZVxyXG4gICAgLy8gXHU1REYyXHU3NTFGXHU2MjEwXHU4RkM3IEFJIFx1ODlFM1x1OEJGQlx1RkYwOGFuYWx5emVkIFx1NjgwN1x1OEJCMFx1RkYwOVx1NTM3M1x1ODlDNlx1NEUzQVx1NURGMlx1NkQ4OFx1NTMxNlx1RkYxQlx1NTQyNlx1NTIxOVx1NjVCMFx1NEU4RVx1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NzY4NFx1OTBGRFx1N0I5N1x1NjcyQVx1NkQ4OFx1NTMxNlx1MzAwMlxyXG4gICAgaWYgKGNvbW1pdEJ5U2hhLmdldChjb21taXQuc2hhKT8uYW5hbHl6ZWQgPT09IHRydWUpIHJldHVybiBmYWxzZVxyXG4gICAgcmV0dXJuIGxhc3RTdW1tYXJ5QXQgPT09IHVuZGVmaW5lZCB8fCBjb21taXQuZGF0ZSA+IGxhc3RTdW1tYXJ5QXRcclxuICB9XHJcbiAgY29uc3QgdW5kaWdlc3RlZENvdW50ID0gKGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKS5maWx0ZXIoKGNvbW1pdCkgPT4gaXNVbmRpZ2VzdGVkKGNvbW1pdCkpLmxlbmd0aFxyXG4gIGNvbnN0IGNvbW1pdFJvdW5kcyA9IGNsdXN0ZXJJbnRvUm91bmRzKGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKVxyXG5cclxuICAvKiogXHU0RTBCXHU2MkM5XHU2ODQ2XHU3Njg0XHU2M0QwXHU0RUE0XHU4ODRDXHVGRjA4XHU1NDJCXHU2NzJBXHU2RDg4XHU1MzE2XHU1NzA2XHU3MEI5XHVGRjFCd29ya2luZyBcdTY3NjFcdTc2RUVcdTRFMERcdTY4MDdcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCByZW5kZXJQaWNrZXJSb3cgPSAoZW50cnk6IHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IG1ldGE6IHN0cmluZzsgc2hhOiBzdHJpbmcgfSk6IFJlYWN0LlJlYWN0Tm9kZSA9PiB7XHJcbiAgICBjb25zdCBjb21taXQgPSBjb21taXRCeVNoYS5nZXQoZW50cnkuc2hhKVxyXG4gICAgY29uc3QgdW5kaWdlc3RlZCA9IGNvbW1pdCAhPT0gdW5kZWZpbmVkICYmIGlzVW5kaWdlc3RlZChjb21taXQpXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAga2V5PXtlbnRyeS5rZXl9XHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIHBhZGRpbmc6ICc3cHggMTJweCcsIGN1cnNvcjogJ3BvaW50ZXInLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgYmFja2dyb3VuZDogc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKGVudHJ5LnNoYSkgPyAncmdiYSgzNyw5OSwyMzUsMC4wNyknIDogJ3RyYW5zcGFyZW50JyxcclxuICAgICAgICB9fVxyXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCB0b2dnbGVUYXJnZXQoZW50cnkuc2hhKSB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2lkdGg6ICcxNHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLCBmb250V2VpZ2h0OiA3MDAgfX0+XHJcbiAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKGVudHJ5LnNoYSkgPyAnXHUyNzEzJyA6ICcnfVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICB7dW5kaWdlc3RlZCAmJiAoXHJcbiAgICAgICAgICA8c3BhbiB0aXRsZT17dCgncGlja2VyLnVuZGlnZXN0ZWQnKX0gc3R5bGU9e3sgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JyksIGZvbnRTaXplOiAnMTBweCcsIGZsZXhTaHJpbms6IDAgfX0+XHUyNUNGPC9zcGFuPlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWluV2lkdGg6IDAgfX0+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT57ZW50cnkubGFiZWx9PC9zcGFuPlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e2VudHJ5Lm1ldGF9PC9zcGFuPlxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBjb25zdCBpbXBhY3RSaXNrQ29sb3IgPSB0aGVtZUF3YXJlVGV4dChpbXBhY3QgPT09IG51bGwgPyAnIzU3NjA2YScgOiAoUklTS19DT0xPUltpbXBhY3Qucmlza0xldmVsXSA/PyAnIzU3NjA2YScpKVxyXG5cclxuICBjb25zdCBjb21taXRzVGFiID0gKFxyXG4gICAgPD5cclxuICAgICAgey8qIFx1NEVEM1x1NUU5M1x1NjgwRiAqL31cclxuICAgICAgPENhcmQ+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzI1NjNlYicpfT57Y29tbWl0c0RhdGE/LmJyYW5jaCA/PyAnXHUyMDE0J308L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnIH19Pntjb21taXRzRGF0YT8ucm9vdFBhdGggPz8gcHJvamVjdD8ucm9vdFBhdGggPz8gJ1x1MjAxNCd9PC9zcGFuPlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxyXG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRDb21taXRzKCkgfX0+e3QoJ2FjdGlvbi5yZWZyZXNoJyl9PC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbH1cclxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignc2Nhbkhpc3RvcnknLCAnL3Byb2plY3QtY29udHJvbC9hcGkvYm9vdHN0cmFwJywgeyBpbmNsdWRlSGlzdG9yeTogdHJ1ZSwgc3VtbWFyaXplOiB0cnVlLCBtYXhDb21taXRzOiAzMCB9KSB9fVxyXG4gICAgICAgICAgPntidXN5ID09PSAnc2Nhbkhpc3RvcnknID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ3JlcG8uc2Nhbkhpc3RvcnknKX08L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9DYXJkPlxyXG4gICAgICB7LyogXHU2M0QwXHU0RUE0XHU1OTFBXHU5MDA5XHU0RTBCXHU2MkM5XHVGRjA4XHU3RDI3XHU1MUQxXHVGRjFCXHU5MDA5XHU0RTJEXHU1MTg1XHU1QkI5XHU1QjhDXHU2NTc0XHU1QzU1XHU3OTNBXHVGRjBDXHU1MTQxXHU4QkI4XHU4MUVBXHU3MTM2XHU2MzYyXHU4ODRDXHVGRjA5ICovfVxyXG4gICAgICA8Q2FyZCB0aXRsZT17dCgncGlja2VyLnRpdGxlJyl9PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHdpZHRoOiAnMTAwJScsIHRleHRBbGlnbjogJ2xlZnQnLCBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0Jywgd2hpdGVTcGFjZTogJ25vcm1hbCcgfX1cclxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRQaWNrZXJPcGVuKCFwaWNrZXJPcGVuKSB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtaW5XaWR0aDogMCB9fT5cclxuICAgICAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgICAgICAgICAgPyB0KCdwaWNrZXIucGxhY2Vob2xkZXInKVxyXG4gICAgICAgICAgICAgICAgOiBgJHt0KCdwaWNrZXIuc2VsZWN0ZWQnKX0gJHtzZWxlY3RlZFRhcmdldHMubGVuZ3RofVx1RkYxQSR7c2VsZWN0ZWRUYXJnZXRzLm1hcChzaG9ydExhYmVsKS5qb2luKCdcdUZGMUInKX1gfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1hcmdpbkxlZnQ6ICc4cHgnLCBmbGV4U2hyaW5rOiAwIH19Plx1MjVCRTwvc3Bhbj5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAge3BpY2tlck9wZW4gJiYgKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCB6SW5kZXg6IDI5IH19IG9uQ2xpY2s9eygpID0+IHsgc2V0UGlja2VyT3BlbihmYWxzZSkgfX0gLz5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAnY2FsYygxMDAlICsgNHB4KScsIGxlZnQ6IDAsIHJpZ2h0OiAwLCB6SW5kZXg6IDMwLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLCBib3hTaGFkb3c6ICcwIDhweCAyNHB4IHJnYmEoMCwwLDAsMC4xMiknLCBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc4cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuaW5wdXR9XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ3BpY2tlci5maWx0ZXInKX1cclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cGlja2VyRmlsdGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRQaWNrZXJGaWx0ZXIoZS50YXJnZXQudmFsdWUpIH19XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgIHsoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLnNvbWUoKGNvbW1pdCkgPT4gaXNVbmRpZ2VzdGVkKGNvbW1pdCkpICYmIChcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX1cclxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdwaWNrZXIudW5kaWdlc3RlZCcpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZWxlY3RDb21taXRzKChjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSkuZmlsdGVyKChjb21taXQpID0+IGlzVW5kaWdlc3RlZChjb21taXQpKS5tYXAoKGNvbW1pdCkgPT4gY29tbWl0LnNoYSkpIH19XHJcbiAgICAgICAgICAgICAgICAgICAgPlx1MjVDRiB7dCgncGlja2VyLnNlbGVjdEFsbFVuZGlnZXN0ZWQnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyBzZXRTZWxlY3RlZFRhcmdldHMoW10pIH19Pnt0KCdwaWNrZXIuY2xlYXInKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXhIZWlnaHQ6IDQyMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgIHtwaWNrZXJGaWx0ZXIudHJpbSgpID09PSAnJyA/IChcclxuICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gXHU2RDRGXHU4OUM4XHU4OUM2XHU1NkZFXHVGRjFBd29ya2luZyBcdTY3NjFcdTc2RUUgKyBcdTYzMDlcdThGNkVcdTZCMjFcdTUyMDZcdTdFQzRcdTc2ODRcdTYzRDBcdTRFQTRcdUZGMDhcdTUzNTVcdTYzRDBcdTRFQTRcdThGNkVcdTRFMERcdTY2M0VcdTc5M0FcdTdFQzRcdTU5MzRcdUZGMENcdTkwN0ZcdTUxNERcdTU2NkFcdTk3RjNcdUZGMDlcdTMwMDJcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVzOiBSZWFjdC5SZWFjdE5vZGVbXSA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3b3JraW5nID0gYWxsVGFyZ2V0cy5maW5kKChlbnRyeSkgPT4gZW50cnkuc2hhID09PSAnd29ya2luZycpXHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAod29ya2luZyAhPT0gdW5kZWZpbmVkKSBub2Rlcy5wdXNoKHJlbmRlclBpY2tlclJvdyh3b3JraW5nKSlcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ5U2hhID0gbmV3IE1hcChhbGxUYXJnZXRzLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LnNoYSAhPT0gJ3dvcmtpbmcnKS5tYXAoKGVudHJ5KSA9PiBbZW50cnkuc2hhLCBlbnRyeV0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgY29tbWl0Um91bmRzLmZvckVhY2goKHJvdW5kLCByb3VuZEluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudHJpZXMgPSByb3VuZC5jb21taXRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgoY29tbWl0KSA9PiBieVNoYS5nZXQoY29tbWl0LnNoYSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyB7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBtZXRhOiBzdHJpbmc7IHNoYTogc3RyaW5nIH0gPT4gZW50cnkgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJpZXMubGVuZ3RoID09PSAwKSByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJpZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMucHVzaChyZW5kZXJQaWNrZXJSb3coZW50cmllc1swXSEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoYXMgPSBlbnRyaWVzLm1hcCgoZW50cnkpID0+IGVudHJ5LnNoYSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsU2VsZWN0ZWQgPSBzaGFzLmV2ZXJ5KChzaGEpID0+IHNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhzaGEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtgcm91bmQtJHtyb3VuZEluZGV4fWB9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzhweCcsIHBhZGRpbmc6ICc2cHggMTJweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMywgcmdiYSg1LDUsNSwwLjA2KSknLCBmb250U2l6ZTogJzExcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdUQ4M0RcdURERDMge3Qocm91bmRJbmRleCA9PT0gMCA/ICdwaWNrZXIucm91bmRMYXRlc3QnIDogJ3BpY2tlci5yb3VuZCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhyb3VuZEluZGV4ICsgMSkpfSBcdTAwQjcge1N0cmluZyhlbnRyaWVzLmxlbmd0aCl9IHt0KCdyZXBvLmNvbW1pdHMnKX0gXHUwMEI3IHtuZXcgRGF0ZShyb3VuZC5maXJzdEF0KS50b0xvY2FsZURhdGVTdHJpbmcoKX1cdTIwMTN7bmV3IERhdGUocm91bmQubGFzdEF0KS50b0xvY2FsZURhdGVTdHJpbmcoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2VsZWN0Um91bmQoc2hhcykgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthbGxTZWxlY3RlZCA/IHQoJ3BpY2tlci5yb3VuZENsZWFyJykgOiB0KCdwaWNrZXIucm91bmRTZWxlY3QnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PixcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIG5vZGVzLnB1c2gocmVuZGVyUGlja2VyUm93KGVudHJ5KSlcclxuICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZXNcclxuICAgICAgICAgICAgICAgICAgICB9KSgpXHJcbiAgICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRUYXJnZXRzLm1hcCgoZW50cnkpID0+IHJlbmRlclBpY2tlclJvdyhlbnRyeSkpXHJcbiAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgIHsocGlja2VyRmlsdGVyLnRyaW0oKSA9PT0gJycgPyBhbGxUYXJnZXRzIDogZmlsdGVyZWRUYXJnZXRzKS5sZW5ndGggPT09IDAgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncGlja2VyLm5vTWF0Y2gnKX08L2Rpdj59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Ub3A6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdwaWNrZXIuaGludCcpfTwvc3Bhbj5cclxuICAgICAgICAgIHt1bmRpZ2VzdGVkQ291bnQgPiAwICYmIChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICA8c3BhbiB0aXRsZT17dCgncGlja2VyLnVuZGlnZXN0ZWQnKX0gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JykgfX0+XHJcbiAgICAgICAgICAgICAgICBcdTI1Q0Yge3QoJ3BpY2tlci51bmRpZ2VzdGVkQ291bnQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcodW5kaWdlc3RlZENvdW50KSl9XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IHRpdGxlPXt0KCdwaWNrZXIuZGlnZXN0QWxsSGludCcpfSBvbkNsaWNrPXtkaWdlc3RBbGx9Plx1MjZBMSB7dCgncGlja2VyLmRpZ2VzdEFsbCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICB7KGRldGFpbFF1ZXVlZENvdW50ID4gMCB8fCBkZXRhaWxSdW5uaW5nQ291bnQgPiAwKSAmJiAoXHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNkY2RjYWEnKX0+XHJcbiAgICAgICAgICAgICAge2RldGFpbFJ1bm5pbmdDb3VudCA+IDAgPyB0KCdkZXRhaWwuYWlMb2FkaW5nJykgOiAnJ31cclxuICAgICAgICAgICAgICB7ZGV0YWlsUnVubmluZ0NvdW50ID4gMCAmJiBkZXRhaWxRdWV1ZWRDb3VudCA+IDAgPyAnICcgOiAnJ31cclxuICAgICAgICAgICAgICB7ZGV0YWlsUXVldWVkQ291bnQgPiAwID8gJ1x1MjNGMyAnICsgdCgnZGV0YWlsLnF1ZXVlZCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhkZXRhaWxRdWV1ZWRDb3VudCkpIDogJyd9XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvQ2FyZD5cclxuXHJcbiAgICAgIHtjb21taXRzRXJyb3IgIT09IG51bGwgJiYgPENhcmQ+PGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncmVwby5sb2FkRmFpbGVkJyl9OiB7Y29tbWl0c0Vycm9yfTwvZGl2PjwvQ2FyZD59XHJcbiAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwICYmIDxDYXJkPjxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2RldGFpbC5waWNrJyl9PC9kaXY+PC9DYXJkPn1cclxuXHJcbiAgICAgIHsvKiBcdTVERTVcdTRGNUNcdThGNkVcdTZCMjFcdTUzRDlcdTRFOEJcdUZGMUFcdTU5MUFcdTYzRDBcdTRFQTRcdTY1NzRcdTRGNTNcdTg5RTNcdThCRkIgKi99XHJcbiAgICAgIHtzZWxlY3RlZFRhcmdldHMuZmlsdGVyKCh0YXJnZXQpID0+IHRhcmdldCAhPT0gJ3dvcmtpbmcnKS5sZW5ndGggPj0gMiAmJiAoXHJcbiAgICAgICAgPENhcmQgdGl0bGU9eydcdUQ4M0RcdURDRDYgJyArIHQoJ25hcnJhdGl2ZS50aXRsZScpfT5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiBuYXJyYXRpdmUgPT09IG51bGwgPyAnMCcgOiAnOHB4JyB9fT5cclxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e25hcnJhdGl2ZUJ1c3l9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkTmFycmF0aXZlKCkgfX0+XHJcbiAgICAgICAgICAgICAge25hcnJhdGl2ZUJ1c3kgPyB0KCduYXJyYXRpdmUucnVubmluZycpIDogJ1x1MjcyOCAnICsgdCgnbmFycmF0aXZlLmdlbmVyYXRlJyl9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICB7bmFycmF0aXZlICE9PSBudWxsICYmIG5hcnJhdGl2ZS5jYWNoZWQgJiYgKFxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdjYWNoZS5oaXQnKX17bmFycmF0aXZlLmdlbmVyYXRlZEF0ICE9PSB1bmRlZmluZWQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUobmFycmF0aXZlLmdlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9PC9zcGFuPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7bmFycmF0aXZlICE9PSBudWxsICYmIHJlbmRlckNvc3RCYWRnZShuYXJyYXRpdmUuY29zdFVzZCwgdCgnY29zdC50b29sdGlwJykpfVxyXG4gICAgICAgICAgICB7bmFycmF0aXZlICE9PSBudWxsICYmIChcclxuICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gZGlzYWJsZWQ9e25hcnJhdGl2ZUJ1c3l9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkTmFycmF0aXZlKHRydWUpIH19Pnt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIHtuYXJyYXRpdmVFcnJvciAhPT0gJycgJiYgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuZW1wdHksIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2QxMjQyZicpIH19PntuYXJyYXRpdmVFcnJvcn08L2Rpdj59XHJcbiAgICAgICAgICB7bmFycmF0aXZlICE9PSBudWxsICYmIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpblRvcDogJzRweCcgfX0+e3QoJ25hcnJhdGl2ZS5kaWdlc3RIaW50Jyl9PC9kaXY+fVxyXG4gICAgICAgICAge25hcnJhdGl2ZSAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcgfX0+e3JlbmRlclN0cnVjdHVyZWRDb250ZW50KG5hcnJhdGl2ZS5uYXJyYXRpdmUpfTwvZGl2PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICB7LyogXHU2QkNGXHU2NzYxXHU5MDA5XHU0RTJEXHU2M0QwXHU0RUE0XHU3Njg0IEFJIFx1ODlFM1x1OEJGQiAqL31cclxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5tYXAoKHRhcmdldCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGQgPSBkZXRhaWxzW3RhcmdldF1cclxuICAgICAgICBjb25zdCBsYWJlbCA9IHRhcmdldCA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiAoZD8uY29tbWl0Py5tZXNzYWdlID8/IHRhcmdldC5zbGljZSgwLCA4KSlcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPENhcmQga2V5PXtgZC0ke3RhcmdldH1gfSB0aXRsZT17YFx1RDgzRFx1REQwRCAke2xhYmVsfSR7dGFyZ2V0ICE9PSAnd29ya2luZycgPyBgXHVGRjA4JHt0YXJnZXQuc2xpY2UoMCwgOCl9XHVGRjA5YCA6ICcnfWB9PlxyXG4gICAgICAgICAgICB7ZCAhPT0gdW5kZWZpbmVkICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+XHJcbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpc0NhY2hlZCA9PT0gdHJ1ZSAmJiAoXHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e3QoJ2NhY2hlLmhpdCcpfXtkLmFuYWx5c2lzR2VuZXJhdGVkQXQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUoZC5hbmFseXNpc0dlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIHtyZW5kZXJDb3N0QmFkZ2UoZC5hbmFseXNpc0Nvc3RVc2QsIHQoJ2Nvc3QudG9vbHRpcCcpICsgKGQuYW5hbHlzaXNUb2tlbnMgPyBgXHVGRjA4aW4gJHtkLmFuYWx5c2lzVG9rZW5zLmlucHV0fSAvIG91dCAke2QuYW5hbHlzaXNUb2tlbnMub3V0cHV0fSB0b2tlbnNcdUZGMDlgIDogJycpKX1cclxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgbG9hZERldGFpbCh0YXJnZXQsIHRydWUpIH19Pnt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICB0aXRsZT17dCgnZGV0YWlsLnNhdmVOb3RlSGludCcpfVxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hhID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyAnd29ya2luZycgOiB0YXJnZXRcclxuICAgICAgICAgICAgICAgICAgICB2b2lkIHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGAke3QoJ2RldGFpbC5zYXZlTm90ZVRpdGxlJyl9XHVGRjFBJHsoZC5jb21taXQ/Lm1lc3NhZ2UgPz8gdGFyZ2V0KS5zbGljZSgwLCA2MCl9YCxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFtgXHUzMDEwXHU2NTM5XHU0RTg2XHU0RUMwXHU0RTQ4XHUzMDExXFxuJHtkLmFuYWx5c2lzLndoYXR9YCwgYFx1MzAxMFx1NUI5RVx1NzNCMFx1OTAzQlx1OEY5MVx1MzAxMVxcbiR7KGQuYW5hbHlzaXMubG9naWMgPz8gW10pLmpvaW4oJ1x1RkYxQicpfWAsIGBcdTMwMTBcdTk4Q0VcdTk2NjlcdTcwQjlcdTMwMTFcXG4keyhkLmFuYWx5c2lzLnJpc2tzID8/IFtdKS5qb2luKCdcdUZGMUInKX1gXS5maWx0ZXIoKGJsb2NrKSA9PiAhYmxvY2suZW5kc1dpdGgoJ1x1MzAxMVxcbicpKS5qb2luKCdcXG5cXG4nKSxcclxuICAgICAgICAgICAgICAgICAgICAgIHNoYSwgdGFnczogJ1x1NjgzOFx1NjdFNScsXHJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoeyBvayB9KSA9PiB7IHNldEFjdGlvblJlc3VsdChvayA/ICdcdTI3MTMgXHU1REYyXHU1QjU4XHU0RTNBXHU3QjE0XHU4QkIwXHVGRjA4XHU3QjE0XHU4QkIwXHU5ODc1XHU1M0VGXHU2N0U1XHU3NzBCXHVGRjA5JyA6ICdcdTI3MTcgXHU0RkREXHU1QjU4XHU1OTMxXHU4RDI1JykgOyBpZiAob2spIHZvaWQgbG9hZE5vdGVzKCkgfSlcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cdUQ4M0RcdURDQkUge3QoJ2RldGFpbC5zYXZlTm90ZScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ2RldGFpbC5zYXZlTWVtb3J5SGludCcpfVxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hhID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyB1bmRlZmluZWQgOiB0YXJnZXRcclxuICAgICAgICAgICAgICAgICAgICB2b2lkIHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgIG1lbW9yeVR5cGU6ICdyaXNrX2hvdHNwb3QnLCBzb3VyY2VUYWc6ICdyZXZpZXcnLCBiYXNpc1NoYTogc2hhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGBcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdUZGMUEkeyhkLmNvbW1pdD8ubWVzc2FnZSA/PyB0YXJnZXQpLnNsaWNlKDAsIDYwKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDogW2QuYW5hbHlzaXMud2hhdCwgKGQuYW5hbHlzaXMucmlza3MgPz8gW10pLmpvaW4oJ1x1RkYxQicpXS5maWx0ZXIoKHBhcnQpID0+IHBhcnQgIT09ICcnKS5qb2luKCdcXG4tLS1cXG4nKSxcclxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCh7IG9rIH0pID0+IHsgc2V0QWN0aW9uUmVzdWx0KG9rID8gJ1x1MjcxMyBcdTVERjJcdTZDODlcdTZEQzBcdTRFM0FcdThCQjBcdTVGQzZcdUZGMDhcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTdcdUZGMDknIDogJ1x1MjcxNyBcdTRGRERcdTVCNThcdTU5MzFcdThEMjUnKTsgaWYgKG9rKSB2b2lkIGxvYWRNZW1vcmllcygpIH0pXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHVEODNFXHVEREUwIHt0KCdkZXRhaWwuc2F2ZU1lbW9yeScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7ZCA9PT0gdW5kZWZpbmVkID8gKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e2RldGFpbFN0YXR1c1t0YXJnZXRdID09PSAncXVldWVkJyA/ICdcdTIzRjMgJyArIHQoJ2RldGFpbC5jYXJkUXVldWVkJykgOiB0KCdkZXRhaWwuYWlMb2FkaW5nJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIHtkLmNvbW1pdCAhPT0gbnVsbCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuY29tbWl0TWV0YX0+e2QuY29tbWl0LmF1dGhvcn0gXHUwMEI3IHtuZXcgRGF0ZShkLmNvbW1pdC5kYXRlKS50b0xvY2FsZVN0cmluZygpfSBcdTAwQjcge2QuZmlsZXMubGVuZ3RofSB7dCgnZGV0YWlsLmZpbGVzJyl9IFx1MDBCNyAre2QuaW5zZXJ0aW9uc30vLXtkLmRlbGV0aW9uc308L2Rpdj59XHJcbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy53aGF0ICE9PSAnJyAmJiAoXHJcbiAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBtYXJnaW5Ub3A6ICc4cHgnIH19Pnt0KCdkZXRhaWwud2hhdCcpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy53aGF0fT57ZC5hbmFseXNpcy53aGF0fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5sb2dpYy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2VjdGlvblRpdGxlfT57dCgnZGV0YWlsLmxvZ2ljJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge2QuYW5hbHlzaXMubG9naWMubWFwKChzdGVwLCBpKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3N0eWxlcy5sb2dpY1N0ZXB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsIGZvbnRXZWlnaHQ6IDYwMCB9fT57aSArIDF9Ljwvc3Bhbj57c3RlcH1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5yaXNrcy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzZweCcgfX0+e3QoJ2RldGFpbC5yaXNrJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge2QuYW5hbHlzaXMucmlza3MubWFwKChyaXNrLCBpKSA9PiA8ZGl2IGtleT17aX0gc3R5bGU9e3sgLi4uc3R5bGVzLnJpc2tJdGVtLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM5YTY3MDAnKSB9fT5cdTI2QTAge3JlbmRlcldpdGhQZWVrKHJpc2spfTwvZGl2Pil9XHJcbiAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIHsvKiBcdTY1ODdcdTRFRjZcdTZFMDVcdTUzNTUgKyBcdTkwMTBcdTY1ODdcdTRFRjZcdTlBRDhcdTRFQUVcdTVCRjlcdTZCRDQgKi99XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzEwcHgnIH19Pnt0KCdkZXRhaWwuZmlsZXMnKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cclxuICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIHtkLmZpbGVzLm1hcCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7dGFyZ2V0fXwke2ZpbGUucGF0aH1gXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXRjaCA9IGZpbGVEaWZmc1trZXldXHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2tleX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4Jywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57ZmlsZS5wYXRofTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyMxYTdmMzcnKSwgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+K3tmaWxlLmFkZHN9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NmMjIyZScpLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT4te2ZpbGUuZGVsc308L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkRmlsZURpZmYodGFyZ2V0LCBmaWxlLnBhdGgpIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwYXRjaCA9PT0gdW5kZWZpbmVkID8gdCgnZGlmZi5zaG93JykgOiB0KCdkaWZmLmhpZGUnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge3BhdGNoICE9PSB1bmRlZmluZWQgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17YCR7a2V5fS1kaWZmYH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjb2xTcGFuPXs0fSBzdHlsZT17eyAuLi5zdHlsZXMudGQsIHBhZGRpbmc6IDAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPERpZmZWaWV3IHBhdGNoPXtwYXRjaH0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9DYXJkPlxyXG4gICAgICAgIClcclxuICAgICAgfSl9XHJcblxyXG4gICAgICB7LyogXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHVGRjFBXHU2MzA5XHU5NEFFICsgXHU5OENFXHU5NjY5XHU2Nzg0XHU2MjEwICsgXHU1OTI3XHU1NkZFICsgXHU1RjcxXHU1NENEXHU3MEI5XHU2NjBFXHU3RUM2ICsgXHU4QkIwXHU1RkM2XHU4MDU0XHU1MkE4ICovfVxyXG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdkZXRhaWwuaW1wYWN0Jyl9PlxyXG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2ltcGFjdExvYWRpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkSW1wYWN0KCkgfX0+XHJcbiAgICAgICAgICAgIHtpbXBhY3RMb2FkaW5nID8gdCgnZGV0YWlsLmltcGFjdExvYWRpbmcnKSA6IHQoJ2RldGFpbC5pbXBhY3QnKX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiBpbXBhY3QuZXhwbGFuYXRpb25zQ2FjaGVkID09PSB0cnVlICYmIChcclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKCcjOGI4YjhiJyksIG1hcmdpbkxlZnQ6ICc4cHgnIH19PlxyXG4gICAgICAgICAgICAgIHt0KCdjYWNoZS5oaXQnKX17aW1wYWN0LmdlbmVyYXRlZEF0ID8gJyBcdTAwQjcgJyArIG5ldyBEYXRlKGltcGFjdC5nZW5lcmF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKSA6ICcnfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiByZW5kZXJDb3N0QmFkZ2UoaW1wYWN0LmV4cGxhbmF0aW9uc0Nvc3RVc2QsIHQoJ2Nvc3QudG9vbHRpcCcpKX1cclxuICAgICAgICAgIHtpbXBhY3QgIT09IG51bGwgJiYgKFxyXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIG1hcmdpbkxlZnQ6ICc4cHgnLCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gZGlzYWJsZWQ9e2ltcGFjdExvYWRpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkSW1wYWN0KHRydWUpIH19PlxyXG4gICAgICAgICAgICAgIHt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIHtpbXBhY3QgIT09IG51bGwgJiYgKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnMTBweCcsIG1hcmdpbjogJzEwcHggMCA0cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKGltcGFjdFJpc2tDb2xvciksIGZvbnRTaXplOiAnMTNweCcsIHBhZGRpbmc6ICczcHggMTBweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgIHt0KCdpbXBhY3QucmlzaycpfToge2ltcGFjdC5yaXNrTGV2ZWx9XHVGRjA4e2ltcGFjdC5yaXNrU2NvcmV9XHVGRjA5XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB7aW1wYWN0LmtleUNoYW5nZVBvaW50cyAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5rZXlDaGFuZ2VQb2ludHMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzlhNjcwMCcpIH19Plx1MjZBMCB7dCgnaW1wYWN0LmtleVBvaW50cycpfToge2ltcGFjdC5rZXlDaGFuZ2VQb2ludHMubWFwKChmaWxlKSA9PiBmaWxlLnNwbGl0KCcvJykucG9wKCkpLmpvaW4oJ1x1MzAwMScpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAge2ltcGFjdC5yaXNrRmFjdG9ycyAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5yaXNrRmFjdG9ycy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zZWN0aW9uVGl0bGV9Pnt0KCdpbXBhY3QuZmFjdG9ycycpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogJzJweCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIHtpbXBhY3Qucmlza0ZhY3RvcnMubWFwKChmYWN0b3IsIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGZvbnRTaXplOiAnMTJweCcsIHBhZGRpbmc6ICczcHggOHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGJvcmRlclJhZGl1czogJzRweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntmYWN0b3IudGV4dH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBpbXBhY3RSaXNrQ29sb3IsIGZvbnRXZWlnaHQ6IDYwMCB9fT4re2ZhY3Rvci5wb2ludHN9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICA8SW1wYWN0R3JhcGggZGF0YT17aW1wYWN0fSB0PXt0fSAvPlxyXG4gICAgICAgICAgICAgIHtpbXBhY3QubGV2ZWxzLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdpbXBhY3Qubm9uZScpfTwvZGl2Pn1cclxuICAgICAgICAgICAgICB7LyogXHU1MUZEXHU2NTcwXHU3RUE3XHU1RjcxXHU1NENEXHVGRjFBXHU2NzJDXHU2QjIxXHU0RkVFXHU2NTM5XHU0RTg2XHU1NEVBXHU0RTlCXHU1MUZEXHU2NTcwXHUzMDAxXHU2Q0UyXHU1M0NBXHU0RTg2XHU4QzAxXHU3Njg0XHU1NEVBXHU0RTlCXHU1MUZEXHU2NTcwXHUzMDAxXHU4QzAzXHU3NTI4XHU3MEI5XHU1NzI4XHU1NEVBICovfVxyXG4gICAgICAgICAgICAgIHtpbXBhY3QuZnVuY3Rpb25JbXBhY3QgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3QuZnVuY3Rpb25JbXBhY3QubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzEycHgnIH19Pnt0KCdpbXBhY3QuZnVuY3Rpb25zJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnOHB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7aW1wYWN0LmZ1bmN0aW9uSW1wYWN0Lm1hcCgoZW50cnkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeS5zeW1ib2x9IHN0eWxlPXt7IGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMTBweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnI2Q5NzcwNicpfT57ZW50cnkuc3ltYm9sfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMubGFiZWwsIG1hcmdpbkxlZnQ6ICc4cHgnIH19PntlbnRyeS5kZWZpbmVkSW59PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LnJvbGUgIT09IHVuZGVmaW5lZCAmJiBlbnRyeS5yb2xlICE9PSAnJyAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCwgbWFyZ2luVG9wOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdpbmxpbmUnLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+e3QoJ2ltcGFjdC5mdW5jUm9sZScpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5yb2xlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2hhbmdlICE9PSB1bmRlZmluZWQgJiYgZW50cnkuY2hhbmdlICE9PSAnJyAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdpbmxpbmUnLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM5YTY3MDAnKSB9fT57dCgnaW1wYWN0LmZ1bmNDaGFuZ2UnKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuaW1wYWN0ICE9PSB1bmRlZmluZWQgJiYgZW50cnkuaW1wYWN0ICE9PSAnJyAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCwgbWFyZ2luQm90dG9tOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdpbmxpbmUnLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNjZTkxNzgnKSB9fT57dCgnaW1wYWN0LmZ1bmNDYWxsZXJzJyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmltcGFjdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNhbGxlcnMubWFwKChjYWxsZXIsIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgLi4uc3R5bGVzLmxvZ2ljU3RlcCwgbWFyZ2luVG9wOiAnM3B4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpIH19Plx1MjFCMzwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUgZG90dGVkJyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgb3BlblBlZWsoY2FsbGVyLmZpbGUsIE51bWJlcihjYWxsZXIubGluZSkpIH19PntjYWxsZXIuZmlsZX06e2NhbGxlci5saW5lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Plx1MjAxNCB7Y2FsbGVyLnNuaXBwZXQuc2xpY2UoMCwgODApfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIHtpbXBhY3QuZnVuY3Rpb25JbXBhY3QgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3QuZnVuY3Rpb25JbXBhY3QubGVuZ3RoID09PSAwICYmIChcclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2ltcGFjdC5mdW5jdGlvbnNOb25lJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICB7aW1wYWN0Lm1lbW9yaWVzICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0Lm1lbW9yaWVzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxMHB4JywgcGFkZGluZzogJzhweCAxMHB4JywgYm9yZGVyOiAnMXB4IGRhc2hlZCByZ2JhKDM3LDk5LDIzNSwwLjM1KScsIGJvcmRlclJhZGl1czogJzZweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Pnt0KCdpbXBhY3QubWVtb3J5Jyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4V3JhcDogJ3dyYXAnLCBnYXA6ICc2cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIHtpbXBhY3QubWVtb3JpZXMubWFwKChtZW1vcnksIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGtleT17aX0gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzI1NjNlYicpfT57bWVtb3J5LnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9DYXJkPlxyXG4gICAgICApfVxyXG5cclxuICAgICAgey8qIFx1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNVx1RkYxQVx1N0VEM1x1OEJCQSArIFx1N0VEM1x1Njc4NFx1NTMxNlx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NSAqL31cclxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICA8Q2FyZCB0aXRsZT17dCgnZGV0YWlsLm9wdGltYWxpdHknKX0+XHJcbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17cmV2aWV3TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSZXZpZXdzKCkgfX0+XHJcbiAgICAgICAgICAgIHtyZXZpZXdMb2FkaW5nID8gdCgnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJykgOiB0KCdkZXRhaWwub3B0aW1hbGl0eScpfVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLm1hcCgodGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHIgPSByZXZpZXdzW3RhcmdldF1cclxuICAgICAgICAgICAgaWYgKHIgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGxcclxuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/IHQoJ3JlcG8ud29ya2luZycpIDogdGFyZ2V0LnNsaWNlKDAsIDgpXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2ByLSR7dGFyZ2V0fWB9IHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgICAgICB7bGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgIHtyLmNhY2hlZCA9PT0gdHJ1ZSAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57dCgnY2FjaGUuaGl0Jyl9e3IuZ2VuZXJhdGVkQXQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUoci5nZW5lcmF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKSA6ICcnfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAge3JlbmRlckNvc3RCYWRnZShyLmNvc3RVc2QsIHQoJ2Nvc3QudG9vbHRpcCcpKX1cclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSZXZpZXdzKHRydWUpIH19Pnt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtyLnZlcmRpY3QgIT09ICcnICYmIChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCwgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDUpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMzcsOTksMjM1LDAuMiknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnIH19PntyLnZlcmRpY3R9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAge3IuaXNzdWVMaXN0ICE9PSB1bmRlZmluZWQgJiYgci5pc3N1ZUxpc3QubGVuZ3RoID4gMCA/IChcclxuICAgICAgICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgIDx0cj57WydyZXZpZXcuY29sLnNldmVyaXR5JywgJ3Jldmlldy5jb2wuY2F0ZWdvcnknLCAncmV2aWV3LmNvbC50aXRsZScsICdyZXZpZXcuY29sLmV2aWRlbmNlJywgJ3Jldmlldy5jb2wuZml4J10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgIHtyLmlzc3VlTGlzdC5tYXAoKGlzc3VlLCBpKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2l9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKGlzc3VlLnNldmVyaXR5ID09PSAnY3JpdGljYWwnID8gJyNmMTRjNGMnIDogaXNzdWUuc2V2ZXJpdHkgPT09ICdoaWdoJyA/ICcjY2U5MTc4JyA6IGlzc3VlLnNldmVyaXR5ID09PSAnbWVkaXVtJyA/ICcjZGNkY2FhJyA6ICcjNTY5Y2Q2Jyl9Pntpc3N1ZS5zZXZlcml0eX08L3NwYW4+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2lzc3VlLmNhdGVnb3J5fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntpc3N1ZS50aXRsZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19Pntpc3N1ZS5ldmlkZW5jZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXNzdWUuZml4fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncmV2aWV3LmNsZWFuJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICAgIHtyZXZpZXdMb2FkaW5nICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZycpfTwvZGl2Pn1cclxuICAgICAgICAgIHshcmV2aWV3TG9hZGluZyAmJiBzZWxlY3RlZFRhcmdldHMuZXZlcnkoKHRhcmdldCkgPT4gcmV2aWV3c1t0YXJnZXRdID09PSB1bmRlZmluZWQpICYmIChcclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncmV2aWV3LmhpbnQnKX08L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9DYXJkPlxyXG4gICAgICApfVxyXG4gICAgPC8+XHJcbiAgKVxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgXHU4QkJFXHU3RjZFXHU5ODc1XHU3QjdFIFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFRJRVJfTEFCRUxTOiBBcnJheTx7IGtleTogc3RyaW5nOyB6aDogc3RyaW5nOyBkZXNjOiBzdHJpbmcgfT4gPSBbXHJcbiAgICB7IGtleTogJ3N0YW5kYXJkJywgemg6ICdcdTg5RTNcdThCRkIgLyBcdTUxRkRcdTY1NzBcdTVGNzFcdTU0Q0RcdThCRjRcdTY2MEUnLCBkZXNjOiAnXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XHU3Njg0IEFJIFx1ODlFM1x1OEJGQlx1MzAwMVx1NUY3MVx1NTRDRFx1NTIwNlx1Njc5MCcgfSxcclxuICAgIHsga2V5OiAncmVhc29uaW5nJywgemg6ICdcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTUgLyBcdTYyNjdcdTg4NENcdThCQTFcdTUyMTInLCBkZXNjOiAnXHU4QkM0XHU1QkExXHUzMDAxXHU4QkExXHU1MjEyXHU3NTFGXHU2MjEwXHUzMDAxQUkgXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzJyB9LFxyXG4gICAgeyBrZXk6ICdmYXN0Jywgemg6ICdcdTUzODZcdTUzRjJcdThGN0JcdTY3OTAnLCBkZXNjOiAnXHU2MjZCXHU2M0NGXHU1Mzg2XHU1M0YyXHU2NUY2XHU3Njg0XHU5MDEwXHU2M0QwXHU0RUE0XHU0RTAwXHU1M0U1XHU4QkREJyB9LFxyXG4gICAgeyBrZXk6ICd2ZXJpZmllcicsIHpoOiAnXHU5QThDXHU2NTM2JywgZGVzYzogJ1x1NjUzOVx1NTJBOFx1OUE4Q1x1NjUzNlx1NzY4NCBBSSBcdTU5MERcdTY4MzgnIH0sXHJcbiAgXVxyXG5cclxuICBjb25zdCBzZXR0aW5nc1RhYiA9IChcclxuICAgIDw+XHJcbiAgICAgIHsvKiBcdTZBMjFcdTU3OEJcdTUyMDZcdTkxNERcdUZGMUFcdTUzRUZcdTg5QzZcdTUzMTZcdTUyMDdcdTYzNjJcdTU0MDRcdTRFRkJcdTUyQTFcdTc1MjhcdTc2ODRcdTZBMjFcdTU3OEJcdUZGMENcdTRGRERcdTVCNThcdTUzNzNcdTc1MUZcdTY1NDggKi99XHJcbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdtb2RlbC50aXRsZScpfT5cclxuICAgICAgICB7bW9kZWxUaWVycyA9PT0gbnVsbCA/IChcclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ21vZGVsLmxvYWRpbmcnKX08L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPD5cclxuICAgICAgICAgICAge1RJRVJfTEFCRUxTLm1hcCgodGllcikgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBtb2RlbFRpZXJzW3RpZXIua2V5XVxyXG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3VycmVudCA/IGN1cnJlbnQucHJvdmlkZXIgKyAnLycgKyBjdXJyZW50Lm1vZGVsIDogJydcclxuICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e3RpZXIua2V5fSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJyB9fT5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWluV2lkdGg6IDE1MCwgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwIH19Pnt0aWVyLnpofTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPHNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAyNDAgfX1cclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2ID0gZS50YXJnZXQudmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgIGlmICh2ID09PSAnJykgeyBzZXRNb2RlbFRpZXJzKHsgLi4ubW9kZWxUaWVycywgW3RpZXIua2V5XTogeyBwcm92aWRlcjogJycsIG1vZGVsOiAnJyB9IH0pOyByZXR1cm4gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3Byb3ZpZGVyLCAuLi5yZXN0XSA9IHYuc3BsaXQoJy8nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZWwgPSByZXN0LmpvaW4oJy8nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZWxUaWVycyh7IC4uLm1vZGVsVGllcnMsIFt0aWVyLmtleV06IHsgcHJvdmlkZXIsIG1vZGVsIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt0KCdtb2RlbC5mb2xsb3dDaGF0Jyl9PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAge21vZGVsT3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0gdmFsdWU9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRpb24ucHJvdmlkZXJ9IC8ge29wdGlvbi5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dGllci5kZXNjfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnOHB4JywgcGFkZGluZzogJzhweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJyB9fT5cclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+XHVEODNFXHVERDE2IHt0KCdmaXgubW9kZWxUaXRsZScpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxyXG4gICAgICAgICAgICAgICAgbWluPXsxfVxyXG4gICAgICAgICAgICAgICAgbWF4PXsxMH1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgd2lkdGg6IDY0LCB0ZXh0QWxpZ246ICdjZW50ZXInIH19XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17Zml4Q29uY3VycmVuY3l9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0Rml4Q29uY3VycmVuY3koZS50YXJnZXQudmFsdWUpIH19XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnZml4Lm1vZGVsSGludCcpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17bW9kZWxTYXZpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzYXZlTW9kZWxDb25maWcoKSB9fT5cclxuICAgICAgICAgICAgICAgIHttb2RlbFNhdmluZyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdtb2RlbC5zYXZlJyl9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAge21vZGVsU2F2ZWQgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzRlYzliMCcpfT57dCgnbW9kZWwuc2F2ZWQnKX08L3NwYW4+fVxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdtb2RlbC5oaW50Jyl9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQ2FyZD5cclxuICAgICAgPGRpdiBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC10ZXJ0aWFyeSwgIzljYTNhZiknLCBwYWRkaW5nOiAnOHB4IDAnIH19PlxyXG4gICAgICAgIGRzaC1wcm9qZWN0LWNvbnRyb2wgdntzdGF0ZT8ucGx1Z2luVmVyc2lvbiA/PyAnPyd9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC8+XHJcbiAgKVxyXG5cclxuICBjb25zdCBvdmVydmlld1RhYiA9IChcclxuICAgIDw+XHJcbiAgICAgIDxDYXJkPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxyXG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2Jvb3RzdHJhcHBpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5Cb290c3RyYXAoKSB9fT5cclxuICAgICAgICAgICAge2Jvb3RzdHJhcHBpbmcgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLnJlc2NhbicpfVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbH0gb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignYW5hbHl6ZScsICcvcHJvamVjdC1jb250cm9sL2FwaS9hbmFseXplJywge30pIH19PlxyXG4gICAgICAgICAgICB7YnVzeSA9PT0gJ2FuYWx5emUnID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi5hbmFseXplJyl9XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtidXN5ICE9PSBudWxsfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCd2ZXJpZnknLCAnL3Byb2plY3QtY29udHJvbC9hcGkvdmVyaWZ5Jywge30pIH19PlxyXG4gICAgICAgICAgICB7YnVzeSA9PT0gJ3ZlcmlmeScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLnZlcmlmeScpfVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvQ2FyZD5cclxuICAgICAge3Jlc3VsdFBhbmVsfVxyXG4gICAgICB7cHJvamVjdCA9PT0gbnVsbCA/IChcclxuICAgICAgICA8Q2FyZD5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEzcHgnLCBtYXJnaW5Cb3R0b206ICc2cHgnIH19Pnt0KCdzdGF0ZS5ub1Byb2plY3QnKX08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3N0YXRlLm5vUHJvamVjdEhpbnQnKX08L2Rpdj5cclxuICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPENhcmQgdGl0bGU9e2Ake3QoJ3N0YXRlLnByb2plY3QnKX1cdUZGMUEke3Byb2plY3QubmFtZX1gfT5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxyXG4gICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT5Sb290PC9zcGFuPntwcm9qZWN0LnJvb3RQYXRofTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAge2Jvb3RzdHJhcCAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvd30+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUudGVjaFN0YWNrJyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICB7Ym9vdHN0cmFwLnRlY2hTdGFjay5tYXAoKHRlY2gpID0+IDxzcGFuIGtleT17dGVjaH0gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzRlYzliMCcpfT57dGVjaH08L3NwYW4+KX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cclxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS5zeW1ib2xzJyl9PC9zcGFuPntTdHJpbmcoYm9vdHN0cmFwLnN5bWJvbHNDb3VudCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLm1hbmlmZXN0cycpfTwvc3Bhbj57U3RyaW5nKGJvb3RzdHJhcC5tYW5pZmVzdEZpbGVzLmxlbmd0aCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLmV2aWRlbmNlJyl9PC9zcGFuPntTdHJpbmcoc3RhdGU/LmV2aWRlbmNlQ291bnQgPz8gMCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpblRvcDogJzhweCcgfX0+e2Jvb3RzdHJhcC5zdW1tYXJ5fTwvZGl2PlxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9DYXJkPlxyXG4gICAgICApfVxyXG4gICAgICA8Q2FyZCB0aXRsZT17dCgnY29uZmlybWVkLnRpdGxlJyl9PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cclxuICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPXsyfSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSBwbGFjZWhvbGRlcj17dCgnY29uZmlybWVkLnRleHQnKX0gdmFsdWU9e2NvbmZpcm1lZFRleHR9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDb25maXJtZWRUZXh0KGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdjb25maXJtZWQucGF0aHMnKX0gdmFsdWU9e2NvbmZpcm1lZFBhdGhzfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q29uZmlybWVkUGF0aHMoZS50YXJnZXQudmFsdWUpIH19IC8+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuYnV0dG9ufVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBjb25maXJtZWRUZXh0ID09PSAnJ31cclxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignYWRkQ29uZmlybWVkJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbmZpcm1lZCcsIHsgdHlwZTogJ2NvbnN0cmFpbnQnLCB0ZXh0OiBjb25maXJtZWRUZXh0LCBmb3JiaWRkZW5QYXRoczogY29uZmlybWVkUGF0aHMuc3BsaXQoJywnKS5tYXAoKHBhdGgpID0+IHBhdGgudHJpbSgpKS5maWx0ZXIoKHBhdGgpID0+IHBhdGggIT09ICcnKSB9KS50aGVuKCgpID0+IHsgc2V0Q29uZmlybWVkVGV4dCgnJyk7IHNldENvbmZpcm1lZFBhdGhzKCcnKSB9KSB9fVxyXG4gICAgICAgICAgPntidXN5ID09PSAnYWRkQ29uZmlybWVkJyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdjb25maXJtZWQuYWRkJyl9PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAge2NvbmZpcm1lZC5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdjb25maXJtZWQubm9uZScpfTwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XHJcbiAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICB7Y29uZmlybWVkLm1hcCgoaXRlbSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPHRyIGtleT17aXRlbS5pZH0+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjYzU4NmMwJyl9PntpdGVtLnR5cGV9PC9zcGFuPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXRlbS50ZXh0fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXRlbS5mb3JiaWRkZW5QYXRocy5qb2luKCcsICcpIHx8ICdcdTIwMTQnfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cclxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3JlbW92ZUNvbmZpcm1lZCcsICcvcHJvamVjdC1jb250cm9sL2FwaS9jb25maXJtZWQvcmVtb3ZlJywgeyBpZDogaXRlbS5pZCB9KSB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cdTI3MTU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQ2FyZD5cclxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnKX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxyXG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLmNoYW5nZVRpdGxlJyl9IHZhbHVlPXtjaGFuZ2VUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENoYW5nZVRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAgPHRleHRhcmVhIHJvd3M9ezJ9IHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLmNoYW5nZURlc2MnKX0gdmFsdWU9e2NoYW5nZURlc2N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDaGFuZ2VEZXNjKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLmJ1dHRvbn1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgY2hhbmdlVGl0bGUgPT09ICcnfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdjcmVhdGVDaGFuZ2UnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY2hhbmdlcycsIHsgdGl0bGU6IGNoYW5nZVRpdGxlLCBkZXNjcmlwdGlvbjogY2hhbmdlRGVzYyB9KS50aGVuKCgpID0+IHsgc2V0Q2hhbmdlVGl0bGUoJycpOyBzZXRDaGFuZ2VEZXNjKCcnKSB9KSB9fVxyXG4gICAgICAgICAgPntidXN5ID09PSAnY3JlYXRlQ2hhbmdlJyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24uY3JlYXRlQ2hhbmdlJyl9PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAge2NoYW5nZXMubGVuZ3RoID09PSAwID8gKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc3RhdGUubm9DaGFuZ2VzJyl9PC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cclxuICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgIDx0cj57WydjaGFuZ2VzLmNvbC50aXRsZScsICdjaGFuZ2VzLmNvbC50eXBlJywgJ2NoYW5nZXMuY29sLnN0YXR1cycsICdjaGFuZ2VzLmNvbC51cGRhdGVkJ10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHtjaGFuZ2VzLm1hcCgoY2hhbmdlKSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtjaGFuZ2UuaWR9PlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2NoYW5nZS50aXRsZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShjaGFuZ2Uuc3RhdHVzID09PSAnY29tcGxldGVkJyA/ICcjNGVjOWIwJyA6ICcjNTY5Y2Q2Jyl9PntjaGFuZ2Uuc3RhdHVzfTwvc3Bhbj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2Zvcm1hdFRpbWUoY2hhbmdlLnVwZGF0ZWRBdCl9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyh7IHRpdGxlOiAnXHU1MjIwXHU5NjY0XHU4RkQ5XHU0RTJBXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExXHVGRjFGJywgbWVzc2FnZTogJ1x1MzAwQycgKyBjaGFuZ2UudGl0bGUgKyAnXHUzMDBEXHU1M0NBXHU1MTc2XHU1MTY4XHU5MEU4XHU2MjY3XHU4ODRDXHU4QkIwXHU1RjU1XHUzMDAxXHU4QkExXHU1MjEyXHUzMDAxXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHU1QzA2XHU4OEFCXHU2QzM4XHU0RTQ1XHU1MjIwXHU5NjY0XHUzMDAyJywgZGFuZ2VyOiB0cnVlLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2RlbGV0ZUNoYW5nZScsICcvcHJvamVjdC1jb250cm9sL2FwaS9jaGFuZ2VzL2RlbGV0ZScsIHsgaWQ6IGNoYW5nZS5pZCB9KSB9IH0pIH19Plx1MjcxNTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9DYXJkPlxyXG4gICAgPC8+XHJcbiAgKVxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHU5ODc1XHU3QjdFXHVGRjFBXHU5ODc1XHU5NzYyXHU3NkY0XHU2M0E1XHU1MjFCXHU1RUZBXHU1RTc2XHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHVGRjBDXHU4MDRBXHU1OTI5XHU1M0VBXHU2NjJGXHU1M0U2XHU0RTAwXHU3OUNEXHU1MTY1XHU1M0UzIFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGV4ZWN1dGlvblRhYiA9IChcclxuICAgIDw+XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnMTBweCcsIHBhZGRpbmc6ICc3cHggMTJweCcsIGJvcmRlclJhZGl1czogJzhweCcsIGJhY2tncm91bmQ6ICdyZ2JhKDM3LDk5LDIzNSwwLjA2KScsIGJvcmRlcjogJzFweCBzb2xpZCByZ2JhKDM3LDk5LDIzNSwwLjIpJywgZm9udFNpemU6ICcxMXB4JyB9fT5cclxuICAgICAgICA8Yj5cdTI0NjAge3QoJ2V4ZWMuZmxvd0NyZWF0ZScpfTwvYj48c3Bhbj5cdTIxOTI8L3NwYW4+XHJcbiAgICAgICAgPGI+XHUyNDYxIHt0KCdleGVjLmZsb3dPcmNoZXN0cmF0ZScpfTwvYj48c3Bhbj5cdTIxOTI8L3NwYW4+XHJcbiAgICAgICAgPGI+XHUyNDYyIHt0KCdleGVjLmZsb3dSdW4nKX08L2I+PHNwYW4+XHUyMTkyPC9zcGFuPlxyXG4gICAgICAgIDxiPlx1MjQ2MyB7dCgnZXhlYy5mbG93TWVtb3J5Jyl9PC9iPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2V4ZWMuY3JlYXRlJyl9PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtSW5saW5lfT5cclxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIGZsZXg6IDEsIG1pbldpZHRoOiAyMDAgfX0gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybVRpdGxlJyl9IHZhbHVlPXtleGVjVGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFeGVjVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XHJcbiAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycgfX0gdmFsdWU9e2V4ZWNNb2RlbH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEV4ZWNNb2RlbChlLnRhcmdldC52YWx1ZSkgfX0gdGl0bGU9e3QoJ3BsYW4ubW9kZWxEZWZhdWx0Jyl9PlxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e3QoJ2V4ZWMubW9kZWxEZWZhdWx0Jyl9PC9vcHRpb24+XHJcbiAgICAgICAgICAgIHsobW9kZWxPcHRpb25zID8/IFtdKS5tYXAoKG9wdGlvbikgPT4gPG9wdGlvbiBrZXk9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0gdmFsdWU9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0+e29wdGlvbi5wcm92aWRlcn0ve29wdGlvbi5pZH08L29wdGlvbj4pfVxyXG4gICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxyXG4gICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezN9IHBsYWNlaG9sZGVyPXt0KCdleGVjLmZvcm1EZXNjJyl9IHZhbHVlPXtleGVjRGVzY30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEV4ZWNEZXNjKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmFjdGlvblJvd30+XHJcbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtidXN5ICE9PSBudWxsIHx8IGV4ZWNUaXRsZS50cmltKCkgPT09ICcnIHx8IGV4ZWNEZXNjLnRyaW0oKSA9PT0gJyd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzdGFydFJ1bigpIH19PlxyXG4gICAgICAgICAgICAgIHtidXN5ID09PSAnc3RhcnRSdW4nID8gdCgnZXhlYy5wbGFubmluZycpIDogdCgnZXhlYy5zdGFydCcpfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ2V4ZWMuY3JlYXRlSGludCcpfTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0NhcmQ+XHJcbiAgICAgIHtyZXN1bHRQYW5lbH1cclxuICAgICAge3BsYW5Db25maXJtICE9PSBudWxsICYmIChcclxuICAgICAgICA8Q2FyZCB0aXRsZT17dCgncGxhbi50aXRsZScpfT5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+e3QoJ3BsYW4uaGludCcpfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxyXG4gICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgIDx0cj57WydwbGFuLmNvbC5zdGVwJywgJ3BsYW4uY29sLnJvbGUnLCAncGxhbi5jb2wubW9kZWwnLCAncGxhbi5jb2wucG9saWN5JywgJ3BsYW4uY29sLmVuYWJsZWQnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxyXG4gICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAge3BsYW5Db25maXJtLnN0ZXBzLm1hcCgoc3RlcCwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgICAgPHRyIGtleT17c3RlcC5pZH0gc3R5bGU9e3sgb3BhY2l0eTogc3RlcC5lbmFibGVkID8gMSA6IDAuNDUgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgbWluV2lkdGg6IDIyMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFdlaWdodDogNjAwIH19PntpbmRleCArIDF9LiB7c3RlcC50aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3N0ZXAuZGVzY3JpcHRpb24uc2xpY2UoMCwgMTIwKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIHtzdGVwLnRhcmdldEZpbGVzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJyB9fT57c3RlcC50YXJnZXRGaWxlcy5qb2luKCcsICcpLnNsaWNlKDAsIDEyMCl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDZweCcgfX0gdmFsdWU9e3N0ZXAucm9sZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBsYW5Db25maXJtKHsgLi4ucGxhbkNvbmZpcm0sIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcy5tYXAoKGl0ZW0sIGkpID0+IGkgPT09IGluZGV4ID8geyAuLi5pdGVtLCByb2xlOiBlLnRhcmdldC52YWx1ZSB9IDogaXRlbSkgfSkgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtbJ2FuYWx5c2lzJywgJ3BsYW5uaW5nJywgJ2NvZGluZycsICdvcHMnLCAndmVyaWZpY2F0aW9uJ10ubWFwKChyb2xlKSA9PiA8b3B0aW9uIGtleT17cm9sZX0gdmFsdWU9e3JvbGV9PntST0xFX0xBQkVMU1tyb2xlXSA/PyByb2xlfTwvb3B0aW9uPil9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJywgcGFkZGluZzogJzNweCA2cHgnIH19IHZhbHVlPXtzdGVwLm1vZGVsUHJvdmlkZXIgKyAnLycgKyBzdGVwLm1vZGVsSWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtwcm92aWRlciwgbW9kZWxdID0gZS50YXJnZXQudmFsdWUuc3BsaXQoJy8nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFBsYW5Db25maXJtKHsgLi4ucGxhbkNvbmZpcm0sIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcy5tYXAoKGl0ZW0sIGkpID0+IGkgPT09IGluZGV4ID8geyAuLi5pdGVtLCBtb2RlbFByb3ZpZGVyOiBwcm92aWRlciA/PyAnJywgbW9kZWxJZDogbW9kZWwgPz8gJycgfSA6IGl0ZW0pIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiL1wiPnt0KCdwbGFuLm1vZGVsRGVmYXVsdCcpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bW9kZWxPcHRpb25zLm1hcCgob3B0aW9uKSA9PiA8b3B0aW9uIGtleT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfSB2YWx1ZT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfT57b3B0aW9uLnByb3ZpZGVyfS97b3B0aW9uLmlkfTwvb3B0aW9uPil9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJywgcGFkZGluZzogJzNweCA2cHgnIH19IHZhbHVlPXtzdGVwLmZhaWx1cmVQb2xpY3l9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRQbGFuQ29uZmlybSh7IC4uLnBsYW5Db25maXJtLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMubWFwKChpdGVtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4uaXRlbSwgZmFpbHVyZVBvbGljeTogZS50YXJnZXQudmFsdWUgfSA6IGl0ZW0pIH0pIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoUE9MSUNZX0xBQkVMUykubWFwKChbdmFsdWUsIGxhYmVsXSkgPT4gPG9wdGlvbiBrZXk9e3ZhbHVlfSB2YWx1ZT17dmFsdWV9PntsYWJlbH08L29wdGlvbj4pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17c3RlcC5lbmFibGVkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0UGxhbkNvbmZpcm0oeyAuLi5wbGFuQ29uZmlybSwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzLm1hcCgoaXRlbSwgaSkgPT4gaSA9PT0gaW5kZXggPyB7IC4uLml0ZW0sIGVuYWJsZWQ6IGUudGFyZ2V0LmNoZWNrZWQgfSA6IGl0ZW0pIH0pIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBtYXJnaW5Ub3A6ICcxMHB4JyB9fT5cclxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e3BsYW5CdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbGF1bmNoUGxhbih0cnVlKSB9fT57cGxhbkJ1c3kgPyAnXHUyMDI2JyA6IHQoJ3BsYW4ubGF1bmNoRWRpdGVkJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtwbGFuQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxhdW5jaFBsYW4oZmFsc2UpIH19Pnt0KCdwbGFuLmxhdW5jaERpcmVjdCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17cGxhbkJ1c3l9IG9uQ2xpY2s9eygpID0+IHsgc2V0UGxhbkNvbmZpcm0obnVsbCkgfX0+e3QoJ3BsYW4uZGlzY2FyZCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9DYXJkPlxyXG4gICAgICApfVxyXG4gICAgICA8Q2FyZD5cclxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cclxuICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdleGVjLmF0dGVtcHRzJyl9PC9zcGFuPntTdHJpbmcoc3RhdGU/LmF0dGVtcHRzQ291bnQgPz8gMCl9PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHtydW5zLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3N0YXRlLm5vUnVucycpfTwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxyXG4gICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgPHRyPntbJ2V4ZWMuY29sLmNoYW5nZScsICdleGVjLmNvbC5zdGVwcycsICdleGVjLmNvbC5zdGF0dXMnLCAnZXhlYy5jb2wuc3RhcnRlZCcsICdleGVjLmNvbC5jb3N0JywgJ2V4ZWMuY29sLmRldGFpbCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XHJcbiAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICB7cnVucy5tYXAoKHJ1bikgPT4gKFxyXG4gICAgICAgICAgICAgICAgPHRyIGtleT17cnVuLmlkfT5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PnsoY2hhbmdlcy5maW5kKChjaGFuZ2UpID0+IGNoYW5nZS5pZCA9PT0gcnVuLmNoYW5nZUlkKT8udGl0bGUpID8/IHJ1bi5jaGFuZ2VJZH08L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3J1bi5zdGVwc1RvdGFsID8gKHJ1bi5zdGVwc0RvbmUgPz8gMCkgKyAnLycgKyBydW4uc3RlcHNUb3RhbCA6ICdcdTIwMTQnfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHJ1bi5zdGF0dXMgPT09ICdzdWNjZWVkZWQnIHx8IHJ1bi5zdGF0dXMgPT09ICdjb21wbGV0ZWQnID8gJyM0ZWM5YjAnIDogcnVuLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgPyAnI2YxNGM0YycgOiBydW4uc3RhdHVzID09PSAncGF1c2VkJyA/ICcjZDk3NzA2JyA6ICcjZGNkY2FhJyl9PntSVU5fU1RBVFVTX0xBQkVMU1tydW4uc3RhdHVzXSA/PyBydW4uc3RhdHVzfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICB7cnVuLmN1cnJlbnRTdGVwICE9PSBudWxsICYmIHJ1bi5jdXJyZW50U3RlcCAhPT0gdW5kZWZpbmVkICYmIHJ1bi5zdGF0dXMgPT09ICdydW5uaW5nJyAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXhXaWR0aDogMTYwLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+e3J1bi5jdXJyZW50U3RlcH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2Zvcm1hdFRpbWUocnVuLnN0YXJ0ZWRBdCl9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntydW4uY29zdFVzZCAhPT0gdW5kZWZpbmVkID8gJyQnICsgcnVuLmNvc3RVc2QudG9GaXhlZCg0KSA6ICdcdTIwMTQnfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJ1bkRldGFpbChydW4uaWQpIH19PntydW5EZXRhaWw/LnJ1bi5pZCA9PT0gcnVuLmlkID8gdCgncGxhbi5yZWZyZXNoRGV0YWlsJykgOiB0KCdwbGFuLnZpZXdEZXRhaWwnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9DYXJkPlxyXG4gICAgICB7cnVuRGV0YWlsICE9PSBudWxsICYmIChcclxuICAgICAgICA8Q2FyZCB0aXRsZT17dCgncGxhbi5kZXRhaWxUaXRsZScpICsgJyBcdTAwQjcgJyArIHJ1bkRldGFpbC5ydW4uY2hhbmdlVGl0bGV9PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnc3VjY2VlZGVkJyB8fCBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgPyAnIzRlYzliMCcgOiBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgPyAnI2YxNGM0YycgOiBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ3BhdXNlZCcgPyAnI2Q5NzcwNicgOiAnI2RjZGNhYScpfT57UlVOX1NUQVRVU19MQUJFTFNbcnVuRGV0YWlsLnJ1bi5zdGF0dXNdID8/IHJ1bkRldGFpbC5ydW4uc3RhdHVzfTwvc3Bhbj5cclxuICAgICAgICAgICAge3J1bkRldGFpbC5ydW4uZXJyb3IgIT09IG51bGwgJiYgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDEyNDJmJykgfX0+e3J1bkRldGFpbC5ydW4uZXJyb3IubWVzc2FnZX08L3NwYW4+fVxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XHJcbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkUnVuRGV0YWlsKHJ1bkRldGFpbC5ydW4uaWQpIH19Pnt0KCdwbGFuLnJlZnJlc2hEZXRhaWwnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRSdW5EZXRhaWwobnVsbCkgfX0+e3QoJ3BsYW4uY2xvc2VEZXRhaWwnKX08L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAge3J1bkRldGFpbC5ydW4uc3RhdHVzID09PSAncGF1c2VkJyAmJiBydW5EZXRhaWwucnVuLnBhdXNlUG9pbnQgIT09IG51bGwgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc4cHggMTJweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGJhY2tncm91bmQ6ICdyZ2JhKDIxNywxMTksNiwwLjA4KScsIGJvcmRlcjogJzFweCBzb2xpZCByZ2JhKDIxNywxMTksNiwwLjM1KScsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTJweCcgfX0+XHUyM0Y4IHt0KCdwbGFuLnBhdXNlZEJhbm5lcicpfTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3J1bkRldGFpbC5ydW4ucGF1c2VQb2ludC5yZWFzb259PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIG1hcmdpblRvcDogJzZweCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHJlc3VtZVJ1bihydW5EZXRhaWwucnVuLmlkLCAnY29udGludWUnKSB9fT57dCgncGxhbi5yZXN1bWVSZXRyeScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCByZXN1bWVSdW4ocnVuRGV0YWlsLnJ1bi5pZCwgJ3NraXAtY3VycmVudCcpIH19Pnt0KCdwbGFuLnJlc3VtZVNraXAnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAgeyhydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgfHwgcnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdpbnRlcnJ1cHRlZCcpICYmIChcclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxyXG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJ1dHRvbiwgcGFkZGluZzogJzNweCAxMHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcmVzdW1lUnVuKHJ1bkRldGFpbC5ydW4uaWQsICdjb250aW51ZScpIH19Pnt0KCdwbGFuLnJlc3VtZUZhaWxlZCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxyXG4gICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgPHRyPntbJ3BsYW4uY29sLnN0ZXAnLCAncGxhbi5jb2wucm9sZScsICdwbGFuLmNvbC5tb2RlbCcsICdleGVjLmNvbC5zdGF0dXMnLCAncGxhbi5jb2wuYXR0ZW1wdHMnLCAnZXhlYy5jb2wuY29zdCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XHJcbiAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICB7cnVuRGV0YWlsLnN0ZXBzLm1hcCgoc3RlcCwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3N0ZXAuaWR9PlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj57aW5kZXggKyAxfS4ge3N0ZXAudGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge3N0ZXAuY2xhaW1lZE91dGNvbWUgIT09IG51bGwgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWF4V2lkdGg6IDMyMCwgd2hpdGVTcGFjZTogJ25vcm1hbCcgfX0+e3N0ZXAuY2xhaW1lZE91dGNvbWUuc2xpY2UoMCwgMTYwKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSg4NiwxNTYsMjE0LDAuMjUpJyl9PntST0xFX0xBQkVMU1tzdGVwLnJvbGVdID8/IHN0ZXAucm9sZX08L3NwYW4+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udFNpemU6ICcxMXB4JyB9fT57c3RlcC5tb2RlbCA/PyAnXHUyMDE0J308L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShzdGVwLnZlcmlmaWVkID8gJyM0ZWM5YjAnIDogc3RlcC5zdGF0dXMgPT09ICdmYWlsZWQnID8gJyNmMTRjNGMnIDogc3RlcC5zdGF0dXMgPT09ICdza2lwcGVkJyA/ICcjOGI5NDllJyA6ICcjZGNkY2FhJyl9PntTVEVQX1NUQVRVU19MQUJFTFNbc3RlcC5zdGF0dXNdID8/IHN0ZXAuc3RhdHVzfTwvc3Bhbj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e1N0cmluZyhzdGVwLmF0dGVtcHRzQ291bnQpfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57c3RlcC5jb3N0VXNkID4gMCA/ICckJyArIHN0ZXAuY29zdFVzZC50b0ZpeGVkKDQpIDogJ1x1MjAxNCd9PC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQgIT09IG51bGwgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnLCBib3JkZXI6ICcxcHggZGFzaGVkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzhweCAxMnB4JyB9fT5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnNHB4JyB9fT57dCgncGxhbi5jb250ZXh0VGl0bGUnKX08L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxyXG4gICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LnByb2plY3REaWdlc3R9XHJcbiAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuYnJhbmNoICE9PSBudWxsID8gYCBcdTAwQjcgJHt0KCdwbGFuLmJyYW5jaCcpfSAke3J1bkRldGFpbC5jb250ZXh0LmJyYW5jaH1gIDogJyd9XHJcbiAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuaGVhZFNoYSAhPT0gbnVsbCA/IGAgXHUwMEI3IEhFQUQgJHtydW5EZXRhaWwuY29udGV4dC5oZWFkU2hhLnNsaWNlKDAsIDgpfWAgOiAnJ31cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuaW5qZWN0ZWRNZW1vcmllcy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwIH19Pnt0KCdwbGFuLmluamVjdGVkTWVtb3JpZXMnKX1cdUZGMUE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5pbmplY3RlZE1lbW9yaWVzLm1hcCgobWVtb3J5KSA9PiA8c3BhbiBrZXk9e21lbW9yeS5pZH0gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSg3OCwyMDEsMTc2LDAuMiknKX0+e21lbW9yeS50aXRsZX08L3NwYW4+KX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmRlY2lzaW9uTG9nLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBjb2xvcjogJ2luaGVyaXQnIH19Pnt0KCdwbGFuLmRlY2lzaW9uTG9nJyl9XHVGRjFBPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuZGVjaXNpb25Mb2cuc2xpY2UoLTYpLm1hcCgoZW50cnksIGVudHJ5SW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZW50cnlJbmRleH0+XHUwMEI3IFt7ZW50cnkua2luZH1dIHtlbnRyeS5kZXRhaWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvQ2FyZD5cclxuICAgICAgKX1cclxuICAgICAgPENhcmRcclxuICAgICAgICB0aXRsZT17XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgdXNlclNlbGVjdDogJ25vbmUnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0U2NoZWRPcGVuKCFzY2hlZE9wZW4pIH19PlxyXG4gICAgICAgICAgICB7c2NoZWRPcGVuID8gJ1x1MjVCRSAnIDogJ1x1MjVCOCAnfXt0KCdzY2hlZC50aXRsZScpfVxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMubGFiZWwsIG1hcmdpbkxlZnQ6ICc4cHgnIH19Pnsoc2NoZWR1bGVkRGF0YSA/PyBbXSkubGVuZ3RoID4gMCA/IFN0cmluZygoc2NoZWR1bGVkRGF0YSA/PyBbXSkubGVuZ3RoKSArICcgXHU0RTJBJyA6ICcnfTwvc3Bhbj5cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICB9XHJcbiAgICAgID5cclxuICAgICAgICB7c2NoZWRPcGVuICYmIChcclxuICAgICAgICA8PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtSW5saW5lfT5cclxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIGZsZXg6IDEsIG1pbldpZHRoOiAxNjAgfX0gcGxhY2Vob2xkZXI9e3QoJ3NjaGVkLmZvcm1OYW1lJyl9IHZhbHVlPXtzY2hlZE5hbWV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZE5hbWUoZS50YXJnZXQudmFsdWUpIH19IC8+XHJcbiAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycgfX0gdmFsdWU9e3NjaGVkVHlwZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkVHlwZShlLnRhcmdldC52YWx1ZSkgfX0+XHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZXZpZXdcIj57dCgnc2NoZWQudHlwZVJldmlldycpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic3VtbWFyeVwiPnt0KCdzY2hlZC50eXBlU3VtbWFyeScpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicnVuXCI+e3QoJ3NjaGVkLnR5cGVSdW4nKX08L29wdGlvbj5cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInN5bmNcIj57dCgnc2NoZWQudHlwZVN5bmMnKX08L29wdGlvbj5cclxuICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgd2lkdGg6IDEyMCB9fSBwbGFjZWhvbGRlcj17dCgnc2NoZWQuZm9ybUludGVydmFsJyl9IHZhbHVlPXtzY2hlZEludGVydmFsfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWRJbnRlcnZhbChlLnRhcmdldC52YWx1ZSkgfX0gLz5cclxuICAgICAgICAgIHtzY2hlZFR5cGUgPT09ICdydW4nICYmIChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybVRpdGxlJyl9IHZhbHVlPXtzY2hlZFRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWRUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cclxuICAgICAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcm93cz17Mn0gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybURlc2MnKX0gdmFsdWU9e3NjaGVkRGVzY30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkRGVzYyhlLnRhcmdldC52YWx1ZSkgfX0gLz5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e3NjaGVkTmFtZS50cmltKCkgPT09ICcnfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYWRkU2NoZWR1bGVkKCkgfX0+e3QoJ3NjaGVkLmFkZCcpfTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+e3QoJ3NjaGVkLmhpbnQnKX08L2Rpdj5cclxuICAgICAgICB7KHNjaGVkdWxlZERhdGEgPz8gW10pLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3NjaGVkLmVtcHR5Jyl9PC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XHJcbiAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICA8dHI+e1snc2NoZWQuY29sLm5hbWUnLCAnc2NoZWQuY29sLnR5cGUnLCAnc2NoZWQuY29sLmludGVydmFsJywgJ3NjaGVkLmNvbC5uZXh0JywgJ3NjaGVkLmNvbC5sYXN0UmVzdWx0JywgJ3NjaGVkLmNvbC5hY3Rpb25zJ10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHsoc2NoZWR1bGVkRGF0YSA/PyBbXSkubWFwKCh0YXNrKSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8dHIga2V5PXt0YXNrLmlkfSBzdHlsZT17eyBvcGFjaXR5OiB0YXNrLmVuYWJsZWQgPyAxIDogMC40NSB9fT5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pnt0YXNrLm5hbWV9e3Rhc2sudGl0bGUgIT09ICcnID8gPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHVGRjA4e3Rhc2sudGl0bGV9XHVGRjA5PC9zcGFuPiA6IG51bGx9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UodGFzay50eXBlID09PSAncmV2aWV3JyA/ICcjNTY5Y2Q2JyA6IHRhc2sudHlwZSA9PT0gJ3N1bW1hcnknID8gJyM0ZWM5YjAnIDogJyNkN2JhN2QnKX0+e3Rhc2sudHlwZSA9PT0gJ3JldmlldycgPyB0KCdzY2hlZC50eXBlUmV2aWV3JykgOiB0YXNrLnR5cGUgPT09ICdzdW1tYXJ5JyA/IHQoJ3NjaGVkLnR5cGVTdW1tYXJ5JykgOiB0KCdzY2hlZC50eXBlUnVuJyl9PC9zcGFuPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57dGFzay5pbnRlcnZhbE1pbnV0ZXMgPj0gMTQ0MCA/IE1hdGgucm91bmQodGFzay5pbnRlcnZhbE1pbnV0ZXMgLyAxNDQwICogMTApIC8gMTAgKyB0KCdzY2hlZC5kYXknKSA6IHRhc2suaW50ZXJ2YWxNaW51dGVzID49IDYwID8gTWF0aC5yb3VuZCh0YXNrLmludGVydmFsTWludXRlcyAvIDYwICogMTApIC8gMTAgKyB0KCdzY2hlZC5ob3VyJykgOiB0YXNrLmludGVydmFsTWludXRlcyArIHQoJ3NjaGVkLm1pbnV0ZScpfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57dGFzay5lbmFibGVkID8gZm9ybWF0VGltZSh0YXNrLm5leHREdWVBdCkgOiAnXHUyMDE0J308L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWF4V2lkdGg6IDIyMCwgd2hpdGVTcGFjZTogJ25vcm1hbCcgfX0+e3Rhc2subGFzdFJlc3VsdCB8fCAodGFzay5sYXN0UnVuQXQgIT09IG51bGwgPyBmb3JtYXRUaW1lKHRhc2subGFzdFJ1bkF0KSA6ICdcdTIwMTQnKX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc2NoZWR1bGVkQWN0aW9uKCd1cGRhdGUnLCB7IGlkOiB0YXNrLmlkLCBlbmFibGVkOiAhdGFzay5lbmFibGVkIH0pIH19Pnt0YXNrLmVuYWJsZWQgPyB0KCdzY2hlZC5kaXNhYmxlJykgOiB0KCdzY2hlZC5lbmFibGUnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzY2hlZHVsZWRBY3Rpb24oJ3J1bicsIHsgaWQ6IHRhc2suaWQgfSkgfX0+e3QoJ3NjaGVkLnJ1bk5vdycpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6ICdcdTUyMjBcdTk2NjRcdThGRDlcdTRFMkFcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdUZGMUYnLCBtZXNzYWdlOiAnXHUzMDBDJyArIHRhc2submFtZSArICdcdTMwMERcdTVDMDZcdTg4QUJcdTZDMzhcdTRFNDVcdTUyMjBcdTk2NjRcdTMwMDInLCBkYW5nZXI6IHRydWUsIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHNjaGVkdWxlZEFjdGlvbignZGVsZXRlJywgeyBpZDogdGFzay5pZCB9KSB9IH0pIH19Plx1MjcxNTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgIDwvPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQ2FyZD5cclxuICAgIDwvPlxyXG4gIClcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFx1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNlx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBub3Rlc1RhYiA9IChcclxuICAgIDw+XHJcbiAgICAgIHsvKiBcdTI1MDBcdTI1MDAgXHU3QjE0XHU4QkIwXHVGRjFBXHU1MzYxXHU3MjQ3XHU1RjBGXHU5NjA1XHU4QkZCICsgXHU1OTFBXHU4ODRDXHU3RjE2XHU4RjkxICsgXHU2NDFDXHU3RDIyICsgQUkgXHU2MDNCXHU3RUQzIFx1MjUwMFx1MjUwMCAqL31cclxuICAgICAgPENhcmQgdGl0bGU9e3QoJ25vdGVzLnRpdGxlJyl9PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCB3aWR0aDogMjIwIH19XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0KCdub3Rlcy5zZWFyY2gnKX1cclxuICAgICAgICAgICAgdmFsdWU9e25vdGVTZWFyY2h9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXROb3RlU2VhcmNoKGUudGFyZ2V0LnZhbHVlKSB9fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cclxuICAgICAgICAgIHsoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsYXN0U3VtbWFyeSA9IG5vdGVzLmZpbHRlcigobm90ZSkgPT4gbm90ZS5zaGEgPT09ICdzdW1tYXJ5Jykuc29ydCgoYSwgYikgPT4gYi5jcmVhdGVkQXQgLSBhLmNyZWF0ZWRBdClbMF1cclxuICAgICAgICAgICAgY29uc3QgbmV3Q29tbWl0cyA9IGxhc3RTdW1tYXJ5ID09PSB1bmRlZmluZWQgPyAtMVxyXG4gICAgICAgICAgICAgIDogKGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKS5maWx0ZXIoKGNvbW1pdCkgPT4gY29tbWl0LmRhdGUgPiBsYXN0U3VtbWFyeS5jcmVhdGVkQXQpLmxlbmd0aFxyXG4gICAgICAgICAgICBpZiAobmV3Q29tbWl0cyA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ25vdGVzLmRpZ2VzdE5ldmVyJyl9PC9zcGFuPlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuZXdDb21taXRzID09PSAwKSByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Pnt0KCdub3Rlcy5kaWdlc3RQZW5kaW5nJykucmVwbGFjZSgne259JywgU3RyaW5nKG5ld0NvbW1pdHMpKX08L3NwYW4+XHJcbiAgICAgICAgICB9KSgpfVxyXG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e2FpU3VtbWFyaXppbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhaVN1bW1hcml6ZSgpIH19PlxyXG4gICAgICAgICAgICB7YWlTdW1tYXJpemluZyA/IHQoJ25vdGVzLmFpU3VtbWFyeVJ1bicpIDogJ1x1MjcyOCAnICsgdCgnbm90ZXMuYWlTdW1tYXJ5Jyl9XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5mb3JtUm93LCBib3JkZXI6ICcxcHggZGFzaGVkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzEwcHgnIH19PlxyXG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdub3Rlcy5mb3JtVGl0bGUnKX0gdmFsdWU9e25vdGVUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cclxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQgfX0gcGxhY2Vob2xkZXI9e3QoJ25vdGVzLnRhZ3NIaW50Jyl9IHZhbHVlPXtub3RlVGFnc30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVUYWdzKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAgPHRleHRhcmVhXHJcbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9XHJcbiAgICAgICAgICAgIHJvd3M9ezZ9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0KCdub3Rlcy5jb250ZW50SGludCcpfVxyXG4gICAgICAgICAgICB2YWx1ZT17bm90ZUNvbnRlbnR9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXROb3RlQ29udGVudChlLnRhcmdldC52YWx1ZSkgfX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxyXG4gICAgICAgICAgICAgIHt0KCdub3Rlcy5ib3VuZFRvJyl9OiB7c2VsZWN0ZWRUYXJnZXRzWzBdID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IHNlbGVjdGVkVGFyZ2V0c1swXS5zbGljZSgwLCA4KX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e25vdGVUaXRsZS50cmltKCkgPT09ICcnIHx8IG5vdGVDb250ZW50LnRyaW0oKSA9PT0gJyd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhZGROb3RlKCkgfX0+e3QoJ25vdGVzLmFkZCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgeygoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBrZXl3b3JkID0gbm90ZVNlYXJjaC50cmltKCkudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgY29uc3QgbWF0Y2hlZCA9IGtleXdvcmQgPT09ICcnXHJcbiAgICAgICAgICAgID8gbm90ZXNcclxuICAgICAgICAgICAgOiBub3Rlcy5maWx0ZXIoKG5vdGUpID0+IChub3RlLnRpdGxlICsgJyAnICsgbm90ZS5jb250ZW50ICsgJyAnICsgKG5vdGUudGFncyA/PyBbXSkuam9pbignICcpKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGtleXdvcmQpKVxyXG4gICAgICAgICAgLy8gXHU3RjZFXHU5ODc2XHU0RjE4XHU1MTQ4XHVGRjBDXHU1MTc2XHU0RjU5XHU2MzA5XHU1MjFCXHU1RUZBXHU2NUY2XHU5NUY0XHU1MDEyXHU1RThGXHUzMDAyXHJcbiAgICAgICAgICBjb25zdCB2aXNpYmxlID0gWy4uLm1hdGNoZWRdLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PlxyXG4gICAgICAgICAgICBOdW1iZXIocmlnaHQucGlubmVkID09PSB0cnVlKSAtIE51bWJlcihsZWZ0LnBpbm5lZCA9PT0gdHJ1ZSkgfHwgcmlnaHQuY3JlYXRlZEF0IC0gbGVmdC5jcmVhdGVkQXQpXHJcbiAgICAgICAgICBpZiAodmlzaWJsZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e25vdGVzLmxlbmd0aCA9PT0gMCA/IHQoJ25vdGVzLmVtcHR5JykgOiB0KCdub3Rlcy5lbXB0eVNlYXJjaCcpfTwvZGl2PlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHZpc2libGUubWFwKChub3RlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzU3VtbWFyeSA9IG5vdGUuc2hhID09PSAnc3VtbWFyeSdcclxuICAgICAgICAgICAgY29uc3QgZWRpdGluZyA9IGVkaXRpbmdOb3RlICE9PSBudWxsICYmIGVkaXRpbmdOb3RlLmlkID09PSBub3RlLmlkID8gZWRpdGluZ05vdGUgOiBudWxsXHJcbiAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkID0gbm90ZUV4cGFuZGVkW25vdGUuaWRdID09PSB0cnVlXHJcbiAgICAgICAgICAgIGNvbnN0IGxvbmcgPSBub3RlLmNvbnRlbnQubGVuZ3RoID4gMjYwIHx8IG5vdGUuY29udGVudC5zcGxpdCgnXFxuJykubGVuZ3RoID4gNlxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17bm90ZS5pZH1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcy5ub3RlQ2FyZCxcclxuICAgICAgICAgICAgICAgICAgLi4uKGlzU3VtbWFyeSA/IHsgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDQpJywgYm9yZGVyQ29sb3I6ICdyZ2JhKDM3LDk5LDIzNSwwLjMpJyB9IDoge30pLFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7ZWRpdGluZyAhPT0gbnVsbCA/IChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSB2YWx1ZT17ZWRpdGluZy50aXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgLi4uZWRpdGluZywgdGl0bGU6IGUudGFyZ2V0LnZhbHVlIH0pIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdub3Rlcy50YWdzSGludCcpfSB2YWx1ZT17ZWRpdGluZy50YWdzfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RWRpdGluZ05vdGUoeyAuLi5lZGl0aW5nLCB0YWdzOiBlLnRhcmdldC52YWx1ZSB9KSB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSByb3dzPXsxMH0gdmFsdWU9e2VkaXRpbmcuY29udGVudH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgLi4uZWRpdGluZywgY29udGVudDogZS50YXJnZXQudmFsdWUgfSkgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJ1dHRvbiwgcGFkZGluZzogJzRweCAxMnB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc2F2ZU5vdGVFZGl0KCkgfX0+e3QoJ25vdGVzLnNhdmUnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzRweCAxMnB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldEVkaXRpbmdOb3RlKG51bGwpIH19Pnt0KCdub3Rlcy5jYW5jZWwnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVRleHR9Pntpc1N1bW1hcnkgPyAnXHVEODNEXHVEQ0Q2ICcgOiAnJ317bm90ZS5waW5uZWQgPT09IHRydWUgPyAnXHVEODNEXHVEQ0NDICcgOiAnJ317bm90ZS50aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogbm90ZS5waW5uZWQgPT09IHRydWUgPyAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyA6IHVuZGVmaW5lZCB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/IHQoJ25vdGVzLnVucGluJykgOiB0KCdub3Rlcy5waW4nKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgdG9nZ2xlTm90ZVBpbihub3RlKSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHVEODNEXHVEQ0NDPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IHRpdGxlPXt0KCdub3Rlcy5jb3B5TWRIaW50Jyl9IG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZCA9IGAjICR7bm90ZS50aXRsZX1cXG5cXG4ke25vdGUuY29udGVudH1cXG5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCBuYXZpZ2F0b3IuY2xpcGJvYXJkPy53cml0ZVRleHQobWQpLnRoZW4oKCkgPT4gc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgJyArIHQoJ25vdGVzLmNvcHlNZERvbmUnKSkpLmNhdGNoKCgpID0+IHNldEFjdGlvblJlc3VsdCgnXHUyNzE3IFx1NTkwRFx1NTIzNlx1NTkzMVx1OEQyNScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cdUQ4M0RcdURDQ0Ige3QoJ25vdGVzLmNvcHlNZCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSB0aXRsZT17dCgnbm90ZXMuZXhwb3J0TWRIaW50Jyl9IG9uQ2xpY2s9eygpID0+IHsgZXhwb3J0Tm90ZShub3RlKSB9fT5cdUQ4M0RcdURDQkUge3QoJ25vdGVzLmV4cG9ydE1kJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IHRpdGxlPXt0KCdub3Rlcy50b01lbW9yeUhpbnQnKX0gb25DbGljaz17KCkgPT4geyBzZXRNZW1vcnlUaXRsZShub3RlLnRpdGxlKTsgc2V0TWVtb3J5Q29udGVudChub3RlLmNvbnRlbnQpOyBzZXRBY3Rpb25SZXN1bHQodCgnbm90ZXMudG9NZW1vcnlEb25lJykpIH19Plx1RDgzRVx1RERFMCB7dCgnbm90ZXMudG9NZW1vcnknKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRFZGl0aW5nTm90ZSh7IGlkOiBub3RlLmlkLCB0aXRsZTogbm90ZS50aXRsZSwgY29udGVudDogbm90ZS5jb250ZW50LCB0YWdzOiAobm90ZS50YWdzID8/IFtdKS5qb2luKCcsICcpIH0pIH19Pnt0KCdub3Rlcy5lZGl0Jyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyh7IHRpdGxlOiAnXHU1MjIwXHU5NjY0XHU4RkQ5XHU2NzYxXHU3QjE0XHU4QkIwXHVGRjFGJywgbWVzc2FnZTogJ1x1MzAwQycgKyBub3RlLnRpdGxlICsgJ1x1MzAwRFx1NUMwNlx1ODhBQlx1NkMzOFx1NEU0NVx1NTIyMFx1OTY2NFx1RkYwQ1x1NEUwRFx1NTNFRlx1NjA2Mlx1NTkwRFx1MzAwMicsIGRhbmdlcjogdHJ1ZSwgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgcmVtb3ZlTm90ZShub3RlLmlkKSB9IH0pIH19Plx1MjcxNTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge2lzU3VtbWFyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgPyA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ29udGVudCwgLi4uKGxvbmcgJiYgIWV4cGFuZGVkID8gc3R5bGVzLm5vdGVDbGFtcCA6IHt9KSB9fT57cmVuZGVyU3RydWN0dXJlZENvbnRlbnQobm90ZS5jb250ZW50KX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDogPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNvbnRlbnQsIC4uLihsb25nICYmICFleHBhbmRlZCA/IHN0eWxlcy5ub3RlQ2xhbXAgOiB7fSkgfX0+e25vdGUuY29udGVudH08L2Rpdj59XHJcbiAgICAgICAgICAgICAgICAgICAge2xvbmcgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmxpbmtCdG59IG9uQ2xpY2s9eygpID0+IHsgc2V0Tm90ZUV4cGFuZGVkKHsgLi4ubm90ZUV4cGFuZGVkLCBbbm90ZS5pZF06ICFleHBhbmRlZCB9KSB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2V4cGFuZGVkID8gdCgnbm90ZXMuY29sbGFwc2UnKSA6IHQoJ25vdGVzLmV4cGFuZCcpfVx1RkYwOHtub3RlLmNvbnRlbnQubGVuZ3RofSBcdTVCNTdcdUZGMDlcclxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgeyhub3RlLnRhZ3MgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpblRvcDogJzZweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsobm90ZS50YWdzID8/IFtdKS5tYXAoKHRhZykgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGFnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKCcjMjU2M2ViJyksIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXI6ICdub25lJywgcGFkZGluZzogJzFweCA4cHgnLCBib3JkZXJSYWRpdXM6ICc5OTlweCcsIGZvbnRTaXplOiAnMTBweCcgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0Tm90ZVNlYXJjaCh0YWcpIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPiN7dGFnfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVNZXRhfT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntuZXcgRGF0ZShub3RlLmNyZWF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7bm90ZS51cGRhdGVkQXQgIT09IHVuZGVmaW5lZCAmJiBub3RlLnVwZGF0ZWRBdCA+IG5vdGUuY3JlYXRlZEF0ICsgMTAwMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlx1RkYwOHt0KCdub3Rlcy5lZGl0ZWRBdCcpfSB7bmV3IERhdGUobm90ZS51cGRhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCl9XHVGRjA5PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgIHtpc1N1bW1hcnkgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzI1NjNlYicpfT57dCgnbm90ZXMuc3VtbWFyeVRhZycpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICB7bm90ZS5zaGEgIT09IHVuZGVmaW5lZCAmJiBub3RlLnNoYSAhPT0gJ3N1bW1hcnknICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57bm90ZS5zaGEgPT09ICd3b3JraW5nJyA/IHQoJ3JlcG8ud29ya2luZycpIDogbm90ZS5zaGEuc2xpY2UoMCwgOCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pKCl9XHJcbiAgICAgIDwvQ2FyZD5cclxuICAgICAgPENhcmQgdGl0bGU9e3QoJ21lbW9yeS56b25lVGl0bGUnKSArIChwcm9qZWN0ICE9PSBudWxsID8gJyBcdTAwQjcgJyArIHByb2plY3QubmFtZSA6ICcnKX0+XHJcbiAgICAgICAgey8qIFx1NTQwQ1x1NkI2NVx1NzJCNlx1NjAwMVx1Njc2MVx1RkYxQVx1NTdGQVx1N0VCRiArIFx1ODQzRFx1NTQwRVx1NjNEMFx1NEVBNFx1NjU3MCArIFx1NTQwQ1x1NkI2NVx1NjMwOVx1OTRBRSArIFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QSAqL31cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzhweCcsIHBhZGRpbmc6ICc2cHggMTBweCcsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JyB9fT5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcgfX0+XHVEODNEXHVERDA0IHt0KCdtZW1vcnkuc3luY0Jhc2VsaW5lJyl9XHVGRjFBPGI+e21lbW9yaWVzRGF0YT8uYmFzZWxpbmU/LnNoYSAhPSBudWxsID8gbWVtb3JpZXNEYXRhLmJhc2VsaW5lLnNoYS5zbGljZSgwLCA4KSA6IHQoJ21lbW9yeS5zeW5jTm9uZScpfTwvYj48L3NwYW4+XHJcbiAgICAgICAgICB7bWVtb3JpZXNEYXRhPy5icmFuY2ggIT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNTY5Y2Q2Jyl9PnttZW1vcmllc0RhdGEuYnJhbmNofTwvc3Bhbj59XHJcbiAgICAgICAgICB7KG1lbW9yaWVzRGF0YT8uYmVoaW5kQ291bnQgPz8gMCkgPiAwICYmIChcclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JykgfX0+e3QoJ21lbW9yeS5iZWhpbmQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcobWVtb3JpZXNEYXRhPy5iZWhpbmRDb3VudCA/PyAwKSl9PC9zcGFuPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cclxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzNweCAxMHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17bWVtb3J5U3luY2luZ30gb25DbGljaz17KCkgPT4geyB2b2lkIHN5bmNNZW1vcmllcygpIH19PlxyXG4gICAgICAgICAgICB7bWVtb3J5U3luY2luZyA/IHQoJ21lbW9yeS5zeW5jaW5nJykgOiAnXHVEODNEXHVERDA0ICcgKyB0KCdtZW1vcnkuc3luYycpfVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAge3N5bmNSZXBvcnQgIT09IG51bGwgJiYgKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JywgcGFkZGluZzogJzhweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYmFja2dyb3VuZDogc3luY1JlcG9ydC5vayA9PT0gZmFsc2UgPyAncmdiYSgyMDksMzYsNDcsMC4wNiknIDogJ3JnYmEoNzgsMjAxLDE3NiwwLjA2KScsIGJvcmRlcjogJzFweCBzb2xpZCAnICsgKHN5bmNSZXBvcnQub2sgPT09IGZhbHNlID8gJ3JnYmEoMjA5LDM2LDQ3LDAuMyknIDogJ3JnYmEoNzgsMjAxLDE3NiwwLjMpJykgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwIH19PntzeW5jUmVwb3J0Lm9rID09PSBmYWxzZSA/ICdcdTI3MTcgJyArIHQoJ21lbW9yeS5zeW5jRmFpbGVkJykgOiAnXHUyNzEzICcgKyAoc3luY1JlcG9ydC52ZXJkaWN0ID8/ICcnKX08L2Rpdj5cclxuICAgICAgICAgICAge3N5bmNSZXBvcnQub2sgIT09IGZhbHNlICYmIChzeW5jUmVwb3J0LnN0YWxlUHJvcG9zYWxzID8/IFtdKS5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fT57dCgnbWVtb3J5LnN0YWxlVGl0bGUnKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIHsoc3luY1JlcG9ydC5zdGFsZVByb3Bvc2FscyA/PyBbXSkubWFwKChwcm9wb3NhbCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17cHJvcG9zYWwuaWR9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpblRvcDogJzRweCcsIGZvbnRTaXplOiAnMTFweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fT57cHJvcG9zYWwudGl0bGV9IFx1MjAxNFx1MjAxNCB7cHJvcG9zYWwucmVhc29ufTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcxcHggOHB4JywgZm9udFNpemU6ICcxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYXBwbHlTeW5jKFtwcm9wb3NhbC5pZF0sICdtYXJrLXN0YWxlJykgfX0+e3QoJ21lbW9yeS5tYXJrU3RhbGUnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcxcHggOHB4JywgZm9udFNpemU6ICcxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYXBwbHlTeW5jKFtwcm9wb3NhbC5pZF0sICdhcmNoaXZlJykgfX0+e3QoJ21lbW9yeS5hcmNoaXZlQnRuJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMXB4IDhweCcsIGZvbnRTaXplOiAnMTBweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRTeW5jUmVwb3J0KChwcmV2aW91cykgPT4gcHJldmlvdXMgPT09IG51bGwgPyBudWxsIDogeyAuLi5wcmV2aW91cywgc3RhbGVQcm9wb3NhbHM6IChwcmV2aW91cy5zdGFsZVByb3Bvc2FscyA/PyBbXSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmlkICE9PSBwcm9wb3NhbC5pZCkgfSkgfX0+e3QoJ21lbW9yeS5rZWVwQWN0aXZlJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHtzeW5jUmVwb3J0Lm9rICE9PSBmYWxzZSAmJiAoc3luY1JlcG9ydC5uZXdDYW5kaWRhdGVzID8/IFtdKS5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcsIGZvbnRTaXplOiAnMTFweCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+e3QoJ21lbW9yeS5uZXdDYW5kaWRhdGVzJyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgeyhzeW5jUmVwb3J0Lm5ld0NhbmRpZGF0ZXMgPz8gW10pLm1hcCgoY2FuZGlkYXRlLCBpbmRleCkgPT4gPGRpdiBrZXk9e2luZGV4fT5cdUZGMEIgW3tjYW5kaWRhdGUudHlwZX1dIHtjYW5kaWRhdGUudGl0bGV9PC9kaXY+KX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMubGlua0J0biwgbWFyZ2luVG9wOiAnNHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFN5bmNSZXBvcnQobnVsbCkgfX0+e3QoJ21lbW9yeS5jbG9zZVJlcG9ydCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgICB7LyogXHU2MjRCXHU1MkE4XHU2REZCXHU1MkEwXHVGRjFBXHU2ODA3XHU5ODk4IC8gXHU3QzdCXHU1NzhCIC8gXHU0RjVDXHU3NTI4XHU1N0RGIC8gXHU1MTg1XHU1QkI5ICovfVxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cclxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnZm9ybS5tZW1vcnlUaXRsZScpfSB2YWx1ZT17bWVtb3J5VGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRNZW1vcnlUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cclxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17bWVtb3J5VHlwZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeVR5cGUoZS50YXJnZXQudmFsdWUpIH19PlxyXG4gICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoTUVNT1JZX1RZUEVfTEFCRUxTKS5tYXAoKFt2YWx1ZSwgbGFiZWxdKSA9PiA8b3B0aW9uIGtleT17dmFsdWV9IHZhbHVlPXt2YWx1ZX0+e2xhYmVsfTwvb3B0aW9uPil9XHJcbiAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17bWVtb3J5U2NvcGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRNZW1vcnlTY29wZShlLnRhcmdldC52YWx1ZSBhcyAncHJvamVjdCcgfCAnYnJhbmNoJykgfX0+XHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwcm9qZWN0XCI+e3QoJ21lbW9yeS5zY29wZVByb2plY3QnKX08L29wdGlvbj5cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJyYW5jaFwiPnt0KCdtZW1vcnkuc2NvcGVCcmFuY2gnKX08L29wdGlvbj5cclxuICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezN9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLm1lbW9yeUNvbnRlbnQnKX0gdmFsdWU9e21lbW9yeUNvbnRlbnR9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRNZW1vcnlDb250ZW50KGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgbWVtb3J5VGl0bGUudHJpbSgpID09PSAnJyB8fCBtZW1vcnlDb250ZW50LnRyaW0oKSA9PT0gJyd9XHJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbigncmVjb3JkTWVtb3J5JywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeScsIHsgbWVtb3J5VHlwZSwgc2NvcGU6IG1lbW9yeVNjb3BlLCB0aXRsZTogbWVtb3J5VGl0bGUudHJpbSgpLCBjb250ZW50OiBtZW1vcnlDb250ZW50LnRyaW0oKSB9KS50aGVuKGFzeW5jICgpID0+IHsgc2V0TWVtb3J5VGl0bGUoJycpOyBzZXRNZW1vcnlDb250ZW50KCcnKTsgYXdhaXQgbG9hZE1lbW9yaWVzKCkgfSkgfX0+XHJcbiAgICAgICAgICAgICAge2J1c3kgPT09ICdyZWNvcmRNZW1vcnknID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ21lbW9yeS5yZWNvcmQnKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7KCgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGFsbCA9IG1lbW9yaWVzRGF0YT8ubWVtb3JpZXMgPz8gW11cclxuICAgICAgICAgIGNvbnN0IHBlbmRpbmcgPSBhbGwuZmlsdGVyKChtZW1vcnkpID0+ICFtZW1vcnkuaXNIdW1hbkNvbmZpcm1lZCAmJiBtZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJylcclxuICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IGFsbC5maWx0ZXIoKG1lbW9yeSkgPT4gbWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZScpXHJcbiAgICAgICAgICBjb25zdCBncm91cGVkID0gbmV3IE1hcDxzdHJpbmcsIE1lbW9yeUVudHJ5W10+KClcclxuICAgICAgICAgIGZvciAoY29uc3QgbWVtb3J5IG9mIGFjdGl2ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gZ3JvdXBlZC5nZXQobWVtb3J5LnR5cGUpID8/IFtdXHJcbiAgICAgICAgICAgIGxpc3QucHVzaChtZW1vcnkpXHJcbiAgICAgICAgICAgIGdyb3VwZWQuc2V0KG1lbW9yeS50eXBlLCBsaXN0KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICB7cGVuZGluZy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Plx1MjNGMyB7dCgnbWVtb3J5LnBlbmRpbmdRdWV1ZScpfVx1RkYwOHtTdHJpbmcocGVuZGluZy5sZW5ndGgpfVx1RkYwOTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICB7cGVuZGluZy5tYXAoKG1lbW9yeSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXttZW1vcnkuaWR9IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ2FyZCwgYm9yZGVyQ29sb3I6ICdyZ2JhKDM3LDk5LDIzNSwwLjMpJywgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDMpJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e21lbW9yeS50aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGNvbmZpcm1NZW1vcnkobWVtb3J5LmlkKS50aGVuKCgpID0+IHsgdm9pZCBsb2FkTWVtb3JpZXMoKSB9KSB9fT57dCgnbWVtb3J5LmNvbmZpcm0nKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5QWN0aW9uKCdzdGF0dXMnLCB7IGlkOiBtZW1vcnkuaWQsIHN0YXR1czogJ2FyY2hpdmVkJyB9KSB9fT57dCgnbWVtb3J5LmFyY2hpdmVCdG4nKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlQ29udGVudH0+e21lbW9yeS5jb250ZW50fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVNZXRhfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSgzNyw5OSwyMzUsMC4xNSknKX0+e01FTU9SWV9TT1VSQ0VfTEFCRUxTW21lbW9yeS5zb3VyY2VUYWddID8/IG1lbW9yeS5zb3VyY2VUYWd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LmJhc2lzU2hhICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e21lbW9yeS5iYXNpc1NoYS5zbGljZSgwLCA4KX08L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICB7Wy4uLmdyb3VwZWQuZW50cmllcygpXS5tYXAoKFt0eXBlLCBpdGVtc10pID0+IChcclxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXt0eXBlfSBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnNlY3Rpb25UaXRsZX0+e01FTU9SWV9UWVBFX0xBQkVMU1t0eXBlXSA/PyB0eXBlfVx1RkYwOHtTdHJpbmcoaXRlbXMubGVuZ3RoKX1cdUZGMDk8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAge2l0ZW1zLm1hcCgobWVtb3J5KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e21lbW9yeS5pZH0gc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDYXJkLCBvcGFjaXR5OiBtZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJyA/IDEgOiAwLjYgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVRleHR9PnttZW1vcnkuaXNIdW1hbkNvbmZpcm1lZCA/ICdcdTI3MDUgJyA6ICcnfXttZW1vcnkudGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwLCBmbGV4V3JhcDogJ3dyYXAnLCBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IW1lbW9yeS5pc0h1bWFuQ29uZmlybWVkICYmIG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJ1dHRvbiwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBjb25maXJtTWVtb3J5KG1lbW9yeS5pZCkudGhlbigoKSA9PiB7IHZvaWQgbG9hZE1lbW9yaWVzKCkgfSkgfX0+e3QoJ21lbW9yeS5jb25maXJtJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeVRvTm90ZShtZW1vcnkpIH19Plx1RDgzRFx1RENDNCB7dCgnbWVtb3J5LnRvTm90ZScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc2NvcGUgPT09ICdicmFuY2gnICYmIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ25vcm1hbGl6ZScsIHsgaWQ6IG1lbW9yeS5pZCB9KSB9fT5cdTIxRjEge3QoJ21lbW9yeS5ub3JtYWxpemUnKX08L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ3N0YXR1cycsIHsgaWQ6IG1lbW9yeS5pZCwgc3RhdHVzOiAnYXJjaGl2ZWQnIH0pIH19Pnt0KCdtZW1vcnkuYXJjaGl2ZUJ0bicpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5QWN0aW9uKCdzdGF0dXMnLCB7IGlkOiBtZW1vcnkuaWQsIHN0YXR1czogJ2FjdGl2ZScgfSkgfX0+e3QoJ21lbW9yeS5yZXN0b3JlJyl9PC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNvbnRlbnQsIG1heEhlaWdodDogODQsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT57bWVtb3J5LmNvbnRlbnR9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnN0YXR1cyA9PT0gJ3N0YWxlJyAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjZDk3NzA2Jyl9Pnt0KCdtZW1vcnkuc3RhdHVzU3RhbGUnKX08L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnNjb3BlID09PSAnYnJhbmNoJyAmJiBtZW1vcnkuZ2l0QnJhbmNoICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM1NjljZDYnKX0+XHUyMzg3IHttZW1vcnkuZ2l0QnJhbmNofTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJ3JnYmEoMzcsOTksMjM1LDAuMTUpJyl9PntNRU1PUllfU09VUkNFX0xBQkVMU1ttZW1vcnkuc291cmNlVGFnXSA/PyBtZW1vcnkuc291cmNlVGFnfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5iYXNpc1NoYSAhPT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9PnttZW1vcnkuYmFzaXNTaGEuc2xpY2UoMCwgOCl9PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e25ldyBEYXRlKG1lbW9yeS51cGRhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAge2FsbC5sZW5ndGggPT09IDAgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnbWVtb3J5LmVtcHR5Jyl9PC9kaXY+fVxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgIClcclxuICAgICAgICB9KSgpfVxyXG4gICAgICA8L0NhcmQ+XHJcbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdjb25jZXB0cy50aXRsZScpfT5cclxuICAgICAgICB7Y29uY2VwdHMubGVuZ3RoID09PSAwID8gKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnY29uY2VwdHMubm9uZScpfTwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XHJcbiAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICA8dHI+e1snY29uY2VwdHMuY29sLm5hbWUnLCAnY29uY2VwdHMuY29sLmNhdGVnb3J5JywgJ2NvbmNlcHRzLmNvbC5jb3VudCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XHJcbiAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICB7Y29uY2VwdHMubWFwKChjb25jZXB0KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtjb25jZXB0LmlkfT5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntjb25jZXB0Lm5hbWV9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntjb25jZXB0LmNhdGVnb3J5fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57U3RyaW5nKGNvbmNlcHQub2NjdXJyZW5jZXMpfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICApfVxyXG4gICAgICA8L0NhcmQ+XHJcbiAgICA8Lz5cclxuICApXHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBSZXZpZXcgXHU5NUVFXHU5ODk4XHU5ODc1XHU3QjdFXHVGRjFBXHU1MTY4XHU5MUNGXHU5NUVFXHU5ODk4XHU3NzBCXHU2NzdGXHVGRjA4XHU3RURGXHU4QkExICsgXHU3QjVCXHU5MDA5ICsgXHU3MkI2XHU2MDAxXHU2RDQxXHU4RjZDXHVGRjA5KyBcdTlBOENcdTY1MzZcdThCQjBcdTVGNTUgXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgcmV2aWV3VGFiID0gKFxyXG4gICAgPD5cclxuICAgICAge3Jlc3VsdFBhbmVsfVxyXG4gICAgICA8Q2FyZCB0aXRsZT17dCgncmV2aWV3LnJlY29yZHNUaXRsZScpfT5cclxuICAgICAgICB7KCgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGFsbCA9IChpc3N1ZXNEYXRhID8/IFtdKS5tYXAoKGlzc3VlKSA9PiAoeyAuLi5pc3N1ZSwgc2V2ZXJpdHk6IG5vcm1hbGl6ZUlzc3VlU2V2ZXJpdHkoaXNzdWUuc2V2ZXJpdHkpIH0pKVxyXG4gICAgICAgICAgY29uc3Qgb3BlbkNvdW50ID0gYWxsLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpLmxlbmd0aFxyXG4gICAgICAgICAgLy8gXHU4QkExXHU2NTcwIGNoaXBzIFx1OERERlx1OTY4Rlx1NzJCNlx1NjAwMVx1N0I1Qlx1OTAwOVx1RkYwOFwiXHU1MTY4XHU5MEU4XCI9IFx1NzJCNlx1NjAwMVx1N0I1Qlx1OTAwOVx1NTQwRVx1NzY4NFx1NjAzQlx1NjU3MFx1RkYwOVx1RkYxQVx1OTAwOVwiXHU1REYyXHU4OUUzXHU1MUIzXCJcdTU0MEVcdTU0MDRcdTRFMjVcdTkxQ0RcdTVFQTZcdTY1NzBcdTVCNTdcdTdBQ0JcdTUzNzNcdTVCRjlcdTVFOTRcdTVERjJcdTg5RTNcdTUxQjNcdTUyMTdcdTg4NjhcdTMwMDJcclxuICAgICAgICAgIGNvbnN0IHN0YXR1c0ZpbHRlcmVkID0gYWxsLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlU3RhdHVzRmlsdGVyID09PSAnJyB8fCBpc3N1ZS5zdGF0dXMgPT09IGlzc3VlU3RhdHVzRmlsdGVyKVxyXG4gICAgICAgICAgY29uc3QgY291bnRzOiBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH0+ID0gW1xyXG4gICAgICAgICAgICB7IGtleTogJycsIGxhYmVsOiB0KCdyZXZpZXcuZmlsdGVyQWxsJyksIGNvdW50OiBzdGF0dXNGaWx0ZXJlZC5sZW5ndGggfSxcclxuICAgICAgICAgICAgeyBrZXk6ICdjcml0aWNhbCcsIGxhYmVsOiAnY3JpdGljYWwnLCBjb3VudDogc3RhdHVzRmlsdGVyZWQuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdjcml0aWNhbCcgfHwgaXNzdWUuc2V2ZXJpdHkgPT09ICdibG9ja2VyJykubGVuZ3RoIH0sXHJcbiAgICAgICAgICAgIHsga2V5OiAnbWFqb3InLCBsYWJlbDogJ21ham9yJywgY291bnQ6IHN0YXR1c0ZpbHRlcmVkLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnNldmVyaXR5ID09PSAnbWFqb3InKS5sZW5ndGggfSxcclxuICAgICAgICAgICAgeyBrZXk6ICdtaW5vcicsIGxhYmVsOiAnbWlub3InLCBjb3VudDogc3RhdHVzRmlsdGVyZWQuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdtaW5vcicpLmxlbmd0aCB9LFxyXG4gICAgICAgICAgICB7IGtleTogJ2luZm8nLCBsYWJlbDogJ2luZm8nLCBjb3VudDogc3RhdHVzRmlsdGVyZWQuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdpbmZvJykubGVuZ3RoIH0sXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgICBjb25zdCB2aXNpYmxlID0gc3RhdHVzRmlsdGVyZWRcclxuICAgICAgICAgICAgLmZpbHRlcigoaXNzdWUpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoaXNzdWVTZXZlcml0eUZpbHRlciA9PT0gJycpIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgICAgaWYgKGlzc3VlU2V2ZXJpdHlGaWx0ZXIgPT09ICdjcml0aWNhbCcpIHJldHVybiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBpc3N1ZS5zZXZlcml0eSA9PT0gJ2Jsb2NrZXInXHJcbiAgICAgICAgICAgICAgcmV0dXJuIGlzc3VlLnNldmVyaXR5ID09PSBpc3N1ZVNldmVyaXR5RmlsdGVyXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICBjb25zdCBjaGVja2VkVmlzaWJsZSA9IHZpc2libGUuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWVDaGVja2VkW2lzc3VlLmlkXSA9PT0gdHJ1ZSlcclxuICAgICAgICAgIGNvbnN0IGNoZWNrZWRPcGVuID0gY2hlY2tlZFZpc2libGUuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJylcclxuICAgICAgICAgIGNvbnN0IGNoZWNrZWRPcGVuVGFyZ2V0cyA9IEFycmF5LmZyb20obmV3IFNldChjaGVja2VkT3Blbi5tYXAoKGlzc3VlKSA9PiBpc3N1ZS5jaGFuZ2VJZCkpKVxyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxyXG4gICAgICAgICAgICAgICAge2NvdW50cy5tYXAoKGl0ZW0pID0+IChcclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBrZXk9e2l0ZW0ua2V5ID09PSAnJyA/ICdhbGwnIDogaXRlbS5rZXl9IHN0eWxlPXtzdHlsZXMuY2hpcChpc3N1ZVNldmVyaXR5RmlsdGVyID09PSBpdGVtLmtleSl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRJc3N1ZVNldmVyaXR5RmlsdGVyKGl0ZW0ua2V5KSB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7aXRlbS5sYWJlbH0gXHUwMEI3IHtpdGVtLmNvdW50fVxyXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWFyZ2luTGVmdDogJzE2cHgnLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cclxuICAgICAgICAgICAgICAgICAge29wZW5Db3VudH0gXHU1Rjg1XHU1OTA0XHU3NDA2IC8gXHU1MTcxIHthbGwubGVuZ3RofVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgeyhzdGF0ZT8ucmVzb2x2ZWRJc3N1ZVJldGVudGlvbkRheXMgPz8gMCkgPiAwICYmIChcclxuICAgICAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgncmV2aWV3LnJldGVudGlvbkhpbnQnKS5yZXBsYWNlKCd7ZGF5c30nLCBTdHJpbmcoc3RhdGU/LnJlc29sdmVkSXNzdWVSZXRlbnRpb25EYXlzID8/IDcpKX1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCB3aWR0aDogJzE0cHgnLCBoZWlnaHQ6ICcxNHB4JywgYm9yZGVyUmFkaXVzOiAnNTAlJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJywgZm9udFNpemU6ICcxMHB4JywgbGluZUhlaWdodDogMSwgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGN1cnNvcjogJ2hlbHAnLCB1c2VyU2VsZWN0OiAnbm9uZScsIGZsZXhTaHJpbms6IDAgfX1cclxuICAgICAgICAgICAgICAgICAgPj88L3NwYW4+XHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggMjRweCAzcHggOHB4JyB9fSB2YWx1ZT17aXNzdWVTdGF0dXNGaWx0ZXJ9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRJc3N1ZVN0YXR1c0ZpbHRlcihlLnRhcmdldC52YWx1ZSkgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj57dCgncmV2aWV3LnN0YXR1c0FsbCcpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoSVNTVUVfU1RBVFVTX0xBQkVMUykubWFwKChbdmFsdWUsIGxhYmVsXSkgPT4gPG9wdGlvbiBrZXk9e3ZhbHVlfSB2YWx1ZT17dmFsdWV9PntsYWJlbH08L29wdGlvbj4pfVxyXG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fVxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0SXNzdWVDaGVja2VkKChwcmV2aW91cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsQ2hlY2tlZCA9IHZpc2libGUuZXZlcnkoKGlzc3VlKSA9PiBwcmV2aW91c1tpc3N1ZS5pZF0gPT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGlzc3VlIG9mIHZpc2libGUpIG5leHRbaXNzdWUuaWRdID0gIWFsbENoZWNrZWRcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID57dCgncmV2aWV3LnNlbGVjdEFsbCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gdGl0bGU9e3QoJ3Jldmlldy5leHBvcnRNZEhpbnQnKX0gb25DbGljaz17KCkgPT4geyBleHBvcnRJc3N1ZXNNZCh2aXNpYmxlKSB9fT57dCgncmV2aWV3LmV4cG9ydE1kJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fVxyXG4gICAgICAgICAgICAgICAgICB0aXRsZT17dCgncmV2aWV3LnRyaWFnZUhpbnQnKX1cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wZW5Db3VudCA9IHZpc2libGUuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZW5Db3VudCA9PT0gMCkgeyBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgdCgnZml4LmRpc3BhdGNoTm9PcGVuJykpOyByZXR1cm4gfVxyXG4gICAgICAgICAgICAgICAgICAgIHNldENvbmZpcm1EaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHQoJ3Jldmlldy50cmlhZ2VDb25maXJtVGl0bGUnKSxcclxuICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHQoJ3Jldmlldy50cmlhZ2VDb25maXJtTXNnJykucmVwbGFjZSgne259JywgJzQwJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICBkYW5nZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29uZmlybUxhYmVsOiB0KCdyZXZpZXcudHJpYWdlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBydW5UcmlhZ2UoKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+e3QoJ3Jldmlldy50cmlhZ2UnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDEyNDJmJykgfX1cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3Jldmlldy5wdXJnZU9wZW5IaW50Jyl9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcGVuQ291bnQgPSB2aXNpYmxlLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVuQ291bnQgPT09IDApIHsgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIHQoJ2ZpeC5kaXNwYXRjaE5vT3BlbicpKTsgcmV0dXJuIH1cclxuICAgICAgICAgICAgICAgICAgICBzZXRDb25maXJtRGlhbG9nKHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0KCdyZXZpZXcucHVyZ2VPcGVuQ29uZmlybVRpdGxlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB0KCdyZXZpZXcucHVyZ2VPcGVuQ29uZmlybU1zZycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhvcGVuQ291bnQpKSxcclxuICAgICAgICAgICAgICAgICAgICAgIGRhbmdlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1MYWJlbDogdCgncmV2aWV3LnB1cmdlT3BlbicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgcHVyZ2VPcGVuSXNzdWVzKCkgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPnt0KCdyZXZpZXcucHVyZ2VPcGVuJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICB7KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgLy8gXHU2RDNFXHU1M0QxXHU1QkY5XHU4QzYxXHVGRjFBXHU1MkZFXHU5MDA5XHU3Njg0XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHU0RjE4XHU1MTQ4XHVGRjFCXHU2NzJBXHU1MkZFXHU5MDA5ID0gXHU1RjUzXHU1MjREXHU3QjVCXHU5MDA5XHU0RTBCXHU1MTY4XHU5MEU4XHU1Rjg1XHU1OTA0XHU3NDA2XHVGRjA4XHU1RTM4XHU5QTdCXHU1MTY1XHU1M0UzXHVGRjBDXHU0RTBEXHU1MThEXHU4NUNGXHVGRjA5XHUzMDAyXHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG9wZW5WaXNpYmxlID0gdmlzaWJsZS5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKVxyXG4gICAgICAgICAgICAgICAgICBjb25zdCBjaGVja2VkSWRzID0gb3BlblZpc2libGUuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWVDaGVja2VkW2lzc3VlLmlkXSA9PT0gdHJ1ZSkubWFwKChpc3N1ZSkgPT4gaXNzdWUuaWQpXHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlkcyA9IGNoZWNrZWRJZHMubGVuZ3RoID4gMCA/IGNoZWNrZWRJZHMgOiBvcGVuVmlzaWJsZS5tYXAoKGlzc3VlKSA9PiBpc3N1ZS5pZClcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBmb250V2VpZ2h0OiA2MDAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdmaXguZGlzcGF0Y2hIaW50TWFpbicpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWRzLmxlbmd0aCA9PT0gMCkgeyBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgdCgnZml4LmRpc3BhdGNoTm9PcGVuJykpOyByZXR1cm4gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDb25maXJtRGlhbG9nKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdCgnZml4LmRpc3BhdGNoTW9kZVRpdGxlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogdCgnZml4LmRpc3BhdGNoTW9kZU1zZycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhpZHMubGVuZ3RoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGFuZ2VyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtTGFiZWw6IHQoJ2ZpeC5kaXNwYXRjaEF1dG8nKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ6IHsgbGFiZWw6IHQoJ2ZpeC5kaXNwYXRjaFBsYW4nKSwgb25BbHQ6ICgpID0+IHsgdm9pZCBkaXNwYXRjaEZpeChbXSwgaWRzLCAncGxhbicpIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBkaXNwYXRjaEZpeChbXSwgaWRzLCAnZml4JykgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgPlx1RDgzRFx1REU4MCB7dCgnZml4LmRpc3BhdGNoJyl9KHtTdHJpbmcoaWRzLmxlbmd0aCl9KTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9KSgpfVxyXG4gICAgICAgICAgICAgICAgeygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBlbmRpbmdQbGFucyA9IHZpc2libGUuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuZml4UGxhbj8uc3RhdHVzID09PSAncGVuZGluZycpXHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBwZW5kaW5nUGxhbnMubGVuZ3RoID4gMCA/IChcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX1cclxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdmaXguZGlzcGF0Y2hQbGFuc0hpbnQnKX1cclxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyh7IHRpdGxlOiB0KCdmaXguZGlzcGF0Y2hQbGFucycpLCBtZXNzYWdlOiBgXHU1QzA2XHU2RDNFXHU1M0QxICR7U3RyaW5nKHBlbmRpbmdQbGFucy5sZW5ndGgpfSBcdTRFMkFcdTVERjJcdTRFQTdcdTUxRkFcdTc2ODRcdTRGRUVcdTU5MERcdTY1QjlcdTY4NDhcdTdFRDlcdTVCNTAgQWdlbnQgXHU1RTc2XHU1M0QxXHU2MjY3XHU4ODRDXHVGRjA4XHU3MkVDXHU3QUNCIHdvcmt0cmVlXHVGRjBDXHU2RDg4XHU4MDE3XHU2QTIxXHU1NzhCXHU3NTI4XHU5MUNGXHVGRjFCXHU1QjhDXHU2MjEwXHU1NDBFXHU4MUVBXHU1MkE4XHU1NkRFXHU1MTk5XHU1RTc2XHU2M0QwXHU0RUE0XHVGRjA5XHUzMDAyYCwgZGFuZ2VyOiBmYWxzZSwgY29uZmlybUxhYmVsOiB0KCdmaXguZGlzcGF0Y2hQbGFucycpLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBkaXNwYXRjaEZpeChwZW5kaW5nUGxhbnMubWFwKChpc3N1ZSkgPT4gaXNzdWUuZml4UGxhbiEuaWQpLCBbXSwgJ2ZpeCcpIH0gfSkgfX1cclxuICAgICAgICAgICAgICAgICAgICA+XHVEODNEXHVEQ0U2IHt0KCdmaXguZGlzcGF0Y2hQbGFucycpfSh7U3RyaW5nKHBlbmRpbmdQbGFucy5sZW5ndGgpfSk8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgKSA6IG51bGxcclxuICAgICAgICAgICAgICAgIH0pKCl9XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZElzc3VlcygpIH19Pnt0KCdyZXZpZXcucmVmcmVzaCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIHtmaXhUYXNrcy5sZW5ndGggPiAwICYmICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBGSVhfU1RBVFVTX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgcXVldWVkOiB0KCdmaXgudGFza1F1ZXVlZCcpLCBydW5uaW5nOiB0KCdmaXgudGFza1J1bm5pbmcnKSwgbWVyZ2luZzogdCgnZml4LnRhc2tNZXJnaW5nJyksIHJlZG86IHQoJ2ZpeC50YXNrUmVkbycpLCBkb25lOiB0KCdmaXgudGFza0RvbmUnKSwgY29uZmxpY3Q6IHQoJ2ZpeC50YXNrQ29uZmxpY3QnKSwgZmFpbGVkOiB0KCdmaXgudGFza0ZhaWxlZCcpLCBjYW5jZWxsZWQ6IHQoJ2ZpeC50YXNrQ2FuY2VsbGVkJykgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZml4QWN0aXZlID0gZml4VGFza3Muc29tZSgodGFzaykgPT4gdGFzay5zdGF0dXMgPT09ICdxdWV1ZWQnIHx8IHRhc2suc3RhdHVzID09PSAncnVubmluZycgfHwgdGFzay5zdGF0dXMgPT09ICdtZXJnaW5nJyB8fCB0YXNrLnN0YXR1cyA9PT0gJ3JlZG8nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgPENhcmQgdGl0bGU9eydcdUQ4M0VcdUREMTYgJyArIHQoJ2ZpeC5zdGF0dXMnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc4cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtTdHJpbmcoZml4VGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLnN0YXR1cyA9PT0gJ2RvbmUnKS5sZW5ndGgpfS97U3RyaW5nKGZpeFRhc2tzLmxlbmd0aCl9IHt0KCdmaXgudGFza0RvbmUnKX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgIHtmaXhBY3RpdmUgJiYgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGNhbmNlbEZpeCgpIH19Plx1MjNGOSB7dCgnZml4LnN0b3AnKX08L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge2ZpeFRhc2tzLm1hcCgodGFzaykgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e3Rhc2suaXNzdWVJZH0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsIHBhZGRpbmc6ICc2cHggNHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDMsIHJnYmEoNSw1LDUsMC4wNikpJywgZm9udFNpemU6ICcxMXB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSh0YXNrLnN0YXR1cyA9PT0gJ2RvbmUnID8gJyM0ZWM5YjAnIDogdGFzay5zdGF0dXMgPT09ICdxdWV1ZWQnID8gJyM4Yjk0OWUnIDogdGFzay5zdGF0dXMgPT09ICdydW5uaW5nJyB8fCB0YXNrLnN0YXR1cyA9PT0gJ21lcmdpbmcnIHx8IHRhc2suc3RhdHVzID09PSAncmVkbycgPyAnI2RjZGNhYScgOiAnI2YxNGM0YycpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7RklYX1NUQVRVU19MQUJFTFNbdGFzay5zdGF0dXNdID8/IHRhc2suc3RhdHVzfXt0YXNrLm1vZGUgPT09ICdwbGFuJyA/ICdcdTAwQjdcdTY1QjlcdTY4NDgnIDogJyd9e3Rhc2suYXR0ZW1wdCA+IDEgPyBgXHUwMEI3JHt0KCdmaXguYXR0ZW1wdCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyh0YXNrLmF0dGVtcHQpKX1gIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gdGFzay5zdGF0dXMgPT09ICdydW5uaW5nJyB8fCB0YXNrLnN0YXR1cyA9PT0gJ21lcmdpbmcnIHx8IHRhc2suc3RhdHVzID09PSAncmVkbydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuIG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5tYXgoMCwgTWF0aC5yb3VuZCgoRGF0ZS5ub3coKSAtICh0YXNrLnN0YXJ0ZWRBdCA/PyBEYXRlLm5vdygpKSkgLyA2MF8wMDApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4dHJhID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWludXRlcyA+IDAgPyB0KCdmaXgucnVudGltZScpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhtaW51dGVzKSkgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0YXNrLnJlc3VtZXMgPz8gMCkgPiAwID8gdCgnZml4LnJlc3VtZXMnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcodGFzay5yZXN1bWVzKSkgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0YXNrLnByb2JlcyA/PyAwKSA+IDAgPyB0KCdmaXgucHJvYmVzJykucmVwbGFjZSgne259JywgU3RyaW5nKHRhc2sucHJvYmVzKSkgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLmZpbHRlcigocGFydCkgPT4gcGFydCAhPT0gJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4dHJhLmxlbmd0aCA+IDAgPyA8c3BhbiBzdHlsZT17eyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZmxleFNocmluazogMCB9fT57ZXh0cmEuam9pbignIFx1MDBCNyAnKX08L3NwYW4+IDogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSgpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtaW5XaWR0aDogMCwgZmxleDogMSB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBmb250V2VpZ2h0OiA2MDAsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT57dGFzay50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyh0YXNrLnN0YXR1cyA9PT0gJ3J1bm5pbmcnIHx8IHRhc2suc3RhdHVzID09PSAncXVldWVkJykgJiYgdGFzay5jdXJyZW50QWN0aW9uICE9PSB1bmRlZmluZWQgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JyksIGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknIH19Plx1MjVCOCB7dGFzay5jdXJyZW50QWN0aW9ufTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt0YXNrLnN1bW1hcnkgIT09IHVuZGVmaW5lZCAmJiA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dGFzay5zdW1tYXJ5fTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge3Rhc2suaW1wYWN0ICE9PSB1bmRlZmluZWQgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSh0YXNrLmltcGFjdC5yaXNrTGV2ZWwgPT09ICdsb3cnID8gJyM0ZWM5YjAnIDogdGFzay5pbXBhY3Qucmlza0xldmVsID09PSAnbWVkaXVtJyA/ICcjZGNkY2FhJyA6ICcjZjE0YzRjJyl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx1NUY3MVx1NTRDRCB7dGFzay5pbXBhY3Qucmlza0xldmVsfSh7U3RyaW5nKHRhc2suaW1wYWN0LnJpc2tTY29yZSl9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsnICd9XHU3NkY0XHU2M0E1IHtTdHJpbmcodGFzay5pbXBhY3QuZGlyZWN0Lmxlbmd0aCl9IFx1MDBCNyBcdTk1RjRcdTYzQTUge1N0cmluZyh0YXNrLmltcGFjdC5pbmRpcmVjdC5sZW5ndGgpfSBcdTAwQjcgXHU2RjVDXHU1NzI4IHtTdHJpbmcodGFzay5pbXBhY3QucG90ZW50aWFsLmxlbmd0aCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Rhc2suaW1wYWN0LmluZGlyZWN0Lmxlbmd0aCA+IDAgPyBgXHVGRjA4XHU1OTgyICR7dGFzay5pbXBhY3QuaW5kaXJlY3Quc2xpY2UoMCwgMikuam9pbignLCAnKX1cdUZGMDlgIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt0YXNrLmVycm9yICE9PSB1bmRlZmluZWQgJiYgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDEyNDJmJykgfX0+e3Rhc2suZXJyb3J9PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7KHRhc2suZmlsZXMgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5maWxlcyEuc2xpY2UoMCwgNCkuam9pbignLCAnKX17dGFzay5jb21taXQgIT09IHVuZGVmaW5lZCA/IGAgXHUwMEI3ICR7dGFzay5jb21taXR9YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgfSkoKX1cclxuICAgICAgICAgICAgICB7KGNoZWNrZWRWaXNpYmxlLmxlbmd0aCA+IDAgfHwgYmF0Y2hWZXJpZnlTdGF0ZSAhPT0gbnVsbCB8fCB0cmlhZ2VTdGF0ZSAhPT0gbnVsbCkgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBwYWRkaW5nOiAnNnB4IDEwcHgnLCBtYXJnaW5Cb3R0b206ICcxMHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgZm9udFNpemU6ICcxMXB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAge2JhdGNoVmVyaWZ5U3RhdGUgIT09IG51bGwgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcdTIzRjMge3QoJ3Jldmlldy5iYXRjaFByb2dyZXNzJykucmVwbGFjZSgne2l9JywgU3RyaW5nKGJhdGNoVmVyaWZ5U3RhdGUuZG9uZSkpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhiYXRjaFZlcmlmeVN0YXRlLnRvdGFsKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IGJhdGNoU3RvcFJlZi5jdXJyZW50ID0gdHJ1ZSB9fT57dCgncmV2aWV3LmJhdGNoU3RvcCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICApIDogdHJpYWdlU3RhdGUgIT09IG51bGwgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcdTIzRjMge3QoJ3Jldmlldy50cmlhZ2VQcm9ncmVzcycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyh0cmlhZ2VTdGF0ZS5wcm9jZXNzZWQpKS5yZXBsYWNlKCd7bX0nLCB0cmlhZ2VTdGF0ZS5yZW1haW5pbmcgPj0gMCA/IFN0cmluZyh0cmlhZ2VTdGF0ZS5yZW1haW5pbmcpIDogJ1x1MjAyNicpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBiYXRjaFN0b3BSZWYuY3VycmVudCA9IHRydWUgfX0+e3QoJ3Jldmlldy50cmlhZ2VTdG9wJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0KCdyZXZpZXcuY2hlY2tlZENvdW50JykucmVwbGFjZSgne259JywgU3RyaW5nKGNoZWNrZWRWaXNpYmxlLmxlbmd0aCkpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIHtjaGVja2VkT3BlblRhcmdldHMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgncmV2aWV3LmJhdGNoVmVyaWZ5Q29uZmlybU1zZycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhjaGVja2VkT3BlblRhcmdldHMubGVuZ3RoKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6IHQoJ3Jldmlldy5iYXRjaFZlcmlmeUNvbmZpcm1UaXRsZScpLCBtZXNzYWdlOiB0KCdyZXZpZXcuYmF0Y2hWZXJpZnlDb25maXJtTXNnJykucmVwbGFjZSgne259JywgU3RyaW5nKGNoZWNrZWRPcGVuVGFyZ2V0cy5sZW5ndGgpKSwgZGFuZ2VyOiBmYWxzZSwgY29uZmlybUxhYmVsOiB0KCdyZXZpZXcuYmF0Y2hWZXJpZnknKSwgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgcnVuQmF0Y2hWZXJpZnkoY2hlY2tlZE9wZW5UYXJnZXRzKSB9IH0pIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdUREMEQge3QoJ3Jldmlldy5iYXRjaFZlcmlmeScpfSh7U3RyaW5nKGNoZWNrZWRPcGVuVGFyZ2V0cy5sZW5ndGgpfSk8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICB7Y2hlY2tlZE9wZW4ubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtYXJrSXNzdWVzSGFuZGxlZChjaGVja2VkT3Blbi5tYXAoKGlzc3VlKSA9PiBpc3N1ZS5pZCkpIH19Plx1MjcxMyB7dCgncmV2aWV3Lm1hcmtIYW5kbGVkJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBleHBvcnRJc3N1ZXNNZChjaGVja2VkVmlzaWJsZSkgfX0+e3QoJ3Jldmlldy5leHBvcnRNZCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRJc3N1ZUNoZWNrZWQoe30pIH19Pnt0KCdwaWNrZXIuY2xlYXInKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAge2FsbC5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pntpc3N1ZXNEYXRhID09PSBudWxsID8gJ1x1MjAyNicgOiB0KCdyZXZpZXcucmVjb3Jkc0VtcHR5Jyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgKSA6IHZpc2libGUubGVuZ3RoID09PSAwID8gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnbm90ZXMuZW1wdHlTZWFyY2gnKX08L2Rpdj5cclxuICAgICAgICAgICAgICApIDogdmlzaWJsZS5tYXAoKGlzc3VlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBleHBhbmRlZCA9IGlzc3VlRXhwYW5kZWRbaXNzdWUuaWRdID09PSB0cnVlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGlzc3VlLmRlc2NyaXB0aW9uID8/ICcnXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb25nID0gZGVzY3JpcHRpb24ubGVuZ3RoID4gMjAwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aXNzdWUuaWR9IHN0eWxlPXtzdHlsZXMubm90ZUNhcmR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2lzc3VlQ2hlY2tlZFtpc3N1ZS5pZF0gPT09IHRydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHsgc2V0SXNzdWVDaGVja2VkKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFtpc3N1ZS5pZF06ICEocHJldmlvdXNbaXNzdWUuaWRdID09PSB0cnVlKSB9KSkgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXJnaW46IDAsIGZsZXhTaHJpbms6IDAsIGN1cnNvcjogJ3BvaW50ZXInLCBhY2NlbnRDb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShzZXZlcml0eUNvbG9yKGlzc3VlLnNldmVyaXR5KSl9Pntpc3N1ZS5zZXZlcml0eX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpc3N1ZS5jYXRlZ29yeSA/IDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM1NzYwNmEnKX0+e2lzc3VlLmNhdGVnb3J5fTwvc3Bhbj4gOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycgPyAnI2RjZGNhYScgOiBpc3N1ZS5zdGF0dXMgPT09ICdyZXNvbHZlZCcgfHwgaXNzdWUuc3RhdHVzID09PSAnYWNjZXB0ZWQnID8gJyM0ZWM5YjAnIDogJyM4YjhiOGInKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge0lTU1VFX1NUQVRVU19MQUJFTFNbaXNzdWUuc3RhdHVzXSA/PyBpc3N1ZS5zdGF0dXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVUZXh0fT57aXNzdWUudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFNocmluazogMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKSAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dmVyaWZ5aW5nVGFyZ2V0ICE9PSBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3Jldmlldy52ZXJpZnlIaW50Jyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgdmVyaWZ5SXNzdWVzKGlzc3VlLmNoYW5nZUlkKSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgID57dmVyaWZ5aW5nVGFyZ2V0ID09PSBpc3N1ZS5jaGFuZ2VJZCA/IHQoJ3Jldmlldy52ZXJpZnlSdW5uaW5nJykgOiAnXHVEODNEXHVERDBEICcgKyB0KCdyZXZpZXcudmVyaWZ5Jyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3Jldmlldy5mYWxzZVBvc2l0aXZlSGludCcpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDb25maXJtRGlhbG9nKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdCgncmV2aWV3LmZhbHNlUG9zaXRpdmVUaXRsZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHQoJ3Jldmlldy5mYWxzZVBvc2l0aXZlTXNnJykucmVwbGFjZSgne3RpdGxlfScsIGlzc3VlLnRpdGxlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW5nZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1MYWJlbDogdCgncmV2aWV3LmZhbHNlUG9zaXRpdmUnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXMvc3RhdHVzJywgeyBpZDogaXNzdWUuaWQsIHN0YXR1czogJ3JlamVjdGVkJyB9KS50aGVuKGFzeW5jICh7IG9rIH0pID0+IHsgaWYgKG9rKSBhd2FpdCBsb2FkSXNzdWVzKCkgfSkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlx1RDgzRFx1REVBQiB7dCgncmV2aWV3LmZhbHNlUG9zaXRpdmUnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKSAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgncmV2aWV3Lm1hcmtIYW5kbGVkJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWFya0lzc3Vlc0hhbmRsZWQoW2lzc3VlLmlkXSkgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XHUyNzEzIHt0KCdyZXZpZXcubWFya0hhbmRsZWQnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHtkZXNjcmlwdGlvbiAhPT0gJycgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNvbnRlbnQsIC4uLihsb25nICYmICFleHBhbmRlZCA/IHN0eWxlcy5ub3RlQ2xhbXAgOiB7fSkgfX0+e3JlbmRlcldpdGhQZWVrKGRlc2NyaXB0aW9uKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgIHtpc3N1ZS5yZXNvbHV0aW9uID8gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc2cHgnLCBwYWRkaW5nOiAnNnB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBiYWNrZ3JvdW5kOiAncmdiYSg3OCwgMjAxLCAxNzYsIDAuMDgpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoNzgsIDIwMSwgMTc2LCAwLjM1KScsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHUyNzEzIHtpc3N1ZS5yZXNvbHV0aW9ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAge2lzc3VlLmZpeFBsYW4gIT0gbnVsbCAmJiAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxhbiA9IGlzc3VlLmZpeFBsYW5cclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYW5PcGVuID0gaXNzdWVFeHBhbmRlZFtgJHtpc3N1ZS5pZH0tcGxhbmBdID09PSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGJhY2tncm91bmQ6ICdyZ2JhKDM3LCA5OSwgMjM1LCAwLjA1KScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTIpKScsIGZvbnRTaXplOiAnMTFweCcsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMubGlua0J0biwgd2lkdGg6ICcxMDAlJywgdGV4dEFsaWduOiAnbGVmdCcsIHBhZGRpbmc6ICc1cHggMTBweCcsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0SXNzdWVFeHBhbmRlZCgocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBbYCR7aXNzdWUuaWR9LXBsYW5gXTogIShwcmV2aW91c1tgJHtpc3N1ZS5pZH0tcGxhbmBdID09PSB0cnVlKSB9KSkgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdUQ4M0RcdURDQzQge3QoJ2ZpeC5wbGFuJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHBsYW4uc3RhdHVzID09PSAncGVuZGluZycgPyAnI2Q5NzcwNicgOiAnIzI1NjNlYicpfT57cGxhbi5zdGF0dXMgPT09ICdwZW5kaW5nJyA/ICdcdTVGODVcdThCQzRcdTVCQTEnIDogJ1x1NURGMlx1NkQzRVx1NTNEMSd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3BsYW4uZmlsZXMubGVuZ3RoID4gMCAmJiA8c3BhbiBzdHlsZT17eyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScgfX0+e3BsYW4uZmlsZXMuc2xpY2UoMCwgMykuam9pbignLCAnKX08L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPntwbGFuT3BlbiA/ICdcdTI1QjInIDogJ1x1MjVCQyd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge3BsYW5PcGVuICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzJweCAxMHB4IDhweCcsIGxpbmVIZWlnaHQ6IDEuNyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48Yj57dCgnZml4LnBsYW5BcHByb2FjaCcpfVx1RkYxQTwvYj57cGxhbi5hcHByb2FjaH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48Yj57dCgnZml4LnBsYW5JbXBhY3QnKX1cdUZGMUE8L2I+e3BsYW4uaW1wYWN0fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjxiPnt0KCdmaXgucGxhbkJlbmVmaXQnKX1cdUZGMUE8L2I+e3BsYW4uYmVuZWZpdH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48Yj57dCgnZml4LnBsYW5SaXNrJyl9XHVGRjFBPC9iPntwbGFuLnJpc2t9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9KSgpfVxyXG4gICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4U3RhdHMgIT0gbnVsbCB8fCBCb29sZWFuKGlzc3VlLmZpeERpZmYpKSAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmxpbmtCdG4sIG1hcmdpblRvcDogJzRweCcsIGRpc3BsYXk6ICdibG9jaycgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldEZpeEV4cGFuZGVkKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFtpc3N1ZS5pZF06ICEocHJldmlvdXNbaXNzdWUuaWRdID09PSB0cnVlKSB9KSkgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFx1RDgzRFx1REQyNyB7dCgncmV2aWV3LmZpeERldGFpbCcpfVx1RkYwOHtTdHJpbmcoaXNzdWUuZml4U3RhdHM/LmZpbGVzID8/IDApfSB7dCgncmV2aWV3LmZpeFN0YXRGaWxlcycpfSBcdTAwQjcgK3tTdHJpbmcoaXNzdWUuZml4U3RhdHM/Lmluc2VydGlvbnMgPz8gMCl9IFx1MjIxMntTdHJpbmcoaXNzdWUuZml4U3RhdHM/LmRlbGV0aW9ucyA/PyAwKX1cdUZGMDl7Zml4RXhwYW5kZWRbaXNzdWUuaWRdID09PSB0cnVlID8gJ1x1MjVCMicgOiAnXHUyNUJDJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtmaXhFeHBhbmRlZFtpc3N1ZS5pZF0gPT09IHRydWUgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5maXhGaWxlcyA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnM3B4JyB9fT57dCgncmV2aWV3LmZpeEZpbGVzJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5maXhGaWxlcyA/PyBbXSkubWFwKChmaWxlKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZmlsZX0gc3R5bGU9e3sgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsIGZvbnRTaXplOiAnMTFweCcgfX0+e2ZpbGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4SW1wYWN0ID8/IFtdKS5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICczcHgnIH19Pnt0KCdyZXZpZXcuZml4SW1wYWN0Jyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzc3VlLmZpeEltcGFjdC5tYXAoKGVudHJ5KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZW50cnkuc3ltYm9sfSBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc1cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyMwOTY5ZGEnKX0+e2VudHJ5LnN5bWJvbH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7JyAnfXt0KCdyZXZpZXcuZGVmaW5lZEluJyl9IHtlbnRyeS5kZWZpbmVkSW59IFx1MDBCNyB7U3RyaW5nKGVudHJ5LmNhbGxlcnMubGVuZ3RoKX0ge3QoJ3Jldmlldy5jYWxsQ291bnQnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2FsbGVycy5zbGljZSgwLCA1KS5tYXAoKGNhbGxlciwgY2FsbGVySW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17Y2FsbGVySW5kZXh9IHN0eWxlPXt7IGZvbnRTaXplOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBwYWRkaW5nTGVmdDogJzEycHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY3Vyc29yOiAncG9pbnRlcicsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lIGRvdHRlZCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG9wZW5QZWVrKGNhbGxlci5maWxlLCBOdW1iZXIoY2FsbGVyLmxpbmUpKSB9fT57Y2FsbGVyLmZpbGV9OntjYWxsZXIubGluZX08L3NwYW4+IHtjYWxsZXIuc25pcHBldC5zbGljZSgwLCA4MCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtCb29sZWFuKGlzc3VlLmZpeERpZmYpICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnM3B4JyB9fT57dCgncmV2aWV3LmZpeERpZmYnKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctaW5zZXQsIHJnYmEoNSw1LDUsMC4wMykpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzZweCA4cHgnLCBtYXhIZWlnaHQ6ICczMDBweCcsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3JlbmRlckRpZmZMaW5lcyhpc3N1ZS5maXhEaWZmKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICB7bG9uZyAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMubGlua0J0bn0gb25DbGljaz17KCkgPT4geyBzZXRJc3N1ZUV4cGFuZGVkKHsgLi4uaXNzdWVFeHBhbmRlZCwgW2lzc3VlLmlkXTogIWV4cGFuZGVkIH0pIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZXhwYW5kZWQgPyB0KCdub3Rlcy5jb2xsYXBzZScpIDogdCgnbm90ZXMuZXhwYW5kJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlTWV0YX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57dCgncmV2aWV3LnRhcmdldCcpfToge2lzc3VlVGFyZ2V0TGFiZWwoaXNzdWUuY2hhbmdlSWQpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntmb3JtYXRUaW1lKGlzc3VlLmNyZWF0ZWRBdCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfSkoKX1cclxuICAgICAgPC9DYXJkPlxyXG4gICAgICA8Q2FyZCB0aXRsZT17dCgndmVyaWZ5LnJlY29yZHMnKX0+XHJcbiAgICAgICAge3ZlcmlmaWNhdGlvbnMubGVuZ3RoID09PSAwID8gKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgndmVyaWZ5LnJlY29yZHNFbXB0eScpfTwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XHJcbiAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICB7dmVyaWZpY2F0aW9ucy5zbGljZSgwLCAyMCkubWFwKChyZWNvcmQpID0+IChcclxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3JlY29yZC5pZH0+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHJlY29yZC5zdGF0dXMgPT09ICdwYXNzZWQnID8gJyM0ZWM5YjAnIDogJyNkY2RjYWEnKX0+e3JlY29yZC5zdGF0dXN9PC9zcGFuPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57cmVjb3JkLm5hbWV9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntmb3JtYXRUaW1lKHJlY29yZC5jcmVhdGVkQXQpfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICApfVxyXG4gICAgICA8L0NhcmQ+XHJcbiAgICA8Lz5cclxuICApXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm9vdH0gZGF0YS10ZXN0aWQ9XCJwcm9qZWN0LWNvbnRyb2wtd29ya3NwYWNlXCI+XHJcbiAgICAgIHtwcm9wcy5sYXlvdXRNb2RlICE9PSAnb3ZlcmxheScgJiYgPHN0eWxlPntMQVlPVVRfU1RZTEV9PC9zdHlsZT59XHJcbiAgICAgIHtwcm9wcy5sYXlvdXRNb2RlICE9PSAnb3ZlcmxheScgJiYgPGRpdlxyXG4gICAgICAgIGRhdGEtdGVzdGlkPVwicHJvamVjdC1jb250cm9sLWRpdmlkZXJcIlxyXG4gICAgICAgIG9uUG9pbnRlckRvd249e29uRGl2aWRlckRvd259XHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IC00LCB3aWR0aDogOCxcclxuICAgICAgICAgIGN1cnNvcjogJ2NvbC1yZXNpemUnLCB6SW5kZXg6IDIwLFxyXG4gICAgICAgIH19XHJcbiAgICAgIC8+fVxyXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubmF2fT5cclxuICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLnRpdGxlfT57dCgnd29ya3NwYWNlLnRpdGxlJyl9PC9zcGFuPlxyXG4gICAgICAgIHt0YWJzLm1hcCgoZW50cnkpID0+IChcclxuICAgICAgICAgIDxidXR0b24ga2V5PXtlbnRyeS5rZXl9IHN0eWxlPXtzdHlsZXMudGFiKHRhYiA9PT0gZW50cnkua2V5KX0gb25DbGljaz17KCkgPT4geyBzZXRUYWIoZW50cnkua2V5KSB9fT57ZW50cnkubGFiZWx9PC9idXR0b24+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgICAgeygoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBydW5uaW5nQ291bnQgPSBydW5zLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LnN0YXR1cyA9PT0gJ3J1bm5pbmcnIHx8IGVudHJ5LnN0YXR1cyA9PT0gJ3F1ZXVlZCcgfHwgZW50cnkuc3RhdHVzID09PSAndmVyaWZ5aW5nJykubGVuZ3RoXHJcbiAgICAgICAgICBjb25zdCBmYWlsZWRDb3VudCA9IHJ1bnMuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuc3RhdHVzID09PSAnZmFpbGVkJyB8fCBlbnRyeS5zdGF0dXMgPT09ICdwYXVzZWQnKS5sZW5ndGhcclxuICAgICAgICAgIGlmIChydW5uaW5nQ291bnQgPT09IDAgJiYgZmFpbGVkQ291bnQgPT09IDApIHJldHVybiBudWxsXHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIG1hcmdpbkxlZnQ6ICc0cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAgICB7cnVubmluZ0NvdW50ID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5iYWRnZSh0aGVtZUF3YXJlVGV4dCgnIzI1NjNlYicpKSwgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlcjogJ25vbmUnIH19IHRpdGxlPXt0KCdiYWRnZS5ydW5uaW5nJykucmVwbGFjZSgne259JywgU3RyaW5nKHJ1bm5pbmdDb3VudCkpfVxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldFRhYignZXhlY3V0aW9uJykgfX0+XHUyNUI2IHtTdHJpbmcocnVubmluZ0NvdW50KX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIHtmYWlsZWRDb3VudCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UodGhlbWVBd2FyZVRleHQoJyNmMTRjNGMnKSksIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXI6ICdub25lJyB9fSB0aXRsZT17dCgnYmFkZ2UuZmFpbGVkJykucmVwbGFjZSgne259JywgU3RyaW5nKGZhaWxlZENvdW50KSl9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0VGFiKCdleGVjdXRpb24nKSB9fT5cdTI3MTcge1N0cmluZyhmYWlsZWRDb3VudCl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH0pKCl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuYm9keX0+XHJcbiAgICAgICAge3Byb3BzLnNlc3Npb25JZCA9PT0gdW5kZWZpbmVkIHx8IHByb3BzLnNlc3Npb25JZCA9PT0gJycgPyA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCd3b3Jrc3BhY2Uuc2VsZWN0U2Vzc2lvbicpfTwvZGl2PiA6IDw+XHJcbiAgICAgICAgICB7bG9hZEVycm9yICE9PSBudWxsICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2Vycm9yLmxvYWQnKX06IHtsb2FkRXJyb3J9PC9kaXY+fVxyXG4gICAgICAgICAge3N0YXRlPy5yZWFkeSA9PT0gZmFsc2UgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57c3RhdGUucmVhc29uID8/ICcnfTwvZGl2Pn1cclxuICAgICAgICAgIHt0YWIgPT09ICdjb21taXRzJyAmJiBjb21taXRzVGFifVxyXG4gICAgICAgICAge3RhYiA9PT0gJ292ZXJ2aWV3JyAmJiBvdmVydmlld1RhYn1cclxuICAgICAgICAgIHt0YWIgPT09ICdleGVjdXRpb24nICYmIGV4ZWN1dGlvblRhYn1cclxuICAgICAgICAgIHt0YWIgPT09ICdyZXZpZXcnICYmIHJldmlld1RhYn1cclxuICAgICAgICAgIHt0YWIgPT09ICdub3RlcycgJiYgbm90ZXNUYWJ9XHJcbiAgICAgICAgICB7dGFiID09PSAnc2V0dGluZ3MnICYmIHNldHRpbmdzVGFifVxyXG4gICAgICAgIDwvPn1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIHtjb25maXJtRGlhbG9nICE9PSBudWxsICYmIChcclxuICAgICAgICA8Q29uZmlybURpYWxvZ1xyXG4gICAgICAgICAgdGl0bGU9e2NvbmZpcm1EaWFsb2cudGl0bGV9XHJcbiAgICAgICAgICBtZXNzYWdlPXtjb25maXJtRGlhbG9nLm1lc3NhZ2V9XHJcbiAgICAgICAgICBkYW5nZXI9e2NvbmZpcm1EaWFsb2cuZGFuZ2VyfVxyXG4gICAgICAgICAgY29uZmlybUxhYmVsPXtjb25maXJtRGlhbG9nLmNvbmZpcm1MYWJlbH1cclxuICAgICAgICAgIGFsdD17Y29uZmlybURpYWxvZy5hbHQgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHtcclxuICAgICAgICAgICAgbGFiZWw6IGNvbmZpcm1EaWFsb2cuYWx0LmxhYmVsLFxyXG4gICAgICAgICAgICBvbkFsdDogKCkgPT4geyBjb25maXJtRGlhbG9nLmFsdCEub25BbHQoKTsgc2V0Q29uZmlybURpYWxvZyhudWxsKSB9LFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAgIG9uQ2FuY2VsPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2cobnVsbCkgfX1cclxuICAgICAgICAgIG9uQ29uZmlybT17KCkgPT4geyBjb25maXJtRGlhbG9nLm9uQ29uZmlybSgpOyBzZXRDb25maXJtRGlhbG9nKG51bGwpIH19XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgICAge3BlZWsgIT09IG51bGwgJiYgKFxyXG4gICAgICAgIDxkaXYgZGF0YS10ZXN0aWQ9XCJwYy1wZWVrLW92ZXJsYXlcIiBzdHlsZT17eyBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIGJhY2tncm91bmQ6ICdyZ2JhKDE1LDIzLDQyLDAuNDUpJywgYmFja2Ryb3BGaWx0ZXI6ICdibHVyKDJweCknLCB6SW5kZXg6IDEwMDAsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBlZWsobnVsbCkgfX0+XHJcbiAgICAgICAgICA8ZGl2IGRhdGEtdGVzdGlkPVwicGMtcGVlay1jYXJkXCIgc3R5bGU9e3sgd2lkdGg6ICdtaW4oNzYwcHgsIDkydncpJywgbWF4SGVpZ2h0OiAnODB2aCcsIG92ZXJmbG93OiAnaGlkZGVuJywgYm9yZGVyUmFkaXVzOiAnMTBweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3hTaGFkb3c6ICcwIDE2cHggNDhweCByZ2JhKDAsMCwwLDAuMjUpJywgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyB9fSBvbkNsaWNrPXsoZSkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpIH19PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIHBhZGRpbmc6ICcxMHB4IDE0cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEpKScgfX0+XHJcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCwgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57cGVlay5wYXRofTp7U3RyaW5nKHBlZWsubGluZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIHtwZWVrRGF0YT8uZXhpc3RzID09PSB0cnVlICYmIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PntTdHJpbmcocGVla0RhdGEuc3RhcnRMaW5lKX1cdTIwMTN7U3RyaW5nKHBlZWtEYXRhLmVuZExpbmUpfSAvIHtTdHJpbmcocGVla0RhdGEudG90YWxMaW5lcyl9IFx1ODg0Qzwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCAxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBlZWsobnVsbCkgfX0+XHUyNzE1PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93OiAnYXV0bycsIHBhZGRpbmc6ICcxMHB4IDAnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWluc2V0LCByZ2JhKDUsNSw1LDAuMDMpKScgfX0+XHJcbiAgICAgICAgICAgICAge3BlZWtCdXN5ICYmIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLmVtcHR5IH19Plx1OEJGQlx1NTNENlx1NEUyRFx1MjAyNjwvZGl2Pn1cclxuICAgICAgICAgICAgICB7IXBlZWtCdXN5ICYmIHBlZWtEYXRhICE9PSBudWxsICYmIHBlZWtEYXRhLmV4aXN0cyA9PT0gZmFsc2UgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT5cdTY1ODdcdTRFRjZcdTRFMERcdTVCNThcdTU3MjhcdUZGMDhcdTUzRUZcdTgwRkRcdTVERjJcdTg4QUJcdTUyMjBcdTk2NjRcdTYyMTZcdTc5RkJcdTUyQThcdUZGMDk8L2Rpdj59XHJcbiAgICAgICAgICAgICAgeyFwZWVrQnVzeSAmJiBwZWVrRGF0YT8uZXhpc3RzID09PSB0cnVlICYmIChwZWVrRGF0YS5saW5lcyA/PyBbXSkubWFwKChlbnRyeSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5Lm59IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIHBhZGRpbmc6ICcwIDE0cHgnLCBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJywgZm9udFNpemU6ICcxMS41cHgnLCBsaW5lSGVpZ2h0OiAxLjcsIGJhY2tncm91bmQ6IGVudHJ5Lm4gPT09IHBlZWsubGluZSA/ICdyZ2JhKDM3LDk5LDIzNSwwLjA4KScgOiAndHJhbnNwYXJlbnQnIH19PlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyB3aWR0aDogNDAsIHRleHRBbGlnbjogJ3JpZ2h0JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGZsZXhTaHJpbms6IDAgfX0+e1N0cmluZyhlbnRyeS5uKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+e2VudHJ5LnRleHQgPT09ICcnID8gJ1xcdTAwQTAnIDogZW50cnkudGV4dH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG4iLCAiLyoqXG4gKiBcdTYzRDBcdTRFQTRcdThGNkVcdTZCMjFcdTgwNUFcdTdDN0JcdUZGMDhcdTVCQTJcdTYyMzdcdTdBRUZcdUZGMDlcdUZGMUFcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTUzRjBcdTc2ODRcdTRFMEJcdTYyQzlcdTY4NDZcdTYzMDlcdTMwMENcdTRFMDBcdThGNkVcdTVERTVcdTRGNUNcdTMwMERcdTUyMDZcdTdFQzRcdTVDNTVcdTc5M0FcdTMwMDJcbiAqIFx1NEUwRSBydW50aW1lL2hpc3RvcnkudHMgXHU3Njg0IGNsdXN0ZXJDb21taXRzIFx1NEZERFx1NjMwMVx1NTQwQ1x1NEUwMFx1NTQyRlx1NTNEMVx1NUYwRlx1RkYwOFYxLjAgXHUwMEE3OTcvXHUwMEE3OTlcdUZGMDlcdUZGMUFcbiAqIFx1NzZGOFx1OTBCQlx1NjNEMFx1NEVBNFx1NjVGNlx1OTVGNFx1OTVGNFx1OTY5NFx1OEQ4NVx1OEZDN1x1N0E5N1x1NTNFM1x1RkYwOFx1OUVEOFx1OEJBNCAzNmhcdUZGMDlcdTUyMDdcdTY1QURcdUZGMUJcdThGREVcdTdFRUQgXHUyMjY1MyBcdTRFMkFcdTYzRDBcdTRFQTRcdTU0MEVcdTRFMEVcdTVERjJcdTgwNUFcdTY1ODdcdTRFRjZcbiAqIFx1OTZGNlx1OTFDRFx1NTNFMFx1NEU1Rlx1NTIwN1x1NjVBRFx1MzAwMlx1NjcwRFx1NTJBMVx1N0FFRlx1OTBBM1x1NEVGRFx1NURFNVx1NEY1Q1x1NTcyOCBnaXQgXHU2MjZCXHU2M0NGXHU1QzQyXHVGRjA4XHU5MUNEXHU1RUZBXHU1Mzg2XHU1M0YyXHVGRjA5XHVGRjBDXHU4RkQ5XHU0RUZEXHU5NzYyXHU1NDExXG4gKiAvY29tbWl0cyBcdThGRDRcdTU2REVcdTc2ODRcdTYzRDBcdTRFQTRcdTY3NjFcdTc2RUVcdTIwMTRcdTIwMTRcdTRFMjRcdTU5MDRcdTg5QzRcdTUyMTlcdTY1MzlcdTUyQThcdTVGQzVcdTk4N0JcdTU0MENcdTZCNjVcdTMwMDJcbiAqXG4gKiBAbW9kdWxlIGRzaC1jbGllbnQtcHJvamVjdC1jb250cm9sL2NvbXBvbmVudHMvY29tbWl0LXJvdW5kc1xuICovXG5cbi8qKiBcdTgwNUFcdTdDN0JcdThGOTNcdTUxNjVcdTc2ODRcdTY3MDBcdTVDMEZcdTVGNjJcdTcyQjZcdUZGMDgvY29tbWl0cyBcdTc2ODRcdTYzRDBcdTRFQTRcdTY3NjFcdTc2RUVcdTVCNTBcdTk2QzZcdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBpbnRlcmZhY2UgUm91bmRDb21taXQge1xuICBzaGE6IHN0cmluZ1xuICAvKiogXHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0XHVGRjA4XHU2QkVCXHU3OUQyXHVGRjA5XHUzMDAyICovXG4gIGRhdGU6IG51bWJlclxuICAvKiogXHU2RDg5XHU1M0NBXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0XHVGRjA4XHU3NkY4XHU1QkY5XHU0RUQzXHU1RTkzXHU2ODM5XHVGRjA5XHUzMDAyICovXG4gIGZpbGVzOiBzdHJpbmdbXVxufVxuXG4vKiogXHU0RTAwXHU4RjZFXHU1REU1XHU0RjVDXHVGRjFBXHU0RkREXHU2MzAxXHU0RjIwXHU1MTY1XHU5ODdBXHU1RThGXHU3Njg0XHU2M0QwXHU0RUE0XHU1MjE3XHU4ODY4XHVGRjA4L2NvbW1pdHMgXHU0RTNBXHU2NUIwXHUyMTkyXHU2NUU3XHVGRjA5KyBcdTY1RjZcdTk1RjRcdTgzMDNcdTU2RjRcdTMwMDIgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0Um91bmQge1xuICBjb21taXRzOiBSb3VuZENvbW1pdFtdXG4gIC8qKiBcdThGNkVcdTUxODVcdTY3MDBcdTY1RTlcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdTMwMDIgKi9cbiAgZmlyc3RBdDogbnVtYmVyXG4gIC8qKiBcdThGNkVcdTUxODVcdTY3MDBcdTY2NUFcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdTMwMDIgKi9cbiAgbGFzdEF0OiBudW1iZXJcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUk9VTkRfR0FQX01TID0gMzYgKiA2MCAqIDYwICogMTAwMFxuXG4vKiogXHU0RTBFXHU2NzBEXHU1MkExXHU3QUVGIGNsdXN0ZXJDb21taXRzIFx1NzZGOFx1NTQwQ1x1NzY4NFx1OTFDRFx1NTNFMFx1NzM4N1x1RkYxQVx1NTQ3RFx1NEUyRFx1NjU4N1x1NEVGNlx1NjU3MCAvIG1heChcdTY3MkNcdTYzRDBcdTRFQTRcdTY1ODdcdTRFRjZcdTY1NzAsIDEpXHUzMDAyICovXG5mdW5jdGlvbiBvdmVybGFwUmF0aW8oZmlsZXM6IHN0cmluZ1tdLCBleGlzdGluZzogU2V0PHN0cmluZz4pOiBudW1iZXIge1xuICBpZiAoZXhpc3Rpbmcuc2l6ZSA9PT0gMCkgcmV0dXJuIDBcbiAgbGV0IGhpdHMgPSAwXG4gIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykgaWYgKGV4aXN0aW5nLmhhcyhmaWxlKSkgaGl0cyArPSAxXG4gIHJldHVybiBoaXRzIC8gTWF0aC5tYXgoZmlsZXMubGVuZ3RoLCAxKVxufVxuXG4vKipcbiAqIFx1NjI4QVx1RkYwOFx1NjVCMFx1MjE5Mlx1NjVFN1x1NjIxNlx1NjVFN1x1MjE5Mlx1NjVCMFx1NTc0N1x1NTNFRlx1RkYwOVx1OEZERVx1N0VFRFx1NjNEMFx1NEVBNFx1ODA1QVx1NjIxMFx1OEY2RVx1NkIyMVx1MzAwMlxuICogXHU2NUY2XHU5NUY0XHU5NUY0XHU5Njk0XHU1M0Q2XHU3RUREXHU1QkY5XHU1MDNDXHVGRjFBXHU1MjE3XHU4ODY4XHU5ODdBXHU1RThGXHU0RTBEXHU0RkREXHU4QkMxXHU2NUY2XHU5NUY0XHU2NUI5XHU1NDExXHUzMDAyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbHVzdGVySW50b1JvdW5kcyhjb21taXRzOiBSb3VuZENvbW1pdFtdLCBjbHVzdGVyR2FwTXM6IG51bWJlciA9IERFRkFVTFRfUk9VTkRfR0FQX01TKTogQ29tbWl0Um91bmRbXSB7XG4gIGNvbnN0IHJvdW5kczogQ29tbWl0Um91bmRbXSA9IFtdXG4gIGxldCBjdXJyZW50OiBSb3VuZENvbW1pdFtdID0gW11cbiAgbGV0IGN1cnJlbnRGaWxlcyA9IG5ldyBTZXQ8c3RyaW5nPigpXG5cbiAgY29uc3QgcHVzaFJvdW5kID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmIChjdXJyZW50Lmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgY29uc3QgdGltZXMgPSBjdXJyZW50Lm1hcCgoY29tbWl0KSA9PiBjb21taXQuZGF0ZSlcbiAgICByb3VuZHMucHVzaCh7IGNvbW1pdHM6IGN1cnJlbnQsIGZpcnN0QXQ6IE1hdGgubWluKC4uLnRpbWVzKSwgbGFzdEF0OiBNYXRoLm1heCguLi50aW1lcykgfSlcbiAgICBjdXJyZW50ID0gW11cbiAgICBjdXJyZW50RmlsZXMgPSBuZXcgU2V0KClcbiAgfVxuXG4gIGZvciAoY29uc3QgY29tbWl0IG9mIGNvbW1pdHMpIHtcbiAgICBjb25zdCBwcmV2aW91cyA9IGN1cnJlbnRbY3VycmVudC5sZW5ndGggLSAxXVxuICAgIGNvbnN0IGdhcEJyZWFrID0gcHJldmlvdXMgIT09IHVuZGVmaW5lZCAmJiBNYXRoLmFicyhjb21taXQuZGF0ZSAtIHByZXZpb3VzLmRhdGUpID4gY2x1c3RlckdhcE1zXG4gICAgY29uc3QgZmlsZUJyZWFrID0gY3VycmVudC5sZW5ndGggPj0gMyAmJiBvdmVybGFwUmF0aW8oY29tbWl0LmZpbGVzLCBjdXJyZW50RmlsZXMpID09PSAwXG4gICAgaWYgKGdhcEJyZWFrIHx8IGZpbGVCcmVhaykgcHVzaFJvdW5kKClcbiAgICBjdXJyZW50LnB1c2goY29tbWl0KVxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBjb21taXQuZmlsZXMpIGN1cnJlbnRGaWxlcy5hZGQoZmlsZSlcbiAgfVxuICBwdXNoUm91bmQoKVxuICByZXR1cm4gcm91bmRzXG59XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUxheW91dEVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSwgdXNlU3luY0V4dGVybmFsU3RvcmUgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgV29ya3NwYWNlRnJhbWUgfSBmcm9tICcuL1dvcmtzcGFjZUZyYW1lLnRzeCdcclxuXHJcbmludGVyZmFjZSBDdXJyZW50U2Vzc2lvbiB7XHJcbiAgZ2V0U25hcHNob3QoKTogeyBrZXk/OiBzdHJpbmcgfVxyXG4gIHN1YnNjcmliZShsaXN0ZW5lcjogKCkgPT4gdm9pZCk6ICgpID0+IHZvaWRcclxufVxyXG5cclxuaW50ZXJmYWNlIFBhbmVsSW5mbyB7XHJcbiAgZ2V0U25hcHNob3QoKTogeyBhY3RpdmVQYW5lbElkOiBzdHJpbmcgfCBudWxsIH1cclxuICBzdWJzY3JpYmUobGlzdGVuZXI6ICgpID0+IHZvaWQpOiAoKSA9PiB2b2lkXHJcbn1cclxuXHJcbmludGVyZmFjZSBNb2Rlcm5Xb3Jrc3BhY2VQcm9wcyB7XHJcbiAgY3VycmVudDogQ3VycmVudFNlc3Npb25cclxuICBwYW5lbEluZm86IFBhbmVsSW5mb1xyXG4gIGVuYWJsZWQ6IGJvb2xlYW5cclxuICBvbkRpc21pc3M6ICgpID0+IHZvaWRcclxufVxyXG5cclxuaW50ZXJmYWNlIEJvdW5kcyB7XHJcbiAgbGVmdDogbnVtYmVyXHJcbiAgdG9wOiBudW1iZXJcclxuICB3aWR0aDogbnVtYmVyXHJcbiAgaGVpZ2h0OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdvcmtzcGFjZUJvdW5kcyhmcmFtZTogQm91bmRzLCBjZW50ZXI6IEJvdW5kcywgY2hhdFdpZHRoOiBudW1iZXIpOiBCb3VuZHMgfCB1bmRlZmluZWQge1xyXG4gIGNvbnN0IGF2YWlsYWJsZSA9IE1hdGguZmxvb3IoY2VudGVyLndpZHRoKVxyXG4gIGlmIChhdmFpbGFibGUgPCA1NjAgfHwgY2VudGVyLmhlaWdodCA8PSAwKSByZXR1cm4gdW5kZWZpbmVkXHJcbiAgY29uc3QgY2hhdCA9IE1hdGgubWF4KDI4MCwgTWF0aC5taW4oY2hhdFdpZHRoLCBhdmFpbGFibGUgLSAyODApKVxyXG4gIHJldHVybiB7XHJcbiAgICBsZWZ0OiBjZW50ZXIubGVmdCAtIGZyYW1lLmxlZnQsXHJcbiAgICB0b3A6IGNlbnRlci50b3AgLSBmcmFtZS50b3AsXHJcbiAgICB3aWR0aDogYXZhaWxhYmxlIC0gY2hhdCxcclxuICAgIGhlaWdodDogY2VudGVyLmhlaWdodCxcclxuICB9XHJcbn1cclxuXHJcbi8qKiBcdTY1QjBcdTcyNDhcdTVCQkZcdTRFM0JcdTc2ODRcdTUyQTBcdTZDRDVcdTZENkVcdTVDNDJcdUZGMUJcdTRFQzVcdTUzOEJcdTdGMjlcdTRGMUFcdThCRERcdTUyMTdcdUZGMENcdTRFMERcdTY1MzlcdTUzRDhcdTVCOThcdTY1QjlcdTUzRjNcdTRGQTdcdTY4MEZcdTYyMTZcdTdGNTFcdTY4M0NcdTZBMjFcdTY3N0ZcdTMwMDIgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE1vZGVybldvcmtzcGFjZSh7IGN1cnJlbnQsIHBhbmVsSW5mbywgZW5hYmxlZCwgb25EaXNtaXNzIH06IE1vZGVybldvcmtzcGFjZVByb3BzKSB7XHJcbiAgY29uc3Qgc2Vzc2lvbklkID0gdXNlU3luY0V4dGVybmFsU3RvcmUoXHJcbiAgICAobGlzdGVuZXIpID0+IGN1cnJlbnQuc3Vic2NyaWJlKGxpc3RlbmVyKSxcclxuICAgICgpID0+IGN1cnJlbnQuZ2V0U25hcHNob3QoKS5rZXksXHJcbiAgKVxyXG4gIGNvbnN0IGFjdGl2ZVBhbmVsSWQgPSB1c2VTeW5jRXh0ZXJuYWxTdG9yZShcclxuICAgIChsaXN0ZW5lcikgPT4gcGFuZWxJbmZvLnN1YnNjcmliZShsaXN0ZW5lciksXHJcbiAgICAoKSA9PiBwYW5lbEluZm8uZ2V0U25hcHNob3QoKS5hY3RpdmVQYW5lbElkLFxyXG4gIClcclxuICBjb25zdCB2aXNpYmxlID0gZW5hYmxlZCAmJiBhY3RpdmVQYW5lbElkID09PSBudWxsXHJcbiAgY29uc3QgZHJhZ0NsZWFudXAgPSB1c2VSZWY8KCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkPigpXHJcbiAgY29uc3QgW2JvdW5kcywgc2V0Qm91bmRzXSA9IHVzZVN0YXRlPEJvdW5kcyB8IHVuZGVmaW5lZD4oKVxyXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiAoKSA9PiB7IGRyYWdDbGVhbnVwLmN1cnJlbnQ/LigpIH0sIFt2aXNpYmxlXSlcclxuICBjb25zdCBbY2hhdFdpZHRoLCBzZXRDaGF0V2lkdGhdID0gdXNlU3RhdGUoKCkgPT4ge1xyXG4gICAgY29uc3Qgc2F2ZWQgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BjLmNoYXRXaWR0aCcpID8/ICcnKVxyXG4gICAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShzYXZlZCkgJiYgc2F2ZWQgPj0gMjgwID8gc2F2ZWQgOiAzNjBcclxuICB9KVxyXG5cclxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCF2aXNpYmxlKSByZXR1cm5cclxuICAgIGNvbnN0IHJpZ2h0YmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJ1tkYXRhLXJpZ2h0YmFyLWNvbF0nKVxyXG4gICAgY29uc3QgZnJhbWUgPSByaWdodGJhcj8ucGFyZW50RWxlbWVudFxyXG4gICAgY29uc3QgY2VudGVycyA9IGZyYW1lPy5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PignOnNjb3BlID4gZGl2W2NsYXNzKj1cImNlbnRlckNvbFwiXScpXHJcbiAgICBpZiAoZnJhbWUgPT09IHVuZGVmaW5lZCB8fCBmcmFtZSA9PT0gbnVsbCB8fCBjZW50ZXJzPy5sZW5ndGggIT09IDEpIHtcclxuICAgICAgb25EaXNtaXNzKClcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCBjZW50ZXIgPSBjZW50ZXJzWzBdIVxyXG4gICAgY29uc3Qgb2xkUGFkZGluZyA9IGNlbnRlci5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLWxlZnQnKVxyXG4gICAgY29uc3Qgb2xkUGFkZGluZ1ByaW9yaXR5ID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5UHJpb3JpdHkoJ3BhZGRpbmctbGVmdCcpXHJcbiAgICBjb25zdCBvbGRCb3hTaXppbmcgPSBjZW50ZXIuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnYm94LXNpemluZycpXHJcbiAgICBjb25zdCBvbGRCb3hTaXppbmdQcmlvcml0eSA9IGNlbnRlci5zdHlsZS5nZXRQcm9wZXJ0eVByaW9yaXR5KCdib3gtc2l6aW5nJylcclxuICAgIGxldCBhcHBsaWVkUGFkZGluZyA9ICcnXHJcbiAgICBsZXQgYWN0aXZlID0gdHJ1ZVxyXG5cclxuICAgIGNvbnN0IHVwZGF0ZSA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgaWYgKCFhY3RpdmUpIHJldHVyblxyXG4gICAgICBjb25zdCBuZXh0ID0gd29ya3NwYWNlQm91bmRzKGZyYW1lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBjZW50ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIGNoYXRXaWR0aClcclxuICAgICAgaWYgKG5leHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG9uRGlzbWlzcygpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcGFkZGluZyA9IGAke25leHQud2lkdGh9cHhgXHJcbiAgICAgIGlmIChwYWRkaW5nICE9PSBhcHBsaWVkUGFkZGluZykge1xyXG4gICAgICAgIGNlbnRlci5zdHlsZS5zZXRQcm9wZXJ0eSgncGFkZGluZy1sZWZ0JywgcGFkZGluZywgJ2ltcG9ydGFudCcpXHJcbiAgICAgICAgYXBwbGllZFBhZGRpbmcgPSBwYWRkaW5nXHJcbiAgICAgIH1cclxuICAgICAgY2VudGVyLnN0eWxlLnNldFByb3BlcnR5KCdib3gtc2l6aW5nJywgJ2JvcmRlci1ib3gnLCAnaW1wb3J0YW50JylcclxuICAgICAgc2V0Qm91bmRzKChwcmV2aW91cykgPT4gcHJldmlvdXM/LmxlZnQgPT09IG5leHQubGVmdCAmJiBwcmV2aW91cy50b3AgPT09IG5leHQudG9wICYmIHByZXZpb3VzLndpZHRoID09PSBuZXh0LndpZHRoICYmIHByZXZpb3VzLmhlaWdodCA9PT0gbmV4dC5oZWlnaHQgPyBwcmV2aW91cyA6IG5leHQpXHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNpemUgPSBuZXcgUmVzaXplT2JzZXJ2ZXIodXBkYXRlKVxyXG4gICAgcmVzaXplLm9ic2VydmUoZnJhbWUpXHJcbiAgICByZXNpemUub2JzZXJ2ZShjZW50ZXIpXHJcbiAgICBjb25zdCBtdXRhdGlvbnMgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgIGlmICghZnJhbWUuaGFzQXR0cmlidXRlKCdkYXRhLXJpZ2h0YmFyLWNvbGxhcHNlZCcpKSBvbkRpc21pc3MoKVxyXG4gICAgICBlbHNlIHVwZGF0ZSgpXHJcbiAgICB9KVxyXG4gICAgbXV0YXRpb25zLm9ic2VydmUoZnJhbWUsIHsgYXR0cmlidXRlczogdHJ1ZSwgYXR0cmlidXRlRmlsdGVyOiBbJ2RhdGEtcmlnaHRiYXItY29sbGFwc2VkJ10gfSlcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGUpXHJcbiAgICB1cGRhdGUoKVxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgYWN0aXZlID0gZmFsc2VcclxuICAgICAgcmVzaXplLmRpc2Nvbm5lY3QoKVxyXG4gICAgICBtdXRhdGlvbnMuZGlzY29ubmVjdCgpXHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGUpXHJcbiAgICAgIGlmIChjZW50ZXIuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1sZWZ0JykgPT09IGFwcGxpZWRQYWRkaW5nKSB7XHJcbiAgICAgICAgaWYgKG9sZFBhZGRpbmcgPT09ICcnKSBjZW50ZXIuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmctbGVmdCcpXHJcbiAgICAgICAgZWxzZSBjZW50ZXIuc3R5bGUuc2V0UHJvcGVydHkoJ3BhZGRpbmctbGVmdCcsIG9sZFBhZGRpbmcsIG9sZFBhZGRpbmdQcmlvcml0eSlcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2VudGVyLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2JveC1zaXppbmcnKSA9PT0gJ2JvcmRlci1ib3gnKSB7XHJcbiAgICAgICAgaWYgKG9sZEJveFNpemluZyA9PT0gJycpIGNlbnRlci5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnYm94LXNpemluZycpXHJcbiAgICAgICAgZWxzZSBjZW50ZXIuc3R5bGUuc2V0UHJvcGVydHkoJ2JveC1zaXppbmcnLCBvbGRCb3hTaXppbmcsIG9sZEJveFNpemluZ1ByaW9yaXR5KVxyXG4gICAgICB9XHJcbiAgICAgIHNldEJvdW5kcyh1bmRlZmluZWQpXHJcbiAgICB9XHJcbiAgfSwgW3Zpc2libGUsIGNoYXRXaWR0aCwgb25EaXNtaXNzXSlcclxuXHJcbiAgaWYgKCF2aXNpYmxlIHx8IGJvdW5kcyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbFxyXG5cclxuICBjb25zdCBvbkRpdmlkZXJEb3duID0gKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQpOiB2b2lkID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnN0IG9uTW92ZSA9IChtb3ZlOiBQb2ludGVyRXZlbnQpOiB2b2lkID0+IHtcclxuICAgICAgY29uc3QgZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignW2RhdGEtcmlnaHRiYXItY29sXScpPy5wYXJlbnRFbGVtZW50XHJcbiAgICAgIGNvbnN0IGNlbnRlciA9IGZyYW1lPy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignOnNjb3BlID4gZGl2W2NsYXNzKj1cImNlbnRlckNvbFwiXScpXHJcbiAgICAgIGlmIChjZW50ZXIgPT09IHVuZGVmaW5lZCB8fCBjZW50ZXIgPT09IG51bGwpIHJldHVyblxyXG4gICAgICBjb25zdCB3aWR0aCA9IE1hdGgubWF4KDI4MCwgTWF0aC5taW4oOTAwLCBNYXRoLnJvdW5kKGNlbnRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5yaWdodCAtIG1vdmUuY2xpZW50WCkpKVxyXG4gICAgICBzZXRDaGF0V2lkdGgod2lkdGgpXHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYy5jaGF0V2lkdGgnLCBTdHJpbmcod2lkdGgpKVxyXG4gICAgfVxyXG4gICAgY29uc3Qgb25VcCA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKVxyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcClcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJjYW5jZWwnLCBvblVwKVxyXG4gICAgICBkcmFnQ2xlYW51cC5jdXJyZW50ID0gdW5kZWZpbmVkXHJcbiAgICB9XHJcbiAgICBkcmFnQ2xlYW51cC5jdXJyZW50Py4oKVxyXG4gICAgZHJhZ0NsZWFudXAuY3VycmVudCA9IG9uVXBcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSlcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJjYW5jZWwnLCBvblVwKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgZGF0YS10ZXN0aWQ9XCJwcm9qZWN0LWNvbnRyb2wtbW9kZXJuLXdvcmtzcGFjZVwiIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCAuLi5ib3VuZHMsIHBvaW50ZXJFdmVudHM6ICdhdXRvJyB9fT5cclxuICAgICAgPFdvcmtzcGFjZUZyYW1lIGtleT17c2Vzc2lvbklkID8/ICdsYW5kaW5nJ30gey4uLihzZXNzaW9uSWQgPT09IHVuZGVmaW5lZCA/IHt9IDogeyBzZXNzaW9uSWQgfSl9IGxheW91dE1vZGU9XCJvdmVybGF5XCIgLz5cclxuICAgICAgPGRpdiBkYXRhLXRlc3RpZD1cInByb2plY3QtY29udHJvbC1tb2Rlcm4tZGl2aWRlclwiIG9uUG9pbnRlckRvd249e29uRGl2aWRlckRvd259IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IC00LCB3aWR0aDogOCwgY3Vyc29yOiAnY29sLXJlc2l6ZScsIHpJbmRleDogMjAgfX0gLz5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBaUJBLElBQUFBLGdCQUFrQjs7O0FDTmxCLG1CQUFrQjs7O0FDTVgsU0FBUyxXQUFXLE9BQWdEO0FBQ3pFLFFBQU0sTUFBTSxvQkFBb0IsS0FBSyxLQUFLO0FBQzFDLE1BQUksUUFBUSxNQUFNO0FBQ2hCLFVBQU0sUUFBUSxPQUFPLFNBQVMsSUFBSSxDQUFDLEdBQUksRUFBRTtBQUN6QyxXQUFPLENBQUUsU0FBUyxLQUFNLEtBQU0sU0FBUyxJQUFLLEtBQUssUUFBUSxHQUFHO0FBQUEsRUFDOUQ7QUFDQSxRQUFNLGFBQWEsc0RBQXNELEtBQUssS0FBSztBQUNuRixNQUFJLGVBQWUsTUFBTTtBQUN2QixXQUFPLENBQUMsT0FBTyxXQUFXLENBQUMsQ0FBQyxHQUFHLE9BQU8sV0FBVyxDQUFDLENBQUMsR0FBRyxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFBQSxFQUM3RTtBQUNBLFNBQU87QUFDVDtBQUdPLFNBQVMsa0JBQWtCLEdBQVcsR0FBVyxHQUFtQjtBQUN6RSxRQUFNLFVBQVUsQ0FBQyxVQUEwQjtBQUN6QyxVQUFNLElBQUksUUFBUTtBQUNsQixXQUFPLEtBQUssVUFBVSxJQUFJLFVBQVUsSUFB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ZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsZ0JBQWdCO0FBQUEsSUFDaEIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsd0JBQXdCO0FBQUEsSUFDeEIscUJBQXFCO0FBQUEsSUFDckIsNEJBQTRCO0FBQUEsSUFFNUIsZUFBZTtBQUFBLElBQ2Ysc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsd0JBQXdCO0FBQUEsSUFDeEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIseUJBQXlCO0FBQUEsSUFDekIsMEJBQTBCO0FBQUEsSUFDMUIsMkJBQTJCO0FBQUEsSUFFM0Isa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFFaEIsZUFBZTtBQUFBLElBQ2YsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsYUFBYTtBQUFBLElBQ2IsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBRWYsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIscUJBQXFCO0FBQUEsSUFDckIsa0JBQWtCO0FBQUEsSUFDbEIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUEsSUFDekIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsa0JBQWtC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
