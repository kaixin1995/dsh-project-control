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
    "review.sendChat": "\u8F6C\u804A\u5929\u590D\u9A8C",
    "review.sendChatHint": "\u628A\u5F53\u524D\u7B5B\u9009\u4E0B\u7684\u5F85\u5904\u7406\u95EE\u9898\uFF08\u6700\u591A 30 \u6761\uFF09\u53D1\u9001\u5230\u804A\u5929\u7A97\u53E3\uFF0C\u7531\u6A21\u578B\u4ECE\u6574\u4F53\u89D2\u5EA6\u590D\u9A8C\u662F\u5426\u5C5E\u5B9E\uFF08\u8BEF\u62A5/\u91CD\u590D/\u5DF2\u88AB\u4FEE\u590D\uFF09",
    "review.sendChatConfirmTitle": "\u8F6C\u804A\u5929\u590D\u9A8C\u2014\u2014\u9009\u62E9\u6A21\u5F0F",
    "review.sendChatConfirmMsg": "\u5C06\u628A {n} \u6761\u5F85\u5904\u7406\u95EE\u9898\u53D1\u9001\u5230\u5F53\u524D\u804A\u5929\u7A97\u53E3\uFF08\u6D88\u8017\u6A21\u578B\u7528\u91CF\uFF09\u3002\u76F4\u63A5\u4FEE\u590D\uFF1A\u5224\u5B9A+\u4FEE\u590D+\u56DE\u5199\u5168\u81EA\u52A8\u3002\u5148\u51FA\u65B9\u6848\uFF1A\u8BEF\u62A5/\u91CD\u590D/\u5DF2\u8FC7\u65F6\u81EA\u52A8\u5173\u95ED\uFF1B\u771F\u5B9E\u95EE\u9898\u4E0D\u4FEE\u4EE3\u7801\uFF0C\u9010\u6761\u7ED9\u51FA\u4FEE\u590D\u65B9\u6848/\u5F71\u54CD\u8303\u56F4/\u6536\u76CA\uFF0C\u7B49\u4F60\u5728\u804A\u5929\u91CC\u8BC4\u5BA1\u6279\u51C6\u540E\u624D\u4FEE\u3002",
    "review.sendChatAuto": "\u26A1 \u76F4\u63A5\u4FEE\u590D",
    "review.sendChatPlan": "\u{1F4CB} \u5148\u51FA\u65B9\u6848",
    "review.sendChatEmpty": "\u6CA1\u6709\u5F85\u5904\u7406\u95EE\u9898\u53EF\u53D1\u9001",
    "review.sendChatNoSession": "\u8BF7\u5148\u5728\u5DE6\u4FA7\u6253\u5F00\u8BE5\u9879\u76EE\u4E0B\u7684\u4F1A\u8BDD\uFF0C\u518D\u8F6C\u804A\u5929\u590D\u9A8C",
    "review.sendChatDone": "\u5DF2\u53D1\u9001 {n} \u6761\u95EE\u9898\u5230\u804A\u5929\u7A97\u53E3\uFF0C\u6A21\u578B\u5C06\u5F00\u59CB\u9010\u6761\u590D\u9A8C\u3002",
    "review.handledDone": "\u5DF2\u628A {n} \u6761\u95EE\u9898\u6807\u8BB0\u4E3A\u5DF2\u5904\u7406",
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
    "review.sendChat": "Send to chat",
    "review.sendChatHint": "Send pending issues under the current filter (max 30) to the chat window for holistic re-verification (false positive / duplicate / already fixed)",
    "review.sendChatConfirmTitle": "Send to chat \u2014 pick a mode",
    "review.sendChatConfirmMsg": "Will send {n} pending issues to the current chat window (consumes model usage). Auto fix: verify + fix + write-back, fully automatic. Plan first: false positives/duplicates/obsolete are auto-closed; real issues are NOT fixed \u2014 you get per-issue plans (approach / impact / benefit) and the model fixes only after you approve in chat.",
    "review.sendChatAuto": "\u26A1 Auto fix",
    "review.sendChatPlan": "\u{1F4CB} Plan first",
    "review.sendChatEmpty": "No pending issues to send",
    "review.sendChatNoSession": "Open a session of this project on the left before sending to chat",
    "review.sendChatDone": "Sent {n} issues to chat; the model will verify them one by one.",
    "review.handledDone": "{n} issues marked as handled",
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
  const batchStopRef = (0, import_react2.useRef)(false);
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
    }, 4e3);
    return () => {
      clearInterval(timer);
    };
  }, [tab, props.sessionId]);
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
  const sendIssuesToChat = (issues) => {
    const ids = issues.filter((issue) => issue.status === "open" || issue.status === "fixing").map((issue) => issue.id);
    if (ids.length === 0) {
      setActionResult("\u2717 " + t("review.sendChatEmpty"));
      return;
    }
    if (props.sessionId === void 0 || props.sessionId === "") {
      setActionResult("\u2717 " + t("review.sendChatNoSession"));
      return;
    }
    setConfirmDialog({
      title: t("review.sendChatConfirmTitle"),
      message: t("review.sendChatConfirmMsg").replace("{n}", String(Math.min(ids.length, 30))),
      danger: false,
      confirmLabel: t("review.sendChatAuto"),
      alt: {
        label: t("review.sendChatPlan"),
        onAlt: () => {
          void sendToChat(ids, "plan");
        }
      },
      onConfirm: () => {
        void sendToChat(ids, "auto");
      }
    });
  };
  const sendToChat = async (ids, mode) => {
    const { ok, data } = await post("/project-control/api/issues/to-chat", { ids, limit: 30, mode });
    setActionResult(ok ? "\u2713 " + t("review.sendChatDone").replace("{n}", String(data["sent"] ?? "")) : "\u2717 " + String(data["error"] ?? "error"));
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.secondary, title: t("review.sendChatHint"), onClick: () => {
            sendIssuesToChat(visible);
          }, children: "\u{1F4AC} " + t("review.sendChat") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.secondary, onClick: () => {
            void loadIssues();
          }, children: t("review.refresh") })
        ] }),
        (checkedVisible.length > 0 || batchVerifyState !== null) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", padding: "6px 10px", marginBottom: "10px", background: "var(--dsw-alias-bg-layer-1, #fafafa)", border: "1px solid var(--dsw-alias-border-l2, rgba(5,5,5,0.1))", borderRadius: "6px", fontSize: "11px" }, children: batchVerifyState !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { color: themeAwareText("#d97706") }, children: [
            "\u23F3 ",
            t("review.batchProgress").replace("{i}", String(batchVerifyState.done)).replace("{n}", String(batchVerifyState.total))
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
            batchStopRef.current = true;
          }, children: t("review.batchStop") })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("review.checkedCount").replace("{n}", String(checkedVisible.length)) }),
          checkedOpenTargets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" },
              title: t("review.batchVerifyConfirmMsg").replace("{n}", String(checkedOpenTargets.length)),
              onClick: () => {
                setConfirmDialog({ title: t("review.batchVerifyConfirmTitle"), message: t("review.batchVerifyConfirmMsg").replace("{n}", String(checkedOpenTargets.length)), danger: false, onConfirm: () => {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NsaWVudC9pbmRleC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdGhlbWUudHMiLCAiLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmtzcGFjZUZyYW1lLnRzeCIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvY29tbWl0LXJvdW5kcy50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvTW9kZXJuV29ya3NwYWNlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBDbGllbnQgcGx1Z2luIGVudHJ5IGZvciBkc2gtcHJvamVjdC1jb250cm9sLlxuICpcbiAqIFx1NUUwM1x1NUM0MFx1NjdCNlx1Njc4NFx1RkYwOFx1NURGMlx1OUE4Q1x1OEJDMVx1RkYwQzIwMjYtMDgtMzBcdUZGMDlcdUZGMUFcbiAqIC0gXHU1REU1XHU0RjVDXHU1M0YwXHU5MDZFXHU4NTNEXHU1Qjk4XHU2NUI5IGBkZXRhaWxzYCBcdTY5RkRcdUZGMDhwcmlvcml0eSAtMTBcdUZGMENcdTVCOThcdTY1QjkgRGV0YWlsc1BhbmVsIFx1NzU1OVx1NTcyOFx1OEQyNlx1NjcyQ1x1NEUwQVx1RkYwQ1xuICogICBcdTUzNzhcdThGN0RcdTYyMTFcdTRFRUNcdTc2ODRcdTZDRThcdTUxOENcdTUzNzNcdTYwNjJcdTU5MERcdUZGMDlcdUZGMENcdTZFMzJcdTY3RDNcdTU3MjhcdTRFM0JcdTY4NDZcdTY3QjYgZGV0YWlscyBcdTUyMTdcdUZGMUJcbiAqIC0gV29ya3NwYWNlRnJhbWUgXHU2Q0U4XHU1MTY1XHU2ODM3XHU1RjBGXHU4ODY4XHVGRjBDXHU2MjhBXHU1Qjk4XHU2NUI5XHU3RjUxXHU2ODNDXHU4OUM2XHU4OUM5XHU2MzYyXHU1MjE3XHVGRjFBXHU4MDRBXHU1OTI5XHVGRjA4Y2VudGVyQ29sXHVGRjA5XHU2NzAwXHU1M0YzXHUzMDAxXG4gKiAgIFx1NURFNVx1NEY1Q1x1NTNGMFx1RkYwOGRldGFpbHNDb2xcdUZGMDlcdTVDNDVcdTRFMkQgMWZyXHVGRjFCXHU2NUUwXHU0RjFBXHU4QkREXHU4NDNEXHU1NzMwXHU5ODc1XHVGRjA4ZGF0YS1kZXRhaWxzLWNvbGxhcHNlZFx1RkYwOVxuICogICBcdTgxRUFcdTUyQThcdTYwNjJcdTU5MERcdTUzOUZcdTc1MUZcdTUyMTdcdTVFOEZcdUZGMUJcbiAqIC0gXHU1REU2XHU0RkE3XHU1Qjk4XHU2NUI5XHU1QkZDXHU4MjJBXHUzMDAxXHU1Qjk4XHU2NUI5XHU4MDRBXHU1OTI5XHU2NzJDXHU0RjUzXHU5NkY2XHU2NTM5XHU1MkE4XHVGRjFCXG4gKiAtIFx1NEZBN1x1OEZCOVx1NjgwRlx1NjMwOVx1OTRBRVx1NTcyOFx1MzAwQ1x1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTNGMCBcdTIxQzQgXHU1Qjk4XHU2NUI5XHU4QkU2XHU2MEM1XHU5NzYyXHU2NzdGXHUzMDBEXHU5NUY0XHU1MjA3XHU2MzYyXHVGRjA4XHU1M0VGXHU5MDA2XHVGRjA5XHVGRjFCXG4gKiAtIGB0b29sLmNhbGwudG9vbHZpZXdgIFx1NEUzQSBhbmFseXplX2NoYW5nZSBcdTRGRERcdTc1NTlcdTRFMTNcdTVDNUVcdTUzNjFcdTcyNDdcdUZGMUJcbiAqIC0gXHU2NTg3XHU2ODQ4XHU1MTY4XHU5MEU4XHU3RUNGIGN0eC5sb2NhbGUgXHU4QkNEXHU1MTc4XHVGRjA4emggLyBlblx1RkYwOVx1MzAwMlxuICpcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2xcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDaGFuZ2VDYXJkIH0gZnJvbSAnLi9jb21wb25lbnRzL0NoYW5nZUNhcmQudHMnXG5pbXBvcnQgeyBXT1JLU1BBQ0VfRElDVCwgV29ya3NwYWNlRnJhbWUgfSBmcm9tICcuL2NvbXBvbmVudHMvV29ya3NwYWNlRnJhbWUudHN4J1xuaW1wb3J0IHsgTW9kZXJuV29ya3NwYWNlIH0gZnJvbSAnLi9jb21wb25lbnRzL01vZGVybldvcmtzcGFjZS50c3gnXG5cbmNvbnN0IE5TID0gJ3Byb2plY3QtY29udHJvbCdcblxuZXhwb3J0IGNvbnN0IG5hbWUgPSAnY2xpZW50LXByb2plY3QtY29udHJvbCdcbmV4cG9ydCBjb25zdCBpbmplY3QgPSBbJ3Nsb3RzJywgJ2xvY2FsZScsICdsYXlvdXQnXVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoY3R4OiBhbnkpOiB2b2lkIHtcbiAgY3R4LmVmZmVjdCgoKSA9PiBjdHgubG9jYWxlLnJlZ2lzdGVyKE5TLCB7IHpoOiBXT1JLU1BBQ0VfRElDVC56aCwgZW46IFdPUktTUEFDRV9ESUNULmVuIH0pLCAncHJvamVjdC1jb250cm9sOiBkaWN0aW9uYXJpZXMnKVxuICBjb25zdCBsYXlvdXQgPSBjdHgubGF5b3V0XG5cbiAgLy8gXHUyNTAwXHUyNTAwIDEuIFx1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTNGMFx1RkYxQVx1OTA2RVx1ODUzRCBkZXRhaWxzIFx1NjlGRFx1RkYwOFx1NTNFRlx1OTAwNlx1RkYwOVx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAvLyBcdTY1QjBcdTdBOTdcdTUzRTNcdTlFRDhcdThCQTRcdTRFMERcdTY2M0VcdTc5M0FcdTVERTVcdTRGNUNcdTUzRjBcdUZGMDhcdTRGRERcdTYzMDFcdTVCOThcdTY1QjlcdTUzOUZcdTc1MUZcdTg5QzZcdTg5RDJcdUZGMDlcdUZGMENcdTc1MzFcdTRGQTdcdThGQjlcdTY4MEZcdTYzMDlcdTk0QUVcdTY2M0VcdTVGMEZcdTYyNTNcdTVGMDBcdTMwMDJcbiAgbGV0IHdvcmtzcGFjZUVuYWJsZWQgPSBmYWxzZVxuICBsZXQgZGlzcG9zZVdvcmtzcGFjZTogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkXG5cbiAgY29uc3QgcmVnaXN0ZXJXb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XG4gICAgZGlzcG9zZVdvcmtzcGFjZSA9IGN0eC5zbG90cy5yZWdpc3RlcihcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2RldGFpbHMnLFxuICAgICAgICBwcmlvcml0eTogLTEwLFxuICAgICAgICBsb2NhbGU6IE5TLFxuICAgICAgfSxcbiAgICAgIC8vIFx1NjMwMlx1OEY3RFx1NTM3M1x1NjI1M1x1NUYwMCBkZXRhaWxzIFx1OEY2OFx1OTA1M1x1RkYwOFx1OTc2Mlx1Njc3Rlx1NTA0Rlx1NTk3RFx1OUVEOFx1OEJBNCAwXHVGRjA5XHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwXHU5NzAwXHU4OTgxXHU3NzFGXHU1QjlFXHU1QkJEXHU1RUE2XHVGRjFCXG4gICAgICAvLyBcdTY1RTBcdTRGMUFcdThCRERcdTg0M0RcdTU3MzBcdTk4NzVcdThGNjhcdTkwNTNcdTYwNTIgMFx1RkYwQ1x1NTkyOVx1NzEzNlx1NEZERFx1NjMwMVx1NTM5Rlx1NzUxRlx1ODJGMVx1OTZDNFx1OTg3NVx1NUUwM1x1NUM0MFx1MzAwMlxuICAgICAgLy8gXHU0RjFBXHU4QkREXHU1MjA3XHU2MzYyXHU2NUY2XHU1Qjk4XHU2NUI5XHU0RjFBIGNsb3NlRGV0YWlscyBcdTIwMTRcdTIwMTQgXHU1RUY2XHU1NDBFXHU0RTAwXHU2MkNEXHU5MUNEXHU2NUIwXHU2NDkxXHU1RjAwXHVGRjA4XHU1QjhGXHU0RUZCXHU1MkExXHU2NjVBXHU0RThFXHU3MjM2XHU3RUE3IGVmZmVjdFx1RkYwOVx1MzAwMlxuICAgICAgKHByb3BzOiBhbnkpID0+IHtcbiAgICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICBsYXlvdXQ/Lm9wZW5EZXRhaWxzPy4oKVxuICAgICAgICB9LCBbXSlcbiAgICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICBpZiAocHJvcHMuc2Vzc2lvbklkID09PSB1bmRlZmluZWQpIHJldHVyblxuICAgICAgICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiBsYXlvdXQ/Lm9wZW5EZXRhaWxzPy4oKSwgMClcbiAgICAgICAgICByZXR1cm4gKCkgPT4geyBjbGVhclRpbWVvdXQodGltZXIpIH1cbiAgICAgICAgfSwgW3Byb3BzLnNlc3Npb25JZF0pXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFdvcmtzcGFjZUZyYW1lLCB7IC4uLnByb3BzLCBrZXk6IHByb3BzLnNlc3Npb25JZCA/PyAnbGFuZGluZycsIGxheW91dCB9KVxuICAgICAgfSxcbiAgICApXG4gIH1cbiAgY29uc3QgdW5yZWdpc3RlcldvcmtzcGFjZSA9ICgpOiB2b2lkID0+IHtcbiAgICBkaXNwb3NlV29ya3NwYWNlPy4oKVxuICAgIGRpc3Bvc2VXb3Jrc3BhY2UgPSB1bmRlZmluZWRcbiAgfVxuXG4gIGN0eC5zbG90cy5pbmplY3QoJ2RldGFpbHMnLCAoKSA9PiB7XG4gICAgaWYgKHdvcmtzcGFjZUVuYWJsZWQpIHJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdW5yZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgfVxuICB9KVxuXG4gIC8vIFx1MjUwMFx1MjUwMCAyLiBcdTRGQTdcdThGQjlcdTY4MEZcdTVFOTVcdTkwRThcdUZGMUFcdTVERTVcdTRGNUNcdTUzRjAgXHUyMUM0IFx1NUI5OFx1NjVCOVx1OEJFNlx1NjBDNSBcdTUyMDdcdTYzNjIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gIC8vIFx1NjMwOVx1OTRBRVx1NzJCNlx1NjAwMVx1NjYwRVx1NzkzQVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1NjYzRVx1NzkzQVx1NEUyRCBcdTIxOTIgXHUzMDBDXHVEODNFXHVEREVEIFx1NURFNVx1NEY1Q1x1NTNGMCBcdTI3MTNcdTMwMERcdUZGMUJcdTVERjJcdTUyMDdcdTVCOThcdTY1QjlcdThCRTZcdTYwQzUgXHUyMTkyIFx1MzAwQ1x1RDgzRVx1RERFRCBcdTYyNTNcdTVGMDBcdTVERTVcdTRGNUNcdTUzRjBcdTMwMERcdTlBRDhcdTRFQUVcdUZGMENcbiAgLy8gXHU3NTI4XHU2MjM3XHU5NjhGXHU2NUY2XHU3NzBCXHU1Rjk3XHU1MjMwXHU2MDBFXHU0RTQ4XHU1MjA3XHU1NkRFXHU2NzY1XHVGRjA4XHU1MjA3XHU2MzYyXHU3RUNGIHdpbmRvdyBcdTRFOEJcdTRFRjZcdTkwMUFcdTc3RTVcdTYzMDlcdTk0QUVcdTkxQ0RcdTZFMzJcdTY3RDNcdUZGMDlcdTMwMDJcbiAgY29uc3QgVE9HR0xFX0VWRU5UID0gJ3BjLXdvcmtzcGFjZS10b2dnbGUnXG4gIGNvbnN0IGZpcmVUb2dnbGUgPSAoZW5hYmxlZDogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChUT0dHTEVfRVZFTlQsIHsgZGV0YWlsOiBlbmFibGVkIH0pKVxuICB9XG4gIGNvbnN0IGRpc21pc3NNb2Rlcm5Xb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XG4gICAgaWYgKCF3b3Jrc3BhY2VFbmFibGVkKSByZXR1cm5cbiAgICB3b3Jrc3BhY2VFbmFibGVkID0gZmFsc2VcbiAgICBmaXJlVG9nZ2xlKGZhbHNlKVxuICB9XG5cbiAgLy8gMC4yLnggXHU3Njg0XHU0RjFBXHU4QkREXHU2NzBEXHU1MkExXHU1M0VGXHU5MDA5XHU2Q0U4XHU1MTY1XHVGRjFBXHU2NUU3XHU3MjQ4XHU2Q0ExXHU2NzA5XHU2NUIwXHU3MjQ4XHU1RTAzXHU1QzQwXHU2M0E1XHU1M0UzXHVGRjBDXHU0RUNEXHU2Q0JGXHU3NTI4IGRldGFpbHMgXHU1MjA2XHU2NTJGXHUzMDAyXG4gIGN0eC5pbmplY3QoWyd1aVNlc3Npb24nXSwgKHNjb3BlOiBhbnkpID0+IHtcbiAgICBpZiAobGF5b3V0LnBhbmVsSW5mbyA9PT0gdW5kZWZpbmVkKSByZXR1cm5cbiAgICBjb25zdCBjdXJyZW50ID0gc2NvcGUudWlTZXNzaW9uLmFkYXB0ZXIuY3VycmVudFxuICAgIHNjb3BlLnNsb3RzLmluamVjdCgnc2hlbGwub3ZlcmxheScsICgpID0+IHNjb3BlLnNsb3RzLnJlZ2lzdGVyKHtcbiAgICAgIG5hbWU6ICdzaGVsbC5vdmVybGF5JywgaWQ6ICdwcm9qZWN0LWNvbnRyb2wtd29ya3NwYWNlJyxcbiAgICB9LCAoKSA9PiB7XG4gICAgICBjb25zdCBbZW5hYmxlZCwgc2V0RW5hYmxlZF0gPSBSZWFjdC51c2VTdGF0ZSh3b3Jrc3BhY2VFbmFibGVkKVxuICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IChldmVudDogRXZlbnQpOiB2b2lkID0+IHsgc2V0RW5hYmxlZCgoZXZlbnQgYXMgQ3VzdG9tRXZlbnQ8Ym9vbGVhbj4pLmRldGFpbCkgfVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpXG4gICAgICAgIHJldHVybiAoKSA9PiB7IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFRPR0dMRV9FVkVOVCwgaGFuZGxlcikgfVxuICAgICAgfSwgW10pXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChNb2Rlcm5Xb3Jrc3BhY2UsIHsgY3VycmVudCwgcGFuZWxJbmZvOiBsYXlvdXQucGFuZWxJbmZvLCBlbmFibGVkLCBvbkRpc21pc3M6IGRpc21pc3NNb2Rlcm5Xb3Jrc3BhY2UgfSlcbiAgICB9KSlcbiAgfSlcblxuICBjdHguc2xvdHMuaW5qZWN0KCdzaWRlYmFyLmZvb3Rlci5hY3Rpb24nLCAoKSA9PiB7XG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XG4gICAgICBuYW1lOiAnc2lkZWJhci5mb290ZXIuYWN0aW9uJyxcbiAgICAgIGlkOiAncHJvamVjdC1jb250cm9sLXRvZ2dsZScsXG4gICAgfSwgKCkgPT4ge1xuICAgICAgY29uc3QgW2VuYWJsZWQsIHNldEVuYWJsZWRdID0gUmVhY3QudXNlU3RhdGUod29ya3NwYWNlRW5hYmxlZClcbiAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQ6IEV2ZW50KTogdm9pZCA9PiB7IHNldEVuYWJsZWQoKGV2ZW50IGFzIEN1c3RvbUV2ZW50PGJvb2xlYW4+KS5kZXRhaWwpIH1cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoVE9HR0xFX0VWRU5ULCBoYW5kbGVyKVxuICAgICAgICByZXR1cm4gKCkgPT4geyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpIH1cbiAgICAgIH0sIFtdKVxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdidXR0b24nLFxuICAgICAgICB7XG4gICAgICAgICAgJ2RhdGEtdGVzdGlkJzogJ3Byb2plY3QtY29udHJvbC1zaWRlYmFyLXRvZ2dsZScsXG4gICAgICAgICAgdGl0bGU6IGVuYWJsZWQgPyAnXHU1RjUzXHU1MjREXHU2NjNFXHU3OTNBXHU5ODc5XHU3NkVFXHU2ODM4XHU2N0U1XHU1M0YwXHUzMDAyXHU3MEI5XHU1MUZCXHU1M0VGXHU0RTM0XHU2NUY2XHU1MjA3XHU2MzYyXHU0RTNBXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHVGRjA4XHU2N0U1XHU3NzBCXHU1REU1XHU1MTc3XHU4QzAzXHU3NTI4XHU3Njg0XHU1QjhDXHU2NTc0XHU4RjkzXHU1MTY1L1x1OEY5M1x1NTFGQVx1RkYwOVx1RkYxQlx1NTE4RFx1NzBCOVx1NjcyQ1x1NjMwOVx1OTRBRVx1NTM3M1x1NjA2Mlx1NTkwRFx1MzAwMicgOiAnXHU1RjUzXHU1MjREXHU2NjNFXHU3OTNBXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHUzMDAyXHU3MEI5XHU1MUZCXHU2MDYyXHU1OTBEXHU5ODc5XHU3NkVFXHU2ODM4XHU2N0U1XHU1M0YwXHUzMDAyJyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnNnB4JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggMTBweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgY29sb3I6IGVuYWJsZWQgPyAnaW5oZXJpdCcgOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IGVuYWJsZWQgPyA0MDAgOiA2MDAsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJywgb3BhY2l0eTogMC45LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgd29ya3NwYWNlRW5hYmxlZCA9ICF3b3Jrc3BhY2VFbmFibGVkXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIGxheW91dD8ub3BlbkRldGFpbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpZiAod29ya3NwYWNlRW5hYmxlZCAmJiBkaXNwb3NlV29ya3NwYWNlID09PSB1bmRlZmluZWQpIHJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghd29ya3NwYWNlRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgICAgdW5yZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgICAgICAgICAgICAgICBsYXlvdXQ/LmNsb3NlRGV0YWlscz8uKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAod29ya3NwYWNlRW5hYmxlZCAmJiBsYXlvdXQucGFuZWxJbmZvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAobGF5b3V0LnBhbmVsSW5mby5nZXRTbmFwc2hvdCgpLmFjdGl2ZVBhbmVsSWQgIT09IG51bGwpIGxheW91dC5zZWxlY3RQYW5lbChudWxsKVxuICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0YmFyID0gY3R4LmdldCgnc2lkZWJhclJpZ2h0JylcbiAgICAgICAgICAgICAgICBpZiAocmlnaHRiYXI/LmlzRXhwYW5kZWQoKSkgcmlnaHRiYXIudG9nZ2xlRXhwYW5kZWQoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgICAgICAgICB3b3Jrc3BhY2VFbmFibGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdbcHJvamVjdC1jb250cm9sXSB3b3Jrc3BhY2UgdG9nZ2xlIGZhaWxlZCcsIGVycm9yKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlyZVRvZ2dsZSh3b3Jrc3BhY2VFbmFibGVkKVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGVuYWJsZWQgPyAnXHVEODNFXHVEREVEIFx1NURFNVx1NEY1Q1x1NTNGMCBcdTI3MTMnIDogJ1x1RDgzRVx1RERFRCBcdTYyNTNcdTVGMDBcdTVERTVcdTRGNUNcdTUzRjAnLFxuICAgICAgKVxuICAgIH0pXG4gIH0pXG5cbiAgLy8gXHUyNTAwXHUyNTAwIDMuIFx1ODA0QVx1NTkyOVx1NURFNVx1NTE3N1x1NTM2MVx1NzI0N1x1RkYwOFx1NjI2N1x1ODg0Qy9cdThCQzRcdTVCQTEvXHU5QThDXHU2NTM2XHVGRjA5XHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gIGNvbnN0IHNpbXBsZVJlc3VsdENhcmQgPSAodGl0bGU6IHN0cmluZyk6ICgocHJvcHM6IGFueSkgPT4gYW55KSA9PiAocHJvcHM6IGFueSkgPT4ge1xuICAgIGNvbnN0IG91dHB1dCA9IHByb3BzPy5vdXRwdXRcbiAgICBjb25zdCB0ZXh0ID0gdHlwZW9mIG91dHB1dCA9PT0gJ3N0cmluZydcbiAgICAgID8gb3V0cHV0XG4gICAgICA6IG91dHB1dD8uc3VtbWFyeSA/PyBvdXRwdXQ/Lmlzc3VlcyA/PyBvdXRwdXQ/LmRldGFpbHMgPz8gKG91dHB1dCA/IEpTT04uc3RyaW5naWZ5KG91dHB1dCwgbnVsbCwgMikgOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHUyMDI2JylcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICdkaXYnLFxuICAgICAge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICBwYWRkaW5nOiAnMTBweCAxMnB4JyxcbiAgICAgICAgICBtYXJnaW46ICc0cHggMCcsXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXG4gICAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjYsXG4gICAgICAgICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyxcbiAgICAgICAgICBtYXhIZWlnaHQ6IDI2MCxcbiAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnNHB4JyB9IH0sIHRpdGxlKSxcbiAgICAgIFN0cmluZyh0ZXh0KSxcbiAgICApXG4gIH1cblxuICAvLyBcdTI1MDBcdTI1MDAgMy4gYW5hbHl6ZV9jaGFuZ2UgXHU0RTEzXHU1QzVFXHU1REU1XHU1MTc3XHU1MzYxXHU3MjQ3IFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICBjdHguc2xvdHMuaW5qZWN0KCd0b29sLmNhbGwudG9vbHZpZXcnLCAoKSA9PiB7XG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XG4gICAgICBuYW1lOiAndG9vbC5jYWxsLnRvb2x2aWV3JyxcbiAgICAgIGtleTogJ2FuYWx5emVfY2hhbmdlJyxcbiAgICB9LCAocHJvcHM6IGFueSkgPT4ge1xuICAgICAgaWYgKHByb3BzPy50b29sTmFtZSAhPT0gJ2FuYWx5emVfY2hhbmdlJykgcmV0dXJuIG51bGxcbiAgICAgIGNvbnN0IG91dHB1dCA9IHByb3BzPy5vdXRwdXRcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENoYW5nZUNhcmQsIHtcbiAgICAgICAgdGl0bGU6ICdcdTUzRDhcdTY2RjRcdTUyMDZcdTY3OTBcdTYyQTVcdTU0NEEgKENoYW5nZSBBbmFseXNpcyknLFxuICAgICAgICBmaWxlc0NoYW5nZWQ6IG91dHB1dD8uZmlsZXNDaGFuZ2VkID8/IDAsXG4gICAgICAgIGluc2VydGlvbnM6IG91dHB1dD8uaW5zZXJ0aW9ucyA/PyAwLFxuICAgICAgICBkZWxldGlvbnM6IG91dHB1dD8uZGVsZXRpb25zID8/IDAsXG4gICAgICAgIGV2aWRlbmNlSWQ6IG91dHB1dD8uZXZpZGVuY2VJZCxcbiAgICAgICAgc3RhdHVzOiBvdXRwdXQgPyAnY29tcGxldGVkJyA6ICdhbmFseXppbmcnLFxuICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG4gIGZvciAoY29uc3QgW3Rvb2xLZXksIHRpdGxlXSBvZiBbXG4gICAgWydzdGFydF9ydW4nLCAnXHVEODNEXHVERTgwIFx1NjI2N1x1ODg0QyBSdW4nXSxcbiAgICBbJ3J1bl9yZXZpZXcnLCAnXHVEODNEXHVERDBEIFx1NEVFM1x1NzgwMVx1OEJDNFx1NUJBMSddLFxuICAgIFsncnVuX3ZlcmlmaWNhdGlvbicsICdcdTI3MDUgXHU5QThDXHU2NTM2XHU5QThDXHU4QkMxJ10sXG4gIF0gYXMgY29uc3QpIHtcbiAgICBjdHguc2xvdHMuaW5qZWN0KCd0b29sLmNhbGwudG9vbHZpZXcnLCAoKSA9PiB7XG4gICAgICByZXR1cm4gY3R4LnNsb3RzLnJlZ2lzdGVyKHsgbmFtZTogJ3Rvb2wuY2FsbC50b29sdmlldycsIGtleTogdG9vbEtleSB9LCBzaW1wbGVSZXN1bHRDYXJkKHRpdGxlKSlcbiAgICB9KVxuICB9XG59XG4iLCAiLyoqXHJcbiAqIFJlYWN0IENvbXBvbmVudDogQ2hhbmdlIC8gSW5zaWdodCBDYXJkIGZvciBDaGF0IFZpZXcuXHJcbiAqIFJlbmRlcnMgc3RydWN0dXJlZCBpbnNpZ2h0cywgZGlmZiBzdGF0aXN0aWNzLCBhbmQgZXZpZGVuY2UgYmFkZ2VzLlxyXG4gKlxyXG4gKiBcdTk4OUNcdTgyNzJcdThENzAgZHN3LWFsaWFzIFx1NEUzQlx1OTg5OFx1NTNEOFx1OTFDRiArIHRoZW1lQXdhcmVUZXh0IFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYxQVxyXG4gKiBcdTZCNjRcdTUyNERcdTc1MjhcdTc2ODQgYC0tZHNoLSpgIFx1NTNEOFx1OTFDRlx1NTcyOFx1NUJCRlx1NEUzQlx1OTFDQ1x1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1NjgzN1x1NUYwRlx1NkMzOFx1OEZEQ1x1ODQzRFx1NTcyOFx1NkRGMVx1ODI3Mlx1NTE1Q1x1NUU5NVx1NEUwQVx1RkYwQ1xyXG4gKiBcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTRFMEJcdTgwNEFcdTU5MjlcdTZENDFcdTkxQ0NcdTUxRkFcdTczQjBcdTdBODFcdTUxNDBcdTlFRDFcdTUzNjFcdUZGMUJcdTY1NzBcdTVCNTdcdTdFRkYvXHU3RUEyXHU0RTVGXHU2NjJGXHU2REYxXHU4MjcyXHU1NDExXHU5MTREXHU4MjcyXHVGRjBDXHU3NjdEXHU1RTk1XHU0RTBEXHU1M0VGXHU4QkZCXHUzMDAyXHJcbiAqXHJcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9DaGFuZ2VDYXJkXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyB0aGVtZUF3YXJlVGV4dCB9IGZyb20gJy4vdGhlbWUudHMnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUNhcmRQcm9wcyB7XHJcbiAgdGl0bGU/OiBzdHJpbmdcclxuICBmaWxlc0NoYW5nZWQ/OiBudW1iZXJcclxuICBpbnNlcnRpb25zPzogbnVtYmVyXHJcbiAgZGVsZXRpb25zPzogbnVtYmVyXHJcbiAgZXZpZGVuY2VJZD86IHN0cmluZ1xyXG4gIHN0YXR1cz86IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ2hhbmdlQ2FyZDogUmVhY3QuRkM8Q2hhbmdlQ2FyZFByb3BzPiA9ICh7XHJcbiAgdGl0bGUgPSAnQ2hhbmdlIEluc2lnaHQnLFxyXG4gIGZpbGVzQ2hhbmdlZCA9IDAsXHJcbiAgaW5zZXJ0aW9ucyA9IDAsXHJcbiAgZGVsZXRpb25zID0gMCxcclxuICBldmlkZW5jZUlkLFxyXG4gIHN0YXR1cyA9ICdhbmFseXplZCcsXHJcbn0pID0+IHtcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICdkaXYnLFxyXG4gICAge1xyXG4gICAgICAnZGF0YS10ZXN0aWQnOiAncHJvamVjdC1jb250cm9sLWNoYW5nZS1jYXJkJyxcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgcGFkZGluZzogJzEwcHggMTRweCcsXHJcbiAgICAgICAgbWFyZ2luOiAnNnB4IDAnLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXHJcbiAgICAgICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgICAgIGZvbnRTaXplOiAnMTNweCcsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgJ2RpdicsXHJcbiAgICAgIHtcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBudWxsLCBgXHVEODNEXHVERDBEICR7dGl0bGV9YCksXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgJ3NwYW4nLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHggNnB4JyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJnLWluc2V0LCByZ2JhKDUsNSw1LDAuMDYpKScsXHJcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgKSxcclxuICAgICksXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEycHgnLCBmb250U2l6ZTogJzEycHgnLCBvcGFjaXR5OiAwLjkgfSB9LFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgbnVsbCwgYFx1RDgzRFx1RENDMSAke2ZpbGVzQ2hhbmdlZH0gZmlsZXNgKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjMWE3ZjM3JykgfSB9LCBgKyR7aW5zZXJ0aW9uc31gKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2YyMjJlJykgfSB9LCBgLSR7ZGVsZXRpb25zfWApLFxyXG4gICAgICBldmlkZW5jZUlkXHJcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgICAnc3BhbicsXHJcbiAgICAgICAgICAgIHsgc3R5bGU6IHsgb3BhY2l0eTogMC43LCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyB9IH0sXHJcbiAgICAgICAgICAgIGBbJHtldmlkZW5jZUlkfV1gLFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIDogbnVsbCxcclxuICAgICksXHJcbiAgKVxyXG59XHJcbiIsICIvKipcbiAqIFx1NUJBMlx1NjIzN1x1N0FFRlx1NEUzQlx1OTg5OFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYwOFx1NkRGMVx1NkQ0NVx1NTNDQ1x1NEUzQlx1OTg5OFx1NTE3MVx1NzUyOFx1NzY4NFx1NTUyRlx1NEUwMFx1NUI5RVx1NzNCMFx1RkYwOVx1MzAwMlxuICpcbiAqIFx1NEUwRFx1NTNEOFx1NUYwRlx1RkYwODIwMjYtMDktMTAgXHU2REYxXHU4MjcyXHU2QTIxXHU1RjBGXHUzMDBDXHU5ODc1XHU3QjdFXHU3NjdEXHU1NzU3XHUzMDBEXHU0RThCXHU2NTQ1XHU1NDBFXHU1NkZBXHU1MzE2XHVGRjBDXHU1MTY4XHU1QkEyXHU2MjM3XHU3QUVGXHU1RkM1XHU5ODdCXHU5MDc1XHU1Qjg4XHVGRjA5XHVGRjFBXG4gKiAxLiBcdTk2OEZcdTRFM0JcdTk4OThcdTUzRDhcdTUzMTZcdTc2ODRcdTVGM0FcdThDMDNcdTgyNzJcdTY1ODdcdTVCNTdcdTVGQzVcdTk4N0JcdTdFQ0YgdGhlbWVBd2FyZVRleHQoKVx1RkYxQVx1NkQ0NVx1ODI3Mlx1NEUzQlx1OTg5OFx1ODFFQVx1NTJBOFx1NkRGMVx1NTMxNlx1NTIzMFx1NzY3RFx1NUU5NVxuICogICAgXHU1QkY5XHU2QkQ0XHU1RUE2IFx1MjI2NTQuNToxXHVGRjBDXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU4MUVBXHU1MkE4XHU2M0QwXHU0RUFFXHU1MjMwXHU2REYxXHU1RTk1IFx1MjI2NTQuNToxXHUzMDAyXHU5ODdCXHU1NzI4XHU2RTMyXHU2N0QzXHU2NzFGXHU4QzAzXHU3NTI4XHVGRjA4XHU3RUM0XHU0RUY2XHU0RjUzXHU1MTg1L1xuICogICAgXHU2RTMyXHU2N0QzXHU1MUZEXHU2NTcwXHU1MTg1XHVGRjA5XHVGRjBDXHU0RTNCXHU5ODk4XHU1MjA3XHU2MzYyXHU1NDBFXHU5NjhGXHU5MUNEXHU2RTMyXHU2N0QzXHU4MUVBXHU1MkE4XHU2NkY0XHU2NUIwXHVGRjFCXHU3OTgxXHU2QjYyXHU1NzI4XHU2QTIxXHU1NzU3XHU1MkEwXHU4RjdEXHU2NzFGXHU2QzQyXHU1MDNDXHU1NDBFXHU1QjU4XHU4RkRCXG4gKiAgICBcdTk3NTlcdTYwMDFcdTY4MzdcdTVGMEZcdTVCRjlcdThDNjFcdTMwMDJcbiAqIDIuIGFjdGl2ZSBcdTlBRDhcdTRFQUVcdTgwQ0NcdTY2NkZcdUZGMDhcdTYzMDlcdTk0QUUgLyBcdTk4NzVcdTdCN0UgLyBcdTdCNUJcdTkwMDlcdTgyQUZcdTcyNDdcdTdCNDlcdTRFMDBcdTUyMDdcIlx1OTAwOVx1NEUyRFx1NTM3M1x1NTg2Qlx1ODI3MlwiXHU3Njg0XHU4ODY4XHU5NzYyXHVGRjA5XHU0RTAwXHU1RjhCXHU3NTI4XG4gKiAgICBgdmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpYFx1RkYwOFx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1NEUwQlx1OTBGRFx1NjYyRlx1ODRERFx1ODI3Mlx1RkYwOVx1RkYwQ1x1OTE0RFx1NzY3RFx1NUI1N1x1MzAwMlxuICogICAgXHU3OTgxXHU2QjYyXHU3NTI4IC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnkgXHU0RjVDXHU4MENDXHU2NjZGXHUyMDE0XHUyMDE0XHU1QjgzXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RjFBXHU4OEFCXG4gKiAgICBcdTVCOENcdTUxNjhcdTU0MUVcdTYzODlcdUZGMDhcdTY3MkNcdTZCMjFcdTRFOEJcdTY1NDVcdTY4MzlcdTU2RTBcdUZGMDlcdTMwMDJcbiAqIDMuIFx1NjVFMFx1NkNENVx1ODlFM1x1Njc5MFx1NzY4NFx1OTg5Q1x1ODI3Mlx1RkYwOENTUyBcdTUzRDhcdTkxQ0ZcdTdCNDlcdUZGMDlcdTUzOUZcdTY4MzdcdThGRDRcdTU2REVcdUZGMUFcdTUzRDhcdTkxQ0ZcdTgyNzJcdTRFQTRcdTc1MzFcdTVCQkZcdTRFM0JcdTRFM0JcdTk4OThcdTdDRkJcdTdFREZcdTRGRERcdThCQzFcdTUzRUZcdThCRkJcdUZGMENcbiAqICAgIFx1NEY0Nlx1NzUzMVx1NkI2NFx1NUI4M1x1NEVFQ1x1NEUwRFx1NUY5N1x1NEUwRVx1Nzg2Q1x1N0YxNlx1NzgwMVx1NTI0RFx1NjY2Rlx1ODI3Mlx1NTNFMFx1NTJBMFx1NEY3Rlx1NzUyOFx1MzAwMlxuICovXG5cbi8qKiBcdTg5RTNcdTY3OTAgI3JyZ2diYiBcdTYyMTYgcmdiKCkvcmdiYSgpIFx1OTg5Q1x1ODI3Mlx1NTI0RFx1NEUwOVx1NEUyQVx1NTIwNlx1OTFDRlx1NEUzQSBbciwgZywgYl1cdUZGMUJcdTY1RTBcdTZDRDVcdTg5RTNcdTY3OTBcdThGRDRcdTU2REUgbnVsbFx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29sb3IoY29sb3I6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IG51bGwge1xuICBjb25zdCBoZXggPSAvXiMoWzAtOWEtZl17Nn0pJC9pLmV4ZWMoY29sb3IpXG4gIGlmIChoZXggIT09IG51bGwpIHtcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlci5wYXJzZUludChoZXhbMV0hLCAxNilcbiAgICByZXR1cm4gWyh2YWx1ZSA+PiAxNikgJiAyNTUsICh2YWx1ZSA+PiA4KSAmIDI1NSwgdmFsdWUgJiAyNTVdXG4gIH1cbiAgY29uc3QgZnVuY3Rpb25hbCA9IC9ecmdiYT9cXChcXHMqKFxcZHsxLDN9KVssXFxzXSsoXFxkezEsM30pWyxcXHNdKyhcXGR7MSwzfSkvaS5leGVjKGNvbG9yKVxuICBpZiAoZnVuY3Rpb25hbCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBbTnVtYmVyKGZ1bmN0aW9uYWxbMV0pLCBOdW1iZXIoZnVuY3Rpb25hbFsyXSksIE51bWJlcihmdW5jdGlvbmFsWzNdKV1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG4vKiogV0NBRyBcdTc2RjhcdTVCRjlcdTRFQUVcdTVFQTZcdUZGMDgwPVx1OUVEMVx1RkYwQzE9XHU3NjdEXHVGRjA5XHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gcmVsYXRpdmVMdW1pbmFuY2UocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IGNoYW5uZWwgPSAodmFsdWU6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdiA9IHZhbHVlIC8gMjU1XG4gICAgcmV0dXJuIHYgPD0gMC4wMzkyOCA/IHYgLyAxMi45MiA6ICgodiArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjRcbiAgfVxuICByZXR1cm4gMC4yMTI2ICogY2hhbm5lbChyKSArIDAuNzE1MiAqIGNoYW5uZWwoZykgKyAwLjA3MjIgKiBjaGFubmVsKGIpXG59XG5cbi8qKiBcdTZERjFcdTUzMTZcdTk4OUNcdTgyNzJcdTc2RjRcdTUyMzBcdTc2N0RcdTVFOTVcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgIzFmMjMyOCBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA+IDAuMTgzOyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4MWYgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHgyMyAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHgyOCAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqIFx1NjNEMFx1NEVBRVx1OTg5Q1x1ODI3Mlx1NzZGNFx1NTIzMFx1NkRGMVx1NUU5NVx1RkYwOCMxNTE1MTdcdUZGMDlcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgI2YwZjZmYyBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpZ2h0ZW5Gb3JEYXJrQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA8IDAuMjE0OyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4ZjAgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHhmNiAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHhmYyAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqXG4gKiBcdTRFM0JcdTk4OThcdTgxRUFcdTkwMDJcdTVFOTRcdTY1ODdcdTVCNTdcdTgyNzJcdUZGMUFcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTZERjFcdTUzMTZcdTUyMzBcdTc2N0RcdTVFOTUgXHUyMjY1NC41OjFcdUZGMUJcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTYzRDBcdTRFQUVcdTUyMzBcdTZERjFcdTVFOTUgXHUyMjY1NC41OjFcbiAqIFx1RkYwOFx1NkRGMVx1ODI3Mlx1NUI1N1x1NTk4MiAjNTc2MDZhIFx1NzZGNFx1NjNBNVx1NjUzRVx1NkRGMVx1NUU5NVx1NTQwQ1x1NjgzN1x1NEUwRFx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlx1NjI0MFx1NjcwOVx1NUYzQVx1OEMwM1x1ODI3Mlx1NjU4N1x1NjcyQ1x1N0VERlx1NEUwMFx1OEQ3MFx1OEZEOVx1OTFDQ1x1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhlbWVBd2FyZVRleHQoY29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJnYiA9IHBhcnNlQ29sb3IoY29sb3IpXG4gIGlmIChyZ2IgPT09IG51bGwpIHJldHVybiBjb2xvclxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5ib2R5Py5oYXNBdHRyaWJ1dGU/LignZGF0YS1kcy1kYXJrLXRoZW1lJykgPT09IHRydWUpIHtcbiAgICByZXR1cm4gbGlnaHRlbkZvckRhcmtCYWNrZ3JvdW5kKHJnYlswXSwgcmdiWzFdLCByZ2JbMl0pXG4gIH1cbiAgcmV0dXJuIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyZ2JbMF0sIHJnYlsxXSwgcmdiWzJdKVxufVxuIiwgIi8qKlxuICogUHJvamVjdCBDb250cm9sIFx1NURFNVx1NEY1Q1x1NTNGMFx1RkYwOFdvcmtzcGFjZUZyYW1lXHVGRjA5djJcdUZGMUFcdTU2RjRcdTdFRDVcIlx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVwiXHU3RUM0XHU3RUM3XHUzMDAyXG4gKlxuICogXHU1NkRCXHU0RTJBXHU5ODc1XHU3QjdFXHVGRjFBXG4gKiAxLiBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdUZGMDhcdTlFRDhcdThCQTRcdUZGMDlcdUZGMUFcdTRFRDNcdTVFOTNcdTY4MEZcdUZGMDhcdTU5MUFcdTRFRDNcdTVFOTNcdTUyMDdcdTYzNjJcdUZGMDkrIFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1RkYwOFx1NTQyQlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOStcbiAqICAgIFx1OEJFNlx1NjBDNVx1OTc2Mlx1Njc3Rlx1RkYwOEFJIFx1ODlFM1x1OEJGQlx1RkYxQVx1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OC9cdTVCOUVcdTczQjBcdTkwM0JcdThGOTEvXHU5OENFXHU5NjY5XHVGRjFCXHU0RTA5XHU3RUE3XHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0IFNWRyBcdTU2RkVcdUZGMUJcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdUZGMDlcdTMwMDJcbiAqIDIuIFx1OTg3OVx1NzZFRVx1NjAzQlx1ODlDOFx1RkYxQVx1OTg3OVx1NzZFRVx1Njg2M1x1Njg0OCArIFx1NUZFQlx1NjM3N1x1NjRDRFx1NEY1QyArIFx1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1RiArIFx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1MzAwMlxuICogMy4gXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHVGRjFBUnVuIFx1OEZEQlx1NUVBNlx1NEUwRVx1NjIxMFx1NjcyQ1x1MzAwMlxuICogNC4gXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHVGRjFBXHU2ODM4XHU2N0U1XHU3QjE0XHU4QkIwXHVGRjA4XHU1M0VGXHU1MTczXHU4MDU0XHU2M0QwXHU0RUE0XHVGRjA5KyBcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdUZGMDhcdTRFQkFcdTVERTVcdTc4NkVcdThCQTRcdUZGMDkrIFx1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNSArIFJldmlldy9cdTlBOENcdTY1MzZcdThCQjBcdTVGNTVcdTMwMDJcbiAqXG4gKiBcdTVFMDNcdTVDNDBcdTY3M0FcdTUyMzZcdTRFMERcdTUzRDhcdUZGMUFcdTkwNkVcdTg1M0RcdTVCOThcdTY1QjkgZGV0YWlscyBcdTY5RkQgKyBcdTZDRThcdTUxNjVcdTY4MzdcdTVGMEZcdTYzNjJcdTUyMTdcdUZGMDhcdTgwNEFcdTU5MjlcdTY3MDBcdTUzRjNcdUZGMDkrIFx1NTIwNlx1OTY5NFx1Njc2MVx1NjJENlx1NjJGRFx1OEJCMFx1NUZDNlx1RkYxQlxuICogXHU3RURGXHU4QkExXHU4ODRDXHU0RTI0XHU4ODRDXHU5NEIzXHU1MjM2XHU3NTMxXHU4RkQwXHU4ODRDXHU2NUY2XHU2MzA5XHU2Nzg0XHU1RUZBXHU1NEM4XHU1RTBDXHU3Q0JFXHU1MUM2XHU2Q0U4XHU1MTY1XHVGRjA4YXBwbHlTdGF0c0xpbmVDbGFtcFx1RkYwOVx1MzAwMlxuICpcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9Xb3Jrc3BhY2VGcmFtZVxuICovXG5cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHBhcnNlQ29sb3IsIHRoZW1lQXdhcmVUZXh0IH0gZnJvbSAnLi90aGVtZS50cydcbmltcG9ydCB7IGNsdXN0ZXJJbnRvUm91bmRzIH0gZnJvbSAnLi9jb21taXQtcm91bmRzLnRzJ1xuXG4vKiogXHU1QkJGXHU0RTNCIC9zdGF0ZSBcdThGRDRcdTU2REVcdTc2ODRcdTVGRUJcdTcxNjdcdTVGNjJcdTcyQjZcdUZGMDhcdTRFMEUgYXBpLXJvdXRlLnRzIGJ1aWxkU3RhdGUgXHU1QkY5XHU5RjUwXHVGRjA5XHUzMDAyICovXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZVN0YXRlIHtcbiAgcmVhZHk/OiBib29sZWFuXG4gIHJlYXNvbj86IHN0cmluZ1xuICBwbHVnaW5WZXJzaW9uPzogc3RyaW5nXG4gIHByb2plY3Q/OiB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgcm9vdFBhdGg6IHN0cmluZzsgY3JlYXRlZEF0OiBudW1iZXIgfSB8IG51bGxcbiAgY2hhbmdlcz86IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZzsgc291cmNlOiBzdHJpbmc7IHVwZGF0ZWRBdDogbnVtYmVyIH0+XG4gIHJ1bnM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBzdGFydGVkQXQ6IG51bWJlciB8IG51bGw7IGZpbmlzaGVkQXQ6IG51bWJlciB8IG51bGw7IGNvc3RVc2Q/OiBudW1iZXI7IHN0ZXBzVG90YWw/OiBudW1iZXI7IHN0ZXBzRG9uZT86IG51bWJlcjsgY3VycmVudFN0ZXA/OiBzdHJpbmcgfCBudWxsIH0+XG4gIGF0dGVtcHRzQ291bnQ/OiBudW1iZXJcbiAgbWVtb3JpZXM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHByb2plY3RJZDogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRydXRoTGV2ZWw6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29udGVudD86IHN0cmluZzsgaXNIdW1hbkNvbmZpcm1lZDogYm9vbGVhbjsgZ2l0QnJhbmNoOiBzdHJpbmcgfCBudWxsOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxuICBldmlkZW5jZUNvdW50PzogbnVtYmVyXG4gIHJlY2VudEV2aWRlbmNlPzogQXJyYXk8eyBpZDogc3RyaW5nOyBzb3VyY2U6IHN0cmluZzsgdHJ1dGhMZXZlbDogc3RyaW5nOyBsb2NhdG9yOiBzdHJpbmc7IHNuaXBwZXQ6IHN0cmluZzsgY3JlYXRlZEF0OiBudW1iZXIgfT5cbiAgcmVzb2x2ZWRJc3N1ZVJldGVudGlvbkRheXM/OiBudW1iZXJcbiAgaW1wb3J0ZWRDaGFuZ2VzPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb21taXRDb3VudDogbnVtYmVyOyBmaXJzdENvbW1pdEF0OiBudW1iZXI7IGxhc3RDb21taXRBdDogbnVtYmVyOyBjb25maWRlbmNlOiBudW1iZXI7IHN0YXR1czogc3RyaW5nIH0+XG4gIGlzc3Vlcz86IEFycmF5PHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgc2V2ZXJpdHk6IHN0cmluZzsgY2F0ZWdvcnk6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmcgfT5cbiAgdmVyaWZpY2F0aW9ucz86IEFycmF5PHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxuICBib290c3RyYXA/OiB7IGlkOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgdGVjaFN0YWNrOiBzdHJpbmdbXTsgbWFuaWZlc3RGaWxlczogc3RyaW5nW107IHN5bWJvbHNDb3VudDogbnVtYmVyOyBjcmVhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxuICBjb25maXJtZWQ/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgdGV4dDogc3RyaW5nOyBmb3JiaWRkZW5QYXRoczogc3RyaW5nW10gfT5cbiAgY29uY2VwdHM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY2F0ZWdvcnk6IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZzsgb2NjdXJyZW5jZXM6IG51bWJlciB9PlxufVxuXG4vKiogR0VUIC9jb21taXRzIFx1NzY4NFx1NjNEMFx1NEVBNFx1Njc2MVx1NzZFRVx1MzAwMmFuYWx5emVkID0gXHU1REYyXHU3NTFGXHU2MjEwXHU4RkM3IEFJIFx1ODlFM1x1OEJGQlx1RkYwOFx1NjcyQVx1NkQ4OFx1NTMxNlx1NTcwNlx1NzBCOVx1NkQ4OFx1NzBCOVx1NEY5RFx1NjM2RVx1RkYwOVx1MzAwMiAqL1xuaW50ZXJmYWNlIENvbW1pdEVudHJ5IHtcbiAgc2hhOiBzdHJpbmdcbiAgc2hvcnRIYXNoOiBzdHJpbmdcbiAgYXV0aG9yOiBzdHJpbmdcbiAgZGF0ZTogbnVtYmVyXG4gIHN1YmplY3Q6IHN0cmluZ1xuICBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IGFkZHM6IG51bWJlcjsgZGVsczogbnVtYmVyIH0+XG4gIGFuYWx5emVkPzogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgQ29tbWl0c1BheWxvYWQge1xuICByb290UGF0aDogc3RyaW5nXG4gIGJyYW5jaDogc3RyaW5nIHwgbnVsbFxuICBoZWFkU2hhOiBzdHJpbmcgfCBudWxsXG4gIHdvcmtpbmc6IHsgZmlsZUNvdW50OiBudW1iZXI7IGlzQ2xlYW46IGJvb2xlYW47IGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmcgfT4gfVxuICBjb21taXRzOiBDb21taXRFbnRyeVtdXG59XG5cbmludGVyZmFjZSBDb21taXREZXRhaWxQYXlsb2FkIHtcbiAgc2hhOiBzdHJpbmdcbiAgaXNXb3JraW5nOiBib29sZWFuXG4gIGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgYWRkczogbnVtYmVyOyBkZWxzOiBudW1iZXIgfT5cbiAgaW5zZXJ0aW9uczogbnVtYmVyXG4gIGRlbGV0aW9uczogbnVtYmVyXG4gIHBhdGNoVHJ1bmNhdGVkOiBib29sZWFuXG4gIHBhdGNoOiBzdHJpbmdcbiAgY29tbWl0OiB7IG1lc3NhZ2U6IHN0cmluZzsgYXV0aG9yOiBzdHJpbmc7IGRhdGU6IG51bWJlciB9IHwgbnVsbFxuICBhbmFseXNpczogeyB3aGF0OiBzdHJpbmc7IGxvZ2ljOiBzdHJpbmdbXTsgcmlza3M6IHN0cmluZ1tdIH1cbiAgYW5hbHlzaXNDYWNoZWQ/OiBib29sZWFuXG4gIGFuYWx5c2lzR2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXG4gIC8qKiBcdTY3MkNcdTZCMjFcdTg5RTNcdThCRkJcdTc2ODQgTExNIFx1NjIxMFx1NjcyQ1x1RkYwOFx1NEYzMFx1RkYwQ1VTRFx1RkYwOVx1RkYxQlx1N0YxM1x1NUI1OFx1NjcyQVx1NUUyNlx1NjIxMFx1NjcyQy9cdTY3MkFcdTRFQTdcdTc1MUZcdThDMDNcdTc1MjhcdTY1RjZcdTdGM0FcdTc3MDFcdTMwMDIgKi9cbiAgYW5hbHlzaXNDb3N0VXNkPzogbnVtYmVyXG4gIGFuYWx5c2lzVG9rZW5zPzogeyBpbnB1dDogbnVtYmVyOyBvdXRwdXQ6IG51bWJlcjsgdG90YWw6IG51bWJlciB9XG59XG5cbmludGVyZmFjZSBJbXBhY3RTY29wZVBheWxvYWQge1xuICBjaGFuZ2VkRmlsZXM6IHN0cmluZ1tdXG4gIHNoYXM/OiBzdHJpbmdbXVxuICByaXNrTGV2ZWw6ICdsb3cnIHwgJ21lZGl1bScgfCAnaGlnaCcgfCAnY3JpdGljYWwnXG4gIHJpc2tTY29yZTogbnVtYmVyXG4gIHJpc2tGYWN0b3JzPzogQXJyYXk8eyB0ZXh0OiBzdHJpbmc7IHBvaW50czogbnVtYmVyIH0+XG4gIGtleUNoYW5nZVBvaW50cz86IHN0cmluZ1tdXG4gIG1lbW9yaWVzPzogQXJyYXk8eyB0aXRsZTogc3RyaW5nOyB0eXBlOiBzdHJpbmcgfT5cbiAgZnVuY3Rpb25JbXBhY3Q/OiBBcnJheTx7XG4gICAgc3ltYm9sOiBzdHJpbmdcbiAgICBkZWZpbmVkSW46IHN0cmluZ1xuICAgIHJvbGU/OiBzdHJpbmdcbiAgICBjaGFuZ2U/OiBzdHJpbmdcbiAgICBpbXBhY3Q/OiBzdHJpbmdcbiAgICBjYWxsZXJzOiBBcnJheTx7IGZpbGU6IHN0cmluZzsgbGluZTogc3RyaW5nOyBzbmlwcGV0OiBzdHJpbmcgfT5cbiAgfT5cbiAgbGV2ZWxzOiBBcnJheTx7IGxldmVsOiBzdHJpbmc7IGRlcHRoOiBudW1iZXI7IHBhdGg6IHN0cmluZzsgY29uZmlkZW5jZTogbnVtYmVyOyByZWFzb246IHN0cmluZyB9PlxuICBkaXJlY3Q6IHN0cmluZ1tdXG4gIGV4cGxhbmF0aW9uc0NhY2hlZD86IGJvb2xlYW5cbiAgZ2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXG4gIC8qKiBcdTUxRkRcdTY1NzBcdTdFQTdcdThCRjRcdTY2MEVcdTkwQTNcdTZCMjEgTExNIFx1OEMwM1x1NzUyOFx1NzY4NFx1NjIxMFx1NjcyQ1x1RkYwOFx1NEYzMFx1RkYwQ1VTRFx1RkYwOVx1MzAwMiAqL1xuICBleHBsYW5hdGlvbnNDb3N0VXNkPzogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmV2aWV3UGF5bG9hZCB7XG4gIGlzc3Vlc0ZvdW5kOiBudW1iZXJcbiAgaXNzdWVzOiBzdHJpbmdcbiAgdmVyZGljdDogc3RyaW5nXG4gIGNhY2hlZD86IGJvb2xlYW5cbiAgZ2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXG4gIGNvc3RVc2Q/OiBudW1iZXJcbiAgaXNzdWVMaXN0PzogQXJyYXk8eyBzZXZlcml0eTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBldmlkZW5jZTogc3RyaW5nOyBmaXg6IHN0cmluZyB9PlxufVxuXG5pbnRlcmZhY2UgTm90ZUVudHJ5IHtcbiAgaWQ6IHN0cmluZ1xuICBwcm9qZWN0SWQ6IHN0cmluZ1xuICBzaGE/OiBzdHJpbmdcbiAgdGl0bGU6IHN0cmluZ1xuICBjb250ZW50OiBzdHJpbmdcbiAgdGFncz86IHN0cmluZ1tdXG4gIHBpbm5lZD86IGJvb2xlYW5cbiAgY3JlYXRlZEF0OiBudW1iZXJcbiAgdXBkYXRlZEF0PzogbnVtYmVyXG59XG5cbi8qKiBHRVQgL2lzc3VlcyBcdTc2ODRcdThCQzRcdTVCQTFcdTk1RUVcdTk4OThcdTY3NjFcdTc2RUVcdUZGMDhSZXZpZXcgXHU5NUVFXHU5ODk4XHU5ODc1XHU3QjdFXHU2NTcwXHU2MzZFXHU2RTkwXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgSXNzdWVFbnRyeSB7XG4gIGlkOiBzdHJpbmdcbiAgY2hhbmdlSWQ6IHN0cmluZ1xuICBzZXZlcml0eTogc3RyaW5nXG4gIGNhdGVnb3J5OiBzdHJpbmdcbiAgdGl0bGU6IHN0cmluZ1xuICBkZXNjcmlwdGlvbjogc3RyaW5nXG4gIHN0YXR1czogc3RyaW5nXG4gIHJlc29sdXRpb246IHN0cmluZ1xuICBmaXhTdGF0czogeyBmaWxlczogbnVtYmVyOyBpbnNlcnRpb25zOiBudW1iZXI7IGRlbGV0aW9uczogbnVtYmVyIH0gfCBudWxsXG4gIGZpeEZpbGVzOiBzdHJpbmdbXVxuICBmaXhJbXBhY3Q6IEFycmF5PHsgc3ltYm9sOiBzdHJpbmc7IGRlZmluZWRJbjogc3RyaW5nOyBjYWxsZXJzOiBBcnJheTx7IGZpbGU6IHN0cmluZzsgbGluZTogc3RyaW5nOyBzbmlwcGV0OiBzdHJpbmcgfT4gfT5cbiAgZml4RGlmZjogc3RyaW5nXG4gIGNyZWF0ZWRBdDogbnVtYmVyXG4gIHVwZGF0ZWRBdDogbnVtYmVyXG59XG5cbi8qKiBcdTRGRUVcdTU5MERcdTVERUVcdTVGMDJcdTc2ODRcdTg4NENcdTdFQTdcdTc3NDBcdTgyNzJcdTZFMzJcdTY3RDNcdUZGMUErIFx1N0VGRlx1MzAwMS0gXHU3RUEyXHUzMDAxXHU2NTg3XHU0RUY2XHU1OTM0XHU1MkEwXHU3Qzk3XHUzMDAxXHU1MTc2XHU0RjU5XHU1RjMxXHU1MzE2XHUzMDAyICovXG5mdW5jdGlvbiByZW5kZXJEaWZmTGluZXMoZGlmZjogc3RyaW5nKTogUmVhY3QuUmVhY3ROb2RlW10ge1xuICBpZiAodHlwZW9mIGRpZmYgIT09ICdzdHJpbmcnIHx8IGRpZmYgPT09ICcnKSByZXR1cm4gW11cbiAgcmV0dXJuIGRpZmYuc3BsaXQoJ1xcbicpLnNsaWNlKDAsIDQwMCkubWFwKChsaW5lLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0ge1xuICAgICAgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsXG4gICAgICBmb250U2l6ZTogJzExcHgnLCBsaW5lSGVpZ2h0OiAxLjYsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcsXG4gICAgfVxuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJysrKycpIHx8IGxpbmUuc3RhcnRzV2l0aCgnLS0tJykgfHwgbGluZS5zdGFydHNXaXRoKCdkaWZmIC0tZ2l0JykgfHwgbGluZS5zdGFydHNXaXRoKCdAQCcpKSB7XG4gICAgICBzdHlsZS5jb2xvciA9ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKSdcbiAgICB9IGVsc2UgaWYgKGxpbmUuc3RhcnRzV2l0aCgnKycpKSB7XG4gICAgICBzdHlsZS5jb2xvciA9IHRoZW1lQXdhcmVUZXh0KCcjMWE3ZjM3JylcbiAgICAgIHN0eWxlLmJhY2tncm91bmQgPSAncmdiYSg0NiwxNjAsNjcsMC4wOCknXG4gICAgfSBlbHNlIGlmIChsaW5lLnN0YXJ0c1dpdGgoJy0nKSkge1xuICAgICAgc3R5bGUuY29sb3IgPSB0aGVtZUF3YXJlVGV4dCgnI2QxMjQyZicpXG4gICAgICBzdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoMjA5LDM2LDQ3LDAuMDgpJ1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5jb2xvciA9ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKSdcbiAgICB9XG4gICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3N0eWxlfT57bGluZSA9PT0gJycgPyAnXFx1MDBBMCcgOiBsaW5lfTwvZGl2PlxuICB9KVxufVxuXG4vKiogXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0XHU5ODc1XHU3Njg0XHU1M0VGXHU3RjE2XHU4RjkxXHU2QjY1XHU5QUE0XHVGRjA4L3J1bnMvc3RhcnQgXHU4RkQ0XHU1NkRFXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgUGxhbkNvbmZpcm1TdGVwIHtcbiAgaWQ6IHN0cmluZ1xuICB0aXRsZTogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgdGFyZ2V0RmlsZXM6IHN0cmluZ1tdXG4gIHJvbGU6IHN0cmluZ1xuICBhY2NlcHRhbmNlOiBzdHJpbmdcbiAgZmFpbHVyZVBvbGljeTogc3RyaW5nXG4gIGVuYWJsZWQ6IGJvb2xlYW5cbiAgbW9kZWxQcm92aWRlcjogc3RyaW5nXG4gIG1vZGVsSWQ6IHN0cmluZ1xufVxuXG4vKiogUE9TVCAvcGVlayBcdTc2ODRcdThGN0RcdTgzNzdcdUZGMDhcdTRFRTNcdTc4MDFcdTRFMEFcdTRFMEJcdTY1ODdcdTZENkVcdTVDNDJcdUZGMDlcdTMwMDIgKi9cbmludGVyZmFjZSBQZWVrUGF5bG9hZCB7XG4gIGV4aXN0czogYm9vbGVhblxuICBwYXRoPzogc3RyaW5nXG4gIHN0YXJ0TGluZT86IG51bWJlclxuICBlbmRMaW5lPzogbnVtYmVyXG4gIHRvdGFsTGluZXM/OiBudW1iZXJcbiAgbGluZXM/OiBBcnJheTx7IG46IG51bWJlcjsgdGV4dDogc3RyaW5nIH0+XG59XG5cbi8qKiBcdTRFQ0VcdTgxRUFcdTc1MzFcdTY1ODdcdTY3MkNcdTRFMkRcdThCQzZcdTUyMkIgZmlsZTpsaW5lIFx1NUYxNVx1NzUyOFx1RkYwOFx1NTQyQiBmaWxlOmxpbmUtbGluZSBcdTUzM0FcdTk1RjRcdTUzRDZcdThENzdcdTU5Q0JcdTg4NENcdUZGMDlcdTMwMDIgKi9cbmNvbnN0IEZJTEVfTElORV9QQVRURVJOID0gLygoPzpbXFx3Li1dK1svXFxcXF0pKltcXHcuLV0rXFwuW0EtWmEtel17MSw0fSk6KFxcZHsxLDV9KSg/Oi1cXGR7MSw1fSk/L2dcblxuLyoqIEdFVCAvcnVucy9kZXRhaWwgXHU3Njg0XHU4RjdEXHU4Mzc3XHUzMDAyICovXG5pbnRlcmZhY2UgUnVuRGV0YWlsIHtcbiAgcnVuOiB7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IGNoYW5nZVRpdGxlOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBwYXVzZVBvaW50OiB7IHN0ZXBJZDogc3RyaW5nOyByZWFzb246IHN0cmluZzsgYXQ6IG51bWJlciB9IHwgbnVsbDsgZXJyb3I6IHsgbWVzc2FnZTogc3RyaW5nIH0gfCBudWxsOyBzdGFydGVkQXQ6IG51bWJlciB8IG51bGw7IGZpbmlzaGVkQXQ6IG51bWJlciB8IG51bGwgfVxuICBzdGVwczogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyByb2xlOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmcgfCBudWxsOyBzdGF0dXM6IHN0cmluZzsgYXR0ZW1wdHNDb3VudDogbnVtYmVyOyBjbGFpbWVkT3V0Y29tZTogc3RyaW5nIHwgbnVsbDsgdmVyaWZpZWQ6IGJvb2xlYW47IGNvc3RVc2Q6IG51bWJlciB9PlxuICBjb250ZXh0OiB7XG4gICAgcHJvamVjdERpZ2VzdDogc3RyaW5nOyBicmFuY2g6IHN0cmluZyB8IG51bGw7IGhlYWRTaGE6IHN0cmluZyB8IG51bGxcbiAgICBpbmplY3RlZE1lbW9yaWVzOiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT5cbiAgICBzdGVwU3VtbWFyaWVzOiBBcnJheTx7IHN0ZXBUaXRsZTogc3RyaW5nOyBzdW1tYXJ5OiBzdHJpbmc7IGNoYW5nZWRGaWxlczogc3RyaW5nW107IGF0OiBudW1iZXIgfT5cbiAgICBkZWNpc2lvbkxvZzogQXJyYXk8eyBraW5kOiBzdHJpbmc7IGRldGFpbDogc3RyaW5nOyBhdDogbnVtYmVyIH0+XG4gIH0gfCBudWxsXG59XG5cbi8qKiBHRVQgL3NjaGVkdWxlZCBcdTc2ODRcdTRFRkJcdTUyQTFcdTY3NjFcdTc2RUVcdTMwMDIgKi9cbmludGVyZmFjZSBTY2hlZHVsZWRUYXNrRW50cnkge1xuICBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZ1xuICBpbnRlcnZhbE1pbnV0ZXM6IG51bWJlcjsgZW5hYmxlZDogYm9vbGVhbjsgbGFzdFJ1bkF0OiBudW1iZXIgfCBudWxsOyBsYXN0UmVzdWx0OiBzdHJpbmc7IG5leHREdWVBdDogbnVtYmVyXG59XG5cbi8qKiBHRVQgL21lbW9yaWVzIFx1NzY4NFx1OEJCMFx1NUZDNlx1Njc2MVx1NzZFRVx1RkYwOFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1NjU3MFx1NjM2RVx1NkU5MFx1RkYwOVx1MzAwMiAqL1xuaW50ZXJmYWNlIE1lbW9yeUVudHJ5IHtcbiAgaWQ6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmc7IHJlbGF0ZWRGaWxlczogc3RyaW5nW11cbiAgaXNIdW1hbkNvbmZpcm1lZDogYm9vbGVhbjsgZ2l0QnJhbmNoOiBzdHJpbmcgfCBudWxsOyBzY29wZTogc3RyaW5nOyBzb3VyY2VUYWc6IHN0cmluZ1xuICBiYXNpc1NoYTogc3RyaW5nIHwgbnVsbDsgc3RhdHVzOiBzdHJpbmc7IGxhc3RWZXJpZmllZFNoYTogc3RyaW5nIHwgbnVsbFxuICBjcmVhdGVkQXQ6IG51bWJlcjsgdXBkYXRlZEF0OiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIE1lbW9yaWVzUGF5bG9hZCB7XG4gIG1lbW9yaWVzOiBNZW1vcnlFbnRyeVtdXG4gIGJyYW5jaDogc3RyaW5nIHwgbnVsbFxuICBoZWFkU2hhOiBzdHJpbmcgfCBudWxsXG4gIGJhc2VsaW5lOiB7IHNoYTogc3RyaW5nIHwgbnVsbDsgdXBkYXRlZEF0OiBudW1iZXIgfSB8IG51bGxcbiAgYmVoaW5kQ291bnQ6IG51bWJlclxufVxuXG4vKiogUE9TVCAvbWVtb3J5L3N5bmMgXHU3Njg0XHU1NDBDXHU2QjY1XHU2MkE1XHU1NDRBXHUzMDAyICovXG5pbnRlcmZhY2UgU3luY1JlcG9ydCB7XG4gIG9rOiBib29sZWFuXG4gIGVycm9yPzogc3RyaW5nXG4gIGJlaGluZENvdW50PzogbnVtYmVyXG4gIHN0YWxlUHJvcG9zYWxzPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyByZWFzb246IHN0cmluZyB9PlxuICByZW5ld2VkPzogbnVtYmVyXG4gIG5ld0NhbmRpZGF0ZXM/OiBBcnJheTx7IHR5cGU6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29udGVudDogc3RyaW5nIH0+XG4gIHZlcmRpY3Q/OiBzdHJpbmdcbn1cblxuLyoqIFx1OEJDNFx1NUJBMVx1OTVFRVx1OTg5OFx1NzJCNlx1NjAwMSBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXG5jb25zdCBJU1NVRV9TVEFUVVNfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBvcGVuOiAnXHU1Rjg1XHU1OTA0XHU3NDA2JyxcbiAgZml4aW5nOiAnXHU0RkVFXHU1OTBEXHU0RTJEJyxcbiAgcmVzb2x2ZWQ6ICdcdTVERjJcdTg5RTNcdTUxQjMnLFxuICBhY2NlcHRlZDogJ1x1NURGMlx1NTkwNFx1NzQwNicsXG4gIHJlamVjdGVkOiAnXHU4QkVGXHU2MkE1L1x1OTFDRFx1NTkwRCcsXG59XG5cbi8qKiBcdThCQjBcdTVGQzZcdTdDN0JcdTU3OEIgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xuY29uc3QgTUVNT1JZX1RZUEVfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBhcmNoaXRlY3R1cmVfZGVjaXNpb246ICdcdTY3QjZcdTY3ODRcdTUxQjNcdTdCNTYnLCBwYXR0ZXJuX3J1bGU6ICdcdTZBMjFcdTVGMEZcdTg5QzRcdTUyMTknLCByaXNrX2hvdHNwb3Q6ICdcdTk4Q0VcdTk2NjlcdTcwRURcdTcwQjknLFxuICBsZWFybmVkX2NvbmNlcHQ6ICdcdTVCNjZcdTRFNjBcdTY5ODJcdTVGRjUnLCB1c2VyX3Byb2ZpbGU6ICdcdTc1MjhcdTYyMzdcdTUwNEZcdTU5N0QnLCBwcm9qZWN0X2xvZzogJ1x1OTg3OVx1NzZFRVx1NjVFNVx1NUZENycsIGRhaWx5X2xvZzogJ1x1NjVFNVx1NUZENycsXG59XG5cbi8qKiBcdThCQjBcdTVGQzZcdTY3NjVcdTZFOTAgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xuY29uc3QgTUVNT1JZX1NPVVJDRV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIHJ1bjogJ1x1NjI2N1x1ODg0Q1x1NjNEMFx1NzBCQycsIHJldmlldzogJ1x1NjgzOFx1NjdFNVx1NkM4OVx1NkRDMCcsIHN5bmM6ICdcdTYyQzlcdTUzRDZcdTU0MENcdTZCNjUnLCBjaGF0OiAnQUkgXHU4QkIwXHU1RjU1JywgbWFudWFsOiAnXHU2MjRCXHU1MkE4Jyxcbn1cblxuLyoqIFx1N0YxNlx1NjM5Mlx1ODlEMlx1ODI3MiBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXG5jb25zdCBST0xFX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgYW5hbHlzaXM6ICdcdTUyMDZcdTY3OTAnLCBwbGFubmluZzogJ1x1ODlDNFx1NTIxMicsIGNvZGluZzogJ1x1NUYwMFx1NTNEMScsIG9wczogJ1x1N0I4MFx1NTM1NVx1NjRDRFx1NEY1QycsIHZlcmlmaWNhdGlvbjogJ1x1OUE4Q1x1NjUzNicsXG59XG5cbi8qKiBcdTZCNjVcdTlBQTRcdTU5MzFcdThEMjVcdTdCNTZcdTc1NjUgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xuY29uc3QgUE9MSUNZX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgJ3JldHJ5LWVzY2FsYXRlJzogJ1x1OTFDRFx1OEJENVx1NUU3Nlx1NTM0N1x1N0VBN1x1NkEyMVx1NTc4QicsICdyZXRyeS1mYWxsYmFjayc6ICdcdTkxQ0RcdThCRDUnLCBza2lwOiAnXHU1OTMxXHU4RDI1XHU1MjE5XHU4REYzXHU4RkM3JywgYXNrOiAnXHU1OTMxXHU4RDI1XHU1MjE5XHU2NjgyXHU1MDVDXHU5NUVFXHU0RUJBJyxcbn1cblxuLyoqIFJ1biBcdTcyQjZcdTYwMDEgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xuY29uc3QgUlVOX1NUQVRVU19MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIHF1ZXVlZDogJ1x1NjM5Mlx1OTYxRlx1NEUyRCcsIHJ1bm5pbmc6ICdcdThGRDBcdTg4NENcdTRFMkQnLCBwYXVzZWQ6ICdcdTVERjJcdTY2ODJcdTUwNUMnLCBibG9ja2VkOiAnXHU5NjNCXHU1ODVFJywgcmV0cnlpbmc6ICdcdTkxQ0RcdThCRDVcdTRFMkQnLFxuICB2ZXJpZnlpbmc6ICdcdTY1MzZcdTVDM0VcdTlBOENcdTY1MzZcdTRFMkQnLCBzdWNjZWVkZWQ6ICdcdTVERjJcdTYyMTBcdTUyOUYnLCBjb21wbGV0ZWQ6ICdcdTVERjJcdTYyMTBcdTUyOUYnLCBmYWlsZWQ6ICdcdTU5MzFcdThEMjUnLCBjYW5jZWxsZWQ6ICdcdTVERjJcdTUzRDZcdTZEODgnLCBpbnRlcnJ1cHRlZDogJ1x1NURGMlx1NEUyRFx1NjVBRCcsXG59XG5cbi8qKiBcdTZCNjVcdTlBQTRcdTcyQjZcdTYwMDEgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xuY29uc3QgU1RFUF9TVEFUVVNfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBwZW5kaW5nOiAnXHU1Rjg1XHU2MjY3XHU4ODRDJywgcmVhZHk6ICdcdTVDMzFcdTdFRUEnLCBydW5uaW5nOiAnXHU2MjY3XHU4ODRDXHU0RTJEJywgcGF1c2VkOiAnXHU2NjgyXHU1MDVDJywgcmV0cnlpbmc6ICdcdTkxQ0RcdThCRDVcdTRFMkQnLFxuICBzdWNjZWVkZWQ6ICdcdTVERjJcdTYyMTBcdTUyOUYnLCBmYWlsZWQ6ICdcdTU5MzFcdThEMjUnLCBza2lwcGVkOiAnXHU1REYyXHU4REYzXHU4RkM3JywgYmxvY2tlZDogJ1x1OTYzQlx1NTg1RScsIGNhbmNlbGxlZDogJ1x1NURGMlx1NTNENlx1NkQ4OCcsIGludGVycnVwdGVkOiAnXHU1REYyXHU0RTJEXHU2NUFEJyxcbn1cblxuLyoqIFx1OEJDNFx1NUJBMVx1OTVFRVx1OTg5OFx1NEUyNVx1OTFDRFx1NUVBNiBcdTIxOTIgXHU1RkJEXHU3QUUwXHU1RTk1XHU4MjcyXHUzMDAyICovXG5mdW5jdGlvbiBzZXZlcml0eUNvbG9yKHNldmVyaXR5OiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoc2V2ZXJpdHkgPT09ICdjcml0aWNhbCcgfHwgc2V2ZXJpdHkgPT09ICdibG9ja2VyJykgcmV0dXJuICcjY2U5MTc4J1xuICBpZiAoc2V2ZXJpdHkgPT09ICdtYWpvcicpIHJldHVybiAnI2Q3YmE3ZCdcbiAgaWYgKHNldmVyaXR5ID09PSAnaW5mbycpIHJldHVybiAnIzZiOGI4YidcbiAgcmV0dXJuICcjNTY5Y2Q2J1xufVxuXG4vKiogXHU0RTI1XHU5MUNEXHU1RUE2XHU1RjUyXHU0RTAwXHVGRjA4XHU1MTdDXHU1QkI5XHU1Mzg2XHU1M0YyXHU4QkIwXHU1RjU1XHU5MUNDXHU3Njg0IGhpZ2gvbWVkaXVtL2xvd1x1RkYxQlx1NjcyQVx1NzdFNVx1NTZERVx1ODQzRCBtaW5vclx1RkYwOVx1RkYwQ1x1N0VERlx1OEJBMS9cdTdCNUJcdTkwMDkvXHU3NzQwXHU4MjcyXHU1MTcxXHU3NTI4XHUzMDAyICovXG5mdW5jdGlvbiBub3JtYWxpemVJc3N1ZVNldmVyaXR5KHNldmVyaXR5OiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoc2V2ZXJpdHkgPT09ICdoaWdoJykgcmV0dXJuICdtYWpvcidcbiAgaWYgKHNldmVyaXR5ID09PSAnbWVkaXVtJyB8fCBzZXZlcml0eSA9PT0gJ2xvdycpIHJldHVybiAnbWlub3InXG4gIHJldHVybiBzZXZlcml0eSA9PT0gJ2Jsb2NrZXInIHx8IHNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IHNldmVyaXR5ID09PSAnbWFqb3InIHx8IHNldmVyaXR5ID09PSAnbWlub3InIHx8IHNldmVyaXR5ID09PSAnaW5mbydcbiAgICA/IHNldmVyaXR5IDogJ21pbm9yJ1xufVxuXG4vLyBcdTRFM0JcdTk4OThcdTVCRjlcdTZCRDRcdTVFQTZcdTVGMTVcdTY0Q0VcdUZGMDhwYXJzZUNvbG9yIC8gcmVsYXRpdmVMdW1pbmFuY2UgLyBkYXJrZW4vbGlnaHRlbiAvIHRoZW1lQXdhcmVUZXh0XHVGRjA5XG4vLyBcdTVERjJcdTYyQkRcdTUzRDZcdTUyMzAgLi90aGVtZS50cyBcdTdFREZcdTRFMDBcdTdFRjRcdTYyQTRcdTMwMDJcdTUxNjhcdTY1ODdcdTRFRjZcdTRFMERcdTUzRDhcdTVGMEZcdUZGMUFcbi8vIDEpIFx1NUYzQVx1OEMwM1x1ODI3Mlx1NjU4N1x1NUI1N1x1NUZDNVx1OTg3Qlx1N0VDRiB0aGVtZUF3YXJlVGV4dFx1RkYwOFx1NkUzMlx1NjdEM1x1NjcxRlx1OEMwM1x1NzUyOFx1RkYwOVx1RkYxQlxuLy8gMikgYWN0aXZlIFx1OUFEOFx1NEVBRVx1ODBDQ1x1NjY2Rlx1NEUwMFx1NUY4QiBidXR0b24taW5mby1maWxsXHVGRjBDXHU3OTgxXHU2QjYyIGJyYW5kLXByaW1hcnkgXHU0RjVDXHU4MENDXHU2NjZGXG4vLyAgICBcdUZGMDhcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTRFMEJcdThGRDFcdTc2N0RcdUZGMENcdTkxNERcdTc2N0RcdTVCNTdcdTRFMERcdTUzRUZcdTg5QzFcdTIwMTRcdTIwMTRcdTMwMENcdTk4NzVcdTdCN0VcdTc2N0RcdTU3NTdcdTMwMERcdTRFOEJcdTY1NDVcdTY4MzlcdTU2RTBcdUZGMDlcdTMwMDJcblxuLyoqIFx1OEJDNFx1NUJBMVx1NzZFRVx1NjgwN1x1RkYwOGNoYW5nZUlkXHVGRjA5XHUyMTkyIFx1NTNFRlx1OEJGQlx1NjgwN1x1N0I3RVx1RkYxQVx1NTQwOFx1NjIxMCByZXZpZXc6PHNoYT4gXHU2MzA3XHU1NDExXHU2M0QwXHU0RUE0XHVGRjBDY2hnXyogXHU2MzA3XHU1NDExXHU1M0Q4XHU2NkY0XHVGRjBDYWRob2MgXHU0RTNBXHU1REU1XHU0RjVDXHU1MzNBXHUzMDAyICovXG5mdW5jdGlvbiBpc3N1ZVRhcmdldExhYmVsKGNoYW5nZUlkOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBpZCA9IHR5cGVvZiBjaGFuZ2VJZCA9PT0gJ3N0cmluZycgPyBjaGFuZ2VJZCA6ICcnXG4gIGlmIChpZC5zdGFydHNXaXRoKCdyZXZpZXc6JykpIHJldHVybiBgXHU2M0QwXHU0RUE0ICR7aWQuc2xpY2UoNywgMTUpfWBcbiAgaWYgKGlkID09PSAnYWRob2MnKSByZXR1cm4gJ1x1NURFNVx1NEY1Q1x1NTMzQSdcbiAgcmV0dXJuIGBcdTUzRDhcdTY2RjQgJHtpZC5zbGljZSgwLCAxMSl9YFxufVxuXG4vKiogXHU2MDNCXHU3RUQzL1x1N0VEM1x1Njc4NFx1NTMxNlx1N0IxNFx1OEJCMFx1NzY4NFx1OEY3Qlx1OTFDRiBNYXJrZG93biBcdTZFMzJcdTY3RDNcdUZGMUFcdTMwMEMjIyBcdTMwMERcdTgyODJcdTY4MDdcdTk4OThcdTc3NDBcdTgyNzJcdTUyQTBcdTdDOTdcdUZGMENcdTMwMEMtIFx1MzAwRFx1NTIxN1x1ODg2OFx1NTJBMFx1NTcwNlx1NzBCOVx1RkYwQ1x1NTE3Nlx1NEY1OVx1NTM5Rlx1NjgzN1x1MzAwMiAqL1xuZnVuY3Rpb24gcmVuZGVyU3RydWN0dXJlZENvbnRlbnQoY29udGVudDogc3RyaW5nKTogUmVhY3QuUmVhY3ROb2RlW10ge1xuICBpZiAodHlwZW9mIGNvbnRlbnQgIT09ICdzdHJpbmcnIHx8IGNvbnRlbnQgPT09ICcnKSByZXR1cm4gW11cbiAgcmV0dXJuIGNvbnRlbnQuc3BsaXQoJ1xcbicpLm1hcCgobGluZSwgaW5kZXgpID0+IHtcbiAgICBpZiAobGluZS5zdGFydHNXaXRoKCcjIyAnKSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTIuNXB4JywgbWFyZ2luVG9wOiBpbmRleCA9PT0gMCA/IDAgOiAxMCwgbWFyZ2luQm90dG9tOiAyLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+XG4gICAgICAgICAge2xpbmUuc2xpY2UoMyl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cbiAgICBpZiAobGluZS5zdGFydHNXaXRoKCctICcpKSB7XG4gICAgICByZXR1cm4gPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17eyBwYWRkaW5nTGVmdDogMTQsIHRleHRJbmRlbnQ6IC0xMCB9fT5cdTIwMjIge3JlbmRlcldpdGhQZWVrKGxpbmUuc2xpY2UoMikpfTwvZGl2PlxuICAgIH1cbiAgICByZXR1cm4gPGRpdiBrZXk9e2luZGV4fT57bGluZSA9PT0gJycgPyAnXFx1MDBBMCcgOiByZW5kZXJXaXRoUGVlayhsaW5lKX08L2Rpdj5cbiAgfSlcbn1cblxuLyoqIHBlZWsgXHU3MEI5XHU1MUZCXHU1NkRFXHU4QzAzXHVGRjFBXHU3NTMxIFdvcmtzcGFjZUZyYW1lIFx1NkNFOFx1NTE2NVx1RkYwOFx1NkUzMlx1NjdEM1x1NTY2OFx1NEZERFx1NjMwMVx1NkEyMVx1NTc1N1x1N0VBN1x1N0VBRlx1NTFGRFx1NjU3MFx1RkYwOVx1MzAwMiAqL1xubGV0IHBlZWtPcGVuZXI6ICgocGF0aDogc3RyaW5nLCBsaW5lOiBudW1iZXIpID0+IHZvaWQpIHwgdW5kZWZpbmVkXG5cbi8qKiBcdTYyOEFcdTY1ODdcdTY3MkNcdTRFMkRcdTc2ODQgZmlsZTpsaW5lIFx1NUYxNVx1NzUyOFx1NkUzMlx1NjdEM1x1NEUzQVx1NTNFRlx1NzBCOVx1NTFGQlx1ODJBRlx1NzI0N1x1RkYwOFx1NzBCOVx1NTFGQlx1NUYzOVx1NTFGQVx1NEVFM1x1NzgwMVx1NEUwQVx1NEUwQlx1NjU4N1x1RkYwOVx1MzAwMiAqL1xuZnVuY3Rpb24gcmVuZGVyV2l0aFBlZWsodGV4dDogc3RyaW5nKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgY29uc3Qgbm9kZXM6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cbiAgbGV0IGxhc3QgPSAwXG4gIGxldCBtYXRjaDogUmVnRXhwRXhlY0FycmF5IHwgbnVsbFxuICBGSUxFX0xJTkVfUEFUVEVSTi5sYXN0SW5kZXggPSAwXG4gIHdoaWxlICgobWF0Y2ggPSBGSUxFX0xJTkVfUEFUVEVSTi5leGVjKHRleHQpKSAhPT0gbnVsbCkge1xuICAgIGlmIChtYXRjaC5pbmRleCA+IGxhc3QpIG5vZGVzLnB1c2godGV4dC5zbGljZShsYXN0LCBtYXRjaC5pbmRleCkpXG4gICAgY29uc3QgW2Z1bGwsIHBhdGgsIGxpbmVTdHJdID0gbWF0Y2hcbiAgICBub2Rlcy5wdXNoKFxuICAgICAgPGJ1dHRvblxuICAgICAgICBrZXk9e2Ake21hdGNoLmluZGV4fS0ke2Z1bGx9YH1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLCBwYWRkaW5nOiAnMCAxcHgnLCBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJyxcbiAgICAgICAgICBmb250U2l6ZTogJ2luaGVyaXQnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lIGRvdHRlZCcsXG4gICAgICAgIH19XG4gICAgICAgIHRpdGxlPVwiXHU3MEI5XHU1MUZCXHU2N0U1XHU3NzBCXHU0RUUzXHU3ODAxXHU0RTBBXHU0RTBCXHU2NTg3XCJcbiAgICAgICAgb25DbGljaz17KCkgPT4geyBwZWVrT3BlbmVyPy4ocGF0aCwgTnVtYmVyKGxpbmVTdHIpKSB9fVxuICAgICAgPntmdWxsfTwvYnV0dG9uPixcbiAgICApXG4gICAgbGFzdCA9IG1hdGNoLmluZGV4ICsgZnVsbC5sZW5ndGhcbiAgfVxuICBpZiAobGFzdCA8IHRleHQubGVuZ3RoKSBub2Rlcy5wdXNoKHRleHQuc2xpY2UobGFzdCkpXG4gIHJldHVybiBub2Rlcy5sZW5ndGggPT09IDEgPyBub2Rlc1swXSA6IDxzcGFuPntub2Rlc308L3NwYW4+XG59XG5cbi8qKlxuICogXHU4OUM2XHU4OUM5XHU2MzYyXHU1MjE3XHU2ODM3XHU1RjBGXHU4ODY4XHVGRjFBXHU5NjhGXHU2NzJDXHU3RUM0XHU0RUY2XHU2MzAyXHU4RjdEL1x1NTM3OFx1OEY3RFx1RkYwOFx1NTM3OFx1OEY3RFx1NTM3M1x1NUI4Q1x1NTE2OFx1NjA2Mlx1NTkwRFx1NTM5Rlx1NzUxRlx1NUUwM1x1NUM0MFx1RkYwOVx1MzAwMlxuICogXHU2MzYyXHU1MjE3XHU2NjJGXHU2NUUwXHU2NzYxXHU0RUY2XHU3Njg0XHVGRjA4XHU1NDJCXHU2NUIwXHU0RjFBXHU4QkREXHU4NDNEXHU1NzMwXHU5ODc1XHVGRjA5XHUyMDE0XHUyMDE0XHU0RTFBXHU0RTNCXHU4OUM0XHU1MjE5XHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwXHU4OTgxXHU0RTQ4XHU0RTBEXHU2NjNFXHU3OTNBXHUzMDAxXHU4OTgxXHU0RTQ4XHU1QzQ1XHU0RTJEXHVGRjBDXG4gKiBcdTUzRjNcdTRGQTdcdTUzRUFcdTUxNDFcdThCQjhcdTgwNEFcdTU5MjlcdTMwMDIwLjEuMiBcdTY1QjBcdTRGMUFcdThCRERcdTk4NzVcdTRFNUZcdTVFMjYgZGF0YS1kZXRhaWxzLWNvbGxhcHNlZFx1RkYwQ1x1NjZGRVx1NTZFMFx1NUJGOVx1NUI4M1x1OEM0MVx1NTE0RFxuICogXHU2MzYyXHU1MjE3XHU1QkZDXHU4MUY0XHU1REU1XHU0RjVDXHU1M0YwXHU1NzI4XHU2NUIwXHU0RjFBXHU4QkREXHU0RTBCXHU5MDAwXHU1NkRFXHU1MzlGXHU3NTFGXHU1M0YzXHU0RjREXHVGRjA4MjAyNi0wOS0xMCBcdTRGRUVcdTU5MERcdUZGMDlcdTMwMDJcbiAqIFx1NkNFOFx1NjEwRlx1RkYxQVx1Nzk4MVx1NkI2Mlx1NzUyOCA6aGFzKCkgXHU1MDVBXHU3OTU2XHU1MTQ4XHU1MzM5XHU5MTREXHUyMDE0XHUyMDE0XHU1Qjk4XHU2NUI5XHU2Nzg0XHU1RUZBXHU0RUE3XHU3MjY5XHU1MUUwXHU1MzQxXHU0RTJBXHU3RUM0XHU0RUY2XHU2ODM5XHU3QzdCXHU5MEZEXHU1M0VCIHJvb3RcdUZGMENcbiAqIFx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1NEYxQVx1NjI4QVx1NjU3NFx1NEUyQVx1ODA0QVx1NTkyOVx1NUJCOVx1NTY2OFx1OEJFRlx1OTRCM1x1NTIzNlx1RkYwOFx1NTM4Nlx1NTNGMlx1NEU4Qlx1NjU0NVx1RkYwOVx1MzAwMlx1NkI2NFx1ODg2OFx1NTNFQVx1NEZERFx1NzU1OVx1N0Y1MVx1NjgzQ1x1NjM2Mlx1NTIxN1x1NEUwRVx1NjJENlx1NjJGRFx1NjdDNFx1OTY5MFx1ODVDRlx1MzAwMlxuICovXG5jb25zdCBMQVlPVVRfU1RZTEUgPSBgXG5kaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdID4gZGl2W2NsYXNzKj1cImNlbnRlckNvbFwiXSB7IG9yZGVyOiAzOyB9XG5kaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdID4gZGl2W2NsYXNzKj1cImRldGFpbHNDb2xcIl0geyBvcmRlcjogMjsgfVxuZGl2W2NsYXNzKj1cImhhbmRsZVwiXVtkYXRhLXNpZGU9XCJkZXRhaWxzXCJdIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9XG5kaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdIHtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIG1pbm1heCgwLCAxZnIpIHZhcigtLXBjLWNoYXQtdywgMzYwcHgpICFpbXBvcnRhbnQ7XG59XG5gXG5cbi8qKlxuICogXHU0RjFBXHU4QkREXHU3RURGXHU4QkExXHU4ODRDXHU3Njg0XHU0RTI0XHU4ODRDXHU5NEIzXHU1MjM2XHVGRjA4XHU3NTI4XHU2MjM3XHU2MzA3XHU1QjlBXHU3Njg0XHU2ODM3XHU1RjBGXHVGRjA5XHUzMDAyXHU0RTBEXHU4MEZEXHU4RDcwIENTUyBcdTkwMDlcdTYyRTlcdTU2NjhcdUZGMUFcbiAqIFx1NUI5OFx1NjVCOVx1NTkxQVx1NEUyQVx1NkEyMVx1NTc1N1x1NzY4NFx1NjgzOVx1N0M3Qlx1OTBGRFx1NTNFQiBgcm9vdGBcdUZGMDhcdTY3ODRcdTVFRkFcdTU0MEVcdTY2MkYgYGhhc2hfcm9vdGBcdUZGMDlcdUZGMENcdTUxNzZcdTRFMkRcbiAqIENvbnZlcnNhdGlvblJvb3QgXHU3Njg0XHU1QjUwXHU2ODExXHU5MUNDXHU1QzMxXHU1MzA1XHU1NDJCXHU3RURGXHU4QkExXHU4ODRDXHU3Njg0IGBoYXNoX3NlcGAgXHU1MjA2XHU5Njk0IHNwYW5cdTIwMTRcdTIwMTRcbiAqIFx1NEVGQlx1NEY1NVx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1RkYwOFx1NTQyQiA6aGFzKClcdUZGMDlcdTkwRkRcdTRGMUFcdTYyOEFcdTY1NzRcdTRFMkFcdTgwNEFcdTU5MjlcdTVCQjlcdTU2NjhcdTk0QjNcdTYyMTBcdTRFMjRcdTg4NENcdUZGMENcdTY3NDBcdTZCN0JcdTZFREFcdTUyQThcdTMwMDJcbiAqIFx1NTZFMFx1NkI2NFx1NTcyOFx1OEZEMFx1ODg0Q1x1NjVGNlx1NjMwOVx1NTUyRlx1NEUwMFx1NUY2Mlx1NzJCNlx1NUI5QVx1NEY0RFx1RkYxQVx1NUM0NVx1NEUyRFx1NjM5Mlx1NzI0OCArIFx1NzZGNFx1NjNBNVx1NUI1MFx1NEVFM1x1NTQyQlx1NjU4N1x1NjcyQyBcInxcIiBcdTc2ODRcbiAqIFx1NTIwNlx1OTY5NCBzcGFuXHVGRjBDXHU1NDdEXHU0RTJEXHU1NDBFXHU2MjhBXHU1Qjk4XHU2NUI5XHU3QzdCXHU1NDBEXHU1MzlGXHU2ODM3XHU1MTk5XHU4RkRCXHU2ODM3XHU1RjBGXHU4ODY4XHVGRjA4XHU3Q0JFXHU1MUM2XHU1MjMwXHU2Nzg0XHU1RUZBXHU1NEM4XHU1RTBDXHVGRjA5XHUzMDAyXG4gKiBAcmV0dXJucyBcdTZDRThcdTUxNjVcdTc2ODQgc3R5bGUgXHU1MTQzXHU3RDIwXHVGRjFCXHU1Qjk4XHU2NUI5XHU2NzJBXHU2RTMyXHU2N0QzXHU3RURGXHU4QkExXHU4ODRDXHU2NUY2XHU0RTNBIHVuZGVmaW5lZFx1MzAwMlxuICovXG5jb25zdCBhcHBseVN0YXRzTGluZUNsYW1wID0gKCk6IEhUTUxTdHlsZUVsZW1lbnQgfCB1bmRlZmluZWQgPT4ge1xuICBjb25zdCBzZXBTcGFuID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxTcGFuRWxlbWVudD4oJ2RpdltjbGFzcyo9XCJfcm9vdFwiXSA+IHNwYW5bY2xhc3MqPVwiX3NlcFwiXScpKVxuICAgIC5maW5kKChzcGFuKSA9PiBzcGFuLnRleHRDb250ZW50ID09PSAnfCcpXG4gIGNvbnN0IHJvb3REaXYgPSBzZXBTcGFuPy5wYXJlbnRFbGVtZW50XG4gIGNvbnN0IGhhc2hDbGFzcyA9IHJvb3REaXY/LmNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pLmZpbmQoKG5hbWUpID0+IG5hbWUuZW5kc1dpdGgoJ19yb290JykpXG4gIGlmIChyb290RGl2ID09PSB1bmRlZmluZWQgfHwgcm9vdERpdiA9PT0gbnVsbCB8fCBoYXNoQ2xhc3MgPT09IHVuZGVmaW5lZCB8fCBnZXRDb21wdXRlZFN0eWxlKHJvb3REaXYpLnRleHRBbGlnbiAhPT0gJ2NlbnRlcicpIHJldHVybiB1bmRlZmluZWRcbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gIHN0eWxlLmlkID0gJ3BjLXN0YXRzLWNsYW1wJ1xuICBzdHlsZS50ZXh0Q29udGVudCA9IGBcbmRpdltjbGFzcz1cIiR7aGFzaENsYXNzfVwiXSB7XG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAtd2Via2l0LWxpbmUtY2xhbXA6IDI7XG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XG4gIHRleHQtb3ZlcmZsb3c6IGNsaXA7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgbWF4LXdpZHRoOiAxMDAlO1xufVxuYFxuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKVxuICByZXR1cm4gc3R5bGVcbn1cblxudHlwZSBUYWJLZXkgPSAnY29tbWl0cycgfCAnb3ZlcnZpZXcnIHwgJ2V4ZWN1dGlvbicgfCAncmV2aWV3JyB8ICdub3RlcycgfCAnc2V0dGluZ3MnXG5cbmV4cG9ydCBpbnRlcmZhY2UgV29ya3NwYWNlRnJhbWVQcm9wcyB7XG4gIC8qKiBcdTVCOThcdTY1QjkgZGV0YWlscyBcdTY5RkRcdTU5NTFcdTdFQTZcdTc2ODQgbG9jYWxlIFx1NkNFOFx1NTE2NVx1RkYwOFx1NjIxMVx1NEVFQ1x1NkNFOFx1NTE4Q1x1NzY4NCBwcm9qZWN0LWNvbnRyb2wgXHU4QkNEXHU1MTc4XHVGRjA5XHUzMDAyICovXG4gIHQ/OiAoa2V5OiBzdHJpbmcpID0+IHN0cmluZ1xuICAvKiogXHU1RjUzXHU1MjREXHU0RjFBXHU4QkREIGlkXHVGRjA4XHU1Qjk4XHU2NUI5IHNlc3Npb24gXHU2ODA3XHU1MUM2XHU1QzVFXHU2MDI3XHVGRjFCXHU1MjA3XHU2MzYyXHU0RjFBXHU4QkREXHU2NUY2XHU5MUNEXHU2NUIwXHU2NDkxXHU1RjAwXHU1REU1XHU0RjVDXHU1M0YwXHU4RjY4XHU5MDUzXHVGRjA5XHUzMDAyICovXG4gIHNlc3Npb25JZD86IHN0cmluZ1xuICAvKiogXHU2NUIwXHU3MjQ4XHU1QkJGXHU0RTNCXHU3NTMxXHU1OTE2XHU1QzQyXHU1MkEwXHU2Q0Q1XHU2RDZFXHU1QzQyXHU3QkExXHU3NDA2XHU1RTAzXHU1QzQwXHVGRjBDXHU0RTBEXHU0RjdGXHU3NTI4XHU2NUU3XHU3MjQ4IGRldGFpbHMgXHU2MzYyXHU1MjE3XHUzMDAyICovXG4gIGxheW91dE1vZGU/OiAnbGVnYWN5JyB8ICdvdmVybGF5J1xufVxuXG4vKiogXHU1REU1XHU0RjVDXHU1M0YwXHU2NTg3XHU2ODQ4XHU4QkNEXHU1MTc4XHVGRjA4emggLyBlblx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGNvbnN0IFdPUktTUEFDRV9ESUNUID0ge1xuICB6aDoge1xuICAgICd3b3Jrc3BhY2UudGl0bGUnOiAnXHU5ODc5XHU3NkVFXHU2ODM4XHU2N0U1XHU1M0YwJyxcbiAgICAnd29ya3NwYWNlLnNlbGVjdFNlc3Npb24nOiAnXHU4QkY3XHU1MTQ4XHU1NzI4XHU1REU2XHU0RkE3XHU5MDA5XHU2MkU5XHU5ODc5XHU3NkVFXHU0RTBCXHU3Njg0XHU0RjFBXHU4QkREXHVGRjBDXHU1REU1XHU0RjVDXHU1M0YwXHU2MjREXHU0RjFBXHU2NjNFXHU3OTNBXHU4QkU1XHU5ODc5XHU3NkVFXHU3Njg0XHU2NTcwXHU2MzZFXHUzMDAyJyxcbiAgICAndGFiLmNvbW1pdHMnOiAnXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1JyxcbiAgICAndGFiLm92ZXJ2aWV3JzogJ1x1OTg3OVx1NzZFRVx1NjAzQlx1ODlDOCcsXG4gICAgJ3RhYi5leGVjdXRpb24nOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzJyxcbiAgICAndGFiLnJldmlldyc6ICdSZXZpZXcgXHU5NUVFXHU5ODk4JyxcbiAgICAndGFiLm5vdGVzJzogJ1x1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNicsXG4gICAgJ3RhYi5zZXR0aW5ncyc6ICdcdThCQkVcdTdGNkUnLFxuICAgICdlcnJvci5sb2FkJzogJ1x1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNScsXG4gICAgJ3N0YXRlLnByb2plY3QnOiAnXHU1RjUzXHU1MjREXHU5ODc5XHU3NkVFJyxcbiAgICAnc3RhdGUubm9Qcm9qZWN0JzogJ1x1NUMxQVx1NjcyQVx1NTIxRFx1NTlDQlx1NTMxNlx1OTg3OVx1NzZFRScsXG4gICAgJ3N0YXRlLm5vUHJvamVjdEhpbnQnOiAnXHU3MEI5XHU1MUZCXHUzMDBDXHU1MjFEXHU1OUNCXHU1MzE2XHU5ODc5XHU3NkVFXHUzMDBEXHU2MjZCXHU2M0NGXHU0RUQzXHU1RTkzXHU3RUQzXHU2Nzg0XHUzMDAxXHU2MjgwXHU2NzJGXHU2ODA4XHU0RTBFXHU3QjI2XHU1M0Y3XHU3RDIyXHU1RjE1XHUzMDAyJyxcbiAgICAnYWN0aW9uLmJvb3RzdHJhcCc6ICdcdTUyMURcdTU5Q0JcdTUzMTZcdTk4NzlcdTc2RUUnLFxuICAgICdhY3Rpb24ucmVzY2FuJzogJ1x1OTFDRFx1NjVCMFx1NTIxRFx1NTlDQlx1NTMxNiAvIFx1NjI2Qlx1NjNDRicsXG4gICAgJ2FjdGlvbi5hbmFseXplJzogJ1x1NTIwNlx1Njc5MFx1NUY1M1x1NTI0RFx1NjUzOVx1NTJBOCcsXG4gICAgJ2FjdGlvbi5yZXZpZXcnOiAnXHU4QkM0XHU1QkExXHU1RjUzXHU1MjREXHU2NTM5XHU1MkE4JyxcbiAgICAnYWN0aW9uLnZlcmlmeSc6ICdcdTlBOENcdTY1MzZcdTVGNTNcdTUyNERcdTY1MzlcdTUyQTgnLFxuICAgICdhY3Rpb24uY3JlYXRlQ2hhbmdlJzogJ1x1NjVCMFx1NUVGQVx1NTNEOFx1NjZGNCcsXG4gICAgJ2FjdGlvbi5ydW5uaW5nJzogJ1x1NjI2N1x1ODg0Q1x1NEUyRFx1MjAyNicsXG4gICAgJ2FjdGlvbi5yZWZyZXNoJzogJ1x1NTIzN1x1NjVCMCcsXG4gICAgJ2Zvcm0uY2hhbmdlVGl0bGUnOiAnXHU1M0Q4XHU2NkY0XHU2ODA3XHU5ODk4JyxcbiAgICAnZm9ybS5jaGFuZ2VEZXNjJzogJ1x1OTcwMFx1NkM0Mlx1NEUwRVx1ODBDQ1x1NjY2Rlx1RkYwOFx1OTAwOVx1NTg2Qlx1RkYwOScsXG4gICAgJ3Jlc3VsdC5wYW5lbCc6ICdcdTY0Q0RcdTRGNUNcdTdFRDNcdTY3OUMnLFxuXG4gICAgJ3JlcG8uc2Nhbkhpc3RvcnknOiAnXHU5MUNEXHU1RUZBXHU1Mzg2XHU1M0YyJyxcbiAgICAncmVwby5jb21taXRzJzogJ1x1NjNEMFx1NEVBNCcsXG4gICAgJ3JlcG8uYnJhbmNoJzogJ1x1NTIwNlx1NjUyRicsXG4gICAgJ3JlcG8ud29ya2luZyc6ICdcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQTgnLFxuICAgICdyZXBvLndvcmtpbmdDbGVhbic6ICdcdTVERTVcdTRGNUNcdTUzM0FcdTVFNzJcdTUxQzBcdUZGMENcdTY1RTBcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQTgnLFxuICAgICdyZXBvLmVtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1NjNEMFx1NEVBNFx1MzAwMicsXG4gICAgJ3JlcG8ubG9hZEZhaWxlZCc6ICdcdTYzRDBcdTRFQTRcdTUyQTBcdThGN0RcdTU5MzFcdThEMjUnLFxuICAgICdwaWNrZXIudGl0bGUnOiAnXHU5MDA5XHU2MkU5XHU4OTgxXHU2ODM4XHU2N0U1XHU3Njg0XHU2M0QwXHU0RUE0XHVGRjA4XHU1M0VGXHU1OTFBXHU5MDA5XHVGRjA5JyxcbiAgICAncGlja2VyLnBsYWNlaG9sZGVyJzogJ1x1NzBCOVx1NTFGQlx1OTAwOVx1NjJFOVx1NjNEMFx1NEVBNFx1RkYwOFx1NTNFRlx1NTkxQVx1OTAwOVx1RkYwQ1x1NTQyQlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOScsXG4gICAgJ3BpY2tlci5zZWxlY3RlZCc6ICdcdTVERjJcdTkwMDknLFxuICAgICdwaWNrZXIuZmlsdGVyJzogJ1x1NjMwOVx1NjgwN1x1OTg5OC9cdTU0QzhcdTVFMEMvXHU0RjVDXHU4MDA1XHU4RkM3XHU2RUU0XHUyMDI2JyxcbiAgICAncGlja2VyLmNsZWFyJzogJ1x1NkUwNVx1N0E3QScsXG4gICAgJ3BpY2tlci5ub01hdGNoJzogJ1x1NjVFMFx1NTMzOVx1OTE0RFx1NjNEMFx1NEVBNFx1MzAwMicsXG4gICAgJ3BpY2tlci5oaW50JzogJ1x1NTJGRVx1OTAwOVx1NjNEMFx1NEVBNFx1NTQwRVx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMCBBSSBcdTg5RTNcdThCRkJcdUZGMUJcdTRFMEJcdTY1QjlcdTUzRUZcdTUxOERcdThERDFcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdTRFMEVcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTVcdTMwMDInLFxuICAgICdwaWNrZXIucm91bmQnOiAnXHU3QjJDIHtufSBcdThGNkUnLFxuICAgICdwaWNrZXIucm91bmRMYXRlc3QnOiAnXHU3QjJDIHtufSBcdThGNkVcdUZGMDhcdTY3MDBcdTY1QjBcdUZGMDknLFxuICAgICdwaWNrZXIucm91bmRTZWxlY3QnOiAnXHU5MDA5XHU2NTc0XHU4RjZFJyxcbiAgICAncGlja2VyLnJvdW5kQ2xlYXInOiAnXHU1M0Q2XHU2RDg4XHU2NzJDXHU4RjZFJyxcbiAgICAncGlja2VyLnVuZGlnZXN0ZWQnOiAnXHU0RTBBXHU2QjIxIEFJIFx1NjAzQlx1N0VEM1x1NEU0Qlx1NTQwRVx1MzAwMVx1NEUxNFx1NUMxQVx1NjcyQVx1NzUxRlx1NjIxMFx1OEZDNyBBSSBcdTg5RTNcdThCRkJcdTc2ODRcdTY1QjBcdTYzRDBcdTRFQTQnLFxuICAgICdwaWNrZXIudW5kaWdlc3RlZENvdW50JzogJ3tufSBcdTRFMkFcdTYzRDBcdTRFQTRcdTY3MkFcdTZEODhcdTUzMTYnLFxuICAgICdwaWNrZXIuc2VsZWN0QWxsVW5kaWdlc3RlZCc6ICdcdTUxNjhcdTkwMDlcdTY3MkFcdTZEODhcdTUzMTYnLFxuICAgICdwaWNrZXIuZGlnZXN0QWxsJzogJ1x1NEUwMFx1OTUyRVx1NkQ4OFx1NTMxNicsXG4gICAgJ3BpY2tlci5kaWdlc3RBbGxIaW50JzogJ1x1OTAwOVx1NEUyRFx1NTE2OFx1OTBFOFx1NjcyQVx1NkQ4OFx1NTMxNlx1NjNEMFx1NEVBNFx1NUU3Nlx1NjI3OVx1OTFDRiBBSSBcdTg5RTNcdThCRkJcdUZGMDhcdTVFNzZcdTUzRDEgM1x1RkYwQ1x1NjcwOVx1N0YxM1x1NUI1OFx1RkYwOVx1RkYwQ1x1NUI4Q1x1NjIxMFx1NTQwRVx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1NjU3NFx1NEY1M1x1NTNEOVx1NEU4Qlx1RkYxQlx1NEU0Qlx1NTQwRVx1NTIzMFx1MzAwQ1x1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNlx1MzAwRFx1NzUxRlx1NjIxMFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1NTM3M1x1NTNFRlx1OTFDRFx1N0Y2RVx1NjcyQVx1NkQ4OFx1NTMxNlx1NjgwN1x1OEJCMCcsXG4gICAgJ25hcnJhdGl2ZS5kaWdlc3RIaW50JzogJ1x1NjU3NFx1NEY1M1x1NTNEOVx1NEU4Qlx1NURGMlx1NzUxRlx1NjIxMFx1MzAwMlx1NTIzMFx1MzAwQ1x1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNlx1MzAwRFx1OTg3NVx1NzUxRlx1NjIxMCBBSSBcdTVCNjZcdTRFNjBcdTYwM0JcdTdFRDNcdUZGMENcdTUzNzNcdTUzRUZcdTkxQ0RcdTdGNkVcdTMwMENcdTY3MkFcdTZEODhcdTUzMTZcdTMwMERcdTY4MDdcdThCQjBcdTMwMDInLFxuICAgICdpbXBhY3QuZmFjdG9ycyc6ICdcdTk4Q0VcdTk2NjlcdTY3ODRcdTYyMTBcdUZGMDhcdTRFM0FcdTRFQzBcdTRFNDhcdTY2MkZcdThGRDlcdTRFMkFcdTdCNDlcdTdFQTdcdUZGMDknLFxuICAgICdpbXBhY3QucG9pbnRzJzogJ1x1NUY3MVx1NTRDRFx1NzBCOVx1NjYwRVx1N0VDNicsXG4gICAgJ2ltcGFjdC5rZXlQb2ludHMnOiAnXHU1MTczXHU5NTJFXHU3RUM0XHU0RUY2JyxcbiAgICAnaW1wYWN0Lm1lbW9yeSc6ICdcdTdFRDNcdTU0MDhcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdTY4MzhcdTY3RTUnLFxuICAgICdpbXBhY3QuZnVuY3Rpb25zJzogJ1x1NTNEN1x1NUY3MVx1NTRDRFx1NTFGRFx1NjU3MFx1RkYwOFx1OEMwMVx1OEMwM1x1NzUyOFx1NEU4Nlx1ODhBQlx1NjUzOVx1NzY4NFx1NEVFM1x1NzgwMVx1RkYwOScsXG4gICAgJ2ltcGFjdC5mdW5jUm9sZSc6ICdcdTUxRkRcdTY1NzBcdTUyOUZcdTgwRkQnLFxuICAgICdpbXBhY3QuZnVuY0NoYW5nZSc6ICdcdTY3MkNcdTZCMjFcdTUzRDhcdTUzMTYnLFxuICAgICdpbXBhY3QuZnVuY0NhbGxlcnMnOiAnXHU1QkY5XHU4QzAzXHU3NTI4XHU2NUI5XHU3Njg0XHU1RjcxXHU1NENEJyxcbiAgICAnY2FjaGUuaGl0JzogJ1x1Njc2NVx1ODFFQVx1N0YxM1x1NUI1OCcsXG4gICAgJ2NhY2hlLnJlZ2VuZXJhdGUnOiAnXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwJyxcbiAgICAnY29zdC50b29sdGlwJzogJ1x1NjcyQ1x1NkIyMSBBSSBcdThDMDNcdTc1MjhcdTYyMTBcdTY3MkNcdUZGMDhcdTRGMzBcdTdCOTdcdUZGMENcdTYzMDkgRGVlcFNlZWsgXHU0RUY3XHU3NkVFXHU2Mjk4XHU3Qjk3XHVGRjA5JyxcbiAgICAnZXhlYy5jcmVhdGUnOiAnXHU2NUIwXHU1RUZBXHU2MjY3XHU4ODRDJyxcbiAgICAnZXhlYy5mb3JtVGl0bGUnOiAnXHU4OTgxXHU1MDVBXHU0RUMwXHU0RTQ4XHVGRjA4XHU0RTAwXHU1M0U1XHU4QkREXHVGRjA5JyxcbiAgICAnZXhlYy5mb3JtRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMUFcdTc2RUVcdTY4MDdcdTMwMDFcdTZEODlcdTUzQ0FcdTZBMjFcdTU3NTdcdTMwMDFcdTlBOENcdTY1MzZcdTY4MDdcdTUxQzYnLFxuICAgICdleGVjLnN0YXJ0JzogJ1x1NUYwMFx1NTlDQlx1NjI2N1x1ODg0QycsXG4gICAgJ2V4ZWMuc3RhcnRpbmcnOiAnXHU2QjYzXHU1NzI4XHU1NDJGXHU1MkE4XHUyMDI2JyxcbiAgICAnZXhlYy5jcmVhdGVIaW50JzogJ1x1NTIxQlx1NUVGQVx1NTNEOFx1NjZGNFx1NUU3Nlx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1OEJBMVx1NTIxMlx1RkYwQ1x1OTY4Rlx1NTQwRVx1NzUzMSBBSSBcdTVCNTBcdTRFRTNcdTc0MDZcdTkwMTBcdTZCNjVcdTYyNjdcdTg4NENcdUZGMUJcdThGREJcdTVFQTZcdTU3MjhcdTRFMEJcdTY1QjlcdTVCOUVcdTY1RjZcdTUyMzdcdTY1QjBcdUZGMENcdTY1RTBcdTk3MDBcdTUzQkJcdTgwNEFcdTU5MjlcdTMwMDInLFxuICAgICdleGVjLm1vZGVsRGVmYXVsdCc6ICdcdTYyNjdcdTg4NENcdTZBMjFcdTU3OEJcdUZGMDhcdTg5RDJcdTgyNzJcdTlFRDhcdThCQTRcdUZGMUFcdTUyMDZcdTY3OTAvXHU2NENEXHU0RjVDPVx1NUZFQlx1RkYwQ1x1NUYwMFx1NTNEMT1cdTY4MDdcdTUxQzZcdUZGMENcdTg5QzRcdTUyMTI9XHU2M0E4XHU3NDA2XHVGRjBDXHU5QThDXHU2NTM2PVx1OUE4Q1x1NjUzNlx1N0VBN1x1RkYwOScsXG4gICAgJ2JhZGdlLnJ1bm5pbmcnOiAne259IFx1NEUyQVx1NEVGQlx1NTJBMVx1OEZEMFx1ODg0Q1x1NEUyRFx1RkYwQ1x1NzBCOVx1NTFGQlx1NjdFNVx1NzcwQicsXG4gICAgJ25hcnJhdGl2ZS50aXRsZSc6ICdcdTVERTVcdTRGNUNcdThGNkVcdTZCMjFcdTUzRDlcdTRFOEInLFxuICAgICduYXJyYXRpdmUuZ2VuZXJhdGUnOiAnXHU2NTc0XHU0RjUzXHU4OUUzXHU4QkZCXHU4RkQ5XHU4RjZFXHU1REU1XHU0RjVDJyxcbiAgICAnbmFycmF0aXZlLnJ1bm5pbmcnOiAnXHU4OUUzXHU4QkZCXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4XHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXG4gICAgJ2JhZGdlLmZhaWxlZCc6ICd7bn0gXHU0RTJBXHU0RUZCXHU1MkExXHU5NzAwXHU4OTgxXHU1OTA0XHU3NDA2XHVGRjBDXHU3MEI5XHU1MUZCXHU2N0U1XHU3NzBCJyxcbiAgICAnZXhlYy5mbG93Q3JlYXRlJzogJ1x1NTg2Qlx1NTE5OVx1NEVGQlx1NTJBMScsXG4gICAgJ2V4ZWMuZmxvd09yY2hlc3RyYXRlJzogJ1x1Nzg2RVx1OEJBNFx1N0YxNlx1NjM5Mlx1RkYwOFx1NkJDRlx1NkI2NVx1NTNFRlx1NjUzOVx1NkEyMVx1NTc4Qi9cdTg5RDJcdTgyNzIvXHU1OTMxXHU4RDI1XHU3QjU2XHU3NTY1XHVGRjA5JyxcbiAgICAnZXhlYy5mbG93UnVuJzogJ1x1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYwOFJ1biBcdThCRTZcdTYwQzVcdTc3MEJcdThGREJcdTVFQTZcdTRFMEVcdTYyMTBcdTY3MkNcdUZGMDknLFxuICAgICdleGVjLmZsb3dNZW1vcnknOiAnXHU4MUVBXHU1MkE4XHU2M0QwXHU3MEJDXHU4QkIwXHU1RkM2XHVGRjA4XHU4QkIwXHU1RkM2XHU5NzYyXHU2NzdGXHU3ODZFXHU4QkE0XHVGRjA5JyxcbiAgICAnZXhlYy5wbGFubmluZyc6ICdcdTdGMTZcdTYzOTJcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhMTE0gXHU2QjYzXHU1NzI4XHU2MkM2XHU4OUUzXHU0RUZCXHU1MkExXHVGRjBDXHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXG4gICAgJ2V4ZWMuY29sLnN0ZXBzJzogJ1x1NkI2NVx1OUFBNCcsXG4gICAgJ25vdGVzLmVkaXQnOiAnXHU3RjE2XHU4RjkxJyxcbiAgICAnbm90ZXMudG9NZW1vcnknOiAnXHU4RjZDXHU4QkIwXHU1RkM2JyxcbiAgICAnbm90ZXMudG9NZW1vcnlIaW50JzogJ1x1NjI4QVx1OEZEOVx1Njc2MVx1N0IxNFx1OEJCMFx1NzY4NFx1NjgwN1x1OTg5OFx1NEUwRVx1NTE4NVx1NUJCOVx1NTg2Qlx1NTE2NVx1NEUwQlx1NjVCOVx1OEJCMFx1NUZDNlx1ODg2OFx1NTM1NVx1RkYwQ1x1Nzg2RVx1OEJBNFx1NTQwRVx1NTE2NVx1NUU5MycsXG4gICAgJ25vdGVzLnRvTWVtb3J5RG9uZSc6ICdcdTI3MTMgXHU1REYyXHU1ODZCXHU1MTY1XHU4QkIwXHU1RkM2XHU4ODY4XHU1MzU1XHVGRjA4XHU1NzI4XHU0RTBCXHU2NUI5XHUzMDBDXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHUzMDBEXHU1MzNBXHU3ODZFXHU4QkE0XHU3QzdCXHU1NzhCXHU1NDBFXHU2REZCXHU1MkEwXHVGRjA5JyxcbiAgICAnbm90ZXMuY29weU1kJzogJ1x1NTkwRFx1NTIzNiBNRCcsXG4gICAgJ25vdGVzLmNvcHlNZEhpbnQnOiAnXHU2MjhBXHU4RkQ5XHU2NzYxXHU3QjE0XHU4QkIwXHU1OTBEXHU1MjM2XHU0RTNBIE1hcmtkb3duIFx1NTIzMFx1NTI2QVx1OEQzNFx1Njc3RicsXG4gICAgJ25vdGVzLmNvcHlNZERvbmUnOiAnXHU1REYyXHU1OTBEXHU1MjM2XHU0RTNBIE1hcmtkb3duJyxcbiAgICAnbm90ZXMuZXhwb3J0TWQnOiAnXHU1QkZDXHU1MUZBIE1EJyxcbiAgICAnbm90ZXMuZXhwb3J0TWRIaW50JzogJ1x1NEUwQlx1OEY3RFx1NEUzQSAubWQgXHU2NTg3XHU0RUY2JyxcbiAgICAnbm90ZXMuZXhwb3J0RG9uZSc6ICdcdTVERjJcdTVCRkNcdTUxRkFcdTRFM0EgLm1kIFx1NjU4N1x1NEVGNicsXG4gICAgJ25vdGVzLmRpZ2VzdE5ldmVyJzogJ1x1NUMxQVx1NjcyQVx1NzUxRlx1NjIxMFx1OEZDNyBBSSBcdTYwM0JcdTdFRDMnLFxuICAgICdub3Rlcy5kaWdlc3RQZW5kaW5nJzogJ1x1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NTQwRVx1NjcwOSB7bn0gXHU0RTJBXHU2NUIwXHU2M0QwXHU0RUE0XHU2NzJBXHU2RDg4XHU1MzE2JyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlJzogJ1x1NUI1OFx1NEUzQVx1N0IxNFx1OEJCMCcsXG4gICAgJ2RldGFpbC5zYXZlTm90ZUhpbnQnOiAnXHU2MjhBXHU2NzJDXHU2QjIxXHU2ODM4XHU2N0U1XHU3RUQzXHU4QkJBXHVGRjA4XHU2NTM5XHU0RTg2XHU0RUMwXHU0RTQ4L1x1NUI5RVx1NzNCMFx1OTAzQlx1OEY5MS9cdTk4Q0VcdTk2NjlcdTcwQjlcdUZGMDlcdTRFMDBcdTk1MkVcdTVCNThcdTRFM0FcdTdFRDNcdTY3ODRcdTUzMTZcdTdCMTRcdThCQjAnLFxuICAgICdkZXRhaWwuc2F2ZU5vdGVUaXRsZSc6ICdcdTY4MzhcdTY3RTVcdThCQjBcdTVGNTUnLFxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeSc6ICdcdTZDODlcdTZEQzBcdTRFM0FcdThCQjBcdTVGQzYnLFxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeUhpbnQnOiAnXHU2MjhBXHU2NzJDXHU2QjIxXHU2ODM4XHU2N0U1XHU3RUQzXHU4QkJBXHU2Qzg5XHU2REMwXHU0RTNBXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHVGRjA4XHU4RkRCXHU1MTY1XHU1Rjg1XHU3ODZFXHU4QkE0XHU5NjFGXHU1MjE3XHVGRjA5JyxcbiAgICAnbm90ZXMuc2F2ZSc6ICdcdTRGRERcdTVCNTgnLFxuICAgICdub3Rlcy5jYW5jZWwnOiAnXHU1M0Q2XHU2RDg4JyxcbiAgICAnbWVtb3J5LmJyYW5jaFNjb3BlJzogJ1x1NTIwNlx1NjUyRicsXG4gICAgJ21lbW9yeS5icmFuY2hBbGwnOiAnXHU1MTY4XHU5MEU4XHU1MjA2XHU2NTJGJyxcbiAgICAnbm90ZXMuc2VhcmNoJzogJ1x1NjQxQ1x1N0QyMlx1N0IxNFx1OEJCMFx1MjAyNicsXG4gICAgJ21vZGVsLnRpdGxlJzogJ1x1NkEyMVx1NTc4Qlx1NTIwNlx1OTE0RFx1RkYwOFx1ODlFM1x1OEJGQiAvIFx1NjAzQlx1N0VEM1x1N0I0OVx1NEVGQlx1NTJBMVx1NzUyOFx1NTRFQVx1NEUyQVx1NkEyMVx1NTc4Qlx1RkYwOScsXG4gICAgJ21vZGVsLmxvYWRpbmcnOiAnXHU4QkZCXHU1M0Q2XHU2QTIxXHU1NzhCXHU2RTA1XHU1MzU1XHUyMDI2JyxcbiAgICAnbW9kZWwuZm9sbG93Q2hhdCc6ICdcdThEREZcdTk2OEZcdTgwNEFcdTU5MjlcdTZBMjFcdTU3OEInLFxuICAgICdtb2RlbC5zYXZlJzogJ1x1NEZERFx1NUI1OFx1NUU3Nlx1NzUxRlx1NjU0OCcsXG4gICAgJ21vZGVsLnNhdmVkJzogJ1x1NURGMlx1NzUxRlx1NjU0OCcsXG4gICAgJ21vZGVsLmhpbnQnOiAnXHU0RkREXHU1QjU4XHU1NDBFXHU3QUNCXHU1MzczXHU3NTFGXHU2NTQ4XHU1RTc2XHU2MzAxXHU0RTQ1XHU1MzE2XHVGRjA4XHU5MUNEXHU1NDJGXHU1NDBFXHU0RkREXHU3NTU5XHVGRjA5XHVGRjFCXHU0RTBEXHU1RjcxXHU1NENEXHU4MDRBXHU1OTI5XHU2QTIxXHU1NzhCXHUzMDAyJyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5JzogJ0FJIFx1NjAzQlx1N0VEM1x1N0IxNFx1OEJCMCcsXG4gICAgJ25vdGVzLmFpU3VtbWFyeVJ1bic6ICdcdTYwM0JcdTdFRDNcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhcdTdFQTYgMTAtMzAgXHU3OUQyXHVGRjA5JyxcbiAgICAnbm90ZXMuZXhwYW5kJzogJ1x1NUM1NVx1NUYwMFx1NTE2OFx1NjU4NycsXG4gICAgJ25vdGVzLmNvbGxhcHNlJzogJ1x1NjUzNlx1OEQ3NycsXG4gICAgJ25vdGVzLnN1bW1hcnlUYWcnOiAnQUkgXHU2MDNCXHU3RUQzJyxcbiAgICAnbm90ZXMuZW1wdHlTZWFyY2gnOiAnXHU2NUUwXHU1MzM5XHU5MTREXHU3QjE0XHU4QkIwXHUzMDAyJyxcbiAgICAnbm90ZXMuY29udGVudEhpbnQnOiAnXHU3QjE0XHU4QkIwXHU1MTg1XHU1QkI5XHVGRjA4XHU2NTJGXHU2MzAxXHU1OTFBXHU4ODRDXHVGRjA5XHVGRjFBXHU3RUQzXHU4QkJBXHUzMDAxXHU3NTkxXHU5NUVFXHUzMDAxXHU1QjY2XHU0RTYwXHU4OTgxXHU3MEI5XHUzMDAxXHU1MTczXHU5NTJFXHU1MUIzXHU3QjU2XHUyMDI2JyxcbiAgICAnbm90ZXMudGFnc0hpbnQnOiAnXHU2ODA3XHU3QjdFXHVGRjA4XHU5MDE3XHU1M0Y3XHU1MjA2XHU5Njk0XHVGRjBDXHU5MDA5XHU1ODZCXHVGRjFCXHU0RkREXHU1QjU4XHU1NDBFXHU1M0VGXHU3MEI5XHU1MUZCXHU3QjVCXHU5MDA5XHVGRjA5JyxcbiAgICAnbm90ZXMucGluJzogJ1x1N0Y2RVx1OTg3NicsXG4gICAgJ25vdGVzLnVucGluJzogJ1x1NTNENlx1NkQ4OFx1N0Y2RVx1OTg3NicsXG4gICAgJ25vdGVzLmVkaXRlZEF0JzogJ1x1N0YxNlx1OEY5MVx1NEU4RScsXG4gICAgJ3Jldmlldy5maWx0ZXJBbGwnOiAnXHU1MTY4XHU5MEU4JyxcbiAgICAncmV2aWV3LnN0YXR1c0FsbCc6ICdcdTUxNjhcdTkwRThcdTcyQjZcdTYwMDEnLFxuICAgICdyZXZpZXcudmVyaWZ5JzogJ1x1NTkwRFx1NjhDMCcsXG4gICAgJ3Jldmlldy52ZXJpZnlSdW5uaW5nJzogJ1x1NTkwRFx1NjhDMFx1NEUyRFx1MjAyNicsXG4gICAgJ3Jldmlldy52ZXJpZnlIaW50JzogJ1x1NEZFRVx1NjUzOVx1NEVFM1x1NzgwMVx1NTQwRVx1NzBCOVx1NTFGQlx1RkYxQVx1ODFFQVx1NTJBOFx1NjhDMFx1NkQ0Qlx1OTVFRVx1OTg5OFx1NjYyRlx1NTQyNlx1NEZFRVx1NTkwRFx1MzAwMVx1NjUzOVx1NTJBOFx1NjYyRlx1NTQyNlx1NjcwMFx1NEYxOC9cdTY3MDBcdTVDMEZcdTRGQjVcdTUxNjVcdTMwMDFcdTY3MDlcdTY1RTBcdTY1QjBcdTk1RUVcdTk4OThcdUZGMUJcdTUxNjhcdTkwRThcdTkwMUFcdThGQzdcdTYyNERcdTgxRUFcdTUyQThcdTdGNkVcdTRFM0FcdTVERjJcdTg5RTNcdTUxQjMnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZSc6ICdcdTUyMjRcdTVCOUFcdThCRUZcdTYyQTUnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZUhpbnQnOiAnXHU0RUJBXHU1REU1XHU1MjI0XHU1QjlBXHU4QkU1XHU5NUVFXHU5ODk4XHU0RTNBXHU4QkVGXHU2MkE1XHU1RTc2XHU1MTczXHU5NUVEXHVGRjA4XHU0RTBFXHU1OTBEXHU2OEMwXHU4OUUzXHU1MUIzXHU3Njg0XHU4QkVEXHU0RTQ5XHU0RTBEXHU1NDBDXHVGRjA5JyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVUaXRsZSc6ICdcdTUyMjRcdTVCOUFcdTRFM0FcdThCRUZcdTYyQTVcdUZGMUYnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZU1zZyc6ICdcdTMwMEN7dGl0bGV9XHUzMDBEXHU1QzA2XHU4OEFCXHU2ODA3XHU4QkIwXHU0RTNBXHU4QkVGXHU2MkE1XHVGRjA4XHU1REYyXHU2MkQyXHU3RUREXHVGRjA5XHU1RTc2XHU0RUNFXHU1Rjg1XHU1OTA0XHU3NDA2XHU0RTJEXHU3OUZCXHU5NjY0XHUzMDAyJyxcbiAgICAncmV2aWV3LmZpeERldGFpbCc6ICdcdTRGRUVcdTU5MERcdThCRTZcdTYwQzUnLFxuICAgICdyZXZpZXcuZml4U3RhdEZpbGVzJzogJ1x1NjU4N1x1NEVGNicsXG4gICAgJ3Jldmlldy5maXhGaWxlcyc6ICdcdTRGRUVcdTU5MERcdTZEODlcdTUzQ0FcdTY1ODdcdTRFRjYnLFxuICAgICdyZXZpZXcuZml4SW1wYWN0JzogJ1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNFx1RkYwOFx1NjUzOVx1NTJBOFx1N0IyNlx1NTNGN1x1NEUwRVx1OEMwM1x1NzUyOFx1NzBCOVx1RkYwOScsXG4gICAgJ3Jldmlldy5kZWZpbmVkSW4nOiAnXHU1QjlBXHU0RTQ5XHU0RThFJyxcbiAgICAncmV2aWV3LmNhbGxDb3VudCc6ICdcdTU5MDRcdThDMDNcdTc1MjgnLFxuICAgICdyZXZpZXcuZml4RGlmZic6ICdcdTRGRUVcdTU5MERcdTVERUVcdTVGMDJcdUZGMDhcdTc2RjhcdTVCRjlcdThCQzRcdTVCQTFcdTU3RkFcdTdFQkZcdUZGMDknLFxuICAgICdyZXZpZXcucmVmcmVzaCc6ICdcdTUyMzdcdTY1QjAnLFxuICAgICdyZXZpZXcucmV0ZW50aW9uSGludCc6ICdcdTVERjJcdTg5RTNcdTUxQjMvXHU4QkVGXHU2MkE1XHU5NUVFXHU5ODk4XHU0RkREXHU3NTU5IHtkYXlzfSBcdTU5MjlcdTU0MEVcdTgxRUFcdTUyQThcdTZFMDVcdTc0MDYnLFxuICAgICdyZXZpZXcudGFyZ2V0JzogJ1x1NUJGOVx1OEM2MScsXG4gICAgJ3Jldmlldy53b3JraW5nVGFyZ2V0JzogJ1x1NURFNVx1NEY1Q1x1NTMzQScsXG4gICAgJ3Jldmlldy5leHBvcnRNZCc6ICdcdTVCRkNcdTUxRkEgTUQnLFxuICAgICdyZXZpZXcuZXhwb3J0TWRIaW50JzogJ1x1NjI4QVx1NUY1M1x1NTI0RFx1N0I1Qlx1OTAwOVx1NEUwQlx1NzY4NFx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1NEUwQlx1OEY3RFx1NEUzQSAubWQgXHU2NTg3XHU0RUY2JyxcbiAgICAncmV2aWV3LmV4cG9ydEVtcHR5JzogJ1x1NkNBMVx1NjcwOVx1NTNFRlx1NUJGQ1x1NTFGQVx1NzY4NFx1OTVFRVx1OTg5OCcsXG4gICAgJ3Jldmlldy5zZWxlY3RBbGwnOiAnXHU1MTY4XHU5MDA5JyxcbiAgICAncmV2aWV3LmNoZWNrZWRDb3VudCc6ICdcdTVERjJcdTkwMDkge259IFx1Njc2MScsXG4gICAgJ3Jldmlldy5tYXJrSGFuZGxlZCc6ICdcdTY4MDdcdThCQjBcdTVERjJcdTU5MDRcdTc0MDYnLFxuICAgICdyZXZpZXcuYmF0Y2hWZXJpZnknOiAnXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwJyxcbiAgICAncmV2aWV3LmJhdGNoVmVyaWZ5Q29uZmlybVRpdGxlJzogJ1x1NjI3OVx1OTFDRlx1NTkwRFx1NjhDMFx1RkYxRicsXG4gICAgJ3Jldmlldy5iYXRjaFZlcmlmeUNvbmZpcm1Nc2cnOiAnXHU1QzA2XHU1QkY5IHtufSBcdTRFMkFcdThCQzRcdTVCQTFcdTc2RUVcdTY4MDdcdTkwMTBcdTRFMDBcdTU5MERcdTY4QzBcdUZGMDhcdTRFMzJcdTg4NEMgTExNIFx1OEMwM1x1NzUyOFx1RkYwQ1x1NkJDRlx1NEUyQVx1NzZFRVx1NjgwN1x1N0VBNiAxMC02MCBcdTc5RDJcdUZGMENcdTRGMUFcdTZEODhcdTgwMTdcdTZBMjFcdTU3OEJcdTc1MjhcdTkxQ0ZcdUZGMDlcdUZGMUJcdTUzRUZcdTk2OEZcdTY1RjZcdTUwNUNcdTZCNjJcdTMwMDInLFxuICAgICdyZXZpZXcuYmF0Y2hTdG9wJzogJ1x1NTA1Q1x1NkI2MicsXG4gICAgJ3Jldmlldy5iYXRjaFByb2dyZXNzJzogJ1x1NjI3OVx1OTFDRlx1NTkwRFx1NjhDMFx1NEUyRCB7aX0ve259JyxcbiAgICAncmV2aWV3LmJhdGNoRG9uZSc6ICdcdTYyNzlcdTkxQ0ZcdTU5MERcdTY4QzBcdTVCOENcdTYyMTBcdUZGMUFcdTg5RTNcdTUxQjMge2F9IFx1Njc2MSBcdTAwQjcgXHU0RUNEXHU1Rjg1XHU1OTA0XHU3NDA2IHtifSBcdTY3NjEgXHUwMEI3IFx1NjVCMFx1OTVFRVx1OTg5OCB7Y30gXHU2NzYxIFx1MDBCNyBcdTU5MzFcdThEMjUge2R9IFx1NEUyQVx1NzZFRVx1NjgwNycsXG4gICAgJ3Jldmlldy5iYXRjaFN0b3BwZWQnOiAnXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwXHU1REYyXHU1MDVDXHU2QjYyJyxcbiAgICAncmV2aWV3LnNlbmRDaGF0JzogJ1x1OEY2Q1x1ODA0QVx1NTkyOVx1NTkwRFx1OUE4QycsXG4gICAgJ3Jldmlldy5zZW5kQ2hhdEhpbnQnOiAnXHU2MjhBXHU1RjUzXHU1MjREXHU3QjVCXHU5MDA5XHU0RTBCXHU3Njg0XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHVGRjA4XHU2NzAwXHU1OTFBIDMwIFx1Njc2MVx1RkYwOVx1NTNEMVx1OTAwMVx1NTIzMFx1ODA0QVx1NTkyOVx1N0E5N1x1NTNFM1x1RkYwQ1x1NzUzMVx1NkEyMVx1NTc4Qlx1NEVDRVx1NjU3NFx1NEY1M1x1ODlEMlx1NUVBNlx1NTkwRFx1OUE4Q1x1NjYyRlx1NTQyNlx1NUM1RVx1NUI5RVx1RkYwOFx1OEJFRlx1NjJBNS9cdTkxQ0RcdTU5MEQvXHU1REYyXHU4OEFCXHU0RkVFXHU1OTBEXHVGRjA5JyxcbiAgICAncmV2aWV3LnNlbmRDaGF0Q29uZmlybVRpdGxlJzogJ1x1OEY2Q1x1ODA0QVx1NTkyOVx1NTkwRFx1OUE4Q1x1MjAxNFx1MjAxNFx1OTAwOVx1NjJFOVx1NkEyMVx1NUYwRicsXG4gICAgJ3Jldmlldy5zZW5kQ2hhdENvbmZpcm1Nc2cnOiAnXHU1QzA2XHU2MjhBIHtufSBcdTY3NjFcdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdTUzRDFcdTkwMDFcdTUyMzBcdTVGNTNcdTUyNERcdTgwNEFcdTU5MjlcdTdBOTdcdTUzRTNcdUZGMDhcdTZEODhcdTgwMTdcdTZBMjFcdTU3OEJcdTc1MjhcdTkxQ0ZcdUZGMDlcdTMwMDJcdTc2RjRcdTYzQTVcdTRGRUVcdTU5MERcdUZGMUFcdTUyMjRcdTVCOUErXHU0RkVFXHU1OTBEK1x1NTZERVx1NTE5OVx1NTE2OFx1ODFFQVx1NTJBOFx1MzAwMlx1NTE0OFx1NTFGQVx1NjVCOVx1Njg0OFx1RkYxQVx1OEJFRlx1NjJBNS9cdTkxQ0RcdTU5MEQvXHU1REYyXHU4RkM3XHU2NUY2XHU4MUVBXHU1MkE4XHU1MTczXHU5NUVEXHVGRjFCXHU3NzFGXHU1QjlFXHU5NUVFXHU5ODk4XHU0RTBEXHU0RkVFXHU0RUUzXHU3ODAxXHVGRjBDXHU5MDEwXHU2NzYxXHU3RUQ5XHU1MUZBXHU0RkVFXHU1OTBEXHU2NUI5XHU2ODQ4L1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNC9cdTY1MzZcdTc2Q0FcdUZGMENcdTdCNDlcdTRGNjBcdTU3MjhcdTgwNEFcdTU5MjlcdTkxQ0NcdThCQzRcdTVCQTFcdTYyNzlcdTUxQzZcdTU0MEVcdTYyNERcdTRGRUVcdTMwMDInLFxuICAgICdyZXZpZXcuc2VuZENoYXRBdXRvJzogJ1x1MjZBMSBcdTc2RjRcdTYzQTVcdTRGRUVcdTU5MEQnLFxuICAgICdyZXZpZXcuc2VuZENoYXRQbGFuJzogJ1x1RDgzRFx1RENDQiBcdTUxNDhcdTUxRkFcdTY1QjlcdTY4NDgnLFxuICAgICdyZXZpZXcuc2VuZENoYXRFbXB0eSc6ICdcdTZDQTFcdTY3MDlcdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdTUzRUZcdTUzRDFcdTkwMDEnLFxuICAgICdyZXZpZXcuc2VuZENoYXROb1Nlc3Npb24nOiAnXHU4QkY3XHU1MTQ4XHU1NzI4XHU1REU2XHU0RkE3XHU2MjUzXHU1RjAwXHU4QkU1XHU5ODc5XHU3NkVFXHU0RTBCXHU3Njg0XHU0RjFBXHU4QkREXHVGRjBDXHU1MThEXHU4RjZDXHU4MDRBXHU1OTI5XHU1OTBEXHU5QThDJyxcbiAgICAncmV2aWV3LnNlbmRDaGF0RG9uZSc6ICdcdTVERjJcdTUzRDFcdTkwMDEge259IFx1Njc2MVx1OTVFRVx1OTg5OFx1NTIzMFx1ODA0QVx1NTkyOVx1N0E5N1x1NTNFM1x1RkYwQ1x1NkEyMVx1NTc4Qlx1NUMwNlx1NUYwMFx1NTlDQlx1OTAxMFx1Njc2MVx1NTkwRFx1OUE4Q1x1MzAwMicsXG4gICAgJ3Jldmlldy5oYW5kbGVkRG9uZSc6ICdcdTVERjJcdTYyOEEge259IFx1Njc2MVx1OTVFRVx1OTg5OFx1NjgwN1x1OEJCMFx1NEUzQVx1NURGMlx1NTkwNFx1NzQwNicsXG5cbiAgICAncGxhbi50aXRsZSc6ICdcdTdGMTZcdTYzOTJcdThCQTFcdTUyMTJcdTc4NkVcdThCQTQnLFxuICAgICdwbGFuLmhpbnQnOiAnXHU2QkNGXHU2QjY1XHU3Njg0XHU4OUQyXHU4MjcyXHU1MUIzXHU1QjlBXHU0RTBBXHU0RTBCXHU2NTg3XHU2Q0U4XHU1MTY1XHU0RTBFXHU5RUQ4XHU4QkE0XHU2QTIxXHU1NzhCXHVGRjA4XHU1MjA2XHU2NzkwL1x1NjRDRFx1NEY1Qz1mYXN0XHVGRjBDXHU1RjAwXHU1M0QxPXN0YW5kYXJkXHVGRjBDXHU4OUM0XHU1MjEyPXJlYXNvbmluZ1x1RkYwQ1x1OUE4Q1x1NjUzNj12ZXJpZmllclx1RkYwOVx1RkYxQlx1NTNFRlx1OEMwM1x1NjU3NFx1NTQwRVx1NTE4RFx1NTQyRlx1NTJBOFx1MzAwMicsXG4gICAgJ3BsYW4uY29sLnN0ZXAnOiAnXHU2QjY1XHU5QUE0JywgJ3BsYW4uY29sLnJvbGUnOiAnXHU4OUQyXHU4MjcyJywgJ3BsYW4uY29sLm1vZGVsJzogJ1x1NkEyMVx1NTc4QicsICdwbGFuLmNvbC5wb2xpY3knOiAnXHU1OTMxXHU4RDI1XHU3QjU2XHU3NTY1JywgJ3BsYW4uY29sLmVuYWJsZWQnOiAnXHU1NDJGXHU3NTI4JywgJ3BsYW4uY29sLmF0dGVtcHRzJzogJ1x1NUMxRFx1OEJENScsXG4gICAgJ3BsYW4ubW9kZWxEZWZhdWx0JzogJ1x1OERERlx1OTY4Rlx1ODlEMlx1ODI3Mlx1OUVEOFx1OEJBNCcsXG4gICAgJ3BsYW4ubGF1bmNoRWRpdGVkJzogJ1x1NEZERFx1NUI1OFx1NEZFRVx1NjUzOVx1NUU3Nlx1NTQyRlx1NTJBOCcsXG4gICAgJ3BsYW4ubGF1bmNoRGlyZWN0JzogJ1x1NjMwOVx1NTM5Rlx1OEJBMVx1NTIxMlx1NTQyRlx1NTJBOCcsXG4gICAgJ3BsYW4uZGlzY2FyZCc6ICdcdTY1M0VcdTVGMDMnLFxuICAgICdwbGFuLnZpZXdEZXRhaWwnOiAnXHU4QkU2XHU2MEM1JywgJ3BsYW4ucmVmcmVzaERldGFpbCc6ICdcdTUyMzdcdTY1QjAnLCAncGxhbi5jbG9zZURldGFpbCc6ICdcdTY1MzZcdThENzcnLFxuICAgICdwbGFuLmRldGFpbFRpdGxlJzogJ1J1biBcdThCRTZcdTYwQzUnLFxuICAgICdwbGFuLnBhdXNlZEJhbm5lcic6ICdcdTRFRkJcdTUyQTFcdTVERjJcdTY2ODJcdTUwNUNcdUZGMENcdTdCNDlcdTVGODVcdTRGNjBcdTc2ODRcdTUxQjNcdTdCNTYnLFxuICAgICdwbGFuLnJlc3VtZVJldHJ5JzogJ1x1OTFDRFx1OEJENVx1OEJFNVx1NkI2NVx1OUFBNFx1NUU3Nlx1N0VFN1x1N0VFRCcsXG4gICAgJ3BsYW4ucmVzdW1lU2tpcCc6ICdcdThERjNcdThGQzdcdThCRTVcdTZCNjVcdTlBQTRcdTdFRTdcdTdFRUQnLFxuICAgICdwbGFuLnJlc3VtZUZhaWxlZCc6ICdcdTRFQ0VcdTU5MzFcdThEMjVcdTU5MDRcdTYwNjJcdTU5MEQnLFxuICAgICdwbGFuLmNvbnRleHRUaXRsZSc6ICdcdTRFRkJcdTUyQTFcdTRFMEFcdTRFMEJcdTY1ODdcdUZGMDhcdTY3MkMgUnVuIFx1NkNFOFx1NTE2NVx1NEU4Nlx1NEVDMFx1NEU0OFx1RkYwOScsXG4gICAgJ3BsYW4uYnJhbmNoJzogJ1x1NTIwNlx1NjUyRicsICdwbGFuLmluamVjdGVkTWVtb3JpZXMnOiAnXHU2Q0U4XHU1MTY1XHU4QkIwXHU1RkM2JywgJ3BsYW4uZGVjaXNpb25Mb2cnOiAnXHU1MUIzXHU3QjU2XHU2NUU1XHU1RkQ3JyxcbiAgICAnZXhlYy5jb2wuZGV0YWlsJzogJ1x1OEJFNlx1NjBDNScsXG5cbiAgICAnc2NoZWQudGl0bGUnOiAnXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExJyxcbiAgICAnc2NoZWQuZm9ybU5hbWUnOiAnXHU0RUZCXHU1MkExXHU1NDBEXHU3OUYwJywgJ3NjaGVkLmZvcm1JbnRlcnZhbCc6ICdcdTk1RjRcdTk2OTRcdUZGMDhcdTUyMDZcdTk0OUZcdUZGMDknLFxuICAgICdzY2hlZC50eXBlUmV2aWV3JzogJ1x1ODFFQVx1NTJBOFx1OEJDNFx1NUJBMScsICdzY2hlZC50eXBlU3VtbWFyeSc6ICdBSSBcdTYwM0JcdTdFRDMnLCAnc2NoZWQudHlwZVJ1bic6ICdcdTVCOUFcdTY1RjZcdTYyNjdcdTg4NEMnLFxuICAgICdzY2hlZC5hZGQnOiAnXHU1MjFCXHU1RUZBJyxcbiAgICAnc2NoZWQuaGludCc6ICdcdTUyMzBcdTcwQjlcdTgxRUFcdTUyQThcdTYyNjdcdTg4NENcdUZGMUFcdTgxRUFcdTUyQThcdThCQzRcdTVCQTE9XHU4QkM0XHU1QkExXHU4RkQxIDI0IFx1NUMwRlx1NjVGNlx1NzY4NFx1NjVCMFx1NjNEMFx1NEVBNFx1RkYwOFx1OTVFRVx1OTg5OFx1OEZEQiBSZXZpZXcgXHU5NzYyXHU2NzdGXHVGRjA5XHVGRjFCQUkgXHU2MDNCXHU3RUQzPVx1NzUxRlx1NjIxMFx1NTg5RVx1OTFDRlx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1RkYxQlx1NUI5QVx1NjVGNlx1NjI2N1x1ODg0Qz1cdTYzMDlcdTZBMjFcdTY3N0ZcdThERDFcdTRFMDBcdTZCMjFcdTdGMTZcdTYzOTJcdTRFRkJcdTUyQTFcdTMwMDJcdTY3MDBcdTVDMEYgMSBcdTUyMDZcdTk0OUZcdTMwMDInLFxuICAgICdzY2hlZC5lbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdTMwMDInLFxuICAgICdzY2hlZC5jb2wubmFtZSc6ICdcdTU0MERcdTc5RjAnLCAnc2NoZWQuY29sLnR5cGUnOiAnXHU3QzdCXHU1NzhCJywgJ3NjaGVkLmNvbC5pbnRlcnZhbCc6ICdcdTU0NjhcdTY3MUYnLCAnc2NoZWQuY29sLm5leHQnOiAnXHU0RTBCXHU2QjIxXHU2MjY3XHU4ODRDJywgJ3NjaGVkLmNvbC5sYXN0UmVzdWx0JzogJ1x1NEUwQVx1NkIyMVx1N0VEM1x1Njc5QycsICdzY2hlZC5jb2wuYWN0aW9ucyc6ICdcdTY0Q0RcdTRGNUMnLFxuICAgICdzY2hlZC5kYXknOiAnIFx1NTkyOScsICdzY2hlZC5ob3VyJzogJyBcdTVDMEZcdTY1RjYnLCAnc2NoZWQubWludXRlJzogJyBcdTUyMDZcdTk0OUYnLFxuICAgICdzY2hlZC5kaXNhYmxlJzogJ1x1NjY4Mlx1NTA1QycsICdzY2hlZC5lbmFibGUnOiAnXHU1NDJGXHU3NTI4JywgJ3NjaGVkLnJ1bk5vdyc6ICdcdTdBQ0JcdTUzNzNcdTYyNjdcdTg4NEMnLFxuXG4gICAgJ21lbW9yeS56b25lVGl0bGUnOiAnXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2JyxcbiAgICAnbWVtb3J5LnN5bmNCYXNlbGluZSc6ICdcdTU0MENcdTZCNjVcdTU3RkFcdTdFQkYnLCAnbWVtb3J5LnN5bmNOb25lJzogJ1x1NjcyQVx1NTQwQ1x1NkI2NScsXG4gICAgJ21lbW9yeS5iZWhpbmQnOiAnXHU4NDNEXHU1NDBFIHtufSBcdTRFMkFcdTYzRDBcdTRFQTRcdTY3MkFcdTU0MENcdTZCNjUnLFxuICAgICdtZW1vcnkuc3luYyc6ICdcdTU0MENcdTZCNjVcdThCQjBcdTVGQzYnLCAnbWVtb3J5LnN5bmNpbmcnOiAnXHU1NDBDXHU2QjY1XHU0RTJEXHUyMDI2JywgJ21lbW9yeS5zeW5jRmFpbGVkJzogJ1x1NTQwQ1x1NkI2NVx1NTkzMVx1OEQyNScsXG4gICAgJ21lbW9yeS5zdGFsZVRpdGxlJzogJ1x1NzU5MVx1NEYzQ1x1OEZDN1x1NjVGNlx1RkYwOFx1NzZGOFx1NTE3M1x1NEVFM1x1NzgwMVx1NURGMlx1ODhBQlx1NjUzOVx1NTJBOFx1RkYwQ1x1NUY4NVx1NEY2MFx1NTkwRFx1NjgzOFx1RkYwOScsXG4gICAgJ21lbW9yeS5tYXJrU3RhbGUnOiAnXHU2ODA3XHU4QkIwXHU4RkM3XHU2NUY2JywgJ21lbW9yeS5hcmNoaXZlQnRuJzogJ1x1NUY1Mlx1Njg2MycsICdtZW1vcnkua2VlcEFjdGl2ZSc6ICdcdTRFQ0RcdTY3MDlcdTY1NDgnLFxuICAgICdtZW1vcnkubmV3Q2FuZGlkYXRlcyc6ICdcdTY1QjBcdTU4OUVcdTUwMTlcdTkwMDlcdUZGMDhcdTVERjJcdTUxNjVcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTdcdUZGMDlcdUZGMUEnLFxuICAgICdtZW1vcnkuY2xvc2VSZXBvcnQnOiAnXHU1MTczXHU5NUVEXHU2MkE1XHU1NDRBJyxcbiAgICAnbWVtb3J5LnNjb3BlUHJvamVjdCc6ICdcdTRFM0JcdTVFNzJcdUZGMDhcdTUxNjhcdTUyMDZcdTY1MkZcdUZGMDknLCAnbWVtb3J5LnNjb3BlQnJhbmNoJzogJ1x1NEVDNVx1NUY1M1x1NTI0RFx1NTIwNlx1NjUyRicsXG4gICAgJ21lbW9yeS5wZW5kaW5nUXVldWUnOiAnXHU1Rjg1XHU3ODZFXHU4QkE0XHU5NjFGXHU1MjE3JyxcbiAgICAnbWVtb3J5LnRvTm90ZSc6ICdcdThGNkNcdTdCMTRcdThCQjAnLCAnbWVtb3J5Lm5vcm1hbGl6ZSc6ICdcdTVGNTJcdTRFMDBcdTUyMzBcdTRFM0JcdTVFNzInLCAnbWVtb3J5LnJlc3RvcmUnOiAnXHU2MDYyXHU1OTBEJyxcbiAgICAnbWVtb3J5LnN0YXR1c1N0YWxlJzogJ1x1NzU5MVx1NEYzQ1x1OEZDN1x1NjVGNicsXG4gICAgJ2ltcGFjdC5mdW5jdGlvbnNOb25lJzogJ1x1NjcyQVx1OEJDNlx1NTIyQlx1NTFGQVx1NTFGRFx1NjU3MFx1N0VBN1x1OEMwM1x1NzUyOFx1NTNEOFx1NTMxNlx1RkYwOFx1NTNFRlx1ODBGRFx1NjYyRlx1NjgzN1x1NUYwRi9cdTk3NTlcdTYwMDFcdThENDRcdTZFOTAvXHU3RUFGXHU5MTREXHU3RjZFXHU2NTM5XHU1MkE4XHVGRjA5XHUzMDAyJyxcbiAgICAncmV2aWV3LmNvbC5zZXZlcml0eSc6ICdcdTdFQTdcdTUyMkInLFxuICAgICdyZXZpZXcuY29sLmNhdGVnb3J5JzogJ1x1N0M3Qlx1NTIyQicsXG4gICAgJ3Jldmlldy5jb2wudGl0bGUnOiAnXHU5NUVFXHU5ODk4JyxcbiAgICAncmV2aWV3LmNvbC5ldmlkZW5jZSc6ICdcdTRGNERcdTdGNkUnLFxuICAgICdyZXZpZXcuY29sLmZpeCc6ICdcdTVFRkFcdThCQUVcdTRGRUVcdTU5MEQnLFxuICAgICdyZXZpZXcuaGludCc6ICdcdTcwQjlcdTUxRkJcdTRFMEFcdTY1QjlcdTYzMDlcdTk0QUVcdTVGMDBcdTU5Q0JcdTY4MzhcdTY3RTVcdUZGMENcdTRFQTdcdTUxRkFcdTY3MDBcdTRGMThcdTYwMjdcdTdFRDNcdThCQkFcdTRFMEVcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTMwMDInLFxuICAgICdkaWZmLnNob3cnOiAnXHU1QkY5XHU2QkQ0JyxcbiAgICAnZGlmZi5oaWRlJzogJ1x1NjUzNlx1OEQ3N1x1NURFRVx1NUYwMicsXG5cbiAgICAnZGV0YWlsLnRpdGxlJzogJ1x1NjgzOFx1NjdFNVx1OEJFNlx1NjBDNScsXG4gICAgJ2RldGFpbC5waWNrJzogJ1x1MjE5MCBcdTRFQ0VcdTVERTZcdTRGQTdcdTkwMDlcdTYyRTlcdTRFMDBcdTZCMjFcdTYzRDBcdTRFQTRcdUZGMDhcdTYyMTZcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQThcdUZGMDlcdTVGMDBcdTU5Q0JcdTY4MzhcdTY3RTUnLFxuICAgICdkZXRhaWwud2hhdCc6ICdcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDgnLFxuICAgICdkZXRhaWwubG9naWMnOiAnXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxJyxcbiAgICAnZGV0YWlsLnJpc2snOiAnXHU5OENFXHU5NjY5XHU3MEI5JyxcbiAgICAnZGV0YWlsLmZpbGVzJzogJ1x1NjU4N1x1NEVGNlx1NkUwNVx1NTM1NScsXG4gICAgJ2RldGFpbC5wYXRjaCc6ICdcdTY3RTVcdTc3MEJcdTg4NjVcdTRFMDFcdTUzOUZcdTY1ODcnLFxuICAgICdkZXRhaWwuYWlMb2FkaW5nJzogJ0FJIFx1ODlFM1x1OEJGQlx1NzUxRlx1NjIxMFx1NEUyRFx1MjAyNlx1RkYwOFx1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxuICAgICdkZXRhaWwucXVldWVkJzogJ1x1OEZEOFx1NjcwOSB7bn0gXHU0RTJBXHU4OUUzXHU4QkZCXHU2MzkyXHU5NjFGXHU0RTJEXHVGRjA4XHU4MUVBXHU1MkE4XHU1RTc2XHU1M0QxXHU2MjY3XHU4ODRDXHVGRjA5JyxcbiAgICAnZGV0YWlsLmNhcmRRdWV1ZWQnOiAnXHU2MzkyXHU5NjFGXHU3QjQ5XHU1Rjg1IEFJIFx1ODlFM1x1OEJGQlx1RkYwOFx1NUU3Nlx1NTNEMVx1NEUwQVx1OTY1MCAzXHVGRjBDXHU5MDdGXHU1MTREXHU2MjUzXHU2RUUxXHU2QTIxXHU1NzhCXHU3RjUxXHU1MTczXHVGRjA5JyxcbiAgICAnZGV0YWlsLmltcGFjdCc6ICdcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdTUyMDZcdTY3OTAnLFxuICAgICdkZXRhaWwuaW1wYWN0TG9hZGluZyc6ICdcdTVGNzFcdTU0Q0RcdTYyNkJcdTYzQ0ZcdTRFMkRcdTIwMjZcdUZGMDhcdTVGMTVcdTc1MjhcdTY4QzBcdTdEMjIgKyBcdTU2RkVcdThDMzFcdTRGMjBcdTY0QURcdUZGMDknLFxuICAgICdkZXRhaWwub3B0aW1hbGl0eSc6ICdcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTUnLFxuICAgICdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnOiAnXHU4QkM0XHU1QkExXHU0RTJEXHUyMDI2XHVGRjA4XHU0RjFBXHU0RUE3XHU1MUZBXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHU0RTBFXHU2NzAwXHU0RjE4XHU2MDI3XHU3RUQzXHU4QkJBXHVGRjA5JyxcblxuICAgICdpbXBhY3Qucmlzayc6ICdcdTk4Q0VcdTk2NjknLFxuICAgICdpbXBhY3QuY29sLmNoYW5nZWQnOiAnXHU1M0Q4XHU2NkY0XHU2NTg3XHU0RUY2JyxcbiAgICAnaW1wYWN0LmNvbC5pbmRpcmVjdCc6ICdcdTk1RjRcdTYzQTVcdTVGNzFcdTU0Q0RcdUZGMDhcdTVGMTVcdTc1MjhcdTk0RkVcdUZGMDknLFxuICAgICdpbXBhY3QuY29sLnBvdGVudGlhbCc6ICdcdTZGNUNcdTU3MjhcdTVGNzFcdTU0Q0QnLFxuICAgICdpbXBhY3Qubm9uZSc6ICdcdTY3MkFcdTUzRDFcdTczQjBcdTRFRDNcdTVFOTNcdTUxODVcdTVGMTVcdTc1MjhcdTgwMDVcdUZGMDhcdTY1MzlcdTUyQThcdTc3MEJcdTRGM0NcdTcyRUNcdTdBQ0JcdUZGMDlcdTMwMDInLFxuICAgICdpbXBhY3QudGVzdHMnOiAnXHU1MTczXHU4MDU0XHU2RDRCXHU4QkQ1JyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5jaGFuZ2VkJzogJ1x1NTNEOFx1NjZGNCcsXG4gICAgJ2ltcGFjdC5sZWdlbmQuaW5kaXJlY3QnOiAnXHU5NUY0XHU2M0E1JyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5wb3RlbnRpYWwnOiAnXHU2RjVDXHU1NzI4JyxcblxuICAgICdyZXZpZXcudmVyZGljdCc6ICdcdTY3MDBcdTRGMThcdTYwMjdcdTdFRDNcdThCQkEnLFxuICAgICdyZXZpZXcuaXNzdWVzJzogJ1x1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NScsXG4gICAgJ3Jldmlldy5jbGVhbic6ICdcdTY3MkFcdTUzRDFcdTczQjBcdTk1RUVcdTk4OThcdTMwMDInLFxuXG4gICAgJ25vdGVzLnRpdGxlJzogJ1x1NjgzOFx1NjdFNVx1N0IxNFx1OEJCMCcsXG4gICAgJ25vdGVzLmZvcm1UaXRsZSc6ICdcdTdCMTRcdThCQjBcdTY4MDdcdTk4OTgnLFxuICAgICdub3Rlcy5mb3JtQ29udGVudCc6ICdcdTdCMTRcdThCQjBcdTUxODVcdTVCQjlcdUZGMDhcdTdFRDNcdThCQkFcdTMwMDFcdTc1OTFcdTk1RUVcdTMwMDFcdTVCNjZcdTRFNjBcdTg5ODFcdTcwQjlcdTIwMjZcdUZGMDknLFxuICAgICdub3Rlcy5hZGQnOiAnXHU2REZCXHU1MkEwXHU3QjE0XHU4QkIwJyxcbiAgICAnbm90ZXMuYm91bmRUbyc6ICdcdTVDMDZcdTUxNzNcdTgwNTRcdTUyMzAnLFxuICAgICdub3Rlcy5jb2wudGltZSc6ICdcdTY1RjZcdTk1RjQnLFxuICAgICdub3Rlcy5jb2wudGl0bGUnOiAnXHU2ODA3XHU5ODk4JyxcbiAgICAnbm90ZXMuY29sLmNvbnRlbnQnOiAnXHU1MTg1XHU1QkI5JyxcbiAgICAnbm90ZXMuY29sLnNoYSc6ICdcdTUxNzNcdTgwNTRcdTYzRDBcdTRFQTQnLFxuICAgICdub3Rlcy5yZW1vdmUnOiAnXHU1MjIwXHU5NjY0JyxcbiAgICAnbm90ZXMuZW1wdHknOiAnXHU4RkQ4XHU2Q0ExXHU2NzA5XHU3QjE0XHU4QkIwXHUzMDAyXHU2ODM4XHU2N0U1XHU2M0QwXHU0RUE0XHU2NUY2XHU5NjhGXHU2MjRCXHU4QkIwXHU0RTBCXHU3RUQzXHU4QkJBXHU0RTBFXHU3NTkxXHU5NUVFXHVGRjBDXHU1QzMxXHU2NjJGXHU0RjYwXHU3Njg0XHU5ODc5XHU3NkVFXHU1QjY2XHU0RTYwXHU2ODYzXHU2ODQ4XHUzMDAyJyxcblxuICAgICdtZW1vcnkucmVjb3JkJzogJ1x1OEJCMFx1NUY1NVx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNicsXG4gICAgJ2Zvcm0ubWVtb3J5VGl0bGUnOiAnXHU4QkIwXHU1RkM2XHU2ODA3XHU5ODk4JyxcbiAgICAnZm9ybS5tZW1vcnlDb250ZW50JzogJ1x1OEJCMFx1NUZDNlx1NTE4NVx1NUJCOVx1RkYwOFx1NEVDMFx1NEU0OFx1NEUwRVx1NEUzQVx1NEVDMFx1NEU0OFx1RkYwOScsXG4gICAgJ21lbW9yeS5jb2wudGl0bGUnOiAnXHU2NzYxXHU3NkVFJyxcbiAgICAnbWVtb3J5LmNvbC50eXBlJzogJ1x1N0M3Qlx1NTc4QicsXG4gICAgJ21lbW9yeS5jb2wudHJ1dGgnOiAnXHU3NzFGXHU1MDNDJyxcbiAgICAnbWVtb3J5LmNvbC5icmFuY2gnOiAnXHU1MjA2XHU2NTJGJyxcbiAgICAnbWVtb3J5LmNvbmZpcm0nOiAnXHU3ODZFXHU4QkE0JyxcbiAgICAnbWVtb3J5LmVtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNlx1MzAwMlx1NTNFRlx1NTcyOFx1ODA0QVx1NTkyOVx1NEUyRFx1OEJBOSBBSSBcdThCQjBcdTVGNTVcdUZGMENcdTYyMTZcdTU3MjhcdTRFMEFcdTY1QjlcdTYyNEJcdTUyQThcdTZERkJcdTUyQTBcdTMwMDInLFxuICAgICdjb25jZXB0cy50aXRsZSc6ICdcdTVCNjZcdTRFNjBcdTY5ODJcdTVGRjUnLFxuICAgICdjb25jZXB0cy5ub25lJzogJ1x1NjY4Mlx1NjVFMFx1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNVx1MzAwMlx1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDM1x1OEREMVx1NUI4Q1x1NTNEOFx1NjZGNFx1NTQwRVx1ODFFQVx1NTJBOFx1NkM4OVx1NkRDMFx1RkYwQ1x1NEU1Rlx1NTNFRlx1NTcyOFx1ODA0QVx1NTkyOVx1NEUyRFx1OEJBOSBBSSBcdTYwM0JcdTdFRDNcdTVCNjZcdTRFNjBcdTg5ODFcdTcwQjlcdTMwMDInLFxuICAgICdjb25jZXB0cy5jb2wubmFtZSc6ICdcdTY5ODJcdTVGRjUnLFxuICAgICdjb25jZXB0cy5jb2wuY2F0ZWdvcnknOiAnXHU3QzdCXHU1MjJCJyxcbiAgICAnY29uY2VwdHMuY29sLmNvdW50JzogJ1x1NkIyMVx1NjU3MCcsXG4gICAgJ3Jldmlldy5yZWNvcmRzVGl0bGUnOiAnUmV2aWV3IFx1OTVFRVx1OTg5OCcsXG4gICAgJ3Jldmlldy5yZWNvcmRzRW1wdHknOiAnXHU2NjgyXHU2NUUwXHU5NUVFXHU5ODk4XHU4QkIwXHU1RjU1XHUzMDAyXHU2M0QwXHU0RUE0XHU1QkExXHU2N0U1XHU5ODc1XHU4QkM0XHU1QkExXHU1MUZBXHU3Njg0XHU5NUVFXHU5ODk4XHU0RjFBXHU4MUVBXHU1MkE4XHU3NjdCXHU4QkIwXHU1MjMwXHU4RkQ5XHU5MUNDXHVGRjFCXHU5MUNEXHU2NUIwXHU4QkM0XHU1QkExXHU0RjFBXHU2NkZGXHU2MzYyXHU2NUU3XHU4QkIwXHU1RjU1XHUzMDAyJyxcbiAgICAndmVyaWZ5LnJlY29yZHMnOiAnXHU5QThDXHU2NTM2XHU4QkIwXHU1RjU1JyxcbiAgICAndmVyaWZ5LnJlY29yZHNFbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTlBOENcdTY1MzZcdThCQjBcdTVGNTVcdTMwMDJcdTU3MjhcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdTcwQjlcdTMwMENcdTlBOENcdTY1MzZcdTMwMERcdTUzNzNcdTc1MUZcdTYyMTBcdTMwMDInLFxuXG4gICAgJ2NvbmZpcm1lZC50aXRsZSc6ICdcdTVERjJcdTc4NkVcdTVCOUFcdTdFQTZcdTY3NUZcdUZGMDhcdTRFQkFcdTVERTVcdTc4NkVcdThCQTRcdUZGMENBSSBcdTc5ODFcdTY1MzlcdTgxRUFcdTUyQThcdTYyRTZcdTYyMkFcdUZGMDknLFxuICAgICdjb25maXJtZWQuYWRkJzogJ1x1NkRGQlx1NTJBMFx1N0VBNlx1Njc1RicsXG4gICAgJ2NvbmZpcm1lZC50ZXh0JzogJ1x1N0VBNlx1Njc1Ri9cdTk3MDBcdTZDNDJcdTUxODVcdTVCQjknLFxuICAgICdjb25maXJtZWQucGF0aHMnOiAnXHU3OTgxXHU2NTM5XHU4REVGXHU1Rjg0XHVGRjA4XHU5MDE3XHU1M0Y3XHU1MjA2XHU5Njk0XHVGRjFCXHU3NkY4XHU1QkY5XHU5ODc5XHU3NkVFXHU2ODM5XHU1OTgyIHNyYy9jb3JlXHVGRjBDXHU2MjE2XHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHVGRjA5JyxcbiAgICAnY29uZmlybWVkLm5vbmUnOiAnXHU2NjgyXHU2NUUwXHU3RUE2XHU2NzVGXHUzMDAyXHU2REZCXHU1MkEwXHU1NDBFXHVGRjBDQUkgXHU0RkVFXHU2NTM5XHU2NzJDXHU5ODc5XHU3NkVFXHU3Njg0XHU3OTgxXHU2NTM5XHU4REVGXHU1Rjg0XHU1QzA2XHU4OEFCXHU4MUVBXHU1MkE4XHU2MkQyXHU3RUREXHVGRjA4XHU0RUM1XHU1QkY5XHU2NzJDXHU5ODc5XHU3NkVFXHU3NTFGXHU2NTQ4XHVGRjA5XHUzMDAyJyxcblxuICAgICdjaGFuZ2VzLnRpdGxlJzogJ1x1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMScsXG4gICAgJ3N0YXRlLm5vQ2hhbmdlcyc6ICdcdTY2ODJcdTY1RTBcdTUzRDhcdTY2RjRcdTRFRkJcdTUyQTFcdTMwMDJcdTU3MjhcdTgwNEFcdTU5MjlcdTRFMkRcdThCQTkgQUkgXHU1MjFCXHU1RUZBXHVGRjBDXHU2MjE2XHU3NTI4XHU0RTBBXHU2NUI5XHUzMDBDXHU2NUIwXHU1RUZBXHU1M0Q4XHU2NkY0XHUzMDBEXHUzMDAyJyxcbiAgICAnY2hhbmdlcy5jb2wudGl0bGUnOiAnXHU2ODA3XHU5ODk4JyxcbiAgICAnY2hhbmdlcy5jb2wudHlwZSc6ICdcdTdDN0JcdTU3OEInLFxuICAgICdjaGFuZ2VzLmNvbC5zdGF0dXMnOiAnXHU3MkI2XHU2MDAxJyxcbiAgICAnY2hhbmdlcy5jb2wudXBkYXRlZCc6ICdcdTY2RjRcdTY1QjBcdTY1RjZcdTk1RjQnLFxuICAgICdleGVjLmNvbC5zdGF0dXMnOiAnXHU3MkI2XHU2MDAxJyxcbiAgICAnZXhlYy5jb2wuY2hhbmdlJzogJ1x1NTNEOFx1NjZGNCcsXG4gICAgJ2V4ZWMuY29sLnN0YXJ0ZWQnOiAnXHU1RjAwXHU1OUNCJyxcbiAgICAnZXhlYy5jb2wuY29zdCc6ICdcdTYyMTBcdTY3MkMoXHU0RjMwKScsXG4gICAgJ2V4ZWMuYXR0ZW1wdHMnOiAnXHU1QzFEXHU4QkQ1XHU2QjIxXHU2NTcwJyxcbiAgICAnZXhlYy5oaW50JzogJ1x1NjI2N1x1ODg0Q1x1RkYwOHN0YXJ0X3J1blx1RkYwOVx1OEJGN1x1NTcyOFx1NTNGM1x1NEZBN1x1ODA0QVx1NTkyOVx1NEUyRFx1NTNEMVx1OEQ3N1x1RkYxQVx1NTIxQlx1NUVGQVx1OEJBMVx1NTIxMlx1NTQwRVx1NUJGOSBBSSBcdThCRjRcdTMwMENcdTVGMDBcdTU5Q0JcdTYyNjdcdTg4NENcdThCRTUgY2hhbmdlXHUzMDBEXHUzMDAyXHU2NzJDXHU5ODc1XHU2N0U1XHU3NzBCXHU4RkRCXHU1RUE2XHU0RTBFXHU3RUQzXHU2NzlDXHUzMDAyJyxcbiAgICAnc3RhdGUubm9SdW5zJzogJ1x1NjY4Mlx1NjVFMFx1NjI2N1x1ODg0Q1x1OEJCMFx1NUY1NVx1MzAwMicsXG4gICAgJ3N0YXRlLnRlY2hTdGFjayc6ICdcdTYyODBcdTY3MkZcdTY4MDgnLFxuICAgICdzdGF0ZS5zeW1ib2xzJzogJ1x1NURGMlx1N0QyMlx1NUYxNVx1N0IyNlx1NTNGNycsXG4gICAgJ3N0YXRlLm1hbmlmZXN0cyc6ICdcdTZFMDVcdTUzNTVcdTY1ODdcdTRFRjYnLFxuICAgICdzdGF0ZS5ldmlkZW5jZSc6ICdcdThCQzFcdTYzNkVcdTY3NjFcdTc2RUUnLFxuICB9LFxuICBlbjoge1xuICAgICd3b3Jrc3BhY2UudGl0bGUnOiAnUmV2aWV3IERlc2snLFxuICAgICd3b3Jrc3BhY2Uuc2VsZWN0U2Vzc2lvbic6ICdTZWxlY3QgYSBzZXNzaW9uIHVuZGVyIGEgd29ya3NwYWNlIG9uIHRoZSBsZWZ0IHRvIHZpZXcgaXRzIHByb2plY3QgZGF0YS4nLFxuICAgICd0YWIuY29tbWl0cyc6ICdDb21taXQgUmV2aWV3JyxcbiAgICAndGFiLm92ZXJ2aWV3JzogJ092ZXJ2aWV3JyxcbiAgICAndGFiLmV4ZWN1dGlvbic6ICdFeGVjdXRpb24nLFxuICAgICd0YWIucmV2aWV3JzogJ1JldmlldyBpc3N1ZXMnLFxuICAgICd0YWIubm90ZXMnOiAnTm90ZXMgJiBNZW1vcnknLFxuICAgICd0YWIuc2V0dGluZ3MnOiAnU2V0dGluZ3MnLFxuICAgICdlcnJvci5sb2FkJzogJ0ZhaWxlZCB0byBsb2FkJyxcbiAgICAnc3RhdGUucHJvamVjdCc6ICdDdXJyZW50IHByb2plY3QnLFxuICAgICdzdGF0ZS5ub1Byb2plY3QnOiAnTm8gcHJvamVjdCBpbml0aWFsaXplZCcsXG4gICAgJ3N0YXRlLm5vUHJvamVjdEhpbnQnOiAnUnVuIFwiSW5pdGlhbGl6ZSBwcm9qZWN0XCIgdG8gc2NhbiB0aGUgcmVwb3NpdG9yeSBzdHJ1Y3R1cmUsIHRlY2ggc3RhY2ssIGFuZCBzeW1ib2wgaW5kZXguJyxcbiAgICAnYWN0aW9uLmJvb3RzdHJhcCc6ICdJbml0aWFsaXplIHByb2plY3QnLFxuICAgICdhY3Rpb24ucmVzY2FuJzogJ1JlLWluaXRpYWxpemUgLyBzY2FuJyxcbiAgICAnYWN0aW9uLmFuYWx5emUnOiAnQW5hbHl6ZSB3b3JraW5nIGRpZmYnLFxuICAgICdhY3Rpb24ucmV2aWV3JzogJ1JldmlldyB3b3JraW5nIGRpZmYnLFxuICAgICdhY3Rpb24udmVyaWZ5JzogJ1ZlcmlmeSB3b3JraW5nIGRpZmYnLFxuICAgICdhY3Rpb24uY3JlYXRlQ2hhbmdlJzogJ0NyZWF0ZSBjaGFuZ2UnLFxuICAgICdhY3Rpb24ucnVubmluZyc6ICdSdW5uaW5nXHUyMDI2JyxcbiAgICAnYWN0aW9uLnJlZnJlc2gnOiAnUmVmcmVzaCcsXG4gICAgJ2Zvcm0uY2hhbmdlVGl0bGUnOiAnQ2hhbmdlIHRpdGxlJyxcbiAgICAnZm9ybS5jaGFuZ2VEZXNjJzogJ1JlcXVpcmVtZW50IGFuZCBiYWNrZ3JvdW5kIChvcHRpb25hbCknLFxuICAgICdyZXN1bHQucGFuZWwnOiAnQWN0aW9uIHJlc3VsdCcsXG5cbiAgICAncmVwby5hZGQnOiAnQWRkIHJlcG8nLFxuICAgICdyZXBvLmFkZEhpbnQnOiAnRW50ZXIgYW4gYWJzb2x1dGUgcmVwbyBwYXRoIGFuZCBwcmVzcyBFbnRlcjsgcHJldmlvdXNseSB1c2VkIHJlcG9zIGFyZSByZW1lbWJlcmVkJyxcbiAgICAncmVwby5zY2FuSGlzdG9yeSc6ICdSZWJ1aWxkIGhpc3RvcnknLFxuICAgICdyZXBvLmNvbW1pdHMnOiAnY29tbWl0cycsXG4gICAgJ3JlcG8uYnJhbmNoJzogJ2JyYW5jaCcsXG4gICAgJ3JlcG8ud29ya2luZyc6ICdVbmNvbW1pdHRlZCBjaGFuZ2VzJyxcbiAgICAncmVwby53b3JraW5nQ2xlYW4nOiAnV29ya2luZyB0cmVlIGlzIGNsZWFuJyxcbiAgICAncmVwby5lbXB0eSc6ICdObyBjb21taXRzLicsXG4gICAgJ3JlcG8ubG9hZEZhaWxlZCc6ICdGYWlsZWQgdG8gbG9hZCBjb21taXRzJyxcbiAgICAncGlja2VyLnRpdGxlJzogJ1BpY2sgY29tbWl0cyB0byByZXZpZXcgKG11bHRpLXNlbGVjdCknLFxuICAgICdwaWNrZXIucGxhY2Vob2xkZXInOiAnQ2xpY2sgdG8gcGljayBjb21taXRzIChtdWx0aS1zZWxlY3QsIGluY2x1ZGVzIHVuY29tbWl0dGVkKScsXG4gICAgJ3BpY2tlci5zZWxlY3RlZCc6ICdTZWxlY3RlZCcsXG4gICAgJ3BpY2tlci5maWx0ZXInOiAnRmlsdGVyIGJ5IHRpdGxlL2hhc2gvYXV0aG9yXHUyMDI2JyxcbiAgICAncGlja2VyLmNsZWFyJzogJ0NsZWFyJyxcbiAgICAncGlja2VyLm5vTWF0Y2gnOiAnTm8gbWF0Y2hpbmcgY29tbWl0LicsXG4gICAgJ3BpY2tlci5oaW50JzogJ0NoZWNraW5nIGEgY29tbWl0IGdlbmVyYXRlcyBpdHMgQUkgZXhwbGFuYXRpb247IHJ1biBpbXBhY3QgYW5kIG9wdGltYWxpdHkgYmVsb3cuJyxcbiAgICAncGlja2VyLnJvdW5kJzogJ1JvdW5kIHtufScsXG4gICAgJ3BpY2tlci5yb3VuZExhdGVzdCc6ICdSb3VuZCB7bn0gKGxhdGVzdCknLFxuICAgICdwaWNrZXIucm91bmRTZWxlY3QnOiAnU2VsZWN0IHJvdW5kJyxcbiAgICAncGlja2VyLnJvdW5kQ2xlYXInOiAnQ2xlYXIgcm91bmQnLFxuICAgICdwaWNrZXIudW5kaWdlc3RlZCc6ICdOZXcgY29tbWl0cyBzaW5jZSB0aGUgbGFzdCBBSSBzdW1tYXJ5IHdpdGhvdXQgQUkgYW5hbHlzaXMgeWV0JyxcbiAgICAncGlja2VyLnVuZGlnZXN0ZWRDb3VudCc6ICd7bn0gdW5yZXZpZXdlZCBjb21taXRzJyxcbiAgICAncGlja2VyLnNlbGVjdEFsbFVuZGlnZXN0ZWQnOiAnU2VsZWN0IHVuZGlnZXN0ZWQnLFxuICAgICdwaWNrZXIuZGlnZXN0QWxsJzogJ0RpZ2VzdCBhbGwnLFxuICAgICdwaWNrZXIuZGlnZXN0QWxsSGludCc6ICdTZWxlY3QgYWxsIHVuZGlnZXN0ZWQgY29tbWl0cyBhbmQgYmF0Y2ggQUkgYW5hbHlzaXMgKGNvbmN1cnJlbmN5IDMsIGNhY2hlZCksIGF1dG8tZ2VuZXJhdGUgdGhlIG5hcnJhdGl2ZSBhZnRlcndhcmRzOyB0aGVuIGNyZWF0ZSBhbiBBSSBzdW1tYXJ5IGluIE5vdGVzICYgTWVtb3J5IHRvIHJlc2V0IHRoZSBtYXJrZXInLFxuICAgICduYXJyYXRpdmUuZGlnZXN0SGludCc6ICdOYXJyYXRpdmUgZ2VuZXJhdGVkLiBDcmVhdGUgYW4gQUkgc3VtbWFyeSBpbiBOb3RlcyAmIE1lbW9yeSB0byByZXNldCB0aGUgdW5kaWdlc3RlZCBtYXJrZXIuJyxcbiAgICAnaW1wYWN0LmZhY3RvcnMnOiAnUmlzayBmYWN0b3JzICh3aHkgdGhpcyBsZXZlbCknLFxuICAgICdpbXBhY3QucG9pbnRzJzogJ0ltcGFjdGVkIHBvaW50cycsXG4gICAgJ2ltcGFjdC5rZXlQb2ludHMnOiAnS2V5IGNvbXBvbmVudHMnLFxuICAgICdpbXBhY3QubWVtb3J5JzogJ0Nyb3NzLWNoZWNrIHdpdGggcHJvamVjdCBtZW1vcnknLFxuICAgICdpbXBhY3QuZnVuY3Rpb25zJzogJ0ltcGFjdGVkIGZ1bmN0aW9ucyAod2hvIGNhbGxzIHRoZSBjaGFuZ2VkIGNvZGUpJyxcbiAgICAnaW1wYWN0LmZ1bmNSb2xlJzogJ0Z1bmN0aW9uIHJvbGUnLFxuICAgICdpbXBhY3QuZnVuY0NoYW5nZSc6ICdDaGFuZ2VkIGJ5IHRoaXMgY29tbWl0JyxcbiAgICAnaW1wYWN0LmZ1bmNDYWxsZXJzJzogJ0ltcGFjdCBvbiBjYWxsZXJzJyxcbiAgICAnY2FjaGUuaGl0JzogJ2Zyb20gY2FjaGUnLFxuICAgICdjYWNoZS5yZWdlbmVyYXRlJzogJ1JlZ2VuZXJhdGUnLFxuICAgICdjb3N0LnRvb2x0aXAnOiAnRXN0aW1hdGVkIGNvc3Qgb2YgdGhpcyBBSSBjYWxsIChEZWVwU2VlayBwcmljaW5nKScsXG4gICAgJ2V4ZWMuY3JlYXRlJzogJ05ldyBydW4nLFxuICAgICdleGVjLmZvcm1UaXRsZSc6ICdXaGF0IHRvIGRvIChvbmUgbGluZSknLFxuICAgICdleGVjLmZvcm1EZXNjJzogJ1JlcXVpcmVtZW50OiBnb2FsLCBtb2R1bGVzLCBhY2NlcHRhbmNlJyxcbiAgICAnZXhlYy5zdGFydCc6ICdTdGFydCBydW4nLFxuICAgICdleGVjLnN0YXJ0aW5nJzogJ1N0YXJ0aW5nXHUyMDI2JyxcbiAgICAnZXhlYy5jcmVhdGVIaW50JzogJ0NyZWF0ZXMgYSBjaGFuZ2UsIGdlbmVyYXRlcyBhIHBsYW4sIHRoZW4gQUkgc3ViYWdlbnRzIGV4ZWN1dGUgc3RlcCBieSBzdGVwOyBwcm9ncmVzcyByZWZyZXNoZXMgYmVsb3cuJyxcbiAgICAnZXhlYy5tb2RlbERlZmF1bHQnOiAnRXhlY3V0aW9uIG1vZGVsIChyb2xlIGRlZmF1bHRzOiBhbmFseXNpcy9vcHM9ZmFzdCwgY29kaW5nPXN0YW5kYXJkLCBwbGFubmluZz1yZWFzb25pbmcsIHZlcmlmaWNhdGlvbj12ZXJpZmllciknLFxuICAgICdiYWRnZS5ydW5uaW5nJzogJ3tufSBydW5zIGluIHByb2dyZXNzLCBjbGljayB0byB2aWV3JyxcbiAgICAnbmFycmF0aXZlLnRpdGxlJzogJ1dvcmstcm91bmQgbmFycmF0aXZlJyxcbiAgICAnbmFycmF0aXZlLmdlbmVyYXRlJzogJ0ludGVycHJldCB0aGlzIHJvdW5kIG9mIHdvcmsnLFxuICAgICduYXJyYXRpdmUucnVubmluZyc6ICdHZW5lcmF0aW5nXHUyMDI2ICh+MTAtMzBzKScsXG4gICAgJ2JhZGdlLmZhaWxlZCc6ICd7bn0gcnVucyBuZWVkIGF0dGVudGlvbiwgY2xpY2sgdG8gdmlldycsXG4gICAgJ2V4ZWMuZmxvd0NyZWF0ZSc6ICdEZXNjcmliZSB0aGUgdGFzaycsXG4gICAgJ2V4ZWMuZmxvd09yY2hlc3RyYXRlJzogJ0NvbmZpcm0gb3JjaGVzdHJhdGlvbiAocGVyLXN0ZXAgbW9kZWwvcm9sZS9mYWlsdXJlIHBvbGljeSknLFxuICAgICdleGVjLmZsb3dSdW4nOiAnTGF1bmNoICh0cmFjayBwcm9ncmVzcyAmIGNvc3QgaW4gcnVuIGRldGFpbCknLFxuICAgICdleGVjLmZsb3dNZW1vcnknOiAnQXV0by1kaXN0aWxsIG1lbW9yaWVzIChjb25maXJtIGluIG1lbW9yeSBwYW5lbCknLFxuICAgICdleGVjLnBsYW5uaW5nJzogJ0dlbmVyYXRpbmcgb3JjaGVzdHJhdGlvblx1MjAyNiAoTExNIGlzIGRlY29tcG9zaW5nIHRoZSB0YXNrLCB+MTAtMzBzKScsXG4gICAgJ2V4ZWMuY29sLnN0ZXBzJzogJ1N0ZXBzJyxcbiAgICAnbm90ZXMuZWRpdCc6ICdFZGl0JyxcbiAgICAnbm90ZXMudG9NZW1vcnknOiAnVG8gbWVtb3J5JyxcbiAgICAnbm90ZXMudG9NZW1vcnlIaW50JzogJ1ByZWZpbGwgdGhlIG1lbW9yeSBmb3JtIGJlbG93IHdpdGggdGhpcyBub3RlJyxcbiAgICAnbm90ZXMudG9NZW1vcnlEb25lJzogJ1x1MjcxMyBQcmVmaWxsZWQgdGhlIG1lbW9yeSBmb3JtIChjaG9vc2UgYSB0eXBlIGluIHRoZSBQcm9qZWN0IG1lbW9yeSB6b25lIGJlbG93LCB0aGVuIGFkZCknLFxuICAgICdub3Rlcy5jb3B5TWQnOiAnQ29weSBNRCcsXG4gICAgJ25vdGVzLmNvcHlNZEhpbnQnOiAnQ29weSB0aGlzIG5vdGUgYXMgTWFya2Rvd24gdG8gdGhlIGNsaXBib2FyZCcsXG4gICAgJ25vdGVzLmNvcHlNZERvbmUnOiAnQ29waWVkIGFzIE1hcmtkb3duJyxcbiAgICAnbm90ZXMuZXhwb3J0TWQnOiAnRXhwb3J0IE1EJyxcbiAgICAnbm90ZXMuZXhwb3J0TWRIaW50JzogJ0Rvd25sb2FkIGFzIGEgLm1kIGZpbGUnLFxuICAgICdub3Rlcy5leHBvcnREb25lJzogJ0V4cG9ydGVkIGFzIC5tZCcsXG4gICAgJ25vdGVzLmRpZ2VzdE5ldmVyJzogJ05vIEFJIHN1bW1hcnkgZ2VuZXJhdGVkIHlldCcsXG4gICAgJ25vdGVzLmRpZ2VzdFBlbmRpbmcnOiAne259IG5ldyBjb21taXRzIHNpbmNlIHRoZSBsYXN0IHN1bW1hcnknLFxuICAgICdkZXRhaWwuc2F2ZU5vdGUnOiAnU2F2ZSBhcyBub3RlJyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlSGludCc6ICdTYXZlIHRoaXMgcmV2aWV3IGNvbmNsdXNpb24gKHdoYXQvbG9naWMvcmlza3MpIGFzIGEgc3RydWN0dXJlZCBub3RlJyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlVGl0bGUnOiAnUmV2aWV3IHJlY29yZCcsXG4gICAgJ2RldGFpbC5zYXZlTWVtb3J5JzogJ0Rpc3RpbGwgdG8gbWVtb3J5JyxcbiAgICAnZGV0YWlsLnNhdmVNZW1vcnlIaW50JzogJ0Rpc3RpbGwgdGhpcyByZXZpZXcgY29uY2x1c2lvbiBpbnRvIGEgcHJvamVjdCBtZW1vcnkgKHF1ZXVlZCBmb3IgY29uZmlybWF0aW9uKScsXG4gICAgJ25vdGVzLnNhdmUnOiAnU2F2ZScsXG4gICAgJ25vdGVzLmNhbmNlbCc6ICdDYW5jZWwnLFxuICAgICdtZW1vcnkuYnJhbmNoU2NvcGUnOiAnQnJhbmNoJyxcbiAgICAnbWVtb3J5LmJyYW5jaEFsbCc6ICdBbGwgYnJhbmNoZXMnLFxuICAgICdub3Rlcy5zZWFyY2gnOiAnU2VhcmNoIG5vdGVzXHUyMDI2JyxcbiAgICAnbW9kZWwudGl0bGUnOiAnTW9kZWwgYXNzaWdubWVudCAod2hpY2ggbW9kZWwgcGVyIHRhc2spJyxcbiAgICAnbW9kZWwubG9hZGluZyc6ICdMb2FkaW5nIG1vZGVsc1x1MjAyNicsXG4gICAgJ21vZGVsLmZvbGxvd0NoYXQnOiAnRm9sbG93IGNoYXQgbW9kZWwnLFxuICAgICdtb2RlbC5zYXZlJzogJ1NhdmUgJiBhcHBseScsXG4gICAgJ21vZGVsLnNhdmVkJzogJ0FwcGxpZWQnLFxuICAgICdtb2RlbC5oaW50JzogJ0FwcGxpZXMgaW1tZWRpYXRlbHkgYW5kIHBlcnNpc3RzIGFjcm9zcyByZXN0YXJ0czsgY2hhdCBtb2RlbCB1bmFmZmVjdGVkLicsXG4gICAgJ25vdGVzLmFpU3VtbWFyeSc6ICdBSSBzdW1tYXJ5JyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5UnVuJzogJ1N1bW1hcml6aW5nXHUyMDI2ICgxMC0zMHMpJyxcbiAgICAnbm90ZXMuZXhwYW5kJzogJ0V4cGFuZCcsXG4gICAgJ25vdGVzLmNvbGxhcHNlJzogJ0NvbGxhcHNlJyxcbiAgICAnbm90ZXMuc3VtbWFyeVRhZyc6ICdBSSBzdW1tYXJ5JyxcbiAgICAnbm90ZXMuZW1wdHlTZWFyY2gnOiAnTm8gbWF0Y2hpbmcgbm90ZXMuJyxcbiAgICAnbm90ZXMuY29udGVudEhpbnQnOiAnTm90ZSBjb250ZW50IChtdWx0aS1saW5lKTogY29uY2x1c2lvbnMsIHF1ZXN0aW9ucywgbGVhcm5pbmdzXHUyMDI2JyxcbiAgICAnbm90ZXMudGFnc0hpbnQnOiAnVGFncyAoY29tbWEgc2VwYXJhdGVkLCBvcHRpb25hbDsgY2xpY2sgYSB0YWcgdG8gZmlsdGVyKScsXG4gICAgJ25vdGVzLnBpbic6ICdQaW4nLFxuICAgICdub3Rlcy51bnBpbic6ICdVbnBpbicsXG4gICAgJ25vdGVzLmVkaXRlZEF0JzogJ2VkaXRlZCcsXG4gICAgJ3Jldmlldy5maWx0ZXJBbGwnOiAnQWxsJyxcbiAgICAncmV2aWV3LnN0YXR1c0FsbCc6ICdBbGwgc3RhdHVzZXMnLFxuICAgICdyZXZpZXcudmVyaWZ5JzogJ1JlLXZlcmlmeScsXG4gICAgJ3Jldmlldy52ZXJpZnlSdW5uaW5nJzogJ1ZlcmlmeWluZ1x1MjAyNicsXG4gICAgJ3Jldmlldy52ZXJpZnlIaW50JzogJ0FmdGVyIGZpeGluZyB0aGUgY29kZSwgY2xpY2sgdG8gcmUtY2hlY2s6IHdoZXRoZXIgaXNzdWVzIGFyZSBmaXhlZCwgd2hldGhlciB0aGUgY2hhbmdlIGlzIG9wdGltYWwgYW5kIG1pbmltYWxseSBpbnZhc2l2ZSwgYW5kIHdoZXRoZXIgbmV3IGlzc3VlcyBhcHBlYXJlZC4gT25seSBhIHBhc3NpbmcgcmUtdmVyaWZpY2F0aW9uIG1hcmtzIGlzc3VlcyByZXNvbHZlZC4nLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZSc6ICdGYWxzZSBwb3NpdGl2ZScsXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlSGludCc6ICdIdW1hbi1tYXJrIHRoaXMgaXNzdWUgYXMgYSBmYWxzZSBwb3NpdGl2ZSBhbmQgY2xvc2UgaXQgKGRpc3RpbmN0IGZyb20gYSB2ZXJpZmllZCBmaXgpJyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVUaXRsZSc6ICdNYXJrIGFzIGZhbHNlIHBvc2l0aXZlPycsXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlTXNnJzogJ1wie3RpdGxlfVwiIHdpbGwgYmUgbWFya2VkIHJlamVjdGVkIGFuZCByZW1vdmVkIGZyb20gdGhlIG9wZW4gcXVldWUuJyxcbiAgICAncmV2aWV3LmZpeERldGFpbCc6ICdGaXggZGV0YWlscycsXG4gICAgJ3Jldmlldy5maXhTdGF0RmlsZXMnOiAnZmlsZXMnLFxuICAgICdyZXZpZXcuZml4RmlsZXMnOiAnRmlsZXMgdG91Y2hlZCBieSB0aGUgZml4JyxcbiAgICAncmV2aWV3LmZpeEltcGFjdCc6ICdJbXBhY3Qgc2NvcGUgKGNoYW5nZWQgc3ltYm9scyBhbmQgY2FsbGVycyknLFxuICAgICdyZXZpZXcuZGVmaW5lZEluJzogJ2RlZmluZWQgaW4nLFxuICAgICdyZXZpZXcuY2FsbENvdW50JzogJ2NhbGwgc2l0ZShzKScsXG4gICAgJ3Jldmlldy5maXhEaWZmJzogJ0ZpeCBkaWZmIChyZWxhdGl2ZSB0byB0aGUgcmV2aWV3IGJhc2VsaW5lKScsXG4gICAgJ3Jldmlldy5yZWZyZXNoJzogJ1JlZnJlc2gnLFxuICAgICdyZXZpZXcucmV0ZW50aW9uSGludCc6ICdSZXNvbHZlZCAvIGZhbHNlLXBvc2l0aXZlIGlzc3VlcyBhcmUgYXV0by1wdXJnZWQgYWZ0ZXIge2RheXN9IGRheShzKScsXG4gICAgJ3Jldmlldy50YXJnZXQnOiAnVGFyZ2V0JyxcbiAgICAncmV2aWV3LndvcmtpbmdUYXJnZXQnOiAnV29ya2luZyB0cmVlJyxcbiAgICAncmV2aWV3LmV4cG9ydE1kJzogJ0V4cG9ydCBNRCcsXG4gICAgJ3Jldmlldy5leHBvcnRNZEhpbnQnOiAnRG93bmxvYWQgdGhlIGZpbHRlcmVkIGlzc3VlIGxpc3QgYXMgYSAubWQgZmlsZScsXG4gICAgJ3Jldmlldy5leHBvcnRFbXB0eSc6ICdObyBpc3N1ZXMgdG8gZXhwb3J0JyxcbiAgICAncmV2aWV3LnNlbGVjdEFsbCc6ICdTZWxlY3QgYWxsJyxcbiAgICAncmV2aWV3LmNoZWNrZWRDb3VudCc6ICd7bn0gc2VsZWN0ZWQnLFxuICAgICdyZXZpZXcubWFya0hhbmRsZWQnOiAnTWFyayBoYW5kbGVkJyxcbiAgICAncmV2aWV3LmJhdGNoVmVyaWZ5JzogJ0JhdGNoIHZlcmlmeScsXG4gICAgJ3Jldmlldy5iYXRjaFZlcmlmeUNvbmZpcm1UaXRsZSc6ICdCYXRjaCB2ZXJpZnk/JyxcbiAgICAncmV2aWV3LmJhdGNoVmVyaWZ5Q29uZmlybU1zZyc6ICdXaWxsIHZlcmlmeSB7bn0gcmV2aWV3IHRhcmdldHMgb25lIGJ5IG9uZSAoc2VyaWFsIExMTSBjYWxscywgfjEwLTYwcyBlYWNoLCBjb25zdW1lcyBtb2RlbCB1c2FnZSk7IHlvdSBjYW4gc3RvcCBhbnl0aW1lLicsXG4gICAgJ3Jldmlldy5iYXRjaFN0b3AnOiAnU3RvcCcsXG4gICAgJ3Jldmlldy5iYXRjaFByb2dyZXNzJzogJ0JhdGNoIHZlcmlmeWluZyB7aX0ve259JyxcbiAgICAncmV2aWV3LmJhdGNoRG9uZSc6ICdCYXRjaCB2ZXJpZnkgZG9uZToge2F9IHJlc29sdmVkIFx1MDBCNyB7Yn0gc3RpbGwgb3BlbiBcdTAwQjcge2N9IG5ldyBcdTAwQjcge2R9IGZhaWxlZCB0YXJnZXRzJyxcbiAgICAncmV2aWV3LmJhdGNoU3RvcHBlZCc6ICdCYXRjaCB2ZXJpZnkgc3RvcHBlZCcsXG4gICAgJ3Jldmlldy5zZW5kQ2hhdCc6ICdTZW5kIHRvIGNoYXQnLFxuICAgICdyZXZpZXcuc2VuZENoYXRIaW50JzogJ1NlbmQgcGVuZGluZyBpc3N1ZXMgdW5kZXIgdGhlIGN1cnJlbnQgZmlsdGVyIChtYXggMzApIHRvIHRoZSBjaGF0IHdpbmRvdyBmb3IgaG9saXN0aWMgcmUtdmVyaWZpY2F0aW9uIChmYWxzZSBwb3NpdGl2ZSAvIGR1cGxpY2F0ZSAvIGFscmVhZHkgZml4ZWQpJyxcbiAgICAncmV2aWV3LnNlbmRDaGF0Q29uZmlybVRpdGxlJzogJ1NlbmQgdG8gY2hhdCBcdTIwMTQgcGljayBhIG1vZGUnLFxuICAgICdyZXZpZXcuc2VuZENoYXRDb25maXJtTXNnJzogJ1dpbGwgc2VuZCB7bn0gcGVuZGluZyBpc3N1ZXMgdG8gdGhlIGN1cnJlbnQgY2hhdCB3aW5kb3cgKGNvbnN1bWVzIG1vZGVsIHVzYWdlKS4gQXV0byBmaXg6IHZlcmlmeSArIGZpeCArIHdyaXRlLWJhY2ssIGZ1bGx5IGF1dG9tYXRpYy4gUGxhbiBmaXJzdDogZmFsc2UgcG9zaXRpdmVzL2R1cGxpY2F0ZXMvb2Jzb2xldGUgYXJlIGF1dG8tY2xvc2VkOyByZWFsIGlzc3VlcyBhcmUgTk9UIGZpeGVkIFx1MjAxNCB5b3UgZ2V0IHBlci1pc3N1ZSBwbGFucyAoYXBwcm9hY2ggLyBpbXBhY3QgLyBiZW5lZml0KSBhbmQgdGhlIG1vZGVsIGZpeGVzIG9ubHkgYWZ0ZXIgeW91IGFwcHJvdmUgaW4gY2hhdC4nLFxuICAgICdyZXZpZXcuc2VuZENoYXRBdXRvJzogJ1x1MjZBMSBBdXRvIGZpeCcsXG4gICAgJ3Jldmlldy5zZW5kQ2hhdFBsYW4nOiAnXHVEODNEXHVEQ0NCIFBsYW4gZmlyc3QnLFxuICAgICdyZXZpZXcuc2VuZENoYXRFbXB0eSc6ICdObyBwZW5kaW5nIGlzc3VlcyB0byBzZW5kJyxcbiAgICAncmV2aWV3LnNlbmRDaGF0Tm9TZXNzaW9uJzogJ09wZW4gYSBzZXNzaW9uIG9mIHRoaXMgcHJvamVjdCBvbiB0aGUgbGVmdCBiZWZvcmUgc2VuZGluZyB0byBjaGF0JyxcbiAgICAncmV2aWV3LnNlbmRDaGF0RG9uZSc6ICdTZW50IHtufSBpc3N1ZXMgdG8gY2hhdDsgdGhlIG1vZGVsIHdpbGwgdmVyaWZ5IHRoZW0gb25lIGJ5IG9uZS4nLFxuICAgICdyZXZpZXcuaGFuZGxlZERvbmUnOiAne259IGlzc3VlcyBtYXJrZWQgYXMgaGFuZGxlZCcsXG5cbiAgICAncGxhbi50aXRsZSc6ICdPcmNoZXN0cmF0aW9uIHBsYW4nLFxuICAgICdwbGFuLmhpbnQnOiAnRWFjaCBzdGVwIHJvbGUgZHJpdmVzIGNvbnRleHQgaW5qZWN0aW9uIGFuZCB0aGUgZGVmYXVsdCBtb2RlbCAoYW5hbHlzaXMvb3BzPWZhc3QsIGNvZGluZz1zdGFuZGFyZCwgcGxhbm5pbmc9cmVhc29uaW5nLCB2ZXJpZmljYXRpb249dmVyaWZpZXIpOyBhZGp1c3QgYmVmb3JlIGxhdW5jaGluZy4nLFxuICAgICdwbGFuLmNvbC5zdGVwJzogJ1N0ZXAnLCAncGxhbi5jb2wucm9sZSc6ICdSb2xlJywgJ3BsYW4uY29sLm1vZGVsJzogJ01vZGVsJywgJ3BsYW4uY29sLnBvbGljeSc6ICdGYWlsdXJlIHBvbGljeScsICdwbGFuLmNvbC5lbmFibGVkJzogJ09uJywgJ3BsYW4uY29sLmF0dGVtcHRzJzogJ0F0dGVtcHRzJyxcbiAgICAncGxhbi5tb2RlbERlZmF1bHQnOiAnUm9sZSBkZWZhdWx0JyxcbiAgICAncGxhbi5sYXVuY2hFZGl0ZWQnOiAnU2F2ZSBlZGl0cyAmIGxhdW5jaCcsXG4gICAgJ3BsYW4ubGF1bmNoRGlyZWN0JzogJ0xhdW5jaCBhcy1pcycsXG4gICAgJ3BsYW4uZGlzY2FyZCc6ICdEaXNjYXJkJyxcbiAgICAncGxhbi52aWV3RGV0YWlsJzogJ0RldGFpbCcsICdwbGFuLnJlZnJlc2hEZXRhaWwnOiAnUmVmcmVzaCcsICdwbGFuLmNsb3NlRGV0YWlsJzogJ0Nsb3NlJyxcbiAgICAncGxhbi5kZXRhaWxUaXRsZSc6ICdSdW4gZGV0YWlsJyxcbiAgICAncGxhbi5wYXVzZWRCYW5uZXInOiAnUnVuIHBhdXNlZCwgYXdhaXRpbmcgeW91ciBkZWNpc2lvbicsXG4gICAgJ3BsYW4ucmVzdW1lUmV0cnknOiAnUmV0cnkgc3RlcCAmIGNvbnRpbnVlJyxcbiAgICAncGxhbi5yZXN1bWVTa2lwJzogJ1NraXAgc3RlcCAmIGNvbnRpbnVlJyxcbiAgICAncGxhbi5yZXN1bWVGYWlsZWQnOiAnUmVzdW1lIGZyb20gZmFpbHVyZScsXG4gICAgJ3BsYW4uY29udGV4dFRpdGxlJzogJ1J1biBjb250ZXh0ICh3aGF0IHdhcyBpbmplY3RlZCknLFxuICAgICdwbGFuLmJyYW5jaCc6ICdCcmFuY2gnLCAncGxhbi5pbmplY3RlZE1lbW9yaWVzJzogJ0luamVjdGVkIG1lbW9yaWVzJywgJ3BsYW4uZGVjaXNpb25Mb2cnOiAnRGVjaXNpb24gbG9nJyxcbiAgICAnZXhlYy5jb2wuZGV0YWlsJzogJ0RldGFpbCcsXG5cbiAgICAnc2NoZWQudGl0bGUnOiAnU2NoZWR1bGVkIHRhc2tzJyxcbiAgICAnc2NoZWQuZm9ybU5hbWUnOiAnVGFzayBuYW1lJywgJ3NjaGVkLmZvcm1JbnRlcnZhbCc6ICdJbnRlcnZhbCAobWludXRlcyknLFxuICAgICdzY2hlZC50eXBlUmV2aWV3JzogJ0F1dG8gcmV2aWV3JywgJ3NjaGVkLnR5cGVTdW1tYXJ5JzogJ0FJIHN1bW1hcnknLCAnc2NoZWQudHlwZVJ1bic6ICdUaW1lZCBydW4nLFxuICAgICdzY2hlZC5hZGQnOiAnQ3JlYXRlJyxcbiAgICAnc2NoZWQuaGludCc6ICdSdW5zIGF1dG9tYXRpY2FsbHkgd2hlbiBkdWU6IGF1dG8gcmV2aWV3ID0gcmV2aWV3IGNvbW1pdHMgZnJvbSB0aGUgbGFzdCAyNGggKGlzc3VlcyBsYW5kIGluIHRoZSBSZXZpZXcgdGFiKTsgQUkgc3VtbWFyeSA9IGluY3JlbWVudGFsIGxlYXJuaW5nIHN1bW1hcnk7IHRpbWVkIHJ1biA9IGV4ZWN1dGUgdGhlIHRlbXBsYXRlIGFzIGFuIG9yY2hlc3RyYXRlZCB0YXNrLiBNaW5pbXVtIDEgbWludXRlLicsXG4gICAgJ3NjaGVkLmVtcHR5JzogJ05vIHNjaGVkdWxlZCB0YXNrcyB5ZXQuJyxcbiAgICAnc2NoZWQuY29sLm5hbWUnOiAnTmFtZScsICdzY2hlZC5jb2wudHlwZSc6ICdUeXBlJywgJ3NjaGVkLmNvbC5pbnRlcnZhbCc6ICdDeWNsZScsICdzY2hlZC5jb2wubmV4dCc6ICdOZXh0IHJ1bicsICdzY2hlZC5jb2wubGFzdFJlc3VsdCc6ICdMYXN0IHJlc3VsdCcsICdzY2hlZC5jb2wuYWN0aW9ucyc6ICdBY3Rpb25zJyxcbiAgICAnc2NoZWQuZGF5JzogJyBkJywgJ3NjaGVkLmhvdXInOiAnIGgnLCAnc2NoZWQubWludXRlJzogJyBtaW4nLFxuICAgICdzY2hlZC5kaXNhYmxlJzogJ1BhdXNlJywgJ3NjaGVkLmVuYWJsZSc6ICdFbmFibGUnLCAnc2NoZWQucnVuTm93JzogJ1J1biBub3cnLFxuXG4gICAgJ21lbW9yeS56b25lVGl0bGUnOiAnUHJvamVjdCBtZW1vcnknLFxuICAgICdtZW1vcnkuc3luY0Jhc2VsaW5lJzogJ1N5bmMgYmFzZWxpbmUnLCAnbWVtb3J5LnN5bmNOb25lJzogJ25ldmVyIHN5bmNlZCcsXG4gICAgJ21lbW9yeS5iZWhpbmQnOiAne259IGNvbW1pdHMgYmVoaW5kJyxcbiAgICAnbWVtb3J5LnN5bmMnOiAnU3luYyBtZW1vcnknLCAnbWVtb3J5LnN5bmNpbmcnOiAnU3luY2luZ1x1MjAyNicsICdtZW1vcnkuc3luY0ZhaWxlZCc6ICdTeW5jIGZhaWxlZCcsXG4gICAgJ21lbW9yeS5zdGFsZVRpdGxlJzogJ1Bvc3NpYmx5IHN0YWxlIChyZWxhdGVkIGNvZGUgY2hhbmdlZDsgcmV2aWV3IG5lZWRlZCknLFxuICAgICdtZW1vcnkubWFya1N0YWxlJzogJ01hcmsgc3RhbGUnLCAnbWVtb3J5LmFyY2hpdmVCdG4nOiAnQXJjaGl2ZScsICdtZW1vcnkua2VlcEFjdGl2ZSc6ICdTdGlsbCB2YWxpZCcsXG4gICAgJ21lbW9yeS5uZXdDYW5kaWRhdGVzJzogJ05ldyBjYW5kaWRhdGVzIChxdWV1ZWQgZm9yIGNvbmZpcm1hdGlvbik6JyxcbiAgICAnbWVtb3J5LmNsb3NlUmVwb3J0JzogJ0Nsb3NlIHJlcG9ydCcsXG4gICAgJ21lbW9yeS5zY29wZVByb2plY3QnOiAnTWFpbmxpbmUgKGFsbCBicmFuY2hlcyknLCAnbWVtb3J5LnNjb3BlQnJhbmNoJzogJ0N1cnJlbnQgYnJhbmNoIG9ubHknLFxuICAgICdtZW1vcnkucGVuZGluZ1F1ZXVlJzogJ1BlbmRpbmcgY29uZmlybWF0aW9uJyxcbiAgICAnbWVtb3J5LnRvTm90ZSc6ICdUbyBub3RlJywgJ21lbW9yeS5ub3JtYWxpemUnOiAnTm9ybWFsaXplIHRvIG1haW5saW5lJywgJ21lbW9yeS5yZXN0b3JlJzogJ1Jlc3RvcmUnLFxuICAgICdtZW1vcnkuc3RhdHVzU3RhbGUnOiAnU3RhbGUnLFxuICAgICdmcy5icm93c2UnOiAnQnJvd3NlJyxcbiAgICAnZnMudXAnOiAnVXAnLFxuICAgICdmcy51c2UnOiAnVXNlIHRoaXMgZGlyZWN0b3J5JyxcbiAgICAnZnMucmVnaXN0ZXInOiAnQWxzbyByZWdpc3RlciBhcyBzZXNzaW9uIHdvcmtzcGFjZScsXG4gICAgJ2ZzLmxvYWRpbmcnOiAnUmVhZGluZ1x1MjAyNicsXG4gICAgJ2ZzLmVtcHR5JzogJ05vIHN1YmRpcmVjdG9yaWVzLicsXG4gICAgJ2ltcGFjdC5mdW5jdGlvbnNOb25lJzogJ05vIGZ1bmN0aW9uLWxldmVsIGNhbGwgaW1wYWN0IGRldGVjdGVkIChzdHlsZS9hc3NldC9jb25maWctb25seSBjaGFuZ2UpLicsXG4gICAgJ3Jldmlldy5jb2wuc2V2ZXJpdHknOiAnU2V2ZXJpdHknLFxuICAgICdyZXZpZXcuY29sLmNhdGVnb3J5JzogJ0NhdGVnb3J5JyxcbiAgICAncmV2aWV3LmNvbC50aXRsZSc6ICdJc3N1ZScsXG4gICAgJ3Jldmlldy5jb2wuZXZpZGVuY2UnOiAnTG9jYXRpb24nLFxuICAgICdyZXZpZXcuY29sLmZpeCc6ICdTdWdnZXN0ZWQgZml4JyxcbiAgICAncmV2aWV3LmhpbnQnOiAnQ2xpY2sgdGhlIGJ1dHRvbiBhYm92ZSB0byBwcm9kdWNlIHRoZSBvcHRpbWFsaXR5IHZlcmRpY3QgYW5kIGlzc3VlIGxpc3QuJyxcbiAgICAnZGlmZi5zaG93JzogJ0RpZmYnLFxuICAgICdkaWZmLmhpZGUnOiAnSGlkZSBkaWZmJyxcblxuICAgICdkZXRhaWwudGl0bGUnOiAnUmV2aWV3IGRldGFpbCcsXG4gICAgJ2RldGFpbC5waWNrJzogJ1x1MjE5MCBQaWNrIGEgY29tbWl0IChvciB0aGUgdW5jb21taXR0ZWQgY2hhbmdlcykgb24gdGhlIGxlZnQgdG8gc3RhcnQgcmV2aWV3aW5nJyxcbiAgICAnZGV0YWlsLndoYXQnOiAnV2hhdCBpdCBkb2VzJyxcbiAgICAnZGV0YWlsLmxvZ2ljJzogJ0ltcGxlbWVudGF0aW9uIGxvZ2ljJyxcbiAgICAnZGV0YWlsLnJpc2snOiAnUmlza3MnLFxuICAgICdkZXRhaWwuZmlsZXMnOiAnRmlsZXMnLFxuICAgICdkZXRhaWwucGF0Y2gnOiAnU2hvdyByYXcgcGF0Y2gnLFxuICAgICdkZXRhaWwuYWlMb2FkaW5nJzogJ0dlbmVyYXRpbmcgQUkgZXhwbGFuYXRpb25cdTIwMjYgKDEwLTMwcyknLFxuICAgICdkZXRhaWwucXVldWVkJzogJ3tufSBhbmFseXNlcyBxdWV1ZWQgKHdpbGwgcnVuIGNvbmN1cnJlbnRseSknLFxuICAgICdkZXRhaWwuY2FyZFF1ZXVlZCc6ICdXYWl0aW5nIGluIHRoZSBhbmFseXNpcyBxdWV1ZSAobWF4IDMgY29uY3VycmVudCB0byBwcm90ZWN0IHRoZSBtb2RlbCBnYXRld2F5KScsXG4gICAgJ2RldGFpbC5pbXBhY3QnOiAnSW1wYWN0IHNjb3BlJyxcbiAgICAnZGV0YWlsLmltcGFjdExvYWRpbmcnOiAnU2Nhbm5pbmcgaW1wYWN0XHUyMDI2IChyZWZlcmVuY2Ugc2VhcmNoICsgZ3JhcGggd2FsayknLFxuICAgICdkZXRhaWwub3B0aW1hbGl0eSc6ICdPcHRpbWFsaXR5IHJldmlldycsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZyc6ICdSZXZpZXdpbmdcdTIwMjYgKHByb2R1Y2VzIGlzc3VlIGxpc3QgYW5kIG9wdGltYWxpdHkgdmVyZGljdCknLFxuXG4gICAgJ2ltcGFjdC5yaXNrJzogJ1Jpc2snLFxuICAgICdpbXBhY3QuY29sLmNoYW5nZWQnOiAnQ2hhbmdlZCBmaWxlcycsXG4gICAgJ2ltcGFjdC5jb2wuaW5kaXJlY3QnOiAnSW5kaXJlY3QgKHJlZmVyZW5jZSBjaGFpbiknLFxuICAgICdpbXBhY3QuY29sLnBvdGVudGlhbCc6ICdQb3RlbnRpYWwnLFxuICAgICdpbXBhY3Qubm9uZSc6ICdObyBpbi1yZXBvIHJlZmVyZW5jZXJzIGZvdW5kICh0aGUgY2hhbmdlIGxvb2tzIHNlbGYtY29udGFpbmVkKS4nLFxuICAgICdpbXBhY3QudGVzdHMnOiAnUmVsYXRlZCB0ZXN0cycsXG4gICAgJ2ltcGFjdC5sZWdlbmQuY2hhbmdlZCc6ICdjaGFuZ2VkJyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5pbmRpcmVjdCc6ICdpbmRpcmVjdCcsXG4gICAgJ2ltcGFjdC5sZWdlbmQucG90ZW50aWFsJzogJ3BvdGVudGlhbCcsXG5cbiAgICAncmV2aWV3LnZlcmRpY3QnOiAnT3B0aW1hbGl0eSB2ZXJkaWN0JyxcbiAgICAncmV2aWV3Lmlzc3Vlcyc6ICdJc3N1ZXMnLFxuICAgICdyZXZpZXcuY2xlYW4nOiAnTm8gaXNzdWVzIGZvdW5kLicsXG5cbiAgICAnbm90ZXMudGl0bGUnOiAnUmV2aWV3IG5vdGVzJyxcbiAgICAnbm90ZXMuZm9ybVRpdGxlJzogJ05vdGUgdGl0bGUnLFxuICAgICdub3Rlcy5mb3JtQ29udGVudCc6ICdOb3RlIGNvbnRlbnQgKGNvbmNsdXNpb25zLCBxdWVzdGlvbnMsIGxlYXJuaW5nc1x1MjAyNiknLFxuICAgICdub3Rlcy5hZGQnOiAnQWRkIG5vdGUnLFxuICAgICdub3Rlcy5ib3VuZFRvJzogJ1dpbGwgYmUgbGlua2VkIHRvJyxcbiAgICAnbm90ZXMuY29sLnRpbWUnOiAnVGltZScsXG4gICAgJ25vdGVzLmNvbC50aXRsZSc6ICdUaXRsZScsXG4gICAgJ25vdGVzLmNvbC5jb250ZW50JzogJ0NvbnRlbnQnLFxuICAgICdub3Rlcy5jb2wuc2hhJzogJ0NvbW1pdCcsXG4gICAgJ25vdGVzLnJlbW92ZSc6ICdEZWxldGUnLFxuICAgICdub3Rlcy5lbXB0eSc6ICdObyBub3RlcyB5ZXQuIE5vdGUgZG93biBjb25jbHVzaW9ucyBhbmQgcXVlc3Rpb25zIHdoaWxlIHJldmlld2luZyBjb21taXRzIFx1MjAxNCB0aGF0IGlzIHlvdXIgcHJvamVjdCBsZWFybmluZyBhcmNoaXZlLicsXG5cbiAgICAnbWVtb3J5LnJlY29yZCc6ICdSZWNvcmQgcHJvamVjdCBtZW1vcnknLFxuICAgICdmb3JtLm1lbW9yeVRpdGxlJzogJ01lbW9yeSB0aXRsZScsXG4gICAgJ2Zvcm0ubWVtb3J5Q29udGVudCc6ICdNZW1vcnkgY29udGVudCAod2hhdCBhbmQgd2h5KScsXG4gICAgJ21lbW9yeS5jb2wudGl0bGUnOiAnSXRlbScsXG4gICAgJ21lbW9yeS5jb2wudHlwZSc6ICdUeXBlJyxcbiAgICAnbWVtb3J5LmNvbC50cnV0aCc6ICdUcnV0aCcsXG4gICAgJ21lbW9yeS5jb2wuYnJhbmNoJzogJ0JyYW5jaCcsXG4gICAgJ21lbW9yeS5jb25maXJtJzogJ0NvbmZpcm0nLFxuICAgICdtZW1vcnkuZW1wdHknOiAnTm8gcHJvamVjdCBtZW1vcmllcyB5ZXQuIEFzayB0aGUgQUkgaW4gY2hhdCB0byByZWNvcmQgb25lLCBvciBhZGQgYWJvdmUuJyxcbiAgICAnY29uY2VwdHMudGl0bGUnOiAnTGVhcm5pbmcgY29uY2VwdHMnLFxuICAgICdjb25jZXB0cy5ub25lJzogJ05vIGxlYXJuaW5nIGNvbmNlcHRzIHlldC4gVGhleSBhY2N1bXVsYXRlIGFmdGVyIHN1Y2Nlc3NmdWwgY2hhbmdlIHJ1bnMsIG9yIGFzayB0aGUgQUkgdG8gc3VtbWFyaXplIGxlYXJuaW5nIHBvaW50cy4nLFxuICAgICdjb25jZXB0cy5jb2wubmFtZSc6ICdDb25jZXB0JyxcbiAgICAnY29uY2VwdHMuY29sLmNhdGVnb3J5JzogJ0NhdGVnb3J5JyxcbiAgICAnY29uY2VwdHMuY29sLmNvdW50JzogJ0NvdW50JyxcbiAgICAncmV2aWV3LnJlY29yZHNUaXRsZSc6ICdSZXZpZXcgaXNzdWVzJyxcbiAgICAncmV2aWV3LnJlY29yZHNFbXB0eSc6ICdObyBpc3N1ZSByZWNvcmRzIHlldC4gSXNzdWVzIGZvdW5kIGJ5IHRoZSBjb21taXQtcmV2aWV3IHBhZ2UgYXJlIHJlY29yZGVkIGhlcmUgYXV0b21hdGljYWxseTsgcmUtcmV2aWV3aW5nIHJlcGxhY2VzIG9sZCByZWNvcmRzLicsXG4gICAgJ3ZlcmlmeS5yZWNvcmRzJzogJ1ZlcmlmaWNhdGlvbiByZWNvcmRzJyxcbiAgICAndmVyaWZ5LnJlY29yZHNFbXB0eSc6ICdObyB2ZXJpZmljYXRpb24gcmVjb3JkcyB5ZXQuIENsaWNrIFwiVmVyaWZ5XCIgaW4gdGhlIGV4ZWN1dGlvbiB0YWIgdG8gZ2VuZXJhdGUgb25lLicsXG5cbiAgICAnY29uZmlybWVkLnRpdGxlJzogJ0NvbmZpcm1lZCBjb25zdHJhaW50cyAoaHVtYW4tY29uZmlybWVkOyBBSSBlZGl0cyB0byBmb3JiaWRkZW4gcGF0aHMgYXJlIGF1dG8tZGVuaWVkKScsXG4gICAgJ2NvbmZpcm1lZC5hZGQnOiAnQWRkIGNvbnN0cmFpbnQnLFxuICAgICdjb25maXJtZWQudGV4dCc6ICdSZXF1aXJlbWVudCAvIGNvbnN0cmFpbnQgdGV4dCcsXG4gICAgJ2NvbmZpcm1lZC5wYXRocyc6ICdGb3JiaWRkZW4gcGF0aHMgKGNvbW1hIHNlcGFyYXRlZDsgcmVsYXRpdmUgdG8gcHJvamVjdCByb290IGxpa2Ugc3JjL2NvcmUsIG9yIGFic29sdXRlKScsXG4gICAgJ2NvbmZpcm1lZC5ub25lJzogJ05vIGNvbnN0cmFpbnRzIHlldC4gT25jZSBhZGRlZCwgQUkgZWRpdHMgdG8gZm9yYmlkZGVuIHBhdGhzIGluIHRoaXMgcHJvamVjdCBhcmUgYXV0by1kZW5pZWQuJyxcblxuICAgICdjaGFuZ2VzLnRpdGxlJzogJ0NoYW5nZSB0YXNrcycsXG4gICAgJ3N0YXRlLm5vQ2hhbmdlcyc6ICdObyBjaGFuZ2UgdGFza3MgeWV0LiBBc2sgdGhlIEFJIGluIGNoYXQgdG8gY3JlYXRlIG9uZSwgb3IgdXNlIFwiQ3JlYXRlIGNoYW5nZVwiIGFib3ZlLicsXG4gICAgJ2NoYW5nZXMuY29sLnRpdGxlJzogJ1RpdGxlJyxcbiAgICAnY2hhbmdlcy5jb2wudHlwZSc6ICdUeXBlJyxcbiAgICAnY2hhbmdlcy5jb2wuc3RhdHVzJzogJ1N0YXR1cycsXG4gICAgJ2NoYW5nZXMuY29sLnVwZGF0ZWQnOiAnVXBkYXRlZCcsXG4gICAgJ2V4ZWMuY29sLnN0YXR1cyc6ICdTdGF0dXMnLFxuICAgICdleGVjLmNvbC5jaGFuZ2UnOiAnQ2hhbmdlJyxcbiAgICAnZXhlYy5jb2wuc3RhcnRlZCc6ICdTdGFydGVkJyxcbiAgICAnZXhlYy5jb2wuY29zdCc6ICdDb3N0IChlc3QpJyxcbiAgICAnZXhlYy5hdHRlbXB0cyc6ICdBdHRlbXB0cycsXG4gICAgJ2V4ZWMuaGludCc6ICdSdW5zIChzdGFydF9ydW4pIGFyZSBzdGFydGVkIGZyb20gY2hhdDogYWZ0ZXIgYSBwbGFuIGV4aXN0cywgdGVsbCB0aGUgQUkgdG8gXCJzdGFydCBydW4gZm9yIHRoZSBjaGFuZ2VcIi4gVGhpcyB0YWIgc2hvd3MgcHJvZ3Jlc3MgYW5kIHJlc3VsdHMuJyxcbiAgICAnc3RhdGUubm9SdW5zJzogJ05vIHJ1bnMgeWV0LicsXG4gICAgJ3N0YXRlLnRlY2hTdGFjayc6ICdUZWNoIHN0YWNrJyxcbiAgICAnc3RhdGUuc3ltYm9scyc6ICdJbmRleGVkIHN5bWJvbHMnLFxuICAgICdzdGF0ZS5tYW5pZmVzdHMnOiAnTWFuaWZlc3RzJyxcbiAgICAnc3RhdGUuZXZpZGVuY2UnOiAnRXZpZGVuY2UgZW50cmllcycsXG4gIH0sXG59IGFzIGNvbnN0XG5cbmZ1bmN0aW9uIGZhbGxiYWNrVChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGRpY3QgPSBXT1JLU1BBQ0VfRElDVC56aCBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG4gIHJldHVybiBkaWN0W2tleV0gPz8ga2V5XG59XG5cbi8qKiBcdTY0Q0RcdTRGNUNcdTdFRDNcdTY3OUNcdTRFQkFcdTYwMjdcdTUzMTZcdUZGMUFcdTI3MTMvXHUyNzE3ICsgXHU2ODA3XHU5MUNGXHU1QjU3XHU2QkI1XHU3Njg0XHU3RDI3XHU1MUQxXHU4ODRDXHVGRjA4XHU4REYzXHU4RkM3XHU1RDRDXHU1OTU3XHU1QkY5XHU4QzYxXHU0RTBFXHU1MzlGXHU1OUNCIEpTT05cdUZGMDlcdTMwMDIgKi9cbmZ1bmN0aW9uIGZvcm1hdEFjdGlvblJlc3VsdChkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IHN0cmluZyB7XG4gIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IFtkYXRhWydvayddID09PSBmYWxzZSA/ICdcdTI3MTcnIDogJ1x1MjcxMyddXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGEpKSB7XG4gICAgaWYgKGtleSA9PT0gJ29rJykgY29udGludWVcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBsaW5lcy5wdXNoKGAke2tleX1cdUZGMUEke1N0cmluZyh2YWx1ZSkuc2xpY2UoMCwgMjAwKX1gKVxuICAgIH1cbiAgfVxuICBpZiAobGluZXMubGVuZ3RoID09PSAxKSBsaW5lcy5wdXNoKCdcdTYyMTBcdTUyOUYnKVxuICByZXR1cm4gbGluZXMuam9pbignXFxuJylcbn1cblxuLyoqIExMTSBcdTYyMTBcdTY3MkNcdUZGMDhcdTRGMzBcdUZGMDlcdTVGQkRcdTY4MDdcdUZGMUFcdTY1RTBcdTUwM0NcdUZGMDhcdTY3MkFcdTRFQTdcdTc1MUZcdThDMDNcdTc1MjggLyBcdTY1RTdcdTdGMTNcdTVCNThcdTRFMERcdTVFMjZcdTYyMTBcdTY3MkNcdUZGMDlcdTY1RjZcdThGRDRcdTU2REUgbnVsbCBcdTRFMERcdTUzNjBcdTRGNERcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlbmRlckNvc3RCYWRnZSh1c2Q6IG51bWJlciB8IHVuZGVmaW5lZCwgdGl0bGU6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gIGlmICh1c2QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGxcbiAgcmV0dXJuIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4Yjk0OWUnKX0gdGl0bGU9e3RpdGxlfT5cdTIyNDgke3VzZC50b0ZpeGVkKDQpfTwvc3Bhbj5cbn1cblxuY29uc3Qgc3R5bGVzOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5DU1NQcm9wZXJ0aWVzPiA9IHtcbiAgcm9vdDoge1xuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgIGhlaWdodDogJzEwMCUnLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyxcbiAgICBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScsXG4gICAgZm9udEZhbWlseTogJ3ZhcigtLWRzLWZvbnQtc2FucywgaW5oZXJpdCknLFxuICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgfSxcbiAgbmF2OiB7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIGdhcDogJzRweCcsXG4gICAgcGFkZGluZzogJzhweCAxMnB4JyxcbiAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMSwgcmdiYSg1LDUsNSwwLjEpKScsXG4gICAgZmxleDogJ25vbmUnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxuICB9LFxuICB0aXRsZTogeyBmb250U2l6ZTogJzEzcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbklubGluZUVuZDogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSxcbiAgdGFiOiAoYWN0aXZlOiBib29sZWFuKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiAoe1xuICAgIHBhZGRpbmc6ICc1cHggMTJweCcsXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcbiAgICBib3JkZXI6ICdub25lJyxcbiAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICBmb250U2l6ZTogJzEycHgnLFxuICAgIC8vIGJ1dHRvbi1pbmZvLWZpbGwgXHU0RTI0XHU0RTNCXHU5ODk4XHU5MEZEXHU4NEREXHVGRjFCYnJhbmQtcHJpbWFyeSBcdTU3MjhcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTY2MkZcdThGRDFcdTc2N0RcdTgyNzJcdUZGMENcdTc2N0RcdTVCNTdcdTRGMUFcdTg4QUJcdTU0MUVcdTYzODlcdUZGMDhcdTk4NzVcdTdCN0VcdTc2N0RcdTU3NTdcdTRFOEJcdTY1NDVcdUZGMDlcdTMwMDJcbiAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyAndmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgY29sb3I6IGFjdGl2ZSA/ICcjZmZmJyA6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsXG4gIH0pLFxuICBib2R5OiB7IGZsZXg6IDEsIG92ZXJmbG93WTogJ2F1dG8nLCBwYWRkaW5nOiAnMTRweCAxNnB4JyB9LFxuICBjYXJkOiB7XG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcbiAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgIHBhZGRpbmc6ICcxMnB4IDE0cHgnLFxuICAgIG1hcmdpbkJvdHRvbTogJzEycHgnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLFxuICB9LFxuICByb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxOHB4JywgZmxleFdyYXA6ICd3cmFwJywgZm9udFNpemU6ICcxMnB4JywgbWFyZ2luOiAnNnB4IDAnIH0sXG4gIGxhYmVsOiB7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnIH0sXG4gIHRhYmxlOiB7IHdpZHRoOiAnMTAwJScsIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLCBmb250U2l6ZTogJzEycHgnIH0sXG4gIHRoOiB7IHRleHRBbGlnbjogJ3N0YXJ0JywgcGFkZGluZzogJzZweCA4cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMSwgcmdiYSg1LDUsNSwwLjEpKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250V2VpZ2h0OiA1MDAgfSxcbiAgdGQ6IHsgcGFkZGluZzogJzZweCA4cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMywgcmdiYSg1LDUsNSwwLjA2KSknIH0sXG4gIGVtcHR5OiB7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250U2l6ZTogJzEycHgnLCBwYWRkaW5nOiAnMTBweCA0cHgnIH0sXG4gIGJ1dHRvbjoge1xuICAgIHBhZGRpbmc6ICc1cHggMTJweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAvLyBidXR0b24taW5mby1maWxsIFx1NjYyRlx1NUJCRlx1NEUzQlx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1NEUwQlx1OTBGRFx1NEUzQVx1ODRERFx1ODI3Mlx1MzAwMVx1NzY3RFx1NUI1N1x1NTNFRlx1OEJGQlx1NzY4NFx1NEUzQlx1NjRDRFx1NEY1Q1x1ODI3Mlx1RkYwOGJyYW5kLXByaW1hcnkgXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RTBEXHU1M0VGXHU4QkZCXHVGRjA5XHUzMDAyXG4gICAgZm9udFNpemU6ICcxMXB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1idXR0b24taW5mby1maWxsLCAjMjU2M2ViKScsIGNvbG9yOiAnI2ZmZicsXG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIH0sXG4gIHNlY29uZGFyeToge1xuICAgIHBhZGRpbmc6ICc1cHggMTJweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzExcHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgfSxcbiAgaW5wdXQ6IHtcbiAgICB3aWR0aDogJzEwMCUnLCBwYWRkaW5nOiAnNnB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgfSxcbiAgZm9ybVJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICc2cHgnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH0sXG4gIGZvcm1JbmxpbmU6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9LFxuICAvLyBzZWxlY3QgXHU3NTI4XHU3Q0ZCXHU3RURGXHU1OTE2XHU4OUMyXHU2NUY2IFdpbmRvd3MgXHU2RDQ1XHU4MjcyXHU2QTIxXHU1RjBGXHU0RTBCXHU1RjNBXHU1MjM2XHU3NjdEXHU1RTk1XHVGRjBDXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU0RTBCXHU0RTBEXHU1M0VGXHU4QkZCXHUyMDE0XHUyMDE0XHU4MUVBXHU3RUQ4XHU1OTE2XHU4OUMyXHU4RDcwXHU0RTNCXHU5ODk4XHU1M0Q4XHU5MUNGXHUzMDAyXG4gIHNlbGVjdDoge1xuICAgIGFwcGVhcmFuY2U6ICdub25lJywgV2Via2l0QXBwZWFyYW5jZTogJ25vbmUnLFxuICAgIHBhZGRpbmc6ICc2cHggMjZweCA2cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxuICAgIGJhY2tncm91bmRJbWFnZTogJ3VybChcImRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LDxzdmcgeG1sbnM9JTIyaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmclMjIgd2lkdGg9JTIyMTAlMjIgaGVpZ2h0PSUyMjYlMjI+PHBhdGggZD0lMjJNMSAxbDQgNCA0LTQlMjIgc3Ryb2tlPSUyMiUyMzg4OCUyMiBzdHJva2Utd2lkdGg9JTIyMS41JTIyIGZpbGw9JTIybm9uZSUyMi8+PC9zdmc+XCIpJyxcbiAgICBiYWNrZ3JvdW5kUmVwZWF0OiAnbm8tcmVwZWF0JywgYmFja2dyb3VuZFBvc2l0aW9uOiAncmlnaHQgOHB4IGNlbnRlcicsXG4gICAgY3Vyc29yOiAncG9pbnRlcicsIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCBtYXhXaWR0aDogJzEwMCUnLFxuICB9LFxuICBhY3Rpb25Sb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxMHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfSxcbiAgcmVzdWx0OiB7XG4gICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS42LFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxuICAgIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICcxMHB4IDEycHgnLCBtYXhIZWlnaHQ6ICczMjBweCcsIG92ZXJmbG93WTogJ2F1dG8nLFxuICB9LFxuICBiYWRnZTogKGNvbG9yOiBzdHJpbmcpOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+IHtcbiAgICBjb25zdCByZ2IgPSBwYXJzZUNvbG9yKGNvbG9yKVxuICAgIGlmIChyZ2IgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCBwYWRkaW5nOiAnMXB4IDhweCcsIGJvcmRlclJhZGl1czogJzRweCcsIGZvbnRTaXplOiAnMTFweCcsIGJhY2tncm91bmQ6IGAke2NvbG9yfTIyYCwgY29sb3IgfVxuICAgIH1cbiAgICBjb25zdCBbciwgZywgYl0gPSByZ2JcbiAgICAvLyBcdTVFOTVcdTgyNzJcdTdFREZcdTRFMDAgMTYlIFx1ODI3Mlx1OEMwM1x1RkYxQlx1NjU4N1x1NUI1N1x1ODI3Mlx1NEUzQlx1OTg5OFx1ODFFQVx1OTAwMlx1NUU5NFx1RkYwOFx1NkQ0NVx1ODI3Mlx1NkRGMVx1NTMxNlx1NTIzMFx1NzY3RFx1NUU5NVx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlxuICAgIHJldHVybiB7XG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgcGFkZGluZzogJzFweCA4cHgnLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnLFxuICAgICAgYmFja2dyb3VuZDogYHJnYmEoJHtyfSwgJHtnfSwgJHtifSwgMC4xNilgLFxuICAgICAgY29sb3I6IHRoZW1lQXdhcmVUZXh0KGNvbG9yKSxcbiAgICB9XG4gIH0sXG4gIHNlY3Rpb25UaXRsZTogeyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTJweCcsIG1hcmdpbkJvdHRvbTogJzhweCcgfSxcbiAgd2hhdDogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjcsIG1hcmdpbjogJzRweCAwIDhweCcgfSxcbiAgbG9naWNTdGVwOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuOCwgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnIH0sXG4gIHJpc2tJdGVtOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNywgbWFyZ2luOiAnMnB4IDAnIH0sXG4gIGNvbW1pdFJvdzogKGFjdGl2ZTogYm9vbGVhbik6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4gKHtcbiAgICBwYWRkaW5nOiAnOHB4IDEwcHgnLFxuICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgYm9yZGVyOiBhY3RpdmUgPyAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgOiAnMXB4IHNvbGlkIHRyYW5zcGFyZW50JyxcbiAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyAncmdiYSgzNyw5OSwyMzUsMC4wNiknIDogJ3RyYW5zcGFyZW50JyxcbiAgICBtYXJnaW5Cb3R0b206ICc0cHgnLFxuICB9KSxcbiAgY29tbWl0U3ViamVjdDogeyBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAsIGxpbmVIZWlnaHQ6IDEuNSwgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH0sXG4gIGNvbW1pdE1ldGE6IHsgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpblRvcDogJzJweCcsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JyB9LFxuICBwYXRjaDoge1xuICAgIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCBsaW5lSGVpZ2h0OiAxLjUsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzEwcHgnLCBtYXhIZWlnaHQ6ICczMjBweCcsIG92ZXJmbG93WTogJ2F1dG8nLFxuICB9LFxuICB0ZXh0YXJlYToge1xuICAgIHdpZHRoOiAnMTAwJScsIHBhZGRpbmc6ICc4cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxuICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCByZXNpemU6ICd2ZXJ0aWNhbCcsIGxpbmVIZWlnaHQ6IDEuNywgZm9udEZhbWlseTogJ2luaGVyaXQnLFxuICB9LFxuICBub3RlQ2FyZDoge1xuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJyxcbiAgICBib3JkZXJSYWRpdXM6ICc4cHgnLCBwYWRkaW5nOiAnMTJweCAxNHB4JywgbWFyZ2luQm90dG9tOiAnMTBweCcsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXG4gIH0sXG4gIG5vdGVUaXRsZVJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JywgZ2FwOiAnOHB4JyB9LFxuICBub3RlVGl0bGVUZXh0OiB7IGZvbnRTaXplOiAnMTNweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbGluZUhlaWdodDogMS41IH0sXG4gIG5vdGVDb250ZW50OiB7XG4gICAgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS44NSwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstd29yZCcsXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLCBtYXJnaW5Ub3A6ICc2cHgnLFxuICB9LFxuICBub3RlQ2xhbXA6IHtcbiAgICBkaXNwbGF5OiAnLXdlYmtpdC1ib3gnLCBXZWJraXRMaW5lQ2xhbXA6IDYsIFdlYmtpdEJveE9yaWVudDogJ3ZlcnRpY2FsJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICB9LFxuICBub3RlTWV0YToge1xuICAgIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc4cHgnLFxuICAgIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxuICB9LFxuICBsaW5rQnRuOiB7XG4gICAgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsIGZvbnRTaXplOiAnMTFweCcsIHBhZGRpbmc6ICcwJyxcbiAgICBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsXG4gIH0sXG4gIGNoaXA6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XG4gICAgcGFkZGluZzogJzJweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnOTk5cHgnLCBmb250U2l6ZTogJzExcHgnLCBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgIC8vIFx1NTQwQyB0YWJcdUZGMUFhY3RpdmUgXHU1ODZCXHU4MjcyXHU0RTAwXHU1RjhCIGJ1dHRvbi1pbmZvLWZpbGxcdUZGMDhcdTRFMjRcdTRFM0JcdTk4OThcdTkwRkRcdTg0RERcdUZGMDlcdUZGMENcdTc5ODFcdTc1MjggYnJhbmQtcHJpbWFyeVx1MzAwMlxuICAgIGJhY2tncm91bmQ6IGFjdGl2ZSA/ICd2YXIoLS1kc3ctYWxpYXMtYnV0dG9uLWluZm8tZmlsbCwgIzI1NjNlYiknIDogJ3RyYW5zcGFyZW50JyxcbiAgICBjb2xvcjogYWN0aXZlID8gJyNmZmYnIDogJ2luaGVyaXQnLFxuICB9KSxcbn1cblxuLyoqIFx1OThDRVx1OTY2OVx1N0I0OVx1N0VBNyBcdTIxOTIgXHU1RkJEXHU3QUUwXHU5ODlDXHU4MjcyXHUzMDAyICovXG5jb25zdCBSSVNLX0NPTE9SOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0geyBsb3c6ICcjNGVjOWIwJywgbWVkaXVtOiAnI2RjZGNhYScsIGhpZ2g6ICcjY2U5MTc4JywgY3JpdGljYWw6ICcjZjE0YzRjJyB9XG5cbi8qKlxuICogXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0IFNWRyBcdTZENDFcdTdBMEJcdTU2RkVcdUZGMUFcdTRFMDlcdTUyMTdcdTUyMDZcdTVDNDJcdUZGMDhcdTUzRDhcdTY2RjQgXHUyMTkyIFx1OTVGNFx1NjNBNVx1NUYxNVx1NzUyOFx1OTRGRSBcdTIxOTIgXHU2RjVDXHU1NzI4XHVGRjA5XHVGRjBDXG4gKiBcdTRGOURcdTYzNkUgL2ltcGFjdC1zY29wZSBcdThGRDRcdTU2REVcdTc2ODQgbGV2ZWxzXHVGRjA4XHU1NDJCXHU0RjIwXHU2NEFEXHU5NEZFIHJlYXNvblx1RkYwOVx1N0VEOFx1NTIzNlx1OEZERVx1N0VCRlx1MzAwMlxuICogXHU1MTY4XHU1QkJEXHU3NTNCXHU1RTAzXHVGRjA4dmlld0JveCAxMDAwXHVGRjA5XHVGRjBDXHU4MjgyXHU3MEI5XHU1RTI2XHU3NkVFXHU1RjU1XHU2M0QwXHU3OTNBXHVGRjBDXHU2REYxXHU1RUE2XHU4RDhBXHU2REYxXHU5ODlDXHU4MjcyXHU4RDhBXHU2RDQ1XHUzMDAyXG4gKi9cbmZ1bmN0aW9uIEltcGFjdEdyYXBoKHByb3BzOiB7IGRhdGE6IEltcGFjdFNjb3BlUGF5bG9hZDsgdDogKGtleTogc3RyaW5nKSA9PiBzdHJpbmcgfSkge1xuICBjb25zdCB7IGRhdGEgfSA9IHByb3BzXG4gIGNvbnN0IGluZGlyZWN0ID0gZGF0YS5sZXZlbHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmxldmVsID09PSAnaW5kaXJlY3QnKVxuICBjb25zdCBwb3RlbnRpYWwgPSBkYXRhLmxldmVscy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwgPT09ICdwb3RlbnRpYWwnKVxuICBjb25zdCBjb2wwID0gZGF0YS5jaGFuZ2VkRmlsZXMuc2xpY2UoMCwgNylcbiAgY29uc3QgY29sMSA9IEFycmF5LmZyb20obmV3IFNldChpbmRpcmVjdC5tYXAoKGl0ZW0pID0+IGl0ZW0ucGF0aCkpKS5zbGljZSgwLCA5KVxuICBjb25zdCBjb2wyID0gQXJyYXkuZnJvbShuZXcgU2V0KHBvdGVudGlhbC5tYXAoKGl0ZW0pID0+IGl0ZW0ucGF0aCkpKS5maWx0ZXIoKHApID0+ICFjb2wxLmluY2x1ZGVzKHApKS5zbGljZSgwLCA4KVxuICBjb25zdCBub2RlSCA9IDMwXG4gIGNvbnN0IGdhcCA9IDEwXG4gIGNvbnN0IGNvbFggPSBbMzAsIDM4MCwgNzIwXVxuICBjb25zdCBjb2xXID0gMjgwXG4gIGNvbnN0IHJvd3MgPSBNYXRoLm1heChjb2wwLmxlbmd0aCwgY29sMS5sZW5ndGgsIGNvbDIubGVuZ3RoLCAxKVxuICBjb25zdCBoZWlnaHQgPSByb3dzICogKG5vZGVIICsgZ2FwKSArIDYwXG5cbiAgY29uc3QgZGVwdGhPZiA9IChwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSBpbmRpcmVjdC5maW5kKChlbnRyeSkgPT4gZW50cnkucGF0aCA9PT0gcGF0aCkgPz8gcG90ZW50aWFsLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5wYXRoID09PSBwYXRoKVxuICAgIHJldHVybiBpdGVtPy5kZXB0aCA/PyAwXG4gIH1cblxuICBjb25zdCByZW5kZXJDb2wgPSAoY29sOiBudW1iZXIsIGl0ZW1zOiBzdHJpbmdbXSwgY29sb3I6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdID0+IGl0ZW1zLm1hcCgocGF0aCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCB5ID0gNDQgKyBpbmRleCAqIChub2RlSCArIGdhcClcbiAgICBjb25zdCBkaXIgPSBwYXRoLmluY2x1ZGVzKCcvJykgPyBwYXRoLnNsaWNlKDAsIHBhdGgubGFzdEluZGV4T2YoJy8nKSkgOiAnJ1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdnJywgeyBrZXk6IGAke2NvbH0tJHtwYXRofWAgfSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3JlY3QnLCB7IHg6IGNvbFhbY29sXSwgeSwgd2lkdGg6IGNvbFcsIGhlaWdodDogbm9kZUgsIHJ4OiA2LCBmaWxsOiBjb2xvciwgc3Ryb2tlOiAncmdiYSgwLDAsMCwwLjMpJywgc3Ryb2tlV2lkdGg6IDEgfSksXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyB4OiBjb2xYW2NvbF0gKyAxMCwgeTogeSArIDE0LCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgZmlsbDogJyNmZmZmZmYnIH0sXG4gICAgICAgIChwYXRoLnNwbGl0KCcvJykucG9wKCkgPz8gcGF0aCkuc2xpY2UoMCwgMzApKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3RleHQnLCB7IHg6IGNvbFhbY29sXSArIDEwLCB5OiB5ICsgMjYsIGZvbnRTaXplOiAxMCwgZmlsbDogJ3JnYmEoMjU1LDI1NSwyNTUsMC45MiknIH0sXG4gICAgICAgIGRpci5zbGljZSgwLCA0MCkpLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGl0bGUnLCBudWxsLCBwYXRoKSxcbiAgICApXG4gIH0pXG5cbiAgY29uc3QgY2hhaW5TdGFydCA9IChyZWFzb246IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgbWF0Y2ggPSByZWFzb24ubWF0Y2goL3BhdGg6ICguKykkLylcbiAgICBpZiAobWF0Y2ggPT09IG51bGwpIHJldHVybiBkYXRhLmNoYW5nZWRGaWxlc1swXSA/PyAnJ1xuICAgIHJldHVybiBtYXRjaFsxXSEuc3BsaXQoJyAtPiAnKVswXSA/PyBkYXRhLmNoYW5nZWRGaWxlc1swXSA/PyAnJ1xuICB9XG4gIGNvbnN0IGluZGV4SW4gPSAoaXRlbXM6IHN0cmluZ1tdLCBwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4gaXRlbXMuaW5kZXhPZihwYXRoKVxuICBjb25zdCBjb2xPZiA9IChwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGlmIChjb2wwLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMFxuICAgIGlmIChjb2wxLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMVxuICAgIGlmIChjb2wyLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMlxuICAgIHJldHVybiAtMVxuICB9XG5cbiAgY29uc3QgZWRnZXM6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cbiAgY29uc3QgcHVzaEVkZ2UgPSAoZnJvbVBhdGg6IHN0cmluZywgdG9QYXRoOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcsIGtleTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZnJvbUNvbCA9IGNvbE9mKGZyb21QYXRoKVxuICAgIGNvbnN0IHRvQ29sID0gY29sT2YodG9QYXRoKVxuICAgIGlmIChmcm9tQ29sID09PSAtMSB8fCB0b0NvbCA9PT0gLTEgfHwgdG9Db2wgPD0gZnJvbUNvbCkgcmV0dXJuXG4gICAgY29uc3QgeDEgPSBjb2xYW2Zyb21Db2xdICsgY29sV1xuICAgIGNvbnN0IHkxID0gNDQgKyBpbmRleEluKFtjb2wwLCBjb2wxLCBjb2wyXVtmcm9tQ29sXSA/PyBbXSwgZnJvbVBhdGgpICogKG5vZGVIICsgZ2FwKSArIG5vZGVIIC8gMlxuICAgIGNvbnN0IHgyID0gY29sWFt0b0NvbF1cbiAgICBjb25zdCB5MiA9IDQ0ICsgaW5kZXhJbihbY29sMCwgY29sMSwgY29sMl1bdG9Db2xdID8/IFtdLCB0b1BhdGgpICogKG5vZGVIICsgZ2FwKSArIG5vZGVIIC8gMlxuICAgIGVkZ2VzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudCgncGF0aCcsIHtcbiAgICAgIGtleSwgZDogYE0gJHt4MX0gJHt5MX0gQyAke3gxICsgMzB9ICR7eTF9LCAke3gyIC0gMzB9ICR7eTJ9LCAke3gyfSAke3kyfWAsXG4gICAgICBmaWxsOiAnbm9uZScsIHN0cm9rZTogY29sb3IsIHN0cm9rZVdpZHRoOiAxLjYsIG9wYWNpdHk6IDAuNixcbiAgICB9KSlcbiAgfVxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaW5kaXJlY3Quc2xpY2UoMCwgMjApKSBwdXNoRWRnZShjaGFpblN0YXJ0KGl0ZW0ucmVhc29uKSwgaXRlbS5wYXRoLCB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpLCBgZWktJHtpdGVtLnBhdGh9YClcbiAgZm9yIChjb25zdCBpdGVtIG9mIHBvdGVudGlhbC5zbGljZSgwLCAxNikpIHB1c2hFZGdlKGNoYWluU3RhcnQoaXRlbS5yZWFzb24pLCBpdGVtLnBhdGgsIHRoZW1lQXdhcmVUZXh0KCcjNTc2MDZhJyksIGBlcC0ke2l0ZW0ucGF0aH1gKVxuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3N2ZycsIHsgd2lkdGg6ICcxMDAlJywgdmlld0JveDogYDAgMCAxMDI0ICR7aGVpZ2h0fWAsIHN0eWxlOiB7IG1heEhlaWdodDogNDgwIH0gfSxcbiAgICAgIFtbJ1x1NTNEOFx1NjZGNFx1NjU4N1x1NEVGNicsIDBdLCBbJ1x1OTVGNFx1NjNBNVx1NUY3MVx1NTRDRFx1RkYwOFx1OEMwMVx1NUYxNVx1NzUyOFx1NEU4Nlx1NUI4M1x1RkYwOScsIDFdLCBbJ1x1NkY1Q1x1NTcyOFx1NUY3MVx1NTRDRFx1RkYwOFx1NEU4Q1x1N0VBN1x1NEYyMFx1NjRBRFx1RkYwOScsIDJdXS5tYXAoKFtuYW1lLCBjb2xdKSA9PlxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyBrZXk6IFN0cmluZyhjb2wpLCB4OiBjb2xYW2NvbCBhcyBudW1iZXJdLCB5OiAyNCwgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA3MDAsIGZpbGw6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknIH0sIG5hbWUgYXMgc3RyaW5nKSksXG4gICAgICByZW5kZXJDb2woMCwgY29sMCwgJyMyNTYzZWInKSxcbiAgICAgIHJlbmRlckNvbCgxLCBjb2wxLCAnI2Q5NzcwNicpLFxuICAgICAgcmVuZGVyQ29sKDIsIGNvbDIsICcjNTc2MDZhJyksXG4gICAgICBlZGdlcyxcbiAgICApLFxuICApXG59XG5cbmNvbnN0IERJRkZfS0VZV09SRFMgPSAvXFxiKHB1YmxpY3xwcml2YXRlfHByb3RlY3RlZHxpbnRlcm5hbHxzdGF0aWN8dm9pZHxjbGFzc3xzdHJ1Y3R8aW50ZXJmYWNlfGVudW18bmV3fHJldHVybnxpZnxlbHNlfGZvcnxmb3JlYWNofHdoaWxlfHN3aXRjaHxjYXNlfGJyZWFrfGNvbnRpbnVlfHRyeXxjYXRjaHxmaW5hbGx5fHRocm93fHVzaW5nfG5hbWVzcGFjZXxpbXBvcnR8ZXhwb3J0fGZyb218Y29uc3R8bGV0fHZhcnxhc3luY3xhd2FpdHxmdW5jdGlvbnx0aGlzfGJhc2V8c3VwZXJ8bnVsbHx0cnVlfGZhbHNlfG92ZXJyaWRlfHZpcnR1YWx8YWJzdHJhY3R8c2VhbGVkfHJlYWRvbmx5fHBhcmFtc3xvdXR8cmVmfHlpZWxkfHR5cGVvZnxpbnN0YW5jZW9mfGlufG9mfGRlZmF1bHR8c3RyaW5nfGludHxsb25nfGRvdWJsZXxmbG9hdHxib29sfGNoYXJ8ZGVjaW1hbHxvYmplY3R8cmVjb3JkfHBhcnRpYWx8Z2V0fHNldHxyZXF1aXJlfG1vZHVsZXx0eXBlfGltcGxlbWVudHN8ZXh0ZW5kcylcXGIvZ1xuXG4vKiogXHU1MzU1XHU4ODRDXHU0RUUzXHU3ODAxXHU5QUQ4XHU0RUFFXHVGRjFBXHU2Q0U4XHU5MUNBID4gXHU1QjU3XHU3QjI2XHU0RTMyID4gXHU1MTczXHU5NTJFXHU1QjU3L1x1NjU3MFx1NUI1NyBcdTRFMDlcdTVDNDJcdTc3NDBcdTgyNzJcdUZGMDhcdThGN0JcdTkxQ0ZcdTZCNjNcdTUyMTlcdUZGMENcdTU5MUZcdTY4MzhcdTY3RTVcdTc1MjhcdUZGMDlcdTMwMDIgKi9cbmZ1bmN0aW9uIGhpZ2hsaWdodENvZGVMaW5lKGxpbmU6IHN0cmluZywga2V5UHJlZml4OiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XG4gIGNvbnN0IHRyaW1tZWQgPSBsaW5lLnRyaW1TdGFydCgpXG4gIGlmICh0cmltbWVkLnN0YXJ0c1dpdGgoJy8vJykgfHwgdHJpbW1lZC5zdGFydHNXaXRoKCcvLy8nKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJyonKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJy8qJykgfHwgdHJpbW1lZC5zdGFydHNXaXRoKCcjJykpIHtcbiAgICByZXR1cm4gW1JlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1jYCwgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjNmE5OTU1JykgfSB9LCBsaW5lKV1cbiAgfVxuICBjb25zdCBwYXJ0cyA9IGxpbmUuc3BsaXQoLyhcIig/OlteXCJcXFxcXXxcXFxcLikqXCJ8Jyg/OlteJ1xcXFxdfFxcXFwuKSonfGAoPzpbXmBcXFxcXXxcXFxcLikqYCkvZylcbiAgcmV0dXJuIHBhcnRzLm1hcCgocGFydCwgaSkgPT4ge1xuICAgIGlmIChpICUgMiA9PT0gMSkgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1zJHtpfWAsIHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NlOTE3OCcpIH0gfSwgcGFydClcbiAgICBjb25zdCBzdWI6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cbiAgICBsZXQgbGFzdCA9IDBcbiAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIHBhcnQubWF0Y2hBbGwoRElGRl9LRVlXT1JEUykpIHtcbiAgICAgIGlmIChtYXRjaC5pbmRleCEgPiBsYXN0KSBzdWIucHVzaChwYXJ0LnNsaWNlKGxhc3QsIG1hdGNoLmluZGV4KSlcbiAgICAgIHN1Yi5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1rJHtpfS0ke21hdGNoLmluZGV4fWAsIHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzU2OWNkNicpIH0gfSwgbWF0Y2hbMF0pKVxuICAgICAgbGFzdCA9IG1hdGNoLmluZGV4ISArIG1hdGNoWzBdLmxlbmd0aFxuICAgIH1cbiAgICBpZiAobGFzdCA8IHBhcnQubGVuZ3RoKSBzdWIucHVzaChwYXJ0LnNsaWNlKGxhc3QpKVxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCB7IGtleTogYCR7a2V5UHJlZml4fS1wJHtpfWAgfSwgc3ViKVxuICB9KVxufVxuXG4vKiogXHU5QUQ4XHU0RUFFXHU1REVFXHU1RjAyXHU4OUM2XHU1NkZFXHVGRjFBXHU4OUUzXHU2NzkwIHVuaWZpZWQgZGlmZlx1RkYwQ1x1NjMwOSBcdTU4OUUvXHU1MjIwL1x1NTc1N1x1NTkzNC9cdTRFMEFcdTRFMEJcdTY1ODcgXHU3NzQwXHU4MjcyXHUzMDAyICovXG5mdW5jdGlvbiBEaWZmVmlldyhwcm9wczogeyBwYXRjaDogc3RyaW5nIH0pIHtcbiAgY29uc3QgbGluZXMgPSBwcm9wcy5wYXRjaC5zcGxpdCgnXFxuJykuZmlsdGVyKChsaW5lLCBpKSA9PiAhKGxpbmUgPT09ICcnICYmIGkgPT09IHByb3BzLnBhdGNoLnNwbGl0KCdcXG4nKS5sZW5ndGggLSAxKSlcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICBzdHlsZToge1xuICAgICAgZm9udEZhbWlseTogJ0NvbnNvbGFzLCBtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCBsaW5lSGVpZ2h0OiAxLjU1LFxuICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDAnLCBtYXhIZWlnaHQ6IDQyMCwgb3ZlcmZsb3dZOiAnYXV0bycsIG1hcmdpblRvcDogJzZweCcsXG4gICAgfSxcbiAgfSwgbGluZXMubWFwKChsaW5lLCBpKSA9PiB7XG4gICAgY29uc3Qga2luZCA9IGxpbmUuc3RhcnRzV2l0aCgnKysrJykgfHwgbGluZS5zdGFydHNXaXRoKCctLS0nKSA/ICdtZXRhJ1xuICAgICAgOiBsaW5lLnN0YXJ0c1dpdGgoJ0BAJykgPyAnaHVuaydcbiAgICAgICAgOiBsaW5lLnN0YXJ0c1dpdGgoJysnKSA/ICdhZGQnXG4gICAgICAgICAgOiBsaW5lLnN0YXJ0c1dpdGgoJy0nKSA/ICdkZWwnIDogJ2N0eCdcbiAgICBjb25zdCBiZyA9IGtpbmQgPT09ICdhZGQnID8gJ3JnYmEoNDYsMTYwLDY3LDAuMTQpJyA6IGtpbmQgPT09ICdkZWwnID8gJ3JnYmEoMjQ4LDgxLDczLDAuMTMpJyA6IGtpbmQgPT09ICdodW5rJyA/ICdyZ2JhKDU2LDEzOSwyNTMsMC4xKScgOiAndHJhbnNwYXJlbnQnXG4gICAgY29uc3QgY29udGVudCA9IGtpbmQgPT09ICdtZXRhJyB8fCBraW5kID09PSAnaHVuaydcbiAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjMDk2OWRhJyksIGZvbnRXZWlnaHQ6IDYwMCB9IH0sIGxpbmUpXG4gICAgICA6IGtpbmQgPT09ICdhZGQnIHx8IGtpbmQgPT09ICdkZWwnXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KGtpbmQgPT09ICdhZGQnID8gJyMxYTdmMzcnIDogJyNjZjIyMmUnKSwgZm9udFdlaWdodDogNjAwIH0gfSwgbGluZVswXSlcbiAgICAgICAgOiBudWxsXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsga2V5OiBpLCBzdHlsZTogeyBwYWRkaW5nOiAnMCAxMHB4JywgYmFja2dyb3VuZDogYmcsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfSB9LFxuICAgICAgY29udGVudCxcbiAgICAgIGtpbmQgPT09ICdhZGQnIHx8IGtpbmQgPT09ICdkZWwnID8gaGlnaGxpZ2h0Q29kZUxpbmUobGluZS5zbGljZSgxKSwgYGwke2l9YCkgOiBoaWdobGlnaHRDb2RlTGluZShsaW5lLCBgbCR7aX1gKSxcbiAgICApXG4gIH0pKVxufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiAnXHUyMDE0J1xuICByZXR1cm4gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlU3RyaW5nKClcbn1cblxuLyoqIFx1NEU4Q1x1NkIyMVx1Nzg2RVx1OEJBNFx1NUYzOVx1N0E5N1x1RkYxQVx1OTA2RVx1N0Y2OSArIFx1NUM0NVx1NEUyRFx1NTM2MVx1NzI0N1x1RkYwQ1x1NTM3MVx1OTY2OVx1NjRDRFx1NEY1Q1x1RkYwOFx1NTIyMFx1OTY2NFx1N0IxNFx1OEJCMC9cdTUzRDhcdTY2RjQvXHU3RUE2XHU2NzVGXHVGRjA5XHU1MTcxXHU3NTI4XHVGRjFCYWx0IFx1NjNEMFx1NEY5Qlx1N0IyQ1x1NEU4Q1x1Nzg2RVx1OEJBNFx1NTJBOFx1NEY1Q1x1RkYwOFx1NTk4MlwiXHU1MTQ4XHU1MUZBXHU2NUI5XHU2ODQ4XCJcdUZGMDlcdTMwMDIgKi9cbmZ1bmN0aW9uIENvbmZpcm1EaWFsb2cocHJvcHM6IHsgdGl0bGU6IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nOyBkYW5nZXI/OiBib29sZWFuOyBjb25maXJtTGFiZWw/OiBzdHJpbmc7IGFsdD86IHsgbGFiZWw6IHN0cmluZzsgb25BbHQ6ICgpID0+IHZvaWQgfTsgb25DYW5jZWw6ICgpID0+IHZvaWQ7IG9uQ29uZmlybTogKCkgPT4gdm9pZCB9KSB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLW92ZXJsYXknLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCB6SW5kZXg6IDk5OSxcbiAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMTUsMjMsNDIsMC40NSknLCBiYWNrZHJvcEZpbHRlcjogJ2JsdXIoMnB4KScsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgYW5pbWF0aW9uOiAncGNGYWRlSW4gMC4xNXMgZWFzZS1vdXQnLFxuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ2FuY2VsLFxuICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLWNhcmQnLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHdpZHRoOiA0MDAsIG1heFdpZHRoOiAnY2FsYygxMDB2dyAtIDQ4cHgpJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JywgYm94U2hhZG93OiAnMCAyMHB4IDUwcHggcmdiYSgwLDAsMCwwLjI1KScsXG4gICAgICAgICAgcGFkZGluZzogJzIwcHggMjJweCAxNnB4JyxcbiAgICAgICAgICBvbkNsaWNrOiAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCBnYXA6ICcxMHB4JyB9IH0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgd2lkdGg6IDM0LCBoZWlnaHQ6IDM0LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBmbGV4U2hyaW5rOiAwLFxuICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnMTdweCcsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHByb3BzLmRhbmdlciA/ICdyZ2JhKDI0NCw2Myw5NCwwLjEyKScgOiAncmdiYSgzNyw5OSwyMzUsMC4xKScsXG4gICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5kYW5nZXIgPyB0aGVtZUF3YXJlVGV4dCgnI2UxMWQ0OCcpIDogdGhlbWVBd2FyZVRleHQoJyMyNTYzZWInKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSwgcHJvcHMuZGFuZ2VyID8gJyEnIDogJz8nKSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzZweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9IH0sIHByb3BzLnRpdGxlKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS43LCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9IH0sIHByb3BzLm1lc3NhZ2UpLFxuICAgICAgICAgICksXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJywgZ2FwOiAnMTBweCcsIG1hcmdpblRvcDogJzE4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH0gfSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XG4gICAgICAgICAgICBzdHlsZTogeyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnN3B4IDE4cHgnLCBib3JkZXJSYWRpdXM6ICc4cHgnIH0sXG4gICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5vbkNhbmNlbCxcbiAgICAgICAgICB9LCAnXHU1M0Q2XHU2RDg4JyksXG4gICAgICAgICAgcHJvcHMuYWx0ICE9PSB1bmRlZmluZWQgJiYgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xuICAgICAgICAgICAgc3R5bGU6IHsgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzdweCAxOHB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgZm9udFdlaWdodDogNjAwIH0sXG4gICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5hbHQub25BbHQsXG4gICAgICAgICAgfSwgcHJvcHMuYWx0LmxhYmVsKSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XG4gICAgICAgICAgICAnZGF0YS10ZXN0aWQnOiAncGMtY29uZmlybS1vaycsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICBwYWRkaW5nOiAnN3B4IDE4cHgnLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDUwMCxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogcHJvcHMuZGFuZ2VyID8gJyNlMTFkNDgnIDogJ3ZhcigtLWRzdy1hbGlhcy1idXR0b24taW5mby1maWxsLCAjMjU2M2ViKScsIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25DbGljazogcHJvcHMub25Db25maXJtLFxuICAgICAgICAgIH0sIHByb3BzLmNvbmZpcm1MYWJlbCA/PyAnXHU3ODZFXHU4QkE0XHU1MjIwXHU5NjY0JyksXG4gICAgICAgICksXG4gICAgICApLFxuICAgICksXG4gIClcbn1cblxuLyoqIFx1OUFBOFx1NjdCNlx1NUMwRlx1NTM2MVx1NzI0N1x1MzAwMiAqL1xuZnVuY3Rpb24gQ2FyZChwcm9wczogeyB0aXRsZT86IFJlYWN0LlJlYWN0Tm9kZTsgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLmNhcmQgfSxcbiAgICBwcm9wcy50aXRsZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5zZWN0aW9uVGl0bGUgfSwgcHJvcHMudGl0bGUpLFxuICAgIHByb3BzLmNoaWxkcmVuKVxufVxuXG4vKipcbiAqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NEUzQlx1N0VDNFx1NEVGNlx1RkYxQVx1NTZEQlx1OTg3NVx1N0I3RVx1RkYwOFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1NEUzQVx1OUVEOFx1OEJBNFx1RkYwOSsgXHU4RjZFXHU4QkUyXHU1QkJGXHU0RTNCIEFQSSArIFx1NjMwOVx1OTRBRVx1NTMxNlx1NjRDRFx1NEY1Q1x1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gV29ya3NwYWNlRnJhbWUocHJvcHM6IFdvcmtzcGFjZUZyYW1lUHJvcHMpIHtcbiAgY29uc3QgdCA9IHByb3BzLnQgPz8gZmFsbGJhY2tUXG4gIGNvbnN0IGFjdGl2ZVJlZiA9IHVzZVJlZih0cnVlKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFjdGl2ZVJlZi5jdXJyZW50ID0gdHJ1ZVxuICAgIHJldHVybiAoKSA9PiB7IGFjdGl2ZVJlZi5jdXJyZW50ID0gZmFsc2UgfVxuICB9LCBbXSlcbiAgY29uc3QgW3RhYiwgc2V0VGFiXSA9IHVzZVN0YXRlPFRhYktleT4oJ2NvbW1pdHMnKVxuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlPFdvcmtzcGFjZVN0YXRlIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2xvYWRFcnJvciwgc2V0TG9hZEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtib290c3RyYXBwaW5nLCBzZXRCb290c3RyYXBwaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbYWN0aW9uUmVzdWx0LCBzZXRBY3Rpb25SZXN1bHRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2NoYW5nZVRpdGxlLCBzZXRDaGFuZ2VUaXRsZV0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2NoYW5nZURlc2MsIHNldENoYW5nZURlc2NdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFttZW1vcnlUaXRsZSwgc2V0TWVtb3J5VGl0bGVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFttZW1vcnlDb250ZW50LCBzZXRNZW1vcnlDb250ZW50XSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbY29uZmlybWVkVGV4dCwgc2V0Q29uZmlybWVkVGV4dF0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2NvbmZpcm1lZFBhdGhzLCBzZXRDb25maXJtZWRQYXRoc10gPSB1c2VTdGF0ZSgnJylcblxuICAvLyBcdTI1MDBcdTI1MDAgXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XHU3MkI2XHU2MDAxIFx1MjUwMFx1MjUwMFxuICBjb25zdCBbY29tbWl0c0RhdGEsIHNldENvbW1pdHNEYXRhXSA9IHVzZVN0YXRlPENvbW1pdHNQYXlsb2FkIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2NvbW1pdHNFcnJvciwgc2V0Q29tbWl0c0Vycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtwaWNrZXJPcGVuLCBzZXRQaWNrZXJPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbcGlja2VyRmlsdGVyLCBzZXRQaWNrZXJGaWx0ZXJdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtzZWxlY3RlZFRhcmdldHMsIHNldFNlbGVjdGVkVGFyZ2V0c10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pXG4gIGNvbnN0IFtkZXRhaWxzLCBzZXREZXRhaWxzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIENvbW1pdERldGFpbFBheWxvYWQ+Pih7fSlcbiAgLyoqIFx1ODlFM1x1OEJGQlx1NEVGQlx1NTJBMVx1NzJCNlx1NjAwMVx1RkYxQXF1ZXVlZD1cdTYzOTJcdTk2MUZcdTdCNDlcdTRFMzJcdTg4NENcdTk2MUZcdTUyMTdcdUZGMENydW5uaW5nPVx1NkI2M1x1NTcyOFx1OEJGN1x1NkM0Mlx1RkYwOFx1NTkxQVx1OTAwOS9cdTY1NzRcdThGNkVcdTY1RjZcdTgxRUFcdTUyQThcdTkwMTBcdTRFMkFcdTUyMDZcdTY3OTBcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgW2RldGFpbFN0YXR1cywgc2V0RGV0YWlsU3RhdHVzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsICdxdWV1ZWQnIHwgJ3J1bm5pbmcnPj4oe30pXG4gIGNvbnN0IGRldGFpbFF1ZXVlZENvdW50ID0gT2JqZWN0LnZhbHVlcyhkZXRhaWxTdGF0dXMpLmZpbHRlcigoc3RhdHVzKSA9PiBzdGF0dXMgPT09ICdxdWV1ZWQnKS5sZW5ndGhcbiAgY29uc3QgZGV0YWlsUnVubmluZ0NvdW50ID0gT2JqZWN0LnZhbHVlcyhkZXRhaWxTdGF0dXMpLmZpbHRlcigoc3RhdHVzKSA9PiBzdGF0dXMgPT09ICdydW5uaW5nJykubGVuZ3RoXG4gIGNvbnN0IFtpbXBhY3QsIHNldEltcGFjdF0gPSB1c2VTdGF0ZTxJbXBhY3RTY29wZVBheWxvYWQgfCBudWxsPihudWxsKVxuICBjb25zdCBbaW1wYWN0TG9hZGluZywgc2V0SW1wYWN0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW3Jldmlld3MsIHNldFJldmlld3NdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgUmV2aWV3UGF5bG9hZD4+KHt9KVxuICBjb25zdCBbcmV2aWV3TG9hZGluZywgc2V0UmV2aWV3TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2ZpbGVEaWZmcywgc2V0RmlsZURpZmZzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KHt9KVxuICBjb25zdCBbY29uZmlybURpYWxvZywgc2V0Q29uZmlybURpYWxvZ10gPSB1c2VTdGF0ZTx7IHRpdGxlOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZzsgZGFuZ2VyPzogYm9vbGVhbjsgb25Db25maXJtOiAoKSA9PiB2b2lkIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBbbm90ZXMsIHNldE5vdGVzXSA9IHVzZVN0YXRlPE5vdGVFbnRyeVtdPihbXSlcbiAgY29uc3QgW25vdGVUaXRsZSwgc2V0Tm90ZVRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbm90ZUNvbnRlbnQsIHNldE5vdGVDb250ZW50XSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbm90ZVRhZ3MsIHNldE5vdGVUYWdzXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbZWRpdGluZ05vdGUsIHNldEVkaXRpbmdOb3RlXSA9IHVzZVN0YXRlPHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29udGVudDogc3RyaW5nOyB0YWdzOiBzdHJpbmcgfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtub3RlU2VhcmNoLCBzZXROb3RlU2VhcmNoXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbm90ZUV4cGFuZGVkLCBzZXROb3RlRXhwYW5kZWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KVxuICBjb25zdCBbaXNzdWVzRGF0YSwgc2V0SXNzdWVzRGF0YV0gPSB1c2VTdGF0ZTxJc3N1ZUVudHJ5W10gfCBudWxsPihudWxsKVxuICBjb25zdCBbaXNzdWVTZXZlcml0eUZpbHRlciwgc2V0SXNzdWVTZXZlcml0eUZpbHRlcl0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2lzc3VlU3RhdHVzRmlsdGVyLCBzZXRJc3N1ZVN0YXR1c0ZpbHRlcl0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2lzc3VlRXhwYW5kZWQsIHNldElzc3VlRXhwYW5kZWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KVxuICBjb25zdCBbZml4RXhwYW5kZWQsIHNldEZpeEV4cGFuZGVkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+Pih7fSlcbiAgY29uc3QgW3ZlcmlmeWluZ1RhcmdldCwgc2V0VmVyaWZ5aW5nVGFyZ2V0XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtpc3N1ZUNoZWNrZWQsIHNldElzc3VlQ2hlY2tlZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oe30pXG4gIGNvbnN0IFtiYXRjaFZlcmlmeVN0YXRlLCBzZXRCYXRjaFZlcmlmeVN0YXRlXSA9IHVzZVN0YXRlPHsgZG9uZTogbnVtYmVyOyB0b3RhbDogbnVtYmVyIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBiYXRjaFN0b3BSZWYgPSB1c2VSZWYoZmFsc2UpXG4gIGNvbnN0IFthaVN1bW1hcml6aW5nLCBzZXRBaVN1bW1hcml6aW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbbmFycmF0aXZlLCBzZXROYXJyYXRpdmVdID0gdXNlU3RhdGU8eyBuYXJyYXRpdmU6IHN0cmluZzsgY2FjaGVkOiBib29sZWFuOyBnZW5lcmF0ZWRBdD86IG51bWJlcjsgY29zdFVzZD86IG51bWJlciB9IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW25hcnJhdGl2ZUJ1c3ksIHNldE5hcnJhdGl2ZUJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtwZWVrLCBzZXRQZWVrXSA9IHVzZVN0YXRlPHsgcGF0aDogc3RyaW5nOyBsaW5lOiBudW1iZXIgfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtwZWVrRGF0YSwgc2V0UGVla0RhdGFdID0gdXNlU3RhdGU8UGVla1BheWxvYWQgfCBudWxsPihudWxsKVxuICBjb25zdCBbcGVla0J1c3ksIHNldFBlZWtCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbbmFycmF0aXZlRXJyb3IsIHNldE5hcnJhdGl2ZUVycm9yXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbW9kZWxUaWVycywgc2V0TW9kZWxUaWVyc10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCB7IHByb3ZpZGVyOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmcgfT4gfCBudWxsPihudWxsKVxuICBjb25zdCBbbW9kZWxPcHRpb25zLCBzZXRNb2RlbE9wdGlvbnNdID0gdXNlU3RhdGU8QXJyYXk8eyBwcm92aWRlcjogc3RyaW5nOyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfT4+KFtdKVxuICBjb25zdCBbbW9kZWxTYXZpbmcsIHNldE1vZGVsU2F2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbbW9kZWxTYXZlZCwgc2V0TW9kZWxTYXZlZF0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDM1x1RkYxQVx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNCAvIFJ1biBcdThCRTZcdTYwQzUgLyBcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTEgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IFtwbGFuQ29uZmlybSwgc2V0UGxhbkNvbmZpcm1dID0gdXNlU3RhdGU8eyBjaGFuZ2VJZDogc3RyaW5nOyBzdGVwczogUGxhbkNvbmZpcm1TdGVwW10gfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtwbGFuQnVzeSwgc2V0UGxhbkJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtydW5EZXRhaWwsIHNldFJ1bkRldGFpbF0gPSB1c2VTdGF0ZTxSdW5EZXRhaWwgfCBudWxsPihudWxsKVxuICBjb25zdCBbc2NoZWR1bGVkRGF0YSwgc2V0U2NoZWR1bGVkRGF0YV0gPSB1c2VTdGF0ZTxTY2hlZHVsZWRUYXNrRW50cnlbXSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtzY2hlZE5hbWUsIHNldFNjaGVkTmFtZV0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW3NjaGVkT3Blbiwgc2V0U2NoZWRPcGVuXSA9IHVzZVN0YXRlKHRydWUpXG4gIGNvbnN0IFtzY2hlZFR5cGUsIHNldFNjaGVkVHlwZV0gPSB1c2VTdGF0ZSgncmV2aWV3JylcbiAgY29uc3QgW3NjaGVkVGl0bGUsIHNldFNjaGVkVGl0bGVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtzY2hlZERlc2MsIHNldFNjaGVkRGVzY10gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW3NjaGVkSW50ZXJ2YWwsIHNldFNjaGVkSW50ZXJ2YWxdID0gdXNlU3RhdGUoJzE0NDAnKVxuICAvLyBcdTI1MDBcdTI1MDAgXHU4QkIwXHU1RkM2XHU5NzYyXHU2NzdGXHVGRjFBXHU1MTY4XHU5MUNGXHU2NTcwXHU2MzZFIC8gXHU1NDBDXHU2QjY1XHU2MkE1XHU1NDRBIFx1MjUwMFx1MjUwMFxuICBjb25zdCBbbWVtb3JpZXNEYXRhLCBzZXRNZW1vcmllc0RhdGFdID0gdXNlU3RhdGU8TWVtb3JpZXNQYXlsb2FkIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3N5bmNSZXBvcnQsIHNldFN5bmNSZXBvcnRdID0gdXNlU3RhdGU8U3luY1JlcG9ydCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFttZW1vcnlTY29wZSwgc2V0TWVtb3J5U2NvcGVdID0gdXNlU3RhdGU8J3Byb2plY3QnIHwgJ2JyYW5jaCc+KCdwcm9qZWN0JylcbiAgY29uc3QgW21lbW9yeVR5cGUsIHNldE1lbW9yeVR5cGVdID0gdXNlU3RhdGUoJ2FyY2hpdGVjdHVyZV9kZWNpc2lvbicpXG4gIGNvbnN0IFttZW1vcnlTeW5jaW5nLCBzZXRNZW1vcnlTeW5jaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbZXhlY1RpdGxlLCBzZXRFeGVjVGl0bGVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtleGVjTW9kZWwsIHNldEV4ZWNNb2RlbF0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2V4ZWNEZXNjLCBzZXRFeGVjRGVzY10gPSB1c2VTdGF0ZSgnJylcblxuICAvKiogXHU3RURGXHU0RTAwIFBPU1RcdUZGMUFcdTVFMjZcdThEODVcdTY1RjZcdTUxNUNcdTVFOTVcdUZGMDhMTE0gXHU3QUVGXHU3MEI5XHU2NzBEXHU1MkExXHU3QUVGIDEyMHMgXHU0RjFBXHU5NjREXHU3RUE3XHU4RkQ0XHU1NkRFXHVGRjBDXHU1QkEyXHU2MjM3XHU3QUVGIDE4MHMgXHU1M0VBXHU1MTVDXHU1RTk1XHU3NzFGXHU2QjYzXHU3Njg0XHU3RjUxXHU3RURDXHU0RTJEXHU2NUFEXHVGRjA5XHVGRjBDXHU3RUREXHU0RTBEXHU4QkE5XHU4QkY3XHU2QzQyXHU2NUUwXHU5NjUwXHU2MzAyXHU4RDc3XHUzMDAyICovXG4gIGNvbnN0IHBvc3QgPSBhc3luYyAocGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgdGltZW91dE1zID0gMTgwXzAwMCk6IFByb21pc2U8eyBvazogYm9vbGVhbjsgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfT4gPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKClcbiAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCB0aW1lb3V0TXMpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocGF0aCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgLi4uYm9keSwgc2Vzc2lvbklkOiBwcm9wcy5zZXNzaW9uSWQgPz8gJycgfSksXG4gICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICB9KVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgcmV0dXJuIHsgb2s6IHJlc3BvbnNlLm9rLCBkYXRhOiAoZGF0YSA/PyB7fSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgfVxuICB9XG5cbiAgLyoqIHBlZWtcdUZGMUFcdTYyNTNcdTVGMDBcdTY3RDBcdTY1ODdcdTRFRjZcdTY3RDBcdTg4NENcdTk2NDRcdThGRDFcdTc2ODRcdTRFRTNcdTc4MDFcdTRFMEFcdTRFMEJcdTY1ODdcdTZENkVcdTVDNDJcdUZGMDhcdTY3MDlcdTc1NENcdTdCNDlcdTVGODUgMTAgXHU3OUQyXHVGRjA5XHUzMDAyICovXG4gIHBlZWtPcGVuZXIgPSAocGF0aDogc3RyaW5nLCBsaW5lOiBudW1iZXIpOiB2b2lkID0+IHsgdm9pZCBvcGVuUGVlayhwYXRoLCBsaW5lKSB9XG4gIGNvbnN0IG9wZW5QZWVrID0gYXN5bmMgKHBhdGg6IHN0cmluZywgbGluZTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0UGVlayh7IHBhdGgsIGxpbmUgfSlcbiAgICBzZXRQZWVrRGF0YShudWxsKVxuICAgIHNldFBlZWtCdXN5KHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKClcbiAgICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiBjb250cm9sbGVyLmFib3J0KCksIDEwXzAwMClcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3BlZWsnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLCBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBwYXRoLCBsaW5lLCBzZXNzaW9uSWQ6IHByb3BzLnNlc3Npb25JZCA/PyAnJyB9KSxcbiAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgIH0pXG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldFBlZWtEYXRhKGRhdGEgYXMgUGVla1BheWxvYWQpXG4gICAgfSBjYXRjaCB7XG4gICAgICBzZXRQZWVrRGF0YSh7IGV4aXN0czogZmFsc2UgfSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0UGVla0J1c3koZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NURFNVx1NEY1Q1x1OEY2RVx1NkIyMVx1NTNEOVx1NEU4Qlx1RkYxQVx1NTkxQVx1NEUyQVx1OTAwOVx1NEUyRFx1NjNEMFx1NEVBNFx1NEY1Q1x1NEUzQVx1NEUwMFx1NEUyQVx1NjU3NFx1NEY1M1x1ODlFM1x1OEJGQlx1RkYwOFx1N0YxM1x1NUI1OCArIFx1NTNFRlx1NUYzQVx1NTIzNlx1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBsb2FkTmFycmF0aXZlID0gYXN5bmMgKGZvcmNlID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBzaGFzID0gc2VsZWN0ZWRUYXJnZXRzLmZpbHRlcigodGFyZ2V0KSA9PiB0YXJnZXQgIT09ICd3b3JraW5nJylcbiAgICBpZiAoc2hhcy5sZW5ndGggPCAyKSByZXR1cm5cbiAgICBzZXROYXJyYXRpdmVCdXN5KHRydWUpXG4gICAgc2V0TmFycmF0aXZlRXJyb3IoJycpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3dvcmstbmFycmF0aXZlJywgeyBzaGFzLCBmb3JjZSB9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXROYXJyYXRpdmVFcnJvcihTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXROYXJyYXRpdmUoe1xuICAgICAgICBuYXJyYXRpdmU6IFN0cmluZyhkYXRhWyduYXJyYXRpdmUnXSA/PyAnJyksXG4gICAgICAgIGNhY2hlZDogZGF0YVsnY2FjaGVkJ10gPT09IHRydWUsXG4gICAgICAgIGdlbmVyYXRlZEF0OiBkYXRhWydnZW5lcmF0ZWRBdCddID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBOdW1iZXIoZGF0YVsnZ2VuZXJhdGVkQXQnXSksXG4gICAgICAgIGNvc3RVc2Q6IGRhdGFbJ2Nvc3RVc2QnXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogTnVtYmVyKGRhdGFbJ2Nvc3RVc2QnXSksXG4gICAgICB9KVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXROYXJyYXRpdmVFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldE5hcnJhdGl2ZUJ1c3koZmFsc2UpXG4gICAgfVxuICB9XG4gIC8vIFx1N0VDRiByZWYgXHU2NkI0XHU5NzMyXHU2NzAwXHU2NUIwXHU5NUVEXHU1MzA1XHVGRjFBXHU1RTc2XHU1M0QxXHU2QzYwXHU2MzkyXHU3QTdBXHU4OUU2XHU1M0QxXHU4MUVBXHU1MkE4XHU1M0Q5XHU0RThCXHU2NUY2XHU4QkZCXHU1M0Q2XHU3Njg0XHU2NjJGXHU2NzAwXHU2NUIwIHNlbGVjdGVkVGFyZ2V0c1x1MzAwMlxuICB1c2VFZmZlY3QoKCkgPT4geyBsb2FkTmFycmF0aXZlUmVmLmN1cnJlbnQgPSAoKSA9PiB7IHZvaWQgbG9hZE5hcnJhdGl2ZSgpIH0gfSlcblxuICAvKiogXHU2Mjc5XHU5MUNGXHU1MkZFXHU5MDA5XHU2M0QwXHU0RUE0XHVGRjA4XHU2NUIwXHU1ODlFXHU3Njg0XHU5MDEwXHU2NzYxXHU4OUU2XHU1M0QxIEFJIFx1ODlFM1x1OEJGQlx1RkYwQ1x1NURGMlx1NjcwOVx1NzY4NFx1OEQ3MFx1N0YxM1x1NUI1OFx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBzZWxlY3RDb21taXRzID0gKHNoYXM6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gICAgY29uc3QgYWRkZWQgPSBzaGFzLmZpbHRlcigoc2hhKSA9PiAhc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHNoYSkpXG4gICAgc2V0U2VsZWN0ZWRUYXJnZXRzKChwcmV2aW91cykgPT4gQXJyYXkuZnJvbShuZXcgU2V0KFsuLi5wcmV2aW91cywgLi4uc2hhc10pKSlcbiAgICBmb3IgKGNvbnN0IHNoYSBvZiBhZGRlZCkgbG9hZERldGFpbChzaGEsIGZhbHNlKVxuICB9XG5cbiAgLyoqIFx1NEUwMFx1OTUyRVx1NkQ4OFx1NTMxNlx1RkYxQVx1OTAwOVx1NEUyRFx1NTE2OFx1OTBFOFx1NjcyQVx1NkQ4OFx1NTMxNlx1NjNEMFx1NEVBNCBcdTIxOTIgXHU2Mjc5XHU5MUNGXHU4OUUzXHU4QkZCIFx1MjE5MiBcdTYzOTJcdTdBN0FcdTU0MEVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdTY1NzRcdTRGNTNcdTUzRDlcdTRFOEJcdTMwMDIgKi9cbiAgY29uc3QgZGlnZXN0QWxsID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNoYXMgPSAoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLmZpbHRlcigoY29tbWl0KSA9PiBpc1VuZGlnZXN0ZWQoY29tbWl0KSkubWFwKChjb21taXQpID0+IGNvbW1pdC5zaGEpXG4gICAgaWYgKHNoYXMubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICBzZXRJbXBhY3QobnVsbClcbiAgICBzZXRSZXZpZXdzKHt9KVxuICAgIGNvbnN0IG5lZWRzRmV0Y2ggPSBzaGFzLnNvbWUoKHNoYSkgPT4gIXNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhzaGEpKVxuICAgIHNlbGVjdENvbW1pdHMoc2hhcylcbiAgICBpZiAobmVlZHNGZXRjaCkge1xuICAgICAgYXV0b05hcnJhdGl2ZVJlZi5jdXJyZW50ID0gc2hhcy5sZW5ndGggPj0gMlxuICAgIH0gZWxzZSBpZiAoc2hhcy5sZW5ndGggPj0gMikge1xuICAgICAgLy8gXHU1MTY4XHU5MEU4XHU1REYyXHU1NzI4XHU5MDA5XHU0RTJEXHU5NkM2XHU1NDA4XHU0RTE0XHU4OUUzXHU4QkZCXHU5NjFGXHU1MjE3XHU3QTdBXHU5NUYyXHVGRjFBXHU3NkY0XHU2M0E1XHU3NTFGXHU2MjEwXHU1M0Q5XHU0RThCXHVGRjA4XHU3QjQ5XHU0RTAwXHU2MkNEXHU4QkE5IHN0YXRlIFx1ODQzRFx1NTczMFx1RkYwOVx1MzAwMlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IGxvYWROYXJyYXRpdmVSZWYuY3VycmVudCgpIH0sIDApXG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29tbWl0c1JlcXVlc3RSZWYgPSB1c2VSZWYoMClcbiAgY29uc3QgbG9hZENvbW1pdHMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9ICsrY29tbWl0c1JlcXVlc3RSZWYuY3VycmVudFxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvcHJvamVjdC1jb250cm9sL2FwaS9jb21taXRzP3Nlc3Npb25JZD0ke2VuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpfSZsaW1pdD02MGApXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoKGRhdGEgYXMgeyBlcnJvcj86IHN0cmluZyB9KS5lcnJvciA/PyBgSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKVxuICAgICAgaWYgKCFhY3RpdmVSZWYuY3VycmVudCB8fCByZXF1ZXN0ICE9PSBjb21taXRzUmVxdWVzdFJlZi5jdXJyZW50KSByZXR1cm5cbiAgICAgIHNldENvbW1pdHNEYXRhKGRhdGEgYXMgQ29tbWl0c1BheWxvYWQpXG4gICAgICBzZXRDb21taXRzRXJyb3IobnVsbClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgaWYgKCFhY3RpdmVSZWYuY3VycmVudCB8fCByZXF1ZXN0ICE9PSBjb21taXRzUmVxdWVzdFJlZi5jdXJyZW50KSByZXR1cm5cbiAgICAgIHNldENvbW1pdHNEYXRhKG51bGwpXG4gICAgICBzZXRDb21taXRzRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWROb3RlcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXM/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0Tm90ZXMoKGRhdGEgYXMgeyBub3RlczogTm90ZUVudHJ5W10gfSkubm90ZXMgPz8gW10pXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTdCMTRcdThCQjBcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcdUZGMUFcdTUyMTdcdTg4NjhcdTRGRERcdTYzMDFcdTUzOUZcdTY4MzdcdTMwMDJcbiAgICB9XG4gIH1cblxuICAvKiogXHU1MkZFXHU5MDA5L1x1NTNENlx1NkQ4OFx1NEUwMFx1NkIyMVx1NjNEMFx1NEVBNFx1RkYxQVx1OTFDRFx1N0I5N1x1OTAwOVx1NEUyRFx1OTZDNlx1NTQwOFx1RkYwQ1x1NUU3Nlx1NjMwOVx1OTcwMFx1ODg2NVx1OUY1MFx1NkJDRlx1Njc2MVx1NjNEMFx1NEVBNFx1NzY4NCBBSSBcdTg5RTNcdThCRkJcdUZGMDhcdTY3MERcdTUyQTFcdTdBRUZcdTY3MDlcdTdGMTNcdTVCNThcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgdG9nZ2xlVGFyZ2V0ID0gYXN5bmMgKHRhcmdldDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0U2VsZWN0ZWRUYXJnZXRzKChwcmV2aW91cykgPT4ge1xuICAgICAgaWYgKHByZXZpb3VzLmluY2x1ZGVzKHRhcmdldCkpIHJldHVybiBwcmV2aW91cy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IHRhcmdldClcbiAgICAgIHJldHVybiBbLi4ucHJldmlvdXMsIHRhcmdldF1cbiAgICB9KVxuICAgIHNldEltcGFjdChudWxsKVxuICAgIHNldFJldmlld3Moe30pXG4gICAgaWYgKCFzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXModGFyZ2V0KSkge1xuICAgICAgbG9hZERldGFpbCh0YXJnZXQsIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTY1NzRcdThGNkVcdTkwMDlcdTYyRTlcdUZGMUFcdTY1NzRcdThGNkVcdTVERjJcdTkwMDlcdTY1RjZcdTUxOERcdTcwQjkgPSBcdTUzRDZcdTZEODhcdTY1NzRcdThGNkVcdUZGMUJcdTY1QjBcdTUyRkVcdTkwMDlcdTc2ODRcdTYzRDBcdTRFQTRcdTU0MDRcdTgxRUFcdTYyQzlcdTUzRDYgQUkgXHU4OUUzXHU4QkZCXHUzMDAyICovXG4gIGNvbnN0IHNlbGVjdFJvdW5kID0gKHNoYXM6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gICAgc2V0SW1wYWN0KG51bGwpXG4gICAgc2V0UmV2aWV3cyh7fSlcbiAgICBpZiAoc2hhcy5ldmVyeSgoc2hhKSA9PiBzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoc2hhKSkpIHtcbiAgICAgIHNldFNlbGVjdGVkVGFyZ2V0cygocHJldmlvdXMpID0+IHByZXZpb3VzLmZpbHRlcigoc2hhKSA9PiAhc2hhcy5pbmNsdWRlcyhzaGEpKSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBhZGRlZCA9IHNoYXMuZmlsdGVyKChzaGEpID0+ICFzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoc2hhKSlcbiAgICBzZXRTZWxlY3RlZFRhcmdldHMoKHByZXZpb3VzKSA9PiBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLnByZXZpb3VzLCAuLi5zaGFzXSkpKVxuICAgIGZvciAoY29uc3Qgc2hhIG9mIGFkZGVkKSBsb2FkRGV0YWlsKHNoYSwgZmFsc2UpXG4gIH1cblxuICAvKiogXHU4OUUzXHU4QkZCXHU1RTc2XHU1M0QxXHU2QzYwXHVGRjFBXHU2QTIxXHU1NzhCXHU3RjUxXHU1MTczXHU1RTc2XHU1M0QxXHU2NzA5XHU5NjUwXHVGRjBDXHU1OTFBXHU5MDA5L1x1NjU3NFx1OEY2RVx1NjI3OVx1OTFDRlx1NTJGRVx1OTAwOVx1NjVGNlx1NjMwOVx1NEUwQVx1OTY1MFx1NUU3Nlx1NTNEMVx1NTIwNlx1Njc5MFx1RkYwOFx1OUVEOFx1OEJBNFx1NjcwMFx1NTkxQSAzIFx1NEUyQVx1NTQwQ1x1NjVGNlx1RkYwOVx1RkYwQ1x1OEQ4NVx1NTFGQVx1NzY4NFx1NjM5Mlx1OTYxRlx1N0I0OVx1NUY4NVx1NUU3Nlx1NjYzRVx1NzkzQVx1OTYxRlx1NTIxN1x1NjU3MFx1MzAwMiAqL1xuICBjb25zdCBNQVhfREVUQUlMX0NPTkNVUlJFTkNZID0gM1xuICBjb25zdCBkZXRhaWxQb29sUmVmID0gdXNlUmVmPHsgcGVuZGluZzogQXJyYXk8eyB0YXJnZXQ6IHN0cmluZzsgZm9yY2U6IGJvb2xlYW4gfT47IGFjdGl2ZTogbnVtYmVyIH0+KHsgcGVuZGluZzogW10sIGFjdGl2ZTogMCB9KVxuICBjb25zdCBkZXRhaWxJbkZsaWdodFJlZiA9IHVzZVJlZihuZXcgU2V0PHN0cmluZz4oKSlcbiAgLyoqIFx1NEUwMFx1OTUyRVx1NkQ4OFx1NTMxNlx1RkYxQVx1NTE2OFx1OTBFOFx1ODlFM1x1OEJGQlx1OEREMVx1NUI4Q1x1NTQwRVx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1NjU3NFx1NEY1M1x1NTNEOVx1NEU4Qlx1RkYwOFx1N0VDRiByZWYgXHU1M0Q2XHU2NzAwXHU2NUIwXHU5NUVEXHU1MzA1XHVGRjBDXHU5MDdGXHU1MTREIHNlbGVjdGVkVGFyZ2V0cyBcdThGQzdcdTY3MUZcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgYXV0b05hcnJhdGl2ZVJlZiA9IHVzZVJlZihmYWxzZSlcbiAgY29uc3QgbG9hZE5hcnJhdGl2ZVJlZiA9IHVzZVJlZjwoKSA9PiB2b2lkPigoKSA9PiB7fSlcblxuICBjb25zdCBwdW1wRGV0YWlsUG9vbCA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBwb29sID0gZGV0YWlsUG9vbFJlZi5jdXJyZW50XG4gICAgaWYgKHBvb2wuYWN0aXZlID09PSAwICYmIHBvb2wucGVuZGluZy5sZW5ndGggPT09IDApIHtcbiAgICAgIGlmIChhdXRvTmFycmF0aXZlUmVmLmN1cnJlbnQgJiYgYWN0aXZlUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgYXV0b05hcnJhdGl2ZVJlZi5jdXJyZW50ID0gZmFsc2VcbiAgICAgICAgbG9hZE5hcnJhdGl2ZVJlZi5jdXJyZW50KClcbiAgICAgIH1cbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB3aGlsZSAoYWN0aXZlUmVmLmN1cnJlbnQgJiYgcG9vbC5hY3RpdmUgPCBNQVhfREVUQUlMX0NPTkNVUlJFTkNZICYmIHBvb2wucGVuZGluZy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBqb2IgPSBwb29sLnBlbmRpbmcuc2hpZnQoKSFcbiAgICAgIHBvb2wuYWN0aXZlICs9IDFcbiAgICAgIHZvaWQgbG9hZERldGFpbE9uY2Uoam9iLnRhcmdldCwgam9iLmZvcmNlKVxuICAgICAgICAuY2F0Y2goKCkgPT4ge30pXG4gICAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICBwb29sLmFjdGl2ZSAtPSAxXG4gICAgICAgICAgcHVtcERldGFpbFBvb2woKVxuICAgICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWREZXRhaWwgPSAodGFyZ2V0OiBzdHJpbmcsIGZvcmNlOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgaWYgKGRldGFpbEluRmxpZ2h0UmVmLmN1cnJlbnQuaGFzKHRhcmdldCkpIHJldHVyblxuICAgIGRldGFpbEluRmxpZ2h0UmVmLmN1cnJlbnQuYWRkKHRhcmdldClcbiAgICBzZXREZXRhaWxTdGF0dXMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW3RhcmdldF06ICdxdWV1ZWQnIH0pKVxuICAgIGRldGFpbFBvb2xSZWYuY3VycmVudC5wZW5kaW5nLnB1c2goeyB0YXJnZXQsIGZvcmNlIH0pXG4gICAgcHVtcERldGFpbFBvb2woKVxuICB9XG5cbiAgLyoqIFx1OTYxRlx1NTIxN1x1NEVGQlx1NTJBMVx1NEY1M1x1RkYxQVx1NzcxRlx1NkI2M1x1NTNEMVx1OEQ3N1x1ODlFM1x1OEJGQlx1OEJGN1x1NkM0Mlx1RkYxQlx1NEVGQlx1NEY1NVx1NTkzMVx1OEQyNVx1RkYwOFx1N0Y1MVx1N0VEQ1x1NEUyRFx1NjVBRC9cdThEODVcdTY1RjYvXHU2NzBEXHU1MkExXHU2NzJBXHU4RkQwXHU4ODRDXHVGRjA5XHU5MEZEXHU1MTk5XHU1MTY1XHU1MzYxXHU3MjQ3XHU5NTE5XHU4QkVGXHU1MzYwXHU0RjREXHVGRjBDXHU3RUREXHU0RTBEXHU2NUUwXHU5NjUwXHU4RjZDXHU1NzA4XHUzMDAyICovXG4gIGNvbnN0IGxvYWREZXRhaWxPbmNlID0gYXN5bmMgKHRhcmdldDogc3RyaW5nLCBmb3JjZTogYm9vbGVhbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldERldGFpbFN0YXR1cygocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBbdGFyZ2V0XTogJ3J1bm5pbmcnIH0pKVxuICAgIGNvbnN0IGZhaWxQbGFjZWhvbGRlciA9IChtZXNzYWdlOiBzdHJpbmcpOiBDb21taXREZXRhaWxQYXlsb2FkID0+XG4gICAgICAoe1xuICAgICAgICBzaGE6IHRhcmdldCxcbiAgICAgICAgaXNXb3JraW5nOiB0YXJnZXQgPT09ICd3b3JraW5nJyxcbiAgICAgICAgZmlsZXM6IFtdLFxuICAgICAgICBpbnNlcnRpb25zOiAwLFxuICAgICAgICBkZWxldGlvbnM6IDAsXG4gICAgICAgIHBhdGNoVHJ1bmNhdGVkOiBmYWxzZSxcbiAgICAgICAgcGF0Y2g6ICcnLFxuICAgICAgICBjb21taXQ6IG51bGwsXG4gICAgICAgIGFuYWx5c2lzOiB7IHdoYXQ6IG1lc3NhZ2UsIGxvZ2ljOiBbXSwgcmlza3M6IFtdIH0sXG4gICAgICB9KSBhcyB1bmtub3duIGFzIENvbW1pdERldGFpbFBheWxvYWRcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvY29tbWl0LWRldGFpbCcsIHsgc2hhOiB0YXJnZXQsIGZvcmNlIH0pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldERldGFpbHMoKHByZXZpb3VzKSA9PiAoe1xuICAgICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICAgIFt0YXJnZXRdOiBmYWlsUGxhY2Vob2xkZXIoJ0FJIFx1ODlFM1x1OEJGQlx1NTkzMVx1OEQyNVx1RkYxQScgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnJykgKyAnXHVGRjA4XHU3MEI5XHUzMDBDXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwXHUzMDBEXHU1M0VGXHU5MUNEXHU4QkQ1XHVGRjA5JyksXG4gICAgICAgIH0pKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldERldGFpbHMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW3RhcmdldF06IGRhdGEgYXMgdW5rbm93biBhcyBDb21taXREZXRhaWxQYXlsb2FkIH0pKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBjb25zdCByZWFzb24gPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcilcbiAgICAgIHNldERldGFpbHMoKHByZXZpb3VzKSA9PiAoe1xuICAgICAgICAuLi5wcmV2aW91cyxcbiAgICAgICAgW3RhcmdldF06IGZhaWxQbGFjZWhvbGRlcihgQUkgXHU4OUUzXHU4QkZCXHU1OTMxXHU4RDI1XHVGRjFBJHtyZWFzb24gPT09ICdUaGUgdXNlciBhYm9ydGVkIGEgcmVxdWVzdC4nID8gJ1x1OEJGN1x1NkM0Mlx1OEQ4NVx1NjVGNlx1NjIxNlx1NjcwRFx1NTJBMVx1NEUyRFx1NjVBRCcgOiByZWFzb259XHVGRjA4XHU2OEMwXHU2N0U1IGRzaCBcdTY2MkZcdTU0MjZcdTU3MjhcdThGRDBcdTg4NENcdUZGMUJcdTcwQjlcdTMwMENcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdTMwMERcdTUzRUZcdTkxQ0RcdThCRDVcdUZGMDlgKSxcbiAgICAgIH0pKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBkZXRhaWxJbkZsaWdodFJlZi5jdXJyZW50LmRlbGV0ZSh0YXJnZXQpXG4gICAgICBzZXREZXRhaWxTdGF0dXMoKHByZXZpb3VzKSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH1cbiAgICAgICAgZGVsZXRlIG5leHRbdGFyZ2V0XVxuICAgICAgICByZXR1cm4gbmV4dFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkSW1wYWN0ID0gYXN5bmMgKGZvcmNlID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoc2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgc2V0SW1wYWN0TG9hZGluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pbXBhY3Qtc2NvcGUnLCB7IHNoYXM6IHNlbGVjdGVkVGFyZ2V0cywgZm9yY2UgfSlcbiAgICAgIHNldEltcGFjdChvayA/IChkYXRhIGFzIHVua25vd24gYXMgSW1wYWN0U2NvcGVQYXlsb2FkKSA6IG51bGwpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEltcGFjdExvYWRpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZFJldmlld3MgPSBhc3luYyAoZm9yY2UgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICBzZXRSZXZpZXdMb2FkaW5nKHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIHNlbGVjdGVkVGFyZ2V0cykge1xuICAgICAgICBpZiAoIWFjdGl2ZVJlZi5jdXJyZW50KSBicmVha1xuICAgICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9yZXZpZXcnLCB7IHNoYTogdGFyZ2V0LCBmb3JjZSB9KVxuICAgICAgICBjb25zdCBwYXlsb2FkID0gZGF0YSBhcyB1bmtub3duIGFzIFJldmlld1BheWxvYWRcbiAgICAgICAgc2V0UmV2aWV3cygocHJldmlvdXMpID0+ICh7XG4gICAgICAgICAgLi4ucHJldmlvdXMsXG4gICAgICAgICAgW3RhcmdldF06IG9rID8gcGF5bG9hZCA6IHtcbiAgICAgICAgICAgIGlzc3Vlc0ZvdW5kOiAwLFxuICAgICAgICAgICAgaXNzdWVzOiAnJyxcbiAgICAgICAgICAgIHZlcmRpY3Q6ICdcdThCQzRcdTVCQTFcdTU5MzFcdThEMjVcdUZGMUEnICsgU3RyaW5nKHBheWxvYWRbJ2Vycm9yJ10gPz8gJycpICsgJ1x1RkYwOFx1NTNFRlx1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1OTFDRFx1OEJENVx1RkYwOScsXG4gICAgICAgICAgICBpc3N1ZUxpc3Q6IFtdLFxuICAgICAgICAgICAgY2FjaGVkOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSlcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0UmV2aWV3TG9hZGluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkRmlsZURpZmYgPSBhc3luYyAoc2hhOiBzdHJpbmcsIHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGtleSA9IGAke3NoYX18JHtwYXRofWBcbiAgICBpZiAoZmlsZURpZmZzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2V0RmlsZURpZmZzKChwcmV2aW91cykgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9XG4gICAgICAgIGRlbGV0ZSBuZXh0W2tleV1cbiAgICAgICAgcmV0dXJuIG5leHRcbiAgICAgIH0pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9maWxlLWRpZmYnLCB7IHNoYSwgcGF0aCB9KVxuICAgIHNldEZpbGVEaWZmcygocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBba2V5XTogU3RyaW5nKGRhdGFbJ3BhdGNoJ10gPz8gJycpIH0pKVxuICB9XG5cbiAgY29uc3QgbG9hZElzc3VlcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvaXNzdWVzP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICAvLyBcdThGNkVcdThCRTJcdTUyMzdcdTY1QjBcdTRFMERcdTZFMDVcdTdBN0FcdTUyRkVcdTkwMDlcdUZGMUFcdTUyRkVcdTkwMDlcdTk1MkVcdTk2OEZcdTk1RUVcdTk4OTggaWQgXHU4RDcwXHVGRjBDXHU1REYyXHU2RDg4XHU1OTMxXHU3Njg0IGlkIFx1NEUwRFx1NUY3MVx1NTRDRFx1NjYzRVx1NzkzQVx1MzAwMlxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXRJc3N1ZXNEYXRhKChkYXRhIGFzIHsgaXNzdWVzOiBJc3N1ZUVudHJ5W10gfSkuaXNzdWVzID8/IFtdKVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gXHU5NUVFXHU5ODk4XHU1MjE3XHU4ODY4XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXHVGRjFBXHU1MjE3XHU4ODY4XHU0RkREXHU2MzAxXHU1MzlGXHU2ODM3XHUzMDAyXG4gICAgfVxuICB9XG5cbiAgLy8gUmV2aWV3IFx1OTg3NVx1N0I3RVx1NUI5RVx1NjVGNlx1NTQwQ1x1NkI2NVx1RkYxQVx1NkEyMVx1NTc4Qlx1NTcyOFx1ODA0QVx1NTkyOVx1OTFDQ1x1NTZERVx1NTE5OVx1NzJCNlx1NjAwMVx1RkYwOHJldmlld19pc3N1ZV91cGRhdGVcdUZGMDlcdTU0MEVcdUZGMENcdTc3MEJcdTY3N0YgNCBcdTc5RDJcdTUxODVcdThEREZcdTRFMEFcdTMwMDJcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodGFiICE9PSAncmV2aWV3JykgcmV0dXJuXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IHZvaWQgbG9hZElzc3VlcygpIH0sIDQwMDApXG4gICAgcmV0dXJuICgpID0+IHsgY2xlYXJJbnRlcnZhbCh0aW1lcikgfVxuICB9LCBbdGFiLCBwcm9wcy5zZXNzaW9uSWRdKVxuXG4gIC8qKiBcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTVCRkNcdTUxRkFcdTRFM0EgTWFya2Rvd25cdUZGMDhcdTYzMDlcdTRFMjVcdTkxQ0RcdTVFQTZcdTYzOTJcdTVFOEZcdUZGMUJcdTU5MERcdTc1MjhcdTdCMTRcdThCQjBcdTVCRkNcdTUxRkFcdTc2ODRcdTRFMEJcdThGN0RcdTY1QjlcdTVGMEZcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgZXhwb3J0SXNzdWVzTWQgPSAoaXNzdWVzOiBJc3N1ZUVudHJ5W10pOiB2b2lkID0+IHtcbiAgICBpZiAoaXNzdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIHQoJ3Jldmlldy5leHBvcnRFbXB0eScpKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHNldmVyaXR5T3JkZXI6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7IGJsb2NrZXI6IDAsIGNyaXRpY2FsOiAxLCBtYWpvcjogMiwgbWlub3I6IDMsIGluZm86IDQgfVxuICAgIGNvbnN0IG9yZGVyZWQgPSBbLi4uaXNzdWVzXS5zb3J0KChsZWZ0LCByaWdodCkgPT5cbiAgICAgIChzZXZlcml0eU9yZGVyW25vcm1hbGl6ZUlzc3VlU2V2ZXJpdHkobGVmdC5zZXZlcml0eSldID8/IDkpIC0gKHNldmVyaXR5T3JkZXJbbm9ybWFsaXplSXNzdWVTZXZlcml0eShyaWdodC5zZXZlcml0eSldID8/IDkpXG4gICAgICB8fCBsZWZ0LmNyZWF0ZWRBdCAtIHJpZ2h0LmNyZWF0ZWRBdClcbiAgICBjb25zdCBsaW5lczogc3RyaW5nW10gPSBbXG4gICAgICAnIyBSZXZpZXcgXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1JyxcbiAgICAgICcnLFxuICAgICAgYC0gXHU5ODc5XHU3NkVFXHVGRjFBJHtzdGF0ZT8ucHJvamVjdD8ubmFtZSA/PyAnXHUyMDE0J31gLFxuICAgICAgYC0gXHU0RUQzXHU1RTkzXHVGRjFBJHtjb21taXRzRGF0YT8ucm9vdFBhdGggPz8gc3RhdGU/LnByb2plY3Q/LnJvb3RQYXRoID8/ICdcdTIwMTQnfWAsXG4gICAgICBgLSBcdTUyMDZcdTY1MkZcdUZGMUEke2NvbW1pdHNEYXRhPy5icmFuY2ggPz8gJ1x1MjAxNCd9YCxcbiAgICAgIGAtIFx1NUJGQ1x1NTFGQVx1NjVGNlx1OTVGNFx1RkYxQSR7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfWAsXG4gICAgICBgLSBcdTY1NzBcdTkxQ0ZcdUZGMUEke2lzc3Vlcy5sZW5ndGh9XHVGRjA4XHU1Rjg1XHU1OTA0XHU3NDA2ICR7aXNzdWVzLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpLmxlbmd0aH1cdUZGMDlgLFxuICAgICAgJycsXG4gICAgXVxuICAgIG9yZGVyZWQuZm9yRWFjaCgoaXNzdWUsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBpc3N1ZS5jaGFuZ2VJZC5zdGFydHNXaXRoKCdyZXZpZXc6JykgJiYgaXNzdWUuY2hhbmdlSWQgIT09ICdyZXZpZXc6d29ya3RyZWUnXG4gICAgICAgID8gYFx1NjNEMFx1NEVBNCAke2lzc3VlLmNoYW5nZUlkLnNsaWNlKCdyZXZpZXc6Jy5sZW5ndGgsICdyZXZpZXc6Jy5sZW5ndGggKyA4KX1gXG4gICAgICAgIDogaXNzdWUuY2hhbmdlSWQgPT09ICdyZXZpZXc6d29ya3RyZWUnID8gJ1x1NURFNVx1NEY1Q1x1NTMzQScgOiBpc3N1ZS5jaGFuZ2VJZFxuICAgICAgbGluZXMucHVzaChgIyMgJHtpbmRleCArIDF9LiBbJHtpc3N1ZS5zZXZlcml0eX1dWyR7aXNzdWUuY2F0ZWdvcnkgfHwgJ2dlbmVyYWwnfV0gJHtpc3N1ZS50aXRsZX1gKVxuICAgICAgbGluZXMucHVzaCgnJylcbiAgICAgIGxpbmVzLnB1c2goYC0gXHU3MkI2XHU2MDAxXHVGRjFBJHtJU1NVRV9TVEFUVVNfTEFCRUxTW2lzc3VlLnN0YXR1c10gPz8gaXNzdWUuc3RhdHVzfWApXG4gICAgICBsaW5lcy5wdXNoKGAtIFx1NUJGOVx1OEM2MVx1RkYxQSR7dGFyZ2V0fWApXG4gICAgICBsaW5lcy5wdXNoKGAtIFx1NTNEMVx1NzNCMFx1NjVGNlx1OTVGNFx1RkYxQSR7bmV3IERhdGUoaXNzdWUuY3JlYXRlZEF0KS50b0xvY2FsZVN0cmluZygpfWApXG4gICAgICBpZiAoKGlzc3VlLmRlc2NyaXB0aW9uID8/ICcnKSAhPT0gJycpIGxpbmVzLnB1c2goYC0gXHU2M0NGXHU4RkYwXHVGRjFBJHtpc3N1ZS5kZXNjcmlwdGlvbiEucmVwbGFjZSgvXFxuL2csICcgJyl9YClcbiAgICAgIGlmICgoaXNzdWUucmVzb2x1dGlvbiA/PyAnJykgIT09ICcnKSBsaW5lcy5wdXNoKGAtIFx1N0VEM1x1OEJCQVx1RkYxQSR7aXNzdWUucmVzb2x1dGlvbn1gKVxuICAgICAgbGluZXMucHVzaCgnJylcbiAgICB9KVxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbbGluZXMuam9pbignXFxuJyldLCB7IHR5cGU6ICd0ZXh0L21hcmtkb3duO2NoYXJzZXQ9dXRmLTgnIH0pXG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxuICAgIGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgIGFuY2hvci5ocmVmID0gdXJsXG4gICAgYW5jaG9yLmRvd25sb2FkID0gYHJldmlldy1pc3N1ZXMtJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApfS5tZGBcbiAgICBhbmNob3IuY2xpY2soKVxuICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKVxuICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzICcgKyB0KCdub3Rlcy5leHBvcnREb25lJykpXG4gIH1cblxuICAvKiogXHU2Mjc5XHU5MUNGXHU2ODA3XHU4QkIwXHU1REYyXHU1OTA0XHU3NDA2XHVGRjA4YWNjZXB0ZWRcdUZGMDlcdUZGMUFcdTRFQkFcdTVERTVcdTc4NkVcdThCQTRcdTY1RTBcdTk3MDBcdTkwMTBcdTY3NjFcdTU5MERcdTY4QzBcdTY1RjZcdTc2RjRcdTYzQTVcdTdFRDNcdTY4NDhcdTMwMDIgKi9cbiAgY29uc3QgbWFya0lzc3Vlc0hhbmRsZWQgPSBhc3luYyAoaWRzOiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCBkb25lID0gMFxuICAgIGZvciAoY29uc3QgaWQgb2YgaWRzKSB7XG4gICAgICBjb25zdCB7IG9rIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXMvc3RhdHVzJywgeyBpZCwgc3RhdHVzOiAnYWNjZXB0ZWQnIH0pXG4gICAgICBpZiAob2spIGRvbmUgKz0gMVxuICAgIH1cbiAgICBhd2FpdCBsb2FkSXNzdWVzKClcbiAgICBpZiAoZG9uZSA+IDApIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzICcgKyB0KCdyZXZpZXcuaGFuZGxlZERvbmUnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoZG9uZSkpKVxuICB9XG5cbiAgLyoqIFx1NjI3OVx1OTFDRlx1NTkwRFx1NjhDMFx1RkYxQVx1NUJGOVx1OTAwOVx1NEUyRFx1NzY4NFx1OEJDNFx1NUJBMVx1NzZFRVx1NjgwN1x1OTAxMFx1NEUyQVx1OEREMVx1NTkwRFx1NjhDMFx1RkYwOFx1NEUzMlx1ODg0QyBMTE1cdUZGMDlcdUZGMENcdTVCOUVcdTY1RjZcdThGREJcdTVFQTZcdTMwMDFcdTUzRUZcdTRFMkRcdTkwMTRcdTUwNUNcdTZCNjJcdTMwMDIgKi9cbiAgY29uc3QgcnVuQmF0Y2hWZXJpZnkgPSBhc3luYyAodGFyZ2V0czogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAodGFyZ2V0cy5sZW5ndGggPT09IDApIHJldHVyblxuICAgIGJhdGNoU3RvcFJlZi5jdXJyZW50ID0gZmFsc2VcbiAgICBzZXRCYXRjaFZlcmlmeVN0YXRlKHsgZG9uZTogMCwgdG90YWw6IHRhcmdldHMubGVuZ3RoIH0pXG4gICAgbGV0IHJlc29sdmVkVG90YWwgPSAwXG4gICAgbGV0IG9wZW5Ub3RhbCA9IDBcbiAgICBsZXQgbmV3VG90YWwgPSAwXG4gICAgbGV0IGZhaWxlZCA9IDBcbiAgICBmb3IgKGNvbnN0IFtpbmRleCwgdGFyZ2V0XSBvZiB0YXJnZXRzLmVudHJpZXMoKSkge1xuICAgICAgaWYgKGJhdGNoU3RvcFJlZi5jdXJyZW50KSBicmVha1xuICAgICAgc2V0QmF0Y2hWZXJpZnlTdGF0ZSh7IGRvbmU6IGluZGV4LCB0b3RhbDogdGFyZ2V0cy5sZW5ndGggfSlcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcy92ZXJpZnknLCB7IHRhcmdldCB9KVxuICAgICAgICBpZiAoIW9rKSBmYWlsZWQgKz0gMVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlZFRvdGFsICs9ICgoZGF0YVsncmVzb2x2ZWQnXSBhcyB1bmtub3duW10pID8/IFtdKS5sZW5ndGhcbiAgICAgICAgICBvcGVuVG90YWwgKz0gKChkYXRhWydzdGlsbE9wZW4nXSBhcyB1bmtub3duW10pID8/IFtdKS5sZW5ndGhcbiAgICAgICAgICBuZXdUb3RhbCArPSAoKGRhdGFbJ25ld0lzc3VlcyddIGFzIHVua25vd25bXSkgPz8gW10pLmxlbmd0aFxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgZmFpbGVkICs9IDFcbiAgICAgIH1cbiAgICB9XG4gICAgc2V0QmF0Y2hWZXJpZnlTdGF0ZShudWxsKVxuICAgIGF3YWl0IGxvYWRJc3N1ZXMoKVxuICAgIGlmIChiYXRjaFN0b3BSZWYuY3VycmVudCkgc2V0QWN0aW9uUmVzdWx0KCdcdTIzRjkgJyArIHQoJ3Jldmlldy5iYXRjaFN0b3BwZWQnKSlcbiAgICBlbHNlIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzICcgKyB0KCdyZXZpZXcuYmF0Y2hEb25lJykucmVwbGFjZSgne2F9JywgU3RyaW5nKHJlc29sdmVkVG90YWwpKS5yZXBsYWNlKCd7Yn0nLCBTdHJpbmcob3BlblRvdGFsKSkucmVwbGFjZSgne2N9JywgU3RyaW5nKG5ld1RvdGFsKSkucmVwbGFjZSgne2R9JywgU3RyaW5nKGZhaWxlZCkpKVxuICB9XG5cbiAgLyoqIFx1OEY2Q1x1ODA0QVx1NTkyOVx1NTkwRFx1OUE4Q1x1RkYxQVx1NjI4QVx1N0I1Qlx1OTAwOVx1ODMwM1x1NTZGNFx1NTE4NVx1NzY4NFx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1NTNEMVx1OTAwMVx1NTIzMFx1NUY1M1x1NTI0RFx1NEYxQVx1OEJERFx1RkYwOGZvbGxvd3VwIFx1NTUyNFx1OTE5Mlx1NkEyMVx1NTc4Qlx1NjU3NFx1NEY1M1x1NTkwRFx1OUE4Q1x1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBzZW5kSXNzdWVzVG9DaGF0ID0gKGlzc3VlczogSXNzdWVFbnRyeVtdKTogdm9pZCA9PiB7XG4gICAgY29uc3QgaWRzID0gaXNzdWVzXG4gICAgICAuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJylcbiAgICAgIC5tYXAoKGlzc3VlKSA9PiBpc3N1ZS5pZClcbiAgICBpZiAoaWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIHQoJ3Jldmlldy5zZW5kQ2hhdEVtcHR5JykpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHByb3BzLnNlc3Npb25JZCA9PT0gdW5kZWZpbmVkIHx8IHByb3BzLnNlc3Npb25JZCA9PT0gJycpIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyB0KCdyZXZpZXcuc2VuZENoYXROb1Nlc3Npb24nKSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBzZXRDb25maXJtRGlhbG9nKHtcbiAgICAgIHRpdGxlOiB0KCdyZXZpZXcuc2VuZENoYXRDb25maXJtVGl0bGUnKSxcbiAgICAgIG1lc3NhZ2U6IHQoJ3Jldmlldy5zZW5kQ2hhdENvbmZpcm1Nc2cnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoTWF0aC5taW4oaWRzLmxlbmd0aCwgMzApKSksXG4gICAgICBkYW5nZXI6IGZhbHNlLFxuICAgICAgY29uZmlybUxhYmVsOiB0KCdyZXZpZXcuc2VuZENoYXRBdXRvJyksXG4gICAgICBhbHQ6IHtcbiAgICAgICAgbGFiZWw6IHQoJ3Jldmlldy5zZW5kQ2hhdFBsYW4nKSxcbiAgICAgICAgb25BbHQ6ICgpID0+IHsgdm9pZCBzZW5kVG9DaGF0KGlkcywgJ3BsYW4nKSB9LFxuICAgICAgfSxcbiAgICAgIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHNlbmRUb0NoYXQoaWRzLCAnYXV0bycpIH0sXG4gICAgfSlcbiAgfVxuXG4gIC8qKiBcdTVCOUVcdTk2NDVcdTUzRDFcdTkwMDFcdUZGMUFtb2RlPWF1dG8gXHU1MTY4XHU4MUVBXHU1MkE4XHU0RkVFXHU1OTBEXHVGRjFCcGxhbiBcdTUzNEFcdTYyNEJcdTUyQThcdUZGMDhcdThCRUZcdTYyQTUvXHU5MUNEXHU1OTBEXHU3NkY0XHU2M0E1XHU1MTczXHVGRjBDXHU3NzFGXHU5NUVFXHU5ODk4XHU1M0VBXHU1MUZBXHU2NUI5XHU2ODQ4XHU3QjQ5XHU4QkM0XHU1QkExXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHNlbmRUb0NoYXQgPSBhc3luYyAoaWRzOiBzdHJpbmdbXSwgbW9kZTogJ2F1dG8nIHwgJ3BsYW4nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaXNzdWVzL3RvLWNoYXQnLCB7IGlkcywgbGltaXQ6IDMwLCBtb2RlIH0pXG4gICAgc2V0QWN0aW9uUmVzdWx0KG9rXG4gICAgICA/ICdcdTI3MTMgJyArIHQoJ3Jldmlldy5zZW5kQ2hhdERvbmUnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoZGF0YVsnc2VudCddID8/ICcnKSlcbiAgICAgIDogJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gIH1cblxuICAvKipcbiAgICogXHU5NUVFXHU5ODk4XHU1OTBEXHU2OEMwXHVGRjFBXHU1QkY5XHU4QkU1XHU5NUVFXHU5ODk4XHU2MjQwXHU1QzVFXHU4QkM0XHU1QkExXHU3NkVFXHU2ODA3XHU5MUNEXHU4REQxXHU2OEMwXHU2RDRCXHVGRjA4XHU0RkVFXHU1OTBEXHU3ODZFXHU4QkE0ICsgXHU2NzAwXHU0RjE4XHU2MDI3L1x1NjcwMFx1NUMwRlx1NEZCNVx1NTE2NSArIFx1NjVCMFx1OTVFRVx1OTg5OFx1NjI2Qlx1NjNDRlx1RkYwOVx1RkYwQ1xuICAgKiBcdTUzRUFcdTY3MDlcdTU5MERcdTY4QzBcdTkwMUFcdThGQzdcdTYyNERcdTgxRUFcdTUyQThcdTdGNkVcdTRFM0FcdTVERjJcdTg5RTNcdTUxQjNcdUZGMUJcdTdFRDNcdTY3OUNcdTRFRTVcdTU5MERcdTY4QzBcdTYyQTVcdTU0NEFcdTVGNjJcdTVGMEZcdTVDNTVcdTc5M0FcdTMwMDJcbiAgICovXG4gIGNvbnN0IHZlcmlmeUlzc3VlcyA9IGFzeW5jICh0YXJnZXQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldFZlcmlmeWluZ1RhcmdldCh0YXJnZXQpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcy92ZXJpZnknLCB7IHRhcmdldCB9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgcmVzb2x2ZWQgPSAoZGF0YVsncmVzb2x2ZWQnXSBhcyBzdHJpbmdbXSB8IHVuZGVmaW5lZCkgPz8gW11cbiAgICAgIGNvbnN0IHN0aWxsT3BlbiA9IChkYXRhWydzdGlsbE9wZW4nXSBhcyBBcnJheTx7IHRpdGxlOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0+IHwgdW5kZWZpbmVkKSA/PyBbXVxuICAgICAgY29uc3QgbmV3SXNzdWVzID0gKGRhdGFbJ25ld0lzc3VlcyddIGFzIEFycmF5PHsgc2V2ZXJpdHk6IHN0cmluZzsgdGl0bGU6IHN0cmluZyB9PiB8IHVuZGVmaW5lZCkgPz8gW11cbiAgICAgIGNvbnN0IHZlcmRpY3QgPSBTdHJpbmcoZGF0YVsndmVyZGljdCddID8/ICcnKVxuICAgICAgY29uc3QgbGluZXMgPSBbXG4gICAgICAgIGBcdTU5MERcdTY4QzBcdTVCOENcdTYyMTBcdUZGMUFcdTVERjJcdTRGRUVcdTU5MEQgJHtyZXNvbHZlZC5sZW5ndGh9IFx1MDBCNyBcdTRFQ0RcdTY3MkFcdTRGRUVcdTU5MEQgJHtzdGlsbE9wZW4ubGVuZ3RofSBcdTAwQjcgXHU2NUIwXHU1ODlFXHU5NUVFXHU5ODk4ICR7bmV3SXNzdWVzLmxlbmd0aH1gLFxuICAgICAgICAuLi4ocmVzb2x2ZWQubGVuZ3RoID4gMCA/IFtgXHUyNzEzIFx1NURGMlx1NEZFRVx1NTkwRFx1RkYxQSR7cmVzb2x2ZWQuam9pbignXHVGRjFCJyl9YF0gOiBbXSksXG4gICAgICAgIC4uLihzdGlsbE9wZW4ubGVuZ3RoID4gMCA/IHN0aWxsT3Blbi5tYXAoKGl0ZW0pID0+IGBcdTI3MTcgXHU2NzJBXHU0RkVFXHU1OTBEXHVGRjFBJHtpdGVtLnRpdGxlfSBcdTIwMTRcdTIwMTQgJHtpdGVtLnJlYXNvbn1gKSA6IFtdKSxcbiAgICAgICAgLi4uKG5ld0lzc3Vlcy5sZW5ndGggPiAwID8gbmV3SXNzdWVzLm1hcCgoaXRlbSkgPT4gYFx1RkYwQiBcdTY1QjBcdTk1RUVcdTk4OThcdUZGMUFbJHtpdGVtLnNldmVyaXR5fV0gJHtpdGVtLnRpdGxlfWApIDogW10pLFxuICAgICAgICAuLi4odmVyZGljdCA9PT0gJycgPyBbXSA6IFtgXHU2NzAwXHU0RjE4XHU2MDI3XHVGRjFBJHt2ZXJkaWN0fWBdKSxcbiAgICAgIF1cbiAgICAgIHNldEFjdGlvblJlc3VsdChsaW5lcy5qb2luKCdcXG4nKSlcbiAgICAgIGF3YWl0IGxvYWRJc3N1ZXMoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSkpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFZlcmlmeWluZ1RhcmdldChudWxsKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGFkZE5vdGUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKG5vdGVUaXRsZS50cmltKCkgPT09ICcnIHx8IG5vdGVDb250ZW50LnRyaW0oKSA9PT0gJycpIHJldHVyblxuICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzJywge1xuICAgICAgdGl0bGU6IG5vdGVUaXRsZS50cmltKCksXG4gICAgICBjb250ZW50OiBub3RlQ29udGVudC50cmltKCksXG4gICAgICB0YWdzOiBub3RlVGFncyxcbiAgICAgIHNoYTogc2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCA/IHVuZGVmaW5lZCA6IHNlbGVjdGVkVGFyZ2V0c1swXSxcbiAgICB9KVxuICAgIGlmIChvaykge1xuICAgICAgc2V0Tm90ZVRpdGxlKCcnKVxuICAgICAgc2V0Tm90ZUNvbnRlbnQoJycpXG4gICAgICBzZXROb3RlVGFncygnJylcbiAgICAgIGF3YWl0IGxvYWROb3RlcygpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVtb3ZlTm90ZSA9IGFzeW5jIChpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMvZGVsZXRlJywgeyBpZCB9KVxuICAgIGlmIChlZGl0aW5nTm90ZSAhPT0gbnVsbCAmJiBlZGl0aW5nTm90ZS5pZCA9PT0gaWQpIHNldEVkaXRpbmdOb3RlKG51bGwpXG4gICAgYXdhaXQgbG9hZE5vdGVzKClcbiAgfVxuXG4gIGNvbnN0IHNhdmVOb3RlRWRpdCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoZWRpdGluZ05vdGUgPT09IG51bGwpIHJldHVyblxuICAgIGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL3VwZGF0ZScsIHsgaWQ6IGVkaXRpbmdOb3RlLmlkLCB0aXRsZTogZWRpdGluZ05vdGUudGl0bGUsIGNvbnRlbnQ6IGVkaXRpbmdOb3RlLmNvbnRlbnQsIHRhZ3M6IGVkaXRpbmdOb3RlLnRhZ3MgfSlcbiAgICBzZXRFZGl0aW5nTm90ZShudWxsKVxuICAgIGF3YWl0IGxvYWROb3RlcygpXG4gIH1cblxuICAvKiogXHU3RjZFXHU5ODc2L1x1NTNENlx1NkQ4OFx1N0Y2RVx1OTg3Nlx1NEUwMFx1Njc2MVx1N0IxNFx1OEJCMFx1MzAwMiAqL1xuICBjb25zdCB0b2dnbGVOb3RlUGluID0gYXN5bmMgKG5vdGU6IE5vdGVFbnRyeSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL3VwZGF0ZScsIHsgaWQ6IG5vdGUuaWQsIHBpbm5lZDogbm90ZS5waW5uZWQgIT09IHRydWUgfSlcbiAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICB9XG5cbiAgLyoqIFx1N0IxNFx1OEJCMFx1NUJGQ1x1NTFGQVx1NEUzQSAubWQgXHU2NTg3XHU0RUY2XHVGRjA4XHU2RDRGXHU4OUM4XHU1NjY4XHU3QUVGIEJsb2IgXHU0RTBCXHU4RjdEXHVGRjFCXHU2NTg3XHU0RUY2XHU1NDBEXHU2MzA5XHU2ODA3XHU5ODk4XHU2RTA1XHU2RDE3XHVGRjBDXHU5NzVFXHU2Q0Q1XHU1QjU3XHU3QjI2XHU2NkZGXHU2MzYyXHU0RTNBXHU0RTBCXHU1MjEyXHU3RUJGXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGV4cG9ydE5vdGUgPSAobm90ZTogTm90ZUVudHJ5KTogdm9pZCA9PiB7XG4gICAgY29uc3QgbWQgPSBgIyAke25vdGUudGl0bGV9XFxuXFxuJHtub3RlLmNvbnRlbnR9XFxuYFxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbbWRdLCB7IHR5cGU6ICd0ZXh0L21hcmtkb3duO2NoYXJzZXQ9dXRmLTgnIH0pXG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxuICAgIGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgIGFuY2hvci5ocmVmID0gdXJsXG4gICAgYW5jaG9yLmRvd25sb2FkID0gKG5vdGUudGl0bGUucmVwbGFjZSgvW1xcXFwvOio/XCI8PnxdL2csICdfJykudHJpbSgpLnNsaWNlKDAsIDYwKSB8fCAnbm90ZScpICsgJy5tZCdcbiAgICBhbmNob3IuY2xpY2soKVxuICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKVxuICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzICcgKyB0KCdub3Rlcy5leHBvcnREb25lJykpXG4gIH1cblxuICAvKiogQUkgXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzXHVGRjFBXHU1QkY5XHU2QkQ0XHU0RTBBXHU2QjIxXHU2MDNCXHU3RUQzXHU1MDVBXHU1ODlFXHU5MUNGXHU2NkY0XHU2NUIwXHVGRjBDXHU2MjhBXHU3QjE0XHU4QkIwK1x1OTg3OVx1NzZFRVx1Njg2M1x1Njg0OFx1NjNEMFx1NzBCQ1x1NjIxMFx1NEUwMFx1NEVGRFx1MzAwQ1x1NkQzQlx1MzAwRFx1NzY4NFx1NjAzQlx1N0VEM1x1NjU4N1x1Njg2M1x1MzAwMiAqL1xuICBjb25zdCBhaVN1bW1hcml6ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRBaVN1bW1hcml6aW5nKHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL2FpLXN1bW1hcnknLCB7fSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldEFjdGlvblJlc3VsdChkYXRhWyd1cGRhdGVkJ10gPT09IHRydWVcbiAgICAgICAgPyAnXHUyNzEzIFx1NURGMlx1NUJGOVx1NkJENFx1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NUI4Q1x1NjIxMFx1NTg5RVx1OTFDRlx1NjZGNFx1NjVCMFx1RkYwOFx1NjVCMFx1NTg5RVx1NTNEOFx1NTMxNlx1ODlDMVx1NjAzQlx1N0VEM1x1NzY4NFx1MzAwQ1x1NjcyQ1x1NkIyMVx1NjZGNFx1NjVCMFx1MzAwRFx1NEUwMFx1ODI4Mlx1RkYwOVx1RkYwQ1x1NjVFN1x1NjAzQlx1N0VEM1x1NURGMlx1NTQwOFx1NUU3Nlx1NjZGRlx1NjM2MidcbiAgICAgICAgOiAnXHUyNzEzIFx1NURGMlx1NzUxRlx1NjIxMFx1OTk5Nlx1NEVGRFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEMycpXG4gICAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSkpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEFpU3VtbWFyaXppbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1OTg3NVx1OTc2Mlx1NTIxQlx1NUVGQVx1NjI2N1x1ODg0Q1x1RkYxQVx1NUVGQVx1NTNEOFx1NjZGNCBcdTIxOTIgTExNIFx1NzUxRlx1NjIxMFx1N0YxNlx1NjM5Mlx1OEJBMVx1NTIxMiBcdTIxOTIgXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0XHU5ODc1XHVGRjA4XHU4OUQyXHU4MjcyL1x1NkEyMVx1NTc4Qi9cdTdCNTZcdTc1NjVcdTUzRUZcdThDMDNcdUZGMDlcdTIxOTIgXHU3ODZFXHU4QkE0XHU1NDBFXHU1NDJGXHU1MkE4XHUzMDAyICovXG4gIGNvbnN0IHN0YXJ0UnVuID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChleGVjVGl0bGUudHJpbSgpID09PSAnJyB8fCBleGVjRGVzYy50cmltKCkgPT09ICcnKSByZXR1cm5cbiAgICBzZXRCdXN5KCdzdGFydFJ1bicpXG4gICAgc2V0QWN0aW9uUmVzdWx0KG51bGwpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvc3RhcnQnLCB7XG4gICAgICAgIHRpdGxlOiBleGVjVGl0bGUudHJpbSgpLCBkZXNjcmlwdGlvbjogZXhlY0Rlc2MudHJpbSgpLFxuICAgICAgICAuLi4oZXhlY01vZGVsID09PSAnJyA/IHt9IDogKCgpID0+IHsgY29uc3QgW3Byb3ZpZGVyLCBtb2RlbF0gPSBleGVjTW9kZWwuc3BsaXQoJy8nKTsgcmV0dXJuIHsgZGVmYXVsdE1vZGVsUHJvdmlkZXI6IHByb3ZpZGVyID8/ICcnLCBkZWZhdWx0TW9kZWxJZDogbW9kZWwgPz8gJycgfSB9KSgpKSxcbiAgICAgIH0pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAoZGF0YVsnYXV0b1N0YXJ0ZWQnXSA9PT0gdHJ1ZSkge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMUEnICsgU3RyaW5nKGRhdGFbJ3J1bklkJ10gPz8gJycpKVxuICAgICAgICBzZXRFeGVjVGl0bGUoJycpXG4gICAgICAgIHNldEV4ZWNEZXNjKCcnKVxuICAgICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHN0ZXBzID0gKGRhdGFbJ3N0ZXBzJ10gYXMgQXJyYXk8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+IHwgdW5kZWZpbmVkKSA/PyBbXVxuICAgICAgc2V0UGxhbkNvbmZpcm0oe1xuICAgICAgICBjaGFuZ2VJZDogU3RyaW5nKGRhdGFbJ2NoYW5nZUlkJ10gPz8gJycpLFxuICAgICAgICBzdGVwczogc3RlcHMubWFwKChzdGVwKSA9PiAoe1xuICAgICAgICAgIGlkOiBTdHJpbmcoc3RlcFsnaWQnXSA/PyAnJyksXG4gICAgICAgICAgdGl0bGU6IFN0cmluZyhzdGVwWyd0aXRsZSddID8/ICcnKSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogU3RyaW5nKHN0ZXBbJ2Rlc2NyaXB0aW9uJ10gPz8gJycpLFxuICAgICAgICAgIHRhcmdldEZpbGVzOiAoc3RlcFsndGFyZ2V0RmlsZXMnXSBhcyBzdHJpbmdbXSB8IHVuZGVmaW5lZCkgPz8gW10sXG4gICAgICAgICAgcm9sZTogU3RyaW5nKHN0ZXBbJ3JvbGUnXSA/PyAnY29kaW5nJyksXG4gICAgICAgICAgYWNjZXB0YW5jZTogU3RyaW5nKHN0ZXBbJ2FjY2VwdGFuY2UnXSA/PyAnJyksXG4gICAgICAgICAgZmFpbHVyZVBvbGljeTogU3RyaW5nKHN0ZXBbJ2ZhaWx1cmVQb2xpY3knXSA/PyAncmV0cnktZXNjYWxhdGUnKSxcbiAgICAgICAgICBlbmFibGVkOiBzdGVwWydlbmFibGVkJ10gIT09IGZhbHNlLFxuICAgICAgICAgIG1vZGVsUHJvdmlkZXI6ICcnLFxuICAgICAgICAgIG1vZGVsSWQ6ICcnLFxuICAgICAgICB9KSksXG4gICAgICB9KVxuICAgICAgaWYgKG1vZGVsT3B0aW9ucy5sZW5ndGggPT09IDAgJiYgbW9kZWxUaWVycyA9PT0gbnVsbCkgdm9pZCBsb2FkTW9kZWxDb25maWcoKVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU4QkExXHU1MjEyXHU1REYyXHU3NTFGXHU2MjEwXHVGRjBDXHU4QkY3XHU1NzI4XHU0RTBCXHU2NUI5XHU3ODZFXHU4QkE0XHU3RjE2XHU2MzkyXHU1NDBFXHU1NDJGXHU1MkE4JylcbiAgICAgIHNldEV4ZWNUaXRsZSgnJylcbiAgICAgIHNldEV4ZWNEZXNjKCcnKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSkpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJ1c3kobnVsbClcbiAgICB9XG4gIH1cblxuICAvKiogXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0XHU5ODc1XHVGRjFBXHU0RkREXHU1QjU4XHU3RjE2XHU4RjkxXHVGRjA4XHU2NUIwXHU3MjQ4XHU2NzJDXHU4QkExXHU1MjEyXHVGRjA5XHU1RTc2XHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHUzMDAyICovXG4gIGNvbnN0IGxhdW5jaFBsYW4gPSBhc3luYyAod2l0aEVkaXRzOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHBsYW5Db25maXJtID09PSBudWxsKSByZXR1cm5cbiAgICBzZXRQbGFuQnVzeSh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBsZXQgY2hhbmdlSWQgPSBwbGFuQ29uZmlybS5jaGFuZ2VJZFxuICAgICAgaWYgKHdpdGhFZGl0cykge1xuICAgICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL3BsYW4vdXBkYXRlJywgeyBjaGFuZ2VJZCwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzIH0pXG4gICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvbGF1bmNoJywgeyBjaGFuZ2VJZCB9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU1REYyXHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHVGRjFBJyArIFN0cmluZyhkYXRhWydydW5JZCddID8/ICcnKSlcbiAgICAgIHNldFBsYW5Db25maXJtKG51bGwpXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSkpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFBsYW5CdXN5KGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTUyQTBcdThGN0QgUnVuIFx1OEJFNlx1NjBDNVx1RkYwOFx1NkI2NVx1OUFBNFx1NjVGNlx1OTVGNFx1N0VCRiArIFx1NEVGQlx1NTJBMVx1NURFNVx1NEY1Q1x1OEJCMFx1NUZDNlx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBsb2FkUnVuRGV0YWlsID0gYXN5bmMgKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9kZXRhaWw/aWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChpZCkgKyAnJnNlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldFJ1bkRldGFpbChkYXRhIGFzIFJ1bkRldGFpbClcbiAgICB9IGNhdGNoIHtcbiAgICAgIHNldFJ1bkRldGFpbChudWxsKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTYwNjJcdTU5MERcdTY2ODJcdTUwNUMvXHU0RTJEXHU2NUFEL1x1NTkzMVx1OEQyNVx1NzY4NCBSdW5cdTMwMDIgKi9cbiAgY29uc3QgcmVzdW1lUnVuID0gYXN5bmMgKHJ1bklkOiBzdHJpbmcsIGFjdGlvbjogJ2NvbnRpbnVlJyB8ICdza2lwLWN1cnJlbnQnKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9yZXN1bWUnLCB7IHJ1bklkLCBhY3Rpb24gfSlcbiAgICBpZiAob2spIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NURGMlx1NjA2Mlx1NTkwRFx1NjI2N1x1ODg0Q1x1RkYwOCcgKyBhY3Rpb24gKyAnXHVGRjA5JylcbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgICBhd2FpdCBsb2FkUnVuRGV0YWlsKHJ1bklkKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NTJBMFx1OEY3RFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1NTIxN1x1ODg2OFx1MzAwMiAqL1xuICBjb25zdCBsb2FkU2NoZWR1bGVkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9zY2hlZHVsZWQ/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0U2NoZWR1bGVkRGF0YSgoZGF0YSBhcyB7IHRhc2tzOiBTY2hlZHVsZWRUYXNrRW50cnlbXSB9KS50YXNrcyA/PyBbXSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1NTIxN1x1ODg2OFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2MlxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTUyMUJcdTVFRkEgLyBcdTY2RjRcdTY1QjAgLyBcdTUyMjBcdTk2NjQgLyBcdTdBQ0JcdTUzNzNcdTYyNjdcdTg4NENcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdTMwMDIgKi9cbiAgY29uc3QgYWRkU2NoZWR1bGVkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGludGVydmFsTWludXRlcyA9IE51bWJlcihzY2hlZEludGVydmFsKVxuICAgIGlmIChzY2hlZE5hbWUudHJpbSgpID09PSAnJyB8fCAhTnVtYmVyLmlzRmluaXRlKGludGVydmFsTWludXRlcykgfHwgaW50ZXJ2YWxNaW51dGVzIDwgMSkge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgXHU4QkY3XHU1ODZCXHU1MTk5XHU0RUZCXHU1MkExXHU1NDBEXHU3OUYwXHU0RTBFXHU2NzA5XHU2NTQ4XHU5NUY0XHU5Njk0XHVGRjA4XHU1MjA2XHU5NDlGXHVGRjA5JylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9zY2hlZHVsZWQnLCB7XG4gICAgICBuYW1lOiBzY2hlZE5hbWUudHJpbSgpLCB0eXBlOiBzY2hlZFR5cGUsIGludGVydmFsTWludXRlcyxcbiAgICAgIHRpdGxlOiBzY2hlZFRpdGxlLnRyaW0oKSB8fCB1bmRlZmluZWQsIGRlc2NyaXB0aW9uOiBzY2hlZERlc2MudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICB9KVxuICAgIGlmIChvaykge1xuICAgICAgc2V0U2NoZWROYW1lKCcnKTsgc2V0U2NoZWRUaXRsZSgnJyk7IHNldFNjaGVkRGVzYygnJylcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1NURGMlx1NTIxQlx1NUVGQScpXG4gICAgICBhd2FpdCBsb2FkU2NoZWR1bGVkKClcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNjaGVkdWxlZEFjdGlvbiA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvc2NoZWR1bGVkLycgKyBwYXRoLCBib2R5KVxuICAgIGlmIChvaykgYXdhaXQgbG9hZFNjaGVkdWxlZCgpXG4gICAgZWxzZSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gIH1cblxuICAvKiogXHU1MkEwXHU4RjdEXHU4QkIwXHU1RkM2XHU5NzYyXHU2NzdGXHU1MTY4XHU5MUNGXHU2NTcwXHU2MzZFXHVGRjA4XHU1NDJCXHU1NDBDXHU2QjY1XHU1N0ZBXHU3RUJGXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGxvYWRNZW1vcmllcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3JpZXM/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0TWVtb3JpZXNEYXRhKGRhdGEgYXMgTWVtb3JpZXNQYXlsb2FkKVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gXHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NjJDOVx1NTNENlx1NTQwQ1x1NkI2NVx1RkYxQVx1NEUwOVx1NTQxMVx1NTIyNFx1NUI5QVx1RkYwOFx1NTkzMVx1NjU0OFx1NjNEMFx1Njg0OC9cdTY1QjBcdTU4OUVcdTUwMTlcdTkwMDkvXHU4MUVBXHU1MkE4XHU3RUVEXHU1NDdEXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHN5bmNNZW1vcmllcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRNZW1vcnlTeW5jaW5nKHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeS9zeW5jJywge30pXG4gICAgICBpZiAoIW9rICYmIGRhdGFbJ2Vycm9yJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzZXRTeW5jUmVwb3J0KHsgb2s6IGZhbHNlLCBlcnJvcjogU3RyaW5nKGRhdGFbJ2Vycm9yJ10pIH0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0U3luY1JlcG9ydChkYXRhIGFzIFN5bmNSZXBvcnQpXG4gICAgICBhd2FpdCBsb2FkTWVtb3JpZXMoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRTeW5jUmVwb3J0KHsgb2s6IGZhbHNlLCBlcnJvcjogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpIH0pXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldE1lbW9yeVN5bmNpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QVx1NTQwRVx1N0VFRFx1RkYxQVx1NjI4QVx1OTAwOVx1NEUyRFx1NzY4NFx1NzU5MVx1NEYzQ1x1OEZDN1x1NjVGNlx1OTg3OVx1ODQzRFx1NEUzQSBzdGFsZSAvIFx1NUY1Mlx1Njg2M1x1MzAwMiAqL1xuICBjb25zdCBhcHBseVN5bmMgPSBhc3luYyAoaWRzOiBzdHJpbmdbXSwgYWN0aW9uOiAnbWFyay1zdGFsZScgfCAnYXJjaGl2ZScpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvc3luYy9hcHBseScsIHsgaWRzLCBhY3Rpb24gfSlcbiAgICBzZXRTeW5jUmVwb3J0KChwcmV2aW91cykgPT4gcHJldmlvdXMgPT09IG51bGwgPyBudWxsIDogeyAuLi5wcmV2aW91cywgc3RhbGVQcm9wb3NhbHM6IChwcmV2aW91cy5zdGFsZVByb3Bvc2FscyA/PyBbXSkuZmlsdGVyKChwcm9wb3NhbCkgPT4gIWlkcy5pbmNsdWRlcyhwcm9wb3NhbC5pZCkpIH0pXG4gICAgYXdhaXQgbG9hZE1lbW9yaWVzKClcbiAgfVxuXG4gIC8qKiBcdThCQjBcdTVGQzZcdTcyQjZcdTYwMDFcdTY0Q0RcdTRGNUNcdUZGMDhcdTVGNTJcdTY4NjMvXHU2MDYyXHU1OTBEXHVGRjA5XHU0RTBFXHU1MjA2XHU2NTJGXHU1RjUyXHU0RTAwXHUzMDAyICovXG4gIGNvbnN0IG1lbW9yeUFjdGlvbiA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5LycgKyBwYXRoLCBib2R5KVxuICAgIGlmIChvaykgYXdhaXQgbG9hZE1lbW9yaWVzKClcbiAgICBlbHNlIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgfVxuXG4gIC8qKiBcdThCQjBcdTVGQzZcdThGNkNcdTdCMTRcdThCQjBcdUZGMUFcdTVGMTVcdTc1MjhcdThGREJcdTVCNjZcdTRFNjBcdTY4NjNcdTY4NDhcdTMwMDIgKi9cbiAgY29uc3QgbWVtb3J5VG9Ob3RlID0gYXN5bmMgKG1lbW9yeTogTWVtb3J5RW50cnkpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IG9rIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3RlcycsIHtcbiAgICAgIHRpdGxlOiBtZW1vcnkudGl0bGUsXG4gICAgICBjb250ZW50OiBtZW1vcnkuY29udGVudCArIChtZW1vcnkuYmFzaXNTaGEgIT09IG51bGwgPyBgXFxuXHVGRjA4XHU2NzY1XHU2RTkwXHVGRjFBXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2ICR7bWVtb3J5LmJhc2lzU2hhLnNsaWNlKDAsIDgpfVx1RkYwOWAgOiAnJyksXG4gICAgICB0YWdzOiAnXHU4QkIwXHU1RkM2LCAnICsgbWVtb3J5LnR5cGUsXG4gICAgfSlcbiAgICBpZiAob2spIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NURGMlx1NjI4QVx1OEJCMFx1NUZDNlx1OEY2Q1x1NEUzQVx1N0IxNFx1OEJCMCcpXG4gIH1cblxuICAvLyBcdTRGMUFcdThCRERcdTYyNTNcdTVGMDAvXHU1MjA3XHU2MzYyXHU2NUY2XHU1Qjk4XHU2NUI5XHU0RjFBIGNsb3NlRGV0YWlscyBcdTY1MzZcdThENzdcdThGNjhcdTkwNTNcdUZGMUJcdTc3MEJcdTk1RThcdTcyRDdcdTZCQ0YgNTAwbXMgXHU2OEMwXHU2N0U1XHVGRjBDXG4gIC8vIFx1NTNFQVx1ODk4MVx1NUY1M1x1NTI0RFx1NjcwOVx1NEYxQVx1OEJERFx1ODAwQ1x1NURFNVx1NEY1Q1x1NTNGMFx1NTIxN1x1NUJCRCA8IDUwcHggXHU1QzMxXHU5MUNEXHU2NUIwXHU2NDkxXHU1RjAwXHVGRjA4XHU3ODZFXHU1QjlBXHU2MDI3XHVGRjBDXHU0RTBEXHU0RjlEXHU4RDU2IGVmZmVjdCBcdTY1RjZcdTVFOEZcdUZGMDlcdTMwMDJcbiAgLy8gXHU1NDBDXHU0RTAwXHU2MkNEXHU3RUY0XHU2MzAxXHU3RURGXHU4QkExXHU4ODRDXHU5NEIzXHU1MjM2XHVGRjFBXHU0RjFBXHU4QkREXHU1MjA3XHU2MzYyXHU0RjFBXHU2MzYyXHU2Mzg5XHU3RURGXHU4QkExXHU4ODRDIERPTVx1RkYwQ1x1NjgzN1x1NUYwRlx1ODg2OFx1N0YzQVx1NTkzMVx1NjVGNlx1NjMwOVx1NUY1M1x1NTI0RFxuICAvLyBcdTY3ODRcdTVFRkFcdTU0QzhcdTVFMENcdTkxQ0RcdTZDRThcdTUxNjVcdUZGMDhcdTVFNDJcdTdCNDlcdUZGMENcdTVERjJcdTVCNThcdTU3MjhcdTUyMTlcdThERjNcdThGQzdcdUZGMDlcdTMwMDJcbiAgY29uc3QgbGF5b3V0RmFjZSA9IChwcm9wcyBhcyB1bmtub3duIGFzIHsgbGF5b3V0PzogeyBvcGVuRGV0YWlscz86ICgpID0+IHZvaWQgfSB9KS5sYXlvdXRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocHJvcHMubGF5b3V0TW9kZSA9PT0gJ292ZXJsYXknKSByZXR1cm5cbiAgICBhcHBseVN0YXRzTGluZUNsYW1wKClcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGMtc3RhdHMtY2xhbXAnKSA9PT0gbnVsbCkgYXBwbHlTdGF0c0xpbmVDbGFtcCgpXG4gICAgICBjb25zdCBjaGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImNlbnRlckNvbFwiXScpXG4gICAgICBjb25zdCB3aWR0aCA9IGNoYXQgPyBNYXRoLnJvdW5kKGNoYXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpIDogLTFcbiAgICAgIGlmICh3aWR0aCAhPT0gLTEgJiYgd2lkdGggPCA1MCkgbGF5b3V0RmFjZT8ub3BlbkRldGFpbHM/LigpXG4gICAgfSwgNTAwKVxuICAgIHJldHVybiAoKSA9PiB7IGNsZWFySW50ZXJ2YWwodGltZXIpIH1cbiAgfSwgW3Byb3BzLnNlc3Npb25JZCwgcHJvcHMubGF5b3V0TW9kZSwgbGF5b3V0RmFjZV0pXG5cbiAgLyoqIFx1NEVFNSBpbXBvcnRhbnQgXHU1MTg1XHU4MDU0XHU2ODM3XHU1RjBGXHU3NkY0XHU2M0E1XHU1MTk5XHU1Qjk4XHU2NUI5XHU3RjUxXHU2ODNDXHU2QTIxXHU2NzdGXHVGRjA4XHU2NzAwXHU5QUQ4XHU0RjE4XHU1MTQ4XHU3RUE3XHVGRjBDXHU0RUZCXHU0RjU1XHU5MUNEXHU2RTMyXHU2N0QzXHU0RTBEXHU0RjFBXHU4OTg2XHU3NkQ2XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGZyYW1lVGVtcGxhdGVTZXQgPSAoY2hhdFB4OiBudW1iZXIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cInNpZGViYXJDb2xcIl0nKVxuICAgIGNvbnN0IHNpZGViYXJXID0gc2lkZWJhciA/IE1hdGgubWF4KDU2LCBNYXRoLnJvdW5kKHNpZGViYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpKSA6IDI4MFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0nKVxuICAgICAgPy5zdHlsZS5zZXRQcm9wZXJ0eSgnZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zJywgc2lkZWJhclcgKyAncHggbWlubWF4KDAsIDFmcikgJyArIGNoYXRQeCArICdweCcsICdpbXBvcnRhbnQnKVxuICB9XG5cbiAgLyoqIFx1NjUzNlx1OEQ3N1x1NjAwMVx1NkEyMVx1Njc3Rlx1RkYxQVx1N0IyQ1x1NEUwOVx1NTIxN1x1RkYwOFx1NUI5OFx1NjVCOVx1OEJFNlx1NjBDNVx1RkYwOTBweFx1MjAxNFx1MjAxNFx1NURFNVx1NEY1Q1x1NTNGMFx1NTE3M1x1OTVFRFx1NTQwRVx1NTNGM1x1NEZBN1x1NTNFQVx1NTE0MVx1OEJCOFx1ODA0QVx1NTkyOVx1RkYwOFx1NEUxQVx1NEUzQlx1ODlDNFx1NTIxOVx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBjb2xsYXBzZUZyYW1lVGVtcGxhdGUgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJzaWRlYmFyQ29sXCJdJylcbiAgICBjb25zdCBzaWRlYmFyVyA9IHNpZGViYXIgPyBNYXRoLm1heCg1NiwgTWF0aC5yb3VuZChzaWRlYmFyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSkgOiAyODBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdJylcbiAgICAgID8uc3R5bGUuc2V0UHJvcGVydHkoJ2dyaWQtdGVtcGxhdGUtY29sdW1ucycsIHNpZGViYXJXICsgJ3B4IG1pbm1heCgwLCAxZnIpIDBweCcsICdpbXBvcnRhbnQnKVxuICB9XG5cbiAgLy8gXHU4MDRBXHU1OTI5XHU1MjE3XHU1QkJEXHU4QkIwXHU1RkM2XHVGRjA4XHU1Qjk4XHU2NUI5IGxheW91dCBzdG9yZSBcdTc3QUNcdTYwMDFcdUZGMDlcdUZGMUFcdTYzMDJcdThGN0RcdTYwNjJcdTU5MEQgKyBcdTYyRDZcdTYyRkRcdTc2RjRcdTUxOTlcdTUxODVcdTgwNTRcdTZBMjFcdTY3N0ZcdTMwMDJcbiAgLy8gXHU1RkM1XHU5ODdCXHU1MTk5IGltcG9ydGFudFx1MjAxNFx1MjAxNExBWU9VVF9TVFlMRSBcdTc2ODRcdTZBMjFcdTY3N0ZcdTg5QzRcdTUyMTlcdTRFNUZcdTY2MkYgaW1wb3J0YW50XHVGRjBDXHU5NzVFIGltcG9ydGFudFxuICAvLyBcdTUxODVcdTgwNTRcdTRGMUFcdTg4QUJcdTVCODNcdTUzOEJcdTUyMzZcdUZGMDhcdThGRDlcdTVDMzFcdTY2MkZcdTZCNjRcdTUyNERcIlx1NjJENlx1NjJGRFx1NzUxRlx1NjU0OFx1MzAwMVx1NTIzN1x1NjVCMFx1NTQwRVx1OEJCMFx1NUZDNlx1NEUyMlx1NTkzMVwiXHU3Njg0XHU1MzlGXHU1NkUwXHVGRjA5XHUzMDAyXG4gIC8vIFx1NUI5OFx1NjVCOSBSZWFjdCBcdTkxQ0RcdTZFMzJcdTY3RDNcdTRGMUFcdTY1MzlcdTUxOTlcdTUxODVcdTgwNTRcdTZBMjFcdTY3N0ZcdUZGMENNdXRhdGlvbk9ic2VydmVyIFx1NjMwOVx1NUY1M1x1NTI0RFx1NTAzQ1x1NUI4OFx1NTM2Qlx1OTFDRFx1NTE5OVxuICAvLyBcdUZGMDhcdTUwM0NcdTc2RjhcdTU0MENcdTRFMERcdTRGMUFcdTg5RTZcdTUzRDFcdTY1QjBcdTc2ODQgbXV0YXRpb25cdUZGMENcdTY1RTBcdTU2REVcdTczQUZcdUZGMDlcdTMwMDJcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocHJvcHMubGF5b3V0TW9kZSA9PT0gJ292ZXJsYXknKSByZXR1cm5cbiAgICBjb25zdCBzYXZlZCA9IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGMuY2hhdFdpZHRoJykgPz8gJycpXG4gICAgY29uc3QgYXBwbHkgPSAoKTogdm9pZCA9PiB7XG4gICAgICAvLyBcdTYzMDJcdThGN0QvXHU1Qjk4XHU2NUI5XHU5MUNEXHU2RTMyXHU2N0QzXHU2NUY2XHU2NUUwXHU2NzYxXHU0RUY2XHU1OTNBXHU1NkRFXHU2QTIxXHU2NzdGXHVGRjA4aW1wb3J0YW50IFx1ODk4Nlx1NTE5OVx1RkYxQlx1NTAzQ1x1NzZGOFx1NTQwQ1x1NjVGNlx1NUI5OFx1NjVCOVx1NjgzN1x1NUYwRlx1NTNEOFx1NjZGNFxuICAgICAgLy8gXHU0RTBEXHU0RjFBXHU4OUU2XHU1M0QxXHU2NUIwXHU3Njg0IG11dGF0aW9uXHVGRjBDXHU2NUUwXHU1NkRFXHU3M0FGXHVGRjA5XHUzMDAyXHU1REU1XHU0RjVDXHU1M0YwXHU1RjAwXHU3NzQwID0gXHU1M0YzXHU1MjE3XHU4MDRBXHU1OTI5XHU1NkZBXHU1QjlBXHU1QkJEXHUzMDAyXG4gICAgICBjb25zdCBjaGF0VyA9IE51bWJlci5pc0Zpbml0ZShzYXZlZCkgJiYgc2F2ZWQgPj0gMjgwID8gc2F2ZWQgOiAzNjBcbiAgICAgIGZyYW1lVGVtcGxhdGVTZXQoY2hhdFcpXG4gICAgfVxuICAgIGFwcGx5KClcbiAgICBjb25zdCBmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0nKVxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4geyBhcHBseSgpIH0pXG4gICAgaWYgKGZyYW1lICE9PSBudWxsKSBvYnNlcnZlci5vYnNlcnZlKGZyYW1lLCB7IGF0dHJpYnV0ZXM6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogWydzdHlsZSddIH0pXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgICAgLy8gXHU1REU1XHU0RjVDXHU1M0YwXHU1Mzc4XHU4RjdEXHVGRjFBXHU1MTk5XHU1MTY1XHU2NTM2XHU4RDc3XHU2MDAxXHU2QTIxXHU2NzdGXHVGRjA4XHU3QjJDXHU0RTA5XHU1MjE3IDBweFx1RkYwOVx1MjAxNFx1MjAxNFx1NEUxQVx1NEUzQlx1ODlDNFx1NTIxOVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1NTE3MyBcdTIxOTIgXHU1M0YzXHU0RkE3XHU1M0VBXHU1MTQxXHU4QkI4XG4gICAgICAvLyBcdTgwNEFcdTU5MjlcdTMwMDJcdTRFMERcdTgwRkRcdTUyMjBcdTk2NjRcdTUxODVcdTgwNTRcdTVDNUVcdTYwMjdcdUZGMDhcdTVCOThcdTY1QjkgUmVhY3QgXHU0RTBEXHU0RjFBXHU0RTNCXHU1MkE4XHU4ODY1XHU1MTk5XHVGRjBDXHU0RjFBXHU1QkZDXHU4MUY0XHU0RTNCXHU1MzNBXHU3QTdBXHU3NjdEXHVGRjA5XHVGRjFCXG4gICAgICAvLyBcdTVCOThcdTY1QjlcdTMwMENcdThCRTZcdTYwQzVcdTMwMERcdTk3NjJcdTY3N0ZcdTg2N0RcdTU2REVcdTUyMzBcdThCRTVcdTUyMTdcdTRGNDYgMCBcdTVCQkRcdTRFMERcdTUzRUZcdTg5QzFcdUZGMDgwLjEuMiBcdTVCOUVcdTZENEJcdTU2REVcdTVGNTJcdUZGMDlcdTMwMDJcbiAgICAgIGNvbGxhcHNlRnJhbWVUZW1wbGF0ZSgpXG4gICAgfVxuICB9LCBbcHJvcHMubGF5b3V0TW9kZV0pXG5cbiAgLyoqIFx1NTIwNlx1OTY5NFx1Njc2MVx1NjJENlx1NjJGRFx1RkYxQVx1OEMwM1x1NjU3NFx1ODA0QVx1NTkyOVx1NTIxN1x1NUJCRFx1RkYwOFx1NURFNVx1NEY1Q1x1NTNGMFx1NTQzOFx1NjUzNlx1NTI2OVx1NEY1OVx1N0E3QVx1OTVGNFx1RkYwOVx1RkYwQ1x1NTE5OVx1NTE2NSBsb2NhbFN0b3JhZ2UgXHU4QkIwXHU1RkM2XHUzMDAyICovXG4gIGNvbnN0IG9uRGl2aWRlckRvd24gPSAoZTogUmVhY3QuUG9pbnRlckV2ZW50KTogdm9pZCA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3Qgb25Nb3ZlID0gKGV2OiBQb2ludGVyRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IHdpZHRoID0gTWF0aC5taW4oOTAwLCBNYXRoLm1heCgyODAsIHdpbmRvdy5pbm5lcldpZHRoIC0gZXYuY2xpZW50WCkpXG4gICAgICBmcmFtZVRlbXBsYXRlU2V0KHdpZHRoKVxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BjLmNoYXRXaWR0aCcsIFN0cmluZyh3aWR0aCkpXG4gICAgfVxuICAgIGNvbnN0IG9uVXAgPSAoKTogdm9pZCA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcClcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKVxuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgZGlzcG9zZWQgPSBmYWxzZVxuICAgIGxldCBnZW5lcmF0aW9uID0gMFxuICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gKytnZW5lcmF0aW9uXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9zdGF0ZT9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpLCB7IGhlYWRlcnM6IHsgYWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicgfSB9KVxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YClcbiAgICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgICBpZiAoIWRpc3Bvc2VkICYmIHJlcXVlc3QgPT09IGdlbmVyYXRpb24pIHtcbiAgICAgICAgICBzZXRTdGF0ZShkYXRhIGFzIFdvcmtzcGFjZVN0YXRlKVxuICAgICAgICAgIHNldExvYWRFcnJvcihudWxsKVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgICBpZiAoIWRpc3Bvc2VkICYmIHJlcXVlc3QgPT09IGdlbmVyYXRpb24pIHNldExvYWRFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgICB9XG4gICAgfVxuICAgIHZvaWQgbG9hZCgpXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IHZvaWQgbG9hZCgpIH0sIDQwMDApXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICB9XG4gIH0sIFtwcm9wcy5zZXNzaW9uSWRdKVxuXG4gIC8vIFx1OEZEQlx1NTE2NVx1NjNEMFx1NEVBNC9cdTdCMTRcdThCQjAvUmV2aWV3IFx1OTg3NVx1N0I3RVx1NjVGNlx1NjMwOVx1OTcwMFx1NjJDOVx1NTNENlx1RkYwOFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1NEY5RFx1OEQ1Nlx1NEYxQVx1OEJERFx1NURFNVx1NEY1Q1x1NTMzQVx1RkYwQ1x1OEY2RVx1OEJFMlx1NjVFMFx1NjEwRlx1NEU0OVx1RkYwOVx1MzAwMlxuICAvLyBcdTYzRDBcdTRFQTRcdTk4NzVcdTRFNUZcdTYyQzlcdTdCMTRcdThCQjBcdUZGMUFcdThGNkVcdTZCMjFcdTY3MkFcdTZEODhcdTUzMTZcdTY4MDdcdThCQjBcdTk3MDBcdTg5ODFcdTMwMENcdTRFMEFcdTZCMjEgQUkgXHU2MDNCXHU3RUQzXHU2NUY2XHU5NUY0XHUzMDBEXHUzMDAyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHRhYiA9PT0gJ2NvbW1pdHMnKSB7IHZvaWQgbG9hZENvbW1pdHMoKTsgdm9pZCBsb2FkTm90ZXMoKSB9XG4gICAgaWYgKHRhYiA9PT0gJ25vdGVzJykgeyB2b2lkIGxvYWROb3RlcygpOyB2b2lkIGxvYWRNZW1vcmllcygpOyBpZiAoY29tbWl0c0RhdGEgPT09IG51bGwpIHZvaWQgbG9hZENvbW1pdHMoKSB9XG4gICAgaWYgKHRhYiA9PT0gJ3JldmlldycpIHZvaWQgbG9hZElzc3VlcygpXG4gICAgaWYgKHRhYiA9PT0gJ2V4ZWN1dGlvbicpIHsgdm9pZCBsb2FkU2NoZWR1bGVkKCk7IGlmIChydW5EZXRhaWwgIT09IG51bGwpIHZvaWQgbG9hZFJ1bkRldGFpbChydW5EZXRhaWwucnVuLmlkKSB9XG4gICAgaWYgKHRhYiA9PT0gJ3NldHRpbmdzJyAmJiBtb2RlbFRpZXJzID09PSBudWxsKSB2b2lkIGxvYWRNb2RlbENvbmZpZygpXG4gIH0sIFt0YWIsIHByb3BzLnNlc3Npb25JZF0pXG5cbiAgY29uc3QgbG9hZE1vZGVsQ29uZmlnID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9tb2RlbC1jb25maWcnKVxuICAgICAgaWYgKCFyZXNwb25zZS5vaykgcmV0dXJuXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBzZXRNb2RlbFRpZXJzKChkYXRhIGFzIHsgdGllcnM6IFJlY29yZDxzdHJpbmcsIHsgcHJvdmlkZXI6IHN0cmluZzsgbW9kZWw6IHN0cmluZyB9PiB9KS50aWVycyA/PyB7fSlcbiAgICAgIHNldE1vZGVsT3B0aW9ucygoZGF0YSBhcyB7IG9wdGlvbnM6IEFycmF5PHsgcHJvdmlkZXI6IHN0cmluZzsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nIH0+IH0pLm9wdGlvbnMgPz8gW10pXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTZBMjFcdTU3OEJcdTkxNERcdTdGNkVcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcbiAgICB9XG4gIH1cblxuICBjb25zdCBzYXZlTW9kZWxDb25maWcgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKG1vZGVsVGllcnMgPT09IG51bGwpIHJldHVyblxuICAgIHNldE1vZGVsU2F2aW5nKHRydWUpXG4gICAgc2V0TW9kZWxTYXZlZChmYWxzZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbW9kZWwtY29uZmlnJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdGllcnM6IG1vZGVsVGllcnMgfSksXG4gICAgICB9KVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHNldE1vZGVsU2F2ZWQodHJ1ZSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHNldE1vZGVsU2F2ZWQoZmFsc2UpIH0sIDI1MDApXG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldE1vZGVsU2F2aW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlZnJlc2hTdGF0ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCByZWZyZXNoZWQgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvc3RhdGU/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSwgeyBoZWFkZXJzOiB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0gfSlcbiAgICBpZiAocmVmcmVzaGVkLm9rKSBzZXRTdGF0ZShhd2FpdCByZWZyZXNoZWQuanNvbigpIGFzIFdvcmtzcGFjZVN0YXRlKVxuICB9XG5cbiAgLyoqIFx1N0VERlx1NEUwMFx1NTJBOFx1NEY1Q1x1NjI2N1x1ODg0Q1x1NTY2OFx1RkYxQVBPU1QgXHU1QkJGXHU0RTNCIEFQSVx1RkYwOFx1NjQzQVx1NUUyNlx1NEYxQVx1OEJERCBpZCBcdTRGOUJcdTY3MERcdTUyQTFcdTdBRUZcdTVCOUFcdTRGNERcdTk4NzlcdTc2RUVcdTVERTVcdTRGNUNcdTUzM0FcdUZGMDlcdUZGMENcdThGOTNcdTUxRkFcdThGREJcdTdFRDNcdTY3OUNcdTk3NjJcdTY3N0ZcdUZGMENcdTVCOENcdTYyMTBcdTU0MEVcdTUyMzdcdTY1QjBcdTcyQjZcdTYwMDFcdTMwMDIgKi9cbiAgY29uc3QgcnVuQWN0aW9uID0gYXN5bmMgKG5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldEJ1c3kobmFtZSlcbiAgICBzZXRBY3Rpb25SZXN1bHQobnVsbClcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdChwYXRoLCBib2R5KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoYFx1MjcxNyAke1N0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpfWApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KGZvcm1hdEFjdGlvblJlc3VsdChkYXRhKSlcbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdChgXHUyNzE3ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWApXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJ1c3kobnVsbClcbiAgICB9XG4gIH1cblxuICBjb25zdCBydW5Cb290c3RyYXAgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0Qm9vdHN0cmFwcGluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ib290c3RyYXAnLCB7fSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0TG9hZEVycm9yKFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldExvYWRFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJvb3RzdHJhcHBpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29uZmlybU1lbW9yeSA9IGFzeW5jIChtZW1vcnlJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5L2NvbmZpcm0nLCB7IG1lbW9yeUlkIH0pXG4gICAgaWYgKG9rKSB7XG4gICAgICBzZXRTdGF0ZSgocHJldmlvdXMpID0+IHByZXZpb3VzID09PSBudWxsID8gcHJldmlvdXMgOiB7XG4gICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICBtZW1vcmllczogcHJldmlvdXMubWVtb3JpZXM/Lm1hcCgobWVtb3J5KSA9PiBtZW1vcnkuaWQgPT09IG1lbW9yeUlkID8geyAuLi5tZW1vcnksIGlzSHVtYW5Db25maXJtZWQ6IHRydWUsIHRydXRoTGV2ZWw6ICdmYWN0JyB9IDogbWVtb3J5KSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcHJvamVjdCA9IHN0YXRlPy5wcm9qZWN0ID8/IG51bGxcbiAgY29uc3QgYm9vdHN0cmFwID0gc3RhdGU/LmJvb3RzdHJhcCA/PyBudWxsXG4gIGNvbnN0IGNoYW5nZXMgPSBzdGF0ZT8uY2hhbmdlcyA/PyBbXVxuICBjb25zdCBydW5zID0gc3RhdGU/LnJ1bnMgPz8gW11cbiAgY29uc3QgdmVyaWZpY2F0aW9ucyA9IHN0YXRlPy52ZXJpZmljYXRpb25zID8/IFtdXG4gIGNvbnN0IGNvbmZpcm1lZCA9IHN0YXRlPy5jb25maXJtZWQgPz8gW11cbiAgY29uc3QgY29uY2VwdHMgPSBzdGF0ZT8uY29uY2VwdHMgPz8gW11cblxuICBjb25zdCB0YWJzOiBBcnJheTx7IGtleTogVGFiS2V5OyBsYWJlbDogc3RyaW5nIH0+ID0gW1xuICAgIHsga2V5OiAnY29tbWl0cycsIGxhYmVsOiB0KCd0YWIuY29tbWl0cycpIH0sXG4gICAgeyBrZXk6ICdvdmVydmlldycsIGxhYmVsOiB0KCd0YWIub3ZlcnZpZXcnKSB9LFxuICAgIHsga2V5OiAnZXhlY3V0aW9uJywgbGFiZWw6IHQoJ3RhYi5leGVjdXRpb24nKSB9LFxuICAgIHsga2V5OiAncmV2aWV3JywgbGFiZWw6IHQoJ3RhYi5yZXZpZXcnKSB9LFxuICAgIHsga2V5OiAnbm90ZXMnLCBsYWJlbDogdCgndGFiLm5vdGVzJykgfSxcbiAgICB7IGtleTogJ3NldHRpbmdzJywgbGFiZWw6IHQoJ3RhYi5zZXR0aW5ncycpIH0sXG4gIF1cblxuICAvKiogXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDXHU5NzYyXHU2NzdGXHVGRjA4XHU2MDNCXHU4OUM4XHU5ODc1XHU3QjdFXHU3Njg0XHU1RkVCXHU2Mzc3XHU1MkE4XHU0RjVDXHU1MTcxXHU3NTI4XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHJlc3VsdFBhbmVsID0gYWN0aW9uUmVzdWx0ICE9PSBudWxsXG4gICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KENhcmQsIHsgdGl0bGU6IHQoJ3Jlc3VsdC5wYW5lbCcpIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5yZXN1bHQgfSwgYWN0aW9uUmVzdWx0KSlcbiAgICA6IG51bGxcbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcbiAgLy8gXHU5ODc2XHU5MEU4XHVGRjFBXHU0RUQzXHU1RTkzXHU2ODBGICsgXHU2M0QwXHU0RUE0XHU1OTFBXHU5MDA5XHU0RTBCXHU2MkM5XHVGRjA4XHU3RUE2IDEvNSBcdTlBRDhcdTVFQTZcdUZGMDlcdUZGMUJcdTRFMEJcdTY1QjlcdTY3N0ZcdTU3NTdcdTUzNjBcdTUxNjhcdTVCQkRcdTMwMDJcbiAgY29uc3QgYWxsVGFyZ2V0czogQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgbWV0YTogc3RyaW5nOyBzaGE6IHN0cmluZyB9PiA9IFtdXG4gIGlmIChjb21taXRzRGF0YSAhPT0gbnVsbCkge1xuICAgIGlmICghY29tbWl0c0RhdGEud29ya2luZy5pc0NsZWFuKSB7XG4gICAgICBhbGxUYXJnZXRzLnB1c2goe1xuICAgICAgICBrZXk6ICd3b3JraW5nJyxcbiAgICAgICAgbGFiZWw6IGBcdTI1Q0YgJHt0KCdyZXBvLndvcmtpbmcnKX1cdUZGMDgke2NvbW1pdHNEYXRhLndvcmtpbmcuZmlsZUNvdW50fVx1RkYwOWAsXG4gICAgICAgIG1ldGE6IGNvbW1pdHNEYXRhLndvcmtpbmcuZmlsZXMuc2xpY2UoMCwgMykubWFwKChmaWxlKSA9PiBmaWxlLnBhdGguc3BsaXQoJy8nKS5wb3AoKSkuam9pbignLCAnKSxcbiAgICAgICAgc2hhOiAnd29ya2luZycsXG4gICAgICB9KVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGNvbW1pdCBvZiBjb21taXRzRGF0YS5jb21taXRzKSB7XG4gICAgICBjb25zdCBhZGRzID0gY29tbWl0LmZpbGVzLnJlZHVjZSgoc3VtLCBmaWxlKSA9PiBzdW0gKyBmaWxlLmFkZHMsIDApXG4gICAgICBjb25zdCBkZWxzID0gY29tbWl0LmZpbGVzLnJlZHVjZSgoc3VtLCBmaWxlKSA9PiBzdW0gKyBmaWxlLmRlbHMsIDApXG4gICAgICBhbGxUYXJnZXRzLnB1c2goe1xuICAgICAgICBrZXk6IGNvbW1pdC5zaGEsXG4gICAgICAgIGxhYmVsOiBjb21taXQuc3ViamVjdCxcbiAgICAgICAgbWV0YTogYCR7Y29tbWl0LnNob3J0SGFzaH0gXHUwMEI3ICR7Y29tbWl0LmF1dGhvcn0gXHUwMEI3ICR7bmV3IERhdGUoY29tbWl0LmRhdGUpLnRvTG9jYWxlU3RyaW5nKCl9IFx1MDBCNyArJHthZGRzfS8tJHtkZWxzfWAsXG4gICAgICAgIHNoYTogY29tbWl0LnNoYSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIGNvbnN0IHNob3J0TGFiZWwgPSAoc2hhOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGlmIChzaGEgPT09ICd3b3JraW5nJykgcmV0dXJuIHQoJ3JlcG8ud29ya2luZycpXG4gICAgY29uc3QgdGFyZ2V0ID0gYWxsVGFyZ2V0cy5maW5kKChlbnRyeSkgPT4gZW50cnkuc2hhID09PSBzaGEpXG4gICAgcmV0dXJuIGAkeyh0YXJnZXQ/Lm1ldGEuc3BsaXQoJyBcdTAwQjcgJylbMF0pID8/IHNoYS5zbGljZSgwLCA3KX0gJHt0YXJnZXQ/LmxhYmVsID8/ICcnfWAudHJpbSgpXG4gIH1cbiAgY29uc3QgZmlsdGVyZWRUYXJnZXRzID0gcGlja2VyRmlsdGVyLnRyaW0oKSA9PT0gJydcbiAgICA/IGFsbFRhcmdldHNcbiAgICA6IGFsbFRhcmdldHMuZmlsdGVyKChlbnRyeSkgPT4gKGVudHJ5LmxhYmVsICsgZW50cnkubWV0YSkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhwaWNrZXJGaWx0ZXIudHJpbSgpLnRvTG93ZXJDYXNlKCkpKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdThGNkVcdTZCMjFcdTgwNUFcdTdDN0JcdTRFMEVcdTY3MkFcdTZEODhcdTUzMTZcdTY4MDdcdThCQjAgXHUyNTAwXHUyNTAwIFx1ODA1QVx1N0M3Qlx1ODlDNFx1NTIxOVx1NEUwRVx1NjcwRFx1NTJBMVx1N0FFRiBjbHVzdGVyQ29tbWl0cyBcdTRFMDBcdTgxRjRcdUZGMDhcdTY1RjZcdTk1RjRcdTdBOTdcdTUzRTMgK1xuICAvLyBcdTY1ODdcdTRFRjZcdTk2RjZcdTkxQ0RcdTUzRTBcdUZGMENcdTg5QzEgY29tbWl0LXJvdW5kcy50c1x1RkYwOVx1RkYxQlx1NjcyQVx1NkQ4OFx1NTMxNiA9IFx1NEUwQVx1NkIyMSBBSSBcdTYwM0JcdTdFRDNcdTRFNEJcdTU0MEVcdTc2ODRcdTYzRDBcdTRFQTRcdTMwMDJcbiAgY29uc3QgY29tbWl0QnlTaGEgPSBuZXcgTWFwKChjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSkubWFwKChjb21taXQpID0+IFtjb21taXQuc2hhLCBjb21taXRdKSlcbiAgY29uc3QgbGFzdFN1bW1hcnlBdCA9IG5vdGVzXG4gICAgLmZpbHRlcigobm90ZSkgPT4gbm90ZS5zaGEgPT09ICdzdW1tYXJ5JylcbiAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+IHJpZ2h0LmNyZWF0ZWRBdCAtIGxlZnQuY3JlYXRlZEF0KVswXT8uY3JlYXRlZEF0XG4gIGNvbnN0IGlzVW5kaWdlc3RlZCA9IChjb21taXQ6IHsgc2hhOiBzdHJpbmc7IGRhdGU6IG51bWJlciB9KTogYm9vbGVhbiA9PiB7XG4gICAgaWYgKGNvbW1pdC5zaGEgPT09ICd3b3JraW5nJykgcmV0dXJuIGZhbHNlXG4gICAgLy8gXHU1REYyXHU3NTFGXHU2MjEwXHU4RkM3IEFJIFx1ODlFM1x1OEJGQlx1RkYwOGFuYWx5emVkIFx1NjgwN1x1OEJCMFx1RkYwOVx1NTM3M1x1ODlDNlx1NEUzQVx1NURGMlx1NkQ4OFx1NTMxNlx1RkYxQlx1NTQyNlx1NTIxOVx1NjVCMFx1NEU4RVx1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NzY4NFx1OTBGRFx1N0I5N1x1NjcyQVx1NkQ4OFx1NTMxNlx1MzAwMlxuICAgIGlmIChjb21taXRCeVNoYS5nZXQoY29tbWl0LnNoYSk/LmFuYWx5emVkID09PSB0cnVlKSByZXR1cm4gZmFsc2VcbiAgICByZXR1cm4gbGFzdFN1bW1hcnlBdCA9PT0gdW5kZWZpbmVkIHx8IGNvbW1pdC5kYXRlID4gbGFzdFN1bW1hcnlBdFxuICB9XG4gIGNvbnN0IHVuZGlnZXN0ZWRDb3VudCA9IChjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSkuZmlsdGVyKChjb21taXQpID0+IGlzVW5kaWdlc3RlZChjb21taXQpKS5sZW5ndGhcbiAgY29uc3QgY29tbWl0Um91bmRzID0gY2x1c3RlckludG9Sb3VuZHMoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pXG5cbiAgLyoqIFx1NEUwQlx1NjJDOVx1Njg0Nlx1NzY4NFx1NjNEMFx1NEVBNFx1ODg0Q1x1RkYwOFx1NTQyQlx1NjcyQVx1NkQ4OFx1NTMxNlx1NTcwNlx1NzBCOVx1RkYxQndvcmtpbmcgXHU2NzYxXHU3NkVFXHU0RTBEXHU2ODA3XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHJlbmRlclBpY2tlclJvdyA9IChlbnRyeTogeyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgbWV0YTogc3RyaW5nOyBzaGE6IHN0cmluZyB9KTogUmVhY3QuUmVhY3ROb2RlID0+IHtcbiAgICBjb25zdCBjb21taXQgPSBjb21taXRCeVNoYS5nZXQoZW50cnkuc2hhKVxuICAgIGNvbnN0IHVuZGlnZXN0ZWQgPSBjb21taXQgIT09IHVuZGVmaW5lZCAmJiBpc1VuZGlnZXN0ZWQoY29tbWl0KVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGtleT17ZW50cnkua2V5fVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBhZGRpbmc6ICc3cHggMTJweCcsIGN1cnNvcjogJ3BvaW50ZXInLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgIGJhY2tncm91bmQ6IHNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhlbnRyeS5zaGEpID8gJ3JnYmEoMzcsOTksMjM1LDAuMDcpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgIH19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCB0b2dnbGVUYXJnZXQoZW50cnkuc2hhKSB9fVxuICAgICAgPlxuICAgICAgICA8c3BhbiBzdHlsZT17eyB3aWR0aDogJzE0cHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsIGZvbnRXZWlnaHQ6IDcwMCB9fT5cbiAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKGVudHJ5LnNoYSkgPyAnXHUyNzEzJyA6ICcnfVxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIHt1bmRpZ2VzdGVkICYmIChcbiAgICAgICAgICA8c3BhbiB0aXRsZT17dCgncGlja2VyLnVuZGlnZXN0ZWQnKX0gc3R5bGU9e3sgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JyksIGZvbnRTaXplOiAnMTBweCcsIGZsZXhTaHJpbms6IDAgfX0+XHUyNUNGPC9zcGFuPlxuICAgICAgICApfVxuICAgICAgICA8c3BhbiBzdHlsZT17eyBtaW5XaWR0aDogMCB9fT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT57ZW50cnkubGFiZWx9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PntlbnRyeS5tZXRhfTwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgY29uc3QgaW1wYWN0Umlza0NvbG9yID0gdGhlbWVBd2FyZVRleHQoaW1wYWN0ID09PSBudWxsID8gJyM1NzYwNmEnIDogKFJJU0tfQ09MT1JbaW1wYWN0LnJpc2tMZXZlbF0gPz8gJyM1NzYwNmEnKSlcblxuICBjb25zdCBjb21taXRzVGFiID0gKFxuICAgIDw+XG4gICAgICB7LyogXHU0RUQzXHU1RTkzXHU2ODBGICovfVxuICAgICAgPENhcmQ+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9Pntjb21taXRzRGF0YT8uYnJhbmNoID8/ICdcdTIwMTQnfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnIH19Pntjb21taXRzRGF0YT8ucm9vdFBhdGggPz8gcHJvamVjdD8ucm9vdFBhdGggPz8gJ1x1MjAxNCd9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZENvbW1pdHMoKSB9fT57dCgnYWN0aW9uLnJlZnJlc2gnKX08L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtidXN5ICE9PSBudWxsfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignc2Nhbkhpc3RvcnknLCAnL3Byb2plY3QtY29udHJvbC9hcGkvYm9vdHN0cmFwJywgeyBpbmNsdWRlSGlzdG9yeTogdHJ1ZSwgc3VtbWFyaXplOiB0cnVlLCBtYXhDb21taXRzOiAzMCB9KSB9fVxuICAgICAgICAgID57YnVzeSA9PT0gJ3NjYW5IaXN0b3J5JyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdyZXBvLnNjYW5IaXN0b3J5Jyl9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9DYXJkPlxuICAgICAgey8qIFx1NjNEMFx1NEVBNFx1NTkxQVx1OTAwOVx1NEUwQlx1NjJDOVx1RkYwOFx1N0QyN1x1NTFEMVx1RkYxQlx1OTAwOVx1NEUyRFx1NTE4NVx1NUJCOVx1NUI4Q1x1NjU3NFx1NUM1NVx1NzkzQVx1RkYwQ1x1NTE0MVx1OEJCOFx1ODFFQVx1NzEzNlx1NjM2Mlx1ODg0Q1x1RkYwOSAqL31cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdwaWNrZXIudGl0bGUnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgd2lkdGg6ICcxMDAlJywgdGV4dEFsaWduOiAnbGVmdCcsIGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCB3aGl0ZVNwYWNlOiAnbm9ybWFsJyB9fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRQaWNrZXJPcGVuKCFwaWNrZXJPcGVuKSB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1pbldpZHRoOiAwIH19PlxuICAgICAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgICAgID8gdCgncGlja2VyLnBsYWNlaG9sZGVyJylcbiAgICAgICAgICAgICAgICA6IGAke3QoJ3BpY2tlci5zZWxlY3RlZCcpfSAke3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGh9XHVGRjFBJHtzZWxlY3RlZFRhcmdldHMubWFwKHNob3J0TGFiZWwpLmpvaW4oJ1x1RkYxQicpfWB9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAnOHB4JywgZmxleFNocmluazogMCB9fT5cdTI1QkU8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAge3BpY2tlck9wZW4gJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIHpJbmRleDogMjkgfX0gb25DbGljaz17KCkgPT4geyBzZXRQaWNrZXJPcGVuKGZhbHNlKSB9fSAvPlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJ2NhbGMoMTAwJSArIDRweCknLCBsZWZ0OiAwLCByaWdodDogMCwgekluZGV4OiAzMCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLCBib3hTaGFkb3c6ICcwIDhweCAyNHB4IHJnYmEoMCwwLDAsMC4xMiknLCBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzhweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLmlucHV0fVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dCgncGlja2VyLmZpbHRlcicpfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cGlja2VyRmlsdGVyfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0UGlja2VyRmlsdGVyKGUudGFyZ2V0LnZhbHVlKSB9fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIHsoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLnNvbWUoKGNvbW1pdCkgPT4gaXNVbmRpZ2VzdGVkKGNvbW1pdCkpICYmIChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fVxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdwaWNrZXIudW5kaWdlc3RlZCcpfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2VsZWN0Q29tbWl0cygoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLmZpbHRlcigoY29tbWl0KSA9PiBpc1VuZGlnZXN0ZWQoY29tbWl0KSkubWFwKChjb21taXQpID0+IGNvbW1pdC5zaGEpKSB9fVxuICAgICAgICAgICAgICAgICAgICA+XHUyNUNGIHt0KCdwaWNrZXIuc2VsZWN0QWxsVW5kaWdlc3RlZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgc2V0U2VsZWN0ZWRUYXJnZXRzKFtdKSB9fT57dCgncGlja2VyLmNsZWFyJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXhIZWlnaHQ6IDQyMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XG4gICAgICAgICAgICAgICAgICB7cGlja2VyRmlsdGVyLnRyaW0oKSA9PT0gJycgPyAoXG4gICAgICAgICAgICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gXHU2RDRGXHU4OUM4XHU4OUM2XHU1NkZFXHVGRjFBd29ya2luZyBcdTY3NjFcdTc2RUUgKyBcdTYzMDlcdThGNkVcdTZCMjFcdTUyMDZcdTdFQzRcdTc2ODRcdTYzRDBcdTRFQTRcdUZGMDhcdTUzNTVcdTYzRDBcdTRFQTRcdThGNkVcdTRFMERcdTY2M0VcdTc5M0FcdTdFQzRcdTU5MzRcdUZGMENcdTkwN0ZcdTUxNERcdTU2NkFcdTk3RjNcdUZGMDlcdTMwMDJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlczogUmVhY3QuUmVhY3ROb2RlW10gPSBbXVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtpbmcgPSBhbGxUYXJnZXRzLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5zaGEgPT09ICd3b3JraW5nJylcbiAgICAgICAgICAgICAgICAgICAgICBpZiAod29ya2luZyAhPT0gdW5kZWZpbmVkKSBub2Rlcy5wdXNoKHJlbmRlclBpY2tlclJvdyh3b3JraW5nKSlcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBieVNoYSA9IG5ldyBNYXAoYWxsVGFyZ2V0cy5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5zaGEgIT09ICd3b3JraW5nJykubWFwKChlbnRyeSkgPT4gW2VudHJ5LnNoYSwgZW50cnldKSlcbiAgICAgICAgICAgICAgICAgICAgICBjb21taXRSb3VuZHMuZm9yRWFjaCgocm91bmQsIHJvdW5kSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudHJpZXMgPSByb3VuZC5jb21taXRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKGNvbW1pdCkgPT4gYnlTaGEuZ2V0KGNvbW1pdC5zaGEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IG1ldGE6IHN0cmluZzsgc2hhOiBzdHJpbmcgfSA9PiBlbnRyeSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJpZXMubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyaWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKHJlbmRlclBpY2tlclJvdyhlbnRyaWVzWzBdISkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hhcyA9IGVudHJpZXMubWFwKChlbnRyeSkgPT4gZW50cnkuc2hhKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsU2VsZWN0ZWQgPSBzaGFzLmV2ZXJ5KChzaGEpID0+IHNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhzaGEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2Byb3VuZC0ke3JvdW5kSW5kZXh9YH0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnOHB4JywgcGFkZGluZzogJzZweCAxMnB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwzLCByZ2JhKDUsNSw1LDAuMDYpKScsIGZvbnRTaXplOiAnMTFweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHVEODNEXHVEREQzIHt0KHJvdW5kSW5kZXggPT09IDAgPyAncGlja2VyLnJvdW5kTGF0ZXN0JyA6ICdwaWNrZXIucm91bmQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcocm91bmRJbmRleCArIDEpKX0gXHUwMEI3IHtTdHJpbmcoZW50cmllcy5sZW5ndGgpfSB7dCgncmVwby5jb21taXRzJyl9IFx1MDBCNyB7bmV3IERhdGUocm91bmQuZmlyc3RBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCl9XHUyMDEze25ldyBEYXRlKHJvdW5kLmxhc3RBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNlbGVjdFJvdW5kKHNoYXMpIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2FsbFNlbGVjdGVkID8gdCgncGlja2VyLnJvdW5kQ2xlYXInKSA6IHQoJ3BpY2tlci5yb3VuZFNlbGVjdCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4sXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIG5vZGVzLnB1c2gocmVuZGVyUGlja2VyUm93KGVudHJ5KSlcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2Rlc1xuICAgICAgICAgICAgICAgICAgICB9KSgpXG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZFRhcmdldHMubWFwKChlbnRyeSkgPT4gcmVuZGVyUGlja2VyUm93KGVudHJ5KSlcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7KHBpY2tlckZpbHRlci50cmltKCkgPT09ICcnID8gYWxsVGFyZ2V0cyA6IGZpbHRlcmVkVGFyZ2V0cykubGVuZ3RoID09PSAwICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3BpY2tlci5ub01hdGNoJyl9PC9kaXY+fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luVG9wOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ3BpY2tlci5oaW50Jyl9PC9zcGFuPlxuICAgICAgICAgIHt1bmRpZ2VzdGVkQ291bnQgPiAwICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxzcGFuIHRpdGxlPXt0KCdwaWNrZXIudW5kaWdlc3RlZCcpfSBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSB9fT5cbiAgICAgICAgICAgICAgICBcdTI1Q0Yge3QoJ3BpY2tlci51bmRpZ2VzdGVkQ291bnQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcodW5kaWdlc3RlZENvdW50KSl9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gdGl0bGU9e3QoJ3BpY2tlci5kaWdlc3RBbGxIaW50Jyl9IG9uQ2xpY2s9e2RpZ2VzdEFsbH0+XHUyNkExIHt0KCdwaWNrZXIuZGlnZXN0QWxsJyl9PC9idXR0b24+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHsoZGV0YWlsUXVldWVkQ291bnQgPiAwIHx8IGRldGFpbFJ1bm5pbmdDb3VudCA+IDApICYmIChcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNkY2RjYWEnKX0+XG4gICAgICAgICAgICAgIHtkZXRhaWxSdW5uaW5nQ291bnQgPiAwID8gdCgnZGV0YWlsLmFpTG9hZGluZycpIDogJyd9XG4gICAgICAgICAgICAgIHtkZXRhaWxSdW5uaW5nQ291bnQgPiAwICYmIGRldGFpbFF1ZXVlZENvdW50ID4gMCA/ICcgJyA6ICcnfVxuICAgICAgICAgICAgICB7ZGV0YWlsUXVldWVkQ291bnQgPiAwID8gJ1x1MjNGMyAnICsgdCgnZGV0YWlsLnF1ZXVlZCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhkZXRhaWxRdWV1ZWRDb3VudCkpIDogJyd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NhcmQ+XG5cbiAgICAgIHtjb21taXRzRXJyb3IgIT09IG51bGwgJiYgPENhcmQ+PGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncmVwby5sb2FkRmFpbGVkJyl9OiB7Y29tbWl0c0Vycm9yfTwvZGl2PjwvQ2FyZD59XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCAmJiA8Q2FyZD48ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdkZXRhaWwucGljaycpfTwvZGl2PjwvQ2FyZD59XG5cbiAgICAgIHsvKiBcdTVERTVcdTRGNUNcdThGNkVcdTZCMjFcdTUzRDlcdTRFOEJcdUZGMUFcdTU5MUFcdTYzRDBcdTRFQTRcdTY1NzRcdTRGNTNcdTg5RTNcdThCRkIgKi99XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmZpbHRlcigodGFyZ2V0KSA9PiB0YXJnZXQgIT09ICd3b3JraW5nJykubGVuZ3RoID49IDIgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17J1x1RDgzRFx1RENENiAnICsgdCgnbmFycmF0aXZlLnRpdGxlJyl9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiBuYXJyYXRpdmUgPT09IG51bGwgPyAnMCcgOiAnOHB4JyB9fT5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtuYXJyYXRpdmVCdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZE5hcnJhdGl2ZSgpIH19PlxuICAgICAgICAgICAgICB7bmFycmF0aXZlQnVzeSA/IHQoJ25hcnJhdGl2ZS5ydW5uaW5nJykgOiAnXHUyNzI4ICcgKyB0KCduYXJyYXRpdmUuZ2VuZXJhdGUnKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAge25hcnJhdGl2ZSAhPT0gbnVsbCAmJiBuYXJyYXRpdmUuY2FjaGVkICYmIChcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ2NhY2hlLmhpdCcpfXtuYXJyYXRpdmUuZ2VuZXJhdGVkQXQgIT09IHVuZGVmaW5lZCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShuYXJyYXRpdmUuZ2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ308L3NwYW4+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge25hcnJhdGl2ZSAhPT0gbnVsbCAmJiByZW5kZXJDb3N0QmFkZ2UobmFycmF0aXZlLmNvc3RVc2QsIHQoJ2Nvc3QudG9vbHRpcCcpKX1cbiAgICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17bmFycmF0aXZlQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWROYXJyYXRpdmUodHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtuYXJyYXRpdmVFcnJvciAhPT0gJycgJiYgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuZW1wdHksIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2QxMjQyZicpIH19PntuYXJyYXRpdmVFcnJvcn08L2Rpdj59XG4gICAgICAgICAge25hcnJhdGl2ZSAhPT0gbnVsbCAmJiA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Ub3A6ICc0cHgnIH19Pnt0KCduYXJyYXRpdmUuZGlnZXN0SGludCcpfTwvZGl2Pn1cbiAgICAgICAgICB7bmFycmF0aXZlICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcgfX0+e3JlbmRlclN0cnVjdHVyZWRDb250ZW50KG5hcnJhdGl2ZS5uYXJyYXRpdmUpfTwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBcdTZCQ0ZcdTY3NjFcdTkwMDlcdTRFMkRcdTYzRDBcdTRFQTRcdTc2ODQgQUkgXHU4OUUzXHU4QkZCICovfVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5tYXAoKHRhcmdldCkgPT4ge1xuICAgICAgICBjb25zdCBkID0gZGV0YWlsc1t0YXJnZXRdXG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IChkPy5jb21taXQ/Lm1lc3NhZ2UgPz8gdGFyZ2V0LnNsaWNlKDAsIDgpKVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxDYXJkIGtleT17YGQtJHt0YXJnZXR9YH0gdGl0bGU9e2BcdUQ4M0RcdUREMEQgJHtsYWJlbH0ke3RhcmdldCAhPT0gJ3dvcmtpbmcnID8gYFx1RkYwOCR7dGFyZ2V0LnNsaWNlKDAsIDgpfVx1RkYwOWAgOiAnJ31gfT5cbiAgICAgICAgICAgIHtkICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAge2QuYW5hbHlzaXNDYWNoZWQgPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57dCgnY2FjaGUuaGl0Jyl9e2QuYW5hbHlzaXNHZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShkLmFuYWx5c2lzR2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7cmVuZGVyQ29zdEJhZGdlKGQuYW5hbHlzaXNDb3N0VXNkLCB0KCdjb3N0LnRvb2x0aXAnKSArIChkLmFuYWx5c2lzVG9rZW5zID8gYFx1RkYwOGluICR7ZC5hbmFseXNpc1Rva2Vucy5pbnB1dH0gLyBvdXQgJHtkLmFuYWx5c2lzVG9rZW5zLm91dHB1dH0gdG9rZW5zXHVGRjA5YCA6ICcnKSl9XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBsb2FkRGV0YWlsKHRhcmdldCwgdHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XG4gICAgICAgICAgICAgICAgICB0aXRsZT17dCgnZGV0YWlsLnNhdmVOb3RlSGludCcpfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGEgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/ICd3b3JraW5nJyA6IHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB2b2lkIHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzJywge1xuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBgJHt0KCdkZXRhaWwuc2F2ZU5vdGVUaXRsZScpfVx1RkYxQSR7KGQuY29tbWl0Py5tZXNzYWdlID8/IHRhcmdldCkuc2xpY2UoMCwgNjApfWAsXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDogW2BcdTMwMTBcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDhcdTMwMTFcXG4ke2QuYW5hbHlzaXMud2hhdH1gLCBgXHUzMDEwXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxXHUzMDExXFxuJHsoZC5hbmFseXNpcy5sb2dpYyA/PyBbXSkuam9pbignXHVGRjFCJyl9YCwgYFx1MzAxMFx1OThDRVx1OTY2OVx1NzBCOVx1MzAxMVxcbiR7KGQuYW5hbHlzaXMucmlza3MgPz8gW10pLmpvaW4oJ1x1RkYxQicpfWBdLmZpbHRlcigoYmxvY2spID0+ICFibG9jay5lbmRzV2l0aCgnXHUzMDExXFxuJykpLmpvaW4oJ1xcblxcbicpLFxuICAgICAgICAgICAgICAgICAgICAgIHNoYSwgdGFnczogJ1x1NjgzOFx1NjdFNScsXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHsgb2sgfSkgPT4geyBzZXRBY3Rpb25SZXN1bHQob2sgPyAnXHUyNzEzIFx1NURGMlx1NUI1OFx1NEUzQVx1N0IxNFx1OEJCMFx1RkYwOFx1N0IxNFx1OEJCMFx1OTg3NVx1NTNFRlx1NjdFNVx1NzcwQlx1RkYwOScgOiAnXHUyNzE3IFx1NEZERFx1NUI1OFx1NTkzMVx1OEQyNScpIDsgaWYgKG9rKSB2b2lkIGxvYWROb3RlcygpIH0pXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cdUQ4M0RcdURDQkUge3QoJ2RldGFpbC5zYXZlTm90ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ2RldGFpbC5zYXZlTWVtb3J5SGludCcpfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGEgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/IHVuZGVmaW5lZCA6IHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB2b2lkIHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeScsIHtcbiAgICAgICAgICAgICAgICAgICAgICBtZW1vcnlUeXBlOiAncmlza19ob3RzcG90Jywgc291cmNlVGFnOiAncmV2aWV3JywgYmFzaXNTaGE6IHNoYSxcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogYFx1NjgzOFx1NjdFNVx1N0VEM1x1OEJCQVx1RkYxQSR7KGQuY29tbWl0Py5tZXNzYWdlID8/IHRhcmdldCkuc2xpY2UoMCwgNjApfWAsXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDogW2QuYW5hbHlzaXMud2hhdCwgKGQuYW5hbHlzaXMucmlza3MgPz8gW10pLmpvaW4oJ1x1RkYxQicpXS5maWx0ZXIoKHBhcnQpID0+IHBhcnQgIT09ICcnKS5qb2luKCdcXG4tLS1cXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoeyBvayB9KSA9PiB7IHNldEFjdGlvblJlc3VsdChvayA/ICdcdTI3MTMgXHU1REYyXHU2Qzg5XHU2REMwXHU0RTNBXHU4QkIwXHU1RkM2XHVGRjA4XHU1Rjg1XHU3ODZFXHU4QkE0XHU5NjFGXHU1MjE3XHVGRjA5JyA6ICdcdTI3MTcgXHU0RkREXHU1QjU4XHU1OTMxXHU4RDI1Jyk7IGlmIChvaykgdm9pZCBsb2FkTWVtb3JpZXMoKSB9KVxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XHVEODNFXHVEREUwIHt0KCdkZXRhaWwuc2F2ZU1lbW9yeScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7ZCA9PT0gdW5kZWZpbmVkID8gKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9PntkZXRhaWxTdGF0dXNbdGFyZ2V0XSA9PT0gJ3F1ZXVlZCcgPyAnXHUyM0YzICcgKyB0KCdkZXRhaWwuY2FyZFF1ZXVlZCcpIDogdCgnZGV0YWlsLmFpTG9hZGluZycpfTwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7ZC5jb21taXQgIT09IG51bGwgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmNvbW1pdE1ldGF9PntkLmNvbW1pdC5hdXRob3J9IFx1MDBCNyB7bmV3IERhdGUoZC5jb21taXQuZGF0ZSkudG9Mb2NhbGVTdHJpbmcoKX0gXHUwMEI3IHtkLmZpbGVzLmxlbmd0aH0ge3QoJ2RldGFpbC5maWxlcycpfSBcdTAwQjcgK3tkLmluc2VydGlvbnN9Ly17ZC5kZWxldGlvbnN9PC9kaXY+fVxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLndoYXQgIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnOHB4JyB9fT57dCgnZGV0YWlsLndoYXQnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLndoYXR9PntkLmFuYWx5c2lzLndoYXR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLmxvZ2ljLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnNlY3Rpb25UaXRsZX0+e3QoJ2RldGFpbC5sb2dpYycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5sb2dpYy5tYXAoKHN0ZXAsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3N0eWxlcy5sb2dpY1N0ZXB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLCBmb250V2VpZ2h0OiA2MDAgfX0+e2kgKyAxfS48L3NwYW4+e3N0ZXB9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5yaXNrcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnNnB4JyB9fT57dCgnZGV0YWlsLnJpc2snKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2QuYW5hbHlzaXMucmlza3MubWFwKChyaXNrLCBpKSA9PiA8ZGl2IGtleT17aX0gc3R5bGU9e3sgLi4uc3R5bGVzLnJpc2tJdGVtLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM5YTY3MDAnKSB9fT5cdTI2QTAge3JlbmRlcldpdGhQZWVrKHJpc2spfTwvZGl2Pil9XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHsvKiBcdTY1ODdcdTRFRjZcdTZFMDVcdTUzNTUgKyBcdTkwMTBcdTY1ODdcdTRFRjZcdTlBRDhcdTRFQUVcdTVCRjlcdTZCRDQgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBtYXJnaW5Ub3A6ICcxMHB4JyB9fT57dCgnZGV0YWlsLmZpbGVzJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICB7ZC5maWxlcy5tYXAoKGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0YXJnZXR9fCR7ZmlsZS5wYXRofWBcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXRjaCA9IGZpbGVEaWZmc1trZXldXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2tleX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+e2ZpbGUucGF0aH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzFhN2YzNycpLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT4re2ZpbGUuYWRkc308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NmMjIyZScpLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT4te2ZpbGUuZGVsc308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRGaWxlRGlmZih0YXJnZXQsIGZpbGUucGF0aCkgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwYXRjaCA9PT0gdW5kZWZpbmVkID8gdCgnZGlmZi5zaG93JykgOiB0KCdkaWZmLmhpZGUnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtwYXRjaCAhPT0gdW5kZWZpbmVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtgJHtrZXl9LWRpZmZgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjb2xTcGFuPXs0fSBzdHlsZT17eyAuLi5zdHlsZXMudGQsIHBhZGRpbmc6IDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEaWZmVmlldyBwYXRjaD17cGF0Y2h9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9DYXJkPlxuICAgICAgICApXG4gICAgICB9KX1cblxuICAgICAgey8qIFx1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNFx1RkYxQVx1NjMwOVx1OTRBRSArIFx1OThDRVx1OTY2OVx1Njc4NFx1NjIxMCArIFx1NTkyN1x1NTZGRSArIFx1NUY3MVx1NTRDRFx1NzBCOVx1NjYwRVx1N0VDNiArIFx1OEJCMFx1NUZDNlx1ODA1NFx1NTJBOCAqL31cbiAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdkZXRhaWwuaW1wYWN0Jyl9PlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtpbXBhY3RMb2FkaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZEltcGFjdCgpIH19PlxuICAgICAgICAgICAge2ltcGFjdExvYWRpbmcgPyB0KCdkZXRhaWwuaW1wYWN0TG9hZGluZycpIDogdCgnZGV0YWlsLmltcGFjdCcpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIHtpbXBhY3QgIT09IG51bGwgJiYgaW1wYWN0LmV4cGxhbmF0aW9uc0NhY2hlZCA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoJyM4YjhiOGInKSwgbWFyZ2luTGVmdDogJzhweCcgfX0+XG4gICAgICAgICAgICAgIHt0KCdjYWNoZS5oaXQnKX17aW1wYWN0LmdlbmVyYXRlZEF0ID8gJyBcdTAwQjcgJyArIG5ldyBEYXRlKGltcGFjdC5nZW5lcmF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKSA6ICcnfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiByZW5kZXJDb3N0QmFkZ2UoaW1wYWN0LmV4cGxhbmF0aW9uc0Nvc3RVc2QsIHQoJ2Nvc3QudG9vbHRpcCcpKX1cbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgbWFyZ2luTGVmdDogJzhweCcsIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17aW1wYWN0TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJbXBhY3QodHJ1ZSkgfX0+XG4gICAgICAgICAgICAgIHt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtpbXBhY3QgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICcxMHB4JywgbWFyZ2luOiAnMTBweCAwIDRweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKGltcGFjdFJpc2tDb2xvciksIGZvbnRTaXplOiAnMTNweCcsIHBhZGRpbmc6ICczcHggMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICB7dCgnaW1wYWN0LnJpc2snKX06IHtpbXBhY3Qucmlza0xldmVsfVx1RkYwOHtpbXBhY3Qucmlza1Njb3JlfVx1RkYwOVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7aW1wYWN0LmtleUNoYW5nZVBvaW50cyAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5rZXlDaGFuZ2VQb2ludHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM5YTY3MDAnKSB9fT5cdTI2QTAge3QoJ2ltcGFjdC5rZXlQb2ludHMnKX06IHtpbXBhY3Qua2V5Q2hhbmdlUG9pbnRzLm1hcCgoZmlsZSkgPT4gZmlsZS5zcGxpdCgnLycpLnBvcCgpKS5qb2luKCdcdTMwMDEnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHtpbXBhY3Qucmlza0ZhY3RvcnMgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3Qucmlza0ZhY3RvcnMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zZWN0aW9uVGl0bGV9Pnt0KCdpbXBhY3QuZmFjdG9ycycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICcycHgnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAge2ltcGFjdC5yaXNrRmFjdG9ycy5tYXAoKGZhY3RvciwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGZvbnRTaXplOiAnMTJweCcsIHBhZGRpbmc6ICczcHggOHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGJvcmRlclJhZGl1czogJzRweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57ZmFjdG9yLnRleHR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IGltcGFjdFJpc2tDb2xvciwgZm9udFdlaWdodDogNjAwIH19Pit7ZmFjdG9yLnBvaW50c308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDxJbXBhY3RHcmFwaCBkYXRhPXtpbXBhY3R9IHQ9e3R9IC8+XG4gICAgICAgICAgICAgIHtpbXBhY3QubGV2ZWxzLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdpbXBhY3Qubm9uZScpfTwvZGl2Pn1cbiAgICAgICAgICAgICAgey8qIFx1NTFGRFx1NjU3MFx1N0VBN1x1NUY3MVx1NTRDRFx1RkYxQVx1NjcyQ1x1NkIyMVx1NEZFRVx1NjUzOVx1NEU4Nlx1NTRFQVx1NEU5Qlx1NTFGRFx1NjU3MFx1MzAwMVx1NkNFMlx1NTNDQVx1NEU4Nlx1OEMwMVx1NzY4NFx1NTRFQVx1NEU5Qlx1NTFGRFx1NjU3MFx1MzAwMVx1OEMwM1x1NzUyOFx1NzBCOVx1NTcyOFx1NTRFQSAqL31cbiAgICAgICAgICAgICAge2ltcGFjdC5mdW5jdGlvbkltcGFjdCAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5mdW5jdGlvbkltcGFjdC5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBtYXJnaW5Ub3A6ICcxMnB4JyB9fT57dCgnaW1wYWN0LmZ1bmN0aW9ucycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICc4cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICB7aW1wYWN0LmZ1bmN0aW9uSW1wYWN0Lm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZW50cnkuc3ltYm9sfSBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnI2Q5NzcwNicpfT57ZW50cnkuc3ltYm9sfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmxhYmVsLCBtYXJnaW5MZWZ0OiAnOHB4JyB9fT57ZW50cnkuZGVmaW5lZElufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LnJvbGUgIT09IHVuZGVmaW5lZCAmJiBlbnRyeS5yb2xlICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQsIG1hcmdpblRvcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT57dCgnaW1wYWN0LmZ1bmNSb2xlJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5yb2xlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2hhbmdlICE9PSB1bmRlZmluZWQgJiYgZW50cnkuY2hhbmdlICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzlhNjcwMCcpIH19Pnt0KCdpbXBhY3QuZnVuY0NoYW5nZScpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuaW1wYWN0ICE9PSB1bmRlZmluZWQgJiYgZW50cnkuaW1wYWN0ICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NlOTE3OCcpIH19Pnt0KCdpbXBhY3QuZnVuY0NhbGxlcnMnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmltcGFjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNhbGxlcnMubWFwKChjYWxsZXIsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7IC4uLnN0eWxlcy5sb2dpY1N0ZXAsIG1hcmdpblRvcDogJzNweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JykgfX0+XHUyMUIzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY3Vyc29yOiAncG9pbnRlcicsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lIGRvdHRlZCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG9wZW5QZWVrKGNhbGxlci5maWxlLCBOdW1iZXIoY2FsbGVyLmxpbmUpKSB9fT57Y2FsbGVyLmZpbGV9OntjYWxsZXIubGluZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Plx1MjAxNCB7Y2FsbGVyLnNuaXBwZXQuc2xpY2UoMCwgODApfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge2ltcGFjdC5mdW5jdGlvbkltcGFjdCAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5mdW5jdGlvbkltcGFjdC5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2ltcGFjdC5mdW5jdGlvbnNOb25lJyl9PC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHtpbXBhY3QubWVtb3JpZXMgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3QubWVtb3JpZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxMHB4JywgcGFkZGluZzogJzhweCAxMHB4JywgYm9yZGVyOiAnMXB4IGRhc2hlZCByZ2JhKDM3LDk5LDIzNSwwLjM1KScsIGJvcmRlclJhZGl1czogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT57dCgnaW1wYWN0Lm1lbW9yeScpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhXcmFwOiAnd3JhcCcsIGdhcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpbXBhY3QubWVtb3JpZXMubWFwKChtZW1vcnksIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e2l9IHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyMyNTYzZWInKX0+e21lbW9yeS50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuXG4gICAgICB7LyogXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHVGRjFBXHU3RUQzXHU4QkJBICsgXHU3RUQzXHU2Nzg0XHU1MzE2XHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1ICovfVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgPENhcmQgdGl0bGU9e3QoJ2RldGFpbC5vcHRpbWFsaXR5Jyl9PlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtyZXZpZXdMb2FkaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJldmlld3MoKSB9fT5cbiAgICAgICAgICAgIHtyZXZpZXdMb2FkaW5nID8gdCgnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJykgOiB0KCdkZXRhaWwub3B0aW1hbGl0eScpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubWFwKCh0YXJnZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSByZXZpZXdzW3RhcmdldF1cbiAgICAgICAgICAgIGlmIChyID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsXG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRhcmdldCA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiB0YXJnZXQuc2xpY2UoMCwgOClcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtgci0ke3RhcmdldH1gfSBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgICAgICAgICB7ci5jYWNoZWQgPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9Pnt0KCdjYWNoZS5oaXQnKX17ci5nZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShyLmdlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIHtyZW5kZXJDb3N0QmFkZ2Uoci5jb3N0VXNkLCB0KCdjb3N0LnRvb2x0aXAnKSl9XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJldmlld3ModHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7ci52ZXJkaWN0ICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wNSknLCBib3JkZXI6ICcxcHggc29saWQgcmdiYSgzNyw5OSwyMzUsMC4yKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMTBweCcgfX0+e3IudmVyZGljdH08L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtyLmlzc3VlTGlzdCAhPT0gdW5kZWZpbmVkICYmIHIuaXNzdWVMaXN0Lmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dHI+e1sncmV2aWV3LmNvbC5zZXZlcml0eScsICdyZXZpZXcuY29sLmNhdGVnb3J5JywgJ3Jldmlldy5jb2wudGl0bGUnLCAncmV2aWV3LmNvbC5ldmlkZW5jZScsICdyZXZpZXcuY29sLmZpeCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICB7ci5pc3N1ZUxpc3QubWFwKChpc3N1ZSwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKGlzc3VlLnNldmVyaXR5ID09PSAnY3JpdGljYWwnID8gJyNmMTRjNGMnIDogaXNzdWUuc2V2ZXJpdHkgPT09ICdoaWdoJyA/ICcjY2U5MTc4JyA6IGlzc3VlLnNldmVyaXR5ID09PSAnbWVkaXVtJyA/ICcjZGNkY2FhJyA6ICcjNTY5Y2Q2Jyl9Pntpc3N1ZS5zZXZlcml0eX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntpc3N1ZS5jYXRlZ29yeX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2lzc3VlLnRpdGxlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19Pntpc3N1ZS5ldmlkZW5jZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2lzc3VlLmZpeH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3Jldmlldy5jbGVhbicpfTwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pfVxuICAgICAgICAgIHtyZXZpZXdMb2FkaW5nICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZycpfTwvZGl2Pn1cbiAgICAgICAgICB7IXJldmlld0xvYWRpbmcgJiYgc2VsZWN0ZWRUYXJnZXRzLmV2ZXJ5KCh0YXJnZXQpID0+IHJldmlld3NbdGFyZ2V0XSA9PT0gdW5kZWZpbmVkKSAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXZpZXcuaGludCcpfTwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG4gICAgPC8+XG4gIClcblxuICAvLyBcdTI1MDBcdTI1MDAgXHU4QkJFXHU3RjZFXHU5ODc1XHU3QjdFIFx1MjUwMFx1MjUwMFxuICBjb25zdCBUSUVSX0xBQkVMUzogQXJyYXk8eyBrZXk6IHN0cmluZzsgemg6IHN0cmluZzsgZGVzYzogc3RyaW5nIH0+ID0gW1xuICAgIHsga2V5OiAnc3RhbmRhcmQnLCB6aDogJ1x1ODlFM1x1OEJGQiAvIFx1NTFGRFx1NjU3MFx1NUY3MVx1NTRDRFx1OEJGNFx1NjYwRScsIGRlc2M6ICdcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTc2ODQgQUkgXHU4OUUzXHU4QkZCXHUzMDAxXHU1RjcxXHU1NENEXHU1MjA2XHU2NzkwJyB9LFxuICAgIHsga2V5OiAncmVhc29uaW5nJywgemg6ICdcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTUgLyBcdTYyNjdcdTg4NENcdThCQTFcdTUyMTInLCBkZXNjOiAnXHU4QkM0XHU1QkExXHUzMDAxXHU4QkExXHU1MjEyXHU3NTFGXHU2MjEwXHUzMDAxQUkgXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzJyB9LFxuICAgIHsga2V5OiAnZmFzdCcsIHpoOiAnXHU1Mzg2XHU1M0YyXHU4RjdCXHU2NzkwJywgZGVzYzogJ1x1NjI2Qlx1NjNDRlx1NTM4Nlx1NTNGMlx1NjVGNlx1NzY4NFx1OTAxMFx1NjNEMFx1NEVBNFx1NEUwMFx1NTNFNVx1OEJERCcgfSxcbiAgICB7IGtleTogJ3ZlcmlmaWVyJywgemg6ICdcdTlBOENcdTY1MzYnLCBkZXNjOiAnXHU2NTM5XHU1MkE4XHU5QThDXHU2NTM2XHU3Njg0IEFJIFx1NTkwRFx1NjgzOCcgfSxcbiAgXVxuXG4gIGNvbnN0IHNldHRpbmdzVGFiID0gKFxuICAgIDw+XG4gICAgICB7LyogXHU2QTIxXHU1NzhCXHU1MjA2XHU5MTREXHVGRjFBXHU1M0VGXHU4OUM2XHU1MzE2XHU1MjA3XHU2MzYyXHU1NDA0XHU0RUZCXHU1MkExXHU3NTI4XHU3Njg0XHU2QTIxXHU1NzhCXHVGRjBDXHU0RkREXHU1QjU4XHU1MzczXHU3NTFGXHU2NTQ4ICovfVxuICAgICAgPENhcmQgdGl0bGU9e3QoJ21vZGVsLnRpdGxlJyl9PlxuICAgICAgICB7bW9kZWxUaWVycyA9PT0gbnVsbCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdtb2RlbC5sb2FkaW5nJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIHtUSUVSX0xBQkVMUy5tYXAoKHRpZXIpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IG1vZGVsVGllcnNbdGllci5rZXldXG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3VycmVudCA/IGN1cnJlbnQucHJvdmlkZXIgKyAnLycgKyBjdXJyZW50Lm1vZGVsIDogJydcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17dGllci5rZXl9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWluV2lkdGg6IDE1MCwgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwIH19Pnt0aWVyLnpofTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6IDI0MCB9fVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHYgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgIGlmICh2ID09PSAnJykgeyBzZXRNb2RlbFRpZXJzKHsgLi4ubW9kZWxUaWVycywgW3RpZXIua2V5XTogeyBwcm92aWRlcjogJycsIG1vZGVsOiAnJyB9IH0pOyByZXR1cm4gfVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtwcm92aWRlciwgLi4ucmVzdF0gPSB2LnNwbGl0KCcvJylcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IHJlc3Quam9pbignLycpXG4gICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZWxUaWVycyh7IC4uLm1vZGVsVGllcnMsIFt0aWVyLmtleV06IHsgcHJvdmlkZXIsIG1vZGVsIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt0KCdtb2RlbC5mb2xsb3dDaGF0Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIHttb2RlbE9wdGlvbnMubWFwKChvcHRpb24pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfSB2YWx1ZT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRpb24ucHJvdmlkZXJ9IC8ge29wdGlvbi5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3RpZXIuZGVzY308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17bW9kZWxTYXZpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzYXZlTW9kZWxDb25maWcoKSB9fT5cbiAgICAgICAgICAgICAgICB7bW9kZWxTYXZpbmcgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnbW9kZWwuc2F2ZScpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAge21vZGVsU2F2ZWQgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzRlYzliMCcpfT57dCgnbW9kZWwuc2F2ZWQnKX08L3NwYW4+fVxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnbW9kZWwuaGludCcpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgICAgPGRpdiBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC10ZXJ0aWFyeSwgIzljYTNhZiknLCBwYWRkaW5nOiAnOHB4IDAnIH19PlxuICAgICAgICBkc2gtcHJvamVjdC1jb250cm9sIHZ7c3RhdGU/LnBsdWdpblZlcnNpb24gPz8gJz8nfVxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gIClcblxuICBjb25zdCBvdmVydmlld1RhYiA9IChcbiAgICA8PlxuICAgICAgPENhcmQ+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtib290c3RyYXBwaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQm9vdHN0cmFwKCkgfX0+XG4gICAgICAgICAgICB7Ym9vdHN0cmFwcGluZyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24ucmVzY2FuJyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGx9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2FuYWx5emUnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvYW5hbHl6ZScsIHt9KSB9fT5cbiAgICAgICAgICAgIHtidXN5ID09PSAnYW5hbHl6ZScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLmFuYWx5emUnKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbH0gb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbigndmVyaWZ5JywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3ZlcmlmeScsIHt9KSB9fT5cbiAgICAgICAgICAgIHtidXN5ID09PSAndmVyaWZ5JyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24udmVyaWZ5Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9DYXJkPlxuICAgICAge3Jlc3VsdFBhbmVsfVxuICAgICAge3Byb2plY3QgPT09IG51bGwgPyAoXG4gICAgICAgIDxDYXJkPlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEzcHgnLCBtYXJnaW5Cb3R0b206ICc2cHgnIH19Pnt0KCdzdGF0ZS5ub1Byb2plY3QnKX08L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdzdGF0ZS5ub1Byb2plY3RIaW50Jyl9PC9kaXY+XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXtgJHt0KCdzdGF0ZS5wcm9qZWN0Jyl9XHVGRjFBJHtwcm9qZWN0Lm5hbWV9YH0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT5Sb290PC9zcGFuPntwcm9qZWN0LnJvb3RQYXRofTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7Ym9vdHN0cmFwICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS50ZWNoU3RhY2snKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7Ym9vdHN0cmFwLnRlY2hTdGFjay5tYXAoKHRlY2gpID0+IDxzcGFuIGtleT17dGVjaH0gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzRlYzliMCcpfT57dGVjaH08L3NwYW4+KX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUuc3ltYm9scycpfTwvc3Bhbj57U3RyaW5nKGJvb3RzdHJhcC5zeW1ib2xzQ291bnQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUubWFuaWZlc3RzJyl9PC9zcGFuPntTdHJpbmcoYm9vdHN0cmFwLm1hbmlmZXN0RmlsZXMubGVuZ3RoKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLmV2aWRlbmNlJyl9PC9zcGFuPntTdHJpbmcoc3RhdGU/LmV2aWRlbmNlQ291bnQgPz8gMCl9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luVG9wOiAnOHB4JyB9fT57Ym9vdHN0cmFwLnN1bW1hcnl9PC9kaXY+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2NvbmZpcm1lZC50aXRsZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPXsyfSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSBwbGFjZWhvbGRlcj17dCgnY29uZmlybWVkLnRleHQnKX0gdmFsdWU9e2NvbmZpcm1lZFRleHR9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDb25maXJtZWRUZXh0KGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnY29uZmlybWVkLnBhdGhzJyl9IHZhbHVlPXtjb25maXJtZWRQYXRoc30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENvbmZpcm1lZFBhdGhzKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuYnV0dG9ufVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgY29uZmlybWVkVGV4dCA9PT0gJyd9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdhZGRDb25maXJtZWQnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY29uZmlybWVkJywgeyB0eXBlOiAnY29uc3RyYWludCcsIHRleHQ6IGNvbmZpcm1lZFRleHQsIGZvcmJpZGRlblBhdGhzOiBjb25maXJtZWRQYXRocy5zcGxpdCgnLCcpLm1hcCgocGF0aCkgPT4gcGF0aC50cmltKCkpLmZpbHRlcigocGF0aCkgPT4gcGF0aCAhPT0gJycpIH0pLnRoZW4oKCkgPT4geyBzZXRDb25maXJtZWRUZXh0KCcnKTsgc2V0Q29uZmlybWVkUGF0aHMoJycpIH0pIH19XG4gICAgICAgICAgPntidXN5ID09PSAnYWRkQ29uZmlybWVkJyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdjb25maXJtZWQuYWRkJyl9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7Y29uZmlybWVkLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdjb25maXJtZWQubm9uZScpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge2NvbmZpcm1lZC5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtpdGVtLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjYzU4NmMwJyl9PntpdGVtLnR5cGV9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2l0ZW0udGV4dH08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntpdGVtLmZvcmJpZGRlblBhdGhzLmpvaW4oJywgJykgfHwgJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3JlbW92ZUNvbmZpcm1lZCcsICcvcHJvamVjdC1jb250cm9sL2FwaS9jb25maXJtZWQvcmVtb3ZlJywgeyBpZDogaXRlbS5pZCB9KSB9fVxuICAgICAgICAgICAgICAgICAgICA+XHUyNzE1PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0uY2hhbmdlVGl0bGUnKX0gdmFsdWU9e2NoYW5nZVRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q2hhbmdlVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHRleHRhcmVhIHJvd3M9ezJ9IHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLmNoYW5nZURlc2MnKX0gdmFsdWU9e2NoYW5nZURlc2N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDaGFuZ2VEZXNjKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuYnV0dG9ufVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgY2hhbmdlVGl0bGUgPT09ICcnfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignY3JlYXRlQ2hhbmdlJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NoYW5nZXMnLCB7IHRpdGxlOiBjaGFuZ2VUaXRsZSwgZGVzY3JpcHRpb246IGNoYW5nZURlc2MgfSkudGhlbigoKSA9PiB7IHNldENoYW5nZVRpdGxlKCcnKTsgc2V0Q2hhbmdlRGVzYygnJykgfSkgfX1cbiAgICAgICAgICA+e2J1c3kgPT09ICdjcmVhdGVDaGFuZ2UnID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtjaGFuZ2VzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdzdGF0ZS5ub0NoYW5nZXMnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57WydjaGFuZ2VzLmNvbC50aXRsZScsICdjaGFuZ2VzLmNvbC50eXBlJywgJ2NoYW5nZXMuY29sLnN0YXR1cycsICdjaGFuZ2VzLmNvbC51cGRhdGVkJ10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtjaGFuZ2VzLm1hcCgoY2hhbmdlKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17Y2hhbmdlLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Y2hhbmdlLnRpdGxlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShjaGFuZ2Uuc3RhdHVzID09PSAnY29tcGxldGVkJyA/ICcjNGVjOWIwJyA6ICcjNTY5Y2Q2Jyl9PntjaGFuZ2Uuc3RhdHVzfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntmb3JtYXRUaW1lKGNoYW5nZS51cGRhdGVkQXQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyh7IHRpdGxlOiAnXHU1MjIwXHU5NjY0XHU4RkQ5XHU0RTJBXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExXHVGRjFGJywgbWVzc2FnZTogJ1x1MzAwQycgKyBjaGFuZ2UudGl0bGUgKyAnXHUzMDBEXHU1M0NBXHU1MTc2XHU1MTY4XHU5MEU4XHU2MjY3XHU4ODRDXHU4QkIwXHU1RjU1XHUzMDAxXHU4QkExXHU1MjEyXHUzMDAxXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHU1QzA2XHU4OEFCXHU2QzM4XHU0RTQ1XHU1MjIwXHU5NjY0XHUzMDAyJywgZGFuZ2VyOiB0cnVlLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2RlbGV0ZUNoYW5nZScsICcvcHJvamVjdC1jb250cm9sL2FwaS9jaGFuZ2VzL2RlbGV0ZScsIHsgaWQ6IGNoYW5nZS5pZCB9KSB9IH0pIH19Plx1MjcxNTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICA8Lz5cbiAgKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdTk4NzVcdTdCN0VcdUZGMUFcdTk4NzVcdTk3NjJcdTc2RjRcdTYzQTVcdTUyMUJcdTVFRkFcdTVFNzZcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMENcdTgwNEFcdTU5MjlcdTUzRUFcdTY2MkZcdTUzRTZcdTRFMDBcdTc5Q0RcdTUxNjVcdTUzRTMgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IGV4ZWN1dGlvblRhYiA9IChcbiAgICA8PlxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGZsZXhXcmFwOiAnd3JhcCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICcxMHB4JywgcGFkZGluZzogJzdweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMzcsOTksMjM1LDAuMiknLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICA8Yj5cdTI0NjAge3QoJ2V4ZWMuZmxvd0NyZWF0ZScpfTwvYj48c3Bhbj5cdTIxOTI8L3NwYW4+XG4gICAgICAgIDxiPlx1MjQ2MSB7dCgnZXhlYy5mbG93T3JjaGVzdHJhdGUnKX08L2I+PHNwYW4+XHUyMTkyPC9zcGFuPlxuICAgICAgICA8Yj5cdTI0NjIge3QoJ2V4ZWMuZmxvd1J1bicpfTwvYj48c3Bhbj5cdTIxOTI8L3NwYW4+XG4gICAgICAgIDxiPlx1MjQ2MyB7dCgnZXhlYy5mbG93TWVtb3J5Jyl9PC9iPlxuICAgICAgPC9kaXY+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnZXhlYy5jcmVhdGUnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtSW5saW5lfT5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCBmbGV4OiAxLCBtaW5XaWR0aDogMjAwIH19IHBsYWNlaG9sZGVyPXt0KCdleGVjLmZvcm1UaXRsZScpfSB2YWx1ZT17ZXhlY1RpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RXhlY1RpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17ZXhlY01vZGVsfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RXhlY01vZGVsKGUudGFyZ2V0LnZhbHVlKSB9fSB0aXRsZT17dCgncGxhbi5tb2RlbERlZmF1bHQnKX0+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e3QoJ2V4ZWMubW9kZWxEZWZhdWx0Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICB7KG1vZGVsT3B0aW9ucyA/PyBbXSkubWFwKChvcHRpb24pID0+IDxvcHRpb24ga2V5PXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9IHZhbHVlPXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9PntvcHRpb24ucHJvdmlkZXJ9L3tvcHRpb24uaWR9PC9vcHRpb24+KX1cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcm93cz17M30gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybURlc2MnKX0gdmFsdWU9e2V4ZWNEZXNjfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RXhlY0Rlc2MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmFjdGlvblJvd30+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBleGVjVGl0bGUudHJpbSgpID09PSAnJyB8fCBleGVjRGVzYy50cmltKCkgPT09ICcnfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc3RhcnRSdW4oKSB9fT5cbiAgICAgICAgICAgICAge2J1c3kgPT09ICdzdGFydFJ1bicgPyB0KCdleGVjLnBsYW5uaW5nJykgOiB0KCdleGVjLnN0YXJ0Jyl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdleGVjLmNyZWF0ZUhpbnQnKX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9DYXJkPlxuICAgICAge3Jlc3VsdFBhbmVsfVxuICAgICAge3BsYW5Db25maXJtICE9PSBudWxsICYmIChcbiAgICAgICAgPENhcmQgdGl0bGU9e3QoJ3BsYW4udGl0bGUnKX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT57dCgncGxhbi5oaW50Jyl9PC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgIDx0cj57WydwbGFuLmNvbC5zdGVwJywgJ3BsYW4uY29sLnJvbGUnLCAncGxhbi5jb2wubW9kZWwnLCAncGxhbi5jb2wucG9saWN5JywgJ3BsYW4uY29sLmVuYWJsZWQnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAge3BsYW5Db25maXJtLnN0ZXBzLm1hcCgoc3RlcCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e3N0ZXAuaWR9IHN0eWxlPXt7IG9wYWNpdHk6IHN0ZXAuZW5hYmxlZCA/IDEgOiAwLjQ1IH19PlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBtaW5XaWR0aDogMjIwIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFdlaWdodDogNjAwIH19PntpbmRleCArIDF9LiB7c3RlcC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PntzdGVwLmRlc2NyaXB0aW9uLnNsaWNlKDAsIDEyMCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAge3N0ZXAudGFyZ2V0RmlsZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJyB9fT57c3RlcC50YXJnZXRGaWxlcy5qb2luKCcsICcpLnNsaWNlKDAsIDEyMCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJywgcGFkZGluZzogJzNweCA2cHgnIH19IHZhbHVlPXtzdGVwLnJvbGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0UGxhbkNvbmZpcm0oeyAuLi5wbGFuQ29uZmlybSwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzLm1hcCgoaXRlbSwgaSkgPT4gaSA9PT0gaW5kZXggPyB7IC4uLml0ZW0sIHJvbGU6IGUudGFyZ2V0LnZhbHVlIH0gOiBpdGVtKSB9KSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtbJ2FuYWx5c2lzJywgJ3BsYW5uaW5nJywgJ2NvZGluZycsICdvcHMnLCAndmVyaWZpY2F0aW9uJ10ubWFwKChyb2xlKSA9PiA8b3B0aW9uIGtleT17cm9sZX0gdmFsdWU9e3JvbGV9PntST0xFX0xBQkVMU1tyb2xlXSA/PyByb2xlfTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggNnB4JyB9fSB2YWx1ZT17c3RlcC5tb2RlbFByb3ZpZGVyICsgJy8nICsgc3RlcC5tb2RlbElkfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtwcm92aWRlciwgbW9kZWxdID0gZS50YXJnZXQudmFsdWUuc3BsaXQoJy8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRQbGFuQ29uZmlybSh7IC4uLnBsYW5Db25maXJtLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMubWFwKChpdGVtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4uaXRlbSwgbW9kZWxQcm92aWRlcjogcHJvdmlkZXIgPz8gJycsIG1vZGVsSWQ6IG1vZGVsID8/ICcnIH0gOiBpdGVtKSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiL1wiPnt0KCdwbGFuLm1vZGVsRGVmYXVsdCcpfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAge21vZGVsT3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gPG9wdGlvbiBrZXk9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0gdmFsdWU9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0+e29wdGlvbi5wcm92aWRlcn0ve29wdGlvbi5pZH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDZweCcgfX0gdmFsdWU9e3N0ZXAuZmFpbHVyZVBvbGljeX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRQbGFuQ29uZmlybSh7IC4uLnBsYW5Db25maXJtLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMubWFwKChpdGVtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4uaXRlbSwgZmFpbHVyZVBvbGljeTogZS50YXJnZXQudmFsdWUgfSA6IGl0ZW0pIH0pIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKFBPTElDWV9MQUJFTFMpLm1hcCgoW3ZhbHVlLCBsYWJlbF0pID0+IDxvcHRpb24ga2V5PXt2YWx1ZX0gdmFsdWU9e3ZhbHVlfT57bGFiZWx9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXtzdGVwLmVuYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0UGxhbkNvbmZpcm0oeyAuLi5wbGFuQ29uZmlybSwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzLm1hcCgoaXRlbSwgaSkgPT4gaSA9PT0gaW5kZXggPyB7IC4uLml0ZW0sIGVuYWJsZWQ6IGUudGFyZ2V0LmNoZWNrZWQgfSA6IGl0ZW0pIH0pIH19IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgbWFyZ2luVG9wOiAnMTBweCcgfX0+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17cGxhbkJ1c3l9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsYXVuY2hQbGFuKHRydWUpIH19PntwbGFuQnVzeSA/ICdcdTIwMjYnIDogdCgncGxhbi5sYXVuY2hFZGl0ZWQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtwbGFuQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxhdW5jaFBsYW4oZmFsc2UpIH19Pnt0KCdwbGFuLmxhdW5jaERpcmVjdCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e3BsYW5CdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBsYW5Db25maXJtKG51bGwpIH19Pnt0KCdwbGFuLmRpc2NhcmQnKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cbiAgICAgIDxDYXJkPlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cbiAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnZXhlYy5hdHRlbXB0cycpfTwvc3Bhbj57U3RyaW5nKHN0YXRlPy5hdHRlbXB0c0NvdW50ID8/IDApfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtydW5zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdzdGF0ZS5ub1J1bnMnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ2V4ZWMuY29sLmNoYW5nZScsICdleGVjLmNvbC5zdGVwcycsICdleGVjLmNvbC5zdGF0dXMnLCAnZXhlYy5jb2wuc3RhcnRlZCcsICdleGVjLmNvbC5jb3N0JywgJ2V4ZWMuY29sLmRldGFpbCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7cnVucy5tYXAoKHJ1bikgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3J1bi5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+eyhjaGFuZ2VzLmZpbmQoKGNoYW5nZSkgPT4gY2hhbmdlLmlkID09PSBydW4uY2hhbmdlSWQpPy50aXRsZSkgPz8gcnVuLmNoYW5nZUlkfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3J1bi5zdGVwc1RvdGFsID8gKHJ1bi5zdGVwc0RvbmUgPz8gMCkgKyAnLycgKyBydW4uc3RlcHNUb3RhbCA6ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UocnVuLnN0YXR1cyA9PT0gJ3N1Y2NlZWRlZCcgfHwgcnVuLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgPyAnIzRlYzliMCcgOiBydW4uc3RhdHVzID09PSAnZmFpbGVkJyA/ICcjZjE0YzRjJyA6IHJ1bi5zdGF0dXMgPT09ICdwYXVzZWQnID8gJyNkOTc3MDYnIDogJyNkY2RjYWEnKX0+e1JVTl9TVEFUVVNfTEFCRUxTW3J1bi5zdGF0dXNdID8/IHJ1bi5zdGF0dXN9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICB7cnVuLmN1cnJlbnRTdGVwICE9PSBudWxsICYmIHJ1bi5jdXJyZW50U3RlcCAhPT0gdW5kZWZpbmVkICYmIHJ1bi5zdGF0dXMgPT09ICdydW5uaW5nJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWF4V2lkdGg6IDE2MCwgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19PntydW4uY3VycmVudFN0ZXB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntmb3JtYXRUaW1lKHJ1bi5zdGFydGVkQXQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3J1bi5jb3N0VXNkICE9PSB1bmRlZmluZWQgPyAnJCcgKyBydW4uY29zdFVzZC50b0ZpeGVkKDQpIDogJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSdW5EZXRhaWwocnVuLmlkKSB9fT57cnVuRGV0YWlsPy5ydW4uaWQgPT09IHJ1bi5pZCA/IHQoJ3BsYW4ucmVmcmVzaERldGFpbCcpIDogdCgncGxhbi52aWV3RGV0YWlsJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgICAge3J1bkRldGFpbCAhPT0gbnVsbCAmJiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdwbGFuLmRldGFpbFRpdGxlJykgKyAnIFx1MDBCNyAnICsgcnVuRGV0YWlsLnJ1bi5jaGFuZ2VUaXRsZX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ3N1Y2NlZWRlZCcgfHwgcnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdjb21wbGV0ZWQnID8gJyM0ZWM5YjAnIDogcnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdmYWlsZWQnID8gJyNmMTRjNGMnIDogcnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdwYXVzZWQnID8gJyNkOTc3MDYnIDogJyNkY2RjYWEnKX0+e1JVTl9TVEFUVVNfTEFCRUxTW3J1bkRldGFpbC5ydW4uc3RhdHVzXSA/PyBydW5EZXRhaWwucnVuLnN0YXR1c308L3NwYW4+XG4gICAgICAgICAgICB7cnVuRGV0YWlsLnJ1bi5lcnJvciAhPT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkMTI0MmYnKSB9fT57cnVuRGV0YWlsLnJ1bi5lcnJvci5tZXNzYWdlfTwvc3Bhbj59XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJ1bkRldGFpbChydW5EZXRhaWwucnVuLmlkKSB9fT57dCgncGxhbi5yZWZyZXNoRGV0YWlsJyl9PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFJ1bkRldGFpbChudWxsKSB9fT57dCgncGxhbi5jbG9zZURldGFpbCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ3BhdXNlZCcgJiYgcnVuRGV0YWlsLnJ1bi5wYXVzZVBvaW50ICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzhweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgYmFja2dyb3VuZDogJ3JnYmEoMjE3LDExOSw2LDAuMDgpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMjE3LDExOSw2LDAuMzUpJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTJweCcgfX0+XHUyM0Y4IHt0KCdwbGFuLnBhdXNlZEJhbm5lcicpfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PntydW5EZXRhaWwucnVuLnBhdXNlUG9pbnQucmVhc29ufTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgbWFyZ2luVG9wOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHJlc3VtZVJ1bihydW5EZXRhaWwucnVuLmlkLCAnY29udGludWUnKSB9fT57dCgncGxhbi5yZXN1bWVSZXRyeScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzNweCAxMHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcmVzdW1lUnVuKHJ1bkRldGFpbC5ydW4uaWQsICdza2lwLWN1cnJlbnQnKSB9fT57dCgncGxhbi5yZXN1bWVTa2lwJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7KHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnZmFpbGVkJyB8fCBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2ludGVycnVwdGVkJykgJiYgKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxuICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHJlc3VtZVJ1bihydW5EZXRhaWwucnVuLmlkLCAnY29udGludWUnKSB9fT57dCgncGxhbi5yZXN1bWVGYWlsZWQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57WydwbGFuLmNvbC5zdGVwJywgJ3BsYW4uY29sLnJvbGUnLCAncGxhbi5jb2wubW9kZWwnLCAnZXhlYy5jb2wuc3RhdHVzJywgJ3BsYW4uY29sLmF0dGVtcHRzJywgJ2V4ZWMuY29sLmNvc3QnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3J1bkRldGFpbC5zdGVwcy5tYXAoKHN0ZXAsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17c3RlcC5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+e2luZGV4ICsgMX0uIHtzdGVwLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7c3RlcC5jbGFpbWVkT3V0Y29tZSAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWF4V2lkdGg6IDMyMCwgd2hpdGVTcGFjZTogJ25vcm1hbCcgfX0+e3N0ZXAuY2xhaW1lZE91dGNvbWUuc2xpY2UoMCwgMTYwKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSg4NiwxNTYsMjE0LDAuMjUpJyl9PntST0xFX0xBQkVMU1tzdGVwLnJvbGVdID8/IHN0ZXAucm9sZX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRTaXplOiAnMTFweCcgfX0+e3N0ZXAubW9kZWwgPz8gJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHN0ZXAudmVyaWZpZWQgPyAnIzRlYzliMCcgOiBzdGVwLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgPyAnI2YxNGM0YycgOiBzdGVwLnN0YXR1cyA9PT0gJ3NraXBwZWQnID8gJyM4Yjk0OWUnIDogJyNkY2RjYWEnKX0+e1NURVBfU1RBVFVTX0xBQkVMU1tzdGVwLnN0YXR1c10gPz8gc3RlcC5zdGF0dXN9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e1N0cmluZyhzdGVwLmF0dGVtcHRzQ291bnQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3N0ZXAuY29zdFVzZCA+IDAgPyAnJCcgKyBzdGVwLmNvc3RVc2QudG9GaXhlZCg0KSA6ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0ICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMTBweCcsIGJvcmRlcjogJzFweCBkYXNoZWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBwYWRkaW5nOiAnOHB4IDEycHgnIH19PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnNHB4JyB9fT57dCgncGxhbi5jb250ZXh0VGl0bGUnKX08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cbiAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQucHJvamVjdERpZ2VzdH1cbiAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuYnJhbmNoICE9PSBudWxsID8gYCBcdTAwQjcgJHt0KCdwbGFuLmJyYW5jaCcpfSAke3J1bkRldGFpbC5jb250ZXh0LmJyYW5jaH1gIDogJyd9XG4gICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmhlYWRTaGEgIT09IG51bGwgPyBgIFx1MDBCNyBIRUFEICR7cnVuRGV0YWlsLmNvbnRleHQuaGVhZFNoYS5zbGljZSgwLCA4KX1gIDogJyd9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuaW5qZWN0ZWRNZW1vcmllcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzRweCcsIGZvbnRTaXplOiAnMTFweCcgfX0+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+e3QoJ3BsYW4uaW5qZWN0ZWRNZW1vcmllcycpfVx1RkYxQTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5pbmplY3RlZE1lbW9yaWVzLm1hcCgobWVtb3J5KSA9PiA8c3BhbiBrZXk9e21lbW9yeS5pZH0gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSg3OCwyMDEsMTc2LDAuMiknKX0+e21lbW9yeS50aXRsZX08L3NwYW4+KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmRlY2lzaW9uTG9nLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiAnaW5oZXJpdCcgfX0+e3QoJ3BsYW4uZGVjaXNpb25Mb2cnKX1cdUZGMUE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuZGVjaXNpb25Mb2cuc2xpY2UoLTYpLm1hcCgoZW50cnksIGVudHJ5SW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5SW5kZXh9Plx1MDBCNyBbe2VudHJ5LmtpbmR9XSB7ZW50cnkuZGV0YWlsfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuICAgICAgPENhcmRcbiAgICAgICAgdGl0bGU9e1xuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCB1c2VyU2VsZWN0OiAnbm9uZScgfX0gb25DbGljaz17KCkgPT4geyBzZXRTY2hlZE9wZW4oIXNjaGVkT3BlbikgfX0+XG4gICAgICAgICAgICB7c2NoZWRPcGVuID8gJ1x1MjVCRSAnIDogJ1x1MjVCOCAnfXt0KCdzY2hlZC50aXRsZScpfVxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmxhYmVsLCBtYXJnaW5MZWZ0OiAnOHB4JyB9fT57KHNjaGVkdWxlZERhdGEgPz8gW10pLmxlbmd0aCA+IDAgPyBTdHJpbmcoKHNjaGVkdWxlZERhdGEgPz8gW10pLmxlbmd0aCkgKyAnIFx1NEUyQScgOiAnJ308L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICB9XG4gICAgICA+XG4gICAgICAgIHtzY2hlZE9wZW4gJiYgKFxuICAgICAgICA8PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybUlubGluZX0+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgZmxleDogMSwgbWluV2lkdGg6IDE2MCB9fSBwbGFjZWhvbGRlcj17dCgnc2NoZWQuZm9ybU5hbWUnKX0gdmFsdWU9e3NjaGVkTmFtZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkTmFtZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycgfX0gdmFsdWU9e3NjaGVkVHlwZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkVHlwZShlLnRhcmdldC52YWx1ZSkgfX0+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmV2aWV3XCI+e3QoJ3NjaGVkLnR5cGVSZXZpZXcnKX08L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzdW1tYXJ5XCI+e3QoJ3NjaGVkLnR5cGVTdW1tYXJ5Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicnVuXCI+e3QoJ3NjaGVkLnR5cGVSdW4nKX08L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzeW5jXCI+e3QoJ3NjaGVkLnR5cGVTeW5jJyl9PC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgd2lkdGg6IDEyMCB9fSBwbGFjZWhvbGRlcj17dCgnc2NoZWQuZm9ybUludGVydmFsJyl9IHZhbHVlPXtzY2hlZEludGVydmFsfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWRJbnRlcnZhbChlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICB7c2NoZWRUeXBlID09PSAncnVuJyAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybVRpdGxlJyl9IHZhbHVlPXtzY2hlZFRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWRUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezJ9IHBsYWNlaG9sZGVyPXt0KCdleGVjLmZvcm1EZXNjJyl9IHZhbHVlPXtzY2hlZERlc2N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZERlc2MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtzY2hlZE5hbWUudHJpbSgpID09PSAnJ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFkZFNjaGVkdWxlZCgpIH19Pnt0KCdzY2hlZC5hZGQnKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+e3QoJ3NjaGVkLmhpbnQnKX08L2Rpdj5cbiAgICAgICAgeyhzY2hlZHVsZWREYXRhID8/IFtdKS5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc2NoZWQuZW1wdHknKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ3NjaGVkLmNvbC5uYW1lJywgJ3NjaGVkLmNvbC50eXBlJywgJ3NjaGVkLmNvbC5pbnRlcnZhbCcsICdzY2hlZC5jb2wubmV4dCcsICdzY2hlZC5jb2wubGFzdFJlc3VsdCcsICdzY2hlZC5jb2wuYWN0aW9ucyddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7KHNjaGVkdWxlZERhdGEgPz8gW10pLm1hcCgodGFzaykgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3Rhc2suaWR9IHN0eWxlPXt7IG9wYWNpdHk6IHRhc2suZW5hYmxlZCA/IDEgOiAwLjQ1IH19PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pnt0YXNrLm5hbWV9e3Rhc2sudGl0bGUgIT09ICcnID8gPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHVGRjA4e3Rhc2sudGl0bGV9XHVGRjA5PC9zcGFuPiA6IG51bGx9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHRhc2sudHlwZSA9PT0gJ3JldmlldycgPyAnIzU2OWNkNicgOiB0YXNrLnR5cGUgPT09ICdzdW1tYXJ5JyA/ICcjNGVjOWIwJyA6ICcjZDdiYTdkJyl9Pnt0YXNrLnR5cGUgPT09ICdyZXZpZXcnID8gdCgnc2NoZWQudHlwZVJldmlldycpIDogdGFzay50eXBlID09PSAnc3VtbWFyeScgPyB0KCdzY2hlZC50eXBlU3VtbWFyeScpIDogdCgnc2NoZWQudHlwZVJ1bicpfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pnt0YXNrLmludGVydmFsTWludXRlcyA+PSAxNDQwID8gTWF0aC5yb3VuZCh0YXNrLmludGVydmFsTWludXRlcyAvIDE0NDAgKiAxMCkgLyAxMCArIHQoJ3NjaGVkLmRheScpIDogdGFzay5pbnRlcnZhbE1pbnV0ZXMgPj0gNjAgPyBNYXRoLnJvdW5kKHRhc2suaW50ZXJ2YWxNaW51dGVzIC8gNjAgKiAxMCkgLyAxMCArIHQoJ3NjaGVkLmhvdXInKSA6IHRhc2suaW50ZXJ2YWxNaW51dGVzICsgdCgnc2NoZWQubWludXRlJyl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57dGFzay5lbmFibGVkID8gZm9ybWF0VGltZSh0YXNrLm5leHREdWVBdCkgOiAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1heFdpZHRoOiAyMjAsIHdoaXRlU3BhY2U6ICdub3JtYWwnIH19Pnt0YXNrLmxhc3RSZXN1bHQgfHwgKHRhc2subGFzdFJ1bkF0ICE9PSBudWxsID8gZm9ybWF0VGltZSh0YXNrLmxhc3RSdW5BdCkgOiAnXHUyMDE0Jyl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNjaGVkdWxlZEFjdGlvbigndXBkYXRlJywgeyBpZDogdGFzay5pZCwgZW5hYmxlZDogIXRhc2suZW5hYmxlZCB9KSB9fT57dGFzay5lbmFibGVkID8gdCgnc2NoZWQuZGlzYWJsZScpIDogdCgnc2NoZWQuZW5hYmxlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNjaGVkdWxlZEFjdGlvbigncnVuJywgeyBpZDogdGFzay5pZCB9KSB9fT57dCgnc2NoZWQucnVuTm93Jyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6ICdcdTUyMjBcdTk2NjRcdThGRDlcdTRFMkFcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdUZGMUYnLCBtZXNzYWdlOiAnXHUzMDBDJyArIHRhc2submFtZSArICdcdTMwMERcdTVDMDZcdTg4QUJcdTZDMzhcdTRFNDVcdTUyMjBcdTk2NjRcdTMwMDInLCBkYW5nZXI6IHRydWUsIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHNjaGVkdWxlZEFjdGlvbignZGVsZXRlJywgeyBpZDogdGFzay5pZCB9KSB9IH0pIH19Plx1MjcxNTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgIDwvPlxuICApXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNlx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcbiAgY29uc3Qgbm90ZXNUYWIgPSAoXG4gICAgPD5cbiAgICAgIHsvKiBcdTI1MDBcdTI1MDAgXHU3QjE0XHU4QkIwXHVGRjFBXHU1MzYxXHU3MjQ3XHU1RjBGXHU5NjA1XHU4QkZCICsgXHU1OTFBXHU4ODRDXHU3RjE2XHU4RjkxICsgXHU2NDFDXHU3RDIyICsgQUkgXHU2MDNCXHU3RUQzIFx1MjUwMFx1MjUwMCAqL31cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdub3Rlcy50aXRsZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgd2lkdGg6IDIyMCB9fVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ25vdGVzLnNlYXJjaCcpfVxuICAgICAgICAgICAgdmFsdWU9e25vdGVTZWFyY2h9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVNlYXJjaChlLnRhcmdldC52YWx1ZSkgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTdW1tYXJ5ID0gbm90ZXMuZmlsdGVyKChub3RlKSA9PiBub3RlLnNoYSA9PT0gJ3N1bW1hcnknKS5zb3J0KChhLCBiKSA9PiBiLmNyZWF0ZWRBdCAtIGEuY3JlYXRlZEF0KVswXVxuICAgICAgICAgICAgY29uc3QgbmV3Q29tbWl0cyA9IGxhc3RTdW1tYXJ5ID09PSB1bmRlZmluZWQgPyAtMVxuICAgICAgICAgICAgICA6IChjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSkuZmlsdGVyKChjb21taXQpID0+IGNvbW1pdC5kYXRlID4gbGFzdFN1bW1hcnkuY3JlYXRlZEF0KS5sZW5ndGhcbiAgICAgICAgICAgIGlmIChuZXdDb21taXRzID09PSAtMSkge1xuICAgICAgICAgICAgICByZXR1cm4gPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ25vdGVzLmRpZ2VzdE5ldmVyJyl9PC9zcGFuPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld0NvbW1pdHMgPT09IDApIHJldHVybiBudWxsXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Pnt0KCdub3Rlcy5kaWdlc3RQZW5kaW5nJykucmVwbGFjZSgne259JywgU3RyaW5nKG5ld0NvbW1pdHMpKX08L3NwYW4+XG4gICAgICAgICAgfSkoKX1cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17YWlTdW1tYXJpemluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFpU3VtbWFyaXplKCkgfX0+XG4gICAgICAgICAgICB7YWlTdW1tYXJpemluZyA/IHQoJ25vdGVzLmFpU3VtbWFyeVJ1bicpIDogJ1x1MjcyOCAnICsgdCgnbm90ZXMuYWlTdW1tYXJ5Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5mb3JtUm93LCBib3JkZXI6ICcxcHggZGFzaGVkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzEwcHgnIH19PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMuZm9ybVRpdGxlJyl9IHZhbHVlPXtub3RlVGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXROb3RlVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCB9fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMudGFnc0hpbnQnKX0gdmFsdWU9e25vdGVUYWdzfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVRhZ3MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLnRleHRhcmVhfVxuICAgICAgICAgICAgcm93cz17Nn1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0KCdub3Rlcy5jb250ZW50SGludCcpfVxuICAgICAgICAgICAgdmFsdWU9e25vdGVDb250ZW50fVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVDb250ZW50KGUudGFyZ2V0LnZhbHVlKSB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgIHt0KCdub3Rlcy5ib3VuZFRvJyl9OiB7c2VsZWN0ZWRUYXJnZXRzWzBdID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IHNlbGVjdGVkVGFyZ2V0c1swXS5zbGljZSgwLCA4KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtub3RlVGl0bGUudHJpbSgpID09PSAnJyB8fCBub3RlQ29udGVudC50cmltKCkgPT09ICcnfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYWRkTm90ZSgpIH19Pnt0KCdub3Rlcy5hZGQnKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleXdvcmQgPSBub3RlU2VhcmNoLnRyaW0oKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgY29uc3QgbWF0Y2hlZCA9IGtleXdvcmQgPT09ICcnXG4gICAgICAgICAgICA/IG5vdGVzXG4gICAgICAgICAgICA6IG5vdGVzLmZpbHRlcigobm90ZSkgPT4gKG5vdGUudGl0bGUgKyAnICcgKyBub3RlLmNvbnRlbnQgKyAnICcgKyAobm90ZS50YWdzID8/IFtdKS5qb2luKCcgJykpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoa2V5d29yZCkpXG4gICAgICAgICAgLy8gXHU3RjZFXHU5ODc2XHU0RjE4XHU1MTQ4XHVGRjBDXHU1MTc2XHU0RjU5XHU2MzA5XHU1MjFCXHU1RUZBXHU2NUY2XHU5NUY0XHU1MDEyXHU1RThGXHUzMDAyXG4gICAgICAgICAgY29uc3QgdmlzaWJsZSA9IFsuLi5tYXRjaGVkXS5zb3J0KChsZWZ0LCByaWdodCkgPT5cbiAgICAgICAgICAgIE51bWJlcihyaWdodC5waW5uZWQgPT09IHRydWUpIC0gTnVtYmVyKGxlZnQucGlubmVkID09PSB0cnVlKSB8fCByaWdodC5jcmVhdGVkQXQgLSBsZWZ0LmNyZWF0ZWRBdClcbiAgICAgICAgICBpZiAodmlzaWJsZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pntub3Rlcy5sZW5ndGggPT09IDAgPyB0KCdub3Rlcy5lbXB0eScpIDogdCgnbm90ZXMuZW1wdHlTZWFyY2gnKX08L2Rpdj5cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHZpc2libGUubWFwKChub3RlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1N1bW1hcnkgPSBub3RlLnNoYSA9PT0gJ3N1bW1hcnknXG4gICAgICAgICAgICBjb25zdCBlZGl0aW5nID0gZWRpdGluZ05vdGUgIT09IG51bGwgJiYgZWRpdGluZ05vdGUuaWQgPT09IG5vdGUuaWQgPyBlZGl0aW5nTm90ZSA6IG51bGxcbiAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkID0gbm90ZUV4cGFuZGVkW25vdGUuaWRdID09PSB0cnVlXG4gICAgICAgICAgICBjb25zdCBsb25nID0gbm90ZS5jb250ZW50Lmxlbmd0aCA+IDI2MCB8fCBub3RlLmNvbnRlbnQuc3BsaXQoJ1xcbicpLmxlbmd0aCA+IDZcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e25vdGUuaWR9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcy5ub3RlQ2FyZCxcbiAgICAgICAgICAgICAgICAgIC4uLihpc1N1bW1hcnkgPyB7IGJhY2tncm91bmQ6ICdyZ2JhKDM3LDk5LDIzNSwwLjA0KScsIGJvcmRlckNvbG9yOiAncmdiYSgzNyw5OSwyMzUsMC4zKScgfSA6IHt9KSxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2VkaXRpbmcgIT09IG51bGwgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSB2YWx1ZT17ZWRpdGluZy50aXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgLi4uZWRpdGluZywgdGl0bGU6IGUudGFyZ2V0LnZhbHVlIH0pIH19IC8+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMudGFnc0hpbnQnKX0gdmFsdWU9e2VkaXRpbmcudGFnc30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgLi4uZWRpdGluZywgdGFnczogZS50YXJnZXQudmFsdWUgfSkgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezEwfSB2YWx1ZT17ZWRpdGluZy5jb250ZW50fSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RWRpdGluZ05vdGUoeyAuLi5lZGl0aW5nLCBjb250ZW50OiBlLnRhcmdldC52YWx1ZSB9KSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICc0cHggMTJweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNhdmVOb3RlRWRpdCgpIH19Pnt0KCdub3Rlcy5zYXZlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnNHB4IDEycHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0RWRpdGluZ05vdGUobnVsbCkgfX0+e3QoJ25vdGVzLmNhbmNlbCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e2lzU3VtbWFyeSA/ICdcdUQ4M0RcdURDRDYgJyA6ICcnfXtub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/ICdcdUQ4M0RcdURDQ0MgJyA6ICcnfXtub3RlLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiBub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIDogdW5kZWZpbmVkIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/IHQoJ25vdGVzLnVucGluJykgOiB0KCdub3Rlcy5waW4nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHRvZ2dsZU5vdGVQaW4obm90ZSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdURDQ0M8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IHRpdGxlPXt0KCdub3Rlcy5jb3B5TWRIaW50Jyl9IG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWQgPSBgIyAke25vdGUudGl0bGV9XFxuXFxuJHtub3RlLmNvbnRlbnR9XFxuYFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkIG5hdmlnYXRvci5jbGlwYm9hcmQ/LndyaXRlVGV4dChtZCkudGhlbigoKSA9PiBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgnbm90ZXMuY29weU1kRG9uZScpKSkuY2F0Y2goKCkgPT4gc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgXHU1OTBEXHU1MjM2XHU1OTMxXHU4RDI1JykpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cdUQ4M0RcdURDQ0Ige3QoJ25vdGVzLmNvcHlNZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gdGl0bGU9e3QoJ25vdGVzLmV4cG9ydE1kSGludCcpfSBvbkNsaWNrPXsoKSA9PiB7IGV4cG9ydE5vdGUobm90ZSkgfX0+XHVEODNEXHVEQ0JFIHt0KCdub3Rlcy5leHBvcnRNZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gdGl0bGU9e3QoJ25vdGVzLnRvTWVtb3J5SGludCcpfSBvbkNsaWNrPXsoKSA9PiB7IHNldE1lbW9yeVRpdGxlKG5vdGUudGl0bGUpOyBzZXRNZW1vcnlDb250ZW50KG5vdGUuY29udGVudCk7IHNldEFjdGlvblJlc3VsdCh0KCdub3Rlcy50b01lbW9yeURvbmUnKSkgfX0+XHVEODNFXHVEREUwIHt0KCdub3Rlcy50b01lbW9yeScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRFZGl0aW5nTm90ZSh7IGlkOiBub3RlLmlkLCB0aXRsZTogbm90ZS50aXRsZSwgY29udGVudDogbm90ZS5jb250ZW50LCB0YWdzOiAobm90ZS50YWdzID8/IFtdKS5qb2luKCcsICcpIH0pIH19Pnt0KCdub3Rlcy5lZGl0Jyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogJ1x1NTIyMFx1OTY2NFx1OEZEOVx1Njc2MVx1N0IxNFx1OEJCMFx1RkYxRicsIG1lc3NhZ2U6ICdcdTMwMEMnICsgbm90ZS50aXRsZSArICdcdTMwMERcdTVDMDZcdTg4QUJcdTZDMzhcdTRFNDVcdTUyMjBcdTk2NjRcdUZGMENcdTRFMERcdTUzRUZcdTYwNjJcdTU5MERcdTMwMDInLCBkYW5nZXI6IHRydWUsIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHJlbW92ZU5vdGUobm90ZS5pZCkgfSB9KSB9fT5cdTI3MTU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtpc1N1bW1hcnlcbiAgICAgICAgICAgICAgICAgICAgICA/IDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCAuLi4obG9uZyAmJiAhZXhwYW5kZWQgPyBzdHlsZXMubm90ZUNsYW1wIDoge30pIH19PntyZW5kZXJTdHJ1Y3R1cmVkQ29udGVudChub3RlLmNvbnRlbnQpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDogPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNvbnRlbnQsIC4uLihsb25nICYmICFleHBhbmRlZCA/IHN0eWxlcy5ub3RlQ2xhbXAgOiB7fSkgfX0+e25vdGUuY29udGVudH08L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgIHtsb25nICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMubGlua0J0bn0gb25DbGljaz17KCkgPT4geyBzZXROb3RlRXhwYW5kZWQoeyAuLi5ub3RlRXhwYW5kZWQsIFtub3RlLmlkXTogIWV4cGFuZGVkIH0pIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2V4cGFuZGVkID8gdCgnbm90ZXMuY29sbGFwc2UnKSA6IHQoJ25vdGVzLmV4cGFuZCcpfVx1RkYwOHtub3RlLmNvbnRlbnQubGVuZ3RofSBcdTVCNTdcdUZGMDlcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgeyhub3RlLnRhZ3MgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyhub3RlLnRhZ3MgPz8gW10pLm1hcCgodGFnKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3RhZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoJyMyNTYzZWInKSwgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlcjogJ25vbmUnLCBwYWRkaW5nOiAnMXB4IDhweCcsIGJvcmRlclJhZGl1czogJzk5OXB4JywgZm9udFNpemU6ICcxMHB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0Tm90ZVNlYXJjaCh0YWcpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID4je3RhZ308L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntuZXcgRGF0ZShub3RlLmNyZWF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAge25vdGUudXBkYXRlZEF0ICE9PSB1bmRlZmluZWQgJiYgbm90ZS51cGRhdGVkQXQgPiBub3RlLmNyZWF0ZWRBdCArIDEwMDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHVGRjA4e3QoJ25vdGVzLmVkaXRlZEF0Jyl9IHtuZXcgRGF0ZShub3RlLnVwZGF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX1cdUZGMDk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICB7aXNTdW1tYXJ5ICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyMyNTYzZWInKX0+e3QoJ25vdGVzLnN1bW1hcnlUYWcnKX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgIHtub3RlLnNoYSAhPT0gdW5kZWZpbmVkICYmIG5vdGUuc2hhICE9PSAnc3VtbWFyeScgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57bm90ZS5zaGEgPT09ICd3b3JraW5nJyA/IHQoJ3JlcG8ud29ya2luZycpIDogbm90ZS5zaGEuc2xpY2UoMCwgOCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgfSkoKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdtZW1vcnkuem9uZVRpdGxlJykgKyAocHJvamVjdCAhPT0gbnVsbCA/ICcgXHUwMEI3ICcgKyBwcm9qZWN0Lm5hbWUgOiAnJyl9PlxuICAgICAgICB7LyogXHU1NDBDXHU2QjY1XHU3MkI2XHU2MDAxXHU2NzYxXHVGRjFBXHU1N0ZBXHU3RUJGICsgXHU4NDNEXHU1NDBFXHU2M0QwXHU0RUE0XHU2NTcwICsgXHU1NDBDXHU2QjY1XHU2MzA5XHU5NEFFICsgXHU1NDBDXHU2QjY1XHU2MkE1XHU1NDRBICovfVxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzhweCcsIHBhZGRpbmc6ICc2cHggMTBweCcsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JyB9fT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnIH19Plx1RDgzRFx1REQwNCB7dCgnbWVtb3J5LnN5bmNCYXNlbGluZScpfVx1RkYxQTxiPnttZW1vcmllc0RhdGE/LmJhc2VsaW5lPy5zaGEgIT0gbnVsbCA/IG1lbW9yaWVzRGF0YS5iYXNlbGluZS5zaGEuc2xpY2UoMCwgOCkgOiB0KCdtZW1vcnkuc3luY05vbmUnKX08L2I+PC9zcGFuPlxuICAgICAgICAgIHttZW1vcmllc0RhdGE/LmJyYW5jaCAhPSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM1NjljZDYnKX0+e21lbW9yaWVzRGF0YS5icmFuY2h9PC9zcGFuPn1cbiAgICAgICAgICB7KG1lbW9yaWVzRGF0YT8uYmVoaW5kQ291bnQgPz8gMCkgPiAwICYmIChcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpIH19Pnt0KCdtZW1vcnkuYmVoaW5kJykucmVwbGFjZSgne259JywgU3RyaW5nKG1lbW9yaWVzRGF0YT8uYmVoaW5kQ291bnQgPz8gMCkpfTwvc3Bhbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gZGlzYWJsZWQ9e21lbW9yeVN5bmNpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzeW5jTWVtb3JpZXMoKSB9fT5cbiAgICAgICAgICAgIHttZW1vcnlTeW5jaW5nID8gdCgnbWVtb3J5LnN5bmNpbmcnKSA6ICdcdUQ4M0RcdUREMDQgJyArIHQoJ21lbW9yeS5zeW5jJyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7c3luY1JlcG9ydCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JywgcGFkZGluZzogJzhweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYmFja2dyb3VuZDogc3luY1JlcG9ydC5vayA9PT0gZmFsc2UgPyAncmdiYSgyMDksMzYsNDcsMC4wNiknIDogJ3JnYmEoNzgsMjAxLDE3NiwwLjA2KScsIGJvcmRlcjogJzFweCBzb2xpZCAnICsgKHN5bmNSZXBvcnQub2sgPT09IGZhbHNlID8gJ3JnYmEoMjA5LDM2LDQ3LDAuMyknIDogJ3JnYmEoNzgsMjAxLDE3NiwwLjMpJykgfX0+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fT57c3luY1JlcG9ydC5vayA9PT0gZmFsc2UgPyAnXHUyNzE3ICcgKyB0KCdtZW1vcnkuc3luY0ZhaWxlZCcpIDogJ1x1MjcxMyAnICsgKHN5bmNSZXBvcnQudmVyZGljdCA/PyAnJyl9PC9kaXY+XG4gICAgICAgICAgICB7c3luY1JlcG9ydC5vayAhPT0gZmFsc2UgJiYgKHN5bmNSZXBvcnQuc3RhbGVQcm9wb3NhbHMgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+e3QoJ21lbW9yeS5zdGFsZVRpdGxlJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgeyhzeW5jUmVwb3J0LnN0YWxlUHJvcG9zYWxzID8/IFtdKS5tYXAoKHByb3Bvc2FsKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17cHJvcG9zYWwuaWR9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpblRvcDogJzRweCcsIGZvbnRTaXplOiAnMTFweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0+e3Byb3Bvc2FsLnRpdGxlfSBcdTIwMTRcdTIwMTQge3Byb3Bvc2FsLnJlYXNvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzFweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhcHBseVN5bmMoW3Byb3Bvc2FsLmlkXSwgJ21hcmstc3RhbGUnKSB9fT57dCgnbWVtb3J5Lm1hcmtTdGFsZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcxcHggOHB4JywgZm9udFNpemU6ICcxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYXBwbHlTeW5jKFtwcm9wb3NhbC5pZF0sICdhcmNoaXZlJykgfX0+e3QoJ21lbW9yeS5hcmNoaXZlQnRuJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzFweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0U3luY1JlcG9ydCgocHJldmlvdXMpID0+IHByZXZpb3VzID09PSBudWxsID8gbnVsbCA6IHsgLi4ucHJldmlvdXMsIHN0YWxlUHJvcG9zYWxzOiAocHJldmlvdXMuc3RhbGVQcm9wb3NhbHMgPz8gW10pLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCAhPT0gcHJvcG9zYWwuaWQpIH0pIH19Pnt0KCdtZW1vcnkua2VlcEFjdGl2ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtzeW5jUmVwb3J0Lm9rICE9PSBmYWxzZSAmJiAoc3luY1JlcG9ydC5uZXdDYW5kaWRhdGVzID8/IFtdKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc2cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCB9fT57dCgnbWVtb3J5Lm5ld0NhbmRpZGF0ZXMnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgeyhzeW5jUmVwb3J0Lm5ld0NhbmRpZGF0ZXMgPz8gW10pLm1hcCgoY2FuZGlkYXRlLCBpbmRleCkgPT4gPGRpdiBrZXk9e2luZGV4fT5cdUZGMEIgW3tjYW5kaWRhdGUudHlwZX1dIHtjYW5kaWRhdGUudGl0bGV9PC9kaXY+KX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMubGlua0J0biwgbWFyZ2luVG9wOiAnNHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFN5bmNSZXBvcnQobnVsbCkgfX0+e3QoJ21lbW9yeS5jbG9zZVJlcG9ydCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICB7LyogXHU2MjRCXHU1MkE4XHU2REZCXHU1MkEwXHVGRjFBXHU2ODA3XHU5ODk4IC8gXHU3QzdCXHU1NzhCIC8gXHU0RjVDXHU3NTI4XHU1N0RGIC8gXHU1MTg1XHU1QkI5ICovfVxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLm1lbW9yeVRpdGxlJyl9IHZhbHVlPXttZW1vcnlUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeVRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17bWVtb3J5VHlwZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeVR5cGUoZS50YXJnZXQudmFsdWUpIH19PlxuICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKE1FTU9SWV9UWVBFX0xBQkVMUykubWFwKChbdmFsdWUsIGxhYmVsXSkgPT4gPG9wdGlvbiBrZXk9e3ZhbHVlfSB2YWx1ZT17dmFsdWV9PntsYWJlbH08L29wdGlvbj4pfVxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17bWVtb3J5U2NvcGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRNZW1vcnlTY29wZShlLnRhcmdldC52YWx1ZSBhcyAncHJvamVjdCcgfCAnYnJhbmNoJykgfX0+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicHJvamVjdFwiPnt0KCdtZW1vcnkuc2NvcGVQcm9qZWN0Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYnJhbmNoXCI+e3QoJ21lbW9yeS5zY29wZUJyYW5jaCcpfTwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSByb3dzPXszfSBwbGFjZWhvbGRlcj17dCgnZm9ybS5tZW1vcnlDb250ZW50Jyl9IHZhbHVlPXttZW1vcnlDb250ZW50fSBvbkNoYW5nZT17KGUpID0+IHsgc2V0TWVtb3J5Q29udGVudChlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgbWVtb3J5VGl0bGUudHJpbSgpID09PSAnJyB8fCBtZW1vcnlDb250ZW50LnRyaW0oKSA9PT0gJyd9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3JlY29yZE1lbW9yeScsICcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnknLCB7IG1lbW9yeVR5cGUsIHNjb3BlOiBtZW1vcnlTY29wZSwgdGl0bGU6IG1lbW9yeVRpdGxlLnRyaW0oKSwgY29udGVudDogbWVtb3J5Q29udGVudC50cmltKCkgfSkudGhlbihhc3luYyAoKSA9PiB7IHNldE1lbW9yeVRpdGxlKCcnKTsgc2V0TWVtb3J5Q29udGVudCgnJyk7IGF3YWl0IGxvYWRNZW1vcmllcygpIH0pIH19PlxuICAgICAgICAgICAgICB7YnVzeSA9PT0gJ3JlY29yZE1lbW9yeScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnbWVtb3J5LnJlY29yZCcpfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBhbGwgPSBtZW1vcmllc0RhdGE/Lm1lbW9yaWVzID8/IFtdXG4gICAgICAgICAgY29uc3QgcGVuZGluZyA9IGFsbC5maWx0ZXIoKG1lbW9yeSkgPT4gIW1lbW9yeS5pc0h1bWFuQ29uZmlybWVkICYmIG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnKVxuICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IGFsbC5maWx0ZXIoKG1lbW9yeSkgPT4gbWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZScpXG4gICAgICAgICAgY29uc3QgZ3JvdXBlZCA9IG5ldyBNYXA8c3RyaW5nLCBNZW1vcnlFbnRyeVtdPigpXG4gICAgICAgICAgZm9yIChjb25zdCBtZW1vcnkgb2YgYWN0aXZlKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gZ3JvdXBlZC5nZXQobWVtb3J5LnR5cGUpID8/IFtdXG4gICAgICAgICAgICBsaXN0LnB1c2gobWVtb3J5KVxuICAgICAgICAgICAgZ3JvdXBlZC5zZXQobWVtb3J5LnR5cGUsIGxpc3QpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICB7cGVuZGluZy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+XHUyM0YzIHt0KCdtZW1vcnkucGVuZGluZ1F1ZXVlJyl9XHVGRjA4e1N0cmluZyhwZW5kaW5nLmxlbmd0aCl9XHVGRjA5PC9kaXY+XG4gICAgICAgICAgICAgICAgICB7cGVuZGluZy5tYXAoKG1lbW9yeSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17bWVtb3J5LmlkfSBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNhcmQsIGJvcmRlckNvbG9yOiAncmdiYSgzNyw5OSwyMzUsMC4zKScsIGJhY2tncm91bmQ6ICdyZ2JhKDM3LDk5LDIzNSwwLjAzKScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e21lbW9yeS50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgY29uZmlybU1lbW9yeShtZW1vcnkuaWQpLnRoZW4oKCkgPT4geyB2b2lkIGxvYWRNZW1vcmllcygpIH0pIH19Pnt0KCdtZW1vcnkuY29uZmlybScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5QWN0aW9uKCdzdGF0dXMnLCB7IGlkOiBtZW1vcnkuaWQsIHN0YXR1czogJ2FyY2hpdmVkJyB9KSB9fT57dCgnbWVtb3J5LmFyY2hpdmVCdG4nKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlQ29udGVudH0+e21lbW9yeS5jb250ZW50fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlTWV0YX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCdyZ2JhKDM3LDk5LDIzNSwwLjE1KScpfT57TUVNT1JZX1NPVVJDRV9MQUJFTFNbbWVtb3J5LnNvdXJjZVRhZ10gPz8gbWVtb3J5LnNvdXJjZVRhZ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LmJhc2lzU2hhICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e21lbW9yeS5iYXNpc1NoYS5zbGljZSgwLCA4KX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7Wy4uLmdyb3VwZWQuZW50cmllcygpXS5tYXAoKFt0eXBlLCBpdGVtc10pID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17dHlwZX0gc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2VjdGlvblRpdGxlfT57TUVNT1JZX1RZUEVfTEFCRUxTW3R5cGVdID8/IHR5cGV9XHVGRjA4e1N0cmluZyhpdGVtcy5sZW5ndGgpfVx1RkYwOTwvZGl2PlxuICAgICAgICAgICAgICAgICAge2l0ZW1zLm1hcCgobWVtb3J5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXttZW1vcnkuaWR9IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ2FyZCwgb3BhY2l0eTogbWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZScgPyAxIDogMC42IH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVRleHR9PnttZW1vcnkuaXNIdW1hbkNvbmZpcm1lZCA/ICdcdTI3MDUgJyA6ICcnfXttZW1vcnkudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFNocmluazogMCwgZmxleFdyYXA6ICd3cmFwJywganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHshbWVtb3J5LmlzSHVtYW5Db25maXJtZWQgJiYgbWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJ1dHRvbiwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBjb25maXJtTWVtb3J5KG1lbW9yeS5pZCkudGhlbigoKSA9PiB7IHZvaWQgbG9hZE1lbW9yaWVzKCkgfSkgfX0+e3QoJ21lbW9yeS5jb25maXJtJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5VG9Ob3RlKG1lbW9yeSkgfX0+XHVEODNEXHVEQ0M0IHt0KCdtZW1vcnkudG9Ob3RlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc2NvcGUgPT09ICdicmFuY2gnICYmIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ25vcm1hbGl6ZScsIHsgaWQ6IG1lbW9yeS5pZCB9KSB9fT5cdTIxRjEge3QoJ21lbW9yeS5ub3JtYWxpemUnKX08L2J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeUFjdGlvbignc3RhdHVzJywgeyBpZDogbWVtb3J5LmlkLCBzdGF0dXM6ICdhcmNoaXZlZCcgfSkgfX0+e3QoJ21lbW9yeS5hcmNoaXZlQnRuJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5QWN0aW9uKCdzdGF0dXMnLCB7IGlkOiBtZW1vcnkuaWQsIHN0YXR1czogJ2FjdGl2ZScgfSkgfX0+e3QoJ21lbW9yeS5yZXN0b3JlJyl9PC9idXR0b24+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNvbnRlbnQsIG1heEhlaWdodDogODQsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT57bWVtb3J5LmNvbnRlbnR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVNZXRhfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc3RhdHVzID09PSAnc3RhbGUnICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNkOTc3MDYnKX0+e3QoJ21lbW9yeS5zdGF0dXNTdGFsZScpfTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnNjb3BlID09PSAnYnJhbmNoJyAmJiBtZW1vcnkuZ2l0QnJhbmNoICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM1NjljZDYnKX0+XHUyMzg3IHttZW1vcnkuZ2l0QnJhbmNofTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCdyZ2JhKDM3LDk5LDIzNSwwLjE1KScpfT57TUVNT1JZX1NPVVJDRV9MQUJFTFNbbWVtb3J5LnNvdXJjZVRhZ10gPz8gbWVtb3J5LnNvdXJjZVRhZ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LmJhc2lzU2hhICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e21lbW9yeS5iYXNpc1NoYS5zbGljZSgwLCA4KX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e25ldyBEYXRlKG1lbW9yeS51cGRhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAge2FsbC5sZW5ndGggPT09IDAgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnbWVtb3J5LmVtcHR5Jyl9PC9kaXY+fVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKVxuICAgICAgICB9KSgpfVxuICAgICAgPC9DYXJkPlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2NvbmNlcHRzLnRpdGxlJyl9PlxuICAgICAgICB7Y29uY2VwdHMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2NvbmNlcHRzLm5vbmUnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57Wydjb25jZXB0cy5jb2wubmFtZScsICdjb25jZXB0cy5jb2wuY2F0ZWdvcnknLCAnY29uY2VwdHMuY29sLmNvdW50J10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtjb25jZXB0cy5tYXAoKGNvbmNlcHQpID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtjb25jZXB0LmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Y29uY2VwdC5uYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2NvbmNlcHQuY2F0ZWdvcnl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57U3RyaW5nKGNvbmNlcHQub2NjdXJyZW5jZXMpfTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgPC8+XG4gIClcblxuICAvLyBcdTI1MDBcdTI1MDAgUmV2aWV3IFx1OTVFRVx1OTg5OFx1OTg3NVx1N0I3RVx1RkYxQVx1NTE2OFx1OTFDRlx1OTVFRVx1OTg5OFx1NzcwQlx1Njc3Rlx1RkYwOFx1N0VERlx1OEJBMSArIFx1N0I1Qlx1OTAwOSArIFx1NzJCNlx1NjAwMVx1NkQ0MVx1OEY2Q1x1RkYwOSsgXHU5QThDXHU2NTM2XHU4QkIwXHU1RjU1IFx1MjUwMFx1MjUwMFxuICBjb25zdCByZXZpZXdUYWIgPSAoXG4gICAgPD5cbiAgICAgIHtyZXN1bHRQYW5lbH1cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdyZXZpZXcucmVjb3Jkc1RpdGxlJyl9PlxuICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBhbGwgPSAoaXNzdWVzRGF0YSA/PyBbXSkubWFwKChpc3N1ZSkgPT4gKHsgLi4uaXNzdWUsIHNldmVyaXR5OiBub3JtYWxpemVJc3N1ZVNldmVyaXR5KGlzc3VlLnNldmVyaXR5KSB9KSlcbiAgICAgICAgICBjb25zdCBvcGVuQ291bnQgPSBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykubGVuZ3RoXG4gICAgICAgICAgLy8gXHU4QkExXHU2NTcwIGNoaXBzIFx1OERERlx1OTY4Rlx1NzJCNlx1NjAwMVx1N0I1Qlx1OTAwOVx1RkYwOFwiXHU1MTY4XHU5MEU4XCI9IFx1NzJCNlx1NjAwMVx1N0I1Qlx1OTAwOVx1NTQwRVx1NzY4NFx1NjAzQlx1NjU3MFx1RkYwOVx1RkYxQVx1OTAwOVwiXHU1REYyXHU4OUUzXHU1MUIzXCJcdTU0MEVcdTU0MDRcdTRFMjVcdTkxQ0RcdTVFQTZcdTY1NzBcdTVCNTdcdTdBQ0JcdTUzNzNcdTVCRjlcdTVFOTRcdTVERjJcdTg5RTNcdTUxQjNcdTUyMTdcdTg4NjhcdTMwMDJcbiAgICAgICAgICBjb25zdCBzdGF0dXNGaWx0ZXJlZCA9IGFsbC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZVN0YXR1c0ZpbHRlciA9PT0gJycgfHwgaXNzdWUuc3RhdHVzID09PSBpc3N1ZVN0YXR1c0ZpbHRlcilcbiAgICAgICAgICBjb25zdCBjb3VudHM6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfT4gPSBbXG4gICAgICAgICAgICB7IGtleTogJycsIGxhYmVsOiB0KCdyZXZpZXcuZmlsdGVyQWxsJyksIGNvdW50OiBzdGF0dXNGaWx0ZXJlZC5sZW5ndGggfSxcbiAgICAgICAgICAgIHsga2V5OiAnY3JpdGljYWwnLCBsYWJlbDogJ2NyaXRpY2FsJywgY291bnQ6IHN0YXR1c0ZpbHRlcmVkLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IGlzc3VlLnNldmVyaXR5ID09PSAnYmxvY2tlcicpLmxlbmd0aCB9LFxuICAgICAgICAgICAgeyBrZXk6ICdtYWpvcicsIGxhYmVsOiAnbWFqb3InLCBjb3VudDogc3RhdHVzRmlsdGVyZWQuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdtYWpvcicpLmxlbmd0aCB9LFxuICAgICAgICAgICAgeyBrZXk6ICdtaW5vcicsIGxhYmVsOiAnbWlub3InLCBjb3VudDogc3RhdHVzRmlsdGVyZWQuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdtaW5vcicpLmxlbmd0aCB9LFxuICAgICAgICAgICAgeyBrZXk6ICdpbmZvJywgbGFiZWw6ICdpbmZvJywgY291bnQ6IHN0YXR1c0ZpbHRlcmVkLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnNldmVyaXR5ID09PSAnaW5mbycpLmxlbmd0aCB9LFxuICAgICAgICAgIF1cbiAgICAgICAgICBjb25zdCB2aXNpYmxlID0gc3RhdHVzRmlsdGVyZWRcbiAgICAgICAgICAgIC5maWx0ZXIoKGlzc3VlKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpc3N1ZVNldmVyaXR5RmlsdGVyID09PSAnJykgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgaWYgKGlzc3VlU2V2ZXJpdHlGaWx0ZXIgPT09ICdjcml0aWNhbCcpIHJldHVybiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBpc3N1ZS5zZXZlcml0eSA9PT0gJ2Jsb2NrZXInXG4gICAgICAgICAgICAgIHJldHVybiBpc3N1ZS5zZXZlcml0eSA9PT0gaXNzdWVTZXZlcml0eUZpbHRlclxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBjb25zdCBjaGVja2VkVmlzaWJsZSA9IHZpc2libGUuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWVDaGVja2VkW2lzc3VlLmlkXSA9PT0gdHJ1ZSlcbiAgICAgICAgICBjb25zdCBjaGVja2VkT3BlbiA9IGNoZWNrZWRWaXNpYmxlLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpXG4gICAgICAgICAgY29uc3QgY2hlY2tlZE9wZW5UYXJnZXRzID0gQXJyYXkuZnJvbShuZXcgU2V0KGNoZWNrZWRPcGVuLm1hcCgoaXNzdWUpID0+IGlzc3VlLmNoYW5nZUlkKSkpXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAge2NvdW50cy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxidXR0b24ga2V5PXtpdGVtLmtleSA9PT0gJycgPyAnYWxsJyA6IGl0ZW0ua2V5fSBzdHlsZT17c3R5bGVzLmNoaXAoaXNzdWVTZXZlcml0eUZpbHRlciA9PT0gaXRlbS5rZXkpfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldElzc3VlU2V2ZXJpdHlGaWx0ZXIoaXRlbS5rZXkpIH19PlxuICAgICAgICAgICAgICAgICAgICB7aXRlbS5sYWJlbH0gXHUwMEI3IHtpdGVtLmNvdW50fVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICAgICAge29wZW5Db3VudH0gXHU1Rjg1XHU1OTA0XHU3NDA2IC8gXHU1MTcxIHthbGwubGVuZ3RofVxuICAgICAgICAgICAgICAgICAgeyhzdGF0ZT8ucmVzb2x2ZWRJc3N1ZVJldGVudGlvbkRheXMgPz8gMCkgPiAwID8gYCBcdTAwQjcgJHt0KCdyZXZpZXcucmV0ZW50aW9uSGludCcpLnJlcGxhY2UoJ3tkYXlzfScsIFN0cmluZyhzdGF0ZT8ucmVzb2x2ZWRJc3N1ZVJldGVudGlvbkRheXMgPz8gNykpfWAgOiAnJ31cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDhweCcgfX0gdmFsdWU9e2lzc3VlU3RhdHVzRmlsdGVyfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0SXNzdWVTdGF0dXNGaWx0ZXIoZS50YXJnZXQudmFsdWUpIH19PlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt0KCdyZXZpZXcuc3RhdHVzQWxsJyl9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoSVNTVUVfU1RBVFVTX0xBQkVMUykubWFwKChbdmFsdWUsIGxhYmVsXSkgPT4gPG9wdGlvbiBrZXk9e3ZhbHVlfSB2YWx1ZT17dmFsdWV9PntsYWJlbH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRJc3N1ZUNoZWNrZWQoKHByZXZpb3VzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsQ2hlY2tlZCA9IHZpc2libGUuZXZlcnkoKGlzc3VlKSA9PiBwcmV2aW91c1tpc3N1ZS5pZF0gPT09IHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfVxuICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXNzdWUgb2YgdmlzaWJsZSkgbmV4dFtpc3N1ZS5pZF0gPSAhYWxsQ2hlY2tlZFxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID57dCgncmV2aWV3LnNlbGVjdEFsbCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IHRpdGxlPXt0KCdyZXZpZXcuZXhwb3J0TWRIaW50Jyl9IG9uQ2xpY2s9eygpID0+IHsgZXhwb3J0SXNzdWVzTWQodmlzaWJsZSkgfX0+e3QoJ3Jldmlldy5leHBvcnRNZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IHRpdGxlPXt0KCdyZXZpZXcuc2VuZENoYXRIaW50Jyl9IG9uQ2xpY2s9eygpID0+IHsgc2VuZElzc3Vlc1RvQ2hhdCh2aXNpYmxlKSB9fT57J1x1RDgzRFx1RENBQyAnICsgdCgncmV2aWV3LnNlbmRDaGF0Jyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJc3N1ZXMoKSB9fT57dCgncmV2aWV3LnJlZnJlc2gnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHsoY2hlY2tlZFZpc2libGUubGVuZ3RoID4gMCB8fCBiYXRjaFZlcmlmeVN0YXRlICE9PSBudWxsKSAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBwYWRkaW5nOiAnNnB4IDEwcHgnLCBtYXJnaW5Cb3R0b206ICcxMHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgZm9udFNpemU6ICcxMXB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIHtiYXRjaFZlcmlmeVN0YXRlICE9PSBudWxsID8gKFxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgXHUyM0YzIHt0KCdyZXZpZXcuYmF0Y2hQcm9ncmVzcycpLnJlcGxhY2UoJ3tpfScsIFN0cmluZyhiYXRjaFZlcmlmeVN0YXRlLmRvbmUpKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoYmF0Y2hWZXJpZnlTdGF0ZS50b3RhbCkpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBiYXRjaFN0b3BSZWYuY3VycmVudCA9IHRydWUgfX0+e3QoJ3Jldmlldy5iYXRjaFN0b3AnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0KCdyZXZpZXcuY2hlY2tlZENvdW50JykucmVwbGFjZSgne259JywgU3RyaW5nKGNoZWNrZWRWaXNpYmxlLmxlbmd0aCkpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICB7Y2hlY2tlZE9wZW5UYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3Jldmlldy5iYXRjaFZlcmlmeUNvbmZpcm1Nc2cnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoY2hlY2tlZE9wZW5UYXJnZXRzLmxlbmd0aCkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogdCgncmV2aWV3LmJhdGNoVmVyaWZ5Q29uZmlybVRpdGxlJyksIG1lc3NhZ2U6IHQoJ3Jldmlldy5iYXRjaFZlcmlmeUNvbmZpcm1Nc2cnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoY2hlY2tlZE9wZW5UYXJnZXRzLmxlbmd0aCkpLCBkYW5nZXI6IGZhbHNlLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBydW5CYXRjaFZlcmlmeShjaGVja2VkT3BlblRhcmdldHMpIH0gfSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdUREMEQge3QoJ3Jldmlldy5iYXRjaFZlcmlmeScpfSh7U3RyaW5nKGNoZWNrZWRPcGVuVGFyZ2V0cy5sZW5ndGgpfSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIHtjaGVja2VkT3Blbi5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtYXJrSXNzdWVzSGFuZGxlZChjaGVja2VkT3Blbi5tYXAoKGlzc3VlKSA9PiBpc3N1ZS5pZCkpIH19Plx1MjcxMyB7dCgncmV2aWV3Lm1hcmtIYW5kbGVkJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IGV4cG9ydElzc3Vlc01kKGNoZWNrZWRWaXNpYmxlKSB9fT57dCgncmV2aWV3LmV4cG9ydE1kJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0SXNzdWVDaGVja2VkKHt9KSB9fT57dCgncGlja2VyLmNsZWFyJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge2FsbC5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57aXNzdWVzRGF0YSA9PT0gbnVsbCA/ICdcdTIwMjYnIDogdCgncmV2aWV3LnJlY29yZHNFbXB0eScpfTwvZGl2PlxuICAgICAgICAgICAgICApIDogdmlzaWJsZS5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnbm90ZXMuZW1wdHlTZWFyY2gnKX08L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IHZpc2libGUubWFwKChpc3N1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkID0gaXNzdWVFeHBhbmRlZFtpc3N1ZS5pZF0gPT09IHRydWVcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGlzc3VlLmRlc2NyaXB0aW9uID8/ICcnXG4gICAgICAgICAgICAgICAgY29uc3QgbG9uZyA9IGRlc2NyaXB0aW9uLmxlbmd0aCA+IDIwMFxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aXNzdWUuaWR9IHN0eWxlPXtzdHlsZXMubm90ZUNhcmR9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17aXNzdWVDaGVja2VkW2lzc3VlLmlkXSA9PT0gdHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHsgc2V0SXNzdWVDaGVja2VkKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFtpc3N1ZS5pZF06ICEocHJldmlvdXNbaXNzdWUuaWRdID09PSB0cnVlKSB9KSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luOiAwLCBmbGV4U2hyaW5rOiAwLCBjdXJzb3I6ICdwb2ludGVyJywgYWNjZW50Q29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShzZXZlcml0eUNvbG9yKGlzc3VlLnNldmVyaXR5KSl9Pntpc3N1ZS5zZXZlcml0eX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNzdWUuY2F0ZWdvcnkgPyA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNTc2MDZhJyl9Pntpc3N1ZS5jYXRlZ29yeX08L3NwYW4+IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJyA/ICcjZGNkY2FhJyA6IGlzc3VlLnN0YXR1cyA9PT0gJ3Jlc29sdmVkJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdhY2NlcHRlZCcgPyAnIzRlYzliMCcgOiAnIzhiOGI4YicpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge0lTU1VFX1NUQVRVU19MQUJFTFNbaXNzdWUuc3RhdHVzXSA/PyBpc3N1ZS5zdGF0dXN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVRleHR9Pntpc3N1ZS50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt2ZXJpZnlpbmdUYXJnZXQgIT09IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3Jldmlldy52ZXJpZnlIaW50Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHZlcmlmeUlzc3Vlcyhpc3N1ZS5jaGFuZ2VJZCkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPnt2ZXJpZnlpbmdUYXJnZXQgPT09IGlzc3VlLmNoYW5nZUlkID8gdCgncmV2aWV3LnZlcmlmeVJ1bm5pbmcnKSA6ICdcdUQ4M0RcdUREMEQgJyArIHQoJ3Jldmlldy52ZXJpZnknKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcuZmFsc2VQb3NpdGl2ZUhpbnQnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDb25maXJtRGlhbG9nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHQoJ3Jldmlldy5mYWxzZVBvc2l0aXZlVGl0bGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogdCgncmV2aWV3LmZhbHNlUG9zaXRpdmVNc2cnKS5yZXBsYWNlKCd7dGl0bGV9JywgaXNzdWUudGl0bGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW5nZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXMvc3RhdHVzJywgeyBpZDogaXNzdWUuaWQsIHN0YXR1czogJ3JlamVjdGVkJyB9KS50aGVuKGFzeW5jICh7IG9rIH0pID0+IHsgaWYgKG9rKSBhd2FpdCBsb2FkSXNzdWVzKCkgfSkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlx1RDgzRFx1REVBQiB7dCgncmV2aWV3LmZhbHNlUG9zaXRpdmUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcubWFya0hhbmRsZWQnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWFya0lzc3Vlc0hhbmRsZWQoW2lzc3VlLmlkXSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlx1MjcxMyB7dCgncmV2aWV3Lm1hcmtIYW5kbGVkJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2Rlc2NyaXB0aW9uICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNvbnRlbnQsIC4uLihsb25nICYmICFleHBhbmRlZCA/IHN0eWxlcy5ub3RlQ2xhbXAgOiB7fSkgfX0+e3JlbmRlcldpdGhQZWVrKGRlc2NyaXB0aW9uKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge2lzc3VlLnJlc29sdXRpb24gPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc2cHgnLCBwYWRkaW5nOiAnNnB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBiYWNrZ3JvdW5kOiAncmdiYSg3OCwgMjAxLCAxNzYsIDAuMDgpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoNzgsIDIwMSwgMTc2LCAwLjM1KScsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIFx1MjcxMyB7aXNzdWUucmVzb2x1dGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4U3RhdHMgIT0gbnVsbCB8fCBCb29sZWFuKGlzc3VlLmZpeERpZmYpKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmxpbmtCdG4sIG1hcmdpblRvcDogJzRweCcsIGRpc3BsYXk6ICdibG9jaycgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRGaXhFeHBhbmRlZCgocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBbaXNzdWUuaWRdOiAhKHByZXZpb3VzW2lzc3VlLmlkXSA9PT0gdHJ1ZSkgfSkpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFx1RDgzRFx1REQyNyB7dCgncmV2aWV3LmZpeERldGFpbCcpfVx1RkYwOHtTdHJpbmcoaXNzdWUuZml4U3RhdHM/LmZpbGVzID8/IDApfSB7dCgncmV2aWV3LmZpeFN0YXRGaWxlcycpfSBcdTAwQjcgK3tTdHJpbmcoaXNzdWUuZml4U3RhdHM/Lmluc2VydGlvbnMgPz8gMCl9IFx1MjIxMntTdHJpbmcoaXNzdWUuZml4U3RhdHM/LmRlbGV0aW9ucyA/PyAwKX1cdUZGMDl7Zml4RXhwYW5kZWRbaXNzdWUuaWRdID09PSB0cnVlID8gJ1x1MjVCMicgOiAnXHUyNUJDJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAge2ZpeEV4cGFuZGVkW2lzc3VlLmlkXSA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4RmlsZXMgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnM3B4JyB9fT57dCgncmV2aWV3LmZpeEZpbGVzJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4RmlsZXMgPz8gW10pLm1hcCgoZmlsZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtmaWxlfSBzdHlsZT17eyBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJywgZm9udFNpemU6ICcxMXB4JyB9fT57ZmlsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4SW1wYWN0ID8/IFtdKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzNweCcgfX0+e3QoJ3Jldmlldy5maXhJbXBhY3QnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzc3VlLmZpeEltcGFjdC5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5LnN5bWJvbH0gc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnNXB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyMwOTY5ZGEnKX0+e2VudHJ5LnN5bWJvbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsnICd9e3QoJ3Jldmlldy5kZWZpbmVkSW4nKX0ge2VudHJ5LmRlZmluZWRJbn0gXHUwMEI3IHtTdHJpbmcoZW50cnkuY2FsbGVycy5sZW5ndGgpfSB7dCgncmV2aWV3LmNhbGxDb3VudCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5jYWxsZXJzLnNsaWNlKDAsIDUpLm1hcCgoY2FsbGVyLCBjYWxsZXJJbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17Y2FsbGVySW5kZXh9IHN0eWxlPXt7IGZvbnRTaXplOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBwYWRkaW5nTGVmdDogJzEycHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSBkb3R0ZWQnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBvcGVuUGVlayhjYWxsZXIuZmlsZSwgTnVtYmVyKGNhbGxlci5saW5lKSkgfX0+e2NhbGxlci5maWxlfTp7Y2FsbGVyLmxpbmV9PC9zcGFuPiB7Y2FsbGVyLnNuaXBwZXQuc2xpY2UoMCwgODApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge0Jvb2xlYW4oaXNzdWUuZml4RGlmZikgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzNweCcgfX0+e3QoJ3Jldmlldy5maXhEaWZmJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1pbnNldCwgcmdiYSg1LDUsNSwwLjAzKSknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnNnB4IDhweCcsIG1heEhlaWdodDogJzMwMHB4Jywgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3JlbmRlckRpZmZMaW5lcyhpc3N1ZS5maXhEaWZmKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtsb25nICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMubGlua0J0bn0gb25DbGljaz17KCkgPT4geyBzZXRJc3N1ZUV4cGFuZGVkKHsgLi4uaXNzdWVFeHBhbmRlZCwgW2lzc3VlLmlkXTogIWV4cGFuZGVkIH0pIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2V4cGFuZGVkID8gdCgnbm90ZXMuY29sbGFwc2UnKSA6IHQoJ25vdGVzLmV4cGFuZCcpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0KCdyZXZpZXcudGFyZ2V0Jyl9OiB7aXNzdWVUYXJnZXRMYWJlbChpc3N1ZS5jaGFuZ2VJZCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntmb3JtYXRUaW1lKGlzc3VlLmNyZWF0ZWRBdCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApXG4gICAgICAgIH0pKCl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgndmVyaWZ5LnJlY29yZHMnKX0+XG4gICAgICAgIHt2ZXJpZmljYXRpb25zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCd2ZXJpZnkucmVjb3Jkc0VtcHR5Jyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7dmVyaWZpY2F0aW9ucy5zbGljZSgwLCAyMCkubWFwKChyZWNvcmQpID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtyZWNvcmQuaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UocmVjb3JkLnN0YXR1cyA9PT0gJ3Bhc3NlZCcgPyAnIzRlYzliMCcgOiAnI2RjZGNhYScpfT57cmVjb3JkLnN0YXR1c308L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57cmVjb3JkLm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Zm9ybWF0VGltZShyZWNvcmQuY3JlYXRlZEF0KX08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgIDwvPlxuICApXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm9vdH0gZGF0YS10ZXN0aWQ9XCJwcm9qZWN0LWNvbnRyb2wtd29ya3NwYWNlXCI+XG4gICAgICB7cHJvcHMubGF5b3V0TW9kZSAhPT0gJ292ZXJsYXknICYmIDxzdHlsZT57TEFZT1VUX1NUWUxFfTwvc3R5bGU+fVxuICAgICAge3Byb3BzLmxheW91dE1vZGUgIT09ICdvdmVybGF5JyAmJiA8ZGl2XG4gICAgICAgIGRhdGEtdGVzdGlkPVwicHJvamVjdC1jb250cm9sLWRpdmlkZXJcIlxuICAgICAgICBvblBvaW50ZXJEb3duPXtvbkRpdmlkZXJEb3dufVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IC00LCB3aWR0aDogOCxcbiAgICAgICAgICBjdXJzb3I6ICdjb2wtcmVzaXplJywgekluZGV4OiAyMCxcbiAgICAgICAgfX1cbiAgICAgIC8+fVxuICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5hdn0+XG4gICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMudGl0bGV9Pnt0KCd3b3Jrc3BhY2UudGl0bGUnKX08L3NwYW4+XG4gICAgICAgIHt0YWJzLm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICA8YnV0dG9uIGtleT17ZW50cnkua2V5fSBzdHlsZT17c3R5bGVzLnRhYih0YWIgPT09IGVudHJ5LmtleSl9IG9uQ2xpY2s9eygpID0+IHsgc2V0VGFiKGVudHJ5LmtleSkgfX0+e2VudHJ5LmxhYmVsfTwvYnV0dG9uPlxuICAgICAgICApKX1cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcnVubmluZ0NvdW50ID0gcnVucy5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5zdGF0dXMgPT09ICdydW5uaW5nJyB8fCBlbnRyeS5zdGF0dXMgPT09ICdxdWV1ZWQnIHx8IGVudHJ5LnN0YXR1cyA9PT0gJ3ZlcmlmeWluZycpLmxlbmd0aFxuICAgICAgICAgIGNvbnN0IGZhaWxlZENvdW50ID0gcnVucy5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5zdGF0dXMgPT09ICdmYWlsZWQnIHx8IGVudHJ5LnN0YXR1cyA9PT0gJ3BhdXNlZCcpLmxlbmd0aFxuICAgICAgICAgIGlmIChydW5uaW5nQ291bnQgPT09IDAgJiYgZmFpbGVkQ291bnQgPT09IDApIHJldHVybiBudWxsXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgbWFyZ2luTGVmdDogJzRweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICB7cnVubmluZ0NvdW50ID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UodGhlbWVBd2FyZVRleHQoJyMyNTYzZWInKSksIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXI6ICdub25lJyB9fSB0aXRsZT17dCgnYmFkZ2UucnVubmluZycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhydW5uaW5nQ291bnQpKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0VGFiKCdleGVjdXRpb24nKSB9fT5cdTI1QjYge1N0cmluZyhydW5uaW5nQ291bnQpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7ZmFpbGVkQ291bnQgPiAwICYmIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5iYWRnZSh0aGVtZUF3YXJlVGV4dCgnI2YxNGM0YycpKSwgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlcjogJ25vbmUnIH19IHRpdGxlPXt0KCdiYWRnZS5mYWlsZWQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoZmFpbGVkQ291bnQpKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0VGFiKCdleGVjdXRpb24nKSB9fT5cdTI3MTcge1N0cmluZyhmYWlsZWRDb3VudCl9PC9idXR0b24+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKVxuICAgICAgICB9KSgpfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuYm9keX0+XG4gICAgICAgIHtwcm9wcy5zZXNzaW9uSWQgPT09IHVuZGVmaW5lZCB8fCBwcm9wcy5zZXNzaW9uSWQgPT09ICcnID8gPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnd29ya3NwYWNlLnNlbGVjdFNlc3Npb24nKX08L2Rpdj4gOiA8PlxuICAgICAgICAgIHtsb2FkRXJyb3IgIT09IG51bGwgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZXJyb3IubG9hZCcpfToge2xvYWRFcnJvcn08L2Rpdj59XG4gICAgICAgICAge3N0YXRlPy5yZWFkeSA9PT0gZmFsc2UgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57c3RhdGUucmVhc29uID8/ICcnfTwvZGl2Pn1cbiAgICAgICAgICB7dGFiID09PSAnY29tbWl0cycgJiYgY29tbWl0c1RhYn1cbiAgICAgICAgICB7dGFiID09PSAnb3ZlcnZpZXcnICYmIG92ZXJ2aWV3VGFifVxuICAgICAgICAgIHt0YWIgPT09ICdleGVjdXRpb24nICYmIGV4ZWN1dGlvblRhYn1cbiAgICAgICAgICB7dGFiID09PSAncmV2aWV3JyAmJiByZXZpZXdUYWJ9XG4gICAgICAgICAge3RhYiA9PT0gJ25vdGVzJyAmJiBub3Rlc1RhYn1cbiAgICAgICAgICB7dGFiID09PSAnc2V0dGluZ3MnICYmIHNldHRpbmdzVGFifVxuICAgICAgICA8Lz59XG4gICAgICA8L2Rpdj5cbiAgICAgIHtjb25maXJtRGlhbG9nICE9PSBudWxsICYmIChcbiAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICB0aXRsZT17Y29uZmlybURpYWxvZy50aXRsZX1cbiAgICAgICAgICBtZXNzYWdlPXtjb25maXJtRGlhbG9nLm1lc3NhZ2V9XG4gICAgICAgICAgZGFuZ2VyPXtjb25maXJtRGlhbG9nLmRhbmdlcn1cbiAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKG51bGwpIH19XG4gICAgICAgICAgb25Db25maXJtPXsoKSA9PiB7IGNvbmZpcm1EaWFsb2cub25Db25maXJtKCk7IHNldENvbmZpcm1EaWFsb2cobnVsbCkgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7cGVlayAhPT0gbnVsbCAmJiAoXG4gICAgICAgIDxkaXYgZGF0YS10ZXN0aWQ9XCJwYy1wZWVrLW92ZXJsYXlcIiBzdHlsZT17eyBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIGJhY2tncm91bmQ6ICdyZ2JhKDE1LDIzLDQyLDAuNDUpJywgYmFja2Ryb3BGaWx0ZXI6ICdibHVyKDJweCknLCB6SW5kZXg6IDEwMDAsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBlZWsobnVsbCkgfX0+XG4gICAgICAgICAgPGRpdiBkYXRhLXRlc3RpZD1cInBjLXBlZWstY2FyZFwiIHN0eWxlPXt7IHdpZHRoOiAnbWluKDc2MHB4LCA5MnZ3KScsIG1heEhlaWdodDogJzgwdmgnLCBvdmVyZmxvdzogJ2hpZGRlbicsIGJvcmRlclJhZGl1czogJzEwcHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm94U2hhZG93OiAnMCAxNnB4IDQ4cHggcmdiYSgwLDAsMCwwLjI1KScsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicgfX0gb25DbGljaz17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKSB9fT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgcGFkZGluZzogJzEwcHggMTRweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJyB9fT5cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCwgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57cGVlay5wYXRofTp7U3RyaW5nKHBlZWsubGluZSl9PC9zcGFuPlxuICAgICAgICAgICAgICB7cGVla0RhdGE/LmV4aXN0cyA9PT0gdHJ1ZSAmJiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57U3RyaW5nKHBlZWtEYXRhLnN0YXJ0TGluZSl9XHUyMDEze1N0cmluZyhwZWVrRGF0YS5lbmRMaW5lKX0gLyB7U3RyaW5nKHBlZWtEYXRhLnRvdGFsTGluZXMpfSBcdTg4NEM8L3NwYW4+fVxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCAxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBlZWsobnVsbCkgfX0+XHUyNzE1PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3c6ICdhdXRvJywgcGFkZGluZzogJzEwcHggMCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctaW5zZXQsIHJnYmEoNSw1LDUsMC4wMykpJyB9fT5cbiAgICAgICAgICAgICAge3BlZWtCdXN5ICYmIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLmVtcHR5IH19Plx1OEJGQlx1NTNENlx1NEUyRFx1MjAyNjwvZGl2Pn1cbiAgICAgICAgICAgICAgeyFwZWVrQnVzeSAmJiBwZWVrRGF0YSAhPT0gbnVsbCAmJiBwZWVrRGF0YS5leGlzdHMgPT09IGZhbHNlICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+XHU2NTg3XHU0RUY2XHU0RTBEXHU1QjU4XHU1NzI4XHVGRjA4XHU1M0VGXHU4MEZEXHU1REYyXHU4OEFCXHU1MjIwXHU5NjY0XHU2MjE2XHU3OUZCXHU1MkE4XHVGRjA5PC9kaXY+fVxuICAgICAgICAgICAgICB7IXBlZWtCdXN5ICYmIHBlZWtEYXRhPy5leGlzdHMgPT09IHRydWUgJiYgKHBlZWtEYXRhLmxpbmVzID8/IFtdKS5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5Lm59IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIHBhZGRpbmc6ICcwIDE0cHgnLCBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJywgZm9udFNpemU6ICcxMS41cHgnLCBsaW5lSGVpZ2h0OiAxLjcsIGJhY2tncm91bmQ6IGVudHJ5Lm4gPT09IHBlZWsubGluZSA/ICdyZ2JhKDM3LDk5LDIzNSwwLjA4KScgOiAndHJhbnNwYXJlbnQnIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2lkdGg6IDQwLCB0ZXh0QWxpZ246ICdyaWdodCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmbGV4U2hyaW5rOiAwIH19PntTdHJpbmcoZW50cnkubil9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57ZW50cnkudGV4dCA9PT0gJycgPyAnXFx1MDBBMCcgOiBlbnRyeS50ZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApXG59XG4iLCAiLyoqXG4gKiBcdTYzRDBcdTRFQTRcdThGNkVcdTZCMjFcdTgwNUFcdTdDN0JcdUZGMDhcdTVCQTJcdTYyMzdcdTdBRUZcdUZGMDlcdUZGMUFcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTUzRjBcdTc2ODRcdTRFMEJcdTYyQzlcdTY4NDZcdTYzMDlcdTMwMENcdTRFMDBcdThGNkVcdTVERTVcdTRGNUNcdTMwMERcdTUyMDZcdTdFQzRcdTVDNTVcdTc5M0FcdTMwMDJcbiAqIFx1NEUwRSBydW50aW1lL2hpc3RvcnkudHMgXHU3Njg0IGNsdXN0ZXJDb21taXRzIFx1NEZERFx1NjMwMVx1NTQwQ1x1NEUwMFx1NTQyRlx1NTNEMVx1NUYwRlx1RkYwOFYxLjAgXHUwMEE3OTcvXHUwMEE3OTlcdUZGMDlcdUZGMUFcbiAqIFx1NzZGOFx1OTBCQlx1NjNEMFx1NEVBNFx1NjVGNlx1OTVGNFx1OTVGNFx1OTY5NFx1OEQ4NVx1OEZDN1x1N0E5N1x1NTNFM1x1RkYwOFx1OUVEOFx1OEJBNCAzNmhcdUZGMDlcdTUyMDdcdTY1QURcdUZGMUJcdThGREVcdTdFRUQgXHUyMjY1MyBcdTRFMkFcdTYzRDBcdTRFQTRcdTU0MEVcdTRFMEVcdTVERjJcdTgwNUFcdTY1ODdcdTRFRjZcbiAqIFx1OTZGNlx1OTFDRFx1NTNFMFx1NEU1Rlx1NTIwN1x1NjVBRFx1MzAwMlx1NjcwRFx1NTJBMVx1N0FFRlx1OTBBM1x1NEVGRFx1NURFNVx1NEY1Q1x1NTcyOCBnaXQgXHU2MjZCXHU2M0NGXHU1QzQyXHVGRjA4XHU5MUNEXHU1RUZBXHU1Mzg2XHU1M0YyXHVGRjA5XHVGRjBDXHU4RkQ5XHU0RUZEXHU5NzYyXHU1NDExXG4gKiAvY29tbWl0cyBcdThGRDRcdTU2REVcdTc2ODRcdTYzRDBcdTRFQTRcdTY3NjFcdTc2RUVcdTIwMTRcdTIwMTRcdTRFMjRcdTU5MDRcdTg5QzRcdTUyMTlcdTY1MzlcdTUyQThcdTVGQzVcdTk4N0JcdTU0MENcdTZCNjVcdTMwMDJcbiAqXG4gKiBAbW9kdWxlIGRzaC1jbGllbnQtcHJvamVjdC1jb250cm9sL2NvbXBvbmVudHMvY29tbWl0LXJvdW5kc1xuICovXG5cbi8qKiBcdTgwNUFcdTdDN0JcdThGOTNcdTUxNjVcdTc2ODRcdTY3MDBcdTVDMEZcdTVGNjJcdTcyQjZcdUZGMDgvY29tbWl0cyBcdTc2ODRcdTYzRDBcdTRFQTRcdTY3NjFcdTc2RUVcdTVCNTBcdTk2QzZcdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBpbnRlcmZhY2UgUm91bmRDb21taXQge1xuICBzaGE6IHN0cmluZ1xuICAvKiogXHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0XHVGRjA4XHU2QkVCXHU3OUQyXHVGRjA5XHUzMDAyICovXG4gIGRhdGU6IG51bWJlclxuICAvKiogXHU2RDg5XHU1M0NBXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0XHVGRjA4XHU3NkY4XHU1QkY5XHU0RUQzXHU1RTkzXHU2ODM5XHVGRjA5XHUzMDAyICovXG4gIGZpbGVzOiBzdHJpbmdbXVxufVxuXG4vKiogXHU0RTAwXHU4RjZFXHU1REU1XHU0RjVDXHVGRjFBXHU0RkREXHU2MzAxXHU0RjIwXHU1MTY1XHU5ODdBXHU1RThGXHU3Njg0XHU2M0QwXHU0RUE0XHU1MjE3XHU4ODY4XHVGRjA4L2NvbW1pdHMgXHU0RTNBXHU2NUIwXHUyMTkyXHU2NUU3XHVGRjA5KyBcdTY1RjZcdTk1RjRcdTgzMDNcdTU2RjRcdTMwMDIgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0Um91bmQge1xuICBjb21taXRzOiBSb3VuZENvbW1pdFtdXG4gIC8qKiBcdThGNkVcdTUxODVcdTY3MDBcdTY1RTlcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdTMwMDIgKi9cbiAgZmlyc3RBdDogbnVtYmVyXG4gIC8qKiBcdThGNkVcdTUxODVcdTY3MDBcdTY2NUFcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdTMwMDIgKi9cbiAgbGFzdEF0OiBudW1iZXJcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUk9VTkRfR0FQX01TID0gMzYgKiA2MCAqIDYwICogMTAwMFxuXG4vKiogXHU0RTBFXHU2NzBEXHU1MkExXHU3QUVGIGNsdXN0ZXJDb21taXRzIFx1NzZGOFx1NTQwQ1x1NzY4NFx1OTFDRFx1NTNFMFx1NzM4N1x1RkYxQVx1NTQ3RFx1NEUyRFx1NjU4N1x1NEVGNlx1NjU3MCAvIG1heChcdTY3MkNcdTYzRDBcdTRFQTRcdTY1ODdcdTRFRjZcdTY1NzAsIDEpXHUzMDAyICovXG5mdW5jdGlvbiBvdmVybGFwUmF0aW8oZmlsZXM6IHN0cmluZ1tdLCBleGlzdGluZzogU2V0PHN0cmluZz4pOiBudW1iZXIge1xuICBpZiAoZXhpc3Rpbmcuc2l6ZSA9PT0gMCkgcmV0dXJuIDBcbiAgbGV0IGhpdHMgPSAwXG4gIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykgaWYgKGV4aXN0aW5nLmhhcyhmaWxlKSkgaGl0cyArPSAxXG4gIHJldHVybiBoaXRzIC8gTWF0aC5tYXgoZmlsZXMubGVuZ3RoLCAxKVxufVxuXG4vKipcbiAqIFx1NjI4QVx1RkYwOFx1NjVCMFx1MjE5Mlx1NjVFN1x1NjIxNlx1NjVFN1x1MjE5Mlx1NjVCMFx1NTc0N1x1NTNFRlx1RkYwOVx1OEZERVx1N0VFRFx1NjNEMFx1NEVBNFx1ODA1QVx1NjIxMFx1OEY2RVx1NkIyMVx1MzAwMlxuICogXHU2NUY2XHU5NUY0XHU5NUY0XHU5Njk0XHU1M0Q2XHU3RUREXHU1QkY5XHU1MDNDXHVGRjFBXHU1MjE3XHU4ODY4XHU5ODdBXHU1RThGXHU0RTBEXHU0RkREXHU4QkMxXHU2NUY2XHU5NUY0XHU2NUI5XHU1NDExXHUzMDAyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbHVzdGVySW50b1JvdW5kcyhjb21taXRzOiBSb3VuZENvbW1pdFtdLCBjbHVzdGVyR2FwTXM6IG51bWJlciA9IERFRkFVTFRfUk9VTkRfR0FQX01TKTogQ29tbWl0Um91bmRbXSB7XG4gIGNvbnN0IHJvdW5kczogQ29tbWl0Um91bmRbXSA9IFtdXG4gIGxldCBjdXJyZW50OiBSb3VuZENvbW1pdFtdID0gW11cbiAgbGV0IGN1cnJlbnRGaWxlcyA9IG5ldyBTZXQ8c3RyaW5nPigpXG5cbiAgY29uc3QgcHVzaFJvdW5kID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmIChjdXJyZW50Lmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgY29uc3QgdGltZXMgPSBjdXJyZW50Lm1hcCgoY29tbWl0KSA9PiBjb21taXQuZGF0ZSlcbiAgICByb3VuZHMucHVzaCh7IGNvbW1pdHM6IGN1cnJlbnQsIGZpcnN0QXQ6IE1hdGgubWluKC4uLnRpbWVzKSwgbGFzdEF0OiBNYXRoLm1heCguLi50aW1lcykgfSlcbiAgICBjdXJyZW50ID0gW11cbiAgICBjdXJyZW50RmlsZXMgPSBuZXcgU2V0KClcbiAgfVxuXG4gIGZvciAoY29uc3QgY29tbWl0IG9mIGNvbW1pdHMpIHtcbiAgICBjb25zdCBwcmV2aW91cyA9IGN1cnJlbnRbY3VycmVudC5sZW5ndGggLSAxXVxuICAgIGNvbnN0IGdhcEJyZWFrID0gcHJldmlvdXMgIT09IHVuZGVmaW5lZCAmJiBNYXRoLmFicyhjb21taXQuZGF0ZSAtIHByZXZpb3VzLmRhdGUpID4gY2x1c3RlckdhcE1zXG4gICAgY29uc3QgZmlsZUJyZWFrID0gY3VycmVudC5sZW5ndGggPj0gMyAmJiBvdmVybGFwUmF0aW8oY29tbWl0LmZpbGVzLCBjdXJyZW50RmlsZXMpID09PSAwXG4gICAgaWYgKGdhcEJyZWFrIHx8IGZpbGVCcmVhaykgcHVzaFJvdW5kKClcbiAgICBjdXJyZW50LnB1c2goY29tbWl0KVxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBjb21taXQuZmlsZXMpIGN1cnJlbnRGaWxlcy5hZGQoZmlsZSlcbiAgfVxuICBwdXNoUm91bmQoKVxuICByZXR1cm4gcm91bmRzXG59XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUxheW91dEVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSwgdXNlU3luY0V4dGVybmFsU3RvcmUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFdvcmtzcGFjZUZyYW1lIH0gZnJvbSAnLi9Xb3Jrc3BhY2VGcmFtZS50c3gnXG5cbmludGVyZmFjZSBDdXJyZW50U2Vzc2lvbiB7XG4gIGdldFNuYXBzaG90KCk6IHsga2V5Pzogc3RyaW5nIH1cbiAgc3Vic2NyaWJlKGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogKCkgPT4gdm9pZFxufVxuXG5pbnRlcmZhY2UgUGFuZWxJbmZvIHtcbiAgZ2V0U25hcHNob3QoKTogeyBhY3RpdmVQYW5lbElkOiBzdHJpbmcgfCBudWxsIH1cbiAgc3Vic2NyaWJlKGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogKCkgPT4gdm9pZFxufVxuXG5pbnRlcmZhY2UgTW9kZXJuV29ya3NwYWNlUHJvcHMge1xuICBjdXJyZW50OiBDdXJyZW50U2Vzc2lvblxuICBwYW5lbEluZm86IFBhbmVsSW5mb1xuICBlbmFibGVkOiBib29sZWFuXG4gIG9uRGlzbWlzczogKCkgPT4gdm9pZFxufVxuXG5pbnRlcmZhY2UgQm91bmRzIHtcbiAgbGVmdDogbnVtYmVyXG4gIHRvcDogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdvcmtzcGFjZUJvdW5kcyhmcmFtZTogQm91bmRzLCBjZW50ZXI6IEJvdW5kcywgY2hhdFdpZHRoOiBudW1iZXIpOiBCb3VuZHMgfCB1bmRlZmluZWQge1xuICBjb25zdCBhdmFpbGFibGUgPSBNYXRoLmZsb29yKGNlbnRlci53aWR0aClcbiAgaWYgKGF2YWlsYWJsZSA8IDU2MCB8fCBjZW50ZXIuaGVpZ2h0IDw9IDApIHJldHVybiB1bmRlZmluZWRcbiAgY29uc3QgY2hhdCA9IE1hdGgubWF4KDI4MCwgTWF0aC5taW4oY2hhdFdpZHRoLCBhdmFpbGFibGUgLSAyODApKVxuICByZXR1cm4ge1xuICAgIGxlZnQ6IGNlbnRlci5sZWZ0IC0gZnJhbWUubGVmdCxcbiAgICB0b3A6IGNlbnRlci50b3AgLSBmcmFtZS50b3AsXG4gICAgd2lkdGg6IGF2YWlsYWJsZSAtIGNoYXQsXG4gICAgaGVpZ2h0OiBjZW50ZXIuaGVpZ2h0LFxuICB9XG59XG5cbi8qKiBcdTY1QjBcdTcyNDhcdTVCQkZcdTRFM0JcdTc2ODRcdTUyQTBcdTZDRDVcdTZENkVcdTVDNDJcdUZGMUJcdTRFQzVcdTUzOEJcdTdGMjlcdTRGMUFcdThCRERcdTUyMTdcdUZGMENcdTRFMERcdTY1MzlcdTUzRDhcdTVCOThcdTY1QjlcdTUzRjNcdTRGQTdcdTY4MEZcdTYyMTZcdTdGNTFcdTY4M0NcdTZBMjFcdTY3N0ZcdTMwMDIgKi9cbmV4cG9ydCBmdW5jdGlvbiBNb2Rlcm5Xb3Jrc3BhY2UoeyBjdXJyZW50LCBwYW5lbEluZm8sIGVuYWJsZWQsIG9uRGlzbWlzcyB9OiBNb2Rlcm5Xb3Jrc3BhY2VQcm9wcykge1xuICBjb25zdCBzZXNzaW9uSWQgPSB1c2VTeW5jRXh0ZXJuYWxTdG9yZShcbiAgICAobGlzdGVuZXIpID0+IGN1cnJlbnQuc3Vic2NyaWJlKGxpc3RlbmVyKSxcbiAgICAoKSA9PiBjdXJyZW50LmdldFNuYXBzaG90KCkua2V5LFxuICApXG4gIGNvbnN0IGFjdGl2ZVBhbmVsSWQgPSB1c2VTeW5jRXh0ZXJuYWxTdG9yZShcbiAgICAobGlzdGVuZXIpID0+IHBhbmVsSW5mby5zdWJzY3JpYmUobGlzdGVuZXIpLFxuICAgICgpID0+IHBhbmVsSW5mby5nZXRTbmFwc2hvdCgpLmFjdGl2ZVBhbmVsSWQsXG4gIClcbiAgY29uc3QgdmlzaWJsZSA9IGVuYWJsZWQgJiYgYWN0aXZlUGFuZWxJZCA9PT0gbnVsbFxuICBjb25zdCBkcmFnQ2xlYW51cCA9IHVzZVJlZjwoKCkgPT4gdm9pZCkgfCB1bmRlZmluZWQ+KClcbiAgY29uc3QgW2JvdW5kcywgc2V0Qm91bmRzXSA9IHVzZVN0YXRlPEJvdW5kcyB8IHVuZGVmaW5lZD4oKVxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4gKCkgPT4geyBkcmFnQ2xlYW51cC5jdXJyZW50Py4oKSB9LCBbdmlzaWJsZV0pXG4gIGNvbnN0IFtjaGF0V2lkdGgsIHNldENoYXRXaWR0aF0gPSB1c2VTdGF0ZSgoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BjLmNoYXRXaWR0aCcpID8/ICcnKVxuICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUoc2F2ZWQpICYmIHNhdmVkID49IDI4MCA/IHNhdmVkIDogMzYwXG4gIH0pXG5cbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXZpc2libGUpIHJldHVyblxuICAgIGNvbnN0IHJpZ2h0YmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJ1tkYXRhLXJpZ2h0YmFyLWNvbF0nKVxuICAgIGNvbnN0IGZyYW1lID0gcmlnaHRiYXI/LnBhcmVudEVsZW1lbnRcbiAgICBjb25zdCBjZW50ZXJzID0gZnJhbWU/LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KCc6c2NvcGUgPiBkaXZbY2xhc3MqPVwiY2VudGVyQ29sXCJdJylcbiAgICBpZiAoZnJhbWUgPT09IHVuZGVmaW5lZCB8fCBmcmFtZSA9PT0gbnVsbCB8fCBjZW50ZXJzPy5sZW5ndGggIT09IDEpIHtcbiAgICAgIG9uRGlzbWlzcygpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgY2VudGVyID0gY2VudGVyc1swXSFcbiAgICBjb25zdCBvbGRQYWRkaW5nID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctbGVmdCcpXG4gICAgY29uc3Qgb2xkUGFkZGluZ1ByaW9yaXR5ID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5UHJpb3JpdHkoJ3BhZGRpbmctbGVmdCcpXG4gICAgY29uc3Qgb2xkQm94U2l6aW5nID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2JveC1zaXppbmcnKVxuICAgIGNvbnN0IG9sZEJveFNpemluZ1ByaW9yaXR5ID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5UHJpb3JpdHkoJ2JveC1zaXppbmcnKVxuICAgIGxldCBhcHBsaWVkUGFkZGluZyA9ICcnXG4gICAgbGV0IGFjdGl2ZSA9IHRydWVcblxuICAgIGNvbnN0IHVwZGF0ZSA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICghYWN0aXZlKSByZXR1cm5cbiAgICAgIGNvbnN0IG5leHQgPSB3b3Jrc3BhY2VCb3VuZHMoZnJhbWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIGNlbnRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgY2hhdFdpZHRoKVxuICAgICAgaWYgKG5leHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvbkRpc21pc3MoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhZGRpbmcgPSBgJHtuZXh0LndpZHRofXB4YFxuICAgICAgaWYgKHBhZGRpbmcgIT09IGFwcGxpZWRQYWRkaW5nKSB7XG4gICAgICAgIGNlbnRlci5zdHlsZS5zZXRQcm9wZXJ0eSgncGFkZGluZy1sZWZ0JywgcGFkZGluZywgJ2ltcG9ydGFudCcpXG4gICAgICAgIGFwcGxpZWRQYWRkaW5nID0gcGFkZGluZ1xuICAgICAgfVxuICAgICAgY2VudGVyLnN0eWxlLnNldFByb3BlcnR5KCdib3gtc2l6aW5nJywgJ2JvcmRlci1ib3gnLCAnaW1wb3J0YW50JylcbiAgICAgIHNldEJvdW5kcygocHJldmlvdXMpID0+IHByZXZpb3VzPy5sZWZ0ID09PSBuZXh0LmxlZnQgJiYgcHJldmlvdXMudG9wID09PSBuZXh0LnRvcCAmJiBwcmV2aW91cy53aWR0aCA9PT0gbmV4dC53aWR0aCAmJiBwcmV2aW91cy5oZWlnaHQgPT09IG5leHQuaGVpZ2h0ID8gcHJldmlvdXMgOiBuZXh0KVxuICAgIH1cbiAgICBjb25zdCByZXNpemUgPSBuZXcgUmVzaXplT2JzZXJ2ZXIodXBkYXRlKVxuICAgIHJlc2l6ZS5vYnNlcnZlKGZyYW1lKVxuICAgIHJlc2l6ZS5vYnNlcnZlKGNlbnRlcilcbiAgICBjb25zdCBtdXRhdGlvbnMgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAoIWZyYW1lLmhhc0F0dHJpYnV0ZSgnZGF0YS1yaWdodGJhci1jb2xsYXBzZWQnKSkgb25EaXNtaXNzKClcbiAgICAgIGVsc2UgdXBkYXRlKClcbiAgICB9KVxuICAgIG11dGF0aW9ucy5vYnNlcnZlKGZyYW1lLCB7IGF0dHJpYnV0ZXM6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogWydkYXRhLXJpZ2h0YmFyLWNvbGxhcHNlZCddIH0pXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZSlcbiAgICB1cGRhdGUoKVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBhY3RpdmUgPSBmYWxzZVxuICAgICAgcmVzaXplLmRpc2Nvbm5lY3QoKVxuICAgICAgbXV0YXRpb25zLmRpc2Nvbm5lY3QoKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZSlcbiAgICAgIGlmIChjZW50ZXIuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1sZWZ0JykgPT09IGFwcGxpZWRQYWRkaW5nKSB7XG4gICAgICAgIGlmIChvbGRQYWRkaW5nID09PSAnJykgY2VudGVyLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLWxlZnQnKVxuICAgICAgICBlbHNlIGNlbnRlci5zdHlsZS5zZXRQcm9wZXJ0eSgncGFkZGluZy1sZWZ0Jywgb2xkUGFkZGluZywgb2xkUGFkZGluZ1ByaW9yaXR5KVxuICAgICAgfVxuICAgICAgaWYgKGNlbnRlci5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdib3gtc2l6aW5nJykgPT09ICdib3JkZXItYm94Jykge1xuICAgICAgICBpZiAob2xkQm94U2l6aW5nID09PSAnJykgY2VudGVyLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdib3gtc2l6aW5nJylcbiAgICAgICAgZWxzZSBjZW50ZXIuc3R5bGUuc2V0UHJvcGVydHkoJ2JveC1zaXppbmcnLCBvbGRCb3hTaXppbmcsIG9sZEJveFNpemluZ1ByaW9yaXR5KVxuICAgICAgfVxuICAgICAgc2V0Qm91bmRzKHVuZGVmaW5lZClcbiAgICB9XG4gIH0sIFt2aXNpYmxlLCBjaGF0V2lkdGgsIG9uRGlzbWlzc10pXG5cbiAgaWYgKCF2aXNpYmxlIHx8IGJvdW5kcyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IG9uRGl2aWRlckRvd24gPSAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zdCBvbk1vdmUgPSAobW92ZTogUG9pbnRlckV2ZW50KTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCdbZGF0YS1yaWdodGJhci1jb2xdJyk/LnBhcmVudEVsZW1lbnRcbiAgICAgIGNvbnN0IGNlbnRlciA9IGZyYW1lPy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignOnNjb3BlID4gZGl2W2NsYXNzKj1cImNlbnRlckNvbFwiXScpXG4gICAgICBpZiAoY2VudGVyID09PSB1bmRlZmluZWQgfHwgY2VudGVyID09PSBudWxsKSByZXR1cm5cbiAgICAgIGNvbnN0IHdpZHRoID0gTWF0aC5tYXgoMjgwLCBNYXRoLm1pbig5MDAsIE1hdGgucm91bmQoY2VudGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0IC0gbW92ZS5jbGllbnRYKSkpXG4gICAgICBzZXRDaGF0V2lkdGgod2lkdGgpXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGMuY2hhdFdpZHRoJywgU3RyaW5nKHdpZHRoKSlcbiAgICB9XG4gICAgY29uc3Qgb25VcCA9ICgpOiB2b2lkID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSlcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJjYW5jZWwnLCBvblVwKVxuICAgICAgZHJhZ0NsZWFudXAuY3VycmVudCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgICBkcmFnQ2xlYW51cC5jdXJyZW50Py4oKVxuICAgIGRyYWdDbGVhbnVwLmN1cnJlbnQgPSBvblVwXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyY2FuY2VsJywgb25VcClcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXRlc3RpZD1cInByb2plY3QtY29udHJvbC1tb2Rlcm4td29ya3NwYWNlXCIgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIC4uLmJvdW5kcywgcG9pbnRlckV2ZW50czogJ2F1dG8nIH19PlxuICAgICAgPFdvcmtzcGFjZUZyYW1lIGtleT17c2Vzc2lvbklkID8/ICdsYW5kaW5nJ30gey4uLihzZXNzaW9uSWQgPT09IHVuZGVmaW5lZCA/IHt9IDogeyBzZXNzaW9uSWQgfSl9IGxheW91dE1vZGU9XCJvdmVybGF5XCIgLz5cbiAgICAgIDxkaXYgZGF0YS10ZXN0aWQ9XCJwcm9qZWN0LWNvbnRyb2wtbW9kZXJuLWRpdmlkZXJcIiBvblBvaW50ZXJEb3duPXtvbkRpdmlkZXJEb3dufSBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAwLCBib3R0b206IDAsIHJpZ2h0OiAtNCwgd2lkdGg6IDgsIGN1cnNvcjogJ2NvbC1yZXNpemUnLCB6SW5kZXg6IDIwIH19IC8+XG4gICAgPC9kaXY+XG4gIClcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpQkEsSUFBQUEsZ0JBQWtCOzs7QUNObEIsbUJBQWtCOzs7QUNNWCxTQUFTLFdBQVcsT0FBZ0Q7QUFDekUsUUFBTSxNQUFNLG9CQUFvQixLQUFLLEtBQUs7QUFDMUMsTUFBSSxRQUFRLE1BQU07QUFDaEIsVUFBTSxRQUFRLE9BQU8sU0FBUyxJQUFJLENBQUMsR0FBSSxFQUFFO0FBQ3pDLFdBQU8sQ0FBRSxTQUFTLEtBQU0sS0FBTSxTQUFTLElBQUssS0FBSyxRQUFRLEdBQUc7QUFBQSxFQUM5RDtBQUNBLFFBQU0sYUFBYSxzREFBc0QsS0FBSyxLQUFLO0FBQ25GLE1BQUksZUFBZSxNQUFNO0FBQ3ZCLFdBQU8sQ0FBQyxPQUFPLFdBQVcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxXQUFXLENBQUMsQ0FBQyxHQUFHLE9BQU8sV0FBVyxDQUFD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QUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHdCQUF3QjtBQUFBLElBQ3hCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHlCQUF5QjtBQUFBLElBQ3pCLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLGtCQUFrQjtBQUFBLElBQ2xCLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHdCQUF3QjtBQUFBLElBQ3hCLDRCQUE0QjtBQUFBLElBQzVCLDZCQUE2QjtBQUFBLElBQzdCLDJCQUEyQjtBQUFBLElBQzNCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLHdCQUF3QjtBQUFBLElBQ3hCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBQ3hCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGtDQUFrQztBQUFBLElBQ2xDLGdDQUFnQztBQUFBLElBQ2hDLG9CQUFvQjtBQUFBLElBQ3BCLHdCQUF3QjtBQUFBLElBQ3hCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLCtCQUErQjtBQUFBLElBQy9CLDZCQUE2QjtBQUFBLElBQzdCLHVCQUF1QjtBQUFBLElBQ3ZCLHVCQUF1QjtBQUFBLElBQ3ZCLHdCQUF3QjtBQUFBLElBQ3hCLDRCQUE0QjtBQUFBLElBQzVCLHVCQUF1QjtBQUFBLElBQ3ZCLHNCQUFzQjtBQUFBLElBRXRCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGlCQUFpQjtBQUFBLElBQU0saUJBQWlCO0FBQUEsSUFBTSxrQkFBa0I7QUFBQSxJQUFNLG1CQUFtQjtBQUFBLElBQVEsb0JBQW9CO0FBQUEsSUFBTSxxQkFBcUI7QUFBQSxJQUNoSixxQkFBcUI7QUFBQSxJQUNyQixxQkFBcUI7QUFBQSxJQUNyQixxQkFBcUI7QUFBQSxJQUNyQixnQkFBZ0I7QUFBQSxJQUNoQixtQkFBbUI7QUFBQSxJQUFNLHNCQUFzQjtBQUFBLElBQU0sb0JBQW9CO0FBQUEsSUFDekUsb0JBQW9CO0FBQUEsSUFDcEIscUJBQXFCO0FBQUEsSUFDckIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIscUJBQXFCO0FBQUEsSUFDckIsZUFBZTtBQUFBLElBQU0seUJBQXlCO0FBQUEsSUFBUSxvQkFBb0I7QUFBQSxJQUMxRSxtQkFBbUI7QUFBQSxJQUVuQixlQUFlO0FBQUEsSUFDZixrQkFBa0I7QUFBQSxJQUFRLHNCQUFzQjtBQUFBLElBQ2hELG9CQUFvQjtBQUFBLElBQVEscUJBQXFCO0FBQUEsSUFBUyxpQkFBaUI7QUFBQSxJQUMzRSxhQUFhO0FBQUEsSUFDYixjQUFjO0FBQUEsSUFDZCxlQUFlO0FBQUEsSUFDZixrQkFBa0I7QUFBQSxJQUFNLGtCQUFrQjtBQUFBLElBQU0sc0JBQXNCO0FBQUEsSUFBTSxrQkFBa0I7QUFBQSxJQUFRLHdCQUF3QjtBQUFBLElBQVEscUJBQXFCO0FBQUEsSUFDM0osYUFBYTtBQUFBLElBQU0sY0FBYztBQUFBLElBQU8sZ0JBQWdCO0FBQUEsSUFDeEQsaUJBQWlCO0FBQUEsSUFBTSxnQkFBZ0I7QUFBQSxJQUFNLGdCQUFnQjtBQUFBLElBRTdELG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQVEsbUJBQW1CO0FBQUEsSUFDbEQsaUJBQWlCO0FBQUEsSUFDakIsZUFBZTtBQUFBLElBQVEsa0JBQWtCO0FBQUEsSUFBUSxxQkFBcUI7QUFBQSxJQUN0RSxxQkFBcUI7QUFBQSxJQUNyQixvQkFBb0I7QUFBQSxJQUFRLHFCQUFxQjtBQUFBLElBQU0scUJBQXFCO0FBQUEsSUFDNUUsd0JBQXdCO0FBQUEsSUFDeEIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFBVyxzQkFBc0I7QUFBQSxJQUN4RCx1QkFBdUI7QUFBQSxJQUN2QixpQkFBaUI7QUFBQSxJQUFPLG9CQUFvQjtBQUFBLElBQVMsa0JBQWtCO0FBQUEsSUFDdkUsc0JBQXNCO0FBQUEsSUFDdEIsd0JBQXdCO0FBQUEsSUFDeEIsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsb0JBQW9CO0FBQUEsSUFDcEIsdUJBQXVCO0FBQUEsSUFDdkIsa0JBQWtCO0FBQUEsSUFDbEIsZUFBZTtBQUFBLElBQ2YsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBRWIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsZ0JBQWdCO0FBQUEsSUFDaEIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsd0JBQXdCO0FBQUEsSUFDeEIscUJBQXFCO0FBQUEsSUFDckIsNEJBQTRCO0FBQUEsSUFFNUIsZUFBZTtBQUFBLElBQ2Ysc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsd0JBQXdCO0FBQUEsSUFDeEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIseUJBQXlCO0FBQUEsSUFDekIsMEJBQTBCO0FBQUEsSUFDMUIsMkJBQTJCO0FBQUEsSUFFM0Isa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFFaEIsZUFBZTtBQUFBLElBQ2YsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsYUFBYTtBQUFBLElBQ2IsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBRWYsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIscUJBQXFCO0FBQUEsSUFDckIsa0JBQWtCO0FBQUEsSUFDbEIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUEsSUFDekIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsa0JBQWtCO0FBQUEsSUFDbEIsdUJBQXVCO0FBQUEsSUFFdkIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsSUFFbEIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsbUJBQW1CO0FBQUEsSUFDbkIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsaUJBQWlCO0FBQUEsSUFDakIsYUFBYTtBQUFBLElBQ2IsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsRUFDcEI7QUFBQSxFQUNBLElBQUk7QUFBQSxJQUNGLG1CQUFtQjtBQUFBLElBQ25CLDJCQUEyQjtBQUFBLElBQzNCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLElBQ2hCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGlCQUFpQjtBQUFBLElBQ2pCLHVCQUF1QjtBQUFBLElBQ3ZCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBRWhCLFlBQVk7QUFBQSxJQUNaLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHFCQUFxQjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLDBCQUEwQjtBQUFBLElBQzFCLDhCQUE4QjtBQUFBLElBQzlCLG9CQUFvQjtBQUFBLElBQ3BCLHdCQUF3QjtBQUFBLElBQ3hCLHdCQUF3QjtBQUFBLElBQ3hCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLGFBQWE7QUFBQSxJQUNiLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHdCQUF3QjtBQUFBLElBQ3hCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHlCQUF5QjtBQUFBLElBQ3pCLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLGtCQUFrQjtBQUFBLElBQ2xCLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHdCQUF3QjtBQUFBLElBQ3hCLDRCQUE0QjtBQUFBLElBQzVCLDZCQUE2QjtBQUFBLElBQzdCLDJCQUEyQjtBQUFBLElBQzNCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLHdCQUF3QjtBQUFBLElBQ3hCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBQ3hCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGtDQUFrQztBQUFBLElBQ2xDLGdDQUFnQztBQUFBLElBQ2hDLG9CQUFvQjtBQUFBLElBQ3BCLHdCQUF3QjtBQUFBLElBQ3hCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLCtCQUErQjtBQUFBLElBQy9CLDZCQUE2QjtBQUFBLElBQzdCLHVCQUF1QjtBQUFBLElBQ3ZCLHVCQUF1QjtBQUFBLElBQ3ZC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QSxFQUNILENBQUM7QUFHRCxRQUFNLG1CQUFtQixDQUFDLFVBQXlDLENBQUMsVUFBZTtBQUNqRixVQUFNLFNBQVMsT0FBTztBQUN0QixVQUFNLE9BQU8sT0FBTyxXQUFXLFdBQzNCLFNBQ0EsUUFBUSxXQUFXLFFBQVEsVUFBVSxRQUFRLFlBQVksU0FBUyxLQUFLLFVBQVUsUUFBUSxNQUFNLENBQUMsSUFBSTtBQUN4RyxXQUFPLGNBQUFBLFFBQU07QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBTztBQUFBLFVBQ0wsUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsWUFBWTtBQUFBLFVBQ1osVUFBVTtBQUFBLFVBQ1YsWUFBWTtBQUFBLFVBQ1osWUFBWTtBQUFBLFVBQ1osV0FBVztBQUFBLFVBQ1gsV0FBVztBQUFBLFFBQ2I7QUFBQSxNQUNGO0FBQUEsTUFDQSxjQUFBQSxRQUFNLGNBQWMsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEtBQUssY0FBYyxNQUFNLEVBQUUsR0FBRyxLQUFLO0FBQUEsTUFDckYsT0FBTyxJQUFJO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFHQSxNQUFJLE1BQU0sT0FBTyxzQkFBc0IsTUFBTTtBQUMzQyxXQUFPLElBQUksTUFBTSxTQUFTO0FBQUEsTUFDeEIsTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLElBQ1AsR0FBRyxDQUFDLFVBQWU7QUFDakIsVUFBSSxPQUFPLGFBQWEsaUJBQWtCLFFBQU87QUFDakQsWUFBTSxTQUFTLE9BQU87QUFDdEIsYUFBTyxjQUFBQSxRQUFNLGNBQWMsWUFBWTtBQUFBLFFBQ3JDLE9BQU87QUFBQSxRQUNQLGNBQWMsUUFBUSxnQkFBZ0I7QUFBQSxRQUN0QyxZQUFZLFFBQVEsY0FBYztBQUFBLFFBQ2xDLFdBQVcsUUFBUSxhQUFhO0FBQUEsUUFDaEMsWUFBWSxRQUFRO0FBQUEsUUFDcEIsUUFBUSxTQUFTLGNBQWM7QUFBQSxNQUNqQyxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsYUFBVyxDQUFDLFNBQVMsS0FBSyxLQUFLO0FBQUEsSUFDN0IsQ0FBQyxhQUFhLDRCQUFXO0FBQUEsSUFDekIsQ0FBQyxjQUFjLG9DQUFTO0FBQUEsSUFDeEIsQ0FBQyxvQkFBb0IsaUNBQVE7QUFBQSxFQUMvQixHQUFZO0FBQ1YsUUFBSSxNQUFNLE9BQU8sc0JBQXNCLE1BQU07QUFDM0MsYUFBTyxJQUFJLE1BQU0sU0FBUyxFQUFFLE1BQU0sc0JBQXNCLEtBQUssUUFBUSxHQUFHLGlCQUFpQixLQUFLLENBQUM7QUFBQSxJQUNqRyxDQUFDO0FBQUEsRUFDSDtBQUNGOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIm5hbWUiLCAiUmVhY3QiLCAib2siLCAiZGF0YSIsICJhcHBseSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0Il0KfQo=
