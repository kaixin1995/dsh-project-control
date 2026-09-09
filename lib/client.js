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
function themeAwareText(color) {
  const rgb = parseColor(color);
  if (rgb === null) return color;
  if (typeof document !== "undefined" && document.body?.hasAttribute?.("data-ds-dark-theme") === true) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
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
    "exec.col.steps": "\u6B65\u9AA4",
    "notes.edit": "\u7F16\u8F91",
    "notes.toMemory": "\u8F6C\u8BB0\u5FC6",
    "notes.toMemoryHint": "\u628A\u8FD9\u6761\u7B14\u8BB0\u7684\u6807\u9898\u4E0E\u5185\u5BB9\u586B\u5165\u4E0B\u65B9\u8BB0\u5FC6\u8868\u5355\uFF0C\u786E\u8BA4\u540E\u5165\u5E93",
    "notes.toMemoryDone": "\u2713 \u5DF2\u586B\u5165\u8BB0\u5FC6\u8868\u5355\uFF08\u5728\u4E0B\u65B9\u300C\u9879\u76EE\u8BB0\u5FC6\u300D\u533A\u786E\u8BA4\u7C7B\u578B\u540E\u6DFB\u52A0\uFF09",
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
    "exec.col.steps": "Steps",
    "notes.edit": "Edit",
    "notes.toMemory": "To memory",
    "notes.toMemoryHint": "Prefill the memory form below with this note",
    "notes.toMemoryDone": "\u2713 Prefilled the memory form (choose a type in the Project memory zone below, then add)",
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
    fontSize: "11px",
    background: "var(--dsw-alias-brand-primary, #2563eb)",
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
              background: props.danger ? "#e11d48" : "var(--dsw-alias-brand-primary, #2563eb)",
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
  const [modelTiers, setModelTiers] = (0, import_react2.useState)(null);
  const [modelOptions, setModelOptions] = (0, import_react2.useState)([]);
  const [modelSaving, setModelSaving] = (0, import_react2.useState)(false);
  const [modelSaved, setModelSaved] = (0, import_react2.useState)(false);
  const [planConfirm, setPlanConfirm] = (0, import_react2.useState)(null);
  const [planBusy, setPlanBusy] = (0, import_react2.useState)(false);
  const [runDetail, setRunDetail] = (0, import_react2.useState)(null);
  const [scheduledData, setScheduledData] = (0, import_react2.useState)(null);
  const [schedName, setSchedName] = (0, import_react2.useState)("");
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
      const { ok, data } = await post("/project-control/api/runs/start", { title: execTitle.trim(), description: execDesc.trim() });
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
              style: { ...styles.input, width: 240 },
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: t("exec.create"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.formRow, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { style: styles.input, placeholder: t("exec.formTitle"), value: execTitle, onChange: (e) => {
          setExecTitle(e.target.value);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { style: styles.textarea, rows: 3, placeholder: t("exec.formDesc"), value: execDesc, onChange: (e) => {
          setExecDesc(e.target.value);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.button, disabled: busy !== null || execTitle.trim() === "" || execDesc.trim() === "", onClick: () => {
          void startRun();
        }, children: busy === "startRun" ? t("exec.starting") : t("exec.start") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: t("exec.createHint") })
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
              style: { ...styles.input, width: "auto", padding: "3px 6px" },
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
              style: { ...styles.input, width: "auto", padding: "3px 6px" },
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
              style: { ...styles.input, width: "auto", padding: "3px 6px" },
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: t("sched.title"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.formRow, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { style: styles.input, placeholder: t("sched.formName"), value: schedName, onChange: (e) => {
          setSchedName(e.target.value);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { style: { ...styles.input, width: "auto" }, value: schedType, onChange: (e) => {
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { style: { ...styles.input, width: "auto" }, value: memoryType, onChange: (e) => {
          setMemoryType(e.target.value);
        }, children: Object.entries(MEMORY_TYPE_LABELS).map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value, children: label }, value)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { style: { ...styles.input, width: "auto" }, value: memoryScope, onChange: (e) => {
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { style: { ...styles.input, width: "auto", padding: "3px 8px" }, value: issueStatusFilter, onChange: (e) => {
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
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", gap: "4px", flexShrink: 0 }, children: (issue.status === "open" || issue.status === "fixing") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
              ) })
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
      }, children: entry.label }, entry.key))
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NsaWVudC9pbmRleC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvV29ya3NwYWNlRnJhbWUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIENsaWVudCBwbHVnaW4gZW50cnkgZm9yIGRzaC1wcm9qZWN0LWNvbnRyb2wuXG4gKlxuICogXHU1RTAzXHU1QzQwXHU2N0I2XHU2Nzg0XHVGRjA4XHU1REYyXHU5QThDXHU4QkMxXHVGRjBDMjAyNi0wOC0zMFx1RkYwOVx1RkYxQVxuICogLSBcdTVERTVcdTRGNUNcdTUzRjBcdTkwNkVcdTg1M0RcdTVCOThcdTY1QjkgYGRldGFpbHNgIFx1NjlGRFx1RkYwOHByaW9yaXR5IC0xMFx1RkYwQ1x1NUI5OFx1NjVCOSBEZXRhaWxzUGFuZWwgXHU3NTU5XHU1NzI4XHU4RDI2XHU2NzJDXHU0RTBBXHVGRjBDXG4gKiAgIFx1NTM3OFx1OEY3RFx1NjIxMVx1NEVFQ1x1NzY4NFx1NkNFOFx1NTE4Q1x1NTM3M1x1NjA2Mlx1NTkwRFx1RkYwOVx1RkYwQ1x1NkUzMlx1NjdEM1x1NTcyOFx1NEUzQlx1Njg0Nlx1NjdCNiBkZXRhaWxzIFx1NTIxN1x1RkYxQlxuICogLSBXb3Jrc3BhY2VGcmFtZSBcdTZDRThcdTUxNjVcdTY4MzdcdTVGMEZcdTg4NjhcdUZGMENcdTYyOEFcdTVCOThcdTY1QjlcdTdGNTFcdTY4M0NcdTg5QzZcdTg5QzlcdTYzNjJcdTUyMTdcdUZGMUFcdTgwNEFcdTU5MjlcdUZGMDhjZW50ZXJDb2xcdUZGMDlcdTY3MDBcdTUzRjNcdTMwMDFcbiAqICAgXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4ZGV0YWlsc0NvbFx1RkYwOVx1NUM0NVx1NEUyRCAxZnJcdUZGMUJcdTY1RTBcdTRGMUFcdThCRERcdTg0M0RcdTU3MzBcdTk4NzVcdUZGMDhkYXRhLWRldGFpbHMtY29sbGFwc2VkXHVGRjA5XG4gKiAgIFx1ODFFQVx1NTJBOFx1NjA2Mlx1NTkwRFx1NTM5Rlx1NzUxRlx1NTIxN1x1NUU4Rlx1RkYxQlxuICogLSBcdTVERTZcdTRGQTdcdTVCOThcdTY1QjlcdTVCRkNcdTgyMkFcdTMwMDFcdTVCOThcdTY1QjlcdTgwNEFcdTU5MjlcdTY3MkNcdTRGNTNcdTk2RjZcdTY1MzlcdTUyQThcdUZGMUJcbiAqIC0gXHU0RkE3XHU4RkI5XHU2ODBGXHU2MzA5XHU5NEFFXHU1NzI4XHUzMDBDXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1M0YwIFx1MjFDNCBcdTVCOThcdTY1QjlcdThCRTZcdTYwQzVcdTk3NjJcdTY3N0ZcdTMwMERcdTk1RjRcdTUyMDdcdTYzNjJcdUZGMDhcdTUzRUZcdTkwMDZcdUZGMDlcdUZGMUJcbiAqIC0gYHRvb2wuY2FsbC50b29sdmlld2AgXHU0RTNBIGFuYWx5emVfY2hhbmdlIFx1NEZERFx1NzU1OVx1NEUxM1x1NUM1RVx1NTM2MVx1NzI0N1x1RkYxQlxuICogLSBcdTY1ODdcdTY4NDhcdTUxNjhcdTkwRThcdTdFQ0YgY3R4LmxvY2FsZSBcdThCQ0RcdTUxNzhcdUZGMDh6aCAvIGVuXHVGRjA5XHUzMDAyXG4gKlxuICogQG1vZHVsZSBkc2gtY2xpZW50LXByb2plY3QtY29udHJvbFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IENoYW5nZUNhcmQgfSBmcm9tICcuL2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cydcbmltcG9ydCB7IFdPUktTUEFDRV9ESUNULCBXb3Jrc3BhY2VGcmFtZSB9IGZyb20gJy4vY29tcG9uZW50cy9Xb3Jrc3BhY2VGcmFtZS50c3gnXG5cbmNvbnN0IE5TID0gJ3Byb2plY3QtY29udHJvbCdcblxuZXhwb3J0IGNvbnN0IG5hbWUgPSAnY2xpZW50LXByb2plY3QtY29udHJvbCdcbmV4cG9ydCBjb25zdCBpbmplY3QgPSBbJ3Nsb3RzJywgJ2xvY2FsZScsICdsYXlvdXQnXVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoY3R4OiBhbnkpOiB2b2lkIHtcbiAgY3R4LmVmZmVjdCgoKSA9PiBjdHgubG9jYWxlLnJlZ2lzdGVyKE5TLCB7IHpoOiBXT1JLU1BBQ0VfRElDVC56aCwgZW46IFdPUktTUEFDRV9ESUNULmVuIH0pLCAncHJvamVjdC1jb250cm9sOiBkaWN0aW9uYXJpZXMnKVxuICBjb25zdCBsYXlvdXQgPSBjdHgubGF5b3V0XG5cbiAgLy8gXHUyNTAwXHUyNTAwIDEuIFx1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTNGMFx1RkYxQVx1OTA2RVx1ODUzRCBkZXRhaWxzIFx1NjlGRFx1RkYwOFx1NTNFRlx1OTAwNlx1RkYwOVx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAvLyBcdTY1QjBcdTdBOTdcdTUzRTNcdTlFRDhcdThCQTRcdTRFMERcdTY2M0VcdTc5M0FcdTVERTVcdTRGNUNcdTUzRjBcdUZGMDhcdTRGRERcdTYzMDFcdTVCOThcdTY1QjlcdTUzOUZcdTc1MUZcdTg5QzZcdTg5RDJcdUZGMDlcdUZGMENcdTc1MzFcdTRGQTdcdThGQjlcdTY4MEZcdTYzMDlcdTk0QUVcdTY2M0VcdTVGMEZcdTYyNTNcdTVGMDBcdTMwMDJcbiAgbGV0IHdvcmtzcGFjZUVuYWJsZWQgPSBmYWxzZVxuICBsZXQgZGlzcG9zZVdvcmtzcGFjZTogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkXG5cbiAgY29uc3QgcmVnaXN0ZXJXb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XG4gICAgZGlzcG9zZVdvcmtzcGFjZSA9IGN0eC5zbG90cy5yZWdpc3RlcihcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2RldGFpbHMnLFxuICAgICAgICBwcmlvcml0eTogLTEwLFxuICAgICAgICBsb2NhbGU6IE5TLFxuICAgICAgfSxcbiAgICAgIC8vIFx1NjMwMlx1OEY3RFx1NTM3M1x1NjI1M1x1NUYwMCBkZXRhaWxzIFx1OEY2OFx1OTA1M1x1RkYwOFx1OTc2Mlx1Njc3Rlx1NTA0Rlx1NTk3RFx1OUVEOFx1OEJBNCAwXHVGRjA5XHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwXHU5NzAwXHU4OTgxXHU3NzFGXHU1QjlFXHU1QkJEXHU1RUE2XHVGRjFCXG4gICAgICAvLyBcdTY1RTBcdTRGMUFcdThCRERcdTg0M0RcdTU3MzBcdTk4NzVcdThGNjhcdTkwNTNcdTYwNTIgMFx1RkYwQ1x1NTkyOVx1NzEzNlx1NEZERFx1NjMwMVx1NTM5Rlx1NzUxRlx1ODJGMVx1OTZDNFx1OTg3NVx1NUUwM1x1NUM0MFx1MzAwMlxuICAgICAgLy8gXHU0RjFBXHU4QkREXHU1MjA3XHU2MzYyXHU2NUY2XHU1Qjk4XHU2NUI5XHU0RjFBIGNsb3NlRGV0YWlscyBcdTIwMTRcdTIwMTQgXHU1RUY2XHU1NDBFXHU0RTAwXHU2MkNEXHU5MUNEXHU2NUIwXHU2NDkxXHU1RjAwXHVGRjA4XHU1QjhGXHU0RUZCXHU1MkExXHU2NjVBXHU0RThFXHU3MjM2XHU3RUE3IGVmZmVjdFx1RkYwOVx1MzAwMlxuICAgICAgKHByb3BzOiBhbnkpID0+IHtcbiAgICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICBsYXlvdXQ/Lm9wZW5EZXRhaWxzPy4oKVxuICAgICAgICB9LCBbXSlcbiAgICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICBpZiAocHJvcHMuc2Vzc2lvbklkID09PSB1bmRlZmluZWQpIHJldHVyblxuICAgICAgICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiBsYXlvdXQ/Lm9wZW5EZXRhaWxzPy4oKSwgMClcbiAgICAgICAgICByZXR1cm4gKCkgPT4geyBjbGVhclRpbWVvdXQodGltZXIpIH1cbiAgICAgICAgfSwgW3Byb3BzLnNlc3Npb25JZF0pXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFdvcmtzcGFjZUZyYW1lLCB7IC4uLnByb3BzLCBsYXlvdXQgfSlcbiAgICAgIH0sXG4gICAgKVxuICB9XG4gIGNvbnN0IHVucmVnaXN0ZXJXb3Jrc3BhY2UgPSAoKTogdm9pZCA9PiB7XG4gICAgZGlzcG9zZVdvcmtzcGFjZT8uKClcbiAgICBkaXNwb3NlV29ya3NwYWNlID0gdW5kZWZpbmVkXG4gIH1cblxuICBjdHguc2xvdHMuaW5qZWN0KCdkZXRhaWxzJywgKCkgPT4ge1xuICAgIGlmICh3b3Jrc3BhY2VFbmFibGVkKSByZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHVucmVnaXN0ZXJXb3Jrc3BhY2UoKVxuICAgIH1cbiAgfSlcblxuICAvLyBcdTI1MDBcdTI1MDAgMi4gXHU0RkE3XHU4RkI5XHU2ODBGXHU1RTk1XHU5MEU4XHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwIFx1MjFDNCBcdTVCOThcdTY1QjlcdThCRTZcdTYwQzUgXHU1MjA3XHU2MzYyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAvLyBcdTYzMDlcdTk0QUVcdTcyQjZcdTYwMDFcdTY2MEVcdTc5M0FcdUZGMUFcdTVERTVcdTRGNUNcdTUzRjBcdTY2M0VcdTc5M0FcdTRFMkQgXHUyMTkyIFx1MzAwQ1x1RDgzRVx1RERFRCBcdTVERTVcdTRGNUNcdTUzRjAgXHUyNzEzXHUzMDBEXHVGRjFCXHU1REYyXHU1MjA3XHU1Qjk4XHU2NUI5XHU4QkU2XHU2MEM1IFx1MjE5MiBcdTMwMENcdUQ4M0VcdURERUQgXHU2MjUzXHU1RjAwXHU1REU1XHU0RjVDXHU1M0YwXHUzMDBEXHU5QUQ4XHU0RUFFXHVGRjBDXG4gIC8vIFx1NzUyOFx1NjIzN1x1OTY4Rlx1NjVGNlx1NzcwQlx1NUY5N1x1NTIzMFx1NjAwRVx1NEU0OFx1NTIwN1x1NTZERVx1Njc2NVx1RkYwOFx1NTIwN1x1NjM2Mlx1N0VDRiB3aW5kb3cgXHU0RThCXHU0RUY2XHU5MDFBXHU3N0U1XHU2MzA5XHU5NEFFXHU5MUNEXHU2RTMyXHU2N0QzXHVGRjA5XHUzMDAyXG4gIGNvbnN0IFRPR0dMRV9FVkVOVCA9ICdwYy13b3Jrc3BhY2UtdG9nZ2xlJ1xuICBjb25zdCBmaXJlVG9nZ2xlID0gKGVuYWJsZWQ6IGJvb2xlYW4pOiB2b2lkID0+IHtcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoVE9HR0xFX0VWRU5ULCB7IGRldGFpbDogZW5hYmxlZCB9KSlcbiAgfVxuICBjdHguc2xvdHMuaW5qZWN0KCdzaWRlYmFyLmZvb3Rlci5hY3Rpb24nLCAoKSA9PiB7XG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XG4gICAgICBuYW1lOiAnc2lkZWJhci5mb290ZXIuYWN0aW9uJyxcbiAgICAgIGlkOiAncHJvamVjdC1jb250cm9sLXRvZ2dsZScsXG4gICAgfSwgKCkgPT4ge1xuICAgICAgY29uc3QgW2VuYWJsZWQsIHNldEVuYWJsZWRdID0gUmVhY3QudXNlU3RhdGUod29ya3NwYWNlRW5hYmxlZClcbiAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQ6IEV2ZW50KTogdm9pZCA9PiB7IHNldEVuYWJsZWQoKGV2ZW50IGFzIEN1c3RvbUV2ZW50PGJvb2xlYW4+KS5kZXRhaWwpIH1cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoVE9HR0xFX0VWRU5ULCBoYW5kbGVyKVxuICAgICAgICByZXR1cm4gKCkgPT4geyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihUT0dHTEVfRVZFTlQsIGhhbmRsZXIpIH1cbiAgICAgIH0sIFtdKVxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdidXR0b24nLFxuICAgICAgICB7XG4gICAgICAgICAgJ2RhdGEtdGVzdGlkJzogJ3Byb2plY3QtY29udHJvbC1zaWRlYmFyLXRvZ2dsZScsXG4gICAgICAgICAgdGl0bGU6IGVuYWJsZWQgPyAnXHU1RjUzXHU1MjREXHU2NjNFXHU3OTNBXHU5ODc5XHU3NkVFXHU2ODM4XHU2N0U1XHU1M0YwXHUzMDAyXHU3MEI5XHU1MUZCXHU1M0VGXHU0RTM0XHU2NUY2XHU1MjA3XHU2MzYyXHU0RTNBXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHVGRjA4XHU2N0U1XHU3NzBCXHU1REU1XHU1MTc3XHU4QzAzXHU3NTI4XHU3Njg0XHU1QjhDXHU2NTc0XHU4RjkzXHU1MTY1L1x1OEY5M1x1NTFGQVx1RkYwOVx1RkYxQlx1NTE4RFx1NzBCOVx1NjcyQ1x1NjMwOVx1OTRBRVx1NTM3M1x1NjA2Mlx1NTkwRFx1MzAwMicgOiAnXHU1RjUzXHU1MjREXHU2NjNFXHU3OTNBXHU1Qjk4XHU2NUI5XHUzMDBDXHU4QkU2XHU2MEM1XHUzMDBEXHU5NzYyXHU2NzdGXHUzMDAyXHU3MEI5XHU1MUZCXHU2MDYyXHU1OTBEXHU5ODc5XHU3NkVFXHU2ODM4XHU2N0U1XHU1M0YwXHUzMDAyJyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnNnB4JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggMTBweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgY29sb3I6IGVuYWJsZWQgPyAnaW5oZXJpdCcgOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IGVuYWJsZWQgPyA0MDAgOiA2MDAsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJywgb3BhY2l0eTogMC45LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgd29ya3NwYWNlRW5hYmxlZCA9ICF3b3Jrc3BhY2VFbmFibGVkXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAod29ya3NwYWNlRW5hYmxlZCAmJiBkaXNwb3NlV29ya3NwYWNlID09PSB1bmRlZmluZWQpIHJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICAgICAgICAgICAgZWxzZSBpZiAoIXdvcmtzcGFjZUVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB1bnJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICAgICAgICAgICAgICAvLyBcdTY1MzZcdThENzdcdTUzRjNcdTRGQTdcdThGNjhcdTkwNTNcdUZGMUFcdTU0MjZcdTUyMTlcdTVCOThcdTY1QjkgRGV0YWlsc1BhbmVsIFx1OTg3Nlx1NTZERVx1Njc2NVx1RkYwQ1x1NkI4Qlx1NzU1OVx1N0E3QVx1NjAwMVx1OTc2Mlx1Njc3RlxuICAgICAgICAgICAgICAgIC8vIFx1RkYwOFx1MzAwQ1x1NzBCOVx1NTFGQlx1NkQ4OFx1NjA2Rlx1NkQ0MVx1NEUyRFx1NzY4NFx1NURFNVx1NTE3N1x1ODg0Q1x1NjdFNVx1NzcwQlx1OEJFNlx1NjBDNVx1MzAwRFx1RkYwOVx1MzAwMlxuICAgICAgICAgICAgICAgIGxheW91dD8uY2xvc2VEZXRhaWxzPy4oKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1twcm9qZWN0LWNvbnRyb2xdIHdvcmtzcGFjZSB0b2dnbGUgZmFpbGVkJywgZXJyb3IpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaXJlVG9nZ2xlKHdvcmtzcGFjZUVuYWJsZWQpXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgZW5hYmxlZCA/ICdcdUQ4M0VcdURERUQgXHU1REU1XHU0RjVDXHU1M0YwIFx1MjcxMycgOiAnXHVEODNFXHVEREVEIFx1NjI1M1x1NUYwMFx1NURFNVx1NEY1Q1x1NTNGMCcsXG4gICAgICApXG4gICAgfSlcbiAgfSlcblxuICAvLyBcdTI1MDBcdTI1MDAgMy4gXHU4MDRBXHU1OTI5XHU1REU1XHU1MTc3XHU1MzYxXHU3MjQ3XHVGRjA4XHU2MjY3XHU4ODRDL1x1OEJDNFx1NUJBMS9cdTlBOENcdTY1MzZcdUZGMDlcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgY29uc3Qgc2ltcGxlUmVzdWx0Q2FyZCA9ICh0aXRsZTogc3RyaW5nKTogKChwcm9wczogYW55KSA9PiBhbnkpID0+IChwcm9wczogYW55KSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gcHJvcHM/Lm91dHB1dFxuICAgIGNvbnN0IHRleHQgPSB0eXBlb2Ygb3V0cHV0ID09PSAnc3RyaW5nJ1xuICAgICAgPyBvdXRwdXRcbiAgICAgIDogb3V0cHV0Py5zdW1tYXJ5ID8/IG91dHB1dD8uaXNzdWVzID8/IG91dHB1dD8uZGV0YWlscyA/PyAob3V0cHV0ID8gSlNPTi5zdHJpbmdpZnkob3V0cHV0LCBudWxsLCAyKSA6ICdcdTYyNjdcdTg4NENcdTRFMkRcdTIwMjYnKVxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgJ2RpdicsXG4gICAgICB7XG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgIHBhZGRpbmc6ICcxMHB4IDEycHgnLFxuICAgICAgICAgIG1hcmdpbjogJzRweCAwJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJyxcbiAgICAgICAgICBmb250U2l6ZTogJzEycHgnLFxuICAgICAgICAgIGxpbmVIZWlnaHQ6IDEuNixcbiAgICAgICAgICB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLFxuICAgICAgICAgIG1heEhlaWdodDogMjYwLFxuICAgICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICc0cHgnIH0gfSwgdGl0bGUpLFxuICAgICAgU3RyaW5nKHRleHQpLFxuICAgIClcbiAgfVxuXG4gIC8vIFx1MjUwMFx1MjUwMCAzLiBhbmFseXplX2NoYW5nZSBcdTRFMTNcdTVDNUVcdTVERTVcdTUxNzdcdTUzNjFcdTcyNDcgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gIGN0eC5zbG90cy5pbmplY3QoJ3Rvb2wuY2FsbC50b29sdmlldycsICgpID0+IHtcbiAgICByZXR1cm4gY3R4LnNsb3RzLnJlZ2lzdGVyKHtcbiAgICAgIG5hbWU6ICd0b29sLmNhbGwudG9vbHZpZXcnLFxuICAgICAga2V5OiAnYW5hbHl6ZV9jaGFuZ2UnLFxuICAgIH0sIChwcm9wczogYW55KSA9PiB7XG4gICAgICBpZiAocHJvcHM/LnRvb2xOYW1lICE9PSAnYW5hbHl6ZV9jaGFuZ2UnKSByZXR1cm4gbnVsbFxuICAgICAgY29uc3Qgb3V0cHV0ID0gcHJvcHM/Lm91dHB1dFxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ2hhbmdlQ2FyZCwge1xuICAgICAgICB0aXRsZTogJ1x1NTNEOFx1NjZGNFx1NTIwNlx1Njc5MFx1NjJBNVx1NTQ0QSAoQ2hhbmdlIEFuYWx5c2lzKScsXG4gICAgICAgIGZpbGVzQ2hhbmdlZDogb3V0cHV0Py5maWxlc0NoYW5nZWQgPz8gMCxcbiAgICAgICAgaW5zZXJ0aW9uczogb3V0cHV0Py5pbnNlcnRpb25zID8/IDAsXG4gICAgICAgIGRlbGV0aW9uczogb3V0cHV0Py5kZWxldGlvbnMgPz8gMCxcbiAgICAgICAgZXZpZGVuY2VJZDogb3V0cHV0Py5ldmlkZW5jZUlkLFxuICAgICAgICBzdGF0dXM6IG91dHB1dCA/ICdjb21wbGV0ZWQnIDogJ2FuYWx5emluZycsXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG5cbiAgZm9yIChjb25zdCBbdG9vbEtleSwgdGl0bGVdIG9mIFtcbiAgICBbJ3N0YXJ0X3J1bicsICdcdUQ4M0RcdURFODAgXHU2MjY3XHU4ODRDIFJ1biddLFxuICAgIFsncnVuX3JldmlldycsICdcdUQ4M0RcdUREMEQgXHU0RUUzXHU3ODAxXHU4QkM0XHU1QkExJ10sXG4gICAgWydydW5fdmVyaWZpY2F0aW9uJywgJ1x1MjcwNSBcdTlBOENcdTY1MzZcdTlBOENcdThCQzEnXSxcbiAgXSBhcyBjb25zdCkge1xuICAgIGN0eC5zbG90cy5pbmplY3QoJ3Rvb2wuY2FsbC50b29sdmlldycsICgpID0+IHtcbiAgICAgIHJldHVybiBjdHguc2xvdHMucmVnaXN0ZXIoeyBuYW1lOiAndG9vbC5jYWxsLnRvb2x2aWV3Jywga2V5OiB0b29sS2V5IH0sIHNpbXBsZVJlc3VsdENhcmQodGl0bGUpKVxuICAgIH0pXG4gIH1cbn1cbiIsICIvKipcclxuICogUmVhY3QgQ29tcG9uZW50OiBDaGFuZ2UgLyBJbnNpZ2h0IENhcmQgZm9yIENoYXQgVmlldy5cclxuICogUmVuZGVycyBzdHJ1Y3R1cmVkIGluc2lnaHRzLCBkaWZmIHN0YXRpc3RpY3MsIGFuZCBldmlkZW5jZSBiYWRnZXMuXHJcbiAqXHJcbiAqIEBtb2R1bGUgZHNoLXByb2plY3QtY29udHJvbC9jbGllbnQvY29tcG9uZW50cy9DaGFuZ2VDYXJkXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VDYXJkUHJvcHMge1xyXG4gIHRpdGxlPzogc3RyaW5nXHJcbiAgZmlsZXNDaGFuZ2VkPzogbnVtYmVyXHJcbiAgaW5zZXJ0aW9ucz86IG51bWJlclxyXG4gIGRlbGV0aW9ucz86IG51bWJlclxyXG4gIGV2aWRlbmNlSWQ/OiBzdHJpbmdcclxuICBzdGF0dXM/OiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IENoYW5nZUNhcmQ6IFJlYWN0LkZDPENoYW5nZUNhcmRQcm9wcz4gPSAoe1xyXG4gIHRpdGxlID0gJ0NoYW5nZSBJbnNpZ2h0JyxcclxuICBmaWxlc0NoYW5nZWQgPSAwLFxyXG4gIGluc2VydGlvbnMgPSAwLFxyXG4gIGRlbGV0aW9ucyA9IDAsXHJcbiAgZXZpZGVuY2VJZCxcclxuICBzdGF0dXMgPSAnYW5hbHl6ZWQnLFxyXG59KSA9PiB7XHJcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAnZGl2JyxcclxuICAgIHtcclxuICAgICAgJ2RhdGEtdGVzdGlkJzogJ3Byb2plY3QtY29udHJvbC1jaGFuZ2UtY2FyZCcsXHJcbiAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzaC1ib3JkZXIsICMzMzMpJyxcclxuICAgICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxyXG4gICAgICAgIHBhZGRpbmc6ICcxMHB4IDE0cHgnLFxyXG4gICAgICAgIG1hcmdpbjogJzZweCAwJyxcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1kc2gtYmctc3VidGxlLCAjMWUxZTFlKScsXHJcbiAgICAgICAgY29sb3I6ICd2YXIoLS1kc2gtdGV4dCwgI2VlZSknLFxyXG4gICAgICAgIGZvbnRTaXplOiAnMTNweCcsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgJ2RpdicsXHJcbiAgICAgIHtcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBudWxsLCBgXHVEODNEXHVERDBEICR7dGl0bGV9YCksXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgJ3NwYW4nLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHggNnB4JyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tZHNoLWJhZGdlLWJnLCAjMmEyYTJhKScsXHJcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tZHNoLWJhZGdlLXRleHQsICNhYWEpJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGF0dXMsXHJcbiAgICAgICksXHJcbiAgICApLFxyXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgJ2RpdicsXHJcbiAgICAgIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxMnB4JywgZm9udFNpemU6ICcxMnB4Jywgb3BhY2l0eTogMC45IH0gfSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIG51bGwsIGBcdUQ4M0RcdURDQzEgJHtmaWxlc0NoYW5nZWR9IGZpbGVzYCksXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IHN0eWxlOiB7IGNvbG9yOiAnIzRlYzliMCcgfSB9LCBgKyR7aW5zZXJ0aW9uc31gKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6ICcjZjE0YzRjJyB9IH0sIGAtJHtkZWxldGlvbnN9YCksXHJcbiAgICAgIGV2aWRlbmNlSWRcclxuICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgICAgICdzcGFuJyxcclxuICAgICAgICAgICAgeyBzdHlsZTogeyBvcGFjaXR5OiAwLjcsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnIH0gfSxcclxuICAgICAgICAgICAgYFske2V2aWRlbmNlSWR9XWAsXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgOiBudWxsLFxyXG4gICAgKSxcclxuICApXHJcbn1cclxuIiwgIi8qKlxuICogUHJvamVjdCBDb250cm9sIFx1NURFNVx1NEY1Q1x1NTNGMFx1RkYwOFdvcmtzcGFjZUZyYW1lXHVGRjA5djJcdUZGMUFcdTU2RjRcdTdFRDVcIlx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVwiXHU3RUM0XHU3RUM3XHUzMDAyXG4gKlxuICogXHU1NkRCXHU0RTJBXHU5ODc1XHU3QjdFXHVGRjFBXG4gKiAxLiBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdUZGMDhcdTlFRDhcdThCQTRcdUZGMDlcdUZGMUFcdTRFRDNcdTVFOTNcdTY4MEZcdUZGMDhcdTU5MUFcdTRFRDNcdTVFOTNcdTUyMDdcdTYzNjJcdUZGMDkrIFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1RkYwOFx1NTQyQlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOStcbiAqICAgIFx1OEJFNlx1NjBDNVx1OTc2Mlx1Njc3Rlx1RkYwOEFJIFx1ODlFM1x1OEJGQlx1RkYxQVx1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OC9cdTVCOUVcdTczQjBcdTkwM0JcdThGOTEvXHU5OENFXHU5NjY5XHVGRjFCXHU0RTA5XHU3RUE3XHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0IFNWRyBcdTU2RkVcdUZGMUJcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdUZGMDlcdTMwMDJcbiAqIDIuIFx1OTg3OVx1NzZFRVx1NjAzQlx1ODlDOFx1RkYxQVx1OTg3OVx1NzZFRVx1Njg2M1x1Njg0OCArIFx1NUZFQlx1NjM3N1x1NjRDRFx1NEY1QyArIFx1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1RiArIFx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1MzAwMlxuICogMy4gXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHVGRjFBUnVuIFx1OEZEQlx1NUVBNlx1NEUwRVx1NjIxMFx1NjcyQ1x1MzAwMlxuICogNC4gXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHVGRjFBXHU2ODM4XHU2N0U1XHU3QjE0XHU4QkIwXHVGRjA4XHU1M0VGXHU1MTczXHU4MDU0XHU2M0QwXHU0RUE0XHVGRjA5KyBcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdUZGMDhcdTRFQkFcdTVERTVcdTc4NkVcdThCQTRcdUZGMDkrIFx1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNSArIFJldmlldy9cdTlBOENcdTY1MzZcdThCQjBcdTVGNTVcdTMwMDJcbiAqXG4gKiBcdTVFMDNcdTVDNDBcdTY3M0FcdTUyMzZcdTRFMERcdTUzRDhcdUZGMUFcdTkwNkVcdTg1M0RcdTVCOThcdTY1QjkgZGV0YWlscyBcdTY5RkQgKyBcdTZDRThcdTUxNjVcdTY4MzdcdTVGMEZcdTYzNjJcdTUyMTdcdUZGMDhcdTgwNEFcdTU5MjlcdTY3MDBcdTUzRjNcdUZGMDkrIFx1NTIwNlx1OTY5NFx1Njc2MVx1NjJENlx1NjJGRFx1OEJCMFx1NUZDNlx1RkYxQlxuICogXHU3RURGXHU4QkExXHU4ODRDXHU0RTI0XHU4ODRDXHU5NEIzXHU1MjM2XHU3NTMxXHU4RkQwXHU4ODRDXHU2NUY2XHU2MzA5XHU2Nzg0XHU1RUZBXHU1NEM4XHU1RTBDXHU3Q0JFXHU1MUM2XHU2Q0U4XHU1MTY1XHVGRjA4YXBwbHlTdGF0c0xpbmVDbGFtcFx1RkYwOVx1MzAwMlxuICpcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9Xb3Jrc3BhY2VGcmFtZVxuICovXG5cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5cbi8qKiBcdTVCQkZcdTRFM0IgL3N0YXRlIFx1OEZENFx1NTZERVx1NzY4NFx1NUZFQlx1NzE2N1x1NUY2Mlx1NzJCNlx1RkYwOFx1NEUwRSBhcGktcm91dGUudHMgYnVpbGRTdGF0ZSBcdTVCRjlcdTlGNTBcdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBpbnRlcmZhY2UgV29ya3NwYWNlU3RhdGUge1xuICByZWFkeT86IGJvb2xlYW5cbiAgcmVhc29uPzogc3RyaW5nXG4gIHBsdWdpblZlcnNpb24/OiBzdHJpbmdcbiAgcHJvamVjdD86IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyByb290UGF0aDogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxuICBjaGFuZ2VzPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBzb3VyY2U6IHN0cmluZzsgdXBkYXRlZEF0OiBudW1iZXIgfT5cbiAgcnVucz86IEFycmF5PHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IHN0YXJ0ZWRBdDogbnVtYmVyIHwgbnVsbDsgZmluaXNoZWRBdDogbnVtYmVyIHwgbnVsbDsgY29zdFVzZD86IG51bWJlcjsgc3RlcHNUb3RhbD86IG51bWJlcjsgc3RlcHNEb25lPzogbnVtYmVyOyBjdXJyZW50U3RlcD86IHN0cmluZyB8IG51bGwgfT5cbiAgYXR0ZW1wdHNDb3VudD86IG51bWJlclxuICBtZW1vcmllcz86IEFycmF5PHsgaWQ6IHN0cmluZzsgcHJvamVjdElkOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgdHJ1dGhMZXZlbDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb250ZW50Pzogc3RyaW5nOyBpc0h1bWFuQ29uZmlybWVkOiBib29sZWFuOyBnaXRCcmFuY2g6IHN0cmluZyB8IG51bGw7IGNyZWF0ZWRBdDogbnVtYmVyIH0+XG4gIGV2aWRlbmNlQ291bnQ/OiBudW1iZXJcbiAgcmVjZW50RXZpZGVuY2U/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHNvdXJjZTogc3RyaW5nOyB0cnV0aExldmVsOiBzdHJpbmc7IGxvY2F0b3I6IHN0cmluZzsgc25pcHBldDogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxuICByZXNvbHZlZElzc3VlUmV0ZW50aW9uRGF5cz86IG51bWJlclxuICBpbXBvcnRlZENoYW5nZXM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbW1pdENvdW50OiBudW1iZXI7IGZpcnN0Q29tbWl0QXQ6IG51bWJlcjsgbGFzdENvbW1pdEF0OiBudW1iZXI7IGNvbmZpZGVuY2U6IG51bWJlcjsgc3RhdHVzOiBzdHJpbmcgfT5cbiAgaXNzdWVzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBjaGFuZ2VJZDogc3RyaW5nOyBzZXZlcml0eTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZyB9PlxuICB2ZXJpZmljYXRpb25zPzogQXJyYXk8eyBpZDogc3RyaW5nOyBjaGFuZ2VJZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IGNyZWF0ZWRBdDogbnVtYmVyIH0+XG4gIGJvb3RzdHJhcD86IHsgaWQ6IHN0cmluZzsgc3VtbWFyeTogc3RyaW5nOyB0ZWNoU3RhY2s6IHN0cmluZ1tdOyBtYW5pZmVzdEZpbGVzOiBzdHJpbmdbXTsgc3ltYm9sc0NvdW50OiBudW1iZXI7IGNyZWF0ZWRBdDogbnVtYmVyIH0gfCBudWxsXG4gIGNvbmZpcm1lZD86IEFycmF5PHsgaWQ6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmc7IGZvcmJpZGRlblBhdGhzOiBzdHJpbmdbXSB9PlxuICBjb25jZXB0cz86IEFycmF5PHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nOyBvY2N1cnJlbmNlczogbnVtYmVyIH0+XG59XG5cbi8qKiBHRVQgL2NvbW1pdHMgXHU3Njg0XHU2M0QwXHU0RUE0XHU2NzYxXHU3NkVFXHUzMDAyICovXG5pbnRlcmZhY2UgQ29tbWl0RW50cnkge1xuICBzaGE6IHN0cmluZ1xuICBzaG9ydEhhc2g6IHN0cmluZ1xuICBhdXRob3I6IHN0cmluZ1xuICBkYXRlOiBudW1iZXJcbiAgc3ViamVjdDogc3RyaW5nXG4gIGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgYWRkczogbnVtYmVyOyBkZWxzOiBudW1iZXIgfT5cbn1cblxuaW50ZXJmYWNlIENvbW1pdHNQYXlsb2FkIHtcbiAgcm9vdFBhdGg6IHN0cmluZ1xuICBicmFuY2g6IHN0cmluZyB8IG51bGxcbiAgaGVhZFNoYTogc3RyaW5nIHwgbnVsbFxuICB3b3JraW5nOiB7IGZpbGVDb3VudDogbnVtYmVyOyBpc0NsZWFuOiBib29sZWFuOyBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nIH0+IH1cbiAgY29tbWl0czogQ29tbWl0RW50cnlbXVxufVxuXG5pbnRlcmZhY2UgQ29tbWl0RGV0YWlsUGF5bG9hZCB7XG4gIHNoYTogc3RyaW5nXG4gIGlzV29ya2luZzogYm9vbGVhblxuICBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IGFkZHM6IG51bWJlcjsgZGVsczogbnVtYmVyIH0+XG4gIGluc2VydGlvbnM6IG51bWJlclxuICBkZWxldGlvbnM6IG51bWJlclxuICBwYXRjaFRydW5jYXRlZDogYm9vbGVhblxuICBwYXRjaDogc3RyaW5nXG4gIGNvbW1pdDogeyBtZXNzYWdlOiBzdHJpbmc7IGF1dGhvcjogc3RyaW5nOyBkYXRlOiBudW1iZXIgfSB8IG51bGxcbiAgYW5hbHlzaXM6IHsgd2hhdDogc3RyaW5nOyBsb2dpYzogc3RyaW5nW107IHJpc2tzOiBzdHJpbmdbXSB9XG4gIGFuYWx5c2lzQ2FjaGVkPzogYm9vbGVhblxuICBhbmFseXNpc0dlbmVyYXRlZEF0PzogbnVtYmVyIHwgbnVsbFxufVxuXG5pbnRlcmZhY2UgSW1wYWN0U2NvcGVQYXlsb2FkIHtcbiAgY2hhbmdlZEZpbGVzOiBzdHJpbmdbXVxuICBzaGFzPzogc3RyaW5nW11cbiAgcmlza0xldmVsOiAnbG93JyB8ICdtZWRpdW0nIHwgJ2hpZ2gnIHwgJ2NyaXRpY2FsJ1xuICByaXNrU2NvcmU6IG51bWJlclxuICByaXNrRmFjdG9ycz86IEFycmF5PHsgdGV4dDogc3RyaW5nOyBwb2ludHM6IG51bWJlciB9PlxuICBrZXlDaGFuZ2VQb2ludHM/OiBzdHJpbmdbXVxuICBtZW1vcmllcz86IEFycmF5PHsgdGl0bGU6IHN0cmluZzsgdHlwZTogc3RyaW5nIH0+XG4gIGZ1bmN0aW9uSW1wYWN0PzogQXJyYXk8e1xuICAgIHN5bWJvbDogc3RyaW5nXG4gICAgZGVmaW5lZEluOiBzdHJpbmdcbiAgICByb2xlPzogc3RyaW5nXG4gICAgY2hhbmdlPzogc3RyaW5nXG4gICAgaW1wYWN0Pzogc3RyaW5nXG4gICAgY2FsbGVyczogQXJyYXk8eyBmaWxlOiBzdHJpbmc7IGxpbmU6IHN0cmluZzsgc25pcHBldDogc3RyaW5nIH0+XG4gIH0+XG4gIGxldmVsczogQXJyYXk8eyBsZXZlbDogc3RyaW5nOyBkZXB0aDogbnVtYmVyOyBwYXRoOiBzdHJpbmc7IGNvbmZpZGVuY2U6IG51bWJlcjsgcmVhc29uOiBzdHJpbmcgfT5cbiAgZGlyZWN0OiBzdHJpbmdbXVxuICBleHBsYW5hdGlvbnNDYWNoZWQ/OiBib29sZWFuXG4gIGdlbmVyYXRlZEF0PzogbnVtYmVyIHwgbnVsbFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJldmlld1BheWxvYWQge1xuICBpc3N1ZXNGb3VuZDogbnVtYmVyXG4gIGlzc3Vlczogc3RyaW5nXG4gIHZlcmRpY3Q6IHN0cmluZ1xuICBjYWNoZWQ/OiBib29sZWFuXG4gIGdlbmVyYXRlZEF0PzogbnVtYmVyIHwgbnVsbFxuICBpc3N1ZUxpc3Q/OiBBcnJheTx7IHNldmVyaXR5OiBzdHJpbmc7IGNhdGVnb3J5OiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGV2aWRlbmNlOiBzdHJpbmc7IGZpeDogc3RyaW5nIH0+XG59XG5cbmludGVyZmFjZSBOb3RlRW50cnkge1xuICBpZDogc3RyaW5nXG4gIHByb2plY3RJZDogc3RyaW5nXG4gIHNoYT86IHN0cmluZ1xuICB0aXRsZTogc3RyaW5nXG4gIGNvbnRlbnQ6IHN0cmluZ1xuICB0YWdzPzogc3RyaW5nW11cbiAgcGlubmVkPzogYm9vbGVhblxuICBjcmVhdGVkQXQ6IG51bWJlclxuICB1cGRhdGVkQXQ/OiBudW1iZXJcbn1cblxuLyoqIEdFVCAvaXNzdWVzIFx1NzY4NFx1OEJDNFx1NUJBMVx1OTVFRVx1OTg5OFx1Njc2MVx1NzZFRVx1RkYwOFJldmlldyBcdTk1RUVcdTk4OThcdTk4NzVcdTdCN0VcdTY1NzBcdTYzNkVcdTZFOTBcdUZGMDlcdTMwMDIgKi9cbmludGVyZmFjZSBJc3N1ZUVudHJ5IHtcbiAgaWQ6IHN0cmluZ1xuICBjaGFuZ2VJZDogc3RyaW5nXG4gIHNldmVyaXR5OiBzdHJpbmdcbiAgY2F0ZWdvcnk6IHN0cmluZ1xuICB0aXRsZTogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgc3RhdHVzOiBzdHJpbmdcbiAgcmVzb2x1dGlvbjogc3RyaW5nXG4gIGZpeFN0YXRzOiB7IGZpbGVzOiBudW1iZXI7IGluc2VydGlvbnM6IG51bWJlcjsgZGVsZXRpb25zOiBudW1iZXIgfSB8IG51bGxcbiAgZml4RmlsZXM6IHN0cmluZ1tdXG4gIGZpeEltcGFjdDogQXJyYXk8eyBzeW1ib2w6IHN0cmluZzsgZGVmaW5lZEluOiBzdHJpbmc7IGNhbGxlcnM6IEFycmF5PHsgZmlsZTogc3RyaW5nOyBsaW5lOiBzdHJpbmc7IHNuaXBwZXQ6IHN0cmluZyB9PiB9PlxuICBmaXhEaWZmOiBzdHJpbmdcbiAgY3JlYXRlZEF0OiBudW1iZXJcbiAgdXBkYXRlZEF0OiBudW1iZXJcbn1cblxuLyoqIFx1NEZFRVx1NTkwRFx1NURFRVx1NUYwMlx1NzY4NFx1ODg0Q1x1N0VBN1x1Nzc0MFx1ODI3Mlx1NkUzMlx1NjdEM1x1RkYxQSsgXHU3RUZGXHUzMDAxLSBcdTdFQTJcdTMwMDFcdTY1ODdcdTRFRjZcdTU5MzRcdTUyQTBcdTdDOTdcdTMwMDFcdTUxNzZcdTRGNTlcdTVGMzFcdTUzMTZcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlbmRlckRpZmZMaW5lcyhkaWZmOiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XG4gIGlmICh0eXBlb2YgZGlmZiAhPT0gJ3N0cmluZycgfHwgZGlmZiA9PT0gJycpIHJldHVybiBbXVxuICByZXR1cm4gZGlmZi5zcGxpdCgnXFxuJykuc2xpY2UoMCwgNDAwKS5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgY29uc3Qgc3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XG4gICAgICBmb250RmFtaWx5OiAndmFyKC0tZHN3LWFsaWFzLWZvbnQtbW9ubywgdWktbW9ub3NwYWNlLCBtb25vc3BhY2UpJyxcbiAgICAgIGZvbnRTaXplOiAnMTFweCcsIGxpbmVIZWlnaHQ6IDEuNiwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyxcbiAgICB9XG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnKysrJykgfHwgbGluZS5zdGFydHNXaXRoKCctLS0nKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJ2RpZmYgLS1naXQnKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJ0BAJykpIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJ1xuICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKCcrJykpIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gJyMxYTdmMzcnXG4gICAgICBzdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoNDYsMTYwLDY3LDAuMDgpJ1xuICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKCctJykpIHtcbiAgICAgIHN0eWxlLmNvbG9yID0gJyNkMTI0MmYnXG4gICAgICBzdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoMjA5LDM2LDQ3LDAuMDgpJ1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5jb2xvciA9ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKSdcbiAgICB9XG4gICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3N0eWxlfT57bGluZSA9PT0gJycgPyAnXFx1MDBBMCcgOiBsaW5lfTwvZGl2PlxuICB9KVxufVxuXG4vKiogXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0XHU5ODc1XHU3Njg0XHU1M0VGXHU3RjE2XHU4RjkxXHU2QjY1XHU5QUE0XHVGRjA4L3J1bnMvc3RhcnQgXHU4RkQ0XHU1NkRFXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgUGxhbkNvbmZpcm1TdGVwIHtcbiAgaWQ6IHN0cmluZ1xuICB0aXRsZTogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgdGFyZ2V0RmlsZXM6IHN0cmluZ1tdXG4gIHJvbGU6IHN0cmluZ1xuICBhY2NlcHRhbmNlOiBzdHJpbmdcbiAgZmFpbHVyZVBvbGljeTogc3RyaW5nXG4gIGVuYWJsZWQ6IGJvb2xlYW5cbiAgbW9kZWxQcm92aWRlcjogc3RyaW5nXG4gIG1vZGVsSWQ6IHN0cmluZ1xufVxuXG4vKiogR0VUIC9ydW5zL2RldGFpbCBcdTc2ODRcdThGN0RcdTgzNzdcdTMwMDIgKi9cbmludGVyZmFjZSBSdW5EZXRhaWwge1xuICBydW46IHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgY2hhbmdlVGl0bGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IHBhdXNlUG9pbnQ6IHsgc3RlcElkOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nOyBhdDogbnVtYmVyIH0gfCBudWxsOyBlcnJvcjogeyBtZXNzYWdlOiBzdHJpbmcgfSB8IG51bGw7IHN0YXJ0ZWRBdDogbnVtYmVyIHwgbnVsbDsgZmluaXNoZWRBdDogbnVtYmVyIHwgbnVsbCB9XG4gIHN0ZXBzOiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHJvbGU6IHN0cmluZzsgbW9kZWw6IHN0cmluZyB8IG51bGw7IHN0YXR1czogc3RyaW5nOyBhdHRlbXB0c0NvdW50OiBudW1iZXI7IGNsYWltZWRPdXRjb21lOiBzdHJpbmcgfCBudWxsOyB2ZXJpZmllZDogYm9vbGVhbjsgY29zdFVzZDogbnVtYmVyIH0+XG4gIGNvbnRleHQ6IHtcbiAgICBwcm9qZWN0RGlnZXN0OiBzdHJpbmc7IGJyYW5jaDogc3RyaW5nIHwgbnVsbDsgaGVhZFNoYTogc3RyaW5nIHwgbnVsbFxuICAgIGluamVjdGVkTWVtb3JpZXM6IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZyB9PlxuICAgIHN0ZXBTdW1tYXJpZXM6IEFycmF5PHsgc3RlcFRpdGxlOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgY2hhbmdlZEZpbGVzOiBzdHJpbmdbXTsgYXQ6IG51bWJlciB9PlxuICAgIGRlY2lzaW9uTG9nOiBBcnJheTx7IGtpbmQ6IHN0cmluZzsgZGV0YWlsOiBzdHJpbmc7IGF0OiBudW1iZXIgfT5cbiAgfSB8IG51bGxcbn1cblxuLyoqIEdFVCAvc2NoZWR1bGVkIFx1NzY4NFx1NEVGQlx1NTJBMVx1Njc2MVx1NzZFRVx1MzAwMiAqL1xuaW50ZXJmYWNlIFNjaGVkdWxlZFRhc2tFbnRyeSB7XG4gIGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nXG4gIGludGVydmFsTWludXRlczogbnVtYmVyOyBlbmFibGVkOiBib29sZWFuOyBsYXN0UnVuQXQ6IG51bWJlciB8IG51bGw7IGxhc3RSZXN1bHQ6IHN0cmluZzsgbmV4dER1ZUF0OiBudW1iZXJcbn1cblxuLyoqIEdFVCAvbWVtb3JpZXMgXHU3Njg0XHU4QkIwXHU1RkM2XHU2NzYxXHU3NkVFXHVGRjA4XHU4QkIwXHU1RkM2XHU5NzYyXHU2NzdGXHU2NTcwXHU2MzZFXHU2RTkwXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgTWVtb3J5RW50cnkge1xuICBpZDogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZzsgcmVsYXRlZEZpbGVzOiBzdHJpbmdbXVxuICBpc0h1bWFuQ29uZmlybWVkOiBib29sZWFuOyBnaXRCcmFuY2g6IHN0cmluZyB8IG51bGw7IHNjb3BlOiBzdHJpbmc7IHNvdXJjZVRhZzogc3RyaW5nXG4gIGJhc2lzU2hhOiBzdHJpbmcgfCBudWxsOyBzdGF0dXM6IHN0cmluZzsgbGFzdFZlcmlmaWVkU2hhOiBzdHJpbmcgfCBudWxsXG4gIGNyZWF0ZWRBdDogbnVtYmVyOyB1cGRhdGVkQXQ6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgTWVtb3JpZXNQYXlsb2FkIHtcbiAgbWVtb3JpZXM6IE1lbW9yeUVudHJ5W11cbiAgYnJhbmNoOiBzdHJpbmcgfCBudWxsXG4gIGhlYWRTaGE6IHN0cmluZyB8IG51bGxcbiAgYmFzZWxpbmU6IHsgc2hhOiBzdHJpbmcgfCBudWxsOyB1cGRhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxuICBiZWhpbmRDb3VudDogbnVtYmVyXG59XG5cbi8qKiBQT1NUIC9tZW1vcnkvc3luYyBcdTc2ODRcdTU0MENcdTZCNjVcdTYyQTVcdTU0NEFcdTMwMDIgKi9cbmludGVyZmFjZSBTeW5jUmVwb3J0IHtcbiAgb2s6IGJvb2xlYW5cbiAgZXJyb3I/OiBzdHJpbmdcbiAgYmVoaW5kQ291bnQ/OiBudW1iZXJcbiAgc3RhbGVQcm9wb3NhbHM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0+XG4gIHJlbmV3ZWQ/OiBudW1iZXJcbiAgbmV3Q2FuZGlkYXRlcz86IEFycmF5PHsgdHlwZTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmcgfT5cbiAgdmVyZGljdD86IHN0cmluZ1xufVxuXG4vKiogXHU4QkM0XHU1QkExXHU5NUVFXHU5ODk4XHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IElTU1VFX1NUQVRVU19MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIG9wZW46ICdcdTVGODVcdTU5MDRcdTc0MDYnLFxuICBmaXhpbmc6ICdcdTRGRUVcdTU5MERcdTRFMkQnLFxuICByZXNvbHZlZDogJ1x1NURGMlx1ODlFM1x1NTFCMycsXG4gIGFjY2VwdGVkOiAnXHU1REYyXHU2M0E1XHU1M0Q3JyxcbiAgcmVqZWN0ZWQ6ICdcdTVERjJcdTYyRDJcdTdFREQnLFxufVxuXG4vKiogXHU4QkIwXHU1RkM2XHU3QzdCXHU1NzhCIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IE1FTU9SWV9UWVBFX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgYXJjaGl0ZWN0dXJlX2RlY2lzaW9uOiAnXHU2N0I2XHU2Nzg0XHU1MUIzXHU3QjU2JywgcGF0dGVybl9ydWxlOiAnXHU2QTIxXHU1RjBGXHU4OUM0XHU1MjE5Jywgcmlza19ob3RzcG90OiAnXHU5OENFXHU5NjY5XHU3MEVEXHU3MEI5JyxcbiAgbGVhcm5lZF9jb25jZXB0OiAnXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1JywgdXNlcl9wcm9maWxlOiAnXHU3NTI4XHU2MjM3XHU1MDRGXHU1OTdEJywgcHJvamVjdF9sb2c6ICdcdTk4NzlcdTc2RUVcdTY1RTVcdTVGRDcnLCBkYWlseV9sb2c6ICdcdTY1RTVcdTVGRDcnLFxufVxuXG4vKiogXHU4QkIwXHU1RkM2XHU2NzY1XHU2RTkwIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IE1FTU9SWV9TT1VSQ0VfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBydW46ICdcdTYyNjdcdTg4NENcdTYzRDBcdTcwQkMnLCByZXZpZXc6ICdcdTY4MzhcdTY3RTVcdTZDODlcdTZEQzAnLCBzeW5jOiAnXHU2MkM5XHU1M0Q2XHU1NDBDXHU2QjY1JywgY2hhdDogJ0FJIFx1OEJCMFx1NUY1NScsIG1hbnVhbDogJ1x1NjI0Qlx1NTJBOCcsXG59XG5cbi8qKiBcdTdGMTZcdTYzOTJcdTg5RDJcdTgyNzIgXHUyMTkyIFx1NEUyRFx1NjU4N1x1NjgwN1x1N0I3RVx1MzAwMiAqL1xuY29uc3QgUk9MRV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIGFuYWx5c2lzOiAnXHU1MjA2XHU2NzkwJywgcGxhbm5pbmc6ICdcdTg5QzRcdTUyMTInLCBjb2Rpbmc6ICdcdTVGMDBcdTUzRDEnLCBvcHM6ICdcdTdCODBcdTUzNTVcdTY0Q0RcdTRGNUMnLCB2ZXJpZmljYXRpb246ICdcdTlBOENcdTY1MzYnLFxufVxuXG4vKiogXHU2QjY1XHU5QUE0XHU1OTMxXHU4RDI1XHU3QjU2XHU3NTY1IFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFBPTElDWV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICdyZXRyeS1lc2NhbGF0ZSc6ICdcdTkxQ0RcdThCRDVcdTVFNzZcdTUzNDdcdTdFQTdcdTZBMjFcdTU3OEInLCAncmV0cnktZmFsbGJhY2snOiAnXHU5MUNEXHU4QkQ1Jywgc2tpcDogJ1x1NTkzMVx1OEQyNVx1NTIxOVx1OERGM1x1OEZDNycsIGFzazogJ1x1NTkzMVx1OEQyNVx1NTIxOVx1NjY4Mlx1NTA1Q1x1OTVFRVx1NEVCQScsXG59XG5cbi8qKiBSdW4gXHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFJVTl9TVEFUVVNfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBxdWV1ZWQ6ICdcdTYzOTJcdTk2MUZcdTRFMkQnLCBydW5uaW5nOiAnXHU4RkQwXHU4ODRDXHU0RTJEJywgcGF1c2VkOiAnXHU1REYyXHU2NjgyXHU1MDVDJywgYmxvY2tlZDogJ1x1OTYzQlx1NTg1RScsIHJldHJ5aW5nOiAnXHU5MUNEXHU4QkQ1XHU0RTJEJyxcbiAgdmVyaWZ5aW5nOiAnXHU2NTM2XHU1QzNFXHU5QThDXHU2NTM2XHU0RTJEJywgc3VjY2VlZGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgY29tcGxldGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgZmFpbGVkOiAnXHU1OTMxXHU4RDI1JywgY2FuY2VsbGVkOiAnXHU1REYyXHU1M0Q2XHU2RDg4JywgaW50ZXJydXB0ZWQ6ICdcdTVERjJcdTRFMkRcdTY1QUQnLFxufVxuXG4vKiogXHU2QjY1XHU5QUE0XHU3MkI2XHU2MDAxIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFNURVBfU1RBVFVTX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgcGVuZGluZzogJ1x1NUY4NVx1NjI2N1x1ODg0QycsIHJlYWR5OiAnXHU1QzMxXHU3RUVBJywgcnVubmluZzogJ1x1NjI2N1x1ODg0Q1x1NEUyRCcsIHBhdXNlZDogJ1x1NjY4Mlx1NTA1QycsIHJldHJ5aW5nOiAnXHU5MUNEXHU4QkQ1XHU0RTJEJyxcbiAgc3VjY2VlZGVkOiAnXHU1REYyXHU2MjEwXHU1MjlGJywgZmFpbGVkOiAnXHU1OTMxXHU4RDI1Jywgc2tpcHBlZDogJ1x1NURGMlx1OERGM1x1OEZDNycsIGJsb2NrZWQ6ICdcdTk2M0JcdTU4NUUnLCBjYW5jZWxsZWQ6ICdcdTVERjJcdTUzRDZcdTZEODgnLCBpbnRlcnJ1cHRlZDogJ1x1NURGMlx1NEUyRFx1NjVBRCcsXG59XG5cbi8qKiBcdThCQzRcdTVCQTFcdTk1RUVcdTk4OThcdTRFMjVcdTkxQ0RcdTVFQTYgXHUyMTkyIFx1NUZCRFx1N0FFMFx1NUU5NVx1ODI3Mlx1MzAwMiAqL1xuZnVuY3Rpb24gc2V2ZXJpdHlDb2xvcihzZXZlcml0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IHNldmVyaXR5ID09PSAnYmxvY2tlcicpIHJldHVybiAnI2NlOTE3OCdcbiAgaWYgKHNldmVyaXR5ID09PSAnbWFqb3InKSByZXR1cm4gJyNkN2JhN2QnXG4gIGlmIChzZXZlcml0eSA9PT0gJ2luZm8nKSByZXR1cm4gJyM2YjhiOGInXG4gIHJldHVybiAnIzU2OWNkNidcbn1cblxuLyoqIFx1NEUyNVx1OTFDRFx1NUVBNlx1NUY1Mlx1NEUwMFx1RkYwOFx1NTE3Q1x1NUJCOVx1NTM4Nlx1NTNGMlx1OEJCMFx1NUY1NVx1OTFDQ1x1NzY4NCBoaWdoL21lZGl1bS9sb3dcdUZGMUJcdTY3MkFcdTc3RTVcdTU2REVcdTg0M0QgbWlub3JcdUZGMDlcdUZGMENcdTdFREZcdThCQTEvXHU3QjVCXHU5MDA5L1x1Nzc0MFx1ODI3Mlx1NTE3MVx1NzUyOFx1MzAwMiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplSXNzdWVTZXZlcml0eShzZXZlcml0eTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHNldmVyaXR5ID09PSAnaGlnaCcpIHJldHVybiAnbWFqb3InXG4gIGlmIChzZXZlcml0eSA9PT0gJ21lZGl1bScgfHwgc2V2ZXJpdHkgPT09ICdsb3cnKSByZXR1cm4gJ21pbm9yJ1xuICByZXR1cm4gc2V2ZXJpdHkgPT09ICdibG9ja2VyJyB8fCBzZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBzZXZlcml0eSA9PT0gJ21ham9yJyB8fCBzZXZlcml0eSA9PT0gJ21pbm9yJyB8fCBzZXZlcml0eSA9PT0gJ2luZm8nXG4gICAgPyBzZXZlcml0eSA6ICdtaW5vcidcbn1cblxuLyoqIFx1ODlFM1x1Njc5MCAjcnJnZ2JiIFx1NjIxNiByZ2IoKS9yZ2JhKCkgXHU5ODlDXHU4MjcyXHU1MjREXHU0RTA5XHU0RTJBXHU1MjA2XHU5MUNGXHU0RTNBIFtyLCBnLCBiXVx1RkYxQlx1NjVFMFx1NkNENVx1ODlFM1x1Njc5MFx1OEZENFx1NTZERSBudWxsXHUzMDAyICovXG5mdW5jdGlvbiBwYXJzZUNvbG9yKGNvbG9yOiBzdHJpbmcpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gfCBudWxsIHtcbiAgY29uc3QgaGV4ID0gL14jKFswLTlhLWZdezZ9KSQvaS5leGVjKGNvbG9yKVxuICBpZiAoaGV4ICE9PSBudWxsKSB7XG4gICAgY29uc3QgdmFsdWUgPSBOdW1iZXIucGFyc2VJbnQoaGV4WzFdISwgMTYpXG4gICAgcmV0dXJuIFsodmFsdWUgPj4gMTYpICYgMjU1LCAodmFsdWUgPj4gOCkgJiAyNTUsIHZhbHVlICYgMjU1XVxuICB9XG4gIGNvbnN0IGZ1bmN0aW9uYWwgPSAvXnJnYmE/XFwoXFxzKihcXGR7MSwzfSlbLFxcc10rKFxcZHsxLDN9KVssXFxzXSsoXFxkezEsM30pL2kuZXhlYyhjb2xvcilcbiAgaWYgKGZ1bmN0aW9uYWwgIT09IG51bGwpIHtcbiAgICByZXR1cm4gW051bWJlcihmdW5jdGlvbmFsWzFdKSwgTnVtYmVyKGZ1bmN0aW9uYWxbMl0pLCBOdW1iZXIoZnVuY3Rpb25hbFszXSldXG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuLyoqIFdDQUcgXHU3NkY4XHU1QkY5XHU0RUFFXHU1RUE2XHVGRjA4MD1cdTlFRDFcdUZGMEMxPVx1NzY3RFx1RkYwOVx1MzAwMiAqL1xuZnVuY3Rpb24gcmVsYXRpdmVMdW1pbmFuY2UocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IGNoYW5uZWwgPSAodmFsdWU6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdiA9IHZhbHVlIC8gMjU1XG4gICAgcmV0dXJuIHYgPD0gMC4wMzkyOCA/IHYgLyAxMi45MiA6ICgodiArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjRcbiAgfVxuICByZXR1cm4gMC4yMTI2ICogY2hhbm5lbChyKSArIDAuNzE1MiAqIGNoYW5uZWwoZykgKyAwLjA3MjIgKiBjaGFubmVsKGIpXG59XG5cbi8qKiBcdTZERjFcdTUzMTZcdTk4OUNcdTgyNzJcdTc2RjRcdTUyMzBcdTc2N0RcdTVFOTVcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgIzFmMjMyOCBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZnVuY3Rpb24gZGFya2VuRm9yV2hpdGVCYWNrZ3JvdW5kKHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIpOiBzdHJpbmcge1xuICBsZXQgcmVkID0gclxuICBsZXQgZ3JlZW4gPSBnXG4gIGxldCBibHVlID0gYlxuICBmb3IgKGxldCBzdGVwID0gMDsgc3RlcCA8IDEyICYmIHJlbGF0aXZlTHVtaW5hbmNlKHJlZCwgZ3JlZW4sIGJsdWUpID4gMC4xODM7IHN0ZXAgKz0gMSkge1xuICAgIHJlZCA9IE1hdGgucm91bmQocmVkICogMC44ICsgMHgxZiAqIDAuMilcbiAgICBncmVlbiA9IE1hdGgucm91bmQoZ3JlZW4gKiAwLjggKyAweDIzICogMC4yKVxuICAgIGJsdWUgPSBNYXRoLnJvdW5kKGJsdWUgKiAwLjggKyAweDI4ICogMC4yKVxuICB9XG4gIHJldHVybiBgcmdiKCR7cmVkfSwgJHtncmVlbn0sICR7Ymx1ZX0pYFxufVxuXG4vKipcbiAqIFx1NEUzQlx1OTg5OFx1ODFFQVx1OTAwMlx1NUU5NFx1NjU4N1x1NUI1N1x1ODI3Mlx1RkYxQVx1NkRGMVx1ODI3Mlx1NEUzQlx1OTg5OFx1NTM5Rlx1NjgzN1x1OEZENFx1NTZERVx1RkYwOFx1NEVBRVx1ODI3Mlx1NTNFRlx1OEJGQlx1RkYwOVx1RkYwQ1x1NkQ0NVx1ODI3Mlx1NEUzQlx1OTg5OFx1NkRGMVx1NTMxNlx1NTIzMFx1NzY3RFx1NUU5NSBcdTIyNjU0LjU6MVx1MzAwMlxuICogXHU1RkJEXHU3QUUwXHUzMDAxXHU5OENFXHU5NjY5XHU2NTcwXHU1QjU3XHUzMDAxXHU3QjI2XHU1M0Y3XHU5QUQ4XHU0RUFFXHU3QjQ5XHU2MjQwXHU2NzA5XHU1RjNBXHU4QzAzXHU4MjcyXHU2NTg3XHU2NzJDXHU3RURGXHU0RTAwXHU4RDcwXHU4RkQ5XHU5MUNDXHVGRjBDXHU2NzVDXHU3RUREXHU2REUxXHU1QjU3XHU1MzhCXHU3NjdEXHU1RTk1XHUzMDAyXG4gKi9cbmZ1bmN0aW9uIHRoZW1lQXdhcmVUZXh0KGNvbG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCByZ2IgPSBwYXJzZUNvbG9yKGNvbG9yKVxuICBpZiAocmdiID09PSBudWxsKSByZXR1cm4gY29sb3JcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuYm9keT8uaGFzQXR0cmlidXRlPy4oJ2RhdGEtZHMtZGFyay10aGVtZScpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGByZ2IoJHtyZ2JbMF19LCAke3JnYlsxXX0sICR7cmdiWzJdfSlgXG4gIH1cbiAgcmV0dXJuIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyZ2JbMF0sIHJnYlsxXSwgcmdiWzJdKVxufVxuXG4vKiogXHU4QkM0XHU1QkExXHU3NkVFXHU2ODA3XHVGRjA4Y2hhbmdlSWRcdUZGMDlcdTIxOTIgXHU1M0VGXHU4QkZCXHU2ODA3XHU3QjdFXHVGRjFBXHU1NDA4XHU2MjEwIHJldmlldzo8c2hhPiBcdTYzMDdcdTU0MTFcdTYzRDBcdTRFQTRcdUZGMENjaGdfKiBcdTYzMDdcdTU0MTFcdTUzRDhcdTY2RjRcdUZGMENhZGhvYyBcdTRFM0FcdTVERTVcdTRGNUNcdTUzM0FcdTMwMDIgKi9cbmZ1bmN0aW9uIGlzc3VlVGFyZ2V0TGFiZWwoY2hhbmdlSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGlkID0gdHlwZW9mIGNoYW5nZUlkID09PSAnc3RyaW5nJyA/IGNoYW5nZUlkIDogJydcbiAgaWYgKGlkLnN0YXJ0c1dpdGgoJ3JldmlldzonKSkgcmV0dXJuIGBcdTYzRDBcdTRFQTQgJHtpZC5zbGljZSg3LCAxNSl9YFxuICBpZiAoaWQgPT09ICdhZGhvYycpIHJldHVybiAnXHU1REU1XHU0RjVDXHU1MzNBJ1xuICByZXR1cm4gYFx1NTNEOFx1NjZGNCAke2lkLnNsaWNlKDAsIDExKX1gXG59XG5cbi8qKiBcdTYwM0JcdTdFRDMvXHU3RUQzXHU2Nzg0XHU1MzE2XHU3QjE0XHU4QkIwXHU3Njg0XHU4RjdCXHU5MUNGIE1hcmtkb3duIFx1NkUzMlx1NjdEM1x1RkYxQVx1MzAwQyMjIFx1MzAwRFx1ODI4Mlx1NjgwN1x1OTg5OFx1Nzc0MFx1ODI3Mlx1NTJBMFx1N0M5N1x1RkYwQ1x1MzAwQy0gXHUzMDBEXHU1MjE3XHU4ODY4XHU1MkEwXHU1NzA2XHU3MEI5XHVGRjBDXHU1MTc2XHU0RjU5XHU1MzlGXHU2ODM3XHUzMDAyICovXG5mdW5jdGlvbiByZW5kZXJTdHJ1Y3R1cmVkQ29udGVudChjb250ZW50OiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XG4gIGlmICh0eXBlb2YgY29udGVudCAhPT0gJ3N0cmluZycgfHwgY29udGVudCA9PT0gJycpIHJldHVybiBbXVxuICByZXR1cm4gY29udGVudC5zcGxpdCgnXFxuJykubWFwKChsaW5lLCBpbmRleCkgPT4ge1xuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJyMjICcpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGtleT17aW5kZXh9IHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCwgZm9udFNpemU6ICcxMi41cHgnLCBtYXJnaW5Ub3A6IGluZGV4ID09PSAwID8gMCA6IDEwLCBtYXJnaW5Cb3R0b206IDIsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT5cbiAgICAgICAgICB7bGluZS5zbGljZSgzKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJy0gJykpIHtcbiAgICAgIHJldHVybiA8ZGl2IGtleT17aW5kZXh9IHN0eWxlPXt7IHBhZGRpbmdMZWZ0OiAxNCwgdGV4dEluZGVudDogLTEwIH19Plx1MjAyMiB7bGluZS5zbGljZSgyKX08L2Rpdj5cbiAgICB9XG4gICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0+e2xpbmUgPT09ICcnID8gJ1xcdTAwQTAnIDogbGluZX08L2Rpdj5cbiAgfSlcbn1cblxuLyoqXG4gKiBcdTg5QzZcdTg5QzlcdTYzNjJcdTUyMTdcdTY4MzdcdTVGMEZcdTg4NjhcdUZGMUFcdTk2OEZcdTY3MkNcdTdFQzRcdTRFRjZcdTYzMDJcdThGN0QvXHU1Mzc4XHU4RjdEXHVGRjA4XHU1Mzc4XHU4RjdEXHU1MzczXHU1QjhDXHU1MTY4XHU2MDYyXHU1OTBEXHU1MzlGXHU3NTFGXHU1RTAzXHU1QzQwXHVGRjA5XHUzMDAyXG4gKiBcdTZDRThcdTYxMEZcdUZGMUFcdTc5ODFcdTZCNjJcdTc1MjggOmhhcygpIFx1NTA1QVx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1MjAxNFx1MjAxNFx1NUI5OFx1NjVCOVx1Njc4NFx1NUVGQVx1NEVBN1x1NzI2OVx1NTFFMFx1NTM0MVx1NEUyQVx1N0VDNFx1NEVGNlx1NjgzOVx1N0M3Qlx1OTBGRFx1NTNFQiByb290XHVGRjBDXG4gKiBcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdTRGMUFcdTYyOEFcdTY1NzRcdTRFMkFcdTgwNEFcdTU5MjlcdTVCQjlcdTU2NjhcdThCRUZcdTk0QjNcdTUyMzZcdUZGMDhcdTUzODZcdTUzRjJcdTRFOEJcdTY1NDVcdUZGMDlcdTMwMDJcdTZCNjRcdTg4NjhcdTUzRUFcdTRGRERcdTc1NTlcdTdGNTFcdTY4M0NcdTYzNjJcdTUyMTdcdTRFMEVcdTYyRDZcdTYyRkRcdTY3QzRcdTk2OTBcdTg1Q0ZcdTMwMDJcbiAqL1xuY29uc3QgTEFZT1VUX1NUWUxFID0gYFxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA+IGRpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0geyBvcmRlcjogMzsgfVxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA+IGRpdltjbGFzcyo9XCJkZXRhaWxzQ29sXCJdIHsgb3JkZXI6IDI7IH1cbmRpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl1bZGF0YS1kZXRhaWxzLWNvbGxhcHNlZF0gPiBkaXZbY2xhc3MqPVwiY2VudGVyQ29sXCJdLFxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXVtkYXRhLWRldGFpbHMtY29sbGFwc2VkXSA+IGRpdltjbGFzcyo9XCJkZXRhaWxzQ29sXCJdIHsgb3JkZXI6IDA7IH1cbmRpdltjbGFzcyo9XCJoYW5kbGVcIl1bZGF0YS1zaWRlPVwiZGV0YWlsc1wiXSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXTpub3QoW2RhdGEtZGV0YWlscy1jb2xsYXBzZWRdKSB7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBtaW5tYXgoMCwgMWZyKSB2YXIoLS1wYy1jaGF0LXcsIDM2MHB4KSAhaW1wb3J0YW50O1xufVxuYFxuXG4vKipcbiAqIFx1NEYxQVx1OEJERFx1N0VERlx1OEJBMVx1ODg0Q1x1NzY4NFx1NEUyNFx1ODg0Q1x1OTRCM1x1NTIzNlx1RkYwOFx1NzUyOFx1NjIzN1x1NjMwN1x1NUI5QVx1NzY4NFx1NjgzN1x1NUYwRlx1RkYwOVx1MzAwMlx1NEUwRFx1ODBGRFx1OEQ3MCBDU1MgXHU5MDA5XHU2MkU5XHU1NjY4XHVGRjFBXG4gKiBcdTVCOThcdTY1QjlcdTU5MUFcdTRFMkFcdTZBMjFcdTU3NTdcdTc2ODRcdTY4MzlcdTdDN0JcdTkwRkRcdTUzRUIgYHJvb3RgXHVGRjA4XHU2Nzg0XHU1RUZBXHU1NDBFXHU2NjJGIGBoYXNoX3Jvb3RgXHVGRjA5XHVGRjBDXHU1MTc2XHU0RTJEXG4gKiBDb252ZXJzYXRpb25Sb290IFx1NzY4NFx1NUI1MFx1NjgxMVx1OTFDQ1x1NUMzMVx1NTMwNVx1NTQyQlx1N0VERlx1OEJBMVx1ODg0Q1x1NzY4NCBgaGFzaF9zZXBgIFx1NTIwNlx1OTY5NCBzcGFuXHUyMDE0XHUyMDE0XG4gKiBcdTRFRkJcdTRGNTVcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdUZGMDhcdTU0MkIgOmhhcygpXHVGRjA5XHU5MEZEXHU0RjFBXHU2MjhBXHU2NTc0XHU0RTJBXHU4MDRBXHU1OTI5XHU1QkI5XHU1NjY4XHU5NEIzXHU2MjEwXHU0RTI0XHU4ODRDXHVGRjBDXHU2NzQwXHU2QjdCXHU2RURBXHU1MkE4XHUzMDAyXG4gKiBcdTU2RTBcdTZCNjRcdTU3MjhcdThGRDBcdTg4NENcdTY1RjZcdTYzMDlcdTU1MkZcdTRFMDBcdTVGNjJcdTcyQjZcdTVCOUFcdTRGNERcdUZGMUFcdTVDNDVcdTRFMkRcdTYzOTJcdTcyNDggKyBcdTc2RjRcdTYzQTVcdTVCNTBcdTRFRTNcdTU0MkJcdTY1ODdcdTY3MkMgXCJ8XCIgXHU3Njg0XG4gKiBcdTUyMDZcdTk2OTQgc3Bhblx1RkYwQ1x1NTQ3RFx1NEUyRFx1NTQwRVx1NjI4QVx1NUI5OFx1NjVCOVx1N0M3Qlx1NTQwRFx1NTM5Rlx1NjgzN1x1NTE5OVx1OEZEQlx1NjgzN1x1NUYwRlx1ODg2OFx1RkYwOFx1N0NCRVx1NTFDNlx1NTIzMFx1Njc4NFx1NUVGQVx1NTRDOFx1NUUwQ1x1RkYwOVx1MzAwMlxuICogQHJldHVybnMgXHU2Q0U4XHU1MTY1XHU3Njg0IHN0eWxlIFx1NTE0M1x1N0QyMFx1RkYxQlx1NUI5OFx1NjVCOVx1NjcyQVx1NkUzMlx1NjdEM1x1N0VERlx1OEJBMVx1ODg0Q1x1NjVGNlx1NEUzQSB1bmRlZmluZWRcdTMwMDJcbiAqL1xuY29uc3QgYXBwbHlTdGF0c0xpbmVDbGFtcCA9ICgpOiBIVE1MU3R5bGVFbGVtZW50IHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3Qgc2VwU3BhbiA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MU3BhbkVsZW1lbnQ+KCdkaXZbY2xhc3MqPVwiX3Jvb3RcIl0gPiBzcGFuW2NsYXNzKj1cIl9zZXBcIl0nKSlcbiAgICAuZmluZCgoc3BhbikgPT4gc3Bhbi50ZXh0Q29udGVudCA9PT0gJ3wnKVxuICBjb25zdCByb290RGl2ID0gc2VwU3Bhbj8ucGFyZW50RWxlbWVudFxuICBjb25zdCBoYXNoQ2xhc3MgPSByb290RGl2Py5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5maW5kKChuYW1lKSA9PiBuYW1lLmVuZHNXaXRoKCdfcm9vdCcpKVxuICBpZiAocm9vdERpdiA9PT0gdW5kZWZpbmVkIHx8IHJvb3REaXYgPT09IG51bGwgfHwgaGFzaENsYXNzID09PSB1bmRlZmluZWQgfHwgZ2V0Q29tcHV0ZWRTdHlsZShyb290RGl2KS50ZXh0QWxpZ24gIT09ICdjZW50ZXInKSByZXR1cm4gdW5kZWZpbmVkXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZS5pZCA9ICdwYy1zdGF0cy1jbGFtcCdcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG5kaXZbY2xhc3M9XCIke2hhc2hDbGFzc31cIl0ge1xuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgLXdlYmtpdC1saW5lLWNsYW1wOiAyO1xuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuICB0ZXh0LW92ZXJmbG93OiBjbGlwO1xuICBmb250LXNpemU6IDExcHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cbmBcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSlcbiAgcmV0dXJuIHN0eWxlXG59XG5cbnR5cGUgVGFiS2V5ID0gJ2NvbW1pdHMnIHwgJ292ZXJ2aWV3JyB8ICdleGVjdXRpb24nIHwgJ3JldmlldycgfCAnbm90ZXMnIHwgJ3NldHRpbmdzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZUZyYW1lUHJvcHMge1xuICAvKiogXHU1Qjk4XHU2NUI5IGRldGFpbHMgXHU2OUZEXHU1OTUxXHU3RUE2XHU3Njg0IGxvY2FsZSBcdTZDRThcdTUxNjVcdUZGMDhcdTYyMTFcdTRFRUNcdTZDRThcdTUxOENcdTc2ODQgcHJvamVjdC1jb250cm9sIFx1OEJDRFx1NTE3OFx1RkYwOVx1MzAwMiAqL1xuICB0PzogKGtleTogc3RyaW5nKSA9PiBzdHJpbmdcbiAgLyoqIFx1NUY1M1x1NTI0RFx1NEYxQVx1OEJERCBpZFx1RkYwOFx1NUI5OFx1NjVCOSBzZXNzaW9uIFx1NjgwN1x1NTFDNlx1NUM1RVx1NjAyN1x1RkYxQlx1NTIwN1x1NjM2Mlx1NEYxQVx1OEJERFx1NjVGNlx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1NURFNVx1NEY1Q1x1NTNGMFx1OEY2OFx1OTA1M1x1RkYwOVx1MzAwMiAqL1xuICBzZXNzaW9uSWQ/OiBzdHJpbmdcbn1cblxuLyoqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NjU4N1x1Njg0OFx1OEJDRFx1NTE3OFx1RkYwOHpoIC8gZW5cdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBjb25zdCBXT1JLU1BBQ0VfRElDVCA9IHtcbiAgemg6IHtcbiAgICAnd29ya3NwYWNlLnRpdGxlJzogJ1x1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMCcsXG4gICAgJ3RhYi5jb21taXRzJzogJ1x1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNScsXG4gICAgJ3RhYi5vdmVydmlldyc6ICdcdTk4NzlcdTc2RUVcdTYwM0JcdTg5QzgnLFxuICAgICd0YWIuZXhlY3V0aW9uJzogJ1x1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDMycsXG4gICAgJ3RhYi5yZXZpZXcnOiAnUmV2aWV3IFx1OTVFRVx1OTg5OCcsXG4gICAgJ3RhYi5ub3Rlcyc6ICdcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzYnLFxuICAgICd0YWIuc2V0dGluZ3MnOiAnXHU4QkJFXHU3RjZFJyxcbiAgICAnZXJyb3IubG9hZCc6ICdcdTUyQTBcdThGN0RcdTU5MzFcdThEMjUnLFxuICAgICdzdGF0ZS5wcm9qZWN0JzogJ1x1NUY1M1x1NTI0RFx1OTg3OVx1NzZFRScsXG4gICAgJ3N0YXRlLm5vUHJvamVjdCc6ICdcdTVDMUFcdTY3MkFcdTUyMURcdTU5Q0JcdTUzMTZcdTk4NzlcdTc2RUUnLFxuICAgICdzdGF0ZS5ub1Byb2plY3RIaW50JzogJ1x1NzBCOVx1NTFGQlx1MzAwQ1x1NTIxRFx1NTlDQlx1NTMxNlx1OTg3OVx1NzZFRVx1MzAwRFx1NjI2Qlx1NjNDRlx1NEVEM1x1NUU5M1x1N0VEM1x1Njc4NFx1MzAwMVx1NjI4MFx1NjcyRlx1NjgwOFx1NEUwRVx1N0IyNlx1NTNGN1x1N0QyMlx1NUYxNVx1MzAwMicsXG4gICAgJ2FjdGlvbi5ib290c3RyYXAnOiAnXHU1MjFEXHU1OUNCXHU1MzE2XHU5ODc5XHU3NkVFJyxcbiAgICAnYWN0aW9uLnJlc2Nhbic6ICdcdTkxQ0RcdTY1QjBcdTUyMURcdTU5Q0JcdTUzMTYgLyBcdTYyNkJcdTYzQ0YnLFxuICAgICdhY3Rpb24uYW5hbHl6ZSc6ICdcdTUyMDZcdTY3OTBcdTVGNTNcdTUyNERcdTY1MzlcdTUyQTgnLFxuICAgICdhY3Rpb24ucmV2aWV3JzogJ1x1OEJDNFx1NUJBMVx1NUY1M1x1NTI0RFx1NjUzOVx1NTJBOCcsXG4gICAgJ2FjdGlvbi52ZXJpZnknOiAnXHU5QThDXHU2NTM2XHU1RjUzXHU1MjREXHU2NTM5XHU1MkE4JyxcbiAgICAnYWN0aW9uLmNyZWF0ZUNoYW5nZSc6ICdcdTY1QjBcdTVFRkFcdTUzRDhcdTY2RjQnLFxuICAgICdhY3Rpb24ucnVubmluZyc6ICdcdTYyNjdcdTg4NENcdTRFMkRcdTIwMjYnLFxuICAgICdhY3Rpb24ucmVmcmVzaCc6ICdcdTUyMzdcdTY1QjAnLFxuICAgICdmb3JtLmNoYW5nZVRpdGxlJzogJ1x1NTNEOFx1NjZGNFx1NjgwN1x1OTg5OCcsXG4gICAgJ2Zvcm0uY2hhbmdlRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMDhcdTkwMDlcdTU4NkJcdUZGMDknLFxuICAgICdyZXN1bHQucGFuZWwnOiAnXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDJyxcblxuICAgICdyZXBvLnNjYW5IaXN0b3J5JzogJ1x1OTFDRFx1NUVGQVx1NTM4Nlx1NTNGMicsXG4gICAgJ3JlcG8uY29tbWl0cyc6ICdcdTYzRDBcdTRFQTQnLFxuICAgICdyZXBvLmJyYW5jaCc6ICdcdTUyMDZcdTY1MkYnLFxuICAgICdyZXBvLndvcmtpbmcnOiAnXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcbiAgICAncmVwby53b3JraW5nQ2xlYW4nOiAnXHU1REU1XHU0RjVDXHU1MzNBXHU1RTcyXHU1MUMwXHVGRjBDXHU2NUUwXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcbiAgICAncmVwby5lbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTYzRDBcdTRFQTRcdTMwMDInLFxuICAgICdyZXBvLmxvYWRGYWlsZWQnOiAnXHU2M0QwXHU0RUE0XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1JyxcbiAgICAncGlja2VyLnRpdGxlJzogJ1x1OTAwOVx1NjJFOVx1ODk4MVx1NjgzOFx1NjdFNVx1NzY4NFx1NjNEMFx1NEVBNFx1RkYwOFx1NTNFRlx1NTkxQVx1OTAwOVx1RkYwOScsXG4gICAgJ3BpY2tlci5wbGFjZWhvbGRlcic6ICdcdTcwQjlcdTUxRkJcdTkwMDlcdTYyRTlcdTYzRDBcdTRFQTRcdUZGMDhcdTUzRUZcdTU5MUFcdTkwMDlcdUZGMENcdTU0MkJcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQThcdUZGMDknLFxuICAgICdwaWNrZXIuc2VsZWN0ZWQnOiAnXHU1REYyXHU5MDA5JyxcbiAgICAncGlja2VyLmZpbHRlcic6ICdcdTYzMDlcdTY4MDdcdTk4OTgvXHU1NEM4XHU1RTBDL1x1NEY1Q1x1ODAwNVx1OEZDN1x1NkVFNFx1MjAyNicsXG4gICAgJ3BpY2tlci5jbGVhcic6ICdcdTZFMDVcdTdBN0EnLFxuICAgICdwaWNrZXIubm9NYXRjaCc6ICdcdTY1RTBcdTUzMzlcdTkxNERcdTYzRDBcdTRFQTRcdTMwMDInLFxuICAgICdwaWNrZXIuaGludCc6ICdcdTUyRkVcdTkwMDlcdTYzRDBcdTRFQTRcdTU0MEVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTAgQUkgXHU4OUUzXHU4QkZCXHVGRjFCXHU0RTBCXHU2NUI5XHU1M0VGXHU1MThEXHU4REQxXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHU0RTBFXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHUzMDAyJyxcbiAgICAnaW1wYWN0LmZhY3RvcnMnOiAnXHU5OENFXHU5NjY5XHU2Nzg0XHU2MjEwXHVGRjA4XHU0RTNBXHU0RUMwXHU0RTQ4XHU2NjJGXHU4RkQ5XHU0RTJBXHU3QjQ5XHU3RUE3XHVGRjA5JyxcbiAgICAnaW1wYWN0LnBvaW50cyc6ICdcdTVGNzFcdTU0Q0RcdTcwQjlcdTY2MEVcdTdFQzYnLFxuICAgICdpbXBhY3Qua2V5UG9pbnRzJzogJ1x1NTE3M1x1OTUyRVx1N0VDNFx1NEVGNicsXG4gICAgJ2ltcGFjdC5tZW1vcnknOiAnXHU3RUQzXHU1NDA4XHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHU2ODM4XHU2N0U1JyxcbiAgICAnaW1wYWN0LmZ1bmN0aW9ucyc6ICdcdTUzRDdcdTVGNzFcdTU0Q0RcdTUxRkRcdTY1NzBcdUZGMDhcdThDMDFcdThDMDNcdTc1MjhcdTRFODZcdTg4QUJcdTY1MzlcdTc2ODRcdTRFRTNcdTc4MDFcdUZGMDknLFxuICAgICdpbXBhY3QuZnVuY1JvbGUnOiAnXHU1MUZEXHU2NTcwXHU1MjlGXHU4MEZEJyxcbiAgICAnaW1wYWN0LmZ1bmNDaGFuZ2UnOiAnXHU2NzJDXHU2QjIxXHU1M0Q4XHU1MzE2JyxcbiAgICAnaW1wYWN0LmZ1bmNDYWxsZXJzJzogJ1x1NUJGOVx1OEMwM1x1NzUyOFx1NjVCOVx1NzY4NFx1NUY3MVx1NTRDRCcsXG4gICAgJ2NhY2hlLmhpdCc6ICdcdTY3NjVcdTgxRUFcdTdGMTNcdTVCNTgnLFxuICAgICdjYWNoZS5yZWdlbmVyYXRlJzogJ1x1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMCcsXG4gICAgJ2V4ZWMuY3JlYXRlJzogJ1x1NjVCMFx1NUVGQVx1NjI2N1x1ODg0QycsXG4gICAgJ2V4ZWMuZm9ybVRpdGxlJzogJ1x1ODk4MVx1NTA1QVx1NEVDMFx1NEU0OFx1RkYwOFx1NEUwMFx1NTNFNVx1OEJERFx1RkYwOScsXG4gICAgJ2V4ZWMuZm9ybURlc2MnOiAnXHU5NzAwXHU2QzQyXHU0RTBFXHU4MENDXHU2NjZGXHVGRjFBXHU3NkVFXHU2ODA3XHUzMDAxXHU2RDg5XHU1M0NBXHU2QTIxXHU1NzU3XHUzMDAxXHU5QThDXHU2NTM2XHU2ODA3XHU1MUM2JyxcbiAgICAnZXhlYy5zdGFydCc6ICdcdTVGMDBcdTU5Q0JcdTYyNjdcdTg4NEMnLFxuICAgICdleGVjLnN0YXJ0aW5nJzogJ1x1NkI2M1x1NTcyOFx1NTQyRlx1NTJBOFx1MjAyNicsXG4gICAgJ2V4ZWMuY3JlYXRlSGludCc6ICdcdTUyMUJcdTVFRkFcdTUzRDhcdTY2RjRcdTVFNzZcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdThCQTFcdTUyMTJcdUZGMENcdTk2OEZcdTU0MEVcdTc1MzEgQUkgXHU1QjUwXHU0RUUzXHU3NDA2XHU5MDEwXHU2QjY1XHU2MjY3XHU4ODRDXHVGRjFCXHU4RkRCXHU1RUE2XHU1NzI4XHU0RTBCXHU2NUI5XHU1QjlFXHU2NUY2XHU1MjM3XHU2NUIwXHVGRjBDXHU2NUUwXHU5NzAwXHU1M0JCXHU4MDRBXHU1OTI5XHUzMDAyJyxcbiAgICAnZXhlYy5jb2wuc3RlcHMnOiAnXHU2QjY1XHU5QUE0JyxcbiAgICAnbm90ZXMuZWRpdCc6ICdcdTdGMTZcdThGOTEnLFxuICAgICdub3Rlcy50b01lbW9yeSc6ICdcdThGNkNcdThCQjBcdTVGQzYnLFxuICAgICdub3Rlcy50b01lbW9yeUhpbnQnOiAnXHU2MjhBXHU4RkQ5XHU2NzYxXHU3QjE0XHU4QkIwXHU3Njg0XHU2ODA3XHU5ODk4XHU0RTBFXHU1MTg1XHU1QkI5XHU1ODZCXHU1MTY1XHU0RTBCXHU2NUI5XHU4QkIwXHU1RkM2XHU4ODY4XHU1MzU1XHVGRjBDXHU3ODZFXHU4QkE0XHU1NDBFXHU1MTY1XHU1RTkzJyxcbiAgICAnbm90ZXMudG9NZW1vcnlEb25lJzogJ1x1MjcxMyBcdTVERjJcdTU4NkJcdTUxNjVcdThCQjBcdTVGQzZcdTg4NjhcdTUzNTVcdUZGMDhcdTU3MjhcdTRFMEJcdTY1QjlcdTMwMENcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdTMwMERcdTUzM0FcdTc4NkVcdThCQTRcdTdDN0JcdTU3OEJcdTU0MEVcdTZERkJcdTUyQTBcdUZGMDknLFxuICAgICdkZXRhaWwuc2F2ZU5vdGUnOiAnXHU1QjU4XHU0RTNBXHU3QjE0XHU4QkIwJyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlSGludCc6ICdcdTYyOEFcdTY3MkNcdTZCMjFcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdUZGMDhcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDgvXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxL1x1OThDRVx1OTY2OVx1NzBCOVx1RkYwOVx1NEUwMFx1OTUyRVx1NUI1OFx1NEUzQVx1N0VEM1x1Njc4NFx1NTMxNlx1N0IxNFx1OEJCMCcsXG4gICAgJ2RldGFpbC5zYXZlTm90ZVRpdGxlJzogJ1x1NjgzOFx1NjdFNVx1OEJCMFx1NUY1NScsXG4gICAgJ2RldGFpbC5zYXZlTWVtb3J5JzogJ1x1NkM4OVx1NkRDMFx1NEUzQVx1OEJCMFx1NUZDNicsXG4gICAgJ2RldGFpbC5zYXZlTWVtb3J5SGludCc6ICdcdTYyOEFcdTY3MkNcdTZCMjFcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdTZDODlcdTZEQzBcdTRFM0FcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdUZGMDhcdThGREJcdTUxNjVcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTdcdUZGMDknLFxuICAgICdub3Rlcy5zYXZlJzogJ1x1NEZERFx1NUI1OCcsXG4gICAgJ25vdGVzLmNhbmNlbCc6ICdcdTUzRDZcdTZEODgnLFxuICAgICdtZW1vcnkuYnJhbmNoU2NvcGUnOiAnXHU1MjA2XHU2NTJGJyxcbiAgICAnbWVtb3J5LmJyYW5jaEFsbCc6ICdcdTUxNjhcdTkwRThcdTUyMDZcdTY1MkYnLFxuICAgICdub3Rlcy5zZWFyY2gnOiAnXHU2NDFDXHU3RDIyXHU3QjE0XHU4QkIwXHUyMDI2JyxcbiAgICAnbW9kZWwudGl0bGUnOiAnXHU2QTIxXHU1NzhCXHU1MjA2XHU5MTREXHVGRjA4XHU4OUUzXHU4QkZCIC8gXHU2MDNCXHU3RUQzXHU3QjQ5XHU0RUZCXHU1MkExXHU3NTI4XHU1NEVBXHU0RTJBXHU2QTIxXHU1NzhCXHVGRjA5JyxcbiAgICAnbW9kZWwubG9hZGluZyc6ICdcdThCRkJcdTUzRDZcdTZBMjFcdTU3OEJcdTZFMDVcdTUzNTVcdTIwMjYnLFxuICAgICdtb2RlbC5mb2xsb3dDaGF0JzogJ1x1OERERlx1OTY4Rlx1ODA0QVx1NTkyOVx1NkEyMVx1NTc4QicsXG4gICAgJ21vZGVsLnNhdmUnOiAnXHU0RkREXHU1QjU4XHU1RTc2XHU3NTFGXHU2NTQ4JyxcbiAgICAnbW9kZWwuc2F2ZWQnOiAnXHU1REYyXHU3NTFGXHU2NTQ4JyxcbiAgICAnbW9kZWwuaGludCc6ICdcdTRGRERcdTVCNThcdTU0MEVcdTdBQ0JcdTUzNzNcdTc1MUZcdTY1NDhcdTVFNzZcdTYzMDFcdTRFNDVcdTUzMTZcdUZGMDhcdTkxQ0RcdTU0MkZcdTU0MEVcdTRGRERcdTc1NTlcdUZGMDlcdUZGMUJcdTRFMERcdTVGNzFcdTU0Q0RcdTgwNEFcdTU5MjlcdTZBMjFcdTU3OEJcdTMwMDInLFxuICAgICdub3Rlcy5haVN1bW1hcnknOiAnQUkgXHU2MDNCXHU3RUQzXHU3QjE0XHU4QkIwJyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5UnVuJzogJ1x1NjAzQlx1N0VEM1x1NzUxRlx1NjIxMFx1NEUyRFx1MjAyNlx1RkYwOFx1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxuICAgICdub3Rlcy5leHBhbmQnOiAnXHU1QzU1XHU1RjAwXHU1MTY4XHU2NTg3JyxcbiAgICAnbm90ZXMuY29sbGFwc2UnOiAnXHU2NTM2XHU4RDc3JyxcbiAgICAnbm90ZXMuc3VtbWFyeVRhZyc6ICdBSSBcdTYwM0JcdTdFRDMnLFxuICAgICdub3Rlcy5lbXB0eVNlYXJjaCc6ICdcdTY1RTBcdTUzMzlcdTkxNERcdTdCMTRcdThCQjBcdTMwMDInLFxuICAgICdub3Rlcy5jb250ZW50SGludCc6ICdcdTdCMTRcdThCQjBcdTUxODVcdTVCQjlcdUZGMDhcdTY1MkZcdTYzMDFcdTU5MUFcdTg4NENcdUZGMDlcdUZGMUFcdTdFRDNcdThCQkFcdTMwMDFcdTc1OTFcdTk1RUVcdTMwMDFcdTVCNjZcdTRFNjBcdTg5ODFcdTcwQjlcdTMwMDFcdTUxNzNcdTk1MkVcdTUxQjNcdTdCNTZcdTIwMjYnLFxuICAgICdub3Rlcy50YWdzSGludCc6ICdcdTY4MDdcdTdCN0VcdUZGMDhcdTkwMTdcdTUzRjdcdTUyMDZcdTk2OTRcdUZGMENcdTkwMDlcdTU4NkJcdUZGMUJcdTRGRERcdTVCNThcdTU0MEVcdTUzRUZcdTcwQjlcdTUxRkJcdTdCNUJcdTkwMDlcdUZGMDknLFxuICAgICdub3Rlcy5waW4nOiAnXHU3RjZFXHU5ODc2JyxcbiAgICAnbm90ZXMudW5waW4nOiAnXHU1M0Q2XHU2RDg4XHU3RjZFXHU5ODc2JyxcbiAgICAnbm90ZXMuZWRpdGVkQXQnOiAnXHU3RjE2XHU4RjkxXHU0RThFJyxcbiAgICAncmV2aWV3LmZpbHRlckFsbCc6ICdcdTUxNjhcdTkwRTgnLFxuICAgICdyZXZpZXcuc3RhdHVzQWxsJzogJ1x1NTE2OFx1OTBFOFx1NzJCNlx1NjAwMScsXG4gICAgJ3Jldmlldy52ZXJpZnknOiAnXHU1OTBEXHU2OEMwJyxcbiAgICAncmV2aWV3LnZlcmlmeVJ1bm5pbmcnOiAnXHU1OTBEXHU2OEMwXHU0RTJEXHUyMDI2JyxcbiAgICAncmV2aWV3LnZlcmlmeUhpbnQnOiAnXHU0RkVFXHU2NTM5XHU0RUUzXHU3ODAxXHU1NDBFXHU3MEI5XHU1MUZCXHVGRjFBXHU4MUVBXHU1MkE4XHU2OEMwXHU2RDRCXHU5NUVFXHU5ODk4XHU2NjJGXHU1NDI2XHU0RkVFXHU1OTBEXHUzMDAxXHU2NTM5XHU1MkE4XHU2NjJGXHU1NDI2XHU2NzAwXHU0RjE4L1x1NjcwMFx1NUMwRlx1NEZCNVx1NTE2NVx1MzAwMVx1NjcwOVx1NjVFMFx1NjVCMFx1OTVFRVx1OTg5OFx1RkYxQlx1NTE2OFx1OTBFOFx1OTAxQVx1OEZDN1x1NjI0RFx1ODFFQVx1NTJBOFx1N0Y2RVx1NEUzQVx1NURGMlx1ODlFM1x1NTFCMycsXG4gICAgJ3Jldmlldy5maXhEZXRhaWwnOiAnXHU0RkVFXHU1OTBEXHU4QkU2XHU2MEM1JyxcbiAgICAncmV2aWV3LmZpeFN0YXRGaWxlcyc6ICdcdTY1ODdcdTRFRjYnLFxuICAgICdyZXZpZXcuZml4RmlsZXMnOiAnXHU0RkVFXHU1OTBEXHU2RDg5XHU1M0NBXHU2NTg3XHU0RUY2JyxcbiAgICAncmV2aWV3LmZpeEltcGFjdCc6ICdcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdUZGMDhcdTY1MzlcdTUyQThcdTdCMjZcdTUzRjdcdTRFMEVcdThDMDNcdTc1MjhcdTcwQjlcdUZGMDknLFxuICAgICdyZXZpZXcuZGVmaW5lZEluJzogJ1x1NUI5QVx1NEU0OVx1NEU4RScsXG4gICAgJ3Jldmlldy5jYWxsQ291bnQnOiAnXHU1OTA0XHU4QzAzXHU3NTI4JyxcbiAgICAncmV2aWV3LmZpeERpZmYnOiAnXHU0RkVFXHU1OTBEXHU1REVFXHU1RjAyXHVGRjA4XHU3NkY4XHU1QkY5XHU4QkM0XHU1QkExXHU1N0ZBXHU3RUJGXHVGRjA5JyxcbiAgICAncmV2aWV3LnJlZnJlc2gnOiAnXHU1MjM3XHU2NUIwJyxcbiAgICAncmV2aWV3LnJldGVudGlvbkhpbnQnOiAnXHU1REYyXHU4OUUzXHU1MUIzXHU5NUVFXHU5ODk4XHU0RkREXHU3NTU5IHtkYXlzfSBcdTU5MjlcdTU0MEVcdTgxRUFcdTUyQThcdTZFMDVcdTc0MDYnLFxuICAgICdyZXZpZXcudGFyZ2V0JzogJ1x1NUJGOVx1OEM2MScsXG4gICAgJ3Jldmlldy53b3JraW5nVGFyZ2V0JzogJ1x1NURFNVx1NEY1Q1x1NTMzQScsXG5cbiAgICAncGxhbi50aXRsZSc6ICdcdTdGMTZcdTYzOTJcdThCQTFcdTUyMTJcdTc4NkVcdThCQTQnLFxuICAgICdwbGFuLmhpbnQnOiAnXHU2QkNGXHU2QjY1XHU3Njg0XHU4OUQyXHU4MjcyXHU1MUIzXHU1QjlBXHU0RTBBXHU0RTBCXHU2NTg3XHU2Q0U4XHU1MTY1XHU0RTBFXHU5RUQ4XHU4QkE0XHU2QTIxXHU1NzhCXHVGRjA4XHU1MjA2XHU2NzkwL1x1NjRDRFx1NEY1Qz1mYXN0XHVGRjBDXHU1RjAwXHU1M0QxPXN0YW5kYXJkXHVGRjBDXHU4OUM0XHU1MjEyPXJlYXNvbmluZ1x1RkYwQ1x1OUE4Q1x1NjUzNj12ZXJpZmllclx1RkYwOVx1RkYxQlx1NTNFRlx1OEMwM1x1NjU3NFx1NTQwRVx1NTE4RFx1NTQyRlx1NTJBOFx1MzAwMicsXG4gICAgJ3BsYW4uY29sLnN0ZXAnOiAnXHU2QjY1XHU5QUE0JywgJ3BsYW4uY29sLnJvbGUnOiAnXHU4OUQyXHU4MjcyJywgJ3BsYW4uY29sLm1vZGVsJzogJ1x1NkEyMVx1NTc4QicsICdwbGFuLmNvbC5wb2xpY3knOiAnXHU1OTMxXHU4RDI1XHU3QjU2XHU3NTY1JywgJ3BsYW4uY29sLmVuYWJsZWQnOiAnXHU1NDJGXHU3NTI4JywgJ3BsYW4uY29sLmF0dGVtcHRzJzogJ1x1NUMxRFx1OEJENScsXG4gICAgJ3BsYW4ubW9kZWxEZWZhdWx0JzogJ1x1OERERlx1OTY4Rlx1ODlEMlx1ODI3Mlx1OUVEOFx1OEJBNCcsXG4gICAgJ3BsYW4ubGF1bmNoRWRpdGVkJzogJ1x1NEZERFx1NUI1OFx1NEZFRVx1NjUzOVx1NUU3Nlx1NTQyRlx1NTJBOCcsXG4gICAgJ3BsYW4ubGF1bmNoRGlyZWN0JzogJ1x1NjMwOVx1NTM5Rlx1OEJBMVx1NTIxMlx1NTQyRlx1NTJBOCcsXG4gICAgJ3BsYW4uZGlzY2FyZCc6ICdcdTY1M0VcdTVGMDMnLFxuICAgICdwbGFuLnZpZXdEZXRhaWwnOiAnXHU4QkU2XHU2MEM1JywgJ3BsYW4ucmVmcmVzaERldGFpbCc6ICdcdTUyMzdcdTY1QjAnLCAncGxhbi5jbG9zZURldGFpbCc6ICdcdTY1MzZcdThENzcnLFxuICAgICdwbGFuLmRldGFpbFRpdGxlJzogJ1J1biBcdThCRTZcdTYwQzUnLFxuICAgICdwbGFuLnBhdXNlZEJhbm5lcic6ICdcdTRFRkJcdTUyQTFcdTVERjJcdTY2ODJcdTUwNUNcdUZGMENcdTdCNDlcdTVGODVcdTRGNjBcdTc2ODRcdTUxQjNcdTdCNTYnLFxuICAgICdwbGFuLnJlc3VtZVJldHJ5JzogJ1x1OTFDRFx1OEJENVx1OEJFNVx1NkI2NVx1OUFBNFx1NUU3Nlx1N0VFN1x1N0VFRCcsXG4gICAgJ3BsYW4ucmVzdW1lU2tpcCc6ICdcdThERjNcdThGQzdcdThCRTVcdTZCNjVcdTlBQTRcdTdFRTdcdTdFRUQnLFxuICAgICdwbGFuLnJlc3VtZUZhaWxlZCc6ICdcdTRFQ0VcdTU5MzFcdThEMjVcdTU5MDRcdTYwNjJcdTU5MEQnLFxuICAgICdwbGFuLmNvbnRleHRUaXRsZSc6ICdcdTRFRkJcdTUyQTFcdTRFMEFcdTRFMEJcdTY1ODdcdUZGMDhcdTY3MkMgUnVuIFx1NkNFOFx1NTE2NVx1NEU4Nlx1NEVDMFx1NEU0OFx1RkYwOScsXG4gICAgJ3BsYW4uYnJhbmNoJzogJ1x1NTIwNlx1NjUyRicsICdwbGFuLmluamVjdGVkTWVtb3JpZXMnOiAnXHU2Q0U4XHU1MTY1XHU4QkIwXHU1RkM2JywgJ3BsYW4uZGVjaXNpb25Mb2cnOiAnXHU1MUIzXHU3QjU2XHU2NUU1XHU1RkQ3JyxcbiAgICAnZXhlYy5jb2wuZGV0YWlsJzogJ1x1OEJFNlx1NjBDNScsXG5cbiAgICAnc2NoZWQudGl0bGUnOiAnXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExJyxcbiAgICAnc2NoZWQuZm9ybU5hbWUnOiAnXHU0RUZCXHU1MkExXHU1NDBEXHU3OUYwJywgJ3NjaGVkLmZvcm1JbnRlcnZhbCc6ICdcdTk1RjRcdTk2OTRcdUZGMDhcdTUyMDZcdTk0OUZcdUZGMDknLFxuICAgICdzY2hlZC50eXBlUmV2aWV3JzogJ1x1ODFFQVx1NTJBOFx1OEJDNFx1NUJBMScsICdzY2hlZC50eXBlU3VtbWFyeSc6ICdBSSBcdTYwM0JcdTdFRDMnLCAnc2NoZWQudHlwZVJ1bic6ICdcdTVCOUFcdTY1RjZcdTYyNjdcdTg4NEMnLFxuICAgICdzY2hlZC5hZGQnOiAnXHU1MjFCXHU1RUZBJyxcbiAgICAnc2NoZWQuaGludCc6ICdcdTUyMzBcdTcwQjlcdTgxRUFcdTUyQThcdTYyNjdcdTg4NENcdUZGMUFcdTgxRUFcdTUyQThcdThCQzRcdTVCQTE9XHU4QkM0XHU1QkExXHU4RkQxIDI0IFx1NUMwRlx1NjVGNlx1NzY4NFx1NjVCMFx1NjNEMFx1NEVBNFx1RkYwOFx1OTVFRVx1OTg5OFx1OEZEQiBSZXZpZXcgXHU5NzYyXHU2NzdGXHVGRjA5XHVGRjFCQUkgXHU2MDNCXHU3RUQzPVx1NzUxRlx1NjIxMFx1NTg5RVx1OTFDRlx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1RkYxQlx1NUI5QVx1NjVGNlx1NjI2N1x1ODg0Qz1cdTYzMDlcdTZBMjFcdTY3N0ZcdThERDFcdTRFMDBcdTZCMjFcdTdGMTZcdTYzOTJcdTRFRkJcdTUyQTFcdTMwMDJcdTY3MDBcdTVDMEYgMSBcdTUyMDZcdTk0OUZcdTMwMDInLFxuICAgICdzY2hlZC5lbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdTMwMDInLFxuICAgICdzY2hlZC5jb2wubmFtZSc6ICdcdTU0MERcdTc5RjAnLCAnc2NoZWQuY29sLnR5cGUnOiAnXHU3QzdCXHU1NzhCJywgJ3NjaGVkLmNvbC5pbnRlcnZhbCc6ICdcdTU0NjhcdTY3MUYnLCAnc2NoZWQuY29sLm5leHQnOiAnXHU0RTBCXHU2QjIxXHU2MjY3XHU4ODRDJywgJ3NjaGVkLmNvbC5sYXN0UmVzdWx0JzogJ1x1NEUwQVx1NkIyMVx1N0VEM1x1Njc5QycsICdzY2hlZC5jb2wuYWN0aW9ucyc6ICdcdTY0Q0RcdTRGNUMnLFxuICAgICdzY2hlZC5kYXknOiAnIFx1NTkyOScsICdzY2hlZC5ob3VyJzogJyBcdTVDMEZcdTY1RjYnLCAnc2NoZWQubWludXRlJzogJyBcdTUyMDZcdTk0OUYnLFxuICAgICdzY2hlZC5kaXNhYmxlJzogJ1x1NjY4Mlx1NTA1QycsICdzY2hlZC5lbmFibGUnOiAnXHU1NDJGXHU3NTI4JywgJ3NjaGVkLnJ1bk5vdyc6ICdcdTdBQ0JcdTUzNzNcdTYyNjdcdTg4NEMnLFxuXG4gICAgJ21lbW9yeS56b25lVGl0bGUnOiAnXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2JyxcbiAgICAnbWVtb3J5LnN5bmNCYXNlbGluZSc6ICdcdTU0MENcdTZCNjVcdTU3RkFcdTdFQkYnLCAnbWVtb3J5LnN5bmNOb25lJzogJ1x1NjcyQVx1NTQwQ1x1NkI2NScsXG4gICAgJ21lbW9yeS5iZWhpbmQnOiAnXHU4NDNEXHU1NDBFIHtufSBcdTRFMkFcdTYzRDBcdTRFQTRcdTY3MkFcdTU0MENcdTZCNjUnLFxuICAgICdtZW1vcnkuc3luYyc6ICdcdTU0MENcdTZCNjVcdThCQjBcdTVGQzYnLCAnbWVtb3J5LnN5bmNpbmcnOiAnXHU1NDBDXHU2QjY1XHU0RTJEXHUyMDI2JywgJ21lbW9yeS5zeW5jRmFpbGVkJzogJ1x1NTQwQ1x1NkI2NVx1NTkzMVx1OEQyNScsXG4gICAgJ21lbW9yeS5zdGFsZVRpdGxlJzogJ1x1NzU5MVx1NEYzQ1x1OEZDN1x1NjVGNlx1RkYwOFx1NzZGOFx1NTE3M1x1NEVFM1x1NzgwMVx1NURGMlx1ODhBQlx1NjUzOVx1NTJBOFx1RkYwQ1x1NUY4NVx1NEY2MFx1NTkwRFx1NjgzOFx1RkYwOScsXG4gICAgJ21lbW9yeS5tYXJrU3RhbGUnOiAnXHU2ODA3XHU4QkIwXHU4RkM3XHU2NUY2JywgJ21lbW9yeS5hcmNoaXZlQnRuJzogJ1x1NUY1Mlx1Njg2MycsICdtZW1vcnkua2VlcEFjdGl2ZSc6ICdcdTRFQ0RcdTY3MDlcdTY1NDgnLFxuICAgICdtZW1vcnkubmV3Q2FuZGlkYXRlcyc6ICdcdTY1QjBcdTU4OUVcdTUwMTlcdTkwMDlcdUZGMDhcdTVERjJcdTUxNjVcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTdcdUZGMDlcdUZGMUEnLFxuICAgICdtZW1vcnkuY2xvc2VSZXBvcnQnOiAnXHU1MTczXHU5NUVEXHU2MkE1XHU1NDRBJyxcbiAgICAnbWVtb3J5LnNjb3BlUHJvamVjdCc6ICdcdTRFM0JcdTVFNzJcdUZGMDhcdTUxNjhcdTUyMDZcdTY1MkZcdUZGMDknLCAnbWVtb3J5LnNjb3BlQnJhbmNoJzogJ1x1NEVDNVx1NUY1M1x1NTI0RFx1NTIwNlx1NjUyRicsXG4gICAgJ21lbW9yeS5wZW5kaW5nUXVldWUnOiAnXHU1Rjg1XHU3ODZFXHU4QkE0XHU5NjFGXHU1MjE3JyxcbiAgICAnbWVtb3J5LnRvTm90ZSc6ICdcdThGNkNcdTdCMTRcdThCQjAnLCAnbWVtb3J5Lm5vcm1hbGl6ZSc6ICdcdTVGNTJcdTRFMDBcdTUyMzBcdTRFM0JcdTVFNzInLCAnbWVtb3J5LnJlc3RvcmUnOiAnXHU2MDYyXHU1OTBEJyxcbiAgICAnbWVtb3J5LnN0YXR1c1N0YWxlJzogJ1x1NzU5MVx1NEYzQ1x1OEZDN1x1NjVGNicsXG4gICAgJ2ltcGFjdC5mdW5jdGlvbnNOb25lJzogJ1x1NjcyQVx1OEJDNlx1NTIyQlx1NTFGQVx1NTFGRFx1NjU3MFx1N0VBN1x1OEMwM1x1NzUyOFx1NTNEOFx1NTMxNlx1RkYwOFx1NTNFRlx1ODBGRFx1NjYyRlx1NjgzN1x1NUYwRi9cdTk3NTlcdTYwMDFcdThENDRcdTZFOTAvXHU3RUFGXHU5MTREXHU3RjZFXHU2NTM5XHU1MkE4XHVGRjA5XHUzMDAyJyxcbiAgICAncmV2aWV3LmNvbC5zZXZlcml0eSc6ICdcdTdFQTdcdTUyMkInLFxuICAgICdyZXZpZXcuY29sLmNhdGVnb3J5JzogJ1x1N0M3Qlx1NTIyQicsXG4gICAgJ3Jldmlldy5jb2wudGl0bGUnOiAnXHU5NUVFXHU5ODk4JyxcbiAgICAncmV2aWV3LmNvbC5ldmlkZW5jZSc6ICdcdTRGNERcdTdGNkUnLFxuICAgICdyZXZpZXcuY29sLmZpeCc6ICdcdTVFRkFcdThCQUVcdTRGRUVcdTU5MEQnLFxuICAgICdyZXZpZXcuaGludCc6ICdcdTcwQjlcdTUxRkJcdTRFMEFcdTY1QjlcdTYzMDlcdTk0QUVcdTVGMDBcdTU5Q0JcdTY4MzhcdTY3RTVcdUZGMENcdTRFQTdcdTUxRkFcdTY3MDBcdTRGMThcdTYwMjdcdTdFRDNcdThCQkFcdTRFMEVcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTMwMDInLFxuICAgICdkaWZmLnNob3cnOiAnXHU1QkY5XHU2QkQ0JyxcbiAgICAnZGlmZi5oaWRlJzogJ1x1NjUzNlx1OEQ3N1x1NURFRVx1NUYwMicsXG5cbiAgICAnZGV0YWlsLnRpdGxlJzogJ1x1NjgzOFx1NjdFNVx1OEJFNlx1NjBDNScsXG4gICAgJ2RldGFpbC5waWNrJzogJ1x1MjE5MCBcdTRFQ0VcdTVERTZcdTRGQTdcdTkwMDlcdTYyRTlcdTRFMDBcdTZCMjFcdTYzRDBcdTRFQTRcdUZGMDhcdTYyMTZcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQThcdUZGMDlcdTVGMDBcdTU5Q0JcdTY4MzhcdTY3RTUnLFxuICAgICdkZXRhaWwud2hhdCc6ICdcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDgnLFxuICAgICdkZXRhaWwubG9naWMnOiAnXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxJyxcbiAgICAnZGV0YWlsLnJpc2snOiAnXHU5OENFXHU5NjY5XHU3MEI5JyxcbiAgICAnZGV0YWlsLmZpbGVzJzogJ1x1NjU4N1x1NEVGNlx1NkUwNVx1NTM1NScsXG4gICAgJ2RldGFpbC5wYXRjaCc6ICdcdTY3RTVcdTc3MEJcdTg4NjVcdTRFMDFcdTUzOUZcdTY1ODcnLFxuICAgICdkZXRhaWwuYWlMb2FkaW5nJzogJ0FJIFx1ODlFM1x1OEJGQlx1NzUxRlx1NjIxMFx1NEUyRFx1MjAyNlx1RkYwOFx1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxuICAgICdkZXRhaWwuaW1wYWN0JzogJ1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNFx1NTIwNlx1Njc5MCcsXG4gICAgJ2RldGFpbC5pbXBhY3RMb2FkaW5nJzogJ1x1NUY3MVx1NTRDRFx1NjI2Qlx1NjNDRlx1NEUyRFx1MjAyNlx1RkYwOFx1NUYxNVx1NzUyOFx1NjhDMFx1N0QyMiArIFx1NTZGRVx1OEMzMVx1NEYyMFx1NjRBRFx1RkYwOScsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5JzogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNScsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZyc6ICdcdThCQzRcdTVCQTFcdTRFMkRcdTIwMjZcdUZGMDhcdTRGMUFcdTRFQTdcdTUxRkFcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTRFMEVcdTY3MDBcdTRGMThcdTYwMjdcdTdFRDNcdThCQkFcdUZGMDknLFxuXG4gICAgJ2ltcGFjdC5yaXNrJzogJ1x1OThDRVx1OTY2OScsXG4gICAgJ2ltcGFjdC5jb2wuY2hhbmdlZCc6ICdcdTUzRDhcdTY2RjRcdTY1ODdcdTRFRjYnLFxuICAgICdpbXBhY3QuY29sLmluZGlyZWN0JzogJ1x1OTVGNFx1NjNBNVx1NUY3MVx1NTRDRFx1RkYwOFx1NUYxNVx1NzUyOFx1OTRGRVx1RkYwOScsXG4gICAgJ2ltcGFjdC5jb2wucG90ZW50aWFsJzogJ1x1NkY1Q1x1NTcyOFx1NUY3MVx1NTRDRCcsXG4gICAgJ2ltcGFjdC5ub25lJzogJ1x1NjcyQVx1NTNEMVx1NzNCMFx1NEVEM1x1NUU5M1x1NTE4NVx1NUYxNVx1NzUyOFx1ODAwNVx1RkYwOFx1NjUzOVx1NTJBOFx1NzcwQlx1NEYzQ1x1NzJFQ1x1N0FDQlx1RkYwOVx1MzAwMicsXG4gICAgJ2ltcGFjdC50ZXN0cyc6ICdcdTUxNzNcdTgwNTRcdTZENEJcdThCRDUnLFxuICAgICdpbXBhY3QubGVnZW5kLmNoYW5nZWQnOiAnXHU1M0Q4XHU2NkY0JyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5pbmRpcmVjdCc6ICdcdTk1RjRcdTYzQTUnLFxuICAgICdpbXBhY3QubGVnZW5kLnBvdGVudGlhbCc6ICdcdTZGNUNcdTU3MjgnLFxuXG4gICAgJ3Jldmlldy52ZXJkaWN0JzogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1N0VEM1x1OEJCQScsXG4gICAgJ3Jldmlldy5pc3N1ZXMnOiAnXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1JyxcbiAgICAncmV2aWV3LmNsZWFuJzogJ1x1NjcyQVx1NTNEMVx1NzNCMFx1OTVFRVx1OTg5OFx1MzAwMicsXG5cbiAgICAnbm90ZXMudGl0bGUnOiAnXHU2ODM4XHU2N0U1XHU3QjE0XHU4QkIwJyxcbiAgICAnbm90ZXMuZm9ybVRpdGxlJzogJ1x1N0IxNFx1OEJCMFx1NjgwN1x1OTg5OCcsXG4gICAgJ25vdGVzLmZvcm1Db250ZW50JzogJ1x1N0IxNFx1OEJCMFx1NTE4NVx1NUJCOVx1RkYwOFx1N0VEM1x1OEJCQVx1MzAwMVx1NzU5MVx1OTVFRVx1MzAwMVx1NUI2Nlx1NEU2MFx1ODk4MVx1NzBCOVx1MjAyNlx1RkYwOScsXG4gICAgJ25vdGVzLmFkZCc6ICdcdTZERkJcdTUyQTBcdTdCMTRcdThCQjAnLFxuICAgICdub3Rlcy5ib3VuZFRvJzogJ1x1NUMwNlx1NTE3M1x1ODA1NFx1NTIzMCcsXG4gICAgJ25vdGVzLmNvbC50aW1lJzogJ1x1NjVGNlx1OTVGNCcsXG4gICAgJ25vdGVzLmNvbC50aXRsZSc6ICdcdTY4MDdcdTk4OTgnLFxuICAgICdub3Rlcy5jb2wuY29udGVudCc6ICdcdTUxODVcdTVCQjknLFxuICAgICdub3Rlcy5jb2wuc2hhJzogJ1x1NTE3M1x1ODA1NFx1NjNEMFx1NEVBNCcsXG4gICAgJ25vdGVzLnJlbW92ZSc6ICdcdTUyMjBcdTk2NjQnLFxuICAgICdub3Rlcy5lbXB0eSc6ICdcdThGRDhcdTZDQTFcdTY3MDlcdTdCMTRcdThCQjBcdTMwMDJcdTY4MzhcdTY3RTVcdTYzRDBcdTRFQTRcdTY1RjZcdTk2OEZcdTYyNEJcdThCQjBcdTRFMEJcdTdFRDNcdThCQkFcdTRFMEVcdTc1OTFcdTk1RUVcdUZGMENcdTVDMzFcdTY2MkZcdTRGNjBcdTc2ODRcdTk4NzlcdTc2RUVcdTVCNjZcdTRFNjBcdTY4NjNcdTY4NDhcdTMwMDInLFxuXG4gICAgJ21lbW9yeS5yZWNvcmQnOiAnXHU4QkIwXHU1RjU1XHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2JyxcbiAgICAnZm9ybS5tZW1vcnlUaXRsZSc6ICdcdThCQjBcdTVGQzZcdTY4MDdcdTk4OTgnLFxuICAgICdmb3JtLm1lbW9yeUNvbnRlbnQnOiAnXHU4QkIwXHU1RkM2XHU1MTg1XHU1QkI5XHVGRjA4XHU0RUMwXHU0RTQ4XHU0RTBFXHU0RTNBXHU0RUMwXHU0RTQ4XHVGRjA5JyxcbiAgICAnbWVtb3J5LmNvbC50aXRsZSc6ICdcdTY3NjFcdTc2RUUnLFxuICAgICdtZW1vcnkuY29sLnR5cGUnOiAnXHU3QzdCXHU1NzhCJyxcbiAgICAnbWVtb3J5LmNvbC50cnV0aCc6ICdcdTc3MUZcdTUwM0MnLFxuICAgICdtZW1vcnkuY29sLmJyYW5jaCc6ICdcdTUyMDZcdTY1MkYnLFxuICAgICdtZW1vcnkuY29uZmlybSc6ICdcdTc4NkVcdThCQTQnLFxuICAgICdtZW1vcnkuZW1wdHknOiAnXHU2NjgyXHU2NUUwXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHUzMDAyXHU1M0VGXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1OEJCMFx1NUY1NVx1RkYwQ1x1NjIxNlx1NTcyOFx1NEUwQVx1NjVCOVx1NjI0Qlx1NTJBOFx1NkRGQlx1NTJBMFx1MzAwMicsXG4gICAgJ2NvbmNlcHRzLnRpdGxlJzogJ1x1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNScsXG4gICAgJ2NvbmNlcHRzLm5vbmUnOiAnXHU2NjgyXHU2NUUwXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1XHUzMDAyXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHU4REQxXHU1QjhDXHU1M0Q4XHU2NkY0XHU1NDBFXHU4MUVBXHU1MkE4XHU2Qzg5XHU2REMwXHVGRjBDXHU0RTVGXHU1M0VGXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1NjAzQlx1N0VEM1x1NUI2Nlx1NEU2MFx1ODk4MVx1NzBCOVx1MzAwMicsXG4gICAgJ2NvbmNlcHRzLmNvbC5uYW1lJzogJ1x1Njk4Mlx1NUZGNScsXG4gICAgJ2NvbmNlcHRzLmNvbC5jYXRlZ29yeSc6ICdcdTdDN0JcdTUyMkInLFxuICAgICdjb25jZXB0cy5jb2wuY291bnQnOiAnXHU2QjIxXHU2NTcwJyxcbiAgICAncmV2aWV3LnJlY29yZHNUaXRsZSc6ICdSZXZpZXcgXHU5NUVFXHU5ODk4JyxcbiAgICAncmV2aWV3LnJlY29yZHNFbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTk1RUVcdTk4OThcdThCQjBcdTVGNTVcdTMwMDJcdTYzRDBcdTRFQTRcdTVCQTFcdTY3RTVcdTk4NzVcdThCQzRcdTVCQTFcdTUxRkFcdTc2ODRcdTk1RUVcdTk4OThcdTRGMUFcdTgxRUFcdTUyQThcdTc2N0JcdThCQjBcdTUyMzBcdThGRDlcdTkxQ0NcdUZGMUJcdTkxQ0RcdTY1QjBcdThCQzRcdTVCQTFcdTRGMUFcdTY2RkZcdTYzNjJcdTY1RTdcdThCQjBcdTVGNTVcdTMwMDInLFxuICAgICd2ZXJpZnkucmVjb3Jkcyc6ICdcdTlBOENcdTY1MzZcdThCQjBcdTVGNTUnLFxuICAgICd2ZXJpZnkucmVjb3Jkc0VtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1OUE4Q1x1NjUzNlx1OEJCMFx1NUY1NVx1MzAwMlx1NTcyOFx1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDM1x1NzBCOVx1MzAwQ1x1OUE4Q1x1NjUzNlx1MzAwRFx1NTM3M1x1NzUxRlx1NjIxMFx1MzAwMicsXG5cbiAgICAnY29uZmlybWVkLnRpdGxlJzogJ1x1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1Rlx1RkYwOFx1NEVCQVx1NURFNVx1Nzg2RVx1OEJBNFx1RkYwQ0FJIFx1Nzk4MVx1NjUzOVx1ODFFQVx1NTJBOFx1NjJFNlx1NjIyQVx1RkYwOScsXG4gICAgJ2NvbmZpcm1lZC5hZGQnOiAnXHU2REZCXHU1MkEwXHU3RUE2XHU2NzVGJyxcbiAgICAnY29uZmlybWVkLnRleHQnOiAnXHU3RUE2XHU2NzVGL1x1OTcwMFx1NkM0Mlx1NTE4NVx1NUJCOScsXG4gICAgJ2NvbmZpcm1lZC5wYXRocyc6ICdcdTc5ODFcdTY1MzlcdThERUZcdTVGODRcdUZGMDhcdTkwMTdcdTUzRjdcdTUyMDZcdTk2OTRcdUZGMUJcdTc2RjhcdTVCRjlcdTk4NzlcdTc2RUVcdTY4MzlcdTU5ODIgc3JjL2NvcmVcdUZGMENcdTYyMTZcdTdFRERcdTVCRjlcdThERUZcdTVGODRcdUZGMDknLFxuICAgICdjb25maXJtZWQubm9uZSc6ICdcdTY2ODJcdTY1RTBcdTdFQTZcdTY3NUZcdTMwMDJcdTZERkJcdTUyQTBcdTU0MEVcdUZGMENBSSBcdTRGRUVcdTY1MzlcdTY3MkNcdTk4NzlcdTc2RUVcdTc2ODRcdTc5ODFcdTY1MzlcdThERUZcdTVGODRcdTVDMDZcdTg4QUJcdTgxRUFcdTUyQThcdTYyRDJcdTdFRERcdUZGMDhcdTRFQzVcdTVCRjlcdTY3MkNcdTk4NzlcdTc2RUVcdTc1MUZcdTY1NDhcdUZGMDlcdTMwMDInLFxuXG4gICAgJ2NoYW5nZXMudGl0bGUnOiAnXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExJyxcbiAgICAnc3RhdGUubm9DaGFuZ2VzJzogJ1x1NjY4Mlx1NjVFMFx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1MzAwMlx1NTcyOFx1ODA0QVx1NTkyOVx1NEUyRFx1OEJBOSBBSSBcdTUyMUJcdTVFRkFcdUZGMENcdTYyMTZcdTc1MjhcdTRFMEFcdTY1QjlcdTMwMENcdTY1QjBcdTVFRkFcdTUzRDhcdTY2RjRcdTMwMERcdTMwMDInLFxuICAgICdjaGFuZ2VzLmNvbC50aXRsZSc6ICdcdTY4MDdcdTk4OTgnLFxuICAgICdjaGFuZ2VzLmNvbC50eXBlJzogJ1x1N0M3Qlx1NTc4QicsXG4gICAgJ2NoYW5nZXMuY29sLnN0YXR1cyc6ICdcdTcyQjZcdTYwMDEnLFxuICAgICdjaGFuZ2VzLmNvbC51cGRhdGVkJzogJ1x1NjZGNFx1NjVCMFx1NjVGNlx1OTVGNCcsXG4gICAgJ2V4ZWMuY29sLnN0YXR1cyc6ICdcdTcyQjZcdTYwMDEnLFxuICAgICdleGVjLmNvbC5jaGFuZ2UnOiAnXHU1M0Q4XHU2NkY0JyxcbiAgICAnZXhlYy5jb2wuc3RhcnRlZCc6ICdcdTVGMDBcdTU5Q0InLFxuICAgICdleGVjLmNvbC5jb3N0JzogJ1x1NjIxMFx1NjcyQyhcdTRGMzApJyxcbiAgICAnZXhlYy5hdHRlbXB0cyc6ICdcdTVDMURcdThCRDVcdTZCMjFcdTY1NzAnLFxuICAgICdleGVjLmhpbnQnOiAnXHU2MjY3XHU4ODRDXHVGRjA4c3RhcnRfcnVuXHVGRjA5XHU4QkY3XHU1NzI4XHU1M0YzXHU0RkE3XHU4MDRBXHU1OTI5XHU0RTJEXHU1M0QxXHU4RDc3XHVGRjFBXHU1MjFCXHU1RUZBXHU4QkExXHU1MjEyXHU1NDBFXHU1QkY5IEFJIFx1OEJGNFx1MzAwQ1x1NUYwMFx1NTlDQlx1NjI2N1x1ODg0Q1x1OEJFNSBjaGFuZ2VcdTMwMERcdTMwMDJcdTY3MkNcdTk4NzVcdTY3RTVcdTc3MEJcdThGREJcdTVFQTZcdTRFMEVcdTdFRDNcdTY3OUNcdTMwMDInLFxuICAgICdzdGF0ZS5ub1J1bnMnOiAnXHU2NjgyXHU2NUUwXHU2MjY3XHU4ODRDXHU4QkIwXHU1RjU1XHUzMDAyJyxcbiAgICAnc3RhdGUudGVjaFN0YWNrJzogJ1x1NjI4MFx1NjcyRlx1NjgwOCcsXG4gICAgJ3N0YXRlLnN5bWJvbHMnOiAnXHU1REYyXHU3RDIyXHU1RjE1XHU3QjI2XHU1M0Y3JyxcbiAgICAnc3RhdGUubWFuaWZlc3RzJzogJ1x1NkUwNVx1NTM1NVx1NjU4N1x1NEVGNicsXG4gICAgJ3N0YXRlLmV2aWRlbmNlJzogJ1x1OEJDMVx1NjM2RVx1Njc2MVx1NzZFRScsXG4gIH0sXG4gIGVuOiB7XG4gICAgJ3dvcmtzcGFjZS50aXRsZSc6ICdSZXZpZXcgRGVzaycsXG4gICAgJ3RhYi5jb21taXRzJzogJ0NvbW1pdCBSZXZpZXcnLFxuICAgICd0YWIub3ZlcnZpZXcnOiAnT3ZlcnZpZXcnLFxuICAgICd0YWIuZXhlY3V0aW9uJzogJ0V4ZWN1dGlvbicsXG4gICAgJ3RhYi5yZXZpZXcnOiAnUmV2aWV3IGlzc3VlcycsXG4gICAgJ3RhYi5ub3Rlcyc6ICdOb3RlcyAmIE1lbW9yeScsXG4gICAgJ3RhYi5zZXR0aW5ncyc6ICdTZXR0aW5ncycsXG4gICAgJ2Vycm9yLmxvYWQnOiAnRmFpbGVkIHRvIGxvYWQnLFxuICAgICdzdGF0ZS5wcm9qZWN0JzogJ0N1cnJlbnQgcHJvamVjdCcsXG4gICAgJ3N0YXRlLm5vUHJvamVjdCc6ICdObyBwcm9qZWN0IGluaXRpYWxpemVkJyxcbiAgICAnc3RhdGUubm9Qcm9qZWN0SGludCc6ICdSdW4gXCJJbml0aWFsaXplIHByb2plY3RcIiB0byBzY2FuIHRoZSByZXBvc2l0b3J5IHN0cnVjdHVyZSwgdGVjaCBzdGFjaywgYW5kIHN5bWJvbCBpbmRleC4nLFxuICAgICdhY3Rpb24uYm9vdHN0cmFwJzogJ0luaXRpYWxpemUgcHJvamVjdCcsXG4gICAgJ2FjdGlvbi5yZXNjYW4nOiAnUmUtaW5pdGlhbGl6ZSAvIHNjYW4nLFxuICAgICdhY3Rpb24uYW5hbHl6ZSc6ICdBbmFseXplIHdvcmtpbmcgZGlmZicsXG4gICAgJ2FjdGlvbi5yZXZpZXcnOiAnUmV2aWV3IHdvcmtpbmcgZGlmZicsXG4gICAgJ2FjdGlvbi52ZXJpZnknOiAnVmVyaWZ5IHdvcmtpbmcgZGlmZicsXG4gICAgJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnOiAnQ3JlYXRlIGNoYW5nZScsXG4gICAgJ2FjdGlvbi5ydW5uaW5nJzogJ1J1bm5pbmdcdTIwMjYnLFxuICAgICdhY3Rpb24ucmVmcmVzaCc6ICdSZWZyZXNoJyxcbiAgICAnZm9ybS5jaGFuZ2VUaXRsZSc6ICdDaGFuZ2UgdGl0bGUnLFxuICAgICdmb3JtLmNoYW5nZURlc2MnOiAnUmVxdWlyZW1lbnQgYW5kIGJhY2tncm91bmQgKG9wdGlvbmFsKScsXG4gICAgJ3Jlc3VsdC5wYW5lbCc6ICdBY3Rpb24gcmVzdWx0JyxcblxuICAgICdyZXBvLmFkZCc6ICdBZGQgcmVwbycsXG4gICAgJ3JlcG8uYWRkSGludCc6ICdFbnRlciBhbiBhYnNvbHV0ZSByZXBvIHBhdGggYW5kIHByZXNzIEVudGVyOyBwcmV2aW91c2x5IHVzZWQgcmVwb3MgYXJlIHJlbWVtYmVyZWQnLFxuICAgICdyZXBvLnNjYW5IaXN0b3J5JzogJ1JlYnVpbGQgaGlzdG9yeScsXG4gICAgJ3JlcG8uY29tbWl0cyc6ICdjb21taXRzJyxcbiAgICAncmVwby5icmFuY2gnOiAnYnJhbmNoJyxcbiAgICAncmVwby53b3JraW5nJzogJ1VuY29tbWl0dGVkIGNoYW5nZXMnLFxuICAgICdyZXBvLndvcmtpbmdDbGVhbic6ICdXb3JraW5nIHRyZWUgaXMgY2xlYW4nLFxuICAgICdyZXBvLmVtcHR5JzogJ05vIGNvbW1pdHMuJyxcbiAgICAncmVwby5sb2FkRmFpbGVkJzogJ0ZhaWxlZCB0byBsb2FkIGNvbW1pdHMnLFxuICAgICdwaWNrZXIudGl0bGUnOiAnUGljayBjb21taXRzIHRvIHJldmlldyAobXVsdGktc2VsZWN0KScsXG4gICAgJ3BpY2tlci5wbGFjZWhvbGRlcic6ICdDbGljayB0byBwaWNrIGNvbW1pdHMgKG11bHRpLXNlbGVjdCwgaW5jbHVkZXMgdW5jb21taXR0ZWQpJyxcbiAgICAncGlja2VyLnNlbGVjdGVkJzogJ1NlbGVjdGVkJyxcbiAgICAncGlja2VyLmZpbHRlcic6ICdGaWx0ZXIgYnkgdGl0bGUvaGFzaC9hdXRob3JcdTIwMjYnLFxuICAgICdwaWNrZXIuY2xlYXInOiAnQ2xlYXInLFxuICAgICdwaWNrZXIubm9NYXRjaCc6ICdObyBtYXRjaGluZyBjb21taXQuJyxcbiAgICAncGlja2VyLmhpbnQnOiAnQ2hlY2tpbmcgYSBjb21taXQgZ2VuZXJhdGVzIGl0cyBBSSBleHBsYW5hdGlvbjsgcnVuIGltcGFjdCBhbmQgb3B0aW1hbGl0eSBiZWxvdy4nLFxuICAgICdpbXBhY3QuZmFjdG9ycyc6ICdSaXNrIGZhY3RvcnMgKHdoeSB0aGlzIGxldmVsKScsXG4gICAgJ2ltcGFjdC5wb2ludHMnOiAnSW1wYWN0ZWQgcG9pbnRzJyxcbiAgICAnaW1wYWN0LmtleVBvaW50cyc6ICdLZXkgY29tcG9uZW50cycsXG4gICAgJ2ltcGFjdC5tZW1vcnknOiAnQ3Jvc3MtY2hlY2sgd2l0aCBwcm9qZWN0IG1lbW9yeScsXG4gICAgJ2ltcGFjdC5mdW5jdGlvbnMnOiAnSW1wYWN0ZWQgZnVuY3Rpb25zICh3aG8gY2FsbHMgdGhlIGNoYW5nZWQgY29kZSknLFxuICAgICdpbXBhY3QuZnVuY1JvbGUnOiAnRnVuY3Rpb24gcm9sZScsXG4gICAgJ2ltcGFjdC5mdW5jQ2hhbmdlJzogJ0NoYW5nZWQgYnkgdGhpcyBjb21taXQnLFxuICAgICdpbXBhY3QuZnVuY0NhbGxlcnMnOiAnSW1wYWN0IG9uIGNhbGxlcnMnLFxuICAgICdjYWNoZS5oaXQnOiAnZnJvbSBjYWNoZScsXG4gICAgJ2NhY2hlLnJlZ2VuZXJhdGUnOiAnUmVnZW5lcmF0ZScsXG4gICAgJ2V4ZWMuY3JlYXRlJzogJ05ldyBydW4nLFxuICAgICdleGVjLmZvcm1UaXRsZSc6ICdXaGF0IHRvIGRvIChvbmUgbGluZSknLFxuICAgICdleGVjLmZvcm1EZXNjJzogJ1JlcXVpcmVtZW50OiBnb2FsLCBtb2R1bGVzLCBhY2NlcHRhbmNlJyxcbiAgICAnZXhlYy5zdGFydCc6ICdTdGFydCBydW4nLFxuICAgICdleGVjLnN0YXJ0aW5nJzogJ1N0YXJ0aW5nXHUyMDI2JyxcbiAgICAnZXhlYy5jcmVhdGVIaW50JzogJ0NyZWF0ZXMgYSBjaGFuZ2UsIGdlbmVyYXRlcyBhIHBsYW4sIHRoZW4gQUkgc3ViYWdlbnRzIGV4ZWN1dGUgc3RlcCBieSBzdGVwOyBwcm9ncmVzcyByZWZyZXNoZXMgYmVsb3cuJyxcbiAgICAnZXhlYy5jb2wuc3RlcHMnOiAnU3RlcHMnLFxuICAgICdub3Rlcy5lZGl0JzogJ0VkaXQnLFxuICAgICdub3Rlcy50b01lbW9yeSc6ICdUbyBtZW1vcnknLFxuICAgICdub3Rlcy50b01lbW9yeUhpbnQnOiAnUHJlZmlsbCB0aGUgbWVtb3J5IGZvcm0gYmVsb3cgd2l0aCB0aGlzIG5vdGUnLFxuICAgICdub3Rlcy50b01lbW9yeURvbmUnOiAnXHUyNzEzIFByZWZpbGxlZCB0aGUgbWVtb3J5IGZvcm0gKGNob29zZSBhIHR5cGUgaW4gdGhlIFByb2plY3QgbWVtb3J5IHpvbmUgYmVsb3csIHRoZW4gYWRkKScsXG4gICAgJ2RldGFpbC5zYXZlTm90ZSc6ICdTYXZlIGFzIG5vdGUnLFxuICAgICdkZXRhaWwuc2F2ZU5vdGVIaW50JzogJ1NhdmUgdGhpcyByZXZpZXcgY29uY2x1c2lvbiAod2hhdC9sb2dpYy9yaXNrcykgYXMgYSBzdHJ1Y3R1cmVkIG5vdGUnLFxuICAgICdkZXRhaWwuc2F2ZU5vdGVUaXRsZSc6ICdSZXZpZXcgcmVjb3JkJyxcbiAgICAnZGV0YWlsLnNhdmVNZW1vcnknOiAnRGlzdGlsbCB0byBtZW1vcnknLFxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeUhpbnQnOiAnRGlzdGlsbCB0aGlzIHJldmlldyBjb25jbHVzaW9uIGludG8gYSBwcm9qZWN0IG1lbW9yeSAocXVldWVkIGZvciBjb25maXJtYXRpb24pJyxcbiAgICAnbm90ZXMuc2F2ZSc6ICdTYXZlJyxcbiAgICAnbm90ZXMuY2FuY2VsJzogJ0NhbmNlbCcsXG4gICAgJ21lbW9yeS5icmFuY2hTY29wZSc6ICdCcmFuY2gnLFxuICAgICdtZW1vcnkuYnJhbmNoQWxsJzogJ0FsbCBicmFuY2hlcycsXG4gICAgJ25vdGVzLnNlYXJjaCc6ICdTZWFyY2ggbm90ZXNcdTIwMjYnLFxuICAgICdtb2RlbC50aXRsZSc6ICdNb2RlbCBhc3NpZ25tZW50ICh3aGljaCBtb2RlbCBwZXIgdGFzayknLFxuICAgICdtb2RlbC5sb2FkaW5nJzogJ0xvYWRpbmcgbW9kZWxzXHUyMDI2JyxcbiAgICAnbW9kZWwuZm9sbG93Q2hhdCc6ICdGb2xsb3cgY2hhdCBtb2RlbCcsXG4gICAgJ21vZGVsLnNhdmUnOiAnU2F2ZSAmIGFwcGx5JyxcbiAgICAnbW9kZWwuc2F2ZWQnOiAnQXBwbGllZCcsXG4gICAgJ21vZGVsLmhpbnQnOiAnQXBwbGllcyBpbW1lZGlhdGVseSBhbmQgcGVyc2lzdHMgYWNyb3NzIHJlc3RhcnRzOyBjaGF0IG1vZGVsIHVuYWZmZWN0ZWQuJyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5JzogJ0FJIHN1bW1hcnknLFxuICAgICdub3Rlcy5haVN1bW1hcnlSdW4nOiAnU3VtbWFyaXppbmdcdTIwMjYgKDEwLTMwcyknLFxuICAgICdub3Rlcy5leHBhbmQnOiAnRXhwYW5kJyxcbiAgICAnbm90ZXMuY29sbGFwc2UnOiAnQ29sbGFwc2UnLFxuICAgICdub3Rlcy5zdW1tYXJ5VGFnJzogJ0FJIHN1bW1hcnknLFxuICAgICdub3Rlcy5lbXB0eVNlYXJjaCc6ICdObyBtYXRjaGluZyBub3Rlcy4nLFxuICAgICdub3Rlcy5jb250ZW50SGludCc6ICdOb3RlIGNvbnRlbnQgKG11bHRpLWxpbmUpOiBjb25jbHVzaW9ucywgcXVlc3Rpb25zLCBsZWFybmluZ3NcdTIwMjYnLFxuICAgICdub3Rlcy50YWdzSGludCc6ICdUYWdzIChjb21tYSBzZXBhcmF0ZWQsIG9wdGlvbmFsOyBjbGljayBhIHRhZyB0byBmaWx0ZXIpJyxcbiAgICAnbm90ZXMucGluJzogJ1BpbicsXG4gICAgJ25vdGVzLnVucGluJzogJ1VucGluJyxcbiAgICAnbm90ZXMuZWRpdGVkQXQnOiAnZWRpdGVkJyxcbiAgICAncmV2aWV3LmZpbHRlckFsbCc6ICdBbGwnLFxuICAgICdyZXZpZXcuc3RhdHVzQWxsJzogJ0FsbCBzdGF0dXNlcycsXG4gICAgJ3Jldmlldy52ZXJpZnknOiAnUmUtdmVyaWZ5JyxcbiAgICAncmV2aWV3LnZlcmlmeVJ1bm5pbmcnOiAnVmVyaWZ5aW5nXHUyMDI2JyxcbiAgICAncmV2aWV3LnZlcmlmeUhpbnQnOiAnQWZ0ZXIgZml4aW5nIHRoZSBjb2RlLCBjbGljayB0byByZS1jaGVjazogd2hldGhlciBpc3N1ZXMgYXJlIGZpeGVkLCB3aGV0aGVyIHRoZSBjaGFuZ2UgaXMgb3B0aW1hbCBhbmQgbWluaW1hbGx5IGludmFzaXZlLCBhbmQgd2hldGhlciBuZXcgaXNzdWVzIGFwcGVhcmVkLiBPbmx5IGEgcGFzc2luZyByZS12ZXJpZmljYXRpb24gbWFya3MgaXNzdWVzIHJlc29sdmVkLicsXG4gICAgJ3Jldmlldy5maXhEZXRhaWwnOiAnRml4IGRldGFpbHMnLFxuICAgICdyZXZpZXcuZml4U3RhdEZpbGVzJzogJ2ZpbGVzJyxcbiAgICAncmV2aWV3LmZpeEZpbGVzJzogJ0ZpbGVzIHRvdWNoZWQgYnkgdGhlIGZpeCcsXG4gICAgJ3Jldmlldy5maXhJbXBhY3QnOiAnSW1wYWN0IHNjb3BlIChjaGFuZ2VkIHN5bWJvbHMgYW5kIGNhbGxlcnMpJyxcbiAgICAncmV2aWV3LmRlZmluZWRJbic6ICdkZWZpbmVkIGluJyxcbiAgICAncmV2aWV3LmNhbGxDb3VudCc6ICdjYWxsIHNpdGUocyknLFxuICAgICdyZXZpZXcuZml4RGlmZic6ICdGaXggZGlmZiAocmVsYXRpdmUgdG8gdGhlIHJldmlldyBiYXNlbGluZSknLFxuICAgICdyZXZpZXcucmVmcmVzaCc6ICdSZWZyZXNoJyxcbiAgICAncmV2aWV3LnJldGVudGlvbkhpbnQnOiAnUmVzb2x2ZWQgaXNzdWVzIGFyZSBhdXRvLXB1cmdlZCBhZnRlciB7ZGF5c30gZGF5KHMpJyxcbiAgICAncmV2aWV3LnRhcmdldCc6ICdUYXJnZXQnLFxuICAgICdyZXZpZXcud29ya2luZ1RhcmdldCc6ICdXb3JraW5nIHRyZWUnLFxuXG4gICAgJ3BsYW4udGl0bGUnOiAnT3JjaGVzdHJhdGlvbiBwbGFuJyxcbiAgICAncGxhbi5oaW50JzogJ0VhY2ggc3RlcCByb2xlIGRyaXZlcyBjb250ZXh0IGluamVjdGlvbiBhbmQgdGhlIGRlZmF1bHQgbW9kZWwgKGFuYWx5c2lzL29wcz1mYXN0LCBjb2Rpbmc9c3RhbmRhcmQsIHBsYW5uaW5nPXJlYXNvbmluZywgdmVyaWZpY2F0aW9uPXZlcmlmaWVyKTsgYWRqdXN0IGJlZm9yZSBsYXVuY2hpbmcuJyxcbiAgICAncGxhbi5jb2wuc3RlcCc6ICdTdGVwJywgJ3BsYW4uY29sLnJvbGUnOiAnUm9sZScsICdwbGFuLmNvbC5tb2RlbCc6ICdNb2RlbCcsICdwbGFuLmNvbC5wb2xpY3knOiAnRmFpbHVyZSBwb2xpY3knLCAncGxhbi5jb2wuZW5hYmxlZCc6ICdPbicsICdwbGFuLmNvbC5hdHRlbXB0cyc6ICdBdHRlbXB0cycsXG4gICAgJ3BsYW4ubW9kZWxEZWZhdWx0JzogJ1JvbGUgZGVmYXVsdCcsXG4gICAgJ3BsYW4ubGF1bmNoRWRpdGVkJzogJ1NhdmUgZWRpdHMgJiBsYXVuY2gnLFxuICAgICdwbGFuLmxhdW5jaERpcmVjdCc6ICdMYXVuY2ggYXMtaXMnLFxuICAgICdwbGFuLmRpc2NhcmQnOiAnRGlzY2FyZCcsXG4gICAgJ3BsYW4udmlld0RldGFpbCc6ICdEZXRhaWwnLCAncGxhbi5yZWZyZXNoRGV0YWlsJzogJ1JlZnJlc2gnLCAncGxhbi5jbG9zZURldGFpbCc6ICdDbG9zZScsXG4gICAgJ3BsYW4uZGV0YWlsVGl0bGUnOiAnUnVuIGRldGFpbCcsXG4gICAgJ3BsYW4ucGF1c2VkQmFubmVyJzogJ1J1biBwYXVzZWQsIGF3YWl0aW5nIHlvdXIgZGVjaXNpb24nLFxuICAgICdwbGFuLnJlc3VtZVJldHJ5JzogJ1JldHJ5IHN0ZXAgJiBjb250aW51ZScsXG4gICAgJ3BsYW4ucmVzdW1lU2tpcCc6ICdTa2lwIHN0ZXAgJiBjb250aW51ZScsXG4gICAgJ3BsYW4ucmVzdW1lRmFpbGVkJzogJ1Jlc3VtZSBmcm9tIGZhaWx1cmUnLFxuICAgICdwbGFuLmNvbnRleHRUaXRsZSc6ICdSdW4gY29udGV4dCAod2hhdCB3YXMgaW5qZWN0ZWQpJyxcbiAgICAncGxhbi5icmFuY2gnOiAnQnJhbmNoJywgJ3BsYW4uaW5qZWN0ZWRNZW1vcmllcyc6ICdJbmplY3RlZCBtZW1vcmllcycsICdwbGFuLmRlY2lzaW9uTG9nJzogJ0RlY2lzaW9uIGxvZycsXG4gICAgJ2V4ZWMuY29sLmRldGFpbCc6ICdEZXRhaWwnLFxuXG4gICAgJ3NjaGVkLnRpdGxlJzogJ1NjaGVkdWxlZCB0YXNrcycsXG4gICAgJ3NjaGVkLmZvcm1OYW1lJzogJ1Rhc2sgbmFtZScsICdzY2hlZC5mb3JtSW50ZXJ2YWwnOiAnSW50ZXJ2YWwgKG1pbnV0ZXMpJyxcbiAgICAnc2NoZWQudHlwZVJldmlldyc6ICdBdXRvIHJldmlldycsICdzY2hlZC50eXBlU3VtbWFyeSc6ICdBSSBzdW1tYXJ5JywgJ3NjaGVkLnR5cGVSdW4nOiAnVGltZWQgcnVuJyxcbiAgICAnc2NoZWQuYWRkJzogJ0NyZWF0ZScsXG4gICAgJ3NjaGVkLmhpbnQnOiAnUnVucyBhdXRvbWF0aWNhbGx5IHdoZW4gZHVlOiBhdXRvIHJldmlldyA9IHJldmlldyBjb21taXRzIGZyb20gdGhlIGxhc3QgMjRoIChpc3N1ZXMgbGFuZCBpbiB0aGUgUmV2aWV3IHRhYik7IEFJIHN1bW1hcnkgPSBpbmNyZW1lbnRhbCBsZWFybmluZyBzdW1tYXJ5OyB0aW1lZCBydW4gPSBleGVjdXRlIHRoZSB0ZW1wbGF0ZSBhcyBhbiBvcmNoZXN0cmF0ZWQgdGFzay4gTWluaW11bSAxIG1pbnV0ZS4nLFxuICAgICdzY2hlZC5lbXB0eSc6ICdObyBzY2hlZHVsZWQgdGFza3MgeWV0LicsXG4gICAgJ3NjaGVkLmNvbC5uYW1lJzogJ05hbWUnLCAnc2NoZWQuY29sLnR5cGUnOiAnVHlwZScsICdzY2hlZC5jb2wuaW50ZXJ2YWwnOiAnQ3ljbGUnLCAnc2NoZWQuY29sLm5leHQnOiAnTmV4dCBydW4nLCAnc2NoZWQuY29sLmxhc3RSZXN1bHQnOiAnTGFzdCByZXN1bHQnLCAnc2NoZWQuY29sLmFjdGlvbnMnOiAnQWN0aW9ucycsXG4gICAgJ3NjaGVkLmRheSc6ICcgZCcsICdzY2hlZC5ob3VyJzogJyBoJywgJ3NjaGVkLm1pbnV0ZSc6ICcgbWluJyxcbiAgICAnc2NoZWQuZGlzYWJsZSc6ICdQYXVzZScsICdzY2hlZC5lbmFibGUnOiAnRW5hYmxlJywgJ3NjaGVkLnJ1bk5vdyc6ICdSdW4gbm93JyxcblxuICAgICdtZW1vcnkuem9uZVRpdGxlJzogJ1Byb2plY3QgbWVtb3J5JyxcbiAgICAnbWVtb3J5LnN5bmNCYXNlbGluZSc6ICdTeW5jIGJhc2VsaW5lJywgJ21lbW9yeS5zeW5jTm9uZSc6ICduZXZlciBzeW5jZWQnLFxuICAgICdtZW1vcnkuYmVoaW5kJzogJ3tufSBjb21taXRzIGJlaGluZCcsXG4gICAgJ21lbW9yeS5zeW5jJzogJ1N5bmMgbWVtb3J5JywgJ21lbW9yeS5zeW5jaW5nJzogJ1N5bmNpbmdcdTIwMjYnLCAnbWVtb3J5LnN5bmNGYWlsZWQnOiAnU3luYyBmYWlsZWQnLFxuICAgICdtZW1vcnkuc3RhbGVUaXRsZSc6ICdQb3NzaWJseSBzdGFsZSAocmVsYXRlZCBjb2RlIGNoYW5nZWQ7IHJldmlldyBuZWVkZWQpJyxcbiAgICAnbWVtb3J5Lm1hcmtTdGFsZSc6ICdNYXJrIHN0YWxlJywgJ21lbW9yeS5hcmNoaXZlQnRuJzogJ0FyY2hpdmUnLCAnbWVtb3J5LmtlZXBBY3RpdmUnOiAnU3RpbGwgdmFsaWQnLFxuICAgICdtZW1vcnkubmV3Q2FuZGlkYXRlcyc6ICdOZXcgY2FuZGlkYXRlcyAocXVldWVkIGZvciBjb25maXJtYXRpb24pOicsXG4gICAgJ21lbW9yeS5jbG9zZVJlcG9ydCc6ICdDbG9zZSByZXBvcnQnLFxuICAgICdtZW1vcnkuc2NvcGVQcm9qZWN0JzogJ01haW5saW5lIChhbGwgYnJhbmNoZXMpJywgJ21lbW9yeS5zY29wZUJyYW5jaCc6ICdDdXJyZW50IGJyYW5jaCBvbmx5JyxcbiAgICAnbWVtb3J5LnBlbmRpbmdRdWV1ZSc6ICdQZW5kaW5nIGNvbmZpcm1hdGlvbicsXG4gICAgJ21lbW9yeS50b05vdGUnOiAnVG8gbm90ZScsICdtZW1vcnkubm9ybWFsaXplJzogJ05vcm1hbGl6ZSB0byBtYWlubGluZScsICdtZW1vcnkucmVzdG9yZSc6ICdSZXN0b3JlJyxcbiAgICAnbWVtb3J5LnN0YXR1c1N0YWxlJzogJ1N0YWxlJyxcbiAgICAnZnMuYnJvd3NlJzogJ0Jyb3dzZScsXG4gICAgJ2ZzLnVwJzogJ1VwJyxcbiAgICAnZnMudXNlJzogJ1VzZSB0aGlzIGRpcmVjdG9yeScsXG4gICAgJ2ZzLnJlZ2lzdGVyJzogJ0Fsc28gcmVnaXN0ZXIgYXMgc2Vzc2lvbiB3b3Jrc3BhY2UnLFxuICAgICdmcy5sb2FkaW5nJzogJ1JlYWRpbmdcdTIwMjYnLFxuICAgICdmcy5lbXB0eSc6ICdObyBzdWJkaXJlY3Rvcmllcy4nLFxuICAgICdpbXBhY3QuZnVuY3Rpb25zTm9uZSc6ICdObyBmdW5jdGlvbi1sZXZlbCBjYWxsIGltcGFjdCBkZXRlY3RlZCAoc3R5bGUvYXNzZXQvY29uZmlnLW9ubHkgY2hhbmdlKS4nLFxuICAgICdyZXZpZXcuY29sLnNldmVyaXR5JzogJ1NldmVyaXR5JyxcbiAgICAncmV2aWV3LmNvbC5jYXRlZ29yeSc6ICdDYXRlZ29yeScsXG4gICAgJ3Jldmlldy5jb2wudGl0bGUnOiAnSXNzdWUnLFxuICAgICdyZXZpZXcuY29sLmV2aWRlbmNlJzogJ0xvY2F0aW9uJyxcbiAgICAncmV2aWV3LmNvbC5maXgnOiAnU3VnZ2VzdGVkIGZpeCcsXG4gICAgJ3Jldmlldy5oaW50JzogJ0NsaWNrIHRoZSBidXR0b24gYWJvdmUgdG8gcHJvZHVjZSB0aGUgb3B0aW1hbGl0eSB2ZXJkaWN0IGFuZCBpc3N1ZSBsaXN0LicsXG4gICAgJ2RpZmYuc2hvdyc6ICdEaWZmJyxcbiAgICAnZGlmZi5oaWRlJzogJ0hpZGUgZGlmZicsXG5cbiAgICAnZGV0YWlsLnRpdGxlJzogJ1JldmlldyBkZXRhaWwnLFxuICAgICdkZXRhaWwucGljayc6ICdcdTIxOTAgUGljayBhIGNvbW1pdCAob3IgdGhlIHVuY29tbWl0dGVkIGNoYW5nZXMpIG9uIHRoZSBsZWZ0IHRvIHN0YXJ0IHJldmlld2luZycsXG4gICAgJ2RldGFpbC53aGF0JzogJ1doYXQgaXQgZG9lcycsXG4gICAgJ2RldGFpbC5sb2dpYyc6ICdJbXBsZW1lbnRhdGlvbiBsb2dpYycsXG4gICAgJ2RldGFpbC5yaXNrJzogJ1Jpc2tzJyxcbiAgICAnZGV0YWlsLmZpbGVzJzogJ0ZpbGVzJyxcbiAgICAnZGV0YWlsLnBhdGNoJzogJ1Nob3cgcmF3IHBhdGNoJyxcbiAgICAnZGV0YWlsLmFpTG9hZGluZyc6ICdHZW5lcmF0aW5nIEFJIGV4cGxhbmF0aW9uXHUyMDI2ICgxMC0zMHMpJyxcbiAgICAnZGV0YWlsLmltcGFjdCc6ICdJbXBhY3Qgc2NvcGUnLFxuICAgICdkZXRhaWwuaW1wYWN0TG9hZGluZyc6ICdTY2FubmluZyBpbXBhY3RcdTIwMjYgKHJlZmVyZW5jZSBzZWFyY2ggKyBncmFwaCB3YWxrKScsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5JzogJ09wdGltYWxpdHkgcmV2aWV3JyxcbiAgICAnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJzogJ1Jldmlld2luZ1x1MjAyNiAocHJvZHVjZXMgaXNzdWUgbGlzdCBhbmQgb3B0aW1hbGl0eSB2ZXJkaWN0KScsXG5cbiAgICAnaW1wYWN0LnJpc2snOiAnUmlzaycsXG4gICAgJ2ltcGFjdC5jb2wuY2hhbmdlZCc6ICdDaGFuZ2VkIGZpbGVzJyxcbiAgICAnaW1wYWN0LmNvbC5pbmRpcmVjdCc6ICdJbmRpcmVjdCAocmVmZXJlbmNlIGNoYWluKScsXG4gICAgJ2ltcGFjdC5jb2wucG90ZW50aWFsJzogJ1BvdGVudGlhbCcsXG4gICAgJ2ltcGFjdC5ub25lJzogJ05vIGluLXJlcG8gcmVmZXJlbmNlcnMgZm91bmQgKHRoZSBjaGFuZ2UgbG9va3Mgc2VsZi1jb250YWluZWQpLicsXG4gICAgJ2ltcGFjdC50ZXN0cyc6ICdSZWxhdGVkIHRlc3RzJyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5jaGFuZ2VkJzogJ2NoYW5nZWQnLFxuICAgICdpbXBhY3QubGVnZW5kLmluZGlyZWN0JzogJ2luZGlyZWN0JyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5wb3RlbnRpYWwnOiAncG90ZW50aWFsJyxcblxuICAgICdyZXZpZXcudmVyZGljdCc6ICdPcHRpbWFsaXR5IHZlcmRpY3QnLFxuICAgICdyZXZpZXcuaXNzdWVzJzogJ0lzc3VlcycsXG4gICAgJ3Jldmlldy5jbGVhbic6ICdObyBpc3N1ZXMgZm91bmQuJyxcblxuICAgICdub3Rlcy50aXRsZSc6ICdSZXZpZXcgbm90ZXMnLFxuICAgICdub3Rlcy5mb3JtVGl0bGUnOiAnTm90ZSB0aXRsZScsXG4gICAgJ25vdGVzLmZvcm1Db250ZW50JzogJ05vdGUgY29udGVudCAoY29uY2x1c2lvbnMsIHF1ZXN0aW9ucywgbGVhcm5pbmdzXHUyMDI2KScsXG4gICAgJ25vdGVzLmFkZCc6ICdBZGQgbm90ZScsXG4gICAgJ25vdGVzLmJvdW5kVG8nOiAnV2lsbCBiZSBsaW5rZWQgdG8nLFxuICAgICdub3Rlcy5jb2wudGltZSc6ICdUaW1lJyxcbiAgICAnbm90ZXMuY29sLnRpdGxlJzogJ1RpdGxlJyxcbiAgICAnbm90ZXMuY29sLmNvbnRlbnQnOiAnQ29udGVudCcsXG4gICAgJ25vdGVzLmNvbC5zaGEnOiAnQ29tbWl0JyxcbiAgICAnbm90ZXMucmVtb3ZlJzogJ0RlbGV0ZScsXG4gICAgJ25vdGVzLmVtcHR5JzogJ05vIG5vdGVzIHlldC4gTm90ZSBkb3duIGNvbmNsdXNpb25zIGFuZCBxdWVzdGlvbnMgd2hpbGUgcmV2aWV3aW5nIGNvbW1pdHMgXHUyMDE0IHRoYXQgaXMgeW91ciBwcm9qZWN0IGxlYXJuaW5nIGFyY2hpdmUuJyxcblxuICAgICdtZW1vcnkucmVjb3JkJzogJ1JlY29yZCBwcm9qZWN0IG1lbW9yeScsXG4gICAgJ2Zvcm0ubWVtb3J5VGl0bGUnOiAnTWVtb3J5IHRpdGxlJyxcbiAgICAnZm9ybS5tZW1vcnlDb250ZW50JzogJ01lbW9yeSBjb250ZW50ICh3aGF0IGFuZCB3aHkpJyxcbiAgICAnbWVtb3J5LmNvbC50aXRsZSc6ICdJdGVtJyxcbiAgICAnbWVtb3J5LmNvbC50eXBlJzogJ1R5cGUnLFxuICAgICdtZW1vcnkuY29sLnRydXRoJzogJ1RydXRoJyxcbiAgICAnbWVtb3J5LmNvbC5icmFuY2gnOiAnQnJhbmNoJyxcbiAgICAnbWVtb3J5LmNvbmZpcm0nOiAnQ29uZmlybScsXG4gICAgJ21lbW9yeS5lbXB0eSc6ICdObyBwcm9qZWN0IG1lbW9yaWVzIHlldC4gQXNrIHRoZSBBSSBpbiBjaGF0IHRvIHJlY29yZCBvbmUsIG9yIGFkZCBhYm92ZS4nLFxuICAgICdjb25jZXB0cy50aXRsZSc6ICdMZWFybmluZyBjb25jZXB0cycsXG4gICAgJ2NvbmNlcHRzLm5vbmUnOiAnTm8gbGVhcm5pbmcgY29uY2VwdHMgeWV0LiBUaGV5IGFjY3VtdWxhdGUgYWZ0ZXIgc3VjY2Vzc2Z1bCBjaGFuZ2UgcnVucywgb3IgYXNrIHRoZSBBSSB0byBzdW1tYXJpemUgbGVhcm5pbmcgcG9pbnRzLicsXG4gICAgJ2NvbmNlcHRzLmNvbC5uYW1lJzogJ0NvbmNlcHQnLFxuICAgICdjb25jZXB0cy5jb2wuY2F0ZWdvcnknOiAnQ2F0ZWdvcnknLFxuICAgICdjb25jZXB0cy5jb2wuY291bnQnOiAnQ291bnQnLFxuICAgICdyZXZpZXcucmVjb3Jkc1RpdGxlJzogJ1JldmlldyBpc3N1ZXMnLFxuICAgICdyZXZpZXcucmVjb3Jkc0VtcHR5JzogJ05vIGlzc3VlIHJlY29yZHMgeWV0LiBJc3N1ZXMgZm91bmQgYnkgdGhlIGNvbW1pdC1yZXZpZXcgcGFnZSBhcmUgcmVjb3JkZWQgaGVyZSBhdXRvbWF0aWNhbGx5OyByZS1yZXZpZXdpbmcgcmVwbGFjZXMgb2xkIHJlY29yZHMuJyxcbiAgICAndmVyaWZ5LnJlY29yZHMnOiAnVmVyaWZpY2F0aW9uIHJlY29yZHMnLFxuICAgICd2ZXJpZnkucmVjb3Jkc0VtcHR5JzogJ05vIHZlcmlmaWNhdGlvbiByZWNvcmRzIHlldC4gQ2xpY2sgXCJWZXJpZnlcIiBpbiB0aGUgZXhlY3V0aW9uIHRhYiB0byBnZW5lcmF0ZSBvbmUuJyxcblxuICAgICdjb25maXJtZWQudGl0bGUnOiAnQ29uZmlybWVkIGNvbnN0cmFpbnRzIChodW1hbi1jb25maXJtZWQ7IEFJIGVkaXRzIHRvIGZvcmJpZGRlbiBwYXRocyBhcmUgYXV0by1kZW5pZWQpJyxcbiAgICAnY29uZmlybWVkLmFkZCc6ICdBZGQgY29uc3RyYWludCcsXG4gICAgJ2NvbmZpcm1lZC50ZXh0JzogJ1JlcXVpcmVtZW50IC8gY29uc3RyYWludCB0ZXh0JyxcbiAgICAnY29uZmlybWVkLnBhdGhzJzogJ0ZvcmJpZGRlbiBwYXRocyAoY29tbWEgc2VwYXJhdGVkOyByZWxhdGl2ZSB0byBwcm9qZWN0IHJvb3QgbGlrZSBzcmMvY29yZSwgb3IgYWJzb2x1dGUpJyxcbiAgICAnY29uZmlybWVkLm5vbmUnOiAnTm8gY29uc3RyYWludHMgeWV0LiBPbmNlIGFkZGVkLCBBSSBlZGl0cyB0byBmb3JiaWRkZW4gcGF0aHMgaW4gdGhpcyBwcm9qZWN0IGFyZSBhdXRvLWRlbmllZC4nLFxuXG4gICAgJ2NoYW5nZXMudGl0bGUnOiAnQ2hhbmdlIHRhc2tzJyxcbiAgICAnc3RhdGUubm9DaGFuZ2VzJzogJ05vIGNoYW5nZSB0YXNrcyB5ZXQuIEFzayB0aGUgQUkgaW4gY2hhdCB0byBjcmVhdGUgb25lLCBvciB1c2UgXCJDcmVhdGUgY2hhbmdlXCIgYWJvdmUuJyxcbiAgICAnY2hhbmdlcy5jb2wudGl0bGUnOiAnVGl0bGUnLFxuICAgICdjaGFuZ2VzLmNvbC50eXBlJzogJ1R5cGUnLFxuICAgICdjaGFuZ2VzLmNvbC5zdGF0dXMnOiAnU3RhdHVzJyxcbiAgICAnY2hhbmdlcy5jb2wudXBkYXRlZCc6ICdVcGRhdGVkJyxcbiAgICAnZXhlYy5jb2wuc3RhdHVzJzogJ1N0YXR1cycsXG4gICAgJ2V4ZWMuY29sLmNoYW5nZSc6ICdDaGFuZ2UnLFxuICAgICdleGVjLmNvbC5zdGFydGVkJzogJ1N0YXJ0ZWQnLFxuICAgICdleGVjLmNvbC5jb3N0JzogJ0Nvc3QgKGVzdCknLFxuICAgICdleGVjLmF0dGVtcHRzJzogJ0F0dGVtcHRzJyxcbiAgICAnZXhlYy5oaW50JzogJ1J1bnMgKHN0YXJ0X3J1bikgYXJlIHN0YXJ0ZWQgZnJvbSBjaGF0OiBhZnRlciBhIHBsYW4gZXhpc3RzLCB0ZWxsIHRoZSBBSSB0byBcInN0YXJ0IHJ1biBmb3IgdGhlIGNoYW5nZVwiLiBUaGlzIHRhYiBzaG93cyBwcm9ncmVzcyBhbmQgcmVzdWx0cy4nLFxuICAgICdzdGF0ZS5ub1J1bnMnOiAnTm8gcnVucyB5ZXQuJyxcbiAgICAnc3RhdGUudGVjaFN0YWNrJzogJ1RlY2ggc3RhY2snLFxuICAgICdzdGF0ZS5zeW1ib2xzJzogJ0luZGV4ZWQgc3ltYm9scycsXG4gICAgJ3N0YXRlLm1hbmlmZXN0cyc6ICdNYW5pZmVzdHMnLFxuICAgICdzdGF0ZS5ldmlkZW5jZSc6ICdFdmlkZW5jZSBlbnRyaWVzJyxcbiAgfSxcbn0gYXMgY29uc3RcblxuZnVuY3Rpb24gZmFsbGJhY2tUKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgZGljdCA9IFdPUktTUEFDRV9ESUNULnpoIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbiAgcmV0dXJuIGRpY3Rba2V5XSA/PyBrZXlcbn1cblxuLyoqIFx1NjRDRFx1NEY1Q1x1N0VEM1x1Njc5Q1x1NEVCQVx1NjAyN1x1NTMxNlx1RkYxQVx1MjcxMy9cdTI3MTcgKyBcdTY4MDdcdTkxQ0ZcdTVCNTdcdTZCQjVcdTc2ODRcdTdEMjdcdTUxRDFcdTg4NENcdUZGMDhcdThERjNcdThGQzdcdTVENENcdTU5NTdcdTVCRjlcdThDNjFcdTRFMEVcdTUzOUZcdTU5Q0IgSlNPTlx1RkYwOVx1MzAwMiAqL1xuZnVuY3Rpb24gZm9ybWF0QWN0aW9uUmVzdWx0KGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogc3RyaW5nIHtcbiAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW2RhdGFbJ29rJ10gPT09IGZhbHNlID8gJ1x1MjcxNycgOiAnXHUyNzEzJ11cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YSkpIHtcbiAgICBpZiAoa2V5ID09PSAnb2snKSBjb250aW51ZVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIGxpbmVzLnB1c2goYCR7a2V5fVx1RkYxQSR7U3RyaW5nKHZhbHVlKS5zbGljZSgwLCAyMDApfWApXG4gICAgfVxuICB9XG4gIGlmIChsaW5lcy5sZW5ndGggPT09IDEpIGxpbmVzLnB1c2goJ1x1NjIxMFx1NTI5RicpXG4gIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKVxufVxuXG5jb25zdCBzdHlsZXM6IFJlY29yZDxzdHJpbmcsIFJlYWN0LkNTU1Byb3BlcnRpZXM+ID0ge1xuICByb290OiB7XG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxuICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBmb250RmFtaWx5OiAndmFyKC0tZHMtZm9udC1zYW5zLCBpbmhlcml0KScsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICB9LFxuICBuYXY6IHtcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgZ2FwOiAnNHB4JyxcbiAgICBwYWRkaW5nOiAnOHB4IDEycHgnLFxuICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwxLCByZ2JhKDUsNSw1LDAuMSkpJyxcbiAgICBmbGV4OiAnbm9uZScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXG4gIH0sXG4gIHRpdGxlOiB7IGZvbnRTaXplOiAnMTNweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luSW5saW5lRW5kOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9LFxuICB0YWI6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XG4gICAgcGFkZGluZzogJzVweCAxMnB4JyxcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxuICAgIGJvcmRlcjogJ25vbmUnLFxuICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgYmFja2dyb3VuZDogYWN0aXZlID8gJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgOiAndHJhbnNwYXJlbnQnLFxuICAgIGNvbG9yOiBhY3RpdmUgPyAnI2ZmZicgOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxuICB9KSxcbiAgYm9keTogeyBmbGV4OiAxLCBvdmVyZmxvd1k6ICdhdXRvJywgcGFkZGluZzogJzE0cHggMTZweCcgfSxcbiAgY2FyZDoge1xuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICBwYWRkaW5nOiAnMTJweCAxNHB4JyxcbiAgICBtYXJnaW5Cb3R0b206ICcxMnB4JyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJyxcbiAgfSxcbiAgcm93OiB7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMThweCcsIGZsZXhXcmFwOiAnd3JhcCcsIGZvbnRTaXplOiAnMTJweCcsIG1hcmdpbjogJzZweCAwJyB9LFxuICBsYWJlbDogeyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luSW5saW5lRW5kOiAnNnB4JyB9LFxuICB0YWJsZTogeyB3aWR0aDogJzEwMCUnLCBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJywgZm9udFNpemU6ICcxMnB4JyB9LFxuICB0aDogeyB0ZXh0QWxpZ246ICdzdGFydCcsIHBhZGRpbmc6ICc2cHggOHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDEsIHJnYmEoNSw1LDUsMC4xKSknLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZm9udFdlaWdodDogNTAwIH0sXG4gIHRkOiB7IHBhZGRpbmc6ICc2cHggOHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDMsIHJnYmEoNSw1LDUsMC4wNikpJyB9LFxuICBlbXB0eTogeyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZm9udFNpemU6ICcxMnB4JywgcGFkZGluZzogJzEwcHggNHB4JyB9LFxuICBidXR0b246IHtcbiAgICBwYWRkaW5nOiAnNXB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgZm9udFNpemU6ICcxMXB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsIGNvbG9yOiAnI2ZmZicsXG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIH0sXG4gIHNlY29uZGFyeToge1xuICAgIHBhZGRpbmc6ICc1cHggMTJweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzExcHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgfSxcbiAgaW5wdXQ6IHtcbiAgICB3aWR0aDogJzEwMCUnLCBwYWRkaW5nOiAnNnB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgfSxcbiAgZm9ybVJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICc2cHgnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH0sXG4gIHJlc3VsdDoge1xuICAgIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNixcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnMTBweCAxMnB4JywgbWF4SGVpZ2h0OiAnMzIwcHgnLCBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgfSxcbiAgYmFkZ2U6IChjb2xvcjogc3RyaW5nKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiB7XG4gICAgY29uc3QgcmdiID0gcGFyc2VDb2xvcihjb2xvcilcbiAgICBpZiAocmdiID09PSBudWxsKSB7XG4gICAgICByZXR1cm4geyBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgcGFkZGluZzogJzFweCA4cHgnLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnLCBiYWNrZ3JvdW5kOiBgJHtjb2xvcn0yMmAsIGNvbG9yIH1cbiAgICB9XG4gICAgY29uc3QgW3IsIGcsIGJdID0gcmdiXG4gICAgLy8gXHU1RTk1XHU4MjcyXHU3RURGXHU0RTAwIDE2JSBcdTgyNzJcdThDMDNcdUZGMUJcdTY1ODdcdTVCNTdcdTgyNzJcdTRFM0JcdTk4OThcdTgxRUFcdTkwMDJcdTVFOTRcdUZGMDhcdTZENDVcdTgyNzJcdTZERjFcdTUzMTZcdTUyMzBcdTc2N0RcdTVFOTVcdTUzRUZcdThCRkJcdUZGMDlcdTMwMDJcbiAgICByZXR1cm4ge1xuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsIHBhZGRpbmc6ICcxcHggOHB4JywgYm9yZGVyUmFkaXVzOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JyxcbiAgICAgIGJhY2tncm91bmQ6IGByZ2JhKCR7cn0sICR7Z30sICR7Yn0sIDAuMTYpYCxcbiAgICAgIGNvbG9yOiB0aGVtZUF3YXJlVGV4dChjb2xvciksXG4gICAgfVxuICB9LFxuICBzZWN0aW9uVGl0bGU6IHsgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEycHgnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH0sXG4gIHdoYXQ6IHsgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS43LCBtYXJnaW46ICc0cHggMCA4cHgnIH0sXG4gIGxvZ2ljU3RlcDogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjgsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9LFxuICByaXNrSXRlbTogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjcsIGNvbG9yOiAnIzlhNjcwMCcsIG1hcmdpbjogJzJweCAwJyB9LFxuICBjb21taXRSb3c6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XG4gICAgcGFkZGluZzogJzhweCAxMHB4JyxcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxuICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGJvcmRlcjogYWN0aXZlID8gJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIDogJzFweCBzb2xpZCB0cmFuc3BhcmVudCcsXG4gICAgYmFja2dyb3VuZDogYWN0aXZlID8gJ3JnYmEoMzcsOTksMjM1LDAuMDYpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgbWFyZ2luQm90dG9tOiAnNHB4JyxcbiAgfSksXG4gIGNvbW1pdFN1YmplY3Q6IHsgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwLCBsaW5lSGVpZ2h0OiAxLjUsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9LFxuICBjb21taXRNZXRhOiB7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Ub3A6ICcycHgnLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcgfSxcbiAgcGF0Y2g6IHtcbiAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4JywgbGluZUhlaWdodDogMS41LCB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxuICAgIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICcxMHB4JywgbWF4SGVpZ2h0OiAnMzIwcHgnLCBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgfSxcbiAgdGV4dGFyZWE6IHtcbiAgICB3aWR0aDogJzEwMCUnLCBwYWRkaW5nOiAnOHB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBib3hTaXppbmc6ICdib3JkZXItYm94JywgcmVzaXplOiAndmVydGljYWwnLCBsaW5lSGVpZ2h0OiAxLjcsIGZvbnRGYW1pbHk6ICdpbmhlcml0JyxcbiAgfSxcbiAgbm90ZUNhcmQ6IHtcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEpKScsXG4gICAgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzEycHggMTRweCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxuICB9LFxuICBub3RlVGl0bGVSb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsIGdhcDogJzhweCcgfSxcbiAgbm90ZVRpdGxlVGV4dDogeyBmb250U2l6ZTogJzEzcHgnLCBmb250V2VpZ2h0OiA2MDAsIGxpbmVIZWlnaHQ6IDEuNSB9LFxuICBub3RlQ29udGVudDoge1xuICAgIGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuODUsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLXdvcmQnLFxuICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJywgbWFyZ2luVG9wOiAnNnB4JyxcbiAgfSxcbiAgbm90ZUNsYW1wOiB7XG4gICAgZGlzcGxheTogJy13ZWJraXQtYm94JywgV2Via2l0TGluZUNsYW1wOiA2LCBXZWJraXRCb3hPcmllbnQ6ICd2ZXJ0aWNhbCcsIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgfSxcbiAgbm90ZU1ldGE6IHtcbiAgICBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnOHB4JyxcbiAgICBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyxcbiAgfSxcbiAgbGlua0J0bjoge1xuICAgIGJhY2tncm91bmQ6ICdub25lJywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzExcHgnLCBwYWRkaW5nOiAnMCcsXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLFxuICB9LFxuICBjaGlwOiAoYWN0aXZlOiBib29sZWFuKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiAoe1xuICAgIHBhZGRpbmc6ICcycHggMTBweCcsIGJvcmRlclJhZGl1czogJzk5OXB4JywgZm9udFNpemU6ICcxMXB4JywgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgY29sb3I6IGFjdGl2ZSA/ICcjZmZmJyA6ICdpbmhlcml0JyxcbiAgfSksXG59XG5cbi8qKiBcdTk4Q0VcdTk2NjlcdTdCNDlcdTdFQTcgXHUyMTkyIFx1NUZCRFx1N0FFMFx1OTg5Q1x1ODI3Mlx1MzAwMiAqL1xuY29uc3QgUklTS19DT0xPUjogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgbG93OiAnIzRlYzliMCcsIG1lZGl1bTogJyNkY2RjYWEnLCBoaWdoOiAnI2NlOTE3OCcsIGNyaXRpY2FsOiAnI2YxNGM0YycgfVxuXG4vKipcbiAqIFx1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNCBTVkcgXHU2RDQxXHU3QTBCXHU1NkZFXHVGRjFBXHU0RTA5XHU1MjE3XHU1MjA2XHU1QzQyXHVGRjA4XHU1M0Q4XHU2NkY0IFx1MjE5MiBcdTk1RjRcdTYzQTVcdTVGMTVcdTc1MjhcdTk0RkUgXHUyMTkyIFx1NkY1Q1x1NTcyOFx1RkYwOVx1RkYwQ1xuICogXHU0RjlEXHU2MzZFIC9pbXBhY3Qtc2NvcGUgXHU4RkQ0XHU1NkRFXHU3Njg0IGxldmVsc1x1RkYwOFx1NTQyQlx1NEYyMFx1NjRBRFx1OTRGRSByZWFzb25cdUZGMDlcdTdFRDhcdTUyMzZcdThGREVcdTdFQkZcdTMwMDJcbiAqIFx1NTE2OFx1NUJCRFx1NzUzQlx1NUUwM1x1RkYwOHZpZXdCb3ggMTAwMFx1RkYwOVx1RkYwQ1x1ODI4Mlx1NzBCOVx1NUUyNlx1NzZFRVx1NUY1NVx1NjNEMFx1NzkzQVx1RkYwQ1x1NkRGMVx1NUVBNlx1OEQ4QVx1NkRGMVx1OTg5Q1x1ODI3Mlx1OEQ4QVx1NkQ0NVx1MzAwMlxuICovXG5mdW5jdGlvbiBJbXBhY3RHcmFwaChwcm9wczogeyBkYXRhOiBJbXBhY3RTY29wZVBheWxvYWQ7IHQ6IChrZXk6IHN0cmluZykgPT4gc3RyaW5nIH0pIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBwcm9wc1xuICBjb25zdCBpbmRpcmVjdCA9IGRhdGEubGV2ZWxzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5sZXZlbCA9PT0gJ2luZGlyZWN0JylcbiAgY29uc3QgcG90ZW50aWFsID0gZGF0YS5sZXZlbHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmxldmVsID09PSAncG90ZW50aWFsJylcbiAgY29uc3QgY29sMCA9IGRhdGEuY2hhbmdlZEZpbGVzLnNsaWNlKDAsIDcpXG4gIGNvbnN0IGNvbDEgPSBBcnJheS5mcm9tKG5ldyBTZXQoaW5kaXJlY3QubWFwKChpdGVtKSA9PiBpdGVtLnBhdGgpKSkuc2xpY2UoMCwgOSlcbiAgY29uc3QgY29sMiA9IEFycmF5LmZyb20obmV3IFNldChwb3RlbnRpYWwubWFwKChpdGVtKSA9PiBpdGVtLnBhdGgpKSkuZmlsdGVyKChwKSA9PiAhY29sMS5pbmNsdWRlcyhwKSkuc2xpY2UoMCwgOClcbiAgY29uc3Qgbm9kZUggPSAzMFxuICBjb25zdCBnYXAgPSAxMFxuICBjb25zdCBjb2xYID0gWzMwLCAzODAsIDcyMF1cbiAgY29uc3QgY29sVyA9IDI4MFxuICBjb25zdCByb3dzID0gTWF0aC5tYXgoY29sMC5sZW5ndGgsIGNvbDEubGVuZ3RoLCBjb2wyLmxlbmd0aCwgMSlcbiAgY29uc3QgaGVpZ2h0ID0gcm93cyAqIChub2RlSCArIGdhcCkgKyA2MFxuXG4gIGNvbnN0IGRlcHRoT2YgPSAocGF0aDogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBpdGVtID0gaW5kaXJlY3QuZmluZCgoZW50cnkpID0+IGVudHJ5LnBhdGggPT09IHBhdGgpID8/IHBvdGVudGlhbC5maW5kKChlbnRyeSkgPT4gZW50cnkucGF0aCA9PT0gcGF0aClcbiAgICByZXR1cm4gaXRlbT8uZGVwdGggPz8gMFxuICB9XG5cbiAgY29uc3QgcmVuZGVyQ29sID0gKGNvbDogbnVtYmVyLCBpdGVtczogc3RyaW5nW10sIGNvbG9yOiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSA9PiBpdGVtcy5tYXAoKHBhdGgsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgeSA9IDQ0ICsgaW5kZXggKiAobm9kZUggKyBnYXApXG4gICAgY29uc3QgZGlyID0gcGF0aC5pbmNsdWRlcygnLycpID8gcGF0aC5zbGljZSgwLCBwYXRoLmxhc3RJbmRleE9mKCcvJykpIDogJydcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZycsIHsga2V5OiBgJHtjb2x9LSR7cGF0aH1gIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdyZWN0JywgeyB4OiBjb2xYW2NvbF0sIHksIHdpZHRoOiBjb2xXLCBoZWlnaHQ6IG5vZGVILCByeDogNiwgZmlsbDogY29sb3IsIHN0cm9rZTogJ3JnYmEoMCwwLDAsMC4zKScsIHN0cm9rZVdpZHRoOiAxIH0pLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGV4dCcsIHsgeDogY29sWFtjb2xdICsgMTAsIHk6IHkgKyAxNCwgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA3MDAsIGZpbGw6ICcjZmZmZmZmJyB9LFxuICAgICAgICAocGF0aC5zcGxpdCgnLycpLnBvcCgpID8/IHBhdGgpLnNsaWNlKDAsIDMwKSksXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyB4OiBjb2xYW2NvbF0gKyAxMCwgeTogeSArIDI2LCBmb250U2l6ZTogMTAsIGZpbGw6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpJyB9LFxuICAgICAgICBkaXIuc2xpY2UoMCwgNDApKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3RpdGxlJywgbnVsbCwgcGF0aCksXG4gICAgKVxuICB9KVxuXG4gIGNvbnN0IGNoYWluU3RhcnQgPSAocmVhc29uOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IG1hdGNoID0gcmVhc29uLm1hdGNoKC9wYXRoOiAoLispJC8pXG4gICAgaWYgKG1hdGNoID09PSBudWxsKSByZXR1cm4gZGF0YS5jaGFuZ2VkRmlsZXNbMF0gPz8gJydcbiAgICByZXR1cm4gbWF0Y2hbMV0hLnNwbGl0KCcgLT4gJylbMF0gPz8gZGF0YS5jaGFuZ2VkRmlsZXNbMF0gPz8gJydcbiAgfVxuICBjb25zdCBpbmRleEluID0gKGl0ZW1zOiBzdHJpbmdbXSwgcGF0aDogc3RyaW5nKTogbnVtYmVyID0+IGl0ZW1zLmluZGV4T2YocGF0aClcbiAgY29uc3QgY29sT2YgPSAocGF0aDogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICBpZiAoY29sMC5pbmNsdWRlcyhwYXRoKSkgcmV0dXJuIDBcbiAgICBpZiAoY29sMS5pbmNsdWRlcyhwYXRoKSkgcmV0dXJuIDFcbiAgICBpZiAoY29sMi5pbmNsdWRlcyhwYXRoKSkgcmV0dXJuIDJcbiAgICByZXR1cm4gLTFcbiAgfVxuXG4gIGNvbnN0IGVkZ2VzOiBSZWFjdC5SZWFjdE5vZGVbXSA9IFtdXG4gIGNvbnN0IHB1c2hFZGdlID0gKGZyb21QYXRoOiBzdHJpbmcsIHRvUGF0aDogc3RyaW5nLCBjb2xvcjogc3RyaW5nLCBrZXk6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGZyb21Db2wgPSBjb2xPZihmcm9tUGF0aClcbiAgICBjb25zdCB0b0NvbCA9IGNvbE9mKHRvUGF0aClcbiAgICBpZiAoZnJvbUNvbCA9PT0gLTEgfHwgdG9Db2wgPT09IC0xIHx8IHRvQ29sIDw9IGZyb21Db2wpIHJldHVyblxuICAgIGNvbnN0IHgxID0gY29sWFtmcm9tQ29sXSArIGNvbFdcbiAgICBjb25zdCB5MSA9IDQ0ICsgaW5kZXhJbihbY29sMCwgY29sMSwgY29sMl1bZnJvbUNvbF0gPz8gW10sIGZyb21QYXRoKSAqIChub2RlSCArIGdhcCkgKyBub2RlSCAvIDJcbiAgICBjb25zdCB4MiA9IGNvbFhbdG9Db2xdXG4gICAgY29uc3QgeTIgPSA0NCArIGluZGV4SW4oW2NvbDAsIGNvbDEsIGNvbDJdW3RvQ29sXSA/PyBbXSwgdG9QYXRoKSAqIChub2RlSCArIGdhcCkgKyBub2RlSCAvIDJcbiAgICBlZGdlcy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3BhdGgnLCB7XG4gICAgICBrZXksIGQ6IGBNICR7eDF9ICR7eTF9IEMgJHt4MSArIDMwfSAke3kxfSwgJHt4MiAtIDMwfSAke3kyfSwgJHt4Mn0gJHt5Mn1gLFxuICAgICAgZmlsbDogJ25vbmUnLCBzdHJva2U6IGNvbG9yLCBzdHJva2VXaWR0aDogMS42LCBvcGFjaXR5OiAwLjYsXG4gICAgfSkpXG4gIH1cbiAgZm9yIChjb25zdCBpdGVtIG9mIGluZGlyZWN0LnNsaWNlKDAsIDIwKSkgcHVzaEVkZ2UoY2hhaW5TdGFydChpdGVtLnJlYXNvbiksIGl0ZW0ucGF0aCwgJyNkOTc3MDYnLCBgZWktJHtpdGVtLnBhdGh9YClcbiAgZm9yIChjb25zdCBpdGVtIG9mIHBvdGVudGlhbC5zbGljZSgwLCAxNikpIHB1c2hFZGdlKGNoYWluU3RhcnQoaXRlbS5yZWFzb24pLCBpdGVtLnBhdGgsICcjNTc2MDZhJywgYGVwLSR7aXRlbS5wYXRofWApXG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIG51bGwsXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3ZnJywgeyB3aWR0aDogJzEwMCUnLCB2aWV3Qm94OiBgMCAwIDEwMjQgJHtoZWlnaHR9YCwgc3R5bGU6IHsgbWF4SGVpZ2h0OiA0ODAgfSB9LFxuICAgICAgW1snXHU1M0Q4XHU2NkY0XHU2NTg3XHU0RUY2JywgMF0sIFsnXHU5NUY0XHU2M0E1XHU1RjcxXHU1NENEXHVGRjA4XHU4QzAxXHU1RjE1XHU3NTI4XHU0RTg2XHU1QjgzXHVGRjA5JywgMV0sIFsnXHU2RjVDXHU1NzI4XHU1RjcxXHU1NENEXHVGRjA4XHU0RThDXHU3RUE3XHU0RjIwXHU2NEFEXHVGRjA5JywgMl1dLm1hcCgoW25hbWUsIGNvbF0pID0+XG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3RleHQnLCB7IGtleTogU3RyaW5nKGNvbCksIHg6IGNvbFhbY29sIGFzIG51bWJlcl0sIHk6IDI0LCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgZmlsbDogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSwgbmFtZSBhcyBzdHJpbmcpKSxcbiAgICAgIHJlbmRlckNvbCgwLCBjb2wwLCAnIzI1NjNlYicpLFxuICAgICAgcmVuZGVyQ29sKDEsIGNvbDEsICcjZDk3NzA2JyksXG4gICAgICByZW5kZXJDb2woMiwgY29sMiwgJyM1NzYwNmEnKSxcbiAgICAgIGVkZ2VzLFxuICAgICksXG4gIClcbn1cblxuY29uc3QgRElGRl9LRVlXT1JEUyA9IC9cXGIocHVibGljfHByaXZhdGV8cHJvdGVjdGVkfGludGVybmFsfHN0YXRpY3x2b2lkfGNsYXNzfHN0cnVjdHxpbnRlcmZhY2V8ZW51bXxuZXd8cmV0dXJufGlmfGVsc2V8Zm9yfGZvcmVhY2h8d2hpbGV8c3dpdGNofGNhc2V8YnJlYWt8Y29udGludWV8dHJ5fGNhdGNofGZpbmFsbHl8dGhyb3d8dXNpbmd8bmFtZXNwYWNlfGltcG9ydHxleHBvcnR8ZnJvbXxjb25zdHxsZXR8dmFyfGFzeW5jfGF3YWl0fGZ1bmN0aW9ufHRoaXN8YmFzZXxzdXBlcnxudWxsfHRydWV8ZmFsc2V8b3ZlcnJpZGV8dmlydHVhbHxhYnN0cmFjdHxzZWFsZWR8cmVhZG9ubHl8cGFyYW1zfG91dHxyZWZ8eWllbGR8dHlwZW9mfGluc3RhbmNlb2Z8aW58b2Z8ZGVmYXVsdHxzdHJpbmd8aW50fGxvbmd8ZG91YmxlfGZsb2F0fGJvb2x8Y2hhcnxkZWNpbWFsfG9iamVjdHxyZWNvcmR8cGFydGlhbHxnZXR8c2V0fHJlcXVpcmV8bW9kdWxlfHR5cGV8aW1wbGVtZW50c3xleHRlbmRzKVxcYi9nXG5cbi8qKiBcdTUzNTVcdTg4NENcdTRFRTNcdTc4MDFcdTlBRDhcdTRFQUVcdUZGMUFcdTZDRThcdTkxQ0EgPiBcdTVCNTdcdTdCMjZcdTRFMzIgPiBcdTUxNzNcdTk1MkVcdTVCNTcvXHU2NTcwXHU1QjU3IFx1NEUwOVx1NUM0Mlx1Nzc0MFx1ODI3Mlx1RkYwOFx1OEY3Qlx1OTFDRlx1NkI2M1x1NTIxOVx1RkYwQ1x1NTkxRlx1NjgzOFx1NjdFNVx1NzUyOFx1RkYwOVx1MzAwMiAqL1xuZnVuY3Rpb24gaGlnaGxpZ2h0Q29kZUxpbmUobGluZTogc3RyaW5nLCBrZXlQcmVmaXg6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdIHtcbiAgY29uc3QgdHJpbW1lZCA9IGxpbmUudHJpbVN0YXJ0KClcbiAgaWYgKHRyaW1tZWQuc3RhcnRzV2l0aCgnLy8nKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJy8vLycpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnKicpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnLyonKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJyMnKSkge1xuICAgIHJldHVybiBbUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsga2V5OiBgJHtrZXlQcmVmaXh9LWNgLCBzdHlsZTogeyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyM2YTk5NTUnKSB9IH0sIGxpbmUpXVxuICB9XG4gIGNvbnN0IHBhcnRzID0gbGluZS5zcGxpdCgvKFwiKD86W15cIlxcXFxdfFxcXFwuKSpcInwnKD86W14nXFxcXF18XFxcXC4pKid8YCg/OlteYFxcXFxdfFxcXFwuKSpgKS9nKVxuICByZXR1cm4gcGFydHMubWFwKChwYXJ0LCBpKSA9PiB7XG4gICAgaWYgKGkgJSAyID09PSAxKSByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsga2V5OiBgJHtrZXlQcmVmaXh9LXMke2l9YCwgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2U5MTc4JykgfSB9LCBwYXJ0KVxuICAgIGNvbnN0IHN1YjogUmVhY3QuUmVhY3ROb2RlW10gPSBbXVxuICAgIGxldCBsYXN0ID0gMFxuICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgcGFydC5tYXRjaEFsbChESUZGX0tFWVdPUkRTKSkge1xuICAgICAgaWYgKG1hdGNoLmluZGV4ISA+IGxhc3QpIHN1Yi5wdXNoKHBhcnQuc2xpY2UobGFzdCwgbWF0Y2guaW5kZXgpKVxuICAgICAgc3ViLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsga2V5OiBgJHtrZXlQcmVmaXh9LWske2l9LSR7bWF0Y2guaW5kZXh9YCwgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjNTY5Y2Q2JykgfSB9LCBtYXRjaFswXSkpXG4gICAgICBsYXN0ID0gbWF0Y2guaW5kZXghICsgbWF0Y2hbMF0ubGVuZ3RoXG4gICAgfVxuICAgIGlmIChsYXN0IDwgcGFydC5sZW5ndGgpIHN1Yi5wdXNoKHBhcnQuc2xpY2UobGFzdCkpXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIHsga2V5OiBgJHtrZXlQcmVmaXh9LXAke2l9YCB9LCBzdWIpXG4gIH0pXG59XG5cbi8qKiBcdTlBRDhcdTRFQUVcdTVERUVcdTVGMDJcdTg5QzZcdTU2RkVcdUZGMUFcdTg5RTNcdTY3OTAgdW5pZmllZCBkaWZmXHVGRjBDXHU2MzA5IFx1NTg5RS9cdTUyMjAvXHU1NzU3XHU1OTM0L1x1NEUwQVx1NEUwQlx1NjU4NyBcdTc3NDBcdTgyNzJcdTMwMDIgKi9cbmZ1bmN0aW9uIERpZmZWaWV3KHByb3BzOiB7IHBhdGNoOiBzdHJpbmcgfSkge1xuICBjb25zdCBsaW5lcyA9IHByb3BzLnBhdGNoLnNwbGl0KCdcXG4nKS5maWx0ZXIoKGxpbmUsIGkpID0+ICEobGluZSA9PT0gJycgJiYgaSA9PT0gcHJvcHMucGF0Y2guc3BsaXQoJ1xcbicpLmxlbmd0aCAtIDEpKVxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgIHN0eWxlOiB7XG4gICAgICBmb250RmFtaWx5OiAnQ29uc29sYXMsIG1vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIGxpbmVIZWlnaHQ6IDEuNTUsXG4gICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMCcsIG1heEhlaWdodDogNDIwLCBvdmVyZmxvd1k6ICdhdXRvJywgbWFyZ2luVG9wOiAnNnB4JyxcbiAgICB9LFxuICB9LCBsaW5lcy5tYXAoKGxpbmUsIGkpID0+IHtcbiAgICBjb25zdCBraW5kID0gbGluZS5zdGFydHNXaXRoKCcrKysnKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJy0tLScpID8gJ21ldGEnXG4gICAgICA6IGxpbmUuc3RhcnRzV2l0aCgnQEAnKSA/ICdodW5rJ1xuICAgICAgICA6IGxpbmUuc3RhcnRzV2l0aCgnKycpID8gJ2FkZCdcbiAgICAgICAgICA6IGxpbmUuc3RhcnRzV2l0aCgnLScpID8gJ2RlbCcgOiAnY3R4J1xuICAgIGNvbnN0IGJnID0ga2luZCA9PT0gJ2FkZCcgPyAncmdiYSg0NiwxNjAsNjcsMC4xNCknIDoga2luZCA9PT0gJ2RlbCcgPyAncmdiYSgyNDgsODEsNzMsMC4xMyknIDoga2luZCA9PT0gJ2h1bmsnID8gJ3JnYmEoNTYsMTM5LDI1MywwLjEpJyA6ICd0cmFuc3BhcmVudCdcbiAgICBjb25zdCBjb250ZW50ID0ga2luZCA9PT0gJ21ldGEnIHx8IGtpbmQgPT09ICdodW5rJ1xuICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBzdHlsZTogeyBjb2xvcjogJyMwOTY5ZGEnLCBmb250V2VpZ2h0OiA2MDAgfSB9LCBsaW5lKVxuICAgICAgOiBraW5kID09PSAnYWRkJyB8fCBraW5kID09PSAnZGVsJ1xuICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IHN0eWxlOiB7IGNvbG9yOiBraW5kID09PSAnYWRkJyA/ICcjMWE3ZjM3JyA6ICcjY2YyMjJlJywgZm9udFdlaWdodDogNjAwIH0gfSwgbGluZVswXSlcbiAgICAgICAgOiBudWxsXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsga2V5OiBpLCBzdHlsZTogeyBwYWRkaW5nOiAnMCAxMHB4JywgYmFja2dyb3VuZDogYmcsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfSB9LFxuICAgICAgY29udGVudCxcbiAgICAgIGtpbmQgPT09ICdhZGQnIHx8IGtpbmQgPT09ICdkZWwnID8gaGlnaGxpZ2h0Q29kZUxpbmUobGluZS5zbGljZSgxKSwgYGwke2l9YCkgOiBoaWdobGlnaHRDb2RlTGluZShsaW5lLCBgbCR7aX1gKSxcbiAgICApXG4gIH0pKVxufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiAnXHUyMDE0J1xuICByZXR1cm4gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlU3RyaW5nKClcbn1cblxuLyoqIFx1NEU4Q1x1NkIyMVx1Nzg2RVx1OEJBNFx1NUYzOVx1N0E5N1x1RkYxQVx1OTA2RVx1N0Y2OSArIFx1NUM0NVx1NEUyRFx1NTM2MVx1NzI0N1x1RkYwQ1x1NTM3MVx1OTY2OVx1NjRDRFx1NEY1Q1x1RkYwOFx1NTIyMFx1OTY2NFx1N0IxNFx1OEJCMC9cdTUzRDhcdTY2RjQvXHU3RUE2XHU2NzVGXHVGRjA5XHU1MTcxXHU3NTI4XHUzMDAyICovXG5mdW5jdGlvbiBDb25maXJtRGlhbG9nKHByb3BzOiB7IHRpdGxlOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZzsgZGFuZ2VyPzogYm9vbGVhbjsgb25DYW5jZWw6ICgpID0+IHZvaWQ7IG9uQ29uZmlybTogKCkgPT4gdm9pZCB9KSB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLW92ZXJsYXknLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCB6SW5kZXg6IDk5OSxcbiAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMTUsMjMsNDIsMC40NSknLCBiYWNrZHJvcEZpbHRlcjogJ2JsdXIoMnB4KScsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgYW5pbWF0aW9uOiAncGNGYWRlSW4gMC4xNXMgZWFzZS1vdXQnLFxuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ2FuY2VsLFxuICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLWNhcmQnLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHdpZHRoOiA0MDAsIG1heFdpZHRoOiAnY2FsYygxMDB2dyAtIDQ4cHgpJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JywgYm94U2hhZG93OiAnMCAyMHB4IDUwcHggcmdiYSgwLDAsMCwwLjI1KScsXG4gICAgICAgICAgcGFkZGluZzogJzIwcHggMjJweCAxNnB4JyxcbiAgICAgICAgICBvbkNsaWNrOiAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCBnYXA6ICcxMHB4JyB9IH0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgd2lkdGg6IDM0LCBoZWlnaHQ6IDM0LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBmbGV4U2hyaW5rOiAwLFxuICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnMTdweCcsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHByb3BzLmRhbmdlciA/ICdyZ2JhKDI0NCw2Myw5NCwwLjEyKScgOiAncmdiYSgzNyw5OSwyMzUsMC4xKScsXG4gICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5kYW5nZXIgPyAnI2UxMWQ0OCcgOiAnIzI1NjNlYicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sIHByb3BzLmRhbmdlciA/ICchJyA6ICc/JyksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICc2cHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSB9LCBwcm9wcy50aXRsZSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfSB9LCBwcm9wcy5tZXNzYWdlKSxcbiAgICAgICAgICApLFxuICAgICAgICApLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsIGdhcDogJzEwcHgnLCBtYXJnaW5Ub3A6ICcxOHB4JyB9IH0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xuICAgICAgICAgICAgc3R5bGU6IHsgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzdweCAxOHB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JyB9LFxuICAgICAgICAgICAgb25DbGljazogcHJvcHMub25DYW5jZWwsXG4gICAgICAgICAgfSwgJ1x1NTNENlx1NkQ4OCcpLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcbiAgICAgICAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLW9rJyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc3cHggMThweCcsIGJvcmRlclJhZGl1czogJzhweCcsIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNTAwLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBwcm9wcy5kYW5nZXIgPyAnI2UxMWQ0OCcgOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJywgY29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5vbkNvbmZpcm0sXG4gICAgICAgICAgfSwgJ1x1Nzg2RVx1OEJBNFx1NTIyMFx1OTY2NCcpLFxuICAgICAgICApLFxuICAgICAgKSxcbiAgICApLFxuICApXG59XG5cbi8qKiBcdTlBQThcdTY3QjZcdTVDMEZcdTUzNjFcdTcyNDdcdTMwMDIgKi9cbmZ1bmN0aW9uIENhcmQocHJvcHM6IHsgdGl0bGU/OiBzdHJpbmc7IGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlIH0pIHtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5jYXJkIH0sXG4gICAgcHJvcHMudGl0bGUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiBzdHlsZXMuc2VjdGlvblRpdGxlIH0sIHByb3BzLnRpdGxlKSxcbiAgICBwcm9wcy5jaGlsZHJlbilcbn1cblxuLyoqXG4gKiBcdTVERTVcdTRGNUNcdTUzRjBcdTRFM0JcdTdFQzRcdTRFRjZcdUZGMUFcdTU2REJcdTk4NzVcdTdCN0VcdUZGMDhcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTRFM0FcdTlFRDhcdThCQTRcdUZGMDkrIFx1OEY2RVx1OEJFMlx1NUJCRlx1NEUzQiBBUEkgKyBcdTYzMDlcdTk0QUVcdTUzMTZcdTY0Q0RcdTRGNUNcdTMwMDJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFdvcmtzcGFjZUZyYW1lKHByb3BzOiBXb3Jrc3BhY2VGcmFtZVByb3BzKSB7XG4gIGNvbnN0IHQgPSBwcm9wcy50ID8/IGZhbGxiYWNrVFxuICBjb25zdCBbdGFiLCBzZXRUYWJdID0gdXNlU3RhdGU8VGFiS2V5PignY29tbWl0cycpXG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGU8V29ya3NwYWNlU3RhdGUgfCBudWxsPihudWxsKVxuICBjb25zdCBbbG9hZEVycm9yLCBzZXRMb2FkRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2Jvb3RzdHJhcHBpbmcsIHNldEJvb3RzdHJhcHBpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFthY3Rpb25SZXN1bHQsIHNldEFjdGlvblJlc3VsdF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbY2hhbmdlVGl0bGUsIHNldENoYW5nZVRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbY2hhbmdlRGVzYywgc2V0Q2hhbmdlRGVzY10gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW21lbW9yeVRpdGxlLCBzZXRNZW1vcnlUaXRsZV0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW21lbW9yeUNvbnRlbnQsIHNldE1lbW9yeUNvbnRlbnRdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtjb25maXJtZWRUZXh0LCBzZXRDb25maXJtZWRUZXh0XSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbY29uZmlybWVkUGF0aHMsIHNldENvbmZpcm1lZFBhdGhzXSA9IHVzZVN0YXRlKCcnKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTcyQjZcdTYwMDEgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IFtjb21taXRzRGF0YSwgc2V0Q29tbWl0c0RhdGFdID0gdXNlU3RhdGU8Q29tbWl0c1BheWxvYWQgfCBudWxsPihudWxsKVxuICBjb25zdCBbY29tbWl0c0Vycm9yLCBzZXRDb21taXRzRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3BpY2tlck9wZW4sIHNldFBpY2tlck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtwaWNrZXJGaWx0ZXIsIHNldFBpY2tlckZpbHRlcl0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW3NlbGVjdGVkVGFyZ2V0cywgc2V0U2VsZWN0ZWRUYXJnZXRzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXSlcbiAgY29uc3QgW2RldGFpbHMsIHNldERldGFpbHNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgQ29tbWl0RGV0YWlsUGF5bG9hZD4+KHt9KVxuICBjb25zdCBbZGV0YWlsTG9hZGluZywgc2V0RGV0YWlsTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2ltcGFjdCwgc2V0SW1wYWN0XSA9IHVzZVN0YXRlPEltcGFjdFNjb3BlUGF5bG9hZCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtpbXBhY3RMb2FkaW5nLCBzZXRJbXBhY3RMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbcmV2aWV3cywgc2V0UmV2aWV3c10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBSZXZpZXdQYXlsb2FkPj4oe30pXG4gIGNvbnN0IFtyZXZpZXdMb2FkaW5nLCBzZXRSZXZpZXdMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbZmlsZURpZmZzLCBzZXRGaWxlRGlmZnNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oe30pXG4gIGNvbnN0IFtjb25maXJtRGlhbG9nLCBzZXRDb25maXJtRGlhbG9nXSA9IHVzZVN0YXRlPHsgdGl0bGU6IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nOyBkYW5nZXI/OiBib29sZWFuOyBvbkNvbmZpcm06ICgpID0+IHZvaWQgfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtub3Rlcywgc2V0Tm90ZXNdID0gdXNlU3RhdGU8Tm90ZUVudHJ5W10+KFtdKVxuICBjb25zdCBbbm90ZVRpdGxlLCBzZXROb3RlVGl0bGVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtub3RlQ29udGVudCwgc2V0Tm90ZUNvbnRlbnRdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtub3RlVGFncywgc2V0Tm90ZVRhZ3NdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtlZGl0aW5nTm90ZSwgc2V0RWRpdGluZ05vdGVdID0gdXNlU3RhdGU8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmc7IHRhZ3M6IHN0cmluZyB9IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW25vdGVTZWFyY2gsIHNldE5vdGVTZWFyY2hdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtub3RlRXhwYW5kZWQsIHNldE5vdGVFeHBhbmRlZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oe30pXG4gIGNvbnN0IFtpc3N1ZXNEYXRhLCBzZXRJc3N1ZXNEYXRhXSA9IHVzZVN0YXRlPElzc3VlRW50cnlbXSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtpc3N1ZVNldmVyaXR5RmlsdGVyLCBzZXRJc3N1ZVNldmVyaXR5RmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbaXNzdWVTdGF0dXNGaWx0ZXIsIHNldElzc3VlU3RhdHVzRmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbaXNzdWVFeHBhbmRlZCwgc2V0SXNzdWVFeHBhbmRlZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oe30pXG4gIGNvbnN0IFtmaXhFeHBhbmRlZCwgc2V0Rml4RXhwYW5kZWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KVxuICBjb25zdCBbdmVyaWZ5aW5nVGFyZ2V0LCBzZXRWZXJpZnlpbmdUYXJnZXRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2FpU3VtbWFyaXppbmcsIHNldEFpU3VtbWFyaXppbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFttb2RlbFRpZXJzLCBzZXRNb2RlbFRpZXJzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIHsgcHJvdmlkZXI6IHN0cmluZzsgbW9kZWw6IHN0cmluZyB9PiB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFttb2RlbE9wdGlvbnMsIHNldE1vZGVsT3B0aW9uc10gPSB1c2VTdGF0ZTxBcnJheTx7IHByb3ZpZGVyOiBzdHJpbmc7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZyB9Pj4oW10pXG4gIGNvbnN0IFttb2RlbFNhdmluZywgc2V0TW9kZWxTYXZpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFttb2RlbFNhdmVkLCBzZXRNb2RlbFNhdmVkXSA9IHVzZVN0YXRlKGZhbHNlKVxuICAvLyBcdTI1MDBcdTI1MDAgXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHVGRjFBXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0IC8gUnVuIFx1OEJFNlx1NjBDNSAvIFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgW3BsYW5Db25maXJtLCBzZXRQbGFuQ29uZmlybV0gPSB1c2VTdGF0ZTx7IGNoYW5nZUlkOiBzdHJpbmc7IHN0ZXBzOiBQbGFuQ29uZmlybVN0ZXBbXSB9IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3BsYW5CdXN5LCBzZXRQbGFuQnVzeV0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW3J1bkRldGFpbCwgc2V0UnVuRGV0YWlsXSA9IHVzZVN0YXRlPFJ1bkRldGFpbCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtzY2hlZHVsZWREYXRhLCBzZXRTY2hlZHVsZWREYXRhXSA9IHVzZVN0YXRlPFNjaGVkdWxlZFRhc2tFbnRyeVtdIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3NjaGVkTmFtZSwgc2V0U2NoZWROYW1lXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbc2NoZWRUeXBlLCBzZXRTY2hlZFR5cGVdID0gdXNlU3RhdGUoJ3JldmlldycpXG4gIGNvbnN0IFtzY2hlZFRpdGxlLCBzZXRTY2hlZFRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbc2NoZWREZXNjLCBzZXRTY2hlZERlc2NdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtzY2hlZEludGVydmFsLCBzZXRTY2hlZEludGVydmFsXSA9IHVzZVN0YXRlKCcxNDQwJylcbiAgLy8gXHUyNTAwXHUyNTAwIFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1RkYxQVx1NTE2OFx1OTFDRlx1NjU3MFx1NjM2RSAvIFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgW21lbW9yaWVzRGF0YSwgc2V0TWVtb3JpZXNEYXRhXSA9IHVzZVN0YXRlPE1lbW9yaWVzUGF5bG9hZCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtzeW5jUmVwb3J0LCBzZXRTeW5jUmVwb3J0XSA9IHVzZVN0YXRlPFN5bmNSZXBvcnQgfCBudWxsPihudWxsKVxuICBjb25zdCBbbWVtb3J5U2NvcGUsIHNldE1lbW9yeVNjb3BlXSA9IHVzZVN0YXRlPCdwcm9qZWN0JyB8ICdicmFuY2gnPigncHJvamVjdCcpXG4gIGNvbnN0IFttZW1vcnlUeXBlLCBzZXRNZW1vcnlUeXBlXSA9IHVzZVN0YXRlKCdhcmNoaXRlY3R1cmVfZGVjaXNpb24nKVxuICBjb25zdCBbbWVtb3J5U3luY2luZywgc2V0TWVtb3J5U3luY2luZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2V4ZWNUaXRsZSwgc2V0RXhlY1RpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbZXhlY0Rlc2MsIHNldEV4ZWNEZXNjXSA9IHVzZVN0YXRlKCcnKVxuXG4gIGNvbnN0IHBvc3QgPSBhc3luYyAocGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8eyBvazogYm9vbGVhbjsgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfT4gPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocGF0aCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgLi4uYm9keSwgc2Vzc2lvbklkOiBwcm9wcy5zZXNzaW9uSWQgfSksXG4gICAgfSlcbiAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgcmV0dXJuIHsgb2s6IHJlc3BvbnNlLm9rLCBkYXRhOiAoZGF0YSA/PyB7fSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfVxuICB9XG5cbiAgY29uc3QgbG9hZENvbW1pdHMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbW1pdHM/c2Vzc2lvbklkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJyl9JmxpbWl0PTYwYClcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcigoZGF0YSBhcyB7IGVycm9yPzogc3RyaW5nIH0pLmVycm9yID8/IGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApXG4gICAgICBzZXRDb21taXRzRGF0YShkYXRhIGFzIENvbW1pdHNQYXlsb2FkKVxuICAgICAgc2V0Q29tbWl0c0Vycm9yKG51bGwpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldENvbW1pdHNFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZE5vdGVzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcz9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXROb3RlcygoZGF0YSBhcyB7IG5vdGVzOiBOb3RlRW50cnlbXSB9KS5ub3RlcyA/PyBbXSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1N0IxNFx1OEJCMFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2Mlx1RkYxQVx1NTIxN1x1ODg2OFx1NEZERFx1NjMwMVx1NTM5Rlx1NjgzN1x1MzAwMlxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTUyRkVcdTkwMDkvXHU1M0Q2XHU2RDg4XHU0RTAwXHU2QjIxXHU2M0QwXHU0RUE0XHVGRjFBXHU5MUNEXHU3Qjk3XHU5MDA5XHU0RTJEXHU5NkM2XHU1NDA4XHVGRjBDXHU1RTc2XHU2MzA5XHU5NzAwXHU4ODY1XHU5RjUwXHU2QkNGXHU2NzYxXHU2M0QwXHU0RUE0XHU3Njg0IEFJIFx1ODlFM1x1OEJGQlx1RkYwOFx1NjcwRFx1NTJBMVx1N0FFRlx1NjcwOVx1N0YxM1x1NUI1OFx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCB0b2dnbGVUYXJnZXQgPSBhc3luYyAodGFyZ2V0OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRTZWxlY3RlZFRhcmdldHMoKHByZXZpb3VzKSA9PiB7XG4gICAgICBpZiAocHJldmlvdXMuaW5jbHVkZXModGFyZ2V0KSkgcmV0dXJuIHByZXZpb3VzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gdGFyZ2V0KVxuICAgICAgcmV0dXJuIFsuLi5wcmV2aW91cywgdGFyZ2V0XVxuICAgIH0pXG4gICAgc2V0SW1wYWN0KG51bGwpXG4gICAgc2V0UmV2aWV3cyh7fSlcbiAgICBpZiAoIXNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyh0YXJnZXQpKSB7XG4gICAgICBhd2FpdCBsb2FkRGV0YWlsKHRhcmdldCwgZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NjJDOVx1NTNENlx1NTM1NVx1Njc2MVx1NjNEMFx1NEVBNFx1NzY4NCBBSSBcdTg5RTNcdThCRkJcdUZGMUJmb3JjZT10cnVlIFx1NjVGNlx1N0VENVx1OEZDN1x1N0YxM1x1NUI1OFx1NUYzQVx1NTIzNlx1OTFDRFx1N0I5N1x1MzAwMlx1NTkzMVx1OEQyNVx1NTE5OVx1NTE2NVx1OTUxOVx1OEJFRlx1NTM2MFx1NEY0RFx1RkYwOFx1NTM2MVx1NzI0N1x1NEUwRFx1NUQyOVx1NkU4M1x1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBsb2FkRGV0YWlsID0gYXN5bmMgKHRhcmdldDogc3RyaW5nLCBmb3JjZTogYm9vbGVhbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldERldGFpbExvYWRpbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvY29tbWl0LWRldGFpbCcsIHsgc2hhOiB0YXJnZXQsIGZvcmNlIH0pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldERldGFpbHMoKHByZXZpb3VzKSA9PiAoe1xuICAgICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICAgIFt0YXJnZXRdOiB7XG4gICAgICAgICAgICBzaGE6IHRhcmdldCxcbiAgICAgICAgICAgIGlzV29ya2luZzogdGFyZ2V0ID09PSAnd29ya2luZycsXG4gICAgICAgICAgICBmaWxlczogW10sXG4gICAgICAgICAgICBpbnNlcnRpb25zOiAwLFxuICAgICAgICAgICAgZGVsZXRpb25zOiAwLFxuICAgICAgICAgICAgcGF0Y2hUcnVuY2F0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcGF0Y2g6ICcnLFxuICAgICAgICAgICAgY29tbWl0OiBudWxsLFxuICAgICAgICAgICAgYW5hbHlzaXM6IHsgd2hhdDogJ0FJIFx1ODlFM1x1OEJGQlx1NTkzMVx1OEQyNVx1RkYxQScgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnJykgKyAnXHVGRjA4XHU3MEI5XHUzMDBDXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwXHUzMDBEXHU1M0VGXHU5MUNEXHU4QkQ1XHVGRjA5JywgbG9naWM6IFtdLCByaXNrczogW10gfSxcbiAgICAgICAgICB9IGFzIHVua25vd24gYXMgQ29tbWl0RGV0YWlsUGF5bG9hZCxcbiAgICAgICAgfSkpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0RGV0YWlscygocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBbdGFyZ2V0XTogZGF0YSBhcyB1bmtub3duIGFzIENvbW1pdERldGFpbFBheWxvYWQgfSkpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldExvYWRFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldERldGFpbExvYWRpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZEltcGFjdCA9IGFzeW5jIChmb3JjZSA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDApIHJldHVyblxuICAgIHNldEltcGFjdExvYWRpbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaW1wYWN0LXNjb3BlJywgeyBzaGFzOiBzZWxlY3RlZFRhcmdldHMsIGZvcmNlIH0pXG4gICAgICBzZXRJbXBhY3Qob2sgPyAoZGF0YSBhcyB1bmtub3duIGFzIEltcGFjdFNjb3BlUGF5bG9hZCkgOiBudWxsKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJbXBhY3RMb2FkaW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWRSZXZpZXdzID0gYXN5bmMgKGZvcmNlID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoc2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgc2V0UmV2aWV3TG9hZGluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBzZWxlY3RlZFRhcmdldHMpIHtcbiAgICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcmV2aWV3JywgeyBzaGE6IHRhcmdldCwgZm9yY2UgfSlcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGRhdGEgYXMgdW5rbm93biBhcyBSZXZpZXdQYXlsb2FkXG4gICAgICAgIHNldFJldmlld3MoKHByZXZpb3VzKSA9PiAoe1xuICAgICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICAgIFt0YXJnZXRdOiBvayA/IHBheWxvYWQgOiB7XG4gICAgICAgICAgICBpc3N1ZXNGb3VuZDogMCxcbiAgICAgICAgICAgIGlzc3VlczogJycsXG4gICAgICAgICAgICB2ZXJkaWN0OiAnXHU4QkM0XHU1QkExXHU1OTMxXHU4RDI1XHVGRjFBJyArIFN0cmluZyhwYXlsb2FkWydlcnJvciddID8/ICcnKSArICdcdUZGMDhcdTUzRUZcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdTkxQ0RcdThCRDVcdUZGMDknLFxuICAgICAgICAgICAgaXNzdWVMaXN0OiBbXSxcbiAgICAgICAgICAgIGNhY2hlZDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSkpXG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFJldmlld0xvYWRpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZEZpbGVEaWZmID0gYXN5bmMgKHNoYTogc3RyaW5nLCBwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBrZXkgPSBgJHtzaGF9fCR7cGF0aH1gXG4gICAgaWYgKGZpbGVEaWZmc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNldEZpbGVEaWZmcygocHJldmlvdXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfVxuICAgICAgICBkZWxldGUgbmV4dFtrZXldXG4gICAgICAgIHJldHVybiBuZXh0XG4gICAgICB9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvZmlsZS1kaWZmJywgeyBzaGEsIHBhdGggfSlcbiAgICBzZXRGaWxlRGlmZnMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW2tleV06IFN0cmluZyhkYXRhWydwYXRjaCddID8/ICcnKSB9KSlcbiAgfVxuXG4gIGNvbnN0IGxvYWRJc3N1ZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcz9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXRJc3N1ZXNEYXRhKChkYXRhIGFzIHsgaXNzdWVzOiBJc3N1ZUVudHJ5W10gfSkuaXNzdWVzID8/IFtdKVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gXHU5NUVFXHU5ODk4XHU1MjE3XHU4ODY4XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXHVGRjFBXHU1MjE3XHU4ODY4XHU0RkREXHU2MzAxXHU1MzlGXHU2ODM3XHUzMDAyXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFx1OTVFRVx1OTg5OFx1NTkwRFx1NjhDMFx1RkYxQVx1NUJGOVx1OEJFNVx1OTVFRVx1OTg5OFx1NjI0MFx1NUM1RVx1OEJDNFx1NUJBMVx1NzZFRVx1NjgwN1x1OTFDRFx1OEREMVx1NjhDMFx1NkQ0Qlx1RkYwOFx1NEZFRVx1NTkwRFx1Nzg2RVx1OEJBNCArIFx1NjcwMFx1NEYxOFx1NjAyNy9cdTY3MDBcdTVDMEZcdTRGQjVcdTUxNjUgKyBcdTY1QjBcdTk1RUVcdTk4OThcdTYyNkJcdTYzQ0ZcdUZGMDlcdUZGMENcbiAgICogXHU1M0VBXHU2NzA5XHU1OTBEXHU2OEMwXHU5MDFBXHU4RkM3XHU2MjREXHU4MUVBXHU1MkE4XHU3RjZFXHU0RTNBXHU1REYyXHU4OUUzXHU1MUIzXHVGRjFCXHU3RUQzXHU2NzlDXHU0RUU1XHU1OTBEXHU2OEMwXHU2MkE1XHU1NDRBXHU1RjYyXHU1RjBGXHU1QzU1XHU3OTNBXHUzMDAyXG4gICAqL1xuICBjb25zdCB2ZXJpZnlJc3N1ZXMgPSBhc3luYyAodGFyZ2V0OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRWZXJpZnlpbmdUYXJnZXQodGFyZ2V0KVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXMvdmVyaWZ5JywgeyB0YXJnZXQgfSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc29sdmVkID0gKGRhdGFbJ3Jlc29sdmVkJ10gYXMgc3RyaW5nW10gfCB1bmRlZmluZWQpID8/IFtdXG4gICAgICBjb25zdCBzdGlsbE9wZW4gPSAoZGF0YVsnc3RpbGxPcGVuJ10gYXMgQXJyYXk8eyB0aXRsZTogc3RyaW5nOyByZWFzb246IHN0cmluZyB9PiB8IHVuZGVmaW5lZCkgPz8gW11cbiAgICAgIGNvbnN0IG5ld0lzc3VlcyA9IChkYXRhWyduZXdJc3N1ZXMnXSBhcyBBcnJheTx7IHNldmVyaXR5OiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT4gfCB1bmRlZmluZWQpID8/IFtdXG4gICAgICBjb25zdCB2ZXJkaWN0ID0gU3RyaW5nKGRhdGFbJ3ZlcmRpY3QnXSA/PyAnJylcbiAgICAgIGNvbnN0IGxpbmVzID0gW1xuICAgICAgICBgXHU1OTBEXHU2OEMwXHU1QjhDXHU2MjEwXHVGRjFBXHU1REYyXHU0RkVFXHU1OTBEICR7cmVzb2x2ZWQubGVuZ3RofSBcdTAwQjcgXHU0RUNEXHU2NzJBXHU0RkVFXHU1OTBEICR7c3RpbGxPcGVuLmxlbmd0aH0gXHUwMEI3IFx1NjVCMFx1NTg5RVx1OTVFRVx1OTg5OCAke25ld0lzc3Vlcy5sZW5ndGh9YCxcbiAgICAgICAgLi4uKHJlc29sdmVkLmxlbmd0aCA+IDAgPyBbYFx1MjcxMyBcdTVERjJcdTRGRUVcdTU5MERcdUZGMUEke3Jlc29sdmVkLmpvaW4oJ1x1RkYxQicpfWBdIDogW10pLFxuICAgICAgICAuLi4oc3RpbGxPcGVuLmxlbmd0aCA+IDAgPyBzdGlsbE9wZW4ubWFwKChpdGVtKSA9PiBgXHUyNzE3IFx1NjcyQVx1NEZFRVx1NTkwRFx1RkYxQSR7aXRlbS50aXRsZX0gXHUyMDE0XHUyMDE0ICR7aXRlbS5yZWFzb259YCkgOiBbXSksXG4gICAgICAgIC4uLihuZXdJc3N1ZXMubGVuZ3RoID4gMCA/IG5ld0lzc3Vlcy5tYXAoKGl0ZW0pID0+IGBcdUZGMEIgXHU2NUIwXHU5NUVFXHU5ODk4XHVGRjFBWyR7aXRlbS5zZXZlcml0eX1dICR7aXRlbS50aXRsZX1gKSA6IFtdKSxcbiAgICAgICAgLi4uKHZlcmRpY3QgPT09ICcnID8gW10gOiBbYFx1NjcwMFx1NEYxOFx1NjAyN1x1RkYxQSR7dmVyZGljdH1gXSksXG4gICAgICBdXG4gICAgICBzZXRBY3Rpb25SZXN1bHQobGluZXMuam9pbignXFxuJykpXG4gICAgICBhd2FpdCBsb2FkSXNzdWVzKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRWZXJpZnlpbmdUYXJnZXQobnVsbClcbiAgICB9XG4gIH1cblxuICBjb25zdCBhZGROb3RlID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChub3RlVGl0bGUudHJpbSgpID09PSAnJyB8fCBub3RlQ29udGVudC50cmltKCkgPT09ICcnKSByZXR1cm5cbiAgICBjb25zdCB7IG9rIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3RlcycsIHtcbiAgICAgIHRpdGxlOiBub3RlVGl0bGUudHJpbSgpLFxuICAgICAgY29udGVudDogbm90ZUNvbnRlbnQudHJpbSgpLFxuICAgICAgdGFnczogbm90ZVRhZ3MsXG4gICAgICBzaGE6IHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiBzZWxlY3RlZFRhcmdldHNbMF0sXG4gICAgfSlcbiAgICBpZiAob2spIHtcbiAgICAgIHNldE5vdGVUaXRsZSgnJylcbiAgICAgIHNldE5vdGVDb250ZW50KCcnKVxuICAgICAgc2V0Tm90ZVRhZ3MoJycpXG4gICAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlbW92ZU5vdGUgPSBhc3luYyAoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL2RlbGV0ZScsIHsgaWQgfSlcbiAgICBpZiAoZWRpdGluZ05vdGUgIT09IG51bGwgJiYgZWRpdGluZ05vdGUuaWQgPT09IGlkKSBzZXRFZGl0aW5nTm90ZShudWxsKVxuICAgIGF3YWl0IGxvYWROb3RlcygpXG4gIH1cblxuICBjb25zdCBzYXZlTm90ZUVkaXQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKGVkaXRpbmdOb3RlID09PSBudWxsKSByZXR1cm5cbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy91cGRhdGUnLCB7IGlkOiBlZGl0aW5nTm90ZS5pZCwgdGl0bGU6IGVkaXRpbmdOb3RlLnRpdGxlLCBjb250ZW50OiBlZGl0aW5nTm90ZS5jb250ZW50LCB0YWdzOiBlZGl0aW5nTm90ZS50YWdzIH0pXG4gICAgc2V0RWRpdGluZ05vdGUobnVsbClcbiAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICB9XG5cbiAgLyoqIFx1N0Y2RVx1OTg3Ni9cdTUzRDZcdTZEODhcdTdGNkVcdTk4NzZcdTRFMDBcdTY3NjFcdTdCMTRcdThCQjBcdTMwMDIgKi9cbiAgY29uc3QgdG9nZ2xlTm90ZVBpbiA9IGFzeW5jIChub3RlOiBOb3RlRW50cnkpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy91cGRhdGUnLCB7IGlkOiBub3RlLmlkLCBwaW5uZWQ6IG5vdGUucGlubmVkICE9PSB0cnVlIH0pXG4gICAgYXdhaXQgbG9hZE5vdGVzKClcbiAgfVxuXG4gIC8qKiBBSSBcdTVCNjZcdTRFNjBcdTYwM0JcdTdFRDNcdUZGMUFcdTVCRjlcdTZCRDRcdTRFMEFcdTZCMjFcdTYwM0JcdTdFRDNcdTUwNUFcdTU4OUVcdTkxQ0ZcdTY2RjRcdTY1QjBcdUZGMENcdTYyOEFcdTdCMTRcdThCQjArXHU5ODc5XHU3NkVFXHU2ODYzXHU2ODQ4XHU2M0QwXHU3MEJDXHU2MjEwXHU0RTAwXHU0RUZEXHUzMDBDXHU2RDNCXHUzMDBEXHU3Njg0XHU2MDNCXHU3RUQzXHU2NTg3XHU2ODYzXHUzMDAyICovXG4gIGNvbnN0IGFpU3VtbWFyaXplID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldEFpU3VtbWFyaXppbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMvYWktc3VtbWFyeScsIHt9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KGRhdGFbJ3VwZGF0ZWQnXSA9PT0gdHJ1ZVxuICAgICAgICA/ICdcdTI3MTMgXHU1REYyXHU1QkY5XHU2QkQ0XHU0RTBBXHU2QjIxXHU2MDNCXHU3RUQzXHU1QjhDXHU2MjEwXHU1ODlFXHU5MUNGXHU2NkY0XHU2NUIwXHVGRjA4XHU2NUIwXHU1ODlFXHU1M0Q4XHU1MzE2XHU4OUMxXHU2MDNCXHU3RUQzXHU3Njg0XHUzMDBDXHU2NzJDXHU2QjIxXHU2NkY0XHU2NUIwXHUzMDBEXHU0RTAwXHU4MjgyXHVGRjA5XHVGRjBDXHU2NUU3XHU2MDNCXHU3RUQzXHU1REYyXHU1NDA4XHU1RTc2XHU2NkZGXHU2MzYyJ1xuICAgICAgICA6ICdcdTI3MTMgXHU1REYyXHU3NTFGXHU2MjEwXHU5OTk2XHU0RUZEXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzJylcbiAgICAgIGF3YWl0IGxvYWROb3RlcygpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0QWlTdW1tYXJpemluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU5ODc1XHU5NzYyXHU1MjFCXHU1RUZBXHU2MjY3XHU4ODRDXHVGRjFBXHU1RUZBXHU1M0Q4XHU2NkY0IFx1MjE5MiBMTE0gXHU3NTFGXHU2MjEwXHU3RjE2XHU2MzkyXHU4QkExXHU1MjEyIFx1MjE5MiBcdThCQTFcdTUyMTJcdTc4NkVcdThCQTRcdTk4NzVcdUZGMDhcdTg5RDJcdTgyNzIvXHU2QTIxXHU1NzhCL1x1N0I1Nlx1NzU2NVx1NTNFRlx1OEMwM1x1RkYwOVx1MjE5MiBcdTc4NkVcdThCQTRcdTU0MEVcdTU0MkZcdTUyQThcdTMwMDIgKi9cbiAgY29uc3Qgc3RhcnRSdW4gPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKGV4ZWNUaXRsZS50cmltKCkgPT09ICcnIHx8IGV4ZWNEZXNjLnRyaW0oKSA9PT0gJycpIHJldHVyblxuICAgIHNldEJ1c3koJ3N0YXJ0UnVuJylcbiAgICBzZXRBY3Rpb25SZXN1bHQobnVsbClcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9zdGFydCcsIHsgdGl0bGU6IGV4ZWNUaXRsZS50cmltKCksIGRlc2NyaXB0aW9uOiBleGVjRGVzYy50cmltKCkgfSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmIChkYXRhWydhdXRvU3RhcnRlZCddID09PSB0cnVlKSB7XG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NURGMlx1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYxQScgKyBTdHJpbmcoZGF0YVsncnVuSWQnXSA/PyAnJykpXG4gICAgICAgIHNldEV4ZWNUaXRsZSgnJylcbiAgICAgICAgc2V0RXhlY0Rlc2MoJycpXG4gICAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3Qgc3RlcHMgPSAoZGF0YVsnc3RlcHMnXSBhcyBBcnJheTxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4gfCB1bmRlZmluZWQpID8/IFtdXG4gICAgICBzZXRQbGFuQ29uZmlybSh7XG4gICAgICAgIGNoYW5nZUlkOiBTdHJpbmcoZGF0YVsnY2hhbmdlSWQnXSA/PyAnJyksXG4gICAgICAgIHN0ZXBzOiBzdGVwcy5tYXAoKHN0ZXApID0+ICh7XG4gICAgICAgICAgaWQ6IFN0cmluZyhzdGVwWydpZCddID8/ICcnKSxcbiAgICAgICAgICB0aXRsZTogU3RyaW5nKHN0ZXBbJ3RpdGxlJ10gPz8gJycpLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoc3RlcFsnZGVzY3JpcHRpb24nXSA/PyAnJyksXG4gICAgICAgICAgdGFyZ2V0RmlsZXM6IChzdGVwWyd0YXJnZXRGaWxlcyddIGFzIHN0cmluZ1tdIHwgdW5kZWZpbmVkKSA/PyBbXSxcbiAgICAgICAgICByb2xlOiBTdHJpbmcoc3RlcFsncm9sZSddID8/ICdjb2RpbmcnKSxcbiAgICAgICAgICBhY2NlcHRhbmNlOiBTdHJpbmcoc3RlcFsnYWNjZXB0YW5jZSddID8/ICcnKSxcbiAgICAgICAgICBmYWlsdXJlUG9saWN5OiBTdHJpbmcoc3RlcFsnZmFpbHVyZVBvbGljeSddID8/ICdyZXRyeS1lc2NhbGF0ZScpLFxuICAgICAgICAgIGVuYWJsZWQ6IHN0ZXBbJ2VuYWJsZWQnXSAhPT0gZmFsc2UsXG4gICAgICAgICAgbW9kZWxQcm92aWRlcjogJycsXG4gICAgICAgICAgbW9kZWxJZDogJycsXG4gICAgICAgIH0pKSxcbiAgICAgIH0pXG4gICAgICBpZiAobW9kZWxPcHRpb25zLmxlbmd0aCA9PT0gMCAmJiBtb2RlbFRpZXJzID09PSBudWxsKSB2b2lkIGxvYWRNb2RlbENvbmZpZygpXG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdThCQTFcdTUyMTJcdTVERjJcdTc1MUZcdTYyMTBcdUZGMENcdThCRjdcdTU3MjhcdTRFMEJcdTY1QjlcdTc4NkVcdThCQTRcdTdGMTZcdTYzOTJcdTU0MEVcdTU0MkZcdTUyQTgnKVxuICAgICAgc2V0RXhlY1RpdGxlKCcnKVxuICAgICAgc2V0RXhlY0Rlc2MoJycpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0QnVzeShudWxsKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdThCQTFcdTUyMTJcdTc4NkVcdThCQTRcdTk4NzVcdUZGMUFcdTRGRERcdTVCNThcdTdGMTZcdThGOTFcdUZGMDhcdTY1QjBcdTcyNDhcdTY3MkNcdThCQTFcdTUyMTJcdUZGMDlcdTVFNzZcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdTMwMDIgKi9cbiAgY29uc3QgbGF1bmNoUGxhbiA9IGFzeW5jICh3aXRoRWRpdHM6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAocGxhbkNvbmZpcm0gPT09IG51bGwpIHJldHVyblxuICAgIHNldFBsYW5CdXN5KHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGxldCBjaGFuZ2VJZCA9IHBsYW5Db25maXJtLmNoYW5nZUlkXG4gICAgICBpZiAod2l0aEVkaXRzKSB7XG4gICAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvcGxhbi91cGRhdGUnLCB7IGNoYW5nZUlkLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMgfSlcbiAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9sYXVuY2gnLCB7IGNoYW5nZUlkIH0pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMUEnICsgU3RyaW5nKGRhdGFbJ3J1bklkJ10gPz8gJycpKVxuICAgICAgc2V0UGxhbkNvbmZpcm0obnVsbClcbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0UGxhbkJ1c3koZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NTJBMFx1OEY3RCBSdW4gXHU4QkU2XHU2MEM1XHVGRjA4XHU2QjY1XHU5QUE0XHU2NUY2XHU5NUY0XHU3RUJGICsgXHU0RUZCXHU1MkExXHU1REU1XHU0RjVDXHU4QkIwXHU1RkM2XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGxvYWRSdW5EZXRhaWwgPSBhc3luYyAoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL2RldGFpbD9pZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlkKSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0UnVuRGV0YWlsKGRhdGEgYXMgUnVuRGV0YWlsKVxuICAgIH0gY2F0Y2gge1xuICAgICAgc2V0UnVuRGV0YWlsKG51bGwpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NjA2Mlx1NTkwRFx1NjY4Mlx1NTA1Qy9cdTRFMkRcdTY1QUQvXHU1OTMxXHU4RDI1XHU3Njg0IFJ1blx1MzAwMiAqL1xuICBjb25zdCByZXN1bWVSdW4gPSBhc3luYyAocnVuSWQ6IHN0cmluZywgYWN0aW9uOiAnY29udGludWUnIHwgJ3NraXAtY3VycmVudCcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL3Jlc3VtZScsIHsgcnVuSWQsIGFjdGlvbiB9KVxuICAgIGlmIChvaykge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU1REYyXHU2MDYyXHU1OTBEXHU2MjY3XHU4ODRDXHVGRjA4JyArIGFjdGlvbiArICdcdUZGMDknKVxuICAgICAgYXdhaXQgcmVmcmVzaFN0YXRlKClcbiAgICAgIGF3YWl0IGxvYWRSdW5EZXRhaWwocnVuSWQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU1MkEwXHU4RjdEXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHU1MjE3XHU4ODY4XHUzMDAyICovXG4gIGNvbnN0IGxvYWRTY2hlZHVsZWQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3NjaGVkdWxlZD9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXRTY2hlZHVsZWREYXRhKChkYXRhIGFzIHsgdGFza3M6IFNjaGVkdWxlZFRhc2tFbnRyeVtdIH0pLnRhc2tzID8/IFtdKVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gXHU1MjE3XHU4ODY4XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NTIxQlx1NUVGQSAvIFx1NjZGNFx1NjVCMCAvIFx1NTIyMFx1OTY2NCAvIFx1N0FDQlx1NTM3M1x1NjI2N1x1ODg0Q1x1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1MzAwMiAqL1xuICBjb25zdCBhZGRTY2hlZHVsZWQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgaW50ZXJ2YWxNaW51dGVzID0gTnVtYmVyKHNjaGVkSW50ZXJ2YWwpXG4gICAgaWYgKHNjaGVkTmFtZS50cmltKCkgPT09ICcnIHx8ICFOdW1iZXIuaXNGaW5pdGUoaW50ZXJ2YWxNaW51dGVzKSB8fCBpbnRlcnZhbE1pbnV0ZXMgPCAxKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyBcdThCRjdcdTU4NkJcdTUxOTlcdTRFRkJcdTUyQTFcdTU0MERcdTc5RjBcdTRFMEVcdTY3MDlcdTY1NDhcdTk1RjRcdTk2OTRcdUZGMDhcdTUyMDZcdTk0OUZcdUZGMDknKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3NjaGVkdWxlZCcsIHtcbiAgICAgIG5hbWU6IHNjaGVkTmFtZS50cmltKCksIHR5cGU6IHNjaGVkVHlwZSwgaW50ZXJ2YWxNaW51dGVzLFxuICAgICAgdGl0bGU6IHNjaGVkVGl0bGUudHJpbSgpIHx8IHVuZGVmaW5lZCwgZGVzY3JpcHRpb246IHNjaGVkRGVzYy50cmltKCkgfHwgdW5kZWZpbmVkLFxuICAgIH0pXG4gICAgaWYgKG9rKSB7XG4gICAgICBzZXRTY2hlZE5hbWUoJycpOyBzZXRTY2hlZFRpdGxlKCcnKTsgc2V0U2NoZWREZXNjKCcnKVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHU1REYyXHU1MjFCXHU1RUZBJylcbiAgICAgIGF3YWl0IGxvYWRTY2hlZHVsZWQoKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc2NoZWR1bGVkQWN0aW9uID0gYXN5bmMgKHBhdGg6IHN0cmluZywgYm9keTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9zY2hlZHVsZWQvJyArIHBhdGgsIGJvZHkpXG4gICAgaWYgKG9rKSBhd2FpdCBsb2FkU2NoZWR1bGVkKClcbiAgICBlbHNlIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgfVxuXG4gIC8qKiBcdTUyQTBcdThGN0RcdThCQjBcdTVGQzZcdTk3NjJcdTY3N0ZcdTUxNjhcdTkxQ0ZcdTY1NzBcdTYzNkVcdUZGMDhcdTU0MkJcdTU0MENcdTZCNjVcdTU3RkFcdTdFQkZcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgbG9hZE1lbW9yaWVzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcmllcz9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXRNZW1vcmllc0RhdGEoZGF0YSBhcyBNZW1vcmllc1BheWxvYWQpXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcbiAgICB9XG4gIH1cblxuICAvKiogXHU2MkM5XHU1M0Q2XHU1NDBDXHU2QjY1XHVGRjFBXHU0RTA5XHU1NDExXHU1MjI0XHU1QjlBXHVGRjA4XHU1OTMxXHU2NTQ4XHU2M0QwXHU2ODQ4L1x1NjVCMFx1NTg5RVx1NTAxOVx1OTAwOS9cdTgxRUFcdTUyQThcdTdFRURcdTU0N0RcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3Qgc3luY01lbW9yaWVzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldE1lbW9yeVN5bmNpbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5L3N5bmMnLCB7fSlcbiAgICAgIGlmICghb2sgJiYgZGF0YVsnZXJyb3InXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNldFN5bmNSZXBvcnQoeyBvazogZmFsc2UsIGVycm9yOiBTdHJpbmcoZGF0YVsnZXJyb3InXSkgfSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXRTeW5jUmVwb3J0KGRhdGEgYXMgU3luY1JlcG9ydClcbiAgICAgIGF3YWl0IGxvYWRNZW1vcmllcygpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldFN5bmNSZXBvcnQoeyBvazogZmFsc2UsIGVycm9yOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikgfSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TWVtb3J5U3luY2luZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU1NDBDXHU2QjY1XHU2MkE1XHU1NDRBXHU1NDBFXHU3RUVEXHVGRjFBXHU2MjhBXHU5MDA5XHU0RTJEXHU3Njg0XHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2XHU5ODc5XHU4NDNEXHU0RTNBIHN0YWxlIC8gXHU1RjUyXHU2ODYzXHUzMDAyICovXG4gIGNvbnN0IGFwcGx5U3luYyA9IGFzeW5jIChpZHM6IHN0cmluZ1tdLCBhY3Rpb246ICdtYXJrLXN0YWxlJyB8ICdhcmNoaXZlJyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeS9zeW5jL2FwcGx5JywgeyBpZHMsIGFjdGlvbiB9KVxuICAgIHNldFN5bmNSZXBvcnQoKHByZXZpb3VzKSA9PiBwcmV2aW91cyA9PT0gbnVsbCA/IG51bGwgOiB7IC4uLnByZXZpb3VzLCBzdGFsZVByb3Bvc2FsczogKHByZXZpb3VzLnN0YWxlUHJvcG9zYWxzID8/IFtdKS5maWx0ZXIoKHByb3Bvc2FsKSA9PiAhaWRzLmluY2x1ZGVzKHByb3Bvc2FsLmlkKSkgfSlcbiAgICBhd2FpdCBsb2FkTWVtb3JpZXMoKVxuICB9XG5cbiAgLyoqIFx1OEJCMFx1NUZDNlx1NzJCNlx1NjAwMVx1NjRDRFx1NEY1Q1x1RkYwOFx1NUY1Mlx1Njg2My9cdTYwNjJcdTU5MERcdUZGMDlcdTRFMEVcdTUyMDZcdTY1MkZcdTVGNTJcdTRFMDBcdTMwMDIgKi9cbiAgY29uc3QgbWVtb3J5QWN0aW9uID0gYXN5bmMgKHBhdGg6IHN0cmluZywgYm9keTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvJyArIHBhdGgsIGJvZHkpXG4gICAgaWYgKG9rKSBhd2FpdCBsb2FkTWVtb3JpZXMoKVxuICAgIGVsc2Ugc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICB9XG5cbiAgLyoqIFx1OEJCMFx1NUZDNlx1OEY2Q1x1N0IxNFx1OEJCMFx1RkYxQVx1NUYxNVx1NzUyOFx1OEZEQlx1NUI2Nlx1NEU2MFx1Njg2M1x1Njg0OFx1MzAwMiAqL1xuICBjb25zdCBtZW1vcnlUb05vdGUgPSBhc3luYyAobWVtb3J5OiBNZW1vcnlFbnRyeSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzJywge1xuICAgICAgdGl0bGU6IG1lbW9yeS50aXRsZSxcbiAgICAgIGNvbnRlbnQ6IG1lbW9yeS5jb250ZW50ICsgKG1lbW9yeS5iYXNpc1NoYSAhPT0gbnVsbCA/IGBcXG5cdUZGMDhcdTY3NjVcdTZFOTBcdUZGMUFcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzYgJHttZW1vcnkuYmFzaXNTaGEuc2xpY2UoMCwgOCl9XHVGRjA5YCA6ICcnKSxcbiAgICAgIHRhZ3M6ICdcdThCQjBcdTVGQzYsICcgKyBtZW1vcnkudHlwZSxcbiAgICB9KVxuICAgIGlmIChvaykgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU1REYyXHU2MjhBXHU4QkIwXHU1RkM2XHU4RjZDXHU0RTNBXHU3QjE0XHU4QkIwJylcbiAgfVxuXG4gIC8vIFx1NEYxQVx1OEJERFx1NjI1M1x1NUYwMC9cdTUyMDdcdTYzNjJcdTY1RjZcdTVCOThcdTY1QjlcdTRGMUEgY2xvc2VEZXRhaWxzIFx1NjUzNlx1OEQ3N1x1OEY2OFx1OTA1M1x1RkYxQlx1NzcwQlx1OTVFOFx1NzJEN1x1NkJDRiA1MDBtcyBcdTY4QzBcdTY3RTVcdUZGMENcbiAgLy8gXHU1M0VBXHU4OTgxXHU1RjUzXHU1MjREXHU2NzA5XHU0RjFBXHU4QkREXHU4MDBDXHU1REU1XHU0RjVDXHU1M0YwXHU1MjE3XHU1QkJEIDwgNTBweCBcdTVDMzFcdTkxQ0RcdTY1QjBcdTY0OTFcdTVGMDBcdUZGMDhcdTc4NkVcdTVCOUFcdTYwMjdcdUZGMENcdTRFMERcdTRGOURcdThENTYgZWZmZWN0IFx1NjVGNlx1NUU4Rlx1RkYwOVx1MzAwMlxuICAvLyBcdTU0MENcdTRFMDBcdTYyQ0RcdTdFRjRcdTYzMDFcdTdFREZcdThCQTFcdTg4NENcdTk0QjNcdTUyMzZcdUZGMUFcdTRGMUFcdThCRERcdTUyMDdcdTYzNjJcdTRGMUFcdTYzNjJcdTYzODlcdTdFREZcdThCQTFcdTg4NEMgRE9NXHVGRjBDXHU2ODM3XHU1RjBGXHU4ODY4XHU3RjNBXHU1OTMxXHU2NUY2XHU2MzA5XHU1RjUzXHU1MjREXG4gIC8vIFx1Njc4NFx1NUVGQVx1NTRDOFx1NUUwQ1x1OTFDRFx1NkNFOFx1NTE2NVx1RkYwOFx1NUU0Mlx1N0I0OVx1RkYwQ1x1NURGMlx1NUI1OFx1NTcyOFx1NTIxOVx1OERGM1x1OEZDN1x1RkYwOVx1MzAwMlxuICBjb25zdCBsYXlvdXRGYWNlID0gKHByb3BzIGFzIHVua25vd24gYXMgeyBsYXlvdXQ/OiB7IG9wZW5EZXRhaWxzPzogKCkgPT4gdm9pZCB9IH0pLmxheW91dFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFwcGx5U3RhdHNMaW5lQ2xhbXAoKVxuICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYy1zdGF0cy1jbGFtcCcpID09PSBudWxsKSBhcHBseVN0YXRzTGluZUNsYW1wKClcbiAgICAgIGNvbnN0IGNoYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiY2VudGVyQ29sXCJdJylcbiAgICAgIGNvbnN0IHdpZHRoID0gY2hhdCA/IE1hdGgucm91bmQoY2hhdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkgOiAtMVxuICAgICAgaWYgKHdpZHRoICE9PSAtMSAmJiB3aWR0aCA8IDUwKSBsYXlvdXRGYWNlPy5vcGVuRGV0YWlscz8uKClcbiAgICB9LCA1MDApXG4gICAgcmV0dXJuICgpID0+IHsgY2xlYXJJbnRlcnZhbCh0aW1lcikgfVxuICB9LCBbcHJvcHMuc2Vzc2lvbklkLCBsYXlvdXRGYWNlXSlcblxuICAvKiogXHU0RUU1IGltcG9ydGFudCBcdTUxODVcdTgwNTRcdTY4MzdcdTVGMEZcdTc2RjRcdTYzQTVcdTUxOTlcdTVCOThcdTY1QjlcdTdGNTFcdTY4M0NcdTZBMjFcdTY3N0ZcdUZGMDhcdTY3MDBcdTlBRDhcdTRGMThcdTUxNDhcdTdFQTdcdUZGMENcdTRFRkJcdTRGNTVcdTkxQ0RcdTZFMzJcdTY3RDNcdTRFMERcdTRGMUFcdTg5ODZcdTc2RDZcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgZnJhbWVUZW1wbGF0ZVNldCA9IChjaGF0UHg6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwic2lkZWJhckNvbFwiXScpXG4gICAgY29uc3Qgc2lkZWJhclcgPSBzaWRlYmFyID8gTWF0aC5tYXgoNTYsIE1hdGgucm91bmQoc2lkZWJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkpIDogMjgwXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXScpXG4gICAgICA/LnN0eWxlLnNldFByb3BlcnR5KCdncmlkLXRlbXBsYXRlLWNvbHVtbnMnLCBzaWRlYmFyVyArICdweCBtaW5tYXgoMCwgMWZyKSAnICsgY2hhdFB4ICsgJ3B4JywgJ2ltcG9ydGFudCcpXG4gIH1cblxuICAvLyBcdTgwNEFcdTU5MjlcdTUyMTdcdTVCQkRcdThCQjBcdTVGQzZcdUZGMDhcdTVCOThcdTY1QjkgbGF5b3V0IHN0b3JlIFx1NzdBQ1x1NjAwMVx1RkYwOVx1RkYxQVx1NjMwMlx1OEY3RFx1NjA2Mlx1NTkwRCArIFx1NjJENlx1NjJGRFx1NzZGNFx1NTE5OVx1NTE4NVx1ODA1NFx1NkEyMVx1Njc3Rlx1MzAwMlxuICAvLyBcdTVGQzVcdTk4N0JcdTUxOTkgaW1wb3J0YW50XHUyMDE0XHUyMDE0TEFZT1VUX1NUWUxFIFx1NzY4NFx1NkEyMVx1Njc3Rlx1ODlDNFx1NTIxOVx1NEU1Rlx1NjYyRiBpbXBvcnRhbnRcdUZGMENcdTk3NUUgaW1wb3J0YW50XG4gIC8vIFx1NTE4NVx1ODA1NFx1NEYxQVx1ODhBQlx1NUI4M1x1NTM4Qlx1NTIzNlx1RkYwOFx1OEZEOVx1NUMzMVx1NjYyRlx1NkI2NFx1NTI0RFwiXHU2MkQ2XHU2MkZEXHU3NTFGXHU2NTQ4XHUzMDAxXHU1MjM3XHU2NUIwXHU1NDBFXHU4QkIwXHU1RkM2XHU0RTIyXHU1OTMxXCJcdTc2ODRcdTUzOUZcdTU2RTBcdUZGMDlcdTMwMDJcbiAgLy8gXHU1Qjk4XHU2NUI5IFJlYWN0IFx1OTFDRFx1NkUzMlx1NjdEM1x1NEYxQVx1NjUzOVx1NTE5OVx1NTE4NVx1ODA1NFx1NkEyMVx1Njc3Rlx1RkYwQ011dGF0aW9uT2JzZXJ2ZXIgXHU2MzA5XHU1RjUzXHU1MjREXHU1MDNDXHU1Qjg4XHU1MzZCXHU5MUNEXHU1MTk5XG4gIC8vIFx1RkYwOFx1NTAzQ1x1NzZGOFx1NTQwQ1x1NEUwRFx1NEYxQVx1ODlFNlx1NTNEMVx1NjVCMFx1NzY4NCBtdXRhdGlvblx1RkYwQ1x1NjVFMFx1NTZERVx1NzNBRlx1RkYwOVx1MzAwMlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHNhdmVkID0gTnVtYmVyKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwYy5jaGF0V2lkdGgnKSA/PyAnJylcbiAgICBjb25zdCBhcHBseSA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXScpIGFzIEhUTUxFbGVtZW50IHwgbnVsbFxuICAgICAgLy8gXHU0RUM1XHU1RjUzXHU1MTg1XHU4MDU0XHU2QTIxXHU2NzdGXHU0RTBEXHU2NjJGXHU2MjExXHU0RUVDXHU3Njg0IGltcG9ydGFudCBcdTU4RjBcdTY2MEVcdTY1RjZcdTUxOTlcdTUxNjVcdUZGMUFcdTVCOThcdTY1QjkgUmVhY3QgXHU5MUNEXHU2RTMyXHU2N0QzXHU0RjFBXHU2MjhBXG4gICAgICAvLyBcdTUxODVcdTgwNTRcdTY1MzlcdTU2REVcdTk3NUUgaW1wb3J0YW50XHVGRjA4XHU2QjY0XHU2NUY2XHU2ODM3XHU1RjBGXHU4ODY4XHU4OUM0XHU1MjE5XHU2M0E1XHU3QkExXHUzMDAxXHU4MDRBXHU1OTI5XHU1QkJEXHU1NkRFXHU4NDNEIDM2MFx1RkYwOVx1RkYwQ1x1ODlDMlx1NUJERlx1NTY2OFxuICAgICAgLy8gXHU5NjhGXHU1MzczXHU5MUNEXHU1MTk5XHU1OTNBXHU1NkRFXHVGRjFCXHU2MjExXHU0RUVDXHU4MUVBXHU1REYxXHU3Njg0XHU1MTk5XHU1MTY1XHU0RkREXHU2MzAxIGltcG9ydGFudFx1RkYwQ1x1NEUwRFx1NTE4RFx1ODlFNlx1NTNEMVx1NEUwQlx1NEUwMFx1OEY2RVx1MzAwMlxuICAgICAgaWYgKGZyYW1lID09PSBudWxsIHx8IGZyYW1lLnN0eWxlLmdldFByb3BlcnR5UHJpb3JpdHkoJ2dyaWQtdGVtcGxhdGUtY29sdW1ucycpID09PSAnaW1wb3J0YW50JykgcmV0dXJuXG4gICAgICBjb25zdCBjaGF0VyA9IE51bWJlci5pc0Zpbml0ZShzYXZlZCkgJiYgc2F2ZWQgPj0gMjgwID8gc2F2ZWQgOiAzNjBcbiAgICAgIGZyYW1lVGVtcGxhdGVTZXQoY2hhdFcpXG4gICAgfVxuICAgIGFwcGx5KClcbiAgICBjb25zdCBmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0nKVxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4geyBhcHBseSgpIH0pXG4gICAgaWYgKGZyYW1lICE9PSBudWxsKSBvYnNlcnZlci5vYnNlcnZlKGZyYW1lLCB7IGF0dHJpYnV0ZXM6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogWydzdHlsZSddIH0pXG4gICAgcmV0dXJuICgpID0+IHsgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpIH1cbiAgfSwgW10pXG5cbiAgLyoqIFx1NTIwNlx1OTY5NFx1Njc2MVx1NjJENlx1NjJGRFx1RkYxQVx1OEMwM1x1NjU3NFx1ODA0QVx1NTkyOVx1NTIxN1x1NUJCRFx1RkYwOFx1NURFNVx1NEY1Q1x1NTNGMFx1NTQzOFx1NjUzNlx1NTI2OVx1NEY1OVx1N0E3QVx1OTVGNFx1RkYwOVx1RkYwQ1x1NTE5OVx1NTE2NSBsb2NhbFN0b3JhZ2UgXHU4QkIwXHU1RkM2XHUzMDAyICovXG4gIGNvbnN0IG9uRGl2aWRlckRvd24gPSAoZTogUmVhY3QuUG9pbnRlckV2ZW50KTogdm9pZCA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3Qgb25Nb3ZlID0gKGV2OiBQb2ludGVyRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IHdpZHRoID0gTWF0aC5taW4oOTAwLCBNYXRoLm1heCgyODAsIHdpbmRvdy5pbm5lcldpZHRoIC0gZXYuY2xpZW50WCkpXG4gICAgICBmcmFtZVRlbXBsYXRlU2V0KHdpZHRoKVxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BjLmNoYXRXaWR0aCcsIFN0cmluZyh3aWR0aCkpXG4gICAgfVxuICAgIGNvbnN0IG9uVXAgPSAoKTogdm9pZCA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcClcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKVxuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgZGlzcG9zZWQgPSBmYWxzZVxuICAgIGNvbnN0IGxvYWQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9zdGF0ZT9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpLCB7IGhlYWRlcnM6IHsgYWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicgfSB9KVxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YClcbiAgICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgICBpZiAoIWRpc3Bvc2VkKSB7XG4gICAgICAgICAgc2V0U3RhdGUoZGF0YSBhcyBXb3Jrc3BhY2VTdGF0ZSlcbiAgICAgICAgICBzZXRMb2FkRXJyb3IobnVsbClcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgICAgaWYgKCFkaXNwb3NlZCkgc2V0TG9hZEVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcbiAgICAgIH1cbiAgICB9XG4gICAgdm9pZCBsb2FkKClcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHsgdm9pZCBsb2FkKCkgfSwgNDAwMClcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZGlzcG9zZWQgPSB0cnVlXG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgIH1cbiAgfSwgW10pXG5cbiAgLy8gXHU4RkRCXHU1MTY1XHU2M0QwXHU0RUE0L1x1N0IxNFx1OEJCMC9SZXZpZXcgXHU5ODc1XHU3QjdFXHU2NUY2XHU2MzA5XHU5NzAwXHU2MkM5XHU1M0Q2XHVGRjA4XHU2M0QwXHU0RUE0XHU1MjE3XHU4ODY4XHU0RjlEXHU4RDU2XHU0RjFBXHU4QkREXHU1REU1XHU0RjVDXHU1MzNBXHVGRjBDXHU4RjZFXHU4QkUyXHU2NUUwXHU2MTBGXHU0RTQ5XHVGRjA5XHUzMDAyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHRhYiA9PT0gJ2NvbW1pdHMnKSB2b2lkIGxvYWRDb21taXRzKClcbiAgICBpZiAodGFiID09PSAnbm90ZXMnKSB7IHZvaWQgbG9hZE5vdGVzKCk7IHZvaWQgbG9hZE1lbW9yaWVzKCkgfVxuICAgIGlmICh0YWIgPT09ICdyZXZpZXcnKSB2b2lkIGxvYWRJc3N1ZXMoKVxuICAgIGlmICh0YWIgPT09ICdleGVjdXRpb24nKSB7IHZvaWQgbG9hZFNjaGVkdWxlZCgpOyBpZiAocnVuRGV0YWlsICE9PSBudWxsKSB2b2lkIGxvYWRSdW5EZXRhaWwocnVuRGV0YWlsLnJ1bi5pZCkgfVxuICAgIGlmICh0YWIgPT09ICdzZXR0aW5ncycgJiYgbW9kZWxUaWVycyA9PT0gbnVsbCkgdm9pZCBsb2FkTW9kZWxDb25maWcoKVxuICB9LCBbdGFiLCBwcm9wcy5zZXNzaW9uSWRdKVxuXG4gIGNvbnN0IGxvYWRNb2RlbENvbmZpZyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbW9kZWwtY29uZmlnJylcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHJldHVyblxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgc2V0TW9kZWxUaWVycygoZGF0YSBhcyB7IHRpZXJzOiBSZWNvcmQ8c3RyaW5nLCB7IHByb3ZpZGVyOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmcgfT4gfSkudGllcnMgPz8ge30pXG4gICAgICBzZXRNb2RlbE9wdGlvbnMoKGRhdGEgYXMgeyBvcHRpb25zOiBBcnJheTx7IHByb3ZpZGVyOiBzdHJpbmc7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZyB9PiB9KS5vcHRpb25zID8/IFtdKVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gXHU2QTIxXHU1NzhCXHU5MTREXHU3RjZFXHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc2F2ZU1vZGVsQ29uZmlnID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChtb2RlbFRpZXJzID09PSBudWxsKSByZXR1cm5cbiAgICBzZXRNb2RlbFNhdmluZyh0cnVlKVxuICAgIHNldE1vZGVsU2F2ZWQoZmFsc2UpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21vZGVsLWNvbmZpZycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHRpZXJzOiBtb2RlbFRpZXJzIH0pLFxuICAgICAgfSlcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICBzZXRNb2RlbFNhdmVkKHRydWUpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBzZXRNb2RlbFNhdmVkKGZhbHNlKSB9LCAyNTAwKVxuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRNb2RlbFNhdmluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCByZWZyZXNoU3RhdGUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgcmVmcmVzaGVkID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3N0YXRlP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJyksIHsgaGVhZGVyczogeyBhY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyB9IH0pXG4gICAgaWYgKHJlZnJlc2hlZC5vaykgc2V0U3RhdGUoYXdhaXQgcmVmcmVzaGVkLmpzb24oKSBhcyBXb3Jrc3BhY2VTdGF0ZSlcbiAgfVxuXG4gIC8qKiBcdTdFREZcdTRFMDBcdTUyQThcdTRGNUNcdTYyNjdcdTg4NENcdTU2NjhcdUZGMUFQT1NUIFx1NUJCRlx1NEUzQiBBUElcdUZGMDhcdTY0M0FcdTVFMjZcdTRGMUFcdThCREQgaWQgXHU0RjlCXHU2NzBEXHU1MkExXHU3QUVGXHU1QjlBXHU0RjREXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1MzNBXHVGRjA5XHVGRjBDXHU4RjkzXHU1MUZBXHU4RkRCXHU3RUQzXHU2NzlDXHU5NzYyXHU2NzdGXHVGRjBDXHU1QjhDXHU2MjEwXHU1NDBFXHU1MjM3XHU2NUIwXHU3MkI2XHU2MDAxXHUzMDAyICovXG4gIGNvbnN0IHJ1bkFjdGlvbiA9IGFzeW5jIChuYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgYm9keTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRCdXN5KG5hbWUpXG4gICAgc2V0QWN0aW9uUmVzdWx0KG51bGwpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QocGF0aCwgYm9keSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KGBcdTI3MTcgJHtTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKX1gKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldEFjdGlvblJlc3VsdChmb3JtYXRBY3Rpb25SZXN1bHQoZGF0YSkpXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoYFx1MjcxNyAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKX1gKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRCdXN5KG51bGwpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcnVuQm9vdHN0cmFwID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldEJvb3RzdHJhcHBpbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvYm9vdHN0cmFwJywge30pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldExvYWRFcnJvcihTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRMb2FkRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRCb290c3RyYXBwaW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbmZpcm1NZW1vcnkgPSBhc3luYyAobWVtb3J5SWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeS9jb25maXJtJywgeyBtZW1vcnlJZCB9KVxuICAgIGlmIChvaykge1xuICAgICAgc2V0U3RhdGUoKHByZXZpb3VzKSA9PiBwcmV2aW91cyA9PT0gbnVsbCA/IHByZXZpb3VzIDoge1xuICAgICAgICAuLi5wcmV2aW91cyxcbiAgICAgICAgbWVtb3JpZXM6IHByZXZpb3VzLm1lbW9yaWVzPy5tYXAoKG1lbW9yeSkgPT4gbWVtb3J5LmlkID09PSBtZW1vcnlJZCA/IHsgLi4ubWVtb3J5LCBpc0h1bWFuQ29uZmlybWVkOiB0cnVlLCB0cnV0aExldmVsOiAnZmFjdCcgfSA6IG1lbW9yeSksXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHByb2plY3QgPSBzdGF0ZT8ucHJvamVjdCA/PyBudWxsXG4gIGNvbnN0IGJvb3RzdHJhcCA9IHN0YXRlPy5ib290c3RyYXAgPz8gbnVsbFxuICBjb25zdCBjaGFuZ2VzID0gc3RhdGU/LmNoYW5nZXMgPz8gW11cbiAgY29uc3QgcnVucyA9IHN0YXRlPy5ydW5zID8/IFtdXG4gIGNvbnN0IHZlcmlmaWNhdGlvbnMgPSBzdGF0ZT8udmVyaWZpY2F0aW9ucyA/PyBbXVxuICBjb25zdCBjb25maXJtZWQgPSBzdGF0ZT8uY29uZmlybWVkID8/IFtdXG4gIGNvbnN0IGNvbmNlcHRzID0gc3RhdGU/LmNvbmNlcHRzID8/IFtdXG5cbiAgY29uc3QgdGFiczogQXJyYXk8eyBrZXk6IFRhYktleTsgbGFiZWw6IHN0cmluZyB9PiA9IFtcbiAgICB7IGtleTogJ2NvbW1pdHMnLCBsYWJlbDogdCgndGFiLmNvbW1pdHMnKSB9LFxuICAgIHsga2V5OiAnb3ZlcnZpZXcnLCBsYWJlbDogdCgndGFiLm92ZXJ2aWV3JykgfSxcbiAgICB7IGtleTogJ2V4ZWN1dGlvbicsIGxhYmVsOiB0KCd0YWIuZXhlY3V0aW9uJykgfSxcbiAgICB7IGtleTogJ3JldmlldycsIGxhYmVsOiB0KCd0YWIucmV2aWV3JykgfSxcbiAgICB7IGtleTogJ25vdGVzJywgbGFiZWw6IHQoJ3RhYi5ub3RlcycpIH0sXG4gICAgeyBrZXk6ICdzZXR0aW5ncycsIGxhYmVsOiB0KCd0YWIuc2V0dGluZ3MnKSB9LFxuICBdXG5cbiAgLyoqIFx1NjRDRFx1NEY1Q1x1N0VEM1x1Njc5Q1x1OTc2Mlx1Njc3Rlx1RkYwOFx1NjAzQlx1ODlDOFx1OTg3NVx1N0I3RVx1NzY4NFx1NUZFQlx1NjM3N1x1NTJBOFx1NEY1Q1x1NTE3MVx1NzUyOFx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCByZXN1bHRQYW5lbCA9IGFjdGlvblJlc3VsdCAhPT0gbnVsbFxuICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChDYXJkLCB7IHRpdGxlOiB0KCdyZXN1bHQucGFuZWwnKSB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiBzdHlsZXMucmVzdWx0IH0sIGFjdGlvblJlc3VsdCkpXG4gICAgOiBudWxsXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTk4NzVcdTdCN0UgXHUyNTAwXHUyNTAwXG4gIC8vIFx1OTg3Nlx1OTBFOFx1RkYxQVx1NEVEM1x1NUU5M1x1NjgwRiArIFx1NjNEMFx1NEVBNFx1NTkxQVx1OTAwOVx1NEUwQlx1NjJDOVx1RkYwOFx1N0VBNiAxLzUgXHU5QUQ4XHU1RUE2XHVGRjA5XHVGRjFCXHU0RTBCXHU2NUI5XHU2NzdGXHU1NzU3XHU1MzYwXHU1MTY4XHU1QkJEXHUzMDAyXG4gIGNvbnN0IGFsbFRhcmdldHM6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IG1ldGE6IHN0cmluZzsgc2hhOiBzdHJpbmcgfT4gPSBbXVxuICBpZiAoY29tbWl0c0RhdGEgIT09IG51bGwpIHtcbiAgICBpZiAoIWNvbW1pdHNEYXRhLndvcmtpbmcuaXNDbGVhbikge1xuICAgICAgYWxsVGFyZ2V0cy5wdXNoKHtcbiAgICAgICAga2V5OiAnd29ya2luZycsXG4gICAgICAgIGxhYmVsOiBgXHUyNUNGICR7dCgncmVwby53b3JraW5nJyl9XHVGRjA4JHtjb21taXRzRGF0YS53b3JraW5nLmZpbGVDb3VudH1cdUZGMDlgLFxuICAgICAgICBtZXRhOiBjb21taXRzRGF0YS53b3JraW5nLmZpbGVzLnNsaWNlKDAsIDMpLm1hcCgoZmlsZSkgPT4gZmlsZS5wYXRoLnNwbGl0KCcvJykucG9wKCkpLmpvaW4oJywgJyksXG4gICAgICAgIHNoYTogJ3dvcmtpbmcnLFxuICAgICAgfSlcbiAgICB9XG4gICAgZm9yIChjb25zdCBjb21taXQgb2YgY29tbWl0c0RhdGEuY29tbWl0cykge1xuICAgICAgY29uc3QgYWRkcyA9IGNvbW1pdC5maWxlcy5yZWR1Y2UoKHN1bSwgZmlsZSkgPT4gc3VtICsgZmlsZS5hZGRzLCAwKVxuICAgICAgY29uc3QgZGVscyA9IGNvbW1pdC5maWxlcy5yZWR1Y2UoKHN1bSwgZmlsZSkgPT4gc3VtICsgZmlsZS5kZWxzLCAwKVxuICAgICAgYWxsVGFyZ2V0cy5wdXNoKHtcbiAgICAgICAga2V5OiBjb21taXQuc2hhLFxuICAgICAgICBsYWJlbDogY29tbWl0LnN1YmplY3QsXG4gICAgICAgIG1ldGE6IGAke2NvbW1pdC5zaG9ydEhhc2h9IFx1MDBCNyAke2NvbW1pdC5hdXRob3J9IFx1MDBCNyAke25ldyBEYXRlKGNvbW1pdC5kYXRlKS50b0xvY2FsZVN0cmluZygpfSBcdTAwQjcgKyR7YWRkc30vLSR7ZGVsc31gLFxuICAgICAgICBzaGE6IGNvbW1pdC5zaGEsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBjb25zdCBzaG9ydExhYmVsID0gKHNoYTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBpZiAoc2hhID09PSAnd29ya2luZycpIHJldHVybiB0KCdyZXBvLndvcmtpbmcnKVxuICAgIGNvbnN0IHRhcmdldCA9IGFsbFRhcmdldHMuZmluZCgoZW50cnkpID0+IGVudHJ5LnNoYSA9PT0gc2hhKVxuICAgIHJldHVybiBgJHsodGFyZ2V0Py5tZXRhLnNwbGl0KCcgXHUwMEI3ICcpWzBdKSA/PyBzaGEuc2xpY2UoMCwgNyl9ICR7dGFyZ2V0Py5sYWJlbCA/PyAnJ31gLnRyaW0oKVxuICB9XG4gIGNvbnN0IGZpbHRlcmVkVGFyZ2V0cyA9IHBpY2tlckZpbHRlci50cmltKCkgPT09ICcnXG4gICAgPyBhbGxUYXJnZXRzXG4gICAgOiBhbGxUYXJnZXRzLmZpbHRlcigoZW50cnkpID0+IChlbnRyeS5sYWJlbCArIGVudHJ5Lm1ldGEpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocGlja2VyRmlsdGVyLnRyaW0oKS50b0xvd2VyQ2FzZSgpKSlcblxuICBjb25zdCBpbXBhY3RSaXNrQ29sb3IgPSB0aGVtZUF3YXJlVGV4dChpbXBhY3QgPT09IG51bGwgPyAnIzU3NjA2YScgOiAoUklTS19DT0xPUltpbXBhY3Qucmlza0xldmVsXSA/PyAnIzU3NjA2YScpKVxuXG4gIGNvbnN0IGNvbW1pdHNUYWIgPSAoXG4gICAgPD5cbiAgICAgIHsvKiBcdTRFRDNcdTVFOTNcdTY4MEYgKi99XG4gICAgICA8Q2FyZD5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyMyNTYzZWInKX0+e2NvbW1pdHNEYXRhPy5icmFuY2ggPz8gJ1x1MjAxNCd9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcgfX0+e2NvbW1pdHNEYXRhPy5yb290UGF0aCA/PyBwcm9qZWN0Py5yb290UGF0aCA/PyAnXHUyMDE0J308L3NwYW4+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkQ29tbWl0cygpIH19Pnt0KCdhY3Rpb24ucmVmcmVzaCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgIT09IG51bGx9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdzY2FuSGlzdG9yeScsICcvcHJvamVjdC1jb250cm9sL2FwaS9ib290c3RyYXAnLCB7IGluY2x1ZGVIaXN0b3J5OiB0cnVlLCBzdW1tYXJpemU6IHRydWUsIG1heENvbW1pdHM6IDMwIH0pIH19XG4gICAgICAgICAgPntidXN5ID09PSAnc2Nhbkhpc3RvcnknID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ3JlcG8uc2Nhbkhpc3RvcnknKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NhcmQ+XG4gICAgICB7LyogXHU2M0QwXHU0RUE0XHU1OTFBXHU5MDA5XHU0RTBCXHU2MkM5XHVGRjA4XHU3RDI3XHU1MUQxXHVGRjFCXHU5MDA5XHU0RTJEXHU1MTg1XHU1QkI5XHU1QjhDXHU2NTc0XHU1QzU1XHU3OTNBXHVGRjBDXHU1MTQxXHU4QkI4XHU4MUVBXHU3MTM2XHU2MzYyXHU4ODRDXHVGRjA5ICovfVxuICAgICAgPENhcmQgdGl0bGU9e3QoJ3BpY2tlci50aXRsZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCB3aWR0aDogJzEwMCUnLCB0ZXh0QWxpZ246ICdsZWZ0JywgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsIHdoaXRlU3BhY2U6ICdub3JtYWwnIH19XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldFBpY2tlck9wZW4oIXBpY2tlck9wZW4pIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWluV2lkdGg6IDAgfX0+XG4gICAgICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgICAgPyB0KCdwaWNrZXIucGxhY2Vob2xkZXInKVxuICAgICAgICAgICAgICAgIDogYCR7dCgncGlja2VyLnNlbGVjdGVkJyl9ICR7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aH1cdUZGMUEke3NlbGVjdGVkVGFyZ2V0cy5tYXAoc2hvcnRMYWJlbCkuam9pbignXHVGRjFCJyl9YH1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1hcmdpbkxlZnQ6ICc4cHgnLCBmbGV4U2hyaW5rOiAwIH19Plx1MjVCRTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICB7cGlja2VyT3BlbiAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnZml4ZWQnLCBpbnNldDogMCwgekluZGV4OiAyOSB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBpY2tlck9wZW4oZmFsc2UpIH19IC8+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAnY2FsYygxMDAlICsgNHB4KScsIGxlZnQ6IDAsIHJpZ2h0OiAwLCB6SW5kZXg6IDMwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsIGJveFNoYWRvdzogJzAgOHB4IDI0cHggcmdiYSgwLDAsMCwwLjEyKScsIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnOHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJywgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuaW5wdXR9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0KCdwaWNrZXIuZmlsdGVyJyl9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwaWNrZXJGaWx0ZXJ9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRQaWNrZXJGaWx0ZXIoZS50YXJnZXQudmFsdWUpIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyBzZXRTZWxlY3RlZFRhcmdldHMoW10pIH19Pnt0KCdwaWNrZXIuY2xlYXInKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1heEhlaWdodDogNDIwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICAgIHthbGxUYXJnZXRzLm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGtleT17ZW50cnkua2V5fVxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnN3B4IDEycHgnLCBjdXJzb3I6ICdwb2ludGVyJywgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhlbnRyeS5zaGEpID8gJ3JnYmEoMzcsOTksMjM1LDAuMDcpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgdG9nZ2xlVGFyZ2V0KGVudHJ5LnNoYSkgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IHdpZHRoOiAnMTRweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJywgZm9udFdlaWdodDogNzAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhlbnRyeS5zaGEpID8gJ1x1MjcxMycgOiAnJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWluV2lkdGg6IDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT57ZW50cnkubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e2VudHJ5Lm1ldGF9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIHtmaWx0ZXJlZFRhcmdldHMubGVuZ3RoID09PSAwICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3BpY2tlci5ub01hdGNoJyl9PC9kaXY+fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luVG9wOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ3BpY2tlci5oaW50Jyl9PC9zcGFuPlxuICAgICAgICAgIHtkZXRhaWxMb2FkaW5nICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNkY2RjYWEnKX0+e3QoJ2RldGFpbC5haUxvYWRpbmcnKX08L3NwYW4+fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FyZD5cblxuICAgICAge2NvbW1pdHNFcnJvciAhPT0gbnVsbCAmJiA8Q2FyZD48ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXBvLmxvYWRGYWlsZWQnKX06IHtjb21taXRzRXJyb3J9PC9kaXY+PC9DYXJkPn1cbiAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwICYmIDxDYXJkPjxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2RldGFpbC5waWNrJyl9PC9kaXY+PC9DYXJkPn1cblxuICAgICAgey8qIFx1NkJDRlx1Njc2MVx1OTAwOVx1NEUyRFx1NjNEMFx1NEVBNFx1NzY4NCBBSSBcdTg5RTNcdThCRkIgKi99XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLm1hcCgodGFyZ2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGQgPSBkZXRhaWxzW3RhcmdldF1cbiAgICAgICAgY29uc3QgbGFiZWwgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/IHQoJ3JlcG8ud29ya2luZycpIDogKGQ/LmNvbW1pdD8ubWVzc2FnZSA/PyB0YXJnZXQuc2xpY2UoMCwgOCkpXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPENhcmQga2V5PXtgZC0ke3RhcmdldH1gfSB0aXRsZT17YFx1RDgzRFx1REQwRCAke2xhYmVsfSR7dGFyZ2V0ICE9PSAnd29ya2luZycgPyBgXHVGRjA4JHt0YXJnZXQuc2xpY2UoMCwgOCl9XHVGRjA5YCA6ICcnfWB9PlxuICAgICAgICAgICAge2QgIT09IHVuZGVmaW5lZCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpc0NhY2hlZCA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9Pnt0KCdjYWNoZS5oaXQnKX17ZC5hbmFseXNpc0dlbmVyYXRlZEF0ID8gJyBcdTAwQjcgJyArIG5ldyBEYXRlKGQuYW5hbHlzaXNHZW5lcmF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKSA6ICcnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkRGV0YWlsKHRhcmdldCwgdHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XG4gICAgICAgICAgICAgICAgICB0aXRsZT17dCgnZGV0YWlsLnNhdmVOb3RlSGludCcpfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGEgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/ICd3b3JraW5nJyA6IHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB2b2lkIHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzJywge1xuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBgJHt0KCdkZXRhaWwuc2F2ZU5vdGVUaXRsZScpfVx1RkYxQSR7KGQuY29tbWl0Py5tZXNzYWdlID8/IHRhcmdldCkuc2xpY2UoMCwgNjApfWAsXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDogW2BcdTMwMTBcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDhcdTMwMTFcXG4ke2QuYW5hbHlzaXMud2hhdH1gLCBgXHUzMDEwXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxXHUzMDExXFxuJHtkLmFuYWx5c2lzLmxvZ2ljfWAsIGBcdTMwMTBcdTk4Q0VcdTk2NjlcdTcwQjlcdTMwMTFcXG4ke2QuYW5hbHlzaXMucmlza31gXS5maWx0ZXIoKGJsb2NrKSA9PiAhYmxvY2suZW5kc1dpdGgoJ1x1MzAxMVxcbicpKS5qb2luKCdcXG5cXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgICBzaGEsIHRhZ3M6ICdcdTY4MzhcdTY3RTUnLFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKCh7IG9rIH0pID0+IHsgc2V0QWN0aW9uUmVzdWx0KG9rID8gJ1x1MjcxMyBcdTVERjJcdTVCNThcdTRFM0FcdTdCMTRcdThCQjBcdUZGMDhcdTdCMTRcdThCQjBcdTk4NzVcdTUzRUZcdTY3RTVcdTc3MEJcdUZGMDknIDogJ1x1MjcxNyBcdTRGRERcdTVCNThcdTU5MzFcdThEMjUnKSA7IGlmIChvaykgdm9pZCBsb2FkTm90ZXMoKSB9KVxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XHVEODNEXHVEQ0JFIHt0KCdkZXRhaWwuc2F2ZU5vdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdkZXRhaWwuc2F2ZU1lbW9yeUhpbnQnKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hhID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyB1bmRlZmluZWQgOiB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnknLCB7XG4gICAgICAgICAgICAgICAgICAgICAgbWVtb3J5VHlwZTogJ3Jpc2tfaG90c3BvdCcsIHNvdXJjZVRhZzogJ3JldmlldycsIGJhc2lzU2hhOiBzaGEsXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGBcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdUZGMUEkeyhkLmNvbW1pdD8ubWVzc2FnZSA/PyB0YXJnZXQpLnNsaWNlKDAsIDYwKX1gLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFtkLmFuYWx5c2lzLndoYXQsIGQuYW5hbHlzaXMucmlza10uZmlsdGVyKChwYXJ0KSA9PiBwYXJ0ICE9PSAnJykuam9pbignXFxuLS0tXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHsgb2sgfSkgPT4geyBzZXRBY3Rpb25SZXN1bHQob2sgPyAnXHUyNzEzIFx1NURGMlx1NkM4OVx1NkRDMFx1NEUzQVx1OEJCMFx1NUZDNlx1RkYwOFx1NUY4NVx1Nzg2RVx1OEJBNFx1OTYxRlx1NTIxN1x1RkYwOScgOiAnXHUyNzE3IFx1NEZERFx1NUI1OFx1NTkzMVx1OEQyNScpOyBpZiAob2spIHZvaWQgbG9hZE1lbW9yaWVzKCkgfSlcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlx1RDgzRVx1RERFMCB7dCgnZGV0YWlsLnNhdmVNZW1vcnknKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2QgPT09IHVuZGVmaW5lZCA/IChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZGV0YWlsLmFpTG9hZGluZycpfTwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7ZC5jb21taXQgIT09IG51bGwgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmNvbW1pdE1ldGF9PntkLmNvbW1pdC5hdXRob3J9IFx1MDBCNyB7bmV3IERhdGUoZC5jb21taXQuZGF0ZSkudG9Mb2NhbGVTdHJpbmcoKX0gXHUwMEI3IHtkLmZpbGVzLmxlbmd0aH0ge3QoJ2RldGFpbC5maWxlcycpfSBcdTAwQjcgK3tkLmluc2VydGlvbnN9Ly17ZC5kZWxldGlvbnN9PC9kaXY+fVxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLndoYXQgIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnOHB4JyB9fT57dCgnZGV0YWlsLndoYXQnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLndoYXR9PntkLmFuYWx5c2lzLndoYXR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLmxvZ2ljLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnNlY3Rpb25UaXRsZX0+e3QoJ2RldGFpbC5sb2dpYycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5sb2dpYy5tYXAoKHN0ZXAsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3N0eWxlcy5sb2dpY1N0ZXB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLCBmb250V2VpZ2h0OiA2MDAgfX0+e2kgKyAxfS48L3NwYW4+e3N0ZXB9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5yaXNrcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnNnB4JyB9fT57dCgnZGV0YWlsLnJpc2snKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2QuYW5hbHlzaXMucmlza3MubWFwKChyaXNrLCBpKSA9PiA8ZGl2IGtleT17aX0gc3R5bGU9e3N0eWxlcy5yaXNrSXRlbX0+XHUyNkEwIHtyaXNrfTwvZGl2Pil9XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHsvKiBcdTY1ODdcdTRFRjZcdTZFMDVcdTUzNTUgKyBcdTkwMTBcdTY1ODdcdTRFRjZcdTlBRDhcdTRFQUVcdTVCRjlcdTZCRDQgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBtYXJnaW5Ub3A6ICcxMHB4JyB9fT57dCgnZGV0YWlsLmZpbGVzJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICB7ZC5maWxlcy5tYXAoKGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0YXJnZXR9fCR7ZmlsZS5wYXRofWBcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXRjaCA9IGZpbGVEaWZmc1trZXldXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2tleX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+e2ZpbGUucGF0aH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGNvbG9yOiAnIzFhN2YzNycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19Pit7ZmlsZS5hZGRzfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgY29sb3I6ICcjY2YyMjJlJywgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+LXtmaWxlLmRlbHN9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkRmlsZURpZmYodGFyZ2V0LCBmaWxlLnBhdGgpIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGF0Y2ggPT09IHVuZGVmaW5lZCA/IHQoJ2RpZmYuc2hvdycpIDogdCgnZGlmZi5oaWRlJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7cGF0Y2ggIT09IHVuZGVmaW5lZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17YCR7a2V5fS1kaWZmYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY29sU3Bhbj17NH0gc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBwYWRkaW5nOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGlmZlZpZXcgcGF0Y2g9e3BhdGNofSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQ2FyZD5cbiAgICAgICAgKVxuICAgICAgfSl9XG5cbiAgICAgIHsvKiBcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdUZGMUFcdTYzMDlcdTk0QUUgKyBcdTk4Q0VcdTk2NjlcdTY3ODRcdTYyMTAgKyBcdTU5MjdcdTU2RkUgKyBcdTVGNzFcdTU0Q0RcdTcwQjlcdTY2MEVcdTdFQzYgKyBcdThCQjBcdTVGQzZcdTgwNTRcdTUyQTggKi99XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17dCgnZGV0YWlsLmltcGFjdCcpfT5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17aW1wYWN0TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJbXBhY3QoKSB9fT5cbiAgICAgICAgICAgIHtpbXBhY3RMb2FkaW5nID8gdCgnZGV0YWlsLmltcGFjdExvYWRpbmcnKSA6IHQoJ2RldGFpbC5pbXBhY3QnKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIGltcGFjdC5leHBsYW5hdGlvbnNDYWNoZWQgPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKCcjOGI4YjhiJyksIG1hcmdpbkxlZnQ6ICc4cHgnIH19PlxuICAgICAgICAgICAgICB7dCgnY2FjaGUuaGl0Jyl9e2ltcGFjdC5nZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShpbXBhY3QuZ2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ31cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtpbXBhY3QgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBtYXJnaW5MZWZ0OiAnOHB4JywgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IGRpc2FibGVkPXtpbXBhY3RMb2FkaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZEltcGFjdCh0cnVlKSB9fT5cbiAgICAgICAgICAgICAge3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzEwcHgnLCBtYXJnaW46ICcxMHB4IDAgNHB4JywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoaW1wYWN0Umlza0NvbG9yKSwgZm9udFNpemU6ICcxM3B4JywgcGFkZGluZzogJzNweCAxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIHt0KCdpbXBhY3QucmlzaycpfToge2ltcGFjdC5yaXNrTGV2ZWx9XHVGRjA4e2ltcGFjdC5yaXNrU2NvcmV9XHVGRjA5XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIHtpbXBhY3Qua2V5Q2hhbmdlUG9pbnRzICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LmtleUNoYW5nZVBvaW50cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAnIzlhNjcwMCcgfX0+XHUyNkEwIHt0KCdpbXBhY3Qua2V5UG9pbnRzJyl9OiB7aW1wYWN0LmtleUNoYW5nZVBvaW50cy5tYXAoKGZpbGUpID0+IGZpbGUuc3BsaXQoJy8nKS5wb3AoKSkuam9pbignXHUzMDAxJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7aW1wYWN0LnJpc2tGYWN0b3JzICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LnJpc2tGYWN0b3JzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2VjdGlvblRpdGxlfT57dCgnaW1wYWN0LmZhY3RvcnMnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnMnB4JywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpbXBhY3Qucmlza0ZhY3RvcnMubWFwKChmYWN0b3IsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBmb250U2l6ZTogJzEycHgnLCBwYWRkaW5nOiAnM3B4IDhweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLCBib3JkZXJSYWRpdXM6ICc0cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2ZhY3Rvci50ZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBpbXBhY3RSaXNrQ29sb3IsIGZvbnRXZWlnaHQ6IDYwMCB9fT4re2ZhY3Rvci5wb2ludHN9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8SW1wYWN0R3JhcGggZGF0YT17aW1wYWN0fSB0PXt0fSAvPlxuICAgICAgICAgICAgICB7aW1wYWN0LmxldmVscy5sZW5ndGggPT09IDAgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnaW1wYWN0Lm5vbmUnKX08L2Rpdj59XG4gICAgICAgICAgICAgIHsvKiBcdTUxRkRcdTY1NzBcdTdFQTdcdTVGNzFcdTU0Q0RcdUZGMUFcdTY3MkNcdTZCMjFcdTRGRUVcdTY1MzlcdTRFODZcdTU0RUFcdTRFOUJcdTUxRkRcdTY1NzBcdTMwMDFcdTZDRTJcdTUzQ0FcdTRFODZcdThDMDFcdTc2ODRcdTU0RUFcdTRFOUJcdTUxRkRcdTY1NzBcdTMwMDFcdThDMDNcdTc1MjhcdTcwQjlcdTU3MjhcdTU0RUEgKi99XG4gICAgICAgICAgICAgIHtpbXBhY3QuZnVuY3Rpb25JbXBhY3QgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3QuZnVuY3Rpb25JbXBhY3QubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnMTJweCcgfX0+e3QoJ2ltcGFjdC5mdW5jdGlvbnMnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAge2ltcGFjdC5mdW5jdGlvbkltcGFjdC5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5LnN5bWJvbH0gc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAxMHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNkOTc3MDYnKX0+e2VudHJ5LnN5bWJvbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5sYWJlbCwgbWFyZ2luTGVmdDogJzhweCcgfX0+e2VudHJ5LmRlZmluZWRJbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5yb2xlICE9PSB1bmRlZmluZWQgJiYgZW50cnkucm9sZSAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdpbmxpbmUnLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+e3QoJ2ltcGFjdC5mdW5jUm9sZScpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkucm9sZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNoYW5nZSAhPT0gdW5kZWZpbmVkICYmIGVudHJ5LmNoYW5nZSAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0IH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdpbmxpbmUnLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnLCBjb2xvcjogJyM5YTY3MDAnIH19Pnt0KCdpbXBhY3QuZnVuY0NoYW5nZScpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuaW1wYWN0ICE9PSB1bmRlZmluZWQgJiYgZW50cnkuaW1wYWN0ICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NlOTE3OCcpIH19Pnt0KCdpbXBhY3QuZnVuY0NhbGxlcnMnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmltcGFjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNhbGxlcnMubWFwKChjYWxsZXIsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7IC4uLnN0eWxlcy5sb2dpY1N0ZXAsIG1hcmdpblRvcDogJzNweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICcjZDk3NzA2JyB9fT5cdTIxQjM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2FsbGVyLmZpbGV9OntjYWxsZXIubGluZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHUyMDE0IHtjYWxsZXIuc25pcHBldC5zbGljZSgwLCA4MCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7aW1wYWN0LmZ1bmN0aW9uSW1wYWN0ICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LmZ1bmN0aW9uSW1wYWN0Lmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnaW1wYWN0LmZ1bmN0aW9uc05vbmUnKX08L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge2ltcGFjdC5tZW1vcmllcyAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5tZW1vcmllcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnLCBib3JkZXI6ICcxcHggZGFzaGVkIHJnYmEoMzcsOTksMjM1LDAuMzUpJywgYm9yZGVyUmFkaXVzOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Pnt0KCdpbXBhY3QubWVtb3J5Jyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleFdyYXA6ICd3cmFwJywgZ2FwOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAge2ltcGFjdC5tZW1vcmllcy5tYXAoKG1lbW9yeSwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGtleT17aX0gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzI1NjNlYicpfT57bWVtb3J5LnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTVcdUZGMUFcdTdFRDNcdThCQkEgKyBcdTdFRDNcdTY3ODRcdTUzMTZcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTUgKi99XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17dCgnZGV0YWlsLm9wdGltYWxpdHknKX0+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e3Jldmlld0xvYWRpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkUmV2aWV3cygpIH19PlxuICAgICAgICAgICAge3Jldmlld0xvYWRpbmcgPyB0KCdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnKSA6IHQoJ2RldGFpbC5vcHRpbWFsaXR5Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAge3NlbGVjdGVkVGFyZ2V0cy5tYXAoKHRhcmdldCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgciA9IHJldmlld3NbdGFyZ2V0XVxuICAgICAgICAgICAgaWYgKHIgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGxcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IHRhcmdldC5zbGljZSgwLCA4KVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2ByLSR7dGFyZ2V0fWB9IHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICAgICAgICAgIHtyLmNhY2hlZCA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e3QoJ2NhY2hlLmhpdCcpfXtyLmdlbmVyYXRlZEF0ID8gJyBcdTAwQjcgJyArIG5ldyBEYXRlKHIuZ2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSZXZpZXdzKHRydWUpIH19Pnt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge3IudmVyZGljdCAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCwgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDUpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMzcsOTksMjM1LDAuMiknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnIH19PntyLnZlcmRpY3R9PC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7ci5pc3N1ZUxpc3QgIT09IHVuZGVmaW5lZCAmJiByLmlzc3VlTGlzdC5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRyPntbJ3Jldmlldy5jb2wuc2V2ZXJpdHknLCAncmV2aWV3LmNvbC5jYXRlZ29yeScsICdyZXZpZXcuY29sLnRpdGxlJywgJ3Jldmlldy5jb2wuZXZpZGVuY2UnLCAncmV2aWV3LmNvbC5maXgnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAge3IuaXNzdWVMaXN0Lm1hcCgoaXNzdWUsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShpc3N1ZS5zZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyA/ICcjZjE0YzRjJyA6IGlzc3VlLnNldmVyaXR5ID09PSAnaGlnaCcgPyAnI2NlOTE3OCcgOiBpc3N1ZS5zZXZlcml0eSA9PT0gJ21lZGl1bScgPyAnI2RjZGNhYScgOiAnIzU2OWNkNicpfT57aXNzdWUuc2V2ZXJpdHl9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXNzdWUuY2F0ZWdvcnl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntpc3N1ZS50aXRsZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4Jywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57aXNzdWUuZXZpZGVuY2V9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntpc3N1ZS5maXh9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXZpZXcuY2xlYW4nKX08L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KX1cbiAgICAgICAgICB7cmV2aWV3TG9hZGluZyAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnKX08L2Rpdj59XG4gICAgICAgICAgeyFyZXZpZXdMb2FkaW5nICYmIHNlbGVjdGVkVGFyZ2V0cy5ldmVyeSgodGFyZ2V0KSA9PiByZXZpZXdzW3RhcmdldF0gPT09IHVuZGVmaW5lZCkgJiYgKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncmV2aWV3LmhpbnQnKX08L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuICAgIDwvPlxuICApXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1OEJCRVx1N0Y2RVx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgVElFUl9MQUJFTFM6IEFycmF5PHsga2V5OiBzdHJpbmc7IHpoOiBzdHJpbmc7IGRlc2M6IHN0cmluZyB9PiA9IFtcbiAgICB7IGtleTogJ3N0YW5kYXJkJywgemg6ICdcdTg5RTNcdThCRkIgLyBcdTUxRkRcdTY1NzBcdTVGNzFcdTU0Q0RcdThCRjRcdTY2MEUnLCBkZXNjOiAnXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XHU3Njg0IEFJIFx1ODlFM1x1OEJGQlx1MzAwMVx1NUY3MVx1NTRDRFx1NTIwNlx1Njc5MCcgfSxcbiAgICB7IGtleTogJ3JlYXNvbmluZycsIHpoOiAnXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1IC8gXHU2MjY3XHU4ODRDXHU4QkExXHU1MjEyJywgZGVzYzogJ1x1OEJDNFx1NUJBMVx1MzAwMVx1OEJBMVx1NTIxMlx1NzUxRlx1NjIxMFx1MzAwMUFJIFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEMycgfSxcbiAgICB7IGtleTogJ2Zhc3QnLCB6aDogJ1x1NTM4Nlx1NTNGMlx1OEY3Qlx1Njc5MCcsIGRlc2M6ICdcdTYyNkJcdTYzQ0ZcdTUzODZcdTUzRjJcdTY1RjZcdTc2ODRcdTkwMTBcdTYzRDBcdTRFQTRcdTRFMDBcdTUzRTVcdThCREQnIH0sXG4gICAgeyBrZXk6ICd2ZXJpZmllcicsIHpoOiAnXHU5QThDXHU2NTM2JywgZGVzYzogJ1x1NjUzOVx1NTJBOFx1OUE4Q1x1NjUzNlx1NzY4NCBBSSBcdTU5MERcdTY4MzgnIH0sXG4gIF1cblxuICBjb25zdCBzZXR0aW5nc1RhYiA9IChcbiAgICA8PlxuICAgICAgey8qIFx1NkEyMVx1NTc4Qlx1NTIwNlx1OTE0RFx1RkYxQVx1NTNFRlx1ODlDNlx1NTMxNlx1NTIwN1x1NjM2Mlx1NTQwNFx1NEVGQlx1NTJBMVx1NzUyOFx1NzY4NFx1NkEyMVx1NTc4Qlx1RkYwQ1x1NEZERFx1NUI1OFx1NTM3M1x1NzUxRlx1NjU0OCAqL31cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdtb2RlbC50aXRsZScpfT5cbiAgICAgICAge21vZGVsVGllcnMgPT09IG51bGwgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnbW9kZWwubG9hZGluZycpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICB7VElFUl9MQUJFTFMubWFwKCh0aWVyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBtb2RlbFRpZXJzW3RpZXIua2V5XVxuICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnQgPyBjdXJyZW50LnByb3ZpZGVyICsgJy8nICsgY3VycmVudC5tb2RlbCA6ICcnXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e3RpZXIua2V5fSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1pbldpZHRoOiAxNTAsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fT57dGllci56aH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgd2lkdGg6IDI0MCB9fVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHYgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgIGlmICh2ID09PSAnJykgeyBzZXRNb2RlbFRpZXJzKHsgLi4ubW9kZWxUaWVycywgW3RpZXIua2V5XTogeyBwcm92aWRlcjogJycsIG1vZGVsOiAnJyB9IH0pOyByZXR1cm4gfVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtwcm92aWRlciwgLi4ucmVzdF0gPSB2LnNwbGl0KCcvJylcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IHJlc3Quam9pbignLycpXG4gICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZWxUaWVycyh7IC4uLm1vZGVsVGllcnMsIFt0aWVyLmtleV06IHsgcHJvdmlkZXIsIG1vZGVsIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt0KCdtb2RlbC5mb2xsb3dDaGF0Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIHttb2RlbE9wdGlvbnMubWFwKChvcHRpb24pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfSB2YWx1ZT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRpb24ucHJvdmlkZXJ9IC8ge29wdGlvbi5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3RpZXIuZGVzY308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17bW9kZWxTYXZpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzYXZlTW9kZWxDb25maWcoKSB9fT5cbiAgICAgICAgICAgICAgICB7bW9kZWxTYXZpbmcgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnbW9kZWwuc2F2ZScpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAge21vZGVsU2F2ZWQgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzRlYzliMCcpfT57dCgnbW9kZWwuc2F2ZWQnKX08L3NwYW4+fVxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnbW9kZWwuaGludCcpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgICAgPGRpdiBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC10ZXJ0aWFyeSwgIzljYTNhZiknLCBwYWRkaW5nOiAnOHB4IDAnIH19PlxuICAgICAgICBkc2gtcHJvamVjdC1jb250cm9sIHZ7c3RhdGU/LnBsdWdpblZlcnNpb24gPz8gJz8nfVxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gIClcblxuICBjb25zdCBvdmVydmlld1RhYiA9IChcbiAgICA8PlxuICAgICAgPENhcmQ+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtib290c3RyYXBwaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQm9vdHN0cmFwKCkgfX0+XG4gICAgICAgICAgICB7Ym9vdHN0cmFwcGluZyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24ucmVzY2FuJyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGx9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2FuYWx5emUnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvYW5hbHl6ZScsIHt9KSB9fT5cbiAgICAgICAgICAgIHtidXN5ID09PSAnYW5hbHl6ZScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLmFuYWx5emUnKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbH0gb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbigndmVyaWZ5JywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3ZlcmlmeScsIHt9KSB9fT5cbiAgICAgICAgICAgIHtidXN5ID09PSAndmVyaWZ5JyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24udmVyaWZ5Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9DYXJkPlxuICAgICAge3Jlc3VsdFBhbmVsfVxuICAgICAge3Byb2plY3QgPT09IG51bGwgPyAoXG4gICAgICAgIDxDYXJkPlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEzcHgnLCBtYXJnaW5Cb3R0b206ICc2cHgnIH19Pnt0KCdzdGF0ZS5ub1Byb2plY3QnKX08L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdzdGF0ZS5ub1Byb2plY3RIaW50Jyl9PC9kaXY+XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXtgJHt0KCdzdGF0ZS5wcm9qZWN0Jyl9XHVGRjFBJHtwcm9qZWN0Lm5hbWV9YH0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT5Sb290PC9zcGFuPntwcm9qZWN0LnJvb3RQYXRofTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7Ym9vdHN0cmFwICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS50ZWNoU3RhY2snKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7Ym9vdHN0cmFwLnRlY2hTdGFjay5tYXAoKHRlY2gpID0+IDxzcGFuIGtleT17dGVjaH0gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzRlYzliMCcpfT57dGVjaH08L3NwYW4+KX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUuc3ltYm9scycpfTwvc3Bhbj57U3RyaW5nKGJvb3RzdHJhcC5zeW1ib2xzQ291bnQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUubWFuaWZlc3RzJyl9PC9zcGFuPntTdHJpbmcoYm9vdHN0cmFwLm1hbmlmZXN0RmlsZXMubGVuZ3RoKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLmV2aWRlbmNlJyl9PC9zcGFuPntTdHJpbmcoc3RhdGU/LmV2aWRlbmNlQ291bnQgPz8gMCl9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luVG9wOiAnOHB4JyB9fT57Ym9vdHN0cmFwLnN1bW1hcnl9PC9kaXY+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2NvbmZpcm1lZC50aXRsZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPXsyfSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSBwbGFjZWhvbGRlcj17dCgnY29uZmlybWVkLnRleHQnKX0gdmFsdWU9e2NvbmZpcm1lZFRleHR9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDb25maXJtZWRUZXh0KGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnY29uZmlybWVkLnBhdGhzJyl9IHZhbHVlPXtjb25maXJtZWRQYXRoc30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENvbmZpcm1lZFBhdGhzKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuYnV0dG9ufVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgY29uZmlybWVkVGV4dCA9PT0gJyd9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdhZGRDb25maXJtZWQnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY29uZmlybWVkJywgeyB0eXBlOiAnY29uc3RyYWludCcsIHRleHQ6IGNvbmZpcm1lZFRleHQsIGZvcmJpZGRlblBhdGhzOiBjb25maXJtZWRQYXRocy5zcGxpdCgnLCcpLm1hcCgocGF0aCkgPT4gcGF0aC50cmltKCkpLmZpbHRlcigocGF0aCkgPT4gcGF0aCAhPT0gJycpIH0pLnRoZW4oKCkgPT4geyBzZXRDb25maXJtZWRUZXh0KCcnKTsgc2V0Q29uZmlybWVkUGF0aHMoJycpIH0pIH19XG4gICAgICAgICAgPntidXN5ID09PSAnYWRkQ29uZmlybWVkJyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdjb25maXJtZWQuYWRkJyl9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7Y29uZmlybWVkLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdjb25maXJtZWQubm9uZScpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge2NvbmZpcm1lZC5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtpdGVtLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjYzU4NmMwJyl9PntpdGVtLnR5cGV9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2l0ZW0udGV4dH08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntpdGVtLmZvcmJpZGRlblBhdGhzLmpvaW4oJywgJykgfHwgJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3JlbW92ZUNvbmZpcm1lZCcsICcvcHJvamVjdC1jb250cm9sL2FwaS9jb25maXJtZWQvcmVtb3ZlJywgeyBpZDogaXRlbS5pZCB9KSB9fVxuICAgICAgICAgICAgICAgICAgICA+XHUyNzE1PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0uY2hhbmdlVGl0bGUnKX0gdmFsdWU9e2NoYW5nZVRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q2hhbmdlVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHRleHRhcmVhIHJvd3M9ezJ9IHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLmNoYW5nZURlc2MnKX0gdmFsdWU9e2NoYW5nZURlc2N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDaGFuZ2VEZXNjKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuYnV0dG9ufVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgY2hhbmdlVGl0bGUgPT09ICcnfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignY3JlYXRlQ2hhbmdlJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NoYW5nZXMnLCB7IHRpdGxlOiBjaGFuZ2VUaXRsZSwgZGVzY3JpcHRpb246IGNoYW5nZURlc2MgfSkudGhlbigoKSA9PiB7IHNldENoYW5nZVRpdGxlKCcnKTsgc2V0Q2hhbmdlRGVzYygnJykgfSkgfX1cbiAgICAgICAgICA+e2J1c3kgPT09ICdjcmVhdGVDaGFuZ2UnID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi5jcmVhdGVDaGFuZ2UnKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtjaGFuZ2VzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdzdGF0ZS5ub0NoYW5nZXMnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57WydjaGFuZ2VzLmNvbC50aXRsZScsICdjaGFuZ2VzLmNvbC50eXBlJywgJ2NoYW5nZXMuY29sLnN0YXR1cycsICdjaGFuZ2VzLmNvbC51cGRhdGVkJ10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtjaGFuZ2VzLm1hcCgoY2hhbmdlKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17Y2hhbmdlLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Y2hhbmdlLnRpdGxlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShjaGFuZ2Uuc3RhdHVzID09PSAnY29tcGxldGVkJyA/ICcjNGVjOWIwJyA6ICcjNTY5Y2Q2Jyl9PntjaGFuZ2Uuc3RhdHVzfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntmb3JtYXRUaW1lKGNoYW5nZS51cGRhdGVkQXQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyh7IHRpdGxlOiAnXHU1MjIwXHU5NjY0XHU4RkQ5XHU0RTJBXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExXHVGRjFGJywgbWVzc2FnZTogJ1x1MzAwQycgKyBjaGFuZ2UudGl0bGUgKyAnXHUzMDBEXHU1M0NBXHU1MTc2XHU1MTY4XHU5MEU4XHU2MjY3XHU4ODRDXHU4QkIwXHU1RjU1XHUzMDAxXHU4QkExXHU1MjEyXHUzMDAxXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHU1QzA2XHU4OEFCXHU2QzM4XHU0RTQ1XHU1MjIwXHU5NjY0XHUzMDAyJywgZGFuZ2VyOiB0cnVlLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2RlbGV0ZUNoYW5nZScsICcvcHJvamVjdC1jb250cm9sL2FwaS9jaGFuZ2VzL2RlbGV0ZScsIHsgaWQ6IGNoYW5nZS5pZCB9KSB9IH0pIH19Plx1MjcxNTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICA8Lz5cbiAgKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdTk4NzVcdTdCN0VcdUZGMUFcdTk4NzVcdTk3NjJcdTc2RjRcdTYzQTVcdTUyMUJcdTVFRkFcdTVFNzZcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMENcdTgwNEFcdTU5MjlcdTUzRUFcdTY2MkZcdTUzRTZcdTRFMDBcdTc5Q0RcdTUxNjVcdTUzRTMgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IGV4ZWN1dGlvblRhYiA9IChcbiAgICA8PlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ2V4ZWMuY3JlYXRlJyl9PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdleGVjLmZvcm1UaXRsZScpfSB2YWx1ZT17ZXhlY1RpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RXhlY1RpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSByb3dzPXszfSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtRGVzYycpfSB2YWx1ZT17ZXhlY0Rlc2N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFeGVjRGVzYyhlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBleGVjVGl0bGUudHJpbSgpID09PSAnJyB8fCBleGVjRGVzYy50cmltKCkgPT09ICcnfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc3RhcnRSdW4oKSB9fT5cbiAgICAgICAgICAgIHtidXN5ID09PSAnc3RhcnRSdW4nID8gdCgnZXhlYy5zdGFydGluZycpIDogdCgnZXhlYy5zdGFydCcpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnZXhlYy5jcmVhdGVIaW50Jyl9PC9kaXY+XG4gICAgICA8L0NhcmQ+XG4gICAgICB7cmVzdWx0UGFuZWx9XG4gICAgICB7cGxhbkNvbmZpcm0gIT09IG51bGwgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17dCgncGxhbi50aXRsZScpfT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Cb3R0b206ICc4cHgnIH19Pnt0KCdwbGFuLmhpbnQnKX08L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxuICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRyPntbJ3BsYW4uY29sLnN0ZXAnLCAncGxhbi5jb2wucm9sZScsICdwbGFuLmNvbC5tb2RlbCcsICdwbGFuLmNvbC5wb2xpY3knLCAncGxhbi5jb2wuZW5hYmxlZCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICB7cGxhbkNvbmZpcm0uc3RlcHMubWFwKChzdGVwLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPHRyIGtleT17c3RlcC5pZH0gc3R5bGU9e3sgb3BhY2l0eTogc3RlcC5lbmFibGVkID8gMSA6IDAuNDUgfX0+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIG1pbldpZHRoOiAyMjAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+e2luZGV4ICsgMX0uIHtzdGVwLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3N0ZXAuZGVzY3JpcHRpb24uc2xpY2UoMCwgMTIwKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICB7c3RlcC50YXJnZXRGaWxlcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknIH19PntzdGVwLnRhcmdldEZpbGVzLmpvaW4oJywgJykuc2xpY2UoMCwgMTIwKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggNnB4JyB9fSB2YWx1ZT17c3RlcC5yb2xlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBsYW5Db25maXJtKHsgLi4ucGxhbkNvbmZpcm0sIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcy5tYXAoKGl0ZW0sIGkpID0+IGkgPT09IGluZGV4ID8geyAuLi5pdGVtLCByb2xlOiBlLnRhcmdldC52YWx1ZSB9IDogaXRlbSkgfSkgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7WydhbmFseXNpcycsICdwbGFubmluZycsICdjb2RpbmcnLCAnb3BzJywgJ3ZlcmlmaWNhdGlvbiddLm1hcCgocm9sZSkgPT4gPG9wdGlvbiBrZXk9e3JvbGV9IHZhbHVlPXtyb2xlfT57Uk9MRV9MQUJFTFNbcm9sZV0gPz8gcm9sZX08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggNnB4JyB9fSB2YWx1ZT17c3RlcC5tb2RlbFByb3ZpZGVyICsgJy8nICsgc3RlcC5tb2RlbElkfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtwcm92aWRlciwgbW9kZWxdID0gZS50YXJnZXQudmFsdWUuc3BsaXQoJy8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRQbGFuQ29uZmlybSh7IC4uLnBsYW5Db25maXJtLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMubWFwKChpdGVtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4uaXRlbSwgbW9kZWxQcm92aWRlcjogcHJvdmlkZXIgPz8gJycsIG1vZGVsSWQ6IG1vZGVsID8/ICcnIH0gOiBpdGVtKSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiL1wiPnt0KCdwbGFuLm1vZGVsRGVmYXVsdCcpfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAge21vZGVsT3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gPG9wdGlvbiBrZXk9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0gdmFsdWU9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0+e29wdGlvbi5wcm92aWRlcn0ve29wdGlvbi5pZH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggNnB4JyB9fSB2YWx1ZT17c3RlcC5mYWlsdXJlUG9saWN5fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBsYW5Db25maXJtKHsgLi4ucGxhbkNvbmZpcm0sIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcy5tYXAoKGl0ZW0sIGkpID0+IGkgPT09IGluZGV4ID8geyAuLi5pdGVtLCBmYWlsdXJlUG9saWN5OiBlLnRhcmdldC52YWx1ZSB9IDogaXRlbSkgfSkgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoUE9MSUNZX0xBQkVMUykubWFwKChbdmFsdWUsIGxhYmVsXSkgPT4gPG9wdGlvbiBrZXk9e3ZhbHVlfSB2YWx1ZT17dmFsdWV9PntsYWJlbH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9e3N0ZXAuZW5hYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRQbGFuQ29uZmlybSh7IC4uLnBsYW5Db25maXJtLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMubWFwKChpdGVtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4uaXRlbSwgZW5hYmxlZDogZS50YXJnZXQuY2hlY2tlZCB9IDogaXRlbSkgfSkgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBtYXJnaW5Ub3A6ICcxMHB4JyB9fT5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtwbGFuQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxhdW5jaFBsYW4odHJ1ZSkgfX0+e3BsYW5CdXN5ID8gJ1x1MjAyNicgOiB0KCdwbGFuLmxhdW5jaEVkaXRlZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e3BsYW5CdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbGF1bmNoUGxhbihmYWxzZSkgfX0+e3QoJ3BsYW4ubGF1bmNoRGlyZWN0Jyl9PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17cGxhbkJ1c3l9IG9uQ2xpY2s9eygpID0+IHsgc2V0UGxhbkNvbmZpcm0obnVsbCkgfX0+e3QoJ3BsYW4uZGlzY2FyZCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuICAgICAgPENhcmQ+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdleGVjLmF0dGVtcHRzJyl9PC9zcGFuPntTdHJpbmcoc3RhdGU/LmF0dGVtcHRzQ291bnQgPz8gMCl9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3J1bnMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3N0YXRlLm5vUnVucycpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+e1snZXhlYy5jb2wuY2hhbmdlJywgJ2V4ZWMuY29sLnN0ZXBzJywgJ2V4ZWMuY29sLnN0YXR1cycsICdleGVjLmNvbC5zdGFydGVkJywgJ2V4ZWMuY29sLmNvc3QnLCAnZXhlYy5jb2wuZGV0YWlsJ10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtydW5zLm1hcCgocnVuKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17cnVuLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57KGNoYW5nZXMuZmluZCgoY2hhbmdlKSA9PiBjaGFuZ2UuaWQgPT09IHJ1bi5jaGFuZ2VJZCk/LnRpdGxlKSA/PyBydW4uY2hhbmdlSWR9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57cnVuLnN0ZXBzVG90YWwgPyAocnVuLnN0ZXBzRG9uZSA/PyAwKSArICcvJyArIHJ1bi5zdGVwc1RvdGFsIDogJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShydW4uc3RhdHVzID09PSAnc3VjY2VlZGVkJyB8fCBydW4uc3RhdHVzID09PSAnY29tcGxldGVkJyA/ICcjNGVjOWIwJyA6IHJ1bi5zdGF0dXMgPT09ICdmYWlsZWQnID8gJyNmMTRjNGMnIDogcnVuLnN0YXR1cyA9PT0gJ3BhdXNlZCcgPyAnI2Q5NzcwNicgOiAnI2RjZGNhYScpfT57UlVOX1NUQVRVU19MQUJFTFNbcnVuLnN0YXR1c10gPz8gcnVuLnN0YXR1c308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIHtydW4uY3VycmVudFN0ZXAgIT09IG51bGwgJiYgcnVuLmN1cnJlbnRTdGVwICE9PSB1bmRlZmluZWQgJiYgcnVuLnN0YXR1cyA9PT0gJ3J1bm5pbmcnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXhXaWR0aDogMTYwLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+e3J1bi5jdXJyZW50U3RlcH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2Zvcm1hdFRpbWUocnVuLnN0YXJ0ZWRBdCl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57cnVuLmNvc3RVc2QgIT09IHVuZGVmaW5lZCA/ICckJyArIHJ1bi5jb3N0VXNkLnRvRml4ZWQoNCkgOiAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJ1bkRldGFpbChydW4uaWQpIH19PntydW5EZXRhaWw/LnJ1bi5pZCA9PT0gcnVuLmlkID8gdCgncGxhbi5yZWZyZXNoRGV0YWlsJykgOiB0KCdwbGFuLnZpZXdEZXRhaWwnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgICB7cnVuRGV0YWlsICE9PSBudWxsICYmIChcbiAgICAgICAgPENhcmQgdGl0bGU9e3QoJ3BsYW4uZGV0YWlsVGl0bGUnKSArICcgXHUwMEI3ICcgKyBydW5EZXRhaWwucnVuLmNoYW5nZVRpdGxlfT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnc3VjY2VlZGVkJyB8fCBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgPyAnIzRlYzliMCcgOiBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgPyAnI2YxNGM0YycgOiBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ3BhdXNlZCcgPyAnI2Q5NzcwNicgOiAnI2RjZGNhYScpfT57UlVOX1NUQVRVU19MQUJFTFNbcnVuRGV0YWlsLnJ1bi5zdGF0dXNdID8/IHJ1bkRldGFpbC5ydW4uc3RhdHVzfTwvc3Bhbj5cbiAgICAgICAgICAgIHtydW5EZXRhaWwucnVuLmVycm9yICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAnI2QxMjQyZicgfX0+e3J1bkRldGFpbC5ydW4uZXJyb3IubWVzc2FnZX08L3NwYW4+fVxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSdW5EZXRhaWwocnVuRGV0YWlsLnJ1bi5pZCkgfX0+e3QoJ3BsYW4ucmVmcmVzaERldGFpbCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRSdW5EZXRhaWwobnVsbCkgfX0+e3QoJ3BsYW4uY2xvc2VEZXRhaWwnKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7cnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdwYXVzZWQnICYmIHJ1bkRldGFpbC5ydW4ucGF1c2VQb2ludCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc4cHggMTJweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGJhY2tncm91bmQ6ICdyZ2JhKDIxNywxMTksNiwwLjA4KScsIGJvcmRlcjogJzFweCBzb2xpZCByZ2JhKDIxNywxMTksNiwwLjM1KScsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEycHgnIH19Plx1MjNGOCB7dCgncGxhbi5wYXVzZWRCYW5uZXInKX08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57cnVuRGV0YWlsLnJ1bi5wYXVzZVBvaW50LnJlYXNvbn08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIG1hcmdpblRvcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCByZXN1bWVSdW4ocnVuRGV0YWlsLnJ1bi5pZCwgJ2NvbnRpbnVlJykgfX0+e3QoJ3BsYW4ucmVzdW1lUmV0cnknKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHJlc3VtZVJ1bihydW5EZXRhaWwucnVuLmlkLCAnc2tpcC1jdXJyZW50JykgfX0+e3QoJ3BsYW4ucmVzdW1lU2tpcCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgeyhydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgfHwgcnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdpbnRlcnJ1cHRlZCcpICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCByZXN1bWVSdW4ocnVuRGV0YWlsLnJ1bi5pZCwgJ2NvbnRpbnVlJykgfX0+e3QoJ3BsYW4ucmVzdW1lRmFpbGVkJyl9PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+e1sncGxhbi5jb2wuc3RlcCcsICdwbGFuLmNvbC5yb2xlJywgJ3BsYW4uY29sLm1vZGVsJywgJ2V4ZWMuY29sLnN0YXR1cycsICdwbGFuLmNvbC5hdHRlbXB0cycsICdleGVjLmNvbC5jb3N0J10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtydW5EZXRhaWwuc3RlcHMubWFwKChzdGVwLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3N0ZXAuaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PntpbmRleCArIDF9LiB7c3RlcC50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge3N0ZXAuY2xhaW1lZE91dGNvbWUgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1heFdpZHRoOiAzMjAsIHdoaXRlU3BhY2U6ICdub3JtYWwnIH19PntzdGVwLmNsYWltZWRPdXRjb21lLnNsaWNlKDAsIDE2MCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJ3JnYmEoODYsMTU2LDIxNCwwLjI1KScpfT57Uk9MRV9MQUJFTFNbc3RlcC5yb2xlXSA/PyBzdGVwLnJvbGV9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBmb250U2l6ZTogJzExcHgnIH19PntzdGVwLm1vZGVsID8/ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShzdGVwLnZlcmlmaWVkID8gJyM0ZWM5YjAnIDogc3RlcC5zdGF0dXMgPT09ICdmYWlsZWQnID8gJyNmMTRjNGMnIDogc3RlcC5zdGF0dXMgPT09ICdza2lwcGVkJyA/ICcjOGI5NDllJyA6ICcjZGNkY2FhJyl9PntTVEVQX1NUQVRVU19MQUJFTFNbc3RlcC5zdGF0dXNdID8/IHN0ZXAuc3RhdHVzfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntTdHJpbmcoc3RlcC5hdHRlbXB0c0NvdW50KX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntzdGVwLmNvc3RVc2QgPiAwID8gJyQnICsgc3RlcC5jb3N0VXNkLnRvRml4ZWQoNCkgOiAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnLCBib3JkZXI6ICcxcHggZGFzaGVkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzhweCAxMnB4JyB9fT5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzRweCcgfX0+e3QoJ3BsYW4uY29udGV4dFRpdGxlJyl9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LnByb2plY3REaWdlc3R9XG4gICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmJyYW5jaCAhPT0gbnVsbCA/IGAgXHUwMEI3ICR7dCgncGxhbi5icmFuY2gnKX0gJHtydW5EZXRhaWwuY29udGV4dC5icmFuY2h9YCA6ICcnfVxuICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5oZWFkU2hhICE9PSBudWxsID8gYCBcdTAwQjcgSEVBRCAke3J1bkRldGFpbC5jb250ZXh0LmhlYWRTaGEuc2xpY2UoMCwgOCl9YCA6ICcnfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmluamVjdGVkTWVtb3JpZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwIH19Pnt0KCdwbGFuLmluamVjdGVkTWVtb3JpZXMnKX1cdUZGMUE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuaW5qZWN0ZWRNZW1vcmllcy5tYXAoKG1lbW9yeSkgPT4gPHNwYW4ga2V5PXttZW1vcnkuaWR9IHN0eWxlPXtzdHlsZXMuYmFkZ2UoJ3JnYmEoNzgsMjAxLDE3NiwwLjIpJyl9PnttZW1vcnkudGl0bGV9PC9zcGFuPil9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5kZWNpc2lvbkxvZy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzRweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBjb2xvcjogJ2luaGVyaXQnIH19Pnt0KCdwbGFuLmRlY2lzaW9uTG9nJyl9XHVGRjFBPC9zcGFuPlxuICAgICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmRlY2lzaW9uTG9nLnNsaWNlKC02KS5tYXAoKGVudHJ5LCBlbnRyeUluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeUluZGV4fT5cdTAwQjcgW3tlbnRyeS5raW5kfV0ge2VudHJ5LmRldGFpbH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdzY2hlZC50aXRsZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnc2NoZWQuZm9ybU5hbWUnKX0gdmFsdWU9e3NjaGVkTmFtZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkTmFtZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17c2NoZWRUeXBlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWRUeXBlKGUudGFyZ2V0LnZhbHVlKSB9fT5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZXZpZXdcIj57dCgnc2NoZWQudHlwZVJldmlldycpfTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInN1bW1hcnlcIj57dCgnc2NoZWQudHlwZVN1bW1hcnknKX08L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJydW5cIj57dCgnc2NoZWQudHlwZVJ1bicpfTwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIHdpZHRoOiAxMjAgfX0gcGxhY2Vob2xkZXI9e3QoJ3NjaGVkLmZvcm1JbnRlcnZhbCcpfSB2YWx1ZT17c2NoZWRJbnRlcnZhbH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkSW50ZXJ2YWwoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAge3NjaGVkVHlwZSA9PT0gJ3J1bicgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdleGVjLmZvcm1UaXRsZScpfSB2YWx1ZT17c2NoZWRUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSByb3dzPXsyfSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtRGVzYycpfSB2YWx1ZT17c2NoZWREZXNjfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWREZXNjKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17c2NoZWROYW1lLnRyaW0oKSA9PT0gJyd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhZGRTY2hlZHVsZWQoKSB9fT57dCgnc2NoZWQuYWRkJyl9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Cb3R0b206ICc4cHgnIH19Pnt0KCdzY2hlZC5oaW50Jyl9PC9kaXY+XG4gICAgICAgIHsoc2NoZWR1bGVkRGF0YSA/PyBbXSkubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3NjaGVkLmVtcHR5Jyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBvdmVyZmxvd1g6ICdhdXRvJyB9fT5cbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57WydzY2hlZC5jb2wubmFtZScsICdzY2hlZC5jb2wudHlwZScsICdzY2hlZC5jb2wuaW50ZXJ2YWwnLCAnc2NoZWQuY29sLm5leHQnLCAnc2NoZWQuY29sLmxhc3RSZXN1bHQnLCAnc2NoZWQuY29sLmFjdGlvbnMnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgeyhzY2hlZHVsZWREYXRhID8/IFtdKS5tYXAoKHRhc2spID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXt0YXNrLmlkfSBzdHlsZT17eyBvcGFjaXR5OiB0YXNrLmVuYWJsZWQgPyAxIDogMC40NSB9fT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57dGFzay5uYW1lfXt0YXNrLnRpdGxlICE9PSAnJyA/IDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Plx1RkYwOHt0YXNrLnRpdGxlfVx1RkYwOTwvc3Bhbj4gOiBudWxsfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSh0YXNrLnR5cGUgPT09ICdyZXZpZXcnID8gJyM1NjljZDYnIDogdGFzay50eXBlID09PSAnc3VtbWFyeScgPyAnIzRlYzliMCcgOiAnI2Q3YmE3ZCcpfT57dGFzay50eXBlID09PSAncmV2aWV3JyA/IHQoJ3NjaGVkLnR5cGVSZXZpZXcnKSA6IHRhc2sudHlwZSA9PT0gJ3N1bW1hcnknID8gdCgnc2NoZWQudHlwZVN1bW1hcnknKSA6IHQoJ3NjaGVkLnR5cGVSdW4nKX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57dGFzay5pbnRlcnZhbE1pbnV0ZXMgPj0gMTQ0MCA/IE1hdGgucm91bmQodGFzay5pbnRlcnZhbE1pbnV0ZXMgLyAxNDQwICogMTApIC8gMTAgKyB0KCdzY2hlZC5kYXknKSA6IHRhc2suaW50ZXJ2YWxNaW51dGVzID49IDYwID8gTWF0aC5yb3VuZCh0YXNrLmludGVydmFsTWludXRlcyAvIDYwICogMTApIC8gMTAgKyB0KCdzY2hlZC5ob3VyJykgOiB0YXNrLmludGVydmFsTWludXRlcyArIHQoJ3NjaGVkLm1pbnV0ZScpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3Rhc2suZW5hYmxlZCA/IGZvcm1hdFRpbWUodGFzay5uZXh0RHVlQXQpIDogJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXhXaWR0aDogMjIwLCB3aGl0ZVNwYWNlOiAnbm9ybWFsJyB9fT57dGFzay5sYXN0UmVzdWx0IHx8ICh0YXNrLmxhc3RSdW5BdCAhPT0gbnVsbCA/IGZvcm1hdFRpbWUodGFzay5sYXN0UnVuQXQpIDogJ1x1MjAxNCcpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzY2hlZHVsZWRBY3Rpb24oJ3VwZGF0ZScsIHsgaWQ6IHRhc2suaWQsIGVuYWJsZWQ6ICF0YXNrLmVuYWJsZWQgfSkgfX0+e3Rhc2suZW5hYmxlZCA/IHQoJ3NjaGVkLmRpc2FibGUnKSA6IHQoJ3NjaGVkLmVuYWJsZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzY2hlZHVsZWRBY3Rpb24oJ3J1bicsIHsgaWQ6IHRhc2suaWQgfSkgfX0+e3QoJ3NjaGVkLnJ1bk5vdycpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyh7IHRpdGxlOiAnXHU1MjIwXHU5NjY0XHU4RkQ5XHU0RTJBXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExXHVGRjFGJywgbWVzc2FnZTogJ1x1MzAwQycgKyB0YXNrLm5hbWUgKyAnXHUzMDBEXHU1QzA2XHU4OEFCXHU2QzM4XHU0RTQ1XHU1MjIwXHU5NjY0XHUzMDAyJywgZGFuZ2VyOiB0cnVlLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBzY2hlZHVsZWRBY3Rpb24oJ2RlbGV0ZScsIHsgaWQ6IHRhc2suaWQgfSkgfSB9KSB9fT5cdTI3MTU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgIDwvPlxuICApXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNlx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcbiAgY29uc3Qgbm90ZXNUYWIgPSAoXG4gICAgPD5cbiAgICAgIHsvKiBcdTI1MDBcdTI1MDAgXHU3QjE0XHU4QkIwXHVGRjFBXHU1MzYxXHU3MjQ3XHU1RjBGXHU5NjA1XHU4QkZCICsgXHU1OTFBXHU4ODRDXHU3RjE2XHU4RjkxICsgXHU2NDFDXHU3RDIyICsgQUkgXHU2MDNCXHU3RUQzIFx1MjUwMFx1MjUwMCAqL31cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdub3Rlcy50aXRsZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgd2lkdGg6IDIyMCB9fVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ25vdGVzLnNlYXJjaCcpfVxuICAgICAgICAgICAgdmFsdWU9e25vdGVTZWFyY2h9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVNlYXJjaChlLnRhcmdldC52YWx1ZSkgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17YWlTdW1tYXJpemluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFpU3VtbWFyaXplKCkgfX0+XG4gICAgICAgICAgICB7YWlTdW1tYXJpemluZyA/IHQoJ25vdGVzLmFpU3VtbWFyeVJ1bicpIDogJ1x1MjcyOCAnICsgdCgnbm90ZXMuYWlTdW1tYXJ5Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5mb3JtUm93LCBib3JkZXI6ICcxcHggZGFzaGVkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJywgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzEwcHgnIH19PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMuZm9ybVRpdGxlJyl9IHZhbHVlPXtub3RlVGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXROb3RlVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCB9fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMudGFnc0hpbnQnKX0gdmFsdWU9e25vdGVUYWdzfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVRhZ3MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLnRleHRhcmVhfVxuICAgICAgICAgICAgcm93cz17Nn1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0KCdub3Rlcy5jb250ZW50SGludCcpfVxuICAgICAgICAgICAgdmFsdWU9e25vdGVDb250ZW50fVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVDb250ZW50KGUudGFyZ2V0LnZhbHVlKSB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgIHt0KCdub3Rlcy5ib3VuZFRvJyl9OiB7c2VsZWN0ZWRUYXJnZXRzWzBdID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IHNlbGVjdGVkVGFyZ2V0c1swXS5zbGljZSgwLCA4KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtub3RlVGl0bGUudHJpbSgpID09PSAnJyB8fCBub3RlQ29udGVudC50cmltKCkgPT09ICcnfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYWRkTm90ZSgpIH19Pnt0KCdub3Rlcy5hZGQnKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleXdvcmQgPSBub3RlU2VhcmNoLnRyaW0oKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgY29uc3QgbWF0Y2hlZCA9IGtleXdvcmQgPT09ICcnXG4gICAgICAgICAgICA/IG5vdGVzXG4gICAgICAgICAgICA6IG5vdGVzLmZpbHRlcigobm90ZSkgPT4gKG5vdGUudGl0bGUgKyAnICcgKyBub3RlLmNvbnRlbnQgKyAnICcgKyAobm90ZS50YWdzID8/IFtdKS5qb2luKCcgJykpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoa2V5d29yZCkpXG4gICAgICAgICAgLy8gXHU3RjZFXHU5ODc2XHU0RjE4XHU1MTQ4XHVGRjBDXHU1MTc2XHU0RjU5XHU2MzA5XHU1MjFCXHU1RUZBXHU2NUY2XHU5NUY0XHU1MDEyXHU1RThGXHUzMDAyXG4gICAgICAgICAgY29uc3QgdmlzaWJsZSA9IFsuLi5tYXRjaGVkXS5zb3J0KChsZWZ0LCByaWdodCkgPT5cbiAgICAgICAgICAgIE51bWJlcihyaWdodC5waW5uZWQgPT09IHRydWUpIC0gTnVtYmVyKGxlZnQucGlubmVkID09PSB0cnVlKSB8fCByaWdodC5jcmVhdGVkQXQgLSBsZWZ0LmNyZWF0ZWRBdClcbiAgICAgICAgICBpZiAodmlzaWJsZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pntub3Rlcy5sZW5ndGggPT09IDAgPyB0KCdub3Rlcy5lbXB0eScpIDogdCgnbm90ZXMuZW1wdHlTZWFyY2gnKX08L2Rpdj5cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHZpc2libGUubWFwKChub3RlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1N1bW1hcnkgPSBub3RlLnNoYSA9PT0gJ3N1bW1hcnknXG4gICAgICAgICAgICBjb25zdCBlZGl0aW5nID0gZWRpdGluZ05vdGUgIT09IG51bGwgJiYgZWRpdGluZ05vdGUuaWQgPT09IG5vdGUuaWQgPyBlZGl0aW5nTm90ZSA6IG51bGxcbiAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkID0gbm90ZUV4cGFuZGVkW25vdGUuaWRdID09PSB0cnVlXG4gICAgICAgICAgICBjb25zdCBsb25nID0gbm90ZS5jb250ZW50Lmxlbmd0aCA+IDI2MCB8fCBub3RlLmNvbnRlbnQuc3BsaXQoJ1xcbicpLmxlbmd0aCA+IDZcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e25vdGUuaWR9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcy5ub3RlQ2FyZCxcbiAgICAgICAgICAgICAgICAgIC4uLihpc1N1bW1hcnkgPyB7IGJhY2tncm91bmQ6ICdyZ2JhKDM3LDk5LDIzNSwwLjA0KScsIGJvcmRlckNvbG9yOiAncmdiYSgzNyw5OSwyMzUsMC4zKScgfSA6IHt9KSxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2VkaXRpbmcgIT09IG51bGwgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSB2YWx1ZT17ZWRpdGluZy50aXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgLi4uZWRpdGluZywgdGl0bGU6IGUudGFyZ2V0LnZhbHVlIH0pIH19IC8+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnbm90ZXMudGFnc0hpbnQnKX0gdmFsdWU9e2VkaXRpbmcudGFnc30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgLi4uZWRpdGluZywgdGFnczogZS50YXJnZXQudmFsdWUgfSkgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezEwfSB2YWx1ZT17ZWRpdGluZy5jb250ZW50fSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RWRpdGluZ05vdGUoeyAuLi5lZGl0aW5nLCBjb250ZW50OiBlLnRhcmdldC52YWx1ZSB9KSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICc0cHggMTJweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNhdmVOb3RlRWRpdCgpIH19Pnt0KCdub3Rlcy5zYXZlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnNHB4IDEycHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0RWRpdGluZ05vdGUobnVsbCkgfX0+e3QoJ25vdGVzLmNhbmNlbCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e2lzU3VtbWFyeSA/ICdcdUQ4M0RcdURDRDYgJyA6ICcnfXtub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/ICdcdUQ4M0RcdURDQ0MgJyA6ICcnfXtub3RlLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiBub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIDogdW5kZWZpbmVkIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtub3RlLnBpbm5lZCA9PT0gdHJ1ZSA/IHQoJ25vdGVzLnVucGluJykgOiB0KCdub3Rlcy5waW4nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHRvZ2dsZU5vdGVQaW4obm90ZSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cdUQ4M0RcdURDQ0M8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IHRpdGxlPXt0KCdub3Rlcy50b01lbW9yeUhpbnQnKX0gb25DbGljaz17KCkgPT4geyBzZXRNZW1vcnlUaXRsZShub3RlLnRpdGxlKTsgc2V0TWVtb3J5Q29udGVudChub3RlLmNvbnRlbnQpOyBzZXRBY3Rpb25SZXN1bHQodCgnbm90ZXMudG9NZW1vcnlEb25lJykpIH19Plx1RDgzRVx1RERFMCB7dCgnbm90ZXMudG9NZW1vcnknKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0RWRpdGluZ05vdGUoeyBpZDogbm90ZS5pZCwgdGl0bGU6IG5vdGUudGl0bGUsIGNvbnRlbnQ6IG5vdGUuY29udGVudCwgdGFnczogKG5vdGUudGFncyA/PyBbXSkuam9pbignLCAnKSB9KSB9fT57dCgnbm90ZXMuZWRpdCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6ICdcdTUyMjBcdTk2NjRcdThGRDlcdTY3NjFcdTdCMTRcdThCQjBcdUZGMUYnLCBtZXNzYWdlOiAnXHUzMDBDJyArIG5vdGUudGl0bGUgKyAnXHUzMDBEXHU1QzA2XHU4OEFCXHU2QzM4XHU0RTQ1XHU1MjIwXHU5NjY0XHVGRjBDXHU0RTBEXHU1M0VGXHU2MDYyXHU1OTBEXHUzMDAyJywgZGFuZ2VyOiB0cnVlLCBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCByZW1vdmVOb3RlKG5vdGUuaWQpIH0gfSkgfX0+XHUyNzE1PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7aXNTdW1tYXJ5XG4gICAgICAgICAgICAgICAgICAgICAgPyA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ29udGVudCwgLi4uKGxvbmcgJiYgIWV4cGFuZGVkID8gc3R5bGVzLm5vdGVDbGFtcCA6IHt9KSB9fT57cmVuZGVyU3RydWN0dXJlZENvbnRlbnQobm90ZS5jb250ZW50KX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA6IDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCAuLi4obG9uZyAmJiAhZXhwYW5kZWQgPyBzdHlsZXMubm90ZUNsYW1wIDoge30pIH19Pntub3RlLmNvbnRlbnR9PC9kaXY+fVxuICAgICAgICAgICAgICAgICAgICB7bG9uZyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmxpbmtCdG59IG9uQ2xpY2s9eygpID0+IHsgc2V0Tm90ZUV4cGFuZGVkKHsgLi4ubm90ZUV4cGFuZGVkLCBbbm90ZS5pZF06ICFleHBhbmRlZCB9KSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtleHBhbmRlZCA/IHQoJ25vdGVzLmNvbGxhcHNlJykgOiB0KCdub3Rlcy5leHBhbmQnKX1cdUZGMDh7bm90ZS5jb250ZW50Lmxlbmd0aH0gXHU1QjU3XHVGRjA5XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHsobm90ZS50YWdzID8/IFtdKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luVG9wOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsobm90ZS50YWdzID8/IFtdKS5tYXAoKHRhZykgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt0YWd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKCcjMjU2M2ViJyksIGN1cnNvcjogJ3BvaW50ZXInLCBib3JkZXI6ICdub25lJywgcGFkZGluZzogJzFweCA4cHgnLCBib3JkZXJSYWRpdXM6ICc5OTlweCcsIGZvbnRTaXplOiAnMTBweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldE5vdGVTZWFyY2godGFnKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+I3t0YWd9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVNZXRhfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bmV3IERhdGUobm90ZS5jcmVhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHtub3RlLnVwZGF0ZWRBdCAhPT0gdW5kZWZpbmVkICYmIG5vdGUudXBkYXRlZEF0ID4gbm90ZS5jcmVhdGVkQXQgKyAxMDAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlx1RkYwOHt0KCdub3Rlcy5lZGl0ZWRBdCcpfSB7bmV3IERhdGUobm90ZS51cGRhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCl9XHVGRjA5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAge2lzU3VtbWFyeSAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9Pnt0KCdub3Rlcy5zdW1tYXJ5VGFnJyl9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICB7bm90ZS5zaGEgIT09IHVuZGVmaW5lZCAmJiBub3RlLnNoYSAhPT0gJ3N1bW1hcnknICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e25vdGUuc2hhID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IG5vdGUuc2hhLnNsaWNlKDAsIDgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pKCl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnbWVtb3J5LnpvbmVUaXRsZScpICsgKHByb2plY3QgIT09IG51bGwgPyAnIFx1MDBCNyAnICsgcHJvamVjdC5uYW1lIDogJycpfT5cbiAgICAgICAgey8qIFx1NTQwQ1x1NkI2NVx1NzJCNlx1NjAwMVx1Njc2MVx1RkYxQVx1NTdGQVx1N0VCRiArIFx1ODQzRFx1NTQwRVx1NjNEMFx1NEVBNFx1NjU3MCArIFx1NTQwQ1x1NkI2NVx1NjMwOVx1OTRBRSArIFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QSAqL31cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICc4cHgnLCBwYWRkaW5nOiAnNnB4IDEwcHgnLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEpKScsIGJvcmRlclJhZGl1czogJzhweCcgfX0+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JyB9fT5cdUQ4M0RcdUREMDQge3QoJ21lbW9yeS5zeW5jQmFzZWxpbmUnKX1cdUZGMUE8Yj57bWVtb3JpZXNEYXRhPy5iYXNlbGluZT8uc2hhICE9IG51bGwgPyBtZW1vcmllc0RhdGEuYmFzZWxpbmUuc2hhLnNsaWNlKDAsIDgpIDogdCgnbWVtb3J5LnN5bmNOb25lJyl9PC9iPjwvc3Bhbj5cbiAgICAgICAgICB7bWVtb3JpZXNEYXRhPy5icmFuY2ggIT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNTY5Y2Q2Jyl9PnttZW1vcmllc0RhdGEuYnJhbmNofTwvc3Bhbj59XG4gICAgICAgICAgeyhtZW1vcmllc0RhdGE/LmJlaGluZENvdW50ID8/IDApID4gMCAmJiAoXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJyNkOTc3MDYnIH19Pnt0KCdtZW1vcnkuYmVoaW5kJykucmVwbGFjZSgne259JywgU3RyaW5nKG1lbW9yaWVzRGF0YT8uYmVoaW5kQ291bnQgPz8gMCkpfTwvc3Bhbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICczcHggMTBweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gZGlzYWJsZWQ9e21lbW9yeVN5bmNpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzeW5jTWVtb3JpZXMoKSB9fT5cbiAgICAgICAgICAgIHttZW1vcnlTeW5jaW5nID8gdCgnbWVtb3J5LnN5bmNpbmcnKSA6ICdcdUQ4M0RcdUREMDQgJyArIHQoJ21lbW9yeS5zeW5jJyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7c3luY1JlcG9ydCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JywgcGFkZGluZzogJzhweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYmFja2dyb3VuZDogc3luY1JlcG9ydC5vayA9PT0gZmFsc2UgPyAncmdiYSgyMDksMzYsNDcsMC4wNiknIDogJ3JnYmEoNzgsMjAxLDE3NiwwLjA2KScsIGJvcmRlcjogJzFweCBzb2xpZCAnICsgKHN5bmNSZXBvcnQub2sgPT09IGZhbHNlID8gJ3JnYmEoMjA5LDM2LDQ3LDAuMyknIDogJ3JnYmEoNzgsMjAxLDE3NiwwLjMpJykgfX0+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fT57c3luY1JlcG9ydC5vayA9PT0gZmFsc2UgPyAnXHUyNzE3ICcgKyB0KCdtZW1vcnkuc3luY0ZhaWxlZCcpIDogJ1x1MjcxMyAnICsgKHN5bmNSZXBvcnQudmVyZGljdCA/PyAnJyl9PC9kaXY+XG4gICAgICAgICAgICB7c3luY1JlcG9ydC5vayAhPT0gZmFsc2UgJiYgKHN5bmNSZXBvcnQuc3RhbGVQcm9wb3NhbHMgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+e3QoJ21lbW9yeS5zdGFsZVRpdGxlJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgeyhzeW5jUmVwb3J0LnN0YWxlUHJvcG9zYWxzID8/IFtdKS5tYXAoKHByb3Bvc2FsKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17cHJvcG9zYWwuaWR9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpblRvcDogJzRweCcsIGZvbnRTaXplOiAnMTFweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0+e3Byb3Bvc2FsLnRpdGxlfSBcdTIwMTRcdTIwMTQge3Byb3Bvc2FsLnJlYXNvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzFweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhcHBseVN5bmMoW3Byb3Bvc2FsLmlkXSwgJ21hcmstc3RhbGUnKSB9fT57dCgnbWVtb3J5Lm1hcmtTdGFsZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcxcHggOHB4JywgZm9udFNpemU6ICcxMHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYXBwbHlTeW5jKFtwcm9wb3NhbC5pZF0sICdhcmNoaXZlJykgfX0+e3QoJ21lbW9yeS5hcmNoaXZlQnRuJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzFweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0U3luY1JlcG9ydCgocHJldmlvdXMpID0+IHByZXZpb3VzID09PSBudWxsID8gbnVsbCA6IHsgLi4ucHJldmlvdXMsIHN0YWxlUHJvcG9zYWxzOiAocHJldmlvdXMuc3RhbGVQcm9wb3NhbHMgPz8gW10pLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCAhPT0gcHJvcG9zYWwuaWQpIH0pIH19Pnt0KCdtZW1vcnkua2VlcEFjdGl2ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtzeW5jUmVwb3J0Lm9rICE9PSBmYWxzZSAmJiAoc3luY1JlcG9ydC5uZXdDYW5kaWRhdGVzID8/IFtdKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc2cHgnLCBmb250U2l6ZTogJzExcHgnIH19PlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCB9fT57dCgnbWVtb3J5Lm5ld0NhbmRpZGF0ZXMnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgeyhzeW5jUmVwb3J0Lm5ld0NhbmRpZGF0ZXMgPz8gW10pLm1hcCgoY2FuZGlkYXRlLCBpbmRleCkgPT4gPGRpdiBrZXk9e2luZGV4fT5cdUZGMEIgW3tjYW5kaWRhdGUudHlwZX1dIHtjYW5kaWRhdGUudGl0bGV9PC9kaXY+KX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMubGlua0J0biwgbWFyZ2luVG9wOiAnNHB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFN5bmNSZXBvcnQobnVsbCkgfX0+e3QoJ21lbW9yeS5jbG9zZVJlcG9ydCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICB7LyogXHU2MjRCXHU1MkE4XHU2REZCXHU1MkEwXHVGRjFBXHU2ODA3XHU5ODk4IC8gXHU3QzdCXHU1NzhCIC8gXHU0RjVDXHU3NTI4XHU1N0RGIC8gXHU1MTg1XHU1QkI5ICovfVxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLm1lbW9yeVRpdGxlJyl9IHZhbHVlPXttZW1vcnlUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeVRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCB3aWR0aDogJ2F1dG8nIH19IHZhbHVlPXttZW1vcnlUeXBlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0TWVtb3J5VHlwZShlLnRhcmdldC52YWx1ZSkgfX0+XG4gICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoTUVNT1JZX1RZUEVfTEFCRUxTKS5tYXAoKFt2YWx1ZSwgbGFiZWxdKSA9PiA8b3B0aW9uIGtleT17dmFsdWV9IHZhbHVlPXt2YWx1ZX0+e2xhYmVsfTwvb3B0aW9uPil9XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIHdpZHRoOiAnYXV0bycgfX0gdmFsdWU9e21lbW9yeVNjb3BlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0TWVtb3J5U2NvcGUoZS50YXJnZXQudmFsdWUgYXMgJ3Byb2plY3QnIHwgJ2JyYW5jaCcpIH19PlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInByb2plY3RcIj57dCgnbWVtb3J5LnNjb3BlUHJvamVjdCcpfTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJyYW5jaFwiPnt0KCdtZW1vcnkuc2NvcGVCcmFuY2gnKX08L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcm93cz17M30gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0ubWVtb3J5Q29udGVudCcpfSB2YWx1ZT17bWVtb3J5Q29udGVudH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeUNvbnRlbnQoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtidXN5ICE9PSBudWxsIHx8IG1lbW9yeVRpdGxlLnRyaW0oKSA9PT0gJycgfHwgbWVtb3J5Q29udGVudC50cmltKCkgPT09ICcnfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdyZWNvcmRNZW1vcnknLCAnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5JywgeyBtZW1vcnlUeXBlLCBzY29wZTogbWVtb3J5U2NvcGUsIHRpdGxlOiBtZW1vcnlUaXRsZS50cmltKCksIGNvbnRlbnQ6IG1lbW9yeUNvbnRlbnQudHJpbSgpIH0pLnRoZW4oYXN5bmMgKCkgPT4geyBzZXRNZW1vcnlUaXRsZSgnJyk7IHNldE1lbW9yeUNvbnRlbnQoJycpOyBhd2FpdCBsb2FkTWVtb3JpZXMoKSB9KSB9fT5cbiAgICAgICAgICAgICAge2J1c3kgPT09ICdyZWNvcmRNZW1vcnknID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ21lbW9yeS5yZWNvcmQnKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYWxsID0gbWVtb3JpZXNEYXRhPy5tZW1vcmllcyA/PyBbXVxuICAgICAgICAgIGNvbnN0IHBlbmRpbmcgPSBhbGwuZmlsdGVyKChtZW1vcnkpID0+ICFtZW1vcnkuaXNIdW1hbkNvbmZpcm1lZCAmJiBtZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJylcbiAgICAgICAgICBjb25zdCBhY3RpdmUgPSBhbGwuZmlsdGVyKChtZW1vcnkpID0+IG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnKVxuICAgICAgICAgIGNvbnN0IGdyb3VwZWQgPSBuZXcgTWFwPHN0cmluZywgTWVtb3J5RW50cnlbXT4oKVxuICAgICAgICAgIGZvciAoY29uc3QgbWVtb3J5IG9mIGFjdGl2ZSkge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IGdyb3VwZWQuZ2V0KG1lbW9yeS50eXBlKSA/PyBbXVxuICAgICAgICAgICAgbGlzdC5wdXNoKG1lbW9yeSlcbiAgICAgICAgICAgIGdyb3VwZWQuc2V0KG1lbW9yeS50eXBlLCBsaXN0KVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAge3BlbmRpbmcubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Plx1MjNGMyB7dCgnbWVtb3J5LnBlbmRpbmdRdWV1ZScpfVx1RkYwOHtTdHJpbmcocGVuZGluZy5sZW5ndGgpfVx1RkYwOTwvZGl2PlxuICAgICAgICAgICAgICAgICAge3BlbmRpbmcubWFwKChtZW1vcnkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e21lbW9yeS5pZH0gc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDYXJkLCBib3JkZXJDb2xvcjogJ3JnYmEoMzcsOTksMjM1LDAuMyknLCBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wMyknIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVRleHR9PnttZW1vcnkudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JywgZmxleFNocmluazogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGNvbmZpcm1NZW1vcnkobWVtb3J5LmlkKS50aGVuKCgpID0+IHsgdm9pZCBsb2FkTWVtb3JpZXMoKSB9KSB9fT57dCgnbWVtb3J5LmNvbmZpcm0nKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeUFjdGlvbignc3RhdHVzJywgeyBpZDogbWVtb3J5LmlkLCBzdGF0dXM6ICdhcmNoaXZlZCcgfSkgfX0+e3QoJ21lbW9yeS5hcmNoaXZlQnRuJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZUNvbnRlbnR9PnttZW1vcnkuY29udGVudH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSgzNyw5OSwyMzUsMC4xNSknKX0+e01FTU9SWV9TT1VSQ0VfTEFCRUxTW21lbW9yeS5zb3VyY2VUYWddID8/IG1lbW9yeS5zb3VyY2VUYWd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5iYXNpc1NoYSAhPT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9PnttZW1vcnkuYmFzaXNTaGEuc2xpY2UoMCwgOCl9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge1suLi5ncm91cGVkLmVudHJpZXMoKV0ubWFwKChbdHlwZSwgaXRlbXNdKSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e3R5cGV9IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnNlY3Rpb25UaXRsZX0+e01FTU9SWV9UWVBFX0xBQkVMU1t0eXBlXSA/PyB0eXBlfVx1RkYwOHtTdHJpbmcoaXRlbXMubGVuZ3RoKX1cdUZGMDk8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHtpdGVtcy5tYXAoKG1lbW9yeSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17bWVtb3J5LmlkfSBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNhcmQsIG9wYWNpdHk6IG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnID8gMSA6IDAuNiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVUZXh0fT57bWVtb3J5LmlzSHVtYW5Db25maXJtZWQgPyAnXHUyNzA1ICcgOiAnJ317bWVtb3J5LnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAsIGZsZXhXcmFwOiAnd3JhcCcsIGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IW1lbW9yeS5pc0h1bWFuQ29uZmlybWVkICYmIG1lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgY29uZmlybU1lbW9yeShtZW1vcnkuaWQpLnRoZW4oKCkgPT4geyB2b2lkIGxvYWRNZW1vcmllcygpIH0pIH19Pnt0KCdtZW1vcnkuY29uZmlybScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeVRvTm90ZShtZW1vcnkpIH19Plx1RDgzRFx1RENDNCB7dCgnbWVtb3J5LnRvTm90ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnNjb3BlID09PSAnYnJhbmNoJyAmJiA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5QWN0aW9uKCdub3JtYWxpemUnLCB7IGlkOiBtZW1vcnkuaWQgfSkgfX0+XHUyMUYxIHt0KCdtZW1vcnkubm9ybWFsaXplJyl9PC9idXR0b24+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ3N0YXR1cycsIHsgaWQ6IG1lbW9yeS5pZCwgc3RhdHVzOiAnYXJjaGl2ZWQnIH0pIH19Pnt0KCdtZW1vcnkuYXJjaGl2ZUJ0bicpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeUFjdGlvbignc3RhdHVzJywgeyBpZDogbWVtb3J5LmlkLCBzdGF0dXM6ICdhY3RpdmUnIH0pIH19Pnt0KCdtZW1vcnkucmVzdG9yZScpfTwvYnV0dG9uPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCBtYXhIZWlnaHQ6IDg0LCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+e21lbW9yeS5jb250ZW50fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlTWV0YX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bWVtb3J5LnN0YXR1cyA9PT0gJ3N0YWxlJyAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjZDk3NzA2Jyl9Pnt0KCdtZW1vcnkuc3RhdHVzU3RhbGUnKX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5zY29wZSA9PT0gJ2JyYW5jaCcgJiYgbWVtb3J5LmdpdEJyYW5jaCAhPT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNTY5Y2Q2Jyl9Plx1MjM4NyB7bWVtb3J5LmdpdEJyYW5jaH08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgncmdiYSgzNyw5OSwyMzUsMC4xNSknKX0+e01FTU9SWV9TT1VSQ0VfTEFCRUxTW21lbW9yeS5zb3VyY2VUYWddID8/IG1lbW9yeS5zb3VyY2VUYWd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5iYXNpc1NoYSAhPT0gbnVsbCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9PnttZW1vcnkuYmFzaXNTaGEuc2xpY2UoMCwgOCl9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntuZXcgRGF0ZShtZW1vcnkudXBkYXRlZEF0KS50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIHthbGwubGVuZ3RoID09PSAwICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ21lbW9yeS5lbXB0eScpfTwvZGl2Pn1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgIClcbiAgICAgICAgfSkoKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdjb25jZXB0cy50aXRsZScpfT5cbiAgICAgICAge2NvbmNlcHRzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdjb25jZXB0cy5ub25lJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+e1snY29uY2VwdHMuY29sLm5hbWUnLCAnY29uY2VwdHMuY29sLmNhdGVnb3J5JywgJ2NvbmNlcHRzLmNvbC5jb3VudCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7Y29uY2VwdHMubWFwKChjb25jZXB0KSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17Y29uY2VwdC5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2NvbmNlcHQubmFtZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntjb25jZXB0LmNhdGVnb3J5fTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e1N0cmluZyhjb25jZXB0Lm9jY3VycmVuY2VzKX08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgIDwvPlxuICApXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFJldmlldyBcdTk1RUVcdTk4OThcdTk4NzVcdTdCN0VcdUZGMUFcdTUxNjhcdTkxQ0ZcdTk1RUVcdTk4OThcdTc3MEJcdTY3N0ZcdUZGMDhcdTdFREZcdThCQTEgKyBcdTdCNUJcdTkwMDkgKyBcdTcyQjZcdTYwMDFcdTZENDFcdThGNkNcdUZGMDkrIFx1OUE4Q1x1NjUzNlx1OEJCMFx1NUY1NSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgcmV2aWV3VGFiID0gKFxuICAgIDw+XG4gICAgICB7cmVzdWx0UGFuZWx9XG4gICAgICA8Q2FyZCB0aXRsZT17dCgncmV2aWV3LnJlY29yZHNUaXRsZScpfT5cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYWxsID0gKGlzc3Vlc0RhdGEgPz8gW10pLm1hcCgoaXNzdWUpID0+ICh7IC4uLmlzc3VlLCBzZXZlcml0eTogbm9ybWFsaXplSXNzdWVTZXZlcml0eShpc3N1ZS5zZXZlcml0eSkgfSkpXG4gICAgICAgICAgY29uc3Qgb3BlbkNvdW50ID0gYWxsLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpLmxlbmd0aFxuICAgICAgICAgIGNvbnN0IGNvdW50czogQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgY291bnQ6IG51bWJlciB9PiA9IFtcbiAgICAgICAgICAgIHsga2V5OiAnJywgbGFiZWw6IHQoJ3Jldmlldy5maWx0ZXJBbGwnKSwgY291bnQ6IGFsbC5sZW5ndGggfSxcbiAgICAgICAgICAgIHsga2V5OiAnY3JpdGljYWwnLCBsYWJlbDogJ2NyaXRpY2FsJywgY291bnQ6IGFsbC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBpc3N1ZS5zZXZlcml0eSA9PT0gJ2Jsb2NrZXInKS5sZW5ndGggfSxcbiAgICAgICAgICAgIHsga2V5OiAnbWFqb3InLCBsYWJlbDogJ21ham9yJywgY291bnQ6IGFsbC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zZXZlcml0eSA9PT0gJ21ham9yJykubGVuZ3RoIH0sXG4gICAgICAgICAgICB7IGtleTogJ21pbm9yJywgbGFiZWw6ICdtaW5vcicsIGNvdW50OiBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdtaW5vcicpLmxlbmd0aCB9LFxuICAgICAgICAgICAgeyBrZXk6ICdpbmZvJywgbGFiZWw6ICdpbmZvJywgY291bnQ6IGFsbC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2luZm8nKS5sZW5ndGggfSxcbiAgICAgICAgICBdXG4gICAgICAgICAgY29uc3QgdmlzaWJsZSA9IGFsbFxuICAgICAgICAgICAgLmZpbHRlcigoaXNzdWUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGlzc3VlU2V2ZXJpdHlGaWx0ZXIgPT09ICcnKSByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICBpZiAoaXNzdWVTZXZlcml0eUZpbHRlciA9PT0gJ2NyaXRpY2FsJykgcmV0dXJuIGlzc3VlLnNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IGlzc3VlLnNldmVyaXR5ID09PSAnYmxvY2tlcidcbiAgICAgICAgICAgICAgcmV0dXJuIGlzc3VlLnNldmVyaXR5ID09PSBpc3N1ZVNldmVyaXR5RmlsdGVyXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlU3RhdHVzRmlsdGVyID09PSAnJyB8fCBpc3N1ZS5zdGF0dXMgPT09IGlzc3VlU3RhdHVzRmlsdGVyKVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgIHtjb3VudHMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGtleT17aXRlbS5rZXkgPT09ICcnID8gJ2FsbCcgOiBpdGVtLmtleX0gc3R5bGU9e3N0eWxlcy5jaGlwKGlzc3VlU2V2ZXJpdHlGaWx0ZXIgPT09IGl0ZW0ua2V5KX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRJc3N1ZVNldmVyaXR5RmlsdGVyKGl0ZW0ua2V5KSB9fT5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0ubGFiZWx9IFx1MDBCNyB7aXRlbS5jb3VudH1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cbiAgICAgICAgICAgICAgICAgIHtvcGVuQ291bnR9IFx1NUY4NVx1NTkwNFx1NzQwNiAvIFx1NTE3MSB7YWxsLmxlbmd0aH1cbiAgICAgICAgICAgICAgICAgIHsoc3RhdGU/LnJlc29sdmVkSXNzdWVSZXRlbnRpb25EYXlzID8/IDApID4gMCA/IGAgXHUwMEI3ICR7dCgncmV2aWV3LnJldGVudGlvbkhpbnQnKS5yZXBsYWNlKCd7ZGF5c30nLCBTdHJpbmcoc3RhdGU/LnJlc29sdmVkSXNzdWVSZXRlbnRpb25EYXlzID8/IDcpKX1gIDogJyd9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDhweCcgfX0gdmFsdWU9e2lzc3VlU3RhdHVzRmlsdGVyfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0SXNzdWVTdGF0dXNGaWx0ZXIoZS50YXJnZXQudmFsdWUpIH19PlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt0KCdyZXZpZXcuc3RhdHVzQWxsJyl9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoSVNTVUVfU1RBVFVTX0xBQkVMUykubWFwKChbdmFsdWUsIGxhYmVsXSkgPT4gPG9wdGlvbiBrZXk9e3ZhbHVlfSB2YWx1ZT17dmFsdWV9PntsYWJlbH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkSXNzdWVzKCkgfX0+e3QoJ3Jldmlldy5yZWZyZXNoJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7YWxsLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pntpc3N1ZXNEYXRhID09PSBudWxsID8gJ1x1MjAyNicgOiB0KCdyZXZpZXcucmVjb3Jkc0VtcHR5Jyl9PC9kaXY+XG4gICAgICAgICAgICAgICkgOiB2aXNpYmxlLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdub3Rlcy5lbXB0eVNlYXJjaCcpfTwvZGl2PlxuICAgICAgICAgICAgICApIDogdmlzaWJsZS5tYXAoKGlzc3VlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXhwYW5kZWQgPSBpc3N1ZUV4cGFuZGVkW2lzc3VlLmlkXSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gaXNzdWUuZGVzY3JpcHRpb24gPz8gJydcbiAgICAgICAgICAgICAgICBjb25zdCBsb25nID0gZGVzY3JpcHRpb24ubGVuZ3RoID4gMjAwXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpc3N1ZS5pZH0gc3R5bGU9e3N0eWxlcy5ub3RlQ2FyZH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2Uoc2V2ZXJpdHlDb2xvcihpc3N1ZS5zZXZlcml0eSkpfT57aXNzdWUuc2V2ZXJpdHl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge2lzc3VlLmNhdGVnb3J5ID8gPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzU3NjA2YScpfT57aXNzdWUuY2F0ZWdvcnl9PC9zcGFuPiA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycgPyAnI2RjZGNhYScgOiBpc3N1ZS5zdGF0dXMgPT09ICdyZXNvbHZlZCcgfHwgaXNzdWUuc3RhdHVzID09PSAnYWNjZXB0ZWQnID8gJyM0ZWM5YjAnIDogJyM4YjhiOGInKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtJU1NVRV9TVEFUVVNfTEFCRUxTW2lzc3VlLnN0YXR1c10gPz8gaXNzdWUuc3RhdHVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVUZXh0fT57aXNzdWUudGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dmVyaWZ5aW5nVGFyZ2V0ICE9PSBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcudmVyaWZ5SGludCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCB2ZXJpZnlJc3N1ZXMoaXNzdWUuY2hhbmdlSWQpIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID57dmVyaWZ5aW5nVGFyZ2V0ID09PSBpc3N1ZS5jaGFuZ2VJZCA/IHQoJ3Jldmlldy52ZXJpZnlSdW5uaW5nJykgOiAnXHVEODNEXHVERDBEICcgKyB0KCdyZXZpZXcudmVyaWZ5Jyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2Rlc2NyaXB0aW9uICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNvbnRlbnQsIC4uLihsb25nICYmICFleHBhbmRlZCA/IHN0eWxlcy5ub3RlQ2xhbXAgOiB7fSkgfX0+e2Rlc2NyaXB0aW9ufTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICB7aXNzdWUucmVzb2x1dGlvbiA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcsIHBhZGRpbmc6ICc2cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGJhY2tncm91bmQ6ICdyZ2JhKDc4LCAyMDEsIDE3NiwgMC4wOCknLCBib3JkZXI6ICcxcHggc29saWQgcmdiYSg3OCwgMjAxLCAxNzYsIDAuMzUpJywgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgXHUyNzEzIHtpc3N1ZS5yZXNvbHV0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5maXhTdGF0cyAhPSBudWxsIHx8IEJvb2xlYW4oaXNzdWUuZml4RGlmZikpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMubGlua0J0biwgbWFyZ2luVG9wOiAnNHB4JywgZGlzcGxheTogJ2Jsb2NrJyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldEZpeEV4cGFuZGVkKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFtpc3N1ZS5pZF06ICEocHJldmlvdXNbaXNzdWUuaWRdID09PSB0cnVlKSB9KSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXHVEODNEXHVERDI3IHt0KCdyZXZpZXcuZml4RGV0YWlsJyl9XHVGRjA4e1N0cmluZyhpc3N1ZS5maXhTdGF0cz8uZmlsZXMgPz8gMCl9IHt0KCdyZXZpZXcuZml4U3RhdEZpbGVzJyl9IFx1MDBCNyAre1N0cmluZyhpc3N1ZS5maXhTdGF0cz8uaW5zZXJ0aW9ucyA/PyAwKX0gXHUyMjEye1N0cmluZyhpc3N1ZS5maXhTdGF0cz8uZGVsZXRpb25zID8/IDApfVx1RkYwOXtmaXhFeHBhbmRlZFtpc3N1ZS5pZF0gPT09IHRydWUgPyAnXHUyNUIyJyA6ICdcdTI1QkMnfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Zml4RXhwYW5kZWRbaXNzdWUuaWRdID09PSB0cnVlICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc2cHgnLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEpKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5maXhGaWxlcyA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICczcHgnIH19Pnt0KCdyZXZpZXcuZml4RmlsZXMnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5maXhGaWxlcyA/PyBbXSkubWFwKChmaWxlKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2ZpbGV9IHN0eWxlPXt7IGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknLCBmb250U2l6ZTogJzExcHgnIH19PntmaWxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5maXhJbXBhY3QgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnM3B4JyB9fT57dCgncmV2aWV3LmZpeEltcGFjdCcpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNzdWUuZml4SW1wYWN0Lm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZW50cnkuc3ltYm9sfSBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc1cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzA5NjlkYScpfT57ZW50cnkuc3ltYm9sfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeycgJ317dCgncmV2aWV3LmRlZmluZWRJbicpfSB7ZW50cnkuZGVmaW5lZElufSBcdTAwQjcge1N0cmluZyhlbnRyeS5jYWxsZXJzLmxlbmd0aCl9IHt0KCdyZXZpZXcuY2FsbENvdW50Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNhbGxlcnMuc2xpY2UoMCwgNSkubWFwKChjYWxsZXIsIGNhbGxlckluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtjYWxsZXJJbmRleH0gc3R5bGU9e3sgZm9udFNpemU6ICcxMHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIHBhZGRpbmdMZWZ0OiAnMTJweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NhbGxlci5maWxlfTp7Y2FsbGVyLmxpbmV9IHtjYWxsZXIuc25pcHBldC5zbGljZSgwLCA4MCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Qm9vbGVhbihpc3N1ZS5maXhEaWZmKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnM3B4JyB9fT57dCgncmV2aWV3LmZpeERpZmYnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWluc2V0LCByZ2JhKDUsNSw1LDAuMDMpKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc2cHggOHB4JywgbWF4SGVpZ2h0OiAnMzAwcHgnLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVuZGVyRGlmZkxpbmVzKGlzc3VlLmZpeERpZmYpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge2xvbmcgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5saW5rQnRufSBvbkNsaWNrPXsoKSA9PiB7IHNldElzc3VlRXhwYW5kZWQoeyAuLi5pc3N1ZUV4cGFuZGVkLCBbaXNzdWUuaWRdOiAhZXhwYW5kZWQgfSkgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZXhwYW5kZWQgPyB0KCdub3Rlcy5jb2xsYXBzZScpIDogdCgnbm90ZXMuZXhwYW5kJyl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlTWV0YX0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3QoJ3Jldmlldy50YXJnZXQnKX06IHtpc3N1ZVRhcmdldExhYmVsKGlzc3VlLmNoYW5nZUlkKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2Zvcm1hdFRpbWUoaXNzdWUuY3JlYXRlZEF0KX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgIClcbiAgICAgICAgfSkoKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCd2ZXJpZnkucmVjb3JkcycpfT5cbiAgICAgICAge3ZlcmlmaWNhdGlvbnMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3ZlcmlmeS5yZWNvcmRzRW1wdHknKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHt2ZXJpZmljYXRpb25zLnNsaWNlKDAsIDIwKS5tYXAoKHJlY29yZCkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3JlY29yZC5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShyZWNvcmQuc3RhdHVzID09PSAncGFzc2VkJyA/ICcjNGVjOWIwJyA6ICcjZGNkY2FhJyl9PntyZWNvcmQuc3RhdHVzfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntyZWNvcmQubmFtZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntmb3JtYXRUaW1lKHJlY29yZC5jcmVhdGVkQXQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgPC8+XG4gIClcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb290fSBkYXRhLXRlc3RpZD1cInByb2plY3QtY29udHJvbC13b3Jrc3BhY2VcIj5cbiAgICAgIDxzdHlsZT57TEFZT1VUX1NUWUxFfTwvc3R5bGU+XG4gICAgICA8ZGl2XG4gICAgICAgIGRhdGEtdGVzdGlkPVwicHJvamVjdC1jb250cm9sLWRpdmlkZXJcIlxuICAgICAgICBvblBvaW50ZXJEb3duPXtvbkRpdmlkZXJEb3dufVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IC00LCB3aWR0aDogOCxcbiAgICAgICAgICBjdXJzb3I6ICdjb2wtcmVzaXplJywgekluZGV4OiAyMCxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubmF2fT5cbiAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy50aXRsZX0+e3QoJ3dvcmtzcGFjZS50aXRsZScpfTwvc3Bhbj5cbiAgICAgICAge3RhYnMubWFwKChlbnRyeSkgPT4gKFxuICAgICAgICAgIDxidXR0b24ga2V5PXtlbnRyeS5rZXl9IHN0eWxlPXtzdHlsZXMudGFiKHRhYiA9PT0gZW50cnkua2V5KX0gb25DbGljaz17KCkgPT4geyBzZXRUYWIoZW50cnkua2V5KSB9fT57ZW50cnkubGFiZWx9PC9idXR0b24+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuYm9keX0+XG4gICAgICAgIHtsb2FkRXJyb3IgIT09IG51bGwgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZXJyb3IubG9hZCcpfToge2xvYWRFcnJvcn08L2Rpdj59XG4gICAgICAgIHtzdGF0ZT8ucmVhZHkgPT09IGZhbHNlICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3N0YXRlLnJlYXNvbiA/PyAnJ308L2Rpdj59XG4gICAgICAgIHt0YWIgPT09ICdjb21taXRzJyAmJiBjb21taXRzVGFifVxuICAgICAgICB7dGFiID09PSAnb3ZlcnZpZXcnICYmIG92ZXJ2aWV3VGFifVxuICAgICAgICB7dGFiID09PSAnZXhlY3V0aW9uJyAmJiBleGVjdXRpb25UYWJ9XG4gICAgICAgIHt0YWIgPT09ICdyZXZpZXcnICYmIHJldmlld1RhYn1cbiAgICAgICAge3RhYiA9PT0gJ25vdGVzJyAmJiBub3Rlc1RhYn1cbiAgICAgICAge3RhYiA9PT0gJ3NldHRpbmdzJyAmJiBzZXR0aW5nc1RhYn1cbiAgICAgIDwvZGl2PlxuICAgICAge2NvbmZpcm1EaWFsb2cgIT09IG51bGwgJiYgKFxuICAgICAgICA8Q29uZmlybURpYWxvZ1xuICAgICAgICAgIHRpdGxlPXtjb25maXJtRGlhbG9nLnRpdGxlfVxuICAgICAgICAgIG1lc3NhZ2U9e2NvbmZpcm1EaWFsb2cubWVzc2FnZX1cbiAgICAgICAgICBkYW5nZXI9e2NvbmZpcm1EaWFsb2cuZGFuZ2VyfVxuICAgICAgICAgIG9uQ2FuY2VsPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2cobnVsbCkgfX1cbiAgICAgICAgICBvbkNvbmZpcm09eygpID0+IHsgY29uZmlybURpYWxvZy5vbkNvbmZpcm0oKTsgc2V0Q29uZmlybURpYWxvZyhudWxsKSB9fVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKVxufVxuIl0s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Q3JCLHNCQUFzQjtBQUFBLElBQ3RCLGFBQWE7QUFBQSxJQUNiLG9CQUFvQjtBQUFBLElBQ3BCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHlCQUF5QjtBQUFBLElBQ3pCLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLGtCQUFrQjtBQUFBLElBQ2xCLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFB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ZUFBZTtBQUFBLElBQ2YsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsYUFBYTtBQUFBLElBQ2IsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBRWYsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIscUJBQXFCO0FBQUEsSUFDckIsa0JBQWtCO0FBQUEsSUFDbEIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUEsSUFDekIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsa0JBQWtCO0FBQUEsSUFDbEIsdUJBQXVCO0FBQUEsSUFFdkIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsSUFFbEIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsbUJBQW1CO0FBQUEsSUFDbkIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsaUJBQWlCO0FBQUEsSUFDakIsYUFBYTtBQUFBLElBQ2IsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsRUFDcEI7QUFBQSxFQUNBLElBQUk7QUFBQSxJQUNGLG1CQUFtQjtBQUFBLElBQ25CLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLElBQ2hCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGlCQUFpQjtBQUFBLElBQ2pCLHVCQUF1QjtBQUFBLElBQ3ZCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBRWhCLFlBQVk7QUFBQSxJQUNaLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHFCQUFxQjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLGFBQWE7QUFBQSxJQUNiLG9CQUFvQjtBQUFBLElBQ3BCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHlCQUF5QjtBQUFBLElBQ3pCLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLGtCQUFrQjtBQUFBLElBQ2xCLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLG9CQUFvQjtBQUFBLElBQ3BCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLHdCQUF3QjtBQUFBLElBQ3hCLGlCQUFpQjtBQUFBLElBQ2pCLHdCQUF3QjtBQUFBLElBRXhCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGlCQUFpQjtBQUFBLElBQVEsaUJBQWlCO0FBQUEsSUFBUSxrQkFBa0I7QUFBQSxJQUFTLG1CQUFtQjtBQUFBLElBQWtCLG9CQUFvQjtBQUFBLElBQU0scUJBQXFCO0FBQUEsSUFDaksscUJBQXFCO0FBQUEsSUFDckIscUJBQXFCO0FBQUEsSUFDckIscUJBQXFCO0FBQUEsSUFDckIsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFBVSxzQkFBc0I7QUFBQSxJQUFXLG9CQUFvQjtBQUFBLElBQ2xGLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLGVBQWU7QUFBQSxJQUFVLHlCQUF5QjtBQUFBLElBQXFCLG9CQUFvQjtBQUFBLElBQzNGLG1CQUFtQjtBQUFBLElBRW5CLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQWEsc0JBQXNCO0FBQUEsSUFDckQsb0JBQW9CO0FBQUEsSUFBZSxxQkFBcUI7QUFBQSxJQUFjLGlCQUFpQjtBQUFBLElBQ3ZGLGFBQWE7QUFBQSxJQUNiLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQVEsa0JBQWtCO0FBQUEsSUFBUSxzQkFBc0I7QUFBQSxJQUFTLGtCQUFrQjtBQUFBLElBQVksd0JBQXdCO0FBQUEsSUFBZSxxQkFBcUI7QUFBQSxJQUM3SyxhQUFhO0FBQUEsSUFBTSxjQUFjO0FBQUEsSUFBTSxnQkFBZ0I7QUFBQSxJQUN2RCxpQkFBaUI7QUFBQSxJQUFTLGdCQUFnQjtBQUFBLElBQVUsZ0JBQWdCO0FBQUEsSUFFcEUsb0JBQW9CO0FBQUEsSUFDcEIsdUJBQXVCO0FBQUEsSUFBaUIsbUJBQW1CO0FBQUEsSUFDM0QsaUJBQWlCO0FBQUEsSUFDakIsZUFBZTtBQUFBLElBQWUsa0JBQWtCO0FBQUEsSUFBWSxxQkFBcUI7QUFBQSxJQUNqRixxQkFBcUI7QUFBQSxJQUNyQixvQkFBb0I7QUFBQSxJQUFjLHFCQUFxQjtBQUFBLElBQVcscUJBQXFCO0FBQUEsSUFDdkYsd0JBQXdCO0FBQUEsSUFDeEIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFBMkIsc0JBQXNCO0FBQUEsSUFDeEUsdUJBQXVCO0FBQUEsSUFDdkIsaUJBQWlCO0FBQUEsSUFBVyxvQkFBb0I7QUFBQSxJQUF5QixrQkFBa0I7QUFBQSxJQUMzRixzQkFBc0I7QUFBQSxJQUN0QixhQUFhO0FBQUEsSUFDYixTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsSUFDVixlQUFlO0FBQUEsSUFDZixjQUFjO0FBQUEsSUFDZCxZQUFZO0FBQUEsSUFDWix3QkFBd0I7QUFBQSxJQUN4Qix1QkFBdUI7QUFBQSxJQUN2Qix1QkFBdUI7QUFBQSxJQUN2QixvQkFBb0I7QUFBQSxJQUNwQix1QkFBdUI7QUFBQSxJQUN2QixrQkFBa0I7QUFBQSxJQUNsQixlQUFlO0FBQUEsSUFDZixhQUFhO0FBQUEsSUFDYixhQUFhO0FBQUEsSUFFYixnQkFBZ0I7QUFBQSxJQUNoQixlQUFlO0FBQUEsSUFDZixlQUFlO0FBQUEsSUFDZixnQkFBZ0I7QUFBQSxJQUNoQixlQUFlO0FBQUEsSUFDZixnQkFBZ0I7QUFBQSxJQUNoQixnQkFBZ0I7QUFBQSxJQUNoQixvQkFBb0I7QUFBQSxJQUNwQixpQkFBaUI7QUFBQSxJQUNqQix3QkFBd0I7QUFBQSxJQUN4QixxQkFBcUI7QUFBQSxJQUNyQiw0QkFBNEI7QUFBQSxJQUU1QixlQUFlO0FBQUEsSUFDZixzQkFBc0I7QUFBQSxJQUN0Qix1QkFBdUI7QUFBQSxJQUN2Qix3QkFBd0I7QUFBQSxJQUN4QixlQUFlO0FBQUEsSUFDZixnQkFBZ0I7QUFBQSxJQUNoQix5QkFBeUI7QUFBQSxJQUN6QiwwQkFBMEI7QUFBQSxJQUMxQiwyQkFBMkI7QUFBQSxJQUUzQixrQkFBa0I7QUFBQSxJQUNsQixpQkFBaUI7QUFBQSxJQUNqQixnQkFBZ0I7QUFBQSxJQUVoQixlQUFlO0FBQUEsSUFDZixtQkFBbUI7QUFBQSxJQUNuQixxQkFBcUI7QUFBQSxJQUNyQixhQUFhO0FBQUEsSUFDYixpQkFBaUI7QUFBQSxJQUNqQixrQkFBa0I7QUFBQSxJQUNsQixtQkFBbUI7QUFBQSxJQUNuQixxQkFBcUI7QUFBQSxJQUNyQixpQkFBaUI7QUFBQSxJQUNqQixnQkFBZ0I7QUFBQSxJQUNoQixlQUFlO0FBQUEsSUFFZixpQkFBaUI7QUFBQSxJQUNqQixvQkFBb0I7QUFBQSxJQUNwQixzQkFBc0I7QUFBQSxJQUN0QixvQkFBb0I7QUFBQSxJQUNwQixtQkFBbUI7QUFBQSxJQUNuQixvQkFBb0I7QUFBQSxJQUNwQixxQkFBcUI7QUFBQSxJQUNyQixrQkFBa0I7QUFBQSxJQUNsQixnQkFBZ0I7QUFBQSxJQUNoQixrQkFBa0I7QUFBQSxJQUNsQixpQkFBaUI7QUFBQSxJQUNqQixxQkFBcUI7QUFBQSxJQUNyQix5QkFBeUI7QUFBQSxJQUN6QixzQkFBc0I7QUFBQSxJQUN0Qix1QkFBdUI7QUFBQSxJQUN2Qix1QkFBdUI7QUFBQSxJQUN2QixrQkFBa0I7QUFBQSxJQUNsQix1QkFBdUI7QUFBQSxJQUV2QixtQkFBbUI7QUFBQSxJQUNuQixpQkFBaUI7QUFBQSxJQUNqQixrQkFBa0I7QUFBQSxJQUNsQixtQkFBbUI7QUFBQSxJQUNuQixrQkFBa0I7QUFBQSxJQUVsQixpQkFBaUI7QUFBQSxJQUNqQixtQkFBbUI7QUFBQSxJQUNuQixxQkFBcUI7QUFBQSxJQUNyQixvQkFBb0I7QUFBQSxJQUNwQixzQkFBc0I7QUFBQSxJQUN0Qix1QkFBdUI7QUFBQSxJQUN2QixtQkFBbUI7QUFBQSxJQUNuQixtQkFBbUI7QUFBQSxJQUNuQixvQkFBb0I7QUFBQSxJQUNwQixpQkFBaUI7QUFBQSxJQUNqQixpQkFBaUI7QUFBQSxJQUNqQixhQUFhO0FBQUEsSUFDYixnQkFBZ0I7QUFBQSxJQUNoQixtQkFBbUI7QUFBQSxJQUNuQixpQkFBaUI7QUFBQSxJQUNqQixtQkFBbUI7QUFBQSxJQUNuQixrQkFBa0I7QUFBQSxFQUNwQjtBQUNGO0FBRUEsU0FBUyxVQUFVLEtBQXFCO0FBQ3RDLFFBQU0sT0FBTyxlQUFlO0FBQzVCLFNBQU8sS0FBSyxHQUFHLEtBQUs7QUFDdEI7QUFHQSxTQUFTLG1CQUFtQixNQUF1QztBQUNqRSxRQUFNLFFBQWtCLENBQUMsS0FBSyxJQUFJLE1BQU0sUUFBUSxXQUFNLFFBQUc7QUFDekQsYUFBVyxDQUFDLEtBQUssS0FBSyxLQUFLLE9BQU8sUUFBUSxJQUFJLEdBQUc7QUFDL0MsUUFBSSxRQUFRLEtBQU07QUFDbEIsUUFBSSxPQUFPLFVBQVUsWUFBWSxPQUFPLFVBQVUsWUFBWSxPQUFPLFVBQVUsV0FBVztBQUN4RixZQUFNLEtBQUssR0FBRyxHQUFHLFNBQUksT0FBTyxLQUFLLEVBQUUsTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFFO0FBQUEsSUFDcEQ7QUFBQSxFQUNGO0FBQ0EsTUFBSSxNQUFNLFdBQVcsRUFBRyxPQUFNLEtBQUssY0FBSTtBQUN2QyxTQUFPLE1BQU0sS0FBSyxJQUFJO0FBQ3hCO0FBRUEsSUFBTSxTQUE4QztBQUFBLEVBQ2xELE1BQU07QUFBQSxJQUNKLFVBQVU7QUFBQSxJQUNWLFFBQVE7QUFBQSxJQUNSLFNBQVM7QUFBQSxJQUNULGVBQWU7QUFBQSxJQUNmLFlBQVk7QUFBQSxJQUNaLE9BQU87QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsSUFDVCxZQUFZO0FBQUEsSUFDWixLQUFLO0FBQUEsSUFDTCxTQUFTO0FBQUEsSUFDVCxjQUFjO0FBQUEsSUFDZCxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsT0FBTyxFQUFFLFVBQVUsUUFBUSxZQUFZLEtBQUssaUJBQWlCLFFBQVEsT0FBTywwQ0FBMEM7QUFBQSxFQUN0SCxLQUFLLENBQUMsWUFBMEM7QUFBQSxJQUM5QyxTQUFTO0FBQUEsSUFDVCxjQUFjO0FBQUEsSUFDZCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsSUFDVixZQUFZLFNBQVMsNENBQTRDO0FBQUEsSUFDakUsT0FBTyxTQUFTLFNBQVM7QUFBQSxFQUMzQjtBQUFBLEVBQ0EsTUFBTSxFQUFFLE1BQU0sR0FBRyxXQUFXLFFBQVEsU0FBUyxZQUFZO0FBQUEsRUFDekQsTUFBTTtBQUFBLElBQ0osUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLElBQ2QsU0FBUztBQUFBLElBQ1QsY0FBYztBQUFBLElBQ2QsWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLEtBQUssRUFBRSxTQUFTLFFBQVEsS0FBSyxRQUFRLFVBQVUsUUFBUSxVQUFVLFFBQVEsUUFBUSxRQUFRO0FBQUEsRUFDekYsT0FBTyxFQUFFLE9BQU8sNkNBQTZDLGlCQUFpQixNQUFNO0FBQUEsRUFDcEYsT0FBTyxFQUFFLE9BQU8sUUFBUSxnQkFBZ0IsWUFBWSxVQUFVLE9BQU87QUFBQSxFQUNyRSxJQUFJLEVBQUUsV0FBVyxTQUFTLFNBQVMsV0FBVyxjQUFjLHlEQUF5RCxPQUFPLDZDQUE2QyxZQUFZLElBQUk7QUFBQSxFQUN6TCxJQUFJLEVBQUUsU0FBUyxXQUFXLGNBQWMseURBQXlEO0FBQUEsRUFDakcsT0FBTyxFQUFFLE9BQU8sNkNBQTZDLFVBQVUsUUFBUSxTQUFTLFdBQVc7QUFBQSxFQUNuRyxRQUFRO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFBWSxjQUFjO0FBQUEsSUFBTyxRQUFRO0FBQUEsSUFBUSxRQUFRO0FBQUEsSUFDbEUsVUFBVTtBQUFBLElBQVEsWUFBWTtBQUFBLElBQTJDLE9BQU87QUFBQSxJQUNoRixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsV0FBVztBQUFBLElBQ1QsU0FBUztBQUFBLElBQVksY0FBYztBQUFBLElBQU8sUUFBUTtBQUFBLElBQVcsVUFBVTtBQUFBLElBQ3ZFLFFBQVE7QUFBQSxJQUNSLFlBQVk7QUFBQSxJQUF3QyxPQUFPO0FBQUEsSUFDM0QsWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLE9BQU87QUFBQSxJQUFRLFNBQVM7QUFBQSxJQUFZLGNBQWM7QUFBQSxJQUFPLFVBQVU7QUFBQSxJQUNuRSxRQUFRO0FBQUEsSUFDUixZQUFZO0FBQUEsSUFBa0MsT0FBTztBQUFBLElBQ3JELFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxTQUFTLEVBQUUsU0FBUyxRQUFRLGVBQWUsVUFBVSxLQUFLLE9BQU8sY0FBYyxNQUFNO0FBQUEsRUFDckYsUUFBUTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQVksVUFBVTtBQUFBLElBQVEsWUFBWTtBQUFBLElBQ3RELFlBQVk7QUFBQSxJQUFrQyxRQUFRO0FBQUEsSUFDdEQsY0FBYztBQUFBLElBQU8sU0FBUztBQUFBLElBQWEsV0FBVztBQUFBLElBQVMsV0FBVztBQUFBLEVBQzVFO0FBQUEsRUFDQSxPQUFPLENBQUMsVUFBdUM7QUFDN0MsVUFBTSxNQUFNLFdBQVcsS0FBSztBQUM1QixRQUFJLFFBQVEsTUFBTTtBQUNoQixhQUFPLEVBQUUsU0FBUyxnQkFBZ0IsU0FBUyxXQUFXLGNBQWMsT0FBTyxVQUFVLFFBQVEsWUFBWSxHQUFHLEtBQUssTUFBTSxNQUFNO0FBQUEsSUFDL0g7QUFDQSxVQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSTtBQUVsQixXQUFPO0FBQUEsTUFDTCxTQUFTO0FBQUEsTUFBZ0IsU0FBUztBQUFBLE1BQVcsY0FBYztBQUFBLE1BQU8sVUFBVTtBQUFBLE1BQzVFLFlBQVksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFBQSxNQUNqQyxPQUFPLGVBQWUsS0FBSztBQUFBLElBQzdCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsY0FBYyxFQUFFLFlBQVksS0FBSyxVQUFVLFFBQVEsY0FBYyxNQUFNO0FBQUEsRUFDdkUsTUFBTSxFQUFFLFVBQVUsUUFBUSxZQUFZLEtBQUssUUFBUSxZQUFZO0FBQUEsRUFDL0QsV0FBVyxFQUFFLFVBQVUsUUFBUSxZQUFZLEtBQUssU0FBUyxRQUFRLEtBQUssTUFBTTtBQUFBLEVBQzVFLFVBQVUsRUFBRSxVQUFVLFFBQVEsWUFBWSxLQUFLLE9BQU8sV0FBVyxRQUFRLFFBQVE7QUFBQSxFQUNqRixXQUFXLENBQUMsWUFBMEM7QUFBQSxJQUNwRCxTQUFTO0FBQUEsSUFDVCxjQUFjO0FBQUEsSUFDZCxRQUFRO0FBQUEsSUFDUixRQUFRLFNBQVMsc0RBQXNEO0FBQUEsSUFDdkUsWUFBWSxTQUFTLHlCQUF5QjtBQUFBLElBQzlDLGNBQWM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsZUFBZSxFQUFFLFVBQVUsUUFBUSxZQUFZLEtBQUssWUFBWSxLQUFLLFVBQVUsVUFBVSxjQUFjLFlBQVksWUFBWSxTQUFTO0FBQUEsRUFDeEksWUFBWSxFQUFFLFVBQVUsUUFBUSxPQUFPLDZDQUE2QyxXQUFXLE9BQU8sU0FBUyxRQUFRLEtBQUssTUFBTTtBQUFBLEVBQ2xJLE9BQU87QUFBQSxJQUNMLFlBQVk7QUFBQSxJQUFhLFVBQVU7QUFBQSxJQUFRLFlBQVk7QUFBQSxJQUFLLFlBQVk7QUFBQSxJQUFZLFdBQVc7QUFBQSxJQUMvRixZQUFZO0FBQUEsSUFBa0MsUUFBUTtBQUFBLElBQ3RELGNBQWM7QUFBQSxJQUFPLFNBQVM7QUFBQSxJQUFRLFdBQVc7QUFBQSxJQUFTLFdBQVc7QUFBQSxFQUN2RTtBQUFBLEVBQ0EsVUFBVTtBQUFBLElBQ1IsT0FBTztBQUFBLElBQVEsU0FBUztBQUFBLElBQVksY0FBYztBQUFBLElBQU8sVUFBVTtBQUFBLElBQ25FLFFBQVE7QUFBQSxJQUNSLFlBQVk7QUFBQSxJQUFrQyxPQUFPO0FBQUEsSUFDckQsV0FBVztBQUFBLElBQWMsUUFBUTtBQUFBLElBQVksWUFBWTtBQUFBLElBQUssWUFBWTtBQUFBLEVBQzVFO0FBQUEsRUFDQSxVQUFVO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFBTyxTQUFTO0FBQUEsSUFBYSxjQUFjO0FBQUEsSUFDekQsWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLGNBQWMsRUFBRSxTQUFTLFFBQVEsZ0JBQWdCLGlCQUFpQixZQUFZLGNBQWMsS0FBSyxNQUFNO0FBQUEsRUFDdkcsZUFBZSxFQUFFLFVBQVUsUUFBUSxZQUFZLEtBQUssWUFBWSxJQUFJO0FBQUEsRUFDcEUsYUFBYTtBQUFBLElBQ1gsVUFBVTtBQUFBLElBQVEsWUFBWTtBQUFBLElBQU0sWUFBWTtBQUFBLElBQVksV0FBVztBQUFBLElBQ3ZFLE9BQU87QUFBQSxJQUEyQyxXQUFXO0FBQUEsRUFDL0Q7QUFBQSxFQUNBLFdBQVc7QUFBQSxJQUNULFNBQVM7QUFBQSxJQUFlLGlCQUFpQjtBQUFBLElBQUcsaUJBQWlCO0FBQUEsSUFBWSxVQUFVO0FBQUEsRUFDckY7QUFBQSxFQUNBLFVBQVU7QUFBQSxJQUNSLFNBQVM7QUFBQSxJQUFRLEtBQUs7QUFBQSxJQUFRLFlBQVk7QUFBQSxJQUFVLFdBQVc7QUFBQSxJQUMvRCxVQUFVO0FBQUEsSUFBUSxPQUFPO0FBQUEsRUFDM0I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUFRLFFBQVE7QUFBQSxJQUFRLFFBQVE7QUFBQSxJQUFXLFVBQVU7QUFBQSxJQUFRLFNBQVM7QUFBQSxJQUNsRixPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsTUFBTSxDQUFDLFlBQTBDO0FBQUEsSUFDL0MsU0FBUztBQUFBLElBQVksY0FBYztBQUFBLElBQVMsVUFBVTtBQUFBLElBQVEsUUFBUTtBQUFBLElBQ3RFLFFBQVE7QUFBQSxJQUNSLFlBQVksU0FBUyw0Q0FBNEM7QUFBQSxJQUNqRSxPQUFPLFNBQVMsU0FBUztBQUFBLEVBQzNCO0FBQ0Y7QUFHQSxJQUFNLGFBQXFDLEVBQUUsS0FBSyxXQUFXLFFBQVEsV0FBVyxNQUFNLFdBQVcsVUFBVSxVQUFVO0FBT3JILFNBQVMsWUFBWSxPQUFpRTtBQUNwRixRQUFNLEVBQUUsS0FBSyxJQUFJO0FBQ2pCLFFBQU0sV0FBVyxLQUFLLE9BQU8sT0FBTyxDQUFDLFNBQVMsS0FBSyxVQUFVLFVBQVU7QUFDdkUsUUFBTSxZQUFZLEtBQUssT0FBTyxPQUFPLENBQUMsU0FBUyxLQUFLLFVBQVUsV0FBVztBQUN6RSxRQUFNLE9BQU8sS0FBSyxhQUFhLE1BQU0sR0FBRyxDQUFDO0FBQ3pDLFFBQU0sT0FBTyxNQUFNLEtBQUssSUFBSSxJQUFJLFNBQVMsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDO0FBQzlFLFFBQU0sT0FBTyxNQUFNLEtBQUssSUFBSSxJQUFJLFVBQVUsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDO0FBQ2hILFFBQU0sUUFBUTtBQUNkLFFBQU0sTUFBTTtBQUNaLFFBQU0sT0FBTyxDQUFDLElBQUksS0FBSyxHQUFHO0FBQzFCLFFBQU0sT0FBTztBQUNiLFFBQU0sT0FBTyxLQUFLLElBQUksS0FBSyxRQUFRLEtBQUssUUFBUSxLQUFLLFFBQVEsQ0FBQztBQUM5RCxRQUFNLFNBQVMsUUFBUSxRQUFRLE9BQU87QUFFdEMsUUFBTSxVQUFVLENBQUMsU0FBeUI7QUFDeEMsVUFBTSxPQUFPLFNBQVMsS0FBSyxDQUFDLFVBQVUsTUFBTSxTQUFTLElBQUksS0FBSyxVQUFVLEtBQUssQ0FBQyxVQUFVLE1BQU0sU0FBUyxJQUFJO0FBQzNHLFdBQU8sTUFBTSxTQUFTO0FBQUEsRUFDeEI7QUFFQSxRQUFNLFlBQVksQ0FBQyxLQUFhLE9BQWlCLFVBQXFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sVUFBVTtBQUMvRyxVQUFNLElBQUksS0FBSyxTQUFTLFFBQVE7QUFDaEMsVUFBTSxNQUFNLEtBQUssU0FBUyxHQUFHLElBQUksS0FBSyxNQUFNLEdBQUcsS0FBSyxZQUFZLEdBQUcsQ0FBQyxJQUFJO0FBQ3hFLFdBQU8sY0FBQUMsUUFBTTtBQUFBLE1BQWM7QUFBQSxNQUFLLEVBQUUsS0FBSyxHQUFHLEdBQUcsSUFBSSxJQUFJLEdBQUc7QUFBQSxNQUN0RCxjQUFBQSxRQUFNLGNBQWMsUUFBUSxFQUFFLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxPQUFPLE1BQU0sUUFBUSxPQUFPLElBQUksR0FBRyxNQUFNLE9BQU8sUUFBUSxtQkFBbUIsYUFBYSxFQUFFLENBQUM7QUFBQSxNQUMxSSxjQUFBQSxRQUFNO0FBQUEsUUFBYztBQUFBLFFBQVEsRUFBRSxHQUFHLEtBQUssR0FBRyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksVUFBVSxJQUFJLFlBQVksS0FBSyxNQUFNLFVBQVU7QUFBQSxTQUN4RyxLQUFLLE1BQU0sR0FBRyxFQUFFLElBQUksS0FBSyxNQUFNLE1BQU0sR0FBRyxFQUFFO0FBQUEsTUFBQztBQUFBLE1BQzlDLGNBQUFBLFFBQU07QUFBQSxRQUFjO0FBQUEsUUFBUSxFQUFFLEdBQUcsS0FBSyxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxVQUFVLElBQUksTUFBTSx5QkFBeUI7QUFBQSxRQUN2RyxJQUFJLE1BQU0sR0FBRyxFQUFFO0FBQUEsTUFBQztBQUFBLE1BQ2xCLGNBQUFBLFFBQU0sY0FBYyxTQUFTLE1BQU0sSUFBSTtBQUFBLElBQ3pDO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxhQUFhLENBQUMsV0FBMkI7QUFDN0MsVUFBTSxRQUFRLE9BQU8sTUFBTSxhQUFhO0FBQ3hDLFFBQUksVUFBVSxLQUFNLFFBQU8sS0FBSyxhQUFhLENBQUMsS0FBSztBQUNuRCxXQUFPLE1BQU0sQ0FBQyxFQUFHLE1BQU0sTUFBTSxFQUFFLENBQUMsS0FBSyxLQUFLLGFBQWEsQ0FBQyxLQUFLO0FBQUEsRUFDL0Q7QUFDQSxRQUFNLFVBQVUsQ0FBQyxPQUFpQixTQUF5QixNQUFNLFFBQVEsSUFBSTtBQUM3RSxRQUFNLFFBQVEsQ0FBQyxTQUF5QjtBQUN0QyxRQUFJLEtBQUssU0FBUyxJQUFJLEVBQUcsUUFBTztBQUNoQyxRQUFJLEtBQUssU0FBUyxJQUFJLEVBQUcsUUFBTztBQUNoQyxRQUFJLEtBQUssU0FBUyxJQUFJLEVBQUcsUUFBTztBQUNoQyxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sUUFBMkIsQ0FBQztBQUNsQyxRQUFNLFdBQVcsQ0FBQyxVQUFrQixRQUFnQixPQUFlLFFBQXNCO0FBQ3ZGLFVBQU0sVUFBVSxNQUFNLFFBQVE7QUFDOUIsVUFBTSxRQUFRLE1BQU0sTUFBTTtBQUMxQixRQUFJLFlBQVksTUFBTSxVQUFVLE1BQU0sU0FBUyxRQUFTO0FBQ3hELFVBQU0sS0FBSyxLQUFLLE9BQU8sSUFBSTtBQUMzQixVQUFNLEtBQUssS0FBSyxRQUFRLENBQUMsTUFBTSxNQUFNLElBQUksRUFBRSxPQUFPLEtBQUssQ0FBQyxHQUFHLFFBQVEsS0FBSyxRQUFRLE9BQU8sUUFBUTtBQUMvRixVQUFNLEtBQUssS0FBSyxLQUFLO0FBQ3JCLFVBQU0sS0FBSyxLQUFLLFFBQVEsQ0FBQyxNQUFNLE1BQU0sSUFBSSxFQUFFLEtBQUssS0FBSyxDQUFDLEdBQUcsTUFBTSxLQUFLLFFBQVEsT0FBTyxRQUFRO0FBQzNGLFVBQU0sS0FBSyxjQUFBQSxRQUFNLGNBQWMsUUFBUTtBQUFBLE1BQ3JDO0FBQUEsTUFBSyxHQUFHLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO0FBQUEsTUFDdkUsTUFBTTtBQUFBLE1BQVEsUUFBUTtBQUFBLE1BQU8sYUFBYTtBQUFBLE1BQUssU0FBUztBQUFBLElBQzFELENBQUMsQ0FBQztBQUFBLEVBQ0o7QUFDQSxhQUFXLFFBQVEsU0FBUyxNQUFNLEdBQUcsRUFBRSxFQUFHLFVBQVMsV0FBVyxLQUFLLE1BQU0sR0FBRyxLQUFLLE1BQU0sV0FBVyxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQ25ILGFBQVcsUUFBUSxVQUFVLE1BQU0sR0FBRyxFQUFFLEVBQUcsVUFBUyxXQUFXLEtBQUssTUFBTSxHQUFHLEtBQUssTUFBTSxXQUFXLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFFcEgsU0FBTyxjQUFBQSxRQUFNO0FBQUEsSUFBYztBQUFBLElBQU87QUFBQSxJQUNoQyxjQUFBQSxRQUFNO0FBQUEsTUFBYztBQUFBLE1BQU8sRUFBRSxPQUFPLFFBQVEsU0FBUyxZQUFZLE1BQU0sSUFBSSxPQUFPLEVBQUUsV0FBVyxJQUFJLEVBQUU7QUFBQSxNQUNuRyxDQUFDLENBQUMsNEJBQVEsQ0FBQyxHQUFHLENBQUMsc0VBQWUsQ0FBQyxHQUFHLENBQUMsZ0VBQWMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUNELE9BQU0sR0FBRyxNQUNsRSxjQUFBQyxRQUFNLGNBQWMsUUFBUSxFQUFFLEtBQUssT0FBTyxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQWEsR0FBRyxHQUFHLElBQUksVUFBVSxJQUFJLFlBQVksS0FBSyxNQUFNLDBDQUEwQyxHQUFHRCxLQUFjLENBQUM7QUFBQSxNQUNsTCxVQUFVLEdBQUcsTUFBTSxTQUFTO0FBQUEsTUFDNUIsVUFBVSxHQUFHLE1BQU0sU0FBUztBQUFBLE1BQzVCLFVBQVUsR0FBRyxNQUFNLFNBQVM7QUFBQSxNQUM1QjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFNLGdCQUFnQjtBQUd0QixTQUFTLGtCQUFrQixNQUFjLFdBQXNDO0FBQzdFLFFBQU0sVUFBVSxLQUFLLFVBQVU7QUFDL0IsTUFBSSxRQUFRLFdBQVcsSUFBSSxLQUFLLFFBQVEsV0FBVyxLQUFLLEtBQUssUUFBUSxXQUFXLEdBQUcsS0FBSyxRQUFRLFdBQVcsSUFBSSxLQUFLLFFBQVEsV0FBVyxHQUFHLEdBQUc7QUFDM0ksV0FBTyxDQUFDLGNBQUFDLFFBQU0sY0FBYyxRQUFRLEVBQUUsS0FBSyxHQUFHLFNBQVMsTUFBTSxPQUFPLEVBQUUsT0FBTyxlQUFlLFNBQVMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQUEsRUFDbkg7QUFDQSxRQUFNLFFBQVEsS0FBSyxNQUFNLDBEQUEwRDtBQUNuRixTQUFPLE1BQU0sSUFBSSxDQUFDLE1BQU0sTUFBTTtBQUM1QixRQUFJLElBQUksTUFBTSxFQUFHLFFBQU8sY0FBQUEsUUFBTSxjQUFjLFFBQVEsRUFBRSxLQUFLLEdBQUcsU0FBUyxLQUFLLENBQUMsSUFBSSxPQUFPLEVBQUUsT0FBTyxlQUFlLFNBQVMsRUFBRSxFQUFFLEdBQUcsSUFBSTtBQUNwSSxVQUFNLE1BQXlCLENBQUM7QUFDaEMsUUFBSSxPQUFPO0FBQ1gsZUFBVyxTQUFTLEtBQUssU0FBUyxhQUFhLEdBQUc7QUFDaEQsVUFBSSxNQUFNLFFBQVMsS0FBTSxLQUFJLEtBQUssS0FBSyxNQUFNLE1BQU0sTUFBTSxLQUFLLENBQUM7QUFDL0QsVUFBSSxLQUFLLGNBQUFBLFFBQU0sY0FBYyxRQUFRLEVBQUUsS0FBSyxHQUFHLFNBQVMsS0FBSyxDQUFDLElBQUksTUFBTSxLQUFLLElBQUksT0FBTyxFQUFFLE9BQU8sZUFBZSxTQUFTLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDekksYUFBTyxNQUFNLFFBQVMsTUFBTSxDQUFDLEVBQUU7QUFBQSxJQUNqQztBQUNBLFFBQUksT0FBTyxLQUFLLE9BQVEsS0FBSSxLQUFLLEtBQUssTUFBTSxJQUFJLENBQUM7QUFDakQsV0FBTyxjQUFBQSxRQUFNLGNBQWMsY0FBQUEsUUFBTSxVQUFVLEVBQUUsS0FBSyxHQUFHLFNBQVMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHO0FBQUEsRUFDL0UsQ0FBQztBQUNIO0FBR0EsU0FBUyxTQUFTLE9BQTBCO0FBQzFDLFFBQU0sUUFBUSxNQUFNLE1BQU0sTUFBTSxJQUFJLEVBQUUsT0FBTyxDQUFDLE1BQU0sTUFBTSxFQUFFLFNBQVMsTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLElBQUksRUFBRSxTQUFTLEVBQUU7QUFDcEgsU0FBTyxjQUFBQSxRQUFNLGNBQWMsT0FBTztBQUFBLElBQ2hDLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxNQUF1QixVQUFVO0FBQUEsTUFBUSxZQUFZO0FBQUEsTUFDakUsWUFBWTtBQUFBLE1BQWtDLFFBQVE7QUFBQSxNQUN0RCxjQUFjO0FBQUEsTUFBTyxTQUFTO0FBQUEsTUFBUyxXQUFXO0FBQUEsTUFBSyxXQUFXO0FBQUEsTUFBUSxXQUFXO0FBQUEsSUFDdkY7QUFBQSxFQUNGLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxNQUFNO0FBQ3hCLFVBQU0sT0FBTyxLQUFLLFdBQVcsS0FBSyxLQUFLLEtBQUssV0FBVyxLQUFLLElBQUksU0FDNUQsS0FBSyxXQUFXLElBQUksSUFBSSxTQUN0QixLQUFLLFdBQVcsR0FBRyxJQUFJLFFBQ3JCLEtBQUssV0FBVyxHQUFHLElBQUksUUFBUTtBQUN2QyxVQUFNLEtBQUssU0FBUyxRQUFRLHlCQUF5QixTQUFTLFFBQVEseUJBQXlCLFNBQVMsU0FBUyx5QkFBeUI7QUFDMUksVUFBTSxVQUFVLFNBQVMsVUFBVSxTQUFTLFNBQ3hDLGNBQUFBLFFBQU0sY0FBYyxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sV0FBVyxZQUFZLElBQUksRUFBRSxHQUFHLElBQUksSUFDbEYsU0FBUyxTQUFTLFNBQVMsUUFDekIsY0FBQUEsUUFBTSxjQUFjLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxTQUFTLFFBQVEsWUFBWSxXQUFXLFlBQVksSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFDbEg7QUFDTixXQUFPLGNBQUFBLFFBQU07QUFBQSxNQUFjO0FBQUEsTUFBTyxFQUFFLEtBQUssR0FBRyxPQUFPLEVBQUUsU0FBUyxVQUFVLFlBQVksSUFBSSxZQUFZLFlBQVksV0FBVyxZQUFZLEVBQUU7QUFBQSxNQUN2STtBQUFBLE1BQ0EsU0FBUyxTQUFTLFNBQVMsUUFBUSxrQkFBa0IsS0FBSyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLGtCQUFrQixNQUFNLElBQUksQ0FBQyxFQUFFO0FBQUEsSUFDaEg7QUFBQSxFQUNGLENBQUMsQ0FBQztBQUNKO0FBRUEsU0FBUyxXQUFXLE9BQTBDO0FBQzVELE1BQUksVUFBVSxRQUFRLFVBQVUsT0FBVyxRQUFPO0FBQ2xELFNBQU8sSUFBSSxLQUFLLEtBQUssRUFBRSxlQUFlO0FBQ3hDO0FBR0EsU0FBUyxjQUFjLE9BQTBHO0FBQy9ILFNBQU8sY0FBQUEsUUFBTTtBQUFBLElBQWMsY0FBQUEsUUFBTTtBQUFBLElBQVU7QUFBQSxJQUN6QyxjQUFBQSxRQUFNO0FBQUEsTUFBYztBQUFBLE1BQU87QUFBQSxRQUN6QixlQUFlO0FBQUEsUUFDZixPQUFPO0FBQUEsVUFDTCxVQUFVO0FBQUEsVUFBUyxPQUFPO0FBQUEsVUFBRyxRQUFRO0FBQUEsVUFDckMsWUFBWTtBQUFBLFVBQXVCLGdCQUFnQjtBQUFBLFVBQ25ELFNBQVM7QUFBQSxVQUFRLFlBQVk7QUFBQSxVQUFVLGdCQUFnQjtBQUFBLFVBQ3ZELFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQSxTQUFTLE1BQU07QUFBQSxNQUNqQjtBQUFBLE1BQ0UsY0FBQUEsUUFBTTtBQUFBLFFBQWM7QUFBQSxRQUFPO0FBQUEsVUFDekIsZUFBZTtBQUFBLFVBQ2YsT0FBTztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQUssVUFBVTtBQUFBLFlBQ3RCLFlBQVk7QUFBQSxZQUNaLGNBQWM7QUFBQSxZQUFRLFdBQVc7QUFBQSxZQUNqQyxTQUFTO0FBQUEsWUFDVCxTQUFTLENBQUMsTUFBd0I7QUFBRSxnQkFBRSxnQkFBZ0I7QUFBQSxZQUFFO0FBQUEsVUFDMUQ7QUFBQSxRQUNGO0FBQUEsUUFDRSxjQUFBQSxRQUFNO0FBQUEsVUFBYztBQUFBLFVBQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxRQUFRLFlBQVksY0FBYyxLQUFLLE9BQU8sRUFBRTtBQUFBLFVBQzdGLGNBQUFBLFFBQU0sY0FBYyxPQUFPO0FBQUEsWUFDekIsT0FBTztBQUFBLGNBQ0wsT0FBTztBQUFBLGNBQUksUUFBUTtBQUFBLGNBQUksY0FBYztBQUFBLGNBQU8sWUFBWTtBQUFBLGNBQ3hELFNBQVM7QUFBQSxjQUFRLFlBQVk7QUFBQSxjQUFVLGdCQUFnQjtBQUFBLGNBQ3ZELFVBQVU7QUFBQSxjQUNWLFlBQVksTUFBTSxTQUFTLHlCQUF5QjtBQUFBLGNBQ3BELE9BQU8sTUFBTSxTQUFTLFlBQVk7QUFBQSxZQUNwQztBQUFBLFVBQ0YsR0FBRyxNQUFNLFNBQVMsTUFBTSxHQUFHO0FBQUEsVUFDM0IsY0FBQUEsUUFBTTtBQUFBLFlBQWM7QUFBQSxZQUFPO0FBQUEsWUFDekIsY0FBQUEsUUFBTSxjQUFjLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxRQUFRLFlBQVksS0FBSyxjQUFjLE9BQU8sT0FBTywwQ0FBMEMsRUFBRSxHQUFHLE1BQU0sS0FBSztBQUFBLFlBQy9KLGNBQUFBLFFBQU0sY0FBYyxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsUUFBUSxZQUFZLEtBQUssT0FBTyw0Q0FBNEMsRUFBRSxHQUFHLE1BQU0sT0FBTztBQUFBLFVBQ2hKO0FBQUEsUUFDRjtBQUFBLFFBQ0EsY0FBQUEsUUFBTTtBQUFBLFVBQWM7QUFBQSxVQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsUUFBUSxnQkFBZ0IsWUFBWSxLQUFLLFFBQVEsV0FBVyxPQUFPLEVBQUU7QUFBQSxVQUNsSCxjQUFBQSxRQUFNLGNBQWMsVUFBVTtBQUFBLFlBQzVCLE9BQU8sRUFBRSxHQUFHLE9BQU8sV0FBVyxTQUFTLFlBQVksY0FBYyxNQUFNO0FBQUEsWUFDdkUsU0FBUyxNQUFNO0FBQUEsVUFDakIsR0FBRyxjQUFJO0FBQUEsVUFDUCxjQUFBQSxRQUFNLGNBQWMsVUFBVTtBQUFBLFlBQzVCLGVBQWU7QUFBQSxZQUNmLE9BQU87QUFBQSxjQUNMLFNBQVM7QUFBQSxjQUFZLGNBQWM7QUFBQSxjQUFPLFFBQVE7QUFBQSxjQUFRLFFBQVE7QUFBQSxjQUFXLFVBQVU7QUFBQSxjQUFRLFlBQVk7QUFBQSxjQUMzRyxZQUFZLE1BQU0sU0FBUyxZQUFZO0FBQUEsY0FBMkMsT0FBTztBQUFBLFlBQzNGO0FBQUEsWUFDQSxTQUFTLE1BQU07QUFBQSxVQUNqQixHQUFHLDBCQUFNO0FBQUEsUUFDWDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBR0EsU0FBUyxLQUFLLE9BQXVEO0FBQ25FLFNBQU8sY0FBQUEsUUFBTTtBQUFBLElBQWM7QUFBQSxJQUFPLEVBQUUsT0FBTyxPQUFPLEtBQUs7QUFBQSxJQUNyRCxNQUFNLFVBQVUsU0FBWSxPQUFPLGNBQUFBLFFBQU0sY0FBYyxPQUFPLEVBQUUsT0FBTyxPQUFPLGFBQWEsR0FBRyxNQUFNLEtBQUs7QUFBQSxJQUN6RyxNQUFNO0FBQUEsRUFBUTtBQUNsQjtBQUtPLFNBQVMsZUFBZSxPQUE0QjtBQUN6RCxRQUFNLElBQUksTUFBTSxLQUFLO0FBQ3JCLFFBQU0sQ0FBQyxLQUFLLE1BQU0sUUFBSSx3QkFBaUIsU0FBUztBQUNoRCxRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksd0JBQWdDLElBQUk7QUFDOUQsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHdCQUF3QixJQUFJO0FBQzlELFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixRQUFJLHdCQUFTLEtBQUs7QUFDeEQsUUFBTSxDQUFDLE1BQU0sT0FBTyxRQUFJLHdCQUF3QixJQUFJO0FBQ3BELFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx3QkFBd0IsSUFBSTtBQUNwRSxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksd0JBQVMsRUFBRTtBQUNqRCxRQUFNLENBQUMsWUFBWSxhQUFhLFFBQUksd0JBQVMsRUFBRTtBQUMvQyxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksd0JBQVMsRUFBRTtBQUNqRCxRQUFNLENBQUMsZUFBZSxnQkFBZ0IsUUFBSSx3QkFBUyxFQUFFO0FBQ3JELFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixRQUFJLHdCQUFTLEVBQUU7QUFDckQsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsUUFBSSx3QkFBUyxFQUFFO0FBR3ZELFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx3QkFBZ0MsSUFBSTtBQUMxRSxRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksd0JBQXdCLElBQUk7QUFDcEUsUUFBTSxDQUFDLFlBQVksYUFBYSxRQUFJLHdCQUFTLEtBQUs7QUFDbEQsUUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHdCQUFTLEVBQUU7QUFDbkQsUUFBTSxDQUFDLGlCQUFpQixrQkFBa0IsUUFBSSx3QkFBbUIsQ0FBQyxDQUFDO0FBQ25FLFFBQU0sQ0FBQyxTQUFTLFVBQVUsUUFBSSx3QkFBOEMsQ0FBQyxDQUFDO0FBQzlFLFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixRQUFJLHdCQUFTLEtBQUs7QUFDeEQsUUFBTSxDQUFDLFFBQVEsU0FBUyxRQUFJLHdCQUFvQyxJQUFJO0FBQ3BFLFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixRQUFJLHdCQUFTLEtBQUs7QUFDeEQsUUFBTSxDQUFDLFNBQVMsVUFBVSxRQUFJLHdCQUF3QyxDQUFDLENBQUM7QUFDeEUsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLFFBQUksd0JBQVMsS0FBSztBQUN4RCxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQWlDLENBQUMsQ0FBQztBQUNyRSxRQUFNLENBQUMsZUFBZSxnQkFBZ0IsUUFBSSx3QkFBNkYsSUFBSTtBQUMzSSxRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksd0JBQXNCLENBQUMsQ0FBQztBQUNsRCxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQVMsRUFBRTtBQUM3QyxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksd0JBQVMsRUFBRTtBQUNqRCxRQUFNLENBQUMsVUFBVSxXQUFXLFFBQUksd0JBQVMsRUFBRTtBQUMzQyxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksd0JBQThFLElBQUk7QUFDeEgsUUFBTSxDQUFDLFlBQVksYUFBYSxRQUFJLHdCQUFTLEVBQUU7QUFDL0MsUUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHdCQUFrQyxDQUFDLENBQUM7QUFDNUUsUUFBTSxDQUFDLFlBQVksYUFBYSxRQUFJLHdCQUE4QixJQUFJO0FBQ3RFLFFBQU0sQ0FBQyxxQkFBcUIsc0JBQXNCLFFBQUksd0JBQVMsRUFBRTtBQUNqRSxRQUFNLENBQUMsbUJBQW1CLG9CQUFvQixRQUFJLHdCQUFTLEVBQUU7QUFDN0QsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLFFBQUksd0JBQWtDLENBQUMsQ0FBQztBQUM5RSxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksd0JBQWtDLENBQUMsQ0FBQztBQUMxRSxRQUFNLENBQUMsaUJBQWlCLGtCQUFrQixRQUFJLHdCQUF3QixJQUFJO0FBQzFFLFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixRQUFJLHdCQUFTLEtBQUs7QUFDeEQsUUFBTSxDQUFDLFlBQVksYUFBYSxRQUFJLHdCQUFxRSxJQUFJO0FBQzdHLFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx3QkFBZ0UsQ0FBQyxDQUFDO0FBQzFHLFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx3QkFBUyxLQUFLO0FBQ3BELFFBQU0sQ0FBQyxZQUFZLGFBQWEsUUFBSSx3QkFBUyxLQUFLO0FBRWxELFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx3QkFBZ0UsSUFBSTtBQUMxRyxRQUFNLENBQUMsVUFBVSxXQUFXLFFBQUksd0JBQVMsS0FBSztBQUM5QyxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQTJCLElBQUk7QUFDakUsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLFFBQUksd0JBQXNDLElBQUk7QUFDcEYsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHdCQUFTLEVBQUU7QUFDN0MsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHdCQUFTLFFBQVE7QUFDbkQsUUFBTSxDQUFDLFlBQVksYUFBYSxRQUFJLHdCQUFTLEVBQUU7QUFDL0MsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHdCQUFTLEVBQUU7QUFDN0MsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLFFBQUksd0JBQVMsTUFBTTtBQUV6RCxRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksd0JBQWlDLElBQUk7QUFDN0UsUUFBTSxDQUFDLFlBQVksYUFBYSxRQUFJLHdCQUE0QixJQUFJO0FBQ3BFLFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx3QkFBK0IsU0FBUztBQUM5RSxRQUFNLENBQUMsWUFBWSxhQUFhLFFBQUksd0JBQVMsdUJBQXVCO0FBQ3BFLFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixRQUFJLHdCQUFTLEtBQUs7QUFDeEQsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHdCQUFTLEVBQUU7QUFDN0MsUUFBTSxDQUFDLFVBQVUsV0FBVyxRQUFJLHdCQUFTLEVBQUU7QUFFM0MsUUFBTSxPQUFPLE9BQU8sTUFBYyxTQUEyRjtBQUMzSCxVQUFNLFdBQVcsTUFBTSxNQUFNLE1BQU07QUFBQSxNQUNqQyxRQUFRO0FBQUEsTUFDUixTQUFTLEVBQUUsZ0JBQWdCLG1CQUFtQjtBQUFBLE1BQzlDLE1BQU0sS0FBSyxVQUFVLEVBQUUsR0FBRyxNQUFNLFdBQVcsTUFBTSxVQUFVLENBQUM7QUFBQSxJQUM5RCxDQUFDO0FBQ0QsVUFBTSxPQUFnQixNQUFNLFNBQVMsS0FBSztBQUMxQyxXQUFPLEVBQUUsSUFBSSxTQUFTLElBQUksTUFBTyxRQUFRLENBQUMsRUFBOEI7QUFBQSxFQUMxRTtBQUVBLFFBQU0sY0FBYyxZQUEyQjtBQUM3QyxRQUFJO0FBQ0YsWUFBTSxXQUFXLE1BQU0sTUFBTSwwQ0FBMEMsbUJBQW1CLE1BQU0sYUFBYSxFQUFFLENBQUMsV0FBVztBQUMzSCxZQUFNLE9BQWdCLE1BQU0sU0FBUyxLQUFLO0FBQzFDLFVBQUksQ0FBQyxTQUFTLEdBQUksT0FBTSxJQUFJLE1BQU8sS0FBNEIsU0FBUyxRQUFRLFNBQVMsTUFBTSxFQUFFO0FBQ2pHLHFCQUFlLElBQXNCO0FBQ3JDLHNCQUFnQixJQUFJO0FBQUEsSUFDdEIsU0FBUyxPQUFnQjtBQUN2QixzQkFBZ0IsaUJBQWlCLFFBQVEsTUFBTSxVQUFVLE9BQU8sS0FBSyxDQUFDO0FBQUEsSUFDeEU7QUFBQSxFQUNGO0FBRUEsUUFBTSxZQUFZLFlBQTJCO0FBQzNDLFFBQUk7QUFDRixZQUFNLFdBQVcsTUFBTSxNQUFNLDBDQUEwQyxtQkFBbUIsTUFBTSxhQUFhLEVBQUUsQ0FBQztBQUNoSCxZQUFNLE9BQWdCLE1BQU0sU0FBUyxLQUFLO0FBQzFDLFVBQUksU0FBUyxHQUFJLFVBQVUsS0FBZ0MsU0FBUyxDQUFDLENBQUM7QUFBQSxJQUN4RSxRQUFRO0FBQUEsSUFFUjtBQUFBLEVBQ0Y7QUFHQSxRQUFNLGVBQWUsT0FBTyxXQUFrQztBQUM1RCx1QkFBbUIsQ0FBQyxhQUFhO0FBQy9CLFVBQUksU0FBUyxTQUFTLE1BQU0sRUFBRyxRQUFPLFNBQVMsT0FBTyxDQUFDLFNBQVMsU0FBUyxNQUFNO0FBQy9FLGFBQU8sQ0FBQyxHQUFHLFVBQVUsTUFBTTtBQUFBLElBQzdCLENBQUM7QUFDRCxjQUFVLElBQUk7QUFDZCxlQUFXLENBQUMsQ0FBQztBQUNiLFFBQUksQ0FBQyxnQkFBZ0IsU0FBUyxNQUFNLEdBQUc7QUFDckMsWUFBTSxXQUFXLFFBQVEsS0FBSztBQUFBLElBQ2hDO0FBQUEsRUFDRjtBQUdBLFFBQU0sYUFBYSxPQUFPLFFBQWdCLFVBQWtDO0FBQzFFLHFCQUFpQixJQUFJO0FBQ3JCLFFBQUk7QUFDRixZQUFNLEVBQUUsSUFBSSxLQUFLLElBQUksTUFBTSxLQUFLLHNDQUFzQyxFQUFFLEtBQUssUUFBUSxNQUFNLENBQUM7QUFDNUYsVUFBSSxDQUFDLElBQUk7QUFDUCxtQkFBVyxDQUFDLGNBQWM7QUFBQSxVQUN4QixHQUFHO0FBQUEsVUFDSCxDQUFDLE1BQU0sR0FBRztBQUFBLFlBQ1IsS0FBSztBQUFBLFlBQ0wsV0FBVyxXQUFXO0FBQUEsWUFDdEIsT0FBTyxDQUFDO0FBQUEsWUFDUixZQUFZO0FBQUEsWUFDWixXQUFXO0FBQUEsWUFDWCxnQkFBZ0I7QUFBQSxZQUNoQixPQUFPO0FBQUEsWUFDUCxRQUFRO0FBQUEsWUFDUixVQUFVLEVBQUUsTUFBTSxzQ0FBYSxPQUFPLEtBQUssT0FBTyxLQUFLLEVBQUUsSUFBSSw0RUFBZ0IsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUU7QUFBQSxVQUNwRztBQUFBLFFBQ0YsRUFBRTtBQUNGO0FBQUEsTUFDRjtBQUNBLGlCQUFXLENBQUMsY0FBYyxFQUFFLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUF1QyxFQUFFO0FBQUEsSUFDOUYsU0FBUyxPQUFnQjtBQUN2QixtQkFBYSxpQkFBaUIsUUFBUSxNQUFNLFVBQVUsT0FBTyxLQUFLLENBQUM7QUFBQSxJQUNyRSxVQUFFO0FBQ0EsdUJBQWlCLEtBQUs7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLGFBQWEsT0FBTyxRQUFRLFVBQXlCO0FBQ3pELFFBQUksZ0JBQWdCLFdBQVcsRUFBRztBQUNsQyxxQkFBaUIsSUFBSTtBQUNyQixRQUFJO0FBQ0YsWUFBTSxFQUFFLElBQUksS0FBSyxJQUFJLE1BQU0sS0FBSyxxQ0FBcUMsRUFBRSxNQUFNLGlCQUFpQixNQUFNLENBQUM7QUFDckcsZ0JBQVUsS0FBTSxPQUF5QyxJQUFJO0FBQUEsSUFDL0QsVUFBRTtBQUNBLHVCQUFpQixLQUFLO0FBQUEsSUFDeEI7QUFBQSxFQUNGO0FBRUEsUUFBTSxjQUFjLE9BQU8sUUFBUSxVQUF5QjtBQUMxRCxRQUFJLGdCQUFnQixXQUFXLEVBQUc7QUFDbEMscUJBQWlCLElBQUk7QUFDckIsUUFBSTtBQUNGLGlCQUFXLFVBQVUsaUJBQWlCO0FBQ3BDLGNBQU0sRUFBRSxJQUFJLEtBQUssSUFBSSxNQUFNLEtBQUssK0JBQStCLEVBQUUsS0FBSyxRQUFRLE1BQU0sQ0FBQztBQUNyRixjQUFNLFVBQVU7QUFDaEIsbUJBQVcsQ0FBQyxjQUFjO0FBQUEsVUFDeEIsR0FBRztBQUFBLFVBQ0gsQ0FBQyxNQUFNLEdBQUcsS0FBSyxVQUFVO0FBQUEsWUFDdkIsYUFBYTtBQUFBLFlBQ2IsUUFBUTtBQUFBLFlBQ1IsU0FBUyxtQ0FBVSxPQUFPLFFBQVEsT0FBTyxLQUFLLEVBQUUsSUFBSTtBQUFBLFlBQ3BELFdBQVcsQ0FBQztBQUFBLFlBQ1osUUFBUTtBQUFBLFVBQ1Y7QUFBQSxRQUNGLEVBQUU7QUFBQSxNQUNKO0FBQUEsSUFDRixVQUFFO0FBQ0EsdUJBQWlCLEtBQUs7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLGVBQWUsT0FBTyxLQUFhLFNBQWdDO0FBQ3ZFLFVBQU0sTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJO0FBQzFCLFFBQUksVUFBVSxHQUFHLE1BQU0sUUFBVztBQUNoQyxtQkFBYSxDQUFDLGFBQWE7QUFDekIsY0FBTSxPQUFPLEVBQUUsR0FBRyxTQUFTO0FBQzNCLGVBQU8sS0FBSyxHQUFHO0FBQ2YsZUFBTztBQUFBLE1BQ1QsQ0FBQztBQUNEO0FBQUEsSUFDRjtBQUNBLFVBQU0sRUFBRSxLQUFLLElBQUksTUFBTSxLQUFLLGtDQUFrQyxFQUFFLEtBQUssS0FBSyxDQUFDO0FBQzNFLGlCQUFhLENBQUMsY0FBYyxFQUFFLEdBQUcsVUFBVSxDQUFDLEdBQUcsR0FBRyxPQUFPLEtBQUssT0FBTyxLQUFLLEVBQUUsRUFBRSxFQUFFO0FBQUEsRUFDbEY7QUFFQSxRQUFNLGFBQWEsWUFBMkI7QUFDNUMsUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLE1BQU0sMkNBQTJDLG1CQUFtQixNQUFNLGFBQWEsRUFBRSxDQUFDO0FBQ2pILFlBQU0sT0FBZ0IsTUFBTSxTQUFTLEtBQUs7QUFDMUMsVUFBSSxTQUFTLEdBQUksZUFBZSxLQUFrQyxVQUFVLENBQUMsQ0FBQztBQUFBLElBQ2hGLFFBQVE7QUFBQSxJQUVSO0FBQUEsRUFDRjtBQU1BLFFBQU0sZUFBZSxPQUFPLFdBQWtDO0FBQzVELHVCQUFtQixNQUFNO0FBQ3pCLFFBQUk7QUFDRixZQUFNLEVBQUUsSUFBSSxLQUFLLElBQUksTUFBTSxLQUFLLHNDQUFzQyxFQUFFLE9BQU8sQ0FBQztBQUNoRixVQUFJLENBQUMsSUFBSTtBQUNQLHdCQUFnQixZQUFPLE9BQU8sS0FBSyxPQUFPLEtBQUssT0FBTyxDQUFDO0FBQ3ZEO0FBQUEsTUFDRjtBQUNBLFlBQU0sV0FBWSxLQUFLLFVBQVUsS0FBOEIsQ0FBQztBQUNoRSxZQUFNLFlBQWEsS0FBSyxXQUFXLEtBQThELENBQUM7QUFDbEcsWUFBTSxZQUFhLEtBQUssV0FBVyxLQUFnRSxDQUFDO0FBQ3BHLFlBQU0sVUFBVSxPQUFPLEtBQUssU0FBUyxLQUFLLEVBQUU7QUFDNUMsWUFBTSxRQUFRO0FBQUEsUUFDWixvREFBWSxTQUFTLE1BQU0sa0NBQVcsVUFBVSxNQUFNLGtDQUFXLFVBQVUsTUFBTTtBQUFBLFFBQ2pGLEdBQUksU0FBUyxTQUFTLElBQUksQ0FBQyxrQ0FBUyxTQUFTLEtBQUssUUFBRyxDQUFDLEVBQUUsSUFBSSxDQUFDO0FBQUEsUUFDN0QsR0FBSSxVQUFVLFNBQVMsSUFBSSxVQUFVLElBQUksQ0FBQyxTQUFTLGtDQUFTLEtBQUssS0FBSyxpQkFBTyxLQUFLLE1BQU0sRUFBRSxJQUFJLENBQUM7QUFBQSxRQUMvRixHQUFJLFVBQVUsU0FBUyxJQUFJLFVBQVUsSUFBSSxDQUFDLFNBQVMsbUNBQVUsS0FBSyxRQUFRLEtBQUssS0FBSyxLQUFLLEVBQUUsSUFBSSxDQUFDO0FBQUEsUUFDaEcsR0FBSSxZQUFZLEtBQUssQ0FBQyxJQUFJLENBQUMsMkJBQU8sT0FBTyxFQUFFO0FBQUEsTUFDN0M7QUFDQSxzQkFBZ0IsTUFBTSxLQUFLLElBQUksQ0FBQztBQUNoQyxZQUFNLFdBQVc7QUFBQSxJQUNuQixTQUFTLE9BQWdCO0FBQ3ZCLHNCQUFnQixhQUFRLGlCQUFpQixRQUFRLE1BQU0sVUFBVSxPQUFPLEtBQUssRUFBRTtBQUFBLElBQ2pGLFVBQUU7QUFDQSx5QkFBbUIsSUFBSTtBQUFBLElBQ3pCO0FBQUEsRUFDRjtBQUVBLFFBQU0sVUFBVSxZQUEyQjtBQUN6QyxRQUFJLFVBQVUsS0FBSyxNQUFNLE1BQU0sWUFBWSxLQUFLLE1BQU0sR0FBSTtBQUMxRCxVQUFNLEVBQUUsR0FBRyxJQUFJLE1BQU0sS0FBSyw4QkFBOEI7QUFBQSxNQUN0RCxPQUFPLFVBQVUsS0FBSztBQUFBLE1BQ3RCLFNBQVMsWUFBWSxLQUFLO0FBQUEsTUFDMUIsTUFBTTtBQUFBLE1BQ04sS0FBSyxnQkFBZ0IsV0FBVyxJQUFJLFNBQVksZ0JBQWdCLENBQUM7QUFBQSxJQUNuRSxDQUFDO0FBQ0QsUUFBSSxJQUFJO0FBQ04sbUJBQWEsRUFBRTtBQUNmLHFCQUFlLEVBQUU7QUFDakIsa0JBQVksRUFBRTtBQUNkLFlBQU0sVUFBVTtBQUFBLElBQ2xCO0FBQUEsRUFDRjtBQUVBLFFBQU0sYUFBYSxPQUFPLE9BQThCO0FBQ3RELFVBQU0sS0FBSyxxQ0FBcUMsRUFBRSxHQUFHLENBQUM7QUFDdEQsUUFBSSxnQkFBZ0IsUUFBUSxZQUFZLE9BQU8sR0FBSSxnQkFBZSxJQUFJO0FBQ3RFLFVBQU0sVUFBVTtBQUFBLEVBQ2xCO0FBRUEsUUFBTSxlQUFlLFlBQTJCO0FBQzlDLFFBQUksZ0JBQWdCLEtBQU07QUFDMUIsVUFBTSxLQUFLLHFDQUFxQyxFQUFFLElBQUksWUFBWSxJQUFJLE9BQU8sWUFBWSxPQUFPLFNBQVMsWUFBWSxTQUFTLE1BQU0sWUFBWSxLQUFLLENBQUM7QUFDdEosbUJBQWUsSUFBSTtBQUNuQixVQUFNLFVBQVU7QUFBQSxFQUNsQjtBQUdBLFFBQU0sZ0JBQWdCLE9BQU8sU0FBbUM7QUFDOUQsVUFBTSxLQUFLLHFDQUFxQyxFQUFFLElBQUksS0FBSyxJQUFJLFFBQVEsS0FBSyxXQUFXLEtBQUssQ0FBQztBQUM3RixVQUFNLFVBQVU7QUFBQSxFQUNsQjtBQUdBLFFBQU0sY0FBYyxZQUEyQjtBQUM3QyxxQkFBaUIsSUFBSTtBQUNyQixRQUFJO0FBQ0YsWUFBTSxFQUFFLElBQUksS0FBSyxJQUFJLE1BQU0sS0FBSyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQzNFLFVBQUksQ0FBQyxJQUFJO0FBQ1Asd0JBQWdCLFlBQU8sT0FBTyxLQUFLLE9BQU8sS0FBSyxPQUFPLENBQUM7QUFDdkQ7QUFBQSxNQUNGO0FBQ0Esc0JBQWdCLEtBQUssU0FBUyxNQUFNLE9BQ2hDLDRQQUNBLCtEQUFhO0FBQ2pCLFlBQU0sVUFBVTtBQUFBLElBQ2xCLFNBQVMsT0FBZ0I7QUFDdkIsc0JBQWdCLGFBQVEsaUJBQWlCLFFBQVEsTUFBTSxVQUFVLE9BQU8sS0FBSyxFQUFFO0FBQUEsSUFDakYsVUFBRTtBQUNBLHVCQUFpQixLQUFLO0FBQUEsSUFDeEI7QUFBQSxFQUNGO0FBR0EsUUFBTSxXQUFXLFlBQTJCO0FBQzFDLFFBQUksVUFBVSxLQUFLLE1BQU0sTUFBTSxTQUFTLEtBQUssTUFBTSxHQUFJO0FBQ3ZELFlBQVEsVUFBVTtBQUNsQixvQkFBZ0IsSUFBSTtBQUNwQixRQUFJO0FBQ0YsWUFBTSxFQUFFLElBQUksS0FBSyxJQUFJLE1BQU0sS0FBSyxtQ0FBbUMsRUFBRSxPQUFPLFVBQVUsS0FBSyxHQUFHLGFBQWEsU0FBUyxLQUFLLEVBQUUsQ0FBQztBQUM1SCxVQUFJLENBQUMsSUFBSTtBQUNQLHdCQUFnQixZQUFPLE9BQU8sS0FBSyxPQUFPLEtBQUssT0FBTyxDQUFDO0FBQ3ZEO0FBQUEsTUFDRjtBQUNBLFVBQUksS0FBSyxhQUFhLE1BQU0sTUFBTTtBQUNoQyx3QkFBZ0IsZ0RBQWEsT0FBTyxLQUFLLE9BQU8sS0FBSyxFQUFFLENBQUM7QUFDeEQscUJBQWEsRUFBRTtBQUNmLG9CQUFZLEVBQUU7QUFDZCxjQUFNLGFBQWE7QUFDbkI7QUFBQSxNQUNGO0FBQ0EsWUFBTSxRQUFTLEtBQUssT0FBTyxLQUFvRCxDQUFDO0FBQ2hGLHFCQUFlO0FBQUEsUUFDYixVQUFVLE9BQU8sS0FBSyxVQUFVLEtBQUssRUFBRTtBQUFBLFFBQ3ZDLE9BQU8sTUFBTSxJQUFJLENBQUMsVUFBVTtBQUFBLFVBQzFCLElBQUksT0FBTyxLQUFLLElBQUksS0FBSyxFQUFFO0FBQUEsVUFDM0IsT0FBTyxPQUFPLEtBQUssT0FBTyxLQUFLLEVBQUU7QUFBQSxVQUNqQyxhQUFhLE9BQU8sS0FBSyxhQUFhLEtBQUssRUFBRTtBQUFBLFVBQzdDLGFBQWMsS0FBSyxhQUFhLEtBQThCLENBQUM7QUFBQSxVQUMvRCxNQUFNLE9BQU8sS0FBSyxNQUFNLEtBQUssUUFBUTtBQUFBLFVBQ3JDLFlBQVksT0FBTyxLQUFLLFlBQVksS0FBSyxFQUFFO0FBQUEsVUFDM0MsZUFBZSxPQUFPLEtBQUssZUFBZSxLQUFLLGdCQUFnQjtBQUFBLFVBQy9ELFNBQVMsS0FBSyxTQUFTLE1BQU07QUFBQSxVQUM3QixlQUFlO0FBQUEsVUFDZixTQUFTO0FBQUEsUUFDWCxFQUFFO0FBQUEsTUFDSixDQUFDO0FBQ0QsVUFBSSxhQUFhLFdBQVcsS0FBSyxlQUFlLEtBQU0sTUFBSyxnQkFBZ0I7QUFDM0Usc0JBQWdCLCtHQUFxQjtBQUNyQyxtQkFBYSxFQUFFO0FBQ2Ysa0JBQVksRUFBRTtBQUFBLElBQ2hCLFNBQVMsT0FBZ0I7QUFDdkIsc0JBQWdCLGFBQVEsaUJBQWlCLFFBQVEsTUFBTSxVQUFVLE9BQU8sS0FBSyxFQUFFO0FBQUEsSUFDakYsVUFBRTtBQUNBLGNBQVEsSUFBSTtBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBR0EsUUFBTSxhQUFhLE9BQU8sY0FBc0M7QUFDOUQsUUFBSSxnQkFBZ0IsS0FBTTtBQUMxQixnQkFBWSxJQUFJO0FBQ2hCLFFBQUk7QUFDRixVQUFJLFdBQVcsWUFBWTtBQUMzQixVQUFJLFdBQVc7QUFDYixjQUFNLEVBQUUsSUFBQUMsS0FBSSxNQUFBQyxNQUFLLElBQUksTUFBTSxLQUFLLHlDQUF5QyxFQUFFLFVBQVUsT0FBTyxZQUFZLE1BQU0sQ0FBQztBQUMvRyxZQUFJLENBQUNELEtBQUk7QUFDUCwwQkFBZ0IsWUFBTyxPQUFPQyxNQUFLLE9BQU8sS0FBSyxPQUFPLENBQUM7QUFDdkQ7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUNBLFlBQU0sRUFBRSxJQUFJLEtBQUssSUFBSSxNQUFNLEtBQUssb0NBQW9DLEVBQUUsU0FBUyxDQUFDO0FBQ2hGLFVBQUksQ0FBQyxJQUFJO0FBQ1Asd0JBQWdCLFlBQU8sT0FBTyxLQUFLLE9BQU8sS0FBSyxPQUFPLENBQUM7QUFDdkQ7QUFBQSxNQUNGO0FBQ0Esc0JBQWdCLGdEQUFhLE9BQU8sS0FBSyxPQUFPLEtBQUssRUFBRSxDQUFDO0FBQ3hELHFCQUFlLElBQUk7QUFDbkIsWUFBTSxhQUFhO0FBQUEsSUFDckIsU0FBUyxPQUFnQjtBQUN2QixzQkFBZ0IsYUFBUSxpQkFBaUIsUUFBUSxNQUFNLFVBQVUsT0FBTyxLQUFLLEVBQUU7QUFBQSxJQUNqRixVQUFFO0FBQ0Esa0JBQVksS0FBSztBQUFBLElBQ25CO0FBQUEsRUFDRjtBQUdBLFFBQU0sZ0JBQWdCLE9BQU8sT0FBOEI7QUFDekQsUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLE1BQU0seUNBQXlDLG1CQUFtQixFQUFFLENBQUM7QUFDNUYsWUFBTSxPQUFnQixNQUFNLFNBQVMsS0FBSztBQUMxQyxVQUFJLFNBQVMsR0FBSSxjQUFhLElBQWlCO0FBQUEsSUFDakQsUUFBUTtBQUNOLG1CQUFhLElBQUk7QUFBQSxJQUNuQjtBQUFBLEVBQ0Y7QUFHQSxRQUFNLFlBQVksT0FBTyxPQUFlLFdBQXVEO0FBQzdGLFVBQU0sRUFBRSxJQUFJLEtBQUssSUFBSSxNQUFNLEtBQUssb0NBQW9DLEVBQUUsT0FBTyxPQUFPLENBQUM7QUFDckYsUUFBSSxJQUFJO0FBQ04sc0JBQWdCLGdEQUFhLFNBQVMsUUFBRztBQUN6QyxZQUFNLGFBQWE7QUFDbkIsWUFBTSxjQUFjLEtBQUs7QUFBQSxJQUMzQixPQUFPO0FBQ0wsc0JBQWdCLFlBQU8sT0FBTyxLQUFLLE9BQU8sS0FBSyxPQUFPLENBQUM7QUFBQSxJQUN6RDtBQUFBLEVBQ0Y7QUFHQSxRQUFNLGdCQUFnQixZQUEyQjtBQUMvQyxRQUFJO0FBQ0YsWUFBTSxXQUFXLE1BQU0sTUFBTSw4Q0FBOEMsbUJBQW1CLE1BQU0sYUFBYSxFQUFFLENBQUM7QUFDcEgsWUFBTSxPQUFnQixNQUFNLFNBQVMsS0FBSztBQUMxQyxVQUFJLFNBQVMsR0FBSSxrQkFBa0IsS0FBeUMsU0FBUyxDQUFDLENBQUM7QUFBQSxJQUN6RixRQUFRO0FBQUEsSUFFUjtBQUFBLEVBQ0Y7QUFHQSxRQUFNLGVBQWUsWUFBMkI7QUFDOUMsVUFBTSxrQkFBa0IsT0FBTyxhQUFhO0FBQzVDLFFBQUksVUFBVSxLQUFLLE1BQU0sTUFBTSxDQUFDLE9BQU8sU0FBUyxlQUFlLEtBQUssa0JBQWtCLEdBQUc7QUFDdkYsc0JBQWdCLHlHQUFvQjtBQUNwQztBQUFBLElBQ0Y7QUFDQSxVQUFNLEVBQUUsSUFBSSxLQUFLLElBQUksTUFBTSxLQUFLLGtDQUFrQztBQUFBLE1BQ2hFLE1BQU0sVUFBVSxLQUFLO0FBQUEsTUFBRyxNQUFNO0FBQUEsTUFBVztBQUFBLE1BQ3pDLE9BQU8sV0FBVyxLQUFLLEtBQUs7QUFBQSxNQUFXLGFBQWEsVUFBVSxLQUFLLEtBQUs7QUFBQSxJQUMxRSxDQUFDO0FBQ0QsUUFBSSxJQUFJO0FBQ04sbUJBQWEsRUFBRTtBQUFHLG9CQUFjLEVBQUU7QUFBRyxtQkFBYSxFQUFFO0FBQ3BELHNCQUFnQixtREFBVztBQUMzQixZQUFNLGNBQWM7QUFBQSxJQUN0QixPQUFPO0FBQ0wsc0JBQWdCLFlBQU8sT0FBTyxLQUFLLE9BQU8sS0FBSyxPQUFPLENBQUM7QUFBQSxJQUN6RDtBQUFBLEVBQ0Y7QUFFQSxRQUFNLGtCQUFrQixPQUFPLE1BQWMsU0FBaUQ7QUFDNUYsVUFBTSxFQUFFLElBQUksS0FBSyxJQUFJLE1BQU0sS0FBSyxvQ0FBb0MsTUFBTSxJQUFJO0FBQzlFLFFBQUksR0FBSSxPQUFNLGNBQWM7QUFBQSxRQUN2QixpQkFBZ0IsWUFBTyxPQUFPLEtBQUssT0FBTyxLQUFLLE9BQU8sQ0FBQztBQUFBLEVBQzlEO0FBR0EsUUFBTSxlQUFlLFlBQTJCO0FBQzlDLFFBQUk7QUFDRixZQUFNLFdBQVcsTUFBTSxNQUFNLDZDQUE2QyxtQkFBbUIsTUFBTSxhQUFhLEVBQUUsQ0FBQztBQUNuSCxZQUFNLE9BQWdCLE1BQU0sU0FBUyxLQUFLO0FBQzFDLFVBQUksU0FBUyxHQUFJLGlCQUFnQixJQUF1QjtBQUFBLElBQzFELFFBQVE7QUFBQSxJQUVSO0FBQUEsRUFDRjtBQUdBLFFBQU0sZUFBZSxZQUEyQjtBQUM5QyxxQkFBaUIsSUFBSTtBQUNyQixRQUFJO0FBQ0YsWUFBTSxFQUFFLElBQUksS0FBSyxJQUFJLE1BQU0sS0FBSyxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ3RFLFVBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxNQUFNLFFBQVc7QUFDdEMsc0JBQWMsRUFBRSxJQUFJLE9BQU8sT0FBTyxPQUFPLEtBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQztBQUN6RDtBQUFBLE1BQ0Y7QUFDQSxvQkFBYyxJQUFrQjtBQUNoQyxZQUFNLGFBQWE7QUFBQSxJQUNyQixTQUFTLE9BQWdCO0FBQ3ZCLG9CQUFjLEVBQUUsSUFBSSxPQUFPLE9BQU8saUJBQWlCLFFBQVEsTUFBTSxVQUFVLE9BQU8sS0FBSyxFQUFFLENBQUM7QUFBQSxJQUM1RixVQUFFO0FBQ0EsdUJBQWlCLEtBQUs7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFHQSxRQUFNLFlBQVksT0FBTyxLQUFlLFdBQW9EO0FBQzFGLFVBQU0sS0FBSywwQ0FBMEMsRUFBRSxLQUFLLE9BQU8sQ0FBQztBQUNwRSxrQkFBYyxDQUFDLGFBQWEsYUFBYSxPQUFPLE9BQU8sRUFBRSxHQUFHLFVBQVUsaUJBQWlCLFNBQVMsa0JBQWtCLENBQUMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksU0FBUyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDeEssVUFBTSxhQUFhO0FBQUEsRUFDckI7QUFHQSxRQUFNLGVBQWUsT0FBTyxNQUFjLFNBQWlEO0FBQ3pGLFVBQU0sRUFBRSxJQUFJLEtBQUssSUFBSSxNQUFNLEtBQUssaUNBQWlDLE1BQU0sSUFBSTtBQUMzRSxRQUFJLEdBQUksT0FBTSxhQUFhO0FBQUEsUUFDdEIsaUJBQWdCLFlBQU8sT0FBTyxLQUFLLE9BQU8sS0FBSyxPQUFPLENBQUM7QUFBQSxFQUM5RDtBQUdBLFFBQU0sZUFBZSxPQUFPLFdBQXVDO0FBQ2pFLFVBQU0sRUFBRSxHQUFHLElBQUksTUFBTSxLQUFLLDhCQUE4QjtBQUFBLE1BQ3RELE9BQU8sT0FBTztBQUFBLE1BQ2QsU0FBUyxPQUFPLFdBQVcsT0FBTyxhQUFhLE9BQU87QUFBQSxtREFBYyxPQUFPLFNBQVMsTUFBTSxHQUFHLENBQUMsQ0FBQyxXQUFNO0FBQUEsTUFDckcsTUFBTSxtQkFBUyxPQUFPO0FBQUEsSUFDeEIsQ0FBQztBQUNELFFBQUksR0FBSSxpQkFBZ0IseURBQVk7QUFBQSxFQUN0QztBQU1BLFFBQU0sYUFBYyxNQUErRDtBQUNuRiwrQkFBVSxNQUFNO0FBQ2Qsd0JBQW9CO0FBQ3BCLFVBQU0sUUFBUSxZQUFZLE1BQU07QUFDOUIsVUFBSSxTQUFTLGVBQWUsZ0JBQWdCLE1BQU0sS0FBTSxxQkFBb0I7QUFDNUUsWUFBTSxPQUFPLFNBQVMsY0FBYyx5QkFBeUI7QUFDN0QsWUFBTSxRQUFRLE9BQU8sS0FBSyxNQUFNLEtBQUssc0JBQXNCLEVBQUUsS0FBSyxJQUFJO0FBQ3RFLFVBQUksVUFBVSxNQUFNLFFBQVEsR0FBSSxhQUFZLGNBQWM7QUFBQSxJQUM1RCxHQUFHLEdBQUc7QUFDTixXQUFPLE1BQU07QUFBRSxvQkFBYyxLQUFLO0FBQUEsSUFBRTtBQUFBLEVBQ3RDLEdBQUcsQ0FBQyxNQUFNLFdBQVcsVUFBVSxDQUFDO0FBR2hDLFFBQU0sbUJBQW1CLENBQUMsV0FBeUI7QUFDakQsVUFBTSxVQUFVLFNBQVMsY0FBYywwQkFBMEI7QUFDakUsVUFBTSxXQUFXLFVBQVUsS0FBSyxJQUFJLElBQUksS0FBSyxNQUFNLFFBQVEsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLElBQUk7QUFDN0YsYUFBUyxjQUFjLHFEQUFxRCxHQUN4RSxNQUFNLFlBQVkseUJBQXlCLFdBQVcsdUJBQXVCLFNBQVMsTUFBTSxXQUFXO0FBQUEsRUFDN0c7QUFPQSwrQkFBVSxNQUFNO0FBQ2QsVUFBTSxRQUFRLE9BQU8sYUFBYSxRQUFRLGNBQWMsS0FBSyxFQUFFO0FBQy9ELFVBQU1DLFNBQVEsTUFBWTtBQUN4QixZQUFNQyxTQUFRLFNBQVMsY0FBYyxxREFBcUQ7QUFJMUYsVUFBSUEsV0FBVSxRQUFRQSxPQUFNLE1BQU0sb0JBQW9CLHVCQUF1QixNQUFNLFlBQWE7QUFDaEcsWUFBTSxRQUFRLE9BQU8sU0FBUyxLQUFLLEtBQUssU0FBUyxNQUFNLFFBQVE7QUFDL0QsdUJBQWlCLEtBQUs7QUFBQSxJQUN4QjtBQUNBLElBQUFELE9BQU07QUFDTixVQUFNLFFBQVEsU0FBUyxjQUFjLHFEQUFxRDtBQUMxRixVQUFNLFdBQVcsSUFBSSxpQkFBaUIsTUFBTTtBQUFFLE1BQUFBLE9BQU07QUFBQSxJQUFFLENBQUM7QUFDdkQsUUFBSSxVQUFVLEtBQU0sVUFBUyxRQUFRLE9BQU8sRUFBRSxZQUFZLE1BQU0saUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDNUYsV0FBTyxNQUFNO0FBQUUsZUFBUyxXQUFXO0FBQUEsSUFBRTtBQUFBLEVBQ3ZDLEdBQUcsQ0FBQyxDQUFDO0FBR0wsUUFBTSxnQkFBZ0IsQ0FBQyxNQUFnQztBQUNyRCxNQUFFLGVBQWU7QUFDakIsVUFBTSxTQUFTLENBQUMsT0FBMkI7QUFDekMsWUFBTSxRQUFRLEtBQUssSUFBSSxLQUFLLEtBQUssSUFBSSxLQUFLLE9BQU8sYUFBYSxHQUFHLE9BQU8sQ0FBQztBQUN6RSx1QkFBaUIsS0FBSztBQUN0QixtQkFBYSxRQUFRLGdCQUFnQixPQUFPLEtBQUssQ0FBQztBQUFBLElBQ3BEO0FBQ0EsVUFBTSxPQUFPLE1BQVk7QUFDdkIsYUFBTyxvQkFBb0IsZUFBZSxNQUFNO0FBQ2hELGFBQU8sb0JBQW9CLGFBQWEsSUFBSTtBQUFBLElBQzlDO0FBQ0EsV0FBTyxpQkFBaUIsZUFBZSxNQUFNO0FBQzdDLFdBQU8saUJBQWlCLGFBQWEsSUFBSTtBQUFBLEVBQzNDO0FBRUEsK0JBQVUsTUFBTTtBQUNkLFFBQUksV0FBVztBQUNmLFVBQU0sT0FBTyxZQUEyQjtBQUN0QyxVQUFJO0FBQ0YsY0FBTSxXQUFXLE1BQU0sTUFBTSwwQ0FBMEMsbUJBQW1CLE1BQU0sYUFBYSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsUUFBUSxtQkFBbUIsRUFBRSxDQUFDO0FBQzdKLFlBQUksQ0FBQyxTQUFTLEdBQUksT0FBTSxJQUFJLE1BQU0sUUFBUSxTQUFTLE1BQU0sRUFBRTtBQUMzRCxjQUFNLE9BQWdCLE1BQU0sU0FBUyxLQUFLO0FBQzFDLFlBQUksQ0FBQyxVQUFVO0FBQ2IsbUJBQVMsSUFBc0I7QUFDL0IsdUJBQWEsSUFBSTtBQUFBLFFBQ25CO0FBQUEsTUFDRixTQUFTLE9BQWdCO0FBQ3ZCLFlBQUksQ0FBQyxTQUFVLGNBQWEsaUJBQWlCLFFBQVEsTUFBTSxVQUFVLE9BQU8sS0FBSyxDQUFDO0FBQUEsTUFDcEY7QUFBQSxJQUNGO0FBQ0EsU0FBSyxLQUFLO0FBQ1YsVUFBTSxRQUFRLFlBQVksTUFBTTtBQUFFLFdBQUssS0FBSztBQUFBLElBQUUsR0FBRyxHQUFJO0FBQ3JELFdBQU8sTUFBTTtBQUNYLGlCQUFXO0FBQ1gsb0JBQWMsS0FBSztBQUFBLElBQ3JCO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUdMLCtCQUFVLE1BQU07QUFDZCxRQUFJLFFBQVEsVUFBVyxNQUFLLFlBQVk7QUFDeEMsUUFBSSxRQUFRLFNBQVM7QUFBRSxXQUFLLFVBQVU7QUFBRyxXQUFLLGFBQWE7QUFBQSxJQUFFO0FBQzdELFFBQUksUUFBUSxTQUFVLE1BQUssV0FBVztBQUN0QyxRQUFJLFFBQVEsYUFBYTtBQUFFLFdBQUssY0FBYztBQUFHLFVBQUksY0FBYyxLQUFNLE1BQUssY0FBYyxVQUFVLElBQUksRUFBRTtBQUFBLElBQUU7QUFDOUcsUUFBSSxRQUFRLGNBQWMsZUFBZSxLQUFNLE1BQUssZ0JBQWdCO0FBQUEsRUFDdEUsR0FBRyxDQUFDLEtBQUssTUFBTSxTQUFTLENBQUM7QUFFekIsUUFBTSxrQkFBa0IsWUFBMkI7QUFDakQsUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLE1BQU0sbUNBQW1DO0FBQ2hFLFVBQUksQ0FBQyxTQUFTLEdBQUk7QUFDbEIsWUFBTSxPQUFnQixNQUFNLFNBQVMsS0FBSztBQUMxQyxvQkFBZSxLQUF3RSxTQUFTLENBQUMsQ0FBQztBQUNsRyxzQkFBaUIsS0FBNEUsV0FBVyxDQUFDLENBQUM7QUFBQSxJQUM1RyxRQUFRO0FBQUEsSUFFUjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLGtCQUFrQixZQUEyQjtBQUNqRCxRQUFJLGVBQWUsS0FBTTtBQUN6QixtQkFBZSxJQUFJO0FBQ25CLGtCQUFjLEtBQUs7QUFDbkIsUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLE1BQU0scUNBQXFDO0FBQUEsUUFDaEUsUUFBUTtBQUFBLFFBQ1IsU0FBUyxFQUFFLGdCQUFnQixtQkFBbUI7QUFBQSxRQUM5QyxNQUFNLEtBQUssVUFBVSxFQUFFLE9BQU8sV0FBVyxDQUFDO0FBQUEsTUFDNUMsQ0FBQztBQUNELFVBQUksU0FBUyxJQUFJO0FBQ2Ysc0JBQWMsSUFBSTtBQUNsQixtQkFBVyxNQUFNO0FBQUUsd0JBQWMsS0FBSztBQUFBLFFBQUUsR0FBRyxJQUFJO0FBQUEsTUFDakQ7QUFBQSxJQUNGLFVBQUU7QUFDQSxxQkFBZSxLQUFLO0FBQUEsSUFDdEI7QUFBQSxFQUNGO0FBRUEsUUFBTSxlQUFlLFlBQTJCO0FBQzlDLFVBQU0sWUFBWSxNQUFNLE1BQU0sMENBQTBDLG1CQUFtQixNQUFNLGFBQWEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFFBQVEsbUJBQW1CLEVBQUUsQ0FBQztBQUM5SixRQUFJLFVBQVUsR0FBSSxVQUFTLE1BQU0sVUFBVSxLQUFLLENBQW1CO0FBQUEsRUFDckU7QUFHQSxRQUFNLFlBQVksT0FBT0osT0FBYyxNQUFjLFNBQWlEO0FBQ3BHLFlBQVFBLEtBQUk7QUFDWixvQkFBZ0IsSUFBSTtBQUNwQixRQUFJO0FBQ0YsWUFBTSxFQUFFLElBQUksS0FBSyxJQUFJLE1BQU0sS0FBSyxNQUFNLElBQUk7QUFDMUMsVUFBSSxDQUFDLElBQUk7QUFDUCx3QkFBZ0IsVUFBSyxPQUFPLEtBQUssT0FBTyxLQUFLLE9BQU8sQ0FBQyxFQUFFO0FBQ3ZEO0FBQUEsTUFDRjtBQUNBLHNCQUFnQixtQkFBbUIsSUFBSSxDQUFDO0FBQ3hDLFlBQU0sYUFBYTtBQUFBLElBQ3JCLFNBQVMsT0FBZ0I7QUFDdkIsc0JBQWdCLFVBQUssaUJBQWlCLFFBQVEsTUFBTSxVQUFVLE9BQU8sS0FBSyxDQUFDLEVBQUU7QUFBQSxJQUMvRSxVQUFFO0FBQ0EsY0FBUSxJQUFJO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFFQSxRQUFNLGVBQWUsWUFBMkI7QUFDOUMscUJBQWlCLElBQUk7QUFDckIsUUFBSTtBQUNGLFlBQU0sRUFBRSxJQUFJLEtBQUssSUFBSSxNQUFNLEtBQUssa0NBQWtDLENBQUMsQ0FBQztBQUNwRSxVQUFJLENBQUMsSUFBSTtBQUNQLHFCQUFhLE9BQU8sS0FBSyxPQUFPLEtBQUssT0FBTyxDQUFDO0FBQzdDO0FBQUEsTUFDRjtBQUNBLFlBQU0sYUFBYTtBQUFBLElBQ3JCLFNBQVMsT0FBZ0I7QUFDdkIsbUJBQWEsaUJBQWlCLFFBQVEsTUFBTSxVQUFVLE9BQU8sS0FBSyxDQUFDO0FBQUEsSUFDckUsVUFBRTtBQUNBLHVCQUFpQixLQUFLO0FBQUEsSUFDeEI7QUFBQSxFQUNGO0FBRUEsUUFBTSxnQkFBZ0IsT0FBTyxhQUFvQztBQUMvRCxVQUFNLEVBQUUsR0FBRyxJQUFJLE1BQU0sS0FBSyx1Q0FBdUMsRUFBRSxTQUFTLENBQUM7QUFDN0UsUUFBSSxJQUFJO0FBQ04sZUFBUyxDQUFDLGFBQWEsYUFBYSxPQUFPLFdBQVc7QUFBQSxRQUNwRCxHQUFHO0FBQUEsUUFDSCxVQUFVLFNBQVMsVUFBVSxJQUFJLENBQUMsV0FBVyxPQUFPLE9BQU8sV0FBVyxFQUFFLEdBQUcsUUFBUSxrQkFBa0IsTUFBTSxZQUFZLE9BQU8sSUFBSSxNQUFNO0FBQUEsTUFDMUksQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBRUEsUUFBTSxVQUFVLE9BQU8sV0FBVztBQUNsQyxRQUFNLFlBQVksT0FBTyxhQUFhO0FBQ3RDLFFBQU0sVUFBVSxPQUFPLFdBQVcsQ0FBQztBQUNuQyxRQUFNLE9BQU8sT0FBTyxRQUFRLENBQUM7QUFDN0IsUUFBTSxnQkFBZ0IsT0FBTyxpQkFBaUIsQ0FBQztBQUMvQyxRQUFNLFlBQVksT0FBTyxhQUFhLENBQUM7QUFDdkMsUUFBTSxXQUFXLE9BQU8sWUFBWSxDQUFDO0FBRXJDLFFBQU0sT0FBOEM7QUFBQSxJQUNsRCxFQUFFLEtBQUssV0FBVyxPQUFPLEVBQUUsYUFBYSxFQUFFO0FBQUEsSUFDMUMsRUFBRSxLQUFLLFlBQVksT0FBTyxFQUFFLGNBQWMsRUFBRTtBQUFBLElBQzVDLEVBQUUsS0FBSyxhQUFhLE9BQU8sRUFBRSxlQUFlLEVBQUU7QUFBQSxJQUM5QyxFQUFFLEtBQUssVUFBVSxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQUEsSUFDeEMsRUFBRSxLQUFLLFNBQVMsT0FBTyxFQUFFLFdBQVcsRUFBRTtBQUFBLElBQ3RDLEVBQUUsS0FBSyxZQUFZLE9BQU8sRUFBRSxjQUFjLEVBQUU7QUFBQSxFQUM5QztBQUdBLFFBQU0sY0FBYyxpQkFBaUIsT0FDakMsY0FBQUMsUUFBTTtBQUFBLElBQWM7QUFBQSxJQUFNLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRTtBQUFBLElBQ25ELGNBQUFBLFFBQU0sY0FBYyxPQUFPLEVBQUUsT0FBTyxPQUFPLE9BQU8sR0FBRyxZQUFZO0FBQUEsRUFBQyxJQUNwRTtBQUdKLFFBQU0sYUFBK0UsQ0FBQztBQUN0RixNQUFJLGdCQUFnQixNQUFNO0FBQ3hCLFFBQUksQ0FBQyxZQUFZLFFBQVEsU0FBUztBQUNoQyxpQkFBVyxLQUFLO0FBQUEsUUFDZCxLQUFLO0FBQUEsUUFDTCxPQUFPLFVBQUssRUFBRSxjQUFjLENBQUMsU0FBSSxZQUFZLFFBQVEsU0FBUztBQUFBLFFBQzlELE1BQU0sWUFBWSxRQUFRLE1BQU0sTUFBTSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxLQUFLLEtBQUssTUFBTSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsS0FBSyxJQUFJO0FBQUEsUUFDL0YsS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUFBLElBQ0g7QUFDQSxlQUFXLFVBQVUsWUFBWSxTQUFTO0FBQ3hDLFlBQU0sT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDLEtBQUssU0FBUyxNQUFNLEtBQUssTUFBTSxDQUFDO0FBQ2xFLFlBQU0sT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDLEtBQUssU0FBUyxNQUFNLEtBQUssTUFBTSxDQUFDO0FBQ2xFLGlCQUFXLEtBQUs7QUFBQSxRQUNkLEtBQUssT0FBTztBQUFBLFFBQ1osT0FBTyxPQUFPO0FBQUEsUUFDZCxNQUFNLEdBQUcsT0FBTyxTQUFTLFNBQU0sT0FBTyxNQUFNLFNBQU0sSUFBSSxLQUFLLE9BQU8sSUFBSSxFQUFFLGVBQWUsQ0FBQyxVQUFPLElBQUksS0FBSyxJQUFJO0FBQUEsUUFDNUcsS0FBSyxPQUFPO0FBQUEsTUFDZCxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDQSxRQUFNLGFBQWEsQ0FBQyxRQUF3QjtBQUMxQyxRQUFJLFFBQVEsVUFBVyxRQUFPLEVBQUUsY0FBYztBQUM5QyxVQUFNLFNBQVMsV0FBVyxLQUFLLENBQUMsVUFBVSxNQUFNLFFBQVEsR0FBRztBQUMzRCxXQUFPLEdBQUksUUFBUSxLQUFLLE1BQU0sUUFBSyxFQUFFLENBQUMsS0FBTSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLFNBQVMsRUFBRSxHQUFHLEtBQUs7QUFBQSxFQUM1RjtBQUNBLFFBQU0sa0JBQWtCLGFBQWEsS0FBSyxNQUFNLEtBQzVDLGFBQ0EsV0FBVyxPQUFPLENBQUMsV0FBVyxNQUFNLFFBQVEsTUFBTSxNQUFNLFlBQVksRUFBRSxTQUFTLGFBQWEsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBRXJILFFBQU0sa0JBQWtCLGVBQWUsV0FBVyxPQUFPLFlBQWEsV0FBVyxPQUFPLFNBQVMsS0FBSyxTQUFVO0FBRWhILFFBQU0sYUFDSiw0RUFFRTtBQUFBLGdEQUFDLFFBQ0MsdURBQUMsU0FBSSxPQUFPLEVBQUUsU0FBUyxRQUFRLFlBQVksVUFBVSxLQUFLLE9BQU8sVUFBVSxPQUFPLEdBQ2hGO0FBQUEsa0RBQUMsVUFBSyxPQUFPLE9BQU8sTUFBTSxTQUFTLEdBQUksdUJBQWEsVUFBVSxVQUFJO0FBQUEsTUFDbEUsNENBQUMsVUFBSyxPQUFPLEVBQUUsVUFBVSxPQUFPLEdBQUksdUJBQWEsWUFBWSxTQUFTLFlBQVksVUFBSTtBQUFBLE1BQ3RGLDRDQUFDLFVBQUssT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHO0FBQUEsTUFDMUIsNENBQUMsWUFBTyxPQUFPLE9BQU8sV0FBVyxTQUFTLE1BQU07QUFBRSxhQUFLLFlBQVk7QUFBQSxNQUFFLEdBQUksWUFBRSxnQkFBZ0IsR0FBRTtBQUFBLE1BQzdGO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFPLE9BQU87QUFBQSxVQUNkLFVBQVUsU0FBUztBQUFBLFVBQ25CLFNBQVMsTUFBTTtBQUFFLGlCQUFLLFVBQVUsZUFBZSxrQ0FBa0MsRUFBRSxnQkFBZ0IsTUFBTSxXQUFXLE1BQU0sWUFBWSxHQUFHLENBQUM7QUFBQSxVQUFFO0FBQUEsVUFDNUksbUJBQVMsZ0JBQWdCLEVBQUUsZ0JBQWdCLElBQUksRUFBRSxrQkFBa0I7QUFBQTtBQUFBLE1BQUU7QUFBQSxPQUN6RSxHQUNGO0FBQUEsSUFFQSw2Q0FBQyxRQUFLLE9BQU8sRUFBRSxjQUFjLEdBQzNCO0FBQUEsbURBQUMsU0FBSSxPQUFPLEVBQUUsVUFBVSxXQUFXLEdBQ2pDO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE9BQU8sRUFBRSxHQUFHLE9BQU8sV0FBVyxPQUFPLFFBQVEsV0FBVyxRQUFRLFNBQVMsUUFBUSxnQkFBZ0IsaUJBQWlCLFlBQVksY0FBYyxZQUFZLFNBQVM7QUFBQSxZQUNqSyxTQUFTLE1BQU07QUFBRSw0QkFBYyxDQUFDLFVBQVU7QUFBQSxZQUFFO0FBQUEsWUFFNUM7QUFBQSwwREFBQyxVQUFLLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FDeEIsMEJBQWdCLFdBQVcsSUFDeEIsRUFBRSxvQkFBb0IsSUFDdEIsR0FBRyxFQUFFLGlCQUFpQixDQUFDLElBQUksZ0JBQWdCLE1BQU0sU0FBSSxnQkFBZ0IsSUFBSSxVQUFVLEVBQUUsS0FBSyxRQUFHLENBQUMsSUFDcEc7QUFBQSxjQUNBLDRDQUFDLFVBQUssT0FBTyxFQUFFLFlBQVksT0FBTyxZQUFZLEVBQUUsR0FBRyxvQkFBQztBQUFBO0FBQUE7QUFBQSxRQUN0RDtBQUFBLFFBQ0MsY0FDQyw0RUFDRTtBQUFBLHNEQUFDLFNBQUksT0FBTyxFQUFFLFVBQVUsU0FBUyxPQUFPLEdBQUcsUUFBUSxHQUFHLEdBQUcsU0FBUyxNQUFNO0FBQUUsMEJBQWMsS0FBSztBQUFBLFVBQUUsR0FBRztBQUFBLFVBQ2xHLDZDQUFDLFNBQUksT0FBTztBQUFBLFlBQ1YsVUFBVTtBQUFBLFlBQVksS0FBSztBQUFBLFlBQW9CLE1BQU07QUFBQSxZQUFHLE9BQU87QUFBQSxZQUFHLFFBQVE7QUFBQSxZQUMxRSxZQUFZO0FBQUEsWUFBa0MsUUFBUTtBQUFBLFlBQ3RELGNBQWM7QUFBQSxZQUFPLFdBQVc7QUFBQSxZQUErQixVQUFVO0FBQUEsVUFDM0UsR0FDRTtBQUFBLHlEQUFDLFNBQUksT0FBTyxFQUFFLFNBQVMsT0FBTyxjQUFjLDBEQUEwRCxTQUFTLFFBQVEsS0FBSyxNQUFNLEdBQ2hJO0FBQUE7QUFBQSxnQkFBQztBQUFBO0FBQUEsa0JBQ0MsT0FBTyxPQUFPO0FBQUEsa0JBQ2QsYUFBYSxFQUFFLGVBQWU7QUFBQSxrQkFDOUIsT0FBTztBQUFBLGtCQUNQLFVBQVUsQ0FBQyxNQUFNO0FBQUUsb0NBQWdCLEVBQUUsT0FBTyxLQUFLO0FBQUEsa0JBQUU7QUFBQTtBQUFBLGNBQ3JEO0FBQUEsY0FDQSw0Q0FBQyxZQUFPLE9BQU8sT0FBTyxXQUFXLFNBQVMsTUFBTTtBQUFFLG1DQUFtQixDQUFDLENBQUM7QUFBQSxjQUFFLEdBQUksWUFBRSxjQUFjLEdBQUU7QUFBQSxlQUNqRztBQUFBLFlBQ0EsNkNBQUMsU0FBSSxPQUFPLEVBQUUsV0FBVyxLQUFLLFdBQVcsT0FBTyxHQUM3QztBQUFBLHlCQUFXLElBQUksQ0FBQyxVQUNmO0FBQUEsZ0JBQUM7QUFBQTtBQUFBLGtCQUVDLE9BQU87QUFBQSxvQkFDTCxTQUFTO0FBQUEsb0JBQVksUUFBUTtBQUFBLG9CQUFXLFNBQVM7QUFBQSxvQkFBUSxLQUFLO0FBQUEsb0JBQU8sWUFBWTtBQUFBLG9CQUNqRixZQUFZLGdCQUFnQixTQUFTLE1BQU0sR0FBRyxJQUFJLHlCQUF5QjtBQUFBLGtCQUM3RTtBQUFBLGtCQUNBLFNBQVMsTUFBTTtBQUFFLHlCQUFLLGFBQWEsTUFBTSxHQUFHO0FBQUEsa0JBQUU7QUFBQSxrQkFFOUM7QUFBQSxnRUFBQyxVQUFLLE9BQU8sRUFBRSxPQUFPLFFBQVEsT0FBTywyQ0FBMkMsWUFBWSxJQUFJLEdBQzdGLDBCQUFnQixTQUFTLE1BQU0sR0FBRyxJQUFJLFdBQU0sSUFDL0M7QUFBQSxvQkFDQSw2Q0FBQyxVQUFLLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FDekI7QUFBQSxrRUFBQyxVQUFLLE9BQU8sRUFBRSxTQUFTLFNBQVMsVUFBVSxRQUFRLFlBQVksS0FBSyxVQUFVLFVBQVUsY0FBYyxZQUFZLFlBQVksU0FBUyxHQUFJLGdCQUFNLE9BQU07QUFBQSxzQkFDdkosNENBQUMsVUFBSyxPQUFPLEVBQUUsU0FBUyxTQUFTLFVBQVUsUUFBUSxPQUFPLDRDQUE0QyxHQUFJLGdCQUFNLE1BQUs7QUFBQSx1QkFDdkg7QUFBQTtBQUFBO0FBQUEsZ0JBYkssTUFBTTtBQUFBLGNBY2IsQ0FDRDtBQUFBLGNBQ0EsZ0JBQWdCLFdBQVcsS0FBSyw0Q0FBQyxTQUFJLE9BQU8sT0FBTyxPQUFRLFlBQUUsZ0JBQWdCLEdBQUU7QUFBQSxlQUNsRjtBQUFBLGFBQ0Y7QUFBQSxXQUNGO0FBQUEsU0FFSjtBQUFBLE1BQ0EsNkNBQUMsU0FBSSxPQUFPLEVBQUUsU0FBUyxRQUFRLEtBQUssT0FBTyxVQUFVLFFBQVEsV0FBVyxPQUFPLFlBQVksU0FBUyxHQUNsRztBQUFBLG9EQUFDLFVBQUssT0FBTyxFQUFFLFVBQVUsUUFBUSxPQUFPLDRDQUE0QyxHQUFJLFlBQUUsYUFBYSxHQUFFO0FBQUEsUUFDeEcsaUJBQWlCLDRDQUFDLFVBQUssT0FBTyxPQUFPLE1BQU0sU0FBUyxHQUFJLFlBQUUsa0JBQWtCLEdBQUU7QUFBQSxTQUNqRjtBQUFBLE9BQ0Y7QUFBQSxJQUVDLGlCQUFpQixRQUFRLDRDQUFDLFFBQUssdURBQUMsU0FBSSxPQUFPLE9BQU8sT0FBUTtBQUFBLFFBQUUsaUJBQWlCO0FBQUEsTUFBRTtBQUFBLE1BQUc7QUFBQSxPQUFhLEdBQU07QUFBQSxJQUNyRyxnQkFBZ0IsV0FBVyxLQUFLLDRDQUFDLFFBQUssc0RBQUMsU0FBSSxPQUFPLE9BQU8sT0FBUSxZQUFFLGFBQWEsR0FBRSxHQUFNO0FBQUEsSUFHeEYsZ0JBQWdCLElBQUksQ0FBQyxXQUFXO0FBQy9CLFlBQU0sSUFBSSxRQUFRLE1BQU07QUFDeEIsWUFBTSxRQUFRLFdBQVcsWUFBWSxFQUFFLGNBQWMsSUFBSyxHQUFHLFFBQVEsV0FBVyxPQUFPLE1BQU0sR0FBRyxDQUFDO0FBQ2pHLGFBQ0UsNkNBQUMsUUFBeUIsT0FBTyxhQUFNLEtBQUssR0FBRyxXQUFXLFlBQVksU0FBSSxPQUFPLE1BQU0sR0FBRyxDQUFDLENBQUMsV0FBTSxFQUFFLElBQ2pHO0FBQUEsY0FBTSxVQUNMLDZDQUFDLFNBQUksT0FBTyxFQUFFLFNBQVMsUUFBUSxLQUFLLE9BQU8sWUFBWSxVQUFVLGNBQWMsTUFBTSxHQUNsRjtBQUFBLFlBQUUsbUJBQW1CLFFBQ3BCLDZDQUFDLFVBQUssT0FBTyxPQUFPLE1BQU0sU0FBUyxHQUFJO0FBQUEsY0FBRSxXQUFXO0FBQUEsWUFBRyxFQUFFLHNCQUFzQixXQUFRLElBQUksS0FBSyxFQUFFLG1CQUFtQixFQUFFLGVBQWUsSUFBSTtBQUFBLGFBQUc7QUFBQSxVQUUvSSw0Q0FBQyxZQUFPLE9BQU8sRUFBRSxHQUFHLE9BQU8sV0FBVyxTQUFTLFdBQVcsVUFBVSxPQUFPLEdBQUcsU0FBUyxNQUFNO0FBQUUsaUJBQUssV0FBVyxRQUFRLElBQUk7QUFBQSxVQUFFLEdBQUksWUFBRSxrQkFBa0IsR0FBRTtBQUFBLFVBQ3ZKLDRDQUFDLFVBQUssT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHO0FBQUEsVUFDMUI7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLE9BQU8sRUFBRSxHQUFHLE9BQU8sV0FBVyxTQUFTLFdBQVcsVUFBVSxPQUFPO0FBQUEsY0FDbkUsT0FBTyxFQUFFLHFCQUFxQjtBQUFBLGNBQzlCLFNBQVMsTUFBTTtBQUNiLHNCQUFNLE1BQU0sV0FBVyxZQUFZLFlBQVk7QUFDL0MscUJBQUssS0FBSyw4QkFBOEI7QUFBQSxrQkFDdEMsT0FBTyxHQUFHLEVBQUUsc0JBQXNCLENBQUMsVUFBSyxFQUFFLFFBQVEsV0FBVyxRQUFRLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFBQSxrQkFDakYsU0FBUyxDQUFDO0FBQUEsRUFBVyxFQUFFLFNBQVMsSUFBSSxJQUFJO0FBQUEsRUFBVyxFQUFFLFNBQVMsS0FBSyxJQUFJO0FBQUEsRUFBVSxFQUFFLFNBQVMsSUFBSSxFQUFFLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLFNBQVMsVUFBSyxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQUEsa0JBQ3pKO0FBQUEsa0JBQUssTUFBTTtBQUFBLGdCQUNiLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxHQUFHLE1BQU07QUFBRSxrQ0FBZ0IsS0FBSywwRkFBb0IsaUNBQVE7QUFBSSxzQkFBSSxHQUFJLE1BQUssVUFBVTtBQUFBLGdCQUFFLENBQUM7QUFBQSxjQUN2RztBQUFBLGNBQ0Q7QUFBQTtBQUFBLGdCQUFJLEVBQUUsaUJBQWlCO0FBQUE7QUFBQTtBQUFBLFVBQUU7QUFBQSxVQUMxQjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsT0FBTyxFQUFFLEdBQUcsT0FBTyxXQUFXLFNBQVMsV0FBVyxVQUFVLE9BQU87QUFBQSxjQUNuRSxPQUFPLEVBQUUsdUJBQXVCO0FBQUEsY0FDaEMsU0FBUyxNQUFNO0FBQ2Isc0JBQU0sTUFBTSxXQUFXLFlBQVksU0FBWTtBQUMvQyxxQkFBSyxLQUFLLCtCQUErQjtBQUFBLGtCQUN2QyxZQUFZO0FBQUEsa0JBQWdCLFdBQVc7QUFBQSxrQkFBVSxVQUFVO0FBQUEsa0JBQzNELE9BQU8sa0NBQVMsRUFBRSxRQUFRLFdBQVcsUUFBUSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQUEsa0JBQ3pELFNBQVMsQ0FBQyxFQUFFLFNBQVMsTUFBTSxFQUFFLFNBQVMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxTQUFTLFNBQVMsRUFBRSxFQUFFLEtBQUssU0FBUztBQUFBLGdCQUMxRixDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNO0FBQUUsa0NBQWdCLEtBQUssMEZBQW9CLGlDQUFRO0FBQUcsc0JBQUksR0FBSSxNQUFLLGFBQWE7QUFBQSxnQkFBRSxDQUFDO0FBQUEsY0FDekc7QUFBQSxjQUNEO0FBQUE7QUFBQSxnQkFBSSxFQUFFLG1CQUFtQjtBQUFBO0FBQUE7QUFBQSxVQUFFO0FBQUEsV0FDOUI7QUFBQSxRQUVELE1BQU0sU0FDTCw0Q0FBQyxTQUFJLE9BQU8sT0FBTyxPQUFRLFlBQUUsa0JBQWtCLEdBQUUsSUFFakQsNEVBQ0c7QUFBQSxZQUFFLFdBQVcsUUFBUSw2Q0FBQyxTQUFJLE9BQU8sT0FBTyxZQUFhO0FBQUEsY0FBRSxPQUFPO0FBQUEsWUFBTztBQUFBLFlBQUksSUFBSSxLQUFLLEVBQUUsT0FBTyxJQUFJLEVBQUUsZUFBZTtBQUFBLFlBQUU7QUFBQSxZQUFJLEVBQUUsTUFBTTtBQUFBLFlBQU87QUFBQSxZQUFFLEVBQUUsY0FBYztBQUFBLFlBQUU7QUFBQSxZQUFLLEVBQUU7QUFBQSxZQUFXO0FBQUEsWUFBRyxFQUFFO0FBQUEsYUFBVTtBQUFBLFVBQzFMLEVBQUUsU0FBUyxTQUFTLE1BQ25CLDRFQUNFO0FBQUEsd0RBQUMsU0FBSSxPQUFPLEVBQUUsR0FBRyxPQUFPLGNBQWMsV0FBVyxNQUFNLEdBQUksWUFBRSxhQUFhLEdBQUU7QUFBQSxZQUM1RSw0Q0FBQyxTQUFJLE9BQU8sT0FBTyxNQUFPLFlBQUUsU0FBUyxNQUFLO0FBQUEsYUFDNUM7QUFBQSxVQUVELEVBQUUsU0FBUyxNQUFNLFNBQVMsS0FDekIsNEVBQ0U7QUFBQSx3REFBQyxTQUFJLE9BQU8sT0FBTyxjQUFlLFlBQUUsY0FBYyxHQUFFO0FBQUEsWUFDbkQsRUFBRSxTQUFTLE1BQU0sSUFBSSxDQUFDLE1BQU0sTUFDM0IsNkNBQUMsU0FBWSxPQUFPLE9BQU8sV0FDekI7QUFBQSwyREFBQyxVQUFLLE9BQU8sRUFBRSxPQUFPLDJDQUEyQyxZQUFZLElBQUksR0FBSTtBQUFBLG9CQUFJO0FBQUEsZ0JBQUU7QUFBQSxpQkFBQztBQUFBLGNBQVE7QUFBQSxpQkFENUYsQ0FFVixDQUNEO0FBQUEsYUFDSDtBQUFBLFVBRUQsRUFBRSxTQUFTLE1BQU0sU0FBUyxLQUN6Qiw0RUFDRTtBQUFBLHdEQUFDLFNBQUksT0FBTyxFQUFFLEdBQUcsT0FBTyxjQUFjLFdBQVcsTUFBTSxHQUFJLFlBQUUsYUFBYSxHQUFFO0FBQUEsWUFDM0UsRUFBRSxTQUFTLE1BQU0sSUFBSSxDQUFDLE1BQU0sTUFBTSw2Q0FBQyxTQUFZLE9BQU8sT0FBTyxVQUFVO0FBQUE7QUFBQSxjQUFHO0FBQUEsaUJBQTlCLENBQW1DLENBQU07QUFBQSxhQUN4RjtBQUFBLFVBR0YsNENBQUMsU0FBSSxPQUFPLEVBQUUsR0FBRyxPQUFPLGNBQWMsV0FBVyxPQUFPLEdBQUksWUFBRSxjQUFjLEdBQUU7QUFBQSxVQUM5RSw0Q0FBQyxXQUFNLE9BQU8sT0FBTyxPQUNuQixzREFBQyxXQUNFLFlBQUUsTUFBTSxJQUFJLENBQUMsU0FBUztBQUNyQixrQkFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLEtBQUssSUFBSTtBQUNsQyxrQkFBTSxRQUFRLFVBQVUsR0FBRztBQUMzQixtQkFDRSw0RUFDRTtBQUFBLDJEQUFDLFFBQ0M7QUFBQSw0REFBQyxRQUFHLE9BQU8sRUFBRSxHQUFHLE9BQU8sSUFBSSxZQUFZLGFBQWEsVUFBVSxRQUFRLFdBQVcsWUFBWSxHQUFJLGVBQUssTUFBSztBQUFBLGdCQUMzRyw2Q0FBQyxRQUFHLE9BQU8sRUFBRSxHQUFHLE9BQU8sSUFBSSxPQUFPLFdBQVcsWUFBWSxTQUFTLEdBQUc7QUFBQTtBQUFBLGtCQUFFLEtBQUs7QUFBQSxtQkFBSztBQUFBLGdCQUNqRiw2Q0FBQyxRQUFHLE9BQU8sRUFBRSxHQUFHLE9BQU8sSUFBSSxPQUFPLFdBQVcsWUFBWSxTQUFTLEdBQUc7QUFBQTtBQUFBLGtCQUFFLEtBQUs7QUFBQSxtQkFBSztBQUFBLGdCQUNqRiw0Q0FBQyxRQUFHLE9BQU8sRUFBRSxHQUFHLE9BQU8sSUFBSSxZQUFZLFNBQVMsR0FDOUMsc0RBQUMsWUFBTyxPQUFPLE9BQU8sV0FBVyxTQUFTLE1BQU07QUFBRSx1QkFBSyxhQUFhLFFBQVEsS0FBSyxJQUFJO0FBQUEsZ0JBQUUsR0FDcEYsb0JBQVUsU0FBWSxFQUFFLFdBQVcsSUFBSSxFQUFFLFdBQVcsR0FDdkQsR0FDRjtBQUFBLG1CQVJPLEdBU1Q7QUFBQSxjQUNDLFVBQVUsVUFDVCw0Q0FBQyxRQUNDLHNEQUFDLFFBQUcsU0FBUyxHQUFHLE9BQU8sRUFBRSxHQUFHLE9BQU8sSUFBSSxTQUFTLEVBQUUsR0FDaEQsc0RBQUMsWUFBUyxPQUFjLEdBQzFCLEtBSE8sR0FBRyxHQUFHLE9BSWY7QUFBQSxlQUVKO0FBQUEsVUFFSixDQUFDLEdBQ0gsR0FDRjtBQUFBLFdBQ0Y7QUFBQSxXQTVGTyxLQUFLLE1BQU0sRUE4RnRCO0FBQUEsSUFFSixDQUFDO0FBQUEsSUFHQSxnQkFBZ0IsU0FBUyxLQUN4Qiw2Q0FBQyxRQUFLLE9BQU8sRUFBRSxlQUFlLEdBQzVCO0FBQUEsa0RBQUMsWUFBTyxPQUFPLE9BQU8sUUFBUSxVQUFVLGVBQWUsU0FBUyxNQUFNO0FBQUUsYUFBSyxXQUFXO0FBQUEsTUFBRSxHQUN2RiwwQkFBZ0IsRUFBRSxzQkFBc0IsSUFBSSxFQUFFLGVBQWUsR0FDaEU7QUFBQSxNQUNDLFdBQVcsUUFBUSxPQUFPLHVCQUF1QixRQUNoRCw2Q0FBQyxVQUFLLE9BQU8sRUFBRSxHQUFHLE9BQU8sTUFBTSxTQUFTLEdBQUcsWUFBWSxNQUFNLEdBQzFEO0FBQUEsVUFBRSxXQUFXO0FBQUEsUUFBRyxPQUFPLGNBQWMsV0FBUSxJQUFJLEtBQUssT0FBTyxXQUFXLEVBQUUsZUFBZSxJQUFJO0FBQUEsU0FDaEc7QUFBQSxNQUVELFdBQVcsUUFDViw0Q0FBQyxZQUFPLE9BQU8sRUFBRSxHQUFHLE9BQU8sV0FBVyxZQUFZLE9BQU8sU0FBUyxXQUFXLFVBQVUsT0FBTyxHQUFHLFVBQVUsZUFBZSxTQUFTLE1BQU07QUFBRSxhQUFLLFdBQVcsSUFBSTtBQUFBLE1BQUUsR0FDOUosWUFBRSxrQkFBa0IsR0FDdkI7QUFBQSxNQUVELFdBQVcsUUFDViw0RUFDRTtBQUFBLHFEQUFDLFNBQUksT0FBTyxFQUFFLFNBQVMsUUFBUSxZQUFZLFVBQVUsS0FBSyxRQUFRLFFBQVEsY0FBYyxVQUFVLE9BQU8sR0FDdkc7QUFBQSx1REFBQyxVQUFLLE9BQU8sRUFBRSxHQUFHLE9BQU8sTUFBTSxlQUFlLEdBQUcsVUFBVSxRQUFRLFNBQVMsV0FBVyxHQUNwRjtBQUFBLGNBQUUsYUFBYTtBQUFBLFlBQUU7QUFBQSxZQUFHLE9BQU87QUFBQSxZQUFVO0FBQUEsWUFBRSxPQUFPO0FBQUEsWUFBVTtBQUFBLGFBQzNEO0FBQUEsVUFDQyxPQUFPLG9CQUFvQixVQUFhLE9BQU8sZ0JBQWdCLFNBQVMsS0FDdkUsNkNBQUMsVUFBSyxPQUFPLEVBQUUsVUFBVSxRQUFRLE9BQU8sVUFBVSxHQUFHO0FBQUE7QUFBQSxZQUFHLEVBQUUsa0JBQWtCO0FBQUEsWUFBRTtBQUFBLFlBQUcsT0FBTyxnQkFBZ0IsSUFBSSxDQUFDLFNBQVMsS0FBSyxNQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxLQUFLLFFBQUc7QUFBQSxhQUFFO0FBQUEsV0FFM0o7QUFBQSxRQUNDLE9BQU8sZ0JBQWdCLFVBQWEsT0FBTyxZQUFZLFNBQVMsS0FDL0QsNEVBQ0U7QUFBQSxzREFBQyxTQUFJLE9BQU8sT0FBTyxjQUFlLFlBQUUsZ0JBQWdCLEdBQUU7QUFBQSxVQUN0RCw0Q0FBQyxTQUFJLE9BQU8sRUFBRSxTQUFTLFFBQVEsZUFBZSxVQUFVLEtBQUssT0FBTyxjQUFjLE9BQU8sR0FDdEYsaUJBQU8sWUFBWSxJQUFJLENBQUMsUUFBUSxNQUMvQiw2Q0FBQyxTQUFZLE9BQU8sRUFBRSxTQUFTLFFBQVEsZ0JBQWdCLGlCQUFpQixVQUFVLFFBQVEsU0FBUyxXQUFXLFlBQVksd0NBQXdDLGNBQWMsTUFBTSxHQUNwTDtBQUFBLHdEQUFDLFVBQU0saUJBQU8sTUFBSztBQUFBLFlBQ25CLDZDQUFDLFVBQUssT0FBTyxFQUFFLE9BQU8saUJBQWlCLFlBQVksSUFBSSxHQUFHO0FBQUE7QUFBQSxjQUFFLE9BQU87QUFBQSxlQUFPO0FBQUEsZUFGbEUsQ0FHVixDQUNELEdBQ0g7QUFBQSxXQUNGO0FBQUEsUUFFRiw0Q0FBQyxlQUFZLE1BQU0sUUFBUSxHQUFNO0FBQUEsUUFDaEMsT0FBTyxPQUFPLFdBQVcsS0FBSyw0Q0FBQyxTQUFJLE9BQU8sT0FBTyxPQUFRLFlBQUUsYUFBYSxHQUFFO0FBQUEsUUFFMUUsT0FBTyxtQkFBbUIsVUFBYSxPQUFPLGVBQWUsU0FBUyxLQUNyRSw0RUFDRTtBQUFBLHNEQUFDLFNBQUksT0FBTyxFQUFFLEdBQUcsT0FBTyxjQUFjLFdBQVcsT0FBTyxHQUFJLFlBQUUsa0JBQWtCLEdBQUU7QUFBQSxVQUNsRiw0Q0FBQyxTQUFJLE9BQU8sRUFBRSxTQUFTLFFBQVEsZUFBZSxVQUFVLEtBQUssTUFBTSxHQUNoRSxpQkFBTyxlQUFlLElBQUksQ0FBQyxVQUMxQiw2Q0FBQyxTQUF1QixPQUFPLEVBQUUsUUFBUSwwREFBMEQsY0FBYyxPQUFPLFNBQVMsWUFBWSxZQUFZLGlDQUFpQyxHQUN4TDtBQUFBLHlEQUFDLFNBQUksT0FBTyxFQUFFLFVBQVUsT0FBTyxHQUM3QjtBQUFBLDBEQUFDLFVBQUssT0FBTyxPQUFPLE1BQU0sU0FBUyxHQUFJLGdCQUFNLFFBQU87QUFBQSxjQUNwRCw0Q0FBQyxVQUFLLE9BQU8sRUFBRSxHQUFHLE9BQU8sT0FBTyxZQUFZLE1BQU0sR0FBSSxnQkFBTSxXQUFVO0FBQUEsZUFDeEU7QUFBQSxZQUNDLE1BQU0sU0FBUyxVQUFhLE1BQU0sU0FBUyxNQUMxQyw2Q0FBQyxTQUFJLE9BQU8sRUFBRSxHQUFHLE9BQU8sTUFBTSxXQUFXLE1BQU0sR0FDN0M7QUFBQSwwREFBQyxVQUFLLE9BQU8sRUFBRSxHQUFHLE9BQU8sY0FBYyxTQUFTLFVBQVUsaUJBQWlCLE9BQU8sT0FBTywwQ0FBMEMsR0FBSSxZQUFFLGlCQUFpQixHQUFFO0FBQUEsY0FDM0osTUFBTTtBQUFBLGVBQ1Q7QUFBQSxZQUVELE1BQU0sV0FBVyxVQUFhLE1BQU0sV0FBVyxNQUM5Qyw2Q0FBQyxTQUFJLE9BQU8sRUFBRSxHQUFHLE9BQU8sS0FBSyxHQUMzQjtBQUFBLDBEQUFDLFVBQUssT0FBTyxFQUFFLEdBQUcsT0FBTyxjQUFjLFNBQVMsVUFBVSxpQkFBaUIsT0FBTyxPQUFPLFVBQVUsR0FBSSxZQUFFLG1CQUFtQixHQUFFO0FBQUEsY0FDN0gsTUFBTTtBQUFBLGVBQ1Q7QUFBQSxZQUVELE1BQU0sV0FBVyxVQUFhLE1BQU0sV0FBVyxNQUM5Qyw2Q0FBQyxTQUFJLE9BQU8sRUFBRSxHQUFHLE9BQU8sTUFBTSxjQUFjLE1BQU0sR0FDaEQ7QUFBQSwwREFBQyxVQUFLLE9BQU8sRUFBRSxHQUFHLE9BQU8sY0FBYyxTQUFTLFVBQVUsaUJBQWlCLE9BQU8sT0FBTyxlQUFlLFNBQVMsRUFBRSxHQUFJLFlBQUUsb0JBQW9CLEdBQUU7QUFBQSxjQUM5SSxNQUFNO0FBQUEsZUFDVDtBQUFBLFlBRUQsTUFBTSxRQUFRLElBQUksQ0FBQyxRQUFRLE1BQzFCLDZDQUFDLFNBQVksT0FBTyxFQUFFLEdBQUcsT0FBTyxXQUFXLFdBQVcsTUFBTSxHQUMxRDtBQUFBLDBEQUFDLFVBQUssT0FBTyxFQUFFLE9BQU8sVUFBVSxHQUFHLG9CQUFDO0FBQUEsY0FDcEMsNkNBQUMsVUFBSyxPQUFPLEVBQUUsWUFBWSxhQUFhLFVBQVUsUUFBUSxXQUFXLFlBQVksR0FDOUU7QUFBQSx1QkFBTztBQUFBLGdCQUFLO0FBQUEsZ0JBQUUsT0FBTztBQUFBLGlCQUN4QjtBQUFBLGNBQ0EsNkNBQUMsVUFBSyxPQUFPLEVBQUUsVUFBVSxRQUFRLE9BQU8sNENBQTRDLEdBQUc7QUFBQTtBQUFBLGdCQUFHLE9BQU8sUUFBUSxNQUFNLEdBQUcsRUFBRTtBQUFBLGlCQUFFO0FBQUEsaUJBTDlHLENBTVYsQ0FDRDtBQUFBLGVBL0JPLE1BQU0sTUFnQ2hCLENBQ0QsR0FDSDtBQUFBLFdBQ0Y7QUFBQSxRQUVELE9BQU8sbUJBQW1CLFVBQWEsT0FBTyxlQUFlLFdBQVcsS0FDdkUsNENBQUMsU0FBSSxPQUFPLE9BQU8sT0FBUSxZQUFFLHNCQUFzQixHQUFFO0FBQUEsUUFFdEQsT0FBTyxhQUFhLFVBQWEsT0FBTyxTQUFTLFNBQVMsS0FDekQsNkNBQUMsU0FBSSxPQUFPLEVBQUUsV0FBVyxRQUFRLFNBQVMsWUFBWSxRQUFRLG1DQUFtQyxjQUFjLE1BQU0sR0FDbkg7QUFBQSxzREFBQyxTQUFJLE9BQU8sRUFBRSxHQUFHLE9BQU8sY0FBYyxPQUFPLDBDQUEwQyxHQUFJLFlBQUUsZUFBZSxHQUFFO0FBQUEsVUFDOUcsNENBQUMsU0FBSSxPQUFPLEVBQUUsU0FBUyxRQUFRLFVBQVUsUUFBUSxLQUFLLE1BQU0sR0FDekQsaUJBQU8sU0FBUyxJQUFJLENBQUMsUUFBUSxNQUM1Qiw0Q0FBQyxVQUFhLE9BQU8sT0FBTyxNQUFNLFNBQVMsR0FBSSxpQkFBTyxTQUEzQyxDQUFpRCxDQUM3RCxHQUNIO0FBQUEsV0FDRjtBQUFBLFNBRUo7QUFBQSxPQUVKO0FBQUEsSUFJRCxnQkFBZ0IsU0FBUyxLQUN4Qiw2Q0FBQyxRQUFLLE9BQU8sRUFBRSxtQkFBbUIsR0FDaEM7QUFBQSxrREFBQyxZQUFPLE9BQU8sT0FBTyxRQUFRLFVBQVUsZUFBZSxTQUFTLE1BQU07QUFBRSxhQUFLLFlBQVk7QUFBQSxNQUFFLEdBQ3hGLDBCQUFnQixFQUFFLDBCQUEwQixJQUFJLEVBQUUsbUJBQW1CLEdBQ3hFO0FBQUEsTUFDQyxnQkFBZ0IsSUFBSSxDQUFDLFdBQVc7QUFDL0IsY0FBTSxJQUFJLFFBQVEsTUFBTTtBQUN4QixZQUFJLE1BQU0sT0FBVyxRQUFPO0FBQzVCLGNBQU0sUUFBUSxXQUFXLFlBQVksRUFBRSxjQUFjLElBQUksT0FBTyxNQUFNLEdBQUcsQ0FBQztBQUMxRSxlQUNFLDZDQUFDLFNBQXdCLE9BQU8sRUFBRSxXQUFXLE9BQU8sR0FDbEQ7QUFBQSx1REFBQyxTQUFJLE9BQU8sRUFBRSxHQUFHLE9BQU8sY0FBYyxTQUFTLFFBQVEsS0FBSyxPQUFPLFlBQVksU0FBUyxHQUNyRjtBQUFBO0FBQUEsWUFDQSxFQUFFLFdBQVcsUUFDWiw2Q0FBQyxVQUFLLE9BQU8sT0FBTyxNQUFNLFNBQVMsR0FBSTtBQUFBLGdCQUFFLFdBQVc7QUFBQSxjQUFHLEVBQUUsY0FBYyxXQUFRLElBQUksS0FBSyxFQUFFLFdBQVcsRUFBRSxlQUFlLElBQUk7QUFBQSxlQUFHO0FBQUEsWUFFL0gsNENBQUMsWUFBTyxPQUFPLEVBQUUsR0FBRyxPQUFPLFdBQVcsU0FBUyxXQUFXLFVBQVUsT0FBTyxHQUFHLFNBQVMsTUFBTTtBQUFFLG1CQUFLLFlBQVksSUFBSTtBQUFBLFlBQUUsR0FBSSxZQUFFLGtCQUFrQixHQUFFO0FBQUEsYUFDbEo7QUFBQSxVQUNDLEVBQUUsWUFBWSxNQUNiLDRDQUFDLFNBQUksT0FBTyxFQUFFLEdBQUcsT0FBTyxNQUFNLFlBQVksd0JBQXdCLFFBQVEsaUNBQWlDLGNBQWMsT0FBTyxTQUFTLFdBQVcsR0FBSSxZQUFFLFNBQVE7QUFBQSxVQUVuSyxFQUFFLGNBQWMsVUFBYSxFQUFFLFVBQVUsU0FBUyxJQUNqRCw2Q0FBQyxXQUFNLE9BQU8sT0FBTyxPQUNuQjtBQUFBLHdEQUFDLFdBQ0Msc0RBQUMsUUFBSSxXQUFDLHVCQUF1Qix1QkFBdUIsb0JBQW9CLHVCQUF1QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsUUFBUSw0Q0FBQyxRQUFhLE9BQU8sT0FBTyxJQUFLLFlBQUUsR0FBRyxLQUE3QixHQUErQixDQUFLLEdBQUUsR0FDL0s7QUFBQSxZQUNBLDRDQUFDLFdBQ0UsWUFBRSxVQUFVLElBQUksQ0FBQyxPQUFPLE1BQ3ZCLDZDQUFDLFFBQ0M7QUFBQSwwREFBQyxRQUFHLE9BQU8sT0FBTyxJQUFJLHNEQUFDLFVBQUssT0FBTyxPQUFPLE1BQU0sTUFBTSxhQUFhLGFBQWEsWUFBWSxNQUFNLGFBQWEsU0FBUyxZQUFZLE1BQU0sYUFBYSxXQUFXLFlBQVksU0FBUyxHQUFJLGdCQUFNLFVBQVMsR0FBTztBQUFBLGNBQ2pOLDRDQUFDLFFBQUcsT0FBTyxPQUFPLElBQUssZ0JBQU0sVUFBUztBQUFBLGNBQ3RDLDRDQUFDLFFBQUcsT0FBTyxPQUFPLElBQUssZ0JBQU0sT0FBTTtBQUFBLGNBQ25DLDRDQUFDLFFBQUcsT0FBTyxFQUFFLEdBQUcsT0FBTyxJQUFJLFlBQVksYUFBYSxVQUFVLFFBQVEsV0FBVyxZQUFZLEdBQUksZ0JBQU0sVUFBUztBQUFBLGNBQ2hILDRDQUFDLFFBQUcsT0FBTyxPQUFPLElBQUssZ0JBQU0sS0FBSTtBQUFBLGlCQUwxQixDQU1ULENBQ0QsR0FDSDtBQUFBLGFBQ0YsSUFFQSw0Q0FBQyxTQUFJLE9BQU8sT0FBTyxPQUFRLFlBQUUsY0FBYyxHQUFFO0FBQUEsYUE3QnZDLEtBQUssTUFBTSxFQStCckI7QUFBQSxNQUVKLENBQUM7QUFBQSxNQUNBLGlCQUFpQiw0Q0FBQyxTQUFJLE9BQU8sT0FBTyxPQUFRLFlBQUUsMEJBQTBCLEdBQUU7QUFBQSxNQUMxRSxDQUFDLGlCQUFpQixnQkFBZ0IsTUFBTSxDQUFDLFdBQVcsUUFBUSxNQUFNLE1BQU0sTUFBUyxLQUNoRiw0Q0FBQyxTQUFJLE9BQU8sT0FBTyxPQUFRLFlBQUUsYUFBYSxHQUFFO0FBQUEsT0FFaEQ7QUFBQSxLQUVKO0FBSUYsUUFBTSxjQUFnRTtBQUFBLElBQ3BFLEVBQUUsS0FBSyxZQUFZLElBQUksdURBQWUsTUFBTSwrRUFBbUI7QUFBQSxJQUMvRCxFQUFFLEtBQUssYUFBYSxJQUFJLDZEQUFnQixNQUFNLDhFQUFrQjtBQUFBLElBQ2hFLEVBQUUsS0FBSyxRQUFRLElBQUksNEJBQVEsTUFBTSwyRUFBZTtBQUFBLElBQ2hELEVBQUUsS0FBSyxZQUFZLElBQUksZ0JBQU0sTUFBTSxpREFBYztBQUFBLEVBQ25EO0FBRUEsUUFBTSxjQUNKLDRFQUVFO0FBQUEsZ0RBQUMsUUFBSyxPQUFPLEVBQUUsYUFBYSxHQUN6Qix5QkFBZSxPQUNkLDRDQUFDLFNBQUksT0FBTyxPQUFPLE9BQVEsWUFBRSxlQUFlLEdBQUUsSUFFOUMsNEVBQ0c7QUFBQSxrQkFBWSxJQUFJLENBQUMsU0FBUztBQUN6QixjQUFNLFVBQVUsV0FBVyxLQUFLLEdBQUc7QUFDbkMsY0FBTSxRQUFRLFVBQVUsUUFBUSxXQUFXLE1BQU0sUUFBUSxRQUFRO0FBQ2pFLGVBQ0UsNkNBQUMsU0FBbUIsT0FBTyxFQUFFLFNBQVMsUUFBUSxLQUFLLFFBQVEsWUFBWSxVQUFVLGNBQWMsT0FBTyxVQUFVLE9BQU8sR0FDckg7QUFBQSxzREFBQyxVQUFLLE9BQU8sRUFBRSxVQUFVLEtBQUssVUFBVSxRQUFRLFlBQVksSUFBSSxHQUFJLGVBQUssSUFBRztBQUFBLFVBQzVFO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxPQUFPLEVBQUUsR0FBRyxPQUFPLE9BQU8sT0FBTyxJQUFJO0FBQUEsY0FDckM7QUFBQSxjQUNBLFVBQVUsQ0FBQyxNQUFNO0FBQ2Ysc0JBQU0sSUFBSSxFQUFFLE9BQU87QUFDbkIsb0JBQUksTUFBTSxJQUFJO0FBQUUsZ0NBQWMsRUFBRSxHQUFHLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLFVBQVUsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQUc7QUFBQSxnQkFBTztBQUNsRyxzQkFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLElBQUksRUFBRSxNQUFNLEdBQUc7QUFDdkMsc0JBQU0sUUFBUSxLQUFLLEtBQUssR0FBRztBQUMzQiw4QkFBYyxFQUFFLEdBQUcsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsVUFBVSxNQUFNLEVBQUUsQ0FBQztBQUFBLGNBQ2xFO0FBQUEsY0FFQTtBQUFBLDREQUFDLFlBQU8sT0FBTSxJQUFJLFlBQUUsa0JBQWtCLEdBQUU7QUFBQSxnQkFDdkMsYUFBYSxJQUFJLENBQUMsV0FDakIsNkNBQUMsWUFBK0MsT0FBTyxPQUFPLFdBQVcsTUFBTSxPQUFPLElBQ25GO0FBQUEseUJBQU87QUFBQSxrQkFBUztBQUFBLGtCQUFJLE9BQU87QUFBQSxxQkFEakIsT0FBTyxXQUFXLE1BQU0sT0FBTyxFQUU1QyxDQUNEO0FBQUE7QUFBQTtBQUFBLFVBQ0g7QUFBQSxVQUNBLDRDQUFDLFVBQUssT0FBTyxFQUFFLFVBQVUsUUFBUSxPQUFPLDRDQUE0QyxHQUFJLGVBQUssTUFBSztBQUFBLGFBcEIxRixLQUFLLEdBcUJmO0FBQUEsTUFFSixDQUFDO0FBQUEsTUFDRCw2Q0FBQyxTQUFJLE9BQU8sRUFBRSxTQUFTLFFBQVEsS0FBSyxPQUFPLFlBQVksVUFBVSxXQUFXLE1BQU0sR0FDaEY7QUFBQSxvREFBQyxZQUFPLE9BQU8sT0FBTyxRQUFRLFVBQVUsYUFBYSxTQUFTLE1BQU07QUFBRSxlQUFLLGdCQUFnQjtBQUFBLFFBQUUsR0FDMUYsd0JBQWMsRUFBRSxnQkFBZ0IsSUFBSSxFQUFFLFlBQVksR0FDckQ7QUFBQSxRQUNDLGNBQWMsNENBQUMsVUFBSyxPQUFPLE9BQU8sTUFBTSxTQUFTLEdBQUksWUFBRSxhQUFhLEdBQUU7QUFBQSxRQUN2RSw0Q0FBQyxVQUFLLE9BQU8sRUFBRSxVQUFVLFFBQVEsT0FBTyw0Q0FBNEMsR0FBSSxZQUFFLFlBQVksR0FBRTtBQUFBLFNBQzFHO0FBQUEsT0FDRixHQUVKO0FBQUEsSUFDQSw2Q0FBQyxTQUFJLE9BQU8sRUFBRSxXQUFXLFVBQVUsVUFBVSxRQUFRLE9BQU8sNENBQTRDLFNBQVMsUUFBUSxHQUFHO0FBQUE7QUFBQSxNQUNwRyxPQUFPLGlCQUFpQjtBQUFBLE9BQ2hEO0FBQUEsS0FDRjtBQUdGLFFBQU0sY0FDSiw0RUFDRTtBQUFBLGdEQUFDLFFBQ0MsdURBQUMsU0FBSSxPQUFPLEVBQUUsU0FBUyxRQUFRLEtBQUssT0FBTyxVQUFVLE9BQU8sR0FDMUQ7QUFBQSxrREFBQyxZQUFPLE9BQU8sT0FBTyxRQUFRLFVBQVUsZUFBZSxTQUFTLE1BQU07QUFBRSxhQUFLLGFBQWE7QUFBQSxNQUFFLEdBQ3pGLDBCQUFnQixFQUFFLGdCQUFnQixJQUFJLEVBQUUsZUFBZSxHQUMxRDtBQUFBLE1BQ0EsNENBQUMsWUFBTyxPQUFPLE9BQU8sV0FBVyxVQUFVLFNBQVMsTUFBTSxTQUFTLE1BQU07QUFBRSxhQUFLLFVBQVUsV0FBVyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQUEsTUFBRSxHQUN0SSxtQkFBUyxZQUFZLEVBQUUsZ0JBQWdCLElBQUksRUFBRSxnQkFBZ0IsR0FDaEU7QUFBQSxNQUNBLDRDQUFDLFlBQU8sT0FBTyxPQUFPLFdBQVcsVUFBVSxTQUFTLE1BQU0sU0FBUyxNQUFNO0FBQUUsYUFBSyxVQUFVLFVBQVUsK0JBQStCLENBQUMsQ0FBQztBQUFBLE1BQUUsR0FDcEksbUJBQVMsV0FBVyxFQUFFLGdCQUFnQixJQUFJLEVBQUUsZUFBZSxHQUM5RDtBQUFBLE9BQ0YsR0FDRjtBQUFBLElBQ0M7QUFBQSxJQUNBLFlBQVksT0FDWCw2Q0FBQyxRQUNDO0FBQUEsa0RBQUMsU0FBSSxPQUFPLEVBQUUsWUFBWSxLQUFLLFVBQVUsUUFBUSxjQUFjLE1BQU0sR0FBSSxZQUFFLGlCQUFpQixHQUFFO0FBQUEsTUFDOUYsNENBQUMsU0FBSSxPQUFPLE9BQU8sT0FBUSxZQUFFLHFCQUFxQixHQUFFO0FBQUEsT0FDdEQsSUFFQSw2Q0FBQyxRQUFLLE9BQU8sR0FBRyxFQUFFLGVBQWUsQ0FBQyxTQUFJLFFBQVEsSUFBSSxJQUNoRDtBQUFBLGtEQUFDLFNBQUksT0FBTyxPQUFPLEtBQ2pCLHVEQUFDLFVBQUs7QUFBQSxvREFBQyxVQUFLLE9BQU8sT0FBTyxPQUFPLGtCQUFJO0FBQUEsUUFBUSxRQUFRO0FBQUEsU0FBUyxHQUNoRTtBQUFBLE1BQ0MsY0FBYyxRQUNiLDRFQUNFO0FBQUEsb0RBQUMsU0FBSSxPQUFPLE9BQU8sS0FDakIsdURBQUMsVUFBSztBQUFBLHNEQUFDLFVBQUssT0FBTyxPQUFPLE9BQVEsWUFBRSxpQkFBaUIsR0FBRTtBQUFBLFVBQ3BELFVBQVUsVUFBVSxJQUFJLENBQUMsU0FBUyw0Q0FBQyxVQUFnQixPQUFPLE9BQU8sTUFBTSxTQUFTLEdBQUksa0JBQXZDLElBQTRDLENBQU87QUFBQSxXQUNuRyxHQUNGO0FBQUEsUUFDQSw2Q0FBQyxTQUFJLE9BQU8sT0FBTyxLQUNqQjtBQUFBLHVEQUFDLFVBQUs7QUFBQSx3REFBQyxVQUFLLE9BQU8sT0FBTyxPQUFRLFlBQUUsZUFBZSxHQUFFO0FBQUEsWUFBUSxPQUFPLFVBQVUsWUFBWTtBQUFBLGFBQUU7QUFBQSxVQUM1Riw2Q0FBQyxVQUFLO0FBQUEsd0RBQUMsVUFBSyxPQUFPLE9BQU8sT0FBUSxZQUFFLGlCQUFpQixHQUFFO0FBQUEsWUFBUSxPQUFPLFVBQVUsY0FBYyxNQUFNO0FBQUEsYUFBRTtBQUFBLFVBQ3RHLDZDQUFDLFVBQUs7QUFBQSx3REFBQyxVQUFLLE9BQU8sT0FBTyxPQUFRLFlBQUUsZ0JBQWdCLEdBQUU7QUFBQSxZQUFRLE9BQU8sT0FBTyxpQkFBaUIsQ0FBQztBQUFBLGFBQUU7QUFBQSxXQUNsRztBQUFBLFFBQ0EsNENBQUMsU0FBSSxPQUFPLEVBQUUsVUFBVSxRQUFRLE9BQU8sNkNBQTZDLFdBQVcsTUFBTSxHQUFJLG9CQUFVLFNBQVE7QUFBQSxTQUM3SDtBQUFBLE9BRUo7QUFBQSxJQUVGLDZDQUFDLFFBQUssT0FBTyxFQUFFLGlCQUFpQixHQUM5QjtBQUFBLG1EQUFDLFNBQUksT0FBTyxPQUFPLFNBQ2pCO0FBQUEsb0RBQUMsY0FBUyxNQUFNLEdBQUcsT0FBTyxPQUFPLFVBQVUsYUFBYSxFQUFFLGdCQUFnQixHQUFHLE9BQU8sZUFBZSxVQUFVLENBQUMsTUFBTTtBQUFFLDJCQUFpQixFQUFFLE9BQU8sS0FBSztBQUFBLFFBQUUsR0FBRztBQUFBLFFBQzFKLDRDQUFDLFdBQU0sT0FBTyxPQUFPLE9BQU8sYUFBYSxFQUFFLGlCQUFpQixHQUFHLE9BQU8sZ0JBQWdCLFVBQVUsQ0FBQyxNQUFNO0FBQUUsNEJBQWtCLEVBQUUsT0FBTyxLQUFLO0FBQUEsUUFBRSxHQUFHO0FBQUEsUUFDOUk7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE9BQU8sT0FBTztBQUFBLFlBQ2QsVUFBVSxTQUFTLFFBQVEsa0JBQWtCO0FBQUEsWUFDN0MsU0FBUyxNQUFNO0FBQUUsbUJBQUssVUFBVSxnQkFBZ0Isa0NBQWtDLEVBQUUsTUFBTSxjQUFjLE1BQU0sZUFBZSxnQkFBZ0IsZUFBZSxNQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxTQUFTLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLE1BQU07QUFBRSxpQ0FBaUIsRUFBRTtBQUFHLGtDQUFrQixFQUFFO0FBQUEsY0FBRSxDQUFDO0FBQUEsWUFBRTtBQUFBLFlBQy9SLG1CQUFTLGlCQUFpQixFQUFFLGdCQUFnQixJQUFJLEVBQUUsZUFBZTtBQUFBO0FBQUEsUUFBRTtBQUFBLFNBQ3ZFO0FBQUEsTUFDQyxVQUFVLFdBQVcsSUFDcEIsNENBQUMsU0FBSSxPQUFPLE9BQU8sT0FBUSxZQUFFLGdCQUFnQixHQUFFLElBRS9DLDRDQUFDLFdBQU0sT0FBTyxPQUFPLE9BQ25CLHNEQUFDLFdBQ0Usb0JBQVUsSUFBSSxDQUFDLFNBQ2QsNkNBQUMsUUFDQztBQUFBLG9EQUFDLFFBQUcsT0FBTyxPQUFPLElBQUksc0RBQUMsVUFBSyxPQUFPLE9BQU8sTUFBTSxTQUFTLEdBQUksZUFBSyxNQUFLLEdBQU87QUFBQSxRQUM5RSw0Q0FBQyxRQUFHLE9BQU8sT0FBTyxJQUFLLGVBQUssTUFBSztBQUFBLFFBQ2pDLDRDQUFDLFFBQUcsT0FBTyxPQUFPLElBQUssZUFBSyxlQUFlLEtBQUssSUFBSSxLQUFLLFVBQUk7QUFBQSxRQUM3RCw0Q0FBQyxRQUFHLE9BQU8sT0FBTyxJQUNoQjtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsT0FBTyxFQUFFLEdBQUcsT0FBTyxXQUFXLFNBQVMsV0FBVyxVQUFVLE9BQU87QUFBQSxZQUNuRSxTQUFTLE1BQU07QUFBRSxtQkFBSyxVQUFVLG1CQUFtQix5Q0FBeUMsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDO0FBQUEsWUFBRTtBQUFBLFlBQzlHO0FBQUE7QUFBQSxRQUFDLEdBQ0o7QUFBQSxXQVRPLEtBQUssRUFVZCxDQUNELEdBQ0gsR0FDRjtBQUFBLE9BRUo7QUFBQSxJQUNBLDZDQUFDLFFBQUssT0FBTyxFQUFFLHFCQUFxQixHQUNsQztBQUFBLG1EQUFDLFNBQUksT0FBTyxPQUFPLFNBQ2pCO0FBQUEsb0RBQUMsV0FBTSxPQUFPLE9BQU8sT0FBTyxhQUFhLEVBQUUsa0JBQWtCLEdBQUcsT0FBTyxhQUFhLFVBQVUsQ0FBQyxNQUFNO0FBQUUseUJBQWUsRUFBRSxPQUFPLEtBQUs7QUFBQSxRQUFFLEdBQUc7QUFBQSxRQUN6SSw0Q0FBQyxjQUFTLE1BQU0sR0FBRyxPQUFPLE9BQU8sVUFBVSxhQUFhLEVBQUUsaUJBQWlCLEdBQUcsT0FBTyxZQUFZLFVBQVUsQ0FBQyxNQUFNO0FBQUUsd0JBQWMsRUFBRSxPQUFPLEtBQUs7QUFBQSxRQUFFLEdBQUc7QUFBQSxRQUNySjtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsT0FBTyxPQUFPO0FBQUEsWUFDZCxVQUFVLFNBQVMsUUFBUSxnQkFBZ0I7QUFBQSxZQUMzQyxTQUFTLE1BQU07QUFBRSxtQkFBSyxVQUFVLGdCQUFnQixnQ0FBZ0MsRUFBRSxPQUFPLGFBQWEsYUFBYSxXQUFXLENBQUMsRUFBRSxLQUFLLE1BQU07QUFBRSwrQkFBZSxFQUFFO0FBQUcsOEJBQWMsRUFBRTtBQUFBLGNBQUUsQ0FBQztBQUFBLFlBQUU7QUFBQSxZQUN2TCxtQkFBUyxpQkFBaUIsRUFBRSxnQkFBZ0IsSUFBSSxFQUFFLHFCQUFxQjtBQUFBO0FBQUEsUUFBRTtBQUFBLFNBQzdFO0FBQUEsTUFDQyxRQUFRLFdBQVcsSUFDbEIsNENBQUMsU0FBSSxPQUFPLE9BQU8sT0FBUSxZQUFFLGlCQUFpQixHQUFFLElBRWhELDZDQUFDLFdBQU0sT0FBTyxPQUFPLE9BQ25CO0FBQUEsb0RBQUMsV0FDQyxzREFBQyxRQUFJLFdBQUMscUJBQXFCLG9CQUFvQixzQkFBc0IscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFFBQVEsNENBQUMsUUFBYSxPQUFPLE9BQU8sSUFBSyxZQUFFLEdBQUcsS0FBN0IsR0FBK0IsQ0FBSyxHQUFFLEdBQzFKO0FBQUEsUUFDQSw0Q0FBQyxXQUNFLGtCQUFRLElBQUksQ0FBQyxXQUNaLDZDQUFDLFFBQ0M7QUFBQSxzREFBQyxRQUFHLE9BQU8sT0FBTyxJQUFLLGlCQUFPLE9BQU07QUFBQSxVQUNwQyw0Q0FBQyxRQUFHLE9BQU8sT0FBTyxJQUFJLHNEQUFDLFVBQUssT0FBTyxPQUFPLE1BQU0sT0FBTyxXQUFXLGNBQWMsWUFBWSxTQUFTLEdBQUksaUJBQU8sUUFBTyxHQUFPO0FBQUEsVUFDOUgsNENBQUMsUUFBRyxPQUFPLE9BQU8sSUFBSyxxQkFBVyxPQUFPLFNBQVMsR0FBRTtBQUFBLFVBQ3BELDRDQUFDLFFBQUcsT0FBTyxPQUFPLElBQ2hCLHNEQUFDLFlBQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxXQUFXLFNBQVMsV0FBVyxVQUFVLE9BQU8sR0FBRyxTQUFTLE1BQU07QUFBRSw2QkFBaUIsRUFBRSxPQUFPLDBEQUFhLFNBQVMsV0FBTSxPQUFPLFFBQVEsb0pBQTRCLFFBQVEsTUFBTSxXQUFXLE1BQU07QUFBRSxtQkFBSyxVQUFVLGdCQUFnQix1Q0FBdUMsRUFBRSxJQUFJLE9BQU8sR0FBRyxDQUFDO0FBQUEsWUFBRSxFQUFFLENBQUM7QUFBQSxVQUFFLEdBQUcsb0JBQUMsR0FDclU7QUFBQSxhQU5PLE9BQU8sRUFPaEIsQ0FDRCxHQUNIO0FBQUEsU0FDRjtBQUFBLE9BRUo7QUFBQSxLQUNGO0FBSUYsUUFBTSxlQUNKLDRFQUNFO0FBQUEsaURBQUMsUUFBSyxPQUFPLEVBQUUsYUFBYSxHQUMxQjtBQUFBLG1EQUFDLFNBQUksT0FBTyxPQUFPLFNBQ2pCO0FBQUEsb0RBQUMsV0FBTSxPQUFPLE9BQU8sT0FBTyxhQUFhLEVBQUUsZ0JBQWdCLEdBQUcsT0FBTyxXQUFXLFVBQVUsQ0FBQyxNQUFNO0FBQUUsdUJBQWEsRUFBRSxPQUFPLEtBQUs7QUFBQSxRQUFFLEdBQUc7QUFBQSxRQUNuSSw0Q0FBQyxjQUFTLE9BQU8sT0FBTyxVQUFVLE1BQU0sR0FBRyxhQUFhLEVBQUUsZUFBZSxHQUFHLE9BQU8sVUFBVSxVQUFVLENBQUMsTUFBTTtBQUFFLHNCQUFZLEVBQUUsT0FBTyxLQUFLO0FBQUEsUUFBRSxHQUFHO0FBQUEsUUFDL0ksNENBQUMsWUFBTyxPQUFPLE9BQU8sUUFBUSxVQUFVLFNBQVMsUUFBUSxVQUFVLEtBQUssTUFBTSxNQUFNLFNBQVMsS0FBSyxNQUFNLElBQUksU0FBUyxNQUFNO0FBQUUsZUFBSyxTQUFTO0FBQUEsUUFBRSxHQUMxSSxtQkFBUyxhQUFhLEVBQUUsZUFBZSxJQUFJLEVBQUUsWUFBWSxHQUM1RDtBQUFBLFNBQ0Y7QUFBQSxNQUNBLDRDQUFDLFNBQUksT0FBTyxFQUFFLFVBQVUsUUFBUSxPQUFPLDRDQUE0QyxHQUFJLFlBQUUsaUJBQWlCLEdBQUU7QUFBQSxPQUM5RztBQUFBLElBQ0M7QUFBQSxJQUNBLGdCQUFnQixRQUNmLDZDQUFDLFFBQUssT0FBTyxFQUFFLFlBQVksR0FDekI7QUFBQSxrREFBQyxTQUFJLE9BQU8sRUFBRSxVQUFVLFFBQVEsT0FBTyw2Q0FBNkMsY0FBYyxNQUFNLEdBQUksWUFBRSxXQUFXLEdBQUU7QUFBQSxNQUMzSCw0Q0FBQyxTQUFJLE9BQU8sRUFBRSxXQUFXLE9BQU8sR0FDOUIsdURBQUMsV0FBTSxPQUFPLE9BQU8sT0FDbkI7QUFBQSxvREFBQyxXQUNDLHNEQUFDLFFBQUksV0FBQyxpQkFBaUIsaUJBQWlCLGtCQUFrQixtQkFBbUIsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFFBQVEsNENBQUMsUUFBYSxPQUFPLE9BQU8sSUFBSyxZQUFFLEdBQUcsS0FBN0IsR0FBK0IsQ0FBSyxHQUFFLEdBQy9KO0FBQUEsUUFDQSw0Q0FBQyxXQUNFLHNCQUFZLE1BQU0sSUFBSSxDQUFDLE1BQU0sVUFDNUIsNkNBQUMsUUFBaUIsT0FBTyxFQUFFLFNBQVMsS0FBSyxVQUFVLElBQUksS0FBSyxHQUMxRDtBQUFBLHVEQUFDLFFBQUcsT0FBTyxFQUFFLEdBQUcsT0FBTyxJQUFJLFVBQVUsSUFBSSxHQUN2QztBQUFBLHlEQUFDLFNBQUksT0FBTyxFQUFFLFlBQVksSUFBSSxHQUFJO0FBQUEsc0JBQVE7QUFBQSxjQUFFO0FBQUEsY0FBRyxLQUFLO0FBQUEsZUFBTTtBQUFBLFlBQzFELDRDQUFDLFNBQUksT0FBTyxFQUFFLFVBQVUsUUFBUSxPQUFPLDRDQUE0QyxHQUFJLGVBQUssWUFBWSxNQUFNLEdBQUcsR0FBRyxHQUFFO0FBQUEsWUFDckgsS0FBSyxZQUFZLFNBQVMsS0FDekIsNENBQUMsU0FBSSxPQUFPLEVBQUUsVUFBVSxRQUFRLE9BQU8sNkNBQTZDLFlBQVksc0RBQXNELEdBQUksZUFBSyxZQUFZLEtBQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxHQUFHLEdBQUU7QUFBQSxhQUV4TTtBQUFBLFVBQ0EsNENBQUMsUUFBRyxPQUFPLE9BQU8sSUFDaEI7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUFPLE9BQU8sRUFBRSxHQUFHLE9BQU8sT0FBTyxPQUFPLFFBQVEsU0FBUyxVQUFVO0FBQUEsY0FBRyxPQUFPLEtBQUs7QUFBQSxjQUNqRixVQUFVLENBQUMsTUFBTTtBQUFFLCtCQUFlLEVBQUUsR0FBRyxhQUFhLE9BQU8sWUFBWSxNQUFNLElBQUksQ0FBQyxNQUFNLE1BQU0sTUFBTSxRQUFRLEVBQUUsR0FBRyxNQUFNLE1BQU0sRUFBRSxPQUFPLE1BQU0sSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUFBLGNBQUU7QUFBQSxjQUN4SixXQUFDLFlBQVksWUFBWSxVQUFVLE9BQU8sY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLDRDQUFDLFlBQWtCLE9BQU8sTUFBTyxzQkFBWSxJQUFJLEtBQUssUUFBekMsSUFBOEMsQ0FBUztBQUFBO0FBQUEsVUFDL0ksR0FDRjtBQUFBLFVBQ0EsNENBQUMsUUFBRyxPQUFPLE9BQU8sSUFDaEI7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUFPLE9BQU8sRUFBRSxHQUFHLE9BQU8sT0FBTyxPQUFPLFFBQVEsU0FBUyxVQUFVO0FBQUEsY0FBRyxPQUFPLEtBQUssZ0JBQWdCLE1BQU0sS0FBSztBQUFBLGNBQzVHLFVBQVUsQ0FBQyxNQUFNO0FBQ2Ysc0JBQU0sQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFLE9BQU8sTUFBTSxNQUFNLEdBQUc7QUFDbEQsK0JBQWUsRUFBRSxHQUFHLGFBQWEsT0FBTyxZQUFZLE1BQU0sSUFBSSxDQUFDLE1BQU0sTUFBTSxNQUFNLFFBQVEsRUFBRSxHQUFHLE1BQU0sZUFBZSxZQUFZLElBQUksU0FBUyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUFBLGNBQ3JLO0FBQUEsY0FDQTtBQUFBLDREQUFDLFlBQU8sT0FBTSxLQUFLLFlBQUUsbUJBQW1CLEdBQUU7QUFBQSxnQkFDekMsYUFBYSxJQUFJLENBQUMsV0FBVyw2Q0FBQyxZQUErQyxPQUFPLE9BQU8sV0FBVyxNQUFNLE9BQU8sSUFBSztBQUFBLHlCQUFPO0FBQUEsa0JBQVM7QUFBQSxrQkFBRSxPQUFPO0FBQUEscUJBQXZHLE9BQU8sV0FBVyxNQUFNLE9BQU8sRUFBMkUsQ0FBUztBQUFBO0FBQUE7QUFBQSxVQUNoSyxHQUNGO0FBQUEsVUFDQSw0Q0FBQyxRQUFHLE9BQU8sT0FBTyxJQUNoQjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxPQUFPLE9BQU8sUUFBUSxTQUFTLFVBQVU7QUFBQSxjQUFHLE9BQU8sS0FBSztBQUFBLGNBQ2pGLFVBQVUsQ0FBQyxNQUFNO0FBQUUsK0JBQWUsRUFBRSxHQUFHLGFBQWEsT0FBTyxZQUFZLE1BQU0sSUFBSSxDQUFDLE1BQU0sTUFBTSxNQUFNLFFBQVEsRUFBRSxHQUFHLE1BQU0sZUFBZSxFQUFFLE9BQU8sTUFBTSxJQUFJLElBQUksRUFBRSxDQUFDO0FBQUEsY0FBRTtBQUFBLGNBQ2pLLGlCQUFPLFFBQVEsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxNQUFNLDRDQUFDLFlBQW1CLE9BQWUsbUJBQXRCLEtBQTRCLENBQVM7QUFBQTtBQUFBLFVBQzNHLEdBQ0Y7QUFBQSxVQUNBLDRDQUFDLFFBQUcsT0FBTyxPQUFPLElBQ2hCO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FBTSxNQUFLO0FBQUEsY0FBVyxTQUFTLEtBQUs7QUFBQSxjQUNuQyxVQUFVLENBQUMsTUFBTTtBQUFFLCtCQUFlLEVBQUUsR0FBRyxhQUFhLE9BQU8sWUFBWSxNQUFNLElBQUksQ0FBQyxNQUFNLE1BQU0sTUFBTSxRQUFRLEVBQUUsR0FBRyxNQUFNLFNBQVMsRUFBRSxPQUFPLFFBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUFBLGNBQUU7QUFBQTtBQUFBLFVBQUcsR0FDcks7QUFBQSxhQWpDTyxLQUFLLEVBa0NkLENBQ0QsR0FDSDtBQUFBLFNBQ0YsR0FDRjtBQUFBLE1BQ0EsNkNBQUMsU0FBSSxPQUFPLEVBQUUsU0FBUyxRQUFRLEtBQUssT0FBTyxXQUFXLE9BQU8sR0FDM0Q7QUFBQSxvREFBQyxZQUFPLE9BQU8sT0FBTyxRQUFRLFVBQVUsVUFBVSxTQUFTLE1BQU07QUFBRSxlQUFLLFdBQVcsSUFBSTtBQUFBLFFBQUUsR0FBSSxxQkFBVyxXQUFNLEVBQUUsbUJBQW1CLEdBQUU7QUFBQSxRQUNySSw0Q0FBQyxZQUFPLE9BQU8sT0FBTyxXQUFXLFVBQVUsVUFBVSxTQUFTLE1BQU07QUFBRSxlQUFLLFdBQVcsS0FBSztBQUFBLFFBQUUsR0FBSSxZQUFFLG1CQUFtQixHQUFFO0FBQUEsUUFDeEgsNENBQUMsWUFBTyxPQUFPLE9BQU8sV0FBVyxVQUFVLFVBQVUsU0FBUyxNQUFNO0FBQUUseUJBQWUsSUFBSTtBQUFBLFFBQUUsR0FBSSxZQUFFLGNBQWMsR0FBRTtBQUFBLFNBQ25IO0FBQUEsT0FDRjtBQUFBLElBRUYsNkNBQUMsUUFDQztBQUFBLGtEQUFDLFNBQUksT0FBTyxPQUFPLEtBQ2pCLHVEQUFDLFVBQUs7QUFBQSxvREFBQyxVQUFLLE9BQU8sT0FBTyxPQUFRLFlBQUUsZUFBZSxHQUFFO0FBQUEsUUFBUSxPQUFPLE9BQU8saUJBQWlCLENBQUM7QUFBQSxTQUFFLEdBQ2pHO0FBQUEsTUFDQyxLQUFLLFdBQVcsSUFDZiw0Q0FBQyxTQUFJLE9BQU8sT0FBTyxPQUFRLFlBQUUsY0FBYyxHQUFFLElBRTdDLDRDQUFDLFNBQUksT0FBTyxFQUFFLFdBQVcsT0FBTyxHQUNoQyx1REFBQyxXQUFNLE9BQU8sT0FBTyxPQUNuQjtBQUFBLG9EQUFDLFdBQ0Msc0RBQUMsUUFBSSxXQUFDLG1CQUFtQixrQkFBa0IsbUJBQW1CLG9CQUFvQixpQkFBaUIsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFFBQVEsNENBQUMsUUFBYSxPQUFPLE9BQU8sSUFBSyxZQUFFLEdBQUcsS0FBN0IsR0FBK0IsQ0FBSyxHQUFFLEdBQ3BMO0FBQUEsUUFDQSw0Q0FBQyxXQUNFLGVBQUssSUFBSSxDQUFDLFFBQ1QsNkNBQUMsUUFDQztBQUFBLHNEQUFDLFFBQUcsT0FBTyxPQUFPLElBQU0sa0JBQVEsS0FBSyxDQUFDLFdBQVcsT0FBTyxPQUFPLElBQUksUUFBUSxHQUFHLFNBQVUsSUFBSSxVQUFTO0FBQUEsVUFDckcsNENBQUMsUUFBRyxPQUFPLE9BQU8sSUFBSyxjQUFJLGNBQWMsSUFBSSxhQUFhLEtBQUssTUFBTSxJQUFJLGFBQWEsVUFBSTtBQUFBLFVBQzFGLDZDQUFDLFFBQUcsT0FBTyxPQUFPLElBQ2hCO0FBQUEsd0RBQUMsVUFBSyxPQUFPLE9BQU8sTUFBTSxJQUFJLFdBQVcsZUFBZSxJQUFJLFdBQVcsY0FBYyxZQUFZLElBQUksV0FBVyxXQUFXLFlBQVksSUFBSSxXQUFXLFdBQVcsWUFBWSxTQUFTLEdBQUksNEJBQWtCLElBQUksTUFBTSxLQUFLLElBQUksUUFBTztBQUFBLFlBQ3JPLElBQUksZ0JBQWdCLFFBQVEsSUFBSSxnQkFBZ0IsVUFBYSxJQUFJLFdBQVcsYUFDM0UsNENBQUMsU0FBSSxPQUFPLEVBQUUsVUFBVSxRQUFRLE9BQU8sNkNBQTZDLFVBQVUsS0FBSyxVQUFVLFVBQVUsY0FBYyxZQUFZLFlBQVksU0FBUyxHQUFJLGNBQUksYUFBWTtBQUFBLGFBRTlMO0FBQUEsVUFDQSw0Q0FBQyxRQUFHLE9BQU8sT0FBTyxJQUFLLHFCQUFXLElBQUksU0FBUyxHQUFFO0FBQUEsVUFDakQsNENBQUMsUUFBRyxPQUFPLE9BQU8sSUFBSyxjQUFJLFlBQVksU0FBWSxNQUFNLElBQUksUUFBUSxRQUFRLENBQUMsSUFBSSxVQUFJO0FBQUEsVUFDdEYsNENBQUMsUUFBRyxPQUFPLE9BQU8sSUFDaEIsc0RBQUMsWUFBTyxPQUFPLEVBQUUsR0FBRyxPQUFPLFdBQVcsU0FBUyxXQUFXLFVBQVUsT0FBTyxHQUFHLFNBQVMsTUFBTTtBQUFFLGlCQUFLLGNBQWMsSUFBSSxFQUFFO0FBQUEsVUFBRSxHQUFJLHFCQUFXLElBQUksT0FBTyxJQUFJLEtBQUssRUFBRSxvQkFBb0IsSUFBSSxFQUFFLGlCQUFpQixHQUFFLEdBQzlNO0FBQUEsYUFiTyxJQUFJLEVBY2IsQ0FDRCxHQUNIO0FBQUEsU0FDRixHQUNBO0FBQUEsT0FFSjtBQUFBLElBQ0MsY0FBYyxRQUNiLDZDQUFDLFFBQUssT0FBTyxFQUFFLGtCQUFrQixJQUFJLFdBQVEsVUFBVSxJQUFJLGFBQ3pEO0FBQUEsbURBQUMsU0FBSSxPQUFPLEVBQUUsU0FBUyxRQUFRLEtBQUssT0FBTyxZQUFZLFVBQVUsVUFBVSxRQUFRLGNBQWMsTUFBTSxHQUNyRztBQUFBLG9EQUFDLFVBQUssT0FBTyxPQUFPLE1BQU0sVUFBVSxJQUFJLFdBQVcsZUFBZSxVQUFVLElBQUksV0FBVyxjQUFjLFlBQVksVUFBVSxJQUFJLFdBQVcsV0FBVyxZQUFZLFVBQVUsSUFBSSxXQUFXLFdBQVcsWUFBWSxTQUFTLEdBQUksNEJBQWtCLFVBQVUsSUFBSSxNQUFNLEtBQUssVUFBVSxJQUFJLFFBQU87QUFBQSxRQUNqUyxVQUFVLElBQUksVUFBVSxRQUFRLDRDQUFDLFVBQUssT0FBTyxFQUFFLFVBQVUsUUFBUSxPQUFPLFVBQVUsR0FBSSxvQkFBVSxJQUFJLE1BQU0sU0FBUTtBQUFBLFFBQ25ILDRDQUFDLFVBQUssT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHO0FBQUEsUUFDMUIsNENBQUMsWUFBTyxPQUFPLEVBQUUsR0FBRyxPQUFPLFdBQVcsU0FBUyxXQUFXLFVBQVUsT0FBTyxHQUFHLFNBQVMsTUFBTTtBQUFFLGVBQUssY0FBYyxVQUFVLElBQUksRUFBRTtBQUFBLFFBQUUsR0FBSSxZQUFFLG9CQUFvQixHQUFFO0FBQUEsUUFDaEssNENBQUMsWUFBTyxPQUFPLEVBQUUsR0FBRyxPQUFPLFdBQVcsU0FBUyxXQUFXLFVBQVUsT0FBTyxHQUFHLFNBQVMsTUFBTTtBQUFFLHVCQUFhLElBQUk7QUFBQSxRQUFFLEdBQUksWUFBRSxrQkFBa0IsR0FBRTtBQUFBLFNBQzlJO0FBQUEsTUFDQyxVQUFVLElBQUksV0FBVyxZQUFZLFVBQVUsSUFBSSxlQUFlLFFBQ2pFLDZDQUFDLFNBQUksT0FBTyxFQUFFLFNBQVMsWUFBWSxjQUFjLE9BQU8sWUFBWSx3QkFBd0IsUUFBUSxrQ0FBa0MsY0FBYyxNQUFNLEdBQ3hKO0FBQUEscURBQUMsU0FBSSxPQUFPLEVBQUUsWUFBWSxLQUFLLFVBQVUsT0FBTyxHQUFHO0FBQUE7QUFBQSxVQUFHLEVBQUUsbUJBQW1CO0FBQUEsV0FBRTtBQUFBLFFBQzdFLDRDQUFDLFNBQUksT0FBTyxFQUFFLFVBQVUsUUFBUSxPQUFPLDRDQUE0QyxHQUFJLG9CQUFVLElBQUksV0FBVyxRQUFPO0FBQUEsUUFDdkgsNkNBQUMsU0FBSSxPQUFPLEVBQUUsU0FBUyxRQUFRLEtBQUssT0FBTyxXQUFXLE1BQU0sR0FDMUQ7QUFBQSxzREFBQyxZQUFPLE9BQU8sRUFBRSxHQUFHLE9BQU8sUUFBUSxTQUFTLFlBQVksVUFBVSxPQUFPLEdBQUcsU0FBUyxNQUFNO0FBQUUsaUJBQUssVUFBVSxVQUFVLElBQUksSUFBSSxVQUFVO0FBQUEsVUFBRSxHQUFJLFlBQUUsa0JBQWtCLEdBQUU7QUFBQSxVQUNwSyw0Q0FBQyxZQUFPLE9BQU8sRUFBRSxHQUFHLE9BQU8sV0FBVyxTQUFTLFlBQVksVUFBVSxPQUFPLEdBQUcsU0FBUyxNQUFNO0FBQUUsaUJBQUssVUFBVSxVQUFVLElBQUksSUFBSSxjQUFjO0FBQUEsVUFBRSxHQUFJLFlBQUUsaUJBQWlCLEdBQUU7QUFBQSxXQUM1SztBQUFBLFNBQ0Y7QUFBQSxPQUVBLFVBQVUsSUFBSSxXQUFXLFlBQVksVUFBVSxJQUFJLFdBQVcsa0JBQzlELDRDQUFDLFNBQUksT0FBTyxFQUFFLGNBQWMsTUFBTSxHQUNoQyxzREFBQyxZQUFPLE9BQU8sRUFBRSxHQUFHLE9BQU8sUUFBUSxTQUFTLFlBQVksVUFBVSxPQUFPLEdBQUcsU0FBUyxNQUFNO0FBQUUsYUFBSyxVQUFVLFVBQVUsSUFBSSxJQUFJLFVBQVU7QUFBQSxNQUFFLEdBQUksWUFBRSxtQkFBbUIsR0FBRSxHQUN2SztBQUFBLE1BRUYsNENBQUMsU0FBSSxPQUFPLEVBQUUsV0FBVyxPQUFPLEdBQ2hDLHVEQUFDLFdBQU0sT0FBTyxPQUFPLE9BQ25CO0FBQUEsb0RBQUMsV0FDQyxzREFBQyxRQUFJLFdBQUMsaUJBQWlCLGlCQUFpQixrQkFBa0IsbUJBQW1CLHFCQUFxQixlQUFlLEVBQUUsSUFBSSxDQUFDLFFBQVEsNENBQUMsUUFBYSxPQUFPLE9BQU8sSUFBSyxZQUFFLEdBQUcsS0FBN0IsR0FBK0IsQ0FBSyxHQUFFLEdBQ2pMO0FBQUEsUUFDQSw0Q0FBQyxXQUNFLG9CQUFVLE1BQU0sSUFBSSxDQUFDLE1BQU0sVUFDMUIsNkNBQUMsUUFDQztBQUFBLHVEQUFDLFFBQUcsT0FBTyxPQUFPLElBQ2hCO0FBQUEseURBQUMsU0FBSztBQUFBLHNCQUFRO0FBQUEsY0FBRTtBQUFBLGNBQUcsS0FBSztBQUFBLGVBQU07QUFBQSxZQUM3QixLQUFLLG1CQUFtQixRQUN2Qiw0Q0FBQyxTQUFJLE9BQU8sRUFBRSxVQUFVLFFBQVEsT0FBTyw2Q0FBNkMsVUFBVSxLQUFLLFlBQVksU0FBUyxHQUFJLGVBQUssZUFBZSxNQUFNLEdBQUcsR0FBRyxHQUFFO0FBQUEsYUFFbEs7QUFBQSxVQUNBLDRDQUFDLFFBQUcsT0FBTyxPQUFPLElBQUksc0RBQUMsVUFBSyxPQUFPLE9BQU8sTUFBTSx1QkFBdUIsR0FBSSxzQkFBWSxLQUFLLElBQUksS0FBSyxLQUFLLE1BQUssR0FBTztBQUFBLFVBQ3RILDRDQUFDLFFBQUcsT0FBTyxFQUFFLEdBQUcsT0FBTyxJQUFJLFVBQVUsT0FBTyxHQUFJLGVBQUssU0FBUyxVQUFJO0FBQUEsVUFDbEUsNENBQUMsUUFBRyxPQUFPLE9BQU8sSUFBSSxzREFBQyxVQUFLLE9BQU8sT0FBTyxNQUFNLEtBQUssV0FBVyxZQUFZLEtBQUssV0FBVyxXQUFXLFlBQVksS0FBSyxXQUFXLFlBQVksWUFBWSxTQUFTLEdBQUksNkJBQW1CLEtBQUssTUFBTSxLQUFLLEtBQUssUUFBTyxHQUFPO0FBQUEsVUFDOU4sNENBQUMsUUFBRyxPQUFPLE9BQU8sSUFBSyxpQkFBTyxLQUFLLGFBQWEsR0FBRTtBQUFBLFVBQ2xELDRDQUFDLFFBQUcsT0FBTyxPQUFPLElBQUssZUFBSyxVQUFVLElBQUksTUFBTSxLQUFLLFFBQVEsUUFBUSxDQUFDLElBQUksVUFBSTtBQUFBLGFBWHZFLEtBQUssRUFZZCxDQUNELEdBQ0g7QUFBQSxTQUNGLEdBQ0E7QUFBQSxNQUNDLFVBQVUsWUFBWSxRQUNyQiw2Q0FBQyxTQUFJLE9BQU8sRUFBRSxXQUFXLFFBQVEsUUFBUSwyREFBMkQsY0FBYyxPQUFPLFNBQVMsV0FBVyxHQUMzSTtBQUFBLG9EQUFDLFNBQUksT0FBTyxFQUFFLFVBQVUsUUFBUSxZQUFZLEtBQUssY0FBYyxNQUFNLEdBQUksWUFBRSxtQkFBbUIsR0FBRTtBQUFBLFFBQ2hHLDZDQUFDLFNBQUksT0FBTyxFQUFFLFVBQVUsUUFBUSxPQUFPLDRDQUE0QyxHQUNoRjtBQUFBLG9CQUFVLFFBQVE7QUFBQSxVQUNsQixVQUFVLFFBQVEsV0FBVyxPQUFPLFNBQU0sRUFBRSxhQUFhLENBQUMsSUFBSSxVQUFVLFFBQVEsTUFBTSxLQUFLO0FBQUEsVUFDM0YsVUFBVSxRQUFRLFlBQVksT0FBTyxjQUFXLFVBQVUsUUFBUSxRQUFRLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSztBQUFBLFdBQzdGO0FBQUEsUUFDQyxVQUFVLFFBQVEsaUJBQWlCLFNBQVMsS0FDM0MsNkNBQUMsU0FBSSxPQUFPLEVBQUUsV0FBVyxPQUFPLFVBQVUsT0FBTyxHQUMvQztBQUFBLHVEQUFDLFVBQUssT0FBTyxFQUFFLFlBQVksSUFBSSxHQUFJO0FBQUEsY0FBRSx1QkFBdUI7QUFBQSxZQUFFO0FBQUEsYUFBQztBQUFBLFVBQzlELFVBQVUsUUFBUSxpQkFBaUIsSUFBSSxDQUFDLFdBQVcsNENBQUMsVUFBcUIsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLEdBQUksaUJBQU8sU0FBaEUsT0FBTyxFQUErRCxDQUFPO0FBQUEsV0FDOUk7QUFBQSxRQUVELFVBQVUsUUFBUSxZQUFZLFNBQVMsS0FDdEMsNkNBQUMsU0FBSSxPQUFPLEVBQUUsV0FBVyxPQUFPLFVBQVUsUUFBUSxPQUFPLDRDQUE0QyxHQUNuRztBQUFBLHVEQUFDLFVBQUssT0FBTyxFQUFFLFlBQVksS0FBSyxPQUFPLFVBQVUsR0FBSTtBQUFBLGNBQUUsa0JBQWtCO0FBQUEsWUFBRTtBQUFBLGFBQUM7QUFBQSxVQUMzRSxVQUFVLFFBQVEsWUFBWSxNQUFNLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxlQUNuRCw2Q0FBQyxTQUFxQjtBQUFBO0FBQUEsWUFBSSxNQUFNO0FBQUEsWUFBSztBQUFBLFlBQUcsTUFBTTtBQUFBLGVBQXBDLFVBQTJDLENBQ3REO0FBQUEsV0FDSDtBQUFBLFNBRUo7QUFBQSxPQUVKO0FBQUEsSUFFRiw2Q0FBQyxRQUFLLE9BQU8sRUFBRSxhQUFhLEdBQzFCO0FBQUEsbURBQUMsU0FBSSxPQUFPLE9BQU8sU0FDakI7QUFBQSxvREFBQyxXQUFNLE9BQU8sT0FBTyxPQUFPLGFBQWEsRUFBRSxnQkFBZ0IsR0FBRyxPQUFPLFdBQVcsVUFBVSxDQUFDLE1BQU07QUFBRSx1QkFBYSxFQUFFLE9BQU8sS0FBSztBQUFBLFFBQUUsR0FBRztBQUFBLFFBQ25JLDZDQUFDLFlBQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxPQUFPLE9BQU8sT0FBTyxHQUFHLE9BQU8sV0FBVyxVQUFVLENBQUMsTUFBTTtBQUFFLHVCQUFhLEVBQUUsT0FBTyxLQUFLO0FBQUEsUUFBRSxHQUNuSDtBQUFBLHNEQUFDLFlBQU8sT0FBTSxVQUFVLFlBQUUsa0JBQWtCLEdBQUU7QUFBQSxVQUM5Qyw0Q0FBQyxZQUFPLE9BQU0sV0FBVyxZQUFFLG1CQUFtQixHQUFFO0FBQUEsVUFDaEQsNENBQUMsWUFBTyxPQUFNLE9BQU8sWUFBRSxlQUFlLEdBQUU7QUFBQSxXQUMxQztBQUFBLFFBQ0EsNENBQUMsV0FBTSxPQUFPLEVBQUUsR0FBRyxPQUFPLE9BQU8sT0FBTyxJQUFJLEdBQUcsYUFBYSxFQUFFLG9CQUFvQixHQUFHLE9BQU8sZUFBZSxVQUFVLENBQUMsTUFBTTtBQUFFLDJCQUFpQixFQUFFLE9BQU8sS0FBSztBQUFBLFFBQUUsR0FBRztBQUFBLFFBQ2pLLGNBQWMsU0FDYiw0RUFDRTtBQUFBLHNEQUFDLFdBQU0sT0FBTyxPQUFPLE9BQU8sYUFBYSxFQUFFLGdCQUFnQixHQUFHLE9BQU8sWUFBWSxVQUFVLENBQUMsTUFBTTtBQUFFLDBCQUFjLEVBQUUsT0FBTyxLQUFLO0FBQUEsVUFBRSxHQUFHO0FBQUEsVUFDckksNENBQUMsY0FBUyxPQUFPLE9BQU8sVUFBVSxNQUFNLEdBQUcsYUFBYSxFQUFFLGVBQWUsR0FBRyxPQUFPLFdBQVcsVUFBVSxDQUFDLE1BQU07QUFBRSx5QkFBYSxFQUFFLE9BQU8sS0FBSztBQUFBLFVBQUUsR0FBRztBQUFBLFdBQ25KO0FBQUEsUUFFRiw0Q0FBQyxZQUFPLE9BQU8sT0FBTyxRQUFRLFVBQVUsVUFBVSxLQUFLLE1BQU0sSUFBSSxTQUFTLE1BQU07QUFBRSxlQUFLLGFBQWE7QUFBQSxRQUFFLEdBQUksWUFBRSxXQUFXLEdBQUU7QUFBQSxTQUMzSDtBQUFBLE1BQ0EsNENBQUMsU0FBSSxPQUFPLEVBQUUsVUFBVSxRQUFRLE9BQU8sNkNBQTZDLGNBQWMsTUFBTSxHQUFJLFlBQUUsWUFBWSxHQUFFO0FBQUEsT0FDMUgsaUJBQWlCLENBQUMsR0FBRyxXQUFXLElBQ2hDLDRDQUFDLFNBQUksT0FBTyxPQUFPLE9BQVEsWUFBRSxhQUFhLEdBQUUsSUFFNUMsNENBQUMsU0FBSSxPQUFPLEVBQUUsV0FBVyxPQUFPLEdBQ2hDLHVEQUFDLFdBQU0sT0FBTyxPQUFPLE9BQ25CO0FBQUEsb0RBQUMsV0FDQyxzREFBQyxRQUFJLFdBQUMsa0JBQWtCLGtCQUFrQixzQkFBc0Isa0JBQWtCLHdCQUF3QixtQkFBbUIsRUFBRSxJQUFJLENBQUMsUUFBUSw0Q0FBQyxRQUFhLE9BQU8sT0FBTyxJQUFLLFlBQUUsR0FBRyxLQUE3QixHQUErQixDQUFLLEdBQUUsR0FDN0w7QUFBQSxRQUNBLDRDQUFDLFdBQ0csNEJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsU0FDMUIsNkNBQUMsUUFBaUIsT0FBTyxFQUFFLFNBQVMsS0FBSyxVQUFVLElBQUksS0FBSyxHQUMxRDtBQUFBLHVEQUFDLFFBQUcsT0FBTyxPQUFPLElBQUs7QUFBQSxpQkFBSztBQUFBLFlBQU0sS0FBSyxVQUFVLEtBQUssNkNBQUMsVUFBSyxPQUFPLEVBQUUsVUFBVSxRQUFRLE9BQU8sNENBQTRDLEdBQUc7QUFBQTtBQUFBLGNBQUUsS0FBSztBQUFBLGNBQU07QUFBQSxlQUFDLElBQVU7QUFBQSxhQUFLO0FBQUEsVUFDMUssNENBQUMsUUFBRyxPQUFPLE9BQU8sSUFBSSxzREFBQyxVQUFLLE9BQU8sT0FBTyxNQUFNLEtBQUssU0FBUyxXQUFXLFlBQVksS0FBSyxTQUFTLFlBQVksWUFBWSxTQUFTLEdBQUksZUFBSyxTQUFTLFdBQVcsRUFBRSxrQkFBa0IsSUFBSSxLQUFLLFNBQVMsWUFBWSxFQUFFLG1CQUFtQixJQUFJLEVBQUUsZUFBZSxHQUFFLEdBQU87QUFBQSxVQUN0USw0Q0FBQyxRQUFHLE9BQU8sT0FBTyxJQUFLLGVBQUssbUJBQW1CLE9BQU8sS0FBSyxNQUFNLEtBQUssa0JBQWtCLE9BQU8sRUFBRSxJQUFJLEtBQUssRUFBRSxXQUFXLElBQUksS0FBSyxtQkFBbUIsS0FBSyxLQUFLLE1BQU0sS0FBSyxrQkFBa0IsS0FBSyxFQUFFLElBQUksS0FBSyxFQUFFLFlBQVksSUFBSSxLQUFLLGtCQUFrQixFQUFFLGNBQWMsR0FBRTtBQUFBLFVBQ3JRLDRDQUFDLFFBQUcsT0FBTyxPQUFPLElBQUssZUFBSyxVQUFVLFdBQVcsS0FBSyxTQUFTLElBQUksVUFBSTtBQUFBLFVBQ3ZFLDRDQUFDLFFBQUcsT0FBTyxFQUFFLEdBQUcsT0FBTyxJQUFJLFVBQVUsUUFBUSxPQUFPLDZDQUE2QyxVQUFVLEtBQUssWUFBWSxTQUFTLEdBQUksZUFBSyxlQUFlLEtBQUssY0FBYyxPQUFPLFdBQVcsS0FBSyxTQUFTLElBQUksV0FBSztBQUFBLFVBQ3pOLDRDQUFDLFFBQUcsT0FBTyxPQUFPLElBQ2hCLHVEQUFDLFNBQUksT0FBTyxFQUFFLFNBQVMsUUFBUSxLQUFLLE1BQU0sR0FDeEM7QUFBQSx3REFBQyxZQUFPLE9BQU8sRUFBRSxHQUFHLE9BQU8sV0FBVyxTQUFTLFdBQVcsVUFBVSxPQUFPLEdBQUcsU0FBUyxNQUFNO0FBQUUsbUJBQUssZ0JBQWdCLFVBQVUsRUFBRSxJQUFJLEtBQUssSUFBSSxTQUFTLENBQUMsS0FBSyxRQUFRLENBQUM7QUFBQSxZQUFFLEdBQUksZUFBSyxVQUFVLEVBQUUsZUFBZSxJQUFJLEVBQUUsY0FBYyxHQUFFO0FBQUEsWUFDak8sNENBQUMsWUFBTyxPQUFPLEVBQUUsR0FBRyxPQUFPLFdBQVcsU0FBUyxXQUFXLFVBQVUsT0FBTyxHQUFHLFNBQVMsTUFBTTtBQUFFLG1CQUFLLGdCQUFnQixPQUFPLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQztBQUFBLFlBQUUsR0FBSSxZQUFFLGNBQWMsR0FBRTtBQUFBLFlBQ2xLLDRDQUFDLFlBQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxXQUFXLFNBQVMsV0FBVyxVQUFVLE9BQU8sR0FBRyxTQUFTLE1BQU07QUFBRSwrQkFBaUIsRUFBRSxPQUFPLDBEQUFhLFNBQVMsV0FBTSxLQUFLLE9BQU8sb0RBQVksUUFBUSxNQUFNLFdBQVcsTUFBTTtBQUFFLHFCQUFLLGdCQUFnQixVQUFVLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQztBQUFBLGNBQUUsRUFBRSxDQUFDO0FBQUEsWUFBRSxHQUFHLG9CQUFDO0FBQUEsYUFDelEsR0FDRjtBQUFBLGFBWk8sS0FBSyxFQWFkLENBQ0QsR0FDSDtBQUFBLFNBQ0YsR0FDQTtBQUFBLE9BRUo7QUFBQSxLQUNGO0FBSUYsUUFBTSxXQUNKLDRFQUVFO0FBQUEsaURBQUMsUUFBSyxPQUFPLEVBQUUsYUFBYSxHQUMxQjtBQUFBLG1EQUFDLFNBQUksT0FBTyxFQUFFLFNBQVMsUUFBUSxLQUFLLE9BQU8sWUFBWSxVQUFVLFVBQVUsUUFBUSxjQUFjLE9BQU8sR0FDdEc7QUFBQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsT0FBTyxFQUFFLEdBQUcsT0FBTyxPQUFPLE9BQU8sSUFBSTtBQUFBLFlBQ3JDLGFBQWEsRUFBRSxjQUFjO0FBQUEsWUFDN0IsT0FBTztBQUFBLFlBQ1AsVUFBVSxDQUFDLE1BQU07QUFBRSw0QkFBYyxFQUFFLE9BQU8sS0FBSztBQUFBLFlBQUU7QUFBQTtBQUFBLFFBQ25EO0FBQUEsUUFDQSw0Q0FBQyxVQUFLLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRztBQUFBLFFBQzFCLDRDQUFDLFlBQU8sT0FBTyxPQUFPLFdBQVcsVUFBVSxlQUFlLFNBQVMsTUFBTTtBQUFFLGVBQUssWUFBWTtBQUFBLFFBQUUsR0FDM0YsMEJBQWdCLEVBQUUsb0JBQW9CLElBQUksWUFBTyxFQUFFLGlCQUFpQixHQUN2RTtBQUFBLFNBQ0Y7QUFBQSxNQUNBLDZDQUFDLFNBQUksT0FBTyxFQUFFLEdBQUcsT0FBTyxTQUFTLFFBQVEsMkRBQTJELGNBQWMsT0FBTyxTQUFTLE9BQU8sR0FDdkk7QUFBQSxvREFBQyxXQUFNLE9BQU8sT0FBTyxPQUFPLGFBQWEsRUFBRSxpQkFBaUIsR0FBRyxPQUFPLFdBQVcsVUFBVSxDQUFDLE1BQU07QUFBRSx1QkFBYSxFQUFFLE9BQU8sS0FBSztBQUFBLFFBQUUsR0FBRztBQUFBLFFBQ3BJLDRDQUFDLFdBQU0sT0FBTyxFQUFFLEdBQUcsT0FBTyxNQUFNLEdBQUcsYUFBYSxFQUFFLGdCQUFnQixHQUFHLE9BQU8sVUFBVSxVQUFVLENBQUMsTUFBTTtBQUFFLHNCQUFZLEVBQUUsT0FBTyxLQUFLO0FBQUEsUUFBRSxHQUFHO0FBQUEsUUFDeEk7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE9BQU8sT0FBTztBQUFBLFlBQ2QsTUFBTTtBQUFBLFlBQ04sYUFBYSxFQUFFLG1CQUFtQjtBQUFBLFlBQ2xDLE9BQU87QUFBQSxZQUNQLFVBQVUsQ0FBQyxNQUFNO0FBQUUsNkJBQWUsRUFBRSxPQUFPLEtBQUs7QUFBQSxZQUFFO0FBQUE7QUFBQSxRQUNwRDtBQUFBLFFBQ0MsZ0JBQWdCLFNBQVMsS0FDeEIsNkNBQUMsU0FBSSxPQUFPLEVBQUUsVUFBVSxRQUFRLE9BQU8sNENBQTRDLEdBQ2hGO0FBQUEsWUFBRSxlQUFlO0FBQUEsVUFBRTtBQUFBLFVBQUcsZ0JBQWdCLENBQUMsTUFBTSxZQUFZLEVBQUUsY0FBYyxJQUFJLGdCQUFnQixDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUM7QUFBQSxXQUM3RztBQUFBLFFBRUYsNENBQUMsU0FDQyxzREFBQyxZQUFPLE9BQU8sT0FBTyxRQUFRLFVBQVUsVUFBVSxLQUFLLE1BQU0sTUFBTSxZQUFZLEtBQUssTUFBTSxJQUFJLFNBQVMsTUFBTTtBQUFFLGVBQUssUUFBUTtBQUFBLFFBQUUsR0FBSSxZQUFFLFdBQVcsR0FBRSxHQUNuSjtBQUFBLFNBQ0Y7QUFBQSxPQUNFLE1BQU07QUFDTixjQUFNLFVBQVUsV0FBVyxLQUFLLEVBQUUsWUFBWTtBQUM5QyxjQUFNLFVBQVUsWUFBWSxLQUN4QixRQUNBLE1BQU0sT0FBTyxDQUFDLFVBQVUsS0FBSyxRQUFRLE1BQU0sS0FBSyxVQUFVLE9BQU8sS0FBSyxRQUFRLENBQUMsR0FBRyxLQUFLLEdBQUcsR0FBRyxZQUFZLEVBQUUsU0FBUyxPQUFPLENBQUM7QUFFaEksY0FBTSxVQUFVLENBQUMsR0FBRyxPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sVUFDdkMsT0FBTyxNQUFNLFdBQVcsSUFBSSxJQUFJLE9BQU8sS0FBSyxXQUFXLElBQUksS0FBSyxNQUFNLFlBQVksS0FBSyxTQUFTO0FBQ2xHLFlBQUksUUFBUSxXQUFXLEdBQUc7QUFDeEIsaUJBQU8sNENBQUMsU0FBSSxPQUFPLE9BQU8sT0FBUSxnQkFBTSxXQUFXLElBQUksRUFBRSxhQUFhLElBQUksRUFBRSxtQkFBbUIsR0FBRTtBQUFBLFFBQ25HO0FBQ0EsZUFBTyxRQUFRLElBQUksQ0FBQyxTQUFTO0FBQzNCLGdCQUFNLFlBQVksS0FBSyxRQUFRO0FBQy9CLGdCQUFNLFVBQVUsZ0JBQWdCLFFBQVEsWUFBWSxPQUFPLEtBQUssS0FBSyxjQUFjO0FBQ25GLGdCQUFNLFdBQVcsYUFBYSxLQUFLLEVBQUUsTUFBTTtBQUMzQyxnQkFBTSxPQUFPLEtBQUssUUFBUSxTQUFTLE9BQU8sS0FBSyxRQUFRLE1BQU0sSUFBSSxFQUFFLFNBQVM7QUFDNUUsaUJBQ0U7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUVDLE9BQU87QUFBQSxnQkFDTCxHQUFHLE9BQU87QUFBQSxnQkFDVixHQUFJLFlBQVksRUFBRSxZQUFZLHdCQUF3QixhQUFhLHNCQUFzQixJQUFJLENBQUM7QUFBQSxjQUNoRztBQUFBLGNBRUMsc0JBQVksT0FDWCw2Q0FBQyxTQUFJLE9BQU8sT0FBTyxTQUNqQjtBQUFBLDREQUFDLFdBQU0sT0FBTyxPQUFPLE9BQU8sT0FBTyxRQUFRLE9BQU8sVUFBVSxDQUFDLE1BQU07QUFBRSxpQ0FBZSxFQUFFLEdBQUcsU0FBUyxPQUFPLEVBQUUsT0FBTyxNQUFNLENBQUM7QUFBQSxnQkFBRSxHQUFHO0FBQUEsZ0JBQzlILDRDQUFDLFdBQU0sT0FBTyxPQUFPLE9BQU8sYUFBYSxFQUFFLGdCQUFnQixHQUFHLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQyxNQUFNO0FBQUUsaUNBQWUsRUFBRSxHQUFHLFNBQVMsTUFBTSxFQUFFLE9BQU8sTUFBTSxDQUFDO0FBQUEsZ0JBQUUsR0FBRztBQUFBLGdCQUM5Siw0Q0FBQyxjQUFTLE9BQU8sT0FBTyxVQUFVLE1BQU0sSUFBSSxPQUFPLFFBQVEsU0FBUyxVQUFVLENBQUMsTUFBTTtBQUFFLGlDQUFlLEVBQUUsR0FBRyxTQUFTLFNBQVMsRUFBRSxPQUFPLE1BQU0sQ0FBQztBQUFBLGdCQUFFLEdBQUc7QUFBQSxnQkFDbEosNkNBQUMsU0FBSSxPQUFPLEVBQUUsU0FBUyxRQUFRLEtBQUssTUFBTSxHQUN4QztBQUFBLDhEQUFDLFlBQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxRQUFRLFNBQVMsV0FBVyxHQUFHLFNBQVMsTUFBTTtBQUFFLHlCQUFLLGFBQWE7QUFBQSxrQkFBRSxHQUFJLFlBQUUsWUFBWSxHQUFFO0FBQUEsa0JBQ25ILDRDQUFDLFlBQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxXQUFXLFNBQVMsV0FBVyxHQUFHLFNBQVMsTUFBTTtBQUFFLG1DQUFlLElBQUk7QUFBQSxrQkFBRSxHQUFJLFlBQUUsY0FBYyxHQUFFO0FBQUEsbUJBQzNIO0FBQUEsaUJBQ0YsSUFFQSw0RUFDRTtBQUFBLDZEQUFDLFNBQUksT0FBTyxPQUFPLGNBQ2pCO0FBQUEsK0RBQUMsU0FBSSxPQUFPLE9BQU8sZUFBZ0I7QUFBQSxnQ0FBWSxlQUFRO0FBQUEsb0JBQUksS0FBSyxXQUFXLE9BQU8sZUFBUTtBQUFBLG9CQUFJLEtBQUs7QUFBQSxxQkFBTTtBQUFBLGtCQUN6Ryw2Q0FBQyxTQUFJLE9BQU8sRUFBRSxTQUFTLFFBQVEsS0FBSyxPQUFPLFlBQVksRUFBRSxHQUN2RDtBQUFBO0FBQUEsc0JBQUM7QUFBQTtBQUFBLHdCQUNDLE9BQU8sRUFBRSxHQUFHLE9BQU8sV0FBVyxTQUFTLFdBQVcsVUFBVSxRQUFRLE9BQU8sS0FBSyxXQUFXLE9BQU8sNENBQTRDLE9BQVU7QUFBQSx3QkFDeEosT0FBTyxLQUFLLFdBQVcsT0FBTyxFQUFFLGFBQWEsSUFBSSxFQUFFLFdBQVc7QUFBQSx3QkFDOUQsU0FBUyxNQUFNO0FBQUUsK0JBQUssY0FBYyxJQUFJO0FBQUEsd0JBQUU7QUFBQSx3QkFDM0M7QUFBQTtBQUFBLG9CQUFFO0FBQUEsb0JBQ0gsNkNBQUMsWUFBTyxPQUFPLEVBQUUsR0FBRyxPQUFPLFdBQVcsU0FBUyxXQUFXLFVBQVUsT0FBTyxHQUFHLE9BQU8sRUFBRSxvQkFBb0IsR0FBRyxTQUFTLE1BQU07QUFBRSxxQ0FBZSxLQUFLLEtBQUs7QUFBRyx1Q0FBaUIsS0FBSyxPQUFPO0FBQUcsc0NBQWdCLEVBQUUsb0JBQW9CLENBQUM7QUFBQSxvQkFBRSxHQUFHO0FBQUE7QUFBQSxzQkFBSSxFQUFFLGdCQUFnQjtBQUFBLHVCQUFFO0FBQUEsb0JBQy9QLDRDQUFDLFlBQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxXQUFXLFNBQVMsV0FBVyxVQUFVLE9BQU8sR0FBRyxTQUFTLE1BQU07QUFBRSxxQ0FBZSxFQUFFLElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxPQUFPLFNBQVMsS0FBSyxTQUFTLE9BQU8sS0FBSyxRQUFRLENBQUMsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO0FBQUEsb0JBQUUsR0FBSSxZQUFFLFlBQVksR0FBRTtBQUFBLG9CQUNqTyw0Q0FBQyxZQUFPLE9BQU8sRUFBRSxHQUFHLE9BQU8sV0FBVyxTQUFTLFdBQVcsVUFBVSxPQUFPLEdBQUcsU0FBUyxNQUFNO0FBQUUsdUNBQWlCLEVBQUUsT0FBTyw4Q0FBVyxTQUFTLFdBQU0sS0FBSyxRQUFRLGtGQUFpQixRQUFRLE1BQU0sV0FBVyxNQUFNO0FBQUUsNkJBQUssV0FBVyxLQUFLLEVBQUU7QUFBQSxzQkFBRSxFQUFFLENBQUM7QUFBQSxvQkFBRSxHQUFHLG9CQUFDO0FBQUEscUJBQ3RQO0FBQUEsbUJBQ0Y7QUFBQSxnQkFDQyxZQUNHLDRDQUFDLFNBQUksT0FBTyxFQUFFLEdBQUcsT0FBTyxhQUFhLEdBQUksUUFBUSxDQUFDLFdBQVcsT0FBTyxZQUFZLENBQUMsRUFBRyxHQUFJLGtDQUF3QixLQUFLLE9BQU8sR0FBRSxJQUM5SCw0Q0FBQyxTQUFJLE9BQU8sRUFBRSxHQUFHLE9BQU8sYUFBYSxHQUFJLFFBQVEsQ0FBQyxXQUFXLE9BQU8sWUFBWSxDQUFDLEVBQUcsR0FBSSxlQUFLLFNBQVE7QUFBQSxnQkFDeEcsUUFDQyw2Q0FBQyxZQUFPLE9BQU8sT0FBTyxTQUFTLFNBQVMsTUFBTTtBQUFFLGtDQUFnQixFQUFFLEdBQUcsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDO0FBQUEsZ0JBQUUsR0FDeEc7QUFBQSw2QkFBVyxFQUFFLGdCQUFnQixJQUFJLEVBQUUsY0FBYztBQUFBLGtCQUFFO0FBQUEsa0JBQUUsS0FBSyxRQUFRO0FBQUEsa0JBQU87QUFBQSxtQkFDNUU7QUFBQSxpQkFFQSxLQUFLLFFBQVEsQ0FBQyxHQUFHLFNBQVMsS0FDMUIsNENBQUMsU0FBSSxPQUFPLEVBQUUsU0FBUyxRQUFRLEtBQUssT0FBTyxVQUFVLFFBQVEsV0FBVyxNQUFNLEdBQzFFLGdCQUFLLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUN0QjtBQUFBLGtCQUFDO0FBQUE7QUFBQSxvQkFFQyxPQUFPLEVBQUUsR0FBRyxPQUFPLE1BQU0sU0FBUyxHQUFHLFFBQVEsV0FBVyxRQUFRLFFBQVEsU0FBUyxXQUFXLGNBQWMsU0FBUyxVQUFVLE9BQU87QUFBQSxvQkFDcEksU0FBUyxNQUFNO0FBQUUsb0NBQWMsR0FBRztBQUFBLG9CQUFFO0FBQUEsb0JBQ3JDO0FBQUE7QUFBQSxzQkFBRTtBQUFBO0FBQUE7QUFBQSxrQkFISTtBQUFBLGdCQUdBLENBQ1IsR0FDSDtBQUFBLGdCQUVGLDZDQUFDLFNBQUksT0FBTyxPQUFPLFVBQ2pCO0FBQUEsOERBQUMsVUFBTSxjQUFJLEtBQUssS0FBSyxTQUFTLEVBQUUsZUFBZSxHQUFFO0FBQUEsa0JBQ2hELEtBQUssY0FBYyxVQUFhLEtBQUssWUFBWSxLQUFLLFlBQVksT0FDakUsNkNBQUMsVUFBSztBQUFBO0FBQUEsb0JBQUUsRUFBRSxnQkFBZ0I7QUFBQSxvQkFBRTtBQUFBLG9CQUFFLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRSxlQUFlO0FBQUEsb0JBQUU7QUFBQSxxQkFBQztBQUFBLGtCQUUxRSxhQUFhLDRDQUFDLFVBQUssT0FBTyxPQUFPLE1BQU0sU0FBUyxHQUFJLFlBQUUsa0JBQWtCLEdBQUU7QUFBQSxrQkFDMUUsS0FBSyxRQUFRLFVBQWEsS0FBSyxRQUFRLGFBQ3RDLDRDQUFDLFVBQUssT0FBTyxPQUFPLE1BQU0sU0FBUyxHQUFJLGVBQUssUUFBUSxZQUFZLEVBQUUsY0FBYyxJQUFJLEtBQUssSUFBSSxNQUFNLEdBQUcsQ0FBQyxHQUFFO0FBQUEsbUJBRTdHO0FBQUEsaUJBQ0Y7QUFBQTtBQUFBLFlBNURHLEtBQUs7QUFBQSxVQThEWjtBQUFBLFFBRUosQ0FBQztBQUFBLE1BQ0gsR0FBRztBQUFBLE9BQ0w7QUFBQSxJQUNBLDZDQUFDLFFBQUssT0FBTyxFQUFFLGtCQUFrQixLQUFLLFlBQVksT0FBTyxXQUFRLFFBQVEsT0FBTyxLQUU5RTtBQUFBLG1EQUFDLFNBQUksT0FBTyxFQUFFLFNBQVMsUUFBUSxLQUFLLE9BQU8sWUFBWSxVQUFVLFVBQVUsUUFBUSxjQUFjLE9BQU8sU0FBUyxZQUFZLFFBQVEseURBQXlELGNBQWMsTUFBTSxHQUNoTjtBQUFBLHFEQUFDLFVBQUssT0FBTyxFQUFFLFVBQVUsT0FBTyxHQUFHO0FBQUE7QUFBQSxVQUFJLEVBQUUscUJBQXFCO0FBQUEsVUFBRTtBQUFBLFVBQUMsNENBQUMsT0FBRyx3QkFBYyxVQUFVLE9BQU8sT0FBTyxhQUFhLFNBQVMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUU7QUFBQSxXQUFJO0FBQUEsUUFDM0ssY0FBYyxVQUFVLFFBQVEsNENBQUMsVUFBSyxPQUFPLE9BQU8sTUFBTSxTQUFTLEdBQUksdUJBQWEsUUFBTztBQUFBLFNBQzFGLGNBQWMsZUFBZSxLQUFLLEtBQ2xDLDRDQUFDLFVBQUssT0FBTyxFQUFFLFVBQVUsUUFBUSxPQUFPLFVBQVUsR0FBSSxZQUFFLGVBQWUsRUFBRSxRQUFRLE9BQU8sT0FBTyxjQUFjLGVBQWUsQ0FBQyxDQUFDLEdBQUU7QUFBQSxRQUVsSSw0Q0FBQyxVQUFLLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRztBQUFBLFFBQzFCLDRDQUFDLFlBQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxXQUFXLFNBQVMsWUFBWSxVQUFVLE9BQU8sR0FBRyxVQUFVLGVBQWUsU0FBUyxNQUFNO0FBQUUsZUFBSyxhQUFhO0FBQUEsUUFBRSxHQUMxSSwwQkFBZ0IsRUFBRSxnQkFBZ0IsSUFBSSxlQUFRLEVBQUUsYUFBYSxHQUNoRTtBQUFBLFNBQ0Y7QUFBQSxNQUNDLGVBQWUsUUFDZCw2Q0FBQyxTQUFJLE9BQU8sRUFBRSxjQUFjLFFBQVEsU0FBUyxZQUFZLGNBQWMsT0FBTyxZQUFZLFdBQVcsT0FBTyxRQUFRLHlCQUF5Qix5QkFBeUIsUUFBUSxnQkFBZ0IsV0FBVyxPQUFPLFFBQVEsd0JBQXdCLHdCQUF3QixHQUN0UTtBQUFBLG9EQUFDLFNBQUksT0FBTyxFQUFFLFVBQVUsUUFBUSxZQUFZLElBQUksR0FBSSxxQkFBVyxPQUFPLFFBQVEsWUFBTyxFQUFFLG1CQUFtQixJQUFJLGFBQVEsV0FBVyxXQUFXLEtBQUk7QUFBQSxRQUMvSSxXQUFXLE9BQU8sVUFBVSxXQUFXLGtCQUFrQixDQUFDLEdBQUcsU0FBUyxLQUNyRSw2Q0FBQyxTQUFJLE9BQU8sRUFBRSxXQUFXLE1BQU0sR0FDN0I7QUFBQSxzREFBQyxTQUFJLE9BQU8sRUFBRSxVQUFVLFFBQVEsWUFBWSxJQUFJLEdBQUksWUFBRSxtQkFBbUIsR0FBRTtBQUFBLFdBQ3pFLFdBQVcsa0JBQWtCLENBQUMsR0FBRyxJQUFJLENBQUMsYUFDdEMsNkNBQUMsU0FBc0IsT0FBTyxFQUFFLFNBQVMsUUFBUSxLQUFLLE9BQU8sWUFBWSxVQUFVLFdBQVcsT0FBTyxVQUFVLE9BQU8sR0FDcEg7QUFBQSx5REFBQyxVQUFLLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBSTtBQUFBLHVCQUFTO0FBQUEsY0FBTTtBQUFBLGNBQUssU0FBUztBQUFBLGVBQU87QUFBQSxZQUMvRCw0Q0FBQyxZQUFPLE9BQU8sRUFBRSxHQUFHLE9BQU8sV0FBVyxTQUFTLFdBQVcsVUFBVSxPQUFPLEdBQUcsU0FBUyxNQUFNO0FBQUUsbUJBQUssVUFBVSxDQUFDLFNBQVMsRUFBRSxHQUFHLFlBQVk7QUFBQSxZQUFFLEdBQUksWUFBRSxrQkFBa0IsR0FBRTtBQUFBLFlBQ3JLLDRDQUFDLFlBQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxXQUFXLFNBQVMsV0FBVyxVQUFVLE9BQU8sR0FBRyxTQUFTLE1BQU07QUFBRSxtQkFBSyxVQUFVLENBQUMsU0FBUyxFQUFFLEdBQUcsU0FBUztBQUFBLFlBQUUsR0FBSSxZQUFFLG1CQUFtQixHQUFFO0FBQUEsWUFDbkssNENBQUMsWUFBTyxPQUFPLEVBQUUsR0FBRyxPQUFPLFdBQVcsU0FBUyxXQUFXLFVBQVUsT0FBTyxHQUFHLFNBQVMsTUFBTTtBQUFFLDRCQUFjLENBQUMsYUFBYSxhQUFhLE9BQU8sT0FBTyxFQUFFLEdBQUcsVUFBVSxpQkFBaUIsU0FBUyxrQkFBa0IsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEtBQUssT0FBTyxTQUFTLEVBQUUsRUFBRSxDQUFDO0FBQUEsWUFBRSxHQUFJLFlBQUUsbUJBQW1CLEdBQUU7QUFBQSxlQUpyUixTQUFTLEVBS25CLENBQ0Q7QUFBQSxXQUNIO0FBQUEsUUFFRCxXQUFXLE9BQU8sVUFBVSxXQUFXLGlCQUFpQixDQUFDLEdBQUcsU0FBUyxLQUNwRSw2Q0FBQyxTQUFJLE9BQU8sRUFBRSxXQUFXLE9BQU8sVUFBVSxPQUFPLEdBQy9DO0FBQUEsc0RBQUMsVUFBSyxPQUFPLEVBQUUsWUFBWSxJQUFJLEdBQUksWUFBRSxzQkFBc0IsR0FBRTtBQUFBLFdBQzNELFdBQVcsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxVQUFVLDZDQUFDLFNBQWdCO0FBQUE7QUFBQSxZQUFJLFVBQVU7QUFBQSxZQUFLO0FBQUEsWUFBRyxVQUFVO0FBQUEsZUFBdkMsS0FBNkMsQ0FBTTtBQUFBLFdBQzNIO0FBQUEsUUFFRiw0Q0FBQyxZQUFPLE9BQU8sRUFBRSxHQUFHLE9BQU8sU0FBUyxXQUFXLE1BQU0sR0FBRyxTQUFTLE1BQU07QUFBRSx3QkFBYyxJQUFJO0FBQUEsUUFBRSxHQUFJLFlBQUUsb0JBQW9CLEdBQUU7QUFBQSxTQUMzSDtBQUFBLE1BR0YsNkNBQUMsU0FBSSxPQUFPLE9BQU8sU0FDakI7QUFBQSxvREFBQyxXQUFNLE9BQU8sT0FBTyxPQUFPLGFBQWEsRUFBRSxrQkFBa0IsR0FBRyxPQUFPLGFBQWEsVUFBVSxDQUFDLE1BQU07QUFBRSx5QkFBZSxFQUFFLE9BQU8sS0FBSztBQUFBLFFBQUUsR0FBRztBQUFBLFFBQ3pJLDRDQUFDLFlBQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxPQUFPLE9BQU8sT0FBTyxHQUFHLE9BQU8sWUFBWSxVQUFVLENBQUMsTUFBTTtBQUFFLHdCQUFjLEVBQUUsT0FBTyxLQUFLO0FBQUEsUUFBRSxHQUNwSCxpQkFBTyxRQUFRLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxNQUFNLDRDQUFDLFlBQW1CLE9BQWUsbUJBQXRCLEtBQTRCLENBQVMsR0FDaEg7QUFBQSxRQUNBLDZDQUFDLFlBQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxPQUFPLE9BQU8sT0FBTyxHQUFHLE9BQU8sYUFBYSxVQUFVLENBQUMsTUFBTTtBQUFFLHlCQUFlLEVBQUUsT0FBTyxLQUE2QjtBQUFBLFFBQUUsR0FDL0k7QUFBQSxzREFBQyxZQUFPLE9BQU0sV0FBVyxZQUFFLHFCQUFxQixHQUFFO0FBQUEsVUFDbEQsNENBQUMsWUFBTyxPQUFNLFVBQVUsWUFBRSxvQkFBb0IsR0FBRTtBQUFBLFdBQ2xEO0FBQUEsUUFDQSw0Q0FBQyxjQUFTLE9BQU8sT0FBTyxVQUFVLE1BQU0sR0FBRyxhQUFhLEVBQUUsb0JBQW9CLEdBQUcsT0FBTyxlQUFlLFVBQVUsQ0FBQyxNQUFNO0FBQUUsMkJBQWlCLEVBQUUsT0FBTyxLQUFLO0FBQUEsUUFBRSxHQUFHO0FBQUEsUUFDOUosNENBQUMsU0FDQztBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQU8sT0FBTyxPQUFPO0FBQUEsWUFBUSxVQUFVLFNBQVMsUUFBUSxZQUFZLEtBQUssTUFBTSxNQUFNLGNBQWMsS0FBSyxNQUFNO0FBQUEsWUFDN0csU0FBUyxNQUFNO0FBQUUsbUJBQUssVUFBVSxnQkFBZ0IsK0JBQStCLEVBQUUsWUFBWSxPQUFPLGFBQWEsT0FBTyxZQUFZLEtBQUssR0FBRyxTQUFTLGNBQWMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLFlBQVk7QUFBRSwrQkFBZSxFQUFFO0FBQUcsaUNBQWlCLEVBQUU7QUFBRyxzQkFBTSxhQUFhO0FBQUEsY0FBRSxDQUFDO0FBQUEsWUFBRTtBQUFBLFlBQ2pRLG1CQUFTLGlCQUFpQixFQUFFLGdCQUFnQixJQUFJLEVBQUUsZUFBZTtBQUFBO0FBQUEsUUFDcEUsR0FDRjtBQUFBLFNBQ0Y7QUFBQSxPQUNFLE1BQU07QUFDTixjQUFNLE1BQU0sY0FBYyxZQUFZLENBQUM7QUFDdkMsY0FBTSxVQUFVLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLG9CQUFvQixPQUFPLFdBQVcsUUFBUTtBQUM3RixjQUFNLFNBQVMsSUFBSSxPQUFPLENBQUMsV0FBVyxPQUFPLFdBQVcsUUFBUTtBQUNoRSxjQUFNLFVBQVUsb0JBQUksSUFBMkI7QUFDL0MsbUJBQVcsVUFBVSxRQUFRO0FBQzNCLGdCQUFNLE9BQU8sUUFBUSxJQUFJLE9BQU8sSUFBSSxLQUFLLENBQUM7QUFDMUMsZUFBSyxLQUFLLE1BQU07QUFDaEIsa0JBQVEsSUFBSSxPQUFPLE1BQU0sSUFBSTtBQUFBLFFBQy9CO0FBQ0EsZUFDRSw0RUFDRztBQUFBLGtCQUFRLFNBQVMsS0FDaEIsNkNBQUMsU0FBSSxPQUFPLEVBQUUsY0FBYyxPQUFPLEdBQ2pDO0FBQUEseURBQUMsU0FBSSxPQUFPLEVBQUUsR0FBRyxPQUFPLGNBQWMsT0FBTywwQ0FBMEMsR0FBRztBQUFBO0FBQUEsY0FBRyxFQUFFLHFCQUFxQjtBQUFBLGNBQUU7QUFBQSxjQUFFLE9BQU8sUUFBUSxNQUFNO0FBQUEsY0FBRTtBQUFBLGVBQUM7QUFBQSxZQUMvSSxRQUFRLElBQUksQ0FBQyxXQUNaLDZDQUFDLFNBQW9CLE9BQU8sRUFBRSxHQUFHLE9BQU8sVUFBVSxhQUFhLHVCQUF1QixZQUFZLHVCQUF1QixHQUN2SDtBQUFBLDJEQUFDLFNBQUksT0FBTyxPQUFPLGNBQ2pCO0FBQUEsNERBQUMsU0FBSSxPQUFPLE9BQU8sZUFBZ0IsaUJBQU8sT0FBTTtBQUFBLGdCQUNoRCw2Q0FBQyxTQUFJLE9BQU8sRUFBRSxTQUFTLFFBQVEsS0FBSyxPQUFPLFlBQVksRUFBRSxHQUN2RDtBQUFBLDhEQUFDLFlBQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxRQUFRLFNBQVMsV0FBVyxVQUFVLE9BQU8sR0FBRyxTQUFTLE1BQU07QUFBRSx5QkFBSyxjQUFjLE9BQU8sRUFBRSxFQUFFLEtBQUssTUFBTTtBQUFFLDJCQUFLLGFBQWE7QUFBQSxvQkFBRSxDQUFDO0FBQUEsa0JBQUUsR0FBSSxZQUFFLGdCQUFnQixHQUFFO0FBQUEsa0JBQ3RMLDRDQUFDLFlBQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxXQUFXLFNBQVMsV0FBVyxVQUFVLE9BQU8sR0FBRyxTQUFTLE1BQU07QUFBRSx5QkFBSyxhQUFhLFVBQVUsRUFBRSxJQUFJLE9BQU8sSUFBSSxRQUFRLFdBQVcsQ0FBQztBQUFBLGtCQUFFLEdBQUksWUFBRSxtQkFBbUIsR0FBRTtBQUFBLG1CQUMvTDtBQUFBLGlCQUNGO0FBQUEsY0FDQSw0Q0FBQyxTQUFJLE9BQU8sT0FBTyxhQUFjLGlCQUFPLFNBQVE7QUFBQSxjQUNoRCw2Q0FBQyxTQUFJLE9BQU8sT0FBTyxVQUNqQjtBQUFBLDREQUFDLFVBQUssT0FBTyxPQUFPLE1BQU0sc0JBQXNCLEdBQUksK0JBQXFCLE9BQU8sU0FBUyxLQUFLLE9BQU8sV0FBVTtBQUFBLGdCQUM5RyxPQUFPLGFBQWEsUUFBUSw0Q0FBQyxVQUFLLE9BQU8sT0FBTyxNQUFNLFNBQVMsR0FBSSxpQkFBTyxTQUFTLE1BQU0sR0FBRyxDQUFDLEdBQUU7QUFBQSxpQkFDbEc7QUFBQSxpQkFaUSxPQUFPLEVBYWpCLENBQ0Q7QUFBQSxhQUNIO0FBQUEsVUFFRCxDQUFDLEdBQUcsUUFBUSxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFDdkMsNkNBQUMsU0FBZSxPQUFPLEVBQUUsY0FBYyxPQUFPLEdBQzVDO0FBQUEseURBQUMsU0FBSSxPQUFPLE9BQU8sY0FBZTtBQUFBLGlDQUFtQixJQUFJLEtBQUs7QUFBQSxjQUFLO0FBQUEsY0FBRSxPQUFPLE1BQU0sTUFBTTtBQUFBLGNBQUU7QUFBQSxlQUFDO0FBQUEsWUFDMUYsTUFBTSxJQUFJLENBQUMsV0FDViw2Q0FBQyxTQUFvQixPQUFPLEVBQUUsR0FBRyxPQUFPLFVBQVUsU0FBUyxPQUFPLFdBQVcsV0FBVyxJQUFJLElBQUksR0FDOUY7QUFBQSwyREFBQyxTQUFJLE9BQU8sT0FBTyxjQUNqQjtBQUFBLDZEQUFDLFNBQUksT0FBTyxPQUFPLGVBQWdCO0FBQUEseUJBQU8sbUJBQW1CLFlBQU87QUFBQSxrQkFBSSxPQUFPO0FBQUEsbUJBQU07QUFBQSxnQkFDckYsNkNBQUMsU0FBSSxPQUFPLEVBQUUsU0FBUyxRQUFRLEtBQUssT0FBTyxZQUFZLEdBQUcsVUFBVSxRQUFRLGdCQUFnQixXQUFXLEdBQ3BHO0FBQUEsbUJBQUMsT0FBTyxvQkFBb0IsT0FBTyxXQUFXLFdBQzNDLDRDQUFDLFlBQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxRQUFRLFNBQVMsV0FBVyxVQUFVLE9BQU8sR0FBRyxTQUFTLE1BQU07QUFBRSx5QkFBSyxjQUFjLE9BQU8sRUFBRSxFQUFFLEtBQUssTUFBTTtBQUFFLDJCQUFLLGFBQWE7QUFBQSxvQkFBRSxDQUFDO0FBQUEsa0JBQUUsR0FBSSxZQUFFLGdCQUFnQixHQUFFLElBQ3RMO0FBQUEsa0JBQ0osNkNBQUMsWUFBTyxPQUFPLEVBQUUsR0FBRyxPQUFPLFdBQVcsU0FBUyxXQUFXLFVBQVUsT0FBTyxHQUFHLFNBQVMsTUFBTTtBQUFFLHlCQUFLLGFBQWEsTUFBTTtBQUFBLGtCQUFFLEdBQUc7QUFBQTtBQUFBLG9CQUFJLEVBQUUsZUFBZTtBQUFBLHFCQUFFO0FBQUEsa0JBQ2xKLE9BQU8sVUFBVSxZQUFZLDZDQUFDLFlBQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxXQUFXLFNBQVMsV0FBVyxVQUFVLE9BQU8sR0FBRyxTQUFTLE1BQU07QUFBRSx5QkFBSyxhQUFhLGFBQWEsRUFBRSxJQUFJLE9BQU8sR0FBRyxDQUFDO0FBQUEsa0JBQUUsR0FBRztBQUFBO0FBQUEsb0JBQUcsRUFBRSxrQkFBa0I7QUFBQSxxQkFBRTtBQUFBLGtCQUMxTSxPQUFPLFdBQVcsV0FDZiw0Q0FBQyxZQUFPLE9BQU8sRUFBRSxHQUFHLE9BQU8sV0FBVyxTQUFTLFdBQVcsVUFBVSxPQUFPLEdBQUcsU0FBUyxNQUFNO0FBQUUseUJBQUssYUFBYSxVQUFVLEVBQUUsSUFBSSxPQUFPLElBQUksUUFBUSxXQUFXLENBQUM7QUFBQSxrQkFBRSxHQUFJLFlBQUUsbUJBQW1CLEdBQUUsSUFDN0wsNENBQUMsWUFBTyxPQUFPLEVBQUUsR0FBRyxPQUFPLFdBQVcsU0FBUyxXQUFXLFVBQVUsT0FBTyxHQUFHLFNBQVMsTUFBTTtBQUFFLHlCQUFLLGFBQWEsVUFBVSxFQUFFLElBQUksT0FBTyxJQUFJLFFBQVEsU0FBUyxDQUFDO0FBQUEsa0JBQUUsR0FBSSxZQUFFLGdCQUFnQixHQUFFO0FBQUEsbUJBQzlMO0FBQUEsaUJBQ0Y7QUFBQSxjQUNBLDRDQUFDLFNBQUksT0FBTyxFQUFFLEdBQUcsT0FBTyxhQUFhLFdBQVcsSUFBSSxVQUFVLFNBQVMsR0FBSSxpQkFBTyxTQUFRO0FBQUEsY0FDMUYsNkNBQUMsU0FBSSxPQUFPLE9BQU8sVUFDaEI7QUFBQSx1QkFBTyxXQUFXLFdBQVcsNENBQUMsVUFBSyxPQUFPLE9BQU8sTUFBTSxTQUFTLEdBQUksWUFBRSxvQkFBb0IsR0FBRTtBQUFBLGdCQUM1RixPQUFPLFVBQVUsWUFBWSxPQUFPLGNBQWMsUUFBUSw2Q0FBQyxVQUFLLE9BQU8sT0FBTyxNQUFNLFNBQVMsR0FBRztBQUFBO0FBQUEsa0JBQUcsT0FBTztBQUFBLG1CQUFVO0FBQUEsZ0JBQ3JILDRDQUFDLFVBQUssT0FBTyxPQUFPLE1BQU0sc0JBQXNCLEdBQUksK0JBQXFCLE9BQU8sU0FBUyxLQUFLLE9BQU8sV0FBVTtBQUFBLGdCQUM5RyxPQUFPLGFBQWEsUUFBUSw0Q0FBQyxVQUFLLE9BQU8sT0FBTyxNQUFNLFNBQVMsR0FBSSxpQkFBTyxTQUFTLE1BQU0sR0FBRyxDQUFDLEdBQUU7QUFBQSxnQkFDaEcsNENBQUMsVUFBTSxjQUFJLEtBQUssT0FBTyxTQUFTLEVBQUUsZUFBZSxHQUFFO0FBQUEsaUJBQ3JEO0FBQUEsaUJBckJRLE9BQU8sRUFzQmpCLENBQ0Q7QUFBQSxlQTFCTyxJQTJCVixDQUNEO0FBQUEsVUFDQSxJQUFJLFdBQVcsS0FBSyw0Q0FBQyxTQUFJLE9BQU8sT0FBTyxPQUFRLFlBQUUsY0FBYyxHQUFFO0FBQUEsV0FDcEU7QUFBQSxNQUVKLEdBQUc7QUFBQSxPQUNMO0FBQUEsSUFDQSw0Q0FBQyxRQUFLLE9BQU8sRUFBRSxnQkFBZ0IsR0FDNUIsbUJBQVMsV0FBVyxJQUNuQiw0Q0FBQyxTQUFJLE9BQU8sT0FBTyxPQUFRLFlBQUUsZUFBZSxHQUFFLElBRTlDLDZDQUFDLFdBQU0sT0FBTyxPQUFPLE9BQ25CO0FBQUEsa0RBQUMsV0FDQyxzREFBQyxRQUFJLFdBQUMscUJBQXFCLHlCQUF5QixvQkFBb0IsRUFBRSxJQUFJLENBQUMsUUFBUSw0Q0FBQyxRQUFhLE9BQU8sT0FBTyxJQUFLLFlBQUUsR0FBRyxLQUE3QixHQUErQixDQUFLLEdBQUUsR0FDeEk7QUFBQSxNQUNBLDRDQUFDLFdBQ0UsbUJBQVMsSUFBSSxDQUFDLFlBQ2IsNkNBQUMsUUFDQztBQUFBLG9EQUFDLFFBQUcsT0FBTyxPQUFPLElBQUssa0JBQVEsTUFBSztBQUFBLFFBQ3BDLDRDQUFDLFFBQUcsT0FBTyxPQUFPLElBQUssa0JBQVEsVUFBUztBQUFBLFFBQ3hDLDRDQUFDLFFBQUcsT0FBTyxPQUFPLElBQUssaUJBQU8sUUFBUSxXQUFXLEdBQUU7QUFBQSxXQUg1QyxRQUFRLEVBSWpCLENBQ0QsR0FDSDtBQUFBLE9BQ0YsR0FFSjtBQUFBLEtBQ0Y7QUFJRixRQUFNLFlBQ0osNEVBQ0c7QUFBQTtBQUFBLElBQ0QsNENBQUMsUUFBSyxPQUFPLEVBQUUscUJBQXFCLEdBQ2hDLGlCQUFNO0FBQ04sWUFBTSxPQUFPLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxPQUFPLFVBQVUsdUJBQXVCLE1BQU0sUUFBUSxFQUFFLEVBQUU7QUFDOUcsWUFBTSxZQUFZLElBQUksT0FBTyxDQUFDLFVBQVUsTUFBTSxXQUFXLFVBQVUsTUFBTSxXQUFXLFFBQVEsRUFBRTtBQUM5RixZQUFNLFNBQStEO0FBQUEsUUFDbkUsRUFBRSxLQUFLLElBQUksT0FBTyxFQUFFLGtCQUFrQixHQUFHLE9BQU8sSUFBSSxPQUFPO0FBQUEsUUFDM0QsRUFBRSxLQUFLLFlBQVksT0FBTyxZQUFZLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxNQUFNLGFBQWEsY0FBYyxNQUFNLGFBQWEsU0FBUyxFQUFFLE9BQU87QUFBQSxRQUN6SSxFQUFFLEtBQUssU0FBUyxPQUFPLFNBQVMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE1BQU0sYUFBYSxPQUFPLEVBQUUsT0FBTztBQUFBLFFBQ2hHLEVBQUUsS0FBSyxTQUFTLE9BQU8sU0FBUyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsTUFBTSxhQUFhLE9BQU8sRUFBRSxPQUFPO0FBQUEsUUFDaEcsRUFBRSxLQUFLLFFBQVEsT0FBTyxRQUFRLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxNQUFNLGFBQWEsTUFBTSxFQUFFLE9BQU87QUFBQSxNQUMvRjtBQUNBLFlBQU0sVUFBVSxJQUNiLE9BQU8sQ0FBQyxVQUFVO0FBQ2pCLFlBQUksd0JBQXdCLEdBQUksUUFBTztBQUN2QyxZQUFJLHdCQUF3QixXQUFZLFFBQU8sTUFBTSxhQUFhLGNBQWMsTUFBTSxhQUFhO0FBQ25HLGVBQU8sTUFBTSxhQUFhO0FBQUEsTUFDNUIsQ0FBQyxFQUNBLE9BQU8sQ0FBQyxVQUFVLHNCQUFzQixNQUFNLE1BQU0sV0FBVyxpQkFBaUI7QUFDbkYsYUFDRSw0RUFDRTtBQUFBLHFEQUFDLFNBQUksT0FBTyxFQUFFLFNBQVMsUUFBUSxLQUFLLE9BQU8sWUFBWSxVQUFVLFVBQVUsUUFBUSxjQUFjLE9BQU8sR0FDckc7QUFBQSxpQkFBTyxJQUFJLENBQUMsU0FDWDtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQWdELE9BQU8sT0FBTyxLQUFLLHdCQUF3QixLQUFLLEdBQUc7QUFBQSxjQUNsRyxTQUFTLE1BQU07QUFBRSx1Q0FBdUIsS0FBSyxHQUFHO0FBQUEsY0FBRTtBQUFBLGNBQ2pEO0FBQUEscUJBQUs7QUFBQSxnQkFBTTtBQUFBLGdCQUFJLEtBQUs7QUFBQTtBQUFBO0FBQUEsWUFGVixLQUFLLFFBQVEsS0FBSyxRQUFRLEtBQUs7QUFBQSxVQUc1QyxDQUNEO0FBQUEsVUFDRCw0Q0FBQyxVQUFLLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRztBQUFBLFVBQzFCLDZDQUFDLFVBQUssT0FBTyxFQUFFLFVBQVUsUUFBUSxPQUFPLDRDQUE0QyxHQUNqRjtBQUFBO0FBQUEsWUFBVTtBQUFBLFlBQVUsSUFBSTtBQUFBLGFBQ3ZCLE9BQU8sOEJBQThCLEtBQUssSUFBSSxTQUFNLEVBQUUsc0JBQXNCLEVBQUUsUUFBUSxVQUFVLE9BQU8sT0FBTyw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsS0FBSztBQUFBLGFBQ3hKO0FBQUEsVUFDQSw2Q0FBQyxZQUFPLE9BQU8sRUFBRSxHQUFHLE9BQU8sT0FBTyxPQUFPLFFBQVEsU0FBUyxVQUFVLEdBQUcsT0FBTyxtQkFBbUIsVUFBVSxDQUFDLE1BQU07QUFBRSxpQ0FBcUIsRUFBRSxPQUFPLEtBQUs7QUFBQSxVQUFFLEdBQ3ZKO0FBQUEsd0RBQUMsWUFBTyxPQUFNLElBQUksWUFBRSxrQkFBa0IsR0FBRTtBQUFBLFlBQ3ZDLE9BQU8sUUFBUSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssTUFBTSw0Q0FBQyxZQUFtQixPQUFlLG1CQUF0QixLQUE0QixDQUFTO0FBQUEsYUFDakg7QUFBQSxVQUNBLDRDQUFDLFlBQU8sT0FBTyxPQUFPLFdBQVcsU0FBUyxNQUFNO0FBQUUsaUJBQUssV0FBVztBQUFBLFVBQUUsR0FBSSxZQUFFLGdCQUFnQixHQUFFO0FBQUEsV0FDOUY7QUFBQSxRQUNDLElBQUksV0FBVyxJQUNkLDRDQUFDLFNBQUksT0FBTyxPQUFPLE9BQVEseUJBQWUsT0FBTyxXQUFNLEVBQUUscUJBQXFCLEdBQUUsSUFDOUUsUUFBUSxXQUFXLElBQ3JCLDRDQUFDLFNBQUksT0FBTyxPQUFPLE9BQVEsWUFBRSxtQkFBbUIsR0FBRSxJQUNoRCxRQUFRLElBQUksQ0FBQyxVQUFVO0FBQ3pCLGdCQUFNLFdBQVcsY0FBYyxNQUFNLEVBQUUsTUFBTTtBQUM3QyxnQkFBTSxjQUFjLE1BQU0sZUFBZTtBQUN6QyxnQkFBTSxPQUFPLFlBQVksU0FBUztBQUNsQyxpQkFDRSw2Q0FBQyxTQUFtQixPQUFPLE9BQU8sVUFDaEM7QUFBQSx5REFBQyxTQUFJLE9BQU8sT0FBTyxjQUNqQjtBQUFBLDJEQUFDLFNBQUksT0FBTyxFQUFFLFNBQVMsUUFBUSxLQUFLLE9BQU8sWUFBWSxVQUFVLFVBQVUsT0FBTyxHQUNoRjtBQUFBLDREQUFDLFVBQUssT0FBTyxPQUFPLE1BQU0sY0FBYyxNQUFNLFFBQVEsQ0FBQyxHQUFJLGdCQUFNLFVBQVM7QUFBQSxnQkFDekUsTUFBTSxXQUFXLDRDQUFDLFVBQUssT0FBTyxPQUFPLE1BQU0sU0FBUyxHQUFJLGdCQUFNLFVBQVMsSUFBVTtBQUFBLGdCQUNsRiw0Q0FBQyxVQUFLLE9BQU8sT0FBTyxNQUFNLE1BQU0sV0FBVyxVQUFVLE1BQU0sV0FBVyxXQUFXLFlBQVksTUFBTSxXQUFXLGNBQWMsTUFBTSxXQUFXLGFBQWEsWUFBWSxTQUFTLEdBQzVLLDhCQUFvQixNQUFNLE1BQU0sS0FBSyxNQUFNLFFBQzlDO0FBQUEsZ0JBQ0EsNENBQUMsVUFBSyxPQUFPLE9BQU8sZUFBZ0IsZ0JBQU0sT0FBTTtBQUFBLGlCQUNsRDtBQUFBLGNBQ0EsNENBQUMsU0FBSSxPQUFPLEVBQUUsU0FBUyxRQUFRLEtBQUssT0FBTyxZQUFZLEVBQUUsR0FDckQsaUJBQU0sV0FBVyxVQUFVLE1BQU0sV0FBVyxhQUM1QztBQUFBLGdCQUFDO0FBQUE7QUFBQSxrQkFDQyxPQUFPLEVBQUUsR0FBRyxPQUFPLFdBQVcsU0FBUyxXQUFXLFVBQVUsT0FBTztBQUFBLGtCQUNuRSxVQUFVLG9CQUFvQjtBQUFBLGtCQUM5QixPQUFPLEVBQUUsbUJBQW1CO0FBQUEsa0JBQzVCLFNBQVMsTUFBTTtBQUFFLHlCQUFLLGFBQWEsTUFBTSxRQUFRO0FBQUEsa0JBQUU7QUFBQSxrQkFDbkQsOEJBQW9CLE1BQU0sV0FBVyxFQUFFLHNCQUFzQixJQUFJLGVBQVEsRUFBRSxlQUFlO0FBQUE7QUFBQSxjQUFFLEdBRWxHO0FBQUEsZUFDRjtBQUFBLFlBQ0MsZ0JBQWdCLE1BQ2YsNENBQUMsU0FBSSxPQUFPLEVBQUUsR0FBRyxPQUFPLGFBQWEsR0FBSSxRQUFRLENBQUMsV0FBVyxPQUFPLFlBQVksQ0FBQyxFQUFHLEdBQUksdUJBQVk7QUFBQSxZQUVyRyxNQUFNLGFBQ0wsNkNBQUMsU0FBSSxPQUFPLEVBQUUsV0FBVyxPQUFPLFNBQVMsWUFBWSxjQUFjLE9BQU8sWUFBWSw0QkFBNEIsUUFBUSxzQ0FBc0MsVUFBVSxRQUFRLE9BQU8sMENBQTBDLEdBQUc7QUFBQTtBQUFBLGNBQ2pPLE1BQU07QUFBQSxlQUNYLElBQ0U7QUFBQSxhQUNGLE1BQU0sWUFBWSxRQUFRLFFBQVEsTUFBTSxPQUFPLE1BQy9DLDRFQUNFO0FBQUE7QUFBQSxnQkFBQztBQUFBO0FBQUEsa0JBQ0MsT0FBTyxFQUFFLEdBQUcsT0FBTyxTQUFTLFdBQVcsT0FBTyxTQUFTLFFBQVE7QUFBQSxrQkFDL0QsU0FBUyxNQUFNO0FBQUUsbUNBQWUsQ0FBQyxjQUFjLEVBQUUsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLE1BQU0sRUFBRSxNQUFNLE1BQU0sRUFBRTtBQUFBLGtCQUFFO0FBQUEsa0JBQzlHO0FBQUE7QUFBQSxvQkFDSyxFQUFFLGtCQUFrQjtBQUFBLG9CQUFFO0FBQUEsb0JBQUUsT0FBTyxNQUFNLFVBQVUsU0FBUyxDQUFDO0FBQUEsb0JBQUU7QUFBQSxvQkFBRSxFQUFFLHFCQUFxQjtBQUFBLG9CQUFFO0FBQUEsb0JBQUssT0FBTyxNQUFNLFVBQVUsY0FBYyxDQUFDO0FBQUEsb0JBQUU7QUFBQSxvQkFBRyxPQUFPLE1BQU0sVUFBVSxhQUFhLENBQUM7QUFBQSxvQkFBRTtBQUFBLG9CQUFFLFlBQVksTUFBTSxFQUFFLE1BQU0sT0FBTyxXQUFNO0FBQUE7QUFBQTtBQUFBLGNBQzVOO0FBQUEsY0FDQyxZQUFZLE1BQU0sRUFBRSxNQUFNLFFBQ3pCLDZDQUFDLFNBQUksT0FBTyxFQUFFLFdBQVcsT0FBTyxRQUFRLHlEQUF5RCxjQUFjLE9BQU8sU0FBUyxXQUFXLEdBQ3RJO0FBQUEsdUJBQU0sWUFBWSxDQUFDLEdBQUcsU0FBUyxLQUMvQiw2Q0FBQyxTQUFJLE9BQU8sRUFBRSxjQUFjLE1BQU0sR0FDaEM7QUFBQSw4REFBQyxTQUFJLE9BQU8sRUFBRSxVQUFVLFFBQVEsWUFBWSxLQUFLLGNBQWMsTUFBTSxHQUFJLFlBQUUsaUJBQWlCLEdBQUU7QUFBQSxtQkFDNUYsTUFBTSxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsU0FDM0IsNENBQUMsU0FBZSxPQUFPLEVBQUUsWUFBWSx1REFBdUQsVUFBVSxPQUFPLEdBQUksa0JBQXZHLElBQTRHLENBQ3ZIO0FBQUEsbUJBQ0g7QUFBQSxpQkFFQSxNQUFNLGFBQWEsQ0FBQyxHQUFHLFNBQVMsS0FDaEMsNkNBQUMsU0FBSSxPQUFPLEVBQUUsY0FBYyxNQUFNLEdBQ2hDO0FBQUEsOERBQUMsU0FBSSxPQUFPLEVBQUUsVUFBVSxRQUFRLFlBQVksS0FBSyxjQUFjLE1BQU0sR0FBSSxZQUFFLGtCQUFrQixHQUFFO0FBQUEsa0JBQzlGLE1BQU0sVUFBVSxJQUFJLENBQUMsVUFDcEIsNkNBQUMsU0FBdUIsT0FBTyxFQUFFLGNBQWMsTUFBTSxHQUNuRDtBQUFBLGlFQUFDLFNBQ0M7QUFBQSxrRUFBQyxVQUFLLE9BQU8sT0FBTyxNQUFNLFNBQVMsR0FBSSxnQkFBTSxRQUFPO0FBQUEsc0JBQ3BELDZDQUFDLFVBQUssT0FBTyxFQUFFLFVBQVUsUUFBUSxPQUFPLDRDQUE0QyxHQUNqRjtBQUFBO0FBQUEsd0JBQUssRUFBRSxrQkFBa0I7QUFBQSx3QkFBRTtBQUFBLHdCQUFFLE1BQU07QUFBQSx3QkFBVTtBQUFBLHdCQUFJLE9BQU8sTUFBTSxRQUFRLE1BQU07QUFBQSx3QkFBRTtBQUFBLHdCQUFFLEVBQUUsa0JBQWtCO0FBQUEseUJBQ3ZHO0FBQUEsdUJBQ0Y7QUFBQSxvQkFDQyxNQUFNLFFBQVEsTUFBTSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxnQkFDdEMsNkNBQUMsU0FBc0IsT0FBTyxFQUFFLFVBQVUsUUFBUSxPQUFPLDZDQUE2QyxhQUFhLE9BQU8sR0FDdkg7QUFBQSw2QkFBTztBQUFBLHNCQUFLO0FBQUEsc0JBQUUsT0FBTztBQUFBLHNCQUFLO0FBQUEsc0JBQUUsT0FBTyxRQUFRLE1BQU0sR0FBRyxFQUFFO0FBQUEseUJBRC9DLFdBRVYsQ0FDRDtBQUFBLHVCQVhPLE1BQU0sTUFZaEIsQ0FDRDtBQUFBLG1CQUNIO0FBQUEsZ0JBRUQsUUFBUSxNQUFNLE9BQU8sS0FDcEIsNkNBQUMsU0FDQztBQUFBLDhEQUFDLFNBQUksT0FBTyxFQUFFLFVBQVUsUUFBUSxZQUFZLEtBQUssY0FBYyxNQUFNLEdBQUksWUFBRSxnQkFBZ0IsR0FBRTtBQUFBLGtCQUM3Riw0Q0FBQyxTQUFJLE9BQU8sRUFBRSxZQUFZLCtDQUErQyxjQUFjLE9BQU8sU0FBUyxXQUFXLFdBQVcsU0FBUyxXQUFXLE9BQU8sR0FDckosMEJBQWdCLE1BQU0sT0FBTyxHQUNoQztBQUFBLG1CQUNGO0FBQUEsaUJBRUo7QUFBQSxlQUVKO0FBQUEsWUFFRCxRQUNDLDRDQUFDLFlBQU8sT0FBTyxPQUFPLFNBQVMsU0FBUyxNQUFNO0FBQUUsK0JBQWlCLEVBQUUsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUM7QUFBQSxZQUFFLEdBQzNHLHFCQUFXLEVBQUUsZ0JBQWdCLElBQUksRUFBRSxjQUFjLEdBQ3BEO0FBQUEsWUFFRiw2Q0FBQyxTQUFJLE9BQU8sT0FBTyxVQUNqQjtBQUFBLDJEQUFDLFVBQU07QUFBQSxrQkFBRSxlQUFlO0FBQUEsZ0JBQUU7QUFBQSxnQkFBRyxpQkFBaUIsTUFBTSxRQUFRO0FBQUEsaUJBQUU7QUFBQSxjQUM5RCw0Q0FBQyxVQUFNLHFCQUFXLE1BQU0sU0FBUyxHQUFFO0FBQUEsZUFDckM7QUFBQSxlQXZGUSxNQUFNLEVBd0ZoQjtBQUFBLFFBRUosQ0FBQztBQUFBLFNBQ0g7QUFBQSxJQUVKLEdBQUcsR0FDTDtBQUFBLElBQ0EsNENBQUMsUUFBSyxPQUFPLEVBQUUsZ0JBQWdCLEdBQzVCLHdCQUFjLFdBQVcsSUFDeEIsNENBQUMsU0FBSSxPQUFPLE9BQU8sT0FBUSxZQUFFLHFCQUFxQixHQUFFLElBRXBELDRDQUFDLFdBQU0sT0FBTyxPQUFPLE9BQ25CLHNEQUFDLFdBQ0Usd0JBQWMsTUFBTSxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FDL0IsNkNBQUMsUUFDQztBQUFBLGtEQUFDLFFBQUcsT0FBTyxPQUFPLElBQUksc0RBQUMsVUFBSyxPQUFPLE9BQU8sTUFBTSxPQUFPLFdBQVcsV0FBVyxZQUFZLFNBQVMsR0FBSSxpQkFBTyxRQUFPLEdBQU87QUFBQSxNQUMzSCw0Q0FBQyxRQUFHLE9BQU8sT0FBTyxJQUFLLGlCQUFPLE1BQUs7QUFBQSxNQUNuQyw0Q0FBQyxRQUFHLE9BQU8sT0FBTyxJQUFLLHFCQUFXLE9BQU8sU0FBUyxHQUFFO0FBQUEsU0FIN0MsT0FBTyxFQUloQixDQUNELEdBQ0gsR0FDRixHQUVKO0FBQUEsS0FDRjtBQUdGLFNBQ0UsNkNBQUMsU0FBSSxPQUFPLE9BQU8sTUFBTSxlQUFZLDZCQUNuQztBQUFBLGdEQUFDLFdBQU8sd0JBQWE7QUFBQSxJQUNyQjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsZUFBWTtBQUFBLFFBQ1osZUFBZTtBQUFBLFFBQ2YsT0FBTztBQUFBLFVBQ0wsVUFBVTtBQUFBLFVBQVksS0FBSztBQUFBLFVBQUcsUUFBUTtBQUFBLFVBQUcsT0FBTztBQUFBLFVBQUksT0FBTztBQUFBLFVBQzNELFFBQVE7QUFBQSxVQUFjLFFBQVE7QUFBQSxRQUNoQztBQUFBO0FBQUEsSUFDRjtBQUFBLElBQ0EsNkNBQUMsU0FBSSxPQUFPLE9BQU8sS0FDakI7QUFBQSxrREFBQyxVQUFLLE9BQU8sT0FBTyxPQUFRLFlBQUUsaUJBQWlCLEdBQUU7QUFBQSxNQUNoRCxLQUFLLElBQUksQ0FBQyxVQUNULDRDQUFDLFlBQXVCLE9BQU8sT0FBTyxJQUFJLFFBQVEsTUFBTSxHQUFHLEdBQUcsU0FBUyxNQUFNO0FBQUUsZUFBTyxNQUFNLEdBQUc7QUFBQSxNQUFFLEdBQUksZ0JBQU0sU0FBOUYsTUFBTSxHQUE4RixDQUNsSDtBQUFBLE9BQ0g7QUFBQSxJQUNBLDZDQUFDLFNBQUksT0FBTyxPQUFPLE1BQ2hCO0FBQUEsb0JBQWMsUUFBUSw2Q0FBQyxTQUFJLE9BQU8sT0FBTyxPQUFRO0FBQUEsVUFBRSxZQUFZO0FBQUEsUUFBRTtBQUFBLFFBQUc7QUFBQSxTQUFVO0FBQUEsTUFDOUUsT0FBTyxVQUFVLFNBQVMsNENBQUMsU0FBSSxPQUFPLE9BQU8sT0FBUSxnQkFBTSxVQUFVLElBQUc7QUFBQSxNQUN4RSxRQUFRLGFBQWE7QUFBQSxNQUNyQixRQUFRLGNBQWM7QUFBQSxNQUN0QixRQUFRLGVBQWU7QUFBQSxNQUN2QixRQUFRLFlBQVk7QUFBQSxNQUNwQixRQUFRLFdBQVc7QUFBQSxNQUNuQixRQUFRLGNBQWM7QUFBQSxPQUN6QjtBQUFBLElBQ0Msa0JBQWtCLFFBQ2pCO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLGNBQWM7QUFBQSxRQUNyQixTQUFTLGNBQWM7QUFBQSxRQUN2QixRQUFRLGNBQWM7QUFBQSxRQUN0QixVQUFVLE1BQU07QUFBRSwyQkFBaUIsSUFBSTtBQUFBLFFBQUU7QUFBQSxRQUN6QyxXQUFXLE1BQU07QUFBRSx3QkFBYyxVQUFVO0FBQUcsMkJBQWlCLElBQUk7QUFBQSxRQUFFO0FBQUE7QUFBQSxJQUN2RTtBQUFBLEtBRUo7QUFFSjs7O0FGbGtHQSxJQUFNLEtBQUs7QUFFSixJQUFNLE9BQU87QUFDYixJQUFNLFNBQVMsQ0FBQyxTQUFTLFVBQVUsUUFBUTtBQUUzQyxTQUFTLE1BQU0sS0FBZ0I7QUFDcEMsTUFBSSxPQUFPLE1BQU0sSUFBSSxPQUFPLFNBQVMsSUFBSSxFQUFFLElBQUksZUFBZSxJQUFJLElBQUksZUFBZSxHQUFHLENBQUMsR0FBRywrQkFBK0I7QUFDM0gsUUFBTSxTQUFTLElBQUk7QUFJbkIsTUFBSSxtQkFBbUI7QUFDdkIsTUFBSTtBQUVKLFFBQU0sb0JBQW9CLE1BQVk7QUFDcEMsdUJBQW1CLElBQUksTUFBTTtBQUFBLE1BQzNCO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsUUFDVixRQUFRO0FBQUEsTUFDVjtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSUEsQ0FBQyxVQUFlO0FBQ2Qsc0JBQUFLLFFBQU0sVUFBVSxNQUFNO0FBQ3BCLGtCQUFRLGNBQWM7QUFBQSxRQUN4QixHQUFHLENBQUMsQ0FBQztBQUNMLHNCQUFBQSxRQUFNLFVBQVUsTUFBTTtBQUNwQixjQUFJLE1BQU0sY0FBYyxPQUFXO0FBQ25DLGdCQUFNLFFBQVEsV0FBVyxNQUFNLFFBQVEsY0FBYyxHQUFHLENBQUM7QUFDekQsaUJBQU8sTUFBTTtBQUFFLHlCQUFhLEtBQUs7QUFBQSxVQUFFO0FBQUEsUUFDckMsR0FBRyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ3BCLGVBQU8sY0FBQUEsUUFBTSxjQUFjLGdCQUFnQixFQUFFLEdBQUcsT0FBTyxPQUFPLENBQUM7QUFBQSxNQUNqRTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0EsUUFBTSxzQkFBc0IsTUFBWTtBQUN0Qyx1QkFBbUI7QUFDbkIsdUJBQW1CO0FBQUEsRUFDckI7QUFFQSxNQUFJLE1BQU0sT0FBTyxXQUFXLE1BQU07QUFDaEMsUUFBSSxpQkFBa0IsbUJBQWtCO0FBQ3hDLFdBQU8sTUFBTTtBQUNYLDBCQUFvQjtBQUFBLElBQ3RCO0FBQUEsRUFDRixDQUFDO0FBS0QsUUFBTSxlQUFlO0FBQ3JCLFFBQU0sYUFBYSxDQUFDLFlBQTJCO0FBQzdDLFdBQU8sY0FBYyxJQUFJLFlBQVksY0FBYyxFQUFFLFFBQVEsUUFBUSxDQUFDLENBQUM7QUFBQSxFQUN6RTtBQUNBLE1BQUksTUFBTSxPQUFPLHlCQUF5QixNQUFNO0FBQzlDLFdBQU8sSUFBSSxNQUFNLFNBQVM7QUFBQSxNQUN4QixNQUFNO0FBQUEsTUFDTixJQUFJO0FBQUEsSUFDTixHQUFHLE1BQU07QUFDUCxZQUFNLENBQUMsU0FBUyxVQUFVLElBQUksY0FBQUEsUUFBTSxTQUFTLGdCQUFnQjtBQUM3RCxvQkFBQUEsUUFBTSxVQUFVLE1BQU07QUFDcEIsY0FBTSxVQUFVLENBQUMsVUFBdUI7QUFBRSxxQkFBWSxNQUErQixNQUFNO0FBQUEsUUFBRTtBQUM3RixlQUFPLGlCQUFpQixjQUFjLE9BQU87QUFDN0MsZUFBTyxNQUFNO0FBQUUsaUJBQU8sb0JBQW9CLGNBQWMsT0FBTztBQUFBLFFBQUU7QUFBQSxNQUNuRSxHQUFHLENBQUMsQ0FBQztBQUNMLGFBQU8sY0FBQUEsUUFBTTtBQUFBLFFBQ1g7QUFBQSxRQUNBO0FBQUEsVUFDRSxlQUFlO0FBQUEsVUFDZixPQUFPLFVBQVUsd1RBQXlEO0FBQUEsVUFDMUUsT0FBTztBQUFBLFlBQ0wsU0FBUztBQUFBLFlBQVEsWUFBWTtBQUFBLFlBQVUsS0FBSztBQUFBLFlBQzVDLFNBQVM7QUFBQSxZQUFZLFVBQVU7QUFBQSxZQUMvQixZQUFZO0FBQUEsWUFBUSxRQUFRO0FBQUEsWUFDNUIsT0FBTyxVQUFVLFlBQVk7QUFBQSxZQUM3QixZQUFZLFVBQVUsTUFBTTtBQUFBLFlBQzVCLFFBQVE7QUFBQSxZQUFXLFNBQVM7QUFBQSxVQUM5QjtBQUFBLFVBQ0EsU0FBUyxNQUFNO0FBQ2IsK0JBQW1CLENBQUM7QUFDcEIsZ0JBQUk7QUFDRixrQkFBSSxvQkFBb0IscUJBQXFCLE9BQVcsbUJBQWtCO0FBQUEsdUJBQ2pFLENBQUMsa0JBQWtCO0FBQzFCLG9DQUFvQjtBQUdwQix3QkFBUSxlQUFlO0FBQUEsY0FDekI7QUFBQSxZQUNGLFNBQVMsT0FBZ0I7QUFDdkIsc0JBQVEsS0FBSyw2Q0FBNkMsS0FBSztBQUFBLFlBQ2pFO0FBQ0EsdUJBQVcsZ0JBQWdCO0FBQUEsVUFDN0I7QUFBQSxRQUNGO0FBQUEsUUFDQSxVQUFVLHdDQUFhO0FBQUEsTUFDekI7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILENBQUM7QUFHRCxRQUFNLG1CQUFtQixDQUFDLFVBQXlDLENBQUMsVUFBZTtBQUNqRixVQUFNLFNBQVMsT0FBTztBQUN0QixVQUFNLE9BQU8sT0FBTyxXQUFXLFdBQzNCLFNBQ0EsUUFBUSxXQUFXLFFBQVEsVUFBVSxRQUFRLFlBQVksU0FBUyxLQUFLLFVBQVUsUUFBUSxNQUFNLENBQUMsSUFBSTtBQUN4RyxXQUFPLGNBQUFBLFFBQU07QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBTztBQUFBLFVBQ0wsUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsWUFBWTtBQUFBLFVBQ1osVUFBVTtBQUFBLFVBQ1YsWUFBWTtBQUFBLFVBQ1osWUFBWTtBQUFBLFVBQ1osV0FBVztBQUFBLFVBQ1gsV0FBVztBQUFBLFFBQ2I7QUFBQSxNQUNGO0FBQUEsTUFDQSxjQUFBQSxRQUFNLGNBQWMsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEtBQUssY0FBYyxNQUFNLEVBQUUsR0FBRyxLQUFLO0FBQUEsTUFDckYsT0FBTyxJQUFJO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFHQSxNQUFJLE1BQU0sT0FBTyxzQkFBc0IsTUFBTTtBQUMzQyxXQUFPLElBQUksTUFBTSxTQUFTO0FBQUEsTUFDeEIsTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLElBQ1AsR0FBRyxDQUFDLFVBQWU7QUFDakIsVUFBSSxPQUFPLGFBQWEsaUJBQWtCLFFBQU87QUFDakQsWUFBTSxTQUFTLE9BQU87QUFDdEIsYUFBTyxjQUFBQSxRQUFNLGNBQWMsWUFBWTtBQUFBLFFBQ3JDLE9BQU87QUFBQSxRQUNQLGNBQWMsUUFBUSxnQkFBZ0I7QUFBQSxRQUN0QyxZQUFZLFFBQVEsY0FBYztBQUFBLFFBQ2xDLFdBQVcsUUFBUSxhQUFhO0FBQUEsUUFDaEMsWUFBWSxRQUFRO0FBQUEsUUFDcEIsUUFBUSxTQUFTLGNBQWM7QUFBQSxNQUNqQyxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsYUFBVyxDQUFDLFNBQVMsS0FBSyxLQUFLO0FBQUEsSUFDN0IsQ0FBQyxhQUFhLDRCQUFXO0FBQUEsSUFDekIsQ0FBQyxjQUFjLG9DQUFTO0FBQUEsSUFDeEIsQ0FBQyxvQkFBb0IsaUNBQVE7QUFBQSxFQUMvQixHQUFZO0FBQ1YsUUFBSSxNQUFNLE9BQU8sc0JBQXNCLE1BQU07QUFDM0MsYUFBTyxJQUFJLE1BQU0sU0FBUyxFQUFFLE1BQU0sc0JBQXNCLEtBQUssUUFBUSxHQUFHLGlCQUFpQixLQUFLLENBQUM7QUFBQSxJQUNqRyxDQUFDO0FBQUEsRUFDSDtBQUNGOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIm5hbWUiLCAiUmVhY3QiLCAib2siLCAiZGF0YSIsICJhcHBseSIsICJmcmFtZSIsICJSZWFjdCJdCn0K
