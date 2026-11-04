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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NsaWVudC9pbmRleC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdGhlbWUudHMiLCAiLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmtzcGFjZUZyYW1lLnRzeCIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvY29tbWl0LXJvdW5kcy50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvTW9kZXJuV29ya3NwYWNlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXHJcbiAqIENsaWVudCBwbHVnaW4gZW50cnkgZm9yIGRzaC1wcm9qZWN0LWNvbnRyb2wuXHJcbiAqXHJcbiAqIFx1NUUwM1x1NUM0MFx1NjdCNlx1Njc4NFx1RkYwOFx1NURGMlx1OUE4Q1x1OEJDMVx1RkYwQzIwMjYtMDgtMzBcdUZGMDlcdUZGMUFcclxuICogLSBcdTVERTVcdTRGNUNcdTUzRjBcdTkwNkVcdTg1M0RcdTVCOThcdTY1QjkgYGRldGFpbHNgIFx1NjlGRFx1RkYwOHByaW9yaXR5IC0xMFx1RkYwQ1x1NUI5OFx1NjVCOSBEZXRhaWxzUGFuZWwgXHU3NTU5XHU1NzI4XHU4RDI2XHU2NzJDXHU0RTBBXHVGRjBDXHJcbiAqICAgXHU1Mzc4XHU4RjdEXHU2MjExXHU0RUVDXHU3Njg0XHU2Q0U4XHU1MThDXHU1MzczXHU2MDYyXHU1OTBEXHVGRjA5XHVGRjBDXHU2RTMyXHU2N0QzXHU1NzI4XHU0RTNCXHU2ODQ2XHU2N0I2IGRldGFpbHMgXHU1MjE3XHVGRjFCXHJcbiAqIC0gV29ya3NwYWNlRnJhbWUgXHU2Q0U4XHU1MTY1XHU2ODM3XHU1RjBGXHU4ODY4XHVGRjBDXHU2MjhBXHU1Qjk4XHU2NUI5XHU3RjUxXHU2ODNDXHU4OUM2XHU4OUM5XHU2MzYyXHU1MjE3XHVGRjFBXHU4MDRBXHU1OTI5XHVGRjA4Y2VudGVyQ29sXHVGRjA5XHU2NzAwXHU1M0YzXHUzMDAxXHJcbiAqICAgXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4ZGV0YWlsc0NvbFx1RkYwOVx1NUM0NVx1NEUyRCAxZnJcdUZGMUJcdTY1RTBcdTRGMUFcdThCRERcdTg0M0RcdTU3MzBcdTk4NzVcdUZGMDhkYXRhLWRldGFpbHMtY29sbGFwc2VkXHVGRjA5XHJcbiAqICAgXHU4MUVBXHU1MkE4XHU2MDYyXHU1OTBEXHU1MzlGXHU3NTFGXHU1MjE3XHU1RThGXHVGRjFCXHJcbiAqIC0gXHU1REU2XHU0RkE3XHU1Qjk4XHU2NUI5XHU1QkZDXHU4MjJBXHUzMDAxXHU1Qjk4XHU2NUI5XHU4MDRBXHU1OTI5XHU2NzJDXHU0RjUzXHU5NkY2XHU2NTM5XHU1MkE4XHVGRjFCXHJcbiAqIC0gXHU0RkE3XHU4RkI5XHU2ODBGXHU2MzA5XHU5NEFFXHU1NzI4XHUzMDBDXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1M0YwIFx1MjFDNCBcdTVCOThcdTY1QjlcdThCRTZcdTYwQzVcdTk3NjJcdTY3N0ZcdTMwMERcdTk1RjRcdTUyMDdcdTYzNjJcdUZGMDhcdTUzRUZcdTkwMDZcdUZGMDlcdUZGMUJcclxuICogLSBgdG9vbC5jYWxsLnRvb2x2aWV3YCBcdTRFM0EgYW5hbHl6ZV9jaGFuZ2UgXHU0RkREXHU3NTU5XHU0RTEzXHU1QzVFXHU1MzYxXHU3MjQ3XHVGRjFCXHJcbiAqIC0gXHU2NTg3XHU2ODQ4XHU1MTY4XHU5MEU4XHU3RUNGIGN0eC5sb2NhbGUgXHU4QkNEXHU1MTc4XHVGRjA4emggLyBlblx1RkYwOVx1MzAwMlxyXG4gKlxyXG4gKiBAbW9kdWxlIGRzaC1jbGllbnQtcHJvamVjdC1jb250cm9sXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBDaGFuZ2VDYXJkIH0gZnJvbSAnLi9jb21wb25lbnRzL0NoYW5nZUNhcmQudHMnXHJcbmltcG9ydCB7IFdPUktTUEFDRV9ESUNULCBXb3Jrc3BhY2VGcmFtZSB9IGZyb20gJy4vY29tcG9uZW50cy9Xb3Jrc3BhY2VGcmFtZS50c3gnXHJcbmltcG9ydCB7IE1vZGVybldvcmtzcGFjZSB9IGZyb20gJy4vY29tcG9uZW50cy9Nb2Rlcm5Xb3Jrc3BhY2UudHN4J1xyXG5cclxuY29uc3QgTlMgPSAncHJvamVjdC1jb250cm9sJ1xyXG5cclxuZXhwb3J0IGNvbnN0IG5hbWUgPSAnY2xpZW50LXByb2plY3QtY29udHJvbCdcclxuZXhwb3J0IGNvbnN0IGluamVjdCA9IFsnc2xvdHMnLCAnbG9jYWxlJywgJ2xheW91dCddXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoY3R4OiBhbnkpOiB2b2lkIHtcclxuICBjdHguZWZmZWN0KCgpID0+IGN0eC5sb2NhbGUucmVnaXN0ZXIoTlMsIHsgemg6IFdPUktTUEFDRV9ESUNULnpoLCBlbjogV09SS1NQQUNFX0RJQ1QuZW4gfSksICdwcm9qZWN0LWNvbnRyb2w6IGRpY3Rpb25hcmllcycpXHJcbiAgY29uc3QgbGF5b3V0ID0gY3R4LmxheW91dFxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgMS4gXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1M0YwXHVGRjFBXHU5MDZFXHU4NTNEIGRldGFpbHMgXHU2OUZEXHVGRjA4XHU1M0VGXHU5MDA2XHVGRjA5XHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgLy8gXHU2NUIwXHU3QTk3XHU1M0UzXHU5RUQ4XHU4QkE0XHU0RTBEXHU2NjNFXHU3OTNBXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4XHU0RkREXHU2MzAxXHU1Qjk4XHU2NUI5XHU1MzlGXHU3NTFGXHU4OUM2XHU4OUQyXHVGRjA5XHVGRjBDXHU3NTMxXHU0RkE3XHU4RkI5XHU2ODBGXHU2MzA5XHU5NEFFXHU2NjNFXHU1RjBGXHU2MjUzXHU1RjAwXHUzMDAyXHJcbiAgbGV0IHdvcmtzcGFjZUVuYWJsZWQgPSBmYWxzZVxyXG4gIGxldCBkaXNwb3NlV29ya3NwYWNlOiAoKCkgPT4gdm9pZCkgfCB1bmRlZmluZWRcclxuXHJcbiAgY29uc3QgcmVnaXN0ZXJXb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBkaXNwb3NlV29ya3NwYWNlID0gY3R4LnNsb3RzLnJlZ2lzdGVyKFxyXG4gICAgICB7XHJcbiAgICAgICAgbmFtZTogJ2RldGFpbHMnLFxyXG4gICAgICAgIHByaW9yaXR5OiAtMTAsXHJcbiAgICAgICAgbG9jYWxlOiBOUyxcclxuICAgICAgfSxcclxuICAgICAgLy8gXHU2MzAyXHU4RjdEXHU1MzczXHU2MjUzXHU1RjAwIGRldGFpbHMgXHU4RjY4XHU5MDUzXHVGRjA4XHU5NzYyXHU2NzdGXHU1MDRGXHU1OTdEXHU5RUQ4XHU4QkE0IDBcdUZGMDlcdUZGMUFcdTVERTVcdTRGNUNcdTUzRjBcdTk3MDBcdTg5ODFcdTc3MUZcdTVCOUVcdTVCQkRcdTVFQTZcdUZGMUJcclxuICAgICAgLy8gXHU2NUUwXHU0RjFBXHU4QkREXHU4NDNEXHU1NzMwXHU5ODc1XHU4RjY4XHU5MDUzXHU2MDUyIDBcdUZGMENcdTU5MjlcdTcxMzZcdTRGRERcdTYzMDFcdTUzOUZcdTc1MUZcdTgyRjFcdTk2QzRcdTk4NzVcdTVFMDNcdTVDNDBcdTMwMDJcclxuICAgICAgLy8gXHU0RjFBXHU4QkREXHU1MjA3XHU2MzYyXHU2NUY2XHU1Qjk4XHU2NUI5XHU0RjFBIGNsb3NlRGV0YWlscyBcdTIwMTRcdTIwMTQgXHU1RUY2XHU1NDBFXHU0RTAwXHU2MkNEXHU5MUNEXHU2NUIwXHU2NDkxXHU1RjAwXHVGRjA4XHU1QjhGXHU0RUZCXHU1MkExXHU2NjVBXHU0RThFXHU3MjM2XHU3RUE3IGVmZmVjdFx1RkYwOVx1MzAwMlxyXG4gICAgICAocHJvcHM6IGFueSkgPT4ge1xyXG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgICBsYXlvdXQ/Lm9wZW5EZXRhaWxzPy4oKVxyXG4gICAgICAgIH0sIFtdKVxyXG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgICBpZiAocHJvcHMuc2Vzc2lvbklkID09PSB1bmRlZmluZWQpIHJldHVyblxyXG4gICAgICAgICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IGxheW91dD8ub3BlbkRldGFpbHM/LigpLCAwKVxyXG4gICAgICAgICAgcmV0dXJuICgpID0+IHsgY2xlYXJUaW1lb3V0KHRpbWVyKSB9XHJcbiAgICAgICAgfSwgW3Byb3BzLnNlc3Npb25JZF0pXHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoV29ya3NwYWNlRnJhbWUsIHsgLi4ucHJvcHMsIGtleTogcHJvcHMuc2Vzc2lvbklkID8/ICdsYW5kaW5nJywgbGF5b3V0IH0pXHJcbiAgICAgIH0sXHJcbiAgICApXHJcbiAgfVxyXG4gIGNvbnN0IHVucmVnaXN0ZXJXb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBkaXNwb3NlV29ya3NwYWNlPy4oKVxyXG4gICAgZGlzcG9zZVdvcmtzcGFjZSA9IHVuZGVmaW5lZFxyXG4gIH1cclxuXHJcbiAgY3R4LnNsb3RzLmluamVjdCgnZGV0YWlscycsICgpID0+IHtcclxuICAgIGlmICh3b3Jrc3BhY2VFbmFibGVkKSByZWdpc3RlcldvcmtzcGFjZSgpXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB1bnJlZ2lzdGVyV29ya3NwYWNlKClcclxuICAgIH1cclxuICB9KVxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgMi4gXHU0RkE3XHU4RkI5XHU2ODBGXHU1RTk1XHU5MEU4XHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwIFx1MjFDNCBcdTVCOThcdTY1QjlcdThCRTZcdTYwQzUgXHU1MjA3XHU2MzYyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIC8vIFx1NjMwOVx1OTRBRVx1NzJCNlx1NjAwMVx1NjYwRVx1NzkzQVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1NjYzRVx1NzkzQVx1NEUyRCBcdTIxOTIgXHUzMDBDXHVEODNFXHVEREVEIFx1NURFNVx1NEY1Q1x1NTNGMCBcdTI3MTNcdTMwMERcdUZGMUJcdTVERjJcdTUyMDdcdTVCOThcdTY1QjlcdThCRTZcdTYwQzUgXHUyMTkyIFx1MzAwQ1x1RDgzRVx1RERFRCBcdTYyNTNcdTVGMDBcdTVERTVcdTRGNUNcdTUzRjBcdTMwMERcdTlBRDhcdTRFQUVcdUZGMENcclxuICAvLyBcdTc1MjhcdTYyMzdcdTk2OEZcdTY1RjZcdTc3MEJcdTVGOTdcdTUyMzBcdTYwMEVcdTRFNDhcdTUyMDdcdTU2REVcdTY3NjVcdUZGMDhcdTUyMDdcdTYzNjJcdTdFQ0Ygd2luZG93IFx1NEU4Qlx1NEVGNlx1OTAxQVx1NzdFNVx1NjMwOVx1OTRBRVx1OTFDRFx1NkUzMlx1NjdEM1x1RkYwOVx1MzAwMlxyXG4gIGNvbnN0IFRPR0dMRV9FVkVOVCA9ICdwYy13b3Jrc3BhY2UtdG9nZ2xlJ1xyXG4gIGNvbnN0IGZpcmVUb2dnbGUgPSAoZW5hYmxlZDogYm9vbGVhbik6IHZvaWQgPT4ge1xyXG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFRPR0dMRV9FVkVOVCwgeyBkZXRhaWw6IGVuYWJsZWQgfSkpXHJcbiAgfVxyXG4gIGNvbnN0IGRpc21pc3NNb2Rlcm5Xb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBpZiAoIXdvcmtzcGFjZUVuYWJsZWQpIHJldHVyblxyXG4gICAgd29ya3NwYWNlRW5hYmxlZCA9IGZhbHNlXHJcbiAgICBmaXJlVG9nZ2xlKGZhbHNlKVxyXG4gIH1cclxuXHJcbiAgLy8gMC4yLnggXHU3Njg0XHU0RjFBXHU4QkREXHU2NzBEXHU1MkExXHU1M0VGXHU5MDA5XHU2Q0U4XHU1MTY1XHVGRjFBXHU2NUU3XHU3MjQ4XHU2Q0ExXHU2NzA5XHU2NUIwXHU3MjQ4XHU1RTAzXHU1QzQwXHU2M0E1XHU1M0UzXHVGRjBDXHU0RUNEXHU2Q0JGXHU3NTI4IGRldGFpbHMgXHU1MjA2XHU2NTJGXHUzMDAyXHJcbiAgY3R4LmluamVjdChbJ3VpU2Vzc2lvbiddLCAoc2NvcGU6IGFueSkgPT4ge1xyXG4gICAgaWYgKGxheW91dC5wYW5lbEluZm8gPT09IHVuZGVmaW5lZCkgcmV0dXJuXHJcbiAgICBjb25zdCBjdXJyZW50ID0gc2NvcGUudWlTZXNzaW9uLmFkYXB0ZXIuY3VycmVudFxyXG4gICAgc2NvcGUuc2xvdHMuaW5qZWN0KCdzaGVsbC5vdmVybGF5JywgKCkgPT4gc2NvcGUuc2xvdHMucmVnaXN0ZXIoe1xyXG4gICAgICBuYW1lOiAnc2hlbGwub3ZlcmxheScsIGlkOiAncHJvamVjdC1jb250cm9sLXdvcmtzcGFjZScsXHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IFtlbmFibGVkLCBzZXRFbmFibGVkXSA9IFJlYWN0LnVzZVN0YXRlKHdvcmtzcGFjZUVuYWJsZWQpXHJcbiAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IChldmVudDogRXZlbnQpOiB2b2lkID0+IHsgc2V0RW5hYmxlZCgoZXZlbnQgYXMgQ3VzdG9tRXZlbnQ8Ym9vbGVhbj4pLmRldGFpbCkgfVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFRPR0dMRV9FVkVOVCwgaGFuZGxlcilcclxuICAgICAgICByZXR1cm4gKCkgPT4geyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpIH1cclxuICAgICAgfSwgW10pXHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGVybldvcmtzcGFjZSwgeyBjdXJyZW50LCBwYW5lbEluZm86IGxheW91dC5wYW5lbEluZm8sIGVuYWJsZWQsIG9uRGlzbWlzczogZGlzbWlzc01vZGVybldvcmtzcGFjZSB9KVxyXG4gICAgfSkpXHJcbiAgfSlcclxuXHJcbiAgY3R4LnNsb3RzLmluamVjdCgnc2lkZWJhci5mb290ZXIuYWN0aW9uJywgKCkgPT4ge1xyXG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XHJcbiAgICAgIG5hbWU6ICdzaWRlYmFyLmZvb3Rlci5hY3Rpb24nLFxyXG4gICAgICBpZDogJ3Byb2plY3QtY29udHJvbC10b2dnbGUnLFxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICBjb25zdCBbZW5hYmxlZCwgc2V0RW5hYmxlZF0gPSBSZWFjdC51c2VTdGF0ZSh3b3Jrc3BhY2VFbmFibGVkKVxyXG4gICAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQ6IEV2ZW50KTogdm9pZCA9PiB7IHNldEVuYWJsZWQoKGV2ZW50IGFzIEN1c3RvbUV2ZW50PGJvb2xlYW4+KS5kZXRhaWwpIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoVE9HR0xFX0VWRU5ULCBoYW5kbGVyKSB9XHJcbiAgICAgIH0sIFtdKVxyXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgICAnYnV0dG9uJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAnZGF0YS10ZXN0aWQnOiAncHJvamVjdC1jb250cm9sLXNpZGViYXItdG9nZ2xlJyxcclxuICAgICAgICAgIHRpdGxlOiBlbmFibGVkID8gJ1x1NUY1M1x1NTI0RFx1NjYzRVx1NzkzQVx1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMFx1MzAwMlx1NzBCOVx1NTFGQlx1NTNFRlx1NEUzNFx1NjVGNlx1NTIwN1x1NjM2Mlx1NEUzQVx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1RkYwOFx1NjdFNVx1NzcwQlx1NURFNVx1NTE3N1x1OEMwM1x1NzUyOFx1NzY4NFx1NUI4Q1x1NjU3NFx1OEY5M1x1NTE2NS9cdThGOTNcdTUxRkFcdUZGMDlcdUZGMUJcdTUxOERcdTcwQjlcdTY3MkNcdTYzMDlcdTk0QUVcdTUzNzNcdTYwNjJcdTU5MERcdTMwMDInIDogJ1x1NUY1M1x1NTI0RFx1NjYzRVx1NzkzQVx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1MzAwMlx1NzBCOVx1NTFGQlx1NjA2Mlx1NTkwRFx1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMFx1MzAwMicsXHJcbiAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc2cHgnLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEwcHgnLCBmb250U2l6ZTogJzEycHgnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICBjb2xvcjogZW5hYmxlZCA/ICdpbmhlcml0JyA6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiBlbmFibGVkID8gNDAwIDogNjAwLFxyXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJywgb3BhY2l0eTogMC45LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgd29ya3NwYWNlRW5hYmxlZCA9ICF3b3Jrc3BhY2VFbmFibGVkXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBsYXlvdXQ/Lm9wZW5EZXRhaWxzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAod29ya3NwYWNlRW5hYmxlZCAmJiBkaXNwb3NlV29ya3NwYWNlID09PSB1bmRlZmluZWQpIHJlZ2lzdGVyV29ya3NwYWNlKClcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCF3b3Jrc3BhY2VFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgIHVucmVnaXN0ZXJXb3Jrc3BhY2UoKVxyXG4gICAgICAgICAgICAgICAgICBsYXlvdXQ/LmNsb3NlRGV0YWlscz8uKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdvcmtzcGFjZUVuYWJsZWQgJiYgbGF5b3V0LnBhbmVsSW5mbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGF5b3V0LnBhbmVsSW5mby5nZXRTbmFwc2hvdCgpLmFjdGl2ZVBhbmVsSWQgIT09IG51bGwpIGxheW91dC5zZWxlY3RQYW5lbChudWxsKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmlnaHRiYXIgPSBjdHguZ2V0KCdzaWRlYmFyUmlnaHQnKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0YmFyPy5pc0V4cGFuZGVkKCkpIHJpZ2h0YmFyLnRvZ2dsZUV4cGFuZGVkKClcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgICAgICAgICAgd29ya3NwYWNlRW5hYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdbcHJvamVjdC1jb250cm9sXSB3b3Jrc3BhY2UgdG9nZ2xlIGZhaWxlZCcsIGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmVUb2dnbGUod29ya3NwYWNlRW5hYmxlZClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbmFibGVkID8gJ1x1RDgzRVx1RERFRCBcdTVERTVcdTRGNUNcdTUzRjAgXHUyNzEzJyA6ICdcdUQ4M0VcdURERUQgXHU2MjUzXHU1RjAwXHU1REU1XHU0RjVDXHU1M0YwJyxcclxuICAgICAgKVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgMy4gXHU4MDRBXHU1OTI5XHU1REU1XHU1MTc3XHU1MzYxXHU3MjQ3XHVGRjA4XHU2MjY3XHU4ODRDL1x1OEJDNFx1NUJBMS9cdTlBOENcdTY1MzZcdUZGMDlcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBzaW1wbGVSZXN1bHRDYXJkID0gKHRpdGxlOiBzdHJpbmcpOiAoKHByb3BzOiBhbnkpID0+IGFueSkgPT4gKHByb3BzOiBhbnkpID0+IHtcclxuICAgIGNvbnN0IG91dHB1dCA9IHByb3BzPy5vdXRwdXRcclxuICAgIGNvbnN0IHRleHQgPSB0eXBlb2Ygb3V0cHV0ID09PSAnc3RyaW5nJ1xyXG4gICAgICA/IG91dHB1dFxyXG4gICAgICA6IG91dHB1dD8uc3VtbWFyeSA/PyBvdXRwdXQ/Lmlzc3VlcyA/PyBvdXRwdXQ/LmRldGFpbHMgPz8gKG91dHB1dCA/IEpTT04uc3RyaW5naWZ5KG91dHB1dCwgbnVsbCwgMikgOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHUyMDI2JylcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAge1xyXG4gICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgIHBhZGRpbmc6ICcxMHB4IDEycHgnLFxyXG4gICAgICAgICAgbWFyZ2luOiAnNHB4IDAnLFxyXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXHJcbiAgICAgICAgICBmb250U2l6ZTogJzEycHgnLFxyXG4gICAgICAgICAgbGluZUhlaWdodDogMS42LFxyXG4gICAgICAgICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyxcclxuICAgICAgICAgIG1heEhlaWdodDogMjYwLFxyXG4gICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzRweCcgfSB9LCB0aXRsZSksXHJcbiAgICAgIFN0cmluZyh0ZXh0KSxcclxuICAgIClcclxuICB9XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCAzLiBhbmFseXplX2NoYW5nZSBcdTRFMTNcdTVDNUVcdTVERTVcdTUxNzdcdTUzNjFcdTcyNDcgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY3R4LnNsb3RzLmluamVjdCgndG9vbC5jYWxsLnRvb2x2aWV3JywgKCkgPT4ge1xyXG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XHJcbiAgICAgIG5hbWU6ICd0b29sLmNhbGwudG9vbHZpZXcnLFxyXG4gICAgICBrZXk6ICdhbmFseXplX2NoYW5nZScsXHJcbiAgICB9LCAocHJvcHM6IGFueSkgPT4ge1xyXG4gICAgICBpZiAocHJvcHM/LnRvb2xOYW1lICE9PSAnYW5hbHl6ZV9jaGFuZ2UnKSByZXR1cm4gbnVsbFxyXG4gICAgICBjb25zdCBvdXRwdXQgPSBwcm9wcz8ub3V0cHV0XHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENoYW5nZUNhcmQsIHtcclxuICAgICAgICB0aXRsZTogJ1x1NTNEOFx1NjZGNFx1NTIwNlx1Njc5MFx1NjJBNVx1NTQ0QSAoQ2hhbmdlIEFuYWx5c2lzKScsXHJcbiAgICAgICAgZmlsZXNDaGFuZ2VkOiBvdXRwdXQ/LmZpbGVzQ2hhbmdlZCA/PyAwLFxyXG4gICAgICAgIGluc2VydGlvbnM6IG91dHB1dD8uaW5zZXJ0aW9ucyA/PyAwLFxyXG4gICAgICAgIGRlbGV0aW9uczogb3V0cHV0Py5kZWxldGlvbnMgPz8gMCxcclxuICAgICAgICBldmlkZW5jZUlkOiBvdXRwdXQ/LmV2aWRlbmNlSWQsXHJcbiAgICAgICAgc3RhdHVzOiBvdXRwdXQgPyAnY29tcGxldGVkJyA6ICdhbmFseXppbmcnLFxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICBmb3IgKGNvbnN0IFt0b29sS2V5LCB0aXRsZV0gb2YgW1xyXG4gICAgWydzdGFydF9ydW4nLCAnXHVEODNEXHVERTgwIFx1NjI2N1x1ODg0QyBSdW4nXSxcclxuICAgIFsncnVuX3JldmlldycsICdcdUQ4M0RcdUREMEQgXHU0RUUzXHU3ODAxXHU4QkM0XHU1QkExJ10sXHJcbiAgICBbJ3J1bl92ZXJpZmljYXRpb24nLCAnXHUyNzA1IFx1OUE4Q1x1NjUzNlx1OUE4Q1x1OEJDMSddLFxyXG4gIF0gYXMgY29uc3QpIHtcclxuICAgIGN0eC5zbG90cy5pbmplY3QoJ3Rvb2wuY2FsbC50b29sdmlldycsICgpID0+IHtcclxuICAgICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7IG5hbWU6ICd0b29sLmNhbGwudG9vbHZpZXcnLCBrZXk6IHRvb2xLZXkgfSwgc2ltcGxlUmVzdWx0Q2FyZCh0aXRsZSkpXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iLCAiLyoqXHJcbiAqIFJlYWN0IENvbXBvbmVudDogQ2hhbmdlIC8gSW5zaWdodCBDYXJkIGZvciBDaGF0IFZpZXcuXHJcbiAqIFJlbmRlcnMgc3RydWN0dXJlZCBpbnNpZ2h0cywgZGlmZiBzdGF0aXN0aWNzLCBhbmQgZXZpZGVuY2UgYmFkZ2VzLlxyXG4gKlxyXG4gKiBcdTk4OUNcdTgyNzJcdThENzAgZHN3LWFsaWFzIFx1NEUzQlx1OTg5OFx1NTNEOFx1OTFDRiArIHRoZW1lQXdhcmVUZXh0IFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYxQVxyXG4gKiBcdTZCNjRcdTUyNERcdTc1MjhcdTc2ODQgYC0tZHNoLSpgIFx1NTNEOFx1OTFDRlx1NTcyOFx1NUJCRlx1NEUzQlx1OTFDQ1x1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1NjgzN1x1NUYwRlx1NkMzOFx1OEZEQ1x1ODQzRFx1NTcyOFx1NkRGMVx1ODI3Mlx1NTE1Q1x1NUU5NVx1NEUwQVx1RkYwQ1xyXG4gKiBcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTRFMEJcdTgwNEFcdTU5MjlcdTZENDFcdTkxQ0NcdTUxRkFcdTczQjBcdTdBODFcdTUxNDBcdTlFRDFcdTUzNjFcdUZGMUJcdTY1NzBcdTVCNTdcdTdFRkYvXHU3RUEyXHU0RTVGXHU2NjJGXHU2REYxXHU4MjcyXHU1NDExXHU5MTREXHU4MjcyXHVGRjBDXHU3NjdEXHU1RTk1XHU0RTBEXHU1M0VGXHU4QkZCXHUzMDAyXHJcbiAqXHJcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9DaGFuZ2VDYXJkXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyB0aGVtZUF3YXJlVGV4dCB9IGZyb20gJy4vdGhlbWUudHMnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUNhcmRQcm9wcyB7XHJcbiAgdGl0bGU/OiBzdHJpbmdcclxuICBmaWxlc0NoYW5nZWQ/OiBudW1iZXJcclxuICBpbnNlcnRpb25zPzogbnVtYmVyXHJcbiAgZGVsZXRpb25zPzogbnVtYmVyXHJcbiAgZXZpZGVuY2VJZD86IHN0cmluZ1xyXG4gIHN0YXR1cz86IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ2hhbmdlQ2FyZDogUmVhY3QuRkM8Q2hhbmdlQ2FyZFByb3BzPiA9ICh7XHJcbiAgdGl0bGUgPSAnQ2hhbmdlIEluc2lnaHQnLFxyXG4gIGZpbGVzQ2hhbmdlZCA9IDAsXHJcbiAgaW5zZXJ0aW9ucyA9IDAsXHJcbiAgZGVsZXRpb25zID0gMCxcclxuICBldmlkZW5jZUlkLFxyXG4gIHN0YXR1cyA9ICdhbmFseXplZCcsXHJcbn0pID0+IHtcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICdkaXYnLFxyXG4gICAge1xyXG4gICAgICAnZGF0YS10ZXN0aWQnOiAncHJvamVjdC1jb250cm9sLWNoYW5nZS1jYXJkJyxcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgcGFkZGluZzogJzEwcHggMTRweCcsXHJcbiAgICAgICAgbWFyZ2luOiAnNnB4IDAnLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXHJcbiAgICAgICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgICAgIGZvbnRTaXplOiAnMTNweCcsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgJ2RpdicsXHJcbiAgICAgIHtcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBudWxsLCBgXHVEODNEXHVERDBEICR7dGl0bGV9YCksXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgJ3NwYW4nLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHggNnB4JyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJnLWluc2V0LCByZ2JhKDUsNSw1LDAuMDYpKScsXHJcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgKSxcclxuICAgICksXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEycHgnLCBmb250U2l6ZTogJzEycHgnLCBvcGFjaXR5OiAwLjkgfSB9LFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgbnVsbCwgYFx1RDgzRFx1RENDMSAke2ZpbGVzQ2hhbmdlZH0gZmlsZXNgKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjMWE3ZjM3JykgfSB9LCBgKyR7aW5zZXJ0aW9uc31gKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2YyMjJlJykgfSB9LCBgLSR7ZGVsZXRpb25zfWApLFxyXG4gICAgICBldmlkZW5jZUlkXHJcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgICAnc3BhbicsXHJcbiAgICAgICAgICAgIHsgc3R5bGU6IHsgb3BhY2l0eTogMC43LCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyB9IH0sXHJcbiAgICAgICAgICAgIGBbJHtldmlkZW5jZUlkfV1gLFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIDogbnVsbCxcclxuICAgICksXHJcbiAgKVxyXG59XHJcbiIsICIvKipcbiAqIFx1NUJBMlx1NjIzN1x1N0FFRlx1NEUzQlx1OTg5OFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYwOFx1NkRGMVx1NkQ0NVx1NTNDQ1x1NEUzQlx1OTg5OFx1NTE3MVx1NzUyOFx1NzY4NFx1NTUyRlx1NEUwMFx1NUI5RVx1NzNCMFx1RkYwOVx1MzAwMlxuICpcbiAqIFx1NEUwRFx1NTNEOFx1NUYwRlx1RkYwODIwMjYtMDktMTAgXHU2REYxXHU4MjcyXHU2QTIxXHU1RjBGXHUzMDBDXHU5ODc1XHU3QjdFXHU3NjdEXHU1NzU3XHUzMDBEXHU0RThCXHU2NTQ1XHU1NDBFXHU1NkZBXHU1MzE2XHVGRjBDXHU1MTY4XHU1QkEyXHU2MjM3XHU3QUVGXHU1RkM1XHU5ODdCXHU5MDc1XHU1Qjg4XHVGRjA5XHVGRjFBXG4gKiAxLiBcdTk2OEZcdTRFM0JcdTk4OThcdTUzRDhcdTUzMTZcdTc2ODRcdTVGM0FcdThDMDNcdTgyNzJcdTY1ODdcdTVCNTdcdTVGQzVcdTk4N0JcdTdFQ0YgdGhlbWVBd2FyZVRleHQoKVx1RkYxQVx1NkQ0NVx1ODI3Mlx1NEUzQlx1OTg5OFx1ODFFQVx1NTJBOFx1NkRGMVx1NTMxNlx1NTIzMFx1NzY3RFx1NUU5NVxuICogICAgXHU1QkY5XHU2QkQ0XHU1RUE2IFx1MjI2NTQuNToxXHVGRjBDXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU4MUVBXHU1MkE4XHU2M0QwXHU0RUFFXHU1MjMwXHU2REYxXHU1RTk1IFx1MjI2NTQuNToxXHUzMDAyXHU5ODdCXHU1NzI4XHU2RTMyXHU2N0QzXHU2NzFGXHU4QzAzXHU3NTI4XHVGRjA4XHU3RUM0XHU0RUY2XHU0RjUzXHU1MTg1L1xuICogICAgXHU2RTMyXHU2N0QzXHU1MUZEXHU2NTcwXHU1MTg1XHVGRjA5XHVGRjBDXHU0RTNCXHU5ODk4XHU1MjA3XHU2MzYyXHU1NDBFXHU5NjhGXHU5MUNEXHU2RTMyXHU2N0QzXHU4MUVBXHU1MkE4XHU2NkY0XHU2NUIwXHVGRjFCXHU3OTgxXHU2QjYyXHU1NzI4XHU2QTIxXHU1NzU3XHU1MkEwXHU4RjdEXHU2NzFGXHU2QzQyXHU1MDNDXHU1NDBFXHU1QjU4XHU4RkRCXG4gKiAgICBcdTk3NTlcdTYwMDFcdTY4MzdcdTVGMEZcdTVCRjlcdThDNjFcdTMwMDJcbiAqIDIuIGFjdGl2ZSBcdTlBRDhcdTRFQUVcdTgwQ0NcdTY2NkZcdUZGMDhcdTYzMDlcdTk0QUUgLyBcdTk4NzVcdTdCN0UgLyBcdTdCNUJcdTkwMDlcdTgyQUZcdTcyNDdcdTdCNDlcdTRFMDBcdTUyMDdcIlx1OTAwOVx1NEUyRFx1NTM3M1x1NTg2Qlx1ODI3MlwiXHU3Njg0XHU4ODY4XHU5NzYyXHVGRjA5XHU0RTAwXHU1RjhCXHU3NTI4XG4gKiAgICBgdmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpYFx1RkYwOFx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1NEUwQlx1OTBGRFx1NjYyRlx1ODRERFx1ODI3Mlx1RkYwOVx1RkYwQ1x1OTE0RFx1NzY3RFx1NUI1N1x1MzAwMlxuICogICAgXHU3OTgxXHU2QjYyXHU3NTI4IC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnkgXHU0RjVDXHU4MENDXHU2NjZGXHUyMDE0XHUyMDE0XHU1QjgzXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RjFBXHU4OEFCXG4gKiAgICBcdTVCOENcdTUxNjhcdTU0MUVcdTYzODlcdUZGMDhcdTY3MkNcdTZCMjFcdTRFOEJcdTY1NDVcdTY4MzlcdTU2RTBcdUZGMDlcdTMwMDJcbiAqIDMuIFx1NjVFMFx1NkNENVx1ODlFM1x1Njc5MFx1NzY4NFx1OTg5Q1x1ODI3Mlx1RkYwOENTUyBcdTUzRDhcdTkxQ0ZcdTdCNDlcdUZGMDlcdTUzOUZcdTY4MzdcdThGRDRcdTU2REVcdUZGMUFcdTUzRDhcdTkxQ0ZcdTgyNzJcdTRFQTRcdTc1MzFcdTVCQkZcdTRFM0JcdTRFM0JcdTk4OThcdTdDRkJcdTdFREZcdTRGRERcdThCQzFcdTUzRUZcdThCRkJcdUZGMENcbiAqICAgIFx1NEY0Nlx1NzUzMVx1NkI2NFx1NUI4M1x1NEVFQ1x1NEUwRFx1NUY5N1x1NEUwRVx1Nzg2Q1x1N0YxNlx1NzgwMVx1NTI0RFx1NjY2Rlx1ODI3Mlx1NTNFMFx1NTJBMFx1NEY3Rlx1NzUyOFx1MzAwMlxuICovXG5cbi8qKiBcdTg5RTNcdTY3OTAgI3JyZ2diYiBcdTYyMTYgcmdiKCkvcmdiYSgpIFx1OTg5Q1x1ODI3Mlx1NTI0RFx1NEUwOVx1NEUyQVx1NTIwNlx1OTFDRlx1NEUzQSBbciwgZywgYl1cdUZGMUJcdTY1RTBcdTZDRDVcdTg5RTNcdTY3OTBcdThGRDRcdTU2REUgbnVsbFx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29sb3IoY29sb3I6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IG51bGwge1xuICBjb25zdCBoZXggPSAvXiMoWzAtOWEtZl17Nn0pJC9pLmV4ZWMoY29sb3IpXG4gIGlmIChoZXggIT09IG51bGwpIHtcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlci5wYXJzZUludChoZXhbMV0hLCAxNilcbiAgICByZXR1cm4gWyh2YWx1ZSA+PiAxNikgJiAyNTUsICh2YWx1ZSA+PiA4KSAmIDI1NSwgdmFsdWUgJiAyNTVdXG4gIH1cbiAgY29uc3QgZnVuY3Rpb25hbCA9IC9ecmdiYT9cXChcXHMqKFxcZHsxLDN9KVssXFxzXSsoXFxkezEsM30pWyxcXHNdKyhcXGR7MSwzfSkvaS5leGVjKGNvbG9yKVxuICBpZiAoZnVuY3Rpb25hbCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBbTnVtYmVyKGZ1bmN0aW9uYWxbMV0pLCBOdW1iZXIoZnVuY3Rpb25hbFsyXSksIE51bWJlcihmdW5jdGlvbmFsWzNdKV1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG4vKiogV0NBRyBcdTc2RjhcdTVCRjlcdTRFQUVcdTVFQTZcdUZGMDgwPVx1OUVEMVx1RkYwQzE9XHU3NjdEXHVGRjA5XHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gcmVsYXRpdmVMdW1pbmFuY2UocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IGNoYW5uZWwgPSAodmFsdWU6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdiA9IHZhbHVlIC8gMjU1XG4gICAgcmV0dXJuIHYgPD0gMC4wMzkyOCA/IHYgLyAxMi45MiA6ICgodiArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjRcbiAgfVxuICByZXR1cm4gMC4yMTI2ICogY2hhbm5lbChyKSArIDAuNzE1MiAqIGNoYW5uZWwoZykgKyAwLjA3MjIgKiBjaGFubmVsKGIpXG59XG5cbi8qKiBcdTZERjFcdTUzMTZcdTk4OUNcdTgyNzJcdTc2RjRcdTUyMzBcdTc2N0RcdTVFOTVcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgIzFmMjMyOCBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA+IDAuMTgzOyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4MWYgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHgyMyAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHgyOCAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqIFx1NjNEMFx1NEVBRVx1OTg5Q1x1ODI3Mlx1NzZGNFx1NTIzMFx1NkRGMVx1NUU5NVx1RkYwOCMxNTE1MTdcdUZGMDlcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgI2YwZjZmYyBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpZ2h0ZW5Gb3JEYXJrQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA8IDAuMjE0OyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4ZjAgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHhmNiAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHhmYyAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqXG4gKiBcdTRFM0JcdTk4OThcdTgxRUFcdTkwMDJcdTVFOTRcdTY1ODdcdTVCNTdcdTgyNzJcdUZGMUFcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTZERjFcdTUzMTZcdTUyMzBcdTc2N0RcdTVFOTUgXHUyMjY1NC41OjFcdUZGMUJcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTYzRDBcdTRFQUVcdTUyMzBcdTZERjFcdTVFOTUgXHUyMjY1NC41OjFcbiAqIFx1RkYwOFx1NkRGMVx1ODI3Mlx1NUI1N1x1NTk4MiAjNTc2MDZhIFx1NzZGNFx1NjNBNVx1NjUzRVx1NkRGMVx1NUU5NVx1NTQwQ1x1NjgzN1x1NEUwRFx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlx1NjI0MFx1NjcwOVx1NUYzQVx1OEMwM1x1ODI3Mlx1NjU4N1x1NjcyQ1x1N0VERlx1NEUwMFx1OEQ3MFx1OEZEOVx1OTFDQ1x1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhlbWVBd2FyZVRleHQoY29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJnYiA9IHBhcnNlQ29sb3IoY29sb3IpXG4gIGlmIChyZ2IgPT09IG51bGwpIHJldHVybiBjb2xvclxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5ib2R5Py5oYXNBdHRyaWJ1dGU/LignZGF0YS1kcy1kYXJrLXRoZW1lJykgPT09IHRydWUpIHtcbiAgICByZXR1cm4gbGlnaHRlbkZvckRhcmtCYWNrZ3JvdW5kKHJnYlswXSwgcmdiWzFdLCByZ2JbMl0pXG4gIH1cbiAgcmV0dXJuIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyZ2JbMF0sIHJnYlsxXSwgcmdiWzJdKVxufVxuIiwgIi8qKlxyXG4gKiBQcm9qZWN0IENvbnRyb2wgXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4V29ya3NwYWNlRnJhbWVcdUZGMDl2Mlx1RkYxQVx1NTZGNFx1N0VENVwiXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XCJcdTdFQzRcdTdFQzdcdTMwMDJcclxuICpcclxuICogXHU1NkRCXHU0RTJBXHU5ODc1XHU3QjdFXHVGRjFBXHJcbiAqIDEuIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1RkYwOFx1OUVEOFx1OEJBNFx1RkYwOVx1RkYxQVx1NEVEM1x1NUU5M1x1NjgwRlx1RkYwOFx1NTkxQVx1NEVEM1x1NUU5M1x1NTIwN1x1NjM2Mlx1RkYwOSsgXHU2M0QwXHU0RUE0XHU1MjE3XHU4ODY4XHVGRjA4XHU1NDJCXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4XHVGRjA5K1xyXG4gKiAgICBcdThCRTZcdTYwQzVcdTk3NjJcdTY3N0ZcdUZGMDhBSSBcdTg5RTNcdThCRkJcdUZGMUFcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDgvXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxL1x1OThDRVx1OTY2OVx1RkYxQlx1NEUwOVx1N0VBN1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNCBTVkcgXHU1NkZFXHVGRjFCXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHU3RUQzXHU4QkJBXHVGRjA5XHUzMDAyXHJcbiAqIDIuIFx1OTg3OVx1NzZFRVx1NjAzQlx1ODlDOFx1RkYxQVx1OTg3OVx1NzZFRVx1Njg2M1x1Njg0OCArIFx1NUZFQlx1NjM3N1x1NjRDRFx1NEY1QyArIFx1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1RiArIFx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1MzAwMlxyXG4gKiAzLiBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdUZGMUFSdW4gXHU4RkRCXHU1RUE2XHU0RTBFXHU2MjEwXHU2NzJDXHUzMDAyXHJcbiAqIDQuIFx1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNlx1RkYxQVx1NjgzOFx1NjdFNVx1N0IxNFx1OEJCMFx1RkYwOFx1NTNFRlx1NTE3M1x1ODA1NFx1NjNEMFx1NEVBNFx1RkYwOSsgXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHVGRjA4XHU0RUJBXHU1REU1XHU3ODZFXHU4QkE0XHVGRjA5KyBcdTVCNjZcdTRFNjBcdTY5ODJcdTVGRjUgKyBSZXZpZXcvXHU5QThDXHU2NTM2XHU4QkIwXHU1RjU1XHUzMDAyXHJcbiAqXHJcbiAqIFx1NUUwM1x1NUM0MFx1NjczQVx1NTIzNlx1NEUwRFx1NTNEOFx1RkYxQVx1OTA2RVx1ODUzRFx1NUI5OFx1NjVCOSBkZXRhaWxzIFx1NjlGRCArIFx1NkNFOFx1NTE2NVx1NjgzN1x1NUYwRlx1NjM2Mlx1NTIxN1x1RkYwOFx1ODA0QVx1NTkyOVx1NjcwMFx1NTNGM1x1RkYwOSsgXHU1MjA2XHU5Njk0XHU2NzYxXHU2MkQ2XHU2MkZEXHU4QkIwXHU1RkM2XHVGRjFCXHJcbiAqIFx1N0VERlx1OEJBMVx1ODg0Q1x1NEUyNFx1ODg0Q1x1OTRCM1x1NTIzNlx1NzUzMVx1OEZEMFx1ODg0Q1x1NjVGNlx1NjMwOVx1Njc4NFx1NUVGQVx1NTRDOFx1NUUwQ1x1N0NCRVx1NTFDNlx1NkNFOFx1NTE2NVx1RkYwOGFwcGx5U3RhdHNMaW5lQ2xhbXBcdUZGMDlcdTMwMDJcclxuICpcclxuICogQG1vZHVsZSBkc2gtY2xpZW50LXByb2plY3QtY29udHJvbC9jb21wb25lbnRzL1dvcmtzcGFjZUZyYW1lXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBwYXJzZUNvbG9yLCB0aGVtZUF3YXJlVGV4dCB9IGZyb20gJy4vdGhlbWUudHMnXHJcbmltcG9ydCB7IGNsdXN0ZXJJbnRvUm91bmRzIH0gZnJvbSAnLi9jb21taXQtcm91bmRzLnRzJ1xyXG5cclxuLyoqIFx1NUJCRlx1NEUzQiAvc3RhdGUgXHU4RkQ0XHU1NkRFXHU3Njg0XHU1RkVCXHU3MTY3XHU1RjYyXHU3MkI2XHVGRjA4XHU0RTBFIGFwaS1yb3V0ZS50cyBidWlsZFN0YXRlIFx1NUJGOVx1OUY1MFx1RkYwOVx1MzAwMiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZVN0YXRlIHtcclxuICByZWFkeT86IGJvb2xlYW5cclxuICByZWFzb24/OiBzdHJpbmdcclxuICBwbHVnaW5WZXJzaW9uPzogc3RyaW5nXHJcbiAgcHJvamVjdD86IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyByb290UGF0aDogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxyXG4gIGNoYW5nZXM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IHNvdXJjZTogc3RyaW5nOyB1cGRhdGVkQXQ6IG51bWJlciB9PlxyXG4gIHJ1bnM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBzdGFydGVkQXQ6IG51bWJlciB8IG51bGw7IGZpbmlzaGVkQXQ6IG51bWJlciB8IG51bGw7IGNvc3RVc2Q/OiBudW1iZXI7IHN0ZXBzVG90YWw/OiBudW1iZXI7IHN0ZXBzRG9uZT86IG51bWJlcjsgY3VycmVudFN0ZXA/OiBzdHJpbmcgfCBudWxsIH0+XHJcbiAgYXR0ZW1wdHNDb3VudD86IG51bWJlclxyXG4gIG1lbW9yaWVzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBwcm9qZWN0SWQ6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0cnV0aExldmVsOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ/OiBzdHJpbmc7IGlzSHVtYW5Db25maXJtZWQ6IGJvb2xlYW47IGdpdEJyYW5jaDogc3RyaW5nIHwgbnVsbDsgY3JlYXRlZEF0OiBudW1iZXIgfT5cclxuICBldmlkZW5jZUNvdW50PzogbnVtYmVyXHJcbiAgcmVjZW50RXZpZGVuY2U/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHNvdXJjZTogc3RyaW5nOyB0cnV0aExldmVsOiBzdHJpbmc7IGxvY2F0b3I6IHN0cmluZzsgc25pcHBldDogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxyXG4gIHJlc29sdmVkSXNzdWVSZXRlbnRpb25EYXlzPzogbnVtYmVyXHJcbiAgaW1wb3J0ZWRDaGFuZ2VzPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb21taXRDb3VudDogbnVtYmVyOyBmaXJzdENvbW1pdEF0OiBudW1iZXI7IGxhc3RDb21taXRBdDogbnVtYmVyOyBjb25maWRlbmNlOiBudW1iZXI7IHN0YXR1czogc3RyaW5nIH0+XHJcbiAgaXNzdWVzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBjaGFuZ2VJZDogc3RyaW5nOyBzZXZlcml0eTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZyB9PlxyXG4gIHZlcmlmaWNhdGlvbnM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZzsgY3JlYXRlZEF0OiBudW1iZXIgfT5cclxuICBib290c3RyYXA/OiB7IGlkOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgdGVjaFN0YWNrOiBzdHJpbmdbXTsgbWFuaWZlc3RGaWxlczogc3RyaW5nW107IHN5bWJvbHNDb3VudDogbnVtYmVyOyBjcmVhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxyXG4gIGNvbmZpcm1lZD86IEFycmF5PHsgaWQ6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmc7IGZvcmJpZGRlblBhdGhzOiBzdHJpbmdbXSB9PlxyXG4gIGNvbmNlcHRzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNhdGVnb3J5OiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmc7IG9jY3VycmVuY2VzOiBudW1iZXIgfT5cclxufVxyXG5cclxuLyoqIEdFVCAvY29tbWl0cyBcdTc2ODRcdTYzRDBcdTRFQTRcdTY3NjFcdTc2RUVcdTMwMDJhbmFseXplZCA9IFx1NURGMlx1NzUxRlx1NjIxMFx1OEZDNyBBSSBcdTg5RTNcdThCRkJcdUZGMDhcdTY3MkFcdTZEODhcdTUzMTZcdTU3MDZcdTcwQjlcdTZEODhcdTcwQjlcdTRGOURcdTYzNkVcdUZGMDlcdTMwMDIgKi9cclxuaW50ZXJmYWNlIENvbW1pdEVudHJ5IHtcclxuICBzaGE6IHN0cmluZ1xyXG4gIHNob3J0SGFzaDogc3RyaW5nXHJcbiAgYXV0aG9yOiBzdHJpbmdcclxuICBkYXRlOiBudW1iZXJcclxuICBzdWJqZWN0OiBzdHJpbmdcclxuICBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IGFkZHM6IG51bWJlcjsgZGVsczogbnVtYmVyIH0+XHJcbiAgYW5hbHl6ZWQ/OiBib29sZWFuXHJcbn1cclxuXHJcbmludGVyZmFjZSBDb21taXRzUGF5bG9hZCB7XHJcbiAgcm9vdFBhdGg6IHN0cmluZ1xyXG4gIGJyYW5jaDogc3RyaW5nIHwgbnVsbFxyXG4gIGhlYWRTaGE6IHN0cmluZyB8IG51bGxcclxuICB3b3JraW5nOiB7IGZpbGVDb3VudDogbnVtYmVyOyBpc0NsZWFuOiBib29sZWFuOyBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nIH0+IH1cclxuICBjb21taXRzOiBDb21taXRFbnRyeVtdXHJcbn1cclxuXHJcbmludGVyZmFjZSBDb21taXREZXRhaWxQYXlsb2FkIHtcclxuICBzaGE6IHN0cmluZ1xyXG4gIGlzV29ya2luZzogYm9vbGVhblxyXG4gIGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgYWRkczogbnVtYmVyOyBkZWxzOiBudW1iZXIgfT5cclxuICBpbnNlcnRpb25zOiBudW1iZXJcclxuICBkZWxldGlvbnM6IG51bWJlclxyXG4gIHBhdGNoVHJ1bmNhdGVkOiBib29sZWFuXHJcbiAgcGF0Y2g6IHN0cmluZ1xyXG4gIGNvbW1pdDogeyBtZXNzYWdlOiBzdHJpbmc7IGF1dGhvcjogc3RyaW5nOyBkYXRlOiBudW1iZXIgfSB8IG51bGxcclxuICBhbmFseXNpczogeyB3aGF0OiBzdHJpbmc7IGxvZ2ljOiBzdHJpbmdbXTsgcmlza3M6IHN0cmluZ1tdIH1cclxuICBhbmFseXNpc0NhY2hlZD86IGJvb2xlYW5cclxuICBhbmFseXNpc0dlbmVyYXRlZEF0PzogbnVtYmVyIHwgbnVsbFxyXG4gIC8qKiBcdTY3MkNcdTZCMjFcdTg5RTNcdThCRkJcdTc2ODQgTExNIFx1NjIxMFx1NjcyQ1x1RkYwOFx1NEYzMFx1RkYwQ1VTRFx1RkYwOVx1RkYxQlx1N0YxM1x1NUI1OFx1NjcyQVx1NUUyNlx1NjIxMFx1NjcyQy9cdTY3MkFcdTRFQTdcdTc1MUZcdThDMDNcdTc1MjhcdTY1RjZcdTdGM0FcdTc3MDFcdTMwMDIgKi9cclxuICBhbmFseXNpc0Nvc3RVc2Q/OiBudW1iZXJcclxuICBhbmFseXNpc1Rva2Vucz86IHsgaW5wdXQ6IG51bWJlcjsgb3V0cHV0OiBudW1iZXI7IHRvdGFsOiBudW1iZXIgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSW1wYWN0U2NvcGVQYXlsb2FkIHtcclxuICBjaGFuZ2VkRmlsZXM6IHN0cmluZ1tdXHJcbiAgc2hhcz86IHN0cmluZ1tdXHJcbiAgcmlza0xldmVsOiAnbG93JyB8ICdtZWRpdW0nIHwgJ2hpZ2gnIHwgJ2NyaXRpY2FsJ1xyXG4gIHJpc2tTY29yZTogbnVtYmVyXHJcbiAgcmlza0ZhY3RvcnM/OiBBcnJheTx7IHRleHQ6IHN0cmluZzsgcG9pbnRzOiBudW1iZXIgfT5cclxuICBrZXlDaGFuZ2VQb2ludHM/OiBzdHJpbmdbXVxyXG4gIG1lbW9yaWVzPzogQXJyYXk8eyB0aXRsZTogc3RyaW5nOyB0eXBlOiBzdHJpbmcgfT5cclxuICBmdW5jdGlvbkltcGFjdD86IEFycmF5PHtcclxuICAgIHN5bWJvbDogc3RyaW5nXHJcbiAgICBkZWZpbmVkSW46IHN0cmluZ1xyXG4gICAgcm9sZT86IHN0cmluZ1xyXG4gICAgY2hhbmdlPzogc3RyaW5nXHJcbiAgICBpbXBhY3Q/OiBzdHJpbmdcclxuICAgIGNhbGxlcnM6IEFycmF5PHsgZmlsZTogc3RyaW5nOyBsaW5lOiBzdHJpbmc7IHNuaXBwZXQ6IHN0cmluZyB9PlxyXG4gIH0+XHJcbiAgbGV2ZWxzOiBBcnJheTx7IGxldmVsOiBzdHJpbmc7IGRlcHRoOiBudW1iZXI7IHBhdGg6IHN0cmluZzsgY29uZmlkZW5jZTogbnVtYmVyOyByZWFzb246IHN0cmluZyB9PlxyXG4gIGRpcmVjdDogc3RyaW5nW11cclxuICBleHBsYW5hdGlvbnNDYWNoZWQ/OiBib29sZWFuXHJcbiAgZ2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXHJcbiAgLyoqIFx1NTFGRFx1NjU3MFx1N0VBN1x1OEJGNFx1NjYwRVx1OTBBM1x1NkIyMSBMTE0gXHU4QzAzXHU3NTI4XHU3Njg0XHU2MjEwXHU2NzJDXHVGRjA4XHU0RjMwXHVGRjBDVVNEXHVGRjA5XHUzMDAyICovXHJcbiAgZXhwbGFuYXRpb25zQ29zdFVzZD86IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJldmlld1BheWxvYWQge1xyXG4gIGlzc3Vlc0ZvdW5kOiBudW1iZXJcclxuICBpc3N1ZXM6IHN0cmluZ1xyXG4gIHZlcmRpY3Q6IHN0cmluZ1xyXG4gIGNhY2hlZD86IGJvb2xlYW5cclxuICBnZW5lcmF0ZWRBdD86IG51bWJlciB8IG51bGxcclxuICBjb3N0VXNkPzogbnVtYmVyXHJcbiAgaXNzdWVMaXN0PzogQXJyYXk8eyBzZXZlcml0eTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBldmlkZW5jZTogc3RyaW5nOyBmaXg6IHN0cmluZyB9PlxyXG59XHJcblxyXG5pbnRlcmZhY2UgTm90ZUVudHJ5IHtcclxuICBpZDogc3RyaW5nXHJcbiAgcHJvamVjdElkOiBzdHJpbmdcclxuICBzaGE/OiBzdHJpbmdcclxuICB0aXRsZTogc3RyaW5nXHJcbiAgY29udGVudDogc3RyaW5nXHJcbiAgdGFncz86IHN0cmluZ1tdXHJcbiAgcGlubmVkPzogYm9vbGVhblxyXG4gIGNyZWF0ZWRBdDogbnVtYmVyXHJcbiAgdXBkYXRlZEF0PzogbnVtYmVyXHJcbn1cclxuXHJcbi8qKiBHRVQgL2lzc3VlcyBcdTc2ODRcdThCQzRcdTVCQTFcdTk1RUVcdTk4OThcdTY3NjFcdTc2RUVcdUZGMDhSZXZpZXcgXHU5NUVFXHU5ODk4XHU5ODc1XHU3QjdFXHU2NTcwXHU2MzZFXHU2RTkwXHVGRjA5XHUzMDAyICovXHJcbmludGVyZmFjZSBJc3N1ZUVudHJ5IHtcclxuICBpZDogc3RyaW5nXHJcbiAgY2hhbmdlSWQ6IHN0cmluZ1xyXG4gIHNldmVyaXR5OiBzdHJpbmdcclxuICBjYXRlZ29yeTogc3RyaW5nXHJcbiAgdGl0bGU6IHN0cmluZ1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcclxuICBzdGF0dXM6IHN0cmluZ1xyXG4gIHJlc29sdXRpb246IHN0cmluZ1xyXG4gIGZpeFN0YXRzOiB7IGZpbGVzOiBudW1iZXI7IGluc2VydGlvbnM6IG51bWJlcjsgZGVsZXRpb25zOiBudW1iZXIgfSB8IG51bGxcclxuICBmaXhGaWxlczogc3RyaW5nW11cclxuICBmaXhJbXBhY3Q6IEFycmF5PHsgc3ltYm9sOiBzdHJpbmc7IGRlZmluZWRJbjogc3RyaW5nOyBjYWxsZXJzOiBBcnJheTx7IGZpbGU6IHN0cmluZzsgbGluZTogc3RyaW5nOyBzbmlwcGV0OiBzdHJpbmcgfT4gfT5cclxuICBmaXhEaWZmOiBzdHJpbmdcclxuICAvKiogXHU1Rjg1XHU4QkM0XHU1QkExL1x1NURGMlx1NkQzRVx1NTNEMVx1NzY4NFx1NEZFRVx1NTkwRFx1NjVCOVx1Njg0OFx1RkYwOFx1NjVCOVx1Njg0OFx1NkEyMVx1NUYwRlx1NEVBN1x1NTFGQVx1RkYwOVx1MzAwMiAqL1xyXG4gIGZpeFBsYW4/OiB7IGlkOiBzdHJpbmc7IGFwcHJvYWNoOiBzdHJpbmc7IGZpbGVzOiBzdHJpbmdbXTsgaW1wYWN0OiBzdHJpbmc7IGJlbmVmaXQ6IHN0cmluZzsgcmlzazogc3RyaW5nOyBzdGF0dXM6IHN0cmluZyB9IHwgbnVsbFxyXG4gIGNyZWF0ZWRBdDogbnVtYmVyXHJcbiAgdXBkYXRlZEF0OiBudW1iZXJcclxufVxyXG5cclxuLyoqIFx1NEZFRVx1NTkwRFx1NkQzRVx1NTNEMVx1NEVGQlx1NTJBMVx1ODlDNlx1NTZGRVx1RkYwOEdFVCAvZml4L3N0YXR1c1x1RkYwOVx1MzAwMiAqL1xyXG5pbnRlcmZhY2UgRml4VGFza0VudHJ5IHtcclxuICBpc3N1ZUlkOiBzdHJpbmdcclxuICB0aXRsZTogc3RyaW5nXHJcbiAgc3RhdHVzOiAncXVldWVkJyB8ICdydW5uaW5nJyB8ICdtZXJnaW5nJyB8ICdyZWRvJyB8ICdkb25lJyB8ICdjb25mbGljdCcgfCAnZmFpbGVkJyB8ICdjYW5jZWxsZWQnXHJcbiAgYXR0ZW1wdDogbnVtYmVyXHJcbiAgc3VtbWFyeT86IHN0cmluZ1xyXG4gIGZpbGVzPzogc3RyaW5nW11cclxuICBjb21taXQ/OiBzdHJpbmdcclxuICBlcnJvcj86IHN0cmluZ1xyXG4gIC8qKiBcdThGRDBcdTg4NENcdTRFMkRcdTVCNTBcdTRFRTNcdTc0MDZcdTc2ODRcdTY3MDBcdThGRDFcdTUyQThcdTRGNUNcdUZGMDhcdThCRkIvXHU1MTk5XHU1NEVBXHU0RTJBXHU2NTg3XHU0RUY2XHVGRjA5XHUzMDAyICovXHJcbiAgY3VycmVudEFjdGlvbj86IHN0cmluZ1xyXG4gIC8qKiBcdTVCOENcdTYyMTBcdTU0MEVcdTc2ODRcdTVGNzFcdTU0Q0RcdTY0NThcdTg5ODFcdUZGMDhcdTc2RjRcdTZEM0VcdTRFRkJcdTUyQTFcdTgxRUFcdTUyQThcdThCQTFcdTdCOTdcdUZGMDlcdTMwMDIgKi9cclxuICBpbXBhY3Q/OiB7IHJpc2tMZXZlbDogc3RyaW5nOyByaXNrU2NvcmU6IG51bWJlcjsgZGlyZWN0OiBzdHJpbmdbXTsgaW5kaXJlY3Q6IHN0cmluZ1tdOyBwb3RlbnRpYWw6IHN0cmluZ1tdIH1cclxuICAvKiogXHU0RUZCXHU1MkExXHU2QTIxXHU1RjBGXHVGRjFBZml4PVx1NEZFRVx1NTkwRFx1RkYwOFx1OUVEOFx1OEJBNFx1RkYwOVx1RkYxQnBsYW49XHU1M0VBXHU4QkZCXHU1MUZBXHU2NUI5XHU2ODQ4XHUzMDAyICovXHJcbiAgbW9kZT86ICdmaXgnIHwgJ3BsYW4nXHJcbiAgLyoqIFx1NkEyMVx1NTc4Qlx1NjJBNVx1OTUxOVx1N0VFRFx1OEREMVx1NkIyMVx1NjU3MCAvIFx1NjNBMlx1NkQzQlx1NkIyMVx1NjU3MFx1RkYwOFx1NkQzQlx1NjAyN1x1NzJCNlx1NjAwMVx1NjczQVx1OTAwRlx1NTFGQVx1RkYwOVx1MzAwMiAqL1xyXG4gIHJlc3VtZXM/OiBudW1iZXJcclxuICBwcm9iZXM/OiBudW1iZXJcclxufVxyXG5cclxuLyoqIFx1NEZFRVx1NTkwRFx1NURFRVx1NUYwMlx1NzY4NFx1ODg0Q1x1N0VBN1x1Nzc0MFx1ODI3Mlx1NkUzMlx1NjdEM1x1RkYxQSsgXHU3RUZGXHUzMDAxLSBcdTdFQTJcdTMwMDFcdTY1ODdcdTRFRjZcdTU5MzRcdTUyQTBcdTdDOTdcdTMwMDFcdTUxNzZcdTRGNTlcdTVGMzFcdTUzMTZcdTMwMDIgKi9cclxuZnVuY3Rpb24gcmVuZGVyRGlmZkxpbmVzKGRpZmY6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdIHtcclxuICBpZiAodHlwZW9mIGRpZmYgIT09ICdzdHJpbmcnIHx8IGRpZmYgPT09ICcnKSByZXR1cm4gW11cclxuICByZXR1cm4gZGlmZi5zcGxpdCgnXFxuJykuc2xpY2UoMCwgNDAwKS5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XHJcbiAgICBjb25zdCBzdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcyA9IHtcclxuICAgICAgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsXHJcbiAgICAgIGZvbnRTaXplOiAnMTFweCcsIGxpbmVIZWlnaHQ6IDEuNiwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyxcclxuICAgIH1cclxuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJysrKycpIHx8IGxpbmUuc3RhcnRzV2l0aCgnLS0tJykgfHwgbGluZS5zdGFydHNXaXRoKCdkaWZmIC0tZ2l0JykgfHwgbGluZS5zdGFydHNXaXRoKCdAQCcpKSB7XHJcbiAgICAgIHN0eWxlLmNvbG9yID0gJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJ1xyXG4gICAgfSBlbHNlIGlmIChsaW5lLnN0YXJ0c1dpdGgoJysnKSkge1xyXG4gICAgICBzdHlsZS5jb2xvciA9IHRoZW1lQXdhcmVUZXh0KCcjMWE3ZjM3JylcclxuICAgICAgc3R5bGUuYmFja2dyb3VuZCA9ICdyZ2JhKDQ2LDE2MCw2NywwLjA4KSdcclxuICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKCctJykpIHtcclxuICAgICAgc3R5bGUuY29sb3IgPSB0aGVtZUF3YXJlVGV4dCgnI2QxMjQyZicpXHJcbiAgICAgIHN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgyMDksMzYsNDcsMC4wOCknXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdHlsZS5jb2xvciA9ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKSdcclxuICAgIH1cclxuICAgIHJldHVybiA8ZGl2IGtleT17aW5kZXh9IHN0eWxlPXtzdHlsZX0+e2xpbmUgPT09ICcnID8gJ1xcdTAwQTAnIDogbGluZX08L2Rpdj5cclxuICB9KVxyXG59XHJcblxyXG4vKiogXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0XHU5ODc1XHU3Njg0XHU1M0VGXHU3RjE2XHU4RjkxXHU2QjY1XHU5QUE0XHVGRjA4L3J1bnMvc3RhcnQgXHU4RkQ0XHU1NkRFXHVGRjA5XHUzMDAyICovXHJcbmludGVyZmFjZSBQbGFuQ29uZmlybVN0ZXAge1xyXG4gIGlkOiBzdHJpbmdcclxuICB0aXRsZTogc3RyaW5nXHJcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xyXG4gIHRhcmdldEZpbGVzOiBzdHJpbmdbXVxyXG4gIHJvbGU6IHN0cmluZ1xyXG4gIGFjY2VwdGFuY2U6IHN0cmluZ1xyXG4gIGZhaWx1cmVQb2xpY3k6IHN0cmluZ1xyXG4gIGVuYWJsZWQ6IGJvb2xlYW5cclxuICBtb2RlbFByb3ZpZGVyOiBzdHJpbmdcclxuICBtb2RlbElkOiBzdHJpbmdcclxufVxyXG5cclxuLyoqIFBPU1QgL3BlZWsgXHU3Njg0XHU4RjdEXHU4Mzc3XHVGRjA4XHU0RUUzXHU3ODAxXHU0RTBBXHU0RTBCXHU2NTg3XHU2RDZFXHU1QzQyXHVGRjA5XHUzMDAyICovXHJcbmludGVyZmFjZSBQZWVrUGF5bG9hZCB7XHJcbiAgZXhpc3RzOiBib29sZWFuXHJcbiAgcGF0aD86IHN0cmluZ1xyXG4gIHN0YXJ0TGluZT86IG51bWJlclxyXG4gIGVuZExpbmU/OiBudW1iZXJcclxuICB0b3RhbExpbmVzPzogbnVtYmVyXHJcbiAgbGluZXM/OiBBcnJheTx7IG46IG51bWJlcjsgdGV4dDogc3RyaW5nIH0+XHJcbn1cclxuXHJcbi8qKiBcdTRFQ0VcdTgxRUFcdTc1MzFcdTY1ODdcdTY3MkNcdTRFMkRcdThCQzZcdTUyMkIgZmlsZTpsaW5lIFx1NUYxNVx1NzUyOFx1RkYwOFx1NTQyQiBmaWxlOmxpbmUtbGluZSBcdTUzM0FcdTk1RjRcdTUzRDZcdThENzdcdTU5Q0JcdTg4NENcdUZGMDlcdTMwMDIgKi9cclxuY29uc3QgRklMRV9MSU5FX1BBVFRFUk4gPSAvKCg/OltcXHcuLV0rWy9cXFxcXSkqW1xcdy4tXStcXC5bQS1aYS16XXsxLDR9KTooXFxkezEsNX0pKD86LVxcZHsxLDV9KT8vZ1xyXG5cclxuLyoqIEdFVCAvcnVucy9kZXRhaWwgXHU3Njg0XHU4RjdEXHU4Mzc3XHUzMDAyICovXHJcbmludGVyZmFjZSBSdW5EZXRhaWwge1xyXG4gIHJ1bjogeyBpZDogc3RyaW5nOyBjaGFuZ2VJZDogc3RyaW5nOyBjaGFuZ2VUaXRsZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZzsgcGF1c2VQb2ludDogeyBzdGVwSWQ6IHN0cmluZzsgcmVhc29uOiBzdHJpbmc7IGF0OiBudW1iZXIgfSB8IG51bGw7IGVycm9yOiB7IG1lc3NhZ2U6IHN0cmluZyB9IHwgbnVsbDsgc3RhcnRlZEF0OiBudW1iZXIgfCBudWxsOyBmaW5pc2hlZEF0OiBudW1iZXIgfCBudWxsIH1cclxuICBzdGVwczogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyByb2xlOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmcgfCBudWxsOyBzdGF0dXM6IHN0cmluZzsgYXR0ZW1wdHNDb3VudDogbnVtYmVyOyBjbGFpbWVkT3V0Y29tZTogc3RyaW5nIHwgbnVsbDsgdmVyaWZpZWQ6IGJvb2xlYW47IGNvc3RVc2Q6IG51bWJlciB9PlxyXG4gIGNvbnRleHQ6IHtcclxuICAgIHByb2plY3REaWdlc3Q6IHN0cmluZzsgYnJhbmNoOiBzdHJpbmcgfCBudWxsOyBoZWFkU2hhOiBzdHJpbmcgfCBudWxsXHJcbiAgICBpbmplY3RlZE1lbW9yaWVzOiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT5cclxuICAgIHN0ZXBTdW1tYXJpZXM6IEFycmF5PHsgc3RlcFRpdGxlOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgY2hhbmdlZEZpbGVzOiBzdHJpbmdbXTsgYXQ6IG51bWJlciB9PlxyXG4gICAgZGVjaXNpb25Mb2c6IEFycmF5PHsga2luZDogc3RyaW5nOyBkZXRhaWw6IHN0cmluZzsgYXQ6IG51bWJlciB9PlxyXG4gIH0gfCBudWxsXHJcbn1cclxuXHJcbi8qKiBHRVQgL3NjaGVkdWxlZCBcdTc2ODRcdTRFRkJcdTUyQTFcdTY3NjFcdTc2RUVcdTMwMDIgKi9cclxuaW50ZXJmYWNlIFNjaGVkdWxlZFRhc2tFbnRyeSB7XHJcbiAgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmdcclxuICBpbnRlcnZhbE1pbnV0ZXM6IG51bWJlcjsgZW5hYmxlZDogYm9vbGVhbjsgbGFzdFJ1bkF0OiBudW1iZXIgfCBudWxsOyBsYXN0UmVzdWx0OiBzdHJpbmc7IG5leHREdWVBdDogbnVtYmVyXHJcbn1cclxuXHJcbi8qKiBHRVQgL21lbW9yaWVzIFx1NzY4NFx1OEJCMFx1NUZDNlx1Njc2MVx1NzZFRVx1RkYwOFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1NjU3MFx1NjM2RVx1NkU5MFx1RkYwOVx1MzAwMiAqL1xyXG5pbnRlcmZhY2UgTWVtb3J5RW50cnkge1xyXG4gIGlkOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29udGVudDogc3RyaW5nOyByZWxhdGVkRmlsZXM6IHN0cmluZ1tdXHJcbiAgaXNIdW1hbkNvbmZpcm1lZDogYm9vbGVhbjsgZ2l0QnJhbmNoOiBzdHJpbmcgfCBudWxsOyBzY29wZTogc3RyaW5nOyBzb3VyY2VUYWc6IHN0cmluZ1xyXG4gIGJhc2lzU2hhOiBzdHJpbmcgfCBudWxsOyBzdGF0dXM6IHN0cmluZzsgbGFzdFZlcmlmaWVkU2hhOiBzdHJpbmcgfCBudWxsXHJcbiAgY3JlYXRlZEF0OiBudW1iZXI7IHVwZGF0ZWRBdDogbnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBNZW1vcmllc1BheWxvYWQge1xyXG4gIG1lbW9yaWVzOiBNZW1vcnlFbnRyeVtdXHJcbiAgYnJhbmNoOiBzdHJpbmcgfCBudWxsXHJcbiAgaGVhZFNoYTogc3RyaW5nIHwgbnVsbFxyXG4gIGJhc2VsaW5lOiB7IHNoYTogc3RyaW5nIHwgbnVsbDsgdXBkYXRlZEF0OiBudW1iZXIgfSB8IG51bGxcclxuICBiZWhpbmRDb3VudDogbnVtYmVyXHJcbn1cclxuXHJcbi8qKiBQT1NUIC9tZW1vcnkvc3luYyBcdTc2ODRcdTU0MENcdTZCNjVcdTYyQTVcdTU0NEFcdTMwMDIgKi9cclxuaW50ZXJmYWNlIFN5bmNSZXBvcnQge1xyXG4gIG9rOiBib29sZWFuXHJcbiAgZXJyb3I/OiBzdHJpbmdcclxuICBiZWhpbmRDb3VudD86IG51bWJlclxyXG4gIHN0YWxlUHJvcG9zYWxzPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyByZWFzb246IHN0cmluZyB9PlxyXG4gIHJlbmV3ZWQ/OiBudW1iZXJcclxuICBuZXdDYW5kaWRhdGVzPzogQXJyYXk8eyB0eXBlOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZyB9PlxyXG4gIHZlcmRpY3Q/OiBzdHJpbmdcclxufVxyXG5cclxuLyoqIFx1OEJDNFx1NUJBMVx1OTVFRVx1OTg5OFx1NzJCNlx1NjAwMSBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXHJcbmNvbnN0IElTU1VFX1NUQVRVU19MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgb3BlbjogJ1x1NUY4NVx1NTkwNFx1NzQwNicsXHJcbiAgZml4aW5nOiAnXHU0RkVFXHU1OTBEXHU0RTJEJyxcclxuICByZXNvbHZlZDogJ1x1NURGMlx1ODlFM1x1NTFCMycsXHJcbiAgYWNjZXB0ZWQ6ICdcdTVERjJcdTU5MDRcdTc0MDYnLFxyXG4gIHJlamVjdGVkOiAnXHU4QkVGXHU2MkE1L1x1OTFDRFx1NTkwRCcsXHJcbn1cclxuXHJcbi8qKiBcdThCQjBcdTVGQzZcdTdDN0JcdTU3OEIgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xyXG5jb25zdCBNRU1PUllfVFlQRV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgYXJjaGl0ZWN0dXJlX2RlY2lzaW9uOiAnXHU2N0I2XHU2Nzg0XHU1MUIzXHU3QjU2JywgcGF0dGVybl9ydWxlOiAnXHU2QTIxXHU1RjBGXHU4OUM0XHU1MjE5Jywgcmlza19ob3RzcG90OiAnXHU5OENFXHU5NjY5XHU3MEVEXHU3MEI5JyxcclxuICBsZWFybmVkX2NvbmNlcHQ6ICdcdTVCNjZcdTRFNjBcdTY5ODJcdTVGRjUnLCB1c2VyX3Byb2ZpbGU6ICdcdTc1MjhcdTYyMzdcdTUwNEZcdTU5N0QnLCBwcm9qZWN0X2xvZzogJ1x1OTg3OVx1NzZFRVx1NjVFNVx1NUZENycsIGRhaWx5X2xvZzogJ1x1NjVFNVx1NUZENycsXHJcbn1cclxuXHJcbi8qKiBcdThCQjBcdTVGQzZcdTY3NjVcdTZFOTAgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xyXG5jb25zdCBNRU1PUllfU09VUkNFX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICBydW46ICdcdTYyNjdcdTg4NENcdTYzRDBcdTcwQkMnLCByZXZpZXc6ICdcdTY4MzhcdTY3RTVcdTZDODlcdTZEQzAnLCBzeW5jOiAnXHU2MkM5XHU1M0Q2XHU1NDBDXHU2QjY1JywgY2hhdDogJ0FJIFx1OEJCMFx1NUY1NScsIG1hbnVhbDogJ1x1NjI0Qlx1NTJBOCcsXHJcbn1cclxuXHJcbi8qKiBcdTdGMTZcdTYzOTJcdTg5RDJcdTgyNzIgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xyXG5jb25zdCBST0xFX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICBhbmFseXNpczogJ1x1NTIwNlx1Njc5MCcsIHBsYW5uaW5nOiAnXHU4OUM0XHU1MjEyJywgY29kaW5nOiAnXHU1RjAwXHU1M0QxJywgb3BzOiAnXHU3QjgwXHU1MzU1XHU2NENEXHU0RjVDJywgdmVyaWZpY2F0aW9uOiAnXHU5QThDXHU2NTM2JyxcclxufVxyXG5cclxuLyoqIFx1NkI2NVx1OUFBNFx1NTkzMVx1OEQyNVx1N0I1Nlx1NzU2NSBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXHJcbmNvbnN0IFBPTElDWV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgJ3JldHJ5LWVzY2FsYXRlJzogJ1x1OTFDRFx1OEJENVx1NUU3Nlx1NTM0N1x1N0VBN1x1NkEyMVx1NTc4QicsICdyZXRyeS1mYWxsYmFjayc6ICdcdTkxQ0RcdThCRDUnLCBza2lwOiAnXHU1OTMxXHU4RDI1XHU1MjE5XHU4REYzXHU4RkM3JywgYXNrOiAnXHU1OTMxXHU4RDI1XHU1MjE5XHU2NjgyXHU1MDVDXHU5NUVFXHU0RUJBJyxcclxufVxyXG5cclxuLyoqIFJ1biBcdTcyQjZcdTYwMDEgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xyXG5jb25zdCBSVU5fU1RBVFVTX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICBxdWV1ZWQ6ICdcdTYzOTJcdTk2MUZcdTRFMkQnLCBydW5uaW5nOiAnXHU4RkQwXHU4ODRDXHU0RTJEJywgcGF1c2VkOiAnXHU1REYyXHU2NjgyXHU1MDVDJywgYmxvY2tlZDogJ1x1OTYzQlx1NTg1RScsIHJldHJ5aW5nOiAnXHU5MUNEXHU4QkQ1XHU0RTJEJyxcclxuICB2ZXJpZnlpbmc6ICdcdTY1MzZcdTVDM0VcdTlBOENcdTY1MzZcdTRFMkQnLCBzdWNjZWVkZWQ6ICdcdTVERjJcdTYyMTBcdTUyOUYnLCBjb21wbGV0ZWQ6ICdcdTVERjJcdTYyMTBcdTUyOUYnLCBmYWlsZWQ6ICdcdTU5MzFcdThEMjUnLCBjYW5jZWxsZWQ6ICdcdTVERjJcdTUzRDZcdTZEODgnLCBpbnRlcnJ1cHRlZDogJ1x1NURGMlx1NEUyRFx1NjVBRCcsXHJcbn1cclxuXHJcbi8qKiBcdTZCNjVcdTlBQTRcdTcyQjZcdTYwMDEgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xyXG5jb25zdCBTVEVQX1NUQVRVU19MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgcGVuZGluZzogJ1x1NUY4NVx1NjI2N1x1ODg0QycsIHJlYWR5OiAnXHU1QzMxXHU3RUVBJywgcnVubmluZzogJ1x1NjI2N1x1ODg0Q1x1NEUyRCcsIHBhdXNlZDogJ1x1NjY4Mlx1NTA1QycsIHJldHJ5aW5nOiAnXHU5MUNEXHU4QkQ1XHU0RTJEJyxcclxuICBzdWNjZWVkZWQ6ICdcdTVERjJcdTYyMTBcdTUyOUYnLCBmYWlsZWQ6ICdcdTU5MzFcdThEMjUnLCBza2lwcGVkOiAnXHU1REYyXHU4REYzXHU4RkM3JywgYmxvY2tlZDogJ1x1OTYzQlx1NTg1RScsIGNhbmNlbGxlZDogJ1x1NURGMlx1NTNENlx1NkQ4OCcsIGludGVycnVwdGVkOiAnXHU1REYyXHU0RTJEXHU2NUFEJyxcclxufVxyXG5cclxuLyoqIFx1OEJDNFx1NUJBMVx1OTVFRVx1OTg5OFx1NEUyNVx1OTFDRFx1NUVBNiBcdTIxOTIgXHU1RkJEXHU3QUUwXHU1RTk1XHU4MjcyXHUzMDAyICovXHJcbmZ1bmN0aW9uIHNldmVyaXR5Q29sb3Ioc2V2ZXJpdHk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgaWYgKHNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IHNldmVyaXR5ID09PSAnYmxvY2tlcicpIHJldHVybiAnI2NlOTE3OCdcclxuICBpZiAoc2V2ZXJpdHkgPT09ICdtYWpvcicpIHJldHVybiAnI2Q3YmE3ZCdcclxuICBpZiAoc2V2ZXJpdHkgPT09ICdpbmZvJykgcmV0dXJuICcjNmI4YjhiJ1xyXG4gIHJldHVybiAnIzU2OWNkNidcclxufVxyXG5cclxuLyoqIFx1NEUyNVx1OTFDRFx1NUVBNlx1NUY1Mlx1NEUwMFx1RkYwOFx1NTE3Q1x1NUJCOVx1NTM4Nlx1NTNGMlx1OEJCMFx1NUY1NVx1OTFDQ1x1NzY4NCBoaWdoL21lZGl1bS9sb3dcdUZGMUJcdTY3MkFcdTc3RTVcdTU2REVcdTg0M0QgbWlub3JcdUZGMDlcdUZGMENcdTdFREZcdThCQTEvXHU3QjVCXHU5MDA5L1x1Nzc0MFx1ODI3Mlx1NTE3MVx1NzUyOFx1MzAwMiAqL1xyXG5mdW5jdGlvbiBub3JtYWxpemVJc3N1ZVNldmVyaXR5KHNldmVyaXR5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGlmIChzZXZlcml0eSA9PT0gJ2hpZ2gnKSByZXR1cm4gJ21ham9yJ1xyXG4gIGlmIChzZXZlcml0eSA9PT0gJ21lZGl1bScgfHwgc2V2ZXJpdHkgPT09ICdsb3cnKSByZXR1cm4gJ21pbm9yJ1xyXG4gIHJldHVybiBzZXZlcml0eSA9PT0gJ2Jsb2NrZXInIHx8IHNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IHNldmVyaXR5ID09PSAnbWFqb3InIHx8IHNldmVyaXR5ID09PSAnbWlub3InIHx8IHNldmVyaXR5ID09PSAnaW5mbydcclxuICAgID8gc2V2ZXJpdHkgOiAnbWlub3InXHJcbn1cclxuXHJcbi8vIFx1NEUzQlx1OTg5OFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYwOHBhcnNlQ29sb3IgLyByZWxhdGl2ZUx1bWluYW5jZSAvIGRhcmtlbi9saWdodGVuIC8gdGhlbWVBd2FyZVRleHRcdUZGMDlcclxuLy8gXHU1REYyXHU2MkJEXHU1M0Q2XHU1MjMwIC4vdGhlbWUudHMgXHU3RURGXHU0RTAwXHU3RUY0XHU2MkE0XHUzMDAyXHU1MTY4XHU2NTg3XHU0RUY2XHU0RTBEXHU1M0Q4XHU1RjBGXHVGRjFBXHJcbi8vIDEpIFx1NUYzQVx1OEMwM1x1ODI3Mlx1NjU4N1x1NUI1N1x1NUZDNVx1OTg3Qlx1N0VDRiB0aGVtZUF3YXJlVGV4dFx1RkYwOFx1NkUzMlx1NjdEM1x1NjcxRlx1OEMwM1x1NzUyOFx1RkYwOVx1RkYxQlxyXG4vLyAyKSBhY3RpdmUgXHU5QUQ4XHU0RUFFXHU4MENDXHU2NjZGXHU0RTAwXHU1RjhCIGJ1dHRvbi1pbmZvLWZpbGxcdUZGMENcdTc5ODFcdTZCNjIgYnJhbmQtcHJpbWFyeSBcdTRGNUNcdTgwQ0NcdTY2NkZcclxuLy8gICAgXHVGRjA4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU0RTBCXHU4RkQxXHU3NjdEXHVGRjBDXHU5MTREXHU3NjdEXHU1QjU3XHU0RTBEXHU1M0VGXHU4OUMxXHUyMDE0XHUyMDE0XHUzMDBDXHU5ODc1XHU3QjdFXHU3NjdEXHU1NzU3XHUzMDBEXHU0RThCXHU2NTQ1XHU2ODM5XHU1NkUwXHVGRjA5XHUzMDAyXHJcblxyXG4vKiogXHU4QkM0XHU1QkExXHU3NkVFXHU2ODA3XHVGRjA4Y2hhbmdlSWRcdUZGMDlcdTIxOTIgXHU1M0VGXHU4QkZCXHU2ODA3XHU3QjdFXHVGRjFBXHU1NDA4XHU2MjEwIHJldmlldzo8c2hhPiBcdTYzMDdcdTU0MTFcdTYzRDBcdTRFQTRcdUZGMENjaGdfKiBcdTYzMDdcdTU0MTFcdTUzRDhcdTY2RjRcdUZGMENhZGhvYyBcdTRFM0FcdTVERTVcdTRGNUNcdTUzM0FcdTMwMDIgKi9cclxuZnVuY3Rpb24gaXNzdWVUYXJnZXRMYWJlbChjaGFuZ2VJZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICBjb25zdCBpZCA9IHR5cGVvZiBjaGFuZ2VJZCA9PT0gJ3N0cmluZycgPyBjaGFuZ2VJZCA6ICcnXHJcbiAgaWYgKGlkLnN0YXJ0c1dpdGgoJ3JldmlldzonKSkgcmV0dXJuIGBcdTYzRDBcdTRFQTQgJHtpZC5zbGljZSg3LCAxNSl9YFxyXG4gIGlmIChpZCA9PT0gJ2FkaG9jJykgcmV0dXJuICdcdTVERTVcdTRGNUNcdTUzM0EnXHJcbiAgcmV0dXJuIGBcdTUzRDhcdTY2RjQgJHtpZC5zbGljZSgwLCAxMSl9YFxyXG59XHJcblxyXG4vKiogXHU2MDNCXHU3RUQzL1x1N0VEM1x1Njc4NFx1NTMxNlx1N0IxNFx1OEJCMFx1NzY4NFx1OEY3Qlx1OTFDRiBNYXJrZG93biBcdTZFMzJcdTY3RDNcdUZGMUFcdTMwMEMjIyBcdTMwMERcdTgyODJcdTY4MDdcdTk4OThcdTc3NDBcdTgyNzJcdTUyQTBcdTdDOTdcdUZGMENcdTMwMEMtIFx1MzAwRFx1NTIxN1x1ODg2OFx1NTJBMFx1NTcwNlx1NzBCOVx1RkYwQ1x1NTE3Nlx1NEY1OVx1NTM5Rlx1NjgzN1x1MzAwMiAqL1xyXG5mdW5jdGlvbiByZW5kZXJTdHJ1Y3R1cmVkQ29udGVudChjb250ZW50OiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XHJcbiAgaWYgKHR5cGVvZiBjb250ZW50ICE9PSAnc3RyaW5nJyB8fCBjb250ZW50ID09PSAnJykgcmV0dXJuIFtdXHJcbiAgcmV0dXJuIGNvbnRlbnQuc3BsaXQoJ1xcbicpLm1hcCgobGluZSwgaW5kZXgpID0+IHtcclxuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJyMjICcpKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTIuNXB4JywgbWFyZ2luVG9wOiBpbmRleCA9PT0gMCA/IDAgOiAxMCwgbWFyZ2luQm90dG9tOiAyLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+XHJcbiAgICAgICAgICB7bGluZS5zbGljZSgzKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKVxyXG4gICAgfVxyXG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnLSAnKSkge1xyXG4gICAgICByZXR1cm4gPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17eyBwYWRkaW5nTGVmdDogMTQsIHRleHRJbmRlbnQ6IC0xMCB9fT5cdTIwMjIge3JlbmRlcldpdGhQZWVrKGxpbmUuc2xpY2UoMikpfTwvZGl2PlxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0+e2xpbmUgPT09ICcnID8gJ1xcdTAwQTAnIDogcmVuZGVyV2l0aFBlZWsobGluZSl9PC9kaXY+XHJcbiAgfSlcclxufVxyXG5cclxuLyoqIHBlZWsgXHU3MEI5XHU1MUZCXHU1NkRFXHU4QzAzXHVGRjFBXHU3NTMxIFdvcmtzcGFjZUZyYW1lIFx1NkNFOFx1NTE2NVx1RkYwOFx1NkUzMlx1NjdEM1x1NTY2OFx1NEZERFx1NjMwMVx1NkEyMVx1NTc1N1x1N0VBN1x1N0VBRlx1NTFGRFx1NjU3MFx1RkYwOVx1MzAwMiAqL1xyXG5sZXQgcGVla09wZW5lcjogKChwYXRoOiBzdHJpbmcsIGxpbmU6IG51bWJlcikgPT4gdm9pZCkgfCB1bmRlZmluZWRcclxuXHJcbi8qKiBcdTYyOEFcdTY1ODdcdTY3MkNcdTRFMkRcdTc2ODQgZmlsZTpsaW5lIFx1NUYxNVx1NzUyOFx1NkUzMlx1NjdEM1x1NEUzQVx1NTNFRlx1NzBCOVx1NTFGQlx1ODJBRlx1NzI0N1x1RkYwOFx1NzBCOVx1NTFGQlx1NUYzOVx1NTFGQVx1NEVFM1x1NzgwMVx1NEUwQVx1NEUwQlx1NjU4N1x1RkYwOVx1MzAwMiAqL1xyXG5mdW5jdGlvbiByZW5kZXJXaXRoUGVlayh0ZXh0OiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGUge1xyXG4gIGNvbnN0IG5vZGVzOiBSZWFjdC5SZWFjdE5vZGVbXSA9IFtdXHJcbiAgbGV0IGxhc3QgPSAwXHJcbiAgbGV0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXkgfCBudWxsXHJcbiAgRklMRV9MSU5FX1BBVFRFUk4ubGFzdEluZGV4ID0gMFxyXG4gIHdoaWxlICgobWF0Y2ggPSBGSUxFX0xJTkVfUEFUVEVSTi5leGVjKHRleHQpKSAhPT0gbnVsbCkge1xyXG4gICAgaWYgKG1hdGNoLmluZGV4ID4gbGFzdCkgbm9kZXMucHVzaCh0ZXh0LnNsaWNlKGxhc3QsIG1hdGNoLmluZGV4KSlcclxuICAgIGNvbnN0IFtmdWxsLCBwYXRoLCBsaW5lU3RyXSA9IG1hdGNoXHJcbiAgICBub2Rlcy5wdXNoKFxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAga2V5PXtgJHttYXRjaC5pbmRleH0tJHtmdWxsfWB9XHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJywgYm9yZGVyOiAnbm9uZScsIHBhZGRpbmc6ICcwIDFweCcsIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsXHJcbiAgICAgICAgICBmb250U2l6ZTogJ2luaGVyaXQnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lIGRvdHRlZCcsXHJcbiAgICAgICAgfX1cclxuICAgICAgICB0aXRsZT1cIlx1NzBCOVx1NTFGQlx1NjdFNVx1NzcwQlx1NEVFM1x1NzgwMVx1NEUwQVx1NEUwQlx1NjU4N1wiXHJcbiAgICAgICAgb25DbGljaz17KCkgPT4geyBwZWVrT3BlbmVyPy4ocGF0aCwgTnVtYmVyKGxpbmVTdHIpKSB9fVxyXG4gICAgICA+e2Z1bGx9PC9idXR0b24+LFxyXG4gICAgKVxyXG4gICAgbGFzdCA9IG1hdGNoLmluZGV4ICsgZnVsbC5sZW5ndGhcclxuICB9XHJcbiAgaWYgKGxhc3QgPCB0ZXh0Lmxlbmd0aCkgbm9kZXMucHVzaCh0ZXh0LnNsaWNlKGxhc3QpKVxyXG4gIHJldHVybiBub2Rlcy5sZW5ndGggPT09IDEgPyBub2Rlc1swXSA6IDxzcGFuPntub2Rlc308L3NwYW4+XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBcdTg5QzZcdTg5QzlcdTYzNjJcdTUyMTdcdTY4MzdcdTVGMEZcdTg4NjhcdUZGMUFcdTk2OEZcdTY3MkNcdTdFQzRcdTRFRjZcdTYzMDJcdThGN0QvXHU1Mzc4XHU4RjdEXHVGRjA4XHU1Mzc4XHU4RjdEXHU1MzczXHU1QjhDXHU1MTY4XHU2MDYyXHU1OTBEXHU1MzlGXHU3NTFGXHU1RTAzXHU1QzQwXHVGRjA5XHUzMDAyXHJcbiAqIFx1NjM2Mlx1NTIxN1x1NjYyRlx1NjVFMFx1Njc2MVx1NEVGNlx1NzY4NFx1RkYwOFx1NTQyQlx1NjVCMFx1NEYxQVx1OEJERFx1ODQzRFx1NTczMFx1OTg3NVx1RkYwOVx1MjAxNFx1MjAxNFx1NEUxQVx1NEUzQlx1ODlDNFx1NTIxOVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1ODk4MVx1NEU0OFx1NEUwRFx1NjYzRVx1NzkzQVx1MzAwMVx1ODk4MVx1NEU0OFx1NUM0NVx1NEUyRFx1RkYwQ1xyXG4gKiBcdTUzRjNcdTRGQTdcdTUzRUFcdTUxNDFcdThCQjhcdTgwNEFcdTU5MjlcdTMwMDIwLjEuMiBcdTY1QjBcdTRGMUFcdThCRERcdTk4NzVcdTRFNUZcdTVFMjYgZGF0YS1kZXRhaWxzLWNvbGxhcHNlZFx1RkYwQ1x1NjZGRVx1NTZFMFx1NUJGOVx1NUI4M1x1OEM0MVx1NTE0RFxyXG4gKiBcdTYzNjJcdTUyMTdcdTVCRkNcdTgxRjRcdTVERTVcdTRGNUNcdTUzRjBcdTU3MjhcdTY1QjBcdTRGMUFcdThCRERcdTRFMEJcdTkwMDBcdTU2REVcdTUzOUZcdTc1MUZcdTUzRjNcdTRGNERcdUZGMDgyMDI2LTA5LTEwIFx1NEZFRVx1NTkwRFx1RkYwOVx1MzAwMlxyXG4gKiBcdTZDRThcdTYxMEZcdUZGMUFcdTc5ODFcdTZCNjJcdTc1MjggOmhhcygpIFx1NTA1QVx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1MjAxNFx1MjAxNFx1NUI5OFx1NjVCOVx1Njc4NFx1NUVGQVx1NEVBN1x1NzI2OVx1NTFFMFx1NTM0MVx1NEUyQVx1N0VDNFx1NEVGNlx1NjgzOVx1N0M3Qlx1OTBGRFx1NTNFQiByb290XHVGRjBDXHJcbiAqIFx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1NEYxQVx1NjI4QVx1NjU3NFx1NEUyQVx1ODA0QVx1NTkyOVx1NUJCOVx1NTY2OFx1OEJFRlx1OTRCM1x1NTIzNlx1RkYwOFx1NTM4Nlx1NTNGMlx1NEU4Qlx1NjU0NVx1RkYwOVx1MzAwMlx1NkI2NFx1ODg2OFx1NTNFQVx1NEZERFx1NzU1OVx1N0Y1MVx1NjgzQ1x1NjM2Mlx1NTIxN1x1NEUwRVx1NjJENlx1NjJGRFx1NjdDNFx1OTY5MFx1ODVDRlx1MzAwMlxyXG4gKi9cclxuY29uc3QgTEFZT1VUX1NUWUxFID0gYFxyXG5kaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdID4gZGl2W2NsYXNzKj1cImNlbnRlckNvbFwiXSB7IG9yZGVyOiAzOyB9XHJcbmRpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0gPiBkaXZbY2xhc3MqPVwiZGV0YWlsc0NvbFwiXSB7IG9yZGVyOiAyOyB9XHJcbmRpdltjbGFzcyo9XCJoYW5kbGVcIl1bZGF0YS1zaWRlPVwiZGV0YWlsc1wiXSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxyXG5kaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdIHtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gbWlubWF4KDAsIDFmcikgdmFyKC0tcGMtY2hhdC13LCAzNjBweCkgIWltcG9ydGFudDtcclxufVxyXG5gXHJcblxyXG4vKipcclxuICogXHU0RjFBXHU4QkREXHU3RURGXHU4QkExXHU4ODRDXHU3Njg0XHU0RTI0XHU4ODRDXHU5NEIzXHU1MjM2XHVGRjA4XHU3NTI4XHU2MjM3XHU2MzA3XHU1QjlBXHU3Njg0XHU2ODM3XHU1RjBGXHVGRjA5XHUzMDAyXHU0RTBEXHU4MEZEXHU4RDcwIENTUyBcdTkwMDlcdTYyRTlcdTU2NjhcdUZGMUFcclxuICogXHU1Qjk4XHU2NUI5XHU1OTFBXHU0RTJBXHU2QTIxXHU1NzU3XHU3Njg0XHU2ODM5XHU3QzdCXHU5MEZEXHU1M0VCIGByb290YFx1RkYwOFx1Njc4NFx1NUVGQVx1NTQwRVx1NjYyRiBgaGFzaF9yb290YFx1RkYwOVx1RkYwQ1x1NTE3Nlx1NEUyRFxyXG4gKiBDb252ZXJzYXRpb25Sb290IFx1NzY4NFx1NUI1MFx1NjgxMVx1OTFDQ1x1NUMzMVx1NTMwNVx1NTQyQlx1N0VERlx1OEJBMVx1ODg0Q1x1NzY4NCBgaGFzaF9zZXBgIFx1NTIwNlx1OTY5NCBzcGFuXHUyMDE0XHUyMDE0XHJcbiAqIFx1NEVGQlx1NEY1NVx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1RkYwOFx1NTQyQiA6aGFzKClcdUZGMDlcdTkwRkRcdTRGMUFcdTYyOEFcdTY1NzRcdTRFMkFcdTgwNEFcdTU5MjlcdTVCQjlcdTU2NjhcdTk0QjNcdTYyMTBcdTRFMjRcdTg4NENcdUZGMENcdTY3NDBcdTZCN0JcdTZFREFcdTUyQThcdTMwMDJcclxuICogXHU1NkUwXHU2QjY0XHU1NzI4XHU4RkQwXHU4ODRDXHU2NUY2XHU2MzA5XHU1NTJGXHU0RTAwXHU1RjYyXHU3MkI2XHU1QjlBXHU0RjREXHVGRjFBXHU1QzQ1XHU0RTJEXHU2MzkyXHU3MjQ4ICsgXHU3NkY0XHU2M0E1XHU1QjUwXHU0RUUzXHU1NDJCXHU2NTg3XHU2NzJDIFwifFwiIFx1NzY4NFxyXG4gKiBcdTUyMDZcdTk2OTQgc3Bhblx1RkYwQ1x1NTQ3RFx1NEUyRFx1NTQwRVx1NjI4QVx1NUI5OFx1NjVCOVx1N0M3Qlx1NTQwRFx1NTM5Rlx1NjgzN1x1NTE5OVx1OEZEQlx1NjgzN1x1NUYwRlx1ODg2OFx1RkYwOFx1N0NCRVx1NTFDNlx1NTIzMFx1Njc4NFx1NUVGQVx1NTRDOFx1NUUwQ1x1RkYwOVx1MzAwMlxyXG4gKiBAcmV0dXJucyBcdTZDRThcdTUxNjVcdTc2ODQgc3R5bGUgXHU1MTQzXHU3RDIwXHVGRjFCXHU1Qjk4XHU2NUI5XHU2NzJBXHU2RTMyXHU2N0QzXHU3RURGXHU4QkExXHU4ODRDXHU2NUY2XHU0RTNBIHVuZGVmaW5lZFx1MzAwMlxyXG4gKi9cclxuY29uc3QgYXBwbHlTdGF0c0xpbmVDbGFtcCA9ICgpOiBIVE1MU3R5bGVFbGVtZW50IHwgdW5kZWZpbmVkID0+IHtcclxuICBjb25zdCBzZXBTcGFuID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxTcGFuRWxlbWVudD4oJ2RpdltjbGFzcyo9XCJfcm9vdFwiXSA+IHNwYW5bY2xhc3MqPVwiX3NlcFwiXScpKVxyXG4gICAgLmZpbmQoKHNwYW4pID0+IHNwYW4udGV4dENvbnRlbnQgPT09ICd8JylcclxuICBjb25zdCByb290RGl2ID0gc2VwU3Bhbj8ucGFyZW50RWxlbWVudFxyXG4gIGNvbnN0IGhhc2hDbGFzcyA9IHJvb3REaXY/LmNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pLmZpbmQoKG5hbWUpID0+IG5hbWUuZW5kc1dpdGgoJ19yb290JykpXHJcbiAgaWYgKHJvb3REaXYgPT09IHVuZGVmaW5lZCB8fCByb290RGl2ID09PSBudWxsIHx8IGhhc2hDbGFzcyA9PT0gdW5kZWZpbmVkIHx8IGdldENvbXB1dGVkU3R5bGUocm9vdERpdikudGV4dEFsaWduICE9PSAnY2VudGVyJykgcmV0dXJuIHVuZGVmaW5lZFxyXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxyXG4gIHN0eWxlLmlkID0gJ3BjLXN0YXRzLWNsYW1wJ1xyXG4gIHN0eWxlLnRleHRDb250ZW50ID0gYFxyXG5kaXZbY2xhc3M9XCIke2hhc2hDbGFzc31cIl0ge1xyXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gIC13ZWJraXQtbGluZS1jbGFtcDogMjtcclxuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcclxuICB0ZXh0LW92ZXJmbG93OiBjbGlwO1xyXG4gIGZvbnQtc2l6ZTogMTFweDtcclxuICBsaW5lLWhlaWdodDogMS41O1xyXG4gIG1heC13aWR0aDogMTAwJTtcclxufVxyXG5gXHJcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSlcclxuICByZXR1cm4gc3R5bGVcclxufVxyXG5cclxudHlwZSBUYWJLZXkgPSAnY29tbWl0cycgfCAnb3ZlcnZpZXcnIHwgJ2V4ZWN1dGlvbicgfCAncmV2aWV3JyB8ICdub3RlcycgfCAnc2V0dGluZ3MnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZUZyYW1lUHJvcHMge1xyXG4gIC8qKiBcdTVCOThcdTY1QjkgZGV0YWlscyBcdTY5RkRcdTU5NTFcdTdFQTZcdTc2ODQgbG9jYWxlIFx1NkNFOFx1NTE2NVx1RkYwOFx1NjIxMVx1NEVFQ1x1NkNFOFx1NTE4Q1x1NzY4NCBwcm9qZWN0LWNvbnRyb2wgXHU4QkNEXHU1MTc4XHVGRjA5XHUzMDAyICovXHJcbiAgdD86IChrZXk6IHN0cmluZykgPT4gc3RyaW5nXHJcbiAgLyoqIFx1NUY1M1x1NTI0RFx1NEYxQVx1OEJERCBpZFx1RkYwOFx1NUI5OFx1NjVCOSBzZXNzaW9uIFx1NjgwN1x1NTFDNlx1NUM1RVx1NjAyN1x1RkYxQlx1NTIwN1x1NjM2Mlx1NEYxQVx1OEJERFx1NjVGNlx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1NURFNVx1NEY1Q1x1NTNGMFx1OEY2OFx1OTA1M1x1RkYwOVx1MzAwMiAqL1xyXG4gIHNlc3Npb25JZD86IHN0cmluZ1xyXG4gIC8qKiBcdTY1QjBcdTcyNDhcdTVCQkZcdTRFM0JcdTc1MzFcdTU5MTZcdTVDNDJcdTUyQTBcdTZDRDVcdTZENkVcdTVDNDJcdTdCQTFcdTc0MDZcdTVFMDNcdTVDNDBcdUZGMENcdTRFMERcdTRGN0ZcdTc1MjhcdTY1RTdcdTcyNDggZGV0YWlscyBcdTYzNjJcdTUyMTdcdTMwMDIgKi9cclxuICBsYXlvdXRNb2RlPzogJ2xlZ2FjeScgfCAnb3ZlcmxheSdcclxufVxyXG5cclxuLyoqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NjU4N1x1Njg0OFx1OEJDRFx1NTE3OFx1RkYwOHpoIC8gZW5cdUZGMDlcdTMwMDIgKi9cclxuZXhwb3J0IGNvbnN0IFdPUktTUEFDRV9ESUNUID0ge1xyXG4gIHpoOiB7XHJcbiAgICAnd29ya3NwYWNlLnRpdGxlJzogJ1x1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMCcsXHJcbiAgICAnd29ya3NwYWNlLnNlbGVjdFNlc3Npb24nOiAnXHU4QkY3XHU1MTQ4XHU1NzI4XHU1REU2XHU0RkE3XHU5MDA5XHU2MkU5XHU5ODc5XHU3NkVFXHU0RTBCXHU3Njg0XHU0RjFBXHU4QkREXHVGRjBDXHU1REU1XHU0RjVDXHU1M0YwXHU2MjREXHU0RjFBXHU2NjNFXHU3OTNBXHU4QkU1XHU5ODc5XHU3NkVFXHU3Njg0XHU2NTcwXHU2MzZFXHUzMDAyJyxcclxuICAgICd0YWIuY29tbWl0cyc6ICdcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTUnLFxyXG4gICAgJ3RhYi5vdmVydmlldyc6ICdcdTk4NzlcdTc2RUVcdTYwM0JcdTg5QzgnLFxyXG4gICAgJ3RhYi5leGVjdXRpb24nOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzJyxcclxuICAgICd0YWIucmV2aWV3JzogJ1JldmlldyBcdTk1RUVcdTk4OTgnLFxyXG4gICAgJ3RhYi5ub3Rlcyc6ICdcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzYnLFxyXG4gICAgJ3RhYi5zZXR0aW5ncyc6ICdcdThCQkVcdTdGNkUnLFxyXG4gICAgJ2Vycm9yLmxvYWQnOiAnXHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1JyxcclxuICAgICdzdGF0ZS5wcm9qZWN0JzogJ1x1NUY1M1x1NTI0RFx1OTg3OVx1NzZFRScsXHJcbiAgICAnc3RhdGUubm9Qcm9qZWN0JzogJ1x1NUMxQVx1NjcyQVx1NTIxRFx1NTlDQlx1NTMxNlx1OTg3OVx1NzZFRScsXHJcbiAgICAnc3RhdGUubm9Qcm9qZWN0SGludCc6ICdcdTcwQjlcdTUxRkJcdTMwMENcdTUyMURcdTU5Q0JcdTUzMTZcdTk4NzlcdTc2RUVcdTMwMERcdTYyNkJcdTYzQ0ZcdTRFRDNcdTVFOTNcdTdFRDNcdTY3ODRcdTMwMDFcdTYyODBcdTY3MkZcdTY4MDhcdTRFMEVcdTdCMjZcdTUzRjdcdTdEMjJcdTVGMTVcdTMwMDInLFxyXG4gICAgJ2FjdGlvbi5ib290c3RyYXAnOiAnXHU1MjFEXHU1OUNCXHU1MzE2XHU5ODc5XHU3NkVFJyxcclxuICAgICdhY3Rpb24ucmVzY2FuJzogJ1x1OTFDRFx1NjVCMFx1NTIxRFx1NTlDQlx1NTMxNiAvIFx1NjI2Qlx1NjNDRicsXHJcbiAgICAnYWN0aW9uLmFuYWx5emUnOiAnXHU1MjA2XHU2NzkwXHU1RjUzXHU1MjREXHU2NTM5XHU1MkE4JyxcclxuICAgICdhY3Rpb24ucmV2aWV3JzogJ1x1OEJDNFx1NUJBMVx1NUY1M1x1NTI0RFx1NjUzOVx1NTJBOCcsXHJcbiAgICAnYWN0aW9uLnZlcmlmeSc6ICdcdTlBOENcdTY1MzZcdTVGNTNcdTUyNERcdTY1MzlcdTUyQTgnLFxyXG4gICAgJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnOiAnXHU2NUIwXHU1RUZBXHU1M0Q4XHU2NkY0JyxcclxuICAgICdhY3Rpb24ucnVubmluZyc6ICdcdTYyNjdcdTg4NENcdTRFMkRcdTIwMjYnLFxyXG4gICAgJ2FjdGlvbi5yZWZyZXNoJzogJ1x1NTIzN1x1NjVCMCcsXHJcbiAgICAnZm9ybS5jaGFuZ2VUaXRsZSc6ICdcdTUzRDhcdTY2RjRcdTY4MDdcdTk4OTgnLFxyXG4gICAgJ2Zvcm0uY2hhbmdlRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMDhcdTkwMDlcdTU4NkJcdUZGMDknLFxyXG4gICAgJ3Jlc3VsdC5wYW5lbCc6ICdcdTY0Q0RcdTRGNUNcdTdFRDNcdTY3OUMnLFxyXG5cclxuICAgICdyZXBvLnNjYW5IaXN0b3J5JzogJ1x1OTFDRFx1NUVGQVx1NTM4Nlx1NTNGMicsXHJcbiAgICAncmVwby5jb21taXRzJzogJ1x1NjNEMFx1NEVBNCcsXHJcbiAgICAncmVwby5icmFuY2gnOiAnXHU1MjA2XHU2NTJGJyxcclxuICAgICdyZXBvLndvcmtpbmcnOiAnXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcclxuICAgICdyZXBvLndvcmtpbmdDbGVhbic6ICdcdTVERTVcdTRGNUNcdTUzM0FcdTVFNzJcdTUxQzBcdUZGMENcdTY1RTBcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQTgnLFxyXG4gICAgJ3JlcG8uZW1wdHknOiAnXHU2NjgyXHU2NUUwXHU2M0QwXHU0RUE0XHUzMDAyJyxcclxuICAgICdyZXBvLmxvYWRGYWlsZWQnOiAnXHU2M0QwXHU0RUE0XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1JyxcclxuICAgICdwaWNrZXIudGl0bGUnOiAnXHU5MDA5XHU2MkU5XHU4OTgxXHU2ODM4XHU2N0U1XHU3Njg0XHU2M0QwXHU0RUE0XHVGRjA4XHU1M0VGXHU1OTFBXHU5MDA5XHVGRjA5JyxcclxuICAgICdwaWNrZXIucGxhY2Vob2xkZXInOiAnXHU3MEI5XHU1MUZCXHU5MDA5XHU2MkU5XHU2M0QwXHU0RUE0XHVGRjA4XHU1M0VGXHU1OTFBXHU5MDA5XHVGRjBDXHU1NDJCXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4XHVGRjA5JyxcclxuICAgICdwaWNrZXIuc2VsZWN0ZWQnOiAnXHU1REYyXHU5MDA5JyxcclxuICAgICdwaWNrZXIuZmlsdGVyJzogJ1x1NjMwOVx1NjgwN1x1OTg5OC9cdTU0QzhcdTVFMEMvXHU0RjVDXHU4MDA1XHU4RkM3XHU2RUU0XHUyMDI2JyxcclxuICAgICdwaWNrZXIuY2xlYXInOiAnXHU2RTA1XHU3QTdBJyxcclxuICAgICdwaWNrZXIubm9NYXRjaCc6ICdcdTY1RTBcdTUzMzlcdTkxNERcdTYzRDBcdTRFQTRcdTMwMDInLFxyXG4gICAgJ3BpY2tlci5oaW50JzogJ1x1NTJGRVx1OTAwOVx1NjNEMFx1NEVBNFx1NTQwRVx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMCBBSSBcdTg5RTNcdThCRkJcdUZGMUJcdTRFMEJcdTY1QjlcdTUzRUZcdTUxOERcdThERDFcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdTRFMEVcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTVcdTMwMDInLFxyXG4gICAgJ3BpY2tlci5yb3VuZCc6ICdcdTdCMkMge259IFx1OEY2RScsXHJcbiAgICAncGlja2VyLnJvdW5kTGF0ZXN0JzogJ1x1N0IyQyB7bn0gXHU4RjZFXHVGRjA4XHU2NzAwXHU2NUIwXHVGRjA5JyxcclxuICAgICdwaWNrZXIucm91bmRTZWxlY3QnOiAnXHU5MDA5XHU2NTc0XHU4RjZFJyxcclxuICAgICdwaWNrZXIucm91bmRDbGVhcic6ICdcdTUzRDZcdTZEODhcdTY3MkNcdThGNkUnLFxyXG4gICAgJ3BpY2tlci51bmRpZ2VzdGVkJzogJ1x1NEUwQVx1NkIyMSBBSSBcdTYwM0JcdTdFRDNcdTRFNEJcdTU0MEVcdTMwMDFcdTRFMTRcdTVDMUFcdTY3MkFcdTc1MUZcdTYyMTBcdThGQzcgQUkgXHU4OUUzXHU4QkZCXHU3Njg0XHU2NUIwXHU2M0QwXHU0RUE0JyxcclxuICAgICdwaWNrZXIudW5kaWdlc3RlZENvdW50JzogJ3tufSBcdTRFMkFcdTYzRDBcdTRFQTRcdTY3MkFcdTZEODhcdTUzMTYnLFxyXG4gICAgJ3BpY2tlci5zZWxlY3RBbGxVbmRpZ2VzdGVkJzogJ1x1NTE2OFx1OTAwOVx1NjcyQVx1NkQ4OFx1NTMxNicsXHJcbiAgICAncGlja2VyLmRpZ2VzdEFsbCc6ICdcdTRFMDBcdTk1MkVcdTZEODhcdTUzMTYnLFxyXG4gICAgJ3BpY2tlci5kaWdlc3RBbGxIaW50JzogJ1x1OTAwOVx1NEUyRFx1NTE2OFx1OTBFOFx1NjcyQVx1NkQ4OFx1NTMxNlx1NjNEMFx1NEVBNFx1NUU3Nlx1NjI3OVx1OTFDRiBBSSBcdTg5RTNcdThCRkJcdUZGMDhcdTVFNzZcdTUzRDEgM1x1RkYwQ1x1NjcwOVx1N0YxM1x1NUI1OFx1RkYwOVx1RkYwQ1x1NUI4Q1x1NjIxMFx1NTQwRVx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1NjU3NFx1NEY1M1x1NTNEOVx1NEU4Qlx1RkYxQlx1NEU0Qlx1NTQwRVx1NTIzMFx1MzAwQ1x1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNlx1MzAwRFx1NzUxRlx1NjIxMFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1NTM3M1x1NTNFRlx1OTFDRFx1N0Y2RVx1NjcyQVx1NkQ4OFx1NTMxNlx1NjgwN1x1OEJCMCcsXHJcbiAgICAnbmFycmF0aXZlLmRpZ2VzdEhpbnQnOiAnXHU2NTc0XHU0RjUzXHU1M0Q5XHU0RThCXHU1REYyXHU3NTFGXHU2MjEwXHUzMDAyXHU1MjMwXHUzMDBDXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHUzMDBEXHU5ODc1XHU3NTFGXHU2MjEwIEFJIFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1RkYwQ1x1NTM3M1x1NTNFRlx1OTFDRFx1N0Y2RVx1MzAwQ1x1NjcyQVx1NkQ4OFx1NTMxNlx1MzAwRFx1NjgwN1x1OEJCMFx1MzAwMicsXHJcbiAgICAnaW1wYWN0LmZhY3RvcnMnOiAnXHU5OENFXHU5NjY5XHU2Nzg0XHU2MjEwXHVGRjA4XHU0RTNBXHU0RUMwXHU0RTQ4XHU2NjJGXHU4RkQ5XHU0RTJBXHU3QjQ5XHU3RUE3XHVGRjA5JyxcclxuICAgICdpbXBhY3QucG9pbnRzJzogJ1x1NUY3MVx1NTRDRFx1NzBCOVx1NjYwRVx1N0VDNicsXHJcbiAgICAnaW1wYWN0LmtleVBvaW50cyc6ICdcdTUxNzNcdTk1MkVcdTdFQzRcdTRFRjYnLFxyXG4gICAgJ2ltcGFjdC5tZW1vcnknOiAnXHU3RUQzXHU1NDA4XHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHU2ODM4XHU2N0U1JyxcclxuICAgICdpbXBhY3QuZnVuY3Rpb25zJzogJ1x1NTNEN1x1NUY3MVx1NTRDRFx1NTFGRFx1NjU3MFx1RkYwOFx1OEMwMVx1OEMwM1x1NzUyOFx1NEU4Nlx1ODhBQlx1NjUzOVx1NzY4NFx1NEVFM1x1NzgwMVx1RkYwOScsXHJcbiAgICAnaW1wYWN0LmZ1bmNSb2xlJzogJ1x1NTFGRFx1NjU3MFx1NTI5Rlx1ODBGRCcsXHJcbiAgICAnaW1wYWN0LmZ1bmNDaGFuZ2UnOiAnXHU2NzJDXHU2QjIxXHU1M0Q4XHU1MzE2JyxcclxuICAgICdpbXBhY3QuZnVuY0NhbGxlcnMnOiAnXHU1QkY5XHU4QzAzXHU3NTI4XHU2NUI5XHU3Njg0XHU1RjcxXHU1NENEJyxcclxuICAgICdjYWNoZS5oaXQnOiAnXHU2NzY1XHU4MUVBXHU3RjEzXHU1QjU4JyxcclxuICAgICdjYWNoZS5yZWdlbmVyYXRlJzogJ1x1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMCcsXHJcbiAgICAnY29zdC50b29sdGlwJzogJ1x1NjcyQ1x1NkIyMSBBSSBcdThDMDNcdTc1MjhcdTYyMTBcdTY3MkNcdUZGMDhcdTRGMzBcdTdCOTdcdUZGMENcdTYzMDkgRGVlcFNlZWsgXHU0RUY3XHU3NkVFXHU2Mjk4XHU3Qjk3XHVGRjA5JyxcclxuICAgICdleGVjLmNyZWF0ZSc6ICdcdTY1QjBcdTVFRkFcdTYyNjdcdTg4NEMnLFxyXG4gICAgJ2V4ZWMuZm9ybVRpdGxlJzogJ1x1ODk4MVx1NTA1QVx1NEVDMFx1NEU0OFx1RkYwOFx1NEUwMFx1NTNFNVx1OEJERFx1RkYwOScsXHJcbiAgICAnZXhlYy5mb3JtRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMUFcdTc2RUVcdTY4MDdcdTMwMDFcdTZEODlcdTUzQ0FcdTZBMjFcdTU3NTdcdTMwMDFcdTlBOENcdTY1MzZcdTY4MDdcdTUxQzYnLFxyXG4gICAgJ2V4ZWMuc3RhcnQnOiAnXHU1RjAwXHU1OUNCXHU2MjY3XHU4ODRDJyxcclxuICAgICdleGVjLnN0YXJ0aW5nJzogJ1x1NkI2M1x1NTcyOFx1NTQyRlx1NTJBOFx1MjAyNicsXHJcbiAgICAnZXhlYy5jcmVhdGVIaW50JzogJ1x1NTIxQlx1NUVGQVx1NTNEOFx1NjZGNFx1NUU3Nlx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1OEJBMVx1NTIxMlx1RkYwQ1x1OTY4Rlx1NTQwRVx1NzUzMSBBSSBcdTVCNTBcdTRFRTNcdTc0MDZcdTkwMTBcdTZCNjVcdTYyNjdcdTg4NENcdUZGMUJcdThGREJcdTVFQTZcdTU3MjhcdTRFMEJcdTY1QjlcdTVCOUVcdTY1RjZcdTUyMzdcdTY1QjBcdUZGMENcdTY1RTBcdTk3MDBcdTUzQkJcdTgwNEFcdTU5MjlcdTMwMDInLFxyXG4gICAgJ2V4ZWMubW9kZWxEZWZhdWx0JzogJ1x1NjI2N1x1ODg0Q1x1NkEyMVx1NTc4Qlx1RkYwOFx1ODlEMlx1ODI3Mlx1OUVEOFx1OEJBNFx1RkYxQVx1NTIwNlx1Njc5MC9cdTY0Q0RcdTRGNUM9XHU1RkVCXHVGRjBDXHU1RjAwXHU1M0QxPVx1NjgwN1x1NTFDNlx1RkYwQ1x1ODlDNFx1NTIxMj1cdTYzQThcdTc0MDZcdUZGMENcdTlBOENcdTY1MzY9XHU5QThDXHU2NTM2XHU3RUE3XHVGRjA5JyxcclxuICAgICdiYWRnZS5ydW5uaW5nJzogJ3tufSBcdTRFMkFcdTRFRkJcdTUyQTFcdThGRDBcdTg4NENcdTRFMkRcdUZGMENcdTcwQjlcdTUxRkJcdTY3RTVcdTc3MEInLFxyXG4gICAgJ25hcnJhdGl2ZS50aXRsZSc6ICdcdTVERTVcdTRGNUNcdThGNkVcdTZCMjFcdTUzRDlcdTRFOEInLFxyXG4gICAgJ25hcnJhdGl2ZS5nZW5lcmF0ZSc6ICdcdTY1NzRcdTRGNTNcdTg5RTNcdThCRkJcdThGRDlcdThGNkVcdTVERTVcdTRGNUMnLFxyXG4gICAgJ25hcnJhdGl2ZS5ydW5uaW5nJzogJ1x1ODlFM1x1OEJGQlx1NzUxRlx1NjIxMFx1NEUyRFx1MjAyNlx1RkYwOFx1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxyXG4gICAgJ2JhZGdlLmZhaWxlZCc6ICd7bn0gXHU0RTJBXHU0RUZCXHU1MkExXHU5NzAwXHU4OTgxXHU1OTA0XHU3NDA2XHVGRjBDXHU3MEI5XHU1MUZCXHU2N0U1XHU3NzBCJyxcclxuICAgICdleGVjLmZsb3dDcmVhdGUnOiAnXHU1ODZCXHU1MTk5XHU0RUZCXHU1MkExJyxcclxuICAgICdleGVjLmZsb3dPcmNoZXN0cmF0ZSc6ICdcdTc4NkVcdThCQTRcdTdGMTZcdTYzOTJcdUZGMDhcdTZCQ0ZcdTZCNjVcdTUzRUZcdTY1MzlcdTZBMjFcdTU3OEIvXHU4OUQyXHU4MjcyL1x1NTkzMVx1OEQyNVx1N0I1Nlx1NzU2NVx1RkYwOScsXHJcbiAgICAnZXhlYy5mbG93UnVuJzogJ1x1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYwOFJ1biBcdThCRTZcdTYwQzVcdTc3MEJcdThGREJcdTVFQTZcdTRFMEVcdTYyMTBcdTY3MkNcdUZGMDknLFxyXG4gICAgJ2V4ZWMuZmxvd01lbW9yeSc6ICdcdTgxRUFcdTUyQThcdTYzRDBcdTcwQkNcdThCQjBcdTVGQzZcdUZGMDhcdThCQjBcdTVGQzZcdTk3NjJcdTY3N0ZcdTc4NkVcdThCQTRcdUZGMDknLFxyXG4gICAgJ2V4ZWMucGxhbm5pbmcnOiAnXHU3RjE2XHU2MzkyXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4TExNIFx1NkI2M1x1NTcyOFx1NjJDNlx1ODlFM1x1NEVGQlx1NTJBMVx1RkYwQ1x1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxyXG4gICAgJ2V4ZWMuY29sLnN0ZXBzJzogJ1x1NkI2NVx1OUFBNCcsXHJcbiAgICAnbm90ZXMuZWRpdCc6ICdcdTdGMTZcdThGOTEnLFxyXG4gICAgJ25vdGVzLnRvTWVtb3J5JzogJ1x1OEY2Q1x1OEJCMFx1NUZDNicsXHJcbiAgICAnbm90ZXMudG9NZW1vcnlIaW50JzogJ1x1NjI4QVx1OEZEOVx1Njc2MVx1N0IxNFx1OEJCMFx1NzY4NFx1NjgwN1x1OTg5OFx1NEUwRVx1NTE4NVx1NUJCOVx1NTg2Qlx1NTE2NVx1NEUwQlx1NjVCOVx1OEJCMFx1NUZDNlx1ODg2OFx1NTM1NVx1RkYwQ1x1Nzg2RVx1OEJBNFx1NTQwRVx1NTE2NVx1NUU5MycsXHJcbiAgICAnbm90ZXMudG9NZW1vcnlEb25lJzogJ1x1MjcxMyBcdTVERjJcdTU4NkJcdTUxNjVcdThCQjBcdTVGQzZcdTg4NjhcdTUzNTVcdUZGMDhcdTU3MjhcdTRFMEJcdTY1QjlcdTMwMENcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdTMwMERcdTUzM0FcdTc4NkVcdThCQTRcdTdDN0JcdTU3OEJcdTU0MEVcdTZERkJcdTUyQTBcdUZGMDknLFxyXG4gICAgJ25vdGVzLmNvcHlNZCc6ICdcdTU5MERcdTUyMzYgTUQnLFxyXG4gICAgJ25vdGVzLmNvcHlNZEhpbnQnOiAnXHU2MjhBXHU4RkQ5XHU2NzYxXHU3QjE0XHU4QkIwXHU1OTBEXHU1MjM2XHU0RTNBIE1hcmtkb3duIFx1NTIzMFx1NTI2QVx1OEQzNFx1Njc3RicsXHJcbiAgICAnbm90ZXMuY29weU1kRG9uZSc6ICdcdTVERjJcdTU5MERcdTUyMzZcdTRFM0EgTWFya2Rvd24nLFxyXG4gICAgJ25vdGVzLmV4cG9ydE1kJzogJ1x1NUJGQ1x1NTFGQSBNRCcsXHJcbiAgICAnbm90ZXMuZXhwb3J0TWRIaW50JzogJ1x1NEUwQlx1OEY3RFx1NEUzQSAubWQgXHU2NTg3XHU0RUY2JyxcclxuICAgICdub3Rlcy5leHBvcnREb25lJzogJ1x1NURGMlx1NUJGQ1x1NTFGQVx1NEUzQSAubWQgXHU2NTg3XHU0RUY2JyxcclxuICAgICdub3Rlcy5kaWdlc3ROZXZlcic6ICdcdTVDMUFcdTY3MkFcdTc1MUZcdTYyMTBcdThGQzcgQUkgXHU2MDNCXHU3RUQzJyxcclxuICAgICdub3Rlcy5kaWdlc3RQZW5kaW5nJzogJ1x1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NTQwRVx1NjcwOSB7bn0gXHU0RTJBXHU2NUIwXHU2M0QwXHU0RUE0XHU2NzJBXHU2RDg4XHU1MzE2JyxcclxuICAgICdkZXRhaWwuc2F2ZU5vdGUnOiAnXHU1QjU4XHU0RTNBXHU3QjE0XHU4QkIwJyxcclxuICAgICdkZXRhaWwuc2F2ZU5vdGVIaW50JzogJ1x1NjI4QVx1NjcyQ1x1NkIyMVx1NjgzOFx1NjdFNVx1N0VEM1x1OEJCQVx1RkYwOFx1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OC9cdTVCOUVcdTczQjBcdTkwM0JcdThGOTEvXHU5OENFXHU5NjY5XHU3MEI5XHVGRjA5XHU0RTAwXHU5NTJFXHU1QjU4XHU0RTNBXHU3RUQzXHU2Nzg0XHU1MzE2XHU3QjE0XHU4QkIwJyxcclxuICAgICdkZXRhaWwuc2F2ZU5vdGVUaXRsZSc6ICdcdTY4MzhcdTY3RTVcdThCQjBcdTVGNTUnLFxyXG4gICAgJ2RldGFpbC5zYXZlTWVtb3J5JzogJ1x1NkM4OVx1NkRDMFx1NEUzQVx1OEJCMFx1NUZDNicsXHJcbiAgICAnZGV0YWlsLnNhdmVNZW1vcnlIaW50JzogJ1x1NjI4QVx1NjcyQ1x1NkIyMVx1NjgzOFx1NjdFNVx1N0VEM1x1OEJCQVx1NkM4OVx1NkRDMFx1NEUzQVx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNlx1RkYwOFx1OEZEQlx1NTE2NVx1NUY4NVx1Nzg2RVx1OEJBNFx1OTYxRlx1NTIxN1x1RkYwOScsXHJcbiAgICAnbm90ZXMuc2F2ZSc6ICdcdTRGRERcdTVCNTgnLFxyXG4gICAgJ25vdGVzLmNhbmNlbCc6ICdcdTUzRDZcdTZEODgnLFxyXG4gICAgJ21lbW9yeS5icmFuY2hTY29wZSc6ICdcdTUyMDZcdTY1MkYnLFxyXG4gICAgJ21lbW9yeS5icmFuY2hBbGwnOiAnXHU1MTY4XHU5MEU4XHU1MjA2XHU2NTJGJyxcclxuICAgICdub3Rlcy5zZWFyY2gnOiAnXHU2NDFDXHU3RDIyXHU3QjE0XHU4QkIwXHUyMDI2JyxcclxuICAgICdtb2RlbC50aXRsZSc6ICdcdTZBMjFcdTU3OEJcdTUyMDZcdTkxNERcdUZGMDhcdTg5RTNcdThCRkIgLyBcdTYwM0JcdTdFRDNcdTdCNDlcdTRFRkJcdTUyQTFcdTc1MjhcdTU0RUFcdTRFMkFcdTZBMjFcdTU3OEJcdUZGMDknLFxyXG4gICAgJ21vZGVsLmxvYWRpbmcnOiAnXHU4QkZCXHU1M0Q2XHU2QTIxXHU1NzhCXHU2RTA1XHU1MzU1XHUyMDI2JyxcclxuICAgICdtb2RlbC5mb2xsb3dDaGF0JzogJ1x1OERERlx1OTY4Rlx1ODA0QVx1NTkyOVx1NkEyMVx1NTc4QicsXHJcbiAgICAnbW9kZWwuc2F2ZSc6ICdcdTRGRERcdTVCNThcdTVFNzZcdTc1MUZcdTY1NDgnLFxyXG4gICAgJ21vZGVsLnNhdmVkJzogJ1x1NURGMlx1NzUxRlx1NjU0OCcsXHJcbiAgICAnbW9kZWwuaGludCc6ICdcdTRGRERcdTVCNThcdTU0MEVcdTdBQ0JcdTUzNzNcdTc1MUZcdTY1NDhcdTVFNzZcdTYzMDFcdTRFNDVcdTUzMTZcdUZGMDhcdTkxQ0RcdTU0MkZcdTU0MEVcdTRGRERcdTc1NTlcdUZGMDlcdUZGMUJcdTRFMERcdTVGNzFcdTU0Q0RcdTgwNEFcdTU5MjlcdTZBMjFcdTU3OEJcdTMwMDInLFxyXG4gICAgJ25vdGVzLmFpU3VtbWFyeSc6ICdBSSBcdTYwM0JcdTdFRDNcdTdCMTRcdThCQjAnLFxyXG4gICAgJ25vdGVzLmFpU3VtbWFyeVJ1bic6ICdcdTYwM0JcdTdFRDNcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhcdTdFQTYgMTAtMzAgXHU3OUQyXHVGRjA5JyxcclxuICAgICdub3Rlcy5leHBhbmQnOiAnXHU1QzU1XHU1RjAwXHU1MTY4XHU2NTg3JyxcclxuICAgICdub3Rlcy5jb2xsYXBzZSc6ICdcdTY1MzZcdThENzcnLFxyXG4gICAgJ25vdGVzLnN1bW1hcnlUYWcnOiAnQUkgXHU2MDNCXHU3RUQzJyxcclxuICAgICdub3Rlcy5lbXB0eVNlYXJjaCc6ICdcdTY1RTBcdTUzMzlcdTkxNERcdTdCMTRcdThCQjBcdTMwMDInLFxyXG4gICAgJ25vdGVzLmNvbnRlbnRIaW50JzogJ1x1N0IxNFx1OEJCMFx1NTE4NVx1NUJCOVx1RkYwOFx1NjUyRlx1NjMwMVx1NTkxQVx1ODg0Q1x1RkYwOVx1RkYxQVx1N0VEM1x1OEJCQVx1MzAwMVx1NzU5MVx1OTVFRVx1MzAwMVx1NUI2Nlx1NEU2MFx1ODk4MVx1NzBCOVx1MzAwMVx1NTE3M1x1OTUyRVx1NTFCM1x1N0I1Nlx1MjAyNicsXHJcbiAgICAnbm90ZXMudGFnc0hpbnQnOiAnXHU2ODA3XHU3QjdFXHVGRjA4XHU5MDE3XHU1M0Y3XHU1MjA2XHU5Njk0XHVGRjBDXHU5MDA5XHU1ODZCXHVGRjFCXHU0RkREXHU1QjU4XHU1NDBFXHU1M0VGXHU3MEI5XHU1MUZCXHU3QjVCXHU5MDA5XHVGRjA5JyxcclxuICAgICdub3Rlcy5waW4nOiAnXHU3RjZFXHU5ODc2JyxcclxuICAgICdub3Rlcy51bnBpbic6ICdcdTUzRDZcdTZEODhcdTdGNkVcdTk4NzYnLFxyXG4gICAgJ25vdGVzLmVkaXRlZEF0JzogJ1x1N0YxNlx1OEY5MVx1NEU4RScsXHJcbiAgICAncmV2aWV3LmZpbHRlckFsbCc6ICdcdTUxNjhcdTkwRTgnLFxyXG4gICAgJ3Jldmlldy5zdGF0dXNBbGwnOiAnXHU1MTY4XHU5MEU4XHU3MkI2XHU2MDAxJyxcclxuICAgICdyZXZpZXcudmVyaWZ5JzogJ1x1NTkwRFx1NjhDMCcsXHJcbiAgICAncmV2aWV3LnZlcmlmeVJ1bm5pbmcnOiAnXHU1OTBEXHU2OEMwXHU0RTJEXHUyMDI2JyxcclxuICAgICdyZXZpZXcudmVyaWZ5SGludCc6ICdcdTRGRUVcdTY1MzlcdTRFRTNcdTc4MDFcdTU0MEVcdTcwQjlcdTUxRkJcdUZGMUFcdTgxRUFcdTUyQThcdTY4QzBcdTZENEJcdTk1RUVcdTk4OThcdTY2MkZcdTU0MjZcdTRGRUVcdTU5MERcdTMwMDFcdTY1MzlcdTUyQThcdTY2MkZcdTU0MjZcdTY3MDBcdTRGMTgvXHU2NzAwXHU1QzBGXHU0RkI1XHU1MTY1XHUzMDAxXHU2NzA5XHU2NUUwXHU2NUIwXHU5NUVFXHU5ODk4XHVGRjFCXHU1MTY4XHU5MEU4XHU5MDFBXHU4RkM3XHU2MjREXHU4MUVBXHU1MkE4XHU3RjZFXHU0RTNBXHU1REYyXHU4OUUzXHU1MUIzJyxcclxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZSc6ICdcdTUyMjRcdTVCOUFcdThCRUZcdTYyQTUnLFxyXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlSGludCc6ICdcdTRFQkFcdTVERTVcdTUyMjRcdTVCOUFcdThCRTVcdTk1RUVcdTk4OThcdTRFM0FcdThCRUZcdTYyQTVcdTVFNzZcdTUxNzNcdTk1RURcdUZGMDhcdTRFMEVcdTU5MERcdTY4QzBcdTg5RTNcdTUxQjNcdTc2ODRcdThCRURcdTRFNDlcdTRFMERcdTU0MENcdUZGMDknLFxyXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlVGl0bGUnOiAnXHU1MjI0XHU1QjlBXHU0RTNBXHU4QkVGXHU2MkE1XHVGRjFGJyxcclxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZU1zZyc6ICdcdTMwMEN7dGl0bGV9XHUzMDBEXHU1QzA2XHU4OEFCXHU2ODA3XHU4QkIwXHU0RTNBXHU4QkVGXHU2MkE1XHVGRjA4XHU1REYyXHU2MkQyXHU3RUREXHVGRjA5XHU1RTc2XHU0RUNFXHU1Rjg1XHU1OTA0XHU3NDA2XHU0RTJEXHU3OUZCXHU5NjY0XHUzMDAyJyxcclxuICAgICdyZXZpZXcuZml4RGV0YWlsJzogJ1x1NEZFRVx1NTkwRFx1OEJFNlx1NjBDNScsXHJcbiAgICAncmV2aWV3LmZpeFN0YXRGaWxlcyc6ICdcdTY1ODdcdTRFRjYnLFxyXG4gICAgJ3Jldmlldy5maXhGaWxlcyc6ICdcdTRGRUVcdTU5MERcdTZEODlcdTUzQ0FcdTY1ODdcdTRFRjYnLFxyXG4gICAgJ3Jldmlldy5maXhJbXBhY3QnOiAnXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHVGRjA4XHU2NTM5XHU1MkE4XHU3QjI2XHU1M0Y3XHU0RTBFXHU4QzAzXHU3NTI4XHU3MEI5XHVGRjA5JyxcclxuICAgICdyZXZpZXcuZGVmaW5lZEluJzogJ1x1NUI5QVx1NEU0OVx1NEU4RScsXHJcbiAgICAncmV2aWV3LmNhbGxDb3VudCc6ICdcdTU5MDRcdThDMDNcdTc1MjgnLFxyXG4gICAgJ3Jldmlldy5maXhEaWZmJzogJ1x1NEZFRVx1NTkwRFx1NURFRVx1NUYwMlx1RkYwOFx1NzZGOFx1NUJGOVx1OEJDNFx1NUJBMVx1NTdGQVx1N0VCRlx1RkYwOScsXHJcbiAgICAncmV2aWV3LnJlZnJlc2gnOiAnXHU1MjM3XHU2NUIwJyxcclxuICAgICdyZXZpZXcucmV0ZW50aW9uSGludCc6ICdcdTVERjJcdTg5RTNcdTUxQjMvXHU4QkVGXHU2MkE1XHU5NUVFXHU5ODk4XHU0RkREXHU3NTU5IHtkYXlzfSBcdTU5MjlcdTU0MEVcdTgxRUFcdTUyQThcdTZFMDVcdTc0MDYnLFxyXG4gICAgJ3Jldmlldy50YXJnZXQnOiAnXHU1QkY5XHU4QzYxJyxcclxuICAgICdyZXZpZXcud29ya2luZ1RhcmdldCc6ICdcdTVERTVcdTRGNUNcdTUzM0EnLFxyXG4gICAgJ3Jldmlldy5leHBvcnRNZCc6ICdcdTVCRkNcdTUxRkEgTUQnLFxyXG4gICAgJ3Jldmlldy5leHBvcnRNZEhpbnQnOiAnXHU2MjhBXHU1RjUzXHU1MjREXHU3QjVCXHU5MDA5XHU0RTBCXHU3Njg0XHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHU0RTBCXHU4RjdEXHU0RTNBIC5tZCBcdTY1ODdcdTRFRjYnLFxyXG4gICAgJ3Jldmlldy5leHBvcnRFbXB0eSc6ICdcdTZDQTFcdTY3MDlcdTUzRUZcdTVCRkNcdTUxRkFcdTc2ODRcdTk1RUVcdTk4OTgnLFxyXG4gICAgJ3Jldmlldy5zZWxlY3RBbGwnOiAnXHU1MTY4XHU5MDA5JyxcclxuICAgICdyZXZpZXcuY2hlY2tlZENvdW50JzogJ1x1NURGMlx1OTAwOSB7bn0gXHU2NzYxJyxcclxuICAgICdyZXZpZXcubWFya0hhbmRsZWQnOiAnXHU2ODA3XHU4QkIwXHU1REYyXHU1OTA0XHU3NDA2JyxcclxuICAgICdyZXZpZXcuYmF0Y2hWZXJpZnknOiAnXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwJyxcclxuICAgICdyZXZpZXcuYmF0Y2hWZXJpZnlDb25maXJtVGl0bGUnOiAnXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwXHVGRjFGJyxcclxuICAgICdyZXZpZXcuYmF0Y2hWZXJpZnlDb25maXJtTXNnJzogJ1x1NUMwNlx1NUJGOSB7bn0gXHU0RTJBXHU4QkM0XHU1QkExXHU3NkVFXHU2ODA3XHU5MDEwXHU0RTAwXHU1OTBEXHU2OEMwXHVGRjA4XHU0RTMyXHU4ODRDIExMTSBcdThDMDNcdTc1MjhcdUZGMENcdTZCQ0ZcdTRFMkFcdTc2RUVcdTY4MDdcdTdFQTYgMTAtNjAgXHU3OUQyXHVGRjBDXHU0RjFBXHU2RDg4XHU4MDE3XHU2QTIxXHU1NzhCXHU3NTI4XHU5MUNGXHVGRjA5XHVGRjFCXHU1M0VGXHU5NjhGXHU2NUY2XHU1MDVDXHU2QjYyXHUzMDAyJyxcclxuICAgICdyZXZpZXcuYmF0Y2hTdG9wJzogJ1x1NTA1Q1x1NkI2MicsXHJcbiAgICAncmV2aWV3LmJhdGNoUHJvZ3Jlc3MnOiAnXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwXHU0RTJEIHtpfS97bn0nLFxyXG4gICAgJ3Jldmlldy5iYXRjaERvbmUnOiAnXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwXHU1QjhDXHU2MjEwXHVGRjFBXHU4OUUzXHU1MUIzIHthfSBcdTY3NjEgXHUwMEI3IFx1NEVDRFx1NUY4NVx1NTkwNFx1NzQwNiB7Yn0gXHU2NzYxIFx1MDBCNyBcdTY1QjBcdTk1RUVcdTk4OTgge2N9IFx1Njc2MSBcdTAwQjcgXHU1OTMxXHU4RDI1IHtkfSBcdTRFMkFcdTc2RUVcdTY4MDcnLFxyXG4gICAgJ3Jldmlldy5iYXRjaFN0b3BwZWQnOiAnXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwXHU1REYyXHU1MDVDXHU2QjYyJyxcclxuICAgICdyZXZpZXcudHJpYWdlJzogJ1x1RDgzRVx1RERGOSBcdTY1NzRcdTRGNTNcdTUyMDZcdThCQ0EnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VIaW50JzogJ0xMTSBcdTY1NzRcdTRGNTNcdTYyNkJcdTYzQ0ZcdTUxNjhcdTkwRThcdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdUZGMUFcdTUyMjRcdTkxQ0RcdTU5MEQvXHU4RkM3XHU2NUY2L1x1NEUwRFx1NjIxMFx1N0FDQlx1NTM3M1x1NjVGNlx1NTE3M1x1OTVFRFx1RkYwOFx1NUUyNlx1NEY5RFx1NjM2RVx1RkYwQ1x1NTNFRlx1NEVCQVx1NURFNVx1OTFDRFx1NUYwMFx1NTkwRFx1NjgzOFx1RkYwOVx1RkYwQ1x1NzcxRlx1OTVFRVx1OTg5OFx1NzU1OVx1NEUwQlx1NTE4RFx1NkQzRVx1NTNEMVx1NEZFRVx1NTkwRCcsXHJcbiAgICAncmV2aWV3LnRyaWFnZUNvbmZpcm1UaXRsZSc6ICdcdTY1NzRcdTRGNTNcdTUyMDZcdThCQ0FcdUZGMUYnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VDb25maXJtTXNnJzogJ1x1NUMwNlx1NzUyOCBMTE0gXHU1MjA2XHU2Mjc5XHU2MjZCXHU2M0NGXHU1MTY4XHU5MEU4XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHVGRjA4XHU2QkNGXHU2Mjc5XHU2NzAwXHU1OTFBIHtufSBcdTY3NjFcdUZGMENcdTZEODhcdTgwMTdcdTZBMjFcdTU3OEJcdTc1MjhcdTkxQ0ZcdUZGMDlcdTMwMDJcdTUyMjRcdTRFM0FcdTkxQ0RcdTU5MEQvXHU4RkM3XHU2NUY2L1x1NEUwRFx1NjIxMFx1N0FDQlx1NzY4NFx1OTVFRVx1OTg5OFx1NEYxQVx1MzAxMFx1N0FDQlx1NTM3M1x1NTE3M1x1OTVFRFx1MzAxMVx1NUU3Nlx1NkNFOFx1NjYwRVx1NEY5RFx1NjM2RVx1MjAxNFx1MjAxNFx1NTE2OFx1OTBFOFx1NTNFRlx1NTcyOFx1OTVFRVx1OTg5OFx1NTM2MVx1NTkwRFx1NjgzOFx1OTFDRFx1NUYwMFx1MzAwMlx1NzU1OVx1NEUwQlx1NzY4NFx1NzcxRlx1OTVFRVx1OTg5OFx1NTE4RFx1OEQ3MFx1NkQzRVx1NTNEMVx1NEZFRVx1NTkwRFx1MzAwMicsXHJcbiAgICAncmV2aWV3LnRyaWFnZVByb2dyZXNzJzogJ1x1NTIwNlx1OEJDQVx1NEUyRFx1RkYxQVx1NURGMlx1NTkwNFx1NzQwNiB7bn0gXHU2NzYxXHVGRjBDXHU1MjY5XHU0RjU5XHU3RUE2IHttfSBcdTY3NjEnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VTdG9wJzogJ1x1NTA1Q1x1NkI2MicsXHJcbiAgICAncmV2aWV3LnRyaWFnZURvbmUnOiAnXHU1MjA2XHU4QkNBXHU1QjhDXHU2MjEwXHVGRjFBXHU1MTczXHU5NUVEIFx1OTFDRFx1NTkwRCB7YX0gXHUwMEI3IFx1OEZDN1x1NjVGNiB7Yn0gXHUwMEI3IFx1NEUwRFx1NUI1OFx1NTcyOCB7Y31cdUZGMUJcdTRGRERcdTc1NTkge2R9IFx1Njc2MVx1NUY4NVx1NTkwNFx1NzQwNicsXHJcbiAgICAncmV2aWV3LnRyaWFnZVN0b3BwZWQnOiAnXHU1MjA2XHU4QkNBXHU1REYyXHU1MDVDXHU2QjYyXHVGRjA4XHU1REYyXHU1MjI0XHU1QjlBXHU3Njg0XHU0RTBEXHU0RjFBXHU5MUNEXHU1OTBEXHU2RDg4XHU4MDE3XHVGRjBDXHU1M0VGXHU1MThEXHU2QjIxXHU3MEI5XHU1MUZCXHU3RUU3XHU3RUVEXHVGRjA5JyxcclxuICAgICdyZXZpZXcudHJpYWdlTm90aGluZyc6ICdcdTVGNTNcdTUyNERcdTRGMUFcdThCRERcdTVCOUFcdTRGNERcdTUyMzBcdTc2ODRcdTk4NzlcdTc2RUVcdTZDQTFcdTY3MDlcdTVGODVcdTUyMDZcdThCQ0FcdTc2ODRcdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdUZGMDhcdTgyRTVcdTRFMEVcdTUyMTdcdTg4NjhcdTRFMERcdTdCMjZcdUZGMENcdThCRjdcdTc4NkVcdThCQTRcdTVERTZcdTRGQTdcdTYyNTNcdTVGMDBcdTc2ODRcdTRGMUFcdThCRERcdTVDNUVcdTRFOEVcdThCRTVcdTk4NzlcdTc2RUVcdUZGMDknLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VQYXJzZUZhaWwnOiAnXHVGRjFCXHU2NzA5XHU0RTAwXHU2Mjc5XHU4RjkzXHU1MUZBXHU4OUUzXHU2NzkwXHU1OTMxXHU4RDI1XHU1REYyXHU2MzA5XHU0RkREXHU3NTU5XHU1OTA0XHU3NDA2XHVGRjBDXHU1M0VGXHU5MUNEXHU4QkQ1JyxcclxuICAgICdyZXZpZXcuaGFuZGxlZERvbmUnOiAnXHU1REYyXHU2MjhBIHtufSBcdTY3NjFcdTk1RUVcdTk4OThcdTY4MDdcdThCQjBcdTRFM0FcdTVERjJcdTU5MDRcdTc0MDYnLFxyXG4gICAgJ2ZpeC5wbGFuJzogJ1x1NEZFRVx1NTkwRFx1NjVCOVx1Njg0OCcsXHJcbiAgICAnZml4LnBsYW5BcHByb2FjaCc6ICdcdTY1QjlcdTY4NDgnLFxyXG4gICAgJ2ZpeC5wbGFuSW1wYWN0JzogJ1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNCcsXHJcbiAgICAnZml4LnBsYW5CZW5lZml0JzogJ1x1NjUzNlx1NzZDQScsXHJcbiAgICAnZml4LnBsYW5SaXNrJzogJ1x1OThDRVx1OTY2OScsXHJcbiAgICAnZml4LmRpc3BhdGNoJzogJ1x1NkQzRVx1NTNEMVx1NEZFRVx1NTkwRCcsXHJcbiAgICAnZml4LmRpc3BhdGNoSGludE1haW4nOiAnXHU2MjhBXHU1MkZFXHU5MDA5XHU3Njg0XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHVGRjA4XHU2NzJBXHU1MkZFXHU5MDA5PVx1NUY1M1x1NTI0RFx1N0I1Qlx1OTAwOVx1NEUwQlx1NTE2OFx1OTBFOFx1RkYwOVx1NkQzRVx1NTNEMVx1N0VEOVx1NUI1MCBBZ2VudCBcdTVFNzZcdTUzRDFcdTU5MDRcdTc0MDZcdUZGMUFcdTc2RjRcdTYzQTVcdTRGRUVcdTU5MEQ9XHU0RTA5XHU5MDUzXHU5NUY4XHU1MjI0XHU1QjlBK1x1NEZFRVx1NTkwRCtcdTU2REVcdTUxOTkrXHU2M0QwXHU0RUE0XHU1MTY4XHU4MUVBXHU1MkE4XHVGRjFCXHU1MTQ4XHU1MUZBXHU2NUI5XHU2ODQ4PVx1NTNFQVx1OEJGQlx1NTIwNlx1Njc5MFx1NEVBN1x1NTFGQVx1N0VEM1x1Njc4NFx1NTMxNlx1NjVCOVx1Njg0OFx1RkYwQ1x1NjI3OVx1NTFDNlx1NTQwRVx1NTE4RFx1NkQzRVx1NTNEMVx1NjI2N1x1ODg0QycsXHJcbiAgICAnZml4LmRpc3BhdGNoTW9kZVRpdGxlJzogJ1x1NkQzRVx1NTNEMVx1NEZFRVx1NTkwRFx1MjAxNFx1MjAxNFx1OTAwOVx1NjJFOVx1NkEyMVx1NUYwRicsXHJcbiAgICAnZml4LmRpc3BhdGNoTW9kZU1zZyc6ICdcdTVDMDZcdTZEM0VcdTUzRDEge259IFx1Njc2MVx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1N0VEOVx1NUI1MCBBZ2VudCBcdTVFNzZcdTUzRDFcdTU5MDRcdTc0MDZcdUZGMDhcdTZCQ0ZcdTRFRkJcdTUyQTFcdTcyRUNcdTdBQ0Igd29ya3RyZWVcdUZGMENcdTZEODhcdTgwMTdcdTZBMjFcdTU3OEJcdTc1MjhcdTkxQ0ZcdUZGMENcdTRFMERcdTUzNjBcdTc1MjhcdTgwNEFcdTU5MjlcdTdBOTdcdTUzRTNcdUZGMDlcdTMwMDJcdTI2QTEgXHU3NkY0XHU2M0E1XHU0RkVFXHU1OTBEXHVGRjFBXHU0RTA5XHU5MDUzXHU5NUY4XHU1MjI0XHU1QjlBICsgXHU0RkVFXHU1OTBEICsgXHU1NkRFXHU1MTk5ICsgXHU2M0QwXHU0RUE0XHU1MTY4XHU4MUVBXHU1MkE4XHVGRjBDXHU4QkVGXHU2MkE1L1x1OTFDRFx1NTkwRC9cdThGQzdcdTY1RjZcdTRGMUFcdTgxRUFcdTUyQThcdTUxNzNcdTk1RURcdTMwMDJcdUQ4M0RcdURDQ0IgXHU1MTQ4XHU1MUZBXHU2NUI5XHU2ODQ4XHVGRjFBXHU1M0VBXHU4QkZCXHU1MjA2XHU2NzkwXHU0RUE3XHU1MUZBXHU3RUQzXHU2Nzg0XHU1MzE2XHU2NUI5XHU2ODQ4XHVGRjBDXHU0RTBEXHU2NTM5XHU0RUZCXHU0RjU1XHU0RUUzXHU3ODAxXHVGRjFCXHU0RjYwXHU1NzI4XHU5NUVFXHU5ODk4XHU1MzYxXHU3Njg0XHU2NUI5XHU2ODQ4XHU1NzU3XHU2Mjc5XHU1MUM2XHU1NDBFXHU3MEI5XHUzMDBDXHU2RDNFXHU1M0QxXHU1Rjg1XHU1QkExXHU2NUI5XHU2ODQ4XHUzMDBEXHU2MjY3XHU4ODRDXHUzMDAyJyxcclxuICAgICdmaXguZGlzcGF0Y2hBdXRvJzogJ1x1MjZBMSBcdTc2RjRcdTYzQTVcdTRGRUVcdTU5MEQnLFxyXG4gICAgJ2ZpeC5kaXNwYXRjaFBsYW4nOiAnXHVEODNEXHVEQ0NCIFx1NTE0OFx1NTFGQVx1NjVCOVx1Njg0OCcsXHJcbiAgICAnZml4LmRpc3BhdGNoTm9PcGVuJzogJ1x1NUY1M1x1NTI0RFx1N0I1Qlx1OTAwOVx1NEUwQlx1NkNBMVx1NjcwOVx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1NTNFRlx1NkQzRVx1NTNEMScsXHJcbiAgICAnZml4LmRpc3BhdGNoUGxhbnMnOiAnXHU2RDNFXHU1M0QxXHU1Rjg1XHU1QkExXHU2NUI5XHU2ODQ4JyxcclxuICAgICdmaXguZGlzcGF0Y2hQbGFuc0hpbnQnOiAnXHU2MjhBXHU1REYyXHU0RUE3XHU1MUZBXHU3Njg0XHU1Rjg1XHU4QkM0XHU1QkExXHU2NUI5XHU2ODQ4XHU2RDNFXHU1M0QxXHU3RUQ5XHU1QjUwIEFnZW50IFx1NUU3Nlx1NTNEMVx1NjI2N1x1ODg0Q1x1NEZFRVx1NTkwRFx1RkYwOFx1NkJDRlx1NEVGQlx1NTJBMVx1NzJFQ1x1N0FDQiB3b3JrdHJlZVx1RkYwQ1x1NTQwOFx1NUU3Nlx1NTFCMlx1N0E4MVx1ODFFQVx1NTJBOFx1NTdGQVx1NEU4RVx1NjcwMFx1NjVCMFx1NEVFM1x1NzgwMVx1OTFDRFx1NTA1QVx1RkYwOScsXHJcbiAgICAnZml4LmRpc3BhdGNoRG9uZSc6ICdcdTVERjJcdTZEM0VcdTUzRDEge259IFx1NEUyQVx1NEZFRVx1NTkwRFx1NEVGQlx1NTJBMVx1RkYwOFx1NUU3Nlx1NTNEMSB7Y31cdUZGMDknLFxyXG4gICAgJ2ZpeC5kaXNwYXRjaEVtcHR5JzogJ1x1NkNBMVx1NjcwOVx1NTNFRlx1NkQzRVx1NTNEMVx1NzY4NFx1NEVGQlx1NTJBMVx1RkYwOFx1NTJGRVx1OTAwOVx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1NjIxNlx1N0I0OVx1NUY4NVx1NjVCOVx1Njg0OFx1NEVBN1x1NTFGQVx1RkYwOScsXHJcbiAgICAnZml4LnN0YXR1cyc6ICdcdTRGRUVcdTU5MERcdTYyNjdcdTg4NEMnLFxyXG4gICAgJ2ZpeC5zdG9wJzogJ1x1NTA1Q1x1NkI2MicsXHJcbiAgICAnZml4LnN0b3BEb25lJzogJ1x1NURGMlx1NTA1Q1x1NkI2MiB7bn0gXHU0RTJBXHU0RkVFXHU1OTBEXHU0RUZCXHU1MkExJyxcclxuICAgICdmaXgudGFza1F1ZXVlZCc6ICdcdTYzOTJcdTk2MUZcdTRFMkQnLFxyXG4gICAgJ2ZpeC50YXNrUnVubmluZyc6ICdcdThGRDBcdTg4NENcdTRFMkQnLFxyXG4gICAgJ2ZpeC50YXNrTWVyZ2luZyc6ICdcdTU0MDhcdTVFNzZcdTRFMkQnLFxyXG4gICAgJ2ZpeC50YXNrUmVkbyc6ICdcdTkxQ0RcdTUwNUFcdTRFMkQnLFxyXG4gICAgJ2ZpeC50YXNrRG9uZSc6ICdcdTVERjJcdTVCOENcdTYyMTAnLFxyXG4gICAgJ2ZpeC50YXNrQ29uZmxpY3QnOiAnXHU1MUIyXHU3QTgxJyxcclxuICAgICdmaXgudGFza0ZhaWxlZCc6ICdcdTU5MzFcdThEMjUnLFxyXG4gICAgJ2ZpeC50YXNrQ2FuY2VsbGVkJzogJ1x1NURGMlx1NTA1Q1x1NkI2MicsXHJcbiAgICAnZml4LmF0dGVtcHQnOiAnXHU3QjJDIHtufSBcdTZCMjEnLFxyXG4gICAgJ2ZpeC5ydW50aW1lJzogJ1x1NURGMlx1OEZEMFx1ODg0QyB7bn0gXHU1MjA2JyxcclxuICAgICdmaXgucmVzdW1lcyc6ICdcdTdFRURcdThERDEge259JyxcclxuICAgICdmaXgucHJvYmVzJzogJ1x1NjNBMlx1NkQzQiB7bn0nLFxyXG4gICAgJ2ZpeC5tb2RlbFRpdGxlJzogJ1x1NEZFRVx1NTkwRFx1NUU3Nlx1NTNEMVx1RkYwOFx1NUI1MCBBZ2VudCBcdTZDNjBcdUZGMDknLFxyXG4gICAgJ2ZpeC5tb2RlbEhpbnQnOiAnXHU1NDBDXHU2NUY2XHU2MjY3XHU4ODRDXHU3Njg0XHU0RkVFXHU1OTBEXHU1QjUwIEFnZW50IFx1NEUwQVx1OTY1MFx1RkYwODEtMTBcdUZGMDlcdTMwMDJcdTZCQ0ZcdTRFRkJcdTUyQTFcdTcyRUNcdTdBQ0Igd29ya3RyZWUgXHU0RTkyXHU0RTBEXHU1RTcyXHU2MjcwXHVGRjFCXHU0RkVFXHU2NTM5XHU1NDBFXHU3QUNCXHU1MzczXHU3NTFGXHU2NTQ4XHUzMDAyJyxcclxuXHJcbiAgICAncGxhbi50aXRsZSc6ICdcdTdGMTZcdTYzOTJcdThCQTFcdTUyMTJcdTc4NkVcdThCQTQnLFxyXG4gICAgJ3BsYW4uaGludCc6ICdcdTZCQ0ZcdTZCNjVcdTc2ODRcdTg5RDJcdTgyNzJcdTUxQjNcdTVCOUFcdTRFMEFcdTRFMEJcdTY1ODdcdTZDRThcdTUxNjVcdTRFMEVcdTlFRDhcdThCQTRcdTZBMjFcdTU3OEJcdUZGMDhcdTUyMDZcdTY3OTAvXHU2NENEXHU0RjVDPWZhc3RcdUZGMENcdTVGMDBcdTUzRDE9c3RhbmRhcmRcdUZGMENcdTg5QzRcdTUyMTI9cmVhc29uaW5nXHVGRjBDXHU5QThDXHU2NTM2PXZlcmlmaWVyXHVGRjA5XHVGRjFCXHU1M0VGXHU4QzAzXHU2NTc0XHU1NDBFXHU1MThEXHU1NDJGXHU1MkE4XHUzMDAyJyxcclxuICAgICdwbGFuLmNvbC5zdGVwJzogJ1x1NkI2NVx1OUFBNCcsICdwbGFuLmNvbC5yb2xlJzogJ1x1ODlEMlx1ODI3MicsICdwbGFuLmNvbC5tb2RlbCc6ICdcdTZBMjFcdTU3OEInLCAncGxhbi5jb2wucG9saWN5JzogJ1x1NTkzMVx1OEQyNVx1N0I1Nlx1NzU2NScsICdwbGFuLmNvbC5lbmFibGVkJzogJ1x1NTQyRlx1NzUyOCcsICdwbGFuLmNvbC5hdHRlbXB0cyc6ICdcdTVDMURcdThCRDUnLFxyXG4gICAgJ3BsYW4ubW9kZWxEZWZhdWx0JzogJ1x1OERERlx1OTY4Rlx1ODlEMlx1ODI3Mlx1OUVEOFx1OEJBNCcsXHJcbiAgICAncGxhbi5sYXVuY2hFZGl0ZWQnOiAnXHU0RkREXHU1QjU4XHU0RkVFXHU2NTM5XHU1RTc2XHU1NDJGXHU1MkE4JyxcclxuICAgICdwbGFuLmxhdW5jaERpcmVjdCc6ICdcdTYzMDlcdTUzOUZcdThCQTFcdTUyMTJcdTU0MkZcdTUyQTgnLFxyXG4gICAgJ3BsYW4uZGlzY2FyZCc6ICdcdTY1M0VcdTVGMDMnLFxyXG4gICAgJ3BsYW4udmlld0RldGFpbCc6ICdcdThCRTZcdTYwQzUnLCAncGxhbi5yZWZyZXNoRGV0YWlsJzogJ1x1NTIzN1x1NjVCMCcsICdwbGFuLmNsb3NlRGV0YWlsJzogJ1x1NjUzNlx1OEQ3NycsXHJcbiAgICAncGxhbi5kZXRhaWxUaXRsZSc6ICdSdW4gXHU4QkU2XHU2MEM1JyxcclxuICAgICdwbGFuLnBhdXNlZEJhbm5lcic6ICdcdTRFRkJcdTUyQTFcdTVERjJcdTY2ODJcdTUwNUNcdUZGMENcdTdCNDlcdTVGODVcdTRGNjBcdTc2ODRcdTUxQjNcdTdCNTYnLFxyXG4gICAgJ3BsYW4ucmVzdW1lUmV0cnknOiAnXHU5MUNEXHU4QkQ1XHU4QkU1XHU2QjY1XHU5QUE0XHU1RTc2XHU3RUU3XHU3RUVEJyxcclxuICAgICdwbGFuLnJlc3VtZVNraXAnOiAnXHU4REYzXHU4RkM3XHU4QkU1XHU2QjY1XHU5QUE0XHU3RUU3XHU3RUVEJyxcclxuICAgICdwbGFuLnJlc3VtZUZhaWxlZCc6ICdcdTRFQ0VcdTU5MzFcdThEMjVcdTU5MDRcdTYwNjJcdTU5MEQnLFxyXG4gICAgJ3BsYW4uY29udGV4dFRpdGxlJzogJ1x1NEVGQlx1NTJBMVx1NEUwQVx1NEUwQlx1NjU4N1x1RkYwOFx1NjcyQyBSdW4gXHU2Q0U4XHU1MTY1XHU0RTg2XHU0RUMwXHU0RTQ4XHVGRjA5JyxcclxuICAgICdwbGFuLmJyYW5jaCc6ICdcdTUyMDZcdTY1MkYnLCAncGxhbi5pbmplY3RlZE1lbW9yaWVzJzogJ1x1NkNFOFx1NTE2NVx1OEJCMFx1NUZDNicsICdwbGFuLmRlY2lzaW9uTG9nJzogJ1x1NTFCM1x1N0I1Nlx1NjVFNVx1NUZENycsXHJcbiAgICAnZXhlYy5jb2wuZGV0YWlsJzogJ1x1OEJFNlx1NjBDNScsXHJcblxyXG4gICAgJ3NjaGVkLnRpdGxlJzogJ1x1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMScsXHJcbiAgICAnc2NoZWQuZm9ybU5hbWUnOiAnXHU0RUZCXHU1MkExXHU1NDBEXHU3OUYwJywgJ3NjaGVkLmZvcm1JbnRlcnZhbCc6ICdcdTk1RjRcdTk2OTRcdUZGMDhcdTUyMDZcdTk0OUZcdUZGMDknLFxyXG4gICAgJ3NjaGVkLnR5cGVSZXZpZXcnOiAnXHU4MUVBXHU1MkE4XHU4QkM0XHU1QkExJywgJ3NjaGVkLnR5cGVTdW1tYXJ5JzogJ0FJIFx1NjAzQlx1N0VEMycsICdzY2hlZC50eXBlUnVuJzogJ1x1NUI5QVx1NjVGNlx1NjI2N1x1ODg0QycsXHJcbiAgICAnc2NoZWQuYWRkJzogJ1x1NTIxQlx1NUVGQScsXHJcbiAgICAnc2NoZWQuaGludCc6ICdcdTUyMzBcdTcwQjlcdTgxRUFcdTUyQThcdTYyNjdcdTg4NENcdUZGMUFcdTgxRUFcdTUyQThcdThCQzRcdTVCQTE9XHU4QkM0XHU1QkExXHU4RkQxIDI0IFx1NUMwRlx1NjVGNlx1NzY4NFx1NjVCMFx1NjNEMFx1NEVBNFx1RkYwOFx1OTVFRVx1OTg5OFx1OEZEQiBSZXZpZXcgXHU5NzYyXHU2NzdGXHVGRjA5XHVGRjFCQUkgXHU2MDNCXHU3RUQzPVx1NzUxRlx1NjIxMFx1NTg5RVx1OTFDRlx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1RkYxQlx1NUI5QVx1NjVGNlx1NjI2N1x1ODg0Qz1cdTYzMDlcdTZBMjFcdTY3N0ZcdThERDFcdTRFMDBcdTZCMjFcdTdGMTZcdTYzOTJcdTRFRkJcdTUyQTFcdTMwMDJcdTY3MDBcdTVDMEYgMSBcdTUyMDZcdTk0OUZcdTMwMDInLFxyXG4gICAgJ3NjaGVkLmVtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1MzAwMicsXHJcbiAgICAnc2NoZWQuY29sLm5hbWUnOiAnXHU1NDBEXHU3OUYwJywgJ3NjaGVkLmNvbC50eXBlJzogJ1x1N0M3Qlx1NTc4QicsICdzY2hlZC5jb2wuaW50ZXJ2YWwnOiAnXHU1NDY4XHU2NzFGJywgJ3NjaGVkLmNvbC5uZXh0JzogJ1x1NEUwQlx1NkIyMVx1NjI2N1x1ODg0QycsICdzY2hlZC5jb2wubGFzdFJlc3VsdCc6ICdcdTRFMEFcdTZCMjFcdTdFRDNcdTY3OUMnLCAnc2NoZWQuY29sLmFjdGlvbnMnOiAnXHU2NENEXHU0RjVDJyxcclxuICAgICdzY2hlZC5kYXknOiAnIFx1NTkyOScsICdzY2hlZC5ob3VyJzogJyBcdTVDMEZcdTY1RjYnLCAnc2NoZWQubWludXRlJzogJyBcdTUyMDZcdTk0OUYnLFxyXG4gICAgJ3NjaGVkLmRpc2FibGUnOiAnXHU2NjgyXHU1MDVDJywgJ3NjaGVkLmVuYWJsZSc6ICdcdTU0MkZcdTc1MjgnLCAnc2NoZWQucnVuTm93JzogJ1x1N0FDQlx1NTM3M1x1NjI2N1x1ODg0QycsXHJcblxyXG4gICAgJ21lbW9yeS56b25lVGl0bGUnOiAnXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2JyxcclxuICAgICdtZW1vcnkuc3luY0Jhc2VsaW5lJzogJ1x1NTQwQ1x1NkI2NVx1NTdGQVx1N0VCRicsICdtZW1vcnkuc3luY05vbmUnOiAnXHU2NzJBXHU1NDBDXHU2QjY1JyxcclxuICAgICdtZW1vcnkuYmVoaW5kJzogJ1x1ODQzRFx1NTQwRSB7bn0gXHU0RTJBXHU2M0QwXHU0RUE0XHU2NzJBXHU1NDBDXHU2QjY1JyxcclxuICAgICdtZW1vcnkuc3luYyc6ICdcdTU0MENcdTZCNjVcdThCQjBcdTVGQzYnLCAnbWVtb3J5LnN5bmNpbmcnOiAnXHU1NDBDXHU2QjY1XHU0RTJEXHUyMDI2JywgJ21lbW9yeS5zeW5jRmFpbGVkJzogJ1x1NTQwQ1x1NkI2NVx1NTkzMVx1OEQyNScsXHJcbiAgICAnbWVtb3J5LnN0YWxlVGl0bGUnOiAnXHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2XHVGRjA4XHU3NkY4XHU1MTczXHU0RUUzXHU3ODAxXHU1REYyXHU4OEFCXHU2NTM5XHU1MkE4XHVGRjBDXHU1Rjg1XHU0RjYwXHU1OTBEXHU2ODM4XHVGRjA5JyxcclxuICAgICdtZW1vcnkubWFya1N0YWxlJzogJ1x1NjgwN1x1OEJCMFx1OEZDN1x1NjVGNicsICdtZW1vcnkuYXJjaGl2ZUJ0bic6ICdcdTVGNTJcdTY4NjMnLCAnbWVtb3J5LmtlZXBBY3RpdmUnOiAnXHU0RUNEXHU2NzA5XHU2NTQ4JyxcclxuICAgICdtZW1vcnkubmV3Q2FuZGlkYXRlcyc6ICdcdTY1QjBcdTU4OUVcdTUwMTlcdTkwMDlcdUZGMDhcdTVERjJcdTUxNjVcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTdcdUZGMDlcdUZGMUEnLFxyXG4gICAgJ21lbW9yeS5jbG9zZVJlcG9ydCc6ICdcdTUxNzNcdTk1RURcdTYyQTVcdTU0NEEnLFxyXG4gICAgJ21lbW9yeS5zY29wZVByb2plY3QnOiAnXHU0RTNCXHU1RTcyXHVGRjA4XHU1MTY4XHU1MjA2XHU2NTJGXHVGRjA5JywgJ21lbW9yeS5zY29wZUJyYW5jaCc6ICdcdTRFQzVcdTVGNTNcdTUyNERcdTUyMDZcdTY1MkYnLFxyXG4gICAgJ21lbW9yeS5wZW5kaW5nUXVldWUnOiAnXHU1Rjg1XHU3ODZFXHU4QkE0XHU5NjFGXHU1MjE3JyxcclxuICAgICdtZW1vcnkudG9Ob3RlJzogJ1x1OEY2Q1x1N0IxNFx1OEJCMCcsICdtZW1vcnkubm9ybWFsaXplJzogJ1x1NUY1Mlx1NEUwMFx1NTIzMFx1NEUzQlx1NUU3MicsICdtZW1vcnkucmVzdG9yZSc6ICdcdTYwNjJcdTU5MEQnLFxyXG4gICAgJ21lbW9yeS5zdGF0dXNTdGFsZSc6ICdcdTc1OTFcdTRGM0NcdThGQzdcdTY1RjYnLFxyXG4gICAgJ2ltcGFjdC5mdW5jdGlvbnNOb25lJzogJ1x1NjcyQVx1OEJDNlx1NTIyQlx1NTFGQVx1NTFGRFx1NjU3MFx1N0VBN1x1OEMwM1x1NzUyOFx1NTNEOFx1NTMxNlx1RkYwOFx1NTNFRlx1ODBGRFx1NjYyRlx1NjgzN1x1NUYwRi9cdTk3NTlcdTYwMDFcdThENDRcdTZFOTAvXHU3RUFGXHU5MTREXHU3RjZFXHU2NTM5XHU1MkE4XHVGRjA5XHUzMDAyJyxcclxuICAgICdyZXZpZXcuY29sLnNldmVyaXR5JzogJ1x1N0VBN1x1NTIyQicsXHJcbiAgICAncmV2aWV3LmNvbC5jYXRlZ29yeSc6ICdcdTdDN0JcdTUyMkInLFxyXG4gICAgJ3Jldmlldy5jb2wudGl0bGUnOiAnXHU5NUVFXHU5ODk4JyxcclxuICAgICdyZXZpZXcuY29sLmV2aWRlbmNlJzogJ1x1NEY0RFx1N0Y2RScsXHJcbiAgICAncmV2aWV3LmNvbC5maXgnOiAnXHU1RUZBXHU4QkFFXHU0RkVFXHU1OTBEJyxcclxuICAgICdyZXZpZXcuaGludCc6ICdcdTcwQjlcdTUxRkJcdTRFMEFcdTY1QjlcdTYzMDlcdTk0QUVcdTVGMDBcdTU5Q0JcdTY4MzhcdTY3RTVcdUZGMENcdTRFQTdcdTUxRkFcdTY3MDBcdTRGMThcdTYwMjdcdTdFRDNcdThCQkFcdTRFMEVcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTMwMDInLFxyXG4gICAgJ2RpZmYuc2hvdyc6ICdcdTVCRjlcdTZCRDQnLFxyXG4gICAgJ2RpZmYuaGlkZSc6ICdcdTY1MzZcdThENzdcdTVERUVcdTVGMDInLFxyXG5cclxuICAgICdkZXRhaWwudGl0bGUnOiAnXHU2ODM4XHU2N0U1XHU4QkU2XHU2MEM1JyxcclxuICAgICdkZXRhaWwucGljayc6ICdcdTIxOTAgXHU0RUNFXHU1REU2XHU0RkE3XHU5MDA5XHU2MkU5XHU0RTAwXHU2QjIxXHU2M0QwXHU0RUE0XHVGRjA4XHU2MjE2XHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4XHVGRjA5XHU1RjAwXHU1OUNCXHU2ODM4XHU2N0U1JyxcclxuICAgICdkZXRhaWwud2hhdCc6ICdcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDgnLFxyXG4gICAgJ2RldGFpbC5sb2dpYyc6ICdcdTVCOUVcdTczQjBcdTkwM0JcdThGOTEnLFxyXG4gICAgJ2RldGFpbC5yaXNrJzogJ1x1OThDRVx1OTY2OVx1NzBCOScsXHJcbiAgICAnZGV0YWlsLmZpbGVzJzogJ1x1NjU4N1x1NEVGNlx1NkUwNVx1NTM1NScsXHJcbiAgICAnZGV0YWlsLnBhdGNoJzogJ1x1NjdFNVx1NzcwQlx1ODg2NVx1NEUwMVx1NTM5Rlx1NjU4NycsXHJcbiAgICAnZGV0YWlsLmFpTG9hZGluZyc6ICdBSSBcdTg5RTNcdThCRkJcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhcdTdFQTYgMTAtMzAgXHU3OUQyXHVGRjA5JyxcclxuICAgICdkZXRhaWwucXVldWVkJzogJ1x1OEZEOFx1NjcwOSB7bn0gXHU0RTJBXHU4OUUzXHU4QkZCXHU2MzkyXHU5NjFGXHU0RTJEXHVGRjA4XHU4MUVBXHU1MkE4XHU1RTc2XHU1M0QxXHU2MjY3XHU4ODRDXHVGRjA5JyxcclxuICAgICdkZXRhaWwuY2FyZFF1ZXVlZCc6ICdcdTYzOTJcdTk2MUZcdTdCNDlcdTVGODUgQUkgXHU4OUUzXHU4QkZCXHVGRjA4XHU1RTc2XHU1M0QxXHU0RTBBXHU5NjUwIDNcdUZGMENcdTkwN0ZcdTUxNERcdTYyNTNcdTZFRTFcdTZBMjFcdTU3OEJcdTdGNTFcdTUxNzNcdUZGMDknLFxyXG4gICAgJ2RldGFpbC5pbXBhY3QnOiAnXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHU1MjA2XHU2NzkwJyxcclxuICAgICdkZXRhaWwuaW1wYWN0TG9hZGluZyc6ICdcdTVGNzFcdTU0Q0RcdTYyNkJcdTYzQ0ZcdTRFMkRcdTIwMjZcdUZGMDhcdTVGMTVcdTc1MjhcdTY4QzBcdTdEMjIgKyBcdTU2RkVcdThDMzFcdTRGMjBcdTY0QURcdUZGMDknLFxyXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5JzogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNScsXHJcbiAgICAnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJzogJ1x1OEJDNFx1NUJBMVx1NEUyRFx1MjAyNlx1RkYwOFx1NEYxQVx1NEVBN1x1NTFGQVx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1NEUwRVx1NjcwMFx1NEYxOFx1NjAyN1x1N0VEM1x1OEJCQVx1RkYwOScsXHJcblxyXG4gICAgJ2ltcGFjdC5yaXNrJzogJ1x1OThDRVx1OTY2OScsXHJcbiAgICAnaW1wYWN0LmNvbC5jaGFuZ2VkJzogJ1x1NTNEOFx1NjZGNFx1NjU4N1x1NEVGNicsXHJcbiAgICAnaW1wYWN0LmNvbC5pbmRpcmVjdCc6ICdcdTk1RjRcdTYzQTVcdTVGNzFcdTU0Q0RcdUZGMDhcdTVGMTVcdTc1MjhcdTk0RkVcdUZGMDknLFxyXG4gICAgJ2ltcGFjdC5jb2wucG90ZW50aWFsJzogJ1x1NkY1Q1x1NTcyOFx1NUY3MVx1NTRDRCcsXHJcbiAgICAnaW1wYWN0Lm5vbmUnOiAnXHU2NzJBXHU1M0QxXHU3M0IwXHU0RUQzXHU1RTkzXHU1MTg1XHU1RjE1XHU3NTI4XHU4MDA1XHVGRjA4XHU2NTM5XHU1MkE4XHU3NzBCXHU0RjNDXHU3MkVDXHU3QUNCXHVGRjA5XHUzMDAyJyxcclxuICAgICdpbXBhY3QudGVzdHMnOiAnXHU1MTczXHU4MDU0XHU2RDRCXHU4QkQ1JyxcclxuICAgICdpbXBhY3QubGVnZW5kLmNoYW5nZWQnOiAnXHU1M0Q4XHU2NkY0JyxcclxuICAgICdpbXBhY3QubGVnZW5kLmluZGlyZWN0JzogJ1x1OTVGNFx1NjNBNScsXHJcbiAgICAnaW1wYWN0LmxlZ2VuZC5wb3RlbnRpYWwnOiAnXHU2RjVDXHU1NzI4JyxcclxuXHJcbiAgICAncmV2aWV3LnZlcmRpY3QnOiAnXHU2NzAwXHU0RjE4XHU2MDI3XHU3RUQzXHU4QkJBJyxcclxuICAgICdyZXZpZXcuaXNzdWVzJzogJ1x1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NScsXHJcbiAgICAncmV2aWV3LmNsZWFuJzogJ1x1NjcyQVx1NTNEMVx1NzNCMFx1OTVFRVx1OTg5OFx1MzAwMicsXHJcblxyXG4gICAgJ25vdGVzLnRpdGxlJzogJ1x1NjgzOFx1NjdFNVx1N0IxNFx1OEJCMCcsXHJcbiAgICAnbm90ZXMuZm9ybVRpdGxlJzogJ1x1N0IxNFx1OEJCMFx1NjgwN1x1OTg5OCcsXHJcbiAgICAnbm90ZXMuZm9ybUNvbnRlbnQnOiAnXHU3QjE0XHU4QkIwXHU1MTg1XHU1QkI5XHVGRjA4XHU3RUQzXHU4QkJBXHUzMDAxXHU3NTkxXHU5NUVFXHUzMDAxXHU1QjY2XHU0RTYwXHU4OTgxXHU3MEI5XHUyMDI2XHVGRjA5JyxcclxuICAgICdub3Rlcy5hZGQnOiAnXHU2REZCXHU1MkEwXHU3QjE0XHU4QkIwJyxcclxuICAgICdub3Rlcy5ib3VuZFRvJzogJ1x1NUMwNlx1NTE3M1x1ODA1NFx1NTIzMCcsXHJcbiAgICAnbm90ZXMuY29sLnRpbWUnOiAnXHU2NUY2XHU5NUY0JyxcclxuICAgICdub3Rlcy5jb2wudGl0bGUnOiAnXHU2ODA3XHU5ODk4JyxcclxuICAgICdub3Rlcy5jb2wuY29udGVudCc6ICdcdTUxODVcdTVCQjknLFxyXG4gICAgJ25vdGVzLmNvbC5zaGEnOiAnXHU1MTczXHU4MDU0XHU2M0QwXHU0RUE0JyxcclxuICAgICdub3Rlcy5yZW1vdmUnOiAnXHU1MjIwXHU5NjY0JyxcclxuICAgICdub3Rlcy5lbXB0eSc6ICdcdThGRDhcdTZDQTFcdTY3MDlcdTdCMTRcdThCQjBcdTMwMDJcdTY4MzhcdTY3RTVcdTYzRDBcdTRFQTRcdTY1RjZcdTk2OEZcdTYyNEJcdThCQjBcdTRFMEJcdTdFRDNcdThCQkFcdTRFMEVcdTc1OTFcdTk1RUVcdUZGMENcdTVDMzFcdTY2MkZcdTRGNjBcdTc2ODRcdTk4NzlcdTc2RUVcdTVCNjZcdTRFNjBcdTY4NjNcdTY4NDhcdTMwMDInLFxyXG5cclxuICAgICdtZW1vcnkucmVjb3JkJzogJ1x1OEJCMFx1NUY1NVx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNicsXHJcbiAgICAnZm9ybS5tZW1vcnlUaXRsZSc6ICdcdThCQjBcdTVGQzZcdTY4MDdcdTk4OTgnLFxyXG4gICAgJ2Zvcm0ubWVtb3J5Q29udGVudCc6ICdcdThCQjBcdTVGQzZcdTUxODVcdTVCQjlcdUZGMDhcdTRFQzBcdTRFNDhcdTRFMEVcdTRFM0FcdTRFQzBcdTRFNDhcdUZGMDknLFxyXG4gICAgJ21lbW9yeS5jb2wudGl0bGUnOiAnXHU2NzYxXHU3NkVFJyxcclxuICAgICdtZW1vcnkuY29sLnR5cGUnOiAnXHU3QzdCXHU1NzhCJyxcclxuICAgICdtZW1vcnkuY29sLnRydXRoJzogJ1x1NzcxRlx1NTAzQycsXHJcbiAgICAnbWVtb3J5LmNvbC5icmFuY2gnOiAnXHU1MjA2XHU2NTJGJyxcclxuICAgICdtZW1vcnkuY29uZmlybSc6ICdcdTc4NkVcdThCQTQnLFxyXG4gICAgJ21lbW9yeS5lbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdTMwMDJcdTUzRUZcdTU3MjhcdTgwNEFcdTU5MjlcdTRFMkRcdThCQTkgQUkgXHU4QkIwXHU1RjU1XHVGRjBDXHU2MjE2XHU1NzI4XHU0RTBBXHU2NUI5XHU2MjRCXHU1MkE4XHU2REZCXHU1MkEwXHUzMDAyJyxcclxuICAgICdjb25jZXB0cy50aXRsZSc6ICdcdTVCNjZcdTRFNjBcdTY5ODJcdTVGRjUnLFxyXG4gICAgJ2NvbmNlcHRzLm5vbmUnOiAnXHU2NjgyXHU2NUUwXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1XHUzMDAyXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHU4REQxXHU1QjhDXHU1M0Q4XHU2NkY0XHU1NDBFXHU4MUVBXHU1MkE4XHU2Qzg5XHU2REMwXHVGRjBDXHU0RTVGXHU1M0VGXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1NjAzQlx1N0VEM1x1NUI2Nlx1NEU2MFx1ODk4MVx1NzBCOVx1MzAwMicsXHJcbiAgICAnY29uY2VwdHMuY29sLm5hbWUnOiAnXHU2OTgyXHU1RkY1JyxcclxuICAgICdjb25jZXB0cy5jb2wuY2F0ZWdvcnknOiAnXHU3QzdCXHU1MjJCJyxcclxuICAgICdjb25jZXB0cy5jb2wuY291bnQnOiAnXHU2QjIxXHU2NTcwJyxcclxuICAgICdyZXZpZXcucmVjb3Jkc1RpdGxlJzogJ1JldmlldyBcdTk1RUVcdTk4OTgnLFxyXG4gICAgJ3Jldmlldy5yZWNvcmRzRW1wdHknOiAnXHU2NjgyXHU2NUUwXHU5NUVFXHU5ODk4XHU4QkIwXHU1RjU1XHUzMDAyXHU2M0QwXHU0RUE0XHU1QkExXHU2N0U1XHU5ODc1XHU4QkM0XHU1QkExXHU1MUZBXHU3Njg0XHU5NUVFXHU5ODk4XHU0RjFBXHU4MUVBXHU1MkE4XHU3NjdCXHU4QkIwXHU1MjMwXHU4RkQ5XHU5MUNDXHVGRjFCXHU5MUNEXHU2NUIwXHU4QkM0XHU1QkExXHU0RjFBXHU2NkZGXHU2MzYyXHU2NUU3XHU4QkIwXHU1RjU1XHUzMDAyJyxcclxuICAgICd2ZXJpZnkucmVjb3Jkcyc6ICdcdTlBOENcdTY1MzZcdThCQjBcdTVGNTUnLFxyXG4gICAgJ3ZlcmlmeS5yZWNvcmRzRW1wdHknOiAnXHU2NjgyXHU2NUUwXHU5QThDXHU2NTM2XHU4QkIwXHU1RjU1XHUzMDAyXHU1NzI4XHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHU3MEI5XHUzMDBDXHU5QThDXHU2NTM2XHUzMDBEXHU1MzczXHU3NTFGXHU2MjEwXHUzMDAyJyxcclxuXHJcbiAgICAnY29uZmlybWVkLnRpdGxlJzogJ1x1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1Rlx1RkYwOFx1NEVCQVx1NURFNVx1Nzg2RVx1OEJBNFx1RkYwQ0FJIFx1Nzk4MVx1NjUzOVx1ODFFQVx1NTJBOFx1NjJFNlx1NjIyQVx1RkYwOScsXHJcbiAgICAnY29uZmlybWVkLmFkZCc6ICdcdTZERkJcdTUyQTBcdTdFQTZcdTY3NUYnLFxyXG4gICAgJ2NvbmZpcm1lZC50ZXh0JzogJ1x1N0VBNlx1Njc1Ri9cdTk3MDBcdTZDNDJcdTUxODVcdTVCQjknLFxyXG4gICAgJ2NvbmZpcm1lZC5wYXRocyc6ICdcdTc5ODFcdTY1MzlcdThERUZcdTVGODRcdUZGMDhcdTkwMTdcdTUzRjdcdTUyMDZcdTk2OTRcdUZGMUJcdTc2RjhcdTVCRjlcdTk4NzlcdTc2RUVcdTY4MzlcdTU5ODIgc3JjL2NvcmVcdUZGMENcdTYyMTZcdTdFRERcdTVCRjlcdThERUZcdTVGODRcdUZGMDknLFxyXG4gICAgJ2NvbmZpcm1lZC5ub25lJzogJ1x1NjY4Mlx1NjVFMFx1N0VBNlx1Njc1Rlx1MzAwMlx1NkRGQlx1NTJBMFx1NTQwRVx1RkYwQ0FJIFx1NEZFRVx1NjUzOVx1NjcyQ1x1OTg3OVx1NzZFRVx1NzY4NFx1Nzk4MVx1NjUzOVx1OERFRlx1NUY4NFx1NUMwNlx1ODhBQlx1ODFFQVx1NTJBOFx1NjJEMlx1N0VERFx1RkYwOFx1NEVDNVx1NUJGOVx1NjcyQ1x1OTg3OVx1NzZFRVx1NzUxRlx1NjU0OFx1RkYwOVx1MzAwMicsXHJcblxyXG4gICAgJ2NoYW5nZXMudGl0bGUnOiAnXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExJyxcclxuICAgICdzdGF0ZS5ub0NoYW5nZXMnOiAnXHU2NjgyXHU2NUUwXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExXHUzMDAyXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1NTIxQlx1NUVGQVx1RkYwQ1x1NjIxNlx1NzUyOFx1NEUwQVx1NjVCOVx1MzAwQ1x1NjVCMFx1NUVGQVx1NTNEOFx1NjZGNFx1MzAwRFx1MzAwMicsXHJcbiAgICAnY2hhbmdlcy5jb2wudGl0bGUnOiAnXHU2ODA3XHU5ODk4JyxcclxuICAgICdjaGFuZ2VzLmNvbC50eXBlJzogJ1x1N0M3Qlx1NTc4QicsXHJcbiAgICAnY2hhbmdlcy5jb2wuc3RhdHVzJzogJ1x1NzJCNlx1NjAwMScsXHJcbiAgICAnY2hhbmdlcy5jb2wudXBkYXRlZCc6ICdcdTY2RjRcdTY1QjBcdTY1RjZcdTk1RjQnLFxyXG4gICAgJ2V4ZWMuY29sLnN0YXR1cyc6ICdcdTcyQjZcdTYwMDEnLFxyXG4gICAgJ2V4ZWMuY29sLmNoYW5nZSc6ICdcdTUzRDhcdTY2RjQnLFxyXG4gICAgJ2V4ZWMuY29sLnN0YXJ0ZWQnOiAnXHU1RjAwXHU1OUNCJyxcclxuICAgICdleGVjLmNvbC5jb3N0JzogJ1x1NjIxMFx1NjcyQyhcdTRGMzApJyxcclxuICAgICdleGVjLmF0dGVtcHRzJzogJ1x1NUMxRFx1OEJENVx1NkIyMVx1NjU3MCcsXHJcbiAgICAnZXhlYy5oaW50JzogJ1x1NjI2N1x1ODg0Q1x1RkYwOHN0YXJ0X3J1blx1RkYwOVx1OEJGN1x1NTcyOFx1NTNGM1x1NEZBN1x1ODA0QVx1NTkyOVx1NEUyRFx1NTNEMVx1OEQ3N1x1RkYxQVx1NTIxQlx1NUVGQVx1OEJBMVx1NTIxMlx1NTQwRVx1NUJGOSBBSSBcdThCRjRcdTMwMENcdTVGMDBcdTU5Q0JcdTYyNjdcdTg4NENcdThCRTUgY2hhbmdlXHUzMDBEXHUzMDAyXHU2NzJDXHU5ODc1XHU2N0U1XHU3NzBCXHU4RkRCXHU1RUE2XHU0RTBFXHU3RUQzXHU2NzlDXHUzMDAyJyxcclxuICAgICdzdGF0ZS5ub1J1bnMnOiAnXHU2NjgyXHU2NUUwXHU2MjY3XHU4ODRDXHU4QkIwXHU1RjU1XHUzMDAyJyxcclxuICAgICdzdGF0ZS50ZWNoU3RhY2snOiAnXHU2MjgwXHU2NzJGXHU2ODA4JyxcclxuICAgICdzdGF0ZS5zeW1ib2xzJzogJ1x1NURGMlx1N0QyMlx1NUYxNVx1N0IyNlx1NTNGNycsXHJcbiAgICAnc3RhdGUubWFuaWZlc3RzJzogJ1x1NkUwNVx1NTM1NVx1NjU4N1x1NEVGNicsXHJcbiAgICAnc3RhdGUuZXZpZGVuY2UnOiAnXHU4QkMxXHU2MzZFXHU2NzYxXHU3NkVFJyxcclxuICB9LFxyXG4gIGVuOiB7XHJcbiAgICAnd29ya3NwYWNlLnRpdGxlJzogJ1JldmlldyBEZXNrJyxcclxuICAgICd3b3Jrc3BhY2Uuc2VsZWN0U2Vzc2lvbic6ICdTZWxlY3QgYSBzZXNzaW9uIHVuZGVyIGEgd29ya3NwYWNlIG9uIHRoZSBsZWZ0IHRvIHZpZXcgaXRzIHByb2plY3QgZGF0YS4nLFxyXG4gICAgJ3RhYi5jb21taXRzJzogJ0NvbW1pdCBSZXZpZXcnLFxyXG4gICAgJ3RhYi5vdmVydmlldyc6ICdPdmVydmlldycsXHJcbiAgICAndGFiLmV4ZWN1dGlvbic6ICdFeGVjdXRpb24nLFxyXG4gICAgJ3RhYi5yZXZpZXcnOiAnUmV2aWV3IGlzc3VlcycsXHJcbiAgICAndGFiLm5vdGVzJzogJ05vdGVzICYgTWVtb3J5JyxcclxuICAgICd0YWIuc2V0dGluZ3MnOiAnU2V0dGluZ3MnLFxyXG4gICAgJ2Vycm9yLmxvYWQnOiAnRmFpbGVkIHRvIGxvYWQnLFxyXG4gICAgJ3N0YXRlLnByb2plY3QnOiAnQ3VycmVudCBwcm9qZWN0JyxcclxuICAgICdzdGF0ZS5ub1Byb2plY3QnOiAnTm8gcHJvamVjdCBpbml0aWFsaXplZCcsXHJcbiAgICAnc3RhdGUubm9Qcm9qZWN0SGludCc6ICdSdW4gXCJJbml0aWFsaXplIHByb2plY3RcIiB0byBzY2FuIHRoZSByZXBvc2l0b3J5IHN0cnVjdHVyZSwgdGVjaCBzdGFjaywgYW5kIHN5bWJvbCBpbmRleC4nLFxyXG4gICAgJ2FjdGlvbi5ib290c3RyYXAnOiAnSW5pdGlhbGl6ZSBwcm9qZWN0JyxcclxuICAgICdhY3Rpb24ucmVzY2FuJzogJ1JlLWluaXRpYWxpemUgLyBzY2FuJyxcclxuICAgICdhY3Rpb24uYW5hbHl6ZSc6ICdBbmFseXplIHdvcmtpbmcgZGlmZicsXHJcbiAgICAnYWN0aW9uLnJldmlldyc6ICdSZXZpZXcgd29ya2luZyBkaWZmJyxcclxuICAgICdhY3Rpb24udmVyaWZ5JzogJ1ZlcmlmeSB3b3JraW5nIGRpZmYnLFxyXG4gICAgJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnOiAnQ3JlYXRlIGNoYW5nZScsXHJcbiAgICAnYWN0aW9uLnJ1bm5pbmcnOiAnUnVubmluZ1x1MjAyNicsXHJcbiAgICAnYWN0aW9uLnJlZnJlc2gnOiAnUmVmcmVzaCcsXHJcbiAgICAnZm9ybS5jaGFuZ2VUaXRsZSc6ICdDaGFuZ2UgdGl0bGUnLFxyXG4gICAgJ2Zvcm0uY2hhbmdlRGVzYyc6ICdSZXF1aXJlbWVudCBhbmQgYmFja2dyb3VuZCAob3B0aW9uYWwpJyxcclxuICAgICdyZXN1bHQucGFuZWwnOiAnQWN0aW9uIHJlc3VsdCcsXHJcblxyXG4gICAgJ3JlcG8uYWRkJzogJ0FkZCByZXBvJyxcclxuICAgICdyZXBvLmFkZEhpbnQnOiAnRW50ZXIgYW4gYWJzb2x1dGUgcmVwbyBwYXRoIGFuZCBwcmVzcyBFbnRlcjsgcHJldmlvdXNseSB1c2VkIHJlcG9zIGFyZSByZW1lbWJlcmVkJyxcclxuICAgICdyZXBvLnNjYW5IaXN0b3J5JzogJ1JlYnVpbGQgaGlzdG9yeScsXHJcbiAgICAncmVwby5jb21taXRzJzogJ2NvbW1pdHMnLFxyXG4gICAgJ3JlcG8uYnJhbmNoJzogJ2JyYW5jaCcsXHJcbiAgICAncmVwby53b3JraW5nJzogJ1VuY29tbWl0dGVkIGNoYW5nZXMnLFxyXG4gICAgJ3JlcG8ud29ya2luZ0NsZWFuJzogJ1dvcmtpbmcgdHJlZSBpcyBjbGVhbicsXHJcbiAgICAncmVwby5lbXB0eSc6ICdObyBjb21taXRzLicsXHJcbiAgICAncmVwby5sb2FkRmFpbGVkJzogJ0ZhaWxlZCB0byBsb2FkIGNvbW1pdHMnLFxyXG4gICAgJ3BpY2tlci50aXRsZSc6ICdQaWNrIGNvbW1pdHMgdG8gcmV2aWV3IChtdWx0aS1zZWxlY3QpJyxcclxuICAgICdwaWNrZXIucGxhY2Vob2xkZXInOiAnQ2xpY2sgdG8gcGljayBjb21taXRzIChtdWx0aS1zZWxlY3QsIGluY2x1ZGVzIHVuY29tbWl0dGVkKScsXHJcbiAgICAncGlja2VyLnNlbGVjdGVkJzogJ1NlbGVjdGVkJyxcclxuICAgICdwaWNrZXIuZmlsdGVyJzogJ0ZpbHRlciBieSB0aXRsZS9oYXNoL2F1dGhvclx1MjAyNicsXHJcbiAgICAncGlja2VyLmNsZWFyJzogJ0NsZWFyJyxcclxuICAgICdwaWNrZXIubm9NYXRjaCc6ICdObyBtYXRjaGluZyBjb21taXQuJyxcclxuICAgICdwaWNrZXIuaGludCc6ICdDaGVja2luZyBhIGNvbW1pdCBnZW5lcmF0ZXMgaXRzIEFJIGV4cGxhbmF0aW9uOyBydW4gaW1wYWN0IGFuZCBvcHRpbWFsaXR5IGJlbG93LicsXHJcbiAgICAncGlja2VyLnJvdW5kJzogJ1JvdW5kIHtufScsXHJcbiAgICAncGlja2VyLnJvdW5kTGF0ZXN0JzogJ1JvdW5kIHtufSAobGF0ZXN0KScsXHJcbiAgICAncGlja2VyLnJvdW5kU2VsZWN0JzogJ1NlbGVjdCByb3VuZCcsXHJcbiAgICAncGlja2VyLnJvdW5kQ2xlYXInOiAnQ2xlYXIgcm91bmQnLFxyXG4gICAgJ3BpY2tlci51bmRpZ2VzdGVkJzogJ05ldyBjb21taXRzIHNpbmNlIHRoZSBsYXN0IEFJIHN1bW1hcnkgd2l0aG91dCBBSSBhbmFseXNpcyB5ZXQnLFxyXG4gICAgJ3BpY2tlci51bmRpZ2VzdGVkQ291bnQnOiAne259IHVucmV2aWV3ZWQgY29tbWl0cycsXHJcbiAgICAncGlja2VyLnNlbGVjdEFsbFVuZGlnZXN0ZWQnOiAnU2VsZWN0IHVuZGlnZXN0ZWQnLFxyXG4gICAgJ3BpY2tlci5kaWdlc3RBbGwnOiAnRGlnZXN0IGFsbCcsXHJcbiAgICAncGlja2VyLmRpZ2VzdEFsbEhpbnQnOiAnU2VsZWN0IGFsbCB1bmRpZ2VzdGVkIGNvbW1pdHMgYW5kIGJhdGNoIEFJIGFuYWx5c2lzIChjb25jdXJyZW5jeSAzLCBjYWNoZWQpLCBhdXRvLWdlbmVyYXRlIHRoZSBuYXJyYXRpdmUgYWZ0ZXJ3YXJkczsgdGhlbiBjcmVhdGUgYW4gQUkgc3VtbWFyeSBpbiBOb3RlcyAmIE1lbW9yeSB0byByZXNldCB0aGUgbWFya2VyJyxcclxuICAgICduYXJyYXRpdmUuZGlnZXN0SGludCc6ICdOYXJyYXRpdmUgZ2VuZXJhdGVkLiBDcmVhdGUgYW4gQUkgc3VtbWFyeSBpbiBOb3RlcyAmIE1lbW9yeSB0byByZXNldCB0aGUgdW5kaWdlc3RlZCBtYXJrZXIuJyxcclxuICAgICdpbXBhY3QuZmFjdG9ycyc6ICdSaXNrIGZhY3RvcnMgKHdoeSB0aGlzIGxldmVsKScsXHJcbiAgICAnaW1wYWN0LnBvaW50cyc6ICdJbXBhY3RlZCBwb2ludHMnLFxyXG4gICAgJ2ltcGFjdC5rZXlQb2ludHMnOiAnS2V5IGNvbXBvbmVudHMnLFxyXG4gICAgJ2ltcGFjdC5tZW1vcnknOiAnQ3Jvc3MtY2hlY2sgd2l0aCBwcm9qZWN0IG1lbW9yeScsXHJcbiAgICAnaW1wYWN0LmZ1bmN0aW9ucyc6ICdJbXBhY3RlZCBmdW5jdGlvbnMgKHdobyBjYWxscyB0aGUgY2hhbmdlZCBjb2RlKScsXHJcbiAgICAnaW1wYWN0LmZ1bmNSb2xlJzogJ0Z1bmN0aW9uIHJvbGUnLFxyXG4gICAgJ2ltcGFjdC5mdW5jQ2hhbmdlJzogJ0NoYW5nZWQgYnkgdGhpcyBjb21taXQnLFxyXG4gICAgJ2ltcGFjdC5mdW5jQ2FsbGVycyc6ICdJbXBhY3Qgb24gY2FsbGVycycsXHJcbiAgICAnY2FjaGUuaGl0JzogJ2Zyb20gY2FjaGUnLFxyXG4gICAgJ2NhY2hlLnJlZ2VuZXJhdGUnOiAnUmVnZW5lcmF0ZScsXHJcbiAgICAnY29zdC50b29sdGlwJzogJ0VzdGltYXRlZCBjb3N0IG9mIHRoaXMgQUkgY2FsbCAoRGVlcFNlZWsgcHJpY2luZyknLFxyXG4gICAgJ2V4ZWMuY3JlYXRlJzogJ05ldyBydW4nLFxyXG4gICAgJ2V4ZWMuZm9ybVRpdGxlJzogJ1doYXQgdG8gZG8gKG9uZSBsaW5lKScsXHJcbiAgICAnZXhlYy5mb3JtRGVzYyc6ICdSZXF1aXJlbWVudDogZ29hbCwgbW9kdWxlcywgYWNjZXB0YW5jZScsXHJcbiAgICAnZXhlYy5zdGFydCc6ICdTdGFydCBydW4nLFxyXG4gICAgJ2V4ZWMuc3RhcnRpbmcnOiAnU3RhcnRpbmdcdTIwMjYnLFxyXG4gICAgJ2V4ZWMuY3JlYXRlSGludCc6ICdDcmVhdGVzIGEgY2hhbmdlLCBnZW5lcmF0ZXMgYSBwbGFuLCB0aGVuIEFJIHN1YmFnZW50cyBleGVjdXRlIHN0ZXAgYnkgc3RlcDsgcHJvZ3Jlc3MgcmVmcmVzaGVzIGJlbG93LicsXHJcbiAgICAnZXhlYy5tb2RlbERlZmF1bHQnOiAnRXhlY3V0aW9uIG1vZGVsIChyb2xlIGRlZmF1bHRzOiBhbmFseXNpcy9vcHM9ZmFzdCwgY29kaW5nPXN0YW5kYXJkLCBwbGFubmluZz1yZWFzb25pbmcsIHZlcmlmaWNhdGlvbj12ZXJpZmllciknLFxyXG4gICAgJ2JhZGdlLnJ1bm5pbmcnOiAne259IHJ1bnMgaW4gcHJvZ3Jlc3MsIGNsaWNrIHRvIHZpZXcnLFxyXG4gICAgJ25hcnJhdGl2ZS50aXRsZSc6ICdXb3JrLXJvdW5kIG5hcnJhdGl2ZScsXHJcbiAgICAnbmFycmF0aXZlLmdlbmVyYXRlJzogJ0ludGVycHJldCB0aGlzIHJvdW5kIG9mIHdvcmsnLFxyXG4gICAgJ25hcnJhdGl2ZS5ydW5uaW5nJzogJ0dlbmVyYXRpbmdcdTIwMjYgKH4xMC0zMHMpJyxcclxuICAgICdiYWRnZS5mYWlsZWQnOiAne259IHJ1bnMgbmVlZCBhdHRlbnRpb24sIGNsaWNrIHRvIHZpZXcnLFxyXG4gICAgJ2V4ZWMuZmxvd0NyZWF0ZSc6ICdEZXNjcmliZSB0aGUgdGFzaycsXHJcbiAgICAnZXhlYy5mbG93T3JjaGVzdHJhdGUnOiAnQ29uZmlybSBvcmNoZXN0cmF0aW9uIChwZXItc3RlcCBtb2RlbC9yb2xlL2ZhaWx1cmUgcG9saWN5KScsXHJcbiAgICAnZXhlYy5mbG93UnVuJzogJ0xhdW5jaCAodHJhY2sgcHJvZ3Jlc3MgJiBjb3N0IGluIHJ1biBkZXRhaWwpJyxcclxuICAgICdleGVjLmZsb3dNZW1vcnknOiAnQXV0by1kaXN0aWxsIG1lbW9yaWVzIChjb25maXJtIGluIG1lbW9yeSBwYW5lbCknLFxyXG4gICAgJ2V4ZWMucGxhbm5pbmcnOiAnR2VuZXJhdGluZyBvcmNoZXN0cmF0aW9uXHUyMDI2IChMTE0gaXMgZGVjb21wb3NpbmcgdGhlIHRhc2ssIH4xMC0zMHMpJyxcclxuICAgICdleGVjLmNvbC5zdGVwcyc6ICdTdGVwcycsXHJcbiAgICAnbm90ZXMuZWRpdCc6ICdFZGl0JyxcclxuICAgICdub3Rlcy50b01lbW9yeSc6ICdUbyBtZW1vcnknLFxyXG4gICAgJ25vdGVzLnRvTWVtb3J5SGludCc6ICdQcmVmaWxsIHRoZSBtZW1vcnkgZm9ybSBiZWxvdyB3aXRoIHRoaXMgbm90ZScsXHJcbiAgICAnbm90ZXMudG9NZW1vcnlEb25lJzogJ1x1MjcxMyBQcmVmaWxsZWQgdGhlIG1lbW9yeSBmb3JtIChjaG9vc2UgYSB0eXBlIGluIHRoZSBQcm9qZWN0IG1lbW9yeSB6b25lIGJlbG93LCB0aGVuIGFkZCknLFxyXG4gICAgJ25vdGVzLmNvcHlNZCc6ICdDb3B5IE1EJyxcclxuICAgICdub3Rlcy5jb3B5TWRIaW50JzogJ0NvcHkgdGhpcyBub3RlIGFzIE1hcmtkb3duIHRvIHRoZSBjbGlwYm9hcmQnLFxyXG4gICAgJ25vdGVzLmNvcHlNZERvbmUnOiAnQ29waWVkIGFzIE1hcmtkb3duJyxcclxuICAgICdub3Rlcy5leHBvcnRNZCc6ICdFeHBvcnQgTUQnLFxyXG4gICAgJ25vdGVzLmV4cG9ydE1kSGludCc6ICdEb3dubG9hZCBhcyBhIC5tZCBmaWxlJyxcclxuICAgICdub3Rlcy5leHBvcnREb25lJzogJ0V4cG9ydGVkIGFzIC5tZCcsXHJcbiAgICAnbm90ZXMuZGlnZXN0TmV2ZXInOiAnTm8gQUkgc3VtbWFyeSBnZW5lcmF0ZWQgeWV0JyxcclxuICAgICdub3Rlcy5kaWdlc3RQZW5kaW5nJzogJ3tufSBuZXcgY29tbWl0cyBzaW5jZSB0aGUgbGFzdCBzdW1tYXJ5JyxcclxuICAgICdkZXRhaWwuc2F2ZU5vdGUnOiAnU2F2ZSBhcyBub3RlJyxcclxuICAgICdkZXRhaWwuc2F2ZU5vdGVIaW50JzogJ1NhdmUgdGhpcyByZXZpZXcgY29uY2x1c2lvbiAod2hhdC9sb2dpYy9yaXNrcykgYXMgYSBzdHJ1Y3R1cmVkIG5vdGUnLFxyXG4gICAgJ2RldGFpbC5zYXZlTm90ZVRpdGxlJzogJ1JldmlldyByZWNvcmQnLFxyXG4gICAgJ2RldGFpbC5zYXZlTWVtb3J5JzogJ0Rpc3RpbGwgdG8gbWVtb3J5JyxcclxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeUhpbnQnOiAnRGlzdGlsbCB0aGlzIHJldmlldyBjb25jbHVzaW9uIGludG8gYSBwcm9qZWN0IG1lbW9yeSAocXVldWVkIGZvciBjb25maXJtYXRpb24pJyxcclxuICAgICdub3Rlcy5zYXZlJzogJ1NhdmUnLFxyXG4gICAgJ25vdGVzLmNhbmNlbCc6ICdDYW5jZWwnLFxyXG4gICAgJ21lbW9yeS5icmFuY2hTY29wZSc6ICdCcmFuY2gnLFxyXG4gICAgJ21lbW9yeS5icmFuY2hBbGwnOiAnQWxsIGJyYW5jaGVzJyxcclxuICAgICdub3Rlcy5zZWFyY2gnOiAnU2VhcmNoIG5vdGVzXHUyMDI2JyxcclxuICAgICdtb2RlbC50aXRsZSc6ICdNb2RlbCBhc3NpZ25tZW50ICh3aGljaCBtb2RlbCBwZXIgdGFzayknLFxyXG4gICAgJ21vZGVsLmxvYWRpbmcnOiAnTG9hZGluZyBtb2RlbHNcdTIwMjYnLFxyXG4gICAgJ21vZGVsLmZvbGxvd0NoYXQnOiAnRm9sbG93IGNoYXQgbW9kZWwnLFxyXG4gICAgJ21vZGVsLnNhdmUnOiAnU2F2ZSAmIGFwcGx5JyxcclxuICAgICdtb2RlbC5zYXZlZCc6ICdBcHBsaWVkJyxcclxuICAgICdtb2RlbC5oaW50JzogJ0FwcGxpZXMgaW1tZWRpYXRlbHkgYW5kIHBlcnNpc3RzIGFjcm9zcyByZXN0YXJ0czsgY2hhdCBtb2RlbCB1bmFmZmVjdGVkLicsXHJcbiAgICAnbm90ZXMuYWlTdW1tYXJ5JzogJ0FJIHN1bW1hcnknLFxyXG4gICAgJ25vdGVzLmFpU3VtbWFyeVJ1bic6ICdTdW1tYXJpemluZ1x1MjAyNiAoMTAtMzBzKScsXHJcbiAgICAnbm90ZXMuZXhwYW5kJzogJ0V4cGFuZCcsXHJcbiAgICAnbm90ZXMuY29sbGFwc2UnOiAnQ29sbGFwc2UnLFxyXG4gICAgJ25vdGVzLnN1bW1hcnlUYWcnOiAnQUkgc3VtbWFyeScsXHJcbiAgICAnbm90ZXMuZW1wdHlTZWFyY2gnOiAnTm8gbWF0Y2hpbmcgbm90ZXMuJyxcclxuICAgICdub3Rlcy5jb250ZW50SGludCc6ICdOb3RlIGNvbnRlbnQgKG11bHRpLWxpbmUpOiBjb25jbHVzaW9ucywgcXVlc3Rpb25zLCBsZWFybmluZ3NcdTIwMjYnLFxyXG4gICAgJ25vdGVzLnRhZ3NIaW50JzogJ1RhZ3MgKGNvbW1hIHNlcGFyYXRlZCwgb3B0aW9uYWw7IGNsaWNrIGEgdGFnIHRvIGZpbHRlciknLFxyXG4gICAgJ25vdGVzLnBpbic6ICdQaW4nLFxyXG4gICAgJ25vdGVzLnVucGluJzogJ1VucGluJyxcclxuICAgICdub3Rlcy5lZGl0ZWRBdCc6ICdlZGl0ZWQnLFxyXG4gICAgJ3Jldmlldy5maWx0ZXJBbGwnOiAnQWxsJyxcclxuICAgICdyZXZpZXcuc3RhdHVzQWxsJzogJ0FsbCBzdGF0dXNlcycsXHJcbiAgICAncmV2aWV3LnZlcmlmeSc6ICdSZS12ZXJpZnknLFxyXG4gICAgJ3Jldmlldy52ZXJpZnlSdW5uaW5nJzogJ1ZlcmlmeWluZ1x1MjAyNicsXHJcbiAgICAncmV2aWV3LnZlcmlmeUhpbnQnOiAnQWZ0ZXIgZml4aW5nIHRoZSBjb2RlLCBjbGljayB0byByZS1jaGVjazogd2hldGhlciBpc3N1ZXMgYXJlIGZpeGVkLCB3aGV0aGVyIHRoZSBjaGFuZ2UgaXMgb3B0aW1hbCBhbmQgbWluaW1hbGx5IGludmFzaXZlLCBhbmQgd2hldGhlciBuZXcgaXNzdWVzIGFwcGVhcmVkLiBPbmx5IGEgcGFzc2luZyByZS12ZXJpZmljYXRpb24gbWFya3MgaXNzdWVzIHJlc29sdmVkLicsXHJcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmUnOiAnRmFsc2UgcG9zaXRpdmUnLFxyXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlSGludCc6ICdIdW1hbi1tYXJrIHRoaXMgaXNzdWUgYXMgYSBmYWxzZSBwb3NpdGl2ZSBhbmQgY2xvc2UgaXQgKGRpc3RpbmN0IGZyb20gYSB2ZXJpZmllZCBmaXgpJyxcclxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZVRpdGxlJzogJ01hcmsgYXMgZmFsc2UgcG9zaXRpdmU/JyxcclxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZU1zZyc6ICdcInt0aXRsZX1cIiB3aWxsIGJlIG1hcmtlZCByZWplY3RlZCBhbmQgcmVtb3ZlZCBmcm9tIHRoZSBvcGVuIHF1ZXVlLicsXHJcbiAgICAncmV2aWV3LmZpeERldGFpbCc6ICdGaXggZGV0YWlscycsXHJcbiAgICAncmV2aWV3LmZpeFN0YXRGaWxlcyc6ICdmaWxlcycsXHJcbiAgICAncmV2aWV3LmZpeEZpbGVzJzogJ0ZpbGVzIHRvdWNoZWQgYnkgdGhlIGZpeCcsXHJcbiAgICAncmV2aWV3LmZpeEltcGFjdCc6ICdJbXBhY3Qgc2NvcGUgKGNoYW5nZWQgc3ltYm9scyBhbmQgY2FsbGVycyknLFxyXG4gICAgJ3Jldmlldy5kZWZpbmVkSW4nOiAnZGVmaW5lZCBpbicsXHJcbiAgICAncmV2aWV3LmNhbGxDb3VudCc6ICdjYWxsIHNpdGUocyknLFxyXG4gICAgJ3Jldmlldy5maXhEaWZmJzogJ0ZpeCBkaWZmIChyZWxhdGl2ZSB0byB0aGUgcmV2aWV3IGJhc2VsaW5lKScsXHJcbiAgICAncmV2aWV3LnJlZnJlc2gnOiAnUmVmcmVzaCcsXHJcbiAgICAncmV2aWV3LnJldGVudGlvbkhpbnQnOiAnUmVzb2x2ZWQgLyBmYWxzZS1wb3NpdGl2ZSBpc3N1ZXMgYXJlIGF1dG8tcHVyZ2VkIGFmdGVyIHtkYXlzfSBkYXkocyknLFxyXG4gICAgJ3Jldmlldy50YXJnZXQnOiAnVGFyZ2V0JyxcclxuICAgICdyZXZpZXcud29ya2luZ1RhcmdldCc6ICdXb3JraW5nIHRyZWUnLFxyXG4gICAgJ3Jldmlldy5leHBvcnRNZCc6ICdFeHBvcnQgTUQnLFxyXG4gICAgJ3Jldmlldy5leHBvcnRNZEhpbnQnOiAnRG93bmxvYWQgdGhlIGZpbHRlcmVkIGlzc3VlIGxpc3QgYXMgYSAubWQgZmlsZScsXHJcbiAgICAncmV2aWV3LmV4cG9ydEVtcHR5JzogJ05vIGlzc3VlcyB0byBleHBvcnQnLFxyXG4gICAgJ3Jldmlldy5zZWxlY3RBbGwnOiAnU2VsZWN0IGFsbCcsXHJcbiAgICAncmV2aWV3LmNoZWNrZWRDb3VudCc6ICd7bn0gc2VsZWN0ZWQnLFxyXG4gICAgJ3Jldmlldy5tYXJrSGFuZGxlZCc6ICdNYXJrIGhhbmRsZWQnLFxyXG4gICAgJ3Jldmlldy5iYXRjaFZlcmlmeSc6ICdCYXRjaCB2ZXJpZnknLFxyXG4gICAgJ3Jldmlldy5iYXRjaFZlcmlmeUNvbmZpcm1UaXRsZSc6ICdCYXRjaCB2ZXJpZnk/JyxcclxuICAgICdyZXZpZXcuYmF0Y2hWZXJpZnlDb25maXJtTXNnJzogJ1dpbGwgdmVyaWZ5IHtufSByZXZpZXcgdGFyZ2V0cyBvbmUgYnkgb25lIChzZXJpYWwgTExNIGNhbGxzLCB+MTAtNjBzIGVhY2gsIGNvbnN1bWVzIG1vZGVsIHVzYWdlKTsgeW91IGNhbiBzdG9wIGFueXRpbWUuJyxcclxuICAgICdyZXZpZXcuYmF0Y2hTdG9wJzogJ1N0b3AnLFxyXG4gICAgJ3Jldmlldy5iYXRjaFByb2dyZXNzJzogJ0JhdGNoIHZlcmlmeWluZyB7aX0ve259JyxcclxuICAgICdyZXZpZXcuYmF0Y2hEb25lJzogJ0JhdGNoIHZlcmlmeSBkb25lOiB7YX0gcmVzb2x2ZWQgXHUwMEI3IHtifSBzdGlsbCBvcGVuIFx1MDBCNyB7Y30gbmV3IFx1MDBCNyB7ZH0gZmFpbGVkIHRhcmdldHMnLFxyXG4gICAgJ3Jldmlldy5iYXRjaFN0b3BwZWQnOiAnQmF0Y2ggdmVyaWZ5IHN0b3BwZWQnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2UnOiAnXHVEODNFXHVEREY5IFRyaWFnZSBhbGwnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VIaW50JzogJ0xMTSBob2xpc3RpYyBzY2FuIG92ZXIgYWxsIHBlbmRpbmcgaXNzdWVzOiBkdXBsaWNhdGVzL29ic29sZXRlL25vbi1pc3N1ZXMgYXJlIGNsb3NlZCBpbW1lZGlhdGVseSB3aXRoIGV2aWRlbmNlIChyZW9wZW5hYmxlKTsgcmVhbCBpc3N1ZXMgc3RheSBmb3IgZml4IGRpc3BhdGNoJyxcclxuICAgICdyZXZpZXcudHJpYWdlQ29uZmlybVRpdGxlJzogJ1RyaWFnZSBhbGwgcGVuZGluZyBpc3N1ZXM/JyxcclxuICAgICdyZXZpZXcudHJpYWdlQ29uZmlybU1zZyc6ICdXaWxsIHNjYW4gYWxsIHBlbmRpbmcgaXNzdWVzIHdpdGggdGhlIExMTSBpbiBiYXRjaGVzICh1cCB0byB7bn0gcGVyIGJhdGNoLCBjb25zdW1lcyBtb2RlbCB1c2FnZSkuIElzc3VlcyBqdWRnZWQgZHVwbGljYXRlL29ic29sZXRlL25vbi1pc3N1ZXMgYXJlIGNsb3NlZCBJTU1FRElBVEVMWSB3aXRoIGV2aWRlbmNlIFx1MjAxNCBldmVyeSBjbG9zdXJlIGlzIHJldmlld2FibGUgYW5kIHJlb3BlbmFibGUgb24gdGhlIGlzc3VlIGNhcmQuIFJlYWwgaXNzdWVzIHN0YXkgZm9yIGZpeCBkaXNwYXRjaC4nLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VQcm9ncmVzcyc6ICdUcmlhZ2luZzoge259IHByb2Nlc3NlZCwgfnttfSByZW1haW5pbmcnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VTdG9wJzogJ1N0b3AnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VEb25lJzogJ1RyaWFnZSBkb25lOiBjbG9zZWQge2F9IGR1cGxpY2F0ZSBcdTAwQjcge2J9IG9ic29sZXRlIFx1MDBCNyB7Y30gbm9uLWlzc3Vlczsge2R9IHBlbmRpbmcga2VwdCcsXHJcbiAgICAncmV2aWV3LnRyaWFnZVN0b3BwZWQnOiAnVHJpYWdlIHN0b3BwZWQgKGp1ZGdlZCBpdGVtcyBhcmUgbm90IHJlLWJpbGxlZDsgY2xpY2sgYWdhaW4gdG8gY29udGludWUpJyxcclxuICAgICdyZXZpZXcudHJpYWdlTm90aGluZyc6ICdObyBwZW5kaW5nIGlzc3VlcyB0byB0cmlhZ2UgZm9yIHRoZSBwcm9qZWN0IHRoaXMgc2Vzc2lvbiByZXNvbHZlcyB0byAoaWYgdGhpcyBsb29rcyB3cm9uZywgY2hlY2sgdGhlIG9wZW4gc2Vzc2lvbiBiZWxvbmdzIHRvIHRoYXQgcHJvamVjdCknLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VQYXJzZUZhaWwnOiAnOyBvbmUgYmF0Y2ggZmFpbGVkIHRvIHBhcnNlIGFuZCB3YXMga2VwdCBhcy1pcywgcmV0cnlhYmxlJyxcclxuICAgICdyZXZpZXcuaGFuZGxlZERvbmUnOiAne259IGlzc3VlcyBtYXJrZWQgYXMgaGFuZGxlZCcsXHJcbiAgICAnZml4LnBsYW4nOiAnRml4IHBsYW4nLFxyXG4gICAgJ2ZpeC5wbGFuQXBwcm9hY2gnOiAnQXBwcm9hY2gnLFxyXG4gICAgJ2ZpeC5wbGFuSW1wYWN0JzogJ0ltcGFjdCcsXHJcbiAgICAnZml4LnBsYW5CZW5lZml0JzogJ0JlbmVmaXQnLFxyXG4gICAgJ2ZpeC5wbGFuUmlzayc6ICdSaXNrJyxcclxuICAgICdmaXguZGlzcGF0Y2gnOiAnRGlzcGF0Y2ggZml4ZXMnLFxyXG4gICAgJ2ZpeC5kaXNwYXRjaEhpbnRNYWluJzogJ0Rpc3BhdGNoIHRoZSBjaGVja2VkIHBlbmRpbmcgaXNzdWVzICh1bmNoZWNrZWQgPSBhbGwgdW5kZXIgdGhlIGN1cnJlbnQgZmlsdGVyKSB0byBjb25jdXJyZW50IHN1Yi1hZ2VudHM6IGF1dG8gZml4ID0gdGhyZWUtZ2F0ZSB2ZXJpZnkgKyBmaXggKyB3cml0ZS1iYWNrICsgY29tbWl0OyBwbGFuIGZpcnN0ID0gcmVhZC1vbmx5IHN0cnVjdHVyZWQgcGxhbnMgYXdhaXRpbmcgeW91ciBhcHByb3ZhbCcsXHJcbiAgICAnZml4LmRpc3BhdGNoTW9kZVRpdGxlJzogJ0Rpc3BhdGNoIGZpeGVzIFx1MjAxNCBwaWNrIGEgbW9kZScsXHJcbiAgICAnZml4LmRpc3BhdGNoTW9kZU1zZyc6ICdXaWxsIGRpc3BhdGNoIHtufSBwZW5kaW5nIGlzc3VlcyB0byBjb25jdXJyZW50IHN1Yi1hZ2VudHMgKG9uZSB3b3JrdHJlZSBwZXIgdGFzaywgY29uc3VtZXMgbW9kZWwgdXNhZ2UsIGRvZXMgbm90IHVzZSB0aGUgY2hhdCB3aW5kb3cpLiBcdTI2QTEgQXV0byBmaXg6IHRocmVlLWdhdGUgdmVyaWZ5ICsgZml4ICsgd3JpdGUtYmFjayArIGNvbW1pdDsgZmFsc2UgcG9zaXRpdmVzL2R1cGxpY2F0ZXMvb2Jzb2xldGUgYXJlIGF1dG8tY2xvc2VkLiBcdUQ4M0RcdURDQ0IgUGxhbiBmaXJzdDogcmVhZC1vbmx5IHN0cnVjdHVyZWQgcGxhbnMsIG5vIGNvZGUgY2hhbmdlczsgYXBwcm92ZSB0aGVtIG9uIHRoZSBpc3N1ZSBjYXJkLCB0aGVuIHByZXNzIFwiRGlzcGF0Y2ggYXBwcm92ZWQgcGxhbnNcIi4nLFxyXG4gICAgJ2ZpeC5kaXNwYXRjaEF1dG8nOiAnXHUyNkExIEF1dG8gZml4JyxcclxuICAgICdmaXguZGlzcGF0Y2hQbGFuJzogJ1x1RDgzRFx1RENDQiBQbGFuIGZpcnN0JyxcclxuICAgICdmaXguZGlzcGF0Y2hOb09wZW4nOiAnTm8gcGVuZGluZyBpc3N1ZXMgdW5kZXIgdGhlIGN1cnJlbnQgZmlsdGVyIHRvIGRpc3BhdGNoJyxcclxuICAgICdmaXguZGlzcGF0Y2hQbGFucyc6ICdEaXNwYXRjaCBhcHByb3ZlZCBwbGFucycsXHJcbiAgICAnZml4LmRpc3BhdGNoUGxhbnNIaW50JzogJ0Rpc3BhdGNoIHRoZSBhcHByb3ZlZCBwZW5kaW5nIHBsYW5zIHRvIGNvbmN1cnJlbnQgc3ViLWFnZW50IGZpeGVzIChvbmUgd29ya3RyZWUgcGVyIHRhc2s7IGNvbmZsaWN0cyBhdXRvLXJlZG8gb24gbGF0ZXN0IEhFQUQpJyxcclxuICAgICdmaXguZGlzcGF0Y2hEb25lJzogJ1x1NURGMlx1NkQzRVx1NTNEMSB7bn0gXHU0RTJBXHU0RkVFXHU1OTBEXHU0RUZCXHU1MkExXHVGRjA4XHU1RTc2XHU1M0QxIHtjfVx1RkYwOScsXHJcbiAgICAnZml4LmRpc3BhdGNoRW1wdHknOiAnXHU2Q0ExXHU2NzA5XHU1M0VGXHU2RDNFXHU1M0QxXHU3Njg0XHU0RUZCXHU1MkExXHVGRjA4XHU1MkZFXHU5MDA5XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHU2MjE2XHU3QjQ5XHU1Rjg1XHU2NUI5XHU2ODQ4XHU0RUE3XHU1MUZBXHVGRjA5JyxcclxuICAgICdmaXguc3RhdHVzJzogJ1x1NEZFRVx1NTkwRFx1NjI2N1x1ODg0QycsXHJcbiAgICAnZml4LnN0b3AnOiAnXHU1MDVDXHU2QjYyJyxcclxuICAgICdmaXguc3RvcERvbmUnOiAnXHU1REYyXHU1MDVDXHU2QjYyIHtufSBcdTRFMkFcdTRGRUVcdTU5MERcdTRFRkJcdTUyQTEnLFxyXG4gICAgJ2ZpeC50YXNrUXVldWVkJzogJ1x1NjM5Mlx1OTYxRlx1NEUyRCcsXHJcbiAgICAnZml4LnRhc2tSdW5uaW5nJzogJ1x1OEZEMFx1ODg0Q1x1NEUyRCcsXHJcbiAgICAnZml4LnRhc2tNZXJnaW5nJzogJ1x1NTQwOFx1NUU3Nlx1NEUyRCcsXHJcbiAgICAnZml4LnRhc2tSZWRvJzogJ1x1OTFDRFx1NTA1QVx1NEUyRCcsXHJcbiAgICAnZml4LnRhc2tEb25lJzogJ1x1NURGMlx1NUI4Q1x1NjIxMCcsXHJcbiAgICAnZml4LnRhc2tDb25mbGljdCc6ICdcdTUxQjJcdTdBODEnLFxyXG4gICAgJ2ZpeC50YXNrRmFpbGVkJzogJ1x1NTkzMVx1OEQyNScsXHJcbiAgICAnZml4LnRhc2tDYW5jZWxsZWQnOiAnXHU1REYyXHU1MDVDXHU2QjYyJyxcclxuICAgICdmaXguYXR0ZW1wdCc6ICdcdTdCMkMge259IFx1NkIyMScsXHJcbiAgICAnZml4LnJ1bnRpbWUnOiAnXHU1REYyXHU4RkQwXHU4ODRDIHtufSBcdTUyMDYnLFxyXG4gICAgJ2ZpeC5yZXN1bWVzJzogJ1x1N0VFRFx1OEREMSB7bn0nLFxyXG4gICAgJ2ZpeC5wcm9iZXMnOiAnXHU2M0EyXHU2RDNCIHtufScsXHJcbiAgICAnZml4Lm1vZGVsVGl0bGUnOiAnXHU0RkVFXHU1OTBEXHU1RTc2XHU1M0QxXHVGRjA4XHU1QjUwIEFnZW50IFx1NkM2MFx1RkYwOScsXHJcbiAgICAnZml4Lm1vZGVsSGludCc6ICdcdTU0MENcdTY1RjZcdTYyNjdcdTg4NENcdTc2ODRcdTRGRUVcdTU5MERcdTVCNTAgQWdlbnQgXHU0RTBBXHU5NjUwXHVGRjA4MS0xMFx1RkYwOVx1MzAwMlx1NkJDRlx1NEVGQlx1NTJBMVx1NzJFQ1x1N0FDQiB3b3JrdHJlZSBcdTRFOTJcdTRFMERcdTVFNzJcdTYyNzBcdTMwMDInLFxyXG5cclxuICAgICdwbGFuLnRpdGxlJzogJ09yY2hlc3RyYXRpb24gcGxhbicsXHJcbiAgICAncGxhbi5oaW50JzogJ0VhY2ggc3RlcCByb2xlIGRyaXZlcyBjb250ZXh0IGluamVjdGlvbiBhbmQgdGhlIGRlZmF1bHQgbW9kZWwgKGFuYWx5c2lzL29wcz1mYXN0LCBjb2Rpbmc9c3RhbmRhcmQsIHBsYW5uaW5nPXJlYXNvbmluZywgdmVyaWZpY2F0aW9uPXZlcmlmaWVyKTsgYWRqdXN0IGJlZm9yZSBsYXVuY2hpbmcuJyxcclxuICAgICdwbGFuLmNvbC5zdGVwJzogJ1N0ZXAnLCAncGxhbi5jb2wucm9sZSc6ICdSb2xlJywgJ3BsYW4uY29sLm1vZGVsJzogJ01vZGVsJywgJ3BsYW4uY29sLnBvbGljeSc6ICdGYWlsdXJlIHBvbGljeScsICdwbGFuLmNvbC5lbmFibGVkJzogJ09uJywgJ3BsYW4uY29sLmF0dGVtcHRzJzogJ0F0dGVtcHRzJyxcclxuICAgICdwbGFuLm1vZGVsRGVmYXVsdCc6ICdSb2xlIGRlZmF1bHQnLFxyXG4gICAgJ3BsYW4ubGF1bmNoRWRpdGVkJzogJ1NhdmUgZWRpdHMgJiBsYXVuY2gnLFxyXG4gICAgJ3BsYW4ubGF1bmNoRGlyZWN0JzogJ0xhdW5jaCBhcy1pcycsXHJcbiAgICAncGxhbi5kaXNjYXJkJzogJ0Rpc2NhcmQnLFxyXG4gICAgJ3BsYW4udmlld0RldGFpbCc6ICdEZXRhaWwnLCAncGxhbi5yZWZyZXNoRGV0YWlsJzogJ1JlZnJlc2gnLCAncGxhbi5jbG9zZURldGFpbCc6ICdDbG9zZScsXHJcbiAgICAncGxhbi5kZXRhaWxUaXRsZSc6ICdSdW4gZGV0YWlsJyxcclxuICAgICdwbGFuLnBhdXNlZEJhbm5lcic6ICdSdW4gcGF1c2VkLCBhd2FpdGluZyB5b3VyIGRlY2lzaW9uJyxcclxuICAgICdwbGFuLnJlc3VtZVJldHJ5JzogJ1JldHJ5IHN0ZXAgJiBjb250aW51ZScsXHJcbiAgICAncGxhbi5yZXN1bWVTa2lwJzogJ1NraXAgc3RlcCAmIGNvbnRpbnVlJyxcclxuICAgICdwbGFuLnJlc3VtZUZhaWxlZCc6ICdSZXN1bWUgZnJvbSBmYWlsdXJlJyxcclxuICAgICdwbGFuLmNvbnRleHRUaXRsZSc6ICdSdW4gY29udGV4dCAod2hhdCB3YXMgaW5qZWN0ZWQpJyxcclxuICAgICdwbGFuLmJyYW5jaCc6ICdCcmFuY2gnLCAncGxhbi5pbmplY3RlZE1lbW9yaWVzJzogJ0luamVjdGVkIG1lbW9yaWVzJywgJ3BsYW4uZGVjaXNpb25Mb2cnOiAnRGVjaXNpb24gbG9nJyxcclxuICAgICdleGVjLmNvbC5kZXRhaWwnOiAnRGV0YWlsJyxcclxuXHJcbiAgICAnc2NoZWQudGl0bGUnOiAnU2NoZWR1bGVkIHRhc2tzJyxcclxuICAgICdzY2hlZC5mb3JtTmFtZSc6ICdUYXNrIG5hbWUnLCAnc2NoZWQuZm9ybUludGVydmFsJzogJ0ludGVydmFsIChtaW51dGVzKScsXHJcbiAgICAnc2NoZWQudHlwZVJldmlldyc6ICdBdXRvIHJldmlldycsICdzY2hlZC50eXBlU3VtbWFyeSc6ICdBSSBzdW1tYXJ5JywgJ3NjaGVkLnR5cGVSdW4nOiAnVGltZWQgcnVuJyxcclxuICAgICdzY2hlZC5hZGQnOiAnQ3JlYXRlJyxcclxuICAgICdzY2hlZC5oaW50JzogJ1J1bnMgYXV0b21hdGljYWxseSB3aGVuIGR1ZTogYXV0byByZXZpZXcgPSByZXZpZXcgY29tbWl0cyBmcm9tIHRoZSBsYXN0IDI0aCAoaXNzdWVzIGxhbmQgaW4gdGhlIFJldmlldyB0YWIpOyBBSSBzdW1tYXJ5ID0gaW5jcmVtZW50YWwgbGVhcm5pbmcgc3VtbWFyeTsgdGltZWQgcnVuID0gZXhlY3V0ZSB0aGUgdGVtcGxhdGUgYXMgYW4gb3JjaGVzdHJhdGVkIHRhc2suIE1pbmltdW0gMSBtaW51dGUuJyxcclxuICAgICdzY2hlZC5lbXB0eSc6ICdObyBzY2hlZHVsZWQgdGFza3MgeWV0LicsXHJcbiAgICAnc2NoZWQuY29sLm5hbWUnOiAnTmFtZScsICdzY2hlZC5jb2wudHlwZSc6ICdUeXBlJywgJ3NjaGVkLmNvbC5pbnRlcnZhbCc6ICdDeWNsZScsICdzY2hlZC5jb2wubmV4dCc6ICdOZXh0IHJ1bicsICdzY2hlZC5jb2wubGFzdFJlc3VsdCc6ICdMYXN0IHJlc3VsdCcsICdzY2hlZC5jb2wuYWN0aW9ucyc6ICdBY3Rpb25zJyxcclxuICAgICdzY2hlZC5kYXknOiAnIGQnLCAnc2NoZWQuaG91cic6ICcgaCcsICdzY2hlZC5taW51dGUnOiAnIG1pbicsXHJcbiAgICAnc2NoZWQuZGlzYWJsZSc6ICdQYXVzZScsICdzY2hlZC5lbmFibGUnOiAnRW5hYmxlJywgJ3NjaGVkLnJ1bk5vdyc6ICdSdW4gbm93JyxcclxuXHJcbiAgICAnbWVtb3J5LnpvbmVUaXRsZSc6ICdQcm9qZWN0IG1lbW9yeScsXHJcbiAgICAnbWVtb3J5LnN5bmNCYXNlbGluZSc6ICdTeW5jIGJhc2VsaW5lJywgJ21lbW9yeS5zeW5jTm9uZSc6ICduZXZlciBzeW5jZWQnLFxyXG4gICAgJ21lbW9yeS5iZWhpbmQnOiAne259IGNvbW1pdHMgYmVoaW5kJyxcclxuICAgICdtZW1vcnkuc3luYyc6ICdTeW5jIG1lbW9yeScsICdtZW1vcnkuc3luY2luZyc6ICdTeW5jaW5nXHUyMDI2JywgJ21lbW9yeS5zeW5jRmFpbGVkJzogJ1N5bmMgZmFpbGVkJyxcclxuICAgICdtZW1vcnkuc3RhbGVUaXRsZSc6ICdQb3NzaWJseSBzdGFsZSAocmVsYXRlZCBjb2RlIGNoYW5nZWQ7IHJldmlldyBuZWVkZWQpJyxcclxuICAgICdtZW1vcnkubWFya1N0YWxlJzogJ01hcmsgc3RhbGUnLCAnbWVtb3J5LmFyY2hpdmVCdG4nOiAnQXJjaGl2ZScsICdtZW1vcnkua2VlcEFjdGl2ZSc6ICdTdGlsbCB2YWxpZCcsXHJcbiAgICAnbWVtb3J5Lm5ld0NhbmRpZGF0ZXMnOiAnTmV3IGNhbmRpZGF0ZXMgKHF1ZXVlZCBmb3IgY29uZmlybWF0aW9uKTonLFxyXG4gICAgJ21lbW9yeS5jbG9zZVJlcG9ydCc6ICdDbG9zZSByZXBvcnQnLFxyXG4gICAgJ21lbW9yeS5zY29wZVByb2plY3QnOiAnTWFpbmxpbmUgKGFsbCBicmFuY2hlcyknLCAnbWVtb3J5LnNjb3BlQnJhbmNoJzogJ0N1cnJlbnQgYnJhbmNoIG9ubHknLFxyXG4gICAgJ21lbW9yeS5wZW5kaW5nUXVldWUnOiAnUGVuZGluZyBjb25maXJtYXRpb24nLFxyXG4gICAgJ21lbW9yeS50b05vdGUnOiAnVG8gbm90ZScsICdtZW1vcnkubm9ybWFsaXplJzogJ05vcm1hbGl6ZSB0byBtYWlubGluZScsICdtZW1vcnkucmVzdG9yZSc6ICdSZXN0b3JlJyxcclxuICAgICdtZW1vcnkuc3RhdHVzU3RhbGUnOiAnU3RhbGUnLFxyXG4gICAgJ2ZzLmJyb3dzZSc6ICdCcm93c2UnLFxyXG4gICAgJ2ZzLnVwJzogJ1VwJyxcclxuICAgICdmcy51c2UnOiAnVXNlIHRoaXMgZGlyZWN0b3J5JyxcclxuICAgICdmcy5yZWdpc3Rlcic6ICdBbHNvIHJlZ2lzdGVyIGFzIHNlc3Npb24gd29ya3NwYWNlJyxcclxuICAgICdmcy5sb2FkaW5nJzogJ1JlYWRpbmdcdTIwMjYnLFxyXG4gICAgJ2ZzLmVtcHR5JzogJ05vIHN1YmRpcmVjdG9yaWVzLicsXHJcbiAgICAnaW1wYWN0LmZ1bmN0aW9uc05vbmUnOiAnTm8gZnVuY3Rpb24tbGV2ZWwgY2FsbCBpbXBhY3QgZGV0ZWN0ZWQgKHN0eWxlL2Fzc2V0L2NvbmZpZy1vbmx5IGNoYW5nZSkuJyxcclxuICAgICdyZXZpZXcuY29sLnNldmVyaXR5JzogJ1NldmVyaXR5JyxcclxuICAgICdyZXZpZXcuY29sLmNhdGVnb3J5JzogJ0NhdGVnb3J5JyxcclxuICAgICdyZXZpZXcuY29sLnRpdGxlJzogJ0lzc3VlJyxcclxuICAgICdyZXZpZXcuY29sLmV2aWRlbmNlJzogJ0xvY2F0aW9uJyxcclxuICAgICdyZXZpZXcuY29sLmZpeCc6ICdTdWdnZXN0ZWQgZml4JyxcclxuICAgICdyZXZpZXcuaGludCc6ICdDbGljayB0aGUgYnV0dG9uIGFib3ZlIHRvIHByb2R1Y2UgdGhlIG9wdGltYWxpdHkgdmVyZGljdCBhbmQgaXNzdWUgbGlzdC4nLFxyXG4gICAgJ2RpZmYuc2hvdyc6ICdEaWZmJyxcclxuICAgICdkaWZmLmhpZGUnOiAnSGlkZSBkaWZmJyxcclxuXHJcbiAgICAnZGV0YWlsLnRpdGxlJzogJ1JldmlldyBkZXRhaWwnLFxyXG4gICAgJ2RldGFpbC5waWNrJzogJ1x1MjE5MCBQaWNrIGEgY29tbWl0IChvciB0aGUgdW5jb21taXR0ZWQgY2hhbmdlcykgb24gdGhlIGxlZnQgdG8gc3RhcnQgcmV2aWV3aW5nJyxcclxuICAgICdkZXRhaWwud2hhdCc6ICdXaGF0IGl0IGRvZXMnLFxyXG4gICAgJ2RldGFpbC5sb2dpYyc6ICdJbXBsZW1lbnRhdGlvbiBsb2dpYycsXHJcbiAgICAnZGV0YWlsLnJpc2snOiAnUmlza3MnLFxyXG4gICAgJ2RldGFpbC5maWxlcyc6ICdGaWxlcycsXHJcbiAgICAnZGV0YWlsLnBhdGNoJzogJ1Nob3cgcmF3IHBhdGNoJyxcclxuICAgICdkZXRhaWwuYWlMb2FkaW5nJzogJ0dlbmVyYXRpbmcgQUkgZXhwbGFuYXRpb25cdTIwMjYgKDEwLTMwcyknLFxyXG4gICAgJ2RldGFpbC5xdWV1ZWQnOiAne259IGFuYWx5c2VzIHF1ZXVlZCAod2lsbCBydW4gY29uY3VycmVudGx5KScsXHJcbiAgICAnZGV0YWlsLmNhcmRRdWV1ZWQnOiAnV2FpdGluZyBpbiB0aGUgYW5hbHlzaXMgcXVldWUgKG1heCAzIGNvbmN1cnJlbnQgdG8gcHJvdGVjdCB0aGUgbW9kZWwgZ2F0ZXdheSknLFxyXG4gICAgJ2RldGFpbC5pbXBhY3QnOiAnSW1wYWN0IHNjb3BlJyxcclxuICAgICdkZXRhaWwuaW1wYWN0TG9hZGluZyc6ICdTY2FubmluZyBpbXBhY3RcdTIwMjYgKHJlZmVyZW5jZSBzZWFyY2ggKyBncmFwaCB3YWxrKScsXHJcbiAgICAnZGV0YWlsLm9wdGltYWxpdHknOiAnT3B0aW1hbGl0eSByZXZpZXcnLFxyXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZyc6ICdSZXZpZXdpbmdcdTIwMjYgKHByb2R1Y2VzIGlzc3VlIGxpc3QgYW5kIG9wdGltYWxpdHkgdmVyZGljdCknLFxyXG5cclxuICAgICdpbXBhY3Qucmlzayc6ICdSaXNrJyxcclxuICAgICdpbXBhY3QuY29sLmNoYW5nZWQnOiAnQ2hhbmdlZCBmaWxlcycsXHJcbiAgICAnaW1wYWN0LmNvbC5pbmRpcmVjdCc6ICdJbmRpcmVjdCAocmVmZXJlbmNlIGNoYWluKScsXHJcbiAgICAnaW1wYWN0LmNvbC5wb3RlbnRpYWwnOiAnUG90ZW50aWFsJyxcclxuICAgICdpbXBhY3Qubm9uZSc6ICdObyBpbi1yZXBvIHJlZmVyZW5jZXJzIGZvdW5kICh0aGUgY2hhbmdlIGxvb2tzIHNlbGYtY29udGFpbmVkKS4nLFxyXG4gICAgJ2ltcGFjdC50ZXN0cyc6ICdSZWxhdGVkIHRlc3RzJyxcclxuICAgICdpbXBhY3QubGVnZW5kLmNoYW5nZWQnOiAnY2hhbmdlZCcsXHJcbiAgICAnaW1wYWN0LmxlZ2VuZC5pbmRpcmVjdCc6ICdpbmRpcmVjdCcsXHJcbiAgICAnaW1wYWN0LmxlZ2VuZC5wb3RlbnRpYWwnOiAncG90ZW50aWFsJyxcclxuXHJcbiAgICAncmV2aWV3LnZlcmRpY3QnOiAnT3B0aW1hbGl0eSB2ZXJkaWN0JyxcclxuICAgICdyZXZpZXcuaXNzdWVzJzogJ0lzc3VlcycsXHJcbiAgICAncmV2aWV3LmNsZWFuJzogJ05vIGlzc3VlcyBmb3VuZC4nLFxyXG5cclxuICAgICdub3Rlcy50aXRsZSc6ICdSZXZpZXcgbm90ZXMnLFxyXG4gICAgJ25vdGVzLmZvcm1UaXRsZSc6ICdOb3RlIHRpdGxlJyxcclxuICAgICdub3Rlcy5mb3JtQ29udGVudCc6ICdOb3RlIGNvbnRlbnQgKGNvbmNsdXNpb25zLCBxdWVzdGlvbnMsIGxlYXJuaW5nc1x1MjAyNiknLFxyXG4gICAgJ25vdGVzLmFkZCc6ICdBZGQgbm90ZScsXHJcbiAgICAnbm90ZXMuYm91bmRUbyc6ICdXaWxsIGJlIGxpbmtlZCB0bycsXHJcbiAgICAnbm90ZXMuY29sLnRpbWUnOiAnVGltZScsXHJcbiAgICAnbm90ZXMuY29sLnRpdGxlJzogJ1RpdGxlJyxcclxuICAgICdub3Rlcy5jb2wuY29udGVudCc6ICdDb250ZW50JyxcclxuICAgICdub3Rlcy5jb2wuc2hhJzogJ0NvbW1pdCcsXHJcbiAgICAnbm90ZXMucmVtb3ZlJzogJ0RlbGV0ZScsXHJcbiAgICAnbm90ZXMuZW1wdHknOiAnTm8gbm90ZXMgeWV0LiBOb3RlIGRvd24gY29uY2x1c2lvbnMgYW5kIHF1ZXN0aW9ucyB3aGlsZSByZXZpZXdpbmcgY29tbWl0cyBcdTIwMTQgdGhhdCBpcyB5b3VyIHByb2plY3QgbGVhcm5pbmcgYXJjaGl2ZS4nLFxyXG5cclxuICAgICdtZW1vcnkucmVjb3JkJzogJ1JlY29yZCBwcm9qZWN0IG1lbW9yeScsXHJcbiAgICAnZm9ybS5tZW1vcnlUaXRsZSc6ICdNZW1vcnkgdGl0bGUnLFxyXG4gICAgJ2Zvcm0ubWVtb3J5Q29udGVudCc6ICdNZW1vcnkgY29udGVudCAod2hhdCBhbmQgd2h5KScsXHJcbiAgICAnbWVtb3J5LmNvbC50aXRsZSc6ICdJdGVtJyxcclxuICAgICdtZW1vcnkuY29sLnR5cGUnOiAnVHlwZScsXHJcbiAgICAnbWVtb3J5LmNvbC50cnV0aCc6ICdUcnV0aCcsXHJcbiAgICAnbWVtb3J5LmNvbC5icmFuY2gnOiAnQnJhbmNoJyxcclxuICAgICdtZW1vcnkuY29uZmlybSc6ICdDb25maXJtJyxcclxuICAgICdtZW1vcnkuZW1wdHknOiAnTm8gcHJvamVjdCBtZW1vcmllcyB5ZXQuIEFzayB0aGUgQUkgaW4gY2hhdCB0byByZWNvcmQgb25lLCBvciBhZGQgYWJvdmUuJyxcclxuICAgICdjb25jZXB0cy50aXRsZSc6ICdMZWFybmluZyBjb25jZXB0cycsXHJcbiAgICAnY29uY2VwdHMubm9uZSc6ICdObyBsZWFybmluZyBjb25jZXB0cyB5ZXQuIFRoZXkgYWNjdW11bGF0ZSBhZnRlciBzdWNjZXNzZnVsIGNoYW5nZSBydW5zLCBvciBhc2sgdGhlIEFJIHRvIHN1bW1hcml6ZSBsZWFybmluZyBwb2ludHMuJyxcclxuICAgICdjb25jZXB0cy5jb2wubmFtZSc6ICdDb25jZXB0JyxcclxuICAgICdjb25jZXB0cy5jb2wuY2F0ZWdvcnknOiAnQ2F0ZWdvcnknLFxyXG4gICAgJ2NvbmNlcHRzLmNvbC5jb3VudCc6ICdDb3VudCcsXHJcbiAgICAncmV2aWV3LnJlY29yZHNUaXRsZSc6ICdSZXZpZXcgaXNzdWVzJyxcclxuICAgICdyZXZpZXcucmVjb3Jkc0VtcHR5JzogJ05vIGlzc3VlIHJlY29yZHMgeWV0LiBJc3N1ZXMgZm91bmQgYnkgdGhlIGNvbW1pdC1yZXZpZXcgcGFnZSBhcmUgcmVjb3JkZWQgaGVyZSBhdXRvbWF0aWNhbGx5OyByZS1yZXZpZXdpbmcgcmVwbGFjZXMgb2xkIHJlY29yZHMuJyxcclxuICAgICd2ZXJpZnkucmVjb3Jkcyc6ICdWZXJpZmljYXRpb24gcmVjb3JkcycsXHJcbiAgICAndmVyaWZ5LnJlY29yZHNFbXB0eSc6ICdObyB2ZXJpZmljYXRpb24gcmVjb3JkcyB5ZXQuIENsaWNrIFwiVmVyaWZ5XCIgaW4gdGhlIGV4ZWN1dGlvbiB0YWIgdG8gZ2VuZXJhdGUgb25lLicsXHJcblxyXG4gICAgJ2NvbmZpcm1lZC50aXRsZSc6ICdDb25maXJtZWQgY29uc3RyYWludHMgKGh1bWFuLWNvbmZpcm1lZDsgQUkgZWRpdHMgdG8gZm9yYmlkZGVuIHBhdGhzIGFyZSBhdXRvLWRlbmllZCknLFxyXG4gICAgJ2NvbmZpcm1lZC5hZGQnOiAnQWRkIGNvbnN0cmFpbnQnLFxyXG4gICAgJ2NvbmZpcm1lZC50ZXh0JzogJ1JlcXVpcmVtZW50IC8gY29uc3RyYWludCB0ZXh0JyxcclxuICAgICdjb25maXJtZWQucGF0aHMnOiAnRm9yYmlkZGVuIHBhdGhzIChjb21tYSBzZXBhcmF0ZWQ7IHJlbGF0aXZlIHRvIHByb2plY3Qgcm9vdCBsaWtlIHNyYy9jb3JlLCBvciBhYnNvbHV0ZSknLFxyXG4gICAgJ2NvbmZpcm1lZC5ub25lJzogJ05vIGNvbnN0cmFpbnRzIHlldC4gT25jZSBhZGRlZCwgQUkgZWRpdHMgdG8gZm9yYmlkZGVuIHBhdGhzIGluIHRoaXMgcHJvamVjdCBhcmUgYXV0by1kZW5pZWQuJyxcclxuXHJcbiAgICAnY2hhbmdlcy50aXRsZSc6ICdDaGFuZ2UgdGFza3MnLFxyXG4gICAgJ3N0YXRlLm5vQ2hhbmdlcyc6ICdObyBjaGFuZ2UgdGFza3MgeWV0LiBBc2sgdGhlIEFJIGluIGNoYXQgdG8gY3JlYXRlIG9uZSwgb3IgdXNlIFwiQ3JlYXRlIGNoYW5nZVwiIGFib3ZlLicsXHJcbiAgICAnY2hhbmdlcy5jb2wudGl0bGUnOiAnVGl0bGUnLFxyXG4gICAgJ2NoYW5nZXMuY29sLnR5cGUnOiAnVHlwZScsXHJcbiAgICAnY2hhbmdlcy5jb2wuc3RhdHVzJzogJ1N0YXR1cycsXHJcbiAgICAnY2hhbmdlcy5jb2wudXBkYXRlZCc6ICdVcGRhdGVkJyxcclxuICAgICdleGVjLmNvbC5zdGF0dXMnOiAnU3RhdHVzJyxcclxuICAgICdleGVjLmNvbC5jaGFuZ2UnOiAnQ2hhbmdlJyxcclxuICAgICdleGVjLmNvbC5zdGFydGVkJzogJ1N0YXJ0ZWQnLFxyXG4gICAgJ2V4ZWMuY29sLmNvc3QnOiAnQ29zdCAoZXN0KScsXHJcbiAgICAnZXhlYy5hdHRlbXB0cyc6ICdBdHRlbXB0cycsXHJcbiAgICAnZXhlYy5oaW50JzogJ1J1bnMgKHN0YXJ0X3J1bikgYXJlIHN0YXJ0ZWQgZnJvbSBjaGF0OiBhZnRlciBhIHBsYW4gZXhpc3RzLCB0ZWxsIHRoZSBBSSB0byBcInN0YXJ0IHJ1biBmb3IgdGhlIGNoYW5nZVwiLiBUaGlzIHRhYiBzaG93cyBwcm9ncmVzcyBhbmQgcmVzdWx0cy4nLFxyXG4gICAgJ3N0YXRlLm5vUnVucyc6ICdObyBydW5zIHlldC4nLFxyXG4gICAgJ3N0YXRlLnRlY2hTdGFjayc6ICdUZWNoIHN0YWNrJyxcclxuICAgICdzdGF0ZS5zeW1ib2xzJzogJ0luZGV4ZWQgc3ltYm9scycsXHJcbiAgICAnc3RhdGUubWFuaWZlc3RzJzogJ01hbmlmZXN0cycsXHJcbiAgICAnc3RhdGUuZXZpZGVuY2UnOiAnRXZpZGVuY2UgZW50cmllcycsXHJcbiAgfSxcclxufSBhcyBjb25zdFxyXG5cclxuZnVuY3Rpb24gZmFsbGJhY2tUKGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuICBjb25zdCBkaWN0ID0gV09SS1NQQUNFX0RJQ1QuemggYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPlxyXG4gIHJldHVybiBkaWN0W2tleV0gPz8ga2V5XHJcbn1cclxuXHJcbi8qKiBcdTY0Q0RcdTRGNUNcdTdFRDNcdTY3OUNcdTRFQkFcdTYwMjdcdTUzMTZcdUZGMUFcdTI3MTMvXHUyNzE3ICsgXHU2ODA3XHU5MUNGXHU1QjU3XHU2QkI1XHU3Njg0XHU3RDI3XHU1MUQxXHU4ODRDXHVGRjA4XHU4REYzXHU4RkM3XHU1RDRDXHU1OTU3XHU1QkY5XHU4QzYxXHU0RTBFXHU1MzlGXHU1OUNCIEpTT05cdUZGMDlcdTMwMDIgKi9cclxuZnVuY3Rpb24gZm9ybWF0QWN0aW9uUmVzdWx0KGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogc3RyaW5nIHtcclxuICBjb25zdCBsaW5lczogc3RyaW5nW10gPSBbZGF0YVsnb2snXSA9PT0gZmFsc2UgPyAnXHUyNzE3JyA6ICdcdTI3MTMnXVxyXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGEpKSB7XHJcbiAgICBpZiAoa2V5ID09PSAnb2snKSBjb250aW51ZVxyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xyXG4gICAgICBsaW5lcy5wdXNoKGAke2tleX1cdUZGMUEke1N0cmluZyh2YWx1ZSkuc2xpY2UoMCwgMjAwKX1gKVxyXG4gICAgfVxyXG4gIH1cclxuICBpZiAobGluZXMubGVuZ3RoID09PSAxKSBsaW5lcy5wdXNoKCdcdTYyMTBcdTUyOUYnKVxyXG4gIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKVxyXG59XHJcblxyXG4vKiogTExNIFx1NjIxMFx1NjcyQ1x1RkYwOFx1NEYzMFx1RkYwOVx1NUZCRFx1NjgwN1x1RkYxQVx1NjVFMFx1NTAzQ1x1RkYwOFx1NjcyQVx1NEVBN1x1NzUxRlx1OEMwM1x1NzUyOCAvIFx1NjVFN1x1N0YxM1x1NUI1OFx1NEUwRFx1NUUyNlx1NjIxMFx1NjcyQ1x1RkYwOVx1NjVGNlx1OEZENFx1NTZERSBudWxsIFx1NEUwRFx1NTM2MFx1NEY0RFx1MzAwMiAqL1xyXG5mdW5jdGlvbiByZW5kZXJDb3N0QmFkZ2UodXNkOiBudW1iZXIgfCB1bmRlZmluZWQsIHRpdGxlOiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGUge1xyXG4gIGlmICh1c2QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGxcclxuICByZXR1cm4gPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOTQ5ZScpfSB0aXRsZT17dGl0bGV9Plx1MjI0OCR7dXNkLnRvRml4ZWQoNCl9PC9zcGFuPlxyXG59XHJcblxyXG5jb25zdCBzdHlsZXM6IFJlY29yZDxzdHJpbmcsIFJlYWN0LkNTU1Byb3BlcnRpZXM+ID0ge1xyXG4gIHJvb3Q6IHtcclxuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxyXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgZm9udEZhbWlseTogJ3ZhcigtLWRzLWZvbnQtc2FucywgaW5oZXJpdCknLFxyXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gIH0sXHJcbiAgbmF2OiB7XHJcbiAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgIGdhcDogJzRweCcsXHJcbiAgICBwYWRkaW5nOiAnOHB4IDEycHgnLFxyXG4gICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDEsIHJnYmEoNSw1LDUsMC4xKSknLFxyXG4gICAgZmxleDogJ25vbmUnLFxyXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXHJcbiAgfSxcclxuICB0aXRsZTogeyBmb250U2l6ZTogJzEzcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbklubGluZUVuZDogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSxcclxuICB0YWI6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XHJcbiAgICBwYWRkaW5nOiAnNXB4IDEycHgnLFxyXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcclxuICAgIGJvcmRlcjogJ25vbmUnLFxyXG4gICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICBmb250U2l6ZTogJzEycHgnLFxyXG4gICAgLy8gYnV0dG9uLWluZm8tZmlsbCBcdTRFMjRcdTRFM0JcdTk4OThcdTkwRkRcdTg0RERcdUZGMUJicmFuZC1wcmltYXJ5IFx1NTcyOFx1NkRGMVx1ODI3Mlx1NEUzQlx1OTg5OFx1NjYyRlx1OEZEMVx1NzY3RFx1ODI3Mlx1RkYwQ1x1NzY3RFx1NUI1N1x1NEYxQVx1ODhBQlx1NTQxRVx1NjM4OVx1RkYwOFx1OTg3NVx1N0I3RVx1NzY3RFx1NTc1N1x1NEU4Qlx1NjU0NVx1RkYwOVx1MzAwMlxyXG4gICAgYmFja2dyb3VuZDogYWN0aXZlID8gJ3ZhcigtLWRzdy1hbGlhcy1idXR0b24taW5mby1maWxsLCAjMjU2M2ViKScgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgY29sb3I6IGFjdGl2ZSA/ICcjZmZmJyA6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsXHJcbiAgfSksXHJcbiAgYm9keTogeyBmbGV4OiAxLCBvdmVyZmxvd1k6ICdhdXRvJywgcGFkZGluZzogJzE0cHggMTZweCcgfSxcclxuICBjYXJkOiB7XHJcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgIHBhZGRpbmc6ICcxMnB4IDE0cHgnLFxyXG4gICAgbWFyZ2luQm90dG9tOiAnMTJweCcsXHJcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJyxcclxuICB9LFxyXG4gIHJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzE4cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBmb250U2l6ZTogJzEycHgnLCBtYXJnaW46ICc2cHggMCcgfSxcclxuICBsYWJlbDogeyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luSW5saW5lRW5kOiAnNnB4JyB9LFxyXG4gIHRhYmxlOiB7IHdpZHRoOiAnMTAwJScsIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLCBmb250U2l6ZTogJzEycHgnIH0sXHJcbiAgdGg6IHsgdGV4dEFsaWduOiAnc3RhcnQnLCBwYWRkaW5nOiAnNnB4IDhweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwxLCByZ2JhKDUsNSw1LDAuMSkpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGZvbnRXZWlnaHQ6IDUwMCB9LFxyXG4gIHRkOiB7IHBhZGRpbmc6ICc2cHggOHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDMsIHJnYmEoNSw1LDUsMC4wNikpJyB9LFxyXG4gIGVtcHR5OiB7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250U2l6ZTogJzEycHgnLCBwYWRkaW5nOiAnMTBweCA0cHgnIH0sXHJcbiAgYnV0dG9uOiB7XHJcbiAgICBwYWRkaW5nOiAnNXB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAvLyBidXR0b24taW5mby1maWxsIFx1NjYyRlx1NUJCRlx1NEUzQlx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1NEUwQlx1OTBGRFx1NEUzQVx1ODRERFx1ODI3Mlx1MzAwMVx1NzY3RFx1NUI1N1x1NTNFRlx1OEJGQlx1NzY4NFx1NEUzQlx1NjRDRFx1NEY1Q1x1ODI3Mlx1RkYwOGJyYW5kLXByaW1hcnkgXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RTBEXHU1M0VGXHU4QkZCXHVGRjA5XHUzMDAyXHJcbiAgICBmb250U2l6ZTogJzExcHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpJywgY29sb3I6ICcjZmZmJyxcclxuICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxyXG4gIH0sXHJcbiAgc2Vjb25kYXJ5OiB7XHJcbiAgICBwYWRkaW5nOiAnNXB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICcxMXB4JyxcclxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXHJcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXHJcbiAgfSxcclxuICBpbnB1dDoge1xyXG4gICAgd2lkdGg6ICcxMDAlJywgcGFkZGluZzogJzZweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgZm9udFNpemU6ICcxMnB4JyxcclxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXHJcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXHJcbiAgfSxcclxuICBmb3JtUm93OiB7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogJzZweCcsIG1hcmdpbkJvdHRvbTogJzhweCcgfSxcclxuICBmb3JtSW5saW5lOiB7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzhweCcgfSxcclxuICAvLyBzZWxlY3QgXHU3NTI4XHU3Q0ZCXHU3RURGXHU1OTE2XHU4OUMyXHU2NUY2IFdpbmRvd3MgXHU2RDQ1XHU4MjcyXHU2QTIxXHU1RjBGXHU0RTBCXHU1RjNBXHU1MjM2XHU3NjdEXHU1RTk1XHVGRjBDXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU0RTBCXHU0RTBEXHU1M0VGXHU4QkZCXHUyMDE0XHUyMDE0XHU4MUVBXHU3RUQ4XHU1OTE2XHU4OUMyXHU4RDcwXHU0RTNCXHU5ODk4XHU1M0Q4XHU5MUNGXHUzMDAyXHJcbiAgc2VsZWN0OiB7XHJcbiAgICBhcHBlYXJhbmNlOiAnbm9uZScsIFdlYmtpdEFwcGVhcmFuY2U6ICdub25lJyxcclxuICAgIHBhZGRpbmc6ICc2cHggMjZweCA2cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTJweCcsXHJcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxyXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcclxuICAgIGJhY2tncm91bmRJbWFnZTogJ3VybChcImRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LDxzdmcgeG1sbnM9JTIyaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmclMjIgd2lkdGg9JTIyMTAlMjIgaGVpZ2h0PSUyMjYlMjI+PHBhdGggZD0lMjJNMSAxbDQgNCA0LTQlMjIgc3Ryb2tlPSUyMiUyMzg4OCUyMiBzdHJva2Utd2lkdGg9JTIyMS41JTIyIGZpbGw9JTIybm9uZSUyMi8+PC9zdmc+XCIpJyxcclxuICAgIGJhY2tncm91bmRSZXBlYXQ6ICduby1yZXBlYXQnLCBiYWNrZ3JvdW5kUG9zaXRpb246ICdyaWdodCA4cHggY2VudGVyJyxcclxuICAgIGN1cnNvcjogJ3BvaW50ZXInLCBib3hTaXppbmc6ICdib3JkZXItYm94JywgbWF4V2lkdGg6ICcxMDAlJyxcclxuICB9LFxyXG4gIGFjdGlvblJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9LFxyXG4gIHJlc3VsdDoge1xyXG4gICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS42LFxyXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXHJcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnMTBweCAxMnB4JywgbWF4SGVpZ2h0OiAnMzIwcHgnLCBvdmVyZmxvd1k6ICdhdXRvJyxcclxuICB9LFxyXG4gIGJhZGdlOiAoY29sb3I6IHN0cmluZyk6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4ge1xyXG4gICAgY29uc3QgcmdiID0gcGFyc2VDb2xvcihjb2xvcilcclxuICAgIGlmIChyZ2IgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHsgZGlzcGxheTogJ2lubGluZS1ibG9jaycsIHBhZGRpbmc6ICcxcHggOHB4JywgYm9yZGVyUmFkaXVzOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JywgYmFja2dyb3VuZDogYCR7Y29sb3J9MjJgLCBjb2xvciB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBbciwgZywgYl0gPSByZ2JcclxuICAgIC8vIFx1NUU5NVx1ODI3Mlx1N0VERlx1NEUwMCAxNiUgXHU4MjcyXHU4QzAzXHVGRjFCXHU2NTg3XHU1QjU3XHU4MjcyXHU0RTNCXHU5ODk4XHU4MUVBXHU5MDAyXHU1RTk0XHVGRjA4XHU2RDQ1XHU4MjcyXHU2REYxXHU1MzE2XHU1MjMwXHU3NjdEXHU1RTk1XHU1M0VGXHU4QkZCXHVGRjA5XHUzMDAyXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgcGFkZGluZzogJzFweCA4cHgnLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnLFxyXG4gICAgICBiYWNrZ3JvdW5kOiBgcmdiYSgke3J9LCAke2d9LCAke2J9LCAwLjE2KWAsXHJcbiAgICAgIGNvbG9yOiB0aGVtZUF3YXJlVGV4dChjb2xvciksXHJcbiAgICB9XHJcbiAgfSxcclxuICBzZWN0aW9uVGl0bGU6IHsgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEycHgnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH0sXHJcbiAgd2hhdDogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjcsIG1hcmdpbjogJzRweCAwIDhweCcgfSxcclxuICBsb2dpY1N0ZXA6IHsgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS44LCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcgfSxcclxuICByaXNrSXRlbTogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjcsIG1hcmdpbjogJzJweCAwJyB9LFxyXG4gIGNvbW1pdFJvdzogKGFjdGl2ZTogYm9vbGVhbik6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4gKHtcclxuICAgIHBhZGRpbmc6ICc4cHggMTBweCcsXHJcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxyXG4gICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICBib3JkZXI6IGFjdGl2ZSA/ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyA6ICcxcHggc29saWQgdHJhbnNwYXJlbnQnLFxyXG4gICAgYmFja2dyb3VuZDogYWN0aXZlID8gJ3JnYmEoMzcsOTksMjM1LDAuMDYpJyA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICBtYXJnaW5Cb3R0b206ICc0cHgnLFxyXG4gIH0pLFxyXG4gIGNvbW1pdFN1YmplY3Q6IHsgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwLCBsaW5lSGVpZ2h0OiAxLjUsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9LFxyXG4gIGNvbW1pdE1ldGE6IHsgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpblRvcDogJzJweCcsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JyB9LFxyXG4gIHBhdGNoOiB7XHJcbiAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4JywgbGluZUhlaWdodDogMS41LCB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnLFxyXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXHJcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnMTBweCcsIG1heEhlaWdodDogJzMyMHB4Jywgb3ZlcmZsb3dZOiAnYXV0bycsXHJcbiAgfSxcclxuICB0ZXh0YXJlYToge1xyXG4gICAgd2lkdGg6ICcxMDAlJywgcGFkZGluZzogJzhweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgZm9udFNpemU6ICcxMnB4JyxcclxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXHJcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsIHJlc2l6ZTogJ3ZlcnRpY2FsJywgbGluZUhlaWdodDogMS43LCBmb250RmFtaWx5OiAnaW5oZXJpdCcsXHJcbiAgfSxcclxuICBub3RlQ2FyZDoge1xyXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknLFxyXG4gICAgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzEycHggMTRweCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnLFxyXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXHJcbiAgfSxcclxuICBub3RlVGl0bGVSb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsIGdhcDogJzhweCcgfSxcclxuICBub3RlVGl0bGVUZXh0OiB7IGZvbnRTaXplOiAnMTNweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbGluZUhlaWdodDogMS41IH0sXHJcbiAgbm90ZUNvbnRlbnQ6IHtcclxuICAgIGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuODUsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLXdvcmQnLFxyXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLCBtYXJnaW5Ub3A6ICc2cHgnLFxyXG4gIH0sXHJcbiAgbm90ZUNsYW1wOiB7XHJcbiAgICBkaXNwbGF5OiAnLXdlYmtpdC1ib3gnLCBXZWJraXRMaW5lQ2xhbXA6IDYsIFdlYmtpdEJveE9yaWVudDogJ3ZlcnRpY2FsJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gIH0sXHJcbiAgbm90ZU1ldGE6IHtcclxuICAgIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc4cHgnLFxyXG4gICAgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsXHJcbiAgfSxcclxuICBsaW5rQnRuOiB7XHJcbiAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICcxMXB4JywgcGFkZGluZzogJzAnLFxyXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLFxyXG4gIH0sXHJcbiAgY2hpcDogKGFjdGl2ZTogYm9vbGVhbik6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4gKHtcclxuICAgIHBhZGRpbmc6ICcycHggMTBweCcsIGJvcmRlclJhZGl1czogJzk5OXB4JywgZm9udFNpemU6ICcxMXB4JywgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxyXG4gICAgLy8gXHU1NDBDIHRhYlx1RkYxQWFjdGl2ZSBcdTU4NkJcdTgyNzJcdTRFMDBcdTVGOEIgYnV0dG9uLWluZm8tZmlsbFx1RkYwOFx1NEUyNFx1NEUzQlx1OTg5OFx1OTBGRFx1ODRERFx1RkYwOVx1RkYwQ1x1Nzk4MVx1NzUyOCBicmFuZC1wcmltYXJ5XHUzMDAyXHJcbiAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyAndmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpJyA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICBjb2xvcjogYWN0aXZlID8gJyNmZmYnIDogJ2luaGVyaXQnLFxyXG4gIH0pLFxyXG59XHJcblxyXG4vKiogXHU5OENFXHU5NjY5XHU3QjQ5XHU3RUE3IFx1MjE5MiBcdTVGQkRcdTdBRTBcdTk4OUNcdTgyNzJcdTMwMDIgKi9cclxuY29uc3QgUklTS19DT0xPUjogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgbG93OiAnIzRlYzliMCcsIG1lZGl1bTogJyNkY2RjYWEnLCBoaWdoOiAnI2NlOTE3OCcsIGNyaXRpY2FsOiAnI2YxNGM0YycgfVxyXG5cclxuLyoqXHJcbiAqIFx1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNCBTVkcgXHU2RDQxXHU3QTBCXHU1NkZFXHVGRjFBXHU0RTA5XHU1MjE3XHU1MjA2XHU1QzQyXHVGRjA4XHU1M0Q4XHU2NkY0IFx1MjE5MiBcdTk1RjRcdTYzQTVcdTVGMTVcdTc1MjhcdTk0RkUgXHUyMTkyIFx1NkY1Q1x1NTcyOFx1RkYwOVx1RkYwQ1xyXG4gKiBcdTRGOURcdTYzNkUgL2ltcGFjdC1zY29wZSBcdThGRDRcdTU2REVcdTc2ODQgbGV2ZWxzXHVGRjA4XHU1NDJCXHU0RjIwXHU2NEFEXHU5NEZFIHJlYXNvblx1RkYwOVx1N0VEOFx1NTIzNlx1OEZERVx1N0VCRlx1MzAwMlxyXG4gKiBcdTUxNjhcdTVCQkRcdTc1M0JcdTVFMDNcdUZGMDh2aWV3Qm94IDEwMDBcdUZGMDlcdUZGMENcdTgyODJcdTcwQjlcdTVFMjZcdTc2RUVcdTVGNTVcdTYzRDBcdTc5M0FcdUZGMENcdTZERjFcdTVFQTZcdThEOEFcdTZERjFcdTk4OUNcdTgyNzJcdThEOEFcdTZENDVcdTMwMDJcclxuICovXHJcbmZ1bmN0aW9uIEltcGFjdEdyYXBoKHByb3BzOiB7IGRhdGE6IEltcGFjdFNjb3BlUGF5bG9hZDsgdDogKGtleTogc3RyaW5nKSA9PiBzdHJpbmcgfSkge1xyXG4gIGNvbnN0IHsgZGF0YSB9ID0gcHJvcHNcclxuICBjb25zdCBpbmRpcmVjdCA9IGRhdGEubGV2ZWxzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5sZXZlbCA9PT0gJ2luZGlyZWN0JylcclxuICBjb25zdCBwb3RlbnRpYWwgPSBkYXRhLmxldmVscy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwgPT09ICdwb3RlbnRpYWwnKVxyXG4gIGNvbnN0IGNvbDAgPSBkYXRhLmNoYW5nZWRGaWxlcy5zbGljZSgwLCA3KVxyXG4gIGNvbnN0IGNvbDEgPSBBcnJheS5mcm9tKG5ldyBTZXQoaW5kaXJlY3QubWFwKChpdGVtKSA9PiBpdGVtLnBhdGgpKSkuc2xpY2UoMCwgOSlcclxuICBjb25zdCBjb2wyID0gQXJyYXkuZnJvbShuZXcgU2V0KHBvdGVudGlhbC5tYXAoKGl0ZW0pID0+IGl0ZW0ucGF0aCkpKS5maWx0ZXIoKHApID0+ICFjb2wxLmluY2x1ZGVzKHApKS5zbGljZSgwLCA4KVxyXG4gIGNvbnN0IG5vZGVIID0gMzBcclxuICBjb25zdCBnYXAgPSAxMFxyXG4gIGNvbnN0IGNvbFggPSBbMzAsIDM4MCwgNzIwXVxyXG4gIGNvbnN0IGNvbFcgPSAyODBcclxuICBjb25zdCByb3dzID0gTWF0aC5tYXgoY29sMC5sZW5ndGgsIGNvbDEubGVuZ3RoLCBjb2wyLmxlbmd0aCwgMSlcclxuICBjb25zdCBoZWlnaHQgPSByb3dzICogKG5vZGVIICsgZ2FwKSArIDYwXHJcblxyXG4gIGNvbnN0IGRlcHRoT2YgPSAocGF0aDogc3RyaW5nKTogbnVtYmVyID0+IHtcclxuICAgIGNvbnN0IGl0ZW0gPSBpbmRpcmVjdC5maW5kKChlbnRyeSkgPT4gZW50cnkucGF0aCA9PT0gcGF0aCkgPz8gcG90ZW50aWFsLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5wYXRoID09PSBwYXRoKVxyXG4gICAgcmV0dXJuIGl0ZW0/LmRlcHRoID8/IDBcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlbmRlckNvbCA9IChjb2w6IG51bWJlciwgaXRlbXM6IHN0cmluZ1tdLCBjb2xvcjogc3RyaW5nKTogUmVhY3QuUmVhY3ROb2RlW10gPT4gaXRlbXMubWFwKChwYXRoLCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3QgeSA9IDQ0ICsgaW5kZXggKiAobm9kZUggKyBnYXApXHJcbiAgICBjb25zdCBkaXIgPSBwYXRoLmluY2x1ZGVzKCcvJykgPyBwYXRoLnNsaWNlKDAsIHBhdGgubGFzdEluZGV4T2YoJy8nKSkgOiAnJ1xyXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2cnLCB7IGtleTogYCR7Y29sfS0ke3BhdGh9YCB9LFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdyZWN0JywgeyB4OiBjb2xYW2NvbF0sIHksIHdpZHRoOiBjb2xXLCBoZWlnaHQ6IG5vZGVILCByeDogNiwgZmlsbDogY29sb3IsIHN0cm9rZTogJ3JnYmEoMCwwLDAsMC4zKScsIHN0cm9rZVdpZHRoOiAxIH0pLFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyB4OiBjb2xYW2NvbF0gKyAxMCwgeTogeSArIDE0LCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgZmlsbDogJyNmZmZmZmYnIH0sXHJcbiAgICAgICAgKHBhdGguc3BsaXQoJy8nKS5wb3AoKSA/PyBwYXRoKS5zbGljZSgwLCAzMCkpLFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyB4OiBjb2xYW2NvbF0gKyAxMCwgeTogeSArIDI2LCBmb250U2l6ZTogMTAsIGZpbGw6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpJyB9LFxyXG4gICAgICAgIGRpci5zbGljZSgwLCA0MCkpLFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0aXRsZScsIG51bGwsIHBhdGgpLFxyXG4gICAgKVxyXG4gIH0pXHJcblxyXG4gIGNvbnN0IGNoYWluU3RhcnQgPSAocmVhc29uOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gICAgY29uc3QgbWF0Y2ggPSByZWFzb24ubWF0Y2goL3BhdGg6ICguKykkLylcclxuICAgIGlmIChtYXRjaCA9PT0gbnVsbCkgcmV0dXJuIGRhdGEuY2hhbmdlZEZpbGVzWzBdID8/ICcnXHJcbiAgICByZXR1cm4gbWF0Y2hbMV0hLnNwbGl0KCcgLT4gJylbMF0gPz8gZGF0YS5jaGFuZ2VkRmlsZXNbMF0gPz8gJydcclxuICB9XHJcbiAgY29uc3QgaW5kZXhJbiA9IChpdGVtczogc3RyaW5nW10sIHBhdGg6IHN0cmluZyk6IG51bWJlciA9PiBpdGVtcy5pbmRleE9mKHBhdGgpXHJcbiAgY29uc3QgY29sT2YgPSAocGF0aDogc3RyaW5nKTogbnVtYmVyID0+IHtcclxuICAgIGlmIChjb2wwLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMFxyXG4gICAgaWYgKGNvbDEuaW5jbHVkZXMocGF0aCkpIHJldHVybiAxXHJcbiAgICBpZiAoY29sMi5pbmNsdWRlcyhwYXRoKSkgcmV0dXJuIDJcclxuICAgIHJldHVybiAtMVxyXG4gIH1cclxuXHJcbiAgY29uc3QgZWRnZXM6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cclxuICBjb25zdCBwdXNoRWRnZSA9IChmcm9tUGF0aDogc3RyaW5nLCB0b1BhdGg6IHN0cmluZywgY29sb3I6IHN0cmluZywga2V5OiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGZyb21Db2wgPSBjb2xPZihmcm9tUGF0aClcclxuICAgIGNvbnN0IHRvQ29sID0gY29sT2YodG9QYXRoKVxyXG4gICAgaWYgKGZyb21Db2wgPT09IC0xIHx8IHRvQ29sID09PSAtMSB8fCB0b0NvbCA8PSBmcm9tQ29sKSByZXR1cm5cclxuICAgIGNvbnN0IHgxID0gY29sWFtmcm9tQ29sXSArIGNvbFdcclxuICAgIGNvbnN0IHkxID0gNDQgKyBpbmRleEluKFtjb2wwLCBjb2wxLCBjb2wyXVtmcm9tQ29sXSA/PyBbXSwgZnJvbVBhdGgpICogKG5vZGVIICsgZ2FwKSArIG5vZGVIIC8gMlxyXG4gICAgY29uc3QgeDIgPSBjb2xYW3RvQ29sXVxyXG4gICAgY29uc3QgeTIgPSA0NCArIGluZGV4SW4oW2NvbDAsIGNvbDEsIGNvbDJdW3RvQ29sXSA/PyBbXSwgdG9QYXRoKSAqIChub2RlSCArIGdhcCkgKyBub2RlSCAvIDJcclxuICAgIGVkZ2VzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudCgncGF0aCcsIHtcclxuICAgICAga2V5LCBkOiBgTSAke3gxfSAke3kxfSBDICR7eDEgKyAzMH0gJHt5MX0sICR7eDIgLSAzMH0gJHt5Mn0sICR7eDJ9ICR7eTJ9YCxcclxuICAgICAgZmlsbDogJ25vbmUnLCBzdHJva2U6IGNvbG9yLCBzdHJva2VXaWR0aDogMS42LCBvcGFjaXR5OiAwLjYsXHJcbiAgICB9KSlcclxuICB9XHJcbiAgZm9yIChjb25zdCBpdGVtIG9mIGluZGlyZWN0LnNsaWNlKDAsIDIwKSkgcHVzaEVkZ2UoY2hhaW5TdGFydChpdGVtLnJlYXNvbiksIGl0ZW0ucGF0aCwgdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSwgYGVpLSR7aXRlbS5wYXRofWApXHJcbiAgZm9yIChjb25zdCBpdGVtIG9mIHBvdGVudGlhbC5zbGljZSgwLCAxNikpIHB1c2hFZGdlKGNoYWluU3RhcnQoaXRlbS5yZWFzb24pLCBpdGVtLnBhdGgsIHRoZW1lQXdhcmVUZXh0KCcjNTc2MDZhJyksIGBlcC0ke2l0ZW0ucGF0aH1gKVxyXG5cclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCxcclxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3N2ZycsIHsgd2lkdGg6ICcxMDAlJywgdmlld0JveDogYDAgMCAxMDI0ICR7aGVpZ2h0fWAsIHN0eWxlOiB7IG1heEhlaWdodDogNDgwIH0gfSxcclxuICAgICAgW1snXHU1M0Q4XHU2NkY0XHU2NTg3XHU0RUY2JywgMF0sIFsnXHU5NUY0XHU2M0E1XHU1RjcxXHU1NENEXHVGRjA4XHU4QzAxXHU1RjE1XHU3NTI4XHU0RTg2XHU1QjgzXHVGRjA5JywgMV0sIFsnXHU2RjVDXHU1NzI4XHU1RjcxXHU1NENEXHVGRjA4XHU0RThDXHU3RUE3XHU0RjIwXHU2NEFEXHVGRjA5JywgMl1dLm1hcCgoW25hbWUsIGNvbF0pID0+XHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGV4dCcsIHsga2V5OiBTdHJpbmcoY29sKSwgeDogY29sWFtjb2wgYXMgbnVtYmVyXSwgeTogMjQsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNzAwLCBmaWxsOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9LCBuYW1lIGFzIHN0cmluZykpLFxyXG4gICAgICByZW5kZXJDb2woMCwgY29sMCwgJyMyNTYzZWInKSxcclxuICAgICAgcmVuZGVyQ29sKDEsIGNvbDEsICcjZDk3NzA2JyksXHJcbiAgICAgIHJlbmRlckNvbCgyLCBjb2wyLCAnIzU3NjA2YScpLFxyXG4gICAgICBlZGdlcyxcclxuICAgICksXHJcbiAgKVxyXG59XHJcblxyXG5jb25zdCBESUZGX0tFWVdPUkRTID0gL1xcYihwdWJsaWN8cHJpdmF0ZXxwcm90ZWN0ZWR8aW50ZXJuYWx8c3RhdGljfHZvaWR8Y2xhc3N8c3RydWN0fGludGVyZmFjZXxlbnVtfG5ld3xyZXR1cm58aWZ8ZWxzZXxmb3J8Zm9yZWFjaHx3aGlsZXxzd2l0Y2h8Y2FzZXxicmVha3xjb250aW51ZXx0cnl8Y2F0Y2h8ZmluYWxseXx0aHJvd3x1c2luZ3xuYW1lc3BhY2V8aW1wb3J0fGV4cG9ydHxmcm9tfGNvbnN0fGxldHx2YXJ8YXN5bmN8YXdhaXR8ZnVuY3Rpb258dGhpc3xiYXNlfHN1cGVyfG51bGx8dHJ1ZXxmYWxzZXxvdmVycmlkZXx2aXJ0dWFsfGFic3RyYWN0fHNlYWxlZHxyZWFkb25seXxwYXJhbXN8b3V0fHJlZnx5aWVsZHx0eXBlb2Z8aW5zdGFuY2VvZnxpbnxvZnxkZWZhdWx0fHN0cmluZ3xpbnR8bG9uZ3xkb3VibGV8ZmxvYXR8Ym9vbHxjaGFyfGRlY2ltYWx8b2JqZWN0fHJlY29yZHxwYXJ0aWFsfGdldHxzZXR8cmVxdWlyZXxtb2R1bGV8dHlwZXxpbXBsZW1lbnRzfGV4dGVuZHMpXFxiL2dcclxuXHJcbi8qKiBcdTUzNTVcdTg4NENcdTRFRTNcdTc4MDFcdTlBRDhcdTRFQUVcdUZGMUFcdTZDRThcdTkxQ0EgPiBcdTVCNTdcdTdCMjZcdTRFMzIgPiBcdTUxNzNcdTk1MkVcdTVCNTcvXHU2NTcwXHU1QjU3IFx1NEUwOVx1NUM0Mlx1Nzc0MFx1ODI3Mlx1RkYwOFx1OEY3Qlx1OTFDRlx1NkI2M1x1NTIxOVx1RkYwQ1x1NTkxRlx1NjgzOFx1NjdFNVx1NzUyOFx1RkYwOVx1MzAwMiAqL1xyXG5mdW5jdGlvbiBoaWdobGlnaHRDb2RlTGluZShsaW5lOiBzdHJpbmcsIGtleVByZWZpeDogc3RyaW5nKTogUmVhY3QuUmVhY3ROb2RlW10ge1xyXG4gIGNvbnN0IHRyaW1tZWQgPSBsaW5lLnRyaW1TdGFydCgpXHJcbiAgaWYgKHRyaW1tZWQuc3RhcnRzV2l0aCgnLy8nKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJy8vLycpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnKicpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnLyonKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJyMnKSkge1xyXG4gICAgcmV0dXJuIFtSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBrZXk6IGAke2tleVByZWZpeH0tY2AsIHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzZhOTk1NScpIH0gfSwgbGluZSldXHJcbiAgfVxyXG4gIGNvbnN0IHBhcnRzID0gbGluZS5zcGxpdCgvKFwiKD86W15cIlxcXFxdfFxcXFwuKSpcInwnKD86W14nXFxcXF18XFxcXC4pKid8YCg/OlteYFxcXFxdfFxcXFwuKSpgKS9nKVxyXG4gIHJldHVybiBwYXJ0cy5tYXAoKHBhcnQsIGkpID0+IHtcclxuICAgIGlmIChpICUgMiA9PT0gMSkgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1zJHtpfWAsIHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NlOTE3OCcpIH0gfSwgcGFydClcclxuICAgIGNvbnN0IHN1YjogUmVhY3QuUmVhY3ROb2RlW10gPSBbXVxyXG4gICAgbGV0IGxhc3QgPSAwXHJcbiAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIHBhcnQubWF0Y2hBbGwoRElGRl9LRVlXT1JEUykpIHtcclxuICAgICAgaWYgKG1hdGNoLmluZGV4ISA+IGxhc3QpIHN1Yi5wdXNoKHBhcnQuc2xpY2UobGFzdCwgbWF0Y2guaW5kZXgpKVxyXG4gICAgICBzdWIucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBrZXk6IGAke2tleVByZWZpeH0tayR7aX0tJHttYXRjaC5pbmRleH1gLCBzdHlsZTogeyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM1NjljZDYnKSB9IH0sIG1hdGNoWzBdKSlcclxuICAgICAgbGFzdCA9IG1hdGNoLmluZGV4ISArIG1hdGNoWzBdLmxlbmd0aFxyXG4gICAgfVxyXG4gICAgaWYgKGxhc3QgPCBwYXJ0Lmxlbmd0aCkgc3ViLnB1c2gocGFydC5zbGljZShsYXN0KSlcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCB7IGtleTogYCR7a2V5UHJlZml4fS1wJHtpfWAgfSwgc3ViKVxyXG4gIH0pXHJcbn1cclxuXHJcbi8qKiBcdTlBRDhcdTRFQUVcdTVERUVcdTVGMDJcdTg5QzZcdTU2RkVcdUZGMUFcdTg5RTNcdTY3OTAgdW5pZmllZCBkaWZmXHVGRjBDXHU2MzA5IFx1NTg5RS9cdTUyMjAvXHU1NzU3XHU1OTM0L1x1NEUwQVx1NEUwQlx1NjU4NyBcdTc3NDBcdTgyNzJcdTMwMDIgKi9cclxuZnVuY3Rpb24gRGlmZlZpZXcocHJvcHM6IHsgcGF0Y2g6IHN0cmluZyB9KSB7XHJcbiAgY29uc3QgbGluZXMgPSBwcm9wcy5wYXRjaC5zcGxpdCgnXFxuJykuZmlsdGVyKChsaW5lLCBpKSA9PiAhKGxpbmUgPT09ICcnICYmIGkgPT09IHByb3BzLnBhdGNoLnNwbGl0KCdcXG4nKS5sZW5ndGggLSAxKSlcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgc3R5bGU6IHtcclxuICAgICAgZm9udEZhbWlseTogJ0NvbnNvbGFzLCBtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCBsaW5lSGVpZ2h0OiAxLjU1LFxyXG4gICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcclxuICAgICAgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAwJywgbWF4SGVpZ2h0OiA0MjAsIG92ZXJmbG93WTogJ2F1dG8nLCBtYXJnaW5Ub3A6ICc2cHgnLFxyXG4gICAgfSxcclxuICB9LCBsaW5lcy5tYXAoKGxpbmUsIGkpID0+IHtcclxuICAgIGNvbnN0IGtpbmQgPSBsaW5lLnN0YXJ0c1dpdGgoJysrKycpIHx8IGxpbmUuc3RhcnRzV2l0aCgnLS0tJykgPyAnbWV0YSdcclxuICAgICAgOiBsaW5lLnN0YXJ0c1dpdGgoJ0BAJykgPyAnaHVuaydcclxuICAgICAgICA6IGxpbmUuc3RhcnRzV2l0aCgnKycpID8gJ2FkZCdcclxuICAgICAgICAgIDogbGluZS5zdGFydHNXaXRoKCctJykgPyAnZGVsJyA6ICdjdHgnXHJcbiAgICBjb25zdCBiZyA9IGtpbmQgPT09ICdhZGQnID8gJ3JnYmEoNDYsMTYwLDY3LDAuMTQpJyA6IGtpbmQgPT09ICdkZWwnID8gJ3JnYmEoMjQ4LDgxLDczLDAuMTMpJyA6IGtpbmQgPT09ICdodW5rJyA/ICdyZ2JhKDU2LDEzOSwyNTMsMC4xKScgOiAndHJhbnNwYXJlbnQnXHJcbiAgICBjb25zdCBjb250ZW50ID0ga2luZCA9PT0gJ21ldGEnIHx8IGtpbmQgPT09ICdodW5rJ1xyXG4gICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzA5NjlkYScpLCBmb250V2VpZ2h0OiA2MDAgfSB9LCBsaW5lKVxyXG4gICAgICA6IGtpbmQgPT09ICdhZGQnIHx8IGtpbmQgPT09ICdkZWwnXHJcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBzdHlsZTogeyBjb2xvcjogdGhlbWVBd2FyZVRleHQoa2luZCA9PT0gJ2FkZCcgPyAnIzFhN2YzNycgOiAnI2NmMjIyZScpLCBmb250V2VpZ2h0OiA2MDAgfSB9LCBsaW5lWzBdKVxyXG4gICAgICAgIDogbnVsbFxyXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsga2V5OiBpLCBzdHlsZTogeyBwYWRkaW5nOiAnMCAxMHB4JywgYmFja2dyb3VuZDogYmcsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfSB9LFxyXG4gICAgICBjb250ZW50LFxyXG4gICAgICBraW5kID09PSAnYWRkJyB8fCBraW5kID09PSAnZGVsJyA/IGhpZ2hsaWdodENvZGVMaW5lKGxpbmUuc2xpY2UoMSksIGBsJHtpfWApIDogaGlnaGxpZ2h0Q29kZUxpbmUobGluZSwgYGwke2l9YCksXHJcbiAgICApXHJcbiAgfSkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdFRpbWUodmFsdWU6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gJ1x1MjAxNCdcclxuICByZXR1cm4gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlU3RyaW5nKClcclxufVxyXG5cclxuLyoqIFx1NEU4Q1x1NkIyMVx1Nzg2RVx1OEJBNFx1NUYzOVx1N0E5N1x1RkYxQVx1OTA2RVx1N0Y2OSArIFx1NUM0NVx1NEUyRFx1NTM2MVx1NzI0N1x1RkYwQ1x1NTM3MVx1OTY2OVx1NjRDRFx1NEY1Q1x1RkYwOFx1NTIyMFx1OTY2NFx1N0IxNFx1OEJCMC9cdTUzRDhcdTY2RjQvXHU3RUE2XHU2NzVGXHVGRjA5XHU1MTcxXHU3NTI4XHVGRjFCYWx0IFx1NjNEMFx1NEY5Qlx1N0IyQ1x1NEU4Q1x1Nzg2RVx1OEJBNFx1NTJBOFx1NEY1Q1x1RkYwOFx1NTk4MlwiXHU1MTQ4XHU1MUZBXHU2NUI5XHU2ODQ4XCJcdUZGMDlcdTMwMDIgKi9cclxuZnVuY3Rpb24gQ29uZmlybURpYWxvZyhwcm9wczogeyB0aXRsZTogc3RyaW5nOyBtZXNzYWdlOiBzdHJpbmc7IGRhbmdlcj86IGJvb2xlYW47IGNvbmZpcm1MYWJlbD86IHN0cmluZzsgYWx0PzogeyBsYWJlbDogc3RyaW5nOyBvbkFsdDogKCkgPT4gdm9pZCB9OyBvbkNhbmNlbDogKCkgPT4gdm9pZDsgb25Db25maXJtOiAoKSA9PiB2b2lkIH0pIHtcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcclxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgJ2RhdGEtdGVzdGlkJzogJ3BjLWNvbmZpcm0tb3ZlcmxheScsXHJcbiAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCB6SW5kZXg6IDk5OSxcclxuICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgxNSwyMyw0MiwwLjQ1KScsIGJhY2tkcm9wRmlsdGVyOiAnYmx1cigycHgpJyxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgYW5pbWF0aW9uOiAncGNGYWRlSW4gMC4xNXMgZWFzZS1vdXQnLFxyXG4gICAgICB9LFxyXG4gICAgICBvbkNsaWNrOiBwcm9wcy5vbkNhbmNlbCxcclxuICAgIH0sXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAnZGF0YS10ZXN0aWQnOiAncGMtY29uZmlybS1jYXJkJyxcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgd2lkdGg6IDQwMCwgbWF4V2lkdGg6ICdjYWxjKDEwMHZ3IC0gNDhweCknLFxyXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JywgYm94U2hhZG93OiAnMCAyMHB4IDUwcHggcmdiYSgwLDAsMCwwLjI1KScsXHJcbiAgICAgICAgICBwYWRkaW5nOiAnMjBweCAyMnB4IDE2cHgnLFxyXG4gICAgICAgICAgb25DbGljazogKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKSB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JywgZ2FwOiAnMTBweCcgfSB9LFxyXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgIHdpZHRoOiAzNCwgaGVpZ2h0OiAzNCwgYm9yZGVyUmFkaXVzOiAnNTAlJywgZmxleFNocmluazogMCxcclxuICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxN3B4JyxcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBwcm9wcy5kYW5nZXIgPyAncmdiYSgyNDQsNjMsOTQsMC4xMiknIDogJ3JnYmEoMzcsOTksMjM1LDAuMSknLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5kYW5nZXIgPyB0aGVtZUF3YXJlVGV4dCgnI2UxMWQ0OCcpIDogdGhlbWVBd2FyZVRleHQoJyMyNTYzZWInKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sIHByb3BzLmRhbmdlciA/ICchJyA6ICc/JyksXHJcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRTaXplOiAnMTRweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnNnB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknIH0gfSwgcHJvcHMudGl0bGUpLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfSB9LCBwcm9wcy5tZXNzYWdlKSxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgKSxcclxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsIGdhcDogJzEwcHgnLCBtYXJnaW5Ub3A6ICcxOHB4JywgZmxleFdyYXA6ICd3cmFwJyB9IH0sXHJcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcbiAgICAgICAgICAgIHN0eWxlOiB7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICc3cHggMThweCcsIGJvcmRlclJhZGl1czogJzhweCcgfSxcclxuICAgICAgICAgICAgb25DbGljazogcHJvcHMub25DYW5jZWwsXHJcbiAgICAgICAgICB9LCAnXHU1M0Q2XHU2RDg4JyksXHJcbiAgICAgICAgICBwcm9wcy5hbHQgIT09IHVuZGVmaW5lZCAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcbiAgICAgICAgICAgIHN0eWxlOiB7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICc3cHggMThweCcsIGJvcmRlclJhZGl1czogJzhweCcsIGZvbnRXZWlnaHQ6IDYwMCB9LFxyXG4gICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5hbHQub25BbHQsXHJcbiAgICAgICAgICB9LCBwcm9wcy5hbHQubGFiZWwpLFxyXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICAnZGF0YS10ZXN0aWQnOiAncGMtY29uZmlybS1vaycsXHJcbiAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgcGFkZGluZzogJzdweCAxOHB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA1MDAsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogcHJvcHMuZGFuZ2VyID8gJyNlMTFkNDgnIDogJ3ZhcigtLWRzdy1hbGlhcy1idXR0b24taW5mby1maWxsLCAjMjU2M2ViKScsIGNvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ29uZmlybSxcclxuICAgICAgICAgIH0sIHByb3BzLmNvbmZpcm1MYWJlbCA/PyAnXHU3ODZFXHU4QkE0XHU1MjIwXHU5NjY0JyksXHJcbiAgICAgICAgKSxcclxuICAgICAgKSxcclxuICAgICksXHJcbiAgKVxyXG59XHJcblxyXG4vKiogXHU5QUE4XHU2N0I2XHU1QzBGXHU1MzYxXHU3MjQ3XHUzMDAyICovXHJcbmZ1bmN0aW9uIENhcmQocHJvcHM6IHsgdGl0bGU/OiBSZWFjdC5SZWFjdE5vZGU7IGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlIH0pIHtcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLmNhcmQgfSxcclxuICAgIHByb3BzLnRpdGxlID09PSB1bmRlZmluZWQgPyBudWxsIDogUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLnNlY3Rpb25UaXRsZSB9LCBwcm9wcy50aXRsZSksXHJcbiAgICBwcm9wcy5jaGlsZHJlbilcclxufVxyXG5cclxuLyoqXHJcbiAqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NEUzQlx1N0VDNFx1NEVGNlx1RkYxQVx1NTZEQlx1OTg3NVx1N0I3RVx1RkYwOFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1NEUzQVx1OUVEOFx1OEJBNFx1RkYwOSsgXHU4RjZFXHU4QkUyXHU1QkJGXHU0RTNCIEFQSSArIFx1NjMwOVx1OTRBRVx1NTMxNlx1NjRDRFx1NEY1Q1x1MzAwMlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIFdvcmtzcGFjZUZyYW1lKHByb3BzOiBXb3Jrc3BhY2VGcmFtZVByb3BzKSB7XHJcbiAgY29uc3QgdCA9IHByb3BzLnQgPz8gZmFsbGJhY2tUXHJcbiAgY29uc3QgYWN0aXZlUmVmID0gdXNlUmVmKHRydWUpXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGFjdGl2ZVJlZi5jdXJyZW50ID0gdHJ1ZVxyXG4gICAgcmV0dXJuICgpID0+IHsgYWN0aXZlUmVmLmN1cnJlbnQgPSBmYWxzZSB9XHJcbiAgfSwgW10pXHJcbiAgY29uc3QgW3RhYiwgc2V0VGFiXSA9IHVzZVN0YXRlPFRhYktleT4oJ2NvbW1pdHMnKVxyXG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGU8V29ya3NwYWNlU3RhdGUgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtsb2FkRXJyb3IsIHNldExvYWRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtib290c3RyYXBwaW5nLCBzZXRCb290c3RyYXBwaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW2FjdGlvblJlc3VsdCwgc2V0QWN0aW9uUmVzdWx0XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW2NoYW5nZVRpdGxlLCBzZXRDaGFuZ2VUaXRsZV0gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbY2hhbmdlRGVzYywgc2V0Q2hhbmdlRGVzY10gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbbWVtb3J5VGl0bGUsIHNldE1lbW9yeVRpdGxlXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFttZW1vcnlDb250ZW50LCBzZXRNZW1vcnlDb250ZW50XSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtjb25maXJtZWRUZXh0LCBzZXRDb25maXJtZWRUZXh0XSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtjb25maXJtZWRQYXRocywgc2V0Q29uZmlybWVkUGF0aHNdID0gdXNlU3RhdGUoJycpXHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTcyQjZcdTYwMDEgXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW2NvbW1pdHNEYXRhLCBzZXRDb21taXRzRGF0YV0gPSB1c2VTdGF0ZTxDb21taXRzUGF5bG9hZCB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW2NvbW1pdHNFcnJvciwgc2V0Q29tbWl0c0Vycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW3BpY2tlck9wZW4sIHNldFBpY2tlck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgY29uc3QgW3BpY2tlckZpbHRlciwgc2V0UGlja2VyRmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtzZWxlY3RlZFRhcmdldHMsIHNldFNlbGVjdGVkVGFyZ2V0c10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pXHJcbiAgY29uc3QgW2RldGFpbHMsIHNldERldGFpbHNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgQ29tbWl0RGV0YWlsUGF5bG9hZD4+KHt9KVxyXG4gIC8qKiBcdTg5RTNcdThCRkJcdTRFRkJcdTUyQTFcdTcyQjZcdTYwMDFcdUZGMUFxdWV1ZWQ9XHU2MzkyXHU5NjFGXHU3QjQ5XHU0RTMyXHU4ODRDXHU5NjFGXHU1MjE3XHVGRjBDcnVubmluZz1cdTZCNjNcdTU3MjhcdThCRjdcdTZDNDJcdUZGMDhcdTU5MUFcdTkwMDkvXHU2NTc0XHU4RjZFXHU2NUY2XHU4MUVBXHU1MkE4XHU5MDEwXHU0RTJBXHU1MjA2XHU2NzkwXHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgW2RldGFpbFN0YXR1cywgc2V0RGV0YWlsU3RhdHVzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsICdxdWV1ZWQnIHwgJ3J1bm5pbmcnPj4oe30pXHJcbiAgY29uc3QgZGV0YWlsUXVldWVkQ291bnQgPSBPYmplY3QudmFsdWVzKGRldGFpbFN0YXR1cykuZmlsdGVyKChzdGF0dXMpID0+IHN0YXR1cyA9PT0gJ3F1ZXVlZCcpLmxlbmd0aFxyXG4gIGNvbnN0IGRldGFpbFJ1bm5pbmdDb3VudCA9IE9iamVjdC52YWx1ZXMoZGV0YWlsU3RhdHVzKS5maWx0ZXIoKHN0YXR1cykgPT4gc3RhdHVzID09PSAncnVubmluZycpLmxlbmd0aFxyXG4gIGNvbnN0IFtpbXBhY3QsIHNldEltcGFjdF0gPSB1c2VTdGF0ZTxJbXBhY3RTY29wZVBheWxvYWQgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtpbXBhY3RMb2FkaW5nLCBzZXRJbXBhY3RMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IFtyZXZpZXdzLCBzZXRSZXZpZXdzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIFJldmlld1BheWxvYWQ+Pih7fSlcclxuICBjb25zdCBbcmV2aWV3TG9hZGluZywgc2V0UmV2aWV3TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcclxuICBjb25zdCBbZmlsZURpZmZzLCBzZXRGaWxlRGlmZnNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oe30pXHJcbiAgY29uc3QgW2NvbmZpcm1EaWFsb2csIHNldENvbmZpcm1EaWFsb2ddID0gdXNlU3RhdGU8eyB0aXRsZTogc3RyaW5nOyBtZXNzYWdlOiBzdHJpbmc7IGRhbmdlcj86IGJvb2xlYW47IGNvbmZpcm1MYWJlbD86IHN0cmluZzsgYWx0PzogeyBsYWJlbDogc3RyaW5nOyBvbkFsdDogKCkgPT4gdm9pZCB9OyBvbkNvbmZpcm06ICgpID0+IHZvaWQgfSB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW25vdGVzLCBzZXROb3Rlc10gPSB1c2VTdGF0ZTxOb3RlRW50cnlbXT4oW10pXHJcbiAgY29uc3QgW25vdGVUaXRsZSwgc2V0Tm90ZVRpdGxlXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtub3RlQ29udGVudCwgc2V0Tm90ZUNvbnRlbnRdID0gdXNlU3RhdGUoJycpXHJcbiAgY29uc3QgW25vdGVUYWdzLCBzZXROb3RlVGFnc10gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbZWRpdGluZ05vdGUsIHNldEVkaXRpbmdOb3RlXSA9IHVzZVN0YXRlPHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29udGVudDogc3RyaW5nOyB0YWdzOiBzdHJpbmcgfSB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW25vdGVTZWFyY2gsIHNldE5vdGVTZWFyY2hdID0gdXNlU3RhdGUoJycpXHJcbiAgY29uc3QgW25vdGVFeHBhbmRlZCwgc2V0Tm90ZUV4cGFuZGVkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+Pih7fSlcclxuICBjb25zdCBbaXNzdWVzRGF0YSwgc2V0SXNzdWVzRGF0YV0gPSB1c2VTdGF0ZTxJc3N1ZUVudHJ5W10gfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtpc3N1ZVNldmVyaXR5RmlsdGVyLCBzZXRJc3N1ZVNldmVyaXR5RmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtpc3N1ZVN0YXR1c0ZpbHRlciwgc2V0SXNzdWVTdGF0dXNGaWx0ZXJdID0gdXNlU3RhdGUoJycpXHJcbiAgY29uc3QgW2lzc3VlRXhwYW5kZWQsIHNldElzc3VlRXhwYW5kZWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KVxyXG4gIGNvbnN0IFtmaXhFeHBhbmRlZCwgc2V0Rml4RXhwYW5kZWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KVxyXG4gIGNvbnN0IFt2ZXJpZnlpbmdUYXJnZXQsIHNldFZlcmlmeWluZ1RhcmdldF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtpc3N1ZUNoZWNrZWQsIHNldElzc3VlQ2hlY2tlZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oe30pXHJcbiAgY29uc3QgW2JhdGNoVmVyaWZ5U3RhdGUsIHNldEJhdGNoVmVyaWZ5U3RhdGVdID0gdXNlU3RhdGU8eyBkb25lOiBudW1iZXI7IHRvdGFsOiBudW1iZXIgfSB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW3RyaWFnZVN0YXRlLCBzZXRUcmlhZ2VTdGF0ZV0gPSB1c2VTdGF0ZTx7IHByb2Nlc3NlZDogbnVtYmVyOyByZW1haW5pbmc6IG51bWJlciB9IHwgbnVsbD4obnVsbClcclxuICBjb25zdCBiYXRjaFN0b3BSZWYgPSB1c2VSZWYoZmFsc2UpXHJcbiAgY29uc3QgW2ZpeFRhc2tzLCBzZXRGaXhUYXNrc10gPSB1c2VTdGF0ZTxGaXhUYXNrRW50cnlbXT4oW10pXHJcbiAgY29uc3QgW2ZpeENvbmN1cnJlbmN5LCBzZXRGaXhDb25jdXJyZW5jeV0gPSB1c2VTdGF0ZSgnMycpXHJcbiAgY29uc3QgW2FpU3VtbWFyaXppbmcsIHNldEFpU3VtbWFyaXppbmddID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgY29uc3QgW25hcnJhdGl2ZSwgc2V0TmFycmF0aXZlXSA9IHVzZVN0YXRlPHsgbmFycmF0aXZlOiBzdHJpbmc7IGNhY2hlZDogYm9vbGVhbjsgZ2VuZXJhdGVkQXQ/OiBudW1iZXI7IGNvc3RVc2Q/OiBudW1iZXIgfSB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW25hcnJhdGl2ZUJ1c3ksIHNldE5hcnJhdGl2ZUJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgY29uc3QgW3BlZWssIHNldFBlZWtdID0gdXNlU3RhdGU8eyBwYXRoOiBzdHJpbmc7IGxpbmU6IG51bWJlciB9IHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbcGVla0RhdGEsIHNldFBlZWtEYXRhXSA9IHVzZVN0YXRlPFBlZWtQYXlsb2FkIHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbcGVla0J1c3ksIHNldFBlZWtCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IFtuYXJyYXRpdmVFcnJvciwgc2V0TmFycmF0aXZlRXJyb3JdID0gdXNlU3RhdGUoJycpXHJcbiAgY29uc3QgW21vZGVsVGllcnMsIHNldE1vZGVsVGllcnNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgeyBwcm92aWRlcjogc3RyaW5nOyBtb2RlbDogc3RyaW5nIH0+IHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbbW9kZWxPcHRpb25zLCBzZXRNb2RlbE9wdGlvbnNdID0gdXNlU3RhdGU8QXJyYXk8eyBwcm92aWRlcjogc3RyaW5nOyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfT4+KFtdKVxyXG4gIGNvbnN0IFttb2RlbFNhdmluZywgc2V0TW9kZWxTYXZpbmddID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgY29uc3QgW21vZGVsU2F2ZWQsIHNldE1vZGVsU2F2ZWRdID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDM1x1RkYxQVx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNCAvIFJ1biBcdThCRTZcdTYwQzUgLyBcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTEgXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW3BsYW5Db25maXJtLCBzZXRQbGFuQ29uZmlybV0gPSB1c2VTdGF0ZTx7IGNoYW5nZUlkOiBzdHJpbmc7IHN0ZXBzOiBQbGFuQ29uZmlybVN0ZXBbXSB9IHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbcGxhbkJ1c3ksIHNldFBsYW5CdXN5XSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IFtydW5EZXRhaWwsIHNldFJ1bkRldGFpbF0gPSB1c2VTdGF0ZTxSdW5EZXRhaWwgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtzY2hlZHVsZWREYXRhLCBzZXRTY2hlZHVsZWREYXRhXSA9IHVzZVN0YXRlPFNjaGVkdWxlZFRhc2tFbnRyeVtdIHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbc2NoZWROYW1lLCBzZXRTY2hlZE5hbWVdID0gdXNlU3RhdGUoJycpXHJcbiAgY29uc3QgW3NjaGVkT3Blbiwgc2V0U2NoZWRPcGVuXSA9IHVzZVN0YXRlKHRydWUpXHJcbiAgY29uc3QgW3NjaGVkVHlwZSwgc2V0U2NoZWRUeXBlXSA9IHVzZVN0YXRlKCdyZXZpZXcnKVxyXG4gIGNvbnN0IFtzY2hlZFRpdGxlLCBzZXRTY2hlZFRpdGxlXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtzY2hlZERlc2MsIHNldFNjaGVkRGVzY10gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbc2NoZWRJbnRlcnZhbCwgc2V0U2NoZWRJbnRlcnZhbF0gPSB1c2VTdGF0ZSgnMTQ0MCcpXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1RkYxQVx1NTE2OFx1OTFDRlx1NjU3MFx1NjM2RSAvIFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QSBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBbbWVtb3JpZXNEYXRhLCBzZXRNZW1vcmllc0RhdGFdID0gdXNlU3RhdGU8TWVtb3JpZXNQYXlsb2FkIHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbc3luY1JlcG9ydCwgc2V0U3luY1JlcG9ydF0gPSB1c2VTdGF0ZTxTeW5jUmVwb3J0IHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbbWVtb3J5U2NvcGUsIHNldE1lbW9yeVNjb3BlXSA9IHVzZVN0YXRlPCdwcm9qZWN0JyB8ICdicmFuY2gnPigncHJvamVjdCcpXHJcbiAgY29uc3QgW21lbW9yeVR5cGUsIHNldE1lbW9yeVR5cGVdID0gdXNlU3RhdGUoJ2FyY2hpdGVjdHVyZV9kZWNpc2lvbicpXHJcbiAgY29uc3QgW21lbW9yeVN5bmNpbmcsIHNldE1lbW9yeVN5bmNpbmddID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgY29uc3QgW2V4ZWNUaXRsZSwgc2V0RXhlY1RpdGxlXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtleGVjTW9kZWwsIHNldEV4ZWNNb2RlbF0gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbZXhlY0Rlc2MsIHNldEV4ZWNEZXNjXSA9IHVzZVN0YXRlKCcnKVxyXG5cclxuICAvKiogXHU3RURGXHU0RTAwIFBPU1RcdUZGMUFcdTVFMjZcdThEODVcdTY1RjZcdTUxNUNcdTVFOTVcdUZGMDhMTE0gXHU3QUVGXHU3MEI5XHU2NzBEXHU1MkExXHU3QUVGIDEyMHMgXHU0RjFBXHU5NjREXHU3RUE3XHU4RkQ0XHU1NkRFXHVGRjBDXHU1QkEyXHU2MjM3XHU3QUVGIDE4MHMgXHU1M0VBXHU1MTVDXHU1RTk1XHU3NzFGXHU2QjYzXHU3Njg0XHU3RjUxXHU3RURDXHU0RTJEXHU2NUFEXHVGRjA5XHVGRjBDXHU3RUREXHU0RTBEXHU4QkE5XHU4QkY3XHU2QzQyXHU2NUUwXHU5NjUwXHU2MzAyXHU4RDc3XHUzMDAyICovXHJcbiAgY29uc3QgcG9zdCA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCB0aW1lb3V0TXMgPSAxODBfMDAwKTogUHJvbWlzZTx7IG9rOiBib29sZWFuOyBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB9PiA9PiB7XHJcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpXHJcbiAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCB0aW1lb3V0TXMpXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHBhdGgsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IC4uLmJvZHksIHNlc3Npb25JZDogcHJvcHMuc2Vzc2lvbklkID8/ICcnIH0pLFxyXG4gICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgIH0pXHJcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgICAgcmV0dXJuIHsgb2s6IHJlc3BvbnNlLm9rLCBkYXRhOiAoZGF0YSA/PyB7fSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfVxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIHBlZWtcdUZGMUFcdTYyNTNcdTVGMDBcdTY3RDBcdTY1ODdcdTRFRjZcdTY3RDBcdTg4NENcdTk2NDRcdThGRDFcdTc2ODRcdTRFRTNcdTc4MDFcdTRFMEFcdTRFMEJcdTY1ODdcdTZENkVcdTVDNDJcdUZGMDhcdTY3MDlcdTc1NENcdTdCNDlcdTVGODUgMTAgXHU3OUQyXHVGRjA5XHUzMDAyICovXHJcbiAgcGVla09wZW5lciA9IChwYXRoOiBzdHJpbmcsIGxpbmU6IG51bWJlcik6IHZvaWQgPT4geyB2b2lkIG9wZW5QZWVrKHBhdGgsIGxpbmUpIH1cclxuICBjb25zdCBvcGVuUGVlayA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGxpbmU6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgc2V0UGVlayh7IHBhdGgsIGxpbmUgfSlcclxuICAgIHNldFBlZWtEYXRhKG51bGwpXHJcbiAgICBzZXRQZWVrQnVzeSh0cnVlKVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKVxyXG4gICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCAxMF8wMDApXHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3BlZWsnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcGF0aCwgbGluZSwgc2Vzc2lvbklkOiBwcm9wcy5zZXNzaW9uSWQgPz8gJycgfSksXHJcbiAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgfSlcclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxyXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0UGVla0RhdGEoZGF0YSBhcyBQZWVrUGF5bG9hZClcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICBzZXRQZWVrRGF0YSh7IGV4aXN0czogZmFsc2UgfSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldFBlZWtCdXN5KGZhbHNlKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NURFNVx1NEY1Q1x1OEY2RVx1NkIyMVx1NTNEOVx1NEU4Qlx1RkYxQVx1NTkxQVx1NEUyQVx1OTAwOVx1NEUyRFx1NjNEMFx1NEVBNFx1NEY1Q1x1NEUzQVx1NEUwMFx1NEUyQVx1NjU3NFx1NEY1M1x1ODlFM1x1OEJGQlx1RkYwOFx1N0YxM1x1NUI1OCArIFx1NTNFRlx1NUYzQVx1NTIzNlx1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1RkYwOVx1MzAwMiAqL1xyXG4gIGNvbnN0IGxvYWROYXJyYXRpdmUgPSBhc3luYyAoZm9yY2UgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3Qgc2hhcyA9IHNlbGVjdGVkVGFyZ2V0cy5maWx0ZXIoKHRhcmdldCkgPT4gdGFyZ2V0ICE9PSAnd29ya2luZycpXHJcbiAgICBpZiAoc2hhcy5sZW5ndGggPCAyKSByZXR1cm5cclxuICAgIHNldE5hcnJhdGl2ZUJ1c3kodHJ1ZSlcclxuICAgIHNldE5hcnJhdGl2ZUVycm9yKCcnKVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvd29yay1uYXJyYXRpdmUnLCB7IHNoYXMsIGZvcmNlIH0pXHJcbiAgICAgIGlmICghb2spIHtcclxuICAgICAgICBzZXROYXJyYXRpdmVFcnJvcihTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBzZXROYXJyYXRpdmUoe1xyXG4gICAgICAgIG5hcnJhdGl2ZTogU3RyaW5nKGRhdGFbJ25hcnJhdGl2ZSddID8/ICcnKSxcclxuICAgICAgICBjYWNoZWQ6IGRhdGFbJ2NhY2hlZCddID09PSB0cnVlLFxyXG4gICAgICAgIGdlbmVyYXRlZEF0OiBkYXRhWydnZW5lcmF0ZWRBdCddID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBOdW1iZXIoZGF0YVsnZ2VuZXJhdGVkQXQnXSksXHJcbiAgICAgICAgY29zdFVzZDogZGF0YVsnY29zdFVzZCddID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBOdW1iZXIoZGF0YVsnY29zdFVzZCddKSxcclxuICAgICAgfSlcclxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgIHNldE5hcnJhdGl2ZUVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldE5hcnJhdGl2ZUJ1c3koZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIFx1N0VDRiByZWYgXHU2NkI0XHU5NzMyXHU2NzAwXHU2NUIwXHU5NUVEXHU1MzA1XHVGRjFBXHU1RTc2XHU1M0QxXHU2QzYwXHU2MzkyXHU3QTdBXHU4OUU2XHU1M0QxXHU4MUVBXHU1MkE4XHU1M0Q5XHU0RThCXHU2NUY2XHU4QkZCXHU1M0Q2XHU3Njg0XHU2NjJGXHU2NzAwXHU2NUIwIHNlbGVjdGVkVGFyZ2V0c1x1MzAwMlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7IGxvYWROYXJyYXRpdmVSZWYuY3VycmVudCA9ICgpID0+IHsgdm9pZCBsb2FkTmFycmF0aXZlKCkgfSB9KVxyXG5cclxuICAvKiogXHU2Mjc5XHU5MUNGXHU1MkZFXHU5MDA5XHU2M0QwXHU0RUE0XHVGRjA4XHU2NUIwXHU1ODlFXHU3Njg0XHU5MDEwXHU2NzYxXHU4OUU2XHU1M0QxIEFJIFx1ODlFM1x1OEJGQlx1RkYwQ1x1NURGMlx1NjcwOVx1NzY4NFx1OEQ3MFx1N0YxM1x1NUI1OFx1RkYwOVx1MzAwMiAqL1xyXG4gIGNvbnN0IHNlbGVjdENvbW1pdHMgPSAoc2hhczogc3RyaW5nW10pOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGFkZGVkID0gc2hhcy5maWx0ZXIoKHNoYSkgPT4gIXNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhzaGEpKVxyXG4gICAgc2V0U2VsZWN0ZWRUYXJnZXRzKChwcmV2aW91cykgPT4gQXJyYXkuZnJvbShuZXcgU2V0KFsuLi5wcmV2aW91cywgLi4uc2hhc10pKSlcclxuICAgIGZvciAoY29uc3Qgc2hhIG9mIGFkZGVkKSBsb2FkRGV0YWlsKHNoYSwgZmFsc2UpXHJcbiAgfVxyXG5cclxuICAvKiogXHU0RTAwXHU5NTJFXHU2RDg4XHU1MzE2XHVGRjFBXHU5MDA5XHU0RTJEXHU1MTY4XHU5MEU4XHU2NzJBXHU2RDg4XHU1MzE2XHU2M0QwXHU0RUE0IFx1MjE5MiBcdTYyNzlcdTkxQ0ZcdTg5RTNcdThCRkIgXHUyMTkyIFx1NjM5Mlx1N0E3QVx1NTQwRVx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1NjU3NFx1NEY1M1x1NTNEOVx1NEU4Qlx1MzAwMiAqL1xyXG4gIGNvbnN0IGRpZ2VzdEFsbCA9ICgpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IHNoYXMgPSAoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLmZpbHRlcigoY29tbWl0KSA9PiBpc1VuZGlnZXN0ZWQoY29tbWl0KSkubWFwKChjb21taXQpID0+IGNvbW1pdC5zaGEpXHJcbiAgICBpZiAoc2hhcy5sZW5ndGggPT09IDApIHJldHVyblxyXG4gICAgc2V0SW1wYWN0KG51bGwpXHJcbiAgICBzZXRSZXZpZXdzKHt9KVxyXG4gICAgY29uc3QgbmVlZHNGZXRjaCA9IHNoYXMuc29tZSgoc2hhKSA9PiAhc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHNoYSkpXHJcbiAgICBzZWxlY3RDb21taXRzKHNoYXMpXHJcbiAgICBpZiAobmVlZHNGZXRjaCkge1xyXG4gICAgICBhdXRvTmFycmF0aXZlUmVmLmN1cnJlbnQgPSBzaGFzLmxlbmd0aCA+PSAyXHJcbiAgICB9IGVsc2UgaWYgKHNoYXMubGVuZ3RoID49IDIpIHtcclxuICAgICAgLy8gXHU1MTY4XHU5MEU4XHU1REYyXHU1NzI4XHU5MDA5XHU0RTJEXHU5NkM2XHU1NDA4XHU0RTE0XHU4OUUzXHU4QkZCXHU5NjFGXHU1MjE3XHU3QTdBXHU5NUYyXHVGRjFBXHU3NkY0XHU2M0E1XHU3NTFGXHU2MjEwXHU1M0Q5XHU0RThCXHVGRjA4XHU3QjQ5XHU0RTAwXHU2MkNEXHU4QkE5IHN0YXRlIFx1ODQzRFx1NTczMFx1RkYwOVx1MzAwMlxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgbG9hZE5hcnJhdGl2ZVJlZi5jdXJyZW50KCkgfSwgMClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbW1pdHNSZXF1ZXN0UmVmID0gdXNlUmVmKDApXHJcbiAgY29uc3QgbG9hZENvbW1pdHMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gKytjb21taXRzUmVxdWVzdFJlZi5jdXJyZW50XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvcHJvamVjdC1jb250cm9sL2FwaS9jb21taXRzP3Nlc3Npb25JZD0ke2VuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpfSZsaW1pdD02MGApXHJcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKChkYXRhIGFzIHsgZXJyb3I/OiBzdHJpbmcgfSkuZXJyb3IgPz8gYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YClcclxuICAgICAgaWYgKCFhY3RpdmVSZWYuY3VycmVudCB8fCByZXF1ZXN0ICE9PSBjb21taXRzUmVxdWVzdFJlZi5jdXJyZW50KSByZXR1cm5cclxuICAgICAgc2V0Q29tbWl0c0RhdGEoZGF0YSBhcyBDb21taXRzUGF5bG9hZClcclxuICAgICAgc2V0Q29tbWl0c0Vycm9yKG51bGwpXHJcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xyXG4gICAgICBpZiAoIWFjdGl2ZVJlZi5jdXJyZW50IHx8IHJlcXVlc3QgIT09IGNvbW1pdHNSZXF1ZXN0UmVmLmN1cnJlbnQpIHJldHVyblxyXG4gICAgICBzZXRDb21taXRzRGF0YShudWxsKVxyXG4gICAgICBzZXRDb21taXRzRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgbG9hZE5vdGVzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXM/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcclxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldE5vdGVzKChkYXRhIGFzIHsgbm90ZXM6IE5vdGVFbnRyeVtdIH0pLm5vdGVzID8/IFtdKVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIFx1N0IxNFx1OEJCMFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2Mlx1RkYxQVx1NTIxN1x1ODg2OFx1NEZERFx1NjMwMVx1NTM5Rlx1NjgzN1x1MzAwMlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NTJGRVx1OTAwOS9cdTUzRDZcdTZEODhcdTRFMDBcdTZCMjFcdTYzRDBcdTRFQTRcdUZGMUFcdTkxQ0RcdTdCOTdcdTkwMDlcdTRFMkRcdTk2QzZcdTU0MDhcdUZGMENcdTVFNzZcdTYzMDlcdTk3MDBcdTg4NjVcdTlGNTBcdTZCQ0ZcdTY3NjFcdTYzRDBcdTRFQTRcdTc2ODQgQUkgXHU4OUUzXHU4QkZCXHVGRjA4XHU2NzBEXHU1MkExXHU3QUVGXHU2NzA5XHU3RjEzXHU1QjU4XHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgdG9nZ2xlVGFyZ2V0ID0gYXN5bmMgKHRhcmdldDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZFRhcmdldHMoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGlmIChwcmV2aW91cy5pbmNsdWRlcyh0YXJnZXQpKSByZXR1cm4gcHJldmlvdXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSB0YXJnZXQpXHJcbiAgICAgIHJldHVybiBbLi4ucHJldmlvdXMsIHRhcmdldF1cclxuICAgIH0pXHJcbiAgICBzZXRJbXBhY3QobnVsbClcclxuICAgIHNldFJldmlld3Moe30pXHJcbiAgICBpZiAoIXNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyh0YXJnZXQpKSB7XHJcbiAgICAgIGxvYWREZXRhaWwodGFyZ2V0LCBmYWxzZSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBcdTY1NzRcdThGNkVcdTkwMDlcdTYyRTlcdUZGMUFcdTY1NzRcdThGNkVcdTVERjJcdTkwMDlcdTY1RjZcdTUxOERcdTcwQjkgPSBcdTUzRDZcdTZEODhcdTY1NzRcdThGNkVcdUZGMUJcdTY1QjBcdTUyRkVcdTkwMDlcdTc2ODRcdTYzRDBcdTRFQTRcdTU0MDRcdTgxRUFcdTYyQzlcdTUzRDYgQUkgXHU4OUUzXHU4QkZCXHUzMDAyICovXHJcbiAgY29uc3Qgc2VsZWN0Um91bmQgPSAoc2hhczogc3RyaW5nW10pOiB2b2lkID0+IHtcclxuICAgIHNldEltcGFjdChudWxsKVxyXG4gICAgc2V0UmV2aWV3cyh7fSlcclxuICAgIGlmIChzaGFzLmV2ZXJ5KChzaGEpID0+IHNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhzaGEpKSkge1xyXG4gICAgICBzZXRTZWxlY3RlZFRhcmdldHMoKHByZXZpb3VzKSA9PiBwcmV2aW91cy5maWx0ZXIoKHNoYSkgPT4gIXNoYXMuaW5jbHVkZXMoc2hhKSkpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgY29uc3QgYWRkZWQgPSBzaGFzLmZpbHRlcigoc2hhKSA9PiAhc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHNoYSkpXHJcbiAgICBzZXRTZWxlY3RlZFRhcmdldHMoKHByZXZpb3VzKSA9PiBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLnByZXZpb3VzLCAuLi5zaGFzXSkpKVxyXG4gICAgZm9yIChjb25zdCBzaGEgb2YgYWRkZWQpIGxvYWREZXRhaWwoc2hhLCBmYWxzZSlcclxuICB9XHJcblxyXG4gIC8qKiBcdTg5RTNcdThCRkJcdTVFNzZcdTUzRDFcdTZDNjBcdUZGMUFcdTZBMjFcdTU3OEJcdTdGNTFcdTUxNzNcdTVFNzZcdTUzRDFcdTY3MDlcdTk2NTBcdUZGMENcdTU5MUFcdTkwMDkvXHU2NTc0XHU4RjZFXHU2Mjc5XHU5MUNGXHU1MkZFXHU5MDA5XHU2NUY2XHU2MzA5XHU0RTBBXHU5NjUwXHU1RTc2XHU1M0QxXHU1MjA2XHU2NzkwXHVGRjA4XHU5RUQ4XHU4QkE0XHU2NzAwXHU1OTFBIDMgXHU0RTJBXHU1NDBDXHU2NUY2XHVGRjA5XHVGRjBDXHU4RDg1XHU1MUZBXHU3Njg0XHU2MzkyXHU5NjFGXHU3QjQ5XHU1Rjg1XHU1RTc2XHU2NjNFXHU3OTNBXHU5NjFGXHU1MjE3XHU2NTcwXHUzMDAyICovXHJcbiAgY29uc3QgTUFYX0RFVEFJTF9DT05DVVJSRU5DWSA9IDNcclxuICBjb25zdCBkZXRhaWxQb29sUmVmID0gdXNlUmVmPHsgcGVuZGluZzogQXJyYXk8eyB0YXJnZXQ6IHN0cmluZzsgZm9yY2U6IGJvb2xlYW4gfT47IGFjdGl2ZTogbnVtYmVyIH0+KHsgcGVuZGluZzogW10sIGFjdGl2ZTogMCB9KVxyXG4gIGNvbnN0IGRldGFpbEluRmxpZ2h0UmVmID0gdXNlUmVmKG5ldyBTZXQ8c3RyaW5nPigpKVxyXG4gIC8qKiBcdTRFMDBcdTk1MkVcdTZEODhcdTUzMTZcdUZGMUFcdTUxNjhcdTkwRThcdTg5RTNcdThCRkJcdThERDFcdTVCOENcdTU0MEVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdTY1NzRcdTRGNTNcdTUzRDlcdTRFOEJcdUZGMDhcdTdFQ0YgcmVmIFx1NTNENlx1NjcwMFx1NjVCMFx1OTVFRFx1NTMwNVx1RkYwQ1x1OTA3Rlx1NTE0RCBzZWxlY3RlZFRhcmdldHMgXHU4RkM3XHU2NzFGXHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgYXV0b05hcnJhdGl2ZVJlZiA9IHVzZVJlZihmYWxzZSlcclxuICBjb25zdCBsb2FkTmFycmF0aXZlUmVmID0gdXNlUmVmPCgpID0+IHZvaWQ+KCgpID0+IHt9KVxyXG5cclxuICBjb25zdCBwdW1wRGV0YWlsUG9vbCA9ICgpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IHBvb2wgPSBkZXRhaWxQb29sUmVmLmN1cnJlbnRcclxuICAgIGlmIChwb29sLmFjdGl2ZSA9PT0gMCAmJiBwb29sLnBlbmRpbmcubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGlmIChhdXRvTmFycmF0aXZlUmVmLmN1cnJlbnQgJiYgYWN0aXZlUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBhdXRvTmFycmF0aXZlUmVmLmN1cnJlbnQgPSBmYWxzZVxyXG4gICAgICAgIGxvYWROYXJyYXRpdmVSZWYuY3VycmVudCgpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB3aGlsZSAoYWN0aXZlUmVmLmN1cnJlbnQgJiYgcG9vbC5hY3RpdmUgPCBNQVhfREVUQUlMX0NPTkNVUlJFTkNZICYmIHBvb2wucGVuZGluZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGpvYiA9IHBvb2wucGVuZGluZy5zaGlmdCgpIVxyXG4gICAgICBwb29sLmFjdGl2ZSArPSAxXHJcbiAgICAgIHZvaWQgbG9hZERldGFpbE9uY2Uoam9iLnRhcmdldCwgam9iLmZvcmNlKVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7fSlcclxuICAgICAgICAuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgICAgICBwb29sLmFjdGl2ZSAtPSAxXHJcbiAgICAgICAgICBwdW1wRGV0YWlsUG9vbCgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGxvYWREZXRhaWwgPSAodGFyZ2V0OiBzdHJpbmcsIGZvcmNlOiBib29sZWFuKTogdm9pZCA9PiB7XHJcbiAgICBpZiAoZGV0YWlsSW5GbGlnaHRSZWYuY3VycmVudC5oYXModGFyZ2V0KSkgcmV0dXJuXHJcbiAgICBkZXRhaWxJbkZsaWdodFJlZi5jdXJyZW50LmFkZCh0YXJnZXQpXHJcbiAgICBzZXREZXRhaWxTdGF0dXMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW3RhcmdldF06ICdxdWV1ZWQnIH0pKVxyXG4gICAgZGV0YWlsUG9vbFJlZi5jdXJyZW50LnBlbmRpbmcucHVzaCh7IHRhcmdldCwgZm9yY2UgfSlcclxuICAgIHB1bXBEZXRhaWxQb29sKClcclxuICB9XHJcblxyXG4gIC8qKiBcdTk2MUZcdTUyMTdcdTRFRkJcdTUyQTFcdTRGNTNcdUZGMUFcdTc3MUZcdTZCNjNcdTUzRDFcdThENzdcdTg5RTNcdThCRkJcdThCRjdcdTZDNDJcdUZGMUJcdTRFRkJcdTRGNTVcdTU5MzFcdThEMjVcdUZGMDhcdTdGNTFcdTdFRENcdTRFMkRcdTY1QUQvXHU4RDg1XHU2NUY2L1x1NjcwRFx1NTJBMVx1NjcyQVx1OEZEMFx1ODg0Q1x1RkYwOVx1OTBGRFx1NTE5OVx1NTE2NVx1NTM2MVx1NzI0N1x1OTUxOVx1OEJFRlx1NTM2MFx1NEY0RFx1RkYwQ1x1N0VERFx1NEUwRFx1NjVFMFx1OTY1MFx1OEY2Q1x1NTcwOFx1MzAwMiAqL1xyXG4gIGNvbnN0IGxvYWREZXRhaWxPbmNlID0gYXN5bmMgKHRhcmdldDogc3RyaW5nLCBmb3JjZTogYm9vbGVhbik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgc2V0RGV0YWlsU3RhdHVzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFt0YXJnZXRdOiAncnVubmluZycgfSkpXHJcbiAgICBjb25zdCBmYWlsUGxhY2Vob2xkZXIgPSAobWVzc2FnZTogc3RyaW5nKTogQ29tbWl0RGV0YWlsUGF5bG9hZCA9PlxyXG4gICAgICAoe1xyXG4gICAgICAgIHNoYTogdGFyZ2V0LFxyXG4gICAgICAgIGlzV29ya2luZzogdGFyZ2V0ID09PSAnd29ya2luZycsXHJcbiAgICAgICAgZmlsZXM6IFtdLFxyXG4gICAgICAgIGluc2VydGlvbnM6IDAsXHJcbiAgICAgICAgZGVsZXRpb25zOiAwLFxyXG4gICAgICAgIHBhdGNoVHJ1bmNhdGVkOiBmYWxzZSxcclxuICAgICAgICBwYXRjaDogJycsXHJcbiAgICAgICAgY29tbWl0OiBudWxsLFxyXG4gICAgICAgIGFuYWx5c2lzOiB7IHdoYXQ6IG1lc3NhZ2UsIGxvZ2ljOiBbXSwgcmlza3M6IFtdIH0sXHJcbiAgICAgIH0pIGFzIHVua25vd24gYXMgQ29tbWl0RGV0YWlsUGF5bG9hZFxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvY29tbWl0LWRldGFpbCcsIHsgc2hhOiB0YXJnZXQsIGZvcmNlIH0pXHJcbiAgICAgIGlmICghb2spIHtcclxuICAgICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHtcclxuICAgICAgICAgIC4uLnByZXZpb3VzLFxyXG4gICAgICAgICAgW3RhcmdldF06IGZhaWxQbGFjZWhvbGRlcignQUkgXHU4OUUzXHU4QkZCXHU1OTMxXHU4RDI1XHVGRjFBJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICcnKSArICdcdUZGMDhcdTcwQjlcdTMwMENcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdTMwMERcdTUzRUZcdTkxQ0RcdThCRDVcdUZGMDknKSxcclxuICAgICAgICB9KSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFt0YXJnZXRdOiBkYXRhIGFzIHVua25vd24gYXMgQ29tbWl0RGV0YWlsUGF5bG9hZCB9KSlcclxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgIGNvbnN0IHJlYXNvbiA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKVxyXG4gICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHtcclxuICAgICAgICAuLi5wcmV2aW91cyxcclxuICAgICAgICBbdGFyZ2V0XTogZmFpbFBsYWNlaG9sZGVyKGBBSSBcdTg5RTNcdThCRkJcdTU5MzFcdThEMjVcdUZGMUEke3JlYXNvbiA9PT0gJ1RoZSB1c2VyIGFib3J0ZWQgYSByZXF1ZXN0LicgPyAnXHU4QkY3XHU2QzQyXHU4RDg1XHU2NUY2XHU2MjE2XHU2NzBEXHU1MkExXHU0RTJEXHU2NUFEJyA6IHJlYXNvbn1cdUZGMDhcdTY4QzBcdTY3RTUgZHNoIFx1NjYyRlx1NTQyNlx1NTcyOFx1OEZEMFx1ODg0Q1x1RkYxQlx1NzBCOVx1MzAwQ1x1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1MzAwRFx1NTNFRlx1OTFDRFx1OEJENVx1RkYwOWApLFxyXG4gICAgICB9KSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIGRldGFpbEluRmxpZ2h0UmVmLmN1cnJlbnQuZGVsZXRlKHRhcmdldClcclxuICAgICAgc2V0RGV0YWlsU3RhdHVzKChwcmV2aW91cykgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH1cclxuICAgICAgICBkZWxldGUgbmV4dFt0YXJnZXRdXHJcbiAgICAgICAgcmV0dXJuIG5leHRcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGxvYWRJbXBhY3QgPSBhc3luYyAoZm9yY2UgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgaWYgKHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDApIHJldHVyblxyXG4gICAgc2V0SW1wYWN0TG9hZGluZyh0cnVlKVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaW1wYWN0LXNjb3BlJywgeyBzaGFzOiBzZWxlY3RlZFRhcmdldHMsIGZvcmNlIH0pXHJcbiAgICAgIHNldEltcGFjdChvayA/IChkYXRhIGFzIHVua25vd24gYXMgSW1wYWN0U2NvcGVQYXlsb2FkKSA6IG51bGwpXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJbXBhY3RMb2FkaW5nKGZhbHNlKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgbG9hZFJldmlld3MgPSBhc3luYyAoZm9yY2UgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgaWYgKHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDApIHJldHVyblxyXG4gICAgc2V0UmV2aWV3TG9hZGluZyh0cnVlKVxyXG4gICAgdHJ5IHtcclxuICAgICAgZm9yIChjb25zdCB0YXJnZXQgb2Ygc2VsZWN0ZWRUYXJnZXRzKSB7XHJcbiAgICAgICAgaWYgKCFhY3RpdmVSZWYuY3VycmVudCkgYnJlYWtcclxuICAgICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9yZXZpZXcnLCB7IHNoYTogdGFyZ2V0LCBmb3JjZSB9KVxyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBkYXRhIGFzIHVua25vd24gYXMgUmV2aWV3UGF5bG9hZFxyXG4gICAgICAgIHNldFJldmlld3MoKHByZXZpb3VzKSA9PiAoe1xyXG4gICAgICAgICAgLi4ucHJldmlvdXMsXHJcbiAgICAgICAgICBbdGFyZ2V0XTogb2sgPyBwYXlsb2FkIDoge1xyXG4gICAgICAgICAgICBpc3N1ZXNGb3VuZDogMCxcclxuICAgICAgICAgICAgaXNzdWVzOiAnJyxcclxuICAgICAgICAgICAgdmVyZGljdDogJ1x1OEJDNFx1NUJBMVx1NTkzMVx1OEQyNVx1RkYxQScgKyBTdHJpbmcocGF5bG9hZFsnZXJyb3InXSA/PyAnJykgKyAnXHVGRjA4XHU1M0VGXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwXHU5MUNEXHU4QkQ1XHVGRjA5JyxcclxuICAgICAgICAgICAgaXNzdWVMaXN0OiBbXSxcclxuICAgICAgICAgICAgY2FjaGVkOiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSkpXHJcbiAgICAgIH1cclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldFJldmlld0xvYWRpbmcoZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBsb2FkRmlsZURpZmYgPSBhc3luYyAoc2hhOiBzdHJpbmcsIHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3Qga2V5ID0gYCR7c2hhfXwke3BhdGh9YFxyXG4gICAgaWYgKGZpbGVEaWZmc1trZXldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgc2V0RmlsZURpZmZzKChwcmV2aW91cykgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH1cclxuICAgICAgICBkZWxldGUgbmV4dFtrZXldXHJcbiAgICAgICAgcmV0dXJuIG5leHRcclxuICAgICAgfSlcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2ZpbGUtZGlmZicsIHsgc2hhLCBwYXRoIH0pXHJcbiAgICBzZXRGaWxlRGlmZnMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW2tleV06IFN0cmluZyhkYXRhWydwYXRjaCddID8/ICcnKSB9KSlcclxuICB9XHJcblxyXG4gIGNvbnN0IGxvYWRJc3N1ZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXM/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcclxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAvLyBcdThGNkVcdThCRTJcdTUyMzdcdTY1QjBcdTRFMERcdTZFMDVcdTdBN0FcdTUyRkVcdTkwMDlcdUZGMUFcdTUyRkVcdTkwMDlcdTk1MkVcdTk2OEZcdTk1RUVcdTk4OTggaWQgXHU4RDcwXHVGRjBDXHU1REYyXHU2RDg4XHU1OTMxXHU3Njg0IGlkIFx1NEUwRFx1NUY3MVx1NTRDRFx1NjYzRVx1NzkzQVx1MzAwMlxyXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldElzc3Vlc0RhdGEoKGRhdGEgYXMgeyBpc3N1ZXM6IElzc3VlRW50cnlbXSB9KS5pc3N1ZXMgPz8gW10pXHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gXHU5NUVFXHU5ODk4XHU1MjE3XHU4ODY4XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXHVGRjFBXHU1MjE3XHU4ODY4XHU0RkREXHU2MzAxXHU1MzlGXHU2ODM3XHUzMDAyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBSZXZpZXcgXHU5ODc1XHU3QjdFXHU1QjlFXHU2NUY2XHU1NDBDXHU2QjY1XHVGRjFBXHU0RkVFXHU1OTBEXHU1QjUwXHU0RUUzXHU3NDA2XHU1NkRFXHU1MTk5XHU3MkI2XHU2MDAxXHU1NDBFXHVGRjBDXHU3NzBCXHU2NzdGIDQgXHU3OUQyXHU1MTg1XHU4RERGXHU0RTBBXHUzMDAyXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0YWIgIT09ICdyZXZpZXcnKSByZXR1cm5cclxuICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB2b2lkIGxvYWRJc3N1ZXMoKTsgdm9pZCBsb2FkRml4U3RhdHVzKCkgfSwgNDAwMClcclxuICAgIHJldHVybiAoKSA9PiB7IGNsZWFySW50ZXJ2YWwodGltZXIpIH1cclxuICB9LCBbdGFiLCBwcm9wcy5zZXNzaW9uSWRdKVxyXG5cclxuICAvKiogXHU2MkM5XHU1M0Q2XHU0RkVFXHU1OTBEXHU2RDNFXHU1M0QxXHU0RUZCXHU1MkExXHU3MkI2XHU2MDAxXHVGRjA4UmV2aWV3IFx1OTg3NVx1OEY2RVx1OEJFMlx1RkYxQlx1NjcwOVx1NkQzQlx1NTJBOFx1NEVGQlx1NTJBMVx1NjVGNlx1OUE3MVx1NTJBOFx1NTIzN1x1NjVCMFx1RkYwOVx1MzAwMiAqL1xyXG4gIGNvbnN0IGxvYWRGaXhTdGF0dXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9maXgvc3RhdHVzP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgICAgICBzZXRGaXhUYXNrcygoZGF0YSBhcyB7IHRhc2tzOiBGaXhUYXNrRW50cnlbXSB9KS50YXNrcyA/PyBbXSlcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIFx1NzJCNlx1NjAwMVx1NjJDOVx1NTNENlx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2Mlx1MzAwMlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NkQzRVx1NTNEMVx1NEZFRVx1NTkwRFx1RkYxQXBsYW5JZHM9XHU2Mjc5XHU1MUM2XHU3Njg0XHU1Rjg1XHU4QkM0XHU1QkExXHU2NUI5XHU2ODQ4XHVGRjFCaXNzdWVJZHM9XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHVGRjA4bW9kZT1maXggXHU0RkVFXHU1OTBEIC8gcGxhbiBcdTUzRUFcdThCRkJcdTUxRkFcdTY1QjlcdTY4NDhcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBkaXNwYXRjaEZpeCA9IGFzeW5jIChwbGFuSWRzOiBzdHJpbmdbXSwgaXNzdWVJZHM6IHN0cmluZ1tdLCBtb2RlOiAnZml4JyB8ICdwbGFuJyA9ICdmaXgnKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBpZiAocGxhbklkcy5sZW5ndGggPT09IDAgJiYgaXNzdWVJZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyB0KCdmaXguZGlzcGF0Y2hFbXB0eScpKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2ZpeC9kaXNwYXRjaCcsIHsgcGxhbklkcywgaXNzdWVJZHMsIG1vZGUgfSlcclxuICAgIGlmIChvaykge1xyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgnZml4LmRpc3BhdGNoRG9uZScpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhkYXRhWydhY2NlcHRlZCddID8/IDApKS5yZXBsYWNlKCd7Y30nLCBTdHJpbmcoZGF0YVsnY29uY3VycmVuY3knXSA/PyAzKSkpXHJcbiAgICAgIGF3YWl0IGxvYWRGaXhTdGF0dXMoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NTA1Q1x1NkI2Mlx1NEZFRVx1NTkwRFx1NkQzRVx1NTNEMVx1RkYxQVx1NTNENlx1NkQ4OFx1NjM5Mlx1OTYxRlx1NEUwRVx1OEZEMFx1ODg0Q1x1NEUyRFx1NzY4NFx1NEVGQlx1NTJBMVx1MzAwMiAqL1xyXG4gIGNvbnN0IGNhbmNlbEZpeCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2ZpeC9jYW5jZWwnLCB7fSlcclxuICAgIGlmIChvaykgc2V0QWN0aW9uUmVzdWx0KCdcdTIzRjkgJyArIHQoJ2ZpeC5zdG9wRG9uZScpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhkYXRhWydzdG9wcGVkJ10gPz8gMCkpKVxyXG4gICAgYXdhaXQgbG9hZEZpeFN0YXR1cygpXHJcbiAgfVxyXG5cclxuICAvKiogXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHU1QkZDXHU1MUZBXHU0RTNBIE1hcmtkb3duXHVGRjA4XHU2MzA5XHU0RTI1XHU5MUNEXHU1RUE2XHU2MzkyXHU1RThGXHVGRjFCXHU1OTBEXHU3NTI4XHU3QjE0XHU4QkIwXHU1QkZDXHU1MUZBXHU3Njg0XHU0RTBCXHU4RjdEXHU2NUI5XHU1RjBGXHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgZXhwb3J0SXNzdWVzTWQgPSAoaXNzdWVzOiBJc3N1ZUVudHJ5W10pOiB2b2lkID0+IHtcclxuICAgIGlmIChpc3N1ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyB0KCdyZXZpZXcuZXhwb3J0RW1wdHknKSlcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCBzZXZlcml0eU9yZGVyOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0geyBibG9ja2VyOiAwLCBjcml0aWNhbDogMSwgbWFqb3I6IDIsIG1pbm9yOiAzLCBpbmZvOiA0IH1cclxuICAgIGNvbnN0IG9yZGVyZWQgPSBbLi4uaXNzdWVzXS5zb3J0KChsZWZ0LCByaWdodCkgPT5cclxuICAgICAgKHNldmVyaXR5T3JkZXJbbm9ybWFsaXplSXNzdWVTZXZlcml0eShsZWZ0LnNldmVyaXR5KV0gPz8gOSkgLSAoc2V2ZXJpdHlPcmRlcltub3JtYWxpemVJc3N1ZVNldmVyaXR5KHJpZ2h0LnNldmVyaXR5KV0gPz8gOSlcclxuICAgICAgfHwgbGVmdC5jcmVhdGVkQXQgLSByaWdodC5jcmVhdGVkQXQpXHJcbiAgICBjb25zdCBsaW5lczogc3RyaW5nW10gPSBbXHJcbiAgICAgICcjIFJldmlldyBcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTUnLFxyXG4gICAgICAnJyxcclxuICAgICAgYC0gXHU5ODc5XHU3NkVFXHVGRjFBJHtzdGF0ZT8ucHJvamVjdD8ubmFtZSA/PyAnXHUyMDE0J31gLFxyXG4gICAgICBgLSBcdTRFRDNcdTVFOTNcdUZGMUEke2NvbW1pdHNEYXRhPy5yb290UGF0aCA/PyBzdGF0ZT8ucHJvamVjdD8ucm9vdFBhdGggPz8gJ1x1MjAxNCd9YCxcclxuICAgICAgYC0gXHU1MjA2XHU2NTJGXHVGRjFBJHtjb21taXRzRGF0YT8uYnJhbmNoID8/ICdcdTIwMTQnfWAsXHJcbiAgICAgIGAtIFx1NUJGQ1x1NTFGQVx1NjVGNlx1OTVGNFx1RkYxQSR7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfWAsXHJcbiAgICAgIGAtIFx1NjU3MFx1OTFDRlx1RkYxQSR7aXNzdWVzLmxlbmd0aH1cdUZGMDhcdTVGODVcdTU5MDRcdTc0MDYgJHtpc3N1ZXMuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykubGVuZ3RofVx1RkYwOWAsXHJcbiAgICAgICcnLFxyXG4gICAgXVxyXG4gICAgb3JkZXJlZC5mb3JFYWNoKChpc3N1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gaXNzdWUuY2hhbmdlSWQuc3RhcnRzV2l0aCgncmV2aWV3OicpICYmIGlzc3VlLmNoYW5nZUlkICE9PSAncmV2aWV3Ondvcmt0cmVlJ1xyXG4gICAgICAgID8gYFx1NjNEMFx1NEVBNCAke2lzc3VlLmNoYW5nZUlkLnNsaWNlKCdyZXZpZXc6Jy5sZW5ndGgsICdyZXZpZXc6Jy5sZW5ndGggKyA4KX1gXHJcbiAgICAgICAgOiBpc3N1ZS5jaGFuZ2VJZCA9PT0gJ3Jldmlldzp3b3JrdHJlZScgPyAnXHU1REU1XHU0RjVDXHU1MzNBJyA6IGlzc3VlLmNoYW5nZUlkXHJcbiAgICAgIGxpbmVzLnB1c2goYCMjICR7aW5kZXggKyAxfS4gWyR7aXNzdWUuc2V2ZXJpdHl9XVske2lzc3VlLmNhdGVnb3J5IHx8ICdnZW5lcmFsJ31dICR7aXNzdWUudGl0bGV9YClcclxuICAgICAgbGluZXMucHVzaCgnJylcclxuICAgICAgbGluZXMucHVzaChgLSBcdTcyQjZcdTYwMDFcdUZGMUEke0lTU1VFX1NUQVRVU19MQUJFTFNbaXNzdWUuc3RhdHVzXSA/PyBpc3N1ZS5zdGF0dXN9YClcclxuICAgICAgbGluZXMucHVzaChgLSBcdTVCRjlcdThDNjFcdUZGMUEke3RhcmdldH1gKVxyXG4gICAgICBsaW5lcy5wdXNoKGAtIFx1NTNEMVx1NzNCMFx1NjVGNlx1OTVGNFx1RkYxQSR7bmV3IERhdGUoaXNzdWUuY3JlYXRlZEF0KS50b0xvY2FsZVN0cmluZygpfWApXHJcbiAgICAgIGlmICgoaXNzdWUuZGVzY3JpcHRpb24gPz8gJycpICE9PSAnJykgbGluZXMucHVzaChgLSBcdTYzQ0ZcdThGRjBcdUZGMUEke2lzc3VlLmRlc2NyaXB0aW9uIS5yZXBsYWNlKC9cXG4vZywgJyAnKX1gKVxyXG4gICAgICBpZiAoKGlzc3VlLnJlc29sdXRpb24gPz8gJycpICE9PSAnJykgbGluZXMucHVzaChgLSBcdTdFRDNcdThCQkFcdUZGMUEke2lzc3VlLnJlc29sdXRpb259YClcclxuICAgICAgbGluZXMucHVzaCgnJylcclxuICAgIH0pXHJcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2xpbmVzLmpvaW4oJ1xcbicpXSwgeyB0eXBlOiAndGV4dC9tYXJrZG93bjtjaGFyc2V0PXV0Zi04JyB9KVxyXG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxyXG4gICAgY29uc3QgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXHJcbiAgICBhbmNob3IuaHJlZiA9IHVybFxyXG4gICAgYW5jaG9yLmRvd25sb2FkID0gYHJldmlldy1pc3N1ZXMtJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApfS5tZGBcclxuICAgIGFuY2hvci5jbGljaygpXHJcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybClcclxuICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzICcgKyB0KCdub3Rlcy5leHBvcnREb25lJykpXHJcbiAgfVxyXG5cclxuICAvKiogXHU2Mjc5XHU5MUNGXHU2ODA3XHU4QkIwXHU1REYyXHU1OTA0XHU3NDA2XHVGRjA4YWNjZXB0ZWRcdUZGMDlcdUZGMUFcdTRFQkFcdTVERTVcdTc4NkVcdThCQTRcdTY1RTBcdTk3MDBcdTkwMTBcdTY3NjFcdTU5MERcdTY4QzBcdTY1RjZcdTc2RjRcdTYzQTVcdTdFRDNcdTY4NDhcdTMwMDIgKi9cclxuICBjb25zdCBtYXJrSXNzdWVzSGFuZGxlZCA9IGFzeW5jIChpZHM6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBsZXQgZG9uZSA9IDBcclxuICAgIGZvciAoY29uc3QgaWQgb2YgaWRzKSB7XHJcbiAgICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcy9zdGF0dXMnLCB7IGlkLCBzdGF0dXM6ICdhY2NlcHRlZCcgfSlcclxuICAgICAgaWYgKG9rKSBkb25lICs9IDFcclxuICAgIH1cclxuICAgIGF3YWl0IGxvYWRJc3N1ZXMoKVxyXG4gICAgaWYgKGRvbmUgPiAwKSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgncmV2aWV3LmhhbmRsZWREb25lJykucmVwbGFjZSgne259JywgU3RyaW5nKGRvbmUpKSlcclxuICB9XHJcblxyXG4gIC8qKiBcdTYyNzlcdTkxQ0ZcdTU5MERcdTY4QzBcdUZGMUFcdTVCRjlcdTkwMDlcdTRFMkRcdTc2ODRcdThCQzRcdTVCQTFcdTc2RUVcdTY4MDdcdTkwMTBcdTRFMkFcdThERDFcdTU5MERcdTY4QzBcdUZGMDhcdTRFMzJcdTg4NEMgTExNXHVGRjA5XHVGRjBDXHU1QjlFXHU2NUY2XHU4RkRCXHU1RUE2XHUzMDAxXHU1M0VGXHU0RTJEXHU5MDE0XHU1MDVDXHU2QjYyXHUzMDAyICovXHJcbiAgY29uc3QgcnVuQmF0Y2hWZXJpZnkgPSBhc3luYyAodGFyZ2V0czogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGlmICh0YXJnZXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXHJcbiAgICBiYXRjaFN0b3BSZWYuY3VycmVudCA9IGZhbHNlXHJcbiAgICBzZXRCYXRjaFZlcmlmeVN0YXRlKHsgZG9uZTogMCwgdG90YWw6IHRhcmdldHMubGVuZ3RoIH0pXHJcbiAgICBsZXQgcmVzb2x2ZWRUb3RhbCA9IDBcclxuICAgIGxldCBvcGVuVG90YWwgPSAwXHJcbiAgICBsZXQgbmV3VG90YWwgPSAwXHJcbiAgICBsZXQgZmFpbGVkID0gMFxyXG4gICAgZm9yIChjb25zdCBbaW5kZXgsIHRhcmdldF0gb2YgdGFyZ2V0cy5lbnRyaWVzKCkpIHtcclxuICAgICAgaWYgKGJhdGNoU3RvcFJlZi5jdXJyZW50KSBicmVha1xyXG4gICAgICBzZXRCYXRjaFZlcmlmeVN0YXRlKHsgZG9uZTogaW5kZXgsIHRvdGFsOiB0YXJnZXRzLmxlbmd0aCB9KVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcy92ZXJpZnknLCB7IHRhcmdldCB9KVxyXG4gICAgICAgIGlmICghb2spIGZhaWxlZCArPSAxXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICByZXNvbHZlZFRvdGFsICs9ICgoZGF0YVsncmVzb2x2ZWQnXSBhcyB1bmtub3duW10pID8/IFtdKS5sZW5ndGhcclxuICAgICAgICAgIG9wZW5Ub3RhbCArPSAoKGRhdGFbJ3N0aWxsT3BlbiddIGFzIHVua25vd25bXSkgPz8gW10pLmxlbmd0aFxyXG4gICAgICAgICAgbmV3VG90YWwgKz0gKChkYXRhWyduZXdJc3N1ZXMnXSBhcyB1bmtub3duW10pID8/IFtdKS5sZW5ndGhcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIGZhaWxlZCArPSAxXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHNldEJhdGNoVmVyaWZ5U3RhdGUobnVsbClcclxuICAgIGF3YWl0IGxvYWRJc3N1ZXMoKVxyXG4gICAgaWYgKGJhdGNoU3RvcFJlZi5jdXJyZW50KSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjNGOSAnICsgdCgncmV2aWV3LmJhdGNoU3RvcHBlZCcpKVxyXG4gICAgZWxzZSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgncmV2aWV3LmJhdGNoRG9uZScpLnJlcGxhY2UoJ3thfScsIFN0cmluZyhyZXNvbHZlZFRvdGFsKSkucmVwbGFjZSgne2J9JywgU3RyaW5nKG9wZW5Ub3RhbCkpLnJlcGxhY2UoJ3tjfScsIFN0cmluZyhuZXdUb3RhbCkpLnJlcGxhY2UoJ3tkfScsIFN0cmluZyhmYWlsZWQpKSlcclxuICB9XHJcblxyXG4gIC8qKiBcdTY1NzRcdTRGNTNcdTUyMDZcdThCQ0FcdUZGMUFcdTVGQUFcdTczQUZcdThDMDNcdTc1MjggL2lzc3Vlcy90cmlhZ2UgXHU3NkY0XHU4MUYzIGRvbmVcdUZGMDhcdTZCQ0ZcdTYyNzkgPSBcdTY3MERcdTUyQTFcdTdBRUZcIm9wZW4gXHU0RTE0XHU2NzJDXHU4RjZFXHU2NzJBXHU5MDAxXHU1QkExXCJcdTc2ODRcdTUyNEQgTiBcdTY3NjFcdUZGMDlcdUZGMENcclxuICAgKiBcdTUyMjRcdTVCOUFcdTUzNzNcdTY1RjZcdTUxNzNcdTk1RURcdTMwMDFcdTUzRUZcdTUwNUNcdTZCNjJcdTUzRUZcdTdFRURcdThERDFcdUZGMDhcdTY3MERcdTUyQTFcdTdBRUYgc2VlbiBcdThCQjBcdTVGQzZcdTk2MzJcdTkxQ0RcdTU5MERcdTZEODhcdTgwMTdcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBydW5UcmlhZ2UgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBiYXRjaFN0b3BSZWYuY3VycmVudCA9IGZhbHNlXHJcbiAgICAvLyByZW1haW5pbmc9LTEgPSBcdTVDMUFcdTY3MkFcdTYyRkZcdTUyMzBcdTk5OTZcdTYyNzlcdTU0Q0RcdTVFOTRcdUZGMDhcdTY2M0VcdTc5M0EgXHUyMDI2IFx1ODAwQ1x1NEUwRFx1NjYyRlx1OEJFRlx1NUJGQ1x1NjAyN1x1NzY4NCAwXHVGRjA5XHUzMDAyXHJcbiAgICBzZXRUcmlhZ2VTdGF0ZSh7IHByb2Nlc3NlZDogMCwgcmVtYWluaW5nOiAtMSB9KVxyXG4gICAgY29uc3QgY2xvc2VkID0geyBkdXBsaWNhdGU6IDAsIG9ic29sZXRlOiAwLCBmYWxzZV9wb3NpdGl2ZTogMCB9XHJcbiAgICBsZXQga2VwdCA9IDBcclxuICAgIGxldCBwcm9jZXNzZWQgPSAwXHJcbiAgICBsZXQgcGFyc2VGYWlsZWQgPSBmYWxzZVxyXG4gICAgbGV0IHN0b3BwZWQgPSBmYWxzZVxyXG4gICAgbGV0IGZpcnN0ID0gdHJ1ZVxyXG4gICAgZm9yICg7Oykge1xyXG4gICAgICBpZiAoYmF0Y2hTdG9wUmVmLmN1cnJlbnQpIHsgc3RvcHBlZCA9IHRydWU7IGJyZWFrIH1cclxuICAgICAgbGV0IG91dGNvbWU6IHsgb2s6IGJvb2xlYW47IGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IH1cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBvdXRjb21lID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaXNzdWVzL3RyaWFnZScsIHsgc2Vzc2lvbklkOiBwcm9wcy5zZXNzaW9uSWQgPz8gJycsIC4uLihmaXJzdCA/IHsgcmVzZXQ6IHRydWUgfSA6IHt9KSB9KVxyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICBvdXRjb21lID0geyBvazogZmFsc2UsIGRhdGE6IHsgZXJyb3I6ICduZXR3b3JrIGVycm9yJyB9IH1cclxuICAgICAgfVxyXG4gICAgICBmaXJzdCA9IGZhbHNlXHJcbiAgICAgIGlmICghb3V0Y29tZS5vaykgeyBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKG91dGNvbWUuZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSk7IGJyZWFrIH1cclxuICAgICAgY29uc3QgZGF0YSA9IG91dGNvbWUuZGF0YVxyXG4gICAgICAvLyBcdTUxNDhcdTdEMkZcdTUyQTBcdTUxOERcdTUyMjQgZG9uZVx1RkYxQVx1NjcwMFx1NTQwRVx1NEUwMFx1NjI3OVx1RkYwOGRvbmU6dHJ1ZSBcdTRFMTQgcHJvY2Vzc2VkPjBcdUZGMDlcdTc2ODRcdThCQTFcdTY1NzBcdTRFMERcdTgwRkRcdTRFMjJcdTMwMDJcclxuICAgICAgY29uc3QgYmF0Y2hDbG9zZWQgPSAoZGF0YVsnY2xvc2VkJ10gPz8ge30pIGFzIFJlY29yZDxzdHJpbmcsIG51bWJlcj5cclxuICAgICAgY2xvc2VkLmR1cGxpY2F0ZSArPSBOdW1iZXIoYmF0Y2hDbG9zZWRbJ2R1cGxpY2F0ZSddID8/IDApXHJcbiAgICAgIGNsb3NlZC5vYnNvbGV0ZSArPSBOdW1iZXIoYmF0Y2hDbG9zZWRbJ29ic29sZXRlJ10gPz8gMClcclxuICAgICAgY2xvc2VkLmZhbHNlX3Bvc2l0aXZlICs9IE51bWJlcihiYXRjaENsb3NlZFsnZmFsc2VfcG9zaXRpdmUnXSA/PyAwKVxyXG4gICAgICBrZXB0ICs9IE51bWJlcihkYXRhWydrZXB0J10gPz8gMClcclxuICAgICAgcHJvY2Vzc2VkICs9IE51bWJlcihkYXRhWydwcm9jZXNzZWQnXSA/PyAwKVxyXG4gICAgICBpZiAoZGF0YVsncGFyc2VGYWlsZWQnXSA9PT0gdHJ1ZSkgcGFyc2VGYWlsZWQgPSB0cnVlXHJcbiAgICAgIGlmIChkYXRhWydkb25lJ10gPT09IHRydWUpIGJyZWFrXHJcbiAgICAgIHNldFRyaWFnZVN0YXRlKHsgcHJvY2Vzc2VkLCByZW1haW5pbmc6IE51bWJlcihkYXRhWydyZW1haW5pbmcnXSA/PyAwKSB9KVxyXG4gICAgfVxyXG4gICAgc2V0VHJpYWdlU3RhdGUobnVsbClcclxuICAgIGF3YWl0IGxvYWRJc3N1ZXMoKVxyXG4gICAgaWYgKHN0b3BwZWQpIHNldEFjdGlvblJlc3VsdCgnXHUyM0Y5ICcgKyB0KCdyZXZpZXcudHJpYWdlU3RvcHBlZCcpKVxyXG4gICAgZWxzZSBpZiAocHJvY2Vzc2VkID09PSAwKSB7XHJcbiAgICAgIC8vIFx1OTk5Nlx1OEY2RVx1NTM3MyBkb25lIFx1NEUxNFx1OTZGNlx1NTkwNFx1NzQwNlx1RkYxQVx1NUY1M1x1NTI0RFx1NEYxQVx1OEJERFx1NUI5QVx1NEY0RFx1NTIzMFx1NzY4NFx1OTg3OVx1NzZFRVx1NkNBMVx1NjcwOVx1NUY4NVx1NTIwNlx1OEJDQVx1OTVFRVx1OTg5OFx1MjAxNFx1MjAxNFx1ODJFNVx1NEUwRVx1NTIxN1x1ODg2OFx1NEUwRFx1N0IyNlx1RkYwQ1x1NTkxQVx1NTM0QVx1NjYyRlx1NEYxQVx1OEJERFx1NEUwRFx1NUM1RVx1NEU4RVx1OEJFNVx1OTg3OVx1NzZFRVx1MzAwMlxyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgdCgncmV2aWV3LnRyaWFnZU5vdGhpbmcnKSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzICcgKyB0KCdyZXZpZXcudHJpYWdlRG9uZScpXHJcbiAgICAgICAgLnJlcGxhY2UoJ3thfScsIFN0cmluZyhjbG9zZWQuZHVwbGljYXRlKSkucmVwbGFjZSgne2J9JywgU3RyaW5nKGNsb3NlZC5vYnNvbGV0ZSkpLnJlcGxhY2UoJ3tjfScsIFN0cmluZyhjbG9zZWQuZmFsc2VfcG9zaXRpdmUpKS5yZXBsYWNlKCd7ZH0nLCBTdHJpbmcoa2VwdCkpXHJcbiAgICAgICAgKyAocGFyc2VGYWlsZWQgPyB0KCdyZXZpZXcudHJpYWdlUGFyc2VGYWlsJykgOiAnJykpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBcdTk1RUVcdTk4OThcdTU5MERcdTY4QzBcdUZGMUFcdTVCRjlcdThCRTVcdTk1RUVcdTk4OThcdTYyNDBcdTVDNUVcdThCQzRcdTVCQTFcdTc2RUVcdTY4MDdcdTkxQ0RcdThERDFcdTY4QzBcdTZENEJcdUZGMDhcdTRGRUVcdTU5MERcdTc4NkVcdThCQTQgKyBcdTY3MDBcdTRGMThcdTYwMjcvXHU2NzAwXHU1QzBGXHU0RkI1XHU1MTY1ICsgXHU2NUIwXHU5NUVFXHU5ODk4XHU2MjZCXHU2M0NGXHVGRjA5XHVGRjBDXHJcbiAgICogXHU1M0VBXHU2NzA5XHU1OTBEXHU2OEMwXHU5MDFBXHU4RkM3XHU2MjREXHU4MUVBXHU1MkE4XHU3RjZFXHU0RTNBXHU1REYyXHU4OUUzXHU1MUIzXHVGRjFCXHU3RUQzXHU2NzlDXHU0RUU1XHU1OTBEXHU2OEMwXHU2MkE1XHU1NDRBXHU1RjYyXHU1RjBGXHU1QzU1XHU3OTNBXHUzMDAyXHJcbiAgICovXHJcbiAgY29uc3QgdmVyaWZ5SXNzdWVzID0gYXN5bmMgKHRhcmdldDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBzZXRWZXJpZnlpbmdUYXJnZXQodGFyZ2V0KVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaXNzdWVzL3ZlcmlmeScsIHsgdGFyZ2V0IH0pXHJcbiAgICAgIGlmICghb2spIHtcclxuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcmVzb2x2ZWQgPSAoZGF0YVsncmVzb2x2ZWQnXSBhcyBzdHJpbmdbXSB8IHVuZGVmaW5lZCkgPz8gW11cclxuICAgICAgY29uc3Qgc3RpbGxPcGVuID0gKGRhdGFbJ3N0aWxsT3BlbiddIGFzIEFycmF5PHsgdGl0bGU6IHN0cmluZzsgcmVhc29uOiBzdHJpbmcgfT4gfCB1bmRlZmluZWQpID8/IFtdXHJcbiAgICAgIGNvbnN0IG5ld0lzc3VlcyA9IChkYXRhWyduZXdJc3N1ZXMnXSBhcyBBcnJheTx7IHNldmVyaXR5OiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT4gfCB1bmRlZmluZWQpID8/IFtdXHJcbiAgICAgIGNvbnN0IHZlcmRpY3QgPSBTdHJpbmcoZGF0YVsndmVyZGljdCddID8/ICcnKVxyXG4gICAgICBjb25zdCBsaW5lcyA9IFtcclxuICAgICAgICBgXHU1OTBEXHU2OEMwXHU1QjhDXHU2MjEwXHVGRjFBXHU1REYyXHU0RkVFXHU1OTBEICR7cmVzb2x2ZWQubGVuZ3RofSBcdTAwQjcgXHU0RUNEXHU2NzJBXHU0RkVFXHU1OTBEICR7c3RpbGxPcGVuLmxlbmd0aH0gXHUwMEI3IFx1NjVCMFx1NTg5RVx1OTVFRVx1OTg5OCAke25ld0lzc3Vlcy5sZW5ndGh9YCxcclxuICAgICAgICAuLi4ocmVzb2x2ZWQubGVuZ3RoID4gMCA/IFtgXHUyNzEzIFx1NURGMlx1NEZFRVx1NTkwRFx1RkYxQSR7cmVzb2x2ZWQuam9pbignXHVGRjFCJyl9YF0gOiBbXSksXHJcbiAgICAgICAgLi4uKHN0aWxsT3Blbi5sZW5ndGggPiAwID8gc3RpbGxPcGVuLm1hcCgoaXRlbSkgPT4gYFx1MjcxNyBcdTY3MkFcdTRGRUVcdTU5MERcdUZGMUEke2l0ZW0udGl0bGV9IFx1MjAxNFx1MjAxNCAke2l0ZW0ucmVhc29ufWApIDogW10pLFxyXG4gICAgICAgIC4uLihuZXdJc3N1ZXMubGVuZ3RoID4gMCA/IG5ld0lzc3Vlcy5tYXAoKGl0ZW0pID0+IGBcdUZGMEIgXHU2NUIwXHU5NUVFXHU5ODk4XHVGRjFBWyR7aXRlbS5zZXZlcml0eX1dICR7aXRlbS50aXRsZX1gKSA6IFtdKSxcclxuICAgICAgICAuLi4odmVyZGljdCA9PT0gJycgPyBbXSA6IFtgXHU2NzAwXHU0RjE4XHU2MDI3XHVGRjFBJHt2ZXJkaWN0fWBdKSxcclxuICAgICAgXVxyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQobGluZXMuam9pbignXFxuJykpXHJcbiAgICAgIGF3YWl0IGxvYWRJc3N1ZXMoKVxyXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0VmVyaWZ5aW5nVGFyZ2V0KG51bGwpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBhZGROb3RlID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgaWYgKG5vdGVUaXRsZS50cmltKCkgPT09ICcnIHx8IG5vdGVDb250ZW50LnRyaW0oKSA9PT0gJycpIHJldHVyblxyXG4gICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMnLCB7XHJcbiAgICAgIHRpdGxlOiBub3RlVGl0bGUudHJpbSgpLFxyXG4gICAgICBjb250ZW50OiBub3RlQ29udGVudC50cmltKCksXHJcbiAgICAgIHRhZ3M6IG5vdGVUYWdzLFxyXG4gICAgICBzaGE6IHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiBzZWxlY3RlZFRhcmdldHNbMF0sXHJcbiAgICB9KVxyXG4gICAgaWYgKG9rKSB7XHJcbiAgICAgIHNldE5vdGVUaXRsZSgnJylcclxuICAgICAgc2V0Tm90ZUNvbnRlbnQoJycpXHJcbiAgICAgIHNldE5vdGVUYWdzKCcnKVxyXG4gICAgICBhd2FpdCBsb2FkTm90ZXMoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVtb3ZlTm90ZSA9IGFzeW5jIChpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy9kZWxldGUnLCB7IGlkIH0pXHJcbiAgICBpZiAoZWRpdGluZ05vdGUgIT09IG51bGwgJiYgZWRpdGluZ05vdGUuaWQgPT09IGlkKSBzZXRFZGl0aW5nTm90ZShudWxsKVxyXG4gICAgYXdhaXQgbG9hZE5vdGVzKClcclxuICB9XHJcblxyXG4gIGNvbnN0IHNhdmVOb3RlRWRpdCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGlmIChlZGl0aW5nTm90ZSA9PT0gbnVsbCkgcmV0dXJuXHJcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy91cGRhdGUnLCB7IGlkOiBlZGl0aW5nTm90ZS5pZCwgdGl0bGU6IGVkaXRpbmdOb3RlLnRpdGxlLCBjb250ZW50OiBlZGl0aW5nTm90ZS5jb250ZW50LCB0YWdzOiBlZGl0aW5nTm90ZS50YWdzIH0pXHJcbiAgICBzZXRFZGl0aW5nTm90ZShudWxsKVxyXG4gICAgYXdhaXQgbG9hZE5vdGVzKClcclxuICB9XHJcblxyXG4gIC8qKiBcdTdGNkVcdTk4NzYvXHU1M0Q2XHU2RDg4XHU3RjZFXHU5ODc2XHU0RTAwXHU2NzYxXHU3QjE0XHU4QkIwXHUzMDAyICovXHJcbiAgY29uc3QgdG9nZ2xlTm90ZVBpbiA9IGFzeW5jIChub3RlOiBOb3RlRW50cnkpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL3VwZGF0ZScsIHsgaWQ6IG5vdGUuaWQsIHBpbm5lZDogbm90ZS5waW5uZWQgIT09IHRydWUgfSlcclxuICAgIGF3YWl0IGxvYWROb3RlcygpXHJcbiAgfVxyXG5cclxuICAvKiogXHU3QjE0XHU4QkIwXHU1QkZDXHU1MUZBXHU0RTNBIC5tZCBcdTY1ODdcdTRFRjZcdUZGMDhcdTZENEZcdTg5QzhcdTU2NjhcdTdBRUYgQmxvYiBcdTRFMEJcdThGN0RcdUZGMUJcdTY1ODdcdTRFRjZcdTU0MERcdTYzMDlcdTY4MDdcdTk4OThcdTZFMDVcdTZEMTdcdUZGMENcdTk3NUVcdTZDRDVcdTVCNTdcdTdCMjZcdTY2RkZcdTYzNjJcdTRFM0FcdTRFMEJcdTUyMTJcdTdFQkZcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBleHBvcnROb3RlID0gKG5vdGU6IE5vdGVFbnRyeSk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgbWQgPSBgIyAke25vdGUudGl0bGV9XFxuXFxuJHtub3RlLmNvbnRlbnR9XFxuYFxyXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFttZF0sIHsgdHlwZTogJ3RleHQvbWFya2Rvd247Y2hhcnNldD11dGYtOCcgfSlcclxuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcclxuICAgIGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxyXG4gICAgYW5jaG9yLmhyZWYgPSB1cmxcclxuICAgIGFuY2hvci5kb3dubG9hZCA9IChub3RlLnRpdGxlLnJlcGxhY2UoL1tcXFxcLzoqP1wiPD58XS9nLCAnXycpLnRyaW0oKS5zbGljZSgwLCA2MCkgfHwgJ25vdGUnKSArICcubWQnXHJcbiAgICBhbmNob3IuY2xpY2soKVxyXG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpXHJcbiAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgnbm90ZXMuZXhwb3J0RG9uZScpKVxyXG4gIH1cclxuXHJcbiAgLyoqIEFJIFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1RkYxQVx1NUJGOVx1NkJENFx1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NTA1QVx1NTg5RVx1OTFDRlx1NjZGNFx1NjVCMFx1RkYwQ1x1NjI4QVx1N0IxNFx1OEJCMCtcdTk4NzlcdTc2RUVcdTY4NjNcdTY4NDhcdTYzRDBcdTcwQkNcdTYyMTBcdTRFMDBcdTRFRkRcdTMwMENcdTZEM0JcdTMwMERcdTc2ODRcdTYwM0JcdTdFRDNcdTY1ODdcdTY4NjNcdTMwMDIgKi9cclxuICBjb25zdCBhaVN1bW1hcml6ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIHNldEFpU3VtbWFyaXppbmcodHJ1ZSlcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL2FpLXN1bW1hcnknLCB7fSlcclxuICAgICAgaWYgKCFvaykge1xyXG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoZGF0YVsndXBkYXRlZCddID09PSB0cnVlXHJcbiAgICAgICAgPyAnXHUyNzEzIFx1NURGMlx1NUJGOVx1NkJENFx1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NUI4Q1x1NjIxMFx1NTg5RVx1OTFDRlx1NjZGNFx1NjVCMFx1RkYwOFx1NjVCMFx1NTg5RVx1NTNEOFx1NTMxNlx1ODlDMVx1NjAzQlx1N0VEM1x1NzY4NFx1MzAwQ1x1NjcyQ1x1NkIyMVx1NjZGNFx1NjVCMFx1MzAwRFx1NEUwMFx1ODI4Mlx1RkYwOVx1RkYwQ1x1NjVFN1x1NjAzQlx1N0VEM1x1NURGMlx1NTQwOFx1NUU3Nlx1NjZGRlx1NjM2MidcclxuICAgICAgICA6ICdcdTI3MTMgXHU1REYyXHU3NTFGXHU2MjEwXHU5OTk2XHU0RUZEXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzJylcclxuICAgICAgYXdhaXQgbG9hZE5vdGVzKClcclxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldEFpU3VtbWFyaXppbmcoZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogXHU5ODc1XHU5NzYyXHU1MjFCXHU1RUZBXHU2MjY3XHU4ODRDXHVGRjFBXHU1RUZBXHU1M0Q4XHU2NkY0IFx1MjE5MiBMTE0gXHU3NTFGXHU2MjEwXHU3RjE2XHU2MzkyXHU4QkExXHU1MjEyIFx1MjE5MiBcdThCQTFcdTUyMTJcdTc4NkVcdThCQTRcdTk4NzVcdUZGMDhcdTg5RDJcdTgyNzIvXHU2QTIxXHU1NzhCL1x1N0I1Nlx1NzU2NVx1NTNFRlx1OEMwM1x1RkYwOVx1MjE5MiBcdTc4NkVcdThCQTRcdTU0MEVcdTU0MkZcdTUyQThcdTMwMDIgKi9cclxuICBjb25zdCBzdGFydFJ1biA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGlmIChleGVjVGl0bGUudHJpbSgpID09PSAnJyB8fCBleGVjRGVzYy50cmltKCkgPT09ICcnKSByZXR1cm5cclxuICAgIHNldEJ1c3koJ3N0YXJ0UnVuJylcclxuICAgIHNldEFjdGlvblJlc3VsdChudWxsKVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9zdGFydCcsIHtcclxuICAgICAgICB0aXRsZTogZXhlY1RpdGxlLnRyaW0oKSwgZGVzY3JpcHRpb246IGV4ZWNEZXNjLnRyaW0oKSxcclxuICAgICAgICAuLi4oZXhlY01vZGVsID09PSAnJyA/IHt9IDogKCgpID0+IHsgY29uc3QgW3Byb3ZpZGVyLCBtb2RlbF0gPSBleGVjTW9kZWwuc3BsaXQoJy8nKTsgcmV0dXJuIHsgZGVmYXVsdE1vZGVsUHJvdmlkZXI6IHByb3ZpZGVyID8/ICcnLCBkZWZhdWx0TW9kZWxJZDogbW9kZWwgPz8gJycgfSB9KSgpKSxcclxuICAgICAgfSlcclxuICAgICAgaWYgKCFvaykge1xyXG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBpZiAoZGF0YVsnYXV0b1N0YXJ0ZWQnXSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NURGMlx1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYxQScgKyBTdHJpbmcoZGF0YVsncnVuSWQnXSA/PyAnJykpXHJcbiAgICAgICAgc2V0RXhlY1RpdGxlKCcnKVxyXG4gICAgICAgIHNldEV4ZWNEZXNjKCcnKVxyXG4gICAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgc3RlcHMgPSAoZGF0YVsnc3RlcHMnXSBhcyBBcnJheTxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4gfCB1bmRlZmluZWQpID8/IFtdXHJcbiAgICAgIHNldFBsYW5Db25maXJtKHtcclxuICAgICAgICBjaGFuZ2VJZDogU3RyaW5nKGRhdGFbJ2NoYW5nZUlkJ10gPz8gJycpLFxyXG4gICAgICAgIHN0ZXBzOiBzdGVwcy5tYXAoKHN0ZXApID0+ICh7XHJcbiAgICAgICAgICBpZDogU3RyaW5nKHN0ZXBbJ2lkJ10gPz8gJycpLFxyXG4gICAgICAgICAgdGl0bGU6IFN0cmluZyhzdGVwWyd0aXRsZSddID8/ICcnKSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoc3RlcFsnZGVzY3JpcHRpb24nXSA/PyAnJyksXHJcbiAgICAgICAgICB0YXJnZXRGaWxlczogKHN0ZXBbJ3RhcmdldEZpbGVzJ10gYXMgc3RyaW5nW10gfCB1bmRlZmluZWQpID8/IFtdLFxyXG4gICAgICAgICAgcm9sZTogU3RyaW5nKHN0ZXBbJ3JvbGUnXSA/PyAnY29kaW5nJyksXHJcbiAgICAgICAgICBhY2NlcHRhbmNlOiBTdHJpbmcoc3RlcFsnYWNjZXB0YW5jZSddID8/ICcnKSxcclxuICAgICAgICAgIGZhaWx1cmVQb2xpY3k6IFN0cmluZyhzdGVwWydmYWlsdXJlUG9saWN5J10gPz8gJ3JldHJ5LWVzY2FsYXRlJyksXHJcbiAgICAgICAgICBlbmFibGVkOiBzdGVwWydlbmFibGVkJ10gIT09IGZhbHNlLFxyXG4gICAgICAgICAgbW9kZWxQcm92aWRlcjogJycsXHJcbiAgICAgICAgICBtb2RlbElkOiAnJyxcclxuICAgICAgICB9KSksXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChtb2RlbE9wdGlvbnMubGVuZ3RoID09PSAwICYmIG1vZGVsVGllcnMgPT09IG51bGwpIHZvaWQgbG9hZE1vZGVsQ29uZmlnKClcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU4QkExXHU1MjEyXHU1REYyXHU3NTFGXHU2MjEwXHVGRjBDXHU4QkY3XHU1NzI4XHU0RTBCXHU2NUI5XHU3ODZFXHU4QkE0XHU3RjE2XHU2MzkyXHU1NDBFXHU1NDJGXHU1MkE4JylcclxuICAgICAgc2V0RXhlY1RpdGxlKCcnKVxyXG4gICAgICBzZXRFeGVjRGVzYygnJylcclxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldEJ1c3kobnVsbClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBcdThCQTFcdTUyMTJcdTc4NkVcdThCQTRcdTk4NzVcdUZGMUFcdTRGRERcdTVCNThcdTdGMTZcdThGOTFcdUZGMDhcdTY1QjBcdTcyNDhcdTY3MkNcdThCQTFcdTUyMTJcdUZGMDlcdTVFNzZcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdTMwMDIgKi9cclxuICBjb25zdCBsYXVuY2hQbGFuID0gYXN5bmMgKHdpdGhFZGl0czogYm9vbGVhbik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgaWYgKHBsYW5Db25maXJtID09PSBudWxsKSByZXR1cm5cclxuICAgIHNldFBsYW5CdXN5KHRydWUpXHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgY2hhbmdlSWQgPSBwbGFuQ29uZmlybS5jaGFuZ2VJZFxyXG4gICAgICBpZiAod2l0aEVkaXRzKSB7XHJcbiAgICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9wbGFuL3VwZGF0ZScsIHsgY2hhbmdlSWQsIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcyB9KVxyXG4gICAgICAgIGlmICghb2spIHtcclxuICAgICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL2xhdW5jaCcsIHsgY2hhbmdlSWQgfSlcclxuICAgICAgaWYgKCFvaykge1xyXG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMUEnICsgU3RyaW5nKGRhdGFbJ3J1bklkJ10gPz8gJycpKVxyXG4gICAgICBzZXRQbGFuQ29uZmlybShudWxsKVxyXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxyXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0UGxhbkJ1c3koZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogXHU1MkEwXHU4RjdEIFJ1biBcdThCRTZcdTYwQzVcdUZGMDhcdTZCNjVcdTlBQTRcdTY1RjZcdTk1RjRcdTdFQkYgKyBcdTRFRkJcdTUyQTFcdTVERTVcdTRGNUNcdThCQjBcdTVGQzZcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBsb2FkUnVuRGV0YWlsID0gYXN5bmMgKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvZGV0YWlsP2lkPScgKyBlbmNvZGVVUklDb21wb25lbnQoaWQpICsgJyZzZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxyXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0UnVuRGV0YWlsKGRhdGEgYXMgUnVuRGV0YWlsKVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIHNldFJ1bkRldGFpbChudWxsKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NjA2Mlx1NTkwRFx1NjY4Mlx1NTA1Qy9cdTRFMkRcdTY1QUQvXHU1OTMxXHU4RDI1XHU3Njg0IFJ1blx1MzAwMiAqL1xyXG4gIGNvbnN0IHJlc3VtZVJ1biA9IGFzeW5jIChydW5JZDogc3RyaW5nLCBhY3Rpb246ICdjb250aW51ZScgfCAnc2tpcC1jdXJyZW50Jyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9yZXN1bWUnLCB7IHJ1bklkLCBhY3Rpb24gfSlcclxuICAgIGlmIChvaykge1xyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTYwNjJcdTU5MERcdTYyNjdcdTg4NENcdUZGMDgnICsgYWN0aW9uICsgJ1x1RkYwOScpXHJcbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXHJcbiAgICAgIGF3YWl0IGxvYWRSdW5EZXRhaWwocnVuSWQpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogXHU1MkEwXHU4RjdEXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHU1MjE3XHU4ODY4XHUzMDAyICovXHJcbiAgY29uc3QgbG9hZFNjaGVkdWxlZCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3NjaGVkdWxlZD9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxyXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0U2NoZWR1bGVkRGF0YSgoZGF0YSBhcyB7IHRhc2tzOiBTY2hlZHVsZWRUYXNrRW50cnlbXSB9KS50YXNrcyA/PyBbXSlcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBcdTUyMTdcdTg4NjhcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBcdTUyMUJcdTVFRkEgLyBcdTY2RjRcdTY1QjAgLyBcdTUyMjBcdTk2NjQgLyBcdTdBQ0JcdTUzNzNcdTYyNjdcdTg4NENcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdTMwMDIgKi9cclxuICBjb25zdCBhZGRTY2hlZHVsZWQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBjb25zdCBpbnRlcnZhbE1pbnV0ZXMgPSBOdW1iZXIoc2NoZWRJbnRlcnZhbClcclxuICAgIGlmIChzY2hlZE5hbWUudHJpbSgpID09PSAnJyB8fCAhTnVtYmVyLmlzRmluaXRlKGludGVydmFsTWludXRlcykgfHwgaW50ZXJ2YWxNaW51dGVzIDwgMSkge1xyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyBcdThCRjdcdTU4NkJcdTUxOTlcdTRFRkJcdTUyQTFcdTU0MERcdTc5RjBcdTRFMEVcdTY3MDlcdTY1NDhcdTk1RjRcdTk2OTRcdUZGMDhcdTUyMDZcdTk0OUZcdUZGMDknKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3NjaGVkdWxlZCcsIHtcclxuICAgICAgbmFtZTogc2NoZWROYW1lLnRyaW0oKSwgdHlwZTogc2NoZWRUeXBlLCBpbnRlcnZhbE1pbnV0ZXMsXHJcbiAgICAgIHRpdGxlOiBzY2hlZFRpdGxlLnRyaW0oKSB8fCB1bmRlZmluZWQsIGRlc2NyaXB0aW9uOiBzY2hlZERlc2MudHJpbSgpIHx8IHVuZGVmaW5lZCxcclxuICAgIH0pXHJcbiAgICBpZiAob2spIHtcclxuICAgICAgc2V0U2NoZWROYW1lKCcnKTsgc2V0U2NoZWRUaXRsZSgnJyk7IHNldFNjaGVkRGVzYygnJylcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHU1REYyXHU1MjFCXHU1RUZBJylcclxuICAgICAgYXdhaXQgbG9hZFNjaGVkdWxlZCgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBzY2hlZHVsZWRBY3Rpb24gPSBhc3luYyAocGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvc2NoZWR1bGVkLycgKyBwYXRoLCBib2R5KVxyXG4gICAgaWYgKG9rKSBhd2FpdCBsb2FkU2NoZWR1bGVkKClcclxuICAgIGVsc2Ugc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NTJBMFx1OEY3RFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1NTE2OFx1OTFDRlx1NjU3MFx1NjM2RVx1RkYwOFx1NTQyQlx1NTQwQ1x1NkI2NVx1NTdGQVx1N0VCRlx1RkYwOVx1MzAwMiAqL1xyXG4gIGNvbnN0IGxvYWRNZW1vcmllcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yaWVzP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXHJcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXRNZW1vcmllc0RhdGEoZGF0YSBhcyBNZW1vcmllc1BheWxvYWQpXHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gXHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogXHU2MkM5XHU1M0Q2XHU1NDBDXHU2QjY1XHVGRjFBXHU0RTA5XHU1NDExXHU1MjI0XHU1QjlBXHVGRjA4XHU1OTMxXHU2NTQ4XHU2M0QwXHU2ODQ4L1x1NjVCMFx1NTg5RVx1NTAxOVx1OTAwOS9cdTgxRUFcdTUyQThcdTdFRURcdTU0N0RcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBzeW5jTWVtb3JpZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBzZXRNZW1vcnlTeW5jaW5nKHRydWUpXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvc3luYycsIHt9KVxyXG4gICAgICBpZiAoIW9rICYmIGRhdGFbJ2Vycm9yJ10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHNldFN5bmNSZXBvcnQoeyBvazogZmFsc2UsIGVycm9yOiBTdHJpbmcoZGF0YVsnZXJyb3InXSkgfSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBzZXRTeW5jUmVwb3J0KGRhdGEgYXMgU3luY1JlcG9ydClcclxuICAgICAgYXdhaXQgbG9hZE1lbW9yaWVzKClcclxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgIHNldFN5bmNSZXBvcnQoeyBvazogZmFsc2UsIGVycm9yOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikgfSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldE1lbW9yeVN5bmNpbmcoZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogXHU1NDBDXHU2QjY1XHU2MkE1XHU1NDRBXHU1NDBFXHU3RUVEXHVGRjFBXHU2MjhBXHU5MDA5XHU0RTJEXHU3Njg0XHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2XHU5ODc5XHU4NDNEXHU0RTNBIHN0YWxlIC8gXHU1RjUyXHU2ODYzXHUzMDAyICovXHJcbiAgY29uc3QgYXBwbHlTeW5jID0gYXN5bmMgKGlkczogc3RyaW5nW10sIGFjdGlvbjogJ21hcmstc3RhbGUnIHwgJ2FyY2hpdmUnKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvc3luYy9hcHBseScsIHsgaWRzLCBhY3Rpb24gfSlcclxuICAgIHNldFN5bmNSZXBvcnQoKHByZXZpb3VzKSA9PiBwcmV2aW91cyA9PT0gbnVsbCA/IG51bGwgOiB7IC4uLnByZXZpb3VzLCBzdGFsZVByb3Bvc2FsczogKHByZXZpb3VzLnN0YWxlUHJvcG9zYWxzID8/IFtdKS5maWx0ZXIoKHByb3Bvc2FsKSA9PiAhaWRzLmluY2x1ZGVzKHByb3Bvc2FsLmlkKSkgfSlcclxuICAgIGF3YWl0IGxvYWRNZW1vcmllcygpXHJcbiAgfVxyXG5cclxuICAvKiogXHU4QkIwXHU1RkM2XHU3MkI2XHU2MDAxXHU2NENEXHU0RjVDXHVGRjA4XHU1RjUyXHU2ODYzL1x1NjA2Mlx1NTkwRFx1RkYwOVx1NEUwRVx1NTIwNlx1NjUyRlx1NUY1Mlx1NEUwMFx1MzAwMiAqL1xyXG4gIGNvbnN0IG1lbW9yeUFjdGlvbiA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvJyArIHBhdGgsIGJvZHkpXHJcbiAgICBpZiAob2spIGF3YWl0IGxvYWRNZW1vcmllcygpXHJcbiAgICBlbHNlIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcclxuICB9XHJcblxyXG4gIC8qKiBcdThCQjBcdTVGQzZcdThGNkNcdTdCMTRcdThCQjBcdUZGMUFcdTVGMTVcdTc1MjhcdThGREJcdTVCNjZcdTRFNjBcdTY4NjNcdTY4NDhcdTMwMDIgKi9cclxuICBjb25zdCBtZW1vcnlUb05vdGUgPSBhc3luYyAobWVtb3J5OiBNZW1vcnlFbnRyeSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMnLCB7XHJcbiAgICAgIHRpdGxlOiBtZW1vcnkudGl0bGUsXHJcbiAgICAgIGNvbnRlbnQ6IG1lbW9yeS5jb250ZW50ICsgKG1lbW9yeS5iYXNpc1NoYSAhPT0gbnVsbCA/IGBcXG5cdUZGMDhcdTY3NjVcdTZFOTBcdUZGMUFcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzYgJHttZW1vcnkuYmFzaXNTaGEuc2xpY2UoMCwgOCl9XHVGRjA5YCA6ICcnKSxcclxuICAgICAgdGFnczogJ1x1OEJCMFx1NUZDNiwgJyArIG1lbW9yeS50eXBlLFxyXG4gICAgfSlcclxuICAgIGlmIChvaykgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU1REYyXHU2MjhBXHU4QkIwXHU1RkM2XHU4RjZDXHU0RTNBXHU3QjE0XHU4QkIwJylcclxuICB9XHJcblxyXG4gIC8vIFx1NEYxQVx1OEJERFx1NjI1M1x1NUYwMC9cdTUyMDdcdTYzNjJcdTY1RjZcdTVCOThcdTY1QjlcdTRGMUEgY2xvc2VEZXRhaWxzIFx1NjUzNlx1OEQ3N1x1OEY2OFx1OTA1M1x1RkYxQlx1NzcwQlx1OTVFOFx1NzJEN1x1NkJDRiA1MDBtcyBcdTY4QzBcdTY3RTVcdUZGMENcclxuICAvLyBcdTUzRUFcdTg5ODFcdTVGNTNcdTUyNERcdTY3MDlcdTRGMUFcdThCRERcdTgwMENcdTVERTVcdTRGNUNcdTUzRjBcdTUyMTdcdTVCQkQgPCA1MHB4IFx1NUMzMVx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1RkYwOFx1Nzg2RVx1NUI5QVx1NjAyN1x1RkYwQ1x1NEUwRFx1NEY5RFx1OEQ1NiBlZmZlY3QgXHU2NUY2XHU1RThGXHVGRjA5XHUzMDAyXHJcbiAgLy8gXHU1NDBDXHU0RTAwXHU2MkNEXHU3RUY0XHU2MzAxXHU3RURGXHU4QkExXHU4ODRDXHU5NEIzXHU1MjM2XHVGRjFBXHU0RjFBXHU4QkREXHU1MjA3XHU2MzYyXHU0RjFBXHU2MzYyXHU2Mzg5XHU3RURGXHU4QkExXHU4ODRDIERPTVx1RkYwQ1x1NjgzN1x1NUYwRlx1ODg2OFx1N0YzQVx1NTkzMVx1NjVGNlx1NjMwOVx1NUY1M1x1NTI0RFxyXG4gIC8vIFx1Njc4NFx1NUVGQVx1NTRDOFx1NUUwQ1x1OTFDRFx1NkNFOFx1NTE2NVx1RkYwOFx1NUU0Mlx1N0I0OVx1RkYwQ1x1NURGMlx1NUI1OFx1NTcyOFx1NTIxOVx1OERGM1x1OEZDN1x1RkYwOVx1MzAwMlxyXG4gIGNvbnN0IGxheW91dEZhY2UgPSAocHJvcHMgYXMgdW5rbm93biBhcyB7IGxheW91dD86IHsgb3BlbkRldGFpbHM/OiAoKSA9PiB2b2lkIH0gfSkubGF5b3V0XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChwcm9wcy5sYXlvdXRNb2RlID09PSAnb3ZlcmxheScpIHJldHVyblxyXG4gICAgYXBwbHlTdGF0c0xpbmVDbGFtcCgpXHJcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYy1zdGF0cy1jbGFtcCcpID09PSBudWxsKSBhcHBseVN0YXRzTGluZUNsYW1wKClcclxuICAgICAgY29uc3QgY2hhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0nKVxyXG4gICAgICBjb25zdCB3aWR0aCA9IGNoYXQgPyBNYXRoLnJvdW5kKGNoYXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpIDogLTFcclxuICAgICAgaWYgKHdpZHRoICE9PSAtMSAmJiB3aWR0aCA8IDUwKSBsYXlvdXRGYWNlPy5vcGVuRGV0YWlscz8uKClcclxuICAgIH0sIDUwMClcclxuICAgIHJldHVybiAoKSA9PiB7IGNsZWFySW50ZXJ2YWwodGltZXIpIH1cclxuICB9LCBbcHJvcHMuc2Vzc2lvbklkLCBwcm9wcy5sYXlvdXRNb2RlLCBsYXlvdXRGYWNlXSlcclxuXHJcbiAgLyoqIFx1NEVFNSBpbXBvcnRhbnQgXHU1MTg1XHU4MDU0XHU2ODM3XHU1RjBGXHU3NkY0XHU2M0E1XHU1MTk5XHU1Qjk4XHU2NUI5XHU3RjUxXHU2ODNDXHU2QTIxXHU2NzdGXHVGRjA4XHU2NzAwXHU5QUQ4XHU0RjE4XHU1MTQ4XHU3RUE3XHVGRjBDXHU0RUZCXHU0RjU1XHU5MUNEXHU2RTMyXHU2N0QzXHU0RTBEXHU0RjFBXHU4OTg2XHU3NkQ2XHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgZnJhbWVUZW1wbGF0ZVNldCA9IChjaGF0UHg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJzaWRlYmFyQ29sXCJdJylcclxuICAgIGNvbnN0IHNpZGViYXJXID0gc2lkZWJhciA/IE1hdGgubWF4KDU2LCBNYXRoLnJvdW5kKHNpZGViYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpKSA6IDI4MFxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXScpXHJcbiAgICAgID8uc3R5bGUuc2V0UHJvcGVydHkoJ2dyaWQtdGVtcGxhdGUtY29sdW1ucycsIHNpZGViYXJXICsgJ3B4IG1pbm1heCgwLCAxZnIpICcgKyBjaGF0UHggKyAncHgnLCAnaW1wb3J0YW50JylcclxuICB9XHJcblxyXG4gIC8qKiBcdTY1MzZcdThENzdcdTYwMDFcdTZBMjFcdTY3N0ZcdUZGMUFcdTdCMkNcdTRFMDlcdTUyMTdcdUZGMDhcdTVCOThcdTY1QjlcdThCRTZcdTYwQzVcdUZGMDkwcHhcdTIwMTRcdTIwMTRcdTVERTVcdTRGNUNcdTUzRjBcdTUxNzNcdTk1RURcdTU0MEVcdTUzRjNcdTRGQTdcdTUzRUFcdTUxNDFcdThCQjhcdTgwNEFcdTU5MjlcdUZGMDhcdTRFMUFcdTRFM0JcdTg5QzRcdTUyMTlcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBjb2xsYXBzZUZyYW1lVGVtcGxhdGUgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cInNpZGViYXJDb2xcIl0nKVxyXG4gICAgY29uc3Qgc2lkZWJhclcgPSBzaWRlYmFyID8gTWF0aC5tYXgoNTYsIE1hdGgucm91bmQoc2lkZWJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkpIDogMjgwXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdJylcclxuICAgICAgPy5zdHlsZS5zZXRQcm9wZXJ0eSgnZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zJywgc2lkZWJhclcgKyAncHggbWlubWF4KDAsIDFmcikgMHB4JywgJ2ltcG9ydGFudCcpXHJcbiAgfVxyXG5cclxuICAvLyBcdTgwNEFcdTU5MjlcdTUyMTdcdTVCQkRcdThCQjBcdTVGQzZcdUZGMDhcdTVCOThcdTY1QjkgbGF5b3V0IHN0b3JlIFx1NzdBQ1x1NjAwMVx1RkYwOVx1RkYxQVx1NjMwMlx1OEY3RFx1NjA2Mlx1NTkwRCArIFx1NjJENlx1NjJGRFx1NzZGNFx1NTE5OVx1NTE4NVx1ODA1NFx1NkEyMVx1Njc3Rlx1MzAwMlxyXG4gIC8vIFx1NUZDNVx1OTg3Qlx1NTE5OSBpbXBvcnRhbnRcdTIwMTRcdTIwMTRMQVlPVVRfU1RZTEUgXHU3Njg0XHU2QTIxXHU2NzdGXHU4OUM0XHU1MjE5XHU0RTVGXHU2NjJGIGltcG9ydGFudFx1RkYwQ1x1OTc1RSBpbXBvcnRhbnRcclxuICAvLyBcdTUxODVcdTgwNTRcdTRGMUFcdTg4QUJcdTVCODNcdTUzOEJcdTUyMzZcdUZGMDhcdThGRDlcdTVDMzFcdTY2MkZcdTZCNjRcdTUyNERcIlx1NjJENlx1NjJGRFx1NzUxRlx1NjU0OFx1MzAwMVx1NTIzN1x1NjVCMFx1NTQwRVx1OEJCMFx1NUZDNlx1NEUyMlx1NTkzMVwiXHU3Njg0XHU1MzlGXHU1NkUwXHVGRjA5XHUzMDAyXHJcbiAgLy8gXHU1Qjk4XHU2NUI5IFJlYWN0IFx1OTFDRFx1NkUzMlx1NjdEM1x1NEYxQVx1NjUzOVx1NTE5OVx1NTE4NVx1ODA1NFx1NkEyMVx1Njc3Rlx1RkYwQ011dGF0aW9uT2JzZXJ2ZXIgXHU2MzA5XHU1RjUzXHU1MjREXHU1MDNDXHU1Qjg4XHU1MzZCXHU5MUNEXHU1MTk5XHJcbiAgLy8gXHVGRjA4XHU1MDNDXHU3NkY4XHU1NDBDXHU0RTBEXHU0RjFBXHU4OUU2XHU1M0QxXHU2NUIwXHU3Njg0IG11dGF0aW9uXHVGRjBDXHU2NUUwXHU1NkRFXHU3M0FGXHVGRjA5XHUzMDAyXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChwcm9wcy5sYXlvdXRNb2RlID09PSAnb3ZlcmxheScpIHJldHVyblxyXG4gICAgY29uc3Qgc2F2ZWQgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BjLmNoYXRXaWR0aCcpID8/ICcnKVxyXG4gICAgY29uc3QgYXBwbHkgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgIC8vIFx1NjMwMlx1OEY3RC9cdTVCOThcdTY1QjlcdTkxQ0RcdTZFMzJcdTY3RDNcdTY1RjZcdTY1RTBcdTY3NjFcdTRFRjZcdTU5M0FcdTU2REVcdTZBMjFcdTY3N0ZcdUZGMDhpbXBvcnRhbnQgXHU4OTg2XHU1MTk5XHVGRjFCXHU1MDNDXHU3NkY4XHU1NDBDXHU2NUY2XHU1Qjk4XHU2NUI5XHU2ODM3XHU1RjBGXHU1M0Q4XHU2NkY0XHJcbiAgICAgIC8vIFx1NEUwRFx1NEYxQVx1ODlFNlx1NTNEMVx1NjVCMFx1NzY4NCBtdXRhdGlvblx1RkYwQ1x1NjVFMFx1NTZERVx1NzNBRlx1RkYwOVx1MzAwMlx1NURFNVx1NEY1Q1x1NTNGMFx1NUYwMFx1Nzc0MCA9IFx1NTNGM1x1NTIxN1x1ODA0QVx1NTkyOVx1NTZGQVx1NUI5QVx1NUJCRFx1MzAwMlxyXG4gICAgICBjb25zdCBjaGF0VyA9IE51bWJlci5pc0Zpbml0ZShzYXZlZCkgJiYgc2F2ZWQgPj0gMjgwID8gc2F2ZWQgOiAzNjBcclxuICAgICAgZnJhbWVUZW1wbGF0ZVNldChjaGF0VylcclxuICAgIH1cclxuICAgIGFwcGx5KClcclxuICAgIGNvbnN0IGZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXScpXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHsgYXBwbHkoKSB9KVxyXG4gICAgaWYgKGZyYW1lICE9PSBudWxsKSBvYnNlcnZlci5vYnNlcnZlKGZyYW1lLCB7IGF0dHJpYnV0ZXM6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogWydzdHlsZSddIH0pXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcclxuICAgICAgLy8gXHU1REU1XHU0RjVDXHU1M0YwXHU1Mzc4XHU4RjdEXHVGRjFBXHU1MTk5XHU1MTY1XHU2NTM2XHU4RDc3XHU2MDAxXHU2QTIxXHU2NzdGXHVGRjA4XHU3QjJDXHU0RTA5XHU1MjE3IDBweFx1RkYwOVx1MjAxNFx1MjAxNFx1NEUxQVx1NEUzQlx1ODlDNFx1NTIxOVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1NTE3MyBcdTIxOTIgXHU1M0YzXHU0RkE3XHU1M0VBXHU1MTQxXHU4QkI4XHJcbiAgICAgIC8vIFx1ODA0QVx1NTkyOVx1MzAwMlx1NEUwRFx1ODBGRFx1NTIyMFx1OTY2NFx1NTE4NVx1ODA1NFx1NUM1RVx1NjAyN1x1RkYwOFx1NUI5OFx1NjVCOSBSZWFjdCBcdTRFMERcdTRGMUFcdTRFM0JcdTUyQThcdTg4NjVcdTUxOTlcdUZGMENcdTRGMUFcdTVCRkNcdTgxRjRcdTRFM0JcdTUzM0FcdTdBN0FcdTc2N0RcdUZGMDlcdUZGMUJcclxuICAgICAgLy8gXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHU4NjdEXHU1NkRFXHU1MjMwXHU4QkU1XHU1MjE3XHU0RjQ2IDAgXHU1QkJEXHU0RTBEXHU1M0VGXHU4OUMxXHVGRjA4MC4xLjIgXHU1QjlFXHU2RDRCXHU1NkRFXHU1RjUyXHVGRjA5XHUzMDAyXHJcbiAgICAgIGNvbGxhcHNlRnJhbWVUZW1wbGF0ZSgpXHJcbiAgICB9XHJcbiAgfSwgW3Byb3BzLmxheW91dE1vZGVdKVxyXG5cclxuICAvKiogXHU1MjA2XHU5Njk0XHU2NzYxXHU2MkQ2XHU2MkZEXHVGRjFBXHU4QzAzXHU2NTc0XHU4MDRBXHU1OTI5XHU1MjE3XHU1QkJEXHVGRjA4XHU1REU1XHU0RjVDXHU1M0YwXHU1NDM4XHU2NTM2XHU1MjY5XHU0RjU5XHU3QTdBXHU5NUY0XHVGRjA5XHVGRjBDXHU1MTk5XHU1MTY1IGxvY2FsU3RvcmFnZSBcdThCQjBcdTVGQzZcdTMwMDIgKi9cclxuICBjb25zdCBvbkRpdmlkZXJEb3duID0gKGU6IFJlYWN0LlBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCBvbk1vdmUgPSAoZXY6IFBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgICBjb25zdCB3aWR0aCA9IE1hdGgubWluKDkwMCwgTWF0aC5tYXgoMjgwLCB3aW5kb3cuaW5uZXJXaWR0aCAtIGV2LmNsaWVudFgpKVxyXG4gICAgICBmcmFtZVRlbXBsYXRlU2V0KHdpZHRoKVxyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGMuY2hhdFdpZHRoJywgU3RyaW5nKHdpZHRoKSlcclxuICAgIH1cclxuICAgIGNvbnN0IG9uVXAgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSlcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApXHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcClcclxuICB9XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsZXQgZGlzcG9zZWQgPSBmYWxzZVxyXG4gICAgbGV0IGdlbmVyYXRpb24gPSAwXHJcbiAgICBjb25zdCBsb2FkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgICBjb25zdCByZXF1ZXN0ID0gKytnZW5lcmF0aW9uXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvc3RhdGU/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSwgeyBoZWFkZXJzOiB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0gfSlcclxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YClcclxuICAgICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgaWYgKCFkaXNwb3NlZCAmJiByZXF1ZXN0ID09PSBnZW5lcmF0aW9uKSB7XHJcbiAgICAgICAgICBzZXRTdGF0ZShkYXRhIGFzIFdvcmtzcGFjZVN0YXRlKVxyXG4gICAgICAgICAgc2V0TG9hZEVycm9yKG51bGwpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xyXG4gICAgICAgIGlmICghZGlzcG9zZWQgJiYgcmVxdWVzdCA9PT0gZ2VuZXJhdGlvbikgc2V0TG9hZEVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdm9pZCBsb2FkKClcclxuICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB2b2lkIGxvYWQoKSB9LCA0MDAwKVxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgZGlzcG9zZWQgPSB0cnVlXHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXHJcbiAgICB9XHJcbiAgfSwgW3Byb3BzLnNlc3Npb25JZF0pXHJcblxyXG4gIC8vIFx1OEZEQlx1NTE2NVx1NjNEMFx1NEVBNC9cdTdCMTRcdThCQjAvUmV2aWV3IFx1OTg3NVx1N0I3RVx1NjVGNlx1NjMwOVx1OTcwMFx1NjJDOVx1NTNENlx1RkYwOFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1NEY5RFx1OEQ1Nlx1NEYxQVx1OEJERFx1NURFNVx1NEY1Q1x1NTMzQVx1RkYwQ1x1OEY2RVx1OEJFMlx1NjVFMFx1NjEwRlx1NEU0OVx1RkYwOVx1MzAwMlxyXG4gIC8vIFx1NjNEMFx1NEVBNFx1OTg3NVx1NEU1Rlx1NjJDOVx1N0IxNFx1OEJCMFx1RkYxQVx1OEY2RVx1NkIyMVx1NjcyQVx1NkQ4OFx1NTMxNlx1NjgwN1x1OEJCMFx1OTcwMFx1ODk4MVx1MzAwQ1x1NEUwQVx1NkIyMSBBSSBcdTYwM0JcdTdFRDNcdTY1RjZcdTk1RjRcdTMwMERcdTMwMDJcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHRhYiA9PT0gJ2NvbW1pdHMnKSB7IHZvaWQgbG9hZENvbW1pdHMoKTsgdm9pZCBsb2FkTm90ZXMoKSB9XHJcbiAgICBpZiAodGFiID09PSAnbm90ZXMnKSB7IHZvaWQgbG9hZE5vdGVzKCk7IHZvaWQgbG9hZE1lbW9yaWVzKCk7IGlmIChjb21taXRzRGF0YSA9PT0gbnVsbCkgdm9pZCBsb2FkQ29tbWl0cygpIH1cclxuICAgIGlmICh0YWIgPT09ICdyZXZpZXcnKSB2b2lkIGxvYWRJc3N1ZXMoKVxyXG4gICAgaWYgKHRhYiA9PT0gJ2V4ZWN1dGlvbicpIHsgdm9pZCBsb2FkU2NoZWR1bGVkKCk7IGlmIChydW5EZXRhaWwgIT09IG51bGwpIHZvaWQgbG9hZFJ1bkRldGFpbChydW5EZXRhaWwucnVuLmlkKSB9XHJcbiAgICBpZiAodGFiID09PSAnc2V0dGluZ3MnICYmIG1vZGVsVGllcnMgPT09IG51bGwpIHZvaWQgbG9hZE1vZGVsQ29uZmlnKClcclxuICB9LCBbdGFiLCBwcm9wcy5zZXNzaW9uSWRdKVxyXG5cclxuICBjb25zdCBsb2FkTW9kZWxDb25maWcgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9tb2RlbC1jb25maWcnKVxyXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSByZXR1cm5cclxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICBzZXRNb2RlbFRpZXJzKChkYXRhIGFzIHsgdGllcnM6IFJlY29yZDxzdHJpbmcsIHsgcHJvdmlkZXI6IHN0cmluZzsgbW9kZWw6IHN0cmluZyB9PiB9KS50aWVycyA/PyB7fSlcclxuICAgICAgc2V0TW9kZWxPcHRpb25zKChkYXRhIGFzIHsgb3B0aW9uczogQXJyYXk8eyBwcm92aWRlcjogc3RyaW5nOyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfT4gfSkub3B0aW9ucyA/PyBbXSlcclxuICAgICAgY29uc3QgY29uY3VycmVuY3kgPSAoZGF0YSBhcyB7IGZpeENvbmN1cnJlbmN5PzogbnVtYmVyIH0pLmZpeENvbmN1cnJlbmN5XHJcbiAgICAgIGlmICh0eXBlb2YgY29uY3VycmVuY3kgPT09ICdudW1iZXInKSBzZXRGaXhDb25jdXJyZW5jeShTdHJpbmcoY29uY3VycmVuY3kpKVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIFx1NkEyMVx1NTc4Qlx1OTE0RFx1N0Y2RVx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2MlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3Qgc2F2ZU1vZGVsQ29uZmlnID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgaWYgKG1vZGVsVGllcnMgPT09IG51bGwpIHJldHVyblxyXG4gICAgc2V0TW9kZWxTYXZpbmcodHJ1ZSlcclxuICAgIHNldE1vZGVsU2F2ZWQoZmFsc2UpXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjb25jdXJyZW5jeSA9IE51bWJlcihmaXhDb25jdXJyZW5jeSlcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbW9kZWwtY29uZmlnJywge1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdGllcnM6IG1vZGVsVGllcnMsIC4uLihOdW1iZXIuaXNGaW5pdGUoY29uY3VycmVuY3kpID8geyBmaXhDb25jdXJyZW5jeTogTWF0aC5tYXgoMSwgTWF0aC5taW4oMTAsIE1hdGgudHJ1bmMoY29uY3VycmVuY3kpKSkgfSA6IHt9KSB9KSxcclxuICAgICAgfSlcclxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgc2V0TW9kZWxTYXZlZCh0cnVlKVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBzZXRNb2RlbFNhdmVkKGZhbHNlKSB9LCAyNTAwKVxyXG4gICAgICB9XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRNb2RlbFNhdmluZyhmYWxzZSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHJlZnJlc2hTdGF0ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGNvbnN0IHJlZnJlc2hlZCA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9zdGF0ZT9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpLCB7IGhlYWRlcnM6IHsgYWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicgfSB9KVxyXG4gICAgaWYgKHJlZnJlc2hlZC5vaykgc2V0U3RhdGUoYXdhaXQgcmVmcmVzaGVkLmpzb24oKSBhcyBXb3Jrc3BhY2VTdGF0ZSlcclxuICB9XHJcblxyXG4gIC8qKiBcdTdFREZcdTRFMDBcdTUyQThcdTRGNUNcdTYyNjdcdTg4NENcdTU2NjhcdUZGMUFQT1NUIFx1NUJCRlx1NEUzQiBBUElcdUZGMDhcdTY0M0FcdTVFMjZcdTRGMUFcdThCREQgaWQgXHU0RjlCXHU2NzBEXHU1MkExXHU3QUVGXHU1QjlBXHU0RjREXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1MzNBXHVGRjA5XHVGRjBDXHU4RjkzXHU1MUZBXHU4RkRCXHU3RUQzXHU2NzlDXHU5NzYyXHU2NzdGXHVGRjBDXHU1QjhDXHU2MjEwXHU1NDBFXHU1MjM3XHU2NUIwXHU3MkI2XHU2MDAxXHUzMDAyICovXHJcbiAgY29uc3QgcnVuQWN0aW9uID0gYXN5bmMgKG5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgc2V0QnVzeShuYW1lKVxyXG4gICAgc2V0QWN0aW9uUmVzdWx0KG51bGwpXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KHBhdGgsIGJvZHkpXHJcbiAgICAgIGlmICghb2spIHtcclxuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoYFx1MjcxNyAke1N0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpfWApXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KGZvcm1hdEFjdGlvblJlc3VsdChkYXRhKSlcclxuICAgICAgYXdhaXQgcmVmcmVzaFN0YXRlKClcclxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdChgXHUyNzE3ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWApXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRCdXN5KG51bGwpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBydW5Cb290c3RyYXAgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBzZXRCb290c3RyYXBwaW5nKHRydWUpXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ib290c3RyYXAnLCB7fSlcclxuICAgICAgaWYgKCFvaykge1xyXG4gICAgICAgIHNldExvYWRFcnJvcihTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxyXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcclxuICAgICAgc2V0TG9hZEVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldEJvb3RzdHJhcHBpbmcoZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb25maXJtTWVtb3J5ID0gYXN5bmMgKG1lbW9yeUlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeS9jb25maXJtJywgeyBtZW1vcnlJZCB9KVxyXG4gICAgaWYgKG9rKSB7XHJcbiAgICAgIHNldFN0YXRlKChwcmV2aW91cykgPT4gcHJldmlvdXMgPT09IG51bGwgPyBwcmV2aW91cyA6IHtcclxuICAgICAgICAuLi5wcmV2aW91cyxcclxuICAgICAgICBtZW1vcmllczogcHJldmlvdXMubWVtb3JpZXM/Lm1hcCgobWVtb3J5KSA9PiBtZW1vcnkuaWQgPT09IG1lbW9yeUlkID8geyAuLi5tZW1vcnksIGlzSHVtYW5Db25maXJtZWQ6IHRydWUsIHRydXRoTGV2ZWw6ICdmYWN0JyB9IDogbWVtb3J5KSxcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHByb2plY3QgPSBzdGF0ZT8ucHJvamVjdCA/PyBudWxsXHJcbiAgY29uc3QgYm9vdHN0cmFwID0gc3RhdGU/LmJvb3RzdHJhcCA/PyBudWxsXHJcbiAgY29uc3QgY2hhbmdlcyA9IHN0YXRlPy5jaGFuZ2VzID8/IFtdXHJcbiAgY29uc3QgcnVucyA9IHN0YXRlPy5ydW5zID8/IFtdXHJcbiAgY29uc3QgdmVyaWZpY2F0aW9ucyA9IHN0YXRlPy52ZXJpZmljYXRpb25zID8/IFtdXHJcbiAgY29uc3QgY29uZmlybWVkID0gc3RhdGU/LmNvbmZpcm1lZCA/PyBbXVxyXG4gIGNvbnN0IGNvbmNlcHRzID0gc3RhdGU/LmNvbmNlcHRzID8/IFtdXHJcblxyXG4gIGNvbnN0IHRhYnM6IEFycmF5PHsga2V5OiBUYWJLZXk7IGxhYmVsOiBzdHJpbmcgfT4gPSBbXHJcbiAgICB7IGtleTogJ2NvbW1pdHMnLCBsYWJlbDogdCgndGFiLmNvbW1pdHMnKSB9LFxyXG4gICAgeyBrZXk6ICdvdmVydmlldycsIGxhYmVsOiB0KCd0YWIub3ZlcnZpZXcnKSB9LFxyXG4gICAgeyBrZXk6ICdleGVjdXRpb24nLCBsYWJlbDogdCgndGFiLmV4ZWN1dGlvbicpIH0sXHJcbiAgICB7IGtleTogJ3JldmlldycsIGxhYmVsOiB0KCd0YWIucmV2aWV3JykgfSxcclxuICAgIHsga2V5OiAnbm90ZXMnLCBsYWJlbDogdCgndGFiLm5vdGVzJykgfSxcclxuICAgIHsga2V5OiAnc2V0dGluZ3MnLCBsYWJlbDogdCgndGFiLnNldHRpbmdzJykgfSxcclxuICBdXHJcblxyXG4gIC8qKiBcdTY0Q0RcdTRGNUNcdTdFRDNcdTY3OUNcdTk3NjJcdTY3N0ZcdUZGMDhcdTYwM0JcdTg5QzhcdTk4NzVcdTdCN0VcdTc2ODRcdTVGRUJcdTYzNzdcdTUyQThcdTRGNUNcdTUxNzFcdTc1MjhcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCByZXN1bHRQYW5lbCA9IGFjdGlvblJlc3VsdCAhPT0gbnVsbFxyXG4gICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KENhcmQsIHsgdGl0bGU6IHQoJ3Jlc3VsdC5wYW5lbCcpIH0sXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLnJlc3VsdCB9LCBhY3Rpb25SZXN1bHQpKVxyXG4gICAgOiBudWxsXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcclxuICAvLyBcdTk4NzZcdTkwRThcdUZGMUFcdTRFRDNcdTVFOTNcdTY4MEYgKyBcdTYzRDBcdTRFQTRcdTU5MUFcdTkwMDlcdTRFMEJcdTYyQzlcdUZGMDhcdTdFQTYgMS81IFx1OUFEOFx1NUVBNlx1RkYwOVx1RkYxQlx1NEUwQlx1NjVCOVx1Njc3Rlx1NTc1N1x1NTM2MFx1NTE2OFx1NUJCRFx1MzAwMlxyXG4gIGNvbnN0IGFsbFRhcmdldHM6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IG1ldGE6IHN0cmluZzsgc2hhOiBzdHJpbmcgfT4gPSBbXVxyXG4gIGlmIChjb21taXRzRGF0YSAhPT0gbnVsbCkge1xyXG4gICAgaWYgKCFjb21taXRzRGF0YS53b3JraW5nLmlzQ2xlYW4pIHtcclxuICAgICAgYWxsVGFyZ2V0cy5wdXNoKHtcclxuICAgICAgICBrZXk6ICd3b3JraW5nJyxcclxuICAgICAgICBsYWJlbDogYFx1MjVDRiAke3QoJ3JlcG8ud29ya2luZycpfVx1RkYwOCR7Y29tbWl0c0RhdGEud29ya2luZy5maWxlQ291bnR9XHVGRjA5YCxcclxuICAgICAgICBtZXRhOiBjb21taXRzRGF0YS53b3JraW5nLmZpbGVzLnNsaWNlKDAsIDMpLm1hcCgoZmlsZSkgPT4gZmlsZS5wYXRoLnNwbGl0KCcvJykucG9wKCkpLmpvaW4oJywgJyksXHJcbiAgICAgICAgc2hhOiAnd29ya2luZycsXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IGNvbW1pdCBvZiBjb21taXRzRGF0YS5jb21taXRzKSB7XHJcbiAgICAgIGNvbnN0IGFkZHMgPSBjb21taXQuZmlsZXMucmVkdWNlKChzdW0sIGZpbGUpID0+IHN1bSArIGZpbGUuYWRkcywgMClcclxuICAgICAgY29uc3QgZGVscyA9IGNvbW1pdC5maWxlcy5yZWR1Y2UoKHN1bSwgZmlsZSkgPT4gc3VtICsgZmlsZS5kZWxzLCAwKVxyXG4gICAgICBhbGxUYXJnZXRzLnB1c2goe1xyXG4gICAgICAgIGtleTogY29tbWl0LnNoYSxcclxuICAgICAgICBsYWJlbDogY29tbWl0LnN1YmplY3QsXHJcbiAgICAgICAgbWV0YTogYCR7Y29tbWl0LnNob3J0SGFzaH0gXHUwMEI3ICR7Y29tbWl0LmF1dGhvcn0gXHUwMEI3ICR7bmV3IERhdGUoY29tbWl0LmRhdGUpLnRvTG9jYWxlU3RyaW5nKCl9IFx1MDBCNyArJHthZGRzfS8tJHtkZWxzfWAsXHJcbiAgICAgICAgc2hhOiBjb21taXQuc2hhLFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuICBjb25zdCBzaG9ydExhYmVsID0gKHNoYTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgIGlmIChzaGEgPT09ICd3b3JraW5nJykgcmV0dXJuIHQoJ3JlcG8ud29ya2luZycpXHJcbiAgICBjb25zdCB0YXJnZXQgPSBhbGxUYXJnZXRzLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5zaGEgPT09IHNoYSlcclxuICAgIHJldHVybiBgJHsodGFyZ2V0Py5tZXRhLnNwbGl0KCcgXHUwMEI3ICcpWzBdKSA/PyBzaGEuc2xpY2UoMCwgNyl9ICR7dGFyZ2V0Py5sYWJlbCA/PyAnJ31gLnRyaW0oKVxyXG4gIH1cclxuICBjb25zdCBmaWx0ZXJlZFRhcmdldHMgPSBwaWNrZXJGaWx0ZXIudHJpbSgpID09PSAnJ1xyXG4gICAgPyBhbGxUYXJnZXRzXHJcbiAgICA6IGFsbFRhcmdldHMuZmlsdGVyKChlbnRyeSkgPT4gKGVudHJ5LmxhYmVsICsgZW50cnkubWV0YSkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhwaWNrZXJGaWx0ZXIudHJpbSgpLnRvTG93ZXJDYXNlKCkpKVxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgXHU4RjZFXHU2QjIxXHU4MDVBXHU3QzdCXHU0RTBFXHU2NzJBXHU2RDg4XHU1MzE2XHU2ODA3XHU4QkIwIFx1MjUwMFx1MjUwMCBcdTgwNUFcdTdDN0JcdTg5QzRcdTUyMTlcdTRFMEVcdTY3MERcdTUyQTFcdTdBRUYgY2x1c3RlckNvbW1pdHMgXHU0RTAwXHU4MUY0XHVGRjA4XHU2NUY2XHU5NUY0XHU3QTk3XHU1M0UzICtcclxuICAvLyBcdTY1ODdcdTRFRjZcdTk2RjZcdTkxQ0RcdTUzRTBcdUZGMENcdTg5QzEgY29tbWl0LXJvdW5kcy50c1x1RkYwOVx1RkYxQlx1NjcyQVx1NkQ4OFx1NTMxNiA9IFx1NEUwQVx1NkIyMSBBSSBcdTYwM0JcdTdFRDNcdTRFNEJcdTU0MEVcdTc2ODRcdTYzRDBcdTRFQTRcdTMwMDJcclxuICBjb25zdCBjb21taXRCeVNoYSA9IG5ldyBNYXAoKGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKS5tYXAoKGNvbW1pdCkgPT4gW2NvbW1pdC5zaGEsIGNvbW1pdF0pKVxyXG4gIGNvbnN0IGxhc3RTdW1tYXJ5QXQgPSBub3Rlc1xyXG4gICAgLmZpbHRlcigobm90ZSkgPT4gbm90ZS5zaGEgPT09ICdzdW1tYXJ5JylcclxuICAgIC5zb3J0KChsZWZ0LCByaWdodCkgPT4gcmlnaHQuY3JlYXRlZEF0IC0gbGVmdC5jcmVhdGVkQXQpWzBdPy5jcmVhdGVkQXRcclxuICBjb25zdCBpc1VuZGlnZXN0ZWQgPSAoY29tbWl0OiB7IHNoYTogc3RyaW5nOyBkYXRlOiBudW1iZXIgfSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgaWYgKGNvbW1pdC5zaGEgPT09ICd3b3JraW5nJykgcmV0dXJuIGZhbHNlXHJcbiAgICAvLyBcdTVERjJcdTc1MUZcdTYyMTBcdThGQzcgQUkgXHU4OUUzXHU4QkZCXHVGRjA4YW5hbHl6ZWQgXHU2ODA3XHU4QkIwXHVGRjA5XHU1MzczXHU4OUM2XHU0RTNBXHU1REYyXHU2RDg4XHU1MzE2XHVGRjFCXHU1NDI2XHU1MjE5XHU2NUIwXHU0RThFXHU0RTBBXHU2QjIxXHU2MDNCXHU3RUQzXHU3Njg0XHU5MEZEXHU3Qjk3XHU2NzJBXHU2RDg4XHU1MzE2XHUzMDAyXHJcbiAgICBpZiAoY29tbWl0QnlTaGEuZ2V0KGNvbW1pdC5zaGEpPy5hbmFseXplZCA9PT0gdHJ1ZSkgcmV0dXJuIGZhbHNlXHJcbiAgICByZXR1cm4gbGFzdFN1bW1hcnlBdCA9PT0gdW5kZWZpbmVkIHx8IGNvbW1pdC5kYXRlID4gbGFzdFN1bW1hcnlBdFxyXG4gIH1cclxuICBjb25zdCB1bmRpZ2VzdGVkQ291bnQgPSAoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLmZpbHRlcigoY29tbWl0KSA9PiBpc1VuZGlnZXN0ZWQoY29tbWl0KSkubGVuZ3RoXHJcbiAgY29uc3QgY29tbWl0Um91bmRzID0gY2x1c3RlckludG9Sb3VuZHMoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pXHJcblxyXG4gIC8qKiBcdTRFMEJcdTYyQzlcdTY4NDZcdTc2ODRcdTYzRDBcdTRFQTRcdTg4NENcdUZGMDhcdTU0MkJcdTY3MkFcdTZEODhcdTUzMTZcdTU3MDZcdTcwQjlcdUZGMUJ3b3JraW5nIFx1Njc2MVx1NzZFRVx1NEUwRFx1NjgwN1x1RkYwOVx1MzAwMiAqL1xyXG4gIGNvbnN0IHJlbmRlclBpY2tlclJvdyA9IChlbnRyeTogeyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgbWV0YTogc3RyaW5nOyBzaGE6IHN0cmluZyB9KTogUmVhY3QuUmVhY3ROb2RlID0+IHtcclxuICAgIGNvbnN0IGNvbW1pdCA9IGNvbW1pdEJ5U2hhLmdldChlbnRyeS5zaGEpXHJcbiAgICBjb25zdCB1bmRpZ2VzdGVkID0gY29tbWl0ICE9PSB1bmRlZmluZWQgJiYgaXNVbmRpZ2VzdGVkKGNvbW1pdClcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBrZXk9e2VudHJ5LmtleX1cclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgcGFkZGluZzogJzdweCAxMnB4JywgY3Vyc29yOiAncG9pbnRlcicsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoZW50cnkuc2hhKSA/ICdyZ2JhKDM3LDk5LDIzNSwwLjA3KScgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgIH19XHJcbiAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHRvZ2dsZVRhcmdldChlbnRyeS5zaGEpIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3BhbiBzdHlsZT17eyB3aWR0aDogJzE0cHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsIGZvbnRXZWlnaHQ6IDcwMCB9fT5cclxuICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoZW50cnkuc2hhKSA/ICdcdTI3MTMnIDogJyd9XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIHt1bmRpZ2VzdGVkICYmIChcclxuICAgICAgICAgIDxzcGFuIHRpdGxlPXt0KCdwaWNrZXIudW5kaWdlc3RlZCcpfSBzdHlsZT17eyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSwgZm9udFNpemU6ICcxMHB4JywgZmxleFNocmluazogMCB9fT5cdTI1Q0Y8L3NwYW4+XHJcbiAgICAgICAgKX1cclxuICAgICAgICA8c3BhbiBzdHlsZT17eyBtaW5XaWR0aDogMCB9fT5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCwgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19PntlbnRyeS5sYWJlbH08L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57ZW50cnkubWV0YX08L3NwYW4+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcblxyXG4gIGNvbnN0IGltcGFjdFJpc2tDb2xvciA9IHRoZW1lQXdhcmVUZXh0KGltcGFjdCA9PT0gbnVsbCA/ICcjNTc2MDZhJyA6IChSSVNLX0NPTE9SW2ltcGFjdC5yaXNrTGV2ZWxdID8/ICcjNTc2MDZhJykpXHJcblxyXG4gIGNvbnN0IGNvbW1pdHNUYWIgPSAoXHJcbiAgICA8PlxyXG4gICAgICB7LyogXHU0RUQzXHU1RTkzXHU2ODBGICovfVxyXG4gICAgICA8Q2FyZD5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9Pntjb21taXRzRGF0YT8uYnJhbmNoID8/ICdcdTIwMTQnfTwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcgfX0+e2NvbW1pdHNEYXRhPy5yb290UGF0aCA/PyBwcm9qZWN0Py5yb290UGF0aCA/PyAnXHUyMDE0J308L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XHJcbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZENvbW1pdHMoKSB9fT57dCgnYWN0aW9uLnJlZnJlc2gnKX08L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtidXN5ICE9PSBudWxsfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdzY2FuSGlzdG9yeScsICcvcHJvamVjdC1jb250cm9sL2FwaS9ib290c3RyYXAnLCB7IGluY2x1ZGVIaXN0b3J5OiB0cnVlLCBzdW1tYXJpemU6IHRydWUsIG1heENvbW1pdHM6IDMwIH0pIH19XHJcbiAgICAgICAgICA+e2J1c3kgPT09ICdzY2FuSGlzdG9yeScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgncmVwby5zY2FuSGlzdG9yeScpfTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0NhcmQ+XHJcbiAgICAgIHsvKiBcdTYzRDBcdTRFQTRcdTU5MUFcdTkwMDlcdTRFMEJcdTYyQzlcdUZGMDhcdTdEMjdcdTUxRDFcdUZGMUJcdTkwMDlcdTRFMkRcdTUxODVcdTVCQjlcdTVCOENcdTY1NzRcdTVDNTVcdTc5M0FcdUZGMENcdTUxNDFcdThCQjhcdTgxRUFcdTcxMzZcdTYzNjJcdTg4NENcdUZGMDkgKi99XHJcbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdwaWNrZXIudGl0bGUnKX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgd2lkdGg6ICcxMDAlJywgdGV4dEFsaWduOiAnbGVmdCcsIGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCB3aGl0ZVNwYWNlOiAnbm9ybWFsJyB9fVxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldFBpY2tlck9wZW4oIXBpY2tlck9wZW4pIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1pbldpZHRoOiAwIH19PlxyXG4gICAgICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwXHJcbiAgICAgICAgICAgICAgICA/IHQoJ3BpY2tlci5wbGFjZWhvbGRlcicpXHJcbiAgICAgICAgICAgICAgICA6IGAke3QoJ3BpY2tlci5zZWxlY3RlZCcpfSAke3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGh9XHVGRjFBJHtzZWxlY3RlZFRhcmdldHMubWFwKHNob3J0TGFiZWwpLmpvaW4oJ1x1RkYxQicpfWB9XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWFyZ2luTGVmdDogJzhweCcsIGZsZXhTaHJpbms6IDAgfX0+XHUyNUJFPC9zcGFuPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICB7cGlja2VyT3BlbiAmJiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIHpJbmRleDogMjkgfX0gb25DbGljaz17KCkgPT4geyBzZXRQaWNrZXJPcGVuKGZhbHNlKSB9fSAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICdjYWxjKDEwMCUgKyA0cHgpJywgbGVmdDogMCwgcmlnaHQ6IDAsIHpJbmRleDogMzAsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsIGJveFNoYWRvdzogJzAgOHB4IDI0cHggcmdiYSgwLDAsMCwwLjEyKScsIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzhweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5pbnB1dH1cclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dCgncGlja2VyLmZpbHRlcicpfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwaWNrZXJGaWx0ZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBpY2tlckZpbHRlcihlLnRhcmdldC52YWx1ZSkgfX1cclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgeyhjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSkuc29tZSgoY29tbWl0KSA9PiBpc1VuZGlnZXN0ZWQoY29tbWl0KSkgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3BpY2tlci51bmRpZ2VzdGVkJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNlbGVjdENvbW1pdHMoKGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKS5maWx0ZXIoKGNvbW1pdCkgPT4gaXNVbmRpZ2VzdGVkKGNvbW1pdCkpLm1hcCgoY29tbWl0KSA9PiBjb21taXQuc2hhKSkgfX1cclxuICAgICAgICAgICAgICAgICAgICA+XHUyNUNGIHt0KCdwaWNrZXIuc2VsZWN0QWxsVW5kaWdlc3RlZCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHNldFNlbGVjdGVkVGFyZ2V0cyhbXSkgfX0+e3QoJ3BpY2tlci5jbGVhcicpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1heEhlaWdodDogNDIwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgICAge3BpY2tlckZpbHRlci50cmltKCkgPT09ICcnID8gKFxyXG4gICAgICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBcdTZENEZcdTg5QzhcdTg5QzZcdTU2RkVcdUZGMUF3b3JraW5nIFx1Njc2MVx1NzZFRSArIFx1NjMwOVx1OEY2RVx1NkIyMVx1NTIwNlx1N0VDNFx1NzY4NFx1NjNEMFx1NEVBNFx1RkYwOFx1NTM1NVx1NjNEMFx1NEVBNFx1OEY2RVx1NEUwRFx1NjYzRVx1NzkzQVx1N0VDNFx1NTkzNFx1RkYwQ1x1OTA3Rlx1NTE0RFx1NTY2QVx1OTdGM1x1RkYwOVx1MzAwMlxyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZXM6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtpbmcgPSBhbGxUYXJnZXRzLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5zaGEgPT09ICd3b3JraW5nJylcclxuICAgICAgICAgICAgICAgICAgICAgIGlmICh3b3JraW5nICE9PSB1bmRlZmluZWQpIG5vZGVzLnB1c2gocmVuZGVyUGlja2VyUm93KHdvcmtpbmcpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnlTaGEgPSBuZXcgTWFwKGFsbFRhcmdldHMuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuc2hhICE9PSAnd29ya2luZycpLm1hcCgoZW50cnkpID0+IFtlbnRyeS5zaGEsIGVudHJ5XSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb21taXRSb3VuZHMuZm9yRWFjaCgocm91bmQsIHJvdW5kSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW50cmllcyA9IHJvdW5kLmNvbW1pdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChjb21taXQpID0+IGJ5U2hhLmdldChjb21taXQuc2hhKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IG1ldGE6IHN0cmluZzsgc2hhOiBzdHJpbmcgfSA9PiBlbnRyeSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cmllcy5sZW5ndGggPT09IDApIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cmllcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKHJlbmRlclBpY2tlclJvdyhlbnRyaWVzWzBdISkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hhcyA9IGVudHJpZXMubWFwKChlbnRyeSkgPT4gZW50cnkuc2hhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGxTZWxlY3RlZCA9IHNoYXMuZXZlcnkoKHNoYSkgPT4gc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHNoYSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2Byb3VuZC0ke3JvdW5kSW5kZXh9YH0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnOHB4JywgcGFkZGluZzogJzZweCAxMnB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwzLCByZ2JhKDUsNSw1LDAuMDYpKScsIGZvbnRTaXplOiAnMTFweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx1RDgzRFx1REREMyB7dChyb3VuZEluZGV4ID09PSAwID8gJ3BpY2tlci5yb3VuZExhdGVzdCcgOiAncGlja2VyLnJvdW5kJykucmVwbGFjZSgne259JywgU3RyaW5nKHJvdW5kSW5kZXggKyAxKSl9IFx1MDBCNyB7U3RyaW5nKGVudHJpZXMubGVuZ3RoKX0ge3QoJ3JlcG8uY29tbWl0cycpfSBcdTAwQjcge25ldyBEYXRlKHJvdW5kLmZpcnN0QXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpfVx1MjAxM3tuZXcgRGF0ZShyb3VuZC5sYXN0QXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTBweCcgfX0gb25DbGljaz17KCkgPT4geyBzZWxlY3RSb3VuZChzaGFzKSB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2FsbFNlbGVjdGVkID8gdCgncGlja2VyLnJvdW5kQ2xlYXInKSA6IHQoJ3BpY2tlci5yb3VuZFNlbGVjdCcpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykgbm9kZXMucHVzaChyZW5kZXJQaWNrZXJSb3coZW50cnkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2Rlc1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKClcclxuICAgICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZFRhcmdldHMubWFwKChlbnRyeSkgPT4gcmVuZGVyUGlja2VyUm93KGVudHJ5KSlcclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgeyhwaWNrZXJGaWx0ZXIudHJpbSgpID09PSAnJyA/IGFsbFRhcmdldHMgOiBmaWx0ZXJlZFRhcmdldHMpLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdwaWNrZXIubm9NYXRjaCcpfTwvZGl2Pn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpblRvcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ3BpY2tlci5oaW50Jyl9PC9zcGFuPlxyXG4gICAgICAgICAge3VuZGlnZXN0ZWRDb3VudCA+IDAgJiYgKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxzcGFuIHRpdGxlPXt0KCdwaWNrZXIudW5kaWdlc3RlZCcpfSBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSB9fT5cclxuICAgICAgICAgICAgICAgIFx1MjVDRiB7dCgncGlja2VyLnVuZGlnZXN0ZWRDb3VudCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyh1bmRpZ2VzdGVkQ291bnQpKX1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gdGl0bGU9e3QoJ3BpY2tlci5kaWdlc3RBbGxIaW50Jyl9IG9uQ2xpY2s9e2RpZ2VzdEFsbH0+XHUyNkExIHt0KCdwaWNrZXIuZGlnZXN0QWxsJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIHsoZGV0YWlsUXVldWVkQ291bnQgPiAwIHx8IGRldGFpbFJ1bm5pbmdDb3VudCA+IDApICYmIChcclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnI2RjZGNhYScpfT5cclxuICAgICAgICAgICAgICB7ZGV0YWlsUnVubmluZ0NvdW50ID4gMCA/IHQoJ2RldGFpbC5haUxvYWRpbmcnKSA6ICcnfVxyXG4gICAgICAgICAgICAgIHtkZXRhaWxSdW5uaW5nQ291bnQgPiAwICYmIGRldGFpbFF1ZXVlZENvdW50ID4gMCA/ICcgJyA6ICcnfVxyXG4gICAgICAgICAgICAgIHtkZXRhaWxRdWV1ZWRDb3VudCA+IDAgPyAnXHUyM0YzICcgKyB0KCdkZXRhaWwucXVldWVkJykucmVwbGFjZSgne259JywgU3RyaW5nKGRldGFpbFF1ZXVlZENvdW50KSkgOiAnJ31cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9DYXJkPlxyXG5cclxuICAgICAge2NvbW1pdHNFcnJvciAhPT0gbnVsbCAmJiA8Q2FyZD48ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXBvLmxvYWRGYWlsZWQnKX06IHtjb21taXRzRXJyb3J9PC9kaXY+PC9DYXJkPn1cclxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDAgJiYgPENhcmQ+PGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZGV0YWlsLnBpY2snKX08L2Rpdj48L0NhcmQ+fVxyXG5cclxuICAgICAgey8qIFx1NURFNVx1NEY1Q1x1OEY2RVx1NkIyMVx1NTNEOVx1NEU4Qlx1RkYxQVx1NTkxQVx1NjNEMFx1NEVBNFx1NjU3NFx1NEY1M1x1ODlFM1x1OEJGQiAqL31cclxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5maWx0ZXIoKHRhcmdldCkgPT4gdGFyZ2V0ICE9PSAnd29ya2luZycpLmxlbmd0aCA+PSAyICYmIChcclxuICAgICAgICA8Q2FyZCB0aXRsZT17J1x1RDgzRFx1RENENiAnICsgdCgnbmFycmF0aXZlLnRpdGxlJyl9PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206IG5hcnJhdGl2ZSA9PT0gbnVsbCA/ICcwJyA6ICc4cHgnIH19PlxyXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17bmFycmF0aXZlQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWROYXJyYXRpdmUoKSB9fT5cclxuICAgICAgICAgICAgICB7bmFycmF0aXZlQnVzeSA/IHQoJ25hcnJhdGl2ZS5ydW5uaW5nJykgOiAnXHUyNzI4ICcgKyB0KCduYXJyYXRpdmUuZ2VuZXJhdGUnKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgbmFycmF0aXZlLmNhY2hlZCAmJiAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ2NhY2hlLmhpdCcpfXtuYXJyYXRpdmUuZ2VuZXJhdGVkQXQgIT09IHVuZGVmaW5lZCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShuYXJyYXRpdmUuZ2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ308L3NwYW4+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgcmVuZGVyQ29zdEJhZGdlKG5hcnJhdGl2ZS5jb3N0VXNkLCB0KCdjb3N0LnRvb2x0aXAnKSl9XHJcbiAgICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgKFxyXG4gICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17bmFycmF0aXZlQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWROYXJyYXRpdmUodHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAge25hcnJhdGl2ZUVycm9yICE9PSAnJyAmJiA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5lbXB0eSwgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDEyNDJmJykgfX0+e25hcnJhdGl2ZUVycm9yfTwvZGl2Pn1cclxuICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luVG9wOiAnNHB4JyB9fT57dCgnbmFycmF0aXZlLmRpZ2VzdEhpbnQnKX08L2Rpdj59XHJcbiAgICAgICAgICB7bmFycmF0aXZlICE9PSBudWxsICYmIChcclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyB9fT57cmVuZGVyU3RydWN0dXJlZENvbnRlbnQobmFycmF0aXZlLm5hcnJhdGl2ZSl9PC9kaXY+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvQ2FyZD5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIHsvKiBcdTZCQ0ZcdTY3NjFcdTkwMDlcdTRFMkRcdTYzRDBcdTRFQTRcdTc2ODQgQUkgXHU4OUUzXHU4QkZCICovfVxyXG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLm1hcCgodGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZCA9IGRldGFpbHNbdGFyZ2V0XVxyXG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IChkPy5jb21taXQ/Lm1lc3NhZ2UgPz8gdGFyZ2V0LnNsaWNlKDAsIDgpKVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8Q2FyZCBrZXk9e2BkLSR7dGFyZ2V0fWB9IHRpdGxlPXtgXHVEODNEXHVERDBEICR7bGFiZWx9JHt0YXJnZXQgIT09ICd3b3JraW5nJyA/IGBcdUZGMDgke3RhcmdldC5zbGljZSgwLCA4KX1cdUZGMDlgIDogJyd9YH0+XHJcbiAgICAgICAgICAgIHtkICE9PSB1bmRlZmluZWQgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzQ2FjaGVkID09PSB0cnVlICYmIChcclxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57dCgnY2FjaGUuaGl0Jyl9e2QuYW5hbHlzaXNHZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShkLmFuYWx5c2lzR2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAge3JlbmRlckNvc3RCYWRnZShkLmFuYWx5c2lzQ29zdFVzZCwgdCgnY29zdC50b29sdGlwJykgKyAoZC5hbmFseXNpc1Rva2VucyA/IGBcdUZGMDhpbiAke2QuYW5hbHlzaXNUb2tlbnMuaW5wdXR9IC8gb3V0ICR7ZC5hbmFseXNpc1Rva2Vucy5vdXRwdXR9IHRva2Vuc1x1RkYwOWAgOiAnJykpfVxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBsb2FkRGV0YWlsKHRhcmdldCwgdHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdkZXRhaWwuc2F2ZU5vdGVIaW50Jyl9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGEgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/ICd3b3JraW5nJyA6IHRhcmdldFxyXG4gICAgICAgICAgICAgICAgICAgIHZvaWQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogYCR7dCgnZGV0YWlsLnNhdmVOb3RlVGl0bGUnKX1cdUZGMUEkeyhkLmNvbW1pdD8ubWVzc2FnZSA/PyB0YXJnZXQpLnNsaWNlKDAsIDYwKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDogW2BcdTMwMTBcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDhcdTMwMTFcXG4ke2QuYW5hbHlzaXMud2hhdH1gLCBgXHUzMDEwXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxXHUzMDExXFxuJHsoZC5hbmFseXNpcy5sb2dpYyA/PyBbXSkuam9pbignXHVGRjFCJyl9YCwgYFx1MzAxMFx1OThDRVx1OTY2OVx1NzBCOVx1MzAxMVxcbiR7KGQuYW5hbHlzaXMucmlza3MgPz8gW10pLmpvaW4oJ1x1RkYxQicpfWBdLmZpbHRlcigoYmxvY2spID0+ICFibG9jay5lbmRzV2l0aCgnXHUzMDExXFxuJykpLmpvaW4oJ1xcblxcbicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc2hhLCB0YWdzOiAnXHU2ODM4XHU2N0U1JyxcclxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCh7IG9rIH0pID0+IHsgc2V0QWN0aW9uUmVzdWx0KG9rID8gJ1x1MjcxMyBcdTVERjJcdTVCNThcdTRFM0FcdTdCMTRcdThCQjBcdUZGMDhcdTdCMTRcdThCQjBcdTk4NzVcdTUzRUZcdTY3RTVcdTc3MEJcdUZGMDknIDogJ1x1MjcxNyBcdTRGRERcdTVCNThcdTU5MzFcdThEMjUnKSA7IGlmIChvaykgdm9pZCBsb2FkTm90ZXMoKSB9KVxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlx1RDgzRFx1RENCRSB7dCgnZGV0YWlsLnNhdmVOb3RlJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICB0aXRsZT17dCgnZGV0YWlsLnNhdmVNZW1vcnlIaW50Jyl9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGEgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/IHVuZGVmaW5lZCA6IHRhcmdldFxyXG4gICAgICAgICAgICAgICAgICAgIHZvaWQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgbWVtb3J5VHlwZTogJ3Jpc2tfaG90c3BvdCcsIHNvdXJjZVRhZzogJ3JldmlldycsIGJhc2lzU2hhOiBzaGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogYFx1NjgzOFx1NjdFNVx1N0VEM1x1OEJCQVx1RkYxQSR7KGQuY29tbWl0Py5tZXNzYWdlID8/IHRhcmdldCkuc2xpY2UoMCwgNjApfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBbZC5hbmFseXNpcy53aGF0LCAoZC5hbmFseXNpcy5yaXNrcyA/PyBbXSkuam9pbignXHVGRjFCJyldLmZpbHRlcigocGFydCkgPT4gcGFydCAhPT0gJycpLmpvaW4oJ1xcbi0tLVxcbicpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHsgb2sgfSkgPT4geyBzZXRBY3Rpb25SZXN1bHQob2sgPyAnXHUyNzEzIFx1NURGMlx1NkM4OVx1NkRDMFx1NEUzQVx1OEJCMFx1NUZDNlx1RkYwOFx1NUY4NVx1Nzg2RVx1OEJBNFx1OTYxRlx1NTIxN1x1RkYwOScgOiAnXHUyNzE3IFx1NEZERFx1NUI1OFx1NTkzMVx1OEQyNScpOyBpZiAob2spIHZvaWQgbG9hZE1lbW9yaWVzKCkgfSlcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cdUQ4M0VcdURERTAge3QoJ2RldGFpbC5zYXZlTWVtb3J5Jyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHtkID09PSB1bmRlZmluZWQgPyAoXHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57ZGV0YWlsU3RhdHVzW3RhcmdldF0gPT09ICdxdWV1ZWQnID8gJ1x1MjNGMyAnICsgdCgnZGV0YWlsLmNhcmRRdWV1ZWQnKSA6IHQoJ2RldGFpbC5haUxvYWRpbmcnKX08L2Rpdj5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAge2QuY29tbWl0ICE9PSBudWxsICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5jb21taXRNZXRhfT57ZC5jb21taXQuYXV0aG9yfSBcdTAwQjcge25ldyBEYXRlKGQuY29tbWl0LmRhdGUpLnRvTG9jYWxlU3RyaW5nKCl9IFx1MDBCNyB7ZC5maWxlcy5sZW5ndGh9IHt0KCdkZXRhaWwuZmlsZXMnKX0gXHUwMEI3ICt7ZC5pbnNlcnRpb25zfS8te2QuZGVsZXRpb25zfTwvZGl2Pn1cclxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLndoYXQgIT09ICcnICYmIChcclxuICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzhweCcgfX0+e3QoJ2RldGFpbC53aGF0Jyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLndoYXR9PntkLmFuYWx5c2lzLndoYXR9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLmxvZ2ljLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zZWN0aW9uVGl0bGV9Pnt0KCdkZXRhaWwubG9naWMnKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5sb2dpYy5tYXAoKHN0ZXAsIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17c3R5bGVzLmxvZ2ljU3RlcH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJywgZm9udFdlaWdodDogNjAwIH19PntpICsgMX0uPC9zcGFuPntzdGVwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLnJpc2tzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnNnB4JyB9fT57dCgnZGV0YWlsLnJpc2snKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5yaXNrcy5tYXAoKHJpc2ssIGkpID0+IDxkaXYga2V5PXtpfSBzdHlsZT17eyAuLi5zdHlsZXMucmlza0l0ZW0sIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzlhNjcwMCcpIH19Plx1MjZBMCB7cmVuZGVyV2l0aFBlZWsocmlzayl9PC9kaXY+KX1cclxuICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgey8qIFx1NjU4N1x1NEVGNlx1NkUwNVx1NTM1NSArIFx1OTAxMFx1NjU4N1x1NEVGNlx1OUFEOFx1NEVBRVx1NUJGOVx1NkJENCAqL31cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnMTBweCcgfX0+e3QoJ2RldGFpbC5maWxlcycpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxyXG4gICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAge2QuZmlsZXMubWFwKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0YXJnZXR9fCR7ZmlsZS5wYXRofWBcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoID0gZmlsZURpZmZzW2tleV1cclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17a2V5fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19PntmaWxlLnBhdGh9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzFhN2YzNycpLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT4re2ZpbGUuYWRkc308L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2YyMjJlJyksIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19Pi17ZmlsZS5kZWxzfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRGaWxlRGlmZih0YXJnZXQsIGZpbGUucGF0aCkgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3BhdGNoID09PSB1bmRlZmluZWQgPyB0KCdkaWZmLnNob3cnKSA6IHQoJ2RpZmYuaGlkZScpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7cGF0Y2ggIT09IHVuZGVmaW5lZCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtgJHtrZXl9LWRpZmZgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49ezR9IHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgcGFkZGluZzogMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGlmZlZpZXcgcGF0Y2g9e3BhdGNofSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICAgKVxyXG4gICAgICB9KX1cclxuXHJcbiAgICAgIHsvKiBcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdUZGMUFcdTYzMDlcdTk0QUUgKyBcdTk4Q0VcdTk2NjlcdTY3ODRcdTYyMTAgKyBcdTU5MjdcdTU2RkUgKyBcdTVGNzFcdTU0Q0RcdTcwQjlcdTY2MEVcdTdFQzYgKyBcdThCQjBcdTVGQzZcdTgwNTRcdTUyQTggKi99XHJcbiAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgPENhcmQgdGl0bGU9e3QoJ2RldGFpbC5pbXBhY3QnKX0+XHJcbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17aW1wYWN0TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJbXBhY3QoKSB9fT5cclxuICAgICAgICAgICAge2ltcGFjdExvYWRpbmcgPyB0KCdkZXRhaWwuaW1wYWN0TG9hZGluZycpIDogdCgnZGV0YWlsLmltcGFjdCcpfVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIGltcGFjdC5leHBsYW5hdGlvbnNDYWNoZWQgPT09IHRydWUgJiYgKFxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoJyM4YjhiOGInKSwgbWFyZ2luTGVmdDogJzhweCcgfX0+XHJcbiAgICAgICAgICAgICAge3QoJ2NhY2hlLmhpdCcpfXtpbXBhY3QuZ2VuZXJhdGVkQXQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUoaW1wYWN0LmdlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIHJlbmRlckNvc3RCYWRnZShpbXBhY3QuZXhwbGFuYXRpb25zQ29zdFVzZCwgdCgnY29zdC50b29sdGlwJykpfVxyXG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgbWFyZ2luTGVmdDogJzhweCcsIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17aW1wYWN0TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJbXBhY3QodHJ1ZSkgfX0+XHJcbiAgICAgICAgICAgICAge3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICcxMHB4JywgbWFyZ2luOiAnMTBweCAwIDRweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoaW1wYWN0Umlza0NvbG9yKSwgZm9udFNpemU6ICcxM3B4JywgcGFkZGluZzogJzNweCAxMHB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAge3QoJ2ltcGFjdC5yaXNrJyl9OiB7aW1wYWN0LnJpc2tMZXZlbH1cdUZGMDh7aW1wYWN0LnJpc2tTY29yZX1cdUZGMDlcclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIHtpbXBhY3Qua2V5Q2hhbmdlUG9pbnRzICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LmtleUNoYW5nZVBvaW50cy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjOWE2NzAwJykgfX0+XHUyNkEwIHt0KCdpbXBhY3Qua2V5UG9pbnRzJyl9OiB7aW1wYWN0LmtleUNoYW5nZVBvaW50cy5tYXAoKGZpbGUpID0+IGZpbGUuc3BsaXQoJy8nKS5wb3AoKSkuam9pbignXHUzMDAxJyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICB7aW1wYWN0LnJpc2tGYWN0b3JzICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LnJpc2tGYWN0b3JzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnNlY3Rpb25UaXRsZX0+e3QoJ2ltcGFjdC5mYWN0b3JzJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnMnB4JywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAge2ltcGFjdC5yaXNrRmFjdG9ycy5tYXAoKGZhY3RvciwgaSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgZm9udFNpemU6ICcxMnB4JywgcGFkZGluZzogJzNweCA4cHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJywgYm9yZGVyUmFkaXVzOiAnNHB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2ZhY3Rvci50ZXh0fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IGltcGFjdFJpc2tDb2xvciwgZm9udFdlaWdodDogNjAwIH19Pit7ZmFjdG9yLnBvaW50c308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIDxJbXBhY3RHcmFwaCBkYXRhPXtpbXBhY3R9IHQ9e3R9IC8+XHJcbiAgICAgICAgICAgICAge2ltcGFjdC5sZXZlbHMubGVuZ3RoID09PSAwICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2ltcGFjdC5ub25lJyl9PC9kaXY+fVxyXG4gICAgICAgICAgICAgIHsvKiBcdTUxRkRcdTY1NzBcdTdFQTdcdTVGNzFcdTU0Q0RcdUZGMUFcdTY3MkNcdTZCMjFcdTRGRUVcdTY1MzlcdTRFODZcdTU0RUFcdTRFOUJcdTUxRkRcdTY1NzBcdTMwMDFcdTZDRTJcdTUzQ0FcdTRFODZcdThDMDFcdTc2ODRcdTU0RUFcdTRFOUJcdTUxRkRcdTY1NzBcdTMwMDFcdThDMDNcdTc1MjhcdTcwQjlcdTU3MjhcdTU0RUEgKi99XHJcbiAgICAgICAgICAgICAge2ltcGFjdC5mdW5jdGlvbkltcGFjdCAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5mdW5jdGlvbkltcGFjdC5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnMTJweCcgfX0+e3QoJ2ltcGFjdC5mdW5jdGlvbnMnKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICc4cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIHtpbXBhY3QuZnVuY3Rpb25JbXBhY3QubWFwKChlbnRyeSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5LnN5bWJvbH0gc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAxMHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjZDk3NzA2Jyl9PntlbnRyeS5zeW1ib2x9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5sYWJlbCwgbWFyZ2luTGVmdDogJzhweCcgfX0+e2VudHJ5LmRlZmluZWRJbn08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkucm9sZSAhPT0gdW5kZWZpbmVkICYmIGVudHJ5LnJvbGUgIT09ICcnICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT57dCgnaW1wYWN0LmZ1bmNSb2xlJyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LnJvbGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5jaGFuZ2UgIT09IHVuZGVmaW5lZCAmJiBlbnRyeS5jaGFuZ2UgIT09ICcnICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0IH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzlhNjcwMCcpIH19Pnt0KCdpbXBhY3QuZnVuY0NoYW5nZScpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5jaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5pbXBhY3QgIT09IHVuZGVmaW5lZCAmJiBlbnRyeS5pbXBhY3QgIT09ICcnICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBtYXJnaW5Cb3R0b206ICc2cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NlOTE3OCcpIH19Pnt0KCdpbXBhY3QuZnVuY0NhbGxlcnMnKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuaW1wYWN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2FsbGVycy5tYXAoKGNhbGxlciwgaSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyAuLi5zdHlsZXMubG9naWNTdGVwLCBtYXJnaW5Ub3A6ICczcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JykgfX0+XHUyMUIzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSBkb3R0ZWQnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBvcGVuUGVlayhjYWxsZXIuZmlsZSwgTnVtYmVyKGNhbGxlci5saW5lKSkgfX0+e2NhbGxlci5maWxlfTp7Y2FsbGVyLmxpbmV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHUyMDE0IHtjYWxsZXIuc25pcHBldC5zbGljZSgwLCA4MCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAge2ltcGFjdC5mdW5jdGlvbkltcGFjdCAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5mdW5jdGlvbkltcGFjdC5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnaW1wYWN0LmZ1bmN0aW9uc05vbmUnKX08L2Rpdj5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIHtpbXBhY3QubWVtb3JpZXMgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3QubWVtb3JpZXMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnLCBib3JkZXI6ICcxcHggZGFzaGVkIHJnYmEoMzcsOTksMjM1LDAuMzUpJywgYm9yZGVyUmFkaXVzOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+e3QoJ2ltcGFjdC5tZW1vcnknKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhXcmFwOiAnd3JhcCcsIGdhcDogJzZweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAge2ltcGFjdC5tZW1vcmllcy5tYXAoKG1lbW9yeSwgaSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4ga2V5PXtpfSBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9PnttZW1vcnkudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICB7LyogXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHVGRjFBXHU3RUQzXHU4QkJBICsgXHU3RUQzXHU2Nzg0XHU1MzE2XHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1ICovfVxyXG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdkZXRhaWwub3B0aW1hbGl0eScpfT5cclxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtyZXZpZXdMb2FkaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJldmlld3MoKSB9fT5cclxuICAgICAgICAgICAge3Jldmlld0xvYWRpbmcgPyB0KCdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnKSA6IHQoJ2RldGFpbC5vcHRpbWFsaXR5Jyl9XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubWFwKCh0YXJnZXQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgciA9IHJldmlld3NbdGFyZ2V0XVxyXG4gICAgICAgICAgICBpZiAociA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRhcmdldCA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiB0YXJnZXQuc2xpY2UoMCwgOClcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2IGtleT17YHItJHt0YXJnZXR9YH0gc3R5bGU9e3sgbWFyZ2luVG9wOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgICAgIHtsYWJlbH1cclxuICAgICAgICAgICAgICAgICAge3IuY2FjaGVkID09PSB0cnVlICYmIChcclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9Pnt0KCdjYWNoZS5oaXQnKX17ci5nZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShyLmdlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICB7cmVuZGVyQ29zdEJhZGdlKHIuY29zdFVzZCwgdCgnY29zdC50b29sdGlwJykpfVxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJldmlld3ModHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAge3IudmVyZGljdCAhPT0gJycgJiYgKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wNSknLCBib3JkZXI6ICcxcHggc29saWQgcmdiYSgzNyw5OSwyMzUsMC4yKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMTBweCcgfX0+e3IudmVyZGljdH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICB7ci5pc3N1ZUxpc3QgIT09IHVuZGVmaW5lZCAmJiByLmlzc3VlTGlzdC5sZW5ndGggPiAwID8gKFxyXG4gICAgICAgICAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHRyPntbJ3Jldmlldy5jb2wuc2V2ZXJpdHknLCAncmV2aWV3LmNvbC5jYXRlZ29yeScsICdyZXZpZXcuY29sLnRpdGxlJywgJ3Jldmlldy5jb2wuZXZpZGVuY2UnLCAncmV2aWV3LmNvbC5maXgnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAge3IuaXNzdWVMaXN0Lm1hcCgoaXNzdWUsIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoaXNzdWUuc2V2ZXJpdHkgPT09ICdjcml0aWNhbCcgPyAnI2YxNGM0YycgOiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2hpZ2gnID8gJyNjZTkxNzgnIDogaXNzdWUuc2V2ZXJpdHkgPT09ICdtZWRpdW0nID8gJyNkY2RjYWEnIDogJyM1NjljZDYnKX0+e2lzc3VlLnNldmVyaXR5fTwvc3Bhbj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXNzdWUuY2F0ZWdvcnl9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2lzc3VlLnRpdGxlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+e2lzc3VlLmV2aWRlbmNlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntpc3N1ZS5maXh9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXZpZXcuY2xlYW4nKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgICAge3Jldmlld0xvYWRpbmcgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJyl9PC9kaXY+fVxyXG4gICAgICAgICAgeyFyZXZpZXdMb2FkaW5nICYmIHNlbGVjdGVkVGFyZ2V0cy5ldmVyeSgodGFyZ2V0KSA9PiByZXZpZXdzW3RhcmdldF0gPT09IHVuZGVmaW5lZCkgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXZpZXcuaGludCcpfTwvZGl2PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICl9XHJcbiAgICA8Lz5cclxuICApXHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBcdThCQkVcdTdGNkVcdTk4NzVcdTdCN0UgXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgVElFUl9MQUJFTFM6IEFycmF5PHsga2V5OiBzdHJpbmc7IHpoOiBzdHJpbmc7IGRlc2M6IHN0cmluZyB9PiA9IFtcclxuICAgIHsga2V5OiAnc3RhbmRhcmQnLCB6aDogJ1x1ODlFM1x1OEJGQiAvIFx1NTFGRFx1NjU3MFx1NUY3MVx1NTRDRFx1OEJGNFx1NjYwRScsIGRlc2M6ICdcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTc2ODQgQUkgXHU4OUUzXHU4QkZCXHUzMDAxXHU1RjcxXHU1NENEXHU1MjA2XHU2NzkwJyB9LFxyXG4gICAgeyBrZXk6ICdyZWFzb25pbmcnLCB6aDogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNSAvIFx1NjI2N1x1ODg0Q1x1OEJBMVx1NTIxMicsIGRlc2M6ICdcdThCQzRcdTVCQTFcdTMwMDFcdThCQTFcdTUyMTJcdTc1MUZcdTYyMTBcdTMwMDFBSSBcdTVCNjZcdTRFNjBcdTYwM0JcdTdFRDMnIH0sXHJcbiAgICB7IGtleTogJ2Zhc3QnLCB6aDogJ1x1NTM4Nlx1NTNGMlx1OEY3Qlx1Njc5MCcsIGRlc2M6ICdcdTYyNkJcdTYzQ0ZcdTUzODZcdTUzRjJcdTY1RjZcdTc2ODRcdTkwMTBcdTYzRDBcdTRFQTRcdTRFMDBcdTUzRTVcdThCREQnIH0sXHJcbiAgICB7IGtleTogJ3ZlcmlmaWVyJywgemg6ICdcdTlBOENcdTY1MzYnLCBkZXNjOiAnXHU2NTM5XHU1MkE4XHU5QThDXHU2NTM2XHU3Njg0IEFJIFx1NTkwRFx1NjgzOCcgfSxcclxuICBdXHJcblxyXG4gIGNvbnN0IHNldHRpbmdzVGFiID0gKFxyXG4gICAgPD5cclxuICAgICAgey8qIFx1NkEyMVx1NTc4Qlx1NTIwNlx1OTE0RFx1RkYxQVx1NTNFRlx1ODlDNlx1NTMxNlx1NTIwN1x1NjM2Mlx1NTQwNFx1NEVGQlx1NTJBMVx1NzUyOFx1NzY4NFx1NkEyMVx1NTc4Qlx1RkYwQ1x1NEZERFx1NUI1OFx1NTM3M1x1NzUxRlx1NjU0OCAqL31cclxuICAgICAgPENhcmQgdGl0bGU9e3QoJ21vZGVsLnRpdGxlJyl9PlxyXG4gICAgICAgIHttb2RlbFRpZXJzID09PSBudWxsID8gKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnbW9kZWwubG9hZGluZycpfTwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8PlxyXG4gICAgICAgICAgICB7VElFUl9MQUJFTFMubWFwKCh0aWVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IG1vZGVsVGllcnNbdGllci5rZXldXHJcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjdXJyZW50ID8gY3VycmVudC5wcm92aWRlciArICcvJyArIGN1cnJlbnQubW9kZWwgOiAnJ1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17dGllci5rZXl9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtaW5XaWR0aDogMTUwLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+e3RpZXIuemh9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6IDI0MCB9fVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHYgPSBlLnRhcmdldC52YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHYgPT09ICcnKSB7IHNldE1vZGVsVGllcnMoeyAuLi5tb2RlbFRpZXJzLCBbdGllci5rZXldOiB7IHByb3ZpZGVyOiAnJywgbW9kZWw6ICcnIH0gfSk7IHJldHVybiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbcHJvdmlkZXIsIC4uLnJlc3RdID0gdi5zcGxpdCgnLycpXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IHJlc3Quam9pbignLycpXHJcbiAgICAgICAgICAgICAgICAgICAgICBzZXRNb2RlbFRpZXJzKHsgLi4ubW9kZWxUaWVycywgW3RpZXIua2V5XTogeyBwcm92aWRlciwgbW9kZWwgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e3QoJ21vZGVsLmZvbGxvd0NoYXQnKX08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICB7bW9kZWxPcHRpb25zLm1hcCgob3B0aW9uKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfSB2YWx1ZT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge29wdGlvbi5wcm92aWRlcn0gLyB7b3B0aW9uLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0aWVyLmRlc2N9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc4cHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknIH19PlxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fT5cdUQ4M0VcdUREMTYge3QoJ2ZpeC5tb2RlbFRpdGxlJyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXHJcbiAgICAgICAgICAgICAgICBtaW49ezF9XHJcbiAgICAgICAgICAgICAgICBtYXg9ezEwfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCB3aWR0aDogNjQsIHRleHRBbGlnbjogJ2NlbnRlcicgfX1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXtmaXhDb25jdXJyZW5jeX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRGaXhDb25jdXJyZW5jeShlLnRhcmdldC52YWx1ZSkgfX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdmaXgubW9kZWxIaW50Jyl9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxyXG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXttb2RlbFNhdmluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIHNhdmVNb2RlbENvbmZpZygpIH19PlxyXG4gICAgICAgICAgICAgICAge21vZGVsU2F2aW5nID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ21vZGVsLnNhdmUnKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICB7bW9kZWxTYXZlZCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNGVjOWIwJyl9Pnt0KCdtb2RlbC5zYXZlZCcpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ21vZGVsLmhpbnQnKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC8+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9DYXJkPlxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXRlcnRpYXJ5LCAjOWNhM2FmKScsIHBhZGRpbmc6ICc4cHggMCcgfX0+XHJcbiAgICAgICAgZHNoLXByb2plY3QtY29udHJvbCB2e3N0YXRlPy5wbHVnaW5WZXJzaW9uID8/ICc/J31cclxuICAgICAgPC9kaXY+XHJcbiAgICA8Lz5cclxuICApXHJcblxyXG4gIGNvbnN0IG92ZXJ2aWV3VGFiID0gKFxyXG4gICAgPD5cclxuICAgICAgPENhcmQ+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XHJcbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17Ym9vdHN0cmFwcGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkJvb3RzdHJhcCgpIH19PlxyXG4gICAgICAgICAgICB7Ym9vdHN0cmFwcGluZyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24ucmVzY2FuJyl9XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtidXN5ICE9PSBudWxsfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdhbmFseXplJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2FuYWx5emUnLCB7fSkgfX0+XHJcbiAgICAgICAgICAgIHtidXN5ID09PSAnYW5hbHl6ZScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLmFuYWx5emUnKX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGx9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3ZlcmlmeScsICcvcHJvamVjdC1jb250cm9sL2FwaS92ZXJpZnknLCB7fSkgfX0+XHJcbiAgICAgICAgICAgIHtidXN5ID09PSAndmVyaWZ5JyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24udmVyaWZ5Jyl9XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9DYXJkPlxyXG4gICAgICB7cmVzdWx0UGFuZWx9XHJcbiAgICAgIHtwcm9qZWN0ID09PSBudWxsID8gKFxyXG4gICAgICAgIDxDYXJkPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTNweCcsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+e3QoJ3N0YXRlLm5vUHJvamVjdCcpfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc3RhdGUubm9Qcm9qZWN0SGludCcpfTwvZGl2PlxyXG4gICAgICAgIDwvQ2FyZD5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8Q2FyZCB0aXRsZT17YCR7dCgnc3RhdGUucHJvamVjdCcpfVx1RkYxQSR7cHJvamVjdC5uYW1lfWB9PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvd30+XHJcbiAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9PlJvb3Q8L3NwYW4+e3Byb2plY3Qucm9vdFBhdGh9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICB7Ym9vdHN0cmFwICE9PSBudWxsICYmIChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cclxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS50ZWNoU3RhY2snKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIHtib290c3RyYXAudGVjaFN0YWNrLm1hcCgodGVjaCkgPT4gPHNwYW4ga2V5PXt0ZWNofSBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNGVjOWIwJyl9Pnt0ZWNofTwvc3Bhbj4pfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLnN5bWJvbHMnKX08L3NwYW4+e1N0cmluZyhib290c3RyYXAuc3ltYm9sc0NvdW50KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUubWFuaWZlc3RzJyl9PC9zcGFuPntTdHJpbmcoYm9vdHN0cmFwLm1hbmlmZXN0RmlsZXMubGVuZ3RoKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUuZXZpZGVuY2UnKX08L3NwYW4+e1N0cmluZyhzdGF0ZT8uZXZpZGVuY2VDb3VudCA/PyAwKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luVG9wOiAnOHB4JyB9fT57Ym9vdHN0cmFwLnN1bW1hcnl9PC9kaXY+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICl9XHJcbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdjb25maXJtZWQudGl0bGUnKX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxyXG4gICAgICAgICAgPHRleHRhcmVhIHJvd3M9ezJ9IHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHBsYWNlaG9sZGVyPXt0KCdjb25maXJtZWQudGV4dCcpfSB2YWx1ZT17Y29uZmlybWVkVGV4dH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENvbmZpcm1lZFRleHQoZS50YXJnZXQudmFsdWUpIH19IC8+XHJcbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2NvbmZpcm1lZC5wYXRocycpfSB2YWx1ZT17Y29uZmlybWVkUGF0aHN9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDb25maXJtZWRQYXRocyhlLnRhcmdldC52YWx1ZSkgfX0gLz5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5idXR0b259XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtidXN5ICE9PSBudWxsIHx8IGNvbmZpcm1lZFRleHQgPT09ICcnfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdhZGRDb25maXJtZWQnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY29uZmlybWVkJywgeyB0eXBlOiAnY29uc3RyYWludCcsIHRleHQ6IGNvbmZpcm1lZFRleHQsIGZvcmJpZGRlblBhdGhzOiBjb25maXJtZWRQYXRocy5zcGxpdCgnLCcpLm1hcCgocGF0aCkgPT4gcGF0aC50cmltKCkpLmZpbHRlcigocGF0aCkgPT4gcGF0aCAhPT0gJycpIH0pLnRoZW4oKCkgPT4geyBzZXRDb25maXJtZWRUZXh0KCcnKTsgc2V0Q29uZmlybWVkUGF0aHMoJycpIH0pIH19XHJcbiAgICAgICAgICA+e2J1c3kgPT09ICdhZGRDb25maXJtZWQnID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2NvbmZpcm1lZC5hZGQnKX08L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7Y29uZmlybWVkLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2NvbmZpcm1lZC5ub25lJyl9PC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHtjb25maXJtZWQubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtpdGVtLmlkfT5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNjNTg2YzAnKX0+e2l0ZW0udHlwZX08L3NwYW4+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntpdGVtLnRleHR9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntpdGVtLmZvcmJpZGRlblBhdGhzLmpvaW4oJywgJykgfHwgJ1x1MjAxNCd9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbigncmVtb3ZlQ29uZmlybWVkJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbmZpcm1lZC9yZW1vdmUnLCB7IGlkOiBpdGVtLmlkIH0pIH19XHJcbiAgICAgICAgICAgICAgICAgICAgPlx1MjcxNTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9DYXJkPlxyXG4gICAgICA8Q2FyZCB0aXRsZT17dCgnYWN0aW9uLmNyZWF0ZUNoYW5nZScpfT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XHJcbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0uY2hhbmdlVGl0bGUnKX0gdmFsdWU9e2NoYW5nZVRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q2hhbmdlVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XHJcbiAgICAgICAgICA8dGV4dGFyZWEgcm93cz17Mn0gc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0uY2hhbmdlRGVzYycpfSB2YWx1ZT17Y2hhbmdlRGVzY30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENoYW5nZURlc2MoZS50YXJnZXQudmFsdWUpIH19IC8+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuYnV0dG9ufVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBjaGFuZ2VUaXRsZSA9PT0gJyd9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2NyZWF0ZUNoYW5nZScsICcvcHJvamVjdC1jb250cm9sL2FwaS9jaGFuZ2VzJywgeyB0aXRsZTogY2hhbmdlVGl0bGUsIGRlc2NyaXB0aW9uOiBjaGFuZ2VEZXNjIH0pLnRoZW4oKCkgPT4geyBzZXRDaGFuZ2VUaXRsZSgnJyk7IHNldENoYW5nZURlc2MoJycpIH0pIH19XHJcbiAgICAgICAgICA+e2J1c3kgPT09ICdjcmVhdGVDaGFuZ2UnID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnKX08L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7Y2hhbmdlcy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdzdGF0ZS5ub0NoYW5nZXMnKX08L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxyXG4gICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgPHRyPntbJ2NoYW5nZXMuY29sLnRpdGxlJywgJ2NoYW5nZXMuY29sLnR5cGUnLCAnY2hhbmdlcy5jb2wuc3RhdHVzJywgJ2NoYW5nZXMuY29sLnVwZGF0ZWQnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxyXG4gICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAge2NoYW5nZXMubWFwKChjaGFuZ2UpID0+IChcclxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e2NoYW5nZS5pZH0+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Y2hhbmdlLnRpdGxlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKGNoYW5nZS5zdGF0dXMgPT09ICdjb21wbGV0ZWQnID8gJyM0ZWM5YjAnIDogJyM1NjljZDYnKX0+e2NoYW5nZS5zdGF0dXN9PC9zcGFuPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Zm9ybWF0VGltZShjaGFuZ2UudXBkYXRlZEF0KX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6ICdcdTUyMjBcdTk2NjRcdThGRDlcdTRFMkFcdTUzRDhcdTY2RjRcdTRFRkJcdTUyQTFcdUZGMUYnLCBtZXNzYWdlOiAnXHUzMDBDJyArIGNoYW5nZS50aXRsZSArICdcdTMwMERcdTUzQ0FcdTUxNzZcdTUxNjhcdTkwRThcdTYyNjdcdTg4NENcdThCQjBcdTVGNTVcdTMwMDFcdThCQTFcdTUyMTJcdTMwMDFcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTVDMDZcdTg4QUJcdTZDMzhcdTRFNDVcdTUyMjBcdTk2NjRcdTMwMDInLCBkYW5nZXI6IHRydWUsIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHJ1bkFjdGlvbignZGVsZXRlQ2hhbmdlJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NoYW5nZXMvZGVsZXRlJywgeyBpZDogY2hhbmdlLmlkIH0pIH0gfSkgfX0+XHUyNzE1PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICApfVxyXG4gICAgICA8L0NhcmQ+XHJcbiAgICA8Lz5cclxuICApXHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdTk4NzVcdTdCN0VcdUZGMUFcdTk4NzVcdTk3NjJcdTc2RjRcdTYzQTVcdTUyMUJcdTVFRkFcdTVFNzZcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMENcdTgwNEFcdTU5MjlcdTUzRUFcdTY2MkZcdTUzRTZcdTRFMDBcdTc5Q0RcdTUxNjVcdTUzRTMgXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgZXhlY3V0aW9uVGFiID0gKFxyXG4gICAgPD5cclxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGZsZXhXcmFwOiAnd3JhcCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICcxMHB4JywgcGFkZGluZzogJzdweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMzcsOTksMjM1LDAuMiknLCBmb250U2l6ZTogJzExcHgnIH19PlxyXG4gICAgICAgIDxiPlx1MjQ2MCB7dCgnZXhlYy5mbG93Q3JlYXRlJyl9PC9iPjxzcGFuPlx1MjE5Mjwvc3Bhbj5cclxuICAgICAgICA8Yj5cdTI0NjEge3QoJ2V4ZWMuZmxvd09yY2hlc3RyYXRlJyl9PC9iPjxzcGFuPlx1MjE5Mjwvc3Bhbj5cclxuICAgICAgICA8Yj5cdTI0NjIge3QoJ2V4ZWMuZmxvd1J1bicpfTwvYj48c3Bhbj5cdTIxOTI8L3NwYW4+XHJcbiAgICAgICAgPGI+XHUyNDYzIHt0KCdleGVjLmZsb3dNZW1vcnknKX08L2I+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8Q2FyZCB0aXRsZT17dCgnZXhlYy5jcmVhdGUnKX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1JbmxpbmV9PlxyXG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgZmxleDogMSwgbWluV2lkdGg6IDIwMCB9fSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtVGl0bGUnKX0gdmFsdWU9e2V4ZWNUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEV4ZWNUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cclxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17ZXhlY01vZGVsfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RXhlY01vZGVsKGUudGFyZ2V0LnZhbHVlKSB9fSB0aXRsZT17dCgncGxhbi5tb2RlbERlZmF1bHQnKX0+XHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj57dCgnZXhlYy5tb2RlbERlZmF1bHQnKX08L29wdGlvbj5cclxuICAgICAgICAgICAgeyhtb2RlbE9wdGlvbnMgPz8gW10pLm1hcCgob3B0aW9uKSA9PiA8b3B0aW9uIGtleT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfSB2YWx1ZT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfT57b3B0aW9uLnByb3ZpZGVyfS97b3B0aW9uLmlkfTwvb3B0aW9uPil9XHJcbiAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XHJcbiAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcm93cz17M30gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybURlc2MnKX0gdmFsdWU9e2V4ZWNEZXNjfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RXhlY0Rlc2MoZS50YXJnZXQudmFsdWUpIH19IC8+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuYWN0aW9uUm93fT5cclxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgZXhlY1RpdGxlLnRyaW0oKSA9PT0gJycgfHwgZXhlY0Rlc2MudHJpbSgpID09PSAnJ30gb25DbGljaz17KCkgPT4geyB2b2lkIHN0YXJ0UnVuKCkgfX0+XHJcbiAgICAgICAgICAgICAge2J1c3kgPT09ICdzdGFydFJ1bicgPyB0KCdleGVjLnBsYW5uaW5nJykgOiB0KCdleGVjLnN0YXJ0Jyl9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnZXhlYy5jcmVhdGVIaW50Jyl9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvQ2FyZD5cclxuICAgICAge3Jlc3VsdFBhbmVsfVxyXG4gICAgICB7cGxhbkNvbmZpcm0gIT09IG51bGwgJiYgKFxyXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdwbGFuLnRpdGxlJyl9PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT57dCgncGxhbi5oaW50Jyl9PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XHJcbiAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgPHRyPntbJ3BsYW4uY29sLnN0ZXAnLCAncGxhbi5jb2wucm9sZScsICdwbGFuLmNvbC5tb2RlbCcsICdwbGFuLmNvbC5wb2xpY3knLCAncGxhbi5jb2wuZW5hYmxlZCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XHJcbiAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICB7cGxhbkNvbmZpcm0uc3RlcHMubWFwKChzdGVwLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICA8dHIga2V5PXtzdGVwLmlkfSBzdHlsZT17eyBvcGFjaXR5OiBzdGVwLmVuYWJsZWQgPyAxIDogMC40NSB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBtaW5XaWR0aDogMjIwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+e2luZGV4ICsgMX0uIHtzdGVwLnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57c3RlcC5kZXNjcmlwdGlvbi5zbGljZSgwLCAxMjApfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAge3N0ZXAudGFyZ2V0RmlsZXMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknIH19PntzdGVwLnRhcmdldEZpbGVzLmpvaW4oJywgJykuc2xpY2UoMCwgMTIwKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggNnB4JyB9fSB2YWx1ZT17c3RlcC5yb2xlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0UGxhbkNvbmZpcm0oeyAuLi5wbGFuQ29uZmlybSwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzLm1hcCgoaXRlbSwgaSkgPT4gaSA9PT0gaW5kZXggPyB7IC4uLml0ZW0sIHJvbGU6IGUudGFyZ2V0LnZhbHVlIH0gOiBpdGVtKSB9KSB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1snYW5hbHlzaXMnLCAncGxhbm5pbmcnLCAnY29kaW5nJywgJ29wcycsICd2ZXJpZmljYXRpb24nXS5tYXAoKHJvbGUpID0+IDxvcHRpb24ga2V5PXtyb2xlfSB2YWx1ZT17cm9sZX0+e1JPTEVfTEFCRUxTW3JvbGVdID8/IHJvbGV9PC9vcHRpb24+KX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDZweCcgfX0gdmFsdWU9e3N0ZXAubW9kZWxQcm92aWRlciArICcvJyArIHN0ZXAubW9kZWxJZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3Byb3ZpZGVyLCBtb2RlbF0gPSBlLnRhcmdldC52YWx1ZS5zcGxpdCgnLycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxhbkNvbmZpcm0oeyAuLi5wbGFuQ29uZmlybSwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzLm1hcCgoaXRlbSwgaSkgPT4gaSA9PT0gaW5kZXggPyB7IC4uLml0ZW0sIG1vZGVsUHJvdmlkZXI6IHByb3ZpZGVyID8/ICcnLCBtb2RlbElkOiBtb2RlbCA/PyAnJyB9IDogaXRlbSkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIvXCI+e3QoJ3BsYW4ubW9kZWxEZWZhdWx0Jyl9PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHttb2RlbE9wdGlvbnMubWFwKChvcHRpb24pID0+IDxvcHRpb24ga2V5PXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9IHZhbHVlPXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9PntvcHRpb24ucHJvdmlkZXJ9L3tvcHRpb24uaWR9PC9vcHRpb24+KX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDZweCcgfX0gdmFsdWU9e3N0ZXAuZmFpbHVyZVBvbGljeX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBsYW5Db25maXJtKHsgLi4ucGxhbkNvbmZpcm0sIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcy5tYXAoKGl0ZW0sIGkpID0+IGkgPT09IGluZGV4ID8geyAuLi5pdGVtLCBmYWlsdXJlUG9saWN5OiBlLnRhcmdldC52YWx1ZSB9IDogaXRlbSkgfSkgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhQT0xJQ1lfTEFCRUxTKS5tYXAoKFt2YWx1ZSwgbGFiZWxdKSA9PiA8b3B0aW9uIGtleT17dmFsdWV9IHZhbHVlPXt2YWx1ZX0+e2xhYmVsfTwvb3B0aW9uPil9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtzdGVwLmVuYWJsZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRQbGFuQ29uZmlybSh7IC4uLnBsYW5Db25maXJtLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMubWFwKChpdGVtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4uaXRlbSwgZW5hYmxlZDogZS50YXJnZXQuY2hlY2tlZCB9IDogaXRlbSkgfSkgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIG1hcmdpblRvcDogJzEwcHgnIH19PlxyXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17cGxhbkJ1c3l9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsYXVuY2hQbGFuKHRydWUpIH19PntwbGFuQnVzeSA/ICdcdTIwMjYnIDogdCgncGxhbi5sYXVuY2hFZGl0ZWQnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e3BsYW5CdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbGF1bmNoUGxhbihmYWxzZSkgfX0+e3QoJ3BsYW4ubGF1bmNoRGlyZWN0Jyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtwbGFuQnVzeX0gb25DbGljaz17KCkgPT4geyBzZXRQbGFuQ29uZmlybShudWxsKSB9fT57dCgncGxhbi5kaXNjYXJkJyl9PC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICl9XHJcbiAgICAgIDxDYXJkPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxyXG4gICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ2V4ZWMuYXR0ZW1wdHMnKX08L3NwYW4+e1N0cmluZyhzdGF0ZT8uYXR0ZW1wdHNDb3VudCA/PyAwKX08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAge3J1bnMubGVuZ3RoID09PSAwID8gKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc3RhdGUubm9SdW5zJyl9PC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XHJcbiAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICA8dHI+e1snZXhlYy5jb2wuY2hhbmdlJywgJ2V4ZWMuY29sLnN0ZXBzJywgJ2V4ZWMuY29sLnN0YXR1cycsICdleGVjLmNvbC5zdGFydGVkJywgJ2V4ZWMuY29sLmNvc3QnLCAnZXhlYy5jb2wuZGV0YWlsJ10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHtydW5zLm1hcCgocnVuKSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtydW4uaWR9PlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+eyhjaGFuZ2VzLmZpbmQoKGNoYW5nZSkgPT4gY2hhbmdlLmlkID09PSBydW4uY2hhbmdlSWQpPy50aXRsZSkgPz8gcnVuLmNoYW5nZUlkfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57cnVuLnN0ZXBzVG90YWwgPyAocnVuLnN0ZXBzRG9uZSA/PyAwKSArICcvJyArIHJ1bi5zdGVwc1RvdGFsIDogJ1x1MjAxNCd9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UocnVuLnN0YXR1cyA9PT0gJ3N1Y2NlZWRlZCcgfHwgcnVuLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgPyAnIzRlYzliMCcgOiBydW4uc3RhdHVzID09PSAnZmFpbGVkJyA/ICcjZjE0YzRjJyA6IHJ1bi5zdGF0dXMgPT09ICdwYXVzZWQnID8gJyNkOTc3MDYnIDogJyNkY2RjYWEnKX0+e1JVTl9TVEFUVVNfTEFCRUxTW3J1bi5zdGF0dXNdID8/IHJ1bi5zdGF0dXN9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIHtydW4uY3VycmVudFN0ZXAgIT09IG51bGwgJiYgcnVuLmN1cnJlbnRTdGVwICE9PSB1bmRlZmluZWQgJiYgcnVuLnN0YXR1cyA9PT0gJ3J1bm5pbmcnICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1heFdpZHRoOiAxNjAsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT57cnVuLmN1cnJlbnRTdGVwfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Zm9ybWF0VGltZShydW4uc3RhcnRlZEF0KX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3J1bi5jb3N0VXNkICE9PSB1bmRlZmluZWQgPyAnJCcgKyBydW4uY29zdFVzZC50b0ZpeGVkKDQpIDogJ1x1MjAxNCd9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkUnVuRGV0YWlsKHJ1bi5pZCkgfX0+e3J1bkRldGFpbD8ucnVuLmlkID09PSBydW4uaWQgPyB0KCdwbGFuLnJlZnJlc2hEZXRhaWwnKSA6IHQoJ3BsYW4udmlld0RldGFpbCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICA8L0NhcmQ+XHJcbiAgICAgIHtydW5EZXRhaWwgIT09IG51bGwgJiYgKFxyXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdwbGFuLmRldGFpbFRpdGxlJykgKyAnIFx1MDBCNyAnICsgcnVuRGV0YWlsLnJ1bi5jaGFuZ2VUaXRsZX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UocnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdzdWNjZWVkZWQnIHx8IHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnY29tcGxldGVkJyA/ICcjNGVjOWIwJyA6IHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnZmFpbGVkJyA/ICcjZjE0YzRjJyA6IHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAncGF1c2VkJyA/ICcjZDk3NzA2JyA6ICcjZGNkY2FhJyl9PntSVU5fU1RBVFVTX0xBQkVMU1tydW5EZXRhaWwucnVuLnN0YXR1c10gPz8gcnVuRGV0YWlsLnJ1bi5zdGF0dXN9PC9zcGFuPlxyXG4gICAgICAgICAgICB7cnVuRGV0YWlsLnJ1bi5lcnJvciAhPT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkMTI0MmYnKSB9fT57cnVuRGV0YWlsLnJ1bi5lcnJvci5tZXNzYWdlfTwvc3Bhbj59XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cclxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSdW5EZXRhaWwocnVuRGV0YWlsLnJ1bi5pZCkgfX0+e3QoJ3BsYW4ucmVmcmVzaERldGFpbCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFJ1bkRldGFpbChudWxsKSB9fT57dCgncGxhbi5jbG9zZURldGFpbCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICB7cnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdwYXVzZWQnICYmIHJ1bkRldGFpbC5ydW4ucGF1c2VQb2ludCAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzhweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgYmFja2dyb3VuZDogJ3JnYmEoMjE3LDExOSw2LDAuMDgpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMjE3LDExOSw2LDAuMzUpJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCwgZm9udFNpemU6ICcxMnB4JyB9fT5cdTIzRjgge3QoJ3BsYW4ucGF1c2VkQmFubmVyJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57cnVuRGV0YWlsLnJ1bi5wYXVzZVBvaW50LnJlYXNvbn08L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgbWFyZ2luVG9wOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJ1dHRvbiwgcGFkZGluZzogJzNweCAxMHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcmVzdW1lUnVuKHJ1bkRldGFpbC5ydW4uaWQsICdjb250aW51ZScpIH19Pnt0KCdwbGFuLnJlc3VtZVJldHJ5Jyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHJlc3VtZVJ1bihydW5EZXRhaWwucnVuLmlkLCAnc2tpcC1jdXJyZW50JykgfX0+e3QoJ3BsYW4ucmVzdW1lU2tpcCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICB7KHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnZmFpbGVkJyB8fCBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2ludGVycnVwdGVkJykgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCByZXN1bWVSdW4ocnVuRGV0YWlsLnJ1bi5pZCwgJ2NvbnRpbnVlJykgfX0+e3QoJ3BsYW4ucmVzdW1lRmFpbGVkJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XHJcbiAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICA8dHI+e1sncGxhbi5jb2wuc3RlcCcsICdwbGFuLmNvbC5yb2xlJywgJ3BsYW4uY29sLm1vZGVsJywgJ2V4ZWMuY29sLnN0YXR1cycsICdwbGFuLmNvbC5hdHRlbXB0cycsICdleGVjLmNvbC5jb3N0J10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHtydW5EZXRhaWwuc3RlcHMubWFwKChzdGVwLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPHRyIGtleT17c3RlcC5pZH0+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PntpbmRleCArIDF9LiB7c3RlcC50aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7c3RlcC5jbGFpbWVkT3V0Y29tZSAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXhXaWR0aDogMzIwLCB3aGl0ZVNwYWNlOiAnbm9ybWFsJyB9fT57c3RlcC5jbGFpbWVkT3V0Y29tZS5zbGljZSgwLCAxNjApfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCdyZ2JhKDg2LDE1NiwyMTQsMC4yNSknKX0+e1JPTEVfTEFCRUxTW3N0ZXAucm9sZV0gPz8gc3RlcC5yb2xlfTwvc3Bhbj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBmb250U2l6ZTogJzExcHgnIH19PntzdGVwLm1vZGVsID8/ICdcdTIwMTQnfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHN0ZXAudmVyaWZpZWQgPyAnIzRlYzliMCcgOiBzdGVwLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgPyAnI2YxNGM0YycgOiBzdGVwLnN0YXR1cyA9PT0gJ3NraXBwZWQnID8gJyM4Yjk0OWUnIDogJyNkY2RjYWEnKX0+e1NURVBfU1RBVFVTX0xBQkVMU1tzdGVwLnN0YXR1c10gPz8gc3RlcC5zdGF0dXN9PC9zcGFuPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57U3RyaW5nKHN0ZXAuYXR0ZW1wdHNDb3VudCl9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntzdGVwLmNvc3RVc2QgPiAwID8gJyQnICsgc3RlcC5jb3N0VXNkLnRvRml4ZWQoNCkgOiAnXHUyMDE0J308L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dCAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMTBweCcsIGJvcmRlcjogJzFweCBkYXNoZWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBwYWRkaW5nOiAnOHB4IDEycHgnIH19PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICc0cHgnIH19Pnt0KCdwbGFuLmNvbnRleHRUaXRsZScpfTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHJcbiAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQucHJvamVjdERpZ2VzdH1cclxuICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5icmFuY2ggIT09IG51bGwgPyBgIFx1MDBCNyAke3QoJ3BsYW4uYnJhbmNoJyl9ICR7cnVuRGV0YWlsLmNvbnRleHQuYnJhbmNofWAgOiAnJ31cclxuICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5oZWFkU2hhICE9PSBudWxsID8gYCBcdTAwQjcgSEVBRCAke3J1bkRldGFpbC5jb250ZXh0LmhlYWRTaGEuc2xpY2UoMCwgOCl9YCA6ICcnfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5pbmplY3RlZE1lbW9yaWVzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+e3QoJ3BsYW4uaW5qZWN0ZWRNZW1vcmllcycpfVx1RkYxQTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmluamVjdGVkTWVtb3JpZXMubWFwKChtZW1vcnkpID0+IDxzcGFuIGtleT17bWVtb3J5LmlkfSBzdHlsZT17c3R5bGVzLmJhZGdlKCdyZ2JhKDc4LDIwMSwxNzYsMC4yKScpfT57bWVtb3J5LnRpdGxlfTwvc3Bhbj4pfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuZGVjaXNpb25Mb2cubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzRweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiAnaW5oZXJpdCcgfX0+e3QoJ3BsYW4uZGVjaXNpb25Mb2cnKX1cdUZGMUE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5kZWNpc2lvbkxvZy5zbGljZSgtNikubWFwKChlbnRyeSwgZW50cnlJbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeUluZGV4fT5cdTAwQjcgW3tlbnRyeS5raW5kfV0ge2VudHJ5LmRldGFpbH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9DYXJkPlxyXG4gICAgICApfVxyXG4gICAgICA8Q2FyZFxyXG4gICAgICAgIHRpdGxlPXtcclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCB1c2VyU2VsZWN0OiAnbm9uZScgfX0gb25DbGljaz17KCkgPT4geyBzZXRTY2hlZE9wZW4oIXNjaGVkT3BlbikgfX0+XHJcbiAgICAgICAgICAgIHtzY2hlZE9wZW4gPyAnXHUyNUJFICcgOiAnXHUyNUI4ICd9e3QoJ3NjaGVkLnRpdGxlJyl9XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5sYWJlbCwgbWFyZ2luTGVmdDogJzhweCcgfX0+eyhzY2hlZHVsZWREYXRhID8/IFtdKS5sZW5ndGggPiAwID8gU3RyaW5nKChzY2hlZHVsZWREYXRhID8/IFtdKS5sZW5ndGgpICsgJyBcdTRFMkEnIDogJyd9PC9zcGFuPlxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIH1cclxuICAgICAgPlxyXG4gICAgICAgIHtzY2hlZE9wZW4gJiYgKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1JbmxpbmV9PlxyXG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgZmxleDogMSwgbWluV2lkdGg6IDE2MCB9fSBwbGFjZWhvbGRlcj17dCgnc2NoZWQuZm9ybU5hbWUnKX0gdmFsdWU9e3NjaGVkTmFtZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkTmFtZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cclxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17c2NoZWRUeXBlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWRUeXBlKGUudGFyZ2V0LnZhbHVlKSB9fT5cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJldmlld1wiPnt0KCdzY2hlZC50eXBlUmV2aWV3Jyl9PC9vcHRpb24+XHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzdW1tYXJ5XCI+e3QoJ3NjaGVkLnR5cGVTdW1tYXJ5Jyl9PC9vcHRpb24+XHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJydW5cIj57dCgnc2NoZWQudHlwZVJ1bicpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic3luY1wiPnt0KCdzY2hlZC50eXBlU3luYycpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCB3aWR0aDogMTIwIH19IHBsYWNlaG9sZGVyPXt0KCdzY2hlZC5mb3JtSW50ZXJ2YWwnKX0gdmFsdWU9e3NjaGVkSW50ZXJ2YWx9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZEludGVydmFsKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAge3NjaGVkVHlwZSA9PT0gJ3J1bicgJiYgKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtVGl0bGUnKX0gdmFsdWU9e3NjaGVkVGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZFRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSByb3dzPXsyfSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtRGVzYycpfSB2YWx1ZT17c2NoZWREZXNjfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWREZXNjKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17c2NoZWROYW1lLnRyaW0oKSA9PT0gJyd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhZGRTY2hlZHVsZWQoKSB9fT57dCgnc2NoZWQuYWRkJyl9PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT57dCgnc2NoZWQuaGludCcpfTwvZGl2PlxyXG4gICAgICAgIHsoc2NoZWR1bGVkRGF0YSA/PyBbXSkubGVuZ3RoID09PSAwID8gKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc2NoZWQuZW1wdHknKX08L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cclxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cclxuICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgIDx0cj57WydzY2hlZC5jb2wubmFtZScsICdzY2hlZC5jb2wudHlwZScsICdzY2hlZC5jb2wuaW50ZXJ2YWwnLCAnc2NoZWQuY29sLm5leHQnLCAnc2NoZWQuY29sLmxhc3RSZXN1bHQnLCAnc2NoZWQuY29sLmFjdGlvbnMnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxyXG4gICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgeyhzY2hlZHVsZWREYXRhID8/IFtdKS5tYXAoKHRhc2spID0+IChcclxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3Rhc2suaWR9IHN0eWxlPXt7IG9wYWNpdHk6IHRhc2suZW5hYmxlZCA/IDEgOiAwLjQ1IH19PlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3Rhc2submFtZX17dGFzay50aXRsZSAhPT0gJycgPyA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cdUZGMDh7dGFzay50aXRsZX1cdUZGMDk8L3NwYW4+IDogbnVsbH08L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSh0YXNrLnR5cGUgPT09ICdyZXZpZXcnID8gJyM1NjljZDYnIDogdGFzay50eXBlID09PSAnc3VtbWFyeScgPyAnIzRlYzliMCcgOiAnI2Q3YmE3ZCcpfT57dGFzay50eXBlID09PSAncmV2aWV3JyA/IHQoJ3NjaGVkLnR5cGVSZXZpZXcnKSA6IHRhc2sudHlwZSA9PT0gJ3N1bW1hcnknID8gdCgnc2NoZWQudHlwZVN1bW1hcnknKSA6IHQoJ3NjaGVkLnR5cGVSdW4nKX08L3NwYW4+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pnt0YXNrLmludGVydmFsTWludXRlcyA+PSAxNDQwID8gTWF0aC5yb3VuZCh0YXNrLmludGVydmFsTWludXRlcyAvIDE0NDAgKiAxMCkgLyAxMCArIHQoJ3NjaGVkLmRheScpIDogdGFzay5pbnRlcnZhbE1pbnV0ZXMgPj0gNjAgPyBNYXRoLnJvdW5kKHRhc2suaW50ZXJ2YWxNaW51dGVzIC8gNjAgKiAxMCkgLyAxMCArIHQoJ3NjaGVkLmhvdXInKSA6IHRhc2suaW50ZXJ2YWxNaW51dGVzICsgdCgnc2NoZWQubWludXRlJyl9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pnt0YXNrLmVuYWJsZWQgPyBmb3JtYXRUaW1lKHRhc2submV4dER1ZUF0KSA6ICdcdTIwMTQnfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXhXaWR0aDogMjIwLCB3aGl0ZVNwYWNlOiAnbm9ybWFsJyB9fT57dGFzay5sYXN0UmVzdWx0IHx8ICh0YXNrLmxhc3RSdW5BdCAhPT0gbnVsbCA/IGZvcm1hdFRpbWUodGFzay5sYXN0UnVuQXQpIDogJ1x1MjAxNCcpfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzY2hlZHVsZWRBY3Rpb24oJ3VwZGF0ZScsIHsgaWQ6IHRhc2suaWQsIGVuYWJsZWQ6ICF0YXNrLmVuYWJsZWQgfSkgfX0+e3Rhc2suZW5hYmxlZCA/IHQoJ3NjaGVkLmRpc2FibGUnKSA6IHQoJ3NjaGVkLmVuYWJsZScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNjaGVkdWxlZEFjdGlvbigncnVuJywgeyBpZDogdGFzay5pZCB9KSB9fT57dCgnc2NoZWQucnVuTm93Jyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogJ1x1NTIyMFx1OTY2NFx1OEZEOVx1NEUyQVx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1RkYxRicsIG1lc3NhZ2U6ICdcdTMwMEMnICsgdGFzay5uYW1lICsgJ1x1MzAwRFx1NUMwNlx1ODhBQlx1NkMzOFx1NEU0NVx1NTIyMFx1OTY2NFx1MzAwMicsIGRhbmdlcjogdHJ1ZSwgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgc2NoZWR1bGVkQWN0aW9uKCdkZWxldGUnLCB7IGlkOiB0YXNrLmlkIH0pIH0gfSkgfX0+XHUyNzE1PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9DYXJkPlxyXG4gICAgPC8+XHJcbiAgKVxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHU5ODc1XHU3QjdFIFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IG5vdGVzVGFiID0gKFxyXG4gICAgPD5cclxuICAgICAgey8qIFx1MjUwMFx1MjUwMCBcdTdCMTRcdThCQjBcdUZGMUFcdTUzNjFcdTcyNDdcdTVGMEZcdTk2MDVcdThCRkIgKyBcdTU5MUFcdTg4NENcdTdGMTZcdThGOTEgKyBcdTY0MUNcdTdEMjIgKyBBSSBcdTYwM0JcdTdFRDMgXHUyNTAwXHUyNTAwICovfVxyXG4gICAgICA8Q2FyZCB0aXRsZT17dCgnbm90ZXMudGl0bGUnKX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIHdpZHRoOiAyMjAgfX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ25vdGVzLnNlYXJjaCcpfVxyXG4gICAgICAgICAgICB2YWx1ZT17bm90ZVNlYXJjaH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVTZWFyY2goZS50YXJnZXQudmFsdWUpIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxyXG4gICAgICAgICAgeygoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTdW1tYXJ5ID0gbm90ZXMuZmlsdGVyKChub3RlKSA9PiBub3RlLnNoYSA9PT0gJ3N1bW1hcnknKS5zb3J0KChhLCBiKSA9PiBiLmNyZWF0ZWRBdCAtIGEuY3JlYXRlZEF0KVswXVxyXG4gICAgICAgICAgICBjb25zdCBuZXdDb21taXRzID0gbGFzdFN1bW1hcnkgPT09IHVuZGVmaW5lZCA/IC0xXHJcbiAgICAgICAgICAgICAgOiAoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLmZpbHRlcigoY29tbWl0KSA9PiBjb21taXQuZGF0ZSA+IGxhc3RTdW1tYXJ5LmNyZWF0ZWRBdCkubGVuZ3RoXHJcbiAgICAgICAgICAgIGlmIChuZXdDb21taXRzID09PSAtMSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnbm90ZXMuZGlnZXN0TmV2ZXInKX08L3NwYW4+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5ld0NvbW1pdHMgPT09IDApIHJldHVybiBudWxsXHJcbiAgICAgICAgICAgIHJldHVybiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+e3QoJ25vdGVzLmRpZ2VzdFBlbmRpbmcnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcobmV3Q29tbWl0cykpfTwvc3Bhbj5cclxuICAgICAgICAgIH0pKCl9XHJcbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17YWlTdW1tYXJpemluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFpU3VtbWFyaXplKCkgfX0+XHJcbiAgICAgICAgICAgIHthaVN1bW1hcml6aW5nID8gdCgnbm90ZXMuYWlTdW1tYXJ5UnVuJykgOiAnXHUyNzI4ICcgKyB0KCdub3Rlcy5haVN1bW1hcnknKX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLmZvcm1Sb3csIGJvcmRlcjogJzFweCBkYXNoZWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBwYWRkaW5nOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ25vdGVzLmZvcm1UaXRsZScpfSB2YWx1ZT17bm90ZVRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCB9fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMudGFnc0hpbnQnKX0gdmFsdWU9e25vdGVUYWdzfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVRhZ3MoZS50YXJnZXQudmFsdWUpIH19IC8+XHJcbiAgICAgICAgICA8dGV4dGFyZWFcclxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX1cclxuICAgICAgICAgICAgcm93cz17Nn1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ25vdGVzLmNvbnRlbnRIaW50Jyl9XHJcbiAgICAgICAgICAgIHZhbHVlPXtub3RlQ29udGVudH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVDb250ZW50KGUudGFyZ2V0LnZhbHVlKSB9fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHJcbiAgICAgICAgICAgICAge3QoJ25vdGVzLmJvdW5kVG8nKX06IHtzZWxlY3RlZFRhcmdldHNbMF0gPT09ICd3b3JraW5nJyA/IHQoJ3JlcG8ud29ya2luZycpIDogc2VsZWN0ZWRUYXJnZXRzWzBdLnNsaWNlKDAsIDgpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17bm90ZVRpdGxlLnRyaW0oKSA9PT0gJycgfHwgbm90ZUNvbnRlbnQudHJpbSgpID09PSAnJ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFkZE5vdGUoKSB9fT57dCgnbm90ZXMuYWRkJyl9PC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7KCgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGtleXdvcmQgPSBub3RlU2VhcmNoLnRyaW0oKS50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICBjb25zdCBtYXRjaGVkID0ga2V5d29yZCA9PT0gJydcclxuICAgICAgICAgICAgPyBub3Rlc1xyXG4gICAgICAgICAgICA6IG5vdGVzLmZpbHRlcigobm90ZSkgPT4gKG5vdGUudGl0bGUgKyAnICcgKyBub3RlLmNvbnRlbnQgKyAnICcgKyAobm90ZS50YWdzID8/IFtdKS5qb2luKCcgJykpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoa2V5d29yZCkpXHJcbiAgICAgICAgICAvLyBcdTdGNkVcdTk4NzZcdTRGMThcdTUxNDhcdUZGMENcdTUxNzZcdTRGNTlcdTYzMDlcdTUyMUJcdTVFRkFcdTY1RjZcdTk1RjRcdTUwMTJcdTVFOEZcdTMwMDJcclxuICAgICAgICAgIGNvbnN0IHZpc2libGUgPSBbLi4ubWF0Y2hlZF0uc29ydCgobGVmdCwgcmlnaHQpID0+XHJcbiAgICAgICAgICAgIE51bWJlcihyaWdodC5waW5uZWQgPT09IHRydWUpIC0gTnVtYmVyKGxlZnQucGlubmVkID09PSB0cnVlKSB8fCByaWdodC5jcmVhdGVkQXQgLSBsZWZ0LmNyZWF0ZWRBdClcclxuICAgICAgICAgIGlmICh2aXNpYmxlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57bm90ZXMubGVuZ3RoID09PSAwID8gdCgnbm90ZXMuZW1wdHknKSA6IHQoJ25vdGVzLmVtcHR5U2VhcmNoJyl9PC9kaXY+XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdmlzaWJsZS5tYXAoKG5vdGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNTdW1tYXJ5ID0gbm90ZS5zaGEgPT09ICdzdW1tYXJ5J1xyXG4gICAgICAgICAgICBjb25zdCBlZGl0aW5nID0gZWRpdGluZ05vdGUgIT09IG51bGwgJiYgZWRpdGluZ05vdGUuaWQgPT09IG5vdGUuaWQgPyBlZGl0aW5nTm90ZSA6IG51bGxcclxuICAgICAgICAgICAgY29uc3QgZXhwYW5kZWQgPSBub3RlRXhwYW5kZWRbbm90ZS5pZF0gPT09IHRydWVcclxuICAgICAgICAgICAgY29uc3QgbG9uZyA9IG5vdGUuY29udGVudC5sZW5ndGggPiAyNjAgfHwgbm90ZS5jb250ZW50LnNwbGl0KCdcXG4nKS5sZW5ndGggPiA2XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAga2V5PXtub3RlLmlkfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLm5vdGVDYXJkLFxyXG4gICAgICAgICAgICAgICAgICAuLi4oaXNTdW1tYXJ5ID8geyBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wNCknLCBib3JkZXJDb2xvcjogJ3JnYmEoMzcsOTksMjM1LDAuMyknIH0gOiB7fSksXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtlZGl0aW5nICE9PSBudWxsID8gKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHZhbHVlPXtlZGl0aW5nLnRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RWRpdGluZ05vdGUoeyAuLi5lZGl0aW5nLCB0aXRsZTogZS50YXJnZXQudmFsdWUgfSkgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ25vdGVzLnRhZ3NIaW50Jyl9IHZhbHVlPXtlZGl0aW5nLnRhZ3N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFZGl0aW5nTm90ZSh7IC4uLmVkaXRpbmcsIHRhZ3M6IGUudGFyZ2V0LnZhbHVlIH0pIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezEwfSB2YWx1ZT17ZWRpdGluZy5jb250ZW50fSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RWRpdGluZ05vdGUoeyAuLi5lZGl0aW5nLCBjb250ZW50OiBlLnRhcmdldC52YWx1ZSB9KSB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnNHB4IDEycHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzYXZlTm90ZUVkaXQoKSB9fT57dCgnbm90ZXMuc2F2ZScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnNHB4IDEycHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0RWRpdGluZ05vdGUobnVsbCkgfX0+e3QoJ25vdGVzLmNhbmNlbCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e2lzU3VtbWFyeSA/ICdcdUQ4M0RcdURDRDYgJyA6ICcnfXtub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/ICdcdUQ4M0RcdURDQ0MgJyA6ICcnfXtub3RlLnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiBub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIDogdW5kZWZpbmVkIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e25vdGUucGlubmVkID09PSB0cnVlID8gdCgnbm90ZXMudW5waW4nKSA6IHQoJ25vdGVzLnBpbicpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCB0b2dnbGVOb3RlUGluKG5vdGUpIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdURDQ0M8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gdGl0bGU9e3QoJ25vdGVzLmNvcHlNZEhpbnQnKX0gb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1kID0gYCMgJHtub3RlLnRpdGxlfVxcblxcbiR7bm90ZS5jb250ZW50fVxcbmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkIG5hdmlnYXRvci5jbGlwYm9hcmQ/LndyaXRlVGV4dChtZCkudGhlbigoKSA9PiBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgnbm90ZXMuY29weU1kRG9uZScpKSkuY2F0Y2goKCkgPT4gc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgXHU1OTBEXHU1MjM2XHU1OTMxXHU4RDI1JykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19Plx1RDgzRFx1RENDQiB7dCgnbm90ZXMuY29weU1kJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IHRpdGxlPXt0KCdub3Rlcy5leHBvcnRNZEhpbnQnKX0gb25DbGljaz17KCkgPT4geyBleHBvcnROb3RlKG5vdGUpIH19Plx1RDgzRFx1RENCRSB7dCgnbm90ZXMuZXhwb3J0TWQnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gdGl0bGU9e3QoJ25vdGVzLnRvTWVtb3J5SGludCcpfSBvbkNsaWNrPXsoKSA9PiB7IHNldE1lbW9yeVRpdGxlKG5vdGUudGl0bGUpOyBzZXRNZW1vcnlDb250ZW50KG5vdGUuY29udGVudCk7IHNldEFjdGlvblJlc3VsdCh0KCdub3Rlcy50b01lbW9yeURvbmUnKSkgfX0+XHVEODNFXHVEREUwIHt0KCdub3Rlcy50b01lbW9yeScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgaWQ6IG5vdGUuaWQsIHRpdGxlOiBub3RlLnRpdGxlLCBjb250ZW50OiBub3RlLmNvbnRlbnQsIHRhZ3M6IChub3RlLnRhZ3MgPz8gW10pLmpvaW4oJywgJykgfSkgfX0+e3QoJ25vdGVzLmVkaXQnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6ICdcdTUyMjBcdTk2NjRcdThGRDlcdTY3NjFcdTdCMTRcdThCQjBcdUZGMUYnLCBtZXNzYWdlOiAnXHUzMDBDJyArIG5vdGUudGl0bGUgKyAnXHUzMDBEXHU1QzA2XHU4OEFCXHU2QzM4XHU0RTQ1XHU1MjIwXHU5NjY0XHVGRjBDXHU0RTBEXHU1M0VGXHU2MDYyXHU1OTBEXHUzMDAyJywgZGFuZ2VyOiB0cnVlLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCByZW1vdmVOb3RlKG5vdGUuaWQpIH0gfSkgfX0+XHUyNzE1PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7aXNTdW1tYXJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICA/IDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCAuLi4obG9uZyAmJiAhZXhwYW5kZWQgPyBzdHlsZXMubm90ZUNsYW1wIDoge30pIH19PntyZW5kZXJTdHJ1Y3R1cmVkQ29udGVudChub3RlLmNvbnRlbnQpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgOiA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ29udGVudCwgLi4uKGxvbmcgJiYgIWV4cGFuZGVkID8gc3R5bGVzLm5vdGVDbGFtcCA6IHt9KSB9fT57bm90ZS5jb250ZW50fTwvZGl2Pn1cclxuICAgICAgICAgICAgICAgICAgICB7bG9uZyAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMubGlua0J0bn0gb25DbGljaz17KCkgPT4geyBzZXROb3RlRXhwYW5kZWQoeyAuLi5ub3RlRXhwYW5kZWQsIFtub3RlLmlkXTogIWV4cGFuZGVkIH0pIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZXhwYW5kZWQgPyB0KCdub3Rlcy5jb2xsYXBzZScpIDogdCgnbm90ZXMuZXhwYW5kJyl9XHVGRjA4e25vdGUuY29udGVudC5sZW5ndGh9IFx1NUI1N1x1RkYwOVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICB7KG5vdGUudGFncyA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luVG9wOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyhub3RlLnRhZ3MgPz8gW10pLm1hcCgodGFnKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0YWd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoJyMyNTYzZWInKSwgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlcjogJ25vbmUnLCBwYWRkaW5nOiAnMXB4IDhweCcsIGJvcmRlclJhZGl1czogJzk5OXB4JywgZm9udFNpemU6ICcxMHB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXROb3RlU2VhcmNoKHRhZykgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA+I3t0YWd9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e25ldyBEYXRlKG5vdGUuY3JlYXRlZEF0KS50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIHtub3RlLnVwZGF0ZWRBdCAhPT0gdW5kZWZpbmVkICYmIG5vdGUudXBkYXRlZEF0ID4gbm90ZS5jcmVhdGVkQXQgKyAxMDAwICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHVGRjA4e3QoJ25vdGVzLmVkaXRlZEF0Jyl9IHtuZXcgRGF0ZShub3RlLnVwZGF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX1cdUZGMDk8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAge2lzU3VtbWFyeSAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9Pnt0KCdub3Rlcy5zdW1tYXJ5VGFnJyl9PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgIHtub3RlLnNoYSAhPT0gdW5kZWZpbmVkICYmIG5vdGUuc2hhICE9PSAnc3VtbWFyeScgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9Pntub3RlLnNoYSA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiBub3RlLnNoYS5zbGljZSgwLCA4KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSkoKX1cclxuICAgICAgPC9DYXJkPlxyXG4gICAgICA8Q2FyZCB0aXRsZT17dCgnbWVtb3J5LnpvbmVUaXRsZScpICsgKHByb2plY3QgIT09IG51bGwgPyAnIFx1MDBCNyAnICsgcHJvamVjdC5uYW1lIDogJycpfT5cclxuICAgICAgICB7LyogXHU1NDBDXHU2QjY1XHU3MkI2XHU2MDAxXHU2NzYxXHVGRjFBXHU1N0ZBXHU3RUJGICsgXHU4NDNEXHU1NDBFXHU2M0QwXHU0RUE0XHU2NTcwICsgXHU1NDBDXHU2QjY1XHU2MzA5XHU5NEFFICsgXHU1NDBDXHU2QjY1XHU2MkE1XHU1NDRBICovfVxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luQm90dG9tOiAnOHB4JywgcGFkZGluZzogJzZweCAxMHB4JywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknLCBib3JkZXJSYWRpdXM6ICc4cHgnIH19PlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JyB9fT5cdUQ4M0RcdUREMDQge3QoJ21lbW9yeS5zeW5jQmFzZWxpbmUnKX1cdUZGMUE8Yj57bWVtb3JpZXNEYXRhPy5iYXNlbGluZT8uc2hhICE9IG51bGwgPyBtZW1vcmllc0RhdGEuYmFzZWxpbmUuc2hhLnNsaWNlKDAsIDgpIDogdCgnbWVtb3J5LnN5bmNOb25lJyl9PC9iPjwvc3Bhbj5cclxuICAgICAgICAgIHttZW1vcmllc0RhdGE/LmJyYW5jaCAhPSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM1NjljZDYnKX0+e21lbW9yaWVzRGF0YS5icmFuY2h9PC9zcGFuPn1cclxuICAgICAgICAgIHsobWVtb3JpZXNEYXRhPy5iZWhpbmRDb3VudCA/PyAwKSA+IDAgJiYgKFxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSB9fT57dCgnbWVtb3J5LmJlaGluZCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhtZW1vcmllc0RhdGE/LmJlaGluZENvdW50ID8/IDApKX08L3NwYW4+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxyXG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IGRpc2FibGVkPXttZW1vcnlTeW5jaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc3luY01lbW9yaWVzKCkgfX0+XHJcbiAgICAgICAgICAgIHttZW1vcnlTeW5jaW5nID8gdCgnbWVtb3J5LnN5bmNpbmcnKSA6ICdcdUQ4M0RcdUREMDQgJyArIHQoJ21lbW9yeS5zeW5jJyl9XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7c3luY1JlcG9ydCAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnLCBwYWRkaW5nOiAnOHB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBiYWNrZ3JvdW5kOiBzeW5jUmVwb3J0Lm9rID09PSBmYWxzZSA/ICdyZ2JhKDIwOSwzNiw0NywwLjA2KScgOiAncmdiYSg3OCwyMDEsMTc2LDAuMDYpJywgYm9yZGVyOiAnMXB4IHNvbGlkICcgKyAoc3luY1JlcG9ydC5vayA9PT0gZmFsc2UgPyAncmdiYSgyMDksMzYsNDcsMC4zKScgOiAncmdiYSg3OCwyMDEsMTc2LDAuMyknKSB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+e3N5bmNSZXBvcnQub2sgPT09IGZhbHNlID8gJ1x1MjcxNyAnICsgdCgnbWVtb3J5LnN5bmNGYWlsZWQnKSA6ICdcdTI3MTMgJyArIChzeW5jUmVwb3J0LnZlcmRpY3QgPz8gJycpfTwvZGl2PlxyXG4gICAgICAgICAgICB7c3luY1JlcG9ydC5vayAhPT0gZmFsc2UgJiYgKHN5bmNSZXBvcnQuc3RhbGVQcm9wb3NhbHMgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwIH19Pnt0KCdtZW1vcnkuc3RhbGVUaXRsZScpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgeyhzeW5jUmVwb3J0LnN0YWxlUHJvcG9zYWxzID8/IFtdKS5tYXAoKHByb3Bvc2FsKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtwcm9wb3NhbC5pZH0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19Pntwcm9wb3NhbC50aXRsZX0gXHUyMDE0XHUyMDE0IHtwcm9wb3NhbC5yZWFzb259PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzFweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhcHBseVN5bmMoW3Byb3Bvc2FsLmlkXSwgJ21hcmstc3RhbGUnKSB9fT57dCgnbWVtb3J5Lm1hcmtTdGFsZScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzFweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhcHBseVN5bmMoW3Byb3Bvc2FsLmlkXSwgJ2FyY2hpdmUnKSB9fT57dCgnbWVtb3J5LmFyY2hpdmVCdG4nKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcxcHggOHB4JywgZm9udFNpemU6ICcxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFN5bmNSZXBvcnQoKHByZXZpb3VzKSA9PiBwcmV2aW91cyA9PT0gbnVsbCA/IG51bGwgOiB7IC4uLnByZXZpb3VzLCBzdGFsZVByb3Bvc2FsczogKHByZXZpb3VzLnN0YWxlUHJvcG9zYWxzID8/IFtdKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT09IHByb3Bvc2FsLmlkKSB9KSB9fT57dCgnbWVtb3J5LmtlZXBBY3RpdmUnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAge3N5bmNSZXBvcnQub2sgIT09IGZhbHNlICYmIChzeW5jUmVwb3J0Lm5ld0NhbmRpZGF0ZXMgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JywgZm9udFNpemU6ICcxMXB4JyB9fT5cclxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCB9fT57dCgnbWVtb3J5Lm5ld0NhbmRpZGF0ZXMnKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB7KHN5bmNSZXBvcnQubmV3Q2FuZGlkYXRlcyA/PyBbXSkubWFwKChjYW5kaWRhdGUsIGluZGV4KSA9PiA8ZGl2IGtleT17aW5kZXh9Plx1RkYwQiBbe2NhbmRpZGF0ZS50eXBlfV0ge2NhbmRpZGF0ZS50aXRsZX08L2Rpdj4pfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5saW5rQnRuLCBtYXJnaW5Ub3A6ICc0cHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0U3luY1JlcG9ydChudWxsKSB9fT57dCgnbWVtb3J5LmNsb3NlUmVwb3J0Jyl9PC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgIHsvKiBcdTYyNEJcdTUyQThcdTZERkJcdTUyQTBcdUZGMUFcdTY4MDdcdTk4OTggLyBcdTdDN0JcdTU3OEIgLyBcdTRGNUNcdTc1MjhcdTU3REYgLyBcdTUxODVcdTVCQjkgKi99XHJcbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxyXG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLm1lbW9yeVRpdGxlJyl9IHZhbHVlPXttZW1vcnlUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeVRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nIH19IHZhbHVlPXttZW1vcnlUeXBlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0TWVtb3J5VHlwZShlLnRhcmdldC52YWx1ZSkgfX0+XHJcbiAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhNRU1PUllfVFlQRV9MQUJFTFMpLm1hcCgoW3ZhbHVlLCBsYWJlbF0pID0+IDxvcHRpb24ga2V5PXt2YWx1ZX0gdmFsdWU9e3ZhbHVlfT57bGFiZWx9PC9vcHRpb24+KX1cclxuICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nIH19IHZhbHVlPXttZW1vcnlTY29wZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeVNjb3BlKGUudGFyZ2V0LnZhbHVlIGFzICdwcm9qZWN0JyB8ICdicmFuY2gnKSB9fT5cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInByb2plY3RcIj57dCgnbWVtb3J5LnNjb3BlUHJvamVjdCcpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYnJhbmNoXCI+e3QoJ21lbW9yeS5zY29wZUJyYW5jaCcpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcm93cz17M30gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0ubWVtb3J5Q29udGVudCcpfSB2YWx1ZT17bWVtb3J5Q29udGVudH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeUNvbnRlbnQoZS50YXJnZXQudmFsdWUpIH19IC8+XHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBtZW1vcnlUaXRsZS50cmltKCkgPT09ICcnIHx8IG1lbW9yeUNvbnRlbnQudHJpbSgpID09PSAnJ31cclxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdyZWNvcmRNZW1vcnknLCAnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5JywgeyBtZW1vcnlUeXBlLCBzY29wZTogbWVtb3J5U2NvcGUsIHRpdGxlOiBtZW1vcnlUaXRsZS50cmltKCksIGNvbnRlbnQ6IG1lbW9yeUNvbnRlbnQudHJpbSgpIH0pLnRoZW4oYXN5bmMgKCkgPT4geyBzZXRNZW1vcnlUaXRsZSgnJyk7IHNldE1lbW9yeUNvbnRlbnQoJycpOyBhd2FpdCBsb2FkTWVtb3JpZXMoKSB9KSB9fT5cclxuICAgICAgICAgICAgICB7YnVzeSA9PT0gJ3JlY29yZE1lbW9yeScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnbWVtb3J5LnJlY29yZCcpfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHsoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgYWxsID0gbWVtb3JpZXNEYXRhPy5tZW1vcmllcyA/PyBbXVxyXG4gICAgICAgICAgY29uc3QgcGVuZGluZyA9IGFsbC5maWx0ZXIoKG1lbW9yeSkgPT4gIW1lbW9yeS5pc0h1bWFuQ29uZmlybWVkICYmIG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnKVxyXG4gICAgICAgICAgY29uc3QgYWN0aXZlID0gYWxsLmZpbHRlcigobWVtb3J5KSA9PiBtZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJylcclxuICAgICAgICAgIGNvbnN0IGdyb3VwZWQgPSBuZXcgTWFwPHN0cmluZywgTWVtb3J5RW50cnlbXT4oKVxyXG4gICAgICAgICAgZm9yIChjb25zdCBtZW1vcnkgb2YgYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBncm91cGVkLmdldChtZW1vcnkudHlwZSkgPz8gW11cclxuICAgICAgICAgICAgbGlzdC5wdXNoKG1lbW9yeSlcclxuICAgICAgICAgICAgZ3JvdXBlZC5zZXQobWVtb3J5LnR5cGUsIGxpc3QpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIHtwZW5kaW5nLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+XHUyM0YzIHt0KCdtZW1vcnkucGVuZGluZ1F1ZXVlJyl9XHVGRjA4e1N0cmluZyhwZW5kaW5nLmxlbmd0aCl9XHVGRjA5PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIHtwZW5kaW5nLm1hcCgobWVtb3J5KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e21lbW9yeS5pZH0gc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDYXJkLCBib3JkZXJDb2xvcjogJ3JnYmEoMzcsOTksMjM1LDAuMyknLCBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wMyknIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVUZXh0fT57bWVtb3J5LnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFNocmluazogMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgY29uZmlybU1lbW9yeShtZW1vcnkuaWQpLnRoZW4oKCkgPT4geyB2b2lkIGxvYWRNZW1vcmllcygpIH0pIH19Pnt0KCdtZW1vcnkuY29uZmlybScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ3N0YXR1cycsIHsgaWQ6IG1lbW9yeS5pZCwgc3RhdHVzOiAnYXJjaGl2ZWQnIH0pIH19Pnt0KCdtZW1vcnkuYXJjaGl2ZUJ0bicpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVDb250ZW50fT57bWVtb3J5LmNvbnRlbnR9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCdyZ2JhKDM3LDk5LDIzNSwwLjE1KScpfT57TUVNT1JZX1NPVVJDRV9MQUJFTFNbbWVtb3J5LnNvdXJjZVRhZ10gPz8gbWVtb3J5LnNvdXJjZVRhZ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuYmFzaXNTaGEgIT09IG51bGwgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57bWVtb3J5LmJhc2lzU2hhLnNsaWNlKDAsIDgpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIHtbLi4uZ3JvdXBlZC5lbnRyaWVzKCldLm1hcCgoW3R5cGUsIGl0ZW1zXSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e3R5cGV9IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2VjdGlvblRpdGxlfT57TUVNT1JZX1RZUEVfTEFCRUxTW3R5cGVdID8/IHR5cGV9XHVGRjA4e1N0cmluZyhpdGVtcy5sZW5ndGgpfVx1RkYwOTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICB7aXRlbXMubWFwKChtZW1vcnkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17bWVtb3J5LmlkfSBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNhcmQsIG9wYWNpdHk6IG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnID8gMSA6IDAuNiB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e21lbW9yeS5pc0h1bWFuQ29uZmlybWVkID8gJ1x1MjcwNSAnIDogJyd9e21lbW9yeS50aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAsIGZsZXhXcmFwOiAnd3JhcCcsIGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHshbWVtb3J5LmlzSHVtYW5Db25maXJtZWQgJiYgbWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGNvbmZpcm1NZW1vcnkobWVtb3J5LmlkKS50aGVuKCgpID0+IHsgdm9pZCBsb2FkTWVtb3JpZXMoKSB9KSB9fT57dCgnbWVtb3J5LmNvbmZpcm0nKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5VG9Ob3RlKG1lbW9yeSkgfX0+XHVEODNEXHVEQ0M0IHt0KCdtZW1vcnkudG9Ob3RlJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5zY29wZSA9PT0gJ2JyYW5jaCcgJiYgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeUFjdGlvbignbm9ybWFsaXplJywgeyBpZDogbWVtb3J5LmlkIH0pIH19Plx1MjFGMSB7dCgnbWVtb3J5Lm5vcm1hbGl6ZScpfTwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeUFjdGlvbignc3RhdHVzJywgeyBpZDogbWVtb3J5LmlkLCBzdGF0dXM6ICdhcmNoaXZlZCcgfSkgfX0+e3QoJ21lbW9yeS5hcmNoaXZlQnRuJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ3N0YXR1cycsIHsgaWQ6IG1lbW9yeS5pZCwgc3RhdHVzOiAnYWN0aXZlJyB9KSB9fT57dCgnbWVtb3J5LnJlc3RvcmUnKX08L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ29udGVudCwgbWF4SGVpZ2h0OiA4NCwgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PnttZW1vcnkuY29udGVudH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlTWV0YX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc3RhdHVzID09PSAnc3RhbGUnICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNkOTc3MDYnKX0+e3QoJ21lbW9yeS5zdGF0dXNTdGFsZScpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc2NvcGUgPT09ICdicmFuY2gnICYmIG1lbW9yeS5naXRCcmFuY2ggIT09IG51bGwgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzU2OWNkNicpfT5cdTIzODcge21lbW9yeS5naXRCcmFuY2h9PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSgzNyw5OSwyMzUsMC4xNSknKX0+e01FTU9SWV9TT1VSQ0VfTEFCRUxTW21lbW9yeS5zb3VyY2VUYWddID8/IG1lbW9yeS5zb3VyY2VUYWd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LmJhc2lzU2hhICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e21lbW9yeS5iYXNpc1NoYS5zbGljZSgwLCA4KX08L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bmV3IERhdGUobWVtb3J5LnVwZGF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICB7YWxsLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdtZW1vcnkuZW1wdHknKX08L2Rpdj59XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH0pKCl9XHJcbiAgICAgIDwvQ2FyZD5cclxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2NvbmNlcHRzLnRpdGxlJyl9PlxyXG4gICAgICAgIHtjb25jZXB0cy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdjb25jZXB0cy5ub25lJyl9PC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cclxuICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgIDx0cj57Wydjb25jZXB0cy5jb2wubmFtZScsICdjb25jZXB0cy5jb2wuY2F0ZWdvcnknLCAnY29uY2VwdHMuY29sLmNvdW50J10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHtjb25jZXB0cy5tYXAoKGNvbmNlcHQpID0+IChcclxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e2NvbmNlcHQuaWR9PlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2NvbmNlcHQubmFtZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2NvbmNlcHQuY2F0ZWdvcnl9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntTdHJpbmcoY29uY2VwdC5vY2N1cnJlbmNlcyl9PC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQ2FyZD5cclxuICAgIDwvPlxyXG4gIClcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFJldmlldyBcdTk1RUVcdTk4OThcdTk4NzVcdTdCN0VcdUZGMUFcdTUxNjhcdTkxQ0ZcdTk1RUVcdTk4OThcdTc3MEJcdTY3N0ZcdUZGMDhcdTdFREZcdThCQTEgKyBcdTdCNUJcdTkwMDkgKyBcdTcyQjZcdTYwMDFcdTZENDFcdThGNkNcdUZGMDkrIFx1OUE4Q1x1NjUzNlx1OEJCMFx1NUY1NSBcdTI1MDBcdTI1MDBcclxuICBjb25zdCByZXZpZXdUYWIgPSAoXHJcbiAgICA8PlxyXG4gICAgICB7cmVzdWx0UGFuZWx9XHJcbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdyZXZpZXcucmVjb3Jkc1RpdGxlJyl9PlxyXG4gICAgICAgIHsoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgYWxsID0gKGlzc3Vlc0RhdGEgPz8gW10pLm1hcCgoaXNzdWUpID0+ICh7IC4uLmlzc3VlLCBzZXZlcml0eTogbm9ybWFsaXplSXNzdWVTZXZlcml0eShpc3N1ZS5zZXZlcml0eSkgfSkpXHJcbiAgICAgICAgICBjb25zdCBvcGVuQ291bnQgPSBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykubGVuZ3RoXHJcbiAgICAgICAgICAvLyBcdThCQTFcdTY1NzAgY2hpcHMgXHU4RERGXHU5NjhGXHU3MkI2XHU2MDAxXHU3QjVCXHU5MDA5XHVGRjA4XCJcdTUxNjhcdTkwRThcIj0gXHU3MkI2XHU2MDAxXHU3QjVCXHU5MDA5XHU1NDBFXHU3Njg0XHU2MDNCXHU2NTcwXHVGRjA5XHVGRjFBXHU5MDA5XCJcdTVERjJcdTg5RTNcdTUxQjNcIlx1NTQwRVx1NTQwNFx1NEUyNVx1OTFDRFx1NUVBNlx1NjU3MFx1NUI1N1x1N0FDQlx1NTM3M1x1NUJGOVx1NUU5NFx1NURGMlx1ODlFM1x1NTFCM1x1NTIxN1x1ODg2OFx1MzAwMlxyXG4gICAgICAgICAgY29uc3Qgc3RhdHVzRmlsdGVyZWQgPSBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWVTdGF0dXNGaWx0ZXIgPT09ICcnIHx8IGlzc3VlLnN0YXR1cyA9PT0gaXNzdWVTdGF0dXNGaWx0ZXIpXHJcbiAgICAgICAgICBjb25zdCBjb3VudHM6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfT4gPSBbXHJcbiAgICAgICAgICAgIHsga2V5OiAnJywgbGFiZWw6IHQoJ3Jldmlldy5maWx0ZXJBbGwnKSwgY291bnQ6IHN0YXR1c0ZpbHRlcmVkLmxlbmd0aCB9LFxyXG4gICAgICAgICAgICB7IGtleTogJ2NyaXRpY2FsJywgbGFiZWw6ICdjcml0aWNhbCcsIGNvdW50OiBzdGF0dXNGaWx0ZXJlZC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBpc3N1ZS5zZXZlcml0eSA9PT0gJ2Jsb2NrZXInKS5sZW5ndGggfSxcclxuICAgICAgICAgICAgeyBrZXk6ICdtYWpvcicsIGxhYmVsOiAnbWFqb3InLCBjb3VudDogc3RhdHVzRmlsdGVyZWQuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdtYWpvcicpLmxlbmd0aCB9LFxyXG4gICAgICAgICAgICB7IGtleTogJ21pbm9yJywgbGFiZWw6ICdtaW5vcicsIGNvdW50OiBzdGF0dXNGaWx0ZXJlZC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zZXZlcml0eSA9PT0gJ21pbm9yJykubGVuZ3RoIH0sXHJcbiAgICAgICAgICAgIHsga2V5OiAnaW5mbycsIGxhYmVsOiAnaW5mbycsIGNvdW50OiBzdGF0dXNGaWx0ZXJlZC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2luZm8nKS5sZW5ndGggfSxcclxuICAgICAgICAgIF1cclxuICAgICAgICAgIGNvbnN0IHZpc2libGUgPSBzdGF0dXNGaWx0ZXJlZFxyXG4gICAgICAgICAgICAuZmlsdGVyKChpc3N1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChpc3N1ZVNldmVyaXR5RmlsdGVyID09PSAnJykgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgICBpZiAoaXNzdWVTZXZlcml0eUZpbHRlciA9PT0gJ2NyaXRpY2FsJykgcmV0dXJuIGlzc3VlLnNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IGlzc3VlLnNldmVyaXR5ID09PSAnYmxvY2tlcidcclxuICAgICAgICAgICAgICByZXR1cm4gaXNzdWUuc2V2ZXJpdHkgPT09IGlzc3VlU2V2ZXJpdHlGaWx0ZXJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIGNvbnN0IGNoZWNrZWRWaXNpYmxlID0gdmlzaWJsZS5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZUNoZWNrZWRbaXNzdWUuaWRdID09PSB0cnVlKVxyXG4gICAgICAgICAgY29uc3QgY2hlY2tlZE9wZW4gPSBjaGVja2VkVmlzaWJsZS5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKVxyXG4gICAgICAgICAgY29uc3QgY2hlY2tlZE9wZW5UYXJnZXRzID0gQXJyYXkuZnJvbShuZXcgU2V0KGNoZWNrZWRPcGVuLm1hcCgoaXNzdWUpID0+IGlzc3VlLmNoYW5nZUlkKSkpXHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICAgICAgICB7Y291bnRzLm1hcCgoaXRlbSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGtleT17aXRlbS5rZXkgPT09ICcnID8gJ2FsbCcgOiBpdGVtLmtleX0gc3R5bGU9e3N0eWxlcy5jaGlwKGlzc3VlU2V2ZXJpdHlGaWx0ZXIgPT09IGl0ZW0ua2V5KX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldElzc3VlU2V2ZXJpdHlGaWx0ZXIoaXRlbS5rZXkpIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLmxhYmVsfSBcdTAwQjcge2l0ZW0uY291bnR9XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAnMTZweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxyXG4gICAgICAgICAgICAgICAgICB7b3BlbkNvdW50fSBcdTVGODVcdTU5MDRcdTc0MDYgLyBcdTUxNzEge2FsbC5sZW5ndGh9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB7KHN0YXRlPy5yZXNvbHZlZElzc3VlUmV0ZW50aW9uRGF5cyA/PyAwKSA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcucmV0ZW50aW9uSGludCcpLnJlcGxhY2UoJ3tkYXlzfScsIFN0cmluZyhzdGF0ZT8ucmVzb2x2ZWRJc3N1ZVJldGVudGlvbkRheXMgPz8gNykpfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIHdpZHRoOiAnMTRweCcsIGhlaWdodDogJzE0cHgnLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLCBmb250U2l6ZTogJzEwcHgnLCBsaW5lSGVpZ2h0OiAxLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgY3Vyc29yOiAnaGVscCcsIHVzZXJTZWxlY3Q6ICdub25lJywgZmxleFNocmluazogMCB9fVxyXG4gICAgICAgICAgICAgICAgICA+Pzwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cclxuICAgICAgICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJywgcGFkZGluZzogJzNweCAyNHB4IDNweCA4cHgnIH19IHZhbHVlPXtpc3N1ZVN0YXR1c0ZpbHRlcn0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldElzc3VlU3RhdHVzRmlsdGVyKGUudGFyZ2V0LnZhbHVlKSB9fT5cclxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt0KCdyZXZpZXcuc3RhdHVzQWxsJyl9PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhJU1NVRV9TVEFUVVNfTEFCRUxTKS5tYXAoKFt2YWx1ZSwgbGFiZWxdKSA9PiA8b3B0aW9uIGtleT17dmFsdWV9IHZhbHVlPXt2YWx1ZX0+e2xhYmVsfTwvb3B0aW9uPil9XHJcbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRJc3N1ZUNoZWNrZWQoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGxDaGVja2VkID0gdmlzaWJsZS5ldmVyeSgoaXNzdWUpID0+IHByZXZpb3VzW2lzc3VlLmlkXSA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH1cclxuICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXNzdWUgb2YgdmlzaWJsZSkgbmV4dFtpc3N1ZS5pZF0gPSAhYWxsQ2hlY2tlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHRcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPnt0KCdyZXZpZXcuc2VsZWN0QWxsJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSB0aXRsZT17dCgncmV2aWV3LmV4cG9ydE1kSGludCcpfSBvbkNsaWNrPXsoKSA9PiB7IGV4cG9ydElzc3Vlc01kKHZpc2libGUpIH19Pnt0KCdyZXZpZXcuZXhwb3J0TWQnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcudHJpYWdlSGludCcpfVxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3BlbkNvdW50ID0gdmlzaWJsZS5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKS5sZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BlbkNvdW50ID09PSAwKSB7IHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyB0KCdmaXguZGlzcGF0Y2hOb09wZW4nKSk7IHJldHVybiB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0Q29uZmlybURpYWxvZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdCgncmV2aWV3LnRyaWFnZUNvbmZpcm1UaXRsZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogdCgncmV2aWV3LnRyaWFnZUNvbmZpcm1Nc2cnKS5yZXBsYWNlKCd7bn0nLCAnNDAnKSxcclxuICAgICAgICAgICAgICAgICAgICAgIGRhbmdlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25maXJtTGFiZWw6IHQoJ3Jldmlldy50cmlhZ2UnKSxcclxuICAgICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHJ1blRyaWFnZSgpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID57dCgncmV2aWV3LnRyaWFnZScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgeygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIFx1NkQzRVx1NTNEMVx1NUJGOVx1OEM2MVx1RkYxQVx1NTJGRVx1OTAwOVx1NzY4NFx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1NEYxOFx1NTE0OFx1RkYxQlx1NjcyQVx1NTJGRVx1OTAwOSA9IFx1NUY1M1x1NTI0RFx1N0I1Qlx1OTAwOVx1NEUwQlx1NTE2OFx1OTBFOFx1NUY4NVx1NTkwNFx1NzQwNlx1RkYwOFx1NUUzOFx1OUE3Qlx1NTE2NVx1NTNFM1x1RkYwQ1x1NEUwRFx1NTE4RFx1ODVDRlx1RkYwOVx1MzAwMlxyXG4gICAgICAgICAgICAgICAgICBjb25zdCBvcGVuVmlzaWJsZSA9IHZpc2libGUuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJylcclxuICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tlZElkcyA9IG9wZW5WaXNpYmxlLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlQ2hlY2tlZFtpc3N1ZS5pZF0gPT09IHRydWUpLm1hcCgoaXNzdWUpID0+IGlzc3VlLmlkKVxyXG4gICAgICAgICAgICAgICAgICBjb25zdCBpZHMgPSBjaGVja2VkSWRzLmxlbmd0aCA+IDAgPyBjaGVja2VkSWRzIDogb3BlblZpc2libGUubWFwKChpc3N1ZSkgPT4gaXNzdWUuaWQpXHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgZm9udFdlaWdodDogNjAwIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgnZml4LmRpc3BhdGNoSGludE1haW4nKX1cclxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkcy5sZW5ndGggPT09IDApIHsgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIHQoJ2ZpeC5kaXNwYXRjaE5vT3BlbicpKTsgcmV0dXJuIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29uZmlybURpYWxvZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHQoJ2ZpeC5kaXNwYXRjaE1vZGVUaXRsZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHQoJ2ZpeC5kaXNwYXRjaE1vZGVNc2cnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoaWRzLmxlbmd0aCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRhbmdlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybUxhYmVsOiB0KCdmaXguZGlzcGF0Y2hBdXRvJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0OiB7IGxhYmVsOiB0KCdmaXguZGlzcGF0Y2hQbGFuJyksIG9uQWx0OiAoKSA9PiB7IHZvaWQgZGlzcGF0Y2hGaXgoW10sIGlkcywgJ3BsYW4nKSB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgZGlzcGF0Y2hGaXgoW10sIGlkcywgJ2ZpeCcpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdURFODAge3QoJ2ZpeC5kaXNwYXRjaCcpfSh7U3RyaW5nKGlkcy5sZW5ndGgpfSk8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfSkoKX1cclxuICAgICAgICAgICAgICAgIHsoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBwZW5kaW5nUGxhbnMgPSB2aXNpYmxlLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLmZpeFBsYW4/LnN0YXR1cyA9PT0gJ3BlbmRpbmcnKVxyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gcGVuZGluZ1BsYW5zLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgnZml4LmRpc3BhdGNoUGxhbnNIaW50Jyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogdCgnZml4LmRpc3BhdGNoUGxhbnMnKSwgbWVzc2FnZTogYFx1NUMwNlx1NkQzRVx1NTNEMSAke1N0cmluZyhwZW5kaW5nUGxhbnMubGVuZ3RoKX0gXHU0RTJBXHU1REYyXHU0RUE3XHU1MUZBXHU3Njg0XHU0RkVFXHU1OTBEXHU2NUI5XHU2ODQ4XHU3RUQ5XHU1QjUwIEFnZW50IFx1NUU3Nlx1NTNEMVx1NjI2N1x1ODg0Q1x1RkYwOFx1NzJFQ1x1N0FDQiB3b3JrdHJlZVx1RkYwQ1x1NkQ4OFx1ODAxN1x1NkEyMVx1NTc4Qlx1NzUyOFx1OTFDRlx1RkYxQlx1NUI4Q1x1NjIxMFx1NTQwRVx1ODFFQVx1NTJBOFx1NTZERVx1NTE5OVx1NUU3Nlx1NjNEMFx1NEVBNFx1RkYwOVx1MzAwMmAsIGRhbmdlcjogZmFsc2UsIGNvbmZpcm1MYWJlbDogdCgnZml4LmRpc3BhdGNoUGxhbnMnKSwgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgZGlzcGF0Y2hGaXgocGVuZGluZ1BsYW5zLm1hcCgoaXNzdWUpID0+IGlzc3VlLmZpeFBsYW4hLmlkKSwgW10sICdmaXgnKSB9IH0pIH19XHJcbiAgICAgICAgICAgICAgICAgICAgPlx1RDgzRFx1RENFNiB7dCgnZml4LmRpc3BhdGNoUGxhbnMnKX0oe1N0cmluZyhwZW5kaW5nUGxhbnMubGVuZ3RoKX0pPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICkgOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9KSgpfVxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJc3N1ZXMoKSB9fT57dCgncmV2aWV3LnJlZnJlc2gnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICB7Zml4VGFza3MubGVuZ3RoID4gMCAmJiAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgRklYX1NUQVRVU19MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7IHF1ZXVlZDogdCgnZml4LnRhc2tRdWV1ZWQnKSwgcnVubmluZzogdCgnZml4LnRhc2tSdW5uaW5nJyksIG1lcmdpbmc6IHQoJ2ZpeC50YXNrTWVyZ2luZycpLCByZWRvOiB0KCdmaXgudGFza1JlZG8nKSwgZG9uZTogdCgnZml4LnRhc2tEb25lJyksIGNvbmZsaWN0OiB0KCdmaXgudGFza0NvbmZsaWN0JyksIGZhaWxlZDogdCgnZml4LnRhc2tGYWlsZWQnKSwgY2FuY2VsbGVkOiB0KCdmaXgudGFza0NhbmNlbGxlZCcpIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpeEFjdGl2ZSA9IGZpeFRhc2tzLnNvbWUoKHRhc2spID0+IHRhc2suc3RhdHVzID09PSAncXVldWVkJyB8fCB0YXNrLnN0YXR1cyA9PT0gJ3J1bm5pbmcnIHx8IHRhc2suc3RhdHVzID09PSAnbWVyZ2luZycgfHwgdGFzay5zdGF0dXMgPT09ICdyZWRvJylcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIDxDYXJkIHRpdGxlPXsnXHVEODNFXHVERDE2ICcgKyB0KCdmaXguc3RhdHVzJyl9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7U3RyaW5nKGZpeFRhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay5zdGF0dXMgPT09ICdkb25lJykubGVuZ3RoKX0ve1N0cmluZyhmaXhUYXNrcy5sZW5ndGgpfSB7dCgnZml4LnRhc2tEb25lJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7Zml4QWN0aXZlICYmIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBjYW5jZWxGaXgoKSB9fT5cdTIzRjkge3QoJ2ZpeC5zdG9wJyl9PC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHtmaXhUYXNrcy5tYXAoKHRhc2spID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXt0YXNrLmlzc3VlSWR9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCBwYWRkaW5nOiAnNnB4IDRweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwzLCByZ2JhKDUsNSw1LDAuMDYpKScsIGZvbnRTaXplOiAnMTFweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UodGFzay5zdGF0dXMgPT09ICdkb25lJyA/ICcjNGVjOWIwJyA6IHRhc2suc3RhdHVzID09PSAncXVldWVkJyA/ICcjOGI5NDllJyA6IHRhc2suc3RhdHVzID09PSAncnVubmluZycgfHwgdGFzay5zdGF0dXMgPT09ICdtZXJnaW5nJyB8fCB0YXNrLnN0YXR1cyA9PT0gJ3JlZG8nID8gJyNkY2RjYWEnIDogJyNmMTRjNGMnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge0ZJWF9TVEFUVVNfTEFCRUxTW3Rhc2suc3RhdHVzXSA/PyB0YXNrLnN0YXR1c317dGFzay5tb2RlID09PSAncGxhbicgPyAnXHUwMEI3XHU2NUI5XHU2ODQ4JyA6ICcnfXt0YXNrLmF0dGVtcHQgPiAxID8gYFx1MDBCNyR7dCgnZml4LmF0dGVtcHQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcodGFzay5hdHRlbXB0KSl9YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IHRhc2suc3RhdHVzID09PSAncnVubmluZycgfHwgdGFzay5zdGF0dXMgPT09ICdtZXJnaW5nJyB8fCB0YXNrLnN0YXR1cyA9PT0gJ3JlZG8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3RpdmUpIHJldHVybiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGgubWF4KDAsIE1hdGgucm91bmQoKERhdGUubm93KCkgLSAodGFzay5zdGFydGVkQXQgPz8gRGF0ZS5ub3coKSkpIC8gNjBfMDAwKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBleHRyYSA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbnV0ZXMgPiAwID8gdCgnZml4LnJ1bnRpbWUnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcobWludXRlcykpIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFzay5yZXN1bWVzID8/IDApID4gMCA/IHQoJ2ZpeC5yZXN1bWVzJykucmVwbGFjZSgne259JywgU3RyaW5nKHRhc2sucmVzdW1lcykpIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFzay5wcm9iZXMgPz8gMCkgPiAwID8gdCgnZml4LnByb2JlcycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyh0YXNrLnByb2JlcykpIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXS5maWx0ZXIoKHBhcnQpID0+IHBhcnQgIT09ICcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBleHRyYS5sZW5ndGggPiAwID8gPHNwYW4gc3R5bGU9e3sgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGZsZXhTaHJpbms6IDAgfX0+e2V4dHJhLmpvaW4oJyBcdTAwQjcgJyl9PC9zcGFuPiA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWluV2lkdGg6IDAsIGZsZXg6IDEgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgZm9udFdlaWdodDogNjAwLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+e3Rhc2sudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsodGFzay5zdGF0dXMgPT09ICdydW5uaW5nJyB8fCB0YXNrLnN0YXR1cyA9PT0gJ3F1ZXVlZCcpICYmIHRhc2suY3VycmVudEFjdGlvbiAhPT0gdW5kZWZpbmVkICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpLCBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJyB9fT5cdTI1Qjgge3Rhc2suY3VycmVudEFjdGlvbn08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5zdW1tYXJ5ICE9PSB1bmRlZmluZWQgJiYgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3Rhc2suc3VtbWFyeX08L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt0YXNrLmltcGFjdCAhPT0gdW5kZWZpbmVkICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UodGFzay5pbXBhY3Qucmlza0xldmVsID09PSAnbG93JyA/ICcjNGVjOWIwJyA6IHRhc2suaW1wYWN0LnJpc2tMZXZlbCA9PT0gJ21lZGl1bScgPyAnI2RjZGNhYScgOiAnI2YxNGM0YycpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdTVGNzFcdTU0Q0Qge3Rhc2suaW1wYWN0LnJpc2tMZXZlbH0oe1N0cmluZyh0YXNrLmltcGFjdC5yaXNrU2NvcmUpfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7JyAnfVx1NzZGNFx1NjNBNSB7U3RyaW5nKHRhc2suaW1wYWN0LmRpcmVjdC5sZW5ndGgpfSBcdTAwQjcgXHU5NUY0XHU2M0E1IHtTdHJpbmcodGFzay5pbXBhY3QuaW5kaXJlY3QubGVuZ3RoKX0gXHUwMEI3IFx1NkY1Q1x1NTcyOCB7U3RyaW5nKHRhc2suaW1wYWN0LnBvdGVudGlhbC5sZW5ndGgpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YXNrLmltcGFjdC5pbmRpcmVjdC5sZW5ndGggPiAwID8gYFx1RkYwOFx1NTk4MiAke3Rhc2suaW1wYWN0LmluZGlyZWN0LnNsaWNlKDAsIDIpLmpvaW4oJywgJyl9XHVGRjA5YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5lcnJvciAhPT0gdW5kZWZpbmVkICYmIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2QxMjQyZicpIH19Pnt0YXNrLmVycm9yfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyh0YXNrLmZpbGVzID8/IFtdKS5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Rhc2suZmlsZXMhLnNsaWNlKDAsIDQpLmpvaW4oJywgJyl9e3Rhc2suY29tbWl0ICE9PSB1bmRlZmluZWQgPyBgIFx1MDBCNyAke3Rhc2suY29tbWl0fWAgOiAnJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgPC9DYXJkPlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgIH0pKCl9XHJcbiAgICAgICAgICAgICAgeyhjaGVja2VkVmlzaWJsZS5sZW5ndGggPiAwIHx8IGJhdGNoVmVyaWZ5U3RhdGUgIT09IG51bGwgfHwgdHJpYWdlU3RhdGUgIT09IG51bGwpICYmIChcclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgcGFkZGluZzogJzZweCAxMHB4JywgbWFyZ2luQm90dG9tOiAnMTBweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEpKScsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTFweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgIHtiYXRjaFZlcmlmeVN0YXRlICE9PSBudWxsID8gKFxyXG4gICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHUyM0YzIHt0KCdyZXZpZXcuYmF0Y2hQcm9ncmVzcycpLnJlcGxhY2UoJ3tpfScsIFN0cmluZyhiYXRjaFZlcmlmeVN0YXRlLmRvbmUpKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoYmF0Y2hWZXJpZnlTdGF0ZS50b3RhbCkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBiYXRjaFN0b3BSZWYuY3VycmVudCA9IHRydWUgfX0+e3QoJ3Jldmlldy5iYXRjaFN0b3AnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgKSA6IHRyaWFnZVN0YXRlICE9PSBudWxsID8gKFxyXG4gICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHUyM0YzIHt0KCdyZXZpZXcudHJpYWdlUHJvZ3Jlc3MnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcodHJpYWdlU3RhdGUucHJvY2Vzc2VkKSkucmVwbGFjZSgne219JywgdHJpYWdlU3RhdGUucmVtYWluaW5nID49IDAgPyBTdHJpbmcodHJpYWdlU3RhdGUucmVtYWluaW5nKSA6ICdcdTIwMjYnKX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgYmF0Y2hTdG9wUmVmLmN1cnJlbnQgPSB0cnVlIH19Pnt0KCdyZXZpZXcudHJpYWdlU3RvcCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57dCgncmV2aWV3LmNoZWNrZWRDb3VudCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhjaGVja2VkVmlzaWJsZS5sZW5ndGgpKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7Y2hlY2tlZE9wZW5UYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3Jldmlldy5iYXRjaFZlcmlmeUNvbmZpcm1Nc2cnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoY2hlY2tlZE9wZW5UYXJnZXRzLmxlbmd0aCkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyh7IHRpdGxlOiB0KCdyZXZpZXcuYmF0Y2hWZXJpZnlDb25maXJtVGl0bGUnKSwgbWVzc2FnZTogdCgncmV2aWV3LmJhdGNoVmVyaWZ5Q29uZmlybU1zZycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhjaGVja2VkT3BlblRhcmdldHMubGVuZ3RoKSksIGRhbmdlcjogZmFsc2UsIGNvbmZpcm1MYWJlbDogdCgncmV2aWV3LmJhdGNoVmVyaWZ5JyksIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHJ1bkJhdGNoVmVyaWZ5KGNoZWNrZWRPcGVuVGFyZ2V0cykgfSB9KSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHVEODNEXHVERDBEIHt0KCdyZXZpZXcuYmF0Y2hWZXJpZnknKX0oe1N0cmluZyhjaGVja2VkT3BlblRhcmdldHMubGVuZ3RoKX0pPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAge2NoZWNrZWRPcGVuLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWFya0lzc3Vlc0hhbmRsZWQoY2hlY2tlZE9wZW4ubWFwKChpc3N1ZSkgPT4gaXNzdWUuaWQpKSB9fT5cdTI3MTMge3QoJ3Jldmlldy5tYXJrSGFuZGxlZCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgZXhwb3J0SXNzdWVzTWQoY2hlY2tlZFZpc2libGUpIH19Pnt0KCdyZXZpZXcuZXhwb3J0TWQnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0SXNzdWVDaGVja2VkKHt9KSB9fT57dCgncGlja2VyLmNsZWFyJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIHthbGwubGVuZ3RoID09PSAwID8gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57aXNzdWVzRGF0YSA9PT0gbnVsbCA/ICdcdTIwMjYnIDogdCgncmV2aWV3LnJlY29yZHNFbXB0eScpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICkgOiB2aXNpYmxlLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ25vdGVzLmVtcHR5U2VhcmNoJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgKSA6IHZpc2libGUubWFwKChpc3N1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXhwYW5kZWQgPSBpc3N1ZUV4cGFuZGVkW2lzc3VlLmlkXSA9PT0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBpc3N1ZS5kZXNjcmlwdGlvbiA/PyAnJ1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9uZyA9IGRlc2NyaXB0aW9uLmxlbmd0aCA+IDIwMFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2lzc3VlLmlkfSBzdHlsZT17c3R5bGVzLm5vdGVDYXJkfT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtpc3N1ZUNoZWNrZWRbaXNzdWUuaWRdID09PSB0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB7IHNldElzc3VlQ2hlY2tlZCgocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBbaXNzdWUuaWRdOiAhKHByZXZpb3VzW2lzc3VlLmlkXSA9PT0gdHJ1ZSkgfSkpIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luOiAwLCBmbGV4U2hyaW5rOiAwLCBjdXJzb3I6ICdwb2ludGVyJywgYWNjZW50Q29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2Uoc2V2ZXJpdHlDb2xvcihpc3N1ZS5zZXZlcml0eSkpfT57aXNzdWUuc2V2ZXJpdHl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNzdWUuY2F0ZWdvcnkgPyA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNTc2MDZhJyl9Pntpc3N1ZS5jYXRlZ29yeX08L3NwYW4+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnID8gJyNkY2RjYWEnIDogaXNzdWUuc3RhdHVzID09PSAncmVzb2x2ZWQnIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2FjY2VwdGVkJyA/ICcjNGVjOWIwJyA6ICcjOGI4YjhiJyl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtJU1NVRV9TVEFUVVNfTEFCRUxTW2lzc3VlLnN0YXR1c10gPz8gaXNzdWUuc3RhdHVzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e2lzc3VlLnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3ZlcmlmeWluZ1RhcmdldCAhPT0gbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcudmVyaWZ5SGludCcpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHZlcmlmeUlzc3Vlcyhpc3N1ZS5jaGFuZ2VJZCkgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA+e3ZlcmlmeWluZ1RhcmdldCA9PT0gaXNzdWUuY2hhbmdlSWQgPyB0KCdyZXZpZXcudmVyaWZ5UnVubmluZycpIDogJ1x1RDgzRFx1REQwRCAnICsgdCgncmV2aWV3LnZlcmlmeScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcuZmFsc2VQb3NpdGl2ZUhpbnQnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29uZmlybURpYWxvZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHQoJ3Jldmlldy5mYWxzZVBvc2l0aXZlVGl0bGUnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB0KCdyZXZpZXcuZmFsc2VQb3NpdGl2ZU1zZycpLnJlcGxhY2UoJ3t0aXRsZX0nLCBpc3N1ZS50aXRsZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFuZ2VyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtTGFiZWw6IHQoJ3Jldmlldy5mYWxzZVBvc2l0aXZlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaXNzdWVzL3N0YXR1cycsIHsgaWQ6IGlzc3VlLmlkLCBzdGF0dXM6ICdyZWplY3RlZCcgfSkudGhlbihhc3luYyAoeyBvayB9KSA9PiB7IGlmIChvaykgYXdhaXQgbG9hZElzc3VlcygpIH0pIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdURFQUIge3QoJ3Jldmlldy5mYWxzZVBvc2l0aXZlJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3Jldmlldy5tYXJrSGFuZGxlZCcpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIG1hcmtJc3N1ZXNIYW5kbGVkKFtpc3N1ZS5pZF0pIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlx1MjcxMyB7dCgncmV2aWV3Lm1hcmtIYW5kbGVkJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7ZGVzY3JpcHRpb24gIT09ICcnICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCAuLi4obG9uZyAmJiAhZXhwYW5kZWQgPyBzdHlsZXMubm90ZUNsYW1wIDoge30pIH19PntyZW5kZXJXaXRoUGVlayhkZXNjcmlwdGlvbil9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICB7aXNzdWUucmVzb2x1dGlvbiA/IChcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JywgcGFkZGluZzogJzZweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgYmFja2dyb3VuZDogJ3JnYmEoNzgsIDIwMSwgMTc2LCAwLjA4KScsIGJvcmRlcjogJzFweCBzb2xpZCByZ2JhKDc4LCAyMDEsIDE3NiwgMC4zNSknLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx1MjcxMyB7aXNzdWUucmVzb2x1dGlvbn1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgIHtpc3N1ZS5maXhQbGFuICE9IG51bGwgJiYgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYW4gPSBpc3N1ZS5maXhQbGFuXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGFuT3BlbiA9IGlzc3VlRXhwYW5kZWRbYCR7aXNzdWUuaWR9LXBsYW5gXSA9PT0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc2cHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBiYWNrZ3JvdW5kOiAncmdiYSgzNywgOTksIDIzNSwgMC4wNSknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEyKSknLCBmb250U2l6ZTogJzExcHgnLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmxpbmtCdG4sIHdpZHRoOiAnMTAwJScsIHRleHRBbGlnbjogJ2xlZnQnLCBwYWRkaW5nOiAnNXB4IDEwcHgnLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldElzc3VlRXhwYW5kZWQoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW2Ake2lzc3VlLmlkfS1wbGFuYF06ICEocHJldmlvdXNbYCR7aXNzdWUuaWR9LXBsYW5gXSA9PT0gdHJ1ZSkgfSkpIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHVEODNEXHVEQ0M0IHt0KCdmaXgucGxhbicpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShwbGFuLnN0YXR1cyA9PT0gJ3BlbmRpbmcnID8gJyNkOTc3MDYnIDogJyMyNTYzZWInKX0+e3BsYW4uc3RhdHVzID09PSAncGVuZGluZycgPyAnXHU1Rjg1XHU4QkM0XHU1QkExJyA6ICdcdTVERjJcdTZEM0VcdTUzRDEnfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwbGFuLmZpbGVzLmxlbmd0aCA+IDAgJiYgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknIH19PntwbGFuLmZpbGVzLnNsaWNlKDAsIDMpLmpvaW4oJywgJyl9PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz57cGxhbk9wZW4gPyAnXHUyNUIyJyA6ICdcdTI1QkMnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtwbGFuT3BlbiAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcycHggMTBweCA4cHgnLCBsaW5lSGVpZ2h0OiAxLjcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PGI+e3QoJ2ZpeC5wbGFuQXBwcm9hY2gnKX1cdUZGMUE8L2I+e3BsYW4uYXBwcm9hY2h9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PGI+e3QoJ2ZpeC5wbGFuSW1wYWN0Jyl9XHVGRjFBPC9iPntwbGFuLmltcGFjdH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48Yj57dCgnZml4LnBsYW5CZW5lZml0Jyl9XHVGRjFBPC9iPntwbGFuLmJlbmVmaXR9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PGI+e3QoJ2ZpeC5wbGFuUmlzaycpfVx1RkYxQTwvYj57cGxhbi5yaXNrfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfSkoKX1cclxuICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeFN0YXRzICE9IG51bGwgfHwgQm9vbGVhbihpc3N1ZS5maXhEaWZmKSkgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5saW5rQnRuLCBtYXJnaW5Ub3A6ICc0cHgnLCBkaXNwbGF5OiAnYmxvY2snIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRGaXhFeHBhbmRlZCgocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBbaXNzdWUuaWRdOiAhKHByZXZpb3VzW2lzc3VlLmlkXSA9PT0gdHJ1ZSkgfSkpIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcdUQ4M0RcdUREMjcge3QoJ3Jldmlldy5maXhEZXRhaWwnKX1cdUZGMDh7U3RyaW5nKGlzc3VlLmZpeFN0YXRzPy5maWxlcyA/PyAwKX0ge3QoJ3Jldmlldy5maXhTdGF0RmlsZXMnKX0gXHUwMEI3ICt7U3RyaW5nKGlzc3VlLmZpeFN0YXRzPy5pbnNlcnRpb25zID8/IDApfSBcdTIyMTJ7U3RyaW5nKGlzc3VlLmZpeFN0YXRzPy5kZWxldGlvbnMgPz8gMCl9XHVGRjA5e2ZpeEV4cGFuZGVkW2lzc3VlLmlkXSA9PT0gdHJ1ZSA/ICdcdTI1QjInIDogJ1x1MjVCQyd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Zml4RXhwYW5kZWRbaXNzdWUuaWRdID09PSB0cnVlICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAxMHB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4RmlsZXMgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzNweCcgfX0+e3QoJ3Jldmlldy5maXhGaWxlcycpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4RmlsZXMgPz8gW10pLm1hcCgoZmlsZSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2ZpbGV9IHN0eWxlPXt7IGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknLCBmb250U2l6ZTogJzExcHgnIH19PntmaWxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeEltcGFjdCA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnM3B4JyB9fT57dCgncmV2aWV3LmZpeEltcGFjdCcpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc3N1ZS5maXhJbXBhY3QubWFwKChlbnRyeSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5LnN5bWJvbH0gc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnNXB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMDk2OWRhJyl9PntlbnRyeS5zeW1ib2x9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeycgJ317dCgncmV2aWV3LmRlZmluZWRJbicpfSB7ZW50cnkuZGVmaW5lZElufSBcdTAwQjcge1N0cmluZyhlbnRyeS5jYWxsZXJzLmxlbmd0aCl9IHt0KCdyZXZpZXcuY2FsbENvdW50Jyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNhbGxlcnMuc2xpY2UoMCwgNSkubWFwKChjYWxsZXIsIGNhbGxlckluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2NhbGxlckluZGV4fSBzdHlsZT17eyBmb250U2l6ZTogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgcGFkZGluZ0xlZnQ6ICcxMnB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSBkb3R0ZWQnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBvcGVuUGVlayhjYWxsZXIuZmlsZSwgTnVtYmVyKGNhbGxlci5saW5lKSkgfX0+e2NhbGxlci5maWxlfTp7Y2FsbGVyLmxpbmV9PC9zcGFuPiB7Y2FsbGVyLnNuaXBwZXQuc2xpY2UoMCwgODApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Qm9vbGVhbihpc3N1ZS5maXhEaWZmKSAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzNweCcgfX0+e3QoJ3Jldmlldy5maXhEaWZmJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWluc2V0LCByZ2JhKDUsNSw1LDAuMDMpKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc2cHggOHB4JywgbWF4SGVpZ2h0OiAnMzAwcHgnLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZW5kZXJEaWZmTGluZXMoaXNzdWUuZml4RGlmZil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAge2xvbmcgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmxpbmtCdG59IG9uQ2xpY2s9eygpID0+IHsgc2V0SXNzdWVFeHBhbmRlZCh7IC4uLmlzc3VlRXhwYW5kZWQsIFtpc3N1ZS5pZF06ICFleHBhbmRlZCB9KSB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2V4cGFuZGVkID8gdCgnbm90ZXMuY29sbGFwc2UnKSA6IHQoJ25vdGVzLmV4cGFuZCcpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3QoJ3Jldmlldy50YXJnZXQnKX06IHtpc3N1ZVRhcmdldExhYmVsKGlzc3VlLmNoYW5nZUlkKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57Zm9ybWF0VGltZShpc3N1ZS5jcmVhdGVkQXQpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH0pKCl9XHJcbiAgICAgIDwvQ2FyZD5cclxuICAgICAgPENhcmQgdGl0bGU9e3QoJ3ZlcmlmeS5yZWNvcmRzJyl9PlxyXG4gICAgICAgIHt2ZXJpZmljYXRpb25zLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3ZlcmlmeS5yZWNvcmRzRW1wdHknKX08L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxyXG4gICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAge3ZlcmlmaWNhdGlvbnMuc2xpY2UoMCwgMjApLm1hcCgocmVjb3JkKSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtyZWNvcmQuaWR9PlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShyZWNvcmQuc3RhdHVzID09PSAncGFzc2VkJyA/ICcjNGVjOWIwJyA6ICcjZGNkY2FhJyl9PntyZWNvcmQuc3RhdHVzfTwvc3Bhbj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3JlY29yZC5uYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Zm9ybWF0VGltZShyZWNvcmQuY3JlYXRlZEF0KX08L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9DYXJkPlxyXG4gICAgPC8+XHJcbiAgKVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvb3R9IGRhdGEtdGVzdGlkPVwicHJvamVjdC1jb250cm9sLXdvcmtzcGFjZVwiPlxyXG4gICAgICB7cHJvcHMubGF5b3V0TW9kZSAhPT0gJ292ZXJsYXknICYmIDxzdHlsZT57TEFZT1VUX1NUWUxFfTwvc3R5bGU+fVxyXG4gICAgICB7cHJvcHMubGF5b3V0TW9kZSAhPT0gJ292ZXJsYXknICYmIDxkaXZcclxuICAgICAgICBkYXRhLXRlc3RpZD1cInByb2plY3QtY29udHJvbC1kaXZpZGVyXCJcclxuICAgICAgICBvblBvaW50ZXJEb3duPXtvbkRpdmlkZXJEb3dufVxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAwLCBib3R0b206IDAsIHJpZ2h0OiAtNCwgd2lkdGg6IDgsXHJcbiAgICAgICAgICBjdXJzb3I6ICdjb2wtcmVzaXplJywgekluZGV4OiAyMCxcclxuICAgICAgICB9fVxyXG4gICAgICAvPn1cclxuICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5hdn0+XHJcbiAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy50aXRsZX0+e3QoJ3dvcmtzcGFjZS50aXRsZScpfTwvc3Bhbj5cclxuICAgICAgICB7dGFicy5tYXAoKGVudHJ5KSA9PiAoXHJcbiAgICAgICAgICA8YnV0dG9uIGtleT17ZW50cnkua2V5fSBzdHlsZT17c3R5bGVzLnRhYih0YWIgPT09IGVudHJ5LmtleSl9IG9uQ2xpY2s9eygpID0+IHsgc2V0VGFiKGVudHJ5LmtleSkgfX0+e2VudHJ5LmxhYmVsfTwvYnV0dG9uPlxyXG4gICAgICAgICkpfVxyXG4gICAgICAgIHsoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcnVubmluZ0NvdW50ID0gcnVucy5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5zdGF0dXMgPT09ICdydW5uaW5nJyB8fCBlbnRyeS5zdGF0dXMgPT09ICdxdWV1ZWQnIHx8IGVudHJ5LnN0YXR1cyA9PT0gJ3ZlcmlmeWluZycpLmxlbmd0aFxyXG4gICAgICAgICAgY29uc3QgZmFpbGVkQ291bnQgPSBydW5zLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LnN0YXR1cyA9PT0gJ2ZhaWxlZCcgfHwgZW50cnkuc3RhdHVzID09PSAncGF1c2VkJykubGVuZ3RoXHJcbiAgICAgICAgICBpZiAocnVubmluZ0NvdW50ID09PSAwICYmIGZhaWxlZENvdW50ID09PSAwKSByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBtYXJnaW5MZWZ0OiAnNHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAge3J1bm5pbmdDb3VudCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UodGhlbWVBd2FyZVRleHQoJyMyNTYzZWInKSksIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXI6ICdub25lJyB9fSB0aXRsZT17dCgnYmFkZ2UucnVubmluZycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhydW5uaW5nQ291bnQpKX1cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRUYWIoJ2V4ZWN1dGlvbicpIH19Plx1MjVCNiB7U3RyaW5nKHJ1bm5pbmdDb3VudCl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICB7ZmFpbGVkQ291bnQgPiAwICYmIChcclxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKHRoZW1lQXdhcmVUZXh0KCcjZjE0YzRjJykpLCBjdXJzb3I6ICdwb2ludGVyJywgYm9yZGVyOiAnbm9uZScgfX0gdGl0bGU9e3QoJ2JhZGdlLmZhaWxlZCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhmYWlsZWRDb3VudCkpfVxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldFRhYignZXhlY3V0aW9uJykgfX0+XHUyNzE3IHtTdHJpbmcoZmFpbGVkQ291bnQpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIClcclxuICAgICAgICB9KSgpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmJvZHl9PlxyXG4gICAgICAgIHtwcm9wcy5zZXNzaW9uSWQgPT09IHVuZGVmaW5lZCB8fCBwcm9wcy5zZXNzaW9uSWQgPT09ICcnID8gPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnd29ya3NwYWNlLnNlbGVjdFNlc3Npb24nKX08L2Rpdj4gOiA8PlxyXG4gICAgICAgICAge2xvYWRFcnJvciAhPT0gbnVsbCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdlcnJvci5sb2FkJyl9OiB7bG9hZEVycm9yfTwvZGl2Pn1cclxuICAgICAgICAgIHtzdGF0ZT8ucmVhZHkgPT09IGZhbHNlICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3N0YXRlLnJlYXNvbiA/PyAnJ308L2Rpdj59XHJcbiAgICAgICAgICB7dGFiID09PSAnY29tbWl0cycgJiYgY29tbWl0c1RhYn1cclxuICAgICAgICAgIHt0YWIgPT09ICdvdmVydmlldycgJiYgb3ZlcnZpZXdUYWJ9XHJcbiAgICAgICAgICB7dGFiID09PSAnZXhlY3V0aW9uJyAmJiBleGVjdXRpb25UYWJ9XHJcbiAgICAgICAgICB7dGFiID09PSAncmV2aWV3JyAmJiByZXZpZXdUYWJ9XHJcbiAgICAgICAgICB7dGFiID09PSAnbm90ZXMnICYmIG5vdGVzVGFifVxyXG4gICAgICAgICAge3RhYiA9PT0gJ3NldHRpbmdzJyAmJiBzZXR0aW5nc1RhYn1cclxuICAgICAgICA8Lz59XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICB7Y29uZmlybURpYWxvZyAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgPENvbmZpcm1EaWFsb2dcclxuICAgICAgICAgIHRpdGxlPXtjb25maXJtRGlhbG9nLnRpdGxlfVxyXG4gICAgICAgICAgbWVzc2FnZT17Y29uZmlybURpYWxvZy5tZXNzYWdlfVxyXG4gICAgICAgICAgZGFuZ2VyPXtjb25maXJtRGlhbG9nLmRhbmdlcn1cclxuICAgICAgICAgIGNvbmZpcm1MYWJlbD17Y29uZmlybURpYWxvZy5jb25maXJtTGFiZWx9XHJcbiAgICAgICAgICBhbHQ9e2NvbmZpcm1EaWFsb2cuYWx0ID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBjb25maXJtRGlhbG9nLmFsdC5sYWJlbCxcclxuICAgICAgICAgICAgb25BbHQ6ICgpID0+IHsgY29uZmlybURpYWxvZy5hbHQhLm9uQWx0KCk7IHNldENvbmZpcm1EaWFsb2cobnVsbCkgfSxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKG51bGwpIH19XHJcbiAgICAgICAgICBvbkNvbmZpcm09eygpID0+IHsgY29uZmlybURpYWxvZy5vbkNvbmZpcm0oKTsgc2V0Q29uZmlybURpYWxvZyhudWxsKSB9fVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICAgIHtwZWVrICE9PSBudWxsICYmIChcclxuICAgICAgICA8ZGl2IGRhdGEtdGVzdGlkPVwicGMtcGVlay1vdmVybGF5XCIgc3R5bGU9e3sgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCBiYWNrZ3JvdW5kOiAncmdiYSgxNSwyMyw0MiwwLjQ1KScsIGJhY2tkcm9wRmlsdGVyOiAnYmx1cigycHgpJywgekluZGV4OiAxMDAwLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0gb25DbGljaz17KCkgPT4geyBzZXRQZWVrKG51bGwpIH19PlxyXG4gICAgICAgICAgPGRpdiBkYXRhLXRlc3RpZD1cInBjLXBlZWstY2FyZFwiIHN0eWxlPXt7IHdpZHRoOiAnbWluKDc2MHB4LCA5MnZ3KScsIG1heEhlaWdodDogJzgwdmgnLCBvdmVyZmxvdzogJ2hpZGRlbicsIGJvcmRlclJhZGl1czogJzEwcHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm94U2hhZG93OiAnMCAxNnB4IDQ4cHggcmdiYSgwLDAsMCwwLjI1KScsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicgfX0gb25DbGljaz17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKSB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBwYWRkaW5nOiAnMTBweCAxNHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknIH19PlxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+e3BlZWsucGF0aH06e1N0cmluZyhwZWVrLmxpbmUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICB7cGVla0RhdGE/LmV4aXN0cyA9PT0gdHJ1ZSAmJiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57U3RyaW5nKHBlZWtEYXRhLnN0YXJ0TGluZSl9XHUyMDEze1N0cmluZyhwZWVrRGF0YS5lbmRMaW5lKX0gLyB7U3RyaW5nKHBlZWtEYXRhLnRvdGFsTGluZXMpfSBcdTg4NEM8L3NwYW4+fVxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cclxuICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggMTBweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRQZWVrKG51bGwpIH19Plx1MjcxNTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvdzogJ2F1dG8nLCBwYWRkaW5nOiAnMTBweCAwJywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1pbnNldCwgcmdiYSg1LDUsNSwwLjAzKSknIH19PlxyXG4gICAgICAgICAgICAgIHtwZWVrQnVzeSAmJiA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5lbXB0eSB9fT5cdThCRkJcdTUzRDZcdTRFMkRcdTIwMjY8L2Rpdj59XHJcbiAgICAgICAgICAgICAgeyFwZWVrQnVzeSAmJiBwZWVrRGF0YSAhPT0gbnVsbCAmJiBwZWVrRGF0YS5leGlzdHMgPT09IGZhbHNlICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+XHU2NTg3XHU0RUY2XHU0RTBEXHU1QjU4XHU1NzI4XHVGRjA4XHU1M0VGXHU4MEZEXHU1REYyXHU4OEFCXHU1MjIwXHU5NjY0XHU2MjE2XHU3OUZCXHU1MkE4XHVGRjA5PC9kaXY+fVxyXG4gICAgICAgICAgICAgIHshcGVla0J1c3kgJiYgcGVla0RhdGE/LmV4aXN0cyA9PT0gdHJ1ZSAmJiAocGVla0RhdGEubGluZXMgPz8gW10pLm1hcCgoZW50cnkpID0+IChcclxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeS5ufSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBwYWRkaW5nOiAnMCAxNHB4JywgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsIGZvbnRTaXplOiAnMTEuNXB4JywgbGluZUhlaWdodDogMS43LCBiYWNrZ3JvdW5kOiBlbnRyeS5uID09PSBwZWVrLmxpbmUgPyAncmdiYSgzNyw5OSwyMzUsMC4wOCknIDogJ3RyYW5zcGFyZW50JyB9fT5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2lkdGg6IDQwLCB0ZXh0QWxpZ246ICdyaWdodCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmbGV4U2hyaW5rOiAwIH19PntTdHJpbmcoZW50cnkubil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19PntlbnRyeS50ZXh0ID09PSAnJyA/ICdcXHUwMEEwJyA6IGVudHJ5LnRleHR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApXHJcbn1cclxuIiwgIi8qKlxuICogXHU2M0QwXHU0RUE0XHU4RjZFXHU2QjIxXHU4MDVBXHU3QzdCXHVGRjA4XHU1QkEyXHU2MjM3XHU3QUVGXHVGRjA5XHVGRjFBXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XHU1M0YwXHU3Njg0XHU0RTBCXHU2MkM5XHU2ODQ2XHU2MzA5XHUzMDBDXHU0RTAwXHU4RjZFXHU1REU1XHU0RjVDXHUzMDBEXHU1MjA2XHU3RUM0XHU1QzU1XHU3OTNBXHUzMDAyXG4gKiBcdTRFMEUgcnVudGltZS9oaXN0b3J5LnRzIFx1NzY4NCBjbHVzdGVyQ29tbWl0cyBcdTRGRERcdTYzMDFcdTU0MENcdTRFMDBcdTU0MkZcdTUzRDFcdTVGMEZcdUZGMDhWMS4wIFx1MDBBNzk3L1x1MDBBNzk5XHVGRjA5XHVGRjFBXG4gKiBcdTc2RjhcdTkwQkJcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdTk1RjRcdTk2OTRcdThEODVcdThGQzdcdTdBOTdcdTUzRTNcdUZGMDhcdTlFRDhcdThCQTQgMzZoXHVGRjA5XHU1MjA3XHU2NUFEXHVGRjFCXHU4RkRFXHU3RUVEIFx1MjI2NTMgXHU0RTJBXHU2M0QwXHU0RUE0XHU1NDBFXHU0RTBFXHU1REYyXHU4MDVBXHU2NTg3XHU0RUY2XG4gKiBcdTk2RjZcdTkxQ0RcdTUzRTBcdTRFNUZcdTUyMDdcdTY1QURcdTMwMDJcdTY3MERcdTUyQTFcdTdBRUZcdTkwQTNcdTRFRkRcdTVERTVcdTRGNUNcdTU3MjggZ2l0IFx1NjI2Qlx1NjNDRlx1NUM0Mlx1RkYwOFx1OTFDRFx1NUVGQVx1NTM4Nlx1NTNGMlx1RkYwOVx1RkYwQ1x1OEZEOVx1NEVGRFx1OTc2Mlx1NTQxMVxuICogL2NvbW1pdHMgXHU4RkQ0XHU1NkRFXHU3Njg0XHU2M0QwXHU0RUE0XHU2NzYxXHU3NkVFXHUyMDE0XHUyMDE0XHU0RTI0XHU1OTA0XHU4OUM0XHU1MjE5XHU2NTM5XHU1MkE4XHU1RkM1XHU5ODdCXHU1NDBDXHU2QjY1XHUzMDAyXG4gKlxuICogQG1vZHVsZSBkc2gtY2xpZW50LXByb2plY3QtY29udHJvbC9jb21wb25lbnRzL2NvbW1pdC1yb3VuZHNcbiAqL1xuXG4vKiogXHU4MDVBXHU3QzdCXHU4RjkzXHU1MTY1XHU3Njg0XHU2NzAwXHU1QzBGXHU1RjYyXHU3MkI2XHVGRjA4L2NvbW1pdHMgXHU3Njg0XHU2M0QwXHU0RUE0XHU2NzYxXHU3NkVFXHU1QjUwXHU5NkM2XHVGRjA5XHUzMDAyICovXG5leHBvcnQgaW50ZXJmYWNlIFJvdW5kQ29tbWl0IHtcbiAgc2hhOiBzdHJpbmdcbiAgLyoqIFx1NjNEMFx1NEVBNFx1NjVGNlx1OTVGNFx1RkYwOFx1NkJFQlx1NzlEMlx1RkYwOVx1MzAwMiAqL1xuICBkYXRlOiBudW1iZXJcbiAgLyoqIFx1NkQ4OVx1NTNDQVx1NjU4N1x1NEVGNlx1OERFRlx1NUY4NFx1RkYwOFx1NzZGOFx1NUJGOVx1NEVEM1x1NUU5M1x1NjgzOVx1RkYwOVx1MzAwMiAqL1xuICBmaWxlczogc3RyaW5nW11cbn1cblxuLyoqIFx1NEUwMFx1OEY2RVx1NURFNVx1NEY1Q1x1RkYxQVx1NEZERFx1NjMwMVx1NEYyMFx1NTE2NVx1OTg3QVx1NUU4Rlx1NzY4NFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1RkYwOC9jb21taXRzIFx1NEUzQVx1NjVCMFx1MjE5Mlx1NjVFN1x1RkYwOSsgXHU2NUY2XHU5NUY0XHU4MzAzXHU1NkY0XHUzMDAyICovXG5leHBvcnQgaW50ZXJmYWNlIENvbW1pdFJvdW5kIHtcbiAgY29tbWl0czogUm91bmRDb21taXRbXVxuICAvKiogXHU4RjZFXHU1MTg1XHU2NzAwXHU2NUU5XHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0XHUzMDAyICovXG4gIGZpcnN0QXQ6IG51bWJlclxuICAvKiogXHU4RjZFXHU1MTg1XHU2NzAwXHU2NjVBXHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0XHUzMDAyICovXG4gIGxhc3RBdDogbnVtYmVyXG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1JPVU5EX0dBUF9NUyA9IDM2ICogNjAgKiA2MCAqIDEwMDBcblxuLyoqIFx1NEUwRVx1NjcwRFx1NTJBMVx1N0FFRiBjbHVzdGVyQ29tbWl0cyBcdTc2RjhcdTU0MENcdTc2ODRcdTkxQ0RcdTUzRTBcdTczODdcdUZGMUFcdTU0N0RcdTRFMkRcdTY1ODdcdTRFRjZcdTY1NzAgLyBtYXgoXHU2NzJDXHU2M0QwXHU0RUE0XHU2NTg3XHU0RUY2XHU2NTcwLCAxKVx1MzAwMiAqL1xuZnVuY3Rpb24gb3ZlcmxhcFJhdGlvKGZpbGVzOiBzdHJpbmdbXSwgZXhpc3Rpbmc6IFNldDxzdHJpbmc+KTogbnVtYmVyIHtcbiAgaWYgKGV4aXN0aW5nLnNpemUgPT09IDApIHJldHVybiAwXG4gIGxldCBoaXRzID0gMFxuICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIGlmIChleGlzdGluZy5oYXMoZmlsZSkpIGhpdHMgKz0gMVxuICByZXR1cm4gaGl0cyAvIE1hdGgubWF4KGZpbGVzLmxlbmd0aCwgMSlcbn1cblxuLyoqXG4gKiBcdTYyOEFcdUZGMDhcdTY1QjBcdTIxOTJcdTY1RTdcdTYyMTZcdTY1RTdcdTIxOTJcdTY1QjBcdTU3NDdcdTUzRUZcdUZGMDlcdThGREVcdTdFRURcdTYzRDBcdTRFQTRcdTgwNUFcdTYyMTBcdThGNkVcdTZCMjFcdTMwMDJcbiAqIFx1NjVGNlx1OTVGNFx1OTVGNFx1OTY5NFx1NTNENlx1N0VERFx1NUJGOVx1NTAzQ1x1RkYxQVx1NTIxN1x1ODg2OFx1OTg3QVx1NUU4Rlx1NEUwRFx1NEZERFx1OEJDMVx1NjVGNlx1OTVGNFx1NjVCOVx1NTQxMVx1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2x1c3RlckludG9Sb3VuZHMoY29tbWl0czogUm91bmRDb21taXRbXSwgY2x1c3RlckdhcE1zOiBudW1iZXIgPSBERUZBVUxUX1JPVU5EX0dBUF9NUyk6IENvbW1pdFJvdW5kW10ge1xuICBjb25zdCByb3VuZHM6IENvbW1pdFJvdW5kW10gPSBbXVxuICBsZXQgY3VycmVudDogUm91bmRDb21taXRbXSA9IFtdXG4gIGxldCBjdXJyZW50RmlsZXMgPSBuZXcgU2V0PHN0cmluZz4oKVxuXG4gIGNvbnN0IHB1c2hSb3VuZCA9ICgpOiB2b2lkID0+IHtcbiAgICBpZiAoY3VycmVudC5sZW5ndGggPT09IDApIHJldHVyblxuICAgIGNvbnN0IHRpbWVzID0gY3VycmVudC5tYXAoKGNvbW1pdCkgPT4gY29tbWl0LmRhdGUpXG4gICAgcm91bmRzLnB1c2goeyBjb21taXRzOiBjdXJyZW50LCBmaXJzdEF0OiBNYXRoLm1pbiguLi50aW1lcyksIGxhc3RBdDogTWF0aC5tYXgoLi4udGltZXMpIH0pXG4gICAgY3VycmVudCA9IFtdXG4gICAgY3VycmVudEZpbGVzID0gbmV3IFNldCgpXG4gIH1cblxuICBmb3IgKGNvbnN0IGNvbW1pdCBvZiBjb21taXRzKSB7XG4gICAgY29uc3QgcHJldmlvdXMgPSBjdXJyZW50W2N1cnJlbnQubGVuZ3RoIC0gMV1cbiAgICBjb25zdCBnYXBCcmVhayA9IHByZXZpb3VzICE9PSB1bmRlZmluZWQgJiYgTWF0aC5hYnMoY29tbWl0LmRhdGUgLSBwcmV2aW91cy5kYXRlKSA+IGNsdXN0ZXJHYXBNc1xuICAgIGNvbnN0IGZpbGVCcmVhayA9IGN1cnJlbnQubGVuZ3RoID49IDMgJiYgb3ZlcmxhcFJhdGlvKGNvbW1pdC5maWxlcywgY3VycmVudEZpbGVzKSA9PT0gMFxuICAgIGlmIChnYXBCcmVhayB8fCBmaWxlQnJlYWspIHB1c2hSb3VuZCgpXG4gICAgY3VycmVudC5wdXNoKGNvbW1pdClcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgY29tbWl0LmZpbGVzKSBjdXJyZW50RmlsZXMuYWRkKGZpbGUpXG4gIH1cbiAgcHVzaFJvdW5kKClcbiAgcmV0dXJuIHJvdW5kc1xufVxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VMYXlvdXRFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUsIHVzZVN5bmNFeHRlcm5hbFN0b3JlIH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IFdvcmtzcGFjZUZyYW1lIH0gZnJvbSAnLi9Xb3Jrc3BhY2VGcmFtZS50c3gnXHJcblxyXG5pbnRlcmZhY2UgQ3VycmVudFNlc3Npb24ge1xyXG4gIGdldFNuYXBzaG90KCk6IHsga2V5Pzogc3RyaW5nIH1cclxuICBzdWJzY3JpYmUobGlzdGVuZXI6ICgpID0+IHZvaWQpOiAoKSA9PiB2b2lkXHJcbn1cclxuXHJcbmludGVyZmFjZSBQYW5lbEluZm8ge1xyXG4gIGdldFNuYXBzaG90KCk6IHsgYWN0aXZlUGFuZWxJZDogc3RyaW5nIHwgbnVsbCB9XHJcbiAgc3Vic2NyaWJlKGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogKCkgPT4gdm9pZFxyXG59XHJcblxyXG5pbnRlcmZhY2UgTW9kZXJuV29ya3NwYWNlUHJvcHMge1xyXG4gIGN1cnJlbnQ6IEN1cnJlbnRTZXNzaW9uXHJcbiAgcGFuZWxJbmZvOiBQYW5lbEluZm9cclxuICBlbmFibGVkOiBib29sZWFuXHJcbiAgb25EaXNtaXNzOiAoKSA9PiB2b2lkXHJcbn1cclxuXHJcbmludGVyZmFjZSBCb3VuZHMge1xyXG4gIGxlZnQ6IG51bWJlclxyXG4gIHRvcDogbnVtYmVyXHJcbiAgd2lkdGg6IG51bWJlclxyXG4gIGhlaWdodDogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3b3Jrc3BhY2VCb3VuZHMoZnJhbWU6IEJvdW5kcywgY2VudGVyOiBCb3VuZHMsIGNoYXRXaWR0aDogbnVtYmVyKTogQm91bmRzIHwgdW5kZWZpbmVkIHtcclxuICBjb25zdCBhdmFpbGFibGUgPSBNYXRoLmZsb29yKGNlbnRlci53aWR0aClcclxuICBpZiAoYXZhaWxhYmxlIDwgNTYwIHx8IGNlbnRlci5oZWlnaHQgPD0gMCkgcmV0dXJuIHVuZGVmaW5lZFxyXG4gIGNvbnN0IGNoYXQgPSBNYXRoLm1heCgyODAsIE1hdGgubWluKGNoYXRXaWR0aCwgYXZhaWxhYmxlIC0gMjgwKSlcclxuICByZXR1cm4ge1xyXG4gICAgbGVmdDogY2VudGVyLmxlZnQgLSBmcmFtZS5sZWZ0LFxyXG4gICAgdG9wOiBjZW50ZXIudG9wIC0gZnJhbWUudG9wLFxyXG4gICAgd2lkdGg6IGF2YWlsYWJsZSAtIGNoYXQsXHJcbiAgICBoZWlnaHQ6IGNlbnRlci5oZWlnaHQsXHJcbiAgfVxyXG59XHJcblxyXG4vKiogXHU2NUIwXHU3MjQ4XHU1QkJGXHU0RTNCXHU3Njg0XHU1MkEwXHU2Q0Q1XHU2RDZFXHU1QzQyXHVGRjFCXHU0RUM1XHU1MzhCXHU3RjI5XHU0RjFBXHU4QkREXHU1MjE3XHVGRjBDXHU0RTBEXHU2NTM5XHU1M0Q4XHU1Qjk4XHU2NUI5XHU1M0YzXHU0RkE3XHU2ODBGXHU2MjE2XHU3RjUxXHU2ODNDXHU2QTIxXHU2NzdGXHUzMDAyICovXHJcbmV4cG9ydCBmdW5jdGlvbiBNb2Rlcm5Xb3Jrc3BhY2UoeyBjdXJyZW50LCBwYW5lbEluZm8sIGVuYWJsZWQsIG9uRGlzbWlzcyB9OiBNb2Rlcm5Xb3Jrc3BhY2VQcm9wcykge1xyXG4gIGNvbnN0IHNlc3Npb25JZCA9IHVzZVN5bmNFeHRlcm5hbFN0b3JlKFxyXG4gICAgKGxpc3RlbmVyKSA9PiBjdXJyZW50LnN1YnNjcmliZShsaXN0ZW5lciksXHJcbiAgICAoKSA9PiBjdXJyZW50LmdldFNuYXBzaG90KCkua2V5LFxyXG4gIClcclxuICBjb25zdCBhY3RpdmVQYW5lbElkID0gdXNlU3luY0V4dGVybmFsU3RvcmUoXHJcbiAgICAobGlzdGVuZXIpID0+IHBhbmVsSW5mby5zdWJzY3JpYmUobGlzdGVuZXIpLFxyXG4gICAgKCkgPT4gcGFuZWxJbmZvLmdldFNuYXBzaG90KCkuYWN0aXZlUGFuZWxJZCxcclxuICApXHJcbiAgY29uc3QgdmlzaWJsZSA9IGVuYWJsZWQgJiYgYWN0aXZlUGFuZWxJZCA9PT0gbnVsbFxyXG4gIGNvbnN0IGRyYWdDbGVhbnVwID0gdXNlUmVmPCgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZD4oKVxyXG4gIGNvbnN0IFtib3VuZHMsIHNldEJvdW5kc10gPSB1c2VTdGF0ZTxCb3VuZHMgfCB1bmRlZmluZWQ+KClcclxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4gKCkgPT4geyBkcmFnQ2xlYW51cC5jdXJyZW50Py4oKSB9LCBbdmlzaWJsZV0pXHJcbiAgY29uc3QgW2NoYXRXaWR0aCwgc2V0Q2hhdFdpZHRoXSA9IHVzZVN0YXRlKCgpID0+IHtcclxuICAgIGNvbnN0IHNhdmVkID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYy5jaGF0V2lkdGgnKSA/PyAnJylcclxuICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUoc2F2ZWQpICYmIHNhdmVkID49IDI4MCA/IHNhdmVkIDogMzYwXHJcbiAgfSlcclxuXHJcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghdmlzaWJsZSkgcmV0dXJuXHJcbiAgICBjb25zdCByaWdodGJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCdbZGF0YS1yaWdodGJhci1jb2xdJylcclxuICAgIGNvbnN0IGZyYW1lID0gcmlnaHRiYXI/LnBhcmVudEVsZW1lbnRcclxuICAgIGNvbnN0IGNlbnRlcnMgPSBmcmFtZT8ucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oJzpzY29wZSA+IGRpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0nKVxyXG4gICAgaWYgKGZyYW1lID09PSB1bmRlZmluZWQgfHwgZnJhbWUgPT09IG51bGwgfHwgY2VudGVycz8ubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgIG9uRGlzbWlzcygpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgY29uc3QgY2VudGVyID0gY2VudGVyc1swXSFcclxuICAgIGNvbnN0IG9sZFBhZGRpbmcgPSBjZW50ZXIuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1sZWZ0JylcclxuICAgIGNvbnN0IG9sZFBhZGRpbmdQcmlvcml0eSA9IGNlbnRlci5zdHlsZS5nZXRQcm9wZXJ0eVByaW9yaXR5KCdwYWRkaW5nLWxlZnQnKVxyXG4gICAgY29uc3Qgb2xkQm94U2l6aW5nID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2JveC1zaXppbmcnKVxyXG4gICAgY29uc3Qgb2xkQm94U2l6aW5nUHJpb3JpdHkgPSBjZW50ZXIuc3R5bGUuZ2V0UHJvcGVydHlQcmlvcml0eSgnYm94LXNpemluZycpXHJcbiAgICBsZXQgYXBwbGllZFBhZGRpbmcgPSAnJ1xyXG4gICAgbGV0IGFjdGl2ZSA9IHRydWVcclxuXHJcbiAgICBjb25zdCB1cGRhdGUgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgIGlmICghYWN0aXZlKSByZXR1cm5cclxuICAgICAgY29uc3QgbmV4dCA9IHdvcmtzcGFjZUJvdW5kcyhmcmFtZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgY2VudGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBjaGF0V2lkdGgpXHJcbiAgICAgIGlmIChuZXh0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBvbkRpc21pc3MoKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHBhZGRpbmcgPSBgJHtuZXh0LndpZHRofXB4YFxyXG4gICAgICBpZiAocGFkZGluZyAhPT0gYXBwbGllZFBhZGRpbmcpIHtcclxuICAgICAgICBjZW50ZXIuc3R5bGUuc2V0UHJvcGVydHkoJ3BhZGRpbmctbGVmdCcsIHBhZGRpbmcsICdpbXBvcnRhbnQnKVxyXG4gICAgICAgIGFwcGxpZWRQYWRkaW5nID0gcGFkZGluZ1xyXG4gICAgICB9XHJcbiAgICAgIGNlbnRlci5zdHlsZS5zZXRQcm9wZXJ0eSgnYm94LXNpemluZycsICdib3JkZXItYm94JywgJ2ltcG9ydGFudCcpXHJcbiAgICAgIHNldEJvdW5kcygocHJldmlvdXMpID0+IHByZXZpb3VzPy5sZWZ0ID09PSBuZXh0LmxlZnQgJiYgcHJldmlvdXMudG9wID09PSBuZXh0LnRvcCAmJiBwcmV2aW91cy53aWR0aCA9PT0gbmV4dC53aWR0aCAmJiBwcmV2aW91cy5oZWlnaHQgPT09IG5leHQuaGVpZ2h0ID8gcHJldmlvdXMgOiBuZXh0KVxyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzaXplID0gbmV3IFJlc2l6ZU9ic2VydmVyKHVwZGF0ZSlcclxuICAgIHJlc2l6ZS5vYnNlcnZlKGZyYW1lKVxyXG4gICAgcmVzaXplLm9ic2VydmUoY2VudGVyKVxyXG4gICAgY29uc3QgbXV0YXRpb25zID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xyXG4gICAgICBpZiAoIWZyYW1lLmhhc0F0dHJpYnV0ZSgnZGF0YS1yaWdodGJhci1jb2xsYXBzZWQnKSkgb25EaXNtaXNzKClcclxuICAgICAgZWxzZSB1cGRhdGUoKVxyXG4gICAgfSlcclxuICAgIG11dGF0aW9ucy5vYnNlcnZlKGZyYW1lLCB7IGF0dHJpYnV0ZXM6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogWydkYXRhLXJpZ2h0YmFyLWNvbGxhcHNlZCddIH0pXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlKVxyXG4gICAgdXBkYXRlKClcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgIHJlc2l6ZS5kaXNjb25uZWN0KClcclxuICAgICAgbXV0YXRpb25zLmRpc2Nvbm5lY3QoKVxyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlKVxyXG4gICAgICBpZiAoY2VudGVyLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctbGVmdCcpID09PSBhcHBsaWVkUGFkZGluZykge1xyXG4gICAgICAgIGlmIChvbGRQYWRkaW5nID09PSAnJykgY2VudGVyLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLWxlZnQnKVxyXG4gICAgICAgIGVsc2UgY2VudGVyLnN0eWxlLnNldFByb3BlcnR5KCdwYWRkaW5nLWxlZnQnLCBvbGRQYWRkaW5nLCBvbGRQYWRkaW5nUHJpb3JpdHkpXHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNlbnRlci5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdib3gtc2l6aW5nJykgPT09ICdib3JkZXItYm94Jykge1xyXG4gICAgICAgIGlmIChvbGRCb3hTaXppbmcgPT09ICcnKSBjZW50ZXIuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2JveC1zaXppbmcnKVxyXG4gICAgICAgIGVsc2UgY2VudGVyLnN0eWxlLnNldFByb3BlcnR5KCdib3gtc2l6aW5nJywgb2xkQm94U2l6aW5nLCBvbGRCb3hTaXppbmdQcmlvcml0eSlcclxuICAgICAgfVxyXG4gICAgICBzZXRCb3VuZHModW5kZWZpbmVkKVxyXG4gICAgfVxyXG4gIH0sIFt2aXNpYmxlLCBjaGF0V2lkdGgsIG9uRGlzbWlzc10pXHJcblxyXG4gIGlmICghdmlzaWJsZSB8fCBib3VuZHMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGxcclxuXHJcbiAgY29uc3Qgb25EaXZpZGVyRG93biA9IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCBvbk1vdmUgPSAobW92ZTogUG9pbnRlckV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICAgIGNvbnN0IGZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJ1tkYXRhLXJpZ2h0YmFyLWNvbF0nKT8ucGFyZW50RWxlbWVudFxyXG4gICAgICBjb25zdCBjZW50ZXIgPSBmcmFtZT8ucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJzpzY29wZSA+IGRpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0nKVxyXG4gICAgICBpZiAoY2VudGVyID09PSB1bmRlZmluZWQgfHwgY2VudGVyID09PSBudWxsKSByZXR1cm5cclxuICAgICAgY29uc3Qgd2lkdGggPSBNYXRoLm1heCgyODAsIE1hdGgubWluKDkwMCwgTWF0aC5yb3VuZChjZW50ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHQgLSBtb3ZlLmNsaWVudFgpKSlcclxuICAgICAgc2V0Q2hhdFdpZHRoKHdpZHRoKVxyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGMuY2hhdFdpZHRoJywgU3RyaW5nKHdpZHRoKSlcclxuICAgIH1cclxuICAgIGNvbnN0IG9uVXAgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSlcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApXHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyY2FuY2VsJywgb25VcClcclxuICAgICAgZHJhZ0NsZWFudXAuY3VycmVudCA9IHVuZGVmaW5lZFxyXG4gICAgfVxyXG4gICAgZHJhZ0NsZWFudXAuY3VycmVudD8uKClcclxuICAgIGRyYWdDbGVhbnVwLmN1cnJlbnQgPSBvblVwXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcClcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyY2FuY2VsJywgb25VcClcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGRhdGEtdGVzdGlkPVwicHJvamVjdC1jb250cm9sLW1vZGVybi13b3Jrc3BhY2VcIiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgLi4uYm91bmRzLCBwb2ludGVyRXZlbnRzOiAnYXV0bycgfX0+XHJcbiAgICAgIDxXb3Jrc3BhY2VGcmFtZSBrZXk9e3Nlc3Npb25JZCA/PyAnbGFuZGluZyd9IHsuLi4oc2Vzc2lvbklkID09PSB1bmRlZmluZWQgPyB7fSA6IHsgc2Vzc2lvbklkIH0pfSBsYXlvdXRNb2RlPVwib3ZlcmxheVwiIC8+XHJcbiAgICAgIDxkaXYgZGF0YS10ZXN0aWQ9XCJwcm9qZWN0LWNvbnRyb2wtbW9kZXJuLWRpdmlkZXJcIiBvblBvaW50ZXJEb3duPXtvbkRpdmlkZXJEb3dufSBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAwLCBib3R0b206IDAsIHJpZ2h0OiAtNCwgd2lkdGg6IDgsIGN1cnNvcjogJ2NvbC1yZXNpemUnLCB6SW5kZXg6IDIwIH19IC8+XHJcbiAgICA8L2Rpdj5cclxuICApXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWlCQSxJQUFBQSxnQkFBa0I7OztBQ05sQixtQkFBa0I7OztBQ01YLFNBQVMsV0FBVyxPQUFnRDtBQUN6RSxRQUFNLE1BQU0sb0JBQW9CLEtBQUssS0FBSztBQUMxQyxNQUFJLFFBQVEsTUFBTTtBQUNoQixVQUFNLFFBQVEsT0FBTyxTQUFTLElBQUksQ0FBQyxHQUFJLEVBQUU7QUFDekMsV0FBTyxDQUFFLFNBQVMsS0FBTSxLQUFNLFNBQVMsSUFBSyxLQUFLLFFBQVEsR0FBRztBQUFBLEVBQzlEO0FBQ0EsUUFBTSxhQUFhLHNEQUFzRCxLQUFLLEtBQUs7QUFDbkYsTUFBSSxlQUFlLE1BQU07QUFDdkIsV0FBTyxDQUFDLE9BQU8sV0FBVyxDQUFDLENBQUMsR0FBRyxPQUFPLFdBQVcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBQUEsRUFDN0U7QUFDQSxTQUFPO0FBQ1Q7QUFHTyxTQUFTLGtCQUFrQixHQUFXLEdBQVcsR0FBbUI7QUFDekUsUUFBTSxVQUFVLENBQUMsVUFBMEI7QUFDekMsVUFBTSxJQUFJLFFBQVE7QUFDbEIsV0FBTyxLQUFLLFVBQVUsSUFBSSxVQUFVLElBQUksU0FBUyxVQUFVO0FBQUEsRUFDN0Q7QUFDQSxTQUFPLFNBQVMsUUFBUSxDQUFDLElBQUksU0FBUyxRQUFRLENBQUMsSUFBSSxTQUFTLFFBQVEsQ0FBQztBQUN2RTtBQUdPLFNBQVMseUJBQXlCLEdBQVcsR0FBVyxHQUFtQjtBQUNoRixNQUFJLE1BQU07QUFDVixNQUFJLFFBQVE7QUFDWixNQUFJLE9BQU87QUFDWCxXQUFTLE9BQU8sR0FBRyxPQUFPLE1BQU0sa0JBQWtCLEtBQUssT0FBTyxJQUFJLElBQUksT0FBTyxRQUFRLEdBQUc7QUFDdEYsVUFBTSxLQUFLLE1BQU0sTUFBTSxNQUFNLEtBQU8sR0FBRztBQUN2QyxZQUFRLEtBQUssTUFBTSxRQUFRLE1BQU0sS0FBTyxHQUFHO0FBQzNDLFdBQU8sS0FBSyxNQUFNLE9BQU8sTUFBTSxLQUFPLEdBQUc7QUFBQSxFQUMzQztBQUNBLFNBQU8sT0FBTyxHQUFHLEtBQUssS0FBSyxLQUFLLElBQUk7QUFDdEM7QUFHTyxTQUFTLHlCQUF5QixHQUFXLEdBQVcsR0FBbUI7QUFDaEYsTUFBSSxNQUFNO0FBQ1YsTUFBSSxRQUFRO0FBQ1osTUFBSSxPQUFPO0FBQ1gsV0FBUyxPQUFPLEdBQUcsT0FBTyxNQUFNLGtCQUFrQixLQUFLLE9BQU8sSUFBSSxJQUFJLE9BQU8sUUFBUSxHQUFHO0FBQ3RGLFVBQU0sS0FBSyxNQUFNLE1BQU0sTUFBTSxNQUFPLEdBQUc7QUFDdkMsWUFBUSxLQUFLLE1BQU0sUUFBUSxNQUFNLE1BQU8sR0FBRztBQUMzQyxXQUFPLEtBQUssTUFBTSxPQUFPLE1BQU0sTUFBTyxHQUFHO0FBQUEsRUFDM0M7QUFDQSxTQUFPLE9BQU8sR0FBRyxLQUFLLEtBQUssS0FBSyxJQUFJO0FBQ3RDO0FBTU8sU0FBUyxlQUFlLE9BQXVCO0FBQ3BELFFBQU0sTUFBTSxXQUFXLEtBQUs7QUFDNUIsTUFBSSxRQUFRLEtBQU0sUUFBTztBQUN6QixNQUFJLE9BQU8sYUFBYSxlQUFlLFNBQVMsTUFBTSxlQUFlLG9CQUFvQixNQUFNLE1BQU07QUFDbkcsV0FBTyx5QkFBeUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFBQSxFQUN4RDtBQUNBLFNBQU8seUJBQXlCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3hEOzs7QURyRE8sSUFBTSxhQUF3QyxDQUFDO0FBQUEsRUFDcEQsUUFBUTtBQUFBLEVBQ1IsZUFBZTtBQUFBLEVBQ2YsYUFBYTtBQUFBLEVBQ2IsWUFBWTtBQUFBLEVBQ1o7QUFBQSxFQUNBLFNBQVM7QUFDWCxNQUFNO0FBQ0osU0FBTyxhQUFBQyxRQUFNO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxNQUNFLGVBQWU7QUFBQSxNQUNmLE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVM7QUFBQSxRQUNULFFBQVE7QUFBQSxRQUNSLGlCQUFpQjtBQUFBLFFBQ2pCLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxNQUNaO0FBQUEsSUFDRjtBQUFBLElBQ0EsYUFBQUEsUUFBTTtBQUFBLE1BQ0o7QUFBQSxNQUNBO0FBQUEsUUFDRSxPQUFPO0FBQUEsVUFDTCxTQUFTO0FBQUEsVUFDVCxnQkFBZ0I7QUFBQSxVQUNoQixZQUFZO0FBQUEsVUFDWixjQUFjO0FBQUEsVUFDZCxZQUFZO0FBQUEsUUFDZDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGFBQUFBLFFBQU0sY0FBYyxRQUFRLE1BQU0sYUFBTSxLQUFLLEVBQUU7QUFBQSxNQUMvQyxhQUFBQSxRQUFNO0FBQUEsUUFDSjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU87QUFBQSxZQUNMLFVBQVU7QUFBQSxZQUNWLFNBQVM7QUFBQSxZQUNULGNBQWM7QUFBQSxZQUNkLGlCQUFpQjtBQUFBLFlBQ2pCLE9BQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsYUFBQUEsUUFBTTtBQUFBLE1BQ0o7QUFBQSxNQUNBLEVBQUUsT0FBTyxFQUFFLFNBQVMsUUFBUSxLQUFLLFFBQVEsVUFBVSxRQUFRLFNBQVMsSUFBSSxFQUFFO0FBQUEsTUFDMUUsYUFBQUEsUUFBTSxjQUFjLFFBQVEsTUFBTSxhQUFNLFlBQVksUUFBUTtBQUFBLE1BQzVELGFBQUFBLFFBQU0sY0FBYyxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sZUFBZSxTQUFTLEVBQUUsRUFBRSxHQUFHLElBQUksVUFBVSxFQUFFO0FBQUEsTUFDN0YsYUFBQUEsUUFBTSxjQUFjLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxlQUFlLFNBQVMsRUFBRSxFQUFFLEdBQUcsSUFBSSxTQUFTLEVBQUU7QUFBQSxNQUM1RixhQUNJLGFBQUFBLFFBQU07QUFBQSxRQUNKO0FBQUEsUUFDQSxFQUFFLE9BQU8sRUFBRSxTQUFTLEtBQUssWUFBWSxZQUFZLEVBQUU7QUFBQSxRQUNuRCxJQUFJLFVBQVU7QUFBQSxNQUNoQixJQUNBO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFDRjs7O0FFdEVBLElBQUFDLGdCQUFtRDs7O0FDWTVDLElBQU0sdUJBQXVCLEtBQUssS0FBSyxLQUFLO0FBR25ELFNBQVMsYUFBYSxPQUFpQixVQUErQjtBQUNwRSxNQUFJLFNBQVMsU0FBUyxFQUFHLFFBQU87QUFDaEMsTUFBSSxPQUFPO0FBQ1gsYUFBVyxRQUFRLE1BQU8sS0FBSSxTQUFTLElBQUksSUFBSSxFQUFHLFNBQVE7QUFDMUQsU0FBTyxPQUFPLEtBQUssSUFBSSxNQUFNLFFBQVEsQ0FBQztBQUN4QztBQU1PLFNBQVMsa0JBQWtCLFNBQXdCLGVBQXVCLHNCQUFxQztBQUNwSCxRQUFNLFNBQXdCLENBQUM7QUFDL0IsTUFBSSxVQUF5QixDQUFDO0FBQzlCLE1BQUksZUFBZSxvQkFBSSxJQUFZO0FBRW5DLFFBQU0sWUFBWSxNQUFZO0FBQzVCLFFBQUksUUFBUSxXQUFXLEVBQUc7QUFDMUIsVUFBTSxRQUFRLFFBQVEsSUFBSSxDQUFDLFdBQVcsT0FBTyxJQUFJO0FBQ2pELFdBQU8sS0FBSyxFQUFFLFNBQVMsU0FBUyxTQUFTLEtBQUssSUFBSSxHQUFHLEtBQUssR0FBRyxRQUFRLEtBQUssSUFBSSxHQUFHLEtBQUssRUFBRSxDQUFDO0FBQ3pGLGNBQVUsQ0FBQztBQUNYLG1CQUFlLG9CQUFJLElBQUk7QUFBQSxFQUN6QjtBQUVBLGFBQVcsVUFBVSxTQUFTO0FBQzVCLFVBQU0sV0FBVyxRQUFRLFFBQVEsU0FBUyxDQUFDO0FBQzNDLFVBQU0sV0FBVyxhQUFhLFVBQWEsS0FBSyxJQUFJLE9BQU8sT0FBTyxTQUFTLElBQUksSUFBSTtBQUNuRixVQUFNLFlBQVksUUFBUSxVQUFVLEtBQUssYUFBYSxPQUFPLE9BQU8sWUFBWSxNQUFNO0FBQ3RGLFFBQUksWUFBWSxVQUFXLFdBQVU7QUFDckMsWUFBUSxLQUFLLE1BQU07QUFDbkIsZUFBVyxRQUFRLE9BQU8sTUFBTyxjQUFhLElBQUksSUFBSTtBQUFBLEVBQ3hEO0FBQ0EsWUFBVTtBQUNWLFNBQU87QUFDVDs7O0FEc0hXO0FBbEJYLFNBQVMsZ0JBQWdCLE1BQWlDO0FBQ3hELE1BQUksT0FBTyxTQUFTLFlBQVksU0FBUyxHQUFJLFFBQU8sQ0FBQztBQUNyRCxTQUFPLEtBQUssTUFBTSxJQUFJLEVBQUUsTUFBTSxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxVQUFVO0FBQ3pELFVBQU0sUUFBNkI7QUFBQSxNQUNqQyxZQUFZO0FBQUEsTUFDWixVQUFVO0FBQUEsTUFBUSxZQUFZO0FBQUEsTUFBSyxZQUFZO0FBQUEsTUFBWSxXQUFXO0FBQUEsSUFDeEU7QUFDQSxRQUFJLEtBQUssV0FBVyxLQUFLLEtBQUssS0FBSyxXQUFXLEtBQUssS0FBSyxLQUFLLFdBQVcsWUFBWSxLQUFLLEtBQUssV0FBVyxJQUFJLEdBQUc7QUFDOUcsWUFBTSxRQUFRO0FBQUEsSUFDaEIsV0FBVyxLQUFLLFdBQVcsR0FBRyxHQUFHO0FBQy9CLFlBQU0sUUFBUSxlQUFlLFNBQVM7QUFDdEMsWUFBTSxhQUFhO0FBQUEsSUFDckIsV0FBVyxLQUFLLFdBQVcsR0FBRyxHQUFHO0FBQy9CLFlBQU0sUUFBUSxlQUFlLFNBQVM7QUFDdEMsWUFBTSxhQUFhO0FBQUEsSUFDckIsT0FBTztBQUNMLFlBQU0sUUFBUTtBQUFBLElBQ2hCO0FBQ0EsV0FBTyw0Q0FBQyxTQUFnQixPQUFlLG1CQUFTLEtBQUssU0FBVyxRQUEvQyxLQUFvRDtBQUFBLEVBQ3ZFLENBQUM7QUFDSDtBQTJCQSxJQUFNLG9CQUFvQjtBQWdEMUIsSUFBTSxzQkFBOEM7QUFBQSxFQUNsRCxNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsRUFDUixVQUFVO0FBQUEsRUFDVixVQUFVO0FBQUEsRUFDVixVQUFVO0FBQ1o7QUFHQSxJQUFNLHFCQUE2QztBQUFBLEVBQ2pELHVCQUF1QjtBQUFBLEVBQVEsY0FBYztBQUFBLEVBQVEsY0FBYztBQUFBLEVBQ25FLGlCQUFpQjtBQUFBLEVBQVEsY0FBYztBQUFBLEVBQVEsYUFBYTtBQUFBLEVBQVEsV0FBVztBQUNqRjtBQUdBLElBQU0sdUJBQStDO0FBQUEsRUFDbkQsS0FBSztBQUFBLEVBQVEsUUFBUTtBQUFBLEVBQVEsTUFBTTtBQUFBLEVBQVEsTUFBTTtBQUFBLEVBQVMsUUFBUTtBQUNwRTtBQUdBLElBQU0sY0FBc0M7QUFBQSxFQUMxQyxVQUFVO0FBQUEsRUFBTSxVQUFVO0FBQUEsRUFBTSxRQUFRO0FBQUEsRUFBTSxLQUFLO0FBQUEsRUFBUSxjQUFjO0FBQzNFO0FBR0EsSUFBTSxnQkFBd0M7QUFBQSxFQUM1QyxrQkFBa0I7QUFBQSxFQUFXLGtCQUFrQjtBQUFBLEVBQU0sTUFBTTtBQUFBLEVBQVMsS0FBSztBQUMzRTtBQUdBLElBQU0sb0JBQTRDO0FBQUEsRUFDaEQsUUFBUTtBQUFBLEVBQU8sU0FBUztBQUFBLEVBQU8sUUFBUTtBQUFBLEVBQU8sU0FBUztBQUFBLEVBQU0sVUFBVTtBQUFBLEVBQ3ZFLFdBQVc7QUFBQSxFQUFTLFdBQVc7QUFBQSxFQUFPLFdBQVc7QUFBQSxFQUFPLFFBQVE7QUFBQSxFQUFNLFdBQVc7QUFBQSxFQUFPLGFBQWE7QUFDdkc7QUFHQSxJQUFNLHFCQUE2QztBQUFBLEVBQ2pELFNBQVM7QUFBQSxFQUFPLE9BQU87QUFBQSxFQUFNLFNBQVM7QUFBQSxFQUFPLFFBQVE7QUFBQSxFQUFNLFVBQVU7QUFBQSxFQUNyRSxXQUFXO0FBQUEsRUFBTyxRQUFRO0FBQUEsRUFBTSxTQUFTO0FBQUEsRUFBTyxTQUFTO0FBQUEsRUFBTSxXQUFXO0FBQUEsRUFBTyxhQUFhO0FBQ2hHO0FBR0EsU0FBUyxjQUFjLFVBQTBCO0FBQy9DLE1BQUksYUFBYSxjQUFjLGFBQWEsVUFBVyxRQUFPO0FBQzlELE1BQUksYUFBYSxRQUFTLFFBQU87QUFDakMsTUFBSSxhQUFhLE9BQVEsUUFBTztBQUNoQyxTQUFPO0FBQ1Q7QUFHQSxTQUFTLHVCQUF1QixVQUEwQjtBQUN4RCxNQUFJLGFBQWEsT0FBUSxRQUFPO0FBQ2hDLE1BQUksYUFBYSxZQUFZLGFBQWEsTUFBTyxRQUFPO0FBQ3hELFNBQU8sYUFBYSxhQUFhLGFBQWEsY0FBYyxhQUFhLFdBQVcsYUFBYSxXQUFXLGFBQWEsU0FDckgsV0FBVztBQUNqQjtBQVNBLFNBQVMsaUJBQWlCLFVBQTBCO0FBQ2xELFFBQU0sS0FBSyxPQUFPLGFBQWEsV0FBVyxXQUFXO0FBQ3JELE1BQUksR0FBRyxXQUFXLFNBQVMsRUFBRyxRQUFPLGdCQUFNLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUMxRCxNQUFJLE9BQU8sUUFBUyxRQUFPO0FBQzNCLFNBQU8sZ0JBQU0sR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQzlCO0FBR0EsU0FBUyx3QkFBd0IsU0FBb0M7QUFDbkUsTUFBSSxPQUFPLFlBQVksWUFBWSxZQUFZLEdBQUksUUFBTyxDQUFDO0FBQzNELFNBQU8sUUFBUSxNQUFNLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxVQUFVO0FBQzlDLFFBQUksS0FBSyxXQUFXLEtBQUssR0FBRztBQUMxQixhQUNFLDRDQUFDLFNBQWdCLE9BQU8sRUFBRSxZQUFZLEtBQUssVUFBVSxVQUFVLFdBQVcsVUFBVSxJQUFJLElBQUksSUFBSSxjQUFjLEdBQUcsT0FBTywwQ0FBMEMsR0FDL0osZUFBSyxNQUFNLENBQUMsS0FETCxLQUVWO0FBQUEsSUFFSjtBQUNBLFFBQUksS0FBSyxXQUFXLElBQUksR0FBRztBQUN6QixhQUFPLDZDQUFDLFNBQWdCLE9BQU8sRUFBRSxhQUFhLElBQUksWUFBWSxJQUFJLEdBQUc7QUFBQTtBQUFBLFFBQUcsZUFBZSxLQUFLLE1BQU0sQ0FBQyxDQUFDO0FBQUEsV0FBbkYsS0FBcUY7QUFBQSxJQUN4RztBQUNBLFdBQU8sNENBQUMsU0FBaUIsbUJBQVMsS0FBSyxTQUFXLGVBQWUsSUFBSSxLQUFwRCxLQUFzRDtBQUFBLEVBQ3pFLENBQUM7QUFDSDtBQUdBLElBQUk7QUFHSixTQUFTLGVBQWUsTUFBK0I7QUFDckQsUUFBTSxRQUEyQixDQUFDO0FBQ2xDLE1BQUksT0FBTztBQUNYLE1BQUk7QUFDSixvQkFBa0IsWUFBWTtBQUM5QixVQUFRLFFBQVEsa0JBQWtCLEtBQUssSUFBSSxPQUFPLE1BQU07QUFDdEQsUUFBSSxNQUFNLFFBQVEsS0FBTSxPQUFNLEtBQUssS0FBSyxNQUFNLE1BQU0sTUFBTSxLQUFLLENBQUM7QUFDaEUsVUFBTSxDQUFDLE1BQU0sTUFBTSxPQUFPLElBQUk7QUFDOUIsVUFBTTtBQUFBLE1BQ0o7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUVDLE9BQU87QUFBQSxZQUNMLFlBQVk7QUFBQSxZQUFRLFFBQVE7QUFBQSxZQUFRLFNBQVM7QUFBQSxZQUFTLFFBQVE7QUFBQSxZQUM5RCxZQUFZO0FBQUEsWUFDWixVQUFVO0FBQUEsWUFBVyxPQUFPO0FBQUEsWUFBMkMsZ0JBQWdCO0FBQUEsVUFDekY7QUFBQSxVQUNBLE9BQU07QUFBQSxVQUNOLFNBQVMsTUFBTTtBQUFFLHlCQUFhLE1BQU0sT0FBTyxPQUFPLENBQUM7QUFBQSxVQUFFO0FBQUEsVUFDckQ7QUFBQTtBQUFBLFFBUkssR0FBRyxNQUFNLEtBQUssSUFBSSxJQUFJO0FBQUEsTUFRdEI7QUFBQSxJQUNUO0FBQ0EsV0FBTyxNQUFNLFFBQVEsS0FBSztBQUFBLEVBQzVCO0FBQ0EsTUFBSSxPQUFPLEtBQUssT0FBUSxPQUFNLEtBQUssS0FBSyxNQUFNLElBQUksQ0FBQztBQUNuRCxTQUFPLE1BQU0sV0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLDRDQUFDLFVBQU0saUJBQU07QUFDdEQ7QUFVQSxJQUFNLGVBQWU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWtCckIsSUFBTSxzQkFBc0IsTUFBb0M7QUFDOUQsUUFBTSxVQUFVLE1BQU0sS0FBSyxTQUFTLGlCQUFrQywyQ0FBMkMsQ0FBQyxFQUMvRyxLQUFLLENBQUMsU0FBUyxLQUFLLGdCQUFnQixHQUFHO0FBQzFDLFFBQU0sVUFBVSxTQUFTO0FBQ3pCLFFBQU0sWUFBWSxTQUFTLFVBQVUsTUFBTSxLQUFLLEVBQUUsS0FBSyxDQUFDQyxVQUFTQSxNQUFLLFNBQVMsT0FBTyxDQUFDO0FBQ3ZGLE1BQUksWUFBWSxVQUFhLFlBQVksUUFBUSxjQUFjLFVBQWEsaUJBQWlCLE9BQU8sRUFBRSxjQUFjLFNBQVUsUUFBTztBQUNySSxRQUFNLFFBQVEsU0FBUyxjQUFjLE9BQU87QUFDNUMsUUFBTSxLQUFLO0FBQ1gsUUFBTSxjQUFjO0FBQUEsYUFDVCxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVlwQixXQUFTLEtBQUssWUFBWSxLQUFLO0FBQy9CLFNBQU87QUFDVDtBQWNPLElBQU0saUJBQWlCO0FBQUEsRUFDNUIsSUFBSTtBQUFBLElBQ0YsbUJBQW1CO0FBQUEsSUFDbkIsMkJBQTJCO0FBQUEsSUFDM0IsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsaUJBQWlCO0FBQUEsSUFDakIsY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsZ0JBQWdCO0FBQUEsSUFDaEIsY0FBYztBQUFBLElBQ2QsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIsdUJBQXVCO0FBQUEsSUFDdkIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsaUJBQWlCO0FBQUEsSUFDakIsdUJBQXVCO0FBQUEsSUFDdkIsa0JBQWtCO0FBQUEsSUFDbEIsa0JBQWtCO0FBQUEsSUFDbEIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIsZ0JBQWdCO0FBQUEsSUFFaEIsb0JBQW9CO0FBQUEsSUFDcEIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIscUJBQXFCO0FBQUEsSUFDckIsY0FBYztBQUFBLElBQ2QsbUJBQW1CO0FBQUEsSUFDbkIsZ0JBQWdCO0FBQUEsSUFDaEIsc0JBQXNCO0FBQUEsSUFDdEIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsc0JBQXNCO0FBQUEsSUFDdEIsc0JBQXNCO0FBQUEsSUFDdEIscUJBQXFCO0FBQUEsSUFDckIscUJBQXFCO0FBQUEsSUFDckIsMEJBQTBCO0FBQUEsSUFDMUIsOEJBQThCO0FBQUEsSUFDOUIsb0JBQW9CO0FBQUEsSUFDcEIsd0JBQXdCO0FBQUEsSUFDeEIsd0JBQXdCO0FBQUEsSUFDeEIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsc0JBQXNCO0FBQUEsSUFDdEIsYUFBYTtBQUFBLElBQ2Isb0JBQW9CO0FBQUEsSUFDcEIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2Ysa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsY0FBYztBQUFBLElBQ2QsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIsc0JBQXNCO0FBQUEsSUFDdEIscUJBQXFCO0FBQUEsSUFDckIsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsd0JBQXdCO0FBQUEsSUFDeEIsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsY0FBYztBQUFBLElBQ2Qsa0JBQWtCO0FBQUEsSUFDbEIsc0JBQXNCO0FBQUEsSUFDdEIsc0JBQXNCO0FBQUEsSUFDdEIsZ0JBQWdCO0FBQUEsSUFDaEIsb0JBQW9CO0FBQUEsSUFDcEIsb0JBQW9CO0FBQUEsSUFDcEIsa0JBQWtCO0FBQUEsSUFDbEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIscUJBQXFCO0FBQUEsSUFDckIsdUJBQXVCO0FBQUEsSUFDdkIsbUJBQW1CO0FBQUEsSUFDbkIsdUJBQXVCO0FBQUEsSUFDdkIsd0JBQXdCO0FBQUEsSUFDeEIscUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUEsSUFDekIsY0FBYztBQUFBLElBQ2QsZ0JBQWdCO0FBQUEsSUFDaEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLElBQ2QsbUJBQW1CO0FBQUEsSUFDbkIsc0JBQXNCO0FBQUEsSUFDdEIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsb0JBQW9CO0FBQUEsSUFDcEIscUJBQXFCO0FBQUEsSUFDckIscUJBQXFCO0FBQUEsSUFDckIsa0JBQWtCO0FBQUEsSUFDbEIsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLElBQ2Ysa0JBQWtCO0FBQUEsSUFDbEIsb0JBQW9CO0FBQUEsSUFDcEIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsd0JBQXdCO0FBQUEsSUFDeEIscUJBQXFCO0FBQUEsSUFDckIsd0JBQXdCO0FBQUEsSUFDeEIsNEJBQTRCO0FBQUEsSUFDNUIsNkJBQTZCO0FBQUEsSUFDN0IsMkJBQTJCO0FBQUEsSUFDM0Isb0JBQW9CO0FBQUEsSUFDcEIsdUJBQXVCO0FBQUEsSUFDdkIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIsb0JBQW9CO0FBQUEsSUFDcEIsb0JBQW9CO0FBQUEsSUFDcEIsa0JBQWtCO0FBQUEsSUFDbEIsa0JBQWtCO0FBQUEsSUFDbEIsd0JBQXdCO0FBQUEsSUFDeEIsaUJBQWlCO0FBQUEsSUFDakIsd0JBQXdCO0FBQUEsSUFDeEIsbUJBQW1CO0FBQUEsSUFDbkIsdUJBQXVCO0FBQUEsSUFDdkIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsdUJBQXVCO0FBQUEsSUFDdkIsc0JBQXNCO0FBQUEsSUFDdEIsc0JBQXNCO0FBQUEsSUFDdEIsa0NBQWtDO0FBQUEsSUFDbEMsZ0NBQWdDO0FBQUEsSUFDaEMsb0JBQW9CO0FBQUEsSUFDcEIsd0JBQXdCO0FBQUEsSUFDeEIsb0JBQW9CO0FBQUEsSUFDcEIsdUJBQXVCO0FBQUEsSUFDdkIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIsNkJBQTZCO0FBQUEsSUFDN0IsMkJBQTJCO0FBQUEsSUFDM0IseUJBQXlCO0FBQUEsSUFDekIscUJBQXFCO0FBQUEsSUFDckIscUJBQXFCO0FBQUEsSUFDckIsd0JBQXdCO0FBQUEsSUFDeEIsd0JBQXdCO0FBQUEsSUFDeEIsMEJBQTBCO0FBQUEsSUFDMUIsc0JBQXNCO0FBQUEsSUFDdEIsWUFBWTtBQUFBLElBQ1osb0JBQW9CO0FBQUEsSUFDcEIsa0JBQWtCO0FBQUEsSUFDbEIsbUJB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LElBQ1osZ0JBQWdCO0FBQUEsSUFDaEIsb0JBQW9CO0FBQUEsSUFDcEIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIscUJBQXFCO0FBQUEsSUFDckIsY0FBYztBQUFBLElBQ2QsbUJBQW1CO0FBQUEsSUFDbkIsZ0JBQWdCO0FBQUEsSUFDaEIsc0JBQXNCO0FBQUEsSUFDdEIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsc0JBQXNCO0FBQUEsSUFDdEIsc0JBQXNCO0FBQUEsSUFDdEIscUJBQXFCO0FBQUEsSUFDckIscUJBQXFCO0FBQUEsSUFDckIsMEJBQTBCO0FBQUEsSUFDMUIsOEJBQThCO0FBQUEsSUFDOUIsb0JBQW9CO0FBQUEsSUFDcEIsd0JBQXdCO0FBQUEsSUFDeEIsd0JBQXdCO0FBQUEsSUFDeEIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsc0JBQXNCO0FBQUEsSUFDdEIsYUFBYTtBQUFBLElBQ2Isb0JBQW9CO0FBQUEsSUFDcEIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2Ysa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsY0FBYztBQUFBLElBQ2QsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIsc0JBQXNCO0FBQUEsSUFDdEIscUJBQXFCO0FBQUEsSUFDckIsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsd0JBQXdCO0FBQUEsSUFDeEIsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsY0FBYztBQUFBLElBQ2Qsa0JBQWtCO0FBQUEsSUFDbEIsc0JBQXNCO0FBQUEsSUFDdEIsc0JBQXNCO0FBQUEsSUFDdEIsZ0JBQWdCO0FBQUEsSUFDaEIsb0JBQW9CO0FBQUEsSUFDcEIsb0JBQW9CO0FBQUEsSUFDcEIsa0JBQWtCO0FBQUEsSUFDbEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIscUJBQXFCO0FBQUEsSUFDckIsdUJBQXVCO0FBQUEsSUFDdkIsbUJBQW1CO0FBQUEsSUFDbkIsdUJBQXVCO0FBQUEsSUFDdkIsd0JBQXdCO0FBQUEsSUFDeEIscUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUEsSUFDekIsY0FBYztBQUFBLElBQ2QsZ0JBQWdCO0FBQUEsSUFDaEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLElBQ2QsbUJBQW1CO0FBQUEsSUFDbkIsc0JBQXNCO0FBQUEsSUFDdEIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsb0JBQW9CO0FBQUEsSUFDcEIscUJBQXFCO0FBQUEsSUFDckIscUJBQXFCO0FBQUEsSUFDckIsa0JBQWtCO0FBQUEsSUFDbEIsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLElBQ2Ysa0JBQWtCO0FBQUEsSUFDbEIsb0JBQW9CO0FBQUEsSUFDcEIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsd0JBQXdCO0FBQUEsSUFDeEIscUJBQXFCO0FBQUEsSUFDckIsd0JBQXdCO0FBQUEsSUFDeEIsNEJBQTRCO0FBQUEsSUFDNUIsNkJBQTZCO0FBQUEsSUFDN0IsMkJBQTJCO0FBQUEsSUFDM0Isb0JBQW9CO0FBQUEsSUFDcEIsdUJBQXVCO0FBQUEsSUFDdkIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIsb0JBQW9CO0FBQUEsSUFDcEIsb0JBQW9CO0FBQUEsSUFDcEIsa0JBQWtCO0FBQUEsSUFDbEIsa0JBQWtCO0FBQUEsSUFDbEIsd0JBQXdCO0FBQUEsSUFDeEIsaUJBQWlCO0FBQUEsSUFDakIsd0JBQXdCO0FBQUEsSUFDeEIsbUJBQW1CO0FBQUEsSUFDbkIsdUJBQXVCO0FBQUEsSUFDdkIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsdUJBQXVCO0FBQUEsSUFDdkIsc0JBQXNCO0FBQUEsSUFDdEIsc0JBQXNCO0FBQUEsSUFDdEIsa0NBQWtDO0FBQUEsSUFDbEMsZ0NBQWdDO0FBQUEsSUFDaEMsb0JBQW9CO0FBQUEsSUFDcEIsd0JBQXdCO0FBQUEsSUFDeEIsb0JBQW9CO0FBQUEsSUFDcEIsdUJBQXVCO0FBQUEsSUFDdkIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIsNkJBQTZCO0FBQUEsSUFDN0IsMkJBQTJCO0FBQUEsSUFDM0IseUJBQXlCO0FBQUEsSUFDekIscUJBQXFCO0FBQUEsSUFDckIscUJBQXFCO0FBQUEsSUFDckIsd0JBQXdCO0FBQUEsSUFDeEIsd0JBQXdCO0FBQUEsSUFDeEIsMEJBQTBCO0FBQUEsSUFDMUIsc0JBQXNCO0FBQUEsSUFDdEIsWUFBWTtBQUFBLElBQ1osb0JBQW9CO0FBQUEsSUFDcEIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIsZ0JBQWdCO0FBQUEsSUFDaEIsZ0JBQWdCO0FBQUEsSUFDaEIsd0JBQXdCO0FBQUEsSUFDeEIseUJBQXlCO0FBQUEsSUFDekIsdUJBQXVCO0FBQUEsSUFDdkIsb0JBQW9CO0FBQUEsSUFDcEIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIscUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUEsSUFDekIsb0JBQW9CO0FBQUEsSUFDcEIscUJB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
