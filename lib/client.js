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
  const isFailedAnalysis = (d) => d !== void 0 && d.analysis.what.startsWith("AI \u89E3\u8BFB\u5931\u8D25");
  const retryFailedDetails = () => {
    const failed = selectedTargets.filter((target) => isFailedAnalysis(details[target]));
    if (failed.length === 0) {
      setActionResult("\u2717 \u5F53\u524D\u6CA1\u6709\u89E3\u8BFB\u5931\u8D25\u7684\u63D0\u4EA4");
      return;
    }
    let done = 0;
    for (const target of failed) {
      loadDetail(target, true);
      done += 1;
    }
    setActionResult("\u{1F501} \u5DF2\u5BF9 " + String(done) + " \u6761\u89E3\u8BFB\u5931\u8D25\u7684\u63D0\u4EA4\u53D1\u8D77\u91CD\u65B0\u751F\u6210\uFF08\u5E76\u53D1\u6C60\u81EA\u52A8\u8C03\u5EA6\uFF0C\u5B8C\u6210\u540E\u5361\u7247\u81EA\u52A8\u5237\u65B0\uFF09");
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
    (() => {
      const failedCount = selectedTargets.filter((target) => isFailedAnalysis(details[target])).length;
      if (failedCount === 0) return null;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", alignItems: "center", padding: "8px 12px", marginBottom: "10px", background: "var(--dsw-alias-bg-layer-1, #fafafa)", border: "1px solid " + themeAwareText("#f14c4c"), borderRadius: "6px", fontSize: "12px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { color: themeAwareText("#d1242f"), fontWeight: 600 }, children: [
          "\u26A0 ",
          String(failedCount),
          " \u6761\u63D0\u4EA4\u89E3\u8BFB\u5931\u8D25"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: { ...styles.secondary, fontWeight: 600 }, onClick: () => {
          retryFailedDetails();
        }, children: [
          "\u{1F501} ",
          t("cache.regenerate"),
          "\u5168\u90E8\u5931\u8D25"
        ] })
      ] });
    })(),
    selectedTargets.map((target) => {
      const d = details[target];
      const label = target === "working" ? t("repo.working") : d?.commit?.message ?? target.slice(0, 8);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: `\u{1F50D} ${label}${target !== "working" ? `\uFF08${target.slice(0, 8)}\uFF09` : ""}`, children: [
        d !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }, children: [
          isFailedAnalysis(d) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(themeAwareText("#f14c4c")), children: "\u26A0 \u89E3\u8BFB\u5931\u8D25" }),
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
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.what, ...isFailedAnalysis(d) ? { color: themeAwareText("#d1242f"), fontWeight: 600 } : {} }, children: d.analysis.what })
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "inline-flex", gap: "6px", alignItems: "center" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
              void loadRunDetail(run.id);
            }, children: runDetail?.run.id === run.id ? t("plan.refreshDetail") : t("plan.viewDetail") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px", color: themeAwareText("#d1242f") },
                onClick: () => {
                  const changeTitle2 = changes.find((change) => change.id === run.changeId)?.title ?? run.changeId;
                  const siblingCount = runs.filter((entry) => entry.changeId === run.changeId).length;
                  setConfirmDialog({
                    title: "\u5220\u9664\u8FD9\u6761\u53D8\u66F4\u4EFB\u52A1\uFF1F",
                    message: `\u300C${changeTitle2}\u300D\u53CA\u5176\u5168\u90E8\u6267\u884C\u8BB0\u5F55\uFF08\u542B\u672C\u6761\u5728\u5185\u5171 ${String(siblingCount)} \u6761 Run\uFF09\u3001\u8BA1\u5212\u3001\u95EE\u9898\u6E05\u5355\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002`,
                    danger: true,
                    onConfirm: () => {
                      void runAction("deleteChange", "/project-control/api/changes/delete", { id: run.changeId });
                    }
                  });
                },
                children: "\u2715"
              }
            )
          ] }) })
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
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(task.status === "done" ? "#4ec9b0" : task.status === "queued" ? "#8b949e" : task.status === "running" || task.status === "merging" || task.status === "redo" ? "#dcdcaa" : "#f14c4c"), children: (() => {
                const planExec = task.planExec === true;
                const roundLabel = task.mode === "plan" ? task.attempt > 1 ? `\xB7\u51FA\u65B9\u6848\xB7\u7B2C ${String(task.attempt)} \u6B21` : "\xB7\u51FA\u65B9\u6848" : planExec ? `\xB7\u6267\u884C\xB7\u65B9\u6848#${String(task.attempt)}` : task.attempt > 1 ? `\xB7\u6267\u884C\xB7\u7B2C ${String(task.attempt)} \u6B21` : "";
                return `${FIX_STATUS_LABELS[task.status] ?? task.status}${roundLabel}`;
              })() }),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NsaWVudC9pbmRleC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdGhlbWUudHMiLCAiLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmtzcGFjZUZyYW1lLnRzeCIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvY29tbWl0LXJvdW5kcy50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvTW9kZXJuV29ya3NwYWNlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXHJcbiAqIENsaWVudCBwbHVnaW4gZW50cnkgZm9yIGRzaC1wcm9qZWN0LWNvbnRyb2wuXHJcbiAqXHJcbiAqIFx1NUUwM1x1NUM0MFx1NjdCNlx1Njc4NFx1RkYwOFx1NURGMlx1OUE4Q1x1OEJDMVx1RkYwQzIwMjYtMDgtMzBcdUZGMDlcdUZGMUFcclxuICogLSBcdTVERTVcdTRGNUNcdTUzRjBcdTkwNkVcdTg1M0RcdTVCOThcdTY1QjkgYGRldGFpbHNgIFx1NjlGRFx1RkYwOHByaW9yaXR5IC0xMFx1RkYwQ1x1NUI5OFx1NjVCOSBEZXRhaWxzUGFuZWwgXHU3NTU5XHU1NzI4XHU4RDI2XHU2NzJDXHU0RTBBXHVGRjBDXHJcbiAqICAgXHU1Mzc4XHU4RjdEXHU2MjExXHU0RUVDXHU3Njg0XHU2Q0U4XHU1MThDXHU1MzczXHU2MDYyXHU1OTBEXHVGRjA5XHVGRjBDXHU2RTMyXHU2N0QzXHU1NzI4XHU0RTNCXHU2ODQ2XHU2N0I2IGRldGFpbHMgXHU1MjE3XHVGRjFCXHJcbiAqIC0gV29ya3NwYWNlRnJhbWUgXHU2Q0U4XHU1MTY1XHU2ODM3XHU1RjBGXHU4ODY4XHVGRjBDXHU2MjhBXHU1Qjk4XHU2NUI5XHU3RjUxXHU2ODNDXHU4OUM2XHU4OUM5XHU2MzYyXHU1MjE3XHVGRjFBXHU4MDRBXHU1OTI5XHVGRjA4Y2VudGVyQ29sXHVGRjA5XHU2NzAwXHU1M0YzXHUzMDAxXHJcbiAqICAgXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4ZGV0YWlsc0NvbFx1RkYwOVx1NUM0NVx1NEUyRCAxZnJcdUZGMUJcdTY1RTBcdTRGMUFcdThCRERcdTg0M0RcdTU3MzBcdTk4NzVcdUZGMDhkYXRhLWRldGFpbHMtY29sbGFwc2VkXHVGRjA5XHJcbiAqICAgXHU4MUVBXHU1MkE4XHU2MDYyXHU1OTBEXHU1MzlGXHU3NTFGXHU1MjE3XHU1RThGXHVGRjFCXHJcbiAqIC0gXHU1REU2XHU0RkE3XHU1Qjk4XHU2NUI5XHU1QkZDXHU4MjJBXHUzMDAxXHU1Qjk4XHU2NUI5XHU4MDRBXHU1OTI5XHU2NzJDXHU0RjUzXHU5NkY2XHU2NTM5XHU1MkE4XHVGRjFCXHJcbiAqIC0gXHU0RkE3XHU4RkI5XHU2ODBGXHU2MzA5XHU5NEFFXHU1NzI4XHUzMDBDXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1M0YwIFx1MjFDNCBcdTVCOThcdTY1QjlcdThCRTZcdTYwQzVcdTk3NjJcdTY3N0ZcdTMwMERcdTk1RjRcdTUyMDdcdTYzNjJcdUZGMDhcdTUzRUZcdTkwMDZcdUZGMDlcdUZGMUJcclxuICogLSBgdG9vbC5jYWxsLnRvb2x2aWV3YCBcdTRFM0EgYW5hbHl6ZV9jaGFuZ2UgXHU0RkREXHU3NTU5XHU0RTEzXHU1QzVFXHU1MzYxXHU3MjQ3XHVGRjFCXHJcbiAqIC0gXHU2NTg3XHU2ODQ4XHU1MTY4XHU5MEU4XHU3RUNGIGN0eC5sb2NhbGUgXHU4QkNEXHU1MTc4XHVGRjA4emggLyBlblx1RkYwOVx1MzAwMlxyXG4gKlxyXG4gKiBAbW9kdWxlIGRzaC1jbGllbnQtcHJvamVjdC1jb250cm9sXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBDaGFuZ2VDYXJkIH0gZnJvbSAnLi9jb21wb25lbnRzL0NoYW5nZUNhcmQudHMnXHJcbmltcG9ydCB7IFdPUktTUEFDRV9ESUNULCBXb3Jrc3BhY2VGcmFtZSB9IGZyb20gJy4vY29tcG9uZW50cy9Xb3Jrc3BhY2VGcmFtZS50c3gnXHJcbmltcG9ydCB7IE1vZGVybldvcmtzcGFjZSB9IGZyb20gJy4vY29tcG9uZW50cy9Nb2Rlcm5Xb3Jrc3BhY2UudHN4J1xyXG5cclxuY29uc3QgTlMgPSAncHJvamVjdC1jb250cm9sJ1xyXG5cclxuZXhwb3J0IGNvbnN0IG5hbWUgPSAnY2xpZW50LXByb2plY3QtY29udHJvbCdcclxuZXhwb3J0IGNvbnN0IGluamVjdCA9IFsnc2xvdHMnLCAnbG9jYWxlJywgJ2xheW91dCddXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoY3R4OiBhbnkpOiB2b2lkIHtcclxuICBjdHguZWZmZWN0KCgpID0+IGN0eC5sb2NhbGUucmVnaXN0ZXIoTlMsIHsgemg6IFdPUktTUEFDRV9ESUNULnpoLCBlbjogV09SS1NQQUNFX0RJQ1QuZW4gfSksICdwcm9qZWN0LWNvbnRyb2w6IGRpY3Rpb25hcmllcycpXHJcbiAgY29uc3QgbGF5b3V0ID0gY3R4LmxheW91dFxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgMS4gXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1M0YwXHVGRjFBXHU5MDZFXHU4NTNEIGRldGFpbHMgXHU2OUZEXHVGRjA4XHU1M0VGXHU5MDA2XHVGRjA5XHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgLy8gXHU2NUIwXHU3QTk3XHU1M0UzXHU5RUQ4XHU4QkE0XHU0RTBEXHU2NjNFXHU3OTNBXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4XHU0RkREXHU2MzAxXHU1Qjk4XHU2NUI5XHU1MzlGXHU3NTFGXHU4OUM2XHU4OUQyXHVGRjA5XHVGRjBDXHU3NTMxXHU0RkE3XHU4RkI5XHU2ODBGXHU2MzA5XHU5NEFFXHU2NjNFXHU1RjBGXHU2MjUzXHU1RjAwXHUzMDAyXHJcbiAgbGV0IHdvcmtzcGFjZUVuYWJsZWQgPSBmYWxzZVxyXG4gIGxldCBkaXNwb3NlV29ya3NwYWNlOiAoKCkgPT4gdm9pZCkgfCB1bmRlZmluZWRcclxuXHJcbiAgY29uc3QgcmVnaXN0ZXJXb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBkaXNwb3NlV29ya3NwYWNlID0gY3R4LnNsb3RzLnJlZ2lzdGVyKFxyXG4gICAgICB7XHJcbiAgICAgICAgbmFtZTogJ2RldGFpbHMnLFxyXG4gICAgICAgIHByaW9yaXR5OiAtMTAsXHJcbiAgICAgICAgbG9jYWxlOiBOUyxcclxuICAgICAgfSxcclxuICAgICAgLy8gXHU2MzAyXHU4RjdEXHU1MzczXHU2MjUzXHU1RjAwIGRldGFpbHMgXHU4RjY4XHU5MDUzXHVGRjA4XHU5NzYyXHU2NzdGXHU1MDRGXHU1OTdEXHU5RUQ4XHU4QkE0IDBcdUZGMDlcdUZGMUFcdTVERTVcdTRGNUNcdTUzRjBcdTk3MDBcdTg5ODFcdTc3MUZcdTVCOUVcdTVCQkRcdTVFQTZcdUZGMUJcclxuICAgICAgLy8gXHU2NUUwXHU0RjFBXHU4QkREXHU4NDNEXHU1NzMwXHU5ODc1XHU4RjY4XHU5MDUzXHU2MDUyIDBcdUZGMENcdTU5MjlcdTcxMzZcdTRGRERcdTYzMDFcdTUzOUZcdTc1MUZcdTgyRjFcdTk2QzRcdTk4NzVcdTVFMDNcdTVDNDBcdTMwMDJcclxuICAgICAgLy8gXHU0RjFBXHU4QkREXHU1MjA3XHU2MzYyXHU2NUY2XHU1Qjk4XHU2NUI5XHU0RjFBIGNsb3NlRGV0YWlscyBcdTIwMTRcdTIwMTQgXHU1RUY2XHU1NDBFXHU0RTAwXHU2MkNEXHU5MUNEXHU2NUIwXHU2NDkxXHU1RjAwXHVGRjA4XHU1QjhGXHU0RUZCXHU1MkExXHU2NjVBXHU0RThFXHU3MjM2XHU3RUE3IGVmZmVjdFx1RkYwOVx1MzAwMlxyXG4gICAgICAocHJvcHM6IGFueSkgPT4ge1xyXG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgICBsYXlvdXQ/Lm9wZW5EZXRhaWxzPy4oKVxyXG4gICAgICAgIH0sIFtdKVxyXG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgICBpZiAocHJvcHMuc2Vzc2lvbklkID09PSB1bmRlZmluZWQpIHJldHVyblxyXG4gICAgICAgICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IGxheW91dD8ub3BlbkRldGFpbHM/LigpLCAwKVxyXG4gICAgICAgICAgcmV0dXJuICgpID0+IHsgY2xlYXJUaW1lb3V0KHRpbWVyKSB9XHJcbiAgICAgICAgfSwgW3Byb3BzLnNlc3Npb25JZF0pXHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoV29ya3NwYWNlRnJhbWUsIHsgLi4ucHJvcHMsIGtleTogcHJvcHMuc2Vzc2lvbklkID8/ICdsYW5kaW5nJywgbGF5b3V0IH0pXHJcbiAgICAgIH0sXHJcbiAgICApXHJcbiAgfVxyXG4gIGNvbnN0IHVucmVnaXN0ZXJXb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBkaXNwb3NlV29ya3NwYWNlPy4oKVxyXG4gICAgZGlzcG9zZVdvcmtzcGFjZSA9IHVuZGVmaW5lZFxyXG4gIH1cclxuXHJcbiAgY3R4LnNsb3RzLmluamVjdCgnZGV0YWlscycsICgpID0+IHtcclxuICAgIGlmICh3b3Jrc3BhY2VFbmFibGVkKSByZWdpc3RlcldvcmtzcGFjZSgpXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB1bnJlZ2lzdGVyV29ya3NwYWNlKClcclxuICAgIH1cclxuICB9KVxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgMi4gXHU0RkE3XHU4RkI5XHU2ODBGXHU1RTk1XHU5MEU4XHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwIFx1MjFDNCBcdTVCOThcdTY1QjlcdThCRTZcdTYwQzUgXHU1MjA3XHU2MzYyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIC8vIFx1NjMwOVx1OTRBRVx1NzJCNlx1NjAwMVx1NjYwRVx1NzkzQVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1NjYzRVx1NzkzQVx1NEUyRCBcdTIxOTIgXHUzMDBDXHVEODNFXHVEREVEIFx1NURFNVx1NEY1Q1x1NTNGMCBcdTI3MTNcdTMwMERcdUZGMUJcdTVERjJcdTUyMDdcdTVCOThcdTY1QjlcdThCRTZcdTYwQzUgXHUyMTkyIFx1MzAwQ1x1RDgzRVx1RERFRCBcdTYyNTNcdTVGMDBcdTVERTVcdTRGNUNcdTUzRjBcdTMwMERcdTlBRDhcdTRFQUVcdUZGMENcclxuICAvLyBcdTc1MjhcdTYyMzdcdTk2OEZcdTY1RjZcdTc3MEJcdTVGOTdcdTUyMzBcdTYwMEVcdTRFNDhcdTUyMDdcdTU2REVcdTY3NjVcdUZGMDhcdTUyMDdcdTYzNjJcdTdFQ0Ygd2luZG93IFx1NEU4Qlx1NEVGNlx1OTAxQVx1NzdFNVx1NjMwOVx1OTRBRVx1OTFDRFx1NkUzMlx1NjdEM1x1RkYwOVx1MzAwMlxyXG4gIGNvbnN0IFRPR0dMRV9FVkVOVCA9ICdwYy13b3Jrc3BhY2UtdG9nZ2xlJ1xyXG4gIGNvbnN0IGZpcmVUb2dnbGUgPSAoZW5hYmxlZDogYm9vbGVhbik6IHZvaWQgPT4ge1xyXG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFRPR0dMRV9FVkVOVCwgeyBkZXRhaWw6IGVuYWJsZWQgfSkpXHJcbiAgfVxyXG4gIGNvbnN0IGRpc21pc3NNb2Rlcm5Xb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBpZiAoIXdvcmtzcGFjZUVuYWJsZWQpIHJldHVyblxyXG4gICAgd29ya3NwYWNlRW5hYmxlZCA9IGZhbHNlXHJcbiAgICBmaXJlVG9nZ2xlKGZhbHNlKVxyXG4gIH1cclxuXHJcbiAgLy8gMC4yLnggXHU3Njg0XHU0RjFBXHU4QkREXHU2NzBEXHU1MkExXHU1M0VGXHU5MDA5XHU2Q0U4XHU1MTY1XHVGRjFBXHU2NUU3XHU3MjQ4XHU2Q0ExXHU2NzA5XHU2NUIwXHU3MjQ4XHU1RTAzXHU1QzQwXHU2M0E1XHU1M0UzXHVGRjBDXHU0RUNEXHU2Q0JGXHU3NTI4IGRldGFpbHMgXHU1MjA2XHU2NTJGXHUzMDAyXHJcbiAgY3R4LmluamVjdChbJ3VpU2Vzc2lvbiddLCAoc2NvcGU6IGFueSkgPT4ge1xyXG4gICAgaWYgKGxheW91dC5wYW5lbEluZm8gPT09IHVuZGVmaW5lZCkgcmV0dXJuXHJcbiAgICBjb25zdCBjdXJyZW50ID0gc2NvcGUudWlTZXNzaW9uLmFkYXB0ZXIuY3VycmVudFxyXG4gICAgc2NvcGUuc2xvdHMuaW5qZWN0KCdzaGVsbC5vdmVybGF5JywgKCkgPT4gc2NvcGUuc2xvdHMucmVnaXN0ZXIoe1xyXG4gICAgICBuYW1lOiAnc2hlbGwub3ZlcmxheScsIGlkOiAncHJvamVjdC1jb250cm9sLXdvcmtzcGFjZScsXHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IFtlbmFibGVkLCBzZXRFbmFibGVkXSA9IFJlYWN0LnVzZVN0YXRlKHdvcmtzcGFjZUVuYWJsZWQpXHJcbiAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IChldmVudDogRXZlbnQpOiB2b2lkID0+IHsgc2V0RW5hYmxlZCgoZXZlbnQgYXMgQ3VzdG9tRXZlbnQ8Ym9vbGVhbj4pLmRldGFpbCkgfVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFRPR0dMRV9FVkVOVCwgaGFuZGxlcilcclxuICAgICAgICByZXR1cm4gKCkgPT4geyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpIH1cclxuICAgICAgfSwgW10pXHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGVybldvcmtzcGFjZSwgeyBjdXJyZW50LCBwYW5lbEluZm86IGxheW91dC5wYW5lbEluZm8sIGVuYWJsZWQsIG9uRGlzbWlzczogZGlzbWlzc01vZGVybldvcmtzcGFjZSB9KVxyXG4gICAgfSkpXHJcbiAgfSlcclxuXHJcbiAgY3R4LnNsb3RzLmluamVjdCgnc2lkZWJhci5mb290ZXIuYWN0aW9uJywgKCkgPT4ge1xyXG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XHJcbiAgICAgIG5hbWU6ICdzaWRlYmFyLmZvb3Rlci5hY3Rpb24nLFxyXG4gICAgICBpZDogJ3Byb2plY3QtY29udHJvbC10b2dnbGUnLFxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICBjb25zdCBbZW5hYmxlZCwgc2V0RW5hYmxlZF0gPSBSZWFjdC51c2VTdGF0ZSh3b3Jrc3BhY2VFbmFibGVkKVxyXG4gICAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQ6IEV2ZW50KTogdm9pZCA9PiB7IHNldEVuYWJsZWQoKGV2ZW50IGFzIEN1c3RvbUV2ZW50PGJvb2xlYW4+KS5kZXRhaWwpIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoVE9HR0xFX0VWRU5ULCBoYW5kbGVyKSB9XHJcbiAgICAgIH0sIFtdKVxyXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgICAnYnV0dG9uJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAnZGF0YS10ZXN0aWQnOiAncHJvamVjdC1jb250cm9sLXNpZGViYXItdG9nZ2xlJyxcclxuICAgICAgICAgIHRpdGxlOiBlbmFibGVkID8gJ1x1NUY1M1x1NTI0RFx1NjYzRVx1NzkzQVx1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMFx1MzAwMlx1NzBCOVx1NTFGQlx1NTNFRlx1NEUzNFx1NjVGNlx1NTIwN1x1NjM2Mlx1NEUzQVx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1RkYwOFx1NjdFNVx1NzcwQlx1NURFNVx1NTE3N1x1OEMwM1x1NzUyOFx1NzY4NFx1NUI4Q1x1NjU3NFx1OEY5M1x1NTE2NS9cdThGOTNcdTUxRkFcdUZGMDlcdUZGMUJcdTUxOERcdTcwQjlcdTY3MkNcdTYzMDlcdTk0QUVcdTUzNzNcdTYwNjJcdTU5MERcdTMwMDInIDogJ1x1NUY1M1x1NTI0RFx1NjYzRVx1NzkzQVx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1MzAwMlx1NzBCOVx1NTFGQlx1NjA2Mlx1NTkwRFx1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMFx1MzAwMicsXHJcbiAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc2cHgnLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEwcHgnLCBmb250U2l6ZTogJzEycHgnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICBjb2xvcjogZW5hYmxlZCA/ICdpbmhlcml0JyA6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiBlbmFibGVkID8gNDAwIDogNjAwLFxyXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJywgb3BhY2l0eTogMC45LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgd29ya3NwYWNlRW5hYmxlZCA9ICF3b3Jrc3BhY2VFbmFibGVkXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBsYXlvdXQ/Lm9wZW5EZXRhaWxzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAod29ya3NwYWNlRW5hYmxlZCAmJiBkaXNwb3NlV29ya3NwYWNlID09PSB1bmRlZmluZWQpIHJlZ2lzdGVyV29ya3NwYWNlKClcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCF3b3Jrc3BhY2VFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgIHVucmVnaXN0ZXJXb3Jrc3BhY2UoKVxyXG4gICAgICAgICAgICAgICAgICBsYXlvdXQ/LmNsb3NlRGV0YWlscz8uKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdvcmtzcGFjZUVuYWJsZWQgJiYgbGF5b3V0LnBhbmVsSW5mbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGF5b3V0LnBhbmVsSW5mby5nZXRTbmFwc2hvdCgpLmFjdGl2ZVBhbmVsSWQgIT09IG51bGwpIGxheW91dC5zZWxlY3RQYW5lbChudWxsKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmlnaHRiYXIgPSBjdHguZ2V0KCdzaWRlYmFyUmlnaHQnKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0YmFyPy5pc0V4cGFuZGVkKCkpIHJpZ2h0YmFyLnRvZ2dsZUV4cGFuZGVkKClcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgICAgICAgICAgd29ya3NwYWNlRW5hYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdbcHJvamVjdC1jb250cm9sXSB3b3Jrc3BhY2UgdG9nZ2xlIGZhaWxlZCcsIGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpcmVUb2dnbGUod29ya3NwYWNlRW5hYmxlZClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbmFibGVkID8gJ1x1RDgzRVx1RERFRCBcdTVERTVcdTRGNUNcdTUzRjAgXHUyNzEzJyA6ICdcdUQ4M0VcdURERUQgXHU2MjUzXHU1RjAwXHU1REU1XHU0RjVDXHU1M0YwJyxcclxuICAgICAgKVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgMy4gXHU4MDRBXHU1OTI5XHU1REU1XHU1MTc3XHU1MzYxXHU3MjQ3XHVGRjA4XHU2MjY3XHU4ODRDL1x1OEJDNFx1NUJBMS9cdTlBOENcdTY1MzZcdUZGMDlcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBzaW1wbGVSZXN1bHRDYXJkID0gKHRpdGxlOiBzdHJpbmcpOiAoKHByb3BzOiBhbnkpID0+IGFueSkgPT4gKHByb3BzOiBhbnkpID0+IHtcclxuICAgIGNvbnN0IG91dHB1dCA9IHByb3BzPy5vdXRwdXRcclxuICAgIGNvbnN0IHRleHQgPSB0eXBlb2Ygb3V0cHV0ID09PSAnc3RyaW5nJ1xyXG4gICAgICA/IG91dHB1dFxyXG4gICAgICA6IG91dHB1dD8uc3VtbWFyeSA/PyBvdXRwdXQ/Lmlzc3VlcyA/PyBvdXRwdXQ/LmRldGFpbHMgPz8gKG91dHB1dCA/IEpTT04uc3RyaW5naWZ5KG91dHB1dCwgbnVsbCwgMikgOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHUyMDI2JylcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAge1xyXG4gICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgIHBhZGRpbmc6ICcxMHB4IDEycHgnLFxyXG4gICAgICAgICAgbWFyZ2luOiAnNHB4IDAnLFxyXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXHJcbiAgICAgICAgICBmb250U2l6ZTogJzEycHgnLFxyXG4gICAgICAgICAgbGluZUhlaWdodDogMS42LFxyXG4gICAgICAgICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyxcclxuICAgICAgICAgIG1heEhlaWdodDogMjYwLFxyXG4gICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzRweCcgfSB9LCB0aXRsZSksXHJcbiAgICAgIFN0cmluZyh0ZXh0KSxcclxuICAgIClcclxuICB9XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCAzLiBhbmFseXplX2NoYW5nZSBcdTRFMTNcdTVDNUVcdTVERTVcdTUxNzdcdTUzNjFcdTcyNDcgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY3R4LnNsb3RzLmluamVjdCgndG9vbC5jYWxsLnRvb2x2aWV3JywgKCkgPT4ge1xyXG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XHJcbiAgICAgIG5hbWU6ICd0b29sLmNhbGwudG9vbHZpZXcnLFxyXG4gICAgICBrZXk6ICdhbmFseXplX2NoYW5nZScsXHJcbiAgICB9LCAocHJvcHM6IGFueSkgPT4ge1xyXG4gICAgICBpZiAocHJvcHM/LnRvb2xOYW1lICE9PSAnYW5hbHl6ZV9jaGFuZ2UnKSByZXR1cm4gbnVsbFxyXG4gICAgICBjb25zdCBvdXRwdXQgPSBwcm9wcz8ub3V0cHV0XHJcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENoYW5nZUNhcmQsIHtcclxuICAgICAgICB0aXRsZTogJ1x1NTNEOFx1NjZGNFx1NTIwNlx1Njc5MFx1NjJBNVx1NTQ0QSAoQ2hhbmdlIEFuYWx5c2lzKScsXHJcbiAgICAgICAgZmlsZXNDaGFuZ2VkOiBvdXRwdXQ/LmZpbGVzQ2hhbmdlZCA/PyAwLFxyXG4gICAgICAgIGluc2VydGlvbnM6IG91dHB1dD8uaW5zZXJ0aW9ucyA/PyAwLFxyXG4gICAgICAgIGRlbGV0aW9uczogb3V0cHV0Py5kZWxldGlvbnMgPz8gMCxcclxuICAgICAgICBldmlkZW5jZUlkOiBvdXRwdXQ/LmV2aWRlbmNlSWQsXHJcbiAgICAgICAgc3RhdHVzOiBvdXRwdXQgPyAnY29tcGxldGVkJyA6ICdhbmFseXppbmcnLFxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICBmb3IgKGNvbnN0IFt0b29sS2V5LCB0aXRsZV0gb2YgW1xyXG4gICAgWydzdGFydF9ydW4nLCAnXHVEODNEXHVERTgwIFx1NjI2N1x1ODg0QyBSdW4nXSxcclxuICAgIFsncnVuX3JldmlldycsICdcdUQ4M0RcdUREMEQgXHU0RUUzXHU3ODAxXHU4QkM0XHU1QkExJ10sXHJcbiAgICBbJ3J1bl92ZXJpZmljYXRpb24nLCAnXHUyNzA1IFx1OUE4Q1x1NjUzNlx1OUE4Q1x1OEJDMSddLFxyXG4gIF0gYXMgY29uc3QpIHtcclxuICAgIGN0eC5zbG90cy5pbmplY3QoJ3Rvb2wuY2FsbC50b29sdmlldycsICgpID0+IHtcclxuICAgICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7IG5hbWU6ICd0b29sLmNhbGwudG9vbHZpZXcnLCBrZXk6IHRvb2xLZXkgfSwgc2ltcGxlUmVzdWx0Q2FyZCh0aXRsZSkpXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iLCAiLyoqXHJcbiAqIFJlYWN0IENvbXBvbmVudDogQ2hhbmdlIC8gSW5zaWdodCBDYXJkIGZvciBDaGF0IFZpZXcuXHJcbiAqIFJlbmRlcnMgc3RydWN0dXJlZCBpbnNpZ2h0cywgZGlmZiBzdGF0aXN0aWNzLCBhbmQgZXZpZGVuY2UgYmFkZ2VzLlxyXG4gKlxyXG4gKiBcdTk4OUNcdTgyNzJcdThENzAgZHN3LWFsaWFzIFx1NEUzQlx1OTg5OFx1NTNEOFx1OTFDRiArIHRoZW1lQXdhcmVUZXh0IFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYxQVxyXG4gKiBcdTZCNjRcdTUyNERcdTc1MjhcdTc2ODQgYC0tZHNoLSpgIFx1NTNEOFx1OTFDRlx1NTcyOFx1NUJCRlx1NEUzQlx1OTFDQ1x1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1NjgzN1x1NUYwRlx1NkMzOFx1OEZEQ1x1ODQzRFx1NTcyOFx1NkRGMVx1ODI3Mlx1NTE1Q1x1NUU5NVx1NEUwQVx1RkYwQ1xyXG4gKiBcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTRFMEJcdTgwNEFcdTU5MjlcdTZENDFcdTkxQ0NcdTUxRkFcdTczQjBcdTdBODFcdTUxNDBcdTlFRDFcdTUzNjFcdUZGMUJcdTY1NzBcdTVCNTdcdTdFRkYvXHU3RUEyXHU0RTVGXHU2NjJGXHU2REYxXHU4MjcyXHU1NDExXHU5MTREXHU4MjcyXHVGRjBDXHU3NjdEXHU1RTk1XHU0RTBEXHU1M0VGXHU4QkZCXHUzMDAyXHJcbiAqXHJcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9DaGFuZ2VDYXJkXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyB0aGVtZUF3YXJlVGV4dCB9IGZyb20gJy4vdGhlbWUudHMnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUNhcmRQcm9wcyB7XHJcbiAgdGl0bGU/OiBzdHJpbmdcclxuICBmaWxlc0NoYW5nZWQ/OiBudW1iZXJcclxuICBpbnNlcnRpb25zPzogbnVtYmVyXHJcbiAgZGVsZXRpb25zPzogbnVtYmVyXHJcbiAgZXZpZGVuY2VJZD86IHN0cmluZ1xyXG4gIHN0YXR1cz86IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ2hhbmdlQ2FyZDogUmVhY3QuRkM8Q2hhbmdlQ2FyZFByb3BzPiA9ICh7XHJcbiAgdGl0bGUgPSAnQ2hhbmdlIEluc2lnaHQnLFxyXG4gIGZpbGVzQ2hhbmdlZCA9IDAsXHJcbiAgaW5zZXJ0aW9ucyA9IDAsXHJcbiAgZGVsZXRpb25zID0gMCxcclxuICBldmlkZW5jZUlkLFxyXG4gIHN0YXR1cyA9ICdhbmFseXplZCcsXHJcbn0pID0+IHtcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICdkaXYnLFxyXG4gICAge1xyXG4gICAgICAnZGF0YS10ZXN0aWQnOiAncHJvamVjdC1jb250cm9sLWNoYW5nZS1jYXJkJyxcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgcGFkZGluZzogJzEwcHggMTRweCcsXHJcbiAgICAgICAgbWFyZ2luOiAnNnB4IDAnLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXHJcbiAgICAgICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgICAgIGZvbnRTaXplOiAnMTNweCcsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgJ2RpdicsXHJcbiAgICAgIHtcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBudWxsLCBgXHVEODNEXHVERDBEICR7dGl0bGV9YCksXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgJ3NwYW4nLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHggNnB4JyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJnLWluc2V0LCByZ2JhKDUsNSw1LDAuMDYpKScsXHJcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgKSxcclxuICAgICksXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEycHgnLCBmb250U2l6ZTogJzEycHgnLCBvcGFjaXR5OiAwLjkgfSB9LFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgbnVsbCwgYFx1RDgzRFx1RENDMSAke2ZpbGVzQ2hhbmdlZH0gZmlsZXNgKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjMWE3ZjM3JykgfSB9LCBgKyR7aW5zZXJ0aW9uc31gKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2YyMjJlJykgfSB9LCBgLSR7ZGVsZXRpb25zfWApLFxyXG4gICAgICBldmlkZW5jZUlkXHJcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgICAnc3BhbicsXHJcbiAgICAgICAgICAgIHsgc3R5bGU6IHsgb3BhY2l0eTogMC43LCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyB9IH0sXHJcbiAgICAgICAgICAgIGBbJHtldmlkZW5jZUlkfV1gLFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIDogbnVsbCxcclxuICAgICksXHJcbiAgKVxyXG59XHJcbiIsICIvKipcbiAqIFx1NUJBMlx1NjIzN1x1N0FFRlx1NEUzQlx1OTg5OFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYwOFx1NkRGMVx1NkQ0NVx1NTNDQ1x1NEUzQlx1OTg5OFx1NTE3MVx1NzUyOFx1NzY4NFx1NTUyRlx1NEUwMFx1NUI5RVx1NzNCMFx1RkYwOVx1MzAwMlxuICpcbiAqIFx1NEUwRFx1NTNEOFx1NUYwRlx1RkYwODIwMjYtMDktMTAgXHU2REYxXHU4MjcyXHU2QTIxXHU1RjBGXHUzMDBDXHU5ODc1XHU3QjdFXHU3NjdEXHU1NzU3XHUzMDBEXHU0RThCXHU2NTQ1XHU1NDBFXHU1NkZBXHU1MzE2XHVGRjBDXHU1MTY4XHU1QkEyXHU2MjM3XHU3QUVGXHU1RkM1XHU5ODdCXHU5MDc1XHU1Qjg4XHVGRjA5XHVGRjFBXG4gKiAxLiBcdTk2OEZcdTRFM0JcdTk4OThcdTUzRDhcdTUzMTZcdTc2ODRcdTVGM0FcdThDMDNcdTgyNzJcdTY1ODdcdTVCNTdcdTVGQzVcdTk4N0JcdTdFQ0YgdGhlbWVBd2FyZVRleHQoKVx1RkYxQVx1NkQ0NVx1ODI3Mlx1NEUzQlx1OTg5OFx1ODFFQVx1NTJBOFx1NkRGMVx1NTMxNlx1NTIzMFx1NzY3RFx1NUU5NVxuICogICAgXHU1QkY5XHU2QkQ0XHU1RUE2IFx1MjI2NTQuNToxXHVGRjBDXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU4MUVBXHU1MkE4XHU2M0QwXHU0RUFFXHU1MjMwXHU2REYxXHU1RTk1IFx1MjI2NTQuNToxXHUzMDAyXHU5ODdCXHU1NzI4XHU2RTMyXHU2N0QzXHU2NzFGXHU4QzAzXHU3NTI4XHVGRjA4XHU3RUM0XHU0RUY2XHU0RjUzXHU1MTg1L1xuICogICAgXHU2RTMyXHU2N0QzXHU1MUZEXHU2NTcwXHU1MTg1XHVGRjA5XHVGRjBDXHU0RTNCXHU5ODk4XHU1MjA3XHU2MzYyXHU1NDBFXHU5NjhGXHU5MUNEXHU2RTMyXHU2N0QzXHU4MUVBXHU1MkE4XHU2NkY0XHU2NUIwXHVGRjFCXHU3OTgxXHU2QjYyXHU1NzI4XHU2QTIxXHU1NzU3XHU1MkEwXHU4RjdEXHU2NzFGXHU2QzQyXHU1MDNDXHU1NDBFXHU1QjU4XHU4RkRCXG4gKiAgICBcdTk3NTlcdTYwMDFcdTY4MzdcdTVGMEZcdTVCRjlcdThDNjFcdTMwMDJcbiAqIDIuIGFjdGl2ZSBcdTlBRDhcdTRFQUVcdTgwQ0NcdTY2NkZcdUZGMDhcdTYzMDlcdTk0QUUgLyBcdTk4NzVcdTdCN0UgLyBcdTdCNUJcdTkwMDlcdTgyQUZcdTcyNDdcdTdCNDlcdTRFMDBcdTUyMDdcIlx1OTAwOVx1NEUyRFx1NTM3M1x1NTg2Qlx1ODI3MlwiXHU3Njg0XHU4ODY4XHU5NzYyXHVGRjA5XHU0RTAwXHU1RjhCXHU3NTI4XG4gKiAgICBgdmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpYFx1RkYwOFx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1NEUwQlx1OTBGRFx1NjYyRlx1ODRERFx1ODI3Mlx1RkYwOVx1RkYwQ1x1OTE0RFx1NzY3RFx1NUI1N1x1MzAwMlxuICogICAgXHU3OTgxXHU2QjYyXHU3NTI4IC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnkgXHU0RjVDXHU4MENDXHU2NjZGXHUyMDE0XHUyMDE0XHU1QjgzXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RjFBXHU4OEFCXG4gKiAgICBcdTVCOENcdTUxNjhcdTU0MUVcdTYzODlcdUZGMDhcdTY3MkNcdTZCMjFcdTRFOEJcdTY1NDVcdTY4MzlcdTU2RTBcdUZGMDlcdTMwMDJcbiAqIDMuIFx1NjVFMFx1NkNENVx1ODlFM1x1Njc5MFx1NzY4NFx1OTg5Q1x1ODI3Mlx1RkYwOENTUyBcdTUzRDhcdTkxQ0ZcdTdCNDlcdUZGMDlcdTUzOUZcdTY4MzdcdThGRDRcdTU2REVcdUZGMUFcdTUzRDhcdTkxQ0ZcdTgyNzJcdTRFQTRcdTc1MzFcdTVCQkZcdTRFM0JcdTRFM0JcdTk4OThcdTdDRkJcdTdFREZcdTRGRERcdThCQzFcdTUzRUZcdThCRkJcdUZGMENcbiAqICAgIFx1NEY0Nlx1NzUzMVx1NkI2NFx1NUI4M1x1NEVFQ1x1NEUwRFx1NUY5N1x1NEUwRVx1Nzg2Q1x1N0YxNlx1NzgwMVx1NTI0RFx1NjY2Rlx1ODI3Mlx1NTNFMFx1NTJBMFx1NEY3Rlx1NzUyOFx1MzAwMlxuICovXG5cbi8qKiBcdTg5RTNcdTY3OTAgI3JyZ2diYiBcdTYyMTYgcmdiKCkvcmdiYSgpIFx1OTg5Q1x1ODI3Mlx1NTI0RFx1NEUwOVx1NEUyQVx1NTIwNlx1OTFDRlx1NEUzQSBbciwgZywgYl1cdUZGMUJcdTY1RTBcdTZDRDVcdTg5RTNcdTY3OTBcdThGRDRcdTU2REUgbnVsbFx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29sb3IoY29sb3I6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IG51bGwge1xuICBjb25zdCBoZXggPSAvXiMoWzAtOWEtZl17Nn0pJC9pLmV4ZWMoY29sb3IpXG4gIGlmIChoZXggIT09IG51bGwpIHtcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlci5wYXJzZUludChoZXhbMV0hLCAxNilcbiAgICByZXR1cm4gWyh2YWx1ZSA+PiAxNikgJiAyNTUsICh2YWx1ZSA+PiA4KSAmIDI1NSwgdmFsdWUgJiAyNTVdXG4gIH1cbiAgY29uc3QgZnVuY3Rpb25hbCA9IC9ecmdiYT9cXChcXHMqKFxcZHsxLDN9KVssXFxzXSsoXFxkezEsM30pWyxcXHNdKyhcXGR7MSwzfSkvaS5leGVjKGNvbG9yKVxuICBpZiAoZnVuY3Rpb25hbCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBbTnVtYmVyKGZ1bmN0aW9uYWxbMV0pLCBOdW1iZXIoZnVuY3Rpb25hbFsyXSksIE51bWJlcihmdW5jdGlvbmFsWzNdKV1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG4vKiogV0NBRyBcdTc2RjhcdTVCRjlcdTRFQUVcdTVFQTZcdUZGMDgwPVx1OUVEMVx1RkYwQzE9XHU3NjdEXHVGRjA5XHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gcmVsYXRpdmVMdW1pbmFuY2UocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IGNoYW5uZWwgPSAodmFsdWU6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdiA9IHZhbHVlIC8gMjU1XG4gICAgcmV0dXJuIHYgPD0gMC4wMzkyOCA/IHYgLyAxMi45MiA6ICgodiArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjRcbiAgfVxuICByZXR1cm4gMC4yMTI2ICogY2hhbm5lbChyKSArIDAuNzE1MiAqIGNoYW5uZWwoZykgKyAwLjA3MjIgKiBjaGFubmVsKGIpXG59XG5cbi8qKiBcdTZERjFcdTUzMTZcdTk4OUNcdTgyNzJcdTc2RjRcdTUyMzBcdTc2N0RcdTVFOTVcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgIzFmMjMyOCBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA+IDAuMTgzOyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4MWYgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHgyMyAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHgyOCAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqIFx1NjNEMFx1NEVBRVx1OTg5Q1x1ODI3Mlx1NzZGNFx1NTIzMFx1NkRGMVx1NUU5NVx1RkYwOCMxNTE1MTdcdUZGMDlcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgI2YwZjZmYyBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpZ2h0ZW5Gb3JEYXJrQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA8IDAuMjE0OyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4ZjAgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHhmNiAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHhmYyAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqXG4gKiBcdTRFM0JcdTk4OThcdTgxRUFcdTkwMDJcdTVFOTRcdTY1ODdcdTVCNTdcdTgyNzJcdUZGMUFcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTZERjFcdTUzMTZcdTUyMzBcdTc2N0RcdTVFOTUgXHUyMjY1NC41OjFcdUZGMUJcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTYzRDBcdTRFQUVcdTUyMzBcdTZERjFcdTVFOTUgXHUyMjY1NC41OjFcbiAqIFx1RkYwOFx1NkRGMVx1ODI3Mlx1NUI1N1x1NTk4MiAjNTc2MDZhIFx1NzZGNFx1NjNBNVx1NjUzRVx1NkRGMVx1NUU5NVx1NTQwQ1x1NjgzN1x1NEUwRFx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlx1NjI0MFx1NjcwOVx1NUYzQVx1OEMwM1x1ODI3Mlx1NjU4N1x1NjcyQ1x1N0VERlx1NEUwMFx1OEQ3MFx1OEZEOVx1OTFDQ1x1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhlbWVBd2FyZVRleHQoY29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJnYiA9IHBhcnNlQ29sb3IoY29sb3IpXG4gIGlmIChyZ2IgPT09IG51bGwpIHJldHVybiBjb2xvclxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5ib2R5Py5oYXNBdHRyaWJ1dGU/LignZGF0YS1kcy1kYXJrLXRoZW1lJykgPT09IHRydWUpIHtcbiAgICByZXR1cm4gbGlnaHRlbkZvckRhcmtCYWNrZ3JvdW5kKHJnYlswXSwgcmdiWzFdLCByZ2JbMl0pXG4gIH1cbiAgcmV0dXJuIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyZ2JbMF0sIHJnYlsxXSwgcmdiWzJdKVxufVxuIiwgIi8qKlxyXG4gKiBQcm9qZWN0IENvbnRyb2wgXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4V29ya3NwYWNlRnJhbWVcdUZGMDl2Mlx1RkYxQVx1NTZGNFx1N0VENVwiXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XCJcdTdFQzRcdTdFQzdcdTMwMDJcclxuICpcclxuICogXHU1NkRCXHU0RTJBXHU5ODc1XHU3QjdFXHVGRjFBXHJcbiAqIDEuIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1RkYwOFx1OUVEOFx1OEJBNFx1RkYwOVx1RkYxQVx1NEVEM1x1NUU5M1x1NjgwRlx1RkYwOFx1NTkxQVx1NEVEM1x1NUU5M1x1NTIwN1x1NjM2Mlx1RkYwOSsgXHU2M0QwXHU0RUE0XHU1MjE3XHU4ODY4XHVGRjA4XHU1NDJCXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4XHVGRjA5K1xyXG4gKiAgICBcdThCRTZcdTYwQzVcdTk3NjJcdTY3N0ZcdUZGMDhBSSBcdTg5RTNcdThCRkJcdUZGMUFcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDgvXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxL1x1OThDRVx1OTY2OVx1RkYxQlx1NEUwOVx1N0VBN1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNCBTVkcgXHU1NkZFXHVGRjFCXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHU3RUQzXHU4QkJBXHVGRjA5XHUzMDAyXHJcbiAqIDIuIFx1OTg3OVx1NzZFRVx1NjAzQlx1ODlDOFx1RkYxQVx1OTg3OVx1NzZFRVx1Njg2M1x1Njg0OCArIFx1NUZFQlx1NjM3N1x1NjRDRFx1NEY1QyArIFx1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1RiArIFx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1MzAwMlxyXG4gKiAzLiBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdUZGMUFSdW4gXHU4RkRCXHU1RUE2XHU0RTBFXHU2MjEwXHU2NzJDXHUzMDAyXHJcbiAqIDQuIFx1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNlx1RkYxQVx1NjgzOFx1NjdFNVx1N0IxNFx1OEJCMFx1RkYwOFx1NTNFRlx1NTE3M1x1ODA1NFx1NjNEMFx1NEVBNFx1RkYwOSsgXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHVGRjA4XHU0RUJBXHU1REU1XHU3ODZFXHU4QkE0XHVGRjA5KyBcdTVCNjZcdTRFNjBcdTY5ODJcdTVGRjUgKyBSZXZpZXcvXHU5QThDXHU2NTM2XHU4QkIwXHU1RjU1XHUzMDAyXHJcbiAqXHJcbiAqIFx1NUUwM1x1NUM0MFx1NjczQVx1NTIzNlx1NEUwRFx1NTNEOFx1RkYxQVx1OTA2RVx1ODUzRFx1NUI5OFx1NjVCOSBkZXRhaWxzIFx1NjlGRCArIFx1NkNFOFx1NTE2NVx1NjgzN1x1NUYwRlx1NjM2Mlx1NTIxN1x1RkYwOFx1ODA0QVx1NTkyOVx1NjcwMFx1NTNGM1x1RkYwOSsgXHU1MjA2XHU5Njk0XHU2NzYxXHU2MkQ2XHU2MkZEXHU4QkIwXHU1RkM2XHVGRjFCXHJcbiAqIFx1N0VERlx1OEJBMVx1ODg0Q1x1NEUyNFx1ODg0Q1x1OTRCM1x1NTIzNlx1NzUzMVx1OEZEMFx1ODg0Q1x1NjVGNlx1NjMwOVx1Njc4NFx1NUVGQVx1NTRDOFx1NUUwQ1x1N0NCRVx1NTFDNlx1NkNFOFx1NTE2NVx1RkYwOGFwcGx5U3RhdHNMaW5lQ2xhbXBcdUZGMDlcdTMwMDJcclxuICpcclxuICogQG1vZHVsZSBkc2gtY2xpZW50LXByb2plY3QtY29udHJvbC9jb21wb25lbnRzL1dvcmtzcGFjZUZyYW1lXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBwYXJzZUNvbG9yLCB0aGVtZUF3YXJlVGV4dCB9IGZyb20gJy4vdGhlbWUudHMnXHJcbmltcG9ydCB7IGNsdXN0ZXJJbnRvUm91bmRzIH0gZnJvbSAnLi9jb21taXQtcm91bmRzLnRzJ1xyXG5cclxuLyoqIFx1NUJCRlx1NEUzQiAvc3RhdGUgXHU4RkQ0XHU1NkRFXHU3Njg0XHU1RkVCXHU3MTY3XHU1RjYyXHU3MkI2XHVGRjA4XHU0RTBFIGFwaS1yb3V0ZS50cyBidWlsZFN0YXRlIFx1NUJGOVx1OUY1MFx1RkYwOVx1MzAwMiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZVN0YXRlIHtcclxuICByZWFkeT86IGJvb2xlYW5cclxuICByZWFzb24/OiBzdHJpbmdcclxuICBwbHVnaW5WZXJzaW9uPzogc3RyaW5nXHJcbiAgcHJvamVjdD86IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyByb290UGF0aDogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxyXG4gIGNoYW5nZXM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IHNvdXJjZTogc3RyaW5nOyB1cGRhdGVkQXQ6IG51bWJlciB9PlxyXG4gIHJ1bnM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBzdGFydGVkQXQ6IG51bWJlciB8IG51bGw7IGZpbmlzaGVkQXQ6IG51bWJlciB8IG51bGw7IGNvc3RVc2Q/OiBudW1iZXI7IHN0ZXBzVG90YWw/OiBudW1iZXI7IHN0ZXBzRG9uZT86IG51bWJlcjsgY3VycmVudFN0ZXA/OiBzdHJpbmcgfCBudWxsIH0+XHJcbiAgYXR0ZW1wdHNDb3VudD86IG51bWJlclxyXG4gIG1lbW9yaWVzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBwcm9qZWN0SWQ6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0cnV0aExldmVsOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ/OiBzdHJpbmc7IGlzSHVtYW5Db25maXJtZWQ6IGJvb2xlYW47IGdpdEJyYW5jaDogc3RyaW5nIHwgbnVsbDsgY3JlYXRlZEF0OiBudW1iZXIgfT5cclxuICBldmlkZW5jZUNvdW50PzogbnVtYmVyXHJcbiAgcmVjZW50RXZpZGVuY2U/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHNvdXJjZTogc3RyaW5nOyB0cnV0aExldmVsOiBzdHJpbmc7IGxvY2F0b3I6IHN0cmluZzsgc25pcHBldDogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxyXG4gIHJlc29sdmVkSXNzdWVSZXRlbnRpb25EYXlzPzogbnVtYmVyXHJcbiAgaW1wb3J0ZWRDaGFuZ2VzPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb21taXRDb3VudDogbnVtYmVyOyBmaXJzdENvbW1pdEF0OiBudW1iZXI7IGxhc3RDb21taXRBdDogbnVtYmVyOyBjb25maWRlbmNlOiBudW1iZXI7IHN0YXR1czogc3RyaW5nIH0+XHJcbiAgaXNzdWVzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBjaGFuZ2VJZDogc3RyaW5nOyBzZXZlcml0eTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZyB9PlxyXG4gIHZlcmlmaWNhdGlvbnM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZzsgY3JlYXRlZEF0OiBudW1iZXIgfT5cclxuICBib290c3RyYXA/OiB7IGlkOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgdGVjaFN0YWNrOiBzdHJpbmdbXTsgbWFuaWZlc3RGaWxlczogc3RyaW5nW107IHN5bWJvbHNDb3VudDogbnVtYmVyOyBjcmVhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxyXG4gIGNvbmZpcm1lZD86IEFycmF5PHsgaWQ6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmc7IGZvcmJpZGRlblBhdGhzOiBzdHJpbmdbXSB9PlxyXG4gIGNvbmNlcHRzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNhdGVnb3J5OiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmc7IG9jY3VycmVuY2VzOiBudW1iZXIgfT5cclxufVxyXG5cclxuLyoqIEdFVCAvY29tbWl0cyBcdTc2ODRcdTYzRDBcdTRFQTRcdTY3NjFcdTc2RUVcdTMwMDJhbmFseXplZCA9IFx1NURGMlx1NzUxRlx1NjIxMFx1OEZDNyBBSSBcdTg5RTNcdThCRkJcdUZGMDhcdTY3MkFcdTZEODhcdTUzMTZcdTU3MDZcdTcwQjlcdTZEODhcdTcwQjlcdTRGOURcdTYzNkVcdUZGMDlcdTMwMDIgKi9cclxuaW50ZXJmYWNlIENvbW1pdEVudHJ5IHtcclxuICBzaGE6IHN0cmluZ1xyXG4gIHNob3J0SGFzaDogc3RyaW5nXHJcbiAgYXV0aG9yOiBzdHJpbmdcclxuICBkYXRlOiBudW1iZXJcclxuICBzdWJqZWN0OiBzdHJpbmdcclxuICBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IGFkZHM6IG51bWJlcjsgZGVsczogbnVtYmVyIH0+XHJcbiAgYW5hbHl6ZWQ/OiBib29sZWFuXHJcbn1cclxuXHJcbmludGVyZmFjZSBDb21taXRzUGF5bG9hZCB7XHJcbiAgcm9vdFBhdGg6IHN0cmluZ1xyXG4gIGJyYW5jaDogc3RyaW5nIHwgbnVsbFxyXG4gIGhlYWRTaGE6IHN0cmluZyB8IG51bGxcclxuICB3b3JraW5nOiB7IGZpbGVDb3VudDogbnVtYmVyOyBpc0NsZWFuOiBib29sZWFuOyBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nIH0+IH1cclxuICBjb21taXRzOiBDb21taXRFbnRyeVtdXHJcbn1cclxuXHJcbmludGVyZmFjZSBDb21taXREZXRhaWxQYXlsb2FkIHtcclxuICBzaGE6IHN0cmluZ1xyXG4gIGlzV29ya2luZzogYm9vbGVhblxyXG4gIGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgYWRkczogbnVtYmVyOyBkZWxzOiBudW1iZXIgfT5cclxuICBpbnNlcnRpb25zOiBudW1iZXJcclxuICBkZWxldGlvbnM6IG51bWJlclxyXG4gIHBhdGNoVHJ1bmNhdGVkOiBib29sZWFuXHJcbiAgcGF0Y2g6IHN0cmluZ1xyXG4gIGNvbW1pdDogeyBtZXNzYWdlOiBzdHJpbmc7IGF1dGhvcjogc3RyaW5nOyBkYXRlOiBudW1iZXIgfSB8IG51bGxcclxuICBhbmFseXNpczogeyB3aGF0OiBzdHJpbmc7IGxvZ2ljOiBzdHJpbmdbXTsgcmlza3M6IHN0cmluZ1tdIH1cclxuICBhbmFseXNpc0NhY2hlZD86IGJvb2xlYW5cclxuICBhbmFseXNpc0dlbmVyYXRlZEF0PzogbnVtYmVyIHwgbnVsbFxyXG4gIC8qKiBcdTY3MkNcdTZCMjFcdTg5RTNcdThCRkJcdTc2ODQgTExNIFx1NjIxMFx1NjcyQ1x1RkYwOFx1NEYzMFx1RkYwQ1VTRFx1RkYwOVx1RkYxQlx1N0YxM1x1NUI1OFx1NjcyQVx1NUUyNlx1NjIxMFx1NjcyQy9cdTY3MkFcdTRFQTdcdTc1MUZcdThDMDNcdTc1MjhcdTY1RjZcdTdGM0FcdTc3MDFcdTMwMDIgKi9cclxuICBhbmFseXNpc0Nvc3RVc2Q/OiBudW1iZXJcclxuICBhbmFseXNpc1Rva2Vucz86IHsgaW5wdXQ6IG51bWJlcjsgb3V0cHV0OiBudW1iZXI7IHRvdGFsOiBudW1iZXIgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSW1wYWN0U2NvcGVQYXlsb2FkIHtcclxuICBjaGFuZ2VkRmlsZXM6IHN0cmluZ1tdXHJcbiAgc2hhcz86IHN0cmluZ1tdXHJcbiAgcmlza0xldmVsOiAnbG93JyB8ICdtZWRpdW0nIHwgJ2hpZ2gnIHwgJ2NyaXRpY2FsJ1xyXG4gIHJpc2tTY29yZTogbnVtYmVyXHJcbiAgcmlza0ZhY3RvcnM/OiBBcnJheTx7IHRleHQ6IHN0cmluZzsgcG9pbnRzOiBudW1iZXIgfT5cclxuICBrZXlDaGFuZ2VQb2ludHM/OiBzdHJpbmdbXVxyXG4gIG1lbW9yaWVzPzogQXJyYXk8eyB0aXRsZTogc3RyaW5nOyB0eXBlOiBzdHJpbmcgfT5cclxuICBmdW5jdGlvbkltcGFjdD86IEFycmF5PHtcclxuICAgIHN5bWJvbDogc3RyaW5nXHJcbiAgICBkZWZpbmVkSW46IHN0cmluZ1xyXG4gICAgcm9sZT86IHN0cmluZ1xyXG4gICAgY2hhbmdlPzogc3RyaW5nXHJcbiAgICBpbXBhY3Q/OiBzdHJpbmdcclxuICAgIGNhbGxlcnM6IEFycmF5PHsgZmlsZTogc3RyaW5nOyBsaW5lOiBzdHJpbmc7IHNuaXBwZXQ6IHN0cmluZyB9PlxyXG4gIH0+XHJcbiAgbGV2ZWxzOiBBcnJheTx7IGxldmVsOiBzdHJpbmc7IGRlcHRoOiBudW1iZXI7IHBhdGg6IHN0cmluZzsgY29uZmlkZW5jZTogbnVtYmVyOyByZWFzb246IHN0cmluZyB9PlxyXG4gIGRpcmVjdDogc3RyaW5nW11cclxuICBleHBsYW5hdGlvbnNDYWNoZWQ/OiBib29sZWFuXHJcbiAgZ2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXHJcbiAgLyoqIFx1NTFGRFx1NjU3MFx1N0VBN1x1OEJGNFx1NjYwRVx1OTBBM1x1NkIyMSBMTE0gXHU4QzAzXHU3NTI4XHU3Njg0XHU2MjEwXHU2NzJDXHVGRjA4XHU0RjMwXHVGRjBDVVNEXHVGRjA5XHUzMDAyICovXHJcbiAgZXhwbGFuYXRpb25zQ29zdFVzZD86IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJldmlld1BheWxvYWQge1xyXG4gIGlzc3Vlc0ZvdW5kOiBudW1iZXJcclxuICBpc3N1ZXM6IHN0cmluZ1xyXG4gIHZlcmRpY3Q6IHN0cmluZ1xyXG4gIGNhY2hlZD86IGJvb2xlYW5cclxuICBnZW5lcmF0ZWRBdD86IG51bWJlciB8IG51bGxcclxuICBjb3N0VXNkPzogbnVtYmVyXHJcbiAgaXNzdWVMaXN0PzogQXJyYXk8eyBzZXZlcml0eTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBldmlkZW5jZTogc3RyaW5nOyBmaXg6IHN0cmluZyB9PlxyXG59XHJcblxyXG5pbnRlcmZhY2UgTm90ZUVudHJ5IHtcclxuICBpZDogc3RyaW5nXHJcbiAgcHJvamVjdElkOiBzdHJpbmdcclxuICBzaGE/OiBzdHJpbmdcclxuICB0aXRsZTogc3RyaW5nXHJcbiAgY29udGVudDogc3RyaW5nXHJcbiAgdGFncz86IHN0cmluZ1tdXHJcbiAgcGlubmVkPzogYm9vbGVhblxyXG4gIGNyZWF0ZWRBdDogbnVtYmVyXHJcbiAgdXBkYXRlZEF0PzogbnVtYmVyXHJcbn1cclxuXHJcbi8qKiBHRVQgL2lzc3VlcyBcdTc2ODRcdThCQzRcdTVCQTFcdTk1RUVcdTk4OThcdTY3NjFcdTc2RUVcdUZGMDhSZXZpZXcgXHU5NUVFXHU5ODk4XHU5ODc1XHU3QjdFXHU2NTcwXHU2MzZFXHU2RTkwXHVGRjA5XHUzMDAyICovXHJcbmludGVyZmFjZSBJc3N1ZUVudHJ5IHtcclxuICBpZDogc3RyaW5nXHJcbiAgY2hhbmdlSWQ6IHN0cmluZ1xyXG4gIHNldmVyaXR5OiBzdHJpbmdcclxuICBjYXRlZ29yeTogc3RyaW5nXHJcbiAgdGl0bGU6IHN0cmluZ1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcclxuICBzdGF0dXM6IHN0cmluZ1xyXG4gIHJlc29sdXRpb246IHN0cmluZ1xyXG4gIGZpeFN0YXRzOiB7IGZpbGVzOiBudW1iZXI7IGluc2VydGlvbnM6IG51bWJlcjsgZGVsZXRpb25zOiBudW1iZXIgfSB8IG51bGxcclxuICBmaXhGaWxlczogc3RyaW5nW11cclxuICBmaXhJbXBhY3Q6IEFycmF5PHsgc3ltYm9sOiBzdHJpbmc7IGRlZmluZWRJbjogc3RyaW5nOyBjYWxsZXJzOiBBcnJheTx7IGZpbGU6IHN0cmluZzsgbGluZTogc3RyaW5nOyBzbmlwcGV0OiBzdHJpbmcgfT4gfT5cclxuICBmaXhEaWZmOiBzdHJpbmdcclxuICAvKiogXHU1Rjg1XHU4QkM0XHU1QkExL1x1NURGMlx1NkQzRVx1NTNEMVx1NzY4NFx1NEZFRVx1NTkwRFx1NjVCOVx1Njg0OFx1RkYwOFx1NjVCOVx1Njg0OFx1NkEyMVx1NUYwRlx1NEVBN1x1NTFGQVx1RkYwOVx1MzAwMiAqL1xyXG4gIGZpeFBsYW4/OiB7IGlkOiBzdHJpbmc7IGFwcHJvYWNoOiBzdHJpbmc7IGZpbGVzOiBzdHJpbmdbXTsgaW1wYWN0OiBzdHJpbmc7IGJlbmVmaXQ6IHN0cmluZzsgcmlzazogc3RyaW5nOyBzdGF0dXM6IHN0cmluZyB9IHwgbnVsbFxyXG4gIGNyZWF0ZWRBdDogbnVtYmVyXHJcbiAgdXBkYXRlZEF0OiBudW1iZXJcclxufVxyXG5cclxuLyoqIFx1NEZFRVx1NTkwRFx1NkQzRVx1NTNEMVx1NEVGQlx1NTJBMVx1ODlDNlx1NTZGRVx1RkYwOEdFVCAvZml4L3N0YXR1c1x1RkYwOVx1MzAwMiAqL1xyXG5pbnRlcmZhY2UgRml4VGFza0VudHJ5IHtcclxuICBpc3N1ZUlkOiBzdHJpbmdcclxuICB0aXRsZTogc3RyaW5nXHJcbiAgc3RhdHVzOiAncXVldWVkJyB8ICdydW5uaW5nJyB8ICdtZXJnaW5nJyB8ICdyZWRvJyB8ICdkb25lJyB8ICdjb25mbGljdCcgfCAnZmFpbGVkJyB8ICdjYW5jZWxsZWQnXHJcbiAgYXR0ZW1wdDogbnVtYmVyXHJcbiAgc3VtbWFyeT86IHN0cmluZ1xyXG4gIGZpbGVzPzogc3RyaW5nW11cclxuICBjb21taXQ/OiBzdHJpbmdcclxuICBlcnJvcj86IHN0cmluZ1xyXG4gIC8qKiBcdThGRDBcdTg4NENcdTRFMkRcdTVCNTBcdTRFRTNcdTc0MDZcdTc2ODRcdTY3MDBcdThGRDFcdTUyQThcdTRGNUNcdUZGMDhcdThCRkIvXHU1MTk5XHU1NEVBXHU0RTJBXHU2NTg3XHU0RUY2XHVGRjA5XHUzMDAyICovXHJcbiAgY3VycmVudEFjdGlvbj86IHN0cmluZ1xyXG4gIC8qKiBcdTVCOENcdTYyMTBcdTU0MEVcdTc2ODRcdTVGNzFcdTU0Q0RcdTY0NThcdTg5ODFcdUZGMDhcdTc2RjRcdTZEM0VcdTRFRkJcdTUyQTFcdTgxRUFcdTUyQThcdThCQTFcdTdCOTdcdUZGMDlcdTMwMDIgKi9cclxuICBpbXBhY3Q/OiB7IHJpc2tMZXZlbDogc3RyaW5nOyByaXNrU2NvcmU6IG51bWJlcjsgZGlyZWN0OiBzdHJpbmdbXTsgaW5kaXJlY3Q6IHN0cmluZ1tdOyBwb3RlbnRpYWw6IHN0cmluZ1tdIH1cclxuICAvKiogXHU0RUZCXHU1MkExXHU2QTIxXHU1RjBGXHVGRjFBZml4PVx1NEZFRVx1NTkwRFx1RkYwOFx1OUVEOFx1OEJBNFx1RkYwOVx1RkYxQnBsYW49XHU1M0VBXHU4QkZCXHU1MUZBXHU2NUI5XHU2ODQ4XHUzMDAyICovXHJcbiAgbW9kZT86ICdmaXgnIHwgJ3BsYW4nXHJcbiAgLyoqIGZpeCBcdTRFRkJcdTUyQTFcdTRFMTRcdTYzMDlcdTYyNzlcdTUxQzZcdTY1QjlcdTY4NDhcdTYyNjdcdTg4NENcdUZGMDhcdThGNkVcdTZCMjFcdTY1ODdcdTY4NDhcdTMwMENcdTYyNjdcdTg4NENcdTAwQjdcdTY1QjlcdTY4NDgjTlx1MzAwRFx1RkYwOVx1MzAwMiAqL1xyXG4gIHBsYW5FeGVjPzogYm9vbGVhblxyXG4gIC8qKiBcdTZBMjFcdTU3OEJcdTYyQTVcdTk1MTlcdTdFRURcdThERDFcdTZCMjFcdTY1NzAgLyBcdTYzQTJcdTZEM0JcdTZCMjFcdTY1NzBcdUZGMDhcdTZEM0JcdTYwMjdcdTcyQjZcdTYwMDFcdTY3M0FcdTkwMEZcdTUxRkFcdUZGMDlcdTMwMDIgKi9cclxuICByZXN1bWVzPzogbnVtYmVyXHJcbiAgcHJvYmVzPzogbnVtYmVyXHJcbn1cclxuXHJcbi8qKiBcdTRGRUVcdTU5MERcdTVERUVcdTVGMDJcdTc2ODRcdTg4NENcdTdFQTdcdTc3NDBcdTgyNzJcdTZFMzJcdTY3RDNcdUZGMUErIFx1N0VGRlx1MzAwMS0gXHU3RUEyXHUzMDAxXHU2NTg3XHU0RUY2XHU1OTM0XHU1MkEwXHU3Qzk3XHUzMDAxXHU1MTc2XHU0RjU5XHU1RjMxXHU1MzE2XHUzMDAyICovXHJcbmZ1bmN0aW9uIHJlbmRlckRpZmZMaW5lcyhkaWZmOiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XHJcbiAgaWYgKHR5cGVvZiBkaWZmICE9PSAnc3RyaW5nJyB8fCBkaWZmID09PSAnJykgcmV0dXJuIFtdXHJcbiAgcmV0dXJuIGRpZmYuc3BsaXQoJ1xcbicpLnNsaWNlKDAsIDQwMCkubWFwKChsaW5lLCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3Qgc3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XHJcbiAgICAgIGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknLFxyXG4gICAgICBmb250U2l6ZTogJzExcHgnLCBsaW5lSGVpZ2h0OiAxLjYsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcsXHJcbiAgICB9XHJcbiAgICBpZiAobGluZS5zdGFydHNXaXRoKCcrKysnKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJy0tLScpIHx8IGxpbmUuc3RhcnRzV2l0aCgnZGlmZiAtLWdpdCcpIHx8IGxpbmUuc3RhcnRzV2l0aCgnQEAnKSkge1xyXG4gICAgICBzdHlsZS5jb2xvciA9ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKSdcclxuICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKCcrJykpIHtcclxuICAgICAgc3R5bGUuY29sb3IgPSB0aGVtZUF3YXJlVGV4dCgnIzFhN2YzNycpXHJcbiAgICAgIHN0eWxlLmJhY2tncm91bmQgPSAncmdiYSg0NiwxNjAsNjcsMC4wOCknXHJcbiAgICB9IGVsc2UgaWYgKGxpbmUuc3RhcnRzV2l0aCgnLScpKSB7XHJcbiAgICAgIHN0eWxlLmNvbG9yID0gdGhlbWVBd2FyZVRleHQoJyNkMTI0MmYnKVxyXG4gICAgICBzdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoMjA5LDM2LDQ3LDAuMDgpJ1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3R5bGUuY29sb3IgPSAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknXHJcbiAgICB9XHJcbiAgICByZXR1cm4gPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17c3R5bGV9PntsaW5lID09PSAnJyA/ICdcXHUwMEEwJyA6IGxpbmV9PC9kaXY+XHJcbiAgfSlcclxufVxyXG5cclxuLyoqIFx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNFx1OTg3NVx1NzY4NFx1NTNFRlx1N0YxNlx1OEY5MVx1NkI2NVx1OUFBNFx1RkYwOC9ydW5zL3N0YXJ0IFx1OEZENFx1NTZERVx1RkYwOVx1MzAwMiAqL1xyXG5pbnRlcmZhY2UgUGxhbkNvbmZpcm1TdGVwIHtcclxuICBpZDogc3RyaW5nXHJcbiAgdGl0bGU6IHN0cmluZ1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcclxuICB0YXJnZXRGaWxlczogc3RyaW5nW11cclxuICByb2xlOiBzdHJpbmdcclxuICBhY2NlcHRhbmNlOiBzdHJpbmdcclxuICBmYWlsdXJlUG9saWN5OiBzdHJpbmdcclxuICBlbmFibGVkOiBib29sZWFuXHJcbiAgbW9kZWxQcm92aWRlcjogc3RyaW5nXHJcbiAgbW9kZWxJZDogc3RyaW5nXHJcbn1cclxuXHJcbi8qKiBQT1NUIC9wZWVrIFx1NzY4NFx1OEY3RFx1ODM3N1x1RkYwOFx1NEVFM1x1NzgwMVx1NEUwQVx1NEUwQlx1NjU4N1x1NkQ2RVx1NUM0Mlx1RkYwOVx1MzAwMiAqL1xyXG5pbnRlcmZhY2UgUGVla1BheWxvYWQge1xyXG4gIGV4aXN0czogYm9vbGVhblxyXG4gIHBhdGg/OiBzdHJpbmdcclxuICBzdGFydExpbmU/OiBudW1iZXJcclxuICBlbmRMaW5lPzogbnVtYmVyXHJcbiAgdG90YWxMaW5lcz86IG51bWJlclxyXG4gIGxpbmVzPzogQXJyYXk8eyBuOiBudW1iZXI7IHRleHQ6IHN0cmluZyB9PlxyXG59XHJcblxyXG4vKiogXHU0RUNFXHU4MUVBXHU3NTMxXHU2NTg3XHU2NzJDXHU0RTJEXHU4QkM2XHU1MjJCIGZpbGU6bGluZSBcdTVGMTVcdTc1MjhcdUZGMDhcdTU0MkIgZmlsZTpsaW5lLWxpbmUgXHU1MzNBXHU5NUY0XHU1M0Q2XHU4RDc3XHU1OUNCXHU4ODRDXHVGRjA5XHUzMDAyICovXHJcbmNvbnN0IEZJTEVfTElORV9QQVRURVJOID0gLygoPzpbXFx3Li1dK1svXFxcXF0pKltcXHcuLV0rXFwuW0EtWmEtel17MSw0fSk6KFxcZHsxLDV9KSg/Oi1cXGR7MSw1fSk/L2dcclxuXHJcbi8qKiBHRVQgL3J1bnMvZGV0YWlsIFx1NzY4NFx1OEY3RFx1ODM3N1x1MzAwMiAqL1xyXG5pbnRlcmZhY2UgUnVuRGV0YWlsIHtcclxuICBydW46IHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgY2hhbmdlVGl0bGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IHBhdXNlUG9pbnQ6IHsgc3RlcElkOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nOyBhdDogbnVtYmVyIH0gfCBudWxsOyBlcnJvcjogeyBtZXNzYWdlOiBzdHJpbmcgfSB8IG51bGw7IHN0YXJ0ZWRBdDogbnVtYmVyIHwgbnVsbDsgZmluaXNoZWRBdDogbnVtYmVyIHwgbnVsbCB9XHJcbiAgc3RlcHM6IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgcm9sZTogc3RyaW5nOyBtb2RlbDogc3RyaW5nIHwgbnVsbDsgc3RhdHVzOiBzdHJpbmc7IGF0dGVtcHRzQ291bnQ6IG51bWJlcjsgY2xhaW1lZE91dGNvbWU6IHN0cmluZyB8IG51bGw7IHZlcmlmaWVkOiBib29sZWFuOyBjb3N0VXNkOiBudW1iZXIgfT5cclxuICBjb250ZXh0OiB7XHJcbiAgICBwcm9qZWN0RGlnZXN0OiBzdHJpbmc7IGJyYW5jaDogc3RyaW5nIHwgbnVsbDsgaGVhZFNoYTogc3RyaW5nIHwgbnVsbFxyXG4gICAgaW5qZWN0ZWRNZW1vcmllczogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nIH0+XHJcbiAgICBzdGVwU3VtbWFyaWVzOiBBcnJheTx7IHN0ZXBUaXRsZTogc3RyaW5nOyBzdW1tYXJ5OiBzdHJpbmc7IGNoYW5nZWRGaWxlczogc3RyaW5nW107IGF0OiBudW1iZXIgfT5cclxuICAgIGRlY2lzaW9uTG9nOiBBcnJheTx7IGtpbmQ6IHN0cmluZzsgZGV0YWlsOiBzdHJpbmc7IGF0OiBudW1iZXIgfT5cclxuICB9IHwgbnVsbFxyXG59XHJcblxyXG4vKiogR0VUIC9zY2hlZHVsZWQgXHU3Njg0XHU0RUZCXHU1MkExXHU2NzYxXHU3NkVFXHUzMDAyICovXHJcbmludGVyZmFjZSBTY2hlZHVsZWRUYXNrRW50cnkge1xyXG4gIGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nXHJcbiAgaW50ZXJ2YWxNaW51dGVzOiBudW1iZXI7IGVuYWJsZWQ6IGJvb2xlYW47IGxhc3RSdW5BdDogbnVtYmVyIHwgbnVsbDsgbGFzdFJlc3VsdDogc3RyaW5nOyBuZXh0RHVlQXQ6IG51bWJlclxyXG59XHJcblxyXG4vKiogR0VUIC9tZW1vcmllcyBcdTc2ODRcdThCQjBcdTVGQzZcdTY3NjFcdTc2RUVcdUZGMDhcdThCQjBcdTVGQzZcdTk3NjJcdTY3N0ZcdTY1NzBcdTYzNkVcdTZFOTBcdUZGMDlcdTMwMDIgKi9cclxuaW50ZXJmYWNlIE1lbW9yeUVudHJ5IHtcclxuICBpZDogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZzsgcmVsYXRlZEZpbGVzOiBzdHJpbmdbXVxyXG4gIGlzSHVtYW5Db25maXJtZWQ6IGJvb2xlYW47IGdpdEJyYW5jaDogc3RyaW5nIHwgbnVsbDsgc2NvcGU6IHN0cmluZzsgc291cmNlVGFnOiBzdHJpbmdcclxuICBiYXNpc1NoYTogc3RyaW5nIHwgbnVsbDsgc3RhdHVzOiBzdHJpbmc7IGxhc3RWZXJpZmllZFNoYTogc3RyaW5nIHwgbnVsbFxyXG4gIGNyZWF0ZWRBdDogbnVtYmVyOyB1cGRhdGVkQXQ6IG51bWJlclxyXG59XHJcblxyXG5pbnRlcmZhY2UgTWVtb3JpZXNQYXlsb2FkIHtcclxuICBtZW1vcmllczogTWVtb3J5RW50cnlbXVxyXG4gIGJyYW5jaDogc3RyaW5nIHwgbnVsbFxyXG4gIGhlYWRTaGE6IHN0cmluZyB8IG51bGxcclxuICBiYXNlbGluZTogeyBzaGE6IHN0cmluZyB8IG51bGw7IHVwZGF0ZWRBdDogbnVtYmVyIH0gfCBudWxsXHJcbiAgYmVoaW5kQ291bnQ6IG51bWJlclxyXG59XHJcblxyXG4vKiogUE9TVCAvbWVtb3J5L3N5bmMgXHU3Njg0XHU1NDBDXHU2QjY1XHU2MkE1XHU1NDRBXHUzMDAyICovXHJcbmludGVyZmFjZSBTeW5jUmVwb3J0IHtcclxuICBvazogYm9vbGVhblxyXG4gIGVycm9yPzogc3RyaW5nXHJcbiAgYmVoaW5kQ291bnQ/OiBudW1iZXJcclxuICBzdGFsZVByb3Bvc2Fscz86IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgcmVhc29uOiBzdHJpbmcgfT5cclxuICByZW5ld2VkPzogbnVtYmVyXHJcbiAgbmV3Q2FuZGlkYXRlcz86IEFycmF5PHsgdHlwZTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmcgfT5cclxuICB2ZXJkaWN0Pzogc3RyaW5nXHJcbn1cclxuXHJcbi8qKiBcdThCQzRcdTVCQTFcdTk1RUVcdTk4OThcdTcyQjZcdTYwMDEgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xyXG5jb25zdCBJU1NVRV9TVEFUVVNfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gIG9wZW46ICdcdTVGODVcdTU5MDRcdTc0MDYnLFxyXG4gIGZpeGluZzogJ1x1NEZFRVx1NTkwRFx1NEUyRCcsXHJcbiAgcmVzb2x2ZWQ6ICdcdTVERjJcdTg5RTNcdTUxQjMnLFxyXG4gIGFjY2VwdGVkOiAnXHU1REYyXHU1OTA0XHU3NDA2JyxcclxuICByZWplY3RlZDogJ1x1OEJFRlx1NjJBNS9cdTkxQ0RcdTU5MEQnLFxyXG59XHJcblxyXG4vKiogXHU4QkIwXHU1RkM2XHU3QzdCXHU1NzhCIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cclxuY29uc3QgTUVNT1JZX1RZUEVfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gIGFyY2hpdGVjdHVyZV9kZWNpc2lvbjogJ1x1NjdCNlx1Njc4NFx1NTFCM1x1N0I1NicsIHBhdHRlcm5fcnVsZTogJ1x1NkEyMVx1NUYwRlx1ODlDNFx1NTIxOScsIHJpc2tfaG90c3BvdDogJ1x1OThDRVx1OTY2OVx1NzBFRFx1NzBCOScsXHJcbiAgbGVhcm5lZF9jb25jZXB0OiAnXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1JywgdXNlcl9wcm9maWxlOiAnXHU3NTI4XHU2MjM3XHU1MDRGXHU1OTdEJywgcHJvamVjdF9sb2c6ICdcdTk4NzlcdTc2RUVcdTY1RTVcdTVGRDcnLCBkYWlseV9sb2c6ICdcdTY1RTVcdTVGRDcnLFxyXG59XHJcblxyXG4vKiogXHU4QkIwXHU1RkM2XHU2NzY1XHU2RTkwIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cclxuY29uc3QgTUVNT1JZX1NPVVJDRV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgcnVuOiAnXHU2MjY3XHU4ODRDXHU2M0QwXHU3MEJDJywgcmV2aWV3OiAnXHU2ODM4XHU2N0U1XHU2Qzg5XHU2REMwJywgc3luYzogJ1x1NjJDOVx1NTNENlx1NTQwQ1x1NkI2NScsIGNoYXQ6ICdBSSBcdThCQjBcdTVGNTUnLCBtYW51YWw6ICdcdTYyNEJcdTUyQTgnLFxyXG59XHJcblxyXG4vKiogXHU3RjE2XHU2MzkyXHU4OUQyXHU4MjcyIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cclxuY29uc3QgUk9MRV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgYW5hbHlzaXM6ICdcdTUyMDZcdTY3OTAnLCBwbGFubmluZzogJ1x1ODlDNFx1NTIxMicsIGNvZGluZzogJ1x1NUYwMFx1NTNEMScsIG9wczogJ1x1N0I4MFx1NTM1NVx1NjRDRFx1NEY1QycsIHZlcmlmaWNhdGlvbjogJ1x1OUE4Q1x1NjUzNicsXHJcbn1cclxuXHJcbi8qKiBcdTZCNjVcdTlBQTRcdTU5MzFcdThEMjVcdTdCNTZcdTc1NjUgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xyXG5jb25zdCBQT0xJQ1lfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICdyZXRyeS1lc2NhbGF0ZSc6ICdcdTkxQ0RcdThCRDVcdTVFNzZcdTUzNDdcdTdFQTdcdTZBMjFcdTU3OEInLCAncmV0cnktZmFsbGJhY2snOiAnXHU5MUNEXHU4QkQ1Jywgc2tpcDogJ1x1NTkzMVx1OEQyNVx1NTIxOVx1OERGM1x1OEZDNycsIGFzazogJ1x1NTkzMVx1OEQyNVx1NTIxOVx1NjY4Mlx1NTA1Q1x1OTVFRVx1NEVCQScsXHJcbn1cclxuXHJcbi8qKiBSdW4gXHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cclxuY29uc3QgUlVOX1NUQVRVU19MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgcXVldWVkOiAnXHU2MzkyXHU5NjFGXHU0RTJEJywgcnVubmluZzogJ1x1OEZEMFx1ODg0Q1x1NEUyRCcsIHBhdXNlZDogJ1x1NURGMlx1NjY4Mlx1NTA1QycsIGJsb2NrZWQ6ICdcdTk2M0JcdTU4NUUnLCByZXRyeWluZzogJ1x1OTFDRFx1OEJENVx1NEUyRCcsXHJcbiAgdmVyaWZ5aW5nOiAnXHU2NTM2XHU1QzNFXHU5QThDXHU2NTM2XHU0RTJEJywgc3VjY2VlZGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgY29tcGxldGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgZmFpbGVkOiAnXHU1OTMxXHU4RDI1JywgY2FuY2VsbGVkOiAnXHU1REYyXHU1M0Q2XHU2RDg4JywgaW50ZXJydXB0ZWQ6ICdcdTVERjJcdTRFMkRcdTY1QUQnLFxyXG59XHJcblxyXG4vKiogXHU2QjY1XHU5QUE0XHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cclxuY29uc3QgU1RFUF9TVEFUVVNfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gIHBlbmRpbmc6ICdcdTVGODVcdTYyNjdcdTg4NEMnLCByZWFkeTogJ1x1NUMzMVx1N0VFQScsIHJ1bm5pbmc6ICdcdTYyNjdcdTg4NENcdTRFMkQnLCBwYXVzZWQ6ICdcdTY2ODJcdTUwNUMnLCByZXRyeWluZzogJ1x1OTFDRFx1OEJENVx1NEUyRCcsXHJcbiAgc3VjY2VlZGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgZmFpbGVkOiAnXHU1OTMxXHU4RDI1Jywgc2tpcHBlZDogJ1x1NURGMlx1OERGM1x1OEZDNycsIGJsb2NrZWQ6ICdcdTk2M0JcdTU4NUUnLCBjYW5jZWxsZWQ6ICdcdTVERjJcdTUzRDZcdTZEODgnLCBpbnRlcnJ1cHRlZDogJ1x1NURGMlx1NEUyRFx1NjVBRCcsXHJcbn1cclxuXHJcbi8qKiBcdThCQzRcdTVCQTFcdTk1RUVcdTk4OThcdTRFMjVcdTkxQ0RcdTVFQTYgXHUyMTkyIFx1NUZCRFx1N0FFMFx1NUU5NVx1ODI3Mlx1MzAwMiAqL1xyXG5mdW5jdGlvbiBzZXZlcml0eUNvbG9yKHNldmVyaXR5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGlmIChzZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBzZXZlcml0eSA9PT0gJ2Jsb2NrZXInKSByZXR1cm4gJyNjZTkxNzgnXHJcbiAgaWYgKHNldmVyaXR5ID09PSAnbWFqb3InKSByZXR1cm4gJyNkN2JhN2QnXHJcbiAgaWYgKHNldmVyaXR5ID09PSAnaW5mbycpIHJldHVybiAnIzZiOGI4YidcclxuICByZXR1cm4gJyM1NjljZDYnXHJcbn1cclxuXHJcbi8qKiBcdTRFMjVcdTkxQ0RcdTVFQTZcdTVGNTJcdTRFMDBcdUZGMDhcdTUxN0NcdTVCQjlcdTUzODZcdTUzRjJcdThCQjBcdTVGNTVcdTkxQ0NcdTc2ODQgaGlnaC9tZWRpdW0vbG93XHVGRjFCXHU2NzJBXHU3N0U1XHU1NkRFXHU4NDNEIG1pbm9yXHVGRjA5XHVGRjBDXHU3RURGXHU4QkExL1x1N0I1Qlx1OTAwOS9cdTc3NDBcdTgyNzJcdTUxNzFcdTc1MjhcdTMwMDIgKi9cclxuZnVuY3Rpb24gbm9ybWFsaXplSXNzdWVTZXZlcml0eShzZXZlcml0eTogc3RyaW5nKTogc3RyaW5nIHtcclxuICBpZiAoc2V2ZXJpdHkgPT09ICdoaWdoJykgcmV0dXJuICdtYWpvcidcclxuICBpZiAoc2V2ZXJpdHkgPT09ICdtZWRpdW0nIHx8IHNldmVyaXR5ID09PSAnbG93JykgcmV0dXJuICdtaW5vcidcclxuICByZXR1cm4gc2V2ZXJpdHkgPT09ICdibG9ja2VyJyB8fCBzZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBzZXZlcml0eSA9PT0gJ21ham9yJyB8fCBzZXZlcml0eSA9PT0gJ21pbm9yJyB8fCBzZXZlcml0eSA9PT0gJ2luZm8nXHJcbiAgICA/IHNldmVyaXR5IDogJ21pbm9yJ1xyXG59XHJcblxyXG4vLyBcdTRFM0JcdTk4OThcdTVCRjlcdTZCRDRcdTVFQTZcdTVGMTVcdTY0Q0VcdUZGMDhwYXJzZUNvbG9yIC8gcmVsYXRpdmVMdW1pbmFuY2UgLyBkYXJrZW4vbGlnaHRlbiAvIHRoZW1lQXdhcmVUZXh0XHVGRjA5XHJcbi8vIFx1NURGMlx1NjJCRFx1NTNENlx1NTIzMCAuL3RoZW1lLnRzIFx1N0VERlx1NEUwMFx1N0VGNFx1NjJBNFx1MzAwMlx1NTE2OFx1NjU4N1x1NEVGNlx1NEUwRFx1NTNEOFx1NUYwRlx1RkYxQVxyXG4vLyAxKSBcdTVGM0FcdThDMDNcdTgyNzJcdTY1ODdcdTVCNTdcdTVGQzVcdTk4N0JcdTdFQ0YgdGhlbWVBd2FyZVRleHRcdUZGMDhcdTZFMzJcdTY3RDNcdTY3MUZcdThDMDNcdTc1MjhcdUZGMDlcdUZGMUJcclxuLy8gMikgYWN0aXZlIFx1OUFEOFx1NEVBRVx1ODBDQ1x1NjY2Rlx1NEUwMFx1NUY4QiBidXR0b24taW5mby1maWxsXHVGRjBDXHU3OTgxXHU2QjYyIGJyYW5kLXByaW1hcnkgXHU0RjVDXHU4MENDXHU2NjZGXHJcbi8vICAgIFx1RkYwOFx1NkRGMVx1ODI3Mlx1NEUzQlx1OTg5OFx1NEUwQlx1OEZEMVx1NzY3RFx1RkYwQ1x1OTE0RFx1NzY3RFx1NUI1N1x1NEUwRFx1NTNFRlx1ODlDMVx1MjAxNFx1MjAxNFx1MzAwQ1x1OTg3NVx1N0I3RVx1NzY3RFx1NTc1N1x1MzAwRFx1NEU4Qlx1NjU0NVx1NjgzOVx1NTZFMFx1RkYwOVx1MzAwMlxyXG5cclxuLyoqIFx1OEJDNFx1NUJBMVx1NzZFRVx1NjgwN1x1RkYwOGNoYW5nZUlkXHVGRjA5XHUyMTkyIFx1NTNFRlx1OEJGQlx1NjgwN1x1N0I3RVx1RkYxQVx1NTQwOFx1NjIxMCByZXZpZXc6PHNoYT4gXHU2MzA3XHU1NDExXHU2M0QwXHU0RUE0XHVGRjBDY2hnXyogXHU2MzA3XHU1NDExXHU1M0Q4XHU2NkY0XHVGRjBDYWRob2MgXHU0RTNBXHU1REU1XHU0RjVDXHU1MzNBXHUzMDAyICovXHJcbmZ1bmN0aW9uIGlzc3VlVGFyZ2V0TGFiZWwoY2hhbmdlSWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgY29uc3QgaWQgPSB0eXBlb2YgY2hhbmdlSWQgPT09ICdzdHJpbmcnID8gY2hhbmdlSWQgOiAnJ1xyXG4gIGlmIChpZC5zdGFydHNXaXRoKCdyZXZpZXc6JykpIHJldHVybiBgXHU2M0QwXHU0RUE0ICR7aWQuc2xpY2UoNywgMTUpfWBcclxuICBpZiAoaWQgPT09ICdhZGhvYycpIHJldHVybiAnXHU1REU1XHU0RjVDXHU1MzNBJ1xyXG4gIHJldHVybiBgXHU1M0Q4XHU2NkY0ICR7aWQuc2xpY2UoMCwgMTEpfWBcclxufVxyXG5cclxuLyoqIFx1NjAzQlx1N0VEMy9cdTdFRDNcdTY3ODRcdTUzMTZcdTdCMTRcdThCQjBcdTc2ODRcdThGN0JcdTkxQ0YgTWFya2Rvd24gXHU2RTMyXHU2N0QzXHVGRjFBXHUzMDBDIyMgXHUzMDBEXHU4MjgyXHU2ODA3XHU5ODk4XHU3NzQwXHU4MjcyXHU1MkEwXHU3Qzk3XHVGRjBDXHUzMDBDLSBcdTMwMERcdTUyMTdcdTg4NjhcdTUyQTBcdTU3MDZcdTcwQjlcdUZGMENcdTUxNzZcdTRGNTlcdTUzOUZcdTY4MzdcdTMwMDIgKi9cclxuZnVuY3Rpb24gcmVuZGVyU3RydWN0dXJlZENvbnRlbnQoY29udGVudDogc3RyaW5nKTogUmVhY3QuUmVhY3ROb2RlW10ge1xyXG4gIGlmICh0eXBlb2YgY29udGVudCAhPT0gJ3N0cmluZycgfHwgY29udGVudCA9PT0gJycpIHJldHVybiBbXVxyXG4gIHJldHVybiBjb250ZW50LnNwbGl0KCdcXG4nKS5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XHJcbiAgICBpZiAobGluZS5zdGFydHNXaXRoKCcjIyAnKSkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEyLjVweCcsIG1hcmdpblRvcDogaW5kZXggPT09IDAgPyAwIDogMTAsIG1hcmdpbkJvdHRvbTogMiwgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19PlxyXG4gICAgICAgICAge2xpbmUuc2xpY2UoMyl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIClcclxuICAgIH1cclxuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJy0gJykpIHtcclxuICAgICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3sgcGFkZGluZ0xlZnQ6IDE0LCB0ZXh0SW5kZW50OiAtMTAgfX0+XHUyMDIyIHtyZW5kZXJXaXRoUGVlayhsaW5lLnNsaWNlKDIpKX08L2Rpdj5cclxuICAgIH1cclxuICAgIHJldHVybiA8ZGl2IGtleT17aW5kZXh9PntsaW5lID09PSAnJyA/ICdcXHUwMEEwJyA6IHJlbmRlcldpdGhQZWVrKGxpbmUpfTwvZGl2PlxyXG4gIH0pXHJcbn1cclxuXHJcbi8qKiBwZWVrIFx1NzBCOVx1NTFGQlx1NTZERVx1OEMwM1x1RkYxQVx1NzUzMSBXb3Jrc3BhY2VGcmFtZSBcdTZDRThcdTUxNjVcdUZGMDhcdTZFMzJcdTY3RDNcdTU2NjhcdTRGRERcdTYzMDFcdTZBMjFcdTU3NTdcdTdFQTdcdTdFQUZcdTUxRkRcdTY1NzBcdUZGMDlcdTMwMDIgKi9cclxubGV0IHBlZWtPcGVuZXI6ICgocGF0aDogc3RyaW5nLCBsaW5lOiBudW1iZXIpID0+IHZvaWQpIHwgdW5kZWZpbmVkXHJcblxyXG4vKiogXHU2MjhBXHU2NTg3XHU2NzJDXHU0RTJEXHU3Njg0IGZpbGU6bGluZSBcdTVGMTVcdTc1MjhcdTZFMzJcdTY3RDNcdTRFM0FcdTUzRUZcdTcwQjlcdTUxRkJcdTgyQUZcdTcyNDdcdUZGMDhcdTcwQjlcdTUxRkJcdTVGMzlcdTUxRkFcdTRFRTNcdTc4MDFcdTRFMEFcdTRFMEJcdTY1ODdcdUZGMDlcdTMwMDIgKi9cclxuZnVuY3Rpb24gcmVuZGVyV2l0aFBlZWsodGV4dDogc3RyaW5nKTogUmVhY3QuUmVhY3ROb2RlIHtcclxuICBjb25zdCBub2RlczogUmVhY3QuUmVhY3ROb2RlW10gPSBbXVxyXG4gIGxldCBsYXN0ID0gMFxyXG4gIGxldCBtYXRjaDogUmVnRXhwRXhlY0FycmF5IHwgbnVsbFxyXG4gIEZJTEVfTElORV9QQVRURVJOLmxhc3RJbmRleCA9IDBcclxuICB3aGlsZSAoKG1hdGNoID0gRklMRV9MSU5FX1BBVFRFUk4uZXhlYyh0ZXh0KSkgIT09IG51bGwpIHtcclxuICAgIGlmIChtYXRjaC5pbmRleCA+IGxhc3QpIG5vZGVzLnB1c2godGV4dC5zbGljZShsYXN0LCBtYXRjaC5pbmRleCkpXHJcbiAgICBjb25zdCBbZnVsbCwgcGF0aCwgbGluZVN0cl0gPSBtYXRjaFxyXG4gICAgbm9kZXMucHVzaChcclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIGtleT17YCR7bWF0Y2guaW5kZXh9LSR7ZnVsbH1gfVxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLCBwYWRkaW5nOiAnMCAxcHgnLCBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgIGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknLFxyXG4gICAgICAgICAgZm9udFNpemU6ICdpbmhlcml0JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSBkb3R0ZWQnLFxyXG4gICAgICAgIH19XHJcbiAgICAgICAgdGl0bGU9XCJcdTcwQjlcdTUxRkJcdTY3RTVcdTc3MEJcdTRFRTNcdTc4MDFcdTRFMEFcdTRFMEJcdTY1ODdcIlxyXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHsgcGVla09wZW5lcj8uKHBhdGgsIE51bWJlcihsaW5lU3RyKSkgfX1cclxuICAgICAgPntmdWxsfTwvYnV0dG9uPixcclxuICAgIClcclxuICAgIGxhc3QgPSBtYXRjaC5pbmRleCArIGZ1bGwubGVuZ3RoXHJcbiAgfVxyXG4gIGlmIChsYXN0IDwgdGV4dC5sZW5ndGgpIG5vZGVzLnB1c2godGV4dC5zbGljZShsYXN0KSlcclxuICByZXR1cm4gbm9kZXMubGVuZ3RoID09PSAxID8gbm9kZXNbMF0gOiA8c3Bhbj57bm9kZXN9PC9zcGFuPlxyXG59XHJcblxyXG4vKipcclxuICogXHU4OUM2XHU4OUM5XHU2MzYyXHU1MjE3XHU2ODM3XHU1RjBGXHU4ODY4XHVGRjFBXHU5NjhGXHU2NzJDXHU3RUM0XHU0RUY2XHU2MzAyXHU4RjdEL1x1NTM3OFx1OEY3RFx1RkYwOFx1NTM3OFx1OEY3RFx1NTM3M1x1NUI4Q1x1NTE2OFx1NjA2Mlx1NTkwRFx1NTM5Rlx1NzUxRlx1NUUwM1x1NUM0MFx1RkYwOVx1MzAwMlxyXG4gKiBcdTYzNjJcdTUyMTdcdTY2MkZcdTY1RTBcdTY3NjFcdTRFRjZcdTc2ODRcdUZGMDhcdTU0MkJcdTY1QjBcdTRGMUFcdThCRERcdTg0M0RcdTU3MzBcdTk4NzVcdUZGMDlcdTIwMTRcdTIwMTRcdTRFMUFcdTRFM0JcdTg5QzRcdTUyMTlcdUZGMUFcdTVERTVcdTRGNUNcdTUzRjBcdTg5ODFcdTRFNDhcdTRFMERcdTY2M0VcdTc5M0FcdTMwMDFcdTg5ODFcdTRFNDhcdTVDNDVcdTRFMkRcdUZGMENcclxuICogXHU1M0YzXHU0RkE3XHU1M0VBXHU1MTQxXHU4QkI4XHU4MDRBXHU1OTI5XHUzMDAyMC4xLjIgXHU2NUIwXHU0RjFBXHU4QkREXHU5ODc1XHU0RTVGXHU1RTI2IGRhdGEtZGV0YWlscy1jb2xsYXBzZWRcdUZGMENcdTY2RkVcdTU2RTBcdTVCRjlcdTVCODNcdThDNDFcdTUxNERcclxuICogXHU2MzYyXHU1MjE3XHU1QkZDXHU4MUY0XHU1REU1XHU0RjVDXHU1M0YwXHU1NzI4XHU2NUIwXHU0RjFBXHU4QkREXHU0RTBCXHU5MDAwXHU1NkRFXHU1MzlGXHU3NTFGXHU1M0YzXHU0RjREXHVGRjA4MjAyNi0wOS0xMCBcdTRGRUVcdTU5MERcdUZGMDlcdTMwMDJcclxuICogXHU2Q0U4XHU2MTBGXHVGRjFBXHU3OTgxXHU2QjYyXHU3NTI4IDpoYXMoKSBcdTUwNUFcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdTIwMTRcdTIwMTRcdTVCOThcdTY1QjlcdTY3ODRcdTVFRkFcdTRFQTdcdTcyNjlcdTUxRTBcdTUzNDFcdTRFMkFcdTdFQzRcdTRFRjZcdTY4MzlcdTdDN0JcdTkwRkRcdTUzRUIgcm9vdFx1RkYwQ1xyXG4gKiBcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdTRGMUFcdTYyOEFcdTY1NzRcdTRFMkFcdTgwNEFcdTU5MjlcdTVCQjlcdTU2NjhcdThCRUZcdTk0QjNcdTUyMzZcdUZGMDhcdTUzODZcdTUzRjJcdTRFOEJcdTY1NDVcdUZGMDlcdTMwMDJcdTZCNjRcdTg4NjhcdTUzRUFcdTRGRERcdTc1NTlcdTdGNTFcdTY4M0NcdTYzNjJcdTUyMTdcdTRFMEVcdTYyRDZcdTYyRkRcdTY3QzRcdTk2OTBcdTg1Q0ZcdTMwMDJcclxuICovXHJcbmNvbnN0IExBWU9VVF9TVFlMRSA9IGBcclxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA+IGRpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0geyBvcmRlcjogMzsgfVxyXG5kaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdID4gZGl2W2NsYXNzKj1cImRldGFpbHNDb2xcIl0geyBvcmRlcjogMjsgfVxyXG5kaXZbY2xhc3MqPVwiaGFuZGxlXCJdW2RhdGEtc2lkZT1cImRldGFpbHNcIl0geyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH1cclxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSB7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIG1pbm1heCgwLCAxZnIpIHZhcigtLXBjLWNoYXQtdywgMzYwcHgpICFpbXBvcnRhbnQ7XHJcbn1cclxuYFxyXG5cclxuLyoqXHJcbiAqIFx1NEYxQVx1OEJERFx1N0VERlx1OEJBMVx1ODg0Q1x1NzY4NFx1NEUyNFx1ODg0Q1x1OTRCM1x1NTIzNlx1RkYwOFx1NzUyOFx1NjIzN1x1NjMwN1x1NUI5QVx1NzY4NFx1NjgzN1x1NUYwRlx1RkYwOVx1MzAwMlx1NEUwRFx1ODBGRFx1OEQ3MCBDU1MgXHU5MDA5XHU2MkU5XHU1NjY4XHVGRjFBXHJcbiAqIFx1NUI5OFx1NjVCOVx1NTkxQVx1NEUyQVx1NkEyMVx1NTc1N1x1NzY4NFx1NjgzOVx1N0M3Qlx1OTBGRFx1NTNFQiBgcm9vdGBcdUZGMDhcdTY3ODRcdTVFRkFcdTU0MEVcdTY2MkYgYGhhc2hfcm9vdGBcdUZGMDlcdUZGMENcdTUxNzZcdTRFMkRcclxuICogQ29udmVyc2F0aW9uUm9vdCBcdTc2ODRcdTVCNTBcdTY4MTFcdTkxQ0NcdTVDMzFcdTUzMDVcdTU0MkJcdTdFREZcdThCQTFcdTg4NENcdTc2ODQgYGhhc2hfc2VwYCBcdTUyMDZcdTk2OTQgc3Bhblx1MjAxNFx1MjAxNFxyXG4gKiBcdTRFRkJcdTRGNTVcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdUZGMDhcdTU0MkIgOmhhcygpXHVGRjA5XHU5MEZEXHU0RjFBXHU2MjhBXHU2NTc0XHU0RTJBXHU4MDRBXHU1OTI5XHU1QkI5XHU1NjY4XHU5NEIzXHU2MjEwXHU0RTI0XHU4ODRDXHVGRjBDXHU2NzQwXHU2QjdCXHU2RURBXHU1MkE4XHUzMDAyXHJcbiAqIFx1NTZFMFx1NkI2NFx1NTcyOFx1OEZEMFx1ODg0Q1x1NjVGNlx1NjMwOVx1NTUyRlx1NEUwMFx1NUY2Mlx1NzJCNlx1NUI5QVx1NEY0RFx1RkYxQVx1NUM0NVx1NEUyRFx1NjM5Mlx1NzI0OCArIFx1NzZGNFx1NjNBNVx1NUI1MFx1NEVFM1x1NTQyQlx1NjU4N1x1NjcyQyBcInxcIiBcdTc2ODRcclxuICogXHU1MjA2XHU5Njk0IHNwYW5cdUZGMENcdTU0N0RcdTRFMkRcdTU0MEVcdTYyOEFcdTVCOThcdTY1QjlcdTdDN0JcdTU0MERcdTUzOUZcdTY4MzdcdTUxOTlcdThGREJcdTY4MzdcdTVGMEZcdTg4NjhcdUZGMDhcdTdDQkVcdTUxQzZcdTUyMzBcdTY3ODRcdTVFRkFcdTU0QzhcdTVFMENcdUZGMDlcdTMwMDJcclxuICogQHJldHVybnMgXHU2Q0U4XHU1MTY1XHU3Njg0IHN0eWxlIFx1NTE0M1x1N0QyMFx1RkYxQlx1NUI5OFx1NjVCOVx1NjcyQVx1NkUzMlx1NjdEM1x1N0VERlx1OEJBMVx1ODg0Q1x1NjVGNlx1NEUzQSB1bmRlZmluZWRcdTMwMDJcclxuICovXHJcbmNvbnN0IGFwcGx5U3RhdHNMaW5lQ2xhbXAgPSAoKTogSFRNTFN0eWxlRWxlbWVudCB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgY29uc3Qgc2VwU3BhbiA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MU3BhbkVsZW1lbnQ+KCdkaXZbY2xhc3MqPVwiX3Jvb3RcIl0gPiBzcGFuW2NsYXNzKj1cIl9zZXBcIl0nKSlcclxuICAgIC5maW5kKChzcGFuKSA9PiBzcGFuLnRleHRDb250ZW50ID09PSAnfCcpXHJcbiAgY29uc3Qgcm9vdERpdiA9IHNlcFNwYW4/LnBhcmVudEVsZW1lbnRcclxuICBjb25zdCBoYXNoQ2xhc3MgPSByb290RGl2Py5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5maW5kKChuYW1lKSA9PiBuYW1lLmVuZHNXaXRoKCdfcm9vdCcpKVxyXG4gIGlmIChyb290RGl2ID09PSB1bmRlZmluZWQgfHwgcm9vdERpdiA9PT0gbnVsbCB8fCBoYXNoQ2xhc3MgPT09IHVuZGVmaW5lZCB8fCBnZXRDb21wdXRlZFN0eWxlKHJvb3REaXYpLnRleHRBbGlnbiAhPT0gJ2NlbnRlcicpIHJldHVybiB1bmRlZmluZWRcclxuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcclxuICBzdHlsZS5pZCA9ICdwYy1zdGF0cy1jbGFtcCdcclxuICBzdHlsZS50ZXh0Q29udGVudCA9IGBcclxuZGl2W2NsYXNzPVwiJHtoYXNoQ2xhc3N9XCJdIHtcclxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcclxuICAtd2Via2l0LWxpbmUtY2xhbXA6IDI7XHJcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XHJcbiAgdGV4dC1vdmVyZmxvdzogY2xpcDtcclxuICBmb250LXNpemU6IDExcHg7XHJcbiAgbGluZS1oZWlnaHQ6IDEuNTtcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbn1cclxuYFxyXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpXHJcbiAgcmV0dXJuIHN0eWxlXHJcbn1cclxuXHJcbnR5cGUgVGFiS2V5ID0gJ2NvbW1pdHMnIHwgJ292ZXJ2aWV3JyB8ICdleGVjdXRpb24nIHwgJ3JldmlldycgfCAnbm90ZXMnIHwgJ3NldHRpbmdzJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXb3Jrc3BhY2VGcmFtZVByb3BzIHtcclxuICAvKiogXHU1Qjk4XHU2NUI5IGRldGFpbHMgXHU2OUZEXHU1OTUxXHU3RUE2XHU3Njg0IGxvY2FsZSBcdTZDRThcdTUxNjVcdUZGMDhcdTYyMTFcdTRFRUNcdTZDRThcdTUxOENcdTc2ODQgcHJvamVjdC1jb250cm9sIFx1OEJDRFx1NTE3OFx1RkYwOVx1MzAwMiAqL1xyXG4gIHQ/OiAoa2V5OiBzdHJpbmcpID0+IHN0cmluZ1xyXG4gIC8qKiBcdTVGNTNcdTUyNERcdTRGMUFcdThCREQgaWRcdUZGMDhcdTVCOThcdTY1Qjkgc2Vzc2lvbiBcdTY4MDdcdTUxQzZcdTVDNUVcdTYwMjdcdUZGMUJcdTUyMDdcdTYzNjJcdTRGMUFcdThCRERcdTY1RjZcdTkxQ0RcdTY1QjBcdTY0OTFcdTVGMDBcdTVERTVcdTRGNUNcdTUzRjBcdThGNjhcdTkwNTNcdUZGMDlcdTMwMDIgKi9cclxuICBzZXNzaW9uSWQ/OiBzdHJpbmdcclxuICAvKiogXHU2NUIwXHU3MjQ4XHU1QkJGXHU0RTNCXHU3NTMxXHU1OTE2XHU1QzQyXHU1MkEwXHU2Q0Q1XHU2RDZFXHU1QzQyXHU3QkExXHU3NDA2XHU1RTAzXHU1QzQwXHVGRjBDXHU0RTBEXHU0RjdGXHU3NTI4XHU2NUU3XHU3MjQ4IGRldGFpbHMgXHU2MzYyXHU1MjE3XHUzMDAyICovXHJcbiAgbGF5b3V0TW9kZT86ICdsZWdhY3knIHwgJ292ZXJsYXknXHJcbn1cclxuXHJcbi8qKiBcdTVERTVcdTRGNUNcdTUzRjBcdTY1ODdcdTY4NDhcdThCQ0RcdTUxNzhcdUZGMDh6aCAvIGVuXHVGRjA5XHUzMDAyICovXHJcbmV4cG9ydCBjb25zdCBXT1JLU1BBQ0VfRElDVCA9IHtcclxuICB6aDoge1xyXG4gICAgJ3dvcmtzcGFjZS50aXRsZSc6ICdcdTk4NzlcdTc2RUVcdTY4MzhcdTY3RTVcdTUzRjAnLFxyXG4gICAgJ3dvcmtzcGFjZS5zZWxlY3RTZXNzaW9uJzogJ1x1OEJGN1x1NTE0OFx1NTcyOFx1NURFNlx1NEZBN1x1OTAwOVx1NjJFOVx1OTg3OVx1NzZFRVx1NEUwQlx1NzY4NFx1NEYxQVx1OEJERFx1RkYwQ1x1NURFNVx1NEY1Q1x1NTNGMFx1NjI0RFx1NEYxQVx1NjYzRVx1NzkzQVx1OEJFNVx1OTg3OVx1NzZFRVx1NzY4NFx1NjU3MFx1NjM2RVx1MzAwMicsXHJcbiAgICAndGFiLmNvbW1pdHMnOiAnXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1JyxcclxuICAgICd0YWIub3ZlcnZpZXcnOiAnXHU5ODc5XHU3NkVFXHU2MDNCXHU4OUM4JyxcclxuICAgICd0YWIuZXhlY3V0aW9uJzogJ1x1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDMycsXHJcbiAgICAndGFiLnJldmlldyc6ICdSZXZpZXcgXHU5NUVFXHU5ODk4JyxcclxuICAgICd0YWIubm90ZXMnOiAnXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2JyxcclxuICAgICd0YWIuc2V0dGluZ3MnOiAnXHU4QkJFXHU3RjZFJyxcclxuICAgICdlcnJvci5sb2FkJzogJ1x1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNScsXHJcbiAgICAnc3RhdGUucHJvamVjdCc6ICdcdTVGNTNcdTUyNERcdTk4NzlcdTc2RUUnLFxyXG4gICAgJ3N0YXRlLm5vUHJvamVjdCc6ICdcdTVDMUFcdTY3MkFcdTUyMURcdTU5Q0JcdTUzMTZcdTk4NzlcdTc2RUUnLFxyXG4gICAgJ3N0YXRlLm5vUHJvamVjdEhpbnQnOiAnXHU3MEI5XHU1MUZCXHUzMDBDXHU1MjFEXHU1OUNCXHU1MzE2XHU5ODc5XHU3NkVFXHUzMDBEXHU2MjZCXHU2M0NGXHU0RUQzXHU1RTkzXHU3RUQzXHU2Nzg0XHUzMDAxXHU2MjgwXHU2NzJGXHU2ODA4XHU0RTBFXHU3QjI2XHU1M0Y3XHU3RDIyXHU1RjE1XHUzMDAyJyxcclxuICAgICdhY3Rpb24uYm9vdHN0cmFwJzogJ1x1NTIxRFx1NTlDQlx1NTMxNlx1OTg3OVx1NzZFRScsXHJcbiAgICAnYWN0aW9uLnJlc2Nhbic6ICdcdTkxQ0RcdTY1QjBcdTUyMURcdTU5Q0JcdTUzMTYgLyBcdTYyNkJcdTYzQ0YnLFxyXG4gICAgJ2FjdGlvbi5hbmFseXplJzogJ1x1NTIwNlx1Njc5MFx1NUY1M1x1NTI0RFx1NjUzOVx1NTJBOCcsXHJcbiAgICAnYWN0aW9uLnJldmlldyc6ICdcdThCQzRcdTVCQTFcdTVGNTNcdTUyNERcdTY1MzlcdTUyQTgnLFxyXG4gICAgJ2FjdGlvbi52ZXJpZnknOiAnXHU5QThDXHU2NTM2XHU1RjUzXHU1MjREXHU2NTM5XHU1MkE4JyxcclxuICAgICdhY3Rpb24uY3JlYXRlQ2hhbmdlJzogJ1x1NjVCMFx1NUVGQVx1NTNEOFx1NjZGNCcsXHJcbiAgICAnYWN0aW9uLnJ1bm5pbmcnOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHUyMDI2JyxcclxuICAgICdhY3Rpb24ucmVmcmVzaCc6ICdcdTUyMzdcdTY1QjAnLFxyXG4gICAgJ2Zvcm0uY2hhbmdlVGl0bGUnOiAnXHU1M0Q4XHU2NkY0XHU2ODA3XHU5ODk4JyxcclxuICAgICdmb3JtLmNoYW5nZURlc2MnOiAnXHU5NzAwXHU2QzQyXHU0RTBFXHU4MENDXHU2NjZGXHVGRjA4XHU5MDA5XHU1ODZCXHVGRjA5JyxcclxuICAgICdyZXN1bHQucGFuZWwnOiAnXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDJyxcclxuXHJcbiAgICAncmVwby5zY2FuSGlzdG9yeSc6ICdcdTkxQ0RcdTVFRkFcdTUzODZcdTUzRjInLFxyXG4gICAgJ3JlcG8uY29tbWl0cyc6ICdcdTYzRDBcdTRFQTQnLFxyXG4gICAgJ3JlcG8uYnJhbmNoJzogJ1x1NTIwNlx1NjUyRicsXHJcbiAgICAncmVwby53b3JraW5nJzogJ1x1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOCcsXHJcbiAgICAncmVwby53b3JraW5nQ2xlYW4nOiAnXHU1REU1XHU0RjVDXHU1MzNBXHU1RTcyXHU1MUMwXHVGRjBDXHU2NUUwXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcclxuICAgICdyZXBvLmVtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1NjNEMFx1NEVBNFx1MzAwMicsXHJcbiAgICAncmVwby5sb2FkRmFpbGVkJzogJ1x1NjNEMFx1NEVBNFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNScsXHJcbiAgICAncGlja2VyLnRpdGxlJzogJ1x1OTAwOVx1NjJFOVx1ODk4MVx1NjgzOFx1NjdFNVx1NzY4NFx1NjNEMFx1NEVBNFx1RkYwOFx1NTNFRlx1NTkxQVx1OTAwOVx1RkYwOScsXHJcbiAgICAncGlja2VyLnBsYWNlaG9sZGVyJzogJ1x1NzBCOVx1NTFGQlx1OTAwOVx1NjJFOVx1NjNEMFx1NEVBNFx1RkYwOFx1NTNFRlx1NTkxQVx1OTAwOVx1RkYwQ1x1NTQyQlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOScsXHJcbiAgICAncGlja2VyLnNlbGVjdGVkJzogJ1x1NURGMlx1OTAwOScsXHJcbiAgICAncGlja2VyLmZpbHRlcic6ICdcdTYzMDlcdTY4MDdcdTk4OTgvXHU1NEM4XHU1RTBDL1x1NEY1Q1x1ODAwNVx1OEZDN1x1NkVFNFx1MjAyNicsXHJcbiAgICAncGlja2VyLmNsZWFyJzogJ1x1NkUwNVx1N0E3QScsXHJcbiAgICAncGlja2VyLm5vTWF0Y2gnOiAnXHU2NUUwXHU1MzM5XHU5MTREXHU2M0QwXHU0RUE0XHUzMDAyJyxcclxuICAgICdwaWNrZXIuaGludCc6ICdcdTUyRkVcdTkwMDlcdTYzRDBcdTRFQTRcdTU0MEVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTAgQUkgXHU4OUUzXHU4QkZCXHVGRjFCXHU0RTBCXHU2NUI5XHU1M0VGXHU1MThEXHU4REQxXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHU0RTBFXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHUzMDAyJyxcclxuICAgICdwaWNrZXIucm91bmQnOiAnXHU3QjJDIHtufSBcdThGNkUnLFxyXG4gICAgJ3BpY2tlci5yb3VuZExhdGVzdCc6ICdcdTdCMkMge259IFx1OEY2RVx1RkYwOFx1NjcwMFx1NjVCMFx1RkYwOScsXHJcbiAgICAncGlja2VyLnJvdW5kU2VsZWN0JzogJ1x1OTAwOVx1NjU3NFx1OEY2RScsXHJcbiAgICAncGlja2VyLnJvdW5kQ2xlYXInOiAnXHU1M0Q2XHU2RDg4XHU2NzJDXHU4RjZFJyxcclxuICAgICdwaWNrZXIudW5kaWdlc3RlZCc6ICdcdTRFMEFcdTZCMjEgQUkgXHU2MDNCXHU3RUQzXHU0RTRCXHU1NDBFXHUzMDAxXHU0RTE0XHU1QzFBXHU2NzJBXHU3NTFGXHU2MjEwXHU4RkM3IEFJIFx1ODlFM1x1OEJGQlx1NzY4NFx1NjVCMFx1NjNEMFx1NEVBNCcsXHJcbiAgICAncGlja2VyLnVuZGlnZXN0ZWRDb3VudCc6ICd7bn0gXHU0RTJBXHU2M0QwXHU0RUE0XHU2NzJBXHU2RDg4XHU1MzE2JyxcclxuICAgICdwaWNrZXIuc2VsZWN0QWxsVW5kaWdlc3RlZCc6ICdcdTUxNjhcdTkwMDlcdTY3MkFcdTZEODhcdTUzMTYnLFxyXG4gICAgJ3BpY2tlci5kaWdlc3RBbGwnOiAnXHU0RTAwXHU5NTJFXHU2RDg4XHU1MzE2JyxcclxuICAgICdwaWNrZXIuZGlnZXN0QWxsSGludCc6ICdcdTkwMDlcdTRFMkRcdTUxNjhcdTkwRThcdTY3MkFcdTZEODhcdTUzMTZcdTYzRDBcdTRFQTRcdTVFNzZcdTYyNzlcdTkxQ0YgQUkgXHU4OUUzXHU4QkZCXHVGRjA4XHU1RTc2XHU1M0QxIDNcdUZGMENcdTY3MDlcdTdGMTNcdTVCNThcdUZGMDlcdUZGMENcdTVCOENcdTYyMTBcdTU0MEVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdTY1NzRcdTRGNTNcdTUzRDlcdTRFOEJcdUZGMUJcdTRFNEJcdTU0MEVcdTUyMzBcdTMwMENcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzZcdTMwMERcdTc1MUZcdTYyMTBcdTVCNjZcdTRFNjBcdTYwM0JcdTdFRDNcdTUzNzNcdTUzRUZcdTkxQ0RcdTdGNkVcdTY3MkFcdTZEODhcdTUzMTZcdTY4MDdcdThCQjAnLFxyXG4gICAgJ25hcnJhdGl2ZS5kaWdlc3RIaW50JzogJ1x1NjU3NFx1NEY1M1x1NTNEOVx1NEU4Qlx1NURGMlx1NzUxRlx1NjIxMFx1MzAwMlx1NTIzMFx1MzAwQ1x1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNlx1MzAwRFx1OTg3NVx1NzUxRlx1NjIxMCBBSSBcdTVCNjZcdTRFNjBcdTYwM0JcdTdFRDNcdUZGMENcdTUzNzNcdTUzRUZcdTkxQ0RcdTdGNkVcdTMwMENcdTY3MkFcdTZEODhcdTUzMTZcdTMwMERcdTY4MDdcdThCQjBcdTMwMDInLFxyXG4gICAgJ2ltcGFjdC5mYWN0b3JzJzogJ1x1OThDRVx1OTY2OVx1Njc4NFx1NjIxMFx1RkYwOFx1NEUzQVx1NEVDMFx1NEU0OFx1NjYyRlx1OEZEOVx1NEUyQVx1N0I0OVx1N0VBN1x1RkYwOScsXHJcbiAgICAnaW1wYWN0LnBvaW50cyc6ICdcdTVGNzFcdTU0Q0RcdTcwQjlcdTY2MEVcdTdFQzYnLFxyXG4gICAgJ2ltcGFjdC5rZXlQb2ludHMnOiAnXHU1MTczXHU5NTJFXHU3RUM0XHU0RUY2JyxcclxuICAgICdpbXBhY3QubWVtb3J5JzogJ1x1N0VEM1x1NTQwOFx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNlx1NjgzOFx1NjdFNScsXHJcbiAgICAnaW1wYWN0LmZ1bmN0aW9ucyc6ICdcdTUzRDdcdTVGNzFcdTU0Q0RcdTUxRkRcdTY1NzBcdUZGMDhcdThDMDFcdThDMDNcdTc1MjhcdTRFODZcdTg4QUJcdTY1MzlcdTc2ODRcdTRFRTNcdTc4MDFcdUZGMDknLFxyXG4gICAgJ2ltcGFjdC5mdW5jUm9sZSc6ICdcdTUxRkRcdTY1NzBcdTUyOUZcdTgwRkQnLFxyXG4gICAgJ2ltcGFjdC5mdW5jQ2hhbmdlJzogJ1x1NjcyQ1x1NkIyMVx1NTNEOFx1NTMxNicsXHJcbiAgICAnaW1wYWN0LmZ1bmNDYWxsZXJzJzogJ1x1NUJGOVx1OEMwM1x1NzUyOFx1NjVCOVx1NzY4NFx1NUY3MVx1NTRDRCcsXHJcbiAgICAnY2FjaGUuaGl0JzogJ1x1Njc2NVx1ODFFQVx1N0YxM1x1NUI1OCcsXHJcbiAgICAnY2FjaGUucmVnZW5lcmF0ZSc6ICdcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTAnLFxyXG4gICAgJ2Nvc3QudG9vbHRpcCc6ICdcdTY3MkNcdTZCMjEgQUkgXHU4QzAzXHU3NTI4XHU2MjEwXHU2NzJDXHVGRjA4XHU0RjMwXHU3Qjk3XHVGRjBDXHU2MzA5IERlZXBTZWVrIFx1NEVGN1x1NzZFRVx1NjI5OFx1N0I5N1x1RkYwOScsXHJcbiAgICAnZXhlYy5jcmVhdGUnOiAnXHU2NUIwXHU1RUZBXHU2MjY3XHU4ODRDJyxcclxuICAgICdleGVjLmZvcm1UaXRsZSc6ICdcdTg5ODFcdTUwNUFcdTRFQzBcdTRFNDhcdUZGMDhcdTRFMDBcdTUzRTVcdThCRERcdUZGMDknLFxyXG4gICAgJ2V4ZWMuZm9ybURlc2MnOiAnXHU5NzAwXHU2QzQyXHU0RTBFXHU4MENDXHU2NjZGXHVGRjFBXHU3NkVFXHU2ODA3XHUzMDAxXHU2RDg5XHU1M0NBXHU2QTIxXHU1NzU3XHUzMDAxXHU5QThDXHU2NTM2XHU2ODA3XHU1MUM2JyxcclxuICAgICdleGVjLnN0YXJ0JzogJ1x1NUYwMFx1NTlDQlx1NjI2N1x1ODg0QycsXHJcbiAgICAnZXhlYy5zdGFydGluZyc6ICdcdTZCNjNcdTU3MjhcdTU0MkZcdTUyQThcdTIwMjYnLFxyXG4gICAgJ2V4ZWMuY3JlYXRlSGludCc6ICdcdTUyMUJcdTVFRkFcdTUzRDhcdTY2RjRcdTVFNzZcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdThCQTFcdTUyMTJcdUZGMENcdTk2OEZcdTU0MEVcdTc1MzEgQUkgXHU1QjUwXHU0RUUzXHU3NDA2XHU5MDEwXHU2QjY1XHU2MjY3XHU4ODRDXHVGRjFCXHU4RkRCXHU1RUE2XHU1NzI4XHU0RTBCXHU2NUI5XHU1QjlFXHU2NUY2XHU1MjM3XHU2NUIwXHVGRjBDXHU2NUUwXHU5NzAwXHU1M0JCXHU4MDRBXHU1OTI5XHUzMDAyJyxcclxuICAgICdleGVjLm1vZGVsRGVmYXVsdCc6ICdcdTYyNjdcdTg4NENcdTZBMjFcdTU3OEJcdUZGMDhcdTg5RDJcdTgyNzJcdTlFRDhcdThCQTRcdUZGMUFcdTUyMDZcdTY3OTAvXHU2NENEXHU0RjVDPVx1NUZFQlx1RkYwQ1x1NUYwMFx1NTNEMT1cdTY4MDdcdTUxQzZcdUZGMENcdTg5QzRcdTUyMTI9XHU2M0E4XHU3NDA2XHVGRjBDXHU5QThDXHU2NTM2PVx1OUE4Q1x1NjUzNlx1N0VBN1x1RkYwOScsXHJcbiAgICAnYmFkZ2UucnVubmluZyc6ICd7bn0gXHU0RTJBXHU0RUZCXHU1MkExXHU4RkQwXHU4ODRDXHU0RTJEXHVGRjBDXHU3MEI5XHU1MUZCXHU2N0U1XHU3NzBCJyxcclxuICAgICduYXJyYXRpdmUudGl0bGUnOiAnXHU1REU1XHU0RjVDXHU4RjZFXHU2QjIxXHU1M0Q5XHU0RThCJyxcclxuICAgICduYXJyYXRpdmUuZ2VuZXJhdGUnOiAnXHU2NTc0XHU0RjUzXHU4OUUzXHU4QkZCXHU4RkQ5XHU4RjZFXHU1REU1XHU0RjVDJyxcclxuICAgICduYXJyYXRpdmUucnVubmluZyc6ICdcdTg5RTNcdThCRkJcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhcdTdFQTYgMTAtMzAgXHU3OUQyXHVGRjA5JyxcclxuICAgICdiYWRnZS5mYWlsZWQnOiAne259IFx1NEUyQVx1NEVGQlx1NTJBMVx1OTcwMFx1ODk4MVx1NTkwNFx1NzQwNlx1RkYwQ1x1NzBCOVx1NTFGQlx1NjdFNVx1NzcwQicsXHJcbiAgICAnZXhlYy5mbG93Q3JlYXRlJzogJ1x1NTg2Qlx1NTE5OVx1NEVGQlx1NTJBMScsXHJcbiAgICAnZXhlYy5mbG93T3JjaGVzdHJhdGUnOiAnXHU3ODZFXHU4QkE0XHU3RjE2XHU2MzkyXHVGRjA4XHU2QkNGXHU2QjY1XHU1M0VGXHU2NTM5XHU2QTIxXHU1NzhCL1x1ODlEMlx1ODI3Mi9cdTU5MzFcdThEMjVcdTdCNTZcdTc1NjVcdUZGMDknLFxyXG4gICAgJ2V4ZWMuZmxvd1J1bic6ICdcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMDhSdW4gXHU4QkU2XHU2MEM1XHU3NzBCXHU4RkRCXHU1RUE2XHU0RTBFXHU2MjEwXHU2NzJDXHVGRjA5JyxcclxuICAgICdleGVjLmZsb3dNZW1vcnknOiAnXHU4MUVBXHU1MkE4XHU2M0QwXHU3MEJDXHU4QkIwXHU1RkM2XHVGRjA4XHU4QkIwXHU1RkM2XHU5NzYyXHU2NzdGXHU3ODZFXHU4QkE0XHVGRjA5JyxcclxuICAgICdleGVjLnBsYW5uaW5nJzogJ1x1N0YxNlx1NjM5Mlx1NzUxRlx1NjIxMFx1NEUyRFx1MjAyNlx1RkYwOExMTSBcdTZCNjNcdTU3MjhcdTYyQzZcdTg5RTNcdTRFRkJcdTUyQTFcdUZGMENcdTdFQTYgMTAtMzAgXHU3OUQyXHVGRjA5JyxcclxuICAgICdleGVjLmNvbC5zdGVwcyc6ICdcdTZCNjVcdTlBQTQnLFxyXG4gICAgJ25vdGVzLmVkaXQnOiAnXHU3RjE2XHU4RjkxJyxcclxuICAgICdub3Rlcy50b01lbW9yeSc6ICdcdThGNkNcdThCQjBcdTVGQzYnLFxyXG4gICAgJ25vdGVzLnRvTWVtb3J5SGludCc6ICdcdTYyOEFcdThGRDlcdTY3NjFcdTdCMTRcdThCQjBcdTc2ODRcdTY4MDdcdTk4OThcdTRFMEVcdTUxODVcdTVCQjlcdTU4NkJcdTUxNjVcdTRFMEJcdTY1QjlcdThCQjBcdTVGQzZcdTg4NjhcdTUzNTVcdUZGMENcdTc4NkVcdThCQTRcdTU0MEVcdTUxNjVcdTVFOTMnLFxyXG4gICAgJ25vdGVzLnRvTWVtb3J5RG9uZSc6ICdcdTI3MTMgXHU1REYyXHU1ODZCXHU1MTY1XHU4QkIwXHU1RkM2XHU4ODY4XHU1MzU1XHVGRjA4XHU1NzI4XHU0RTBCXHU2NUI5XHUzMDBDXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHUzMDBEXHU1MzNBXHU3ODZFXHU4QkE0XHU3QzdCXHU1NzhCXHU1NDBFXHU2REZCXHU1MkEwXHVGRjA5JyxcclxuICAgICdub3Rlcy5jb3B5TWQnOiAnXHU1OTBEXHU1MjM2IE1EJyxcclxuICAgICdub3Rlcy5jb3B5TWRIaW50JzogJ1x1NjI4QVx1OEZEOVx1Njc2MVx1N0IxNFx1OEJCMFx1NTkwRFx1NTIzNlx1NEUzQSBNYXJrZG93biBcdTUyMzBcdTUyNkFcdThEMzRcdTY3N0YnLFxyXG4gICAgJ25vdGVzLmNvcHlNZERvbmUnOiAnXHU1REYyXHU1OTBEXHU1MjM2XHU0RTNBIE1hcmtkb3duJyxcclxuICAgICdub3Rlcy5leHBvcnRNZCc6ICdcdTVCRkNcdTUxRkEgTUQnLFxyXG4gICAgJ25vdGVzLmV4cG9ydE1kSGludCc6ICdcdTRFMEJcdThGN0RcdTRFM0EgLm1kIFx1NjU4N1x1NEVGNicsXHJcbiAgICAnbm90ZXMuZXhwb3J0RG9uZSc6ICdcdTVERjJcdTVCRkNcdTUxRkFcdTRFM0EgLm1kIFx1NjU4N1x1NEVGNicsXHJcbiAgICAnbm90ZXMuZGlnZXN0TmV2ZXInOiAnXHU1QzFBXHU2NzJBXHU3NTFGXHU2MjEwXHU4RkM3IEFJIFx1NjAzQlx1N0VEMycsXHJcbiAgICAnbm90ZXMuZGlnZXN0UGVuZGluZyc6ICdcdTRFMEFcdTZCMjFcdTYwM0JcdTdFRDNcdTU0MEVcdTY3MDkge259IFx1NEUyQVx1NjVCMFx1NjNEMFx1NEVBNFx1NjcyQVx1NkQ4OFx1NTMxNicsXHJcbiAgICAnZGV0YWlsLnNhdmVOb3RlJzogJ1x1NUI1OFx1NEUzQVx1N0IxNFx1OEJCMCcsXHJcbiAgICAnZGV0YWlsLnNhdmVOb3RlSGludCc6ICdcdTYyOEFcdTY3MkNcdTZCMjFcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdUZGMDhcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDgvXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxL1x1OThDRVx1OTY2OVx1NzBCOVx1RkYwOVx1NEUwMFx1OTUyRVx1NUI1OFx1NEUzQVx1N0VEM1x1Njc4NFx1NTMxNlx1N0IxNFx1OEJCMCcsXHJcbiAgICAnZGV0YWlsLnNhdmVOb3RlVGl0bGUnOiAnXHU2ODM4XHU2N0U1XHU4QkIwXHU1RjU1JyxcclxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeSc6ICdcdTZDODlcdTZEQzBcdTRFM0FcdThCQjBcdTVGQzYnLFxyXG4gICAgJ2RldGFpbC5zYXZlTWVtb3J5SGludCc6ICdcdTYyOEFcdTY3MkNcdTZCMjFcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdTZDODlcdTZEQzBcdTRFM0FcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdUZGMDhcdThGREJcdTUxNjVcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTdcdUZGMDknLFxyXG4gICAgJ25vdGVzLnNhdmUnOiAnXHU0RkREXHU1QjU4JyxcclxuICAgICdub3Rlcy5jYW5jZWwnOiAnXHU1M0Q2XHU2RDg4JyxcclxuICAgICdtZW1vcnkuYnJhbmNoU2NvcGUnOiAnXHU1MjA2XHU2NTJGJyxcclxuICAgICdtZW1vcnkuYnJhbmNoQWxsJzogJ1x1NTE2OFx1OTBFOFx1NTIwNlx1NjUyRicsXHJcbiAgICAnbm90ZXMuc2VhcmNoJzogJ1x1NjQxQ1x1N0QyMlx1N0IxNFx1OEJCMFx1MjAyNicsXHJcbiAgICAnbW9kZWwudGl0bGUnOiAnXHU2QTIxXHU1NzhCXHU1MjA2XHU5MTREXHVGRjA4XHU4OUUzXHU4QkZCIC8gXHU2MDNCXHU3RUQzXHU3QjQ5XHU0RUZCXHU1MkExXHU3NTI4XHU1NEVBXHU0RTJBXHU2QTIxXHU1NzhCXHVGRjA5JyxcclxuICAgICdtb2RlbC5sb2FkaW5nJzogJ1x1OEJGQlx1NTNENlx1NkEyMVx1NTc4Qlx1NkUwNVx1NTM1NVx1MjAyNicsXHJcbiAgICAnbW9kZWwuZm9sbG93Q2hhdCc6ICdcdThEREZcdTk2OEZcdTgwNEFcdTU5MjlcdTZBMjFcdTU3OEInLFxyXG4gICAgJ21vZGVsLnNhdmUnOiAnXHU0RkREXHU1QjU4XHU1RTc2XHU3NTFGXHU2NTQ4JyxcclxuICAgICdtb2RlbC5zYXZlZCc6ICdcdTVERjJcdTc1MUZcdTY1NDgnLFxyXG4gICAgJ21vZGVsLmhpbnQnOiAnXHU0RkREXHU1QjU4XHU1NDBFXHU3QUNCXHU1MzczXHU3NTFGXHU2NTQ4XHU1RTc2XHU2MzAxXHU0RTQ1XHU1MzE2XHVGRjA4XHU5MUNEXHU1NDJGXHU1NDBFXHU0RkREXHU3NTU5XHVGRjA5XHVGRjFCXHU0RTBEXHU1RjcxXHU1NENEXHU4MDRBXHU1OTI5XHU2QTIxXHU1NzhCXHUzMDAyJyxcclxuICAgICdub3Rlcy5haVN1bW1hcnknOiAnQUkgXHU2MDNCXHU3RUQzXHU3QjE0XHU4QkIwJyxcclxuICAgICdub3Rlcy5haVN1bW1hcnlSdW4nOiAnXHU2MDNCXHU3RUQzXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4XHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXHJcbiAgICAnbm90ZXMuZXhwYW5kJzogJ1x1NUM1NVx1NUYwMFx1NTE2OFx1NjU4NycsXHJcbiAgICAnbm90ZXMuY29sbGFwc2UnOiAnXHU2NTM2XHU4RDc3JyxcclxuICAgICdub3Rlcy5zdW1tYXJ5VGFnJzogJ0FJIFx1NjAzQlx1N0VEMycsXHJcbiAgICAnbm90ZXMuZW1wdHlTZWFyY2gnOiAnXHU2NUUwXHU1MzM5XHU5MTREXHU3QjE0XHU4QkIwXHUzMDAyJyxcclxuICAgICdub3Rlcy5jb250ZW50SGludCc6ICdcdTdCMTRcdThCQjBcdTUxODVcdTVCQjlcdUZGMDhcdTY1MkZcdTYzMDFcdTU5MUFcdTg4NENcdUZGMDlcdUZGMUFcdTdFRDNcdThCQkFcdTMwMDFcdTc1OTFcdTk1RUVcdTMwMDFcdTVCNjZcdTRFNjBcdTg5ODFcdTcwQjlcdTMwMDFcdTUxNzNcdTk1MkVcdTUxQjNcdTdCNTZcdTIwMjYnLFxyXG4gICAgJ25vdGVzLnRhZ3NIaW50JzogJ1x1NjgwN1x1N0I3RVx1RkYwOFx1OTAxN1x1NTNGN1x1NTIwNlx1OTY5NFx1RkYwQ1x1OTAwOVx1NTg2Qlx1RkYxQlx1NEZERFx1NUI1OFx1NTQwRVx1NTNFRlx1NzBCOVx1NTFGQlx1N0I1Qlx1OTAwOVx1RkYwOScsXHJcbiAgICAnbm90ZXMucGluJzogJ1x1N0Y2RVx1OTg3NicsXHJcbiAgICAnbm90ZXMudW5waW4nOiAnXHU1M0Q2XHU2RDg4XHU3RjZFXHU5ODc2JyxcclxuICAgICdub3Rlcy5lZGl0ZWRBdCc6ICdcdTdGMTZcdThGOTFcdTRFOEUnLFxyXG4gICAgJ3Jldmlldy5maWx0ZXJBbGwnOiAnXHU1MTY4XHU5MEU4JyxcclxuICAgICdyZXZpZXcuc3RhdHVzQWxsJzogJ1x1NTE2OFx1OTBFOFx1NzJCNlx1NjAwMScsXHJcbiAgICAncmV2aWV3LnZlcmlmeSc6ICdcdTU5MERcdTY4QzAnLFxyXG4gICAgJ3Jldmlldy52ZXJpZnlSdW5uaW5nJzogJ1x1NTkwRFx1NjhDMFx1NEUyRFx1MjAyNicsXHJcbiAgICAncmV2aWV3LnZlcmlmeUhpbnQnOiAnXHU0RkVFXHU2NTM5XHU0RUUzXHU3ODAxXHU1NDBFXHU3MEI5XHU1MUZCXHVGRjFBXHU4MUVBXHU1MkE4XHU2OEMwXHU2RDRCXHU5NUVFXHU5ODk4XHU2NjJGXHU1NDI2XHU0RkVFXHU1OTBEXHUzMDAxXHU2NTM5XHU1MkE4XHU2NjJGXHU1NDI2XHU2NzAwXHU0RjE4L1x1NjcwMFx1NUMwRlx1NEZCNVx1NTE2NVx1MzAwMVx1NjcwOVx1NjVFMFx1NjVCMFx1OTVFRVx1OTg5OFx1RkYxQlx1NTE2OFx1OTBFOFx1OTAxQVx1OEZDN1x1NjI0RFx1ODFFQVx1NTJBOFx1N0Y2RVx1NEUzQVx1NURGMlx1ODlFM1x1NTFCMycsXHJcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmUnOiAnXHU1MjI0XHU1QjlBXHU4QkVGXHU2MkE1JyxcclxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZUhpbnQnOiAnXHU0RUJBXHU1REU1XHU1MjI0XHU1QjlBXHU4QkU1XHU5NUVFXHU5ODk4XHU0RTNBXHU4QkVGXHU2MkE1XHU1RTc2XHU1MTczXHU5NUVEXHVGRjA4XHU0RTBFXHU1OTBEXHU2OEMwXHU4OUUzXHU1MUIzXHU3Njg0XHU4QkVEXHU0RTQ5XHU0RTBEXHU1NDBDXHVGRjA5JyxcclxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZVRpdGxlJzogJ1x1NTIyNFx1NUI5QVx1NEUzQVx1OEJFRlx1NjJBNVx1RkYxRicsXHJcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVNc2cnOiAnXHUzMDBDe3RpdGxlfVx1MzAwRFx1NUMwNlx1ODhBQlx1NjgwN1x1OEJCMFx1NEUzQVx1OEJFRlx1NjJBNVx1RkYwOFx1NURGMlx1NjJEMlx1N0VERFx1RkYwOVx1NUU3Nlx1NEVDRVx1NUY4NVx1NTkwNFx1NzQwNlx1NEUyRFx1NzlGQlx1OTY2NFx1MzAwMicsXHJcbiAgICAncmV2aWV3LmZpeERldGFpbCc6ICdcdTRGRUVcdTU5MERcdThCRTZcdTYwQzUnLFxyXG4gICAgJ3Jldmlldy5maXhTdGF0RmlsZXMnOiAnXHU2NTg3XHU0RUY2JyxcclxuICAgICdyZXZpZXcuZml4RmlsZXMnOiAnXHU0RkVFXHU1OTBEXHU2RDg5XHU1M0NBXHU2NTg3XHU0RUY2JyxcclxuICAgICdyZXZpZXcuZml4SW1wYWN0JzogJ1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNFx1RkYwOFx1NjUzOVx1NTJBOFx1N0IyNlx1NTNGN1x1NEUwRVx1OEMwM1x1NzUyOFx1NzBCOVx1RkYwOScsXHJcbiAgICAncmV2aWV3LmRlZmluZWRJbic6ICdcdTVCOUFcdTRFNDlcdTRFOEUnLFxyXG4gICAgJ3Jldmlldy5jYWxsQ291bnQnOiAnXHU1OTA0XHU4QzAzXHU3NTI4JyxcclxuICAgICdyZXZpZXcuZml4RGlmZic6ICdcdTRGRUVcdTU5MERcdTVERUVcdTVGMDJcdUZGMDhcdTc2RjhcdTVCRjlcdThCQzRcdTVCQTFcdTU3RkFcdTdFQkZcdUZGMDknLFxyXG4gICAgJ3Jldmlldy5yZWZyZXNoJzogJ1x1NTIzN1x1NjVCMCcsXHJcbiAgICAncmV2aWV3LnJldGVudGlvbkhpbnQnOiAnXHU1REYyXHU4OUUzXHU1MUIzL1x1OEJFRlx1NjJBNVx1OTVFRVx1OTg5OFx1NEZERFx1NzU1OSB7ZGF5c30gXHU1OTI5XHU1NDBFXHU4MUVBXHU1MkE4XHU2RTA1XHU3NDA2JyxcclxuICAgICdyZXZpZXcudGFyZ2V0JzogJ1x1NUJGOVx1OEM2MScsXHJcbiAgICAncmV2aWV3LndvcmtpbmdUYXJnZXQnOiAnXHU1REU1XHU0RjVDXHU1MzNBJyxcclxuICAgICdyZXZpZXcuZXhwb3J0TWQnOiAnXHU1QkZDXHU1MUZBIE1EJyxcclxuICAgICdyZXZpZXcuZXhwb3J0TWRIaW50JzogJ1x1NjI4QVx1NUY1M1x1NTI0RFx1N0I1Qlx1OTAwOVx1NEUwQlx1NzY4NFx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1NEUwQlx1OEY3RFx1NEUzQSAubWQgXHU2NTg3XHU0RUY2JyxcclxuICAgICdyZXZpZXcuZXhwb3J0RW1wdHknOiAnXHU2Q0ExXHU2NzA5XHU1M0VGXHU1QkZDXHU1MUZBXHU3Njg0XHU5NUVFXHU5ODk4JyxcclxuICAgICdyZXZpZXcuc2VsZWN0QWxsJzogJ1x1NTE2OFx1OTAwOScsXHJcbiAgICAncmV2aWV3LmNoZWNrZWRDb3VudCc6ICdcdTVERjJcdTkwMDkge259IFx1Njc2MScsXHJcbiAgICAncmV2aWV3Lm1hcmtIYW5kbGVkJzogJ1x1NjgwN1x1OEJCMFx1NURGMlx1NTkwNFx1NzQwNicsXHJcbiAgICAncmV2aWV3LmJhdGNoVmVyaWZ5JzogJ1x1NjI3OVx1OTFDRlx1NTkwRFx1NjhDMCcsXHJcbiAgICAncmV2aWV3LmJhdGNoVmVyaWZ5Q29uZmlybVRpdGxlJzogJ1x1NjI3OVx1OTFDRlx1NTkwRFx1NjhDMFx1RkYxRicsXHJcbiAgICAncmV2aWV3LmJhdGNoVmVyaWZ5Q29uZmlybU1zZyc6ICdcdTVDMDZcdTVCRjkge259IFx1NEUyQVx1OEJDNFx1NUJBMVx1NzZFRVx1NjgwN1x1OTAxMFx1NEUwMFx1NTkwRFx1NjhDMFx1RkYwOFx1NEUzMlx1ODg0QyBMTE0gXHU4QzAzXHU3NTI4XHVGRjBDXHU2QkNGXHU0RTJBXHU3NkVFXHU2ODA3XHU3RUE2IDEwLTYwIFx1NzlEMlx1RkYwQ1x1NEYxQVx1NkQ4OFx1ODAxN1x1NkEyMVx1NTc4Qlx1NzUyOFx1OTFDRlx1RkYwOVx1RkYxQlx1NTNFRlx1OTY4Rlx1NjVGNlx1NTA1Q1x1NkI2Mlx1MzAwMicsXHJcbiAgICAncmV2aWV3LmJhdGNoU3RvcCc6ICdcdTUwNUNcdTZCNjInLFxyXG4gICAgJ3Jldmlldy5iYXRjaFByb2dyZXNzJzogJ1x1NjI3OVx1OTFDRlx1NTkwRFx1NjhDMFx1NEUyRCB7aX0ve259JyxcclxuICAgICdyZXZpZXcuYmF0Y2hEb25lJzogJ1x1NjI3OVx1OTFDRlx1NTkwRFx1NjhDMFx1NUI4Q1x1NjIxMFx1RkYxQVx1ODlFM1x1NTFCMyB7YX0gXHU2NzYxIFx1MDBCNyBcdTRFQ0RcdTVGODVcdTU5MDRcdTc0MDYge2J9IFx1Njc2MSBcdTAwQjcgXHU2NUIwXHU5NUVFXHU5ODk4IHtjfSBcdTY3NjEgXHUwMEI3IFx1NTkzMVx1OEQyNSB7ZH0gXHU0RTJBXHU3NkVFXHU2ODA3JyxcclxuICAgICdyZXZpZXcuYmF0Y2hTdG9wcGVkJzogJ1x1NjI3OVx1OTFDRlx1NTkwRFx1NjhDMFx1NURGMlx1NTA1Q1x1NkI2MicsXHJcbiAgICAncmV2aWV3LnRyaWFnZSc6ICdcdUQ4M0VcdURERjkgXHU2NTc0XHU0RjUzXHU1MjA2XHU4QkNBJyxcclxuICAgICdyZXZpZXcudHJpYWdlSGludCc6ICdMTE0gXHU2NTc0XHU0RjUzXHU2MjZCXHU2M0NGXHU1MTY4XHU5MEU4XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHVGRjFBXHU1MjI0XHU5MUNEXHU1OTBEL1x1OEZDN1x1NjVGNi9cdTRFMERcdTYyMTBcdTdBQ0JcdTUzNzNcdTY1RjZcdTUxNzNcdTk1RURcdUZGMDhcdTVFMjZcdTRGOURcdTYzNkVcdUZGMENcdTUzRUZcdTRFQkFcdTVERTVcdTkxQ0RcdTVGMDBcdTU5MERcdTY4MzhcdUZGMDlcdUZGMENcdTc3MUZcdTk1RUVcdTk4OThcdTc1NTlcdTRFMEJcdTUxOERcdTZEM0VcdTUzRDFcdTRGRUVcdTU5MEQnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VDb25maXJtVGl0bGUnOiAnXHU2NTc0XHU0RjUzXHU1MjA2XHU4QkNBXHVGRjFGJyxcclxuICAgICdyZXZpZXcudHJpYWdlQ29uZmlybU1zZyc6ICdcdTVDMDZcdTc1MjggTExNIFx1NTIwNlx1NjI3OVx1NjI2Qlx1NjNDRlx1NTE2OFx1OTBFOFx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1RkYwOFx1NkJDRlx1NjI3OVx1NjcwMFx1NTkxQSB7bn0gXHU2NzYxXHVGRjBDXHU2RDg4XHU4MDE3XHU2QTIxXHU1NzhCXHU3NTI4XHU5MUNGXHVGRjA5XHUzMDAyXHU1MjI0XHU0RTNBXHU5MUNEXHU1OTBEL1x1OEZDN1x1NjVGNi9cdTRFMERcdTYyMTBcdTdBQ0JcdTc2ODRcdTk1RUVcdTk4OThcdTRGMUFcdTMwMTBcdTdBQ0JcdTUzNzNcdTUxNzNcdTk1RURcdTMwMTFcdTVFNzZcdTZDRThcdTY2MEVcdTRGOURcdTYzNkVcdTIwMTRcdTIwMTRcdTUxNjhcdTkwRThcdTUzRUZcdTU3MjhcdTk1RUVcdTk4OThcdTUzNjFcdTU5MERcdTY4MzhcdTkxQ0RcdTVGMDBcdTMwMDJcdTc1NTlcdTRFMEJcdTc2ODRcdTc3MUZcdTk1RUVcdTk4OThcdTUxOERcdThENzBcdTZEM0VcdTUzRDFcdTRGRUVcdTU5MERcdTMwMDInLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VQcm9ncmVzcyc6ICdcdTUyMDZcdThCQ0FcdTRFMkRcdUZGMUFcdTVERjJcdTU5MDRcdTc0MDYge259IFx1Njc2MVx1RkYwQ1x1NTI2OVx1NEY1OVx1N0VBNiB7bX0gXHU2NzYxJyxcclxuICAgICdyZXZpZXcudHJpYWdlU3RvcCc6ICdcdTUwNUNcdTZCNjInLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VEb25lJzogJ1x1NTIwNlx1OEJDQVx1NUI4Q1x1NjIxMFx1RkYxQVx1NTE3M1x1OTVFRCBcdTkxQ0RcdTU5MEQge2F9IFx1MDBCNyBcdThGQzdcdTY1RjYge2J9IFx1MDBCNyBcdTRFMERcdTVCNThcdTU3Mjgge2N9XHVGRjFCXHU0RkREXHU3NTU5IHtkfSBcdTY3NjFcdTVGODVcdTU5MDRcdTc0MDYnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VTdG9wcGVkJzogJ1x1NTIwNlx1OEJDQVx1NURGMlx1NTA1Q1x1NkI2Mlx1RkYwOFx1NURGMlx1NTIyNFx1NUI5QVx1NzY4NFx1NEUwRFx1NEYxQVx1OTFDRFx1NTkwRFx1NkQ4OFx1ODAxN1x1RkYwQ1x1NTNFRlx1NTE4RFx1NkIyMVx1NzBCOVx1NTFGQlx1N0VFN1x1N0VFRFx1RkYwOScsXHJcbiAgICAncmV2aWV3LnRyaWFnZU5vdGhpbmcnOiAnXHU1RjUzXHU1MjREXHU0RjFBXHU4QkREXHU1QjlBXHU0RjREXHU1MjMwXHU3Njg0XHU5ODc5XHU3NkVFXHU2Q0ExXHU2NzA5XHU1Rjg1XHU1MjA2XHU4QkNBXHU3Njg0XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHVGRjA4XHU4MkU1XHU0RTBFXHU1MjE3XHU4ODY4XHU0RTBEXHU3QjI2XHVGRjBDXHU4QkY3XHU3ODZFXHU4QkE0XHU1REU2XHU0RkE3XHU2MjUzXHU1RjAwXHU3Njg0XHU0RjFBXHU4QkREXHU1QzVFXHU0RThFXHU4QkU1XHU5ODc5XHU3NkVFXHVGRjA5JyxcclxuICAgICdyZXZpZXcudHJpYWdlUGFyc2VGYWlsJzogJ1x1RkYxQlx1NjcwOVx1NEUwMFx1NjI3OVx1OEY5M1x1NTFGQVx1ODlFM1x1Njc5MFx1NTkzMVx1OEQyNVx1NURGMlx1NjMwOVx1NEZERFx1NzU1OVx1NTkwNFx1NzQwNlx1RkYwQ1x1NTNFRlx1OTFDRFx1OEJENScsXHJcbiAgICAncmV2aWV3LnB1cmdlT3Blbic6ICdcdUQ4M0RcdURERDEgXHU2RTA1XHU3QTdBXHU2NzJBXHU4OUUzXHU1MUIzJyxcclxuICAgICdyZXZpZXcucHVyZ2VPcGVuSGludCc6ICdcdTYyOEFcdTVGNTNcdTUyNERcdTdCNUJcdTkwMDlcdTRFMEJcdTUxNjhcdTkwRThcdTY3MkFcdTg5RTNcdTUxQjNcdTk1RUVcdTk4OThcdTRFMDBcdTk1MkVcdTdGNkVcdTRFM0FcdTVERjJcdTU5MDRcdTc0MDZcdUZGMDhcdTRFMERcdTRGRUVcdTRFRkJcdTRGNTVcdTRFRTNcdTc4MDFcdUZGMDlcdUZGMUJcdTRGRERcdTc1NTlcdTY3MUZcdTU0MEVcdTgxRUFcdTUyQThcdTcyNjlcdTc0MDZcdTZFMDVcdTc0MDYnLFxyXG4gICAgJ3Jldmlldy5wdXJnZU9wZW5Db25maXJtVGl0bGUnOiAnXHU2RTA1XHU3QTdBXHU1MTY4XHU5MEU4XHU2NzJBXHU4OUUzXHU1MUIzXHU5NUVFXHU5ODk4XHVGRjFGJyxcclxuICAgICdyZXZpZXcucHVyZ2VPcGVuQ29uZmlybU1zZyc6ICdcdTVDMDZcdTYyOEEge259IFx1Njc2MVx1NjcyQVx1ODlFM1x1NTFCM1x1OTVFRVx1OTg5OFx1NTE2OFx1OTBFOFx1N0Y2RVx1NEUzQVx1MzAwQ1x1NURGMlx1NTkwNFx1NzQwNlx1MzAwRFx1MjAxNFx1MjAxNFx1NEUwRFx1NEYxQVx1NEZFRVx1NjUzOVx1NEVGQlx1NEY1NVx1NEVFM1x1NzgwMVx1RkYwQ1x1NEVDNVx1NTE3M1x1OTVFRFx1NkUwNVx1NTM1NVx1Njc2MVx1NzZFRVx1MzAwMlx1NURGMlx1ODlFM1x1NTFCMy9cdTVERjJcdTYyRDJcdTdFRERcdTc2ODRcdTk1RUVcdTk4OThcdTRFMERcdTUzRDdcdTVGNzFcdTU0Q0RcdTMwMDJcdTZCNjRcdTY0Q0RcdTRGNUNcdTRFMERcdTUzRUZcdTRFMDBcdTk1MkVcdTY0QTRcdTk1MDBcdUZGMENcdTRGNDZcdTZCQ0ZcdTY3NjFcdTUzRUZcdTUzNTVcdTcyRUNcdTU3MjhcdTUzNjFcdTcyNDdcdTkxQ0NcdTY1MzlcdTU2REVcdTMwMENcdTVGODVcdTU5MDRcdTc0MDZcdTMwMERcdTMwMDInLFxyXG4gICAgJ3Jldmlldy5wdXJnZU9wZW5Eb25lJzogJ1x1NURGMlx1NkUwNVx1N0E3QSB7bn0gXHU2NzYxXHU2NzJBXHU4OUUzXHU1MUIzXHU5NUVFXHU5ODk4XHVGRjA4XHU3RjZFXHU0RTNBXHU1REYyXHU1OTA0XHU3NDA2XHVGRjA5JyxcclxuICAgICdyZXZpZXcuaGFuZGxlZERvbmUnOiAnXHU1REYyXHU2MjhBIHtufSBcdTY3NjFcdTk1RUVcdTk4OThcdTY4MDdcdThCQjBcdTRFM0FcdTVERjJcdTU5MDRcdTc0MDYnLFxyXG4gICAgJ2ZpeC5wbGFuJzogJ1x1NEZFRVx1NTkwRFx1NjVCOVx1Njg0OCcsXHJcbiAgICAnZml4LnBsYW5BcHByb2FjaCc6ICdcdTY1QjlcdTY4NDgnLFxyXG4gICAgJ2ZpeC5wbGFuSW1wYWN0JzogJ1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNCcsXHJcbiAgICAnZml4LnBsYW5CZW5lZml0JzogJ1x1NjUzNlx1NzZDQScsXHJcbiAgICAnZml4LnBsYW5SaXNrJzogJ1x1OThDRVx1OTY2OScsXHJcbiAgICAnZml4LmRpc3BhdGNoJzogJ1x1NkQzRVx1NTNEMVx1NEZFRVx1NTkwRCcsXHJcbiAgICAnZml4LmRpc3BhdGNoSGludE1haW4nOiAnXHU2MjhBXHU1MkZFXHU5MDA5XHU3Njg0XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHVGRjA4XHU2NzJBXHU1MkZFXHU5MDA5PVx1NUY1M1x1NTI0RFx1N0I1Qlx1OTAwOVx1NEUwQlx1NTE2OFx1OTBFOFx1RkYwOVx1NkQzRVx1NTNEMVx1N0VEOVx1NUI1MCBBZ2VudCBcdTVFNzZcdTUzRDFcdTU5MDRcdTc0MDZcdUZGMUFcdTc2RjRcdTYzQTVcdTRGRUVcdTU5MEQ9XHU0RTA5XHU5MDUzXHU5NUY4XHU1MjI0XHU1QjlBK1x1NEZFRVx1NTkwRCtcdTU2REVcdTUxOTkrXHU2M0QwXHU0RUE0XHU1MTY4XHU4MUVBXHU1MkE4XHVGRjFCXHU1MTQ4XHU1MUZBXHU2NUI5XHU2ODQ4PVx1NTNFQVx1OEJGQlx1NTIwNlx1Njc5MFx1NEVBN1x1NTFGQVx1N0VEM1x1Njc4NFx1NTMxNlx1NjVCOVx1Njg0OFx1RkYwQ1x1NjI3OVx1NTFDNlx1NTQwRVx1NTE4RFx1NkQzRVx1NTNEMVx1NjI2N1x1ODg0QycsXHJcbiAgICAnZml4LmRpc3BhdGNoTW9kZVRpdGxlJzogJ1x1NkQzRVx1NTNEMVx1NEZFRVx1NTkwRFx1MjAxNFx1MjAxNFx1OTAwOVx1NjJFOVx1NkEyMVx1NUYwRicsXHJcbiAgICAnZml4LmRpc3BhdGNoTW9kZU1zZyc6ICdcdTVDMDZcdTZEM0VcdTUzRDEge259IFx1Njc2MVx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1N0VEOVx1NUI1MCBBZ2VudCBcdTVFNzZcdTUzRDFcdTU5MDRcdTc0MDZcdUZGMDhcdTZCQ0ZcdTRFRkJcdTUyQTFcdTcyRUNcdTdBQ0Igd29ya3RyZWVcdUZGMENcdTZEODhcdTgwMTdcdTZBMjFcdTU3OEJcdTc1MjhcdTkxQ0ZcdUZGMENcdTRFMERcdTUzNjBcdTc1MjhcdTgwNEFcdTU5MjlcdTdBOTdcdTUzRTNcdUZGMDlcdTMwMDJcdTI2QTEgXHU3NkY0XHU2M0E1XHU0RkVFXHU1OTBEXHVGRjFBXHU0RTA5XHU5MDUzXHU5NUY4XHU1MjI0XHU1QjlBICsgXHU0RkVFXHU1OTBEICsgXHU1NkRFXHU1MTk5ICsgXHU2M0QwXHU0RUE0XHU1MTY4XHU4MUVBXHU1MkE4XHVGRjBDXHU4QkVGXHU2MkE1L1x1OTFDRFx1NTkwRC9cdThGQzdcdTY1RjZcdTRGMUFcdTgxRUFcdTUyQThcdTUxNzNcdTk1RURcdTMwMDJcdUQ4M0RcdURDQ0IgXHU1MTQ4XHU1MUZBXHU2NUI5XHU2ODQ4XHVGRjFBXHU1M0VBXHU4QkZCXHU1MjA2XHU2NzkwXHU0RUE3XHU1MUZBXHU3RUQzXHU2Nzg0XHU1MzE2XHU2NUI5XHU2ODQ4XHVGRjBDXHU0RTBEXHU2NTM5XHU0RUZCXHU0RjU1XHU0RUUzXHU3ODAxXHVGRjFCXHU0RjYwXHU1NzI4XHU5NUVFXHU5ODk4XHU1MzYxXHU3Njg0XHU2NUI5XHU2ODQ4XHU1NzU3XHU2Mjc5XHU1MUM2XHU1NDBFXHU3MEI5XHUzMDBDXHU2RDNFXHU1M0QxXHU1Rjg1XHU1QkExXHU2NUI5XHU2ODQ4XHUzMDBEXHU2MjY3XHU4ODRDXHUzMDAyJyxcclxuICAgICdmaXguZGlzcGF0Y2hBdXRvJzogJ1x1MjZBMSBcdTc2RjRcdTYzQTVcdTRGRUVcdTU5MEQnLFxyXG4gICAgJ2ZpeC5kaXNwYXRjaFBsYW4nOiAnXHVEODNEXHVEQ0NCIFx1NTE0OFx1NTFGQVx1NjVCOVx1Njg0OCcsXHJcbiAgICAnZml4LmRpc3BhdGNoTm9PcGVuJzogJ1x1NUY1M1x1NTI0RFx1N0I1Qlx1OTAwOVx1NEUwQlx1NkNBMVx1NjcwOVx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1NTNFRlx1NkQzRVx1NTNEMScsXHJcbiAgICAnZml4LmRpc3BhdGNoUGxhbnMnOiAnXHU2RDNFXHU1M0QxXHU1Rjg1XHU1QkExXHU2NUI5XHU2ODQ4JyxcclxuICAgICdmaXguZGlzcGF0Y2hQbGFuc0hpbnQnOiAnXHU2MjhBXHU1REYyXHU0RUE3XHU1MUZBXHU3Njg0XHU1Rjg1XHU4QkM0XHU1QkExXHU2NUI5XHU2ODQ4XHU2RDNFXHU1M0QxXHU3RUQ5XHU1QjUwIEFnZW50IFx1NUU3Nlx1NTNEMVx1NjI2N1x1ODg0Q1x1NEZFRVx1NTkwRFx1RkYwOFx1NkJDRlx1NEVGQlx1NTJBMVx1NzJFQ1x1N0FDQiB3b3JrdHJlZVx1RkYwQ1x1NTQwOFx1NUU3Nlx1NTFCMlx1N0E4MVx1ODFFQVx1NTJBOFx1NTdGQVx1NEU4RVx1NjcwMFx1NjVCMFx1NEVFM1x1NzgwMVx1OTFDRFx1NTA1QVx1RkYwOScsXHJcbiAgICAnZml4LmRpc3BhdGNoRG9uZSc6ICdcdTVERjJcdTZEM0VcdTUzRDEge259IFx1NEUyQVx1NEZFRVx1NTkwRFx1NEVGQlx1NTJBMVx1RkYwOFx1NUU3Nlx1NTNEMSB7Y31cdUZGMDknLFxyXG4gICAgJ2ZpeC5kaXNwYXRjaEVtcHR5JzogJ1x1NkNBMVx1NjcwOVx1NTNFRlx1NkQzRVx1NTNEMVx1NzY4NFx1NEVGQlx1NTJBMVx1RkYwOFx1NTJGRVx1OTAwOVx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1NjIxNlx1N0I0OVx1NUY4NVx1NjVCOVx1Njg0OFx1NEVBN1x1NTFGQVx1RkYwOScsXHJcbiAgICAnZml4LnN0YXR1cyc6ICdcdTRGRUVcdTU5MERcdTYyNjdcdTg4NEMnLFxyXG4gICAgJ2ZpeC5zdG9wJzogJ1x1NTA1Q1x1NkI2MicsXHJcbiAgICAnZml4LnN0b3BEb25lJzogJ1x1NURGMlx1NTA1Q1x1NkI2MiB7bn0gXHU0RTJBXHU0RkVFXHU1OTBEXHU0RUZCXHU1MkExJyxcclxuICAgICdmaXgudGFza1F1ZXVlZCc6ICdcdTYzOTJcdTk2MUZcdTRFMkQnLFxyXG4gICAgJ2ZpeC50YXNrUnVubmluZyc6ICdcdThGRDBcdTg4NENcdTRFMkQnLFxyXG4gICAgJ2ZpeC50YXNrTWVyZ2luZyc6ICdcdTU0MDhcdTVFNzZcdTRFMkQnLFxyXG4gICAgJ2ZpeC50YXNrUmVkbyc6ICdcdTkxQ0RcdTUwNUFcdTRFMkQnLFxyXG4gICAgJ2ZpeC50YXNrRG9uZSc6ICdcdTVERjJcdTVCOENcdTYyMTAnLFxyXG4gICAgJ2ZpeC50YXNrQ29uZmxpY3QnOiAnXHU1MUIyXHU3QTgxJyxcclxuICAgICdmaXgudGFza0ZhaWxlZCc6ICdcdTU5MzFcdThEMjUnLFxyXG4gICAgJ2ZpeC50YXNrQ2FuY2VsbGVkJzogJ1x1NURGMlx1NTA1Q1x1NkI2MicsXHJcbiAgICAnZml4LmF0dGVtcHQnOiAnXHU3QjJDIHtufSBcdTZCMjEnLFxyXG4gICAgJ2ZpeC5ydW50aW1lJzogJ1x1NURGMlx1OEZEMFx1ODg0QyB7bn0gXHU1MjA2JyxcclxuICAgICdmaXgucmVzdW1lcyc6ICdcdTdFRURcdThERDEge259JyxcclxuICAgICdmaXgucHJvYmVzJzogJ1x1NjNBMlx1NkQzQiB7bn0nLFxyXG4gICAgJ2ZpeC5tb2RlbFRpdGxlJzogJ1x1NEZFRVx1NTkwRFx1NUU3Nlx1NTNEMVx1RkYwOFx1NUI1MCBBZ2VudCBcdTZDNjBcdUZGMDknLFxyXG4gICAgJ2ZpeC5tb2RlbEhpbnQnOiAnXHU1NDBDXHU2NUY2XHU2MjY3XHU4ODRDXHU3Njg0XHU0RkVFXHU1OTBEXHU1QjUwIEFnZW50IFx1NEUwQVx1OTY1MFx1RkYwODEtMTBcdUZGMDlcdTMwMDJcdTZCQ0ZcdTRFRkJcdTUyQTFcdTcyRUNcdTdBQ0Igd29ya3RyZWUgXHU0RTkyXHU0RTBEXHU1RTcyXHU2MjcwXHVGRjFCXHU0RkVFXHU2NTM5XHU1NDBFXHU3QUNCXHU1MzczXHU3NTFGXHU2NTQ4XHUzMDAyJyxcclxuXHJcbiAgICAncGxhbi50aXRsZSc6ICdcdTdGMTZcdTYzOTJcdThCQTFcdTUyMTJcdTc4NkVcdThCQTQnLFxyXG4gICAgJ3BsYW4uaGludCc6ICdcdTZCQ0ZcdTZCNjVcdTc2ODRcdTg5RDJcdTgyNzJcdTUxQjNcdTVCOUFcdTRFMEFcdTRFMEJcdTY1ODdcdTZDRThcdTUxNjVcdTRFMEVcdTlFRDhcdThCQTRcdTZBMjFcdTU3OEJcdUZGMDhcdTUyMDZcdTY3OTAvXHU2NENEXHU0RjVDPWZhc3RcdUZGMENcdTVGMDBcdTUzRDE9c3RhbmRhcmRcdUZGMENcdTg5QzRcdTUyMTI9cmVhc29uaW5nXHVGRjBDXHU5QThDXHU2NTM2PXZlcmlmaWVyXHVGRjA5XHVGRjFCXHU1M0VGXHU4QzAzXHU2NTc0XHU1NDBFXHU1MThEXHU1NDJGXHU1MkE4XHUzMDAyJyxcclxuICAgICdwbGFuLmNvbC5zdGVwJzogJ1x1NkI2NVx1OUFBNCcsICdwbGFuLmNvbC5yb2xlJzogJ1x1ODlEMlx1ODI3MicsICdwbGFuLmNvbC5tb2RlbCc6ICdcdTZBMjFcdTU3OEInLCAncGxhbi5jb2wucG9saWN5JzogJ1x1NTkzMVx1OEQyNVx1N0I1Nlx1NzU2NScsICdwbGFuLmNvbC5lbmFibGVkJzogJ1x1NTQyRlx1NzUyOCcsICdwbGFuLmNvbC5hdHRlbXB0cyc6ICdcdTVDMURcdThCRDUnLFxyXG4gICAgJ3BsYW4ubW9kZWxEZWZhdWx0JzogJ1x1OERERlx1OTY4Rlx1ODlEMlx1ODI3Mlx1OUVEOFx1OEJBNCcsXHJcbiAgICAncGxhbi5sYXVuY2hFZGl0ZWQnOiAnXHU0RkREXHU1QjU4XHU0RkVFXHU2NTM5XHU1RTc2XHU1NDJGXHU1MkE4JyxcclxuICAgICdwbGFuLmxhdW5jaERpcmVjdCc6ICdcdTYzMDlcdTUzOUZcdThCQTFcdTUyMTJcdTU0MkZcdTUyQTgnLFxyXG4gICAgJ3BsYW4uZGlzY2FyZCc6ICdcdTY1M0VcdTVGMDMnLFxyXG4gICAgJ3BsYW4udmlld0RldGFpbCc6ICdcdThCRTZcdTYwQzUnLCAncGxhbi5yZWZyZXNoRGV0YWlsJzogJ1x1NTIzN1x1NjVCMCcsICdwbGFuLmNsb3NlRGV0YWlsJzogJ1x1NjUzNlx1OEQ3NycsXHJcbiAgICAncGxhbi5kZXRhaWxUaXRsZSc6ICdSdW4gXHU4QkU2XHU2MEM1JyxcclxuICAgICdwbGFuLnBhdXNlZEJhbm5lcic6ICdcdTRFRkJcdTUyQTFcdTVERjJcdTY2ODJcdTUwNUNcdUZGMENcdTdCNDlcdTVGODVcdTRGNjBcdTc2ODRcdTUxQjNcdTdCNTYnLFxyXG4gICAgJ3BsYW4ucmVzdW1lUmV0cnknOiAnXHU5MUNEXHU4QkQ1XHU4QkU1XHU2QjY1XHU5QUE0XHU1RTc2XHU3RUU3XHU3RUVEJyxcclxuICAgICdwbGFuLnJlc3VtZVNraXAnOiAnXHU4REYzXHU4RkM3XHU4QkU1XHU2QjY1XHU5QUE0XHU3RUU3XHU3RUVEJyxcclxuICAgICdwbGFuLnJlc3VtZUZhaWxlZCc6ICdcdTRFQ0VcdTU5MzFcdThEMjVcdTU5MDRcdTYwNjJcdTU5MEQnLFxyXG4gICAgJ3BsYW4uY29udGV4dFRpdGxlJzogJ1x1NEVGQlx1NTJBMVx1NEUwQVx1NEUwQlx1NjU4N1x1RkYwOFx1NjcyQyBSdW4gXHU2Q0U4XHU1MTY1XHU0RTg2XHU0RUMwXHU0RTQ4XHVGRjA5JyxcclxuICAgICdwbGFuLmJyYW5jaCc6ICdcdTUyMDZcdTY1MkYnLCAncGxhbi5pbmplY3RlZE1lbW9yaWVzJzogJ1x1NkNFOFx1NTE2NVx1OEJCMFx1NUZDNicsICdwbGFuLmRlY2lzaW9uTG9nJzogJ1x1NTFCM1x1N0I1Nlx1NjVFNVx1NUZENycsXHJcbiAgICAnZXhlYy5jb2wuZGV0YWlsJzogJ1x1OEJFNlx1NjBDNScsXHJcblxyXG4gICAgJ3NjaGVkLnRpdGxlJzogJ1x1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMScsXHJcbiAgICAnc2NoZWQuZm9ybU5hbWUnOiAnXHU0RUZCXHU1MkExXHU1NDBEXHU3OUYwJywgJ3NjaGVkLmZvcm1JbnRlcnZhbCc6ICdcdTk1RjRcdTk2OTRcdUZGMDhcdTUyMDZcdTk0OUZcdUZGMDknLFxyXG4gICAgJ3NjaGVkLnR5cGVSZXZpZXcnOiAnXHU4MUVBXHU1MkE4XHU4QkM0XHU1QkExJywgJ3NjaGVkLnR5cGVTdW1tYXJ5JzogJ0FJIFx1NjAzQlx1N0VEMycsICdzY2hlZC50eXBlUnVuJzogJ1x1NUI5QVx1NjVGNlx1NjI2N1x1ODg0QycsXHJcbiAgICAnc2NoZWQuYWRkJzogJ1x1NTIxQlx1NUVGQScsXHJcbiAgICAnc2NoZWQuaGludCc6ICdcdTUyMzBcdTcwQjlcdTgxRUFcdTUyQThcdTYyNjdcdTg4NENcdUZGMUFcdTgxRUFcdTUyQThcdThCQzRcdTVCQTE9XHU4QkM0XHU1QkExXHU4RkQxIDI0IFx1NUMwRlx1NjVGNlx1NzY4NFx1NjVCMFx1NjNEMFx1NEVBNFx1RkYwOFx1OTVFRVx1OTg5OFx1OEZEQiBSZXZpZXcgXHU5NzYyXHU2NzdGXHVGRjA5XHVGRjFCQUkgXHU2MDNCXHU3RUQzPVx1NzUxRlx1NjIxMFx1NTg5RVx1OTFDRlx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1RkYxQlx1NUI5QVx1NjVGNlx1NjI2N1x1ODg0Qz1cdTYzMDlcdTZBMjFcdTY3N0ZcdThERDFcdTRFMDBcdTZCMjFcdTdGMTZcdTYzOTJcdTRFRkJcdTUyQTFcdTMwMDJcdTY3MDBcdTVDMEYgMSBcdTUyMDZcdTk0OUZcdTMwMDInLFxyXG4gICAgJ3NjaGVkLmVtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1MzAwMicsXHJcbiAgICAnc2NoZWQuY29sLm5hbWUnOiAnXHU1NDBEXHU3OUYwJywgJ3NjaGVkLmNvbC50eXBlJzogJ1x1N0M3Qlx1NTc4QicsICdzY2hlZC5jb2wuaW50ZXJ2YWwnOiAnXHU1NDY4XHU2NzFGJywgJ3NjaGVkLmNvbC5uZXh0JzogJ1x1NEUwQlx1NkIyMVx1NjI2N1x1ODg0QycsICdzY2hlZC5jb2wubGFzdFJlc3VsdCc6ICdcdTRFMEFcdTZCMjFcdTdFRDNcdTY3OUMnLCAnc2NoZWQuY29sLmFjdGlvbnMnOiAnXHU2NENEXHU0RjVDJyxcclxuICAgICdzY2hlZC5kYXknOiAnIFx1NTkyOScsICdzY2hlZC5ob3VyJzogJyBcdTVDMEZcdTY1RjYnLCAnc2NoZWQubWludXRlJzogJyBcdTUyMDZcdTk0OUYnLFxyXG4gICAgJ3NjaGVkLmRpc2FibGUnOiAnXHU2NjgyXHU1MDVDJywgJ3NjaGVkLmVuYWJsZSc6ICdcdTU0MkZcdTc1MjgnLCAnc2NoZWQucnVuTm93JzogJ1x1N0FDQlx1NTM3M1x1NjI2N1x1ODg0QycsXHJcblxyXG4gICAgJ21lbW9yeS56b25lVGl0bGUnOiAnXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2JyxcclxuICAgICdtZW1vcnkuc3luY0Jhc2VsaW5lJzogJ1x1NTQwQ1x1NkI2NVx1NTdGQVx1N0VCRicsICdtZW1vcnkuc3luY05vbmUnOiAnXHU2NzJBXHU1NDBDXHU2QjY1JyxcclxuICAgICdtZW1vcnkuYmVoaW5kJzogJ1x1ODQzRFx1NTQwRSB7bn0gXHU0RTJBXHU2M0QwXHU0RUE0XHU2NzJBXHU1NDBDXHU2QjY1JyxcclxuICAgICdtZW1vcnkuc3luYyc6ICdcdTU0MENcdTZCNjVcdThCQjBcdTVGQzYnLCAnbWVtb3J5LnN5bmNpbmcnOiAnXHU1NDBDXHU2QjY1XHU0RTJEXHUyMDI2JywgJ21lbW9yeS5zeW5jRmFpbGVkJzogJ1x1NTQwQ1x1NkI2NVx1NTkzMVx1OEQyNScsXHJcbiAgICAnbWVtb3J5LnN0YWxlVGl0bGUnOiAnXHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2XHVGRjA4XHU3NkY4XHU1MTczXHU0RUUzXHU3ODAxXHU1REYyXHU4OEFCXHU2NTM5XHU1MkE4XHVGRjBDXHU1Rjg1XHU0RjYwXHU1OTBEXHU2ODM4XHVGRjA5JyxcclxuICAgICdtZW1vcnkubWFya1N0YWxlJzogJ1x1NjgwN1x1OEJCMFx1OEZDN1x1NjVGNicsICdtZW1vcnkuYXJjaGl2ZUJ0bic6ICdcdTVGNTJcdTY4NjMnLCAnbWVtb3J5LmtlZXBBY3RpdmUnOiAnXHU0RUNEXHU2NzA5XHU2NTQ4JyxcclxuICAgICdtZW1vcnkubmV3Q2FuZGlkYXRlcyc6ICdcdTY1QjBcdTU4OUVcdTUwMTlcdTkwMDlcdUZGMDhcdTVERjJcdTUxNjVcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTdcdUZGMDlcdUZGMUEnLFxyXG4gICAgJ21lbW9yeS5jbG9zZVJlcG9ydCc6ICdcdTUxNzNcdTk1RURcdTYyQTVcdTU0NEEnLFxyXG4gICAgJ21lbW9yeS5zY29wZVByb2plY3QnOiAnXHU0RTNCXHU1RTcyXHVGRjA4XHU1MTY4XHU1MjA2XHU2NTJGXHVGRjA5JywgJ21lbW9yeS5zY29wZUJyYW5jaCc6ICdcdTRFQzVcdTVGNTNcdTUyNERcdTUyMDZcdTY1MkYnLFxyXG4gICAgJ21lbW9yeS5wZW5kaW5nUXVldWUnOiAnXHU1Rjg1XHU3ODZFXHU4QkE0XHU5NjFGXHU1MjE3JyxcclxuICAgICdtZW1vcnkudG9Ob3RlJzogJ1x1OEY2Q1x1N0IxNFx1OEJCMCcsICdtZW1vcnkubm9ybWFsaXplJzogJ1x1NUY1Mlx1NEUwMFx1NTIzMFx1NEUzQlx1NUU3MicsICdtZW1vcnkucmVzdG9yZSc6ICdcdTYwNjJcdTU5MEQnLFxyXG4gICAgJ21lbW9yeS5zdGF0dXNTdGFsZSc6ICdcdTc1OTFcdTRGM0NcdThGQzdcdTY1RjYnLFxyXG4gICAgJ2ltcGFjdC5mdW5jdGlvbnNOb25lJzogJ1x1NjcyQVx1OEJDNlx1NTIyQlx1NTFGQVx1NTFGRFx1NjU3MFx1N0VBN1x1OEMwM1x1NzUyOFx1NTNEOFx1NTMxNlx1RkYwOFx1NTNFRlx1ODBGRFx1NjYyRlx1NjgzN1x1NUYwRi9cdTk3NTlcdTYwMDFcdThENDRcdTZFOTAvXHU3RUFGXHU5MTREXHU3RjZFXHU2NTM5XHU1MkE4XHVGRjA5XHUzMDAyJyxcclxuICAgICdyZXZpZXcuY29sLnNldmVyaXR5JzogJ1x1N0VBN1x1NTIyQicsXHJcbiAgICAncmV2aWV3LmNvbC5jYXRlZ29yeSc6ICdcdTdDN0JcdTUyMkInLFxyXG4gICAgJ3Jldmlldy5jb2wudGl0bGUnOiAnXHU5NUVFXHU5ODk4JyxcclxuICAgICdyZXZpZXcuY29sLmV2aWRlbmNlJzogJ1x1NEY0RFx1N0Y2RScsXHJcbiAgICAncmV2aWV3LmNvbC5maXgnOiAnXHU1RUZBXHU4QkFFXHU0RkVFXHU1OTBEJyxcclxuICAgICdyZXZpZXcuaGludCc6ICdcdTcwQjlcdTUxRkJcdTRFMEFcdTY1QjlcdTYzMDlcdTk0QUVcdTVGMDBcdTU5Q0JcdTY4MzhcdTY3RTVcdUZGMENcdTRFQTdcdTUxRkFcdTY3MDBcdTRGMThcdTYwMjdcdTdFRDNcdThCQkFcdTRFMEVcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTMwMDInLFxyXG4gICAgJ2RpZmYuc2hvdyc6ICdcdTVCRjlcdTZCRDQnLFxyXG4gICAgJ2RpZmYuaGlkZSc6ICdcdTY1MzZcdThENzdcdTVERUVcdTVGMDInLFxyXG5cclxuICAgICdkZXRhaWwudGl0bGUnOiAnXHU2ODM4XHU2N0U1XHU4QkU2XHU2MEM1JyxcclxuICAgICdkZXRhaWwucGljayc6ICdcdTIxOTAgXHU0RUNFXHU1REU2XHU0RkE3XHU5MDA5XHU2MkU5XHU0RTAwXHU2QjIxXHU2M0QwXHU0RUE0XHVGRjA4XHU2MjE2XHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4XHVGRjA5XHU1RjAwXHU1OUNCXHU2ODM4XHU2N0U1JyxcclxuICAgICdkZXRhaWwud2hhdCc6ICdcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDgnLFxyXG4gICAgJ2RldGFpbC5sb2dpYyc6ICdcdTVCOUVcdTczQjBcdTkwM0JcdThGOTEnLFxyXG4gICAgJ2RldGFpbC5yaXNrJzogJ1x1OThDRVx1OTY2OVx1NzBCOScsXHJcbiAgICAnZGV0YWlsLmZpbGVzJzogJ1x1NjU4N1x1NEVGNlx1NkUwNVx1NTM1NScsXHJcbiAgICAnZGV0YWlsLnBhdGNoJzogJ1x1NjdFNVx1NzcwQlx1ODg2NVx1NEUwMVx1NTM5Rlx1NjU4NycsXHJcbiAgICAnZGV0YWlsLmFpTG9hZGluZyc6ICdBSSBcdTg5RTNcdThCRkJcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhcdTdFQTYgMTAtMzAgXHU3OUQyXHVGRjA5JyxcclxuICAgICdkZXRhaWwucXVldWVkJzogJ1x1OEZEOFx1NjcwOSB7bn0gXHU0RTJBXHU4OUUzXHU4QkZCXHU2MzkyXHU5NjFGXHU0RTJEXHVGRjA4XHU4MUVBXHU1MkE4XHU1RTc2XHU1M0QxXHU2MjY3XHU4ODRDXHVGRjA5JyxcclxuICAgICdkZXRhaWwuY2FyZFF1ZXVlZCc6ICdcdTYzOTJcdTk2MUZcdTdCNDlcdTVGODUgQUkgXHU4OUUzXHU4QkZCXHVGRjA4XHU1RTc2XHU1M0QxXHU0RTBBXHU5NjUwIDNcdUZGMENcdTkwN0ZcdTUxNERcdTYyNTNcdTZFRTFcdTZBMjFcdTU3OEJcdTdGNTFcdTUxNzNcdUZGMDknLFxyXG4gICAgJ2RldGFpbC5pbXBhY3QnOiAnXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHU1MjA2XHU2NzkwJyxcclxuICAgICdkZXRhaWwuaW1wYWN0TG9hZGluZyc6ICdcdTVGNzFcdTU0Q0RcdTYyNkJcdTYzQ0ZcdTRFMkRcdTIwMjZcdUZGMDhcdTVGMTVcdTc1MjhcdTY4QzBcdTdEMjIgKyBcdTU2RkVcdThDMzFcdTRGMjBcdTY0QURcdUZGMDknLFxyXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5JzogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNScsXHJcbiAgICAnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJzogJ1x1OEJDNFx1NUJBMVx1NEUyRFx1MjAyNlx1RkYwOFx1NEYxQVx1NEVBN1x1NTFGQVx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1NEUwRVx1NjcwMFx1NEYxOFx1NjAyN1x1N0VEM1x1OEJCQVx1RkYwOScsXHJcblxyXG4gICAgJ2ltcGFjdC5yaXNrJzogJ1x1OThDRVx1OTY2OScsXHJcbiAgICAnaW1wYWN0LmNvbC5jaGFuZ2VkJzogJ1x1NTNEOFx1NjZGNFx1NjU4N1x1NEVGNicsXHJcbiAgICAnaW1wYWN0LmNvbC5pbmRpcmVjdCc6ICdcdTk1RjRcdTYzQTVcdTVGNzFcdTU0Q0RcdUZGMDhcdTVGMTVcdTc1MjhcdTk0RkVcdUZGMDknLFxyXG4gICAgJ2ltcGFjdC5jb2wucG90ZW50aWFsJzogJ1x1NkY1Q1x1NTcyOFx1NUY3MVx1NTRDRCcsXHJcbiAgICAnaW1wYWN0Lm5vbmUnOiAnXHU2NzJBXHU1M0QxXHU3M0IwXHU0RUQzXHU1RTkzXHU1MTg1XHU1RjE1XHU3NTI4XHU4MDA1XHVGRjA4XHU2NTM5XHU1MkE4XHU3NzBCXHU0RjNDXHU3MkVDXHU3QUNCXHVGRjA5XHUzMDAyJyxcclxuICAgICdpbXBhY3QudGVzdHMnOiAnXHU1MTczXHU4MDU0XHU2RDRCXHU4QkQ1JyxcclxuICAgICdpbXBhY3QubGVnZW5kLmNoYW5nZWQnOiAnXHU1M0Q4XHU2NkY0JyxcclxuICAgICdpbXBhY3QubGVnZW5kLmluZGlyZWN0JzogJ1x1OTVGNFx1NjNBNScsXHJcbiAgICAnaW1wYWN0LmxlZ2VuZC5wb3RlbnRpYWwnOiAnXHU2RjVDXHU1NzI4JyxcclxuXHJcbiAgICAncmV2aWV3LnZlcmRpY3QnOiAnXHU2NzAwXHU0RjE4XHU2MDI3XHU3RUQzXHU4QkJBJyxcclxuICAgICdyZXZpZXcuaXNzdWVzJzogJ1x1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NScsXHJcbiAgICAncmV2aWV3LmNsZWFuJzogJ1x1NjcyQVx1NTNEMVx1NzNCMFx1OTVFRVx1OTg5OFx1MzAwMicsXHJcblxyXG4gICAgJ25vdGVzLnRpdGxlJzogJ1x1NjgzOFx1NjdFNVx1N0IxNFx1OEJCMCcsXHJcbiAgICAnbm90ZXMuZm9ybVRpdGxlJzogJ1x1N0IxNFx1OEJCMFx1NjgwN1x1OTg5OCcsXHJcbiAgICAnbm90ZXMuZm9ybUNvbnRlbnQnOiAnXHU3QjE0XHU4QkIwXHU1MTg1XHU1QkI5XHVGRjA4XHU3RUQzXHU4QkJBXHUzMDAxXHU3NTkxXHU5NUVFXHUzMDAxXHU1QjY2XHU0RTYwXHU4OTgxXHU3MEI5XHUyMDI2XHVGRjA5JyxcclxuICAgICdub3Rlcy5hZGQnOiAnXHU2REZCXHU1MkEwXHU3QjE0XHU4QkIwJyxcclxuICAgICdub3Rlcy5ib3VuZFRvJzogJ1x1NUMwNlx1NTE3M1x1ODA1NFx1NTIzMCcsXHJcbiAgICAnbm90ZXMuY29sLnRpbWUnOiAnXHU2NUY2XHU5NUY0JyxcclxuICAgICdub3Rlcy5jb2wudGl0bGUnOiAnXHU2ODA3XHU5ODk4JyxcclxuICAgICdub3Rlcy5jb2wuY29udGVudCc6ICdcdTUxODVcdTVCQjknLFxyXG4gICAgJ25vdGVzLmNvbC5zaGEnOiAnXHU1MTczXHU4MDU0XHU2M0QwXHU0RUE0JyxcclxuICAgICdub3Rlcy5yZW1vdmUnOiAnXHU1MjIwXHU5NjY0JyxcclxuICAgICdub3Rlcy5lbXB0eSc6ICdcdThGRDhcdTZDQTFcdTY3MDlcdTdCMTRcdThCQjBcdTMwMDJcdTY4MzhcdTY3RTVcdTYzRDBcdTRFQTRcdTY1RjZcdTk2OEZcdTYyNEJcdThCQjBcdTRFMEJcdTdFRDNcdThCQkFcdTRFMEVcdTc1OTFcdTk1RUVcdUZGMENcdTVDMzFcdTY2MkZcdTRGNjBcdTc2ODRcdTk4NzlcdTc2RUVcdTVCNjZcdTRFNjBcdTY4NjNcdTY4NDhcdTMwMDInLFxyXG5cclxuICAgICdtZW1vcnkucmVjb3JkJzogJ1x1OEJCMFx1NUY1NVx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNicsXHJcbiAgICAnZm9ybS5tZW1vcnlUaXRsZSc6ICdcdThCQjBcdTVGQzZcdTY4MDdcdTk4OTgnLFxyXG4gICAgJ2Zvcm0ubWVtb3J5Q29udGVudCc6ICdcdThCQjBcdTVGQzZcdTUxODVcdTVCQjlcdUZGMDhcdTRFQzBcdTRFNDhcdTRFMEVcdTRFM0FcdTRFQzBcdTRFNDhcdUZGMDknLFxyXG4gICAgJ21lbW9yeS5jb2wudGl0bGUnOiAnXHU2NzYxXHU3NkVFJyxcclxuICAgICdtZW1vcnkuY29sLnR5cGUnOiAnXHU3QzdCXHU1NzhCJyxcclxuICAgICdtZW1vcnkuY29sLnRydXRoJzogJ1x1NzcxRlx1NTAzQycsXHJcbiAgICAnbWVtb3J5LmNvbC5icmFuY2gnOiAnXHU1MjA2XHU2NTJGJyxcclxuICAgICdtZW1vcnkuY29uZmlybSc6ICdcdTc4NkVcdThCQTQnLFxyXG4gICAgJ21lbW9yeS5lbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdTMwMDJcdTUzRUZcdTU3MjhcdTgwNEFcdTU5MjlcdTRFMkRcdThCQTkgQUkgXHU4QkIwXHU1RjU1XHVGRjBDXHU2MjE2XHU1NzI4XHU0RTBBXHU2NUI5XHU2MjRCXHU1MkE4XHU2REZCXHU1MkEwXHUzMDAyJyxcclxuICAgICdjb25jZXB0cy50aXRsZSc6ICdcdTVCNjZcdTRFNjBcdTY5ODJcdTVGRjUnLFxyXG4gICAgJ2NvbmNlcHRzLm5vbmUnOiAnXHU2NjgyXHU2NUUwXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1XHUzMDAyXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHU4REQxXHU1QjhDXHU1M0Q4XHU2NkY0XHU1NDBFXHU4MUVBXHU1MkE4XHU2Qzg5XHU2REMwXHVGRjBDXHU0RTVGXHU1M0VGXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1NjAzQlx1N0VEM1x1NUI2Nlx1NEU2MFx1ODk4MVx1NzBCOVx1MzAwMicsXHJcbiAgICAnY29uY2VwdHMuY29sLm5hbWUnOiAnXHU2OTgyXHU1RkY1JyxcclxuICAgICdjb25jZXB0cy5jb2wuY2F0ZWdvcnknOiAnXHU3QzdCXHU1MjJCJyxcclxuICAgICdjb25jZXB0cy5jb2wuY291bnQnOiAnXHU2QjIxXHU2NTcwJyxcclxuICAgICdyZXZpZXcucmVjb3Jkc1RpdGxlJzogJ1JldmlldyBcdTk1RUVcdTk4OTgnLFxyXG4gICAgJ3Jldmlldy5yZWNvcmRzRW1wdHknOiAnXHU2NjgyXHU2NUUwXHU5NUVFXHU5ODk4XHU4QkIwXHU1RjU1XHUzMDAyXHU2M0QwXHU0RUE0XHU1QkExXHU2N0U1XHU5ODc1XHU4QkM0XHU1QkExXHU1MUZBXHU3Njg0XHU5NUVFXHU5ODk4XHU0RjFBXHU4MUVBXHU1MkE4XHU3NjdCXHU4QkIwXHU1MjMwXHU4RkQ5XHU5MUNDXHVGRjFCXHU5MUNEXHU2NUIwXHU4QkM0XHU1QkExXHU0RjFBXHU2NkZGXHU2MzYyXHU2NUU3XHU4QkIwXHU1RjU1XHUzMDAyJyxcclxuICAgICd2ZXJpZnkucmVjb3Jkcyc6ICdcdTlBOENcdTY1MzZcdThCQjBcdTVGNTUnLFxyXG4gICAgJ3ZlcmlmeS5yZWNvcmRzRW1wdHknOiAnXHU2NjgyXHU2NUUwXHU5QThDXHU2NTM2XHU4QkIwXHU1RjU1XHUzMDAyXHU1NzI4XHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHU3MEI5XHUzMDBDXHU5QThDXHU2NTM2XHUzMDBEXHU1MzczXHU3NTFGXHU2MjEwXHUzMDAyJyxcclxuXHJcbiAgICAnY29uZmlybWVkLnRpdGxlJzogJ1x1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1Rlx1RkYwOFx1NEVCQVx1NURFNVx1Nzg2RVx1OEJBNFx1RkYwQ0FJIFx1Nzk4MVx1NjUzOVx1ODFFQVx1NTJBOFx1NjJFNlx1NjIyQVx1RkYwOScsXHJcbiAgICAnY29uZmlybWVkLmFkZCc6ICdcdTZERkJcdTUyQTBcdTdFQTZcdTY3NUYnLFxyXG4gICAgJ2NvbmZpcm1lZC50ZXh0JzogJ1x1N0VBNlx1Njc1Ri9cdTk3MDBcdTZDNDJcdTUxODVcdTVCQjknLFxyXG4gICAgJ2NvbmZpcm1lZC5wYXRocyc6ICdcdTc5ODFcdTY1MzlcdThERUZcdTVGODRcdUZGMDhcdTkwMTdcdTUzRjdcdTUyMDZcdTk2OTRcdUZGMUJcdTc2RjhcdTVCRjlcdTk4NzlcdTc2RUVcdTY4MzlcdTU5ODIgc3JjL2NvcmVcdUZGMENcdTYyMTZcdTdFRERcdTVCRjlcdThERUZcdTVGODRcdUZGMDknLFxyXG4gICAgJ2NvbmZpcm1lZC5ub25lJzogJ1x1NjY4Mlx1NjVFMFx1N0VBNlx1Njc1Rlx1MzAwMlx1NkRGQlx1NTJBMFx1NTQwRVx1RkYwQ0FJIFx1NEZFRVx1NjUzOVx1NjcyQ1x1OTg3OVx1NzZFRVx1NzY4NFx1Nzk4MVx1NjUzOVx1OERFRlx1NUY4NFx1NUMwNlx1ODhBQlx1ODFFQVx1NTJBOFx1NjJEMlx1N0VERFx1RkYwOFx1NEVDNVx1NUJGOVx1NjcyQ1x1OTg3OVx1NzZFRVx1NzUxRlx1NjU0OFx1RkYwOVx1MzAwMicsXHJcblxyXG4gICAgJ2NoYW5nZXMudGl0bGUnOiAnXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExJyxcclxuICAgICdzdGF0ZS5ub0NoYW5nZXMnOiAnXHU2NjgyXHU2NUUwXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExXHUzMDAyXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1NTIxQlx1NUVGQVx1RkYwQ1x1NjIxNlx1NzUyOFx1NEUwQVx1NjVCOVx1MzAwQ1x1NjVCMFx1NUVGQVx1NTNEOFx1NjZGNFx1MzAwRFx1MzAwMicsXHJcbiAgICAnY2hhbmdlcy5jb2wudGl0bGUnOiAnXHU2ODA3XHU5ODk4JyxcclxuICAgICdjaGFuZ2VzLmNvbC50eXBlJzogJ1x1N0M3Qlx1NTc4QicsXHJcbiAgICAnY2hhbmdlcy5jb2wuc3RhdHVzJzogJ1x1NzJCNlx1NjAwMScsXHJcbiAgICAnY2hhbmdlcy5jb2wudXBkYXRlZCc6ICdcdTY2RjRcdTY1QjBcdTY1RjZcdTk1RjQnLFxyXG4gICAgJ2V4ZWMuY29sLnN0YXR1cyc6ICdcdTcyQjZcdTYwMDEnLFxyXG4gICAgJ2V4ZWMuY29sLmNoYW5nZSc6ICdcdTUzRDhcdTY2RjQnLFxyXG4gICAgJ2V4ZWMuY29sLnN0YXJ0ZWQnOiAnXHU1RjAwXHU1OUNCJyxcclxuICAgICdleGVjLmNvbC5jb3N0JzogJ1x1NjIxMFx1NjcyQyhcdTRGMzApJyxcclxuICAgICdleGVjLmF0dGVtcHRzJzogJ1x1NUMxRFx1OEJENVx1NkIyMVx1NjU3MCcsXHJcbiAgICAnZXhlYy5oaW50JzogJ1x1NjI2N1x1ODg0Q1x1RkYwOHN0YXJ0X3J1blx1RkYwOVx1OEJGN1x1NTcyOFx1NTNGM1x1NEZBN1x1ODA0QVx1NTkyOVx1NEUyRFx1NTNEMVx1OEQ3N1x1RkYxQVx1NTIxQlx1NUVGQVx1OEJBMVx1NTIxMlx1NTQwRVx1NUJGOSBBSSBcdThCRjRcdTMwMENcdTVGMDBcdTU5Q0JcdTYyNjdcdTg4NENcdThCRTUgY2hhbmdlXHUzMDBEXHUzMDAyXHU2NzJDXHU5ODc1XHU2N0U1XHU3NzBCXHU4RkRCXHU1RUE2XHU0RTBFXHU3RUQzXHU2NzlDXHUzMDAyJyxcclxuICAgICdzdGF0ZS5ub1J1bnMnOiAnXHU2NjgyXHU2NUUwXHU2MjY3XHU4ODRDXHU4QkIwXHU1RjU1XHUzMDAyJyxcclxuICAgICdzdGF0ZS50ZWNoU3RhY2snOiAnXHU2MjgwXHU2NzJGXHU2ODA4JyxcclxuICAgICdzdGF0ZS5zeW1ib2xzJzogJ1x1NURGMlx1N0QyMlx1NUYxNVx1N0IyNlx1NTNGNycsXHJcbiAgICAnc3RhdGUubWFuaWZlc3RzJzogJ1x1NkUwNVx1NTM1NVx1NjU4N1x1NEVGNicsXHJcbiAgICAnc3RhdGUuZXZpZGVuY2UnOiAnXHU4QkMxXHU2MzZFXHU2NzYxXHU3NkVFJyxcclxuICB9LFxyXG4gIGVuOiB7XHJcbiAgICAnd29ya3NwYWNlLnRpdGxlJzogJ1JldmlldyBEZXNrJyxcclxuICAgICd3b3Jrc3BhY2Uuc2VsZWN0U2Vzc2lvbic6ICdTZWxlY3QgYSBzZXNzaW9uIHVuZGVyIGEgd29ya3NwYWNlIG9uIHRoZSBsZWZ0IHRvIHZpZXcgaXRzIHByb2plY3QgZGF0YS4nLFxyXG4gICAgJ3RhYi5jb21taXRzJzogJ0NvbW1pdCBSZXZpZXcnLFxyXG4gICAgJ3RhYi5vdmVydmlldyc6ICdPdmVydmlldycsXHJcbiAgICAndGFiLmV4ZWN1dGlvbic6ICdFeGVjdXRpb24nLFxyXG4gICAgJ3RhYi5yZXZpZXcnOiAnUmV2aWV3IGlzc3VlcycsXHJcbiAgICAndGFiLm5vdGVzJzogJ05vdGVzICYgTWVtb3J5JyxcclxuICAgICd0YWIuc2V0dGluZ3MnOiAnU2V0dGluZ3MnLFxyXG4gICAgJ2Vycm9yLmxvYWQnOiAnRmFpbGVkIHRvIGxvYWQnLFxyXG4gICAgJ3N0YXRlLnByb2plY3QnOiAnQ3VycmVudCBwcm9qZWN0JyxcclxuICAgICdzdGF0ZS5ub1Byb2plY3QnOiAnTm8gcHJvamVjdCBpbml0aWFsaXplZCcsXHJcbiAgICAnc3RhdGUubm9Qcm9qZWN0SGludCc6ICdSdW4gXCJJbml0aWFsaXplIHByb2plY3RcIiB0byBzY2FuIHRoZSByZXBvc2l0b3J5IHN0cnVjdHVyZSwgdGVjaCBzdGFjaywgYW5kIHN5bWJvbCBpbmRleC4nLFxyXG4gICAgJ2FjdGlvbi5ib290c3RyYXAnOiAnSW5pdGlhbGl6ZSBwcm9qZWN0JyxcclxuICAgICdhY3Rpb24ucmVzY2FuJzogJ1JlLWluaXRpYWxpemUgLyBzY2FuJyxcclxuICAgICdhY3Rpb24uYW5hbHl6ZSc6ICdBbmFseXplIHdvcmtpbmcgZGlmZicsXHJcbiAgICAnYWN0aW9uLnJldmlldyc6ICdSZXZpZXcgd29ya2luZyBkaWZmJyxcclxuICAgICdhY3Rpb24udmVyaWZ5JzogJ1ZlcmlmeSB3b3JraW5nIGRpZmYnLFxyXG4gICAgJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnOiAnQ3JlYXRlIGNoYW5nZScsXHJcbiAgICAnYWN0aW9uLnJ1bm5pbmcnOiAnUnVubmluZ1x1MjAyNicsXHJcbiAgICAnYWN0aW9uLnJlZnJlc2gnOiAnUmVmcmVzaCcsXHJcbiAgICAnZm9ybS5jaGFuZ2VUaXRsZSc6ICdDaGFuZ2UgdGl0bGUnLFxyXG4gICAgJ2Zvcm0uY2hhbmdlRGVzYyc6ICdSZXF1aXJlbWVudCBhbmQgYmFja2dyb3VuZCAob3B0aW9uYWwpJyxcclxuICAgICdyZXN1bHQucGFuZWwnOiAnQWN0aW9uIHJlc3VsdCcsXHJcblxyXG4gICAgJ3JlcG8uYWRkJzogJ0FkZCByZXBvJyxcclxuICAgICdyZXBvLmFkZEhpbnQnOiAnRW50ZXIgYW4gYWJzb2x1dGUgcmVwbyBwYXRoIGFuZCBwcmVzcyBFbnRlcjsgcHJldmlvdXNseSB1c2VkIHJlcG9zIGFyZSByZW1lbWJlcmVkJyxcclxuICAgICdyZXBvLnNjYW5IaXN0b3J5JzogJ1JlYnVpbGQgaGlzdG9yeScsXHJcbiAgICAncmVwby5jb21taXRzJzogJ2NvbW1pdHMnLFxyXG4gICAgJ3JlcG8uYnJhbmNoJzogJ2JyYW5jaCcsXHJcbiAgICAncmVwby53b3JraW5nJzogJ1VuY29tbWl0dGVkIGNoYW5nZXMnLFxyXG4gICAgJ3JlcG8ud29ya2luZ0NsZWFuJzogJ1dvcmtpbmcgdHJlZSBpcyBjbGVhbicsXHJcbiAgICAncmVwby5lbXB0eSc6ICdObyBjb21taXRzLicsXHJcbiAgICAncmVwby5sb2FkRmFpbGVkJzogJ0ZhaWxlZCB0byBsb2FkIGNvbW1pdHMnLFxyXG4gICAgJ3BpY2tlci50aXRsZSc6ICdQaWNrIGNvbW1pdHMgdG8gcmV2aWV3IChtdWx0aS1zZWxlY3QpJyxcclxuICAgICdwaWNrZXIucGxhY2Vob2xkZXInOiAnQ2xpY2sgdG8gcGljayBjb21taXRzIChtdWx0aS1zZWxlY3QsIGluY2x1ZGVzIHVuY29tbWl0dGVkKScsXHJcbiAgICAncGlja2VyLnNlbGVjdGVkJzogJ1NlbGVjdGVkJyxcclxuICAgICdwaWNrZXIuZmlsdGVyJzogJ0ZpbHRlciBieSB0aXRsZS9oYXNoL2F1dGhvclx1MjAyNicsXHJcbiAgICAncGlja2VyLmNsZWFyJzogJ0NsZWFyJyxcclxuICAgICdwaWNrZXIubm9NYXRjaCc6ICdObyBtYXRjaGluZyBjb21taXQuJyxcclxuICAgICdwaWNrZXIuaGludCc6ICdDaGVja2luZyBhIGNvbW1pdCBnZW5lcmF0ZXMgaXRzIEFJIGV4cGxhbmF0aW9uOyBydW4gaW1wYWN0IGFuZCBvcHRpbWFsaXR5IGJlbG93LicsXHJcbiAgICAncGlja2VyLnJvdW5kJzogJ1JvdW5kIHtufScsXHJcbiAgICAncGlja2VyLnJvdW5kTGF0ZXN0JzogJ1JvdW5kIHtufSAobGF0ZXN0KScsXHJcbiAgICAncGlja2VyLnJvdW5kU2VsZWN0JzogJ1NlbGVjdCByb3VuZCcsXHJcbiAgICAncGlja2VyLnJvdW5kQ2xlYXInOiAnQ2xlYXIgcm91bmQnLFxyXG4gICAgJ3BpY2tlci51bmRpZ2VzdGVkJzogJ05ldyBjb21taXRzIHNpbmNlIHRoZSBsYXN0IEFJIHN1bW1hcnkgd2l0aG91dCBBSSBhbmFseXNpcyB5ZXQnLFxyXG4gICAgJ3BpY2tlci51bmRpZ2VzdGVkQ291bnQnOiAne259IHVucmV2aWV3ZWQgY29tbWl0cycsXHJcbiAgICAncGlja2VyLnNlbGVjdEFsbFVuZGlnZXN0ZWQnOiAnU2VsZWN0IHVuZGlnZXN0ZWQnLFxyXG4gICAgJ3BpY2tlci5kaWdlc3RBbGwnOiAnRGlnZXN0IGFsbCcsXHJcbiAgICAncGlja2VyLmRpZ2VzdEFsbEhpbnQnOiAnU2VsZWN0IGFsbCB1bmRpZ2VzdGVkIGNvbW1pdHMgYW5kIGJhdGNoIEFJIGFuYWx5c2lzIChjb25jdXJyZW5jeSAzLCBjYWNoZWQpLCBhdXRvLWdlbmVyYXRlIHRoZSBuYXJyYXRpdmUgYWZ0ZXJ3YXJkczsgdGhlbiBjcmVhdGUgYW4gQUkgc3VtbWFyeSBpbiBOb3RlcyAmIE1lbW9yeSB0byByZXNldCB0aGUgbWFya2VyJyxcclxuICAgICduYXJyYXRpdmUuZGlnZXN0SGludCc6ICdOYXJyYXRpdmUgZ2VuZXJhdGVkLiBDcmVhdGUgYW4gQUkgc3VtbWFyeSBpbiBOb3RlcyAmIE1lbW9yeSB0byByZXNldCB0aGUgdW5kaWdlc3RlZCBtYXJrZXIuJyxcclxuICAgICdpbXBhY3QuZmFjdG9ycyc6ICdSaXNrIGZhY3RvcnMgKHdoeSB0aGlzIGxldmVsKScsXHJcbiAgICAnaW1wYWN0LnBvaW50cyc6ICdJbXBhY3RlZCBwb2ludHMnLFxyXG4gICAgJ2ltcGFjdC5rZXlQb2ludHMnOiAnS2V5IGNvbXBvbmVudHMnLFxyXG4gICAgJ2ltcGFjdC5tZW1vcnknOiAnQ3Jvc3MtY2hlY2sgd2l0aCBwcm9qZWN0IG1lbW9yeScsXHJcbiAgICAnaW1wYWN0LmZ1bmN0aW9ucyc6ICdJbXBhY3RlZCBmdW5jdGlvbnMgKHdobyBjYWxscyB0aGUgY2hhbmdlZCBjb2RlKScsXHJcbiAgICAnaW1wYWN0LmZ1bmNSb2xlJzogJ0Z1bmN0aW9uIHJvbGUnLFxyXG4gICAgJ2ltcGFjdC5mdW5jQ2hhbmdlJzogJ0NoYW5nZWQgYnkgdGhpcyBjb21taXQnLFxyXG4gICAgJ2ltcGFjdC5mdW5jQ2FsbGVycyc6ICdJbXBhY3Qgb24gY2FsbGVycycsXHJcbiAgICAnY2FjaGUuaGl0JzogJ2Zyb20gY2FjaGUnLFxyXG4gICAgJ2NhY2hlLnJlZ2VuZXJhdGUnOiAnUmVnZW5lcmF0ZScsXHJcbiAgICAnY29zdC50b29sdGlwJzogJ0VzdGltYXRlZCBjb3N0IG9mIHRoaXMgQUkgY2FsbCAoRGVlcFNlZWsgcHJpY2luZyknLFxyXG4gICAgJ2V4ZWMuY3JlYXRlJzogJ05ldyBydW4nLFxyXG4gICAgJ2V4ZWMuZm9ybVRpdGxlJzogJ1doYXQgdG8gZG8gKG9uZSBsaW5lKScsXHJcbiAgICAnZXhlYy5mb3JtRGVzYyc6ICdSZXF1aXJlbWVudDogZ29hbCwgbW9kdWxlcywgYWNjZXB0YW5jZScsXHJcbiAgICAnZXhlYy5zdGFydCc6ICdTdGFydCBydW4nLFxyXG4gICAgJ2V4ZWMuc3RhcnRpbmcnOiAnU3RhcnRpbmdcdTIwMjYnLFxyXG4gICAgJ2V4ZWMuY3JlYXRlSGludCc6ICdDcmVhdGVzIGEgY2hhbmdlLCBnZW5lcmF0ZXMgYSBwbGFuLCB0aGVuIEFJIHN1YmFnZW50cyBleGVjdXRlIHN0ZXAgYnkgc3RlcDsgcHJvZ3Jlc3MgcmVmcmVzaGVzIGJlbG93LicsXHJcbiAgICAnZXhlYy5tb2RlbERlZmF1bHQnOiAnRXhlY3V0aW9uIG1vZGVsIChyb2xlIGRlZmF1bHRzOiBhbmFseXNpcy9vcHM9ZmFzdCwgY29kaW5nPXN0YW5kYXJkLCBwbGFubmluZz1yZWFzb25pbmcsIHZlcmlmaWNhdGlvbj12ZXJpZmllciknLFxyXG4gICAgJ2JhZGdlLnJ1bm5pbmcnOiAne259IHJ1bnMgaW4gcHJvZ3Jlc3MsIGNsaWNrIHRvIHZpZXcnLFxyXG4gICAgJ25hcnJhdGl2ZS50aXRsZSc6ICdXb3JrLXJvdW5kIG5hcnJhdGl2ZScsXHJcbiAgICAnbmFycmF0aXZlLmdlbmVyYXRlJzogJ0ludGVycHJldCB0aGlzIHJvdW5kIG9mIHdvcmsnLFxyXG4gICAgJ25hcnJhdGl2ZS5ydW5uaW5nJzogJ0dlbmVyYXRpbmdcdTIwMjYgKH4xMC0zMHMpJyxcclxuICAgICdiYWRnZS5mYWlsZWQnOiAne259IHJ1bnMgbmVlZCBhdHRlbnRpb24sIGNsaWNrIHRvIHZpZXcnLFxyXG4gICAgJ2V4ZWMuZmxvd0NyZWF0ZSc6ICdEZXNjcmliZSB0aGUgdGFzaycsXHJcbiAgICAnZXhlYy5mbG93T3JjaGVzdHJhdGUnOiAnQ29uZmlybSBvcmNoZXN0cmF0aW9uIChwZXItc3RlcCBtb2RlbC9yb2xlL2ZhaWx1cmUgcG9saWN5KScsXHJcbiAgICAnZXhlYy5mbG93UnVuJzogJ0xhdW5jaCAodHJhY2sgcHJvZ3Jlc3MgJiBjb3N0IGluIHJ1biBkZXRhaWwpJyxcclxuICAgICdleGVjLmZsb3dNZW1vcnknOiAnQXV0by1kaXN0aWxsIG1lbW9yaWVzIChjb25maXJtIGluIG1lbW9yeSBwYW5lbCknLFxyXG4gICAgJ2V4ZWMucGxhbm5pbmcnOiAnR2VuZXJhdGluZyBvcmNoZXN0cmF0aW9uXHUyMDI2IChMTE0gaXMgZGVjb21wb3NpbmcgdGhlIHRhc2ssIH4xMC0zMHMpJyxcclxuICAgICdleGVjLmNvbC5zdGVwcyc6ICdTdGVwcycsXHJcbiAgICAnbm90ZXMuZWRpdCc6ICdFZGl0JyxcclxuICAgICdub3Rlcy50b01lbW9yeSc6ICdUbyBtZW1vcnknLFxyXG4gICAgJ25vdGVzLnRvTWVtb3J5SGludCc6ICdQcmVmaWxsIHRoZSBtZW1vcnkgZm9ybSBiZWxvdyB3aXRoIHRoaXMgbm90ZScsXHJcbiAgICAnbm90ZXMudG9NZW1vcnlEb25lJzogJ1x1MjcxMyBQcmVmaWxsZWQgdGhlIG1lbW9yeSBmb3JtIChjaG9vc2UgYSB0eXBlIGluIHRoZSBQcm9qZWN0IG1lbW9yeSB6b25lIGJlbG93LCB0aGVuIGFkZCknLFxyXG4gICAgJ25vdGVzLmNvcHlNZCc6ICdDb3B5IE1EJyxcclxuICAgICdub3Rlcy5jb3B5TWRIaW50JzogJ0NvcHkgdGhpcyBub3RlIGFzIE1hcmtkb3duIHRvIHRoZSBjbGlwYm9hcmQnLFxyXG4gICAgJ25vdGVzLmNvcHlNZERvbmUnOiAnQ29waWVkIGFzIE1hcmtkb3duJyxcclxuICAgICdub3Rlcy5leHBvcnRNZCc6ICdFeHBvcnQgTUQnLFxyXG4gICAgJ25vdGVzLmV4cG9ydE1kSGludCc6ICdEb3dubG9hZCBhcyBhIC5tZCBmaWxlJyxcclxuICAgICdub3Rlcy5leHBvcnREb25lJzogJ0V4cG9ydGVkIGFzIC5tZCcsXHJcbiAgICAnbm90ZXMuZGlnZXN0TmV2ZXInOiAnTm8gQUkgc3VtbWFyeSBnZW5lcmF0ZWQgeWV0JyxcclxuICAgICdub3Rlcy5kaWdlc3RQZW5kaW5nJzogJ3tufSBuZXcgY29tbWl0cyBzaW5jZSB0aGUgbGFzdCBzdW1tYXJ5JyxcclxuICAgICdkZXRhaWwuc2F2ZU5vdGUnOiAnU2F2ZSBhcyBub3RlJyxcclxuICAgICdkZXRhaWwuc2F2ZU5vdGVIaW50JzogJ1NhdmUgdGhpcyByZXZpZXcgY29uY2x1c2lvbiAod2hhdC9sb2dpYy9yaXNrcykgYXMgYSBzdHJ1Y3R1cmVkIG5vdGUnLFxyXG4gICAgJ2RldGFpbC5zYXZlTm90ZVRpdGxlJzogJ1JldmlldyByZWNvcmQnLFxyXG4gICAgJ2RldGFpbC5zYXZlTWVtb3J5JzogJ0Rpc3RpbGwgdG8gbWVtb3J5JyxcclxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeUhpbnQnOiAnRGlzdGlsbCB0aGlzIHJldmlldyBjb25jbHVzaW9uIGludG8gYSBwcm9qZWN0IG1lbW9yeSAocXVldWVkIGZvciBjb25maXJtYXRpb24pJyxcclxuICAgICdub3Rlcy5zYXZlJzogJ1NhdmUnLFxyXG4gICAgJ25vdGVzLmNhbmNlbCc6ICdDYW5jZWwnLFxyXG4gICAgJ21lbW9yeS5icmFuY2hTY29wZSc6ICdCcmFuY2gnLFxyXG4gICAgJ21lbW9yeS5icmFuY2hBbGwnOiAnQWxsIGJyYW5jaGVzJyxcclxuICAgICdub3Rlcy5zZWFyY2gnOiAnU2VhcmNoIG5vdGVzXHUyMDI2JyxcclxuICAgICdtb2RlbC50aXRsZSc6ICdNb2RlbCBhc3NpZ25tZW50ICh3aGljaCBtb2RlbCBwZXIgdGFzayknLFxyXG4gICAgJ21vZGVsLmxvYWRpbmcnOiAnTG9hZGluZyBtb2RlbHNcdTIwMjYnLFxyXG4gICAgJ21vZGVsLmZvbGxvd0NoYXQnOiAnRm9sbG93IGNoYXQgbW9kZWwnLFxyXG4gICAgJ21vZGVsLnNhdmUnOiAnU2F2ZSAmIGFwcGx5JyxcclxuICAgICdtb2RlbC5zYXZlZCc6ICdBcHBsaWVkJyxcclxuICAgICdtb2RlbC5oaW50JzogJ0FwcGxpZXMgaW1tZWRpYXRlbHkgYW5kIHBlcnNpc3RzIGFjcm9zcyByZXN0YXJ0czsgY2hhdCBtb2RlbCB1bmFmZmVjdGVkLicsXHJcbiAgICAnbm90ZXMuYWlTdW1tYXJ5JzogJ0FJIHN1bW1hcnknLFxyXG4gICAgJ25vdGVzLmFpU3VtbWFyeVJ1bic6ICdTdW1tYXJpemluZ1x1MjAyNiAoMTAtMzBzKScsXHJcbiAgICAnbm90ZXMuZXhwYW5kJzogJ0V4cGFuZCcsXHJcbiAgICAnbm90ZXMuY29sbGFwc2UnOiAnQ29sbGFwc2UnLFxyXG4gICAgJ25vdGVzLnN1bW1hcnlUYWcnOiAnQUkgc3VtbWFyeScsXHJcbiAgICAnbm90ZXMuZW1wdHlTZWFyY2gnOiAnTm8gbWF0Y2hpbmcgbm90ZXMuJyxcclxuICAgICdub3Rlcy5jb250ZW50SGludCc6ICdOb3RlIGNvbnRlbnQgKG11bHRpLWxpbmUpOiBjb25jbHVzaW9ucywgcXVlc3Rpb25zLCBsZWFybmluZ3NcdTIwMjYnLFxyXG4gICAgJ25vdGVzLnRhZ3NIaW50JzogJ1RhZ3MgKGNvbW1hIHNlcGFyYXRlZCwgb3B0aW9uYWw7IGNsaWNrIGEgdGFnIHRvIGZpbHRlciknLFxyXG4gICAgJ25vdGVzLnBpbic6ICdQaW4nLFxyXG4gICAgJ25vdGVzLnVucGluJzogJ1VucGluJyxcclxuICAgICdub3Rlcy5lZGl0ZWRBdCc6ICdlZGl0ZWQnLFxyXG4gICAgJ3Jldmlldy5maWx0ZXJBbGwnOiAnQWxsJyxcclxuICAgICdyZXZpZXcuc3RhdHVzQWxsJzogJ0FsbCBzdGF0dXNlcycsXHJcbiAgICAncmV2aWV3LnZlcmlmeSc6ICdSZS12ZXJpZnknLFxyXG4gICAgJ3Jldmlldy52ZXJpZnlSdW5uaW5nJzogJ1ZlcmlmeWluZ1x1MjAyNicsXHJcbiAgICAncmV2aWV3LnZlcmlmeUhpbnQnOiAnQWZ0ZXIgZml4aW5nIHRoZSBjb2RlLCBjbGljayB0byByZS1jaGVjazogd2hldGhlciBpc3N1ZXMgYXJlIGZpeGVkLCB3aGV0aGVyIHRoZSBjaGFuZ2UgaXMgb3B0aW1hbCBhbmQgbWluaW1hbGx5IGludmFzaXZlLCBhbmQgd2hldGhlciBuZXcgaXNzdWVzIGFwcGVhcmVkLiBPbmx5IGEgcGFzc2luZyByZS12ZXJpZmljYXRpb24gbWFya3MgaXNzdWVzIHJlc29sdmVkLicsXHJcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmUnOiAnRmFsc2UgcG9zaXRpdmUnLFxyXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlSGludCc6ICdIdW1hbi1tYXJrIHRoaXMgaXNzdWUgYXMgYSBmYWxzZSBwb3NpdGl2ZSBhbmQgY2xvc2UgaXQgKGRpc3RpbmN0IGZyb20gYSB2ZXJpZmllZCBmaXgpJyxcclxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZVRpdGxlJzogJ01hcmsgYXMgZmFsc2UgcG9zaXRpdmU/JyxcclxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZU1zZyc6ICdcInt0aXRsZX1cIiB3aWxsIGJlIG1hcmtlZCByZWplY3RlZCBhbmQgcmVtb3ZlZCBmcm9tIHRoZSBvcGVuIHF1ZXVlLicsXHJcbiAgICAncmV2aWV3LmZpeERldGFpbCc6ICdGaXggZGV0YWlscycsXHJcbiAgICAncmV2aWV3LmZpeFN0YXRGaWxlcyc6ICdmaWxlcycsXHJcbiAgICAncmV2aWV3LmZpeEZpbGVzJzogJ0ZpbGVzIHRvdWNoZWQgYnkgdGhlIGZpeCcsXHJcbiAgICAncmV2aWV3LmZpeEltcGFjdCc6ICdJbXBhY3Qgc2NvcGUgKGNoYW5nZWQgc3ltYm9scyBhbmQgY2FsbGVycyknLFxyXG4gICAgJ3Jldmlldy5kZWZpbmVkSW4nOiAnZGVmaW5lZCBpbicsXHJcbiAgICAncmV2aWV3LmNhbGxDb3VudCc6ICdjYWxsIHNpdGUocyknLFxyXG4gICAgJ3Jldmlldy5maXhEaWZmJzogJ0ZpeCBkaWZmIChyZWxhdGl2ZSB0byB0aGUgcmV2aWV3IGJhc2VsaW5lKScsXHJcbiAgICAncmV2aWV3LnJlZnJlc2gnOiAnUmVmcmVzaCcsXHJcbiAgICAncmV2aWV3LnJldGVudGlvbkhpbnQnOiAnUmVzb2x2ZWQgLyBmYWxzZS1wb3NpdGl2ZSBpc3N1ZXMgYXJlIGF1dG8tcHVyZ2VkIGFmdGVyIHtkYXlzfSBkYXkocyknLFxyXG4gICAgJ3Jldmlldy50YXJnZXQnOiAnVGFyZ2V0JyxcclxuICAgICdyZXZpZXcud29ya2luZ1RhcmdldCc6ICdXb3JraW5nIHRyZWUnLFxyXG4gICAgJ3Jldmlldy5leHBvcnRNZCc6ICdFeHBvcnQgTUQnLFxyXG4gICAgJ3Jldmlldy5leHBvcnRNZEhpbnQnOiAnRG93bmxvYWQgdGhlIGZpbHRlcmVkIGlzc3VlIGxpc3QgYXMgYSAubWQgZmlsZScsXHJcbiAgICAncmV2aWV3LmV4cG9ydEVtcHR5JzogJ05vIGlzc3VlcyB0byBleHBvcnQnLFxyXG4gICAgJ3Jldmlldy5zZWxlY3RBbGwnOiAnU2VsZWN0IGFsbCcsXHJcbiAgICAncmV2aWV3LmNoZWNrZWRDb3VudCc6ICd7bn0gc2VsZWN0ZWQnLFxyXG4gICAgJ3Jldmlldy5tYXJrSGFuZGxlZCc6ICdNYXJrIGhhbmRsZWQnLFxyXG4gICAgJ3Jldmlldy5iYXRjaFZlcmlmeSc6ICdCYXRjaCB2ZXJpZnknLFxyXG4gICAgJ3Jldmlldy5iYXRjaFZlcmlmeUNvbmZpcm1UaXRsZSc6ICdCYXRjaCB2ZXJpZnk/JyxcclxuICAgICdyZXZpZXcuYmF0Y2hWZXJpZnlDb25maXJtTXNnJzogJ1dpbGwgdmVyaWZ5IHtufSByZXZpZXcgdGFyZ2V0cyBvbmUgYnkgb25lIChzZXJpYWwgTExNIGNhbGxzLCB+MTAtNjBzIGVhY2gsIGNvbnN1bWVzIG1vZGVsIHVzYWdlKTsgeW91IGNhbiBzdG9wIGFueXRpbWUuJyxcclxuICAgICdyZXZpZXcuYmF0Y2hTdG9wJzogJ1N0b3AnLFxyXG4gICAgJ3Jldmlldy5iYXRjaFByb2dyZXNzJzogJ0JhdGNoIHZlcmlmeWluZyB7aX0ve259JyxcclxuICAgICdyZXZpZXcuYmF0Y2hEb25lJzogJ0JhdGNoIHZlcmlmeSBkb25lOiB7YX0gcmVzb2x2ZWQgXHUwMEI3IHtifSBzdGlsbCBvcGVuIFx1MDBCNyB7Y30gbmV3IFx1MDBCNyB7ZH0gZmFpbGVkIHRhcmdldHMnLFxyXG4gICAgJ3Jldmlldy5iYXRjaFN0b3BwZWQnOiAnQmF0Y2ggdmVyaWZ5IHN0b3BwZWQnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2UnOiAnXHVEODNFXHVEREY5IFRyaWFnZSBhbGwnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VIaW50JzogJ0xMTSBob2xpc3RpYyBzY2FuIG92ZXIgYWxsIHBlbmRpbmcgaXNzdWVzOiBkdXBsaWNhdGVzL29ic29sZXRlL25vbi1pc3N1ZXMgYXJlIGNsb3NlZCBpbW1lZGlhdGVseSB3aXRoIGV2aWRlbmNlIChyZW9wZW5hYmxlKTsgcmVhbCBpc3N1ZXMgc3RheSBmb3IgZml4IGRpc3BhdGNoJyxcclxuICAgICdyZXZpZXcudHJpYWdlQ29uZmlybVRpdGxlJzogJ1RyaWFnZSBhbGwgcGVuZGluZyBpc3N1ZXM/JyxcclxuICAgICdyZXZpZXcudHJpYWdlQ29uZmlybU1zZyc6ICdXaWxsIHNjYW4gYWxsIHBlbmRpbmcgaXNzdWVzIHdpdGggdGhlIExMTSBpbiBiYXRjaGVzICh1cCB0byB7bn0gcGVyIGJhdGNoLCBjb25zdW1lcyBtb2RlbCB1c2FnZSkuIElzc3VlcyBqdWRnZWQgZHVwbGljYXRlL29ic29sZXRlL25vbi1pc3N1ZXMgYXJlIGNsb3NlZCBJTU1FRElBVEVMWSB3aXRoIGV2aWRlbmNlIFx1MjAxNCBldmVyeSBjbG9zdXJlIGlzIHJldmlld2FibGUgYW5kIHJlb3BlbmFibGUgb24gdGhlIGlzc3VlIGNhcmQuIFJlYWwgaXNzdWVzIHN0YXkgZm9yIGZpeCBkaXNwYXRjaC4nLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VQcm9ncmVzcyc6ICdUcmlhZ2luZzoge259IHByb2Nlc3NlZCwgfnttfSByZW1haW5pbmcnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VTdG9wJzogJ1N0b3AnLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VEb25lJzogJ1RyaWFnZSBkb25lOiBjbG9zZWQge2F9IGR1cGxpY2F0ZSBcdTAwQjcge2J9IG9ic29sZXRlIFx1MDBCNyB7Y30gbm9uLWlzc3Vlczsge2R9IHBlbmRpbmcga2VwdCcsXHJcbiAgICAncmV2aWV3LnRyaWFnZVN0b3BwZWQnOiAnVHJpYWdlIHN0b3BwZWQgKGp1ZGdlZCBpdGVtcyBhcmUgbm90IHJlLWJpbGxlZDsgY2xpY2sgYWdhaW4gdG8gY29udGludWUpJyxcclxuICAgICdyZXZpZXcudHJpYWdlTm90aGluZyc6ICdObyBwZW5kaW5nIGlzc3VlcyB0byB0cmlhZ2UgZm9yIHRoZSBwcm9qZWN0IHRoaXMgc2Vzc2lvbiByZXNvbHZlcyB0byAoaWYgdGhpcyBsb29rcyB3cm9uZywgY2hlY2sgdGhlIG9wZW4gc2Vzc2lvbiBiZWxvbmdzIHRvIHRoYXQgcHJvamVjdCknLFxyXG4gICAgJ3Jldmlldy50cmlhZ2VQYXJzZUZhaWwnOiAnOyBvbmUgYmF0Y2ggZmFpbGVkIHRvIHBhcnNlIGFuZCB3YXMga2VwdCBhcy1pcywgcmV0cnlhYmxlJyxcclxuICAgICdyZXZpZXcucHVyZ2VPcGVuJzogJ1x1RDgzRFx1REREMSBQdXJnZSBwZW5kaW5nJyxcclxuICAgICdyZXZpZXcucHVyZ2VPcGVuSGludCc6ICdNYXJrIGV2ZXJ5IHBlbmRpbmcgaXNzdWUgdW5kZXIgdGhlIGN1cnJlbnQgZmlsdGVyIGFzIGhhbmRsZWQgaW4gb25lIHNob3QgKG5vIGNvZGUgY2hhbmdlcyk7IGF1dG8tcHVyZ2VkIGFmdGVyIHRoZSByZXRlbnRpb24gd2luZG93JyxcclxuICAgICdyZXZpZXcucHVyZ2VPcGVuQ29uZmlybVRpdGxlJzogJ1B1cmdlIGFsbCBwZW5kaW5nIGlzc3Vlcz8nLFxyXG4gICAgJ3Jldmlldy5wdXJnZU9wZW5Db25maXJtTXNnJzogJ1dpbGwgbWFyayB7bn0gcGVuZGluZyBpc3N1ZXMgYXMgXCJoYW5kbGVkXCIgXHUyMDE0IG5vIGNvZGUgaXMgbW9kaWZpZWQsIG9ubHkgdGhlIGxpc3QgZW50cmllcyBhcmUgY2xvc2VkLiBSZXNvbHZlZC9yZWplY3RlZCBpc3N1ZXMgYXJlIHVudG91Y2hlZC4gTm90IG9uZS1jbGljayB1bmRvYWJsZSwgYnV0IGVhY2ggaXNzdWUgY2FuIGJlIHNldCBiYWNrIHRvIHBlbmRpbmcgb24gaXRzIGNhcmQuJyxcclxuICAgICdyZXZpZXcucHVyZ2VPcGVuRG9uZSc6ICdcdTVERjJcdTZFMDVcdTdBN0Ege259IFx1Njc2MVx1NjcyQVx1ODlFM1x1NTFCM1x1OTVFRVx1OTg5OFx1RkYwOFx1N0Y2RVx1NEUzQVx1NURGMlx1NTkwNFx1NzQwNlx1RkYwOScsXHJcbiAgICAncmV2aWV3LmhhbmRsZWREb25lJzogJ3tufSBpc3N1ZXMgbWFya2VkIGFzIGhhbmRsZWQnLFxyXG4gICAgJ2ZpeC5wbGFuJzogJ0ZpeCBwbGFuJyxcclxuICAgICdmaXgucGxhbkFwcHJvYWNoJzogJ0FwcHJvYWNoJyxcclxuICAgICdmaXgucGxhbkltcGFjdCc6ICdJbXBhY3QnLFxyXG4gICAgJ2ZpeC5wbGFuQmVuZWZpdCc6ICdCZW5lZml0JyxcclxuICAgICdmaXgucGxhblJpc2snOiAnUmlzaycsXHJcbiAgICAnZml4LmRpc3BhdGNoJzogJ0Rpc3BhdGNoIGZpeGVzJyxcclxuICAgICdmaXguZGlzcGF0Y2hIaW50TWFpbic6ICdEaXNwYXRjaCB0aGUgY2hlY2tlZCBwZW5kaW5nIGlzc3VlcyAodW5jaGVja2VkID0gYWxsIHVuZGVyIHRoZSBjdXJyZW50IGZpbHRlcikgdG8gY29uY3VycmVudCBzdWItYWdlbnRzOiBhdXRvIGZpeCA9IHRocmVlLWdhdGUgdmVyaWZ5ICsgZml4ICsgd3JpdGUtYmFjayArIGNvbW1pdDsgcGxhbiBmaXJzdCA9IHJlYWQtb25seSBzdHJ1Y3R1cmVkIHBsYW5zIGF3YWl0aW5nIHlvdXIgYXBwcm92YWwnLFxyXG4gICAgJ2ZpeC5kaXNwYXRjaE1vZGVUaXRsZSc6ICdEaXNwYXRjaCBmaXhlcyBcdTIwMTQgcGljayBhIG1vZGUnLFxyXG4gICAgJ2ZpeC5kaXNwYXRjaE1vZGVNc2cnOiAnV2lsbCBkaXNwYXRjaCB7bn0gcGVuZGluZyBpc3N1ZXMgdG8gY29uY3VycmVudCBzdWItYWdlbnRzIChvbmUgd29ya3RyZWUgcGVyIHRhc2ssIGNvbnN1bWVzIG1vZGVsIHVzYWdlLCBkb2VzIG5vdCB1c2UgdGhlIGNoYXQgd2luZG93KS4gXHUyNkExIEF1dG8gZml4OiB0aHJlZS1nYXRlIHZlcmlmeSArIGZpeCArIHdyaXRlLWJhY2sgKyBjb21taXQ7IGZhbHNlIHBvc2l0aXZlcy9kdXBsaWNhdGVzL29ic29sZXRlIGFyZSBhdXRvLWNsb3NlZC4gXHVEODNEXHVEQ0NCIFBsYW4gZmlyc3Q6IHJlYWQtb25seSBzdHJ1Y3R1cmVkIHBsYW5zLCBubyBjb2RlIGNoYW5nZXM7IGFwcHJvdmUgdGhlbSBvbiB0aGUgaXNzdWUgY2FyZCwgdGhlbiBwcmVzcyBcIkRpc3BhdGNoIGFwcHJvdmVkIHBsYW5zXCIuJyxcclxuICAgICdmaXguZGlzcGF0Y2hBdXRvJzogJ1x1MjZBMSBBdXRvIGZpeCcsXHJcbiAgICAnZml4LmRpc3BhdGNoUGxhbic6ICdcdUQ4M0RcdURDQ0IgUGxhbiBmaXJzdCcsXHJcbiAgICAnZml4LmRpc3BhdGNoTm9PcGVuJzogJ05vIHBlbmRpbmcgaXNzdWVzIHVuZGVyIHRoZSBjdXJyZW50IGZpbHRlciB0byBkaXNwYXRjaCcsXHJcbiAgICAnZml4LmRpc3BhdGNoUGxhbnMnOiAnRGlzcGF0Y2ggYXBwcm92ZWQgcGxhbnMnLFxyXG4gICAgJ2ZpeC5kaXNwYXRjaFBsYW5zSGludCc6ICdEaXNwYXRjaCB0aGUgYXBwcm92ZWQgcGVuZGluZyBwbGFucyB0byBjb25jdXJyZW50IHN1Yi1hZ2VudCBmaXhlcyAob25lIHdvcmt0cmVlIHBlciB0YXNrOyBjb25mbGljdHMgYXV0by1yZWRvIG9uIGxhdGVzdCBIRUFEKScsXHJcbiAgICAnZml4LmRpc3BhdGNoRG9uZSc6ICdcdTVERjJcdTZEM0VcdTUzRDEge259IFx1NEUyQVx1NEZFRVx1NTkwRFx1NEVGQlx1NTJBMVx1RkYwOFx1NUU3Nlx1NTNEMSB7Y31cdUZGMDknLFxyXG4gICAgJ2ZpeC5kaXNwYXRjaEVtcHR5JzogJ1x1NkNBMVx1NjcwOVx1NTNFRlx1NkQzRVx1NTNEMVx1NzY4NFx1NEVGQlx1NTJBMVx1RkYwOFx1NTJGRVx1OTAwOVx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1NjIxNlx1N0I0OVx1NUY4NVx1NjVCOVx1Njg0OFx1NEVBN1x1NTFGQVx1RkYwOScsXHJcbiAgICAnZml4LnN0YXR1cyc6ICdcdTRGRUVcdTU5MERcdTYyNjdcdTg4NEMnLFxyXG4gICAgJ2ZpeC5zdG9wJzogJ1x1NTA1Q1x1NkI2MicsXHJcbiAgICAnZml4LnN0b3BEb25lJzogJ1x1NURGMlx1NTA1Q1x1NkI2MiB7bn0gXHU0RTJBXHU0RkVFXHU1OTBEXHU0RUZCXHU1MkExJyxcclxuICAgICdmaXgudGFza1F1ZXVlZCc6ICdcdTYzOTJcdTk2MUZcdTRFMkQnLFxyXG4gICAgJ2ZpeC50YXNrUnVubmluZyc6ICdcdThGRDBcdTg4NENcdTRFMkQnLFxyXG4gICAgJ2ZpeC50YXNrTWVyZ2luZyc6ICdcdTU0MDhcdTVFNzZcdTRFMkQnLFxyXG4gICAgJ2ZpeC50YXNrUmVkbyc6ICdcdTkxQ0RcdTUwNUFcdTRFMkQnLFxyXG4gICAgJ2ZpeC50YXNrRG9uZSc6ICdcdTVERjJcdTVCOENcdTYyMTAnLFxyXG4gICAgJ2ZpeC50YXNrQ29uZmxpY3QnOiAnXHU1MUIyXHU3QTgxJyxcclxuICAgICdmaXgudGFza0ZhaWxlZCc6ICdcdTU5MzFcdThEMjUnLFxyXG4gICAgJ2ZpeC50YXNrQ2FuY2VsbGVkJzogJ1x1NURGMlx1NTA1Q1x1NkI2MicsXHJcbiAgICAnZml4LmF0dGVtcHQnOiAnXHU3QjJDIHtufSBcdTZCMjEnLFxyXG4gICAgJ2ZpeC5ydW50aW1lJzogJ1x1NURGMlx1OEZEMFx1ODg0QyB7bn0gXHU1MjA2JyxcclxuICAgICdmaXgucmVzdW1lcyc6ICdcdTdFRURcdThERDEge259JyxcclxuICAgICdmaXgucHJvYmVzJzogJ1x1NjNBMlx1NkQzQiB7bn0nLFxyXG4gICAgJ2ZpeC5tb2RlbFRpdGxlJzogJ1x1NEZFRVx1NTkwRFx1NUU3Nlx1NTNEMVx1RkYwOFx1NUI1MCBBZ2VudCBcdTZDNjBcdUZGMDknLFxyXG4gICAgJ2ZpeC5tb2RlbEhpbnQnOiAnXHU1NDBDXHU2NUY2XHU2MjY3XHU4ODRDXHU3Njg0XHU0RkVFXHU1OTBEXHU1QjUwIEFnZW50IFx1NEUwQVx1OTY1MFx1RkYwODEtMTBcdUZGMDlcdTMwMDJcdTZCQ0ZcdTRFRkJcdTUyQTFcdTcyRUNcdTdBQ0Igd29ya3RyZWUgXHU0RTkyXHU0RTBEXHU1RTcyXHU2MjcwXHUzMDAyJyxcclxuXHJcbiAgICAncGxhbi50aXRsZSc6ICdPcmNoZXN0cmF0aW9uIHBsYW4nLFxyXG4gICAgJ3BsYW4uaGludCc6ICdFYWNoIHN0ZXAgcm9sZSBkcml2ZXMgY29udGV4dCBpbmplY3Rpb24gYW5kIHRoZSBkZWZhdWx0IG1vZGVsIChhbmFseXNpcy9vcHM9ZmFzdCwgY29kaW5nPXN0YW5kYXJkLCBwbGFubmluZz1yZWFzb25pbmcsIHZlcmlmaWNhdGlvbj12ZXJpZmllcik7IGFkanVzdCBiZWZvcmUgbGF1bmNoaW5nLicsXHJcbiAgICAncGxhbi5jb2wuc3RlcCc6ICdTdGVwJywgJ3BsYW4uY29sLnJvbGUnOiAnUm9sZScsICdwbGFuLmNvbC5tb2RlbCc6ICdNb2RlbCcsICdwbGFuLmNvbC5wb2xpY3knOiAnRmFpbHVyZSBwb2xpY3knLCAncGxhbi5jb2wuZW5hYmxlZCc6ICdPbicsICdwbGFuLmNvbC5hdHRlbXB0cyc6ICdBdHRlbXB0cycsXHJcbiAgICAncGxhbi5tb2RlbERlZmF1bHQnOiAnUm9sZSBkZWZhdWx0JyxcclxuICAgICdwbGFuLmxhdW5jaEVkaXRlZCc6ICdTYXZlIGVkaXRzICYgbGF1bmNoJyxcclxuICAgICdwbGFuLmxhdW5jaERpcmVjdCc6ICdMYXVuY2ggYXMtaXMnLFxyXG4gICAgJ3BsYW4uZGlzY2FyZCc6ICdEaXNjYXJkJyxcclxuICAgICdwbGFuLnZpZXdEZXRhaWwnOiAnRGV0YWlsJywgJ3BsYW4ucmVmcmVzaERldGFpbCc6ICdSZWZyZXNoJywgJ3BsYW4uY2xvc2VEZXRhaWwnOiAnQ2xvc2UnLFxyXG4gICAgJ3BsYW4uZGV0YWlsVGl0bGUnOiAnUnVuIGRldGFpbCcsXHJcbiAgICAncGxhbi5wYXVzZWRCYW5uZXInOiAnUnVuIHBhdXNlZCwgYXdhaXRpbmcgeW91ciBkZWNpc2lvbicsXHJcbiAgICAncGxhbi5yZXN1bWVSZXRyeSc6ICdSZXRyeSBzdGVwICYgY29udGludWUnLFxyXG4gICAgJ3BsYW4ucmVzdW1lU2tpcCc6ICdTa2lwIHN0ZXAgJiBjb250aW51ZScsXHJcbiAgICAncGxhbi5yZXN1bWVGYWlsZWQnOiAnUmVzdW1lIGZyb20gZmFpbHVyZScsXHJcbiAgICAncGxhbi5jb250ZXh0VGl0bGUnOiAnUnVuIGNvbnRleHQgKHdoYXQgd2FzIGluamVjdGVkKScsXHJcbiAgICAncGxhbi5icmFuY2gnOiAnQnJhbmNoJywgJ3BsYW4uaW5qZWN0ZWRNZW1vcmllcyc6ICdJbmplY3RlZCBtZW1vcmllcycsICdwbGFuLmRlY2lzaW9uTG9nJzogJ0RlY2lzaW9uIGxvZycsXHJcbiAgICAnZXhlYy5jb2wuZGV0YWlsJzogJ0RldGFpbCcsXHJcblxyXG4gICAgJ3NjaGVkLnRpdGxlJzogJ1NjaGVkdWxlZCB0YXNrcycsXHJcbiAgICAnc2NoZWQuZm9ybU5hbWUnOiAnVGFzayBuYW1lJywgJ3NjaGVkLmZvcm1JbnRlcnZhbCc6ICdJbnRlcnZhbCAobWludXRlcyknLFxyXG4gICAgJ3NjaGVkLnR5cGVSZXZpZXcnOiAnQXV0byByZXZpZXcnLCAnc2NoZWQudHlwZVN1bW1hcnknOiAnQUkgc3VtbWFyeScsICdzY2hlZC50eXBlUnVuJzogJ1RpbWVkIHJ1bicsXHJcbiAgICAnc2NoZWQuYWRkJzogJ0NyZWF0ZScsXHJcbiAgICAnc2NoZWQuaGludCc6ICdSdW5zIGF1dG9tYXRpY2FsbHkgd2hlbiBkdWU6IGF1dG8gcmV2aWV3ID0gcmV2aWV3IGNvbW1pdHMgZnJvbSB0aGUgbGFzdCAyNGggKGlzc3VlcyBsYW5kIGluIHRoZSBSZXZpZXcgdGFiKTsgQUkgc3VtbWFyeSA9IGluY3JlbWVudGFsIGxlYXJuaW5nIHN1bW1hcnk7IHRpbWVkIHJ1biA9IGV4ZWN1dGUgdGhlIHRlbXBsYXRlIGFzIGFuIG9yY2hlc3RyYXRlZCB0YXNrLiBNaW5pbXVtIDEgbWludXRlLicsXHJcbiAgICAnc2NoZWQuZW1wdHknOiAnTm8gc2NoZWR1bGVkIHRhc2tzIHlldC4nLFxyXG4gICAgJ3NjaGVkLmNvbC5uYW1lJzogJ05hbWUnLCAnc2NoZWQuY29sLnR5cGUnOiAnVHlwZScsICdzY2hlZC5jb2wuaW50ZXJ2YWwnOiAnQ3ljbGUnLCAnc2NoZWQuY29sLm5leHQnOiAnTmV4dCBydW4nLCAnc2NoZWQuY29sLmxhc3RSZXN1bHQnOiAnTGFzdCByZXN1bHQnLCAnc2NoZWQuY29sLmFjdGlvbnMnOiAnQWN0aW9ucycsXHJcbiAgICAnc2NoZWQuZGF5JzogJyBkJywgJ3NjaGVkLmhvdXInOiAnIGgnLCAnc2NoZWQubWludXRlJzogJyBtaW4nLFxyXG4gICAgJ3NjaGVkLmRpc2FibGUnOiAnUGF1c2UnLCAnc2NoZWQuZW5hYmxlJzogJ0VuYWJsZScsICdzY2hlZC5ydW5Ob3cnOiAnUnVuIG5vdycsXHJcblxyXG4gICAgJ21lbW9yeS56b25lVGl0bGUnOiAnUHJvamVjdCBtZW1vcnknLFxyXG4gICAgJ21lbW9yeS5zeW5jQmFzZWxpbmUnOiAnU3luYyBiYXNlbGluZScsICdtZW1vcnkuc3luY05vbmUnOiAnbmV2ZXIgc3luY2VkJyxcclxuICAgICdtZW1vcnkuYmVoaW5kJzogJ3tufSBjb21taXRzIGJlaGluZCcsXHJcbiAgICAnbWVtb3J5LnN5bmMnOiAnU3luYyBtZW1vcnknLCAnbWVtb3J5LnN5bmNpbmcnOiAnU3luY2luZ1x1MjAyNicsICdtZW1vcnkuc3luY0ZhaWxlZCc6ICdTeW5jIGZhaWxlZCcsXHJcbiAgICAnbWVtb3J5LnN0YWxlVGl0bGUnOiAnUG9zc2libHkgc3RhbGUgKHJlbGF0ZWQgY29kZSBjaGFuZ2VkOyByZXZpZXcgbmVlZGVkKScsXHJcbiAgICAnbWVtb3J5Lm1hcmtTdGFsZSc6ICdNYXJrIHN0YWxlJywgJ21lbW9yeS5hcmNoaXZlQnRuJzogJ0FyY2hpdmUnLCAnbWVtb3J5LmtlZXBBY3RpdmUnOiAnU3RpbGwgdmFsaWQnLFxyXG4gICAgJ21lbW9yeS5uZXdDYW5kaWRhdGVzJzogJ05ldyBjYW5kaWRhdGVzIChxdWV1ZWQgZm9yIGNvbmZpcm1hdGlvbik6JyxcclxuICAgICdtZW1vcnkuY2xvc2VSZXBvcnQnOiAnQ2xvc2UgcmVwb3J0JyxcclxuICAgICdtZW1vcnkuc2NvcGVQcm9qZWN0JzogJ01haW5saW5lIChhbGwgYnJhbmNoZXMpJywgJ21lbW9yeS5zY29wZUJyYW5jaCc6ICdDdXJyZW50IGJyYW5jaCBvbmx5JyxcclxuICAgICdtZW1vcnkucGVuZGluZ1F1ZXVlJzogJ1BlbmRpbmcgY29uZmlybWF0aW9uJyxcclxuICAgICdtZW1vcnkudG9Ob3RlJzogJ1RvIG5vdGUnLCAnbWVtb3J5Lm5vcm1hbGl6ZSc6ICdOb3JtYWxpemUgdG8gbWFpbmxpbmUnLCAnbWVtb3J5LnJlc3RvcmUnOiAnUmVzdG9yZScsXHJcbiAgICAnbWVtb3J5LnN0YXR1c1N0YWxlJzogJ1N0YWxlJyxcclxuICAgICdmcy5icm93c2UnOiAnQnJvd3NlJyxcclxuICAgICdmcy51cCc6ICdVcCcsXHJcbiAgICAnZnMudXNlJzogJ1VzZSB0aGlzIGRpcmVjdG9yeScsXHJcbiAgICAnZnMucmVnaXN0ZXInOiAnQWxzbyByZWdpc3RlciBhcyBzZXNzaW9uIHdvcmtzcGFjZScsXHJcbiAgICAnZnMubG9hZGluZyc6ICdSZWFkaW5nXHUyMDI2JyxcclxuICAgICdmcy5lbXB0eSc6ICdObyBzdWJkaXJlY3Rvcmllcy4nLFxyXG4gICAgJ2ltcGFjdC5mdW5jdGlvbnNOb25lJzogJ05vIGZ1bmN0aW9uLWxldmVsIGNhbGwgaW1wYWN0IGRldGVjdGVkIChzdHlsZS9hc3NldC9jb25maWctb25seSBjaGFuZ2UpLicsXHJcbiAgICAncmV2aWV3LmNvbC5zZXZlcml0eSc6ICdTZXZlcml0eScsXHJcbiAgICAncmV2aWV3LmNvbC5jYXRlZ29yeSc6ICdDYXRlZ29yeScsXHJcbiAgICAncmV2aWV3LmNvbC50aXRsZSc6ICdJc3N1ZScsXHJcbiAgICAncmV2aWV3LmNvbC5ldmlkZW5jZSc6ICdMb2NhdGlvbicsXHJcbiAgICAncmV2aWV3LmNvbC5maXgnOiAnU3VnZ2VzdGVkIGZpeCcsXHJcbiAgICAncmV2aWV3LmhpbnQnOiAnQ2xpY2sgdGhlIGJ1dHRvbiBhYm92ZSB0byBwcm9kdWNlIHRoZSBvcHRpbWFsaXR5IHZlcmRpY3QgYW5kIGlzc3VlIGxpc3QuJyxcclxuICAgICdkaWZmLnNob3cnOiAnRGlmZicsXHJcbiAgICAnZGlmZi5oaWRlJzogJ0hpZGUgZGlmZicsXHJcblxyXG4gICAgJ2RldGFpbC50aXRsZSc6ICdSZXZpZXcgZGV0YWlsJyxcclxuICAgICdkZXRhaWwucGljayc6ICdcdTIxOTAgUGljayBhIGNvbW1pdCAob3IgdGhlIHVuY29tbWl0dGVkIGNoYW5nZXMpIG9uIHRoZSBsZWZ0IHRvIHN0YXJ0IHJldmlld2luZycsXHJcbiAgICAnZGV0YWlsLndoYXQnOiAnV2hhdCBpdCBkb2VzJyxcclxuICAgICdkZXRhaWwubG9naWMnOiAnSW1wbGVtZW50YXRpb24gbG9naWMnLFxyXG4gICAgJ2RldGFpbC5yaXNrJzogJ1Jpc2tzJyxcclxuICAgICdkZXRhaWwuZmlsZXMnOiAnRmlsZXMnLFxyXG4gICAgJ2RldGFpbC5wYXRjaCc6ICdTaG93IHJhdyBwYXRjaCcsXHJcbiAgICAnZGV0YWlsLmFpTG9hZGluZyc6ICdHZW5lcmF0aW5nIEFJIGV4cGxhbmF0aW9uXHUyMDI2ICgxMC0zMHMpJyxcclxuICAgICdkZXRhaWwucXVldWVkJzogJ3tufSBhbmFseXNlcyBxdWV1ZWQgKHdpbGwgcnVuIGNvbmN1cnJlbnRseSknLFxyXG4gICAgJ2RldGFpbC5jYXJkUXVldWVkJzogJ1dhaXRpbmcgaW4gdGhlIGFuYWx5c2lzIHF1ZXVlIChtYXggMyBjb25jdXJyZW50IHRvIHByb3RlY3QgdGhlIG1vZGVsIGdhdGV3YXkpJyxcclxuICAgICdkZXRhaWwuaW1wYWN0JzogJ0ltcGFjdCBzY29wZScsXHJcbiAgICAnZGV0YWlsLmltcGFjdExvYWRpbmcnOiAnU2Nhbm5pbmcgaW1wYWN0XHUyMDI2IChyZWZlcmVuY2Ugc2VhcmNoICsgZ3JhcGggd2FsayknLFxyXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5JzogJ09wdGltYWxpdHkgcmV2aWV3JyxcclxuICAgICdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnOiAnUmV2aWV3aW5nXHUyMDI2IChwcm9kdWNlcyBpc3N1ZSBsaXN0IGFuZCBvcHRpbWFsaXR5IHZlcmRpY3QpJyxcclxuXHJcbiAgICAnaW1wYWN0LnJpc2snOiAnUmlzaycsXHJcbiAgICAnaW1wYWN0LmNvbC5jaGFuZ2VkJzogJ0NoYW5nZWQgZmlsZXMnLFxyXG4gICAgJ2ltcGFjdC5jb2wuaW5kaXJlY3QnOiAnSW5kaXJlY3QgKHJlZmVyZW5jZSBjaGFpbiknLFxyXG4gICAgJ2ltcGFjdC5jb2wucG90ZW50aWFsJzogJ1BvdGVudGlhbCcsXHJcbiAgICAnaW1wYWN0Lm5vbmUnOiAnTm8gaW4tcmVwbyByZWZlcmVuY2VycyBmb3VuZCAodGhlIGNoYW5nZSBsb29rcyBzZWxmLWNvbnRhaW5lZCkuJyxcclxuICAgICdpbXBhY3QudGVzdHMnOiAnUmVsYXRlZCB0ZXN0cycsXHJcbiAgICAnaW1wYWN0LmxlZ2VuZC5jaGFuZ2VkJzogJ2NoYW5nZWQnLFxyXG4gICAgJ2ltcGFjdC5sZWdlbmQuaW5kaXJlY3QnOiAnaW5kaXJlY3QnLFxyXG4gICAgJ2ltcGFjdC5sZWdlbmQucG90ZW50aWFsJzogJ3BvdGVudGlhbCcsXHJcblxyXG4gICAgJ3Jldmlldy52ZXJkaWN0JzogJ09wdGltYWxpdHkgdmVyZGljdCcsXHJcbiAgICAncmV2aWV3Lmlzc3Vlcyc6ICdJc3N1ZXMnLFxyXG4gICAgJ3Jldmlldy5jbGVhbic6ICdObyBpc3N1ZXMgZm91bmQuJyxcclxuXHJcbiAgICAnbm90ZXMudGl0bGUnOiAnUmV2aWV3IG5vdGVzJyxcclxuICAgICdub3Rlcy5mb3JtVGl0bGUnOiAnTm90ZSB0aXRsZScsXHJcbiAgICAnbm90ZXMuZm9ybUNvbnRlbnQnOiAnTm90ZSBjb250ZW50IChjb25jbHVzaW9ucywgcXVlc3Rpb25zLCBsZWFybmluZ3NcdTIwMjYpJyxcclxuICAgICdub3Rlcy5hZGQnOiAnQWRkIG5vdGUnLFxyXG4gICAgJ25vdGVzLmJvdW5kVG8nOiAnV2lsbCBiZSBsaW5rZWQgdG8nLFxyXG4gICAgJ25vdGVzLmNvbC50aW1lJzogJ1RpbWUnLFxyXG4gICAgJ25vdGVzLmNvbC50aXRsZSc6ICdUaXRsZScsXHJcbiAgICAnbm90ZXMuY29sLmNvbnRlbnQnOiAnQ29udGVudCcsXHJcbiAgICAnbm90ZXMuY29sLnNoYSc6ICdDb21taXQnLFxyXG4gICAgJ25vdGVzLnJlbW92ZSc6ICdEZWxldGUnLFxyXG4gICAgJ25vdGVzLmVtcHR5JzogJ05vIG5vdGVzIHlldC4gTm90ZSBkb3duIGNvbmNsdXNpb25zIGFuZCBxdWVzdGlvbnMgd2hpbGUgcmV2aWV3aW5nIGNvbW1pdHMgXHUyMDE0IHRoYXQgaXMgeW91ciBwcm9qZWN0IGxlYXJuaW5nIGFyY2hpdmUuJyxcclxuXHJcbiAgICAnbWVtb3J5LnJlY29yZCc6ICdSZWNvcmQgcHJvamVjdCBtZW1vcnknLFxyXG4gICAgJ2Zvcm0ubWVtb3J5VGl0bGUnOiAnTWVtb3J5IHRpdGxlJyxcclxuICAgICdmb3JtLm1lbW9yeUNvbnRlbnQnOiAnTWVtb3J5IGNvbnRlbnQgKHdoYXQgYW5kIHdoeSknLFxyXG4gICAgJ21lbW9yeS5jb2wudGl0bGUnOiAnSXRlbScsXHJcbiAgICAnbWVtb3J5LmNvbC50eXBlJzogJ1R5cGUnLFxyXG4gICAgJ21lbW9yeS5jb2wudHJ1dGgnOiAnVHJ1dGgnLFxyXG4gICAgJ21lbW9yeS5jb2wuYnJhbmNoJzogJ0JyYW5jaCcsXHJcbiAgICAnbWVtb3J5LmNvbmZpcm0nOiAnQ29uZmlybScsXHJcbiAgICAnbWVtb3J5LmVtcHR5JzogJ05vIHByb2plY3QgbWVtb3JpZXMgeWV0LiBBc2sgdGhlIEFJIGluIGNoYXQgdG8gcmVjb3JkIG9uZSwgb3IgYWRkIGFib3ZlLicsXHJcbiAgICAnY29uY2VwdHMudGl0bGUnOiAnTGVhcm5pbmcgY29uY2VwdHMnLFxyXG4gICAgJ2NvbmNlcHRzLm5vbmUnOiAnTm8gbGVhcm5pbmcgY29uY2VwdHMgeWV0LiBUaGV5IGFjY3VtdWxhdGUgYWZ0ZXIgc3VjY2Vzc2Z1bCBjaGFuZ2UgcnVucywgb3IgYXNrIHRoZSBBSSB0byBzdW1tYXJpemUgbGVhcm5pbmcgcG9pbnRzLicsXHJcbiAgICAnY29uY2VwdHMuY29sLm5hbWUnOiAnQ29uY2VwdCcsXHJcbiAgICAnY29uY2VwdHMuY29sLmNhdGVnb3J5JzogJ0NhdGVnb3J5JyxcclxuICAgICdjb25jZXB0cy5jb2wuY291bnQnOiAnQ291bnQnLFxyXG4gICAgJ3Jldmlldy5yZWNvcmRzVGl0bGUnOiAnUmV2aWV3IGlzc3VlcycsXHJcbiAgICAncmV2aWV3LnJlY29yZHNFbXB0eSc6ICdObyBpc3N1ZSByZWNvcmRzIHlldC4gSXNzdWVzIGZvdW5kIGJ5IHRoZSBjb21taXQtcmV2aWV3IHBhZ2UgYXJlIHJlY29yZGVkIGhlcmUgYXV0b21hdGljYWxseTsgcmUtcmV2aWV3aW5nIHJlcGxhY2VzIG9sZCByZWNvcmRzLicsXHJcbiAgICAndmVyaWZ5LnJlY29yZHMnOiAnVmVyaWZpY2F0aW9uIHJlY29yZHMnLFxyXG4gICAgJ3ZlcmlmeS5yZWNvcmRzRW1wdHknOiAnTm8gdmVyaWZpY2F0aW9uIHJlY29yZHMgeWV0LiBDbGljayBcIlZlcmlmeVwiIGluIHRoZSBleGVjdXRpb24gdGFiIHRvIGdlbmVyYXRlIG9uZS4nLFxyXG5cclxuICAgICdjb25maXJtZWQudGl0bGUnOiAnQ29uZmlybWVkIGNvbnN0cmFpbnRzIChodW1hbi1jb25maXJtZWQ7IEFJIGVkaXRzIHRvIGZvcmJpZGRlbiBwYXRocyBhcmUgYXV0by1kZW5pZWQpJyxcclxuICAgICdjb25maXJtZWQuYWRkJzogJ0FkZCBjb25zdHJhaW50JyxcclxuICAgICdjb25maXJtZWQudGV4dCc6ICdSZXF1aXJlbWVudCAvIGNvbnN0cmFpbnQgdGV4dCcsXHJcbiAgICAnY29uZmlybWVkLnBhdGhzJzogJ0ZvcmJpZGRlbiBwYXRocyAoY29tbWEgc2VwYXJhdGVkOyByZWxhdGl2ZSB0byBwcm9qZWN0IHJvb3QgbGlrZSBzcmMvY29yZSwgb3IgYWJzb2x1dGUpJyxcclxuICAgICdjb25maXJtZWQubm9uZSc6ICdObyBjb25zdHJhaW50cyB5ZXQuIE9uY2UgYWRkZWQsIEFJIGVkaXRzIHRvIGZvcmJpZGRlbiBwYXRocyBpbiB0aGlzIHByb2plY3QgYXJlIGF1dG8tZGVuaWVkLicsXHJcblxyXG4gICAgJ2NoYW5nZXMudGl0bGUnOiAnQ2hhbmdlIHRhc2tzJyxcclxuICAgICdzdGF0ZS5ub0NoYW5nZXMnOiAnTm8gY2hhbmdlIHRhc2tzIHlldC4gQXNrIHRoZSBBSSBpbiBjaGF0IHRvIGNyZWF0ZSBvbmUsIG9yIHVzZSBcIkNyZWF0ZSBjaGFuZ2VcIiBhYm92ZS4nLFxyXG4gICAgJ2NoYW5nZXMuY29sLnRpdGxlJzogJ1RpdGxlJyxcclxuICAgICdjaGFuZ2VzLmNvbC50eXBlJzogJ1R5cGUnLFxyXG4gICAgJ2NoYW5nZXMuY29sLnN0YXR1cyc6ICdTdGF0dXMnLFxyXG4gICAgJ2NoYW5nZXMuY29sLnVwZGF0ZWQnOiAnVXBkYXRlZCcsXHJcbiAgICAnZXhlYy5jb2wuc3RhdHVzJzogJ1N0YXR1cycsXHJcbiAgICAnZXhlYy5jb2wuY2hhbmdlJzogJ0NoYW5nZScsXHJcbiAgICAnZXhlYy5jb2wuc3RhcnRlZCc6ICdTdGFydGVkJyxcclxuICAgICdleGVjLmNvbC5jb3N0JzogJ0Nvc3QgKGVzdCknLFxyXG4gICAgJ2V4ZWMuYXR0ZW1wdHMnOiAnQXR0ZW1wdHMnLFxyXG4gICAgJ2V4ZWMuaGludCc6ICdSdW5zIChzdGFydF9ydW4pIGFyZSBzdGFydGVkIGZyb20gY2hhdDogYWZ0ZXIgYSBwbGFuIGV4aXN0cywgdGVsbCB0aGUgQUkgdG8gXCJzdGFydCBydW4gZm9yIHRoZSBjaGFuZ2VcIi4gVGhpcyB0YWIgc2hvd3MgcHJvZ3Jlc3MgYW5kIHJlc3VsdHMuJyxcclxuICAgICdzdGF0ZS5ub1J1bnMnOiAnTm8gcnVucyB5ZXQuJyxcclxuICAgICdzdGF0ZS50ZWNoU3RhY2snOiAnVGVjaCBzdGFjaycsXHJcbiAgICAnc3RhdGUuc3ltYm9scyc6ICdJbmRleGVkIHN5bWJvbHMnLFxyXG4gICAgJ3N0YXRlLm1hbmlmZXN0cyc6ICdNYW5pZmVzdHMnLFxyXG4gICAgJ3N0YXRlLmV2aWRlbmNlJzogJ0V2aWRlbmNlIGVudHJpZXMnLFxyXG4gIH0sXHJcbn0gYXMgY29uc3RcclxuXHJcbmZ1bmN0aW9uIGZhbGxiYWNrVChrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgY29uc3QgZGljdCA9IFdPUktTUEFDRV9ESUNULnpoIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz5cclxuICByZXR1cm4gZGljdFtrZXldID8/IGtleVxyXG59XHJcblxyXG4vKiogXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDXHU0RUJBXHU2MDI3XHU1MzE2XHVGRjFBXHUyNzEzL1x1MjcxNyArIFx1NjgwN1x1OTFDRlx1NUI1N1x1NkJCNVx1NzY4NFx1N0QyN1x1NTFEMVx1ODg0Q1x1RkYwOFx1OERGM1x1OEZDN1x1NUQ0Q1x1NTk1N1x1NUJGOVx1OEM2MVx1NEUwRVx1NTM5Rlx1NTlDQiBKU09OXHVGRjA5XHUzMDAyICovXHJcbmZ1bmN0aW9uIGZvcm1hdEFjdGlvblJlc3VsdChkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IHN0cmluZyB7XHJcbiAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW2RhdGFbJ29rJ10gPT09IGZhbHNlID8gJ1x1MjcxNycgOiAnXHUyNzEzJ11cclxuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhkYXRhKSkge1xyXG4gICAgaWYgKGtleSA9PT0gJ29rJykgY29udGludWVcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgbGluZXMucHVzaChgJHtrZXl9XHVGRjFBJHtTdHJpbmcodmFsdWUpLnNsaWNlKDAsIDIwMCl9YClcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKGxpbmVzLmxlbmd0aCA9PT0gMSkgbGluZXMucHVzaCgnXHU2MjEwXHU1MjlGJylcclxuICByZXR1cm4gbGluZXMuam9pbignXFxuJylcclxufVxyXG5cclxuLyoqIExMTSBcdTYyMTBcdTY3MkNcdUZGMDhcdTRGMzBcdUZGMDlcdTVGQkRcdTY4MDdcdUZGMUFcdTY1RTBcdTUwM0NcdUZGMDhcdTY3MkFcdTRFQTdcdTc1MUZcdThDMDNcdTc1MjggLyBcdTY1RTdcdTdGMTNcdTVCNThcdTRFMERcdTVFMjZcdTYyMTBcdTY3MkNcdUZGMDlcdTY1RjZcdThGRDRcdTU2REUgbnVsbCBcdTRFMERcdTUzNjBcdTRGNERcdTMwMDIgKi9cclxuZnVuY3Rpb24gcmVuZGVyQ29zdEJhZGdlKHVzZDogbnVtYmVyIHwgdW5kZWZpbmVkLCB0aXRsZTogc3RyaW5nKTogUmVhY3QuUmVhY3ROb2RlIHtcclxuICBpZiAodXNkID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsXHJcbiAgcmV0dXJuIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4Yjk0OWUnKX0gdGl0bGU9e3RpdGxlfT5cdTIyNDgke3VzZC50b0ZpeGVkKDQpfTwvc3Bhbj5cclxufVxyXG5cclxuY29uc3Qgc3R5bGVzOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5DU1NQcm9wZXJ0aWVzPiA9IHtcclxuICByb290OiB7XHJcbiAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyxcclxuICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcclxuICAgIGZvbnRGYW1pbHk6ICd2YXIoLS1kcy1mb250LXNhbnMsIGluaGVyaXQpJyxcclxuICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICB9LFxyXG4gIG5hdjoge1xyXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICBnYXA6ICc0cHgnLFxyXG4gICAgcGFkZGluZzogJzhweCAxMnB4JyxcclxuICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwxLCByZ2JhKDUsNSw1LDAuMSkpJyxcclxuICAgIGZsZXg6ICdub25lJyxcclxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxyXG4gIH0sXHJcbiAgdGl0bGU6IHsgZm9udFNpemU6ICcxM3B4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5JbmxpbmVFbmQ6ICcxMHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknIH0sXHJcbiAgdGFiOiAoYWN0aXZlOiBib29sZWFuKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiAoe1xyXG4gICAgcGFkZGluZzogJzVweCAxMnB4JyxcclxuICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICBib3JkZXI6ICdub25lJyxcclxuICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgZm9udFNpemU6ICcxMnB4JyxcclxuICAgIC8vIGJ1dHRvbi1pbmZvLWZpbGwgXHU0RTI0XHU0RTNCXHU5ODk4XHU5MEZEXHU4NEREXHVGRjFCYnJhbmQtcHJpbWFyeSBcdTU3MjhcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTY2MkZcdThGRDFcdTc2N0RcdTgyNzJcdUZGMENcdTc2N0RcdTVCNTdcdTRGMUFcdTg4QUJcdTU0MUVcdTYzODlcdUZGMDhcdTk4NzVcdTdCN0VcdTc2N0RcdTU3NTdcdTRFOEJcdTY1NDVcdUZGMDlcdTMwMDJcclxuICAgIGJhY2tncm91bmQ6IGFjdGl2ZSA/ICd2YXIoLS1kc3ctYWxpYXMtYnV0dG9uLWluZm8tZmlsbCwgIzI1NjNlYiknIDogJ3RyYW5zcGFyZW50JyxcclxuICAgIGNvbG9yOiBhY3RpdmUgPyAnI2ZmZicgOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxyXG4gIH0pLFxyXG4gIGJvZHk6IHsgZmxleDogMSwgb3ZlcmZsb3dZOiAnYXV0bycsIHBhZGRpbmc6ICcxNHB4IDE2cHgnIH0sXHJcbiAgY2FyZDoge1xyXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcclxuICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICBwYWRkaW5nOiAnMTJweCAxNHB4JyxcclxuICAgIG1hcmdpbkJvdHRvbTogJzEycHgnLFxyXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXHJcbiAgfSxcclxuICByb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxOHB4JywgZmxleFdyYXA6ICd3cmFwJywgZm9udFNpemU6ICcxMnB4JywgbWFyZ2luOiAnNnB4IDAnIH0sXHJcbiAgbGFiZWw6IHsgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpbklubGluZUVuZDogJzZweCcgfSxcclxuICB0YWJsZTogeyB3aWR0aDogJzEwMCUnLCBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJywgZm9udFNpemU6ICcxMnB4JyB9LFxyXG4gIHRoOiB7IHRleHRBbGlnbjogJ3N0YXJ0JywgcGFkZGluZzogJzZweCA4cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMSwgcmdiYSg1LDUsNSwwLjEpKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250V2VpZ2h0OiA1MDAgfSxcclxuICB0ZDogeyBwYWRkaW5nOiAnNnB4IDhweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwzLCByZ2JhKDUsNSw1LDAuMDYpKScgfSxcclxuICBlbXB0eTogeyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZm9udFNpemU6ICcxMnB4JywgcGFkZGluZzogJzEwcHggNHB4JyB9LFxyXG4gIGJ1dHRvbjoge1xyXG4gICAgcGFkZGluZzogJzVweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgLy8gYnV0dG9uLWluZm8tZmlsbCBcdTY2MkZcdTVCQkZcdTRFM0JcdTRFMjRcdTRFMkFcdTRFM0JcdTk4OThcdTRFMEJcdTkwRkRcdTRFM0FcdTg0RERcdTgyNzJcdTMwMDFcdTc2N0RcdTVCNTdcdTUzRUZcdThCRkJcdTc2ODRcdTRFM0JcdTY0Q0RcdTRGNUNcdTgyNzJcdUZGMDhicmFuZC1wcmltYXJ5IFx1NTcyOFx1NkRGMVx1ODI3Mlx1NEUzQlx1OTg5OFx1NjYyRlx1OEZEMVx1NzY3RFx1ODI3Mlx1RkYwQ1x1NzY3RFx1NUI1N1x1NEUwRFx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlxyXG4gICAgZm9udFNpemU6ICcxMXB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1idXR0b24taW5mby1maWxsLCAjMjU2M2ViKScsIGNvbG9yOiAnI2ZmZicsXHJcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcclxuICB9LFxyXG4gIHNlY29uZGFyeToge1xyXG4gICAgcGFkZGluZzogJzVweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgY3Vyc29yOiAncG9pbnRlcicsIGZvbnRTaXplOiAnMTFweCcsXHJcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxyXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcclxuICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxyXG4gIH0sXHJcbiAgaW5wdXQ6IHtcclxuICAgIHdpZHRoOiAnMTAwJScsIHBhZGRpbmc6ICc2cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTJweCcsXHJcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxyXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcclxuICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxyXG4gIH0sXHJcbiAgZm9ybVJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICc2cHgnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH0sXHJcbiAgZm9ybUlubGluZTogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc4cHgnIH0sXHJcbiAgLy8gc2VsZWN0IFx1NzUyOFx1N0NGQlx1N0VERlx1NTkxNlx1ODlDMlx1NjVGNiBXaW5kb3dzIFx1NkQ0NVx1ODI3Mlx1NkEyMVx1NUYwRlx1NEUwQlx1NUYzQVx1NTIzNlx1NzY3RFx1NUU5NVx1RkYwQ1x1NkRGMVx1ODI3Mlx1NEUzQlx1OTg5OFx1NEUwQlx1NEUwRFx1NTNFRlx1OEJGQlx1MjAxNFx1MjAxNFx1ODFFQVx1N0VEOFx1NTkxNlx1ODlDMlx1OEQ3MFx1NEUzQlx1OTg5OFx1NTNEOFx1OTFDRlx1MzAwMlxyXG4gIHNlbGVjdDoge1xyXG4gICAgYXBwZWFyYW5jZTogJ25vbmUnLCBXZWJraXRBcHBlYXJhbmNlOiAnbm9uZScsXHJcbiAgICBwYWRkaW5nOiAnNnB4IDI2cHggNnB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzEycHgnLFxyXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcclxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScsXHJcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7dXRmOCw8c3ZnIHhtbG5zPSUyMmh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJTIyIHdpZHRoPSUyMjEwJTIyIGhlaWdodD0lMjI2JTIyPjxwYXRoIGQ9JTIyTTEgMWw0IDQgNC00JTIyIHN0cm9rZT0lMjIlMjM4ODglMjIgc3Ryb2tlLXdpZHRoPSUyMjEuNSUyMiBmaWxsPSUyMm5vbmUlMjIvPjwvc3ZnPlwiKScsXHJcbiAgICBiYWNrZ3JvdW5kUmVwZWF0OiAnbm8tcmVwZWF0JywgYmFja2dyb3VuZFBvc2l0aW9uOiAncmlnaHQgOHB4IGNlbnRlcicsXHJcbiAgICBjdXJzb3I6ICdwb2ludGVyJywgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsIG1heFdpZHRoOiAnMTAwJScsXHJcbiAgfSxcclxuICBhY3Rpb25Sb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxMHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfSxcclxuICByZXN1bHQ6IHtcclxuICAgIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNixcclxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzEwcHggMTJweCcsIG1heEhlaWdodDogJzMyMHB4Jywgb3ZlcmZsb3dZOiAnYXV0bycsXHJcbiAgfSxcclxuICBiYWRnZTogKGNvbG9yOiBzdHJpbmcpOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+IHtcclxuICAgIGNvbnN0IHJnYiA9IHBhcnNlQ29sb3IoY29sb3IpXHJcbiAgICBpZiAocmdiID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiB7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCBwYWRkaW5nOiAnMXB4IDhweCcsIGJvcmRlclJhZGl1czogJzRweCcsIGZvbnRTaXplOiAnMTFweCcsIGJhY2tncm91bmQ6IGAke2NvbG9yfTIyYCwgY29sb3IgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgW3IsIGcsIGJdID0gcmdiXHJcbiAgICAvLyBcdTVFOTVcdTgyNzJcdTdFREZcdTRFMDAgMTYlIFx1ODI3Mlx1OEMwM1x1RkYxQlx1NjU4N1x1NUI1N1x1ODI3Mlx1NEUzQlx1OTg5OFx1ODFFQVx1OTAwMlx1NUU5NFx1RkYwOFx1NkQ0NVx1ODI3Mlx1NkRGMVx1NTMxNlx1NTIzMFx1NzY3RFx1NUU5NVx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsIHBhZGRpbmc6ICcxcHggOHB4JywgYm9yZGVyUmFkaXVzOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JyxcclxuICAgICAgYmFja2dyb3VuZDogYHJnYmEoJHtyfSwgJHtnfSwgJHtifSwgMC4xNilgLFxyXG4gICAgICBjb2xvcjogdGhlbWVBd2FyZVRleHQoY29sb3IpLFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VjdGlvblRpdGxlOiB7IGZvbnRXZWlnaHQ6IDYwMCwgZm9udFNpemU6ICcxMnB4JywgbWFyZ2luQm90dG9tOiAnOHB4JyB9LFxyXG4gIHdoYXQ6IHsgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS43LCBtYXJnaW46ICc0cHggMCA4cHgnIH0sXHJcbiAgbG9naWNTdGVwOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuOCwgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnIH0sXHJcbiAgcmlza0l0ZW06IHsgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS43LCBtYXJnaW46ICcycHggMCcgfSxcclxuICBjb21taXRSb3c6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XHJcbiAgICBwYWRkaW5nOiAnOHB4IDEwcHgnLFxyXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcclxuICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgYm9yZGVyOiBhY3RpdmUgPyAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgOiAnMXB4IHNvbGlkIHRyYW5zcGFyZW50JyxcclxuICAgIGJhY2tncm91bmQ6IGFjdGl2ZSA/ICdyZ2JhKDM3LDk5LDIzNSwwLjA2KScgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgbWFyZ2luQm90dG9tOiAnNHB4JyxcclxuICB9KSxcclxuICBjb21taXRTdWJqZWN0OiB7IGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbGluZUhlaWdodDogMS41LCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgd2hpdGVTcGFjZTogJ25vd3JhcCcgfSxcclxuICBjb21taXRNZXRhOiB7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Ub3A6ICcycHgnLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcgfSxcclxuICBwYXRjaDoge1xyXG4gICAgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIGxpbmVIZWlnaHQ6IDEuNSwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyxcclxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzEwcHgnLCBtYXhIZWlnaHQ6ICczMjBweCcsIG92ZXJmbG93WTogJ2F1dG8nLFxyXG4gIH0sXHJcbiAgdGV4dGFyZWE6IHtcclxuICAgIHdpZHRoOiAnMTAwJScsIHBhZGRpbmc6ICc4cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTJweCcsXHJcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxyXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcclxuICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCByZXNpemU6ICd2ZXJ0aWNhbCcsIGxpbmVIZWlnaHQ6IDEuNywgZm9udEZhbWlseTogJ2luaGVyaXQnLFxyXG4gIH0sXHJcbiAgbm90ZUNhcmQ6IHtcclxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJyxcclxuICAgIGJvcmRlclJhZGl1czogJzhweCcsIHBhZGRpbmc6ICcxMnB4IDE0cHgnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyxcclxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxyXG4gIH0sXHJcbiAgbm90ZVRpdGxlUm93OiB7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCBnYXA6ICc4cHgnIH0sXHJcbiAgbm90ZVRpdGxlVGV4dDogeyBmb250U2l6ZTogJzEzcHgnLCBmb250V2VpZ2h0OiA2MDAsIGxpbmVIZWlnaHQ6IDEuNSB9LFxyXG4gIG5vdGVDb250ZW50OiB7XHJcbiAgICBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjg1LCB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLCB3b3JkQnJlYWs6ICdicmVhay13b3JkJyxcclxuICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJywgbWFyZ2luVG9wOiAnNnB4JyxcclxuICB9LFxyXG4gIG5vdGVDbGFtcDoge1xyXG4gICAgZGlzcGxheTogJy13ZWJraXQtYm94JywgV2Via2l0TGluZUNsYW1wOiA2LCBXZWJraXRCb3hPcmllbnQ6ICd2ZXJ0aWNhbCcsIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICB9LFxyXG4gIG5vdGVNZXRhOiB7XHJcbiAgICBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnOHB4JyxcclxuICAgIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxyXG4gIH0sXHJcbiAgbGlua0J0bjoge1xyXG4gICAgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsIGZvbnRTaXplOiAnMTFweCcsIHBhZGRpbmc6ICcwJyxcclxuICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyxcclxuICB9LFxyXG4gIGNoaXA6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XHJcbiAgICBwYWRkaW5nOiAnMnB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc5OTlweCcsIGZvbnRTaXplOiAnMTFweCcsIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcclxuICAgIC8vIFx1NTQwQyB0YWJcdUZGMUFhY3RpdmUgXHU1ODZCXHU4MjcyXHU0RTAwXHU1RjhCIGJ1dHRvbi1pbmZvLWZpbGxcdUZGMDhcdTRFMjRcdTRFM0JcdTk4OThcdTkwRkRcdTg0RERcdUZGMDlcdUZGMENcdTc5ODFcdTc1MjggYnJhbmQtcHJpbWFyeVx1MzAwMlxyXG4gICAgYmFja2dyb3VuZDogYWN0aXZlID8gJ3ZhcigtLWRzdy1hbGlhcy1idXR0b24taW5mby1maWxsLCAjMjU2M2ViKScgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgY29sb3I6IGFjdGl2ZSA/ICcjZmZmJyA6ICdpbmhlcml0JyxcclxuICB9KSxcclxufVxyXG5cclxuLyoqIFx1OThDRVx1OTY2OVx1N0I0OVx1N0VBNyBcdTIxOTIgXHU1RkJEXHU3QUUwXHU5ODlDXHU4MjcyXHUzMDAyICovXHJcbmNvbnN0IFJJU0tfQ09MT1I6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7IGxvdzogJyM0ZWM5YjAnLCBtZWRpdW06ICcjZGNkY2FhJywgaGlnaDogJyNjZTkxNzgnLCBjcml0aWNhbDogJyNmMTRjNGMnIH1cclxuXHJcbi8qKlxyXG4gKiBcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjQgU1ZHIFx1NkQ0MVx1N0EwQlx1NTZGRVx1RkYxQVx1NEUwOVx1NTIxN1x1NTIwNlx1NUM0Mlx1RkYwOFx1NTNEOFx1NjZGNCBcdTIxOTIgXHU5NUY0XHU2M0E1XHU1RjE1XHU3NTI4XHU5NEZFIFx1MjE5MiBcdTZGNUNcdTU3MjhcdUZGMDlcdUZGMENcclxuICogXHU0RjlEXHU2MzZFIC9pbXBhY3Qtc2NvcGUgXHU4RkQ0XHU1NkRFXHU3Njg0IGxldmVsc1x1RkYwOFx1NTQyQlx1NEYyMFx1NjRBRFx1OTRGRSByZWFzb25cdUZGMDlcdTdFRDhcdTUyMzZcdThGREVcdTdFQkZcdTMwMDJcclxuICogXHU1MTY4XHU1QkJEXHU3NTNCXHU1RTAzXHVGRjA4dmlld0JveCAxMDAwXHVGRjA5XHVGRjBDXHU4MjgyXHU3MEI5XHU1RTI2XHU3NkVFXHU1RjU1XHU2M0QwXHU3OTNBXHVGRjBDXHU2REYxXHU1RUE2XHU4RDhBXHU2REYxXHU5ODlDXHU4MjcyXHU4RDhBXHU2RDQ1XHUzMDAyXHJcbiAqL1xyXG5mdW5jdGlvbiBJbXBhY3RHcmFwaChwcm9wczogeyBkYXRhOiBJbXBhY3RTY29wZVBheWxvYWQ7IHQ6IChrZXk6IHN0cmluZykgPT4gc3RyaW5nIH0pIHtcclxuICBjb25zdCB7IGRhdGEgfSA9IHByb3BzXHJcbiAgY29uc3QgaW5kaXJlY3QgPSBkYXRhLmxldmVscy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwgPT09ICdpbmRpcmVjdCcpXHJcbiAgY29uc3QgcG90ZW50aWFsID0gZGF0YS5sZXZlbHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmxldmVsID09PSAncG90ZW50aWFsJylcclxuICBjb25zdCBjb2wwID0gZGF0YS5jaGFuZ2VkRmlsZXMuc2xpY2UoMCwgNylcclxuICBjb25zdCBjb2wxID0gQXJyYXkuZnJvbShuZXcgU2V0KGluZGlyZWN0Lm1hcCgoaXRlbSkgPT4gaXRlbS5wYXRoKSkpLnNsaWNlKDAsIDkpXHJcbiAgY29uc3QgY29sMiA9IEFycmF5LmZyb20obmV3IFNldChwb3RlbnRpYWwubWFwKChpdGVtKSA9PiBpdGVtLnBhdGgpKSkuZmlsdGVyKChwKSA9PiAhY29sMS5pbmNsdWRlcyhwKSkuc2xpY2UoMCwgOClcclxuICBjb25zdCBub2RlSCA9IDMwXHJcbiAgY29uc3QgZ2FwID0gMTBcclxuICBjb25zdCBjb2xYID0gWzMwLCAzODAsIDcyMF1cclxuICBjb25zdCBjb2xXID0gMjgwXHJcbiAgY29uc3Qgcm93cyA9IE1hdGgubWF4KGNvbDAubGVuZ3RoLCBjb2wxLmxlbmd0aCwgY29sMi5sZW5ndGgsIDEpXHJcbiAgY29uc3QgaGVpZ2h0ID0gcm93cyAqIChub2RlSCArIGdhcCkgKyA2MFxyXG5cclxuICBjb25zdCBkZXB0aE9mID0gKHBhdGg6IHN0cmluZyk6IG51bWJlciA9PiB7XHJcbiAgICBjb25zdCBpdGVtID0gaW5kaXJlY3QuZmluZCgoZW50cnkpID0+IGVudHJ5LnBhdGggPT09IHBhdGgpID8/IHBvdGVudGlhbC5maW5kKChlbnRyeSkgPT4gZW50cnkucGF0aCA9PT0gcGF0aClcclxuICAgIHJldHVybiBpdGVtPy5kZXB0aCA/PyAwXHJcbiAgfVxyXG5cclxuICBjb25zdCByZW5kZXJDb2wgPSAoY29sOiBudW1iZXIsIGl0ZW1zOiBzdHJpbmdbXSwgY29sb3I6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdID0+IGl0ZW1zLm1hcCgocGF0aCwgaW5kZXgpID0+IHtcclxuICAgIGNvbnN0IHkgPSA0NCArIGluZGV4ICogKG5vZGVIICsgZ2FwKVxyXG4gICAgY29uc3QgZGlyID0gcGF0aC5pbmNsdWRlcygnLycpID8gcGF0aC5zbGljZSgwLCBwYXRoLmxhc3RJbmRleE9mKCcvJykpIDogJydcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdnJywgeyBrZXk6IGAke2NvbH0tJHtwYXRofWAgfSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgncmVjdCcsIHsgeDogY29sWFtjb2xdLCB5LCB3aWR0aDogY29sVywgaGVpZ2h0OiBub2RlSCwgcng6IDYsIGZpbGw6IGNvbG9yLCBzdHJva2U6ICdyZ2JhKDAsMCwwLDAuMyknLCBzdHJva2VXaWR0aDogMSB9KSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGV4dCcsIHsgeDogY29sWFtjb2xdICsgMTAsIHk6IHkgKyAxNCwgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA3MDAsIGZpbGw6ICcjZmZmZmZmJyB9LFxyXG4gICAgICAgIChwYXRoLnNwbGl0KCcvJykucG9wKCkgPz8gcGF0aCkuc2xpY2UoMCwgMzApKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGV4dCcsIHsgeDogY29sWFtjb2xdICsgMTAsIHk6IHkgKyAyNiwgZm9udFNpemU6IDEwLCBmaWxsOiAncmdiYSgyNTUsMjU1LDI1NSwwLjkyKScgfSxcclxuICAgICAgICBkaXIuc2xpY2UoMCwgNDApKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGl0bGUnLCBudWxsLCBwYXRoKSxcclxuICAgIClcclxuICB9KVxyXG5cclxuICBjb25zdCBjaGFpblN0YXJ0ID0gKHJlYXNvbjogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgIGNvbnN0IG1hdGNoID0gcmVhc29uLm1hdGNoKC9wYXRoOiAoLispJC8pXHJcbiAgICBpZiAobWF0Y2ggPT09IG51bGwpIHJldHVybiBkYXRhLmNoYW5nZWRGaWxlc1swXSA/PyAnJ1xyXG4gICAgcmV0dXJuIG1hdGNoWzFdIS5zcGxpdCgnIC0+ICcpWzBdID8/IGRhdGEuY2hhbmdlZEZpbGVzWzBdID8/ICcnXHJcbiAgfVxyXG4gIGNvbnN0IGluZGV4SW4gPSAoaXRlbXM6IHN0cmluZ1tdLCBwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4gaXRlbXMuaW5kZXhPZihwYXRoKVxyXG4gIGNvbnN0IGNvbE9mID0gKHBhdGg6IHN0cmluZyk6IG51bWJlciA9PiB7XHJcbiAgICBpZiAoY29sMC5pbmNsdWRlcyhwYXRoKSkgcmV0dXJuIDBcclxuICAgIGlmIChjb2wxLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMVxyXG4gICAgaWYgKGNvbDIuaW5jbHVkZXMocGF0aCkpIHJldHVybiAyXHJcbiAgICByZXR1cm4gLTFcclxuICB9XHJcblxyXG4gIGNvbnN0IGVkZ2VzOiBSZWFjdC5SZWFjdE5vZGVbXSA9IFtdXHJcbiAgY29uc3QgcHVzaEVkZ2UgPSAoZnJvbVBhdGg6IHN0cmluZywgdG9QYXRoOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcsIGtleTogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBmcm9tQ29sID0gY29sT2YoZnJvbVBhdGgpXHJcbiAgICBjb25zdCB0b0NvbCA9IGNvbE9mKHRvUGF0aClcclxuICAgIGlmIChmcm9tQ29sID09PSAtMSB8fCB0b0NvbCA9PT0gLTEgfHwgdG9Db2wgPD0gZnJvbUNvbCkgcmV0dXJuXHJcbiAgICBjb25zdCB4MSA9IGNvbFhbZnJvbUNvbF0gKyBjb2xXXHJcbiAgICBjb25zdCB5MSA9IDQ0ICsgaW5kZXhJbihbY29sMCwgY29sMSwgY29sMl1bZnJvbUNvbF0gPz8gW10sIGZyb21QYXRoKSAqIChub2RlSCArIGdhcCkgKyBub2RlSCAvIDJcclxuICAgIGNvbnN0IHgyID0gY29sWFt0b0NvbF1cclxuICAgIGNvbnN0IHkyID0gNDQgKyBpbmRleEluKFtjb2wwLCBjb2wxLCBjb2wyXVt0b0NvbF0gPz8gW10sIHRvUGF0aCkgKiAobm9kZUggKyBnYXApICsgbm9kZUggLyAyXHJcbiAgICBlZGdlcy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3BhdGgnLCB7XHJcbiAgICAgIGtleSwgZDogYE0gJHt4MX0gJHt5MX0gQyAke3gxICsgMzB9ICR7eTF9LCAke3gyIC0gMzB9ICR7eTJ9LCAke3gyfSAke3kyfWAsXHJcbiAgICAgIGZpbGw6ICdub25lJywgc3Ryb2tlOiBjb2xvciwgc3Ryb2tlV2lkdGg6IDEuNiwgb3BhY2l0eTogMC42LFxyXG4gICAgfSkpXHJcbiAgfVxyXG4gIGZvciAoY29uc3QgaXRlbSBvZiBpbmRpcmVjdC5zbGljZSgwLCAyMCkpIHB1c2hFZGdlKGNoYWluU3RhcnQoaXRlbS5yZWFzb24pLCBpdGVtLnBhdGgsIHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JyksIGBlaS0ke2l0ZW0ucGF0aH1gKVxyXG4gIGZvciAoY29uc3QgaXRlbSBvZiBwb3RlbnRpYWwuc2xpY2UoMCwgMTYpKSBwdXNoRWRnZShjaGFpblN0YXJ0KGl0ZW0ucmVhc29uKSwgaXRlbS5wYXRoLCB0aGVtZUF3YXJlVGV4dCgnIzU3NjA2YScpLCBgZXAtJHtpdGVtLnBhdGh9YClcclxuXHJcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIG51bGwsXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzdmcnLCB7IHdpZHRoOiAnMTAwJScsIHZpZXdCb3g6IGAwIDAgMTAyNCAke2hlaWdodH1gLCBzdHlsZTogeyBtYXhIZWlnaHQ6IDQ4MCB9IH0sXHJcbiAgICAgIFtbJ1x1NTNEOFx1NjZGNFx1NjU4N1x1NEVGNicsIDBdLCBbJ1x1OTVGNFx1NjNBNVx1NUY3MVx1NTRDRFx1RkYwOFx1OEMwMVx1NUYxNVx1NzUyOFx1NEU4Nlx1NUI4M1x1RkYwOScsIDFdLCBbJ1x1NkY1Q1x1NTcyOFx1NUY3MVx1NTRDRFx1RkYwOFx1NEU4Q1x1N0VBN1x1NEYyMFx1NjRBRFx1RkYwOScsIDJdXS5tYXAoKFtuYW1lLCBjb2xdKSA9PlxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3RleHQnLCB7IGtleTogU3RyaW5nKGNvbCksIHg6IGNvbFhbY29sIGFzIG51bWJlcl0sIHk6IDI0LCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgZmlsbDogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSwgbmFtZSBhcyBzdHJpbmcpKSxcclxuICAgICAgcmVuZGVyQ29sKDAsIGNvbDAsICcjMjU2M2ViJyksXHJcbiAgICAgIHJlbmRlckNvbCgxLCBjb2wxLCAnI2Q5NzcwNicpLFxyXG4gICAgICByZW5kZXJDb2woMiwgY29sMiwgJyM1NzYwNmEnKSxcclxuICAgICAgZWRnZXMsXHJcbiAgICApLFxyXG4gIClcclxufVxyXG5cclxuY29uc3QgRElGRl9LRVlXT1JEUyA9IC9cXGIocHVibGljfHByaXZhdGV8cHJvdGVjdGVkfGludGVybmFsfHN0YXRpY3x2b2lkfGNsYXNzfHN0cnVjdHxpbnRlcmZhY2V8ZW51bXxuZXd8cmV0dXJufGlmfGVsc2V8Zm9yfGZvcmVhY2h8d2hpbGV8c3dpdGNofGNhc2V8YnJlYWt8Y29udGludWV8dHJ5fGNhdGNofGZpbmFsbHl8dGhyb3d8dXNpbmd8bmFtZXNwYWNlfGltcG9ydHxleHBvcnR8ZnJvbXxjb25zdHxsZXR8dmFyfGFzeW5jfGF3YWl0fGZ1bmN0aW9ufHRoaXN8YmFzZXxzdXBlcnxudWxsfHRydWV8ZmFsc2V8b3ZlcnJpZGV8dmlydHVhbHxhYnN0cmFjdHxzZWFsZWR8cmVhZG9ubHl8cGFyYW1zfG91dHxyZWZ8eWllbGR8dHlwZW9mfGluc3RhbmNlb2Z8aW58b2Z8ZGVmYXVsdHxzdHJpbmd8aW50fGxvbmd8ZG91YmxlfGZsb2F0fGJvb2x8Y2hhcnxkZWNpbWFsfG9iamVjdHxyZWNvcmR8cGFydGlhbHxnZXR8c2V0fHJlcXVpcmV8bW9kdWxlfHR5cGV8aW1wbGVtZW50c3xleHRlbmRzKVxcYi9nXHJcblxyXG4vKiogXHU1MzU1XHU4ODRDXHU0RUUzXHU3ODAxXHU5QUQ4XHU0RUFFXHVGRjFBXHU2Q0U4XHU5MUNBID4gXHU1QjU3XHU3QjI2XHU0RTMyID4gXHU1MTczXHU5NTJFXHU1QjU3L1x1NjU3MFx1NUI1NyBcdTRFMDlcdTVDNDJcdTc3NDBcdTgyNzJcdUZGMDhcdThGN0JcdTkxQ0ZcdTZCNjNcdTUyMTlcdUZGMENcdTU5MUZcdTY4MzhcdTY3RTVcdTc1MjhcdUZGMDlcdTMwMDIgKi9cclxuZnVuY3Rpb24gaGlnaGxpZ2h0Q29kZUxpbmUobGluZTogc3RyaW5nLCBrZXlQcmVmaXg6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdIHtcclxuICBjb25zdCB0cmltbWVkID0gbGluZS50cmltU3RhcnQoKVxyXG4gIGlmICh0cmltbWVkLnN0YXJ0c1dpdGgoJy8vJykgfHwgdHJpbW1lZC5zdGFydHNXaXRoKCcvLy8nKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJyonKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJy8qJykgfHwgdHJpbW1lZC5zdGFydHNXaXRoKCcjJykpIHtcclxuICAgIHJldHVybiBbUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsga2V5OiBgJHtrZXlQcmVmaXh9LWNgLCBzdHlsZTogeyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM2YTk5NTUnKSB9IH0sIGxpbmUpXVxyXG4gIH1cclxuICBjb25zdCBwYXJ0cyA9IGxpbmUuc3BsaXQoLyhcIig/OlteXCJcXFxcXXxcXFxcLikqXCJ8Jyg/OlteJ1xcXFxdfFxcXFwuKSonfGAoPzpbXmBcXFxcXXxcXFxcLikqYCkvZylcclxuICByZXR1cm4gcGFydHMubWFwKChwYXJ0LCBpKSA9PiB7XHJcbiAgICBpZiAoaSAlIDIgPT09IDEpIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBrZXk6IGAke2tleVByZWZpeH0tcyR7aX1gLCBzdHlsZTogeyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNjZTkxNzgnKSB9IH0sIHBhcnQpXHJcbiAgICBjb25zdCBzdWI6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cclxuICAgIGxldCBsYXN0ID0gMFxyXG4gICAgZm9yIChjb25zdCBtYXRjaCBvZiBwYXJ0Lm1hdGNoQWxsKERJRkZfS0VZV09SRFMpKSB7XHJcbiAgICAgIGlmIChtYXRjaC5pbmRleCEgPiBsYXN0KSBzdWIucHVzaChwYXJ0LnNsaWNlKGxhc3QsIG1hdGNoLmluZGV4KSlcclxuICAgICAgc3ViLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsga2V5OiBgJHtrZXlQcmVmaXh9LWske2l9LSR7bWF0Y2guaW5kZXh9YCwgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjNTY5Y2Q2JykgfSB9LCBtYXRjaFswXSkpXHJcbiAgICAgIGxhc3QgPSBtYXRjaC5pbmRleCEgKyBtYXRjaFswXS5sZW5ndGhcclxuICAgIH1cclxuICAgIGlmIChsYXN0IDwgcGFydC5sZW5ndGgpIHN1Yi5wdXNoKHBhcnQuc2xpY2UobGFzdCkpXHJcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgeyBrZXk6IGAke2tleVByZWZpeH0tcCR7aX1gIH0sIHN1YilcclxuICB9KVxyXG59XHJcblxyXG4vKiogXHU5QUQ4XHU0RUFFXHU1REVFXHU1RjAyXHU4OUM2XHU1NkZFXHVGRjFBXHU4OUUzXHU2NzkwIHVuaWZpZWQgZGlmZlx1RkYwQ1x1NjMwOSBcdTU4OUUvXHU1MjIwL1x1NTc1N1x1NTkzNC9cdTRFMEFcdTRFMEJcdTY1ODcgXHU3NzQwXHU4MjcyXHUzMDAyICovXHJcbmZ1bmN0aW9uIERpZmZWaWV3KHByb3BzOiB7IHBhdGNoOiBzdHJpbmcgfSkge1xyXG4gIGNvbnN0IGxpbmVzID0gcHJvcHMucGF0Y2guc3BsaXQoJ1xcbicpLmZpbHRlcigobGluZSwgaSkgPT4gIShsaW5lID09PSAnJyAmJiBpID09PSBwcm9wcy5wYXRjaC5zcGxpdCgnXFxuJykubGVuZ3RoIC0gMSkpXHJcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgIHN0eWxlOiB7XHJcbiAgICAgIGZvbnRGYW1pbHk6ICdDb25zb2xhcywgbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4JywgbGluZUhlaWdodDogMS41NSxcclxuICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXHJcbiAgICAgIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMCcsIG1heEhlaWdodDogNDIwLCBvdmVyZmxvd1k6ICdhdXRvJywgbWFyZ2luVG9wOiAnNnB4JyxcclxuICAgIH0sXHJcbiAgfSwgbGluZXMubWFwKChsaW5lLCBpKSA9PiB7XHJcbiAgICBjb25zdCBraW5kID0gbGluZS5zdGFydHNXaXRoKCcrKysnKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJy0tLScpID8gJ21ldGEnXHJcbiAgICAgIDogbGluZS5zdGFydHNXaXRoKCdAQCcpID8gJ2h1bmsnXHJcbiAgICAgICAgOiBsaW5lLnN0YXJ0c1dpdGgoJysnKSA/ICdhZGQnXHJcbiAgICAgICAgICA6IGxpbmUuc3RhcnRzV2l0aCgnLScpID8gJ2RlbCcgOiAnY3R4J1xyXG4gICAgY29uc3QgYmcgPSBraW5kID09PSAnYWRkJyA/ICdyZ2JhKDQ2LDE2MCw2NywwLjE0KScgOiBraW5kID09PSAnZGVsJyA/ICdyZ2JhKDI0OCw4MSw3MywwLjEzKScgOiBraW5kID09PSAnaHVuaycgPyAncmdiYSg1NiwxMzksMjUzLDAuMSknIDogJ3RyYW5zcGFyZW50J1xyXG4gICAgY29uc3QgY29udGVudCA9IGtpbmQgPT09ICdtZXRhJyB8fCBraW5kID09PSAnaHVuaydcclxuICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBzdHlsZTogeyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyMwOTY5ZGEnKSwgZm9udFdlaWdodDogNjAwIH0gfSwgbGluZSlcclxuICAgICAgOiBraW5kID09PSAnYWRkJyB8fCBraW5kID09PSAnZGVsJ1xyXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KGtpbmQgPT09ICdhZGQnID8gJyMxYTdmMzcnIDogJyNjZjIyMmUnKSwgZm9udFdlaWdodDogNjAwIH0gfSwgbGluZVswXSlcclxuICAgICAgICA6IG51bGxcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGtleTogaSwgc3R5bGU6IHsgcGFkZGluZzogJzAgMTBweCcsIGJhY2tncm91bmQ6IGJnLCB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH0gfSxcclxuICAgICAgY29udGVudCxcclxuICAgICAga2luZCA9PT0gJ2FkZCcgfHwga2luZCA9PT0gJ2RlbCcgPyBoaWdobGlnaHRDb2RlTGluZShsaW5lLnNsaWNlKDEpLCBgbCR7aX1gKSA6IGhpZ2hsaWdodENvZGVMaW5lKGxpbmUsIGBsJHtpfWApLFxyXG4gICAgKVxyXG4gIH0pKVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb3JtYXRUaW1lKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuICdcdTIwMTQnXHJcbiAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKS50b0xvY2FsZVN0cmluZygpXHJcbn1cclxuXHJcbi8qKiBcdTRFOENcdTZCMjFcdTc4NkVcdThCQTRcdTVGMzlcdTdBOTdcdUZGMUFcdTkwNkVcdTdGNjkgKyBcdTVDNDVcdTRFMkRcdTUzNjFcdTcyNDdcdUZGMENcdTUzNzFcdTk2NjlcdTY0Q0RcdTRGNUNcdUZGMDhcdTUyMjBcdTk2NjRcdTdCMTRcdThCQjAvXHU1M0Q4XHU2NkY0L1x1N0VBNlx1Njc1Rlx1RkYwOVx1NTE3MVx1NzUyOFx1RkYxQmFsdCBcdTYzRDBcdTRGOUJcdTdCMkNcdTRFOENcdTc4NkVcdThCQTRcdTUyQThcdTRGNUNcdUZGMDhcdTU5ODJcIlx1NTE0OFx1NTFGQVx1NjVCOVx1Njg0OFwiXHVGRjA5XHUzMDAyICovXHJcbmZ1bmN0aW9uIENvbmZpcm1EaWFsb2cocHJvcHM6IHsgdGl0bGU6IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nOyBkYW5nZXI/OiBib29sZWFuOyBjb25maXJtTGFiZWw/OiBzdHJpbmc7IGFsdD86IHsgbGFiZWw6IHN0cmluZzsgb25BbHQ6ICgpID0+IHZvaWQgfTsgb25DYW5jZWw6ICgpID0+IHZvaWQ7IG9uQ29uZmlybTogKCkgPT4gdm9pZCB9KSB7XHJcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLW92ZXJsYXknLFxyXG4gICAgICBzdHlsZToge1xyXG4gICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLCBpbnNldDogMCwgekluZGV4OiA5OTksXHJcbiAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMTUsMjMsNDIsMC40NSknLCBiYWNrZHJvcEZpbHRlcjogJ2JsdXIoMnB4KScsXHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG4gICAgICAgIGFuaW1hdGlvbjogJ3BjRmFkZUluIDAuMTVzIGVhc2Utb3V0JyxcclxuICAgICAgfSxcclxuICAgICAgb25DbGljazogcHJvcHMub25DYW5jZWwsXHJcbiAgICB9LFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgJ2RhdGEtdGVzdGlkJzogJ3BjLWNvbmZpcm0tY2FyZCcsXHJcbiAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgIHdpZHRoOiA0MDAsIG1heFdpZHRoOiAnY2FsYygxMDB2dyAtIDQ4cHgpJyxcclxuICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsIGJveFNoYWRvdzogJzAgMjBweCA1MHB4IHJnYmEoMCwwLDAsMC4yNSknLFxyXG4gICAgICAgICAgcGFkZGluZzogJzIwcHggMjJweCAxNnB4JyxcclxuICAgICAgICAgIG9uQ2xpY2s6IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCkgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsIGdhcDogJzEwcHgnIH0gfSxcclxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICB3aWR0aDogMzQsIGhlaWdodDogMzQsIGJvcmRlclJhZGl1czogJzUwJScsIGZsZXhTaHJpbms6IDAsXHJcbiAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnMTdweCcsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogcHJvcHMuZGFuZ2VyID8gJ3JnYmEoMjQ0LDYzLDk0LDAuMTIpJyA6ICdyZ2JhKDM3LDk5LDIzNSwwLjEpJyxcclxuICAgICAgICAgICAgICBjb2xvcjogcHJvcHMuZGFuZ2VyID8gdGhlbWVBd2FyZVRleHQoJyNlMTFkNDgnKSA6IHRoZW1lQXdhcmVUZXh0KCcjMjU2M2ViJyksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LCBwcm9wcy5kYW5nZXIgPyAnIScgOiAnPycpLFxyXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzZweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9IH0sIHByb3BzLnRpdGxlKSxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH0gfSwgcHJvcHMubWVzc2FnZSksXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICksXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnLCBnYXA6ICcxMHB4JywgbWFyZ2luVG9wOiAnMThweCcsIGZsZXhXcmFwOiAnd3JhcCcgfSB9LFxyXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICBzdHlsZTogeyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnN3B4IDE4cHgnLCBib3JkZXJSYWRpdXM6ICc4cHgnIH0sXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ2FuY2VsLFxyXG4gICAgICAgICAgfSwgJ1x1NTNENlx1NkQ4OCcpLFxyXG4gICAgICAgICAgcHJvcHMuYWx0ICE9PSB1bmRlZmluZWQgJiYgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICBzdHlsZTogeyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnN3B4IDE4cHgnLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBmb250V2VpZ2h0OiA2MDAgfSxcclxuICAgICAgICAgICAgb25DbGljazogcHJvcHMuYWx0Lm9uQWx0LFxyXG4gICAgICAgICAgfSwgcHJvcHMuYWx0LmxhYmVsKSxcclxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcclxuICAgICAgICAgICAgJ2RhdGEtdGVzdGlkJzogJ3BjLWNvbmZpcm0tb2snLFxyXG4gICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc3cHggMThweCcsIGJvcmRlclJhZGl1czogJzhweCcsIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNTAwLFxyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHByb3BzLmRhbmdlciA/ICcjZTExZDQ4JyA6ICd2YXIoLS1kc3ctYWxpYXMtYnV0dG9uLWluZm8tZmlsbCwgIzI1NjNlYiknLCBjb2xvcjogJyNmZmYnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5vbkNvbmZpcm0sXHJcbiAgICAgICAgICB9LCBwcm9wcy5jb25maXJtTGFiZWwgPz8gJ1x1Nzg2RVx1OEJBNFx1NTIyMFx1OTY2NCcpLFxyXG4gICAgICAgICksXHJcbiAgICAgICksXHJcbiAgICApLFxyXG4gIClcclxufVxyXG5cclxuLyoqIFx1OUFBOFx1NjdCNlx1NUMwRlx1NTM2MVx1NzI0N1x1MzAwMiAqL1xyXG5mdW5jdGlvbiBDYXJkKHByb3BzOiB7IHRpdGxlPzogUmVhY3QuUmVhY3ROb2RlOyBjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZSB9KSB7XHJcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5jYXJkIH0sXHJcbiAgICBwcm9wcy50aXRsZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5zZWN0aW9uVGl0bGUgfSwgcHJvcHMudGl0bGUpLFxyXG4gICAgcHJvcHMuY2hpbGRyZW4pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBcdTVERTVcdTRGNUNcdTUzRjBcdTRFM0JcdTdFQzRcdTRFRjZcdUZGMUFcdTU2REJcdTk4NzVcdTdCN0VcdUZGMDhcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTRFM0FcdTlFRDhcdThCQTRcdUZGMDkrIFx1OEY2RVx1OEJFMlx1NUJCRlx1NEUzQiBBUEkgKyBcdTYzMDlcdTk0QUVcdTUzMTZcdTY0Q0RcdTRGNUNcdTMwMDJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBXb3Jrc3BhY2VGcmFtZShwcm9wczogV29ya3NwYWNlRnJhbWVQcm9wcykge1xyXG4gIGNvbnN0IHQgPSBwcm9wcy50ID8/IGZhbGxiYWNrVFxyXG4gIGNvbnN0IGFjdGl2ZVJlZiA9IHVzZVJlZih0cnVlKVxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBhY3RpdmVSZWYuY3VycmVudCA9IHRydWVcclxuICAgIHJldHVybiAoKSA9PiB7IGFjdGl2ZVJlZi5jdXJyZW50ID0gZmFsc2UgfVxyXG4gIH0sIFtdKVxyXG4gIGNvbnN0IFt0YWIsIHNldFRhYl0gPSB1c2VTdGF0ZTxUYWJLZXk+KCdjb21taXRzJylcclxuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlPFdvcmtzcGFjZVN0YXRlIHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbbG9hZEVycm9yLCBzZXRMb2FkRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbYm9vdHN0cmFwcGluZywgc2V0Qm9vdHN0cmFwcGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcclxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFthY3Rpb25SZXN1bHQsIHNldEFjdGlvblJlc3VsdF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtjaGFuZ2VUaXRsZSwgc2V0Q2hhbmdlVGl0bGVdID0gdXNlU3RhdGUoJycpXHJcbiAgY29uc3QgW2NoYW5nZURlc2MsIHNldENoYW5nZURlc2NdID0gdXNlU3RhdGUoJycpXHJcbiAgY29uc3QgW21lbW9yeVRpdGxlLCBzZXRNZW1vcnlUaXRsZV0gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbbWVtb3J5Q29udGVudCwgc2V0TWVtb3J5Q29udGVudF0gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbY29uZmlybWVkVGV4dCwgc2V0Q29uZmlybWVkVGV4dF0gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbY29uZmlybWVkUGF0aHMsIHNldENvbmZpcm1lZFBhdGhzXSA9IHVzZVN0YXRlKCcnKVxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XHU3MkI2XHU2MDAxIFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFtjb21taXRzRGF0YSwgc2V0Q29tbWl0c0RhdGFdID0gdXNlU3RhdGU8Q29tbWl0c1BheWxvYWQgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtjb21taXRzRXJyb3IsIHNldENvbW1pdHNFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtwaWNrZXJPcGVuLCBzZXRQaWNrZXJPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IFtwaWNrZXJGaWx0ZXIsIHNldFBpY2tlckZpbHRlcl0gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbc2VsZWN0ZWRUYXJnZXRzLCBzZXRTZWxlY3RlZFRhcmdldHNdID0gdXNlU3RhdGU8c3RyaW5nW10+KFtdKVxyXG4gIGNvbnN0IFtkZXRhaWxzLCBzZXREZXRhaWxzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIENvbW1pdERldGFpbFBheWxvYWQ+Pih7fSlcclxuICAvKiogXHU4OUUzXHU4QkZCXHU0RUZCXHU1MkExXHU3MkI2XHU2MDAxXHVGRjFBcXVldWVkPVx1NjM5Mlx1OTYxRlx1N0I0OVx1NEUzMlx1ODg0Q1x1OTYxRlx1NTIxN1x1RkYwQ3J1bm5pbmc9XHU2QjYzXHU1NzI4XHU4QkY3XHU2QzQyXHVGRjA4XHU1OTFBXHU5MDA5L1x1NjU3NFx1OEY2RVx1NjVGNlx1ODFFQVx1NTJBOFx1OTAxMFx1NEUyQVx1NTIwNlx1Njc5MFx1RkYwOVx1MzAwMiAqL1xyXG4gIGNvbnN0IFtkZXRhaWxTdGF0dXMsIHNldERldGFpbFN0YXR1c10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCAncXVldWVkJyB8ICdydW5uaW5nJz4+KHt9KVxyXG4gIGNvbnN0IGRldGFpbFF1ZXVlZENvdW50ID0gT2JqZWN0LnZhbHVlcyhkZXRhaWxTdGF0dXMpLmZpbHRlcigoc3RhdHVzKSA9PiBzdGF0dXMgPT09ICdxdWV1ZWQnKS5sZW5ndGhcclxuICBjb25zdCBkZXRhaWxSdW5uaW5nQ291bnQgPSBPYmplY3QudmFsdWVzKGRldGFpbFN0YXR1cykuZmlsdGVyKChzdGF0dXMpID0+IHN0YXR1cyA9PT0gJ3J1bm5pbmcnKS5sZW5ndGhcclxuICBjb25zdCBbaW1wYWN0LCBzZXRJbXBhY3RdID0gdXNlU3RhdGU8SW1wYWN0U2NvcGVQYXlsb2FkIHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbaW1wYWN0TG9hZGluZywgc2V0SW1wYWN0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcclxuICBjb25zdCBbcmV2aWV3cywgc2V0UmV2aWV3c10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBSZXZpZXdQYXlsb2FkPj4oe30pXHJcbiAgY29uc3QgW3Jldmlld0xvYWRpbmcsIHNldFJldmlld0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgY29uc3QgW2ZpbGVEaWZmcywgc2V0RmlsZURpZmZzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KHt9KVxyXG4gIGNvbnN0IFtjb25maXJtRGlhbG9nLCBzZXRDb25maXJtRGlhbG9nXSA9IHVzZVN0YXRlPHsgdGl0bGU6IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nOyBkYW5nZXI/OiBib29sZWFuOyBjb25maXJtTGFiZWw/OiBzdHJpbmc7IGFsdD86IHsgbGFiZWw6IHN0cmluZzsgb25BbHQ6ICgpID0+IHZvaWQgfTsgb25Db25maXJtOiAoKSA9PiB2b2lkIH0gfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtub3Rlcywgc2V0Tm90ZXNdID0gdXNlU3RhdGU8Tm90ZUVudHJ5W10+KFtdKVxyXG4gIGNvbnN0IFtub3RlVGl0bGUsIHNldE5vdGVUaXRsZV0gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbbm90ZUNvbnRlbnQsIHNldE5vdGVDb250ZW50XSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtub3RlVGFncywgc2V0Tm90ZVRhZ3NdID0gdXNlU3RhdGUoJycpXHJcbiAgY29uc3QgW2VkaXRpbmdOb3RlLCBzZXRFZGl0aW5nTm90ZV0gPSB1c2VTdGF0ZTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZzsgdGFnczogc3RyaW5nIH0gfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtub3RlU2VhcmNoLCBzZXROb3RlU2VhcmNoXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtub3RlRXhwYW5kZWQsIHNldE5vdGVFeHBhbmRlZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oe30pXHJcbiAgY29uc3QgW2lzc3Vlc0RhdGEsIHNldElzc3Vlc0RhdGFdID0gdXNlU3RhdGU8SXNzdWVFbnRyeVtdIHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbaXNzdWVTZXZlcml0eUZpbHRlciwgc2V0SXNzdWVTZXZlcml0eUZpbHRlcl0gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbaXNzdWVTdGF0dXNGaWx0ZXIsIHNldElzc3VlU3RhdHVzRmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtpc3N1ZUV4cGFuZGVkLCBzZXRJc3N1ZUV4cGFuZGVkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+Pih7fSlcclxuICBjb25zdCBbZml4RXhwYW5kZWQsIHNldEZpeEV4cGFuZGVkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+Pih7fSlcclxuICBjb25zdCBbdmVyaWZ5aW5nVGFyZ2V0LCBzZXRWZXJpZnlpbmdUYXJnZXRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbaXNzdWVDaGVja2VkLCBzZXRJc3N1ZUNoZWNrZWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KVxyXG4gIGNvbnN0IFtiYXRjaFZlcmlmeVN0YXRlLCBzZXRCYXRjaFZlcmlmeVN0YXRlXSA9IHVzZVN0YXRlPHsgZG9uZTogbnVtYmVyOyB0b3RhbDogbnVtYmVyIH0gfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFt0cmlhZ2VTdGF0ZSwgc2V0VHJpYWdlU3RhdGVdID0gdXNlU3RhdGU8eyBwcm9jZXNzZWQ6IG51bWJlcjsgcmVtYWluaW5nOiBudW1iZXIgfSB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgYmF0Y2hTdG9wUmVmID0gdXNlUmVmKGZhbHNlKVxyXG4gIGNvbnN0IFtmaXhUYXNrcywgc2V0Rml4VGFza3NdID0gdXNlU3RhdGU8Rml4VGFza0VudHJ5W10+KFtdKVxyXG4gIGNvbnN0IFtmaXhDb25jdXJyZW5jeSwgc2V0Rml4Q29uY3VycmVuY3ldID0gdXNlU3RhdGUoJzMnKVxyXG4gIGNvbnN0IFthaVN1bW1hcml6aW5nLCBzZXRBaVN1bW1hcml6aW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IFtuYXJyYXRpdmUsIHNldE5hcnJhdGl2ZV0gPSB1c2VTdGF0ZTx7IG5hcnJhdGl2ZTogc3RyaW5nOyBjYWNoZWQ6IGJvb2xlYW47IGdlbmVyYXRlZEF0PzogbnVtYmVyOyBjb3N0VXNkPzogbnVtYmVyIH0gfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IFtuYXJyYXRpdmVCdXN5LCBzZXROYXJyYXRpdmVCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IFtwZWVrLCBzZXRQZWVrXSA9IHVzZVN0YXRlPHsgcGF0aDogc3RyaW5nOyBsaW5lOiBudW1iZXIgfSB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW3BlZWtEYXRhLCBzZXRQZWVrRGF0YV0gPSB1c2VTdGF0ZTxQZWVrUGF5bG9hZCB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW3BlZWtCdXN5LCBzZXRQZWVrQnVzeV0gPSB1c2VTdGF0ZShmYWxzZSlcclxuICBjb25zdCBbbmFycmF0aXZlRXJyb3IsIHNldE5hcnJhdGl2ZUVycm9yXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFttb2RlbFRpZXJzLCBzZXRNb2RlbFRpZXJzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIHsgcHJvdmlkZXI6IHN0cmluZzsgbW9kZWw6IHN0cmluZyB9PiB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW21vZGVsT3B0aW9ucywgc2V0TW9kZWxPcHRpb25zXSA9IHVzZVN0YXRlPEFycmF5PHsgcHJvdmlkZXI6IHN0cmluZzsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nIH0+PihbXSlcclxuICBjb25zdCBbbW9kZWxTYXZpbmcsIHNldE1vZGVsU2F2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IFttb2RlbFNhdmVkLCBzZXRNb2RlbFNhdmVkXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdUZGMUFcdThCQTFcdTUyMTJcdTc4NkVcdThCQTQgLyBSdW4gXHU4QkU2XHU2MEM1IC8gXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExIFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFtwbGFuQ29uZmlybSwgc2V0UGxhbkNvbmZpcm1dID0gdXNlU3RhdGU8eyBjaGFuZ2VJZDogc3RyaW5nOyBzdGVwczogUGxhbkNvbmZpcm1TdGVwW10gfSB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW3BsYW5CdXN5LCBzZXRQbGFuQnVzeV0gPSB1c2VTdGF0ZShmYWxzZSlcclxuICBjb25zdCBbcnVuRGV0YWlsLCBzZXRSdW5EZXRhaWxdID0gdXNlU3RhdGU8UnVuRGV0YWlsIHwgbnVsbD4obnVsbClcclxuICBjb25zdCBbc2NoZWR1bGVkRGF0YSwgc2V0U2NoZWR1bGVkRGF0YV0gPSB1c2VTdGF0ZTxTY2hlZHVsZWRUYXNrRW50cnlbXSB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW3NjaGVkTmFtZSwgc2V0U2NoZWROYW1lXSA9IHVzZVN0YXRlKCcnKVxyXG4gIGNvbnN0IFtzY2hlZE9wZW4sIHNldFNjaGVkT3Blbl0gPSB1c2VTdGF0ZSh0cnVlKVxyXG4gIGNvbnN0IFtzY2hlZFR5cGUsIHNldFNjaGVkVHlwZV0gPSB1c2VTdGF0ZSgncmV2aWV3JylcclxuICBjb25zdCBbc2NoZWRUaXRsZSwgc2V0U2NoZWRUaXRsZV0gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbc2NoZWREZXNjLCBzZXRTY2hlZERlc2NdID0gdXNlU3RhdGUoJycpXHJcbiAgY29uc3QgW3NjaGVkSW50ZXJ2YWwsIHNldFNjaGVkSW50ZXJ2YWxdID0gdXNlU3RhdGUoJzE0NDAnKVxyXG4gIC8vIFx1MjUwMFx1MjUwMCBcdThCQjBcdTVGQzZcdTk3NjJcdTY3N0ZcdUZGMUFcdTUxNjhcdTkxQ0ZcdTY1NzBcdTYzNkUgLyBcdTU0MENcdTZCNjVcdTYyQTVcdTU0NEEgXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW21lbW9yaWVzRGF0YSwgc2V0TWVtb3JpZXNEYXRhXSA9IHVzZVN0YXRlPE1lbW9yaWVzUGF5bG9hZCB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW3N5bmNSZXBvcnQsIHNldFN5bmNSZXBvcnRdID0gdXNlU3RhdGU8U3luY1JlcG9ydCB8IG51bGw+KG51bGwpXHJcbiAgY29uc3QgW21lbW9yeVNjb3BlLCBzZXRNZW1vcnlTY29wZV0gPSB1c2VTdGF0ZTwncHJvamVjdCcgfCAnYnJhbmNoJz4oJ3Byb2plY3QnKVxyXG4gIGNvbnN0IFttZW1vcnlUeXBlLCBzZXRNZW1vcnlUeXBlXSA9IHVzZVN0YXRlKCdhcmNoaXRlY3R1cmVfZGVjaXNpb24nKVxyXG4gIGNvbnN0IFttZW1vcnlTeW5jaW5nLCBzZXRNZW1vcnlTeW5jaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gIGNvbnN0IFtleGVjVGl0bGUsIHNldEV4ZWNUaXRsZV0gPSB1c2VTdGF0ZSgnJylcclxuICBjb25zdCBbZXhlY01vZGVsLCBzZXRFeGVjTW9kZWxdID0gdXNlU3RhdGUoJycpXHJcbiAgY29uc3QgW2V4ZWNEZXNjLCBzZXRFeGVjRGVzY10gPSB1c2VTdGF0ZSgnJylcclxuXHJcbiAgLyoqIFx1N0VERlx1NEUwMCBQT1NUXHVGRjFBXHU1RTI2XHU4RDg1XHU2NUY2XHU1MTVDXHU1RTk1XHVGRjA4TExNIFx1N0FFRlx1NzBCOVx1NjcwRFx1NTJBMVx1N0FFRiAxMjBzIFx1NEYxQVx1OTY0RFx1N0VBN1x1OEZENFx1NTZERVx1RkYwQ1x1NUJBMlx1NjIzN1x1N0FFRiAxODBzIFx1NTNFQVx1NTE1Q1x1NUU5NVx1NzcxRlx1NkI2M1x1NzY4NFx1N0Y1MVx1N0VEQ1x1NEUyRFx1NjVBRFx1RkYwOVx1RkYwQ1x1N0VERFx1NEUwRFx1OEJBOVx1OEJGN1x1NkM0Mlx1NjVFMFx1OTY1MFx1NjMwMlx1OEQ3N1x1MzAwMiAqL1xyXG4gIGNvbnN0IHBvc3QgPSBhc3luYyAocGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgdGltZW91dE1zID0gMTgwXzAwMCk6IFByb21pc2U8eyBvazogYm9vbGVhbjsgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfT4gPT4ge1xyXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKVxyXG4gICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgdGltZW91dE1zKVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChwYXRoLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyAuLi5ib2R5LCBzZXNzaW9uSWQ6IHByb3BzLnNlc3Npb25JZCA/PyAnJyB9KSxcclxuICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICB9KVxyXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgIHJldHVybiB7IG9rOiByZXNwb25zZS5vaywgZGF0YTogKGRhdGEgPz8ge30pIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+IH1cclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBwZWVrXHVGRjFBXHU2MjUzXHU1RjAwXHU2N0QwXHU2NTg3XHU0RUY2XHU2N0QwXHU4ODRDXHU5NjQ0XHU4RkQxXHU3Njg0XHU0RUUzXHU3ODAxXHU0RTBBXHU0RTBCXHU2NTg3XHU2RDZFXHU1QzQyXHVGRjA4XHU2NzA5XHU3NTRDXHU3QjQ5XHU1Rjg1IDEwIFx1NzlEMlx1RkYwOVx1MzAwMiAqL1xyXG4gIHBlZWtPcGVuZXIgPSAocGF0aDogc3RyaW5nLCBsaW5lOiBudW1iZXIpOiB2b2lkID0+IHsgdm9pZCBvcGVuUGVlayhwYXRoLCBsaW5lKSB9XHJcbiAgY29uc3Qgb3BlblBlZWsgPSBhc3luYyAocGF0aDogc3RyaW5nLCBsaW5lOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIHNldFBlZWsoeyBwYXRoLCBsaW5lIH0pXHJcbiAgICBzZXRQZWVrRGF0YShudWxsKVxyXG4gICAgc2V0UGVla0J1c3kodHJ1ZSlcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKClcclxuICAgICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgMTBfMDAwKVxyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9wZWVrJywge1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLCBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHBhdGgsIGxpbmUsIHNlc3Npb25JZDogcHJvcHMuc2Vzc2lvbklkID8/ICcnIH0pLFxyXG4gICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgIH0pXHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcclxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldFBlZWtEYXRhKGRhdGEgYXMgUGVla1BheWxvYWQpXHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgc2V0UGVla0RhdGEoeyBleGlzdHM6IGZhbHNlIH0pXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRQZWVrQnVzeShmYWxzZSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBcdTVERTVcdTRGNUNcdThGNkVcdTZCMjFcdTUzRDlcdTRFOEJcdUZGMUFcdTU5MUFcdTRFMkFcdTkwMDlcdTRFMkRcdTYzRDBcdTRFQTRcdTRGNUNcdTRFM0FcdTRFMDBcdTRFMkFcdTY1NzRcdTRGNTNcdTg5RTNcdThCRkJcdUZGMDhcdTdGMTNcdTVCNTggKyBcdTUzRUZcdTVGM0FcdTUyMzZcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBsb2FkTmFycmF0aXZlID0gYXN5bmMgKGZvcmNlID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGNvbnN0IHNoYXMgPSBzZWxlY3RlZFRhcmdldHMuZmlsdGVyKCh0YXJnZXQpID0+IHRhcmdldCAhPT0gJ3dvcmtpbmcnKVxyXG4gICAgaWYgKHNoYXMubGVuZ3RoIDwgMikgcmV0dXJuXHJcbiAgICBzZXROYXJyYXRpdmVCdXN5KHRydWUpXHJcbiAgICBzZXROYXJyYXRpdmVFcnJvcignJylcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3dvcmstbmFycmF0aXZlJywgeyBzaGFzLCBmb3JjZSB9KVxyXG4gICAgICBpZiAoIW9rKSB7XHJcbiAgICAgICAgc2V0TmFycmF0aXZlRXJyb3IoU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgc2V0TmFycmF0aXZlKHtcclxuICAgICAgICBuYXJyYXRpdmU6IFN0cmluZyhkYXRhWyduYXJyYXRpdmUnXSA/PyAnJyksXHJcbiAgICAgICAgY2FjaGVkOiBkYXRhWydjYWNoZWQnXSA9PT0gdHJ1ZSxcclxuICAgICAgICBnZW5lcmF0ZWRBdDogZGF0YVsnZ2VuZXJhdGVkQXQnXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogTnVtYmVyKGRhdGFbJ2dlbmVyYXRlZEF0J10pLFxyXG4gICAgICAgIGNvc3RVc2Q6IGRhdGFbJ2Nvc3RVc2QnXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogTnVtYmVyKGRhdGFbJ2Nvc3RVc2QnXSksXHJcbiAgICAgIH0pXHJcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xyXG4gICAgICBzZXROYXJyYXRpdmVFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXROYXJyYXRpdmVCdXN5KGZhbHNlKVxyXG4gICAgfVxyXG4gIH1cclxuICAvLyBcdTdFQ0YgcmVmIFx1NjZCNFx1OTczMlx1NjcwMFx1NjVCMFx1OTVFRFx1NTMwNVx1RkYxQVx1NUU3Nlx1NTNEMVx1NkM2MFx1NjM5Mlx1N0E3QVx1ODlFNlx1NTNEMVx1ODFFQVx1NTJBOFx1NTNEOVx1NEU4Qlx1NjVGNlx1OEJGQlx1NTNENlx1NzY4NFx1NjYyRlx1NjcwMFx1NjVCMCBzZWxlY3RlZFRhcmdldHNcdTMwMDJcclxuICB1c2VFZmZlY3QoKCkgPT4geyBsb2FkTmFycmF0aXZlUmVmLmN1cnJlbnQgPSAoKSA9PiB7IHZvaWQgbG9hZE5hcnJhdGl2ZSgpIH0gfSlcclxuXHJcbiAgLyoqIFx1NjI3OVx1OTFDRlx1NTJGRVx1OTAwOVx1NjNEMFx1NEVBNFx1RkYwOFx1NjVCMFx1NTg5RVx1NzY4NFx1OTAxMFx1Njc2MVx1ODlFNlx1NTNEMSBBSSBcdTg5RTNcdThCRkJcdUZGMENcdTVERjJcdTY3MDlcdTc2ODRcdThENzBcdTdGMTNcdTVCNThcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBzZWxlY3RDb21taXRzID0gKHNoYXM6IHN0cmluZ1tdKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBhZGRlZCA9IHNoYXMuZmlsdGVyKChzaGEpID0+ICFzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoc2hhKSlcclxuICAgIHNldFNlbGVjdGVkVGFyZ2V0cygocHJldmlvdXMpID0+IEFycmF5LmZyb20obmV3IFNldChbLi4ucHJldmlvdXMsIC4uLnNoYXNdKSkpXHJcbiAgICBmb3IgKGNvbnN0IHNoYSBvZiBhZGRlZCkgbG9hZERldGFpbChzaGEsIGZhbHNlKVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NEUwMFx1OTUyRVx1NkQ4OFx1NTMxNlx1RkYxQVx1OTAwOVx1NEUyRFx1NTE2OFx1OTBFOFx1NjcyQVx1NkQ4OFx1NTMxNlx1NjNEMFx1NEVBNCBcdTIxOTIgXHU2Mjc5XHU5MUNGXHU4OUUzXHU4QkZCIFx1MjE5MiBcdTYzOTJcdTdBN0FcdTU0MEVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdTY1NzRcdTRGNTNcdTUzRDlcdTRFOEJcdTMwMDIgKi9cclxuICBjb25zdCBkaWdlc3RBbGwgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBzaGFzID0gKGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKS5maWx0ZXIoKGNvbW1pdCkgPT4gaXNVbmRpZ2VzdGVkKGNvbW1pdCkpLm1hcCgoY29tbWl0KSA9PiBjb21taXQuc2hhKVxyXG4gICAgaWYgKHNoYXMubGVuZ3RoID09PSAwKSByZXR1cm5cclxuICAgIHNldEltcGFjdChudWxsKVxyXG4gICAgc2V0UmV2aWV3cyh7fSlcclxuICAgIGNvbnN0IG5lZWRzRmV0Y2ggPSBzaGFzLnNvbWUoKHNoYSkgPT4gIXNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhzaGEpKVxyXG4gICAgc2VsZWN0Q29tbWl0cyhzaGFzKVxyXG4gICAgaWYgKG5lZWRzRmV0Y2gpIHtcclxuICAgICAgYXV0b05hcnJhdGl2ZVJlZi5jdXJyZW50ID0gc2hhcy5sZW5ndGggPj0gMlxyXG4gICAgfSBlbHNlIGlmIChzaGFzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgIC8vIFx1NTE2OFx1OTBFOFx1NURGMlx1NTcyOFx1OTAwOVx1NEUyRFx1OTZDNlx1NTQwOFx1NEUxNFx1ODlFM1x1OEJGQlx1OTYxRlx1NTIxN1x1N0E3QVx1OTVGMlx1RkYxQVx1NzZGNFx1NjNBNVx1NzUxRlx1NjIxMFx1NTNEOVx1NEU4Qlx1RkYwOFx1N0I0OVx1NEUwMFx1NjJDRFx1OEJBOSBzdGF0ZSBcdTg0M0RcdTU3MzBcdUZGMDlcdTMwMDJcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IGxvYWROYXJyYXRpdmVSZWYuY3VycmVudCgpIH0sIDApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb21taXRzUmVxdWVzdFJlZiA9IHVzZVJlZigwKVxyXG4gIGNvbnN0IGxvYWRDb21taXRzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9ICsrY29tbWl0c1JlcXVlc3RSZWYuY3VycmVudFxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL3Byb2plY3QtY29udHJvbC9hcGkvY29tbWl0cz9zZXNzaW9uSWQ9JHtlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKX0mbGltaXQ9NjBgKVxyXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcigoZGF0YSBhcyB7IGVycm9yPzogc3RyaW5nIH0pLmVycm9yID8/IGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApXHJcbiAgICAgIGlmICghYWN0aXZlUmVmLmN1cnJlbnQgfHwgcmVxdWVzdCAhPT0gY29tbWl0c1JlcXVlc3RSZWYuY3VycmVudCkgcmV0dXJuXHJcbiAgICAgIHNldENvbW1pdHNEYXRhKGRhdGEgYXMgQ29tbWl0c1BheWxvYWQpXHJcbiAgICAgIHNldENvbW1pdHNFcnJvcihudWxsKVxyXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcclxuICAgICAgaWYgKCFhY3RpdmVSZWYuY3VycmVudCB8fCByZXF1ZXN0ICE9PSBjb21taXRzUmVxdWVzdFJlZi5jdXJyZW50KSByZXR1cm5cclxuICAgICAgc2V0Q29tbWl0c0RhdGEobnVsbClcclxuICAgICAgc2V0Q29tbWl0c0Vycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGxvYWROb3RlcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXHJcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXROb3RlcygoZGF0YSBhcyB7IG5vdGVzOiBOb3RlRW50cnlbXSB9KS5ub3RlcyA/PyBbXSlcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBcdTdCMTRcdThCQjBcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcdUZGMUFcdTUyMTdcdTg4NjhcdTRGRERcdTYzMDFcdTUzOUZcdTY4MzdcdTMwMDJcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBcdTUyRkVcdTkwMDkvXHU1M0Q2XHU2RDg4XHU0RTAwXHU2QjIxXHU2M0QwXHU0RUE0XHVGRjFBXHU5MUNEXHU3Qjk3XHU5MDA5XHU0RTJEXHU5NkM2XHU1NDA4XHVGRjBDXHU1RTc2XHU2MzA5XHU5NzAwXHU4ODY1XHU5RjUwXHU2QkNGXHU2NzYxXHU2M0QwXHU0RUE0XHU3Njg0IEFJIFx1ODlFM1x1OEJGQlx1RkYwOFx1NjcwRFx1NTJBMVx1N0FFRlx1NjcwOVx1N0YxM1x1NUI1OFx1RkYwOVx1MzAwMiAqL1xyXG4gIGNvbnN0IHRvZ2dsZVRhcmdldCA9IGFzeW5jICh0YXJnZXQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgc2V0U2VsZWN0ZWRUYXJnZXRzKChwcmV2aW91cykgPT4ge1xyXG4gICAgICBpZiAocHJldmlvdXMuaW5jbHVkZXModGFyZ2V0KSkgcmV0dXJuIHByZXZpb3VzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gdGFyZ2V0KVxyXG4gICAgICByZXR1cm4gWy4uLnByZXZpb3VzLCB0YXJnZXRdXHJcbiAgICB9KVxyXG4gICAgc2V0SW1wYWN0KG51bGwpXHJcbiAgICBzZXRSZXZpZXdzKHt9KVxyXG4gICAgaWYgKCFzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXModGFyZ2V0KSkge1xyXG4gICAgICBsb2FkRGV0YWlsKHRhcmdldCwgZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogXHU2NTc0XHU4RjZFXHU5MDA5XHU2MkU5XHVGRjFBXHU2NTc0XHU4RjZFXHU1REYyXHU5MDA5XHU2NUY2XHU1MThEXHU3MEI5ID0gXHU1M0Q2XHU2RDg4XHU2NTc0XHU4RjZFXHVGRjFCXHU2NUIwXHU1MkZFXHU5MDA5XHU3Njg0XHU2M0QwXHU0RUE0XHU1NDA0XHU4MUVBXHU2MkM5XHU1M0Q2IEFJIFx1ODlFM1x1OEJGQlx1MzAwMiAqL1xyXG4gIGNvbnN0IHNlbGVjdFJvdW5kID0gKHNoYXM6IHN0cmluZ1tdKTogdm9pZCA9PiB7XHJcbiAgICBzZXRJbXBhY3QobnVsbClcclxuICAgIHNldFJldmlld3Moe30pXHJcbiAgICBpZiAoc2hhcy5ldmVyeSgoc2hhKSA9PiBzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoc2hhKSkpIHtcclxuICAgICAgc2V0U2VsZWN0ZWRUYXJnZXRzKChwcmV2aW91cykgPT4gcHJldmlvdXMuZmlsdGVyKChzaGEpID0+ICFzaGFzLmluY2x1ZGVzKHNoYSkpKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IGFkZGVkID0gc2hhcy5maWx0ZXIoKHNoYSkgPT4gIXNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhzaGEpKVxyXG4gICAgc2V0U2VsZWN0ZWRUYXJnZXRzKChwcmV2aW91cykgPT4gQXJyYXkuZnJvbShuZXcgU2V0KFsuLi5wcmV2aW91cywgLi4uc2hhc10pKSlcclxuICAgIGZvciAoY29uc3Qgc2hhIG9mIGFkZGVkKSBsb2FkRGV0YWlsKHNoYSwgZmFsc2UpXHJcbiAgfVxyXG5cclxuICAvKiogXHU4OUUzXHU4QkZCXHU1RTc2XHU1M0QxXHU2QzYwXHVGRjFBXHU2QTIxXHU1NzhCXHU3RjUxXHU1MTczXHU1RTc2XHU1M0QxXHU2NzA5XHU5NjUwXHVGRjBDXHU1OTFBXHU5MDA5L1x1NjU3NFx1OEY2RVx1NjI3OVx1OTFDRlx1NTJGRVx1OTAwOVx1NjVGNlx1NjMwOVx1NEUwQVx1OTY1MFx1NUU3Nlx1NTNEMVx1NTIwNlx1Njc5MFx1RkYwOFx1OUVEOFx1OEJBNFx1NjcwMFx1NTkxQSAzIFx1NEUyQVx1NTQwQ1x1NjVGNlx1RkYwOVx1RkYwQ1x1OEQ4NVx1NTFGQVx1NzY4NFx1NjM5Mlx1OTYxRlx1N0I0OVx1NUY4NVx1NUU3Nlx1NjYzRVx1NzkzQVx1OTYxRlx1NTIxN1x1NjU3MFx1MzAwMiAqL1xyXG4gIGNvbnN0IE1BWF9ERVRBSUxfQ09OQ1VSUkVOQ1kgPSAzXHJcbiAgY29uc3QgZGV0YWlsUG9vbFJlZiA9IHVzZVJlZjx7IHBlbmRpbmc6IEFycmF5PHsgdGFyZ2V0OiBzdHJpbmc7IGZvcmNlOiBib29sZWFuIH0+OyBhY3RpdmU6IG51bWJlciB9Pih7IHBlbmRpbmc6IFtdLCBhY3RpdmU6IDAgfSlcclxuICBjb25zdCBkZXRhaWxJbkZsaWdodFJlZiA9IHVzZVJlZihuZXcgU2V0PHN0cmluZz4oKSlcclxuICAvKiogXHU0RTAwXHU5NTJFXHU2RDg4XHU1MzE2XHVGRjFBXHU1MTY4XHU5MEU4XHU4OUUzXHU4QkZCXHU4REQxXHU1QjhDXHU1NDBFXHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwXHU2NTc0XHU0RjUzXHU1M0Q5XHU0RThCXHVGRjA4XHU3RUNGIHJlZiBcdTUzRDZcdTY3MDBcdTY1QjBcdTk1RURcdTUzMDVcdUZGMENcdTkwN0ZcdTUxNEQgc2VsZWN0ZWRUYXJnZXRzIFx1OEZDN1x1NjcxRlx1RkYwOVx1MzAwMiAqL1xyXG4gIGNvbnN0IGF1dG9OYXJyYXRpdmVSZWYgPSB1c2VSZWYoZmFsc2UpXHJcbiAgY29uc3QgbG9hZE5hcnJhdGl2ZVJlZiA9IHVzZVJlZjwoKSA9PiB2b2lkPigoKSA9PiB7fSlcclxuXHJcbiAgY29uc3QgcHVtcERldGFpbFBvb2wgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBwb29sID0gZGV0YWlsUG9vbFJlZi5jdXJyZW50XHJcbiAgICBpZiAocG9vbC5hY3RpdmUgPT09IDAgJiYgcG9vbC5wZW5kaW5nLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBpZiAoYXV0b05hcnJhdGl2ZVJlZi5jdXJyZW50ICYmIGFjdGl2ZVJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgYXV0b05hcnJhdGl2ZVJlZi5jdXJyZW50ID0gZmFsc2VcclxuICAgICAgICBsb2FkTmFycmF0aXZlUmVmLmN1cnJlbnQoKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgd2hpbGUgKGFjdGl2ZVJlZi5jdXJyZW50ICYmIHBvb2wuYWN0aXZlIDwgTUFYX0RFVEFJTF9DT05DVVJSRU5DWSAmJiBwb29sLnBlbmRpbmcubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBqb2IgPSBwb29sLnBlbmRpbmcuc2hpZnQoKSFcclxuICAgICAgcG9vbC5hY3RpdmUgKz0gMVxyXG4gICAgICB2b2lkIGxvYWREZXRhaWxPbmNlKGpvYi50YXJnZXQsIGpvYi5mb3JjZSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge30pXHJcbiAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xyXG4gICAgICAgICAgcG9vbC5hY3RpdmUgLT0gMVxyXG4gICAgICAgICAgcHVtcERldGFpbFBvb2woKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBsb2FkRGV0YWlsID0gKHRhcmdldDogc3RyaW5nLCBmb3JjZTogYm9vbGVhbik6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGRldGFpbEluRmxpZ2h0UmVmLmN1cnJlbnQuaGFzKHRhcmdldCkpIHJldHVyblxyXG4gICAgZGV0YWlsSW5GbGlnaHRSZWYuY3VycmVudC5hZGQodGFyZ2V0KVxyXG4gICAgc2V0RGV0YWlsU3RhdHVzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFt0YXJnZXRdOiAncXVldWVkJyB9KSlcclxuICAgIGRldGFpbFBvb2xSZWYuY3VycmVudC5wZW5kaW5nLnB1c2goeyB0YXJnZXQsIGZvcmNlIH0pXHJcbiAgICBwdW1wRGV0YWlsUG9vbCgpXHJcbiAgfVxyXG5cclxuICAvKiogXHU4OUUzXHU4QkZCXHU1OTMxXHU4RDI1XHU1MjI0XHU1QjlBXHVGRjFBXHU1OTMxXHU4RDI1XHU1MzYwXHU0RjREXHU3Njg0IHdoYXQgXHU0RUU1XHU1NkZBXHU1QjlBXHU1MjREXHU3RjAwXHU1RjAwXHU1OTM0XHVGRjA4bG9hZERldGFpbE9uY2UgXHU1MTk5XHU1MTY1XHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgaXNGYWlsZWRBbmFseXNpcyA9IChkPzogQ29tbWl0RGV0YWlsUGF5bG9hZCk6IGJvb2xlYW4gPT4gZCAhPT0gdW5kZWZpbmVkICYmIGQuYW5hbHlzaXMud2hhdC5zdGFydHNXaXRoKCdBSSBcdTg5RTNcdThCRkJcdTU5MzFcdThEMjUnKVxyXG5cclxuICAvKiogXHU2Mjc5XHU5MUNGXHU5MUNEXHU4QkQ1XHU4OUUzXHU4QkZCXHU1OTMxXHU4RDI1XHVGRjA4XHU0RTFBXHU0RTNCIDIwMjYtMTEtMDRcdUZGMUFcdTkwMTBcdTY3NjFcdTYyNEJcdTcwQjlcdTY1NDhcdTczODdcdTRGNEVcdUZGMDlcdUZGMUFcdTU5MzFcdThEMjVcdTUzNjFcdTcyNDdcdTRFMzJcdTg4NENcdTVGM0FcdTUyMzZcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdUZGMENcclxuICAgKiAgXHU4RDcwXHU3M0IwXHU2NzA5XHU1RTc2XHU1M0QxXHU2QzYwXHVGRjFCXHU1QjhDXHU2MjEwXHU2NTcwXHU5MUNGXHU1NzI4XHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDXHU2ODBGXHU2QzQ3XHU2MDNCXHUzMDAyICovXHJcbiAgY29uc3QgcmV0cnlGYWlsZWREZXRhaWxzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgZmFpbGVkID0gc2VsZWN0ZWRUYXJnZXRzLmZpbHRlcigodGFyZ2V0KSA9PiBpc0ZhaWxlZEFuYWx5c2lzKGRldGFpbHNbdGFyZ2V0XSkpXHJcbiAgICBpZiAoZmFpbGVkLmxlbmd0aCA9PT0gMCkgeyBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyBcdTVGNTNcdTUyNERcdTZDQTFcdTY3MDlcdTg5RTNcdThCRkJcdTU5MzFcdThEMjVcdTc2ODRcdTYzRDBcdTRFQTQnKTsgcmV0dXJuIH1cclxuICAgIGxldCBkb25lID0gMFxyXG4gICAgZm9yIChjb25zdCB0YXJnZXQgb2YgZmFpbGVkKSB7XHJcbiAgICAgIGxvYWREZXRhaWwodGFyZ2V0LCB0cnVlKVxyXG4gICAgICBkb25lICs9IDFcclxuICAgIH1cclxuICAgIHNldEFjdGlvblJlc3VsdCgnXHVEODNEXHVERDAxIFx1NURGMlx1NUJGOSAnICsgU3RyaW5nKGRvbmUpICsgJyBcdTY3NjFcdTg5RTNcdThCRkJcdTU5MzFcdThEMjVcdTc2ODRcdTYzRDBcdTRFQTRcdTUzRDFcdThENzdcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdUZGMDhcdTVFNzZcdTUzRDFcdTZDNjBcdTgxRUFcdTUyQThcdThDMDNcdTVFQTZcdUZGMENcdTVCOENcdTYyMTBcdTU0MEVcdTUzNjFcdTcyNDdcdTgxRUFcdTUyQThcdTUyMzdcdTY1QjBcdUZGMDknKVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1OTYxRlx1NTIxN1x1NEVGQlx1NTJBMVx1NEY1M1x1RkYxQVx1NzcxRlx1NkI2M1x1NTNEMVx1OEQ3N1x1ODlFM1x1OEJGQlx1OEJGN1x1NkM0Mlx1RkYxQlx1NEVGQlx1NEY1NVx1NTkzMVx1OEQyNVx1RkYwOFx1N0Y1MVx1N0VEQ1x1NEUyRFx1NjVBRC9cdThEODVcdTY1RjYvXHU2NzBEXHU1MkExXHU2NzJBXHU4RkQwXHU4ODRDXHVGRjA5XHU5MEZEXHU1MTk5XHU1MTY1XHU1MzYxXHU3MjQ3XHU5NTE5XHU4QkVGXHU1MzYwXHU0RjREXHVGRjBDXHU3RUREXHU0RTBEXHU2NUUwXHU5NjUwXHU4RjZDXHU1NzA4XHUzMDAyICovXHJcbiAgY29uc3QgbG9hZERldGFpbE9uY2UgPSBhc3luYyAodGFyZ2V0OiBzdHJpbmcsIGZvcmNlOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBzZXREZXRhaWxTdGF0dXMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW3RhcmdldF06ICdydW5uaW5nJyB9KSlcclxuICAgIGNvbnN0IGZhaWxQbGFjZWhvbGRlciA9IChtZXNzYWdlOiBzdHJpbmcpOiBDb21taXREZXRhaWxQYXlsb2FkID0+XHJcbiAgICAgICh7XHJcbiAgICAgICAgc2hhOiB0YXJnZXQsXHJcbiAgICAgICAgaXNXb3JraW5nOiB0YXJnZXQgPT09ICd3b3JraW5nJyxcclxuICAgICAgICBmaWxlczogW10sXHJcbiAgICAgICAgaW5zZXJ0aW9uczogMCxcclxuICAgICAgICBkZWxldGlvbnM6IDAsXHJcbiAgICAgICAgcGF0Y2hUcnVuY2F0ZWQ6IGZhbHNlLFxyXG4gICAgICAgIHBhdGNoOiAnJyxcclxuICAgICAgICBjb21taXQ6IG51bGwsXHJcbiAgICAgICAgYW5hbHlzaXM6IHsgd2hhdDogbWVzc2FnZSwgbG9naWM6IFtdLCByaXNrczogW10gfSxcclxuICAgICAgfSkgYXMgdW5rbm93biBhcyBDb21taXREZXRhaWxQYXlsb2FkXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9jb21taXQtZGV0YWlsJywgeyBzaGE6IHRhcmdldCwgZm9yY2UgfSlcclxuICAgICAgaWYgKCFvaykge1xyXG4gICAgICAgIHNldERldGFpbHMoKHByZXZpb3VzKSA9PiAoe1xyXG4gICAgICAgICAgLi4ucHJldmlvdXMsXHJcbiAgICAgICAgICBbdGFyZ2V0XTogZmFpbFBsYWNlaG9sZGVyKCdBSSBcdTg5RTNcdThCRkJcdTU5MzFcdThEMjVcdUZGMUEnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJycpICsgJ1x1RkYwOFx1NzBCOVx1MzAwQ1x1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1MzAwRFx1NTNFRlx1OTFDRFx1OEJENVx1RkYwOScpLFxyXG4gICAgICAgIH0pKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIHNldERldGFpbHMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW3RhcmdldF06IGRhdGEgYXMgdW5rbm93biBhcyBDb21taXREZXRhaWxQYXlsb2FkIH0pKVxyXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcclxuICAgICAgY29uc3QgcmVhc29uID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpXHJcbiAgICAgIHNldERldGFpbHMoKHByZXZpb3VzKSA9PiAoe1xyXG4gICAgICAgIC4uLnByZXZpb3VzLFxyXG4gICAgICAgIFt0YXJnZXRdOiBmYWlsUGxhY2Vob2xkZXIoYEFJIFx1ODlFM1x1OEJGQlx1NTkzMVx1OEQyNVx1RkYxQSR7cmVhc29uID09PSAnVGhlIHVzZXIgYWJvcnRlZCBhIHJlcXVlc3QuJyA/ICdcdThCRjdcdTZDNDJcdThEODVcdTY1RjZcdTYyMTZcdTY3MERcdTUyQTFcdTRFMkRcdTY1QUQnIDogcmVhc29ufVx1RkYwOFx1NjhDMFx1NjdFNSBkc2ggXHU2NjJGXHU1NDI2XHU1NzI4XHU4RkQwXHU4ODRDXHVGRjFCXHU3MEI5XHUzMDBDXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwXHUzMDBEXHU1M0VGXHU5MUNEXHU4QkQ1XHVGRjA5YCksXHJcbiAgICAgIH0pKVxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgZGV0YWlsSW5GbGlnaHRSZWYuY3VycmVudC5kZWxldGUodGFyZ2V0KVxyXG4gICAgICBzZXREZXRhaWxTdGF0dXMoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfVxyXG4gICAgICAgIGRlbGV0ZSBuZXh0W3RhcmdldF1cclxuICAgICAgICByZXR1cm4gbmV4dFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgbG9hZEltcGFjdCA9IGFzeW5jIChmb3JjZSA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBpZiAoc2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXHJcbiAgICBzZXRJbXBhY3RMb2FkaW5nKHRydWUpXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pbXBhY3Qtc2NvcGUnLCB7IHNoYXM6IHNlbGVjdGVkVGFyZ2V0cywgZm9yY2UgfSlcclxuICAgICAgc2V0SW1wYWN0KG9rID8gKGRhdGEgYXMgdW5rbm93biBhcyBJbXBhY3RTY29wZVBheWxvYWQpIDogbnVsbClcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldEltcGFjdExvYWRpbmcoZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBsb2FkUmV2aWV3cyA9IGFzeW5jIChmb3JjZSA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBpZiAoc2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXHJcbiAgICBzZXRSZXZpZXdMb2FkaW5nKHRydWUpXHJcbiAgICB0cnkge1xyXG4gICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBzZWxlY3RlZFRhcmdldHMpIHtcclxuICAgICAgICBpZiAoIWFjdGl2ZVJlZi5jdXJyZW50KSBicmVha1xyXG4gICAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3JldmlldycsIHsgc2hhOiB0YXJnZXQsIGZvcmNlIH0pXHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGRhdGEgYXMgdW5rbm93biBhcyBSZXZpZXdQYXlsb2FkXHJcbiAgICAgICAgc2V0UmV2aWV3cygocHJldmlvdXMpID0+ICh7XHJcbiAgICAgICAgICAuLi5wcmV2aW91cyxcclxuICAgICAgICAgIFt0YXJnZXRdOiBvayA/IHBheWxvYWQgOiB7XHJcbiAgICAgICAgICAgIGlzc3Vlc0ZvdW5kOiAwLFxyXG4gICAgICAgICAgICBpc3N1ZXM6ICcnLFxyXG4gICAgICAgICAgICB2ZXJkaWN0OiAnXHU4QkM0XHU1QkExXHU1OTMxXHU4RDI1XHVGRjFBJyArIFN0cmluZyhwYXlsb2FkWydlcnJvciddID8/ICcnKSArICdcdUZGMDhcdTUzRUZcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdTkxQ0RcdThCRDVcdUZGMDknLFxyXG4gICAgICAgICAgICBpc3N1ZUxpc3Q6IFtdLFxyXG4gICAgICAgICAgICBjYWNoZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KSlcclxuICAgICAgfVxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0UmV2aWV3TG9hZGluZyhmYWxzZSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGxvYWRGaWxlRGlmZiA9IGFzeW5jIChzaGE6IHN0cmluZywgcGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBgJHtzaGF9fCR7cGF0aH1gXHJcbiAgICBpZiAoZmlsZURpZmZzW2tleV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBzZXRGaWxlRGlmZnMoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfVxyXG4gICAgICAgIGRlbGV0ZSBuZXh0W2tleV1cclxuICAgICAgICByZXR1cm4gbmV4dFxyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvZmlsZS1kaWZmJywgeyBzaGEsIHBhdGggfSlcclxuICAgIHNldEZpbGVEaWZmcygocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBba2V5XTogU3RyaW5nKGRhdGFbJ3BhdGNoJ10gPz8gJycpIH0pKVxyXG4gIH1cclxuXHJcbiAgY29uc3QgbG9hZElzc3VlcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcz9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxyXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgIC8vIFx1OEY2RVx1OEJFMlx1NTIzN1x1NjVCMFx1NEUwRFx1NkUwNVx1N0E3QVx1NTJGRVx1OTAwOVx1RkYxQVx1NTJGRVx1OTAwOVx1OTUyRVx1OTY4Rlx1OTVFRVx1OTg5OCBpZCBcdThENzBcdUZGMENcdTVERjJcdTZEODhcdTU5MzFcdTc2ODQgaWQgXHU0RTBEXHU1RjcxXHU1NENEXHU2NjNFXHU3OTNBXHUzMDAyXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0SXNzdWVzRGF0YSgoZGF0YSBhcyB7IGlzc3VlczogSXNzdWVFbnRyeVtdIH0pLmlzc3VlcyA/PyBbXSlcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBcdTk1RUVcdTk4OThcdTUyMTdcdTg4NjhcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcdUZGMUFcdTUyMTdcdTg4NjhcdTRGRERcdTYzMDFcdTUzOUZcdTY4MzdcdTMwMDJcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFJldmlldyBcdTk4NzVcdTdCN0VcdTVCOUVcdTY1RjZcdTU0MENcdTZCNjVcdUZGMUFcdTRGRUVcdTU5MERcdTVCNTBcdTRFRTNcdTc0MDZcdTU2REVcdTUxOTlcdTcyQjZcdTYwMDFcdTU0MEVcdUZGMENcdTc3MEJcdTY3N0YgNCBcdTc5RDJcdTUxODVcdThEREZcdTRFMEFcdTMwMDJcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHRhYiAhPT0gJ3JldmlldycpIHJldHVyblxyXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IHZvaWQgbG9hZElzc3VlcygpOyB2b2lkIGxvYWRGaXhTdGF0dXMoKSB9LCA0MDAwKVxyXG4gICAgcmV0dXJuICgpID0+IHsgY2xlYXJJbnRlcnZhbCh0aW1lcikgfVxyXG4gIH0sIFt0YWIsIHByb3BzLnNlc3Npb25JZF0pXHJcblxyXG4gIC8qKiBcdTYyQzlcdTUzRDZcdTRGRUVcdTU5MERcdTZEM0VcdTUzRDFcdTRFRkJcdTUyQTFcdTcyQjZcdTYwMDFcdUZGMDhSZXZpZXcgXHU5ODc1XHU4RjZFXHU4QkUyXHVGRjFCXHU2NzA5XHU2RDNCXHU1MkE4XHU0RUZCXHU1MkExXHU2NUY2XHU5QTcxXHU1MkE4XHU1MjM3XHU2NUIwXHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgbG9hZEZpeFN0YXR1cyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2ZpeC9zdGF0dXM/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcclxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgIHNldEZpeFRhc2tzKChkYXRhIGFzIHsgdGFza3M6IEZpeFRhc2tFbnRyeVtdIH0pLnRhc2tzID8/IFtdKVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gXHU3MkI2XHU2MDAxXHU2MkM5XHU1M0Q2XHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXHUzMDAyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogXHU2RDNFXHU1M0QxXHU0RkVFXHU1OTBEXHVGRjFBcGxhbklkcz1cdTYyNzlcdTUxQzZcdTc2ODRcdTVGODVcdThCQzRcdTVCQTFcdTY1QjlcdTY4NDhcdUZGMUJpc3N1ZUlkcz1cdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdUZGMDhtb2RlPWZpeCBcdTRGRUVcdTU5MEQgLyBwbGFuIFx1NTNFQVx1OEJGQlx1NTFGQVx1NjVCOVx1Njg0OFx1RkYwOVx1MzAwMiAqL1xyXG4gIGNvbnN0IGRpc3BhdGNoRml4ID0gYXN5bmMgKHBsYW5JZHM6IHN0cmluZ1tdLCBpc3N1ZUlkczogc3RyaW5nW10sIG1vZGU6ICdmaXgnIHwgJ3BsYW4nID0gJ2ZpeCcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGlmIChwbGFuSWRzLmxlbmd0aCA9PT0gMCAmJiBpc3N1ZUlkcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIHQoJ2ZpeC5kaXNwYXRjaEVtcHR5JykpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvZml4L2Rpc3BhdGNoJywgeyBwbGFuSWRzLCBpc3N1ZUlkcywgbW9kZSB9KVxyXG4gICAgaWYgKG9rKSB7XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzICcgKyB0KCdmaXguZGlzcGF0Y2hEb25lJykucmVwbGFjZSgne259JywgU3RyaW5nKGRhdGFbJ2FjY2VwdGVkJ10gPz8gMCkpLnJlcGxhY2UoJ3tjfScsIFN0cmluZyhkYXRhWydjb25jdXJyZW5jeSddID8/IDMpKSlcclxuICAgICAgYXdhaXQgbG9hZEZpeFN0YXR1cygpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogXHU1MDVDXHU2QjYyXHU0RkVFXHU1OTBEXHU2RDNFXHU1M0QxXHVGRjFBXHU1M0Q2XHU2RDg4XHU2MzkyXHU5NjFGXHU0RTBFXHU4RkQwXHU4ODRDXHU0RTJEXHU3Njg0XHU0RUZCXHU1MkExXHUzMDAyICovXHJcbiAgY29uc3QgY2FuY2VsRml4ID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvZml4L2NhbmNlbCcsIHt9KVxyXG4gICAgaWYgKG9rKSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjNGOSAnICsgdCgnZml4LnN0b3BEb25lJykucmVwbGFjZSgne259JywgU3RyaW5nKGRhdGFbJ3N0b3BwZWQnXSA/PyAwKSkpXHJcbiAgICBhd2FpdCBsb2FkRml4U3RhdHVzKClcclxuICB9XHJcblxyXG4gIC8qKiBcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTVCRkNcdTUxRkFcdTRFM0EgTWFya2Rvd25cdUZGMDhcdTYzMDlcdTRFMjVcdTkxQ0RcdTVFQTZcdTYzOTJcdTVFOEZcdUZGMUJcdTU5MERcdTc1MjhcdTdCMTRcdThCQjBcdTVCRkNcdTUxRkFcdTc2ODRcdTRFMEJcdThGN0RcdTY1QjlcdTVGMEZcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBleHBvcnRJc3N1ZXNNZCA9IChpc3N1ZXM6IElzc3VlRW50cnlbXSk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGlzc3Vlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIHQoJ3Jldmlldy5leHBvcnRFbXB0eScpKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IHNldmVyaXR5T3JkZXI6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7IGJsb2NrZXI6IDAsIGNyaXRpY2FsOiAxLCBtYWpvcjogMiwgbWlub3I6IDMsIGluZm86IDQgfVxyXG4gICAgY29uc3Qgb3JkZXJlZCA9IFsuLi5pc3N1ZXNdLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PlxyXG4gICAgICAoc2V2ZXJpdHlPcmRlcltub3JtYWxpemVJc3N1ZVNldmVyaXR5KGxlZnQuc2V2ZXJpdHkpXSA/PyA5KSAtIChzZXZlcml0eU9yZGVyW25vcm1hbGl6ZUlzc3VlU2V2ZXJpdHkocmlnaHQuc2V2ZXJpdHkpXSA/PyA5KVxyXG4gICAgICB8fCBsZWZ0LmNyZWF0ZWRBdCAtIHJpZ2h0LmNyZWF0ZWRBdClcclxuICAgIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgJyMgUmV2aWV3IFx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NScsXHJcbiAgICAgICcnLFxyXG4gICAgICBgLSBcdTk4NzlcdTc2RUVcdUZGMUEke3N0YXRlPy5wcm9qZWN0Py5uYW1lID8/ICdcdTIwMTQnfWAsXHJcbiAgICAgIGAtIFx1NEVEM1x1NUU5M1x1RkYxQSR7Y29tbWl0c0RhdGE/LnJvb3RQYXRoID8/IHN0YXRlPy5wcm9qZWN0Py5yb290UGF0aCA/PyAnXHUyMDE0J31gLFxyXG4gICAgICBgLSBcdTUyMDZcdTY1MkZcdUZGMUEke2NvbW1pdHNEYXRhPy5icmFuY2ggPz8gJ1x1MjAxNCd9YCxcclxuICAgICAgYC0gXHU1QkZDXHU1MUZBXHU2NUY2XHU5NUY0XHVGRjFBJHtuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCl9YCxcclxuICAgICAgYC0gXHU2NTcwXHU5MUNGXHVGRjFBJHtpc3N1ZXMubGVuZ3RofVx1RkYwOFx1NUY4NVx1NTkwNFx1NzQwNiAke2lzc3Vlcy5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKS5sZW5ndGh9XHVGRjA5YCxcclxuICAgICAgJycsXHJcbiAgICBdXHJcbiAgICBvcmRlcmVkLmZvckVhY2goKGlzc3VlLCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBpc3N1ZS5jaGFuZ2VJZC5zdGFydHNXaXRoKCdyZXZpZXc6JykgJiYgaXNzdWUuY2hhbmdlSWQgIT09ICdyZXZpZXc6d29ya3RyZWUnXHJcbiAgICAgICAgPyBgXHU2M0QwXHU0RUE0ICR7aXNzdWUuY2hhbmdlSWQuc2xpY2UoJ3JldmlldzonLmxlbmd0aCwgJ3JldmlldzonLmxlbmd0aCArIDgpfWBcclxuICAgICAgICA6IGlzc3VlLmNoYW5nZUlkID09PSAncmV2aWV3Ondvcmt0cmVlJyA/ICdcdTVERTVcdTRGNUNcdTUzM0EnIDogaXNzdWUuY2hhbmdlSWRcclxuICAgICAgbGluZXMucHVzaChgIyMgJHtpbmRleCArIDF9LiBbJHtpc3N1ZS5zZXZlcml0eX1dWyR7aXNzdWUuY2F0ZWdvcnkgfHwgJ2dlbmVyYWwnfV0gJHtpc3N1ZS50aXRsZX1gKVxyXG4gICAgICBsaW5lcy5wdXNoKCcnKVxyXG4gICAgICBsaW5lcy5wdXNoKGAtIFx1NzJCNlx1NjAwMVx1RkYxQSR7SVNTVUVfU1RBVFVTX0xBQkVMU1tpc3N1ZS5zdGF0dXNdID8/IGlzc3VlLnN0YXR1c31gKVxyXG4gICAgICBsaW5lcy5wdXNoKGAtIFx1NUJGOVx1OEM2MVx1RkYxQSR7dGFyZ2V0fWApXHJcbiAgICAgIGxpbmVzLnB1c2goYC0gXHU1M0QxXHU3M0IwXHU2NUY2XHU5NUY0XHVGRjFBJHtuZXcgRGF0ZShpc3N1ZS5jcmVhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCl9YClcclxuICAgICAgaWYgKChpc3N1ZS5kZXNjcmlwdGlvbiA/PyAnJykgIT09ICcnKSBsaW5lcy5wdXNoKGAtIFx1NjNDRlx1OEZGMFx1RkYxQSR7aXNzdWUuZGVzY3JpcHRpb24hLnJlcGxhY2UoL1xcbi9nLCAnICcpfWApXHJcbiAgICAgIGlmICgoaXNzdWUucmVzb2x1dGlvbiA/PyAnJykgIT09ICcnKSBsaW5lcy5wdXNoKGAtIFx1N0VEM1x1OEJCQVx1RkYxQSR7aXNzdWUucmVzb2x1dGlvbn1gKVxyXG4gICAgICBsaW5lcy5wdXNoKCcnKVxyXG4gICAgfSlcclxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbbGluZXMuam9pbignXFxuJyldLCB7IHR5cGU6ICd0ZXh0L21hcmtkb3duO2NoYXJzZXQ9dXRmLTgnIH0pXHJcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXHJcbiAgICBjb25zdCBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcclxuICAgIGFuY2hvci5ocmVmID0gdXJsXHJcbiAgICBhbmNob3IuZG93bmxvYWQgPSBgcmV2aWV3LWlzc3Vlcy0ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCl9Lm1kYFxyXG4gICAgYW5jaG9yLmNsaWNrKClcclxuICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKVxyXG4gICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgJyArIHQoJ25vdGVzLmV4cG9ydERvbmUnKSlcclxuICB9XHJcblxyXG4gIC8qKiBcdTRFMDBcdTk1MkVcdTZFMDVcdTdBN0FcdTY3MkFcdTg5RTNcdTUxQjNcdTk1RUVcdTk4OThcdUZGMUFcdTY3MERcdTUyQTFcdTdBRUZcdTUzOUZcdTVCNTBcdTdGNkUgYWNjZXB0ZWRcdUZGMDhcdTRFMERcdTRGRUVcdTRFRTNcdTc4MDFcdUZGMDlcdTMwMDJcdTY1NzBcdTkxQ0ZcdTU3MjggSlNYIFx1NTE4NVx1ODA1NFx1OEJBMVx1N0I5N1xyXG4gICAqICBcdUZGMDh2aXNpYmxlIFx1NjYyRlx1OTg3NVx1N0I3RVx1NUM0MFx1OTBFOFx1NTNEOFx1OTFDRlx1RkYwQ1x1NjcyQ1x1NTFGRFx1NjU3MFx1NEUwRFx1NTNFRlx1NUYxNVx1NzUyOFx1MjAxNFx1MjAxNFx1NjZGRVx1NTZFMFx1NkI2NCBSZWZlcmVuY2VFcnJvclx1RkYwQzIwMjYtMTEtMDRcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBwdXJnZU9wZW5Jc3N1ZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXMvcHVyZ2Utb3BlbicsIHsgc2Vzc2lvbklkOiBwcm9wcy5zZXNzaW9uSWQgPz8gJycgfSlcclxuICAgIGF3YWl0IGxvYWRJc3N1ZXMoKVxyXG4gICAgc2V0QWN0aW9uUmVzdWx0KG9rXHJcbiAgICAgID8gJ1x1MjcxMyAnICsgdCgncmV2aWV3LnB1cmdlT3BlbkRvbmUnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoZGF0YVsncHVyZ2VkJ10gPz8gMCkpXHJcbiAgICAgIDogJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXHJcbiAgfVxyXG5cclxuICAvKiogXHU2Mjc5XHU5MUNGXHU2ODA3XHU4QkIwXHU1REYyXHU1OTA0XHU3NDA2XHVGRjA4YWNjZXB0ZWRcdUZGMDlcdUZGMUFcdTRFQkFcdTVERTVcdTc4NkVcdThCQTRcdTY1RTBcdTk3MDBcdTkwMTBcdTY3NjFcdTU5MERcdTY4QzBcdTY1RjZcdTc2RjRcdTYzQTVcdTdFRDNcdTY4NDhcdTMwMDIgKi9cclxuICBjb25zdCBtYXJrSXNzdWVzSGFuZGxlZCA9IGFzeW5jIChpZHM6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBsZXQgZG9uZSA9IDBcclxuICAgIGZvciAoY29uc3QgaWQgb2YgaWRzKSB7XHJcbiAgICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcy9zdGF0dXMnLCB7IGlkLCBzdGF0dXM6ICdhY2NlcHRlZCcgfSlcclxuICAgICAgaWYgKG9rKSBkb25lICs9IDFcclxuICAgIH1cclxuICAgIGF3YWl0IGxvYWRJc3N1ZXMoKVxyXG4gICAgaWYgKGRvbmUgPiAwKSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgncmV2aWV3LmhhbmRsZWREb25lJykucmVwbGFjZSgne259JywgU3RyaW5nKGRvbmUpKSlcclxuICB9XHJcblxyXG4gIC8qKiBcdTYyNzlcdTkxQ0ZcdTU5MERcdTY4QzBcdUZGMUFcdTVCRjlcdTkwMDlcdTRFMkRcdTc2ODRcdThCQzRcdTVCQTFcdTc2RUVcdTY4MDdcdTkwMTBcdTRFMkFcdThERDFcdTU5MERcdTY4QzBcdUZGMDhcdTRFMzJcdTg4NEMgTExNXHVGRjA5XHVGRjBDXHU1QjlFXHU2NUY2XHU4RkRCXHU1RUE2XHUzMDAxXHU1M0VGXHU0RTJEXHU5MDE0XHU1MDVDXHU2QjYyXHUzMDAyICovXHJcbiAgY29uc3QgcnVuQmF0Y2hWZXJpZnkgPSBhc3luYyAodGFyZ2V0czogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGlmICh0YXJnZXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXHJcbiAgICBiYXRjaFN0b3BSZWYuY3VycmVudCA9IGZhbHNlXHJcbiAgICBzZXRCYXRjaFZlcmlmeVN0YXRlKHsgZG9uZTogMCwgdG90YWw6IHRhcmdldHMubGVuZ3RoIH0pXHJcbiAgICBsZXQgcmVzb2x2ZWRUb3RhbCA9IDBcclxuICAgIGxldCBvcGVuVG90YWwgPSAwXHJcbiAgICBsZXQgbmV3VG90YWwgPSAwXHJcbiAgICBsZXQgZmFpbGVkID0gMFxyXG4gICAgZm9yIChjb25zdCBbaW5kZXgsIHRhcmdldF0gb2YgdGFyZ2V0cy5lbnRyaWVzKCkpIHtcclxuICAgICAgaWYgKGJhdGNoU3RvcFJlZi5jdXJyZW50KSBicmVha1xyXG4gICAgICBzZXRCYXRjaFZlcmlmeVN0YXRlKHsgZG9uZTogaW5kZXgsIHRvdGFsOiB0YXJnZXRzLmxlbmd0aCB9KVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcy92ZXJpZnknLCB7IHRhcmdldCB9KVxyXG4gICAgICAgIGlmICghb2spIGZhaWxlZCArPSAxXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICByZXNvbHZlZFRvdGFsICs9ICgoZGF0YVsncmVzb2x2ZWQnXSBhcyB1bmtub3duW10pID8/IFtdKS5sZW5ndGhcclxuICAgICAgICAgIG9wZW5Ub3RhbCArPSAoKGRhdGFbJ3N0aWxsT3BlbiddIGFzIHVua25vd25bXSkgPz8gW10pLmxlbmd0aFxyXG4gICAgICAgICAgbmV3VG90YWwgKz0gKChkYXRhWyduZXdJc3N1ZXMnXSBhcyB1bmtub3duW10pID8/IFtdKS5sZW5ndGhcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIGZhaWxlZCArPSAxXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHNldEJhdGNoVmVyaWZ5U3RhdGUobnVsbClcclxuICAgIGF3YWl0IGxvYWRJc3N1ZXMoKVxyXG4gICAgaWYgKGJhdGNoU3RvcFJlZi5jdXJyZW50KSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjNGOSAnICsgdCgncmV2aWV3LmJhdGNoU3RvcHBlZCcpKVxyXG4gICAgZWxzZSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgncmV2aWV3LmJhdGNoRG9uZScpLnJlcGxhY2UoJ3thfScsIFN0cmluZyhyZXNvbHZlZFRvdGFsKSkucmVwbGFjZSgne2J9JywgU3RyaW5nKG9wZW5Ub3RhbCkpLnJlcGxhY2UoJ3tjfScsIFN0cmluZyhuZXdUb3RhbCkpLnJlcGxhY2UoJ3tkfScsIFN0cmluZyhmYWlsZWQpKSlcclxuICB9XHJcblxyXG4gIC8qKiBcdTY1NzRcdTRGNTNcdTUyMDZcdThCQ0FcdUZGMUFcdTVGQUFcdTczQUZcdThDMDNcdTc1MjggL2lzc3Vlcy90cmlhZ2UgXHU3NkY0XHU4MUYzIGRvbmVcdUZGMDhcdTZCQ0ZcdTYyNzkgPSBcdTY3MERcdTUyQTFcdTdBRUZcIm9wZW4gXHU0RTE0XHU2NzJDXHU4RjZFXHU2NzJBXHU5MDAxXHU1QkExXCJcdTc2ODRcdTUyNEQgTiBcdTY3NjFcdUZGMDlcdUZGMENcclxuICAgKiBcdTUyMjRcdTVCOUFcdTUzNzNcdTY1RjZcdTUxNzNcdTk1RURcdTMwMDFcdTUzRUZcdTUwNUNcdTZCNjJcdTUzRUZcdTdFRURcdThERDFcdUZGMDhcdTY3MERcdTUyQTFcdTdBRUYgc2VlbiBcdThCQjBcdTVGQzZcdTk2MzJcdTkxQ0RcdTU5MERcdTZEODhcdTgwMTdcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBydW5UcmlhZ2UgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBiYXRjaFN0b3BSZWYuY3VycmVudCA9IGZhbHNlXHJcbiAgICAvLyByZW1haW5pbmc9LTEgPSBcdTVDMUFcdTY3MkFcdTYyRkZcdTUyMzBcdTk5OTZcdTYyNzlcdTU0Q0RcdTVFOTRcdUZGMDhcdTY2M0VcdTc5M0EgXHUyMDI2IFx1ODAwQ1x1NEUwRFx1NjYyRlx1OEJFRlx1NUJGQ1x1NjAyN1x1NzY4NCAwXHVGRjA5XHUzMDAyXHJcbiAgICBzZXRUcmlhZ2VTdGF0ZSh7IHByb2Nlc3NlZDogMCwgcmVtYWluaW5nOiAtMSB9KVxyXG4gICAgY29uc3QgY2xvc2VkID0geyBkdXBsaWNhdGU6IDAsIG9ic29sZXRlOiAwLCBmYWxzZV9wb3NpdGl2ZTogMCB9XHJcbiAgICBsZXQga2VwdCA9IDBcclxuICAgIGxldCBwcm9jZXNzZWQgPSAwXHJcbiAgICBsZXQgcGFyc2VGYWlsZWQgPSBmYWxzZVxyXG4gICAgbGV0IHN0b3BwZWQgPSBmYWxzZVxyXG4gICAgbGV0IGZpcnN0ID0gdHJ1ZVxyXG4gICAgZm9yICg7Oykge1xyXG4gICAgICBpZiAoYmF0Y2hTdG9wUmVmLmN1cnJlbnQpIHsgc3RvcHBlZCA9IHRydWU7IGJyZWFrIH1cclxuICAgICAgbGV0IG91dGNvbWU6IHsgb2s6IGJvb2xlYW47IGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IH1cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBvdXRjb21lID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaXNzdWVzL3RyaWFnZScsIHsgc2Vzc2lvbklkOiBwcm9wcy5zZXNzaW9uSWQgPz8gJycsIC4uLihmaXJzdCA/IHsgcmVzZXQ6IHRydWUgfSA6IHt9KSB9KVxyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICBvdXRjb21lID0geyBvazogZmFsc2UsIGRhdGE6IHsgZXJyb3I6ICduZXR3b3JrIGVycm9yJyB9IH1cclxuICAgICAgfVxyXG4gICAgICBmaXJzdCA9IGZhbHNlXHJcbiAgICAgIGlmICghb3V0Y29tZS5vaykgeyBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKG91dGNvbWUuZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSk7IGJyZWFrIH1cclxuICAgICAgY29uc3QgZGF0YSA9IG91dGNvbWUuZGF0YVxyXG4gICAgICAvLyBcdTUxNDhcdTdEMkZcdTUyQTBcdTUxOERcdTUyMjQgZG9uZVx1RkYxQVx1NjcwMFx1NTQwRVx1NEUwMFx1NjI3OVx1RkYwOGRvbmU6dHJ1ZSBcdTRFMTQgcHJvY2Vzc2VkPjBcdUZGMDlcdTc2ODRcdThCQTFcdTY1NzBcdTRFMERcdTgwRkRcdTRFMjJcdTMwMDJcclxuICAgICAgY29uc3QgYmF0Y2hDbG9zZWQgPSAoZGF0YVsnY2xvc2VkJ10gPz8ge30pIGFzIFJlY29yZDxzdHJpbmcsIG51bWJlcj5cclxuICAgICAgY2xvc2VkLmR1cGxpY2F0ZSArPSBOdW1iZXIoYmF0Y2hDbG9zZWRbJ2R1cGxpY2F0ZSddID8/IDApXHJcbiAgICAgIGNsb3NlZC5vYnNvbGV0ZSArPSBOdW1iZXIoYmF0Y2hDbG9zZWRbJ29ic29sZXRlJ10gPz8gMClcclxuICAgICAgY2xvc2VkLmZhbHNlX3Bvc2l0aXZlICs9IE51bWJlcihiYXRjaENsb3NlZFsnZmFsc2VfcG9zaXRpdmUnXSA/PyAwKVxyXG4gICAgICBrZXB0ICs9IE51bWJlcihkYXRhWydrZXB0J10gPz8gMClcclxuICAgICAgcHJvY2Vzc2VkICs9IE51bWJlcihkYXRhWydwcm9jZXNzZWQnXSA/PyAwKVxyXG4gICAgICBpZiAoZGF0YVsncGFyc2VGYWlsZWQnXSA9PT0gdHJ1ZSkgcGFyc2VGYWlsZWQgPSB0cnVlXHJcbiAgICAgIGlmIChkYXRhWydkb25lJ10gPT09IHRydWUpIGJyZWFrXHJcbiAgICAgIHNldFRyaWFnZVN0YXRlKHsgcHJvY2Vzc2VkLCByZW1haW5pbmc6IE51bWJlcihkYXRhWydyZW1haW5pbmcnXSA/PyAwKSB9KVxyXG4gICAgfVxyXG4gICAgc2V0VHJpYWdlU3RhdGUobnVsbClcclxuICAgIGF3YWl0IGxvYWRJc3N1ZXMoKVxyXG4gICAgaWYgKHN0b3BwZWQpIHNldEFjdGlvblJlc3VsdCgnXHUyM0Y5ICcgKyB0KCdyZXZpZXcudHJpYWdlU3RvcHBlZCcpKVxyXG4gICAgZWxzZSBpZiAocHJvY2Vzc2VkID09PSAwKSB7XHJcbiAgICAgIC8vIFx1OTk5Nlx1OEY2RVx1NTM3MyBkb25lIFx1NEUxNFx1OTZGNlx1NTkwNFx1NzQwNlx1RkYxQVx1NUY1M1x1NTI0RFx1NEYxQVx1OEJERFx1NUI5QVx1NEY0RFx1NTIzMFx1NzY4NFx1OTg3OVx1NzZFRVx1NkNBMVx1NjcwOVx1NUY4NVx1NTIwNlx1OEJDQVx1OTVFRVx1OTg5OFx1MjAxNFx1MjAxNFx1ODJFNVx1NEUwRVx1NTIxN1x1ODg2OFx1NEUwRFx1N0IyNlx1RkYwQ1x1NTkxQVx1NTM0QVx1NjYyRlx1NEYxQVx1OEJERFx1NEUwRFx1NUM1RVx1NEU4RVx1OEJFNVx1OTg3OVx1NzZFRVx1MzAwMlxyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgdCgncmV2aWV3LnRyaWFnZU5vdGhpbmcnKSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzICcgKyB0KCdyZXZpZXcudHJpYWdlRG9uZScpXHJcbiAgICAgICAgLnJlcGxhY2UoJ3thfScsIFN0cmluZyhjbG9zZWQuZHVwbGljYXRlKSkucmVwbGFjZSgne2J9JywgU3RyaW5nKGNsb3NlZC5vYnNvbGV0ZSkpLnJlcGxhY2UoJ3tjfScsIFN0cmluZyhjbG9zZWQuZmFsc2VfcG9zaXRpdmUpKS5yZXBsYWNlKCd7ZH0nLCBTdHJpbmcoa2VwdCkpXHJcbiAgICAgICAgKyAocGFyc2VGYWlsZWQgPyB0KCdyZXZpZXcudHJpYWdlUGFyc2VGYWlsJykgOiAnJykpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBcdTk1RUVcdTk4OThcdTU5MERcdTY4QzBcdUZGMUFcdTVCRjlcdThCRTVcdTk1RUVcdTk4OThcdTYyNDBcdTVDNUVcdThCQzRcdTVCQTFcdTc2RUVcdTY4MDdcdTkxQ0RcdThERDFcdTY4QzBcdTZENEJcdUZGMDhcdTRGRUVcdTU5MERcdTc4NkVcdThCQTQgKyBcdTY3MDBcdTRGMThcdTYwMjcvXHU2NzAwXHU1QzBGXHU0RkI1XHU1MTY1ICsgXHU2NUIwXHU5NUVFXHU5ODk4XHU2MjZCXHU2M0NGXHVGRjA5XHVGRjBDXHJcbiAgICogXHU1M0VBXHU2NzA5XHU1OTBEXHU2OEMwXHU5MDFBXHU4RkM3XHU2MjREXHU4MUVBXHU1MkE4XHU3RjZFXHU0RTNBXHU1REYyXHU4OUUzXHU1MUIzXHVGRjFCXHU3RUQzXHU2NzlDXHU0RUU1XHU1OTBEXHU2OEMwXHU2MkE1XHU1NDRBXHU1RjYyXHU1RjBGXHU1QzU1XHU3OTNBXHUzMDAyXHJcbiAgICovXHJcbiAgY29uc3QgdmVyaWZ5SXNzdWVzID0gYXN5bmMgKHRhcmdldDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBzZXRWZXJpZnlpbmdUYXJnZXQodGFyZ2V0KVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaXNzdWVzL3ZlcmlmeScsIHsgdGFyZ2V0IH0pXHJcbiAgICAgIGlmICghb2spIHtcclxuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcmVzb2x2ZWQgPSAoZGF0YVsncmVzb2x2ZWQnXSBhcyBzdHJpbmdbXSB8IHVuZGVmaW5lZCkgPz8gW11cclxuICAgICAgY29uc3Qgc3RpbGxPcGVuID0gKGRhdGFbJ3N0aWxsT3BlbiddIGFzIEFycmF5PHsgdGl0bGU6IHN0cmluZzsgcmVhc29uOiBzdHJpbmcgfT4gfCB1bmRlZmluZWQpID8/IFtdXHJcbiAgICAgIGNvbnN0IG5ld0lzc3VlcyA9IChkYXRhWyduZXdJc3N1ZXMnXSBhcyBBcnJheTx7IHNldmVyaXR5OiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT4gfCB1bmRlZmluZWQpID8/IFtdXHJcbiAgICAgIGNvbnN0IHZlcmRpY3QgPSBTdHJpbmcoZGF0YVsndmVyZGljdCddID8/ICcnKVxyXG4gICAgICBjb25zdCBsaW5lcyA9IFtcclxuICAgICAgICBgXHU1OTBEXHU2OEMwXHU1QjhDXHU2MjEwXHVGRjFBXHU1REYyXHU0RkVFXHU1OTBEICR7cmVzb2x2ZWQubGVuZ3RofSBcdTAwQjcgXHU0RUNEXHU2NzJBXHU0RkVFXHU1OTBEICR7c3RpbGxPcGVuLmxlbmd0aH0gXHUwMEI3IFx1NjVCMFx1NTg5RVx1OTVFRVx1OTg5OCAke25ld0lzc3Vlcy5sZW5ndGh9YCxcclxuICAgICAgICAuLi4ocmVzb2x2ZWQubGVuZ3RoID4gMCA/IFtgXHUyNzEzIFx1NURGMlx1NEZFRVx1NTkwRFx1RkYxQSR7cmVzb2x2ZWQuam9pbignXHVGRjFCJyl9YF0gOiBbXSksXHJcbiAgICAgICAgLi4uKHN0aWxsT3Blbi5sZW5ndGggPiAwID8gc3RpbGxPcGVuLm1hcCgoaXRlbSkgPT4gYFx1MjcxNyBcdTY3MkFcdTRGRUVcdTU5MERcdUZGMUEke2l0ZW0udGl0bGV9IFx1MjAxNFx1MjAxNCAke2l0ZW0ucmVhc29ufWApIDogW10pLFxyXG4gICAgICAgIC4uLihuZXdJc3N1ZXMubGVuZ3RoID4gMCA/IG5ld0lzc3Vlcy5tYXAoKGl0ZW0pID0+IGBcdUZGMEIgXHU2NUIwXHU5NUVFXHU5ODk4XHVGRjFBWyR7aXRlbS5zZXZlcml0eX1dICR7aXRlbS50aXRsZX1gKSA6IFtdKSxcclxuICAgICAgICAuLi4odmVyZGljdCA9PT0gJycgPyBbXSA6IFtgXHU2NzAwXHU0RjE4XHU2MDI3XHVGRjFBJHt2ZXJkaWN0fWBdKSxcclxuICAgICAgXVxyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQobGluZXMuam9pbignXFxuJykpXHJcbiAgICAgIGF3YWl0IGxvYWRJc3N1ZXMoKVxyXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0VmVyaWZ5aW5nVGFyZ2V0KG51bGwpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBhZGROb3RlID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgaWYgKG5vdGVUaXRsZS50cmltKCkgPT09ICcnIHx8IG5vdGVDb250ZW50LnRyaW0oKSA9PT0gJycpIHJldHVyblxyXG4gICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMnLCB7XHJcbiAgICAgIHRpdGxlOiBub3RlVGl0bGUudHJpbSgpLFxyXG4gICAgICBjb250ZW50OiBub3RlQ29udGVudC50cmltKCksXHJcbiAgICAgIHRhZ3M6IG5vdGVUYWdzLFxyXG4gICAgICBzaGE6IHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiBzZWxlY3RlZFRhcmdldHNbMF0sXHJcbiAgICB9KVxyXG4gICAgaWYgKG9rKSB7XHJcbiAgICAgIHNldE5vdGVUaXRsZSgnJylcclxuICAgICAgc2V0Tm90ZUNvbnRlbnQoJycpXHJcbiAgICAgIHNldE5vdGVUYWdzKCcnKVxyXG4gICAgICBhd2FpdCBsb2FkTm90ZXMoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVtb3ZlTm90ZSA9IGFzeW5jIChpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy9kZWxldGUnLCB7IGlkIH0pXHJcbiAgICBpZiAoZWRpdGluZ05vdGUgIT09IG51bGwgJiYgZWRpdGluZ05vdGUuaWQgPT09IGlkKSBzZXRFZGl0aW5nTm90ZShudWxsKVxyXG4gICAgYXdhaXQgbG9hZE5vdGVzKClcclxuICB9XHJcblxyXG4gIGNvbnN0IHNhdmVOb3RlRWRpdCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGlmIChlZGl0aW5nTm90ZSA9PT0gbnVsbCkgcmV0dXJuXHJcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy91cGRhdGUnLCB7IGlkOiBlZGl0aW5nTm90ZS5pZCwgdGl0bGU6IGVkaXRpbmdOb3RlLnRpdGxlLCBjb250ZW50OiBlZGl0aW5nTm90ZS5jb250ZW50LCB0YWdzOiBlZGl0aW5nTm90ZS50YWdzIH0pXHJcbiAgICBzZXRFZGl0aW5nTm90ZShudWxsKVxyXG4gICAgYXdhaXQgbG9hZE5vdGVzKClcclxuICB9XHJcblxyXG4gIC8qKiBcdTdGNkVcdTk4NzYvXHU1M0Q2XHU2RDg4XHU3RjZFXHU5ODc2XHU0RTAwXHU2NzYxXHU3QjE0XHU4QkIwXHUzMDAyICovXHJcbiAgY29uc3QgdG9nZ2xlTm90ZVBpbiA9IGFzeW5jIChub3RlOiBOb3RlRW50cnkpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL3VwZGF0ZScsIHsgaWQ6IG5vdGUuaWQsIHBpbm5lZDogbm90ZS5waW5uZWQgIT09IHRydWUgfSlcclxuICAgIGF3YWl0IGxvYWROb3RlcygpXHJcbiAgfVxyXG5cclxuICAvKiogXHU3QjE0XHU4QkIwXHU1QkZDXHU1MUZBXHU0RTNBIC5tZCBcdTY1ODdcdTRFRjZcdUZGMDhcdTZENEZcdTg5QzhcdTU2NjhcdTdBRUYgQmxvYiBcdTRFMEJcdThGN0RcdUZGMUJcdTY1ODdcdTRFRjZcdTU0MERcdTYzMDlcdTY4MDdcdTk4OThcdTZFMDVcdTZEMTdcdUZGMENcdTk3NUVcdTZDRDVcdTVCNTdcdTdCMjZcdTY2RkZcdTYzNjJcdTRFM0FcdTRFMEJcdTUyMTJcdTdFQkZcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBleHBvcnROb3RlID0gKG5vdGU6IE5vdGVFbnRyeSk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgbWQgPSBgIyAke25vdGUudGl0bGV9XFxuXFxuJHtub3RlLmNvbnRlbnR9XFxuYFxyXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFttZF0sIHsgdHlwZTogJ3RleHQvbWFya2Rvd247Y2hhcnNldD11dGYtOCcgfSlcclxuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcclxuICAgIGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxyXG4gICAgYW5jaG9yLmhyZWYgPSB1cmxcclxuICAgIGFuY2hvci5kb3dubG9hZCA9IChub3RlLnRpdGxlLnJlcGxhY2UoL1tcXFxcLzoqP1wiPD58XS9nLCAnXycpLnRyaW0oKS5zbGljZSgwLCA2MCkgfHwgJ25vdGUnKSArICcubWQnXHJcbiAgICBhbmNob3IuY2xpY2soKVxyXG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpXHJcbiAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgnbm90ZXMuZXhwb3J0RG9uZScpKVxyXG4gIH1cclxuXHJcbiAgLyoqIEFJIFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1RkYxQVx1NUJGOVx1NkJENFx1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NTA1QVx1NTg5RVx1OTFDRlx1NjZGNFx1NjVCMFx1RkYwQ1x1NjI4QVx1N0IxNFx1OEJCMCtcdTk4NzlcdTc2RUVcdTY4NjNcdTY4NDhcdTYzRDBcdTcwQkNcdTYyMTBcdTRFMDBcdTRFRkRcdTMwMENcdTZEM0JcdTMwMERcdTc2ODRcdTYwM0JcdTdFRDNcdTY1ODdcdTY4NjNcdTMwMDIgKi9cclxuICBjb25zdCBhaVN1bW1hcml6ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIHNldEFpU3VtbWFyaXppbmcodHJ1ZSlcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL2FpLXN1bW1hcnknLCB7fSlcclxuICAgICAgaWYgKCFvaykge1xyXG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoZGF0YVsndXBkYXRlZCddID09PSB0cnVlXHJcbiAgICAgICAgPyAnXHUyNzEzIFx1NURGMlx1NUJGOVx1NkJENFx1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NUI4Q1x1NjIxMFx1NTg5RVx1OTFDRlx1NjZGNFx1NjVCMFx1RkYwOFx1NjVCMFx1NTg5RVx1NTNEOFx1NTMxNlx1ODlDMVx1NjAzQlx1N0VEM1x1NzY4NFx1MzAwQ1x1NjcyQ1x1NkIyMVx1NjZGNFx1NjVCMFx1MzAwRFx1NEUwMFx1ODI4Mlx1RkYwOVx1RkYwQ1x1NjVFN1x1NjAzQlx1N0VEM1x1NURGMlx1NTQwOFx1NUU3Nlx1NjZGRlx1NjM2MidcclxuICAgICAgICA6ICdcdTI3MTMgXHU1REYyXHU3NTFGXHU2MjEwXHU5OTk2XHU0RUZEXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzJylcclxuICAgICAgYXdhaXQgbG9hZE5vdGVzKClcclxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldEFpU3VtbWFyaXppbmcoZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogXHU5ODc1XHU5NzYyXHU1MjFCXHU1RUZBXHU2MjY3XHU4ODRDXHVGRjFBXHU1RUZBXHU1M0Q4XHU2NkY0IFx1MjE5MiBMTE0gXHU3NTFGXHU2MjEwXHU3RjE2XHU2MzkyXHU4QkExXHU1MjEyIFx1MjE5MiBcdThCQTFcdTUyMTJcdTc4NkVcdThCQTRcdTk4NzVcdUZGMDhcdTg5RDJcdTgyNzIvXHU2QTIxXHU1NzhCL1x1N0I1Nlx1NzU2NVx1NTNFRlx1OEMwM1x1RkYwOVx1MjE5MiBcdTc4NkVcdThCQTRcdTU0MEVcdTU0MkZcdTUyQThcdTMwMDIgKi9cclxuICBjb25zdCBzdGFydFJ1biA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGlmIChleGVjVGl0bGUudHJpbSgpID09PSAnJyB8fCBleGVjRGVzYy50cmltKCkgPT09ICcnKSByZXR1cm5cclxuICAgIHNldEJ1c3koJ3N0YXJ0UnVuJylcclxuICAgIHNldEFjdGlvblJlc3VsdChudWxsKVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9zdGFydCcsIHtcclxuICAgICAgICB0aXRsZTogZXhlY1RpdGxlLnRyaW0oKSwgZGVzY3JpcHRpb246IGV4ZWNEZXNjLnRyaW0oKSxcclxuICAgICAgICAuLi4oZXhlY01vZGVsID09PSAnJyA/IHt9IDogKCgpID0+IHsgY29uc3QgW3Byb3ZpZGVyLCBtb2RlbF0gPSBleGVjTW9kZWwuc3BsaXQoJy8nKTsgcmV0dXJuIHsgZGVmYXVsdE1vZGVsUHJvdmlkZXI6IHByb3ZpZGVyID8/ICcnLCBkZWZhdWx0TW9kZWxJZDogbW9kZWwgPz8gJycgfSB9KSgpKSxcclxuICAgICAgfSlcclxuICAgICAgaWYgKCFvaykge1xyXG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBpZiAoZGF0YVsnYXV0b1N0YXJ0ZWQnXSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NURGMlx1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYxQScgKyBTdHJpbmcoZGF0YVsncnVuSWQnXSA/PyAnJykpXHJcbiAgICAgICAgc2V0RXhlY1RpdGxlKCcnKVxyXG4gICAgICAgIHNldEV4ZWNEZXNjKCcnKVxyXG4gICAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgc3RlcHMgPSAoZGF0YVsnc3RlcHMnXSBhcyBBcnJheTxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4gfCB1bmRlZmluZWQpID8/IFtdXHJcbiAgICAgIHNldFBsYW5Db25maXJtKHtcclxuICAgICAgICBjaGFuZ2VJZDogU3RyaW5nKGRhdGFbJ2NoYW5nZUlkJ10gPz8gJycpLFxyXG4gICAgICAgIHN0ZXBzOiBzdGVwcy5tYXAoKHN0ZXApID0+ICh7XHJcbiAgICAgICAgICBpZDogU3RyaW5nKHN0ZXBbJ2lkJ10gPz8gJycpLFxyXG4gICAgICAgICAgdGl0bGU6IFN0cmluZyhzdGVwWyd0aXRsZSddID8/ICcnKSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoc3RlcFsnZGVzY3JpcHRpb24nXSA/PyAnJyksXHJcbiAgICAgICAgICB0YXJnZXRGaWxlczogKHN0ZXBbJ3RhcmdldEZpbGVzJ10gYXMgc3RyaW5nW10gfCB1bmRlZmluZWQpID8/IFtdLFxyXG4gICAgICAgICAgcm9sZTogU3RyaW5nKHN0ZXBbJ3JvbGUnXSA/PyAnY29kaW5nJyksXHJcbiAgICAgICAgICBhY2NlcHRhbmNlOiBTdHJpbmcoc3RlcFsnYWNjZXB0YW5jZSddID8/ICcnKSxcclxuICAgICAgICAgIGZhaWx1cmVQb2xpY3k6IFN0cmluZyhzdGVwWydmYWlsdXJlUG9saWN5J10gPz8gJ3JldHJ5LWVzY2FsYXRlJyksXHJcbiAgICAgICAgICBlbmFibGVkOiBzdGVwWydlbmFibGVkJ10gIT09IGZhbHNlLFxyXG4gICAgICAgICAgbW9kZWxQcm92aWRlcjogJycsXHJcbiAgICAgICAgICBtb2RlbElkOiAnJyxcclxuICAgICAgICB9KSksXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChtb2RlbE9wdGlvbnMubGVuZ3RoID09PSAwICYmIG1vZGVsVGllcnMgPT09IG51bGwpIHZvaWQgbG9hZE1vZGVsQ29uZmlnKClcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU4QkExXHU1MjEyXHU1REYyXHU3NTFGXHU2MjEwXHVGRjBDXHU4QkY3XHU1NzI4XHU0RTBCXHU2NUI5XHU3ODZFXHU4QkE0XHU3RjE2XHU2MzkyXHU1NDBFXHU1NDJGXHU1MkE4JylcclxuICAgICAgc2V0RXhlY1RpdGxlKCcnKVxyXG4gICAgICBzZXRFeGVjRGVzYygnJylcclxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldEJ1c3kobnVsbClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBcdThCQTFcdTUyMTJcdTc4NkVcdThCQTRcdTk4NzVcdUZGMUFcdTRGRERcdTVCNThcdTdGMTZcdThGOTFcdUZGMDhcdTY1QjBcdTcyNDhcdTY3MkNcdThCQTFcdTUyMTJcdUZGMDlcdTVFNzZcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdTMwMDIgKi9cclxuICBjb25zdCBsYXVuY2hQbGFuID0gYXN5bmMgKHdpdGhFZGl0czogYm9vbGVhbik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgaWYgKHBsYW5Db25maXJtID09PSBudWxsKSByZXR1cm5cclxuICAgIHNldFBsYW5CdXN5KHRydWUpXHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgY2hhbmdlSWQgPSBwbGFuQ29uZmlybS5jaGFuZ2VJZFxyXG4gICAgICBpZiAod2l0aEVkaXRzKSB7XHJcbiAgICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9wbGFuL3VwZGF0ZScsIHsgY2hhbmdlSWQsIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcyB9KVxyXG4gICAgICAgIGlmICghb2spIHtcclxuICAgICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL2xhdW5jaCcsIHsgY2hhbmdlSWQgfSlcclxuICAgICAgaWYgKCFvaykge1xyXG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMUEnICsgU3RyaW5nKGRhdGFbJ3J1bklkJ10gPz8gJycpKVxyXG4gICAgICBzZXRQbGFuQ29uZmlybShudWxsKVxyXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxyXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0UGxhbkJ1c3koZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogXHU1MkEwXHU4RjdEIFJ1biBcdThCRTZcdTYwQzVcdUZGMDhcdTZCNjVcdTlBQTRcdTY1RjZcdTk1RjRcdTdFQkYgKyBcdTRFRkJcdTUyQTFcdTVERTVcdTRGNUNcdThCQjBcdTVGQzZcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBsb2FkUnVuRGV0YWlsID0gYXN5bmMgKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvZGV0YWlsP2lkPScgKyBlbmNvZGVVUklDb21wb25lbnQoaWQpICsgJyZzZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxyXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0UnVuRGV0YWlsKGRhdGEgYXMgUnVuRGV0YWlsKVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIHNldFJ1bkRldGFpbChudWxsKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NjA2Mlx1NTkwRFx1NjY4Mlx1NTA1Qy9cdTRFMkRcdTY1QUQvXHU1OTMxXHU4RDI1XHU3Njg0IFJ1blx1MzAwMiAqL1xyXG4gIGNvbnN0IHJlc3VtZVJ1biA9IGFzeW5jIChydW5JZDogc3RyaW5nLCBhY3Rpb246ICdjb250aW51ZScgfCAnc2tpcC1jdXJyZW50Jyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9yZXN1bWUnLCB7IHJ1bklkLCBhY3Rpb24gfSlcclxuICAgIGlmIChvaykge1xyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTYwNjJcdTU5MERcdTYyNjdcdTg4NENcdUZGMDgnICsgYWN0aW9uICsgJ1x1RkYwOScpXHJcbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXHJcbiAgICAgIGF3YWl0IGxvYWRSdW5EZXRhaWwocnVuSWQpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogXHU1MkEwXHU4RjdEXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHU1MjE3XHU4ODY4XHUzMDAyICovXHJcbiAgY29uc3QgbG9hZFNjaGVkdWxlZCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3NjaGVkdWxlZD9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxyXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0U2NoZWR1bGVkRGF0YSgoZGF0YSBhcyB7IHRhc2tzOiBTY2hlZHVsZWRUYXNrRW50cnlbXSB9KS50YXNrcyA/PyBbXSlcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBcdTUyMTdcdTg4NjhcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBcdTUyMUJcdTVFRkEgLyBcdTY2RjRcdTY1QjAgLyBcdTUyMjBcdTk2NjQgLyBcdTdBQ0JcdTUzNzNcdTYyNjdcdTg4NENcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdTMwMDIgKi9cclxuICBjb25zdCBhZGRTY2hlZHVsZWQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBjb25zdCBpbnRlcnZhbE1pbnV0ZXMgPSBOdW1iZXIoc2NoZWRJbnRlcnZhbClcclxuICAgIGlmIChzY2hlZE5hbWUudHJpbSgpID09PSAnJyB8fCAhTnVtYmVyLmlzRmluaXRlKGludGVydmFsTWludXRlcykgfHwgaW50ZXJ2YWxNaW51dGVzIDwgMSkge1xyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyBcdThCRjdcdTU4NkJcdTUxOTlcdTRFRkJcdTUyQTFcdTU0MERcdTc5RjBcdTRFMEVcdTY3MDlcdTY1NDhcdTk1RjRcdTk2OTRcdUZGMDhcdTUyMDZcdTk0OUZcdUZGMDknKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3NjaGVkdWxlZCcsIHtcclxuICAgICAgbmFtZTogc2NoZWROYW1lLnRyaW0oKSwgdHlwZTogc2NoZWRUeXBlLCBpbnRlcnZhbE1pbnV0ZXMsXHJcbiAgICAgIHRpdGxlOiBzY2hlZFRpdGxlLnRyaW0oKSB8fCB1bmRlZmluZWQsIGRlc2NyaXB0aW9uOiBzY2hlZERlc2MudHJpbSgpIHx8IHVuZGVmaW5lZCxcclxuICAgIH0pXHJcbiAgICBpZiAob2spIHtcclxuICAgICAgc2V0U2NoZWROYW1lKCcnKTsgc2V0U2NoZWRUaXRsZSgnJyk7IHNldFNjaGVkRGVzYygnJylcclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHU1REYyXHU1MjFCXHU1RUZBJylcclxuICAgICAgYXdhaXQgbG9hZFNjaGVkdWxlZCgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBzY2hlZHVsZWRBY3Rpb24gPSBhc3luYyAocGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvc2NoZWR1bGVkLycgKyBwYXRoLCBib2R5KVxyXG4gICAgaWYgKG9rKSBhd2FpdCBsb2FkU2NoZWR1bGVkKClcclxuICAgIGVsc2Ugc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxyXG4gIH1cclxuXHJcbiAgLyoqIFx1NTJBMFx1OEY3RFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1NTE2OFx1OTFDRlx1NjU3MFx1NjM2RVx1RkYwOFx1NTQyQlx1NTQwQ1x1NkI2NVx1NTdGQVx1N0VCRlx1RkYwOVx1MzAwMiAqL1xyXG4gIGNvbnN0IGxvYWRNZW1vcmllcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yaWVzP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXHJcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXRNZW1vcmllc0RhdGEoZGF0YSBhcyBNZW1vcmllc1BheWxvYWQpXHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gXHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogXHU2MkM5XHU1M0Q2XHU1NDBDXHU2QjY1XHVGRjFBXHU0RTA5XHU1NDExXHU1MjI0XHU1QjlBXHVGRjA4XHU1OTMxXHU2NTQ4XHU2M0QwXHU2ODQ4L1x1NjVCMFx1NTg5RVx1NTAxOVx1OTAwOS9cdTgxRUFcdTUyQThcdTdFRURcdTU0N0RcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBzeW5jTWVtb3JpZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBzZXRNZW1vcnlTeW5jaW5nKHRydWUpXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvc3luYycsIHt9KVxyXG4gICAgICBpZiAoIW9rICYmIGRhdGFbJ2Vycm9yJ10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHNldFN5bmNSZXBvcnQoeyBvazogZmFsc2UsIGVycm9yOiBTdHJpbmcoZGF0YVsnZXJyb3InXSkgfSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBzZXRTeW5jUmVwb3J0KGRhdGEgYXMgU3luY1JlcG9ydClcclxuICAgICAgYXdhaXQgbG9hZE1lbW9yaWVzKClcclxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgIHNldFN5bmNSZXBvcnQoeyBvazogZmFsc2UsIGVycm9yOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikgfSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldE1lbW9yeVN5bmNpbmcoZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogXHU1NDBDXHU2QjY1XHU2MkE1XHU1NDRBXHU1NDBFXHU3RUVEXHVGRjFBXHU2MjhBXHU5MDA5XHU0RTJEXHU3Njg0XHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2XHU5ODc5XHU4NDNEXHU0RTNBIHN0YWxlIC8gXHU1RjUyXHU2ODYzXHUzMDAyICovXHJcbiAgY29uc3QgYXBwbHlTeW5jID0gYXN5bmMgKGlkczogc3RyaW5nW10sIGFjdGlvbjogJ21hcmstc3RhbGUnIHwgJ2FyY2hpdmUnKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvc3luYy9hcHBseScsIHsgaWRzLCBhY3Rpb24gfSlcclxuICAgIHNldFN5bmNSZXBvcnQoKHByZXZpb3VzKSA9PiBwcmV2aW91cyA9PT0gbnVsbCA/IG51bGwgOiB7IC4uLnByZXZpb3VzLCBzdGFsZVByb3Bvc2FsczogKHByZXZpb3VzLnN0YWxlUHJvcG9zYWxzID8/IFtdKS5maWx0ZXIoKHByb3Bvc2FsKSA9PiAhaWRzLmluY2x1ZGVzKHByb3Bvc2FsLmlkKSkgfSlcclxuICAgIGF3YWl0IGxvYWRNZW1vcmllcygpXHJcbiAgfVxyXG5cclxuICAvKiogXHU4QkIwXHU1RkM2XHU3MkI2XHU2MDAxXHU2NENEXHU0RjVDXHVGRjA4XHU1RjUyXHU2ODYzL1x1NjA2Mlx1NTkwRFx1RkYwOVx1NEUwRVx1NTIwNlx1NjUyRlx1NUY1Mlx1NEUwMFx1MzAwMiAqL1xyXG4gIGNvbnN0IG1lbW9yeUFjdGlvbiA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvJyArIHBhdGgsIGJvZHkpXHJcbiAgICBpZiAob2spIGF3YWl0IGxvYWRNZW1vcmllcygpXHJcbiAgICBlbHNlIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcclxuICB9XHJcblxyXG4gIC8qKiBcdThCQjBcdTVGQzZcdThGNkNcdTdCMTRcdThCQjBcdUZGMUFcdTVGMTVcdTc1MjhcdThGREJcdTVCNjZcdTRFNjBcdTY4NjNcdTY4NDhcdTMwMDIgKi9cclxuICBjb25zdCBtZW1vcnlUb05vdGUgPSBhc3luYyAobWVtb3J5OiBNZW1vcnlFbnRyeSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMnLCB7XHJcbiAgICAgIHRpdGxlOiBtZW1vcnkudGl0bGUsXHJcbiAgICAgIGNvbnRlbnQ6IG1lbW9yeS5jb250ZW50ICsgKG1lbW9yeS5iYXNpc1NoYSAhPT0gbnVsbCA/IGBcXG5cdUZGMDhcdTY3NjVcdTZFOTBcdUZGMUFcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzYgJHttZW1vcnkuYmFzaXNTaGEuc2xpY2UoMCwgOCl9XHVGRjA5YCA6ICcnKSxcclxuICAgICAgdGFnczogJ1x1OEJCMFx1NUZDNiwgJyArIG1lbW9yeS50eXBlLFxyXG4gICAgfSlcclxuICAgIGlmIChvaykgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU1REYyXHU2MjhBXHU4QkIwXHU1RkM2XHU4RjZDXHU0RTNBXHU3QjE0XHU4QkIwJylcclxuICB9XHJcblxyXG4gIC8vIFx1NEYxQVx1OEJERFx1NjI1M1x1NUYwMC9cdTUyMDdcdTYzNjJcdTY1RjZcdTVCOThcdTY1QjlcdTRGMUEgY2xvc2VEZXRhaWxzIFx1NjUzNlx1OEQ3N1x1OEY2OFx1OTA1M1x1RkYxQlx1NzcwQlx1OTVFOFx1NzJEN1x1NkJDRiA1MDBtcyBcdTY4QzBcdTY3RTVcdUZGMENcclxuICAvLyBcdTUzRUFcdTg5ODFcdTVGNTNcdTUyNERcdTY3MDlcdTRGMUFcdThCRERcdTgwMENcdTVERTVcdTRGNUNcdTUzRjBcdTUyMTdcdTVCQkQgPCA1MHB4IFx1NUMzMVx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1RkYwOFx1Nzg2RVx1NUI5QVx1NjAyN1x1RkYwQ1x1NEUwRFx1NEY5RFx1OEQ1NiBlZmZlY3QgXHU2NUY2XHU1RThGXHVGRjA5XHUzMDAyXHJcbiAgLy8gXHU1NDBDXHU0RTAwXHU2MkNEXHU3RUY0XHU2MzAxXHU3RURGXHU4QkExXHU4ODRDXHU5NEIzXHU1MjM2XHVGRjFBXHU0RjFBXHU4QkREXHU1MjA3XHU2MzYyXHU0RjFBXHU2MzYyXHU2Mzg5XHU3RURGXHU4QkExXHU4ODRDIERPTVx1RkYwQ1x1NjgzN1x1NUYwRlx1ODg2OFx1N0YzQVx1NTkzMVx1NjVGNlx1NjMwOVx1NUY1M1x1NTI0RFxyXG4gIC8vIFx1Njc4NFx1NUVGQVx1NTRDOFx1NUUwQ1x1OTFDRFx1NkNFOFx1NTE2NVx1RkYwOFx1NUU0Mlx1N0I0OVx1RkYwQ1x1NURGMlx1NUI1OFx1NTcyOFx1NTIxOVx1OERGM1x1OEZDN1x1RkYwOVx1MzAwMlxyXG4gIGNvbnN0IGxheW91dEZhY2UgPSAocHJvcHMgYXMgdW5rbm93biBhcyB7IGxheW91dD86IHsgb3BlbkRldGFpbHM/OiAoKSA9PiB2b2lkIH0gfSkubGF5b3V0XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChwcm9wcy5sYXlvdXRNb2RlID09PSAnb3ZlcmxheScpIHJldHVyblxyXG4gICAgYXBwbHlTdGF0c0xpbmVDbGFtcCgpXHJcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYy1zdGF0cy1jbGFtcCcpID09PSBudWxsKSBhcHBseVN0YXRzTGluZUNsYW1wKClcclxuICAgICAgY29uc3QgY2hhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0nKVxyXG4gICAgICBjb25zdCB3aWR0aCA9IGNoYXQgPyBNYXRoLnJvdW5kKGNoYXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpIDogLTFcclxuICAgICAgaWYgKHdpZHRoICE9PSAtMSAmJiB3aWR0aCA8IDUwKSBsYXlvdXRGYWNlPy5vcGVuRGV0YWlscz8uKClcclxuICAgIH0sIDUwMClcclxuICAgIHJldHVybiAoKSA9PiB7IGNsZWFySW50ZXJ2YWwodGltZXIpIH1cclxuICB9LCBbcHJvcHMuc2Vzc2lvbklkLCBwcm9wcy5sYXlvdXRNb2RlLCBsYXlvdXRGYWNlXSlcclxuXHJcbiAgLyoqIFx1NEVFNSBpbXBvcnRhbnQgXHU1MTg1XHU4MDU0XHU2ODM3XHU1RjBGXHU3NkY0XHU2M0E1XHU1MTk5XHU1Qjk4XHU2NUI5XHU3RjUxXHU2ODNDXHU2QTIxXHU2NzdGXHVGRjA4XHU2NzAwXHU5QUQ4XHU0RjE4XHU1MTQ4XHU3RUE3XHVGRjBDXHU0RUZCXHU0RjU1XHU5MUNEXHU2RTMyXHU2N0QzXHU0RTBEXHU0RjFBXHU4OTg2XHU3NkQ2XHVGRjA5XHUzMDAyICovXHJcbiAgY29uc3QgZnJhbWVUZW1wbGF0ZVNldCA9IChjaGF0UHg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJzaWRlYmFyQ29sXCJdJylcclxuICAgIGNvbnN0IHNpZGViYXJXID0gc2lkZWJhciA/IE1hdGgubWF4KDU2LCBNYXRoLnJvdW5kKHNpZGViYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpKSA6IDI4MFxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXScpXHJcbiAgICAgID8uc3R5bGUuc2V0UHJvcGVydHkoJ2dyaWQtdGVtcGxhdGUtY29sdW1ucycsIHNpZGViYXJXICsgJ3B4IG1pbm1heCgwLCAxZnIpICcgKyBjaGF0UHggKyAncHgnLCAnaW1wb3J0YW50JylcclxuICB9XHJcblxyXG4gIC8qKiBcdTY1MzZcdThENzdcdTYwMDFcdTZBMjFcdTY3N0ZcdUZGMUFcdTdCMkNcdTRFMDlcdTUyMTdcdUZGMDhcdTVCOThcdTY1QjlcdThCRTZcdTYwQzVcdUZGMDkwcHhcdTIwMTRcdTIwMTRcdTVERTVcdTRGNUNcdTUzRjBcdTUxNzNcdTk1RURcdTU0MEVcdTUzRjNcdTRGQTdcdTUzRUFcdTUxNDFcdThCQjhcdTgwNEFcdTU5MjlcdUZGMDhcdTRFMUFcdTRFM0JcdTg5QzRcdTUyMTlcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCBjb2xsYXBzZUZyYW1lVGVtcGxhdGUgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cInNpZGViYXJDb2xcIl0nKVxyXG4gICAgY29uc3Qgc2lkZWJhclcgPSBzaWRlYmFyID8gTWF0aC5tYXgoNTYsIE1hdGgucm91bmQoc2lkZWJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkpIDogMjgwXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdJylcclxuICAgICAgPy5zdHlsZS5zZXRQcm9wZXJ0eSgnZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zJywgc2lkZWJhclcgKyAncHggbWlubWF4KDAsIDFmcikgMHB4JywgJ2ltcG9ydGFudCcpXHJcbiAgfVxyXG5cclxuICAvLyBcdTgwNEFcdTU5MjlcdTUyMTdcdTVCQkRcdThCQjBcdTVGQzZcdUZGMDhcdTVCOThcdTY1QjkgbGF5b3V0IHN0b3JlIFx1NzdBQ1x1NjAwMVx1RkYwOVx1RkYxQVx1NjMwMlx1OEY3RFx1NjA2Mlx1NTkwRCArIFx1NjJENlx1NjJGRFx1NzZGNFx1NTE5OVx1NTE4NVx1ODA1NFx1NkEyMVx1Njc3Rlx1MzAwMlxyXG4gIC8vIFx1NUZDNVx1OTg3Qlx1NTE5OSBpbXBvcnRhbnRcdTIwMTRcdTIwMTRMQVlPVVRfU1RZTEUgXHU3Njg0XHU2QTIxXHU2NzdGXHU4OUM0XHU1MjE5XHU0RTVGXHU2NjJGIGltcG9ydGFudFx1RkYwQ1x1OTc1RSBpbXBvcnRhbnRcclxuICAvLyBcdTUxODVcdTgwNTRcdTRGMUFcdTg4QUJcdTVCODNcdTUzOEJcdTUyMzZcdUZGMDhcdThGRDlcdTVDMzFcdTY2MkZcdTZCNjRcdTUyNERcIlx1NjJENlx1NjJGRFx1NzUxRlx1NjU0OFx1MzAwMVx1NTIzN1x1NjVCMFx1NTQwRVx1OEJCMFx1NUZDNlx1NEUyMlx1NTkzMVwiXHU3Njg0XHU1MzlGXHU1NkUwXHVGRjA5XHUzMDAyXHJcbiAgLy8gXHU1Qjk4XHU2NUI5IFJlYWN0IFx1OTFDRFx1NkUzMlx1NjdEM1x1NEYxQVx1NjUzOVx1NTE5OVx1NTE4NVx1ODA1NFx1NkEyMVx1Njc3Rlx1RkYwQ011dGF0aW9uT2JzZXJ2ZXIgXHU2MzA5XHU1RjUzXHU1MjREXHU1MDNDXHU1Qjg4XHU1MzZCXHU5MUNEXHU1MTk5XHJcbiAgLy8gXHVGRjA4XHU1MDNDXHU3NkY4XHU1NDBDXHU0RTBEXHU0RjFBXHU4OUU2XHU1M0QxXHU2NUIwXHU3Njg0IG11dGF0aW9uXHVGRjBDXHU2NUUwXHU1NkRFXHU3M0FGXHVGRjA5XHUzMDAyXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChwcm9wcy5sYXlvdXRNb2RlID09PSAnb3ZlcmxheScpIHJldHVyblxyXG4gICAgY29uc3Qgc2F2ZWQgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BjLmNoYXRXaWR0aCcpID8/ICcnKVxyXG4gICAgY29uc3QgYXBwbHkgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgIC8vIFx1NjMwMlx1OEY3RC9cdTVCOThcdTY1QjlcdTkxQ0RcdTZFMzJcdTY3RDNcdTY1RjZcdTY1RTBcdTY3NjFcdTRFRjZcdTU5M0FcdTU2REVcdTZBMjFcdTY3N0ZcdUZGMDhpbXBvcnRhbnQgXHU4OTg2XHU1MTk5XHVGRjFCXHU1MDNDXHU3NkY4XHU1NDBDXHU2NUY2XHU1Qjk4XHU2NUI5XHU2ODM3XHU1RjBGXHU1M0Q4XHU2NkY0XHJcbiAgICAgIC8vIFx1NEUwRFx1NEYxQVx1ODlFNlx1NTNEMVx1NjVCMFx1NzY4NCBtdXRhdGlvblx1RkYwQ1x1NjVFMFx1NTZERVx1NzNBRlx1RkYwOVx1MzAwMlx1NURFNVx1NEY1Q1x1NTNGMFx1NUYwMFx1Nzc0MCA9IFx1NTNGM1x1NTIxN1x1ODA0QVx1NTkyOVx1NTZGQVx1NUI5QVx1NUJCRFx1MzAwMlxyXG4gICAgICBjb25zdCBjaGF0VyA9IE51bWJlci5pc0Zpbml0ZShzYXZlZCkgJiYgc2F2ZWQgPj0gMjgwID8gc2F2ZWQgOiAzNjBcclxuICAgICAgZnJhbWVUZW1wbGF0ZVNldChjaGF0VylcclxuICAgIH1cclxuICAgIGFwcGx5KClcclxuICAgIGNvbnN0IGZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXScpXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHsgYXBwbHkoKSB9KVxyXG4gICAgaWYgKGZyYW1lICE9PSBudWxsKSBvYnNlcnZlci5vYnNlcnZlKGZyYW1lLCB7IGF0dHJpYnV0ZXM6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogWydzdHlsZSddIH0pXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcclxuICAgICAgLy8gXHU1REU1XHU0RjVDXHU1M0YwXHU1Mzc4XHU4RjdEXHVGRjFBXHU1MTk5XHU1MTY1XHU2NTM2XHU4RDc3XHU2MDAxXHU2QTIxXHU2NzdGXHVGRjA4XHU3QjJDXHU0RTA5XHU1MjE3IDBweFx1RkYwOVx1MjAxNFx1MjAxNFx1NEUxQVx1NEUzQlx1ODlDNFx1NTIxOVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1NTE3MyBcdTIxOTIgXHU1M0YzXHU0RkE3XHU1M0VBXHU1MTQxXHU4QkI4XHJcbiAgICAgIC8vIFx1ODA0QVx1NTkyOVx1MzAwMlx1NEUwRFx1ODBGRFx1NTIyMFx1OTY2NFx1NTE4NVx1ODA1NFx1NUM1RVx1NjAyN1x1RkYwOFx1NUI5OFx1NjVCOSBSZWFjdCBcdTRFMERcdTRGMUFcdTRFM0JcdTUyQThcdTg4NjVcdTUxOTlcdUZGMENcdTRGMUFcdTVCRkNcdTgxRjRcdTRFM0JcdTUzM0FcdTdBN0FcdTc2N0RcdUZGMDlcdUZGMUJcclxuICAgICAgLy8gXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHU4NjdEXHU1NkRFXHU1MjMwXHU4QkU1XHU1MjE3XHU0RjQ2IDAgXHU1QkJEXHU0RTBEXHU1M0VGXHU4OUMxXHVGRjA4MC4xLjIgXHU1QjlFXHU2RDRCXHU1NkRFXHU1RjUyXHVGRjA5XHUzMDAyXHJcbiAgICAgIGNvbGxhcHNlRnJhbWVUZW1wbGF0ZSgpXHJcbiAgICB9XHJcbiAgfSwgW3Byb3BzLmxheW91dE1vZGVdKVxyXG5cclxuICAvKiogXHU1MjA2XHU5Njk0XHU2NzYxXHU2MkQ2XHU2MkZEXHVGRjFBXHU4QzAzXHU2NTc0XHU4MDRBXHU1OTI5XHU1MjE3XHU1QkJEXHVGRjA4XHU1REU1XHU0RjVDXHU1M0YwXHU1NDM4XHU2NTM2XHU1MjY5XHU0RjU5XHU3QTdBXHU5NUY0XHVGRjA5XHVGRjBDXHU1MTk5XHU1MTY1IGxvY2FsU3RvcmFnZSBcdThCQjBcdTVGQzZcdTMwMDIgKi9cclxuICBjb25zdCBvbkRpdmlkZXJEb3duID0gKGU6IFJlYWN0LlBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCBvbk1vdmUgPSAoZXY6IFBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgICBjb25zdCB3aWR0aCA9IE1hdGgubWluKDkwMCwgTWF0aC5tYXgoMjgwLCB3aW5kb3cuaW5uZXJXaWR0aCAtIGV2LmNsaWVudFgpKVxyXG4gICAgICBmcmFtZVRlbXBsYXRlU2V0KHdpZHRoKVxyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGMuY2hhdFdpZHRoJywgU3RyaW5nKHdpZHRoKSlcclxuICAgIH1cclxuICAgIGNvbnN0IG9uVXAgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSlcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApXHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcClcclxuICB9XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsZXQgZGlzcG9zZWQgPSBmYWxzZVxyXG4gICAgbGV0IGdlbmVyYXRpb24gPSAwXHJcbiAgICBjb25zdCBsb2FkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgICBjb25zdCByZXF1ZXN0ID0gKytnZW5lcmF0aW9uXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvc3RhdGU/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSwgeyBoZWFkZXJzOiB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0gfSlcclxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YClcclxuICAgICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgaWYgKCFkaXNwb3NlZCAmJiByZXF1ZXN0ID09PSBnZW5lcmF0aW9uKSB7XHJcbiAgICAgICAgICBzZXRTdGF0ZShkYXRhIGFzIFdvcmtzcGFjZVN0YXRlKVxyXG4gICAgICAgICAgc2V0TG9hZEVycm9yKG51bGwpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xyXG4gICAgICAgIGlmICghZGlzcG9zZWQgJiYgcmVxdWVzdCA9PT0gZ2VuZXJhdGlvbikgc2V0TG9hZEVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdm9pZCBsb2FkKClcclxuICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB2b2lkIGxvYWQoKSB9LCA0MDAwKVxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgZGlzcG9zZWQgPSB0cnVlXHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXHJcbiAgICB9XHJcbiAgfSwgW3Byb3BzLnNlc3Npb25JZF0pXHJcblxyXG4gIC8vIFx1OEZEQlx1NTE2NVx1NjNEMFx1NEVBNC9cdTdCMTRcdThCQjAvUmV2aWV3IFx1OTg3NVx1N0I3RVx1NjVGNlx1NjMwOVx1OTcwMFx1NjJDOVx1NTNENlx1RkYwOFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1NEY5RFx1OEQ1Nlx1NEYxQVx1OEJERFx1NURFNVx1NEY1Q1x1NTMzQVx1RkYwQ1x1OEY2RVx1OEJFMlx1NjVFMFx1NjEwRlx1NEU0OVx1RkYwOVx1MzAwMlxyXG4gIC8vIFx1NjNEMFx1NEVBNFx1OTg3NVx1NEU1Rlx1NjJDOVx1N0IxNFx1OEJCMFx1RkYxQVx1OEY2RVx1NkIyMVx1NjcyQVx1NkQ4OFx1NTMxNlx1NjgwN1x1OEJCMFx1OTcwMFx1ODk4MVx1MzAwQ1x1NEUwQVx1NkIyMSBBSSBcdTYwM0JcdTdFRDNcdTY1RjZcdTk1RjRcdTMwMERcdTMwMDJcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHRhYiA9PT0gJ2NvbW1pdHMnKSB7IHZvaWQgbG9hZENvbW1pdHMoKTsgdm9pZCBsb2FkTm90ZXMoKSB9XHJcbiAgICBpZiAodGFiID09PSAnbm90ZXMnKSB7IHZvaWQgbG9hZE5vdGVzKCk7IHZvaWQgbG9hZE1lbW9yaWVzKCk7IGlmIChjb21taXRzRGF0YSA9PT0gbnVsbCkgdm9pZCBsb2FkQ29tbWl0cygpIH1cclxuICAgIGlmICh0YWIgPT09ICdyZXZpZXcnKSB2b2lkIGxvYWRJc3N1ZXMoKVxyXG4gICAgaWYgKHRhYiA9PT0gJ2V4ZWN1dGlvbicpIHsgdm9pZCBsb2FkU2NoZWR1bGVkKCk7IGlmIChydW5EZXRhaWwgIT09IG51bGwpIHZvaWQgbG9hZFJ1bkRldGFpbChydW5EZXRhaWwucnVuLmlkKSB9XHJcbiAgICBpZiAodGFiID09PSAnc2V0dGluZ3MnICYmIG1vZGVsVGllcnMgPT09IG51bGwpIHZvaWQgbG9hZE1vZGVsQ29uZmlnKClcclxuICB9LCBbdGFiLCBwcm9wcy5zZXNzaW9uSWRdKVxyXG5cclxuICBjb25zdCBsb2FkTW9kZWxDb25maWcgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9tb2RlbC1jb25maWcnKVxyXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSByZXR1cm5cclxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICBzZXRNb2RlbFRpZXJzKChkYXRhIGFzIHsgdGllcnM6IFJlY29yZDxzdHJpbmcsIHsgcHJvdmlkZXI6IHN0cmluZzsgbW9kZWw6IHN0cmluZyB9PiB9KS50aWVycyA/PyB7fSlcclxuICAgICAgc2V0TW9kZWxPcHRpb25zKChkYXRhIGFzIHsgb3B0aW9uczogQXJyYXk8eyBwcm92aWRlcjogc3RyaW5nOyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfT4gfSkub3B0aW9ucyA/PyBbXSlcclxuICAgICAgY29uc3QgY29uY3VycmVuY3kgPSAoZGF0YSBhcyB7IGZpeENvbmN1cnJlbmN5PzogbnVtYmVyIH0pLmZpeENvbmN1cnJlbmN5XHJcbiAgICAgIGlmICh0eXBlb2YgY29uY3VycmVuY3kgPT09ICdudW1iZXInKSBzZXRGaXhDb25jdXJyZW5jeShTdHJpbmcoY29uY3VycmVuY3kpKVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIFx1NkEyMVx1NTc4Qlx1OTE0RFx1N0Y2RVx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2MlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3Qgc2F2ZU1vZGVsQ29uZmlnID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgaWYgKG1vZGVsVGllcnMgPT09IG51bGwpIHJldHVyblxyXG4gICAgc2V0TW9kZWxTYXZpbmcodHJ1ZSlcclxuICAgIHNldE1vZGVsU2F2ZWQoZmFsc2UpXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjb25jdXJyZW5jeSA9IE51bWJlcihmaXhDb25jdXJyZW5jeSlcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbW9kZWwtY29uZmlnJywge1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdGllcnM6IG1vZGVsVGllcnMsIC4uLihOdW1iZXIuaXNGaW5pdGUoY29uY3VycmVuY3kpID8geyBmaXhDb25jdXJyZW5jeTogTWF0aC5tYXgoMSwgTWF0aC5taW4oMTAsIE1hdGgudHJ1bmMoY29uY3VycmVuY3kpKSkgfSA6IHt9KSB9KSxcclxuICAgICAgfSlcclxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgc2V0TW9kZWxTYXZlZCh0cnVlKVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBzZXRNb2RlbFNhdmVkKGZhbHNlKSB9LCAyNTAwKVxyXG4gICAgICB9XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRNb2RlbFNhdmluZyhmYWxzZSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHJlZnJlc2hTdGF0ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGNvbnN0IHJlZnJlc2hlZCA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9zdGF0ZT9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpLCB7IGhlYWRlcnM6IHsgYWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicgfSB9KVxyXG4gICAgaWYgKHJlZnJlc2hlZC5vaykgc2V0U3RhdGUoYXdhaXQgcmVmcmVzaGVkLmpzb24oKSBhcyBXb3Jrc3BhY2VTdGF0ZSlcclxuICB9XHJcblxyXG4gIC8qKiBcdTdFREZcdTRFMDBcdTUyQThcdTRGNUNcdTYyNjdcdTg4NENcdTU2NjhcdUZGMUFQT1NUIFx1NUJCRlx1NEUzQiBBUElcdUZGMDhcdTY0M0FcdTVFMjZcdTRGMUFcdThCREQgaWQgXHU0RjlCXHU2NzBEXHU1MkExXHU3QUVGXHU1QjlBXHU0RjREXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1MzNBXHVGRjA5XHVGRjBDXHU4RjkzXHU1MUZBXHU4RkRCXHU3RUQzXHU2NzlDXHU5NzYyXHU2NzdGXHVGRjBDXHU1QjhDXHU2MjEwXHU1NDBFXHU1MjM3XHU2NUIwXHU3MkI2XHU2MDAxXHUzMDAyICovXHJcbiAgY29uc3QgcnVuQWN0aW9uID0gYXN5bmMgKG5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgc2V0QnVzeShuYW1lKVxyXG4gICAgc2V0QWN0aW9uUmVzdWx0KG51bGwpXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KHBhdGgsIGJvZHkpXHJcbiAgICAgIGlmICghb2spIHtcclxuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoYFx1MjcxNyAke1N0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpfWApXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgc2V0QWN0aW9uUmVzdWx0KGZvcm1hdEFjdGlvblJlc3VsdChkYXRhKSlcclxuICAgICAgYXdhaXQgcmVmcmVzaFN0YXRlKClcclxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XHJcbiAgICAgIHNldEFjdGlvblJlc3VsdChgXHUyNzE3ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWApXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRCdXN5KG51bGwpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBydW5Cb290c3RyYXAgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBzZXRCb290c3RyYXBwaW5nKHRydWUpXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ib290c3RyYXAnLCB7fSlcclxuICAgICAgaWYgKCFvaykge1xyXG4gICAgICAgIHNldExvYWRFcnJvcihTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxyXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcclxuICAgICAgc2V0TG9hZEVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldEJvb3RzdHJhcHBpbmcoZmFsc2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb25maXJtTWVtb3J5ID0gYXN5bmMgKG1lbW9yeUlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeS9jb25maXJtJywgeyBtZW1vcnlJZCB9KVxyXG4gICAgaWYgKG9rKSB7XHJcbiAgICAgIHNldFN0YXRlKChwcmV2aW91cykgPT4gcHJldmlvdXMgPT09IG51bGwgPyBwcmV2aW91cyA6IHtcclxuICAgICAgICAuLi5wcmV2aW91cyxcclxuICAgICAgICBtZW1vcmllczogcHJldmlvdXMubWVtb3JpZXM/Lm1hcCgobWVtb3J5KSA9PiBtZW1vcnkuaWQgPT09IG1lbW9yeUlkID8geyAuLi5tZW1vcnksIGlzSHVtYW5Db25maXJtZWQ6IHRydWUsIHRydXRoTGV2ZWw6ICdmYWN0JyB9IDogbWVtb3J5KSxcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHByb2plY3QgPSBzdGF0ZT8ucHJvamVjdCA/PyBudWxsXHJcbiAgY29uc3QgYm9vdHN0cmFwID0gc3RhdGU/LmJvb3RzdHJhcCA/PyBudWxsXHJcbiAgY29uc3QgY2hhbmdlcyA9IHN0YXRlPy5jaGFuZ2VzID8/IFtdXHJcbiAgY29uc3QgcnVucyA9IHN0YXRlPy5ydW5zID8/IFtdXHJcbiAgY29uc3QgdmVyaWZpY2F0aW9ucyA9IHN0YXRlPy52ZXJpZmljYXRpb25zID8/IFtdXHJcbiAgY29uc3QgY29uZmlybWVkID0gc3RhdGU/LmNvbmZpcm1lZCA/PyBbXVxyXG4gIGNvbnN0IGNvbmNlcHRzID0gc3RhdGU/LmNvbmNlcHRzID8/IFtdXHJcblxyXG4gIGNvbnN0IHRhYnM6IEFycmF5PHsga2V5OiBUYWJLZXk7IGxhYmVsOiBzdHJpbmcgfT4gPSBbXHJcbiAgICB7IGtleTogJ2NvbW1pdHMnLCBsYWJlbDogdCgndGFiLmNvbW1pdHMnKSB9LFxyXG4gICAgeyBrZXk6ICdvdmVydmlldycsIGxhYmVsOiB0KCd0YWIub3ZlcnZpZXcnKSB9LFxyXG4gICAgeyBrZXk6ICdleGVjdXRpb24nLCBsYWJlbDogdCgndGFiLmV4ZWN1dGlvbicpIH0sXHJcbiAgICB7IGtleTogJ3JldmlldycsIGxhYmVsOiB0KCd0YWIucmV2aWV3JykgfSxcclxuICAgIHsga2V5OiAnbm90ZXMnLCBsYWJlbDogdCgndGFiLm5vdGVzJykgfSxcclxuICAgIHsga2V5OiAnc2V0dGluZ3MnLCBsYWJlbDogdCgndGFiLnNldHRpbmdzJykgfSxcclxuICBdXHJcblxyXG4gIC8qKiBcdTY0Q0RcdTRGNUNcdTdFRDNcdTY3OUNcdTk3NjJcdTY3N0ZcdUZGMDhcdTYwM0JcdTg5QzhcdTk4NzVcdTdCN0VcdTc2ODRcdTVGRUJcdTYzNzdcdTUyQThcdTRGNUNcdTUxNzFcdTc1MjhcdUZGMDlcdTMwMDIgKi9cclxuICBjb25zdCByZXN1bHRQYW5lbCA9IGFjdGlvblJlc3VsdCAhPT0gbnVsbFxyXG4gICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KENhcmQsIHsgdGl0bGU6IHQoJ3Jlc3VsdC5wYW5lbCcpIH0sXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLnJlc3VsdCB9LCBhY3Rpb25SZXN1bHQpKVxyXG4gICAgOiBudWxsXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcclxuICAvLyBcdTk4NzZcdTkwRThcdUZGMUFcdTRFRDNcdTVFOTNcdTY4MEYgKyBcdTYzRDBcdTRFQTRcdTU5MUFcdTkwMDlcdTRFMEJcdTYyQzlcdUZGMDhcdTdFQTYgMS81IFx1OUFEOFx1NUVBNlx1RkYwOVx1RkYxQlx1NEUwQlx1NjVCOVx1Njc3Rlx1NTc1N1x1NTM2MFx1NTE2OFx1NUJCRFx1MzAwMlxyXG4gIGNvbnN0IGFsbFRhcmdldHM6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IG1ldGE6IHN0cmluZzsgc2hhOiBzdHJpbmcgfT4gPSBbXVxyXG4gIGlmIChjb21taXRzRGF0YSAhPT0gbnVsbCkge1xyXG4gICAgaWYgKCFjb21taXRzRGF0YS53b3JraW5nLmlzQ2xlYW4pIHtcclxuICAgICAgYWxsVGFyZ2V0cy5wdXNoKHtcclxuICAgICAgICBrZXk6ICd3b3JraW5nJyxcclxuICAgICAgICBsYWJlbDogYFx1MjVDRiAke3QoJ3JlcG8ud29ya2luZycpfVx1RkYwOCR7Y29tbWl0c0RhdGEud29ya2luZy5maWxlQ291bnR9XHVGRjA5YCxcclxuICAgICAgICBtZXRhOiBjb21taXRzRGF0YS53b3JraW5nLmZpbGVzLnNsaWNlKDAsIDMpLm1hcCgoZmlsZSkgPT4gZmlsZS5wYXRoLnNwbGl0KCcvJykucG9wKCkpLmpvaW4oJywgJyksXHJcbiAgICAgICAgc2hhOiAnd29ya2luZycsXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IGNvbW1pdCBvZiBjb21taXRzRGF0YS5jb21taXRzKSB7XHJcbiAgICAgIGNvbnN0IGFkZHMgPSBjb21taXQuZmlsZXMucmVkdWNlKChzdW0sIGZpbGUpID0+IHN1bSArIGZpbGUuYWRkcywgMClcclxuICAgICAgY29uc3QgZGVscyA9IGNvbW1pdC5maWxlcy5yZWR1Y2UoKHN1bSwgZmlsZSkgPT4gc3VtICsgZmlsZS5kZWxzLCAwKVxyXG4gICAgICBhbGxUYXJnZXRzLnB1c2goe1xyXG4gICAgICAgIGtleTogY29tbWl0LnNoYSxcclxuICAgICAgICBsYWJlbDogY29tbWl0LnN1YmplY3QsXHJcbiAgICAgICAgbWV0YTogYCR7Y29tbWl0LnNob3J0SGFzaH0gXHUwMEI3ICR7Y29tbWl0LmF1dGhvcn0gXHUwMEI3ICR7bmV3IERhdGUoY29tbWl0LmRhdGUpLnRvTG9jYWxlU3RyaW5nKCl9IFx1MDBCNyArJHthZGRzfS8tJHtkZWxzfWAsXHJcbiAgICAgICAgc2hhOiBjb21taXQuc2hhLFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuICBjb25zdCBzaG9ydExhYmVsID0gKHNoYTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgIGlmIChzaGEgPT09ICd3b3JraW5nJykgcmV0dXJuIHQoJ3JlcG8ud29ya2luZycpXHJcbiAgICBjb25zdCB0YXJnZXQgPSBhbGxUYXJnZXRzLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5zaGEgPT09IHNoYSlcclxuICAgIHJldHVybiBgJHsodGFyZ2V0Py5tZXRhLnNwbGl0KCcgXHUwMEI3ICcpWzBdKSA/PyBzaGEuc2xpY2UoMCwgNyl9ICR7dGFyZ2V0Py5sYWJlbCA/PyAnJ31gLnRyaW0oKVxyXG4gIH1cclxuICBjb25zdCBmaWx0ZXJlZFRhcmdldHMgPSBwaWNrZXJGaWx0ZXIudHJpbSgpID09PSAnJ1xyXG4gICAgPyBhbGxUYXJnZXRzXHJcbiAgICA6IGFsbFRhcmdldHMuZmlsdGVyKChlbnRyeSkgPT4gKGVudHJ5LmxhYmVsICsgZW50cnkubWV0YSkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhwaWNrZXJGaWx0ZXIudHJpbSgpLnRvTG93ZXJDYXNlKCkpKVxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgXHU4RjZFXHU2QjIxXHU4MDVBXHU3QzdCXHU0RTBFXHU2NzJBXHU2RDg4XHU1MzE2XHU2ODA3XHU4QkIwIFx1MjUwMFx1MjUwMCBcdTgwNUFcdTdDN0JcdTg5QzRcdTUyMTlcdTRFMEVcdTY3MERcdTUyQTFcdTdBRUYgY2x1c3RlckNvbW1pdHMgXHU0RTAwXHU4MUY0XHVGRjA4XHU2NUY2XHU5NUY0XHU3QTk3XHU1M0UzICtcclxuICAvLyBcdTY1ODdcdTRFRjZcdTk2RjZcdTkxQ0RcdTUzRTBcdUZGMENcdTg5QzEgY29tbWl0LXJvdW5kcy50c1x1RkYwOVx1RkYxQlx1NjcyQVx1NkQ4OFx1NTMxNiA9IFx1NEUwQVx1NkIyMSBBSSBcdTYwM0JcdTdFRDNcdTRFNEJcdTU0MEVcdTc2ODRcdTYzRDBcdTRFQTRcdTMwMDJcclxuICBjb25zdCBjb21taXRCeVNoYSA9IG5ldyBNYXAoKGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKS5tYXAoKGNvbW1pdCkgPT4gW2NvbW1pdC5zaGEsIGNvbW1pdF0pKVxyXG4gIGNvbnN0IGxhc3RTdW1tYXJ5QXQgPSBub3Rlc1xyXG4gICAgLmZpbHRlcigobm90ZSkgPT4gbm90ZS5zaGEgPT09ICdzdW1tYXJ5JylcclxuICAgIC5zb3J0KChsZWZ0LCByaWdodCkgPT4gcmlnaHQuY3JlYXRlZEF0IC0gbGVmdC5jcmVhdGVkQXQpWzBdPy5jcmVhdGVkQXRcclxuICBjb25zdCBpc1VuZGlnZXN0ZWQgPSAoY29tbWl0OiB7IHNoYTogc3RyaW5nOyBkYXRlOiBudW1iZXIgfSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgaWYgKGNvbW1pdC5zaGEgPT09ICd3b3JraW5nJykgcmV0dXJuIGZhbHNlXHJcbiAgICAvLyBcdTVERjJcdTc1MUZcdTYyMTBcdThGQzcgQUkgXHU4OUUzXHU4QkZCXHVGRjA4YW5hbHl6ZWQgXHU2ODA3XHU4QkIwXHVGRjA5XHU1MzczXHU4OUM2XHU0RTNBXHU1REYyXHU2RDg4XHU1MzE2XHVGRjFCXHU1NDI2XHU1MjE5XHU2NUIwXHU0RThFXHU0RTBBXHU2QjIxXHU2MDNCXHU3RUQzXHU3Njg0XHU5MEZEXHU3Qjk3XHU2NzJBXHU2RDg4XHU1MzE2XHUzMDAyXHJcbiAgICBpZiAoY29tbWl0QnlTaGEuZ2V0KGNvbW1pdC5zaGEpPy5hbmFseXplZCA9PT0gdHJ1ZSkgcmV0dXJuIGZhbHNlXHJcbiAgICByZXR1cm4gbGFzdFN1bW1hcnlBdCA9PT0gdW5kZWZpbmVkIHx8IGNvbW1pdC5kYXRlID4gbGFzdFN1bW1hcnlBdFxyXG4gIH1cclxuICBjb25zdCB1bmRpZ2VzdGVkQ291bnQgPSAoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLmZpbHRlcigoY29tbWl0KSA9PiBpc1VuZGlnZXN0ZWQoY29tbWl0KSkubGVuZ3RoXHJcbiAgY29uc3QgY29tbWl0Um91bmRzID0gY2x1c3RlckludG9Sb3VuZHMoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pXHJcblxyXG4gIC8qKiBcdTRFMEJcdTYyQzlcdTY4NDZcdTc2ODRcdTYzRDBcdTRFQTRcdTg4NENcdUZGMDhcdTU0MkJcdTY3MkFcdTZEODhcdTUzMTZcdTU3MDZcdTcwQjlcdUZGMUJ3b3JraW5nIFx1Njc2MVx1NzZFRVx1NEUwRFx1NjgwN1x1RkYwOVx1MzAwMiAqL1xyXG4gIGNvbnN0IHJlbmRlclBpY2tlclJvdyA9IChlbnRyeTogeyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgbWV0YTogc3RyaW5nOyBzaGE6IHN0cmluZyB9KTogUmVhY3QuUmVhY3ROb2RlID0+IHtcclxuICAgIGNvbnN0IGNvbW1pdCA9IGNvbW1pdEJ5U2hhLmdldChlbnRyeS5zaGEpXHJcbiAgICBjb25zdCB1bmRpZ2VzdGVkID0gY29tbWl0ICE9PSB1bmRlZmluZWQgJiYgaXNVbmRpZ2VzdGVkKGNvbW1pdClcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBrZXk9e2VudHJ5LmtleX1cclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgcGFkZGluZzogJzdweCAxMnB4JywgY3Vyc29yOiAncG9pbnRlcicsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoZW50cnkuc2hhKSA/ICdyZ2JhKDM3LDk5LDIzNSwwLjA3KScgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgIH19XHJcbiAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHRvZ2dsZVRhcmdldChlbnRyeS5zaGEpIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3BhbiBzdHlsZT17eyB3aWR0aDogJzE0cHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsIGZvbnRXZWlnaHQ6IDcwMCB9fT5cclxuICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoZW50cnkuc2hhKSA/ICdcdTI3MTMnIDogJyd9XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIHt1bmRpZ2VzdGVkICYmIChcclxuICAgICAgICAgIDxzcGFuIHRpdGxlPXt0KCdwaWNrZXIudW5kaWdlc3RlZCcpfSBzdHlsZT17eyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSwgZm9udFNpemU6ICcxMHB4JywgZmxleFNocmluazogMCB9fT5cdTI1Q0Y8L3NwYW4+XHJcbiAgICAgICAgKX1cclxuICAgICAgICA8c3BhbiBzdHlsZT17eyBtaW5XaWR0aDogMCB9fT5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCwgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19PntlbnRyeS5sYWJlbH08L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57ZW50cnkubWV0YX08L3NwYW4+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcblxyXG4gIGNvbnN0IGltcGFjdFJpc2tDb2xvciA9IHRoZW1lQXdhcmVUZXh0KGltcGFjdCA9PT0gbnVsbCA/ICcjNTc2MDZhJyA6IChSSVNLX0NPTE9SW2ltcGFjdC5yaXNrTGV2ZWxdID8/ICcjNTc2MDZhJykpXHJcblxyXG4gIGNvbnN0IGNvbW1pdHNUYWIgPSAoXHJcbiAgICA8PlxyXG4gICAgICB7LyogXHU0RUQzXHU1RTkzXHU2ODBGICovfVxyXG4gICAgICA8Q2FyZD5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9Pntjb21taXRzRGF0YT8uYnJhbmNoID8/ICdcdTIwMTQnfTwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcgfX0+e2NvbW1pdHNEYXRhPy5yb290UGF0aCA/PyBwcm9qZWN0Py5yb290UGF0aCA/PyAnXHUyMDE0J308L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XHJcbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZENvbW1pdHMoKSB9fT57dCgnYWN0aW9uLnJlZnJlc2gnKX08L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtidXN5ICE9PSBudWxsfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdzY2FuSGlzdG9yeScsICcvcHJvamVjdC1jb250cm9sL2FwaS9ib290c3RyYXAnLCB7IGluY2x1ZGVIaXN0b3J5OiB0cnVlLCBzdW1tYXJpemU6IHRydWUsIG1heENvbW1pdHM6IDMwIH0pIH19XHJcbiAgICAgICAgICA+e2J1c3kgPT09ICdzY2FuSGlzdG9yeScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgncmVwby5zY2FuSGlzdG9yeScpfTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L0NhcmQ+XHJcbiAgICAgIHsvKiBcdTYzRDBcdTRFQTRcdTU5MUFcdTkwMDlcdTRFMEJcdTYyQzlcdUZGMDhcdTdEMjdcdTUxRDFcdUZGMUJcdTkwMDlcdTRFMkRcdTUxODVcdTVCQjlcdTVCOENcdTY1NzRcdTVDNTVcdTc5M0FcdUZGMENcdTUxNDFcdThCQjhcdTgxRUFcdTcxMzZcdTYzNjJcdTg4NENcdUZGMDkgKi99XHJcbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdwaWNrZXIudGl0bGUnKX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgd2lkdGg6ICcxMDAlJywgdGV4dEFsaWduOiAnbGVmdCcsIGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCB3aGl0ZVNwYWNlOiAnbm9ybWFsJyB9fVxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldFBpY2tlck9wZW4oIXBpY2tlck9wZW4pIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1pbldpZHRoOiAwIH19PlxyXG4gICAgICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwXHJcbiAgICAgICAgICAgICAgICA/IHQoJ3BpY2tlci5wbGFjZWhvbGRlcicpXHJcbiAgICAgICAgICAgICAgICA6IGAke3QoJ3BpY2tlci5zZWxlY3RlZCcpfSAke3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGh9XHVGRjFBJHtzZWxlY3RlZFRhcmdldHMubWFwKHNob3J0TGFiZWwpLmpvaW4oJ1x1RkYxQicpfWB9XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWFyZ2luTGVmdDogJzhweCcsIGZsZXhTaHJpbms6IDAgfX0+XHUyNUJFPC9zcGFuPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICB7cGlja2VyT3BlbiAmJiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIHpJbmRleDogMjkgfX0gb25DbGljaz17KCkgPT4geyBzZXRQaWNrZXJPcGVuKGZhbHNlKSB9fSAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICdjYWxjKDEwMCUgKyA0cHgpJywgbGVmdDogMCwgcmlnaHQ6IDAsIHpJbmRleDogMzAsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsIGJveFNoYWRvdzogJzAgOHB4IDI0cHggcmdiYSgwLDAsMCwwLjEyKScsIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzhweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5pbnB1dH1cclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dCgncGlja2VyLmZpbHRlcicpfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwaWNrZXJGaWx0ZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBpY2tlckZpbHRlcihlLnRhcmdldC52YWx1ZSkgfX1cclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgeyhjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSkuc29tZSgoY29tbWl0KSA9PiBpc1VuZGlnZXN0ZWQoY29tbWl0KSkgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3BpY2tlci51bmRpZ2VzdGVkJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNlbGVjdENvbW1pdHMoKGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKS5maWx0ZXIoKGNvbW1pdCkgPT4gaXNVbmRpZ2VzdGVkKGNvbW1pdCkpLm1hcCgoY29tbWl0KSA9PiBjb21taXQuc2hhKSkgfX1cclxuICAgICAgICAgICAgICAgICAgICA+XHUyNUNGIHt0KCdwaWNrZXIuc2VsZWN0QWxsVW5kaWdlc3RlZCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHNldFNlbGVjdGVkVGFyZ2V0cyhbXSkgfX0+e3QoJ3BpY2tlci5jbGVhcicpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1heEhlaWdodDogNDIwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgICAge3BpY2tlckZpbHRlci50cmltKCkgPT09ICcnID8gKFxyXG4gICAgICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBcdTZENEZcdTg5QzhcdTg5QzZcdTU2RkVcdUZGMUF3b3JraW5nIFx1Njc2MVx1NzZFRSArIFx1NjMwOVx1OEY2RVx1NkIyMVx1NTIwNlx1N0VDNFx1NzY4NFx1NjNEMFx1NEVBNFx1RkYwOFx1NTM1NVx1NjNEMFx1NEVBNFx1OEY2RVx1NEUwRFx1NjYzRVx1NzkzQVx1N0VDNFx1NTkzNFx1RkYwQ1x1OTA3Rlx1NTE0RFx1NTY2QVx1OTdGM1x1RkYwOVx1MzAwMlxyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZXM6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtpbmcgPSBhbGxUYXJnZXRzLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5zaGEgPT09ICd3b3JraW5nJylcclxuICAgICAgICAgICAgICAgICAgICAgIGlmICh3b3JraW5nICE9PSB1bmRlZmluZWQpIG5vZGVzLnB1c2gocmVuZGVyUGlja2VyUm93KHdvcmtpbmcpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnlTaGEgPSBuZXcgTWFwKGFsbFRhcmdldHMuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuc2hhICE9PSAnd29ya2luZycpLm1hcCgoZW50cnkpID0+IFtlbnRyeS5zaGEsIGVudHJ5XSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb21taXRSb3VuZHMuZm9yRWFjaCgocm91bmQsIHJvdW5kSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW50cmllcyA9IHJvdW5kLmNvbW1pdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChjb21taXQpID0+IGJ5U2hhLmdldChjb21taXQuc2hhKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IG1ldGE6IHN0cmluZzsgc2hhOiBzdHJpbmcgfSA9PiBlbnRyeSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cmllcy5sZW5ndGggPT09IDApIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cmllcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKHJlbmRlclBpY2tlclJvdyhlbnRyaWVzWzBdISkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hhcyA9IGVudHJpZXMubWFwKChlbnRyeSkgPT4gZW50cnkuc2hhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGxTZWxlY3RlZCA9IHNoYXMuZXZlcnkoKHNoYSkgPT4gc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHNoYSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2Byb3VuZC0ke3JvdW5kSW5kZXh9YH0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnOHB4JywgcGFkZGluZzogJzZweCAxMnB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwzLCByZ2JhKDUsNSw1LDAuMDYpKScsIGZvbnRTaXplOiAnMTFweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx1RDgzRFx1REREMyB7dChyb3VuZEluZGV4ID09PSAwID8gJ3BpY2tlci5yb3VuZExhdGVzdCcgOiAncGlja2VyLnJvdW5kJykucmVwbGFjZSgne259JywgU3RyaW5nKHJvdW5kSW5kZXggKyAxKSl9IFx1MDBCNyB7U3RyaW5nKGVudHJpZXMubGVuZ3RoKX0ge3QoJ3JlcG8uY29tbWl0cycpfSBcdTAwQjcge25ldyBEYXRlKHJvdW5kLmZpcnN0QXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpfVx1MjAxM3tuZXcgRGF0ZShyb3VuZC5sYXN0QXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTBweCcgfX0gb25DbGljaz17KCkgPT4geyBzZWxlY3RSb3VuZChzaGFzKSB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2FsbFNlbGVjdGVkID8gdCgncGlja2VyLnJvdW5kQ2xlYXInKSA6IHQoJ3BpY2tlci5yb3VuZFNlbGVjdCcpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykgbm9kZXMucHVzaChyZW5kZXJQaWNrZXJSb3coZW50cnkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2Rlc1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKClcclxuICAgICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZFRhcmdldHMubWFwKChlbnRyeSkgPT4gcmVuZGVyUGlja2VyUm93KGVudHJ5KSlcclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgeyhwaWNrZXJGaWx0ZXIudHJpbSgpID09PSAnJyA/IGFsbFRhcmdldHMgOiBmaWx0ZXJlZFRhcmdldHMpLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdwaWNrZXIubm9NYXRjaCcpfTwvZGl2Pn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpblRvcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ3BpY2tlci5oaW50Jyl9PC9zcGFuPlxyXG4gICAgICAgICAge3VuZGlnZXN0ZWRDb3VudCA+IDAgJiYgKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxzcGFuIHRpdGxlPXt0KCdwaWNrZXIudW5kaWdlc3RlZCcpfSBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSB9fT5cclxuICAgICAgICAgICAgICAgIFx1MjVDRiB7dCgncGlja2VyLnVuZGlnZXN0ZWRDb3VudCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyh1bmRpZ2VzdGVkQ291bnQpKX1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gdGl0bGU9e3QoJ3BpY2tlci5kaWdlc3RBbGxIaW50Jyl9IG9uQ2xpY2s9e2RpZ2VzdEFsbH0+XHUyNkExIHt0KCdwaWNrZXIuZGlnZXN0QWxsJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIHsoZGV0YWlsUXVldWVkQ291bnQgPiAwIHx8IGRldGFpbFJ1bm5pbmdDb3VudCA+IDApICYmIChcclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnI2RjZGNhYScpfT5cclxuICAgICAgICAgICAgICB7ZGV0YWlsUnVubmluZ0NvdW50ID4gMCA/IHQoJ2RldGFpbC5haUxvYWRpbmcnKSA6ICcnfVxyXG4gICAgICAgICAgICAgIHtkZXRhaWxSdW5uaW5nQ291bnQgPiAwICYmIGRldGFpbFF1ZXVlZENvdW50ID4gMCA/ICcgJyA6ICcnfVxyXG4gICAgICAgICAgICAgIHtkZXRhaWxRdWV1ZWRDb3VudCA+IDAgPyAnXHUyM0YzICcgKyB0KCdkZXRhaWwucXVldWVkJykucmVwbGFjZSgne259JywgU3RyaW5nKGRldGFpbFF1ZXVlZENvdW50KSkgOiAnJ31cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9DYXJkPlxyXG5cclxuICAgICAge2NvbW1pdHNFcnJvciAhPT0gbnVsbCAmJiA8Q2FyZD48ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXBvLmxvYWRGYWlsZWQnKX06IHtjb21taXRzRXJyb3J9PC9kaXY+PC9DYXJkPn1cclxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDAgJiYgPENhcmQ+PGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZGV0YWlsLnBpY2snKX08L2Rpdj48L0NhcmQ+fVxyXG5cclxuICAgICAgey8qIFx1NURFNVx1NEY1Q1x1OEY2RVx1NkIyMVx1NTNEOVx1NEU4Qlx1RkYxQVx1NTkxQVx1NjNEMFx1NEVBNFx1NjU3NFx1NEY1M1x1ODlFM1x1OEJGQiAqL31cclxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5maWx0ZXIoKHRhcmdldCkgPT4gdGFyZ2V0ICE9PSAnd29ya2luZycpLmxlbmd0aCA+PSAyICYmIChcclxuICAgICAgICA8Q2FyZCB0aXRsZT17J1x1RDgzRFx1RENENiAnICsgdCgnbmFycmF0aXZlLnRpdGxlJyl9PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206IG5hcnJhdGl2ZSA9PT0gbnVsbCA/ICcwJyA6ICc4cHgnIH19PlxyXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17bmFycmF0aXZlQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWROYXJyYXRpdmUoKSB9fT5cclxuICAgICAgICAgICAgICB7bmFycmF0aXZlQnVzeSA/IHQoJ25hcnJhdGl2ZS5ydW5uaW5nJykgOiAnXHUyNzI4ICcgKyB0KCduYXJyYXRpdmUuZ2VuZXJhdGUnKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgbmFycmF0aXZlLmNhY2hlZCAmJiAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ2NhY2hlLmhpdCcpfXtuYXJyYXRpdmUuZ2VuZXJhdGVkQXQgIT09IHVuZGVmaW5lZCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShuYXJyYXRpdmUuZ2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ308L3NwYW4+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgcmVuZGVyQ29zdEJhZGdlKG5hcnJhdGl2ZS5jb3N0VXNkLCB0KCdjb3N0LnRvb2x0aXAnKSl9XHJcbiAgICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgKFxyXG4gICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17bmFycmF0aXZlQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWROYXJyYXRpdmUodHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAge25hcnJhdGl2ZUVycm9yICE9PSAnJyAmJiA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5lbXB0eSwgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDEyNDJmJykgfX0+e25hcnJhdGl2ZUVycm9yfTwvZGl2Pn1cclxuICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luVG9wOiAnNHB4JyB9fT57dCgnbmFycmF0aXZlLmRpZ2VzdEhpbnQnKX08L2Rpdj59XHJcbiAgICAgICAgICB7bmFycmF0aXZlICE9PSBudWxsICYmIChcclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyB9fT57cmVuZGVyU3RydWN0dXJlZENvbnRlbnQobmFycmF0aXZlLm5hcnJhdGl2ZSl9PC9kaXY+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvQ2FyZD5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIHsvKiBcdTZCQ0ZcdTY3NjFcdTkwMDlcdTRFMkRcdTYzRDBcdTRFQTRcdTc2ODQgQUkgXHU4OUUzXHU4QkZCICovfVxyXG4gICAgICB7KCgpID0+IHtcclxuICAgICAgICAvLyBcdTU5MzFcdThEMjVcdTY2M0VcdTc3M0NcdTY3NjFcdUZGMUFcdTY3MDlcdTg5RTNcdThCRkJcdTU5MzFcdThEMjVcdTY1RjZcdTk4NzZcdTkwRThcdTdFQTJcdTY3NjEgKyBcdTRFMDBcdTk1MkVcdTYyNzlcdTkxQ0ZcdTkxQ0RcdThCRDVcdUZGMDhcdTRFMUFcdTRFM0IgMjAyNi0xMS0wNFx1RkYwOVx1MzAwMlxyXG4gICAgICAgIGNvbnN0IGZhaWxlZENvdW50ID0gc2VsZWN0ZWRUYXJnZXRzLmZpbHRlcigodGFyZ2V0KSA9PiBpc0ZhaWxlZEFuYWx5c2lzKGRldGFpbHNbdGFyZ2V0XSkpLmxlbmd0aFxyXG4gICAgICAgIGlmIChmYWlsZWRDb3VudCA9PT0gMCkgcmV0dXJuIG51bGxcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBwYWRkaW5nOiAnOHB4IDEycHgnLCBtYXJnaW5Cb3R0b206ICcxMHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGJvcmRlcjogJzFweCBzb2xpZCAnICsgdGhlbWVBd2FyZVRleHQoJyNmMTRjNGMnKSwgYm9yZGVyUmFkaXVzOiAnNnB4JywgZm9udFNpemU6ICcxMnB4JyB9fT5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDEyNDJmJyksIGZvbnRXZWlnaHQ6IDYwMCB9fT5cdTI2QTAge1N0cmluZyhmYWlsZWRDb3VudCl9IFx1Njc2MVx1NjNEMFx1NEVBNFx1ODlFM1x1OEJGQlx1NTkzMVx1OEQyNTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxyXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIGZvbnRXZWlnaHQ6IDYwMCB9fSBvbkNsaWNrPXsoKSA9PiB7IHJldHJ5RmFpbGVkRGV0YWlscygpIH19Plx1RDgzRFx1REQwMSB7dCgnY2FjaGUucmVnZW5lcmF0ZScpfVx1NTE2OFx1OTBFOFx1NTkzMVx1OEQyNTwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgICB9KSgpfVxyXG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLm1hcCgodGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZCA9IGRldGFpbHNbdGFyZ2V0XVxyXG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IChkPy5jb21taXQ/Lm1lc3NhZ2UgPz8gdGFyZ2V0LnNsaWNlKDAsIDgpKVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8Q2FyZCBrZXk9e2BkLSR7dGFyZ2V0fWB9IHRpdGxlPXtgXHVEODNEXHVERDBEICR7bGFiZWx9JHt0YXJnZXQgIT09ICd3b3JraW5nJyA/IGBcdUZGMDgke3RhcmdldC5zbGljZSgwLCA4KX1cdUZGMDlgIDogJyd9YH0+XHJcbiAgICAgICAgICAgIHtkICE9PSB1bmRlZmluZWQgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgIHtpc0ZhaWxlZEFuYWx5c2lzKGQpICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UodGhlbWVBd2FyZVRleHQoJyNmMTRjNGMnKSl9Plx1MjZBMCBcdTg5RTNcdThCRkJcdTU5MzFcdThEMjU8L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAge2QuYW5hbHlzaXNDYWNoZWQgPT09IHRydWUgJiYgKFxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9Pnt0KCdjYWNoZS5oaXQnKX17ZC5hbmFseXNpc0dlbmVyYXRlZEF0ID8gJyBcdTAwQjcgJyArIG5ldyBEYXRlKGQuYW5hbHlzaXNHZW5lcmF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKSA6ICcnfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICB7cmVuZGVyQ29zdEJhZGdlKGQuYW5hbHlzaXNDb3N0VXNkLCB0KCdjb3N0LnRvb2x0aXAnKSArIChkLmFuYWx5c2lzVG9rZW5zID8gYFx1RkYwOGluICR7ZC5hbmFseXNpc1Rva2Vucy5pbnB1dH0gLyBvdXQgJHtkLmFuYWx5c2lzVG9rZW5zLm91dHB1dH0gdG9rZW5zXHVGRjA5YCA6ICcnKSl9XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IGxvYWREZXRhaWwodGFyZ2V0LCB0cnVlKSB9fT57dCgnY2FjaGUucmVnZW5lcmF0ZScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ2RldGFpbC5zYXZlTm90ZUhpbnQnKX1cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoYSA9IHRhcmdldCA9PT0gJ3dvcmtpbmcnID8gJ3dvcmtpbmcnIDogdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3RlcycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBgJHt0KCdkZXRhaWwuc2F2ZU5vdGVUaXRsZScpfVx1RkYxQSR7KGQuY29tbWl0Py5tZXNzYWdlID8/IHRhcmdldCkuc2xpY2UoMCwgNjApfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBbYFx1MzAxMFx1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OFx1MzAxMVxcbiR7ZC5hbmFseXNpcy53aGF0fWAsIGBcdTMwMTBcdTVCOUVcdTczQjBcdTkwM0JcdThGOTFcdTMwMTFcXG4keyhkLmFuYWx5c2lzLmxvZ2ljID8/IFtdKS5qb2luKCdcdUZGMUInKX1gLCBgXHUzMDEwXHU5OENFXHU5NjY5XHU3MEI5XHUzMDExXFxuJHsoZC5hbmFseXNpcy5yaXNrcyA/PyBbXSkuam9pbignXHVGRjFCJyl9YF0uZmlsdGVyKChibG9jaykgPT4gIWJsb2NrLmVuZHNXaXRoKCdcdTMwMTFcXG4nKSkuam9pbignXFxuXFxuJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICBzaGEsIHRhZ3M6ICdcdTY4MzhcdTY3RTUnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHsgb2sgfSkgPT4geyBzZXRBY3Rpb25SZXN1bHQob2sgPyAnXHUyNzEzIFx1NURGMlx1NUI1OFx1NEUzQVx1N0IxNFx1OEJCMFx1RkYwOFx1N0IxNFx1OEJCMFx1OTg3NVx1NTNFRlx1NjdFNVx1NzcwQlx1RkYwOScgOiAnXHUyNzE3IFx1NEZERFx1NUI1OFx1NTkzMVx1OEQyNScpIDsgaWYgKG9rKSB2b2lkIGxvYWROb3RlcygpIH0pXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHVEODNEXHVEQ0JFIHt0KCdkZXRhaWwuc2F2ZU5vdGUnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdkZXRhaWwuc2F2ZU1lbW9yeUhpbnQnKX1cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoYSA9IHRhcmdldCA9PT0gJ3dvcmtpbmcnID8gdW5kZWZpbmVkIDogdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnknLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBtZW1vcnlUeXBlOiAncmlza19ob3RzcG90Jywgc291cmNlVGFnOiAncmV2aWV3JywgYmFzaXNTaGE6IHNoYSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBgXHU2ODM4XHU2N0U1XHU3RUQzXHU4QkJBXHVGRjFBJHsoZC5jb21taXQ/Lm1lc3NhZ2UgPz8gdGFyZ2V0KS5zbGljZSgwLCA2MCl9YCxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFtkLmFuYWx5c2lzLndoYXQsIChkLmFuYWx5c2lzLnJpc2tzID8/IFtdKS5qb2luKCdcdUZGMUInKV0uZmlsdGVyKChwYXJ0KSA9PiBwYXJ0ICE9PSAnJykuam9pbignXFxuLS0tXFxuJyksXHJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoeyBvayB9KSA9PiB7IHNldEFjdGlvblJlc3VsdChvayA/ICdcdTI3MTMgXHU1REYyXHU2Qzg5XHU2REMwXHU0RTNBXHU4QkIwXHU1RkM2XHVGRjA4XHU1Rjg1XHU3ODZFXHU4QkE0XHU5NjFGXHU1MjE3XHVGRjA5JyA6ICdcdTI3MTcgXHU0RkREXHU1QjU4XHU1OTMxXHU4RDI1Jyk7IGlmIChvaykgdm9pZCBsb2FkTWVtb3JpZXMoKSB9KVxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlx1RDgzRVx1RERFMCB7dCgnZGV0YWlsLnNhdmVNZW1vcnknKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAge2QgPT09IHVuZGVmaW5lZCA/IChcclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9PntkZXRhaWxTdGF0dXNbdGFyZ2V0XSA9PT0gJ3F1ZXVlZCcgPyAnXHUyM0YzICcgKyB0KCdkZXRhaWwuY2FyZFF1ZXVlZCcpIDogdCgnZGV0YWlsLmFpTG9hZGluZycpfTwvZGl2PlxyXG4gICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICB7ZC5jb21taXQgIT09IG51bGwgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmNvbW1pdE1ldGF9PntkLmNvbW1pdC5hdXRob3J9IFx1MDBCNyB7bmV3IERhdGUoZC5jb21taXQuZGF0ZSkudG9Mb2NhbGVTdHJpbmcoKX0gXHUwMEI3IHtkLmZpbGVzLmxlbmd0aH0ge3QoJ2RldGFpbC5maWxlcycpfSBcdTAwQjcgK3tkLmluc2VydGlvbnN9Ly17ZC5kZWxldGlvbnN9PC9kaXY+fVxyXG4gICAgICAgICAgICAgICAge2QuYW5hbHlzaXMud2hhdCAhPT0gJycgJiYgKFxyXG4gICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnOHB4JyB9fT57dCgnZGV0YWlsLndoYXQnKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCAuLi4oaXNGYWlsZWRBbmFseXNpcyhkKSA/IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDEyNDJmJyksIGZvbnRXZWlnaHQ6IDYwMCB9IDoge30pIH19PntkLmFuYWx5c2lzLndoYXR9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLmxvZ2ljLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zZWN0aW9uVGl0bGV9Pnt0KCdkZXRhaWwubG9naWMnKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5sb2dpYy5tYXAoKHN0ZXAsIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17c3R5bGVzLmxvZ2ljU3RlcH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJywgZm9udFdlaWdodDogNjAwIH19PntpICsgMX0uPC9zcGFuPntzdGVwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLnJpc2tzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnNnB4JyB9fT57dCgnZGV0YWlsLnJpc2snKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5yaXNrcy5tYXAoKHJpc2ssIGkpID0+IDxkaXYga2V5PXtpfSBzdHlsZT17eyAuLi5zdHlsZXMucmlza0l0ZW0sIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzlhNjcwMCcpIH19Plx1MjZBMCB7cmVuZGVyV2l0aFBlZWsocmlzayl9PC9kaXY+KX1cclxuICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgey8qIFx1NjU4N1x1NEVGNlx1NkUwNVx1NTM1NSArIFx1OTAxMFx1NjU4N1x1NEVGNlx1OUFEOFx1NEVBRVx1NUJGOVx1NkJENCAqL31cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnMTBweCcgfX0+e3QoJ2RldGFpbC5maWxlcycpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxyXG4gICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAge2QuZmlsZXMubWFwKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0YXJnZXR9fCR7ZmlsZS5wYXRofWBcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoID0gZmlsZURpZmZzW2tleV1cclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17a2V5fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19PntmaWxlLnBhdGh9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzFhN2YzNycpLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT4re2ZpbGUuYWRkc308L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2YyMjJlJyksIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19Pi17ZmlsZS5kZWxzfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRGaWxlRGlmZih0YXJnZXQsIGZpbGUucGF0aCkgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3BhdGNoID09PSB1bmRlZmluZWQgPyB0KCdkaWZmLnNob3cnKSA6IHQoJ2RpZmYuaGlkZScpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7cGF0Y2ggIT09IHVuZGVmaW5lZCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtgJHtrZXl9LWRpZmZgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49ezR9IHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgcGFkZGluZzogMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGlmZlZpZXcgcGF0Y2g9e3BhdGNofSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICAgKVxyXG4gICAgICB9KX1cclxuXHJcbiAgICAgIHsvKiBcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdUZGMUFcdTYzMDlcdTk0QUUgKyBcdTk4Q0VcdTk2NjlcdTY3ODRcdTYyMTAgKyBcdTU5MjdcdTU2RkUgKyBcdTVGNzFcdTU0Q0RcdTcwQjlcdTY2MEVcdTdFQzYgKyBcdThCQjBcdTVGQzZcdTgwNTRcdTUyQTggKi99XHJcbiAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgPENhcmQgdGl0bGU9e3QoJ2RldGFpbC5pbXBhY3QnKX0+XHJcbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17aW1wYWN0TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJbXBhY3QoKSB9fT5cclxuICAgICAgICAgICAge2ltcGFjdExvYWRpbmcgPyB0KCdkZXRhaWwuaW1wYWN0TG9hZGluZycpIDogdCgnZGV0YWlsLmltcGFjdCcpfVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIGltcGFjdC5leHBsYW5hdGlvbnNDYWNoZWQgPT09IHRydWUgJiYgKFxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoJyM4YjhiOGInKSwgbWFyZ2luTGVmdDogJzhweCcgfX0+XHJcbiAgICAgICAgICAgICAge3QoJ2NhY2hlLmhpdCcpfXtpbXBhY3QuZ2VuZXJhdGVkQXQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUoaW1wYWN0LmdlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIHJlbmRlckNvc3RCYWRnZShpbXBhY3QuZXhwbGFuYXRpb25zQ29zdFVzZCwgdCgnY29zdC50b29sdGlwJykpfVxyXG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgbWFyZ2luTGVmdDogJzhweCcsIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17aW1wYWN0TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJbXBhY3QodHJ1ZSkgfX0+XHJcbiAgICAgICAgICAgICAge3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICcxMHB4JywgbWFyZ2luOiAnMTBweCAwIDRweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoaW1wYWN0Umlza0NvbG9yKSwgZm9udFNpemU6ICcxM3B4JywgcGFkZGluZzogJzNweCAxMHB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAge3QoJ2ltcGFjdC5yaXNrJyl9OiB7aW1wYWN0LnJpc2tMZXZlbH1cdUZGMDh7aW1wYWN0LnJpc2tTY29yZX1cdUZGMDlcclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIHtpbXBhY3Qua2V5Q2hhbmdlUG9pbnRzICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LmtleUNoYW5nZVBvaW50cy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjOWE2NzAwJykgfX0+XHUyNkEwIHt0KCdpbXBhY3Qua2V5UG9pbnRzJyl9OiB7aW1wYWN0LmtleUNoYW5nZVBvaW50cy5tYXAoKGZpbGUpID0+IGZpbGUuc3BsaXQoJy8nKS5wb3AoKSkuam9pbignXHUzMDAxJyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICB7aW1wYWN0LnJpc2tGYWN0b3JzICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LnJpc2tGYWN0b3JzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnNlY3Rpb25UaXRsZX0+e3QoJ2ltcGFjdC5mYWN0b3JzJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnMnB4JywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAge2ltcGFjdC5yaXNrRmFjdG9ycy5tYXAoKGZhY3RvciwgaSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgZm9udFNpemU6ICcxMnB4JywgcGFkZGluZzogJzNweCA4cHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJywgYm9yZGVyUmFkaXVzOiAnNHB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2ZhY3Rvci50ZXh0fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IGltcGFjdFJpc2tDb2xvciwgZm9udFdlaWdodDogNjAwIH19Pit7ZmFjdG9yLnBvaW50c308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIDxJbXBhY3RHcmFwaCBkYXRhPXtpbXBhY3R9IHQ9e3R9IC8+XHJcbiAgICAgICAgICAgICAge2ltcGFjdC5sZXZlbHMubGVuZ3RoID09PSAwICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2ltcGFjdC5ub25lJyl9PC9kaXY+fVxyXG4gICAgICAgICAgICAgIHsvKiBcdTUxRkRcdTY1NzBcdTdFQTdcdTVGNzFcdTU0Q0RcdUZGMUFcdTY3MkNcdTZCMjFcdTRGRUVcdTY1MzlcdTRFODZcdTU0RUFcdTRFOUJcdTUxRkRcdTY1NzBcdTMwMDFcdTZDRTJcdTUzQ0FcdTRFODZcdThDMDFcdTc2ODRcdTU0RUFcdTRFOUJcdTUxRkRcdTY1NzBcdTMwMDFcdThDMDNcdTc1MjhcdTcwQjlcdTU3MjhcdTU0RUEgKi99XHJcbiAgICAgICAgICAgICAge2ltcGFjdC5mdW5jdGlvbkltcGFjdCAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5mdW5jdGlvbkltcGFjdC5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnMTJweCcgfX0+e3QoJ2ltcGFjdC5mdW5jdGlvbnMnKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICc4cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIHtpbXBhY3QuZnVuY3Rpb25JbXBhY3QubWFwKChlbnRyeSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5LnN5bWJvbH0gc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAxMHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjZDk3NzA2Jyl9PntlbnRyeS5zeW1ib2x9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5sYWJlbCwgbWFyZ2luTGVmdDogJzhweCcgfX0+e2VudHJ5LmRlZmluZWRJbn08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkucm9sZSAhPT0gdW5kZWZpbmVkICYmIGVudHJ5LnJvbGUgIT09ICcnICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT57dCgnaW1wYWN0LmZ1bmNSb2xlJyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LnJvbGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5jaGFuZ2UgIT09IHVuZGVmaW5lZCAmJiBlbnRyeS5jaGFuZ2UgIT09ICcnICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0IH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzlhNjcwMCcpIH19Pnt0KCdpbXBhY3QuZnVuY0NoYW5nZScpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5jaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5pbXBhY3QgIT09IHVuZGVmaW5lZCAmJiBlbnRyeS5pbXBhY3QgIT09ICcnICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBtYXJnaW5Cb3R0b206ICc2cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NlOTE3OCcpIH19Pnt0KCdpbXBhY3QuZnVuY0NhbGxlcnMnKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuaW1wYWN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2FsbGVycy5tYXAoKGNhbGxlciwgaSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyAuLi5zdHlsZXMubG9naWNTdGVwLCBtYXJnaW5Ub3A6ICczcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JykgfX0+XHUyMUIzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSBkb3R0ZWQnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBvcGVuUGVlayhjYWxsZXIuZmlsZSwgTnVtYmVyKGNhbGxlci5saW5lKSkgfX0+e2NhbGxlci5maWxlfTp7Y2FsbGVyLmxpbmV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHUyMDE0IHtjYWxsZXIuc25pcHBldC5zbGljZSgwLCA4MCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAge2ltcGFjdC5mdW5jdGlvbkltcGFjdCAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5mdW5jdGlvbkltcGFjdC5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnaW1wYWN0LmZ1bmN0aW9uc05vbmUnKX08L2Rpdj5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIHtpbXBhY3QubWVtb3JpZXMgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3QubWVtb3JpZXMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnLCBib3JkZXI6ICcxcHggZGFzaGVkIHJnYmEoMzcsOTksMjM1LDAuMzUpJywgYm9yZGVyUmFkaXVzOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+e3QoJ2ltcGFjdC5tZW1vcnknKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhXcmFwOiAnd3JhcCcsIGdhcDogJzZweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAge2ltcGFjdC5tZW1vcmllcy5tYXAoKG1lbW9yeSwgaSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4ga2V5PXtpfSBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9PnttZW1vcnkudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICB7LyogXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHVGRjFBXHU3RUQzXHU4QkJBICsgXHU3RUQzXHU2Nzg0XHU1MzE2XHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1ICovfVxyXG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdkZXRhaWwub3B0aW1hbGl0eScpfT5cclxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtyZXZpZXdMb2FkaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJldmlld3MoKSB9fT5cclxuICAgICAgICAgICAge3Jldmlld0xvYWRpbmcgPyB0KCdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnKSA6IHQoJ2RldGFpbC5vcHRpbWFsaXR5Jyl9XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubWFwKCh0YXJnZXQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgciA9IHJldmlld3NbdGFyZ2V0XVxyXG4gICAgICAgICAgICBpZiAociA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRhcmdldCA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiB0YXJnZXQuc2xpY2UoMCwgOClcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2IGtleT17YHItJHt0YXJnZXR9YH0gc3R5bGU9e3sgbWFyZ2luVG9wOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgICAgIHtsYWJlbH1cclxuICAgICAgICAgICAgICAgICAge3IuY2FjaGVkID09PSB0cnVlICYmIChcclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9Pnt0KCdjYWNoZS5oaXQnKX17ci5nZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShyLmdlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICB7cmVuZGVyQ29zdEJhZGdlKHIuY29zdFVzZCwgdCgnY29zdC50b29sdGlwJykpfVxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJldmlld3ModHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAge3IudmVyZGljdCAhPT0gJycgJiYgKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wNSknLCBib3JkZXI6ICcxcHggc29saWQgcmdiYSgzNyw5OSwyMzUsMC4yKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMTBweCcgfX0+e3IudmVyZGljdH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICB7ci5pc3N1ZUxpc3QgIT09IHVuZGVmaW5lZCAmJiByLmlzc3VlTGlzdC5sZW5ndGggPiAwID8gKFxyXG4gICAgICAgICAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHRyPntbJ3Jldmlldy5jb2wuc2V2ZXJpdHknLCAncmV2aWV3LmNvbC5jYXRlZ29yeScsICdyZXZpZXcuY29sLnRpdGxlJywgJ3Jldmlldy5jb2wuZXZpZGVuY2UnLCAncmV2aWV3LmNvbC5maXgnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAge3IuaXNzdWVMaXN0Lm1hcCgoaXNzdWUsIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoaXNzdWUuc2V2ZXJpdHkgPT09ICdjcml0aWNhbCcgPyAnI2YxNGM0YycgOiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2hpZ2gnID8gJyNjZTkxNzgnIDogaXNzdWUuc2V2ZXJpdHkgPT09ICdtZWRpdW0nID8gJyNkY2RjYWEnIDogJyM1NjljZDYnKX0+e2lzc3VlLnNldmVyaXR5fTwvc3Bhbj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXNzdWUuY2F0ZWdvcnl9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2lzc3VlLnRpdGxlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+e2lzc3VlLmV2aWRlbmNlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntpc3N1ZS5maXh9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXZpZXcuY2xlYW4nKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgICAge3Jldmlld0xvYWRpbmcgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJyl9PC9kaXY+fVxyXG4gICAgICAgICAgeyFyZXZpZXdMb2FkaW5nICYmIHNlbGVjdGVkVGFyZ2V0cy5ldmVyeSgodGFyZ2V0KSA9PiByZXZpZXdzW3RhcmdldF0gPT09IHVuZGVmaW5lZCkgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXZpZXcuaGludCcpfTwvZGl2PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICl9XHJcbiAgICA8Lz5cclxuICApXHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBcdThCQkVcdTdGNkVcdTk4NzVcdTdCN0UgXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgVElFUl9MQUJFTFM6IEFycmF5PHsga2V5OiBzdHJpbmc7IHpoOiBzdHJpbmc7IGRlc2M6IHN0cmluZyB9PiA9IFtcclxuICAgIHsga2V5OiAnc3RhbmRhcmQnLCB6aDogJ1x1ODlFM1x1OEJGQiAvIFx1NTFGRFx1NjU3MFx1NUY3MVx1NTRDRFx1OEJGNFx1NjYwRScsIGRlc2M6ICdcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTc2ODQgQUkgXHU4OUUzXHU4QkZCXHUzMDAxXHU1RjcxXHU1NENEXHU1MjA2XHU2NzkwJyB9LFxyXG4gICAgeyBrZXk6ICdyZWFzb25pbmcnLCB6aDogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNSAvIFx1NjI2N1x1ODg0Q1x1OEJBMVx1NTIxMicsIGRlc2M6ICdcdThCQzRcdTVCQTFcdTMwMDFcdThCQTFcdTUyMTJcdTc1MUZcdTYyMTBcdTMwMDFBSSBcdTVCNjZcdTRFNjBcdTYwM0JcdTdFRDMnIH0sXHJcbiAgICB7IGtleTogJ2Zhc3QnLCB6aDogJ1x1NTM4Nlx1NTNGMlx1OEY3Qlx1Njc5MCcsIGRlc2M6ICdcdTYyNkJcdTYzQ0ZcdTUzODZcdTUzRjJcdTY1RjZcdTc2ODRcdTkwMTBcdTYzRDBcdTRFQTRcdTRFMDBcdTUzRTVcdThCREQnIH0sXHJcbiAgICB7IGtleTogJ3ZlcmlmaWVyJywgemg6ICdcdTlBOENcdTY1MzYnLCBkZXNjOiAnXHU2NTM5XHU1MkE4XHU5QThDXHU2NTM2XHU3Njg0IEFJIFx1NTkwRFx1NjgzOCcgfSxcclxuICBdXHJcblxyXG4gIGNvbnN0IHNldHRpbmdzVGFiID0gKFxyXG4gICAgPD5cclxuICAgICAgey8qIFx1NkEyMVx1NTc4Qlx1NTIwNlx1OTE0RFx1RkYxQVx1NTNFRlx1ODlDNlx1NTMxNlx1NTIwN1x1NjM2Mlx1NTQwNFx1NEVGQlx1NTJBMVx1NzUyOFx1NzY4NFx1NkEyMVx1NTc4Qlx1RkYwQ1x1NEZERFx1NUI1OFx1NTM3M1x1NzUxRlx1NjU0OCAqL31cclxuICAgICAgPENhcmQgdGl0bGU9e3QoJ21vZGVsLnRpdGxlJyl9PlxyXG4gICAgICAgIHttb2RlbFRpZXJzID09PSBudWxsID8gKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnbW9kZWwubG9hZGluZycpfTwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8PlxyXG4gICAgICAgICAgICB7VElFUl9MQUJFTFMubWFwKCh0aWVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IG1vZGVsVGllcnNbdGllci5rZXldXHJcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjdXJyZW50ID8gY3VycmVudC5wcm92aWRlciArICcvJyArIGN1cnJlbnQubW9kZWwgOiAnJ1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17dGllci5rZXl9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtaW5XaWR0aDogMTUwLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+e3RpZXIuemh9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6IDI0MCB9fVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHYgPSBlLnRhcmdldC52YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHYgPT09ICcnKSB7IHNldE1vZGVsVGllcnMoeyAuLi5tb2RlbFRpZXJzLCBbdGllci5rZXldOiB7IHByb3ZpZGVyOiAnJywgbW9kZWw6ICcnIH0gfSk7IHJldHVybiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbcHJvdmlkZXIsIC4uLnJlc3RdID0gdi5zcGxpdCgnLycpXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IHJlc3Quam9pbignLycpXHJcbiAgICAgICAgICAgICAgICAgICAgICBzZXRNb2RlbFRpZXJzKHsgLi4ubW9kZWxUaWVycywgW3RpZXIua2V5XTogeyBwcm92aWRlciwgbW9kZWwgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e3QoJ21vZGVsLmZvbGxvd0NoYXQnKX08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICB7bW9kZWxPcHRpb25zLm1hcCgob3B0aW9uKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfSB2YWx1ZT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge29wdGlvbi5wcm92aWRlcn0gLyB7b3B0aW9uLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0aWVyLmRlc2N9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc4cHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknIH19PlxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fT5cdUQ4M0VcdUREMTYge3QoJ2ZpeC5tb2RlbFRpdGxlJyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXHJcbiAgICAgICAgICAgICAgICBtaW49ezF9XHJcbiAgICAgICAgICAgICAgICBtYXg9ezEwfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCB3aWR0aDogNjQsIHRleHRBbGlnbjogJ2NlbnRlcicgfX1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXtmaXhDb25jdXJyZW5jeX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRGaXhDb25jdXJyZW5jeShlLnRhcmdldC52YWx1ZSkgfX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdmaXgubW9kZWxIaW50Jyl9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxyXG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXttb2RlbFNhdmluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIHNhdmVNb2RlbENvbmZpZygpIH19PlxyXG4gICAgICAgICAgICAgICAge21vZGVsU2F2aW5nID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ21vZGVsLnNhdmUnKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICB7bW9kZWxTYXZlZCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNGVjOWIwJyl9Pnt0KCdtb2RlbC5zYXZlZCcpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ21vZGVsLmhpbnQnKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC8+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9DYXJkPlxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXRlcnRpYXJ5LCAjOWNhM2FmKScsIHBhZGRpbmc6ICc4cHggMCcgfX0+XHJcbiAgICAgICAgZHNoLXByb2plY3QtY29udHJvbCB2e3N0YXRlPy5wbHVnaW5WZXJzaW9uID8/ICc/J31cclxuICAgICAgPC9kaXY+XHJcbiAgICA8Lz5cclxuICApXHJcblxyXG4gIGNvbnN0IG92ZXJ2aWV3VGFiID0gKFxyXG4gICAgPD5cclxuICAgICAgPENhcmQ+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XHJcbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17Ym9vdHN0cmFwcGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkJvb3RzdHJhcCgpIH19PlxyXG4gICAgICAgICAgICB7Ym9vdHN0cmFwcGluZyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24ucmVzY2FuJyl9XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtidXN5ICE9PSBudWxsfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdhbmFseXplJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2FuYWx5emUnLCB7fSkgfX0+XHJcbiAgICAgICAgICAgIHtidXN5ID09PSAnYW5hbHl6ZScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLmFuYWx5emUnKX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGx9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3ZlcmlmeScsICcvcHJvamVjdC1jb250cm9sL2FwaS92ZXJpZnknLCB7fSkgfX0+XHJcbiAgICAgICAgICAgIHtidXN5ID09PSAndmVyaWZ5JyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24udmVyaWZ5Jyl9XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9DYXJkPlxyXG4gICAgICB7cmVzdWx0UGFuZWx9XHJcbiAgICAgIHtwcm9qZWN0ID09PSBudWxsID8gKFxyXG4gICAgICAgIDxDYXJkPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTNweCcsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+e3QoJ3N0YXRlLm5vUHJvamVjdCcpfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc3RhdGUubm9Qcm9qZWN0SGludCcpfTwvZGl2PlxyXG4gICAgICAgIDwvQ2FyZD5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8Q2FyZCB0aXRsZT17YCR7dCgnc3RhdGUucHJvamVjdCcpfVx1RkYxQSR7cHJvamVjdC5uYW1lfWB9PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvd30+XHJcbiAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9PlJvb3Q8L3NwYW4+e3Byb2plY3Qucm9vdFBhdGh9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICB7Ym9vdHN0cmFwICE9PSBudWxsICYmIChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cclxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS50ZWNoU3RhY2snKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIHtib290c3RyYXAudGVjaFN0YWNrLm1hcCgodGVjaCkgPT4gPHNwYW4ga2V5PXt0ZWNofSBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNGVjOWIwJyl9Pnt0ZWNofTwvc3Bhbj4pfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLnN5bWJvbHMnKX08L3NwYW4+e1N0cmluZyhib290c3RyYXAuc3ltYm9sc0NvdW50KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUubWFuaWZlc3RzJyl9PC9zcGFuPntTdHJpbmcoYm9vdHN0cmFwLm1hbmlmZXN0RmlsZXMubGVuZ3RoKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUuZXZpZGVuY2UnKX08L3NwYW4+e1N0cmluZyhzdGF0ZT8uZXZpZGVuY2VDb3VudCA/PyAwKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luVG9wOiAnOHB4JyB9fT57Ym9vdHN0cmFwLnN1bW1hcnl9PC9kaXY+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICl9XHJcbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdjb25maXJtZWQudGl0bGUnKX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxyXG4gICAgICAgICAgPHRleHRhcmVhIHJvd3M9ezJ9IHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHBsYWNlaG9sZGVyPXt0KCdjb25maXJtZWQudGV4dCcpfSB2YWx1ZT17Y29uZmlybWVkVGV4dH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENvbmZpcm1lZFRleHQoZS50YXJnZXQudmFsdWUpIH19IC8+XHJcbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2NvbmZpcm1lZC5wYXRocycpfSB2YWx1ZT17Y29uZmlybWVkUGF0aHN9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDb25maXJtZWRQYXRocyhlLnRhcmdldC52YWx1ZSkgfX0gLz5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5idXR0b259XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtidXN5ICE9PSBudWxsIHx8IGNvbmZpcm1lZFRleHQgPT09ICcnfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdhZGRDb25maXJtZWQnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY29uZmlybWVkJywgeyB0eXBlOiAnY29uc3RyYWludCcsIHRleHQ6IGNvbmZpcm1lZFRleHQsIGZvcmJpZGRlblBhdGhzOiBjb25maXJtZWRQYXRocy5zcGxpdCgnLCcpLm1hcCgocGF0aCkgPT4gcGF0aC50cmltKCkpLmZpbHRlcigocGF0aCkgPT4gcGF0aCAhPT0gJycpIH0pLnRoZW4oKCkgPT4geyBzZXRDb25maXJtZWRUZXh0KCcnKTsgc2V0Q29uZmlybWVkUGF0aHMoJycpIH0pIH19XHJcbiAgICAgICAgICA+e2J1c3kgPT09ICdhZGRDb25maXJtZWQnID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2NvbmZpcm1lZC5hZGQnKX08L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7Y29uZmlybWVkLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2NvbmZpcm1lZC5ub25lJyl9PC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHtjb25maXJtZWQubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtpdGVtLmlkfT5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNjNTg2YzAnKX0+e2l0ZW0udHlwZX08L3NwYW4+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntpdGVtLnRleHR9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntpdGVtLmZvcmJpZGRlblBhdGhzLmpvaW4oJywgJykgfHwgJ1x1MjAxNCd9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbigncmVtb3ZlQ29uZmlybWVkJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbmZpcm1lZC9yZW1vdmUnLCB7IGlkOiBpdGVtLmlkIH0pIH19XHJcbiAgICAgICAgICAgICAgICAgICAgPlx1MjcxNTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9DYXJkPlxyXG4gICAgICA8Q2FyZCB0aXRsZT17dCgnYWN0aW9uLmNyZWF0ZUNoYW5nZScpfT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XHJcbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0uY2hhbmdlVGl0bGUnKX0gdmFsdWU9e2NoYW5nZVRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q2hhbmdlVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XHJcbiAgICAgICAgICA8dGV4dGFyZWEgcm93cz17Mn0gc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0uY2hhbmdlRGVzYycpfSB2YWx1ZT17Y2hhbmdlRGVzY30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENoYW5nZURlc2MoZS50YXJnZXQudmFsdWUpIH19IC8+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuYnV0dG9ufVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBjaGFuZ2VUaXRsZSA9PT0gJyd9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2NyZWF0ZUNoYW5nZScsICcvcHJvamVjdC1jb250cm9sL2FwaS9jaGFuZ2VzJywgeyB0aXRsZTogY2hhbmdlVGl0bGUsIGRlc2NyaXB0aW9uOiBjaGFuZ2VEZXNjIH0pLnRoZW4oKCkgPT4geyBzZXRDaGFuZ2VUaXRsZSgnJyk7IHNldENoYW5nZURlc2MoJycpIH0pIH19XHJcbiAgICAgICAgICA+e2J1c3kgPT09ICdjcmVhdGVDaGFuZ2UnID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnKX08L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7Y2hhbmdlcy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdzdGF0ZS5ub0NoYW5nZXMnKX08L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxyXG4gICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgPHRyPntbJ2NoYW5nZXMuY29sLnRpdGxlJywgJ2NoYW5nZXMuY29sLnR5cGUnLCAnY2hhbmdlcy5jb2wuc3RhdHVzJywgJ2NoYW5nZXMuY29sLnVwZGF0ZWQnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxyXG4gICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAge2NoYW5nZXMubWFwKChjaGFuZ2UpID0+IChcclxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e2NoYW5nZS5pZH0+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Y2hhbmdlLnRpdGxlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKGNoYW5nZS5zdGF0dXMgPT09ICdjb21wbGV0ZWQnID8gJyM0ZWM5YjAnIDogJyM1NjljZDYnKX0+e2NoYW5nZS5zdGF0dXN9PC9zcGFuPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Zm9ybWF0VGltZShjaGFuZ2UudXBkYXRlZEF0KX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6ICdcdTUyMjBcdTk2NjRcdThGRDlcdTRFMkFcdTUzRDhcdTY2RjRcdTRFRkJcdTUyQTFcdUZGMUYnLCBtZXNzYWdlOiAnXHUzMDBDJyArIGNoYW5nZS50aXRsZSArICdcdTMwMERcdTUzQ0FcdTUxNzZcdTUxNjhcdTkwRThcdTYyNjdcdTg4NENcdThCQjBcdTVGNTVcdTMwMDFcdThCQTFcdTUyMTJcdTMwMDFcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTVDMDZcdTg4QUJcdTZDMzhcdTRFNDVcdTUyMjBcdTk2NjRcdTMwMDInLCBkYW5nZXI6IHRydWUsIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHJ1bkFjdGlvbignZGVsZXRlQ2hhbmdlJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NoYW5nZXMvZGVsZXRlJywgeyBpZDogY2hhbmdlLmlkIH0pIH0gfSkgfX0+XHUyNzE1PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICApfVxyXG4gICAgICA8L0NhcmQ+XHJcbiAgICA8Lz5cclxuICApXHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdTk4NzVcdTdCN0VcdUZGMUFcdTk4NzVcdTk3NjJcdTc2RjRcdTYzQTVcdTUyMUJcdTVFRkFcdTVFNzZcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMENcdTgwNEFcdTU5MjlcdTUzRUFcdTY2MkZcdTUzRTZcdTRFMDBcdTc5Q0RcdTUxNjVcdTUzRTMgXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgZXhlY3V0aW9uVGFiID0gKFxyXG4gICAgPD5cclxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGZsZXhXcmFwOiAnd3JhcCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICcxMHB4JywgcGFkZGluZzogJzdweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMzcsOTksMjM1LDAuMiknLCBmb250U2l6ZTogJzExcHgnIH19PlxyXG4gICAgICAgIDxiPlx1MjQ2MCB7dCgnZXhlYy5mbG93Q3JlYXRlJyl9PC9iPjxzcGFuPlx1MjE5Mjwvc3Bhbj5cclxuICAgICAgICA8Yj5cdTI0NjEge3QoJ2V4ZWMuZmxvd09yY2hlc3RyYXRlJyl9PC9iPjxzcGFuPlx1MjE5Mjwvc3Bhbj5cclxuICAgICAgICA8Yj5cdTI0NjIge3QoJ2V4ZWMuZmxvd1J1bicpfTwvYj48c3Bhbj5cdTIxOTI8L3NwYW4+XHJcbiAgICAgICAgPGI+XHUyNDYzIHt0KCdleGVjLmZsb3dNZW1vcnknKX08L2I+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8Q2FyZCB0aXRsZT17dCgnZXhlYy5jcmVhdGUnKX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1JbmxpbmV9PlxyXG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgZmxleDogMSwgbWluV2lkdGg6IDIwMCB9fSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtVGl0bGUnKX0gdmFsdWU9e2V4ZWNUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEV4ZWNUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cclxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17ZXhlY01vZGVsfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RXhlY01vZGVsKGUudGFyZ2V0LnZhbHVlKSB9fSB0aXRsZT17dCgncGxhbi5tb2RlbERlZmF1bHQnKX0+XHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj57dCgnZXhlYy5tb2RlbERlZmF1bHQnKX08L29wdGlvbj5cclxuICAgICAgICAgICAgeyhtb2RlbE9wdGlvbnMgPz8gW10pLm1hcCgob3B0aW9uKSA9PiA8b3B0aW9uIGtleT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfSB2YWx1ZT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfT57b3B0aW9uLnByb3ZpZGVyfS97b3B0aW9uLmlkfTwvb3B0aW9uPil9XHJcbiAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XHJcbiAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcm93cz17M30gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybURlc2MnKX0gdmFsdWU9e2V4ZWNEZXNjfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RXhlY0Rlc2MoZS50YXJnZXQudmFsdWUpIH19IC8+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuYWN0aW9uUm93fT5cclxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgZXhlY1RpdGxlLnRyaW0oKSA9PT0gJycgfHwgZXhlY0Rlc2MudHJpbSgpID09PSAnJ30gb25DbGljaz17KCkgPT4geyB2b2lkIHN0YXJ0UnVuKCkgfX0+XHJcbiAgICAgICAgICAgICAge2J1c3kgPT09ICdzdGFydFJ1bicgPyB0KCdleGVjLnBsYW5uaW5nJykgOiB0KCdleGVjLnN0YXJ0Jyl9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnZXhlYy5jcmVhdGVIaW50Jyl9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvQ2FyZD5cclxuICAgICAge3Jlc3VsdFBhbmVsfVxyXG4gICAgICB7cGxhbkNvbmZpcm0gIT09IG51bGwgJiYgKFxyXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdwbGFuLnRpdGxlJyl9PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT57dCgncGxhbi5oaW50Jyl9PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XHJcbiAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgPHRyPntbJ3BsYW4uY29sLnN0ZXAnLCAncGxhbi5jb2wucm9sZScsICdwbGFuLmNvbC5tb2RlbCcsICdwbGFuLmNvbC5wb2xpY3knLCAncGxhbi5jb2wuZW5hYmxlZCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XHJcbiAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICB7cGxhbkNvbmZpcm0uc3RlcHMubWFwKChzdGVwLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICA8dHIga2V5PXtzdGVwLmlkfSBzdHlsZT17eyBvcGFjaXR5OiBzdGVwLmVuYWJsZWQgPyAxIDogMC40NSB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBtaW5XaWR0aDogMjIwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+e2luZGV4ICsgMX0uIHtzdGVwLnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57c3RlcC5kZXNjcmlwdGlvbi5zbGljZSgwLCAxMjApfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAge3N0ZXAudGFyZ2V0RmlsZXMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknIH19PntzdGVwLnRhcmdldEZpbGVzLmpvaW4oJywgJykuc2xpY2UoMCwgMTIwKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggNnB4JyB9fSB2YWx1ZT17c3RlcC5yb2xlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0UGxhbkNvbmZpcm0oeyAuLi5wbGFuQ29uZmlybSwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzLm1hcCgoaXRlbSwgaSkgPT4gaSA9PT0gaW5kZXggPyB7IC4uLml0ZW0sIHJvbGU6IGUudGFyZ2V0LnZhbHVlIH0gOiBpdGVtKSB9KSB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1snYW5hbHlzaXMnLCAncGxhbm5pbmcnLCAnY29kaW5nJywgJ29wcycsICd2ZXJpZmljYXRpb24nXS5tYXAoKHJvbGUpID0+IDxvcHRpb24ga2V5PXtyb2xlfSB2YWx1ZT17cm9sZX0+e1JPTEVfTEFCRUxTW3JvbGVdID8/IHJvbGV9PC9vcHRpb24+KX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDZweCcgfX0gdmFsdWU9e3N0ZXAubW9kZWxQcm92aWRlciArICcvJyArIHN0ZXAubW9kZWxJZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3Byb3ZpZGVyLCBtb2RlbF0gPSBlLnRhcmdldC52YWx1ZS5zcGxpdCgnLycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxhbkNvbmZpcm0oeyAuLi5wbGFuQ29uZmlybSwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzLm1hcCgoaXRlbSwgaSkgPT4gaSA9PT0gaW5kZXggPyB7IC4uLml0ZW0sIG1vZGVsUHJvdmlkZXI6IHByb3ZpZGVyID8/ICcnLCBtb2RlbElkOiBtb2RlbCA/PyAnJyB9IDogaXRlbSkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIvXCI+e3QoJ3BsYW4ubW9kZWxEZWZhdWx0Jyl9PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHttb2RlbE9wdGlvbnMubWFwKChvcHRpb24pID0+IDxvcHRpb24ga2V5PXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9IHZhbHVlPXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9PntvcHRpb24ucHJvdmlkZXJ9L3tvcHRpb24uaWR9PC9vcHRpb24+KX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDZweCcgfX0gdmFsdWU9e3N0ZXAuZmFpbHVyZVBvbGljeX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBsYW5Db25maXJtKHsgLi4ucGxhbkNvbmZpcm0sIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcy5tYXAoKGl0ZW0sIGkpID0+IGkgPT09IGluZGV4ID8geyAuLi5pdGVtLCBmYWlsdXJlUG9saWN5OiBlLnRhcmdldC52YWx1ZSB9IDogaXRlbSkgfSkgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhQT0xJQ1lfTEFCRUxTKS5tYXAoKFt2YWx1ZSwgbGFiZWxdKSA9PiA8b3B0aW9uIGtleT17dmFsdWV9IHZhbHVlPXt2YWx1ZX0+e2xhYmVsfTwvb3B0aW9uPil9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtzdGVwLmVuYWJsZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRQbGFuQ29uZmlybSh7IC4uLnBsYW5Db25maXJtLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMubWFwKChpdGVtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4uaXRlbSwgZW5hYmxlZDogZS50YXJnZXQuY2hlY2tlZCB9IDogaXRlbSkgfSkgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIG1hcmdpblRvcDogJzEwcHgnIH19PlxyXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17cGxhbkJ1c3l9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsYXVuY2hQbGFuKHRydWUpIH19PntwbGFuQnVzeSA/ICdcdTIwMjYnIDogdCgncGxhbi5sYXVuY2hFZGl0ZWQnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e3BsYW5CdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbGF1bmNoUGxhbihmYWxzZSkgfX0+e3QoJ3BsYW4ubGF1bmNoRGlyZWN0Jyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtwbGFuQnVzeX0gb25DbGljaz17KCkgPT4geyBzZXRQbGFuQ29uZmlybShudWxsKSB9fT57dCgncGxhbi5kaXNjYXJkJyl9PC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L0NhcmQ+XHJcbiAgICAgICl9XHJcbiAgICAgIDxDYXJkPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxyXG4gICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ2V4ZWMuYXR0ZW1wdHMnKX08L3NwYW4+e1N0cmluZyhzdGF0ZT8uYXR0ZW1wdHNDb3VudCA/PyAwKX08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAge3J1bnMubGVuZ3RoID09PSAwID8gKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc3RhdGUubm9SdW5zJyl9PC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XHJcbiAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICA8dHI+e1snZXhlYy5jb2wuY2hhbmdlJywgJ2V4ZWMuY29sLnN0ZXBzJywgJ2V4ZWMuY29sLnN0YXR1cycsICdleGVjLmNvbC5zdGFydGVkJywgJ2V4ZWMuY29sLmNvc3QnLCAnZXhlYy5jb2wuZGV0YWlsJ10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHtydW5zLm1hcCgocnVuKSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtydW4uaWR9PlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+eyhjaGFuZ2VzLmZpbmQoKGNoYW5nZSkgPT4gY2hhbmdlLmlkID09PSBydW4uY2hhbmdlSWQpPy50aXRsZSkgPz8gcnVuLmNoYW5nZUlkfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57cnVuLnN0ZXBzVG90YWwgPyAocnVuLnN0ZXBzRG9uZSA/PyAwKSArICcvJyArIHJ1bi5zdGVwc1RvdGFsIDogJ1x1MjAxNCd9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UocnVuLnN0YXR1cyA9PT0gJ3N1Y2NlZWRlZCcgfHwgcnVuLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgPyAnIzRlYzliMCcgOiBydW4uc3RhdHVzID09PSAnZmFpbGVkJyA/ICcjZjE0YzRjJyA6IHJ1bi5zdGF0dXMgPT09ICdwYXVzZWQnID8gJyNkOTc3MDYnIDogJyNkY2RjYWEnKX0+e1JVTl9TVEFUVVNfTEFCRUxTW3J1bi5zdGF0dXNdID8/IHJ1bi5zdGF0dXN9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIHtydW4uY3VycmVudFN0ZXAgIT09IG51bGwgJiYgcnVuLmN1cnJlbnRTdGVwICE9PSB1bmRlZmluZWQgJiYgcnVuLnN0YXR1cyA9PT0gJ3J1bm5pbmcnICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1heFdpZHRoOiAxNjAsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT57cnVuLmN1cnJlbnRTdGVwfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Zm9ybWF0VGltZShydW4uc3RhcnRlZEF0KX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3J1bi5jb3N0VXNkICE9PSB1bmRlZmluZWQgPyAnJCcgKyBydW4uY29zdFVzZC50b0ZpeGVkKDQpIDogJ1x1MjAxNCd9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsIGdhcDogJzZweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSdW5EZXRhaWwocnVuLmlkKSB9fT57cnVuRGV0YWlsPy5ydW4uaWQgPT09IHJ1bi5pZCA/IHQoJ3BsYW4ucmVmcmVzaERldGFpbCcpIDogdCgncGxhbi52aWV3RGV0YWlsJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7LyogXHU1NDBDXHU0RTAwXHU1M0Q4XHU2NkY0XHU1M0VGXHU4MEZEXHU2MzAyXHU1OTFBXHU2NzYxIFJ1blx1RkYxQVx1NTIyMFx1OTY2NCA9IFx1OEZERVx1NTNEOFx1NjZGNFx1NEUwRVx1NTE2OFx1OTBFOCBSdW4gXHU4QkIwXHU1RjU1XHU0RTAwXHU4RDc3XHU1MjIwXHVGRjA4XHU1RjM5XHU3QTk3XHU2Q0U4XHU2NjBFXHVGRjA5XHUzMDAyICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2QxMjQyZicpIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGFuZ2VUaXRsZSA9IGNoYW5nZXMuZmluZCgoY2hhbmdlKSA9PiBjaGFuZ2UuaWQgPT09IHJ1bi5jaGFuZ2VJZCk/LnRpdGxlID8/IHJ1bi5jaGFuZ2VJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpYmxpbmdDb3VudCA9IHJ1bnMuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuY2hhbmdlSWQgPT09IHJ1bi5jaGFuZ2VJZCkubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29uZmlybURpYWxvZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1x1NTIyMFx1OTY2NFx1OEZEOVx1Njc2MVx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1RkYxRicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgXHUzMDBDJHtjaGFuZ2VUaXRsZX1cdTMwMERcdTUzQ0FcdTUxNzZcdTUxNjhcdTkwRThcdTYyNjdcdTg4NENcdThCQjBcdTVGNTVcdUZGMDhcdTU0MkJcdTY3MkNcdTY3NjFcdTU3MjhcdTUxODVcdTUxNzEgJHtTdHJpbmcoc2libGluZ0NvdW50KX0gXHU2NzYxIFJ1blx1RkYwOVx1MzAwMVx1OEJBMVx1NTIxMlx1MzAwMVx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1NUMwNlx1ODhBQlx1NkMzOFx1NEU0NVx1NTIyMFx1OTY2NFx1MzAwMmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW5nZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2RlbGV0ZUNoYW5nZScsICcvcHJvamVjdC1jb250cm9sL2FwaS9jaGFuZ2VzL2RlbGV0ZScsIHsgaWQ6IHJ1bi5jaGFuZ2VJZCB9KSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICA+XHUyNzE1PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICA8L0NhcmQ+XHJcbiAgICAgIHtydW5EZXRhaWwgIT09IG51bGwgJiYgKFxyXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdwbGFuLmRldGFpbFRpdGxlJykgKyAnIFx1MDBCNyAnICsgcnVuRGV0YWlsLnJ1bi5jaGFuZ2VUaXRsZX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UocnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdzdWNjZWVkZWQnIHx8IHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnY29tcGxldGVkJyA/ICcjNGVjOWIwJyA6IHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnZmFpbGVkJyA/ICcjZjE0YzRjJyA6IHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAncGF1c2VkJyA/ICcjZDk3NzA2JyA6ICcjZGNkY2FhJyl9PntSVU5fU1RBVFVTX0xBQkVMU1tydW5EZXRhaWwucnVuLnN0YXR1c10gPz8gcnVuRGV0YWlsLnJ1bi5zdGF0dXN9PC9zcGFuPlxyXG4gICAgICAgICAgICB7cnVuRGV0YWlsLnJ1bi5lcnJvciAhPT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkMTI0MmYnKSB9fT57cnVuRGV0YWlsLnJ1bi5lcnJvci5tZXNzYWdlfTwvc3Bhbj59XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cclxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSdW5EZXRhaWwocnVuRGV0YWlsLnJ1bi5pZCkgfX0+e3QoJ3BsYW4ucmVmcmVzaERldGFpbCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFJ1bkRldGFpbChudWxsKSB9fT57dCgncGxhbi5jbG9zZURldGFpbCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICB7cnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdwYXVzZWQnICYmIHJ1bkRldGFpbC5ydW4ucGF1c2VQb2ludCAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzhweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgYmFja2dyb3VuZDogJ3JnYmEoMjE3LDExOSw2LDAuMDgpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMjE3LDExOSw2LDAuMzUpJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCwgZm9udFNpemU6ICcxMnB4JyB9fT5cdTIzRjgge3QoJ3BsYW4ucGF1c2VkQmFubmVyJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57cnVuRGV0YWlsLnJ1bi5wYXVzZVBvaW50LnJlYXNvbn08L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgbWFyZ2luVG9wOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJ1dHRvbiwgcGFkZGluZzogJzNweCAxMHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcmVzdW1lUnVuKHJ1bkRldGFpbC5ydW4uaWQsICdjb250aW51ZScpIH19Pnt0KCdwbGFuLnJlc3VtZVJldHJ5Jyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHJlc3VtZVJ1bihydW5EZXRhaWwucnVuLmlkLCAnc2tpcC1jdXJyZW50JykgfX0+e3QoJ3BsYW4ucmVzdW1lU2tpcCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICB7KHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnZmFpbGVkJyB8fCBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2ludGVycnVwdGVkJykgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCByZXN1bWVSdW4ocnVuRGV0YWlsLnJ1bi5pZCwgJ2NvbnRpbnVlJykgfX0+e3QoJ3BsYW4ucmVzdW1lRmFpbGVkJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XHJcbiAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICA8dHI+e1sncGxhbi5jb2wuc3RlcCcsICdwbGFuLmNvbC5yb2xlJywgJ3BsYW4uY29sLm1vZGVsJywgJ2V4ZWMuY29sLnN0YXR1cycsICdwbGFuLmNvbC5hdHRlbXB0cycsICdleGVjLmNvbC5jb3N0J10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHtydW5EZXRhaWwuc3RlcHMubWFwKChzdGVwLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPHRyIGtleT17c3RlcC5pZH0+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PntpbmRleCArIDF9LiB7c3RlcC50aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7c3RlcC5jbGFpbWVkT3V0Y29tZSAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXhXaWR0aDogMzIwLCB3aGl0ZVNwYWNlOiAnbm9ybWFsJyB9fT57c3RlcC5jbGFpbWVkT3V0Y29tZS5zbGljZSgwLCAxNjApfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCdyZ2JhKDg2LDE1NiwyMTQsMC4yNSknKX0+e1JPTEVfTEFCRUxTW3N0ZXAucm9sZV0gPz8gc3RlcC5yb2xlfTwvc3Bhbj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBmb250U2l6ZTogJzExcHgnIH19PntzdGVwLm1vZGVsID8/ICdcdTIwMTQnfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHN0ZXAudmVyaWZpZWQgPyAnIzRlYzliMCcgOiBzdGVwLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgPyAnI2YxNGM0YycgOiBzdGVwLnN0YXR1cyA9PT0gJ3NraXBwZWQnID8gJyM4Yjk0OWUnIDogJyNkY2RjYWEnKX0+e1NURVBfU1RBVFVTX0xBQkVMU1tzdGVwLnN0YXR1c10gPz8gc3RlcC5zdGF0dXN9PC9zcGFuPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57U3RyaW5nKHN0ZXAuYXR0ZW1wdHNDb3VudCl9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntzdGVwLmNvc3RVc2QgPiAwID8gJyQnICsgc3RlcC5jb3N0VXNkLnRvRml4ZWQoNCkgOiAnXHUyMDE0J308L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dCAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMTBweCcsIGJvcmRlcjogJzFweCBkYXNoZWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBwYWRkaW5nOiAnOHB4IDEycHgnIH19PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICc0cHgnIH19Pnt0KCdwbGFuLmNvbnRleHRUaXRsZScpfTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHJcbiAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQucHJvamVjdERpZ2VzdH1cclxuICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5icmFuY2ggIT09IG51bGwgPyBgIFx1MDBCNyAke3QoJ3BsYW4uYnJhbmNoJyl9ICR7cnVuRGV0YWlsLmNvbnRleHQuYnJhbmNofWAgOiAnJ31cclxuICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5oZWFkU2hhICE9PSBudWxsID8gYCBcdTAwQjcgSEVBRCAke3J1bkRldGFpbC5jb250ZXh0LmhlYWRTaGEuc2xpY2UoMCwgOCl9YCA6ICcnfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5pbmplY3RlZE1lbW9yaWVzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+e3QoJ3BsYW4uaW5qZWN0ZWRNZW1vcmllcycpfVx1RkYxQTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmluamVjdGVkTWVtb3JpZXMubWFwKChtZW1vcnkpID0+IDxzcGFuIGtleT17bWVtb3J5LmlkfSBzdHlsZT17c3R5bGVzLmJhZGdlKCdyZ2JhKDc4LDIwMSwxNzYsMC4yKScpfT57bWVtb3J5LnRpdGxlfTwvc3Bhbj4pfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuZGVjaXNpb25Mb2cubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzRweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiAnaW5oZXJpdCcgfX0+e3QoJ3BsYW4uZGVjaXNpb25Mb2cnKX1cdUZGMUE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5kZWNpc2lvbkxvZy5zbGljZSgtNikubWFwKChlbnRyeSwgZW50cnlJbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeUluZGV4fT5cdTAwQjcgW3tlbnRyeS5raW5kfV0ge2VudHJ5LmRldGFpbH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9DYXJkPlxyXG4gICAgICApfVxyXG4gICAgICA8Q2FyZFxyXG4gICAgICAgIHRpdGxlPXtcclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCB1c2VyU2VsZWN0OiAnbm9uZScgfX0gb25DbGljaz17KCkgPT4geyBzZXRTY2hlZE9wZW4oIXNjaGVkT3BlbikgfX0+XHJcbiAgICAgICAgICAgIHtzY2hlZE9wZW4gPyAnXHUyNUJFICcgOiAnXHUyNUI4ICd9e3QoJ3NjaGVkLnRpdGxlJyl9XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5sYWJlbCwgbWFyZ2luTGVmdDogJzhweCcgfX0+eyhzY2hlZHVsZWREYXRhID8/IFtdKS5sZW5ndGggPiAwID8gU3RyaW5nKChzY2hlZHVsZWREYXRhID8/IFtdKS5sZW5ndGgpICsgJyBcdTRFMkEnIDogJyd9PC9zcGFuPlxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIH1cclxuICAgICAgPlxyXG4gICAgICAgIHtzY2hlZE9wZW4gJiYgKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1JbmxpbmV9PlxyXG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgZmxleDogMSwgbWluV2lkdGg6IDE2MCB9fSBwbGFjZWhvbGRlcj17dCgnc2NoZWQuZm9ybU5hbWUnKX0gdmFsdWU9e3NjaGVkTmFtZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkTmFtZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cclxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17c2NoZWRUeXBlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWRUeXBlKGUudGFyZ2V0LnZhbHVlKSB9fT5cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJldmlld1wiPnt0KCdzY2hlZC50eXBlUmV2aWV3Jyl9PC9vcHRpb24+XHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzdW1tYXJ5XCI+e3QoJ3NjaGVkLnR5cGVTdW1tYXJ5Jyl9PC9vcHRpb24+XHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJydW5cIj57dCgnc2NoZWQudHlwZVJ1bicpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic3luY1wiPnt0KCdzY2hlZC50eXBlU3luYycpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCB3aWR0aDogMTIwIH19IHBsYWNlaG9sZGVyPXt0KCdzY2hlZC5mb3JtSW50ZXJ2YWwnKX0gdmFsdWU9e3NjaGVkSW50ZXJ2YWx9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZEludGVydmFsKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAge3NjaGVkVHlwZSA9PT0gJ3J1bicgJiYgKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtVGl0bGUnKX0gdmFsdWU9e3NjaGVkVGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZFRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSByb3dzPXsyfSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtRGVzYycpfSB2YWx1ZT17c2NoZWREZXNjfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWREZXNjKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17c2NoZWROYW1lLnRyaW0oKSA9PT0gJyd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhZGRTY2hlZHVsZWQoKSB9fT57dCgnc2NoZWQuYWRkJyl9PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT57dCgnc2NoZWQuaGludCcpfTwvZGl2PlxyXG4gICAgICAgIHsoc2NoZWR1bGVkRGF0YSA/PyBbXSkubGVuZ3RoID09PSAwID8gKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc2NoZWQuZW1wdHknKX08L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cclxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cclxuICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgIDx0cj57WydzY2hlZC5jb2wubmFtZScsICdzY2hlZC5jb2wudHlwZScsICdzY2hlZC5jb2wuaW50ZXJ2YWwnLCAnc2NoZWQuY29sLm5leHQnLCAnc2NoZWQuY29sLmxhc3RSZXN1bHQnLCAnc2NoZWQuY29sLmFjdGlvbnMnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxyXG4gICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgeyhzY2hlZHVsZWREYXRhID8/IFtdKS5tYXAoKHRhc2spID0+IChcclxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3Rhc2suaWR9IHN0eWxlPXt7IG9wYWNpdHk6IHRhc2suZW5hYmxlZCA/IDEgOiAwLjQ1IH19PlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3Rhc2submFtZX17dGFzay50aXRsZSAhPT0gJycgPyA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cdUZGMDh7dGFzay50aXRsZX1cdUZGMDk8L3NwYW4+IDogbnVsbH08L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSh0YXNrLnR5cGUgPT09ICdyZXZpZXcnID8gJyM1NjljZDYnIDogdGFzay50eXBlID09PSAnc3VtbWFyeScgPyAnIzRlYzliMCcgOiAnI2Q3YmE3ZCcpfT57dGFzay50eXBlID09PSAncmV2aWV3JyA/IHQoJ3NjaGVkLnR5cGVSZXZpZXcnKSA6IHRhc2sudHlwZSA9PT0gJ3N1bW1hcnknID8gdCgnc2NoZWQudHlwZVN1bW1hcnknKSA6IHQoJ3NjaGVkLnR5cGVSdW4nKX08L3NwYW4+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pnt0YXNrLmludGVydmFsTWludXRlcyA+PSAxNDQwID8gTWF0aC5yb3VuZCh0YXNrLmludGVydmFsTWludXRlcyAvIDE0NDAgKiAxMCkgLyAxMCArIHQoJ3NjaGVkLmRheScpIDogdGFzay5pbnRlcnZhbE1pbnV0ZXMgPj0gNjAgPyBNYXRoLnJvdW5kKHRhc2suaW50ZXJ2YWxNaW51dGVzIC8gNjAgKiAxMCkgLyAxMCArIHQoJ3NjaGVkLmhvdXInKSA6IHRhc2suaW50ZXJ2YWxNaW51dGVzICsgdCgnc2NoZWQubWludXRlJyl9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pnt0YXNrLmVuYWJsZWQgPyBmb3JtYXRUaW1lKHRhc2submV4dER1ZUF0KSA6ICdcdTIwMTQnfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXhXaWR0aDogMjIwLCB3aGl0ZVNwYWNlOiAnbm9ybWFsJyB9fT57dGFzay5sYXN0UmVzdWx0IHx8ICh0YXNrLmxhc3RSdW5BdCAhPT0gbnVsbCA/IGZvcm1hdFRpbWUodGFzay5sYXN0UnVuQXQpIDogJ1x1MjAxNCcpfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzY2hlZHVsZWRBY3Rpb24oJ3VwZGF0ZScsIHsgaWQ6IHRhc2suaWQsIGVuYWJsZWQ6ICF0YXNrLmVuYWJsZWQgfSkgfX0+e3Rhc2suZW5hYmxlZCA/IHQoJ3NjaGVkLmRpc2FibGUnKSA6IHQoJ3NjaGVkLmVuYWJsZScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNjaGVkdWxlZEFjdGlvbigncnVuJywgeyBpZDogdGFzay5pZCB9KSB9fT57dCgnc2NoZWQucnVuTm93Jyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogJ1x1NTIyMFx1OTY2NFx1OEZEOVx1NEUyQVx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1RkYxRicsIG1lc3NhZ2U6ICdcdTMwMEMnICsgdGFzay5uYW1lICsgJ1x1MzAwRFx1NUMwNlx1ODhBQlx1NkMzOFx1NEU0NVx1NTIyMFx1OTY2NFx1MzAwMicsIGRhbmdlcjogdHJ1ZSwgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgc2NoZWR1bGVkQWN0aW9uKCdkZWxldGUnLCB7IGlkOiB0YXNrLmlkIH0pIH0gfSkgfX0+XHUyNzE1PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9DYXJkPlxyXG4gICAgPC8+XHJcbiAgKVxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHU5ODc1XHU3QjdFIFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IG5vdGVzVGFiID0gKFxyXG4gICAgPD5cclxuICAgICAgey8qIFx1MjUwMFx1MjUwMCBcdTdCMTRcdThCQjBcdUZGMUFcdTUzNjFcdTcyNDdcdTVGMEZcdTk2MDVcdThCRkIgKyBcdTU5MUFcdTg4NENcdTdGMTZcdThGOTEgKyBcdTY0MUNcdTdEMjIgKyBBSSBcdTYwM0JcdTdFRDMgXHUyNTAwXHUyNTAwICovfVxyXG4gICAgICA8Q2FyZCB0aXRsZT17dCgnbm90ZXMudGl0bGUnKX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIHdpZHRoOiAyMjAgfX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ25vdGVzLnNlYXJjaCcpfVxyXG4gICAgICAgICAgICB2YWx1ZT17bm90ZVNlYXJjaH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVTZWFyY2goZS50YXJnZXQudmFsdWUpIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxyXG4gICAgICAgICAgeygoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTdW1tYXJ5ID0gbm90ZXMuZmlsdGVyKChub3RlKSA9PiBub3RlLnNoYSA9PT0gJ3N1bW1hcnknKS5zb3J0KChhLCBiKSA9PiBiLmNyZWF0ZWRBdCAtIGEuY3JlYXRlZEF0KVswXVxyXG4gICAgICAgICAgICBjb25zdCBuZXdDb21taXRzID0gbGFzdFN1bW1hcnkgPT09IHVuZGVmaW5lZCA/IC0xXHJcbiAgICAgICAgICAgICAgOiAoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLmZpbHRlcigoY29tbWl0KSA9PiBjb21taXQuZGF0ZSA+IGxhc3RTdW1tYXJ5LmNyZWF0ZWRBdCkubGVuZ3RoXHJcbiAgICAgICAgICAgIGlmIChuZXdDb21taXRzID09PSAtMSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnbm90ZXMuZGlnZXN0TmV2ZXInKX08L3NwYW4+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5ld0NvbW1pdHMgPT09IDApIHJldHVybiBudWxsXHJcbiAgICAgICAgICAgIHJldHVybiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+e3QoJ25vdGVzLmRpZ2VzdFBlbmRpbmcnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcobmV3Q29tbWl0cykpfTwvc3Bhbj5cclxuICAgICAgICAgIH0pKCl9XHJcbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17YWlTdW1tYXJpemluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFpU3VtbWFyaXplKCkgfX0+XHJcbiAgICAgICAgICAgIHthaVN1bW1hcml6aW5nID8gdCgnbm90ZXMuYWlTdW1tYXJ5UnVuJykgOiAnXHUyNzI4ICcgKyB0KCdub3Rlcy5haVN1bW1hcnknKX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLmZvcm1Sb3csIGJvcmRlcjogJzFweCBkYXNoZWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBwYWRkaW5nOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ25vdGVzLmZvcm1UaXRsZScpfSB2YWx1ZT17bm90ZVRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCB9fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMudGFnc0hpbnQnKX0gdmFsdWU9e25vdGVUYWdzfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVRhZ3MoZS50YXJnZXQudmFsdWUpIH19IC8+XHJcbiAgICAgICAgICA8dGV4dGFyZWFcclxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX1cclxuICAgICAgICAgICAgcm93cz17Nn1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ25vdGVzLmNvbnRlbnRIaW50Jyl9XHJcbiAgICAgICAgICAgIHZhbHVlPXtub3RlQ29udGVudH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVDb250ZW50KGUudGFyZ2V0LnZhbHVlKSB9fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHJcbiAgICAgICAgICAgICAge3QoJ25vdGVzLmJvdW5kVG8nKX06IHtzZWxlY3RlZFRhcmdldHNbMF0gPT09ICd3b3JraW5nJyA/IHQoJ3JlcG8ud29ya2luZycpIDogc2VsZWN0ZWRUYXJnZXRzWzBdLnNsaWNlKDAsIDgpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17bm90ZVRpdGxlLnRyaW0oKSA9PT0gJycgfHwgbm90ZUNvbnRlbnQudHJpbSgpID09PSAnJ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFkZE5vdGUoKSB9fT57dCgnbm90ZXMuYWRkJyl9PC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7KCgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGtleXdvcmQgPSBub3RlU2VhcmNoLnRyaW0oKS50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICBjb25zdCBtYXRjaGVkID0ga2V5d29yZCA9PT0gJydcclxuICAgICAgICAgICAgPyBub3Rlc1xyXG4gICAgICAgICAgICA6IG5vdGVzLmZpbHRlcigobm90ZSkgPT4gKG5vdGUudGl0bGUgKyAnICcgKyBub3RlLmNvbnRlbnQgKyAnICcgKyAobm90ZS50YWdzID8/IFtdKS5qb2luKCcgJykpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoa2V5d29yZCkpXHJcbiAgICAgICAgICAvLyBcdTdGNkVcdTk4NzZcdTRGMThcdTUxNDhcdUZGMENcdTUxNzZcdTRGNTlcdTYzMDlcdTUyMUJcdTVFRkFcdTY1RjZcdTk1RjRcdTUwMTJcdTVFOEZcdTMwMDJcclxuICAgICAgICAgIGNvbnN0IHZpc2libGUgPSBbLi4ubWF0Y2hlZF0uc29ydCgobGVmdCwgcmlnaHQpID0+XHJcbiAgICAgICAgICAgIE51bWJlcihyaWdodC5waW5uZWQgPT09IHRydWUpIC0gTnVtYmVyKGxlZnQucGlubmVkID09PSB0cnVlKSB8fCByaWdodC5jcmVhdGVkQXQgLSBsZWZ0LmNyZWF0ZWRBdClcclxuICAgICAgICAgIGlmICh2aXNpYmxlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57bm90ZXMubGVuZ3RoID09PSAwID8gdCgnbm90ZXMuZW1wdHknKSA6IHQoJ25vdGVzLmVtcHR5U2VhcmNoJyl9PC9kaXY+XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdmlzaWJsZS5tYXAoKG5vdGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNTdW1tYXJ5ID0gbm90ZS5zaGEgPT09ICdzdW1tYXJ5J1xyXG4gICAgICAgICAgICBjb25zdCBlZGl0aW5nID0gZWRpdGluZ05vdGUgIT09IG51bGwgJiYgZWRpdGluZ05vdGUuaWQgPT09IG5vdGUuaWQgPyBlZGl0aW5nTm90ZSA6IG51bGxcclxuICAgICAgICAgICAgY29uc3QgZXhwYW5kZWQgPSBub3RlRXhwYW5kZWRbbm90ZS5pZF0gPT09IHRydWVcclxuICAgICAgICAgICAgY29uc3QgbG9uZyA9IG5vdGUuY29udGVudC5sZW5ndGggPiAyNjAgfHwgbm90ZS5jb250ZW50LnNwbGl0KCdcXG4nKS5sZW5ndGggPiA2XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAga2V5PXtub3RlLmlkfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLm5vdGVDYXJkLFxyXG4gICAgICAgICAgICAgICAgICAuLi4oaXNTdW1tYXJ5ID8geyBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wNCknLCBib3JkZXJDb2xvcjogJ3JnYmEoMzcsOTksMjM1LDAuMyknIH0gOiB7fSksXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtlZGl0aW5nICE9PSBudWxsID8gKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHZhbHVlPXtlZGl0aW5nLnRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RWRpdGluZ05vdGUoeyAuLi5lZGl0aW5nLCB0aXRsZTogZS50YXJnZXQudmFsdWUgfSkgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ25vdGVzLnRhZ3NIaW50Jyl9IHZhbHVlPXtlZGl0aW5nLnRhZ3N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFZGl0aW5nTm90ZSh7IC4uLmVkaXRpbmcsIHRhZ3M6IGUudGFyZ2V0LnZhbHVlIH0pIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezEwfSB2YWx1ZT17ZWRpdGluZy5jb250ZW50fSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RWRpdGluZ05vdGUoeyAuLi5lZGl0aW5nLCBjb250ZW50OiBlLnRhcmdldC52YWx1ZSB9KSB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnNHB4IDEycHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzYXZlTm90ZUVkaXQoKSB9fT57dCgnbm90ZXMuc2F2ZScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnNHB4IDEycHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0RWRpdGluZ05vdGUobnVsbCkgfX0+e3QoJ25vdGVzLmNhbmNlbCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e2lzU3VtbWFyeSA/ICdcdUQ4M0RcdURDRDYgJyA6ICcnfXtub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/ICdcdUQ4M0RcdURDQ0MgJyA6ICcnfXtub3RlLnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiBub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIDogdW5kZWZpbmVkIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e25vdGUucGlubmVkID09PSB0cnVlID8gdCgnbm90ZXMudW5waW4nKSA6IHQoJ25vdGVzLnBpbicpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCB0b2dnbGVOb3RlUGluKG5vdGUpIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdURDQ0M8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gdGl0bGU9e3QoJ25vdGVzLmNvcHlNZEhpbnQnKX0gb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1kID0gYCMgJHtub3RlLnRpdGxlfVxcblxcbiR7bm90ZS5jb250ZW50fVxcbmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkIG5hdmlnYXRvci5jbGlwYm9hcmQ/LndyaXRlVGV4dChtZCkudGhlbigoKSA9PiBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgnbm90ZXMuY29weU1kRG9uZScpKSkuY2F0Y2goKCkgPT4gc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgXHU1OTBEXHU1MjM2XHU1OTMxXHU4RDI1JykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19Plx1RDgzRFx1RENDQiB7dCgnbm90ZXMuY29weU1kJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IHRpdGxlPXt0KCdub3Rlcy5leHBvcnRNZEhpbnQnKX0gb25DbGljaz17KCkgPT4geyBleHBvcnROb3RlKG5vdGUpIH19Plx1RDgzRFx1RENCRSB7dCgnbm90ZXMuZXhwb3J0TWQnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gdGl0bGU9e3QoJ25vdGVzLnRvTWVtb3J5SGludCcpfSBvbkNsaWNrPXsoKSA9PiB7IHNldE1lbW9yeVRpdGxlKG5vdGUudGl0bGUpOyBzZXRNZW1vcnlDb250ZW50KG5vdGUuY29udGVudCk7IHNldEFjdGlvblJlc3VsdCh0KCdub3Rlcy50b01lbW9yeURvbmUnKSkgfX0+XHVEODNFXHVEREUwIHt0KCdub3Rlcy50b01lbW9yeScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgaWQ6IG5vdGUuaWQsIHRpdGxlOiBub3RlLnRpdGxlLCBjb250ZW50OiBub3RlLmNvbnRlbnQsIHRhZ3M6IChub3RlLnRhZ3MgPz8gW10pLmpvaW4oJywgJykgfSkgfX0+e3QoJ25vdGVzLmVkaXQnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6ICdcdTUyMjBcdTk2NjRcdThGRDlcdTY3NjFcdTdCMTRcdThCQjBcdUZGMUYnLCBtZXNzYWdlOiAnXHUzMDBDJyArIG5vdGUudGl0bGUgKyAnXHUzMDBEXHU1QzA2XHU4OEFCXHU2QzM4XHU0RTQ1XHU1MjIwXHU5NjY0XHVGRjBDXHU0RTBEXHU1M0VGXHU2MDYyXHU1OTBEXHUzMDAyJywgZGFuZ2VyOiB0cnVlLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCByZW1vdmVOb3RlKG5vdGUuaWQpIH0gfSkgfX0+XHUyNzE1PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7aXNTdW1tYXJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICA/IDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCAuLi4obG9uZyAmJiAhZXhwYW5kZWQgPyBzdHlsZXMubm90ZUNsYW1wIDoge30pIH19PntyZW5kZXJTdHJ1Y3R1cmVkQ29udGVudChub3RlLmNvbnRlbnQpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgOiA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ29udGVudCwgLi4uKGxvbmcgJiYgIWV4cGFuZGVkID8gc3R5bGVzLm5vdGVDbGFtcCA6IHt9KSB9fT57bm90ZS5jb250ZW50fTwvZGl2Pn1cclxuICAgICAgICAgICAgICAgICAgICB7bG9uZyAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMubGlua0J0bn0gb25DbGljaz17KCkgPT4geyBzZXROb3RlRXhwYW5kZWQoeyAuLi5ub3RlRXhwYW5kZWQsIFtub3RlLmlkXTogIWV4cGFuZGVkIH0pIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZXhwYW5kZWQgPyB0KCdub3Rlcy5jb2xsYXBzZScpIDogdCgnbm90ZXMuZXhwYW5kJyl9XHVGRjA4e25vdGUuY29udGVudC5sZW5ndGh9IFx1NUI1N1x1RkYwOVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICB7KG5vdGUudGFncyA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luVG9wOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyhub3RlLnRhZ3MgPz8gW10pLm1hcCgodGFnKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0YWd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoJyMyNTYzZWInKSwgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlcjogJ25vbmUnLCBwYWRkaW5nOiAnMXB4IDhweCcsIGJvcmRlclJhZGl1czogJzk5OXB4JywgZm9udFNpemU6ICcxMHB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXROb3RlU2VhcmNoKHRhZykgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA+I3t0YWd9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e25ldyBEYXRlKG5vdGUuY3JlYXRlZEF0KS50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIHtub3RlLnVwZGF0ZWRBdCAhPT0gdW5kZWZpbmVkICYmIG5vdGUudXBkYXRlZEF0ID4gbm90ZS5jcmVhdGVkQXQgKyAxMDAwICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHVGRjA4e3QoJ25vdGVzLmVkaXRlZEF0Jyl9IHtuZXcgRGF0ZShub3RlLnVwZGF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX1cdUZGMDk8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAge2lzU3VtbWFyeSAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9Pnt0KCdub3Rlcy5zdW1tYXJ5VGFnJyl9PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgIHtub3RlLnNoYSAhPT0gdW5kZWZpbmVkICYmIG5vdGUuc2hhICE9PSAnc3VtbWFyeScgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9Pntub3RlLnNoYSA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiBub3RlLnNoYS5zbGljZSgwLCA4KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSkoKX1cclxuICAgICAgPC9DYXJkPlxyXG4gICAgICA8Q2FyZCB0aXRsZT17dCgnbWVtb3J5LnpvbmVUaXRsZScpICsgKHByb2plY3QgIT09IG51bGwgPyAnIFx1MDBCNyAnICsgcHJvamVjdC5uYW1lIDogJycpfT5cclxuICAgICAgICB7LyogXHU1NDBDXHU2QjY1XHU3MkI2XHU2MDAxXHU2NzYxXHVGRjFBXHU1N0ZBXHU3RUJGICsgXHU4NDNEXHU1NDBFXHU2M0QwXHU0RUE0XHU2NTcwICsgXHU1NDBDXHU2QjY1XHU2MzA5XHU5NEFFICsgXHU1NDBDXHU2QjY1XHU2MkE1XHU1NDRBICovfVxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luQm90dG9tOiAnOHB4JywgcGFkZGluZzogJzZweCAxMHB4JywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknLCBib3JkZXJSYWRpdXM6ICc4cHgnIH19PlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JyB9fT5cdUQ4M0RcdUREMDQge3QoJ21lbW9yeS5zeW5jQmFzZWxpbmUnKX1cdUZGMUE8Yj57bWVtb3JpZXNEYXRhPy5iYXNlbGluZT8uc2hhICE9IG51bGwgPyBtZW1vcmllc0RhdGEuYmFzZWxpbmUuc2hhLnNsaWNlKDAsIDgpIDogdCgnbWVtb3J5LnN5bmNOb25lJyl9PC9iPjwvc3Bhbj5cclxuICAgICAgICAgIHttZW1vcmllc0RhdGE/LmJyYW5jaCAhPSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM1NjljZDYnKX0+e21lbW9yaWVzRGF0YS5icmFuY2h9PC9zcGFuPn1cclxuICAgICAgICAgIHsobWVtb3JpZXNEYXRhPy5iZWhpbmRDb3VudCA/PyAwKSA+IDAgJiYgKFxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSB9fT57dCgnbWVtb3J5LmJlaGluZCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhtZW1vcmllc0RhdGE/LmJlaGluZENvdW50ID8/IDApKX08L3NwYW4+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxyXG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IGRpc2FibGVkPXttZW1vcnlTeW5jaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc3luY01lbW9yaWVzKCkgfX0+XHJcbiAgICAgICAgICAgIHttZW1vcnlTeW5jaW5nID8gdCgnbWVtb3J5LnN5bmNpbmcnKSA6ICdcdUQ4M0RcdUREMDQgJyArIHQoJ21lbW9yeS5zeW5jJyl9XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7c3luY1JlcG9ydCAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnLCBwYWRkaW5nOiAnOHB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBiYWNrZ3JvdW5kOiBzeW5jUmVwb3J0Lm9rID09PSBmYWxzZSA/ICdyZ2JhKDIwOSwzNiw0NywwLjA2KScgOiAncmdiYSg3OCwyMDEsMTc2LDAuMDYpJywgYm9yZGVyOiAnMXB4IHNvbGlkICcgKyAoc3luY1JlcG9ydC5vayA9PT0gZmFsc2UgPyAncmdiYSgyMDksMzYsNDcsMC4zKScgOiAncmdiYSg3OCwyMDEsMTc2LDAuMyknKSB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+e3N5bmNSZXBvcnQub2sgPT09IGZhbHNlID8gJ1x1MjcxNyAnICsgdCgnbWVtb3J5LnN5bmNGYWlsZWQnKSA6ICdcdTI3MTMgJyArIChzeW5jUmVwb3J0LnZlcmRpY3QgPz8gJycpfTwvZGl2PlxyXG4gICAgICAgICAgICB7c3luY1JlcG9ydC5vayAhPT0gZmFsc2UgJiYgKHN5bmNSZXBvcnQuc3RhbGVQcm9wb3NhbHMgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JyB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwIH19Pnt0KCdtZW1vcnkuc3RhbGVUaXRsZScpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgeyhzeW5jUmVwb3J0LnN0YWxlUHJvcG9zYWxzID8/IFtdKS5tYXAoKHByb3Bvc2FsKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtwcm9wb3NhbC5pZH0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19Pntwcm9wb3NhbC50aXRsZX0gXHUyMDE0XHUyMDE0IHtwcm9wb3NhbC5yZWFzb259PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzFweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhcHBseVN5bmMoW3Byb3Bvc2FsLmlkXSwgJ21hcmstc3RhbGUnKSB9fT57dCgnbWVtb3J5Lm1hcmtTdGFsZScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzFweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhcHBseVN5bmMoW3Byb3Bvc2FsLmlkXSwgJ2FyY2hpdmUnKSB9fT57dCgnbWVtb3J5LmFyY2hpdmVCdG4nKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcxcHggOHB4JywgZm9udFNpemU6ICcxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFN5bmNSZXBvcnQoKHByZXZpb3VzKSA9PiBwcmV2aW91cyA9PT0gbnVsbCA/IG51bGwgOiB7IC4uLnByZXZpb3VzLCBzdGFsZVByb3Bvc2FsczogKHByZXZpb3VzLnN0YWxlUHJvcG9zYWxzID8/IFtdKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT09IHByb3Bvc2FsLmlkKSB9KSB9fT57dCgnbWVtb3J5LmtlZXBBY3RpdmUnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAge3N5bmNSZXBvcnQub2sgIT09IGZhbHNlICYmIChzeW5jUmVwb3J0Lm5ld0NhbmRpZGF0ZXMgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JywgZm9udFNpemU6ICcxMXB4JyB9fT5cclxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCB9fT57dCgnbWVtb3J5Lm5ld0NhbmRpZGF0ZXMnKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB7KHN5bmNSZXBvcnQubmV3Q2FuZGlkYXRlcyA/PyBbXSkubWFwKChjYW5kaWRhdGUsIGluZGV4KSA9PiA8ZGl2IGtleT17aW5kZXh9Plx1RkYwQiBbe2NhbmRpZGF0ZS50eXBlfV0ge2NhbmRpZGF0ZS50aXRsZX08L2Rpdj4pfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5saW5rQnRuLCBtYXJnaW5Ub3A6ICc0cHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0U3luY1JlcG9ydChudWxsKSB9fT57dCgnbWVtb3J5LmNsb3NlUmVwb3J0Jyl9PC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgIHsvKiBcdTYyNEJcdTUyQThcdTZERkJcdTUyQTBcdUZGMUFcdTY4MDdcdTk4OTggLyBcdTdDN0JcdTU3OEIgLyBcdTRGNUNcdTc1MjhcdTU3REYgLyBcdTUxODVcdTVCQjkgKi99XHJcbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxyXG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLm1lbW9yeVRpdGxlJyl9IHZhbHVlPXttZW1vcnlUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeVRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxyXG4gICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nIH19IHZhbHVlPXttZW1vcnlUeXBlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0TWVtb3J5VHlwZShlLnRhcmdldC52YWx1ZSkgfX0+XHJcbiAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhNRU1PUllfVFlQRV9MQUJFTFMpLm1hcCgoW3ZhbHVlLCBsYWJlbF0pID0+IDxvcHRpb24ga2V5PXt2YWx1ZX0gdmFsdWU9e3ZhbHVlfT57bGFiZWx9PC9vcHRpb24+KX1cclxuICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nIH19IHZhbHVlPXttZW1vcnlTY29wZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeVNjb3BlKGUudGFyZ2V0LnZhbHVlIGFzICdwcm9qZWN0JyB8ICdicmFuY2gnKSB9fT5cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInByb2plY3RcIj57dCgnbWVtb3J5LnNjb3BlUHJvamVjdCcpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYnJhbmNoXCI+e3QoJ21lbW9yeS5zY29wZUJyYW5jaCcpfTwvb3B0aW9uPlxyXG4gICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcm93cz17M30gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0ubWVtb3J5Q29udGVudCcpfSB2YWx1ZT17bWVtb3J5Q29udGVudH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeUNvbnRlbnQoZS50YXJnZXQudmFsdWUpIH19IC8+XHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBtZW1vcnlUaXRsZS50cmltKCkgPT09ICcnIHx8IG1lbW9yeUNvbnRlbnQudHJpbSgpID09PSAnJ31cclxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdyZWNvcmRNZW1vcnknLCAnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5JywgeyBtZW1vcnlUeXBlLCBzY29wZTogbWVtb3J5U2NvcGUsIHRpdGxlOiBtZW1vcnlUaXRsZS50cmltKCksIGNvbnRlbnQ6IG1lbW9yeUNvbnRlbnQudHJpbSgpIH0pLnRoZW4oYXN5bmMgKCkgPT4geyBzZXRNZW1vcnlUaXRsZSgnJyk7IHNldE1lbW9yeUNvbnRlbnQoJycpOyBhd2FpdCBsb2FkTWVtb3JpZXMoKSB9KSB9fT5cclxuICAgICAgICAgICAgICB7YnVzeSA9PT0gJ3JlY29yZE1lbW9yeScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnbWVtb3J5LnJlY29yZCcpfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHsoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgYWxsID0gbWVtb3JpZXNEYXRhPy5tZW1vcmllcyA/PyBbXVxyXG4gICAgICAgICAgY29uc3QgcGVuZGluZyA9IGFsbC5maWx0ZXIoKG1lbW9yeSkgPT4gIW1lbW9yeS5pc0h1bWFuQ29uZmlybWVkICYmIG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnKVxyXG4gICAgICAgICAgY29uc3QgYWN0aXZlID0gYWxsLmZpbHRlcigobWVtb3J5KSA9PiBtZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJylcclxuICAgICAgICAgIGNvbnN0IGdyb3VwZWQgPSBuZXcgTWFwPHN0cmluZywgTWVtb3J5RW50cnlbXT4oKVxyXG4gICAgICAgICAgZm9yIChjb25zdCBtZW1vcnkgb2YgYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBncm91cGVkLmdldChtZW1vcnkudHlwZSkgPz8gW11cclxuICAgICAgICAgICAgbGlzdC5wdXNoKG1lbW9yeSlcclxuICAgICAgICAgICAgZ3JvdXBlZC5zZXQobWVtb3J5LnR5cGUsIGxpc3QpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIHtwZW5kaW5nLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+XHUyM0YzIHt0KCdtZW1vcnkucGVuZGluZ1F1ZXVlJyl9XHVGRjA4e1N0cmluZyhwZW5kaW5nLmxlbmd0aCl9XHVGRjA5PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIHtwZW5kaW5nLm1hcCgobWVtb3J5KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e21lbW9yeS5pZH0gc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDYXJkLCBib3JkZXJDb2xvcjogJ3JnYmEoMzcsOTksMjM1LDAuMyknLCBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wMyknIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVUZXh0fT57bWVtb3J5LnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFNocmluazogMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgY29uZmlybU1lbW9yeShtZW1vcnkuaWQpLnRoZW4oKCkgPT4geyB2b2lkIGxvYWRNZW1vcmllcygpIH0pIH19Pnt0KCdtZW1vcnkuY29uZmlybScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ3N0YXR1cycsIHsgaWQ6IG1lbW9yeS5pZCwgc3RhdHVzOiAnYXJjaGl2ZWQnIH0pIH19Pnt0KCdtZW1vcnkuYXJjaGl2ZUJ0bicpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVDb250ZW50fT57bWVtb3J5LmNvbnRlbnR9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCdyZ2JhKDM3LDk5LDIzNSwwLjE1KScpfT57TUVNT1JZX1NPVVJDRV9MQUJFTFNbbWVtb3J5LnNvdXJjZVRhZ10gPz8gbWVtb3J5LnNvdXJjZVRhZ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuYmFzaXNTaGEgIT09IG51bGwgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57bWVtb3J5LmJhc2lzU2hhLnNsaWNlKDAsIDgpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIHtbLi4uZ3JvdXBlZC5lbnRyaWVzKCldLm1hcCgoW3R5cGUsIGl0ZW1zXSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e3R5cGV9IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2VjdGlvblRpdGxlfT57TUVNT1JZX1RZUEVfTEFCRUxTW3R5cGVdID8/IHR5cGV9XHVGRjA4e1N0cmluZyhpdGVtcy5sZW5ndGgpfVx1RkYwOTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICB7aXRlbXMubWFwKChtZW1vcnkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17bWVtb3J5LmlkfSBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNhcmQsIG9wYWNpdHk6IG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnID8gMSA6IDAuNiB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e21lbW9yeS5pc0h1bWFuQ29uZmlybWVkID8gJ1x1MjcwNSAnIDogJyd9e21lbW9yeS50aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAsIGZsZXhXcmFwOiAnd3JhcCcsIGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHshbWVtb3J5LmlzSHVtYW5Db25maXJtZWQgJiYgbWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGNvbmZpcm1NZW1vcnkobWVtb3J5LmlkKS50aGVuKCgpID0+IHsgdm9pZCBsb2FkTWVtb3JpZXMoKSB9KSB9fT57dCgnbWVtb3J5LmNvbmZpcm0nKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5VG9Ob3RlKG1lbW9yeSkgfX0+XHVEODNEXHVEQ0M0IHt0KCdtZW1vcnkudG9Ob3RlJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5zY29wZSA9PT0gJ2JyYW5jaCcgJiYgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeUFjdGlvbignbm9ybWFsaXplJywgeyBpZDogbWVtb3J5LmlkIH0pIH19Plx1MjFGMSB7dCgnbWVtb3J5Lm5vcm1hbGl6ZScpfTwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeUFjdGlvbignc3RhdHVzJywgeyBpZDogbWVtb3J5LmlkLCBzdGF0dXM6ICdhcmNoaXZlZCcgfSkgfX0+e3QoJ21lbW9yeS5hcmNoaXZlQnRuJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ3N0YXR1cycsIHsgaWQ6IG1lbW9yeS5pZCwgc3RhdHVzOiAnYWN0aXZlJyB9KSB9fT57dCgnbWVtb3J5LnJlc3RvcmUnKX08L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ29udGVudCwgbWF4SGVpZ2h0OiA4NCwgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PnttZW1vcnkuY29udGVudH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlTWV0YX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc3RhdHVzID09PSAnc3RhbGUnICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNkOTc3MDYnKX0+e3QoJ21lbW9yeS5zdGF0dXNTdGFsZScpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc2NvcGUgPT09ICdicmFuY2gnICYmIG1lbW9yeS5naXRCcmFuY2ggIT09IG51bGwgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzU2OWNkNicpfT5cdTIzODcge21lbW9yeS5naXRCcmFuY2h9PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSgzNyw5OSwyMzUsMC4xNSknKX0+e01FTU9SWV9TT1VSQ0VfTEFCRUxTW21lbW9yeS5zb3VyY2VUYWddID8/IG1lbW9yeS5zb3VyY2VUYWd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LmJhc2lzU2hhICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e21lbW9yeS5iYXNpc1NoYS5zbGljZSgwLCA4KX08L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bmV3IERhdGUobWVtb3J5LnVwZGF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICB7YWxsLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdtZW1vcnkuZW1wdHknKX08L2Rpdj59XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH0pKCl9XHJcbiAgICAgIDwvQ2FyZD5cclxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2NvbmNlcHRzLnRpdGxlJyl9PlxyXG4gICAgICAgIHtjb25jZXB0cy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdjb25jZXB0cy5ub25lJyl9PC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cclxuICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgIDx0cj57Wydjb25jZXB0cy5jb2wubmFtZScsICdjb25jZXB0cy5jb2wuY2F0ZWdvcnknLCAnY29uY2VwdHMuY29sLmNvdW50J10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHtjb25jZXB0cy5tYXAoKGNvbmNlcHQpID0+IChcclxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e2NvbmNlcHQuaWR9PlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2NvbmNlcHQubmFtZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2NvbmNlcHQuY2F0ZWdvcnl9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntTdHJpbmcoY29uY2VwdC5vY2N1cnJlbmNlcyl9PC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQ2FyZD5cclxuICAgIDwvPlxyXG4gIClcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFJldmlldyBcdTk1RUVcdTk4OThcdTk4NzVcdTdCN0VcdUZGMUFcdTUxNjhcdTkxQ0ZcdTk1RUVcdTk4OThcdTc3MEJcdTY3N0ZcdUZGMDhcdTdFREZcdThCQTEgKyBcdTdCNUJcdTkwMDkgKyBcdTcyQjZcdTYwMDFcdTZENDFcdThGNkNcdUZGMDkrIFx1OUE4Q1x1NjUzNlx1OEJCMFx1NUY1NSBcdTI1MDBcdTI1MDBcclxuICBjb25zdCByZXZpZXdUYWIgPSAoXHJcbiAgICA8PlxyXG4gICAgICB7cmVzdWx0UGFuZWx9XHJcbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdyZXZpZXcucmVjb3Jkc1RpdGxlJyl9PlxyXG4gICAgICAgIHsoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgYWxsID0gKGlzc3Vlc0RhdGEgPz8gW10pLm1hcCgoaXNzdWUpID0+ICh7IC4uLmlzc3VlLCBzZXZlcml0eTogbm9ybWFsaXplSXNzdWVTZXZlcml0eShpc3N1ZS5zZXZlcml0eSkgfSkpXHJcbiAgICAgICAgICBjb25zdCBvcGVuQ291bnQgPSBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykubGVuZ3RoXHJcbiAgICAgICAgICAvLyBcdThCQTFcdTY1NzAgY2hpcHMgXHU4RERGXHU5NjhGXHU3MkI2XHU2MDAxXHU3QjVCXHU5MDA5XHVGRjA4XCJcdTUxNjhcdTkwRThcIj0gXHU3MkI2XHU2MDAxXHU3QjVCXHU5MDA5XHU1NDBFXHU3Njg0XHU2MDNCXHU2NTcwXHVGRjA5XHVGRjFBXHU5MDA5XCJcdTVERjJcdTg5RTNcdTUxQjNcIlx1NTQwRVx1NTQwNFx1NEUyNVx1OTFDRFx1NUVBNlx1NjU3MFx1NUI1N1x1N0FDQlx1NTM3M1x1NUJGOVx1NUU5NFx1NURGMlx1ODlFM1x1NTFCM1x1NTIxN1x1ODg2OFx1MzAwMlxyXG4gICAgICAgICAgY29uc3Qgc3RhdHVzRmlsdGVyZWQgPSBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWVTdGF0dXNGaWx0ZXIgPT09ICcnIHx8IGlzc3VlLnN0YXR1cyA9PT0gaXNzdWVTdGF0dXNGaWx0ZXIpXHJcbiAgICAgICAgICBjb25zdCBjb3VudHM6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfT4gPSBbXHJcbiAgICAgICAgICAgIHsga2V5OiAnJywgbGFiZWw6IHQoJ3Jldmlldy5maWx0ZXJBbGwnKSwgY291bnQ6IHN0YXR1c0ZpbHRlcmVkLmxlbmd0aCB9LFxyXG4gICAgICAgICAgICB7IGtleTogJ2NyaXRpY2FsJywgbGFiZWw6ICdjcml0aWNhbCcsIGNvdW50OiBzdGF0dXNGaWx0ZXJlZC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBpc3N1ZS5zZXZlcml0eSA9PT0gJ2Jsb2NrZXInKS5sZW5ndGggfSxcclxuICAgICAgICAgICAgeyBrZXk6ICdtYWpvcicsIGxhYmVsOiAnbWFqb3InLCBjb3VudDogc3RhdHVzRmlsdGVyZWQuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdtYWpvcicpLmxlbmd0aCB9LFxyXG4gICAgICAgICAgICB7IGtleTogJ21pbm9yJywgbGFiZWw6ICdtaW5vcicsIGNvdW50OiBzdGF0dXNGaWx0ZXJlZC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zZXZlcml0eSA9PT0gJ21pbm9yJykubGVuZ3RoIH0sXHJcbiAgICAgICAgICAgIHsga2V5OiAnaW5mbycsIGxhYmVsOiAnaW5mbycsIGNvdW50OiBzdGF0dXNGaWx0ZXJlZC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2luZm8nKS5sZW5ndGggfSxcclxuICAgICAgICAgIF1cclxuICAgICAgICAgIGNvbnN0IHZpc2libGUgPSBzdGF0dXNGaWx0ZXJlZFxyXG4gICAgICAgICAgICAuZmlsdGVyKChpc3N1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChpc3N1ZVNldmVyaXR5RmlsdGVyID09PSAnJykgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgICBpZiAoaXNzdWVTZXZlcml0eUZpbHRlciA9PT0gJ2NyaXRpY2FsJykgcmV0dXJuIGlzc3VlLnNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IGlzc3VlLnNldmVyaXR5ID09PSAnYmxvY2tlcidcclxuICAgICAgICAgICAgICByZXR1cm4gaXNzdWUuc2V2ZXJpdHkgPT09IGlzc3VlU2V2ZXJpdHlGaWx0ZXJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIGNvbnN0IGNoZWNrZWRWaXNpYmxlID0gdmlzaWJsZS5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZUNoZWNrZWRbaXNzdWUuaWRdID09PSB0cnVlKVxyXG4gICAgICAgICAgY29uc3QgY2hlY2tlZE9wZW4gPSBjaGVja2VkVmlzaWJsZS5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKVxyXG4gICAgICAgICAgY29uc3QgY2hlY2tlZE9wZW5UYXJnZXRzID0gQXJyYXkuZnJvbShuZXcgU2V0KGNoZWNrZWRPcGVuLm1hcCgoaXNzdWUpID0+IGlzc3VlLmNoYW5nZUlkKSkpXHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XHJcbiAgICAgICAgICAgICAgICB7Y291bnRzLm1hcCgoaXRlbSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGtleT17aXRlbS5rZXkgPT09ICcnID8gJ2FsbCcgOiBpdGVtLmtleX0gc3R5bGU9e3N0eWxlcy5jaGlwKGlzc3VlU2V2ZXJpdHlGaWx0ZXIgPT09IGl0ZW0ua2V5KX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldElzc3VlU2V2ZXJpdHlGaWx0ZXIoaXRlbS5rZXkpIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLmxhYmVsfSBcdTAwQjcge2l0ZW0uY291bnR9XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAnMTZweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxyXG4gICAgICAgICAgICAgICAgICB7b3BlbkNvdW50fSBcdTVGODVcdTU5MDRcdTc0MDYgLyBcdTUxNzEge2FsbC5sZW5ndGh9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB7KHN0YXRlPy5yZXNvbHZlZElzc3VlUmV0ZW50aW9uRGF5cyA/PyAwKSA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcucmV0ZW50aW9uSGludCcpLnJlcGxhY2UoJ3tkYXlzfScsIFN0cmluZyhzdGF0ZT8ucmVzb2x2ZWRJc3N1ZVJldGVudGlvbkRheXMgPz8gNykpfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIHdpZHRoOiAnMTRweCcsIGhlaWdodDogJzE0cHgnLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLCBmb250U2l6ZTogJzEwcHgnLCBsaW5lSGVpZ2h0OiAxLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgY3Vyc29yOiAnaGVscCcsIHVzZXJTZWxlY3Q6ICdub25lJywgZmxleFNocmluazogMCB9fVxyXG4gICAgICAgICAgICAgICAgICA+Pzwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cclxuICAgICAgICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJywgcGFkZGluZzogJzNweCAyNHB4IDNweCA4cHgnIH19IHZhbHVlPXtpc3N1ZVN0YXR1c0ZpbHRlcn0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldElzc3VlU3RhdHVzRmlsdGVyKGUudGFyZ2V0LnZhbHVlKSB9fT5cclxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt0KCdyZXZpZXcuc3RhdHVzQWxsJyl9PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhJU1NVRV9TVEFUVVNfTEFCRUxTKS5tYXAoKFt2YWx1ZSwgbGFiZWxdKSA9PiA8b3B0aW9uIGtleT17dmFsdWV9IHZhbHVlPXt2YWx1ZX0+e2xhYmVsfTwvb3B0aW9uPil9XHJcbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRJc3N1ZUNoZWNrZWQoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGxDaGVja2VkID0gdmlzaWJsZS5ldmVyeSgoaXNzdWUpID0+IHByZXZpb3VzW2lzc3VlLmlkXSA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH1cclxuICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXNzdWUgb2YgdmlzaWJsZSkgbmV4dFtpc3N1ZS5pZF0gPSAhYWxsQ2hlY2tlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHRcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPnt0KCdyZXZpZXcuc2VsZWN0QWxsJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSB0aXRsZT17dCgncmV2aWV3LmV4cG9ydE1kSGludCcpfSBvbkNsaWNrPXsoKSA9PiB7IGV4cG9ydElzc3Vlc01kKHZpc2libGUpIH19Pnt0KCdyZXZpZXcuZXhwb3J0TWQnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcudHJpYWdlSGludCcpfVxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3BlbkNvdW50ID0gdmlzaWJsZS5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKS5sZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BlbkNvdW50ID09PSAwKSB7IHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyB0KCdmaXguZGlzcGF0Y2hOb09wZW4nKSk7IHJldHVybiB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0Q29uZmlybURpYWxvZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdCgncmV2aWV3LnRyaWFnZUNvbmZpcm1UaXRsZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogdCgncmV2aWV3LnRyaWFnZUNvbmZpcm1Nc2cnKS5yZXBsYWNlKCd7bn0nLCAnNDAnKSxcclxuICAgICAgICAgICAgICAgICAgICAgIGRhbmdlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25maXJtTGFiZWw6IHQoJ3Jldmlldy50cmlhZ2UnKSxcclxuICAgICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHJ1blRyaWFnZSgpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID57dCgncmV2aWV3LnRyaWFnZScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkMTI0MmYnKSB9fVxyXG4gICAgICAgICAgICAgICAgICB0aXRsZT17dCgncmV2aWV3LnB1cmdlT3BlbkhpbnQnKX1cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wZW5Db3VudCA9IHZpc2libGUuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZW5Db3VudCA9PT0gMCkgeyBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgdCgnZml4LmRpc3BhdGNoTm9PcGVuJykpOyByZXR1cm4gfVxyXG4gICAgICAgICAgICAgICAgICAgIHNldENvbmZpcm1EaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHQoJ3Jldmlldy5wdXJnZU9wZW5Db25maXJtVGl0bGUnKSxcclxuICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHQoJ3Jldmlldy5wdXJnZU9wZW5Db25maXJtTXNnJykucmVwbGFjZSgne259JywgU3RyaW5nKG9wZW5Db3VudCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZGFuZ2VyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29uZmlybUxhYmVsOiB0KCdyZXZpZXcucHVyZ2VPcGVuJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBwdXJnZU9wZW5Jc3N1ZXMoKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+e3QoJ3Jldmlldy5wdXJnZU9wZW4nKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIHsoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAvLyBcdTZEM0VcdTUzRDFcdTVCRjlcdThDNjFcdUZGMUFcdTUyRkVcdTkwMDlcdTc2ODRcdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdTRGMThcdTUxNDhcdUZGMUJcdTY3MkFcdTUyRkVcdTkwMDkgPSBcdTVGNTNcdTUyNERcdTdCNUJcdTkwMDlcdTRFMEJcdTUxNjhcdTkwRThcdTVGODVcdTU5MDRcdTc0MDZcdUZGMDhcdTVFMzhcdTlBN0JcdTUxNjVcdTUzRTNcdUZGMENcdTRFMERcdTUxOERcdTg1Q0ZcdUZGMDlcdTMwMDJcclxuICAgICAgICAgICAgICAgICAgY29uc3Qgb3BlblZpc2libGUgPSB2aXNpYmxlLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpXHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrZWRJZHMgPSBvcGVuVmlzaWJsZS5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZUNoZWNrZWRbaXNzdWUuaWRdID09PSB0cnVlKS5tYXAoKGlzc3VlKSA9PiBpc3N1ZS5pZClcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaWRzID0gY2hlY2tlZElkcy5sZW5ndGggPiAwID8gY2hlY2tlZElkcyA6IG9wZW5WaXNpYmxlLm1hcCgoaXNzdWUpID0+IGlzc3VlLmlkKVxyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIGZvbnRXZWlnaHQ6IDYwMCB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ2ZpeC5kaXNwYXRjaEhpbnRNYWluJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHMubGVuZ3RoID09PSAwKSB7IHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyB0KCdmaXguZGlzcGF0Y2hOb09wZW4nKSk7IHJldHVybiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbmZpcm1EaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0KCdmaXguZGlzcGF0Y2hNb2RlVGl0bGUnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB0KCdmaXguZGlzcGF0Y2hNb2RlTXNnJykucmVwbGFjZSgne259JywgU3RyaW5nKGlkcy5sZW5ndGgpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkYW5nZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1MYWJlbDogdCgnZml4LmRpc3BhdGNoQXV0bycpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFsdDogeyBsYWJlbDogdCgnZml4LmRpc3BhdGNoUGxhbicpLCBvbkFsdDogKCkgPT4geyB2b2lkIGRpc3BhdGNoRml4KFtdLCBpZHMsICdwbGFuJykgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIGRpc3BhdGNoRml4KFtdLCBpZHMsICdmaXgnKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICA+XHVEODNEXHVERTgwIHt0KCdmaXguZGlzcGF0Y2gnKX0oe1N0cmluZyhpZHMubGVuZ3RoKX0pPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH0pKCl9XHJcbiAgICAgICAgICAgICAgICB7KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgcGVuZGluZ1BsYW5zID0gdmlzaWJsZS5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5maXhQbGFuPy5zdGF0dXMgPT09ICdwZW5kaW5nJylcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHBlbmRpbmdQbGFucy5sZW5ndGggPiAwID8gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ2ZpeC5kaXNwYXRjaFBsYW5zSGludCcpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6IHQoJ2ZpeC5kaXNwYXRjaFBsYW5zJyksIG1lc3NhZ2U6IGBcdTVDMDZcdTZEM0VcdTUzRDEgJHtTdHJpbmcocGVuZGluZ1BsYW5zLmxlbmd0aCl9IFx1NEUyQVx1NURGMlx1NEVBN1x1NTFGQVx1NzY4NFx1NEZFRVx1NTkwRFx1NjVCOVx1Njg0OFx1N0VEOVx1NUI1MCBBZ2VudCBcdTVFNzZcdTUzRDFcdTYyNjdcdTg4NENcdUZGMDhcdTcyRUNcdTdBQ0Igd29ya3RyZWVcdUZGMENcdTZEODhcdTgwMTdcdTZBMjFcdTU3OEJcdTc1MjhcdTkxQ0ZcdUZGMUJcdTVCOENcdTYyMTBcdTU0MEVcdTgxRUFcdTUyQThcdTU2REVcdTUxOTlcdTVFNzZcdTYzRDBcdTRFQTRcdUZGMDlcdTMwMDJgLCBkYW5nZXI6IGZhbHNlLCBjb25maXJtTGFiZWw6IHQoJ2ZpeC5kaXNwYXRjaFBsYW5zJyksIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIGRpc3BhdGNoRml4KHBlbmRpbmdQbGFucy5tYXAoKGlzc3VlKSA9PiBpc3N1ZS5maXhQbGFuIS5pZCksIFtdLCAnZml4JykgfSB9KSB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdURDRTYge3QoJ2ZpeC5kaXNwYXRjaFBsYW5zJyl9KHtTdHJpbmcocGVuZGluZ1BsYW5zLmxlbmd0aCl9KTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICApIDogbnVsbFxyXG4gICAgICAgICAgICAgICAgfSkoKX1cclxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkSXNzdWVzKCkgfX0+e3QoJ3Jldmlldy5yZWZyZXNoJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAge2ZpeFRhc2tzLmxlbmd0aCA+IDAgJiYgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IEZJWF9TVEFUVVNfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0geyBxdWV1ZWQ6IHQoJ2ZpeC50YXNrUXVldWVkJyksIHJ1bm5pbmc6IHQoJ2ZpeC50YXNrUnVubmluZycpLCBtZXJnaW5nOiB0KCdmaXgudGFza01lcmdpbmcnKSwgcmVkbzogdCgnZml4LnRhc2tSZWRvJyksIGRvbmU6IHQoJ2ZpeC50YXNrRG9uZScpLCBjb25mbGljdDogdCgnZml4LnRhc2tDb25mbGljdCcpLCBmYWlsZWQ6IHQoJ2ZpeC50YXNrRmFpbGVkJyksIGNhbmNlbGxlZDogdCgnZml4LnRhc2tDYW5jZWxsZWQnKSB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaXhBY3RpdmUgPSBmaXhUYXNrcy5zb21lKCh0YXNrKSA9PiB0YXNrLnN0YXR1cyA9PT0gJ3F1ZXVlZCcgfHwgdGFzay5zdGF0dXMgPT09ICdydW5uaW5nJyB8fCB0YXNrLnN0YXR1cyA9PT0gJ21lcmdpbmcnIHx8IHRhc2suc3RhdHVzID09PSAncmVkbycpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICA8Q2FyZCB0aXRsZT17J1x1RDgzRVx1REQxNiAnICsgdCgnZml4LnN0YXR1cycpfT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1N0cmluZyhmaXhUYXNrcy5maWx0ZXIoKHRhc2spID0+IHRhc2suc3RhdHVzID09PSAnZG9uZScpLmxlbmd0aCl9L3tTdHJpbmcoZml4VGFza3MubGVuZ3RoKX0ge3QoJ2ZpeC50YXNrRG9uZScpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAge2ZpeEFjdGl2ZSAmJiA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgY2FuY2VsRml4KCkgfX0+XHUyM0Y5IHt0KCdmaXguc3RvcCcpfTwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7Zml4VGFza3MubWFwKCh0YXNrKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17dGFzay5pc3N1ZUlkfSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JywgcGFkZGluZzogJzZweCA0cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMywgcmdiYSg1LDUsNSwwLjA2KSknLCBmb250U2l6ZTogJzExcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHRhc2suc3RhdHVzID09PSAnZG9uZScgPyAnIzRlYzliMCcgOiB0YXNrLnN0YXR1cyA9PT0gJ3F1ZXVlZCcgPyAnIzhiOTQ5ZScgOiB0YXNrLnN0YXR1cyA9PT0gJ3J1bm5pbmcnIHx8IHRhc2suc3RhdHVzID09PSAnbWVyZ2luZycgfHwgdGFzay5zdGF0dXMgPT09ICdyZWRvJyA/ICcjZGNkY2FhJyA6ICcjZjE0YzRjJyl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gXHU4RjZFXHU2QjIxXHU4QkVEXHU0RTQ5XHU2MzA5XHU0RUZCXHU1MkExXHU3QzdCXHU1NzhCXHU1MzNBXHU1MjA2XHVGRjA4XHU0RTFBXHU0RTNCIDIwMjYtMTEtMDRcdUZGMUFcdTg4RjhcIlx1N0IyQyBOIFx1NkIyMVwiXHU2NjEzXHU4QkVGXHU4QkZCXHU0RTNBXHU5MUNEXHU4QkQ1XHVGRjA5XHVGRjFBXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwbGFuPVx1NTFGQVx1NjVCOVx1Njg0OFx1RkYxQmZpeCtcdTY1QjlcdTY4NDhcdUZGMDhcdTY3MERcdTUyQTFcdTdBRUYgcGxhbkV4ZWMgXHU2ODA3XHU1RkQ3XHVGRjA5PVx1NjMwOVx1NjVCOVx1Njg0OFx1NjI2N1x1ODg0Q1x1RkYxQmZpeCBcdTc2RjRcdTZEM0UvXHU5MUNEXHU2RDNFPVx1NjI2N1x1ODg0Q1x1MDBCN1x1N0IyQ05cdTZCMjFcdTMwMDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYW5FeGVjID0gdGFzay5wbGFuRXhlYyA9PT0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm91bmRMYWJlbCA9IHRhc2subW9kZSA9PT0gJ3BsYW4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKHRhc2suYXR0ZW1wdCA+IDEgPyBgXHUwMEI3XHU1MUZBXHU2NUI5XHU2ODQ4XHUwMEI3XHU3QjJDICR7U3RyaW5nKHRhc2suYXR0ZW1wdCl9IFx1NkIyMWAgOiAnXHUwMEI3XHU1MUZBXHU2NUI5XHU2ODQ4JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBwbGFuRXhlY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYFx1MDBCN1x1NjI2N1x1ODg0Q1x1MDBCN1x1NjVCOVx1Njg0OCMke1N0cmluZyh0YXNrLmF0dGVtcHQpfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICh0YXNrLmF0dGVtcHQgPiAxID8gYFx1MDBCN1x1NjI2N1x1ODg0Q1x1MDBCN1x1N0IyQyAke1N0cmluZyh0YXNrLmF0dGVtcHQpfSBcdTZCMjFgIDogJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7RklYX1NUQVRVU19MQUJFTFNbdGFzay5zdGF0dXNdID8/IHRhc2suc3RhdHVzfSR7cm91bmRMYWJlbH1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmUgPSB0YXNrLnN0YXR1cyA9PT0gJ3J1bm5pbmcnIHx8IHRhc2suc3RhdHVzID09PSAnbWVyZ2luZycgfHwgdGFzay5zdGF0dXMgPT09ICdyZWRvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWN0aXZlKSByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLm1heCgwLCBNYXRoLnJvdW5kKChEYXRlLm5vdygpIC0gKHRhc2suc3RhcnRlZEF0ID8/IERhdGUubm93KCkpKSAvIDYwXzAwMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXh0cmEgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW51dGVzID4gMCA/IHQoJ2ZpeC5ydW50aW1lJykucmVwbGFjZSgne259JywgU3RyaW5nKG1pbnV0ZXMpKSA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhc2sucmVzdW1lcyA/PyAwKSA+IDAgPyB0KCdmaXgucmVzdW1lcycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyh0YXNrLnJlc3VtZXMpKSA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhc2sucHJvYmVzID8/IDApID4gMCA/IHQoJ2ZpeC5wcm9iZXMnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcodGFzay5wcm9iZXMpKSA6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0uZmlsdGVyKChwYXJ0KSA9PiBwYXJ0ICE9PSAnJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXh0cmEubGVuZ3RoID4gMCA/IDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmbGV4U2hyaW5rOiAwIH19PntleHRyYS5qb2luKCcgXHUwMEI3ICcpfTwvc3Bhbj4gOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1pbldpZHRoOiAwLCBmbGV4OiAxIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIGZvbnRXZWlnaHQ6IDYwMCwgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19Pnt0YXNrLnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7KHRhc2suc3RhdHVzID09PSAncnVubmluZycgfHwgdGFzay5zdGF0dXMgPT09ICdxdWV1ZWQnKSAmJiB0YXNrLmN1cnJlbnRBY3Rpb24gIT09IHVuZGVmaW5lZCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSwgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScgfX0+XHUyNUI4IHt0YXNrLmN1cnJlbnRBY3Rpb259PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge3Rhc2suc3VtbWFyeSAhPT0gdW5kZWZpbmVkICYmIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0YXNrLnN1bW1hcnl9PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5pbXBhY3QgIT09IHVuZGVmaW5lZCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHRhc2suaW1wYWN0LnJpc2tMZXZlbCA9PT0gJ2xvdycgPyAnIzRlYzliMCcgOiB0YXNrLmltcGFjdC5yaXNrTGV2ZWwgPT09ICdtZWRpdW0nID8gJyNkY2RjYWEnIDogJyNmMTRjNGMnKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHU1RjcxXHU1NENEIHt0YXNrLmltcGFjdC5yaXNrTGV2ZWx9KHtTdHJpbmcodGFzay5pbXBhY3Qucmlza1Njb3JlKX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeycgJ31cdTc2RjRcdTYzQTUge1N0cmluZyh0YXNrLmltcGFjdC5kaXJlY3QubGVuZ3RoKX0gXHUwMEI3IFx1OTVGNFx1NjNBNSB7U3RyaW5nKHRhc2suaW1wYWN0LmluZGlyZWN0Lmxlbmd0aCl9IFx1MDBCNyBcdTZGNUNcdTU3Mjgge1N0cmluZyh0YXNrLmltcGFjdC5wb3RlbnRpYWwubGVuZ3RoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5pbXBhY3QuaW5kaXJlY3QubGVuZ3RoID4gMCA/IGBcdUZGMDhcdTU5ODIgJHt0YXNrLmltcGFjdC5pbmRpcmVjdC5zbGljZSgwLCAyKS5qb2luKCcsICcpfVx1RkYwOWAgOiAnJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge3Rhc2suZXJyb3IgIT09IHVuZGVmaW5lZCAmJiA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkMTI0MmYnKSB9fT57dGFzay5lcnJvcn08L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsodGFzay5maWxlcyA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YXNrLmZpbGVzIS5zbGljZSgwLCA0KS5qb2luKCcsICcpfXt0YXNrLmNvbW1pdCAhPT0gdW5kZWZpbmVkID8gYCBcdTAwQjcgJHt0YXNrLmNvbW1pdH1gIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgIDwvQ2FyZD5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICB9KSgpfVxyXG4gICAgICAgICAgICAgIHsoY2hlY2tlZFZpc2libGUubGVuZ3RoID4gMCB8fCBiYXRjaFZlcmlmeVN0YXRlICE9PSBudWxsIHx8IHRyaWFnZVN0YXRlICE9PSBudWxsKSAmJiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIHBhZGRpbmc6ICc2cHggMTBweCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICB7YmF0Y2hWZXJpZnlTdGF0ZSAhPT0gbnVsbCA/IChcclxuICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JykgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx1MjNGMyB7dCgncmV2aWV3LmJhdGNoUHJvZ3Jlc3MnKS5yZXBsYWNlKCd7aX0nLCBTdHJpbmcoYmF0Y2hWZXJpZnlTdGF0ZS5kb25lKSkucmVwbGFjZSgne259JywgU3RyaW5nKGJhdGNoVmVyaWZ5U3RhdGUudG90YWwpKX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgYmF0Y2hTdG9wUmVmLmN1cnJlbnQgPSB0cnVlIH19Pnt0KCdyZXZpZXcuYmF0Y2hTdG9wJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICkgOiB0cmlhZ2VTdGF0ZSAhPT0gbnVsbCA/IChcclxuICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JykgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx1MjNGMyB7dCgncmV2aWV3LnRyaWFnZVByb2dyZXNzJykucmVwbGFjZSgne259JywgU3RyaW5nKHRyaWFnZVN0YXRlLnByb2Nlc3NlZCkpLnJlcGxhY2UoJ3ttfScsIHRyaWFnZVN0YXRlLnJlbWFpbmluZyA+PSAwID8gU3RyaW5nKHRyaWFnZVN0YXRlLnJlbWFpbmluZykgOiAnXHUyMDI2Jyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IGJhdGNoU3RvcFJlZi5jdXJyZW50ID0gdHJ1ZSB9fT57dCgncmV2aWV3LnRyaWFnZVN0b3AnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3QoJ3Jldmlldy5jaGVja2VkQ291bnQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoY2hlY2tlZFZpc2libGUubGVuZ3RoKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAge2NoZWNrZWRPcGVuVGFyZ2V0cy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcuYmF0Y2hWZXJpZnlDb25maXJtTXNnJykucmVwbGFjZSgne259JywgU3RyaW5nKGNoZWNrZWRPcGVuVGFyZ2V0cy5sZW5ndGgpKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogdCgncmV2aWV3LmJhdGNoVmVyaWZ5Q29uZmlybVRpdGxlJyksIG1lc3NhZ2U6IHQoJ3Jldmlldy5iYXRjaFZlcmlmeUNvbmZpcm1Nc2cnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoY2hlY2tlZE9wZW5UYXJnZXRzLmxlbmd0aCkpLCBkYW5nZXI6IGZhbHNlLCBjb25maXJtTGFiZWw6IHQoJ3Jldmlldy5iYXRjaFZlcmlmeScpLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBydW5CYXRjaFZlcmlmeShjaGVja2VkT3BlblRhcmdldHMpIH0gfSkgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlx1RDgzRFx1REQwRCB7dCgncmV2aWV3LmJhdGNoVmVyaWZ5Jyl9KHtTdHJpbmcoY2hlY2tlZE9wZW5UYXJnZXRzLmxlbmd0aCl9KTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgIHtjaGVja2VkT3Blbi5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1hcmtJc3N1ZXNIYW5kbGVkKGNoZWNrZWRPcGVuLm1hcCgoaXNzdWUpID0+IGlzc3VlLmlkKSkgfX0+XHUyNzEzIHt0KCdyZXZpZXcubWFya0hhbmRsZWQnKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IGV4cG9ydElzc3Vlc01kKGNoZWNrZWRWaXNpYmxlKSB9fT57dCgncmV2aWV3LmV4cG9ydE1kJyl9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldElzc3VlQ2hlY2tlZCh7fSkgfX0+e3QoJ3BpY2tlci5jbGVhcicpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICB7YWxsLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e2lzc3Vlc0RhdGEgPT09IG51bGwgPyAnXHUyMDI2JyA6IHQoJ3Jldmlldy5yZWNvcmRzRW1wdHknKX08L2Rpdj5cclxuICAgICAgICAgICAgICApIDogdmlzaWJsZS5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdub3Rlcy5lbXB0eVNlYXJjaCcpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICkgOiB2aXNpYmxlLm1hcCgoaXNzdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkID0gaXNzdWVFeHBhbmRlZFtpc3N1ZS5pZF0gPT09IHRydWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gaXNzdWUuZGVzY3JpcHRpb24gPz8gJydcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvbmcgPSBkZXNjcmlwdGlvbi5sZW5ndGggPiAyMDBcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpc3N1ZS5pZH0gc3R5bGU9e3N0eWxlcy5ub3RlQ2FyZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVJvd30+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17aXNzdWVDaGVja2VkW2lzc3VlLmlkXSA9PT0gdHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4geyBzZXRJc3N1ZUNoZWNrZWQoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW2lzc3VlLmlkXTogIShwcmV2aW91c1tpc3N1ZS5pZF0gPT09IHRydWUpIH0pKSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1hcmdpbjogMCwgZmxleFNocmluazogMCwgY3Vyc29yOiAncG9pbnRlcicsIGFjY2VudENvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHNldmVyaXR5Q29sb3IoaXNzdWUuc2V2ZXJpdHkpKX0+e2lzc3VlLnNldmVyaXR5fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2lzc3VlLmNhdGVnb3J5ID8gPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzU3NjA2YScpfT57aXNzdWUuY2F0ZWdvcnl9PC9zcGFuPiA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJyA/ICcjZGNkY2FhJyA6IGlzc3VlLnN0YXR1cyA9PT0gJ3Jlc29sdmVkJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdhY2NlcHRlZCcgPyAnIzRlYzliMCcgOiAnIzhiOGI4YicpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7SVNTVUVfU1RBVFVTX0xBQkVMU1tpc3N1ZS5zdGF0dXNdID8/IGlzc3VlLnN0YXR1c31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVRleHR9Pntpc3N1ZS50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt2ZXJpZnlpbmdUYXJnZXQgIT09IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgncmV2aWV3LnZlcmlmeUhpbnQnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCB2ZXJpZnlJc3N1ZXMoaXNzdWUuY2hhbmdlSWQpIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPnt2ZXJpZnlpbmdUYXJnZXQgPT09IGlzc3VlLmNoYW5nZUlkID8gdCgncmV2aWV3LnZlcmlmeVJ1bm5pbmcnKSA6ICdcdUQ4M0RcdUREMEQgJyArIHQoJ3Jldmlldy52ZXJpZnknKX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKSAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgncmV2aWV3LmZhbHNlUG9zaXRpdmVIaW50Jyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbmZpcm1EaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0KCdyZXZpZXcuZmFsc2VQb3NpdGl2ZVRpdGxlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogdCgncmV2aWV3LmZhbHNlUG9zaXRpdmVNc2cnKS5yZXBsYWNlKCd7dGl0bGV9JywgaXNzdWUudGl0bGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhbmdlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybUxhYmVsOiB0KCdyZXZpZXcuZmFsc2VQb3NpdGl2ZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcy9zdGF0dXMnLCB7IGlkOiBpc3N1ZS5pZCwgc3RhdHVzOiAncmVqZWN0ZWQnIH0pLnRoZW4oYXN5bmMgKHsgb2sgfSkgPT4geyBpZiAob2spIGF3YWl0IGxvYWRJc3N1ZXMoKSB9KSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XHVEODNEXHVERUFCIHt0KCdyZXZpZXcuZmFsc2VQb3NpdGl2ZScpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcubWFya0hhbmRsZWQnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtYXJrSXNzdWVzSGFuZGxlZChbaXNzdWUuaWRdKSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cdTI3MTMge3QoJ3Jldmlldy5tYXJrSGFuZGxlZCcpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge2Rlc2NyaXB0aW9uICE9PSAnJyAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ29udGVudCwgLi4uKGxvbmcgJiYgIWV4cGFuZGVkID8gc3R5bGVzLm5vdGVDbGFtcCA6IHt9KSB9fT57cmVuZGVyV2l0aFBlZWsoZGVzY3JpcHRpb24pfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAge2lzc3VlLnJlc29sdXRpb24gPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcsIHBhZGRpbmc6ICc2cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGJhY2tncm91bmQ6ICdyZ2JhKDc4LCAyMDEsIDE3NiwgMC4wOCknLCBib3JkZXI6ICcxcHggc29saWQgcmdiYSg3OCwgMjAxLCAxNzYsIDAuMzUpJywgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcdTI3MTMge2lzc3VlLnJlc29sdXRpb259XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICB7aXNzdWUuZml4UGxhbiAhPSBudWxsICYmICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGFuID0gaXNzdWUuZml4UGxhblxyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxhbk9wZW4gPSBpc3N1ZUV4cGFuZGVkW2Ake2lzc3VlLmlkfS1wbGFuYF0gPT09IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgYmFja2dyb3VuZDogJ3JnYmEoMzcsIDk5LCAyMzUsIDAuMDUpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xMikpJywgZm9udFNpemU6ICcxMXB4Jywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5saW5rQnRuLCB3aWR0aDogJzEwMCUnLCB0ZXh0QWxpZ246ICdsZWZ0JywgcGFkZGluZzogJzVweCAxMHB4JywgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRJc3N1ZUV4cGFuZGVkKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFtgJHtpc3N1ZS5pZH0tcGxhbmBdOiAhKHByZXZpb3VzW2Ake2lzc3VlLmlkfS1wbGFuYF0gPT09IHRydWUpIH0pKSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx1RDgzRFx1RENDNCB7dCgnZml4LnBsYW4nKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UocGxhbi5zdGF0dXMgPT09ICdwZW5kaW5nJyA/ICcjZDk3NzA2JyA6ICcjMjU2M2ViJyl9PntwbGFuLnN0YXR1cyA9PT0gJ3BlbmRpbmcnID8gJ1x1NUY4NVx1OEJDNFx1NUJBMScgOiAnXHU1REYyXHU2RDNFXHU1M0QxJ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGxhbi5maWxlcy5sZW5ndGggPiAwICYmIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJyB9fT57cGxhbi5maWxlcy5zbGljZSgwLCAzKS5qb2luKCcsICcpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+e3BsYW5PcGVuID8gJ1x1MjVCMicgOiAnXHUyNUJDJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7cGxhbk9wZW4gJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMnB4IDEwcHggOHB4JywgbGluZUhlaWdodDogMS43IH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjxiPnt0KCdmaXgucGxhbkFwcHJvYWNoJyl9XHVGRjFBPC9iPntwbGFuLmFwcHJvYWNofTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjxiPnt0KCdmaXgucGxhbkltcGFjdCcpfVx1RkYxQTwvYj57cGxhbi5pbXBhY3R9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PGI+e3QoJ2ZpeC5wbGFuQmVuZWZpdCcpfVx1RkYxQTwvYj57cGxhbi5iZW5lZml0fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjxiPnt0KCdmaXgucGxhblJpc2snKX1cdUZGMUE8L2I+e3BsYW4ucmlza308L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5maXhTdGF0cyAhPSBudWxsIHx8IEJvb2xlYW4oaXNzdWUuZml4RGlmZikpICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMubGlua0J0biwgbWFyZ2luVG9wOiAnNHB4JywgZGlzcGxheTogJ2Jsb2NrJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0Rml4RXhwYW5kZWQoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW2lzc3VlLmlkXTogIShwcmV2aW91c1tpc3N1ZS5pZF0gPT09IHRydWUpIH0pKSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXHVEODNEXHVERDI3IHt0KCdyZXZpZXcuZml4RGV0YWlsJyl9XHVGRjA4e1N0cmluZyhpc3N1ZS5maXhTdGF0cz8uZmlsZXMgPz8gMCl9IHt0KCdyZXZpZXcuZml4U3RhdEZpbGVzJyl9IFx1MDBCNyAre1N0cmluZyhpc3N1ZS5maXhTdGF0cz8uaW5zZXJ0aW9ucyA/PyAwKX0gXHUyMjEye1N0cmluZyhpc3N1ZS5maXhTdGF0cz8uZGVsZXRpb25zID8/IDApfVx1RkYwOXtmaXhFeHBhbmRlZFtpc3N1ZS5pZF0gPT09IHRydWUgPyAnXHUyNUIyJyA6ICdcdTI1QkMnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2ZpeEV4cGFuZGVkW2lzc3VlLmlkXSA9PT0gdHJ1ZSAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc2cHgnLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEpKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMTBweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeEZpbGVzID8/IFtdKS5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICczcHgnIH19Pnt0KCdyZXZpZXcuZml4RmlsZXMnKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeEZpbGVzID8/IFtdKS5tYXAoKGZpbGUpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtmaWxlfSBzdHlsZT17eyBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJywgZm9udFNpemU6ICcxMXB4JyB9fT57ZmlsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5maXhJbXBhY3QgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzNweCcgfX0+e3QoJ3Jldmlldy5maXhJbXBhY3QnKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNzdWUuZml4SW1wYWN0Lm1hcCgoZW50cnkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeS5zeW1ib2x9IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzVweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzA5NjlkYScpfT57ZW50cnkuc3ltYm9sfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsnICd9e3QoJ3Jldmlldy5kZWZpbmVkSW4nKX0ge2VudHJ5LmRlZmluZWRJbn0gXHUwMEI3IHtTdHJpbmcoZW50cnkuY2FsbGVycy5sZW5ndGgpfSB7dCgncmV2aWV3LmNhbGxDb3VudCcpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5jYWxsZXJzLnNsaWNlKDAsIDUpLm1hcCgoY2FsbGVyLCBjYWxsZXJJbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtjYWxsZXJJbmRleH0gc3R5bGU9e3sgZm9udFNpemU6ICcxMHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIHBhZGRpbmdMZWZ0OiAnMTJweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUgZG90dGVkJyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgb3BlblBlZWsoY2FsbGVyLmZpbGUsIE51bWJlcihjYWxsZXIubGluZSkpIH19PntjYWxsZXIuZmlsZX06e2NhbGxlci5saW5lfTwvc3Bhbj4ge2NhbGxlci5zbmlwcGV0LnNsaWNlKDAsIDgwKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge0Jvb2xlYW4oaXNzdWUuZml4RGlmZikgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICczcHgnIH19Pnt0KCdyZXZpZXcuZml4RGlmZicpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1pbnNldCwgcmdiYSg1LDUsNSwwLjAzKSknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnNnB4IDhweCcsIG1heEhlaWdodDogJzMwMHB4Jywgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVuZGVyRGlmZkxpbmVzKGlzc3VlLmZpeERpZmYpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgIHtsb25nICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5saW5rQnRufSBvbkNsaWNrPXsoKSA9PiB7IHNldElzc3VlRXhwYW5kZWQoeyAuLi5pc3N1ZUV4cGFuZGVkLCBbaXNzdWUuaWRdOiAhZXhwYW5kZWQgfSkgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtleHBhbmRlZCA/IHQoJ25vdGVzLmNvbGxhcHNlJykgOiB0KCdub3Rlcy5leHBhbmQnKX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVNZXRhfT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0KCdyZXZpZXcudGFyZ2V0Jyl9OiB7aXNzdWVUYXJnZXRMYWJlbChpc3N1ZS5jaGFuZ2VJZCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2Zvcm1hdFRpbWUoaXNzdWUuY3JlYXRlZEF0KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgIClcclxuICAgICAgICB9KSgpfVxyXG4gICAgICA8L0NhcmQ+XHJcbiAgICAgIDxDYXJkIHRpdGxlPXt0KCd2ZXJpZnkucmVjb3JkcycpfT5cclxuICAgICAgICB7dmVyaWZpY2F0aW9ucy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCd2ZXJpZnkucmVjb3Jkc0VtcHR5Jyl9PC9kaXY+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHt2ZXJpZmljYXRpb25zLnNsaWNlKDAsIDIwKS5tYXAoKHJlY29yZCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPHRyIGtleT17cmVjb3JkLmlkfT5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UocmVjb3JkLnN0YXR1cyA9PT0gJ3Bhc3NlZCcgPyAnIzRlYzliMCcgOiAnI2RjZGNhYScpfT57cmVjb3JkLnN0YXR1c308L3NwYW4+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntyZWNvcmQubmFtZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2Zvcm1hdFRpbWUocmVjb3JkLmNyZWF0ZWRBdCl9PC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQ2FyZD5cclxuICAgIDwvPlxyXG4gIClcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb290fSBkYXRhLXRlc3RpZD1cInByb2plY3QtY29udHJvbC13b3Jrc3BhY2VcIj5cclxuICAgICAge3Byb3BzLmxheW91dE1vZGUgIT09ICdvdmVybGF5JyAmJiA8c3R5bGU+e0xBWU9VVF9TVFlMRX08L3N0eWxlPn1cclxuICAgICAge3Byb3BzLmxheW91dE1vZGUgIT09ICdvdmVybGF5JyAmJiA8ZGl2XHJcbiAgICAgICAgZGF0YS10ZXN0aWQ9XCJwcm9qZWN0LWNvbnRyb2wtZGl2aWRlclwiXHJcbiAgICAgICAgb25Qb2ludGVyRG93bj17b25EaXZpZGVyRG93bn1cclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogMCwgYm90dG9tOiAwLCByaWdodDogLTQsIHdpZHRoOiA4LFxyXG4gICAgICAgICAgY3Vyc29yOiAnY29sLXJlc2l6ZScsIHpJbmRleDogMjAsXHJcbiAgICAgICAgfX1cclxuICAgICAgLz59XHJcbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5uYXZ9PlxyXG4gICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMudGl0bGV9Pnt0KCd3b3Jrc3BhY2UudGl0bGUnKX08L3NwYW4+XHJcbiAgICAgICAge3RhYnMubWFwKChlbnRyeSkgPT4gKFxyXG4gICAgICAgICAgPGJ1dHRvbiBrZXk9e2VudHJ5LmtleX0gc3R5bGU9e3N0eWxlcy50YWIodGFiID09PSBlbnRyeS5rZXkpfSBvbkNsaWNrPXsoKSA9PiB7IHNldFRhYihlbnRyeS5rZXkpIH19PntlbnRyeS5sYWJlbH08L2J1dHRvbj5cclxuICAgICAgICApKX1cclxuICAgICAgICB7KCgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHJ1bm5pbmdDb3VudCA9IHJ1bnMuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuc3RhdHVzID09PSAncnVubmluZycgfHwgZW50cnkuc3RhdHVzID09PSAncXVldWVkJyB8fCBlbnRyeS5zdGF0dXMgPT09ICd2ZXJpZnlpbmcnKS5sZW5ndGhcclxuICAgICAgICAgIGNvbnN0IGZhaWxlZENvdW50ID0gcnVucy5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5zdGF0dXMgPT09ICdmYWlsZWQnIHx8IGVudHJ5LnN0YXR1cyA9PT0gJ3BhdXNlZCcpLmxlbmd0aFxyXG4gICAgICAgICAgaWYgKHJ1bm5pbmdDb3VudCA9PT0gMCAmJiBmYWlsZWRDb3VudCA9PT0gMCkgcmV0dXJuIG51bGxcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgbWFyZ2luTGVmdDogJzRweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIHtydW5uaW5nQ291bnQgPiAwICYmIChcclxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKHRoZW1lQXdhcmVUZXh0KCcjMjU2M2ViJykpLCBjdXJzb3I6ICdwb2ludGVyJywgYm9yZGVyOiAnbm9uZScgfX0gdGl0bGU9e3QoJ2JhZGdlLnJ1bm5pbmcnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcocnVubmluZ0NvdW50KSl9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0VGFiKCdleGVjdXRpb24nKSB9fT5cdTI1QjYge1N0cmluZyhydW5uaW5nQ291bnQpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAge2ZhaWxlZENvdW50ID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5iYWRnZSh0aGVtZUF3YXJlVGV4dCgnI2YxNGM0YycpKSwgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlcjogJ25vbmUnIH19IHRpdGxlPXt0KCdiYWRnZS5mYWlsZWQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoZmFpbGVkQ291bnQpKX1cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRUYWIoJ2V4ZWN1dGlvbicpIH19Plx1MjcxNyB7U3RyaW5nKGZhaWxlZENvdW50KX08L2J1dHRvbj5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfSkoKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ib2R5fT5cclxuICAgICAgICB7cHJvcHMuc2Vzc2lvbklkID09PSB1bmRlZmluZWQgfHwgcHJvcHMuc2Vzc2lvbklkID09PSAnJyA/IDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3dvcmtzcGFjZS5zZWxlY3RTZXNzaW9uJyl9PC9kaXY+IDogPD5cclxuICAgICAgICAgIHtsb2FkRXJyb3IgIT09IG51bGwgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZXJyb3IubG9hZCcpfToge2xvYWRFcnJvcn08L2Rpdj59XHJcbiAgICAgICAgICB7c3RhdGU/LnJlYWR5ID09PSBmYWxzZSAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9PntzdGF0ZS5yZWFzb24gPz8gJyd9PC9kaXY+fVxyXG4gICAgICAgICAge3RhYiA9PT0gJ2NvbW1pdHMnICYmIGNvbW1pdHNUYWJ9XHJcbiAgICAgICAgICB7dGFiID09PSAnb3ZlcnZpZXcnICYmIG92ZXJ2aWV3VGFifVxyXG4gICAgICAgICAge3RhYiA9PT0gJ2V4ZWN1dGlvbicgJiYgZXhlY3V0aW9uVGFifVxyXG4gICAgICAgICAge3RhYiA9PT0gJ3JldmlldycgJiYgcmV2aWV3VGFifVxyXG4gICAgICAgICAge3RhYiA9PT0gJ25vdGVzJyAmJiBub3Rlc1RhYn1cclxuICAgICAgICAgIHt0YWIgPT09ICdzZXR0aW5ncycgJiYgc2V0dGluZ3NUYWJ9XHJcbiAgICAgICAgPC8+fVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAge2NvbmZpcm1EaWFsb2cgIT09IG51bGwgJiYgKFxyXG4gICAgICAgIDxDb25maXJtRGlhbG9nXHJcbiAgICAgICAgICB0aXRsZT17Y29uZmlybURpYWxvZy50aXRsZX1cclxuICAgICAgICAgIG1lc3NhZ2U9e2NvbmZpcm1EaWFsb2cubWVzc2FnZX1cclxuICAgICAgICAgIGRhbmdlcj17Y29uZmlybURpYWxvZy5kYW5nZXJ9XHJcbiAgICAgICAgICBjb25maXJtTGFiZWw9e2NvbmZpcm1EaWFsb2cuY29uZmlybUxhYmVsfVxyXG4gICAgICAgICAgYWx0PXtjb25maXJtRGlhbG9nLmFsdCA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDoge1xyXG4gICAgICAgICAgICBsYWJlbDogY29uZmlybURpYWxvZy5hbHQubGFiZWwsXHJcbiAgICAgICAgICAgIG9uQWx0OiAoKSA9PiB7IGNvbmZpcm1EaWFsb2cuYWx0IS5vbkFsdCgpOyBzZXRDb25maXJtRGlhbG9nKG51bGwpIH0sXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgICAgb25DYW5jZWw9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyhudWxsKSB9fVxyXG4gICAgICAgICAgb25Db25maXJtPXsoKSA9PiB7IGNvbmZpcm1EaWFsb2cub25Db25maXJtKCk7IHNldENvbmZpcm1EaWFsb2cobnVsbCkgfX1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG4gICAgICB7cGVlayAhPT0gbnVsbCAmJiAoXHJcbiAgICAgICAgPGRpdiBkYXRhLXRlc3RpZD1cInBjLXBlZWstb3ZlcmxheVwiIHN0eWxlPXt7IHBvc2l0aW9uOiAnZml4ZWQnLCBpbnNldDogMCwgYmFja2dyb3VuZDogJ3JnYmEoMTUsMjMsNDIsMC40NSknLCBiYWNrZHJvcEZpbHRlcjogJ2JsdXIoMnB4KScsIHpJbmRleDogMTAwMCwgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0UGVlayhudWxsKSB9fT5cclxuICAgICAgICAgIDxkaXYgZGF0YS10ZXN0aWQ9XCJwYy1wZWVrLWNhcmRcIiBzdHlsZT17eyB3aWR0aDogJ21pbig3NjBweCwgOTJ2dyknLCBtYXhIZWlnaHQ6ICc4MHZoJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBib3JkZXJSYWRpdXM6ICcxMHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJveFNoYWRvdzogJzAgMTZweCA0OHB4IHJnYmEoMCwwLDAsMC4yNSknLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nIH19IG9uQ2xpY2s9eyhlKSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCkgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgcGFkZGluZzogJzEwcHggMTRweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJyB9fT5cclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJywgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19PntwZWVrLnBhdGh9OntTdHJpbmcocGVlay5saW5lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAge3BlZWtEYXRhPy5leGlzdHMgPT09IHRydWUgJiYgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e1N0cmluZyhwZWVrRGF0YS5zdGFydExpbmUpfVx1MjAxM3tTdHJpbmcocGVla0RhdGEuZW5kTGluZSl9IC8ge1N0cmluZyhwZWVrRGF0YS50b3RhbExpbmVzKX0gXHU4ODRDPC9zcGFuPn1cclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0UGVlayhudWxsKSB9fT5cdTI3MTU8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3c6ICdhdXRvJywgcGFkZGluZzogJzEwcHggMCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctaW5zZXQsIHJnYmEoNSw1LDUsMC4wMykpJyB9fT5cclxuICAgICAgICAgICAgICB7cGVla0J1c3kgJiYgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuZW1wdHkgfX0+XHU4QkZCXHU1M0Q2XHU0RTJEXHUyMDI2PC9kaXY+fVxyXG4gICAgICAgICAgICAgIHshcGVla0J1c3kgJiYgcGVla0RhdGEgIT09IG51bGwgJiYgcGVla0RhdGEuZXhpc3RzID09PSBmYWxzZSAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Plx1NjU4N1x1NEVGNlx1NEUwRFx1NUI1OFx1NTcyOFx1RkYwOFx1NTNFRlx1ODBGRFx1NURGMlx1ODhBQlx1NTIyMFx1OTY2NFx1NjIxNlx1NzlGQlx1NTJBOFx1RkYwOTwvZGl2Pn1cclxuICAgICAgICAgICAgICB7IXBlZWtCdXN5ICYmIHBlZWtEYXRhPy5leGlzdHMgPT09IHRydWUgJiYgKHBlZWtEYXRhLmxpbmVzID8/IFtdKS5tYXAoKGVudHJ5KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZW50cnkubn0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxMHB4JywgcGFkZGluZzogJzAgMTRweCcsIGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknLCBmb250U2l6ZTogJzExLjVweCcsIGxpbmVIZWlnaHQ6IDEuNywgYmFja2dyb3VuZDogZW50cnkubiA9PT0gcGVlay5saW5lID8gJ3JnYmEoMzcsOTksMjM1LDAuMDgpJyA6ICd0cmFuc3BhcmVudCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IHdpZHRoOiA0MCwgdGV4dEFsaWduOiAncmlnaHQnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZmxleFNocmluazogMCB9fT57U3RyaW5nKGVudHJ5Lm4pfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57ZW50cnkudGV4dCA9PT0gJycgPyAnXFx1MDBBMCcgOiBlbnRyeS50ZXh0fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgPC9kaXY+XHJcbiAgKVxyXG59XHJcbiIsICIvKipcbiAqIFx1NjNEMFx1NEVBNFx1OEY2RVx1NkIyMVx1ODA1QVx1N0M3Qlx1RkYwOFx1NUJBMlx1NjIzN1x1N0FFRlx1RkYwOVx1RkYxQVx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1NTNGMFx1NzY4NFx1NEUwQlx1NjJDOVx1Njg0Nlx1NjMwOVx1MzAwQ1x1NEUwMFx1OEY2RVx1NURFNVx1NEY1Q1x1MzAwRFx1NTIwNlx1N0VDNFx1NUM1NVx1NzkzQVx1MzAwMlxuICogXHU0RTBFIHJ1bnRpbWUvaGlzdG9yeS50cyBcdTc2ODQgY2x1c3RlckNvbW1pdHMgXHU0RkREXHU2MzAxXHU1NDBDXHU0RTAwXHU1NDJGXHU1M0QxXHU1RjBGXHVGRjA4VjEuMCBcdTAwQTc5Ny9cdTAwQTc5OVx1RkYwOVx1RkYxQVxuICogXHU3NkY4XHU5MEJCXHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0XHU5NUY0XHU5Njk0XHU4RDg1XHU4RkM3XHU3QTk3XHU1M0UzXHVGRjA4XHU5RUQ4XHU4QkE0IDM2aFx1RkYwOVx1NTIwN1x1NjVBRFx1RkYxQlx1OEZERVx1N0VFRCBcdTIyNjUzIFx1NEUyQVx1NjNEMFx1NEVBNFx1NTQwRVx1NEUwRVx1NURGMlx1ODA1QVx1NjU4N1x1NEVGNlxuICogXHU5NkY2XHU5MUNEXHU1M0UwXHU0RTVGXHU1MjA3XHU2NUFEXHUzMDAyXHU2NzBEXHU1MkExXHU3QUVGXHU5MEEzXHU0RUZEXHU1REU1XHU0RjVDXHU1NzI4IGdpdCBcdTYyNkJcdTYzQ0ZcdTVDNDJcdUZGMDhcdTkxQ0RcdTVFRkFcdTUzODZcdTUzRjJcdUZGMDlcdUZGMENcdThGRDlcdTRFRkRcdTk3NjJcdTU0MTFcbiAqIC9jb21taXRzIFx1OEZENFx1NTZERVx1NzY4NFx1NjNEMFx1NEVBNFx1Njc2MVx1NzZFRVx1MjAxNFx1MjAxNFx1NEUyNFx1NTkwNFx1ODlDNFx1NTIxOVx1NjUzOVx1NTJBOFx1NUZDNVx1OTg3Qlx1NTQwQ1x1NkI2NVx1MzAwMlxuICpcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9jb21taXQtcm91bmRzXG4gKi9cblxuLyoqIFx1ODA1QVx1N0M3Qlx1OEY5M1x1NTE2NVx1NzY4NFx1NjcwMFx1NUMwRlx1NUY2Mlx1NzJCNlx1RkYwOC9jb21taXRzIFx1NzY4NFx1NjNEMFx1NEVBNFx1Njc2MVx1NzZFRVx1NUI1MFx1OTZDNlx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGludGVyZmFjZSBSb3VuZENvbW1pdCB7XG4gIHNoYTogc3RyaW5nXG4gIC8qKiBcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdUZGMDhcdTZCRUJcdTc5RDJcdUZGMDlcdTMwMDIgKi9cbiAgZGF0ZTogbnVtYmVyXG4gIC8qKiBcdTZEODlcdTUzQ0FcdTY1ODdcdTRFRjZcdThERUZcdTVGODRcdUZGMDhcdTc2RjhcdTVCRjlcdTRFRDNcdTVFOTNcdTY4MzlcdUZGMDlcdTMwMDIgKi9cbiAgZmlsZXM6IHN0cmluZ1tdXG59XG5cbi8qKiBcdTRFMDBcdThGNkVcdTVERTVcdTRGNUNcdUZGMUFcdTRGRERcdTYzMDFcdTRGMjBcdTUxNjVcdTk4N0FcdTVFOEZcdTc2ODRcdTYzRDBcdTRFQTRcdTUyMTdcdTg4NjhcdUZGMDgvY29tbWl0cyBcdTRFM0FcdTY1QjBcdTIxOTJcdTY1RTdcdUZGMDkrIFx1NjVGNlx1OTVGNFx1ODMwM1x1NTZGNFx1MzAwMiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21taXRSb3VuZCB7XG4gIGNvbW1pdHM6IFJvdW5kQ29tbWl0W11cbiAgLyoqIFx1OEY2RVx1NTE4NVx1NjcwMFx1NjVFOVx1NjNEMFx1NEVBNFx1NjVGNlx1OTVGNFx1MzAwMiAqL1xuICBmaXJzdEF0OiBudW1iZXJcbiAgLyoqIFx1OEY2RVx1NTE4NVx1NjcwMFx1NjY1QVx1NjNEMFx1NEVBNFx1NjVGNlx1OTVGNFx1MzAwMiAqL1xuICBsYXN0QXQ6IG51bWJlclxufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9ST1VORF9HQVBfTVMgPSAzNiAqIDYwICogNjAgKiAxMDAwXG5cbi8qKiBcdTRFMEVcdTY3MERcdTUyQTFcdTdBRUYgY2x1c3RlckNvbW1pdHMgXHU3NkY4XHU1NDBDXHU3Njg0XHU5MUNEXHU1M0UwXHU3Mzg3XHVGRjFBXHU1NDdEXHU0RTJEXHU2NTg3XHU0RUY2XHU2NTcwIC8gbWF4KFx1NjcyQ1x1NjNEMFx1NEVBNFx1NjU4N1x1NEVGNlx1NjU3MCwgMSlcdTMwMDIgKi9cbmZ1bmN0aW9uIG92ZXJsYXBSYXRpbyhmaWxlczogc3RyaW5nW10sIGV4aXN0aW5nOiBTZXQ8c3RyaW5nPik6IG51bWJlciB7XG4gIGlmIChleGlzdGluZy5zaXplID09PSAwKSByZXR1cm4gMFxuICBsZXQgaGl0cyA9IDBcbiAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSBpZiAoZXhpc3RpbmcuaGFzKGZpbGUpKSBoaXRzICs9IDFcbiAgcmV0dXJuIGhpdHMgLyBNYXRoLm1heChmaWxlcy5sZW5ndGgsIDEpXG59XG5cbi8qKlxuICogXHU2MjhBXHVGRjA4XHU2NUIwXHUyMTkyXHU2NUU3XHU2MjE2XHU2NUU3XHUyMTkyXHU2NUIwXHU1NzQ3XHU1M0VGXHVGRjA5XHU4RkRFXHU3RUVEXHU2M0QwXHU0RUE0XHU4MDVBXHU2MjEwXHU4RjZFXHU2QjIxXHUzMDAyXG4gKiBcdTY1RjZcdTk1RjRcdTk1RjRcdTk2OTRcdTUzRDZcdTdFRERcdTVCRjlcdTUwM0NcdUZGMUFcdTUyMTdcdTg4NjhcdTk4N0FcdTVFOEZcdTRFMERcdTRGRERcdThCQzFcdTY1RjZcdTk1RjRcdTY1QjlcdTU0MTFcdTMwMDJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsdXN0ZXJJbnRvUm91bmRzKGNvbW1pdHM6IFJvdW5kQ29tbWl0W10sIGNsdXN0ZXJHYXBNczogbnVtYmVyID0gREVGQVVMVF9ST1VORF9HQVBfTVMpOiBDb21taXRSb3VuZFtdIHtcbiAgY29uc3Qgcm91bmRzOiBDb21taXRSb3VuZFtdID0gW11cbiAgbGV0IGN1cnJlbnQ6IFJvdW5kQ29tbWl0W10gPSBbXVxuICBsZXQgY3VycmVudEZpbGVzID0gbmV3IFNldDxzdHJpbmc+KClcblxuICBjb25zdCBwdXNoUm91bmQgPSAoKTogdm9pZCA9PiB7XG4gICAgaWYgKGN1cnJlbnQubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICBjb25zdCB0aW1lcyA9IGN1cnJlbnQubWFwKChjb21taXQpID0+IGNvbW1pdC5kYXRlKVxuICAgIHJvdW5kcy5wdXNoKHsgY29tbWl0czogY3VycmVudCwgZmlyc3RBdDogTWF0aC5taW4oLi4udGltZXMpLCBsYXN0QXQ6IE1hdGgubWF4KC4uLnRpbWVzKSB9KVxuICAgIGN1cnJlbnQgPSBbXVxuICAgIGN1cnJlbnRGaWxlcyA9IG5ldyBTZXQoKVxuICB9XG5cbiAgZm9yIChjb25zdCBjb21taXQgb2YgY29tbWl0cykge1xuICAgIGNvbnN0IHByZXZpb3VzID0gY3VycmVudFtjdXJyZW50Lmxlbmd0aCAtIDFdXG4gICAgY29uc3QgZ2FwQnJlYWsgPSBwcmV2aW91cyAhPT0gdW5kZWZpbmVkICYmIE1hdGguYWJzKGNvbW1pdC5kYXRlIC0gcHJldmlvdXMuZGF0ZSkgPiBjbHVzdGVyR2FwTXNcbiAgICBjb25zdCBmaWxlQnJlYWsgPSBjdXJyZW50Lmxlbmd0aCA+PSAzICYmIG92ZXJsYXBSYXRpbyhjb21taXQuZmlsZXMsIGN1cnJlbnRGaWxlcykgPT09IDBcbiAgICBpZiAoZ2FwQnJlYWsgfHwgZmlsZUJyZWFrKSBwdXNoUm91bmQoKVxuICAgIGN1cnJlbnQucHVzaChjb21taXQpXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGNvbW1pdC5maWxlcykgY3VycmVudEZpbGVzLmFkZChmaWxlKVxuICB9XG4gIHB1c2hSb3VuZCgpXG4gIHJldHVybiByb3VuZHNcbn1cbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlTGF5b3V0RWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlLCB1c2VTeW5jRXh0ZXJuYWxTdG9yZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBXb3Jrc3BhY2VGcmFtZSB9IGZyb20gJy4vV29ya3NwYWNlRnJhbWUudHN4J1xyXG5cclxuaW50ZXJmYWNlIEN1cnJlbnRTZXNzaW9uIHtcclxuICBnZXRTbmFwc2hvdCgpOiB7IGtleT86IHN0cmluZyB9XHJcbiAgc3Vic2NyaWJlKGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogKCkgPT4gdm9pZFxyXG59XHJcblxyXG5pbnRlcmZhY2UgUGFuZWxJbmZvIHtcclxuICBnZXRTbmFwc2hvdCgpOiB7IGFjdGl2ZVBhbmVsSWQ6IHN0cmluZyB8IG51bGwgfVxyXG4gIHN1YnNjcmliZShsaXN0ZW5lcjogKCkgPT4gdm9pZCk6ICgpID0+IHZvaWRcclxufVxyXG5cclxuaW50ZXJmYWNlIE1vZGVybldvcmtzcGFjZVByb3BzIHtcclxuICBjdXJyZW50OiBDdXJyZW50U2Vzc2lvblxyXG4gIHBhbmVsSW5mbzogUGFuZWxJbmZvXHJcbiAgZW5hYmxlZDogYm9vbGVhblxyXG4gIG9uRGlzbWlzczogKCkgPT4gdm9pZFxyXG59XHJcblxyXG5pbnRlcmZhY2UgQm91bmRzIHtcclxuICBsZWZ0OiBudW1iZXJcclxuICB0b3A6IG51bWJlclxyXG4gIHdpZHRoOiBudW1iZXJcclxuICBoZWlnaHQ6IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd29ya3NwYWNlQm91bmRzKGZyYW1lOiBCb3VuZHMsIGNlbnRlcjogQm91bmRzLCBjaGF0V2lkdGg6IG51bWJlcik6IEJvdW5kcyB8IHVuZGVmaW5lZCB7XHJcbiAgY29uc3QgYXZhaWxhYmxlID0gTWF0aC5mbG9vcihjZW50ZXIud2lkdGgpXHJcbiAgaWYgKGF2YWlsYWJsZSA8IDU2MCB8fCBjZW50ZXIuaGVpZ2h0IDw9IDApIHJldHVybiB1bmRlZmluZWRcclxuICBjb25zdCBjaGF0ID0gTWF0aC5tYXgoMjgwLCBNYXRoLm1pbihjaGF0V2lkdGgsIGF2YWlsYWJsZSAtIDI4MCkpXHJcbiAgcmV0dXJuIHtcclxuICAgIGxlZnQ6IGNlbnRlci5sZWZ0IC0gZnJhbWUubGVmdCxcclxuICAgIHRvcDogY2VudGVyLnRvcCAtIGZyYW1lLnRvcCxcclxuICAgIHdpZHRoOiBhdmFpbGFibGUgLSBjaGF0LFxyXG4gICAgaGVpZ2h0OiBjZW50ZXIuaGVpZ2h0LFxyXG4gIH1cclxufVxyXG5cclxuLyoqIFx1NjVCMFx1NzI0OFx1NUJCRlx1NEUzQlx1NzY4NFx1NTJBMFx1NkNENVx1NkQ2RVx1NUM0Mlx1RkYxQlx1NEVDNVx1NTM4Qlx1N0YyOVx1NEYxQVx1OEJERFx1NTIxN1x1RkYwQ1x1NEUwRFx1NjUzOVx1NTNEOFx1NUI5OFx1NjVCOVx1NTNGM1x1NEZBN1x1NjgwRlx1NjIxNlx1N0Y1MVx1NjgzQ1x1NkEyMVx1Njc3Rlx1MzAwMiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gTW9kZXJuV29ya3NwYWNlKHsgY3VycmVudCwgcGFuZWxJbmZvLCBlbmFibGVkLCBvbkRpc21pc3MgfTogTW9kZXJuV29ya3NwYWNlUHJvcHMpIHtcclxuICBjb25zdCBzZXNzaW9uSWQgPSB1c2VTeW5jRXh0ZXJuYWxTdG9yZShcclxuICAgIChsaXN0ZW5lcikgPT4gY3VycmVudC5zdWJzY3JpYmUobGlzdGVuZXIpLFxyXG4gICAgKCkgPT4gY3VycmVudC5nZXRTbmFwc2hvdCgpLmtleSxcclxuICApXHJcbiAgY29uc3QgYWN0aXZlUGFuZWxJZCA9IHVzZVN5bmNFeHRlcm5hbFN0b3JlKFxyXG4gICAgKGxpc3RlbmVyKSA9PiBwYW5lbEluZm8uc3Vic2NyaWJlKGxpc3RlbmVyKSxcclxuICAgICgpID0+IHBhbmVsSW5mby5nZXRTbmFwc2hvdCgpLmFjdGl2ZVBhbmVsSWQsXHJcbiAgKVxyXG4gIGNvbnN0IHZpc2libGUgPSBlbmFibGVkICYmIGFjdGl2ZVBhbmVsSWQgPT09IG51bGxcclxuICBjb25zdCBkcmFnQ2xlYW51cCA9IHVzZVJlZjwoKCkgPT4gdm9pZCkgfCB1bmRlZmluZWQ+KClcclxuICBjb25zdCBbYm91bmRzLCBzZXRCb3VuZHNdID0gdXNlU3RhdGU8Qm91bmRzIHwgdW5kZWZpbmVkPigpXHJcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+ICgpID0+IHsgZHJhZ0NsZWFudXAuY3VycmVudD8uKCkgfSwgW3Zpc2libGVdKVxyXG4gIGNvbnN0IFtjaGF0V2lkdGgsIHNldENoYXRXaWR0aF0gPSB1c2VTdGF0ZSgoKSA9PiB7XHJcbiAgICBjb25zdCBzYXZlZCA9IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGMuY2hhdFdpZHRoJykgPz8gJycpXHJcbiAgICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHNhdmVkKSAmJiBzYXZlZCA+PSAyODAgPyBzYXZlZCA6IDM2MFxyXG4gIH0pXHJcblxyXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXZpc2libGUpIHJldHVyblxyXG4gICAgY29uc3QgcmlnaHRiYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignW2RhdGEtcmlnaHRiYXItY29sXScpXHJcbiAgICBjb25zdCBmcmFtZSA9IHJpZ2h0YmFyPy5wYXJlbnRFbGVtZW50XHJcbiAgICBjb25zdCBjZW50ZXJzID0gZnJhbWU/LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KCc6c2NvcGUgPiBkaXZbY2xhc3MqPVwiY2VudGVyQ29sXCJdJylcclxuICAgIGlmIChmcmFtZSA9PT0gdW5kZWZpbmVkIHx8IGZyYW1lID09PSBudWxsIHx8IGNlbnRlcnM/Lmxlbmd0aCAhPT0gMSkge1xyXG4gICAgICBvbkRpc21pc3MoKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnN0IGNlbnRlciA9IGNlbnRlcnNbMF0hXHJcbiAgICBjb25zdCBvbGRQYWRkaW5nID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctbGVmdCcpXHJcbiAgICBjb25zdCBvbGRQYWRkaW5nUHJpb3JpdHkgPSBjZW50ZXIuc3R5bGUuZ2V0UHJvcGVydHlQcmlvcml0eSgncGFkZGluZy1sZWZ0JylcclxuICAgIGNvbnN0IG9sZEJveFNpemluZyA9IGNlbnRlci5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdib3gtc2l6aW5nJylcclxuICAgIGNvbnN0IG9sZEJveFNpemluZ1ByaW9yaXR5ID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5UHJpb3JpdHkoJ2JveC1zaXppbmcnKVxyXG4gICAgbGV0IGFwcGxpZWRQYWRkaW5nID0gJydcclxuICAgIGxldCBhY3RpdmUgPSB0cnVlXHJcblxyXG4gICAgY29uc3QgdXBkYXRlID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuXHJcbiAgICAgIGNvbnN0IG5leHQgPSB3b3Jrc3BhY2VCb3VuZHMoZnJhbWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIGNlbnRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgY2hhdFdpZHRoKVxyXG4gICAgICBpZiAobmV4dCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgb25EaXNtaXNzKClcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICBjb25zdCBwYWRkaW5nID0gYCR7bmV4dC53aWR0aH1weGBcclxuICAgICAgaWYgKHBhZGRpbmcgIT09IGFwcGxpZWRQYWRkaW5nKSB7XHJcbiAgICAgICAgY2VudGVyLnN0eWxlLnNldFByb3BlcnR5KCdwYWRkaW5nLWxlZnQnLCBwYWRkaW5nLCAnaW1wb3J0YW50JylcclxuICAgICAgICBhcHBsaWVkUGFkZGluZyA9IHBhZGRpbmdcclxuICAgICAgfVxyXG4gICAgICBjZW50ZXIuc3R5bGUuc2V0UHJvcGVydHkoJ2JveC1zaXppbmcnLCAnYm9yZGVyLWJveCcsICdpbXBvcnRhbnQnKVxyXG4gICAgICBzZXRCb3VuZHMoKHByZXZpb3VzKSA9PiBwcmV2aW91cz8ubGVmdCA9PT0gbmV4dC5sZWZ0ICYmIHByZXZpb3VzLnRvcCA9PT0gbmV4dC50b3AgJiYgcHJldmlvdXMud2lkdGggPT09IG5leHQud2lkdGggJiYgcHJldmlvdXMuaGVpZ2h0ID09PSBuZXh0LmhlaWdodCA/IHByZXZpb3VzIDogbmV4dClcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc2l6ZSA9IG5ldyBSZXNpemVPYnNlcnZlcih1cGRhdGUpXHJcbiAgICByZXNpemUub2JzZXJ2ZShmcmFtZSlcclxuICAgIHJlc2l6ZS5vYnNlcnZlKGNlbnRlcilcclxuICAgIGNvbnN0IG11dGF0aW9ucyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcclxuICAgICAgaWYgKCFmcmFtZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtcmlnaHRiYXItY29sbGFwc2VkJykpIG9uRGlzbWlzcygpXHJcbiAgICAgIGVsc2UgdXBkYXRlKClcclxuICAgIH0pXHJcbiAgICBtdXRhdGlvbnMub2JzZXJ2ZShmcmFtZSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFsnZGF0YS1yaWdodGJhci1jb2xsYXBzZWQnXSB9KVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZSlcclxuICAgIHVwZGF0ZSgpXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBhY3RpdmUgPSBmYWxzZVxyXG4gICAgICByZXNpemUuZGlzY29ubmVjdCgpXHJcbiAgICAgIG11dGF0aW9ucy5kaXNjb25uZWN0KClcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZSlcclxuICAgICAgaWYgKGNlbnRlci5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLWxlZnQnKSA9PT0gYXBwbGllZFBhZGRpbmcpIHtcclxuICAgICAgICBpZiAob2xkUGFkZGluZyA9PT0gJycpIGNlbnRlci5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgncGFkZGluZy1sZWZ0JylcclxuICAgICAgICBlbHNlIGNlbnRlci5zdHlsZS5zZXRQcm9wZXJ0eSgncGFkZGluZy1sZWZ0Jywgb2xkUGFkZGluZywgb2xkUGFkZGluZ1ByaW9yaXR5KVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChjZW50ZXIuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnYm94LXNpemluZycpID09PSAnYm9yZGVyLWJveCcpIHtcclxuICAgICAgICBpZiAob2xkQm94U2l6aW5nID09PSAnJykgY2VudGVyLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdib3gtc2l6aW5nJylcclxuICAgICAgICBlbHNlIGNlbnRlci5zdHlsZS5zZXRQcm9wZXJ0eSgnYm94LXNpemluZycsIG9sZEJveFNpemluZywgb2xkQm94U2l6aW5nUHJpb3JpdHkpXHJcbiAgICAgIH1cclxuICAgICAgc2V0Qm91bmRzKHVuZGVmaW5lZClcclxuICAgIH1cclxuICB9LCBbdmlzaWJsZSwgY2hhdFdpZHRoLCBvbkRpc21pc3NdKVxyXG5cclxuICBpZiAoIXZpc2libGUgfHwgYm91bmRzID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsXHJcblxyXG4gIGNvbnN0IG9uRGl2aWRlckRvd24gPSAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgY29uc3Qgb25Nb3ZlID0gKG1vdmU6IFBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgICBjb25zdCBmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCdbZGF0YS1yaWdodGJhci1jb2xdJyk/LnBhcmVudEVsZW1lbnRcclxuICAgICAgY29uc3QgY2VudGVyID0gZnJhbWU/LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCc6c2NvcGUgPiBkaXZbY2xhc3MqPVwiY2VudGVyQ29sXCJdJylcclxuICAgICAgaWYgKGNlbnRlciA9PT0gdW5kZWZpbmVkIHx8IGNlbnRlciA9PT0gbnVsbCkgcmV0dXJuXHJcbiAgICAgIGNvbnN0IHdpZHRoID0gTWF0aC5tYXgoMjgwLCBNYXRoLm1pbig5MDAsIE1hdGgucm91bmQoY2VudGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0IC0gbW92ZS5jbGllbnRYKSkpXHJcbiAgICAgIHNldENoYXRXaWR0aCh3aWR0aClcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BjLmNoYXRXaWR0aCcsIFN0cmluZyh3aWR0aCkpXHJcbiAgICB9XHJcbiAgICBjb25zdCBvblVwID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpXHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKVxyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmNhbmNlbCcsIG9uVXApXHJcbiAgICAgIGRyYWdDbGVhbnVwLmN1cnJlbnQgPSB1bmRlZmluZWRcclxuICAgIH1cclxuICAgIGRyYWdDbGVhbnVwLmN1cnJlbnQ/LigpXHJcbiAgICBkcmFnQ2xlYW51cC5jdXJyZW50ID0gb25VcFxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmNhbmNlbCcsIG9uVXApXHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBkYXRhLXRlc3RpZD1cInByb2plY3QtY29udHJvbC1tb2Rlcm4td29ya3NwYWNlXCIgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIC4uLmJvdW5kcywgcG9pbnRlckV2ZW50czogJ2F1dG8nIH19PlxyXG4gICAgICA8V29ya3NwYWNlRnJhbWUga2V5PXtzZXNzaW9uSWQgPz8gJ2xhbmRpbmcnfSB7Li4uKHNlc3Npb25JZCA9PT0gdW5kZWZpbmVkID8ge30gOiB7IHNlc3Npb25JZCB9KX0gbGF5b3V0TW9kZT1cIm92ZXJsYXlcIiAvPlxyXG4gICAgICA8ZGl2IGRhdGEtdGVzdGlkPVwicHJvamVjdC1jb250cm9sLW1vZGVybi1kaXZpZGVyXCIgb25Qb2ludGVyRG93bj17b25EaXZpZGVyRG93bn0gc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogMCwgYm90dG9tOiAwLCByaWdodDogLTQsIHdpZHRoOiA4LCBjdXJzb3I6ICdjb2wtcmVzaXplJywgekluZGV4OiAyMCB9fSAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpQkEsSUFBQUEsZ0JBQWtCOzs7QUNObEIsbUJBQWtCOzs7QUNNWCxTQUFTLFdBQVcsT0FBZ0Q7QUFDekUsUUFBTSxNQUFNLG9CQUFvQixLQUFLLEtBQUs7QUFDMUMsTUFBSSxRQUFRLE1BQU07QUFDaEIsVUFBTSxRQUFRLE9BQU8sU0FBUyxJQUFJLENBQUMsR0FBSSxFQUFFO0FBQ3pDLFdBQU8sQ0FBRSxTQUFTLEtBQU0sS0FBTSxTQUFTLElBQUssS0FBSyxRQUFRLEdBQUc7QUFBQSxFQUM5RDtBQUNBLFFBQU0sYUFBYSxzREFBc0QsS0FBSyxLQUFLO0FBQ25GLE1BQUksZUFBZSxNQUFNO0FBQ3ZCLFdBQU8sQ0FBQyxPQUFPLFdBQVcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxXQUFXLENBQUMsQ0FBQyxHQUFHLE9BQU8sV0FBVyxDQUFDLENBQUMsQ0FBQztBQUFBLEVBQzdFO0FBQ0EsU0FBTztBQUNUO0FBR08sU0FBUyxrQkFBa0IsR0FBVyxHQUFXLEdBQW1CO0FBQ3pFLFFBQU0sVUFBVSxDQUFDLFVBQTBCO0FBQ3pDLFVBQU0sSUFBSSxRQUFRO0FBQ2xCLFdBQU8sS0FBSyxVQUFVLElBQUksVUFBVSxJQUFJLFNBQVMsVUFBVTtBQUFBLEVBQzdEO0FBQ0Es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Q3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHdCQUF3QjtBQUFBLElBQ3hCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHlCQUF5QjtBQUFBLElBQ3pCLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLGtCQUFrQjtBQUFBLElBQ2xCLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHdCQUF3QjtBQUFBLElBQ3hCLDRCQUE0QjtBQUFBLElBQzVCLDZCQUE2QjtBQUFBLElBQzdCLDJCQUEyQjtBQUFBLElBQzNCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLHdCQUF3QjtBQUFBLElBQ3hCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBQ3hCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGtDQUFrQztBQUFBLElBQ2xDLGdDQUFnQztBQUFBLElBQ2hDLG9CQUFvQjtBQUFBLElBQ3BCLHdCQUF3QjtBQUFBLElBQ3hCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLGlCQUFpQjtBQUFBLElBQ2pCLHFCQUFxQjtBQUFBLElBQ3JCLDZCQUE2QjtBQUFBLElBQzdCLDJCQUEyQjtBQUFBLElBQzNCLHlCQUF5QjtBQUFBLElBQ3pCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLHdCQUF3QjtBQUFBLElBQ3hCLHdCQUF3QjtBQUFBLElBQ3hCLDBCQUEwQjtBQUFBLElBQzFCLG9CQUFvQjtBQUFBLElBQ3BCLHdCQUF3QjtBQUFBLElBQ3hCLGdDQUFnQztBQUFBLElBQ2hDLDhCQUE4QjtBQUFBLElBQzlCLHdCQUF3QjtBQUFBLElBQ3hCLHNCQUFzQjtBQUFBLElBQ3RCLFlBQVk7QUFBQSxJQUNaLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLGdCQUFn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ZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsZ0JBQWdCO0FBQUEsSUFDaEIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsd0JBQXdCO0FBQUEsSUFDeEIscUJBQXFCO0FBQUEsSUFDckIsNEJBQTRCO0FBQUEsSUFFNUIsZUFBZTtBQUFBLElBQ2Ysc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsd0JBQXdCO0FBQUEsSUFDeEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIseUJBQXlCO0FBQUEsSUFDekIsMEJBQTBCO0FBQUEsSUFDMUIsMkJBQTJCO0FBQUEsSUFFM0Isa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFFaEIsZUFBZTtBQUFBLElBQ2YsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsYUFBYTtBQUFBLElBQ2IsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBRWYsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIscUJBQXFCO0FBQUEsSUFDckIsa0JBQWtCO0FBQUEsSUFDbEIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUEsSUFDekIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsa0JBQWtCO0FBQUEsSUFDbEIsdUJBQXVCO0FBQUEsSUFFdkIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsSUFFbEIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsbUJBQW1CO0FBQUEsSUFDbkIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsaUJBQWlCO0FBQUEsSUFDakIsYUFBYTtBQUFBLElBQ2IsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsRUFDcEI7QUFBQSxFQUNBLElBQUk7QUFBQSxJQUNGLG1CQUFtQjtBQUFBLElBQ25CLDJCQUEyQjtBQUFBLElBQzNCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLElBQ2hCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGlCQUFpQjtBQUFBLElBQ2pCLHVCQUF1QjtBQUFBLElBQ3ZCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBRWhCLFlBQVk7QUFBQSxJQUNaLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHFCQUFxQjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLDBCQUEwQjtBQUFBLElBQzFCLDhCQUE4QjtBQUFBLElBQzlCLG9CQUFvQjtBQUFBLElBQ3BCLHdCQUF3QjtBQUFBLElBQ3hCLHdCQUF3QjtBQUFBLElBQ3hCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLGFBQWE7QUFBQSxJQUNiLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHdCQUF3QjtBQUFBLElBQ3hCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHlCQUF5QjtBQUFBLElBQ3pCLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLGtCQUFrQjtBQUFBLElBQ2xCLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHdCQUF3QjtBQUFBLElBQ3hCLDRCQUE0QjtBQUFBLElBQzVCLDZCQUE2QjtBQUFBLElBQzdCLDJCQUEyQjtBQUFBLElBQzNCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLHdCQUF3QjtBQUFBLElBQ3hCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBQ3hCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGtDQUFrQztBQUFBLElBQ2xDLGdDQUFnQztBQUFBLElBQ2hDLG9CQUFvQjtBQUFBLElBQ3BCLHdCQUF3QjtBQUFBLElBQ3hCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLGlCQUFpQjtBQUFBLElBQ2pCLHFCQUFxQjtBQUFBLElBQ3JCLDZCQUE2QjtBQUFBLElBQzdCLDJCQUEyQjtBQUFBLElBQzNCLHlCQUF5QjtBQUFBLElBQ3pCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLHdCQUF3QjtBQUFBLElBQ3hCLHdCQUF3QjtBQUFBLElBQ3hCLDBCQUEwQjtBQUFBLElBQzFCLG9CQUFvQjtBQUFBLElBQ3BCLHdCQUF3QjtBQUFBLElBQ3hCLGdDQUFnQztBQUFBLElBQ2hDLDhCQUE4QjtBQUFBLElBQzlCLHdCQUF3QjtBQUFBLElBQ3hCLHNCQUFzQjtBQUFBLElBQ3RCLFlBQVk7QUFBQSxJQUNaLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLGdCQUFnQjtBQUFBLElBQ2hCLHdCQUF3QjtBQUFBLElBQ3hCLHlCQUF5QjtBQUFBLElBQ3pCLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFx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QUEsUUFDYjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGNBQUFBLFFBQU0sY0FBYyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksS0FBSyxjQUFjLE1BQU0sRUFBRSxHQUFHLEtBQUs7QUFBQSxNQUNyRixPQUFPLElBQUk7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUdBLE1BQUksTUFBTSxPQUFPLHNCQUFzQixNQUFNO0FBQzNDLFdBQU8sSUFBSSxNQUFNLFNBQVM7QUFBQSxNQUN4QixNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsSUFDUCxHQUFHLENBQUMsVUFBZTtBQUNqQixVQUFJLE9BQU8sYUFBYSxpQkFBa0IsUUFBTztBQUNqRCxZQUFNLFNBQVMsT0FBTztBQUN0QixhQUFPLGNBQUFBLFFBQU0sY0FBYyxZQUFZO0FBQUEsUUFDckMsT0FBTztBQUFBLFFBQ1AsY0FBYyxRQUFRLGdCQUFnQjtBQUFBLFFBQ3RDLFlBQVksUUFBUSxjQUFjO0FBQUEsUUFDbEMsV0FBVyxRQUFRLGFBQWE7QUFBQSxRQUNoQyxZQUFZLFFBQVE7QUFBQSxRQUNwQixRQUFRLFNBQVMsY0FBYztBQUFBLE1BQ2pDLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxhQUFXLENBQUMsU0FBUyxLQUFLLEtBQUs7QUFBQSxJQUM3QixDQUFDLGFBQWEsNEJBQVc7QUFBQSxJQUN6QixDQUFDLGNBQWMsb0NBQVM7QUFBQSxJQUN4QixDQUFDLG9CQUFvQixpQ0FBUTtBQUFBLEVBQy9CLEdBQVk7QUFDVixRQUFJLE1BQU0sT0FBTyxzQkFBc0IsTUFBTTtBQUMzQyxhQUFPLElBQUksTUFBTSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsS0FBSyxRQUFRLEdBQUcsaUJBQWlCLEtBQUssQ0FBQztBQUFBLElBQ2pHLENBQUM7QUFBQSxFQUNIO0FBQ0Y7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibmFtZSIsICJSZWFjdCIsICJvayIsICJkYXRhIiwgImFwcGx5IiwgImNoYW5nZVRpdGxlIiwgIm9wZW5Db3VudCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0Il0KfQo=
