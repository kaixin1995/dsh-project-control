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
    setTriageState({ processed: 0, remaining: 0 });
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
      if (data["done"] === true) break;
      const batchClosed = data["closed"] ?? {};
      closed.duplicate += Number(batchClosed["duplicate"] ?? 0);
      closed.obsolete += Number(batchClosed["obsolete"] ?? 0);
      closed.false_positive += Number(batchClosed["false_positive"] ?? 0);
      kept += Number(data["kept"] ?? 0);
      processed += Number(data["processed"] ?? 0);
      if (data["parseFailed"] === true) parseFailed = true;
      setTriageState({ processed, remaining: Number(data["remaining"] ?? 0) });
    }
    setTriageState(null);
    await loadIssues();
    if (stopped) setActionResult("\u23F9 " + t("review.triageStopped"));
    else if (processed > 0) {
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
            t("review.triageProgress").replace("{n}", String(triageState.processed)).replace("{m}", String(triageState.remaining))
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NsaWVudC9pbmRleC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdGhlbWUudHMiLCAiLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmtzcGFjZUZyYW1lLnRzeCIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvY29tbWl0LXJvdW5kcy50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvTW9kZXJuV29ya3NwYWNlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBDbGllbnQgcGx1Z2luIGVudHJ5IGZvciBkc2gtcHJvamVjdC1jb250cm9sLlxuICpcbiAqIFx1NUUwM1x1NUM0MFx1NjdCNlx1Njc4NFx1RkYwOFx1NURGMlx1OUE4Q1x1OEJDMVx1RkYwQzIwMjYtMDgtMzBcdUZGMDlcdUZGMUFcbiAqIC0gXHU1REU1XHU0RjVDXHU1M0YwXHU5MDZFXHU4NTNEXHU1Qjk4XHU2NUI5IGBkZXRhaWxzYCBcdTY5RkRcdUZGMDhwcmlvcml0eSAtMTBcdUZGMENcdTVCOThcdTY1QjkgRGV0YWlsc1BhbmVsIFx1NzU1OVx1NTcyOFx1OEQyNlx1NjcyQ1x1NEUwQVx1RkYwQ1xuICogICBcdTUzNzhcdThGN0RcdTYyMTFcdTRFRUNcdTc2ODRcdTZDRThcdTUxOENcdTUzNzNcdTYwNjJcdTU5MERcdUZGMDlcdUZGMENcdTZFMzJcdTY3RDNcdTU3MjhcdTRFM0JcdTY4NDZcdTY3QjYgZGV0YWlscyBcdTUyMTdcdUZGMUJcbiAqIC0gV29ya3NwYWNlRnJhbWUgXHU2Q0U4XHU1MTY1XHU2ODM3XHU1RjBGXHU4ODY4XHVGRjBDXHU2MjhBXHU1Qjk4XHU2NUI5XHU3RjUxXHU2ODNDXHU4OUM2XHU4OUM5XHU2MzYyXHU1MjE3XHVGRjFBXHU4MDRBXHU1OTI5XHVGRjA4Y2VudGVyQ29sXHVGRjA5XHU2NzAwXHU1M0YzXHUzMDAxXG4gKiAgIFx1NURFNVx1NEY1Q1x1NTNGMFx1RkYwOGRldGFpbHNDb2xcdUZGMDlcdTVDNDVcdTRFMkQgMWZyXHVGRjFCXHU2NUUwXHU0RjFBXHU4QkREXHU4NDNEXHU1NzMwXHU5ODc1XHVGRjA4ZGF0YS1kZXRhaWxzLWNvbGxhcHNlZFx1RkYwOVxuICogICBcdTgxRUFcdTUyQThcdTYwNjJcdTU5MERcdTUzOUZcdTc1MUZcdTUyMTdcdTVFOEZcdUZGMUJcbiAqIC0gXHU1REU2XHU0RkE3XHU1Qjk4XHU2NUI5XHU1QkZDXHU4MjJBXHUzMDAxXHU1Qjk4XHU2NUI5XHU4MDRBXHU1OTI5XHU2NzJDXHU0RjUzXHU5NkY2XHU2NTM5XHU1MkE4XHVGRjFCXG4gKiAtIFx1NEZBN1x1OEZCOVx1NjgwRlx1NjMwOVx1OTRBRVx1NTcyOFx1MzAwQ1x1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTNGMCBcdTIxQzQgXHU1Qjk4XHU2NUI5XHU4QkU2XHU2MEM1XHU5NzYyXHU2NzdGXHUzMDBEXHU5NUY0XHU1MjA3XHU2MzYyXHVGRjA4XHU1M0VGXHU5MDA2XHVGRjA5XHVGRjFCXG4gKiAtIGB0b29sLmNhbGwudG9vbHZpZXdgIFx1NEUzQSBhbmFseXplX2NoYW5nZSBcdTRGRERcdTc1NTlcdTRFMTNcdTVDNUVcdTUzNjFcdTcyNDdcdUZGMUJcbiAqIC0gXHU2NTg3XHU2ODQ4XHU1MTY4XHU5MEU4XHU3RUNGIGN0eC5sb2NhbGUgXHU4QkNEXHU1MTc4XHVGRjA4emggLyBlblx1RkYwOVx1MzAwMlxuICpcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2xcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDaGFuZ2VDYXJkIH0gZnJvbSAnLi9jb21wb25lbnRzL0NoYW5nZUNhcmQudHMnXG5pbXBvcnQgeyBXT1JLU1BBQ0VfRElDVCwgV29ya3NwYWNlRnJhbWUgfSBmcm9tICcuL2NvbXBvbmVudHMvV29ya3NwYWNlRnJhbWUudHN4J1xuaW1wb3J0IHsgTW9kZXJuV29ya3NwYWNlIH0gZnJvbSAnLi9jb21wb25lbnRzL01vZGVybldvcmtzcGFjZS50c3gnXG5cbmNvbnN0IE5TID0gJ3Byb2plY3QtY29udHJvbCdcblxuZXhwb3J0IGNvbnN0IG5hbWUgPSAnY2xpZW50LXByb2plY3QtY29udHJvbCdcbmV4cG9ydCBjb25zdCBpbmplY3QgPSBbJ3Nsb3RzJywgJ2xvY2FsZScsICdsYXlvdXQnXVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoY3R4OiBhbnkpOiB2b2lkIHtcbiAgY3R4LmVmZmVjdCgoKSA9PiBjdHgubG9jYWxlLnJlZ2lzdGVyKE5TLCB7IHpoOiBXT1JLU1BBQ0VfRElDVC56aCwgZW46IFdPUktTUEFDRV9ESUNULmVuIH0pLCAncHJvamVjdC1jb250cm9sOiBkaWN0aW9uYXJpZXMnKVxuICBjb25zdCBsYXlvdXQgPSBjdHgubGF5b3V0XG5cbiAgLy8gXHUyNTAwXHUyNTAwIDEuIFx1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTNGMFx1RkYxQVx1OTA2RVx1ODUzRCBkZXRhaWxzIFx1NjlGRFx1RkYwOFx1NTNFRlx1OTAwNlx1RkYwOVx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAvLyBcdTY1QjBcdTdBOTdcdTUzRTNcdTlFRDhcdThCQTRcdTRFMERcdTY2M0VcdTc5M0FcdTVERTVcdTRGNUNcdTUzRjBcdUZGMDhcdTRGRERcdTYzMDFcdTVCOThcdTY1QjlcdTUzOUZcdTc1MUZcdTg5QzZcdTg5RDJcdUZGMDlcdUZGMENcdTc1MzFcdTRGQTdcdThGQjlcdTY4MEZcdTYzMDlcdTk0QUVcdTY2M0VcdTVGMEZcdTYyNTNcdTVGMDBcdTMwMDJcbiAgbGV0IHdvcmtzcGFjZUVuYWJsZWQgPSBmYWxzZVxuICBsZXQgZGlzcG9zZVdvcmtzcGFjZTogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkXG5cbiAgY29uc3QgcmVnaXN0ZXJXb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XG4gICAgZGlzcG9zZVdvcmtzcGFjZSA9IGN0eC5zbG90cy5yZWdpc3RlcihcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2RldGFpbHMnLFxuICAgICAgICBwcmlvcml0eTogLTEwLFxuICAgICAgICBsb2NhbGU6IE5TLFxuICAgICAgfSxcbiAgICAgIC8vIFx1NjMwMlx1OEY3RFx1NTM3M1x1NjI1M1x1NUYwMCBkZXRhaWxzIFx1OEY2OFx1OTA1M1x1RkYwOFx1OTc2Mlx1Njc3Rlx1NTA0Rlx1NTk3RFx1OUVEOFx1OEJBNCAwXHVGRjA5XHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwXHU5NzAwXHU4OTgxXHU3NzFGXHU1QjlFXHU1QkJEXHU1RUE2XHVGRjFCXG4gICAgICAvLyBcdTY1RTBcdTRGMUFcdThCRERcdTg0M0RcdTU3MzBcdTk4NzVcdThGNjhcdTkwNTNcdTYwNTIgMFx1RkYwQ1x1NTkyOVx1NzEzNlx1NEZERFx1NjMwMVx1NTM5Rlx1NzUxRlx1ODJGMVx1OTZDNFx1OTg3NVx1NUUwM1x1NUM0MFx1MzAwMlxuICAgICAgLy8gXHU0RjFBXHU4QkREXHU1MjA3XHU2MzYyXHU2NUY2XHU1Qjk4XHU2NUI5XHU0RjFBIGNsb3NlRGV0YWlscyBcdTIwMTRcdTIwMTQgXHU1RUY2XHU1NDBFXHU0RTAwXHU2MkNEXHU5MUNEXHU2NUIwXHU2NDkxXHU1RjAwXHVGRjA4XHU1QjhGXHU0RUZCXHU1MkExXHU2NjVBXHU0RThFXHU3MjM2XHU3RUE3IGVmZmVjdFx1RkYwOVx1MzAwMlxuICAgICAgKHByb3BzOiBhbnkpID0+IHtcbiAgICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICBsYXlvdXQ/Lm9wZW5EZXRhaWxzPy4oKVxuICAgICAgICB9LCBbXSlcbiAgICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICBpZiAocHJvcHMuc2Vzc2lvbklkID09PSB1bmRlZmluZWQpIHJldHVyblxuICAgICAgICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiBsYXlvdXQ/Lm9wZW5EZXRhaWxzPy4oKSwgMClcbiAgICAgICAgICByZXR1cm4gKCkgPT4geyBjbGVhclRpbWVvdXQodGltZXIpIH1cbiAgICAgICAgfSwgW3Byb3BzLnNlc3Npb25JZF0pXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFdvcmtzcGFjZUZyYW1lLCB7IC4uLnByb3BzLCBrZXk6IHByb3BzLnNlc3Npb25JZCA/PyAnbGFuZGluZycsIGxheW91dCB9KVxuICAgICAgfSxcbiAgICApXG4gIH1cbiAgY29uc3QgdW5yZWdpc3RlcldvcmtzcGFjZSA9ICgpOiB2b2lkID0+IHtcbiAgICBkaXNwb3NlV29ya3NwYWNlPy4oKVxuICAgIGRpc3Bvc2VXb3Jrc3BhY2UgPSB1bmRlZmluZWRcbiAgfVxuXG4gIGN0eC5zbG90cy5pbmplY3QoJ2RldGFpbHMnLCAoKSA9PiB7XG4gICAgaWYgKHdvcmtzcGFjZUVuYWJsZWQpIHJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdW5yZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgfVxuICB9KVxuXG4gIC8vIFx1MjUwMFx1MjUwMCAyLiBcdTRGQTdcdThGQjlcdTY4MEZcdTVFOTVcdTkwRThcdUZGMUFcdTVERTVcdTRGNUNcdTUzRjAgXHUyMUM0IFx1NUI5OFx1NjVCOVx1OEJFNlx1NjBDNSBcdTUyMDdcdTYzNjIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gIC8vIFx1NjMwOVx1OTRBRVx1NzJCNlx1NjAwMVx1NjYwRVx1NzkzQVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1NjYzRVx1NzkzQVx1NEUyRCBcdTIxOTIgXHUzMDBDXHVEODNFXHVEREVEIFx1NURFNVx1NEY1Q1x1NTNGMCBcdTI3MTNcdTMwMERcdUZGMUJcdTVERjJcdTUyMDdcdTVCOThcdTY1QjlcdThCRTZcdTYwQzUgXHUyMTkyIFx1MzAwQ1x1RDgzRVx1RERFRCBcdTYyNTNcdTVGMDBcdTVERTVcdTRGNUNcdTUzRjBcdTMwMERcdTlBRDhcdTRFQUVcdUZGMENcbiAgLy8gXHU3NTI4XHU2MjM3XHU5NjhGXHU2NUY2XHU3NzBCXHU1Rjk3XHU1MjMwXHU2MDBFXHU0RTQ4XHU1MjA3XHU1NkRFXHU2NzY1XHVGRjA4XHU1MjA3XHU2MzYyXHU3RUNGIHdpbmRvdyBcdTRFOEJcdTRFRjZcdTkwMUFcdTc3RTVcdTYzMDlcdTk0QUVcdTkxQ0RcdTZFMzJcdTY3RDNcdUZGMDlcdTMwMDJcbiAgY29uc3QgVE9HR0xFX0VWRU5UID0gJ3BjLXdvcmtzcGFjZS10b2dnbGUnXG4gIGNvbnN0IGZpcmVUb2dnbGUgPSAoZW5hYmxlZDogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChUT0dHTEVfRVZFTlQsIHsgZGV0YWlsOiBlbmFibGVkIH0pKVxuICB9XG4gIGNvbnN0IGRpc21pc3NNb2Rlcm5Xb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XG4gICAgaWYgKCF3b3Jrc3BhY2VFbmFibGVkKSByZXR1cm5cbiAgICB3b3Jrc3BhY2VFbmFibGVkID0gZmFsc2VcbiAgICBmaXJlVG9nZ2xlKGZhbHNlKVxuICB9XG5cbiAgLy8gMC4yLnggXHU3Njg0XHU0RjFBXHU4QkREXHU2NzBEXHU1MkExXHU1M0VGXHU5MDA5XHU2Q0U4XHU1MTY1XHVGRjFBXHU2NUU3XHU3MjQ4XHU2Q0ExXHU2NzA5XHU2NUIwXHU3MjQ4XHU1RTAzXHU1QzQwXHU2M0E1XHU1M0UzXHVGRjBDXHU0RUNEXHU2Q0JGXHU3NTI4IGRldGFpbHMgXHU1MjA2XHU2NTJGXHUzMDAyXG4gIGN0eC5pbmplY3QoWyd1aVNlc3Npb24nXSwgKHNjb3BlOiBhbnkpID0+IHtcbiAgICBpZiAobGF5b3V0LnBhbmVsSW5mbyA9PT0gdW5kZWZpbmVkKSByZXR1cm5cbiAgICBjb25zdCBjdXJyZW50ID0gc2NvcGUudWlTZXNzaW9uLmFkYXB0ZXIuY3VycmVudFxuICAgIHNjb3BlLnNsb3RzLmluamVjdCgnc2hlbGwub3ZlcmxheScsICgpID0+IHNjb3BlLnNsb3RzLnJlZ2lzdGVyKHtcbiAgICAgIG5hbWU6ICdzaGVsbC5vdmVybGF5JywgaWQ6ICdwcm9qZWN0LWNvbnRyb2wtd29ya3NwYWNlJyxcbiAgICB9LCAoKSA9PiB7XG4gICAgICBjb25zdCBbZW5hYmxlZCwgc2V0RW5hYmxlZF0gPSBSZWFjdC51c2VTdGF0ZSh3b3Jrc3BhY2VFbmFibGVkKVxuICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IChldmVudDogRXZlbnQpOiB2b2lkID0+IHsgc2V0RW5hYmxlZCgoZXZlbnQgYXMgQ3VzdG9tRXZlbnQ8Ym9vbGVhbj4pLmRldGFpbCkgfVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpXG4gICAgICAgIHJldHVybiAoKSA9PiB7IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFRPR0dMRV9FVkVOVCwgaGFuZGxlcikgfVxuICAgICAgfSwgW10pXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChNb2Rlcm5Xb3Jrc3BhY2UsIHsgY3VycmVudCwgcGFuZWxJbmZvOiBsYXlvdXQucGFuZWxJbmZvLCBlbmFibGVkLCBvbkRpc21pc3M6IGRpc21pc3NNb2Rlcm5Xb3Jrc3BhY2UgfSlcbiAgICB9KSlcbiAgfSlcblxuICBjdHguc2xvdHMuaW5qZWN0KCdzaWRlYmFyLmZvb3Rlci5hY3Rpb24nLCAoKSA9PiB7XG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XG4gICAgICBuYW1lOiAnc2lkZWJhci5mb290ZXIuYWN0aW9uJyxcbiAgICAgIGlkOiAncHJvamVjdC1jb250cm9sLXRvZ2dsZScsXG4gICAgfSwgKCkgPT4ge1xuICAgICAgY29uc3QgW2VuYWJsZWQsIHNldEVuYWJsZWRdID0gUmVhY3QudXNlU3RhdGUod29ya3NwYWNlRW5hYmxlZClcbiAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQ6IEV2ZW50KTogdm9pZCA9PiB7IHNldEVuYWJsZWQoKGV2ZW50IGFzIEN1c3RvbUV2ZW50PGJvb2xlYW4+KS5kZXRhaWwpIH1cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoVE9HR0xFX0VWRU5ULCBoYW5kbGVyKVxuICAgICAgICByZXR1cm4gKCkgPT4geyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpIH1cbiAgICAgIH0sIFtdKVxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdidXR0b24nLFxuICAgICAgICB7XG4gICAgICAgICAgJ2RhdGEtdGVzdGlkJzogJ3Byb2plY3QtY29udHJvbC1zaWRlYmFyLXRvZ2dsZScsXG4gICAgICAgICAgdGl0bGU6IGVuYWJsZWQgPyAnXHU1RjUzXHU1MjREXHU2NjNFXHU3OTNBXHU5ODc5XHU3NkVFXHU2ODM4XHU2N0U1XHU1M0YwXHUzMDAyXHU3MEI5XHU1MUZCXHU1M0VGXHU0RTM0XHU2NUY2XHU1MjA3XHU2MzYyXHU0RTNBXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHVGRjA4XHU2N0U1XHU3NzBCXHU1REU1XHU1MTc3XHU4QzAzXHU3NTI4XHU3Njg0XHU1QjhDXHU2NTc0XHU4RjkzXHU1MTY1L1x1OEY5M1x1NTFGQVx1RkYwOVx1RkYxQlx1NTE4RFx1NzBCOVx1NjcyQ1x1NjMwOVx1OTRBRVx1NTM3M1x1NjA2Mlx1NTkwRFx1MzAwMicgOiAnXHU1RjUzXHU1MjREXHU2NjNFXHU3OTNBXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHUzMDAyXHU3MEI5XHU1MUZCXHU2MDYyXHU1OTBEXHU5ODc5XHU3NkVFXHU2ODM4XHU2N0U1XHU1M0YwXHUzMDAyJyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnNnB4JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggMTBweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgY29sb3I6IGVuYWJsZWQgPyAnaW5oZXJpdCcgOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IGVuYWJsZWQgPyA0MDAgOiA2MDAsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJywgb3BhY2l0eTogMC45LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgd29ya3NwYWNlRW5hYmxlZCA9ICF3b3Jrc3BhY2VFbmFibGVkXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIGxheW91dD8ub3BlbkRldGFpbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpZiAod29ya3NwYWNlRW5hYmxlZCAmJiBkaXNwb3NlV29ya3NwYWNlID09PSB1bmRlZmluZWQpIHJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghd29ya3NwYWNlRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgICAgdW5yZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgICAgICAgICAgICAgICBsYXlvdXQ/LmNsb3NlRGV0YWlscz8uKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAod29ya3NwYWNlRW5hYmxlZCAmJiBsYXlvdXQucGFuZWxJbmZvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAobGF5b3V0LnBhbmVsSW5mby5nZXRTbmFwc2hvdCgpLmFjdGl2ZVBhbmVsSWQgIT09IG51bGwpIGxheW91dC5zZWxlY3RQYW5lbChudWxsKVxuICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0YmFyID0gY3R4LmdldCgnc2lkZWJhclJpZ2h0JylcbiAgICAgICAgICAgICAgICBpZiAocmlnaHRiYXI/LmlzRXhwYW5kZWQoKSkgcmlnaHRiYXIudG9nZ2xlRXhwYW5kZWQoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgICAgICAgICB3b3Jrc3BhY2VFbmFibGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdbcHJvamVjdC1jb250cm9sXSB3b3Jrc3BhY2UgdG9nZ2xlIGZhaWxlZCcsIGVycm9yKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlyZVRvZ2dsZSh3b3Jrc3BhY2VFbmFibGVkKVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGVuYWJsZWQgPyAnXHVEODNFXHVEREVEIFx1NURFNVx1NEY1Q1x1NTNGMCBcdTI3MTMnIDogJ1x1RDgzRVx1RERFRCBcdTYyNTNcdTVGMDBcdTVERTVcdTRGNUNcdTUzRjAnLFxuICAgICAgKVxuICAgIH0pXG4gIH0pXG5cbiAgLy8gXHUyNTAwXHUyNTAwIDMuIFx1ODA0QVx1NTkyOVx1NURFNVx1NTE3N1x1NTM2MVx1NzI0N1x1RkYwOFx1NjI2N1x1ODg0Qy9cdThCQzRcdTVCQTEvXHU5QThDXHU2NTM2XHVGRjA5XHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gIGNvbnN0IHNpbXBsZVJlc3VsdENhcmQgPSAodGl0bGU6IHN0cmluZyk6ICgocHJvcHM6IGFueSkgPT4gYW55KSA9PiAocHJvcHM6IGFueSkgPT4ge1xuICAgIGNvbnN0IG91dHB1dCA9IHByb3BzPy5vdXRwdXRcbiAgICBjb25zdCB0ZXh0ID0gdHlwZW9mIG91dHB1dCA9PT0gJ3N0cmluZydcbiAgICAgID8gb3V0cHV0XG4gICAgICA6IG91dHB1dD8uc3VtbWFyeSA/PyBvdXRwdXQ/Lmlzc3VlcyA/PyBvdXRwdXQ/LmRldGFpbHMgPz8gKG91dHB1dCA/IEpTT04uc3RyaW5naWZ5KG91dHB1dCwgbnVsbCwgMikgOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHUyMDI2JylcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICdkaXYnLFxuICAgICAge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICBwYWRkaW5nOiAnMTBweCAxMnB4JyxcbiAgICAgICAgICBtYXJnaW46ICc0cHggMCcsXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXG4gICAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjYsXG4gICAgICAgICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyxcbiAgICAgICAgICBtYXhIZWlnaHQ6IDI2MCxcbiAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnNHB4JyB9IH0sIHRpdGxlKSxcbiAgICAgIFN0cmluZyh0ZXh0KSxcbiAgICApXG4gIH1cblxuICAvLyBcdTI1MDBcdTI1MDAgMy4gYW5hbHl6ZV9jaGFuZ2UgXHU0RTEzXHU1QzVFXHU1REU1XHU1MTc3XHU1MzYxXHU3MjQ3IFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICBjdHguc2xvdHMuaW5qZWN0KCd0b29sLmNhbGwudG9vbHZpZXcnLCAoKSA9PiB7XG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XG4gICAgICBuYW1lOiAndG9vbC5jYWxsLnRvb2x2aWV3JyxcbiAgICAgIGtleTogJ2FuYWx5emVfY2hhbmdlJyxcbiAgICB9LCAocHJvcHM6IGFueSkgPT4ge1xuICAgICAgaWYgKHByb3BzPy50b29sTmFtZSAhPT0gJ2FuYWx5emVfY2hhbmdlJykgcmV0dXJuIG51bGxcbiAgICAgIGNvbnN0IG91dHB1dCA9IHByb3BzPy5vdXRwdXRcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENoYW5nZUNhcmQsIHtcbiAgICAgICAgdGl0bGU6ICdcdTUzRDhcdTY2RjRcdTUyMDZcdTY3OTBcdTYyQTVcdTU0NEEgKENoYW5nZSBBbmFseXNpcyknLFxuICAgICAgICBmaWxlc0NoYW5nZWQ6IG91dHB1dD8uZmlsZXNDaGFuZ2VkID8/IDAsXG4gICAgICAgIGluc2VydGlvbnM6IG91dHB1dD8uaW5zZXJ0aW9ucyA/PyAwLFxuICAgICAgICBkZWxldGlvbnM6IG91dHB1dD8uZGVsZXRpb25zID8/IDAsXG4gICAgICAgIGV2aWRlbmNlSWQ6IG91dHB1dD8uZXZpZGVuY2VJZCxcbiAgICAgICAgc3RhdHVzOiBvdXRwdXQgPyAnY29tcGxldGVkJyA6ICdhbmFseXppbmcnLFxuICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG4gIGZvciAoY29uc3QgW3Rvb2xLZXksIHRpdGxlXSBvZiBbXG4gICAgWydzdGFydF9ydW4nLCAnXHVEODNEXHVERTgwIFx1NjI2N1x1ODg0QyBSdW4nXSxcbiAgICBbJ3J1bl9yZXZpZXcnLCAnXHVEODNEXHVERDBEIFx1NEVFM1x1NzgwMVx1OEJDNFx1NUJBMSddLFxuICAgIFsncnVuX3ZlcmlmaWNhdGlvbicsICdcdTI3MDUgXHU5QThDXHU2NTM2XHU5QThDXHU4QkMxJ10sXG4gIF0gYXMgY29uc3QpIHtcbiAgICBjdHguc2xvdHMuaW5qZWN0KCd0b29sLmNhbGwudG9vbHZpZXcnLCAoKSA9PiB7XG4gICAgICByZXR1cm4gY3R4LnNsb3RzLnJlZ2lzdGVyKHsgbmFtZTogJ3Rvb2wuY2FsbC50b29sdmlldycsIGtleTogdG9vbEtleSB9LCBzaW1wbGVSZXN1bHRDYXJkKHRpdGxlKSlcbiAgICB9KVxuICB9XG59XG4iLCAiLyoqXHJcbiAqIFJlYWN0IENvbXBvbmVudDogQ2hhbmdlIC8gSW5zaWdodCBDYXJkIGZvciBDaGF0IFZpZXcuXHJcbiAqIFJlbmRlcnMgc3RydWN0dXJlZCBpbnNpZ2h0cywgZGlmZiBzdGF0aXN0aWNzLCBhbmQgZXZpZGVuY2UgYmFkZ2VzLlxyXG4gKlxyXG4gKiBcdTk4OUNcdTgyNzJcdThENzAgZHN3LWFsaWFzIFx1NEUzQlx1OTg5OFx1NTNEOFx1OTFDRiArIHRoZW1lQXdhcmVUZXh0IFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYxQVxyXG4gKiBcdTZCNjRcdTUyNERcdTc1MjhcdTc2ODQgYC0tZHNoLSpgIFx1NTNEOFx1OTFDRlx1NTcyOFx1NUJCRlx1NEUzQlx1OTFDQ1x1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1NjgzN1x1NUYwRlx1NkMzOFx1OEZEQ1x1ODQzRFx1NTcyOFx1NkRGMVx1ODI3Mlx1NTE1Q1x1NUU5NVx1NEUwQVx1RkYwQ1xyXG4gKiBcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTRFMEJcdTgwNEFcdTU5MjlcdTZENDFcdTkxQ0NcdTUxRkFcdTczQjBcdTdBODFcdTUxNDBcdTlFRDFcdTUzNjFcdUZGMUJcdTY1NzBcdTVCNTdcdTdFRkYvXHU3RUEyXHU0RTVGXHU2NjJGXHU2REYxXHU4MjcyXHU1NDExXHU5MTREXHU4MjcyXHVGRjBDXHU3NjdEXHU1RTk1XHU0RTBEXHU1M0VGXHU4QkZCXHUzMDAyXHJcbiAqXHJcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9DaGFuZ2VDYXJkXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyB0aGVtZUF3YXJlVGV4dCB9IGZyb20gJy4vdGhlbWUudHMnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUNhcmRQcm9wcyB7XHJcbiAgdGl0bGU/OiBzdHJpbmdcclxuICBmaWxlc0NoYW5nZWQ/OiBudW1iZXJcclxuICBpbnNlcnRpb25zPzogbnVtYmVyXHJcbiAgZGVsZXRpb25zPzogbnVtYmVyXHJcbiAgZXZpZGVuY2VJZD86IHN0cmluZ1xyXG4gIHN0YXR1cz86IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ2hhbmdlQ2FyZDogUmVhY3QuRkM8Q2hhbmdlQ2FyZFByb3BzPiA9ICh7XHJcbiAgdGl0bGUgPSAnQ2hhbmdlIEluc2lnaHQnLFxyXG4gIGZpbGVzQ2hhbmdlZCA9IDAsXHJcbiAgaW5zZXJ0aW9ucyA9IDAsXHJcbiAgZGVsZXRpb25zID0gMCxcclxuICBldmlkZW5jZUlkLFxyXG4gIHN0YXR1cyA9ICdhbmFseXplZCcsXHJcbn0pID0+IHtcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICdkaXYnLFxyXG4gICAge1xyXG4gICAgICAnZGF0YS10ZXN0aWQnOiAncHJvamVjdC1jb250cm9sLWNoYW5nZS1jYXJkJyxcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgcGFkZGluZzogJzEwcHggMTRweCcsXHJcbiAgICAgICAgbWFyZ2luOiAnNnB4IDAnLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXHJcbiAgICAgICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgICAgIGZvbnRTaXplOiAnMTNweCcsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgJ2RpdicsXHJcbiAgICAgIHtcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBudWxsLCBgXHVEODNEXHVERDBEICR7dGl0bGV9YCksXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgJ3NwYW4nLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHggNnB4JyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJnLWluc2V0LCByZ2JhKDUsNSw1LDAuMDYpKScsXHJcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgKSxcclxuICAgICksXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEycHgnLCBmb250U2l6ZTogJzEycHgnLCBvcGFjaXR5OiAwLjkgfSB9LFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgbnVsbCwgYFx1RDgzRFx1RENDMSAke2ZpbGVzQ2hhbmdlZH0gZmlsZXNgKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjMWE3ZjM3JykgfSB9LCBgKyR7aW5zZXJ0aW9uc31gKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2YyMjJlJykgfSB9LCBgLSR7ZGVsZXRpb25zfWApLFxyXG4gICAgICBldmlkZW5jZUlkXHJcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgICAnc3BhbicsXHJcbiAgICAgICAgICAgIHsgc3R5bGU6IHsgb3BhY2l0eTogMC43LCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyB9IH0sXHJcbiAgICAgICAgICAgIGBbJHtldmlkZW5jZUlkfV1gLFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIDogbnVsbCxcclxuICAgICksXHJcbiAgKVxyXG59XHJcbiIsICIvKipcbiAqIFx1NUJBMlx1NjIzN1x1N0FFRlx1NEUzQlx1OTg5OFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYwOFx1NkRGMVx1NkQ0NVx1NTNDQ1x1NEUzQlx1OTg5OFx1NTE3MVx1NzUyOFx1NzY4NFx1NTUyRlx1NEUwMFx1NUI5RVx1NzNCMFx1RkYwOVx1MzAwMlxuICpcbiAqIFx1NEUwRFx1NTNEOFx1NUYwRlx1RkYwODIwMjYtMDktMTAgXHU2REYxXHU4MjcyXHU2QTIxXHU1RjBGXHUzMDBDXHU5ODc1XHU3QjdFXHU3NjdEXHU1NzU3XHUzMDBEXHU0RThCXHU2NTQ1XHU1NDBFXHU1NkZBXHU1MzE2XHVGRjBDXHU1MTY4XHU1QkEyXHU2MjM3XHU3QUVGXHU1RkM1XHU5ODdCXHU5MDc1XHU1Qjg4XHVGRjA5XHVGRjFBXG4gKiAxLiBcdTk2OEZcdTRFM0JcdTk4OThcdTUzRDhcdTUzMTZcdTc2ODRcdTVGM0FcdThDMDNcdTgyNzJcdTY1ODdcdTVCNTdcdTVGQzVcdTk4N0JcdTdFQ0YgdGhlbWVBd2FyZVRleHQoKVx1RkYxQVx1NkQ0NVx1ODI3Mlx1NEUzQlx1OTg5OFx1ODFFQVx1NTJBOFx1NkRGMVx1NTMxNlx1NTIzMFx1NzY3RFx1NUU5NVxuICogICAgXHU1QkY5XHU2QkQ0XHU1RUE2IFx1MjI2NTQuNToxXHVGRjBDXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU4MUVBXHU1MkE4XHU2M0QwXHU0RUFFXHU1MjMwXHU2REYxXHU1RTk1IFx1MjI2NTQuNToxXHUzMDAyXHU5ODdCXHU1NzI4XHU2RTMyXHU2N0QzXHU2NzFGXHU4QzAzXHU3NTI4XHVGRjA4XHU3RUM0XHU0RUY2XHU0RjUzXHU1MTg1L1xuICogICAgXHU2RTMyXHU2N0QzXHU1MUZEXHU2NTcwXHU1MTg1XHVGRjA5XHVGRjBDXHU0RTNCXHU5ODk4XHU1MjA3XHU2MzYyXHU1NDBFXHU5NjhGXHU5MUNEXHU2RTMyXHU2N0QzXHU4MUVBXHU1MkE4XHU2NkY0XHU2NUIwXHVGRjFCXHU3OTgxXHU2QjYyXHU1NzI4XHU2QTIxXHU1NzU3XHU1MkEwXHU4RjdEXHU2NzFGXHU2QzQyXHU1MDNDXHU1NDBFXHU1QjU4XHU4RkRCXG4gKiAgICBcdTk3NTlcdTYwMDFcdTY4MzdcdTVGMEZcdTVCRjlcdThDNjFcdTMwMDJcbiAqIDIuIGFjdGl2ZSBcdTlBRDhcdTRFQUVcdTgwQ0NcdTY2NkZcdUZGMDhcdTYzMDlcdTk0QUUgLyBcdTk4NzVcdTdCN0UgLyBcdTdCNUJcdTkwMDlcdTgyQUZcdTcyNDdcdTdCNDlcdTRFMDBcdTUyMDdcIlx1OTAwOVx1NEUyRFx1NTM3M1x1NTg2Qlx1ODI3MlwiXHU3Njg0XHU4ODY4XHU5NzYyXHVGRjA5XHU0RTAwXHU1RjhCXHU3NTI4XG4gKiAgICBgdmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpYFx1RkYwOFx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1NEUwQlx1OTBGRFx1NjYyRlx1ODRERFx1ODI3Mlx1RkYwOVx1RkYwQ1x1OTE0RFx1NzY3RFx1NUI1N1x1MzAwMlxuICogICAgXHU3OTgxXHU2QjYyXHU3NTI4IC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnkgXHU0RjVDXHU4MENDXHU2NjZGXHUyMDE0XHUyMDE0XHU1QjgzXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RjFBXHU4OEFCXG4gKiAgICBcdTVCOENcdTUxNjhcdTU0MUVcdTYzODlcdUZGMDhcdTY3MkNcdTZCMjFcdTRFOEJcdTY1NDVcdTY4MzlcdTU2RTBcdUZGMDlcdTMwMDJcbiAqIDMuIFx1NjVFMFx1NkNENVx1ODlFM1x1Njc5MFx1NzY4NFx1OTg5Q1x1ODI3Mlx1RkYwOENTUyBcdTUzRDhcdTkxQ0ZcdTdCNDlcdUZGMDlcdTUzOUZcdTY4MzdcdThGRDRcdTU2REVcdUZGMUFcdTUzRDhcdTkxQ0ZcdTgyNzJcdTRFQTRcdTc1MzFcdTVCQkZcdTRFM0JcdTRFM0JcdTk4OThcdTdDRkJcdTdFREZcdTRGRERcdThCQzFcdTUzRUZcdThCRkJcdUZGMENcbiAqICAgIFx1NEY0Nlx1NzUzMVx1NkI2NFx1NUI4M1x1NEVFQ1x1NEUwRFx1NUY5N1x1NEUwRVx1Nzg2Q1x1N0YxNlx1NzgwMVx1NTI0RFx1NjY2Rlx1ODI3Mlx1NTNFMFx1NTJBMFx1NEY3Rlx1NzUyOFx1MzAwMlxuICovXG5cbi8qKiBcdTg5RTNcdTY3OTAgI3JyZ2diYiBcdTYyMTYgcmdiKCkvcmdiYSgpIFx1OTg5Q1x1ODI3Mlx1NTI0RFx1NEUwOVx1NEUyQVx1NTIwNlx1OTFDRlx1NEUzQSBbciwgZywgYl1cdUZGMUJcdTY1RTBcdTZDRDVcdTg5RTNcdTY3OTBcdThGRDRcdTU2REUgbnVsbFx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29sb3IoY29sb3I6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IG51bGwge1xuICBjb25zdCBoZXggPSAvXiMoWzAtOWEtZl17Nn0pJC9pLmV4ZWMoY29sb3IpXG4gIGlmIChoZXggIT09IG51bGwpIHtcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlci5wYXJzZUludChoZXhbMV0hLCAxNilcbiAgICByZXR1cm4gWyh2YWx1ZSA+PiAxNikgJiAyNTUsICh2YWx1ZSA+PiA4KSAmIDI1NSwgdmFsdWUgJiAyNTVdXG4gIH1cbiAgY29uc3QgZnVuY3Rpb25hbCA9IC9ecmdiYT9cXChcXHMqKFxcZHsxLDN9KVssXFxzXSsoXFxkezEsM30pWyxcXHNdKyhcXGR7MSwzfSkvaS5leGVjKGNvbG9yKVxuICBpZiAoZnVuY3Rpb25hbCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBbTnVtYmVyKGZ1bmN0aW9uYWxbMV0pLCBOdW1iZXIoZnVuY3Rpb25hbFsyXSksIE51bWJlcihmdW5jdGlvbmFsWzNdKV1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG4vKiogV0NBRyBcdTc2RjhcdTVCRjlcdTRFQUVcdTVFQTZcdUZGMDgwPVx1OUVEMVx1RkYwQzE9XHU3NjdEXHVGRjA5XHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gcmVsYXRpdmVMdW1pbmFuY2UocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IGNoYW5uZWwgPSAodmFsdWU6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdiA9IHZhbHVlIC8gMjU1XG4gICAgcmV0dXJuIHYgPD0gMC4wMzkyOCA/IHYgLyAxMi45MiA6ICgodiArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjRcbiAgfVxuICByZXR1cm4gMC4yMTI2ICogY2hhbm5lbChyKSArIDAuNzE1MiAqIGNoYW5uZWwoZykgKyAwLjA3MjIgKiBjaGFubmVsKGIpXG59XG5cbi8qKiBcdTZERjFcdTUzMTZcdTk4OUNcdTgyNzJcdTc2RjRcdTUyMzBcdTc2N0RcdTVFOTVcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgIzFmMjMyOCBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA+IDAuMTgzOyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4MWYgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHgyMyAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHgyOCAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqIFx1NjNEMFx1NEVBRVx1OTg5Q1x1ODI3Mlx1NzZGNFx1NTIzMFx1NkRGMVx1NUU5NVx1RkYwOCMxNTE1MTdcdUZGMDlcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgI2YwZjZmYyBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpZ2h0ZW5Gb3JEYXJrQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA8IDAuMjE0OyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4ZjAgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHhmNiAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHhmYyAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqXG4gKiBcdTRFM0JcdTk4OThcdTgxRUFcdTkwMDJcdTVFOTRcdTY1ODdcdTVCNTdcdTgyNzJcdUZGMUFcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTZERjFcdTUzMTZcdTUyMzBcdTc2N0RcdTVFOTUgXHUyMjY1NC41OjFcdUZGMUJcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTYzRDBcdTRFQUVcdTUyMzBcdTZERjFcdTVFOTUgXHUyMjY1NC41OjFcbiAqIFx1RkYwOFx1NkRGMVx1ODI3Mlx1NUI1N1x1NTk4MiAjNTc2MDZhIFx1NzZGNFx1NjNBNVx1NjUzRVx1NkRGMVx1NUU5NVx1NTQwQ1x1NjgzN1x1NEUwRFx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlx1NjI0MFx1NjcwOVx1NUYzQVx1OEMwM1x1ODI3Mlx1NjU4N1x1NjcyQ1x1N0VERlx1NEUwMFx1OEQ3MFx1OEZEOVx1OTFDQ1x1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhlbWVBd2FyZVRleHQoY29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJnYiA9IHBhcnNlQ29sb3IoY29sb3IpXG4gIGlmIChyZ2IgPT09IG51bGwpIHJldHVybiBjb2xvclxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5ib2R5Py5oYXNBdHRyaWJ1dGU/LignZGF0YS1kcy1kYXJrLXRoZW1lJykgPT09IHRydWUpIHtcbiAgICByZXR1cm4gbGlnaHRlbkZvckRhcmtCYWNrZ3JvdW5kKHJnYlswXSwgcmdiWzFdLCByZ2JbMl0pXG4gIH1cbiAgcmV0dXJuIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyZ2JbMF0sIHJnYlsxXSwgcmdiWzJdKVxufVxuIiwgIi8qKlxuICogUHJvamVjdCBDb250cm9sIFx1NURFNVx1NEY1Q1x1NTNGMFx1RkYwOFdvcmtzcGFjZUZyYW1lXHVGRjA5djJcdUZGMUFcdTU2RjRcdTdFRDVcIlx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVwiXHU3RUM0XHU3RUM3XHUzMDAyXG4gKlxuICogXHU1NkRCXHU0RTJBXHU5ODc1XHU3QjdFXHVGRjFBXG4gKiAxLiBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdUZGMDhcdTlFRDhcdThCQTRcdUZGMDlcdUZGMUFcdTRFRDNcdTVFOTNcdTY4MEZcdUZGMDhcdTU5MUFcdTRFRDNcdTVFOTNcdTUyMDdcdTYzNjJcdUZGMDkrIFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1RkYwOFx1NTQyQlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOStcbiAqICAgIFx1OEJFNlx1NjBDNVx1OTc2Mlx1Njc3Rlx1RkYwOEFJIFx1ODlFM1x1OEJGQlx1RkYxQVx1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OC9cdTVCOUVcdTczQjBcdTkwM0JcdThGOTEvXHU5OENFXHU5NjY5XHVGRjFCXHU0RTA5XHU3RUE3XHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0IFNWRyBcdTU2RkVcdUZGMUJcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdUZGMDlcdTMwMDJcbiAqIDIuIFx1OTg3OVx1NzZFRVx1NjAzQlx1ODlDOFx1RkYxQVx1OTg3OVx1NzZFRVx1Njg2M1x1Njg0OCArIFx1NUZFQlx1NjM3N1x1NjRDRFx1NEY1QyArIFx1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1RiArIFx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1MzAwMlxuICogMy4gXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHVGRjFBUnVuIFx1OEZEQlx1NUVBNlx1NEUwRVx1NjIxMFx1NjcyQ1x1MzAwMlxuICogNC4gXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHVGRjFBXHU2ODM4XHU2N0U1XHU3QjE0XHU4QkIwXHVGRjA4XHU1M0VGXHU1MTczXHU4MDU0XHU2M0QwXHU0RUE0XHVGRjA5KyBcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdUZGMDhcdTRFQkFcdTVERTVcdTc4NkVcdThCQTRcdUZGMDkrIFx1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNSArIFJldmlldy9cdTlBOENcdTY1MzZcdThCQjBcdTVGNTVcdTMwMDJcbiAqXG4gKiBcdTVFMDNcdTVDNDBcdTY3M0FcdTUyMzZcdTRFMERcdTUzRDhcdUZGMUFcdTkwNkVcdTg1M0RcdTVCOThcdTY1QjkgZGV0YWlscyBcdTY5RkQgKyBcdTZDRThcdTUxNjVcdTY4MzdcdTVGMEZcdTYzNjJcdTUyMTdcdUZGMDhcdTgwNEFcdTU5MjlcdTY3MDBcdTUzRjNcdUZGMDkrIFx1NTIwNlx1OTY5NFx1Njc2MVx1NjJENlx1NjJGRFx1OEJCMFx1NUZDNlx1RkYxQlxuICogXHU3RURGXHU4QkExXHU4ODRDXHU0RTI0XHU4ODRDXHU5NEIzXHU1MjM2XHU3NTMxXHU4RkQwXHU4ODRDXHU2NUY2XHU2MzA5XHU2Nzg0XHU1RUZBXHU1NEM4XHU1RTBDXHU3Q0JFXHU1MUM2XHU2Q0U4XHU1MTY1XHVGRjA4YXBwbHlTdGF0c0xpbmVDbGFtcFx1RkYwOVx1MzAwMlxuICpcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9Xb3Jrc3BhY2VGcmFtZVxuICovXG5cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHBhcnNlQ29sb3IsIHRoZW1lQXdhcmVUZXh0IH0gZnJvbSAnLi90aGVtZS50cydcbmltcG9ydCB7IGNsdXN0ZXJJbnRvUm91bmRzIH0gZnJvbSAnLi9jb21taXQtcm91bmRzLnRzJ1xuXG4vKiogXHU1QkJGXHU0RTNCIC9zdGF0ZSBcdThGRDRcdTU2REVcdTc2ODRcdTVGRUJcdTcxNjdcdTVGNjJcdTcyQjZcdUZGMDhcdTRFMEUgYXBpLXJvdXRlLnRzIGJ1aWxkU3RhdGUgXHU1QkY5XHU5RjUwXHVGRjA5XHUzMDAyICovXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZVN0YXRlIHtcbiAgcmVhZHk/OiBib29sZWFuXG4gIHJlYXNvbj86IHN0cmluZ1xuICBwbHVnaW5WZXJzaW9uPzogc3RyaW5nXG4gIHByb2plY3Q/OiB7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgcm9vdFBhdGg6IHN0cmluZzsgY3JlYXRlZEF0OiBudW1iZXIgfSB8IG51bGxcbiAgY2hhbmdlcz86IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZzsgc291cmNlOiBzdHJpbmc7IHVwZGF0ZWRBdDogbnVtYmVyIH0+XG4gIHJ1bnM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBzdGFydGVkQXQ6IG51bWJlciB8IG51bGw7IGZpbmlzaGVkQXQ6IG51bWJlciB8IG51bGw7IGNvc3RVc2Q/OiBudW1iZXI7IHN0ZXBzVG90YWw/OiBudW1iZXI7IHN0ZXBzRG9uZT86IG51bWJlcjsgY3VycmVudFN0ZXA/OiBzdHJpbmcgfCBudWxsIH0+XG4gIGF0dGVtcHRzQ291bnQ/OiBudW1iZXJcbiAgbWVtb3JpZXM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHByb2plY3RJZDogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRydXRoTGV2ZWw6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29udGVudD86IHN0cmluZzsgaXNIdW1hbkNvbmZpcm1lZDogYm9vbGVhbjsgZ2l0QnJhbmNoOiBzdHJpbmcgfCBudWxsOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxuICBldmlkZW5jZUNvdW50PzogbnVtYmVyXG4gIHJlY2VudEV2aWRlbmNlPzogQXJyYXk8eyBpZDogc3RyaW5nOyBzb3VyY2U6IHN0cmluZzsgdHJ1dGhMZXZlbDogc3RyaW5nOyBsb2NhdG9yOiBzdHJpbmc7IHNuaXBwZXQ6IHN0cmluZzsgY3JlYXRlZEF0OiBudW1iZXIgfT5cbiAgcmVzb2x2ZWRJc3N1ZVJldGVudGlvbkRheXM/OiBudW1iZXJcbiAgaW1wb3J0ZWRDaGFuZ2VzPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb21taXRDb3VudDogbnVtYmVyOyBmaXJzdENvbW1pdEF0OiBudW1iZXI7IGxhc3RDb21taXRBdDogbnVtYmVyOyBjb25maWRlbmNlOiBudW1iZXI7IHN0YXR1czogc3RyaW5nIH0+XG4gIGlzc3Vlcz86IEFycmF5PHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgc2V2ZXJpdHk6IHN0cmluZzsgY2F0ZWdvcnk6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmcgfT5cbiAgdmVyaWZpY2F0aW9ucz86IEFycmF5PHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxuICBib290c3RyYXA/OiB7IGlkOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgdGVjaFN0YWNrOiBzdHJpbmdbXTsgbWFuaWZlc3RGaWxlczogc3RyaW5nW107IHN5bWJvbHNDb3VudDogbnVtYmVyOyBjcmVhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxuICBjb25maXJtZWQ/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgdGV4dDogc3RyaW5nOyBmb3JiaWRkZW5QYXRoczogc3RyaW5nW10gfT5cbiAgY29uY2VwdHM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY2F0ZWdvcnk6IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZzsgb2NjdXJyZW5jZXM6IG51bWJlciB9PlxufVxuXG4vKiogR0VUIC9jb21taXRzIFx1NzY4NFx1NjNEMFx1NEVBNFx1Njc2MVx1NzZFRVx1MzAwMmFuYWx5emVkID0gXHU1REYyXHU3NTFGXHU2MjEwXHU4RkM3IEFJIFx1ODlFM1x1OEJGQlx1RkYwOFx1NjcyQVx1NkQ4OFx1NTMxNlx1NTcwNlx1NzBCOVx1NkQ4OFx1NzBCOVx1NEY5RFx1NjM2RVx1RkYwOVx1MzAwMiAqL1xuaW50ZXJmYWNlIENvbW1pdEVudHJ5IHtcbiAgc2hhOiBzdHJpbmdcbiAgc2hvcnRIYXNoOiBzdHJpbmdcbiAgYXV0aG9yOiBzdHJpbmdcbiAgZGF0ZTogbnVtYmVyXG4gIHN1YmplY3Q6IHN0cmluZ1xuICBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IGFkZHM6IG51bWJlcjsgZGVsczogbnVtYmVyIH0+XG4gIGFuYWx5emVkPzogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgQ29tbWl0c1BheWxvYWQge1xuICByb290UGF0aDogc3RyaW5nXG4gIGJyYW5jaDogc3RyaW5nIHwgbnVsbFxuICBoZWFkU2hhOiBzdHJpbmcgfCBudWxsXG4gIHdvcmtpbmc6IHsgZmlsZUNvdW50OiBudW1iZXI7IGlzQ2xlYW46IGJvb2xlYW47IGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmcgfT4gfVxuICBjb21taXRzOiBDb21taXRFbnRyeVtdXG59XG5cbmludGVyZmFjZSBDb21taXREZXRhaWxQYXlsb2FkIHtcbiAgc2hhOiBzdHJpbmdcbiAgaXNXb3JraW5nOiBib29sZWFuXG4gIGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgYWRkczogbnVtYmVyOyBkZWxzOiBudW1iZXIgfT5cbiAgaW5zZXJ0aW9uczogbnVtYmVyXG4gIGRlbGV0aW9uczogbnVtYmVyXG4gIHBhdGNoVHJ1bmNhdGVkOiBib29sZWFuXG4gIHBhdGNoOiBzdHJpbmdcbiAgY29tbWl0OiB7IG1lc3NhZ2U6IHN0cmluZzsgYXV0aG9yOiBzdHJpbmc7IGRhdGU6IG51bWJlciB9IHwgbnVsbFxuICBhbmFseXNpczogeyB3aGF0OiBzdHJpbmc7IGxvZ2ljOiBzdHJpbmdbXTsgcmlza3M6IHN0cmluZ1tdIH1cbiAgYW5hbHlzaXNDYWNoZWQ/OiBib29sZWFuXG4gIGFuYWx5c2lzR2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXG4gIC8qKiBcdTY3MkNcdTZCMjFcdTg5RTNcdThCRkJcdTc2ODQgTExNIFx1NjIxMFx1NjcyQ1x1RkYwOFx1NEYzMFx1RkYwQ1VTRFx1RkYwOVx1RkYxQlx1N0YxM1x1NUI1OFx1NjcyQVx1NUUyNlx1NjIxMFx1NjcyQy9cdTY3MkFcdTRFQTdcdTc1MUZcdThDMDNcdTc1MjhcdTY1RjZcdTdGM0FcdTc3MDFcdTMwMDIgKi9cbiAgYW5hbHlzaXNDb3N0VXNkPzogbnVtYmVyXG4gIGFuYWx5c2lzVG9rZW5zPzogeyBpbnB1dDogbnVtYmVyOyBvdXRwdXQ6IG51bWJlcjsgdG90YWw6IG51bWJlciB9XG59XG5cbmludGVyZmFjZSBJbXBhY3RTY29wZVBheWxvYWQge1xuICBjaGFuZ2VkRmlsZXM6IHN0cmluZ1tdXG4gIHNoYXM/OiBzdHJpbmdbXVxuICByaXNrTGV2ZWw6ICdsb3cnIHwgJ21lZGl1bScgfCAnaGlnaCcgfCAnY3JpdGljYWwnXG4gIHJpc2tTY29yZTogbnVtYmVyXG4gIHJpc2tGYWN0b3JzPzogQXJyYXk8eyB0ZXh0OiBzdHJpbmc7IHBvaW50czogbnVtYmVyIH0+XG4gIGtleUNoYW5nZVBvaW50cz86IHN0cmluZ1tdXG4gIG1lbW9yaWVzPzogQXJyYXk8eyB0aXRsZTogc3RyaW5nOyB0eXBlOiBzdHJpbmcgfT5cbiAgZnVuY3Rpb25JbXBhY3Q/OiBBcnJheTx7XG4gICAgc3ltYm9sOiBzdHJpbmdcbiAgICBkZWZpbmVkSW46IHN0cmluZ1xuICAgIHJvbGU/OiBzdHJpbmdcbiAgICBjaGFuZ2U/OiBzdHJpbmdcbiAgICBpbXBhY3Q/OiBzdHJpbmdcbiAgICBjYWxsZXJzOiBBcnJheTx7IGZpbGU6IHN0cmluZzsgbGluZTogc3RyaW5nOyBzbmlwcGV0OiBzdHJpbmcgfT5cbiAgfT5cbiAgbGV2ZWxzOiBBcnJheTx7IGxldmVsOiBzdHJpbmc7IGRlcHRoOiBudW1iZXI7IHBhdGg6IHN0cmluZzsgY29uZmlkZW5jZTogbnVtYmVyOyByZWFzb246IHN0cmluZyB9PlxuICBkaXJlY3Q6IHN0cmluZ1tdXG4gIGV4cGxhbmF0aW9uc0NhY2hlZD86IGJvb2xlYW5cbiAgZ2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXG4gIC8qKiBcdTUxRkRcdTY1NzBcdTdFQTdcdThCRjRcdTY2MEVcdTkwQTNcdTZCMjEgTExNIFx1OEMwM1x1NzUyOFx1NzY4NFx1NjIxMFx1NjcyQ1x1RkYwOFx1NEYzMFx1RkYwQ1VTRFx1RkYwOVx1MzAwMiAqL1xuICBleHBsYW5hdGlvbnNDb3N0VXNkPzogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmV2aWV3UGF5bG9hZCB7XG4gIGlzc3Vlc0ZvdW5kOiBudW1iZXJcbiAgaXNzdWVzOiBzdHJpbmdcbiAgdmVyZGljdDogc3RyaW5nXG4gIGNhY2hlZD86IGJvb2xlYW5cbiAgZ2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXG4gIGNvc3RVc2Q/OiBudW1iZXJcbiAgaXNzdWVMaXN0PzogQXJyYXk8eyBzZXZlcml0eTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBldmlkZW5jZTogc3RyaW5nOyBmaXg6IHN0cmluZyB9PlxufVxuXG5pbnRlcmZhY2UgTm90ZUVudHJ5IHtcbiAgaWQ6IHN0cmluZ1xuICBwcm9qZWN0SWQ6IHN0cmluZ1xuICBzaGE/OiBzdHJpbmdcbiAgdGl0bGU6IHN0cmluZ1xuICBjb250ZW50OiBzdHJpbmdcbiAgdGFncz86IHN0cmluZ1tdXG4gIHBpbm5lZD86IGJvb2xlYW5cbiAgY3JlYXRlZEF0OiBudW1iZXJcbiAgdXBkYXRlZEF0PzogbnVtYmVyXG59XG5cbi8qKiBHRVQgL2lzc3VlcyBcdTc2ODRcdThCQzRcdTVCQTFcdTk1RUVcdTk4OThcdTY3NjFcdTc2RUVcdUZGMDhSZXZpZXcgXHU5NUVFXHU5ODk4XHU5ODc1XHU3QjdFXHU2NTcwXHU2MzZFXHU2RTkwXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgSXNzdWVFbnRyeSB7XG4gIGlkOiBzdHJpbmdcbiAgY2hhbmdlSWQ6IHN0cmluZ1xuICBzZXZlcml0eTogc3RyaW5nXG4gIGNhdGVnb3J5OiBzdHJpbmdcbiAgdGl0bGU6IHN0cmluZ1xuICBkZXNjcmlwdGlvbjogc3RyaW5nXG4gIHN0YXR1czogc3RyaW5nXG4gIHJlc29sdXRpb246IHN0cmluZ1xuICBmaXhTdGF0czogeyBmaWxlczogbnVtYmVyOyBpbnNlcnRpb25zOiBudW1iZXI7IGRlbGV0aW9uczogbnVtYmVyIH0gfCBudWxsXG4gIGZpeEZpbGVzOiBzdHJpbmdbXVxuICBmaXhJbXBhY3Q6IEFycmF5PHsgc3ltYm9sOiBzdHJpbmc7IGRlZmluZWRJbjogc3RyaW5nOyBjYWxsZXJzOiBBcnJheTx7IGZpbGU6IHN0cmluZzsgbGluZTogc3RyaW5nOyBzbmlwcGV0OiBzdHJpbmcgfT4gfT5cbiAgZml4RGlmZjogc3RyaW5nXG4gIC8qKiBcdTVGODVcdThCQzRcdTVCQTEvXHU1REYyXHU2RDNFXHU1M0QxXHU3Njg0XHU0RkVFXHU1OTBEXHU2NUI5XHU2ODQ4XHVGRjA4XHU2NUI5XHU2ODQ4XHU2QTIxXHU1RjBGXHU0RUE3XHU1MUZBXHVGRjA5XHUzMDAyICovXG4gIGZpeFBsYW4/OiB7IGlkOiBzdHJpbmc7IGFwcHJvYWNoOiBzdHJpbmc7IGZpbGVzOiBzdHJpbmdbXTsgaW1wYWN0OiBzdHJpbmc7IGJlbmVmaXQ6IHN0cmluZzsgcmlzazogc3RyaW5nOyBzdGF0dXM6IHN0cmluZyB9IHwgbnVsbFxuICBjcmVhdGVkQXQ6IG51bWJlclxuICB1cGRhdGVkQXQ6IG51bWJlclxufVxuXG4vKiogXHU0RkVFXHU1OTBEXHU2RDNFXHU1M0QxXHU0RUZCXHU1MkExXHU4OUM2XHU1NkZFXHVGRjA4R0VUIC9maXgvc3RhdHVzXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgRml4VGFza0VudHJ5IHtcbiAgaXNzdWVJZDogc3RyaW5nXG4gIHRpdGxlOiBzdHJpbmdcbiAgc3RhdHVzOiAncXVldWVkJyB8ICdydW5uaW5nJyB8ICdtZXJnaW5nJyB8ICdyZWRvJyB8ICdkb25lJyB8ICdjb25mbGljdCcgfCAnZmFpbGVkJyB8ICdjYW5jZWxsZWQnXG4gIGF0dGVtcHQ6IG51bWJlclxuICBzdW1tYXJ5Pzogc3RyaW5nXG4gIGZpbGVzPzogc3RyaW5nW11cbiAgY29tbWl0Pzogc3RyaW5nXG4gIGVycm9yPzogc3RyaW5nXG4gIC8qKiBcdThGRDBcdTg4NENcdTRFMkRcdTVCNTBcdTRFRTNcdTc0MDZcdTc2ODRcdTY3MDBcdThGRDFcdTUyQThcdTRGNUNcdUZGMDhcdThCRkIvXHU1MTk5XHU1NEVBXHU0RTJBXHU2NTg3XHU0RUY2XHVGRjA5XHUzMDAyICovXG4gIGN1cnJlbnRBY3Rpb24/OiBzdHJpbmdcbiAgLyoqIFx1NUI4Q1x1NjIxMFx1NTQwRVx1NzY4NFx1NUY3MVx1NTRDRFx1NjQ1OFx1ODk4MVx1RkYwOFx1NzZGNFx1NkQzRVx1NEVGQlx1NTJBMVx1ODFFQVx1NTJBOFx1OEJBMVx1N0I5N1x1RkYwOVx1MzAwMiAqL1xuICBpbXBhY3Q/OiB7IHJpc2tMZXZlbDogc3RyaW5nOyByaXNrU2NvcmU6IG51bWJlcjsgZGlyZWN0OiBzdHJpbmdbXTsgaW5kaXJlY3Q6IHN0cmluZ1tdOyBwb3RlbnRpYWw6IHN0cmluZ1tdIH1cbiAgLyoqIFx1NEVGQlx1NTJBMVx1NkEyMVx1NUYwRlx1RkYxQWZpeD1cdTRGRUVcdTU5MERcdUZGMDhcdTlFRDhcdThCQTRcdUZGMDlcdUZGMUJwbGFuPVx1NTNFQVx1OEJGQlx1NTFGQVx1NjVCOVx1Njg0OFx1MzAwMiAqL1xuICBtb2RlPzogJ2ZpeCcgfCAncGxhbidcbn1cblxuLyoqIFx1NEZFRVx1NTkwRFx1NURFRVx1NUYwMlx1NzY4NFx1ODg0Q1x1N0VBN1x1Nzc0MFx1ODI3Mlx1NkUzMlx1NjdEM1x1RkYxQSsgXHU3RUZGXHUzMDAxLSBcdTdFQTJcdTMwMDFcdTY1ODdcdTRFRjZcdTU5MzRcdTUyQTBcdTdDOTdcdTMwMDFcdTUxNzZcdTRGNTlcdTVGMzFcdTUzMTZcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlbmRlckRpZmZMaW5lcyhkaWZmOiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XG4gIGlmICh0eXBlb2YgZGlmZiAhPT0gJ3N0cmluZycgfHwgZGlmZiA9PT0gJycpIHJldHVybiBbXVxuICByZXR1cm4gZGlmZi5zcGxpdCgnXFxuJykuc2xpY2UoMCwgNDAwKS5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgY29uc3Qgc3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XG4gICAgICBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJyxcbiAgICAgIGZvbnRTaXplOiAnMTFweCcsIGxpbmVIZWlnaHQ6IDEuNiwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyxcbiAgICB9XG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnKysrJykgfHwgbGluZS5zdGFydHNXaXRoKCctLS0nKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJ2RpZmYgLS1naXQnKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJ0BAJykpIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJ1xuICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKCcrJykpIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gdGhlbWVBd2FyZVRleHQoJyMxYTdmMzcnKVxuICAgICAgc3R5bGUuYmFja2dyb3VuZCA9ICdyZ2JhKDQ2LDE2MCw2NywwLjA4KSdcbiAgICB9IGVsc2UgaWYgKGxpbmUuc3RhcnRzV2l0aCgnLScpKSB7XG4gICAgICBzdHlsZS5jb2xvciA9IHRoZW1lQXdhcmVUZXh0KCcjZDEyNDJmJylcbiAgICAgIHN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgyMDksMzYsNDcsMC4wOCknXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJ1xuICAgIH1cbiAgICByZXR1cm4gPGRpdiBrZXk9e2luZGV4fSBzdHlsZT17c3R5bGV9PntsaW5lID09PSAnJyA/ICdcXHUwMEEwJyA6IGxpbmV9PC9kaXY+XG4gIH0pXG59XG5cbi8qKiBcdThCQTFcdTUyMTJcdTc4NkVcdThCQTRcdTk4NzVcdTc2ODRcdTUzRUZcdTdGMTZcdThGOTFcdTZCNjVcdTlBQTRcdUZGMDgvcnVucy9zdGFydCBcdThGRDRcdTU2REVcdUZGMDlcdTMwMDIgKi9cbmludGVyZmFjZSBQbGFuQ29uZmlybVN0ZXAge1xuICBpZDogc3RyaW5nXG4gIHRpdGxlOiBzdHJpbmdcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xuICB0YXJnZXRGaWxlczogc3RyaW5nW11cbiAgcm9sZTogc3RyaW5nXG4gIGFjY2VwdGFuY2U6IHN0cmluZ1xuICBmYWlsdXJlUG9saWN5OiBzdHJpbmdcbiAgZW5hYmxlZDogYm9vbGVhblxuICBtb2RlbFByb3ZpZGVyOiBzdHJpbmdcbiAgbW9kZWxJZDogc3RyaW5nXG59XG5cbi8qKiBQT1NUIC9wZWVrIFx1NzY4NFx1OEY3RFx1ODM3N1x1RkYwOFx1NEVFM1x1NzgwMVx1NEUwQVx1NEUwQlx1NjU4N1x1NkQ2RVx1NUM0Mlx1RkYwOVx1MzAwMiAqL1xuaW50ZXJmYWNlIFBlZWtQYXlsb2FkIHtcbiAgZXhpc3RzOiBib29sZWFuXG4gIHBhdGg/OiBzdHJpbmdcbiAgc3RhcnRMaW5lPzogbnVtYmVyXG4gIGVuZExpbmU/OiBudW1iZXJcbiAgdG90YWxMaW5lcz86IG51bWJlclxuICBsaW5lcz86IEFycmF5PHsgbjogbnVtYmVyOyB0ZXh0OiBzdHJpbmcgfT5cbn1cblxuLyoqIFx1NEVDRVx1ODFFQVx1NzUzMVx1NjU4N1x1NjcyQ1x1NEUyRFx1OEJDNlx1NTIyQiBmaWxlOmxpbmUgXHU1RjE1XHU3NTI4XHVGRjA4XHU1NDJCIGZpbGU6bGluZS1saW5lIFx1NTMzQVx1OTVGNFx1NTNENlx1OEQ3N1x1NTlDQlx1ODg0Q1x1RkYwOVx1MzAwMiAqL1xuY29uc3QgRklMRV9MSU5FX1BBVFRFUk4gPSAvKCg/OltcXHcuLV0rWy9cXFxcXSkqW1xcdy4tXStcXC5bQS1aYS16XXsxLDR9KTooXFxkezEsNX0pKD86LVxcZHsxLDV9KT8vZ1xuXG4vKiogR0VUIC9ydW5zL2RldGFpbCBcdTc2ODRcdThGN0RcdTgzNzdcdTMwMDIgKi9cbmludGVyZmFjZSBSdW5EZXRhaWwge1xuICBydW46IHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgY2hhbmdlVGl0bGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IHBhdXNlUG9pbnQ6IHsgc3RlcElkOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nOyBhdDogbnVtYmVyIH0gfCBudWxsOyBlcnJvcjogeyBtZXNzYWdlOiBzdHJpbmcgfSB8IG51bGw7IHN0YXJ0ZWRBdDogbnVtYmVyIHwgbnVsbDsgZmluaXNoZWRBdDogbnVtYmVyIHwgbnVsbCB9XG4gIHN0ZXBzOiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHJvbGU6IHN0cmluZzsgbW9kZWw6IHN0cmluZyB8IG51bGw7IHN0YXR1czogc3RyaW5nOyBhdHRlbXB0c0NvdW50OiBudW1iZXI7IGNsYWltZWRPdXRjb21lOiBzdHJpbmcgfCBudWxsOyB2ZXJpZmllZDogYm9vbGVhbjsgY29zdFVzZDogbnVtYmVyIH0+XG4gIGNvbnRleHQ6IHtcbiAgICBwcm9qZWN0RGlnZXN0OiBzdHJpbmc7IGJyYW5jaDogc3RyaW5nIHwgbnVsbDsgaGVhZFNoYTogc3RyaW5nIHwgbnVsbFxuICAgIGluamVjdGVkTWVtb3JpZXM6IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZyB9PlxuICAgIHN0ZXBTdW1tYXJpZXM6IEFycmF5PHsgc3RlcFRpdGxlOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgY2hhbmdlZEZpbGVzOiBzdHJpbmdbXTsgYXQ6IG51bWJlciB9PlxuICAgIGRlY2lzaW9uTG9nOiBBcnJheTx7IGtpbmQ6IHN0cmluZzsgZGV0YWlsOiBzdHJpbmc7IGF0OiBudW1iZXIgfT5cbiAgfSB8IG51bGxcbn1cblxuLyoqIEdFVCAvc2NoZWR1bGVkIFx1NzY4NFx1NEVGQlx1NTJBMVx1Njc2MVx1NzZFRVx1MzAwMiAqL1xuaW50ZXJmYWNlIFNjaGVkdWxlZFRhc2tFbnRyeSB7XG4gIGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nXG4gIGludGVydmFsTWludXRlczogbnVtYmVyOyBlbmFibGVkOiBib29sZWFuOyBsYXN0UnVuQXQ6IG51bWJlciB8IG51bGw7IGxhc3RSZXN1bHQ6IHN0cmluZzsgbmV4dER1ZUF0OiBudW1iZXJcbn1cblxuLyoqIEdFVCAvbWVtb3JpZXMgXHU3Njg0XHU4QkIwXHU1RkM2XHU2NzYxXHU3NkVFXHVGRjA4XHU4QkIwXHU1RkM2XHU5NzYyXHU2NzdGXHU2NTcwXHU2MzZFXHU2RTkwXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgTWVtb3J5RW50cnkge1xuICBpZDogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZzsgcmVsYXRlZEZpbGVzOiBzdHJpbmdbXVxuICBpc0h1bWFuQ29uZmlybWVkOiBib29sZWFuOyBnaXRCcmFuY2g6IHN0cmluZyB8IG51bGw7IHNjb3BlOiBzdHJpbmc7IHNvdXJjZVRhZzogc3RyaW5nXG4gIGJhc2lzU2hhOiBzdHJpbmcgfCBudWxsOyBzdGF0dXM6IHN0cmluZzsgbGFzdFZlcmlmaWVkU2hhOiBzdHJpbmcgfCBudWxsXG4gIGNyZWF0ZWRBdDogbnVtYmVyOyB1cGRhdGVkQXQ6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgTWVtb3JpZXNQYXlsb2FkIHtcbiAgbWVtb3JpZXM6IE1lbW9yeUVudHJ5W11cbiAgYnJhbmNoOiBzdHJpbmcgfCBudWxsXG4gIGhlYWRTaGE6IHN0cmluZyB8IG51bGxcbiAgYmFzZWxpbmU6IHsgc2hhOiBzdHJpbmcgfCBudWxsOyB1cGRhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxuICBiZWhpbmRDb3VudDogbnVtYmVyXG59XG5cbi8qKiBQT1NUIC9tZW1vcnkvc3luYyBcdTc2ODRcdTU0MENcdTZCNjVcdTYyQTVcdTU0NEFcdTMwMDIgKi9cbmludGVyZmFjZSBTeW5jUmVwb3J0IHtcbiAgb2s6IGJvb2xlYW5cbiAgZXJyb3I/OiBzdHJpbmdcbiAgYmVoaW5kQ291bnQ/OiBudW1iZXJcbiAgc3RhbGVQcm9wb3NhbHM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0+XG4gIHJlbmV3ZWQ/OiBudW1iZXJcbiAgbmV3Q2FuZGlkYXRlcz86IEFycmF5PHsgdHlwZTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmcgfT5cbiAgdmVyZGljdD86IHN0cmluZ1xufVxuXG4vKiogXHU4QkM0XHU1QkExXHU5NUVFXHU5ODk4XHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IElTU1VFX1NUQVRVU19MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIG9wZW46ICdcdTVGODVcdTU5MDRcdTc0MDYnLFxuICBmaXhpbmc6ICdcdTRGRUVcdTU5MERcdTRFMkQnLFxuICByZXNvbHZlZDogJ1x1NURGMlx1ODlFM1x1NTFCMycsXG4gIGFjY2VwdGVkOiAnXHU1REYyXHU1OTA0XHU3NDA2JyxcbiAgcmVqZWN0ZWQ6ICdcdThCRUZcdTYyQTUvXHU5MUNEXHU1OTBEJyxcbn1cblxuLyoqIFx1OEJCMFx1NUZDNlx1N0M3Qlx1NTc4QiBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXG5jb25zdCBNRU1PUllfVFlQRV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIGFyY2hpdGVjdHVyZV9kZWNpc2lvbjogJ1x1NjdCNlx1Njc4NFx1NTFCM1x1N0I1NicsIHBhdHRlcm5fcnVsZTogJ1x1NkEyMVx1NUYwRlx1ODlDNFx1NTIxOScsIHJpc2tfaG90c3BvdDogJ1x1OThDRVx1OTY2OVx1NzBFRFx1NzBCOScsXG4gIGxlYXJuZWRfY29uY2VwdDogJ1x1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNScsIHVzZXJfcHJvZmlsZTogJ1x1NzUyOFx1NjIzN1x1NTA0Rlx1NTk3RCcsIHByb2plY3RfbG9nOiAnXHU5ODc5XHU3NkVFXHU2NUU1XHU1RkQ3JywgZGFpbHlfbG9nOiAnXHU2NUU1XHU1RkQ3Jyxcbn1cblxuLyoqIFx1OEJCMFx1NUZDNlx1Njc2NVx1NkU5MCBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXG5jb25zdCBNRU1PUllfU09VUkNFX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgcnVuOiAnXHU2MjY3XHU4ODRDXHU2M0QwXHU3MEJDJywgcmV2aWV3OiAnXHU2ODM4XHU2N0U1XHU2Qzg5XHU2REMwJywgc3luYzogJ1x1NjJDOVx1NTNENlx1NTQwQ1x1NkI2NScsIGNoYXQ6ICdBSSBcdThCQjBcdTVGNTUnLCBtYW51YWw6ICdcdTYyNEJcdTUyQTgnLFxufVxuXG4vKiogXHU3RjE2XHU2MzkyXHU4OUQyXHU4MjcyIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFJPTEVfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBhbmFseXNpczogJ1x1NTIwNlx1Njc5MCcsIHBsYW5uaW5nOiAnXHU4OUM0XHU1MjEyJywgY29kaW5nOiAnXHU1RjAwXHU1M0QxJywgb3BzOiAnXHU3QjgwXHU1MzU1XHU2NENEXHU0RjVDJywgdmVyaWZpY2F0aW9uOiAnXHU5QThDXHU2NTM2Jyxcbn1cblxuLyoqIFx1NkI2NVx1OUFBNFx1NTkzMVx1OEQyNVx1N0I1Nlx1NzU2NSBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXG5jb25zdCBQT0xJQ1lfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAncmV0cnktZXNjYWxhdGUnOiAnXHU5MUNEXHU4QkQ1XHU1RTc2XHU1MzQ3XHU3RUE3XHU2QTIxXHU1NzhCJywgJ3JldHJ5LWZhbGxiYWNrJzogJ1x1OTFDRFx1OEJENScsIHNraXA6ICdcdTU5MzFcdThEMjVcdTUyMTlcdThERjNcdThGQzcnLCBhc2s6ICdcdTU5MzFcdThEMjVcdTUyMTlcdTY2ODJcdTUwNUNcdTk1RUVcdTRFQkEnLFxufVxuXG4vKiogUnVuIFx1NzJCNlx1NjAwMSBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXG5jb25zdCBSVU5fU1RBVFVTX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgcXVldWVkOiAnXHU2MzkyXHU5NjFGXHU0RTJEJywgcnVubmluZzogJ1x1OEZEMFx1ODg0Q1x1NEUyRCcsIHBhdXNlZDogJ1x1NURGMlx1NjY4Mlx1NTA1QycsIGJsb2NrZWQ6ICdcdTk2M0JcdTU4NUUnLCByZXRyeWluZzogJ1x1OTFDRFx1OEJENVx1NEUyRCcsXG4gIHZlcmlmeWluZzogJ1x1NjUzNlx1NUMzRVx1OUE4Q1x1NjUzNlx1NEUyRCcsIHN1Y2NlZWRlZDogJ1x1NURGMlx1NjIxMFx1NTI5RicsIGNvbXBsZXRlZDogJ1x1NURGMlx1NjIxMFx1NTI5RicsIGZhaWxlZDogJ1x1NTkzMVx1OEQyNScsIGNhbmNlbGxlZDogJ1x1NURGMlx1NTNENlx1NkQ4OCcsIGludGVycnVwdGVkOiAnXHU1REYyXHU0RTJEXHU2NUFEJyxcbn1cblxuLyoqIFx1NkI2NVx1OUFBNFx1NzJCNlx1NjAwMSBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXG5jb25zdCBTVEVQX1NUQVRVU19MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIHBlbmRpbmc6ICdcdTVGODVcdTYyNjdcdTg4NEMnLCByZWFkeTogJ1x1NUMzMVx1N0VFQScsIHJ1bm5pbmc6ICdcdTYyNjdcdTg4NENcdTRFMkQnLCBwYXVzZWQ6ICdcdTY2ODJcdTUwNUMnLCByZXRyeWluZzogJ1x1OTFDRFx1OEJENVx1NEUyRCcsXG4gIHN1Y2NlZWRlZDogJ1x1NURGMlx1NjIxMFx1NTI5RicsIGZhaWxlZDogJ1x1NTkzMVx1OEQyNScsIHNraXBwZWQ6ICdcdTVERjJcdThERjNcdThGQzcnLCBibG9ja2VkOiAnXHU5NjNCXHU1ODVFJywgY2FuY2VsbGVkOiAnXHU1REYyXHU1M0Q2XHU2RDg4JywgaW50ZXJydXB0ZWQ6ICdcdTVERjJcdTRFMkRcdTY1QUQnLFxufVxuXG4vKiogXHU4QkM0XHU1QkExXHU5NUVFXHU5ODk4XHU0RTI1XHU5MUNEXHU1RUE2IFx1MjE5MiBcdTVGQkRcdTdBRTBcdTVFOTVcdTgyNzJcdTMwMDIgKi9cbmZ1bmN0aW9uIHNldmVyaXR5Q29sb3Ioc2V2ZXJpdHk6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChzZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBzZXZlcml0eSA9PT0gJ2Jsb2NrZXInKSByZXR1cm4gJyNjZTkxNzgnXG4gIGlmIChzZXZlcml0eSA9PT0gJ21ham9yJykgcmV0dXJuICcjZDdiYTdkJ1xuICBpZiAoc2V2ZXJpdHkgPT09ICdpbmZvJykgcmV0dXJuICcjNmI4YjhiJ1xuICByZXR1cm4gJyM1NjljZDYnXG59XG5cbi8qKiBcdTRFMjVcdTkxQ0RcdTVFQTZcdTVGNTJcdTRFMDBcdUZGMDhcdTUxN0NcdTVCQjlcdTUzODZcdTUzRjJcdThCQjBcdTVGNTVcdTkxQ0NcdTc2ODQgaGlnaC9tZWRpdW0vbG93XHVGRjFCXHU2NzJBXHU3N0U1XHU1NkRFXHU4NDNEIG1pbm9yXHVGRjA5XHVGRjBDXHU3RURGXHU4QkExL1x1N0I1Qlx1OTAwOS9cdTc3NDBcdTgyNzJcdTUxNzFcdTc1MjhcdTMwMDIgKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZUlzc3VlU2V2ZXJpdHkoc2V2ZXJpdHk6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChzZXZlcml0eSA9PT0gJ2hpZ2gnKSByZXR1cm4gJ21ham9yJ1xuICBpZiAoc2V2ZXJpdHkgPT09ICdtZWRpdW0nIHx8IHNldmVyaXR5ID09PSAnbG93JykgcmV0dXJuICdtaW5vcidcbiAgcmV0dXJuIHNldmVyaXR5ID09PSAnYmxvY2tlcicgfHwgc2V2ZXJpdHkgPT09ICdjcml0aWNhbCcgfHwgc2V2ZXJpdHkgPT09ICdtYWpvcicgfHwgc2V2ZXJpdHkgPT09ICdtaW5vcicgfHwgc2V2ZXJpdHkgPT09ICdpbmZvJ1xuICAgID8gc2V2ZXJpdHkgOiAnbWlub3InXG59XG5cbi8vIFx1NEUzQlx1OTg5OFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYwOHBhcnNlQ29sb3IgLyByZWxhdGl2ZUx1bWluYW5jZSAvIGRhcmtlbi9saWdodGVuIC8gdGhlbWVBd2FyZVRleHRcdUZGMDlcbi8vIFx1NURGMlx1NjJCRFx1NTNENlx1NTIzMCAuL3RoZW1lLnRzIFx1N0VERlx1NEUwMFx1N0VGNFx1NjJBNFx1MzAwMlx1NTE2OFx1NjU4N1x1NEVGNlx1NEUwRFx1NTNEOFx1NUYwRlx1RkYxQVxuLy8gMSkgXHU1RjNBXHU4QzAzXHU4MjcyXHU2NTg3XHU1QjU3XHU1RkM1XHU5ODdCXHU3RUNGIHRoZW1lQXdhcmVUZXh0XHVGRjA4XHU2RTMyXHU2N0QzXHU2NzFGXHU4QzAzXHU3NTI4XHVGRjA5XHVGRjFCXG4vLyAyKSBhY3RpdmUgXHU5QUQ4XHU0RUFFXHU4MENDXHU2NjZGXHU0RTAwXHU1RjhCIGJ1dHRvbi1pbmZvLWZpbGxcdUZGMENcdTc5ODFcdTZCNjIgYnJhbmQtcHJpbWFyeSBcdTRGNUNcdTgwQ0NcdTY2NkZcbi8vICAgIFx1RkYwOFx1NkRGMVx1ODI3Mlx1NEUzQlx1OTg5OFx1NEUwQlx1OEZEMVx1NzY3RFx1RkYwQ1x1OTE0RFx1NzY3RFx1NUI1N1x1NEUwRFx1NTNFRlx1ODlDMVx1MjAxNFx1MjAxNFx1MzAwQ1x1OTg3NVx1N0I3RVx1NzY3RFx1NTc1N1x1MzAwRFx1NEU4Qlx1NjU0NVx1NjgzOVx1NTZFMFx1RkYwOVx1MzAwMlxuXG4vKiogXHU4QkM0XHU1QkExXHU3NkVFXHU2ODA3XHVGRjA4Y2hhbmdlSWRcdUZGMDlcdTIxOTIgXHU1M0VGXHU4QkZCXHU2ODA3XHU3QjdFXHVGRjFBXHU1NDA4XHU2MjEwIHJldmlldzo8c2hhPiBcdTYzMDdcdTU0MTFcdTYzRDBcdTRFQTRcdUZGMENjaGdfKiBcdTYzMDdcdTU0MTFcdTUzRDhcdTY2RjRcdUZGMENhZGhvYyBcdTRFM0FcdTVERTVcdTRGNUNcdTUzM0FcdTMwMDIgKi9cbmZ1bmN0aW9uIGlzc3VlVGFyZ2V0TGFiZWwoY2hhbmdlSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGlkID0gdHlwZW9mIGNoYW5nZUlkID09PSAnc3RyaW5nJyA/IGNoYW5nZUlkIDogJydcbiAgaWYgKGlkLnN0YXJ0c1dpdGgoJ3JldmlldzonKSkgcmV0dXJuIGBcdTYzRDBcdTRFQTQgJHtpZC5zbGljZSg3LCAxNSl9YFxuICBpZiAoaWQgPT09ICdhZGhvYycpIHJldHVybiAnXHU1REU1XHU0RjVDXHU1MzNBJ1xuICByZXR1cm4gYFx1NTNEOFx1NjZGNCAke2lkLnNsaWNlKDAsIDExKX1gXG59XG5cbi8qKiBcdTYwM0JcdTdFRDMvXHU3RUQzXHU2Nzg0XHU1MzE2XHU3QjE0XHU4QkIwXHU3Njg0XHU4RjdCXHU5MUNGIE1hcmtkb3duIFx1NkUzMlx1NjdEM1x1RkYxQVx1MzAwQyMjIFx1MzAwRFx1ODI4Mlx1NjgwN1x1OTg5OFx1Nzc0MFx1ODI3Mlx1NTJBMFx1N0M5N1x1RkYwQ1x1MzAwQy0gXHUzMDBEXHU1MjE3XHU4ODY4XHU1MkEwXHU1NzA2XHU3MEI5XHVGRjBDXHU1MTc2XHU0RjU5XHU1MzlGXHU2ODM3XHUzMDAyICovXG5mdW5jdGlvbiByZW5kZXJTdHJ1Y3R1cmVkQ29udGVudChjb250ZW50OiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XG4gIGlmICh0eXBlb2YgY29udGVudCAhPT0gJ3N0cmluZycgfHwgY29udGVudCA9PT0gJycpIHJldHVybiBbXVxuICByZXR1cm4gY29udGVudC5zcGxpdCgnXFxuJykubWFwKChsaW5lLCBpbmRleCkgPT4ge1xuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJyMjICcpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGtleT17aW5kZXh9IHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCwgZm9udFNpemU6ICcxMi41cHgnLCBtYXJnaW5Ub3A6IGluZGV4ID09PSAwID8gMCA6IDEwLCBtYXJnaW5Cb3R0b206IDIsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT5cbiAgICAgICAgICB7bGluZS5zbGljZSgzKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJy0gJykpIHtcbiAgICAgIHJldHVybiA8ZGl2IGtleT17aW5kZXh9IHN0eWxlPXt7IHBhZGRpbmdMZWZ0OiAxNCwgdGV4dEluZGVudDogLTEwIH19Plx1MjAyMiB7cmVuZGVyV2l0aFBlZWsobGluZS5zbGljZSgyKSl9PC9kaXY+XG4gICAgfVxuICAgIHJldHVybiA8ZGl2IGtleT17aW5kZXh9PntsaW5lID09PSAnJyA/ICdcXHUwMEEwJyA6IHJlbmRlcldpdGhQZWVrKGxpbmUpfTwvZGl2PlxuICB9KVxufVxuXG4vKiogcGVlayBcdTcwQjlcdTUxRkJcdTU2REVcdThDMDNcdUZGMUFcdTc1MzEgV29ya3NwYWNlRnJhbWUgXHU2Q0U4XHU1MTY1XHVGRjA4XHU2RTMyXHU2N0QzXHU1NjY4XHU0RkREXHU2MzAxXHU2QTIxXHU1NzU3XHU3RUE3XHU3RUFGXHU1MUZEXHU2NTcwXHVGRjA5XHUzMDAyICovXG5sZXQgcGVla09wZW5lcjogKChwYXRoOiBzdHJpbmcsIGxpbmU6IG51bWJlcikgPT4gdm9pZCkgfCB1bmRlZmluZWRcblxuLyoqIFx1NjI4QVx1NjU4N1x1NjcyQ1x1NEUyRFx1NzY4NCBmaWxlOmxpbmUgXHU1RjE1XHU3NTI4XHU2RTMyXHU2N0QzXHU0RTNBXHU1M0VGXHU3MEI5XHU1MUZCXHU4MkFGXHU3MjQ3XHVGRjA4XHU3MEI5XHU1MUZCXHU1RjM5XHU1MUZBXHU0RUUzXHU3ODAxXHU0RTBBXHU0RTBCXHU2NTg3XHVGRjA5XHUzMDAyICovXG5mdW5jdGlvbiByZW5kZXJXaXRoUGVlayh0ZXh0OiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGUge1xuICBjb25zdCBub2RlczogUmVhY3QuUmVhY3ROb2RlW10gPSBbXVxuICBsZXQgbGFzdCA9IDBcbiAgbGV0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXkgfCBudWxsXG4gIEZJTEVfTElORV9QQVRURVJOLmxhc3RJbmRleCA9IDBcbiAgd2hpbGUgKChtYXRjaCA9IEZJTEVfTElORV9QQVRURVJOLmV4ZWModGV4dCkpICE9PSBudWxsKSB7XG4gICAgaWYgKG1hdGNoLmluZGV4ID4gbGFzdCkgbm9kZXMucHVzaCh0ZXh0LnNsaWNlKGxhc3QsIG1hdGNoLmluZGV4KSlcbiAgICBjb25zdCBbZnVsbCwgcGF0aCwgbGluZVN0cl0gPSBtYXRjaFxuICAgIG5vZGVzLnB1c2goXG4gICAgICA8YnV0dG9uXG4gICAgICAgIGtleT17YCR7bWF0Y2guaW5kZXh9LSR7ZnVsbH1gfVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJywgYm9yZGVyOiAnbm9uZScsIHBhZGRpbmc6ICcwIDFweCcsIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgIGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknLFxuICAgICAgICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJywgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUgZG90dGVkJyxcbiAgICAgICAgfX1cbiAgICAgICAgdGl0bGU9XCJcdTcwQjlcdTUxRkJcdTY3RTVcdTc3MEJcdTRFRTNcdTc4MDFcdTRFMEFcdTRFMEJcdTY1ODdcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHBlZWtPcGVuZXI/LihwYXRoLCBOdW1iZXIobGluZVN0cikpIH19XG4gICAgICA+e2Z1bGx9PC9idXR0b24+LFxuICAgIClcbiAgICBsYXN0ID0gbWF0Y2guaW5kZXggKyBmdWxsLmxlbmd0aFxuICB9XG4gIGlmIChsYXN0IDwgdGV4dC5sZW5ndGgpIG5vZGVzLnB1c2godGV4dC5zbGljZShsYXN0KSlcbiAgcmV0dXJuIG5vZGVzLmxlbmd0aCA9PT0gMSA/IG5vZGVzWzBdIDogPHNwYW4+e25vZGVzfTwvc3Bhbj5cbn1cblxuLyoqXG4gKiBcdTg5QzZcdTg5QzlcdTYzNjJcdTUyMTdcdTY4MzdcdTVGMEZcdTg4NjhcdUZGMUFcdTk2OEZcdTY3MkNcdTdFQzRcdTRFRjZcdTYzMDJcdThGN0QvXHU1Mzc4XHU4RjdEXHVGRjA4XHU1Mzc4XHU4RjdEXHU1MzczXHU1QjhDXHU1MTY4XHU2MDYyXHU1OTBEXHU1MzlGXHU3NTFGXHU1RTAzXHU1QzQwXHVGRjA5XHUzMDAyXG4gKiBcdTYzNjJcdTUyMTdcdTY2MkZcdTY1RTBcdTY3NjFcdTRFRjZcdTc2ODRcdUZGMDhcdTU0MkJcdTY1QjBcdTRGMUFcdThCRERcdTg0M0RcdTU3MzBcdTk4NzVcdUZGMDlcdTIwMTRcdTIwMTRcdTRFMUFcdTRFM0JcdTg5QzRcdTUyMTlcdUZGMUFcdTVERTVcdTRGNUNcdTUzRjBcdTg5ODFcdTRFNDhcdTRFMERcdTY2M0VcdTc5M0FcdTMwMDFcdTg5ODFcdTRFNDhcdTVDNDVcdTRFMkRcdUZGMENcbiAqIFx1NTNGM1x1NEZBN1x1NTNFQVx1NTE0MVx1OEJCOFx1ODA0QVx1NTkyOVx1MzAwMjAuMS4yIFx1NjVCMFx1NEYxQVx1OEJERFx1OTg3NVx1NEU1Rlx1NUUyNiBkYXRhLWRldGFpbHMtY29sbGFwc2VkXHVGRjBDXHU2NkZFXHU1NkUwXHU1QkY5XHU1QjgzXHU4QzQxXHU1MTREXG4gKiBcdTYzNjJcdTUyMTdcdTVCRkNcdTgxRjRcdTVERTVcdTRGNUNcdTUzRjBcdTU3MjhcdTY1QjBcdTRGMUFcdThCRERcdTRFMEJcdTkwMDBcdTU2REVcdTUzOUZcdTc1MUZcdTUzRjNcdTRGNERcdUZGMDgyMDI2LTA5LTEwIFx1NEZFRVx1NTkwRFx1RkYwOVx1MzAwMlxuICogXHU2Q0U4XHU2MTBGXHVGRjFBXHU3OTgxXHU2QjYyXHU3NTI4IDpoYXMoKSBcdTUwNUFcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdTIwMTRcdTIwMTRcdTVCOThcdTY1QjlcdTY3ODRcdTVFRkFcdTRFQTdcdTcyNjlcdTUxRTBcdTUzNDFcdTRFMkFcdTdFQzRcdTRFRjZcdTY4MzlcdTdDN0JcdTkwRkRcdTUzRUIgcm9vdFx1RkYwQ1xuICogXHU3OTU2XHU1MTQ4XHU1MzM5XHU5MTREXHU0RjFBXHU2MjhBXHU2NTc0XHU0RTJBXHU4MDRBXHU1OTI5XHU1QkI5XHU1NjY4XHU4QkVGXHU5NEIzXHU1MjM2XHVGRjA4XHU1Mzg2XHU1M0YyXHU0RThCXHU2NTQ1XHVGRjA5XHUzMDAyXHU2QjY0XHU4ODY4XHU1M0VBXHU0RkREXHU3NTU5XHU3RjUxXHU2ODNDXHU2MzYyXHU1MjE3XHU0RTBFXHU2MkQ2XHU2MkZEXHU2N0M0XHU5NjkwXHU4NUNGXHUzMDAyXG4gKi9cbmNvbnN0IExBWU9VVF9TVFlMRSA9IGBcbmRpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0gPiBkaXZbY2xhc3MqPVwiY2VudGVyQ29sXCJdIHsgb3JkZXI6IDM7IH1cbmRpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0gPiBkaXZbY2xhc3MqPVwiZGV0YWlsc0NvbFwiXSB7IG9yZGVyOiAyOyB9XG5kaXZbY2xhc3MqPVwiaGFuZGxlXCJdW2RhdGEtc2lkZT1cImRldGFpbHNcIl0geyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH1cbmRpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0ge1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gbWlubWF4KDAsIDFmcikgdmFyKC0tcGMtY2hhdC13LCAzNjBweCkgIWltcG9ydGFudDtcbn1cbmBcblxuLyoqXG4gKiBcdTRGMUFcdThCRERcdTdFREZcdThCQTFcdTg4NENcdTc2ODRcdTRFMjRcdTg4NENcdTk0QjNcdTUyMzZcdUZGMDhcdTc1MjhcdTYyMzdcdTYzMDdcdTVCOUFcdTc2ODRcdTY4MzdcdTVGMEZcdUZGMDlcdTMwMDJcdTRFMERcdTgwRkRcdThENzAgQ1NTIFx1OTAwOVx1NjJFOVx1NTY2OFx1RkYxQVxuICogXHU1Qjk4XHU2NUI5XHU1OTFBXHU0RTJBXHU2QTIxXHU1NzU3XHU3Njg0XHU2ODM5XHU3QzdCXHU5MEZEXHU1M0VCIGByb290YFx1RkYwOFx1Njc4NFx1NUVGQVx1NTQwRVx1NjYyRiBgaGFzaF9yb290YFx1RkYwOVx1RkYwQ1x1NTE3Nlx1NEUyRFxuICogQ29udmVyc2F0aW9uUm9vdCBcdTc2ODRcdTVCNTBcdTY4MTFcdTkxQ0NcdTVDMzFcdTUzMDVcdTU0MkJcdTdFREZcdThCQTFcdTg4NENcdTc2ODQgYGhhc2hfc2VwYCBcdTUyMDZcdTk2OTQgc3Bhblx1MjAxNFx1MjAxNFxuICogXHU0RUZCXHU0RjU1XHU3OTU2XHU1MTQ4XHU1MzM5XHU5MTREXHVGRjA4XHU1NDJCIDpoYXMoKVx1RkYwOVx1OTBGRFx1NEYxQVx1NjI4QVx1NjU3NFx1NEUyQVx1ODA0QVx1NTkyOVx1NUJCOVx1NTY2OFx1OTRCM1x1NjIxMFx1NEUyNFx1ODg0Q1x1RkYwQ1x1Njc0MFx1NkI3Qlx1NkVEQVx1NTJBOFx1MzAwMlxuICogXHU1NkUwXHU2QjY0XHU1NzI4XHU4RkQwXHU4ODRDXHU2NUY2XHU2MzA5XHU1NTJGXHU0RTAwXHU1RjYyXHU3MkI2XHU1QjlBXHU0RjREXHVGRjFBXHU1QzQ1XHU0RTJEXHU2MzkyXHU3MjQ4ICsgXHU3NkY0XHU2M0E1XHU1QjUwXHU0RUUzXHU1NDJCXHU2NTg3XHU2NzJDIFwifFwiIFx1NzY4NFxuICogXHU1MjA2XHU5Njk0IHNwYW5cdUZGMENcdTU0N0RcdTRFMkRcdTU0MEVcdTYyOEFcdTVCOThcdTY1QjlcdTdDN0JcdTU0MERcdTUzOUZcdTY4MzdcdTUxOTlcdThGREJcdTY4MzdcdTVGMEZcdTg4NjhcdUZGMDhcdTdDQkVcdTUxQzZcdTUyMzBcdTY3ODRcdTVFRkFcdTU0QzhcdTVFMENcdUZGMDlcdTMwMDJcbiAqIEByZXR1cm5zIFx1NkNFOFx1NTE2NVx1NzY4NCBzdHlsZSBcdTUxNDNcdTdEMjBcdUZGMUJcdTVCOThcdTY1QjlcdTY3MkFcdTZFMzJcdTY3RDNcdTdFREZcdThCQTFcdTg4NENcdTY1RjZcdTRFM0EgdW5kZWZpbmVkXHUzMDAyXG4gKi9cbmNvbnN0IGFwcGx5U3RhdHNMaW5lQ2xhbXAgPSAoKTogSFRNTFN0eWxlRWxlbWVudCB8IHVuZGVmaW5lZCA9PiB7XG4gIGNvbnN0IHNlcFNwYW4gPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTFNwYW5FbGVtZW50PignZGl2W2NsYXNzKj1cIl9yb290XCJdID4gc3BhbltjbGFzcyo9XCJfc2VwXCJdJykpXG4gICAgLmZpbmQoKHNwYW4pID0+IHNwYW4udGV4dENvbnRlbnQgPT09ICd8JylcbiAgY29uc3Qgcm9vdERpdiA9IHNlcFNwYW4/LnBhcmVudEVsZW1lbnRcbiAgY29uc3QgaGFzaENsYXNzID0gcm9vdERpdj8uY2xhc3NOYW1lLnNwbGl0KC9cXHMrLykuZmluZCgobmFtZSkgPT4gbmFtZS5lbmRzV2l0aCgnX3Jvb3QnKSlcbiAgaWYgKHJvb3REaXYgPT09IHVuZGVmaW5lZCB8fCByb290RGl2ID09PSBudWxsIHx8IGhhc2hDbGFzcyA9PT0gdW5kZWZpbmVkIHx8IGdldENvbXB1dGVkU3R5bGUocm9vdERpdikudGV4dEFsaWduICE9PSAnY2VudGVyJykgcmV0dXJuIHVuZGVmaW5lZFxuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGUuaWQgPSAncGMtc3RhdHMtY2xhbXAnXG4gIHN0eWxlLnRleHRDb250ZW50ID0gYFxuZGl2W2NsYXNzPVwiJHtoYXNoQ2xhc3N9XCJdIHtcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gIC13ZWJraXQtbGluZS1jbGFtcDogMjtcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcbiAgdGV4dC1vdmVyZmxvdzogY2xpcDtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBsaW5lLWhlaWdodDogMS41O1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG5gXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpXG4gIHJldHVybiBzdHlsZVxufVxuXG50eXBlIFRhYktleSA9ICdjb21taXRzJyB8ICdvdmVydmlldycgfCAnZXhlY3V0aW9uJyB8ICdyZXZpZXcnIHwgJ25vdGVzJyB8ICdzZXR0aW5ncydcblxuZXhwb3J0IGludGVyZmFjZSBXb3Jrc3BhY2VGcmFtZVByb3BzIHtcbiAgLyoqIFx1NUI5OFx1NjVCOSBkZXRhaWxzIFx1NjlGRFx1NTk1MVx1N0VBNlx1NzY4NCBsb2NhbGUgXHU2Q0U4XHU1MTY1XHVGRjA4XHU2MjExXHU0RUVDXHU2Q0U4XHU1MThDXHU3Njg0IHByb2plY3QtY29udHJvbCBcdThCQ0RcdTUxNzhcdUZGMDlcdTMwMDIgKi9cbiAgdD86IChrZXk6IHN0cmluZykgPT4gc3RyaW5nXG4gIC8qKiBcdTVGNTNcdTUyNERcdTRGMUFcdThCREQgaWRcdUZGMDhcdTVCOThcdTY1Qjkgc2Vzc2lvbiBcdTY4MDdcdTUxQzZcdTVDNUVcdTYwMjdcdUZGMUJcdTUyMDdcdTYzNjJcdTRGMUFcdThCRERcdTY1RjZcdTkxQ0RcdTY1QjBcdTY0OTFcdTVGMDBcdTVERTVcdTRGNUNcdTUzRjBcdThGNjhcdTkwNTNcdUZGMDlcdTMwMDIgKi9cbiAgc2Vzc2lvbklkPzogc3RyaW5nXG4gIC8qKiBcdTY1QjBcdTcyNDhcdTVCQkZcdTRFM0JcdTc1MzFcdTU5MTZcdTVDNDJcdTUyQTBcdTZDRDVcdTZENkVcdTVDNDJcdTdCQTFcdTc0MDZcdTVFMDNcdTVDNDBcdUZGMENcdTRFMERcdTRGN0ZcdTc1MjhcdTY1RTdcdTcyNDggZGV0YWlscyBcdTYzNjJcdTUyMTdcdTMwMDIgKi9cbiAgbGF5b3V0TW9kZT86ICdsZWdhY3knIHwgJ292ZXJsYXknXG59XG5cbi8qKiBcdTVERTVcdTRGNUNcdTUzRjBcdTY1ODdcdTY4NDhcdThCQ0RcdTUxNzhcdUZGMDh6aCAvIGVuXHVGRjA5XHUzMDAyICovXG5leHBvcnQgY29uc3QgV09SS1NQQUNFX0RJQ1QgPSB7XG4gIHpoOiB7XG4gICAgJ3dvcmtzcGFjZS50aXRsZSc6ICdcdTk4NzlcdTc2RUVcdTY4MzhcdTY3RTVcdTUzRjAnLFxuICAgICd3b3Jrc3BhY2Uuc2VsZWN0U2Vzc2lvbic6ICdcdThCRjdcdTUxNDhcdTU3MjhcdTVERTZcdTRGQTdcdTkwMDlcdTYyRTlcdTk4NzlcdTc2RUVcdTRFMEJcdTc2ODRcdTRGMUFcdThCRERcdUZGMENcdTVERTVcdTRGNUNcdTUzRjBcdTYyNERcdTRGMUFcdTY2M0VcdTc5M0FcdThCRTVcdTk4NzlcdTc2RUVcdTc2ODRcdTY1NzBcdTYzNkVcdTMwMDInLFxuICAgICd0YWIuY29tbWl0cyc6ICdcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTUnLFxuICAgICd0YWIub3ZlcnZpZXcnOiAnXHU5ODc5XHU3NkVFXHU2MDNCXHU4OUM4JyxcbiAgICAndGFiLmV4ZWN1dGlvbic6ICdcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzMnLFxuICAgICd0YWIucmV2aWV3JzogJ1JldmlldyBcdTk1RUVcdTk4OTgnLFxuICAgICd0YWIubm90ZXMnOiAnXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2JyxcbiAgICAndGFiLnNldHRpbmdzJzogJ1x1OEJCRVx1N0Y2RScsXG4gICAgJ2Vycm9yLmxvYWQnOiAnXHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1JyxcbiAgICAnc3RhdGUucHJvamVjdCc6ICdcdTVGNTNcdTUyNERcdTk4NzlcdTc2RUUnLFxuICAgICdzdGF0ZS5ub1Byb2plY3QnOiAnXHU1QzFBXHU2NzJBXHU1MjFEXHU1OUNCXHU1MzE2XHU5ODc5XHU3NkVFJyxcbiAgICAnc3RhdGUubm9Qcm9qZWN0SGludCc6ICdcdTcwQjlcdTUxRkJcdTMwMENcdTUyMURcdTU5Q0JcdTUzMTZcdTk4NzlcdTc2RUVcdTMwMERcdTYyNkJcdTYzQ0ZcdTRFRDNcdTVFOTNcdTdFRDNcdTY3ODRcdTMwMDFcdTYyODBcdTY3MkZcdTY4MDhcdTRFMEVcdTdCMjZcdTUzRjdcdTdEMjJcdTVGMTVcdTMwMDInLFxuICAgICdhY3Rpb24uYm9vdHN0cmFwJzogJ1x1NTIxRFx1NTlDQlx1NTMxNlx1OTg3OVx1NzZFRScsXG4gICAgJ2FjdGlvbi5yZXNjYW4nOiAnXHU5MUNEXHU2NUIwXHU1MjFEXHU1OUNCXHU1MzE2IC8gXHU2MjZCXHU2M0NGJyxcbiAgICAnYWN0aW9uLmFuYWx5emUnOiAnXHU1MjA2XHU2NzkwXHU1RjUzXHU1MjREXHU2NTM5XHU1MkE4JyxcbiAgICAnYWN0aW9uLnJldmlldyc6ICdcdThCQzRcdTVCQTFcdTVGNTNcdTUyNERcdTY1MzlcdTUyQTgnLFxuICAgICdhY3Rpb24udmVyaWZ5JzogJ1x1OUE4Q1x1NjUzNlx1NUY1M1x1NTI0RFx1NjUzOVx1NTJBOCcsXG4gICAgJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnOiAnXHU2NUIwXHU1RUZBXHU1M0Q4XHU2NkY0JyxcbiAgICAnYWN0aW9uLnJ1bm5pbmcnOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHUyMDI2JyxcbiAgICAnYWN0aW9uLnJlZnJlc2gnOiAnXHU1MjM3XHU2NUIwJyxcbiAgICAnZm9ybS5jaGFuZ2VUaXRsZSc6ICdcdTUzRDhcdTY2RjRcdTY4MDdcdTk4OTgnLFxuICAgICdmb3JtLmNoYW5nZURlc2MnOiAnXHU5NzAwXHU2QzQyXHU0RTBFXHU4MENDXHU2NjZGXHVGRjA4XHU5MDA5XHU1ODZCXHVGRjA5JyxcbiAgICAncmVzdWx0LnBhbmVsJzogJ1x1NjRDRFx1NEY1Q1x1N0VEM1x1Njc5QycsXG5cbiAgICAncmVwby5zY2FuSGlzdG9yeSc6ICdcdTkxQ0RcdTVFRkFcdTUzODZcdTUzRjInLFxuICAgICdyZXBvLmNvbW1pdHMnOiAnXHU2M0QwXHU0RUE0JyxcbiAgICAncmVwby5icmFuY2gnOiAnXHU1MjA2XHU2NTJGJyxcbiAgICAncmVwby53b3JraW5nJzogJ1x1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOCcsXG4gICAgJ3JlcG8ud29ya2luZ0NsZWFuJzogJ1x1NURFNVx1NEY1Q1x1NTMzQVx1NUU3Mlx1NTFDMFx1RkYwQ1x1NjVFMFx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOCcsXG4gICAgJ3JlcG8uZW1wdHknOiAnXHU2NjgyXHU2NUUwXHU2M0QwXHU0RUE0XHUzMDAyJyxcbiAgICAncmVwby5sb2FkRmFpbGVkJzogJ1x1NjNEMFx1NEVBNFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNScsXG4gICAgJ3BpY2tlci50aXRsZSc6ICdcdTkwMDlcdTYyRTlcdTg5ODFcdTY4MzhcdTY3RTVcdTc2ODRcdTYzRDBcdTRFQTRcdUZGMDhcdTUzRUZcdTU5MUFcdTkwMDlcdUZGMDknLFxuICAgICdwaWNrZXIucGxhY2Vob2xkZXInOiAnXHU3MEI5XHU1MUZCXHU5MDA5XHU2MkU5XHU2M0QwXHU0RUE0XHVGRjA4XHU1M0VGXHU1OTFBXHU5MDA5XHVGRjBDXHU1NDJCXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4XHVGRjA5JyxcbiAgICAncGlja2VyLnNlbGVjdGVkJzogJ1x1NURGMlx1OTAwOScsXG4gICAgJ3BpY2tlci5maWx0ZXInOiAnXHU2MzA5XHU2ODA3XHU5ODk4L1x1NTRDOFx1NUUwQy9cdTRGNUNcdTgwMDVcdThGQzdcdTZFRTRcdTIwMjYnLFxuICAgICdwaWNrZXIuY2xlYXInOiAnXHU2RTA1XHU3QTdBJyxcbiAgICAncGlja2VyLm5vTWF0Y2gnOiAnXHU2NUUwXHU1MzM5XHU5MTREXHU2M0QwXHU0RUE0XHUzMDAyJyxcbiAgICAncGlja2VyLmhpbnQnOiAnXHU1MkZFXHU5MDA5XHU2M0QwXHU0RUE0XHU1NDBFXHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwIEFJIFx1ODlFM1x1OEJGQlx1RkYxQlx1NEUwQlx1NjVCOVx1NTNFRlx1NTE4RFx1OEREMVx1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNFx1NEUwRVx1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNVx1MzAwMicsXG4gICAgJ3BpY2tlci5yb3VuZCc6ICdcdTdCMkMge259IFx1OEY2RScsXG4gICAgJ3BpY2tlci5yb3VuZExhdGVzdCc6ICdcdTdCMkMge259IFx1OEY2RVx1RkYwOFx1NjcwMFx1NjVCMFx1RkYwOScsXG4gICAgJ3BpY2tlci5yb3VuZFNlbGVjdCc6ICdcdTkwMDlcdTY1NzRcdThGNkUnLFxuICAgICdwaWNrZXIucm91bmRDbGVhcic6ICdcdTUzRDZcdTZEODhcdTY3MkNcdThGNkUnLFxuICAgICdwaWNrZXIudW5kaWdlc3RlZCc6ICdcdTRFMEFcdTZCMjEgQUkgXHU2MDNCXHU3RUQzXHU0RTRCXHU1NDBFXHUzMDAxXHU0RTE0XHU1QzFBXHU2NzJBXHU3NTFGXHU2MjEwXHU4RkM3IEFJIFx1ODlFM1x1OEJGQlx1NzY4NFx1NjVCMFx1NjNEMFx1NEVBNCcsXG4gICAgJ3BpY2tlci51bmRpZ2VzdGVkQ291bnQnOiAne259IFx1NEUyQVx1NjNEMFx1NEVBNFx1NjcyQVx1NkQ4OFx1NTMxNicsXG4gICAgJ3BpY2tlci5zZWxlY3RBbGxVbmRpZ2VzdGVkJzogJ1x1NTE2OFx1OTAwOVx1NjcyQVx1NkQ4OFx1NTMxNicsXG4gICAgJ3BpY2tlci5kaWdlc3RBbGwnOiAnXHU0RTAwXHU5NTJFXHU2RDg4XHU1MzE2JyxcbiAgICAncGlja2VyLmRpZ2VzdEFsbEhpbnQnOiAnXHU5MDA5XHU0RTJEXHU1MTY4XHU5MEU4XHU2NzJBXHU2RDg4XHU1MzE2XHU2M0QwXHU0RUE0XHU1RTc2XHU2Mjc5XHU5MUNGIEFJIFx1ODlFM1x1OEJGQlx1RkYwOFx1NUU3Nlx1NTNEMSAzXHVGRjBDXHU2NzA5XHU3RjEzXHU1QjU4XHVGRjA5XHVGRjBDXHU1QjhDXHU2MjEwXHU1NDBFXHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwXHU2NTc0XHU0RjUzXHU1M0Q5XHU0RThCXHVGRjFCXHU0RTRCXHU1NDBFXHU1MjMwXHUzMDBDXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHUzMDBEXHU3NTFGXHU2MjEwXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzXHU1MzczXHU1M0VGXHU5MUNEXHU3RjZFXHU2NzJBXHU2RDg4XHU1MzE2XHU2ODA3XHU4QkIwJyxcbiAgICAnbmFycmF0aXZlLmRpZ2VzdEhpbnQnOiAnXHU2NTc0XHU0RjUzXHU1M0Q5XHU0RThCXHU1REYyXHU3NTFGXHU2MjEwXHUzMDAyXHU1MjMwXHUzMDBDXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHUzMDBEXHU5ODc1XHU3NTFGXHU2MjEwIEFJIFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1RkYwQ1x1NTM3M1x1NTNFRlx1OTFDRFx1N0Y2RVx1MzAwQ1x1NjcyQVx1NkQ4OFx1NTMxNlx1MzAwRFx1NjgwN1x1OEJCMFx1MzAwMicsXG4gICAgJ2ltcGFjdC5mYWN0b3JzJzogJ1x1OThDRVx1OTY2OVx1Njc4NFx1NjIxMFx1RkYwOFx1NEUzQVx1NEVDMFx1NEU0OFx1NjYyRlx1OEZEOVx1NEUyQVx1N0I0OVx1N0VBN1x1RkYwOScsXG4gICAgJ2ltcGFjdC5wb2ludHMnOiAnXHU1RjcxXHU1NENEXHU3MEI5XHU2NjBFXHU3RUM2JyxcbiAgICAnaW1wYWN0LmtleVBvaW50cyc6ICdcdTUxNzNcdTk1MkVcdTdFQzRcdTRFRjYnLFxuICAgICdpbXBhY3QubWVtb3J5JzogJ1x1N0VEM1x1NTQwOFx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNlx1NjgzOFx1NjdFNScsXG4gICAgJ2ltcGFjdC5mdW5jdGlvbnMnOiAnXHU1M0Q3XHU1RjcxXHU1NENEXHU1MUZEXHU2NTcwXHVGRjA4XHU4QzAxXHU4QzAzXHU3NTI4XHU0RTg2XHU4OEFCXHU2NTM5XHU3Njg0XHU0RUUzXHU3ODAxXHVGRjA5JyxcbiAgICAnaW1wYWN0LmZ1bmNSb2xlJzogJ1x1NTFGRFx1NjU3MFx1NTI5Rlx1ODBGRCcsXG4gICAgJ2ltcGFjdC5mdW5jQ2hhbmdlJzogJ1x1NjcyQ1x1NkIyMVx1NTNEOFx1NTMxNicsXG4gICAgJ2ltcGFjdC5mdW5jQ2FsbGVycyc6ICdcdTVCRjlcdThDMDNcdTc1MjhcdTY1QjlcdTc2ODRcdTVGNzFcdTU0Q0QnLFxuICAgICdjYWNoZS5oaXQnOiAnXHU2NzY1XHU4MUVBXHU3RjEzXHU1QjU4JyxcbiAgICAnY2FjaGUucmVnZW5lcmF0ZSc6ICdcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTAnLFxuICAgICdjb3N0LnRvb2x0aXAnOiAnXHU2NzJDXHU2QjIxIEFJIFx1OEMwM1x1NzUyOFx1NjIxMFx1NjcyQ1x1RkYwOFx1NEYzMFx1N0I5N1x1RkYwQ1x1NjMwOSBEZWVwU2VlayBcdTRFRjdcdTc2RUVcdTYyOThcdTdCOTdcdUZGMDknLFxuICAgICdleGVjLmNyZWF0ZSc6ICdcdTY1QjBcdTVFRkFcdTYyNjdcdTg4NEMnLFxuICAgICdleGVjLmZvcm1UaXRsZSc6ICdcdTg5ODFcdTUwNUFcdTRFQzBcdTRFNDhcdUZGMDhcdTRFMDBcdTUzRTVcdThCRERcdUZGMDknLFxuICAgICdleGVjLmZvcm1EZXNjJzogJ1x1OTcwMFx1NkM0Mlx1NEUwRVx1ODBDQ1x1NjY2Rlx1RkYxQVx1NzZFRVx1NjgwN1x1MzAwMVx1NkQ4OVx1NTNDQVx1NkEyMVx1NTc1N1x1MzAwMVx1OUE4Q1x1NjUzNlx1NjgwN1x1NTFDNicsXG4gICAgJ2V4ZWMuc3RhcnQnOiAnXHU1RjAwXHU1OUNCXHU2MjY3XHU4ODRDJyxcbiAgICAnZXhlYy5zdGFydGluZyc6ICdcdTZCNjNcdTU3MjhcdTU0MkZcdTUyQThcdTIwMjYnLFxuICAgICdleGVjLmNyZWF0ZUhpbnQnOiAnXHU1MjFCXHU1RUZBXHU1M0Q4XHU2NkY0XHU1RTc2XHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwXHU4QkExXHU1MjEyXHVGRjBDXHU5NjhGXHU1NDBFXHU3NTMxIEFJIFx1NUI1MFx1NEVFM1x1NzQwNlx1OTAxMFx1NkI2NVx1NjI2N1x1ODg0Q1x1RkYxQlx1OEZEQlx1NUVBNlx1NTcyOFx1NEUwQlx1NjVCOVx1NUI5RVx1NjVGNlx1NTIzN1x1NjVCMFx1RkYwQ1x1NjVFMFx1OTcwMFx1NTNCQlx1ODA0QVx1NTkyOVx1MzAwMicsXG4gICAgJ2V4ZWMubW9kZWxEZWZhdWx0JzogJ1x1NjI2N1x1ODg0Q1x1NkEyMVx1NTc4Qlx1RkYwOFx1ODlEMlx1ODI3Mlx1OUVEOFx1OEJBNFx1RkYxQVx1NTIwNlx1Njc5MC9cdTY0Q0RcdTRGNUM9XHU1RkVCXHVGRjBDXHU1RjAwXHU1M0QxPVx1NjgwN1x1NTFDNlx1RkYwQ1x1ODlDNFx1NTIxMj1cdTYzQThcdTc0MDZcdUZGMENcdTlBOENcdTY1MzY9XHU5QThDXHU2NTM2XHU3RUE3XHVGRjA5JyxcbiAgICAnYmFkZ2UucnVubmluZyc6ICd7bn0gXHU0RTJBXHU0RUZCXHU1MkExXHU4RkQwXHU4ODRDXHU0RTJEXHVGRjBDXHU3MEI5XHU1MUZCXHU2N0U1XHU3NzBCJyxcbiAgICAnbmFycmF0aXZlLnRpdGxlJzogJ1x1NURFNVx1NEY1Q1x1OEY2RVx1NkIyMVx1NTNEOVx1NEU4QicsXG4gICAgJ25hcnJhdGl2ZS5nZW5lcmF0ZSc6ICdcdTY1NzRcdTRGNTNcdTg5RTNcdThCRkJcdThGRDlcdThGNkVcdTVERTVcdTRGNUMnLFxuICAgICduYXJyYXRpdmUucnVubmluZyc6ICdcdTg5RTNcdThCRkJcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhcdTdFQTYgMTAtMzAgXHU3OUQyXHVGRjA5JyxcbiAgICAnYmFkZ2UuZmFpbGVkJzogJ3tufSBcdTRFMkFcdTRFRkJcdTUyQTFcdTk3MDBcdTg5ODFcdTU5MDRcdTc0MDZcdUZGMENcdTcwQjlcdTUxRkJcdTY3RTVcdTc3MEInLFxuICAgICdleGVjLmZsb3dDcmVhdGUnOiAnXHU1ODZCXHU1MTk5XHU0RUZCXHU1MkExJyxcbiAgICAnZXhlYy5mbG93T3JjaGVzdHJhdGUnOiAnXHU3ODZFXHU4QkE0XHU3RjE2XHU2MzkyXHVGRjA4XHU2QkNGXHU2QjY1XHU1M0VGXHU2NTM5XHU2QTIxXHU1NzhCL1x1ODlEMlx1ODI3Mi9cdTU5MzFcdThEMjVcdTdCNTZcdTc1NjVcdUZGMDknLFxuICAgICdleGVjLmZsb3dSdW4nOiAnXHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHVGRjA4UnVuIFx1OEJFNlx1NjBDNVx1NzcwQlx1OEZEQlx1NUVBNlx1NEUwRVx1NjIxMFx1NjcyQ1x1RkYwOScsXG4gICAgJ2V4ZWMuZmxvd01lbW9yeSc6ICdcdTgxRUFcdTUyQThcdTYzRDBcdTcwQkNcdThCQjBcdTVGQzZcdUZGMDhcdThCQjBcdTVGQzZcdTk3NjJcdTY3N0ZcdTc4NkVcdThCQTRcdUZGMDknLFxuICAgICdleGVjLnBsYW5uaW5nJzogJ1x1N0YxNlx1NjM5Mlx1NzUxRlx1NjIxMFx1NEUyRFx1MjAyNlx1RkYwOExMTSBcdTZCNjNcdTU3MjhcdTYyQzZcdTg5RTNcdTRFRkJcdTUyQTFcdUZGMENcdTdFQTYgMTAtMzAgXHU3OUQyXHVGRjA5JyxcbiAgICAnZXhlYy5jb2wuc3RlcHMnOiAnXHU2QjY1XHU5QUE0JyxcbiAgICAnbm90ZXMuZWRpdCc6ICdcdTdGMTZcdThGOTEnLFxuICAgICdub3Rlcy50b01lbW9yeSc6ICdcdThGNkNcdThCQjBcdTVGQzYnLFxuICAgICdub3Rlcy50b01lbW9yeUhpbnQnOiAnXHU2MjhBXHU4RkQ5XHU2NzYxXHU3QjE0XHU4QkIwXHU3Njg0XHU2ODA3XHU5ODk4XHU0RTBFXHU1MTg1XHU1QkI5XHU1ODZCXHU1MTY1XHU0RTBCXHU2NUI5XHU4QkIwXHU1RkM2XHU4ODY4XHU1MzU1XHVGRjBDXHU3ODZFXHU4QkE0XHU1NDBFXHU1MTY1XHU1RTkzJyxcbiAgICAnbm90ZXMudG9NZW1vcnlEb25lJzogJ1x1MjcxMyBcdTVERjJcdTU4NkJcdTUxNjVcdThCQjBcdTVGQzZcdTg4NjhcdTUzNTVcdUZGMDhcdTU3MjhcdTRFMEJcdTY1QjlcdTMwMENcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdTMwMERcdTUzM0FcdTc4NkVcdThCQTRcdTdDN0JcdTU3OEJcdTU0MEVcdTZERkJcdTUyQTBcdUZGMDknLFxuICAgICdub3Rlcy5jb3B5TWQnOiAnXHU1OTBEXHU1MjM2IE1EJyxcbiAgICAnbm90ZXMuY29weU1kSGludCc6ICdcdTYyOEFcdThGRDlcdTY3NjFcdTdCMTRcdThCQjBcdTU5MERcdTUyMzZcdTRFM0EgTWFya2Rvd24gXHU1MjMwXHU1MjZBXHU4RDM0XHU2NzdGJyxcbiAgICAnbm90ZXMuY29weU1kRG9uZSc6ICdcdTVERjJcdTU5MERcdTUyMzZcdTRFM0EgTWFya2Rvd24nLFxuICAgICdub3Rlcy5leHBvcnRNZCc6ICdcdTVCRkNcdTUxRkEgTUQnLFxuICAgICdub3Rlcy5leHBvcnRNZEhpbnQnOiAnXHU0RTBCXHU4RjdEXHU0RTNBIC5tZCBcdTY1ODdcdTRFRjYnLFxuICAgICdub3Rlcy5leHBvcnREb25lJzogJ1x1NURGMlx1NUJGQ1x1NTFGQVx1NEUzQSAubWQgXHU2NTg3XHU0RUY2JyxcbiAgICAnbm90ZXMuZGlnZXN0TmV2ZXInOiAnXHU1QzFBXHU2NzJBXHU3NTFGXHU2MjEwXHU4RkM3IEFJIFx1NjAzQlx1N0VEMycsXG4gICAgJ25vdGVzLmRpZ2VzdFBlbmRpbmcnOiAnXHU0RTBBXHU2QjIxXHU2MDNCXHU3RUQzXHU1NDBFXHU2NzA5IHtufSBcdTRFMkFcdTY1QjBcdTYzRDBcdTRFQTRcdTY3MkFcdTZEODhcdTUzMTYnLFxuICAgICdkZXRhaWwuc2F2ZU5vdGUnOiAnXHU1QjU4XHU0RTNBXHU3QjE0XHU4QkIwJyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlSGludCc6ICdcdTYyOEFcdTY3MkNcdTZCMjFcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdUZGMDhcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDgvXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxL1x1OThDRVx1OTY2OVx1NzBCOVx1RkYwOVx1NEUwMFx1OTUyRVx1NUI1OFx1NEUzQVx1N0VEM1x1Njc4NFx1NTMxNlx1N0IxNFx1OEJCMCcsXG4gICAgJ2RldGFpbC5zYXZlTm90ZVRpdGxlJzogJ1x1NjgzOFx1NjdFNVx1OEJCMFx1NUY1NScsXG4gICAgJ2RldGFpbC5zYXZlTWVtb3J5JzogJ1x1NkM4OVx1NkRDMFx1NEUzQVx1OEJCMFx1NUZDNicsXG4gICAgJ2RldGFpbC5zYXZlTWVtb3J5SGludCc6ICdcdTYyOEFcdTY3MkNcdTZCMjFcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdTZDODlcdTZEQzBcdTRFM0FcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdUZGMDhcdThGREJcdTUxNjVcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTdcdUZGMDknLFxuICAgICdub3Rlcy5zYXZlJzogJ1x1NEZERFx1NUI1OCcsXG4gICAgJ25vdGVzLmNhbmNlbCc6ICdcdTUzRDZcdTZEODgnLFxuICAgICdtZW1vcnkuYnJhbmNoU2NvcGUnOiAnXHU1MjA2XHU2NTJGJyxcbiAgICAnbWVtb3J5LmJyYW5jaEFsbCc6ICdcdTUxNjhcdTkwRThcdTUyMDZcdTY1MkYnLFxuICAgICdub3Rlcy5zZWFyY2gnOiAnXHU2NDFDXHU3RDIyXHU3QjE0XHU4QkIwXHUyMDI2JyxcbiAgICAnbW9kZWwudGl0bGUnOiAnXHU2QTIxXHU1NzhCXHU1MjA2XHU5MTREXHVGRjA4XHU4OUUzXHU4QkZCIC8gXHU2MDNCXHU3RUQzXHU3QjQ5XHU0RUZCXHU1MkExXHU3NTI4XHU1NEVBXHU0RTJBXHU2QTIxXHU1NzhCXHVGRjA5JyxcbiAgICAnbW9kZWwubG9hZGluZyc6ICdcdThCRkJcdTUzRDZcdTZBMjFcdTU3OEJcdTZFMDVcdTUzNTVcdTIwMjYnLFxuICAgICdtb2RlbC5mb2xsb3dDaGF0JzogJ1x1OERERlx1OTY4Rlx1ODA0QVx1NTkyOVx1NkEyMVx1NTc4QicsXG4gICAgJ21vZGVsLnNhdmUnOiAnXHU0RkREXHU1QjU4XHU1RTc2XHU3NTFGXHU2NTQ4JyxcbiAgICAnbW9kZWwuc2F2ZWQnOiAnXHU1REYyXHU3NTFGXHU2NTQ4JyxcbiAgICAnbW9kZWwuaGludCc6ICdcdTRGRERcdTVCNThcdTU0MEVcdTdBQ0JcdTUzNzNcdTc1MUZcdTY1NDhcdTVFNzZcdTYzMDFcdTRFNDVcdTUzMTZcdUZGMDhcdTkxQ0RcdTU0MkZcdTU0MEVcdTRGRERcdTc1NTlcdUZGMDlcdUZGMUJcdTRFMERcdTVGNzFcdTU0Q0RcdTgwNEFcdTU5MjlcdTZBMjFcdTU3OEJcdTMwMDInLFxuICAgICdub3Rlcy5haVN1bW1hcnknOiAnQUkgXHU2MDNCXHU3RUQzXHU3QjE0XHU4QkIwJyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5UnVuJzogJ1x1NjAzQlx1N0VEM1x1NzUxRlx1NjIxMFx1NEUyRFx1MjAyNlx1RkYwOFx1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxuICAgICdub3Rlcy5leHBhbmQnOiAnXHU1QzU1XHU1RjAwXHU1MTY4XHU2NTg3JyxcbiAgICAnbm90ZXMuY29sbGFwc2UnOiAnXHU2NTM2XHU4RDc3JyxcbiAgICAnbm90ZXMuc3VtbWFyeVRhZyc6ICdBSSBcdTYwM0JcdTdFRDMnLFxuICAgICdub3Rlcy5lbXB0eVNlYXJjaCc6ICdcdTY1RTBcdTUzMzlcdTkxNERcdTdCMTRcdThCQjBcdTMwMDInLFxuICAgICdub3Rlcy5jb250ZW50SGludCc6ICdcdTdCMTRcdThCQjBcdTUxODVcdTVCQjlcdUZGMDhcdTY1MkZcdTYzMDFcdTU5MUFcdTg4NENcdUZGMDlcdUZGMUFcdTdFRDNcdThCQkFcdTMwMDFcdTc1OTFcdTk1RUVcdTMwMDFcdTVCNjZcdTRFNjBcdTg5ODFcdTcwQjlcdTMwMDFcdTUxNzNcdTk1MkVcdTUxQjNcdTdCNTZcdTIwMjYnLFxuICAgICdub3Rlcy50YWdzSGludCc6ICdcdTY4MDdcdTdCN0VcdUZGMDhcdTkwMTdcdTUzRjdcdTUyMDZcdTk2OTRcdUZGMENcdTkwMDlcdTU4NkJcdUZGMUJcdTRGRERcdTVCNThcdTU0MEVcdTUzRUZcdTcwQjlcdTUxRkJcdTdCNUJcdTkwMDlcdUZGMDknLFxuICAgICdub3Rlcy5waW4nOiAnXHU3RjZFXHU5ODc2JyxcbiAgICAnbm90ZXMudW5waW4nOiAnXHU1M0Q2XHU2RDg4XHU3RjZFXHU5ODc2JyxcbiAgICAnbm90ZXMuZWRpdGVkQXQnOiAnXHU3RjE2XHU4RjkxXHU0RThFJyxcbiAgICAncmV2aWV3LmZpbHRlckFsbCc6ICdcdTUxNjhcdTkwRTgnLFxuICAgICdyZXZpZXcuc3RhdHVzQWxsJzogJ1x1NTE2OFx1OTBFOFx1NzJCNlx1NjAwMScsXG4gICAgJ3Jldmlldy52ZXJpZnknOiAnXHU1OTBEXHU2OEMwJyxcbiAgICAncmV2aWV3LnZlcmlmeVJ1bm5pbmcnOiAnXHU1OTBEXHU2OEMwXHU0RTJEXHUyMDI2JyxcbiAgICAncmV2aWV3LnZlcmlmeUhpbnQnOiAnXHU0RkVFXHU2NTM5XHU0RUUzXHU3ODAxXHU1NDBFXHU3MEI5XHU1MUZCXHVGRjFBXHU4MUVBXHU1MkE4XHU2OEMwXHU2RDRCXHU5NUVFXHU5ODk4XHU2NjJGXHU1NDI2XHU0RkVFXHU1OTBEXHUzMDAxXHU2NTM5XHU1MkE4XHU2NjJGXHU1NDI2XHU2NzAwXHU0RjE4L1x1NjcwMFx1NUMwRlx1NEZCNVx1NTE2NVx1MzAwMVx1NjcwOVx1NjVFMFx1NjVCMFx1OTVFRVx1OTg5OFx1RkYxQlx1NTE2OFx1OTBFOFx1OTAxQVx1OEZDN1x1NjI0RFx1ODFFQVx1NTJBOFx1N0Y2RVx1NEUzQVx1NURGMlx1ODlFM1x1NTFCMycsXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlJzogJ1x1NTIyNFx1NUI5QVx1OEJFRlx1NjJBNScsXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlSGludCc6ICdcdTRFQkFcdTVERTVcdTUyMjRcdTVCOUFcdThCRTVcdTk1RUVcdTk4OThcdTRFM0FcdThCRUZcdTYyQTVcdTVFNzZcdTUxNzNcdTk1RURcdUZGMDhcdTRFMEVcdTU5MERcdTY4QzBcdTg5RTNcdTUxQjNcdTc2ODRcdThCRURcdTRFNDlcdTRFMERcdTU0MENcdUZGMDknLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZVRpdGxlJzogJ1x1NTIyNFx1NUI5QVx1NEUzQVx1OEJFRlx1NjJBNVx1RkYxRicsXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlTXNnJzogJ1x1MzAwQ3t0aXRsZX1cdTMwMERcdTVDMDZcdTg4QUJcdTY4MDdcdThCQjBcdTRFM0FcdThCRUZcdTYyQTVcdUZGMDhcdTVERjJcdTYyRDJcdTdFRERcdUZGMDlcdTVFNzZcdTRFQ0VcdTVGODVcdTU5MDRcdTc0MDZcdTRFMkRcdTc5RkJcdTk2NjRcdTMwMDInLFxuICAgICdyZXZpZXcuZml4RGV0YWlsJzogJ1x1NEZFRVx1NTkwRFx1OEJFNlx1NjBDNScsXG4gICAgJ3Jldmlldy5maXhTdGF0RmlsZXMnOiAnXHU2NTg3XHU0RUY2JyxcbiAgICAncmV2aWV3LmZpeEZpbGVzJzogJ1x1NEZFRVx1NTkwRFx1NkQ4OVx1NTNDQVx1NjU4N1x1NEVGNicsXG4gICAgJ3Jldmlldy5maXhJbXBhY3QnOiAnXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHVGRjA4XHU2NTM5XHU1MkE4XHU3QjI2XHU1M0Y3XHU0RTBFXHU4QzAzXHU3NTI4XHU3MEI5XHVGRjA5JyxcbiAgICAncmV2aWV3LmRlZmluZWRJbic6ICdcdTVCOUFcdTRFNDlcdTRFOEUnLFxuICAgICdyZXZpZXcuY2FsbENvdW50JzogJ1x1NTkwNFx1OEMwM1x1NzUyOCcsXG4gICAgJ3Jldmlldy5maXhEaWZmJzogJ1x1NEZFRVx1NTkwRFx1NURFRVx1NUYwMlx1RkYwOFx1NzZGOFx1NUJGOVx1OEJDNFx1NUJBMVx1NTdGQVx1N0VCRlx1RkYwOScsXG4gICAgJ3Jldmlldy5yZWZyZXNoJzogJ1x1NTIzN1x1NjVCMCcsXG4gICAgJ3Jldmlldy5yZXRlbnRpb25IaW50JzogJ1x1NURGMlx1ODlFM1x1NTFCMy9cdThCRUZcdTYyQTVcdTk1RUVcdTk4OThcdTRGRERcdTc1NTkge2RheXN9IFx1NTkyOVx1NTQwRVx1ODFFQVx1NTJBOFx1NkUwNVx1NzQwNicsXG4gICAgJ3Jldmlldy50YXJnZXQnOiAnXHU1QkY5XHU4QzYxJyxcbiAgICAncmV2aWV3LndvcmtpbmdUYXJnZXQnOiAnXHU1REU1XHU0RjVDXHU1MzNBJyxcbiAgICAncmV2aWV3LmV4cG9ydE1kJzogJ1x1NUJGQ1x1NTFGQSBNRCcsXG4gICAgJ3Jldmlldy5leHBvcnRNZEhpbnQnOiAnXHU2MjhBXHU1RjUzXHU1MjREXHU3QjVCXHU5MDA5XHU0RTBCXHU3Njg0XHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHU0RTBCXHU4RjdEXHU0RTNBIC5tZCBcdTY1ODdcdTRFRjYnLFxuICAgICdyZXZpZXcuZXhwb3J0RW1wdHknOiAnXHU2Q0ExXHU2NzA5XHU1M0VGXHU1QkZDXHU1MUZBXHU3Njg0XHU5NUVFXHU5ODk4JyxcbiAgICAncmV2aWV3LnNlbGVjdEFsbCc6ICdcdTUxNjhcdTkwMDknLFxuICAgICdyZXZpZXcuY2hlY2tlZENvdW50JzogJ1x1NURGMlx1OTAwOSB7bn0gXHU2NzYxJyxcbiAgICAncmV2aWV3Lm1hcmtIYW5kbGVkJzogJ1x1NjgwN1x1OEJCMFx1NURGMlx1NTkwNFx1NzQwNicsXG4gICAgJ3Jldmlldy5iYXRjaFZlcmlmeSc6ICdcdTYyNzlcdTkxQ0ZcdTU5MERcdTY4QzAnLFxuICAgICdyZXZpZXcuYmF0Y2hWZXJpZnlDb25maXJtVGl0bGUnOiAnXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwXHVGRjFGJyxcbiAgICAncmV2aWV3LmJhdGNoVmVyaWZ5Q29uZmlybU1zZyc6ICdcdTVDMDZcdTVCRjkge259IFx1NEUyQVx1OEJDNFx1NUJBMVx1NzZFRVx1NjgwN1x1OTAxMFx1NEUwMFx1NTkwRFx1NjhDMFx1RkYwOFx1NEUzMlx1ODg0QyBMTE0gXHU4QzAzXHU3NTI4XHVGRjBDXHU2QkNGXHU0RTJBXHU3NkVFXHU2ODA3XHU3RUE2IDEwLTYwIFx1NzlEMlx1RkYwQ1x1NEYxQVx1NkQ4OFx1ODAxN1x1NkEyMVx1NTc4Qlx1NzUyOFx1OTFDRlx1RkYwOVx1RkYxQlx1NTNFRlx1OTY4Rlx1NjVGNlx1NTA1Q1x1NkI2Mlx1MzAwMicsXG4gICAgJ3Jldmlldy5iYXRjaFN0b3AnOiAnXHU1MDVDXHU2QjYyJyxcbiAgICAncmV2aWV3LmJhdGNoUHJvZ3Jlc3MnOiAnXHU2Mjc5XHU5MUNGXHU1OTBEXHU2OEMwXHU0RTJEIHtpfS97bn0nLFxuICAgICdyZXZpZXcuYmF0Y2hEb25lJzogJ1x1NjI3OVx1OTFDRlx1NTkwRFx1NjhDMFx1NUI4Q1x1NjIxMFx1RkYxQVx1ODlFM1x1NTFCMyB7YX0gXHU2NzYxIFx1MDBCNyBcdTRFQ0RcdTVGODVcdTU5MDRcdTc0MDYge2J9IFx1Njc2MSBcdTAwQjcgXHU2NUIwXHU5NUVFXHU5ODk4IHtjfSBcdTY3NjEgXHUwMEI3IFx1NTkzMVx1OEQyNSB7ZH0gXHU0RTJBXHU3NkVFXHU2ODA3JyxcbiAgICAncmV2aWV3LmJhdGNoU3RvcHBlZCc6ICdcdTYyNzlcdTkxQ0ZcdTU5MERcdTY4QzBcdTVERjJcdTUwNUNcdTZCNjInLFxuICAgICdyZXZpZXcudHJpYWdlJzogJ1x1RDgzRVx1RERGOSBcdTY1NzRcdTRGNTNcdTUyMDZcdThCQ0EnLFxuICAgICdyZXZpZXcudHJpYWdlSGludCc6ICdMTE0gXHU2NTc0XHU0RjUzXHU2MjZCXHU2M0NGXHU1MTY4XHU5MEU4XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHVGRjFBXHU1MjI0XHU5MUNEXHU1OTBEL1x1OEZDN1x1NjVGNi9cdTRFMERcdTYyMTBcdTdBQ0JcdTUzNzNcdTY1RjZcdTUxNzNcdTk1RURcdUZGMDhcdTVFMjZcdTRGOURcdTYzNkVcdUZGMENcdTUzRUZcdTRFQkFcdTVERTVcdTkxQ0RcdTVGMDBcdTU5MERcdTY4MzhcdUZGMDlcdUZGMENcdTc3MUZcdTk1RUVcdTk4OThcdTc1NTlcdTRFMEJcdTUxOERcdTZEM0VcdTUzRDFcdTRGRUVcdTU5MEQnLFxuICAgICdyZXZpZXcudHJpYWdlQ29uZmlybVRpdGxlJzogJ1x1NjU3NFx1NEY1M1x1NTIwNlx1OEJDQVx1RkYxRicsXG4gICAgJ3Jldmlldy50cmlhZ2VDb25maXJtTXNnJzogJ1x1NUMwNlx1NzUyOCBMTE0gXHU1MjA2XHU2Mjc5XHU2MjZCXHU2M0NGXHU1MTY4XHU5MEU4XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHVGRjA4XHU2QkNGXHU2Mjc5XHU2NzAwXHU1OTFBIHtufSBcdTY3NjFcdUZGMENcdTZEODhcdTgwMTdcdTZBMjFcdTU3OEJcdTc1MjhcdTkxQ0ZcdUZGMDlcdTMwMDJcdTUyMjRcdTRFM0FcdTkxQ0RcdTU5MEQvXHU4RkM3XHU2NUY2L1x1NEUwRFx1NjIxMFx1N0FDQlx1NzY4NFx1OTVFRVx1OTg5OFx1NEYxQVx1MzAxMFx1N0FDQlx1NTM3M1x1NTE3M1x1OTVFRFx1MzAxMVx1NUU3Nlx1NkNFOFx1NjYwRVx1NEY5RFx1NjM2RVx1MjAxNFx1MjAxNFx1NTE2OFx1OTBFOFx1NTNFRlx1NTcyOFx1OTVFRVx1OTg5OFx1NTM2MVx1NTkwRFx1NjgzOFx1OTFDRFx1NUYwMFx1MzAwMlx1NzU1OVx1NEUwQlx1NzY4NFx1NzcxRlx1OTVFRVx1OTg5OFx1NTE4RFx1OEQ3MFx1NkQzRVx1NTNEMVx1NEZFRVx1NTkwRFx1MzAwMicsXG4gICAgJ3Jldmlldy50cmlhZ2VQcm9ncmVzcyc6ICdcdTUyMDZcdThCQ0FcdTRFMkRcdUZGMUFcdTVERjJcdTU5MDRcdTc0MDYge259IFx1Njc2MVx1RkYwQ1x1NTI2OVx1NEY1OVx1N0VBNiB7bX0gXHU2NzYxJyxcbiAgICAncmV2aWV3LnRyaWFnZVN0b3AnOiAnXHU1MDVDXHU2QjYyJyxcbiAgICAncmV2aWV3LnRyaWFnZURvbmUnOiAnXHU1MjA2XHU4QkNBXHU1QjhDXHU2MjEwXHVGRjFBXHU1MTczXHU5NUVEIFx1OTFDRFx1NTkwRCB7YX0gXHUwMEI3IFx1OEZDN1x1NjVGNiB7Yn0gXHUwMEI3IFx1NEUwRFx1NUI1OFx1NTcyOCB7Y31cdUZGMUJcdTRGRERcdTc1NTkge2R9IFx1Njc2MVx1NUY4NVx1NTkwNFx1NzQwNicsXG4gICAgJ3Jldmlldy50cmlhZ2VTdG9wcGVkJzogJ1x1NTIwNlx1OEJDQVx1NURGMlx1NTA1Q1x1NkI2Mlx1RkYwOFx1NURGMlx1NTIyNFx1NUI5QVx1NzY4NFx1NEUwRFx1NEYxQVx1OTFDRFx1NTkwRFx1NkQ4OFx1ODAxN1x1RkYwQ1x1NTNFRlx1NTE4RFx1NkIyMVx1NzBCOVx1NTFGQlx1N0VFN1x1N0VFRFx1RkYwOScsXG4gICAgJ3Jldmlldy50cmlhZ2VQYXJzZUZhaWwnOiAnXHVGRjFCXHU2NzA5XHU0RTAwXHU2Mjc5XHU4RjkzXHU1MUZBXHU4OUUzXHU2NzkwXHU1OTMxXHU4RDI1XHU1REYyXHU2MzA5XHU0RkREXHU3NTU5XHU1OTA0XHU3NDA2XHVGRjBDXHU1M0VGXHU5MUNEXHU4QkQ1JyxcbiAgICAncmV2aWV3LmhhbmRsZWREb25lJzogJ1x1NURGMlx1NjI4QSB7bn0gXHU2NzYxXHU5NUVFXHU5ODk4XHU2ODA3XHU4QkIwXHU0RTNBXHU1REYyXHU1OTA0XHU3NDA2JyxcbiAgICAnZml4LnBsYW4nOiAnXHU0RkVFXHU1OTBEXHU2NUI5XHU2ODQ4JyxcbiAgICAnZml4LnBsYW5BcHByb2FjaCc6ICdcdTY1QjlcdTY4NDgnLFxuICAgICdmaXgucGxhbkltcGFjdCc6ICdcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjQnLFxuICAgICdmaXgucGxhbkJlbmVmaXQnOiAnXHU2NTM2XHU3NkNBJyxcbiAgICAnZml4LnBsYW5SaXNrJzogJ1x1OThDRVx1OTY2OScsXG4gICAgJ2ZpeC5kaXNwYXRjaCc6ICdcdTZEM0VcdTUzRDFcdTRGRUVcdTU5MEQnLFxuICAgICdmaXguZGlzcGF0Y2hIaW50TWFpbic6ICdcdTYyOEFcdTUyRkVcdTkwMDlcdTc2ODRcdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdUZGMDhcdTY3MkFcdTUyRkVcdTkwMDk9XHU1RjUzXHU1MjREXHU3QjVCXHU5MDA5XHU0RTBCXHU1MTY4XHU5MEU4XHVGRjA5XHU2RDNFXHU1M0QxXHU3RUQ5XHU1QjUwIEFnZW50IFx1NUU3Nlx1NTNEMVx1NTkwNFx1NzQwNlx1RkYxQVx1NzZGNFx1NjNBNVx1NEZFRVx1NTkwRD1cdTRFMDlcdTkwNTNcdTk1RjhcdTUyMjRcdTVCOUErXHU0RkVFXHU1OTBEK1x1NTZERVx1NTE5OStcdTYzRDBcdTRFQTRcdTUxNjhcdTgxRUFcdTUyQThcdUZGMUJcdTUxNDhcdTUxRkFcdTY1QjlcdTY4NDg9XHU1M0VBXHU4QkZCXHU1MjA2XHU2NzkwXHU0RUE3XHU1MUZBXHU3RUQzXHU2Nzg0XHU1MzE2XHU2NUI5XHU2ODQ4XHVGRjBDXHU2Mjc5XHU1MUM2XHU1NDBFXHU1MThEXHU2RDNFXHU1M0QxXHU2MjY3XHU4ODRDJyxcbiAgICAnZml4LmRpc3BhdGNoTW9kZVRpdGxlJzogJ1x1NkQzRVx1NTNEMVx1NEZFRVx1NTkwRFx1MjAxNFx1MjAxNFx1OTAwOVx1NjJFOVx1NkEyMVx1NUYwRicsXG4gICAgJ2ZpeC5kaXNwYXRjaE1vZGVNc2cnOiAnXHU1QzA2XHU2RDNFXHU1M0QxIHtufSBcdTY3NjFcdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdTdFRDlcdTVCNTAgQWdlbnQgXHU1RTc2XHU1M0QxXHU1OTA0XHU3NDA2XHVGRjA4XHU2QkNGXHU0RUZCXHU1MkExXHU3MkVDXHU3QUNCIHdvcmt0cmVlXHVGRjBDXHU2RDg4XHU4MDE3XHU2QTIxXHU1NzhCXHU3NTI4XHU5MUNGXHVGRjBDXHU0RTBEXHU1MzYwXHU3NTI4XHU4MDRBXHU1OTI5XHU3QTk3XHU1M0UzXHVGRjA5XHUzMDAyXHUyNkExIFx1NzZGNFx1NjNBNVx1NEZFRVx1NTkwRFx1RkYxQVx1NEUwOVx1OTA1M1x1OTVGOFx1NTIyNFx1NUI5QSArIFx1NEZFRVx1NTkwRCArIFx1NTZERVx1NTE5OSArIFx1NjNEMFx1NEVBNFx1NTE2OFx1ODFFQVx1NTJBOFx1RkYwQ1x1OEJFRlx1NjJBNS9cdTkxQ0RcdTU5MEQvXHU4RkM3XHU2NUY2XHU0RjFBXHU4MUVBXHU1MkE4XHU1MTczXHU5NUVEXHUzMDAyXHVEODNEXHVEQ0NCIFx1NTE0OFx1NTFGQVx1NjVCOVx1Njg0OFx1RkYxQVx1NTNFQVx1OEJGQlx1NTIwNlx1Njc5MFx1NEVBN1x1NTFGQVx1N0VEM1x1Njc4NFx1NTMxNlx1NjVCOVx1Njg0OFx1RkYwQ1x1NEUwRFx1NjUzOVx1NEVGQlx1NEY1NVx1NEVFM1x1NzgwMVx1RkYxQlx1NEY2MFx1NTcyOFx1OTVFRVx1OTg5OFx1NTM2MVx1NzY4NFx1NjVCOVx1Njg0OFx1NTc1N1x1NjI3OVx1NTFDNlx1NTQwRVx1NzBCOVx1MzAwQ1x1NkQzRVx1NTNEMVx1NUY4NVx1NUJBMVx1NjVCOVx1Njg0OFx1MzAwRFx1NjI2N1x1ODg0Q1x1MzAwMicsXG4gICAgJ2ZpeC5kaXNwYXRjaEF1dG8nOiAnXHUyNkExIFx1NzZGNFx1NjNBNVx1NEZFRVx1NTkwRCcsXG4gICAgJ2ZpeC5kaXNwYXRjaFBsYW4nOiAnXHVEODNEXHVEQ0NCIFx1NTE0OFx1NTFGQVx1NjVCOVx1Njg0OCcsXG4gICAgJ2ZpeC5kaXNwYXRjaE5vT3Blbic6ICdcdTVGNTNcdTUyNERcdTdCNUJcdTkwMDlcdTRFMEJcdTZDQTFcdTY3MDlcdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdTUzRUZcdTZEM0VcdTUzRDEnLFxuICAgICdmaXguZGlzcGF0Y2hQbGFucyc6ICdcdTZEM0VcdTUzRDFcdTVGODVcdTVCQTFcdTY1QjlcdTY4NDgnLFxuICAgICdmaXguZGlzcGF0Y2hQbGFuc0hpbnQnOiAnXHU2MjhBXHU1REYyXHU0RUE3XHU1MUZBXHU3Njg0XHU1Rjg1XHU4QkM0XHU1QkExXHU2NUI5XHU2ODQ4XHU2RDNFXHU1M0QxXHU3RUQ5XHU1QjUwIEFnZW50IFx1NUU3Nlx1NTNEMVx1NjI2N1x1ODg0Q1x1NEZFRVx1NTkwRFx1RkYwOFx1NkJDRlx1NEVGQlx1NTJBMVx1NzJFQ1x1N0FDQiB3b3JrdHJlZVx1RkYwQ1x1NTQwOFx1NUU3Nlx1NTFCMlx1N0E4MVx1ODFFQVx1NTJBOFx1NTdGQVx1NEU4RVx1NjcwMFx1NjVCMFx1NEVFM1x1NzgwMVx1OTFDRFx1NTA1QVx1RkYwOScsXG4gICAgJ2ZpeC5kaXNwYXRjaERvbmUnOiAnXHU1REYyXHU2RDNFXHU1M0QxIHtufSBcdTRFMkFcdTRGRUVcdTU5MERcdTRFRkJcdTUyQTFcdUZGMDhcdTVFNzZcdTUzRDEge2N9XHVGRjA5JyxcbiAgICAnZml4LmRpc3BhdGNoRW1wdHknOiAnXHU2Q0ExXHU2NzA5XHU1M0VGXHU2RDNFXHU1M0QxXHU3Njg0XHU0RUZCXHU1MkExXHVGRjA4XHU1MkZFXHU5MDA5XHU1Rjg1XHU1OTA0XHU3NDA2XHU5NUVFXHU5ODk4XHU2MjE2XHU3QjQ5XHU1Rjg1XHU2NUI5XHU2ODQ4XHU0RUE3XHU1MUZBXHVGRjA5JyxcbiAgICAnZml4LnN0YXR1cyc6ICdcdTRGRUVcdTU5MERcdTYyNjdcdTg4NEMnLFxuICAgICdmaXguc3RvcCc6ICdcdTUwNUNcdTZCNjInLFxuICAgICdmaXguc3RvcERvbmUnOiAnXHU1REYyXHU1MDVDXHU2QjYyIHtufSBcdTRFMkFcdTRGRUVcdTU5MERcdTRFRkJcdTUyQTEnLFxuICAgICdmaXgudGFza1F1ZXVlZCc6ICdcdTYzOTJcdTk2MUZcdTRFMkQnLFxuICAgICdmaXgudGFza1J1bm5pbmcnOiAnXHU4RkQwXHU4ODRDXHU0RTJEJyxcbiAgICAnZml4LnRhc2tNZXJnaW5nJzogJ1x1NTQwOFx1NUU3Nlx1NEUyRCcsXG4gICAgJ2ZpeC50YXNrUmVkbyc6ICdcdTkxQ0RcdTUwNUFcdTRFMkQnLFxuICAgICdmaXgudGFza0RvbmUnOiAnXHU1REYyXHU1QjhDXHU2MjEwJyxcbiAgICAnZml4LnRhc2tDb25mbGljdCc6ICdcdTUxQjJcdTdBODEnLFxuICAgICdmaXgudGFza0ZhaWxlZCc6ICdcdTU5MzFcdThEMjUnLFxuICAgICdmaXgudGFza0NhbmNlbGxlZCc6ICdcdTVERjJcdTUwNUNcdTZCNjInLFxuICAgICdmaXguYXR0ZW1wdCc6ICdcdTdCMkMge259IFx1NkIyMScsXG4gICAgJ2ZpeC5tb2RlbFRpdGxlJzogJ1x1NEZFRVx1NTkwRFx1NUU3Nlx1NTNEMVx1RkYwOFx1NUI1MCBBZ2VudCBcdTZDNjBcdUZGMDknLFxuICAgICdmaXgubW9kZWxIaW50JzogJ1x1NTQwQ1x1NjVGNlx1NjI2N1x1ODg0Q1x1NzY4NFx1NEZFRVx1NTkwRFx1NUI1MCBBZ2VudCBcdTRFMEFcdTk2NTBcdUZGMDgxLTEwXHVGRjA5XHUzMDAyXHU2QkNGXHU0RUZCXHU1MkExXHU3MkVDXHU3QUNCIHdvcmt0cmVlIFx1NEU5Mlx1NEUwRFx1NUU3Mlx1NjI3MFx1RkYxQlx1NEZFRVx1NjUzOVx1NTQwRVx1N0FDQlx1NTM3M1x1NzUxRlx1NjU0OFx1MzAwMicsXG5cbiAgICAncGxhbi50aXRsZSc6ICdcdTdGMTZcdTYzOTJcdThCQTFcdTUyMTJcdTc4NkVcdThCQTQnLFxuICAgICdwbGFuLmhpbnQnOiAnXHU2QkNGXHU2QjY1XHU3Njg0XHU4OUQyXHU4MjcyXHU1MUIzXHU1QjlBXHU0RTBBXHU0RTBCXHU2NTg3XHU2Q0U4XHU1MTY1XHU0RTBFXHU5RUQ4XHU4QkE0XHU2QTIxXHU1NzhCXHVGRjA4XHU1MjA2XHU2NzkwL1x1NjRDRFx1NEY1Qz1mYXN0XHVGRjBDXHU1RjAwXHU1M0QxPXN0YW5kYXJkXHVGRjBDXHU4OUM0XHU1MjEyPXJlYXNvbmluZ1x1RkYwQ1x1OUE4Q1x1NjUzNj12ZXJpZmllclx1RkYwOVx1RkYxQlx1NTNFRlx1OEMwM1x1NjU3NFx1NTQwRVx1NTE4RFx1NTQyRlx1NTJBOFx1MzAwMicsXG4gICAgJ3BsYW4uY29sLnN0ZXAnOiAnXHU2QjY1XHU5QUE0JywgJ3BsYW4uY29sLnJvbGUnOiAnXHU4OUQyXHU4MjcyJywgJ3BsYW4uY29sLm1vZGVsJzogJ1x1NkEyMVx1NTc4QicsICdwbGFuLmNvbC5wb2xpY3knOiAnXHU1OTMxXHU4RDI1XHU3QjU2XHU3NTY1JywgJ3BsYW4uY29sLmVuYWJsZWQnOiAnXHU1NDJGXHU3NTI4JywgJ3BsYW4uY29sLmF0dGVtcHRzJzogJ1x1NUMxRFx1OEJENScsXG4gICAgJ3BsYW4ubW9kZWxEZWZhdWx0JzogJ1x1OERERlx1OTY4Rlx1ODlEMlx1ODI3Mlx1OUVEOFx1OEJBNCcsXG4gICAgJ3BsYW4ubGF1bmNoRWRpdGVkJzogJ1x1NEZERFx1NUI1OFx1NEZFRVx1NjUzOVx1NUU3Nlx1NTQyRlx1NTJBOCcsXG4gICAgJ3BsYW4ubGF1bmNoRGlyZWN0JzogJ1x1NjMwOVx1NTM5Rlx1OEJBMVx1NTIxMlx1NTQyRlx1NTJBOCcsXG4gICAgJ3BsYW4uZGlzY2FyZCc6ICdcdTY1M0VcdTVGMDMnLFxuICAgICdwbGFuLnZpZXdEZXRhaWwnOiAnXHU4QkU2XHU2MEM1JywgJ3BsYW4ucmVmcmVzaERldGFpbCc6ICdcdTUyMzdcdTY1QjAnLCAncGxhbi5jbG9zZURldGFpbCc6ICdcdTY1MzZcdThENzcnLFxuICAgICdwbGFuLmRldGFpbFRpdGxlJzogJ1J1biBcdThCRTZcdTYwQzUnLFxuICAgICdwbGFuLnBhdXNlZEJhbm5lcic6ICdcdTRFRkJcdTUyQTFcdTVERjJcdTY2ODJcdTUwNUNcdUZGMENcdTdCNDlcdTVGODVcdTRGNjBcdTc2ODRcdTUxQjNcdTdCNTYnLFxuICAgICdwbGFuLnJlc3VtZVJldHJ5JzogJ1x1OTFDRFx1OEJENVx1OEJFNVx1NkI2NVx1OUFBNFx1NUU3Nlx1N0VFN1x1N0VFRCcsXG4gICAgJ3BsYW4ucmVzdW1lU2tpcCc6ICdcdThERjNcdThGQzdcdThCRTVcdTZCNjVcdTlBQTRcdTdFRTdcdTdFRUQnLFxuICAgICdwbGFuLnJlc3VtZUZhaWxlZCc6ICdcdTRFQ0VcdTU5MzFcdThEMjVcdTU5MDRcdTYwNjJcdTU5MEQnLFxuICAgICdwbGFuLmNvbnRleHRUaXRsZSc6ICdcdTRFRkJcdTUyQTFcdTRFMEFcdTRFMEJcdTY1ODdcdUZGMDhcdTY3MkMgUnVuIFx1NkNFOFx1NTE2NVx1NEU4Nlx1NEVDMFx1NEU0OFx1RkYwOScsXG4gICAgJ3BsYW4uYnJhbmNoJzogJ1x1NTIwNlx1NjUyRicsICdwbGFuLmluamVjdGVkTWVtb3JpZXMnOiAnXHU2Q0U4XHU1MTY1XHU4QkIwXHU1RkM2JywgJ3BsYW4uZGVjaXNpb25Mb2cnOiAnXHU1MUIzXHU3QjU2XHU2NUU1XHU1RkQ3JyxcbiAgICAnZXhlYy5jb2wuZGV0YWlsJzogJ1x1OEJFNlx1NjBDNScsXG5cbiAgICAnc2NoZWQudGl0bGUnOiAnXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExJyxcbiAgICAnc2NoZWQuZm9ybU5hbWUnOiAnXHU0RUZCXHU1MkExXHU1NDBEXHU3OUYwJywgJ3NjaGVkLmZvcm1JbnRlcnZhbCc6ICdcdTk1RjRcdTk2OTRcdUZGMDhcdTUyMDZcdTk0OUZcdUZGMDknLFxuICAgICdzY2hlZC50eXBlUmV2aWV3JzogJ1x1ODFFQVx1NTJBOFx1OEJDNFx1NUJBMScsICdzY2hlZC50eXBlU3VtbWFyeSc6ICdBSSBcdTYwM0JcdTdFRDMnLCAnc2NoZWQudHlwZVJ1bic6ICdcdTVCOUFcdTY1RjZcdTYyNjdcdTg4NEMnLFxuICAgICdzY2hlZC5hZGQnOiAnXHU1MjFCXHU1RUZBJyxcbiAgICAnc2NoZWQuaGludCc6ICdcdTUyMzBcdTcwQjlcdTgxRUFcdTUyQThcdTYyNjdcdTg4NENcdUZGMUFcdTgxRUFcdTUyQThcdThCQzRcdTVCQTE9XHU4QkM0XHU1QkExXHU4RkQxIDI0IFx1NUMwRlx1NjVGNlx1NzY4NFx1NjVCMFx1NjNEMFx1NEVBNFx1RkYwOFx1OTVFRVx1OTg5OFx1OEZEQiBSZXZpZXcgXHU5NzYyXHU2NzdGXHVGRjA5XHVGRjFCQUkgXHU2MDNCXHU3RUQzPVx1NzUxRlx1NjIxMFx1NTg5RVx1OTFDRlx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1RkYxQlx1NUI5QVx1NjVGNlx1NjI2N1x1ODg0Qz1cdTYzMDlcdTZBMjFcdTY3N0ZcdThERDFcdTRFMDBcdTZCMjFcdTdGMTZcdTYzOTJcdTRFRkJcdTUyQTFcdTMwMDJcdTY3MDBcdTVDMEYgMSBcdTUyMDZcdTk0OUZcdTMwMDInLFxuICAgICdzY2hlZC5lbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdTMwMDInLFxuICAgICdzY2hlZC5jb2wubmFtZSc6ICdcdTU0MERcdTc5RjAnLCAnc2NoZWQuY29sLnR5cGUnOiAnXHU3QzdCXHU1NzhCJywgJ3NjaGVkLmNvbC5pbnRlcnZhbCc6ICdcdTU0NjhcdTY3MUYnLCAnc2NoZWQuY29sLm5leHQnOiAnXHU0RTBCXHU2QjIxXHU2MjY3XHU4ODRDJywgJ3NjaGVkLmNvbC5sYXN0UmVzdWx0JzogJ1x1NEUwQVx1NkIyMVx1N0VEM1x1Njc5QycsICdzY2hlZC5jb2wuYWN0aW9ucyc6ICdcdTY0Q0RcdTRGNUMnLFxuICAgICdzY2hlZC5kYXknOiAnIFx1NTkyOScsICdzY2hlZC5ob3VyJzogJyBcdTVDMEZcdTY1RjYnLCAnc2NoZWQubWludXRlJzogJyBcdTUyMDZcdTk0OUYnLFxuICAgICdzY2hlZC5kaXNhYmxlJzogJ1x1NjY4Mlx1NTA1QycsICdzY2hlZC5lbmFibGUnOiAnXHU1NDJGXHU3NTI4JywgJ3NjaGVkLnJ1bk5vdyc6ICdcdTdBQ0JcdTUzNzNcdTYyNjdcdTg4NEMnLFxuXG4gICAgJ21lbW9yeS56b25lVGl0bGUnOiAnXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2JyxcbiAgICAnbWVtb3J5LnN5bmNCYXNlbGluZSc6ICdcdTU0MENcdTZCNjVcdTU3RkFcdTdFQkYnLCAnbWVtb3J5LnN5bmNOb25lJzogJ1x1NjcyQVx1NTQwQ1x1NkI2NScsXG4gICAgJ21lbW9yeS5iZWhpbmQnOiAnXHU4NDNEXHU1NDBFIHtufSBcdTRFMkFcdTYzRDBcdTRFQTRcdTY3MkFcdTU0MENcdTZCNjUnLFxuICAgICdtZW1vcnkuc3luYyc6ICdcdTU0MENcdTZCNjVcdThCQjBcdTVGQzYnLCAnbWVtb3J5LnN5bmNpbmcnOiAnXHU1NDBDXHU2QjY1XHU0RTJEXHUyMDI2JywgJ21lbW9yeS5zeW5jRmFpbGVkJzogJ1x1NTQwQ1x1NkI2NVx1NTkzMVx1OEQyNScsXG4gICAgJ21lbW9yeS5zdGFsZVRpdGxlJzogJ1x1NzU5MVx1NEYzQ1x1OEZDN1x1NjVGNlx1RkYwOFx1NzZGOFx1NTE3M1x1NEVFM1x1NzgwMVx1NURGMlx1ODhBQlx1NjUzOVx1NTJBOFx1RkYwQ1x1NUY4NVx1NEY2MFx1NTkwRFx1NjgzOFx1RkYwOScsXG4gICAgJ21lbW9yeS5tYXJrU3RhbGUnOiAnXHU2ODA3XHU4QkIwXHU4RkM3XHU2NUY2JywgJ21lbW9yeS5hcmNoaXZlQnRuJzogJ1x1NUY1Mlx1Njg2MycsICdtZW1vcnkua2VlcEFjdGl2ZSc6ICdcdTRFQ0RcdTY3MDlcdTY1NDgnLFxuICAgICdtZW1vcnkubmV3Q2FuZGlkYXRlcyc6ICdcdTY1QjBcdTU4OUVcdTUwMTlcdTkwMDlcdUZGMDhcdTVERjJcdTUxNjVcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTdcdUZGMDlcdUZGMUEnLFxuICAgICdtZW1vcnkuY2xvc2VSZXBvcnQnOiAnXHU1MTczXHU5NUVEXHU2MkE1XHU1NDRBJyxcbiAgICAnbWVtb3J5LnNjb3BlUHJvamVjdCc6ICdcdTRFM0JcdTVFNzJcdUZGMDhcdTUxNjhcdTUyMDZcdTY1MkZcdUZGMDknLCAnbWVtb3J5LnNjb3BlQnJhbmNoJzogJ1x1NEVDNVx1NUY1M1x1NTI0RFx1NTIwNlx1NjUyRicsXG4gICAgJ21lbW9yeS5wZW5kaW5nUXVldWUnOiAnXHU1Rjg1XHU3ODZFXHU4QkE0XHU5NjFGXHU1MjE3JyxcbiAgICAnbWVtb3J5LnRvTm90ZSc6ICdcdThGNkNcdTdCMTRcdThCQjAnLCAnbWVtb3J5Lm5vcm1hbGl6ZSc6ICdcdTVGNTJcdTRFMDBcdTUyMzBcdTRFM0JcdTVFNzInLCAnbWVtb3J5LnJlc3RvcmUnOiAnXHU2MDYyXHU1OTBEJyxcbiAgICAnbWVtb3J5LnN0YXR1c1N0YWxlJzogJ1x1NzU5MVx1NEYzQ1x1OEZDN1x1NjVGNicsXG4gICAgJ2ltcGFjdC5mdW5jdGlvbnNOb25lJzogJ1x1NjcyQVx1OEJDNlx1NTIyQlx1NTFGQVx1NTFGRFx1NjU3MFx1N0VBN1x1OEMwM1x1NzUyOFx1NTNEOFx1NTMxNlx1RkYwOFx1NTNFRlx1ODBGRFx1NjYyRlx1NjgzN1x1NUYwRi9cdTk3NTlcdTYwMDFcdThENDRcdTZFOTAvXHU3RUFGXHU5MTREXHU3RjZFXHU2NTM5XHU1MkE4XHVGRjA5XHUzMDAyJyxcbiAgICAncmV2aWV3LmNvbC5zZXZlcml0eSc6ICdcdTdFQTdcdTUyMkInLFxuICAgICdyZXZpZXcuY29sLmNhdGVnb3J5JzogJ1x1N0M3Qlx1NTIyQicsXG4gICAgJ3Jldmlldy5jb2wudGl0bGUnOiAnXHU5NUVFXHU5ODk4JyxcbiAgICAncmV2aWV3LmNvbC5ldmlkZW5jZSc6ICdcdTRGNERcdTdGNkUnLFxuICAgICdyZXZpZXcuY29sLmZpeCc6ICdcdTVFRkFcdThCQUVcdTRGRUVcdTU5MEQnLFxuICAgICdyZXZpZXcuaGludCc6ICdcdTcwQjlcdTUxRkJcdTRFMEFcdTY1QjlcdTYzMDlcdTk0QUVcdTVGMDBcdTU5Q0JcdTY4MzhcdTY3RTVcdUZGMENcdTRFQTdcdTUxRkFcdTY3MDBcdTRGMThcdTYwMjdcdTdFRDNcdThCQkFcdTRFMEVcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTMwMDInLFxuICAgICdkaWZmLnNob3cnOiAnXHU1QkY5XHU2QkQ0JyxcbiAgICAnZGlmZi5oaWRlJzogJ1x1NjUzNlx1OEQ3N1x1NURFRVx1NUYwMicsXG5cbiAgICAnZGV0YWlsLnRpdGxlJzogJ1x1NjgzOFx1NjdFNVx1OEJFNlx1NjBDNScsXG4gICAgJ2RldGFpbC5waWNrJzogJ1x1MjE5MCBcdTRFQ0VcdTVERTZcdTRGQTdcdTkwMDlcdTYyRTlcdTRFMDBcdTZCMjFcdTYzRDBcdTRFQTRcdUZGMDhcdTYyMTZcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQThcdUZGMDlcdTVGMDBcdTU5Q0JcdTY4MzhcdTY3RTUnLFxuICAgICdkZXRhaWwud2hhdCc6ICdcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDgnLFxuICAgICdkZXRhaWwubG9naWMnOiAnXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxJyxcbiAgICAnZGV0YWlsLnJpc2snOiAnXHU5OENFXHU5NjY5XHU3MEI5JyxcbiAgICAnZGV0YWlsLmZpbGVzJzogJ1x1NjU4N1x1NEVGNlx1NkUwNVx1NTM1NScsXG4gICAgJ2RldGFpbC5wYXRjaCc6ICdcdTY3RTVcdTc3MEJcdTg4NjVcdTRFMDFcdTUzOUZcdTY1ODcnLFxuICAgICdkZXRhaWwuYWlMb2FkaW5nJzogJ0FJIFx1ODlFM1x1OEJGQlx1NzUxRlx1NjIxMFx1NEUyRFx1MjAyNlx1RkYwOFx1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxuICAgICdkZXRhaWwucXVldWVkJzogJ1x1OEZEOFx1NjcwOSB7bn0gXHU0RTJBXHU4OUUzXHU4QkZCXHU2MzkyXHU5NjFGXHU0RTJEXHVGRjA4XHU4MUVBXHU1MkE4XHU1RTc2XHU1M0QxXHU2MjY3XHU4ODRDXHVGRjA5JyxcbiAgICAnZGV0YWlsLmNhcmRRdWV1ZWQnOiAnXHU2MzkyXHU5NjFGXHU3QjQ5XHU1Rjg1IEFJIFx1ODlFM1x1OEJGQlx1RkYwOFx1NUU3Nlx1NTNEMVx1NEUwQVx1OTY1MCAzXHVGRjBDXHU5MDdGXHU1MTREXHU2MjUzXHU2RUUxXHU2QTIxXHU1NzhCXHU3RjUxXHU1MTczXHVGRjA5JyxcbiAgICAnZGV0YWlsLmltcGFjdCc6ICdcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdTUyMDZcdTY3OTAnLFxuICAgICdkZXRhaWwuaW1wYWN0TG9hZGluZyc6ICdcdTVGNzFcdTU0Q0RcdTYyNkJcdTYzQ0ZcdTRFMkRcdTIwMjZcdUZGMDhcdTVGMTVcdTc1MjhcdTY4QzBcdTdEMjIgKyBcdTU2RkVcdThDMzFcdTRGMjBcdTY0QURcdUZGMDknLFxuICAgICdkZXRhaWwub3B0aW1hbGl0eSc6ICdcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTUnLFxuICAgICdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnOiAnXHU4QkM0XHU1QkExXHU0RTJEXHUyMDI2XHVGRjA4XHU0RjFBXHU0RUE3XHU1MUZBXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHU0RTBFXHU2NzAwXHU0RjE4XHU2MDI3XHU3RUQzXHU4QkJBXHVGRjA5JyxcblxuICAgICdpbXBhY3Qucmlzayc6ICdcdTk4Q0VcdTk2NjknLFxuICAgICdpbXBhY3QuY29sLmNoYW5nZWQnOiAnXHU1M0Q4XHU2NkY0XHU2NTg3XHU0RUY2JyxcbiAgICAnaW1wYWN0LmNvbC5pbmRpcmVjdCc6ICdcdTk1RjRcdTYzQTVcdTVGNzFcdTU0Q0RcdUZGMDhcdTVGMTVcdTc1MjhcdTk0RkVcdUZGMDknLFxuICAgICdpbXBhY3QuY29sLnBvdGVudGlhbCc6ICdcdTZGNUNcdTU3MjhcdTVGNzFcdTU0Q0QnLFxuICAgICdpbXBhY3Qubm9uZSc6ICdcdTY3MkFcdTUzRDFcdTczQjBcdTRFRDNcdTVFOTNcdTUxODVcdTVGMTVcdTc1MjhcdTgwMDVcdUZGMDhcdTY1MzlcdTUyQThcdTc3MEJcdTRGM0NcdTcyRUNcdTdBQ0JcdUZGMDlcdTMwMDInLFxuICAgICdpbXBhY3QudGVzdHMnOiAnXHU1MTczXHU4MDU0XHU2RDRCXHU4QkQ1JyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5jaGFuZ2VkJzogJ1x1NTNEOFx1NjZGNCcsXG4gICAgJ2ltcGFjdC5sZWdlbmQuaW5kaXJlY3QnOiAnXHU5NUY0XHU2M0E1JyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5wb3RlbnRpYWwnOiAnXHU2RjVDXHU1NzI4JyxcblxuICAgICdyZXZpZXcudmVyZGljdCc6ICdcdTY3MDBcdTRGMThcdTYwMjdcdTdFRDNcdThCQkEnLFxuICAgICdyZXZpZXcuaXNzdWVzJzogJ1x1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NScsXG4gICAgJ3Jldmlldy5jbGVhbic6ICdcdTY3MkFcdTUzRDFcdTczQjBcdTk1RUVcdTk4OThcdTMwMDInLFxuXG4gICAgJ25vdGVzLnRpdGxlJzogJ1x1NjgzOFx1NjdFNVx1N0IxNFx1OEJCMCcsXG4gICAgJ25vdGVzLmZvcm1UaXRsZSc6ICdcdTdCMTRcdThCQjBcdTY4MDdcdTk4OTgnLFxuICAgICdub3Rlcy5mb3JtQ29udGVudCc6ICdcdTdCMTRcdThCQjBcdTUxODVcdTVCQjlcdUZGMDhcdTdFRDNcdThCQkFcdTMwMDFcdTc1OTFcdTk1RUVcdTMwMDFcdTVCNjZcdTRFNjBcdTg5ODFcdTcwQjlcdTIwMjZcdUZGMDknLFxuICAgICdub3Rlcy5hZGQnOiAnXHU2REZCXHU1MkEwXHU3QjE0XHU4QkIwJyxcbiAgICAnbm90ZXMuYm91bmRUbyc6ICdcdTVDMDZcdTUxNzNcdTgwNTRcdTUyMzAnLFxuICAgICdub3Rlcy5jb2wudGltZSc6ICdcdTY1RjZcdTk1RjQnLFxuICAgICdub3Rlcy5jb2wudGl0bGUnOiAnXHU2ODA3XHU5ODk4JyxcbiAgICAnbm90ZXMuY29sLmNvbnRlbnQnOiAnXHU1MTg1XHU1QkI5JyxcbiAgICAnbm90ZXMuY29sLnNoYSc6ICdcdTUxNzNcdTgwNTRcdTYzRDBcdTRFQTQnLFxuICAgICdub3Rlcy5yZW1vdmUnOiAnXHU1MjIwXHU5NjY0JyxcbiAgICAnbm90ZXMuZW1wdHknOiAnXHU4RkQ4XHU2Q0ExXHU2NzA5XHU3QjE0XHU4QkIwXHUzMDAyXHU2ODM4XHU2N0U1XHU2M0QwXHU0RUE0XHU2NUY2XHU5NjhGXHU2MjRCXHU4QkIwXHU0RTBCXHU3RUQzXHU4QkJBXHU0RTBFXHU3NTkxXHU5NUVFXHVGRjBDXHU1QzMxXHU2NjJGXHU0RjYwXHU3Njg0XHU5ODc5XHU3NkVFXHU1QjY2XHU0RTYwXHU2ODYzXHU2ODQ4XHUzMDAyJyxcblxuICAgICdtZW1vcnkucmVjb3JkJzogJ1x1OEJCMFx1NUY1NVx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNicsXG4gICAgJ2Zvcm0ubWVtb3J5VGl0bGUnOiAnXHU4QkIwXHU1RkM2XHU2ODA3XHU5ODk4JyxcbiAgICAnZm9ybS5tZW1vcnlDb250ZW50JzogJ1x1OEJCMFx1NUZDNlx1NTE4NVx1NUJCOVx1RkYwOFx1NEVDMFx1NEU0OFx1NEUwRVx1NEUzQVx1NEVDMFx1NEU0OFx1RkYwOScsXG4gICAgJ21lbW9yeS5jb2wudGl0bGUnOiAnXHU2NzYxXHU3NkVFJyxcbiAgICAnbWVtb3J5LmNvbC50eXBlJzogJ1x1N0M3Qlx1NTc4QicsXG4gICAgJ21lbW9yeS5jb2wudHJ1dGgnOiAnXHU3NzFGXHU1MDNDJyxcbiAgICAnbWVtb3J5LmNvbC5icmFuY2gnOiAnXHU1MjA2XHU2NTJGJyxcbiAgICAnbWVtb3J5LmNvbmZpcm0nOiAnXHU3ODZFXHU4QkE0JyxcbiAgICAnbWVtb3J5LmVtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNlx1MzAwMlx1NTNFRlx1NTcyOFx1ODA0QVx1NTkyOVx1NEUyRFx1OEJBOSBBSSBcdThCQjBcdTVGNTVcdUZGMENcdTYyMTZcdTU3MjhcdTRFMEFcdTY1QjlcdTYyNEJcdTUyQThcdTZERkJcdTUyQTBcdTMwMDInLFxuICAgICdjb25jZXB0cy50aXRsZSc6ICdcdTVCNjZcdTRFNjBcdTY5ODJcdTVGRjUnLFxuICAgICdjb25jZXB0cy5ub25lJzogJ1x1NjY4Mlx1NjVFMFx1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNVx1MzAwMlx1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDM1x1OEREMVx1NUI4Q1x1NTNEOFx1NjZGNFx1NTQwRVx1ODFFQVx1NTJBOFx1NkM4OVx1NkRDMFx1RkYwQ1x1NEU1Rlx1NTNFRlx1NTcyOFx1ODA0QVx1NTkyOVx1NEUyRFx1OEJBOSBBSSBcdTYwM0JcdTdFRDNcdTVCNjZcdTRFNjBcdTg5ODFcdTcwQjlcdTMwMDInLFxuICAgICdjb25jZXB0cy5jb2wubmFtZSc6ICdcdTY5ODJcdTVGRjUnLFxuICAgICdjb25jZXB0cy5jb2wuY2F0ZWdvcnknOiAnXHU3QzdCXHU1MjJCJyxcbiAgICAnY29uY2VwdHMuY29sLmNvdW50JzogJ1x1NkIyMVx1NjU3MCcsXG4gICAgJ3Jldmlldy5yZWNvcmRzVGl0bGUnOiAnUmV2aWV3IFx1OTVFRVx1OTg5OCcsXG4gICAgJ3Jldmlldy5yZWNvcmRzRW1wdHknOiAnXHU2NjgyXHU2NUUwXHU5NUVFXHU5ODk4XHU4QkIwXHU1RjU1XHUzMDAyXHU2M0QwXHU0RUE0XHU1QkExXHU2N0U1XHU5ODc1XHU4QkM0XHU1QkExXHU1MUZBXHU3Njg0XHU5NUVFXHU5ODk4XHU0RjFBXHU4MUVBXHU1MkE4XHU3NjdCXHU4QkIwXHU1MjMwXHU4RkQ5XHU5MUNDXHVGRjFCXHU5MUNEXHU2NUIwXHU4QkM0XHU1QkExXHU0RjFBXHU2NkZGXHU2MzYyXHU2NUU3XHU4QkIwXHU1RjU1XHUzMDAyJyxcbiAgICAndmVyaWZ5LnJlY29yZHMnOiAnXHU5QThDXHU2NTM2XHU4QkIwXHU1RjU1JyxcbiAgICAndmVyaWZ5LnJlY29yZHNFbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTlBOENcdTY1MzZcdThCQjBcdTVGNTVcdTMwMDJcdTU3MjhcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdTcwQjlcdTMwMENcdTlBOENcdTY1MzZcdTMwMERcdTUzNzNcdTc1MUZcdTYyMTBcdTMwMDInLFxuXG4gICAgJ2NvbmZpcm1lZC50aXRsZSc6ICdcdTVERjJcdTc4NkVcdTVCOUFcdTdFQTZcdTY3NUZcdUZGMDhcdTRFQkFcdTVERTVcdTc4NkVcdThCQTRcdUZGMENBSSBcdTc5ODFcdTY1MzlcdTgxRUFcdTUyQThcdTYyRTZcdTYyMkFcdUZGMDknLFxuICAgICdjb25maXJtZWQuYWRkJzogJ1x1NkRGQlx1NTJBMFx1N0VBNlx1Njc1RicsXG4gICAgJ2NvbmZpcm1lZC50ZXh0JzogJ1x1N0VBNlx1Njc1Ri9cdTk3MDBcdTZDNDJcdTUxODVcdTVCQjknLFxuICAgICdjb25maXJtZWQucGF0aHMnOiAnXHU3OTgxXHU2NTM5XHU4REVGXHU1Rjg0XHVGRjA4XHU5MDE3XHU1M0Y3XHU1MjA2XHU5Njk0XHVGRjFCXHU3NkY4XHU1QkY5XHU5ODc5XHU3NkVFXHU2ODM5XHU1OTgyIHNyYy9jb3JlXHVGRjBDXHU2MjE2XHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHVGRjA5JyxcbiAgICAnY29uZmlybWVkLm5vbmUnOiAnXHU2NjgyXHU2NUUwXHU3RUE2XHU2NzVGXHUzMDAyXHU2REZCXHU1MkEwXHU1NDBFXHVGRjBDQUkgXHU0RkVFXHU2NTM5XHU2NzJDXHU5ODc5XHU3NkVFXHU3Njg0XHU3OTgxXHU2NTM5XHU4REVGXHU1Rjg0XHU1QzA2XHU4OEFCXHU4MUVBXHU1MkE4XHU2MkQyXHU3RUREXHVGRjA4XHU0RUM1XHU1QkY5XHU2NzJDXHU5ODc5XHU3NkVFXHU3NTFGXHU2NTQ4XHVGRjA5XHUzMDAyJyxcblxuICAgICdjaGFuZ2VzLnRpdGxlJzogJ1x1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMScsXG4gICAgJ3N0YXRlLm5vQ2hhbmdlcyc6ICdcdTY2ODJcdTY1RTBcdTUzRDhcdTY2RjRcdTRFRkJcdTUyQTFcdTMwMDJcdTU3MjhcdTgwNEFcdTU5MjlcdTRFMkRcdThCQTkgQUkgXHU1MjFCXHU1RUZBXHVGRjBDXHU2MjE2XHU3NTI4XHU0RTBBXHU2NUI5XHUzMDBDXHU2NUIwXHU1RUZBXHU1M0Q4XHU2NkY0XHUzMDBEXHUzMDAyJyxcbiAgICAnY2hhbmdlcy5jb2wudGl0bGUnOiAnXHU2ODA3XHU5ODk4JyxcbiAgICAnY2hhbmdlcy5jb2wudHlwZSc6ICdcdTdDN0JcdTU3OEInLFxuICAgICdjaGFuZ2VzLmNvbC5zdGF0dXMnOiAnXHU3MkI2XHU2MDAxJyxcbiAgICAnY2hhbmdlcy5jb2wudXBkYXRlZCc6ICdcdTY2RjRcdTY1QjBcdTY1RjZcdTk1RjQnLFxuICAgICdleGVjLmNvbC5zdGF0dXMnOiAnXHU3MkI2XHU2MDAxJyxcbiAgICAnZXhlYy5jb2wuY2hhbmdlJzogJ1x1NTNEOFx1NjZGNCcsXG4gICAgJ2V4ZWMuY29sLnN0YXJ0ZWQnOiAnXHU1RjAwXHU1OUNCJyxcbiAgICAnZXhlYy5jb2wuY29zdCc6ICdcdTYyMTBcdTY3MkMoXHU0RjMwKScsXG4gICAgJ2V4ZWMuYXR0ZW1wdHMnOiAnXHU1QzFEXHU4QkQ1XHU2QjIxXHU2NTcwJyxcbiAgICAnZXhlYy5oaW50JzogJ1x1NjI2N1x1ODg0Q1x1RkYwOHN0YXJ0X3J1blx1RkYwOVx1OEJGN1x1NTcyOFx1NTNGM1x1NEZBN1x1ODA0QVx1NTkyOVx1NEUyRFx1NTNEMVx1OEQ3N1x1RkYxQVx1NTIxQlx1NUVGQVx1OEJBMVx1NTIxMlx1NTQwRVx1NUJGOSBBSSBcdThCRjRcdTMwMENcdTVGMDBcdTU5Q0JcdTYyNjdcdTg4NENcdThCRTUgY2hhbmdlXHUzMDBEXHUzMDAyXHU2NzJDXHU5ODc1XHU2N0U1XHU3NzBCXHU4RkRCXHU1RUE2XHU0RTBFXHU3RUQzXHU2NzlDXHUzMDAyJyxcbiAgICAnc3RhdGUubm9SdW5zJzogJ1x1NjY4Mlx1NjVFMFx1NjI2N1x1ODg0Q1x1OEJCMFx1NUY1NVx1MzAwMicsXG4gICAgJ3N0YXRlLnRlY2hTdGFjayc6ICdcdTYyODBcdTY3MkZcdTY4MDgnLFxuICAgICdzdGF0ZS5zeW1ib2xzJzogJ1x1NURGMlx1N0QyMlx1NUYxNVx1N0IyNlx1NTNGNycsXG4gICAgJ3N0YXRlLm1hbmlmZXN0cyc6ICdcdTZFMDVcdTUzNTVcdTY1ODdcdTRFRjYnLFxuICAgICdzdGF0ZS5ldmlkZW5jZSc6ICdcdThCQzFcdTYzNkVcdTY3NjFcdTc2RUUnLFxuICB9LFxuICBlbjoge1xuICAgICd3b3Jrc3BhY2UudGl0bGUnOiAnUmV2aWV3IERlc2snLFxuICAgICd3b3Jrc3BhY2Uuc2VsZWN0U2Vzc2lvbic6ICdTZWxlY3QgYSBzZXNzaW9uIHVuZGVyIGEgd29ya3NwYWNlIG9uIHRoZSBsZWZ0IHRvIHZpZXcgaXRzIHByb2plY3QgZGF0YS4nLFxuICAgICd0YWIuY29tbWl0cyc6ICdDb21taXQgUmV2aWV3JyxcbiAgICAndGFiLm92ZXJ2aWV3JzogJ092ZXJ2aWV3JyxcbiAgICAndGFiLmV4ZWN1dGlvbic6ICdFeGVjdXRpb24nLFxuICAgICd0YWIucmV2aWV3JzogJ1JldmlldyBpc3N1ZXMnLFxuICAgICd0YWIubm90ZXMnOiAnTm90ZXMgJiBNZW1vcnknLFxuICAgICd0YWIuc2V0dGluZ3MnOiAnU2V0dGluZ3MnLFxuICAgICdlcnJvci5sb2FkJzogJ0ZhaWxlZCB0byBsb2FkJyxcbiAgICAnc3RhdGUucHJvamVjdCc6ICdDdXJyZW50IHByb2plY3QnLFxuICAgICdzdGF0ZS5ub1Byb2plY3QnOiAnTm8gcHJvamVjdCBpbml0aWFsaXplZCcsXG4gICAgJ3N0YXRlLm5vUHJvamVjdEhpbnQnOiAnUnVuIFwiSW5pdGlhbGl6ZSBwcm9qZWN0XCIgdG8gc2NhbiB0aGUgcmVwb3NpdG9yeSBzdHJ1Y3R1cmUsIHRlY2ggc3RhY2ssIGFuZCBzeW1ib2wgaW5kZXguJyxcbiAgICAnYWN0aW9uLmJvb3RzdHJhcCc6ICdJbml0aWFsaXplIHByb2plY3QnLFxuICAgICdhY3Rpb24ucmVzY2FuJzogJ1JlLWluaXRpYWxpemUgLyBzY2FuJyxcbiAgICAnYWN0aW9uLmFuYWx5emUnOiAnQW5hbHl6ZSB3b3JraW5nIGRpZmYnLFxuICAgICdhY3Rpb24ucmV2aWV3JzogJ1JldmlldyB3b3JraW5nIGRpZmYnLFxuICAgICdhY3Rpb24udmVyaWZ5JzogJ1ZlcmlmeSB3b3JraW5nIGRpZmYnLFxuICAgICdhY3Rpb24uY3JlYXRlQ2hhbmdlJzogJ0NyZWF0ZSBjaGFuZ2UnLFxuICAgICdhY3Rpb24ucnVubmluZyc6ICdSdW5uaW5nXHUyMDI2JyxcbiAgICAnYWN0aW9uLnJlZnJlc2gnOiAnUmVmcmVzaCcsXG4gICAgJ2Zvcm0uY2hhbmdlVGl0bGUnOiAnQ2hhbmdlIHRpdGxlJyxcbiAgICAnZm9ybS5jaGFuZ2VEZXNjJzogJ1JlcXVpcmVtZW50IGFuZCBiYWNrZ3JvdW5kIChvcHRpb25hbCknLFxuICAgICdyZXN1bHQucGFuZWwnOiAnQWN0aW9uIHJlc3VsdCcsXG5cbiAgICAncmVwby5hZGQnOiAnQWRkIHJlcG8nLFxuICAgICdyZXBvLmFkZEhpbnQnOiAnRW50ZXIgYW4gYWJzb2x1dGUgcmVwbyBwYXRoIGFuZCBwcmVzcyBFbnRlcjsgcHJldmlvdXNseSB1c2VkIHJlcG9zIGFyZSByZW1lbWJlcmVkJyxcbiAgICAncmVwby5zY2FuSGlzdG9yeSc6ICdSZWJ1aWxkIGhpc3RvcnknLFxuICAgICdyZXBvLmNvbW1pdHMnOiAnY29tbWl0cycsXG4gICAgJ3JlcG8uYnJhbmNoJzogJ2JyYW5jaCcsXG4gICAgJ3JlcG8ud29ya2luZyc6ICdVbmNvbW1pdHRlZCBjaGFuZ2VzJyxcbiAgICAncmVwby53b3JraW5nQ2xlYW4nOiAnV29ya2luZyB0cmVlIGlzIGNsZWFuJyxcbiAgICAncmVwby5lbXB0eSc6ICdObyBjb21taXRzLicsXG4gICAgJ3JlcG8ubG9hZEZhaWxlZCc6ICdGYWlsZWQgdG8gbG9hZCBjb21taXRzJyxcbiAgICAncGlja2VyLnRpdGxlJzogJ1BpY2sgY29tbWl0cyB0byByZXZpZXcgKG11bHRpLXNlbGVjdCknLFxuICAgICdwaWNrZXIucGxhY2Vob2xkZXInOiAnQ2xpY2sgdG8gcGljayBjb21taXRzIChtdWx0aS1zZWxlY3QsIGluY2x1ZGVzIHVuY29tbWl0dGVkKScsXG4gICAgJ3BpY2tlci5zZWxlY3RlZCc6ICdTZWxlY3RlZCcsXG4gICAgJ3BpY2tlci5maWx0ZXInOiAnRmlsdGVyIGJ5IHRpdGxlL2hhc2gvYXV0aG9yXHUyMDI2JyxcbiAgICAncGlja2VyLmNsZWFyJzogJ0NsZWFyJyxcbiAgICAncGlja2VyLm5vTWF0Y2gnOiAnTm8gbWF0Y2hpbmcgY29tbWl0LicsXG4gICAgJ3BpY2tlci5oaW50JzogJ0NoZWNraW5nIGEgY29tbWl0IGdlbmVyYXRlcyBpdHMgQUkgZXhwbGFuYXRpb247IHJ1biBpbXBhY3QgYW5kIG9wdGltYWxpdHkgYmVsb3cuJyxcbiAgICAncGlja2VyLnJvdW5kJzogJ1JvdW5kIHtufScsXG4gICAgJ3BpY2tlci5yb3VuZExhdGVzdCc6ICdSb3VuZCB7bn0gKGxhdGVzdCknLFxuICAgICdwaWNrZXIucm91bmRTZWxlY3QnOiAnU2VsZWN0IHJvdW5kJyxcbiAgICAncGlja2VyLnJvdW5kQ2xlYXInOiAnQ2xlYXIgcm91bmQnLFxuICAgICdwaWNrZXIudW5kaWdlc3RlZCc6ICdOZXcgY29tbWl0cyBzaW5jZSB0aGUgbGFzdCBBSSBzdW1tYXJ5IHdpdGhvdXQgQUkgYW5hbHlzaXMgeWV0JyxcbiAgICAncGlja2VyLnVuZGlnZXN0ZWRDb3VudCc6ICd7bn0gdW5yZXZpZXdlZCBjb21taXRzJyxcbiAgICAncGlja2VyLnNlbGVjdEFsbFVuZGlnZXN0ZWQnOiAnU2VsZWN0IHVuZGlnZXN0ZWQnLFxuICAgICdwaWNrZXIuZGlnZXN0QWxsJzogJ0RpZ2VzdCBhbGwnLFxuICAgICdwaWNrZXIuZGlnZXN0QWxsSGludCc6ICdTZWxlY3QgYWxsIHVuZGlnZXN0ZWQgY29tbWl0cyBhbmQgYmF0Y2ggQUkgYW5hbHlzaXMgKGNvbmN1cnJlbmN5IDMsIGNhY2hlZCksIGF1dG8tZ2VuZXJhdGUgdGhlIG5hcnJhdGl2ZSBhZnRlcndhcmRzOyB0aGVuIGNyZWF0ZSBhbiBBSSBzdW1tYXJ5IGluIE5vdGVzICYgTWVtb3J5IHRvIHJlc2V0IHRoZSBtYXJrZXInLFxuICAgICduYXJyYXRpdmUuZGlnZXN0SGludCc6ICdOYXJyYXRpdmUgZ2VuZXJhdGVkLiBDcmVhdGUgYW4gQUkgc3VtbWFyeSBpbiBOb3RlcyAmIE1lbW9yeSB0byByZXNldCB0aGUgdW5kaWdlc3RlZCBtYXJrZXIuJyxcbiAgICAnaW1wYWN0LmZhY3RvcnMnOiAnUmlzayBmYWN0b3JzICh3aHkgdGhpcyBsZXZlbCknLFxuICAgICdpbXBhY3QucG9pbnRzJzogJ0ltcGFjdGVkIHBvaW50cycsXG4gICAgJ2ltcGFjdC5rZXlQb2ludHMnOiAnS2V5IGNvbXBvbmVudHMnLFxuICAgICdpbXBhY3QubWVtb3J5JzogJ0Nyb3NzLWNoZWNrIHdpdGggcHJvamVjdCBtZW1vcnknLFxuICAgICdpbXBhY3QuZnVuY3Rpb25zJzogJ0ltcGFjdGVkIGZ1bmN0aW9ucyAod2hvIGNhbGxzIHRoZSBjaGFuZ2VkIGNvZGUpJyxcbiAgICAnaW1wYWN0LmZ1bmNSb2xlJzogJ0Z1bmN0aW9uIHJvbGUnLFxuICAgICdpbXBhY3QuZnVuY0NoYW5nZSc6ICdDaGFuZ2VkIGJ5IHRoaXMgY29tbWl0JyxcbiAgICAnaW1wYWN0LmZ1bmNDYWxsZXJzJzogJ0ltcGFjdCBvbiBjYWxsZXJzJyxcbiAgICAnY2FjaGUuaGl0JzogJ2Zyb20gY2FjaGUnLFxuICAgICdjYWNoZS5yZWdlbmVyYXRlJzogJ1JlZ2VuZXJhdGUnLFxuICAgICdjb3N0LnRvb2x0aXAnOiAnRXN0aW1hdGVkIGNvc3Qgb2YgdGhpcyBBSSBjYWxsIChEZWVwU2VlayBwcmljaW5nKScsXG4gICAgJ2V4ZWMuY3JlYXRlJzogJ05ldyBydW4nLFxuICAgICdleGVjLmZvcm1UaXRsZSc6ICdXaGF0IHRvIGRvIChvbmUgbGluZSknLFxuICAgICdleGVjLmZvcm1EZXNjJzogJ1JlcXVpcmVtZW50OiBnb2FsLCBtb2R1bGVzLCBhY2NlcHRhbmNlJyxcbiAgICAnZXhlYy5zdGFydCc6ICdTdGFydCBydW4nLFxuICAgICdleGVjLnN0YXJ0aW5nJzogJ1N0YXJ0aW5nXHUyMDI2JyxcbiAgICAnZXhlYy5jcmVhdGVIaW50JzogJ0NyZWF0ZXMgYSBjaGFuZ2UsIGdlbmVyYXRlcyBhIHBsYW4sIHRoZW4gQUkgc3ViYWdlbnRzIGV4ZWN1dGUgc3RlcCBieSBzdGVwOyBwcm9ncmVzcyByZWZyZXNoZXMgYmVsb3cuJyxcbiAgICAnZXhlYy5tb2RlbERlZmF1bHQnOiAnRXhlY3V0aW9uIG1vZGVsIChyb2xlIGRlZmF1bHRzOiBhbmFseXNpcy9vcHM9ZmFzdCwgY29kaW5nPXN0YW5kYXJkLCBwbGFubmluZz1yZWFzb25pbmcsIHZlcmlmaWNhdGlvbj12ZXJpZmllciknLFxuICAgICdiYWRnZS5ydW5uaW5nJzogJ3tufSBydW5zIGluIHByb2dyZXNzLCBjbGljayB0byB2aWV3JyxcbiAgICAnbmFycmF0aXZlLnRpdGxlJzogJ1dvcmstcm91bmQgbmFycmF0aXZlJyxcbiAgICAnbmFycmF0aXZlLmdlbmVyYXRlJzogJ0ludGVycHJldCB0aGlzIHJvdW5kIG9mIHdvcmsnLFxuICAgICduYXJyYXRpdmUucnVubmluZyc6ICdHZW5lcmF0aW5nXHUyMDI2ICh+MTAtMzBzKScsXG4gICAgJ2JhZGdlLmZhaWxlZCc6ICd7bn0gcnVucyBuZWVkIGF0dGVudGlvbiwgY2xpY2sgdG8gdmlldycsXG4gICAgJ2V4ZWMuZmxvd0NyZWF0ZSc6ICdEZXNjcmliZSB0aGUgdGFzaycsXG4gICAgJ2V4ZWMuZmxvd09yY2hlc3RyYXRlJzogJ0NvbmZpcm0gb3JjaGVzdHJhdGlvbiAocGVyLXN0ZXAgbW9kZWwvcm9sZS9mYWlsdXJlIHBvbGljeSknLFxuICAgICdleGVjLmZsb3dSdW4nOiAnTGF1bmNoICh0cmFjayBwcm9ncmVzcyAmIGNvc3QgaW4gcnVuIGRldGFpbCknLFxuICAgICdleGVjLmZsb3dNZW1vcnknOiAnQXV0by1kaXN0aWxsIG1lbW9yaWVzIChjb25maXJtIGluIG1lbW9yeSBwYW5lbCknLFxuICAgICdleGVjLnBsYW5uaW5nJzogJ0dlbmVyYXRpbmcgb3JjaGVzdHJhdGlvblx1MjAyNiAoTExNIGlzIGRlY29tcG9zaW5nIHRoZSB0YXNrLCB+MTAtMzBzKScsXG4gICAgJ2V4ZWMuY29sLnN0ZXBzJzogJ1N0ZXBzJyxcbiAgICAnbm90ZXMuZWRpdCc6ICdFZGl0JyxcbiAgICAnbm90ZXMudG9NZW1vcnknOiAnVG8gbWVtb3J5JyxcbiAgICAnbm90ZXMudG9NZW1vcnlIaW50JzogJ1ByZWZpbGwgdGhlIG1lbW9yeSBmb3JtIGJlbG93IHdpdGggdGhpcyBub3RlJyxcbiAgICAnbm90ZXMudG9NZW1vcnlEb25lJzogJ1x1MjcxMyBQcmVmaWxsZWQgdGhlIG1lbW9yeSBmb3JtIChjaG9vc2UgYSB0eXBlIGluIHRoZSBQcm9qZWN0IG1lbW9yeSB6b25lIGJlbG93LCB0aGVuIGFkZCknLFxuICAgICdub3Rlcy5jb3B5TWQnOiAnQ29weSBNRCcsXG4gICAgJ25vdGVzLmNvcHlNZEhpbnQnOiAnQ29weSB0aGlzIG5vdGUgYXMgTWFya2Rvd24gdG8gdGhlIGNsaXBib2FyZCcsXG4gICAgJ25vdGVzLmNvcHlNZERvbmUnOiAnQ29waWVkIGFzIE1hcmtkb3duJyxcbiAgICAnbm90ZXMuZXhwb3J0TWQnOiAnRXhwb3J0IE1EJyxcbiAgICAnbm90ZXMuZXhwb3J0TWRIaW50JzogJ0Rvd25sb2FkIGFzIGEgLm1kIGZpbGUnLFxuICAgICdub3Rlcy5leHBvcnREb25lJzogJ0V4cG9ydGVkIGFzIC5tZCcsXG4gICAgJ25vdGVzLmRpZ2VzdE5ldmVyJzogJ05vIEFJIHN1bW1hcnkgZ2VuZXJhdGVkIHlldCcsXG4gICAgJ25vdGVzLmRpZ2VzdFBlbmRpbmcnOiAne259IG5ldyBjb21taXRzIHNpbmNlIHRoZSBsYXN0IHN1bW1hcnknLFxuICAgICdkZXRhaWwuc2F2ZU5vdGUnOiAnU2F2ZSBhcyBub3RlJyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlSGludCc6ICdTYXZlIHRoaXMgcmV2aWV3IGNvbmNsdXNpb24gKHdoYXQvbG9naWMvcmlza3MpIGFzIGEgc3RydWN0dXJlZCBub3RlJyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlVGl0bGUnOiAnUmV2aWV3IHJlY29yZCcsXG4gICAgJ2RldGFpbC5zYXZlTWVtb3J5JzogJ0Rpc3RpbGwgdG8gbWVtb3J5JyxcbiAgICAnZGV0YWlsLnNhdmVNZW1vcnlIaW50JzogJ0Rpc3RpbGwgdGhpcyByZXZpZXcgY29uY2x1c2lvbiBpbnRvIGEgcHJvamVjdCBtZW1vcnkgKHF1ZXVlZCBmb3IgY29uZmlybWF0aW9uKScsXG4gICAgJ25vdGVzLnNhdmUnOiAnU2F2ZScsXG4gICAgJ25vdGVzLmNhbmNlbCc6ICdDYW5jZWwnLFxuICAgICdtZW1vcnkuYnJhbmNoU2NvcGUnOiAnQnJhbmNoJyxcbiAgICAnbWVtb3J5LmJyYW5jaEFsbCc6ICdBbGwgYnJhbmNoZXMnLFxuICAgICdub3Rlcy5zZWFyY2gnOiAnU2VhcmNoIG5vdGVzXHUyMDI2JyxcbiAgICAnbW9kZWwudGl0bGUnOiAnTW9kZWwgYXNzaWdubWVudCAod2hpY2ggbW9kZWwgcGVyIHRhc2spJyxcbiAgICAnbW9kZWwubG9hZGluZyc6ICdMb2FkaW5nIG1vZGVsc1x1MjAyNicsXG4gICAgJ21vZGVsLmZvbGxvd0NoYXQnOiAnRm9sbG93IGNoYXQgbW9kZWwnLFxuICAgICdtb2RlbC5zYXZlJzogJ1NhdmUgJiBhcHBseScsXG4gICAgJ21vZGVsLnNhdmVkJzogJ0FwcGxpZWQnLFxuICAgICdtb2RlbC5oaW50JzogJ0FwcGxpZXMgaW1tZWRpYXRlbHkgYW5kIHBlcnNpc3RzIGFjcm9zcyByZXN0YXJ0czsgY2hhdCBtb2RlbCB1bmFmZmVjdGVkLicsXG4gICAgJ25vdGVzLmFpU3VtbWFyeSc6ICdBSSBzdW1tYXJ5JyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5UnVuJzogJ1N1bW1hcml6aW5nXHUyMDI2ICgxMC0zMHMpJyxcbiAgICAnbm90ZXMuZXhwYW5kJzogJ0V4cGFuZCcsXG4gICAgJ25vdGVzLmNvbGxhcHNlJzogJ0NvbGxhcHNlJyxcbiAgICAnbm90ZXMuc3VtbWFyeVRhZyc6ICdBSSBzdW1tYXJ5JyxcbiAgICAnbm90ZXMuZW1wdHlTZWFyY2gnOiAnTm8gbWF0Y2hpbmcgbm90ZXMuJyxcbiAgICAnbm90ZXMuY29udGVudEhpbnQnOiAnTm90ZSBjb250ZW50IChtdWx0aS1saW5lKTogY29uY2x1c2lvbnMsIHF1ZXN0aW9ucywgbGVhcm5pbmdzXHUyMDI2JyxcbiAgICAnbm90ZXMudGFnc0hpbnQnOiAnVGFncyAoY29tbWEgc2VwYXJhdGVkLCBvcHRpb25hbDsgY2xpY2sgYSB0YWcgdG8gZmlsdGVyKScsXG4gICAgJ25vdGVzLnBpbic6ICdQaW4nLFxuICAgICdub3Rlcy51bnBpbic6ICdVbnBpbicsXG4gICAgJ25vdGVzLmVkaXRlZEF0JzogJ2VkaXRlZCcsXG4gICAgJ3Jldmlldy5maWx0ZXJBbGwnOiAnQWxsJyxcbiAgICAncmV2aWV3LnN0YXR1c0FsbCc6ICdBbGwgc3RhdHVzZXMnLFxuICAgICdyZXZpZXcudmVyaWZ5JzogJ1JlLXZlcmlmeScsXG4gICAgJ3Jldmlldy52ZXJpZnlSdW5uaW5nJzogJ1ZlcmlmeWluZ1x1MjAyNicsXG4gICAgJ3Jldmlldy52ZXJpZnlIaW50JzogJ0FmdGVyIGZpeGluZyB0aGUgY29kZSwgY2xpY2sgdG8gcmUtY2hlY2s6IHdoZXRoZXIgaXNzdWVzIGFyZSBmaXhlZCwgd2hldGhlciB0aGUgY2hhbmdlIGlzIG9wdGltYWwgYW5kIG1pbmltYWxseSBpbnZhc2l2ZSwgYW5kIHdoZXRoZXIgbmV3IGlzc3VlcyBhcHBlYXJlZC4gT25seSBhIHBhc3NpbmcgcmUtdmVyaWZpY2F0aW9uIG1hcmtzIGlzc3VlcyByZXNvbHZlZC4nLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZSc6ICdGYWxzZSBwb3NpdGl2ZScsXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlSGludCc6ICdIdW1hbi1tYXJrIHRoaXMgaXNzdWUgYXMgYSBmYWxzZSBwb3NpdGl2ZSBhbmQgY2xvc2UgaXQgKGRpc3RpbmN0IGZyb20gYSB2ZXJpZmllZCBmaXgpJyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVUaXRsZSc6ICdNYXJrIGFzIGZhbHNlIHBvc2l0aXZlPycsXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlTXNnJzogJ1wie3RpdGxlfVwiIHdpbGwgYmUgbWFya2VkIHJlamVjdGVkIGFuZCByZW1vdmVkIGZyb20gdGhlIG9wZW4gcXVldWUuJyxcbiAgICAncmV2aWV3LmZpeERldGFpbCc6ICdGaXggZGV0YWlscycsXG4gICAgJ3Jldmlldy5maXhTdGF0RmlsZXMnOiAnZmlsZXMnLFxuICAgICdyZXZpZXcuZml4RmlsZXMnOiAnRmlsZXMgdG91Y2hlZCBieSB0aGUgZml4JyxcbiAgICAncmV2aWV3LmZpeEltcGFjdCc6ICdJbXBhY3Qgc2NvcGUgKGNoYW5nZWQgc3ltYm9scyBhbmQgY2FsbGVycyknLFxuICAgICdyZXZpZXcuZGVmaW5lZEluJzogJ2RlZmluZWQgaW4nLFxuICAgICdyZXZpZXcuY2FsbENvdW50JzogJ2NhbGwgc2l0ZShzKScsXG4gICAgJ3Jldmlldy5maXhEaWZmJzogJ0ZpeCBkaWZmIChyZWxhdGl2ZSB0byB0aGUgcmV2aWV3IGJhc2VsaW5lKScsXG4gICAgJ3Jldmlldy5yZWZyZXNoJzogJ1JlZnJlc2gnLFxuICAgICdyZXZpZXcucmV0ZW50aW9uSGludCc6ICdSZXNvbHZlZCAvIGZhbHNlLXBvc2l0aXZlIGlzc3VlcyBhcmUgYXV0by1wdXJnZWQgYWZ0ZXIge2RheXN9IGRheShzKScsXG4gICAgJ3Jldmlldy50YXJnZXQnOiAnVGFyZ2V0JyxcbiAgICAncmV2aWV3LndvcmtpbmdUYXJnZXQnOiAnV29ya2luZyB0cmVlJyxcbiAgICAncmV2aWV3LmV4cG9ydE1kJzogJ0V4cG9ydCBNRCcsXG4gICAgJ3Jldmlldy5leHBvcnRNZEhpbnQnOiAnRG93bmxvYWQgdGhlIGZpbHRlcmVkIGlzc3VlIGxpc3QgYXMgYSAubWQgZmlsZScsXG4gICAgJ3Jldmlldy5leHBvcnRFbXB0eSc6ICdObyBpc3N1ZXMgdG8gZXhwb3J0JyxcbiAgICAncmV2aWV3LnNlbGVjdEFsbCc6ICdTZWxlY3QgYWxsJyxcbiAgICAncmV2aWV3LmNoZWNrZWRDb3VudCc6ICd7bn0gc2VsZWN0ZWQnLFxuICAgICdyZXZpZXcubWFya0hhbmRsZWQnOiAnTWFyayBoYW5kbGVkJyxcbiAgICAncmV2aWV3LmJhdGNoVmVyaWZ5JzogJ0JhdGNoIHZlcmlmeScsXG4gICAgJ3Jldmlldy5iYXRjaFZlcmlmeUNvbmZpcm1UaXRsZSc6ICdCYXRjaCB2ZXJpZnk/JyxcbiAgICAncmV2aWV3LmJhdGNoVmVyaWZ5Q29uZmlybU1zZyc6ICdXaWxsIHZlcmlmeSB7bn0gcmV2aWV3IHRhcmdldHMgb25lIGJ5IG9uZSAoc2VyaWFsIExMTSBjYWxscywgfjEwLTYwcyBlYWNoLCBjb25zdW1lcyBtb2RlbCB1c2FnZSk7IHlvdSBjYW4gc3RvcCBhbnl0aW1lLicsXG4gICAgJ3Jldmlldy5iYXRjaFN0b3AnOiAnU3RvcCcsXG4gICAgJ3Jldmlldy5iYXRjaFByb2dyZXNzJzogJ0JhdGNoIHZlcmlmeWluZyB7aX0ve259JyxcbiAgICAncmV2aWV3LmJhdGNoRG9uZSc6ICdCYXRjaCB2ZXJpZnkgZG9uZToge2F9IHJlc29sdmVkIFx1MDBCNyB7Yn0gc3RpbGwgb3BlbiBcdTAwQjcge2N9IG5ldyBcdTAwQjcge2R9IGZhaWxlZCB0YXJnZXRzJyxcbiAgICAncmV2aWV3LmJhdGNoU3RvcHBlZCc6ICdCYXRjaCB2ZXJpZnkgc3RvcHBlZCcsXG4gICAgJ3Jldmlldy50cmlhZ2UnOiAnXHVEODNFXHVEREY5IFRyaWFnZSBhbGwnLFxuICAgICdyZXZpZXcudHJpYWdlSGludCc6ICdMTE0gaG9saXN0aWMgc2NhbiBvdmVyIGFsbCBwZW5kaW5nIGlzc3VlczogZHVwbGljYXRlcy9vYnNvbGV0ZS9ub24taXNzdWVzIGFyZSBjbG9zZWQgaW1tZWRpYXRlbHkgd2l0aCBldmlkZW5jZSAocmVvcGVuYWJsZSk7IHJlYWwgaXNzdWVzIHN0YXkgZm9yIGZpeCBkaXNwYXRjaCcsXG4gICAgJ3Jldmlldy50cmlhZ2VDb25maXJtVGl0bGUnOiAnVHJpYWdlIGFsbCBwZW5kaW5nIGlzc3Vlcz8nLFxuICAgICdyZXZpZXcudHJpYWdlQ29uZmlybU1zZyc6ICdXaWxsIHNjYW4gYWxsIHBlbmRpbmcgaXNzdWVzIHdpdGggdGhlIExMTSBpbiBiYXRjaGVzICh1cCB0byB7bn0gcGVyIGJhdGNoLCBjb25zdW1lcyBtb2RlbCB1c2FnZSkuIElzc3VlcyBqdWRnZWQgZHVwbGljYXRlL29ic29sZXRlL25vbi1pc3N1ZXMgYXJlIGNsb3NlZCBJTU1FRElBVEVMWSB3aXRoIGV2aWRlbmNlIFx1MjAxNCBldmVyeSBjbG9zdXJlIGlzIHJldmlld2FibGUgYW5kIHJlb3BlbmFibGUgb24gdGhlIGlzc3VlIGNhcmQuIFJlYWwgaXNzdWVzIHN0YXkgZm9yIGZpeCBkaXNwYXRjaC4nLFxuICAgICdyZXZpZXcudHJpYWdlUHJvZ3Jlc3MnOiAnVHJpYWdpbmc6IHtufSBwcm9jZXNzZWQsIH57bX0gcmVtYWluaW5nJyxcbiAgICAncmV2aWV3LnRyaWFnZVN0b3AnOiAnU3RvcCcsXG4gICAgJ3Jldmlldy50cmlhZ2VEb25lJzogJ1RyaWFnZSBkb25lOiBjbG9zZWQge2F9IGR1cGxpY2F0ZSBcdTAwQjcge2J9IG9ic29sZXRlIFx1MDBCNyB7Y30gbm9uLWlzc3Vlczsge2R9IHBlbmRpbmcga2VwdCcsXG4gICAgJ3Jldmlldy50cmlhZ2VTdG9wcGVkJzogJ1RyaWFnZSBzdG9wcGVkIChqdWRnZWQgaXRlbXMgYXJlIG5vdCByZS1iaWxsZWQ7IGNsaWNrIGFnYWluIHRvIGNvbnRpbnVlKScsXG4gICAgJ3Jldmlldy50cmlhZ2VQYXJzZUZhaWwnOiAnOyBvbmUgYmF0Y2ggZmFpbGVkIHRvIHBhcnNlIGFuZCB3YXMga2VwdCBhcy1pcywgcmV0cnlhYmxlJyxcbiAgICAncmV2aWV3LmhhbmRsZWREb25lJzogJ3tufSBpc3N1ZXMgbWFya2VkIGFzIGhhbmRsZWQnLFxuICAgICdmaXgucGxhbic6ICdGaXggcGxhbicsXG4gICAgJ2ZpeC5wbGFuQXBwcm9hY2gnOiAnQXBwcm9hY2gnLFxuICAgICdmaXgucGxhbkltcGFjdCc6ICdJbXBhY3QnLFxuICAgICdmaXgucGxhbkJlbmVmaXQnOiAnQmVuZWZpdCcsXG4gICAgJ2ZpeC5wbGFuUmlzayc6ICdSaXNrJyxcbiAgICAnZml4LmRpc3BhdGNoJzogJ0Rpc3BhdGNoIGZpeGVzJyxcbiAgICAnZml4LmRpc3BhdGNoSGludE1haW4nOiAnRGlzcGF0Y2ggdGhlIGNoZWNrZWQgcGVuZGluZyBpc3N1ZXMgKHVuY2hlY2tlZCA9IGFsbCB1bmRlciB0aGUgY3VycmVudCBmaWx0ZXIpIHRvIGNvbmN1cnJlbnQgc3ViLWFnZW50czogYXV0byBmaXggPSB0aHJlZS1nYXRlIHZlcmlmeSArIGZpeCArIHdyaXRlLWJhY2sgKyBjb21taXQ7IHBsYW4gZmlyc3QgPSByZWFkLW9ubHkgc3RydWN0dXJlZCBwbGFucyBhd2FpdGluZyB5b3VyIGFwcHJvdmFsJyxcbiAgICAnZml4LmRpc3BhdGNoTW9kZVRpdGxlJzogJ0Rpc3BhdGNoIGZpeGVzIFx1MjAxNCBwaWNrIGEgbW9kZScsXG4gICAgJ2ZpeC5kaXNwYXRjaE1vZGVNc2cnOiAnV2lsbCBkaXNwYXRjaCB7bn0gcGVuZGluZyBpc3N1ZXMgdG8gY29uY3VycmVudCBzdWItYWdlbnRzIChvbmUgd29ya3RyZWUgcGVyIHRhc2ssIGNvbnN1bWVzIG1vZGVsIHVzYWdlLCBkb2VzIG5vdCB1c2UgdGhlIGNoYXQgd2luZG93KS4gXHUyNkExIEF1dG8gZml4OiB0aHJlZS1nYXRlIHZlcmlmeSArIGZpeCArIHdyaXRlLWJhY2sgKyBjb21taXQ7IGZhbHNlIHBvc2l0aXZlcy9kdXBsaWNhdGVzL29ic29sZXRlIGFyZSBhdXRvLWNsb3NlZC4gXHVEODNEXHVEQ0NCIFBsYW4gZmlyc3Q6IHJlYWQtb25seSBzdHJ1Y3R1cmVkIHBsYW5zLCBubyBjb2RlIGNoYW5nZXM7IGFwcHJvdmUgdGhlbSBvbiB0aGUgaXNzdWUgY2FyZCwgdGhlbiBwcmVzcyBcIkRpc3BhdGNoIGFwcHJvdmVkIHBsYW5zXCIuJyxcbiAgICAnZml4LmRpc3BhdGNoQXV0byc6ICdcdTI2QTEgQXV0byBmaXgnLFxuICAgICdmaXguZGlzcGF0Y2hQbGFuJzogJ1x1RDgzRFx1RENDQiBQbGFuIGZpcnN0JyxcbiAgICAnZml4LmRpc3BhdGNoTm9PcGVuJzogJ05vIHBlbmRpbmcgaXNzdWVzIHVuZGVyIHRoZSBjdXJyZW50IGZpbHRlciB0byBkaXNwYXRjaCcsXG4gICAgJ2ZpeC5kaXNwYXRjaFBsYW5zJzogJ0Rpc3BhdGNoIGFwcHJvdmVkIHBsYW5zJyxcbiAgICAnZml4LmRpc3BhdGNoUGxhbnNIaW50JzogJ0Rpc3BhdGNoIHRoZSBhcHByb3ZlZCBwZW5kaW5nIHBsYW5zIHRvIGNvbmN1cnJlbnQgc3ViLWFnZW50IGZpeGVzIChvbmUgd29ya3RyZWUgcGVyIHRhc2s7IGNvbmZsaWN0cyBhdXRvLXJlZG8gb24gbGF0ZXN0IEhFQUQpJyxcbiAgICAnZml4LmRpc3BhdGNoRG9uZSc6ICdcdTVERjJcdTZEM0VcdTUzRDEge259IFx1NEUyQVx1NEZFRVx1NTkwRFx1NEVGQlx1NTJBMVx1RkYwOFx1NUU3Nlx1NTNEMSB7Y31cdUZGMDknLFxuICAgICdmaXguZGlzcGF0Y2hFbXB0eSc6ICdcdTZDQTFcdTY3MDlcdTUzRUZcdTZEM0VcdTUzRDFcdTc2ODRcdTRFRkJcdTUyQTFcdUZGMDhcdTUyRkVcdTkwMDlcdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdTYyMTZcdTdCNDlcdTVGODVcdTY1QjlcdTY4NDhcdTRFQTdcdTUxRkFcdUZGMDknLFxuICAgICdmaXguc3RhdHVzJzogJ1x1NEZFRVx1NTkwRFx1NjI2N1x1ODg0QycsXG4gICAgJ2ZpeC5zdG9wJzogJ1x1NTA1Q1x1NkI2MicsXG4gICAgJ2ZpeC5zdG9wRG9uZSc6ICdcdTVERjJcdTUwNUNcdTZCNjIge259IFx1NEUyQVx1NEZFRVx1NTkwRFx1NEVGQlx1NTJBMScsXG4gICAgJ2ZpeC50YXNrUXVldWVkJzogJ1x1NjM5Mlx1OTYxRlx1NEUyRCcsXG4gICAgJ2ZpeC50YXNrUnVubmluZyc6ICdcdThGRDBcdTg4NENcdTRFMkQnLFxuICAgICdmaXgudGFza01lcmdpbmcnOiAnXHU1NDA4XHU1RTc2XHU0RTJEJyxcbiAgICAnZml4LnRhc2tSZWRvJzogJ1x1OTFDRFx1NTA1QVx1NEUyRCcsXG4gICAgJ2ZpeC50YXNrRG9uZSc6ICdcdTVERjJcdTVCOENcdTYyMTAnLFxuICAgICdmaXgudGFza0NvbmZsaWN0JzogJ1x1NTFCMlx1N0E4MScsXG4gICAgJ2ZpeC50YXNrRmFpbGVkJzogJ1x1NTkzMVx1OEQyNScsXG4gICAgJ2ZpeC50YXNrQ2FuY2VsbGVkJzogJ1x1NURGMlx1NTA1Q1x1NkI2MicsXG4gICAgJ2ZpeC5hdHRlbXB0JzogJ1x1N0IyQyB7bn0gXHU2QjIxJyxcbiAgICAnZml4Lm1vZGVsVGl0bGUnOiAnXHU0RkVFXHU1OTBEXHU1RTc2XHU1M0QxXHVGRjA4XHU1QjUwIEFnZW50IFx1NkM2MFx1RkYwOScsXG4gICAgJ2ZpeC5tb2RlbEhpbnQnOiAnXHU1NDBDXHU2NUY2XHU2MjY3XHU4ODRDXHU3Njg0XHU0RkVFXHU1OTBEXHU1QjUwIEFnZW50IFx1NEUwQVx1OTY1MFx1RkYwODEtMTBcdUZGMDlcdTMwMDJcdTZCQ0ZcdTRFRkJcdTUyQTFcdTcyRUNcdTdBQ0Igd29ya3RyZWUgXHU0RTkyXHU0RTBEXHU1RTcyXHU2MjcwXHUzMDAyJyxcblxuICAgICdwbGFuLnRpdGxlJzogJ09yY2hlc3RyYXRpb24gcGxhbicsXG4gICAgJ3BsYW4uaGludCc6ICdFYWNoIHN0ZXAgcm9sZSBkcml2ZXMgY29udGV4dCBpbmplY3Rpb24gYW5kIHRoZSBkZWZhdWx0IG1vZGVsIChhbmFseXNpcy9vcHM9ZmFzdCwgY29kaW5nPXN0YW5kYXJkLCBwbGFubmluZz1yZWFzb25pbmcsIHZlcmlmaWNhdGlvbj12ZXJpZmllcik7IGFkanVzdCBiZWZvcmUgbGF1bmNoaW5nLicsXG4gICAgJ3BsYW4uY29sLnN0ZXAnOiAnU3RlcCcsICdwbGFuLmNvbC5yb2xlJzogJ1JvbGUnLCAncGxhbi5jb2wubW9kZWwnOiAnTW9kZWwnLCAncGxhbi5jb2wucG9saWN5JzogJ0ZhaWx1cmUgcG9saWN5JywgJ3BsYW4uY29sLmVuYWJsZWQnOiAnT24nLCAncGxhbi5jb2wuYXR0ZW1wdHMnOiAnQXR0ZW1wdHMnLFxuICAgICdwbGFuLm1vZGVsRGVmYXVsdCc6ICdSb2xlIGRlZmF1bHQnLFxuICAgICdwbGFuLmxhdW5jaEVkaXRlZCc6ICdTYXZlIGVkaXRzICYgbGF1bmNoJyxcbiAgICAncGxhbi5sYXVuY2hEaXJlY3QnOiAnTGF1bmNoIGFzLWlzJyxcbiAgICAncGxhbi5kaXNjYXJkJzogJ0Rpc2NhcmQnLFxuICAgICdwbGFuLnZpZXdEZXRhaWwnOiAnRGV0YWlsJywgJ3BsYW4ucmVmcmVzaERldGFpbCc6ICdSZWZyZXNoJywgJ3BsYW4uY2xvc2VEZXRhaWwnOiAnQ2xvc2UnLFxuICAgICdwbGFuLmRldGFpbFRpdGxlJzogJ1J1biBkZXRhaWwnLFxuICAgICdwbGFuLnBhdXNlZEJhbm5lcic6ICdSdW4gcGF1c2VkLCBhd2FpdGluZyB5b3VyIGRlY2lzaW9uJyxcbiAgICAncGxhbi5yZXN1bWVSZXRyeSc6ICdSZXRyeSBzdGVwICYgY29udGludWUnLFxuICAgICdwbGFuLnJlc3VtZVNraXAnOiAnU2tpcCBzdGVwICYgY29udGludWUnLFxuICAgICdwbGFuLnJlc3VtZUZhaWxlZCc6ICdSZXN1bWUgZnJvbSBmYWlsdXJlJyxcbiAgICAncGxhbi5jb250ZXh0VGl0bGUnOiAnUnVuIGNvbnRleHQgKHdoYXQgd2FzIGluamVjdGVkKScsXG4gICAgJ3BsYW4uYnJhbmNoJzogJ0JyYW5jaCcsICdwbGFuLmluamVjdGVkTWVtb3JpZXMnOiAnSW5qZWN0ZWQgbWVtb3JpZXMnLCAncGxhbi5kZWNpc2lvbkxvZyc6ICdEZWNpc2lvbiBsb2cnLFxuICAgICdleGVjLmNvbC5kZXRhaWwnOiAnRGV0YWlsJyxcblxuICAgICdzY2hlZC50aXRsZSc6ICdTY2hlZHVsZWQgdGFza3MnLFxuICAgICdzY2hlZC5mb3JtTmFtZSc6ICdUYXNrIG5hbWUnLCAnc2NoZWQuZm9ybUludGVydmFsJzogJ0ludGVydmFsIChtaW51dGVzKScsXG4gICAgJ3NjaGVkLnR5cGVSZXZpZXcnOiAnQXV0byByZXZpZXcnLCAnc2NoZWQudHlwZVN1bW1hcnknOiAnQUkgc3VtbWFyeScsICdzY2hlZC50eXBlUnVuJzogJ1RpbWVkIHJ1bicsXG4gICAgJ3NjaGVkLmFkZCc6ICdDcmVhdGUnLFxuICAgICdzY2hlZC5oaW50JzogJ1J1bnMgYXV0b21hdGljYWxseSB3aGVuIGR1ZTogYXV0byByZXZpZXcgPSByZXZpZXcgY29tbWl0cyBmcm9tIHRoZSBsYXN0IDI0aCAoaXNzdWVzIGxhbmQgaW4gdGhlIFJldmlldyB0YWIpOyBBSSBzdW1tYXJ5ID0gaW5jcmVtZW50YWwgbGVhcm5pbmcgc3VtbWFyeTsgdGltZWQgcnVuID0gZXhlY3V0ZSB0aGUgdGVtcGxhdGUgYXMgYW4gb3JjaGVzdHJhdGVkIHRhc2suIE1pbmltdW0gMSBtaW51dGUuJyxcbiAgICAnc2NoZWQuZW1wdHknOiAnTm8gc2NoZWR1bGVkIHRhc2tzIHlldC4nLFxuICAgICdzY2hlZC5jb2wubmFtZSc6ICdOYW1lJywgJ3NjaGVkLmNvbC50eXBlJzogJ1R5cGUnLCAnc2NoZWQuY29sLmludGVydmFsJzogJ0N5Y2xlJywgJ3NjaGVkLmNvbC5uZXh0JzogJ05leHQgcnVuJywgJ3NjaGVkLmNvbC5sYXN0UmVzdWx0JzogJ0xhc3QgcmVzdWx0JywgJ3NjaGVkLmNvbC5hY3Rpb25zJzogJ0FjdGlvbnMnLFxuICAgICdzY2hlZC5kYXknOiAnIGQnLCAnc2NoZWQuaG91cic6ICcgaCcsICdzY2hlZC5taW51dGUnOiAnIG1pbicsXG4gICAgJ3NjaGVkLmRpc2FibGUnOiAnUGF1c2UnLCAnc2NoZWQuZW5hYmxlJzogJ0VuYWJsZScsICdzY2hlZC5ydW5Ob3cnOiAnUnVuIG5vdycsXG5cbiAgICAnbWVtb3J5LnpvbmVUaXRsZSc6ICdQcm9qZWN0IG1lbW9yeScsXG4gICAgJ21lbW9yeS5zeW5jQmFzZWxpbmUnOiAnU3luYyBiYXNlbGluZScsICdtZW1vcnkuc3luY05vbmUnOiAnbmV2ZXIgc3luY2VkJyxcbiAgICAnbWVtb3J5LmJlaGluZCc6ICd7bn0gY29tbWl0cyBiZWhpbmQnLFxuICAgICdtZW1vcnkuc3luYyc6ICdTeW5jIG1lbW9yeScsICdtZW1vcnkuc3luY2luZyc6ICdTeW5jaW5nXHUyMDI2JywgJ21lbW9yeS5zeW5jRmFpbGVkJzogJ1N5bmMgZmFpbGVkJyxcbiAgICAnbWVtb3J5LnN0YWxlVGl0bGUnOiAnUG9zc2libHkgc3RhbGUgKHJlbGF0ZWQgY29kZSBjaGFuZ2VkOyByZXZpZXcgbmVlZGVkKScsXG4gICAgJ21lbW9yeS5tYXJrU3RhbGUnOiAnTWFyayBzdGFsZScsICdtZW1vcnkuYXJjaGl2ZUJ0bic6ICdBcmNoaXZlJywgJ21lbW9yeS5rZWVwQWN0aXZlJzogJ1N0aWxsIHZhbGlkJyxcbiAgICAnbWVtb3J5Lm5ld0NhbmRpZGF0ZXMnOiAnTmV3IGNhbmRpZGF0ZXMgKHF1ZXVlZCBmb3IgY29uZmlybWF0aW9uKTonLFxuICAgICdtZW1vcnkuY2xvc2VSZXBvcnQnOiAnQ2xvc2UgcmVwb3J0JyxcbiAgICAnbWVtb3J5LnNjb3BlUHJvamVjdCc6ICdNYWlubGluZSAoYWxsIGJyYW5jaGVzKScsICdtZW1vcnkuc2NvcGVCcmFuY2gnOiAnQ3VycmVudCBicmFuY2ggb25seScsXG4gICAgJ21lbW9yeS5wZW5kaW5nUXVldWUnOiAnUGVuZGluZyBjb25maXJtYXRpb24nLFxuICAgICdtZW1vcnkudG9Ob3RlJzogJ1RvIG5vdGUnLCAnbWVtb3J5Lm5vcm1hbGl6ZSc6ICdOb3JtYWxpemUgdG8gbWFpbmxpbmUnLCAnbWVtb3J5LnJlc3RvcmUnOiAnUmVzdG9yZScsXG4gICAgJ21lbW9yeS5zdGF0dXNTdGFsZSc6ICdTdGFsZScsXG4gICAgJ2ZzLmJyb3dzZSc6ICdCcm93c2UnLFxuICAgICdmcy51cCc6ICdVcCcsXG4gICAgJ2ZzLnVzZSc6ICdVc2UgdGhpcyBkaXJlY3RvcnknLFxuICAgICdmcy5yZWdpc3Rlcic6ICdBbHNvIHJlZ2lzdGVyIGFzIHNlc3Npb24gd29ya3NwYWNlJyxcbiAgICAnZnMubG9hZGluZyc6ICdSZWFkaW5nXHUyMDI2JyxcbiAgICAnZnMuZW1wdHknOiAnTm8gc3ViZGlyZWN0b3JpZXMuJyxcbiAgICAnaW1wYWN0LmZ1bmN0aW9uc05vbmUnOiAnTm8gZnVuY3Rpb24tbGV2ZWwgY2FsbCBpbXBhY3QgZGV0ZWN0ZWQgKHN0eWxlL2Fzc2V0L2NvbmZpZy1vbmx5IGNoYW5nZSkuJyxcbiAgICAncmV2aWV3LmNvbC5zZXZlcml0eSc6ICdTZXZlcml0eScsXG4gICAgJ3Jldmlldy5jb2wuY2F0ZWdvcnknOiAnQ2F0ZWdvcnknLFxuICAgICdyZXZpZXcuY29sLnRpdGxlJzogJ0lzc3VlJyxcbiAgICAncmV2aWV3LmNvbC5ldmlkZW5jZSc6ICdMb2NhdGlvbicsXG4gICAgJ3Jldmlldy5jb2wuZml4JzogJ1N1Z2dlc3RlZCBmaXgnLFxuICAgICdyZXZpZXcuaGludCc6ICdDbGljayB0aGUgYnV0dG9uIGFib3ZlIHRvIHByb2R1Y2UgdGhlIG9wdGltYWxpdHkgdmVyZGljdCBhbmQgaXNzdWUgbGlzdC4nLFxuICAgICdkaWZmLnNob3cnOiAnRGlmZicsXG4gICAgJ2RpZmYuaGlkZSc6ICdIaWRlIGRpZmYnLFxuXG4gICAgJ2RldGFpbC50aXRsZSc6ICdSZXZpZXcgZGV0YWlsJyxcbiAgICAnZGV0YWlsLnBpY2snOiAnXHUyMTkwIFBpY2sgYSBjb21taXQgKG9yIHRoZSB1bmNvbW1pdHRlZCBjaGFuZ2VzKSBvbiB0aGUgbGVmdCB0byBzdGFydCByZXZpZXdpbmcnLFxuICAgICdkZXRhaWwud2hhdCc6ICdXaGF0IGl0IGRvZXMnLFxuICAgICdkZXRhaWwubG9naWMnOiAnSW1wbGVtZW50YXRpb24gbG9naWMnLFxuICAgICdkZXRhaWwucmlzayc6ICdSaXNrcycsXG4gICAgJ2RldGFpbC5maWxlcyc6ICdGaWxlcycsXG4gICAgJ2RldGFpbC5wYXRjaCc6ICdTaG93IHJhdyBwYXRjaCcsXG4gICAgJ2RldGFpbC5haUxvYWRpbmcnOiAnR2VuZXJhdGluZyBBSSBleHBsYW5hdGlvblx1MjAyNiAoMTAtMzBzKScsXG4gICAgJ2RldGFpbC5xdWV1ZWQnOiAne259IGFuYWx5c2VzIHF1ZXVlZCAod2lsbCBydW4gY29uY3VycmVudGx5KScsXG4gICAgJ2RldGFpbC5jYXJkUXVldWVkJzogJ1dhaXRpbmcgaW4gdGhlIGFuYWx5c2lzIHF1ZXVlIChtYXggMyBjb25jdXJyZW50IHRvIHByb3RlY3QgdGhlIG1vZGVsIGdhdGV3YXkpJyxcbiAgICAnZGV0YWlsLmltcGFjdCc6ICdJbXBhY3Qgc2NvcGUnLFxuICAgICdkZXRhaWwuaW1wYWN0TG9hZGluZyc6ICdTY2FubmluZyBpbXBhY3RcdTIwMjYgKHJlZmVyZW5jZSBzZWFyY2ggKyBncmFwaCB3YWxrKScsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5JzogJ09wdGltYWxpdHkgcmV2aWV3JyxcbiAgICAnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJzogJ1Jldmlld2luZ1x1MjAyNiAocHJvZHVjZXMgaXNzdWUgbGlzdCBhbmQgb3B0aW1hbGl0eSB2ZXJkaWN0KScsXG5cbiAgICAnaW1wYWN0LnJpc2snOiAnUmlzaycsXG4gICAgJ2ltcGFjdC5jb2wuY2hhbmdlZCc6ICdDaGFuZ2VkIGZpbGVzJyxcbiAgICAnaW1wYWN0LmNvbC5pbmRpcmVjdCc6ICdJbmRpcmVjdCAocmVmZXJlbmNlIGNoYWluKScsXG4gICAgJ2ltcGFjdC5jb2wucG90ZW50aWFsJzogJ1BvdGVudGlhbCcsXG4gICAgJ2ltcGFjdC5ub25lJzogJ05vIGluLXJlcG8gcmVmZXJlbmNlcnMgZm91bmQgKHRoZSBjaGFuZ2UgbG9va3Mgc2VsZi1jb250YWluZWQpLicsXG4gICAgJ2ltcGFjdC50ZXN0cyc6ICdSZWxhdGVkIHRlc3RzJyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5jaGFuZ2VkJzogJ2NoYW5nZWQnLFxuICAgICdpbXBhY3QubGVnZW5kLmluZGlyZWN0JzogJ2luZGlyZWN0JyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5wb3RlbnRpYWwnOiAncG90ZW50aWFsJyxcblxuICAgICdyZXZpZXcudmVyZGljdCc6ICdPcHRpbWFsaXR5IHZlcmRpY3QnLFxuICAgICdyZXZpZXcuaXNzdWVzJzogJ0lzc3VlcycsXG4gICAgJ3Jldmlldy5jbGVhbic6ICdObyBpc3N1ZXMgZm91bmQuJyxcblxuICAgICdub3Rlcy50aXRsZSc6ICdSZXZpZXcgbm90ZXMnLFxuICAgICdub3Rlcy5mb3JtVGl0bGUnOiAnTm90ZSB0aXRsZScsXG4gICAgJ25vdGVzLmZvcm1Db250ZW50JzogJ05vdGUgY29udGVudCAoY29uY2x1c2lvbnMsIHF1ZXN0aW9ucywgbGVhcm5pbmdzXHUyMDI2KScsXG4gICAgJ25vdGVzLmFkZCc6ICdBZGQgbm90ZScsXG4gICAgJ25vdGVzLmJvdW5kVG8nOiAnV2lsbCBiZSBsaW5rZWQgdG8nLFxuICAgICdub3Rlcy5jb2wudGltZSc6ICdUaW1lJyxcbiAgICAnbm90ZXMuY29sLnRpdGxlJzogJ1RpdGxlJyxcbiAgICAnbm90ZXMuY29sLmNvbnRlbnQnOiAnQ29udGVudCcsXG4gICAgJ25vdGVzLmNvbC5zaGEnOiAnQ29tbWl0JyxcbiAgICAnbm90ZXMucmVtb3ZlJzogJ0RlbGV0ZScsXG4gICAgJ25vdGVzLmVtcHR5JzogJ05vIG5vdGVzIHlldC4gTm90ZSBkb3duIGNvbmNsdXNpb25zIGFuZCBxdWVzdGlvbnMgd2hpbGUgcmV2aWV3aW5nIGNvbW1pdHMgXHUyMDE0IHRoYXQgaXMgeW91ciBwcm9qZWN0IGxlYXJuaW5nIGFyY2hpdmUuJyxcblxuICAgICdtZW1vcnkucmVjb3JkJzogJ1JlY29yZCBwcm9qZWN0IG1lbW9yeScsXG4gICAgJ2Zvcm0ubWVtb3J5VGl0bGUnOiAnTWVtb3J5IHRpdGxlJyxcbiAgICAnZm9ybS5tZW1vcnlDb250ZW50JzogJ01lbW9yeSBjb250ZW50ICh3aGF0IGFuZCB3aHkpJyxcbiAgICAnbWVtb3J5LmNvbC50aXRsZSc6ICdJdGVtJyxcbiAgICAnbWVtb3J5LmNvbC50eXBlJzogJ1R5cGUnLFxuICAgICdtZW1vcnkuY29sLnRydXRoJzogJ1RydXRoJyxcbiAgICAnbWVtb3J5LmNvbC5icmFuY2gnOiAnQnJhbmNoJyxcbiAgICAnbWVtb3J5LmNvbmZpcm0nOiAnQ29uZmlybScsXG4gICAgJ21lbW9yeS5lbXB0eSc6ICdObyBwcm9qZWN0IG1lbW9yaWVzIHlldC4gQXNrIHRoZSBBSSBpbiBjaGF0IHRvIHJlY29yZCBvbmUsIG9yIGFkZCBhYm92ZS4nLFxuICAgICdjb25jZXB0cy50aXRsZSc6ICdMZWFybmluZyBjb25jZXB0cycsXG4gICAgJ2NvbmNlcHRzLm5vbmUnOiAnTm8gbGVhcm5pbmcgY29uY2VwdHMgeWV0LiBUaGV5IGFjY3VtdWxhdGUgYWZ0ZXIgc3VjY2Vzc2Z1bCBjaGFuZ2UgcnVucywgb3IgYXNrIHRoZSBBSSB0byBzdW1tYXJpemUgbGVhcm5pbmcgcG9pbnRzLicsXG4gICAgJ2NvbmNlcHRzLmNvbC5uYW1lJzogJ0NvbmNlcHQnLFxuICAgICdjb25jZXB0cy5jb2wuY2F0ZWdvcnknOiAnQ2F0ZWdvcnknLFxuICAgICdjb25jZXB0cy5jb2wuY291bnQnOiAnQ291bnQnLFxuICAgICdyZXZpZXcucmVjb3Jkc1RpdGxlJzogJ1JldmlldyBpc3N1ZXMnLFxuICAgICdyZXZpZXcucmVjb3Jkc0VtcHR5JzogJ05vIGlzc3VlIHJlY29yZHMgeWV0LiBJc3N1ZXMgZm91bmQgYnkgdGhlIGNvbW1pdC1yZXZpZXcgcGFnZSBhcmUgcmVjb3JkZWQgaGVyZSBhdXRvbWF0aWNhbGx5OyByZS1yZXZpZXdpbmcgcmVwbGFjZXMgb2xkIHJlY29yZHMuJyxcbiAgICAndmVyaWZ5LnJlY29yZHMnOiAnVmVyaWZpY2F0aW9uIHJlY29yZHMnLFxuICAgICd2ZXJpZnkucmVjb3Jkc0VtcHR5JzogJ05vIHZlcmlmaWNhdGlvbiByZWNvcmRzIHlldC4gQ2xpY2sgXCJWZXJpZnlcIiBpbiB0aGUgZXhlY3V0aW9uIHRhYiB0byBnZW5lcmF0ZSBvbmUuJyxcblxuICAgICdjb25maXJtZWQudGl0bGUnOiAnQ29uZmlybWVkIGNvbnN0cmFpbnRzIChodW1hbi1jb25maXJtZWQ7IEFJIGVkaXRzIHRvIGZvcmJpZGRlbiBwYXRocyBhcmUgYXV0by1kZW5pZWQpJyxcbiAgICAnY29uZmlybWVkLmFkZCc6ICdBZGQgY29uc3RyYWludCcsXG4gICAgJ2NvbmZpcm1lZC50ZXh0JzogJ1JlcXVpcmVtZW50IC8gY29uc3RyYWludCB0ZXh0JyxcbiAgICAnY29uZmlybWVkLnBhdGhzJzogJ0ZvcmJpZGRlbiBwYXRocyAoY29tbWEgc2VwYXJhdGVkOyByZWxhdGl2ZSB0byBwcm9qZWN0IHJvb3QgbGlrZSBzcmMvY29yZSwgb3IgYWJzb2x1dGUpJyxcbiAgICAnY29uZmlybWVkLm5vbmUnOiAnTm8gY29uc3RyYWludHMgeWV0LiBPbmNlIGFkZGVkLCBBSSBlZGl0cyB0byBmb3JiaWRkZW4gcGF0aHMgaW4gdGhpcyBwcm9qZWN0IGFyZSBhdXRvLWRlbmllZC4nLFxuXG4gICAgJ2NoYW5nZXMudGl0bGUnOiAnQ2hhbmdlIHRhc2tzJyxcbiAgICAnc3RhdGUubm9DaGFuZ2VzJzogJ05vIGNoYW5nZSB0YXNrcyB5ZXQuIEFzayB0aGUgQUkgaW4gY2hhdCB0byBjcmVhdGUgb25lLCBvciB1c2UgXCJDcmVhdGUgY2hhbmdlXCIgYWJvdmUuJyxcbiAgICAnY2hhbmdlcy5jb2wudGl0bGUnOiAnVGl0bGUnLFxuICAgICdjaGFuZ2VzLmNvbC50eXBlJzogJ1R5cGUnLFxuICAgICdjaGFuZ2VzLmNvbC5zdGF0dXMnOiAnU3RhdHVzJyxcbiAgICAnY2hhbmdlcy5jb2wudXBkYXRlZCc6ICdVcGRhdGVkJyxcbiAgICAnZXhlYy5jb2wuc3RhdHVzJzogJ1N0YXR1cycsXG4gICAgJ2V4ZWMuY29sLmNoYW5nZSc6ICdDaGFuZ2UnLFxuICAgICdleGVjLmNvbC5zdGFydGVkJzogJ1N0YXJ0ZWQnLFxuICAgICdleGVjLmNvbC5jb3N0JzogJ0Nvc3QgKGVzdCknLFxuICAgICdleGVjLmF0dGVtcHRzJzogJ0F0dGVtcHRzJyxcbiAgICAnZXhlYy5oaW50JzogJ1J1bnMgKHN0YXJ0X3J1bikgYXJlIHN0YXJ0ZWQgZnJvbSBjaGF0OiBhZnRlciBhIHBsYW4gZXhpc3RzLCB0ZWxsIHRoZSBBSSB0byBcInN0YXJ0IHJ1biBmb3IgdGhlIGNoYW5nZVwiLiBUaGlzIHRhYiBzaG93cyBwcm9ncmVzcyBhbmQgcmVzdWx0cy4nLFxuICAgICdzdGF0ZS5ub1J1bnMnOiAnTm8gcnVucyB5ZXQuJyxcbiAgICAnc3RhdGUudGVjaFN0YWNrJzogJ1RlY2ggc3RhY2snLFxuICAgICdzdGF0ZS5zeW1ib2xzJzogJ0luZGV4ZWQgc3ltYm9scycsXG4gICAgJ3N0YXRlLm1hbmlmZXN0cyc6ICdNYW5pZmVzdHMnLFxuICAgICdzdGF0ZS5ldmlkZW5jZSc6ICdFdmlkZW5jZSBlbnRyaWVzJyxcbiAgfSxcbn0gYXMgY29uc3RcblxuZnVuY3Rpb24gZmFsbGJhY2tUKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgZGljdCA9IFdPUktTUEFDRV9ESUNULnpoIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbiAgcmV0dXJuIGRpY3Rba2V5XSA/PyBrZXlcbn1cblxuLyoqIFx1NjRDRFx1NEY1Q1x1N0VEM1x1Njc5Q1x1NEVCQVx1NjAyN1x1NTMxNlx1RkYxQVx1MjcxMy9cdTI3MTcgKyBcdTY4MDdcdTkxQ0ZcdTVCNTdcdTZCQjVcdTc2ODRcdTdEMjdcdTUxRDFcdTg4NENcdUZGMDhcdThERjNcdThGQzdcdTVENENcdTU5NTdcdTVCRjlcdThDNjFcdTRFMEVcdTUzOUZcdTU5Q0IgSlNPTlx1RkYwOVx1MzAwMiAqL1xuZnVuY3Rpb24gZm9ybWF0QWN0aW9uUmVzdWx0KGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogc3RyaW5nIHtcbiAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW2RhdGFbJ29rJ10gPT09IGZhbHNlID8gJ1x1MjcxNycgOiAnXHUyNzEzJ11cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YSkpIHtcbiAgICBpZiAoa2V5ID09PSAnb2snKSBjb250aW51ZVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIGxpbmVzLnB1c2goYCR7a2V5fVx1RkYxQSR7U3RyaW5nKHZhbHVlKS5zbGljZSgwLCAyMDApfWApXG4gICAgfVxuICB9XG4gIGlmIChsaW5lcy5sZW5ndGggPT09IDEpIGxpbmVzLnB1c2goJ1x1NjIxMFx1NTI5RicpXG4gIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKVxufVxuXG4vKiogTExNIFx1NjIxMFx1NjcyQ1x1RkYwOFx1NEYzMFx1RkYwOVx1NUZCRFx1NjgwN1x1RkYxQVx1NjVFMFx1NTAzQ1x1RkYwOFx1NjcyQVx1NEVBN1x1NzUxRlx1OEMwM1x1NzUyOCAvIFx1NjVFN1x1N0YxM1x1NUI1OFx1NEUwRFx1NUUyNlx1NjIxMFx1NjcyQ1x1RkYwOVx1NjVGNlx1OEZENFx1NTZERSBudWxsIFx1NEUwRFx1NTM2MFx1NEY0RFx1MzAwMiAqL1xuZnVuY3Rpb24gcmVuZGVyQ29zdEJhZGdlKHVzZDogbnVtYmVyIHwgdW5kZWZpbmVkLCB0aXRsZTogc3RyaW5nKTogUmVhY3QuUmVhY3ROb2RlIHtcbiAgaWYgKHVzZCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbFxuICByZXR1cm4gPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOTQ5ZScpfSB0aXRsZT17dGl0bGV9Plx1MjI0OCR7dXNkLnRvRml4ZWQoNCl9PC9zcGFuPlxufVxuXG5jb25zdCBzdHlsZXM6IFJlY29yZDxzdHJpbmcsIFJlYWN0LkNTU1Byb3BlcnRpZXM+ID0ge1xuICByb290OiB7XG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxuICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBmb250RmFtaWx5OiAndmFyKC0tZHMtZm9udC1zYW5zLCBpbmhlcml0KScsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICB9LFxuICBuYXY6IHtcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgZ2FwOiAnNHB4JyxcbiAgICBwYWRkaW5nOiAnOHB4IDEycHgnLFxuICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwxLCByZ2JhKDUsNSw1LDAuMSkpJyxcbiAgICBmbGV4OiAnbm9uZScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXG4gIH0sXG4gIHRpdGxlOiB7IGZvbnRTaXplOiAnMTNweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luSW5saW5lRW5kOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9LFxuICB0YWI6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XG4gICAgcGFkZGluZzogJzVweCAxMnB4JyxcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxuICAgIGJvcmRlcjogJ25vbmUnLFxuICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgLy8gYnV0dG9uLWluZm8tZmlsbCBcdTRFMjRcdTRFM0JcdTk4OThcdTkwRkRcdTg0RERcdUZGMUJicmFuZC1wcmltYXJ5IFx1NTcyOFx1NkRGMVx1ODI3Mlx1NEUzQlx1OTg5OFx1NjYyRlx1OEZEMVx1NzY3RFx1ODI3Mlx1RkYwQ1x1NzY3RFx1NUI1N1x1NEYxQVx1ODhBQlx1NTQxRVx1NjM4OVx1RkYwOFx1OTg3NVx1N0I3RVx1NzY3RFx1NTc1N1x1NEU4Qlx1NjU0NVx1RkYwOVx1MzAwMlxuICAgIGJhY2tncm91bmQ6IGFjdGl2ZSA/ICd2YXIoLS1kc3ctYWxpYXMtYnV0dG9uLWluZm8tZmlsbCwgIzI1NjNlYiknIDogJ3RyYW5zcGFyZW50JyxcbiAgICBjb2xvcjogYWN0aXZlID8gJyNmZmYnIDogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyxcbiAgfSksXG4gIGJvZHk6IHsgZmxleDogMSwgb3ZlcmZsb3dZOiAnYXV0bycsIHBhZGRpbmc6ICcxNHB4IDE2cHgnIH0sXG4gIGNhcmQ6IHtcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxuICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgcGFkZGluZzogJzEycHggMTRweCcsXG4gICAgbWFyZ2luQm90dG9tOiAnMTJweCcsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXG4gIH0sXG4gIHJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzE4cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBmb250U2l6ZTogJzEycHgnLCBtYXJnaW46ICc2cHggMCcgfSxcbiAgbGFiZWw6IHsgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpbklubGluZUVuZDogJzZweCcgfSxcbiAgdGFibGU6IHsgd2lkdGg6ICcxMDAlJywgYm9yZGVyQ29sbGFwc2U6ICdjb2xsYXBzZScsIGZvbnRTaXplOiAnMTJweCcgfSxcbiAgdGg6IHsgdGV4dEFsaWduOiAnc3RhcnQnLCBwYWRkaW5nOiAnNnB4IDhweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwxLCByZ2JhKDUsNSw1LDAuMSkpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGZvbnRXZWlnaHQ6IDUwMCB9LFxuICB0ZDogeyBwYWRkaW5nOiAnNnB4IDhweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwzLCByZ2JhKDUsNSw1LDAuMDYpKScgfSxcbiAgZW1wdHk6IHsgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGZvbnRTaXplOiAnMTJweCcsIHBhZGRpbmc6ICcxMHB4IDRweCcgfSxcbiAgYnV0dG9uOiB7XG4gICAgcGFkZGluZzogJzVweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIC8vIGJ1dHRvbi1pbmZvLWZpbGwgXHU2NjJGXHU1QkJGXHU0RTNCXHU0RTI0XHU0RTJBXHU0RTNCXHU5ODk4XHU0RTBCXHU5MEZEXHU0RTNBXHU4NEREXHU4MjcyXHUzMDAxXHU3NjdEXHU1QjU3XHU1M0VGXHU4QkZCXHU3Njg0XHU0RTNCXHU2NENEXHU0RjVDXHU4MjcyXHVGRjA4YnJhbmQtcHJpbWFyeSBcdTU3MjhcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTY2MkZcdThGRDFcdTc2N0RcdTgyNzJcdUZGMENcdTc2N0RcdTVCNTdcdTRFMERcdTUzRUZcdThCRkJcdUZGMDlcdTMwMDJcbiAgICBmb250U2l6ZTogJzExcHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpJywgY29sb3I6ICcjZmZmJyxcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgfSxcbiAgc2Vjb25kYXJ5OiB7XG4gICAgcGFkZGluZzogJzVweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgY3Vyc29yOiAncG9pbnRlcicsIGZvbnRTaXplOiAnMTFweCcsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxuICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICB9LFxuICBpbnB1dDoge1xuICAgIHdpZHRoOiAnMTAwJScsIHBhZGRpbmc6ICc2cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxuICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICB9LFxuICBmb3JtUm93OiB7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogJzZweCcsIG1hcmdpbkJvdHRvbTogJzhweCcgfSxcbiAgZm9ybUlubGluZTogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc4cHgnIH0sXG4gIC8vIHNlbGVjdCBcdTc1MjhcdTdDRkJcdTdFREZcdTU5MTZcdTg5QzJcdTY1RjYgV2luZG93cyBcdTZENDVcdTgyNzJcdTZBMjFcdTVGMEZcdTRFMEJcdTVGM0FcdTUyMzZcdTc2N0RcdTVFOTVcdUZGMENcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTRFMEJcdTRFMERcdTUzRUZcdThCRkJcdTIwMTRcdTIwMTRcdTgxRUFcdTdFRDhcdTU5MTZcdTg5QzJcdThENzBcdTRFM0JcdTk4OThcdTUzRDhcdTkxQ0ZcdTMwMDJcbiAgc2VsZWN0OiB7XG4gICAgYXBwZWFyYW5jZTogJ25vbmUnLCBXZWJraXRBcHBlYXJhbmNlOiAnbm9uZScsXG4gICAgcGFkZGluZzogJzZweCAyNnB4IDZweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgZm9udFNpemU6ICcxMnB4JyxcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScsXG4gICAgYmFja2dyb3VuZEltYWdlOiAndXJsKFwiZGF0YTppbWFnZS9zdmcreG1sO3V0ZjgsPHN2ZyB4bWxucz0lMjJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyUyMiB3aWR0aD0lMjIxMCUyMiBoZWlnaHQ9JTIyNiUyMj48cGF0aCBkPSUyMk0xIDFsNCA0IDQtNCUyMiBzdHJva2U9JTIyJTIzODg4JTIyIHN0cm9rZS13aWR0aD0lMjIxLjUlMjIgZmlsbD0lMjJub25lJTIyLz48L3N2Zz5cIiknLFxuICAgIGJhY2tncm91bmRSZXBlYXQ6ICduby1yZXBlYXQnLCBiYWNrZ3JvdW5kUG9zaXRpb246ICdyaWdodCA4cHggY2VudGVyJyxcbiAgICBjdXJzb3I6ICdwb2ludGVyJywgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsIG1heFdpZHRoOiAnMTAwJScsXG4gIH0sXG4gIGFjdGlvblJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9LFxuICByZXN1bHQ6IHtcbiAgICB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLCBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjYsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzEwcHggMTJweCcsIG1heEhlaWdodDogJzMyMHB4Jywgb3ZlcmZsb3dZOiAnYXV0bycsXG4gIH0sXG4gIGJhZGdlOiAoY29sb3I6IHN0cmluZyk6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4ge1xuICAgIGNvbnN0IHJnYiA9IHBhcnNlQ29sb3IoY29sb3IpXG4gICAgaWYgKHJnYiA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHsgZGlzcGxheTogJ2lubGluZS1ibG9jaycsIHBhZGRpbmc6ICcxcHggOHB4JywgYm9yZGVyUmFkaXVzOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JywgYmFja2dyb3VuZDogYCR7Y29sb3J9MjJgLCBjb2xvciB9XG4gICAgfVxuICAgIGNvbnN0IFtyLCBnLCBiXSA9IHJnYlxuICAgIC8vIFx1NUU5NVx1ODI3Mlx1N0VERlx1NEUwMCAxNiUgXHU4MjcyXHU4QzAzXHVGRjFCXHU2NTg3XHU1QjU3XHU4MjcyXHU0RTNCXHU5ODk4XHU4MUVBXHU5MDAyXHU1RTk0XHVGRjA4XHU2RDQ1XHU4MjcyXHU2REYxXHU1MzE2XHU1MjMwXHU3NjdEXHU1RTk1XHU1M0VGXHU4QkZCXHVGRjA5XHUzMDAyXG4gICAgcmV0dXJuIHtcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCBwYWRkaW5nOiAnMXB4IDhweCcsIGJvcmRlclJhZGl1czogJzRweCcsIGZvbnRTaXplOiAnMTFweCcsXG4gICAgICBiYWNrZ3JvdW5kOiBgcmdiYSgke3J9LCAke2d9LCAke2J9LCAwLjE2KWAsXG4gICAgICBjb2xvcjogdGhlbWVBd2FyZVRleHQoY29sb3IpLFxuICAgIH1cbiAgfSxcbiAgc2VjdGlvblRpdGxlOiB7IGZvbnRXZWlnaHQ6IDYwMCwgZm9udFNpemU6ICcxMnB4JywgbWFyZ2luQm90dG9tOiAnOHB4JyB9LFxuICB3aGF0OiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNywgbWFyZ2luOiAnNHB4IDAgOHB4JyB9LFxuICBsb2dpY1N0ZXA6IHsgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS44LCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcgfSxcbiAgcmlza0l0ZW06IHsgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS43LCBtYXJnaW46ICcycHggMCcgfSxcbiAgY29tbWl0Um93OiAoYWN0aXZlOiBib29sZWFuKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiAoe1xuICAgIHBhZGRpbmc6ICc4cHggMTBweCcsXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcbiAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICBib3JkZXI6IGFjdGl2ZSA/ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyA6ICcxcHggc29saWQgdHJhbnNwYXJlbnQnLFxuICAgIGJhY2tncm91bmQ6IGFjdGl2ZSA/ICdyZ2JhKDM3LDk5LDIzNSwwLjA2KScgOiAndHJhbnNwYXJlbnQnLFxuICAgIG1hcmdpbkJvdHRvbTogJzRweCcsXG4gIH0pLFxuICBjb21taXRTdWJqZWN0OiB7IGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbGluZUhlaWdodDogMS41LCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgd2hpdGVTcGFjZTogJ25vd3JhcCcgfSxcbiAgY29tbWl0TWV0YTogeyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luVG9wOiAnMnB4JywgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnIH0sXG4gIHBhdGNoOiB7XG4gICAgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIGxpbmVIZWlnaHQ6IDEuNSwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnMTBweCcsIG1heEhlaWdodDogJzMyMHB4Jywgb3ZlcmZsb3dZOiAnYXV0bycsXG4gIH0sXG4gIHRleHRhcmVhOiB7XG4gICAgd2lkdGg6ICcxMDAlJywgcGFkZGluZzogJzhweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgZm9udFNpemU6ICcxMnB4JyxcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScsXG4gICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsIHJlc2l6ZTogJ3ZlcnRpY2FsJywgbGluZUhlaWdodDogMS43LCBmb250RmFtaWx5OiAnaW5oZXJpdCcsXG4gIH0sXG4gIG5vdGVDYXJkOiB7XG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknLFxuICAgIGJvcmRlclJhZGl1czogJzhweCcsIHBhZGRpbmc6ICcxMnB4IDE0cHgnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyxcbiAgfSxcbiAgbm90ZVRpdGxlUm93OiB7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCBnYXA6ICc4cHgnIH0sXG4gIG5vdGVUaXRsZVRleHQ6IHsgZm9udFNpemU6ICcxM3B4JywgZm9udFdlaWdodDogNjAwLCBsaW5lSGVpZ2h0OiAxLjUgfSxcbiAgbm90ZUNvbnRlbnQ6IHtcbiAgICBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjg1LCB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLCB3b3JkQnJlYWs6ICdicmVhay13b3JkJyxcbiAgICBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScsIG1hcmdpblRvcDogJzZweCcsXG4gIH0sXG4gIG5vdGVDbGFtcDoge1xuICAgIGRpc3BsYXk6ICctd2Via2l0LWJveCcsIFdlYmtpdExpbmVDbGFtcDogNiwgV2Via2l0Qm94T3JpZW50OiAndmVydGljYWwnLCBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIH0sXG4gIG5vdGVNZXRhOiB7XG4gICAgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxMHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpblRvcDogJzhweCcsXG4gICAgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsXG4gIH0sXG4gIGxpbmtCdG46IHtcbiAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICcxMXB4JywgcGFkZGluZzogJzAnLFxuICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyxcbiAgfSxcbiAgY2hpcDogKGFjdGl2ZTogYm9vbGVhbik6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4gKHtcbiAgICBwYWRkaW5nOiAnMnB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc5OTlweCcsIGZvbnRTaXplOiAnMTFweCcsIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgLy8gXHU1NDBDIHRhYlx1RkYxQWFjdGl2ZSBcdTU4NkJcdTgyNzJcdTRFMDBcdTVGOEIgYnV0dG9uLWluZm8tZmlsbFx1RkYwOFx1NEUyNFx1NEUzQlx1OTg5OFx1OTBGRFx1ODRERFx1RkYwOVx1RkYwQ1x1Nzk4MVx1NzUyOCBicmFuZC1wcmltYXJ5XHUzMDAyXG4gICAgYmFja2dyb3VuZDogYWN0aXZlID8gJ3ZhcigtLWRzdy1hbGlhcy1idXR0b24taW5mby1maWxsLCAjMjU2M2ViKScgOiAndHJhbnNwYXJlbnQnLFxuICAgIGNvbG9yOiBhY3RpdmUgPyAnI2ZmZicgOiAnaW5oZXJpdCcsXG4gIH0pLFxufVxuXG4vKiogXHU5OENFXHU5NjY5XHU3QjQ5XHU3RUE3IFx1MjE5MiBcdTVGQkRcdTdBRTBcdTk4OUNcdTgyNzJcdTMwMDIgKi9cbmNvbnN0IFJJU0tfQ09MT1I6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7IGxvdzogJyM0ZWM5YjAnLCBtZWRpdW06ICcjZGNkY2FhJywgaGlnaDogJyNjZTkxNzgnLCBjcml0aWNhbDogJyNmMTRjNGMnIH1cblxuLyoqXG4gKiBcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjQgU1ZHIFx1NkQ0MVx1N0EwQlx1NTZGRVx1RkYxQVx1NEUwOVx1NTIxN1x1NTIwNlx1NUM0Mlx1RkYwOFx1NTNEOFx1NjZGNCBcdTIxOTIgXHU5NUY0XHU2M0E1XHU1RjE1XHU3NTI4XHU5NEZFIFx1MjE5MiBcdTZGNUNcdTU3MjhcdUZGMDlcdUZGMENcbiAqIFx1NEY5RFx1NjM2RSAvaW1wYWN0LXNjb3BlIFx1OEZENFx1NTZERVx1NzY4NCBsZXZlbHNcdUZGMDhcdTU0MkJcdTRGMjBcdTY0QURcdTk0RkUgcmVhc29uXHVGRjA5XHU3RUQ4XHU1MjM2XHU4RkRFXHU3RUJGXHUzMDAyXG4gKiBcdTUxNjhcdTVCQkRcdTc1M0JcdTVFMDNcdUZGMDh2aWV3Qm94IDEwMDBcdUZGMDlcdUZGMENcdTgyODJcdTcwQjlcdTVFMjZcdTc2RUVcdTVGNTVcdTYzRDBcdTc5M0FcdUZGMENcdTZERjFcdTVFQTZcdThEOEFcdTZERjFcdTk4OUNcdTgyNzJcdThEOEFcdTZENDVcdTMwMDJcbiAqL1xuZnVuY3Rpb24gSW1wYWN0R3JhcGgocHJvcHM6IHsgZGF0YTogSW1wYWN0U2NvcGVQYXlsb2FkOyB0OiAoa2V5OiBzdHJpbmcpID0+IHN0cmluZyB9KSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gcHJvcHNcbiAgY29uc3QgaW5kaXJlY3QgPSBkYXRhLmxldmVscy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwgPT09ICdpbmRpcmVjdCcpXG4gIGNvbnN0IHBvdGVudGlhbCA9IGRhdGEubGV2ZWxzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5sZXZlbCA9PT0gJ3BvdGVudGlhbCcpXG4gIGNvbnN0IGNvbDAgPSBkYXRhLmNoYW5nZWRGaWxlcy5zbGljZSgwLCA3KVxuICBjb25zdCBjb2wxID0gQXJyYXkuZnJvbShuZXcgU2V0KGluZGlyZWN0Lm1hcCgoaXRlbSkgPT4gaXRlbS5wYXRoKSkpLnNsaWNlKDAsIDkpXG4gIGNvbnN0IGNvbDIgPSBBcnJheS5mcm9tKG5ldyBTZXQocG90ZW50aWFsLm1hcCgoaXRlbSkgPT4gaXRlbS5wYXRoKSkpLmZpbHRlcigocCkgPT4gIWNvbDEuaW5jbHVkZXMocCkpLnNsaWNlKDAsIDgpXG4gIGNvbnN0IG5vZGVIID0gMzBcbiAgY29uc3QgZ2FwID0gMTBcbiAgY29uc3QgY29sWCA9IFszMCwgMzgwLCA3MjBdXG4gIGNvbnN0IGNvbFcgPSAyODBcbiAgY29uc3Qgcm93cyA9IE1hdGgubWF4KGNvbDAubGVuZ3RoLCBjb2wxLmxlbmd0aCwgY29sMi5sZW5ndGgsIDEpXG4gIGNvbnN0IGhlaWdodCA9IHJvd3MgKiAobm9kZUggKyBnYXApICsgNjBcblxuICBjb25zdCBkZXB0aE9mID0gKHBhdGg6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgaXRlbSA9IGluZGlyZWN0LmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5wYXRoID09PSBwYXRoKSA/PyBwb3RlbnRpYWwuZmluZCgoZW50cnkpID0+IGVudHJ5LnBhdGggPT09IHBhdGgpXG4gICAgcmV0dXJuIGl0ZW0/LmRlcHRoID8/IDBcbiAgfVxuXG4gIGNvbnN0IHJlbmRlckNvbCA9IChjb2w6IG51bWJlciwgaXRlbXM6IHN0cmluZ1tdLCBjb2xvcjogc3RyaW5nKTogUmVhY3QuUmVhY3ROb2RlW10gPT4gaXRlbXMubWFwKChwYXRoLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHkgPSA0NCArIGluZGV4ICogKG5vZGVIICsgZ2FwKVxuICAgIGNvbnN0IGRpciA9IHBhdGguaW5jbHVkZXMoJy8nKSA/IHBhdGguc2xpY2UoMCwgcGF0aC5sYXN0SW5kZXhPZignLycpKSA6ICcnXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2cnLCB7IGtleTogYCR7Y29sfS0ke3BhdGh9YCB9LFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgncmVjdCcsIHsgeDogY29sWFtjb2xdLCB5LCB3aWR0aDogY29sVywgaGVpZ2h0OiBub2RlSCwgcng6IDYsIGZpbGw6IGNvbG9yLCBzdHJva2U6ICdyZ2JhKDAsMCwwLDAuMyknLCBzdHJva2VXaWR0aDogMSB9KSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3RleHQnLCB7IHg6IGNvbFhbY29sXSArIDEwLCB5OiB5ICsgMTQsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNzAwLCBmaWxsOiAnI2ZmZmZmZicgfSxcbiAgICAgICAgKHBhdGguc3BsaXQoJy8nKS5wb3AoKSA/PyBwYXRoKS5zbGljZSgwLCAzMCkpLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGV4dCcsIHsgeDogY29sWFtjb2xdICsgMTAsIHk6IHkgKyAyNiwgZm9udFNpemU6IDEwLCBmaWxsOiAncmdiYSgyNTUsMjU1LDI1NSwwLjkyKScgfSxcbiAgICAgICAgZGlyLnNsaWNlKDAsIDQwKSksXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0aXRsZScsIG51bGwsIHBhdGgpLFxuICAgIClcbiAgfSlcblxuICBjb25zdCBjaGFpblN0YXJ0ID0gKHJlYXNvbjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBtYXRjaCA9IHJlYXNvbi5tYXRjaCgvcGF0aDogKC4rKSQvKVxuICAgIGlmIChtYXRjaCA9PT0gbnVsbCkgcmV0dXJuIGRhdGEuY2hhbmdlZEZpbGVzWzBdID8/ICcnXG4gICAgcmV0dXJuIG1hdGNoWzFdIS5zcGxpdCgnIC0+ICcpWzBdID8/IGRhdGEuY2hhbmdlZEZpbGVzWzBdID8/ICcnXG4gIH1cbiAgY29uc3QgaW5kZXhJbiA9IChpdGVtczogc3RyaW5nW10sIHBhdGg6IHN0cmluZyk6IG51bWJlciA9PiBpdGVtcy5pbmRleE9mKHBhdGgpXG4gIGNvbnN0IGNvbE9mID0gKHBhdGg6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gICAgaWYgKGNvbDAuaW5jbHVkZXMocGF0aCkpIHJldHVybiAwXG4gICAgaWYgKGNvbDEuaW5jbHVkZXMocGF0aCkpIHJldHVybiAxXG4gICAgaWYgKGNvbDIuaW5jbHVkZXMocGF0aCkpIHJldHVybiAyXG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICBjb25zdCBlZGdlczogUmVhY3QuUmVhY3ROb2RlW10gPSBbXVxuICBjb25zdCBwdXNoRWRnZSA9IChmcm9tUGF0aDogc3RyaW5nLCB0b1BhdGg6IHN0cmluZywgY29sb3I6IHN0cmluZywga2V5OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBjb25zdCBmcm9tQ29sID0gY29sT2YoZnJvbVBhdGgpXG4gICAgY29uc3QgdG9Db2wgPSBjb2xPZih0b1BhdGgpXG4gICAgaWYgKGZyb21Db2wgPT09IC0xIHx8IHRvQ29sID09PSAtMSB8fCB0b0NvbCA8PSBmcm9tQ29sKSByZXR1cm5cbiAgICBjb25zdCB4MSA9IGNvbFhbZnJvbUNvbF0gKyBjb2xXXG4gICAgY29uc3QgeTEgPSA0NCArIGluZGV4SW4oW2NvbDAsIGNvbDEsIGNvbDJdW2Zyb21Db2xdID8/IFtdLCBmcm9tUGF0aCkgKiAobm9kZUggKyBnYXApICsgbm9kZUggLyAyXG4gICAgY29uc3QgeDIgPSBjb2xYW3RvQ29sXVxuICAgIGNvbnN0IHkyID0gNDQgKyBpbmRleEluKFtjb2wwLCBjb2wxLCBjb2wyXVt0b0NvbF0gPz8gW10sIHRvUGF0aCkgKiAobm9kZUggKyBnYXApICsgbm9kZUggLyAyXG4gICAgZWRnZXMucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KCdwYXRoJywge1xuICAgICAga2V5LCBkOiBgTSAke3gxfSAke3kxfSBDICR7eDEgKyAzMH0gJHt5MX0sICR7eDIgLSAzMH0gJHt5Mn0sICR7eDJ9ICR7eTJ9YCxcbiAgICAgIGZpbGw6ICdub25lJywgc3Ryb2tlOiBjb2xvciwgc3Ryb2tlV2lkdGg6IDEuNiwgb3BhY2l0eTogMC42LFxuICAgIH0pKVxuICB9XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpbmRpcmVjdC5zbGljZSgwLCAyMCkpIHB1c2hFZGdlKGNoYWluU3RhcnQoaXRlbS5yZWFzb24pLCBpdGVtLnBhdGgsIHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JyksIGBlaS0ke2l0ZW0ucGF0aH1gKVxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgcG90ZW50aWFsLnNsaWNlKDAsIDE2KSkgcHVzaEVkZ2UoY2hhaW5TdGFydChpdGVtLnJlYXNvbiksIGl0ZW0ucGF0aCwgdGhlbWVBd2FyZVRleHQoJyM1NzYwNmEnKSwgYGVwLSR7aXRlbS5wYXRofWApXG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIG51bGwsXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3ZnJywgeyB3aWR0aDogJzEwMCUnLCB2aWV3Qm94OiBgMCAwIDEwMjQgJHtoZWlnaHR9YCwgc3R5bGU6IHsgbWF4SGVpZ2h0OiA0ODAgfSB9LFxuICAgICAgW1snXHU1M0Q4XHU2NkY0XHU2NTg3XHU0RUY2JywgMF0sIFsnXHU5NUY0XHU2M0E1XHU1RjcxXHU1NENEXHVGRjA4XHU4QzAxXHU1RjE1XHU3NTI4XHU0RTg2XHU1QjgzXHVGRjA5JywgMV0sIFsnXHU2RjVDXHU1NzI4XHU1RjcxXHU1NENEXHVGRjA4XHU0RThDXHU3RUE3XHU0RjIwXHU2NEFEXHVGRjA5JywgMl1dLm1hcCgoW25hbWUsIGNvbF0pID0+XG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3RleHQnLCB7IGtleTogU3RyaW5nKGNvbCksIHg6IGNvbFhbY29sIGFzIG51bWJlcl0sIHk6IDI0LCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgZmlsbDogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSwgbmFtZSBhcyBzdHJpbmcpKSxcbiAgICAgIHJlbmRlckNvbCgwLCBjb2wwLCAnIzI1NjNlYicpLFxuICAgICAgcmVuZGVyQ29sKDEsIGNvbDEsICcjZDk3NzA2JyksXG4gICAgICByZW5kZXJDb2woMiwgY29sMiwgJyM1NzYwNmEnKSxcbiAgICAgIGVkZ2VzLFxuICAgICksXG4gIClcbn1cblxuY29uc3QgRElGRl9LRVlXT1JEUyA9IC9cXGIocHVibGljfHByaXZhdGV8cHJvdGVjdGVkfGludGVybmFsfHN0YXRpY3x2b2lkfGNsYXNzfHN0cnVjdHxpbnRlcmZhY2V8ZW51bXxuZXd8cmV0dXJufGlmfGVsc2V8Zm9yfGZvcmVhY2h8d2hpbGV8c3dpdGNofGNhc2V8YnJlYWt8Y29udGludWV8dHJ5fGNhdGNofGZpbmFsbHl8dGhyb3d8dXNpbmd8bmFtZXNwYWNlfGltcG9ydHxleHBvcnR8ZnJvbXxjb25zdHxsZXR8dmFyfGFzeW5jfGF3YWl0fGZ1bmN0aW9ufHRoaXN8YmFzZXxzdXBlcnxudWxsfHRydWV8ZmFsc2V8b3ZlcnJpZGV8dmlydHVhbHxhYnN0cmFjdHxzZWFsZWR8cmVhZG9ubHl8cGFyYW1zfG91dHxyZWZ8eWllbGR8dHlwZW9mfGluc3RhbmNlb2Z8aW58b2Z8ZGVmYXVsdHxzdHJpbmd8aW50fGxvbmd8ZG91YmxlfGZsb2F0fGJvb2x8Y2hhcnxkZWNpbWFsfG9iamVjdHxyZWNvcmR8cGFydGlhbHxnZXR8c2V0fHJlcXVpcmV8bW9kdWxlfHR5cGV8aW1wbGVtZW50c3xleHRlbmRzKVxcYi9nXG5cbi8qKiBcdTUzNTVcdTg4NENcdTRFRTNcdTc4MDFcdTlBRDhcdTRFQUVcdUZGMUFcdTZDRThcdTkxQ0EgPiBcdTVCNTdcdTdCMjZcdTRFMzIgPiBcdTUxNzNcdTk1MkVcdTVCNTcvXHU2NTcwXHU1QjU3IFx1NEUwOVx1NUM0Mlx1Nzc0MFx1ODI3Mlx1RkYwOFx1OEY3Qlx1OTFDRlx1NkI2M1x1NTIxOVx1RkYwQ1x1NTkxRlx1NjgzOFx1NjdFNVx1NzUyOFx1RkYwOVx1MzAwMiAqL1xuZnVuY3Rpb24gaGlnaGxpZ2h0Q29kZUxpbmUobGluZTogc3RyaW5nLCBrZXlQcmVmaXg6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdIHtcbiAgY29uc3QgdHJpbW1lZCA9IGxpbmUudHJpbVN0YXJ0KClcbiAgaWYgKHRyaW1tZWQuc3RhcnRzV2l0aCgnLy8nKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJy8vLycpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnKicpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnLyonKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJyMnKSkge1xuICAgIHJldHVybiBbUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsga2V5OiBgJHtrZXlQcmVmaXh9LWNgLCBzdHlsZTogeyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM2YTk5NTUnKSB9IH0sIGxpbmUpXVxuICB9XG4gIGNvbnN0IHBhcnRzID0gbGluZS5zcGxpdCgvKFwiKD86W15cIlxcXFxdfFxcXFwuKSpcInwnKD86W14nXFxcXF18XFxcXC4pKid8YCg/OlteYFxcXFxdfFxcXFwuKSpgKS9nKVxuICByZXR1cm4gcGFydHMubWFwKChwYXJ0LCBpKSA9PiB7XG4gICAgaWYgKGkgJSAyID09PSAxKSByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsga2V5OiBgJHtrZXlQcmVmaXh9LXMke2l9YCwgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2U5MTc4JykgfSB9LCBwYXJ0KVxuICAgIGNvbnN0IHN1YjogUmVhY3QuUmVhY3ROb2RlW10gPSBbXVxuICAgIGxldCBsYXN0ID0gMFxuICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgcGFydC5tYXRjaEFsbChESUZGX0tFWVdPUkRTKSkge1xuICAgICAgaWYgKG1hdGNoLmluZGV4ISA+IGxhc3QpIHN1Yi5wdXNoKHBhcnQuc2xpY2UobGFzdCwgbWF0Y2guaW5kZXgpKVxuICAgICAgc3ViLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsga2V5OiBgJHtrZXlQcmVmaXh9LWske2l9LSR7bWF0Y2guaW5kZXh9YCwgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjNTY5Y2Q2JykgfSB9LCBtYXRjaFswXSkpXG4gICAgICBsYXN0ID0gbWF0Y2guaW5kZXghICsgbWF0Y2hbMF0ubGVuZ3RoXG4gICAgfVxuICAgIGlmIChsYXN0IDwgcGFydC5sZW5ndGgpIHN1Yi5wdXNoKHBhcnQuc2xpY2UobGFzdCkpXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIHsga2V5OiBgJHtrZXlQcmVmaXh9LXAke2l9YCB9LCBzdWIpXG4gIH0pXG59XG5cbi8qKiBcdTlBRDhcdTRFQUVcdTVERUVcdTVGMDJcdTg5QzZcdTU2RkVcdUZGMUFcdTg5RTNcdTY3OTAgdW5pZmllZCBkaWZmXHVGRjBDXHU2MzA5IFx1NTg5RS9cdTUyMjAvXHU1NzU3XHU1OTM0L1x1NEUwQVx1NEUwQlx1NjU4NyBcdTc3NDBcdTgyNzJcdTMwMDIgKi9cbmZ1bmN0aW9uIERpZmZWaWV3KHByb3BzOiB7IHBhdGNoOiBzdHJpbmcgfSkge1xuICBjb25zdCBsaW5lcyA9IHByb3BzLnBhdGNoLnNwbGl0KCdcXG4nKS5maWx0ZXIoKGxpbmUsIGkpID0+ICEobGluZSA9PT0gJycgJiYgaSA9PT0gcHJvcHMucGF0Y2guc3BsaXQoJ1xcbicpLmxlbmd0aCAtIDEpKVxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgIHN0eWxlOiB7XG4gICAgICBmb250RmFtaWx5OiAnQ29uc29sYXMsIG1vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIGxpbmVIZWlnaHQ6IDEuNTUsXG4gICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMCcsIG1heEhlaWdodDogNDIwLCBvdmVyZmxvd1k6ICdhdXRvJywgbWFyZ2luVG9wOiAnNnB4JyxcbiAgICB9LFxuICB9LCBsaW5lcy5tYXAoKGxpbmUsIGkpID0+IHtcbiAgICBjb25zdCBraW5kID0gbGluZS5zdGFydHNXaXRoKCcrKysnKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJy0tLScpID8gJ21ldGEnXG4gICAgICA6IGxpbmUuc3RhcnRzV2l0aCgnQEAnKSA/ICdodW5rJ1xuICAgICAgICA6IGxpbmUuc3RhcnRzV2l0aCgnKycpID8gJ2FkZCdcbiAgICAgICAgICA6IGxpbmUuc3RhcnRzV2l0aCgnLScpID8gJ2RlbCcgOiAnY3R4J1xuICAgIGNvbnN0IGJnID0ga2luZCA9PT0gJ2FkZCcgPyAncmdiYSg0NiwxNjAsNjcsMC4xNCknIDoga2luZCA9PT0gJ2RlbCcgPyAncmdiYSgyNDgsODEsNzMsMC4xMyknIDoga2luZCA9PT0gJ2h1bmsnID8gJ3JnYmEoNTYsMTM5LDI1MywwLjEpJyA6ICd0cmFuc3BhcmVudCdcbiAgICBjb25zdCBjb250ZW50ID0ga2luZCA9PT0gJ21ldGEnIHx8IGtpbmQgPT09ICdodW5rJ1xuICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBzdHlsZTogeyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyMwOTY5ZGEnKSwgZm9udFdlaWdodDogNjAwIH0gfSwgbGluZSlcbiAgICAgIDoga2luZCA9PT0gJ2FkZCcgfHwga2luZCA9PT0gJ2RlbCdcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBzdHlsZTogeyBjb2xvcjogdGhlbWVBd2FyZVRleHQoa2luZCA9PT0gJ2FkZCcgPyAnIzFhN2YzNycgOiAnI2NmMjIyZScpLCBmb250V2VpZ2h0OiA2MDAgfSB9LCBsaW5lWzBdKVxuICAgICAgICA6IG51bGxcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBrZXk6IGksIHN0eWxlOiB7IHBhZGRpbmc6ICcwIDEwcHgnLCBiYWNrZ3JvdW5kOiBiZywgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9IH0sXG4gICAgICBjb250ZW50LFxuICAgICAga2luZCA9PT0gJ2FkZCcgfHwga2luZCA9PT0gJ2RlbCcgPyBoaWdobGlnaHRDb2RlTGluZShsaW5lLnNsaWNlKDEpLCBgbCR7aX1gKSA6IGhpZ2hsaWdodENvZGVMaW5lKGxpbmUsIGBsJHtpfWApLFxuICAgIClcbiAgfSkpXG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWUodmFsdWU6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuICdcdTIwMTQnXG4gIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSkudG9Mb2NhbGVTdHJpbmcoKVxufVxuXG4vKiogXHU0RThDXHU2QjIxXHU3ODZFXHU4QkE0XHU1RjM5XHU3QTk3XHVGRjFBXHU5MDZFXHU3RjY5ICsgXHU1QzQ1XHU0RTJEXHU1MzYxXHU3MjQ3XHVGRjBDXHU1MzcxXHU5NjY5XHU2NENEXHU0RjVDXHVGRjA4XHU1MjIwXHU5NjY0XHU3QjE0XHU4QkIwL1x1NTNEOFx1NjZGNC9cdTdFQTZcdTY3NUZcdUZGMDlcdTUxNzFcdTc1MjhcdUZGMUJhbHQgXHU2M0QwXHU0RjlCXHU3QjJDXHU0RThDXHU3ODZFXHU4QkE0XHU1MkE4XHU0RjVDXHVGRjA4XHU1OTgyXCJcdTUxNDhcdTUxRkFcdTY1QjlcdTY4NDhcIlx1RkYwOVx1MzAwMiAqL1xuZnVuY3Rpb24gQ29uZmlybURpYWxvZyhwcm9wczogeyB0aXRsZTogc3RyaW5nOyBtZXNzYWdlOiBzdHJpbmc7IGRhbmdlcj86IGJvb2xlYW47IGNvbmZpcm1MYWJlbD86IHN0cmluZzsgYWx0PzogeyBsYWJlbDogc3RyaW5nOyBvbkFsdDogKCkgPT4gdm9pZCB9OyBvbkNhbmNlbDogKCkgPT4gdm9pZDsgb25Db25maXJtOiAoKSA9PiB2b2lkIH0pIHtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgJ2RhdGEtdGVzdGlkJzogJ3BjLWNvbmZpcm0tb3ZlcmxheScsXG4gICAgICBzdHlsZToge1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIHpJbmRleDogOTk5LFxuICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgxNSwyMyw0MiwwLjQ1KScsIGJhY2tkcm9wRmlsdGVyOiAnYmx1cigycHgpJyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICBhbmltYXRpb246ICdwY0ZhZGVJbiAwLjE1cyBlYXNlLW91dCcsXG4gICAgICB9LFxuICAgICAgb25DbGljazogcHJvcHMub25DYW5jZWwsXG4gICAgfSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgJ2RhdGEtdGVzdGlkJzogJ3BjLWNvbmZpcm0tY2FyZCcsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgd2lkdGg6IDQwMCwgbWF4V2lkdGg6ICdjYWxjKDEwMHZ3IC0gNDhweCknLFxuICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLCBib3hTaGFkb3c6ICcwIDIwcHggNTBweCByZ2JhKDAsMCwwLDAuMjUpJyxcbiAgICAgICAgICBwYWRkaW5nOiAnMjBweCAyMnB4IDE2cHgnLFxuICAgICAgICAgIG9uQ2xpY2s6IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCkgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsIGdhcDogJzEwcHgnIH0gfSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICB3aWR0aDogMzQsIGhlaWdodDogMzQsIGJvcmRlclJhZGl1czogJzUwJScsIGZsZXhTaHJpbms6IDAsXG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxN3B4JyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogcHJvcHMuZGFuZ2VyID8gJ3JnYmEoMjQ0LDYzLDk0LDAuMTIpJyA6ICdyZ2JhKDM3LDk5LDIzNSwwLjEpJyxcbiAgICAgICAgICAgICAgY29sb3I6IHByb3BzLmRhbmdlciA/IHRoZW1lQXdhcmVUZXh0KCcjZTExZDQ4JykgOiB0aGVtZUF3YXJlVGV4dCgnIzI1NjNlYicpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LCBwcm9wcy5kYW5nZXIgPyAnIScgOiAnPycpLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRTaXplOiAnMTRweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnNnB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknIH0gfSwgcHJvcHMudGl0bGUpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH0gfSwgcHJvcHMubWVzc2FnZSksXG4gICAgICAgICAgKSxcbiAgICAgICAgKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnLCBnYXA6ICcxMHB4JywgbWFyZ2luVG9wOiAnMThweCcsIGZsZXhXcmFwOiAnd3JhcCcgfSB9LFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcbiAgICAgICAgICAgIHN0eWxlOiB7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICc3cHggMThweCcsIGJvcmRlclJhZGl1czogJzhweCcgfSxcbiAgICAgICAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ2FuY2VsLFxuICAgICAgICAgIH0sICdcdTUzRDZcdTZEODgnKSxcbiAgICAgICAgICBwcm9wcy5hbHQgIT09IHVuZGVmaW5lZCAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XG4gICAgICAgICAgICBzdHlsZTogeyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnN3B4IDE4cHgnLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBmb250V2VpZ2h0OiA2MDAgfSxcbiAgICAgICAgICAgIG9uQ2xpY2s6IHByb3BzLmFsdC5vbkFsdCxcbiAgICAgICAgICB9LCBwcm9wcy5hbHQubGFiZWwpLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcbiAgICAgICAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLW9rJyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc3cHggMThweCcsIGJvcmRlclJhZGl1czogJzhweCcsIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNTAwLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBwcm9wcy5kYW5nZXIgPyAnI2UxMWQ0OCcgOiAndmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpJywgY29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5vbkNvbmZpcm0sXG4gICAgICAgICAgfSwgcHJvcHMuY29uZmlybUxhYmVsID8/ICdcdTc4NkVcdThCQTRcdTUyMjBcdTk2NjQnKSxcbiAgICAgICAgKSxcbiAgICAgICksXG4gICAgKSxcbiAgKVxufVxuXG4vKiogXHU5QUE4XHU2N0I2XHU1QzBGXHU1MzYxXHU3MjQ3XHUzMDAyICovXG5mdW5jdGlvbiBDYXJkKHByb3BzOiB7IHRpdGxlPzogUmVhY3QuUmVhY3ROb2RlOyBjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZSB9KSB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiBzdHlsZXMuY2FyZCB9LFxuICAgIHByb3BzLnRpdGxlID09PSB1bmRlZmluZWQgPyBudWxsIDogUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLnNlY3Rpb25UaXRsZSB9LCBwcm9wcy50aXRsZSksXG4gICAgcHJvcHMuY2hpbGRyZW4pXG59XG5cbi8qKlxuICogXHU1REU1XHU0RjVDXHU1M0YwXHU0RTNCXHU3RUM0XHU0RUY2XHVGRjFBXHU1NkRCXHU5ODc1XHU3QjdFXHVGRjA4XHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XHU0RTNBXHU5RUQ4XHU4QkE0XHVGRjA5KyBcdThGNkVcdThCRTJcdTVCQkZcdTRFM0IgQVBJICsgXHU2MzA5XHU5NEFFXHU1MzE2XHU2NENEXHU0RjVDXHUzMDAyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBXb3Jrc3BhY2VGcmFtZShwcm9wczogV29ya3NwYWNlRnJhbWVQcm9wcykge1xuICBjb25zdCB0ID0gcHJvcHMudCA/PyBmYWxsYmFja1RcbiAgY29uc3QgYWN0aXZlUmVmID0gdXNlUmVmKHRydWUpXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYWN0aXZlUmVmLmN1cnJlbnQgPSB0cnVlXG4gICAgcmV0dXJuICgpID0+IHsgYWN0aXZlUmVmLmN1cnJlbnQgPSBmYWxzZSB9XG4gIH0sIFtdKVxuICBjb25zdCBbdGFiLCBzZXRUYWJdID0gdXNlU3RhdGU8VGFiS2V5PignY29tbWl0cycpXG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGU8V29ya3NwYWNlU3RhdGUgfCBudWxsPihudWxsKVxuICBjb25zdCBbbG9hZEVycm9yLCBzZXRMb2FkRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2Jvb3RzdHJhcHBpbmcsIHNldEJvb3RzdHJhcHBpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFthY3Rpb25SZXN1bHQsIHNldEFjdGlvblJlc3VsdF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbY2hhbmdlVGl0bGUsIHNldENoYW5nZVRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbY2hhbmdlRGVzYywgc2V0Q2hhbmdlRGVzY10gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW21lbW9yeVRpdGxlLCBzZXRNZW1vcnlUaXRsZV0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW21lbW9yeUNvbnRlbnQsIHNldE1lbW9yeUNvbnRlbnRdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtjb25maXJtZWRUZXh0LCBzZXRDb25maXJtZWRUZXh0XSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbY29uZmlybWVkUGF0aHMsIHNldENvbmZpcm1lZFBhdGhzXSA9IHVzZVN0YXRlKCcnKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTcyQjZcdTYwMDEgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IFtjb21taXRzRGF0YSwgc2V0Q29tbWl0c0RhdGFdID0gdXNlU3RhdGU8Q29tbWl0c1BheWxvYWQgfCBudWxsPihudWxsKVxuICBjb25zdCBbY29tbWl0c0Vycm9yLCBzZXRDb21taXRzRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3BpY2tlck9wZW4sIHNldFBpY2tlck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtwaWNrZXJGaWx0ZXIsIHNldFBpY2tlckZpbHRlcl0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW3NlbGVjdGVkVGFyZ2V0cywgc2V0U2VsZWN0ZWRUYXJnZXRzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXSlcbiAgY29uc3QgW2RldGFpbHMsIHNldERldGFpbHNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgQ29tbWl0RGV0YWlsUGF5bG9hZD4+KHt9KVxuICAvKiogXHU4OUUzXHU4QkZCXHU0RUZCXHU1MkExXHU3MkI2XHU2MDAxXHVGRjFBcXVldWVkPVx1NjM5Mlx1OTYxRlx1N0I0OVx1NEUzMlx1ODg0Q1x1OTYxRlx1NTIxN1x1RkYwQ3J1bm5pbmc9XHU2QjYzXHU1NzI4XHU4QkY3XHU2QzQyXHVGRjA4XHU1OTFBXHU5MDA5L1x1NjU3NFx1OEY2RVx1NjVGNlx1ODFFQVx1NTJBOFx1OTAxMFx1NEUyQVx1NTIwNlx1Njc5MFx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBbZGV0YWlsU3RhdHVzLCBzZXREZXRhaWxTdGF0dXNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgJ3F1ZXVlZCcgfCAncnVubmluZyc+Pih7fSlcbiAgY29uc3QgZGV0YWlsUXVldWVkQ291bnQgPSBPYmplY3QudmFsdWVzKGRldGFpbFN0YXR1cykuZmlsdGVyKChzdGF0dXMpID0+IHN0YXR1cyA9PT0gJ3F1ZXVlZCcpLmxlbmd0aFxuICBjb25zdCBkZXRhaWxSdW5uaW5nQ291bnQgPSBPYmplY3QudmFsdWVzKGRldGFpbFN0YXR1cykuZmlsdGVyKChzdGF0dXMpID0+IHN0YXR1cyA9PT0gJ3J1bm5pbmcnKS5sZW5ndGhcbiAgY29uc3QgW2ltcGFjdCwgc2V0SW1wYWN0XSA9IHVzZVN0YXRlPEltcGFjdFNjb3BlUGF5bG9hZCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtpbXBhY3RMb2FkaW5nLCBzZXRJbXBhY3RMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbcmV2aWV3cywgc2V0UmV2aWV3c10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBSZXZpZXdQYXlsb2FkPj4oe30pXG4gIGNvbnN0IFtyZXZpZXdMb2FkaW5nLCBzZXRSZXZpZXdMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbZmlsZURpZmZzLCBzZXRGaWxlRGlmZnNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oe30pXG4gIGNvbnN0IFtjb25maXJtRGlhbG9nLCBzZXRDb25maXJtRGlhbG9nXSA9IHVzZVN0YXRlPHsgdGl0bGU6IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nOyBkYW5nZXI/OiBib29sZWFuOyBjb25maXJtTGFiZWw/OiBzdHJpbmc7IGFsdD86IHsgbGFiZWw6IHN0cmluZzsgb25BbHQ6ICgpID0+IHZvaWQgfTsgb25Db25maXJtOiAoKSA9PiB2b2lkIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBbbm90ZXMsIHNldE5vdGVzXSA9IHVzZVN0YXRlPE5vdGVFbnRyeVtdPihbXSlcbiAgY29uc3QgW25vdGVUaXRsZSwgc2V0Tm90ZVRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbm90ZUNvbnRlbnQsIHNldE5vdGVDb250ZW50XSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbm90ZVRhZ3MsIHNldE5vdGVUYWdzXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbZWRpdGluZ05vdGUsIHNldEVkaXRpbmdOb3RlXSA9IHVzZVN0YXRlPHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29udGVudDogc3RyaW5nOyB0YWdzOiBzdHJpbmcgfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtub3RlU2VhcmNoLCBzZXROb3RlU2VhcmNoXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbm90ZUV4cGFuZGVkLCBzZXROb3RlRXhwYW5kZWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KVxuICBjb25zdCBbaXNzdWVzRGF0YSwgc2V0SXNzdWVzRGF0YV0gPSB1c2VTdGF0ZTxJc3N1ZUVudHJ5W10gfCBudWxsPihudWxsKVxuICBjb25zdCBbaXNzdWVTZXZlcml0eUZpbHRlciwgc2V0SXNzdWVTZXZlcml0eUZpbHRlcl0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2lzc3VlU3RhdHVzRmlsdGVyLCBzZXRJc3N1ZVN0YXR1c0ZpbHRlcl0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2lzc3VlRXhwYW5kZWQsIHNldElzc3VlRXhwYW5kZWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KVxuICBjb25zdCBbZml4RXhwYW5kZWQsIHNldEZpeEV4cGFuZGVkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+Pih7fSlcbiAgY29uc3QgW3ZlcmlmeWluZ1RhcmdldCwgc2V0VmVyaWZ5aW5nVGFyZ2V0XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtpc3N1ZUNoZWNrZWQsIHNldElzc3VlQ2hlY2tlZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oe30pXG4gIGNvbnN0IFtiYXRjaFZlcmlmeVN0YXRlLCBzZXRCYXRjaFZlcmlmeVN0YXRlXSA9IHVzZVN0YXRlPHsgZG9uZTogbnVtYmVyOyB0b3RhbDogbnVtYmVyIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBbdHJpYWdlU3RhdGUsIHNldFRyaWFnZVN0YXRlXSA9IHVzZVN0YXRlPHsgcHJvY2Vzc2VkOiBudW1iZXI7IHJlbWFpbmluZzogbnVtYmVyIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBiYXRjaFN0b3BSZWYgPSB1c2VSZWYoZmFsc2UpXG4gIGNvbnN0IFtmaXhUYXNrcywgc2V0Rml4VGFza3NdID0gdXNlU3RhdGU8Rml4VGFza0VudHJ5W10+KFtdKVxuICBjb25zdCBbZml4Q29uY3VycmVuY3ksIHNldEZpeENvbmN1cnJlbmN5XSA9IHVzZVN0YXRlKCczJylcbiAgY29uc3QgW2FpU3VtbWFyaXppbmcsIHNldEFpU3VtbWFyaXppbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtuYXJyYXRpdmUsIHNldE5hcnJhdGl2ZV0gPSB1c2VTdGF0ZTx7IG5hcnJhdGl2ZTogc3RyaW5nOyBjYWNoZWQ6IGJvb2xlYW47IGdlbmVyYXRlZEF0PzogbnVtYmVyOyBjb3N0VXNkPzogbnVtYmVyIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBbbmFycmF0aXZlQnVzeSwgc2V0TmFycmF0aXZlQnVzeV0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW3BlZWssIHNldFBlZWtdID0gdXNlU3RhdGU8eyBwYXRoOiBzdHJpbmc7IGxpbmU6IG51bWJlciB9IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3BlZWtEYXRhLCBzZXRQZWVrRGF0YV0gPSB1c2VTdGF0ZTxQZWVrUGF5bG9hZCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtwZWVrQnVzeSwgc2V0UGVla0J1c3ldID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtuYXJyYXRpdmVFcnJvciwgc2V0TmFycmF0aXZlRXJyb3JdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFttb2RlbFRpZXJzLCBzZXRNb2RlbFRpZXJzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIHsgcHJvdmlkZXI6IHN0cmluZzsgbW9kZWw6IHN0cmluZyB9PiB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFttb2RlbE9wdGlvbnMsIHNldE1vZGVsT3B0aW9uc10gPSB1c2VTdGF0ZTxBcnJheTx7IHByb3ZpZGVyOiBzdHJpbmc7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZyB9Pj4oW10pXG4gIGNvbnN0IFttb2RlbFNhdmluZywgc2V0TW9kZWxTYXZpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFttb2RlbFNhdmVkLCBzZXRNb2RlbFNhdmVkXSA9IHVzZVN0YXRlKGZhbHNlKVxuICAvLyBcdTI1MDBcdTI1MDAgXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHVGRjFBXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0IC8gUnVuIFx1OEJFNlx1NjBDNSAvIFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgW3BsYW5Db25maXJtLCBzZXRQbGFuQ29uZmlybV0gPSB1c2VTdGF0ZTx7IGNoYW5nZUlkOiBzdHJpbmc7IHN0ZXBzOiBQbGFuQ29uZmlybVN0ZXBbXSB9IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3BsYW5CdXN5LCBzZXRQbGFuQnVzeV0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW3J1bkRldGFpbCwgc2V0UnVuRGV0YWlsXSA9IHVzZVN0YXRlPFJ1bkRldGFpbCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtzY2hlZHVsZWREYXRhLCBzZXRTY2hlZHVsZWREYXRhXSA9IHVzZVN0YXRlPFNjaGVkdWxlZFRhc2tFbnRyeVtdIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3NjaGVkTmFtZSwgc2V0U2NoZWROYW1lXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbc2NoZWRPcGVuLCBzZXRTY2hlZE9wZW5dID0gdXNlU3RhdGUodHJ1ZSlcbiAgY29uc3QgW3NjaGVkVHlwZSwgc2V0U2NoZWRUeXBlXSA9IHVzZVN0YXRlKCdyZXZpZXcnKVxuICBjb25zdCBbc2NoZWRUaXRsZSwgc2V0U2NoZWRUaXRsZV0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW3NjaGVkRGVzYywgc2V0U2NoZWREZXNjXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbc2NoZWRJbnRlcnZhbCwgc2V0U2NoZWRJbnRlcnZhbF0gPSB1c2VTdGF0ZSgnMTQ0MCcpXG4gIC8vIFx1MjUwMFx1MjUwMCBcdThCQjBcdTVGQzZcdTk3NjJcdTY3N0ZcdUZGMUFcdTUxNjhcdTkxQ0ZcdTY1NzBcdTYzNkUgLyBcdTU0MENcdTZCNjVcdTYyQTVcdTU0NEEgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IFttZW1vcmllc0RhdGEsIHNldE1lbW9yaWVzRGF0YV0gPSB1c2VTdGF0ZTxNZW1vcmllc1BheWxvYWQgfCBudWxsPihudWxsKVxuICBjb25zdCBbc3luY1JlcG9ydCwgc2V0U3luY1JlcG9ydF0gPSB1c2VTdGF0ZTxTeW5jUmVwb3J0IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW21lbW9yeVNjb3BlLCBzZXRNZW1vcnlTY29wZV0gPSB1c2VTdGF0ZTwncHJvamVjdCcgfCAnYnJhbmNoJz4oJ3Byb2plY3QnKVxuICBjb25zdCBbbWVtb3J5VHlwZSwgc2V0TWVtb3J5VHlwZV0gPSB1c2VTdGF0ZSgnYXJjaGl0ZWN0dXJlX2RlY2lzaW9uJylcbiAgY29uc3QgW21lbW9yeVN5bmNpbmcsIHNldE1lbW9yeVN5bmNpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtleGVjVGl0bGUsIHNldEV4ZWNUaXRsZV0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2V4ZWNNb2RlbCwgc2V0RXhlY01vZGVsXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbZXhlY0Rlc2MsIHNldEV4ZWNEZXNjXSA9IHVzZVN0YXRlKCcnKVxuXG4gIC8qKiBcdTdFREZcdTRFMDAgUE9TVFx1RkYxQVx1NUUyNlx1OEQ4NVx1NjVGNlx1NTE1Q1x1NUU5NVx1RkYwOExMTSBcdTdBRUZcdTcwQjlcdTY3MERcdTUyQTFcdTdBRUYgMTIwcyBcdTRGMUFcdTk2NERcdTdFQTdcdThGRDRcdTU2REVcdUZGMENcdTVCQTJcdTYyMzdcdTdBRUYgMTgwcyBcdTUzRUFcdTUxNUNcdTVFOTVcdTc3MUZcdTZCNjNcdTc2ODRcdTdGNTFcdTdFRENcdTRFMkRcdTY1QURcdUZGMDlcdUZGMENcdTdFRERcdTRFMERcdThCQTlcdThCRjdcdTZDNDJcdTY1RTBcdTk2NTBcdTYzMDJcdThENzdcdTMwMDIgKi9cbiAgY29uc3QgcG9zdCA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCB0aW1lb3V0TXMgPSAxODBfMDAwKTogUHJvbWlzZTx7IG9rOiBib29sZWFuOyBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB9PiA9PiB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKVxuICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiBjb250cm9sbGVyLmFib3J0KCksIHRpbWVvdXRNcylcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChwYXRoLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyAuLi5ib2R5LCBzZXNzaW9uSWQ6IHByb3BzLnNlc3Npb25JZCA/PyAnJyB9KSxcbiAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgIH0pXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICByZXR1cm4geyBvazogcmVzcG9uc2Uub2ssIGRhdGE6IChkYXRhID8/IHt9KSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICB9XG4gIH1cblxuICAvKiogcGVla1x1RkYxQVx1NjI1M1x1NUYwMFx1NjdEMFx1NjU4N1x1NEVGNlx1NjdEMFx1ODg0Q1x1OTY0NFx1OEZEMVx1NzY4NFx1NEVFM1x1NzgwMVx1NEUwQVx1NEUwQlx1NjU4N1x1NkQ2RVx1NUM0Mlx1RkYwOFx1NjcwOVx1NzU0Q1x1N0I0OVx1NUY4NSAxMCBcdTc5RDJcdUZGMDlcdTMwMDIgKi9cbiAgcGVla09wZW5lciA9IChwYXRoOiBzdHJpbmcsIGxpbmU6IG51bWJlcik6IHZvaWQgPT4geyB2b2lkIG9wZW5QZWVrKHBhdGgsIGxpbmUpIH1cbiAgY29uc3Qgb3BlblBlZWsgPSBhc3luYyAocGF0aDogc3RyaW5nLCBsaW5lOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRQZWVrKHsgcGF0aCwgbGluZSB9KVxuICAgIHNldFBlZWtEYXRhKG51bGwpXG4gICAgc2V0UGVla0J1c3kodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKVxuICAgICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgMTBfMDAwKVxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvcGVlaycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHBhdGgsIGxpbmUsIHNlc3Npb25JZDogcHJvcHMuc2Vzc2lvbklkID8/ICcnIH0pLFxuICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgfSlcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0UGVla0RhdGEoZGF0YSBhcyBQZWVrUGF5bG9hZClcbiAgICB9IGNhdGNoIHtcbiAgICAgIHNldFBlZWtEYXRhKHsgZXhpc3RzOiBmYWxzZSB9KVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRQZWVrQnVzeShmYWxzZSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU1REU1XHU0RjVDXHU4RjZFXHU2QjIxXHU1M0Q5XHU0RThCXHVGRjFBXHU1OTFBXHU0RTJBXHU5MDA5XHU0RTJEXHU2M0QwXHU0RUE0XHU0RjVDXHU0RTNBXHU0RTAwXHU0RTJBXHU2NTc0XHU0RjUzXHU4OUUzXHU4QkZCXHVGRjA4XHU3RjEzXHU1QjU4ICsgXHU1M0VGXHU1RjNBXHU1MjM2XHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGxvYWROYXJyYXRpdmUgPSBhc3luYyAoZm9yY2UgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHNoYXMgPSBzZWxlY3RlZFRhcmdldHMuZmlsdGVyKCh0YXJnZXQpID0+IHRhcmdldCAhPT0gJ3dvcmtpbmcnKVxuICAgIGlmIChzaGFzLmxlbmd0aCA8IDIpIHJldHVyblxuICAgIHNldE5hcnJhdGl2ZUJ1c3kodHJ1ZSlcbiAgICBzZXROYXJyYXRpdmVFcnJvcignJylcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvd29yay1uYXJyYXRpdmUnLCB7IHNoYXMsIGZvcmNlIH0pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldE5hcnJhdGl2ZUVycm9yKFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldE5hcnJhdGl2ZSh7XG4gICAgICAgIG5hcnJhdGl2ZTogU3RyaW5nKGRhdGFbJ25hcnJhdGl2ZSddID8/ICcnKSxcbiAgICAgICAgY2FjaGVkOiBkYXRhWydjYWNoZWQnXSA9PT0gdHJ1ZSxcbiAgICAgICAgZ2VuZXJhdGVkQXQ6IGRhdGFbJ2dlbmVyYXRlZEF0J10gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IE51bWJlcihkYXRhWydnZW5lcmF0ZWRBdCddKSxcbiAgICAgICAgY29zdFVzZDogZGF0YVsnY29zdFVzZCddID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBOdW1iZXIoZGF0YVsnY29zdFVzZCddKSxcbiAgICAgIH0pXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldE5hcnJhdGl2ZUVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TmFycmF0aXZlQnVzeShmYWxzZSlcbiAgICB9XG4gIH1cbiAgLy8gXHU3RUNGIHJlZiBcdTY2QjRcdTk3MzJcdTY3MDBcdTY1QjBcdTk1RURcdTUzMDVcdUZGMUFcdTVFNzZcdTUzRDFcdTZDNjBcdTYzOTJcdTdBN0FcdTg5RTZcdTUzRDFcdTgxRUFcdTUyQThcdTUzRDlcdTRFOEJcdTY1RjZcdThCRkJcdTUzRDZcdTc2ODRcdTY2MkZcdTY3MDBcdTY1QjAgc2VsZWN0ZWRUYXJnZXRzXHUzMDAyXG4gIHVzZUVmZmVjdCgoKSA9PiB7IGxvYWROYXJyYXRpdmVSZWYuY3VycmVudCA9ICgpID0+IHsgdm9pZCBsb2FkTmFycmF0aXZlKCkgfSB9KVxuXG4gIC8qKiBcdTYyNzlcdTkxQ0ZcdTUyRkVcdTkwMDlcdTYzRDBcdTRFQTRcdUZGMDhcdTY1QjBcdTU4OUVcdTc2ODRcdTkwMTBcdTY3NjFcdTg5RTZcdTUzRDEgQUkgXHU4OUUzXHU4QkZCXHVGRjBDXHU1REYyXHU2NzA5XHU3Njg0XHU4RDcwXHU3RjEzXHU1QjU4XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHNlbGVjdENvbW1pdHMgPSAoc2hhczogc3RyaW5nW10pOiB2b2lkID0+IHtcbiAgICBjb25zdCBhZGRlZCA9IHNoYXMuZmlsdGVyKChzaGEpID0+ICFzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoc2hhKSlcbiAgICBzZXRTZWxlY3RlZFRhcmdldHMoKHByZXZpb3VzKSA9PiBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLnByZXZpb3VzLCAuLi5zaGFzXSkpKVxuICAgIGZvciAoY29uc3Qgc2hhIG9mIGFkZGVkKSBsb2FkRGV0YWlsKHNoYSwgZmFsc2UpXG4gIH1cblxuICAvKiogXHU0RTAwXHU5NTJFXHU2RDg4XHU1MzE2XHVGRjFBXHU5MDA5XHU0RTJEXHU1MTY4XHU5MEU4XHU2NzJBXHU2RDg4XHU1MzE2XHU2M0QwXHU0RUE0IFx1MjE5MiBcdTYyNzlcdTkxQ0ZcdTg5RTNcdThCRkIgXHUyMTkyIFx1NjM5Mlx1N0E3QVx1NTQwRVx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1NjU3NFx1NEY1M1x1NTNEOVx1NEU4Qlx1MzAwMiAqL1xuICBjb25zdCBkaWdlc3RBbGwgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc2hhcyA9IChjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSkuZmlsdGVyKChjb21taXQpID0+IGlzVW5kaWdlc3RlZChjb21taXQpKS5tYXAoKGNvbW1pdCkgPT4gY29tbWl0LnNoYSlcbiAgICBpZiAoc2hhcy5sZW5ndGggPT09IDApIHJldHVyblxuICAgIHNldEltcGFjdChudWxsKVxuICAgIHNldFJldmlld3Moe30pXG4gICAgY29uc3QgbmVlZHNGZXRjaCA9IHNoYXMuc29tZSgoc2hhKSA9PiAhc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHNoYSkpXG4gICAgc2VsZWN0Q29tbWl0cyhzaGFzKVxuICAgIGlmIChuZWVkc0ZldGNoKSB7XG4gICAgICBhdXRvTmFycmF0aXZlUmVmLmN1cnJlbnQgPSBzaGFzLmxlbmd0aCA+PSAyXG4gICAgfSBlbHNlIGlmIChzaGFzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAvLyBcdTUxNjhcdTkwRThcdTVERjJcdTU3MjhcdTkwMDlcdTRFMkRcdTk2QzZcdTU0MDhcdTRFMTRcdTg5RTNcdThCRkJcdTk2MUZcdTUyMTdcdTdBN0FcdTk1RjJcdUZGMUFcdTc2RjRcdTYzQTVcdTc1MUZcdTYyMTBcdTUzRDlcdTRFOEJcdUZGMDhcdTdCNDlcdTRFMDBcdTYyQ0RcdThCQTkgc3RhdGUgXHU4NDNEXHU1NzMwXHVGRjA5XHUzMDAyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgbG9hZE5hcnJhdGl2ZVJlZi5jdXJyZW50KCkgfSwgMClcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb21taXRzUmVxdWVzdFJlZiA9IHVzZVJlZigwKVxuICBjb25zdCBsb2FkQ29tbWl0cyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gKytjb21taXRzUmVxdWVzdFJlZi5jdXJyZW50XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbW1pdHM/c2Vzc2lvbklkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJyl9JmxpbWl0PTYwYClcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcigoZGF0YSBhcyB7IGVycm9yPzogc3RyaW5nIH0pLmVycm9yID8/IGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApXG4gICAgICBpZiAoIWFjdGl2ZVJlZi5jdXJyZW50IHx8IHJlcXVlc3QgIT09IGNvbW1pdHNSZXF1ZXN0UmVmLmN1cnJlbnQpIHJldHVyblxuICAgICAgc2V0Q29tbWl0c0RhdGEoZGF0YSBhcyBDb21taXRzUGF5bG9hZClcbiAgICAgIHNldENvbW1pdHNFcnJvcihudWxsKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBpZiAoIWFjdGl2ZVJlZi5jdXJyZW50IHx8IHJlcXVlc3QgIT09IGNvbW1pdHNSZXF1ZXN0UmVmLmN1cnJlbnQpIHJldHVyblxuICAgICAgc2V0Q29tbWl0c0RhdGEobnVsbClcbiAgICAgIHNldENvbW1pdHNFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZE5vdGVzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcz9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXROb3RlcygoZGF0YSBhcyB7IG5vdGVzOiBOb3RlRW50cnlbXSB9KS5ub3RlcyA/PyBbXSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1N0IxNFx1OEJCMFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2Mlx1RkYxQVx1NTIxN1x1ODg2OFx1NEZERFx1NjMwMVx1NTM5Rlx1NjgzN1x1MzAwMlxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTUyRkVcdTkwMDkvXHU1M0Q2XHU2RDg4XHU0RTAwXHU2QjIxXHU2M0QwXHU0RUE0XHVGRjFBXHU5MUNEXHU3Qjk3XHU5MDA5XHU0RTJEXHU5NkM2XHU1NDA4XHVGRjBDXHU1RTc2XHU2MzA5XHU5NzAwXHU4ODY1XHU5RjUwXHU2QkNGXHU2NzYxXHU2M0QwXHU0RUE0XHU3Njg0IEFJIFx1ODlFM1x1OEJGQlx1RkYwOFx1NjcwRFx1NTJBMVx1N0FFRlx1NjcwOVx1N0YxM1x1NUI1OFx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCB0b2dnbGVUYXJnZXQgPSBhc3luYyAodGFyZ2V0OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRTZWxlY3RlZFRhcmdldHMoKHByZXZpb3VzKSA9PiB7XG4gICAgICBpZiAocHJldmlvdXMuaW5jbHVkZXModGFyZ2V0KSkgcmV0dXJuIHByZXZpb3VzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gdGFyZ2V0KVxuICAgICAgcmV0dXJuIFsuLi5wcmV2aW91cywgdGFyZ2V0XVxuICAgIH0pXG4gICAgc2V0SW1wYWN0KG51bGwpXG4gICAgc2V0UmV2aWV3cyh7fSlcbiAgICBpZiAoIXNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyh0YXJnZXQpKSB7XG4gICAgICBsb2FkRGV0YWlsKHRhcmdldCwgZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NjU3NFx1OEY2RVx1OTAwOVx1NjJFOVx1RkYxQVx1NjU3NFx1OEY2RVx1NURGMlx1OTAwOVx1NjVGNlx1NTE4RFx1NzBCOSA9IFx1NTNENlx1NkQ4OFx1NjU3NFx1OEY2RVx1RkYxQlx1NjVCMFx1NTJGRVx1OTAwOVx1NzY4NFx1NjNEMFx1NEVBNFx1NTQwNFx1ODFFQVx1NjJDOVx1NTNENiBBSSBcdTg5RTNcdThCRkJcdTMwMDIgKi9cbiAgY29uc3Qgc2VsZWN0Um91bmQgPSAoc2hhczogc3RyaW5nW10pOiB2b2lkID0+IHtcbiAgICBzZXRJbXBhY3QobnVsbClcbiAgICBzZXRSZXZpZXdzKHt9KVxuICAgIGlmIChzaGFzLmV2ZXJ5KChzaGEpID0+IHNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhzaGEpKSkge1xuICAgICAgc2V0U2VsZWN0ZWRUYXJnZXRzKChwcmV2aW91cykgPT4gcHJldmlvdXMuZmlsdGVyKChzaGEpID0+ICFzaGFzLmluY2x1ZGVzKHNoYSkpKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IGFkZGVkID0gc2hhcy5maWx0ZXIoKHNoYSkgPT4gIXNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhzaGEpKVxuICAgIHNldFNlbGVjdGVkVGFyZ2V0cygocHJldmlvdXMpID0+IEFycmF5LmZyb20obmV3IFNldChbLi4ucHJldmlvdXMsIC4uLnNoYXNdKSkpXG4gICAgZm9yIChjb25zdCBzaGEgb2YgYWRkZWQpIGxvYWREZXRhaWwoc2hhLCBmYWxzZSlcbiAgfVxuXG4gIC8qKiBcdTg5RTNcdThCRkJcdTVFNzZcdTUzRDFcdTZDNjBcdUZGMUFcdTZBMjFcdTU3OEJcdTdGNTFcdTUxNzNcdTVFNzZcdTUzRDFcdTY3MDlcdTk2NTBcdUZGMENcdTU5MUFcdTkwMDkvXHU2NTc0XHU4RjZFXHU2Mjc5XHU5MUNGXHU1MkZFXHU5MDA5XHU2NUY2XHU2MzA5XHU0RTBBXHU5NjUwXHU1RTc2XHU1M0QxXHU1MjA2XHU2NzkwXHVGRjA4XHU5RUQ4XHU4QkE0XHU2NzAwXHU1OTFBIDMgXHU0RTJBXHU1NDBDXHU2NUY2XHVGRjA5XHVGRjBDXHU4RDg1XHU1MUZBXHU3Njg0XHU2MzkyXHU5NjFGXHU3QjQ5XHU1Rjg1XHU1RTc2XHU2NjNFXHU3OTNBXHU5NjFGXHU1MjE3XHU2NTcwXHUzMDAyICovXG4gIGNvbnN0IE1BWF9ERVRBSUxfQ09OQ1VSUkVOQ1kgPSAzXG4gIGNvbnN0IGRldGFpbFBvb2xSZWYgPSB1c2VSZWY8eyBwZW5kaW5nOiBBcnJheTx7IHRhcmdldDogc3RyaW5nOyBmb3JjZTogYm9vbGVhbiB9PjsgYWN0aXZlOiBudW1iZXIgfT4oeyBwZW5kaW5nOiBbXSwgYWN0aXZlOiAwIH0pXG4gIGNvbnN0IGRldGFpbEluRmxpZ2h0UmVmID0gdXNlUmVmKG5ldyBTZXQ8c3RyaW5nPigpKVxuICAvKiogXHU0RTAwXHU5NTJFXHU2RDg4XHU1MzE2XHVGRjFBXHU1MTY4XHU5MEU4XHU4OUUzXHU4QkZCXHU4REQxXHU1QjhDXHU1NDBFXHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwXHU2NTc0XHU0RjUzXHU1M0Q5XHU0RThCXHVGRjA4XHU3RUNGIHJlZiBcdTUzRDZcdTY3MDBcdTY1QjBcdTk1RURcdTUzMDVcdUZGMENcdTkwN0ZcdTUxNEQgc2VsZWN0ZWRUYXJnZXRzIFx1OEZDN1x1NjcxRlx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBhdXRvTmFycmF0aXZlUmVmID0gdXNlUmVmKGZhbHNlKVxuICBjb25zdCBsb2FkTmFycmF0aXZlUmVmID0gdXNlUmVmPCgpID0+IHZvaWQ+KCgpID0+IHt9KVxuXG4gIGNvbnN0IHB1bXBEZXRhaWxQb29sID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHBvb2wgPSBkZXRhaWxQb29sUmVmLmN1cnJlbnRcbiAgICBpZiAocG9vbC5hY3RpdmUgPT09IDAgJiYgcG9vbC5wZW5kaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKGF1dG9OYXJyYXRpdmVSZWYuY3VycmVudCAmJiBhY3RpdmVSZWYuY3VycmVudCkge1xuICAgICAgICBhdXRvTmFycmF0aXZlUmVmLmN1cnJlbnQgPSBmYWxzZVxuICAgICAgICBsb2FkTmFycmF0aXZlUmVmLmN1cnJlbnQoKVxuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHdoaWxlIChhY3RpdmVSZWYuY3VycmVudCAmJiBwb29sLmFjdGl2ZSA8IE1BWF9ERVRBSUxfQ09OQ1VSUkVOQ1kgJiYgcG9vbC5wZW5kaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGpvYiA9IHBvb2wucGVuZGluZy5zaGlmdCgpIVxuICAgICAgcG9vbC5hY3RpdmUgKz0gMVxuICAgICAgdm9pZCBsb2FkRGV0YWlsT25jZShqb2IudGFyZ2V0LCBqb2IuZm9yY2UpXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7fSlcbiAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgIHBvb2wuYWN0aXZlIC09IDFcbiAgICAgICAgICBwdW1wRGV0YWlsUG9vbCgpXG4gICAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZERldGFpbCA9ICh0YXJnZXQ6IHN0cmluZywgZm9yY2U6IGJvb2xlYW4pOiB2b2lkID0+IHtcbiAgICBpZiAoZGV0YWlsSW5GbGlnaHRSZWYuY3VycmVudC5oYXModGFyZ2V0KSkgcmV0dXJuXG4gICAgZGV0YWlsSW5GbGlnaHRSZWYuY3VycmVudC5hZGQodGFyZ2V0KVxuICAgIHNldERldGFpbFN0YXR1cygocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBbdGFyZ2V0XTogJ3F1ZXVlZCcgfSkpXG4gICAgZGV0YWlsUG9vbFJlZi5jdXJyZW50LnBlbmRpbmcucHVzaCh7IHRhcmdldCwgZm9yY2UgfSlcbiAgICBwdW1wRGV0YWlsUG9vbCgpXG4gIH1cblxuICAvKiogXHU5NjFGXHU1MjE3XHU0RUZCXHU1MkExXHU0RjUzXHVGRjFBXHU3NzFGXHU2QjYzXHU1M0QxXHU4RDc3XHU4OUUzXHU4QkZCXHU4QkY3XHU2QzQyXHVGRjFCXHU0RUZCXHU0RjU1XHU1OTMxXHU4RDI1XHVGRjA4XHU3RjUxXHU3RURDXHU0RTJEXHU2NUFEL1x1OEQ4NVx1NjVGNi9cdTY3MERcdTUyQTFcdTY3MkFcdThGRDBcdTg4NENcdUZGMDlcdTkwRkRcdTUxOTlcdTUxNjVcdTUzNjFcdTcyNDdcdTk1MTlcdThCRUZcdTUzNjBcdTRGNERcdUZGMENcdTdFRERcdTRFMERcdTY1RTBcdTk2NTBcdThGNkNcdTU3MDhcdTMwMDIgKi9cbiAgY29uc3QgbG9hZERldGFpbE9uY2UgPSBhc3luYyAodGFyZ2V0OiBzdHJpbmcsIGZvcmNlOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0RGV0YWlsU3RhdHVzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFt0YXJnZXRdOiAncnVubmluZycgfSkpXG4gICAgY29uc3QgZmFpbFBsYWNlaG9sZGVyID0gKG1lc3NhZ2U6IHN0cmluZyk6IENvbW1pdERldGFpbFBheWxvYWQgPT5cbiAgICAgICh7XG4gICAgICAgIHNoYTogdGFyZ2V0LFxuICAgICAgICBpc1dvcmtpbmc6IHRhcmdldCA9PT0gJ3dvcmtpbmcnLFxuICAgICAgICBmaWxlczogW10sXG4gICAgICAgIGluc2VydGlvbnM6IDAsXG4gICAgICAgIGRlbGV0aW9uczogMCxcbiAgICAgICAgcGF0Y2hUcnVuY2F0ZWQ6IGZhbHNlLFxuICAgICAgICBwYXRjaDogJycsXG4gICAgICAgIGNvbW1pdDogbnVsbCxcbiAgICAgICAgYW5hbHlzaXM6IHsgd2hhdDogbWVzc2FnZSwgbG9naWM6IFtdLCByaXNrczogW10gfSxcbiAgICAgIH0pIGFzIHVua25vd24gYXMgQ29tbWl0RGV0YWlsUGF5bG9hZFxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9jb21taXQtZGV0YWlsJywgeyBzaGE6IHRhcmdldCwgZm9yY2UgfSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0RGV0YWlscygocHJldmlvdXMpID0+ICh7XG4gICAgICAgICAgLi4ucHJldmlvdXMsXG4gICAgICAgICAgW3RhcmdldF06IGZhaWxQbGFjZWhvbGRlcignQUkgXHU4OUUzXHU4QkZCXHU1OTMxXHU4RDI1XHVGRjFBJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICcnKSArICdcdUZGMDhcdTcwQjlcdTMwMENcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdTMwMERcdTUzRUZcdTkxQ0RcdThCRDVcdUZGMDknKSxcbiAgICAgICAgfSkpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0RGV0YWlscygocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBbdGFyZ2V0XTogZGF0YSBhcyB1bmtub3duIGFzIENvbW1pdERldGFpbFBheWxvYWQgfSkpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IHJlYXNvbiA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKVxuICAgICAgc2V0RGV0YWlscygocHJldmlvdXMpID0+ICh7XG4gICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICBbdGFyZ2V0XTogZmFpbFBsYWNlaG9sZGVyKGBBSSBcdTg5RTNcdThCRkJcdTU5MzFcdThEMjVcdUZGMUEke3JlYXNvbiA9PT0gJ1RoZSB1c2VyIGFib3J0ZWQgYSByZXF1ZXN0LicgPyAnXHU4QkY3XHU2QzQyXHU4RDg1XHU2NUY2XHU2MjE2XHU2NzBEXHU1MkExXHU0RTJEXHU2NUFEJyA6IHJlYXNvbn1cdUZGMDhcdTY4QzBcdTY3RTUgZHNoIFx1NjYyRlx1NTQyNlx1NTcyOFx1OEZEMFx1ODg0Q1x1RkYxQlx1NzBCOVx1MzAwQ1x1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1MzAwRFx1NTNFRlx1OTFDRFx1OEJENVx1RkYwOWApLFxuICAgICAgfSkpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGRldGFpbEluRmxpZ2h0UmVmLmN1cnJlbnQuZGVsZXRlKHRhcmdldClcbiAgICAgIHNldERldGFpbFN0YXR1cygocHJldmlvdXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfVxuICAgICAgICBkZWxldGUgbmV4dFt0YXJnZXRdXG4gICAgICAgIHJldHVybiBuZXh0XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWRJbXBhY3QgPSBhc3luYyAoZm9yY2UgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICBzZXRJbXBhY3RMb2FkaW5nKHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2ltcGFjdC1zY29wZScsIHsgc2hhczogc2VsZWN0ZWRUYXJnZXRzLCBmb3JjZSB9KVxuICAgICAgc2V0SW1wYWN0KG9rID8gKGRhdGEgYXMgdW5rbm93biBhcyBJbXBhY3RTY29wZVBheWxvYWQpIDogbnVsbClcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SW1wYWN0TG9hZGluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkUmV2aWV3cyA9IGFzeW5jIChmb3JjZSA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDApIHJldHVyblxuICAgIHNldFJldmlld0xvYWRpbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgZm9yIChjb25zdCB0YXJnZXQgb2Ygc2VsZWN0ZWRUYXJnZXRzKSB7XG4gICAgICAgIGlmICghYWN0aXZlUmVmLmN1cnJlbnQpIGJyZWFrXG4gICAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3JldmlldycsIHsgc2hhOiB0YXJnZXQsIGZvcmNlIH0pXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBkYXRhIGFzIHVua25vd24gYXMgUmV2aWV3UGF5bG9hZFxuICAgICAgICBzZXRSZXZpZXdzKChwcmV2aW91cykgPT4gKHtcbiAgICAgICAgICAuLi5wcmV2aW91cyxcbiAgICAgICAgICBbdGFyZ2V0XTogb2sgPyBwYXlsb2FkIDoge1xuICAgICAgICAgICAgaXNzdWVzRm91bmQ6IDAsXG4gICAgICAgICAgICBpc3N1ZXM6ICcnLFxuICAgICAgICAgICAgdmVyZGljdDogJ1x1OEJDNFx1NUJBMVx1NTkzMVx1OEQyNVx1RkYxQScgKyBTdHJpbmcocGF5bG9hZFsnZXJyb3InXSA/PyAnJykgKyAnXHVGRjA4XHU1M0VGXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwXHU5MUNEXHU4QkQ1XHVGRjA5JyxcbiAgICAgICAgICAgIGlzc3VlTGlzdDogW10sXG4gICAgICAgICAgICBjYWNoZWQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pKVxuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRSZXZpZXdMb2FkaW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWRGaWxlRGlmZiA9IGFzeW5jIChzaGE6IHN0cmluZywgcGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3Qga2V5ID0gYCR7c2hhfXwke3BhdGh9YFxuICAgIGlmIChmaWxlRGlmZnNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZXRGaWxlRGlmZnMoKHByZXZpb3VzKSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH1cbiAgICAgICAgZGVsZXRlIG5leHRba2V5XVxuICAgICAgICByZXR1cm4gbmV4dFxuICAgICAgfSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2ZpbGUtZGlmZicsIHsgc2hhLCBwYXRoIH0pXG4gICAgc2V0RmlsZURpZmZzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFtrZXldOiBTdHJpbmcoZGF0YVsncGF0Y2gnXSA/PyAnJykgfSkpXG4gIH1cblxuICBjb25zdCBsb2FkSXNzdWVzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXM/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIC8vIFx1OEY2RVx1OEJFMlx1NTIzN1x1NjVCMFx1NEUwRFx1NkUwNVx1N0E3QVx1NTJGRVx1OTAwOVx1RkYxQVx1NTJGRVx1OTAwOVx1OTUyRVx1OTY4Rlx1OTVFRVx1OTg5OCBpZCBcdThENzBcdUZGMENcdTVERjJcdTZEODhcdTU5MzFcdTc2ODQgaWQgXHU0RTBEXHU1RjcxXHU1NENEXHU2NjNFXHU3OTNBXHUzMDAyXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldElzc3Vlc0RhdGEoKGRhdGEgYXMgeyBpc3N1ZXM6IElzc3VlRW50cnlbXSB9KS5pc3N1ZXMgPz8gW10pXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTk1RUVcdTk4OThcdTUyMTdcdTg4NjhcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcdUZGMUFcdTUyMTdcdTg4NjhcdTRGRERcdTYzMDFcdTUzOUZcdTY4MzdcdTMwMDJcbiAgICB9XG4gIH1cblxuICAvLyBSZXZpZXcgXHU5ODc1XHU3QjdFXHU1QjlFXHU2NUY2XHU1NDBDXHU2QjY1XHVGRjFBXHU0RkVFXHU1OTBEXHU1QjUwXHU0RUUzXHU3NDA2XHU1NkRFXHU1MTk5XHU3MkI2XHU2MDAxXHU1NDBFXHVGRjBDXHU3NzBCXHU2NzdGIDQgXHU3OUQyXHU1MTg1XHU4RERGXHU0RTBBXHUzMDAyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHRhYiAhPT0gJ3JldmlldycpIHJldHVyblxuICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB2b2lkIGxvYWRJc3N1ZXMoKTsgdm9pZCBsb2FkRml4U3RhdHVzKCkgfSwgNDAwMClcbiAgICByZXR1cm4gKCkgPT4geyBjbGVhckludGVydmFsKHRpbWVyKSB9XG4gIH0sIFt0YWIsIHByb3BzLnNlc3Npb25JZF0pXG5cbiAgLyoqIFx1NjJDOVx1NTNENlx1NEZFRVx1NTkwRFx1NkQzRVx1NTNEMVx1NEVGQlx1NTJBMVx1NzJCNlx1NjAwMVx1RkYwOFJldmlldyBcdTk4NzVcdThGNkVcdThCRTJcdUZGMUJcdTY3MDlcdTZEM0JcdTUyQThcdTRFRkJcdTUyQTFcdTY1RjZcdTlBNzFcdTUyQThcdTUyMzdcdTY1QjBcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgbG9hZEZpeFN0YXR1cyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvZml4L3N0YXR1cz9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgICAgc2V0Rml4VGFza3MoKGRhdGEgYXMgeyB0YXNrczogRml4VGFza0VudHJ5W10gfSkudGFza3MgPz8gW10pXG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTcyQjZcdTYwMDFcdTYyQzlcdTUzRDZcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcdTMwMDJcbiAgICB9XG4gIH1cblxuICAvKiogXHU2RDNFXHU1M0QxXHU0RkVFXHU1OTBEXHVGRjFBcGxhbklkcz1cdTYyNzlcdTUxQzZcdTc2ODRcdTVGODVcdThCQzRcdTVCQTFcdTY1QjlcdTY4NDhcdUZGMUJpc3N1ZUlkcz1cdTVGODVcdTU5MDRcdTc0MDZcdTk1RUVcdTk4OThcdUZGMDhtb2RlPWZpeCBcdTRGRUVcdTU5MEQgLyBwbGFuIFx1NTNFQVx1OEJGQlx1NTFGQVx1NjVCOVx1Njg0OFx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBkaXNwYXRjaEZpeCA9IGFzeW5jIChwbGFuSWRzOiBzdHJpbmdbXSwgaXNzdWVJZHM6IHN0cmluZ1tdLCBtb2RlOiAnZml4JyB8ICdwbGFuJyA9ICdmaXgnKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHBsYW5JZHMubGVuZ3RoID09PSAwICYmIGlzc3VlSWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIHQoJ2ZpeC5kaXNwYXRjaEVtcHR5JykpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvZml4L2Rpc3BhdGNoJywgeyBwbGFuSWRzLCBpc3N1ZUlkcywgbW9kZSB9KVxuICAgIGlmIChvaykge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgJyArIHQoJ2ZpeC5kaXNwYXRjaERvbmUnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoZGF0YVsnYWNjZXB0ZWQnXSA/PyAwKSkucmVwbGFjZSgne2N9JywgU3RyaW5nKGRhdGFbJ2NvbmN1cnJlbmN5J10gPz8gMykpKVxuICAgICAgYXdhaXQgbG9hZEZpeFN0YXR1cygpXG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU1MDVDXHU2QjYyXHU0RkVFXHU1OTBEXHU2RDNFXHU1M0QxXHVGRjFBXHU1M0Q2XHU2RDg4XHU2MzkyXHU5NjFGXHU0RTBFXHU4RkQwXHU4ODRDXHU0RTJEXHU3Njg0XHU0RUZCXHU1MkExXHUzMDAyICovXG4gIGNvbnN0IGNhbmNlbEZpeCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9maXgvY2FuY2VsJywge30pXG4gICAgaWYgKG9rKSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjNGOSAnICsgdCgnZml4LnN0b3BEb25lJykucmVwbGFjZSgne259JywgU3RyaW5nKGRhdGFbJ3N0b3BwZWQnXSA/PyAwKSkpXG4gICAgYXdhaXQgbG9hZEZpeFN0YXR1cygpXG4gIH1cblxuICAvKiogXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHU1QkZDXHU1MUZBXHU0RTNBIE1hcmtkb3duXHVGRjA4XHU2MzA5XHU0RTI1XHU5MUNEXHU1RUE2XHU2MzkyXHU1RThGXHVGRjFCXHU1OTBEXHU3NTI4XHU3QjE0XHU4QkIwXHU1QkZDXHU1MUZBXHU3Njg0XHU0RTBCXHU4RjdEXHU2NUI5XHU1RjBGXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGV4cG9ydElzc3Vlc01kID0gKGlzc3VlczogSXNzdWVFbnRyeVtdKTogdm9pZCA9PiB7XG4gICAgaWYgKGlzc3Vlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyB0KCdyZXZpZXcuZXhwb3J0RW1wdHknKSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBzZXZlcml0eU9yZGVyOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0geyBibG9ja2VyOiAwLCBjcml0aWNhbDogMSwgbWFqb3I6IDIsIG1pbm9yOiAzLCBpbmZvOiA0IH1cbiAgICBjb25zdCBvcmRlcmVkID0gWy4uLmlzc3Vlc10uc29ydCgobGVmdCwgcmlnaHQpID0+XG4gICAgICAoc2V2ZXJpdHlPcmRlcltub3JtYWxpemVJc3N1ZVNldmVyaXR5KGxlZnQuc2V2ZXJpdHkpXSA/PyA5KSAtIChzZXZlcml0eU9yZGVyW25vcm1hbGl6ZUlzc3VlU2V2ZXJpdHkocmlnaHQuc2V2ZXJpdHkpXSA/PyA5KVxuICAgICAgfHwgbGVmdC5jcmVhdGVkQXQgLSByaWdodC5jcmVhdGVkQXQpXG4gICAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW1xuICAgICAgJyMgUmV2aWV3IFx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NScsXG4gICAgICAnJyxcbiAgICAgIGAtIFx1OTg3OVx1NzZFRVx1RkYxQSR7c3RhdGU/LnByb2plY3Q/Lm5hbWUgPz8gJ1x1MjAxNCd9YCxcbiAgICAgIGAtIFx1NEVEM1x1NUU5M1x1RkYxQSR7Y29tbWl0c0RhdGE/LnJvb3RQYXRoID8/IHN0YXRlPy5wcm9qZWN0Py5yb290UGF0aCA/PyAnXHUyMDE0J31gLFxuICAgICAgYC0gXHU1MjA2XHU2NTJGXHVGRjFBJHtjb21taXRzRGF0YT8uYnJhbmNoID8/ICdcdTIwMTQnfWAsXG4gICAgICBgLSBcdTVCRkNcdTUxRkFcdTY1RjZcdTk1RjRcdUZGMUEke25ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKX1gLFxuICAgICAgYC0gXHU2NTcwXHU5MUNGXHVGRjFBJHtpc3N1ZXMubGVuZ3RofVx1RkYwOFx1NUY4NVx1NTkwNFx1NzQwNiAke2lzc3Vlcy5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKS5sZW5ndGh9XHVGRjA5YCxcbiAgICAgICcnLFxuICAgIF1cbiAgICBvcmRlcmVkLmZvckVhY2goKGlzc3VlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gaXNzdWUuY2hhbmdlSWQuc3RhcnRzV2l0aCgncmV2aWV3OicpICYmIGlzc3VlLmNoYW5nZUlkICE9PSAncmV2aWV3Ondvcmt0cmVlJ1xuICAgICAgICA/IGBcdTYzRDBcdTRFQTQgJHtpc3N1ZS5jaGFuZ2VJZC5zbGljZSgncmV2aWV3OicubGVuZ3RoLCAncmV2aWV3OicubGVuZ3RoICsgOCl9YFxuICAgICAgICA6IGlzc3VlLmNoYW5nZUlkID09PSAncmV2aWV3Ondvcmt0cmVlJyA/ICdcdTVERTVcdTRGNUNcdTUzM0EnIDogaXNzdWUuY2hhbmdlSWRcbiAgICAgIGxpbmVzLnB1c2goYCMjICR7aW5kZXggKyAxfS4gWyR7aXNzdWUuc2V2ZXJpdHl9XVske2lzc3VlLmNhdGVnb3J5IHx8ICdnZW5lcmFsJ31dICR7aXNzdWUudGl0bGV9YClcbiAgICAgIGxpbmVzLnB1c2goJycpXG4gICAgICBsaW5lcy5wdXNoKGAtIFx1NzJCNlx1NjAwMVx1RkYxQSR7SVNTVUVfU1RBVFVTX0xBQkVMU1tpc3N1ZS5zdGF0dXNdID8/IGlzc3VlLnN0YXR1c31gKVxuICAgICAgbGluZXMucHVzaChgLSBcdTVCRjlcdThDNjFcdUZGMUEke3RhcmdldH1gKVxuICAgICAgbGluZXMucHVzaChgLSBcdTUzRDFcdTczQjBcdTY1RjZcdTk1RjRcdUZGMUEke25ldyBEYXRlKGlzc3VlLmNyZWF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX1gKVxuICAgICAgaWYgKChpc3N1ZS5kZXNjcmlwdGlvbiA/PyAnJykgIT09ICcnKSBsaW5lcy5wdXNoKGAtIFx1NjNDRlx1OEZGMFx1RkYxQSR7aXNzdWUuZGVzY3JpcHRpb24hLnJlcGxhY2UoL1xcbi9nLCAnICcpfWApXG4gICAgICBpZiAoKGlzc3VlLnJlc29sdXRpb24gPz8gJycpICE9PSAnJykgbGluZXMucHVzaChgLSBcdTdFRDNcdThCQkFcdUZGMUEke2lzc3VlLnJlc29sdXRpb259YClcbiAgICAgIGxpbmVzLnB1c2goJycpXG4gICAgfSlcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2xpbmVzLmpvaW4oJ1xcbicpXSwgeyB0eXBlOiAndGV4dC9tYXJrZG93bjtjaGFyc2V0PXV0Zi04JyB9KVxuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgICBjb25zdCBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBhbmNob3IuaHJlZiA9IHVybFxuICAgIGFuY2hvci5kb3dubG9hZCA9IGByZXZpZXctaXNzdWVzLSR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKX0ubWRgXG4gICAgYW5jaG9yLmNsaWNrKClcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybClcbiAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgnbm90ZXMuZXhwb3J0RG9uZScpKVxuICB9XG5cbiAgLyoqIFx1NjI3OVx1OTFDRlx1NjgwN1x1OEJCMFx1NURGMlx1NTkwNFx1NzQwNlx1RkYwOGFjY2VwdGVkXHVGRjA5XHVGRjFBXHU0RUJBXHU1REU1XHU3ODZFXHU4QkE0XHU2NUUwXHU5NzAwXHU5MDEwXHU2NzYxXHU1OTBEXHU2OEMwXHU2NUY2XHU3NkY0XHU2M0E1XHU3RUQzXHU2ODQ4XHUzMDAyICovXG4gIGNvbnN0IG1hcmtJc3N1ZXNIYW5kbGVkID0gYXN5bmMgKGlkczogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBsZXQgZG9uZSA9IDBcbiAgICBmb3IgKGNvbnN0IGlkIG9mIGlkcykge1xuICAgICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaXNzdWVzL3N0YXR1cycsIHsgaWQsIHN0YXR1czogJ2FjY2VwdGVkJyB9KVxuICAgICAgaWYgKG9rKSBkb25lICs9IDFcbiAgICB9XG4gICAgYXdhaXQgbG9hZElzc3VlcygpXG4gICAgaWYgKGRvbmUgPiAwKSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgncmV2aWV3LmhhbmRsZWREb25lJykucmVwbGFjZSgne259JywgU3RyaW5nKGRvbmUpKSlcbiAgfVxuXG4gIC8qKiBcdTYyNzlcdTkxQ0ZcdTU5MERcdTY4QzBcdUZGMUFcdTVCRjlcdTkwMDlcdTRFMkRcdTc2ODRcdThCQzRcdTVCQTFcdTc2RUVcdTY4MDdcdTkwMTBcdTRFMkFcdThERDFcdTU5MERcdTY4QzBcdUZGMDhcdTRFMzJcdTg4NEMgTExNXHVGRjA5XHVGRjBDXHU1QjlFXHU2NUY2XHU4RkRCXHU1RUE2XHUzMDAxXHU1M0VGXHU0RTJEXHU5MDE0XHU1MDVDXHU2QjYyXHUzMDAyICovXG4gIGNvbnN0IHJ1bkJhdGNoVmVyaWZ5ID0gYXN5bmMgKHRhcmdldHM6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHRhcmdldHMubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICBiYXRjaFN0b3BSZWYuY3VycmVudCA9IGZhbHNlXG4gICAgc2V0QmF0Y2hWZXJpZnlTdGF0ZSh7IGRvbmU6IDAsIHRvdGFsOiB0YXJnZXRzLmxlbmd0aCB9KVxuICAgIGxldCByZXNvbHZlZFRvdGFsID0gMFxuICAgIGxldCBvcGVuVG90YWwgPSAwXG4gICAgbGV0IG5ld1RvdGFsID0gMFxuICAgIGxldCBmYWlsZWQgPSAwXG4gICAgZm9yIChjb25zdCBbaW5kZXgsIHRhcmdldF0gb2YgdGFyZ2V0cy5lbnRyaWVzKCkpIHtcbiAgICAgIGlmIChiYXRjaFN0b3BSZWYuY3VycmVudCkgYnJlYWtcbiAgICAgIHNldEJhdGNoVmVyaWZ5U3RhdGUoeyBkb25lOiBpbmRleCwgdG90YWw6IHRhcmdldHMubGVuZ3RoIH0pXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXMvdmVyaWZ5JywgeyB0YXJnZXQgfSlcbiAgICAgICAgaWYgKCFvaykgZmFpbGVkICs9IDFcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZWRUb3RhbCArPSAoKGRhdGFbJ3Jlc29sdmVkJ10gYXMgdW5rbm93bltdKSA/PyBbXSkubGVuZ3RoXG4gICAgICAgICAgb3BlblRvdGFsICs9ICgoZGF0YVsnc3RpbGxPcGVuJ10gYXMgdW5rbm93bltdKSA/PyBbXSkubGVuZ3RoXG4gICAgICAgICAgbmV3VG90YWwgKz0gKChkYXRhWyduZXdJc3N1ZXMnXSBhcyB1bmtub3duW10pID8/IFtdKS5sZW5ndGhcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIGZhaWxlZCArPSAxXG4gICAgICB9XG4gICAgfVxuICAgIHNldEJhdGNoVmVyaWZ5U3RhdGUobnVsbClcbiAgICBhd2FpdCBsb2FkSXNzdWVzKClcbiAgICBpZiAoYmF0Y2hTdG9wUmVmLmN1cnJlbnQpIHNldEFjdGlvblJlc3VsdCgnXHUyM0Y5ICcgKyB0KCdyZXZpZXcuYmF0Y2hTdG9wcGVkJykpXG4gICAgZWxzZSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgncmV2aWV3LmJhdGNoRG9uZScpLnJlcGxhY2UoJ3thfScsIFN0cmluZyhyZXNvbHZlZFRvdGFsKSkucmVwbGFjZSgne2J9JywgU3RyaW5nKG9wZW5Ub3RhbCkpLnJlcGxhY2UoJ3tjfScsIFN0cmluZyhuZXdUb3RhbCkpLnJlcGxhY2UoJ3tkfScsIFN0cmluZyhmYWlsZWQpKSlcbiAgfVxuXG4gIC8qKiBcdTY1NzRcdTRGNTNcdTUyMDZcdThCQ0FcdUZGMUFcdTVGQUFcdTczQUZcdThDMDNcdTc1MjggL2lzc3Vlcy90cmlhZ2UgXHU3NkY0XHU4MUYzIGRvbmVcdUZGMDhcdTZCQ0ZcdTYyNzkgPSBcdTY3MERcdTUyQTFcdTdBRUZcIm9wZW4gXHU0RTE0XHU2NzJDXHU4RjZFXHU2NzJBXHU5MDAxXHU1QkExXCJcdTc2ODRcdTUyNEQgTiBcdTY3NjFcdUZGMDlcdUZGMENcbiAgICogXHU1MjI0XHU1QjlBXHU1MzczXHU2NUY2XHU1MTczXHU5NUVEXHUzMDAxXHU1M0VGXHU1MDVDXHU2QjYyXHU1M0VGXHU3RUVEXHU4REQxXHVGRjA4XHU2NzBEXHU1MkExXHU3QUVGIHNlZW4gXHU4QkIwXHU1RkM2XHU5NjMyXHU5MUNEXHU1OTBEXHU2RDg4XHU4MDE3XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHJ1blRyaWFnZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBiYXRjaFN0b3BSZWYuY3VycmVudCA9IGZhbHNlXG4gICAgc2V0VHJpYWdlU3RhdGUoeyBwcm9jZXNzZWQ6IDAsIHJlbWFpbmluZzogMCB9KVxuICAgIGNvbnN0IGNsb3NlZCA9IHsgZHVwbGljYXRlOiAwLCBvYnNvbGV0ZTogMCwgZmFsc2VfcG9zaXRpdmU6IDAgfVxuICAgIGxldCBrZXB0ID0gMFxuICAgIGxldCBwcm9jZXNzZWQgPSAwXG4gICAgbGV0IHBhcnNlRmFpbGVkID0gZmFsc2VcbiAgICBsZXQgc3RvcHBlZCA9IGZhbHNlXG4gICAgbGV0IGZpcnN0ID0gdHJ1ZVxuICAgIGZvciAoOzspIHtcbiAgICAgIGlmIChiYXRjaFN0b3BSZWYuY3VycmVudCkgeyBzdG9wcGVkID0gdHJ1ZTsgYnJlYWsgfVxuICAgICAgbGV0IG91dGNvbWU6IHsgb2s6IGJvb2xlYW47IGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IH1cbiAgICAgIHRyeSB7XG4gICAgICAgIG91dGNvbWUgPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXMvdHJpYWdlJywgeyBzZXNzaW9uSWQ6IHByb3BzLnNlc3Npb25JZCA/PyAnJywgLi4uKGZpcnN0ID8geyByZXNldDogdHJ1ZSB9IDoge30pIH0pXG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgb3V0Y29tZSA9IHsgb2s6IGZhbHNlLCBkYXRhOiB7IGVycm9yOiAnbmV0d29yayBlcnJvcicgfSB9XG4gICAgICB9XG4gICAgICBmaXJzdCA9IGZhbHNlXG4gICAgICBpZiAoIW91dGNvbWUub2spIHsgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhvdXRjb21lLmRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpOyBicmVhayB9XG4gICAgICBjb25zdCBkYXRhID0gb3V0Y29tZS5kYXRhXG4gICAgICBpZiAoZGF0YVsnZG9uZSddID09PSB0cnVlKSBicmVha1xuICAgICAgY29uc3QgYmF0Y2hDbG9zZWQgPSAoZGF0YVsnY2xvc2VkJ10gPz8ge30pIGFzIFJlY29yZDxzdHJpbmcsIG51bWJlcj5cbiAgICAgIGNsb3NlZC5kdXBsaWNhdGUgKz0gTnVtYmVyKGJhdGNoQ2xvc2VkWydkdXBsaWNhdGUnXSA/PyAwKVxuICAgICAgY2xvc2VkLm9ic29sZXRlICs9IE51bWJlcihiYXRjaENsb3NlZFsnb2Jzb2xldGUnXSA/PyAwKVxuICAgICAgY2xvc2VkLmZhbHNlX3Bvc2l0aXZlICs9IE51bWJlcihiYXRjaENsb3NlZFsnZmFsc2VfcG9zaXRpdmUnXSA/PyAwKVxuICAgICAga2VwdCArPSBOdW1iZXIoZGF0YVsna2VwdCddID8/IDApXG4gICAgICBwcm9jZXNzZWQgKz0gTnVtYmVyKGRhdGFbJ3Byb2Nlc3NlZCddID8/IDApXG4gICAgICBpZiAoZGF0YVsncGFyc2VGYWlsZWQnXSA9PT0gdHJ1ZSkgcGFyc2VGYWlsZWQgPSB0cnVlXG4gICAgICBzZXRUcmlhZ2VTdGF0ZSh7IHByb2Nlc3NlZCwgcmVtYWluaW5nOiBOdW1iZXIoZGF0YVsncmVtYWluaW5nJ10gPz8gMCkgfSlcbiAgICB9XG4gICAgc2V0VHJpYWdlU3RhdGUobnVsbClcbiAgICBhd2FpdCBsb2FkSXNzdWVzKClcbiAgICBpZiAoc3RvcHBlZCkgc2V0QWN0aW9uUmVzdWx0KCdcdTIzRjkgJyArIHQoJ3Jldmlldy50cmlhZ2VTdG9wcGVkJykpXG4gICAgZWxzZSBpZiAocHJvY2Vzc2VkID4gMCkge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgJyArIHQoJ3Jldmlldy50cmlhZ2VEb25lJylcbiAgICAgICAgLnJlcGxhY2UoJ3thfScsIFN0cmluZyhjbG9zZWQuZHVwbGljYXRlKSkucmVwbGFjZSgne2J9JywgU3RyaW5nKGNsb3NlZC5vYnNvbGV0ZSkpLnJlcGxhY2UoJ3tjfScsIFN0cmluZyhjbG9zZWQuZmFsc2VfcG9zaXRpdmUpKS5yZXBsYWNlKCd7ZH0nLCBTdHJpbmcoa2VwdCkpXG4gICAgICAgICsgKHBhcnNlRmFpbGVkID8gdCgncmV2aWV3LnRyaWFnZVBhcnNlRmFpbCcpIDogJycpKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdTk1RUVcdTk4OThcdTU5MERcdTY4QzBcdUZGMUFcdTVCRjlcdThCRTVcdTk1RUVcdTk4OThcdTYyNDBcdTVDNUVcdThCQzRcdTVCQTFcdTc2RUVcdTY4MDdcdTkxQ0RcdThERDFcdTY4QzBcdTZENEJcdUZGMDhcdTRGRUVcdTU5MERcdTc4NkVcdThCQTQgKyBcdTY3MDBcdTRGMThcdTYwMjcvXHU2NzAwXHU1QzBGXHU0RkI1XHU1MTY1ICsgXHU2NUIwXHU5NUVFXHU5ODk4XHU2MjZCXHU2M0NGXHVGRjA5XHVGRjBDXG4gICAqIFx1NTNFQVx1NjcwOVx1NTkwRFx1NjhDMFx1OTAxQVx1OEZDN1x1NjI0RFx1ODFFQVx1NTJBOFx1N0Y2RVx1NEUzQVx1NURGMlx1ODlFM1x1NTFCM1x1RkYxQlx1N0VEM1x1Njc5Q1x1NEVFNVx1NTkwRFx1NjhDMFx1NjJBNVx1NTQ0QVx1NUY2Mlx1NUYwRlx1NUM1NVx1NzkzQVx1MzAwMlxuICAgKi9cbiAgY29uc3QgdmVyaWZ5SXNzdWVzID0gYXN5bmMgKHRhcmdldDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0VmVyaWZ5aW5nVGFyZ2V0KHRhcmdldClcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaXNzdWVzL3ZlcmlmeScsIHsgdGFyZ2V0IH0pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCByZXNvbHZlZCA9IChkYXRhWydyZXNvbHZlZCddIGFzIHN0cmluZ1tdIHwgdW5kZWZpbmVkKSA/PyBbXVxuICAgICAgY29uc3Qgc3RpbGxPcGVuID0gKGRhdGFbJ3N0aWxsT3BlbiddIGFzIEFycmF5PHsgdGl0bGU6IHN0cmluZzsgcmVhc29uOiBzdHJpbmcgfT4gfCB1bmRlZmluZWQpID8/IFtdXG4gICAgICBjb25zdCBuZXdJc3N1ZXMgPSAoZGF0YVsnbmV3SXNzdWVzJ10gYXMgQXJyYXk8eyBzZXZlcml0eTogc3RyaW5nOyB0aXRsZTogc3RyaW5nIH0+IHwgdW5kZWZpbmVkKSA/PyBbXVxuICAgICAgY29uc3QgdmVyZGljdCA9IFN0cmluZyhkYXRhWyd2ZXJkaWN0J10gPz8gJycpXG4gICAgICBjb25zdCBsaW5lcyA9IFtcbiAgICAgICAgYFx1NTkwRFx1NjhDMFx1NUI4Q1x1NjIxMFx1RkYxQVx1NURGMlx1NEZFRVx1NTkwRCAke3Jlc29sdmVkLmxlbmd0aH0gXHUwMEI3IFx1NEVDRFx1NjcyQVx1NEZFRVx1NTkwRCAke3N0aWxsT3Blbi5sZW5ndGh9IFx1MDBCNyBcdTY1QjBcdTU4OUVcdTk1RUVcdTk4OTggJHtuZXdJc3N1ZXMubGVuZ3RofWAsXG4gICAgICAgIC4uLihyZXNvbHZlZC5sZW5ndGggPiAwID8gW2BcdTI3MTMgXHU1REYyXHU0RkVFXHU1OTBEXHVGRjFBJHtyZXNvbHZlZC5qb2luKCdcdUZGMUInKX1gXSA6IFtdKSxcbiAgICAgICAgLi4uKHN0aWxsT3Blbi5sZW5ndGggPiAwID8gc3RpbGxPcGVuLm1hcCgoaXRlbSkgPT4gYFx1MjcxNyBcdTY3MkFcdTRGRUVcdTU5MERcdUZGMUEke2l0ZW0udGl0bGV9IFx1MjAxNFx1MjAxNCAke2l0ZW0ucmVhc29ufWApIDogW10pLFxuICAgICAgICAuLi4obmV3SXNzdWVzLmxlbmd0aCA+IDAgPyBuZXdJc3N1ZXMubWFwKChpdGVtKSA9PiBgXHVGRjBCIFx1NjVCMFx1OTVFRVx1OTg5OFx1RkYxQVske2l0ZW0uc2V2ZXJpdHl9XSAke2l0ZW0udGl0bGV9YCkgOiBbXSksXG4gICAgICAgIC4uLih2ZXJkaWN0ID09PSAnJyA/IFtdIDogW2BcdTY3MDBcdTRGMThcdTYwMjdcdUZGMUEke3ZlcmRpY3R9YF0pLFxuICAgICAgXVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KGxpbmVzLmpvaW4oJ1xcbicpKVxuICAgICAgYXdhaXQgbG9hZElzc3VlcygpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0VmVyaWZ5aW5nVGFyZ2V0KG51bGwpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWRkTm90ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAobm90ZVRpdGxlLnRyaW0oKSA9PT0gJycgfHwgbm90ZUNvbnRlbnQudHJpbSgpID09PSAnJykgcmV0dXJuXG4gICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMnLCB7XG4gICAgICB0aXRsZTogbm90ZVRpdGxlLnRyaW0oKSxcbiAgICAgIGNvbnRlbnQ6IG5vdGVDb250ZW50LnRyaW0oKSxcbiAgICAgIHRhZ3M6IG5vdGVUYWdzLFxuICAgICAgc2hhOiBzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwID8gdW5kZWZpbmVkIDogc2VsZWN0ZWRUYXJnZXRzWzBdLFxuICAgIH0pXG4gICAgaWYgKG9rKSB7XG4gICAgICBzZXROb3RlVGl0bGUoJycpXG4gICAgICBzZXROb3RlQ29udGVudCgnJylcbiAgICAgIHNldE5vdGVUYWdzKCcnKVxuICAgICAgYXdhaXQgbG9hZE5vdGVzKClcbiAgICB9XG4gIH1cblxuICBjb25zdCByZW1vdmVOb3RlID0gYXN5bmMgKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy9kZWxldGUnLCB7IGlkIH0pXG4gICAgaWYgKGVkaXRpbmdOb3RlICE9PSBudWxsICYmIGVkaXRpbmdOb3RlLmlkID09PSBpZCkgc2V0RWRpdGluZ05vdGUobnVsbClcbiAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICB9XG5cbiAgY29uc3Qgc2F2ZU5vdGVFZGl0ID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChlZGl0aW5nTm90ZSA9PT0gbnVsbCkgcmV0dXJuXG4gICAgYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMvdXBkYXRlJywgeyBpZDogZWRpdGluZ05vdGUuaWQsIHRpdGxlOiBlZGl0aW5nTm90ZS50aXRsZSwgY29udGVudDogZWRpdGluZ05vdGUuY29udGVudCwgdGFnczogZWRpdGluZ05vdGUudGFncyB9KVxuICAgIHNldEVkaXRpbmdOb3RlKG51bGwpXG4gICAgYXdhaXQgbG9hZE5vdGVzKClcbiAgfVxuXG4gIC8qKiBcdTdGNkVcdTk4NzYvXHU1M0Q2XHU2RDg4XHU3RjZFXHU5ODc2XHU0RTAwXHU2NzYxXHU3QjE0XHU4QkIwXHUzMDAyICovXG4gIGNvbnN0IHRvZ2dsZU5vdGVQaW4gPSBhc3luYyAobm90ZTogTm90ZUVudHJ5KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMvdXBkYXRlJywgeyBpZDogbm90ZS5pZCwgcGlubmVkOiBub3RlLnBpbm5lZCAhPT0gdHJ1ZSB9KVxuICAgIGF3YWl0IGxvYWROb3RlcygpXG4gIH1cblxuICAvKiogXHU3QjE0XHU4QkIwXHU1QkZDXHU1MUZBXHU0RTNBIC5tZCBcdTY1ODdcdTRFRjZcdUZGMDhcdTZENEZcdTg5QzhcdTU2NjhcdTdBRUYgQmxvYiBcdTRFMEJcdThGN0RcdUZGMUJcdTY1ODdcdTRFRjZcdTU0MERcdTYzMDlcdTY4MDdcdTk4OThcdTZFMDVcdTZEMTdcdUZGMENcdTk3NUVcdTZDRDVcdTVCNTdcdTdCMjZcdTY2RkZcdTYzNjJcdTRFM0FcdTRFMEJcdTUyMTJcdTdFQkZcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgZXhwb3J0Tm90ZSA9IChub3RlOiBOb3RlRW50cnkpOiB2b2lkID0+IHtcbiAgICBjb25zdCBtZCA9IGAjICR7bm90ZS50aXRsZX1cXG5cXG4ke25vdGUuY29udGVudH1cXG5gXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFttZF0sIHsgdHlwZTogJ3RleHQvbWFya2Rvd247Y2hhcnNldD11dGYtOCcgfSlcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gICAgY29uc3QgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgYW5jaG9yLmhyZWYgPSB1cmxcbiAgICBhbmNob3IuZG93bmxvYWQgPSAobm90ZS50aXRsZS5yZXBsYWNlKC9bXFxcXC86Kj9cIjw+fF0vZywgJ18nKS50cmltKCkuc2xpY2UoMCwgNjApIHx8ICdub3RlJykgKyAnLm1kJ1xuICAgIGFuY2hvci5jbGljaygpXG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpXG4gICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgJyArIHQoJ25vdGVzLmV4cG9ydERvbmUnKSlcbiAgfVxuXG4gIC8qKiBBSSBcdTVCNjZcdTRFNjBcdTYwM0JcdTdFRDNcdUZGMUFcdTVCRjlcdTZCRDRcdTRFMEFcdTZCMjFcdTYwM0JcdTdFRDNcdTUwNUFcdTU4OUVcdTkxQ0ZcdTY2RjRcdTY1QjBcdUZGMENcdTYyOEFcdTdCMTRcdThCQjArXHU5ODc5XHU3NkVFXHU2ODYzXHU2ODQ4XHU2M0QwXHU3MEJDXHU2MjEwXHU0RTAwXHU0RUZEXHUzMDBDXHU2RDNCXHUzMDBEXHU3Njg0XHU2MDNCXHU3RUQzXHU2NTg3XHU2ODYzXHUzMDAyICovXG4gIGNvbnN0IGFpU3VtbWFyaXplID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldEFpU3VtbWFyaXppbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMvYWktc3VtbWFyeScsIHt9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KGRhdGFbJ3VwZGF0ZWQnXSA9PT0gdHJ1ZVxuICAgICAgICA/ICdcdTI3MTMgXHU1REYyXHU1QkY5XHU2QkQ0XHU0RTBBXHU2QjIxXHU2MDNCXHU3RUQzXHU1QjhDXHU2MjEwXHU1ODlFXHU5MUNGXHU2NkY0XHU2NUIwXHVGRjA4XHU2NUIwXHU1ODlFXHU1M0Q4XHU1MzE2XHU4OUMxXHU2MDNCXHU3RUQzXHU3Njg0XHUzMDBDXHU2NzJDXHU2QjIxXHU2NkY0XHU2NUIwXHUzMDBEXHU0RTAwXHU4MjgyXHVGRjA5XHVGRjBDXHU2NUU3XHU2MDNCXHU3RUQzXHU1REYyXHU1NDA4XHU1RTc2XHU2NkZGXHU2MzYyJ1xuICAgICAgICA6ICdcdTI3MTMgXHU1REYyXHU3NTFGXHU2MjEwXHU5OTk2XHU0RUZEXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzJylcbiAgICAgIGF3YWl0IGxvYWROb3RlcygpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0QWlTdW1tYXJpemluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU5ODc1XHU5NzYyXHU1MjFCXHU1RUZBXHU2MjY3XHU4ODRDXHVGRjFBXHU1RUZBXHU1M0Q4XHU2NkY0IFx1MjE5MiBMTE0gXHU3NTFGXHU2MjEwXHU3RjE2XHU2MzkyXHU4QkExXHU1MjEyIFx1MjE5MiBcdThCQTFcdTUyMTJcdTc4NkVcdThCQTRcdTk4NzVcdUZGMDhcdTg5RDJcdTgyNzIvXHU2QTIxXHU1NzhCL1x1N0I1Nlx1NzU2NVx1NTNFRlx1OEMwM1x1RkYwOVx1MjE5MiBcdTc4NkVcdThCQTRcdTU0MEVcdTU0MkZcdTUyQThcdTMwMDIgKi9cbiAgY29uc3Qgc3RhcnRSdW4gPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKGV4ZWNUaXRsZS50cmltKCkgPT09ICcnIHx8IGV4ZWNEZXNjLnRyaW0oKSA9PT0gJycpIHJldHVyblxuICAgIHNldEJ1c3koJ3N0YXJ0UnVuJylcbiAgICBzZXRBY3Rpb25SZXN1bHQobnVsbClcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9zdGFydCcsIHtcbiAgICAgICAgdGl0bGU6IGV4ZWNUaXRsZS50cmltKCksIGRlc2NyaXB0aW9uOiBleGVjRGVzYy50cmltKCksXG4gICAgICAgIC4uLihleGVjTW9kZWwgPT09ICcnID8ge30gOiAoKCkgPT4geyBjb25zdCBbcHJvdmlkZXIsIG1vZGVsXSA9IGV4ZWNNb2RlbC5zcGxpdCgnLycpOyByZXR1cm4geyBkZWZhdWx0TW9kZWxQcm92aWRlcjogcHJvdmlkZXIgPz8gJycsIGRlZmF1bHRNb2RlbElkOiBtb2RlbCA/PyAnJyB9IH0pKCkpLFxuICAgICAgfSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmIChkYXRhWydhdXRvU3RhcnRlZCddID09PSB0cnVlKSB7XG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NURGMlx1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYxQScgKyBTdHJpbmcoZGF0YVsncnVuSWQnXSA/PyAnJykpXG4gICAgICAgIHNldEV4ZWNUaXRsZSgnJylcbiAgICAgICAgc2V0RXhlY0Rlc2MoJycpXG4gICAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3Qgc3RlcHMgPSAoZGF0YVsnc3RlcHMnXSBhcyBBcnJheTxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4gfCB1bmRlZmluZWQpID8/IFtdXG4gICAgICBzZXRQbGFuQ29uZmlybSh7XG4gICAgICAgIGNoYW5nZUlkOiBTdHJpbmcoZGF0YVsnY2hhbmdlSWQnXSA/PyAnJyksXG4gICAgICAgIHN0ZXBzOiBzdGVwcy5tYXAoKHN0ZXApID0+ICh7XG4gICAgICAgICAgaWQ6IFN0cmluZyhzdGVwWydpZCddID8/ICcnKSxcbiAgICAgICAgICB0aXRsZTogU3RyaW5nKHN0ZXBbJ3RpdGxlJ10gPz8gJycpLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoc3RlcFsnZGVzY3JpcHRpb24nXSA/PyAnJyksXG4gICAgICAgICAgdGFyZ2V0RmlsZXM6IChzdGVwWyd0YXJnZXRGaWxlcyddIGFzIHN0cmluZ1tdIHwgdW5kZWZpbmVkKSA/PyBbXSxcbiAgICAgICAgICByb2xlOiBTdHJpbmcoc3RlcFsncm9sZSddID8/ICdjb2RpbmcnKSxcbiAgICAgICAgICBhY2NlcHRhbmNlOiBTdHJpbmcoc3RlcFsnYWNjZXB0YW5jZSddID8/ICcnKSxcbiAgICAgICAgICBmYWlsdXJlUG9saWN5OiBTdHJpbmcoc3RlcFsnZmFpbHVyZVBvbGljeSddID8/ICdyZXRyeS1lc2NhbGF0ZScpLFxuICAgICAgICAgIGVuYWJsZWQ6IHN0ZXBbJ2VuYWJsZWQnXSAhPT0gZmFsc2UsXG4gICAgICAgICAgbW9kZWxQcm92aWRlcjogJycsXG4gICAgICAgICAgbW9kZWxJZDogJycsXG4gICAgICAgIH0pKSxcbiAgICAgIH0pXG4gICAgICBpZiAobW9kZWxPcHRpb25zLmxlbmd0aCA9PT0gMCAmJiBtb2RlbFRpZXJzID09PSBudWxsKSB2b2lkIGxvYWRNb2RlbENvbmZpZygpXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdThCQTFcdTUyMTJcdTVERjJcdTc1MUZcdTYyMTBcdUZGMENcdThCRjdcdTU3MjhcdTRFMEJcdTY1QjlcdTc4NkVcdThCQTRcdTdGMTZcdTYzOTJcdTU0MEVcdTU0MkZcdTUyQTgnKVxuICAgICAgc2V0RXhlY1RpdGxlKCcnKVxuICAgICAgc2V0RXhlY0Rlc2MoJycpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0QnVzeShudWxsKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdThCQTFcdTUyMTJcdTc4NkVcdThCQTRcdTk4NzVcdUZGMUFcdTRGRERcdTVCNThcdTdGMTZcdThGOTFcdUZGMDhcdTY1QjBcdTcyNDhcdTY3MkNcdThCQTFcdTUyMTJcdUZGMDlcdTVFNzZcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdTMwMDIgKi9cbiAgY29uc3QgbGF1bmNoUGxhbiA9IGFzeW5jICh3aXRoRWRpdHM6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAocGxhbkNvbmZpcm0gPT09IG51bGwpIHJldHVyblxuICAgIHNldFBsYW5CdXN5KHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGxldCBjaGFuZ2VJZCA9IHBsYW5Db25maXJtLmNoYW5nZUlkXG4gICAgICBpZiAod2l0aEVkaXRzKSB7XG4gICAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvcGxhbi91cGRhdGUnLCB7IGNoYW5nZUlkLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMgfSlcbiAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9sYXVuY2gnLCB7IGNoYW5nZUlkIH0pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMUEnICsgU3RyaW5nKGRhdGFbJ3J1bklkJ10gPz8gJycpKVxuICAgICAgc2V0UGxhbkNvbmZpcm0obnVsbClcbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0UGxhbkJ1c3koZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NTJBMFx1OEY3RCBSdW4gXHU4QkU2XHU2MEM1XHVGRjA4XHU2QjY1XHU5QUE0XHU2NUY2XHU5NUY0XHU3RUJGICsgXHU0RUZCXHU1MkExXHU1REU1XHU0RjVDXHU4QkIwXHU1RkM2XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGxvYWRSdW5EZXRhaWwgPSBhc3luYyAoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL2RldGFpbD9pZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlkKSArICcmc2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0UnVuRGV0YWlsKGRhdGEgYXMgUnVuRGV0YWlsKVxuICAgIH0gY2F0Y2gge1xuICAgICAgc2V0UnVuRGV0YWlsKG51bGwpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NjA2Mlx1NTkwRFx1NjY4Mlx1NTA1Qy9cdTRFMkRcdTY1QUQvXHU1OTMxXHU4RDI1XHU3Njg0IFJ1blx1MzAwMiAqL1xuICBjb25zdCByZXN1bWVSdW4gPSBhc3luYyAocnVuSWQ6IHN0cmluZywgYWN0aW9uOiAnY29udGludWUnIHwgJ3NraXAtY3VycmVudCcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL3Jlc3VtZScsIHsgcnVuSWQsIGFjdGlvbiB9KVxuICAgIGlmIChvaykge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU1REYyXHU2MDYyXHU1OTBEXHU2MjY3XHU4ODRDXHVGRjA4JyArIGFjdGlvbiArICdcdUZGMDknKVxuICAgICAgYXdhaXQgcmVmcmVzaFN0YXRlKClcbiAgICAgIGF3YWl0IGxvYWRSdW5EZXRhaWwocnVuSWQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU1MkEwXHU4RjdEXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHU1MjE3XHU4ODY4XHUzMDAyICovXG4gIGNvbnN0IGxvYWRTY2hlZHVsZWQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3NjaGVkdWxlZD9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXRTY2hlZHVsZWREYXRhKChkYXRhIGFzIHsgdGFza3M6IFNjaGVkdWxlZFRhc2tFbnRyeVtdIH0pLnRhc2tzID8/IFtdKVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gXHU1MjE3XHU4ODY4XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NTIxQlx1NUVGQSAvIFx1NjZGNFx1NjVCMCAvIFx1NTIyMFx1OTY2NCAvIFx1N0FDQlx1NTM3M1x1NjI2N1x1ODg0Q1x1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1MzAwMiAqL1xuICBjb25zdCBhZGRTY2hlZHVsZWQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgaW50ZXJ2YWxNaW51dGVzID0gTnVtYmVyKHNjaGVkSW50ZXJ2YWwpXG4gICAgaWYgKHNjaGVkTmFtZS50cmltKCkgPT09ICcnIHx8ICFOdW1iZXIuaXNGaW5pdGUoaW50ZXJ2YWxNaW51dGVzKSB8fCBpbnRlcnZhbE1pbnV0ZXMgPCAxKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyBcdThCRjdcdTU4NkJcdTUxOTlcdTRFRkJcdTUyQTFcdTU0MERcdTc5RjBcdTRFMEVcdTY3MDlcdTY1NDhcdTk1RjRcdTk2OTRcdUZGMDhcdTUyMDZcdTk0OUZcdUZGMDknKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3NjaGVkdWxlZCcsIHtcbiAgICAgIG5hbWU6IHNjaGVkTmFtZS50cmltKCksIHR5cGU6IHNjaGVkVHlwZSwgaW50ZXJ2YWxNaW51dGVzLFxuICAgICAgdGl0bGU6IHNjaGVkVGl0bGUudHJpbSgpIHx8IHVuZGVmaW5lZCwgZGVzY3JpcHRpb246IHNjaGVkRGVzYy50cmltKCkgfHwgdW5kZWZpbmVkLFxuICAgIH0pXG4gICAgaWYgKG9rKSB7XG4gICAgICBzZXRTY2hlZE5hbWUoJycpOyBzZXRTY2hlZFRpdGxlKCcnKTsgc2V0U2NoZWREZXNjKCcnKVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHU1REYyXHU1MjFCXHU1RUZBJylcbiAgICAgIGF3YWl0IGxvYWRTY2hlZHVsZWQoKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc2NoZWR1bGVkQWN0aW9uID0gYXN5bmMgKHBhdGg6IHN0cmluZywgYm9keTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9zY2hlZHVsZWQvJyArIHBhdGgsIGJvZHkpXG4gICAgaWYgKG9rKSBhd2FpdCBsb2FkU2NoZWR1bGVkKClcbiAgICBlbHNlIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgfVxuXG4gIC8qKiBcdTUyQTBcdThGN0RcdThCQjBcdTVGQzZcdTk3NjJcdTY3N0ZcdTUxNjhcdTkxQ0ZcdTY1NzBcdTYzNkVcdUZGMDhcdTU0MkJcdTU0MENcdTZCNjVcdTU3RkFcdTdFQkZcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgbG9hZE1lbW9yaWVzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcmllcz9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXRNZW1vcmllc0RhdGEoZGF0YSBhcyBNZW1vcmllc1BheWxvYWQpXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcbiAgICB9XG4gIH1cblxuICAvKiogXHU2MkM5XHU1M0Q2XHU1NDBDXHU2QjY1XHVGRjFBXHU0RTA5XHU1NDExXHU1MjI0XHU1QjlBXHVGRjA4XHU1OTMxXHU2NTQ4XHU2M0QwXHU2ODQ4L1x1NjVCMFx1NTg5RVx1NTAxOVx1OTAwOS9cdTgxRUFcdTUyQThcdTdFRURcdTU0N0RcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3Qgc3luY01lbW9yaWVzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldE1lbW9yeVN5bmNpbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5L3N5bmMnLCB7fSlcbiAgICAgIGlmICghb2sgJiYgZGF0YVsnZXJyb3InXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNldFN5bmNSZXBvcnQoeyBvazogZmFsc2UsIGVycm9yOiBTdHJpbmcoZGF0YVsnZXJyb3InXSkgfSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXRTeW5jUmVwb3J0KGRhdGEgYXMgU3luY1JlcG9ydClcbiAgICAgIGF3YWl0IGxvYWRNZW1vcmllcygpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldFN5bmNSZXBvcnQoeyBvazogZmFsc2UsIGVycm9yOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikgfSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TWVtb3J5U3luY2luZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU1NDBDXHU2QjY1XHU2MkE1XHU1NDRBXHU1NDBFXHU3RUVEXHVGRjFBXHU2MjhBXHU5MDA5XHU0RTJEXHU3Njg0XHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2XHU5ODc5XHU4NDNEXHU0RTNBIHN0YWxlIC8gXHU1RjUyXHU2ODYzXHUzMDAyICovXG4gIGNvbnN0IGFwcGx5U3luYyA9IGFzeW5jIChpZHM6IHN0cmluZ1tdLCBhY3Rpb246ICdtYXJrLXN0YWxlJyB8ICdhcmNoaXZlJyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeS9zeW5jL2FwcGx5JywgeyBpZHMsIGFjdGlvbiB9KVxuICAgIHNldFN5bmNSZXBvcnQoKHByZXZpb3VzKSA9PiBwcmV2aW91cyA9PT0gbnVsbCA/IG51bGwgOiB7IC4uLnByZXZpb3VzLCBzdGFsZVByb3Bvc2FsczogKHByZXZpb3VzLnN0YWxlUHJvcG9zYWxzID8/IFtdKS5maWx0ZXIoKHByb3Bvc2FsKSA9PiAhaWRzLmluY2x1ZGVzKHByb3Bvc2FsLmlkKSkgfSlcbiAgICBhd2FpdCBsb2FkTWVtb3JpZXMoKVxuICB9XG5cbiAgLyoqIFx1OEJCMFx1NUZDNlx1NzJCNlx1NjAwMVx1NjRDRFx1NEY1Q1x1RkYwOFx1NUY1Mlx1Njg2My9cdTYwNjJcdTU5MERcdUZGMDlcdTRFMEVcdTUyMDZcdTY1MkZcdTVGNTJcdTRFMDBcdTMwMDIgKi9cbiAgY29uc3QgbWVtb3J5QWN0aW9uID0gYXN5bmMgKHBhdGg6IHN0cmluZywgYm9keTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvJyArIHBhdGgsIGJvZHkpXG4gICAgaWYgKG9rKSBhd2FpdCBsb2FkTWVtb3JpZXMoKVxuICAgIGVsc2Ugc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICB9XG5cbiAgLyoqIFx1OEJCMFx1NUZDNlx1OEY2Q1x1N0IxNFx1OEJCMFx1RkYxQVx1NUYxNVx1NzUyOFx1OEZEQlx1NUI2Nlx1NEU2MFx1Njg2M1x1Njg0OFx1MzAwMiAqL1xuICBjb25zdCBtZW1vcnlUb05vdGUgPSBhc3luYyAobWVtb3J5OiBNZW1vcnlFbnRyeSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzJywge1xuICAgICAgdGl0bGU6IG1lbW9yeS50aXRsZSxcbiAgICAgIGNvbnRlbnQ6IG1lbW9yeS5jb250ZW50ICsgKG1lbW9yeS5iYXNpc1NoYSAhPT0gbnVsbCA/IGBcXG5cdUZGMDhcdTY3NjVcdTZFOTBcdUZGMUFcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzYgJHttZW1vcnkuYmFzaXNTaGEuc2xpY2UoMCwgOCl9XHVGRjA5YCA6ICcnKSxcbiAgICAgIHRhZ3M6ICdcdThCQjBcdTVGQzYsICcgKyBtZW1vcnkudHlwZSxcbiAgICB9KVxuICAgIGlmIChvaykgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU1REYyXHU2MjhBXHU4QkIwXHU1RkM2XHU4RjZDXHU0RTNBXHU3QjE0XHU4QkIwJylcbiAgfVxuXG4gIC8vIFx1NEYxQVx1OEJERFx1NjI1M1x1NUYwMC9cdTUyMDdcdTYzNjJcdTY1RjZcdTVCOThcdTY1QjlcdTRGMUEgY2xvc2VEZXRhaWxzIFx1NjUzNlx1OEQ3N1x1OEY2OFx1OTA1M1x1RkYxQlx1NzcwQlx1OTVFOFx1NzJEN1x1NkJDRiA1MDBtcyBcdTY4QzBcdTY3RTVcdUZGMENcbiAgLy8gXHU1M0VBXHU4OTgxXHU1RjUzXHU1MjREXHU2NzA5XHU0RjFBXHU4QkREXHU4MDBDXHU1REU1XHU0RjVDXHU1M0YwXHU1MjE3XHU1QkJEIDwgNTBweCBcdTVDMzFcdTkxQ0RcdTY1QjBcdTY0OTFcdTVGMDBcdUZGMDhcdTc4NkVcdTVCOUFcdTYwMjdcdUZGMENcdTRFMERcdTRGOURcdThENTYgZWZmZWN0IFx1NjVGNlx1NUU4Rlx1RkYwOVx1MzAwMlxuICAvLyBcdTU0MENcdTRFMDBcdTYyQ0RcdTdFRjRcdTYzMDFcdTdFREZcdThCQTFcdTg4NENcdTk0QjNcdTUyMzZcdUZGMUFcdTRGMUFcdThCRERcdTUyMDdcdTYzNjJcdTRGMUFcdTYzNjJcdTYzODlcdTdFREZcdThCQTFcdTg4NEMgRE9NXHVGRjBDXHU2ODM3XHU1RjBGXHU4ODY4XHU3RjNBXHU1OTMxXHU2NUY2XHU2MzA5XHU1RjUzXHU1MjREXG4gIC8vIFx1Njc4NFx1NUVGQVx1NTRDOFx1NUUwQ1x1OTFDRFx1NkNFOFx1NTE2NVx1RkYwOFx1NUU0Mlx1N0I0OVx1RkYwQ1x1NURGMlx1NUI1OFx1NTcyOFx1NTIxOVx1OERGM1x1OEZDN1x1RkYwOVx1MzAwMlxuICBjb25zdCBsYXlvdXRGYWNlID0gKHByb3BzIGFzIHVua25vd24gYXMgeyBsYXlvdXQ/OiB7IG9wZW5EZXRhaWxzPzogKCkgPT4gdm9pZCB9IH0pLmxheW91dFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChwcm9wcy5sYXlvdXRNb2RlID09PSAnb3ZlcmxheScpIHJldHVyblxuICAgIGFwcGx5U3RhdHNMaW5lQ2xhbXAoKVxuICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYy1zdGF0cy1jbGFtcCcpID09PSBudWxsKSBhcHBseVN0YXRzTGluZUNsYW1wKClcbiAgICAgIGNvbnN0IGNoYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiY2VudGVyQ29sXCJdJylcbiAgICAgIGNvbnN0IHdpZHRoID0gY2hhdCA/IE1hdGgucm91bmQoY2hhdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkgOiAtMVxuICAgICAgaWYgKHdpZHRoICE9PSAtMSAmJiB3aWR0aCA8IDUwKSBsYXlvdXRGYWNlPy5vcGVuRGV0YWlscz8uKClcbiAgICB9LCA1MDApXG4gICAgcmV0dXJuICgpID0+IHsgY2xlYXJJbnRlcnZhbCh0aW1lcikgfVxuICB9LCBbcHJvcHMuc2Vzc2lvbklkLCBwcm9wcy5sYXlvdXRNb2RlLCBsYXlvdXRGYWNlXSlcblxuICAvKiogXHU0RUU1IGltcG9ydGFudCBcdTUxODVcdTgwNTRcdTY4MzdcdTVGMEZcdTc2RjRcdTYzQTVcdTUxOTlcdTVCOThcdTY1QjlcdTdGNTFcdTY4M0NcdTZBMjFcdTY3N0ZcdUZGMDhcdTY3MDBcdTlBRDhcdTRGMThcdTUxNDhcdTdFQTdcdUZGMENcdTRFRkJcdTRGNTVcdTkxQ0RcdTZFMzJcdTY3RDNcdTRFMERcdTRGMUFcdTg5ODZcdTc2RDZcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgZnJhbWVUZW1wbGF0ZVNldCA9IChjaGF0UHg6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwic2lkZWJhckNvbFwiXScpXG4gICAgY29uc3Qgc2lkZWJhclcgPSBzaWRlYmFyID8gTWF0aC5tYXgoNTYsIE1hdGgucm91bmQoc2lkZWJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkpIDogMjgwXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXScpXG4gICAgICA/LnN0eWxlLnNldFByb3BlcnR5KCdncmlkLXRlbXBsYXRlLWNvbHVtbnMnLCBzaWRlYmFyVyArICdweCBtaW5tYXgoMCwgMWZyKSAnICsgY2hhdFB4ICsgJ3B4JywgJ2ltcG9ydGFudCcpXG4gIH1cblxuICAvKiogXHU2NTM2XHU4RDc3XHU2MDAxXHU2QTIxXHU2NzdGXHVGRjFBXHU3QjJDXHU0RTA5XHU1MjE3XHVGRjA4XHU1Qjk4XHU2NUI5XHU4QkU2XHU2MEM1XHVGRjA5MHB4XHUyMDE0XHUyMDE0XHU1REU1XHU0RjVDXHU1M0YwXHU1MTczXHU5NUVEXHU1NDBFXHU1M0YzXHU0RkE3XHU1M0VBXHU1MTQxXHU4QkI4XHU4MDRBXHU1OTI5XHVGRjA4XHU0RTFBXHU0RTNCXHU4OUM0XHU1MjE5XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGNvbGxhcHNlRnJhbWVUZW1wbGF0ZSA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cInNpZGViYXJDb2xcIl0nKVxuICAgIGNvbnN0IHNpZGViYXJXID0gc2lkZWJhciA/IE1hdGgubWF4KDU2LCBNYXRoLnJvdW5kKHNpZGViYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpKSA6IDI4MFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0nKVxuICAgICAgPy5zdHlsZS5zZXRQcm9wZXJ0eSgnZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zJywgc2lkZWJhclcgKyAncHggbWlubWF4KDAsIDFmcikgMHB4JywgJ2ltcG9ydGFudCcpXG4gIH1cblxuICAvLyBcdTgwNEFcdTU5MjlcdTUyMTdcdTVCQkRcdThCQjBcdTVGQzZcdUZGMDhcdTVCOThcdTY1QjkgbGF5b3V0IHN0b3JlIFx1NzdBQ1x1NjAwMVx1RkYwOVx1RkYxQVx1NjMwMlx1OEY3RFx1NjA2Mlx1NTkwRCArIFx1NjJENlx1NjJGRFx1NzZGNFx1NTE5OVx1NTE4NVx1ODA1NFx1NkEyMVx1Njc3Rlx1MzAwMlxuICAvLyBcdTVGQzVcdTk4N0JcdTUxOTkgaW1wb3J0YW50XHUyMDE0XHUyMDE0TEFZT1VUX1NUWUxFIFx1NzY4NFx1NkEyMVx1Njc3Rlx1ODlDNFx1NTIxOVx1NEU1Rlx1NjYyRiBpbXBvcnRhbnRcdUZGMENcdTk3NUUgaW1wb3J0YW50XG4gIC8vIFx1NTE4NVx1ODA1NFx1NEYxQVx1ODhBQlx1NUI4M1x1NTM4Qlx1NTIzNlx1RkYwOFx1OEZEOVx1NUMzMVx1NjYyRlx1NkI2NFx1NTI0RFwiXHU2MkQ2XHU2MkZEXHU3NTFGXHU2NTQ4XHUzMDAxXHU1MjM3XHU2NUIwXHU1NDBFXHU4QkIwXHU1RkM2XHU0RTIyXHU1OTMxXCJcdTc2ODRcdTUzOUZcdTU2RTBcdUZGMDlcdTMwMDJcbiAgLy8gXHU1Qjk4XHU2NUI5IFJlYWN0IFx1OTFDRFx1NkUzMlx1NjdEM1x1NEYxQVx1NjUzOVx1NTE5OVx1NTE4NVx1ODA1NFx1NkEyMVx1Njc3Rlx1RkYwQ011dGF0aW9uT2JzZXJ2ZXIgXHU2MzA5XHU1RjUzXHU1MjREXHU1MDNDXHU1Qjg4XHU1MzZCXHU5MUNEXHU1MTk5XG4gIC8vIFx1RkYwOFx1NTAzQ1x1NzZGOFx1NTQwQ1x1NEUwRFx1NEYxQVx1ODlFNlx1NTNEMVx1NjVCMFx1NzY4NCBtdXRhdGlvblx1RkYwQ1x1NjVFMFx1NTZERVx1NzNBRlx1RkYwOVx1MzAwMlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChwcm9wcy5sYXlvdXRNb2RlID09PSAnb3ZlcmxheScpIHJldHVyblxuICAgIGNvbnN0IHNhdmVkID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYy5jaGF0V2lkdGgnKSA/PyAnJylcbiAgICBjb25zdCBhcHBseSA9ICgpOiB2b2lkID0+IHtcbiAgICAgIC8vIFx1NjMwMlx1OEY3RC9cdTVCOThcdTY1QjlcdTkxQ0RcdTZFMzJcdTY3RDNcdTY1RjZcdTY1RTBcdTY3NjFcdTRFRjZcdTU5M0FcdTU2REVcdTZBMjFcdTY3N0ZcdUZGMDhpbXBvcnRhbnQgXHU4OTg2XHU1MTk5XHVGRjFCXHU1MDNDXHU3NkY4XHU1NDBDXHU2NUY2XHU1Qjk4XHU2NUI5XHU2ODM3XHU1RjBGXHU1M0Q4XHU2NkY0XG4gICAgICAvLyBcdTRFMERcdTRGMUFcdTg5RTZcdTUzRDFcdTY1QjBcdTc2ODQgbXV0YXRpb25cdUZGMENcdTY1RTBcdTU2REVcdTczQUZcdUZGMDlcdTMwMDJcdTVERTVcdTRGNUNcdTUzRjBcdTVGMDBcdTc3NDAgPSBcdTUzRjNcdTUyMTdcdTgwNEFcdTU5MjlcdTU2RkFcdTVCOUFcdTVCQkRcdTMwMDJcbiAgICAgIGNvbnN0IGNoYXRXID0gTnVtYmVyLmlzRmluaXRlKHNhdmVkKSAmJiBzYXZlZCA+PSAyODAgPyBzYXZlZCA6IDM2MFxuICAgICAgZnJhbWVUZW1wbGF0ZVNldChjaGF0VylcbiAgICB9XG4gICAgYXBwbHkoKVxuICAgIGNvbnN0IGZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXScpXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7IGFwcGx5KCkgfSlcbiAgICBpZiAoZnJhbWUgIT09IG51bGwpIG9ic2VydmVyLm9ic2VydmUoZnJhbWUsIHsgYXR0cmlidXRlczogdHJ1ZSwgYXR0cmlidXRlRmlsdGVyOiBbJ3N0eWxlJ10gfSlcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgICAvLyBcdTVERTVcdTRGNUNcdTUzRjBcdTUzNzhcdThGN0RcdUZGMUFcdTUxOTlcdTUxNjVcdTY1MzZcdThENzdcdTYwMDFcdTZBMjFcdTY3N0ZcdUZGMDhcdTdCMkNcdTRFMDlcdTUyMTcgMHB4XHVGRjA5XHUyMDE0XHUyMDE0XHU0RTFBXHU0RTNCXHU4OUM0XHU1MjE5XHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwXHU1MTczIFx1MjE5MiBcdTUzRjNcdTRGQTdcdTUzRUFcdTUxNDFcdThCQjhcbiAgICAgIC8vIFx1ODA0QVx1NTkyOVx1MzAwMlx1NEUwRFx1ODBGRFx1NTIyMFx1OTY2NFx1NTE4NVx1ODA1NFx1NUM1RVx1NjAyN1x1RkYwOFx1NUI5OFx1NjVCOSBSZWFjdCBcdTRFMERcdTRGMUFcdTRFM0JcdTUyQThcdTg4NjVcdTUxOTlcdUZGMENcdTRGMUFcdTVCRkNcdTgxRjRcdTRFM0JcdTUzM0FcdTdBN0FcdTc2N0RcdUZGMDlcdUZGMUJcbiAgICAgIC8vIFx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1ODY3RFx1NTZERVx1NTIzMFx1OEJFNVx1NTIxN1x1NEY0NiAwIFx1NUJCRFx1NEUwRFx1NTNFRlx1ODlDMVx1RkYwODAuMS4yIFx1NUI5RVx1NkQ0Qlx1NTZERVx1NUY1Mlx1RkYwOVx1MzAwMlxuICAgICAgY29sbGFwc2VGcmFtZVRlbXBsYXRlKClcbiAgICB9XG4gIH0sIFtwcm9wcy5sYXlvdXRNb2RlXSlcblxuICAvKiogXHU1MjA2XHU5Njk0XHU2NzYxXHU2MkQ2XHU2MkZEXHVGRjFBXHU4QzAzXHU2NTc0XHU4MDRBXHU1OTI5XHU1MjE3XHU1QkJEXHVGRjA4XHU1REU1XHU0RjVDXHU1M0YwXHU1NDM4XHU2NTM2XHU1MjY5XHU0RjU5XHU3QTdBXHU5NUY0XHVGRjA5XHVGRjBDXHU1MTk5XHU1MTY1IGxvY2FsU3RvcmFnZSBcdThCQjBcdTVGQzZcdTMwMDIgKi9cbiAgY29uc3Qgb25EaXZpZGVyRG93biA9IChlOiBSZWFjdC5Qb2ludGVyRXZlbnQpOiB2b2lkID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zdCBvbk1vdmUgPSAoZXY6IFBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3Qgd2lkdGggPSBNYXRoLm1pbig5MDAsIE1hdGgubWF4KDI4MCwgd2luZG93LmlubmVyV2lkdGggLSBldi5jbGllbnRYKSlcbiAgICAgIGZyYW1lVGVtcGxhdGVTZXQod2lkdGgpXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGMuY2hhdFdpZHRoJywgU3RyaW5nKHdpZHRoKSlcbiAgICB9XG4gICAgY29uc3Qgb25VcCA9ICgpOiB2b2lkID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSlcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKVxuICAgIH1cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApXG4gIH1cblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBkaXNwb3NlZCA9IGZhbHNlXG4gICAgbGV0IGdlbmVyYXRpb24gPSAwXG4gICAgY29uc3QgbG9hZCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSArK2dlbmVyYXRpb25cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3N0YXRlP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJyksIHsgaGVhZGVyczogeyBhY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyB9IH0pXG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihgSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKVxuICAgICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICAgIGlmICghZGlzcG9zZWQgJiYgcmVxdWVzdCA9PT0gZ2VuZXJhdGlvbikge1xuICAgICAgICAgIHNldFN0YXRlKGRhdGEgYXMgV29ya3NwYWNlU3RhdGUpXG4gICAgICAgICAgc2V0TG9hZEVycm9yKG51bGwpXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICAgIGlmICghZGlzcG9zZWQgJiYgcmVxdWVzdCA9PT0gZ2VuZXJhdGlvbikgc2V0TG9hZEVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcbiAgICAgIH1cbiAgICB9XG4gICAgdm9pZCBsb2FkKClcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHsgdm9pZCBsb2FkKCkgfSwgNDAwMClcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZGlzcG9zZWQgPSB0cnVlXG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgIH1cbiAgfSwgW3Byb3BzLnNlc3Npb25JZF0pXG5cbiAgLy8gXHU4RkRCXHU1MTY1XHU2M0QwXHU0RUE0L1x1N0IxNFx1OEJCMC9SZXZpZXcgXHU5ODc1XHU3QjdFXHU2NUY2XHU2MzA5XHU5NzAwXHU2MkM5XHU1M0Q2XHVGRjA4XHU2M0QwXHU0RUE0XHU1MjE3XHU4ODY4XHU0RjlEXHU4RDU2XHU0RjFBXHU4QkREXHU1REU1XHU0RjVDXHU1MzNBXHVGRjBDXHU4RjZFXHU4QkUyXHU2NUUwXHU2MTBGXHU0RTQ5XHVGRjA5XHUzMDAyXG4gIC8vIFx1NjNEMFx1NEVBNFx1OTg3NVx1NEU1Rlx1NjJDOVx1N0IxNFx1OEJCMFx1RkYxQVx1OEY2RVx1NkIyMVx1NjcyQVx1NkQ4OFx1NTMxNlx1NjgwN1x1OEJCMFx1OTcwMFx1ODk4MVx1MzAwQ1x1NEUwQVx1NkIyMSBBSSBcdTYwM0JcdTdFRDNcdTY1RjZcdTk1RjRcdTMwMERcdTMwMDJcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodGFiID09PSAnY29tbWl0cycpIHsgdm9pZCBsb2FkQ29tbWl0cygpOyB2b2lkIGxvYWROb3RlcygpIH1cbiAgICBpZiAodGFiID09PSAnbm90ZXMnKSB7IHZvaWQgbG9hZE5vdGVzKCk7IHZvaWQgbG9hZE1lbW9yaWVzKCk7IGlmIChjb21taXRzRGF0YSA9PT0gbnVsbCkgdm9pZCBsb2FkQ29tbWl0cygpIH1cbiAgICBpZiAodGFiID09PSAncmV2aWV3Jykgdm9pZCBsb2FkSXNzdWVzKClcbiAgICBpZiAodGFiID09PSAnZXhlY3V0aW9uJykgeyB2b2lkIGxvYWRTY2hlZHVsZWQoKTsgaWYgKHJ1bkRldGFpbCAhPT0gbnVsbCkgdm9pZCBsb2FkUnVuRGV0YWlsKHJ1bkRldGFpbC5ydW4uaWQpIH1cbiAgICBpZiAodGFiID09PSAnc2V0dGluZ3MnICYmIG1vZGVsVGllcnMgPT09IG51bGwpIHZvaWQgbG9hZE1vZGVsQ29uZmlnKClcbiAgfSwgW3RhYiwgcHJvcHMuc2Vzc2lvbklkXSlcblxuICBjb25zdCBsb2FkTW9kZWxDb25maWcgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21vZGVsLWNvbmZpZycpXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSByZXR1cm5cbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIHNldE1vZGVsVGllcnMoKGRhdGEgYXMgeyB0aWVyczogUmVjb3JkPHN0cmluZywgeyBwcm92aWRlcjogc3RyaW5nOyBtb2RlbDogc3RyaW5nIH0+IH0pLnRpZXJzID8/IHt9KVxuICAgICAgc2V0TW9kZWxPcHRpb25zKChkYXRhIGFzIHsgb3B0aW9uczogQXJyYXk8eyBwcm92aWRlcjogc3RyaW5nOyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfT4gfSkub3B0aW9ucyA/PyBbXSlcbiAgICAgIGNvbnN0IGNvbmN1cnJlbmN5ID0gKGRhdGEgYXMgeyBmaXhDb25jdXJyZW5jeT86IG51bWJlciB9KS5maXhDb25jdXJyZW5jeVxuICAgICAgaWYgKHR5cGVvZiBjb25jdXJyZW5jeSA9PT0gJ251bWJlcicpIHNldEZpeENvbmN1cnJlbmN5KFN0cmluZyhjb25jdXJyZW5jeSkpXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTZBMjFcdTU3OEJcdTkxNERcdTdGNkVcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcbiAgICB9XG4gIH1cblxuICBjb25zdCBzYXZlTW9kZWxDb25maWcgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKG1vZGVsVGllcnMgPT09IG51bGwpIHJldHVyblxuICAgIHNldE1vZGVsU2F2aW5nKHRydWUpXG4gICAgc2V0TW9kZWxTYXZlZChmYWxzZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29uY3VycmVuY3kgPSBOdW1iZXIoZml4Q29uY3VycmVuY3kpXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9tb2RlbC1jb25maWcnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB0aWVyczogbW9kZWxUaWVycywgLi4uKE51bWJlci5pc0Zpbml0ZShjb25jdXJyZW5jeSkgPyB7IGZpeENvbmN1cnJlbmN5OiBNYXRoLm1heCgxLCBNYXRoLm1pbigxMCwgTWF0aC50cnVuYyhjb25jdXJyZW5jeSkpKSB9IDoge30pIH0pLFxuICAgICAgfSlcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICBzZXRNb2RlbFNhdmVkKHRydWUpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBzZXRNb2RlbFNhdmVkKGZhbHNlKSB9LCAyNTAwKVxuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRNb2RlbFNhdmluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCByZWZyZXNoU3RhdGUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgcmVmcmVzaGVkID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3N0YXRlP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJyksIHsgaGVhZGVyczogeyBhY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyB9IH0pXG4gICAgaWYgKHJlZnJlc2hlZC5vaykgc2V0U3RhdGUoYXdhaXQgcmVmcmVzaGVkLmpzb24oKSBhcyBXb3Jrc3BhY2VTdGF0ZSlcbiAgfVxuXG4gIC8qKiBcdTdFREZcdTRFMDBcdTUyQThcdTRGNUNcdTYyNjdcdTg4NENcdTU2NjhcdUZGMUFQT1NUIFx1NUJCRlx1NEUzQiBBUElcdUZGMDhcdTY0M0FcdTVFMjZcdTRGMUFcdThCREQgaWQgXHU0RjlCXHU2NzBEXHU1MkExXHU3QUVGXHU1QjlBXHU0RjREXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1MzNBXHVGRjA5XHVGRjBDXHU4RjkzXHU1MUZBXHU4RkRCXHU3RUQzXHU2NzlDXHU5NzYyXHU2NzdGXHVGRjBDXHU1QjhDXHU2MjEwXHU1NDBFXHU1MjM3XHU2NUIwXHU3MkI2XHU2MDAxXHUzMDAyICovXG4gIGNvbnN0IHJ1bkFjdGlvbiA9IGFzeW5jIChuYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgYm9keTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRCdXN5KG5hbWUpXG4gICAgc2V0QWN0aW9uUmVzdWx0KG51bGwpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QocGF0aCwgYm9keSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KGBcdTI3MTcgJHtTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKX1gKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldEFjdGlvblJlc3VsdChmb3JtYXRBY3Rpb25SZXN1bHQoZGF0YSkpXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoYFx1MjcxNyAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKX1gKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRCdXN5KG51bGwpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcnVuQm9vdHN0cmFwID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldEJvb3RzdHJhcHBpbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvYm9vdHN0cmFwJywge30pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldExvYWRFcnJvcihTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRMb2FkRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRCb290c3RyYXBwaW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbmZpcm1NZW1vcnkgPSBhc3luYyAobWVtb3J5SWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeS9jb25maXJtJywgeyBtZW1vcnlJZCB9KVxuICAgIGlmIChvaykge1xuICAgICAgc2V0U3RhdGUoKHByZXZpb3VzKSA9PiBwcmV2aW91cyA9PT0gbnVsbCA/IHByZXZpb3VzIDoge1xuICAgICAgICAuLi5wcmV2aW91cyxcbiAgICAgICAgbWVtb3JpZXM6IHByZXZpb3VzLm1lbW9yaWVzPy5tYXAoKG1lbW9yeSkgPT4gbWVtb3J5LmlkID09PSBtZW1vcnlJZCA/IHsgLi4ubWVtb3J5LCBpc0h1bWFuQ29uZmlybWVkOiB0cnVlLCB0cnV0aExldmVsOiAnZmFjdCcgfSA6IG1lbW9yeSksXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHByb2plY3QgPSBzdGF0ZT8ucHJvamVjdCA/PyBudWxsXG4gIGNvbnN0IGJvb3RzdHJhcCA9IHN0YXRlPy5ib290c3RyYXAgPz8gbnVsbFxuICBjb25zdCBjaGFuZ2VzID0gc3RhdGU/LmNoYW5nZXMgPz8gW11cbiAgY29uc3QgcnVucyA9IHN0YXRlPy5ydW5zID8/IFtdXG4gIGNvbnN0IHZlcmlmaWNhdGlvbnMgPSBzdGF0ZT8udmVyaWZpY2F0aW9ucyA/PyBbXVxuICBjb25zdCBjb25maXJtZWQgPSBzdGF0ZT8uY29uZmlybWVkID8/IFtdXG4gIGNvbnN0IGNvbmNlcHRzID0gc3RhdGU/LmNvbmNlcHRzID8/IFtdXG5cbiAgY29uc3QgdGFiczogQXJyYXk8eyBrZXk6IFRhYktleTsgbGFiZWw6IHN0cmluZyB9PiA9IFtcbiAgICB7IGtleTogJ2NvbW1pdHMnLCBsYWJlbDogdCgndGFiLmNvbW1pdHMnKSB9LFxuICAgIHsga2V5OiAnb3ZlcnZpZXcnLCBsYWJlbDogdCgndGFiLm92ZXJ2aWV3JykgfSxcbiAgICB7IGtleTogJ2V4ZWN1dGlvbicsIGxhYmVsOiB0KCd0YWIuZXhlY3V0aW9uJykgfSxcbiAgICB7IGtleTogJ3JldmlldycsIGxhYmVsOiB0KCd0YWIucmV2aWV3JykgfSxcbiAgICB7IGtleTogJ25vdGVzJywgbGFiZWw6IHQoJ3RhYi5ub3RlcycpIH0sXG4gICAgeyBrZXk6ICdzZXR0aW5ncycsIGxhYmVsOiB0KCd0YWIuc2V0dGluZ3MnKSB9LFxuICBdXG5cbiAgLyoqIFx1NjRDRFx1NEY1Q1x1N0VEM1x1Njc5Q1x1OTc2Mlx1Njc3Rlx1RkYwOFx1NjAzQlx1ODlDOFx1OTg3NVx1N0I3RVx1NzY4NFx1NUZFQlx1NjM3N1x1NTJBOFx1NEY1Q1x1NTE3MVx1NzUyOFx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCByZXN1bHRQYW5lbCA9IGFjdGlvblJlc3VsdCAhPT0gbnVsbFxuICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChDYXJkLCB7IHRpdGxlOiB0KCdyZXN1bHQucGFuZWwnKSB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiBzdHlsZXMucmVzdWx0IH0sIGFjdGlvblJlc3VsdCkpXG4gICAgOiBudWxsXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTk4NzVcdTdCN0UgXHUyNTAwXHUyNTAwXG4gIC8vIFx1OTg3Nlx1OTBFOFx1RkYxQVx1NEVEM1x1NUU5M1x1NjgwRiArIFx1NjNEMFx1NEVBNFx1NTkxQVx1OTAwOVx1NEUwQlx1NjJDOVx1RkYwOFx1N0VBNiAxLzUgXHU5QUQ4XHU1RUE2XHVGRjA5XHVGRjFCXHU0RTBCXHU2NUI5XHU2NzdGXHU1NzU3XHU1MzYwXHU1MTY4XHU1QkJEXHUzMDAyXG4gIGNvbnN0IGFsbFRhcmdldHM6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IG1ldGE6IHN0cmluZzsgc2hhOiBzdHJpbmcgfT4gPSBbXVxuICBpZiAoY29tbWl0c0RhdGEgIT09IG51bGwpIHtcbiAgICBpZiAoIWNvbW1pdHNEYXRhLndvcmtpbmcuaXNDbGVhbikge1xuICAgICAgYWxsVGFyZ2V0cy5wdXNoKHtcbiAgICAgICAga2V5OiAnd29ya2luZycsXG4gICAgICAgIGxhYmVsOiBgXHUyNUNGICR7dCgncmVwby53b3JraW5nJyl9XHVGRjA4JHtjb21taXRzRGF0YS53b3JraW5nLmZpbGVDb3VudH1cdUZGMDlgLFxuICAgICAgICBtZXRhOiBjb21taXRzRGF0YS53b3JraW5nLmZpbGVzLnNsaWNlKDAsIDMpLm1hcCgoZmlsZSkgPT4gZmlsZS5wYXRoLnNwbGl0KCcvJykucG9wKCkpLmpvaW4oJywgJyksXG4gICAgICAgIHNoYTogJ3dvcmtpbmcnLFxuICAgICAgfSlcbiAgICB9XG4gICAgZm9yIChjb25zdCBjb21taXQgb2YgY29tbWl0c0RhdGEuY29tbWl0cykge1xuICAgICAgY29uc3QgYWRkcyA9IGNvbW1pdC5maWxlcy5yZWR1Y2UoKHN1bSwgZmlsZSkgPT4gc3VtICsgZmlsZS5hZGRzLCAwKVxuICAgICAgY29uc3QgZGVscyA9IGNvbW1pdC5maWxlcy5yZWR1Y2UoKHN1bSwgZmlsZSkgPT4gc3VtICsgZmlsZS5kZWxzLCAwKVxuICAgICAgYWxsVGFyZ2V0cy5wdXNoKHtcbiAgICAgICAga2V5OiBjb21taXQuc2hhLFxuICAgICAgICBsYWJlbDogY29tbWl0LnN1YmplY3QsXG4gICAgICAgIG1ldGE6IGAke2NvbW1pdC5zaG9ydEhhc2h9IFx1MDBCNyAke2NvbW1pdC5hdXRob3J9IFx1MDBCNyAke25ldyBEYXRlKGNvbW1pdC5kYXRlKS50b0xvY2FsZVN0cmluZygpfSBcdTAwQjcgKyR7YWRkc30vLSR7ZGVsc31gLFxuICAgICAgICBzaGE6IGNvbW1pdC5zaGEsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBjb25zdCBzaG9ydExhYmVsID0gKHNoYTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBpZiAoc2hhID09PSAnd29ya2luZycpIHJldHVybiB0KCdyZXBvLndvcmtpbmcnKVxuICAgIGNvbnN0IHRhcmdldCA9IGFsbFRhcmdldHMuZmluZCgoZW50cnkpID0+IGVudHJ5LnNoYSA9PT0gc2hhKVxuICAgIHJldHVybiBgJHsodGFyZ2V0Py5tZXRhLnNwbGl0KCcgXHUwMEI3ICcpWzBdKSA/PyBzaGEuc2xpY2UoMCwgNyl9ICR7dGFyZ2V0Py5sYWJlbCA/PyAnJ31gLnRyaW0oKVxuICB9XG4gIGNvbnN0IGZpbHRlcmVkVGFyZ2V0cyA9IHBpY2tlckZpbHRlci50cmltKCkgPT09ICcnXG4gICAgPyBhbGxUYXJnZXRzXG4gICAgOiBhbGxUYXJnZXRzLmZpbHRlcigoZW50cnkpID0+IChlbnRyeS5sYWJlbCArIGVudHJ5Lm1ldGEpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocGlja2VyRmlsdGVyLnRyaW0oKS50b0xvd2VyQ2FzZSgpKSlcblxuICAvLyBcdTI1MDBcdTI1MDAgXHU4RjZFXHU2QjIxXHU4MDVBXHU3QzdCXHU0RTBFXHU2NzJBXHU2RDg4XHU1MzE2XHU2ODA3XHU4QkIwIFx1MjUwMFx1MjUwMCBcdTgwNUFcdTdDN0JcdTg5QzRcdTUyMTlcdTRFMEVcdTY3MERcdTUyQTFcdTdBRUYgY2x1c3RlckNvbW1pdHMgXHU0RTAwXHU4MUY0XHVGRjA4XHU2NUY2XHU5NUY0XHU3QTk3XHU1M0UzICtcbiAgLy8gXHU2NTg3XHU0RUY2XHU5NkY2XHU5MUNEXHU1M0UwXHVGRjBDXHU4OUMxIGNvbW1pdC1yb3VuZHMudHNcdUZGMDlcdUZGMUJcdTY3MkFcdTZEODhcdTUzMTYgPSBcdTRFMEFcdTZCMjEgQUkgXHU2MDNCXHU3RUQzXHU0RTRCXHU1NDBFXHU3Njg0XHU2M0QwXHU0RUE0XHUzMDAyXG4gIGNvbnN0IGNvbW1pdEJ5U2hhID0gbmV3IE1hcCgoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLm1hcCgoY29tbWl0KSA9PiBbY29tbWl0LnNoYSwgY29tbWl0XSkpXG4gIGNvbnN0IGxhc3RTdW1tYXJ5QXQgPSBub3Rlc1xuICAgIC5maWx0ZXIoKG5vdGUpID0+IG5vdGUuc2hhID09PSAnc3VtbWFyeScpXG4gICAgLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiByaWdodC5jcmVhdGVkQXQgLSBsZWZ0LmNyZWF0ZWRBdClbMF0/LmNyZWF0ZWRBdFxuICBjb25zdCBpc1VuZGlnZXN0ZWQgPSAoY29tbWl0OiB7IHNoYTogc3RyaW5nOyBkYXRlOiBudW1iZXIgfSk6IGJvb2xlYW4gPT4ge1xuICAgIGlmIChjb21taXQuc2hhID09PSAnd29ya2luZycpIHJldHVybiBmYWxzZVxuICAgIC8vIFx1NURGMlx1NzUxRlx1NjIxMFx1OEZDNyBBSSBcdTg5RTNcdThCRkJcdUZGMDhhbmFseXplZCBcdTY4MDdcdThCQjBcdUZGMDlcdTUzNzNcdTg5QzZcdTRFM0FcdTVERjJcdTZEODhcdTUzMTZcdUZGMUJcdTU0MjZcdTUyMTlcdTY1QjBcdTRFOEVcdTRFMEFcdTZCMjFcdTYwM0JcdTdFRDNcdTc2ODRcdTkwRkRcdTdCOTdcdTY3MkFcdTZEODhcdTUzMTZcdTMwMDJcbiAgICBpZiAoY29tbWl0QnlTaGEuZ2V0KGNvbW1pdC5zaGEpPy5hbmFseXplZCA9PT0gdHJ1ZSkgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuIGxhc3RTdW1tYXJ5QXQgPT09IHVuZGVmaW5lZCB8fCBjb21taXQuZGF0ZSA+IGxhc3RTdW1tYXJ5QXRcbiAgfVxuICBjb25zdCB1bmRpZ2VzdGVkQ291bnQgPSAoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLmZpbHRlcigoY29tbWl0KSA9PiBpc1VuZGlnZXN0ZWQoY29tbWl0KSkubGVuZ3RoXG4gIGNvbnN0IGNvbW1pdFJvdW5kcyA9IGNsdXN0ZXJJbnRvUm91bmRzKGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKVxuXG4gIC8qKiBcdTRFMEJcdTYyQzlcdTY4NDZcdTc2ODRcdTYzRDBcdTRFQTRcdTg4NENcdUZGMDhcdTU0MkJcdTY3MkFcdTZEODhcdTUzMTZcdTU3MDZcdTcwQjlcdUZGMUJ3b3JraW5nIFx1Njc2MVx1NzZFRVx1NEUwRFx1NjgwN1x1RkYwOVx1MzAwMiAqL1xuICBjb25zdCByZW5kZXJQaWNrZXJSb3cgPSAoZW50cnk6IHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IG1ldGE6IHN0cmluZzsgc2hhOiBzdHJpbmcgfSk6IFJlYWN0LlJlYWN0Tm9kZSA9PiB7XG4gICAgY29uc3QgY29tbWl0ID0gY29tbWl0QnlTaGEuZ2V0KGVudHJ5LnNoYSlcbiAgICBjb25zdCB1bmRpZ2VzdGVkID0gY29tbWl0ICE9PSB1bmRlZmluZWQgJiYgaXNVbmRpZ2VzdGVkKGNvbW1pdClcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBrZXk9e2VudHJ5LmtleX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwYWRkaW5nOiAnN3B4IDEycHgnLCBjdXJzb3I6ICdwb2ludGVyJywgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoZW50cnkuc2hhKSA/ICdyZ2JhKDM3LDk5LDIzNSwwLjA3KScgOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICB9fVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgdG9nZ2xlVGFyZ2V0KGVudHJ5LnNoYSkgfX1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2lkdGg6ICcxNHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLCBmb250V2VpZ2h0OiA3MDAgfX0+XG4gICAgICAgICAge3NlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhlbnRyeS5zaGEpID8gJ1x1MjcxMycgOiAnJ31cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICB7dW5kaWdlc3RlZCAmJiAoXG4gICAgICAgICAgPHNwYW4gdGl0bGU9e3QoJ3BpY2tlci51bmRpZ2VzdGVkJyl9IHN0eWxlPXt7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpLCBmb250U2l6ZTogJzEwcHgnLCBmbGV4U2hyaW5rOiAwIH19Plx1MjVDRjwvc3Bhbj5cbiAgICAgICAgKX1cbiAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWluV2lkdGg6IDAgfX0+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+e2VudHJ5LmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57ZW50cnkubWV0YX08L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIGNvbnN0IGltcGFjdFJpc2tDb2xvciA9IHRoZW1lQXdhcmVUZXh0KGltcGFjdCA9PT0gbnVsbCA/ICcjNTc2MDZhJyA6IChSSVNLX0NPTE9SW2ltcGFjdC5yaXNrTGV2ZWxdID8/ICcjNTc2MDZhJykpXG5cbiAgY29uc3QgY29tbWl0c1RhYiA9IChcbiAgICA8PlxuICAgICAgey8qIFx1NEVEM1x1NUU5M1x1NjgwRiAqL31cbiAgICAgIDxDYXJkPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzI1NjNlYicpfT57Y29tbWl0c0RhdGE/LmJyYW5jaCA/PyAnXHUyMDE0J308L3NwYW4+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JyB9fT57Y29tbWl0c0RhdGE/LnJvb3RQYXRoID8/IHByb2plY3Q/LnJvb3RQYXRoID8/ICdcdTIwMTQnfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRDb21taXRzKCkgfX0+e3QoJ2FjdGlvbi5yZWZyZXNoJyl9PC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9XG4gICAgICAgICAgICBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3NjYW5IaXN0b3J5JywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2Jvb3RzdHJhcCcsIHsgaW5jbHVkZUhpc3Rvcnk6IHRydWUsIHN1bW1hcml6ZTogdHJ1ZSwgbWF4Q29tbWl0czogMzAgfSkgfX1cbiAgICAgICAgICA+e2J1c3kgPT09ICdzY2FuSGlzdG9yeScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgncmVwby5zY2FuSGlzdG9yeScpfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FyZD5cbiAgICAgIHsvKiBcdTYzRDBcdTRFQTRcdTU5MUFcdTkwMDlcdTRFMEJcdTYyQzlcdUZGMDhcdTdEMjdcdTUxRDFcdUZGMUJcdTkwMDlcdTRFMkRcdTUxODVcdTVCQjlcdTVCOENcdTY1NzRcdTVDNTVcdTc5M0FcdUZGMENcdTUxNDFcdThCQjhcdTgxRUFcdTcxMzZcdTYzNjJcdTg4NENcdUZGMDkgKi99XG4gICAgICA8Q2FyZCB0aXRsZT17dCgncGlja2VyLnRpdGxlJyl9PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH19PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHdpZHRoOiAnMTAwJScsIHRleHRBbGlnbjogJ2xlZnQnLCBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0Jywgd2hpdGVTcGFjZTogJ25vcm1hbCcgfX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0UGlja2VyT3BlbighcGlja2VyT3BlbikgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtaW5XaWR0aDogMCB9fT5cbiAgICAgICAgICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDBcbiAgICAgICAgICAgICAgICA/IHQoJ3BpY2tlci5wbGFjZWhvbGRlcicpXG4gICAgICAgICAgICAgICAgOiBgJHt0KCdwaWNrZXIuc2VsZWN0ZWQnKX0gJHtzZWxlY3RlZFRhcmdldHMubGVuZ3RofVx1RkYxQSR7c2VsZWN0ZWRUYXJnZXRzLm1hcChzaG9ydExhYmVsKS5qb2luKCdcdUZGMUInKX1gfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWFyZ2luTGVmdDogJzhweCcsIGZsZXhTaHJpbms6IDAgfX0+XHUyNUJFPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIHtwaWNrZXJPcGVuICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCB6SW5kZXg6IDI5IH19IG9uQ2xpY2s9eygpID0+IHsgc2V0UGlja2VyT3BlbihmYWxzZSkgfX0gLz5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICdjYWxjKDEwMCUgKyA0cHgpJywgbGVmdDogMCwgcmlnaHQ6IDAsIHpJbmRleDogMzAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JywgYm94U2hhZG93OiAnMCA4cHggMjRweCByZ2JhKDAsMCwwLDAuMTIpJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc4cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5pbnB1dH1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ3BpY2tlci5maWx0ZXInKX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3BpY2tlckZpbHRlcn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBpY2tlckZpbHRlcihlLnRhcmdldC52YWx1ZSkgfX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICB7KGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKS5zb21lKChjb21taXQpID0+IGlzVW5kaWdlc3RlZChjb21taXQpKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX1cbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgncGlja2VyLnVuZGlnZXN0ZWQnKX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNlbGVjdENvbW1pdHMoKGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKS5maWx0ZXIoKGNvbW1pdCkgPT4gaXNVbmRpZ2VzdGVkKGNvbW1pdCkpLm1hcCgoY29tbWl0KSA9PiBjb21taXQuc2hhKSkgfX1cbiAgICAgICAgICAgICAgICAgICAgPlx1MjVDRiB7dCgncGlja2VyLnNlbGVjdEFsbFVuZGlnZXN0ZWQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHNldFNlbGVjdGVkVGFyZ2V0cyhbXSkgfX0+e3QoJ3BpY2tlci5jbGVhcicpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWF4SGVpZ2h0OiA0MjAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgICAge3BpY2tlckZpbHRlci50cmltKCkgPT09ICcnID8gKFxuICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFx1NkQ0Rlx1ODlDOFx1ODlDNlx1NTZGRVx1RkYxQXdvcmtpbmcgXHU2NzYxXHU3NkVFICsgXHU2MzA5XHU4RjZFXHU2QjIxXHU1MjA2XHU3RUM0XHU3Njg0XHU2M0QwXHU0RUE0XHVGRjA4XHU1MzU1XHU2M0QwXHU0RUE0XHU4RjZFXHU0RTBEXHU2NjNFXHU3OTNBXHU3RUM0XHU1OTM0XHVGRjBDXHU5MDdGXHU1MTREXHU1NjZBXHU5N0YzXHVGRjA5XHUzMDAyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZXM6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3b3JraW5nID0gYWxsVGFyZ2V0cy5maW5kKChlbnRyeSkgPT4gZW50cnkuc2hhID09PSAnd29ya2luZycpXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmtpbmcgIT09IHVuZGVmaW5lZCkgbm9kZXMucHVzaChyZW5kZXJQaWNrZXJSb3cod29ya2luZykpXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnlTaGEgPSBuZXcgTWFwKGFsbFRhcmdldHMuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuc2hhICE9PSAnd29ya2luZycpLm1hcCgoZW50cnkpID0+IFtlbnRyeS5zaGEsIGVudHJ5XSkpXG4gICAgICAgICAgICAgICAgICAgICAgY29tbWl0Um91bmRzLmZvckVhY2goKHJvdW5kLCByb3VuZEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRyaWVzID0gcm91bmQuY29tbWl0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChjb21taXQpID0+IGJ5U2hhLmdldChjb21taXQuc2hhKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyB7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBtZXRhOiBzdHJpbmc7IHNoYTogc3RyaW5nIH0gPT4gZW50cnkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyaWVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cmllcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMucHVzaChyZW5kZXJQaWNrZXJSb3coZW50cmllc1swXSEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoYXMgPSBlbnRyaWVzLm1hcCgoZW50cnkpID0+IGVudHJ5LnNoYSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbFNlbGVjdGVkID0gc2hhcy5ldmVyeSgoc2hhKSA9PiBzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoc2hhKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtgcm91bmQtJHtyb3VuZEluZGV4fWB9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzhweCcsIHBhZGRpbmc6ICc2cHggMTJweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMywgcmdiYSg1LDUsNSwwLjA2KSknLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx1RDgzRFx1REREMyB7dChyb3VuZEluZGV4ID09PSAwID8gJ3BpY2tlci5yb3VuZExhdGVzdCcgOiAncGlja2VyLnJvdW5kJykucmVwbGFjZSgne259JywgU3RyaW5nKHJvdW5kSW5kZXggKyAxKSl9IFx1MDBCNyB7U3RyaW5nKGVudHJpZXMubGVuZ3RoKX0ge3QoJ3JlcG8uY29tbWl0cycpfSBcdTAwQjcge25ldyBEYXRlKHJvdW5kLmZpcnN0QXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpfVx1MjAxM3tuZXcgRGF0ZShyb3VuZC5sYXN0QXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTBweCcgfX0gb25DbGljaz17KCkgPT4geyBzZWxlY3RSb3VuZChzaGFzKSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthbGxTZWxlY3RlZCA/IHQoJ3BpY2tlci5yb3VuZENsZWFyJykgOiB0KCdwaWNrZXIucm91bmRTZWxlY3QnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSBub2Rlcy5wdXNoKHJlbmRlclBpY2tlclJvdyhlbnRyeSkpXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgfSkoKVxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRUYXJnZXRzLm1hcCgoZW50cnkpID0+IHJlbmRlclBpY2tlclJvdyhlbnRyeSkpXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgeyhwaWNrZXJGaWx0ZXIudHJpbSgpID09PSAnJyA/IGFsbFRhcmdldHMgOiBmaWx0ZXJlZFRhcmdldHMpLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdwaWNrZXIubm9NYXRjaCcpfTwvZGl2Pn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpblRvcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdwaWNrZXIuaGludCcpfTwvc3Bhbj5cbiAgICAgICAgICB7dW5kaWdlc3RlZENvdW50ID4gMCAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8c3BhbiB0aXRsZT17dCgncGlja2VyLnVuZGlnZXN0ZWQnKX0gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JykgfX0+XG4gICAgICAgICAgICAgICAgXHUyNUNGIHt0KCdwaWNrZXIudW5kaWdlc3RlZENvdW50JykucmVwbGFjZSgne259JywgU3RyaW5nKHVuZGlnZXN0ZWRDb3VudCkpfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IHRpdGxlPXt0KCdwaWNrZXIuZGlnZXN0QWxsSGludCcpfSBvbkNsaWNrPXtkaWdlc3RBbGx9Plx1MjZBMSB7dCgncGlja2VyLmRpZ2VzdEFsbCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7KGRldGFpbFF1ZXVlZENvdW50ID4gMCB8fCBkZXRhaWxSdW5uaW5nQ291bnQgPiAwKSAmJiAoXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjZGNkY2FhJyl9PlxuICAgICAgICAgICAgICB7ZGV0YWlsUnVubmluZ0NvdW50ID4gMCA/IHQoJ2RldGFpbC5haUxvYWRpbmcnKSA6ICcnfVxuICAgICAgICAgICAgICB7ZGV0YWlsUnVubmluZ0NvdW50ID4gMCAmJiBkZXRhaWxRdWV1ZWRDb3VudCA+IDAgPyAnICcgOiAnJ31cbiAgICAgICAgICAgICAge2RldGFpbFF1ZXVlZENvdW50ID4gMCA/ICdcdTIzRjMgJyArIHQoJ2RldGFpbC5xdWV1ZWQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoZGV0YWlsUXVldWVkQ291bnQpKSA6ICcnfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9DYXJkPlxuXG4gICAgICB7Y29tbWl0c0Vycm9yICE9PSBudWxsICYmIDxDYXJkPjxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3JlcG8ubG9hZEZhaWxlZCcpfToge2NvbW1pdHNFcnJvcn08L2Rpdj48L0NhcmQ+fVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDAgJiYgPENhcmQ+PGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZGV0YWlsLnBpY2snKX08L2Rpdj48L0NhcmQ+fVxuXG4gICAgICB7LyogXHU1REU1XHU0RjVDXHU4RjZFXHU2QjIxXHU1M0Q5XHU0RThCXHVGRjFBXHU1OTFBXHU2M0QwXHU0RUE0XHU2NTc0XHU0RjUzXHU4OUUzXHU4QkZCICovfVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5maWx0ZXIoKHRhcmdldCkgPT4gdGFyZ2V0ICE9PSAnd29ya2luZycpLmxlbmd0aCA+PSAyICYmIChcbiAgICAgICAgPENhcmQgdGl0bGU9eydcdUQ4M0RcdURDRDYgJyArIHQoJ25hcnJhdGl2ZS50aXRsZScpfT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogbmFycmF0aXZlID09PSBudWxsID8gJzAnIDogJzhweCcgfX0+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17bmFycmF0aXZlQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWROYXJyYXRpdmUoKSB9fT5cbiAgICAgICAgICAgICAge25hcnJhdGl2ZUJ1c3kgPyB0KCduYXJyYXRpdmUucnVubmluZycpIDogJ1x1MjcyOCAnICsgdCgnbmFycmF0aXZlLmdlbmVyYXRlJyl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgbmFycmF0aXZlLmNhY2hlZCAmJiAoXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdjYWNoZS5oaXQnKX17bmFycmF0aXZlLmdlbmVyYXRlZEF0ICE9PSB1bmRlZmluZWQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUobmFycmF0aXZlLmdlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9PC9zcGFuPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgcmVuZGVyQ29zdEJhZGdlKG5hcnJhdGl2ZS5jb3N0VXNkLCB0KCdjb3N0LnRvb2x0aXAnKSl9XG4gICAgICAgICAgICB7bmFycmF0aXZlICE9PSBudWxsICYmIChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gZGlzYWJsZWQ9e25hcnJhdGl2ZUJ1c3l9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkTmFycmF0aXZlKHRydWUpIH19Pnt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7bmFycmF0aXZlRXJyb3IgIT09ICcnICYmIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLmVtcHR5LCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkMTI0MmYnKSB9fT57bmFycmF0aXZlRXJyb3J9PC9kaXY+fVxuICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luVG9wOiAnNHB4JyB9fT57dCgnbmFycmF0aXZlLmRpZ2VzdEhpbnQnKX08L2Rpdj59XG4gICAgICAgICAge25hcnJhdGl2ZSAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnIH19PntyZW5kZXJTdHJ1Y3R1cmVkQ29udGVudChuYXJyYXRpdmUubmFycmF0aXZlKX08L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuXG4gICAgICB7LyogXHU2QkNGXHU2NzYxXHU5MDA5XHU0RTJEXHU2M0QwXHU0RUE0XHU3Njg0IEFJIFx1ODlFM1x1OEJGQiAqL31cbiAgICAgIHtzZWxlY3RlZFRhcmdldHMubWFwKCh0YXJnZXQpID0+IHtcbiAgICAgICAgY29uc3QgZCA9IGRldGFpbHNbdGFyZ2V0XVxuICAgICAgICBjb25zdCBsYWJlbCA9IHRhcmdldCA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiAoZD8uY29tbWl0Py5tZXNzYWdlID8/IHRhcmdldC5zbGljZSgwLCA4KSlcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Q2FyZCBrZXk9e2BkLSR7dGFyZ2V0fWB9IHRpdGxlPXtgXHVEODNEXHVERDBEICR7bGFiZWx9JHt0YXJnZXQgIT09ICd3b3JraW5nJyA/IGBcdUZGMDgke3RhcmdldC5zbGljZSgwLCA4KX1cdUZGMDlgIDogJyd9YH0+XG4gICAgICAgICAgICB7ZCAhPT0gdW5kZWZpbmVkICYmIChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzQ2FjaGVkID09PSB0cnVlICYmIChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e3QoJ2NhY2hlLmhpdCcpfXtkLmFuYWx5c2lzR2VuZXJhdGVkQXQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUoZC5hbmFseXNpc0dlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge3JlbmRlckNvc3RCYWRnZShkLmFuYWx5c2lzQ29zdFVzZCwgdCgnY29zdC50b29sdGlwJykgKyAoZC5hbmFseXNpc1Rva2VucyA/IGBcdUZGMDhpbiAke2QuYW5hbHlzaXNUb2tlbnMuaW5wdXR9IC8gb3V0ICR7ZC5hbmFseXNpc1Rva2Vucy5vdXRwdXR9IHRva2Vuc1x1RkYwOWAgOiAnJykpfVxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgbG9hZERldGFpbCh0YXJnZXQsIHRydWUpIH19Pnt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ2RldGFpbC5zYXZlTm90ZUhpbnQnKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hhID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyAnd29ya2luZycgOiB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3RlcycsIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogYCR7dCgnZGV0YWlsLnNhdmVOb3RlVGl0bGUnKX1cdUZGMUEkeyhkLmNvbW1pdD8ubWVzc2FnZSA/PyB0YXJnZXQpLnNsaWNlKDAsIDYwKX1gLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFtgXHUzMDEwXHU2NTM5XHU0RTg2XHU0RUMwXHU0RTQ4XHUzMDExXFxuJHtkLmFuYWx5c2lzLndoYXR9YCwgYFx1MzAxMFx1NUI5RVx1NzNCMFx1OTAzQlx1OEY5MVx1MzAxMVxcbiR7KGQuYW5hbHlzaXMubG9naWMgPz8gW10pLmpvaW4oJ1x1RkYxQicpfWAsIGBcdTMwMTBcdTk4Q0VcdTk2NjlcdTcwQjlcdTMwMTFcXG4keyhkLmFuYWx5c2lzLnJpc2tzID8/IFtdKS5qb2luKCdcdUZGMUInKX1gXS5maWx0ZXIoKGJsb2NrKSA9PiAhYmxvY2suZW5kc1dpdGgoJ1x1MzAxMVxcbicpKS5qb2luKCdcXG5cXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgICBzaGEsIHRhZ3M6ICdcdTY4MzhcdTY3RTUnLFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCh7IG9rIH0pID0+IHsgc2V0QWN0aW9uUmVzdWx0KG9rID8gJ1x1MjcxMyBcdTVERjJcdTVCNThcdTRFM0FcdTdCMTRcdThCQjBcdUZGMDhcdTdCMTRcdThCQjBcdTk4NzVcdTUzRUZcdTY3RTVcdTc3MEJcdUZGMDknIDogJ1x1MjcxNyBcdTRGRERcdTVCNThcdTU5MzFcdThEMjUnKSA7IGlmIChvaykgdm9pZCBsb2FkTm90ZXMoKSB9KVxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XHVEODNEXHVEQ0JFIHt0KCdkZXRhaWwuc2F2ZU5vdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdkZXRhaWwuc2F2ZU1lbW9yeUhpbnQnKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hhID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyB1bmRlZmluZWQgOiB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnknLCB7XG4gICAgICAgICAgICAgICAgICAgICAgbWVtb3J5VHlwZTogJ3Jpc2tfaG90c3BvdCcsIHNvdXJjZVRhZzogJ3JldmlldycsIGJhc2lzU2hhOiBzaGEsXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGBcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdUZGMUEkeyhkLmNvbW1pdD8ubWVzc2FnZSA/PyB0YXJnZXQpLnNsaWNlKDAsIDYwKX1gLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFtkLmFuYWx5c2lzLndoYXQsIChkLmFuYWx5c2lzLnJpc2tzID8/IFtdKS5qb2luKCdcdUZGMUInKV0uZmlsdGVyKChwYXJ0KSA9PiBwYXJ0ICE9PSAnJykuam9pbignXFxuLS0tXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHsgb2sgfSkgPT4geyBzZXRBY3Rpb25SZXN1bHQob2sgPyAnXHUyNzEzIFx1NURGMlx1NkM4OVx1NkRDMFx1NEUzQVx1OEJCMFx1NUZDNlx1RkYwOFx1NUY4NVx1Nzg2RVx1OEJBNFx1OTYxRlx1NTIxN1x1RkYwOScgOiAnXHUyNzE3IFx1NEZERFx1NUI1OFx1NTkzMVx1OEQyNScpOyBpZiAob2spIHZvaWQgbG9hZE1lbW9yaWVzKCkgfSlcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlx1RDgzRVx1RERFMCB7dCgnZGV0YWlsLnNhdmVNZW1vcnknKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2QgPT09IHVuZGVmaW5lZCA/IChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57ZGV0YWlsU3RhdHVzW3RhcmdldF0gPT09ICdxdWV1ZWQnID8gJ1x1MjNGMyAnICsgdCgnZGV0YWlsLmNhcmRRdWV1ZWQnKSA6IHQoJ2RldGFpbC5haUxvYWRpbmcnKX08L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAge2QuY29tbWl0ICE9PSBudWxsICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5jb21taXRNZXRhfT57ZC5jb21taXQuYXV0aG9yfSBcdTAwQjcge25ldyBEYXRlKGQuY29tbWl0LmRhdGUpLnRvTG9jYWxlU3RyaW5nKCl9IFx1MDBCNyB7ZC5maWxlcy5sZW5ndGh9IHt0KCdkZXRhaWwuZmlsZXMnKX0gXHUwMEI3ICt7ZC5pbnNlcnRpb25zfS8te2QuZGVsZXRpb25zfTwvZGl2Pn1cbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy53aGF0ICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzhweCcgfX0+e3QoJ2RldGFpbC53aGF0Jyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy53aGF0fT57ZC5hbmFseXNpcy53aGF0fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5sb2dpYy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zZWN0aW9uVGl0bGV9Pnt0KCdkZXRhaWwubG9naWMnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2QuYW5hbHlzaXMubG9naWMubWFwKChzdGVwLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXtzdHlsZXMubG9naWNTdGVwfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJywgZm9udFdlaWdodDogNjAwIH19PntpICsgMX0uPC9zcGFuPntzdGVwfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2QuYW5hbHlzaXMucmlza3MubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzZweCcgfX0+e3QoJ2RldGFpbC5yaXNrJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLnJpc2tzLm1hcCgocmlzaywgaSkgPT4gPGRpdiBrZXk9e2l9IHN0eWxlPXt7IC4uLnN0eWxlcy5yaXNrSXRlbSwgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjOWE2NzAwJykgfX0+XHUyNkEwIHtyZW5kZXJXaXRoUGVlayhyaXNrKX08L2Rpdj4pfVxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7LyogXHU2NTg3XHU0RUY2XHU2RTA1XHU1MzU1ICsgXHU5MDEwXHU2NTg3XHU0RUY2XHU5QUQ4XHU0RUFFXHU1QkY5XHU2QkQ0ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnMTBweCcgfX0+e3QoJ2RldGFpbC5maWxlcycpfTwvZGl2PlxuICAgICAgICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAge2QuZmlsZXMubWFwKChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7dGFyZ2V0fXwke2ZpbGUucGF0aH1gXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF0Y2ggPSBmaWxlRGlmZnNba2V5XVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtrZXl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19PntmaWxlLnBhdGh9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyMxYTdmMzcnKSwgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+K3tmaWxlLmFkZHN9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNjZjIyMmUnKSwgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+LXtmaWxlLmRlbHN9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkRmlsZURpZmYodGFyZ2V0LCBmaWxlLnBhdGgpIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGF0Y2ggPT09IHVuZGVmaW5lZCA/IHQoJ2RpZmYuc2hvdycpIDogdCgnZGlmZi5oaWRlJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7cGF0Y2ggIT09IHVuZGVmaW5lZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17YCR7a2V5fS1kaWZmYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY29sU3Bhbj17NH0gc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBwYWRkaW5nOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGlmZlZpZXcgcGF0Y2g9e3BhdGNofSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQ2FyZD5cbiAgICAgICAgKVxuICAgICAgfSl9XG5cbiAgICAgIHsvKiBcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdUZGMUFcdTYzMDlcdTk0QUUgKyBcdTk4Q0VcdTk2NjlcdTY3ODRcdTYyMTAgKyBcdTU5MjdcdTU2RkUgKyBcdTVGNzFcdTU0Q0RcdTcwQjlcdTY2MEVcdTdFQzYgKyBcdThCQjBcdTVGQzZcdTgwNTRcdTUyQTggKi99XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17dCgnZGV0YWlsLmltcGFjdCcpfT5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17aW1wYWN0TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJbXBhY3QoKSB9fT5cbiAgICAgICAgICAgIHtpbXBhY3RMb2FkaW5nID8gdCgnZGV0YWlsLmltcGFjdExvYWRpbmcnKSA6IHQoJ2RldGFpbC5pbXBhY3QnKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIGltcGFjdC5leHBsYW5hdGlvbnNDYWNoZWQgPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKCcjOGI4YjhiJyksIG1hcmdpbkxlZnQ6ICc4cHgnIH19PlxuICAgICAgICAgICAgICB7dCgnY2FjaGUuaGl0Jyl9e2ltcGFjdC5nZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShpbXBhY3QuZ2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ31cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtpbXBhY3QgIT09IG51bGwgJiYgcmVuZGVyQ29zdEJhZGdlKGltcGFjdC5leHBsYW5hdGlvbnNDb3N0VXNkLCB0KCdjb3N0LnRvb2x0aXAnKSl9XG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIG1hcmdpbkxlZnQ6ICc4cHgnLCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gZGlzYWJsZWQ9e2ltcGFjdExvYWRpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkSW1wYWN0KHRydWUpIH19PlxuICAgICAgICAgICAgICB7dCgnY2FjaGUucmVnZW5lcmF0ZScpfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnMTBweCcsIG1hcmdpbjogJzEwcHggMCA0cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5iYWRnZShpbXBhY3RSaXNrQ29sb3IpLCBmb250U2l6ZTogJzEzcHgnLCBwYWRkaW5nOiAnM3B4IDEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAge3QoJ2ltcGFjdC5yaXNrJyl9OiB7aW1wYWN0LnJpc2tMZXZlbH1cdUZGMDh7aW1wYWN0LnJpc2tTY29yZX1cdUZGMDlcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAge2ltcGFjdC5rZXlDaGFuZ2VQb2ludHMgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3Qua2V5Q2hhbmdlUG9pbnRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjOWE2NzAwJykgfX0+XHUyNkEwIHt0KCdpbXBhY3Qua2V5UG9pbnRzJyl9OiB7aW1wYWN0LmtleUNoYW5nZVBvaW50cy5tYXAoKGZpbGUpID0+IGZpbGUuc3BsaXQoJy8nKS5wb3AoKSkuam9pbignXHUzMDAxJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7aW1wYWN0LnJpc2tGYWN0b3JzICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LnJpc2tGYWN0b3JzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2VjdGlvblRpdGxlfT57dCgnaW1wYWN0LmZhY3RvcnMnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnMnB4JywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpbXBhY3Qucmlza0ZhY3RvcnMubWFwKChmYWN0b3IsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBmb250U2l6ZTogJzEycHgnLCBwYWRkaW5nOiAnM3B4IDhweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLCBib3JkZXJSYWRpdXM6ICc0cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2ZhY3Rvci50ZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBpbXBhY3RSaXNrQ29sb3IsIGZvbnRXZWlnaHQ6IDYwMCB9fT4re2ZhY3Rvci5wb2ludHN9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8SW1wYWN0R3JhcGggZGF0YT17aW1wYWN0fSB0PXt0fSAvPlxuICAgICAgICAgICAgICB7aW1wYWN0LmxldmVscy5sZW5ndGggPT09IDAgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnaW1wYWN0Lm5vbmUnKX08L2Rpdj59XG4gICAgICAgICAgICAgIHsvKiBcdTUxRkRcdTY1NzBcdTdFQTdcdTVGNzFcdTU0Q0RcdUZGMUFcdTY3MkNcdTZCMjFcdTRGRUVcdTY1MzlcdTRFODZcdTU0RUFcdTRFOUJcdTUxRkRcdTY1NzBcdTMwMDFcdTZDRTJcdTUzQ0FcdTRFODZcdThDMDFcdTc2ODRcdTU0RUFcdTRFOUJcdTUxRkRcdTY1NzBcdTMwMDFcdThDMDNcdTc1MjhcdTcwQjlcdTU3MjhcdTU0RUEgKi99XG4gICAgICAgICAgICAgIHtpbXBhY3QuZnVuY3Rpb25JbXBhY3QgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3QuZnVuY3Rpb25JbXBhY3QubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnMTJweCcgfX0+e3QoJ2ltcGFjdC5mdW5jdGlvbnMnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAge2ltcGFjdC5mdW5jdGlvbkltcGFjdC5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5LnN5bWJvbH0gc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAxMHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNkOTc3MDYnKX0+e2VudHJ5LnN5bWJvbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5sYWJlbCwgbWFyZ2luTGVmdDogJzhweCcgfX0+e2VudHJ5LmRlZmluZWRJbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5yb2xlICE9PSB1bmRlZmluZWQgJiYgZW50cnkucm9sZSAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdpbmxpbmUnLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+e3QoJ2ltcGFjdC5mdW5jUm9sZScpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkucm9sZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNoYW5nZSAhPT0gdW5kZWZpbmVkICYmIGVudHJ5LmNoYW5nZSAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0IH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdpbmxpbmUnLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM5YTY3MDAnKSB9fT57dCgnaW1wYWN0LmZ1bmNDaGFuZ2UnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmltcGFjdCAhPT0gdW5kZWZpbmVkICYmIGVudHJ5LmltcGFjdCAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBtYXJnaW5Cb3R0b206ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdpbmxpbmUnLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNjZTkxNzgnKSB9fT57dCgnaW1wYWN0LmZ1bmNDYWxsZXJzJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5pbXBhY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5jYWxsZXJzLm1hcCgoY2FsbGVyLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyAuLi5zdHlsZXMubG9naWNTdGVwLCBtYXJnaW5Ub3A6ICczcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpIH19Plx1MjFCMzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4Jywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSBkb3R0ZWQnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBvcGVuUGVlayhjYWxsZXIuZmlsZSwgTnVtYmVyKGNhbGxlci5saW5lKSkgfX0+e2NhbGxlci5maWxlfTp7Y2FsbGVyLmxpbmV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cdTIwMTQge2NhbGxlci5zbmlwcGV0LnNsaWNlKDAsIDgwKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHtpbXBhY3QuZnVuY3Rpb25JbXBhY3QgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3QuZnVuY3Rpb25JbXBhY3QubGVuZ3RoID09PSAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdpbXBhY3QuZnVuY3Rpb25zTm9uZScpfTwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7aW1wYWN0Lm1lbW9yaWVzICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0Lm1lbW9yaWVzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMTBweCcsIHBhZGRpbmc6ICc4cHggMTBweCcsIGJvcmRlcjogJzFweCBkYXNoZWQgcmdiYSgzNyw5OSwyMzUsMC4zNSknLCBib3JkZXJSYWRpdXM6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+e3QoJ2ltcGFjdC5tZW1vcnknKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4V3JhcDogJ3dyYXAnLCBnYXA6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICB7aW1wYWN0Lm1lbW9yaWVzLm1hcCgobWVtb3J5LCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4ga2V5PXtpfSBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9PnttZW1vcnkudGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cblxuICAgICAgey8qIFx1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNVx1RkYxQVx1N0VEM1x1OEJCQSArIFx1N0VEM1x1Njc4NFx1NTMxNlx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NSAqL31cbiAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdkZXRhaWwub3B0aW1hbGl0eScpfT5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17cmV2aWV3TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSZXZpZXdzKCkgfX0+XG4gICAgICAgICAgICB7cmV2aWV3TG9hZGluZyA/IHQoJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZycpIDogdCgnZGV0YWlsLm9wdGltYWxpdHknKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLm1hcCgodGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByID0gcmV2aWV3c1t0YXJnZXRdXG4gICAgICAgICAgICBpZiAociA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbFxuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/IHQoJ3JlcG8ud29ya2luZycpIDogdGFyZ2V0LnNsaWNlKDAsIDgpXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17YHItJHt0YXJnZXR9YH0gc3R5bGU9e3sgbWFyZ2luVG9wOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgICAgICAgICAge3IuY2FjaGVkID09PSB0cnVlICYmIChcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57dCgnY2FjaGUuaGl0Jyl9e3IuZ2VuZXJhdGVkQXQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUoci5nZW5lcmF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKSA6ICcnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7cmVuZGVyQ29zdEJhZGdlKHIuY29zdFVzZCwgdCgnY29zdC50b29sdGlwJykpfVxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSZXZpZXdzKHRydWUpIH19Pnt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge3IudmVyZGljdCAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCwgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDUpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMzcsOTksMjM1LDAuMiknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnIH19PntyLnZlcmRpY3R9PC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7ci5pc3N1ZUxpc3QgIT09IHVuZGVmaW5lZCAmJiByLmlzc3VlTGlzdC5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRyPntbJ3Jldmlldy5jb2wuc2V2ZXJpdHknLCAncmV2aWV3LmNvbC5jYXRlZ29yeScsICdyZXZpZXcuY29sLnRpdGxlJywgJ3Jldmlldy5jb2wuZXZpZGVuY2UnLCAncmV2aWV3LmNvbC5maXgnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAge3IuaXNzdWVMaXN0Lm1hcCgoaXNzdWUsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShpc3N1ZS5zZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyA/ICcjZjE0YzRjJyA6IGlzc3VlLnNldmVyaXR5ID09PSAnaGlnaCcgPyAnI2NlOTE3OCcgOiBpc3N1ZS5zZXZlcml0eSA9PT0gJ21lZGl1bScgPyAnI2RjZGNhYScgOiAnIzU2OWNkNicpfT57aXNzdWUuc2V2ZXJpdHl9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXNzdWUuY2F0ZWdvcnl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntpc3N1ZS50aXRsZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4Jywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57aXNzdWUuZXZpZGVuY2V9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntpc3N1ZS5maXh9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXZpZXcuY2xlYW4nKX08L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KX1cbiAgICAgICAgICB7cmV2aWV3TG9hZGluZyAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnKX08L2Rpdj59XG4gICAgICAgICAgeyFyZXZpZXdMb2FkaW5nICYmIHNlbGVjdGVkVGFyZ2V0cy5ldmVyeSgodGFyZ2V0KSA9PiByZXZpZXdzW3RhcmdldF0gPT09IHVuZGVmaW5lZCkgJiYgKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncmV2aWV3LmhpbnQnKX08L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuICAgIDwvPlxuICApXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1OEJCRVx1N0Y2RVx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgVElFUl9MQUJFTFM6IEFycmF5PHsga2V5OiBzdHJpbmc7IHpoOiBzdHJpbmc7IGRlc2M6IHN0cmluZyB9PiA9IFtcbiAgICB7IGtleTogJ3N0YW5kYXJkJywgemg6ICdcdTg5RTNcdThCRkIgLyBcdTUxRkRcdTY1NzBcdTVGNzFcdTU0Q0RcdThCRjRcdTY2MEUnLCBkZXNjOiAnXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XHU3Njg0IEFJIFx1ODlFM1x1OEJGQlx1MzAwMVx1NUY3MVx1NTRDRFx1NTIwNlx1Njc5MCcgfSxcbiAgICB7IGtleTogJ3JlYXNvbmluZycsIHpoOiAnXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1IC8gXHU2MjY3XHU4ODRDXHU4QkExXHU1MjEyJywgZGVzYzogJ1x1OEJDNFx1NUJBMVx1MzAwMVx1OEJBMVx1NTIxMlx1NzUxRlx1NjIxMFx1MzAwMUFJIFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEMycgfSxcbiAgICB7IGtleTogJ2Zhc3QnLCB6aDogJ1x1NTM4Nlx1NTNGMlx1OEY3Qlx1Njc5MCcsIGRlc2M6ICdcdTYyNkJcdTYzQ0ZcdTUzODZcdTUzRjJcdTY1RjZcdTc2ODRcdTkwMTBcdTYzRDBcdTRFQTRcdTRFMDBcdTUzRTVcdThCREQnIH0sXG4gICAgeyBrZXk6ICd2ZXJpZmllcicsIHpoOiAnXHU5QThDXHU2NTM2JywgZGVzYzogJ1x1NjUzOVx1NTJBOFx1OUE4Q1x1NjUzNlx1NzY4NCBBSSBcdTU5MERcdTY4MzgnIH0sXG4gIF1cblxuICBjb25zdCBzZXR0aW5nc1RhYiA9IChcbiAgICA8PlxuICAgICAgey8qIFx1NkEyMVx1NTc4Qlx1NTIwNlx1OTE0RFx1RkYxQVx1NTNFRlx1ODlDNlx1NTMxNlx1NTIwN1x1NjM2Mlx1NTQwNFx1NEVGQlx1NTJBMVx1NzUyOFx1NzY4NFx1NkEyMVx1NTc4Qlx1RkYwQ1x1NEZERFx1NUI1OFx1NTM3M1x1NzUxRlx1NjU0OCAqL31cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdtb2RlbC50aXRsZScpfT5cbiAgICAgICAge21vZGVsVGllcnMgPT09IG51bGwgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnbW9kZWwubG9hZGluZycpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICB7VElFUl9MQUJFTFMubWFwKCh0aWVyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBtb2RlbFRpZXJzW3RpZXIua2V5XVxuICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnQgPyBjdXJyZW50LnByb3ZpZGVyICsgJy8nICsgY3VycmVudC5tb2RlbCA6ICcnXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e3RpZXIua2V5fSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1pbldpZHRoOiAxNTAsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fT57dGllci56aH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAyNDAgfX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2ID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodiA9PT0gJycpIHsgc2V0TW9kZWxUaWVycyh7IC4uLm1vZGVsVGllcnMsIFt0aWVyLmtleV06IHsgcHJvdmlkZXI6ICcnLCBtb2RlbDogJycgfSB9KTsgcmV0dXJuIH1cbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbcHJvdmlkZXIsIC4uLnJlc3RdID0gdi5zcGxpdCgnLycpXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZWwgPSByZXN0LmpvaW4oJy8nKVxuICAgICAgICAgICAgICAgICAgICAgIHNldE1vZGVsVGllcnMoeyAuLi5tb2RlbFRpZXJzLCBbdGllci5rZXldOiB7IHByb3ZpZGVyLCBtb2RlbCB9IH0pXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj57dCgnbW9kZWwuZm9sbG93Q2hhdCcpfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICB7bW9kZWxPcHRpb25zLm1hcCgob3B0aW9uKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0gdmFsdWU9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7b3B0aW9uLnByb3ZpZGVyfSAvIHtvcHRpb24ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0aWVyLmRlc2N9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnOHB4JywgcGFkZGluZzogJzhweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJyB9fT5cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwIH19Plx1RDgzRVx1REQxNiB7dCgnZml4Lm1vZGVsVGl0bGUnKX08L3NwYW4+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIG1pbj17MX1cbiAgICAgICAgICAgICAgICBtYXg9ezEwfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgd2lkdGg6IDY0LCB0ZXh0QWxpZ246ICdjZW50ZXInIH19XG4gICAgICAgICAgICAgICAgdmFsdWU9e2ZpeENvbmN1cnJlbmN5fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRGaXhDb25jdXJyZW5jeShlLnRhcmdldC52YWx1ZSkgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ2ZpeC5tb2RlbEhpbnQnKX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e21vZGVsU2F2aW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc2F2ZU1vZGVsQ29uZmlnKCkgfX0+XG4gICAgICAgICAgICAgICAge21vZGVsU2F2aW5nID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ21vZGVsLnNhdmUnKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIHttb2RlbFNhdmVkICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM0ZWM5YjAnKX0+e3QoJ21vZGVsLnNhdmVkJyl9PC9zcGFuPn1cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ21vZGVsLmhpbnQnKX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxkaXYgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJywgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtdGVydGlhcnksICM5Y2EzYWYpJywgcGFkZGluZzogJzhweCAwJyB9fT5cbiAgICAgICAgZHNoLXByb2plY3QtY29udHJvbCB2e3N0YXRlPy5wbHVnaW5WZXJzaW9uID8/ICc/J31cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApXG5cbiAgY29uc3Qgb3ZlcnZpZXdUYWIgPSAoXG4gICAgPD5cbiAgICAgIDxDYXJkPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17Ym9vdHN0cmFwcGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkJvb3RzdHJhcCgpIH19PlxuICAgICAgICAgICAge2Jvb3RzdHJhcHBpbmcgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLnJlc2NhbicpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtidXN5ICE9PSBudWxsfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdhbmFseXplJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2FuYWx5emUnLCB7fSkgfX0+XG4gICAgICAgICAgICB7YnVzeSA9PT0gJ2FuYWx5emUnID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi5hbmFseXplJyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGx9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3ZlcmlmeScsICcvcHJvamVjdC1jb250cm9sL2FwaS92ZXJpZnknLCB7fSkgfX0+XG4gICAgICAgICAgICB7YnVzeSA9PT0gJ3ZlcmlmeScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLnZlcmlmeScpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FyZD5cbiAgICAgIHtyZXN1bHRQYW5lbH1cbiAgICAgIHtwcm9qZWN0ID09PSBudWxsID8gKFxuICAgICAgICA8Q2FyZD5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCwgZm9udFNpemU6ICcxM3B4JywgbWFyZ2luQm90dG9tOiAnNnB4JyB9fT57dCgnc3RhdGUubm9Qcm9qZWN0Jyl9PC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc3RhdGUubm9Qcm9qZWN0SGludCcpfTwvZGl2PlxuICAgICAgICA8L0NhcmQ+XG4gICAgICApIDogKFxuICAgICAgICA8Q2FyZCB0aXRsZT17YCR7dCgnc3RhdGUucHJvamVjdCcpfVx1RkYxQSR7cHJvamVjdC5uYW1lfWB9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+Um9vdDwvc3Bhbj57cHJvamVjdC5yb290UGF0aH08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2Jvb3RzdHJhcCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUudGVjaFN0YWNrJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAge2Jvb3RzdHJhcC50ZWNoU3RhY2subWFwKCh0ZWNoKSA9PiA8c3BhbiBrZXk9e3RlY2h9IHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM0ZWM5YjAnKX0+e3RlY2h9PC9zcGFuPil9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLnN5bWJvbHMnKX08L3NwYW4+e1N0cmluZyhib290c3RyYXAuc3ltYm9sc0NvdW50KX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLm1hbmlmZXN0cycpfTwvc3Bhbj57U3RyaW5nKGJvb3RzdHJhcC5tYW5pZmVzdEZpbGVzLmxlbmd0aCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS5ldmlkZW5jZScpfTwvc3Bhbj57U3RyaW5nKHN0YXRlPy5ldmlkZW5jZUNvdW50ID8/IDApfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpblRvcDogJzhweCcgfX0+e2Jvb3RzdHJhcC5zdW1tYXJ5fTwvZGl2PlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdjb25maXJtZWQudGl0bGUnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICA8dGV4dGFyZWEgcm93cz17Mn0gc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcGxhY2Vob2xkZXI9e3QoJ2NvbmZpcm1lZC50ZXh0Jyl9IHZhbHVlPXtjb25maXJtZWRUZXh0fSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q29uZmlybWVkVGV4dChlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2NvbmZpcm1lZC5wYXRocycpfSB2YWx1ZT17Y29uZmlybWVkUGF0aHN9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDb25maXJtZWRQYXRocyhlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLmJ1dHRvbn1cbiAgICAgICAgICAgIGRpc2FibGVkPXtidXN5ICE9PSBudWxsIHx8IGNvbmZpcm1lZFRleHQgPT09ICcnfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignYWRkQ29uZmlybWVkJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbmZpcm1lZCcsIHsgdHlwZTogJ2NvbnN0cmFpbnQnLCB0ZXh0OiBjb25maXJtZWRUZXh0LCBmb3JiaWRkZW5QYXRoczogY29uZmlybWVkUGF0aHMuc3BsaXQoJywnKS5tYXAoKHBhdGgpID0+IHBhdGgudHJpbSgpKS5maWx0ZXIoKHBhdGgpID0+IHBhdGggIT09ICcnKSB9KS50aGVuKCgpID0+IHsgc2V0Q29uZmlybWVkVGV4dCgnJyk7IHNldENvbmZpcm1lZFBhdGhzKCcnKSB9KSB9fVxuICAgICAgICAgID57YnVzeSA9PT0gJ2FkZENvbmZpcm1lZCcgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnY29uZmlybWVkLmFkZCcpfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2NvbmZpcm1lZC5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnY29uZmlybWVkLm5vbmUnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtjb25maXJtZWQubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17aXRlbS5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnI2M1ODZjMCcpfT57aXRlbS50eXBlfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntpdGVtLnRleHR9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXRlbS5mb3JiaWRkZW5QYXRocy5qb2luKCcsICcpIHx8ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdyZW1vdmVDb25maXJtZWQnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY29uZmlybWVkL3JlbW92ZScsIHsgaWQ6IGl0ZW0uaWQgfSkgfX1cbiAgICAgICAgICAgICAgICAgICAgPlx1MjcxNTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdhY3Rpb24uY3JlYXRlQ2hhbmdlJyl9PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLmNoYW5nZVRpdGxlJyl9IHZhbHVlPXtjaGFuZ2VUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENoYW5nZVRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPXsyfSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSBwbGFjZWhvbGRlcj17dCgnZm9ybS5jaGFuZ2VEZXNjJyl9IHZhbHVlPXtjaGFuZ2VEZXNjfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q2hhbmdlRGVzYyhlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLmJ1dHRvbn1cbiAgICAgICAgICAgIGRpc2FibGVkPXtidXN5ICE9PSBudWxsIHx8IGNoYW5nZVRpdGxlID09PSAnJ31cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2NyZWF0ZUNoYW5nZScsICcvcHJvamVjdC1jb250cm9sL2FwaS9jaGFuZ2VzJywgeyB0aXRsZTogY2hhbmdlVGl0bGUsIGRlc2NyaXB0aW9uOiBjaGFuZ2VEZXNjIH0pLnRoZW4oKCkgPT4geyBzZXRDaGFuZ2VUaXRsZSgnJyk7IHNldENoYW5nZURlc2MoJycpIH0pIH19XG4gICAgICAgICAgPntidXN5ID09PSAnY3JlYXRlQ2hhbmdlJyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24uY3JlYXRlQ2hhbmdlJyl9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7Y2hhbmdlcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc3RhdGUubm9DaGFuZ2VzJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+e1snY2hhbmdlcy5jb2wudGl0bGUnLCAnY2hhbmdlcy5jb2wudHlwZScsICdjaGFuZ2VzLmNvbC5zdGF0dXMnLCAnY2hhbmdlcy5jb2wudXBkYXRlZCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7Y2hhbmdlcy5tYXAoKGNoYW5nZSkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e2NoYW5nZS5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2NoYW5nZS50aXRsZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoY2hhbmdlLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgPyAnIzRlYzliMCcgOiAnIzU2OWNkNicpfT57Y2hhbmdlLnN0YXR1c308L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Zm9ybWF0VGltZShjaGFuZ2UudXBkYXRlZEF0KX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogJ1x1NTIyMFx1OTY2NFx1OEZEOVx1NEUyQVx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1RkYxRicsIG1lc3NhZ2U6ICdcdTMwMEMnICsgY2hhbmdlLnRpdGxlICsgJ1x1MzAwRFx1NTNDQVx1NTE3Nlx1NTE2OFx1OTBFOFx1NjI2N1x1ODg0Q1x1OEJCMFx1NUY1NVx1MzAwMVx1OEJBMVx1NTIxMlx1MzAwMVx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1NUMwNlx1ODhBQlx1NkMzOFx1NEU0NVx1NTIyMFx1OTY2NFx1MzAwMicsIGRhbmdlcjogdHJ1ZSwgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdkZWxldGVDaGFuZ2UnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY2hhbmdlcy9kZWxldGUnLCB7IGlkOiBjaGFuZ2UuaWQgfSkgfSB9KSB9fT5cdTI3MTU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgPC8+XG4gIClcblxuICAvLyBcdTI1MDBcdTI1MDAgXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHU5ODc1XHU3QjdFXHVGRjFBXHU5ODc1XHU5NzYyXHU3NkY0XHU2M0E1XHU1MjFCXHU1RUZBXHU1RTc2XHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHVGRjBDXHU4MDRBXHU1OTI5XHU1M0VBXHU2NjJGXHU1M0U2XHU0RTAwXHU3OUNEXHU1MTY1XHU1M0UzIFx1MjUwMFx1MjUwMFxuICBjb25zdCBleGVjdXRpb25UYWIgPSAoXG4gICAgPD5cbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnMTBweCcsIHBhZGRpbmc6ICc3cHggMTJweCcsIGJvcmRlclJhZGl1czogJzhweCcsIGJhY2tncm91bmQ6ICdyZ2JhKDM3LDk5LDIzNSwwLjA2KScsIGJvcmRlcjogJzFweCBzb2xpZCByZ2JhKDM3LDk5LDIzNSwwLjIpJywgZm9udFNpemU6ICcxMXB4JyB9fT5cbiAgICAgICAgPGI+XHUyNDYwIHt0KCdleGVjLmZsb3dDcmVhdGUnKX08L2I+PHNwYW4+XHUyMTkyPC9zcGFuPlxuICAgICAgICA8Yj5cdTI0NjEge3QoJ2V4ZWMuZmxvd09yY2hlc3RyYXRlJyl9PC9iPjxzcGFuPlx1MjE5Mjwvc3Bhbj5cbiAgICAgICAgPGI+XHUyNDYyIHt0KCdleGVjLmZsb3dSdW4nKX08L2I+PHNwYW4+XHUyMTkyPC9zcGFuPlxuICAgICAgICA8Yj5cdTI0NjMge3QoJ2V4ZWMuZmxvd01lbW9yeScpfTwvYj5cbiAgICAgIDwvZGl2PlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2V4ZWMuY3JlYXRlJyl9PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybUlubGluZX0+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgZmxleDogMSwgbWluV2lkdGg6IDIwMCB9fSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtVGl0bGUnKX0gdmFsdWU9e2V4ZWNUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEV4ZWNUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycgfX0gdmFsdWU9e2V4ZWNNb2RlbH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEV4ZWNNb2RlbChlLnRhcmdldC52YWx1ZSkgfX0gdGl0bGU9e3QoJ3BsYW4ubW9kZWxEZWZhdWx0Jyl9PlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt0KCdleGVjLm1vZGVsRGVmYXVsdCcpfTwvb3B0aW9uPlxuICAgICAgICAgICAgeyhtb2RlbE9wdGlvbnMgPz8gW10pLm1hcCgob3B0aW9uKSA9PiA8b3B0aW9uIGtleT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfSB2YWx1ZT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfT57b3B0aW9uLnByb3ZpZGVyfS97b3B0aW9uLmlkfTwvb3B0aW9uPil9XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezN9IHBsYWNlaG9sZGVyPXt0KCdleGVjLmZvcm1EZXNjJyl9IHZhbHVlPXtleGVjRGVzY30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEV4ZWNEZXNjKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5hY3Rpb25Sb3d9PlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgZXhlY1RpdGxlLnRyaW0oKSA9PT0gJycgfHwgZXhlY0Rlc2MudHJpbSgpID09PSAnJ30gb25DbGljaz17KCkgPT4geyB2b2lkIHN0YXJ0UnVuKCkgfX0+XG4gICAgICAgICAgICAgIHtidXN5ID09PSAnc3RhcnRSdW4nID8gdCgnZXhlYy5wbGFubmluZycpIDogdCgnZXhlYy5zdGFydCcpfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnZXhlYy5jcmVhdGVIaW50Jyl9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FyZD5cbiAgICAgIHtyZXN1bHRQYW5lbH1cbiAgICAgIHtwbGFuQ29uZmlybSAhPT0gbnVsbCAmJiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdwbGFuLnRpdGxlJyl9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+e3QoJ3BsYW4uaGludCcpfTwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XG4gICAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHI+e1sncGxhbi5jb2wuc3RlcCcsICdwbGFuLmNvbC5yb2xlJywgJ3BsYW4uY29sLm1vZGVsJywgJ3BsYW4uY29sLnBvbGljeScsICdwbGFuLmNvbC5lbmFibGVkJ10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIHtwbGFuQ29uZmlybS5zdGVwcy5tYXAoKHN0ZXAsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8dHIga2V5PXtzdGVwLmlkfSBzdHlsZT17eyBvcGFjaXR5OiBzdGVwLmVuYWJsZWQgPyAxIDogMC40NSB9fT5cbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgbWluV2lkdGg6IDIyMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCB9fT57aW5kZXggKyAxfS4ge3N0ZXAudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57c3RlcC5kZXNjcmlwdGlvbi5zbGljZSgwLCAxMjApfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIHtzdGVwLnRhcmdldEZpbGVzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScgfX0+e3N0ZXAudGFyZ2V0RmlsZXMuam9pbignLCAnKS5zbGljZSgwLCAxMjApfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggNnB4JyB9fSB2YWx1ZT17c3RlcC5yb2xlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBsYW5Db25maXJtKHsgLi4ucGxhbkNvbmZpcm0sIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcy5tYXAoKGl0ZW0sIGkpID0+IGkgPT09IGluZGV4ID8geyAuLi5pdGVtLCByb2xlOiBlLnRhcmdldC52YWx1ZSB9IDogaXRlbSkgfSkgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7WydhbmFseXNpcycsICdwbGFubmluZycsICdjb2RpbmcnLCAnb3BzJywgJ3ZlcmlmaWNhdGlvbiddLm1hcCgocm9sZSkgPT4gPG9wdGlvbiBrZXk9e3JvbGV9IHZhbHVlPXtyb2xlfT57Uk9MRV9MQUJFTFNbcm9sZV0gPz8gcm9sZX08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDZweCcgfX0gdmFsdWU9e3N0ZXAubW9kZWxQcm92aWRlciArICcvJyArIHN0ZXAubW9kZWxJZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbcHJvdmlkZXIsIG1vZGVsXSA9IGUudGFyZ2V0LnZhbHVlLnNwbGl0KCcvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxhbkNvbmZpcm0oeyAuLi5wbGFuQ29uZmlybSwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzLm1hcCgoaXRlbSwgaSkgPT4gaSA9PT0gaW5kZXggPyB7IC4uLml0ZW0sIG1vZGVsUHJvdmlkZXI6IHByb3ZpZGVyID8/ICcnLCBtb2RlbElkOiBtb2RlbCA/PyAnJyB9IDogaXRlbSkgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIi9cIj57dCgncGxhbi5tb2RlbERlZmF1bHQnKX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHttb2RlbE9wdGlvbnMubWFwKChvcHRpb24pID0+IDxvcHRpb24ga2V5PXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9IHZhbHVlPXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9PntvcHRpb24ucHJvdmlkZXJ9L3tvcHRpb24uaWR9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJywgcGFkZGluZzogJzNweCA2cHgnIH19IHZhbHVlPXtzdGVwLmZhaWx1cmVQb2xpY3l9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0UGxhbkNvbmZpcm0oeyAuLi5wbGFuQ29uZmlybSwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzLm1hcCgoaXRlbSwgaSkgPT4gaSA9PT0gaW5kZXggPyB7IC4uLml0ZW0sIGZhaWx1cmVQb2xpY3k6IGUudGFyZ2V0LnZhbHVlIH0gOiBpdGVtKSB9KSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhQT0xJQ1lfTEFCRUxTKS5tYXAoKFt2YWx1ZSwgbGFiZWxdKSA9PiA8b3B0aW9uIGtleT17dmFsdWV9IHZhbHVlPXt2YWx1ZX0+e2xhYmVsfTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17c3RlcC5lbmFibGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBsYW5Db25maXJtKHsgLi4ucGxhbkNvbmZpcm0sIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcy5tYXAoKGl0ZW0sIGkpID0+IGkgPT09IGluZGV4ID8geyAuLi5pdGVtLCBlbmFibGVkOiBlLnRhcmdldC5jaGVja2VkIH0gOiBpdGVtKSB9KSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIG1hcmdpblRvcDogJzEwcHgnIH19PlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e3BsYW5CdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbGF1bmNoUGxhbih0cnVlKSB9fT57cGxhbkJ1c3kgPyAnXHUyMDI2JyA6IHQoJ3BsYW4ubGF1bmNoRWRpdGVkJyl9PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17cGxhbkJ1c3l9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsYXVuY2hQbGFuKGZhbHNlKSB9fT57dCgncGxhbi5sYXVuY2hEaXJlY3QnKX08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtwbGFuQnVzeX0gb25DbGljaz17KCkgPT4geyBzZXRQbGFuQ29uZmlybShudWxsKSB9fT57dCgncGxhbi5kaXNjYXJkJyl9PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG4gICAgICA8Q2FyZD5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ2V4ZWMuYXR0ZW1wdHMnKX08L3NwYW4+e1N0cmluZyhzdGF0ZT8uYXR0ZW1wdHNDb3VudCA/PyAwKX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7cnVucy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc3RhdGUubm9SdW5zJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57WydleGVjLmNvbC5jaGFuZ2UnLCAnZXhlYy5jb2wuc3RlcHMnLCAnZXhlYy5jb2wuc3RhdHVzJywgJ2V4ZWMuY29sLnN0YXJ0ZWQnLCAnZXhlYy5jb2wuY29zdCcsICdleGVjLmNvbC5kZXRhaWwnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3J1bnMubWFwKChydW4pID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtydW4uaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PnsoY2hhbmdlcy5maW5kKChjaGFuZ2UpID0+IGNoYW5nZS5pZCA9PT0gcnVuLmNoYW5nZUlkKT8udGl0bGUpID8/IHJ1bi5jaGFuZ2VJZH08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntydW4uc3RlcHNUb3RhbCA/IChydW4uc3RlcHNEb25lID8/IDApICsgJy8nICsgcnVuLnN0ZXBzVG90YWwgOiAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHJ1bi5zdGF0dXMgPT09ICdzdWNjZWVkZWQnIHx8IHJ1bi5zdGF0dXMgPT09ICdjb21wbGV0ZWQnID8gJyM0ZWM5YjAnIDogcnVuLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgPyAnI2YxNGM0YycgOiBydW4uc3RhdHVzID09PSAncGF1c2VkJyA/ICcjZDk3NzA2JyA6ICcjZGNkY2FhJyl9PntSVU5fU1RBVFVTX0xBQkVMU1tydW4uc3RhdHVzXSA/PyBydW4uc3RhdHVzfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge3J1bi5jdXJyZW50U3RlcCAhPT0gbnVsbCAmJiBydW4uY3VycmVudFN0ZXAgIT09IHVuZGVmaW5lZCAmJiBydW4uc3RhdHVzID09PSAncnVubmluZycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1heFdpZHRoOiAxNjAsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT57cnVuLmN1cnJlbnRTdGVwfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Zm9ybWF0VGltZShydW4uc3RhcnRlZEF0KX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntydW4uY29zdFVzZCAhPT0gdW5kZWZpbmVkID8gJyQnICsgcnVuLmNvc3RVc2QudG9GaXhlZCg0KSA6ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkUnVuRGV0YWlsKHJ1bi5pZCkgfX0+e3J1bkRldGFpbD8ucnVuLmlkID09PSBydW4uaWQgPyB0KCdwbGFuLnJlZnJlc2hEZXRhaWwnKSA6IHQoJ3BsYW4udmlld0RldGFpbCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIHtydW5EZXRhaWwgIT09IG51bGwgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17dCgncGxhbi5kZXRhaWxUaXRsZScpICsgJyBcdTAwQjcgJyArIHJ1bkRldGFpbC5ydW4uY2hhbmdlVGl0bGV9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UocnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdzdWNjZWVkZWQnIHx8IHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnY29tcGxldGVkJyA/ICcjNGVjOWIwJyA6IHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnZmFpbGVkJyA/ICcjZjE0YzRjJyA6IHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAncGF1c2VkJyA/ICcjZDk3NzA2JyA6ICcjZGNkY2FhJyl9PntSVU5fU1RBVFVTX0xBQkVMU1tydW5EZXRhaWwucnVuLnN0YXR1c10gPz8gcnVuRGV0YWlsLnJ1bi5zdGF0dXN9PC9zcGFuPlxuICAgICAgICAgICAge3J1bkRldGFpbC5ydW4uZXJyb3IgIT09IG51bGwgJiYgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDEyNDJmJykgfX0+e3J1bkRldGFpbC5ydW4uZXJyb3IubWVzc2FnZX08L3NwYW4+fVxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSdW5EZXRhaWwocnVuRGV0YWlsLnJ1bi5pZCkgfX0+e3QoJ3BsYW4ucmVmcmVzaERldGFpbCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRSdW5EZXRhaWwobnVsbCkgfX0+e3QoJ3BsYW4uY2xvc2VEZXRhaWwnKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7cnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdwYXVzZWQnICYmIHJ1bkRldGFpbC5ydW4ucGF1c2VQb2ludCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc4cHggMTJweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGJhY2tncm91bmQ6ICdyZ2JhKDIxNywxMTksNiwwLjA4KScsIGJvcmRlcjogJzFweCBzb2xpZCByZ2JhKDIxNywxMTksNiwwLjM1KScsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEycHgnIH19Plx1MjNGOCB7dCgncGxhbi5wYXVzZWRCYW5uZXInKX08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57cnVuRGV0YWlsLnJ1bi5wYXVzZVBvaW50LnJlYXNvbn08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIG1hcmdpblRvcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCByZXN1bWVSdW4ocnVuRGV0YWlsLnJ1bi5pZCwgJ2NvbnRpbnVlJykgfX0+e3QoJ3BsYW4ucmVzdW1lUmV0cnknKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHJlc3VtZVJ1bihydW5EZXRhaWwucnVuLmlkLCAnc2tpcC1jdXJyZW50JykgfX0+e3QoJ3BsYW4ucmVzdW1lU2tpcCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgeyhydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgfHwgcnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdpbnRlcnJ1cHRlZCcpICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCByZXN1bWVSdW4ocnVuRGV0YWlsLnJ1bi5pZCwgJ2NvbnRpbnVlJykgfX0+e3QoJ3BsYW4ucmVzdW1lRmFpbGVkJyl9PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+e1sncGxhbi5jb2wuc3RlcCcsICdwbGFuLmNvbC5yb2xlJywgJ3BsYW4uY29sLm1vZGVsJywgJ2V4ZWMuY29sLnN0YXR1cycsICdwbGFuLmNvbC5hdHRlbXB0cycsICdleGVjLmNvbC5jb3N0J10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtydW5EZXRhaWwuc3RlcHMubWFwKChzdGVwLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3N0ZXAuaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PntpbmRleCArIDF9LiB7c3RlcC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge3N0ZXAuY2xhaW1lZE91dGNvbWUgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1heFdpZHRoOiAzMjAsIHdoaXRlU3BhY2U6ICdub3JtYWwnIH19PntzdGVwLmNsYWltZWRPdXRjb21lLnNsaWNlKDAsIDE2MCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJ3JnYmEoODYsMTU2LDIxNCwwLjI1KScpfT57Uk9MRV9MQUJFTFNbc3RlcC5yb2xlXSA/PyBzdGVwLnJvbGV9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBmb250U2l6ZTogJzExcHgnIH19PntzdGVwLm1vZGVsID8/ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShzdGVwLnZlcmlmaWVkID8gJyM0ZWM5YjAnIDogc3RlcC5zdGF0dXMgPT09ICdmYWlsZWQnID8gJyNmMTRjNGMnIDogc3RlcC5zdGF0dXMgPT09ICdza2lwcGVkJyA/ICcjOGI5NDllJyA6ICcjZGNkY2FhJyl9PntTVEVQX1NUQVRVU19MQUJFTFNbc3RlcC5zdGF0dXNdID8/IHN0ZXAuc3RhdHVzfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntTdHJpbmcoc3RlcC5hdHRlbXB0c0NvdW50KX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntzdGVwLmNvc3RVc2QgPiAwID8gJyQnICsgc3RlcC5jb3N0VXNkLnRvRml4ZWQoNCkgOiAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnLCBib3JkZXI6ICcxcHggZGFzaGVkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzhweCAxMnB4JyB9fT5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzRweCcgfX0+e3QoJ3BsYW4uY29udGV4dFRpdGxlJyl9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LnByb2plY3REaWdlc3R9XG4gICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmJyYW5jaCAhPT0gbnVsbCA/IGAgXHUwMEI3ICR7dCgncGxhbi5icmFuY2gnKX0gJHtydW5EZXRhaWwuY29udGV4dC5icmFuY2h9YCA6ICcnfVxuICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5oZWFkU2hhICE9PSBudWxsID8gYCBcdTAwQjcgSEVBRCAke3J1bkRldGFpbC5jb250ZXh0LmhlYWRTaGEuc2xpY2UoMCwgOCl9YCA6ICcnfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmluamVjdGVkTWVtb3JpZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwIH19Pnt0KCdwbGFuLmluamVjdGVkTWVtb3JpZXMnKX1cdUZGMUE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuaW5qZWN0ZWRNZW1vcmllcy5tYXAoKG1lbW9yeSkgPT4gPHNwYW4ga2V5PXttZW1vcnkuaWR9IHN0eWxlPXtzdHlsZXMuYmFkZ2UoJ3JnYmEoNzgsMjAxLDE3NiwwLjIpJyl9PnttZW1vcnkudGl0bGV9PC9zcGFuPil9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5kZWNpc2lvbkxvZy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzRweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBjb2xvcjogJ2luaGVyaXQnIH19Pnt0KCdwbGFuLmRlY2lzaW9uTG9nJyl9XHVGRjFBPC9zcGFuPlxuICAgICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmRlY2lzaW9uTG9nLnNsaWNlKC02KS5tYXAoKGVudHJ5LCBlbnRyeUluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeUluZGV4fT5cdTAwQjcgW3tlbnRyeS5raW5kfV0ge2VudHJ5LmRldGFpbH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cbiAgICAgIDxDYXJkXG4gICAgICAgIHRpdGxlPXtcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgdXNlclNlbGVjdDogJ25vbmUnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0U2NoZWRPcGVuKCFzY2hlZE9wZW4pIH19PlxuICAgICAgICAgICAge3NjaGVkT3BlbiA/ICdcdTI1QkUgJyA6ICdcdTI1QjggJ317dCgnc2NoZWQudGl0bGUnKX1cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5sYWJlbCwgbWFyZ2luTGVmdDogJzhweCcgfX0+eyhzY2hlZHVsZWREYXRhID8/IFtdKS5sZW5ndGggPiAwID8gU3RyaW5nKChzY2hlZHVsZWREYXRhID8/IFtdKS5sZW5ndGgpICsgJyBcdTRFMkEnIDogJyd9PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgfVxuICAgICAgPlxuICAgICAgICB7c2NoZWRPcGVuICYmIChcbiAgICAgICAgPD5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1JbmxpbmV9PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIGZsZXg6IDEsIG1pbldpZHRoOiAxNjAgfX0gcGxhY2Vob2xkZXI9e3QoJ3NjaGVkLmZvcm1OYW1lJyl9IHZhbHVlPXtzY2hlZE5hbWV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZE5hbWUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nIH19IHZhbHVlPXtzY2hlZFR5cGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZFR5cGUoZS50YXJnZXQudmFsdWUpIH19PlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJldmlld1wiPnt0KCdzY2hlZC50eXBlUmV2aWV3Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic3VtbWFyeVwiPnt0KCdzY2hlZC50eXBlU3VtbWFyeScpfTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJ1blwiPnt0KCdzY2hlZC50eXBlUnVuJyl9PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic3luY1wiPnt0KCdzY2hlZC50eXBlU3luYycpfTwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIHdpZHRoOiAxMjAgfX0gcGxhY2Vob2xkZXI9e3QoJ3NjaGVkLmZvcm1JbnRlcnZhbCcpfSB2YWx1ZT17c2NoZWRJbnRlcnZhbH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkSW50ZXJ2YWwoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAge3NjaGVkVHlwZSA9PT0gJ3J1bicgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdleGVjLmZvcm1UaXRsZScpfSB2YWx1ZT17c2NoZWRUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSByb3dzPXsyfSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtRGVzYycpfSB2YWx1ZT17c2NoZWREZXNjfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWREZXNjKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17c2NoZWROYW1lLnRyaW0oKSA9PT0gJyd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhZGRTY2hlZHVsZWQoKSB9fT57dCgnc2NoZWQuYWRkJyl9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Cb3R0b206ICc4cHgnIH19Pnt0KCdzY2hlZC5oaW50Jyl9PC9kaXY+XG4gICAgICAgIHsoc2NoZWR1bGVkRGF0YSA/PyBbXSkubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3NjaGVkLmVtcHR5Jyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57WydzY2hlZC5jb2wubmFtZScsICdzY2hlZC5jb2wudHlwZScsICdzY2hlZC5jb2wuaW50ZXJ2YWwnLCAnc2NoZWQuY29sLm5leHQnLCAnc2NoZWQuY29sLmxhc3RSZXN1bHQnLCAnc2NoZWQuY29sLmFjdGlvbnMnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgeyhzY2hlZHVsZWREYXRhID8/IFtdKS5tYXAoKHRhc2spID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXt0YXNrLmlkfSBzdHlsZT17eyBvcGFjaXR5OiB0YXNrLmVuYWJsZWQgPyAxIDogMC40NSB9fT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57dGFzay5uYW1lfXt0YXNrLnRpdGxlICE9PSAnJyA/IDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Plx1RkYwOHt0YXNrLnRpdGxlfVx1RkYwOTwvc3Bhbj4gOiBudWxsfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSh0YXNrLnR5cGUgPT09ICdyZXZpZXcnID8gJyM1NjljZDYnIDogdGFzay50eXBlID09PSAnc3VtbWFyeScgPyAnIzRlYzliMCcgOiAnI2Q3YmE3ZCcpfT57dGFzay50eXBlID09PSAncmV2aWV3JyA/IHQoJ3NjaGVkLnR5cGVSZXZpZXcnKSA6IHRhc2sudHlwZSA9PT0gJ3N1bW1hcnknID8gdCgnc2NoZWQudHlwZVN1bW1hcnknKSA6IHQoJ3NjaGVkLnR5cGVSdW4nKX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57dGFzay5pbnRlcnZhbE1pbnV0ZXMgPj0gMTQ0MCA/IE1hdGgucm91bmQodGFzay5pbnRlcnZhbE1pbnV0ZXMgLyAxNDQwICogMTApIC8gMTAgKyB0KCdzY2hlZC5kYXknKSA6IHRhc2suaW50ZXJ2YWxNaW51dGVzID49IDYwID8gTWF0aC5yb3VuZCh0YXNrLmludGVydmFsTWludXRlcyAvIDYwICogMTApIC8gMTAgKyB0KCdzY2hlZC5ob3VyJykgOiB0YXNrLmludGVydmFsTWludXRlcyArIHQoJ3NjaGVkLm1pbnV0ZScpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3Rhc2suZW5hYmxlZCA/IGZvcm1hdFRpbWUodGFzay5uZXh0RHVlQXQpIDogJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXhXaWR0aDogMjIwLCB3aGl0ZVNwYWNlOiAnbm9ybWFsJyB9fT57dGFzay5sYXN0UmVzdWx0IHx8ICh0YXNrLmxhc3RSdW5BdCAhPT0gbnVsbCA/IGZvcm1hdFRpbWUodGFzay5sYXN0UnVuQXQpIDogJ1x1MjAxNCcpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzY2hlZHVsZWRBY3Rpb24oJ3VwZGF0ZScsIHsgaWQ6IHRhc2suaWQsIGVuYWJsZWQ6ICF0YXNrLmVuYWJsZWQgfSkgfX0+e3Rhc2suZW5hYmxlZCA/IHQoJ3NjaGVkLmRpc2FibGUnKSA6IHQoJ3NjaGVkLmVuYWJsZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzY2hlZHVsZWRBY3Rpb24oJ3J1bicsIHsgaWQ6IHRhc2suaWQgfSkgfX0+e3QoJ3NjaGVkLnJ1bk5vdycpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyh7IHRpdGxlOiAnXHU1MjIwXHU5NjY0XHU4RkQ5XHU0RTJBXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHVGRjFGJywgbWVzc2FnZTogJ1x1MzAwQycgKyB0YXNrLm5hbWUgKyAnXHUzMDBEXHU1QzA2XHU4OEFCXHU2QzM4XHU0RTQ1XHU1MjIwXHU5NjY0XHUzMDAyJywgZGFuZ2VyOiB0cnVlLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBzY2hlZHVsZWRBY3Rpb24oJ2RlbGV0ZScsIHsgaWQ6IHRhc2suaWQgfSkgfSB9KSB9fT5cdTI3MTU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICA8Lz5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICA8Lz5cbiAgKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzZcdTk4NzVcdTdCN0UgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IG5vdGVzVGFiID0gKFxuICAgIDw+XG4gICAgICB7LyogXHUyNTAwXHUyNTAwIFx1N0IxNFx1OEJCMFx1RkYxQVx1NTM2MVx1NzI0N1x1NUYwRlx1OTYwNVx1OEJGQiArIFx1NTkxQVx1ODg0Q1x1N0YxNlx1OEY5MSArIFx1NjQxQ1x1N0QyMiArIEFJIFx1NjAzQlx1N0VEMyBcdTI1MDBcdTI1MDAgKi99XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnbm90ZXMudGl0bGUnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIHdpZHRoOiAyMjAgfX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0KCdub3Rlcy5zZWFyY2gnKX1cbiAgICAgICAgICAgIHZhbHVlPXtub3RlU2VhcmNofVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVTZWFyY2goZS50YXJnZXQudmFsdWUpIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsYXN0U3VtbWFyeSA9IG5vdGVzLmZpbHRlcigobm90ZSkgPT4gbm90ZS5zaGEgPT09ICdzdW1tYXJ5Jykuc29ydCgoYSwgYikgPT4gYi5jcmVhdGVkQXQgLSBhLmNyZWF0ZWRBdClbMF1cbiAgICAgICAgICAgIGNvbnN0IG5ld0NvbW1pdHMgPSBsYXN0U3VtbWFyeSA9PT0gdW5kZWZpbmVkID8gLTFcbiAgICAgICAgICAgICAgOiAoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLmZpbHRlcigoY29tbWl0KSA9PiBjb21taXQuZGF0ZSA+IGxhc3RTdW1tYXJ5LmNyZWF0ZWRBdCkubGVuZ3RoXG4gICAgICAgICAgICBpZiAobmV3Q29tbWl0cyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdub3Rlcy5kaWdlc3ROZXZlcicpfTwvc3Bhbj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXdDb21taXRzID09PSAwKSByZXR1cm4gbnVsbFxuICAgICAgICAgICAgcmV0dXJuIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT57dCgnbm90ZXMuZGlnZXN0UGVuZGluZycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhuZXdDb21taXRzKSl9PC9zcGFuPlxuICAgICAgICAgIH0pKCl9XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e2FpU3VtbWFyaXppbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhaVN1bW1hcml6ZSgpIH19PlxuICAgICAgICAgICAge2FpU3VtbWFyaXppbmcgPyB0KCdub3Rlcy5haVN1bW1hcnlSdW4nKSA6ICdcdTI3MjggJyArIHQoJ25vdGVzLmFpU3VtbWFyeScpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuZm9ybVJvdywgYm9yZGVyOiAnMXB4IGRhc2hlZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsIGJvcmRlclJhZGl1czogJzhweCcsIHBhZGRpbmc6ICcxMHB4JyB9fT5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ25vdGVzLmZvcm1UaXRsZScpfSB2YWx1ZT17bm90ZVRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQgfX0gcGxhY2Vob2xkZXI9e3QoJ25vdGVzLnRhZ3NIaW50Jyl9IHZhbHVlPXtub3RlVGFnc30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVUYWdzKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX1cbiAgICAgICAgICAgIHJvd3M9ezZ9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17dCgnbm90ZXMuY29udGVudEhpbnQnKX1cbiAgICAgICAgICAgIHZhbHVlPXtub3RlQ29udGVudH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXROb3RlQ29udGVudChlLnRhcmdldC52YWx1ZSkgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICB7dCgnbm90ZXMuYm91bmRUbycpfToge3NlbGVjdGVkVGFyZ2V0c1swXSA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiBzZWxlY3RlZFRhcmdldHNbMF0uc2xpY2UoMCwgOCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17bm90ZVRpdGxlLnRyaW0oKSA9PT0gJycgfHwgbm90ZUNvbnRlbnQudHJpbSgpID09PSAnJ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFkZE5vdGUoKSB9fT57dCgnbm90ZXMuYWRkJyl9PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBrZXl3b3JkID0gbm90ZVNlYXJjaC50cmltKCkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgIGNvbnN0IG1hdGNoZWQgPSBrZXl3b3JkID09PSAnJ1xuICAgICAgICAgICAgPyBub3Rlc1xuICAgICAgICAgICAgOiBub3Rlcy5maWx0ZXIoKG5vdGUpID0+IChub3RlLnRpdGxlICsgJyAnICsgbm90ZS5jb250ZW50ICsgJyAnICsgKG5vdGUudGFncyA/PyBbXSkuam9pbignICcpKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGtleXdvcmQpKVxuICAgICAgICAgIC8vIFx1N0Y2RVx1OTg3Nlx1NEYxOFx1NTE0OFx1RkYwQ1x1NTE3Nlx1NEY1OVx1NjMwOVx1NTIxQlx1NUVGQVx1NjVGNlx1OTVGNFx1NTAxMlx1NUU4Rlx1MzAwMlxuICAgICAgICAgIGNvbnN0IHZpc2libGUgPSBbLi4ubWF0Y2hlZF0uc29ydCgobGVmdCwgcmlnaHQpID0+XG4gICAgICAgICAgICBOdW1iZXIocmlnaHQucGlubmVkID09PSB0cnVlKSAtIE51bWJlcihsZWZ0LnBpbm5lZCA9PT0gdHJ1ZSkgfHwgcmlnaHQuY3JlYXRlZEF0IC0gbGVmdC5jcmVhdGVkQXQpXG4gICAgICAgICAgaWYgKHZpc2libGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57bm90ZXMubGVuZ3RoID09PSAwID8gdCgnbm90ZXMuZW1wdHknKSA6IHQoJ25vdGVzLmVtcHR5U2VhcmNoJyl9PC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB2aXNpYmxlLm1hcCgobm90ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNTdW1tYXJ5ID0gbm90ZS5zaGEgPT09ICdzdW1tYXJ5J1xuICAgICAgICAgICAgY29uc3QgZWRpdGluZyA9IGVkaXRpbmdOb3RlICE9PSBudWxsICYmIGVkaXRpbmdOb3RlLmlkID09PSBub3RlLmlkID8gZWRpdGluZ05vdGUgOiBudWxsXG4gICAgICAgICAgICBjb25zdCBleHBhbmRlZCA9IG5vdGVFeHBhbmRlZFtub3RlLmlkXSA9PT0gdHJ1ZVxuICAgICAgICAgICAgY29uc3QgbG9uZyA9IG5vdGUuY29udGVudC5sZW5ndGggPiAyNjAgfHwgbm90ZS5jb250ZW50LnNwbGl0KCdcXG4nKS5sZW5ndGggPiA2XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtub3RlLmlkfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAuLi5zdHlsZXMubm90ZUNhcmQsXG4gICAgICAgICAgICAgICAgICAuLi4oaXNTdW1tYXJ5ID8geyBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wNCknLCBib3JkZXJDb2xvcjogJ3JnYmEoMzcsOTksMjM1LDAuMyknIH0gOiB7fSksXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtlZGl0aW5nICE9PSBudWxsID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gdmFsdWU9e2VkaXRpbmcudGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFZGl0aW5nTm90ZSh7IC4uLmVkaXRpbmcsIHRpdGxlOiBlLnRhcmdldC52YWx1ZSB9KSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ25vdGVzLnRhZ3NIaW50Jyl9IHZhbHVlPXtlZGl0aW5nLnRhZ3N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFZGl0aW5nTm90ZSh7IC4uLmVkaXRpbmcsIHRhZ3M6IGUudGFyZ2V0LnZhbHVlIH0pIH19IC8+XG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSByb3dzPXsxMH0gdmFsdWU9e2VkaXRpbmcuY29udGVudH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgLi4uZWRpdGluZywgY29udGVudDogZS50YXJnZXQudmFsdWUgfSkgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnNHB4IDEycHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzYXZlTm90ZUVkaXQoKSB9fT57dCgnbm90ZXMuc2F2ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzRweCAxMnB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldEVkaXRpbmdOb3RlKG51bGwpIH19Pnt0KCdub3Rlcy5jYW5jZWwnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVRleHR9Pntpc1N1bW1hcnkgPyAnXHVEODNEXHVEQ0Q2ICcgOiAnJ317bm90ZS5waW5uZWQgPT09IHRydWUgPyAnXHVEODNEXHVEQ0NDICcgOiAnJ317bm90ZS50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFNocmluazogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogbm90ZS5waW5uZWQgPT09IHRydWUgPyAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyA6IHVuZGVmaW5lZCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17bm90ZS5waW5uZWQgPT09IHRydWUgPyB0KCdub3Rlcy51bnBpbicpIDogdCgnbm90ZXMucGluJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCB0b2dnbGVOb3RlUGluKG5vdGUpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XHVEODNEXHVEQ0NDPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSB0aXRsZT17dCgnbm90ZXMuY29weU1kSGludCcpfSBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1kID0gYCMgJHtub3RlLnRpdGxlfVxcblxcbiR7bm90ZS5jb250ZW50fVxcbmBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCBuYXZpZ2F0b3IuY2xpcGJvYXJkPy53cml0ZVRleHQobWQpLnRoZW4oKCkgPT4gc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgJyArIHQoJ25vdGVzLmNvcHlNZERvbmUnKSkpLmNhdGNoKCgpID0+IHNldEFjdGlvblJlc3VsdCgnXHUyNzE3IFx1NTkwRFx1NTIzNlx1NTkzMVx1OEQyNScpKVxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHVEODNEXHVEQ0NCIHt0KCdub3Rlcy5jb3B5TWQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IHRpdGxlPXt0KCdub3Rlcy5leHBvcnRNZEhpbnQnKX0gb25DbGljaz17KCkgPT4geyBleHBvcnROb3RlKG5vdGUpIH19Plx1RDgzRFx1RENCRSB7dCgnbm90ZXMuZXhwb3J0TWQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IHRpdGxlPXt0KCdub3Rlcy50b01lbW9yeUhpbnQnKX0gb25DbGljaz17KCkgPT4geyBzZXRNZW1vcnlUaXRsZShub3RlLnRpdGxlKTsgc2V0TWVtb3J5Q29udGVudChub3RlLmNvbnRlbnQpOyBzZXRBY3Rpb25SZXN1bHQodCgnbm90ZXMudG9NZW1vcnlEb25lJykpIH19Plx1RDgzRVx1RERFMCB7dCgnbm90ZXMudG9NZW1vcnknKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0RWRpdGluZ05vdGUoeyBpZDogbm90ZS5pZCwgdGl0bGU6IG5vdGUudGl0bGUsIGNvbnRlbnQ6IG5vdGUuY29udGVudCwgdGFnczogKG5vdGUudGFncyA/PyBbXSkuam9pbignLCAnKSB9KSB9fT57dCgnbm90ZXMuZWRpdCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6ICdcdTUyMjBcdTk2NjRcdThGRDlcdTY3NjFcdTdCMTRcdThCQjBcdUZGMUYnLCBtZXNzYWdlOiAnXHUzMDBDJyArIG5vdGUudGl0bGUgKyAnXHUzMDBEXHU1QzA2XHU4OEFCXHU2QzM4XHU0RTQ1XHU1MjIwXHU5NjY0XHVGRjBDXHU0RTBEXHU1M0VGXHU2MDYyXHU1OTBEXHUzMDAyJywgZGFuZ2VyOiB0cnVlLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCByZW1vdmVOb3RlKG5vdGUuaWQpIH0gfSkgfX0+XHUyNzE1PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7aXNTdW1tYXJ5XG4gICAgICAgICAgICAgICAgICAgICAgPyA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ29udGVudCwgLi4uKGxvbmcgJiYgIWV4cGFuZGVkID8gc3R5bGVzLm5vdGVDbGFtcCA6IHt9KSB9fT57cmVuZGVyU3RydWN0dXJlZENvbnRlbnQobm90ZS5jb250ZW50KX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA6IDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCAuLi4obG9uZyAmJiAhZXhwYW5kZWQgPyBzdHlsZXMubm90ZUNsYW1wIDoge30pIH19Pntub3RlLmNvbnRlbnR9PC9kaXY+fVxuICAgICAgICAgICAgICAgICAgICB7bG9uZyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmxpbmtCdG59IG9uQ2xpY2s9eygpID0+IHsgc2V0Tm90ZUV4cGFuZGVkKHsgLi4ubm90ZUV4cGFuZGVkLCBbbm90ZS5pZF06ICFleHBhbmRlZCB9KSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtleHBhbmRlZCA/IHQoJ25vdGVzLmNvbGxhcHNlJykgOiB0KCdub3Rlcy5leHBhbmQnKX1cdUZGMDh7bm90ZS5jb250ZW50Lmxlbmd0aH0gXHU1QjU3XHVGRjA5XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHsobm90ZS50YWdzID8/IFtdKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luVG9wOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsobm90ZS50YWdzID8/IFtdKS5tYXAoKHRhZykgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0YWd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKCcjMjU2M2ViJyksIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXI6ICdub25lJywgcGFkZGluZzogJzFweCA4cHgnLCBib3JkZXJSYWRpdXM6ICc5OTlweCcsIGZvbnRTaXplOiAnMTBweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldE5vdGVTZWFyY2godGFnKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+I3t0YWd9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVNZXRhfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bmV3IERhdGUobm90ZS5jcmVhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHtub3RlLnVwZGF0ZWRBdCAhPT0gdW5kZWZpbmVkICYmIG5vdGUudXBkYXRlZEF0ID4gbm90ZS5jcmVhdGVkQXQgKyAxMDAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlx1RkYwOHt0KCdub3Rlcy5lZGl0ZWRBdCcpfSB7bmV3IERhdGUobm90ZS51cGRhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCl9XHVGRjA5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAge2lzU3VtbWFyeSAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9Pnt0KCdub3Rlcy5zdW1tYXJ5VGFnJyl9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICB7bm90ZS5zaGEgIT09IHVuZGVmaW5lZCAmJiBub3RlLnNoYSAhPT0gJ3N1bW1hcnknICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e25vdGUuc2hhID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IG5vdGUuc2hhLnNsaWNlKDAsIDgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pKCl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnbWVtb3J5LnpvbmVUaXRsZScpICsgKHByb2plY3QgIT09IG51bGwgPyAnIFx1MDBCNyAnICsgcHJvamVjdC5uYW1lIDogJycpfT5cbiAgICAgICAgey8qIFx1NTQwQ1x1NkI2NVx1NzJCNlx1NjAwMVx1Njc2MVx1RkYxQVx1NTdGQVx1N0VCRiArIFx1ODQzRFx1NTQwRVx1NjNEMFx1NEVBNFx1NjU3MCArIFx1NTQwQ1x1NkI2NVx1NjMwOVx1OTRBRSArIFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QSAqL31cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICc4cHgnLCBwYWRkaW5nOiAnNnB4IDEwcHgnLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEpKScsIGJvcmRlclJhZGl1czogJzhweCcgfX0+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JyB9fT5cdUQ4M0RcdUREMDQge3QoJ21lbW9yeS5zeW5jQmFzZWxpbmUnKX1cdUZGMUE8Yj57bWVtb3JpZXNEYXRhPy5iYXNlbGluZT8uc2hhICE9IG51bGwgPyBtZW1vcmllc0RhdGEuYmFzZWxpbmUuc2hhLnNsaWNlKDAsIDgpIDogdCgnbWVtb3J5LnN5bmNOb25lJyl9PC9iPjwvc3Bhbj5cbiAgICAgICAgICB7bWVtb3JpZXNEYXRhPy5icmFuY2ggIT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNTY5Y2Q2Jyl9PnttZW1vcmllc0RhdGEuYnJhbmNofTwvc3Bhbj59XG4gICAgICAgICAgeyhtZW1vcmllc0RhdGE/LmJlaGluZENvdW50ID8/IDApID4gMCAmJiAoXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSB9fT57dCgnbWVtb3J5LmJlaGluZCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhtZW1vcmllc0RhdGE/LmJlaGluZENvdW50ID8/IDApKX08L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IGRpc2FibGVkPXttZW1vcnlTeW5jaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc3luY01lbW9yaWVzKCkgfX0+XG4gICAgICAgICAgICB7bWVtb3J5U3luY2luZyA/IHQoJ21lbW9yeS5zeW5jaW5nJykgOiAnXHVEODNEXHVERDA0ICcgKyB0KCdtZW1vcnkuc3luYycpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3N5bmNSZXBvcnQgIT09IG51bGwgJiYgKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcsIHBhZGRpbmc6ICc4cHggMTJweCcsIGJvcmRlclJhZGl1czogJzhweCcsIGJhY2tncm91bmQ6IHN5bmNSZXBvcnQub2sgPT09IGZhbHNlID8gJ3JnYmEoMjA5LDM2LDQ3LDAuMDYpJyA6ICdyZ2JhKDc4LDIwMSwxNzYsMC4wNiknLCBib3JkZXI6ICcxcHggc29saWQgJyArIChzeW5jUmVwb3J0Lm9rID09PSBmYWxzZSA/ICdyZ2JhKDIwOSwzNiw0NywwLjMpJyA6ICdyZ2JhKDc4LDIwMSwxNzYsMC4zKScpIH19PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+e3N5bmNSZXBvcnQub2sgPT09IGZhbHNlID8gJ1x1MjcxNyAnICsgdCgnbWVtb3J5LnN5bmNGYWlsZWQnKSA6ICdcdTI3MTMgJyArIChzeW5jUmVwb3J0LnZlcmRpY3QgPz8gJycpfTwvZGl2PlxuICAgICAgICAgICAge3N5bmNSZXBvcnQub2sgIT09IGZhbHNlICYmIChzeW5jUmVwb3J0LnN0YWxlUHJvcG9zYWxzID8/IFtdKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwIH19Pnt0KCdtZW1vcnkuc3RhbGVUaXRsZScpfTwvZGl2PlxuICAgICAgICAgICAgICAgIHsoc3luY1JlcG9ydC5zdGFsZVByb3Bvc2FscyA/PyBbXSkubWFwKChwcm9wb3NhbCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e3Byb3Bvc2FsLmlkfSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19Pntwcm9wb3NhbC50aXRsZX0gXHUyMDE0XHUyMDE0IHtwcm9wb3NhbC5yZWFzb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcxcHggOHB4JywgZm9udFNpemU6ICcxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYXBwbHlTeW5jKFtwcm9wb3NhbC5pZF0sICdtYXJrLXN0YWxlJykgfX0+e3QoJ21lbW9yeS5tYXJrU3RhbGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMXB4IDhweCcsIGZvbnRTaXplOiAnMTBweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGFwcGx5U3luYyhbcHJvcG9zYWwuaWRdLCAnYXJjaGl2ZScpIH19Pnt0KCdtZW1vcnkuYXJjaGl2ZUJ0bicpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcxcHggOHB4JywgZm9udFNpemU6ICcxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFN5bmNSZXBvcnQoKHByZXZpb3VzKSA9PiBwcmV2aW91cyA9PT0gbnVsbCA/IG51bGwgOiB7IC4uLnByZXZpb3VzLCBzdGFsZVByb3Bvc2FsczogKHByZXZpb3VzLnN0YWxlUHJvcG9zYWxzID8/IFtdKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT09IHByb3Bvc2FsLmlkKSB9KSB9fT57dCgnbWVtb3J5LmtlZXBBY3RpdmUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7c3luY1JlcG9ydC5vayAhPT0gZmFsc2UgJiYgKHN5bmNSZXBvcnQubmV3Q2FuZGlkYXRlcyA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JywgZm9udFNpemU6ICcxMXB4JyB9fT5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+e3QoJ21lbW9yeS5uZXdDYW5kaWRhdGVzJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIHsoc3luY1JlcG9ydC5uZXdDYW5kaWRhdGVzID8/IFtdKS5tYXAoKGNhbmRpZGF0ZSwgaW5kZXgpID0+IDxkaXYga2V5PXtpbmRleH0+XHVGRjBCIFt7Y2FuZGlkYXRlLnR5cGV9XSB7Y2FuZGlkYXRlLnRpdGxlfTwvZGl2Pil9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmxpbmtCdG4sIG1hcmdpblRvcDogJzRweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRTeW5jUmVwb3J0KG51bGwpIH19Pnt0KCdtZW1vcnkuY2xvc2VSZXBvcnQnKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgey8qIFx1NjI0Qlx1NTJBOFx1NkRGQlx1NTJBMFx1RkYxQVx1NjgwN1x1OTg5OCAvIFx1N0M3Qlx1NTc4QiAvIFx1NEY1Q1x1NzUyOFx1NTdERiAvIFx1NTE4NVx1NUJCOSAqL31cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnZm9ybS5tZW1vcnlUaXRsZScpfSB2YWx1ZT17bWVtb3J5VGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRNZW1vcnlUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycgfX0gdmFsdWU9e21lbW9yeVR5cGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRNZW1vcnlUeXBlKGUudGFyZ2V0LnZhbHVlKSB9fT5cbiAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhNRU1PUllfVFlQRV9MQUJFTFMpLm1hcCgoW3ZhbHVlLCBsYWJlbF0pID0+IDxvcHRpb24ga2V5PXt2YWx1ZX0gdmFsdWU9e3ZhbHVlfT57bGFiZWx9PC9vcHRpb24+KX1cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycgfX0gdmFsdWU9e21lbW9yeVNjb3BlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0TWVtb3J5U2NvcGUoZS50YXJnZXQudmFsdWUgYXMgJ3Byb2plY3QnIHwgJ2JyYW5jaCcpIH19PlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInByb2plY3RcIj57dCgnbWVtb3J5LnNjb3BlUHJvamVjdCcpfTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJyYW5jaFwiPnt0KCdtZW1vcnkuc2NvcGVCcmFuY2gnKX08L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcm93cz17M30gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0ubWVtb3J5Q29udGVudCcpfSB2YWx1ZT17bWVtb3J5Q29udGVudH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeUNvbnRlbnQoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtidXN5ICE9PSBudWxsIHx8IG1lbW9yeVRpdGxlLnRyaW0oKSA9PT0gJycgfHwgbWVtb3J5Q29udGVudC50cmltKCkgPT09ICcnfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdyZWNvcmRNZW1vcnknLCAnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5JywgeyBtZW1vcnlUeXBlLCBzY29wZTogbWVtb3J5U2NvcGUsIHRpdGxlOiBtZW1vcnlUaXRsZS50cmltKCksIGNvbnRlbnQ6IG1lbW9yeUNvbnRlbnQudHJpbSgpIH0pLnRoZW4oYXN5bmMgKCkgPT4geyBzZXRNZW1vcnlUaXRsZSgnJyk7IHNldE1lbW9yeUNvbnRlbnQoJycpOyBhd2FpdCBsb2FkTWVtb3JpZXMoKSB9KSB9fT5cbiAgICAgICAgICAgICAge2J1c3kgPT09ICdyZWNvcmRNZW1vcnknID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ21lbW9yeS5yZWNvcmQnKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYWxsID0gbWVtb3JpZXNEYXRhPy5tZW1vcmllcyA/PyBbXVxuICAgICAgICAgIGNvbnN0IHBlbmRpbmcgPSBhbGwuZmlsdGVyKChtZW1vcnkpID0+ICFtZW1vcnkuaXNIdW1hbkNvbmZpcm1lZCAmJiBtZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJylcbiAgICAgICAgICBjb25zdCBhY3RpdmUgPSBhbGwuZmlsdGVyKChtZW1vcnkpID0+IG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnKVxuICAgICAgICAgIGNvbnN0IGdyb3VwZWQgPSBuZXcgTWFwPHN0cmluZywgTWVtb3J5RW50cnlbXT4oKVxuICAgICAgICAgIGZvciAoY29uc3QgbWVtb3J5IG9mIGFjdGl2ZSkge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IGdyb3VwZWQuZ2V0KG1lbW9yeS50eXBlKSA/PyBbXVxuICAgICAgICAgICAgbGlzdC5wdXNoKG1lbW9yeSlcbiAgICAgICAgICAgIGdyb3VwZWQuc2V0KG1lbW9yeS50eXBlLCBsaXN0KVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAge3BlbmRpbmcubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Plx1MjNGMyB7dCgnbWVtb3J5LnBlbmRpbmdRdWV1ZScpfVx1RkYwOHtTdHJpbmcocGVuZGluZy5sZW5ndGgpfVx1RkYwOTwvZGl2PlxuICAgICAgICAgICAgICAgICAge3BlbmRpbmcubWFwKChtZW1vcnkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e21lbW9yeS5pZH0gc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDYXJkLCBib3JkZXJDb2xvcjogJ3JnYmEoMzcsOTksMjM1LDAuMyknLCBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wMyknIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVRleHR9PnttZW1vcnkudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFNocmluazogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGNvbmZpcm1NZW1vcnkobWVtb3J5LmlkKS50aGVuKCgpID0+IHsgdm9pZCBsb2FkTWVtb3JpZXMoKSB9KSB9fT57dCgnbWVtb3J5LmNvbmZpcm0nKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeUFjdGlvbignc3RhdHVzJywgeyBpZDogbWVtb3J5LmlkLCBzdGF0dXM6ICdhcmNoaXZlZCcgfSkgfX0+e3QoJ21lbW9yeS5hcmNoaXZlQnRuJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZUNvbnRlbnR9PnttZW1vcnkuY29udGVudH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSgzNyw5OSwyMzUsMC4xNSknKX0+e01FTU9SWV9TT1VSQ0VfTEFCRUxTW21lbW9yeS5zb3VyY2VUYWddID8/IG1lbW9yeS5zb3VyY2VUYWd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5iYXNpc1NoYSAhPT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9PnttZW1vcnkuYmFzaXNTaGEuc2xpY2UoMCwgOCl9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge1suLi5ncm91cGVkLmVudHJpZXMoKV0ubWFwKChbdHlwZSwgaXRlbXNdKSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e3R5cGV9IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnNlY3Rpb25UaXRsZX0+e01FTU9SWV9UWVBFX0xBQkVMU1t0eXBlXSA/PyB0eXBlfVx1RkYwOHtTdHJpbmcoaXRlbXMubGVuZ3RoKX1cdUZGMDk8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHtpdGVtcy5tYXAoKG1lbW9yeSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17bWVtb3J5LmlkfSBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNhcmQsIG9wYWNpdHk6IG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnID8gMSA6IDAuNiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVUZXh0fT57bWVtb3J5LmlzSHVtYW5Db25maXJtZWQgPyAnXHUyNzA1ICcgOiAnJ317bWVtb3J5LnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAsIGZsZXhXcmFwOiAnd3JhcCcsIGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IW1lbW9yeS5pc0h1bWFuQ29uZmlybWVkICYmIG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgY29uZmlybU1lbW9yeShtZW1vcnkuaWQpLnRoZW4oKCkgPT4geyB2b2lkIGxvYWRNZW1vcmllcygpIH0pIH19Pnt0KCdtZW1vcnkuY29uZmlybScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeVRvTm90ZShtZW1vcnkpIH19Plx1RDgzRFx1RENDNCB7dCgnbWVtb3J5LnRvTm90ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnNjb3BlID09PSAnYnJhbmNoJyAmJiA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5QWN0aW9uKCdub3JtYWxpemUnLCB7IGlkOiBtZW1vcnkuaWQgfSkgfX0+XHUyMUYxIHt0KCdtZW1vcnkubm9ybWFsaXplJyl9PC9idXR0b24+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ3N0YXR1cycsIHsgaWQ6IG1lbW9yeS5pZCwgc3RhdHVzOiAnYXJjaGl2ZWQnIH0pIH19Pnt0KCdtZW1vcnkuYXJjaGl2ZUJ0bicpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeUFjdGlvbignc3RhdHVzJywgeyBpZDogbWVtb3J5LmlkLCBzdGF0dXM6ICdhY3RpdmUnIH0pIH19Pnt0KCdtZW1vcnkucmVzdG9yZScpfTwvYnV0dG9uPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCBtYXhIZWlnaHQ6IDg0LCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+e21lbW9yeS5jb250ZW50fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlTWV0YX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnN0YXR1cyA9PT0gJ3N0YWxlJyAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjZDk3NzA2Jyl9Pnt0KCdtZW1vcnkuc3RhdHVzU3RhbGUnKX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5zY29wZSA9PT0gJ2JyYW5jaCcgJiYgbWVtb3J5LmdpdEJyYW5jaCAhPT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNTY5Y2Q2Jyl9Plx1MjM4NyB7bWVtb3J5LmdpdEJyYW5jaH08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSgzNyw5OSwyMzUsMC4xNSknKX0+e01FTU9SWV9TT1VSQ0VfTEFCRUxTW21lbW9yeS5zb3VyY2VUYWddID8/IG1lbW9yeS5zb3VyY2VUYWd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5iYXNpc1NoYSAhPT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9PnttZW1vcnkuYmFzaXNTaGEuc2xpY2UoMCwgOCl9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntuZXcgRGF0ZShtZW1vcnkudXBkYXRlZEF0KS50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIHthbGwubGVuZ3RoID09PSAwICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ21lbW9yeS5lbXB0eScpfTwvZGl2Pn1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgIClcbiAgICAgICAgfSkoKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdjb25jZXB0cy50aXRsZScpfT5cbiAgICAgICAge2NvbmNlcHRzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdjb25jZXB0cy5ub25lJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+e1snY29uY2VwdHMuY29sLm5hbWUnLCAnY29uY2VwdHMuY29sLmNhdGVnb3J5JywgJ2NvbmNlcHRzLmNvbC5jb3VudCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7Y29uY2VwdHMubWFwKChjb25jZXB0KSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17Y29uY2VwdC5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2NvbmNlcHQubmFtZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntjb25jZXB0LmNhdGVnb3J5fTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e1N0cmluZyhjb25jZXB0Lm9jY3VycmVuY2VzKX08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgIDwvPlxuICApXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFJldmlldyBcdTk1RUVcdTk4OThcdTk4NzVcdTdCN0VcdUZGMUFcdTUxNjhcdTkxQ0ZcdTk1RUVcdTk4OThcdTc3MEJcdTY3N0ZcdUZGMDhcdTdFREZcdThCQTEgKyBcdTdCNUJcdTkwMDkgKyBcdTcyQjZcdTYwMDFcdTZENDFcdThGNkNcdUZGMDkrIFx1OUE4Q1x1NjUzNlx1OEJCMFx1NUY1NSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgcmV2aWV3VGFiID0gKFxuICAgIDw+XG4gICAgICB7cmVzdWx0UGFuZWx9XG4gICAgICA8Q2FyZCB0aXRsZT17dCgncmV2aWV3LnJlY29yZHNUaXRsZScpfT5cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYWxsID0gKGlzc3Vlc0RhdGEgPz8gW10pLm1hcCgoaXNzdWUpID0+ICh7IC4uLmlzc3VlLCBzZXZlcml0eTogbm9ybWFsaXplSXNzdWVTZXZlcml0eShpc3N1ZS5zZXZlcml0eSkgfSkpXG4gICAgICAgICAgY29uc3Qgb3BlbkNvdW50ID0gYWxsLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpLmxlbmd0aFxuICAgICAgICAgIC8vIFx1OEJBMVx1NjU3MCBjaGlwcyBcdThEREZcdTk2OEZcdTcyQjZcdTYwMDFcdTdCNUJcdTkwMDlcdUZGMDhcIlx1NTE2OFx1OTBFOFwiPSBcdTcyQjZcdTYwMDFcdTdCNUJcdTkwMDlcdTU0MEVcdTc2ODRcdTYwM0JcdTY1NzBcdUZGMDlcdUZGMUFcdTkwMDlcIlx1NURGMlx1ODlFM1x1NTFCM1wiXHU1NDBFXHU1NDA0XHU0RTI1XHU5MUNEXHU1RUE2XHU2NTcwXHU1QjU3XHU3QUNCXHU1MzczXHU1QkY5XHU1RTk0XHU1REYyXHU4OUUzXHU1MUIzXHU1MjE3XHU4ODY4XHUzMDAyXG4gICAgICAgICAgY29uc3Qgc3RhdHVzRmlsdGVyZWQgPSBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWVTdGF0dXNGaWx0ZXIgPT09ICcnIHx8IGlzc3VlLnN0YXR1cyA9PT0gaXNzdWVTdGF0dXNGaWx0ZXIpXG4gICAgICAgICAgY29uc3QgY291bnRzOiBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH0+ID0gW1xuICAgICAgICAgICAgeyBrZXk6ICcnLCBsYWJlbDogdCgncmV2aWV3LmZpbHRlckFsbCcpLCBjb3VudDogc3RhdHVzRmlsdGVyZWQubGVuZ3RoIH0sXG4gICAgICAgICAgICB7IGtleTogJ2NyaXRpY2FsJywgbGFiZWw6ICdjcml0aWNhbCcsIGNvdW50OiBzdGF0dXNGaWx0ZXJlZC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBpc3N1ZS5zZXZlcml0eSA9PT0gJ2Jsb2NrZXInKS5sZW5ndGggfSxcbiAgICAgICAgICAgIHsga2V5OiAnbWFqb3InLCBsYWJlbDogJ21ham9yJywgY291bnQ6IHN0YXR1c0ZpbHRlcmVkLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnNldmVyaXR5ID09PSAnbWFqb3InKS5sZW5ndGggfSxcbiAgICAgICAgICAgIHsga2V5OiAnbWlub3InLCBsYWJlbDogJ21pbm9yJywgY291bnQ6IHN0YXR1c0ZpbHRlcmVkLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnNldmVyaXR5ID09PSAnbWlub3InKS5sZW5ndGggfSxcbiAgICAgICAgICAgIHsga2V5OiAnaW5mbycsIGxhYmVsOiAnaW5mbycsIGNvdW50OiBzdGF0dXNGaWx0ZXJlZC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2luZm8nKS5sZW5ndGggfSxcbiAgICAgICAgICBdXG4gICAgICAgICAgY29uc3QgdmlzaWJsZSA9IHN0YXR1c0ZpbHRlcmVkXG4gICAgICAgICAgICAuZmlsdGVyKChpc3N1ZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoaXNzdWVTZXZlcml0eUZpbHRlciA9PT0gJycpIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgIGlmIChpc3N1ZVNldmVyaXR5RmlsdGVyID09PSAnY3JpdGljYWwnKSByZXR1cm4gaXNzdWUuc2V2ZXJpdHkgPT09ICdjcml0aWNhbCcgfHwgaXNzdWUuc2V2ZXJpdHkgPT09ICdibG9ja2VyJ1xuICAgICAgICAgICAgICByZXR1cm4gaXNzdWUuc2V2ZXJpdHkgPT09IGlzc3VlU2V2ZXJpdHlGaWx0ZXJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc3QgY2hlY2tlZFZpc2libGUgPSB2aXNpYmxlLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlQ2hlY2tlZFtpc3N1ZS5pZF0gPT09IHRydWUpXG4gICAgICAgICAgY29uc3QgY2hlY2tlZE9wZW4gPSBjaGVja2VkVmlzaWJsZS5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKVxuICAgICAgICAgIGNvbnN0IGNoZWNrZWRPcGVuVGFyZ2V0cyA9IEFycmF5LmZyb20obmV3IFNldChjaGVja2VkT3Blbi5tYXAoKGlzc3VlKSA9PiBpc3N1ZS5jaGFuZ2VJZCkpKVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgIHtjb3VudHMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGtleT17aXRlbS5rZXkgPT09ICcnID8gJ2FsbCcgOiBpdGVtLmtleX0gc3R5bGU9e3N0eWxlcy5jaGlwKGlzc3VlU2V2ZXJpdHlGaWx0ZXIgPT09IGl0ZW0ua2V5KX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRJc3N1ZVNldmVyaXR5RmlsdGVyKGl0ZW0ua2V5KSB9fT5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0ubGFiZWx9IFx1MDBCNyB7aXRlbS5jb3VudH1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1hcmdpbkxlZnQ6ICcxNnB4JywgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgICAgICB7b3BlbkNvdW50fSBcdTVGODVcdTU5MDRcdTc0MDYgLyBcdTUxNzEge2FsbC5sZW5ndGh9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIHsoc3RhdGU/LnJlc29sdmVkSXNzdWVSZXRlbnRpb25EYXlzID8/IDApID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgncmV2aWV3LnJldGVudGlvbkhpbnQnKS5yZXBsYWNlKCd7ZGF5c30nLCBTdHJpbmcoc3RhdGU/LnJlc29sdmVkSXNzdWVSZXRlbnRpb25EYXlzID8/IDcpKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogJ2lubGluZS1mbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgd2lkdGg6ICcxNHB4JywgaGVpZ2h0OiAnMTRweCcsIGJvcmRlclJhZGl1czogJzUwJScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsIGZvbnRTaXplOiAnMTBweCcsIGxpbmVIZWlnaHQ6IDEsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBjdXJzb3I6ICdoZWxwJywgdXNlclNlbGVjdDogJ25vbmUnLCBmbGV4U2hyaW5rOiAwIH19XG4gICAgICAgICAgICAgICAgICA+Pzwvc3Bhbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggMjRweCAzcHggOHB4JyB9fSB2YWx1ZT17aXNzdWVTdGF0dXNGaWx0ZXJ9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRJc3N1ZVN0YXR1c0ZpbHRlcihlLnRhcmdldC52YWx1ZSkgfX0+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e3QoJ3Jldmlldy5zdGF0dXNBbGwnKX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhJU1NVRV9TVEFUVVNfTEFCRUxTKS5tYXAoKFt2YWx1ZSwgbGFiZWxdKSA9PiA8b3B0aW9uIGtleT17dmFsdWV9IHZhbHVlPXt2YWx1ZX0+e2xhYmVsfTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldElzc3VlQ2hlY2tlZCgocHJldmlvdXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGxDaGVja2VkID0gdmlzaWJsZS5ldmVyeSgoaXNzdWUpID0+IHByZXZpb3VzW2lzc3VlLmlkXSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpc3N1ZSBvZiB2aXNpYmxlKSBuZXh0W2lzc3VlLmlkXSA9ICFhbGxDaGVja2VkXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHRcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPnt0KCdyZXZpZXcuc2VsZWN0QWxsJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gdGl0bGU9e3QoJ3Jldmlldy5leHBvcnRNZEhpbnQnKX0gb25DbGljaz17KCkgPT4geyBleHBvcnRJc3N1ZXNNZCh2aXNpYmxlKSB9fT57dCgncmV2aWV3LmV4cG9ydE1kJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17dCgncmV2aWV3LnRyaWFnZUhpbnQnKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3BlbkNvdW50ID0gdmlzaWJsZS5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZW5Db3VudCA9PT0gMCkgeyBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgdCgnZml4LmRpc3BhdGNoTm9PcGVuJykpOyByZXR1cm4gfVxuICAgICAgICAgICAgICAgICAgICBzZXRDb25maXJtRGlhbG9nKHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdCgncmV2aWV3LnRyaWFnZUNvbmZpcm1UaXRsZScpLFxuICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHQoJ3Jldmlldy50cmlhZ2VDb25maXJtTXNnJykucmVwbGFjZSgne259JywgJzQwJyksXG4gICAgICAgICAgICAgICAgICAgICAgZGFuZ2VyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICBjb25maXJtTGFiZWw6IHQoJ3Jldmlldy50cmlhZ2UnKSxcbiAgICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBydW5UcmlhZ2UoKSB9LFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+e3QoJ3Jldmlldy50cmlhZ2UnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIC8vIFx1NkQzRVx1NTNEMVx1NUJGOVx1OEM2MVx1RkYxQVx1NTJGRVx1OTAwOVx1NzY4NFx1NUY4NVx1NTkwNFx1NzQwNlx1OTVFRVx1OTg5OFx1NEYxOFx1NTE0OFx1RkYxQlx1NjcyQVx1NTJGRVx1OTAwOSA9IFx1NUY1M1x1NTI0RFx1N0I1Qlx1OTAwOVx1NEUwQlx1NTE2OFx1OTBFOFx1NUY4NVx1NTkwNFx1NzQwNlx1RkYwOFx1NUUzOFx1OUE3Qlx1NTE2NVx1NTNFM1x1RkYwQ1x1NEUwRFx1NTE4RFx1ODVDRlx1RkYwOVx1MzAwMlxuICAgICAgICAgICAgICAgICAgY29uc3Qgb3BlblZpc2libGUgPSB2aXNpYmxlLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpXG4gICAgICAgICAgICAgICAgICBjb25zdCBjaGVja2VkSWRzID0gb3BlblZpc2libGUuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWVDaGVja2VkW2lzc3VlLmlkXSA9PT0gdHJ1ZSkubWFwKChpc3N1ZSkgPT4gaXNzdWUuaWQpXG4gICAgICAgICAgICAgICAgICBjb25zdCBpZHMgPSBjaGVja2VkSWRzLmxlbmd0aCA+IDAgPyBjaGVja2VkSWRzIDogb3BlblZpc2libGUubWFwKChpc3N1ZSkgPT4gaXNzdWUuaWQpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgZm9udFdlaWdodDogNjAwIH19XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ2ZpeC5kaXNwYXRjaEhpbnRNYWluJyl9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkcy5sZW5ndGggPT09IDApIHsgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIHQoJ2ZpeC5kaXNwYXRjaE5vT3BlbicpKTsgcmV0dXJuIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbmZpcm1EaWFsb2coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdCgnZml4LmRpc3BhdGNoTW9kZVRpdGxlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHQoJ2ZpeC5kaXNwYXRjaE1vZGVNc2cnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoaWRzLmxlbmd0aCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkYW5nZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtTGFiZWw6IHQoJ2ZpeC5kaXNwYXRjaEF1dG8nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0OiB7IGxhYmVsOiB0KCdmaXguZGlzcGF0Y2hQbGFuJyksIG9uQWx0OiAoKSA9PiB7IHZvaWQgZGlzcGF0Y2hGaXgoW10sIGlkcywgJ3BsYW4nKSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIGRpc3BhdGNoRml4KFtdLCBpZHMsICdmaXgnKSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XHVEODNEXHVERTgwIHt0KCdmaXguZGlzcGF0Y2gnKX0oe1N0cmluZyhpZHMubGVuZ3RoKX0pPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBlbmRpbmdQbGFucyA9IHZpc2libGUuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuZml4UGxhbj8uc3RhdHVzID09PSAncGVuZGluZycpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gcGVuZGluZ1BsYW5zLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX1cbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgnZml4LmRpc3BhdGNoUGxhbnNIaW50Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6IHQoJ2ZpeC5kaXNwYXRjaFBsYW5zJyksIG1lc3NhZ2U6IGBcdTVDMDZcdTZEM0VcdTUzRDEgJHtTdHJpbmcocGVuZGluZ1BsYW5zLmxlbmd0aCl9IFx1NEUyQVx1NURGMlx1NEVBN1x1NTFGQVx1NzY4NFx1NEZFRVx1NTkwRFx1NjVCOVx1Njg0OFx1N0VEOVx1NUI1MCBBZ2VudCBcdTVFNzZcdTUzRDFcdTYyNjdcdTg4NENcdUZGMDhcdTcyRUNcdTdBQ0Igd29ya3RyZWVcdUZGMENcdTZEODhcdTgwMTdcdTZBMjFcdTU3OEJcdTc1MjhcdTkxQ0ZcdUZGMUJcdTVCOENcdTYyMTBcdTU0MEVcdTgxRUFcdTUyQThcdTU2REVcdTUxOTlcdTVFNzZcdTYzRDBcdTRFQTRcdUZGMDlcdTMwMDJgLCBkYW5nZXI6IGZhbHNlLCBjb25maXJtTGFiZWw6IHQoJ2ZpeC5kaXNwYXRjaFBsYW5zJyksIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIGRpc3BhdGNoRml4KHBlbmRpbmdQbGFucy5tYXAoKGlzc3VlKSA9PiBpc3N1ZS5maXhQbGFuIS5pZCksIFtdLCAnZml4JykgfSB9KSB9fVxuICAgICAgICAgICAgICAgICAgICA+XHVEODNEXHVEQ0U2IHt0KCdmaXguZGlzcGF0Y2hQbGFucycpfSh7U3RyaW5nKHBlbmRpbmdQbGFucy5sZW5ndGgpfSk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICkgOiBudWxsXG4gICAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZElzc3VlcygpIH19Pnt0KCdyZXZpZXcucmVmcmVzaCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge2ZpeFRhc2tzLmxlbmd0aCA+IDAgJiYgKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBGSVhfU1RBVFVTX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgcXVldWVkOiB0KCdmaXgudGFza1F1ZXVlZCcpLCBydW5uaW5nOiB0KCdmaXgudGFza1J1bm5pbmcnKSwgbWVyZ2luZzogdCgnZml4LnRhc2tNZXJnaW5nJyksIHJlZG86IHQoJ2ZpeC50YXNrUmVkbycpLCBkb25lOiB0KCdmaXgudGFza0RvbmUnKSwgY29uZmxpY3Q6IHQoJ2ZpeC50YXNrQ29uZmxpY3QnKSwgZmFpbGVkOiB0KCdmaXgudGFza0ZhaWxlZCcpLCBjYW5jZWxsZWQ6IHQoJ2ZpeC50YXNrQ2FuY2VsbGVkJykgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGZpeEFjdGl2ZSA9IGZpeFRhc2tzLnNvbWUoKHRhc2spID0+IHRhc2suc3RhdHVzID09PSAncXVldWVkJyB8fCB0YXNrLnN0YXR1cyA9PT0gJ3J1bm5pbmcnIHx8IHRhc2suc3RhdHVzID09PSAnbWVyZ2luZycgfHwgdGFzay5zdGF0dXMgPT09ICdyZWRvJylcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPENhcmQgdGl0bGU9eydcdUQ4M0VcdUREMTYgJyArIHQoJ2ZpeC5zdGF0dXMnKX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtTdHJpbmcoZml4VGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLnN0YXR1cyA9PT0gJ2RvbmUnKS5sZW5ndGgpfS97U3RyaW5nKGZpeFRhc2tzLmxlbmd0aCl9IHt0KCdmaXgudGFza0RvbmUnKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICAgIHtmaXhBY3RpdmUgJiYgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGNhbmNlbEZpeCgpIH19Plx1MjNGOSB7dCgnZml4LnN0b3AnKX08L2J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7Zml4VGFza3MubWFwKCh0YXNrKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e3Rhc2suaXNzdWVJZH0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsIHBhZGRpbmc6ICc2cHggNHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDMsIHJnYmEoNSw1LDUsMC4wNikpJywgZm9udFNpemU6ICcxMXB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UodGFzay5zdGF0dXMgPT09ICdkb25lJyA/ICcjNGVjOWIwJyA6IHRhc2suc3RhdHVzID09PSAncXVldWVkJyA/ICcjOGI5NDllJyA6IHRhc2suc3RhdHVzID09PSAncnVubmluZycgfHwgdGFzay5zdGF0dXMgPT09ICdtZXJnaW5nJyB8fCB0YXNrLnN0YXR1cyA9PT0gJ3JlZG8nID8gJyNkY2RjYWEnIDogJyNmMTRjNGMnKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtGSVhfU1RBVFVTX0xBQkVMU1t0YXNrLnN0YXR1c10gPz8gdGFzay5zdGF0dXN9e3Rhc2subW9kZSA9PT0gJ3BsYW4nID8gJ1x1MDBCN1x1NjVCOVx1Njg0OCcgOiAnJ317dGFzay5hdHRlbXB0ID4gMSA/IGBcdTAwQjcke3QoJ2ZpeC5hdHRlbXB0JykucmVwbGFjZSgne259JywgU3RyaW5nKHRhc2suYXR0ZW1wdCkpfWAgOiAnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1pbldpZHRoOiAwLCBmbGV4OiAxIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBmb250V2VpZ2h0OiA2MDAsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT57dGFzay50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsodGFzay5zdGF0dXMgPT09ICdydW5uaW5nJyB8fCB0YXNrLnN0YXR1cyA9PT0gJ3F1ZXVlZCcpICYmIHRhc2suY3VycmVudEFjdGlvbiAhPT0gdW5kZWZpbmVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSwgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScgfX0+XHUyNUI4IHt0YXNrLmN1cnJlbnRBY3Rpb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5zdW1tYXJ5ICE9PSB1bmRlZmluZWQgJiYgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3Rhc2suc3VtbWFyeX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5pbXBhY3QgIT09IHVuZGVmaW5lZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UodGFzay5pbXBhY3Qucmlza0xldmVsID09PSAnbG93JyA/ICcjNGVjOWIwJyA6IHRhc2suaW1wYWN0LnJpc2tMZXZlbCA9PT0gJ21lZGl1bScgPyAnI2RjZGNhYScgOiAnI2YxNGM0YycpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHU1RjcxXHU1NENEIHt0YXNrLmltcGFjdC5yaXNrTGV2ZWx9KHtTdHJpbmcodGFzay5pbXBhY3Qucmlza1Njb3JlKX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeycgJ31cdTc2RjRcdTYzQTUge1N0cmluZyh0YXNrLmltcGFjdC5kaXJlY3QubGVuZ3RoKX0gXHUwMEI3IFx1OTVGNFx1NjNBNSB7U3RyaW5nKHRhc2suaW1wYWN0LmluZGlyZWN0Lmxlbmd0aCl9IFx1MDBCNyBcdTZGNUNcdTU3Mjgge1N0cmluZyh0YXNrLmltcGFjdC5wb3RlbnRpYWwubGVuZ3RoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Rhc2suaW1wYWN0LmluZGlyZWN0Lmxlbmd0aCA+IDAgPyBgXHVGRjA4XHU1OTgyICR7dGFzay5pbXBhY3QuaW5kaXJlY3Quc2xpY2UoMCwgMikuam9pbignLCAnKX1cdUZGMDlgIDogJyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFzay5lcnJvciAhPT0gdW5kZWZpbmVkICYmIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2QxMjQyZicpIH19Pnt0YXNrLmVycm9yfTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsodGFzay5maWxlcyA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Rhc2suZmlsZXMhLnNsaWNlKDAsIDQpLmpvaW4oJywgJyl9e3Rhc2suY29tbWl0ICE9PSB1bmRlZmluZWQgPyBgIFx1MDBCNyAke3Rhc2suY29tbWl0fWAgOiAnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9DYXJkPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgICAgeyhjaGVja2VkVmlzaWJsZS5sZW5ndGggPiAwIHx8IGJhdGNoVmVyaWZ5U3RhdGUgIT09IG51bGwgfHwgdHJpYWdlU3RhdGUgIT09IG51bGwpICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIHBhZGRpbmc6ICc2cHggMTBweCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgICAge2JhdGNoVmVyaWZ5U3RhdGUgIT09IG51bGwgPyAoXG4gICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JykgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBcdTIzRjMge3QoJ3Jldmlldy5iYXRjaFByb2dyZXNzJykucmVwbGFjZSgne2l9JywgU3RyaW5nKGJhdGNoVmVyaWZ5U3RhdGUuZG9uZSkpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhiYXRjaFZlcmlmeVN0YXRlLnRvdGFsKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IGJhdGNoU3RvcFJlZi5jdXJyZW50ID0gdHJ1ZSB9fT57dCgncmV2aWV3LmJhdGNoU3RvcCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICkgOiB0cmlhZ2VTdGF0ZSAhPT0gbnVsbCA/IChcbiAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIFx1MjNGMyB7dCgncmV2aWV3LnRyaWFnZVByb2dyZXNzJykucmVwbGFjZSgne259JywgU3RyaW5nKHRyaWFnZVN0YXRlLnByb2Nlc3NlZCkpLnJlcGxhY2UoJ3ttfScsIFN0cmluZyh0cmlhZ2VTdGF0ZS5yZW1haW5pbmcpKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgYmF0Y2hTdG9wUmVmLmN1cnJlbnQgPSB0cnVlIH19Pnt0KCdyZXZpZXcudHJpYWdlU3RvcCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3QoJ3Jldmlldy5jaGVja2VkQ291bnQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoY2hlY2tlZFZpc2libGUubGVuZ3RoKSl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHtjaGVja2VkT3BlblRhcmdldHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgncmV2aWV3LmJhdGNoVmVyaWZ5Q29uZmlybU1zZycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhjaGVja2VkT3BlblRhcmdldHMubGVuZ3RoKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyh7IHRpdGxlOiB0KCdyZXZpZXcuYmF0Y2hWZXJpZnlDb25maXJtVGl0bGUnKSwgbWVzc2FnZTogdCgncmV2aWV3LmJhdGNoVmVyaWZ5Q29uZmlybU1zZycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhjaGVja2VkT3BlblRhcmdldHMubGVuZ3RoKSksIGRhbmdlcjogZmFsc2UsIGNvbmZpcm1MYWJlbDogdCgncmV2aWV3LmJhdGNoVmVyaWZ5JyksIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHJ1bkJhdGNoVmVyaWZ5KGNoZWNrZWRPcGVuVGFyZ2V0cykgfSB9KSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlx1RDgzRFx1REQwRCB7dCgncmV2aWV3LmJhdGNoVmVyaWZ5Jyl9KHtTdHJpbmcoY2hlY2tlZE9wZW5UYXJnZXRzLmxlbmd0aCl9KTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAge2NoZWNrZWRPcGVuLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1hcmtJc3N1ZXNIYW5kbGVkKGNoZWNrZWRPcGVuLm1hcCgoaXNzdWUpID0+IGlzc3VlLmlkKSkgfX0+XHUyNzEzIHt0KCdyZXZpZXcubWFya0hhbmRsZWQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgZXhwb3J0SXNzdWVzTWQoY2hlY2tlZFZpc2libGUpIH19Pnt0KCdyZXZpZXcuZXhwb3J0TWQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRJc3N1ZUNoZWNrZWQoe30pIH19Pnt0KCdwaWNrZXIuY2xlYXInKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7YWxsLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pntpc3N1ZXNEYXRhID09PSBudWxsID8gJ1x1MjAyNicgOiB0KCdyZXZpZXcucmVjb3Jkc0VtcHR5Jyl9PC9kaXY+XG4gICAgICAgICAgICAgICkgOiB2aXNpYmxlLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdub3Rlcy5lbXB0eVNlYXJjaCcpfTwvZGl2PlxuICAgICAgICAgICAgICApIDogdmlzaWJsZS5tYXAoKGlzc3VlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXhwYW5kZWQgPSBpc3N1ZUV4cGFuZGVkW2lzc3VlLmlkXSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gaXNzdWUuZGVzY3JpcHRpb24gPz8gJydcbiAgICAgICAgICAgICAgICBjb25zdCBsb25nID0gZGVzY3JpcHRpb24ubGVuZ3RoID4gMjAwXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpc3N1ZS5pZH0gc3R5bGU9e3N0eWxlcy5ub3RlQ2FyZH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtpc3N1ZUNoZWNrZWRbaXNzdWUuaWRdID09PSB0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4geyBzZXRJc3N1ZUNoZWNrZWQoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW2lzc3VlLmlkXTogIShwcmV2aW91c1tpc3N1ZS5pZF0gPT09IHRydWUpIH0pKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXJnaW46IDAsIGZsZXhTaHJpbms6IDAsIGN1cnNvcjogJ3BvaW50ZXInLCBhY2NlbnRDb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHNldmVyaXR5Q29sb3IoaXNzdWUuc2V2ZXJpdHkpKX0+e2lzc3VlLnNldmVyaXR5fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpc3N1ZS5jYXRlZ29yeSA/IDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM1NzYwNmEnKX0+e2lzc3VlLmNhdGVnb3J5fTwvc3Bhbj4gOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnID8gJyNkY2RjYWEnIDogaXNzdWUuc3RhdHVzID09PSAncmVzb2x2ZWQnIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2FjY2VwdGVkJyA/ICcjNGVjOWIwJyA6ICcjOGI4YjhiJyl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7SVNTVUVfU1RBVFVTX0xBQkVMU1tpc3N1ZS5zdGF0dXNdID8/IGlzc3VlLnN0YXR1c31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e2lzc3VlLnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFNocmluazogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3ZlcmlmeWluZ1RhcmdldCAhPT0gbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgncmV2aWV3LnZlcmlmeUhpbnQnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgdmVyaWZ5SXNzdWVzKGlzc3VlLmNoYW5nZUlkKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+e3ZlcmlmeWluZ1RhcmdldCA9PT0gaXNzdWUuY2hhbmdlSWQgPyB0KCdyZXZpZXcudmVyaWZ5UnVubmluZycpIDogJ1x1RDgzRFx1REQwRCAnICsgdCgncmV2aWV3LnZlcmlmeScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJykgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3Jldmlldy5mYWxzZVBvc2l0aXZlSGludCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbmZpcm1EaWFsb2coe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdCgncmV2aWV3LmZhbHNlUG9zaXRpdmVUaXRsZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB0KCdyZXZpZXcuZmFsc2VQb3NpdGl2ZU1zZycpLnJlcGxhY2UoJ3t0aXRsZX0nLCBpc3N1ZS50aXRsZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhbmdlcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1MYWJlbDogdCgncmV2aWV3LmZhbHNlUG9zaXRpdmUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaXNzdWVzL3N0YXR1cycsIHsgaWQ6IGlzc3VlLmlkLCBzdGF0dXM6ICdyZWplY3RlZCcgfSkudGhlbihhc3luYyAoeyBvayB9KSA9PiB7IGlmIChvaykgYXdhaXQgbG9hZElzc3VlcygpIH0pIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdURFQUIge3QoJ3Jldmlldy5mYWxzZVBvc2l0aXZlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17dCgncmV2aWV3Lm1hcmtIYW5kbGVkJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIG1hcmtJc3N1ZXNIYW5kbGVkKFtpc3N1ZS5pZF0pIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cdTI3MTMge3QoJ3Jldmlldy5tYXJrSGFuZGxlZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtkZXNjcmlwdGlvbiAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCAuLi4obG9uZyAmJiAhZXhwYW5kZWQgPyBzdHlsZXMubm90ZUNsYW1wIDoge30pIH19PntyZW5kZXJXaXRoUGVlayhkZXNjcmlwdGlvbil9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtpc3N1ZS5yZXNvbHV0aW9uID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JywgcGFkZGluZzogJzZweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgYmFja2dyb3VuZDogJ3JnYmEoNzgsIDIwMSwgMTc2LCAwLjA4KScsIGJvcmRlcjogJzFweCBzb2xpZCByZ2JhKDc4LCAyMDEsIDE3NiwgMC4zNSknLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBcdTI3MTMge2lzc3VlLnJlc29sdXRpb259XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICB7aXNzdWUuZml4UGxhbiAhPSBudWxsICYmICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxhbiA9IGlzc3VlLmZpeFBsYW5cbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGFuT3BlbiA9IGlzc3VlRXhwYW5kZWRbYCR7aXNzdWUuaWR9LXBsYW5gXSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGJhY2tncm91bmQ6ICdyZ2JhKDM3LCA5OSwgMjM1LCAwLjA1KScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTIpKScsIGZvbnRTaXplOiAnMTFweCcsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5saW5rQnRuLCB3aWR0aDogJzEwMCUnLCB0ZXh0QWxpZ246ICdsZWZ0JywgcGFkZGluZzogJzVweCAxMHB4JywgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0SXNzdWVFeHBhbmRlZCgocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBbYCR7aXNzdWUuaWR9LXBsYW5gXTogIShwcmV2aW91c1tgJHtpc3N1ZS5pZH0tcGxhbmBdID09PSB0cnVlKSB9KSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx1RDgzRFx1RENDNCB7dCgnZml4LnBsYW4nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHBsYW4uc3RhdHVzID09PSAncGVuZGluZycgPyAnI2Q5NzcwNicgOiAnIzI1NjNlYicpfT57cGxhbi5zdGF0dXMgPT09ICdwZW5kaW5nJyA/ICdcdTVGODVcdThCQzRcdTVCQTEnIDogJ1x1NURGMlx1NkQzRVx1NTNEMSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwbGFuLmZpbGVzLmxlbmd0aCA+IDAgJiYgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknIH19PntwbGFuLmZpbGVzLnNsaWNlKDAsIDMpLmpvaW4oJywgJyl9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+e3BsYW5PcGVuID8gJ1x1MjVCMicgOiAnXHUyNUJDJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtwbGFuT3BlbiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMnB4IDEwcHggOHB4JywgbGluZUhlaWdodDogMS43IH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48Yj57dCgnZml4LnBsYW5BcHByb2FjaCcpfVx1RkYxQTwvYj57cGxhbi5hcHByb2FjaH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PGI+e3QoJ2ZpeC5wbGFuSW1wYWN0Jyl9XHVGRjFBPC9iPntwbGFuLmltcGFjdH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PGI+e3QoJ2ZpeC5wbGFuQmVuZWZpdCcpfVx1RkYxQTwvYj57cGxhbi5iZW5lZml0fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48Yj57dCgnZml4LnBsYW5SaXNrJyl9XHVGRjFBPC9iPntwbGFuLnJpc2t9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH0pKCl9XG4gICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4U3RhdHMgIT0gbnVsbCB8fCBCb29sZWFuKGlzc3VlLmZpeERpZmYpKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmxpbmtCdG4sIG1hcmdpblRvcDogJzRweCcsIGRpc3BsYXk6ICdibG9jaycgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRGaXhFeHBhbmRlZCgocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBbaXNzdWUuaWRdOiAhKHByZXZpb3VzW2lzc3VlLmlkXSA9PT0gdHJ1ZSkgfSkpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFx1RDgzRFx1REQyNyB7dCgncmV2aWV3LmZpeERldGFpbCcpfVx1RkYwOHtTdHJpbmcoaXNzdWUuZml4U3RhdHM/LmZpbGVzID8/IDApfSB7dCgncmV2aWV3LmZpeFN0YXRGaWxlcycpfSBcdTAwQjcgK3tTdHJpbmcoaXNzdWUuZml4U3RhdHM/Lmluc2VydGlvbnMgPz8gMCl9IFx1MjIxMntTdHJpbmcoaXNzdWUuZml4U3RhdHM/LmRlbGV0aW9ucyA/PyAwKX1cdUZGMDl7Zml4RXhwYW5kZWRbaXNzdWUuaWRdID09PSB0cnVlID8gJ1x1MjVCMicgOiAnXHUyNUJDJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAge2ZpeEV4cGFuZGVkW2lzc3VlLmlkXSA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4RmlsZXMgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnM3B4JyB9fT57dCgncmV2aWV3LmZpeEZpbGVzJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4RmlsZXMgPz8gW10pLm1hcCgoZmlsZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtmaWxlfSBzdHlsZT17eyBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJywgZm9udFNpemU6ICcxMXB4JyB9fT57ZmlsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNzdWUuZml4SW1wYWN0ID8/IFtdKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzNweCcgfX0+e3QoJ3Jldmlldy5maXhJbXBhY3QnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzc3VlLmZpeEltcGFjdC5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5LnN5bWJvbH0gc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnNXB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyMwOTY5ZGEnKX0+e2VudHJ5LnN5bWJvbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsnICd9e3QoJ3Jldmlldy5kZWZpbmVkSW4nKX0ge2VudHJ5LmRlZmluZWRJbn0gXHUwMEI3IHtTdHJpbmcoZW50cnkuY2FsbGVycy5sZW5ndGgpfSB7dCgncmV2aWV3LmNhbGxDb3VudCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5jYWxsZXJzLnNsaWNlKDAsIDUpLm1hcCgoY2FsbGVyLCBjYWxsZXJJbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17Y2FsbGVySW5kZXh9IHN0eWxlPXt7IGZvbnRTaXplOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBwYWRkaW5nTGVmdDogJzEycHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZSBkb3R0ZWQnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBvcGVuUGVlayhjYWxsZXIuZmlsZSwgTnVtYmVyKGNhbGxlci5saW5lKSkgfX0+e2NhbGxlci5maWxlfTp7Y2FsbGVyLmxpbmV9PC9zcGFuPiB7Y2FsbGVyLnNuaXBwZXQuc2xpY2UoMCwgODApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge0Jvb2xlYW4oaXNzdWUuZml4RGlmZikgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzNweCcgfX0+e3QoJ3Jldmlldy5maXhEaWZmJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1pbnNldCwgcmdiYSg1LDUsNSwwLjAzKSknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnNnB4IDhweCcsIG1heEhlaWdodDogJzMwMHB4Jywgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3JlbmRlckRpZmZMaW5lcyhpc3N1ZS5maXhEaWZmKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtsb25nICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMubGlua0J0bn0gb25DbGljaz17KCkgPT4geyBzZXRJc3N1ZUV4cGFuZGVkKHsgLi4uaXNzdWVFeHBhbmRlZCwgW2lzc3VlLmlkXTogIWV4cGFuZGVkIH0pIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2V4cGFuZGVkID8gdCgnbm90ZXMuY29sbGFwc2UnKSA6IHQoJ25vdGVzLmV4cGFuZCcpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0KCdyZXZpZXcudGFyZ2V0Jyl9OiB7aXNzdWVUYXJnZXRMYWJlbChpc3N1ZS5jaGFuZ2VJZCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntmb3JtYXRUaW1lKGlzc3VlLmNyZWF0ZWRBdCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApXG4gICAgICAgIH0pKCl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgndmVyaWZ5LnJlY29yZHMnKX0+XG4gICAgICAgIHt2ZXJpZmljYXRpb25zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCd2ZXJpZnkucmVjb3Jkc0VtcHR5Jyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7dmVyaWZpY2F0aW9ucy5zbGljZSgwLCAyMCkubWFwKChyZWNvcmQpID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtyZWNvcmQuaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UocmVjb3JkLnN0YXR1cyA9PT0gJ3Bhc3NlZCcgPyAnIzRlYzliMCcgOiAnI2RjZGNhYScpfT57cmVjb3JkLnN0YXR1c308L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57cmVjb3JkLm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Zm9ybWF0VGltZShyZWNvcmQuY3JlYXRlZEF0KX08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgIDwvPlxuICApXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm9vdH0gZGF0YS10ZXN0aWQ9XCJwcm9qZWN0LWNvbnRyb2wtd29ya3NwYWNlXCI+XG4gICAgICB7cHJvcHMubGF5b3V0TW9kZSAhPT0gJ292ZXJsYXknICYmIDxzdHlsZT57TEFZT1VUX1NUWUxFfTwvc3R5bGU+fVxuICAgICAge3Byb3BzLmxheW91dE1vZGUgIT09ICdvdmVybGF5JyAmJiA8ZGl2XG4gICAgICAgIGRhdGEtdGVzdGlkPVwicHJvamVjdC1jb250cm9sLWRpdmlkZXJcIlxuICAgICAgICBvblBvaW50ZXJEb3duPXtvbkRpdmlkZXJEb3dufVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IC00LCB3aWR0aDogOCxcbiAgICAgICAgICBjdXJzb3I6ICdjb2wtcmVzaXplJywgekluZGV4OiAyMCxcbiAgICAgICAgfX1cbiAgICAgIC8+fVxuICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5hdn0+XG4gICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMudGl0bGV9Pnt0KCd3b3Jrc3BhY2UudGl0bGUnKX08L3NwYW4+XG4gICAgICAgIHt0YWJzLm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICA8YnV0dG9uIGtleT17ZW50cnkua2V5fSBzdHlsZT17c3R5bGVzLnRhYih0YWIgPT09IGVudHJ5LmtleSl9IG9uQ2xpY2s9eygpID0+IHsgc2V0VGFiKGVudHJ5LmtleSkgfX0+e2VudHJ5LmxhYmVsfTwvYnV0dG9uPlxuICAgICAgICApKX1cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcnVubmluZ0NvdW50ID0gcnVucy5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5zdGF0dXMgPT09ICdydW5uaW5nJyB8fCBlbnRyeS5zdGF0dXMgPT09ICdxdWV1ZWQnIHx8IGVudHJ5LnN0YXR1cyA9PT0gJ3ZlcmlmeWluZycpLmxlbmd0aFxuICAgICAgICAgIGNvbnN0IGZhaWxlZENvdW50ID0gcnVucy5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5zdGF0dXMgPT09ICdmYWlsZWQnIHx8IGVudHJ5LnN0YXR1cyA9PT0gJ3BhdXNlZCcpLmxlbmd0aFxuICAgICAgICAgIGlmIChydW5uaW5nQ291bnQgPT09IDAgJiYgZmFpbGVkQ291bnQgPT09IDApIHJldHVybiBudWxsXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgbWFyZ2luTGVmdDogJzRweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICB7cnVubmluZ0NvdW50ID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UodGhlbWVBd2FyZVRleHQoJyMyNTYzZWInKSksIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXI6ICdub25lJyB9fSB0aXRsZT17dCgnYmFkZ2UucnVubmluZycpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhydW5uaW5nQ291bnQpKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0VGFiKCdleGVjdXRpb24nKSB9fT5cdTI1QjYge1N0cmluZyhydW5uaW5nQ291bnQpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7ZmFpbGVkQ291bnQgPiAwICYmIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5iYWRnZSh0aGVtZUF3YXJlVGV4dCgnI2YxNGM0YycpKSwgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlcjogJ25vbmUnIH19IHRpdGxlPXt0KCdiYWRnZS5mYWlsZWQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcoZmFpbGVkQ291bnQpKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0VGFiKCdleGVjdXRpb24nKSB9fT5cdTI3MTcge1N0cmluZyhmYWlsZWRDb3VudCl9PC9idXR0b24+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKVxuICAgICAgICB9KSgpfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuYm9keX0+XG4gICAgICAgIHtwcm9wcy5zZXNzaW9uSWQgPT09IHVuZGVmaW5lZCB8fCBwcm9wcy5zZXNzaW9uSWQgPT09ICcnID8gPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnd29ya3NwYWNlLnNlbGVjdFNlc3Npb24nKX08L2Rpdj4gOiA8PlxuICAgICAgICAgIHtsb2FkRXJyb3IgIT09IG51bGwgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZXJyb3IubG9hZCcpfToge2xvYWRFcnJvcn08L2Rpdj59XG4gICAgICAgICAge3N0YXRlPy5yZWFkeSA9PT0gZmFsc2UgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57c3RhdGUucmVhc29uID8/ICcnfTwvZGl2Pn1cbiAgICAgICAgICB7dGFiID09PSAnY29tbWl0cycgJiYgY29tbWl0c1RhYn1cbiAgICAgICAgICB7dGFiID09PSAnb3ZlcnZpZXcnICYmIG92ZXJ2aWV3VGFifVxuICAgICAgICAgIHt0YWIgPT09ICdleGVjdXRpb24nICYmIGV4ZWN1dGlvblRhYn1cbiAgICAgICAgICB7dGFiID09PSAncmV2aWV3JyAmJiByZXZpZXdUYWJ9XG4gICAgICAgICAge3RhYiA9PT0gJ25vdGVzJyAmJiBub3Rlc1RhYn1cbiAgICAgICAgICB7dGFiID09PSAnc2V0dGluZ3MnICYmIHNldHRpbmdzVGFifVxuICAgICAgICA8Lz59XG4gICAgICA8L2Rpdj5cbiAgICAgIHtjb25maXJtRGlhbG9nICE9PSBudWxsICYmIChcbiAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICB0aXRsZT17Y29uZmlybURpYWxvZy50aXRsZX1cbiAgICAgICAgICBtZXNzYWdlPXtjb25maXJtRGlhbG9nLm1lc3NhZ2V9XG4gICAgICAgICAgZGFuZ2VyPXtjb25maXJtRGlhbG9nLmRhbmdlcn1cbiAgICAgICAgICBjb25maXJtTGFiZWw9e2NvbmZpcm1EaWFsb2cuY29uZmlybUxhYmVsfVxuICAgICAgICAgIGFsdD17Y29uZmlybURpYWxvZy5hbHQgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHtcbiAgICAgICAgICAgIGxhYmVsOiBjb25maXJtRGlhbG9nLmFsdC5sYWJlbCxcbiAgICAgICAgICAgIG9uQWx0OiAoKSA9PiB7IGNvbmZpcm1EaWFsb2cuYWx0IS5vbkFsdCgpOyBzZXRDb25maXJtRGlhbG9nKG51bGwpIH0sXG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKG51bGwpIH19XG4gICAgICAgICAgb25Db25maXJtPXsoKSA9PiB7IGNvbmZpcm1EaWFsb2cub25Db25maXJtKCk7IHNldENvbmZpcm1EaWFsb2cobnVsbCkgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7cGVlayAhPT0gbnVsbCAmJiAoXG4gICAgICAgIDxkaXYgZGF0YS10ZXN0aWQ9XCJwYy1wZWVrLW92ZXJsYXlcIiBzdHlsZT17eyBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIGJhY2tncm91bmQ6ICdyZ2JhKDE1LDIzLDQyLDAuNDUpJywgYmFja2Ryb3BGaWx0ZXI6ICdibHVyKDJweCknLCB6SW5kZXg6IDEwMDAsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBlZWsobnVsbCkgfX0+XG4gICAgICAgICAgPGRpdiBkYXRhLXRlc3RpZD1cInBjLXBlZWstY2FyZFwiIHN0eWxlPXt7IHdpZHRoOiAnbWluKDc2MHB4LCA5MnZ3KScsIG1heEhlaWdodDogJzgwdmgnLCBvdmVyZmxvdzogJ2hpZGRlbicsIGJvcmRlclJhZGl1czogJzEwcHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm94U2hhZG93OiAnMCAxNnB4IDQ4cHggcmdiYSgwLDAsMCwwLjI1KScsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicgfX0gb25DbGljaz17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKSB9fT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgcGFkZGluZzogJzEwcHggMTRweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJyB9fT5cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCwgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57cGVlay5wYXRofTp7U3RyaW5nKHBlZWsubGluZSl9PC9zcGFuPlxuICAgICAgICAgICAgICB7cGVla0RhdGE/LmV4aXN0cyA9PT0gdHJ1ZSAmJiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57U3RyaW5nKHBlZWtEYXRhLnN0YXJ0TGluZSl9XHUyMDEze1N0cmluZyhwZWVrRGF0YS5lbmRMaW5lKX0gLyB7U3RyaW5nKHBlZWtEYXRhLnRvdGFsTGluZXMpfSBcdTg4NEM8L3NwYW4+fVxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCAxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBlZWsobnVsbCkgfX0+XHUyNzE1PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3c6ICdhdXRvJywgcGFkZGluZzogJzEwcHggMCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctaW5zZXQsIHJnYmEoNSw1LDUsMC4wMykpJyB9fT5cbiAgICAgICAgICAgICAge3BlZWtCdXN5ICYmIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLmVtcHR5IH19Plx1OEJGQlx1NTNENlx1NEUyRFx1MjAyNjwvZGl2Pn1cbiAgICAgICAgICAgICAgeyFwZWVrQnVzeSAmJiBwZWVrRGF0YSAhPT0gbnVsbCAmJiBwZWVrRGF0YS5leGlzdHMgPT09IGZhbHNlICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+XHU2NTg3XHU0RUY2XHU0RTBEXHU1QjU4XHU1NzI4XHVGRjA4XHU1M0VGXHU4MEZEXHU1REYyXHU4OEFCXHU1MjIwXHU5NjY0XHU2MjE2XHU3OUZCXHU1MkE4XHVGRjA5PC9kaXY+fVxuICAgICAgICAgICAgICB7IXBlZWtCdXN5ICYmIHBlZWtEYXRhPy5leGlzdHMgPT09IHRydWUgJiYgKHBlZWtEYXRhLmxpbmVzID8/IFtdKS5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5Lm59IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIHBhZGRpbmc6ICcwIDE0cHgnLCBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJywgZm9udFNpemU6ICcxMS41cHgnLCBsaW5lSGVpZ2h0OiAxLjcsIGJhY2tncm91bmQ6IGVudHJ5Lm4gPT09IHBlZWsubGluZSA/ICdyZ2JhKDM3LDk5LDIzNSwwLjA4KScgOiAndHJhbnNwYXJlbnQnIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2lkdGg6IDQwLCB0ZXh0QWxpZ246ICdyaWdodCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmbGV4U2hyaW5rOiAwIH19PntTdHJpbmcoZW50cnkubil9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57ZW50cnkudGV4dCA9PT0gJycgPyAnXFx1MDBBMCcgOiBlbnRyeS50ZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApXG59XG4iLCAiLyoqXG4gKiBcdTYzRDBcdTRFQTRcdThGNkVcdTZCMjFcdTgwNUFcdTdDN0JcdUZGMDhcdTVCQTJcdTYyMzdcdTdBRUZcdUZGMDlcdUZGMUFcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTUzRjBcdTc2ODRcdTRFMEJcdTYyQzlcdTY4NDZcdTYzMDlcdTMwMENcdTRFMDBcdThGNkVcdTVERTVcdTRGNUNcdTMwMERcdTUyMDZcdTdFQzRcdTVDNTVcdTc5M0FcdTMwMDJcbiAqIFx1NEUwRSBydW50aW1lL2hpc3RvcnkudHMgXHU3Njg0IGNsdXN0ZXJDb21taXRzIFx1NEZERFx1NjMwMVx1NTQwQ1x1NEUwMFx1NTQyRlx1NTNEMVx1NUYwRlx1RkYwOFYxLjAgXHUwMEE3OTcvXHUwMEE3OTlcdUZGMDlcdUZGMUFcbiAqIFx1NzZGOFx1OTBCQlx1NjNEMFx1NEVBNFx1NjVGNlx1OTVGNFx1OTVGNFx1OTY5NFx1OEQ4NVx1OEZDN1x1N0E5N1x1NTNFM1x1RkYwOFx1OUVEOFx1OEJBNCAzNmhcdUZGMDlcdTUyMDdcdTY1QURcdUZGMUJcdThGREVcdTdFRUQgXHUyMjY1MyBcdTRFMkFcdTYzRDBcdTRFQTRcdTU0MEVcdTRFMEVcdTVERjJcdTgwNUFcdTY1ODdcdTRFRjZcbiAqIFx1OTZGNlx1OTFDRFx1NTNFMFx1NEU1Rlx1NTIwN1x1NjVBRFx1MzAwMlx1NjcwRFx1NTJBMVx1N0FFRlx1OTBBM1x1NEVGRFx1NURFNVx1NEY1Q1x1NTcyOCBnaXQgXHU2MjZCXHU2M0NGXHU1QzQyXHVGRjA4XHU5MUNEXHU1RUZBXHU1Mzg2XHU1M0YyXHVGRjA5XHVGRjBDXHU4RkQ5XHU0RUZEXHU5NzYyXHU1NDExXG4gKiAvY29tbWl0cyBcdThGRDRcdTU2REVcdTc2ODRcdTYzRDBcdTRFQTRcdTY3NjFcdTc2RUVcdTIwMTRcdTIwMTRcdTRFMjRcdTU5MDRcdTg5QzRcdTUyMTlcdTY1MzlcdTUyQThcdTVGQzVcdTk4N0JcdTU0MENcdTZCNjVcdTMwMDJcbiAqXG4gKiBAbW9kdWxlIGRzaC1jbGllbnQtcHJvamVjdC1jb250cm9sL2NvbXBvbmVudHMvY29tbWl0LXJvdW5kc1xuICovXG5cbi8qKiBcdTgwNUFcdTdDN0JcdThGOTNcdTUxNjVcdTc2ODRcdTY3MDBcdTVDMEZcdTVGNjJcdTcyQjZcdUZGMDgvY29tbWl0cyBcdTc2ODRcdTYzRDBcdTRFQTRcdTY3NjFcdTc2RUVcdTVCNTBcdTk2QzZcdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBpbnRlcmZhY2UgUm91bmRDb21taXQge1xuICBzaGE6IHN0cmluZ1xuICAvKiogXHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0XHVGRjA4XHU2QkVCXHU3OUQyXHVGRjA5XHUzMDAyICovXG4gIGRhdGU6IG51bWJlclxuICAvKiogXHU2RDg5XHU1M0NBXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0XHVGRjA4XHU3NkY4XHU1QkY5XHU0RUQzXHU1RTkzXHU2ODM5XHVGRjA5XHUzMDAyICovXG4gIGZpbGVzOiBzdHJpbmdbXVxufVxuXG4vKiogXHU0RTAwXHU4RjZFXHU1REU1XHU0RjVDXHVGRjFBXHU0RkREXHU2MzAxXHU0RjIwXHU1MTY1XHU5ODdBXHU1RThGXHU3Njg0XHU2M0QwXHU0RUE0XHU1MjE3XHU4ODY4XHVGRjA4L2NvbW1pdHMgXHU0RTNBXHU2NUIwXHUyMTkyXHU2NUU3XHVGRjA5KyBcdTY1RjZcdTk1RjRcdTgzMDNcdTU2RjRcdTMwMDIgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0Um91bmQge1xuICBjb21taXRzOiBSb3VuZENvbW1pdFtdXG4gIC8qKiBcdThGNkVcdTUxODVcdTY3MDBcdTY1RTlcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdTMwMDIgKi9cbiAgZmlyc3RBdDogbnVtYmVyXG4gIC8qKiBcdThGNkVcdTUxODVcdTY3MDBcdTY2NUFcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdTMwMDIgKi9cbiAgbGFzdEF0OiBudW1iZXJcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUk9VTkRfR0FQX01TID0gMzYgKiA2MCAqIDYwICogMTAwMFxuXG4vKiogXHU0RTBFXHU2NzBEXHU1MkExXHU3QUVGIGNsdXN0ZXJDb21taXRzIFx1NzZGOFx1NTQwQ1x1NzY4NFx1OTFDRFx1NTNFMFx1NzM4N1x1RkYxQVx1NTQ3RFx1NEUyRFx1NjU4N1x1NEVGNlx1NjU3MCAvIG1heChcdTY3MkNcdTYzRDBcdTRFQTRcdTY1ODdcdTRFRjZcdTY1NzAsIDEpXHUzMDAyICovXG5mdW5jdGlvbiBvdmVybGFwUmF0aW8oZmlsZXM6IHN0cmluZ1tdLCBleGlzdGluZzogU2V0PHN0cmluZz4pOiBudW1iZXIge1xuICBpZiAoZXhpc3Rpbmcuc2l6ZSA9PT0gMCkgcmV0dXJuIDBcbiAgbGV0IGhpdHMgPSAwXG4gIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykgaWYgKGV4aXN0aW5nLmhhcyhmaWxlKSkgaGl0cyArPSAxXG4gIHJldHVybiBoaXRzIC8gTWF0aC5tYXgoZmlsZXMubGVuZ3RoLCAxKVxufVxuXG4vKipcbiAqIFx1NjI4QVx1RkYwOFx1NjVCMFx1MjE5Mlx1NjVFN1x1NjIxNlx1NjVFN1x1MjE5Mlx1NjVCMFx1NTc0N1x1NTNFRlx1RkYwOVx1OEZERVx1N0VFRFx1NjNEMFx1NEVBNFx1ODA1QVx1NjIxMFx1OEY2RVx1NkIyMVx1MzAwMlxuICogXHU2NUY2XHU5NUY0XHU5NUY0XHU5Njk0XHU1M0Q2XHU3RUREXHU1QkY5XHU1MDNDXHVGRjFBXHU1MjE3XHU4ODY4XHU5ODdBXHU1RThGXHU0RTBEXHU0RkREXHU4QkMxXHU2NUY2XHU5NUY0XHU2NUI5XHU1NDExXHUzMDAyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbHVzdGVySW50b1JvdW5kcyhjb21taXRzOiBSb3VuZENvbW1pdFtdLCBjbHVzdGVyR2FwTXM6IG51bWJlciA9IERFRkFVTFRfUk9VTkRfR0FQX01TKTogQ29tbWl0Um91bmRbXSB7XG4gIGNvbnN0IHJvdW5kczogQ29tbWl0Um91bmRbXSA9IFtdXG4gIGxldCBjdXJyZW50OiBSb3VuZENvbW1pdFtdID0gW11cbiAgbGV0IGN1cnJlbnRGaWxlcyA9IG5ldyBTZXQ8c3RyaW5nPigpXG5cbiAgY29uc3QgcHVzaFJvdW5kID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmIChjdXJyZW50Lmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgY29uc3QgdGltZXMgPSBjdXJyZW50Lm1hcCgoY29tbWl0KSA9PiBjb21taXQuZGF0ZSlcbiAgICByb3VuZHMucHVzaCh7IGNvbW1pdHM6IGN1cnJlbnQsIGZpcnN0QXQ6IE1hdGgubWluKC4uLnRpbWVzKSwgbGFzdEF0OiBNYXRoLm1heCguLi50aW1lcykgfSlcbiAgICBjdXJyZW50ID0gW11cbiAgICBjdXJyZW50RmlsZXMgPSBuZXcgU2V0KClcbiAgfVxuXG4gIGZvciAoY29uc3QgY29tbWl0IG9mIGNvbW1pdHMpIHtcbiAgICBjb25zdCBwcmV2aW91cyA9IGN1cnJlbnRbY3VycmVudC5sZW5ndGggLSAxXVxuICAgIGNvbnN0IGdhcEJyZWFrID0gcHJldmlvdXMgIT09IHVuZGVmaW5lZCAmJiBNYXRoLmFicyhjb21taXQuZGF0ZSAtIHByZXZpb3VzLmRhdGUpID4gY2x1c3RlckdhcE1zXG4gICAgY29uc3QgZmlsZUJyZWFrID0gY3VycmVudC5sZW5ndGggPj0gMyAmJiBvdmVybGFwUmF0aW8oY29tbWl0LmZpbGVzLCBjdXJyZW50RmlsZXMpID09PSAwXG4gICAgaWYgKGdhcEJyZWFrIHx8IGZpbGVCcmVhaykgcHVzaFJvdW5kKClcbiAgICBjdXJyZW50LnB1c2goY29tbWl0KVxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBjb21taXQuZmlsZXMpIGN1cnJlbnRGaWxlcy5hZGQoZmlsZSlcbiAgfVxuICBwdXNoUm91bmQoKVxuICByZXR1cm4gcm91bmRzXG59XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUxheW91dEVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSwgdXNlU3luY0V4dGVybmFsU3RvcmUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFdvcmtzcGFjZUZyYW1lIH0gZnJvbSAnLi9Xb3Jrc3BhY2VGcmFtZS50c3gnXG5cbmludGVyZmFjZSBDdXJyZW50U2Vzc2lvbiB7XG4gIGdldFNuYXBzaG90KCk6IHsga2V5Pzogc3RyaW5nIH1cbiAgc3Vic2NyaWJlKGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogKCkgPT4gdm9pZFxufVxuXG5pbnRlcmZhY2UgUGFuZWxJbmZvIHtcbiAgZ2V0U25hcHNob3QoKTogeyBhY3RpdmVQYW5lbElkOiBzdHJpbmcgfCBudWxsIH1cbiAgc3Vic2NyaWJlKGxpc3RlbmVyOiAoKSA9PiB2b2lkKTogKCkgPT4gdm9pZFxufVxuXG5pbnRlcmZhY2UgTW9kZXJuV29ya3NwYWNlUHJvcHMge1xuICBjdXJyZW50OiBDdXJyZW50U2Vzc2lvblxuICBwYW5lbEluZm86IFBhbmVsSW5mb1xuICBlbmFibGVkOiBib29sZWFuXG4gIG9uRGlzbWlzczogKCkgPT4gdm9pZFxufVxuXG5pbnRlcmZhY2UgQm91bmRzIHtcbiAgbGVmdDogbnVtYmVyXG4gIHRvcDogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdvcmtzcGFjZUJvdW5kcyhmcmFtZTogQm91bmRzLCBjZW50ZXI6IEJvdW5kcywgY2hhdFdpZHRoOiBudW1iZXIpOiBCb3VuZHMgfCB1bmRlZmluZWQge1xuICBjb25zdCBhdmFpbGFibGUgPSBNYXRoLmZsb29yKGNlbnRlci53aWR0aClcbiAgaWYgKGF2YWlsYWJsZSA8IDU2MCB8fCBjZW50ZXIuaGVpZ2h0IDw9IDApIHJldHVybiB1bmRlZmluZWRcbiAgY29uc3QgY2hhdCA9IE1hdGgubWF4KDI4MCwgTWF0aC5taW4oY2hhdFdpZHRoLCBhdmFpbGFibGUgLSAyODApKVxuICByZXR1cm4ge1xuICAgIGxlZnQ6IGNlbnRlci5sZWZ0IC0gZnJhbWUubGVmdCxcbiAgICB0b3A6IGNlbnRlci50b3AgLSBmcmFtZS50b3AsXG4gICAgd2lkdGg6IGF2YWlsYWJsZSAtIGNoYXQsXG4gICAgaGVpZ2h0OiBjZW50ZXIuaGVpZ2h0LFxuICB9XG59XG5cbi8qKiBcdTY1QjBcdTcyNDhcdTVCQkZcdTRFM0JcdTc2ODRcdTUyQTBcdTZDRDVcdTZENkVcdTVDNDJcdUZGMUJcdTRFQzVcdTUzOEJcdTdGMjlcdTRGMUFcdThCRERcdTUyMTdcdUZGMENcdTRFMERcdTY1MzlcdTUzRDhcdTVCOThcdTY1QjlcdTUzRjNcdTRGQTdcdTY4MEZcdTYyMTZcdTdGNTFcdTY4M0NcdTZBMjFcdTY3N0ZcdTMwMDIgKi9cbmV4cG9ydCBmdW5jdGlvbiBNb2Rlcm5Xb3Jrc3BhY2UoeyBjdXJyZW50LCBwYW5lbEluZm8sIGVuYWJsZWQsIG9uRGlzbWlzcyB9OiBNb2Rlcm5Xb3Jrc3BhY2VQcm9wcykge1xuICBjb25zdCBzZXNzaW9uSWQgPSB1c2VTeW5jRXh0ZXJuYWxTdG9yZShcbiAgICAobGlzdGVuZXIpID0+IGN1cnJlbnQuc3Vic2NyaWJlKGxpc3RlbmVyKSxcbiAgICAoKSA9PiBjdXJyZW50LmdldFNuYXBzaG90KCkua2V5LFxuICApXG4gIGNvbnN0IGFjdGl2ZVBhbmVsSWQgPSB1c2VTeW5jRXh0ZXJuYWxTdG9yZShcbiAgICAobGlzdGVuZXIpID0+IHBhbmVsSW5mby5zdWJzY3JpYmUobGlzdGVuZXIpLFxuICAgICgpID0+IHBhbmVsSW5mby5nZXRTbmFwc2hvdCgpLmFjdGl2ZVBhbmVsSWQsXG4gIClcbiAgY29uc3QgdmlzaWJsZSA9IGVuYWJsZWQgJiYgYWN0aXZlUGFuZWxJZCA9PT0gbnVsbFxuICBjb25zdCBkcmFnQ2xlYW51cCA9IHVzZVJlZjwoKCkgPT4gdm9pZCkgfCB1bmRlZmluZWQ+KClcbiAgY29uc3QgW2JvdW5kcywgc2V0Qm91bmRzXSA9IHVzZVN0YXRlPEJvdW5kcyB8IHVuZGVmaW5lZD4oKVxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4gKCkgPT4geyBkcmFnQ2xlYW51cC5jdXJyZW50Py4oKSB9LCBbdmlzaWJsZV0pXG4gIGNvbnN0IFtjaGF0V2lkdGgsIHNldENoYXRXaWR0aF0gPSB1c2VTdGF0ZSgoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BjLmNoYXRXaWR0aCcpID8/ICcnKVxuICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUoc2F2ZWQpICYmIHNhdmVkID49IDI4MCA/IHNhdmVkIDogMzYwXG4gIH0pXG5cbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXZpc2libGUpIHJldHVyblxuICAgIGNvbnN0IHJpZ2h0YmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJ1tkYXRhLXJpZ2h0YmFyLWNvbF0nKVxuICAgIGNvbnN0IGZyYW1lID0gcmlnaHRiYXI/LnBhcmVudEVsZW1lbnRcbiAgICBjb25zdCBjZW50ZXJzID0gZnJhbWU/LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KCc6c2NvcGUgPiBkaXZbY2xhc3MqPVwiY2VudGVyQ29sXCJdJylcbiAgICBpZiAoZnJhbWUgPT09IHVuZGVmaW5lZCB8fCBmcmFtZSA9PT0gbnVsbCB8fCBjZW50ZXJzPy5sZW5ndGggIT09IDEpIHtcbiAgICAgIG9uRGlzbWlzcygpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgY2VudGVyID0gY2VudGVyc1swXSFcbiAgICBjb25zdCBvbGRQYWRkaW5nID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctbGVmdCcpXG4gICAgY29uc3Qgb2xkUGFkZGluZ1ByaW9yaXR5ID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5UHJpb3JpdHkoJ3BhZGRpbmctbGVmdCcpXG4gICAgY29uc3Qgb2xkQm94U2l6aW5nID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2JveC1zaXppbmcnKVxuICAgIGNvbnN0IG9sZEJveFNpemluZ1ByaW9yaXR5ID0gY2VudGVyLnN0eWxlLmdldFByb3BlcnR5UHJpb3JpdHkoJ2JveC1zaXppbmcnKVxuICAgIGxldCBhcHBsaWVkUGFkZGluZyA9ICcnXG4gICAgbGV0IGFjdGl2ZSA9IHRydWVcblxuICAgIGNvbnN0IHVwZGF0ZSA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICghYWN0aXZlKSByZXR1cm5cbiAgICAgIGNvbnN0IG5leHQgPSB3b3Jrc3BhY2VCb3VuZHMoZnJhbWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIGNlbnRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgY2hhdFdpZHRoKVxuICAgICAgaWYgKG5leHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvbkRpc21pc3MoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhZGRpbmcgPSBgJHtuZXh0LndpZHRofXB4YFxuICAgICAgaWYgKHBhZGRpbmcgIT09IGFwcGxpZWRQYWRkaW5nKSB7XG4gICAgICAgIGNlbnRlci5zdHlsZS5zZXRQcm9wZXJ0eSgncGFkZGluZy1sZWZ0JywgcGFkZGluZywgJ2ltcG9ydGFudCcpXG4gICAgICAgIGFwcGxpZWRQYWRkaW5nID0gcGFkZGluZ1xuICAgICAgfVxuICAgICAgY2VudGVyLnN0eWxlLnNldFByb3BlcnR5KCdib3gtc2l6aW5nJywgJ2JvcmRlci1ib3gnLCAnaW1wb3J0YW50JylcbiAgICAgIHNldEJvdW5kcygocHJldmlvdXMpID0+IHByZXZpb3VzPy5sZWZ0ID09PSBuZXh0LmxlZnQgJiYgcHJldmlvdXMudG9wID09PSBuZXh0LnRvcCAmJiBwcmV2aW91cy53aWR0aCA9PT0gbmV4dC53aWR0aCAmJiBwcmV2aW91cy5oZWlnaHQgPT09IG5leHQuaGVpZ2h0ID8gcHJldmlvdXMgOiBuZXh0KVxuICAgIH1cbiAgICBjb25zdCByZXNpemUgPSBuZXcgUmVzaXplT2JzZXJ2ZXIodXBkYXRlKVxuICAgIHJlc2l6ZS5vYnNlcnZlKGZyYW1lKVxuICAgIHJlc2l6ZS5vYnNlcnZlKGNlbnRlcilcbiAgICBjb25zdCBtdXRhdGlvbnMgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBpZiAoIWZyYW1lLmhhc0F0dHJpYnV0ZSgnZGF0YS1yaWdodGJhci1jb2xsYXBzZWQnKSkgb25EaXNtaXNzKClcbiAgICAgIGVsc2UgdXBkYXRlKClcbiAgICB9KVxuICAgIG11dGF0aW9ucy5vYnNlcnZlKGZyYW1lLCB7IGF0dHJpYnV0ZXM6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogWydkYXRhLXJpZ2h0YmFyLWNvbGxhcHNlZCddIH0pXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZSlcbiAgICB1cGRhdGUoKVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBhY3RpdmUgPSBmYWxzZVxuICAgICAgcmVzaXplLmRpc2Nvbm5lY3QoKVxuICAgICAgbXV0YXRpb25zLmRpc2Nvbm5lY3QoKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZSlcbiAgICAgIGlmIChjZW50ZXIuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1sZWZ0JykgPT09IGFwcGxpZWRQYWRkaW5nKSB7XG4gICAgICAgIGlmIChvbGRQYWRkaW5nID09PSAnJykgY2VudGVyLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nLWxlZnQnKVxuICAgICAgICBlbHNlIGNlbnRlci5zdHlsZS5zZXRQcm9wZXJ0eSgncGFkZGluZy1sZWZ0Jywgb2xkUGFkZGluZywgb2xkUGFkZGluZ1ByaW9yaXR5KVxuICAgICAgfVxuICAgICAgaWYgKGNlbnRlci5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdib3gtc2l6aW5nJykgPT09ICdib3JkZXItYm94Jykge1xuICAgICAgICBpZiAob2xkQm94U2l6aW5nID09PSAnJykgY2VudGVyLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdib3gtc2l6aW5nJylcbiAgICAgICAgZWxzZSBjZW50ZXIuc3R5bGUuc2V0UHJvcGVydHkoJ2JveC1zaXppbmcnLCBvbGRCb3hTaXppbmcsIG9sZEJveFNpemluZ1ByaW9yaXR5KVxuICAgICAgfVxuICAgICAgc2V0Qm91bmRzKHVuZGVmaW5lZClcbiAgICB9XG4gIH0sIFt2aXNpYmxlLCBjaGF0V2lkdGgsIG9uRGlzbWlzc10pXG5cbiAgaWYgKCF2aXNpYmxlIHx8IGJvdW5kcyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IG9uRGl2aWRlckRvd24gPSAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zdCBvbk1vdmUgPSAobW92ZTogUG9pbnRlckV2ZW50KTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCdbZGF0YS1yaWdodGJhci1jb2xdJyk/LnBhcmVudEVsZW1lbnRcbiAgICAgIGNvbnN0IGNlbnRlciA9IGZyYW1lPy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PignOnNjb3BlID4gZGl2W2NsYXNzKj1cImNlbnRlckNvbFwiXScpXG4gICAgICBpZiAoY2VudGVyID09PSB1bmRlZmluZWQgfHwgY2VudGVyID09PSBudWxsKSByZXR1cm5cbiAgICAgIGNvbnN0IHdpZHRoID0gTWF0aC5tYXgoMjgwLCBNYXRoLm1pbig5MDAsIE1hdGgucm91bmQoY2VudGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0IC0gbW92ZS5jbGllbnRYKSkpXG4gICAgICBzZXRDaGF0V2lkdGgod2lkdGgpXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGMuY2hhdFdpZHRoJywgU3RyaW5nKHdpZHRoKSlcbiAgICB9XG4gICAgY29uc3Qgb25VcCA9ICgpOiB2b2lkID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSlcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJjYW5jZWwnLCBvblVwKVxuICAgICAgZHJhZ0NsZWFudXAuY3VycmVudCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgICBkcmFnQ2xlYW51cC5jdXJyZW50Py4oKVxuICAgIGRyYWdDbGVhbnVwLmN1cnJlbnQgPSBvblVwXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyY2FuY2VsJywgb25VcClcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXRlc3RpZD1cInByb2plY3QtY29udHJvbC1tb2Rlcm4td29ya3NwYWNlXCIgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIC4uLmJvdW5kcywgcG9pbnRlckV2ZW50czogJ2F1dG8nIH19PlxuICAgICAgPFdvcmtzcGFjZUZyYW1lIGtleT17c2Vzc2lvbklkID8/ICdsYW5kaW5nJ30gey4uLihzZXNzaW9uSWQgPT09IHVuZGVmaW5lZCA/IHt9IDogeyBzZXNzaW9uSWQgfSl9IGxheW91dE1vZGU9XCJvdmVybGF5XCIgLz5cbiAgICAgIDxkaXYgZGF0YS10ZXN0aWQ9XCJwcm9qZWN0LWNvbnRyb2wtbW9kZXJuLWRpdmlkZXJcIiBvblBvaW50ZXJEb3duPXtvbkRpdmlkZXJEb3dufSBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAwLCBib3R0b206IDAsIHJpZ2h0OiAtNCwgd2lkdGg6IDgsIGN1cnNvcjogJ2NvbC1yZXNpemUnLCB6SW5kZXg6IDIwIH19IC8+XG4gICAgPC9kaXY+XG4gIClcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpQkEsSUFBQUEsZ0JBQWtCOzs7QUNObEIsbUJBQWtCOzs7QUNNWCxTQUFTLFdBQVcsT0FBZ0Q7QUFDekUsUUFBTSxNQUFNLG9CQUFvQixLQUFLLEtBQUs7QUFDMUMsTUFBSSxRQUFRLE1BQU07QUFDaEIsVUFBTSxRQUFRLE9BQU8sU0FBUyxJQUFJLENBQUMsR0FBSSxFQUFFO0FBQ3pDLFdBQU8sQ0FBRSxTQUFTLEtBQU0sS0FBTSxTQUFTLElBQUssS0FBSyxRQUFRLEdBQUc7QUFBQSxFQUM5RDtBQUNBLFFBQU0sYUFBYSxzREFBc0QsS0FBSyxLQUFLO0FBQ25GLE1BQUksZUFBZSxNQUFNO0FBQ3ZCLFdBQU8sQ0FBQyxPQUFPLFdBQVcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxXQUFXLENBQUMsQ0FBQyxHQUFHLE9BQU8sV0FBVyxDQUFDLENBQUMsQ0FBQztBQUFBLEVBQzdFO0FBQ0EsU0FBTztBQUNUO0FBR08sU0FBUyxrQkFBa0IsR0FBVyxHQUFXLEdBQW1CO0FBQ3pFLFFBQU0sVUFBVSxDQUFDLFVBQTBCO0FBQ3pDLFVBQU0s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Q25CLHFCQUFxQjtBQUFBLElBQ3JCLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHdCQUF3QjtBQUFBLElBQ3hCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHlCQUF5QjtBQUFBLElBQ3pCLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLGtCQUFrQjtBQUFBLElBQ2xCLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHdCQUF3QjtBQUFBLElBQ3hCLDRCQUE0QjtBQUFBLElBQzVCLDZCQUE2QjtBQUFBLElBQzdCLDJCQUEyQjtBQUFBLElBQzNCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLHdCQUF3QjtBQUFBLElBQ3hCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBQ3hCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGtDQUFrQztBQUFBLElBQ2xDLGdDQUFnQztBQUFBLElBQ2hDLG9CQUFvQjtBQUFBLElBQ3BCLHdCQUF3QjtBQUFBLElBQ3hCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLGlCQUFpQjtBQUFBLElBQ2pCLHFCQUFxQjtBQUFBLElBQ3JCLDZCQUE2QjtBQUFBLElBQzdCLDJCQUEyQjtBQUFBLElBQzNCLHlCQUF5QjtBQUFBLElBQ3pCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLHdCQUF3QjtBQUFBLElBQ3hCLDBCQUEwQjtBQUFBLElBQzFCLHNCQUFzQjtBQUFBLElBQ3RCLFlBQVk7QUFBQSxJQUNaLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLGdCQUFnQjtBQUFBLElBQ2hCLHdCQUF3QjtBQUFBLElBQ3hCLHlCQUF5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aEIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsd0JBQXdCO0FBQUEsSUFDeEIscUJBQXFCO0FBQUEsSUFDckIsNEJBQTRCO0FBQUEsSUFFNUIsZUFBZTtBQUFBLElBQ2Ysc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsd0JBQXdCO0FBQUEsSUFDeEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIseUJBQXlCO0FBQUEsSUFDekIsMEJBQTBCO0FBQUEsSUFDMUIsMkJBQTJCO0FBQUEsSUFFM0Isa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFFaEIsZUFBZTtBQUFBLElBQ2YsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsYUFBYTtBQUFBLElBQ2IsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBRWYsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIscUJBQXFCO0FBQUEsSUFDckIsa0JBQWtCO0FBQUEsSUFDbEIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUEsSUFDekIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsa0JBQWtCO0FBQUEsSUFDbEIsdUJBQXVCO0FBQUEsSUFFdkIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsSUFFbEIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsbUJBQW1CO0FBQUEsSUFDbkIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsaUJBQWlCO0FBQUEsSUFDakIsYUFBYTtBQUFBLElBQ2IsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsRUFDcEI7QUFBQSxFQUNBLElBQUk7QUFBQSxJQUNGLG1CQUFtQjtBQUFBLElBQ25CLDJCQUEyQjtBQUFBLElBQzNCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLElBQ2hCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGlCQUFpQjtBQUFBLElBQ2pCLHVCQUF1QjtBQUFBLElBQ3ZCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBRWhCLFlBQVk7QUFBQSxJQUNaLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHFCQUFxQjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLDBCQUEwQjtBQUFBLElBQzFCLDhCQUE4QjtBQUFBLElBQzlCLG9CQUFvQjtBQUFBLElBQ3BCLHdCQUF3QjtBQUFBLElBQ3hCLHdCQUF3QjtBQUFBLElBQ3hCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLGFBQWE7QUFBQSxJQUNiLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHdCQUF3QjtBQUFBLElBQ3hCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHlCQUF5QjtBQUFBLElBQ3pCLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLGtCQUFrQjtBQUFBLElBQ2xCLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHdCQUF3QjtBQUFBLElBQ3hCLDRCQUE0QjtBQUFBLElBQzVCLDZCQUE2QjtBQUFBLElBQzdCLDJCQUEyQjtBQUFBLElBQzNCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLHdCQUF3QjtBQUFBLElBQ3hCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBQ3hCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGtDQUFrQztBQUFBLElBQ2xDLGdDQUFnQztBQUFBLElBQ2hDLG9CQUFvQjtBQUFBLElBQ3BCLHdCQUF3QjtBQUFBLElBQ3hCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLGlCQUFpQjtBQUFBLElBQ2pCLHFCQUFxQjtBQUFBLElBQ3JCLDZCQUE2QjtBQUFBLElBQzdCLDJCQUEyQjtBQUFBLElBQzNCLHlCQUF5QjtBQUFBLElBQ3pCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLHdCQUF3QjtBQUFBLElBQ3hCLDBCQUEwQjtBQUFBLElBQzFCLHNCQUFzQjtBQUFBLElBQ3RCLFlBQVk7QUFBQSxJQUNaLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLGdCQUFnQjtBQUFBLElBQ2hCLHdCQUF3QjtBQUFBLElBQ3hCLHlCQUF5QjtBQUFBLElBQ3pCLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLHlCQUF5QjtBQUFBLElBQ3pCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkLFlBQVk7QUFBQSxJQUNaLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLG1CQUFtQjtBQUFBLElBQ25CLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLGdC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UTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsWUFBWTtBQUFBLFVBQ1osVUFBVTtBQUFBLFVBQ1YsWUFBWTtBQUFBLFVBQ1osWUFBWTtBQUFBLFVBQ1osV0FBVztBQUFBLFVBQ1gsV0FBVztBQUFBLFFBQ2I7QUFBQSxNQUNGO0FBQUEsTUFDQSxjQUFBQSxRQUFNLGNBQWMsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEtBQUssY0FBYyxNQUFNLEVBQUUsR0FBRyxLQUFLO0FBQUEsTUFDckYsT0FBTyxJQUFJO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFHQSxNQUFJLE1BQU0sT0FBTyxzQkFBc0IsTUFBTTtBQUMzQyxXQUFPLElBQUksTUFBTSxTQUFTO0FBQUEsTUFDeEIsTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLElBQ1AsR0FBRyxDQUFDLFVBQWU7QUFDakIsVUFBSSxPQUFPLGFBQWEsaUJBQWtCLFFBQU87QUFDakQsWUFBTSxTQUFTLE9BQU87QUFDdEIsYUFBTyxjQUFBQSxRQUFNLGNBQWMsWUFBWTtBQUFBLFFBQ3JDLE9BQU87QUFBQSxRQUNQLGNBQWMsUUFBUSxnQkFBZ0I7QUFBQSxRQUN0QyxZQUFZLFFBQVEsY0FBYztBQUFBLFFBQ2xDLFdBQVcsUUFBUSxhQUFhO0FBQUEsUUFDaEMsWUFBWSxRQUFRO0FBQUEsUUFDcEIsUUFBUSxTQUFTLGNBQWM7QUFBQSxNQUNqQyxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsYUFBVyxDQUFDLFNBQVMsS0FBSyxLQUFLO0FBQUEsSUFDN0IsQ0FBQyxhQUFhLDRCQUFXO0FBQUEsSUFDekIsQ0FBQyxjQUFjLG9DQUFTO0FBQUEsSUFDeEIsQ0FBQyxvQkFBb0IsaUNBQVE7QUFBQSxFQUMvQixHQUFZO0FBQ1YsUUFBSSxNQUFNLE9BQU8sc0JBQXNCLE1BQU07QUFDM0MsYUFBTyxJQUFJLE1BQU0sU0FBUyxFQUFFLE1BQU0sc0JBQXNCLEtBQUssUUFBUSxHQUFHLGlCQUFpQixLQUFLLENBQUM7QUFBQSxJQUNqRyxDQUFDO0FBQUEsRUFDSDtBQUNGOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIm5hbWUiLCAiUmVhY3QiLCAib2siLCAiZGF0YSIsICJhcHBseSIsICJvcGVuQ291bnQiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCJdCn0K
