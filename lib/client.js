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
        border: "1px solid var(--dsh-border, #333)",
        borderRadius: "6px",
        padding: "10px 14px",
        margin: "6px 0",
        backgroundColor: "var(--dsh-bg-subtle, #1e1e1e)",
        color: "var(--dsh-text, #eee)",
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
            backgroundColor: "var(--dsh-badge-bg, #2a2a2a)",
            color: "var(--dsh-badge-text, #aaa)"
          }
        },
        status
      )
    ),
    import_react.default.createElement(
      "div",
      { style: { display: "flex", gap: "12px", fontSize: "12px", opacity: 0.9 } },
      import_react.default.createElement("span", null, `\u{1F4C1} ${filesChanged} files`),
      import_react.default.createElement("span", { style: { color: "#4ec9b0" } }, `+${insertions}`),
      import_react.default.createElement("span", { style: { color: "#f14c4c" } }, `-${deletions}`),
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
      style.color = "#1a7f37";
      style.background = "rgba(46,160,67,0.08)";
    } else if (line.startsWith("-")) {
      style.color = "#d1242f";
      style.background = "rgba(209,36,47,0.08)";
    } else {
      style.color = "var(--dsw-alias-label-secondary, #6b7280)";
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style, children: line === "" ? "\xA0" : line }, index);
  });
}
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
        line.slice(2)
      ] }, index);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: line === "" ? "\xA0" : line }, index);
  });
}
var LAYOUT_STYLE = `
div[class*="frame"][style*="grid-template-columns"] > div[class*="centerCol"] { order: 3; }
div[class*="frame"][style*="grid-template-columns"] > div[class*="detailsCol"] { order: 2; }
div[class*="frame"][style*="grid-template-columns"][data-details-collapsed] > div[class*="centerCol"],
div[class*="frame"][style*="grid-template-columns"][data-details-collapsed] > div[class*="detailsCol"] { order: 0; }
div[class*="handle"][data-side="details"] { display: none !important; }
div[class*="frame"][style*="grid-template-columns"]:not([data-details-collapsed]) {
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
    background: active ? "var(--dsw-alias-brand-primary, #2563eb)" : "transparent",
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
  riskItem: { fontSize: "12px", lineHeight: 1.7, color: "#9a6700", margin: "2px 0" },
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
    background: active ? "var(--dsw-alias-brand-primary, #2563eb)" : "transparent",
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
  for (const item of indirect.slice(0, 20)) pushEdge(chainStart(item.reason), item.path, "#d97706", `ei-${item.path}`);
  for (const item of potential.slice(0, 16)) pushEdge(chainStart(item.reason), item.path, "#57606a", `ep-${item.path}`);
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
    const content = kind === "meta" || kind === "hunk" ? import_react2.default.createElement("span", { style: { color: "#0969da", fontWeight: 600 } }, line) : kind === "add" || kind === "del" ? import_react2.default.createElement("span", { style: { color: kind === "add" ? "#1a7f37" : "#cf222e", fontWeight: 600 } }, line[0]) : null;
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
              color: props.danger ? "#e11d48" : "#2563eb"
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
  const [detailLoading, setDetailLoading] = (0, import_react2.useState)(false);
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
  const post = async (path, body) => {
    const response = await fetch(path, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...body, sessionId: props.sessionId })
    });
    const data = await response.json();
    return { ok: response.ok, data: data ?? {} };
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
      setNarrative({ narrative: String(data["narrative"] ?? ""), cached: data["cached"] === true, generatedAt: data["generatedAt"] });
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
      await loadDetail(target, false);
    }
  };
  const loadDetail = async (target, force) => {
    setDetailLoading(true);
    try {
      const { ok, data } = await post("/project-control/api/commit-detail", { sha: target, force });
      if (!ok) {
        setDetails((previous) => ({
          ...previous,
          [target]: {
            sha: target,
            isWorking: target === "working",
            files: [],
            insertions: 0,
            deletions: 0,
            patchTruncated: false,
            patch: "",
            commit: null,
            analysis: { what: "AI \u89E3\u8BFB\u5931\u8D25\uFF1A" + String(data["error"] ?? "") + "\uFF08\u70B9\u300C\u91CD\u65B0\u751F\u6210\u300D\u53EF\u91CD\u8BD5\uFF09", logic: [], risks: [] }
          }
        }));
        return;
      }
      setDetails((previous) => ({ ...previous, [target]: data }));
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : String(error));
    } finally {
      setDetailLoading(false);
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
  (0, import_react2.useEffect)(() => {
    const saved = Number(localStorage.getItem("pc.chatWidth") ?? "");
    const apply2 = () => {
      const frame2 = document.querySelector('div[class*="frame"][style*="grid-template-columns"]');
      if (frame2 === null || frame2.style.getPropertyPriority("grid-template-columns") === "important") return;
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
    if (tab === "commits") void loadCommits();
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
              allTargets.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { minWidth: 0 }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { display: "block", fontSize: "12px", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: entry.label }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { display: "block", fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: entry.meta })
                    ] })
                  ]
                },
                entry.key
              )),
              filteredTargets.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("picker.noMatch") })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px", alignItems: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: t("picker.hint") }),
        detailLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#dcdcaa"), children: t("detail.aiLoading") })
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
        narrative !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, disabled: narrativeBusy, onClick: () => {
            void loadNarrative(true);
          }, children: t("cache.regenerate") })
        ] })
      ] }),
      narrativeError !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.empty, color: "#d1242f" }, children: narrativeError }),
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
            void loadDetail(target, true);
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
${d.analysis.logic}`, `\u3010\u98CE\u9669\u70B9\u3011
${d.analysis.risk}`].filter((block) => !block.endsWith("\u3011\n")).join("\n\n"),
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
                  content: [d.analysis.what, d.analysis.risk].filter((part) => part !== "").join("\n---\n")
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
        d === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("detail.aiLoading") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
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
            d.analysis.risks.map((risk, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.riskItem, children: [
              "\u26A0 ",
              risk
            ] }, i))
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.sectionTitle, marginTop: "10px" }, children: t("detail.files") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", { style: styles.table, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: d.files.map((file) => {
            const key = `${target}|${file.path}`;
            const patch = fileDiffs[key];
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: { ...styles.td, fontFamily: "monospace", fontSize: "11px", wordBreak: "break-all" }, children: file.path }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { style: { ...styles.td, color: "#1a7f37", whiteSpace: "nowrap" }, children: [
                  "+",
                  file.adds
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { style: { ...styles.td, color: "#cf222e", whiteSpace: "nowrap" }, children: [
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
          impact.keyChangePoints !== void 0 && impact.keyChangePoints.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: "11px", color: "#9a6700" }, children: [
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
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { ...styles.sectionTitle, display: "inline", marginInlineEnd: "6px", color: "#9a6700" }, children: t("impact.funcChange") }),
              entry.change
            ] }),
            entry.impact !== void 0 && entry.impact !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...styles.what, marginBottom: "6px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { ...styles.sectionTitle, display: "inline", marginInlineEnd: "6px", color: themeAwareText("#ce9178") }, children: t("impact.funcCallers") }),
              entry.impact
            ] }),
            entry.callers.map((caller, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...styles.logicStep, marginTop: "3px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "#d97706" }, children: "\u21B3" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontFamily: "monospace", fontSize: "11px", wordBreak: "break-all" }, children: [
                caller.file,
                ":",
                caller.line
              ] }),
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
        runDetail.run.error !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "11px", color: "#d1242f" }, children: runDetail.run.error.message }),
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
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "run", children: t("sched.typeRun") })
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
        (memoriesData?.behindCount ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "11px", color: "#d97706" }, children: t("memory.behind").replace("{n}", String(memoriesData?.behindCount ?? 0)) }),
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
            description !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.noteContent, ...long && !expanded ? styles.noteClamp : {} }, children: description }),
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
                      caller.file,
                      ":",
                      caller.line,
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
    )
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NsaWVudC9pbmRleC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvV29ya3NwYWNlRnJhbWUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIENsaWVudCBwbHVnaW4gZW50cnkgZm9yIGRzaC1wcm9qZWN0LWNvbnRyb2wuXG4gKlxuICogXHU1RTAzXHU1QzQwXHU2N0I2XHU2Nzg0XHVGRjA4XHU1REYyXHU5QThDXHU4QkMxXHVGRjBDMjAyNi0wOC0zMFx1RkYwOVx1RkYxQVxuICogLSBcdTVERTVcdTRGNUNcdTUzRjBcdTkwNkVcdTg1M0RcdTVCOThcdTY1QjkgYGRldGFpbHNgIFx1NjlGRFx1RkYwOHByaW9yaXR5IC0xMFx1RkYwQ1x1NUI5OFx1NjVCOSBEZXRhaWxzUGFuZWwgXHU3NTU5XHU1NzI4XHU4RDI2XHU2NzJDXHU0RTBBXHVGRjBDXG4gKiAgIFx1NTM3OFx1OEY3RFx1NjIxMVx1NEVFQ1x1NzY4NFx1NkNFOFx1NTE4Q1x1NTM3M1x1NjA2Mlx1NTkwRFx1RkYwOVx1RkYwQ1x1NkUzMlx1NjdEM1x1NTcyOFx1NEUzQlx1Njg0Nlx1NjdCNiBkZXRhaWxzIFx1NTIxN1x1RkYxQlxuICogLSBXb3Jrc3BhY2VGcmFtZSBcdTZDRThcdTUxNjVcdTY4MzdcdTVGMEZcdTg4NjhcdUZGMENcdTYyOEFcdTVCOThcdTY1QjlcdTdGNTFcdTY4M0NcdTg5QzZcdTg5QzlcdTYzNjJcdTUyMTdcdUZGMUFcdTgwNEFcdTU5MjlcdUZGMDhjZW50ZXJDb2xcdUZGMDlcdTY3MDBcdTUzRjNcdTMwMDFcbiAqICAgXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4ZGV0YWlsc0NvbFx1RkYwOVx1NUM0NVx1NEUyRCAxZnJcdUZGMUJcdTY1RTBcdTRGMUFcdThCRERcdTg0M0RcdTU3MzBcdTk4NzVcdUZGMDhkYXRhLWRldGFpbHMtY29sbGFwc2VkXHVGRjA5XG4gKiAgIFx1ODFFQVx1NTJBOFx1NjA2Mlx1NTkwRFx1NTM5Rlx1NzUxRlx1NTIxN1x1NUU4Rlx1RkYxQlxuICogLSBcdTVERTZcdTRGQTdcdTVCOThcdTY1QjlcdTVCRkNcdTgyMkFcdTMwMDFcdTVCOThcdTY1QjlcdTgwNEFcdTU5MjlcdTY3MkNcdTRGNTNcdTk2RjZcdTY1MzlcdTUyQThcdUZGMUJcbiAqIC0gXHU0RkE3XHU4RkI5XHU2ODBGXHU2MzA5XHU5NEFFXHU1NzI4XHUzMDBDXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1M0YwIFx1MjFDNCBcdTVCOThcdTY1QjlcdThCRTZcdTYwQzVcdTk3NjJcdTY3N0ZcdTMwMERcdTk1RjRcdTUyMDdcdTYzNjJcdUZGMDhcdTUzRUZcdTkwMDZcdUZGMDlcdUZGMUJcbiAqIC0gYHRvb2wuY2FsbC50b29sdmlld2AgXHU0RTNBIGFuYWx5emVfY2hhbmdlIFx1NEZERFx1NzU1OVx1NEUxM1x1NUM1RVx1NTM2MVx1NzI0N1x1RkYxQlxuICogLSBcdTY1ODdcdTY4NDhcdTUxNjhcdTkwRThcdTdFQ0YgY3R4LmxvY2FsZSBcdThCQ0RcdTUxNzhcdUZGMDh6aCAvIGVuXHVGRjA5XHUzMDAyXG4gKlxuICogQG1vZHVsZSBkc2gtY2xpZW50LXByb2plY3QtY29udHJvbFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IENoYW5nZUNhcmQgfSBmcm9tICcuL2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cydcbmltcG9ydCB7IFdPUktTUEFDRV9ESUNULCBXb3Jrc3BhY2VGcmFtZSB9IGZyb20gJy4vY29tcG9uZW50cy9Xb3Jrc3BhY2VGcmFtZS50c3gnXG5cbmNvbnN0IE5TID0gJ3Byb2plY3QtY29udHJvbCdcblxuZXhwb3J0IGNvbnN0IG5hbWUgPSAnY2xpZW50LXByb2plY3QtY29udHJvbCdcbmV4cG9ydCBjb25zdCBpbmplY3QgPSBbJ3Nsb3RzJywgJ2xvY2FsZScsICdsYXlvdXQnXVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoY3R4OiBhbnkpOiB2b2lkIHtcbiAgY3R4LmVmZmVjdCgoKSA9PiBjdHgubG9jYWxlLnJlZ2lzdGVyKE5TLCB7IHpoOiBXT1JLU1BBQ0VfRElDVC56aCwgZW46IFdPUktTUEFDRV9ESUNULmVuIH0pLCAncHJvamVjdC1jb250cm9sOiBkaWN0aW9uYXJpZXMnKVxuICBjb25zdCBsYXlvdXQgPSBjdHgubGF5b3V0XG5cbiAgLy8gXHUyNTAwXHUyNTAwIDEuIFx1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTNGMFx1RkYxQVx1OTA2RVx1ODUzRCBkZXRhaWxzIFx1NjlGRFx1RkYwOFx1NTNFRlx1OTAwNlx1RkYwOVx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAvLyBcdTY1QjBcdTdBOTdcdTUzRTNcdTlFRDhcdThCQTRcdTRFMERcdTY2M0VcdTc5M0FcdTVERTVcdTRGNUNcdTUzRjBcdUZGMDhcdTRGRERcdTYzMDFcdTVCOThcdTY1QjlcdTUzOUZcdTc1MUZcdTg5QzZcdTg5RDJcdUZGMDlcdUZGMENcdTc1MzFcdTRGQTdcdThGQjlcdTY4MEZcdTYzMDlcdTk0QUVcdTY2M0VcdTVGMEZcdTYyNTNcdTVGMDBcdTMwMDJcbiAgbGV0IHdvcmtzcGFjZUVuYWJsZWQgPSBmYWxzZVxuICBsZXQgZGlzcG9zZVdvcmtzcGFjZTogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkXG5cbiAgY29uc3QgcmVnaXN0ZXJXb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XG4gICAgZGlzcG9zZVdvcmtzcGFjZSA9IGN0eC5zbG90cy5yZWdpc3RlcihcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2RldGFpbHMnLFxuICAgICAgICBwcmlvcml0eTogLTEwLFxuICAgICAgICBsb2NhbGU6IE5TLFxuICAgICAgfSxcbiAgICAgIC8vIFx1NjMwMlx1OEY3RFx1NTM3M1x1NjI1M1x1NUYwMCBkZXRhaWxzIFx1OEY2OFx1OTA1M1x1RkYwOFx1OTc2Mlx1Njc3Rlx1NTA0Rlx1NTk3RFx1OUVEOFx1OEJBNCAwXHVGRjA5XHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwXHU5NzAwXHU4OTgxXHU3NzFGXHU1QjlFXHU1QkJEXHU1RUE2XHVGRjFCXG4gICAgICAvLyBcdTY1RTBcdTRGMUFcdThCRERcdTg0M0RcdTU3MzBcdTk4NzVcdThGNjhcdTkwNTNcdTYwNTIgMFx1RkYwQ1x1NTkyOVx1NzEzNlx1NEZERFx1NjMwMVx1NTM5Rlx1NzUxRlx1ODJGMVx1OTZDNFx1OTg3NVx1NUUwM1x1NUM0MFx1MzAwMlxuICAgICAgLy8gXHU0RjFBXHU4QkREXHU1MjA3XHU2MzYyXHU2NUY2XHU1Qjk4XHU2NUI5XHU0RjFBIGNsb3NlRGV0YWlscyBcdTIwMTRcdTIwMTQgXHU1RUY2XHU1NDBFXHU0RTAwXHU2MkNEXHU5MUNEXHU2NUIwXHU2NDkxXHU1RjAwXHVGRjA4XHU1QjhGXHU0RUZCXHU1MkExXHU2NjVBXHU0RThFXHU3MjM2XHU3RUE3IGVmZmVjdFx1RkYwOVx1MzAwMlxuICAgICAgKHByb3BzOiBhbnkpID0+IHtcbiAgICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICBsYXlvdXQ/Lm9wZW5EZXRhaWxzPy4oKVxuICAgICAgICB9LCBbXSlcbiAgICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICBpZiAocHJvcHMuc2Vzc2lvbklkID09PSB1bmRlZmluZWQpIHJldHVyblxuICAgICAgICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiBsYXlvdXQ/Lm9wZW5EZXRhaWxzPy4oKSwgMClcbiAgICAgICAgICByZXR1cm4gKCkgPT4geyBjbGVhclRpbWVvdXQodGltZXIpIH1cbiAgICAgICAgfSwgW3Byb3BzLnNlc3Npb25JZF0pXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFdvcmtzcGFjZUZyYW1lLCB7IC4uLnByb3BzLCBsYXlvdXQgfSlcbiAgICAgIH0sXG4gICAgKVxuICB9XG4gIGNvbnN0IHVucmVnaXN0ZXJXb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XG4gICAgZGlzcG9zZVdvcmtzcGFjZT8uKClcbiAgICBkaXNwb3NlV29ya3NwYWNlID0gdW5kZWZpbmVkXG4gIH1cblxuICBjdHguc2xvdHMuaW5qZWN0KCdkZXRhaWxzJywgKCkgPT4ge1xuICAgIGlmICh3b3Jrc3BhY2VFbmFibGVkKSByZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHVucmVnaXN0ZXJXb3Jrc3BhY2UoKVxuICAgIH1cbiAgfSlcblxuICAvLyBcdTI1MDBcdTI1MDAgMi4gXHU0RkE3XHU4RkI5XHU2ODBGXHU1RTk1XHU5MEU4XHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwIFx1MjFDNCBcdTVCOThcdTY1QjlcdThCRTZcdTYwQzUgXHU1MjA3XHU2MzYyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAvLyBcdTYzMDlcdTk0QUVcdTcyQjZcdTYwMDFcdTY2MEVcdTc5M0FcdUZGMUFcdTVERTVcdTRGNUNcdTUzRjBcdTY2M0VcdTc5M0FcdTRFMkQgXHUyMTkyIFx1MzAwQ1x1RDgzRVx1RERFRCBcdTVERTVcdTRGNUNcdTUzRjAgXHUyNzEzXHUzMDBEXHVGRjFCXHU1REYyXHU1MjA3XHU1Qjk4XHU2NUI5XHU4QkU2XHU2MEM1IFx1MjE5MiBcdTMwMENcdUQ4M0VcdURERUQgXHU2MjUzXHU1RjAwXHU1REU1XHU0RjVDXHU1M0YwXHUzMDBEXHU5QUQ4XHU0RUFFXHVGRjBDXG4gIC8vIFx1NzUyOFx1NjIzN1x1OTY4Rlx1NjVGNlx1NzcwQlx1NUY5N1x1NTIzMFx1NjAwRVx1NEU0OFx1NTIwN1x1NTZERVx1Njc2NVx1RkYwOFx1NTIwN1x1NjM2Mlx1N0VDRiB3aW5kb3cgXHU0RThCXHU0RUY2XHU5MDFBXHU3N0U1XHU2MzA5XHU5NEFFXHU5MUNEXHU2RTMyXHU2N0QzXHVGRjA5XHUzMDAyXG4gIGNvbnN0IFRPR0dMRV9FVkVOVCA9ICdwYy13b3Jrc3BhY2UtdG9nZ2xlJ1xuICBjb25zdCBmaXJlVG9nZ2xlID0gKGVuYWJsZWQ6IGJvb2xlYW4pOiB2b2lkID0+IHtcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoVE9HR0xFX0VWRU5ULCB7IGRldGFpbDogZW5hYmxlZCB9KSlcbiAgfVxuICBjdHguc2xvdHMuaW5qZWN0KCdzaWRlYmFyLmZvb3Rlci5hY3Rpb24nLCAoKSA9PiB7XG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XG4gICAgICBuYW1lOiAnc2lkZWJhci5mb290ZXIuYWN0aW9uJyxcbiAgICAgIGlkOiAncHJvamVjdC1jb250cm9sLXRvZ2dsZScsXG4gICAgfSwgKCkgPT4ge1xuICAgICAgY29uc3QgW2VuYWJsZWQsIHNldEVuYWJsZWRdID0gUmVhY3QudXNlU3RhdGUod29ya3NwYWNlRW5hYmxlZClcbiAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQ6IEV2ZW50KTogdm9pZCA9PiB7IHNldEVuYWJsZWQoKGV2ZW50IGFzIEN1c3RvbUV2ZW50PGJvb2xlYW4+KS5kZXRhaWwpIH1cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoVE9HR0xFX0VWRU5ULCBoYW5kbGVyKVxuICAgICAgICByZXR1cm4gKCkgPT4geyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpIH1cbiAgICAgIH0sIFtdKVxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdidXR0b24nLFxuICAgICAgICB7XG4gICAgICAgICAgJ2RhdGEtdGVzdGlkJzogJ3Byb2plY3QtY29udHJvbC1zaWRlYmFyLXRvZ2dsZScsXG4gICAgICAgICAgdGl0bGU6IGVuYWJsZWQgPyAnXHU1RjUzXHU1MjREXHU2NjNFXHU3OTNBXHU5ODc5XHU3NkVFXHU2ODM4XHU2N0U1XHU1M0YwXHUzMDAyXHU3MEI5XHU1MUZCXHU1M0VGXHU0RTM0XHU2NUY2XHU1MjA3XHU2MzYyXHU0RTNBXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHVGRjA4XHU2N0U1XHU3NzBCXHU1REU1XHU1MTc3XHU4QzAzXHU3NTI4XHU3Njg0XHU1QjhDXHU2NTc0XHU4RjkzXHU1MTY1L1x1OEY5M1x1NTFGQVx1RkYwOVx1RkYxQlx1NTE4RFx1NzBCOVx1NjcyQ1x1NjMwOVx1OTRBRVx1NTM3M1x1NjA2Mlx1NTkwRFx1MzAwMicgOiAnXHU1RjUzXHU1MjREXHU2NjNFXHU3OTNBXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHUzMDAyXHU3MEI5XHU1MUZCXHU2MDYyXHU1OTBEXHU5ODc5XHU3NkVFXHU2ODM4XHU2N0U1XHU1M0YwXHUzMDAyJyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnNnB4JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggMTBweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgY29sb3I6IGVuYWJsZWQgPyAnaW5oZXJpdCcgOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IGVuYWJsZWQgPyA0MDAgOiA2MDAsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJywgb3BhY2l0eTogMC45LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgd29ya3NwYWNlRW5hYmxlZCA9ICF3b3Jrc3BhY2VFbmFibGVkXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAod29ya3NwYWNlRW5hYmxlZCAmJiBkaXNwb3NlV29ya3NwYWNlID09PSB1bmRlZmluZWQpIHJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICAgICAgICAgICAgZWxzZSBpZiAoIXdvcmtzcGFjZUVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB1bnJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICAgICAgICAgICAgICAvLyBcdTY1MzZcdThENzdcdTUzRjNcdTRGQTdcdThGNjhcdTkwNTNcdUZGMUFcdTU0MjZcdTUyMTlcdTVCOThcdTY1QjkgRGV0YWlsc1BhbmVsIFx1OTg3Nlx1NTZERVx1Njc2NVx1RkYwQ1x1NkI4Qlx1NzU1OVx1N0E3QVx1NjAwMVx1OTc2Mlx1Njc3RlxuICAgICAgICAgICAgICAgIC8vIFx1RkYwOFx1MzAwQ1x1NzBCOVx1NTFGQlx1NkQ4OFx1NjA2Rlx1NkQ0MVx1NEUyRFx1NzY4NFx1NURFNVx1NTE3N1x1ODg0Q1x1NjdFNVx1NzcwQlx1OEJFNlx1NjBDNVx1MzAwRFx1RkYwOVx1MzAwMlxuICAgICAgICAgICAgICAgIGxheW91dD8uY2xvc2VEZXRhaWxzPy4oKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1twcm9qZWN0LWNvbnRyb2xdIHdvcmtzcGFjZSB0b2dnbGUgZmFpbGVkJywgZXJyb3IpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaXJlVG9nZ2xlKHdvcmtzcGFjZUVuYWJsZWQpXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgZW5hYmxlZCA/ICdcdUQ4M0VcdURERUQgXHU1REU1XHU0RjVDXHU1M0YwIFx1MjcxMycgOiAnXHVEODNFXHVEREVEIFx1NjI1M1x1NUYwMFx1NURFNVx1NEY1Q1x1NTNGMCcsXG4gICAgICApXG4gICAgfSlcbiAgfSlcblxuICAvLyBcdTI1MDBcdTI1MDAgMy4gXHU4MDRBXHU1OTI5XHU1REU1XHU1MTc3XHU1MzYxXHU3MjQ3XHVGRjA4XHU2MjY3XHU4ODRDL1x1OEJDNFx1NUJBMS9cdTlBOENcdTY1MzZcdUZGMDlcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgY29uc3Qgc2ltcGxlUmVzdWx0Q2FyZCA9ICh0aXRsZTogc3RyaW5nKTogKChwcm9wczogYW55KSA9PiBhbnkpID0+IChwcm9wczogYW55KSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gcHJvcHM/Lm91dHB1dFxuICAgIGNvbnN0IHRleHQgPSB0eXBlb2Ygb3V0cHV0ID09PSAnc3RyaW5nJ1xuICAgICAgPyBvdXRwdXRcbiAgICAgIDogb3V0cHV0Py5zdW1tYXJ5ID8/IG91dHB1dD8uaXNzdWVzID8/IG91dHB1dD8uZGV0YWlscyA/PyAob3V0cHV0ID8gSlNPTi5zdHJpbmdpZnkob3V0cHV0LCBudWxsLCAyKSA6ICdcdTYyNjdcdTg4NENcdTRFMkRcdTIwMjYnKVxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgJ2RpdicsXG4gICAgICB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgIHBhZGRpbmc6ICcxMHB4IDEycHgnLFxuICAgICAgICAgIG1hcmdpbjogJzRweCAwJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJyxcbiAgICAgICAgICBmb250U2l6ZTogJzEycHgnLFxuICAgICAgICAgIGxpbmVIZWlnaHQ6IDEuNixcbiAgICAgICAgICB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLFxuICAgICAgICAgIG1heEhlaWdodDogMjYwLFxuICAgICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICc0cHgnIH0gfSwgdGl0bGUpLFxuICAgICAgU3RyaW5nKHRleHQpLFxuICAgIClcbiAgfVxuXG4gIC8vIFx1MjUwMFx1MjUwMCAzLiBhbmFseXplX2NoYW5nZSBcdTRFMTNcdTVDNUVcdTVERTVcdTUxNzdcdTUzNjFcdTcyNDcgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gIGN0eC5zbG90cy5pbmplY3QoJ3Rvb2wuY2FsbC50b29sdmlldycsICgpID0+IHtcbiAgICByZXR1cm4gY3R4LnNsb3RzLnJlZ2lzdGVyKHtcbiAgICAgIG5hbWU6ICd0b29sLmNhbGwudG9vbHZpZXcnLFxuICAgICAga2V5OiAnYW5hbHl6ZV9jaGFuZ2UnLFxuICAgIH0sIChwcm9wczogYW55KSA9PiB7XG4gICAgICBpZiAocHJvcHM/LnRvb2xOYW1lICE9PSAnYW5hbHl6ZV9jaGFuZ2UnKSByZXR1cm4gbnVsbFxuICAgICAgY29uc3Qgb3V0cHV0ID0gcHJvcHM/Lm91dHB1dFxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ2hhbmdlQ2FyZCwge1xuICAgICAgICB0aXRsZTogJ1x1NTNEOFx1NjZGNFx1NTIwNlx1Njc5MFx1NjJBNVx1NTQ0QSAoQ2hhbmdlIEFuYWx5c2lzKScsXG4gICAgICAgIGZpbGVzQ2hhbmdlZDogb3V0cHV0Py5maWxlc0NoYW5nZWQgPz8gMCxcbiAgICAgICAgaW5zZXJ0aW9uczogb3V0cHV0Py5pbnNlcnRpb25zID8/IDAsXG4gICAgICAgIGRlbGV0aW9uczogb3V0cHV0Py5kZWxldGlvbnMgPz8gMCxcbiAgICAgICAgZXZpZGVuY2VJZDogb3V0cHV0Py5ldmlkZW5jZUlkLFxuICAgICAgICBzdGF0dXM6IG91dHB1dCA/ICdjb21wbGV0ZWQnIDogJ2FuYWx5emluZycsXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG5cbiAgZm9yIChjb25zdCBbdG9vbEtleSwgdGl0bGVdIG9mIFtcbiAgICBbJ3N0YXJ0X3J1bicsICdcdUQ4M0RcdURFODAgXHU2MjY3XHU4ODRDIFJ1biddLFxuICAgIFsncnVuX3JldmlldycsICdcdUQ4M0RcdUREMEQgXHU0RUUzXHU3ODAxXHU4QkM0XHU1QkExJ10sXG4gICAgWydydW5fdmVyaWZpY2F0aW9uJywgJ1x1MjcwNSBcdTlBOENcdTY1MzZcdTlBOENcdThCQzEnXSxcbiAgXSBhcyBjb25zdCkge1xuICAgIGN0eC5zbG90cy5pbmplY3QoJ3Rvb2wuY2FsbC50b29sdmlldycsICgpID0+IHtcbiAgICAgIHJldHVybiBjdHguc2xvdHMucmVnaXN0ZXIoeyBuYW1lOiAndG9vbC5jYWxsLnRvb2x2aWV3Jywga2V5OiB0b29sS2V5IH0sIHNpbXBsZVJlc3VsdENhcmQodGl0bGUpKVxuICAgIH0pXG4gIH1cbn1cbiIsICIvKipcclxuICogUmVhY3QgQ29tcG9uZW50OiBDaGFuZ2UgLyBJbnNpZ2h0IENhcmQgZm9yIENoYXQgVmlldy5cclxuICogUmVuZGVycyBzdHJ1Y3R1cmVkIGluc2lnaHRzLCBkaWZmIHN0YXRpc3RpY3MsIGFuZCBldmlkZW5jZSBiYWRnZXMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgZHNoLXByb2plY3QtY29udHJvbC9jbGllbnQvY29tcG9uZW50cy9DaGFuZ2VDYXJkXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VDYXJkUHJvcHMge1xyXG4gIHRpdGxlPzogc3RyaW5nXHJcbiAgZmlsZXNDaGFuZ2VkPzogbnVtYmVyXHJcbiAgaW5zZXJ0aW9ucz86IG51bWJlclxyXG4gIGRlbGV0aW9ucz86IG51bWJlclxyXG4gIGV2aWRlbmNlSWQ/OiBzdHJpbmdcclxuICBzdGF0dXM/OiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IENoYW5nZUNhcmQ6IFJlYWN0LkZDPENoYW5nZUNhcmRQcm9wcz4gPSAoe1xyXG4gIHRpdGxlID0gJ0NoYW5nZSBJbnNpZ2h0JyxcclxuICBmaWxlc0NoYW5nZWQgPSAwLFxyXG4gIGluc2VydGlvbnMgPSAwLFxyXG4gIGRlbGV0aW9ucyA9IDAsXHJcbiAgZXZpZGVuY2VJZCxcclxuICBzdGF0dXMgPSAnYW5hbHl6ZWQnLFxyXG59KSA9PiB7XHJcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAnZGl2JyxcclxuICAgIHtcclxuICAgICAgJ2RhdGEtdGVzdGlkJzogJ3Byb2plY3QtY29udHJvbC1jaGFuZ2UtY2FyZCcsXHJcbiAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzaC1ib3JkZXIsICMzMzMpJyxcclxuICAgICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxyXG4gICAgICAgIHBhZGRpbmc6ICcxMHB4IDE0cHgnLFxyXG4gICAgICAgIG1hcmdpbjogJzZweCAwJyxcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1kc2gtYmctc3VidGxlLCAjMWUxZTFlKScsXHJcbiAgICAgICAgY29sb3I6ICd2YXIoLS1kc2gtdGV4dCwgI2VlZSknLFxyXG4gICAgICAgIGZvbnRTaXplOiAnMTNweCcsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgJ2RpdicsXHJcbiAgICAgIHtcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBudWxsLCBgXHVEODNEXHVERDBEICR7dGl0bGV9YCksXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgJ3NwYW4nLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHggNnB4JyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tZHNoLWJhZGdlLWJnLCAjMmEyYTJhKScsXHJcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tZHNoLWJhZGdlLXRleHQsICNhYWEpJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGF0dXMsXHJcbiAgICAgICksXHJcbiAgICApLFxyXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgJ2RpdicsXHJcbiAgICAgIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxMnB4JywgZm9udFNpemU6ICcxMnB4Jywgb3BhY2l0eTogMC45IH0gfSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIG51bGwsIGBcdUQ4M0RcdURDQzEgJHtmaWxlc0NoYW5nZWR9IGZpbGVzYCksXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IHN0eWxlOiB7IGNvbG9yOiAnIzRlYzliMCcgfSB9LCBgKyR7aW5zZXJ0aW9uc31gKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6ICcjZjE0YzRjJyB9IH0sIGAtJHtkZWxldGlvbnN9YCksXHJcbiAgICAgIGV2aWRlbmNlSWRcclxuICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgICAgICdzcGFuJyxcclxuICAgICAgICAgICAgeyBzdHlsZTogeyBvcGFjaXR5OiAwLjcsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnIH0gfSxcclxuICAgICAgICAgICAgYFske2V2aWRlbmNlSWR9XWAsXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgOiBudWxsLFxyXG4gICAgKSxcclxuICApXHJcbn1cclxuIiwgIi8qKlxuICogUHJvamVjdCBDb250cm9sIFx1NURFNVx1NEY1Q1x1NTNGMFx1RkYwOFdvcmtzcGFjZUZyYW1lXHVGRjA5djJcdUZGMUFcdTU2RjRcdTdFRDVcIlx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVwiXHU3RUM0XHU3RUM3XHUzMDAyXG4gKlxuICogXHU1NkRCXHU0RTJBXHU5ODc1XHU3QjdFXHVGRjFBXG4gKiAxLiBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdUZGMDhcdTlFRDhcdThCQTRcdUZGMDlcdUZGMUFcdTRFRDNcdTVFOTNcdTY4MEZcdUZGMDhcdTU5MUFcdTRFRDNcdTVFOTNcdTUyMDdcdTYzNjJcdUZGMDkrIFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1RkYwOFx1NTQyQlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOStcbiAqICAgIFx1OEJFNlx1NjBDNVx1OTc2Mlx1Njc3Rlx1RkYwOEFJIFx1ODlFM1x1OEJGQlx1RkYxQVx1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OC9cdTVCOUVcdTczQjBcdTkwM0JcdThGOTEvXHU5OENFXHU5NjY5XHVGRjFCXHU0RTA5XHU3RUE3XHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0IFNWRyBcdTU2RkVcdUZGMUJcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdUZGMDlcdTMwMDJcbiAqIDIuIFx1OTg3OVx1NzZFRVx1NjAzQlx1ODlDOFx1RkYxQVx1OTg3OVx1NzZFRVx1Njg2M1x1Njg0OCArIFx1NUZFQlx1NjM3N1x1NjRDRFx1NEY1QyArIFx1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1RiArIFx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1MzAwMlxuICogMy4gXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHVGRjFBUnVuIFx1OEZEQlx1NUVBNlx1NEUwRVx1NjIxMFx1NjcyQ1x1MzAwMlxuICogNC4gXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHVGRjFBXHU2ODM4XHU2N0U1XHU3QjE0XHU4QkIwXHVGRjA4XHU1M0VGXHU1MTczXHU4MDU0XHU2M0QwXHU0RUE0XHVGRjA5KyBcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdUZGMDhcdTRFQkFcdTVERTVcdTc4NkVcdThCQTRcdUZGMDkrIFx1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNSArIFJldmlldy9cdTlBOENcdTY1MzZcdThCQjBcdTVGNTVcdTMwMDJcbiAqXG4gKiBcdTVFMDNcdTVDNDBcdTY3M0FcdTUyMzZcdTRFMERcdTUzRDhcdUZGMUFcdTkwNkVcdTg1M0RcdTVCOThcdTY1QjkgZGV0YWlscyBcdTY5RkQgKyBcdTZDRThcdTUxNjVcdTY4MzdcdTVGMEZcdTYzNjJcdTUyMTdcdUZGMDhcdTgwNEFcdTU5MjlcdTY3MDBcdTUzRjNcdUZGMDkrIFx1NTIwNlx1OTY5NFx1Njc2MVx1NjJENlx1NjJGRFx1OEJCMFx1NUZDNlx1RkYxQlxuICogXHU3RURGXHU4QkExXHU4ODRDXHU0RTI0XHU4ODRDXHU5NEIzXHU1MjM2XHU3NTMxXHU4RkQwXHU4ODRDXHU2NUY2XHU2MzA5XHU2Nzg0XHU1RUZBXHU1NEM4XHU1RTBDXHU3Q0JFXHU1MUM2XHU2Q0U4XHU1MTY1XHVGRjA4YXBwbHlTdGF0c0xpbmVDbGFtcFx1RkYwOVx1MzAwMlxuICpcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9Xb3Jrc3BhY2VGcmFtZVxuICovXG5cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5cbi8qKiBcdTVCQkZcdTRFM0IgL3N0YXRlIFx1OEZENFx1NTZERVx1NzY4NFx1NUZFQlx1NzE2N1x1NUY2Mlx1NzJCNlx1RkYwOFx1NEUwRSBhcGktcm91dGUudHMgYnVpbGRTdGF0ZSBcdTVCRjlcdTlGNTBcdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBpbnRlcmZhY2UgV29ya3NwYWNlU3RhdGUge1xuICByZWFkeT86IGJvb2xlYW5cbiAgcmVhc29uPzogc3RyaW5nXG4gIHBsdWdpblZlcnNpb24/OiBzdHJpbmdcbiAgcHJvamVjdD86IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyByb290UGF0aDogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxuICBjaGFuZ2VzPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBzb3VyY2U6IHN0cmluZzsgdXBkYXRlZEF0OiBudW1iZXIgfT5cbiAgcnVucz86IEFycmF5PHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IHN0YXJ0ZWRBdDogbnVtYmVyIHwgbnVsbDsgZmluaXNoZWRBdDogbnVtYmVyIHwgbnVsbDsgY29zdFVzZD86IG51bWJlcjsgc3RlcHNUb3RhbD86IG51bWJlcjsgc3RlcHNEb25lPzogbnVtYmVyOyBjdXJyZW50U3RlcD86IHN0cmluZyB8IG51bGwgfT5cbiAgYXR0ZW1wdHNDb3VudD86IG51bWJlclxuICBtZW1vcmllcz86IEFycmF5PHsgaWQ6IHN0cmluZzsgcHJvamVjdElkOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgdHJ1dGhMZXZlbDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb250ZW50Pzogc3RyaW5nOyBpc0h1bWFuQ29uZmlybWVkOiBib29sZWFuOyBnaXRCcmFuY2g6IHN0cmluZyB8IG51bGw7IGNyZWF0ZWRBdDogbnVtYmVyIH0+XG4gIGV2aWRlbmNlQ291bnQ/OiBudW1iZXJcbiAgcmVjZW50RXZpZGVuY2U/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHNvdXJjZTogc3RyaW5nOyB0cnV0aExldmVsOiBzdHJpbmc7IGxvY2F0b3I6IHN0cmluZzsgc25pcHBldDogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxuICByZXNvbHZlZElzc3VlUmV0ZW50aW9uRGF5cz86IG51bWJlclxuICBpbXBvcnRlZENoYW5nZXM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbW1pdENvdW50OiBudW1iZXI7IGZpcnN0Q29tbWl0QXQ6IG51bWJlcjsgbGFzdENvbW1pdEF0OiBudW1iZXI7IGNvbmZpZGVuY2U6IG51bWJlcjsgc3RhdHVzOiBzdHJpbmcgfT5cbiAgaXNzdWVzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBjaGFuZ2VJZDogc3RyaW5nOyBzZXZlcml0eTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZyB9PlxuICB2ZXJpZmljYXRpb25zPzogQXJyYXk8eyBpZDogc3RyaW5nOyBjaGFuZ2VJZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IGNyZWF0ZWRBdDogbnVtYmVyIH0+XG4gIGJvb3RzdHJhcD86IHsgaWQ6IHN0cmluZzsgc3VtbWFyeTogc3RyaW5nOyB0ZWNoU3RhY2s6IHN0cmluZ1tdOyBtYW5pZmVzdEZpbGVzOiBzdHJpbmdbXTsgc3ltYm9sc0NvdW50OiBudW1iZXI7IGNyZWF0ZWRBdDogbnVtYmVyIH0gfCBudWxsXG4gIGNvbmZpcm1lZD86IEFycmF5PHsgaWQ6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmc7IGZvcmJpZGRlblBhdGhzOiBzdHJpbmdbXSB9PlxuICBjb25jZXB0cz86IEFycmF5PHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nOyBvY2N1cnJlbmNlczogbnVtYmVyIH0+XG59XG5cbi8qKiBHRVQgL2NvbW1pdHMgXHU3Njg0XHU2M0QwXHU0RUE0XHU2NzYxXHU3NkVFXHUzMDAyICovXG5pbnRlcmZhY2UgQ29tbWl0RW50cnkge1xuICBzaGE6IHN0cmluZ1xuICBzaG9ydEhhc2g6IHN0cmluZ1xuICBhdXRob3I6IHN0cmluZ1xuICBkYXRlOiBudW1iZXJcbiAgc3ViamVjdDogc3RyaW5nXG4gIGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgYWRkczogbnVtYmVyOyBkZWxzOiBudW1iZXIgfT5cbn1cblxuaW50ZXJmYWNlIENvbW1pdHNQYXlsb2FkIHtcbiAgcm9vdFBhdGg6IHN0cmluZ1xuICBicmFuY2g6IHN0cmluZyB8IG51bGxcbiAgaGVhZFNoYTogc3RyaW5nIHwgbnVsbFxuICB3b3JraW5nOiB7IGZpbGVDb3VudDogbnVtYmVyOyBpc0NsZWFuOiBib29sZWFuOyBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nIH0+IH1cbiAgY29tbWl0czogQ29tbWl0RW50cnlbXVxufVxuXG5pbnRlcmZhY2UgQ29tbWl0RGV0YWlsUGF5bG9hZCB7XG4gIHNoYTogc3RyaW5nXG4gIGlzV29ya2luZzogYm9vbGVhblxuICBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IGFkZHM6IG51bWJlcjsgZGVsczogbnVtYmVyIH0+XG4gIGluc2VydGlvbnM6IG51bWJlclxuICBkZWxldGlvbnM6IG51bWJlclxuICBwYXRjaFRydW5jYXRlZDogYm9vbGVhblxuICBwYXRjaDogc3RyaW5nXG4gIGNvbW1pdDogeyBtZXNzYWdlOiBzdHJpbmc7IGF1dGhvcjogc3RyaW5nOyBkYXRlOiBudW1iZXIgfSB8IG51bGxcbiAgYW5hbHlzaXM6IHsgd2hhdDogc3RyaW5nOyBsb2dpYzogc3RyaW5nW107IHJpc2tzOiBzdHJpbmdbXSB9XG4gIGFuYWx5c2lzQ2FjaGVkPzogYm9vbGVhblxuICBhbmFseXNpc0dlbmVyYXRlZEF0PzogbnVtYmVyIHwgbnVsbFxufVxuXG5pbnRlcmZhY2UgSW1wYWN0U2NvcGVQYXlsb2FkIHtcbiAgY2hhbmdlZEZpbGVzOiBzdHJpbmdbXVxuICBzaGFzPzogc3RyaW5nW11cbiAgcmlza0xldmVsOiAnbG93JyB8ICdtZWRpdW0nIHwgJ2hpZ2gnIHwgJ2NyaXRpY2FsJ1xuICByaXNrU2NvcmU6IG51bWJlclxuICByaXNrRmFjdG9ycz86IEFycmF5PHsgdGV4dDogc3RyaW5nOyBwb2ludHM6IG51bWJlciB9PlxuICBrZXlDaGFuZ2VQb2ludHM/OiBzdHJpbmdbXVxuICBtZW1vcmllcz86IEFycmF5PHsgdGl0bGU6IHN0cmluZzsgdHlwZTogc3RyaW5nIH0+XG4gIGZ1bmN0aW9uSW1wYWN0PzogQXJyYXk8e1xuICAgIHN5bWJvbDogc3RyaW5nXG4gICAgZGVmaW5lZEluOiBzdHJpbmdcbiAgICByb2xlPzogc3RyaW5nXG4gICAgY2hhbmdlPzogc3RyaW5nXG4gICAgaW1wYWN0Pzogc3RyaW5nXG4gICAgY2FsbGVyczogQXJyYXk8eyBmaWxlOiBzdHJpbmc7IGxpbmU6IHN0cmluZzsgc25pcHBldDogc3RyaW5nIH0+XG4gIH0+XG4gIGxldmVsczogQXJyYXk8eyBsZXZlbDogc3RyaW5nOyBkZXB0aDogbnVtYmVyOyBwYXRoOiBzdHJpbmc7IGNvbmZpZGVuY2U6IG51bWJlcjsgcmVhc29uOiBzdHJpbmcgfT5cbiAgZGlyZWN0OiBzdHJpbmdbXVxuICBleHBsYW5hdGlvbnNDYWNoZWQ/OiBib29sZWFuXG4gIGdlbmVyYXRlZEF0PzogbnVtYmVyIHwgbnVsbFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJldmlld1BheWxvYWQge1xuICBpc3N1ZXNGb3VuZDogbnVtYmVyXG4gIGlzc3Vlczogc3RyaW5nXG4gIHZlcmRpY3Q6IHN0cmluZ1xuICBjYWNoZWQ/OiBib29sZWFuXG4gIGdlbmVyYXRlZEF0PzogbnVtYmVyIHwgbnVsbFxuICBpc3N1ZUxpc3Q/OiBBcnJheTx7IHNldmVyaXR5OiBzdHJpbmc7IGNhdGVnb3J5OiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGV2aWRlbmNlOiBzdHJpbmc7IGZpeDogc3RyaW5nIH0+XG59XG5cbmludGVyZmFjZSBOb3RlRW50cnkge1xuICBpZDogc3RyaW5nXG4gIHByb2plY3RJZDogc3RyaW5nXG4gIHNoYT86IHN0cmluZ1xuICB0aXRsZTogc3RyaW5nXG4gIGNvbnRlbnQ6IHN0cmluZ1xuICB0YWdzPzogc3RyaW5nW11cbiAgcGlubmVkPzogYm9vbGVhblxuICBjcmVhdGVkQXQ6IG51bWJlclxuICB1cGRhdGVkQXQ/OiBudW1iZXJcbn1cblxuLyoqIEdFVCAvaXNzdWVzIFx1NzY4NFx1OEJDNFx1NUJBMVx1OTVFRVx1OTg5OFx1Njc2MVx1NzZFRVx1RkYwOFJldmlldyBcdTk1RUVcdTk4OThcdTk4NzVcdTdCN0VcdTY1NzBcdTYzNkVcdTZFOTBcdUZGMDlcdTMwMDIgKi9cbmludGVyZmFjZSBJc3N1ZUVudHJ5IHtcbiAgaWQ6IHN0cmluZ1xuICBjaGFuZ2VJZDogc3RyaW5nXG4gIHNldmVyaXR5OiBzdHJpbmdcbiAgY2F0ZWdvcnk6IHN0cmluZ1xuICB0aXRsZTogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgc3RhdHVzOiBzdHJpbmdcbiAgcmVzb2x1dGlvbjogc3RyaW5nXG4gIGZpeFN0YXRzOiB7IGZpbGVzOiBudW1iZXI7IGluc2VydGlvbnM6IG51bWJlcjsgZGVsZXRpb25zOiBudW1iZXIgfSB8IG51bGxcbiAgZml4RmlsZXM6IHN0cmluZ1tdXG4gIGZpeEltcGFjdDogQXJyYXk8eyBzeW1ib2w6IHN0cmluZzsgZGVmaW5lZEluOiBzdHJpbmc7IGNhbGxlcnM6IEFycmF5PHsgZmlsZTogc3RyaW5nOyBsaW5lOiBzdHJpbmc7IHNuaXBwZXQ6IHN0cmluZyB9PiB9PlxuICBmaXhEaWZmOiBzdHJpbmdcbiAgY3JlYXRlZEF0OiBudW1iZXJcbiAgdXBkYXRlZEF0OiBudW1iZXJcbn1cblxuLyoqIFx1NEZFRVx1NTkwRFx1NURFRVx1NUYwMlx1NzY4NFx1ODg0Q1x1N0VBN1x1Nzc0MFx1ODI3Mlx1NkUzMlx1NjdEM1x1RkYxQSsgXHU3RUZGXHUzMDAxLSBcdTdFQTJcdTMwMDFcdTY1ODdcdTRFRjZcdTU5MzRcdTUyQTBcdTdDOTdcdTMwMDFcdTUxNzZcdTRGNTlcdTVGMzFcdTUzMTZcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlbmRlckRpZmZMaW5lcyhkaWZmOiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XG4gIGlmICh0eXBlb2YgZGlmZiAhPT0gJ3N0cmluZycgfHwgZGlmZiA9PT0gJycpIHJldHVybiBbXVxuICByZXR1cm4gZGlmZi5zcGxpdCgnXFxuJykuc2xpY2UoMCwgNDAwKS5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgY29uc3Qgc3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XG4gICAgICBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJyxcbiAgICAgIGZvbnRTaXplOiAnMTFweCcsIGxpbmVIZWlnaHQ6IDEuNiwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyxcbiAgICB9XG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnKysrJykgfHwgbGluZS5zdGFydHNXaXRoKCctLS0nKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJ2RpZmYgLS1naXQnKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJ0BAJykpIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJ1xuICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKCcrJykpIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gJyMxYTdmMzcnXG4gICAgICBzdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoNDYsMTYwLDY3LDAuMDgpJ1xuICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKCctJykpIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gJyNkMTI0MmYnXG4gICAgICBzdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoMjA5LDM2LDQ3LDAuMDgpJ1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5jb2xvciA9ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKSdcbiAgICB9XG4gICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3N0eWxlfT57bGluZSA9PT0gJycgPyAnXFx1MDBBMCcgOiBsaW5lfTwvZGl2PlxuICB9KVxufVxuXG4vKiogXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0XHU5ODc1XHU3Njg0XHU1M0VGXHU3RjE2XHU4RjkxXHU2QjY1XHU5QUE0XHVGRjA4L3J1bnMvc3RhcnQgXHU4RkQ0XHU1NkRFXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgUGxhbkNvbmZpcm1TdGVwIHtcbiAgaWQ6IHN0cmluZ1xuICB0aXRsZTogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgdGFyZ2V0RmlsZXM6IHN0cmluZ1tdXG4gIHJvbGU6IHN0cmluZ1xuICBhY2NlcHRhbmNlOiBzdHJpbmdcbiAgZmFpbHVyZVBvbGljeTogc3RyaW5nXG4gIGVuYWJsZWQ6IGJvb2xlYW5cbiAgbW9kZWxQcm92aWRlcjogc3RyaW5nXG4gIG1vZGVsSWQ6IHN0cmluZ1xufVxuXG4vKiogR0VUIC9ydW5zL2RldGFpbCBcdTc2ODRcdThGN0RcdTgzNzdcdTMwMDIgKi9cbmludGVyZmFjZSBSdW5EZXRhaWwge1xuICBydW46IHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgY2hhbmdlVGl0bGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IHBhdXNlUG9pbnQ6IHsgc3RlcElkOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nOyBhdDogbnVtYmVyIH0gfCBudWxsOyBlcnJvcjogeyBtZXNzYWdlOiBzdHJpbmcgfSB8IG51bGw7IHN0YXJ0ZWRBdDogbnVtYmVyIHwgbnVsbDsgZmluaXNoZWRBdDogbnVtYmVyIHwgbnVsbCB9XG4gIHN0ZXBzOiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHJvbGU6IHN0cmluZzsgbW9kZWw6IHN0cmluZyB8IG51bGw7IHN0YXR1czogc3RyaW5nOyBhdHRlbXB0c0NvdW50OiBudW1iZXI7IGNsYWltZWRPdXRjb21lOiBzdHJpbmcgfCBudWxsOyB2ZXJpZmllZDogYm9vbGVhbjsgY29zdFVzZDogbnVtYmVyIH0+XG4gIGNvbnRleHQ6IHtcbiAgICBwcm9qZWN0RGlnZXN0OiBzdHJpbmc7IGJyYW5jaDogc3RyaW5nIHwgbnVsbDsgaGVhZFNoYTogc3RyaW5nIHwgbnVsbFxuICAgIGluamVjdGVkTWVtb3JpZXM6IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZyB9PlxuICAgIHN0ZXBTdW1tYXJpZXM6IEFycmF5PHsgc3RlcFRpdGxlOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgY2hhbmdlZEZpbGVzOiBzdHJpbmdbXTsgYXQ6IG51bWJlciB9PlxuICAgIGRlY2lzaW9uTG9nOiBBcnJheTx7IGtpbmQ6IHN0cmluZzsgZGV0YWlsOiBzdHJpbmc7IGF0OiBudW1iZXIgfT5cbiAgfSB8IG51bGxcbn1cblxuLyoqIEdFVCAvc2NoZWR1bGVkIFx1NzY4NFx1NEVGQlx1NTJBMVx1Njc2MVx1NzZFRVx1MzAwMiAqL1xuaW50ZXJmYWNlIFNjaGVkdWxlZFRhc2tFbnRyeSB7XG4gIGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nXG4gIGludGVydmFsTWludXRlczogbnVtYmVyOyBlbmFibGVkOiBib29sZWFuOyBsYXN0UnVuQXQ6IG51bWJlciB8IG51bGw7IGxhc3RSZXN1bHQ6IHN0cmluZzsgbmV4dER1ZUF0OiBudW1iZXJcbn1cblxuLyoqIEdFVCAvbWVtb3JpZXMgXHU3Njg0XHU4QkIwXHU1RkM2XHU2NzYxXHU3NkVFXHVGRjA4XHU4QkIwXHU1RkM2XHU5NzYyXHU2NzdGXHU2NTcwXHU2MzZFXHU2RTkwXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgTWVtb3J5RW50cnkge1xuICBpZDogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZzsgcmVsYXRlZEZpbGVzOiBzdHJpbmdbXVxuICBpc0h1bWFuQ29uZmlybWVkOiBib29sZWFuOyBnaXRCcmFuY2g6IHN0cmluZyB8IG51bGw7IHNjb3BlOiBzdHJpbmc7IHNvdXJjZVRhZzogc3RyaW5nXG4gIGJhc2lzU2hhOiBzdHJpbmcgfCBudWxsOyBzdGF0dXM6IHN0cmluZzsgbGFzdFZlcmlmaWVkU2hhOiBzdHJpbmcgfCBudWxsXG4gIGNyZWF0ZWRBdDogbnVtYmVyOyB1cGRhdGVkQXQ6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgTWVtb3JpZXNQYXlsb2FkIHtcbiAgbWVtb3JpZXM6IE1lbW9yeUVudHJ5W11cbiAgYnJhbmNoOiBzdHJpbmcgfCBudWxsXG4gIGhlYWRTaGE6IHN0cmluZyB8IG51bGxcbiAgYmFzZWxpbmU6IHsgc2hhOiBzdHJpbmcgfCBudWxsOyB1cGRhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxuICBiZWhpbmRDb3VudDogbnVtYmVyXG59XG5cbi8qKiBQT1NUIC9tZW1vcnkvc3luYyBcdTc2ODRcdTU0MENcdTZCNjVcdTYyQTVcdTU0NEFcdTMwMDIgKi9cbmludGVyZmFjZSBTeW5jUmVwb3J0IHtcbiAgb2s6IGJvb2xlYW5cbiAgZXJyb3I/OiBzdHJpbmdcbiAgYmVoaW5kQ291bnQ/OiBudW1iZXJcbiAgc3RhbGVQcm9wb3NhbHM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0+XG4gIHJlbmV3ZWQ/OiBudW1iZXJcbiAgbmV3Q2FuZGlkYXRlcz86IEFycmF5PHsgdHlwZTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmcgfT5cbiAgdmVyZGljdD86IHN0cmluZ1xufVxuXG4vKiogXHU4QkM0XHU1QkExXHU5NUVFXHU5ODk4XHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IElTU1VFX1NUQVRVU19MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIG9wZW46ICdcdTVGODVcdTU5MDRcdTc0MDYnLFxuICBmaXhpbmc6ICdcdTRGRUVcdTU5MERcdTRFMkQnLFxuICByZXNvbHZlZDogJ1x1NURGMlx1ODlFM1x1NTFCMycsXG4gIGFjY2VwdGVkOiAnXHU1REYyXHU2M0E1XHU1M0Q3JyxcbiAgcmVqZWN0ZWQ6ICdcdTVERjJcdTYyRDJcdTdFREQnLFxufVxuXG4vKiogXHU4QkIwXHU1RkM2XHU3QzdCXHU1NzhCIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IE1FTU9SWV9UWVBFX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgYXJjaGl0ZWN0dXJlX2RlY2lzaW9uOiAnXHU2N0I2XHU2Nzg0XHU1MUIzXHU3QjU2JywgcGF0dGVybl9ydWxlOiAnXHU2QTIxXHU1RjBGXHU4OUM0XHU1MjE5Jywgcmlza19ob3RzcG90OiAnXHU5OENFXHU5NjY5XHU3MEVEXHU3MEI5JyxcbiAgbGVhcm5lZF9jb25jZXB0OiAnXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1JywgdXNlcl9wcm9maWxlOiAnXHU3NTI4XHU2MjM3XHU1MDRGXHU1OTdEJywgcHJvamVjdF9sb2c6ICdcdTk4NzlcdTc2RUVcdTY1RTVcdTVGRDcnLCBkYWlseV9sb2c6ICdcdTY1RTVcdTVGRDcnLFxufVxuXG4vKiogXHU4QkIwXHU1RkM2XHU2NzY1XHU2RTkwIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IE1FTU9SWV9TT1VSQ0VfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBydW46ICdcdTYyNjdcdTg4NENcdTYzRDBcdTcwQkMnLCByZXZpZXc6ICdcdTY4MzhcdTY3RTVcdTZDODlcdTZEQzAnLCBzeW5jOiAnXHU2MkM5XHU1M0Q2XHU1NDBDXHU2QjY1JywgY2hhdDogJ0FJIFx1OEJCMFx1NUY1NScsIG1hbnVhbDogJ1x1NjI0Qlx1NTJBOCcsXG59XG5cbi8qKiBcdTdGMTZcdTYzOTJcdTg5RDJcdTgyNzIgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xuY29uc3QgUk9MRV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIGFuYWx5c2lzOiAnXHU1MjA2XHU2NzkwJywgcGxhbm5pbmc6ICdcdTg5QzRcdTUyMTInLCBjb2Rpbmc6ICdcdTVGMDBcdTUzRDEnLCBvcHM6ICdcdTdCODBcdTUzNTVcdTY0Q0RcdTRGNUMnLCB2ZXJpZmljYXRpb246ICdcdTlBOENcdTY1MzYnLFxufVxuXG4vKiogXHU2QjY1XHU5QUE0XHU1OTMxXHU4RDI1XHU3QjU2XHU3NTY1IFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFBPTElDWV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICdyZXRyeS1lc2NhbGF0ZSc6ICdcdTkxQ0RcdThCRDVcdTVFNzZcdTUzNDdcdTdFQTdcdTZBMjFcdTU3OEInLCAncmV0cnktZmFsbGJhY2snOiAnXHU5MUNEXHU4QkQ1Jywgc2tpcDogJ1x1NTkzMVx1OEQyNVx1NTIxOVx1OERGM1x1OEZDNycsIGFzazogJ1x1NTkzMVx1OEQyNVx1NTIxOVx1NjY4Mlx1NTA1Q1x1OTVFRVx1NEVCQScsXG59XG5cbi8qKiBSdW4gXHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFJVTl9TVEFUVVNfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBxdWV1ZWQ6ICdcdTYzOTJcdTk2MUZcdTRFMkQnLCBydW5uaW5nOiAnXHU4RkQwXHU4ODRDXHU0RTJEJywgcGF1c2VkOiAnXHU1REYyXHU2NjgyXHU1MDVDJywgYmxvY2tlZDogJ1x1OTYzQlx1NTg1RScsIHJldHJ5aW5nOiAnXHU5MUNEXHU4QkQ1XHU0RTJEJyxcbiAgdmVyaWZ5aW5nOiAnXHU2NTM2XHU1QzNFXHU5QThDXHU2NTM2XHU0RTJEJywgc3VjY2VlZGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgY29tcGxldGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgZmFpbGVkOiAnXHU1OTMxXHU4RDI1JywgY2FuY2VsbGVkOiAnXHU1REYyXHU1M0Q2XHU2RDg4JywgaW50ZXJydXB0ZWQ6ICdcdTVERjJcdTRFMkRcdTY1QUQnLFxufVxuXG4vKiogXHU2QjY1XHU5QUE0XHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFNURVBfU1RBVFVTX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgcGVuZGluZzogJ1x1NUY4NVx1NjI2N1x1ODg0QycsIHJlYWR5OiAnXHU1QzMxXHU3RUVBJywgcnVubmluZzogJ1x1NjI2N1x1ODg0Q1x1NEUyRCcsIHBhdXNlZDogJ1x1NjY4Mlx1NTA1QycsIHJldHJ5aW5nOiAnXHU5MUNEXHU4QkQ1XHU0RTJEJyxcbiAgc3VjY2VlZGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgZmFpbGVkOiAnXHU1OTMxXHU4RDI1Jywgc2tpcHBlZDogJ1x1NURGMlx1OERGM1x1OEZDNycsIGJsb2NrZWQ6ICdcdTk2M0JcdTU4NUUnLCBjYW5jZWxsZWQ6ICdcdTVERjJcdTUzRDZcdTZEODgnLCBpbnRlcnJ1cHRlZDogJ1x1NURGMlx1NEUyRFx1NjVBRCcsXG59XG5cbi8qKiBcdThCQzRcdTVCQTFcdTk1RUVcdTk4OThcdTRFMjVcdTkxQ0RcdTVFQTYgXHUyMTkyIFx1NUZCRFx1N0FFMFx1NUU5NVx1ODI3Mlx1MzAwMiAqL1xuZnVuY3Rpb24gc2V2ZXJpdHlDb2xvcihzZXZlcml0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IHNldmVyaXR5ID09PSAnYmxvY2tlcicpIHJldHVybiAnI2NlOTE3OCdcbiAgaWYgKHNldmVyaXR5ID09PSAnbWFqb3InKSByZXR1cm4gJyNkN2JhN2QnXG4gIGlmIChzZXZlcml0eSA9PT0gJ2luZm8nKSByZXR1cm4gJyM2YjhiOGInXG4gIHJldHVybiAnIzU2OWNkNidcbn1cblxuLyoqIFx1NEUyNVx1OTFDRFx1NUVBNlx1NUY1Mlx1NEUwMFx1RkYwOFx1NTE3Q1x1NUJCOVx1NTM4Nlx1NTNGMlx1OEJCMFx1NUY1NVx1OTFDQ1x1NzY4NCBoaWdoL21lZGl1bS9sb3dcdUZGMUJcdTY3MkFcdTc3RTVcdTU2REVcdTg0M0QgbWlub3JcdUZGMDlcdUZGMENcdTdFREZcdThCQTEvXHU3QjVCXHU5MDA5L1x1Nzc0MFx1ODI3Mlx1NTE3MVx1NzUyOFx1MzAwMiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplSXNzdWVTZXZlcml0eShzZXZlcml0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHNldmVyaXR5ID09PSAnaGlnaCcpIHJldHVybiAnbWFqb3InXG4gIGlmIChzZXZlcml0eSA9PT0gJ21lZGl1bScgfHwgc2V2ZXJpdHkgPT09ICdsb3cnKSByZXR1cm4gJ21pbm9yJ1xuICByZXR1cm4gc2V2ZXJpdHkgPT09ICdibG9ja2VyJyB8fCBzZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBzZXZlcml0eSA9PT0gJ21ham9yJyB8fCBzZXZlcml0eSA9PT0gJ21pbm9yJyB8fCBzZXZlcml0eSA9PT0gJ2luZm8nXG4gICAgPyBzZXZlcml0eSA6ICdtaW5vcidcbn1cblxuLyoqIFx1ODlFM1x1Njc5MCAjcnJnZ2JiIFx1NjIxNiByZ2IoKS9yZ2JhKCkgXHU5ODlDXHU4MjcyXHU1MjREXHU0RTA5XHU0RTJBXHU1MjA2XHU5MUNGXHU0RTNBIFtyLCBnLCBiXVx1RkYxQlx1NjVFMFx1NkNENVx1ODlFM1x1Njc5MFx1OEZENFx1NTZERSBudWxsXHUzMDAyICovXG5mdW5jdGlvbiBwYXJzZUNvbG9yKGNvbG9yOiBzdHJpbmcpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gfCBudWxsIHtcbiAgY29uc3QgaGV4ID0gL14jKFswLTlhLWZdezZ9KSQvaS5leGVjKGNvbG9yKVxuICBpZiAoaGV4ICE9PSBudWxsKSB7XG4gICAgY29uc3QgdmFsdWUgPSBOdW1iZXIucGFyc2VJbnQoaGV4WzFdISwgMTYpXG4gICAgcmV0dXJuIFsodmFsdWUgPj4gMTYpICYgMjU1LCAodmFsdWUgPj4gOCkgJiAyNTUsIHZhbHVlICYgMjU1XVxuICB9XG4gIGNvbnN0IGZ1bmN0aW9uYWwgPSAvXnJnYmE/XFwoXFxzKihcXGR7MSwzfSlbLFxcc10rKFxcZHsxLDN9KVssXFxzXSsoXFxkezEsM30pL2kuZXhlYyhjb2xvcilcbiAgaWYgKGZ1bmN0aW9uYWwgIT09IG51bGwpIHtcbiAgICByZXR1cm4gW051bWJlcihmdW5jdGlvbmFsWzFdKSwgTnVtYmVyKGZ1bmN0aW9uYWxbMl0pLCBOdW1iZXIoZnVuY3Rpb25hbFszXSldXG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuLyoqIFdDQUcgXHU3NkY4XHU1QkY5XHU0RUFFXHU1RUE2XHVGRjA4MD1cdTlFRDFcdUZGMEMxPVx1NzY3RFx1RkYwOVx1MzAwMiAqL1xuZnVuY3Rpb24gcmVsYXRpdmVMdW1pbmFuY2UocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IGNoYW5uZWwgPSAodmFsdWU6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdiA9IHZhbHVlIC8gMjU1XG4gICAgcmV0dXJuIHYgPD0gMC4wMzkyOCA/IHYgLyAxMi45MiA6ICgodiArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjRcbiAgfVxuICByZXR1cm4gMC4yMTI2ICogY2hhbm5lbChyKSArIDAuNzE1MiAqIGNoYW5uZWwoZykgKyAwLjA3MjIgKiBjaGFubmVsKGIpXG59XG5cbi8qKiBcdTZERjFcdTUzMTZcdTk4OUNcdTgyNzJcdTc2RjRcdTUyMzBcdTc2N0RcdTVFOTVcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgIzFmMjMyOCBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZnVuY3Rpb24gZGFya2VuRm9yV2hpdGVCYWNrZ3JvdW5kKHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIpOiBzdHJpbmcge1xuICBsZXQgcmVkID0gclxuICBsZXQgZ3JlZW4gPSBnXG4gIGxldCBibHVlID0gYlxuICBmb3IgKGxldCBzdGVwID0gMDsgc3RlcCA8IDEyICYmIHJlbGF0aXZlTHVtaW5hbmNlKHJlZCwgZ3JlZW4sIGJsdWUpID4gMC4xODM7IHN0ZXAgKz0gMSkge1xuICAgIHJlZCA9IE1hdGgucm91bmQocmVkICogMC44ICsgMHgxZiAqIDAuMilcbiAgICBncmVlbiA9IE1hdGgucm91bmQoZ3JlZW4gKiAwLjggKyAweDIzICogMC4yKVxuICAgIGJsdWUgPSBNYXRoLnJvdW5kKGJsdWUgKiAwLjggKyAweDI4ICogMC4yKVxuICB9XG4gIHJldHVybiBgcmdiKCR7cmVkfSwgJHtncmVlbn0sICR7Ymx1ZX0pYFxufVxuXG4vKiogXHU2M0QwXHU0RUFFXHU5ODlDXHU4MjcyXHU3NkY0XHU1MjMwXHU2REYxXHU1RTk1XHVGRjA4IzE1MTUxN1x1RkYwOVx1NUJGOVx1NkJENFx1NUVBNiBcdTIyNjU0LjU6MVx1RkYwOFx1NkJDRlx1NkI2NVx1NTQxMSAjZjBmNmZjIFx1NkRGN1x1NTQwOCAyMCVcdUZGMENcdTgxRjNcdTU5MUEgMTIgXHU2QjY1XHVGRjA5XHUzMDAyICovXG5mdW5jdGlvbiBsaWdodGVuRm9yRGFya0JhY2tncm91bmQocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IHN0cmluZyB7XG4gIGxldCByZWQgPSByXG4gIGxldCBncmVlbiA9IGdcbiAgbGV0IGJsdWUgPSBiXG4gIGZvciAobGV0IHN0ZXAgPSAwOyBzdGVwIDwgMTIgJiYgcmVsYXRpdmVMdW1pbmFuY2UocmVkLCBncmVlbiwgYmx1ZSkgPCAwLjIxNDsgc3RlcCArPSAxKSB7XG4gICAgcmVkID0gTWF0aC5yb3VuZChyZWQgKiAwLjggKyAweGYwICogMC4yKVxuICAgIGdyZWVuID0gTWF0aC5yb3VuZChncmVlbiAqIDAuOCArIDB4ZjYgKiAwLjIpXG4gICAgYmx1ZSA9IE1hdGgucm91bmQoYmx1ZSAqIDAuOCArIDB4ZmMgKiAwLjIpXG4gIH1cbiAgcmV0dXJuIGByZ2IoJHtyZWR9LCAke2dyZWVufSwgJHtibHVlfSlgXG59XG5cbi8qKlxuICogXHU0RTNCXHU5ODk4XHU4MUVBXHU5MDAyXHU1RTk0XHU2NTg3XHU1QjU3XHU4MjcyXHVGRjFBXHU2RDQ1XHU4MjcyXHU0RTNCXHU5ODk4XHU2REYxXHU1MzE2XHU1MjMwXHU3NjdEXHU1RTk1IFx1MjI2NTQuNToxXHVGRjFCXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2M0QwXHU0RUFFXHU1MjMwXHU2REYxXHU1RTk1IFx1MjI2NTQuNToxXG4gKiBcdUZGMDhcdTZERjFcdTgyNzJcdTVCNTdcdTU5ODIgIzU3NjA2YSBcdTc2RjRcdTYzQTVcdTY1M0VcdTZERjFcdTVFOTVcdTU0MENcdTY4MzdcdTRFMERcdTUzRUZcdThCRkJcdUZGMDlcdTMwMDJcdTYyNDBcdTY3MDlcdTVGM0FcdThDMDNcdTgyNzJcdTY1ODdcdTY3MkNcdTdFREZcdTRFMDBcdThENzBcdThGRDlcdTkxQ0NcdTMwMDJcbiAqL1xuZnVuY3Rpb24gdGhlbWVBd2FyZVRleHQoY29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJnYiA9IHBhcnNlQ29sb3IoY29sb3IpXG4gIGlmIChyZ2IgPT09IG51bGwpIHJldHVybiBjb2xvclxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5ib2R5Py5oYXNBdHRyaWJ1dGU/LignZGF0YS1kcy1kYXJrLXRoZW1lJykgPT09IHRydWUpIHtcbiAgICByZXR1cm4gbGlnaHRlbkZvckRhcmtCYWNrZ3JvdW5kKHJnYlswXSwgcmdiWzFdLCByZ2JbMl0pXG4gIH1cbiAgcmV0dXJuIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyZ2JbMF0sIHJnYlsxXSwgcmdiWzJdKVxufVxuXG4vKiogXHU4QkM0XHU1QkExXHU3NkVFXHU2ODA3XHVGRjA4Y2hhbmdlSWRcdUZGMDlcdTIxOTIgXHU1M0VGXHU4QkZCXHU2ODA3XHU3QjdFXHVGRjFBXHU1NDA4XHU2MjEwIHJldmlldzo8c2hhPiBcdTYzMDdcdTU0MTFcdTYzRDBcdTRFQTRcdUZGMENjaGdfKiBcdTYzMDdcdTU0MTFcdTUzRDhcdTY2RjRcdUZGMENhZGhvYyBcdTRFM0FcdTVERTVcdTRGNUNcdTUzM0FcdTMwMDIgKi9cbmZ1bmN0aW9uIGlzc3VlVGFyZ2V0TGFiZWwoY2hhbmdlSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGlkID0gdHlwZW9mIGNoYW5nZUlkID09PSAnc3RyaW5nJyA/IGNoYW5nZUlkIDogJydcbiAgaWYgKGlkLnN0YXJ0c1dpdGgoJ3JldmlldzonKSkgcmV0dXJuIGBcdTYzRDBcdTRFQTQgJHtpZC5zbGljZSg3LCAxNSl9YFxuICBpZiAoaWQgPT09ICdhZGhvYycpIHJldHVybiAnXHU1REU1XHU0RjVDXHU1MzNBJ1xuICByZXR1cm4gYFx1NTNEOFx1NjZGNCAke2lkLnNsaWNlKDAsIDExKX1gXG59XG5cbi8qKiBcdTYwM0JcdTdFRDMvXHU3RUQzXHU2Nzg0XHU1MzE2XHU3QjE0XHU4QkIwXHU3Njg0XHU4RjdCXHU5MUNGIE1hcmtkb3duIFx1NkUzMlx1NjdEM1x1RkYxQVx1MzAwQyMjIFx1MzAwRFx1ODI4Mlx1NjgwN1x1OTg5OFx1Nzc0MFx1ODI3Mlx1NTJBMFx1N0M5N1x1RkYwQ1x1MzAwQy0gXHUzMDBEXHU1MjE3XHU4ODY4XHU1MkEwXHU1NzA2XHU3MEI5XHVGRjBDXHU1MTc2XHU0RjU5XHU1MzlGXHU2ODM3XHUzMDAyICovXG5mdW5jdGlvbiByZW5kZXJTdHJ1Y3R1cmVkQ29udGVudChjb250ZW50OiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XG4gIGlmICh0eXBlb2YgY29udGVudCAhPT0gJ3N0cmluZycgfHwgY29udGVudCA9PT0gJycpIHJldHVybiBbXVxuICByZXR1cm4gY29udGVudC5zcGxpdCgnXFxuJykubWFwKChsaW5lLCBpbmRleCkgPT4ge1xuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJyMjICcpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGtleT17aW5kZXh9IHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCwgZm9udFNpemU6ICcxMi41cHgnLCBtYXJnaW5Ub3A6IGluZGV4ID09PSAwID8gMCA6IDEwLCBtYXJnaW5Cb3R0b206IDIsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT5cbiAgICAgICAgICB7bGluZS5zbGljZSgzKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJy0gJykpIHtcbiAgICAgIHJldHVybiA8ZGl2IGtleT17aW5kZXh9IHN0eWxlPXt7IHBhZGRpbmdMZWZ0OiAxNCwgdGV4dEluZGVudDogLTEwIH19Plx1MjAyMiB7bGluZS5zbGljZSgyKX08L2Rpdj5cbiAgICB9XG4gICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0+e2xpbmUgPT09ICcnID8gJ1xcdTAwQTAnIDogbGluZX08L2Rpdj5cbiAgfSlcbn1cblxuLyoqXG4gKiBcdTg5QzZcdTg5QzlcdTYzNjJcdTUyMTdcdTY4MzdcdTVGMEZcdTg4NjhcdUZGMUFcdTk2OEZcdTY3MkNcdTdFQzRcdTRFRjZcdTYzMDJcdThGN0QvXHU1Mzc4XHU4RjdEXHVGRjA4XHU1Mzc4XHU4RjdEXHU1MzczXHU1QjhDXHU1MTY4XHU2MDYyXHU1OTBEXHU1MzlGXHU3NTFGXHU1RTAzXHU1QzQwXHVGRjA5XHUzMDAyXG4gKiBcdTZDRThcdTYxMEZcdUZGMUFcdTc5ODFcdTZCNjJcdTc1MjggOmhhcygpIFx1NTA1QVx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1MjAxNFx1MjAxNFx1NUI5OFx1NjVCOVx1Njc4NFx1NUVGQVx1NEVBN1x1NzI2OVx1NTFFMFx1NTM0MVx1NEUyQVx1N0VDNFx1NEVGNlx1NjgzOVx1N0M3Qlx1OTBGRFx1NTNFQiByb290XHVGRjBDXG4gKiBcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdTRGMUFcdTYyOEFcdTY1NzRcdTRFMkFcdTgwNEFcdTU5MjlcdTVCQjlcdTU2NjhcdThCRUZcdTk0QjNcdTUyMzZcdUZGMDhcdTUzODZcdTUzRjJcdTRFOEJcdTY1NDVcdUZGMDlcdTMwMDJcdTZCNjRcdTg4NjhcdTUzRUFcdTRGRERcdTc1NTlcdTdGNTFcdTY4M0NcdTYzNjJcdTUyMTdcdTRFMEVcdTYyRDZcdTYyRkRcdTY3QzRcdTk2OTBcdTg1Q0ZcdTMwMDJcbiAqL1xuY29uc3QgTEFZT1VUX1NUWUxFID0gYFxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA+IGRpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0geyBvcmRlcjogMzsgfVxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA+IGRpdltjbGFzcyo9XCJkZXRhaWxzQ29sXCJdIHsgb3JkZXI6IDI7IH1cbmRpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl1bZGF0YS1kZXRhaWxzLWNvbGxhcHNlZF0gPiBkaXZbY2xhc3MqPVwiY2VudGVyQ29sXCJdLFxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXVtkYXRhLWRldGFpbHMtY29sbGFwc2VkXSA+IGRpdltjbGFzcyo9XCJkZXRhaWxzQ29sXCJdIHsgb3JkZXI6IDA7IH1cbmRpdltjbGFzcyo9XCJoYW5kbGVcIl1bZGF0YS1zaWRlPVwiZGV0YWlsc1wiXSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXTpub3QoW2RhdGEtZGV0YWlscy1jb2xsYXBzZWRdKSB7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBtaW5tYXgoMCwgMWZyKSB2YXIoLS1wYy1jaGF0LXcsIDM2MHB4KSAhaW1wb3J0YW50O1xufVxuYFxuXG4vKipcbiAqIFx1NEYxQVx1OEJERFx1N0VERlx1OEJBMVx1ODg0Q1x1NzY4NFx1NEUyNFx1ODg0Q1x1OTRCM1x1NTIzNlx1RkYwOFx1NzUyOFx1NjIzN1x1NjMwN1x1NUI5QVx1NzY4NFx1NjgzN1x1NUYwRlx1RkYwOVx1MzAwMlx1NEUwRFx1ODBGRFx1OEQ3MCBDU1MgXHU5MDA5XHU2MkU5XHU1NjY4XHVGRjFBXG4gKiBcdTVCOThcdTY1QjlcdTU5MUFcdTRFMkFcdTZBMjFcdTU3NTdcdTc2ODRcdTY4MzlcdTdDN0JcdTkwRkRcdTUzRUIgYHJvb3RgXHVGRjA4XHU2Nzg0XHU1RUZBXHU1NDBFXHU2NjJGIGBoYXNoX3Jvb3RgXHVGRjA5XHVGRjBDXHU1MTc2XHU0RTJEXG4gKiBDb252ZXJzYXRpb25Sb290IFx1NzY4NFx1NUI1MFx1NjgxMVx1OTFDQ1x1NUMzMVx1NTMwNVx1NTQyQlx1N0VERlx1OEJBMVx1ODg0Q1x1NzY4NCBgaGFzaF9zZXBgIFx1NTIwNlx1OTY5NCBzcGFuXHUyMDE0XHUyMDE0XG4gKiBcdTRFRkJcdTRGNTVcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdUZGMDhcdTU0MkIgOmhhcygpXHVGRjA5XHU5MEZEXHU0RjFBXHU2MjhBXHU2NTc0XHU0RTJBXHU4MDRBXHU1OTI5XHU1QkI5XHU1NjY4XHU5NEIzXHU2MjEwXHU0RTI0XHU4ODRDXHVGRjBDXHU2NzQwXHU2QjdCXHU2RURBXHU1MkE4XHUzMDAyXG4gKiBcdTU2RTBcdTZCNjRcdTU3MjhcdThGRDBcdTg4NENcdTY1RjZcdTYzMDlcdTU1MkZcdTRFMDBcdTVGNjJcdTcyQjZcdTVCOUFcdTRGNERcdUZGMUFcdTVDNDVcdTRFMkRcdTYzOTJcdTcyNDggKyBcdTc2RjRcdTYzQTVcdTVCNTBcdTRFRTNcdTU0MkJcdTY1ODdcdTY3MkMgXCJ8XCIgXHU3Njg0XG4gKiBcdTUyMDZcdTk2OTQgc3Bhblx1RkYwQ1x1NTQ3RFx1NEUyRFx1NTQwRVx1NjI4QVx1NUI5OFx1NjVCOVx1N0M3Qlx1NTQwRFx1NTM5Rlx1NjgzN1x1NTE5OVx1OEZEQlx1NjgzN1x1NUYwRlx1ODg2OFx1RkYwOFx1N0NCRVx1NTFDNlx1NTIzMFx1Njc4NFx1NUVGQVx1NTRDOFx1NUUwQ1x1RkYwOVx1MzAwMlxuICogQHJldHVybnMgXHU2Q0U4XHU1MTY1XHU3Njg0IHN0eWxlIFx1NTE0M1x1N0QyMFx1RkYxQlx1NUI5OFx1NjVCOVx1NjcyQVx1NkUzMlx1NjdEM1x1N0VERlx1OEJBMVx1ODg0Q1x1NjVGNlx1NEUzQSB1bmRlZmluZWRcdTMwMDJcbiAqL1xuY29uc3QgYXBwbHlTdGF0c0xpbmVDbGFtcCA9ICgpOiBIVE1MU3R5bGVFbGVtZW50IHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3Qgc2VwU3BhbiA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MU3BhbkVsZW1lbnQ+KCdkaXZbY2xhc3MqPVwiX3Jvb3RcIl0gPiBzcGFuW2NsYXNzKj1cIl9zZXBcIl0nKSlcbiAgICAuZmluZCgoc3BhbikgPT4gc3Bhbi50ZXh0Q29udGVudCA9PT0gJ3wnKVxuICBjb25zdCByb290RGl2ID0gc2VwU3Bhbj8ucGFyZW50RWxlbWVudFxuICBjb25zdCBoYXNoQ2xhc3MgPSByb290RGl2Py5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5maW5kKChuYW1lKSA9PiBuYW1lLmVuZHNXaXRoKCdfcm9vdCcpKVxuICBpZiAocm9vdERpdiA9PT0gdW5kZWZpbmVkIHx8IHJvb3REaXYgPT09IG51bGwgfHwgaGFzaENsYXNzID09PSB1bmRlZmluZWQgfHwgZ2V0Q29tcHV0ZWRTdHlsZShyb290RGl2KS50ZXh0QWxpZ24gIT09ICdjZW50ZXInKSByZXR1cm4gdW5kZWZpbmVkXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZS5pZCA9ICdwYy1zdGF0cy1jbGFtcCdcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG5kaXZbY2xhc3M9XCIke2hhc2hDbGFzc31cIl0ge1xuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgLXdlYmtpdC1saW5lLWNsYW1wOiAyO1xuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuICB0ZXh0LW92ZXJmbG93OiBjbGlwO1xuICBmb250LXNpemU6IDExcHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cbmBcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSlcbiAgcmV0dXJuIHN0eWxlXG59XG5cbnR5cGUgVGFiS2V5ID0gJ2NvbW1pdHMnIHwgJ292ZXJ2aWV3JyB8ICdleGVjdXRpb24nIHwgJ3JldmlldycgfCAnbm90ZXMnIHwgJ3NldHRpbmdzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZUZyYW1lUHJvcHMge1xuICAvKiogXHU1Qjk4XHU2NUI5IGRldGFpbHMgXHU2OUZEXHU1OTUxXHU3RUE2XHU3Njg0IGxvY2FsZSBcdTZDRThcdTUxNjVcdUZGMDhcdTYyMTFcdTRFRUNcdTZDRThcdTUxOENcdTc2ODQgcHJvamVjdC1jb250cm9sIFx1OEJDRFx1NTE3OFx1RkYwOVx1MzAwMiAqL1xuICB0PzogKGtleTogc3RyaW5nKSA9PiBzdHJpbmdcbiAgLyoqIFx1NUY1M1x1NTI0RFx1NEYxQVx1OEJERCBpZFx1RkYwOFx1NUI5OFx1NjVCOSBzZXNzaW9uIFx1NjgwN1x1NTFDNlx1NUM1RVx1NjAyN1x1RkYxQlx1NTIwN1x1NjM2Mlx1NEYxQVx1OEJERFx1NjVGNlx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1NURFNVx1NEY1Q1x1NTNGMFx1OEY2OFx1OTA1M1x1RkYwOVx1MzAwMiAqL1xuICBzZXNzaW9uSWQ/OiBzdHJpbmdcbn1cblxuLyoqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NjU4N1x1Njg0OFx1OEJDRFx1NTE3OFx1RkYwOHpoIC8gZW5cdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBjb25zdCBXT1JLU1BBQ0VfRElDVCA9IHtcbiAgemg6IHtcbiAgICAnd29ya3NwYWNlLnRpdGxlJzogJ1x1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMCcsXG4gICAgJ3RhYi5jb21taXRzJzogJ1x1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNScsXG4gICAgJ3RhYi5vdmVydmlldyc6ICdcdTk4NzlcdTc2RUVcdTYwM0JcdTg5QzgnLFxuICAgICd0YWIuZXhlY3V0aW9uJzogJ1x1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDMycsXG4gICAgJ3RhYi5yZXZpZXcnOiAnUmV2aWV3IFx1OTVFRVx1OTg5OCcsXG4gICAgJ3RhYi5ub3Rlcyc6ICdcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzYnLFxuICAgICd0YWIuc2V0dGluZ3MnOiAnXHU4QkJFXHU3RjZFJyxcbiAgICAnZXJyb3IubG9hZCc6ICdcdTUyQTBcdThGN0RcdTU5MzFcdThEMjUnLFxuICAgICdzdGF0ZS5wcm9qZWN0JzogJ1x1NUY1M1x1NTI0RFx1OTg3OVx1NzZFRScsXG4gICAgJ3N0YXRlLm5vUHJvamVjdCc6ICdcdTVDMUFcdTY3MkFcdTUyMURcdTU5Q0JcdTUzMTZcdTk4NzlcdTc2RUUnLFxuICAgICdzdGF0ZS5ub1Byb2plY3RIaW50JzogJ1x1NzBCOVx1NTFGQlx1MzAwQ1x1NTIxRFx1NTlDQlx1NTMxNlx1OTg3OVx1NzZFRVx1MzAwRFx1NjI2Qlx1NjNDRlx1NEVEM1x1NUU5M1x1N0VEM1x1Njc4NFx1MzAwMVx1NjI4MFx1NjcyRlx1NjgwOFx1NEUwRVx1N0IyNlx1NTNGN1x1N0QyMlx1NUYxNVx1MzAwMicsXG4gICAgJ2FjdGlvbi5ib290c3RyYXAnOiAnXHU1MjFEXHU1OUNCXHU1MzE2XHU5ODc5XHU3NkVFJyxcbiAgICAnYWN0aW9uLnJlc2Nhbic6ICdcdTkxQ0RcdTY1QjBcdTUyMURcdTU5Q0JcdTUzMTYgLyBcdTYyNkJcdTYzQ0YnLFxuICAgICdhY3Rpb24uYW5hbHl6ZSc6ICdcdTUyMDZcdTY3OTBcdTVGNTNcdTUyNERcdTY1MzlcdTUyQTgnLFxuICAgICdhY3Rpb24ucmV2aWV3JzogJ1x1OEJDNFx1NUJBMVx1NUY1M1x1NTI0RFx1NjUzOVx1NTJBOCcsXG4gICAgJ2FjdGlvbi52ZXJpZnknOiAnXHU5QThDXHU2NTM2XHU1RjUzXHU1MjREXHU2NTM5XHU1MkE4JyxcbiAgICAnYWN0aW9uLmNyZWF0ZUNoYW5nZSc6ICdcdTY1QjBcdTVFRkFcdTUzRDhcdTY2RjQnLFxuICAgICdhY3Rpb24ucnVubmluZyc6ICdcdTYyNjdcdTg4NENcdTRFMkRcdTIwMjYnLFxuICAgICdhY3Rpb24ucmVmcmVzaCc6ICdcdTUyMzdcdTY1QjAnLFxuICAgICdmb3JtLmNoYW5nZVRpdGxlJzogJ1x1NTNEOFx1NjZGNFx1NjgwN1x1OTg5OCcsXG4gICAgJ2Zvcm0uY2hhbmdlRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMDhcdTkwMDlcdTU4NkJcdUZGMDknLFxuICAgICdyZXN1bHQucGFuZWwnOiAnXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDJyxcblxuICAgICdyZXBvLnNjYW5IaXN0b3J5JzogJ1x1OTFDRFx1NUVGQVx1NTM4Nlx1NTNGMicsXG4gICAgJ3JlcG8uY29tbWl0cyc6ICdcdTYzRDBcdTRFQTQnLFxuICAgICdyZXBvLmJyYW5jaCc6ICdcdTUyMDZcdTY1MkYnLFxuICAgICdyZXBvLndvcmtpbmcnOiAnXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcbiAgICAncmVwby53b3JraW5nQ2xlYW4nOiAnXHU1REU1XHU0RjVDXHU1MzNBXHU1RTcyXHU1MUMwXHVGRjBDXHU2NUUwXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcbiAgICAncmVwby5lbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTYzRDBcdTRFQTRcdTMwMDInLFxuICAgICdyZXBvLmxvYWRGYWlsZWQnOiAnXHU2M0QwXHU0RUE0XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1JyxcbiAgICAncGlja2VyLnRpdGxlJzogJ1x1OTAwOVx1NjJFOVx1ODk4MVx1NjgzOFx1NjdFNVx1NzY4NFx1NjNEMFx1NEVBNFx1RkYwOFx1NTNFRlx1NTkxQVx1OTAwOVx1RkYwOScsXG4gICAgJ3BpY2tlci5wbGFjZWhvbGRlcic6ICdcdTcwQjlcdTUxRkJcdTkwMDlcdTYyRTlcdTYzRDBcdTRFQTRcdUZGMDhcdTUzRUZcdTU5MUFcdTkwMDlcdUZGMENcdTU0MkJcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQThcdUZGMDknLFxuICAgICdwaWNrZXIuc2VsZWN0ZWQnOiAnXHU1REYyXHU5MDA5JyxcbiAgICAncGlja2VyLmZpbHRlcic6ICdcdTYzMDlcdTY4MDdcdTk4OTgvXHU1NEM4XHU1RTBDL1x1NEY1Q1x1ODAwNVx1OEZDN1x1NkVFNFx1MjAyNicsXG4gICAgJ3BpY2tlci5jbGVhcic6ICdcdTZFMDVcdTdBN0EnLFxuICAgICdwaWNrZXIubm9NYXRjaCc6ICdcdTY1RTBcdTUzMzlcdTkxNERcdTYzRDBcdTRFQTRcdTMwMDInLFxuICAgICdwaWNrZXIuaGludCc6ICdcdTUyRkVcdTkwMDlcdTYzRDBcdTRFQTRcdTU0MEVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTAgQUkgXHU4OUUzXHU4QkZCXHVGRjFCXHU0RTBCXHU2NUI5XHU1M0VGXHU1MThEXHU4REQxXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHU0RTBFXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHUzMDAyJyxcbiAgICAnaW1wYWN0LmZhY3RvcnMnOiAnXHU5OENFXHU5NjY5XHU2Nzg0XHU2MjEwXHVGRjA4XHU0RTNBXHU0RUMwXHU0RTQ4XHU2NjJGXHU4RkQ5XHU0RTJBXHU3QjQ5XHU3RUE3XHVGRjA5JyxcbiAgICAnaW1wYWN0LnBvaW50cyc6ICdcdTVGNzFcdTU0Q0RcdTcwQjlcdTY2MEVcdTdFQzYnLFxuICAgICdpbXBhY3Qua2V5UG9pbnRzJzogJ1x1NTE3M1x1OTUyRVx1N0VDNFx1NEVGNicsXG4gICAgJ2ltcGFjdC5tZW1vcnknOiAnXHU3RUQzXHU1NDA4XHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHU2ODM4XHU2N0U1JyxcbiAgICAnaW1wYWN0LmZ1bmN0aW9ucyc6ICdcdTUzRDdcdTVGNzFcdTU0Q0RcdTUxRkRcdTY1NzBcdUZGMDhcdThDMDFcdThDMDNcdTc1MjhcdTRFODZcdTg4QUJcdTY1MzlcdTc2ODRcdTRFRTNcdTc4MDFcdUZGMDknLFxuICAgICdpbXBhY3QuZnVuY1JvbGUnOiAnXHU1MUZEXHU2NTcwXHU1MjlGXHU4MEZEJyxcbiAgICAnaW1wYWN0LmZ1bmNDaGFuZ2UnOiAnXHU2NzJDXHU2QjIxXHU1M0Q4XHU1MzE2JyxcbiAgICAnaW1wYWN0LmZ1bmNDYWxsZXJzJzogJ1x1NUJGOVx1OEMwM1x1NzUyOFx1NjVCOVx1NzY4NFx1NUY3MVx1NTRDRCcsXG4gICAgJ2NhY2hlLmhpdCc6ICdcdTY3NjVcdTgxRUFcdTdGMTNcdTVCNTgnLFxuICAgICdjYWNoZS5yZWdlbmVyYXRlJzogJ1x1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMCcsXG4gICAgJ2V4ZWMuY3JlYXRlJzogJ1x1NjVCMFx1NUVGQVx1NjI2N1x1ODg0QycsXG4gICAgJ2V4ZWMuZm9ybVRpdGxlJzogJ1x1ODk4MVx1NTA1QVx1NEVDMFx1NEU0OFx1RkYwOFx1NEUwMFx1NTNFNVx1OEJERFx1RkYwOScsXG4gICAgJ2V4ZWMuZm9ybURlc2MnOiAnXHU5NzAwXHU2QzQyXHU0RTBFXHU4MENDXHU2NjZGXHVGRjFBXHU3NkVFXHU2ODA3XHUzMDAxXHU2RDg5XHU1M0NBXHU2QTIxXHU1NzU3XHUzMDAxXHU5QThDXHU2NTM2XHU2ODA3XHU1MUM2JyxcbiAgICAnZXhlYy5zdGFydCc6ICdcdTVGMDBcdTU5Q0JcdTYyNjdcdTg4NEMnLFxuICAgICdleGVjLnN0YXJ0aW5nJzogJ1x1NkI2M1x1NTcyOFx1NTQyRlx1NTJBOFx1MjAyNicsXG4gICAgJ2V4ZWMuY3JlYXRlSGludCc6ICdcdTUyMUJcdTVFRkFcdTUzRDhcdTY2RjRcdTVFNzZcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdThCQTFcdTUyMTJcdUZGMENcdTk2OEZcdTU0MEVcdTc1MzEgQUkgXHU1QjUwXHU0RUUzXHU3NDA2XHU5MDEwXHU2QjY1XHU2MjY3XHU4ODRDXHVGRjFCXHU4RkRCXHU1RUE2XHU1NzI4XHU0RTBCXHU2NUI5XHU1QjlFXHU2NUY2XHU1MjM3XHU2NUIwXHVGRjBDXHU2NUUwXHU5NzAwXHU1M0JCXHU4MDRBXHU1OTI5XHUzMDAyJyxcbiAgICAnZXhlYy5tb2RlbERlZmF1bHQnOiAnXHU2MjY3XHU4ODRDXHU2QTIxXHU1NzhCXHVGRjA4XHU4OUQyXHU4MjcyXHU5RUQ4XHU4QkE0XHVGRjFBXHU1MjA2XHU2NzkwL1x1NjRDRFx1NEY1Qz1cdTVGRUJcdUZGMENcdTVGMDBcdTUzRDE9XHU2ODA3XHU1MUM2XHVGRjBDXHU4OUM0XHU1MjEyPVx1NjNBOFx1NzQwNlx1RkYwQ1x1OUE4Q1x1NjUzNj1cdTlBOENcdTY1MzZcdTdFQTdcdUZGMDknLFxuICAgICdiYWRnZS5ydW5uaW5nJzogJ3tufSBcdTRFMkFcdTRFRkJcdTUyQTFcdThGRDBcdTg4NENcdTRFMkRcdUZGMENcdTcwQjlcdTUxRkJcdTY3RTVcdTc3MEInLFxuICAgICduYXJyYXRpdmUudGl0bGUnOiAnXHU1REU1XHU0RjVDXHU4RjZFXHU2QjIxXHU1M0Q5XHU0RThCJyxcbiAgICAnbmFycmF0aXZlLmdlbmVyYXRlJzogJ1x1NjU3NFx1NEY1M1x1ODlFM1x1OEJGQlx1OEZEOVx1OEY2RVx1NURFNVx1NEY1QycsXG4gICAgJ25hcnJhdGl2ZS5ydW5uaW5nJzogJ1x1ODlFM1x1OEJGQlx1NzUxRlx1NjIxMFx1NEUyRFx1MjAyNlx1RkYwOFx1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxuICAgICdiYWRnZS5mYWlsZWQnOiAne259IFx1NEUyQVx1NEVGQlx1NTJBMVx1OTcwMFx1ODk4MVx1NTkwNFx1NzQwNlx1RkYwQ1x1NzBCOVx1NTFGQlx1NjdFNVx1NzcwQicsXG4gICAgJ2V4ZWMuZmxvd0NyZWF0ZSc6ICdcdTU4NkJcdTUxOTlcdTRFRkJcdTUyQTEnLFxuICAgICdleGVjLmZsb3dPcmNoZXN0cmF0ZSc6ICdcdTc4NkVcdThCQTRcdTdGMTZcdTYzOTJcdUZGMDhcdTZCQ0ZcdTZCNjVcdTUzRUZcdTY1MzlcdTZBMjFcdTU3OEIvXHU4OUQyXHU4MjcyL1x1NTkzMVx1OEQyNVx1N0I1Nlx1NzU2NVx1RkYwOScsXG4gICAgJ2V4ZWMuZmxvd1J1bic6ICdcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMDhSdW4gXHU4QkU2XHU2MEM1XHU3NzBCXHU4RkRCXHU1RUE2XHU0RTBFXHU2MjEwXHU2NzJDXHVGRjA5JyxcbiAgICAnZXhlYy5mbG93TWVtb3J5JzogJ1x1ODFFQVx1NTJBOFx1NjNEMFx1NzBCQ1x1OEJCMFx1NUZDNlx1RkYwOFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1Nzg2RVx1OEJBNFx1RkYwOScsXG4gICAgJ2V4ZWMucGxhbm5pbmcnOiAnXHU3RjE2XHU2MzkyXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4TExNIFx1NkI2M1x1NTcyOFx1NjJDNlx1ODlFM1x1NEVGQlx1NTJBMVx1RkYwQ1x1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxuICAgICdleGVjLmNvbC5zdGVwcyc6ICdcdTZCNjVcdTlBQTQnLFxuICAgICdub3Rlcy5lZGl0JzogJ1x1N0YxNlx1OEY5MScsXG4gICAgJ25vdGVzLnRvTWVtb3J5JzogJ1x1OEY2Q1x1OEJCMFx1NUZDNicsXG4gICAgJ25vdGVzLnRvTWVtb3J5SGludCc6ICdcdTYyOEFcdThGRDlcdTY3NjFcdTdCMTRcdThCQjBcdTc2ODRcdTY4MDdcdTk4OThcdTRFMEVcdTUxODVcdTVCQjlcdTU4NkJcdTUxNjVcdTRFMEJcdTY1QjlcdThCQjBcdTVGQzZcdTg4NjhcdTUzNTVcdUZGMENcdTc4NkVcdThCQTRcdTU0MEVcdTUxNjVcdTVFOTMnLFxuICAgICdub3Rlcy50b01lbW9yeURvbmUnOiAnXHUyNzEzIFx1NURGMlx1NTg2Qlx1NTE2NVx1OEJCMFx1NUZDNlx1ODg2OFx1NTM1NVx1RkYwOFx1NTcyOFx1NEUwQlx1NjVCOVx1MzAwQ1x1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNlx1MzAwRFx1NTMzQVx1Nzg2RVx1OEJBNFx1N0M3Qlx1NTc4Qlx1NTQwRVx1NkRGQlx1NTJBMFx1RkYwOScsXG4gICAgJ25vdGVzLmNvcHlNZCc6ICdcdTU5MERcdTUyMzYgTUQnLFxuICAgICdub3Rlcy5jb3B5TWRIaW50JzogJ1x1NjI4QVx1OEZEOVx1Njc2MVx1N0IxNFx1OEJCMFx1NTkwRFx1NTIzNlx1NEUzQSBNYXJrZG93biBcdTUyMzBcdTUyNkFcdThEMzRcdTY3N0YnLFxuICAgICdub3Rlcy5jb3B5TWREb25lJzogJ1x1NURGMlx1NTkwRFx1NTIzNlx1NEUzQSBNYXJrZG93bicsXG4gICAgJ25vdGVzLmRpZ2VzdE5ldmVyJzogJ1x1NUMxQVx1NjcyQVx1NzUxRlx1NjIxMFx1OEZDNyBBSSBcdTYwM0JcdTdFRDMnLFxuICAgICdub3Rlcy5kaWdlc3RQZW5kaW5nJzogJ1x1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NTQwRVx1NjcwOSB7bn0gXHU0RTJBXHU2NUIwXHU2M0QwXHU0RUE0XHU2NzJBXHU2RDg4XHU1MzE2JyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlJzogJ1x1NUI1OFx1NEUzQVx1N0IxNFx1OEJCMCcsXG4gICAgJ2RldGFpbC5zYXZlTm90ZUhpbnQnOiAnXHU2MjhBXHU2NzJDXHU2QjIxXHU2ODM4XHU2N0U1XHU3RUQzXHU4QkJBXHVGRjA4XHU2NTM5XHU0RTg2XHU0RUMwXHU0RTQ4L1x1NUI5RVx1NzNCMFx1OTAzQlx1OEY5MS9cdTk4Q0VcdTk2NjlcdTcwQjlcdUZGMDlcdTRFMDBcdTk1MkVcdTVCNThcdTRFM0FcdTdFRDNcdTY3ODRcdTUzMTZcdTdCMTRcdThCQjAnLFxuICAgICdkZXRhaWwuc2F2ZU5vdGVUaXRsZSc6ICdcdTY4MzhcdTY3RTVcdThCQjBcdTVGNTUnLFxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeSc6ICdcdTZDODlcdTZEQzBcdTRFM0FcdThCQjBcdTVGQzYnLFxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeUhpbnQnOiAnXHU2MjhBXHU2NzJDXHU2QjIxXHU2ODM4XHU2N0U1XHU3RUQzXHU4QkJBXHU2Qzg5XHU2REMwXHU0RTNBXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHVGRjA4XHU4RkRCXHU1MTY1XHU1Rjg1XHU3ODZFXHU4QkE0XHU5NjFGXHU1MjE3XHVGRjA5JyxcbiAgICAnbm90ZXMuc2F2ZSc6ICdcdTRGRERcdTVCNTgnLFxuICAgICdub3Rlcy5jYW5jZWwnOiAnXHU1M0Q2XHU2RDg4JyxcbiAgICAnbWVtb3J5LmJyYW5jaFNjb3BlJzogJ1x1NTIwNlx1NjUyRicsXG4gICAgJ21lbW9yeS5icmFuY2hBbGwnOiAnXHU1MTY4XHU5MEU4XHU1MjA2XHU2NTJGJyxcbiAgICAnbm90ZXMuc2VhcmNoJzogJ1x1NjQxQ1x1N0QyMlx1N0IxNFx1OEJCMFx1MjAyNicsXG4gICAgJ21vZGVsLnRpdGxlJzogJ1x1NkEyMVx1NTc4Qlx1NTIwNlx1OTE0RFx1RkYwOFx1ODlFM1x1OEJGQiAvIFx1NjAzQlx1N0VEM1x1N0I0OVx1NEVGQlx1NTJBMVx1NzUyOFx1NTRFQVx1NEUyQVx1NkEyMVx1NTc4Qlx1RkYwOScsXG4gICAgJ21vZGVsLmxvYWRpbmcnOiAnXHU4QkZCXHU1M0Q2XHU2QTIxXHU1NzhCXHU2RTA1XHU1MzU1XHUyMDI2JyxcbiAgICAnbW9kZWwuZm9sbG93Q2hhdCc6ICdcdThEREZcdTk2OEZcdTgwNEFcdTU5MjlcdTZBMjFcdTU3OEInLFxuICAgICdtb2RlbC5zYXZlJzogJ1x1NEZERFx1NUI1OFx1NUU3Nlx1NzUxRlx1NjU0OCcsXG4gICAgJ21vZGVsLnNhdmVkJzogJ1x1NURGMlx1NzUxRlx1NjU0OCcsXG4gICAgJ21vZGVsLmhpbnQnOiAnXHU0RkREXHU1QjU4XHU1NDBFXHU3QUNCXHU1MzczXHU3NTFGXHU2NTQ4XHU1RTc2XHU2MzAxXHU0RTQ1XHU1MzE2XHVGRjA4XHU5MUNEXHU1NDJGXHU1NDBFXHU0RkREXHU3NTU5XHVGRjA5XHVGRjFCXHU0RTBEXHU1RjcxXHU1NENEXHU4MDRBXHU1OTI5XHU2QTIxXHU1NzhCXHUzMDAyJyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5JzogJ0FJIFx1NjAzQlx1N0VEM1x1N0IxNFx1OEJCMCcsXG4gICAgJ25vdGVzLmFpU3VtbWFyeVJ1bic6ICdcdTYwM0JcdTdFRDNcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhcdTdFQTYgMTAtMzAgXHU3OUQyXHVGRjA5JyxcbiAgICAnbm90ZXMuZXhwYW5kJzogJ1x1NUM1NVx1NUYwMFx1NTE2OFx1NjU4NycsXG4gICAgJ25vdGVzLmNvbGxhcHNlJzogJ1x1NjUzNlx1OEQ3NycsXG4gICAgJ25vdGVzLnN1bW1hcnlUYWcnOiAnQUkgXHU2MDNCXHU3RUQzJyxcbiAgICAnbm90ZXMuZW1wdHlTZWFyY2gnOiAnXHU2NUUwXHU1MzM5XHU5MTREXHU3QjE0XHU4QkIwXHUzMDAyJyxcbiAgICAnbm90ZXMuY29udGVudEhpbnQnOiAnXHU3QjE0XHU4QkIwXHU1MTg1XHU1QkI5XHVGRjA4XHU2NTJGXHU2MzAxXHU1OTFBXHU4ODRDXHVGRjA5XHVGRjFBXHU3RUQzXHU4QkJBXHUzMDAxXHU3NTkxXHU5NUVFXHUzMDAxXHU1QjY2XHU0RTYwXHU4OTgxXHU3MEI5XHUzMDAxXHU1MTczXHU5NTJFXHU1MUIzXHU3QjU2XHUyMDI2JyxcbiAgICAnbm90ZXMudGFnc0hpbnQnOiAnXHU2ODA3XHU3QjdFXHVGRjA4XHU5MDE3XHU1M0Y3XHU1MjA2XHU5Njk0XHVGRjBDXHU5MDA5XHU1ODZCXHVGRjFCXHU0RkREXHU1QjU4XHU1NDBFXHU1M0VGXHU3MEI5XHU1MUZCXHU3QjVCXHU5MDA5XHVGRjA5JyxcbiAgICAnbm90ZXMucGluJzogJ1x1N0Y2RVx1OTg3NicsXG4gICAgJ25vdGVzLnVucGluJzogJ1x1NTNENlx1NkQ4OFx1N0Y2RVx1OTg3NicsXG4gICAgJ25vdGVzLmVkaXRlZEF0JzogJ1x1N0YxNlx1OEY5MVx1NEU4RScsXG4gICAgJ3Jldmlldy5maWx0ZXJBbGwnOiAnXHU1MTY4XHU5MEU4JyxcbiAgICAncmV2aWV3LnN0YXR1c0FsbCc6ICdcdTUxNjhcdTkwRThcdTcyQjZcdTYwMDEnLFxuICAgICdyZXZpZXcudmVyaWZ5JzogJ1x1NTkwRFx1NjhDMCcsXG4gICAgJ3Jldmlldy52ZXJpZnlSdW5uaW5nJzogJ1x1NTkwRFx1NjhDMFx1NEUyRFx1MjAyNicsXG4gICAgJ3Jldmlldy52ZXJpZnlIaW50JzogJ1x1NEZFRVx1NjUzOVx1NEVFM1x1NzgwMVx1NTQwRVx1NzBCOVx1NTFGQlx1RkYxQVx1ODFFQVx1NTJBOFx1NjhDMFx1NkQ0Qlx1OTVFRVx1OTg5OFx1NjYyRlx1NTQyNlx1NEZFRVx1NTkwRFx1MzAwMVx1NjUzOVx1NTJBOFx1NjYyRlx1NTQyNlx1NjcwMFx1NEYxOC9cdTY3MDBcdTVDMEZcdTRGQjVcdTUxNjVcdTMwMDFcdTY3MDlcdTY1RTBcdTY1QjBcdTk1RUVcdTk4OThcdUZGMUJcdTUxNjhcdTkwRThcdTkwMUFcdThGQzdcdTYyNERcdTgxRUFcdTUyQThcdTdGNkVcdTRFM0FcdTVERjJcdTg5RTNcdTUxQjMnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZSc6ICdcdTUyMjRcdTVCOUFcdThCRUZcdTYyQTUnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZUhpbnQnOiAnXHU0RUJBXHU1REU1XHU1MjI0XHU1QjlBXHU4QkU1XHU5NUVFXHU5ODk4XHU0RTNBXHU4QkVGXHU2MkE1XHU1RTc2XHU1MTczXHU5NUVEXHVGRjA4XHU0RTBFXHU1OTBEXHU2OEMwXHU4OUUzXHU1MUIzXHU3Njg0XHU4QkVEXHU0RTQ5XHU0RTBEXHU1NDBDXHVGRjA5JyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVUaXRsZSc6ICdcdTUyMjRcdTVCOUFcdTRFM0FcdThCRUZcdTYyQTVcdUZGMUYnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZU1zZyc6ICdcdTMwMEN7dGl0bGV9XHUzMDBEXHU1QzA2XHU4OEFCXHU2ODA3XHU4QkIwXHU0RTNBXHU4QkVGXHU2MkE1XHVGRjA4XHU1REYyXHU2MkQyXHU3RUREXHVGRjA5XHU1RTc2XHU0RUNFXHU1Rjg1XHU1OTA0XHU3NDA2XHU0RTJEXHU3OUZCXHU5NjY0XHUzMDAyJyxcbiAgICAncmV2aWV3LmZpeERldGFpbCc6ICdcdTRGRUVcdTU5MERcdThCRTZcdTYwQzUnLFxuICAgICdyZXZpZXcuZml4U3RhdEZpbGVzJzogJ1x1NjU4N1x1NEVGNicsXG4gICAgJ3Jldmlldy5maXhGaWxlcyc6ICdcdTRGRUVcdTU5MERcdTZEODlcdTUzQ0FcdTY1ODdcdTRFRjYnLFxuICAgICdyZXZpZXcuZml4SW1wYWN0JzogJ1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNFx1RkYwOFx1NjUzOVx1NTJBOFx1N0IyNlx1NTNGN1x1NEUwRVx1OEMwM1x1NzUyOFx1NzBCOVx1RkYwOScsXG4gICAgJ3Jldmlldy5kZWZpbmVkSW4nOiAnXHU1QjlBXHU0RTQ5XHU0RThFJyxcbiAgICAncmV2aWV3LmNhbGxDb3VudCc6ICdcdTU5MDRcdThDMDNcdTc1MjgnLFxuICAgICdyZXZpZXcuZml4RGlmZic6ICdcdTRGRUVcdTU5MERcdTVERUVcdTVGMDJcdUZGMDhcdTc2RjhcdTVCRjlcdThCQzRcdTVCQTFcdTU3RkFcdTdFQkZcdUZGMDknLFxuICAgICdyZXZpZXcucmVmcmVzaCc6ICdcdTUyMzdcdTY1QjAnLFxuICAgICdyZXZpZXcucmV0ZW50aW9uSGludCc6ICdcdTVERjJcdTg5RTNcdTUxQjNcdTk1RUVcdTk4OThcdTRGRERcdTc1NTkge2RheXN9IFx1NTkyOVx1NTQwRVx1ODFFQVx1NTJBOFx1NkUwNVx1NzQwNicsXG4gICAgJ3Jldmlldy50YXJnZXQnOiAnXHU1QkY5XHU4QzYxJyxcbiAgICAncmV2aWV3LndvcmtpbmdUYXJnZXQnOiAnXHU1REU1XHU0RjVDXHU1MzNBJyxcblxuICAgICdwbGFuLnRpdGxlJzogJ1x1N0YxNlx1NjM5Mlx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNCcsXG4gICAgJ3BsYW4uaGludCc6ICdcdTZCQ0ZcdTZCNjVcdTc2ODRcdTg5RDJcdTgyNzJcdTUxQjNcdTVCOUFcdTRFMEFcdTRFMEJcdTY1ODdcdTZDRThcdTUxNjVcdTRFMEVcdTlFRDhcdThCQTRcdTZBMjFcdTU3OEJcdUZGMDhcdTUyMDZcdTY3OTAvXHU2NENEXHU0RjVDPWZhc3RcdUZGMENcdTVGMDBcdTUzRDE9c3RhbmRhcmRcdUZGMENcdTg5QzRcdTUyMTI9cmVhc29uaW5nXHVGRjBDXHU5QThDXHU2NTM2PXZlcmlmaWVyXHVGRjA5XHVGRjFCXHU1M0VGXHU4QzAzXHU2NTc0XHU1NDBFXHU1MThEXHU1NDJGXHU1MkE4XHUzMDAyJyxcbiAgICAncGxhbi5jb2wuc3RlcCc6ICdcdTZCNjVcdTlBQTQnLCAncGxhbi5jb2wucm9sZSc6ICdcdTg5RDJcdTgyNzInLCAncGxhbi5jb2wubW9kZWwnOiAnXHU2QTIxXHU1NzhCJywgJ3BsYW4uY29sLnBvbGljeSc6ICdcdTU5MzFcdThEMjVcdTdCNTZcdTc1NjUnLCAncGxhbi5jb2wuZW5hYmxlZCc6ICdcdTU0MkZcdTc1MjgnLCAncGxhbi5jb2wuYXR0ZW1wdHMnOiAnXHU1QzFEXHU4QkQ1JyxcbiAgICAncGxhbi5tb2RlbERlZmF1bHQnOiAnXHU4RERGXHU5NjhGXHU4OUQyXHU4MjcyXHU5RUQ4XHU4QkE0JyxcbiAgICAncGxhbi5sYXVuY2hFZGl0ZWQnOiAnXHU0RkREXHU1QjU4XHU0RkVFXHU2NTM5XHU1RTc2XHU1NDJGXHU1MkE4JyxcbiAgICAncGxhbi5sYXVuY2hEaXJlY3QnOiAnXHU2MzA5XHU1MzlGXHU4QkExXHU1MjEyXHU1NDJGXHU1MkE4JyxcbiAgICAncGxhbi5kaXNjYXJkJzogJ1x1NjUzRVx1NUYwMycsXG4gICAgJ3BsYW4udmlld0RldGFpbCc6ICdcdThCRTZcdTYwQzUnLCAncGxhbi5yZWZyZXNoRGV0YWlsJzogJ1x1NTIzN1x1NjVCMCcsICdwbGFuLmNsb3NlRGV0YWlsJzogJ1x1NjUzNlx1OEQ3NycsXG4gICAgJ3BsYW4uZGV0YWlsVGl0bGUnOiAnUnVuIFx1OEJFNlx1NjBDNScsXG4gICAgJ3BsYW4ucGF1c2VkQmFubmVyJzogJ1x1NEVGQlx1NTJBMVx1NURGMlx1NjY4Mlx1NTA1Q1x1RkYwQ1x1N0I0OVx1NUY4NVx1NEY2MFx1NzY4NFx1NTFCM1x1N0I1NicsXG4gICAgJ3BsYW4ucmVzdW1lUmV0cnknOiAnXHU5MUNEXHU4QkQ1XHU4QkU1XHU2QjY1XHU5QUE0XHU1RTc2XHU3RUU3XHU3RUVEJyxcbiAgICAncGxhbi5yZXN1bWVTa2lwJzogJ1x1OERGM1x1OEZDN1x1OEJFNVx1NkI2NVx1OUFBNFx1N0VFN1x1N0VFRCcsXG4gICAgJ3BsYW4ucmVzdW1lRmFpbGVkJzogJ1x1NEVDRVx1NTkzMVx1OEQyNVx1NTkwNFx1NjA2Mlx1NTkwRCcsXG4gICAgJ3BsYW4uY29udGV4dFRpdGxlJzogJ1x1NEVGQlx1NTJBMVx1NEUwQVx1NEUwQlx1NjU4N1x1RkYwOFx1NjcyQyBSdW4gXHU2Q0U4XHU1MTY1XHU0RTg2XHU0RUMwXHU0RTQ4XHVGRjA5JyxcbiAgICAncGxhbi5icmFuY2gnOiAnXHU1MjA2XHU2NTJGJywgJ3BsYW4uaW5qZWN0ZWRNZW1vcmllcyc6ICdcdTZDRThcdTUxNjVcdThCQjBcdTVGQzYnLCAncGxhbi5kZWNpc2lvbkxvZyc6ICdcdTUxQjNcdTdCNTZcdTY1RTVcdTVGRDcnLFxuICAgICdleGVjLmNvbC5kZXRhaWwnOiAnXHU4QkU2XHU2MEM1JyxcblxuICAgICdzY2hlZC50aXRsZSc6ICdcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTEnLFxuICAgICdzY2hlZC5mb3JtTmFtZSc6ICdcdTRFRkJcdTUyQTFcdTU0MERcdTc5RjAnLCAnc2NoZWQuZm9ybUludGVydmFsJzogJ1x1OTVGNFx1OTY5NFx1RkYwOFx1NTIwNlx1OTQ5Rlx1RkYwOScsXG4gICAgJ3NjaGVkLnR5cGVSZXZpZXcnOiAnXHU4MUVBXHU1MkE4XHU4QkM0XHU1QkExJywgJ3NjaGVkLnR5cGVTdW1tYXJ5JzogJ0FJIFx1NjAzQlx1N0VEMycsICdzY2hlZC50eXBlUnVuJzogJ1x1NUI5QVx1NjVGNlx1NjI2N1x1ODg0QycsXG4gICAgJ3NjaGVkLmFkZCc6ICdcdTUyMUJcdTVFRkEnLFxuICAgICdzY2hlZC5oaW50JzogJ1x1NTIzMFx1NzBCOVx1ODFFQVx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYxQVx1ODFFQVx1NTJBOFx1OEJDNFx1NUJBMT1cdThCQzRcdTVCQTFcdThGRDEgMjQgXHU1QzBGXHU2NUY2XHU3Njg0XHU2NUIwXHU2M0QwXHU0RUE0XHVGRjA4XHU5NUVFXHU5ODk4XHU4RkRCIFJldmlldyBcdTk3NjJcdTY3N0ZcdUZGMDlcdUZGMUJBSSBcdTYwM0JcdTdFRDM9XHU3NTFGXHU2MjEwXHU1ODlFXHU5MUNGXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzXHVGRjFCXHU1QjlBXHU2NUY2XHU2MjY3XHU4ODRDPVx1NjMwOVx1NkEyMVx1Njc3Rlx1OEREMVx1NEUwMFx1NkIyMVx1N0YxNlx1NjM5Mlx1NEVGQlx1NTJBMVx1MzAwMlx1NjcwMFx1NUMwRiAxIFx1NTIwNlx1OTQ5Rlx1MzAwMicsXG4gICAgJ3NjaGVkLmVtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1MzAwMicsXG4gICAgJ3NjaGVkLmNvbC5uYW1lJzogJ1x1NTQwRFx1NzlGMCcsICdzY2hlZC5jb2wudHlwZSc6ICdcdTdDN0JcdTU3OEInLCAnc2NoZWQuY29sLmludGVydmFsJzogJ1x1NTQ2OFx1NjcxRicsICdzY2hlZC5jb2wubmV4dCc6ICdcdTRFMEJcdTZCMjFcdTYyNjdcdTg4NEMnLCAnc2NoZWQuY29sLmxhc3RSZXN1bHQnOiAnXHU0RTBBXHU2QjIxXHU3RUQzXHU2NzlDJywgJ3NjaGVkLmNvbC5hY3Rpb25zJzogJ1x1NjRDRFx1NEY1QycsXG4gICAgJ3NjaGVkLmRheSc6ICcgXHU1OTI5JywgJ3NjaGVkLmhvdXInOiAnIFx1NUMwRlx1NjVGNicsICdzY2hlZC5taW51dGUnOiAnIFx1NTIwNlx1OTQ5RicsXG4gICAgJ3NjaGVkLmRpc2FibGUnOiAnXHU2NjgyXHU1MDVDJywgJ3NjaGVkLmVuYWJsZSc6ICdcdTU0MkZcdTc1MjgnLCAnc2NoZWQucnVuTm93JzogJ1x1N0FDQlx1NTM3M1x1NjI2N1x1ODg0QycsXG5cbiAgICAnbWVtb3J5LnpvbmVUaXRsZSc6ICdcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzYnLFxuICAgICdtZW1vcnkuc3luY0Jhc2VsaW5lJzogJ1x1NTQwQ1x1NkI2NVx1NTdGQVx1N0VCRicsICdtZW1vcnkuc3luY05vbmUnOiAnXHU2NzJBXHU1NDBDXHU2QjY1JyxcbiAgICAnbWVtb3J5LmJlaGluZCc6ICdcdTg0M0RcdTU0MEUge259IFx1NEUyQVx1NjNEMFx1NEVBNFx1NjcyQVx1NTQwQ1x1NkI2NScsXG4gICAgJ21lbW9yeS5zeW5jJzogJ1x1NTQwQ1x1NkI2NVx1OEJCMFx1NUZDNicsICdtZW1vcnkuc3luY2luZyc6ICdcdTU0MENcdTZCNjVcdTRFMkRcdTIwMjYnLCAnbWVtb3J5LnN5bmNGYWlsZWQnOiAnXHU1NDBDXHU2QjY1XHU1OTMxXHU4RDI1JyxcbiAgICAnbWVtb3J5LnN0YWxlVGl0bGUnOiAnXHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2XHVGRjA4XHU3NkY4XHU1MTczXHU0RUUzXHU3ODAxXHU1REYyXHU4OEFCXHU2NTM5XHU1MkE4XHVGRjBDXHU1Rjg1XHU0RjYwXHU1OTBEXHU2ODM4XHVGRjA5JyxcbiAgICAnbWVtb3J5Lm1hcmtTdGFsZSc6ICdcdTY4MDdcdThCQjBcdThGQzdcdTY1RjYnLCAnbWVtb3J5LmFyY2hpdmVCdG4nOiAnXHU1RjUyXHU2ODYzJywgJ21lbW9yeS5rZWVwQWN0aXZlJzogJ1x1NEVDRFx1NjcwOVx1NjU0OCcsXG4gICAgJ21lbW9yeS5uZXdDYW5kaWRhdGVzJzogJ1x1NjVCMFx1NTg5RVx1NTAxOVx1OTAwOVx1RkYwOFx1NURGMlx1NTE2NVx1NUY4NVx1Nzg2RVx1OEJBNFx1OTYxRlx1NTIxN1x1RkYwOVx1RkYxQScsXG4gICAgJ21lbW9yeS5jbG9zZVJlcG9ydCc6ICdcdTUxNzNcdTk1RURcdTYyQTVcdTU0NEEnLFxuICAgICdtZW1vcnkuc2NvcGVQcm9qZWN0JzogJ1x1NEUzQlx1NUU3Mlx1RkYwOFx1NTE2OFx1NTIwNlx1NjUyRlx1RkYwOScsICdtZW1vcnkuc2NvcGVCcmFuY2gnOiAnXHU0RUM1XHU1RjUzXHU1MjREXHU1MjA2XHU2NTJGJyxcbiAgICAnbWVtb3J5LnBlbmRpbmdRdWV1ZSc6ICdcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTcnLFxuICAgICdtZW1vcnkudG9Ob3RlJzogJ1x1OEY2Q1x1N0IxNFx1OEJCMCcsICdtZW1vcnkubm9ybWFsaXplJzogJ1x1NUY1Mlx1NEUwMFx1NTIzMFx1NEUzQlx1NUU3MicsICdtZW1vcnkucmVzdG9yZSc6ICdcdTYwNjJcdTU5MEQnLFxuICAgICdtZW1vcnkuc3RhdHVzU3RhbGUnOiAnXHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2JyxcbiAgICAnaW1wYWN0LmZ1bmN0aW9uc05vbmUnOiAnXHU2NzJBXHU4QkM2XHU1MjJCXHU1MUZBXHU1MUZEXHU2NTcwXHU3RUE3XHU4QzAzXHU3NTI4XHU1M0Q4XHU1MzE2XHVGRjA4XHU1M0VGXHU4MEZEXHU2NjJGXHU2ODM3XHU1RjBGL1x1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MC9cdTdFQUZcdTkxNERcdTdGNkVcdTY1MzlcdTUyQThcdUZGMDlcdTMwMDInLFxuICAgICdyZXZpZXcuY29sLnNldmVyaXR5JzogJ1x1N0VBN1x1NTIyQicsXG4gICAgJ3Jldmlldy5jb2wuY2F0ZWdvcnknOiAnXHU3QzdCXHU1MjJCJyxcbiAgICAncmV2aWV3LmNvbC50aXRsZSc6ICdcdTk1RUVcdTk4OTgnLFxuICAgICdyZXZpZXcuY29sLmV2aWRlbmNlJzogJ1x1NEY0RFx1N0Y2RScsXG4gICAgJ3Jldmlldy5jb2wuZml4JzogJ1x1NUVGQVx1OEJBRVx1NEZFRVx1NTkwRCcsXG4gICAgJ3Jldmlldy5oaW50JzogJ1x1NzBCOVx1NTFGQlx1NEUwQVx1NjVCOVx1NjMwOVx1OTRBRVx1NUYwMFx1NTlDQlx1NjgzOFx1NjdFNVx1RkYwQ1x1NEVBN1x1NTFGQVx1NjcwMFx1NEYxOFx1NjAyN1x1N0VEM1x1OEJCQVx1NEUwRVx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1MzAwMicsXG4gICAgJ2RpZmYuc2hvdyc6ICdcdTVCRjlcdTZCRDQnLFxuICAgICdkaWZmLmhpZGUnOiAnXHU2NTM2XHU4RDc3XHU1REVFXHU1RjAyJyxcblxuICAgICdkZXRhaWwudGl0bGUnOiAnXHU2ODM4XHU2N0U1XHU4QkU2XHU2MEM1JyxcbiAgICAnZGV0YWlsLnBpY2snOiAnXHUyMTkwIFx1NEVDRVx1NURFNlx1NEZBN1x1OTAwOVx1NjJFOVx1NEUwMFx1NkIyMVx1NjNEMFx1NEVBNFx1RkYwOFx1NjIxNlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOVx1NUYwMFx1NTlDQlx1NjgzOFx1NjdFNScsXG4gICAgJ2RldGFpbC53aGF0JzogJ1x1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OCcsXG4gICAgJ2RldGFpbC5sb2dpYyc6ICdcdTVCOUVcdTczQjBcdTkwM0JcdThGOTEnLFxuICAgICdkZXRhaWwucmlzayc6ICdcdTk4Q0VcdTk2NjlcdTcwQjknLFxuICAgICdkZXRhaWwuZmlsZXMnOiAnXHU2NTg3XHU0RUY2XHU2RTA1XHU1MzU1JyxcbiAgICAnZGV0YWlsLnBhdGNoJzogJ1x1NjdFNVx1NzcwQlx1ODg2NVx1NEUwMVx1NTM5Rlx1NjU4NycsXG4gICAgJ2RldGFpbC5haUxvYWRpbmcnOiAnQUkgXHU4OUUzXHU4QkZCXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4XHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXG4gICAgJ2RldGFpbC5pbXBhY3QnOiAnXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHU1MjA2XHU2NzkwJyxcbiAgICAnZGV0YWlsLmltcGFjdExvYWRpbmcnOiAnXHU1RjcxXHU1NENEXHU2MjZCXHU2M0NGXHU0RTJEXHUyMDI2XHVGRjA4XHU1RjE1XHU3NTI4XHU2OEMwXHU3RDIyICsgXHU1NkZFXHU4QzMxXHU0RjIwXHU2NEFEXHVGRjA5JyxcbiAgICAnZGV0YWlsLm9wdGltYWxpdHknOiAnXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1JyxcbiAgICAnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJzogJ1x1OEJDNFx1NUJBMVx1NEUyRFx1MjAyNlx1RkYwOFx1NEYxQVx1NEVBN1x1NTFGQVx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1NEUwRVx1NjcwMFx1NEYxOFx1NjAyN1x1N0VEM1x1OEJCQVx1RkYwOScsXG5cbiAgICAnaW1wYWN0LnJpc2snOiAnXHU5OENFXHU5NjY5JyxcbiAgICAnaW1wYWN0LmNvbC5jaGFuZ2VkJzogJ1x1NTNEOFx1NjZGNFx1NjU4N1x1NEVGNicsXG4gICAgJ2ltcGFjdC5jb2wuaW5kaXJlY3QnOiAnXHU5NUY0XHU2M0E1XHU1RjcxXHU1NENEXHVGRjA4XHU1RjE1XHU3NTI4XHU5NEZFXHVGRjA5JyxcbiAgICAnaW1wYWN0LmNvbC5wb3RlbnRpYWwnOiAnXHU2RjVDXHU1NzI4XHU1RjcxXHU1NENEJyxcbiAgICAnaW1wYWN0Lm5vbmUnOiAnXHU2NzJBXHU1M0QxXHU3M0IwXHU0RUQzXHU1RTkzXHU1MTg1XHU1RjE1XHU3NTI4XHU4MDA1XHVGRjA4XHU2NTM5XHU1MkE4XHU3NzBCXHU0RjNDXHU3MkVDXHU3QUNCXHVGRjA5XHUzMDAyJyxcbiAgICAnaW1wYWN0LnRlc3RzJzogJ1x1NTE3M1x1ODA1NFx1NkQ0Qlx1OEJENScsXG4gICAgJ2ltcGFjdC5sZWdlbmQuY2hhbmdlZCc6ICdcdTUzRDhcdTY2RjQnLFxuICAgICdpbXBhY3QubGVnZW5kLmluZGlyZWN0JzogJ1x1OTVGNFx1NjNBNScsXG4gICAgJ2ltcGFjdC5sZWdlbmQucG90ZW50aWFsJzogJ1x1NkY1Q1x1NTcyOCcsXG5cbiAgICAncmV2aWV3LnZlcmRpY3QnOiAnXHU2NzAwXHU0RjE4XHU2MDI3XHU3RUQzXHU4QkJBJyxcbiAgICAncmV2aWV3Lmlzc3Vlcyc6ICdcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTUnLFxuICAgICdyZXZpZXcuY2xlYW4nOiAnXHU2NzJBXHU1M0QxXHU3M0IwXHU5NUVFXHU5ODk4XHUzMDAyJyxcblxuICAgICdub3Rlcy50aXRsZSc6ICdcdTY4MzhcdTY3RTVcdTdCMTRcdThCQjAnLFxuICAgICdub3Rlcy5mb3JtVGl0bGUnOiAnXHU3QjE0XHU4QkIwXHU2ODA3XHU5ODk4JyxcbiAgICAnbm90ZXMuZm9ybUNvbnRlbnQnOiAnXHU3QjE0XHU4QkIwXHU1MTg1XHU1QkI5XHVGRjA4XHU3RUQzXHU4QkJBXHUzMDAxXHU3NTkxXHU5NUVFXHUzMDAxXHU1QjY2XHU0RTYwXHU4OTgxXHU3MEI5XHUyMDI2XHVGRjA5JyxcbiAgICAnbm90ZXMuYWRkJzogJ1x1NkRGQlx1NTJBMFx1N0IxNFx1OEJCMCcsXG4gICAgJ25vdGVzLmJvdW5kVG8nOiAnXHU1QzA2XHU1MTczXHU4MDU0XHU1MjMwJyxcbiAgICAnbm90ZXMuY29sLnRpbWUnOiAnXHU2NUY2XHU5NUY0JyxcbiAgICAnbm90ZXMuY29sLnRpdGxlJzogJ1x1NjgwN1x1OTg5OCcsXG4gICAgJ25vdGVzLmNvbC5jb250ZW50JzogJ1x1NTE4NVx1NUJCOScsXG4gICAgJ25vdGVzLmNvbC5zaGEnOiAnXHU1MTczXHU4MDU0XHU2M0QwXHU0RUE0JyxcbiAgICAnbm90ZXMucmVtb3ZlJzogJ1x1NTIyMFx1OTY2NCcsXG4gICAgJ25vdGVzLmVtcHR5JzogJ1x1OEZEOFx1NkNBMVx1NjcwOVx1N0IxNFx1OEJCMFx1MzAwMlx1NjgzOFx1NjdFNVx1NjNEMFx1NEVBNFx1NjVGNlx1OTY4Rlx1NjI0Qlx1OEJCMFx1NEUwQlx1N0VEM1x1OEJCQVx1NEUwRVx1NzU5MVx1OTVFRVx1RkYwQ1x1NUMzMVx1NjYyRlx1NEY2MFx1NzY4NFx1OTg3OVx1NzZFRVx1NUI2Nlx1NEU2MFx1Njg2M1x1Njg0OFx1MzAwMicsXG5cbiAgICAnbWVtb3J5LnJlY29yZCc6ICdcdThCQjBcdTVGNTVcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzYnLFxuICAgICdmb3JtLm1lbW9yeVRpdGxlJzogJ1x1OEJCMFx1NUZDNlx1NjgwN1x1OTg5OCcsXG4gICAgJ2Zvcm0ubWVtb3J5Q29udGVudCc6ICdcdThCQjBcdTVGQzZcdTUxODVcdTVCQjlcdUZGMDhcdTRFQzBcdTRFNDhcdTRFMEVcdTRFM0FcdTRFQzBcdTRFNDhcdUZGMDknLFxuICAgICdtZW1vcnkuY29sLnRpdGxlJzogJ1x1Njc2MVx1NzZFRScsXG4gICAgJ21lbW9yeS5jb2wudHlwZSc6ICdcdTdDN0JcdTU3OEInLFxuICAgICdtZW1vcnkuY29sLnRydXRoJzogJ1x1NzcxRlx1NTAzQycsXG4gICAgJ21lbW9yeS5jb2wuYnJhbmNoJzogJ1x1NTIwNlx1NjUyRicsXG4gICAgJ21lbW9yeS5jb25maXJtJzogJ1x1Nzg2RVx1OEJBNCcsXG4gICAgJ21lbW9yeS5lbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdTMwMDJcdTUzRUZcdTU3MjhcdTgwNEFcdTU5MjlcdTRFMkRcdThCQTkgQUkgXHU4QkIwXHU1RjU1XHVGRjBDXHU2MjE2XHU1NzI4XHU0RTBBXHU2NUI5XHU2MjRCXHU1MkE4XHU2REZCXHU1MkEwXHUzMDAyJyxcbiAgICAnY29uY2VwdHMudGl0bGUnOiAnXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1JyxcbiAgICAnY29uY2VwdHMubm9uZSc6ICdcdTY2ODJcdTY1RTBcdTVCNjZcdTRFNjBcdTY5ODJcdTVGRjVcdTMwMDJcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdThERDFcdTVCOENcdTUzRDhcdTY2RjRcdTU0MEVcdTgxRUFcdTUyQThcdTZDODlcdTZEQzBcdUZGMENcdTRFNUZcdTUzRUZcdTU3MjhcdTgwNEFcdTU5MjlcdTRFMkRcdThCQTkgQUkgXHU2MDNCXHU3RUQzXHU1QjY2XHU0RTYwXHU4OTgxXHU3MEI5XHUzMDAyJyxcbiAgICAnY29uY2VwdHMuY29sLm5hbWUnOiAnXHU2OTgyXHU1RkY1JyxcbiAgICAnY29uY2VwdHMuY29sLmNhdGVnb3J5JzogJ1x1N0M3Qlx1NTIyQicsXG4gICAgJ2NvbmNlcHRzLmNvbC5jb3VudCc6ICdcdTZCMjFcdTY1NzAnLFxuICAgICdyZXZpZXcucmVjb3Jkc1RpdGxlJzogJ1JldmlldyBcdTk1RUVcdTk4OTgnLFxuICAgICdyZXZpZXcucmVjb3Jkc0VtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1OTVFRVx1OTg5OFx1OEJCMFx1NUY1NVx1MzAwMlx1NjNEMFx1NEVBNFx1NUJBMVx1NjdFNVx1OTg3NVx1OEJDNFx1NUJBMVx1NTFGQVx1NzY4NFx1OTVFRVx1OTg5OFx1NEYxQVx1ODFFQVx1NTJBOFx1NzY3Qlx1OEJCMFx1NTIzMFx1OEZEOVx1OTFDQ1x1RkYxQlx1OTFDRFx1NjVCMFx1OEJDNFx1NUJBMVx1NEYxQVx1NjZGRlx1NjM2Mlx1NjVFN1x1OEJCMFx1NUY1NVx1MzAwMicsXG4gICAgJ3ZlcmlmeS5yZWNvcmRzJzogJ1x1OUE4Q1x1NjUzNlx1OEJCMFx1NUY1NScsXG4gICAgJ3ZlcmlmeS5yZWNvcmRzRW1wdHknOiAnXHU2NjgyXHU2NUUwXHU5QThDXHU2NTM2XHU4QkIwXHU1RjU1XHUzMDAyXHU1NzI4XHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHU3MEI5XHUzMDBDXHU5QThDXHU2NTM2XHUzMDBEXHU1MzczXHU3NTFGXHU2MjEwXHUzMDAyJyxcblxuICAgICdjb25maXJtZWQudGl0bGUnOiAnXHU1REYyXHU3ODZFXHU1QjlBXHU3RUE2XHU2NzVGXHVGRjA4XHU0RUJBXHU1REU1XHU3ODZFXHU4QkE0XHVGRjBDQUkgXHU3OTgxXHU2NTM5XHU4MUVBXHU1MkE4XHU2MkU2XHU2MjJBXHVGRjA5JyxcbiAgICAnY29uZmlybWVkLmFkZCc6ICdcdTZERkJcdTUyQTBcdTdFQTZcdTY3NUYnLFxuICAgICdjb25maXJtZWQudGV4dCc6ICdcdTdFQTZcdTY3NUYvXHU5NzAwXHU2QzQyXHU1MTg1XHU1QkI5JyxcbiAgICAnY29uZmlybWVkLnBhdGhzJzogJ1x1Nzk4MVx1NjUzOVx1OERFRlx1NUY4NFx1RkYwOFx1OTAxN1x1NTNGN1x1NTIwNlx1OTY5NFx1RkYxQlx1NzZGOFx1NUJGOVx1OTg3OVx1NzZFRVx1NjgzOVx1NTk4MiBzcmMvY29yZVx1RkYwQ1x1NjIxNlx1N0VERFx1NUJGOVx1OERFRlx1NUY4NFx1RkYwOScsXG4gICAgJ2NvbmZpcm1lZC5ub25lJzogJ1x1NjY4Mlx1NjVFMFx1N0VBNlx1Njc1Rlx1MzAwMlx1NkRGQlx1NTJBMFx1NTQwRVx1RkYwQ0FJIFx1NEZFRVx1NjUzOVx1NjcyQ1x1OTg3OVx1NzZFRVx1NzY4NFx1Nzk4MVx1NjUzOVx1OERFRlx1NUY4NFx1NUMwNlx1ODhBQlx1ODFFQVx1NTJBOFx1NjJEMlx1N0VERFx1RkYwOFx1NEVDNVx1NUJGOVx1NjcyQ1x1OTg3OVx1NzZFRVx1NzUxRlx1NjU0OFx1RkYwOVx1MzAwMicsXG5cbiAgICAnY2hhbmdlcy50aXRsZSc6ICdcdTUzRDhcdTY2RjRcdTRFRkJcdTUyQTEnLFxuICAgICdzdGF0ZS5ub0NoYW5nZXMnOiAnXHU2NjgyXHU2NUUwXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExXHUzMDAyXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1NTIxQlx1NUVGQVx1RkYwQ1x1NjIxNlx1NzUyOFx1NEUwQVx1NjVCOVx1MzAwQ1x1NjVCMFx1NUVGQVx1NTNEOFx1NjZGNFx1MzAwRFx1MzAwMicsXG4gICAgJ2NoYW5nZXMuY29sLnRpdGxlJzogJ1x1NjgwN1x1OTg5OCcsXG4gICAgJ2NoYW5nZXMuY29sLnR5cGUnOiAnXHU3QzdCXHU1NzhCJyxcbiAgICAnY2hhbmdlcy5jb2wuc3RhdHVzJzogJ1x1NzJCNlx1NjAwMScsXG4gICAgJ2NoYW5nZXMuY29sLnVwZGF0ZWQnOiAnXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0JyxcbiAgICAnZXhlYy5jb2wuc3RhdHVzJzogJ1x1NzJCNlx1NjAwMScsXG4gICAgJ2V4ZWMuY29sLmNoYW5nZSc6ICdcdTUzRDhcdTY2RjQnLFxuICAgICdleGVjLmNvbC5zdGFydGVkJzogJ1x1NUYwMFx1NTlDQicsXG4gICAgJ2V4ZWMuY29sLmNvc3QnOiAnXHU2MjEwXHU2NzJDKFx1NEYzMCknLFxuICAgICdleGVjLmF0dGVtcHRzJzogJ1x1NUMxRFx1OEJENVx1NkIyMVx1NjU3MCcsXG4gICAgJ2V4ZWMuaGludCc6ICdcdTYyNjdcdTg4NENcdUZGMDhzdGFydF9ydW5cdUZGMDlcdThCRjdcdTU3MjhcdTUzRjNcdTRGQTdcdTgwNEFcdTU5MjlcdTRFMkRcdTUzRDFcdThENzdcdUZGMUFcdTUyMUJcdTVFRkFcdThCQTFcdTUyMTJcdTU0MEVcdTVCRjkgQUkgXHU4QkY0XHUzMDBDXHU1RjAwXHU1OUNCXHU2MjY3XHU4ODRDXHU4QkU1IGNoYW5nZVx1MzAwRFx1MzAwMlx1NjcyQ1x1OTg3NVx1NjdFNVx1NzcwQlx1OEZEQlx1NUVBNlx1NEUwRVx1N0VEM1x1Njc5Q1x1MzAwMicsXG4gICAgJ3N0YXRlLm5vUnVucyc6ICdcdTY2ODJcdTY1RTBcdTYyNjdcdTg4NENcdThCQjBcdTVGNTVcdTMwMDInLFxuICAgICdzdGF0ZS50ZWNoU3RhY2snOiAnXHU2MjgwXHU2NzJGXHU2ODA4JyxcbiAgICAnc3RhdGUuc3ltYm9scyc6ICdcdTVERjJcdTdEMjJcdTVGMTVcdTdCMjZcdTUzRjcnLFxuICAgICdzdGF0ZS5tYW5pZmVzdHMnOiAnXHU2RTA1XHU1MzU1XHU2NTg3XHU0RUY2JyxcbiAgICAnc3RhdGUuZXZpZGVuY2UnOiAnXHU4QkMxXHU2MzZFXHU2NzYxXHU3NkVFJyxcbiAgfSxcbiAgZW46IHtcbiAgICAnd29ya3NwYWNlLnRpdGxlJzogJ1JldmlldyBEZXNrJyxcbiAgICAndGFiLmNvbW1pdHMnOiAnQ29tbWl0IFJldmlldycsXG4gICAgJ3RhYi5vdmVydmlldyc6ICdPdmVydmlldycsXG4gICAgJ3RhYi5leGVjdXRpb24nOiAnRXhlY3V0aW9uJyxcbiAgICAndGFiLnJldmlldyc6ICdSZXZpZXcgaXNzdWVzJyxcbiAgICAndGFiLm5vdGVzJzogJ05vdGVzICYgTWVtb3J5JyxcbiAgICAndGFiLnNldHRpbmdzJzogJ1NldHRpbmdzJyxcbiAgICAnZXJyb3IubG9hZCc6ICdGYWlsZWQgdG8gbG9hZCcsXG4gICAgJ3N0YXRlLnByb2plY3QnOiAnQ3VycmVudCBwcm9qZWN0JyxcbiAgICAnc3RhdGUubm9Qcm9qZWN0JzogJ05vIHByb2plY3QgaW5pdGlhbGl6ZWQnLFxuICAgICdzdGF0ZS5ub1Byb2plY3RIaW50JzogJ1J1biBcIkluaXRpYWxpemUgcHJvamVjdFwiIHRvIHNjYW4gdGhlIHJlcG9zaXRvcnkgc3RydWN0dXJlLCB0ZWNoIHN0YWNrLCBhbmQgc3ltYm9sIGluZGV4LicsXG4gICAgJ2FjdGlvbi5ib290c3RyYXAnOiAnSW5pdGlhbGl6ZSBwcm9qZWN0JyxcbiAgICAnYWN0aW9uLnJlc2Nhbic6ICdSZS1pbml0aWFsaXplIC8gc2NhbicsXG4gICAgJ2FjdGlvbi5hbmFseXplJzogJ0FuYWx5emUgd29ya2luZyBkaWZmJyxcbiAgICAnYWN0aW9uLnJldmlldyc6ICdSZXZpZXcgd29ya2luZyBkaWZmJyxcbiAgICAnYWN0aW9uLnZlcmlmeSc6ICdWZXJpZnkgd29ya2luZyBkaWZmJyxcbiAgICAnYWN0aW9uLmNyZWF0ZUNoYW5nZSc6ICdDcmVhdGUgY2hhbmdlJyxcbiAgICAnYWN0aW9uLnJ1bm5pbmcnOiAnUnVubmluZ1x1MjAyNicsXG4gICAgJ2FjdGlvbi5yZWZyZXNoJzogJ1JlZnJlc2gnLFxuICAgICdmb3JtLmNoYW5nZVRpdGxlJzogJ0NoYW5nZSB0aXRsZScsXG4gICAgJ2Zvcm0uY2hhbmdlRGVzYyc6ICdSZXF1aXJlbWVudCBhbmQgYmFja2dyb3VuZCAob3B0aW9uYWwpJyxcbiAgICAncmVzdWx0LnBhbmVsJzogJ0FjdGlvbiByZXN1bHQnLFxuXG4gICAgJ3JlcG8uYWRkJzogJ0FkZCByZXBvJyxcbiAgICAncmVwby5hZGRIaW50JzogJ0VudGVyIGFuIGFic29sdXRlIHJlcG8gcGF0aCBhbmQgcHJlc3MgRW50ZXI7IHByZXZpb3VzbHkgdXNlZCByZXBvcyBhcmUgcmVtZW1iZXJlZCcsXG4gICAgJ3JlcG8uc2Nhbkhpc3RvcnknOiAnUmVidWlsZCBoaXN0b3J5JyxcbiAgICAncmVwby5jb21taXRzJzogJ2NvbW1pdHMnLFxuICAgICdyZXBvLmJyYW5jaCc6ICdicmFuY2gnLFxuICAgICdyZXBvLndvcmtpbmcnOiAnVW5jb21taXR0ZWQgY2hhbmdlcycsXG4gICAgJ3JlcG8ud29ya2luZ0NsZWFuJzogJ1dvcmtpbmcgdHJlZSBpcyBjbGVhbicsXG4gICAgJ3JlcG8uZW1wdHknOiAnTm8gY29tbWl0cy4nLFxuICAgICdyZXBvLmxvYWRGYWlsZWQnOiAnRmFpbGVkIHRvIGxvYWQgY29tbWl0cycsXG4gICAgJ3BpY2tlci50aXRsZSc6ICdQaWNrIGNvbW1pdHMgdG8gcmV2aWV3IChtdWx0aS1zZWxlY3QpJyxcbiAgICAncGlja2VyLnBsYWNlaG9sZGVyJzogJ0NsaWNrIHRvIHBpY2sgY29tbWl0cyAobXVsdGktc2VsZWN0LCBpbmNsdWRlcyB1bmNvbW1pdHRlZCknLFxuICAgICdwaWNrZXIuc2VsZWN0ZWQnOiAnU2VsZWN0ZWQnLFxuICAgICdwaWNrZXIuZmlsdGVyJzogJ0ZpbHRlciBieSB0aXRsZS9oYXNoL2F1dGhvclx1MjAyNicsXG4gICAgJ3BpY2tlci5jbGVhcic6ICdDbGVhcicsXG4gICAgJ3BpY2tlci5ub01hdGNoJzogJ05vIG1hdGNoaW5nIGNvbW1pdC4nLFxuICAgICdwaWNrZXIuaGludCc6ICdDaGVja2luZyBhIGNvbW1pdCBnZW5lcmF0ZXMgaXRzIEFJIGV4cGxhbmF0aW9uOyBydW4gaW1wYWN0IGFuZCBvcHRpbWFsaXR5IGJlbG93LicsXG4gICAgJ2ltcGFjdC5mYWN0b3JzJzogJ1Jpc2sgZmFjdG9ycyAod2h5IHRoaXMgbGV2ZWwpJyxcbiAgICAnaW1wYWN0LnBvaW50cyc6ICdJbXBhY3RlZCBwb2ludHMnLFxuICAgICdpbXBhY3Qua2V5UG9pbnRzJzogJ0tleSBjb21wb25lbnRzJyxcbiAgICAnaW1wYWN0Lm1lbW9yeSc6ICdDcm9zcy1jaGVjayB3aXRoIHByb2plY3QgbWVtb3J5JyxcbiAgICAnaW1wYWN0LmZ1bmN0aW9ucyc6ICdJbXBhY3RlZCBmdW5jdGlvbnMgKHdobyBjYWxscyB0aGUgY2hhbmdlZCBjb2RlKScsXG4gICAgJ2ltcGFjdC5mdW5jUm9sZSc6ICdGdW5jdGlvbiByb2xlJyxcbiAgICAnaW1wYWN0LmZ1bmNDaGFuZ2UnOiAnQ2hhbmdlZCBieSB0aGlzIGNvbW1pdCcsXG4gICAgJ2ltcGFjdC5mdW5jQ2FsbGVycyc6ICdJbXBhY3Qgb24gY2FsbGVycycsXG4gICAgJ2NhY2hlLmhpdCc6ICdmcm9tIGNhY2hlJyxcbiAgICAnY2FjaGUucmVnZW5lcmF0ZSc6ICdSZWdlbmVyYXRlJyxcbiAgICAnZXhlYy5jcmVhdGUnOiAnTmV3IHJ1bicsXG4gICAgJ2V4ZWMuZm9ybVRpdGxlJzogJ1doYXQgdG8gZG8gKG9uZSBsaW5lKScsXG4gICAgJ2V4ZWMuZm9ybURlc2MnOiAnUmVxdWlyZW1lbnQ6IGdvYWwsIG1vZHVsZXMsIGFjY2VwdGFuY2UnLFxuICAgICdleGVjLnN0YXJ0JzogJ1N0YXJ0IHJ1bicsXG4gICAgJ2V4ZWMuc3RhcnRpbmcnOiAnU3RhcnRpbmdcdTIwMjYnLFxuICAgICdleGVjLmNyZWF0ZUhpbnQnOiAnQ3JlYXRlcyBhIGNoYW5nZSwgZ2VuZXJhdGVzIGEgcGxhbiwgdGhlbiBBSSBzdWJhZ2VudHMgZXhlY3V0ZSBzdGVwIGJ5IHN0ZXA7IHByb2dyZXNzIHJlZnJlc2hlcyBiZWxvdy4nLFxuICAgICdleGVjLm1vZGVsRGVmYXVsdCc6ICdFeGVjdXRpb24gbW9kZWwgKHJvbGUgZGVmYXVsdHM6IGFuYWx5c2lzL29wcz1mYXN0LCBjb2Rpbmc9c3RhbmRhcmQsIHBsYW5uaW5nPXJlYXNvbmluZywgdmVyaWZpY2F0aW9uPXZlcmlmaWVyKScsXG4gICAgJ2JhZGdlLnJ1bm5pbmcnOiAne259IHJ1bnMgaW4gcHJvZ3Jlc3MsIGNsaWNrIHRvIHZpZXcnLFxuICAgICduYXJyYXRpdmUudGl0bGUnOiAnV29yay1yb3VuZCBuYXJyYXRpdmUnLFxuICAgICduYXJyYXRpdmUuZ2VuZXJhdGUnOiAnSW50ZXJwcmV0IHRoaXMgcm91bmQgb2Ygd29yaycsXG4gICAgJ25hcnJhdGl2ZS5ydW5uaW5nJzogJ0dlbmVyYXRpbmdcdTIwMjYgKH4xMC0zMHMpJyxcbiAgICAnYmFkZ2UuZmFpbGVkJzogJ3tufSBydW5zIG5lZWQgYXR0ZW50aW9uLCBjbGljayB0byB2aWV3JyxcbiAgICAnZXhlYy5mbG93Q3JlYXRlJzogJ0Rlc2NyaWJlIHRoZSB0YXNrJyxcbiAgICAnZXhlYy5mbG93T3JjaGVzdHJhdGUnOiAnQ29uZmlybSBvcmNoZXN0cmF0aW9uIChwZXItc3RlcCBtb2RlbC9yb2xlL2ZhaWx1cmUgcG9saWN5KScsXG4gICAgJ2V4ZWMuZmxvd1J1bic6ICdMYXVuY2ggKHRyYWNrIHByb2dyZXNzICYgY29zdCBpbiBydW4gZGV0YWlsKScsXG4gICAgJ2V4ZWMuZmxvd01lbW9yeSc6ICdBdXRvLWRpc3RpbGwgbWVtb3JpZXMgKGNvbmZpcm0gaW4gbWVtb3J5IHBhbmVsKScsXG4gICAgJ2V4ZWMucGxhbm5pbmcnOiAnR2VuZXJhdGluZyBvcmNoZXN0cmF0aW9uXHUyMDI2IChMTE0gaXMgZGVjb21wb3NpbmcgdGhlIHRhc2ssIH4xMC0zMHMpJyxcbiAgICAnZXhlYy5jb2wuc3RlcHMnOiAnU3RlcHMnLFxuICAgICdub3Rlcy5lZGl0JzogJ0VkaXQnLFxuICAgICdub3Rlcy50b01lbW9yeSc6ICdUbyBtZW1vcnknLFxuICAgICdub3Rlcy50b01lbW9yeUhpbnQnOiAnUHJlZmlsbCB0aGUgbWVtb3J5IGZvcm0gYmVsb3cgd2l0aCB0aGlzIG5vdGUnLFxuICAgICdub3Rlcy50b01lbW9yeURvbmUnOiAnXHUyNzEzIFByZWZpbGxlZCB0aGUgbWVtb3J5IGZvcm0gKGNob29zZSBhIHR5cGUgaW4gdGhlIFByb2plY3QgbWVtb3J5IHpvbmUgYmVsb3csIHRoZW4gYWRkKScsXG4gICAgJ25vdGVzLmNvcHlNZCc6ICdDb3B5IE1EJyxcbiAgICAnbm90ZXMuY29weU1kSGludCc6ICdDb3B5IHRoaXMgbm90ZSBhcyBNYXJrZG93biB0byB0aGUgY2xpcGJvYXJkJyxcbiAgICAnbm90ZXMuY29weU1kRG9uZSc6ICdDb3BpZWQgYXMgTWFya2Rvd24nLFxuICAgICdub3Rlcy5kaWdlc3ROZXZlcic6ICdObyBBSSBzdW1tYXJ5IGdlbmVyYXRlZCB5ZXQnLFxuICAgICdub3Rlcy5kaWdlc3RQZW5kaW5nJzogJ3tufSBuZXcgY29tbWl0cyBzaW5jZSB0aGUgbGFzdCBzdW1tYXJ5JyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlJzogJ1NhdmUgYXMgbm90ZScsXG4gICAgJ2RldGFpbC5zYXZlTm90ZUhpbnQnOiAnU2F2ZSB0aGlzIHJldmlldyBjb25jbHVzaW9uICh3aGF0L2xvZ2ljL3Jpc2tzKSBhcyBhIHN0cnVjdHVyZWQgbm90ZScsXG4gICAgJ2RldGFpbC5zYXZlTm90ZVRpdGxlJzogJ1JldmlldyByZWNvcmQnLFxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeSc6ICdEaXN0aWxsIHRvIG1lbW9yeScsXG4gICAgJ2RldGFpbC5zYXZlTWVtb3J5SGludCc6ICdEaXN0aWxsIHRoaXMgcmV2aWV3IGNvbmNsdXNpb24gaW50byBhIHByb2plY3QgbWVtb3J5IChxdWV1ZWQgZm9yIGNvbmZpcm1hdGlvbiknLFxuICAgICdub3Rlcy5zYXZlJzogJ1NhdmUnLFxuICAgICdub3Rlcy5jYW5jZWwnOiAnQ2FuY2VsJyxcbiAgICAnbWVtb3J5LmJyYW5jaFNjb3BlJzogJ0JyYW5jaCcsXG4gICAgJ21lbW9yeS5icmFuY2hBbGwnOiAnQWxsIGJyYW5jaGVzJyxcbiAgICAnbm90ZXMuc2VhcmNoJzogJ1NlYXJjaCBub3Rlc1x1MjAyNicsXG4gICAgJ21vZGVsLnRpdGxlJzogJ01vZGVsIGFzc2lnbm1lbnQgKHdoaWNoIG1vZGVsIHBlciB0YXNrKScsXG4gICAgJ21vZGVsLmxvYWRpbmcnOiAnTG9hZGluZyBtb2RlbHNcdTIwMjYnLFxuICAgICdtb2RlbC5mb2xsb3dDaGF0JzogJ0ZvbGxvdyBjaGF0IG1vZGVsJyxcbiAgICAnbW9kZWwuc2F2ZSc6ICdTYXZlICYgYXBwbHknLFxuICAgICdtb2RlbC5zYXZlZCc6ICdBcHBsaWVkJyxcbiAgICAnbW9kZWwuaGludCc6ICdBcHBsaWVzIGltbWVkaWF0ZWx5IGFuZCBwZXJzaXN0cyBhY3Jvc3MgcmVzdGFydHM7IGNoYXQgbW9kZWwgdW5hZmZlY3RlZC4nLFxuICAgICdub3Rlcy5haVN1bW1hcnknOiAnQUkgc3VtbWFyeScsXG4gICAgJ25vdGVzLmFpU3VtbWFyeVJ1bic6ICdTdW1tYXJpemluZ1x1MjAyNiAoMTAtMzBzKScsXG4gICAgJ25vdGVzLmV4cGFuZCc6ICdFeHBhbmQnLFxuICAgICdub3Rlcy5jb2xsYXBzZSc6ICdDb2xsYXBzZScsXG4gICAgJ25vdGVzLnN1bW1hcnlUYWcnOiAnQUkgc3VtbWFyeScsXG4gICAgJ25vdGVzLmVtcHR5U2VhcmNoJzogJ05vIG1hdGNoaW5nIG5vdGVzLicsXG4gICAgJ25vdGVzLmNvbnRlbnRIaW50JzogJ05vdGUgY29udGVudCAobXVsdGktbGluZSk6IGNvbmNsdXNpb25zLCBxdWVzdGlvbnMsIGxlYXJuaW5nc1x1MjAyNicsXG4gICAgJ25vdGVzLnRhZ3NIaW50JzogJ1RhZ3MgKGNvbW1hIHNlcGFyYXRlZCwgb3B0aW9uYWw7IGNsaWNrIGEgdGFnIHRvIGZpbHRlciknLFxuICAgICdub3Rlcy5waW4nOiAnUGluJyxcbiAgICAnbm90ZXMudW5waW4nOiAnVW5waW4nLFxuICAgICdub3Rlcy5lZGl0ZWRBdCc6ICdlZGl0ZWQnLFxuICAgICdyZXZpZXcuZmlsdGVyQWxsJzogJ0FsbCcsXG4gICAgJ3Jldmlldy5zdGF0dXNBbGwnOiAnQWxsIHN0YXR1c2VzJyxcbiAgICAncmV2aWV3LnZlcmlmeSc6ICdSZS12ZXJpZnknLFxuICAgICdyZXZpZXcudmVyaWZ5UnVubmluZyc6ICdWZXJpZnlpbmdcdTIwMjYnLFxuICAgICdyZXZpZXcudmVyaWZ5SGludCc6ICdBZnRlciBmaXhpbmcgdGhlIGNvZGUsIGNsaWNrIHRvIHJlLWNoZWNrOiB3aGV0aGVyIGlzc3VlcyBhcmUgZml4ZWQsIHdoZXRoZXIgdGhlIGNoYW5nZSBpcyBvcHRpbWFsIGFuZCBtaW5pbWFsbHkgaW52YXNpdmUsIGFuZCB3aGV0aGVyIG5ldyBpc3N1ZXMgYXBwZWFyZWQuIE9ubHkgYSBwYXNzaW5nIHJlLXZlcmlmaWNhdGlvbiBtYXJrcyBpc3N1ZXMgcmVzb2x2ZWQuJyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmUnOiAnRmFsc2UgcG9zaXRpdmUnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZUhpbnQnOiAnSHVtYW4tbWFyayB0aGlzIGlzc3VlIGFzIGEgZmFsc2UgcG9zaXRpdmUgYW5kIGNsb3NlIGl0IChkaXN0aW5jdCBmcm9tIGEgdmVyaWZpZWQgZml4KScsXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlVGl0bGUnOiAnTWFyayBhcyBmYWxzZSBwb3NpdGl2ZT8nLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZU1zZyc6ICdcInt0aXRsZX1cIiB3aWxsIGJlIG1hcmtlZCByZWplY3RlZCBhbmQgcmVtb3ZlZCBmcm9tIHRoZSBvcGVuIHF1ZXVlLicsXG4gICAgJ3Jldmlldy5maXhEZXRhaWwnOiAnRml4IGRldGFpbHMnLFxuICAgICdyZXZpZXcuZml4U3RhdEZpbGVzJzogJ2ZpbGVzJyxcbiAgICAncmV2aWV3LmZpeEZpbGVzJzogJ0ZpbGVzIHRvdWNoZWQgYnkgdGhlIGZpeCcsXG4gICAgJ3Jldmlldy5maXhJbXBhY3QnOiAnSW1wYWN0IHNjb3BlIChjaGFuZ2VkIHN5bWJvbHMgYW5kIGNhbGxlcnMpJyxcbiAgICAncmV2aWV3LmRlZmluZWRJbic6ICdkZWZpbmVkIGluJyxcbiAgICAncmV2aWV3LmNhbGxDb3VudCc6ICdjYWxsIHNpdGUocyknLFxuICAgICdyZXZpZXcuZml4RGlmZic6ICdGaXggZGlmZiAocmVsYXRpdmUgdG8gdGhlIHJldmlldyBiYXNlbGluZSknLFxuICAgICdyZXZpZXcucmVmcmVzaCc6ICdSZWZyZXNoJyxcbiAgICAncmV2aWV3LnJldGVudGlvbkhpbnQnOiAnUmVzb2x2ZWQgaXNzdWVzIGFyZSBhdXRvLXB1cmdlZCBhZnRlciB7ZGF5c30gZGF5KHMpJyxcbiAgICAncmV2aWV3LnRhcmdldCc6ICdUYXJnZXQnLFxuICAgICdyZXZpZXcud29ya2luZ1RhcmdldCc6ICdXb3JraW5nIHRyZWUnLFxuXG4gICAgJ3BsYW4udGl0bGUnOiAnT3JjaGVzdHJhdGlvbiBwbGFuJyxcbiAgICAncGxhbi5oaW50JzogJ0VhY2ggc3RlcCByb2xlIGRyaXZlcyBjb250ZXh0IGluamVjdGlvbiBhbmQgdGhlIGRlZmF1bHQgbW9kZWwgKGFuYWx5c2lzL29wcz1mYXN0LCBjb2Rpbmc9c3RhbmRhcmQsIHBsYW5uaW5nPXJlYXNvbmluZywgdmVyaWZpY2F0aW9uPXZlcmlmaWVyKTsgYWRqdXN0IGJlZm9yZSBsYXVuY2hpbmcuJyxcbiAgICAncGxhbi5jb2wuc3RlcCc6ICdTdGVwJywgJ3BsYW4uY29sLnJvbGUnOiAnUm9sZScsICdwbGFuLmNvbC5tb2RlbCc6ICdNb2RlbCcsICdwbGFuLmNvbC5wb2xpY3knOiAnRmFpbHVyZSBwb2xpY3knLCAncGxhbi5jb2wuZW5hYmxlZCc6ICdPbicsICdwbGFuLmNvbC5hdHRlbXB0cyc6ICdBdHRlbXB0cycsXG4gICAgJ3BsYW4ubW9kZWxEZWZhdWx0JzogJ1JvbGUgZGVmYXVsdCcsXG4gICAgJ3BsYW4ubGF1bmNoRWRpdGVkJzogJ1NhdmUgZWRpdHMgJiBsYXVuY2gnLFxuICAgICdwbGFuLmxhdW5jaERpcmVjdCc6ICdMYXVuY2ggYXMtaXMnLFxuICAgICdwbGFuLmRpc2NhcmQnOiAnRGlzY2FyZCcsXG4gICAgJ3BsYW4udmlld0RldGFpbCc6ICdEZXRhaWwnLCAncGxhbi5yZWZyZXNoRGV0YWlsJzogJ1JlZnJlc2gnLCAncGxhbi5jbG9zZURldGFpbCc6ICdDbG9zZScsXG4gICAgJ3BsYW4uZGV0YWlsVGl0bGUnOiAnUnVuIGRldGFpbCcsXG4gICAgJ3BsYW4ucGF1c2VkQmFubmVyJzogJ1J1biBwYXVzZWQsIGF3YWl0aW5nIHlvdXIgZGVjaXNpb24nLFxuICAgICdwbGFuLnJlc3VtZVJldHJ5JzogJ1JldHJ5IHN0ZXAgJiBjb250aW51ZScsXG4gICAgJ3BsYW4ucmVzdW1lU2tpcCc6ICdTa2lwIHN0ZXAgJiBjb250aW51ZScsXG4gICAgJ3BsYW4ucmVzdW1lRmFpbGVkJzogJ1Jlc3VtZSBmcm9tIGZhaWx1cmUnLFxuICAgICdwbGFuLmNvbnRleHRUaXRsZSc6ICdSdW4gY29udGV4dCAod2hhdCB3YXMgaW5qZWN0ZWQpJyxcbiAgICAncGxhbi5icmFuY2gnOiAnQnJhbmNoJywgJ3BsYW4uaW5qZWN0ZWRNZW1vcmllcyc6ICdJbmplY3RlZCBtZW1vcmllcycsICdwbGFuLmRlY2lzaW9uTG9nJzogJ0RlY2lzaW9uIGxvZycsXG4gICAgJ2V4ZWMuY29sLmRldGFpbCc6ICdEZXRhaWwnLFxuXG4gICAgJ3NjaGVkLnRpdGxlJzogJ1NjaGVkdWxlZCB0YXNrcycsXG4gICAgJ3NjaGVkLmZvcm1OYW1lJzogJ1Rhc2sgbmFtZScsICdzY2hlZC5mb3JtSW50ZXJ2YWwnOiAnSW50ZXJ2YWwgKG1pbnV0ZXMpJyxcbiAgICAnc2NoZWQudHlwZVJldmlldyc6ICdBdXRvIHJldmlldycsICdzY2hlZC50eXBlU3VtbWFyeSc6ICdBSSBzdW1tYXJ5JywgJ3NjaGVkLnR5cGVSdW4nOiAnVGltZWQgcnVuJyxcbiAgICAnc2NoZWQuYWRkJzogJ0NyZWF0ZScsXG4gICAgJ3NjaGVkLmhpbnQnOiAnUnVucyBhdXRvbWF0aWNhbGx5IHdoZW4gZHVlOiBhdXRvIHJldmlldyA9IHJldmlldyBjb21taXRzIGZyb20gdGhlIGxhc3QgMjRoIChpc3N1ZXMgbGFuZCBpbiB0aGUgUmV2aWV3IHRhYik7IEFJIHN1bW1hcnkgPSBpbmNyZW1lbnRhbCBsZWFybmluZyBzdW1tYXJ5OyB0aW1lZCBydW4gPSBleGVjdXRlIHRoZSB0ZW1wbGF0ZSBhcyBhbiBvcmNoZXN0cmF0ZWQgdGFzay4gTWluaW11bSAxIG1pbnV0ZS4nLFxuICAgICdzY2hlZC5lbXB0eSc6ICdObyBzY2hlZHVsZWQgdGFza3MgeWV0LicsXG4gICAgJ3NjaGVkLmNvbC5uYW1lJzogJ05hbWUnLCAnc2NoZWQuY29sLnR5cGUnOiAnVHlwZScsICdzY2hlZC5jb2wuaW50ZXJ2YWwnOiAnQ3ljbGUnLCAnc2NoZWQuY29sLm5leHQnOiAnTmV4dCBydW4nLCAnc2NoZWQuY29sLmxhc3RSZXN1bHQnOiAnTGFzdCByZXN1bHQnLCAnc2NoZWQuY29sLmFjdGlvbnMnOiAnQWN0aW9ucycsXG4gICAgJ3NjaGVkLmRheSc6ICcgZCcsICdzY2hlZC5ob3VyJzogJyBoJywgJ3NjaGVkLm1pbnV0ZSc6ICcgbWluJyxcbiAgICAnc2NoZWQuZGlzYWJsZSc6ICdQYXVzZScsICdzY2hlZC5lbmFibGUnOiAnRW5hYmxlJywgJ3NjaGVkLnJ1bk5vdyc6ICdSdW4gbm93JyxcblxuICAgICdtZW1vcnkuem9uZVRpdGxlJzogJ1Byb2plY3QgbWVtb3J5JyxcbiAgICAnbWVtb3J5LnN5bmNCYXNlbGluZSc6ICdTeW5jIGJhc2VsaW5lJywgJ21lbW9yeS5zeW5jTm9uZSc6ICduZXZlciBzeW5jZWQnLFxuICAgICdtZW1vcnkuYmVoaW5kJzogJ3tufSBjb21taXRzIGJlaGluZCcsXG4gICAgJ21lbW9yeS5zeW5jJzogJ1N5bmMgbWVtb3J5JywgJ21lbW9yeS5zeW5jaW5nJzogJ1N5bmNpbmdcdTIwMjYnLCAnbWVtb3J5LnN5bmNGYWlsZWQnOiAnU3luYyBmYWlsZWQnLFxuICAgICdtZW1vcnkuc3RhbGVUaXRsZSc6ICdQb3NzaWJseSBzdGFsZSAocmVsYXRlZCBjb2RlIGNoYW5nZWQ7IHJldmlldyBuZWVkZWQpJyxcbiAgICAnbWVtb3J5Lm1hcmtTdGFsZSc6ICdNYXJrIHN0YWxlJywgJ21lbW9yeS5hcmNoaXZlQnRuJzogJ0FyY2hpdmUnLCAnbWVtb3J5LmtlZXBBY3RpdmUnOiAnU3RpbGwgdmFsaWQnLFxuICAgICdtZW1vcnkubmV3Q2FuZGlkYXRlcyc6ICdOZXcgY2FuZGlkYXRlcyAocXVldWVkIGZvciBjb25maXJtYXRpb24pOicsXG4gICAgJ21lbW9yeS5jbG9zZVJlcG9ydCc6ICdDbG9zZSByZXBvcnQnLFxuICAgICdtZW1vcnkuc2NvcGVQcm9qZWN0JzogJ01haW5saW5lIChhbGwgYnJhbmNoZXMpJywgJ21lbW9yeS5zY29wZUJyYW5jaCc6ICdDdXJyZW50IGJyYW5jaCBvbmx5JyxcbiAgICAnbWVtb3J5LnBlbmRpbmdRdWV1ZSc6ICdQZW5kaW5nIGNvbmZpcm1hdGlvbicsXG4gICAgJ21lbW9yeS50b05vdGUnOiAnVG8gbm90ZScsICdtZW1vcnkubm9ybWFsaXplJzogJ05vcm1hbGl6ZSB0byBtYWlubGluZScsICdtZW1vcnkucmVzdG9yZSc6ICdSZXN0b3JlJyxcbiAgICAnbWVtb3J5LnN0YXR1c1N0YWxlJzogJ1N0YWxlJyxcbiAgICAnZnMuYnJvd3NlJzogJ0Jyb3dzZScsXG4gICAgJ2ZzLnVwJzogJ1VwJyxcbiAgICAnZnMudXNlJzogJ1VzZSB0aGlzIGRpcmVjdG9yeScsXG4gICAgJ2ZzLnJlZ2lzdGVyJzogJ0Fsc28gcmVnaXN0ZXIgYXMgc2Vzc2lvbiB3b3Jrc3BhY2UnLFxuICAgICdmcy5sb2FkaW5nJzogJ1JlYWRpbmdcdTIwMjYnLFxuICAgICdmcy5lbXB0eSc6ICdObyBzdWJkaXJlY3Rvcmllcy4nLFxuICAgICdpbXBhY3QuZnVuY3Rpb25zTm9uZSc6ICdObyBmdW5jdGlvbi1sZXZlbCBjYWxsIGltcGFjdCBkZXRlY3RlZCAoc3R5bGUvYXNzZXQvY29uZmlnLW9ubHkgY2hhbmdlKS4nLFxuICAgICdyZXZpZXcuY29sLnNldmVyaXR5JzogJ1NldmVyaXR5JyxcbiAgICAncmV2aWV3LmNvbC5jYXRlZ29yeSc6ICdDYXRlZ29yeScsXG4gICAgJ3Jldmlldy5jb2wudGl0bGUnOiAnSXNzdWUnLFxuICAgICdyZXZpZXcuY29sLmV2aWRlbmNlJzogJ0xvY2F0aW9uJyxcbiAgICAncmV2aWV3LmNvbC5maXgnOiAnU3VnZ2VzdGVkIGZpeCcsXG4gICAgJ3Jldmlldy5oaW50JzogJ0NsaWNrIHRoZSBidXR0b24gYWJvdmUgdG8gcHJvZHVjZSB0aGUgb3B0aW1hbGl0eSB2ZXJkaWN0IGFuZCBpc3N1ZSBsaXN0LicsXG4gICAgJ2RpZmYuc2hvdyc6ICdEaWZmJyxcbiAgICAnZGlmZi5oaWRlJzogJ0hpZGUgZGlmZicsXG5cbiAgICAnZGV0YWlsLnRpdGxlJzogJ1JldmlldyBkZXRhaWwnLFxuICAgICdkZXRhaWwucGljayc6ICdcdTIxOTAgUGljayBhIGNvbW1pdCAob3IgdGhlIHVuY29tbWl0dGVkIGNoYW5nZXMpIG9uIHRoZSBsZWZ0IHRvIHN0YXJ0IHJldmlld2luZycsXG4gICAgJ2RldGFpbC53aGF0JzogJ1doYXQgaXQgZG9lcycsXG4gICAgJ2RldGFpbC5sb2dpYyc6ICdJbXBsZW1lbnRhdGlvbiBsb2dpYycsXG4gICAgJ2RldGFpbC5yaXNrJzogJ1Jpc2tzJyxcbiAgICAnZGV0YWlsLmZpbGVzJzogJ0ZpbGVzJyxcbiAgICAnZGV0YWlsLnBhdGNoJzogJ1Nob3cgcmF3IHBhdGNoJyxcbiAgICAnZGV0YWlsLmFpTG9hZGluZyc6ICdHZW5lcmF0aW5nIEFJIGV4cGxhbmF0aW9uXHUyMDI2ICgxMC0zMHMpJyxcbiAgICAnZGV0YWlsLmltcGFjdCc6ICdJbXBhY3Qgc2NvcGUnLFxuICAgICdkZXRhaWwuaW1wYWN0TG9hZGluZyc6ICdTY2FubmluZyBpbXBhY3RcdTIwMjYgKHJlZmVyZW5jZSBzZWFyY2ggKyBncmFwaCB3YWxrKScsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5JzogJ09wdGltYWxpdHkgcmV2aWV3JyxcbiAgICAnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJzogJ1Jldmlld2luZ1x1MjAyNiAocHJvZHVjZXMgaXNzdWUgbGlzdCBhbmQgb3B0aW1hbGl0eSB2ZXJkaWN0KScsXG5cbiAgICAnaW1wYWN0LnJpc2snOiAnUmlzaycsXG4gICAgJ2ltcGFjdC5jb2wuY2hhbmdlZCc6ICdDaGFuZ2VkIGZpbGVzJyxcbiAgICAnaW1wYWN0LmNvbC5pbmRpcmVjdCc6ICdJbmRpcmVjdCAocmVmZXJlbmNlIGNoYWluKScsXG4gICAgJ2ltcGFjdC5jb2wucG90ZW50aWFsJzogJ1BvdGVudGlhbCcsXG4gICAgJ2ltcGFjdC5ub25lJzogJ05vIGluLXJlcG8gcmVmZXJlbmNlcnMgZm91bmQgKHRoZSBjaGFuZ2UgbG9va3Mgc2VsZi1jb250YWluZWQpLicsXG4gICAgJ2ltcGFjdC50ZXN0cyc6ICdSZWxhdGVkIHRlc3RzJyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5jaGFuZ2VkJzogJ2NoYW5nZWQnLFxuICAgICdpbXBhY3QubGVnZW5kLmluZGlyZWN0JzogJ2luZGlyZWN0JyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5wb3RlbnRpYWwnOiAncG90ZW50aWFsJyxcblxuICAgICdyZXZpZXcudmVyZGljdCc6ICdPcHRpbWFsaXR5IHZlcmRpY3QnLFxuICAgICdyZXZpZXcuaXNzdWVzJzogJ0lzc3VlcycsXG4gICAgJ3Jldmlldy5jbGVhbic6ICdObyBpc3N1ZXMgZm91bmQuJyxcblxuICAgICdub3Rlcy50aXRsZSc6ICdSZXZpZXcgbm90ZXMnLFxuICAgICdub3Rlcy5mb3JtVGl0bGUnOiAnTm90ZSB0aXRsZScsXG4gICAgJ25vdGVzLmZvcm1Db250ZW50JzogJ05vdGUgY29udGVudCAoY29uY2x1c2lvbnMsIHF1ZXN0aW9ucywgbGVhcm5pbmdzXHUyMDI2KScsXG4gICAgJ25vdGVzLmFkZCc6ICdBZGQgbm90ZScsXG4gICAgJ25vdGVzLmJvdW5kVG8nOiAnV2lsbCBiZSBsaW5rZWQgdG8nLFxuICAgICdub3Rlcy5jb2wudGltZSc6ICdUaW1lJyxcbiAgICAnbm90ZXMuY29sLnRpdGxlJzogJ1RpdGxlJyxcbiAgICAnbm90ZXMuY29sLmNvbnRlbnQnOiAnQ29udGVudCcsXG4gICAgJ25vdGVzLmNvbC5zaGEnOiAnQ29tbWl0JyxcbiAgICAnbm90ZXMucmVtb3ZlJzogJ0RlbGV0ZScsXG4gICAgJ25vdGVzLmVtcHR5JzogJ05vIG5vdGVzIHlldC4gTm90ZSBkb3duIGNvbmNsdXNpb25zIGFuZCBxdWVzdGlvbnMgd2hpbGUgcmV2aWV3aW5nIGNvbW1pdHMgXHUyMDE0IHRoYXQgaXMgeW91ciBwcm9qZWN0IGxlYXJuaW5nIGFyY2hpdmUuJyxcblxuICAgICdtZW1vcnkucmVjb3JkJzogJ1JlY29yZCBwcm9qZWN0IG1lbW9yeScsXG4gICAgJ2Zvcm0ubWVtb3J5VGl0bGUnOiAnTWVtb3J5IHRpdGxlJyxcbiAgICAnZm9ybS5tZW1vcnlDb250ZW50JzogJ01lbW9yeSBjb250ZW50ICh3aGF0IGFuZCB3aHkpJyxcbiAgICAnbWVtb3J5LmNvbC50aXRsZSc6ICdJdGVtJyxcbiAgICAnbWVtb3J5LmNvbC50eXBlJzogJ1R5cGUnLFxuICAgICdtZW1vcnkuY29sLnRydXRoJzogJ1RydXRoJyxcbiAgICAnbWVtb3J5LmNvbC5icmFuY2gnOiAnQnJhbmNoJyxcbiAgICAnbWVtb3J5LmNvbmZpcm0nOiAnQ29uZmlybScsXG4gICAgJ21lbW9yeS5lbXB0eSc6ICdObyBwcm9qZWN0IG1lbW9yaWVzIHlldC4gQXNrIHRoZSBBSSBpbiBjaGF0IHRvIHJlY29yZCBvbmUsIG9yIGFkZCBhYm92ZS4nLFxuICAgICdjb25jZXB0cy50aXRsZSc6ICdMZWFybmluZyBjb25jZXB0cycsXG4gICAgJ2NvbmNlcHRzLm5vbmUnOiAnTm8gbGVhcm5pbmcgY29uY2VwdHMgeWV0LiBUaGV5IGFjY3VtdWxhdGUgYWZ0ZXIgc3VjY2Vzc2Z1bCBjaGFuZ2UgcnVucywgb3IgYXNrIHRoZSBBSSB0byBzdW1tYXJpemUgbGVhcm5pbmcgcG9pbnRzLicsXG4gICAgJ2NvbmNlcHRzLmNvbC5uYW1lJzogJ0NvbmNlcHQnLFxuICAgICdjb25jZXB0cy5jb2wuY2F0ZWdvcnknOiAnQ2F0ZWdvcnknLFxuICAgICdjb25jZXB0cy5jb2wuY291bnQnOiAnQ291bnQnLFxuICAgICdyZXZpZXcucmVjb3Jkc1RpdGxlJzogJ1JldmlldyBpc3N1ZXMnLFxuICAgICdyZXZpZXcucmVjb3Jkc0VtcHR5JzogJ05vIGlzc3VlIHJlY29yZHMgeWV0LiBJc3N1ZXMgZm91bmQgYnkgdGhlIGNvbW1pdC1yZXZpZXcgcGFnZSBhcmUgcmVjb3JkZWQgaGVyZSBhdXRvbWF0aWNhbGx5OyByZS1yZXZpZXdpbmcgcmVwbGFjZXMgb2xkIHJlY29yZHMuJyxcbiAgICAndmVyaWZ5LnJlY29yZHMnOiAnVmVyaWZpY2F0aW9uIHJlY29yZHMnLFxuICAgICd2ZXJpZnkucmVjb3Jkc0VtcHR5JzogJ05vIHZlcmlmaWNhdGlvbiByZWNvcmRzIHlldC4gQ2xpY2sgXCJWZXJpZnlcIiBpbiB0aGUgZXhlY3V0aW9uIHRhYiB0byBnZW5lcmF0ZSBvbmUuJyxcblxuICAgICdjb25maXJtZWQudGl0bGUnOiAnQ29uZmlybWVkIGNvbnN0cmFpbnRzIChodW1hbi1jb25maXJtZWQ7IEFJIGVkaXRzIHRvIGZvcmJpZGRlbiBwYXRocyBhcmUgYXV0by1kZW5pZWQpJyxcbiAgICAnY29uZmlybWVkLmFkZCc6ICdBZGQgY29uc3RyYWludCcsXG4gICAgJ2NvbmZpcm1lZC50ZXh0JzogJ1JlcXVpcmVtZW50IC8gY29uc3RyYWludCB0ZXh0JyxcbiAgICAnY29uZmlybWVkLnBhdGhzJzogJ0ZvcmJpZGRlbiBwYXRocyAoY29tbWEgc2VwYXJhdGVkOyByZWxhdGl2ZSB0byBwcm9qZWN0IHJvb3QgbGlrZSBzcmMvY29yZSwgb3IgYWJzb2x1dGUpJyxcbiAgICAnY29uZmlybWVkLm5vbmUnOiAnTm8gY29uc3RyYWludHMgeWV0LiBPbmNlIGFkZGVkLCBBSSBlZGl0cyB0byBmb3JiaWRkZW4gcGF0aHMgaW4gdGhpcyBwcm9qZWN0IGFyZSBhdXRvLWRlbmllZC4nLFxuXG4gICAgJ2NoYW5nZXMudGl0bGUnOiAnQ2hhbmdlIHRhc2tzJyxcbiAgICAnc3RhdGUubm9DaGFuZ2VzJzogJ05vIGNoYW5nZSB0YXNrcyB5ZXQuIEFzayB0aGUgQUkgaW4gY2hhdCB0byBjcmVhdGUgb25lLCBvciB1c2UgXCJDcmVhdGUgY2hhbmdlXCIgYWJvdmUuJyxcbiAgICAnY2hhbmdlcy5jb2wudGl0bGUnOiAnVGl0bGUnLFxuICAgICdjaGFuZ2VzLmNvbC50eXBlJzogJ1R5cGUnLFxuICAgICdjaGFuZ2VzLmNvbC5zdGF0dXMnOiAnU3RhdHVzJyxcbiAgICAnY2hhbmdlcy5jb2wudXBkYXRlZCc6ICdVcGRhdGVkJyxcbiAgICAnZXhlYy5jb2wuc3RhdHVzJzogJ1N0YXR1cycsXG4gICAgJ2V4ZWMuY29sLmNoYW5nZSc6ICdDaGFuZ2UnLFxuICAgICdleGVjLmNvbC5zdGFydGVkJzogJ1N0YXJ0ZWQnLFxuICAgICdleGVjLmNvbC5jb3N0JzogJ0Nvc3QgKGVzdCknLFxuICAgICdleGVjLmF0dGVtcHRzJzogJ0F0dGVtcHRzJyxcbiAgICAnZXhlYy5oaW50JzogJ1J1bnMgKHN0YXJ0X3J1bikgYXJlIHN0YXJ0ZWQgZnJvbSBjaGF0OiBhZnRlciBhIHBsYW4gZXhpc3RzLCB0ZWxsIHRoZSBBSSB0byBcInN0YXJ0IHJ1biBmb3IgdGhlIGNoYW5nZVwiLiBUaGlzIHRhYiBzaG93cyBwcm9ncmVzcyBhbmQgcmVzdWx0cy4nLFxuICAgICdzdGF0ZS5ub1J1bnMnOiAnTm8gcnVucyB5ZXQuJyxcbiAgICAnc3RhdGUudGVjaFN0YWNrJzogJ1RlY2ggc3RhY2snLFxuICAgICdzdGF0ZS5zeW1ib2xzJzogJ0luZGV4ZWQgc3ltYm9scycsXG4gICAgJ3N0YXRlLm1hbmlmZXN0cyc6ICdNYW5pZmVzdHMnLFxuICAgICdzdGF0ZS5ldmlkZW5jZSc6ICdFdmlkZW5jZSBlbnRyaWVzJyxcbiAgfSxcbn0gYXMgY29uc3RcblxuZnVuY3Rpb24gZmFsbGJhY2tUKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgZGljdCA9IFdPUktTUEFDRV9ESUNULnpoIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbiAgcmV0dXJuIGRpY3Rba2V5XSA/PyBrZXlcbn1cblxuLyoqIFx1NjRDRFx1NEY1Q1x1N0VEM1x1Njc5Q1x1NEVCQVx1NjAyN1x1NTMxNlx1RkYxQVx1MjcxMy9cdTI3MTcgKyBcdTY4MDdcdTkxQ0ZcdTVCNTdcdTZCQjVcdTc2ODRcdTdEMjdcdTUxRDFcdTg4NENcdUZGMDhcdThERjNcdThGQzdcdTVENENcdTU5NTdcdTVCRjlcdThDNjFcdTRFMEVcdTUzOUZcdTU5Q0IgSlNPTlx1RkYwOVx1MzAwMiAqL1xuZnVuY3Rpb24gZm9ybWF0QWN0aW9uUmVzdWx0KGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogc3RyaW5nIHtcbiAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW2RhdGFbJ29rJ10gPT09IGZhbHNlID8gJ1x1MjcxNycgOiAnXHUyNzEzJ11cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YSkpIHtcbiAgICBpZiAoa2V5ID09PSAnb2snKSBjb250aW51ZVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIGxpbmVzLnB1c2goYCR7a2V5fVx1RkYxQSR7U3RyaW5nKHZhbHVlKS5zbGljZSgwLCAyMDApfWApXG4gICAgfVxuICB9XG4gIGlmIChsaW5lcy5sZW5ndGggPT09IDEpIGxpbmVzLnB1c2goJ1x1NjIxMFx1NTI5RicpXG4gIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKVxufVxuXG5jb25zdCBzdHlsZXM6IFJlY29yZDxzdHJpbmcsIFJlYWN0LkNTU1Byb3BlcnRpZXM+ID0ge1xuICByb290OiB7XG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxuICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBmb250RmFtaWx5OiAndmFyKC0tZHMtZm9udC1zYW5zLCBpbmhlcml0KScsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICB9LFxuICBuYXY6IHtcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgZ2FwOiAnNHB4JyxcbiAgICBwYWRkaW5nOiAnOHB4IDEycHgnLFxuICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwxLCByZ2JhKDUsNSw1LDAuMSkpJyxcbiAgICBmbGV4OiAnbm9uZScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXG4gIH0sXG4gIHRpdGxlOiB7IGZvbnRTaXplOiAnMTNweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luSW5saW5lRW5kOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9LFxuICB0YWI6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XG4gICAgcGFkZGluZzogJzVweCAxMnB4JyxcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxuICAgIGJvcmRlcjogJ25vbmUnLFxuICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgYmFja2dyb3VuZDogYWN0aXZlID8gJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgOiAndHJhbnNwYXJlbnQnLFxuICAgIGNvbG9yOiBhY3RpdmUgPyAnI2ZmZicgOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxuICB9KSxcbiAgYm9keTogeyBmbGV4OiAxLCBvdmVyZmxvd1k6ICdhdXRvJywgcGFkZGluZzogJzE0cHggMTZweCcgfSxcbiAgY2FyZDoge1xuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICBwYWRkaW5nOiAnMTJweCAxNHB4JyxcbiAgICBtYXJnaW5Cb3R0b206ICcxMnB4JyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJyxcbiAgfSxcbiAgcm93OiB7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMThweCcsIGZsZXhXcmFwOiAnd3JhcCcsIGZvbnRTaXplOiAnMTJweCcsIG1hcmdpbjogJzZweCAwJyB9LFxuICBsYWJlbDogeyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luSW5saW5lRW5kOiAnNnB4JyB9LFxuICB0YWJsZTogeyB3aWR0aDogJzEwMCUnLCBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJywgZm9udFNpemU6ICcxMnB4JyB9LFxuICB0aDogeyB0ZXh0QWxpZ246ICdzdGFydCcsIHBhZGRpbmc6ICc2cHggOHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDEsIHJnYmEoNSw1LDUsMC4xKSknLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZm9udFdlaWdodDogNTAwIH0sXG4gIHRkOiB7IHBhZGRpbmc6ICc2cHggOHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDMsIHJnYmEoNSw1LDUsMC4wNikpJyB9LFxuICBlbXB0eTogeyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZm9udFNpemU6ICcxMnB4JywgcGFkZGluZzogJzEwcHggNHB4JyB9LFxuICBidXR0b246IHtcbiAgICBwYWRkaW5nOiAnNXB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgLy8gYnV0dG9uLWluZm8tZmlsbCBcdTY2MkZcdTVCQkZcdTRFM0JcdTRFMjRcdTRFMkFcdTRFM0JcdTk4OThcdTRFMEJcdTkwRkRcdTRFM0FcdTg0RERcdTgyNzJcdTMwMDFcdTc2N0RcdTVCNTdcdTUzRUZcdThCRkJcdTc2ODRcdTRFM0JcdTY0Q0RcdTRGNUNcdTgyNzJcdUZGMDhicmFuZC1wcmltYXJ5IFx1NTcyOFx1NkRGMVx1ODI3Mlx1NEUzQlx1OTg5OFx1NjYyRlx1OEZEMVx1NzY3RFx1ODI3Mlx1RkYwQ1x1NzY3RFx1NUI1N1x1NEUwRFx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlxuICAgIGZvbnRTaXplOiAnMTFweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYnV0dG9uLWluZm8tZmlsbCwgIzI1NjNlYiknLCBjb2xvcjogJyNmZmYnLFxuICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICB9LFxuICBzZWNvbmRhcnk6IHtcbiAgICBwYWRkaW5nOiAnNXB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICcxMXB4JyxcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScsXG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIH0sXG4gIGlucHV0OiB7XG4gICAgd2lkdGg6ICcxMDAlJywgcGFkZGluZzogJzZweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgZm9udFNpemU6ICcxMnB4JyxcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScsXG4gICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gIH0sXG4gIGZvcm1Sb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnNnB4JywgbWFyZ2luQm90dG9tOiAnOHB4JyB9LFxuICBmb3JtSW5saW5lOiB7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzhweCcgfSxcbiAgLy8gc2VsZWN0IFx1NzUyOFx1N0NGQlx1N0VERlx1NTkxNlx1ODlDMlx1NjVGNiBXaW5kb3dzIFx1NkQ0NVx1ODI3Mlx1NkEyMVx1NUYwRlx1NEUwQlx1NUYzQVx1NTIzNlx1NzY3RFx1NUU5NVx1RkYwQ1x1NkRGMVx1ODI3Mlx1NEUzQlx1OTg5OFx1NEUwQlx1NEUwRFx1NTNFRlx1OEJGQlx1MjAxNFx1MjAxNFx1ODFFQVx1N0VEOFx1NTkxNlx1ODlDMlx1OEQ3MFx1NEUzQlx1OTg5OFx1NTNEOFx1OTFDRlx1MzAwMlxuICBzZWxlY3Q6IHtcbiAgICBhcHBlYXJhbmNlOiAnbm9uZScsIFdlYmtpdEFwcGVhcmFuY2U6ICdub25lJyxcbiAgICBwYWRkaW5nOiAnNnB4IDI2cHggNnB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7dXRmOCw8c3ZnIHhtbG5zPSUyMmh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJTIyIHdpZHRoPSUyMjEwJTIyIGhlaWdodD0lMjI2JTIyPjxwYXRoIGQ9JTIyTTEgMWw0IDQgNC00JTIyIHN0cm9rZT0lMjIlMjM4ODglMjIgc3Ryb2tlLXdpZHRoPSUyMjEuNSUyMiBmaWxsPSUyMm5vbmUlMjIvPjwvc3ZnPlwiKScsXG4gICAgYmFja2dyb3VuZFJlcGVhdDogJ25vLXJlcGVhdCcsIGJhY2tncm91bmRQb3NpdGlvbjogJ3JpZ2h0IDhweCBjZW50ZXInLFxuICAgIGN1cnNvcjogJ3BvaW50ZXInLCBib3hTaXppbmc6ICdib3JkZXItYm94JywgbWF4V2lkdGg6ICcxMDAlJyxcbiAgfSxcbiAgYWN0aW9uUm93OiB7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH0sXG4gIHJlc3VsdDoge1xuICAgIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNixcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnMTBweCAxMnB4JywgbWF4SGVpZ2h0OiAnMzIwcHgnLCBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgfSxcbiAgYmFkZ2U6IChjb2xvcjogc3RyaW5nKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiB7XG4gICAgY29uc3QgcmdiID0gcGFyc2VDb2xvcihjb2xvcilcbiAgICBpZiAocmdiID09PSBudWxsKSB7XG4gICAgICByZXR1cm4geyBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgcGFkZGluZzogJzFweCA4cHgnLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnLCBiYWNrZ3JvdW5kOiBgJHtjb2xvcn0yMmAsIGNvbG9yIH1cbiAgICB9XG4gICAgY29uc3QgW3IsIGcsIGJdID0gcmdiXG4gICAgLy8gXHU1RTk1XHU4MjcyXHU3RURGXHU0RTAwIDE2JSBcdTgyNzJcdThDMDNcdUZGMUJcdTY1ODdcdTVCNTdcdTgyNzJcdTRFM0JcdTk4OThcdTgxRUFcdTkwMDJcdTVFOTRcdUZGMDhcdTZENDVcdTgyNzJcdTZERjFcdTUzMTZcdTUyMzBcdTc2N0RcdTVFOTVcdTUzRUZcdThCRkJcdUZGMDlcdTMwMDJcbiAgICByZXR1cm4ge1xuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsIHBhZGRpbmc6ICcxcHggOHB4JywgYm9yZGVyUmFkaXVzOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JyxcbiAgICAgIGJhY2tncm91bmQ6IGByZ2JhKCR7cn0sICR7Z30sICR7Yn0sIDAuMTYpYCxcbiAgICAgIGNvbG9yOiB0aGVtZUF3YXJlVGV4dChjb2xvciksXG4gICAgfVxuICB9LFxuICBzZWN0aW9uVGl0bGU6IHsgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEycHgnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH0sXG4gIHdoYXQ6IHsgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS43LCBtYXJnaW46ICc0cHggMCA4cHgnIH0sXG4gIGxvZ2ljU3RlcDogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjgsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9LFxuICByaXNrSXRlbTogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjcsIGNvbG9yOiAnIzlhNjcwMCcsIG1hcmdpbjogJzJweCAwJyB9LFxuICBjb21taXRSb3c6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XG4gICAgcGFkZGluZzogJzhweCAxMHB4JyxcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxuICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGJvcmRlcjogYWN0aXZlID8gJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIDogJzFweCBzb2xpZCB0cmFuc3BhcmVudCcsXG4gICAgYmFja2dyb3VuZDogYWN0aXZlID8gJ3JnYmEoMzcsOTksMjM1LDAuMDYpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgbWFyZ2luQm90dG9tOiAnNHB4JyxcbiAgfSksXG4gIGNvbW1pdFN1YmplY3Q6IHsgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwLCBsaW5lSGVpZ2h0OiAxLjUsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9LFxuICBjb21taXRNZXRhOiB7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Ub3A6ICcycHgnLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcgfSxcbiAgcGF0Y2g6IHtcbiAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4JywgbGluZUhlaWdodDogMS41LCB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxuICAgIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICcxMHB4JywgbWF4SGVpZ2h0OiAnMzIwcHgnLCBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgfSxcbiAgdGV4dGFyZWE6IHtcbiAgICB3aWR0aDogJzEwMCUnLCBwYWRkaW5nOiAnOHB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBib3hTaXppbmc6ICdib3JkZXItYm94JywgcmVzaXplOiAndmVydGljYWwnLCBsaW5lSGVpZ2h0OiAxLjcsIGZvbnRGYW1pbHk6ICdpbmhlcml0JyxcbiAgfSxcbiAgbm90ZUNhcmQ6IHtcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEpKScsXG4gICAgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzEycHggMTRweCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxuICB9LFxuICBub3RlVGl0bGVSb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsIGdhcDogJzhweCcgfSxcbiAgbm90ZVRpdGxlVGV4dDogeyBmb250U2l6ZTogJzEzcHgnLCBmb250V2VpZ2h0OiA2MDAsIGxpbmVIZWlnaHQ6IDEuNSB9LFxuICBub3RlQ29udGVudDoge1xuICAgIGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuODUsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLXdvcmQnLFxuICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJywgbWFyZ2luVG9wOiAnNnB4JyxcbiAgfSxcbiAgbm90ZUNsYW1wOiB7XG4gICAgZGlzcGxheTogJy13ZWJraXQtYm94JywgV2Via2l0TGluZUNsYW1wOiA2LCBXZWJraXRCb3hPcmllbnQ6ICd2ZXJ0aWNhbCcsIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgfSxcbiAgbm90ZU1ldGE6IHtcbiAgICBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnOHB4JyxcbiAgICBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyxcbiAgfSxcbiAgbGlua0J0bjoge1xuICAgIGJhY2tncm91bmQ6ICdub25lJywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzExcHgnLCBwYWRkaW5nOiAnMCcsXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLFxuICB9LFxuICBjaGlwOiAoYWN0aXZlOiBib29sZWFuKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiAoe1xuICAgIHBhZGRpbmc6ICcycHggMTBweCcsIGJvcmRlclJhZGl1czogJzk5OXB4JywgZm9udFNpemU6ICcxMXB4JywgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgY29sb3I6IGFjdGl2ZSA/ICcjZmZmJyA6ICdpbmhlcml0JyxcbiAgfSksXG59XG5cbi8qKiBcdTk4Q0VcdTk2NjlcdTdCNDlcdTdFQTcgXHUyMTkyIFx1NUZCRFx1N0FFMFx1OTg5Q1x1ODI3Mlx1MzAwMiAqL1xuY29uc3QgUklTS19DT0xPUjogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgbG93OiAnIzRlYzliMCcsIG1lZGl1bTogJyNkY2RjYWEnLCBoaWdoOiAnI2NlOTE3OCcsIGNyaXRpY2FsOiAnI2YxNGM0YycgfVxuXG4vKipcbiAqIFx1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNCBTVkcgXHU2RDQxXHU3QTBCXHU1NkZFXHVGRjFBXHU0RTA5XHU1MjE3XHU1MjA2XHU1QzQyXHVGRjA4XHU1M0Q4XHU2NkY0IFx1MjE5MiBcdTk1RjRcdTYzQTVcdTVGMTVcdTc1MjhcdTk0RkUgXHUyMTkyIFx1NkY1Q1x1NTcyOFx1RkYwOVx1RkYwQ1xuICogXHU0RjlEXHU2MzZFIC9pbXBhY3Qtc2NvcGUgXHU4RkQ0XHU1NkRFXHU3Njg0IGxldmVsc1x1RkYwOFx1NTQyQlx1NEYyMFx1NjRBRFx1OTRGRSByZWFzb25cdUZGMDlcdTdFRDhcdTUyMzZcdThGREVcdTdFQkZcdTMwMDJcbiAqIFx1NTE2OFx1NUJCRFx1NzUzQlx1NUUwM1x1RkYwOHZpZXdCb3ggMTAwMFx1RkYwOVx1RkYwQ1x1ODI4Mlx1NzBCOVx1NUUyNlx1NzZFRVx1NUY1NVx1NjNEMFx1NzkzQVx1RkYwQ1x1NkRGMVx1NUVBNlx1OEQ4QVx1NkRGMVx1OTg5Q1x1ODI3Mlx1OEQ4QVx1NkQ0NVx1MzAwMlxuICovXG5mdW5jdGlvbiBJbXBhY3RHcmFwaChwcm9wczogeyBkYXRhOiBJbXBhY3RTY29wZVBheWxvYWQ7IHQ6IChrZXk6IHN0cmluZykgPT4gc3RyaW5nIH0pIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBwcm9wc1xuICBjb25zdCBpbmRpcmVjdCA9IGRhdGEubGV2ZWxzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5sZXZlbCA9PT0gJ2luZGlyZWN0JylcbiAgY29uc3QgcG90ZW50aWFsID0gZGF0YS5sZXZlbHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmxldmVsID09PSAncG90ZW50aWFsJylcbiAgY29uc3QgY29sMCA9IGRhdGEuY2hhbmdlZEZpbGVzLnNsaWNlKDAsIDcpXG4gIGNvbnN0IGNvbDEgPSBBcnJheS5mcm9tKG5ldyBTZXQoaW5kaXJlY3QubWFwKChpdGVtKSA9PiBpdGVtLnBhdGgpKSkuc2xpY2UoMCwgOSlcbiAgY29uc3QgY29sMiA9IEFycmF5LmZyb20obmV3IFNldChwb3RlbnRpYWwubWFwKChpdGVtKSA9PiBpdGVtLnBhdGgpKSkuZmlsdGVyKChwKSA9PiAhY29sMS5pbmNsdWRlcyhwKSkuc2xpY2UoMCwgOClcbiAgY29uc3Qgbm9kZUggPSAzMFxuICBjb25zdCBnYXAgPSAxMFxuICBjb25zdCBjb2xYID0gWzMwLCAzODAsIDcyMF1cbiAgY29uc3QgY29sVyA9IDI4MFxuICBjb25zdCByb3dzID0gTWF0aC5tYXgoY29sMC5sZW5ndGgsIGNvbDEubGVuZ3RoLCBjb2wyLmxlbmd0aCwgMSlcbiAgY29uc3QgaGVpZ2h0ID0gcm93cyAqIChub2RlSCArIGdhcCkgKyA2MFxuXG4gIGNvbnN0IGRlcHRoT2YgPSAocGF0aDogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBpdGVtID0gaW5kaXJlY3QuZmluZCgoZW50cnkpID0+IGVudHJ5LnBhdGggPT09IHBhdGgpID8/IHBvdGVudGlhbC5maW5kKChlbnRyeSkgPT4gZW50cnkucGF0aCA9PT0gcGF0aClcbiAgICByZXR1cm4gaXRlbT8uZGVwdGggPz8gMFxuICB9XG5cbiAgY29uc3QgcmVuZGVyQ29sID0gKGNvbDogbnVtYmVyLCBpdGVtczogc3RyaW5nW10sIGNvbG9yOiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSA9PiBpdGVtcy5tYXAoKHBhdGgsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgeSA9IDQ0ICsgaW5kZXggKiAobm9kZUggKyBnYXApXG4gICAgY29uc3QgZGlyID0gcGF0aC5pbmNsdWRlcygnLycpID8gcGF0aC5zbGljZSgwLCBwYXRoLmxhc3RJbmRleE9mKCcvJykpIDogJydcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZycsIHsga2V5OiBgJHtjb2x9LSR7cGF0aH1gIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdyZWN0JywgeyB4OiBjb2xYW2NvbF0sIHksIHdpZHRoOiBjb2xXLCBoZWlnaHQ6IG5vZGVILCByeDogNiwgZmlsbDogY29sb3IsIHN0cm9rZTogJ3JnYmEoMCwwLDAsMC4zKScsIHN0cm9rZVdpZHRoOiAxIH0pLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGV4dCcsIHsgeDogY29sWFtjb2xdICsgMTAsIHk6IHkgKyAxNCwgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA3MDAsIGZpbGw6ICcjZmZmZmZmJyB9LFxuICAgICAgICAocGF0aC5zcGxpdCgnLycpLnBvcCgpID8/IHBhdGgpLnNsaWNlKDAsIDMwKSksXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyB4OiBjb2xYW2NvbF0gKyAxMCwgeTogeSArIDI2LCBmb250U2l6ZTogMTAsIGZpbGw6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpJyB9LFxuICAgICAgICBkaXIuc2xpY2UoMCwgNDApKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3RpdGxlJywgbnVsbCwgcGF0aCksXG4gICAgKVxuICB9KVxuXG4gIGNvbnN0IGNoYWluU3RhcnQgPSAocmVhc29uOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IG1hdGNoID0gcmVhc29uLm1hdGNoKC9wYXRoOiAoLispJC8pXG4gICAgaWYgKG1hdGNoID09PSBudWxsKSByZXR1cm4gZGF0YS5jaGFuZ2VkRmlsZXNbMF0gPz8gJydcbiAgICByZXR1cm4gbWF0Y2hbMV0hLnNwbGl0KCcgLT4gJylbMF0gPz8gZGF0YS5jaGFuZ2VkRmlsZXNbMF0gPz8gJydcbiAgfVxuICBjb25zdCBpbmRleEluID0gKGl0ZW1zOiBzdHJpbmdbXSwgcGF0aDogc3RyaW5nKTogbnVtYmVyID0+IGl0ZW1zLmluZGV4T2YocGF0aClcbiAgY29uc3QgY29sT2YgPSAocGF0aDogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICBpZiAoY29sMC5pbmNsdWRlcyhwYXRoKSkgcmV0dXJuIDBcbiAgICBpZiAoY29sMS5pbmNsdWRlcyhwYXRoKSkgcmV0dXJuIDFcbiAgICBpZiAoY29sMi5pbmNsdWRlcyhwYXRoKSkgcmV0dXJuIDJcbiAgICByZXR1cm4gLTFcbiAgfVxuXG4gIGNvbnN0IGVkZ2VzOiBSZWFjdC5SZWFjdE5vZGVbXSA9IFtdXG4gIGNvbnN0IHB1c2hFZGdlID0gKGZyb21QYXRoOiBzdHJpbmcsIHRvUGF0aDogc3RyaW5nLCBjb2xvcjogc3RyaW5nLCBrZXk6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGZyb21Db2wgPSBjb2xPZihmcm9tUGF0aClcbiAgICBjb25zdCB0b0NvbCA9IGNvbE9mKHRvUGF0aClcbiAgICBpZiAoZnJvbUNvbCA9PT0gLTEgfHwgdG9Db2wgPT09IC0xIHx8IHRvQ29sIDw9IGZyb21Db2wpIHJldHVyblxuICAgIGNvbnN0IHgxID0gY29sWFtmcm9tQ29sXSArIGNvbFdcbiAgICBjb25zdCB5MSA9IDQ0ICsgaW5kZXhJbihbY29sMCwgY29sMSwgY29sMl1bZnJvbUNvbF0gPz8gW10sIGZyb21QYXRoKSAqIChub2RlSCArIGdhcCkgKyBub2RlSCAvIDJcbiAgICBjb25zdCB4MiA9IGNvbFhbdG9Db2xdXG4gICAgY29uc3QgeTIgPSA0NCArIGluZGV4SW4oW2NvbDAsIGNvbDEsIGNvbDJdW3RvQ29sXSA/PyBbXSwgdG9QYXRoKSAqIChub2RlSCArIGdhcCkgKyBub2RlSCAvIDJcbiAgICBlZGdlcy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3BhdGgnLCB7XG4gICAgICBrZXksIGQ6IGBNICR7eDF9ICR7eTF9IEMgJHt4MSArIDMwfSAke3kxfSwgJHt4MiAtIDMwfSAke3kyfSwgJHt4Mn0gJHt5Mn1gLFxuICAgICAgZmlsbDogJ25vbmUnLCBzdHJva2U6IGNvbG9yLCBzdHJva2VXaWR0aDogMS42LCBvcGFjaXR5OiAwLjYsXG4gICAgfSkpXG4gIH1cbiAgZm9yIChjb25zdCBpdGVtIG9mIGluZGlyZWN0LnNsaWNlKDAsIDIwKSkgcHVzaEVkZ2UoY2hhaW5TdGFydChpdGVtLnJlYXNvbiksIGl0ZW0ucGF0aCwgJyNkOTc3MDYnLCBgZWktJHtpdGVtLnBhdGh9YClcbiAgZm9yIChjb25zdCBpdGVtIG9mIHBvdGVudGlhbC5zbGljZSgwLCAxNikpIHB1c2hFZGdlKGNoYWluU3RhcnQoaXRlbS5yZWFzb24pLCBpdGVtLnBhdGgsICcjNTc2MDZhJywgYGVwLSR7aXRlbS5wYXRofWApXG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIG51bGwsXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3ZnJywgeyB3aWR0aDogJzEwMCUnLCB2aWV3Qm94OiBgMCAwIDEwMjQgJHtoZWlnaHR9YCwgc3R5bGU6IHsgbWF4SGVpZ2h0OiA0ODAgfSB9LFxuICAgICAgW1snXHU1M0Q4XHU2NkY0XHU2NTg3XHU0RUY2JywgMF0sIFsnXHU5NUY0XHU2M0E1XHU1RjcxXHU1NENEXHVGRjA4XHU4QzAxXHU1RjE1XHU3NTI4XHU0RTg2XHU1QjgzXHVGRjA5JywgMV0sIFsnXHU2RjVDXHU1NzI4XHU1RjcxXHU1NENEXHVGRjA4XHU0RThDXHU3RUE3XHU0RjIwXHU2NEFEXHVGRjA5JywgMl1dLm1hcCgoW25hbWUsIGNvbF0pID0+XG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3RleHQnLCB7IGtleTogU3RyaW5nKGNvbCksIHg6IGNvbFhbY29sIGFzIG51bWJlcl0sIHk6IDI0LCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgZmlsbDogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSwgbmFtZSBhcyBzdHJpbmcpKSxcbiAgICAgIHJlbmRlckNvbCgwLCBjb2wwLCAnIzI1NjNlYicpLFxuICAgICAgcmVuZGVyQ29sKDEsIGNvbDEsICcjZDk3NzA2JyksXG4gICAgICByZW5kZXJDb2woMiwgY29sMiwgJyM1NzYwNmEnKSxcbiAgICAgIGVkZ2VzLFxuICAgICksXG4gIClcbn1cblxuY29uc3QgRElGRl9LRVlXT1JEUyA9IC9cXGIocHVibGljfHByaXZhdGV8cHJvdGVjdGVkfGludGVybmFsfHN0YXRpY3x2b2lkfGNsYXNzfHN0cnVjdHxpbnRlcmZhY2V8ZW51bXxuZXd8cmV0dXJufGlmfGVsc2V8Zm9yfGZvcmVhY2h8d2hpbGV8c3dpdGNofGNhc2V8YnJlYWt8Y29udGludWV8dHJ5fGNhdGNofGZpbmFsbHl8dGhyb3d8dXNpbmd8bmFtZXNwYWNlfGltcG9ydHxleHBvcnR8ZnJvbXxjb25zdHxsZXR8dmFyfGFzeW5jfGF3YWl0fGZ1bmN0aW9ufHRoaXN8YmFzZXxzdXBlcnxudWxsfHRydWV8ZmFsc2V8b3ZlcnJpZGV8dmlydHVhbHxhYnN0cmFjdHxzZWFsZWR8cmVhZG9ubHl8cGFyYW1zfG91dHxyZWZ8eWllbGR8dHlwZW9mfGluc3RhbmNlb2Z8aW58b2Z8ZGVmYXVsdHxzdHJpbmd8aW50fGxvbmd8ZG91YmxlfGZsb2F0fGJvb2x8Y2hhcnxkZWNpbWFsfG9iamVjdHxyZWNvcmR8cGFydGlhbHxnZXR8c2V0fHJlcXVpcmV8bW9kdWxlfHR5cGV8aW1wbGVtZW50c3xleHRlbmRzKVxcYi9nXG5cbi8qKiBcdTUzNTVcdTg4NENcdTRFRTNcdTc4MDFcdTlBRDhcdTRFQUVcdUZGMUFcdTZDRThcdTkxQ0EgPiBcdTVCNTdcdTdCMjZcdTRFMzIgPiBcdTUxNzNcdTk1MkVcdTVCNTcvXHU2NTcwXHU1QjU3IFx1NEUwOVx1NUM0Mlx1Nzc0MFx1ODI3Mlx1RkYwOFx1OEY3Qlx1OTFDRlx1NkI2M1x1NTIxOVx1RkYwQ1x1NTkxRlx1NjgzOFx1NjdFNVx1NzUyOFx1RkYwOVx1MzAwMiAqL1xuZnVuY3Rpb24gaGlnaGxpZ2h0Q29kZUxpbmUobGluZTogc3RyaW5nLCBrZXlQcmVmaXg6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdIHtcbiAgY29uc3QgdHJpbW1lZCA9IGxpbmUudHJpbVN0YXJ0KClcbiAgaWYgKHRyaW1tZWQuc3RhcnRzV2l0aCgnLy8nKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJy8vLycpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnKicpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnLyonKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJyMnKSkge1xuICAgIHJldHVybiBbUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsga2V5OiBgJHtrZXlQcmVmaXh9LWNgLCBzdHlsZTogeyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM2YTk5NTUnKSB9IH0sIGxpbmUpXVxuICB9XG4gIGNvbnN0IHBhcnRzID0gbGluZS5zcGxpdCgvKFwiKD86W15cIlxcXFxdfFxcXFwuKSpcInwnKD86W14nXFxcXF18XFxcXC4pKid8YCg/OlteYFxcXFxdfFxcXFwuKSpgKS9nKVxuICByZXR1cm4gcGFydHMubWFwKChwYXJ0LCBpKSA9PiB7XG4gICAgaWYgKGkgJSAyID09PSAxKSByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsga2V5OiBgJHtrZXlQcmVmaXh9LXMke2l9YCwgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2U5MTc4JykgfSB9LCBwYXJ0KVxuICAgIGNvbnN0IHN1YjogUmVhY3QuUmVhY3ROb2RlW10gPSBbXVxuICAgIGxldCBsYXN0ID0gMFxuICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgcGFydC5tYXRjaEFsbChESUZGX0tFWVdPUkRTKSkge1xuICAgICAgaWYgKG1hdGNoLmluZGV4ISA+IGxhc3QpIHN1Yi5wdXNoKHBhcnQuc2xpY2UobGFzdCwgbWF0Y2guaW5kZXgpKVxuICAgICAgc3ViLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsga2V5OiBgJHtrZXlQcmVmaXh9LWske2l9LSR7bWF0Y2guaW5kZXh9YCwgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjNTY5Y2Q2JykgfSB9LCBtYXRjaFswXSkpXG4gICAgICBsYXN0ID0gbWF0Y2guaW5kZXghICsgbWF0Y2hbMF0ubGVuZ3RoXG4gICAgfVxuICAgIGlmIChsYXN0IDwgcGFydC5sZW5ndGgpIHN1Yi5wdXNoKHBhcnQuc2xpY2UobGFzdCkpXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIHsga2V5OiBgJHtrZXlQcmVmaXh9LXAke2l9YCB9LCBzdWIpXG4gIH0pXG59XG5cbi8qKiBcdTlBRDhcdTRFQUVcdTVERUVcdTVGMDJcdTg5QzZcdTU2RkVcdUZGMUFcdTg5RTNcdTY3OTAgdW5pZmllZCBkaWZmXHVGRjBDXHU2MzA5IFx1NTg5RS9cdTUyMjAvXHU1NzU3XHU1OTM0L1x1NEUwQVx1NEUwQlx1NjU4NyBcdTc3NDBcdTgyNzJcdTMwMDIgKi9cbmZ1bmN0aW9uIERpZmZWaWV3KHByb3BzOiB7IHBhdGNoOiBzdHJpbmcgfSkge1xuICBjb25zdCBsaW5lcyA9IHByb3BzLnBhdGNoLnNwbGl0KCdcXG4nKS5maWx0ZXIoKGxpbmUsIGkpID0+ICEobGluZSA9PT0gJycgJiYgaSA9PT0gcHJvcHMucGF0Y2guc3BsaXQoJ1xcbicpLmxlbmd0aCAtIDEpKVxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgIHN0eWxlOiB7XG4gICAgICBmb250RmFtaWx5OiAnQ29uc29sYXMsIG1vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIGxpbmVIZWlnaHQ6IDEuNTUsXG4gICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMCcsIG1heEhlaWdodDogNDIwLCBvdmVyZmxvd1k6ICdhdXRvJywgbWFyZ2luVG9wOiAnNnB4JyxcbiAgICB9LFxuICB9LCBsaW5lcy5tYXAoKGxpbmUsIGkpID0+IHtcbiAgICBjb25zdCBraW5kID0gbGluZS5zdGFydHNXaXRoKCcrKysnKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJy0tLScpID8gJ21ldGEnXG4gICAgICA6IGxpbmUuc3RhcnRzV2l0aCgnQEAnKSA/ICdodW5rJ1xuICAgICAgICA6IGxpbmUuc3RhcnRzV2l0aCgnKycpID8gJ2FkZCdcbiAgICAgICAgICA6IGxpbmUuc3RhcnRzV2l0aCgnLScpID8gJ2RlbCcgOiAnY3R4J1xuICAgIGNvbnN0IGJnID0ga2luZCA9PT0gJ2FkZCcgPyAncmdiYSg0NiwxNjAsNjcsMC4xNCknIDoga2luZCA9PT0gJ2RlbCcgPyAncmdiYSgyNDgsODEsNzMsMC4xMyknIDoga2luZCA9PT0gJ2h1bmsnID8gJ3JnYmEoNTYsMTM5LDI1MywwLjEpJyA6ICd0cmFuc3BhcmVudCdcbiAgICBjb25zdCBjb250ZW50ID0ga2luZCA9PT0gJ21ldGEnIHx8IGtpbmQgPT09ICdodW5rJ1xuICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBzdHlsZTogeyBjb2xvcjogJyMwOTY5ZGEnLCBmb250V2VpZ2h0OiA2MDAgfSB9LCBsaW5lKVxuICAgICAgOiBraW5kID09PSAnYWRkJyB8fCBraW5kID09PSAnZGVsJ1xuICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IHN0eWxlOiB7IGNvbG9yOiBraW5kID09PSAnYWRkJyA/ICcjMWE3ZjM3JyA6ICcjY2YyMjJlJywgZm9udFdlaWdodDogNjAwIH0gfSwgbGluZVswXSlcbiAgICAgICAgOiBudWxsXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsga2V5OiBpLCBzdHlsZTogeyBwYWRkaW5nOiAnMCAxMHB4JywgYmFja2dyb3VuZDogYmcsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfSB9LFxuICAgICAgY29udGVudCxcbiAgICAgIGtpbmQgPT09ICdhZGQnIHx8IGtpbmQgPT09ICdkZWwnID8gaGlnaGxpZ2h0Q29kZUxpbmUobGluZS5zbGljZSgxKSwgYGwke2l9YCkgOiBoaWdobGlnaHRDb2RlTGluZShsaW5lLCBgbCR7aX1gKSxcbiAgICApXG4gIH0pKVxufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiAnXHUyMDE0J1xuICByZXR1cm4gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlU3RyaW5nKClcbn1cblxuLyoqIFx1NEU4Q1x1NkIyMVx1Nzg2RVx1OEJBNFx1NUYzOVx1N0E5N1x1RkYxQVx1OTA2RVx1N0Y2OSArIFx1NUM0NVx1NEUyRFx1NTM2MVx1NzI0N1x1RkYwQ1x1NTM3MVx1OTY2OVx1NjRDRFx1NEY1Q1x1RkYwOFx1NTIyMFx1OTY2NFx1N0IxNFx1OEJCMC9cdTUzRDhcdTY2RjQvXHU3RUE2XHU2NzVGXHVGRjA5XHU1MTcxXHU3NTI4XHUzMDAyICovXG5mdW5jdGlvbiBDb25maXJtRGlhbG9nKHByb3BzOiB7IHRpdGxlOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZzsgZGFuZ2VyPzogYm9vbGVhbjsgb25DYW5jZWw6ICgpID0+IHZvaWQ7IG9uQ29uZmlybTogKCkgPT4gdm9pZCB9KSB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLW92ZXJsYXknLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCB6SW5kZXg6IDk5OSxcbiAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMTUsMjMsNDIsMC40NSknLCBiYWNrZHJvcEZpbHRlcjogJ2JsdXIoMnB4KScsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgYW5pbWF0aW9uOiAncGNGYWRlSW4gMC4xNXMgZWFzZS1vdXQnLFxuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ2FuY2VsLFxuICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLWNhcmQnLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHdpZHRoOiA0MDAsIG1heFdpZHRoOiAnY2FsYygxMDB2dyAtIDQ4cHgpJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JywgYm94U2hhZG93OiAnMCAyMHB4IDUwcHggcmdiYSgwLDAsMCwwLjI1KScsXG4gICAgICAgICAgcGFkZGluZzogJzIwcHggMjJweCAxNnB4JyxcbiAgICAgICAgICBvbkNsaWNrOiAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCBnYXA6ICcxMHB4JyB9IH0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgd2lkdGg6IDM0LCBoZWlnaHQ6IDM0LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBmbGV4U2hyaW5rOiAwLFxuICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnMTdweCcsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHByb3BzLmRhbmdlciA/ICdyZ2JhKDI0NCw2Myw5NCwwLjEyKScgOiAncmdiYSgzNyw5OSwyMzUsMC4xKScsXG4gICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5kYW5nZXIgPyAnI2UxMWQ0OCcgOiAnIzI1NjNlYicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sIHByb3BzLmRhbmdlciA/ICchJyA6ICc/JyksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICc2cHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSB9LCBwcm9wcy50aXRsZSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfSB9LCBwcm9wcy5tZXNzYWdlKSxcbiAgICAgICAgICApLFxuICAgICAgICApLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsIGdhcDogJzEwcHgnLCBtYXJnaW5Ub3A6ICcxOHB4JyB9IH0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xuICAgICAgICAgICAgc3R5bGU6IHsgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzdweCAxOHB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JyB9LFxuICAgICAgICAgICAgb25DbGljazogcHJvcHMub25DYW5jZWwsXG4gICAgICAgICAgfSwgJ1x1NTNENlx1NkQ4OCcpLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcbiAgICAgICAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLW9rJyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc3cHggMThweCcsIGJvcmRlclJhZGl1czogJzhweCcsIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNTAwLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBwcm9wcy5kYW5nZXIgPyAnI2UxMWQ0OCcgOiAndmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpJywgY29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5vbkNvbmZpcm0sXG4gICAgICAgICAgfSwgJ1x1Nzg2RVx1OEJBNFx1NTIyMFx1OTY2NCcpLFxuICAgICAgICApLFxuICAgICAgKSxcbiAgICApLFxuICApXG59XG5cbi8qKiBcdTlBQThcdTY3QjZcdTVDMEZcdTUzNjFcdTcyNDdcdTMwMDIgKi9cbmZ1bmN0aW9uIENhcmQocHJvcHM6IHsgdGl0bGU/OiBSZWFjdC5SZWFjdE5vZGU7IGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlIH0pIHtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5jYXJkIH0sXG4gICAgcHJvcHMudGl0bGUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiBzdHlsZXMuc2VjdGlvblRpdGxlIH0sIHByb3BzLnRpdGxlKSxcbiAgICBwcm9wcy5jaGlsZHJlbilcbn1cblxuLyoqXG4gKiBcdTVERTVcdTRGNUNcdTUzRjBcdTRFM0JcdTdFQzRcdTRFRjZcdUZGMUFcdTU2REJcdTk4NzVcdTdCN0VcdUZGMDhcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTRFM0FcdTlFRDhcdThCQTRcdUZGMDkrIFx1OEY2RVx1OEJFMlx1NUJCRlx1NEUzQiBBUEkgKyBcdTYzMDlcdTk0QUVcdTUzMTZcdTY0Q0RcdTRGNUNcdTMwMDJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFdvcmtzcGFjZUZyYW1lKHByb3BzOiBXb3Jrc3BhY2VGcmFtZVByb3BzKSB7XG4gIGNvbnN0IHQgPSBwcm9wcy50ID8/IGZhbGxiYWNrVFxuICBjb25zdCBbdGFiLCBzZXRUYWJdID0gdXNlU3RhdGU8VGFiS2V5PignY29tbWl0cycpXG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGU8V29ya3NwYWNlU3RhdGUgfCBudWxsPihudWxsKVxuICBjb25zdCBbbG9hZEVycm9yLCBzZXRMb2FkRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2Jvb3RzdHJhcHBpbmcsIHNldEJvb3RzdHJhcHBpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFthY3Rpb25SZXN1bHQsIHNldEFjdGlvblJlc3VsdF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbY2hhbmdlVGl0bGUsIHNldENoYW5nZVRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbY2hhbmdlRGVzYywgc2V0Q2hhbmdlRGVzY10gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW21lbW9yeVRpdGxlLCBzZXRNZW1vcnlUaXRsZV0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW21lbW9yeUNvbnRlbnQsIHNldE1lbW9yeUNvbnRlbnRdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtjb25maXJtZWRUZXh0LCBzZXRDb25maXJtZWRUZXh0XSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbY29uZmlybWVkUGF0aHMsIHNldENvbmZpcm1lZFBhdGhzXSA9IHVzZVN0YXRlKCcnKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTcyQjZcdTYwMDEgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IFtjb21taXRzRGF0YSwgc2V0Q29tbWl0c0RhdGFdID0gdXNlU3RhdGU8Q29tbWl0c1BheWxvYWQgfCBudWxsPihudWxsKVxuICBjb25zdCBbY29tbWl0c0Vycm9yLCBzZXRDb21taXRzRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3BpY2tlck9wZW4sIHNldFBpY2tlck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtwaWNrZXJGaWx0ZXIsIHNldFBpY2tlckZpbHRlcl0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW3NlbGVjdGVkVGFyZ2V0cywgc2V0U2VsZWN0ZWRUYXJnZXRzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXSlcbiAgY29uc3QgW2RldGFpbHMsIHNldERldGFpbHNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgQ29tbWl0RGV0YWlsUGF5bG9hZD4+KHt9KVxuICBjb25zdCBbZGV0YWlsTG9hZGluZywgc2V0RGV0YWlsTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2ltcGFjdCwgc2V0SW1wYWN0XSA9IHVzZVN0YXRlPEltcGFjdFNjb3BlUGF5bG9hZCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtpbXBhY3RMb2FkaW5nLCBzZXRJbXBhY3RMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbcmV2aWV3cywgc2V0UmV2aWV3c10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBSZXZpZXdQYXlsb2FkPj4oe30pXG4gIGNvbnN0IFtyZXZpZXdMb2FkaW5nLCBzZXRSZXZpZXdMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbZmlsZURpZmZzLCBzZXRGaWxlRGlmZnNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oe30pXG4gIGNvbnN0IFtjb25maXJtRGlhbG9nLCBzZXRDb25maXJtRGlhbG9nXSA9IHVzZVN0YXRlPHsgdGl0bGU6IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nOyBkYW5nZXI/OiBib29sZWFuOyBvbkNvbmZpcm06ICgpID0+IHZvaWQgfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtub3Rlcywgc2V0Tm90ZXNdID0gdXNlU3RhdGU8Tm90ZUVudHJ5W10+KFtdKVxuICBjb25zdCBbbm90ZVRpdGxlLCBzZXROb3RlVGl0bGVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtub3RlQ29udGVudCwgc2V0Tm90ZUNvbnRlbnRdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtub3RlVGFncywgc2V0Tm90ZVRhZ3NdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtlZGl0aW5nTm90ZSwgc2V0RWRpdGluZ05vdGVdID0gdXNlU3RhdGU8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmc7IHRhZ3M6IHN0cmluZyB9IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW25vdGVTZWFyY2gsIHNldE5vdGVTZWFyY2hdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtub3RlRXhwYW5kZWQsIHNldE5vdGVFeHBhbmRlZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oe30pXG4gIGNvbnN0IFtpc3N1ZXNEYXRhLCBzZXRJc3N1ZXNEYXRhXSA9IHVzZVN0YXRlPElzc3VlRW50cnlbXSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtpc3N1ZVNldmVyaXR5RmlsdGVyLCBzZXRJc3N1ZVNldmVyaXR5RmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbaXNzdWVTdGF0dXNGaWx0ZXIsIHNldElzc3VlU3RhdHVzRmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbaXNzdWVFeHBhbmRlZCwgc2V0SXNzdWVFeHBhbmRlZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oe30pXG4gIGNvbnN0IFtmaXhFeHBhbmRlZCwgc2V0Rml4RXhwYW5kZWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KVxuICBjb25zdCBbdmVyaWZ5aW5nVGFyZ2V0LCBzZXRWZXJpZnlpbmdUYXJnZXRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2FpU3VtbWFyaXppbmcsIHNldEFpU3VtbWFyaXppbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtuYXJyYXRpdmUsIHNldE5hcnJhdGl2ZV0gPSB1c2VTdGF0ZTx7IG5hcnJhdGl2ZTogc3RyaW5nOyBjYWNoZWQ6IGJvb2xlYW47IGdlbmVyYXRlZEF0PzogbnVtYmVyIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBbbmFycmF0aXZlQnVzeSwgc2V0TmFycmF0aXZlQnVzeV0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW25hcnJhdGl2ZUVycm9yLCBzZXROYXJyYXRpdmVFcnJvcl0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW21vZGVsVGllcnMsIHNldE1vZGVsVGllcnNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgeyBwcm92aWRlcjogc3RyaW5nOyBtb2RlbDogc3RyaW5nIH0+IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW21vZGVsT3B0aW9ucywgc2V0TW9kZWxPcHRpb25zXSA9IHVzZVN0YXRlPEFycmF5PHsgcHJvdmlkZXI6IHN0cmluZzsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nIH0+PihbXSlcbiAgY29uc3QgW21vZGVsU2F2aW5nLCBzZXRNb2RlbFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW21vZGVsU2F2ZWQsIHNldE1vZGVsU2F2ZWRdID0gdXNlU3RhdGUoZmFsc2UpXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdUZGMUFcdThCQTFcdTUyMTJcdTc4NkVcdThCQTQgLyBSdW4gXHU4QkU2XHU2MEM1IC8gXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExIFx1MjUwMFx1MjUwMFxuICBjb25zdCBbcGxhbkNvbmZpcm0sIHNldFBsYW5Db25maXJtXSA9IHVzZVN0YXRlPHsgY2hhbmdlSWQ6IHN0cmluZzsgc3RlcHM6IFBsYW5Db25maXJtU3RlcFtdIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBbcGxhbkJ1c3ksIHNldFBsYW5CdXN5XSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbcnVuRGV0YWlsLCBzZXRSdW5EZXRhaWxdID0gdXNlU3RhdGU8UnVuRGV0YWlsIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3NjaGVkdWxlZERhdGEsIHNldFNjaGVkdWxlZERhdGFdID0gdXNlU3RhdGU8U2NoZWR1bGVkVGFza0VudHJ5W10gfCBudWxsPihudWxsKVxuICBjb25zdCBbc2NoZWROYW1lLCBzZXRTY2hlZE5hbWVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtzY2hlZE9wZW4sIHNldFNjaGVkT3Blbl0gPSB1c2VTdGF0ZSh0cnVlKVxuICBjb25zdCBbc2NoZWRUeXBlLCBzZXRTY2hlZFR5cGVdID0gdXNlU3RhdGUoJ3JldmlldycpXG4gIGNvbnN0IFtzY2hlZFRpdGxlLCBzZXRTY2hlZFRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbc2NoZWREZXNjLCBzZXRTY2hlZERlc2NdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtzY2hlZEludGVydmFsLCBzZXRTY2hlZEludGVydmFsXSA9IHVzZVN0YXRlKCcxNDQwJylcbiAgLy8gXHUyNTAwXHUyNTAwIFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1RkYxQVx1NTE2OFx1OTFDRlx1NjU3MFx1NjM2RSAvIFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgW21lbW9yaWVzRGF0YSwgc2V0TWVtb3JpZXNEYXRhXSA9IHVzZVN0YXRlPE1lbW9yaWVzUGF5bG9hZCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtzeW5jUmVwb3J0LCBzZXRTeW5jUmVwb3J0XSA9IHVzZVN0YXRlPFN5bmNSZXBvcnQgfCBudWxsPihudWxsKVxuICBjb25zdCBbbWVtb3J5U2NvcGUsIHNldE1lbW9yeVNjb3BlXSA9IHVzZVN0YXRlPCdwcm9qZWN0JyB8ICdicmFuY2gnPigncHJvamVjdCcpXG4gIGNvbnN0IFttZW1vcnlUeXBlLCBzZXRNZW1vcnlUeXBlXSA9IHVzZVN0YXRlKCdhcmNoaXRlY3R1cmVfZGVjaXNpb24nKVxuICBjb25zdCBbbWVtb3J5U3luY2luZywgc2V0TWVtb3J5U3luY2luZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2V4ZWNUaXRsZSwgc2V0RXhlY1RpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbZXhlY01vZGVsLCBzZXRFeGVjTW9kZWxdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtleGVjRGVzYywgc2V0RXhlY0Rlc2NdID0gdXNlU3RhdGUoJycpXG5cbiAgY29uc3QgcG9zdCA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTx7IG9rOiBib29sZWFuOyBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB9PiA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChwYXRoLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyAuLi5ib2R5LCBzZXNzaW9uSWQ6IHByb3BzLnNlc3Npb25JZCB9KSxcbiAgICB9KVxuICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICByZXR1cm4geyBvazogcmVzcG9uc2Uub2ssIGRhdGE6IChkYXRhID8/IHt9KSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB9XG4gIH1cblxuICAvKiogXHU1REU1XHU0RjVDXHU4RjZFXHU2QjIxXHU1M0Q5XHU0RThCXHVGRjFBXHU1OTFBXHU0RTJBXHU5MDA5XHU0RTJEXHU2M0QwXHU0RUE0XHU0RjVDXHU0RTNBXHU0RTAwXHU0RTJBXHU2NTc0XHU0RjUzXHU4OUUzXHU4QkZCXHVGRjA4XHU3RjEzXHU1QjU4ICsgXHU1M0VGXHU1RjNBXHU1MjM2XHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGxvYWROYXJyYXRpdmUgPSBhc3luYyAoZm9yY2UgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHNoYXMgPSBzZWxlY3RlZFRhcmdldHMuZmlsdGVyKCh0YXJnZXQpID0+IHRhcmdldCAhPT0gJ3dvcmtpbmcnKVxuICAgIGlmIChzaGFzLmxlbmd0aCA8IDIpIHJldHVyblxuICAgIHNldE5hcnJhdGl2ZUJ1c3kodHJ1ZSlcbiAgICBzZXROYXJyYXRpdmVFcnJvcignJylcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvd29yay1uYXJyYXRpdmUnLCB7IHNoYXMsIGZvcmNlIH0pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldE5hcnJhdGl2ZUVycm9yKFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldE5hcnJhdGl2ZSh7IG5hcnJhdGl2ZTogU3RyaW5nKGRhdGFbJ25hcnJhdGl2ZSddID8/ICcnKSwgY2FjaGVkOiBkYXRhWydjYWNoZWQnXSA9PT0gdHJ1ZSwgZ2VuZXJhdGVkQXQ6IGRhdGFbJ2dlbmVyYXRlZEF0J10gfSlcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0TmFycmF0aXZlRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXROYXJyYXRpdmVCdXN5KGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWRDb21taXRzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvcHJvamVjdC1jb250cm9sL2FwaS9jb21taXRzP3Nlc3Npb25JZD0ke2VuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpfSZsaW1pdD02MGApXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoKGRhdGEgYXMgeyBlcnJvcj86IHN0cmluZyB9KS5lcnJvciA/PyBgSFRUUCAke3Jlc3BvbnNlLnN0YXR1c31gKVxuICAgICAgc2V0Q29tbWl0c0RhdGEoZGF0YSBhcyBDb21taXRzUGF5bG9hZClcbiAgICAgIHNldENvbW1pdHNFcnJvcihudWxsKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRDb21taXRzRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWROb3RlcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXM/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0Tm90ZXMoKGRhdGEgYXMgeyBub3RlczogTm90ZUVudHJ5W10gfSkubm90ZXMgPz8gW10pXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTdCMTRcdThCQjBcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcdUZGMUFcdTUyMTdcdTg4NjhcdTRGRERcdTYzMDFcdTUzOUZcdTY4MzdcdTMwMDJcbiAgICB9XG4gIH1cblxuICAvKiogXHU1MkZFXHU5MDA5L1x1NTNENlx1NkQ4OFx1NEUwMFx1NkIyMVx1NjNEMFx1NEVBNFx1RkYxQVx1OTFDRFx1N0I5N1x1OTAwOVx1NEUyRFx1OTZDNlx1NTQwOFx1RkYwQ1x1NUU3Nlx1NjMwOVx1OTcwMFx1ODg2NVx1OUY1MFx1NkJDRlx1Njc2MVx1NjNEMFx1NEVBNFx1NzY4NCBBSSBcdTg5RTNcdThCRkJcdUZGMDhcdTY3MERcdTUyQTFcdTdBRUZcdTY3MDlcdTdGMTNcdTVCNThcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgdG9nZ2xlVGFyZ2V0ID0gYXN5bmMgKHRhcmdldDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0U2VsZWN0ZWRUYXJnZXRzKChwcmV2aW91cykgPT4ge1xuICAgICAgaWYgKHByZXZpb3VzLmluY2x1ZGVzKHRhcmdldCkpIHJldHVybiBwcmV2aW91cy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IHRhcmdldClcbiAgICAgIHJldHVybiBbLi4ucHJldmlvdXMsIHRhcmdldF1cbiAgICB9KVxuICAgIHNldEltcGFjdChudWxsKVxuICAgIHNldFJldmlld3Moe30pXG4gICAgaWYgKCFzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXModGFyZ2V0KSkge1xuICAgICAgYXdhaXQgbG9hZERldGFpbCh0YXJnZXQsIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTYyQzlcdTUzRDZcdTUzNTVcdTY3NjFcdTYzRDBcdTRFQTRcdTc2ODQgQUkgXHU4OUUzXHU4QkZCXHVGRjFCZm9yY2U9dHJ1ZSBcdTY1RjZcdTdFRDVcdThGQzdcdTdGMTNcdTVCNThcdTVGM0FcdTUyMzZcdTkxQ0RcdTdCOTdcdTMwMDJcdTU5MzFcdThEMjVcdTUxOTlcdTUxNjVcdTk1MTlcdThCRUZcdTUzNjBcdTRGNERcdUZGMDhcdTUzNjFcdTcyNDdcdTRFMERcdTVEMjlcdTZFODNcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgbG9hZERldGFpbCA9IGFzeW5jICh0YXJnZXQ6IHN0cmluZywgZm9yY2U6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXREZXRhaWxMb2FkaW5nKHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbW1pdC1kZXRhaWwnLCB7IHNoYTogdGFyZ2V0LCBmb3JjZSB9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHtcbiAgICAgICAgICAuLi5wcmV2aW91cyxcbiAgICAgICAgICBbdGFyZ2V0XToge1xuICAgICAgICAgICAgc2hhOiB0YXJnZXQsXG4gICAgICAgICAgICBpc1dvcmtpbmc6IHRhcmdldCA9PT0gJ3dvcmtpbmcnLFxuICAgICAgICAgICAgZmlsZXM6IFtdLFxuICAgICAgICAgICAgaW5zZXJ0aW9uczogMCxcbiAgICAgICAgICAgIGRlbGV0aW9uczogMCxcbiAgICAgICAgICAgIHBhdGNoVHJ1bmNhdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHBhdGNoOiAnJyxcbiAgICAgICAgICAgIGNvbW1pdDogbnVsbCxcbiAgICAgICAgICAgIGFuYWx5c2lzOiB7IHdoYXQ6ICdBSSBcdTg5RTNcdThCRkJcdTU5MzFcdThEMjVcdUZGMUEnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJycpICsgJ1x1RkYwOFx1NzBCOVx1MzAwQ1x1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1MzAwRFx1NTNFRlx1OTFDRFx1OEJENVx1RkYwOScsIGxvZ2ljOiBbXSwgcmlza3M6IFtdIH0sXG4gICAgICAgICAgfSBhcyB1bmtub3duIGFzIENvbW1pdERldGFpbFBheWxvYWQsXG4gICAgICAgIH0pKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldERldGFpbHMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW3RhcmdldF06IGRhdGEgYXMgdW5rbm93biBhcyBDb21taXREZXRhaWxQYXlsb2FkIH0pKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRMb2FkRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXREZXRhaWxMb2FkaW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWRJbXBhY3QgPSBhc3luYyAoZm9yY2UgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICBzZXRJbXBhY3RMb2FkaW5nKHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2ltcGFjdC1zY29wZScsIHsgc2hhczogc2VsZWN0ZWRUYXJnZXRzLCBmb3JjZSB9KVxuICAgICAgc2V0SW1wYWN0KG9rID8gKGRhdGEgYXMgdW5rbm93biBhcyBJbXBhY3RTY29wZVBheWxvYWQpIDogbnVsbClcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SW1wYWN0TG9hZGluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkUmV2aWV3cyA9IGFzeW5jIChmb3JjZSA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDApIHJldHVyblxuICAgIHNldFJldmlld0xvYWRpbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgZm9yIChjb25zdCB0YXJnZXQgb2Ygc2VsZWN0ZWRUYXJnZXRzKSB7XG4gICAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3JldmlldycsIHsgc2hhOiB0YXJnZXQsIGZvcmNlIH0pXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBkYXRhIGFzIHVua25vd24gYXMgUmV2aWV3UGF5bG9hZFxuICAgICAgICBzZXRSZXZpZXdzKChwcmV2aW91cykgPT4gKHtcbiAgICAgICAgICAuLi5wcmV2aW91cyxcbiAgICAgICAgICBbdGFyZ2V0XTogb2sgPyBwYXlsb2FkIDoge1xuICAgICAgICAgICAgaXNzdWVzRm91bmQ6IDAsXG4gICAgICAgICAgICBpc3N1ZXM6ICcnLFxuICAgICAgICAgICAgdmVyZGljdDogJ1x1OEJDNFx1NUJBMVx1NTkzMVx1OEQyNVx1RkYxQScgKyBTdHJpbmcocGF5bG9hZFsnZXJyb3InXSA/PyAnJykgKyAnXHVGRjA4XHU1M0VGXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwXHU5MUNEXHU4QkQ1XHVGRjA5JyxcbiAgICAgICAgICAgIGlzc3VlTGlzdDogW10sXG4gICAgICAgICAgICBjYWNoZWQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pKVxuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRSZXZpZXdMb2FkaW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWRGaWxlRGlmZiA9IGFzeW5jIChzaGE6IHN0cmluZywgcGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3Qga2V5ID0gYCR7c2hhfXwke3BhdGh9YFxuICAgIGlmIChmaWxlRGlmZnNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZXRGaWxlRGlmZnMoKHByZXZpb3VzKSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHQgPSB7IC4uLnByZXZpb3VzIH1cbiAgICAgICAgZGVsZXRlIG5leHRba2V5XVxuICAgICAgICByZXR1cm4gbmV4dFxuICAgICAgfSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2ZpbGUtZGlmZicsIHsgc2hhLCBwYXRoIH0pXG4gICAgc2V0RmlsZURpZmZzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFtrZXldOiBTdHJpbmcoZGF0YVsncGF0Y2gnXSA/PyAnJykgfSkpXG4gIH1cblxuICBjb25zdCBsb2FkSXNzdWVzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXM/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0SXNzdWVzRGF0YSgoZGF0YSBhcyB7IGlzc3VlczogSXNzdWVFbnRyeVtdIH0pLmlzc3VlcyA/PyBbXSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1OTVFRVx1OTg5OFx1NTIxN1x1ODg2OFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2Mlx1RkYxQVx1NTIxN1x1ODg2OFx1NEZERFx1NjMwMVx1NTM5Rlx1NjgzN1x1MzAwMlxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBcdTk1RUVcdTk4OThcdTU5MERcdTY4QzBcdUZGMUFcdTVCRjlcdThCRTVcdTk1RUVcdTk4OThcdTYyNDBcdTVDNUVcdThCQzRcdTVCQTFcdTc2RUVcdTY4MDdcdTkxQ0RcdThERDFcdTY4QzBcdTZENEJcdUZGMDhcdTRGRUVcdTU5MERcdTc4NkVcdThCQTQgKyBcdTY3MDBcdTRGMThcdTYwMjcvXHU2NzAwXHU1QzBGXHU0RkI1XHU1MTY1ICsgXHU2NUIwXHU5NUVFXHU5ODk4XHU2MjZCXHU2M0NGXHVGRjA5XHVGRjBDXG4gICAqIFx1NTNFQVx1NjcwOVx1NTkwRFx1NjhDMFx1OTAxQVx1OEZDN1x1NjI0RFx1ODFFQVx1NTJBOFx1N0Y2RVx1NEUzQVx1NURGMlx1ODlFM1x1NTFCM1x1RkYxQlx1N0VEM1x1Njc5Q1x1NEVFNVx1NTkwRFx1NjhDMFx1NjJBNVx1NTQ0QVx1NUY2Mlx1NUYwRlx1NUM1NVx1NzkzQVx1MzAwMlxuICAgKi9cbiAgY29uc3QgdmVyaWZ5SXNzdWVzID0gYXN5bmMgKHRhcmdldDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0VmVyaWZ5aW5nVGFyZ2V0KHRhcmdldClcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaXNzdWVzL3ZlcmlmeScsIHsgdGFyZ2V0IH0pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCByZXNvbHZlZCA9IChkYXRhWydyZXNvbHZlZCddIGFzIHN0cmluZ1tdIHwgdW5kZWZpbmVkKSA/PyBbXVxuICAgICAgY29uc3Qgc3RpbGxPcGVuID0gKGRhdGFbJ3N0aWxsT3BlbiddIGFzIEFycmF5PHsgdGl0bGU6IHN0cmluZzsgcmVhc29uOiBzdHJpbmcgfT4gfCB1bmRlZmluZWQpID8/IFtdXG4gICAgICBjb25zdCBuZXdJc3N1ZXMgPSAoZGF0YVsnbmV3SXNzdWVzJ10gYXMgQXJyYXk8eyBzZXZlcml0eTogc3RyaW5nOyB0aXRsZTogc3RyaW5nIH0+IHwgdW5kZWZpbmVkKSA/PyBbXVxuICAgICAgY29uc3QgdmVyZGljdCA9IFN0cmluZyhkYXRhWyd2ZXJkaWN0J10gPz8gJycpXG4gICAgICBjb25zdCBsaW5lcyA9IFtcbiAgICAgICAgYFx1NTkwRFx1NjhDMFx1NUI4Q1x1NjIxMFx1RkYxQVx1NURGMlx1NEZFRVx1NTkwRCAke3Jlc29sdmVkLmxlbmd0aH0gXHUwMEI3IFx1NEVDRFx1NjcyQVx1NEZFRVx1NTkwRCAke3N0aWxsT3Blbi5sZW5ndGh9IFx1MDBCNyBcdTY1QjBcdTU4OUVcdTk1RUVcdTk4OTggJHtuZXdJc3N1ZXMubGVuZ3RofWAsXG4gICAgICAgIC4uLihyZXNvbHZlZC5sZW5ndGggPiAwID8gW2BcdTI3MTMgXHU1REYyXHU0RkVFXHU1OTBEXHVGRjFBJHtyZXNvbHZlZC5qb2luKCdcdUZGMUInKX1gXSA6IFtdKSxcbiAgICAgICAgLi4uKHN0aWxsT3Blbi5sZW5ndGggPiAwID8gc3RpbGxPcGVuLm1hcCgoaXRlbSkgPT4gYFx1MjcxNyBcdTY3MkFcdTRGRUVcdTU5MERcdUZGMUEke2l0ZW0udGl0bGV9IFx1MjAxNFx1MjAxNCAke2l0ZW0ucmVhc29ufWApIDogW10pLFxuICAgICAgICAuLi4obmV3SXNzdWVzLmxlbmd0aCA+IDAgPyBuZXdJc3N1ZXMubWFwKChpdGVtKSA9PiBgXHVGRjBCIFx1NjVCMFx1OTVFRVx1OTg5OFx1RkYxQVske2l0ZW0uc2V2ZXJpdHl9XSAke2l0ZW0udGl0bGV9YCkgOiBbXSksXG4gICAgICAgIC4uLih2ZXJkaWN0ID09PSAnJyA/IFtdIDogW2BcdTY3MDBcdTRGMThcdTYwMjdcdUZGMUEke3ZlcmRpY3R9YF0pLFxuICAgICAgXVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KGxpbmVzLmpvaW4oJ1xcbicpKVxuICAgICAgYXdhaXQgbG9hZElzc3VlcygpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0VmVyaWZ5aW5nVGFyZ2V0KG51bGwpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWRkTm90ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAobm90ZVRpdGxlLnRyaW0oKSA9PT0gJycgfHwgbm90ZUNvbnRlbnQudHJpbSgpID09PSAnJykgcmV0dXJuXG4gICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMnLCB7XG4gICAgICB0aXRsZTogbm90ZVRpdGxlLnRyaW0oKSxcbiAgICAgIGNvbnRlbnQ6IG5vdGVDb250ZW50LnRyaW0oKSxcbiAgICAgIHRhZ3M6IG5vdGVUYWdzLFxuICAgICAgc2hhOiBzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwID8gdW5kZWZpbmVkIDogc2VsZWN0ZWRUYXJnZXRzWzBdLFxuICAgIH0pXG4gICAgaWYgKG9rKSB7XG4gICAgICBzZXROb3RlVGl0bGUoJycpXG4gICAgICBzZXROb3RlQ29udGVudCgnJylcbiAgICAgIHNldE5vdGVUYWdzKCcnKVxuICAgICAgYXdhaXQgbG9hZE5vdGVzKClcbiAgICB9XG4gIH1cblxuICBjb25zdCByZW1vdmVOb3RlID0gYXN5bmMgKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy9kZWxldGUnLCB7IGlkIH0pXG4gICAgaWYgKGVkaXRpbmdOb3RlICE9PSBudWxsICYmIGVkaXRpbmdOb3RlLmlkID09PSBpZCkgc2V0RWRpdGluZ05vdGUobnVsbClcbiAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICB9XG5cbiAgY29uc3Qgc2F2ZU5vdGVFZGl0ID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChlZGl0aW5nTm90ZSA9PT0gbnVsbCkgcmV0dXJuXG4gICAgYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMvdXBkYXRlJywgeyBpZDogZWRpdGluZ05vdGUuaWQsIHRpdGxlOiBlZGl0aW5nTm90ZS50aXRsZSwgY29udGVudDogZWRpdGluZ05vdGUuY29udGVudCwgdGFnczogZWRpdGluZ05vdGUudGFncyB9KVxuICAgIHNldEVkaXRpbmdOb3RlKG51bGwpXG4gICAgYXdhaXQgbG9hZE5vdGVzKClcbiAgfVxuXG4gIC8qKiBcdTdGNkVcdTk4NzYvXHU1M0Q2XHU2RDg4XHU3RjZFXHU5ODc2XHU0RTAwXHU2NzYxXHU3QjE0XHU4QkIwXHUzMDAyICovXG4gIGNvbnN0IHRvZ2dsZU5vdGVQaW4gPSBhc3luYyAobm90ZTogTm90ZUVudHJ5KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMvdXBkYXRlJywgeyBpZDogbm90ZS5pZCwgcGlubmVkOiBub3RlLnBpbm5lZCAhPT0gdHJ1ZSB9KVxuICAgIGF3YWl0IGxvYWROb3RlcygpXG4gIH1cblxuICAvKiogQUkgXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzXHVGRjFBXHU1QkY5XHU2QkQ0XHU0RTBBXHU2QjIxXHU2MDNCXHU3RUQzXHU1MDVBXHU1ODlFXHU5MUNGXHU2NkY0XHU2NUIwXHVGRjBDXHU2MjhBXHU3QjE0XHU4QkIwK1x1OTg3OVx1NzZFRVx1Njg2M1x1Njg0OFx1NjNEMFx1NzBCQ1x1NjIxMFx1NEUwMFx1NEVGRFx1MzAwQ1x1NkQzQlx1MzAwRFx1NzY4NFx1NjAzQlx1N0VEM1x1NjU4N1x1Njg2M1x1MzAwMiAqL1xuICBjb25zdCBhaVN1bW1hcml6ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRBaVN1bW1hcml6aW5nKHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL2FpLXN1bW1hcnknLCB7fSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldEFjdGlvblJlc3VsdChkYXRhWyd1cGRhdGVkJ10gPT09IHRydWVcbiAgICAgICAgPyAnXHUyNzEzIFx1NURGMlx1NUJGOVx1NkJENFx1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NUI4Q1x1NjIxMFx1NTg5RVx1OTFDRlx1NjZGNFx1NjVCMFx1RkYwOFx1NjVCMFx1NTg5RVx1NTNEOFx1NTMxNlx1ODlDMVx1NjAzQlx1N0VEM1x1NzY4NFx1MzAwQ1x1NjcyQ1x1NkIyMVx1NjZGNFx1NjVCMFx1MzAwRFx1NEUwMFx1ODI4Mlx1RkYwOVx1RkYwQ1x1NjVFN1x1NjAzQlx1N0VEM1x1NURGMlx1NTQwOFx1NUU3Nlx1NjZGRlx1NjM2MidcbiAgICAgICAgOiAnXHUyNzEzIFx1NURGMlx1NzUxRlx1NjIxMFx1OTk5Nlx1NEVGRFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEMycpXG4gICAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSkpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEFpU3VtbWFyaXppbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1OTg3NVx1OTc2Mlx1NTIxQlx1NUVGQVx1NjI2N1x1ODg0Q1x1RkYxQVx1NUVGQVx1NTNEOFx1NjZGNCBcdTIxOTIgTExNIFx1NzUxRlx1NjIxMFx1N0YxNlx1NjM5Mlx1OEJBMVx1NTIxMiBcdTIxOTIgXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0XHU5ODc1XHVGRjA4XHU4OUQyXHU4MjcyL1x1NkEyMVx1NTc4Qi9cdTdCNTZcdTc1NjVcdTUzRUZcdThDMDNcdUZGMDlcdTIxOTIgXHU3ODZFXHU4QkE0XHU1NDBFXHU1NDJGXHU1MkE4XHUzMDAyICovXG4gIGNvbnN0IHN0YXJ0UnVuID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChleGVjVGl0bGUudHJpbSgpID09PSAnJyB8fCBleGVjRGVzYy50cmltKCkgPT09ICcnKSByZXR1cm5cbiAgICBzZXRCdXN5KCdzdGFydFJ1bicpXG4gICAgc2V0QWN0aW9uUmVzdWx0KG51bGwpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvc3RhcnQnLCB7XG4gICAgICAgIHRpdGxlOiBleGVjVGl0bGUudHJpbSgpLCBkZXNjcmlwdGlvbjogZXhlY0Rlc2MudHJpbSgpLFxuICAgICAgICAuLi4oZXhlY01vZGVsID09PSAnJyA/IHt9IDogKCgpID0+IHsgY29uc3QgW3Byb3ZpZGVyLCBtb2RlbF0gPSBleGVjTW9kZWwuc3BsaXQoJy8nKTsgcmV0dXJuIHsgZGVmYXVsdE1vZGVsUHJvdmlkZXI6IHByb3ZpZGVyID8/ICcnLCBkZWZhdWx0TW9kZWxJZDogbW9kZWwgPz8gJycgfSB9KSgpKSxcbiAgICAgIH0pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAoZGF0YVsnYXV0b1N0YXJ0ZWQnXSA9PT0gdHJ1ZSkge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMUEnICsgU3RyaW5nKGRhdGFbJ3J1bklkJ10gPz8gJycpKVxuICAgICAgICBzZXRFeGVjVGl0bGUoJycpXG4gICAgICAgIHNldEV4ZWNEZXNjKCcnKVxuICAgICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHN0ZXBzID0gKGRhdGFbJ3N0ZXBzJ10gYXMgQXJyYXk8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+IHwgdW5kZWZpbmVkKSA/PyBbXVxuICAgICAgc2V0UGxhbkNvbmZpcm0oe1xuICAgICAgICBjaGFuZ2VJZDogU3RyaW5nKGRhdGFbJ2NoYW5nZUlkJ10gPz8gJycpLFxuICAgICAgICBzdGVwczogc3RlcHMubWFwKChzdGVwKSA9PiAoe1xuICAgICAgICAgIGlkOiBTdHJpbmcoc3RlcFsnaWQnXSA/PyAnJyksXG4gICAgICAgICAgdGl0bGU6IFN0cmluZyhzdGVwWyd0aXRsZSddID8/ICcnKSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogU3RyaW5nKHN0ZXBbJ2Rlc2NyaXB0aW9uJ10gPz8gJycpLFxuICAgICAgICAgIHRhcmdldEZpbGVzOiAoc3RlcFsndGFyZ2V0RmlsZXMnXSBhcyBzdHJpbmdbXSB8IHVuZGVmaW5lZCkgPz8gW10sXG4gICAgICAgICAgcm9sZTogU3RyaW5nKHN0ZXBbJ3JvbGUnXSA/PyAnY29kaW5nJyksXG4gICAgICAgICAgYWNjZXB0YW5jZTogU3RyaW5nKHN0ZXBbJ2FjY2VwdGFuY2UnXSA/PyAnJyksXG4gICAgICAgICAgZmFpbHVyZVBvbGljeTogU3RyaW5nKHN0ZXBbJ2ZhaWx1cmVQb2xpY3knXSA/PyAncmV0cnktZXNjYWxhdGUnKSxcbiAgICAgICAgICBlbmFibGVkOiBzdGVwWydlbmFibGVkJ10gIT09IGZhbHNlLFxuICAgICAgICAgIG1vZGVsUHJvdmlkZXI6ICcnLFxuICAgICAgICAgIG1vZGVsSWQ6ICcnLFxuICAgICAgICB9KSksXG4gICAgICB9KVxuICAgICAgaWYgKG1vZGVsT3B0aW9ucy5sZW5ndGggPT09IDAgJiYgbW9kZWxUaWVycyA9PT0gbnVsbCkgdm9pZCBsb2FkTW9kZWxDb25maWcoKVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU4QkExXHU1MjEyXHU1REYyXHU3NTFGXHU2MjEwXHVGRjBDXHU4QkY3XHU1NzI4XHU0RTBCXHU2NUI5XHU3ODZFXHU4QkE0XHU3RjE2XHU2MzkyXHU1NDBFXHU1NDJGXHU1MkE4JylcbiAgICAgIHNldEV4ZWNUaXRsZSgnJylcbiAgICAgIHNldEV4ZWNEZXNjKCcnKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSkpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJ1c3kobnVsbClcbiAgICB9XG4gIH1cblxuICAvKiogXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0XHU5ODc1XHVGRjFBXHU0RkREXHU1QjU4XHU3RjE2XHU4RjkxXHVGRjA4XHU2NUIwXHU3MjQ4XHU2NzJDXHU4QkExXHU1MjEyXHVGRjA5XHU1RTc2XHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHUzMDAyICovXG4gIGNvbnN0IGxhdW5jaFBsYW4gPSBhc3luYyAod2l0aEVkaXRzOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHBsYW5Db25maXJtID09PSBudWxsKSByZXR1cm5cbiAgICBzZXRQbGFuQnVzeSh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBsZXQgY2hhbmdlSWQgPSBwbGFuQ29uZmlybS5jaGFuZ2VJZFxuICAgICAgaWYgKHdpdGhFZGl0cykge1xuICAgICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL3BsYW4vdXBkYXRlJywgeyBjaGFuZ2VJZCwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzIH0pXG4gICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvbGF1bmNoJywgeyBjaGFuZ2VJZCB9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU1REYyXHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHVGRjFBJyArIFN0cmluZyhkYXRhWydydW5JZCddID8/ICcnKSlcbiAgICAgIHNldFBsYW5Db25maXJtKG51bGwpXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSkpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFBsYW5CdXN5KGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTUyQTBcdThGN0QgUnVuIFx1OEJFNlx1NjBDNVx1RkYwOFx1NkI2NVx1OUFBNFx1NjVGNlx1OTVGNFx1N0VCRiArIFx1NEVGQlx1NTJBMVx1NURFNVx1NEY1Q1x1OEJCMFx1NUZDNlx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBsb2FkUnVuRGV0YWlsID0gYXN5bmMgKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9kZXRhaWw/aWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChpZCkpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldFJ1bkRldGFpbChkYXRhIGFzIFJ1bkRldGFpbClcbiAgICB9IGNhdGNoIHtcbiAgICAgIHNldFJ1bkRldGFpbChudWxsKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTYwNjJcdTU5MERcdTY2ODJcdTUwNUMvXHU0RTJEXHU2NUFEL1x1NTkzMVx1OEQyNVx1NzY4NCBSdW5cdTMwMDIgKi9cbiAgY29uc3QgcmVzdW1lUnVuID0gYXN5bmMgKHJ1bklkOiBzdHJpbmcsIGFjdGlvbjogJ2NvbnRpbnVlJyB8ICdza2lwLWN1cnJlbnQnKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9yZXN1bWUnLCB7IHJ1bklkLCBhY3Rpb24gfSlcbiAgICBpZiAob2spIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NURGMlx1NjA2Mlx1NTkwRFx1NjI2N1x1ODg0Q1x1RkYwOCcgKyBhY3Rpb24gKyAnXHVGRjA5JylcbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgICBhd2FpdCBsb2FkUnVuRGV0YWlsKHJ1bklkKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NTJBMFx1OEY3RFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1NTIxN1x1ODg2OFx1MzAwMiAqL1xuICBjb25zdCBsb2FkU2NoZWR1bGVkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9zY2hlZHVsZWQ/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0U2NoZWR1bGVkRGF0YSgoZGF0YSBhcyB7IHRhc2tzOiBTY2hlZHVsZWRUYXNrRW50cnlbXSB9KS50YXNrcyA/PyBbXSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1NTIxN1x1ODg2OFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2MlxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTUyMUJcdTVFRkEgLyBcdTY2RjRcdTY1QjAgLyBcdTUyMjBcdTk2NjQgLyBcdTdBQ0JcdTUzNzNcdTYyNjdcdTg4NENcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdTMwMDIgKi9cbiAgY29uc3QgYWRkU2NoZWR1bGVkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGludGVydmFsTWludXRlcyA9IE51bWJlcihzY2hlZEludGVydmFsKVxuICAgIGlmIChzY2hlZE5hbWUudHJpbSgpID09PSAnJyB8fCAhTnVtYmVyLmlzRmluaXRlKGludGVydmFsTWludXRlcykgfHwgaW50ZXJ2YWxNaW51dGVzIDwgMSkge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgXHU4QkY3XHU1ODZCXHU1MTk5XHU0RUZCXHU1MkExXHU1NDBEXHU3OUYwXHU0RTBFXHU2NzA5XHU2NTQ4XHU5NUY0XHU5Njk0XHVGRjA4XHU1MjA2XHU5NDlGXHVGRjA5JylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9zY2hlZHVsZWQnLCB7XG4gICAgICBuYW1lOiBzY2hlZE5hbWUudHJpbSgpLCB0eXBlOiBzY2hlZFR5cGUsIGludGVydmFsTWludXRlcyxcbiAgICAgIHRpdGxlOiBzY2hlZFRpdGxlLnRyaW0oKSB8fCB1bmRlZmluZWQsIGRlc2NyaXB0aW9uOiBzY2hlZERlc2MudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICB9KVxuICAgIGlmIChvaykge1xuICAgICAgc2V0U2NoZWROYW1lKCcnKTsgc2V0U2NoZWRUaXRsZSgnJyk7IHNldFNjaGVkRGVzYygnJylcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1NURGMlx1NTIxQlx1NUVGQScpXG4gICAgICBhd2FpdCBsb2FkU2NoZWR1bGVkKClcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNjaGVkdWxlZEFjdGlvbiA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvc2NoZWR1bGVkLycgKyBwYXRoLCBib2R5KVxuICAgIGlmIChvaykgYXdhaXQgbG9hZFNjaGVkdWxlZCgpXG4gICAgZWxzZSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gIH1cblxuICAvKiogXHU1MkEwXHU4RjdEXHU4QkIwXHU1RkM2XHU5NzYyXHU2NzdGXHU1MTY4XHU5MUNGXHU2NTcwXHU2MzZFXHVGRjA4XHU1NDJCXHU1NDBDXHU2QjY1XHU1N0ZBXHU3RUJGXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGxvYWRNZW1vcmllcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3JpZXM/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0TWVtb3JpZXNEYXRhKGRhdGEgYXMgTWVtb3JpZXNQYXlsb2FkKVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gXHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NjJDOVx1NTNENlx1NTQwQ1x1NkI2NVx1RkYxQVx1NEUwOVx1NTQxMVx1NTIyNFx1NUI5QVx1RkYwOFx1NTkzMVx1NjU0OFx1NjNEMFx1Njg0OC9cdTY1QjBcdTU4OUVcdTUwMTlcdTkwMDkvXHU4MUVBXHU1MkE4XHU3RUVEXHU1NDdEXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHN5bmNNZW1vcmllcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRNZW1vcnlTeW5jaW5nKHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeS9zeW5jJywge30pXG4gICAgICBpZiAoIW9rICYmIGRhdGFbJ2Vycm9yJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzZXRTeW5jUmVwb3J0KHsgb2s6IGZhbHNlLCBlcnJvcjogU3RyaW5nKGRhdGFbJ2Vycm9yJ10pIH0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0U3luY1JlcG9ydChkYXRhIGFzIFN5bmNSZXBvcnQpXG4gICAgICBhd2FpdCBsb2FkTWVtb3JpZXMoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRTeW5jUmVwb3J0KHsgb2s6IGZhbHNlLCBlcnJvcjogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpIH0pXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldE1lbW9yeVN5bmNpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QVx1NTQwRVx1N0VFRFx1RkYxQVx1NjI4QVx1OTAwOVx1NEUyRFx1NzY4NFx1NzU5MVx1NEYzQ1x1OEZDN1x1NjVGNlx1OTg3OVx1ODQzRFx1NEUzQSBzdGFsZSAvIFx1NUY1Mlx1Njg2M1x1MzAwMiAqL1xuICBjb25zdCBhcHBseVN5bmMgPSBhc3luYyAoaWRzOiBzdHJpbmdbXSwgYWN0aW9uOiAnbWFyay1zdGFsZScgfCAnYXJjaGl2ZScpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvc3luYy9hcHBseScsIHsgaWRzLCBhY3Rpb24gfSlcbiAgICBzZXRTeW5jUmVwb3J0KChwcmV2aW91cykgPT4gcHJldmlvdXMgPT09IG51bGwgPyBudWxsIDogeyAuLi5wcmV2aW91cywgc3RhbGVQcm9wb3NhbHM6IChwcmV2aW91cy5zdGFsZVByb3Bvc2FscyA/PyBbXSkuZmlsdGVyKChwcm9wb3NhbCkgPT4gIWlkcy5pbmNsdWRlcyhwcm9wb3NhbC5pZCkpIH0pXG4gICAgYXdhaXQgbG9hZE1lbW9yaWVzKClcbiAgfVxuXG4gIC8qKiBcdThCQjBcdTVGQzZcdTcyQjZcdTYwMDFcdTY0Q0RcdTRGNUNcdUZGMDhcdTVGNTJcdTY4NjMvXHU2MDYyXHU1OTBEXHVGRjA5XHU0RTBFXHU1MjA2XHU2NTJGXHU1RjUyXHU0RTAwXHUzMDAyICovXG4gIGNvbnN0IG1lbW9yeUFjdGlvbiA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5LycgKyBwYXRoLCBib2R5KVxuICAgIGlmIChvaykgYXdhaXQgbG9hZE1lbW9yaWVzKClcbiAgICBlbHNlIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgfVxuXG4gIC8qKiBcdThCQjBcdTVGQzZcdThGNkNcdTdCMTRcdThCQjBcdUZGMUFcdTVGMTVcdTc1MjhcdThGREJcdTVCNjZcdTRFNjBcdTY4NjNcdTY4NDhcdTMwMDIgKi9cbiAgY29uc3QgbWVtb3J5VG9Ob3RlID0gYXN5bmMgKG1lbW9yeTogTWVtb3J5RW50cnkpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IG9rIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3RlcycsIHtcbiAgICAgIHRpdGxlOiBtZW1vcnkudGl0bGUsXG4gICAgICBjb250ZW50OiBtZW1vcnkuY29udGVudCArIChtZW1vcnkuYmFzaXNTaGEgIT09IG51bGwgPyBgXFxuXHVGRjA4XHU2NzY1XHU2RTkwXHVGRjFBXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2ICR7bWVtb3J5LmJhc2lzU2hhLnNsaWNlKDAsIDgpfVx1RkYwOWAgOiAnJyksXG4gICAgICB0YWdzOiAnXHU4QkIwXHU1RkM2LCAnICsgbWVtb3J5LnR5cGUsXG4gICAgfSlcbiAgICBpZiAob2spIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NURGMlx1NjI4QVx1OEJCMFx1NUZDNlx1OEY2Q1x1NEUzQVx1N0IxNFx1OEJCMCcpXG4gIH1cblxuICAvLyBcdTRGMUFcdThCRERcdTYyNTNcdTVGMDAvXHU1MjA3XHU2MzYyXHU2NUY2XHU1Qjk4XHU2NUI5XHU0RjFBIGNsb3NlRGV0YWlscyBcdTY1MzZcdThENzdcdThGNjhcdTkwNTNcdUZGMUJcdTc3MEJcdTk1RThcdTcyRDdcdTZCQ0YgNTAwbXMgXHU2OEMwXHU2N0U1XHVGRjBDXG4gIC8vIFx1NTNFQVx1ODk4MVx1NUY1M1x1NTI0RFx1NjcwOVx1NEYxQVx1OEJERFx1ODAwQ1x1NURFNVx1NEY1Q1x1NTNGMFx1NTIxN1x1NUJCRCA8IDUwcHggXHU1QzMxXHU5MUNEXHU2NUIwXHU2NDkxXHU1RjAwXHVGRjA4XHU3ODZFXHU1QjlBXHU2MDI3XHVGRjBDXHU0RTBEXHU0RjlEXHU4RDU2IGVmZmVjdCBcdTY1RjZcdTVFOEZcdUZGMDlcdTMwMDJcbiAgLy8gXHU1NDBDXHU0RTAwXHU2MkNEXHU3RUY0XHU2MzAxXHU3RURGXHU4QkExXHU4ODRDXHU5NEIzXHU1MjM2XHVGRjFBXHU0RjFBXHU4QkREXHU1MjA3XHU2MzYyXHU0RjFBXHU2MzYyXHU2Mzg5XHU3RURGXHU4QkExXHU4ODRDIERPTVx1RkYwQ1x1NjgzN1x1NUYwRlx1ODg2OFx1N0YzQVx1NTkzMVx1NjVGNlx1NjMwOVx1NUY1M1x1NTI0RFxuICAvLyBcdTY3ODRcdTVFRkFcdTU0QzhcdTVFMENcdTkxQ0RcdTZDRThcdTUxNjVcdUZGMDhcdTVFNDJcdTdCNDlcdUZGMENcdTVERjJcdTVCNThcdTU3MjhcdTUyMTlcdThERjNcdThGQzdcdUZGMDlcdTMwMDJcbiAgY29uc3QgbGF5b3V0RmFjZSA9IChwcm9wcyBhcyB1bmtub3duIGFzIHsgbGF5b3V0PzogeyBvcGVuRGV0YWlscz86ICgpID0+IHZvaWQgfSB9KS5sYXlvdXRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBhcHBseVN0YXRzTGluZUNsYW1wKClcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGMtc3RhdHMtY2xhbXAnKSA9PT0gbnVsbCkgYXBwbHlTdGF0c0xpbmVDbGFtcCgpXG4gICAgICBjb25zdCBjaGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImNlbnRlckNvbFwiXScpXG4gICAgICBjb25zdCB3aWR0aCA9IGNoYXQgPyBNYXRoLnJvdW5kKGNoYXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpIDogLTFcbiAgICAgIGlmICh3aWR0aCAhPT0gLTEgJiYgd2lkdGggPCA1MCkgbGF5b3V0RmFjZT8ub3BlbkRldGFpbHM/LigpXG4gICAgfSwgNTAwKVxuICAgIHJldHVybiAoKSA9PiB7IGNsZWFySW50ZXJ2YWwodGltZXIpIH1cbiAgfSwgW3Byb3BzLnNlc3Npb25JZCwgbGF5b3V0RmFjZV0pXG5cbiAgLyoqIFx1NEVFNSBpbXBvcnRhbnQgXHU1MTg1XHU4MDU0XHU2ODM3XHU1RjBGXHU3NkY0XHU2M0E1XHU1MTk5XHU1Qjk4XHU2NUI5XHU3RjUxXHU2ODNDXHU2QTIxXHU2NzdGXHVGRjA4XHU2NzAwXHU5QUQ4XHU0RjE4XHU1MTQ4XHU3RUE3XHVGRjBDXHU0RUZCXHU0RjU1XHU5MUNEXHU2RTMyXHU2N0QzXHU0RTBEXHU0RjFBXHU4OTg2XHU3NkQ2XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGZyYW1lVGVtcGxhdGVTZXQgPSAoY2hhdFB4OiBudW1iZXIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cInNpZGViYXJDb2xcIl0nKVxuICAgIGNvbnN0IHNpZGViYXJXID0gc2lkZWJhciA/IE1hdGgubWF4KDU2LCBNYXRoLnJvdW5kKHNpZGViYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpKSA6IDI4MFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0nKVxuICAgICAgPy5zdHlsZS5zZXRQcm9wZXJ0eSgnZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zJywgc2lkZWJhclcgKyAncHggbWlubWF4KDAsIDFmcikgJyArIGNoYXRQeCArICdweCcsICdpbXBvcnRhbnQnKVxuICB9XG5cbiAgLy8gXHU4MDRBXHU1OTI5XHU1MjE3XHU1QkJEXHU4QkIwXHU1RkM2XHVGRjA4XHU1Qjk4XHU2NUI5IGxheW91dCBzdG9yZSBcdTc3QUNcdTYwMDFcdUZGMDlcdUZGMUFcdTYzMDJcdThGN0RcdTYwNjJcdTU5MEQgKyBcdTYyRDZcdTYyRkRcdTc2RjRcdTUxOTlcdTUxODVcdTgwNTRcdTZBMjFcdTY3N0ZcdTMwMDJcbiAgLy8gXHU1RkM1XHU5ODdCXHU1MTk5IGltcG9ydGFudFx1MjAxNFx1MjAxNExBWU9VVF9TVFlMRSBcdTc2ODRcdTZBMjFcdTY3N0ZcdTg5QzRcdTUyMTlcdTRFNUZcdTY2MkYgaW1wb3J0YW50XHVGRjBDXHU5NzVFIGltcG9ydGFudFxuICAvLyBcdTUxODVcdTgwNTRcdTRGMUFcdTg4QUJcdTVCODNcdTUzOEJcdTUyMzZcdUZGMDhcdThGRDlcdTVDMzFcdTY2MkZcdTZCNjRcdTUyNERcIlx1NjJENlx1NjJGRFx1NzUxRlx1NjU0OFx1MzAwMVx1NTIzN1x1NjVCMFx1NTQwRVx1OEJCMFx1NUZDNlx1NEUyMlx1NTkzMVwiXHU3Njg0XHU1MzlGXHU1NkUwXHVGRjA5XHUzMDAyXG4gIC8vIFx1NUI5OFx1NjVCOSBSZWFjdCBcdTkxQ0RcdTZFMzJcdTY3RDNcdTRGMUFcdTY1MzlcdTUxOTlcdTUxODVcdTgwNTRcdTZBMjFcdTY3N0ZcdUZGMENNdXRhdGlvbk9ic2VydmVyIFx1NjMwOVx1NUY1M1x1NTI0RFx1NTAzQ1x1NUI4OFx1NTM2Qlx1OTFDRFx1NTE5OVxuICAvLyBcdUZGMDhcdTUwM0NcdTc2RjhcdTU0MENcdTRFMERcdTRGMUFcdTg5RTZcdTUzRDFcdTY1QjBcdTc2ODQgbXV0YXRpb25cdUZGMENcdTY1RTBcdTU2REVcdTczQUZcdUZGMDlcdTMwMDJcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBzYXZlZCA9IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGMuY2hhdFdpZHRoJykgPz8gJycpXG4gICAgY29uc3QgYXBwbHkgPSAoKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0nKSBhcyBIVE1MRWxlbWVudCB8IG51bGxcbiAgICAgIC8vIFx1NEVDNVx1NUY1M1x1NTE4NVx1ODA1NFx1NkEyMVx1Njc3Rlx1NEUwRFx1NjYyRlx1NjIxMVx1NEVFQ1x1NzY4NCBpbXBvcnRhbnQgXHU1OEYwXHU2NjBFXHU2NUY2XHU1MTk5XHU1MTY1XHVGRjFBXHU1Qjk4XHU2NUI5IFJlYWN0IFx1OTFDRFx1NkUzMlx1NjdEM1x1NEYxQVx1NjI4QVxuICAgICAgLy8gXHU1MTg1XHU4MDU0XHU2NTM5XHU1NkRFXHU5NzVFIGltcG9ydGFudFx1RkYwOFx1NkI2NFx1NjVGNlx1NjgzN1x1NUYwRlx1ODg2OFx1ODlDNFx1NTIxOVx1NjNBNVx1N0JBMVx1MzAwMVx1ODA0QVx1NTkyOVx1NUJCRFx1NTZERVx1ODQzRCAzNjBcdUZGMDlcdUZGMENcdTg5QzJcdTVCREZcdTU2NjhcbiAgICAgIC8vIFx1OTY4Rlx1NTM3M1x1OTFDRFx1NTE5OVx1NTkzQVx1NTZERVx1RkYxQlx1NjIxMVx1NEVFQ1x1ODFFQVx1NURGMVx1NzY4NFx1NTE5OVx1NTE2NVx1NEZERFx1NjMwMSBpbXBvcnRhbnRcdUZGMENcdTRFMERcdTUxOERcdTg5RTZcdTUzRDFcdTRFMEJcdTRFMDBcdThGNkVcdTMwMDJcbiAgICAgIGlmIChmcmFtZSA9PT0gbnVsbCB8fCBmcmFtZS5zdHlsZS5nZXRQcm9wZXJ0eVByaW9yaXR5KCdncmlkLXRlbXBsYXRlLWNvbHVtbnMnKSA9PT0gJ2ltcG9ydGFudCcpIHJldHVyblxuICAgICAgY29uc3QgY2hhdFcgPSBOdW1iZXIuaXNGaW5pdGUoc2F2ZWQpICYmIHNhdmVkID49IDI4MCA/IHNhdmVkIDogMzYwXG4gICAgICBmcmFtZVRlbXBsYXRlU2V0KGNoYXRXKVxuICAgIH1cbiAgICBhcHBseSgpXG4gICAgY29uc3QgZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdJylcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHsgYXBwbHkoKSB9KVxuICAgIGlmIChmcmFtZSAhPT0gbnVsbCkgb2JzZXJ2ZXIub2JzZXJ2ZShmcmFtZSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFsnc3R5bGUnXSB9KVxuICAgIHJldHVybiAoKSA9PiB7IG9ic2VydmVyLmRpc2Nvbm5lY3QoKSB9XG4gIH0sIFtdKVxuXG4gIC8qKiBcdTUyMDZcdTk2OTRcdTY3NjFcdTYyRDZcdTYyRkRcdUZGMUFcdThDMDNcdTY1NzRcdTgwNEFcdTU5MjlcdTUyMTdcdTVCQkRcdUZGMDhcdTVERTVcdTRGNUNcdTUzRjBcdTU0MzhcdTY1MzZcdTUyNjlcdTRGNTlcdTdBN0FcdTk1RjRcdUZGMDlcdUZGMENcdTUxOTlcdTUxNjUgbG9jYWxTdG9yYWdlIFx1OEJCMFx1NUZDNlx1MzAwMiAqL1xuICBjb25zdCBvbkRpdmlkZXJEb3duID0gKGU6IFJlYWN0LlBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IG9uTW92ZSA9IChldjogUG9pbnRlckV2ZW50KTogdm9pZCA9PiB7XG4gICAgICBjb25zdCB3aWR0aCA9IE1hdGgubWluKDkwMCwgTWF0aC5tYXgoMjgwLCB3aW5kb3cuaW5uZXJXaWR0aCAtIGV2LmNsaWVudFgpKVxuICAgICAgZnJhbWVUZW1wbGF0ZVNldCh3aWR0aClcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYy5jaGF0V2lkdGgnLCBTdHJpbmcod2lkdGgpKVxuICAgIH1cbiAgICBjb25zdCBvblVwID0gKCk6IHZvaWQgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApXG4gICAgfVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcClcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGRpc3Bvc2VkID0gZmFsc2VcbiAgICBjb25zdCBsb2FkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvc3RhdGU/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSwgeyBoZWFkZXJzOiB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0gfSlcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApXG4gICAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgICAgaWYgKCFkaXNwb3NlZCkge1xuICAgICAgICAgIHNldFN0YXRlKGRhdGEgYXMgV29ya3NwYWNlU3RhdGUpXG4gICAgICAgICAgc2V0TG9hZEVycm9yKG51bGwpXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICAgIGlmICghZGlzcG9zZWQpIHNldExvYWRFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgICB9XG4gICAgfVxuICAgIHZvaWQgbG9hZCgpXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IHZvaWQgbG9hZCgpIH0sIDQwMDApXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICB9XG4gIH0sIFtdKVxuXG4gIC8vIFx1OEZEQlx1NTE2NVx1NjNEMFx1NEVBNC9cdTdCMTRcdThCQjAvUmV2aWV3IFx1OTg3NVx1N0I3RVx1NjVGNlx1NjMwOVx1OTcwMFx1NjJDOVx1NTNENlx1RkYwOFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1NEY5RFx1OEQ1Nlx1NEYxQVx1OEJERFx1NURFNVx1NEY1Q1x1NTMzQVx1RkYwQ1x1OEY2RVx1OEJFMlx1NjVFMFx1NjEwRlx1NEU0OVx1RkYwOVx1MzAwMlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0YWIgPT09ICdjb21taXRzJykgdm9pZCBsb2FkQ29tbWl0cygpXG4gICAgaWYgKHRhYiA9PT0gJ25vdGVzJykgeyB2b2lkIGxvYWROb3RlcygpOyB2b2lkIGxvYWRNZW1vcmllcygpOyBpZiAoY29tbWl0c0RhdGEgPT09IG51bGwpIHZvaWQgbG9hZENvbW1pdHMoKSB9XG4gICAgaWYgKHRhYiA9PT0gJ3JldmlldycpIHZvaWQgbG9hZElzc3VlcygpXG4gICAgaWYgKHRhYiA9PT0gJ2V4ZWN1dGlvbicpIHsgdm9pZCBsb2FkU2NoZWR1bGVkKCk7IGlmIChydW5EZXRhaWwgIT09IG51bGwpIHZvaWQgbG9hZFJ1bkRldGFpbChydW5EZXRhaWwucnVuLmlkKSB9XG4gICAgaWYgKHRhYiA9PT0gJ3NldHRpbmdzJyAmJiBtb2RlbFRpZXJzID09PSBudWxsKSB2b2lkIGxvYWRNb2RlbENvbmZpZygpXG4gIH0sIFt0YWIsIHByb3BzLnNlc3Npb25JZF0pXG5cbiAgY29uc3QgbG9hZE1vZGVsQ29uZmlnID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9tb2RlbC1jb25maWcnKVxuICAgICAgaWYgKCFyZXNwb25zZS5vaykgcmV0dXJuXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBzZXRNb2RlbFRpZXJzKChkYXRhIGFzIHsgdGllcnM6IFJlY29yZDxzdHJpbmcsIHsgcHJvdmlkZXI6IHN0cmluZzsgbW9kZWw6IHN0cmluZyB9PiB9KS50aWVycyA/PyB7fSlcbiAgICAgIHNldE1vZGVsT3B0aW9ucygoZGF0YSBhcyB7IG9wdGlvbnM6IEFycmF5PHsgcHJvdmlkZXI6IHN0cmluZzsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nIH0+IH0pLm9wdGlvbnMgPz8gW10pXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTZBMjFcdTU3OEJcdTkxNERcdTdGNkVcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcbiAgICB9XG4gIH1cblxuICBjb25zdCBzYXZlTW9kZWxDb25maWcgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKG1vZGVsVGllcnMgPT09IG51bGwpIHJldHVyblxuICAgIHNldE1vZGVsU2F2aW5nKHRydWUpXG4gICAgc2V0TW9kZWxTYXZlZChmYWxzZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbW9kZWwtY29uZmlnJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdGllcnM6IG1vZGVsVGllcnMgfSksXG4gICAgICB9KVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHNldE1vZGVsU2F2ZWQodHJ1ZSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHNldE1vZGVsU2F2ZWQoZmFsc2UpIH0sIDI1MDApXG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldE1vZGVsU2F2aW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlZnJlc2hTdGF0ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCByZWZyZXNoZWQgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvc3RhdGU/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSwgeyBoZWFkZXJzOiB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0gfSlcbiAgICBpZiAocmVmcmVzaGVkLm9rKSBzZXRTdGF0ZShhd2FpdCByZWZyZXNoZWQuanNvbigpIGFzIFdvcmtzcGFjZVN0YXRlKVxuICB9XG5cbiAgLyoqIFx1N0VERlx1NEUwMFx1NTJBOFx1NEY1Q1x1NjI2N1x1ODg0Q1x1NTY2OFx1RkYxQVBPU1QgXHU1QkJGXHU0RTNCIEFQSVx1RkYwOFx1NjQzQVx1NUUyNlx1NEYxQVx1OEJERCBpZCBcdTRGOUJcdTY3MERcdTUyQTFcdTdBRUZcdTVCOUFcdTRGNERcdTk4NzlcdTc2RUVcdTVERTVcdTRGNUNcdTUzM0FcdUZGMDlcdUZGMENcdThGOTNcdTUxRkFcdThGREJcdTdFRDNcdTY3OUNcdTk3NjJcdTY3N0ZcdUZGMENcdTVCOENcdTYyMTBcdTU0MEVcdTUyMzdcdTY1QjBcdTcyQjZcdTYwMDFcdTMwMDIgKi9cbiAgY29uc3QgcnVuQWN0aW9uID0gYXN5bmMgKG5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldEJ1c3kobmFtZSlcbiAgICBzZXRBY3Rpb25SZXN1bHQobnVsbClcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdChwYXRoLCBib2R5KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoYFx1MjcxNyAke1N0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpfWApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KGZvcm1hdEFjdGlvblJlc3VsdChkYXRhKSlcbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdChgXHUyNzE3ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWApXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJ1c3kobnVsbClcbiAgICB9XG4gIH1cblxuICBjb25zdCBydW5Cb290c3RyYXAgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0Qm9vdHN0cmFwcGluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ib290c3RyYXAnLCB7fSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0TG9hZEVycm9yKFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldExvYWRFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJvb3RzdHJhcHBpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29uZmlybU1lbW9yeSA9IGFzeW5jIChtZW1vcnlJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5L2NvbmZpcm0nLCB7IG1lbW9yeUlkIH0pXG4gICAgaWYgKG9rKSB7XG4gICAgICBzZXRTdGF0ZSgocHJldmlvdXMpID0+IHByZXZpb3VzID09PSBudWxsID8gcHJldmlvdXMgOiB7XG4gICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICBtZW1vcmllczogcHJldmlvdXMubWVtb3JpZXM/Lm1hcCgobWVtb3J5KSA9PiBtZW1vcnkuaWQgPT09IG1lbW9yeUlkID8geyAuLi5tZW1vcnksIGlzSHVtYW5Db25maXJtZWQ6IHRydWUsIHRydXRoTGV2ZWw6ICdmYWN0JyB9IDogbWVtb3J5KSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcHJvamVjdCA9IHN0YXRlPy5wcm9qZWN0ID8/IG51bGxcbiAgY29uc3QgYm9vdHN0cmFwID0gc3RhdGU/LmJvb3RzdHJhcCA/PyBudWxsXG4gIGNvbnN0IGNoYW5nZXMgPSBzdGF0ZT8uY2hhbmdlcyA/PyBbXVxuICBjb25zdCBydW5zID0gc3RhdGU/LnJ1bnMgPz8gW11cbiAgY29uc3QgdmVyaWZpY2F0aW9ucyA9IHN0YXRlPy52ZXJpZmljYXRpb25zID8/IFtdXG4gIGNvbnN0IGNvbmZpcm1lZCA9IHN0YXRlPy5jb25maXJtZWQgPz8gW11cbiAgY29uc3QgY29uY2VwdHMgPSBzdGF0ZT8uY29uY2VwdHMgPz8gW11cblxuICBjb25zdCB0YWJzOiBBcnJheTx7IGtleTogVGFiS2V5OyBsYWJlbDogc3RyaW5nIH0+ID0gW1xuICAgIHsga2V5OiAnY29tbWl0cycsIGxhYmVsOiB0KCd0YWIuY29tbWl0cycpIH0sXG4gICAgeyBrZXk6ICdvdmVydmlldycsIGxhYmVsOiB0KCd0YWIub3ZlcnZpZXcnKSB9LFxuICAgIHsga2V5OiAnZXhlY3V0aW9uJywgbGFiZWw6IHQoJ3RhYi5leGVjdXRpb24nKSB9LFxuICAgIHsga2V5OiAncmV2aWV3JywgbGFiZWw6IHQoJ3RhYi5yZXZpZXcnKSB9LFxuICAgIHsga2V5OiAnbm90ZXMnLCBsYWJlbDogdCgndGFiLm5vdGVzJykgfSxcbiAgICB7IGtleTogJ3NldHRpbmdzJywgbGFiZWw6IHQoJ3RhYi5zZXR0aW5ncycpIH0sXG4gIF1cblxuICAvKiogXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDXHU5NzYyXHU2NzdGXHVGRjA4XHU2MDNCXHU4OUM4XHU5ODc1XHU3QjdFXHU3Njg0XHU1RkVCXHU2Mzc3XHU1MkE4XHU0RjVDXHU1MTcxXHU3NTI4XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHJlc3VsdFBhbmVsID0gYWN0aW9uUmVzdWx0ICE9PSBudWxsXG4gICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KENhcmQsIHsgdGl0bGU6IHQoJ3Jlc3VsdC5wYW5lbCcpIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5yZXN1bHQgfSwgYWN0aW9uUmVzdWx0KSlcbiAgICA6IG51bGxcbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcbiAgLy8gXHU5ODc2XHU5MEU4XHVGRjFBXHU0RUQzXHU1RTkzXHU2ODBGICsgXHU2M0QwXHU0RUE0XHU1OTFBXHU5MDA5XHU0RTBCXHU2MkM5XHVGRjA4XHU3RUE2IDEvNSBcdTlBRDhcdTVFQTZcdUZGMDlcdUZGMUJcdTRFMEJcdTY1QjlcdTY3N0ZcdTU3NTdcdTUzNjBcdTUxNjhcdTVCQkRcdTMwMDJcbiAgY29uc3QgYWxsVGFyZ2V0czogQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgbWV0YTogc3RyaW5nOyBzaGE6IHN0cmluZyB9PiA9IFtdXG4gIGlmIChjb21taXRzRGF0YSAhPT0gbnVsbCkge1xuICAgIGlmICghY29tbWl0c0RhdGEud29ya2luZy5pc0NsZWFuKSB7XG4gICAgICBhbGxUYXJnZXRzLnB1c2goe1xuICAgICAgICBrZXk6ICd3b3JraW5nJyxcbiAgICAgICAgbGFiZWw6IGBcdTI1Q0YgJHt0KCdyZXBvLndvcmtpbmcnKX1cdUZGMDgke2NvbW1pdHNEYXRhLndvcmtpbmcuZmlsZUNvdW50fVx1RkYwOWAsXG4gICAgICAgIG1ldGE6IGNvbW1pdHNEYXRhLndvcmtpbmcuZmlsZXMuc2xpY2UoMCwgMykubWFwKChmaWxlKSA9PiBmaWxlLnBhdGguc3BsaXQoJy8nKS5wb3AoKSkuam9pbignLCAnKSxcbiAgICAgICAgc2hhOiAnd29ya2luZycsXG4gICAgICB9KVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGNvbW1pdCBvZiBjb21taXRzRGF0YS5jb21taXRzKSB7XG4gICAgICBjb25zdCBhZGRzID0gY29tbWl0LmZpbGVzLnJlZHVjZSgoc3VtLCBmaWxlKSA9PiBzdW0gKyBmaWxlLmFkZHMsIDApXG4gICAgICBjb25zdCBkZWxzID0gY29tbWl0LmZpbGVzLnJlZHVjZSgoc3VtLCBmaWxlKSA9PiBzdW0gKyBmaWxlLmRlbHMsIDApXG4gICAgICBhbGxUYXJnZXRzLnB1c2goe1xuICAgICAgICBrZXk6IGNvbW1pdC5zaGEsXG4gICAgICAgIGxhYmVsOiBjb21taXQuc3ViamVjdCxcbiAgICAgICAgbWV0YTogYCR7Y29tbWl0LnNob3J0SGFzaH0gXHUwMEI3ICR7Y29tbWl0LmF1dGhvcn0gXHUwMEI3ICR7bmV3IERhdGUoY29tbWl0LmRhdGUpLnRvTG9jYWxlU3RyaW5nKCl9IFx1MDBCNyArJHthZGRzfS8tJHtkZWxzfWAsXG4gICAgICAgIHNoYTogY29tbWl0LnNoYSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIGNvbnN0IHNob3J0TGFiZWwgPSAoc2hhOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGlmIChzaGEgPT09ICd3b3JraW5nJykgcmV0dXJuIHQoJ3JlcG8ud29ya2luZycpXG4gICAgY29uc3QgdGFyZ2V0ID0gYWxsVGFyZ2V0cy5maW5kKChlbnRyeSkgPT4gZW50cnkuc2hhID09PSBzaGEpXG4gICAgcmV0dXJuIGAkeyh0YXJnZXQ/Lm1ldGEuc3BsaXQoJyBcdTAwQjcgJylbMF0pID8/IHNoYS5zbGljZSgwLCA3KX0gJHt0YXJnZXQ/LmxhYmVsID8/ICcnfWAudHJpbSgpXG4gIH1cbiAgY29uc3QgZmlsdGVyZWRUYXJnZXRzID0gcGlja2VyRmlsdGVyLnRyaW0oKSA9PT0gJydcbiAgICA/IGFsbFRhcmdldHNcbiAgICA6IGFsbFRhcmdldHMuZmlsdGVyKChlbnRyeSkgPT4gKGVudHJ5LmxhYmVsICsgZW50cnkubWV0YSkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhwaWNrZXJGaWx0ZXIudHJpbSgpLnRvTG93ZXJDYXNlKCkpKVxuXG4gIGNvbnN0IGltcGFjdFJpc2tDb2xvciA9IHRoZW1lQXdhcmVUZXh0KGltcGFjdCA9PT0gbnVsbCA/ICcjNTc2MDZhJyA6IChSSVNLX0NPTE9SW2ltcGFjdC5yaXNrTGV2ZWxdID8/ICcjNTc2MDZhJykpXG5cbiAgY29uc3QgY29tbWl0c1RhYiA9IChcbiAgICA8PlxuICAgICAgey8qIFx1NEVEM1x1NUU5M1x1NjgwRiAqL31cbiAgICAgIDxDYXJkPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzI1NjNlYicpfT57Y29tbWl0c0RhdGE/LmJyYW5jaCA/PyAnXHUyMDE0J308L3NwYW4+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JyB9fT57Y29tbWl0c0RhdGE/LnJvb3RQYXRoID8/IHByb2plY3Q/LnJvb3RQYXRoID8/ICdcdTIwMTQnfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRDb21taXRzKCkgfX0+e3QoJ2FjdGlvbi5yZWZyZXNoJyl9PC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9XG4gICAgICAgICAgICBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3NjYW5IaXN0b3J5JywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2Jvb3RzdHJhcCcsIHsgaW5jbHVkZUhpc3Rvcnk6IHRydWUsIHN1bW1hcml6ZTogdHJ1ZSwgbWF4Q29tbWl0czogMzAgfSkgfX1cbiAgICAgICAgICA+e2J1c3kgPT09ICdzY2FuSGlzdG9yeScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgncmVwby5zY2FuSGlzdG9yeScpfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FyZD5cbiAgICAgIHsvKiBcdTYzRDBcdTRFQTRcdTU5MUFcdTkwMDlcdTRFMEJcdTYyQzlcdUZGMDhcdTdEMjdcdTUxRDFcdUZGMUJcdTkwMDlcdTRFMkRcdTUxODVcdTVCQjlcdTVCOENcdTY1NzRcdTVDNTVcdTc5M0FcdUZGMENcdTUxNDFcdThCQjhcdTgxRUFcdTcxMzZcdTYzNjJcdTg4NENcdUZGMDkgKi99XG4gICAgICA8Q2FyZCB0aXRsZT17dCgncGlja2VyLnRpdGxlJyl9PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnIH19PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHdpZHRoOiAnMTAwJScsIHRleHRBbGlnbjogJ2xlZnQnLCBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0Jywgd2hpdGVTcGFjZTogJ25vcm1hbCcgfX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0UGlja2VyT3BlbighcGlja2VyT3BlbikgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtaW5XaWR0aDogMCB9fT5cbiAgICAgICAgICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDBcbiAgICAgICAgICAgICAgICA/IHQoJ3BpY2tlci5wbGFjZWhvbGRlcicpXG4gICAgICAgICAgICAgICAgOiBgJHt0KCdwaWNrZXIuc2VsZWN0ZWQnKX0gJHtzZWxlY3RlZFRhcmdldHMubGVuZ3RofVx1RkYxQSR7c2VsZWN0ZWRUYXJnZXRzLm1hcChzaG9ydExhYmVsKS5qb2luKCdcdUZGMUInKX1gfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWFyZ2luTGVmdDogJzhweCcsIGZsZXhTaHJpbms6IDAgfX0+XHUyNUJFPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIHtwaWNrZXJPcGVuICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCB6SW5kZXg6IDI5IH19IG9uQ2xpY2s9eygpID0+IHsgc2V0UGlja2VyT3BlbihmYWxzZSkgfX0gLz5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICdjYWxjKDEwMCUgKyA0cHgpJywgbGVmdDogMCwgcmlnaHQ6IDAsIHpJbmRleDogMzAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JywgYm94U2hhZG93OiAnMCA4cHggMjRweCByZ2JhKDAsMCwwLDAuMTIpJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc4cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5pbnB1dH1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ3BpY2tlci5maWx0ZXInKX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3BpY2tlckZpbHRlcn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBpY2tlckZpbHRlcihlLnRhcmdldC52YWx1ZSkgfX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHNldFNlbGVjdGVkVGFyZ2V0cyhbXSkgfX0+e3QoJ3BpY2tlci5jbGVhcicpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWF4SGVpZ2h0OiA0MjAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgICAge2FsbFRhcmdldHMubWFwKChlbnRyeSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtlbnRyeS5rZXl9XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc3cHggMTJweCcsIGN1cnNvcjogJ3BvaW50ZXInLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKGVudHJ5LnNoYSkgPyAncmdiYSgzNyw5OSwyMzUsMC4wNyknIDogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCB0b2dnbGVUYXJnZXQoZW50cnkuc2hhKSB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgd2lkdGg6ICcxNHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLCBmb250V2VpZ2h0OiA3MDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKGVudHJ5LnNoYSkgPyAnXHUyNzEzJyA6ICcnfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtaW5XaWR0aDogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCwgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19PntlbnRyeS5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57ZW50cnkubWV0YX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAge2ZpbHRlcmVkVGFyZ2V0cy5sZW5ndGggPT09IDAgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncGlja2VyLm5vTWF0Y2gnKX08L2Rpdj59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Ub3A6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgncGlja2VyLmhpbnQnKX08L3NwYW4+XG4gICAgICAgICAge2RldGFpbExvYWRpbmcgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnI2RjZGNhYScpfT57dCgnZGV0YWlsLmFpTG9hZGluZycpfTwvc3Bhbj59XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9DYXJkPlxuXG4gICAgICB7Y29tbWl0c0Vycm9yICE9PSBudWxsICYmIDxDYXJkPjxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3JlcG8ubG9hZEZhaWxlZCcpfToge2NvbW1pdHNFcnJvcn08L2Rpdj48L0NhcmQ+fVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDAgJiYgPENhcmQ+PGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZGV0YWlsLnBpY2snKX08L2Rpdj48L0NhcmQ+fVxuXG4gICAgICB7LyogXHU1REU1XHU0RjVDXHU4RjZFXHU2QjIxXHU1M0Q5XHU0RThCXHVGRjFBXHU1OTFBXHU2M0QwXHU0RUE0XHU2NTc0XHU0RjUzXHU4OUUzXHU4QkZCICovfVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5maWx0ZXIoKHRhcmdldCkgPT4gdGFyZ2V0ICE9PSAnd29ya2luZycpLmxlbmd0aCA+PSAyICYmIChcbiAgICAgICAgPENhcmQgdGl0bGU9eydcdUQ4M0RcdURDRDYgJyArIHQoJ25hcnJhdGl2ZS50aXRsZScpfT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogbmFycmF0aXZlID09PSBudWxsID8gJzAnIDogJzhweCcgfX0+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17bmFycmF0aXZlQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWROYXJyYXRpdmUoKSB9fT5cbiAgICAgICAgICAgICAge25hcnJhdGl2ZUJ1c3kgPyB0KCduYXJyYXRpdmUucnVubmluZycpIDogJ1x1MjcyOCAnICsgdCgnbmFycmF0aXZlLmdlbmVyYXRlJyl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgbmFycmF0aXZlLmNhY2hlZCAmJiAoXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdjYWNoZS5oaXQnKX17bmFycmF0aXZlLmdlbmVyYXRlZEF0ICE9PSB1bmRlZmluZWQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUobmFycmF0aXZlLmdlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9PC9zcGFuPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17bmFycmF0aXZlQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWROYXJyYXRpdmUodHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtuYXJyYXRpdmVFcnJvciAhPT0gJycgJiYgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuZW1wdHksIGNvbG9yOiAnI2QxMjQyZicgfX0+e25hcnJhdGl2ZUVycm9yfTwvZGl2Pn1cbiAgICAgICAgICB7bmFycmF0aXZlICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcgfX0+e3JlbmRlclN0cnVjdHVyZWRDb250ZW50KG5hcnJhdGl2ZS5uYXJyYXRpdmUpfTwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBcdTZCQ0ZcdTY3NjFcdTkwMDlcdTRFMkRcdTYzRDBcdTRFQTRcdTc2ODQgQUkgXHU4OUUzXHU4QkZCICovfVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5tYXAoKHRhcmdldCkgPT4ge1xuICAgICAgICBjb25zdCBkID0gZGV0YWlsc1t0YXJnZXRdXG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IChkPy5jb21taXQ/Lm1lc3NhZ2UgPz8gdGFyZ2V0LnNsaWNlKDAsIDgpKVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxDYXJkIGtleT17YGQtJHt0YXJnZXR9YH0gdGl0bGU9e2BcdUQ4M0RcdUREMEQgJHtsYWJlbH0ke3RhcmdldCAhPT0gJ3dvcmtpbmcnID8gYFx1RkYwOCR7dGFyZ2V0LnNsaWNlKDAsIDgpfVx1RkYwOWAgOiAnJ31gfT5cbiAgICAgICAgICAgIHtkICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAge2QuYW5hbHlzaXNDYWNoZWQgPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57dCgnY2FjaGUuaGl0Jyl9e2QuYW5hbHlzaXNHZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShkLmFuYWx5c2lzR2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZERldGFpbCh0YXJnZXQsIHRydWUpIH19Pnt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ2RldGFpbC5zYXZlTm90ZUhpbnQnKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hhID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyAnd29ya2luZycgOiB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3RlcycsIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogYCR7dCgnZGV0YWlsLnNhdmVOb3RlVGl0bGUnKX1cdUZGMUEkeyhkLmNvbW1pdD8ubWVzc2FnZSA/PyB0YXJnZXQpLnNsaWNlKDAsIDYwKX1gLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFtgXHUzMDEwXHU2NTM5XHU0RTg2XHU0RUMwXHU0RTQ4XHUzMDExXFxuJHtkLmFuYWx5c2lzLndoYXR9YCwgYFx1MzAxMFx1NUI5RVx1NzNCMFx1OTAzQlx1OEY5MVx1MzAxMVxcbiR7ZC5hbmFseXNpcy5sb2dpY31gLCBgXHUzMDEwXHU5OENFXHU5NjY5XHU3MEI5XHUzMDExXFxuJHtkLmFuYWx5c2lzLnJpc2t9YF0uZmlsdGVyKChibG9jaykgPT4gIWJsb2NrLmVuZHNXaXRoKCdcdTMwMTFcXG4nKSkuam9pbignXFxuXFxuJyksXG4gICAgICAgICAgICAgICAgICAgICAgc2hhLCB0YWdzOiAnXHU2ODM4XHU2N0U1JyxcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoeyBvayB9KSA9PiB7IHNldEFjdGlvblJlc3VsdChvayA/ICdcdTI3MTMgXHU1REYyXHU1QjU4XHU0RTNBXHU3QjE0XHU4QkIwXHVGRjA4XHU3QjE0XHU4QkIwXHU5ODc1XHU1M0VGXHU2N0U1XHU3NzBCXHVGRjA5JyA6ICdcdTI3MTcgXHU0RkREXHU1QjU4XHU1OTMxXHU4RDI1JykgOyBpZiAob2spIHZvaWQgbG9hZE5vdGVzKCkgfSlcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlx1RDgzRFx1RENCRSB7dCgnZGV0YWlsLnNhdmVOb3RlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XG4gICAgICAgICAgICAgICAgICB0aXRsZT17dCgnZGV0YWlsLnNhdmVNZW1vcnlIaW50Jyl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoYSA9IHRhcmdldCA9PT0gJ3dvcmtpbmcnID8gdW5kZWZpbmVkIDogdGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5Jywge1xuICAgICAgICAgICAgICAgICAgICAgIG1lbW9yeVR5cGU6ICdyaXNrX2hvdHNwb3QnLCBzb3VyY2VUYWc6ICdyZXZpZXcnLCBiYXNpc1NoYTogc2hhLFxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBgXHU2ODM4XHU2N0U1XHU3RUQzXHU4QkJBXHVGRjFBJHsoZC5jb21taXQ/Lm1lc3NhZ2UgPz8gdGFyZ2V0KS5zbGljZSgwLCA2MCl9YCxcbiAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBbZC5hbmFseXNpcy53aGF0LCBkLmFuYWx5c2lzLnJpc2tdLmZpbHRlcigocGFydCkgPT4gcGFydCAhPT0gJycpLmpvaW4oJ1xcbi0tLVxcbicpLFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCh7IG9rIH0pID0+IHsgc2V0QWN0aW9uUmVzdWx0KG9rID8gJ1x1MjcxMyBcdTVERjJcdTZDODlcdTZEQzBcdTRFM0FcdThCQjBcdTVGQzZcdUZGMDhcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTdcdUZGMDknIDogJ1x1MjcxNyBcdTRGRERcdTVCNThcdTU5MzFcdThEMjUnKTsgaWYgKG9rKSB2b2lkIGxvYWRNZW1vcmllcygpIH0pXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cdUQ4M0VcdURERTAge3QoJ2RldGFpbC5zYXZlTWVtb3J5Jyl9PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtkID09PSB1bmRlZmluZWQgPyAoXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2RldGFpbC5haUxvYWRpbmcnKX08L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAge2QuY29tbWl0ICE9PSBudWxsICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5jb21taXRNZXRhfT57ZC5jb21taXQuYXV0aG9yfSBcdTAwQjcge25ldyBEYXRlKGQuY29tbWl0LmRhdGUpLnRvTG9jYWxlU3RyaW5nKCl9IFx1MDBCNyB7ZC5maWxlcy5sZW5ndGh9IHt0KCdkZXRhaWwuZmlsZXMnKX0gXHUwMEI3ICt7ZC5pbnNlcnRpb25zfS8te2QuZGVsZXRpb25zfTwvZGl2Pn1cbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy53aGF0ICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzhweCcgfX0+e3QoJ2RldGFpbC53aGF0Jyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy53aGF0fT57ZC5hbmFseXNpcy53aGF0fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5sb2dpYy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zZWN0aW9uVGl0bGV9Pnt0KCdkZXRhaWwubG9naWMnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2QuYW5hbHlzaXMubG9naWMubWFwKChzdGVwLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXtzdHlsZXMubG9naWNTdGVwfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJywgZm9udFdlaWdodDogNjAwIH19PntpICsgMX0uPC9zcGFuPntzdGVwfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2QuYW5hbHlzaXMucmlza3MubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzZweCcgfX0+e3QoJ2RldGFpbC5yaXNrJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLnJpc2tzLm1hcCgocmlzaywgaSkgPT4gPGRpdiBrZXk9e2l9IHN0eWxlPXtzdHlsZXMucmlza0l0ZW19Plx1MjZBMCB7cmlza308L2Rpdj4pfVxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7LyogXHU2NTg3XHU0RUY2XHU2RTA1XHU1MzU1ICsgXHU5MDEwXHU2NTg3XHU0RUY2XHU5QUQ4XHU0RUFFXHU1QkY5XHU2QkQ0ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnMTBweCcgfX0+e3QoJ2RldGFpbC5maWxlcycpfTwvZGl2PlxuICAgICAgICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAge2QuZmlsZXMubWFwKChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7dGFyZ2V0fXwke2ZpbGUucGF0aH1gXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF0Y2ggPSBmaWxlRGlmZnNba2V5XVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtrZXl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19PntmaWxlLnBhdGh9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBjb2xvcjogJyMxYTdmMzcnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT4re2ZpbGUuYWRkc308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGNvbG9yOiAnI2NmMjIyZScsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19Pi17ZmlsZS5kZWxzfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZEZpbGVEaWZmKHRhcmdldCwgZmlsZS5wYXRoKSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3BhdGNoID09PSB1bmRlZmluZWQgPyB0KCdkaWZmLnNob3cnKSA6IHQoJ2RpZmYuaGlkZScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3BhdGNoICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2Ake2tleX0tZGlmZmB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49ezR9IHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgcGFkZGluZzogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPERpZmZWaWV3IHBhdGNoPXtwYXRjaH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgIClcbiAgICAgIH0pfVxuXG4gICAgICB7LyogXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHVGRjFBXHU2MzA5XHU5NEFFICsgXHU5OENFXHU5NjY5XHU2Nzg0XHU2MjEwICsgXHU1OTI3XHU1NkZFICsgXHU1RjcxXHU1NENEXHU3MEI5XHU2NjBFXHU3RUM2ICsgXHU4QkIwXHU1RkM2XHU4MDU0XHU1MkE4ICovfVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgPENhcmQgdGl0bGU9e3QoJ2RldGFpbC5pbXBhY3QnKX0+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2ltcGFjdExvYWRpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkSW1wYWN0KCkgfX0+XG4gICAgICAgICAgICB7aW1wYWN0TG9hZGluZyA/IHQoJ2RldGFpbC5pbXBhY3RMb2FkaW5nJykgOiB0KCdkZXRhaWwuaW1wYWN0Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiBpbXBhY3QuZXhwbGFuYXRpb25zQ2FjaGVkID09PSB0cnVlICYmIChcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5iYWRnZSgnIzhiOGI4YicpLCBtYXJnaW5MZWZ0OiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAge3QoJ2NhY2hlLmhpdCcpfXtpbXBhY3QuZ2VuZXJhdGVkQXQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUoaW1wYWN0LmdlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgbWFyZ2luTGVmdDogJzhweCcsIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17aW1wYWN0TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJbXBhY3QodHJ1ZSkgfX0+XG4gICAgICAgICAgICAgIHt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtpbXBhY3QgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICcxMHB4JywgbWFyZ2luOiAnMTBweCAwIDRweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKGltcGFjdFJpc2tDb2xvciksIGZvbnRTaXplOiAnMTNweCcsIHBhZGRpbmc6ICczcHggMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICB7dCgnaW1wYWN0LnJpc2snKX06IHtpbXBhY3Qucmlza0xldmVsfVx1RkYwOHtpbXBhY3Qucmlza1Njb3JlfVx1RkYwOVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7aW1wYWN0LmtleUNoYW5nZVBvaW50cyAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5rZXlDaGFuZ2VQb2ludHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJyM5YTY3MDAnIH19Plx1MjZBMCB7dCgnaW1wYWN0LmtleVBvaW50cycpfToge2ltcGFjdC5rZXlDaGFuZ2VQb2ludHMubWFwKChmaWxlKSA9PiBmaWxlLnNwbGl0KCcvJykucG9wKCkpLmpvaW4oJ1x1MzAwMScpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge2ltcGFjdC5yaXNrRmFjdG9ycyAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5yaXNrRmFjdG9ycy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnNlY3Rpb25UaXRsZX0+e3QoJ2ltcGFjdC5mYWN0b3JzJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogJzJweCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICB7aW1wYWN0LnJpc2tGYWN0b3JzLm1hcCgoZmFjdG9yLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgZm9udFNpemU6ICcxMnB4JywgcGFkZGluZzogJzNweCA4cHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJywgYm9yZGVyUmFkaXVzOiAnNHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntmYWN0b3IudGV4dH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogaW1wYWN0Umlza0NvbG9yLCBmb250V2VpZ2h0OiA2MDAgfX0+K3tmYWN0b3IucG9pbnRzfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPEltcGFjdEdyYXBoIGRhdGE9e2ltcGFjdH0gdD17dH0gLz5cbiAgICAgICAgICAgICAge2ltcGFjdC5sZXZlbHMubGVuZ3RoID09PSAwICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2ltcGFjdC5ub25lJyl9PC9kaXY+fVxuICAgICAgICAgICAgICB7LyogXHU1MUZEXHU2NTcwXHU3RUE3XHU1RjcxXHU1NENEXHVGRjFBXHU2NzJDXHU2QjIxXHU0RkVFXHU2NTM5XHU0RTg2XHU1NEVBXHU0RTlCXHU1MUZEXHU2NTcwXHUzMDAxXHU2Q0UyXHU1M0NBXHU0RTg2XHU4QzAxXHU3Njg0XHU1NEVBXHU0RTlCXHU1MUZEXHU2NTcwXHUzMDAxXHU4QzAzXHU3NTI4XHU3MEI5XHU1NzI4XHU1NEVBICovfVxuICAgICAgICAgICAgICB7aW1wYWN0LmZ1bmN0aW9uSW1wYWN0ICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LmZ1bmN0aW9uSW1wYWN0Lmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzEycHgnIH19Pnt0KCdpbXBhY3QuZnVuY3Rpb25zJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogJzhweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpbXBhY3QuZnVuY3Rpb25JbXBhY3QubWFwKChlbnRyeSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeS5zeW1ib2x9IHN0eWxlPXt7IGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMTBweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjZDk3NzA2Jyl9PntlbnRyeS5zeW1ib2x9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMubGFiZWwsIG1hcmdpbkxlZnQ6ICc4cHgnIH19PntlbnRyeS5kZWZpbmVkSW59PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkucm9sZSAhPT0gdW5kZWZpbmVkICYmIGVudHJ5LnJvbGUgIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCwgbWFyZ2luVG9wOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBkaXNwbGF5OiAnaW5saW5lJywgbWFyZ2luSW5saW5lRW5kOiAnNnB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Pnt0KCdpbXBhY3QuZnVuY1JvbGUnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LnJvbGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5jaGFuZ2UgIT09IHVuZGVmaW5lZCAmJiBlbnRyeS5jaGFuZ2UgIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBkaXNwbGF5OiAnaW5saW5lJywgbWFyZ2luSW5saW5lRW5kOiAnNnB4JywgY29sb3I6ICcjOWE2NzAwJyB9fT57dCgnaW1wYWN0LmZ1bmNDaGFuZ2UnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmltcGFjdCAhPT0gdW5kZWZpbmVkICYmIGVudHJ5LmltcGFjdCAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBtYXJnaW5Cb3R0b206ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdpbmxpbmUnLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnLCBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNjZTkxNzgnKSB9fT57dCgnaW1wYWN0LmZ1bmNDYWxsZXJzJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5pbXBhY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5jYWxsZXJzLm1hcCgoY2FsbGVyLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyAuLi5zdHlsZXMubG9naWNTdGVwLCBtYXJnaW5Ub3A6ICczcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAnI2Q5NzcwNicgfX0+XHUyMUIzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NhbGxlci5maWxlfTp7Y2FsbGVyLmxpbmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Plx1MjAxNCB7Y2FsbGVyLnNuaXBwZXQuc2xpY2UoMCwgODApfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge2ltcGFjdC5mdW5jdGlvbkltcGFjdCAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5mdW5jdGlvbkltcGFjdC5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2ltcGFjdC5mdW5jdGlvbnNOb25lJyl9PC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHtpbXBhY3QubWVtb3JpZXMgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3QubWVtb3JpZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxMHB4JywgcGFkZGluZzogJzhweCAxMHB4JywgYm9yZGVyOiAnMXB4IGRhc2hlZCByZ2JhKDM3LDk5LDIzNSwwLjM1KScsIGJvcmRlclJhZGl1czogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT57dCgnaW1wYWN0Lm1lbW9yeScpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhXcmFwOiAnd3JhcCcsIGdhcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpbXBhY3QubWVtb3JpZXMubWFwKChtZW1vcnksIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e2l9IHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyMyNTYzZWInKX0+e21lbW9yeS50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuXG4gICAgICB7LyogXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHVGRjFBXHU3RUQzXHU4QkJBICsgXHU3RUQzXHU2Nzg0XHU1MzE2XHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1ICovfVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgPENhcmQgdGl0bGU9e3QoJ2RldGFpbC5vcHRpbWFsaXR5Jyl9PlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtyZXZpZXdMb2FkaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJldmlld3MoKSB9fT5cbiAgICAgICAgICAgIHtyZXZpZXdMb2FkaW5nID8gdCgnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJykgOiB0KCdkZXRhaWwub3B0aW1hbGl0eScpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubWFwKCh0YXJnZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSByZXZpZXdzW3RhcmdldF1cbiAgICAgICAgICAgIGlmIChyID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsXG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRhcmdldCA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiB0YXJnZXQuc2xpY2UoMCwgOClcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtgci0ke3RhcmdldH1gfSBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgICAgICAgICB7ci5jYWNoZWQgPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9Pnt0KCdjYWNoZS5oaXQnKX17ci5nZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShyLmdlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkUmV2aWV3cyh0cnVlKSB9fT57dCgnY2FjaGUucmVnZW5lcmF0ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtyLnZlcmRpY3QgIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQsIGJhY2tncm91bmQ6ICdyZ2JhKDM3LDk5LDIzNSwwLjA1KScsIGJvcmRlcjogJzFweCBzb2xpZCByZ2JhKDM3LDk5LDIzNSwwLjIpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAxMHB4JyB9fT57ci52ZXJkaWN0fTwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge3IuaXNzdWVMaXN0ICE9PSB1bmRlZmluZWQgJiYgci5pc3N1ZUxpc3QubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0cj57WydyZXZpZXcuY29sLnNldmVyaXR5JywgJ3Jldmlldy5jb2wuY2F0ZWdvcnknLCAncmV2aWV3LmNvbC50aXRsZScsICdyZXZpZXcuY29sLmV2aWRlbmNlJywgJ3Jldmlldy5jb2wuZml4J10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgIHtyLmlzc3VlTGlzdC5tYXAoKGlzc3VlLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoaXNzdWUuc2V2ZXJpdHkgPT09ICdjcml0aWNhbCcgPyAnI2YxNGM0YycgOiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2hpZ2gnID8gJyNjZTkxNzgnIDogaXNzdWUuc2V2ZXJpdHkgPT09ICdtZWRpdW0nID8gJyNkY2RjYWEnIDogJyM1NjljZDYnKX0+e2lzc3VlLnNldmVyaXR5fTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2lzc3VlLmNhdGVnb3J5fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXNzdWUudGl0bGV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+e2lzc3VlLmV2aWRlbmNlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXNzdWUuZml4fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncmV2aWV3LmNsZWFuJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfSl9XG4gICAgICAgICAge3Jldmlld0xvYWRpbmcgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJyl9PC9kaXY+fVxuICAgICAgICAgIHshcmV2aWV3TG9hZGluZyAmJiBzZWxlY3RlZFRhcmdldHMuZXZlcnkoKHRhcmdldCkgPT4gcmV2aWV3c1t0YXJnZXRdID09PSB1bmRlZmluZWQpICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3Jldmlldy5oaW50Jyl9PC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cbiAgICA8Lz5cbiAgKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdThCQkVcdTdGNkVcdTk4NzVcdTdCN0UgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IFRJRVJfTEFCRUxTOiBBcnJheTx7IGtleTogc3RyaW5nOyB6aDogc3RyaW5nOyBkZXNjOiBzdHJpbmcgfT4gPSBbXG4gICAgeyBrZXk6ICdzdGFuZGFyZCcsIHpoOiAnXHU4OUUzXHU4QkZCIC8gXHU1MUZEXHU2NTcwXHU1RjcxXHU1NENEXHU4QkY0XHU2NjBFJywgZGVzYzogJ1x1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1NzY4NCBBSSBcdTg5RTNcdThCRkJcdTMwMDFcdTVGNzFcdTU0Q0RcdTUyMDZcdTY3OTAnIH0sXG4gICAgeyBrZXk6ICdyZWFzb25pbmcnLCB6aDogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNSAvIFx1NjI2N1x1ODg0Q1x1OEJBMVx1NTIxMicsIGRlc2M6ICdcdThCQzRcdTVCQTFcdTMwMDFcdThCQTFcdTUyMTJcdTc1MUZcdTYyMTBcdTMwMDFBSSBcdTVCNjZcdTRFNjBcdTYwM0JcdTdFRDMnIH0sXG4gICAgeyBrZXk6ICdmYXN0Jywgemg6ICdcdTUzODZcdTUzRjJcdThGN0JcdTY3OTAnLCBkZXNjOiAnXHU2MjZCXHU2M0NGXHU1Mzg2XHU1M0YyXHU2NUY2XHU3Njg0XHU5MDEwXHU2M0QwXHU0RUE0XHU0RTAwXHU1M0U1XHU4QkREJyB9LFxuICAgIHsga2V5OiAndmVyaWZpZXInLCB6aDogJ1x1OUE4Q1x1NjUzNicsIGRlc2M6ICdcdTY1MzlcdTUyQThcdTlBOENcdTY1MzZcdTc2ODQgQUkgXHU1OTBEXHU2ODM4JyB9LFxuICBdXG5cbiAgY29uc3Qgc2V0dGluZ3NUYWIgPSAoXG4gICAgPD5cbiAgICAgIHsvKiBcdTZBMjFcdTU3OEJcdTUyMDZcdTkxNERcdUZGMUFcdTUzRUZcdTg5QzZcdTUzMTZcdTUyMDdcdTYzNjJcdTU0MDRcdTRFRkJcdTUyQTFcdTc1MjhcdTc2ODRcdTZBMjFcdTU3OEJcdUZGMENcdTRGRERcdTVCNThcdTUzNzNcdTc1MUZcdTY1NDggKi99XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnbW9kZWwudGl0bGUnKX0+XG4gICAgICAgIHttb2RlbFRpZXJzID09PSBudWxsID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ21vZGVsLmxvYWRpbmcnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAge1RJRVJfTEFCRUxTLm1hcCgodGllcikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gbW9kZWxUaWVyc1t0aWVyLmtleV1cbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjdXJyZW50ID8gY3VycmVudC5wcm92aWRlciArICcvJyArIGN1cnJlbnQubW9kZWwgOiAnJ1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXt0aWVyLmtleX0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxMHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtaW5XaWR0aDogMTUwLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+e3RpZXIuemh9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogMjQwIH19XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgdiA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHYgPT09ICcnKSB7IHNldE1vZGVsVGllcnMoeyAuLi5tb2RlbFRpZXJzLCBbdGllci5rZXldOiB7IHByb3ZpZGVyOiAnJywgbW9kZWw6ICcnIH0gfSk7IHJldHVybiB9XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3Byb3ZpZGVyLCAuLi5yZXN0XSA9IHYuc3BsaXQoJy8nKVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gcmVzdC5qb2luKCcvJylcbiAgICAgICAgICAgICAgICAgICAgICBzZXRNb2RlbFRpZXJzKHsgLi4ubW9kZWxUaWVycywgW3RpZXIua2V5XTogeyBwcm92aWRlciwgbW9kZWwgfSB9KVxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e3QoJ21vZGVsLmZvbGxvd0NoYXQnKX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAge21vZGVsT3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9IHZhbHVlPXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAge29wdGlvbi5wcm92aWRlcn0gLyB7b3B0aW9uLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dGllci5kZXNjfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpblRvcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXttb2RlbFNhdmluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIHNhdmVNb2RlbENvbmZpZygpIH19PlxuICAgICAgICAgICAgICAgIHttb2RlbFNhdmluZyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdtb2RlbC5zYXZlJyl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICB7bW9kZWxTYXZlZCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNGVjOWIwJyl9Pnt0KCdtb2RlbC5zYXZlZCcpfTwvc3Bhbj59XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdtb2RlbC5oaW50Jyl9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8ZGl2IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXRlcnRpYXJ5LCAjOWNhM2FmKScsIHBhZGRpbmc6ICc4cHggMCcgfX0+XG4gICAgICAgIGRzaC1wcm9qZWN0LWNvbnRyb2wgdntzdGF0ZT8ucGx1Z2luVmVyc2lvbiA/PyAnPyd9XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKVxuXG4gIGNvbnN0IG92ZXJ2aWV3VGFiID0gKFxuICAgIDw+XG4gICAgICA8Q2FyZD5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2Jvb3RzdHJhcHBpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5Cb290c3RyYXAoKSB9fT5cbiAgICAgICAgICAgIHtib290c3RyYXBwaW5nID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi5yZXNjYW4nKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbH0gb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignYW5hbHl6ZScsICcvcHJvamVjdC1jb250cm9sL2FwaS9hbmFseXplJywge30pIH19PlxuICAgICAgICAgICAge2J1c3kgPT09ICdhbmFseXplJyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24uYW5hbHl6ZScpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtidXN5ICE9PSBudWxsfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCd2ZXJpZnknLCAnL3Byb2plY3QtY29udHJvbC9hcGkvdmVyaWZ5Jywge30pIH19PlxuICAgICAgICAgICAge2J1c3kgPT09ICd2ZXJpZnknID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi52ZXJpZnknKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NhcmQ+XG4gICAgICB7cmVzdWx0UGFuZWx9XG4gICAgICB7cHJvamVjdCA9PT0gbnVsbCA/IChcbiAgICAgICAgPENhcmQ+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTNweCcsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+e3QoJ3N0YXRlLm5vUHJvamVjdCcpfTwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3N0YXRlLm5vUHJvamVjdEhpbnQnKX08L2Rpdj5cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKSA6IChcbiAgICAgICAgPENhcmQgdGl0bGU9e2Ake3QoJ3N0YXRlLnByb2plY3QnKX1cdUZGMUEke3Byb2plY3QubmFtZX1gfT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9PlJvb3Q8L3NwYW4+e3Byb2plY3Qucm9vdFBhdGh9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtib290c3RyYXAgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLnRlY2hTdGFjaycpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHtib290c3RyYXAudGVjaFN0YWNrLm1hcCgodGVjaCkgPT4gPHNwYW4ga2V5PXt0ZWNofSBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNGVjOWIwJyl9Pnt0ZWNofTwvc3Bhbj4pfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS5zeW1ib2xzJyl9PC9zcGFuPntTdHJpbmcoYm9vdHN0cmFwLnN5bWJvbHNDb3VudCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS5tYW5pZmVzdHMnKX08L3NwYW4+e1N0cmluZyhib290c3RyYXAubWFuaWZlc3RGaWxlcy5sZW5ndGgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUuZXZpZGVuY2UnKX08L3NwYW4+e1N0cmluZyhzdGF0ZT8uZXZpZGVuY2VDb3VudCA/PyAwKX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Ub3A6ICc4cHgnIH19Pntib290c3RyYXAuc3VtbWFyeX08L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnY29uZmlybWVkLnRpdGxlJyl9PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgPHRleHRhcmVhIHJvd3M9ezJ9IHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHBsYWNlaG9sZGVyPXt0KCdjb25maXJtZWQudGV4dCcpfSB2YWx1ZT17Y29uZmlybWVkVGV4dH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENvbmZpcm1lZFRleHQoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdjb25maXJtZWQucGF0aHMnKX0gdmFsdWU9e2NvbmZpcm1lZFBhdGhzfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q29uZmlybWVkUGF0aHMoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5idXR0b259XG4gICAgICAgICAgICBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBjb25maXJtZWRUZXh0ID09PSAnJ31cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2FkZENvbmZpcm1lZCcsICcvcHJvamVjdC1jb250cm9sL2FwaS9jb25maXJtZWQnLCB7IHR5cGU6ICdjb25zdHJhaW50JywgdGV4dDogY29uZmlybWVkVGV4dCwgZm9yYmlkZGVuUGF0aHM6IGNvbmZpcm1lZFBhdGhzLnNwbGl0KCcsJykubWFwKChwYXRoKSA9PiBwYXRoLnRyaW0oKSkuZmlsdGVyKChwYXRoKSA9PiBwYXRoICE9PSAnJykgfSkudGhlbigoKSA9PiB7IHNldENvbmZpcm1lZFRleHQoJycpOyBzZXRDb25maXJtZWRQYXRocygnJykgfSkgfX1cbiAgICAgICAgICA+e2J1c3kgPT09ICdhZGRDb25maXJtZWQnID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2NvbmZpcm1lZC5hZGQnKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtjb25maXJtZWQubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2NvbmZpcm1lZC5ub25lJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7Y29uZmlybWVkLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e2l0ZW0uaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNjNTg2YzAnKX0+e2l0ZW0udHlwZX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXRlbS50ZXh0fTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2l0ZW0uZm9yYmlkZGVuUGF0aHMuam9pbignLCAnKSB8fCAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbigncmVtb3ZlQ29uZmlybWVkJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbmZpcm1lZC9yZW1vdmUnLCB7IGlkOiBpdGVtLmlkIH0pIH19XG4gICAgICAgICAgICAgICAgICAgID5cdTI3MTU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnYWN0aW9uLmNyZWF0ZUNoYW5nZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnZm9ybS5jaGFuZ2VUaXRsZScpfSB2YWx1ZT17Y2hhbmdlVGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDaGFuZ2VUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8dGV4dGFyZWEgcm93cz17Mn0gc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0uY2hhbmdlRGVzYycpfSB2YWx1ZT17Y2hhbmdlRGVzY30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENoYW5nZURlc2MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5idXR0b259XG4gICAgICAgICAgICBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBjaGFuZ2VUaXRsZSA9PT0gJyd9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdjcmVhdGVDaGFuZ2UnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY2hhbmdlcycsIHsgdGl0bGU6IGNoYW5nZVRpdGxlLCBkZXNjcmlwdGlvbjogY2hhbmdlRGVzYyB9KS50aGVuKCgpID0+IHsgc2V0Q2hhbmdlVGl0bGUoJycpOyBzZXRDaGFuZ2VEZXNjKCcnKSB9KSB9fVxuICAgICAgICAgID57YnVzeSA9PT0gJ2NyZWF0ZUNoYW5nZScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLmNyZWF0ZUNoYW5nZScpfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2NoYW5nZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3N0YXRlLm5vQ2hhbmdlcycpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ2NoYW5nZXMuY29sLnRpdGxlJywgJ2NoYW5nZXMuY29sLnR5cGUnLCAnY2hhbmdlcy5jb2wuc3RhdHVzJywgJ2NoYW5nZXMuY29sLnVwZGF0ZWQnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge2NoYW5nZXMubWFwKChjaGFuZ2UpID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtjaGFuZ2UuaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntjaGFuZ2UudGl0bGV9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKGNoYW5nZS5zdGF0dXMgPT09ICdjb21wbGV0ZWQnID8gJyM0ZWM5YjAnIDogJyM1NjljZDYnKX0+e2NoYW5nZS5zdGF0dXN9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2Zvcm1hdFRpbWUoY2hhbmdlLnVwZGF0ZWRBdCl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6ICdcdTUyMjBcdTk2NjRcdThGRDlcdTRFMkFcdTUzRDhcdTY2RjRcdTRFRkJcdTUyQTFcdUZGMUYnLCBtZXNzYWdlOiAnXHUzMDBDJyArIGNoYW5nZS50aXRsZSArICdcdTMwMERcdTUzQ0FcdTUxNzZcdTUxNjhcdTkwRThcdTYyNjdcdTg4NENcdThCQjBcdTVGNTVcdTMwMDFcdThCQTFcdTUyMTJcdTMwMDFcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTVDMDZcdTg4QUJcdTZDMzhcdTRFNDVcdTUyMjBcdTk2NjRcdTMwMDInLCBkYW5nZXI6IHRydWUsIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHJ1bkFjdGlvbignZGVsZXRlQ2hhbmdlJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NoYW5nZXMvZGVsZXRlJywgeyBpZDogY2hhbmdlLmlkIH0pIH0gfSkgfX0+XHUyNzE1PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgIDwvPlxuICApXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDM1x1OTg3NVx1N0I3RVx1RkYxQVx1OTg3NVx1OTc2Mlx1NzZGNFx1NjNBNVx1NTIxQlx1NUVGQVx1NUU3Nlx1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYwQ1x1ODA0QVx1NTkyOVx1NTNFQVx1NjYyRlx1NTNFNlx1NEUwMFx1NzlDRFx1NTE2NVx1NTNFMyBcdTI1MDBcdTI1MDBcbiAgY29uc3QgZXhlY3V0aW9uVGFiID0gKFxuICAgIDw+XG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgZmxleFdyYXA6ICd3cmFwJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzEwcHgnLCBwYWRkaW5nOiAnN3B4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wNiknLCBib3JkZXI6ICcxcHggc29saWQgcmdiYSgzNyw5OSwyMzUsMC4yKScsIGZvbnRTaXplOiAnMTFweCcgfX0+XG4gICAgICAgIDxiPlx1MjQ2MCB7dCgnZXhlYy5mbG93Q3JlYXRlJyl9PC9iPjxzcGFuPlx1MjE5Mjwvc3Bhbj5cbiAgICAgICAgPGI+XHUyNDYxIHt0KCdleGVjLmZsb3dPcmNoZXN0cmF0ZScpfTwvYj48c3Bhbj5cdTIxOTI8L3NwYW4+XG4gICAgICAgIDxiPlx1MjQ2MiB7dCgnZXhlYy5mbG93UnVuJyl9PC9iPjxzcGFuPlx1MjE5Mjwvc3Bhbj5cbiAgICAgICAgPGI+XHUyNDYzIHt0KCdleGVjLmZsb3dNZW1vcnknKX08L2I+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdleGVjLmNyZWF0ZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1JbmxpbmV9PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIGZsZXg6IDEsIG1pbldpZHRoOiAyMDAgfX0gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybVRpdGxlJyl9IHZhbHVlPXtleGVjVGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFeGVjVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nIH19IHZhbHVlPXtleGVjTW9kZWx9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFeGVjTW9kZWwoZS50YXJnZXQudmFsdWUpIH19IHRpdGxlPXt0KCdwbGFuLm1vZGVsRGVmYXVsdCcpfT5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj57dCgnZXhlYy5tb2RlbERlZmF1bHQnKX08L29wdGlvbj5cbiAgICAgICAgICAgIHsobW9kZWxPcHRpb25zID8/IFtdKS5tYXAoKG9wdGlvbikgPT4gPG9wdGlvbiBrZXk9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0gdmFsdWU9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0+e29wdGlvbi5wcm92aWRlcn0ve29wdGlvbi5pZH08L29wdGlvbj4pfVxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSByb3dzPXszfSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtRGVzYycpfSB2YWx1ZT17ZXhlY0Rlc2N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFeGVjRGVzYyhlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuYWN0aW9uUm93fT5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtidXN5ICE9PSBudWxsIHx8IGV4ZWNUaXRsZS50cmltKCkgPT09ICcnIHx8IGV4ZWNEZXNjLnRyaW0oKSA9PT0gJyd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzdGFydFJ1bigpIH19PlxuICAgICAgICAgICAgICB7YnVzeSA9PT0gJ3N0YXJ0UnVuJyA/IHQoJ2V4ZWMucGxhbm5pbmcnKSA6IHQoJ2V4ZWMuc3RhcnQnKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ2V4ZWMuY3JlYXRlSGludCcpfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NhcmQ+XG4gICAgICB7cmVzdWx0UGFuZWx9XG4gICAgICB7cGxhbkNvbmZpcm0gIT09IG51bGwgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17dCgncGxhbi50aXRsZScpfT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Cb3R0b206ICc4cHgnIH19Pnt0KCdwbGFuLmhpbnQnKX08L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxuICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRyPntbJ3BsYW4uY29sLnN0ZXAnLCAncGxhbi5jb2wucm9sZScsICdwbGFuLmNvbC5tb2RlbCcsICdwbGFuLmNvbC5wb2xpY3knLCAncGxhbi5jb2wuZW5hYmxlZCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICB7cGxhbkNvbmZpcm0uc3RlcHMubWFwKChzdGVwLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPHRyIGtleT17c3RlcC5pZH0gc3R5bGU9e3sgb3BhY2l0eTogc3RlcC5lbmFibGVkID8gMSA6IDAuNDUgfX0+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIG1pbldpZHRoOiAyMjAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+e2luZGV4ICsgMX0uIHtzdGVwLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3N0ZXAuZGVzY3JpcHRpb24uc2xpY2UoMCwgMTIwKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICB7c3RlcC50YXJnZXRGaWxlcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknIH19PntzdGVwLnRhcmdldEZpbGVzLmpvaW4oJywgJykuc2xpY2UoMCwgMTIwKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDZweCcgfX0gdmFsdWU9e3N0ZXAucm9sZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRQbGFuQ29uZmlybSh7IC4uLnBsYW5Db25maXJtLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMubWFwKChpdGVtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4uaXRlbSwgcm9sZTogZS50YXJnZXQudmFsdWUgfSA6IGl0ZW0pIH0pIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge1snYW5hbHlzaXMnLCAncGxhbm5pbmcnLCAnY29kaW5nJywgJ29wcycsICd2ZXJpZmljYXRpb24nXS5tYXAoKHJvbGUpID0+IDxvcHRpb24ga2V5PXtyb2xlfSB2YWx1ZT17cm9sZX0+e1JPTEVfTEFCRUxTW3JvbGVdID8/IHJvbGV9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJywgcGFkZGluZzogJzNweCA2cHgnIH19IHZhbHVlPXtzdGVwLm1vZGVsUHJvdmlkZXIgKyAnLycgKyBzdGVwLm1vZGVsSWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3Byb3ZpZGVyLCBtb2RlbF0gPSBlLnRhcmdldC52YWx1ZS5zcGxpdCgnLycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFBsYW5Db25maXJtKHsgLi4ucGxhbkNvbmZpcm0sIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcy5tYXAoKGl0ZW0sIGkpID0+IGkgPT09IGluZGV4ID8geyAuLi5pdGVtLCBtb2RlbFByb3ZpZGVyOiBwcm92aWRlciA/PyAnJywgbW9kZWxJZDogbW9kZWwgPz8gJycgfSA6IGl0ZW0pIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIvXCI+e3QoJ3BsYW4ubW9kZWxEZWZhdWx0Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bW9kZWxPcHRpb25zLm1hcCgob3B0aW9uKSA9PiA8b3B0aW9uIGtleT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfSB2YWx1ZT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfT57b3B0aW9uLnByb3ZpZGVyfS97b3B0aW9uLmlkfTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggNnB4JyB9fSB2YWx1ZT17c3RlcC5mYWlsdXJlUG9saWN5fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBsYW5Db25maXJtKHsgLi4ucGxhbkNvbmZpcm0sIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcy5tYXAoKGl0ZW0sIGkpID0+IGkgPT09IGluZGV4ID8geyAuLi5pdGVtLCBmYWlsdXJlUG9saWN5OiBlLnRhcmdldC52YWx1ZSB9IDogaXRlbSkgfSkgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoUE9MSUNZX0xBQkVMUykubWFwKChbdmFsdWUsIGxhYmVsXSkgPT4gPG9wdGlvbiBrZXk9e3ZhbHVlfSB2YWx1ZT17dmFsdWV9PntsYWJlbH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9e3N0ZXAuZW5hYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRQbGFuQ29uZmlybSh7IC4uLnBsYW5Db25maXJtLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMubWFwKChpdGVtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4uaXRlbSwgZW5hYmxlZDogZS50YXJnZXQuY2hlY2tlZCB9IDogaXRlbSkgfSkgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBtYXJnaW5Ub3A6ICcxMHB4JyB9fT5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtwbGFuQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxhdW5jaFBsYW4odHJ1ZSkgfX0+e3BsYW5CdXN5ID8gJ1x1MjAyNicgOiB0KCdwbGFuLmxhdW5jaEVkaXRlZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e3BsYW5CdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbGF1bmNoUGxhbihmYWxzZSkgfX0+e3QoJ3BsYW4ubGF1bmNoRGlyZWN0Jyl9PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17cGxhbkJ1c3l9IG9uQ2xpY2s9eygpID0+IHsgc2V0UGxhbkNvbmZpcm0obnVsbCkgfX0+e3QoJ3BsYW4uZGlzY2FyZCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuICAgICAgPENhcmQ+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdleGVjLmF0dGVtcHRzJyl9PC9zcGFuPntTdHJpbmcoc3RhdGU/LmF0dGVtcHRzQ291bnQgPz8gMCl9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3J1bnMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3N0YXRlLm5vUnVucycpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+e1snZXhlYy5jb2wuY2hhbmdlJywgJ2V4ZWMuY29sLnN0ZXBzJywgJ2V4ZWMuY29sLnN0YXR1cycsICdleGVjLmNvbC5zdGFydGVkJywgJ2V4ZWMuY29sLmNvc3QnLCAnZXhlYy5jb2wuZGV0YWlsJ10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtydW5zLm1hcCgocnVuKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17cnVuLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57KGNoYW5nZXMuZmluZCgoY2hhbmdlKSA9PiBjaGFuZ2UuaWQgPT09IHJ1bi5jaGFuZ2VJZCk/LnRpdGxlKSA/PyBydW4uY2hhbmdlSWR9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57cnVuLnN0ZXBzVG90YWwgPyAocnVuLnN0ZXBzRG9uZSA/PyAwKSArICcvJyArIHJ1bi5zdGVwc1RvdGFsIDogJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShydW4uc3RhdHVzID09PSAnc3VjY2VlZGVkJyB8fCBydW4uc3RhdHVzID09PSAnY29tcGxldGVkJyA/ICcjNGVjOWIwJyA6IHJ1bi5zdGF0dXMgPT09ICdmYWlsZWQnID8gJyNmMTRjNGMnIDogcnVuLnN0YXR1cyA9PT0gJ3BhdXNlZCcgPyAnI2Q5NzcwNicgOiAnI2RjZGNhYScpfT57UlVOX1NUQVRVU19MQUJFTFNbcnVuLnN0YXR1c10gPz8gcnVuLnN0YXR1c308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIHtydW4uY3VycmVudFN0ZXAgIT09IG51bGwgJiYgcnVuLmN1cnJlbnRTdGVwICE9PSB1bmRlZmluZWQgJiYgcnVuLnN0YXR1cyA9PT0gJ3J1bm5pbmcnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXhXaWR0aDogMTYwLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+e3J1bi5jdXJyZW50U3RlcH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2Zvcm1hdFRpbWUocnVuLnN0YXJ0ZWRBdCl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57cnVuLmNvc3RVc2QgIT09IHVuZGVmaW5lZCA/ICckJyArIHJ1bi5jb3N0VXNkLnRvRml4ZWQoNCkgOiAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJ1bkRldGFpbChydW4uaWQpIH19PntydW5EZXRhaWw/LnJ1bi5pZCA9PT0gcnVuLmlkID8gdCgncGxhbi5yZWZyZXNoRGV0YWlsJykgOiB0KCdwbGFuLnZpZXdEZXRhaWwnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgICB7cnVuRGV0YWlsICE9PSBudWxsICYmIChcbiAgICAgICAgPENhcmQgdGl0bGU9e3QoJ3BsYW4uZGV0YWlsVGl0bGUnKSArICcgXHUwMEI3ICcgKyBydW5EZXRhaWwucnVuLmNoYW5nZVRpdGxlfT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnc3VjY2VlZGVkJyB8fCBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgPyAnIzRlYzliMCcgOiBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgPyAnI2YxNGM0YycgOiBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ3BhdXNlZCcgPyAnI2Q5NzcwNicgOiAnI2RjZGNhYScpfT57UlVOX1NUQVRVU19MQUJFTFNbcnVuRGV0YWlsLnJ1bi5zdGF0dXNdID8/IHJ1bkRldGFpbC5ydW4uc3RhdHVzfTwvc3Bhbj5cbiAgICAgICAgICAgIHtydW5EZXRhaWwucnVuLmVycm9yICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAnI2QxMjQyZicgfX0+e3J1bkRldGFpbC5ydW4uZXJyb3IubWVzc2FnZX08L3NwYW4+fVxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSdW5EZXRhaWwocnVuRGV0YWlsLnJ1bi5pZCkgfX0+e3QoJ3BsYW4ucmVmcmVzaERldGFpbCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRSdW5EZXRhaWwobnVsbCkgfX0+e3QoJ3BsYW4uY2xvc2VEZXRhaWwnKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7cnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdwYXVzZWQnICYmIHJ1bkRldGFpbC5ydW4ucGF1c2VQb2ludCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc4cHggMTJweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGJhY2tncm91bmQ6ICdyZ2JhKDIxNywxMTksNiwwLjA4KScsIGJvcmRlcjogJzFweCBzb2xpZCByZ2JhKDIxNywxMTksNiwwLjM1KScsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEycHgnIH19Plx1MjNGOCB7dCgncGxhbi5wYXVzZWRCYW5uZXInKX08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57cnVuRGV0YWlsLnJ1bi5wYXVzZVBvaW50LnJlYXNvbn08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIG1hcmdpblRvcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCByZXN1bWVSdW4ocnVuRGV0YWlsLnJ1bi5pZCwgJ2NvbnRpbnVlJykgfX0+e3QoJ3BsYW4ucmVzdW1lUmV0cnknKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHJlc3VtZVJ1bihydW5EZXRhaWwucnVuLmlkLCAnc2tpcC1jdXJyZW50JykgfX0+e3QoJ3BsYW4ucmVzdW1lU2tpcCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgeyhydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgfHwgcnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdpbnRlcnJ1cHRlZCcpICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCByZXN1bWVSdW4ocnVuRGV0YWlsLnJ1bi5pZCwgJ2NvbnRpbnVlJykgfX0+e3QoJ3BsYW4ucmVzdW1lRmFpbGVkJyl9PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+e1sncGxhbi5jb2wuc3RlcCcsICdwbGFuLmNvbC5yb2xlJywgJ3BsYW4uY29sLm1vZGVsJywgJ2V4ZWMuY29sLnN0YXR1cycsICdwbGFuLmNvbC5hdHRlbXB0cycsICdleGVjLmNvbC5jb3N0J10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtydW5EZXRhaWwuc3RlcHMubWFwKChzdGVwLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3N0ZXAuaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PntpbmRleCArIDF9LiB7c3RlcC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge3N0ZXAuY2xhaW1lZE91dGNvbWUgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1heFdpZHRoOiAzMjAsIHdoaXRlU3BhY2U6ICdub3JtYWwnIH19PntzdGVwLmNsYWltZWRPdXRjb21lLnNsaWNlKDAsIDE2MCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJ3JnYmEoODYsMTU2LDIxNCwwLjI1KScpfT57Uk9MRV9MQUJFTFNbc3RlcC5yb2xlXSA/PyBzdGVwLnJvbGV9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBmb250U2l6ZTogJzExcHgnIH19PntzdGVwLm1vZGVsID8/ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShzdGVwLnZlcmlmaWVkID8gJyM0ZWM5YjAnIDogc3RlcC5zdGF0dXMgPT09ICdmYWlsZWQnID8gJyNmMTRjNGMnIDogc3RlcC5zdGF0dXMgPT09ICdza2lwcGVkJyA/ICcjOGI5NDllJyA6ICcjZGNkY2FhJyl9PntTVEVQX1NUQVRVU19MQUJFTFNbc3RlcC5zdGF0dXNdID8/IHN0ZXAuc3RhdHVzfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntTdHJpbmcoc3RlcC5hdHRlbXB0c0NvdW50KX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntzdGVwLmNvc3RVc2QgPiAwID8gJyQnICsgc3RlcC5jb3N0VXNkLnRvRml4ZWQoNCkgOiAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnLCBib3JkZXI6ICcxcHggZGFzaGVkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzhweCAxMnB4JyB9fT5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzRweCcgfX0+e3QoJ3BsYW4uY29udGV4dFRpdGxlJyl9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LnByb2plY3REaWdlc3R9XG4gICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmJyYW5jaCAhPT0gbnVsbCA/IGAgXHUwMEI3ICR7dCgncGxhbi5icmFuY2gnKX0gJHtydW5EZXRhaWwuY29udGV4dC5icmFuY2h9YCA6ICcnfVxuICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5oZWFkU2hhICE9PSBudWxsID8gYCBcdTAwQjcgSEVBRCAke3J1bkRldGFpbC5jb250ZXh0LmhlYWRTaGEuc2xpY2UoMCwgOCl9YCA6ICcnfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmluamVjdGVkTWVtb3JpZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwIH19Pnt0KCdwbGFuLmluamVjdGVkTWVtb3JpZXMnKX1cdUZGMUE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuaW5qZWN0ZWRNZW1vcmllcy5tYXAoKG1lbW9yeSkgPT4gPHNwYW4ga2V5PXttZW1vcnkuaWR9IHN0eWxlPXtzdHlsZXMuYmFkZ2UoJ3JnYmEoNzgsMjAxLDE3NiwwLjIpJyl9PnttZW1vcnkudGl0bGV9PC9zcGFuPil9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5kZWNpc2lvbkxvZy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzRweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBjb2xvcjogJ2luaGVyaXQnIH19Pnt0KCdwbGFuLmRlY2lzaW9uTG9nJyl9XHVGRjFBPC9zcGFuPlxuICAgICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmRlY2lzaW9uTG9nLnNsaWNlKC02KS5tYXAoKGVudHJ5LCBlbnRyeUluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeUluZGV4fT5cdTAwQjcgW3tlbnRyeS5raW5kfV0ge2VudHJ5LmRldGFpbH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cbiAgICAgIDxDYXJkXG4gICAgICAgIHRpdGxlPXtcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgdXNlclNlbGVjdDogJ25vbmUnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0U2NoZWRPcGVuKCFzY2hlZE9wZW4pIH19PlxuICAgICAgICAgICAge3NjaGVkT3BlbiA/ICdcdTI1QkUgJyA6ICdcdTI1QjggJ317dCgnc2NoZWQudGl0bGUnKX1cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5sYWJlbCwgbWFyZ2luTGVmdDogJzhweCcgfX0+eyhzY2hlZHVsZWREYXRhID8/IFtdKS5sZW5ndGggPiAwID8gU3RyaW5nKChzY2hlZHVsZWREYXRhID8/IFtdKS5sZW5ndGgpICsgJyBcdTRFMkEnIDogJyd9PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgfVxuICAgICAgPlxuICAgICAgICB7c2NoZWRPcGVuICYmIChcbiAgICAgICAgPD5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1JbmxpbmV9PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIGZsZXg6IDEsIG1pbldpZHRoOiAxNjAgfX0gcGxhY2Vob2xkZXI9e3QoJ3NjaGVkLmZvcm1OYW1lJyl9IHZhbHVlPXtzY2hlZE5hbWV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZE5hbWUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nIH19IHZhbHVlPXtzY2hlZFR5cGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZFR5cGUoZS50YXJnZXQudmFsdWUpIH19PlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJldmlld1wiPnt0KCdzY2hlZC50eXBlUmV2aWV3Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic3VtbWFyeVwiPnt0KCdzY2hlZC50eXBlU3VtbWFyeScpfTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJ1blwiPnt0KCdzY2hlZC50eXBlUnVuJyl9PC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgd2lkdGg6IDEyMCB9fSBwbGFjZWhvbGRlcj17dCgnc2NoZWQuZm9ybUludGVydmFsJyl9IHZhbHVlPXtzY2hlZEludGVydmFsfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWRJbnRlcnZhbChlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICB7c2NoZWRUeXBlID09PSAncnVuJyAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybVRpdGxlJyl9IHZhbHVlPXtzY2hlZFRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWRUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezJ9IHBsYWNlaG9sZGVyPXt0KCdleGVjLmZvcm1EZXNjJyl9IHZhbHVlPXtzY2hlZERlc2N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZERlc2MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtzY2hlZE5hbWUudHJpbSgpID09PSAnJ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFkZFNjaGVkdWxlZCgpIH19Pnt0KCdzY2hlZC5hZGQnKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+e3QoJ3NjaGVkLmhpbnQnKX08L2Rpdj5cbiAgICAgICAgeyhzY2hlZHVsZWREYXRhID8/IFtdKS5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc2NoZWQuZW1wdHknKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ3NjaGVkLmNvbC5uYW1lJywgJ3NjaGVkLmNvbC50eXBlJywgJ3NjaGVkLmNvbC5pbnRlcnZhbCcsICdzY2hlZC5jb2wubmV4dCcsICdzY2hlZC5jb2wubGFzdFJlc3VsdCcsICdzY2hlZC5jb2wuYWN0aW9ucyddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7KHNjaGVkdWxlZERhdGEgPz8gW10pLm1hcCgodGFzaykgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3Rhc2suaWR9IHN0eWxlPXt7IG9wYWNpdHk6IHRhc2suZW5hYmxlZCA/IDEgOiAwLjQ1IH19PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pnt0YXNrLm5hbWV9e3Rhc2sudGl0bGUgIT09ICcnID8gPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHVGRjA4e3Rhc2sudGl0bGV9XHVGRjA5PC9zcGFuPiA6IG51bGx9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHRhc2sudHlwZSA9PT0gJ3JldmlldycgPyAnIzU2OWNkNicgOiB0YXNrLnR5cGUgPT09ICdzdW1tYXJ5JyA/ICcjNGVjOWIwJyA6ICcjZDdiYTdkJyl9Pnt0YXNrLnR5cGUgPT09ICdyZXZpZXcnID8gdCgnc2NoZWQudHlwZVJldmlldycpIDogdGFzay50eXBlID09PSAnc3VtbWFyeScgPyB0KCdzY2hlZC50eXBlU3VtbWFyeScpIDogdCgnc2NoZWQudHlwZVJ1bicpfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pnt0YXNrLmludGVydmFsTWludXRlcyA+PSAxNDQwID8gTWF0aC5yb3VuZCh0YXNrLmludGVydmFsTWludXRlcyAvIDE0NDAgKiAxMCkgLyAxMCArIHQoJ3NjaGVkLmRheScpIDogdGFzay5pbnRlcnZhbE1pbnV0ZXMgPj0gNjAgPyBNYXRoLnJvdW5kKHRhc2suaW50ZXJ2YWxNaW51dGVzIC8gNjAgKiAxMCkgLyAxMCArIHQoJ3NjaGVkLmhvdXInKSA6IHRhc2suaW50ZXJ2YWxNaW51dGVzICsgdCgnc2NoZWQubWludXRlJyl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57dGFzay5lbmFibGVkID8gZm9ybWF0VGltZSh0YXNrLm5leHREdWVBdCkgOiAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1heFdpZHRoOiAyMjAsIHdoaXRlU3BhY2U6ICdub3JtYWwnIH19Pnt0YXNrLmxhc3RSZXN1bHQgfHwgKHRhc2subGFzdFJ1bkF0ICE9PSBudWxsID8gZm9ybWF0VGltZSh0YXNrLmxhc3RSdW5BdCkgOiAnXHUyMDE0Jyl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNjaGVkdWxlZEFjdGlvbigndXBkYXRlJywgeyBpZDogdGFzay5pZCwgZW5hYmxlZDogIXRhc2suZW5hYmxlZCB9KSB9fT57dGFzay5lbmFibGVkID8gdCgnc2NoZWQuZGlzYWJsZScpIDogdCgnc2NoZWQuZW5hYmxlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNjaGVkdWxlZEFjdGlvbigncnVuJywgeyBpZDogdGFzay5pZCB9KSB9fT57dCgnc2NoZWQucnVuTm93Jyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6ICdcdTUyMjBcdTk2NjRcdThGRDlcdTRFMkFcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdUZGMUYnLCBtZXNzYWdlOiAnXHUzMDBDJyArIHRhc2submFtZSArICdcdTMwMERcdTVDMDZcdTg4QUJcdTZDMzhcdTRFNDVcdTUyMjBcdTk2NjRcdTMwMDInLCBkYW5nZXI6IHRydWUsIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHNjaGVkdWxlZEFjdGlvbignZGVsZXRlJywgeyBpZDogdGFzay5pZCB9KSB9IH0pIH19Plx1MjcxNTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgIDwvPlxuICApXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNlx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcbiAgY29uc3Qgbm90ZXNUYWIgPSAoXG4gICAgPD5cbiAgICAgIHsvKiBcdTI1MDBcdTI1MDAgXHU3QjE0XHU4QkIwXHVGRjFBXHU1MzYxXHU3MjQ3XHU1RjBGXHU5NjA1XHU4QkZCICsgXHU1OTFBXHU4ODRDXHU3RjE2XHU4RjkxICsgXHU2NDFDXHU3RDIyICsgQUkgXHU2MDNCXHU3RUQzIFx1MjUwMFx1MjUwMCAqL31cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdub3Rlcy50aXRsZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgd2lkdGg6IDIyMCB9fVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ25vdGVzLnNlYXJjaCcpfVxuICAgICAgICAgICAgdmFsdWU9e25vdGVTZWFyY2h9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVNlYXJjaChlLnRhcmdldC52YWx1ZSkgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTdW1tYXJ5ID0gbm90ZXMuZmlsdGVyKChub3RlKSA9PiBub3RlLnNoYSA9PT0gJ3N1bW1hcnknKS5zb3J0KChhLCBiKSA9PiBiLmNyZWF0ZWRBdCAtIGEuY3JlYXRlZEF0KVswXVxuICAgICAgICAgICAgY29uc3QgbmV3Q29tbWl0cyA9IGxhc3RTdW1tYXJ5ID09PSB1bmRlZmluZWQgPyAtMVxuICAgICAgICAgICAgICA6IChjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSkuZmlsdGVyKChjb21taXQpID0+IGNvbW1pdC5kYXRlID4gbGFzdFN1bW1hcnkuY3JlYXRlZEF0KS5sZW5ndGhcbiAgICAgICAgICAgIGlmIChuZXdDb21taXRzID09PSAtMSkge1xuICAgICAgICAgICAgICByZXR1cm4gPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ25vdGVzLmRpZ2VzdE5ldmVyJyl9PC9zcGFuPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld0NvbW1pdHMgPT09IDApIHJldHVybiBudWxsXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Pnt0KCdub3Rlcy5kaWdlc3RQZW5kaW5nJykucmVwbGFjZSgne259JywgU3RyaW5nKG5ld0NvbW1pdHMpKX08L3NwYW4+XG4gICAgICAgICAgfSkoKX1cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17YWlTdW1tYXJpemluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFpU3VtbWFyaXplKCkgfX0+XG4gICAgICAgICAgICB7YWlTdW1tYXJpemluZyA/IHQoJ25vdGVzLmFpU3VtbWFyeVJ1bicpIDogJ1x1MjcyOCAnICsgdCgnbm90ZXMuYWlTdW1tYXJ5Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5mb3JtUm93LCBib3JkZXI6ICcxcHggZGFzaGVkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzEwcHgnIH19PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMuZm9ybVRpdGxlJyl9IHZhbHVlPXtub3RlVGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXROb3RlVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCB9fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMudGFnc0hpbnQnKX0gdmFsdWU9e25vdGVUYWdzfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVRhZ3MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLnRleHRhcmVhfVxuICAgICAgICAgICAgcm93cz17Nn1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0KCdub3Rlcy5jb250ZW50SGludCcpfVxuICAgICAgICAgICAgdmFsdWU9e25vdGVDb250ZW50fVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVDb250ZW50KGUudGFyZ2V0LnZhbHVlKSB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgIHt0KCdub3Rlcy5ib3VuZFRvJyl9OiB7c2VsZWN0ZWRUYXJnZXRzWzBdID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IHNlbGVjdGVkVGFyZ2V0c1swXS5zbGljZSgwLCA4KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtub3RlVGl0bGUudHJpbSgpID09PSAnJyB8fCBub3RlQ29udGVudC50cmltKCkgPT09ICcnfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYWRkTm90ZSgpIH19Pnt0KCdub3Rlcy5hZGQnKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleXdvcmQgPSBub3RlU2VhcmNoLnRyaW0oKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgY29uc3QgbWF0Y2hlZCA9IGtleXdvcmQgPT09ICcnXG4gICAgICAgICAgICA/IG5vdGVzXG4gICAgICAgICAgICA6IG5vdGVzLmZpbHRlcigobm90ZSkgPT4gKG5vdGUudGl0bGUgKyAnICcgKyBub3RlLmNvbnRlbnQgKyAnICcgKyAobm90ZS50YWdzID8/IFtdKS5qb2luKCcgJykpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoa2V5d29yZCkpXG4gICAgICAgICAgLy8gXHU3RjZFXHU5ODc2XHU0RjE4XHU1MTQ4XHVGRjBDXHU1MTc2XHU0RjU5XHU2MzA5XHU1MjFCXHU1RUZBXHU2NUY2XHU5NUY0XHU1MDEyXHU1RThGXHUzMDAyXG4gICAgICAgICAgY29uc3QgdmlzaWJsZSA9IFsuLi5tYXRjaGVkXS5zb3J0KChsZWZ0LCByaWdodCkgPT5cbiAgICAgICAgICAgIE51bWJlcihyaWdodC5waW5uZWQgPT09IHRydWUpIC0gTnVtYmVyKGxlZnQucGlubmVkID09PSB0cnVlKSB8fCByaWdodC5jcmVhdGVkQXQgLSBsZWZ0LmNyZWF0ZWRBdClcbiAgICAgICAgICBpZiAodmlzaWJsZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pntub3Rlcy5sZW5ndGggPT09IDAgPyB0KCdub3Rlcy5lbXB0eScpIDogdCgnbm90ZXMuZW1wdHlTZWFyY2gnKX08L2Rpdj5cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHZpc2libGUubWFwKChub3RlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1N1bW1hcnkgPSBub3RlLnNoYSA9PT0gJ3N1bW1hcnknXG4gICAgICAgICAgICBjb25zdCBlZGl0aW5nID0gZWRpdGluZ05vdGUgIT09IG51bGwgJiYgZWRpdGluZ05vdGUuaWQgPT09IG5vdGUuaWQgPyBlZGl0aW5nTm90ZSA6IG51bGxcbiAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkID0gbm90ZUV4cGFuZGVkW25vdGUuaWRdID09PSB0cnVlXG4gICAgICAgICAgICBjb25zdCBsb25nID0gbm90ZS5jb250ZW50Lmxlbmd0aCA+IDI2MCB8fCBub3RlLmNvbnRlbnQuc3BsaXQoJ1xcbicpLmxlbmd0aCA+IDZcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e25vdGUuaWR9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcy5ub3RlQ2FyZCxcbiAgICAgICAgICAgICAgICAgIC4uLihpc1N1bW1hcnkgPyB7IGJhY2tncm91bmQ6ICdyZ2JhKDM3LDk5LDIzNSwwLjA0KScsIGJvcmRlckNvbG9yOiAncmdiYSgzNyw5OSwyMzUsMC4zKScgfSA6IHt9KSxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2VkaXRpbmcgIT09IG51bGwgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSB2YWx1ZT17ZWRpdGluZy50aXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgLi4uZWRpdGluZywgdGl0bGU6IGUudGFyZ2V0LnZhbHVlIH0pIH19IC8+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMudGFnc0hpbnQnKX0gdmFsdWU9e2VkaXRpbmcudGFnc30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgLi4uZWRpdGluZywgdGFnczogZS50YXJnZXQudmFsdWUgfSkgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezEwfSB2YWx1ZT17ZWRpdGluZy5jb250ZW50fSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RWRpdGluZ05vdGUoeyAuLi5lZGl0aW5nLCBjb250ZW50OiBlLnRhcmdldC52YWx1ZSB9KSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICc0cHggMTJweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNhdmVOb3RlRWRpdCgpIH19Pnt0KCdub3Rlcy5zYXZlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnNHB4IDEycHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0RWRpdGluZ05vdGUobnVsbCkgfX0+e3QoJ25vdGVzLmNhbmNlbCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e2lzU3VtbWFyeSA/ICdcdUQ4M0RcdURDRDYgJyA6ICcnfXtub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/ICdcdUQ4M0RcdURDQ0MgJyA6ICcnfXtub3RlLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiBub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIDogdW5kZWZpbmVkIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/IHQoJ25vdGVzLnVucGluJykgOiB0KCdub3Rlcy5waW4nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHRvZ2dsZU5vdGVQaW4obm90ZSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdURDQ0M8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IHRpdGxlPXt0KCdub3Rlcy5jb3B5TWRIaW50Jyl9IG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWQgPSBgIyAke25vdGUudGl0bGV9XFxuXFxuJHtub3RlLmNvbnRlbnR9XFxuYFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2b2lkIG5hdmlnYXRvci5jbGlwYm9hcmQ/LndyaXRlVGV4dChtZCkudGhlbigoKSA9PiBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyAnICsgdCgnbm90ZXMuY29weU1kRG9uZScpKSkuY2F0Y2goKCkgPT4gc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgXHU1OTBEXHU1MjM2XHU1OTMxXHU4RDI1JykpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cdUQ4M0RcdURDQ0Ige3QoJ25vdGVzLmNvcHlNZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gdGl0bGU9e3QoJ25vdGVzLnRvTWVtb3J5SGludCcpfSBvbkNsaWNrPXsoKSA9PiB7IHNldE1lbW9yeVRpdGxlKG5vdGUudGl0bGUpOyBzZXRNZW1vcnlDb250ZW50KG5vdGUuY29udGVudCk7IHNldEFjdGlvblJlc3VsdCh0KCdub3Rlcy50b01lbW9yeURvbmUnKSkgfX0+XHVEODNFXHVEREUwIHt0KCdub3Rlcy50b01lbW9yeScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRFZGl0aW5nTm90ZSh7IGlkOiBub3RlLmlkLCB0aXRsZTogbm90ZS50aXRsZSwgY29udGVudDogbm90ZS5jb250ZW50LCB0YWdzOiAobm90ZS50YWdzID8/IFtdKS5qb2luKCcsICcpIH0pIH19Pnt0KCdub3Rlcy5lZGl0Jyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogJ1x1NTIyMFx1OTY2NFx1OEZEOVx1Njc2MVx1N0IxNFx1OEJCMFx1RkYxRicsIG1lc3NhZ2U6ICdcdTMwMEMnICsgbm90ZS50aXRsZSArICdcdTMwMERcdTVDMDZcdTg4QUJcdTZDMzhcdTRFNDVcdTUyMjBcdTk2NjRcdUZGMENcdTRFMERcdTUzRUZcdTYwNjJcdTU5MERcdTMwMDInLCBkYW5nZXI6IHRydWUsIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHJlbW92ZU5vdGUobm90ZS5pZCkgfSB9KSB9fT5cdTI3MTU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtpc1N1bW1hcnlcbiAgICAgICAgICAgICAgICAgICAgICA/IDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCAuLi4obG9uZyAmJiAhZXhwYW5kZWQgPyBzdHlsZXMubm90ZUNsYW1wIDoge30pIH19PntyZW5kZXJTdHJ1Y3R1cmVkQ29udGVudChub3RlLmNvbnRlbnQpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDogPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNvbnRlbnQsIC4uLihsb25nICYmICFleHBhbmRlZCA/IHN0eWxlcy5ub3RlQ2xhbXAgOiB7fSkgfX0+e25vdGUuY29udGVudH08L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgIHtsb25nICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMubGlua0J0bn0gb25DbGljaz17KCkgPT4geyBzZXROb3RlRXhwYW5kZWQoeyAuLi5ub3RlRXhwYW5kZWQsIFtub3RlLmlkXTogIWV4cGFuZGVkIH0pIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2V4cGFuZGVkID8gdCgnbm90ZXMuY29sbGFwc2UnKSA6IHQoJ25vdGVzLmV4cGFuZCcpfVx1RkYwOHtub3RlLmNvbnRlbnQubGVuZ3RofSBcdTVCNTdcdUZGMDlcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgeyhub3RlLnRhZ3MgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyhub3RlLnRhZ3MgPz8gW10pLm1hcCgodGFnKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3RhZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoJyMyNTYzZWInKSwgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlcjogJ25vbmUnLCBwYWRkaW5nOiAnMXB4IDhweCcsIGJvcmRlclJhZGl1czogJzk5OXB4JywgZm9udFNpemU6ICcxMHB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0Tm90ZVNlYXJjaCh0YWcpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID4je3RhZ308L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntuZXcgRGF0ZShub3RlLmNyZWF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAge25vdGUudXBkYXRlZEF0ICE9PSB1bmRlZmluZWQgJiYgbm90ZS51cGRhdGVkQXQgPiBub3RlLmNyZWF0ZWRBdCArIDEwMDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHVGRjA4e3QoJ25vdGVzLmVkaXRlZEF0Jyl9IHtuZXcgRGF0ZShub3RlLnVwZGF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX1cdUZGMDk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICB7aXNTdW1tYXJ5ICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyMyNTYzZWInKX0+e3QoJ25vdGVzLnN1bW1hcnlUYWcnKX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgIHtub3RlLnNoYSAhPT0gdW5kZWZpbmVkICYmIG5vdGUuc2hhICE9PSAnc3VtbWFyeScgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57bm90ZS5zaGEgPT09ICd3b3JraW5nJyA/IHQoJ3JlcG8ud29ya2luZycpIDogbm90ZS5zaGEuc2xpY2UoMCwgOCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgfSkoKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdtZW1vcnkuem9uZVRpdGxlJykgKyAocHJvamVjdCAhPT0gbnVsbCA/ICcgXHUwMEI3ICcgKyBwcm9qZWN0Lm5hbWUgOiAnJyl9PlxuICAgICAgICB7LyogXHU1NDBDXHU2QjY1XHU3MkI2XHU2MDAxXHU2NzYxXHVGRjFBXHU1N0ZBXHU3RUJGICsgXHU4NDNEXHU1NDBFXHU2M0QwXHU0RUE0XHU2NTcwICsgXHU1NDBDXHU2QjY1XHU2MzA5XHU5NEFFICsgXHU1NDBDXHU2QjY1XHU2MkE1XHU1NDRBICovfVxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzhweCcsIHBhZGRpbmc6ICc2cHggMTBweCcsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JyB9fT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnIH19Plx1RDgzRFx1REQwNCB7dCgnbWVtb3J5LnN5bmNCYXNlbGluZScpfVx1RkYxQTxiPnttZW1vcmllc0RhdGE/LmJhc2VsaW5lPy5zaGEgIT0gbnVsbCA/IG1lbW9yaWVzRGF0YS5iYXNlbGluZS5zaGEuc2xpY2UoMCwgOCkgOiB0KCdtZW1vcnkuc3luY05vbmUnKX08L2I+PC9zcGFuPlxuICAgICAgICAgIHttZW1vcmllc0RhdGE/LmJyYW5jaCAhPSBudWxsICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM1NjljZDYnKX0+e21lbW9yaWVzRGF0YS5icmFuY2h9PC9zcGFuPn1cbiAgICAgICAgICB7KG1lbW9yaWVzRGF0YT8uYmVoaW5kQ291bnQgPz8gMCkgPiAwICYmIChcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAnI2Q5NzcwNicgfX0+e3QoJ21lbW9yeS5iZWhpbmQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcobWVtb3JpZXNEYXRhPy5iZWhpbmRDb3VudCA/PyAwKSl9PC9zcGFuPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzNweCAxMHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17bWVtb3J5U3luY2luZ30gb25DbGljaz17KCkgPT4geyB2b2lkIHN5bmNNZW1vcmllcygpIH19PlxuICAgICAgICAgICAge21lbW9yeVN5bmNpbmcgPyB0KCdtZW1vcnkuc3luY2luZycpIDogJ1x1RDgzRFx1REQwNCAnICsgdCgnbWVtb3J5LnN5bmMnKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtzeW5jUmVwb3J0ICE9PSBudWxsICYmIChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnLCBwYWRkaW5nOiAnOHB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBiYWNrZ3JvdW5kOiBzeW5jUmVwb3J0Lm9rID09PSBmYWxzZSA/ICdyZ2JhKDIwOSwzNiw0NywwLjA2KScgOiAncmdiYSg3OCwyMDEsMTc2LDAuMDYpJywgYm9yZGVyOiAnMXB4IHNvbGlkICcgKyAoc3luY1JlcG9ydC5vayA9PT0gZmFsc2UgPyAncmdiYSgyMDksMzYsNDcsMC4zKScgOiAncmdiYSg3OCwyMDEsMTc2LDAuMyknKSB9fT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwIH19PntzeW5jUmVwb3J0Lm9rID09PSBmYWxzZSA/ICdcdTI3MTcgJyArIHQoJ21lbW9yeS5zeW5jRmFpbGVkJykgOiAnXHUyNzEzICcgKyAoc3luY1JlcG9ydC52ZXJkaWN0ID8/ICcnKX08L2Rpdj5cbiAgICAgICAgICAgIHtzeW5jUmVwb3J0Lm9rICE9PSBmYWxzZSAmJiAoc3luY1JlcG9ydC5zdGFsZVByb3Bvc2FscyA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fT57dCgnbWVtb3J5LnN0YWxlVGl0bGUnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICB7KHN5bmNSZXBvcnQuc3RhbGVQcm9wb3NhbHMgPz8gW10pLm1hcCgocHJvcG9zYWwpID0+IChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtwcm9wb3NhbC5pZH0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fT57cHJvcG9zYWwudGl0bGV9IFx1MjAxNFx1MjAxNCB7cHJvcG9zYWwucmVhc29ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMXB4IDhweCcsIGZvbnRTaXplOiAnMTBweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGFwcGx5U3luYyhbcHJvcG9zYWwuaWRdLCAnbWFyay1zdGFsZScpIH19Pnt0KCdtZW1vcnkubWFya1N0YWxlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzFweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhcHBseVN5bmMoW3Byb3Bvc2FsLmlkXSwgJ2FyY2hpdmUnKSB9fT57dCgnbWVtb3J5LmFyY2hpdmVCdG4nKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMXB4IDhweCcsIGZvbnRTaXplOiAnMTBweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRTeW5jUmVwb3J0KChwcmV2aW91cykgPT4gcHJldmlvdXMgPT09IG51bGwgPyBudWxsIDogeyAuLi5wcmV2aW91cywgc3RhbGVQcm9wb3NhbHM6IChwcmV2aW91cy5zdGFsZVByb3Bvc2FscyA/PyBbXSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmlkICE9PSBwcm9wb3NhbC5pZCkgfSkgfX0+e3QoJ21lbW9yeS5rZWVwQWN0aXZlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3N5bmNSZXBvcnQub2sgIT09IGZhbHNlICYmIChzeW5jUmVwb3J0Lm5ld0NhbmRpZGF0ZXMgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcsIGZvbnRTaXplOiAnMTFweCcgfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwIH19Pnt0KCdtZW1vcnkubmV3Q2FuZGlkYXRlcycpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7KHN5bmNSZXBvcnQubmV3Q2FuZGlkYXRlcyA/PyBbXSkubWFwKChjYW5kaWRhdGUsIGluZGV4KSA9PiA8ZGl2IGtleT17aW5kZXh9Plx1RkYwQiBbe2NhbmRpZGF0ZS50eXBlfV0ge2NhbmRpZGF0ZS50aXRsZX08L2Rpdj4pfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5saW5rQnRuLCBtYXJnaW5Ub3A6ICc0cHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0U3luY1JlcG9ydChudWxsKSB9fT57dCgnbWVtb3J5LmNsb3NlUmVwb3J0Jyl9PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIHsvKiBcdTYyNEJcdTUyQThcdTZERkJcdTUyQTBcdUZGMUFcdTY4MDdcdTk4OTggLyBcdTdDN0JcdTU3OEIgLyBcdTRGNUNcdTc1MjhcdTU3REYgLyBcdTUxODVcdTVCQjkgKi99XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0ubWVtb3J5VGl0bGUnKX0gdmFsdWU9e21lbW9yeVRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0TWVtb3J5VGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nIH19IHZhbHVlPXttZW1vcnlUeXBlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0TWVtb3J5VHlwZShlLnRhcmdldC52YWx1ZSkgfX0+XG4gICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoTUVNT1JZX1RZUEVfTEFCRUxTKS5tYXAoKFt2YWx1ZSwgbGFiZWxdKSA9PiA8b3B0aW9uIGtleT17dmFsdWV9IHZhbHVlPXt2YWx1ZX0+e2xhYmVsfTwvb3B0aW9uPil9XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nIH19IHZhbHVlPXttZW1vcnlTY29wZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeVNjb3BlKGUudGFyZ2V0LnZhbHVlIGFzICdwcm9qZWN0JyB8ICdicmFuY2gnKSB9fT5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwcm9qZWN0XCI+e3QoJ21lbW9yeS5zY29wZVByb2plY3QnKX08L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJicmFuY2hcIj57dCgnbWVtb3J5LnNjb3BlQnJhbmNoJyl9PC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezN9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLm1lbW9yeUNvbnRlbnQnKX0gdmFsdWU9e21lbW9yeUNvbnRlbnR9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRNZW1vcnlDb250ZW50KGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBtZW1vcnlUaXRsZS50cmltKCkgPT09ICcnIHx8IG1lbW9yeUNvbnRlbnQudHJpbSgpID09PSAnJ31cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbigncmVjb3JkTWVtb3J5JywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeScsIHsgbWVtb3J5VHlwZSwgc2NvcGU6IG1lbW9yeVNjb3BlLCB0aXRsZTogbWVtb3J5VGl0bGUudHJpbSgpLCBjb250ZW50OiBtZW1vcnlDb250ZW50LnRyaW0oKSB9KS50aGVuKGFzeW5jICgpID0+IHsgc2V0TWVtb3J5VGl0bGUoJycpOyBzZXRNZW1vcnlDb250ZW50KCcnKTsgYXdhaXQgbG9hZE1lbW9yaWVzKCkgfSkgfX0+XG4gICAgICAgICAgICAgIHtidXN5ID09PSAncmVjb3JkTWVtb3J5JyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdtZW1vcnkucmVjb3JkJyl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGFsbCA9IG1lbW9yaWVzRGF0YT8ubWVtb3JpZXMgPz8gW11cbiAgICAgICAgICBjb25zdCBwZW5kaW5nID0gYWxsLmZpbHRlcigobWVtb3J5KSA9PiAhbWVtb3J5LmlzSHVtYW5Db25maXJtZWQgJiYgbWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZScpXG4gICAgICAgICAgY29uc3QgYWN0aXZlID0gYWxsLmZpbHRlcigobWVtb3J5KSA9PiBtZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJylcbiAgICAgICAgICBjb25zdCBncm91cGVkID0gbmV3IE1hcDxzdHJpbmcsIE1lbW9yeUVudHJ5W10+KClcbiAgICAgICAgICBmb3IgKGNvbnN0IG1lbW9yeSBvZiBhY3RpdmUpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBncm91cGVkLmdldChtZW1vcnkudHlwZSkgPz8gW11cbiAgICAgICAgICAgIGxpc3QucHVzaChtZW1vcnkpXG4gICAgICAgICAgICBncm91cGVkLnNldChtZW1vcnkudHlwZSwgbGlzdClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIHtwZW5kaW5nLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT5cdTIzRjMge3QoJ21lbW9yeS5wZW5kaW5nUXVldWUnKX1cdUZGMDh7U3RyaW5nKHBlbmRpbmcubGVuZ3RoKX1cdUZGMDk8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHtwZW5kaW5nLm1hcCgobWVtb3J5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXttZW1vcnkuaWR9IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ2FyZCwgYm9yZGVyQ29sb3I6ICdyZ2JhKDM3LDk5LDIzNSwwLjMpJywgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDMpJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVUZXh0fT57bWVtb3J5LnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJ1dHRvbiwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBjb25maXJtTWVtb3J5KG1lbW9yeS5pZCkudGhlbigoKSA9PiB7IHZvaWQgbG9hZE1lbW9yaWVzKCkgfSkgfX0+e3QoJ21lbW9yeS5jb25maXJtJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ3N0YXR1cycsIHsgaWQ6IG1lbW9yeS5pZCwgc3RhdHVzOiAnYXJjaGl2ZWQnIH0pIH19Pnt0KCdtZW1vcnkuYXJjaGl2ZUJ0bicpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVDb250ZW50fT57bWVtb3J5LmNvbnRlbnR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVNZXRhfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJ3JnYmEoMzcsOTksMjM1LDAuMTUpJyl9PntNRU1PUllfU09VUkNFX0xBQkVMU1ttZW1vcnkuc291cmNlVGFnXSA/PyBtZW1vcnkuc291cmNlVGFnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuYmFzaXNTaGEgIT09IG51bGwgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57bWVtb3J5LmJhc2lzU2hhLnNsaWNlKDAsIDgpfTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHtbLi4uZ3JvdXBlZC5lbnRyaWVzKCldLm1hcCgoW3R5cGUsIGl0ZW1zXSkgPT4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXt0eXBlfSBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zZWN0aW9uVGl0bGV9PntNRU1PUllfVFlQRV9MQUJFTFNbdHlwZV0gPz8gdHlwZX1cdUZGMDh7U3RyaW5nKGl0ZW1zLmxlbmd0aCl9XHVGRjA5PC9kaXY+XG4gICAgICAgICAgICAgICAgICB7aXRlbXMubWFwKChtZW1vcnkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e21lbW9yeS5pZH0gc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDYXJkLCBvcGFjaXR5OiBtZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJyA/IDEgOiAwLjYgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e21lbW9yeS5pc0h1bWFuQ29uZmlybWVkID8gJ1x1MjcwNSAnIDogJyd9e21lbW9yeS50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwLCBmbGV4V3JhcDogJ3dyYXAnLCBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyFtZW1vcnkuaXNIdW1hbkNvbmZpcm1lZCAmJiBtZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGNvbmZpcm1NZW1vcnkobWVtb3J5LmlkKS50aGVuKCgpID0+IHsgdm9pZCBsb2FkTWVtb3JpZXMoKSB9KSB9fT57dCgnbWVtb3J5LmNvbmZpcm0nKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlUb05vdGUobWVtb3J5KSB9fT5cdUQ4M0RcdURDQzQge3QoJ21lbW9yeS50b05vdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5zY29wZSA9PT0gJ2JyYW5jaCcgJiYgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeUFjdGlvbignbm9ybWFsaXplJywgeyBpZDogbWVtb3J5LmlkIH0pIH19Plx1MjFGMSB7dCgnbWVtb3J5Lm5vcm1hbGl6ZScpfTwvYnV0dG9uPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5QWN0aW9uKCdzdGF0dXMnLCB7IGlkOiBtZW1vcnkuaWQsIHN0YXR1czogJ2FyY2hpdmVkJyB9KSB9fT57dCgnbWVtb3J5LmFyY2hpdmVCdG4nKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ3N0YXR1cycsIHsgaWQ6IG1lbW9yeS5pZCwgc3RhdHVzOiAnYWN0aXZlJyB9KSB9fT57dCgnbWVtb3J5LnJlc3RvcmUnKX08L2J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ29udGVudCwgbWF4SGVpZ2h0OiA4NCwgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PnttZW1vcnkuY29udGVudH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5zdGF0dXMgPT09ICdzdGFsZScgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnI2Q5NzcwNicpfT57dCgnbWVtb3J5LnN0YXR1c1N0YWxlJyl9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc2NvcGUgPT09ICdicmFuY2gnICYmIG1lbW9yeS5naXRCcmFuY2ggIT09IG51bGwgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzU2OWNkNicpfT5cdTIzODcge21lbW9yeS5naXRCcmFuY2h9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJ3JnYmEoMzcsOTksMjM1LDAuMTUpJyl9PntNRU1PUllfU09VUkNFX0xBQkVMU1ttZW1vcnkuc291cmNlVGFnXSA/PyBtZW1vcnkuc291cmNlVGFnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuYmFzaXNTaGEgIT09IG51bGwgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57bWVtb3J5LmJhc2lzU2hhLnNsaWNlKDAsIDgpfTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bmV3IERhdGUobWVtb3J5LnVwZGF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICB7YWxsLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdtZW1vcnkuZW1wdHknKX08L2Rpdj59XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApXG4gICAgICAgIH0pKCl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnY29uY2VwdHMudGl0bGUnKX0+XG4gICAgICAgIHtjb25jZXB0cy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnY29uY2VwdHMubm9uZScpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ2NvbmNlcHRzLmNvbC5uYW1lJywgJ2NvbmNlcHRzLmNvbC5jYXRlZ29yeScsICdjb25jZXB0cy5jb2wuY291bnQnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge2NvbmNlcHRzLm1hcCgoY29uY2VwdCkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e2NvbmNlcHQuaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntjb25jZXB0Lm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Y29uY2VwdC5jYXRlZ29yeX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntTdHJpbmcoY29uY2VwdC5vY2N1cnJlbmNlcyl9PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICA8Lz5cbiAgKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBSZXZpZXcgXHU5NUVFXHU5ODk4XHU5ODc1XHU3QjdFXHVGRjFBXHU1MTY4XHU5MUNGXHU5NUVFXHU5ODk4XHU3NzBCXHU2NzdGXHVGRjA4XHU3RURGXHU4QkExICsgXHU3QjVCXHU5MDA5ICsgXHU3MkI2XHU2MDAxXHU2RDQxXHU4RjZDXHVGRjA5KyBcdTlBOENcdTY1MzZcdThCQjBcdTVGNTUgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IHJldmlld1RhYiA9IChcbiAgICA8PlxuICAgICAge3Jlc3VsdFBhbmVsfVxuICAgICAgPENhcmQgdGl0bGU9e3QoJ3Jldmlldy5yZWNvcmRzVGl0bGUnKX0+XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGFsbCA9IChpc3N1ZXNEYXRhID8/IFtdKS5tYXAoKGlzc3VlKSA9PiAoeyAuLi5pc3N1ZSwgc2V2ZXJpdHk6IG5vcm1hbGl6ZUlzc3VlU2V2ZXJpdHkoaXNzdWUuc2V2ZXJpdHkpIH0pKVxuICAgICAgICAgIGNvbnN0IG9wZW5Db3VudCA9IGFsbC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKS5sZW5ndGhcbiAgICAgICAgICBjb25zdCBjb3VudHM6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfT4gPSBbXG4gICAgICAgICAgICB7IGtleTogJycsIGxhYmVsOiB0KCdyZXZpZXcuZmlsdGVyQWxsJyksIGNvdW50OiBhbGwubGVuZ3RoIH0sXG4gICAgICAgICAgICB7IGtleTogJ2NyaXRpY2FsJywgbGFiZWw6ICdjcml0aWNhbCcsIGNvdW50OiBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdjcml0aWNhbCcgfHwgaXNzdWUuc2V2ZXJpdHkgPT09ICdibG9ja2VyJykubGVuZ3RoIH0sXG4gICAgICAgICAgICB7IGtleTogJ21ham9yJywgbGFiZWw6ICdtYWpvcicsIGNvdW50OiBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdtYWpvcicpLmxlbmd0aCB9LFxuICAgICAgICAgICAgeyBrZXk6ICdtaW5vcicsIGxhYmVsOiAnbWlub3InLCBjb3VudDogYWxsLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnNldmVyaXR5ID09PSAnbWlub3InKS5sZW5ndGggfSxcbiAgICAgICAgICAgIHsga2V5OiAnaW5mbycsIGxhYmVsOiAnaW5mbycsIGNvdW50OiBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdpbmZvJykubGVuZ3RoIH0sXG4gICAgICAgICAgXVxuICAgICAgICAgIGNvbnN0IHZpc2libGUgPSBhbGxcbiAgICAgICAgICAgIC5maWx0ZXIoKGlzc3VlKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpc3N1ZVNldmVyaXR5RmlsdGVyID09PSAnJykgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgaWYgKGlzc3VlU2V2ZXJpdHlGaWx0ZXIgPT09ICdjcml0aWNhbCcpIHJldHVybiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBpc3N1ZS5zZXZlcml0eSA9PT0gJ2Jsb2NrZXInXG4gICAgICAgICAgICAgIHJldHVybiBpc3N1ZS5zZXZlcml0eSA9PT0gaXNzdWVTZXZlcml0eUZpbHRlclxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZVN0YXR1c0ZpbHRlciA9PT0gJycgfHwgaXNzdWUuc3RhdHVzID09PSBpc3N1ZVN0YXR1c0ZpbHRlcilcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICB7Y291bnRzLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBrZXk9e2l0ZW0ua2V5ID09PSAnJyA/ICdhbGwnIDogaXRlbS5rZXl9IHN0eWxlPXtzdHlsZXMuY2hpcChpc3N1ZVNldmVyaXR5RmlsdGVyID09PSBpdGVtLmtleSl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0SXNzdWVTZXZlcml0eUZpbHRlcihpdGVtLmtleSkgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLmxhYmVsfSBcdTAwQjcge2l0ZW0uY291bnR9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgICAgICB7b3BlbkNvdW50fSBcdTVGODVcdTU5MDRcdTc0MDYgLyBcdTUxNzEge2FsbC5sZW5ndGh9XG4gICAgICAgICAgICAgICAgICB7KHN0YXRlPy5yZXNvbHZlZElzc3VlUmV0ZW50aW9uRGF5cyA/PyAwKSA+IDAgPyBgIFx1MDBCNyAke3QoJ3Jldmlldy5yZXRlbnRpb25IaW50JykucmVwbGFjZSgne2RheXN9JywgU3RyaW5nKHN0YXRlPy5yZXNvbHZlZElzc3VlUmV0ZW50aW9uRGF5cyA/PyA3KSl9YCA6ICcnfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggOHB4JyB9fSB2YWx1ZT17aXNzdWVTdGF0dXNGaWx0ZXJ9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRJc3N1ZVN0YXR1c0ZpbHRlcihlLnRhcmdldC52YWx1ZSkgfX0+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e3QoJ3Jldmlldy5zdGF0dXNBbGwnKX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhJU1NVRV9TVEFUVVNfTEFCRUxTKS5tYXAoKFt2YWx1ZSwgbGFiZWxdKSA9PiA8b3B0aW9uIGtleT17dmFsdWV9IHZhbHVlPXt2YWx1ZX0+e2xhYmVsfTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJc3N1ZXMoKSB9fT57dCgncmV2aWV3LnJlZnJlc2gnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHthbGwubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e2lzc3Vlc0RhdGEgPT09IG51bGwgPyAnXHUyMDI2JyA6IHQoJ3Jldmlldy5yZWNvcmRzRW1wdHknKX08L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IHZpc2libGUubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ25vdGVzLmVtcHR5U2VhcmNoJyl9PC9kaXY+XG4gICAgICAgICAgICAgICkgOiB2aXNpYmxlLm1hcCgoaXNzdWUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBleHBhbmRlZCA9IGlzc3VlRXhwYW5kZWRbaXNzdWUuaWRdID09PSB0cnVlXG4gICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBpc3N1ZS5kZXNjcmlwdGlvbiA/PyAnJ1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvbmcgPSBkZXNjcmlwdGlvbi5sZW5ndGggPiAyMDBcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2lzc3VlLmlkfSBzdHlsZT17c3R5bGVzLm5vdGVDYXJkfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShzZXZlcml0eUNvbG9yKGlzc3VlLnNldmVyaXR5KSl9Pntpc3N1ZS5zZXZlcml0eX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNzdWUuY2F0ZWdvcnkgPyA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNTc2MDZhJyl9Pntpc3N1ZS5jYXRlZ29yeX08L3NwYW4+IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJyA/ICcjZGNkY2FhJyA6IGlzc3VlLnN0YXR1cyA9PT0gJ3Jlc29sdmVkJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdhY2NlcHRlZCcgPyAnIzRlYzliMCcgOiAnIzhiOGI4YicpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge0lTU1VFX1NUQVRVU19MQUJFTFNbaXNzdWUuc3RhdHVzXSA/PyBpc3N1ZS5zdGF0dXN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVRleHR9Pntpc3N1ZS50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt2ZXJpZnlpbmdUYXJnZXQgIT09IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3Jldmlldy52ZXJpZnlIaW50Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHZlcmlmeUlzc3Vlcyhpc3N1ZS5jaGFuZ2VJZCkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPnt2ZXJpZnlpbmdUYXJnZXQgPT09IGlzc3VlLmNoYW5nZUlkID8gdCgncmV2aWV3LnZlcmlmeVJ1bm5pbmcnKSA6ICdcdUQ4M0RcdUREMEQgJyArIHQoJ3Jldmlldy52ZXJpZnknKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcuZmFsc2VQb3NpdGl2ZUhpbnQnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDb25maXJtRGlhbG9nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHQoJ3Jldmlldy5mYWxzZVBvc2l0aXZlVGl0bGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogdCgncmV2aWV3LmZhbHNlUG9zaXRpdmVNc2cnKS5yZXBsYWNlKCd7dGl0bGV9JywgaXNzdWUudGl0bGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW5nZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXMvc3RhdHVzJywgeyBpZDogaXNzdWUuaWQsIHN0YXR1czogJ3JlamVjdGVkJyB9KS50aGVuKGFzeW5jICh7IG9rIH0pID0+IHsgaWYgKG9rKSBhd2FpdCBsb2FkSXNzdWVzKCkgfSkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlx1RDgzRFx1REVBQiB7dCgncmV2aWV3LmZhbHNlUG9zaXRpdmUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7ZGVzY3JpcHRpb24gIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ29udGVudCwgLi4uKGxvbmcgJiYgIWV4cGFuZGVkID8gc3R5bGVzLm5vdGVDbGFtcCA6IHt9KSB9fT57ZGVzY3JpcHRpb259PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHtpc3N1ZS5yZXNvbHV0aW9uID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JywgcGFkZGluZzogJzZweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgYmFja2dyb3VuZDogJ3JnYmEoNzgsIDIwMSwgMTc2LCAwLjA4KScsIGJvcmRlcjogJzFweCBzb2xpZCByZ2JhKDc4LCAyMDEsIDE3NiwgMC4zNSknLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBcdTI3MTMge2lzc3VlLnJlc29sdXRpb259XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeFN0YXRzICE9IG51bGwgfHwgQm9vbGVhbihpc3N1ZS5maXhEaWZmKSkgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5saW5rQnRuLCBtYXJnaW5Ub3A6ICc0cHgnLCBkaXNwbGF5OiAnYmxvY2snIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0Rml4RXhwYW5kZWQoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW2lzc3VlLmlkXTogIShwcmV2aW91c1tpc3N1ZS5pZF0gPT09IHRydWUpIH0pKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBcdUQ4M0RcdUREMjcge3QoJ3Jldmlldy5maXhEZXRhaWwnKX1cdUZGMDh7U3RyaW5nKGlzc3VlLmZpeFN0YXRzPy5maWxlcyA/PyAwKX0ge3QoJ3Jldmlldy5maXhTdGF0RmlsZXMnKX0gXHUwMEI3ICt7U3RyaW5nKGlzc3VlLmZpeFN0YXRzPy5pbnNlcnRpb25zID8/IDApfSBcdTIyMTJ7U3RyaW5nKGlzc3VlLmZpeFN0YXRzPy5kZWxldGlvbnMgPz8gMCl9XHVGRjA5e2ZpeEV4cGFuZGVkW2lzc3VlLmlkXSA9PT0gdHJ1ZSA/ICdcdTI1QjInIDogJ1x1MjVCQyd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtmaXhFeHBhbmRlZFtpc3N1ZS5pZF0gPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeEZpbGVzID8/IFtdKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzNweCcgfX0+e3QoJ3Jldmlldy5maXhGaWxlcycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeEZpbGVzID8/IFtdKS5tYXAoKGZpbGUpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZmlsZX0gc3R5bGU9e3sgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsIGZvbnRTaXplOiAnMTFweCcgfX0+e2ZpbGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLmZpeEltcGFjdCA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICczcHgnIH19Pnt0KCdyZXZpZXcuZml4SW1wYWN0Jyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc3N1ZS5maXhJbXBhY3QubWFwKChlbnRyeSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeS5zeW1ib2x9IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzVweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMDk2OWRhJyl9PntlbnRyeS5zeW1ib2x9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7JyAnfXt0KCdyZXZpZXcuZGVmaW5lZEluJyl9IHtlbnRyeS5kZWZpbmVkSW59IFx1MDBCNyB7U3RyaW5nKGVudHJ5LmNhbGxlcnMubGVuZ3RoKX0ge3QoJ3Jldmlldy5jYWxsQ291bnQnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2FsbGVycy5zbGljZSgwLCA1KS5tYXAoKGNhbGxlciwgY2FsbGVySW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2NhbGxlckluZGV4fSBzdHlsZT17eyBmb250U2l6ZTogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgcGFkZGluZ0xlZnQ6ICcxMnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2FsbGVyLmZpbGV9OntjYWxsZXIubGluZX0ge2NhbGxlci5zbmlwcGV0LnNsaWNlKDAsIDgwKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtCb29sZWFuKGlzc3VlLmZpeERpZmYpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICczcHgnIH19Pnt0KCdyZXZpZXcuZml4RGlmZicpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctaW5zZXQsIHJnYmEoNSw1LDUsMC4wMykpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzZweCA4cHgnLCBtYXhIZWlnaHQ6ICczMDBweCcsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZW5kZXJEaWZmTGluZXMoaXNzdWUuZml4RGlmZil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICB7bG9uZyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmxpbmtCdG59IG9uQ2xpY2s9eygpID0+IHsgc2V0SXNzdWVFeHBhbmRlZCh7IC4uLmlzc3VlRXhwYW5kZWQsIFtpc3N1ZS5pZF06ICFleHBhbmRlZCB9KSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtleHBhbmRlZCA/IHQoJ25vdGVzLmNvbGxhcHNlJykgOiB0KCdub3Rlcy5leHBhbmQnKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVNZXRhfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57dCgncmV2aWV3LnRhcmdldCcpfToge2lzc3VlVGFyZ2V0TGFiZWwoaXNzdWUuY2hhbmdlSWQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57Zm9ybWF0VGltZShpc3N1ZS5jcmVhdGVkQXQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKVxuICAgICAgICB9KSgpfVxuICAgICAgPC9DYXJkPlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ3ZlcmlmeS5yZWNvcmRzJyl9PlxuICAgICAgICB7dmVyaWZpY2F0aW9ucy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgndmVyaWZ5LnJlY29yZHNFbXB0eScpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3ZlcmlmaWNhdGlvbnMuc2xpY2UoMCwgMjApLm1hcCgocmVjb3JkKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17cmVjb3JkLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHJlY29yZC5zdGF0dXMgPT09ICdwYXNzZWQnID8gJyM0ZWM5YjAnIDogJyNkY2RjYWEnKX0+e3JlY29yZC5zdGF0dXN9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3JlY29yZC5uYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2Zvcm1hdFRpbWUocmVjb3JkLmNyZWF0ZWRBdCl9PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICA8Lz5cbiAgKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvb3R9IGRhdGEtdGVzdGlkPVwicHJvamVjdC1jb250cm9sLXdvcmtzcGFjZVwiPlxuICAgICAgPHN0eWxlPntMQVlPVVRfU1RZTEV9PC9zdHlsZT5cbiAgICAgIDxkaXZcbiAgICAgICAgZGF0YS10ZXN0aWQ9XCJwcm9qZWN0LWNvbnRyb2wtZGl2aWRlclwiXG4gICAgICAgIG9uUG9pbnRlckRvd249e29uRGl2aWRlckRvd259XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogMCwgYm90dG9tOiAwLCByaWdodDogLTQsIHdpZHRoOiA4LFxuICAgICAgICAgIGN1cnNvcjogJ2NvbC1yZXNpemUnLCB6SW5kZXg6IDIwLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5uYXZ9PlxuICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLnRpdGxlfT57dCgnd29ya3NwYWNlLnRpdGxlJyl9PC9zcGFuPlxuICAgICAgICB7dGFicy5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgPGJ1dHRvbiBrZXk9e2VudHJ5LmtleX0gc3R5bGU9e3N0eWxlcy50YWIodGFiID09PSBlbnRyeS5rZXkpfSBvbkNsaWNrPXsoKSA9PiB7IHNldFRhYihlbnRyeS5rZXkpIH19PntlbnRyeS5sYWJlbH08L2J1dHRvbj5cbiAgICAgICAgKSl9XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJ1bm5pbmdDb3VudCA9IHJ1bnMuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuc3RhdHVzID09PSAncnVubmluZycgfHwgZW50cnkuc3RhdHVzID09PSAncXVldWVkJyB8fCBlbnRyeS5zdGF0dXMgPT09ICd2ZXJpZnlpbmcnKS5sZW5ndGhcbiAgICAgICAgICBjb25zdCBmYWlsZWRDb3VudCA9IHJ1bnMuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuc3RhdHVzID09PSAnZmFpbGVkJyB8fCBlbnRyeS5zdGF0dXMgPT09ICdwYXVzZWQnKS5sZW5ndGhcbiAgICAgICAgICBpZiAocnVubmluZ0NvdW50ID09PSAwICYmIGZhaWxlZENvdW50ID09PSAwKSByZXR1cm4gbnVsbFxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIG1hcmdpbkxlZnQ6ICc0cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAge3J1bm5pbmdDb3VudCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKHRoZW1lQXdhcmVUZXh0KCcjMjU2M2ViJykpLCBjdXJzb3I6ICdwb2ludGVyJywgYm9yZGVyOiAnbm9uZScgfX0gdGl0bGU9e3QoJ2JhZGdlLnJ1bm5pbmcnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcocnVubmluZ0NvdW50KSl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldFRhYignZXhlY3V0aW9uJykgfX0+XHUyNUI2IHtTdHJpbmcocnVubmluZ0NvdW50KX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge2ZhaWxlZENvdW50ID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UodGhlbWVBd2FyZVRleHQoJyNmMTRjNGMnKSksIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXI6ICdub25lJyB9fSB0aXRsZT17dCgnYmFkZ2UuZmFpbGVkJykucmVwbGFjZSgne259JywgU3RyaW5nKGZhaWxlZENvdW50KSl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldFRhYignZXhlY3V0aW9uJykgfX0+XHUyNzE3IHtTdHJpbmcoZmFpbGVkQ291bnQpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIClcbiAgICAgICAgfSkoKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmJvZHl9PlxuICAgICAgICB7bG9hZEVycm9yICE9PSBudWxsICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2Vycm9yLmxvYWQnKX06IHtsb2FkRXJyb3J9PC9kaXY+fVxuICAgICAgICB7c3RhdGU/LnJlYWR5ID09PSBmYWxzZSAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9PntzdGF0ZS5yZWFzb24gPz8gJyd9PC9kaXY+fVxuICAgICAgICB7dGFiID09PSAnY29tbWl0cycgJiYgY29tbWl0c1RhYn1cbiAgICAgICAge3RhYiA9PT0gJ292ZXJ2aWV3JyAmJiBvdmVydmlld1RhYn1cbiAgICAgICAge3RhYiA9PT0gJ2V4ZWN1dGlvbicgJiYgZXhlY3V0aW9uVGFifVxuICAgICAgICB7dGFiID09PSAncmV2aWV3JyAmJiByZXZpZXdUYWJ9XG4gICAgICAgIHt0YWIgPT09ICdub3RlcycgJiYgbm90ZXNUYWJ9XG4gICAgICAgIHt0YWIgPT09ICdzZXR0aW5ncycgJiYgc2V0dGluZ3NUYWJ9XG4gICAgICA8L2Rpdj5cbiAgICAgIHtjb25maXJtRGlhbG9nICE9PSBudWxsICYmIChcbiAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICB0aXRsZT17Y29uZmlybURpYWxvZy50aXRsZX1cbiAgICAgICAgICBtZXNzYWdlPXtjb25maXJtRGlhbG9nLm1lc3NhZ2V9XG4gICAgICAgICAgZGFuZ2VyPXtjb25maXJtRGlhbG9nLmRhbmdlcn1cbiAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKG51bGwpIH19XG4gICAgICAgICAgb25Db25maXJtPXsoKSA9PiB7IGNvbmZpcm1EaWFsb2cub25Db25maXJtKCk7IHNldENvbmZpcm1EaWFsb2cobnVsbCkgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gIClcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpQkEsSUFBQUEsZ0JBQWtCOzs7QUNWbEIsbUJBQWtCO0FBV1gsSUFBTSxhQUF3QyxDQUFDO0FBQUEsRUFDcEQsUUFBUTtBQUFBLEVBQ1IsZUFBZTtBQUFBLEVBQ2YsYUFBYTtBQUFBLEVBQ2IsWUFBWTtBQUFBLEVBQ1o7QUFBQSxFQUNBLFNBQVM7QUFDWCxNQUFNO0FBQ0osU0FBTyxhQUFBQyxRQUFNO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxNQUNFLGVBQWU7QUFBQSxNQUNmLE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVM7QUFBQSxRQUNULFFBQVE7QUFBQSxRQUNSLGlCQUFpQjtBQUFBLFFBQ2pCLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxNQUNaO0FBQUEsSUFDRjtBQUFBLElBQ0EsYUFBQUEsUUFBTTtBQUFBLE1BQ0o7QUFBQSxNQUNBO0FBQUEsUUFDRSxPQUFPO0FBQUEsVUFDTCxTQUFTO0FBQUEsVUFDVCxnQkFBZ0I7QUFBQSxVQUNoQixZQUFZO0FBQUEsVUFDWixjQUFjO0FBQUEsVUFDZCxZQUFZO0FBQUEsUUFDZDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGFBQUFBLFFBQU0sY0FBYyxRQUFRLE1BQU0sYUFBTSxLQUFLLEVBQUU7QUFBQSxNQUMvQyxhQUFBQSxRQUFNO0FBQUEsUUFDSjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU87QUFBQSxZQUNMLFVBQVU7QUFBQSxZQUNWLFNBQVM7QUFBQSxZQUNULGNBQWM7QUFBQSxZQUNkLGlCQUFpQjtBQUFBLFlBQ2pCLE9BQU87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QjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBRWhCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHFCQUFxQjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLGFBQWE7QUFBQSxJQUNiLG9CQUFvQjtBQUFBLElBQ3BCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHdCQUF3QjtBQUFBLElBQ3hCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtB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QUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLElBQ2hCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGlCQUFpQjtBQUFBLElBQ2pCLHVCQUF1QjtBQUFBLElBQ3ZCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBRWhCLFlBQVk7QUFBQSxJQUNaLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHFCQUFxQjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLGFBQWE7QUFBQSxJQUNiLG9CQUFvQjtBQUFBLElBQ3BCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHdCQUF3QjtBQUFBLElBQ3hCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHlCQUF5QjtBQUFBLElBQ3pCLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLGtCQUFrQjtBQUFBLElBQ2xCLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtB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USxnQkFBZ0I7QUFBQSxRQUN0QyxZQUFZLFFBQVEsY0FBYztBQUFBLFFBQ2xDLFdBQVcsUUFBUSxhQUFhO0FBQUEsUUFDaEMsWUFBWSxRQUFRO0FBQUEsUUFDcEIsUUFBUSxTQUFTLGNBQWM7QUFBQSxNQUNqQyxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsYUFBVyxDQUFDLFNBQVMsS0FBSyxLQUFLO0FBQUEsSUFDN0IsQ0FBQyxhQUFhLDRCQUFXO0FBQUEsSUFDekIsQ0FBQyxjQUFjLG9DQUFTO0FBQUEsSUFDeEIsQ0FBQyxvQkFBb0IsaUNBQVE7QUFBQSxFQUMvQixHQUFZO0FBQ1YsUUFBSSxNQUFNLE9BQU8sc0JBQXNCLE1BQU07QUFDM0MsYUFBTyxJQUFJLE1BQU0sU0FBUyxFQUFFLE1BQU0sc0JBQXNCLEtBQUssUUFBUSxHQUFHLGlCQUFpQixLQUFLLENBQUM7QUFBQSxJQUNqRyxDQUFDO0FBQUEsRUFDSDtBQUNGOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIm5hbWUiLCAiUmVhY3QiLCAib2siLCAiZGF0YSIsICJhcHBseSIsICJmcmFtZSIsICJSZWFjdCJdCn0K
