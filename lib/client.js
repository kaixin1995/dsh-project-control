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
  const post = async (path, body) => {
    const response = await fetch(path, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...body, sessionId: props.sessionId })
    });
    const data = await response.json();
    return { ok: response.ok, data: data ?? {} };
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
      await loadDetail(target, false);
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
    for (const sha of added) void loadDetail(sha, false);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NsaWVudC9pbmRleC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdGhlbWUudHMiLCAiLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL1dvcmtzcGFjZUZyYW1lLnRzeCIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvY29tbWl0LXJvdW5kcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBDbGllbnQgcGx1Z2luIGVudHJ5IGZvciBkc2gtcHJvamVjdC1jb250cm9sLlxuICpcbiAqIFx1NUUwM1x1NUM0MFx1NjdCNlx1Njc4NFx1RkYwOFx1NURGMlx1OUE4Q1x1OEJDMVx1RkYwQzIwMjYtMDgtMzBcdUZGMDlcdUZGMUFcbiAqIC0gXHU1REU1XHU0RjVDXHU1M0YwXHU5MDZFXHU4NTNEXHU1Qjk4XHU2NUI5IGBkZXRhaWxzYCBcdTY5RkRcdUZGMDhwcmlvcml0eSAtMTBcdUZGMENcdTVCOThcdTY1QjkgRGV0YWlsc1BhbmVsIFx1NzU1OVx1NTcyOFx1OEQyNlx1NjcyQ1x1NEUwQVx1RkYwQ1xuICogICBcdTUzNzhcdThGN0RcdTYyMTFcdTRFRUNcdTc2ODRcdTZDRThcdTUxOENcdTUzNzNcdTYwNjJcdTU5MERcdUZGMDlcdUZGMENcdTZFMzJcdTY3RDNcdTU3MjhcdTRFM0JcdTY4NDZcdTY3QjYgZGV0YWlscyBcdTUyMTdcdUZGMUJcbiAqIC0gV29ya3NwYWNlRnJhbWUgXHU2Q0U4XHU1MTY1XHU2ODM3XHU1RjBGXHU4ODY4XHVGRjBDXHU2MjhBXHU1Qjk4XHU2NUI5XHU3RjUxXHU2ODNDXHU4OUM2XHU4OUM5XHU2MzYyXHU1MjE3XHVGRjFBXHU4MDRBXHU1OTI5XHVGRjA4Y2VudGVyQ29sXHVGRjA5XHU2NzAwXHU1M0YzXHUzMDAxXG4gKiAgIFx1NURFNVx1NEY1Q1x1NTNGMFx1RkYwOGRldGFpbHNDb2xcdUZGMDlcdTVDNDVcdTRFMkQgMWZyXHVGRjFCXHU2NUUwXHU0RjFBXHU4QkREXHU4NDNEXHU1NzMwXHU5ODc1XHVGRjA4ZGF0YS1kZXRhaWxzLWNvbGxhcHNlZFx1RkYwOVxuICogICBcdTgxRUFcdTUyQThcdTYwNjJcdTU5MERcdTUzOUZcdTc1MUZcdTUyMTdcdTVFOEZcdUZGMUJcbiAqIC0gXHU1REU2XHU0RkE3XHU1Qjk4XHU2NUI5XHU1QkZDXHU4MjJBXHUzMDAxXHU1Qjk4XHU2NUI5XHU4MDRBXHU1OTI5XHU2NzJDXHU0RjUzXHU5NkY2XHU2NTM5XHU1MkE4XHVGRjFCXG4gKiAtIFx1NEZBN1x1OEZCOVx1NjgwRlx1NjMwOVx1OTRBRVx1NTcyOFx1MzAwQ1x1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTNGMCBcdTIxQzQgXHU1Qjk4XHU2NUI5XHU4QkU2XHU2MEM1XHU5NzYyXHU2NzdGXHUzMDBEXHU5NUY0XHU1MjA3XHU2MzYyXHVGRjA4XHU1M0VGXHU5MDA2XHVGRjA5XHVGRjFCXG4gKiAtIGB0b29sLmNhbGwudG9vbHZpZXdgIFx1NEUzQSBhbmFseXplX2NoYW5nZSBcdTRGRERcdTc1NTlcdTRFMTNcdTVDNUVcdTUzNjFcdTcyNDdcdUZGMUJcbiAqIC0gXHU2NTg3XHU2ODQ4XHU1MTY4XHU5MEU4XHU3RUNGIGN0eC5sb2NhbGUgXHU4QkNEXHU1MTc4XHVGRjA4emggLyBlblx1RkYwOVx1MzAwMlxuICpcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2xcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDaGFuZ2VDYXJkIH0gZnJvbSAnLi9jb21wb25lbnRzL0NoYW5nZUNhcmQudHMnXG5pbXBvcnQgeyBXT1JLU1BBQ0VfRElDVCwgV29ya3NwYWNlRnJhbWUgfSBmcm9tICcuL2NvbXBvbmVudHMvV29ya3NwYWNlRnJhbWUudHN4J1xuXG5jb25zdCBOUyA9ICdwcm9qZWN0LWNvbnRyb2wnXG5cbmV4cG9ydCBjb25zdCBuYW1lID0gJ2NsaWVudC1wcm9qZWN0LWNvbnRyb2wnXG5leHBvcnQgY29uc3QgaW5qZWN0ID0gWydzbG90cycsICdsb2NhbGUnLCAnbGF5b3V0J11cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KGN0eDogYW55KTogdm9pZCB7XG4gIGN0eC5lZmZlY3QoKCkgPT4gY3R4LmxvY2FsZS5yZWdpc3RlcihOUywgeyB6aDogV09SS1NQQUNFX0RJQ1QuemgsIGVuOiBXT1JLU1BBQ0VfRElDVC5lbiB9KSwgJ3Byb2plY3QtY29udHJvbDogZGljdGlvbmFyaWVzJylcbiAgY29uc3QgbGF5b3V0ID0gY3R4LmxheW91dFxuXG4gIC8vIFx1MjUwMFx1MjUwMCAxLiBcdTk4NzlcdTc2RUVcdTVERTVcdTRGNUNcdTUzRjBcdUZGMUFcdTkwNkVcdTg1M0QgZGV0YWlscyBcdTY5RkRcdUZGMDhcdTUzRUZcdTkwMDZcdUZGMDlcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgLy8gXHU2NUIwXHU3QTk3XHU1M0UzXHU5RUQ4XHU4QkE0XHU0RTBEXHU2NjNFXHU3OTNBXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4XHU0RkREXHU2MzAxXHU1Qjk4XHU2NUI5XHU1MzlGXHU3NTFGXHU4OUM2XHU4OUQyXHVGRjA5XHVGRjBDXHU3NTMxXHU0RkE3XHU4RkI5XHU2ODBGXHU2MzA5XHU5NEFFXHU2NjNFXHU1RjBGXHU2MjUzXHU1RjAwXHUzMDAyXG4gIGxldCB3b3Jrc3BhY2VFbmFibGVkID0gZmFsc2VcbiAgbGV0IGRpc3Bvc2VXb3Jrc3BhY2U6ICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZFxuXG4gIGNvbnN0IHJlZ2lzdGVyV29ya3NwYWNlID0gKCk6IHZvaWQgPT4ge1xuICAgIGRpc3Bvc2VXb3Jrc3BhY2UgPSBjdHguc2xvdHMucmVnaXN0ZXIoXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdkZXRhaWxzJyxcbiAgICAgICAgcHJpb3JpdHk6IC0xMCxcbiAgICAgICAgbG9jYWxlOiBOUyxcbiAgICAgIH0sXG4gICAgICAvLyBcdTYzMDJcdThGN0RcdTUzNzNcdTYyNTNcdTVGMDAgZGV0YWlscyBcdThGNjhcdTkwNTNcdUZGMDhcdTk3NjJcdTY3N0ZcdTUwNEZcdTU5N0RcdTlFRDhcdThCQTQgMFx1RkYwOVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1OTcwMFx1ODk4MVx1NzcxRlx1NUI5RVx1NUJCRFx1NUVBNlx1RkYxQlxuICAgICAgLy8gXHU2NUUwXHU0RjFBXHU4QkREXHU4NDNEXHU1NzMwXHU5ODc1XHU4RjY4XHU5MDUzXHU2MDUyIDBcdUZGMENcdTU5MjlcdTcxMzZcdTRGRERcdTYzMDFcdTUzOUZcdTc1MUZcdTgyRjFcdTk2QzRcdTk4NzVcdTVFMDNcdTVDNDBcdTMwMDJcbiAgICAgIC8vIFx1NEYxQVx1OEJERFx1NTIwN1x1NjM2Mlx1NjVGNlx1NUI5OFx1NjVCOVx1NEYxQSBjbG9zZURldGFpbHMgXHUyMDE0XHUyMDE0IFx1NUVGNlx1NTQwRVx1NEUwMFx1NjJDRFx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1RkYwOFx1NUI4Rlx1NEVGQlx1NTJBMVx1NjY1QVx1NEU4RVx1NzIzNlx1N0VBNyBlZmZlY3RcdUZGMDlcdTMwMDJcbiAgICAgIChwcm9wczogYW55KSA9PiB7XG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgbGF5b3V0Py5vcGVuRGV0YWlscz8uKClcbiAgICAgICAgfSwgW10pXG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHByb3BzLnNlc3Npb25JZCA9PT0gdW5kZWZpbmVkKSByZXR1cm5cbiAgICAgICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gbGF5b3V0Py5vcGVuRGV0YWlscz8uKCksIDApXG4gICAgICAgICAgcmV0dXJuICgpID0+IHsgY2xlYXJUaW1lb3V0KHRpbWVyKSB9XG4gICAgICAgIH0sIFtwcm9wcy5zZXNzaW9uSWRdKVxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChXb3Jrc3BhY2VGcmFtZSwgeyAuLi5wcm9wcywgbGF5b3V0IH0pXG4gICAgICB9LFxuICAgIClcbiAgfVxuICBjb25zdCB1bnJlZ2lzdGVyV29ya3NwYWNlID0gKCk6IHZvaWQgPT4ge1xuICAgIGRpc3Bvc2VXb3Jrc3BhY2U/LigpXG4gICAgZGlzcG9zZVdvcmtzcGFjZSA9IHVuZGVmaW5lZFxuICB9XG5cbiAgY3R4LnNsb3RzLmluamVjdCgnZGV0YWlscycsICgpID0+IHtcbiAgICBpZiAod29ya3NwYWNlRW5hYmxlZCkgcmVnaXN0ZXJXb3Jrc3BhY2UoKVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB1bnJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICB9XG4gIH0pXG5cbiAgLy8gXHUyNTAwXHUyNTAwIDIuIFx1NEZBN1x1OEZCOVx1NjgwRlx1NUU5NVx1OTBFOFx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMCBcdTIxQzQgXHU1Qjk4XHU2NUI5XHU4QkU2XHU2MEM1IFx1NTIwN1x1NjM2MiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgLy8gXHU2MzA5XHU5NEFFXHU3MkI2XHU2MDAxXHU2NjBFXHU3OTNBXHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwXHU2NjNFXHU3OTNBXHU0RTJEIFx1MjE5MiBcdTMwMENcdUQ4M0VcdURERUQgXHU1REU1XHU0RjVDXHU1M0YwIFx1MjcxM1x1MzAwRFx1RkYxQlx1NURGMlx1NTIwN1x1NUI5OFx1NjVCOVx1OEJFNlx1NjBDNSBcdTIxOTIgXHUzMDBDXHVEODNFXHVEREVEIFx1NjI1M1x1NUYwMFx1NURFNVx1NEY1Q1x1NTNGMFx1MzAwRFx1OUFEOFx1NEVBRVx1RkYwQ1xuICAvLyBcdTc1MjhcdTYyMzdcdTk2OEZcdTY1RjZcdTc3MEJcdTVGOTdcdTUyMzBcdTYwMEVcdTRFNDhcdTUyMDdcdTU2REVcdTY3NjVcdUZGMDhcdTUyMDdcdTYzNjJcdTdFQ0Ygd2luZG93IFx1NEU4Qlx1NEVGNlx1OTAxQVx1NzdFNVx1NjMwOVx1OTRBRVx1OTFDRFx1NkUzMlx1NjdEM1x1RkYwOVx1MzAwMlxuICBjb25zdCBUT0dHTEVfRVZFTlQgPSAncGMtd29ya3NwYWNlLXRvZ2dsZSdcbiAgY29uc3QgZmlyZVRvZ2dsZSA9IChlbmFibGVkOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFRPR0dMRV9FVkVOVCwgeyBkZXRhaWw6IGVuYWJsZWQgfSkpXG4gIH1cbiAgY3R4LnNsb3RzLmluamVjdCgnc2lkZWJhci5mb290ZXIuYWN0aW9uJywgKCkgPT4ge1xuICAgIHJldHVybiBjdHguc2xvdHMucmVnaXN0ZXIoe1xuICAgICAgbmFtZTogJ3NpZGViYXIuZm9vdGVyLmFjdGlvbicsXG4gICAgICBpZDogJ3Byb2plY3QtY29udHJvbC10b2dnbGUnLFxuICAgIH0sICgpID0+IHtcbiAgICAgIGNvbnN0IFtlbmFibGVkLCBzZXRFbmFibGVkXSA9IFJlYWN0LnVzZVN0YXRlKHdvcmtzcGFjZUVuYWJsZWQpXG4gICAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gKGV2ZW50OiBFdmVudCk6IHZvaWQgPT4geyBzZXRFbmFibGVkKChldmVudCBhcyBDdXN0b21FdmVudDxib29sZWFuPikuZGV0YWlsKSB9XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFRPR0dMRV9FVkVOVCwgaGFuZGxlcilcbiAgICAgICAgcmV0dXJuICgpID0+IHsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoVE9HR0xFX0VWRU5ULCBoYW5kbGVyKSB9XG4gICAgICB9LCBbXSlcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAge1xuICAgICAgICAgICdkYXRhLXRlc3RpZCc6ICdwcm9qZWN0LWNvbnRyb2wtc2lkZWJhci10b2dnbGUnLFxuICAgICAgICAgIHRpdGxlOiBlbmFibGVkID8gJ1x1NUY1M1x1NTI0RFx1NjYzRVx1NzkzQVx1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMFx1MzAwMlx1NzBCOVx1NTFGQlx1NTNFRlx1NEUzNFx1NjVGNlx1NTIwN1x1NjM2Mlx1NEUzQVx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1RkYwOFx1NjdFNVx1NzcwQlx1NURFNVx1NTE3N1x1OEMwM1x1NzUyOFx1NzY4NFx1NUI4Q1x1NjU3NFx1OEY5M1x1NTE2NS9cdThGOTNcdTUxRkFcdUZGMDlcdUZGMUJcdTUxOERcdTcwQjlcdTY3MkNcdTYzMDlcdTk0QUVcdTUzNzNcdTYwNjJcdTU5MERcdTMwMDInIDogJ1x1NUY1M1x1NTI0RFx1NjYzRVx1NzkzQVx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1MzAwMlx1NzBCOVx1NTFGQlx1NjA2Mlx1NTkwRFx1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMFx1MzAwMicsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzZweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEwcHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgIGNvbG9yOiBlbmFibGVkID8gJ2luaGVyaXQnIDogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiBlbmFibGVkID8gNDAwIDogNjAwLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsIG9wYWNpdHk6IDAuOSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgIHdvcmtzcGFjZUVuYWJsZWQgPSAhd29ya3NwYWNlRW5hYmxlZFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKHdvcmtzcGFjZUVuYWJsZWQgJiYgZGlzcG9zZVdvcmtzcGFjZSA9PT0gdW5kZWZpbmVkKSByZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgICAgICAgICAgIGVsc2UgaWYgKCF3b3Jrc3BhY2VFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgdW5yZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgICAgICAgICAgICAgLy8gXHU2NTM2XHU4RDc3XHU1M0YzXHU0RkE3XHU4RjY4XHU5MDUzXHVGRjFBXHU1NDI2XHU1MjE5XHU1Qjk4XHU2NUI5IERldGFpbHNQYW5lbCBcdTk4NzZcdTU2REVcdTY3NjVcdUZGMENcdTZCOEJcdTc1NTlcdTdBN0FcdTYwMDFcdTk3NjJcdTY3N0ZcbiAgICAgICAgICAgICAgICAvLyBcdUZGMDhcdTMwMENcdTcwQjlcdTUxRkJcdTZEODhcdTYwNkZcdTZENDFcdTRFMkRcdTc2ODRcdTVERTVcdTUxNzdcdTg4NENcdTY3RTVcdTc3MEJcdThCRTZcdTYwQzVcdTMwMERcdUZGMDlcdTMwMDJcbiAgICAgICAgICAgICAgICBsYXlvdXQ/LmNsb3NlRGV0YWlscz8uKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdbcHJvamVjdC1jb250cm9sXSB3b3Jrc3BhY2UgdG9nZ2xlIGZhaWxlZCcsIGVycm9yKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlyZVRvZ2dsZSh3b3Jrc3BhY2VFbmFibGVkKVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGVuYWJsZWQgPyAnXHVEODNFXHVEREVEIFx1NURFNVx1NEY1Q1x1NTNGMCBcdTI3MTMnIDogJ1x1RDgzRVx1RERFRCBcdTYyNTNcdTVGMDBcdTVERTVcdTRGNUNcdTUzRjAnLFxuICAgICAgKVxuICAgIH0pXG4gIH0pXG5cbiAgLy8gXHUyNTAwXHUyNTAwIDMuIFx1ODA0QVx1NTkyOVx1NURFNVx1NTE3N1x1NTM2MVx1NzI0N1x1RkYwOFx1NjI2N1x1ODg0Qy9cdThCQzRcdTVCQTEvXHU5QThDXHU2NTM2XHVGRjA5XHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gIGNvbnN0IHNpbXBsZVJlc3VsdENhcmQgPSAodGl0bGU6IHN0cmluZyk6ICgocHJvcHM6IGFueSkgPT4gYW55KSA9PiAocHJvcHM6IGFueSkgPT4ge1xuICAgIGNvbnN0IG91dHB1dCA9IHByb3BzPy5vdXRwdXRcbiAgICBjb25zdCB0ZXh0ID0gdHlwZW9mIG91dHB1dCA9PT0gJ3N0cmluZydcbiAgICAgID8gb3V0cHV0XG4gICAgICA6IG91dHB1dD8uc3VtbWFyeSA/PyBvdXRwdXQ/Lmlzc3VlcyA/PyBvdXRwdXQ/LmRldGFpbHMgPz8gKG91dHB1dCA/IEpTT04uc3RyaW5naWZ5KG91dHB1dCwgbnVsbCwgMikgOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHUyMDI2JylcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICdkaXYnLFxuICAgICAge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICBwYWRkaW5nOiAnMTBweCAxMnB4JyxcbiAgICAgICAgICBtYXJnaW46ICc0cHggMCcsXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXG4gICAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjYsXG4gICAgICAgICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyxcbiAgICAgICAgICBtYXhIZWlnaHQ6IDI2MCxcbiAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnNHB4JyB9IH0sIHRpdGxlKSxcbiAgICAgIFN0cmluZyh0ZXh0KSxcbiAgICApXG4gIH1cblxuICAvLyBcdTI1MDBcdTI1MDAgMy4gYW5hbHl6ZV9jaGFuZ2UgXHU0RTEzXHU1QzVFXHU1REU1XHU1MTc3XHU1MzYxXHU3MjQ3IFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICBjdHguc2xvdHMuaW5qZWN0KCd0b29sLmNhbGwudG9vbHZpZXcnLCAoKSA9PiB7XG4gICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7XG4gICAgICBuYW1lOiAndG9vbC5jYWxsLnRvb2x2aWV3JyxcbiAgICAgIGtleTogJ2FuYWx5emVfY2hhbmdlJyxcbiAgICB9LCAocHJvcHM6IGFueSkgPT4ge1xuICAgICAgaWYgKHByb3BzPy50b29sTmFtZSAhPT0gJ2FuYWx5emVfY2hhbmdlJykgcmV0dXJuIG51bGxcbiAgICAgIGNvbnN0IG91dHB1dCA9IHByb3BzPy5vdXRwdXRcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENoYW5nZUNhcmQsIHtcbiAgICAgICAgdGl0bGU6ICdcdTUzRDhcdTY2RjRcdTUyMDZcdTY3OTBcdTYyQTVcdTU0NEEgKENoYW5nZSBBbmFseXNpcyknLFxuICAgICAgICBmaWxlc0NoYW5nZWQ6IG91dHB1dD8uZmlsZXNDaGFuZ2VkID8/IDAsXG4gICAgICAgIGluc2VydGlvbnM6IG91dHB1dD8uaW5zZXJ0aW9ucyA/PyAwLFxuICAgICAgICBkZWxldGlvbnM6IG91dHB1dD8uZGVsZXRpb25zID8/IDAsXG4gICAgICAgIGV2aWRlbmNlSWQ6IG91dHB1dD8uZXZpZGVuY2VJZCxcbiAgICAgICAgc3RhdHVzOiBvdXRwdXQgPyAnY29tcGxldGVkJyA6ICdhbmFseXppbmcnLFxuICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG4gIGZvciAoY29uc3QgW3Rvb2xLZXksIHRpdGxlXSBvZiBbXG4gICAgWydzdGFydF9ydW4nLCAnXHVEODNEXHVERTgwIFx1NjI2N1x1ODg0QyBSdW4nXSxcbiAgICBbJ3J1bl9yZXZpZXcnLCAnXHVEODNEXHVERDBEIFx1NEVFM1x1NzgwMVx1OEJDNFx1NUJBMSddLFxuICAgIFsncnVuX3ZlcmlmaWNhdGlvbicsICdcdTI3MDUgXHU5QThDXHU2NTM2XHU5QThDXHU4QkMxJ10sXG4gIF0gYXMgY29uc3QpIHtcbiAgICBjdHguc2xvdHMuaW5qZWN0KCd0b29sLmNhbGwudG9vbHZpZXcnLCAoKSA9PiB7XG4gICAgICByZXR1cm4gY3R4LnNsb3RzLnJlZ2lzdGVyKHsgbmFtZTogJ3Rvb2wuY2FsbC50b29sdmlldycsIGtleTogdG9vbEtleSB9LCBzaW1wbGVSZXN1bHRDYXJkKHRpdGxlKSlcbiAgICB9KVxuICB9XG59XG4iLCAiLyoqXHJcbiAqIFJlYWN0IENvbXBvbmVudDogQ2hhbmdlIC8gSW5zaWdodCBDYXJkIGZvciBDaGF0IFZpZXcuXHJcbiAqIFJlbmRlcnMgc3RydWN0dXJlZCBpbnNpZ2h0cywgZGlmZiBzdGF0aXN0aWNzLCBhbmQgZXZpZGVuY2UgYmFkZ2VzLlxyXG4gKlxyXG4gKiBcdTk4OUNcdTgyNzJcdThENzAgZHN3LWFsaWFzIFx1NEUzQlx1OTg5OFx1NTNEOFx1OTFDRiArIHRoZW1lQXdhcmVUZXh0IFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYxQVxyXG4gKiBcdTZCNjRcdTUyNERcdTc1MjhcdTc2ODQgYC0tZHNoLSpgIFx1NTNEOFx1OTFDRlx1NTcyOFx1NUJCRlx1NEUzQlx1OTFDQ1x1NEUwRFx1NUI1OFx1NTcyOFx1RkYwQ1x1NjgzN1x1NUYwRlx1NkMzOFx1OEZEQ1x1ODQzRFx1NTcyOFx1NkRGMVx1ODI3Mlx1NTE1Q1x1NUU5NVx1NEUwQVx1RkYwQ1xyXG4gKiBcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTRFMEJcdTgwNEFcdTU5MjlcdTZENDFcdTkxQ0NcdTUxRkFcdTczQjBcdTdBODFcdTUxNDBcdTlFRDFcdTUzNjFcdUZGMUJcdTY1NzBcdTVCNTdcdTdFRkYvXHU3RUEyXHU0RTVGXHU2NjJGXHU2REYxXHU4MjcyXHU1NDExXHU5MTREXHU4MjcyXHVGRjBDXHU3NjdEXHU1RTk1XHU0RTBEXHU1M0VGXHU4QkZCXHUzMDAyXHJcbiAqXHJcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9DaGFuZ2VDYXJkXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyB0aGVtZUF3YXJlVGV4dCB9IGZyb20gJy4vdGhlbWUudHMnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUNhcmRQcm9wcyB7XHJcbiAgdGl0bGU/OiBzdHJpbmdcclxuICBmaWxlc0NoYW5nZWQ/OiBudW1iZXJcclxuICBpbnNlcnRpb25zPzogbnVtYmVyXHJcbiAgZGVsZXRpb25zPzogbnVtYmVyXHJcbiAgZXZpZGVuY2VJZD86IHN0cmluZ1xyXG4gIHN0YXR1cz86IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ2hhbmdlQ2FyZDogUmVhY3QuRkM8Q2hhbmdlQ2FyZFByb3BzPiA9ICh7XHJcbiAgdGl0bGUgPSAnQ2hhbmdlIEluc2lnaHQnLFxyXG4gIGZpbGVzQ2hhbmdlZCA9IDAsXHJcbiAgaW5zZXJ0aW9ucyA9IDAsXHJcbiAgZGVsZXRpb25zID0gMCxcclxuICBldmlkZW5jZUlkLFxyXG4gIHN0YXR1cyA9ICdhbmFseXplZCcsXHJcbn0pID0+IHtcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICdkaXYnLFxyXG4gICAge1xyXG4gICAgICAnZGF0YS10ZXN0aWQnOiAncHJvamVjdC1jb250cm9sLWNoYW5nZS1jYXJkJyxcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgcGFkZGluZzogJzEwcHggMTRweCcsXHJcbiAgICAgICAgbWFyZ2luOiAnNnB4IDAnLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXHJcbiAgICAgICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxyXG4gICAgICAgIGZvbnRTaXplOiAnMTNweCcsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgJ2RpdicsXHJcbiAgICAgIHtcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBudWxsLCBgXHVEODNEXHVERDBEICR7dGl0bGV9YCksXHJcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgICAgJ3NwYW4nLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHggNnB4JyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJnLWluc2V0LCByZ2JhKDUsNSw1LDAuMDYpKScsXHJcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgKSxcclxuICAgICksXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEycHgnLCBmb250U2l6ZTogJzEycHgnLCBvcGFjaXR5OiAwLjkgfSB9LFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgbnVsbCwgYFx1RDgzRFx1RENDMSAke2ZpbGVzQ2hhbmdlZH0gZmlsZXNgKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjMWE3ZjM3JykgfSB9LCBgKyR7aW5zZXJ0aW9uc31gKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2YyMjJlJykgfSB9LCBgLSR7ZGVsZXRpb25zfWApLFxyXG4gICAgICBldmlkZW5jZUlkXHJcbiAgICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgICAnc3BhbicsXHJcbiAgICAgICAgICAgIHsgc3R5bGU6IHsgb3BhY2l0eTogMC43LCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJyB9IH0sXHJcbiAgICAgICAgICAgIGBbJHtldmlkZW5jZUlkfV1gLFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIDogbnVsbCxcclxuICAgICksXHJcbiAgKVxyXG59XHJcbiIsICIvKipcbiAqIFx1NUJBMlx1NjIzN1x1N0FFRlx1NEUzQlx1OTg5OFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYwOFx1NkRGMVx1NkQ0NVx1NTNDQ1x1NEUzQlx1OTg5OFx1NTE3MVx1NzUyOFx1NzY4NFx1NTUyRlx1NEUwMFx1NUI5RVx1NzNCMFx1RkYwOVx1MzAwMlxuICpcbiAqIFx1NEUwRFx1NTNEOFx1NUYwRlx1RkYwODIwMjYtMDktMTAgXHU2REYxXHU4MjcyXHU2QTIxXHU1RjBGXHUzMDBDXHU5ODc1XHU3QjdFXHU3NjdEXHU1NzU3XHUzMDBEXHU0RThCXHU2NTQ1XHU1NDBFXHU1NkZBXHU1MzE2XHVGRjBDXHU1MTY4XHU1QkEyXHU2MjM3XHU3QUVGXHU1RkM1XHU5ODdCXHU5MDc1XHU1Qjg4XHVGRjA5XHVGRjFBXG4gKiAxLiBcdTk2OEZcdTRFM0JcdTk4OThcdTUzRDhcdTUzMTZcdTc2ODRcdTVGM0FcdThDMDNcdTgyNzJcdTY1ODdcdTVCNTdcdTVGQzVcdTk4N0JcdTdFQ0YgdGhlbWVBd2FyZVRleHQoKVx1RkYxQVx1NkQ0NVx1ODI3Mlx1NEUzQlx1OTg5OFx1ODFFQVx1NTJBOFx1NkRGMVx1NTMxNlx1NTIzMFx1NzY3RFx1NUU5NVxuICogICAgXHU1QkY5XHU2QkQ0XHU1RUE2IFx1MjI2NTQuNToxXHVGRjBDXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU4MUVBXHU1MkE4XHU2M0QwXHU0RUFFXHU1MjMwXHU2REYxXHU1RTk1IFx1MjI2NTQuNToxXHUzMDAyXHU5ODdCXHU1NzI4XHU2RTMyXHU2N0QzXHU2NzFGXHU4QzAzXHU3NTI4XHVGRjA4XHU3RUM0XHU0RUY2XHU0RjUzXHU1MTg1L1xuICogICAgXHU2RTMyXHU2N0QzXHU1MUZEXHU2NTcwXHU1MTg1XHVGRjA5XHVGRjBDXHU0RTNCXHU5ODk4XHU1MjA3XHU2MzYyXHU1NDBFXHU5NjhGXHU5MUNEXHU2RTMyXHU2N0QzXHU4MUVBXHU1MkE4XHU2NkY0XHU2NUIwXHVGRjFCXHU3OTgxXHU2QjYyXHU1NzI4XHU2QTIxXHU1NzU3XHU1MkEwXHU4RjdEXHU2NzFGXHU2QzQyXHU1MDNDXHU1NDBFXHU1QjU4XHU4RkRCXG4gKiAgICBcdTk3NTlcdTYwMDFcdTY4MzdcdTVGMEZcdTVCRjlcdThDNjFcdTMwMDJcbiAqIDIuIGFjdGl2ZSBcdTlBRDhcdTRFQUVcdTgwQ0NcdTY2NkZcdUZGMDhcdTYzMDlcdTk0QUUgLyBcdTk4NzVcdTdCN0UgLyBcdTdCNUJcdTkwMDlcdTgyQUZcdTcyNDdcdTdCNDlcdTRFMDBcdTUyMDdcIlx1OTAwOVx1NEUyRFx1NTM3M1x1NTg2Qlx1ODI3MlwiXHU3Njg0XHU4ODY4XHU5NzYyXHVGRjA5XHU0RTAwXHU1RjhCXHU3NTI4XG4gKiAgICBgdmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpYFx1RkYwOFx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1NEUwQlx1OTBGRFx1NjYyRlx1ODRERFx1ODI3Mlx1RkYwOVx1RkYwQ1x1OTE0RFx1NzY3RFx1NUI1N1x1MzAwMlxuICogICAgXHU3OTgxXHU2QjYyXHU3NTI4IC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnkgXHU0RjVDXHU4MENDXHU2NjZGXHUyMDE0XHUyMDE0XHU1QjgzXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RjFBXHU4OEFCXG4gKiAgICBcdTVCOENcdTUxNjhcdTU0MUVcdTYzODlcdUZGMDhcdTY3MkNcdTZCMjFcdTRFOEJcdTY1NDVcdTY4MzlcdTU2RTBcdUZGMDlcdTMwMDJcbiAqIDMuIFx1NjVFMFx1NkNENVx1ODlFM1x1Njc5MFx1NzY4NFx1OTg5Q1x1ODI3Mlx1RkYwOENTUyBcdTUzRDhcdTkxQ0ZcdTdCNDlcdUZGMDlcdTUzOUZcdTY4MzdcdThGRDRcdTU2REVcdUZGMUFcdTUzRDhcdTkxQ0ZcdTgyNzJcdTRFQTRcdTc1MzFcdTVCQkZcdTRFM0JcdTRFM0JcdTk4OThcdTdDRkJcdTdFREZcdTRGRERcdThCQzFcdTUzRUZcdThCRkJcdUZGMENcbiAqICAgIFx1NEY0Nlx1NzUzMVx1NkI2NFx1NUI4M1x1NEVFQ1x1NEUwRFx1NUY5N1x1NEUwRVx1Nzg2Q1x1N0YxNlx1NzgwMVx1NTI0RFx1NjY2Rlx1ODI3Mlx1NTNFMFx1NTJBMFx1NEY3Rlx1NzUyOFx1MzAwMlxuICovXG5cbi8qKiBcdTg5RTNcdTY3OTAgI3JyZ2diYiBcdTYyMTYgcmdiKCkvcmdiYSgpIFx1OTg5Q1x1ODI3Mlx1NTI0RFx1NEUwOVx1NEUyQVx1NTIwNlx1OTFDRlx1NEUzQSBbciwgZywgYl1cdUZGMUJcdTY1RTBcdTZDRDVcdTg5RTNcdTY3OTBcdThGRDRcdTU2REUgbnVsbFx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29sb3IoY29sb3I6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IG51bGwge1xuICBjb25zdCBoZXggPSAvXiMoWzAtOWEtZl17Nn0pJC9pLmV4ZWMoY29sb3IpXG4gIGlmIChoZXggIT09IG51bGwpIHtcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlci5wYXJzZUludChoZXhbMV0hLCAxNilcbiAgICByZXR1cm4gWyh2YWx1ZSA+PiAxNikgJiAyNTUsICh2YWx1ZSA+PiA4KSAmIDI1NSwgdmFsdWUgJiAyNTVdXG4gIH1cbiAgY29uc3QgZnVuY3Rpb25hbCA9IC9ecmdiYT9cXChcXHMqKFxcZHsxLDN9KVssXFxzXSsoXFxkezEsM30pWyxcXHNdKyhcXGR7MSwzfSkvaS5leGVjKGNvbG9yKVxuICBpZiAoZnVuY3Rpb25hbCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBbTnVtYmVyKGZ1bmN0aW9uYWxbMV0pLCBOdW1iZXIoZnVuY3Rpb25hbFsyXSksIE51bWJlcihmdW5jdGlvbmFsWzNdKV1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG4vKiogV0NBRyBcdTc2RjhcdTVCRjlcdTRFQUVcdTVFQTZcdUZGMDgwPVx1OUVEMVx1RkYwQzE9XHU3NjdEXHVGRjA5XHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gcmVsYXRpdmVMdW1pbmFuY2UocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IGNoYW5uZWwgPSAodmFsdWU6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdiA9IHZhbHVlIC8gMjU1XG4gICAgcmV0dXJuIHYgPD0gMC4wMzkyOCA/IHYgLyAxMi45MiA6ICgodiArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjRcbiAgfVxuICByZXR1cm4gMC4yMTI2ICogY2hhbm5lbChyKSArIDAuNzE1MiAqIGNoYW5uZWwoZykgKyAwLjA3MjIgKiBjaGFubmVsKGIpXG59XG5cbi8qKiBcdTZERjFcdTUzMTZcdTk4OUNcdTgyNzJcdTc2RjRcdTUyMzBcdTc2N0RcdTVFOTVcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgIzFmMjMyOCBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA+IDAuMTgzOyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4MWYgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHgyMyAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHgyOCAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqIFx1NjNEMFx1NEVBRVx1OTg5Q1x1ODI3Mlx1NzZGNFx1NTIzMFx1NkRGMVx1NUU5NVx1RkYwOCMxNTE1MTdcdUZGMDlcdTVCRjlcdTZCRDRcdTVFQTYgXHUyMjY1NC41OjFcdUZGMDhcdTZCQ0ZcdTZCNjVcdTU0MTEgI2YwZjZmYyBcdTZERjdcdTU0MDggMjAlXHVGRjBDXHU4MUYzXHU1OTFBIDEyIFx1NkI2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpZ2h0ZW5Gb3JEYXJrQmFja2dyb3VuZChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlZCA9IHJcbiAgbGV0IGdyZWVuID0gZ1xuICBsZXQgYmx1ZSA9IGJcbiAgZm9yIChsZXQgc3RlcCA9IDA7IHN0ZXAgPCAxMiAmJiByZWxhdGl2ZUx1bWluYW5jZShyZWQsIGdyZWVuLCBibHVlKSA8IDAuMjE0OyBzdGVwICs9IDEpIHtcbiAgICByZWQgPSBNYXRoLnJvdW5kKHJlZCAqIDAuOCArIDB4ZjAgKiAwLjIpXG4gICAgZ3JlZW4gPSBNYXRoLnJvdW5kKGdyZWVuICogMC44ICsgMHhmNiAqIDAuMilcbiAgICBibHVlID0gTWF0aC5yb3VuZChibHVlICogMC44ICsgMHhmYyAqIDAuMilcbiAgfVxuICByZXR1cm4gYHJnYigke3JlZH0sICR7Z3JlZW59LCAke2JsdWV9KWBcbn1cblxuLyoqXG4gKiBcdTRFM0JcdTk4OThcdTgxRUFcdTkwMDJcdTVFOTRcdTY1ODdcdTVCNTdcdTgyNzJcdUZGMUFcdTZENDVcdTgyNzJcdTRFM0JcdTk4OThcdTZERjFcdTUzMTZcdTUyMzBcdTc2N0RcdTVFOTUgXHUyMjY1NC41OjFcdUZGMUJcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTYzRDBcdTRFQUVcdTUyMzBcdTZERjFcdTVFOTUgXHUyMjY1NC41OjFcbiAqIFx1RkYwOFx1NkRGMVx1ODI3Mlx1NUI1N1x1NTk4MiAjNTc2MDZhIFx1NzZGNFx1NjNBNVx1NjUzRVx1NkRGMVx1NUU5NVx1NTQwQ1x1NjgzN1x1NEUwRFx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlx1NjI0MFx1NjcwOVx1NUYzQVx1OEMwM1x1ODI3Mlx1NjU4N1x1NjcyQ1x1N0VERlx1NEUwMFx1OEQ3MFx1OEZEOVx1OTFDQ1x1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhlbWVBd2FyZVRleHQoY29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJnYiA9IHBhcnNlQ29sb3IoY29sb3IpXG4gIGlmIChyZ2IgPT09IG51bGwpIHJldHVybiBjb2xvclxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5ib2R5Py5oYXNBdHRyaWJ1dGU/LignZGF0YS1kcy1kYXJrLXRoZW1lJykgPT09IHRydWUpIHtcbiAgICByZXR1cm4gbGlnaHRlbkZvckRhcmtCYWNrZ3JvdW5kKHJnYlswXSwgcmdiWzFdLCByZ2JbMl0pXG4gIH1cbiAgcmV0dXJuIGRhcmtlbkZvcldoaXRlQmFja2dyb3VuZChyZ2JbMF0sIHJnYlsxXSwgcmdiWzJdKVxufVxuIiwgIi8qKlxuICogUHJvamVjdCBDb250cm9sIFx1NURFNVx1NEY1Q1x1NTNGMFx1RkYwOFdvcmtzcGFjZUZyYW1lXHVGRjA5djJcdUZGMUFcdTU2RjRcdTdFRDVcIlx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVwiXHU3RUM0XHU3RUM3XHUzMDAyXG4gKlxuICogXHU1NkRCXHU0RTJBXHU5ODc1XHU3QjdFXHVGRjFBXG4gKiAxLiBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdUZGMDhcdTlFRDhcdThCQTRcdUZGMDlcdUZGMUFcdTRFRDNcdTVFOTNcdTY4MEZcdUZGMDhcdTU5MUFcdTRFRDNcdTVFOTNcdTUyMDdcdTYzNjJcdUZGMDkrIFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1RkYwOFx1NTQyQlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOStcbiAqICAgIFx1OEJFNlx1NjBDNVx1OTc2Mlx1Njc3Rlx1RkYwOEFJIFx1ODlFM1x1OEJGQlx1RkYxQVx1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OC9cdTVCOUVcdTczQjBcdTkwM0JcdThGOTEvXHU5OENFXHU5NjY5XHVGRjFCXHU0RTA5XHU3RUE3XHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0IFNWRyBcdTU2RkVcdUZGMUJcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTVcdTdFRDNcdThCQkFcdUZGMDlcdTMwMDJcbiAqIDIuIFx1OTg3OVx1NzZFRVx1NjAzQlx1ODlDOFx1RkYxQVx1OTg3OVx1NzZFRVx1Njg2M1x1Njg0OCArIFx1NUZFQlx1NjM3N1x1NjRDRFx1NEY1QyArIFx1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1RiArIFx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1MzAwMlxuICogMy4gXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHVGRjFBUnVuIFx1OEZEQlx1NUVBNlx1NEUwRVx1NjIxMFx1NjcyQ1x1MzAwMlxuICogNC4gXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHVGRjFBXHU2ODM4XHU2N0U1XHU3QjE0XHU4QkIwXHVGRjA4XHU1M0VGXHU1MTczXHU4MDU0XHU2M0QwXHU0RUE0XHVGRjA5KyBcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdUZGMDhcdTRFQkFcdTVERTVcdTc4NkVcdThCQTRcdUZGMDkrIFx1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNSArIFJldmlldy9cdTlBOENcdTY1MzZcdThCQjBcdTVGNTVcdTMwMDJcbiAqXG4gKiBcdTVFMDNcdTVDNDBcdTY3M0FcdTUyMzZcdTRFMERcdTUzRDhcdUZGMUFcdTkwNkVcdTg1M0RcdTVCOThcdTY1QjkgZGV0YWlscyBcdTY5RkQgKyBcdTZDRThcdTUxNjVcdTY4MzdcdTVGMEZcdTYzNjJcdTUyMTdcdUZGMDhcdTgwNEFcdTU5MjlcdTY3MDBcdTUzRjNcdUZGMDkrIFx1NTIwNlx1OTY5NFx1Njc2MVx1NjJENlx1NjJGRFx1OEJCMFx1NUZDNlx1RkYxQlxuICogXHU3RURGXHU4QkExXHU4ODRDXHU0RTI0XHU4ODRDXHU5NEIzXHU1MjM2XHU3NTMxXHU4RkQwXHU4ODRDXHU2NUY2XHU2MzA5XHU2Nzg0XHU1RUZBXHU1NEM4XHU1RTBDXHU3Q0JFXHU1MUM2XHU2Q0U4XHU1MTY1XHVGRjA4YXBwbHlTdGF0c0xpbmVDbGFtcFx1RkYwOVx1MzAwMlxuICpcbiAqIEBtb2R1bGUgZHNoLWNsaWVudC1wcm9qZWN0LWNvbnRyb2wvY29tcG9uZW50cy9Xb3Jrc3BhY2VGcmFtZVxuICovXG5cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBwYXJzZUNvbG9yLCB0aGVtZUF3YXJlVGV4dCB9IGZyb20gJy4vdGhlbWUudHMnXG5pbXBvcnQgeyBjbHVzdGVySW50b1JvdW5kcyB9IGZyb20gJy4vY29tbWl0LXJvdW5kcy50cydcblxuLyoqIFx1NUJCRlx1NEUzQiAvc3RhdGUgXHU4RkQ0XHU1NkRFXHU3Njg0XHU1RkVCXHU3MTY3XHU1RjYyXHU3MkI2XHVGRjA4XHU0RTBFIGFwaS1yb3V0ZS50cyBidWlsZFN0YXRlIFx1NUJGOVx1OUY1MFx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGludGVyZmFjZSBXb3Jrc3BhY2VTdGF0ZSB7XG4gIHJlYWR5PzogYm9vbGVhblxuICByZWFzb24/OiBzdHJpbmdcbiAgcGx1Z2luVmVyc2lvbj86IHN0cmluZ1xuICBwcm9qZWN0PzogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IHJvb3RQYXRoOiBzdHJpbmc7IGNyZWF0ZWRBdDogbnVtYmVyIH0gfCBudWxsXG4gIGNoYW5nZXM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IHNvdXJjZTogc3RyaW5nOyB1cGRhdGVkQXQ6IG51bWJlciB9PlxuICBydW5zPzogQXJyYXk8eyBpZDogc3RyaW5nOyBjaGFuZ2VJZDogc3RyaW5nOyBzdGF0dXM6IHN0cmluZzsgc3RhcnRlZEF0OiBudW1iZXIgfCBudWxsOyBmaW5pc2hlZEF0OiBudW1iZXIgfCBudWxsOyBjb3N0VXNkPzogbnVtYmVyOyBzdGVwc1RvdGFsPzogbnVtYmVyOyBzdGVwc0RvbmU/OiBudW1iZXI7IGN1cnJlbnRTdGVwPzogc3RyaW5nIHwgbnVsbCB9PlxuICBhdHRlbXB0c0NvdW50PzogbnVtYmVyXG4gIG1lbW9yaWVzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBwcm9qZWN0SWQ6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0cnV0aExldmVsOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ/OiBzdHJpbmc7IGlzSHVtYW5Db25maXJtZWQ6IGJvb2xlYW47IGdpdEJyYW5jaDogc3RyaW5nIHwgbnVsbDsgY3JlYXRlZEF0OiBudW1iZXIgfT5cbiAgZXZpZGVuY2VDb3VudD86IG51bWJlclxuICByZWNlbnRFdmlkZW5jZT86IEFycmF5PHsgaWQ6IHN0cmluZzsgc291cmNlOiBzdHJpbmc7IHRydXRoTGV2ZWw6IHN0cmluZzsgbG9jYXRvcjogc3RyaW5nOyBzbmlwcGV0OiBzdHJpbmc7IGNyZWF0ZWRBdDogbnVtYmVyIH0+XG4gIHJlc29sdmVkSXNzdWVSZXRlbnRpb25EYXlzPzogbnVtYmVyXG4gIGltcG9ydGVkQ2hhbmdlcz86IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29tbWl0Q291bnQ6IG51bWJlcjsgZmlyc3RDb21taXRBdDogbnVtYmVyOyBsYXN0Q29tbWl0QXQ6IG51bWJlcjsgY29uZmlkZW5jZTogbnVtYmVyOyBzdGF0dXM6IHN0cmluZyB9PlxuICBpc3N1ZXM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IHNldmVyaXR5OiBzdHJpbmc7IGNhdGVnb3J5OiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nIH0+XG4gIHZlcmlmaWNhdGlvbnM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZzsgY3JlYXRlZEF0OiBudW1iZXIgfT5cbiAgYm9vdHN0cmFwPzogeyBpZDogc3RyaW5nOyBzdW1tYXJ5OiBzdHJpbmc7IHRlY2hTdGFjazogc3RyaW5nW107IG1hbmlmZXN0RmlsZXM6IHN0cmluZ1tdOyBzeW1ib2xzQ291bnQ6IG51bWJlcjsgY3JlYXRlZEF0OiBudW1iZXIgfSB8IG51bGxcbiAgY29uZmlybWVkPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRleHQ6IHN0cmluZzsgZm9yYmlkZGVuUGF0aHM6IHN0cmluZ1tdIH0+XG4gIGNvbmNlcHRzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNhdGVnb3J5OiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmc7IG9jY3VycmVuY2VzOiBudW1iZXIgfT5cbn1cblxuLyoqIEdFVCAvY29tbWl0cyBcdTc2ODRcdTYzRDBcdTRFQTRcdTY3NjFcdTc2RUVcdTMwMDIgKi9cbmludGVyZmFjZSBDb21taXRFbnRyeSB7XG4gIHNoYTogc3RyaW5nXG4gIHNob3J0SGFzaDogc3RyaW5nXG4gIGF1dGhvcjogc3RyaW5nXG4gIGRhdGU6IG51bWJlclxuICBzdWJqZWN0OiBzdHJpbmdcbiAgZmlsZXM6IEFycmF5PHsgcGF0aDogc3RyaW5nOyBhZGRzOiBudW1iZXI7IGRlbHM6IG51bWJlciB9PlxufVxuXG5pbnRlcmZhY2UgQ29tbWl0c1BheWxvYWQge1xuICByb290UGF0aDogc3RyaW5nXG4gIGJyYW5jaDogc3RyaW5nIHwgbnVsbFxuICBoZWFkU2hhOiBzdHJpbmcgfCBudWxsXG4gIHdvcmtpbmc6IHsgZmlsZUNvdW50OiBudW1iZXI7IGlzQ2xlYW46IGJvb2xlYW47IGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmcgfT4gfVxuICBjb21taXRzOiBDb21taXRFbnRyeVtdXG59XG5cbmludGVyZmFjZSBDb21taXREZXRhaWxQYXlsb2FkIHtcbiAgc2hhOiBzdHJpbmdcbiAgaXNXb3JraW5nOiBib29sZWFuXG4gIGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgYWRkczogbnVtYmVyOyBkZWxzOiBudW1iZXIgfT5cbiAgaW5zZXJ0aW9uczogbnVtYmVyXG4gIGRlbGV0aW9uczogbnVtYmVyXG4gIHBhdGNoVHJ1bmNhdGVkOiBib29sZWFuXG4gIHBhdGNoOiBzdHJpbmdcbiAgY29tbWl0OiB7IG1lc3NhZ2U6IHN0cmluZzsgYXV0aG9yOiBzdHJpbmc7IGRhdGU6IG51bWJlciB9IHwgbnVsbFxuICBhbmFseXNpczogeyB3aGF0OiBzdHJpbmc7IGxvZ2ljOiBzdHJpbmdbXTsgcmlza3M6IHN0cmluZ1tdIH1cbiAgYW5hbHlzaXNDYWNoZWQ/OiBib29sZWFuXG4gIGFuYWx5c2lzR2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXG4gIC8qKiBcdTY3MkNcdTZCMjFcdTg5RTNcdThCRkJcdTc2ODQgTExNIFx1NjIxMFx1NjcyQ1x1RkYwOFx1NEYzMFx1RkYwQ1VTRFx1RkYwOVx1RkYxQlx1N0YxM1x1NUI1OFx1NjcyQVx1NUUyNlx1NjIxMFx1NjcyQy9cdTY3MkFcdTRFQTdcdTc1MUZcdThDMDNcdTc1MjhcdTY1RjZcdTdGM0FcdTc3MDFcdTMwMDIgKi9cbiAgYW5hbHlzaXNDb3N0VXNkPzogbnVtYmVyXG4gIGFuYWx5c2lzVG9rZW5zPzogeyBpbnB1dDogbnVtYmVyOyBvdXRwdXQ6IG51bWJlcjsgdG90YWw6IG51bWJlciB9XG59XG5cbmludGVyZmFjZSBJbXBhY3RTY29wZVBheWxvYWQge1xuICBjaGFuZ2VkRmlsZXM6IHN0cmluZ1tdXG4gIHNoYXM/OiBzdHJpbmdbXVxuICByaXNrTGV2ZWw6ICdsb3cnIHwgJ21lZGl1bScgfCAnaGlnaCcgfCAnY3JpdGljYWwnXG4gIHJpc2tTY29yZTogbnVtYmVyXG4gIHJpc2tGYWN0b3JzPzogQXJyYXk8eyB0ZXh0OiBzdHJpbmc7IHBvaW50czogbnVtYmVyIH0+XG4gIGtleUNoYW5nZVBvaW50cz86IHN0cmluZ1tdXG4gIG1lbW9yaWVzPzogQXJyYXk8eyB0aXRsZTogc3RyaW5nOyB0eXBlOiBzdHJpbmcgfT5cbiAgZnVuY3Rpb25JbXBhY3Q/OiBBcnJheTx7XG4gICAgc3ltYm9sOiBzdHJpbmdcbiAgICBkZWZpbmVkSW46IHN0cmluZ1xuICAgIHJvbGU/OiBzdHJpbmdcbiAgICBjaGFuZ2U/OiBzdHJpbmdcbiAgICBpbXBhY3Q/OiBzdHJpbmdcbiAgICBjYWxsZXJzOiBBcnJheTx7IGZpbGU6IHN0cmluZzsgbGluZTogc3RyaW5nOyBzbmlwcGV0OiBzdHJpbmcgfT5cbiAgfT5cbiAgbGV2ZWxzOiBBcnJheTx7IGxldmVsOiBzdHJpbmc7IGRlcHRoOiBudW1iZXI7IHBhdGg6IHN0cmluZzsgY29uZmlkZW5jZTogbnVtYmVyOyByZWFzb246IHN0cmluZyB9PlxuICBkaXJlY3Q6IHN0cmluZ1tdXG4gIGV4cGxhbmF0aW9uc0NhY2hlZD86IGJvb2xlYW5cbiAgZ2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXG4gIC8qKiBcdTUxRkRcdTY1NzBcdTdFQTdcdThCRjRcdTY2MEVcdTkwQTNcdTZCMjEgTExNIFx1OEMwM1x1NzUyOFx1NzY4NFx1NjIxMFx1NjcyQ1x1RkYwOFx1NEYzMFx1RkYwQ1VTRFx1RkYwOVx1MzAwMiAqL1xuICBleHBsYW5hdGlvbnNDb3N0VXNkPzogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmV2aWV3UGF5bG9hZCB7XG4gIGlzc3Vlc0ZvdW5kOiBudW1iZXJcbiAgaXNzdWVzOiBzdHJpbmdcbiAgdmVyZGljdDogc3RyaW5nXG4gIGNhY2hlZD86IGJvb2xlYW5cbiAgZ2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXG4gIGNvc3RVc2Q/OiBudW1iZXJcbiAgaXNzdWVMaXN0PzogQXJyYXk8eyBzZXZlcml0eTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBldmlkZW5jZTogc3RyaW5nOyBmaXg6IHN0cmluZyB9PlxufVxuXG5pbnRlcmZhY2UgTm90ZUVudHJ5IHtcbiAgaWQ6IHN0cmluZ1xuICBwcm9qZWN0SWQ6IHN0cmluZ1xuICBzaGE/OiBzdHJpbmdcbiAgdGl0bGU6IHN0cmluZ1xuICBjb250ZW50OiBzdHJpbmdcbiAgdGFncz86IHN0cmluZ1tdXG4gIHBpbm5lZD86IGJvb2xlYW5cbiAgY3JlYXRlZEF0OiBudW1iZXJcbiAgdXBkYXRlZEF0PzogbnVtYmVyXG59XG5cbi8qKiBHRVQgL2lzc3VlcyBcdTc2ODRcdThCQzRcdTVCQTFcdTk1RUVcdTk4OThcdTY3NjFcdTc2RUVcdUZGMDhSZXZpZXcgXHU5NUVFXHU5ODk4XHU5ODc1XHU3QjdFXHU2NTcwXHU2MzZFXHU2RTkwXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgSXNzdWVFbnRyeSB7XG4gIGlkOiBzdHJpbmdcbiAgY2hhbmdlSWQ6IHN0cmluZ1xuICBzZXZlcml0eTogc3RyaW5nXG4gIGNhdGVnb3J5OiBzdHJpbmdcbiAgdGl0bGU6IHN0cmluZ1xuICBkZXNjcmlwdGlvbjogc3RyaW5nXG4gIHN0YXR1czogc3RyaW5nXG4gIHJlc29sdXRpb246IHN0cmluZ1xuICBmaXhTdGF0czogeyBmaWxlczogbnVtYmVyOyBpbnNlcnRpb25zOiBudW1iZXI7IGRlbGV0aW9uczogbnVtYmVyIH0gfCBudWxsXG4gIGZpeEZpbGVzOiBzdHJpbmdbXVxuICBmaXhJbXBhY3Q6IEFycmF5PHsgc3ltYm9sOiBzdHJpbmc7IGRlZmluZWRJbjogc3RyaW5nOyBjYWxsZXJzOiBBcnJheTx7IGZpbGU6IHN0cmluZzsgbGluZTogc3RyaW5nOyBzbmlwcGV0OiBzdHJpbmcgfT4gfT5cbiAgZml4RGlmZjogc3RyaW5nXG4gIGNyZWF0ZWRBdDogbnVtYmVyXG4gIHVwZGF0ZWRBdDogbnVtYmVyXG59XG5cbi8qKiBcdTRGRUVcdTU5MERcdTVERUVcdTVGMDJcdTc2ODRcdTg4NENcdTdFQTdcdTc3NDBcdTgyNzJcdTZFMzJcdTY3RDNcdUZGMUErIFx1N0VGRlx1MzAwMS0gXHU3RUEyXHUzMDAxXHU2NTg3XHU0RUY2XHU1OTM0XHU1MkEwXHU3Qzk3XHUzMDAxXHU1MTc2XHU0RjU5XHU1RjMxXHU1MzE2XHUzMDAyICovXG5mdW5jdGlvbiByZW5kZXJEaWZmTGluZXMoZGlmZjogc3RyaW5nKTogUmVhY3QuUmVhY3ROb2RlW10ge1xuICBpZiAodHlwZW9mIGRpZmYgIT09ICdzdHJpbmcnIHx8IGRpZmYgPT09ICcnKSByZXR1cm4gW11cbiAgcmV0dXJuIGRpZmYuc3BsaXQoJ1xcbicpLnNsaWNlKDAsIDQwMCkubWFwKChsaW5lLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0ge1xuICAgICAgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsXG4gICAgICBmb250U2l6ZTogJzExcHgnLCBsaW5lSGVpZ2h0OiAxLjYsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcsXG4gICAgfVxuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJysrKycpIHx8IGxpbmUuc3RhcnRzV2l0aCgnLS0tJykgfHwgbGluZS5zdGFydHNXaXRoKCdkaWZmIC0tZ2l0JykgfHwgbGluZS5zdGFydHNXaXRoKCdAQCcpKSB7XG4gICAgICBzdHlsZS5jb2xvciA9ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKSdcbiAgICB9IGVsc2UgaWYgKGxpbmUuc3RhcnRzV2l0aCgnKycpKSB7XG4gICAgICBzdHlsZS5jb2xvciA9IHRoZW1lQXdhcmVUZXh0KCcjMWE3ZjM3JylcbiAgICAgIHN0eWxlLmJhY2tncm91bmQgPSAncmdiYSg0NiwxNjAsNjcsMC4wOCknXG4gICAgfSBlbHNlIGlmIChsaW5lLnN0YXJ0c1dpdGgoJy0nKSkge1xuICAgICAgc3R5bGUuY29sb3IgPSB0aGVtZUF3YXJlVGV4dCgnI2QxMjQyZicpXG4gICAgICBzdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoMjA5LDM2LDQ3LDAuMDgpJ1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5jb2xvciA9ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKSdcbiAgICB9XG4gICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0gc3R5bGU9e3N0eWxlfT57bGluZSA9PT0gJycgPyAnXFx1MDBBMCcgOiBsaW5lfTwvZGl2PlxuICB9KVxufVxuXG4vKiogXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0XHU5ODc1XHU3Njg0XHU1M0VGXHU3RjE2XHU4RjkxXHU2QjY1XHU5QUE0XHVGRjA4L3J1bnMvc3RhcnQgXHU4RkQ0XHU1NkRFXHVGRjA5XHUzMDAyICovXG5pbnRlcmZhY2UgUGxhbkNvbmZpcm1TdGVwIHtcbiAgaWQ6IHN0cmluZ1xuICB0aXRsZTogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgdGFyZ2V0RmlsZXM6IHN0cmluZ1tdXG4gIHJvbGU6IHN0cmluZ1xuICBhY2NlcHRhbmNlOiBzdHJpbmdcbiAgZmFpbHVyZVBvbGljeTogc3RyaW5nXG4gIGVuYWJsZWQ6IGJvb2xlYW5cbiAgbW9kZWxQcm92aWRlcjogc3RyaW5nXG4gIG1vZGVsSWQ6IHN0cmluZ1xufVxuXG4vKiogUE9TVCAvcGVlayBcdTc2ODRcdThGN0RcdTgzNzdcdUZGMDhcdTRFRTNcdTc4MDFcdTRFMEFcdTRFMEJcdTY1ODdcdTZENkVcdTVDNDJcdUZGMDlcdTMwMDIgKi9cbmludGVyZmFjZSBQZWVrUGF5bG9hZCB7XG4gIGV4aXN0czogYm9vbGVhblxuICBwYXRoPzogc3RyaW5nXG4gIHN0YXJ0TGluZT86IG51bWJlclxuICBlbmRMaW5lPzogbnVtYmVyXG4gIHRvdGFsTGluZXM/OiBudW1iZXJcbiAgbGluZXM/OiBBcnJheTx7IG46IG51bWJlcjsgdGV4dDogc3RyaW5nIH0+XG59XG5cbi8qKiBcdTRFQ0VcdTgxRUFcdTc1MzFcdTY1ODdcdTY3MkNcdTRFMkRcdThCQzZcdTUyMkIgZmlsZTpsaW5lIFx1NUYxNVx1NzUyOFx1RkYwOFx1NTQyQiBmaWxlOmxpbmUtbGluZSBcdTUzM0FcdTk1RjRcdTUzRDZcdThENzdcdTU5Q0JcdTg4NENcdUZGMDlcdTMwMDIgKi9cbmNvbnN0IEZJTEVfTElORV9QQVRURVJOID0gLygoPzpbXFx3Li1dK1svXFxcXF0pKltcXHcuLV0rXFwuW0EtWmEtel17MSw0fSk6KFxcZHsxLDV9KSg/Oi1cXGR7MSw1fSk/L2dcblxuLyoqIEdFVCAvcnVucy9kZXRhaWwgXHU3Njg0XHU4RjdEXHU4Mzc3XHUzMDAyICovXG5pbnRlcmZhY2UgUnVuRGV0YWlsIHtcbiAgcnVuOiB7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IGNoYW5nZVRpdGxlOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBwYXVzZVBvaW50OiB7IHN0ZXBJZDogc3RyaW5nOyByZWFzb246IHN0cmluZzsgYXQ6IG51bWJlciB9IHwgbnVsbDsgZXJyb3I6IHsgbWVzc2FnZTogc3RyaW5nIH0gfCBudWxsOyBzdGFydGVkQXQ6IG51bWJlciB8IG51bGw7IGZpbmlzaGVkQXQ6IG51bWJlciB8IG51bGwgfVxuICBzdGVwczogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyByb2xlOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmcgfCBudWxsOyBzdGF0dXM6IHN0cmluZzsgYXR0ZW1wdHNDb3VudDogbnVtYmVyOyBjbGFpbWVkT3V0Y29tZTogc3RyaW5nIHwgbnVsbDsgdmVyaWZpZWQ6IGJvb2xlYW47IGNvc3RVc2Q6IG51bWJlciB9PlxuICBjb250ZXh0OiB7XG4gICAgcHJvamVjdERpZ2VzdDogc3RyaW5nOyBicmFuY2g6IHN0cmluZyB8IG51bGw7IGhlYWRTaGE6IHN0cmluZyB8IG51bGxcbiAgICBpbmplY3RlZE1lbW9yaWVzOiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT5cbiAgICBzdGVwU3VtbWFyaWVzOiBBcnJheTx7IHN0ZXBUaXRsZTogc3RyaW5nOyBzdW1tYXJ5OiBzdHJpbmc7IGNoYW5nZWRGaWxlczogc3RyaW5nW107IGF0OiBudW1iZXIgfT5cbiAgICBkZWNpc2lvbkxvZzogQXJyYXk8eyBraW5kOiBzdHJpbmc7IGRldGFpbDogc3RyaW5nOyBhdDogbnVtYmVyIH0+XG4gIH0gfCBudWxsXG59XG5cbi8qKiBHRVQgL3NjaGVkdWxlZCBcdTc2ODRcdTRFRkJcdTUyQTFcdTY3NjFcdTc2RUVcdTMwMDIgKi9cbmludGVyZmFjZSBTY2hlZHVsZWRUYXNrRW50cnkge1xuICBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZ1xuICBpbnRlcnZhbE1pbnV0ZXM6IG51bWJlcjsgZW5hYmxlZDogYm9vbGVhbjsgbGFzdFJ1bkF0OiBudW1iZXIgfCBudWxsOyBsYXN0UmVzdWx0OiBzdHJpbmc7IG5leHREdWVBdDogbnVtYmVyXG59XG5cbi8qKiBHRVQgL21lbW9yaWVzIFx1NzY4NFx1OEJCMFx1NUZDNlx1Njc2MVx1NzZFRVx1RkYwOFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1NjU3MFx1NjM2RVx1NkU5MFx1RkYwOVx1MzAwMiAqL1xuaW50ZXJmYWNlIE1lbW9yeUVudHJ5IHtcbiAgaWQ6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmc7IHJlbGF0ZWRGaWxlczogc3RyaW5nW11cbiAgaXNIdW1hbkNvbmZpcm1lZDogYm9vbGVhbjsgZ2l0QnJhbmNoOiBzdHJpbmcgfCBudWxsOyBzY29wZTogc3RyaW5nOyBzb3VyY2VUYWc6IHN0cmluZ1xuICBiYXNpc1NoYTogc3RyaW5nIHwgbnVsbDsgc3RhdHVzOiBzdHJpbmc7IGxhc3RWZXJpZmllZFNoYTogc3RyaW5nIHwgbnVsbFxuICBjcmVhdGVkQXQ6IG51bWJlcjsgdXBkYXRlZEF0OiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIE1lbW9yaWVzUGF5bG9hZCB7XG4gIG1lbW9yaWVzOiBNZW1vcnlFbnRyeVtdXG4gIGJyYW5jaDogc3RyaW5nIHwgbnVsbFxuICBoZWFkU2hhOiBzdHJpbmcgfCBudWxsXG4gIGJhc2VsaW5lOiB7IHNoYTogc3RyaW5nIHwgbnVsbDsgdXBkYXRlZEF0OiBudW1iZXIgfSB8IG51bGxcbiAgYmVoaW5kQ291bnQ6IG51bWJlclxufVxuXG4vKiogUE9TVCAvbWVtb3J5L3N5bmMgXHU3Njg0XHU1NDBDXHU2QjY1XHU2MkE1XHU1NDRBXHUzMDAyICovXG5pbnRlcmZhY2UgU3luY1JlcG9ydCB7XG4gIG9rOiBib29sZWFuXG4gIGVycm9yPzogc3RyaW5nXG4gIGJlaGluZENvdW50PzogbnVtYmVyXG4gIHN0YWxlUHJvcG9zYWxzPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyByZWFzb246IHN0cmluZyB9PlxuICByZW5ld2VkPzogbnVtYmVyXG4gIG5ld0NhbmRpZGF0ZXM/OiBBcnJheTx7IHR5cGU6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29udGVudDogc3RyaW5nIH0+XG4gIHZlcmRpY3Q/OiBzdHJpbmdcbn1cblxuLyoqIFx1OEJDNFx1NUJBMVx1OTVFRVx1OTg5OFx1NzJCNlx1NjAwMSBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXG5jb25zdCBJU1NVRV9TVEFUVVNfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBvcGVuOiAnXHU1Rjg1XHU1OTA0XHU3NDA2JyxcbiAgZml4aW5nOiAnXHU0RkVFXHU1OTBEXHU0RTJEJyxcbiAgcmVzb2x2ZWQ6ICdcdTVERjJcdTg5RTNcdTUxQjMnLFxuICBhY2NlcHRlZDogJ1x1NURGMlx1NjNBNVx1NTNENycsXG4gIHJlamVjdGVkOiAnXHU1REYyXHU2MkQyXHU3RUREJyxcbn1cblxuLyoqIFx1OEJCMFx1NUZDNlx1N0M3Qlx1NTc4QiBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXG5jb25zdCBNRU1PUllfVFlQRV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIGFyY2hpdGVjdHVyZV9kZWNpc2lvbjogJ1x1NjdCNlx1Njc4NFx1NTFCM1x1N0I1NicsIHBhdHRlcm5fcnVsZTogJ1x1NkEyMVx1NUYwRlx1ODlDNFx1NTIxOScsIHJpc2tfaG90c3BvdDogJ1x1OThDRVx1OTY2OVx1NzBFRFx1NzBCOScsXG4gIGxlYXJuZWRfY29uY2VwdDogJ1x1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNScsIHVzZXJfcHJvZmlsZTogJ1x1NzUyOFx1NjIzN1x1NTA0Rlx1NTk3RCcsIHByb2plY3RfbG9nOiAnXHU5ODc5XHU3NkVFXHU2NUU1XHU1RkQ3JywgZGFpbHlfbG9nOiAnXHU2NUU1XHU1RkQ3Jyxcbn1cblxuLyoqIFx1OEJCMFx1NUZDNlx1Njc2NVx1NkU5MCBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXG5jb25zdCBNRU1PUllfU09VUkNFX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgcnVuOiAnXHU2MjY3XHU4ODRDXHU2M0QwXHU3MEJDJywgcmV2aWV3OiAnXHU2ODM4XHU2N0U1XHU2Qzg5XHU2REMwJywgc3luYzogJ1x1NjJDOVx1NTNENlx1NTQwQ1x1NkI2NScsIGNoYXQ6ICdBSSBcdThCQjBcdTVGNTUnLCBtYW51YWw6ICdcdTYyNEJcdTUyQTgnLFxufVxuXG4vKiogXHU3RjE2XHU2MzkyXHU4OUQyXHU4MjcyIFx1MjE5MiBcdTRFMkRcdTY1ODdcdTY4MDdcdTdCN0VcdTMwMDIgKi9cbmNvbnN0IFJPTEVfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBhbmFseXNpczogJ1x1NTIwNlx1Njc5MCcsIHBsYW5uaW5nOiAnXHU4OUM0XHU1MjEyJywgY29kaW5nOiAnXHU1RjAwXHU1M0QxJywgb3BzOiAnXHU3QjgwXHU1MzU1XHU2NENEXHU0RjVDJywgdmVyaWZpY2F0aW9uOiAnXHU5QThDXHU2NTM2Jyxcbn1cblxuLyoqIFx1NkI2NVx1OUFBNFx1NTkzMVx1OEQyNVx1N0I1Nlx1NzU2NSBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXG5jb25zdCBQT0xJQ1lfTEFCRUxTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAncmV0cnktZXNjYWxhdGUnOiAnXHU5MUNEXHU4QkQ1XHU1RTc2XHU1MzQ3XHU3RUE3XHU2QTIxXHU1NzhCJywgJ3JldHJ5LWZhbGxiYWNrJzogJ1x1OTFDRFx1OEJENScsIHNraXA6ICdcdTU5MzFcdThEMjVcdTUyMTlcdThERjNcdThGQzcnLCBhc2s6ICdcdTU5MzFcdThEMjVcdTUyMTlcdTY2ODJcdTUwNUNcdTk1RUVcdTRFQkEnLFxufVxuXG4vKiogUnVuIFx1NzJCNlx1NjAwMSBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXG5jb25zdCBSVU5fU1RBVFVTX0xBQkVMUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgcXVldWVkOiAnXHU2MzkyXHU5NjFGXHU0RTJEJywgcnVubmluZzogJ1x1OEZEMFx1ODg0Q1x1NEUyRCcsIHBhdXNlZDogJ1x1NURGMlx1NjY4Mlx1NTA1QycsIGJsb2NrZWQ6ICdcdTk2M0JcdTU4NUUnLCByZXRyeWluZzogJ1x1OTFDRFx1OEJENVx1NEUyRCcsXG4gIHZlcmlmeWluZzogJ1x1NjUzNlx1NUMzRVx1OUE4Q1x1NjUzNlx1NEUyRCcsIHN1Y2NlZWRlZDogJ1x1NURGMlx1NjIxMFx1NTI5RicsIGNvbXBsZXRlZDogJ1x1NURGMlx1NjIxMFx1NTI5RicsIGZhaWxlZDogJ1x1NTkzMVx1OEQyNScsIGNhbmNlbGxlZDogJ1x1NURGMlx1NTNENlx1NkQ4OCcsIGludGVycnVwdGVkOiAnXHU1REYyXHU0RTJEXHU2NUFEJyxcbn1cblxuLyoqIFx1NkI2NVx1OUFBNFx1NzJCNlx1NjAwMSBcdTIxOTIgXHU0RTJEXHU2NTg3XHU2ODA3XHU3QjdFXHUzMDAyICovXG5jb25zdCBTVEVQX1NUQVRVU19MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIHBlbmRpbmc6ICdcdTVGODVcdTYyNjdcdTg4NEMnLCByZWFkeTogJ1x1NUMzMVx1N0VFQScsIHJ1bm5pbmc6ICdcdTYyNjdcdTg4NENcdTRFMkQnLCBwYXVzZWQ6ICdcdTY2ODJcdTUwNUMnLCByZXRyeWluZzogJ1x1OTFDRFx1OEJENVx1NEUyRCcsXG4gIHN1Y2NlZWRlZDogJ1x1NURGMlx1NjIxMFx1NTI5RicsIGZhaWxlZDogJ1x1NTkzMVx1OEQyNScsIHNraXBwZWQ6ICdcdTVERjJcdThERjNcdThGQzcnLCBibG9ja2VkOiAnXHU5NjNCXHU1ODVFJywgY2FuY2VsbGVkOiAnXHU1REYyXHU1M0Q2XHU2RDg4JywgaW50ZXJydXB0ZWQ6ICdcdTVERjJcdTRFMkRcdTY1QUQnLFxufVxuXG4vKiogXHU4QkM0XHU1QkExXHU5NUVFXHU5ODk4XHU0RTI1XHU5MUNEXHU1RUE2IFx1MjE5MiBcdTVGQkRcdTdBRTBcdTVFOTVcdTgyNzJcdTMwMDIgKi9cbmZ1bmN0aW9uIHNldmVyaXR5Q29sb3Ioc2V2ZXJpdHk6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChzZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBzZXZlcml0eSA9PT0gJ2Jsb2NrZXInKSByZXR1cm4gJyNjZTkxNzgnXG4gIGlmIChzZXZlcml0eSA9PT0gJ21ham9yJykgcmV0dXJuICcjZDdiYTdkJ1xuICBpZiAoc2V2ZXJpdHkgPT09ICdpbmZvJykgcmV0dXJuICcjNmI4YjhiJ1xuICByZXR1cm4gJyM1NjljZDYnXG59XG5cbi8qKiBcdTRFMjVcdTkxQ0RcdTVFQTZcdTVGNTJcdTRFMDBcdUZGMDhcdTUxN0NcdTVCQjlcdTUzODZcdTUzRjJcdThCQjBcdTVGNTVcdTkxQ0NcdTc2ODQgaGlnaC9tZWRpdW0vbG93XHVGRjFCXHU2NzJBXHU3N0U1XHU1NkRFXHU4NDNEIG1pbm9yXHVGRjA5XHVGRjBDXHU3RURGXHU4QkExL1x1N0I1Qlx1OTAwOS9cdTc3NDBcdTgyNzJcdTUxNzFcdTc1MjhcdTMwMDIgKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZUlzc3VlU2V2ZXJpdHkoc2V2ZXJpdHk6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChzZXZlcml0eSA9PT0gJ2hpZ2gnKSByZXR1cm4gJ21ham9yJ1xuICBpZiAoc2V2ZXJpdHkgPT09ICdtZWRpdW0nIHx8IHNldmVyaXR5ID09PSAnbG93JykgcmV0dXJuICdtaW5vcidcbiAgcmV0dXJuIHNldmVyaXR5ID09PSAnYmxvY2tlcicgfHwgc2V2ZXJpdHkgPT09ICdjcml0aWNhbCcgfHwgc2V2ZXJpdHkgPT09ICdtYWpvcicgfHwgc2V2ZXJpdHkgPT09ICdtaW5vcicgfHwgc2V2ZXJpdHkgPT09ICdpbmZvJ1xuICAgID8gc2V2ZXJpdHkgOiAnbWlub3InXG59XG5cbi8vIFx1NEUzQlx1OTg5OFx1NUJGOVx1NkJENFx1NUVBNlx1NUYxNVx1NjRDRVx1RkYwOHBhcnNlQ29sb3IgLyByZWxhdGl2ZUx1bWluYW5jZSAvIGRhcmtlbi9saWdodGVuIC8gdGhlbWVBd2FyZVRleHRcdUZGMDlcbi8vIFx1NURGMlx1NjJCRFx1NTNENlx1NTIzMCAuL3RoZW1lLnRzIFx1N0VERlx1NEUwMFx1N0VGNFx1NjJBNFx1MzAwMlx1NTE2OFx1NjU4N1x1NEVGNlx1NEUwRFx1NTNEOFx1NUYwRlx1RkYxQVxuLy8gMSkgXHU1RjNBXHU4QzAzXHU4MjcyXHU2NTg3XHU1QjU3XHU1RkM1XHU5ODdCXHU3RUNGIHRoZW1lQXdhcmVUZXh0XHVGRjA4XHU2RTMyXHU2N0QzXHU2NzFGXHU4QzAzXHU3NTI4XHVGRjA5XHVGRjFCXG4vLyAyKSBhY3RpdmUgXHU5QUQ4XHU0RUFFXHU4MENDXHU2NjZGXHU0RTAwXHU1RjhCIGJ1dHRvbi1pbmZvLWZpbGxcdUZGMENcdTc5ODFcdTZCNjIgYnJhbmQtcHJpbWFyeSBcdTRGNUNcdTgwQ0NcdTY2NkZcbi8vICAgIFx1RkYwOFx1NkRGMVx1ODI3Mlx1NEUzQlx1OTg5OFx1NEUwQlx1OEZEMVx1NzY3RFx1RkYwQ1x1OTE0RFx1NzY3RFx1NUI1N1x1NEUwRFx1NTNFRlx1ODlDMVx1MjAxNFx1MjAxNFx1MzAwQ1x1OTg3NVx1N0I3RVx1NzY3RFx1NTc1N1x1MzAwRFx1NEU4Qlx1NjU0NVx1NjgzOVx1NTZFMFx1RkYwOVx1MzAwMlxuXG4vKiogXHU4QkM0XHU1QkExXHU3NkVFXHU2ODA3XHVGRjA4Y2hhbmdlSWRcdUZGMDlcdTIxOTIgXHU1M0VGXHU4QkZCXHU2ODA3XHU3QjdFXHVGRjFBXHU1NDA4XHU2MjEwIHJldmlldzo8c2hhPiBcdTYzMDdcdTU0MTFcdTYzRDBcdTRFQTRcdUZGMENjaGdfKiBcdTYzMDdcdTU0MTFcdTUzRDhcdTY2RjRcdUZGMENhZGhvYyBcdTRFM0FcdTVERTVcdTRGNUNcdTUzM0FcdTMwMDIgKi9cbmZ1bmN0aW9uIGlzc3VlVGFyZ2V0TGFiZWwoY2hhbmdlSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGlkID0gdHlwZW9mIGNoYW5nZUlkID09PSAnc3RyaW5nJyA/IGNoYW5nZUlkIDogJydcbiAgaWYgKGlkLnN0YXJ0c1dpdGgoJ3JldmlldzonKSkgcmV0dXJuIGBcdTYzRDBcdTRFQTQgJHtpZC5zbGljZSg3LCAxNSl9YFxuICBpZiAoaWQgPT09ICdhZGhvYycpIHJldHVybiAnXHU1REU1XHU0RjVDXHU1MzNBJ1xuICByZXR1cm4gYFx1NTNEOFx1NjZGNCAke2lkLnNsaWNlKDAsIDExKX1gXG59XG5cbi8qKiBcdTYwM0JcdTdFRDMvXHU3RUQzXHU2Nzg0XHU1MzE2XHU3QjE0XHU4QkIwXHU3Njg0XHU4RjdCXHU5MUNGIE1hcmtkb3duIFx1NkUzMlx1NjdEM1x1RkYxQVx1MzAwQyMjIFx1MzAwRFx1ODI4Mlx1NjgwN1x1OTg5OFx1Nzc0MFx1ODI3Mlx1NTJBMFx1N0M5N1x1RkYwQ1x1MzAwQy0gXHUzMDBEXHU1MjE3XHU4ODY4XHU1MkEwXHU1NzA2XHU3MEI5XHVGRjBDXHU1MTc2XHU0RjU5XHU1MzlGXHU2ODM3XHUzMDAyICovXG5mdW5jdGlvbiByZW5kZXJTdHJ1Y3R1cmVkQ29udGVudChjb250ZW50OiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XG4gIGlmICh0eXBlb2YgY29udGVudCAhPT0gJ3N0cmluZycgfHwgY29udGVudCA9PT0gJycpIHJldHVybiBbXVxuICByZXR1cm4gY29udGVudC5zcGxpdCgnXFxuJykubWFwKChsaW5lLCBpbmRleCkgPT4ge1xuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJyMjICcpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGtleT17aW5kZXh9IHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCwgZm9udFNpemU6ICcxMi41cHgnLCBtYXJnaW5Ub3A6IGluZGV4ID09PSAwID8gMCA6IDEwLCBtYXJnaW5Cb3R0b206IDIsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT5cbiAgICAgICAgICB7bGluZS5zbGljZSgzKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJy0gJykpIHtcbiAgICAgIHJldHVybiA8ZGl2IGtleT17aW5kZXh9IHN0eWxlPXt7IHBhZGRpbmdMZWZ0OiAxNCwgdGV4dEluZGVudDogLTEwIH19Plx1MjAyMiB7cmVuZGVyV2l0aFBlZWsobGluZS5zbGljZSgyKSl9PC9kaXY+XG4gICAgfVxuICAgIHJldHVybiA8ZGl2IGtleT17aW5kZXh9PntsaW5lID09PSAnJyA/ICdcXHUwMEEwJyA6IHJlbmRlcldpdGhQZWVrKGxpbmUpfTwvZGl2PlxuICB9KVxufVxuXG4vKiogcGVlayBcdTcwQjlcdTUxRkJcdTU2REVcdThDMDNcdUZGMUFcdTc1MzEgV29ya3NwYWNlRnJhbWUgXHU2Q0U4XHU1MTY1XHVGRjA4XHU2RTMyXHU2N0QzXHU1NjY4XHU0RkREXHU2MzAxXHU2QTIxXHU1NzU3XHU3RUE3XHU3RUFGXHU1MUZEXHU2NTcwXHVGRjA5XHUzMDAyICovXG5sZXQgcGVla09wZW5lcjogKChwYXRoOiBzdHJpbmcsIGxpbmU6IG51bWJlcikgPT4gdm9pZCkgfCB1bmRlZmluZWRcblxuLyoqIFx1NjI4QVx1NjU4N1x1NjcyQ1x1NEUyRFx1NzY4NCBmaWxlOmxpbmUgXHU1RjE1XHU3NTI4XHU2RTMyXHU2N0QzXHU0RTNBXHU1M0VGXHU3MEI5XHU1MUZCXHU4MkFGXHU3MjQ3XHVGRjA4XHU3MEI5XHU1MUZCXHU1RjM5XHU1MUZBXHU0RUUzXHU3ODAxXHU0RTBBXHU0RTBCXHU2NTg3XHVGRjA5XHUzMDAyICovXG5mdW5jdGlvbiByZW5kZXJXaXRoUGVlayh0ZXh0OiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGUge1xuICBjb25zdCBub2RlczogUmVhY3QuUmVhY3ROb2RlW10gPSBbXVxuICBsZXQgbGFzdCA9IDBcbiAgbGV0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXkgfCBudWxsXG4gIEZJTEVfTElORV9QQVRURVJOLmxhc3RJbmRleCA9IDBcbiAgd2hpbGUgKChtYXRjaCA9IEZJTEVfTElORV9QQVRURVJOLmV4ZWModGV4dCkpICE9PSBudWxsKSB7XG4gICAgaWYgKG1hdGNoLmluZGV4ID4gbGFzdCkgbm9kZXMucHVzaCh0ZXh0LnNsaWNlKGxhc3QsIG1hdGNoLmluZGV4KSlcbiAgICBjb25zdCBbZnVsbCwgcGF0aCwgbGluZVN0cl0gPSBtYXRjaFxuICAgIG5vZGVzLnB1c2goXG4gICAgICA8YnV0dG9uXG4gICAgICAgIGtleT17YCR7bWF0Y2guaW5kZXh9LSR7ZnVsbH1gfVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJywgYm9yZGVyOiAnbm9uZScsIHBhZGRpbmc6ICcwIDFweCcsIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgIGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknLFxuICAgICAgICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJywgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUgZG90dGVkJyxcbiAgICAgICAgfX1cbiAgICAgICAgdGl0bGU9XCJcdTcwQjlcdTUxRkJcdTY3RTVcdTc3MEJcdTRFRTNcdTc4MDFcdTRFMEFcdTRFMEJcdTY1ODdcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHBlZWtPcGVuZXI/LihwYXRoLCBOdW1iZXIobGluZVN0cikpIH19XG4gICAgICA+e2Z1bGx9PC9idXR0b24+LFxuICAgIClcbiAgICBsYXN0ID0gbWF0Y2guaW5kZXggKyBmdWxsLmxlbmd0aFxuICB9XG4gIGlmIChsYXN0IDwgdGV4dC5sZW5ndGgpIG5vZGVzLnB1c2godGV4dC5zbGljZShsYXN0KSlcbiAgcmV0dXJuIG5vZGVzLmxlbmd0aCA9PT0gMSA/IG5vZGVzWzBdIDogPHNwYW4+e25vZGVzfTwvc3Bhbj5cbn1cblxuLyoqXG4gKiBcdTg5QzZcdTg5QzlcdTYzNjJcdTUyMTdcdTY4MzdcdTVGMEZcdTg4NjhcdUZGMUFcdTk2OEZcdTY3MkNcdTdFQzRcdTRFRjZcdTYzMDJcdThGN0QvXHU1Mzc4XHU4RjdEXHVGRjA4XHU1Mzc4XHU4RjdEXHU1MzczXHU1QjhDXHU1MTY4XHU2MDYyXHU1OTBEXHU1MzlGXHU3NTFGXHU1RTAzXHU1QzQwXHVGRjA5XHUzMDAyXG4gKiBcdTZDRThcdTYxMEZcdUZGMUFcdTc5ODFcdTZCNjJcdTc1MjggOmhhcygpIFx1NTA1QVx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1MjAxNFx1MjAxNFx1NUI5OFx1NjVCOVx1Njc4NFx1NUVGQVx1NEVBN1x1NzI2OVx1NTFFMFx1NTM0MVx1NEUyQVx1N0VDNFx1NEVGNlx1NjgzOVx1N0M3Qlx1OTBGRFx1NTNFQiByb290XHVGRjBDXG4gKiBcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdTRGMUFcdTYyOEFcdTY1NzRcdTRFMkFcdTgwNEFcdTU5MjlcdTVCQjlcdTU2NjhcdThCRUZcdTk0QjNcdTUyMzZcdUZGMDhcdTUzODZcdTUzRjJcdTRFOEJcdTY1NDVcdUZGMDlcdTMwMDJcdTZCNjRcdTg4NjhcdTUzRUFcdTRGRERcdTc1NTlcdTdGNTFcdTY4M0NcdTYzNjJcdTUyMTdcdTRFMEVcdTYyRDZcdTYyRkRcdTY3QzRcdTk2OTBcdTg1Q0ZcdTMwMDJcbiAqL1xuY29uc3QgTEFZT1VUX1NUWUxFID0gYFxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA+IGRpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0geyBvcmRlcjogMzsgfVxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA+IGRpdltjbGFzcyo9XCJkZXRhaWxzQ29sXCJdIHsgb3JkZXI6IDI7IH1cbmRpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl1bZGF0YS1kZXRhaWxzLWNvbGxhcHNlZF0gPiBkaXZbY2xhc3MqPVwiY2VudGVyQ29sXCJdLFxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXVtkYXRhLWRldGFpbHMtY29sbGFwc2VkXSA+IGRpdltjbGFzcyo9XCJkZXRhaWxzQ29sXCJdIHsgb3JkZXI6IDA7IH1cbmRpdltjbGFzcyo9XCJoYW5kbGVcIl1bZGF0YS1zaWRlPVwiZGV0YWlsc1wiXSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXTpub3QoW2RhdGEtZGV0YWlscy1jb2xsYXBzZWRdKSB7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBtaW5tYXgoMCwgMWZyKSB2YXIoLS1wYy1jaGF0LXcsIDM2MHB4KSAhaW1wb3J0YW50O1xufVxuYFxuXG4vKipcbiAqIFx1NEYxQVx1OEJERFx1N0VERlx1OEJBMVx1ODg0Q1x1NzY4NFx1NEUyNFx1ODg0Q1x1OTRCM1x1NTIzNlx1RkYwOFx1NzUyOFx1NjIzN1x1NjMwN1x1NUI5QVx1NzY4NFx1NjgzN1x1NUYwRlx1RkYwOVx1MzAwMlx1NEUwRFx1ODBGRFx1OEQ3MCBDU1MgXHU5MDA5XHU2MkU5XHU1NjY4XHVGRjFBXG4gKiBcdTVCOThcdTY1QjlcdTU5MUFcdTRFMkFcdTZBMjFcdTU3NTdcdTc2ODRcdTY4MzlcdTdDN0JcdTkwRkRcdTUzRUIgYHJvb3RgXHVGRjA4XHU2Nzg0XHU1RUZBXHU1NDBFXHU2NjJGIGBoYXNoX3Jvb3RgXHVGRjA5XHVGRjBDXHU1MTc2XHU0RTJEXG4gKiBDb252ZXJzYXRpb25Sb290IFx1NzY4NFx1NUI1MFx1NjgxMVx1OTFDQ1x1NUMzMVx1NTMwNVx1NTQyQlx1N0VERlx1OEJBMVx1ODg0Q1x1NzY4NCBgaGFzaF9zZXBgIFx1NTIwNlx1OTY5NCBzcGFuXHUyMDE0XHUyMDE0XG4gKiBcdTRFRkJcdTRGNTVcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdUZGMDhcdTU0MkIgOmhhcygpXHVGRjA5XHU5MEZEXHU0RjFBXHU2MjhBXHU2NTc0XHU0RTJBXHU4MDRBXHU1OTI5XHU1QkI5XHU1NjY4XHU5NEIzXHU2MjEwXHU0RTI0XHU4ODRDXHVGRjBDXHU2NzQwXHU2QjdCXHU2RURBXHU1MkE4XHUzMDAyXG4gKiBcdTU2RTBcdTZCNjRcdTU3MjhcdThGRDBcdTg4NENcdTY1RjZcdTYzMDlcdTU1MkZcdTRFMDBcdTVGNjJcdTcyQjZcdTVCOUFcdTRGNERcdUZGMUFcdTVDNDVcdTRFMkRcdTYzOTJcdTcyNDggKyBcdTc2RjRcdTYzQTVcdTVCNTBcdTRFRTNcdTU0MkJcdTY1ODdcdTY3MkMgXCJ8XCIgXHU3Njg0XG4gKiBcdTUyMDZcdTk2OTQgc3Bhblx1RkYwQ1x1NTQ3RFx1NEUyRFx1NTQwRVx1NjI4QVx1NUI5OFx1NjVCOVx1N0M3Qlx1NTQwRFx1NTM5Rlx1NjgzN1x1NTE5OVx1OEZEQlx1NjgzN1x1NUYwRlx1ODg2OFx1RkYwOFx1N0NCRVx1NTFDNlx1NTIzMFx1Njc4NFx1NUVGQVx1NTRDOFx1NUUwQ1x1RkYwOVx1MzAwMlxuICogQHJldHVybnMgXHU2Q0U4XHU1MTY1XHU3Njg0IHN0eWxlIFx1NTE0M1x1N0QyMFx1RkYxQlx1NUI5OFx1NjVCOVx1NjcyQVx1NkUzMlx1NjdEM1x1N0VERlx1OEJBMVx1ODg0Q1x1NjVGNlx1NEUzQSB1bmRlZmluZWRcdTMwMDJcbiAqL1xuY29uc3QgYXBwbHlTdGF0c0xpbmVDbGFtcCA9ICgpOiBIVE1MU3R5bGVFbGVtZW50IHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3Qgc2VwU3BhbiA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MU3BhbkVsZW1lbnQ+KCdkaXZbY2xhc3MqPVwiX3Jvb3RcIl0gPiBzcGFuW2NsYXNzKj1cIl9zZXBcIl0nKSlcbiAgICAuZmluZCgoc3BhbikgPT4gc3Bhbi50ZXh0Q29udGVudCA9PT0gJ3wnKVxuICBjb25zdCByb290RGl2ID0gc2VwU3Bhbj8ucGFyZW50RWxlbWVudFxuICBjb25zdCBoYXNoQ2xhc3MgPSByb290RGl2Py5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5maW5kKChuYW1lKSA9PiBuYW1lLmVuZHNXaXRoKCdfcm9vdCcpKVxuICBpZiAocm9vdERpdiA9PT0gdW5kZWZpbmVkIHx8IHJvb3REaXYgPT09IG51bGwgfHwgaGFzaENsYXNzID09PSB1bmRlZmluZWQgfHwgZ2V0Q29tcHV0ZWRTdHlsZShyb290RGl2KS50ZXh0QWxpZ24gIT09ICdjZW50ZXInKSByZXR1cm4gdW5kZWZpbmVkXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZS5pZCA9ICdwYy1zdGF0cy1jbGFtcCdcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG5kaXZbY2xhc3M9XCIke2hhc2hDbGFzc31cIl0ge1xuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgLXdlYmtpdC1saW5lLWNsYW1wOiAyO1xuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuICB0ZXh0LW92ZXJmbG93OiBjbGlwO1xuICBmb250LXNpemU6IDExcHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cbmBcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSlcbiAgcmV0dXJuIHN0eWxlXG59XG5cbnR5cGUgVGFiS2V5ID0gJ2NvbW1pdHMnIHwgJ292ZXJ2aWV3JyB8ICdleGVjdXRpb24nIHwgJ3JldmlldycgfCAnbm90ZXMnIHwgJ3NldHRpbmdzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZUZyYW1lUHJvcHMge1xuICAvKiogXHU1Qjk4XHU2NUI5IGRldGFpbHMgXHU2OUZEXHU1OTUxXHU3RUE2XHU3Njg0IGxvY2FsZSBcdTZDRThcdTUxNjVcdUZGMDhcdTYyMTFcdTRFRUNcdTZDRThcdTUxOENcdTc2ODQgcHJvamVjdC1jb250cm9sIFx1OEJDRFx1NTE3OFx1RkYwOVx1MzAwMiAqL1xuICB0PzogKGtleTogc3RyaW5nKSA9PiBzdHJpbmdcbiAgLyoqIFx1NUY1M1x1NTI0RFx1NEYxQVx1OEJERCBpZFx1RkYwOFx1NUI5OFx1NjVCOSBzZXNzaW9uIFx1NjgwN1x1NTFDNlx1NUM1RVx1NjAyN1x1RkYxQlx1NTIwN1x1NjM2Mlx1NEYxQVx1OEJERFx1NjVGNlx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1NURFNVx1NEY1Q1x1NTNGMFx1OEY2OFx1OTA1M1x1RkYwOVx1MzAwMiAqL1xuICBzZXNzaW9uSWQ/OiBzdHJpbmdcbn1cblxuLyoqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NjU4N1x1Njg0OFx1OEJDRFx1NTE3OFx1RkYwOHpoIC8gZW5cdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBjb25zdCBXT1JLU1BBQ0VfRElDVCA9IHtcbiAgemg6IHtcbiAgICAnd29ya3NwYWNlLnRpdGxlJzogJ1x1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMCcsXG4gICAgJ3RhYi5jb21taXRzJzogJ1x1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNScsXG4gICAgJ3RhYi5vdmVydmlldyc6ICdcdTk4NzlcdTc2RUVcdTYwM0JcdTg5QzgnLFxuICAgICd0YWIuZXhlY3V0aW9uJzogJ1x1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDMycsXG4gICAgJ3RhYi5yZXZpZXcnOiAnUmV2aWV3IFx1OTVFRVx1OTg5OCcsXG4gICAgJ3RhYi5ub3Rlcyc6ICdcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzYnLFxuICAgICd0YWIuc2V0dGluZ3MnOiAnXHU4QkJFXHU3RjZFJyxcbiAgICAnZXJyb3IubG9hZCc6ICdcdTUyQTBcdThGN0RcdTU5MzFcdThEMjUnLFxuICAgICdzdGF0ZS5wcm9qZWN0JzogJ1x1NUY1M1x1NTI0RFx1OTg3OVx1NzZFRScsXG4gICAgJ3N0YXRlLm5vUHJvamVjdCc6ICdcdTVDMUFcdTY3MkFcdTUyMURcdTU5Q0JcdTUzMTZcdTk4NzlcdTc2RUUnLFxuICAgICdzdGF0ZS5ub1Byb2plY3RIaW50JzogJ1x1NzBCOVx1NTFGQlx1MzAwQ1x1NTIxRFx1NTlDQlx1NTMxNlx1OTg3OVx1NzZFRVx1MzAwRFx1NjI2Qlx1NjNDRlx1NEVEM1x1NUU5M1x1N0VEM1x1Njc4NFx1MzAwMVx1NjI4MFx1NjcyRlx1NjgwOFx1NEUwRVx1N0IyNlx1NTNGN1x1N0QyMlx1NUYxNVx1MzAwMicsXG4gICAgJ2FjdGlvbi5ib290c3RyYXAnOiAnXHU1MjFEXHU1OUNCXHU1MzE2XHU5ODc5XHU3NkVFJyxcbiAgICAnYWN0aW9uLnJlc2Nhbic6ICdcdTkxQ0RcdTY1QjBcdTUyMURcdTU5Q0JcdTUzMTYgLyBcdTYyNkJcdTYzQ0YnLFxuICAgICdhY3Rpb24uYW5hbHl6ZSc6ICdcdTUyMDZcdTY3OTBcdTVGNTNcdTUyNERcdTY1MzlcdTUyQTgnLFxuICAgICdhY3Rpb24ucmV2aWV3JzogJ1x1OEJDNFx1NUJBMVx1NUY1M1x1NTI0RFx1NjUzOVx1NTJBOCcsXG4gICAgJ2FjdGlvbi52ZXJpZnknOiAnXHU5QThDXHU2NTM2XHU1RjUzXHU1MjREXHU2NTM5XHU1MkE4JyxcbiAgICAnYWN0aW9uLmNyZWF0ZUNoYW5nZSc6ICdcdTY1QjBcdTVFRkFcdTUzRDhcdTY2RjQnLFxuICAgICdhY3Rpb24ucnVubmluZyc6ICdcdTYyNjdcdTg4NENcdTRFMkRcdTIwMjYnLFxuICAgICdhY3Rpb24ucmVmcmVzaCc6ICdcdTUyMzdcdTY1QjAnLFxuICAgICdmb3JtLmNoYW5nZVRpdGxlJzogJ1x1NTNEOFx1NjZGNFx1NjgwN1x1OTg5OCcsXG4gICAgJ2Zvcm0uY2hhbmdlRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMDhcdTkwMDlcdTU4NkJcdUZGMDknLFxuICAgICdyZXN1bHQucGFuZWwnOiAnXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDJyxcblxuICAgICdyZXBvLnNjYW5IaXN0b3J5JzogJ1x1OTFDRFx1NUVGQVx1NTM4Nlx1NTNGMicsXG4gICAgJ3JlcG8uY29tbWl0cyc6ICdcdTYzRDBcdTRFQTQnLFxuICAgICdyZXBvLmJyYW5jaCc6ICdcdTUyMDZcdTY1MkYnLFxuICAgICdyZXBvLndvcmtpbmcnOiAnXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcbiAgICAncmVwby53b3JraW5nQ2xlYW4nOiAnXHU1REU1XHU0RjVDXHU1MzNBXHU1RTcyXHU1MUMwXHVGRjBDXHU2NUUwXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcbiAgICAncmVwby5lbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTYzRDBcdTRFQTRcdTMwMDInLFxuICAgICdyZXBvLmxvYWRGYWlsZWQnOiAnXHU2M0QwXHU0RUE0XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1JyxcbiAgICAncGlja2VyLnRpdGxlJzogJ1x1OTAwOVx1NjJFOVx1ODk4MVx1NjgzOFx1NjdFNVx1NzY4NFx1NjNEMFx1NEVBNFx1RkYwOFx1NTNFRlx1NTkxQVx1OTAwOVx1RkYwOScsXG4gICAgJ3BpY2tlci5wbGFjZWhvbGRlcic6ICdcdTcwQjlcdTUxRkJcdTkwMDlcdTYyRTlcdTYzRDBcdTRFQTRcdUZGMDhcdTUzRUZcdTU5MUFcdTkwMDlcdUZGMENcdTU0MkJcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQThcdUZGMDknLFxuICAgICdwaWNrZXIuc2VsZWN0ZWQnOiAnXHU1REYyXHU5MDA5JyxcbiAgICAncGlja2VyLmZpbHRlcic6ICdcdTYzMDlcdTY4MDdcdTk4OTgvXHU1NEM4XHU1RTBDL1x1NEY1Q1x1ODAwNVx1OEZDN1x1NkVFNFx1MjAyNicsXG4gICAgJ3BpY2tlci5jbGVhcic6ICdcdTZFMDVcdTdBN0EnLFxuICAgICdwaWNrZXIubm9NYXRjaCc6ICdcdTY1RTBcdTUzMzlcdTkxNERcdTYzRDBcdTRFQTRcdTMwMDInLFxuICAgICdwaWNrZXIuaGludCc6ICdcdTUyRkVcdTkwMDlcdTYzRDBcdTRFQTRcdTU0MEVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTAgQUkgXHU4OUUzXHU4QkZCXHVGRjFCXHU0RTBCXHU2NUI5XHU1M0VGXHU1MThEXHU4REQxXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHU0RTBFXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHUzMDAyJyxcbiAgICAncGlja2VyLnJvdW5kJzogJ1x1N0IyQyB7bn0gXHU4RjZFJyxcbiAgICAncGlja2VyLnJvdW5kTGF0ZXN0JzogJ1x1N0IyQyB7bn0gXHU4RjZFXHVGRjA4XHU2NzAwXHU2NUIwXHVGRjA5JyxcbiAgICAncGlja2VyLnJvdW5kU2VsZWN0JzogJ1x1OTAwOVx1NjU3NFx1OEY2RScsXG4gICAgJ3BpY2tlci5yb3VuZENsZWFyJzogJ1x1NTNENlx1NkQ4OFx1NjcyQ1x1OEY2RScsXG4gICAgJ3BpY2tlci51bmRpZ2VzdGVkJzogJ1x1NEUwQVx1NkIyMSBBSSBcdTYwM0JcdTdFRDNcdTRFNEJcdTU0MEVcdTc2ODRcdTY1QjBcdTYzRDBcdTRFQTRcdUZGMENcdTVDMUFcdTY3MkFcdTY4MzhcdTY3RTVcdTZEODhcdTUzMTYnLFxuICAgICdwaWNrZXIudW5kaWdlc3RlZENvdW50JzogJ3tufSBcdTRFMkFcdTYzRDBcdTRFQTRcdTY3MkFcdTZEODhcdTUzMTYnLFxuICAgICdpbXBhY3QuZmFjdG9ycyc6ICdcdTk4Q0VcdTk2NjlcdTY3ODRcdTYyMTBcdUZGMDhcdTRFM0FcdTRFQzBcdTRFNDhcdTY2MkZcdThGRDlcdTRFMkFcdTdCNDlcdTdFQTdcdUZGMDknLFxuICAgICdpbXBhY3QucG9pbnRzJzogJ1x1NUY3MVx1NTRDRFx1NzBCOVx1NjYwRVx1N0VDNicsXG4gICAgJ2ltcGFjdC5rZXlQb2ludHMnOiAnXHU1MTczXHU5NTJFXHU3RUM0XHU0RUY2JyxcbiAgICAnaW1wYWN0Lm1lbW9yeSc6ICdcdTdFRDNcdTU0MDhcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdTY4MzhcdTY3RTUnLFxuICAgICdpbXBhY3QuZnVuY3Rpb25zJzogJ1x1NTNEN1x1NUY3MVx1NTRDRFx1NTFGRFx1NjU3MFx1RkYwOFx1OEMwMVx1OEMwM1x1NzUyOFx1NEU4Nlx1ODhBQlx1NjUzOVx1NzY4NFx1NEVFM1x1NzgwMVx1RkYwOScsXG4gICAgJ2ltcGFjdC5mdW5jUm9sZSc6ICdcdTUxRkRcdTY1NzBcdTUyOUZcdTgwRkQnLFxuICAgICdpbXBhY3QuZnVuY0NoYW5nZSc6ICdcdTY3MkNcdTZCMjFcdTUzRDhcdTUzMTYnLFxuICAgICdpbXBhY3QuZnVuY0NhbGxlcnMnOiAnXHU1QkY5XHU4QzAzXHU3NTI4XHU2NUI5XHU3Njg0XHU1RjcxXHU1NENEJyxcbiAgICAnY2FjaGUuaGl0JzogJ1x1Njc2NVx1ODFFQVx1N0YxM1x1NUI1OCcsXG4gICAgJ2NhY2hlLnJlZ2VuZXJhdGUnOiAnXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwJyxcbiAgICAnY29zdC50b29sdGlwJzogJ1x1NjcyQ1x1NkIyMSBBSSBcdThDMDNcdTc1MjhcdTYyMTBcdTY3MkNcdUZGMDhcdTRGMzBcdTdCOTdcdUZGMENcdTYzMDkgRGVlcFNlZWsgXHU0RUY3XHU3NkVFXHU2Mjk4XHU3Qjk3XHVGRjA5JyxcbiAgICAnZXhlYy5jcmVhdGUnOiAnXHU2NUIwXHU1RUZBXHU2MjY3XHU4ODRDJyxcbiAgICAnZXhlYy5mb3JtVGl0bGUnOiAnXHU4OTgxXHU1MDVBXHU0RUMwXHU0RTQ4XHVGRjA4XHU0RTAwXHU1M0U1XHU4QkREXHVGRjA5JyxcbiAgICAnZXhlYy5mb3JtRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMUFcdTc2RUVcdTY4MDdcdTMwMDFcdTZEODlcdTUzQ0FcdTZBMjFcdTU3NTdcdTMwMDFcdTlBOENcdTY1MzZcdTY4MDdcdTUxQzYnLFxuICAgICdleGVjLnN0YXJ0JzogJ1x1NUYwMFx1NTlDQlx1NjI2N1x1ODg0QycsXG4gICAgJ2V4ZWMuc3RhcnRpbmcnOiAnXHU2QjYzXHU1NzI4XHU1NDJGXHU1MkE4XHUyMDI2JyxcbiAgICAnZXhlYy5jcmVhdGVIaW50JzogJ1x1NTIxQlx1NUVGQVx1NTNEOFx1NjZGNFx1NUU3Nlx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1OEJBMVx1NTIxMlx1RkYwQ1x1OTY4Rlx1NTQwRVx1NzUzMSBBSSBcdTVCNTBcdTRFRTNcdTc0MDZcdTkwMTBcdTZCNjVcdTYyNjdcdTg4NENcdUZGMUJcdThGREJcdTVFQTZcdTU3MjhcdTRFMEJcdTY1QjlcdTVCOUVcdTY1RjZcdTUyMzdcdTY1QjBcdUZGMENcdTY1RTBcdTk3MDBcdTUzQkJcdTgwNEFcdTU5MjlcdTMwMDInLFxuICAgICdleGVjLm1vZGVsRGVmYXVsdCc6ICdcdTYyNjdcdTg4NENcdTZBMjFcdTU3OEJcdUZGMDhcdTg5RDJcdTgyNzJcdTlFRDhcdThCQTRcdUZGMUFcdTUyMDZcdTY3OTAvXHU2NENEXHU0RjVDPVx1NUZFQlx1RkYwQ1x1NUYwMFx1NTNEMT1cdTY4MDdcdTUxQzZcdUZGMENcdTg5QzRcdTUyMTI9XHU2M0E4XHU3NDA2XHVGRjBDXHU5QThDXHU2NTM2PVx1OUE4Q1x1NjUzNlx1N0VBN1x1RkYwOScsXG4gICAgJ2JhZGdlLnJ1bm5pbmcnOiAne259IFx1NEUyQVx1NEVGQlx1NTJBMVx1OEZEMFx1ODg0Q1x1NEUyRFx1RkYwQ1x1NzBCOVx1NTFGQlx1NjdFNVx1NzcwQicsXG4gICAgJ25hcnJhdGl2ZS50aXRsZSc6ICdcdTVERTVcdTRGNUNcdThGNkVcdTZCMjFcdTUzRDlcdTRFOEInLFxuICAgICduYXJyYXRpdmUuZ2VuZXJhdGUnOiAnXHU2NTc0XHU0RjUzXHU4OUUzXHU4QkZCXHU4RkQ5XHU4RjZFXHU1REU1XHU0RjVDJyxcbiAgICAnbmFycmF0aXZlLnJ1bm5pbmcnOiAnXHU4OUUzXHU4QkZCXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4XHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXG4gICAgJ2JhZGdlLmZhaWxlZCc6ICd7bn0gXHU0RTJBXHU0RUZCXHU1MkExXHU5NzAwXHU4OTgxXHU1OTA0XHU3NDA2XHVGRjBDXHU3MEI5XHU1MUZCXHU2N0U1XHU3NzBCJyxcbiAgICAnZXhlYy5mbG93Q3JlYXRlJzogJ1x1NTg2Qlx1NTE5OVx1NEVGQlx1NTJBMScsXG4gICAgJ2V4ZWMuZmxvd09yY2hlc3RyYXRlJzogJ1x1Nzg2RVx1OEJBNFx1N0YxNlx1NjM5Mlx1RkYwOFx1NkJDRlx1NkI2NVx1NTNFRlx1NjUzOVx1NkEyMVx1NTc4Qi9cdTg5RDJcdTgyNzIvXHU1OTMxXHU4RDI1XHU3QjU2XHU3NTY1XHVGRjA5JyxcbiAgICAnZXhlYy5mbG93UnVuJzogJ1x1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYwOFJ1biBcdThCRTZcdTYwQzVcdTc3MEJcdThGREJcdTVFQTZcdTRFMEVcdTYyMTBcdTY3MkNcdUZGMDknLFxuICAgICdleGVjLmZsb3dNZW1vcnknOiAnXHU4MUVBXHU1MkE4XHU2M0QwXHU3MEJDXHU4QkIwXHU1RkM2XHVGRjA4XHU4QkIwXHU1RkM2XHU5NzYyXHU2NzdGXHU3ODZFXHU4QkE0XHVGRjA5JyxcbiAgICAnZXhlYy5wbGFubmluZyc6ICdcdTdGMTZcdTYzOTJcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhMTE0gXHU2QjYzXHU1NzI4XHU2MkM2XHU4OUUzXHU0RUZCXHU1MkExXHVGRjBDXHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXG4gICAgJ2V4ZWMuY29sLnN0ZXBzJzogJ1x1NkI2NVx1OUFBNCcsXG4gICAgJ25vdGVzLmVkaXQnOiAnXHU3RjE2XHU4RjkxJyxcbiAgICAnbm90ZXMudG9NZW1vcnknOiAnXHU4RjZDXHU4QkIwXHU1RkM2JyxcbiAgICAnbm90ZXMudG9NZW1vcnlIaW50JzogJ1x1NjI4QVx1OEZEOVx1Njc2MVx1N0IxNFx1OEJCMFx1NzY4NFx1NjgwN1x1OTg5OFx1NEUwRVx1NTE4NVx1NUJCOVx1NTg2Qlx1NTE2NVx1NEUwQlx1NjVCOVx1OEJCMFx1NUZDNlx1ODg2OFx1NTM1NVx1RkYwQ1x1Nzg2RVx1OEJBNFx1NTQwRVx1NTE2NVx1NUU5MycsXG4gICAgJ25vdGVzLnRvTWVtb3J5RG9uZSc6ICdcdTI3MTMgXHU1REYyXHU1ODZCXHU1MTY1XHU4QkIwXHU1RkM2XHU4ODY4XHU1MzU1XHVGRjA4XHU1NzI4XHU0RTBCXHU2NUI5XHUzMDBDXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHUzMDBEXHU1MzNBXHU3ODZFXHU4QkE0XHU3QzdCXHU1NzhCXHU1NDBFXHU2REZCXHU1MkEwXHVGRjA5JyxcbiAgICAnbm90ZXMuY29weU1kJzogJ1x1NTkwRFx1NTIzNiBNRCcsXG4gICAgJ25vdGVzLmNvcHlNZEhpbnQnOiAnXHU2MjhBXHU4RkQ5XHU2NzYxXHU3QjE0XHU4QkIwXHU1OTBEXHU1MjM2XHU0RTNBIE1hcmtkb3duIFx1NTIzMFx1NTI2QVx1OEQzNFx1Njc3RicsXG4gICAgJ25vdGVzLmNvcHlNZERvbmUnOiAnXHU1REYyXHU1OTBEXHU1MjM2XHU0RTNBIE1hcmtkb3duJyxcbiAgICAnbm90ZXMuZXhwb3J0TWQnOiAnXHU1QkZDXHU1MUZBIE1EJyxcbiAgICAnbm90ZXMuZXhwb3J0TWRIaW50JzogJ1x1NEUwQlx1OEY3RFx1NEUzQSAubWQgXHU2NTg3XHU0RUY2JyxcbiAgICAnbm90ZXMuZXhwb3J0RG9uZSc6ICdcdTVERjJcdTVCRkNcdTUxRkFcdTRFM0EgLm1kIFx1NjU4N1x1NEVGNicsXG4gICAgJ25vdGVzLmRpZ2VzdE5ldmVyJzogJ1x1NUMxQVx1NjcyQVx1NzUxRlx1NjIxMFx1OEZDNyBBSSBcdTYwM0JcdTdFRDMnLFxuICAgICdub3Rlcy5kaWdlc3RQZW5kaW5nJzogJ1x1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NTQwRVx1NjcwOSB7bn0gXHU0RTJBXHU2NUIwXHU2M0QwXHU0RUE0XHU2NzJBXHU2RDg4XHU1MzE2JyxcbiAgICAnZGV0YWlsLnNhdmVOb3RlJzogJ1x1NUI1OFx1NEUzQVx1N0IxNFx1OEJCMCcsXG4gICAgJ2RldGFpbC5zYXZlTm90ZUhpbnQnOiAnXHU2MjhBXHU2NzJDXHU2QjIxXHU2ODM4XHU2N0U1XHU3RUQzXHU4QkJBXHVGRjA4XHU2NTM5XHU0RTg2XHU0RUMwXHU0RTQ4L1x1NUI5RVx1NzNCMFx1OTAzQlx1OEY5MS9cdTk4Q0VcdTk2NjlcdTcwQjlcdUZGMDlcdTRFMDBcdTk1MkVcdTVCNThcdTRFM0FcdTdFRDNcdTY3ODRcdTUzMTZcdTdCMTRcdThCQjAnLFxuICAgICdkZXRhaWwuc2F2ZU5vdGVUaXRsZSc6ICdcdTY4MzhcdTY3RTVcdThCQjBcdTVGNTUnLFxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeSc6ICdcdTZDODlcdTZEQzBcdTRFM0FcdThCQjBcdTVGQzYnLFxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeUhpbnQnOiAnXHU2MjhBXHU2NzJDXHU2QjIxXHU2ODM4XHU2N0U1XHU3RUQzXHU4QkJBXHU2Qzg5XHU2REMwXHU0RTNBXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHVGRjA4XHU4RkRCXHU1MTY1XHU1Rjg1XHU3ODZFXHU4QkE0XHU5NjFGXHU1MjE3XHVGRjA5JyxcbiAgICAnbm90ZXMuc2F2ZSc6ICdcdTRGRERcdTVCNTgnLFxuICAgICdub3Rlcy5jYW5jZWwnOiAnXHU1M0Q2XHU2RDg4JyxcbiAgICAnbWVtb3J5LmJyYW5jaFNjb3BlJzogJ1x1NTIwNlx1NjUyRicsXG4gICAgJ21lbW9yeS5icmFuY2hBbGwnOiAnXHU1MTY4XHU5MEU4XHU1MjA2XHU2NTJGJyxcbiAgICAnbm90ZXMuc2VhcmNoJzogJ1x1NjQxQ1x1N0QyMlx1N0IxNFx1OEJCMFx1MjAyNicsXG4gICAgJ21vZGVsLnRpdGxlJzogJ1x1NkEyMVx1NTc4Qlx1NTIwNlx1OTE0RFx1RkYwOFx1ODlFM1x1OEJGQiAvIFx1NjAzQlx1N0VEM1x1N0I0OVx1NEVGQlx1NTJBMVx1NzUyOFx1NTRFQVx1NEUyQVx1NkEyMVx1NTc4Qlx1RkYwOScsXG4gICAgJ21vZGVsLmxvYWRpbmcnOiAnXHU4QkZCXHU1M0Q2XHU2QTIxXHU1NzhCXHU2RTA1XHU1MzU1XHUyMDI2JyxcbiAgICAnbW9kZWwuZm9sbG93Q2hhdCc6ICdcdThEREZcdTk2OEZcdTgwNEFcdTU5MjlcdTZBMjFcdTU3OEInLFxuICAgICdtb2RlbC5zYXZlJzogJ1x1NEZERFx1NUI1OFx1NUU3Nlx1NzUxRlx1NjU0OCcsXG4gICAgJ21vZGVsLnNhdmVkJzogJ1x1NURGMlx1NzUxRlx1NjU0OCcsXG4gICAgJ21vZGVsLmhpbnQnOiAnXHU0RkREXHU1QjU4XHU1NDBFXHU3QUNCXHU1MzczXHU3NTFGXHU2NTQ4XHU1RTc2XHU2MzAxXHU0RTQ1XHU1MzE2XHVGRjA4XHU5MUNEXHU1NDJGXHU1NDBFXHU0RkREXHU3NTU5XHVGRjA5XHVGRjFCXHU0RTBEXHU1RjcxXHU1NENEXHU4MDRBXHU1OTI5XHU2QTIxXHU1NzhCXHUzMDAyJyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5JzogJ0FJIFx1NjAzQlx1N0VEM1x1N0IxNFx1OEJCMCcsXG4gICAgJ25vdGVzLmFpU3VtbWFyeVJ1bic6ICdcdTYwM0JcdTdFRDNcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhcdTdFQTYgMTAtMzAgXHU3OUQyXHVGRjA5JyxcbiAgICAnbm90ZXMuZXhwYW5kJzogJ1x1NUM1NVx1NUYwMFx1NTE2OFx1NjU4NycsXG4gICAgJ25vdGVzLmNvbGxhcHNlJzogJ1x1NjUzNlx1OEQ3NycsXG4gICAgJ25vdGVzLnN1bW1hcnlUYWcnOiAnQUkgXHU2MDNCXHU3RUQzJyxcbiAgICAnbm90ZXMuZW1wdHlTZWFyY2gnOiAnXHU2NUUwXHU1MzM5XHU5MTREXHU3QjE0XHU4QkIwXHUzMDAyJyxcbiAgICAnbm90ZXMuY29udGVudEhpbnQnOiAnXHU3QjE0XHU4QkIwXHU1MTg1XHU1QkI5XHVGRjA4XHU2NTJGXHU2MzAxXHU1OTFBXHU4ODRDXHVGRjA5XHVGRjFBXHU3RUQzXHU4QkJBXHUzMDAxXHU3NTkxXHU5NUVFXHUzMDAxXHU1QjY2XHU0RTYwXHU4OTgxXHU3MEI5XHUzMDAxXHU1MTczXHU5NTJFXHU1MUIzXHU3QjU2XHUyMDI2JyxcbiAgICAnbm90ZXMudGFnc0hpbnQnOiAnXHU2ODA3XHU3QjdFXHVGRjA4XHU5MDE3XHU1M0Y3XHU1MjA2XHU5Njk0XHVGRjBDXHU5MDA5XHU1ODZCXHVGRjFCXHU0RkREXHU1QjU4XHU1NDBFXHU1M0VGXHU3MEI5XHU1MUZCXHU3QjVCXHU5MDA5XHVGRjA5JyxcbiAgICAnbm90ZXMucGluJzogJ1x1N0Y2RVx1OTg3NicsXG4gICAgJ25vdGVzLnVucGluJzogJ1x1NTNENlx1NkQ4OFx1N0Y2RVx1OTg3NicsXG4gICAgJ25vdGVzLmVkaXRlZEF0JzogJ1x1N0YxNlx1OEY5MVx1NEU4RScsXG4gICAgJ3Jldmlldy5maWx0ZXJBbGwnOiAnXHU1MTY4XHU5MEU4JyxcbiAgICAncmV2aWV3LnN0YXR1c0FsbCc6ICdcdTUxNjhcdTkwRThcdTcyQjZcdTYwMDEnLFxuICAgICdyZXZpZXcudmVyaWZ5JzogJ1x1NTkwRFx1NjhDMCcsXG4gICAgJ3Jldmlldy52ZXJpZnlSdW5uaW5nJzogJ1x1NTkwRFx1NjhDMFx1NEUyRFx1MjAyNicsXG4gICAgJ3Jldmlldy52ZXJpZnlIaW50JzogJ1x1NEZFRVx1NjUzOVx1NEVFM1x1NzgwMVx1NTQwRVx1NzBCOVx1NTFGQlx1RkYxQVx1ODFFQVx1NTJBOFx1NjhDMFx1NkQ0Qlx1OTVFRVx1OTg5OFx1NjYyRlx1NTQyNlx1NEZFRVx1NTkwRFx1MzAwMVx1NjUzOVx1NTJBOFx1NjYyRlx1NTQyNlx1NjcwMFx1NEYxOC9cdTY3MDBcdTVDMEZcdTRGQjVcdTUxNjVcdTMwMDFcdTY3MDlcdTY1RTBcdTY1QjBcdTk1RUVcdTk4OThcdUZGMUJcdTUxNjhcdTkwRThcdTkwMUFcdThGQzdcdTYyNERcdTgxRUFcdTUyQThcdTdGNkVcdTRFM0FcdTVERjJcdTg5RTNcdTUxQjMnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZSc6ICdcdTUyMjRcdTVCOUFcdThCRUZcdTYyQTUnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZUhpbnQnOiAnXHU0RUJBXHU1REU1XHU1MjI0XHU1QjlBXHU4QkU1XHU5NUVFXHU5ODk4XHU0RTNBXHU4QkVGXHU2MkE1XHU1RTc2XHU1MTczXHU5NUVEXHVGRjA4XHU0RTBFXHU1OTBEXHU2OEMwXHU4OUUzXHU1MUIzXHU3Njg0XHU4QkVEXHU0RTQ5XHU0RTBEXHU1NDBDXHVGRjA5JyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVUaXRsZSc6ICdcdTUyMjRcdTVCOUFcdTRFM0FcdThCRUZcdTYyQTVcdUZGMUYnLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZU1zZyc6ICdcdTMwMEN7dGl0bGV9XHUzMDBEXHU1QzA2XHU4OEFCXHU2ODA3XHU4QkIwXHU0RTNBXHU4QkVGXHU2MkE1XHVGRjA4XHU1REYyXHU2MkQyXHU3RUREXHVGRjA5XHU1RTc2XHU0RUNFXHU1Rjg1XHU1OTA0XHU3NDA2XHU0RTJEXHU3OUZCXHU5NjY0XHUzMDAyJyxcbiAgICAncmV2aWV3LmZpeERldGFpbCc6ICdcdTRGRUVcdTU5MERcdThCRTZcdTYwQzUnLFxuICAgICdyZXZpZXcuZml4U3RhdEZpbGVzJzogJ1x1NjU4N1x1NEVGNicsXG4gICAgJ3Jldmlldy5maXhGaWxlcyc6ICdcdTRGRUVcdTU5MERcdTZEODlcdTUzQ0FcdTY1ODdcdTRFRjYnLFxuICAgICdyZXZpZXcuZml4SW1wYWN0JzogJ1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNFx1RkYwOFx1NjUzOVx1NTJBOFx1N0IyNlx1NTNGN1x1NEUwRVx1OEMwM1x1NzUyOFx1NzBCOVx1RkYwOScsXG4gICAgJ3Jldmlldy5kZWZpbmVkSW4nOiAnXHU1QjlBXHU0RTQ5XHU0RThFJyxcbiAgICAncmV2aWV3LmNhbGxDb3VudCc6ICdcdTU5MDRcdThDMDNcdTc1MjgnLFxuICAgICdyZXZpZXcuZml4RGlmZic6ICdcdTRGRUVcdTU5MERcdTVERUVcdTVGMDJcdUZGMDhcdTc2RjhcdTVCRjlcdThCQzRcdTVCQTFcdTU3RkFcdTdFQkZcdUZGMDknLFxuICAgICdyZXZpZXcucmVmcmVzaCc6ICdcdTUyMzdcdTY1QjAnLFxuICAgICdyZXZpZXcucmV0ZW50aW9uSGludCc6ICdcdTVERjJcdTg5RTNcdTUxQjNcdTk1RUVcdTk4OThcdTRGRERcdTc1NTkge2RheXN9IFx1NTkyOVx1NTQwRVx1ODFFQVx1NTJBOFx1NkUwNVx1NzQwNicsXG4gICAgJ3Jldmlldy50YXJnZXQnOiAnXHU1QkY5XHU4QzYxJyxcbiAgICAncmV2aWV3LndvcmtpbmdUYXJnZXQnOiAnXHU1REU1XHU0RjVDXHU1MzNBJyxcblxuICAgICdwbGFuLnRpdGxlJzogJ1x1N0YxNlx1NjM5Mlx1OEJBMVx1NTIxMlx1Nzg2RVx1OEJBNCcsXG4gICAgJ3BsYW4uaGludCc6ICdcdTZCQ0ZcdTZCNjVcdTc2ODRcdTg5RDJcdTgyNzJcdTUxQjNcdTVCOUFcdTRFMEFcdTRFMEJcdTY1ODdcdTZDRThcdTUxNjVcdTRFMEVcdTlFRDhcdThCQTRcdTZBMjFcdTU3OEJcdUZGMDhcdTUyMDZcdTY3OTAvXHU2NENEXHU0RjVDPWZhc3RcdUZGMENcdTVGMDBcdTUzRDE9c3RhbmRhcmRcdUZGMENcdTg5QzRcdTUyMTI9cmVhc29uaW5nXHVGRjBDXHU5QThDXHU2NTM2PXZlcmlmaWVyXHVGRjA5XHVGRjFCXHU1M0VGXHU4QzAzXHU2NTc0XHU1NDBFXHU1MThEXHU1NDJGXHU1MkE4XHUzMDAyJyxcbiAgICAncGxhbi5jb2wuc3RlcCc6ICdcdTZCNjVcdTlBQTQnLCAncGxhbi5jb2wucm9sZSc6ICdcdTg5RDJcdTgyNzInLCAncGxhbi5jb2wubW9kZWwnOiAnXHU2QTIxXHU1NzhCJywgJ3BsYW4uY29sLnBvbGljeSc6ICdcdTU5MzFcdThEMjVcdTdCNTZcdTc1NjUnLCAncGxhbi5jb2wuZW5hYmxlZCc6ICdcdTU0MkZcdTc1MjgnLCAncGxhbi5jb2wuYXR0ZW1wdHMnOiAnXHU1QzFEXHU4QkQ1JyxcbiAgICAncGxhbi5tb2RlbERlZmF1bHQnOiAnXHU4RERGXHU5NjhGXHU4OUQyXHU4MjcyXHU5RUQ4XHU4QkE0JyxcbiAgICAncGxhbi5sYXVuY2hFZGl0ZWQnOiAnXHU0RkREXHU1QjU4XHU0RkVFXHU2NTM5XHU1RTc2XHU1NDJGXHU1MkE4JyxcbiAgICAncGxhbi5sYXVuY2hEaXJlY3QnOiAnXHU2MzA5XHU1MzlGXHU4QkExXHU1MjEyXHU1NDJGXHU1MkE4JyxcbiAgICAncGxhbi5kaXNjYXJkJzogJ1x1NjUzRVx1NUYwMycsXG4gICAgJ3BsYW4udmlld0RldGFpbCc6ICdcdThCRTZcdTYwQzUnLCAncGxhbi5yZWZyZXNoRGV0YWlsJzogJ1x1NTIzN1x1NjVCMCcsICdwbGFuLmNsb3NlRGV0YWlsJzogJ1x1NjUzNlx1OEQ3NycsXG4gICAgJ3BsYW4uZGV0YWlsVGl0bGUnOiAnUnVuIFx1OEJFNlx1NjBDNScsXG4gICAgJ3BsYW4ucGF1c2VkQmFubmVyJzogJ1x1NEVGQlx1NTJBMVx1NURGMlx1NjY4Mlx1NTA1Q1x1RkYwQ1x1N0I0OVx1NUY4NVx1NEY2MFx1NzY4NFx1NTFCM1x1N0I1NicsXG4gICAgJ3BsYW4ucmVzdW1lUmV0cnknOiAnXHU5MUNEXHU4QkQ1XHU4QkU1XHU2QjY1XHU5QUE0XHU1RTc2XHU3RUU3XHU3RUVEJyxcbiAgICAncGxhbi5yZXN1bWVTa2lwJzogJ1x1OERGM1x1OEZDN1x1OEJFNVx1NkI2NVx1OUFBNFx1N0VFN1x1N0VFRCcsXG4gICAgJ3BsYW4ucmVzdW1lRmFpbGVkJzogJ1x1NEVDRVx1NTkzMVx1OEQyNVx1NTkwNFx1NjA2Mlx1NTkwRCcsXG4gICAgJ3BsYW4uY29udGV4dFRpdGxlJzogJ1x1NEVGQlx1NTJBMVx1NEUwQVx1NEUwQlx1NjU4N1x1RkYwOFx1NjcyQyBSdW4gXHU2Q0U4XHU1MTY1XHU0RTg2XHU0RUMwXHU0RTQ4XHVGRjA5JyxcbiAgICAncGxhbi5icmFuY2gnOiAnXHU1MjA2XHU2NTJGJywgJ3BsYW4uaW5qZWN0ZWRNZW1vcmllcyc6ICdcdTZDRThcdTUxNjVcdThCQjBcdTVGQzYnLCAncGxhbi5kZWNpc2lvbkxvZyc6ICdcdTUxQjNcdTdCNTZcdTY1RTVcdTVGRDcnLFxuICAgICdleGVjLmNvbC5kZXRhaWwnOiAnXHU4QkU2XHU2MEM1JyxcblxuICAgICdzY2hlZC50aXRsZSc6ICdcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTEnLFxuICAgICdzY2hlZC5mb3JtTmFtZSc6ICdcdTRFRkJcdTUyQTFcdTU0MERcdTc5RjAnLCAnc2NoZWQuZm9ybUludGVydmFsJzogJ1x1OTVGNFx1OTY5NFx1RkYwOFx1NTIwNlx1OTQ5Rlx1RkYwOScsXG4gICAgJ3NjaGVkLnR5cGVSZXZpZXcnOiAnXHU4MUVBXHU1MkE4XHU4QkM0XHU1QkExJywgJ3NjaGVkLnR5cGVTdW1tYXJ5JzogJ0FJIFx1NjAzQlx1N0VEMycsICdzY2hlZC50eXBlUnVuJzogJ1x1NUI5QVx1NjVGNlx1NjI2N1x1ODg0QycsXG4gICAgJ3NjaGVkLmFkZCc6ICdcdTUyMUJcdTVFRkEnLFxuICAgICdzY2hlZC5oaW50JzogJ1x1NTIzMFx1NzBCOVx1ODFFQVx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYxQVx1ODFFQVx1NTJBOFx1OEJDNFx1NUJBMT1cdThCQzRcdTVCQTFcdThGRDEgMjQgXHU1QzBGXHU2NUY2XHU3Njg0XHU2NUIwXHU2M0QwXHU0RUE0XHVGRjA4XHU5NUVFXHU5ODk4XHU4RkRCIFJldmlldyBcdTk3NjJcdTY3N0ZcdUZGMDlcdUZGMUJBSSBcdTYwM0JcdTdFRDM9XHU3NTFGXHU2MjEwXHU1ODlFXHU5MUNGXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzXHVGRjFCXHU1QjlBXHU2NUY2XHU2MjY3XHU4ODRDPVx1NjMwOVx1NkEyMVx1Njc3Rlx1OEREMVx1NEUwMFx1NkIyMVx1N0YxNlx1NjM5Mlx1NEVGQlx1NTJBMVx1MzAwMlx1NjcwMFx1NUMwRiAxIFx1NTIwNlx1OTQ5Rlx1MzAwMicsXG4gICAgJ3NjaGVkLmVtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1MzAwMicsXG4gICAgJ3NjaGVkLmNvbC5uYW1lJzogJ1x1NTQwRFx1NzlGMCcsICdzY2hlZC5jb2wudHlwZSc6ICdcdTdDN0JcdTU3OEInLCAnc2NoZWQuY29sLmludGVydmFsJzogJ1x1NTQ2OFx1NjcxRicsICdzY2hlZC5jb2wubmV4dCc6ICdcdTRFMEJcdTZCMjFcdTYyNjdcdTg4NEMnLCAnc2NoZWQuY29sLmxhc3RSZXN1bHQnOiAnXHU0RTBBXHU2QjIxXHU3RUQzXHU2NzlDJywgJ3NjaGVkLmNvbC5hY3Rpb25zJzogJ1x1NjRDRFx1NEY1QycsXG4gICAgJ3NjaGVkLmRheSc6ICcgXHU1OTI5JywgJ3NjaGVkLmhvdXInOiAnIFx1NUMwRlx1NjVGNicsICdzY2hlZC5taW51dGUnOiAnIFx1NTIwNlx1OTQ5RicsXG4gICAgJ3NjaGVkLmRpc2FibGUnOiAnXHU2NjgyXHU1MDVDJywgJ3NjaGVkLmVuYWJsZSc6ICdcdTU0MkZcdTc1MjgnLCAnc2NoZWQucnVuTm93JzogJ1x1N0FDQlx1NTM3M1x1NjI2N1x1ODg0QycsXG5cbiAgICAnbWVtb3J5LnpvbmVUaXRsZSc6ICdcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzYnLFxuICAgICdtZW1vcnkuc3luY0Jhc2VsaW5lJzogJ1x1NTQwQ1x1NkI2NVx1NTdGQVx1N0VCRicsICdtZW1vcnkuc3luY05vbmUnOiAnXHU2NzJBXHU1NDBDXHU2QjY1JyxcbiAgICAnbWVtb3J5LmJlaGluZCc6ICdcdTg0M0RcdTU0MEUge259IFx1NEUyQVx1NjNEMFx1NEVBNFx1NjcyQVx1NTQwQ1x1NkI2NScsXG4gICAgJ21lbW9yeS5zeW5jJzogJ1x1NTQwQ1x1NkI2NVx1OEJCMFx1NUZDNicsICdtZW1vcnkuc3luY2luZyc6ICdcdTU0MENcdTZCNjVcdTRFMkRcdTIwMjYnLCAnbWVtb3J5LnN5bmNGYWlsZWQnOiAnXHU1NDBDXHU2QjY1XHU1OTMxXHU4RDI1JyxcbiAgICAnbWVtb3J5LnN0YWxlVGl0bGUnOiAnXHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2XHVGRjA4XHU3NkY4XHU1MTczXHU0RUUzXHU3ODAxXHU1REYyXHU4OEFCXHU2NTM5XHU1MkE4XHVGRjBDXHU1Rjg1XHU0RjYwXHU1OTBEXHU2ODM4XHVGRjA5JyxcbiAgICAnbWVtb3J5Lm1hcmtTdGFsZSc6ICdcdTY4MDdcdThCQjBcdThGQzdcdTY1RjYnLCAnbWVtb3J5LmFyY2hpdmVCdG4nOiAnXHU1RjUyXHU2ODYzJywgJ21lbW9yeS5rZWVwQWN0aXZlJzogJ1x1NEVDRFx1NjcwOVx1NjU0OCcsXG4gICAgJ21lbW9yeS5uZXdDYW5kaWRhdGVzJzogJ1x1NjVCMFx1NTg5RVx1NTAxOVx1OTAwOVx1RkYwOFx1NURGMlx1NTE2NVx1NUY4NVx1Nzg2RVx1OEJBNFx1OTYxRlx1NTIxN1x1RkYwOVx1RkYxQScsXG4gICAgJ21lbW9yeS5jbG9zZVJlcG9ydCc6ICdcdTUxNzNcdTk1RURcdTYyQTVcdTU0NEEnLFxuICAgICdtZW1vcnkuc2NvcGVQcm9qZWN0JzogJ1x1NEUzQlx1NUU3Mlx1RkYwOFx1NTE2OFx1NTIwNlx1NjUyRlx1RkYwOScsICdtZW1vcnkuc2NvcGVCcmFuY2gnOiAnXHU0RUM1XHU1RjUzXHU1MjREXHU1MjA2XHU2NTJGJyxcbiAgICAnbWVtb3J5LnBlbmRpbmdRdWV1ZSc6ICdcdTVGODVcdTc4NkVcdThCQTRcdTk2MUZcdTUyMTcnLFxuICAgICdtZW1vcnkudG9Ob3RlJzogJ1x1OEY2Q1x1N0IxNFx1OEJCMCcsICdtZW1vcnkubm9ybWFsaXplJzogJ1x1NUY1Mlx1NEUwMFx1NTIzMFx1NEUzQlx1NUU3MicsICdtZW1vcnkucmVzdG9yZSc6ICdcdTYwNjJcdTU5MEQnLFxuICAgICdtZW1vcnkuc3RhdHVzU3RhbGUnOiAnXHU3NTkxXHU0RjNDXHU4RkM3XHU2NUY2JyxcbiAgICAnaW1wYWN0LmZ1bmN0aW9uc05vbmUnOiAnXHU2NzJBXHU4QkM2XHU1MjJCXHU1MUZBXHU1MUZEXHU2NTcwXHU3RUE3XHU4QzAzXHU3NTI4XHU1M0Q4XHU1MzE2XHVGRjA4XHU1M0VGXHU4MEZEXHU2NjJGXHU2ODM3XHU1RjBGL1x1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MC9cdTdFQUZcdTkxNERcdTdGNkVcdTY1MzlcdTUyQThcdUZGMDlcdTMwMDInLFxuICAgICdyZXZpZXcuY29sLnNldmVyaXR5JzogJ1x1N0VBN1x1NTIyQicsXG4gICAgJ3Jldmlldy5jb2wuY2F0ZWdvcnknOiAnXHU3QzdCXHU1MjJCJyxcbiAgICAncmV2aWV3LmNvbC50aXRsZSc6ICdcdTk1RUVcdTk4OTgnLFxuICAgICdyZXZpZXcuY29sLmV2aWRlbmNlJzogJ1x1NEY0RFx1N0Y2RScsXG4gICAgJ3Jldmlldy5jb2wuZml4JzogJ1x1NUVGQVx1OEJBRVx1NEZFRVx1NTkwRCcsXG4gICAgJ3Jldmlldy5oaW50JzogJ1x1NzBCOVx1NTFGQlx1NEUwQVx1NjVCOVx1NjMwOVx1OTRBRVx1NUYwMFx1NTlDQlx1NjgzOFx1NjdFNVx1RkYwQ1x1NEVBN1x1NTFGQVx1NjcwMFx1NEYxOFx1NjAyN1x1N0VEM1x1OEJCQVx1NEUwRVx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1MzAwMicsXG4gICAgJ2RpZmYuc2hvdyc6ICdcdTVCRjlcdTZCRDQnLFxuICAgICdkaWZmLmhpZGUnOiAnXHU2NTM2XHU4RDc3XHU1REVFXHU1RjAyJyxcblxuICAgICdkZXRhaWwudGl0bGUnOiAnXHU2ODM4XHU2N0U1XHU4QkU2XHU2MEM1JyxcbiAgICAnZGV0YWlsLnBpY2snOiAnXHUyMTkwIFx1NEVDRVx1NURFNlx1NEZBN1x1OTAwOVx1NjJFOVx1NEUwMFx1NkIyMVx1NjNEMFx1NEVBNFx1RkYwOFx1NjIxNlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOVx1NUYwMFx1NTlDQlx1NjgzOFx1NjdFNScsXG4gICAgJ2RldGFpbC53aGF0JzogJ1x1NjUzOVx1NEU4Nlx1NEVDMFx1NEU0OCcsXG4gICAgJ2RldGFpbC5sb2dpYyc6ICdcdTVCOUVcdTczQjBcdTkwM0JcdThGOTEnLFxuICAgICdkZXRhaWwucmlzayc6ICdcdTk4Q0VcdTk2NjlcdTcwQjknLFxuICAgICdkZXRhaWwuZmlsZXMnOiAnXHU2NTg3XHU0RUY2XHU2RTA1XHU1MzU1JyxcbiAgICAnZGV0YWlsLnBhdGNoJzogJ1x1NjdFNVx1NzcwQlx1ODg2NVx1NEUwMVx1NTM5Rlx1NjU4NycsXG4gICAgJ2RldGFpbC5haUxvYWRpbmcnOiAnQUkgXHU4OUUzXHU4QkZCXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4XHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXG4gICAgJ2RldGFpbC5pbXBhY3QnOiAnXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHU1MjA2XHU2NzkwJyxcbiAgICAnZGV0YWlsLmltcGFjdExvYWRpbmcnOiAnXHU1RjcxXHU1NENEXHU2MjZCXHU2M0NGXHU0RTJEXHUyMDI2XHVGRjA4XHU1RjE1XHU3NTI4XHU2OEMwXHU3RDIyICsgXHU1NkZFXHU4QzMxXHU0RjIwXHU2NEFEXHVGRjA5JyxcbiAgICAnZGV0YWlsLm9wdGltYWxpdHknOiAnXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1JyxcbiAgICAnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJzogJ1x1OEJDNFx1NUJBMVx1NEUyRFx1MjAyNlx1RkYwOFx1NEYxQVx1NEVBN1x1NTFGQVx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1NEUwRVx1NjcwMFx1NEYxOFx1NjAyN1x1N0VEM1x1OEJCQVx1RkYwOScsXG5cbiAgICAnaW1wYWN0LnJpc2snOiAnXHU5OENFXHU5NjY5JyxcbiAgICAnaW1wYWN0LmNvbC5jaGFuZ2VkJzogJ1x1NTNEOFx1NjZGNFx1NjU4N1x1NEVGNicsXG4gICAgJ2ltcGFjdC5jb2wuaW5kaXJlY3QnOiAnXHU5NUY0XHU2M0E1XHU1RjcxXHU1NENEXHVGRjA4XHU1RjE1XHU3NTI4XHU5NEZFXHVGRjA5JyxcbiAgICAnaW1wYWN0LmNvbC5wb3RlbnRpYWwnOiAnXHU2RjVDXHU1NzI4XHU1RjcxXHU1NENEJyxcbiAgICAnaW1wYWN0Lm5vbmUnOiAnXHU2NzJBXHU1M0QxXHU3M0IwXHU0RUQzXHU1RTkzXHU1MTg1XHU1RjE1XHU3NTI4XHU4MDA1XHVGRjA4XHU2NTM5XHU1MkE4XHU3NzBCXHU0RjNDXHU3MkVDXHU3QUNCXHVGRjA5XHUzMDAyJyxcbiAgICAnaW1wYWN0LnRlc3RzJzogJ1x1NTE3M1x1ODA1NFx1NkQ0Qlx1OEJENScsXG4gICAgJ2ltcGFjdC5sZWdlbmQuY2hhbmdlZCc6ICdcdTUzRDhcdTY2RjQnLFxuICAgICdpbXBhY3QubGVnZW5kLmluZGlyZWN0JzogJ1x1OTVGNFx1NjNBNScsXG4gICAgJ2ltcGFjdC5sZWdlbmQucG90ZW50aWFsJzogJ1x1NkY1Q1x1NTcyOCcsXG5cbiAgICAncmV2aWV3LnZlcmRpY3QnOiAnXHU2NzAwXHU0RjE4XHU2MDI3XHU3RUQzXHU4QkJBJyxcbiAgICAncmV2aWV3Lmlzc3Vlcyc6ICdcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTUnLFxuICAgICdyZXZpZXcuY2xlYW4nOiAnXHU2NzJBXHU1M0QxXHU3M0IwXHU5NUVFXHU5ODk4XHUzMDAyJyxcblxuICAgICdub3Rlcy50aXRsZSc6ICdcdTY4MzhcdTY3RTVcdTdCMTRcdThCQjAnLFxuICAgICdub3Rlcy5mb3JtVGl0bGUnOiAnXHU3QjE0XHU4QkIwXHU2ODA3XHU5ODk4JyxcbiAgICAnbm90ZXMuZm9ybUNvbnRlbnQnOiAnXHU3QjE0XHU4QkIwXHU1MTg1XHU1QkI5XHVGRjA4XHU3RUQzXHU4QkJBXHUzMDAxXHU3NTkxXHU5NUVFXHUzMDAxXHU1QjY2XHU0RTYwXHU4OTgxXHU3MEI5XHUyMDI2XHVGRjA5JyxcbiAgICAnbm90ZXMuYWRkJzogJ1x1NkRGQlx1NTJBMFx1N0IxNFx1OEJCMCcsXG4gICAgJ25vdGVzLmJvdW5kVG8nOiAnXHU1QzA2XHU1MTczXHU4MDU0XHU1MjMwJyxcbiAgICAnbm90ZXMuY29sLnRpbWUnOiAnXHU2NUY2XHU5NUY0JyxcbiAgICAnbm90ZXMuY29sLnRpdGxlJzogJ1x1NjgwN1x1OTg5OCcsXG4gICAgJ25vdGVzLmNvbC5jb250ZW50JzogJ1x1NTE4NVx1NUJCOScsXG4gICAgJ25vdGVzLmNvbC5zaGEnOiAnXHU1MTczXHU4MDU0XHU2M0QwXHU0RUE0JyxcbiAgICAnbm90ZXMucmVtb3ZlJzogJ1x1NTIyMFx1OTY2NCcsXG4gICAgJ25vdGVzLmVtcHR5JzogJ1x1OEZEOFx1NkNBMVx1NjcwOVx1N0IxNFx1OEJCMFx1MzAwMlx1NjgzOFx1NjdFNVx1NjNEMFx1NEVBNFx1NjVGNlx1OTY4Rlx1NjI0Qlx1OEJCMFx1NEUwQlx1N0VEM1x1OEJCQVx1NEUwRVx1NzU5MVx1OTVFRVx1RkYwQ1x1NUMzMVx1NjYyRlx1NEY2MFx1NzY4NFx1OTg3OVx1NzZFRVx1NUI2Nlx1NEU2MFx1Njg2M1x1Njg0OFx1MzAwMicsXG5cbiAgICAnbWVtb3J5LnJlY29yZCc6ICdcdThCQjBcdTVGNTVcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzYnLFxuICAgICdmb3JtLm1lbW9yeVRpdGxlJzogJ1x1OEJCMFx1NUZDNlx1NjgwN1x1OTg5OCcsXG4gICAgJ2Zvcm0ubWVtb3J5Q29udGVudCc6ICdcdThCQjBcdTVGQzZcdTUxODVcdTVCQjlcdUZGMDhcdTRFQzBcdTRFNDhcdTRFMEVcdTRFM0FcdTRFQzBcdTRFNDhcdUZGMDknLFxuICAgICdtZW1vcnkuY29sLnRpdGxlJzogJ1x1Njc2MVx1NzZFRScsXG4gICAgJ21lbW9yeS5jb2wudHlwZSc6ICdcdTdDN0JcdTU3OEInLFxuICAgICdtZW1vcnkuY29sLnRydXRoJzogJ1x1NzcxRlx1NTAzQycsXG4gICAgJ21lbW9yeS5jb2wuYnJhbmNoJzogJ1x1NTIwNlx1NjUyRicsXG4gICAgJ21lbW9yeS5jb25maXJtJzogJ1x1Nzg2RVx1OEJBNCcsXG4gICAgJ21lbW9yeS5lbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdTMwMDJcdTUzRUZcdTU3MjhcdTgwNEFcdTU5MjlcdTRFMkRcdThCQTkgQUkgXHU4QkIwXHU1RjU1XHVGRjBDXHU2MjE2XHU1NzI4XHU0RTBBXHU2NUI5XHU2MjRCXHU1MkE4XHU2REZCXHU1MkEwXHUzMDAyJyxcbiAgICAnY29uY2VwdHMudGl0bGUnOiAnXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1JyxcbiAgICAnY29uY2VwdHMubm9uZSc6ICdcdTY2ODJcdTY1RTBcdTVCNjZcdTRFNjBcdTY5ODJcdTVGRjVcdTMwMDJcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdThERDFcdTVCOENcdTUzRDhcdTY2RjRcdTU0MEVcdTgxRUFcdTUyQThcdTZDODlcdTZEQzBcdUZGMENcdTRFNUZcdTUzRUZcdTU3MjhcdTgwNEFcdTU5MjlcdTRFMkRcdThCQTkgQUkgXHU2MDNCXHU3RUQzXHU1QjY2XHU0RTYwXHU4OTgxXHU3MEI5XHUzMDAyJyxcbiAgICAnY29uY2VwdHMuY29sLm5hbWUnOiAnXHU2OTgyXHU1RkY1JyxcbiAgICAnY29uY2VwdHMuY29sLmNhdGVnb3J5JzogJ1x1N0M3Qlx1NTIyQicsXG4gICAgJ2NvbmNlcHRzLmNvbC5jb3VudCc6ICdcdTZCMjFcdTY1NzAnLFxuICAgICdyZXZpZXcucmVjb3Jkc1RpdGxlJzogJ1JldmlldyBcdTk1RUVcdTk4OTgnLFxuICAgICdyZXZpZXcucmVjb3Jkc0VtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1OTVFRVx1OTg5OFx1OEJCMFx1NUY1NVx1MzAwMlx1NjNEMFx1NEVBNFx1NUJBMVx1NjdFNVx1OTg3NVx1OEJDNFx1NUJBMVx1NTFGQVx1NzY4NFx1OTVFRVx1OTg5OFx1NEYxQVx1ODFFQVx1NTJBOFx1NzY3Qlx1OEJCMFx1NTIzMFx1OEZEOVx1OTFDQ1x1RkYxQlx1OTFDRFx1NjVCMFx1OEJDNFx1NUJBMVx1NEYxQVx1NjZGRlx1NjM2Mlx1NjVFN1x1OEJCMFx1NUY1NVx1MzAwMicsXG4gICAgJ3ZlcmlmeS5yZWNvcmRzJzogJ1x1OUE4Q1x1NjUzNlx1OEJCMFx1NUY1NScsXG4gICAgJ3ZlcmlmeS5yZWNvcmRzRW1wdHknOiAnXHU2NjgyXHU2NUUwXHU5QThDXHU2NTM2XHU4QkIwXHU1RjU1XHUzMDAyXHU1NzI4XHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHU3MEI5XHUzMDBDXHU5QThDXHU2NTM2XHUzMDBEXHU1MzczXHU3NTFGXHU2MjEwXHUzMDAyJyxcblxuICAgICdjb25maXJtZWQudGl0bGUnOiAnXHU1REYyXHU3ODZFXHU1QjlBXHU3RUE2XHU2NzVGXHVGRjA4XHU0RUJBXHU1REU1XHU3ODZFXHU4QkE0XHVGRjBDQUkgXHU3OTgxXHU2NTM5XHU4MUVBXHU1MkE4XHU2MkU2XHU2MjJBXHVGRjA5JyxcbiAgICAnY29uZmlybWVkLmFkZCc6ICdcdTZERkJcdTUyQTBcdTdFQTZcdTY3NUYnLFxuICAgICdjb25maXJtZWQudGV4dCc6ICdcdTdFQTZcdTY3NUYvXHU5NzAwXHU2QzQyXHU1MTg1XHU1QkI5JyxcbiAgICAnY29uZmlybWVkLnBhdGhzJzogJ1x1Nzk4MVx1NjUzOVx1OERFRlx1NUY4NFx1RkYwOFx1OTAxN1x1NTNGN1x1NTIwNlx1OTY5NFx1RkYxQlx1NzZGOFx1NUJGOVx1OTg3OVx1NzZFRVx1NjgzOVx1NTk4MiBzcmMvY29yZVx1RkYwQ1x1NjIxNlx1N0VERFx1NUJGOVx1OERFRlx1NUY4NFx1RkYwOScsXG4gICAgJ2NvbmZpcm1lZC5ub25lJzogJ1x1NjY4Mlx1NjVFMFx1N0VBNlx1Njc1Rlx1MzAwMlx1NkRGQlx1NTJBMFx1NTQwRVx1RkYwQ0FJIFx1NEZFRVx1NjUzOVx1NjcyQ1x1OTg3OVx1NzZFRVx1NzY4NFx1Nzk4MVx1NjUzOVx1OERFRlx1NUY4NFx1NUMwNlx1ODhBQlx1ODFFQVx1NTJBOFx1NjJEMlx1N0VERFx1RkYwOFx1NEVDNVx1NUJGOVx1NjcyQ1x1OTg3OVx1NzZFRVx1NzUxRlx1NjU0OFx1RkYwOVx1MzAwMicsXG5cbiAgICAnY2hhbmdlcy50aXRsZSc6ICdcdTUzRDhcdTY2RjRcdTRFRkJcdTUyQTEnLFxuICAgICdzdGF0ZS5ub0NoYW5nZXMnOiAnXHU2NjgyXHU2NUUwXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExXHUzMDAyXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1NTIxQlx1NUVGQVx1RkYwQ1x1NjIxNlx1NzUyOFx1NEUwQVx1NjVCOVx1MzAwQ1x1NjVCMFx1NUVGQVx1NTNEOFx1NjZGNFx1MzAwRFx1MzAwMicsXG4gICAgJ2NoYW5nZXMuY29sLnRpdGxlJzogJ1x1NjgwN1x1OTg5OCcsXG4gICAgJ2NoYW5nZXMuY29sLnR5cGUnOiAnXHU3QzdCXHU1NzhCJyxcbiAgICAnY2hhbmdlcy5jb2wuc3RhdHVzJzogJ1x1NzJCNlx1NjAwMScsXG4gICAgJ2NoYW5nZXMuY29sLnVwZGF0ZWQnOiAnXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0JyxcbiAgICAnZXhlYy5jb2wuc3RhdHVzJzogJ1x1NzJCNlx1NjAwMScsXG4gICAgJ2V4ZWMuY29sLmNoYW5nZSc6ICdcdTUzRDhcdTY2RjQnLFxuICAgICdleGVjLmNvbC5zdGFydGVkJzogJ1x1NUYwMFx1NTlDQicsXG4gICAgJ2V4ZWMuY29sLmNvc3QnOiAnXHU2MjEwXHU2NzJDKFx1NEYzMCknLFxuICAgICdleGVjLmF0dGVtcHRzJzogJ1x1NUMxRFx1OEJENVx1NkIyMVx1NjU3MCcsXG4gICAgJ2V4ZWMuaGludCc6ICdcdTYyNjdcdTg4NENcdUZGMDhzdGFydF9ydW5cdUZGMDlcdThCRjdcdTU3MjhcdTUzRjNcdTRGQTdcdTgwNEFcdTU5MjlcdTRFMkRcdTUzRDFcdThENzdcdUZGMUFcdTUyMUJcdTVFRkFcdThCQTFcdTUyMTJcdTU0MEVcdTVCRjkgQUkgXHU4QkY0XHUzMDBDXHU1RjAwXHU1OUNCXHU2MjY3XHU4ODRDXHU4QkU1IGNoYW5nZVx1MzAwRFx1MzAwMlx1NjcyQ1x1OTg3NVx1NjdFNVx1NzcwQlx1OEZEQlx1NUVBNlx1NEUwRVx1N0VEM1x1Njc5Q1x1MzAwMicsXG4gICAgJ3N0YXRlLm5vUnVucyc6ICdcdTY2ODJcdTY1RTBcdTYyNjdcdTg4NENcdThCQjBcdTVGNTVcdTMwMDInLFxuICAgICdzdGF0ZS50ZWNoU3RhY2snOiAnXHU2MjgwXHU2NzJGXHU2ODA4JyxcbiAgICAnc3RhdGUuc3ltYm9scyc6ICdcdTVERjJcdTdEMjJcdTVGMTVcdTdCMjZcdTUzRjcnLFxuICAgICdzdGF0ZS5tYW5pZmVzdHMnOiAnXHU2RTA1XHU1MzU1XHU2NTg3XHU0RUY2JyxcbiAgICAnc3RhdGUuZXZpZGVuY2UnOiAnXHU4QkMxXHU2MzZFXHU2NzYxXHU3NkVFJyxcbiAgfSxcbiAgZW46IHtcbiAgICAnd29ya3NwYWNlLnRpdGxlJzogJ1JldmlldyBEZXNrJyxcbiAgICAndGFiLmNvbW1pdHMnOiAnQ29tbWl0IFJldmlldycsXG4gICAgJ3RhYi5vdmVydmlldyc6ICdPdmVydmlldycsXG4gICAgJ3RhYi5leGVjdXRpb24nOiAnRXhlY3V0aW9uJyxcbiAgICAndGFiLnJldmlldyc6ICdSZXZpZXcgaXNzdWVzJyxcbiAgICAndGFiLm5vdGVzJzogJ05vdGVzICYgTWVtb3J5JyxcbiAgICAndGFiLnNldHRpbmdzJzogJ1NldHRpbmdzJyxcbiAgICAnZXJyb3IubG9hZCc6ICdGYWlsZWQgdG8gbG9hZCcsXG4gICAgJ3N0YXRlLnByb2plY3QnOiAnQ3VycmVudCBwcm9qZWN0JyxcbiAgICAnc3RhdGUubm9Qcm9qZWN0JzogJ05vIHByb2plY3QgaW5pdGlhbGl6ZWQnLFxuICAgICdzdGF0ZS5ub1Byb2plY3RIaW50JzogJ1J1biBcIkluaXRpYWxpemUgcHJvamVjdFwiIHRvIHNjYW4gdGhlIHJlcG9zaXRvcnkgc3RydWN0dXJlLCB0ZWNoIHN0YWNrLCBhbmQgc3ltYm9sIGluZGV4LicsXG4gICAgJ2FjdGlvbi5ib290c3RyYXAnOiAnSW5pdGlhbGl6ZSBwcm9qZWN0JyxcbiAgICAnYWN0aW9uLnJlc2Nhbic6ICdSZS1pbml0aWFsaXplIC8gc2NhbicsXG4gICAgJ2FjdGlvbi5hbmFseXplJzogJ0FuYWx5emUgd29ya2luZyBkaWZmJyxcbiAgICAnYWN0aW9uLnJldmlldyc6ICdSZXZpZXcgd29ya2luZyBkaWZmJyxcbiAgICAnYWN0aW9uLnZlcmlmeSc6ICdWZXJpZnkgd29ya2luZyBkaWZmJyxcbiAgICAnYWN0aW9uLmNyZWF0ZUNoYW5nZSc6ICdDcmVhdGUgY2hhbmdlJyxcbiAgICAnYWN0aW9uLnJ1bm5pbmcnOiAnUnVubmluZ1x1MjAyNicsXG4gICAgJ2FjdGlvbi5yZWZyZXNoJzogJ1JlZnJlc2gnLFxuICAgICdmb3JtLmNoYW5nZVRpdGxlJzogJ0NoYW5nZSB0aXRsZScsXG4gICAgJ2Zvcm0uY2hhbmdlRGVzYyc6ICdSZXF1aXJlbWVudCBhbmQgYmFja2dyb3VuZCAob3B0aW9uYWwpJyxcbiAgICAncmVzdWx0LnBhbmVsJzogJ0FjdGlvbiByZXN1bHQnLFxuXG4gICAgJ3JlcG8uYWRkJzogJ0FkZCByZXBvJyxcbiAgICAncmVwby5hZGRIaW50JzogJ0VudGVyIGFuIGFic29sdXRlIHJlcG8gcGF0aCBhbmQgcHJlc3MgRW50ZXI7IHByZXZpb3VzbHkgdXNlZCByZXBvcyBhcmUgcmVtZW1iZXJlZCcsXG4gICAgJ3JlcG8uc2Nhbkhpc3RvcnknOiAnUmVidWlsZCBoaXN0b3J5JyxcbiAgICAncmVwby5jb21taXRzJzogJ2NvbW1pdHMnLFxuICAgICdyZXBvLmJyYW5jaCc6ICdicmFuY2gnLFxuICAgICdyZXBvLndvcmtpbmcnOiAnVW5jb21taXR0ZWQgY2hhbmdlcycsXG4gICAgJ3JlcG8ud29ya2luZ0NsZWFuJzogJ1dvcmtpbmcgdHJlZSBpcyBjbGVhbicsXG4gICAgJ3JlcG8uZW1wdHknOiAnTm8gY29tbWl0cy4nLFxuICAgICdyZXBvLmxvYWRGYWlsZWQnOiAnRmFpbGVkIHRvIGxvYWQgY29tbWl0cycsXG4gICAgJ3BpY2tlci50aXRsZSc6ICdQaWNrIGNvbW1pdHMgdG8gcmV2aWV3IChtdWx0aS1zZWxlY3QpJyxcbiAgICAncGlja2VyLnBsYWNlaG9sZGVyJzogJ0NsaWNrIHRvIHBpY2sgY29tbWl0cyAobXVsdGktc2VsZWN0LCBpbmNsdWRlcyB1bmNvbW1pdHRlZCknLFxuICAgICdwaWNrZXIuc2VsZWN0ZWQnOiAnU2VsZWN0ZWQnLFxuICAgICdwaWNrZXIuZmlsdGVyJzogJ0ZpbHRlciBieSB0aXRsZS9oYXNoL2F1dGhvclx1MjAyNicsXG4gICAgJ3BpY2tlci5jbGVhcic6ICdDbGVhcicsXG4gICAgJ3BpY2tlci5ub01hdGNoJzogJ05vIG1hdGNoaW5nIGNvbW1pdC4nLFxuICAgICdwaWNrZXIuaGludCc6ICdDaGVja2luZyBhIGNvbW1pdCBnZW5lcmF0ZXMgaXRzIEFJIGV4cGxhbmF0aW9uOyBydW4gaW1wYWN0IGFuZCBvcHRpbWFsaXR5IGJlbG93LicsXG4gICAgJ3BpY2tlci5yb3VuZCc6ICdSb3VuZCB7bn0nLFxuICAgICdwaWNrZXIucm91bmRMYXRlc3QnOiAnUm91bmQge259IChsYXRlc3QpJyxcbiAgICAncGlja2VyLnJvdW5kU2VsZWN0JzogJ1NlbGVjdCByb3VuZCcsXG4gICAgJ3BpY2tlci5yb3VuZENsZWFyJzogJ0NsZWFyIHJvdW5kJyxcbiAgICAncGlja2VyLnVuZGlnZXN0ZWQnOiAnTmV3IGNvbW1pdHMgc2luY2UgdGhlIGxhc3QgQUkgc3VtbWFyeSAobm90IHlldCByZXZpZXdlZCknLFxuICAgICdwaWNrZXIudW5kaWdlc3RlZENvdW50JzogJ3tufSB1bnJldmlld2VkIGNvbW1pdHMnLFxuICAgICdpbXBhY3QuZmFjdG9ycyc6ICdSaXNrIGZhY3RvcnMgKHdoeSB0aGlzIGxldmVsKScsXG4gICAgJ2ltcGFjdC5wb2ludHMnOiAnSW1wYWN0ZWQgcG9pbnRzJyxcbiAgICAnaW1wYWN0LmtleVBvaW50cyc6ICdLZXkgY29tcG9uZW50cycsXG4gICAgJ2ltcGFjdC5tZW1vcnknOiAnQ3Jvc3MtY2hlY2sgd2l0aCBwcm9qZWN0IG1lbW9yeScsXG4gICAgJ2ltcGFjdC5mdW5jdGlvbnMnOiAnSW1wYWN0ZWQgZnVuY3Rpb25zICh3aG8gY2FsbHMgdGhlIGNoYW5nZWQgY29kZSknLFxuICAgICdpbXBhY3QuZnVuY1JvbGUnOiAnRnVuY3Rpb24gcm9sZScsXG4gICAgJ2ltcGFjdC5mdW5jQ2hhbmdlJzogJ0NoYW5nZWQgYnkgdGhpcyBjb21taXQnLFxuICAgICdpbXBhY3QuZnVuY0NhbGxlcnMnOiAnSW1wYWN0IG9uIGNhbGxlcnMnLFxuICAgICdjYWNoZS5oaXQnOiAnZnJvbSBjYWNoZScsXG4gICAgJ2NhY2hlLnJlZ2VuZXJhdGUnOiAnUmVnZW5lcmF0ZScsXG4gICAgJ2Nvc3QudG9vbHRpcCc6ICdFc3RpbWF0ZWQgY29zdCBvZiB0aGlzIEFJIGNhbGwgKERlZXBTZWVrIHByaWNpbmcpJyxcbiAgICAnZXhlYy5jcmVhdGUnOiAnTmV3IHJ1bicsXG4gICAgJ2V4ZWMuZm9ybVRpdGxlJzogJ1doYXQgdG8gZG8gKG9uZSBsaW5lKScsXG4gICAgJ2V4ZWMuZm9ybURlc2MnOiAnUmVxdWlyZW1lbnQ6IGdvYWwsIG1vZHVsZXMsIGFjY2VwdGFuY2UnLFxuICAgICdleGVjLnN0YXJ0JzogJ1N0YXJ0IHJ1bicsXG4gICAgJ2V4ZWMuc3RhcnRpbmcnOiAnU3RhcnRpbmdcdTIwMjYnLFxuICAgICdleGVjLmNyZWF0ZUhpbnQnOiAnQ3JlYXRlcyBhIGNoYW5nZSwgZ2VuZXJhdGVzIGEgcGxhbiwgdGhlbiBBSSBzdWJhZ2VudHMgZXhlY3V0ZSBzdGVwIGJ5IHN0ZXA7IHByb2dyZXNzIHJlZnJlc2hlcyBiZWxvdy4nLFxuICAgICdleGVjLm1vZGVsRGVmYXVsdCc6ICdFeGVjdXRpb24gbW9kZWwgKHJvbGUgZGVmYXVsdHM6IGFuYWx5c2lzL29wcz1mYXN0LCBjb2Rpbmc9c3RhbmRhcmQsIHBsYW5uaW5nPXJlYXNvbmluZywgdmVyaWZpY2F0aW9uPXZlcmlmaWVyKScsXG4gICAgJ2JhZGdlLnJ1bm5pbmcnOiAne259IHJ1bnMgaW4gcHJvZ3Jlc3MsIGNsaWNrIHRvIHZpZXcnLFxuICAgICduYXJyYXRpdmUudGl0bGUnOiAnV29yay1yb3VuZCBuYXJyYXRpdmUnLFxuICAgICduYXJyYXRpdmUuZ2VuZXJhdGUnOiAnSW50ZXJwcmV0IHRoaXMgcm91bmQgb2Ygd29yaycsXG4gICAgJ25hcnJhdGl2ZS5ydW5uaW5nJzogJ0dlbmVyYXRpbmdcdTIwMjYgKH4xMC0zMHMpJyxcbiAgICAnYmFkZ2UuZmFpbGVkJzogJ3tufSBydW5zIG5lZWQgYXR0ZW50aW9uLCBjbGljayB0byB2aWV3JyxcbiAgICAnZXhlYy5mbG93Q3JlYXRlJzogJ0Rlc2NyaWJlIHRoZSB0YXNrJyxcbiAgICAnZXhlYy5mbG93T3JjaGVzdHJhdGUnOiAnQ29uZmlybSBvcmNoZXN0cmF0aW9uIChwZXItc3RlcCBtb2RlbC9yb2xlL2ZhaWx1cmUgcG9saWN5KScsXG4gICAgJ2V4ZWMuZmxvd1J1bic6ICdMYXVuY2ggKHRyYWNrIHByb2dyZXNzICYgY29zdCBpbiBydW4gZGV0YWlsKScsXG4gICAgJ2V4ZWMuZmxvd01lbW9yeSc6ICdBdXRvLWRpc3RpbGwgbWVtb3JpZXMgKGNvbmZpcm0gaW4gbWVtb3J5IHBhbmVsKScsXG4gICAgJ2V4ZWMucGxhbm5pbmcnOiAnR2VuZXJhdGluZyBvcmNoZXN0cmF0aW9uXHUyMDI2IChMTE0gaXMgZGVjb21wb3NpbmcgdGhlIHRhc2ssIH4xMC0zMHMpJyxcbiAgICAnZXhlYy5jb2wuc3RlcHMnOiAnU3RlcHMnLFxuICAgICdub3Rlcy5lZGl0JzogJ0VkaXQnLFxuICAgICdub3Rlcy50b01lbW9yeSc6ICdUbyBtZW1vcnknLFxuICAgICdub3Rlcy50b01lbW9yeUhpbnQnOiAnUHJlZmlsbCB0aGUgbWVtb3J5IGZvcm0gYmVsb3cgd2l0aCB0aGlzIG5vdGUnLFxuICAgICdub3Rlcy50b01lbW9yeURvbmUnOiAnXHUyNzEzIFByZWZpbGxlZCB0aGUgbWVtb3J5IGZvcm0gKGNob29zZSBhIHR5cGUgaW4gdGhlIFByb2plY3QgbWVtb3J5IHpvbmUgYmVsb3csIHRoZW4gYWRkKScsXG4gICAgJ25vdGVzLmNvcHlNZCc6ICdDb3B5IE1EJyxcbiAgICAnbm90ZXMuY29weU1kSGludCc6ICdDb3B5IHRoaXMgbm90ZSBhcyBNYXJrZG93biB0byB0aGUgY2xpcGJvYXJkJyxcbiAgICAnbm90ZXMuY29weU1kRG9uZSc6ICdDb3BpZWQgYXMgTWFya2Rvd24nLFxuICAgICdub3Rlcy5leHBvcnRNZCc6ICdFeHBvcnQgTUQnLFxuICAgICdub3Rlcy5leHBvcnRNZEhpbnQnOiAnRG93bmxvYWQgYXMgYSAubWQgZmlsZScsXG4gICAgJ25vdGVzLmV4cG9ydERvbmUnOiAnRXhwb3J0ZWQgYXMgLm1kJyxcbiAgICAnbm90ZXMuZGlnZXN0TmV2ZXInOiAnTm8gQUkgc3VtbWFyeSBnZW5lcmF0ZWQgeWV0JyxcbiAgICAnbm90ZXMuZGlnZXN0UGVuZGluZyc6ICd7bn0gbmV3IGNvbW1pdHMgc2luY2UgdGhlIGxhc3Qgc3VtbWFyeScsXG4gICAgJ2RldGFpbC5zYXZlTm90ZSc6ICdTYXZlIGFzIG5vdGUnLFxuICAgICdkZXRhaWwuc2F2ZU5vdGVIaW50JzogJ1NhdmUgdGhpcyByZXZpZXcgY29uY2x1c2lvbiAod2hhdC9sb2dpYy9yaXNrcykgYXMgYSBzdHJ1Y3R1cmVkIG5vdGUnLFxuICAgICdkZXRhaWwuc2F2ZU5vdGVUaXRsZSc6ICdSZXZpZXcgcmVjb3JkJyxcbiAgICAnZGV0YWlsLnNhdmVNZW1vcnknOiAnRGlzdGlsbCB0byBtZW1vcnknLFxuICAgICdkZXRhaWwuc2F2ZU1lbW9yeUhpbnQnOiAnRGlzdGlsbCB0aGlzIHJldmlldyBjb25jbHVzaW9uIGludG8gYSBwcm9qZWN0IG1lbW9yeSAocXVldWVkIGZvciBjb25maXJtYXRpb24pJyxcbiAgICAnbm90ZXMuc2F2ZSc6ICdTYXZlJyxcbiAgICAnbm90ZXMuY2FuY2VsJzogJ0NhbmNlbCcsXG4gICAgJ21lbW9yeS5icmFuY2hTY29wZSc6ICdCcmFuY2gnLFxuICAgICdtZW1vcnkuYnJhbmNoQWxsJzogJ0FsbCBicmFuY2hlcycsXG4gICAgJ25vdGVzLnNlYXJjaCc6ICdTZWFyY2ggbm90ZXNcdTIwMjYnLFxuICAgICdtb2RlbC50aXRsZSc6ICdNb2RlbCBhc3NpZ25tZW50ICh3aGljaCBtb2RlbCBwZXIgdGFzayknLFxuICAgICdtb2RlbC5sb2FkaW5nJzogJ0xvYWRpbmcgbW9kZWxzXHUyMDI2JyxcbiAgICAnbW9kZWwuZm9sbG93Q2hhdCc6ICdGb2xsb3cgY2hhdCBtb2RlbCcsXG4gICAgJ21vZGVsLnNhdmUnOiAnU2F2ZSAmIGFwcGx5JyxcbiAgICAnbW9kZWwuc2F2ZWQnOiAnQXBwbGllZCcsXG4gICAgJ21vZGVsLmhpbnQnOiAnQXBwbGllcyBpbW1lZGlhdGVseSBhbmQgcGVyc2lzdHMgYWNyb3NzIHJlc3RhcnRzOyBjaGF0IG1vZGVsIHVuYWZmZWN0ZWQuJyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5JzogJ0FJIHN1bW1hcnknLFxuICAgICdub3Rlcy5haVN1bW1hcnlSdW4nOiAnU3VtbWFyaXppbmdcdTIwMjYgKDEwLTMwcyknLFxuICAgICdub3Rlcy5leHBhbmQnOiAnRXhwYW5kJyxcbiAgICAnbm90ZXMuY29sbGFwc2UnOiAnQ29sbGFwc2UnLFxuICAgICdub3Rlcy5zdW1tYXJ5VGFnJzogJ0FJIHN1bW1hcnknLFxuICAgICdub3Rlcy5lbXB0eVNlYXJjaCc6ICdObyBtYXRjaGluZyBub3Rlcy4nLFxuICAgICdub3Rlcy5jb250ZW50SGludCc6ICdOb3RlIGNvbnRlbnQgKG11bHRpLWxpbmUpOiBjb25jbHVzaW9ucywgcXVlc3Rpb25zLCBsZWFybmluZ3NcdTIwMjYnLFxuICAgICdub3Rlcy50YWdzSGludCc6ICdUYWdzIChjb21tYSBzZXBhcmF0ZWQsIG9wdGlvbmFsOyBjbGljayBhIHRhZyB0byBmaWx0ZXIpJyxcbiAgICAnbm90ZXMucGluJzogJ1BpbicsXG4gICAgJ25vdGVzLnVucGluJzogJ1VucGluJyxcbiAgICAnbm90ZXMuZWRpdGVkQXQnOiAnZWRpdGVkJyxcbiAgICAncmV2aWV3LmZpbHRlckFsbCc6ICdBbGwnLFxuICAgICdyZXZpZXcuc3RhdHVzQWxsJzogJ0FsbCBzdGF0dXNlcycsXG4gICAgJ3Jldmlldy52ZXJpZnknOiAnUmUtdmVyaWZ5JyxcbiAgICAncmV2aWV3LnZlcmlmeVJ1bm5pbmcnOiAnVmVyaWZ5aW5nXHUyMDI2JyxcbiAgICAncmV2aWV3LnZlcmlmeUhpbnQnOiAnQWZ0ZXIgZml4aW5nIHRoZSBjb2RlLCBjbGljayB0byByZS1jaGVjazogd2hldGhlciBpc3N1ZXMgYXJlIGZpeGVkLCB3aGV0aGVyIHRoZSBjaGFuZ2UgaXMgb3B0aW1hbCBhbmQgbWluaW1hbGx5IGludmFzaXZlLCBhbmQgd2hldGhlciBuZXcgaXNzdWVzIGFwcGVhcmVkLiBPbmx5IGEgcGFzc2luZyByZS12ZXJpZmljYXRpb24gbWFya3MgaXNzdWVzIHJlc29sdmVkLicsXG4gICAgJ3Jldmlldy5mYWxzZVBvc2l0aXZlJzogJ0ZhbHNlIHBvc2l0aXZlJyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVIaW50JzogJ0h1bWFuLW1hcmsgdGhpcyBpc3N1ZSBhcyBhIGZhbHNlIHBvc2l0aXZlIGFuZCBjbG9zZSBpdCAoZGlzdGluY3QgZnJvbSBhIHZlcmlmaWVkIGZpeCknLFxuICAgICdyZXZpZXcuZmFsc2VQb3NpdGl2ZVRpdGxlJzogJ01hcmsgYXMgZmFsc2UgcG9zaXRpdmU/JyxcbiAgICAncmV2aWV3LmZhbHNlUG9zaXRpdmVNc2cnOiAnXCJ7dGl0bGV9XCIgd2lsbCBiZSBtYXJrZWQgcmVqZWN0ZWQgYW5kIHJlbW92ZWQgZnJvbSB0aGUgb3BlbiBxdWV1ZS4nLFxuICAgICdyZXZpZXcuZml4RGV0YWlsJzogJ0ZpeCBkZXRhaWxzJyxcbiAgICAncmV2aWV3LmZpeFN0YXRGaWxlcyc6ICdmaWxlcycsXG4gICAgJ3Jldmlldy5maXhGaWxlcyc6ICdGaWxlcyB0b3VjaGVkIGJ5IHRoZSBmaXgnLFxuICAgICdyZXZpZXcuZml4SW1wYWN0JzogJ0ltcGFjdCBzY29wZSAoY2hhbmdlZCBzeW1ib2xzIGFuZCBjYWxsZXJzKScsXG4gICAgJ3Jldmlldy5kZWZpbmVkSW4nOiAnZGVmaW5lZCBpbicsXG4gICAgJ3Jldmlldy5jYWxsQ291bnQnOiAnY2FsbCBzaXRlKHMpJyxcbiAgICAncmV2aWV3LmZpeERpZmYnOiAnRml4IGRpZmYgKHJlbGF0aXZlIHRvIHRoZSByZXZpZXcgYmFzZWxpbmUpJyxcbiAgICAncmV2aWV3LnJlZnJlc2gnOiAnUmVmcmVzaCcsXG4gICAgJ3Jldmlldy5yZXRlbnRpb25IaW50JzogJ1Jlc29sdmVkIGlzc3VlcyBhcmUgYXV0by1wdXJnZWQgYWZ0ZXIge2RheXN9IGRheShzKScsXG4gICAgJ3Jldmlldy50YXJnZXQnOiAnVGFyZ2V0JyxcbiAgICAncmV2aWV3LndvcmtpbmdUYXJnZXQnOiAnV29ya2luZyB0cmVlJyxcblxuICAgICdwbGFuLnRpdGxlJzogJ09yY2hlc3RyYXRpb24gcGxhbicsXG4gICAgJ3BsYW4uaGludCc6ICdFYWNoIHN0ZXAgcm9sZSBkcml2ZXMgY29udGV4dCBpbmplY3Rpb24gYW5kIHRoZSBkZWZhdWx0IG1vZGVsIChhbmFseXNpcy9vcHM9ZmFzdCwgY29kaW5nPXN0YW5kYXJkLCBwbGFubmluZz1yZWFzb25pbmcsIHZlcmlmaWNhdGlvbj12ZXJpZmllcik7IGFkanVzdCBiZWZvcmUgbGF1bmNoaW5nLicsXG4gICAgJ3BsYW4uY29sLnN0ZXAnOiAnU3RlcCcsICdwbGFuLmNvbC5yb2xlJzogJ1JvbGUnLCAncGxhbi5jb2wubW9kZWwnOiAnTW9kZWwnLCAncGxhbi5jb2wucG9saWN5JzogJ0ZhaWx1cmUgcG9saWN5JywgJ3BsYW4uY29sLmVuYWJsZWQnOiAnT24nLCAncGxhbi5jb2wuYXR0ZW1wdHMnOiAnQXR0ZW1wdHMnLFxuICAgICdwbGFuLm1vZGVsRGVmYXVsdCc6ICdSb2xlIGRlZmF1bHQnLFxuICAgICdwbGFuLmxhdW5jaEVkaXRlZCc6ICdTYXZlIGVkaXRzICYgbGF1bmNoJyxcbiAgICAncGxhbi5sYXVuY2hEaXJlY3QnOiAnTGF1bmNoIGFzLWlzJyxcbiAgICAncGxhbi5kaXNjYXJkJzogJ0Rpc2NhcmQnLFxuICAgICdwbGFuLnZpZXdEZXRhaWwnOiAnRGV0YWlsJywgJ3BsYW4ucmVmcmVzaERldGFpbCc6ICdSZWZyZXNoJywgJ3BsYW4uY2xvc2VEZXRhaWwnOiAnQ2xvc2UnLFxuICAgICdwbGFuLmRldGFpbFRpdGxlJzogJ1J1biBkZXRhaWwnLFxuICAgICdwbGFuLnBhdXNlZEJhbm5lcic6ICdSdW4gcGF1c2VkLCBhd2FpdGluZyB5b3VyIGRlY2lzaW9uJyxcbiAgICAncGxhbi5yZXN1bWVSZXRyeSc6ICdSZXRyeSBzdGVwICYgY29udGludWUnLFxuICAgICdwbGFuLnJlc3VtZVNraXAnOiAnU2tpcCBzdGVwICYgY29udGludWUnLFxuICAgICdwbGFuLnJlc3VtZUZhaWxlZCc6ICdSZXN1bWUgZnJvbSBmYWlsdXJlJyxcbiAgICAncGxhbi5jb250ZXh0VGl0bGUnOiAnUnVuIGNvbnRleHQgKHdoYXQgd2FzIGluamVjdGVkKScsXG4gICAgJ3BsYW4uYnJhbmNoJzogJ0JyYW5jaCcsICdwbGFuLmluamVjdGVkTWVtb3JpZXMnOiAnSW5qZWN0ZWQgbWVtb3JpZXMnLCAncGxhbi5kZWNpc2lvbkxvZyc6ICdEZWNpc2lvbiBsb2cnLFxuICAgICdleGVjLmNvbC5kZXRhaWwnOiAnRGV0YWlsJyxcblxuICAgICdzY2hlZC50aXRsZSc6ICdTY2hlZHVsZWQgdGFza3MnLFxuICAgICdzY2hlZC5mb3JtTmFtZSc6ICdUYXNrIG5hbWUnLCAnc2NoZWQuZm9ybUludGVydmFsJzogJ0ludGVydmFsIChtaW51dGVzKScsXG4gICAgJ3NjaGVkLnR5cGVSZXZpZXcnOiAnQXV0byByZXZpZXcnLCAnc2NoZWQudHlwZVN1bW1hcnknOiAnQUkgc3VtbWFyeScsICdzY2hlZC50eXBlUnVuJzogJ1RpbWVkIHJ1bicsXG4gICAgJ3NjaGVkLmFkZCc6ICdDcmVhdGUnLFxuICAgICdzY2hlZC5oaW50JzogJ1J1bnMgYXV0b21hdGljYWxseSB3aGVuIGR1ZTogYXV0byByZXZpZXcgPSByZXZpZXcgY29tbWl0cyBmcm9tIHRoZSBsYXN0IDI0aCAoaXNzdWVzIGxhbmQgaW4gdGhlIFJldmlldyB0YWIpOyBBSSBzdW1tYXJ5ID0gaW5jcmVtZW50YWwgbGVhcm5pbmcgc3VtbWFyeTsgdGltZWQgcnVuID0gZXhlY3V0ZSB0aGUgdGVtcGxhdGUgYXMgYW4gb3JjaGVzdHJhdGVkIHRhc2suIE1pbmltdW0gMSBtaW51dGUuJyxcbiAgICAnc2NoZWQuZW1wdHknOiAnTm8gc2NoZWR1bGVkIHRhc2tzIHlldC4nLFxuICAgICdzY2hlZC5jb2wubmFtZSc6ICdOYW1lJywgJ3NjaGVkLmNvbC50eXBlJzogJ1R5cGUnLCAnc2NoZWQuY29sLmludGVydmFsJzogJ0N5Y2xlJywgJ3NjaGVkLmNvbC5uZXh0JzogJ05leHQgcnVuJywgJ3NjaGVkLmNvbC5sYXN0UmVzdWx0JzogJ0xhc3QgcmVzdWx0JywgJ3NjaGVkLmNvbC5hY3Rpb25zJzogJ0FjdGlvbnMnLFxuICAgICdzY2hlZC5kYXknOiAnIGQnLCAnc2NoZWQuaG91cic6ICcgaCcsICdzY2hlZC5taW51dGUnOiAnIG1pbicsXG4gICAgJ3NjaGVkLmRpc2FibGUnOiAnUGF1c2UnLCAnc2NoZWQuZW5hYmxlJzogJ0VuYWJsZScsICdzY2hlZC5ydW5Ob3cnOiAnUnVuIG5vdycsXG5cbiAgICAnbWVtb3J5LnpvbmVUaXRsZSc6ICdQcm9qZWN0IG1lbW9yeScsXG4gICAgJ21lbW9yeS5zeW5jQmFzZWxpbmUnOiAnU3luYyBiYXNlbGluZScsICdtZW1vcnkuc3luY05vbmUnOiAnbmV2ZXIgc3luY2VkJyxcbiAgICAnbWVtb3J5LmJlaGluZCc6ICd7bn0gY29tbWl0cyBiZWhpbmQnLFxuICAgICdtZW1vcnkuc3luYyc6ICdTeW5jIG1lbW9yeScsICdtZW1vcnkuc3luY2luZyc6ICdTeW5jaW5nXHUyMDI2JywgJ21lbW9yeS5zeW5jRmFpbGVkJzogJ1N5bmMgZmFpbGVkJyxcbiAgICAnbWVtb3J5LnN0YWxlVGl0bGUnOiAnUG9zc2libHkgc3RhbGUgKHJlbGF0ZWQgY29kZSBjaGFuZ2VkOyByZXZpZXcgbmVlZGVkKScsXG4gICAgJ21lbW9yeS5tYXJrU3RhbGUnOiAnTWFyayBzdGFsZScsICdtZW1vcnkuYXJjaGl2ZUJ0bic6ICdBcmNoaXZlJywgJ21lbW9yeS5rZWVwQWN0aXZlJzogJ1N0aWxsIHZhbGlkJyxcbiAgICAnbWVtb3J5Lm5ld0NhbmRpZGF0ZXMnOiAnTmV3IGNhbmRpZGF0ZXMgKHF1ZXVlZCBmb3IgY29uZmlybWF0aW9uKTonLFxuICAgICdtZW1vcnkuY2xvc2VSZXBvcnQnOiAnQ2xvc2UgcmVwb3J0JyxcbiAgICAnbWVtb3J5LnNjb3BlUHJvamVjdCc6ICdNYWlubGluZSAoYWxsIGJyYW5jaGVzKScsICdtZW1vcnkuc2NvcGVCcmFuY2gnOiAnQ3VycmVudCBicmFuY2ggb25seScsXG4gICAgJ21lbW9yeS5wZW5kaW5nUXVldWUnOiAnUGVuZGluZyBjb25maXJtYXRpb24nLFxuICAgICdtZW1vcnkudG9Ob3RlJzogJ1RvIG5vdGUnLCAnbWVtb3J5Lm5vcm1hbGl6ZSc6ICdOb3JtYWxpemUgdG8gbWFpbmxpbmUnLCAnbWVtb3J5LnJlc3RvcmUnOiAnUmVzdG9yZScsXG4gICAgJ21lbW9yeS5zdGF0dXNTdGFsZSc6ICdTdGFsZScsXG4gICAgJ2ZzLmJyb3dzZSc6ICdCcm93c2UnLFxuICAgICdmcy51cCc6ICdVcCcsXG4gICAgJ2ZzLnVzZSc6ICdVc2UgdGhpcyBkaXJlY3RvcnknLFxuICAgICdmcy5yZWdpc3Rlcic6ICdBbHNvIHJlZ2lzdGVyIGFzIHNlc3Npb24gd29ya3NwYWNlJyxcbiAgICAnZnMubG9hZGluZyc6ICdSZWFkaW5nXHUyMDI2JyxcbiAgICAnZnMuZW1wdHknOiAnTm8gc3ViZGlyZWN0b3JpZXMuJyxcbiAgICAnaW1wYWN0LmZ1bmN0aW9uc05vbmUnOiAnTm8gZnVuY3Rpb24tbGV2ZWwgY2FsbCBpbXBhY3QgZGV0ZWN0ZWQgKHN0eWxlL2Fzc2V0L2NvbmZpZy1vbmx5IGNoYW5nZSkuJyxcbiAgICAncmV2aWV3LmNvbC5zZXZlcml0eSc6ICdTZXZlcml0eScsXG4gICAgJ3Jldmlldy5jb2wuY2F0ZWdvcnknOiAnQ2F0ZWdvcnknLFxuICAgICdyZXZpZXcuY29sLnRpdGxlJzogJ0lzc3VlJyxcbiAgICAncmV2aWV3LmNvbC5ldmlkZW5jZSc6ICdMb2NhdGlvbicsXG4gICAgJ3Jldmlldy5jb2wuZml4JzogJ1N1Z2dlc3RlZCBmaXgnLFxuICAgICdyZXZpZXcuaGludCc6ICdDbGljayB0aGUgYnV0dG9uIGFib3ZlIHRvIHByb2R1Y2UgdGhlIG9wdGltYWxpdHkgdmVyZGljdCBhbmQgaXNzdWUgbGlzdC4nLFxuICAgICdkaWZmLnNob3cnOiAnRGlmZicsXG4gICAgJ2RpZmYuaGlkZSc6ICdIaWRlIGRpZmYnLFxuXG4gICAgJ2RldGFpbC50aXRsZSc6ICdSZXZpZXcgZGV0YWlsJyxcbiAgICAnZGV0YWlsLnBpY2snOiAnXHUyMTkwIFBpY2sgYSBjb21taXQgKG9yIHRoZSB1bmNvbW1pdHRlZCBjaGFuZ2VzKSBvbiB0aGUgbGVmdCB0byBzdGFydCByZXZpZXdpbmcnLFxuICAgICdkZXRhaWwud2hhdCc6ICdXaGF0IGl0IGRvZXMnLFxuICAgICdkZXRhaWwubG9naWMnOiAnSW1wbGVtZW50YXRpb24gbG9naWMnLFxuICAgICdkZXRhaWwucmlzayc6ICdSaXNrcycsXG4gICAgJ2RldGFpbC5maWxlcyc6ICdGaWxlcycsXG4gICAgJ2RldGFpbC5wYXRjaCc6ICdTaG93IHJhdyBwYXRjaCcsXG4gICAgJ2RldGFpbC5haUxvYWRpbmcnOiAnR2VuZXJhdGluZyBBSSBleHBsYW5hdGlvblx1MjAyNiAoMTAtMzBzKScsXG4gICAgJ2RldGFpbC5pbXBhY3QnOiAnSW1wYWN0IHNjb3BlJyxcbiAgICAnZGV0YWlsLmltcGFjdExvYWRpbmcnOiAnU2Nhbm5pbmcgaW1wYWN0XHUyMDI2IChyZWZlcmVuY2Ugc2VhcmNoICsgZ3JhcGggd2FsayknLFxuICAgICdkZXRhaWwub3B0aW1hbGl0eSc6ICdPcHRpbWFsaXR5IHJldmlldycsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZyc6ICdSZXZpZXdpbmdcdTIwMjYgKHByb2R1Y2VzIGlzc3VlIGxpc3QgYW5kIG9wdGltYWxpdHkgdmVyZGljdCknLFxuXG4gICAgJ2ltcGFjdC5yaXNrJzogJ1Jpc2snLFxuICAgICdpbXBhY3QuY29sLmNoYW5nZWQnOiAnQ2hhbmdlZCBmaWxlcycsXG4gICAgJ2ltcGFjdC5jb2wuaW5kaXJlY3QnOiAnSW5kaXJlY3QgKHJlZmVyZW5jZSBjaGFpbiknLFxuICAgICdpbXBhY3QuY29sLnBvdGVudGlhbCc6ICdQb3RlbnRpYWwnLFxuICAgICdpbXBhY3Qubm9uZSc6ICdObyBpbi1yZXBvIHJlZmVyZW5jZXJzIGZvdW5kICh0aGUgY2hhbmdlIGxvb2tzIHNlbGYtY29udGFpbmVkKS4nLFxuICAgICdpbXBhY3QudGVzdHMnOiAnUmVsYXRlZCB0ZXN0cycsXG4gICAgJ2ltcGFjdC5sZWdlbmQuY2hhbmdlZCc6ICdjaGFuZ2VkJyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5pbmRpcmVjdCc6ICdpbmRpcmVjdCcsXG4gICAgJ2ltcGFjdC5sZWdlbmQucG90ZW50aWFsJzogJ3BvdGVudGlhbCcsXG5cbiAgICAncmV2aWV3LnZlcmRpY3QnOiAnT3B0aW1hbGl0eSB2ZXJkaWN0JyxcbiAgICAncmV2aWV3Lmlzc3Vlcyc6ICdJc3N1ZXMnLFxuICAgICdyZXZpZXcuY2xlYW4nOiAnTm8gaXNzdWVzIGZvdW5kLicsXG5cbiAgICAnbm90ZXMudGl0bGUnOiAnUmV2aWV3IG5vdGVzJyxcbiAgICAnbm90ZXMuZm9ybVRpdGxlJzogJ05vdGUgdGl0bGUnLFxuICAgICdub3Rlcy5mb3JtQ29udGVudCc6ICdOb3RlIGNvbnRlbnQgKGNvbmNsdXNpb25zLCBxdWVzdGlvbnMsIGxlYXJuaW5nc1x1MjAyNiknLFxuICAgICdub3Rlcy5hZGQnOiAnQWRkIG5vdGUnLFxuICAgICdub3Rlcy5ib3VuZFRvJzogJ1dpbGwgYmUgbGlua2VkIHRvJyxcbiAgICAnbm90ZXMuY29sLnRpbWUnOiAnVGltZScsXG4gICAgJ25vdGVzLmNvbC50aXRsZSc6ICdUaXRsZScsXG4gICAgJ25vdGVzLmNvbC5jb250ZW50JzogJ0NvbnRlbnQnLFxuICAgICdub3Rlcy5jb2wuc2hhJzogJ0NvbW1pdCcsXG4gICAgJ25vdGVzLnJlbW92ZSc6ICdEZWxldGUnLFxuICAgICdub3Rlcy5lbXB0eSc6ICdObyBub3RlcyB5ZXQuIE5vdGUgZG93biBjb25jbHVzaW9ucyBhbmQgcXVlc3Rpb25zIHdoaWxlIHJldmlld2luZyBjb21taXRzIFx1MjAxNCB0aGF0IGlzIHlvdXIgcHJvamVjdCBsZWFybmluZyBhcmNoaXZlLicsXG5cbiAgICAnbWVtb3J5LnJlY29yZCc6ICdSZWNvcmQgcHJvamVjdCBtZW1vcnknLFxuICAgICdmb3JtLm1lbW9yeVRpdGxlJzogJ01lbW9yeSB0aXRsZScsXG4gICAgJ2Zvcm0ubWVtb3J5Q29udGVudCc6ICdNZW1vcnkgY29udGVudCAod2hhdCBhbmQgd2h5KScsXG4gICAgJ21lbW9yeS5jb2wudGl0bGUnOiAnSXRlbScsXG4gICAgJ21lbW9yeS5jb2wudHlwZSc6ICdUeXBlJyxcbiAgICAnbWVtb3J5LmNvbC50cnV0aCc6ICdUcnV0aCcsXG4gICAgJ21lbW9yeS5jb2wuYnJhbmNoJzogJ0JyYW5jaCcsXG4gICAgJ21lbW9yeS5jb25maXJtJzogJ0NvbmZpcm0nLFxuICAgICdtZW1vcnkuZW1wdHknOiAnTm8gcHJvamVjdCBtZW1vcmllcyB5ZXQuIEFzayB0aGUgQUkgaW4gY2hhdCB0byByZWNvcmQgb25lLCBvciBhZGQgYWJvdmUuJyxcbiAgICAnY29uY2VwdHMudGl0bGUnOiAnTGVhcm5pbmcgY29uY2VwdHMnLFxuICAgICdjb25jZXB0cy5ub25lJzogJ05vIGxlYXJuaW5nIGNvbmNlcHRzIHlldC4gVGhleSBhY2N1bXVsYXRlIGFmdGVyIHN1Y2Nlc3NmdWwgY2hhbmdlIHJ1bnMsIG9yIGFzayB0aGUgQUkgdG8gc3VtbWFyaXplIGxlYXJuaW5nIHBvaW50cy4nLFxuICAgICdjb25jZXB0cy5jb2wubmFtZSc6ICdDb25jZXB0JyxcbiAgICAnY29uY2VwdHMuY29sLmNhdGVnb3J5JzogJ0NhdGVnb3J5JyxcbiAgICAnY29uY2VwdHMuY29sLmNvdW50JzogJ0NvdW50JyxcbiAgICAncmV2aWV3LnJlY29yZHNUaXRsZSc6ICdSZXZpZXcgaXNzdWVzJyxcbiAgICAncmV2aWV3LnJlY29yZHNFbXB0eSc6ICdObyBpc3N1ZSByZWNvcmRzIHlldC4gSXNzdWVzIGZvdW5kIGJ5IHRoZSBjb21taXQtcmV2aWV3IHBhZ2UgYXJlIHJlY29yZGVkIGhlcmUgYXV0b21hdGljYWxseTsgcmUtcmV2aWV3aW5nIHJlcGxhY2VzIG9sZCByZWNvcmRzLicsXG4gICAgJ3ZlcmlmeS5yZWNvcmRzJzogJ1ZlcmlmaWNhdGlvbiByZWNvcmRzJyxcbiAgICAndmVyaWZ5LnJlY29yZHNFbXB0eSc6ICdObyB2ZXJpZmljYXRpb24gcmVjb3JkcyB5ZXQuIENsaWNrIFwiVmVyaWZ5XCIgaW4gdGhlIGV4ZWN1dGlvbiB0YWIgdG8gZ2VuZXJhdGUgb25lLicsXG5cbiAgICAnY29uZmlybWVkLnRpdGxlJzogJ0NvbmZpcm1lZCBjb25zdHJhaW50cyAoaHVtYW4tY29uZmlybWVkOyBBSSBlZGl0cyB0byBmb3JiaWRkZW4gcGF0aHMgYXJlIGF1dG8tZGVuaWVkKScsXG4gICAgJ2NvbmZpcm1lZC5hZGQnOiAnQWRkIGNvbnN0cmFpbnQnLFxuICAgICdjb25maXJtZWQudGV4dCc6ICdSZXF1aXJlbWVudCAvIGNvbnN0cmFpbnQgdGV4dCcsXG4gICAgJ2NvbmZpcm1lZC5wYXRocyc6ICdGb3JiaWRkZW4gcGF0aHMgKGNvbW1hIHNlcGFyYXRlZDsgcmVsYXRpdmUgdG8gcHJvamVjdCByb290IGxpa2Ugc3JjL2NvcmUsIG9yIGFic29sdXRlKScsXG4gICAgJ2NvbmZpcm1lZC5ub25lJzogJ05vIGNvbnN0cmFpbnRzIHlldC4gT25jZSBhZGRlZCwgQUkgZWRpdHMgdG8gZm9yYmlkZGVuIHBhdGhzIGluIHRoaXMgcHJvamVjdCBhcmUgYXV0by1kZW5pZWQuJyxcblxuICAgICdjaGFuZ2VzLnRpdGxlJzogJ0NoYW5nZSB0YXNrcycsXG4gICAgJ3N0YXRlLm5vQ2hhbmdlcyc6ICdObyBjaGFuZ2UgdGFza3MgeWV0LiBBc2sgdGhlIEFJIGluIGNoYXQgdG8gY3JlYXRlIG9uZSwgb3IgdXNlIFwiQ3JlYXRlIGNoYW5nZVwiIGFib3ZlLicsXG4gICAgJ2NoYW5nZXMuY29sLnRpdGxlJzogJ1RpdGxlJyxcbiAgICAnY2hhbmdlcy5jb2wudHlwZSc6ICdUeXBlJyxcbiAgICAnY2hhbmdlcy5jb2wuc3RhdHVzJzogJ1N0YXR1cycsXG4gICAgJ2NoYW5nZXMuY29sLnVwZGF0ZWQnOiAnVXBkYXRlZCcsXG4gICAgJ2V4ZWMuY29sLnN0YXR1cyc6ICdTdGF0dXMnLFxuICAgICdleGVjLmNvbC5jaGFuZ2UnOiAnQ2hhbmdlJyxcbiAgICAnZXhlYy5jb2wuc3RhcnRlZCc6ICdTdGFydGVkJyxcbiAgICAnZXhlYy5jb2wuY29zdCc6ICdDb3N0IChlc3QpJyxcbiAgICAnZXhlYy5hdHRlbXB0cyc6ICdBdHRlbXB0cycsXG4gICAgJ2V4ZWMuaGludCc6ICdSdW5zIChzdGFydF9ydW4pIGFyZSBzdGFydGVkIGZyb20gY2hhdDogYWZ0ZXIgYSBwbGFuIGV4aXN0cywgdGVsbCB0aGUgQUkgdG8gXCJzdGFydCBydW4gZm9yIHRoZSBjaGFuZ2VcIi4gVGhpcyB0YWIgc2hvd3MgcHJvZ3Jlc3MgYW5kIHJlc3VsdHMuJyxcbiAgICAnc3RhdGUubm9SdW5zJzogJ05vIHJ1bnMgeWV0LicsXG4gICAgJ3N0YXRlLnRlY2hTdGFjayc6ICdUZWNoIHN0YWNrJyxcbiAgICAnc3RhdGUuc3ltYm9scyc6ICdJbmRleGVkIHN5bWJvbHMnLFxuICAgICdzdGF0ZS5tYW5pZmVzdHMnOiAnTWFuaWZlc3RzJyxcbiAgICAnc3RhdGUuZXZpZGVuY2UnOiAnRXZpZGVuY2UgZW50cmllcycsXG4gIH0sXG59IGFzIGNvbnN0XG5cbmZ1bmN0aW9uIGZhbGxiYWNrVChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGRpY3QgPSBXT1JLU1BBQ0VfRElDVC56aCBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG4gIHJldHVybiBkaWN0W2tleV0gPz8ga2V5XG59XG5cbi8qKiBcdTY0Q0RcdTRGNUNcdTdFRDNcdTY3OUNcdTRFQkFcdTYwMjdcdTUzMTZcdUZGMUFcdTI3MTMvXHUyNzE3ICsgXHU2ODA3XHU5MUNGXHU1QjU3XHU2QkI1XHU3Njg0XHU3RDI3XHU1MUQxXHU4ODRDXHVGRjA4XHU4REYzXHU4RkM3XHU1RDRDXHU1OTU3XHU1QkY5XHU4QzYxXHU0RTBFXHU1MzlGXHU1OUNCIEpTT05cdUZGMDlcdTMwMDIgKi9cbmZ1bmN0aW9uIGZvcm1hdEFjdGlvblJlc3VsdChkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IHN0cmluZyB7XG4gIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IFtkYXRhWydvayddID09PSBmYWxzZSA/ICdcdTI3MTcnIDogJ1x1MjcxMyddXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGEpKSB7XG4gICAgaWYgKGtleSA9PT0gJ29rJykgY29udGludWVcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBsaW5lcy5wdXNoKGAke2tleX1cdUZGMUEke1N0cmluZyh2YWx1ZSkuc2xpY2UoMCwgMjAwKX1gKVxuICAgIH1cbiAgfVxuICBpZiAobGluZXMubGVuZ3RoID09PSAxKSBsaW5lcy5wdXNoKCdcdTYyMTBcdTUyOUYnKVxuICByZXR1cm4gbGluZXMuam9pbignXFxuJylcbn1cblxuLyoqIExMTSBcdTYyMTBcdTY3MkNcdUZGMDhcdTRGMzBcdUZGMDlcdTVGQkRcdTY4MDdcdUZGMUFcdTY1RTBcdTUwM0NcdUZGMDhcdTY3MkFcdTRFQTdcdTc1MUZcdThDMDNcdTc1MjggLyBcdTY1RTdcdTdGMTNcdTVCNThcdTRFMERcdTVFMjZcdTYyMTBcdTY3MkNcdUZGMDlcdTY1RjZcdThGRDRcdTU2REUgbnVsbCBcdTRFMERcdTUzNjBcdTRGNERcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlbmRlckNvc3RCYWRnZSh1c2Q6IG51bWJlciB8IHVuZGVmaW5lZCwgdGl0bGU6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZSB7XG4gIGlmICh1c2QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGxcbiAgcmV0dXJuIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4Yjk0OWUnKX0gdGl0bGU9e3RpdGxlfT5cdTIyNDgke3VzZC50b0ZpeGVkKDQpfTwvc3Bhbj5cbn1cblxuY29uc3Qgc3R5bGVzOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5DU1NQcm9wZXJ0aWVzPiA9IHtcbiAgcm9vdDoge1xuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgIGhlaWdodDogJzEwMCUnLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyxcbiAgICBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScsXG4gICAgZm9udEZhbWlseTogJ3ZhcigtLWRzLWZvbnQtc2FucywgaW5oZXJpdCknLFxuICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgfSxcbiAgbmF2OiB7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIGdhcDogJzRweCcsXG4gICAgcGFkZGluZzogJzhweCAxMnB4JyxcbiAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMSwgcmdiYSg1LDUsNSwwLjEpKScsXG4gICAgZmxleDogJ25vbmUnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxuICB9LFxuICB0aXRsZTogeyBmb250U2l6ZTogJzEzcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbklubGluZUVuZDogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSxcbiAgdGFiOiAoYWN0aXZlOiBib29sZWFuKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiAoe1xuICAgIHBhZGRpbmc6ICc1cHggMTJweCcsXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcbiAgICBib3JkZXI6ICdub25lJyxcbiAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICBmb250U2l6ZTogJzEycHgnLFxuICAgIC8vIGJ1dHRvbi1pbmZvLWZpbGwgXHU0RTI0XHU0RTNCXHU5ODk4XHU5MEZEXHU4NEREXHVGRjFCYnJhbmQtcHJpbWFyeSBcdTU3MjhcdTZERjFcdTgyNzJcdTRFM0JcdTk4OThcdTY2MkZcdThGRDFcdTc2N0RcdTgyNzJcdUZGMENcdTc2N0RcdTVCNTdcdTRGMUFcdTg4QUJcdTU0MUVcdTYzODlcdUZGMDhcdTk4NzVcdTdCN0VcdTc2N0RcdTU3NTdcdTRFOEJcdTY1NDVcdUZGMDlcdTMwMDJcbiAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyAndmFyKC0tZHN3LWFsaWFzLWJ1dHRvbi1pbmZvLWZpbGwsICMyNTYzZWIpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgY29sb3I6IGFjdGl2ZSA/ICcjZmZmJyA6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsXG4gIH0pLFxuICBib2R5OiB7IGZsZXg6IDEsIG92ZXJmbG93WTogJ2F1dG8nLCBwYWRkaW5nOiAnMTRweCAxNnB4JyB9LFxuICBjYXJkOiB7XG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcbiAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgIHBhZGRpbmc6ICcxMnB4IDE0cHgnLFxuICAgIG1hcmdpbkJvdHRvbTogJzEycHgnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLFxuICB9LFxuICByb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxOHB4JywgZmxleFdyYXA6ICd3cmFwJywgZm9udFNpemU6ICcxMnB4JywgbWFyZ2luOiAnNnB4IDAnIH0sXG4gIGxhYmVsOiB7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnIH0sXG4gIHRhYmxlOiB7IHdpZHRoOiAnMTAwJScsIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLCBmb250U2l6ZTogJzEycHgnIH0sXG4gIHRoOiB7IHRleHRBbGlnbjogJ3N0YXJ0JywgcGFkZGluZzogJzZweCA4cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMSwgcmdiYSg1LDUsNSwwLjEpKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250V2VpZ2h0OiA1MDAgfSxcbiAgdGQ6IHsgcGFkZGluZzogJzZweCA4cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMywgcmdiYSg1LDUsNSwwLjA2KSknIH0sXG4gIGVtcHR5OiB7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBmb250U2l6ZTogJzEycHgnLCBwYWRkaW5nOiAnMTBweCA0cHgnIH0sXG4gIGJ1dHRvbjoge1xuICAgIHBhZGRpbmc6ICc1cHggMTJweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAvLyBidXR0b24taW5mby1maWxsIFx1NjYyRlx1NUJCRlx1NEUzQlx1NEUyNFx1NEUyQVx1NEUzQlx1OTg5OFx1NEUwQlx1OTBGRFx1NEUzQVx1ODRERFx1ODI3Mlx1MzAwMVx1NzY3RFx1NUI1N1x1NTNFRlx1OEJGQlx1NzY4NFx1NEUzQlx1NjRDRFx1NEY1Q1x1ODI3Mlx1RkYwOGJyYW5kLXByaW1hcnkgXHU1NzI4XHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU2NjJGXHU4RkQxXHU3NjdEXHU4MjcyXHVGRjBDXHU3NjdEXHU1QjU3XHU0RTBEXHU1M0VGXHU4QkZCXHVGRjA5XHUzMDAyXG4gICAgZm9udFNpemU6ICcxMXB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1idXR0b24taW5mby1maWxsLCAjMjU2M2ViKScsIGNvbG9yOiAnI2ZmZicsXG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIH0sXG4gIHNlY29uZGFyeToge1xuICAgIHBhZGRpbmc6ICc1cHggMTJweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzExcHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgfSxcbiAgaW5wdXQ6IHtcbiAgICB3aWR0aDogJzEwMCUnLCBwYWRkaW5nOiAnNnB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgfSxcbiAgZm9ybVJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICc2cHgnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH0sXG4gIGZvcm1JbmxpbmU6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9LFxuICAvLyBzZWxlY3QgXHU3NTI4XHU3Q0ZCXHU3RURGXHU1OTE2XHU4OUMyXHU2NUY2IFdpbmRvd3MgXHU2RDQ1XHU4MjcyXHU2QTIxXHU1RjBGXHU0RTBCXHU1RjNBXHU1MjM2XHU3NjdEXHU1RTk1XHVGRjBDXHU2REYxXHU4MjcyXHU0RTNCXHU5ODk4XHU0RTBCXHU0RTBEXHU1M0VGXHU4QkZCXHUyMDE0XHUyMDE0XHU4MUVBXHU3RUQ4XHU1OTE2XHU4OUMyXHU4RDcwXHU0RTNCXHU5ODk4XHU1M0Q4XHU5MUNGXHUzMDAyXG4gIHNlbGVjdDoge1xuICAgIGFwcGVhcmFuY2U6ICdub25lJywgV2Via2l0QXBwZWFyYW5jZTogJ25vbmUnLFxuICAgIHBhZGRpbmc6ICc2cHggMjZweCA2cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxuICAgIGJhY2tncm91bmRJbWFnZTogJ3VybChcImRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LDxzdmcgeG1sbnM9JTIyaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmclMjIgd2lkdGg9JTIyMTAlMjIgaGVpZ2h0PSUyMjYlMjI+PHBhdGggZD0lMjJNMSAxbDQgNCA0LTQlMjIgc3Ryb2tlPSUyMiUyMzg4OCUyMiBzdHJva2Utd2lkdGg9JTIyMS41JTIyIGZpbGw9JTIybm9uZSUyMi8+PC9zdmc+XCIpJyxcbiAgICBiYWNrZ3JvdW5kUmVwZWF0OiAnbm8tcmVwZWF0JywgYmFja2dyb3VuZFBvc2l0aW9uOiAncmlnaHQgOHB4IGNlbnRlcicsXG4gICAgY3Vyc29yOiAncG9pbnRlcicsIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCBtYXhXaWR0aDogJzEwMCUnLFxuICB9LFxuICBhY3Rpb25Sb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxMHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfSxcbiAgcmVzdWx0OiB7XG4gICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS42LFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxuICAgIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICcxMHB4IDEycHgnLCBtYXhIZWlnaHQ6ICczMjBweCcsIG92ZXJmbG93WTogJ2F1dG8nLFxuICB9LFxuICBiYWRnZTogKGNvbG9yOiBzdHJpbmcpOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+IHtcbiAgICBjb25zdCByZ2IgPSBwYXJzZUNvbG9yKGNvbG9yKVxuICAgIGlmIChyZ2IgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCBwYWRkaW5nOiAnMXB4IDhweCcsIGJvcmRlclJhZGl1czogJzRweCcsIGZvbnRTaXplOiAnMTFweCcsIGJhY2tncm91bmQ6IGAke2NvbG9yfTIyYCwgY29sb3IgfVxuICAgIH1cbiAgICBjb25zdCBbciwgZywgYl0gPSByZ2JcbiAgICAvLyBcdTVFOTVcdTgyNzJcdTdFREZcdTRFMDAgMTYlIFx1ODI3Mlx1OEMwM1x1RkYxQlx1NjU4N1x1NUI1N1x1ODI3Mlx1NEUzQlx1OTg5OFx1ODFFQVx1OTAwMlx1NUU5NFx1RkYwOFx1NkQ0NVx1ODI3Mlx1NkRGMVx1NTMxNlx1NTIzMFx1NzY3RFx1NUU5NVx1NTNFRlx1OEJGQlx1RkYwOVx1MzAwMlxuICAgIHJldHVybiB7XG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgcGFkZGluZzogJzFweCA4cHgnLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnLFxuICAgICAgYmFja2dyb3VuZDogYHJnYmEoJHtyfSwgJHtnfSwgJHtifSwgMC4xNilgLFxuICAgICAgY29sb3I6IHRoZW1lQXdhcmVUZXh0KGNvbG9yKSxcbiAgICB9XG4gIH0sXG4gIHNlY3Rpb25UaXRsZTogeyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTJweCcsIG1hcmdpbkJvdHRvbTogJzhweCcgfSxcbiAgd2hhdDogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjcsIG1hcmdpbjogJzRweCAwIDhweCcgfSxcbiAgbG9naWNTdGVwOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuOCwgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnIH0sXG4gIHJpc2tJdGVtOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNywgbWFyZ2luOiAnMnB4IDAnIH0sXG4gIGNvbW1pdFJvdzogKGFjdGl2ZTogYm9vbGVhbik6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4gKHtcbiAgICBwYWRkaW5nOiAnOHB4IDEwcHgnLFxuICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgYm9yZGVyOiBhY3RpdmUgPyAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgOiAnMXB4IHNvbGlkIHRyYW5zcGFyZW50JyxcbiAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyAncmdiYSgzNyw5OSwyMzUsMC4wNiknIDogJ3RyYW5zcGFyZW50JyxcbiAgICBtYXJnaW5Cb3R0b206ICc0cHgnLFxuICB9KSxcbiAgY29tbWl0U3ViamVjdDogeyBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAsIGxpbmVIZWlnaHQ6IDEuNSwgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH0sXG4gIGNvbW1pdE1ldGE6IHsgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpblRvcDogJzJweCcsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JyB9LFxuICBwYXRjaDoge1xuICAgIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCBsaW5lSGVpZ2h0OiAxLjUsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzEwcHgnLCBtYXhIZWlnaHQ6ICczMjBweCcsIG92ZXJmbG93WTogJ2F1dG8nLFxuICB9LFxuICB0ZXh0YXJlYToge1xuICAgIHdpZHRoOiAnMTAwJScsIHBhZGRpbmc6ICc4cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxuICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCByZXNpemU6ICd2ZXJ0aWNhbCcsIGxpbmVIZWlnaHQ6IDEuNywgZm9udEZhbWlseTogJ2luaGVyaXQnLFxuICB9LFxuICBub3RlQ2FyZDoge1xuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJyxcbiAgICBib3JkZXJSYWRpdXM6ICc4cHgnLCBwYWRkaW5nOiAnMTJweCAxNHB4JywgbWFyZ2luQm90dG9tOiAnMTBweCcsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXG4gIH0sXG4gIG5vdGVUaXRsZVJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JywgZ2FwOiAnOHB4JyB9LFxuICBub3RlVGl0bGVUZXh0OiB7IGZvbnRTaXplOiAnMTNweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbGluZUhlaWdodDogMS41IH0sXG4gIG5vdGVDb250ZW50OiB7XG4gICAgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS44NSwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstd29yZCcsXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLCBtYXJnaW5Ub3A6ICc2cHgnLFxuICB9LFxuICBub3RlQ2xhbXA6IHtcbiAgICBkaXNwbGF5OiAnLXdlYmtpdC1ib3gnLCBXZWJraXRMaW5lQ2xhbXA6IDYsIFdlYmtpdEJveE9yaWVudDogJ3ZlcnRpY2FsJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICB9LFxuICBub3RlTWV0YToge1xuICAgIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc4cHgnLFxuICAgIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxuICB9LFxuICBsaW5rQnRuOiB7XG4gICAgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsIGZvbnRTaXplOiAnMTFweCcsIHBhZGRpbmc6ICcwJyxcbiAgICBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsXG4gIH0sXG4gIGNoaXA6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XG4gICAgcGFkZGluZzogJzJweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnOTk5cHgnLCBmb250U2l6ZTogJzExcHgnLCBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgIC8vIFx1NTQwQyB0YWJcdUZGMUFhY3RpdmUgXHU1ODZCXHU4MjcyXHU0RTAwXHU1RjhCIGJ1dHRvbi1pbmZvLWZpbGxcdUZGMDhcdTRFMjRcdTRFM0JcdTk4OThcdTkwRkRcdTg0RERcdUZGMDlcdUZGMENcdTc5ODFcdTc1MjggYnJhbmQtcHJpbWFyeVx1MzAwMlxuICAgIGJhY2tncm91bmQ6IGFjdGl2ZSA/ICd2YXIoLS1kc3ctYWxpYXMtYnV0dG9uLWluZm8tZmlsbCwgIzI1NjNlYiknIDogJ3RyYW5zcGFyZW50JyxcbiAgICBjb2xvcjogYWN0aXZlID8gJyNmZmYnIDogJ2luaGVyaXQnLFxuICB9KSxcbn1cblxuLyoqIFx1OThDRVx1OTY2OVx1N0I0OVx1N0VBNyBcdTIxOTIgXHU1RkJEXHU3QUUwXHU5ODlDXHU4MjcyXHUzMDAyICovXG5jb25zdCBSSVNLX0NPTE9SOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0geyBsb3c6ICcjNGVjOWIwJywgbWVkaXVtOiAnI2RjZGNhYScsIGhpZ2g6ICcjY2U5MTc4JywgY3JpdGljYWw6ICcjZjE0YzRjJyB9XG5cbi8qKlxuICogXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0IFNWRyBcdTZENDFcdTdBMEJcdTU2RkVcdUZGMUFcdTRFMDlcdTUyMTdcdTUyMDZcdTVDNDJcdUZGMDhcdTUzRDhcdTY2RjQgXHUyMTkyIFx1OTVGNFx1NjNBNVx1NUYxNVx1NzUyOFx1OTRGRSBcdTIxOTIgXHU2RjVDXHU1NzI4XHVGRjA5XHVGRjBDXG4gKiBcdTRGOURcdTYzNkUgL2ltcGFjdC1zY29wZSBcdThGRDRcdTU2REVcdTc2ODQgbGV2ZWxzXHVGRjA4XHU1NDJCXHU0RjIwXHU2NEFEXHU5NEZFIHJlYXNvblx1RkYwOVx1N0VEOFx1NTIzNlx1OEZERVx1N0VCRlx1MzAwMlxuICogXHU1MTY4XHU1QkJEXHU3NTNCXHU1RTAzXHVGRjA4dmlld0JveCAxMDAwXHVGRjA5XHVGRjBDXHU4MjgyXHU3MEI5XHU1RTI2XHU3NkVFXHU1RjU1XHU2M0QwXHU3OTNBXHVGRjBDXHU2REYxXHU1RUE2XHU4RDhBXHU2REYxXHU5ODlDXHU4MjcyXHU4RDhBXHU2RDQ1XHUzMDAyXG4gKi9cbmZ1bmN0aW9uIEltcGFjdEdyYXBoKHByb3BzOiB7IGRhdGE6IEltcGFjdFNjb3BlUGF5bG9hZDsgdDogKGtleTogc3RyaW5nKSA9PiBzdHJpbmcgfSkge1xuICBjb25zdCB7IGRhdGEgfSA9IHByb3BzXG4gIGNvbnN0IGluZGlyZWN0ID0gZGF0YS5sZXZlbHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmxldmVsID09PSAnaW5kaXJlY3QnKVxuICBjb25zdCBwb3RlbnRpYWwgPSBkYXRhLmxldmVscy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwgPT09ICdwb3RlbnRpYWwnKVxuICBjb25zdCBjb2wwID0gZGF0YS5jaGFuZ2VkRmlsZXMuc2xpY2UoMCwgNylcbiAgY29uc3QgY29sMSA9IEFycmF5LmZyb20obmV3IFNldChpbmRpcmVjdC5tYXAoKGl0ZW0pID0+IGl0ZW0ucGF0aCkpKS5zbGljZSgwLCA5KVxuICBjb25zdCBjb2wyID0gQXJyYXkuZnJvbShuZXcgU2V0KHBvdGVudGlhbC5tYXAoKGl0ZW0pID0+IGl0ZW0ucGF0aCkpKS5maWx0ZXIoKHApID0+ICFjb2wxLmluY2x1ZGVzKHApKS5zbGljZSgwLCA4KVxuICBjb25zdCBub2RlSCA9IDMwXG4gIGNvbnN0IGdhcCA9IDEwXG4gIGNvbnN0IGNvbFggPSBbMzAsIDM4MCwgNzIwXVxuICBjb25zdCBjb2xXID0gMjgwXG4gIGNvbnN0IHJvd3MgPSBNYXRoLm1heChjb2wwLmxlbmd0aCwgY29sMS5sZW5ndGgsIGNvbDIubGVuZ3RoLCAxKVxuICBjb25zdCBoZWlnaHQgPSByb3dzICogKG5vZGVIICsgZ2FwKSArIDYwXG5cbiAgY29uc3QgZGVwdGhPZiA9IChwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSBpbmRpcmVjdC5maW5kKChlbnRyeSkgPT4gZW50cnkucGF0aCA9PT0gcGF0aCkgPz8gcG90ZW50aWFsLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5wYXRoID09PSBwYXRoKVxuICAgIHJldHVybiBpdGVtPy5kZXB0aCA/PyAwXG4gIH1cblxuICBjb25zdCByZW5kZXJDb2wgPSAoY29sOiBudW1iZXIsIGl0ZW1zOiBzdHJpbmdbXSwgY29sb3I6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdID0+IGl0ZW1zLm1hcCgocGF0aCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCB5ID0gNDQgKyBpbmRleCAqIChub2RlSCArIGdhcClcbiAgICBjb25zdCBkaXIgPSBwYXRoLmluY2x1ZGVzKCcvJykgPyBwYXRoLnNsaWNlKDAsIHBhdGgubGFzdEluZGV4T2YoJy8nKSkgOiAnJ1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdnJywgeyBrZXk6IGAke2NvbH0tJHtwYXRofWAgfSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3JlY3QnLCB7IHg6IGNvbFhbY29sXSwgeSwgd2lkdGg6IGNvbFcsIGhlaWdodDogbm9kZUgsIHJ4OiA2LCBmaWxsOiBjb2xvciwgc3Ryb2tlOiAncmdiYSgwLDAsMCwwLjMpJywgc3Ryb2tlV2lkdGg6IDEgfSksXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyB4OiBjb2xYW2NvbF0gKyAxMCwgeTogeSArIDE0LCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgZmlsbDogJyNmZmZmZmYnIH0sXG4gICAgICAgIChwYXRoLnNwbGl0KCcvJykucG9wKCkgPz8gcGF0aCkuc2xpY2UoMCwgMzApKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3RleHQnLCB7IHg6IGNvbFhbY29sXSArIDEwLCB5OiB5ICsgMjYsIGZvbnRTaXplOiAxMCwgZmlsbDogJ3JnYmEoMjU1LDI1NSwyNTUsMC45MiknIH0sXG4gICAgICAgIGRpci5zbGljZSgwLCA0MCkpLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGl0bGUnLCBudWxsLCBwYXRoKSxcbiAgICApXG4gIH0pXG5cbiAgY29uc3QgY2hhaW5TdGFydCA9IChyZWFzb246IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgbWF0Y2ggPSByZWFzb24ubWF0Y2goL3BhdGg6ICguKykkLylcbiAgICBpZiAobWF0Y2ggPT09IG51bGwpIHJldHVybiBkYXRhLmNoYW5nZWRGaWxlc1swXSA/PyAnJ1xuICAgIHJldHVybiBtYXRjaFsxXSEuc3BsaXQoJyAtPiAnKVswXSA/PyBkYXRhLmNoYW5nZWRGaWxlc1swXSA/PyAnJ1xuICB9XG4gIGNvbnN0IGluZGV4SW4gPSAoaXRlbXM6IHN0cmluZ1tdLCBwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4gaXRlbXMuaW5kZXhPZihwYXRoKVxuICBjb25zdCBjb2xPZiA9IChwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGlmIChjb2wwLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMFxuICAgIGlmIChjb2wxLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMVxuICAgIGlmIChjb2wyLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMlxuICAgIHJldHVybiAtMVxuICB9XG5cbiAgY29uc3QgZWRnZXM6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cbiAgY29uc3QgcHVzaEVkZ2UgPSAoZnJvbVBhdGg6IHN0cmluZywgdG9QYXRoOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcsIGtleTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZnJvbUNvbCA9IGNvbE9mKGZyb21QYXRoKVxuICAgIGNvbnN0IHRvQ29sID0gY29sT2YodG9QYXRoKVxuICAgIGlmIChmcm9tQ29sID09PSAtMSB8fCB0b0NvbCA9PT0gLTEgfHwgdG9Db2wgPD0gZnJvbUNvbCkgcmV0dXJuXG4gICAgY29uc3QgeDEgPSBjb2xYW2Zyb21Db2xdICsgY29sV1xuICAgIGNvbnN0IHkxID0gNDQgKyBpbmRleEluKFtjb2wwLCBjb2wxLCBjb2wyXVtmcm9tQ29sXSA/PyBbXSwgZnJvbVBhdGgpICogKG5vZGVIICsgZ2FwKSArIG5vZGVIIC8gMlxuICAgIGNvbnN0IHgyID0gY29sWFt0b0NvbF1cbiAgICBjb25zdCB5MiA9IDQ0ICsgaW5kZXhJbihbY29sMCwgY29sMSwgY29sMl1bdG9Db2xdID8/IFtdLCB0b1BhdGgpICogKG5vZGVIICsgZ2FwKSArIG5vZGVIIC8gMlxuICAgIGVkZ2VzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudCgncGF0aCcsIHtcbiAgICAgIGtleSwgZDogYE0gJHt4MX0gJHt5MX0gQyAke3gxICsgMzB9ICR7eTF9LCAke3gyIC0gMzB9ICR7eTJ9LCAke3gyfSAke3kyfWAsXG4gICAgICBmaWxsOiAnbm9uZScsIHN0cm9rZTogY29sb3IsIHN0cm9rZVdpZHRoOiAxLjYsIG9wYWNpdHk6IDAuNixcbiAgICB9KSlcbiAgfVxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaW5kaXJlY3Quc2xpY2UoMCwgMjApKSBwdXNoRWRnZShjaGFpblN0YXJ0KGl0ZW0ucmVhc29uKSwgaXRlbS5wYXRoLCB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpLCBgZWktJHtpdGVtLnBhdGh9YClcbiAgZm9yIChjb25zdCBpdGVtIG9mIHBvdGVudGlhbC5zbGljZSgwLCAxNikpIHB1c2hFZGdlKGNoYWluU3RhcnQoaXRlbS5yZWFzb24pLCBpdGVtLnBhdGgsIHRoZW1lQXdhcmVUZXh0KCcjNTc2MDZhJyksIGBlcC0ke2l0ZW0ucGF0aH1gKVxuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3N2ZycsIHsgd2lkdGg6ICcxMDAlJywgdmlld0JveDogYDAgMCAxMDI0ICR7aGVpZ2h0fWAsIHN0eWxlOiB7IG1heEhlaWdodDogNDgwIH0gfSxcbiAgICAgIFtbJ1x1NTNEOFx1NjZGNFx1NjU4N1x1NEVGNicsIDBdLCBbJ1x1OTVGNFx1NjNBNVx1NUY3MVx1NTRDRFx1RkYwOFx1OEMwMVx1NUYxNVx1NzUyOFx1NEU4Nlx1NUI4M1x1RkYwOScsIDFdLCBbJ1x1NkY1Q1x1NTcyOFx1NUY3MVx1NTRDRFx1RkYwOFx1NEU4Q1x1N0VBN1x1NEYyMFx1NjRBRFx1RkYwOScsIDJdXS5tYXAoKFtuYW1lLCBjb2xdKSA9PlxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyBrZXk6IFN0cmluZyhjb2wpLCB4OiBjb2xYW2NvbCBhcyBudW1iZXJdLCB5OiAyNCwgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA3MDAsIGZpbGw6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknIH0sIG5hbWUgYXMgc3RyaW5nKSksXG4gICAgICByZW5kZXJDb2woMCwgY29sMCwgJyMyNTYzZWInKSxcbiAgICAgIHJlbmRlckNvbCgxLCBjb2wxLCAnI2Q5NzcwNicpLFxuICAgICAgcmVuZGVyQ29sKDIsIGNvbDIsICcjNTc2MDZhJyksXG4gICAgICBlZGdlcyxcbiAgICApLFxuICApXG59XG5cbmNvbnN0IERJRkZfS0VZV09SRFMgPSAvXFxiKHB1YmxpY3xwcml2YXRlfHByb3RlY3RlZHxpbnRlcm5hbHxzdGF0aWN8dm9pZHxjbGFzc3xzdHJ1Y3R8aW50ZXJmYWNlfGVudW18bmV3fHJldHVybnxpZnxlbHNlfGZvcnxmb3JlYWNofHdoaWxlfHN3aXRjaHxjYXNlfGJyZWFrfGNvbnRpbnVlfHRyeXxjYXRjaHxmaW5hbGx5fHRocm93fHVzaW5nfG5hbWVzcGFjZXxpbXBvcnR8ZXhwb3J0fGZyb218Y29uc3R8bGV0fHZhcnxhc3luY3xhd2FpdHxmdW5jdGlvbnx0aGlzfGJhc2V8c3VwZXJ8bnVsbHx0cnVlfGZhbHNlfG92ZXJyaWRlfHZpcnR1YWx8YWJzdHJhY3R8c2VhbGVkfHJlYWRvbmx5fHBhcmFtc3xvdXR8cmVmfHlpZWxkfHR5cGVvZnxpbnN0YW5jZW9mfGlufG9mfGRlZmF1bHR8c3RyaW5nfGludHxsb25nfGRvdWJsZXxmbG9hdHxib29sfGNoYXJ8ZGVjaW1hbHxvYmplY3R8cmVjb3JkfHBhcnRpYWx8Z2V0fHNldHxyZXF1aXJlfG1vZHVsZXx0eXBlfGltcGxlbWVudHN8ZXh0ZW5kcylcXGIvZ1xuXG4vKiogXHU1MzU1XHU4ODRDXHU0RUUzXHU3ODAxXHU5QUQ4XHU0RUFFXHVGRjFBXHU2Q0U4XHU5MUNBID4gXHU1QjU3XHU3QjI2XHU0RTMyID4gXHU1MTczXHU5NTJFXHU1QjU3L1x1NjU3MFx1NUI1NyBcdTRFMDlcdTVDNDJcdTc3NDBcdTgyNzJcdUZGMDhcdThGN0JcdTkxQ0ZcdTZCNjNcdTUyMTlcdUZGMENcdTU5MUZcdTY4MzhcdTY3RTVcdTc1MjhcdUZGMDlcdTMwMDIgKi9cbmZ1bmN0aW9uIGhpZ2hsaWdodENvZGVMaW5lKGxpbmU6IHN0cmluZywga2V5UHJlZml4OiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSB7XG4gIGNvbnN0IHRyaW1tZWQgPSBsaW5lLnRyaW1TdGFydCgpXG4gIGlmICh0cmltbWVkLnN0YXJ0c1dpdGgoJy8vJykgfHwgdHJpbW1lZC5zdGFydHNXaXRoKCcvLy8nKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJyonKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJy8qJykgfHwgdHJpbW1lZC5zdGFydHNXaXRoKCcjJykpIHtcbiAgICByZXR1cm4gW1JlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1jYCwgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjNmE5OTU1JykgfSB9LCBsaW5lKV1cbiAgfVxuICBjb25zdCBwYXJ0cyA9IGxpbmUuc3BsaXQoLyhcIig/OlteXCJcXFxcXXxcXFxcLikqXCJ8Jyg/OlteJ1xcXFxdfFxcXFwuKSonfGAoPzpbXmBcXFxcXXxcXFxcLikqYCkvZylcbiAgcmV0dXJuIHBhcnRzLm1hcCgocGFydCwgaSkgPT4ge1xuICAgIGlmIChpICUgMiA9PT0gMSkgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1zJHtpfWAsIHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2NlOTE3OCcpIH0gfSwgcGFydClcbiAgICBjb25zdCBzdWI6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cbiAgICBsZXQgbGFzdCA9IDBcbiAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIHBhcnQubWF0Y2hBbGwoRElGRl9LRVlXT1JEUykpIHtcbiAgICAgIGlmIChtYXRjaC5pbmRleCEgPiBsYXN0KSBzdWIucHVzaChwYXJ0LnNsaWNlKGxhc3QsIG1hdGNoLmluZGV4KSlcbiAgICAgIHN1Yi5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1rJHtpfS0ke21hdGNoLmluZGV4fWAsIHN0eWxlOiB7IGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzU2OWNkNicpIH0gfSwgbWF0Y2hbMF0pKVxuICAgICAgbGFzdCA9IG1hdGNoLmluZGV4ISArIG1hdGNoWzBdLmxlbmd0aFxuICAgIH1cbiAgICBpZiAobGFzdCA8IHBhcnQubGVuZ3RoKSBzdWIucHVzaChwYXJ0LnNsaWNlKGxhc3QpKVxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCB7IGtleTogYCR7a2V5UHJlZml4fS1wJHtpfWAgfSwgc3ViKVxuICB9KVxufVxuXG4vKiogXHU5QUQ4XHU0RUFFXHU1REVFXHU1RjAyXHU4OUM2XHU1NkZFXHVGRjFBXHU4OUUzXHU2NzkwIHVuaWZpZWQgZGlmZlx1RkYwQ1x1NjMwOSBcdTU4OUUvXHU1MjIwL1x1NTc1N1x1NTkzNC9cdTRFMEFcdTRFMEJcdTY1ODcgXHU3NzQwXHU4MjcyXHUzMDAyICovXG5mdW5jdGlvbiBEaWZmVmlldyhwcm9wczogeyBwYXRjaDogc3RyaW5nIH0pIHtcbiAgY29uc3QgbGluZXMgPSBwcm9wcy5wYXRjaC5zcGxpdCgnXFxuJykuZmlsdGVyKChsaW5lLCBpKSA9PiAhKGxpbmUgPT09ICcnICYmIGkgPT09IHByb3BzLnBhdGNoLnNwbGl0KCdcXG4nKS5sZW5ndGggLSAxKSlcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICBzdHlsZToge1xuICAgICAgZm9udEZhbWlseTogJ0NvbnNvbGFzLCBtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCBsaW5lSGVpZ2h0OiAxLjU1LFxuICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDAnLCBtYXhIZWlnaHQ6IDQyMCwgb3ZlcmZsb3dZOiAnYXV0bycsIG1hcmdpblRvcDogJzZweCcsXG4gICAgfSxcbiAgfSwgbGluZXMubWFwKChsaW5lLCBpKSA9PiB7XG4gICAgY29uc3Qga2luZCA9IGxpbmUuc3RhcnRzV2l0aCgnKysrJykgfHwgbGluZS5zdGFydHNXaXRoKCctLS0nKSA/ICdtZXRhJ1xuICAgICAgOiBsaW5lLnN0YXJ0c1dpdGgoJ0BAJykgPyAnaHVuaydcbiAgICAgICAgOiBsaW5lLnN0YXJ0c1dpdGgoJysnKSA/ICdhZGQnXG4gICAgICAgICAgOiBsaW5lLnN0YXJ0c1dpdGgoJy0nKSA/ICdkZWwnIDogJ2N0eCdcbiAgICBjb25zdCBiZyA9IGtpbmQgPT09ICdhZGQnID8gJ3JnYmEoNDYsMTYwLDY3LDAuMTQpJyA6IGtpbmQgPT09ICdkZWwnID8gJ3JnYmEoMjQ4LDgxLDczLDAuMTMpJyA6IGtpbmQgPT09ICdodW5rJyA/ICdyZ2JhKDU2LDEzOSwyNTMsMC4xKScgOiAndHJhbnNwYXJlbnQnXG4gICAgY29uc3QgY29udGVudCA9IGtpbmQgPT09ICdtZXRhJyB8fCBraW5kID09PSAnaHVuaydcbiAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjMDk2OWRhJyksIGZvbnRXZWlnaHQ6IDYwMCB9IH0sIGxpbmUpXG4gICAgICA6IGtpbmQgPT09ICdhZGQnIHx8IGtpbmQgPT09ICdkZWwnXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IHRoZW1lQXdhcmVUZXh0KGtpbmQgPT09ICdhZGQnID8gJyMxYTdmMzcnIDogJyNjZjIyMmUnKSwgZm9udFdlaWdodDogNjAwIH0gfSwgbGluZVswXSlcbiAgICAgICAgOiBudWxsXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsga2V5OiBpLCBzdHlsZTogeyBwYWRkaW5nOiAnMCAxMHB4JywgYmFja2dyb3VuZDogYmcsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfSB9LFxuICAgICAgY29udGVudCxcbiAgICAgIGtpbmQgPT09ICdhZGQnIHx8IGtpbmQgPT09ICdkZWwnID8gaGlnaGxpZ2h0Q29kZUxpbmUobGluZS5zbGljZSgxKSwgYGwke2l9YCkgOiBoaWdobGlnaHRDb2RlTGluZShsaW5lLCBgbCR7aX1gKSxcbiAgICApXG4gIH0pKVxufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiAnXHUyMDE0J1xuICByZXR1cm4gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlU3RyaW5nKClcbn1cblxuLyoqIFx1NEU4Q1x1NkIyMVx1Nzg2RVx1OEJBNFx1NUYzOVx1N0E5N1x1RkYxQVx1OTA2RVx1N0Y2OSArIFx1NUM0NVx1NEUyRFx1NTM2MVx1NzI0N1x1RkYwQ1x1NTM3MVx1OTY2OVx1NjRDRFx1NEY1Q1x1RkYwOFx1NTIyMFx1OTY2NFx1N0IxNFx1OEJCMC9cdTUzRDhcdTY2RjQvXHU3RUE2XHU2NzVGXHVGRjA5XHU1MTcxXHU3NTI4XHUzMDAyICovXG5mdW5jdGlvbiBDb25maXJtRGlhbG9nKHByb3BzOiB7IHRpdGxlOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZzsgZGFuZ2VyPzogYm9vbGVhbjsgb25DYW5jZWw6ICgpID0+IHZvaWQ7IG9uQ29uZmlybTogKCkgPT4gdm9pZCB9KSB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLW92ZXJsYXknLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCB6SW5kZXg6IDk5OSxcbiAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMTUsMjMsNDIsMC40NSknLCBiYWNrZHJvcEZpbHRlcjogJ2JsdXIoMnB4KScsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgYW5pbWF0aW9uOiAncGNGYWRlSW4gMC4xNXMgZWFzZS1vdXQnLFxuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ2FuY2VsLFxuICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLWNhcmQnLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHdpZHRoOiA0MDAsIG1heFdpZHRoOiAnY2FsYygxMDB2dyAtIDQ4cHgpJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JywgYm94U2hhZG93OiAnMCAyMHB4IDUwcHggcmdiYSgwLDAsMCwwLjI1KScsXG4gICAgICAgICAgcGFkZGluZzogJzIwcHggMjJweCAxNnB4JyxcbiAgICAgICAgICBvbkNsaWNrOiAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCBnYXA6ICcxMHB4JyB9IH0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgd2lkdGg6IDM0LCBoZWlnaHQ6IDM0LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBmbGV4U2hyaW5rOiAwLFxuICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnMTdweCcsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHByb3BzLmRhbmdlciA/ICdyZ2JhKDI0NCw2Myw5NCwwLjEyKScgOiAncmdiYSgzNyw5OSwyMzUsMC4xKScsXG4gICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5kYW5nZXIgPyB0aGVtZUF3YXJlVGV4dCgnI2UxMWQ0OCcpIDogdGhlbWVBd2FyZVRleHQoJyMyNTYzZWInKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSwgcHJvcHMuZGFuZ2VyID8gJyEnIDogJz8nKSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzZweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9IH0sIHByb3BzLnRpdGxlKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS43LCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9IH0sIHByb3BzLm1lc3NhZ2UpLFxuICAgICAgICAgICksXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJywgZ2FwOiAnMTBweCcsIG1hcmdpblRvcDogJzE4cHgnIH0gfSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XG4gICAgICAgICAgICBzdHlsZTogeyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnN3B4IDE4cHgnLCBib3JkZXJSYWRpdXM6ICc4cHgnIH0sXG4gICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5vbkNhbmNlbCxcbiAgICAgICAgICB9LCAnXHU1M0Q2XHU2RDg4JyksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xuICAgICAgICAgICAgJ2RhdGEtdGVzdGlkJzogJ3BjLWNvbmZpcm0tb2snLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgcGFkZGluZzogJzdweCAxOHB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA1MDAsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHByb3BzLmRhbmdlciA/ICcjZTExZDQ4JyA6ICd2YXIoLS1kc3ctYWxpYXMtYnV0dG9uLWluZm8tZmlsbCwgIzI1NjNlYiknLCBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ29uZmlybSxcbiAgICAgICAgICB9LCAnXHU3ODZFXHU4QkE0XHU1MjIwXHU5NjY0JyksXG4gICAgICAgICksXG4gICAgICApLFxuICAgICksXG4gIClcbn1cblxuLyoqIFx1OUFBOFx1NjdCNlx1NUMwRlx1NTM2MVx1NzI0N1x1MzAwMiAqL1xuZnVuY3Rpb24gQ2FyZChwcm9wczogeyB0aXRsZT86IFJlYWN0LlJlYWN0Tm9kZTsgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLmNhcmQgfSxcbiAgICBwcm9wcy50aXRsZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5zZWN0aW9uVGl0bGUgfSwgcHJvcHMudGl0bGUpLFxuICAgIHByb3BzLmNoaWxkcmVuKVxufVxuXG4vKipcbiAqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NEUzQlx1N0VDNFx1NEVGNlx1RkYxQVx1NTZEQlx1OTg3NVx1N0I3RVx1RkYwOFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1NEUzQVx1OUVEOFx1OEJBNFx1RkYwOSsgXHU4RjZFXHU4QkUyXHU1QkJGXHU0RTNCIEFQSSArIFx1NjMwOVx1OTRBRVx1NTMxNlx1NjRDRFx1NEY1Q1x1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gV29ya3NwYWNlRnJhbWUocHJvcHM6IFdvcmtzcGFjZUZyYW1lUHJvcHMpIHtcbiAgY29uc3QgdCA9IHByb3BzLnQgPz8gZmFsbGJhY2tUXG4gIGNvbnN0IFt0YWIsIHNldFRhYl0gPSB1c2VTdGF0ZTxUYWJLZXk+KCdjb21taXRzJylcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZTxXb3Jrc3BhY2VTdGF0ZSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtsb2FkRXJyb3IsIHNldExvYWRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbYm9vdHN0cmFwcGluZywgc2V0Qm9vdHN0cmFwcGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2FjdGlvblJlc3VsdCwgc2V0QWN0aW9uUmVzdWx0XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtjaGFuZ2VUaXRsZSwgc2V0Q2hhbmdlVGl0bGVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtjaGFuZ2VEZXNjLCBzZXRDaGFuZ2VEZXNjXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbWVtb3J5VGl0bGUsIHNldE1lbW9yeVRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbWVtb3J5Q29udGVudCwgc2V0TWVtb3J5Q29udGVudF0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2NvbmZpcm1lZFRleHQsIHNldENvbmZpcm1lZFRleHRdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtjb25maXJtZWRQYXRocywgc2V0Q29uZmlybWVkUGF0aHNdID0gdXNlU3RhdGUoJycpXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1NzJCNlx1NjAwMSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgW2NvbW1pdHNEYXRhLCBzZXRDb21taXRzRGF0YV0gPSB1c2VTdGF0ZTxDb21taXRzUGF5bG9hZCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtjb21taXRzRXJyb3IsIHNldENvbW1pdHNFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbcGlja2VyT3Blbiwgc2V0UGlja2VyT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW3BpY2tlckZpbHRlciwgc2V0UGlja2VyRmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbc2VsZWN0ZWRUYXJnZXRzLCBzZXRTZWxlY3RlZFRhcmdldHNdID0gdXNlU3RhdGU8c3RyaW5nW10+KFtdKVxuICBjb25zdCBbZGV0YWlscywgc2V0RGV0YWlsc10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBDb21taXREZXRhaWxQYXlsb2FkPj4oe30pXG4gIGNvbnN0IFtkZXRhaWxMb2FkaW5nLCBzZXREZXRhaWxMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbaW1wYWN0LCBzZXRJbXBhY3RdID0gdXNlU3RhdGU8SW1wYWN0U2NvcGVQYXlsb2FkIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2ltcGFjdExvYWRpbmcsIHNldEltcGFjdExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtyZXZpZXdzLCBzZXRSZXZpZXdzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIFJldmlld1BheWxvYWQ+Pih7fSlcbiAgY29uc3QgW3Jldmlld0xvYWRpbmcsIHNldFJldmlld0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtmaWxlRGlmZnMsIHNldEZpbGVEaWZmc10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+Pih7fSlcbiAgY29uc3QgW2NvbmZpcm1EaWFsb2csIHNldENvbmZpcm1EaWFsb2ddID0gdXNlU3RhdGU8eyB0aXRsZTogc3RyaW5nOyBtZXNzYWdlOiBzdHJpbmc7IGRhbmdlcj86IGJvb2xlYW47IG9uQ29uZmlybTogKCkgPT4gdm9pZCB9IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW25vdGVzLCBzZXROb3Rlc10gPSB1c2VTdGF0ZTxOb3RlRW50cnlbXT4oW10pXG4gIGNvbnN0IFtub3RlVGl0bGUsIHNldE5vdGVUaXRsZV0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW25vdGVDb250ZW50LCBzZXROb3RlQ29udGVudF0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW25vdGVUYWdzLCBzZXROb3RlVGFnc10gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2VkaXRpbmdOb3RlLCBzZXRFZGl0aW5nTm90ZV0gPSB1c2VTdGF0ZTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZzsgdGFnczogc3RyaW5nIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBbbm90ZVNlYXJjaCwgc2V0Tm90ZVNlYXJjaF0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW25vdGVFeHBhbmRlZCwgc2V0Tm90ZUV4cGFuZGVkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+Pih7fSlcbiAgY29uc3QgW2lzc3Vlc0RhdGEsIHNldElzc3Vlc0RhdGFdID0gdXNlU3RhdGU8SXNzdWVFbnRyeVtdIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2lzc3VlU2V2ZXJpdHlGaWx0ZXIsIHNldElzc3VlU2V2ZXJpdHlGaWx0ZXJdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtpc3N1ZVN0YXR1c0ZpbHRlciwgc2V0SXNzdWVTdGF0dXNGaWx0ZXJdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtpc3N1ZUV4cGFuZGVkLCBzZXRJc3N1ZUV4cGFuZGVkXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+Pih7fSlcbiAgY29uc3QgW2ZpeEV4cGFuZGVkLCBzZXRGaXhFeHBhbmRlZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oe30pXG4gIGNvbnN0IFt2ZXJpZnlpbmdUYXJnZXQsIHNldFZlcmlmeWluZ1RhcmdldF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbYWlTdW1tYXJpemluZywgc2V0QWlTdW1tYXJpemluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW25hcnJhdGl2ZSwgc2V0TmFycmF0aXZlXSA9IHVzZVN0YXRlPHsgbmFycmF0aXZlOiBzdHJpbmc7IGNhY2hlZDogYm9vbGVhbjsgZ2VuZXJhdGVkQXQ/OiBudW1iZXI7IGNvc3RVc2Q/OiBudW1iZXIgfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtuYXJyYXRpdmVCdXN5LCBzZXROYXJyYXRpdmVCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbcGVlaywgc2V0UGVla10gPSB1c2VTdGF0ZTx7IHBhdGg6IHN0cmluZzsgbGluZTogbnVtYmVyIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBbcGVla0RhdGEsIHNldFBlZWtEYXRhXSA9IHVzZVN0YXRlPFBlZWtQYXlsb2FkIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3BlZWtCdXN5LCBzZXRQZWVrQnVzeV0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW25hcnJhdGl2ZUVycm9yLCBzZXROYXJyYXRpdmVFcnJvcl0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW21vZGVsVGllcnMsIHNldE1vZGVsVGllcnNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgeyBwcm92aWRlcjogc3RyaW5nOyBtb2RlbDogc3RyaW5nIH0+IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW21vZGVsT3B0aW9ucywgc2V0TW9kZWxPcHRpb25zXSA9IHVzZVN0YXRlPEFycmF5PHsgcHJvdmlkZXI6IHN0cmluZzsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nIH0+PihbXSlcbiAgY29uc3QgW21vZGVsU2F2aW5nLCBzZXRNb2RlbFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW21vZGVsU2F2ZWQsIHNldE1vZGVsU2F2ZWRdID0gdXNlU3RhdGUoZmFsc2UpXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdUZGMUFcdThCQTFcdTUyMTJcdTc4NkVcdThCQTQgLyBSdW4gXHU4QkU2XHU2MEM1IC8gXHU0RjhCXHU4ODRDXHU0RUZCXHU1MkExIFx1MjUwMFx1MjUwMFxuICBjb25zdCBbcGxhbkNvbmZpcm0sIHNldFBsYW5Db25maXJtXSA9IHVzZVN0YXRlPHsgY2hhbmdlSWQ6IHN0cmluZzsgc3RlcHM6IFBsYW5Db25maXJtU3RlcFtdIH0gfCBudWxsPihudWxsKVxuICBjb25zdCBbcGxhbkJ1c3ksIHNldFBsYW5CdXN5XSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbcnVuRGV0YWlsLCBzZXRSdW5EZXRhaWxdID0gdXNlU3RhdGU8UnVuRGV0YWlsIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3NjaGVkdWxlZERhdGEsIHNldFNjaGVkdWxlZERhdGFdID0gdXNlU3RhdGU8U2NoZWR1bGVkVGFza0VudHJ5W10gfCBudWxsPihudWxsKVxuICBjb25zdCBbc2NoZWROYW1lLCBzZXRTY2hlZE5hbWVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtzY2hlZE9wZW4sIHNldFNjaGVkT3Blbl0gPSB1c2VTdGF0ZSh0cnVlKVxuICBjb25zdCBbc2NoZWRUeXBlLCBzZXRTY2hlZFR5cGVdID0gdXNlU3RhdGUoJ3JldmlldycpXG4gIGNvbnN0IFtzY2hlZFRpdGxlLCBzZXRTY2hlZFRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbc2NoZWREZXNjLCBzZXRTY2hlZERlc2NdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtzY2hlZEludGVydmFsLCBzZXRTY2hlZEludGVydmFsXSA9IHVzZVN0YXRlKCcxNDQwJylcbiAgLy8gXHUyNTAwXHUyNTAwIFx1OEJCMFx1NUZDNlx1OTc2Mlx1Njc3Rlx1RkYxQVx1NTE2OFx1OTFDRlx1NjU3MFx1NjM2RSAvIFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgW21lbW9yaWVzRGF0YSwgc2V0TWVtb3JpZXNEYXRhXSA9IHVzZVN0YXRlPE1lbW9yaWVzUGF5bG9hZCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtzeW5jUmVwb3J0LCBzZXRTeW5jUmVwb3J0XSA9IHVzZVN0YXRlPFN5bmNSZXBvcnQgfCBudWxsPihudWxsKVxuICBjb25zdCBbbWVtb3J5U2NvcGUsIHNldE1lbW9yeVNjb3BlXSA9IHVzZVN0YXRlPCdwcm9qZWN0JyB8ICdicmFuY2gnPigncHJvamVjdCcpXG4gIGNvbnN0IFttZW1vcnlUeXBlLCBzZXRNZW1vcnlUeXBlXSA9IHVzZVN0YXRlKCdhcmNoaXRlY3R1cmVfZGVjaXNpb24nKVxuICBjb25zdCBbbWVtb3J5U3luY2luZywgc2V0TWVtb3J5U3luY2luZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2V4ZWNUaXRsZSwgc2V0RXhlY1RpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbZXhlY01vZGVsLCBzZXRFeGVjTW9kZWxdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtleGVjRGVzYywgc2V0RXhlY0Rlc2NdID0gdXNlU3RhdGUoJycpXG5cbiAgY29uc3QgcG9zdCA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTx7IG9rOiBib29sZWFuOyBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB9PiA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChwYXRoLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyAuLi5ib2R5LCBzZXNzaW9uSWQ6IHByb3BzLnNlc3Npb25JZCB9KSxcbiAgICB9KVxuICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICByZXR1cm4geyBvazogcmVzcG9uc2Uub2ssIGRhdGE6IChkYXRhID8/IHt9KSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB9XG4gIH1cblxuICAvKiogcGVla1x1RkYxQVx1NjI1M1x1NUYwMFx1NjdEMFx1NjU4N1x1NEVGNlx1NjdEMFx1ODg0Q1x1OTY0NFx1OEZEMVx1NzY4NFx1NEVFM1x1NzgwMVx1NEUwQVx1NEUwQlx1NjU4N1x1NkQ2RVx1NUM0Mlx1RkYwOFx1NjcwOVx1NzU0Q1x1N0I0OVx1NUY4NSAxMCBcdTc5RDJcdUZGMDlcdTMwMDIgKi9cbiAgcGVla09wZW5lciA9IChwYXRoOiBzdHJpbmcsIGxpbmU6IG51bWJlcik6IHZvaWQgPT4geyB2b2lkIG9wZW5QZWVrKHBhdGgsIGxpbmUpIH1cbiAgY29uc3Qgb3BlblBlZWsgPSBhc3luYyAocGF0aDogc3RyaW5nLCBsaW5lOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRQZWVrKHsgcGF0aCwgbGluZSB9KVxuICAgIHNldFBlZWtEYXRhKG51bGwpXG4gICAgc2V0UGVla0J1c3kodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKVxuICAgICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgMTBfMDAwKVxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvcGVlaycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHBhdGgsIGxpbmUsIHNlc3Npb25JZDogcHJvcHMuc2Vzc2lvbklkIH0pLFxuICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgfSlcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0UGVla0RhdGEoZGF0YSBhcyBQZWVrUGF5bG9hZClcbiAgICB9IGNhdGNoIHtcbiAgICAgIHNldFBlZWtEYXRhKHsgZXhpc3RzOiBmYWxzZSB9KVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRQZWVrQnVzeShmYWxzZSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU1REU1XHU0RjVDXHU4RjZFXHU2QjIxXHU1M0Q5XHU0RThCXHVGRjFBXHU1OTFBXHU0RTJBXHU5MDA5XHU0RTJEXHU2M0QwXHU0RUE0XHU0RjVDXHU0RTNBXHU0RTAwXHU0RTJBXHU2NTc0XHU0RjUzXHU4OUUzXHU4QkZCXHVGRjA4XHU3RjEzXHU1QjU4ICsgXHU1M0VGXHU1RjNBXHU1MjM2XHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGxvYWROYXJyYXRpdmUgPSBhc3luYyAoZm9yY2UgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHNoYXMgPSBzZWxlY3RlZFRhcmdldHMuZmlsdGVyKCh0YXJnZXQpID0+IHRhcmdldCAhPT0gJ3dvcmtpbmcnKVxuICAgIGlmIChzaGFzLmxlbmd0aCA8IDIpIHJldHVyblxuICAgIHNldE5hcnJhdGl2ZUJ1c3kodHJ1ZSlcbiAgICBzZXROYXJyYXRpdmVFcnJvcignJylcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvd29yay1uYXJyYXRpdmUnLCB7IHNoYXMsIGZvcmNlIH0pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldE5hcnJhdGl2ZUVycm9yKFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldE5hcnJhdGl2ZSh7XG4gICAgICAgIG5hcnJhdGl2ZTogU3RyaW5nKGRhdGFbJ25hcnJhdGl2ZSddID8/ICcnKSxcbiAgICAgICAgY2FjaGVkOiBkYXRhWydjYWNoZWQnXSA9PT0gdHJ1ZSxcbiAgICAgICAgZ2VuZXJhdGVkQXQ6IGRhdGFbJ2dlbmVyYXRlZEF0J10gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IE51bWJlcihkYXRhWydnZW5lcmF0ZWRBdCddKSxcbiAgICAgICAgY29zdFVzZDogZGF0YVsnY29zdFVzZCddID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBOdW1iZXIoZGF0YVsnY29zdFVzZCddKSxcbiAgICAgIH0pXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldE5hcnJhdGl2ZUVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TmFycmF0aXZlQnVzeShmYWxzZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkQ29tbWl0cyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL3Byb2plY3QtY29udHJvbC9hcGkvY29tbWl0cz9zZXNzaW9uSWQ9JHtlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKX0mbGltaXQ9NjBgKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKChkYXRhIGFzIHsgZXJyb3I/OiBzdHJpbmcgfSkuZXJyb3IgPz8gYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YClcbiAgICAgIHNldENvbW1pdHNEYXRhKGRhdGEgYXMgQ29tbWl0c1BheWxvYWQpXG4gICAgICBzZXRDb21taXRzRXJyb3IobnVsbClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0Q29tbWl0c0Vycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkTm90ZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldE5vdGVzKChkYXRhIGFzIHsgbm90ZXM6IE5vdGVFbnRyeVtdIH0pLm5vdGVzID8/IFtdKVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gXHU3QjE0XHU4QkIwXHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXHVGRjFBXHU1MjE3XHU4ODY4XHU0RkREXHU2MzAxXHU1MzlGXHU2ODM3XHUzMDAyXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NTJGRVx1OTAwOS9cdTUzRDZcdTZEODhcdTRFMDBcdTZCMjFcdTYzRDBcdTRFQTRcdUZGMUFcdTkxQ0RcdTdCOTdcdTkwMDlcdTRFMkRcdTk2QzZcdTU0MDhcdUZGMENcdTVFNzZcdTYzMDlcdTk3MDBcdTg4NjVcdTlGNTBcdTZCQ0ZcdTY3NjFcdTYzRDBcdTRFQTRcdTc2ODQgQUkgXHU4OUUzXHU4QkZCXHVGRjA4XHU2NzBEXHU1MkExXHU3QUVGXHU2NzA5XHU3RjEzXHU1QjU4XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHRvZ2dsZVRhcmdldCA9IGFzeW5jICh0YXJnZXQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldFNlbGVjdGVkVGFyZ2V0cygocHJldmlvdXMpID0+IHtcbiAgICAgIGlmIChwcmV2aW91cy5pbmNsdWRlcyh0YXJnZXQpKSByZXR1cm4gcHJldmlvdXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSB0YXJnZXQpXG4gICAgICByZXR1cm4gWy4uLnByZXZpb3VzLCB0YXJnZXRdXG4gICAgfSlcbiAgICBzZXRJbXBhY3QobnVsbClcbiAgICBzZXRSZXZpZXdzKHt9KVxuICAgIGlmICghc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHRhcmdldCkpIHtcbiAgICAgIGF3YWl0IGxvYWREZXRhaWwodGFyZ2V0LCBmYWxzZSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU2NTc0XHU4RjZFXHU5MDA5XHU2MkU5XHVGRjFBXHU2NTc0XHU4RjZFXHU1REYyXHU5MDA5XHU2NUY2XHU1MThEXHU3MEI5ID0gXHU1M0Q2XHU2RDg4XHU2NTc0XHU4RjZFXHVGRjFCXHU2NUIwXHU1MkZFXHU5MDA5XHU3Njg0XHU2M0QwXHU0RUE0XHU1NDA0XHU4MUVBXHU2MkM5XHU1M0Q2IEFJIFx1ODlFM1x1OEJGQlx1MzAwMiAqL1xuICBjb25zdCBzZWxlY3RSb3VuZCA9IChzaGFzOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICAgIHNldEltcGFjdChudWxsKVxuICAgIHNldFJldmlld3Moe30pXG4gICAgaWYgKHNoYXMuZXZlcnkoKHNoYSkgPT4gc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHNoYSkpKSB7XG4gICAgICBzZXRTZWxlY3RlZFRhcmdldHMoKHByZXZpb3VzKSA9PiBwcmV2aW91cy5maWx0ZXIoKHNoYSkgPT4gIXNoYXMuaW5jbHVkZXMoc2hhKSkpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgYWRkZWQgPSBzaGFzLmZpbHRlcigoc2hhKSA9PiAhc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHNoYSkpXG4gICAgc2V0U2VsZWN0ZWRUYXJnZXRzKChwcmV2aW91cykgPT4gQXJyYXkuZnJvbShuZXcgU2V0KFsuLi5wcmV2aW91cywgLi4uc2hhc10pKSlcbiAgICBmb3IgKGNvbnN0IHNoYSBvZiBhZGRlZCkgdm9pZCBsb2FkRGV0YWlsKHNoYSwgZmFsc2UpXG4gIH1cblxuICAvKiogXHU2MkM5XHU1M0Q2XHU1MzU1XHU2NzYxXHU2M0QwXHU0RUE0XHU3Njg0IEFJIFx1ODlFM1x1OEJGQlx1RkYxQmZvcmNlPXRydWUgXHU2NUY2XHU3RUQ1XHU4RkM3XHU3RjEzXHU1QjU4XHU1RjNBXHU1MjM2XHU5MUNEXHU3Qjk3XHUzMDAyXHU1OTMxXHU4RDI1XHU1MTk5XHU1MTY1XHU5NTE5XHU4QkVGXHU1MzYwXHU0RjREXHVGRjA4XHU1MzYxXHU3MjQ3XHU0RTBEXHU1RDI5XHU2RTgzXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGxvYWREZXRhaWwgPSBhc3luYyAodGFyZ2V0OiBzdHJpbmcsIGZvcmNlOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0RGV0YWlsTG9hZGluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9jb21taXQtZGV0YWlsJywgeyBzaGE6IHRhcmdldCwgZm9yY2UgfSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0RGV0YWlscygocHJldmlvdXMpID0+ICh7XG4gICAgICAgICAgLi4ucHJldmlvdXMsXG4gICAgICAgICAgW3RhcmdldF06IHtcbiAgICAgICAgICAgIHNoYTogdGFyZ2V0LFxuICAgICAgICAgICAgaXNXb3JraW5nOiB0YXJnZXQgPT09ICd3b3JraW5nJyxcbiAgICAgICAgICAgIGZpbGVzOiBbXSxcbiAgICAgICAgICAgIGluc2VydGlvbnM6IDAsXG4gICAgICAgICAgICBkZWxldGlvbnM6IDAsXG4gICAgICAgICAgICBwYXRjaFRydW5jYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBwYXRjaDogJycsXG4gICAgICAgICAgICBjb21taXQ6IG51bGwsXG4gICAgICAgICAgICBhbmFseXNpczogeyB3aGF0OiAnQUkgXHU4OUUzXHU4QkZCXHU1OTMxXHU4RDI1XHVGRjFBJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICcnKSArICdcdUZGMDhcdTcwQjlcdTMwMENcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdTMwMERcdTUzRUZcdTkxQ0RcdThCRDVcdUZGMDknLCBsb2dpYzogW10sIHJpc2tzOiBbXSB9LFxuICAgICAgICAgIH0gYXMgdW5rbm93biBhcyBDb21taXREZXRhaWxQYXlsb2FkLFxuICAgICAgICB9KSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFt0YXJnZXRdOiBkYXRhIGFzIHVua25vd24gYXMgQ29tbWl0RGV0YWlsUGF5bG9hZCB9KSlcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0TG9hZEVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0RGV0YWlsTG9hZGluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkSW1wYWN0ID0gYXN5bmMgKGZvcmNlID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoc2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgc2V0SW1wYWN0TG9hZGluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pbXBhY3Qtc2NvcGUnLCB7IHNoYXM6IHNlbGVjdGVkVGFyZ2V0cywgZm9yY2UgfSlcbiAgICAgIHNldEltcGFjdChvayA/IChkYXRhIGFzIHVua25vd24gYXMgSW1wYWN0U2NvcGVQYXlsb2FkKSA6IG51bGwpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEltcGFjdExvYWRpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZFJldmlld3MgPSBhc3luYyAoZm9yY2UgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICBzZXRSZXZpZXdMb2FkaW5nKHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIHNlbGVjdGVkVGFyZ2V0cykge1xuICAgICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9yZXZpZXcnLCB7IHNoYTogdGFyZ2V0LCBmb3JjZSB9KVxuICAgICAgICBjb25zdCBwYXlsb2FkID0gZGF0YSBhcyB1bmtub3duIGFzIFJldmlld1BheWxvYWRcbiAgICAgICAgc2V0UmV2aWV3cygocHJldmlvdXMpID0+ICh7XG4gICAgICAgICAgLi4ucHJldmlvdXMsXG4gICAgICAgICAgW3RhcmdldF06IG9rID8gcGF5bG9hZCA6IHtcbiAgICAgICAgICAgIGlzc3Vlc0ZvdW5kOiAwLFxuICAgICAgICAgICAgaXNzdWVzOiAnJyxcbiAgICAgICAgICAgIHZlcmRpY3Q6ICdcdThCQzRcdTVCQTFcdTU5MzFcdThEMjVcdUZGMUEnICsgU3RyaW5nKHBheWxvYWRbJ2Vycm9yJ10gPz8gJycpICsgJ1x1RkYwOFx1NTNFRlx1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1OTFDRFx1OEJENVx1RkYwOScsXG4gICAgICAgICAgICBpc3N1ZUxpc3Q6IFtdLFxuICAgICAgICAgICAgY2FjaGVkOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSlcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0UmV2aWV3TG9hZGluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkRmlsZURpZmYgPSBhc3luYyAoc2hhOiBzdHJpbmcsIHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGtleSA9IGAke3NoYX18JHtwYXRofWBcbiAgICBpZiAoZmlsZURpZmZzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2V0RmlsZURpZmZzKChwcmV2aW91cykgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9XG4gICAgICAgIGRlbGV0ZSBuZXh0W2tleV1cbiAgICAgICAgcmV0dXJuIG5leHRcbiAgICAgIH0pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9maWxlLWRpZmYnLCB7IHNoYSwgcGF0aCB9KVxuICAgIHNldEZpbGVEaWZmcygocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBba2V5XTogU3RyaW5nKGRhdGFbJ3BhdGNoJ10gPz8gJycpIH0pKVxuICB9XG5cbiAgY29uc3QgbG9hZElzc3VlcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvaXNzdWVzP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldElzc3Vlc0RhdGEoKGRhdGEgYXMgeyBpc3N1ZXM6IElzc3VlRW50cnlbXSB9KS5pc3N1ZXMgPz8gW10pXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTk1RUVcdTk4OThcdTUyMTdcdTg4NjhcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcdUZGMUFcdTUyMTdcdTg4NjhcdTRGRERcdTYzMDFcdTUzOUZcdTY4MzdcdTMwMDJcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogXHU5NUVFXHU5ODk4XHU1OTBEXHU2OEMwXHVGRjFBXHU1QkY5XHU4QkU1XHU5NUVFXHU5ODk4XHU2MjQwXHU1QzVFXHU4QkM0XHU1QkExXHU3NkVFXHU2ODA3XHU5MUNEXHU4REQxXHU2OEMwXHU2RDRCXHVGRjA4XHU0RkVFXHU1OTBEXHU3ODZFXHU4QkE0ICsgXHU2NzAwXHU0RjE4XHU2MDI3L1x1NjcwMFx1NUMwRlx1NEZCNVx1NTE2NSArIFx1NjVCMFx1OTVFRVx1OTg5OFx1NjI2Qlx1NjNDRlx1RkYwOVx1RkYwQ1xuICAgKiBcdTUzRUFcdTY3MDlcdTU5MERcdTY4QzBcdTkwMUFcdThGQzdcdTYyNERcdTgxRUFcdTUyQThcdTdGNkVcdTRFM0FcdTVERjJcdTg5RTNcdTUxQjNcdUZGMUJcdTdFRDNcdTY3OUNcdTRFRTVcdTU5MERcdTY4QzBcdTYyQTVcdTU0NEFcdTVGNjJcdTVGMEZcdTVDNTVcdTc5M0FcdTMwMDJcbiAgICovXG4gIGNvbnN0IHZlcmlmeUlzc3VlcyA9IGFzeW5jICh0YXJnZXQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldFZlcmlmeWluZ1RhcmdldCh0YXJnZXQpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2lzc3Vlcy92ZXJpZnknLCB7IHRhcmdldCB9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgcmVzb2x2ZWQgPSAoZGF0YVsncmVzb2x2ZWQnXSBhcyBzdHJpbmdbXSB8IHVuZGVmaW5lZCkgPz8gW11cbiAgICAgIGNvbnN0IHN0aWxsT3BlbiA9IChkYXRhWydzdGlsbE9wZW4nXSBhcyBBcnJheTx7IHRpdGxlOiBzdHJpbmc7IHJlYXNvbjogc3RyaW5nIH0+IHwgdW5kZWZpbmVkKSA/PyBbXVxuICAgICAgY29uc3QgbmV3SXNzdWVzID0gKGRhdGFbJ25ld0lzc3VlcyddIGFzIEFycmF5PHsgc2V2ZXJpdHk6IHN0cmluZzsgdGl0bGU6IHN0cmluZyB9PiB8IHVuZGVmaW5lZCkgPz8gW11cbiAgICAgIGNvbnN0IHZlcmRpY3QgPSBTdHJpbmcoZGF0YVsndmVyZGljdCddID8/ICcnKVxuICAgICAgY29uc3QgbGluZXMgPSBbXG4gICAgICAgIGBcdTU5MERcdTY4QzBcdTVCOENcdTYyMTBcdUZGMUFcdTVERjJcdTRGRUVcdTU5MEQgJHtyZXNvbHZlZC5sZW5ndGh9IFx1MDBCNyBcdTRFQ0RcdTY3MkFcdTRGRUVcdTU5MEQgJHtzdGlsbE9wZW4ubGVuZ3RofSBcdTAwQjcgXHU2NUIwXHU1ODlFXHU5NUVFXHU5ODk4ICR7bmV3SXNzdWVzLmxlbmd0aH1gLFxuICAgICAgICAuLi4ocmVzb2x2ZWQubGVuZ3RoID4gMCA/IFtgXHUyNzEzIFx1NURGMlx1NEZFRVx1NTkwRFx1RkYxQSR7cmVzb2x2ZWQuam9pbignXHVGRjFCJyl9YF0gOiBbXSksXG4gICAgICAgIC4uLihzdGlsbE9wZW4ubGVuZ3RoID4gMCA/IHN0aWxsT3Blbi5tYXAoKGl0ZW0pID0+IGBcdTI3MTcgXHU2NzJBXHU0RkVFXHU1OTBEXHVGRjFBJHtpdGVtLnRpdGxlfSBcdTIwMTRcdTIwMTQgJHtpdGVtLnJlYXNvbn1gKSA6IFtdKSxcbiAgICAgICAgLi4uKG5ld0lzc3Vlcy5sZW5ndGggPiAwID8gbmV3SXNzdWVzLm1hcCgoaXRlbSkgPT4gYFx1RkYwQiBcdTY1QjBcdTk1RUVcdTk4OThcdUZGMUFbJHtpdGVtLnNldmVyaXR5fV0gJHtpdGVtLnRpdGxlfWApIDogW10pLFxuICAgICAgICAuLi4odmVyZGljdCA9PT0gJycgPyBbXSA6IFtgXHU2NzAwXHU0RjE4XHU2MDI3XHVGRjFBJHt2ZXJkaWN0fWBdKSxcbiAgICAgIF1cbiAgICAgIHNldEFjdGlvblJlc3VsdChsaW5lcy5qb2luKCdcXG4nKSlcbiAgICAgIGF3YWl0IGxvYWRJc3N1ZXMoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSkpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFZlcmlmeWluZ1RhcmdldChudWxsKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGFkZE5vdGUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKG5vdGVUaXRsZS50cmltKCkgPT09ICcnIHx8IG5vdGVDb250ZW50LnRyaW0oKSA9PT0gJycpIHJldHVyblxuICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzJywge1xuICAgICAgdGl0bGU6IG5vdGVUaXRsZS50cmltKCksXG4gICAgICBjb250ZW50OiBub3RlQ29udGVudC50cmltKCksXG4gICAgICB0YWdzOiBub3RlVGFncyxcbiAgICAgIHNoYTogc2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCA/IHVuZGVmaW5lZCA6IHNlbGVjdGVkVGFyZ2V0c1swXSxcbiAgICB9KVxuICAgIGlmIChvaykge1xuICAgICAgc2V0Tm90ZVRpdGxlKCcnKVxuICAgICAgc2V0Tm90ZUNvbnRlbnQoJycpXG4gICAgICBzZXROb3RlVGFncygnJylcbiAgICAgIGF3YWl0IGxvYWROb3RlcygpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVtb3ZlTm90ZSA9IGFzeW5jIChpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMvZGVsZXRlJywgeyBpZCB9KVxuICAgIGlmIChlZGl0aW5nTm90ZSAhPT0gbnVsbCAmJiBlZGl0aW5nTm90ZS5pZCA9PT0gaWQpIHNldEVkaXRpbmdOb3RlKG51bGwpXG4gICAgYXdhaXQgbG9hZE5vdGVzKClcbiAgfVxuXG4gIGNvbnN0IHNhdmVOb3RlRWRpdCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoZWRpdGluZ05vdGUgPT09IG51bGwpIHJldHVyblxuICAgIGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL3VwZGF0ZScsIHsgaWQ6IGVkaXRpbmdOb3RlLmlkLCB0aXRsZTogZWRpdGluZ05vdGUudGl0bGUsIGNvbnRlbnQ6IGVkaXRpbmdOb3RlLmNvbnRlbnQsIHRhZ3M6IGVkaXRpbmdOb3RlLnRhZ3MgfSlcbiAgICBzZXRFZGl0aW5nTm90ZShudWxsKVxuICAgIGF3YWl0IGxvYWROb3RlcygpXG4gIH1cblxuICAvKiogXHU3RjZFXHU5ODc2L1x1NTNENlx1NkQ4OFx1N0Y2RVx1OTg3Nlx1NEUwMFx1Njc2MVx1N0IxNFx1OEJCMFx1MzAwMiAqL1xuICBjb25zdCB0b2dnbGVOb3RlUGluID0gYXN5bmMgKG5vdGU6IE5vdGVFbnRyeSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL3VwZGF0ZScsIHsgaWQ6IG5vdGUuaWQsIHBpbm5lZDogbm90ZS5waW5uZWQgIT09IHRydWUgfSlcbiAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICB9XG5cbiAgLyoqIFx1N0IxNFx1OEJCMFx1NUJGQ1x1NTFGQVx1NEUzQSAubWQgXHU2NTg3XHU0RUY2XHVGRjA4XHU2RDRGXHU4OUM4XHU1NjY4XHU3QUVGIEJsb2IgXHU0RTBCXHU4RjdEXHVGRjFCXHU2NTg3XHU0RUY2XHU1NDBEXHU2MzA5XHU2ODA3XHU5ODk4XHU2RTA1XHU2RDE3XHVGRjBDXHU5NzVFXHU2Q0Q1XHU1QjU3XHU3QjI2XHU2NkZGXHU2MzYyXHU0RTNBXHU0RTBCXHU1MjEyXHU3RUJGXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGV4cG9ydE5vdGUgPSAobm90ZTogTm90ZUVudHJ5KTogdm9pZCA9PiB7XG4gICAgY29uc3QgbWQgPSBgIyAke25vdGUudGl0bGV9XFxuXFxuJHtub3RlLmNvbnRlbnR9XFxuYFxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbbWRdLCB7IHR5cGU6ICd0ZXh0L21hcmtkb3duO2NoYXJzZXQ9dXRmLTgnIH0pXG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxuICAgIGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgIGFuY2hvci5ocmVmID0gdXJsXG4gICAgYW5jaG9yLmRvd25sb2FkID0gKG5vdGUudGl0bGUucmVwbGFjZSgvW1xcXFwvOio/XCI8PnxdL2csICdfJykudHJpbSgpLnNsaWNlKDAsIDYwKSB8fCAnbm90ZScpICsgJy5tZCdcbiAgICBhbmNob3IuY2xpY2soKVxuICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKVxuICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzICcgKyB0KCdub3Rlcy5leHBvcnREb25lJykpXG4gIH1cblxuICAvKiogQUkgXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzXHVGRjFBXHU1QkY5XHU2QkQ0XHU0RTBBXHU2QjIxXHU2MDNCXHU3RUQzXHU1MDVBXHU1ODlFXHU5MUNGXHU2NkY0XHU2NUIwXHVGRjBDXHU2MjhBXHU3QjE0XHU4QkIwK1x1OTg3OVx1NzZFRVx1Njg2M1x1Njg0OFx1NjNEMFx1NzBCQ1x1NjIxMFx1NEUwMFx1NEVGRFx1MzAwQ1x1NkQzQlx1MzAwRFx1NzY4NFx1NjAzQlx1N0VEM1x1NjU4N1x1Njg2M1x1MzAwMiAqL1xuICBjb25zdCBhaVN1bW1hcml6ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRBaVN1bW1hcml6aW5nKHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL2FpLXN1bW1hcnknLCB7fSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldEFjdGlvblJlc3VsdChkYXRhWyd1cGRhdGVkJ10gPT09IHRydWVcbiAgICAgICAgPyAnXHUyNzEzIFx1NURGMlx1NUJGOVx1NkJENFx1NEUwQVx1NkIyMVx1NjAzQlx1N0VEM1x1NUI4Q1x1NjIxMFx1NTg5RVx1OTFDRlx1NjZGNFx1NjVCMFx1RkYwOFx1NjVCMFx1NTg5RVx1NTNEOFx1NTMxNlx1ODlDMVx1NjAzQlx1N0VEM1x1NzY4NFx1MzAwQ1x1NjcyQ1x1NkIyMVx1NjZGNFx1NjVCMFx1MzAwRFx1NEUwMFx1ODI4Mlx1RkYwOVx1RkYwQ1x1NjVFN1x1NjAzQlx1N0VEM1x1NURGMlx1NTQwOFx1NUU3Nlx1NjZGRlx1NjM2MidcbiAgICAgICAgOiAnXHUyNzEzIFx1NURGMlx1NzUxRlx1NjIxMFx1OTk5Nlx1NEVGRFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEMycpXG4gICAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSkpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEFpU3VtbWFyaXppbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1OTg3NVx1OTc2Mlx1NTIxQlx1NUVGQVx1NjI2N1x1ODg0Q1x1RkYxQVx1NUVGQVx1NTNEOFx1NjZGNCBcdTIxOTIgTExNIFx1NzUxRlx1NjIxMFx1N0YxNlx1NjM5Mlx1OEJBMVx1NTIxMiBcdTIxOTIgXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0XHU5ODc1XHVGRjA4XHU4OUQyXHU4MjcyL1x1NkEyMVx1NTc4Qi9cdTdCNTZcdTc1NjVcdTUzRUZcdThDMDNcdUZGMDlcdTIxOTIgXHU3ODZFXHU4QkE0XHU1NDBFXHU1NDJGXHU1MkE4XHUzMDAyICovXG4gIGNvbnN0IHN0YXJ0UnVuID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChleGVjVGl0bGUudHJpbSgpID09PSAnJyB8fCBleGVjRGVzYy50cmltKCkgPT09ICcnKSByZXR1cm5cbiAgICBzZXRCdXN5KCdzdGFydFJ1bicpXG4gICAgc2V0QWN0aW9uUmVzdWx0KG51bGwpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvc3RhcnQnLCB7XG4gICAgICAgIHRpdGxlOiBleGVjVGl0bGUudHJpbSgpLCBkZXNjcmlwdGlvbjogZXhlY0Rlc2MudHJpbSgpLFxuICAgICAgICAuLi4oZXhlY01vZGVsID09PSAnJyA/IHt9IDogKCgpID0+IHsgY29uc3QgW3Byb3ZpZGVyLCBtb2RlbF0gPSBleGVjTW9kZWwuc3BsaXQoJy8nKTsgcmV0dXJuIHsgZGVmYXVsdE1vZGVsUHJvdmlkZXI6IHByb3ZpZGVyID8/ICcnLCBkZWZhdWx0TW9kZWxJZDogbW9kZWwgPz8gJycgfSB9KSgpKSxcbiAgICAgIH0pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAoZGF0YVsnYXV0b1N0YXJ0ZWQnXSA9PT0gdHJ1ZSkge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxMyBcdTVERjJcdTU0MkZcdTUyQThcdTYyNjdcdTg4NENcdUZGMUEnICsgU3RyaW5nKGRhdGFbJ3J1bklkJ10gPz8gJycpKVxuICAgICAgICBzZXRFeGVjVGl0bGUoJycpXG4gICAgICAgIHNldEV4ZWNEZXNjKCcnKVxuICAgICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHN0ZXBzID0gKGRhdGFbJ3N0ZXBzJ10gYXMgQXJyYXk8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+IHwgdW5kZWZpbmVkKSA/PyBbXVxuICAgICAgc2V0UGxhbkNvbmZpcm0oe1xuICAgICAgICBjaGFuZ2VJZDogU3RyaW5nKGRhdGFbJ2NoYW5nZUlkJ10gPz8gJycpLFxuICAgICAgICBzdGVwczogc3RlcHMubWFwKChzdGVwKSA9PiAoe1xuICAgICAgICAgIGlkOiBTdHJpbmcoc3RlcFsnaWQnXSA/PyAnJyksXG4gICAgICAgICAgdGl0bGU6IFN0cmluZyhzdGVwWyd0aXRsZSddID8/ICcnKSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogU3RyaW5nKHN0ZXBbJ2Rlc2NyaXB0aW9uJ10gPz8gJycpLFxuICAgICAgICAgIHRhcmdldEZpbGVzOiAoc3RlcFsndGFyZ2V0RmlsZXMnXSBhcyBzdHJpbmdbXSB8IHVuZGVmaW5lZCkgPz8gW10sXG4gICAgICAgICAgcm9sZTogU3RyaW5nKHN0ZXBbJ3JvbGUnXSA/PyAnY29kaW5nJyksXG4gICAgICAgICAgYWNjZXB0YW5jZTogU3RyaW5nKHN0ZXBbJ2FjY2VwdGFuY2UnXSA/PyAnJyksXG4gICAgICAgICAgZmFpbHVyZVBvbGljeTogU3RyaW5nKHN0ZXBbJ2ZhaWx1cmVQb2xpY3knXSA/PyAncmV0cnktZXNjYWxhdGUnKSxcbiAgICAgICAgICBlbmFibGVkOiBzdGVwWydlbmFibGVkJ10gIT09IGZhbHNlLFxuICAgICAgICAgIG1vZGVsUHJvdmlkZXI6ICcnLFxuICAgICAgICAgIG1vZGVsSWQ6ICcnLFxuICAgICAgICB9KSksXG4gICAgICB9KVxuICAgICAgaWYgKG1vZGVsT3B0aW9ucy5sZW5ndGggPT09IDAgJiYgbW9kZWxUaWVycyA9PT0gbnVsbCkgdm9pZCBsb2FkTW9kZWxDb25maWcoKVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU4QkExXHU1MjEyXHU1REYyXHU3NTFGXHU2MjEwXHVGRjBDXHU4QkY3XHU1NzI4XHU0RTBCXHU2NUI5XHU3ODZFXHU4QkE0XHU3RjE2XHU2MzkyXHU1NDBFXHU1NDJGXHU1MkE4JylcbiAgICAgIHNldEV4ZWNUaXRsZSgnJylcbiAgICAgIHNldEV4ZWNEZXNjKCcnKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSkpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJ1c3kobnVsbClcbiAgICB9XG4gIH1cblxuICAvKiogXHU4QkExXHU1MjEyXHU3ODZFXHU4QkE0XHU5ODc1XHVGRjFBXHU0RkREXHU1QjU4XHU3RjE2XHU4RjkxXHVGRjA4XHU2NUIwXHU3MjQ4XHU2NzJDXHU4QkExXHU1MjEyXHVGRjA5XHU1RTc2XHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHUzMDAyICovXG4gIGNvbnN0IGxhdW5jaFBsYW4gPSBhc3luYyAod2l0aEVkaXRzOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHBsYW5Db25maXJtID09PSBudWxsKSByZXR1cm5cbiAgICBzZXRQbGFuQnVzeSh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBsZXQgY2hhbmdlSWQgPSBwbGFuQ29uZmlybS5jaGFuZ2VJZFxuICAgICAgaWYgKHdpdGhFZGl0cykge1xuICAgICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ydW5zL3BsYW4vdXBkYXRlJywgeyBjaGFuZ2VJZCwgc3RlcHM6IHBsYW5Db25maXJtLnN0ZXBzIH0pXG4gICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvbGF1bmNoJywgeyBjaGFuZ2VJZCB9KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTMgXHU1REYyXHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHVGRjFBJyArIFN0cmluZyhkYXRhWydydW5JZCddID8/ICcnKSlcbiAgICAgIHNldFBsYW5Db25maXJtKG51bGwpXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSkpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFBsYW5CdXN5KGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTUyQTBcdThGN0QgUnVuIFx1OEJFNlx1NjBDNVx1RkYwOFx1NkI2NVx1OUFBNFx1NjVGNlx1OTVGNFx1N0VCRiArIFx1NEVGQlx1NTJBMVx1NURFNVx1NEY1Q1x1OEJCMFx1NUZDNlx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBsb2FkUnVuRGV0YWlsID0gYXN5bmMgKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9kZXRhaWw/aWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChpZCkpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldFJ1bkRldGFpbChkYXRhIGFzIFJ1bkRldGFpbClcbiAgICB9IGNhdGNoIHtcbiAgICAgIHNldFJ1bkRldGFpbChudWxsKVxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTYwNjJcdTU5MERcdTY2ODJcdTUwNUMvXHU0RTJEXHU2NUFEL1x1NTkzMVx1OEQyNVx1NzY4NCBSdW5cdTMwMDIgKi9cbiAgY29uc3QgcmVzdW1lUnVuID0gYXN5bmMgKHJ1bklkOiBzdHJpbmcsIGFjdGlvbjogJ2NvbnRpbnVlJyB8ICdza2lwLWN1cnJlbnQnKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9yZXN1bWUnLCB7IHJ1bklkLCBhY3Rpb24gfSlcbiAgICBpZiAob2spIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NURGMlx1NjA2Mlx1NTkwRFx1NjI2N1x1ODg0Q1x1RkYwOCcgKyBhY3Rpb24gKyAnXHVGRjA5JylcbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgICBhd2FpdCBsb2FkUnVuRGV0YWlsKHJ1bklkKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NTJBMFx1OEY3RFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1NTIxN1x1ODg2OFx1MzAwMiAqL1xuICBjb25zdCBsb2FkU2NoZWR1bGVkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9zY2hlZHVsZWQ/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0U2NoZWR1bGVkRGF0YSgoZGF0YSBhcyB7IHRhc2tzOiBTY2hlZHVsZWRUYXNrRW50cnlbXSB9KS50YXNrcyA/PyBbXSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1NTIxN1x1ODg2OFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2MlxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTUyMUJcdTVFRkEgLyBcdTY2RjRcdTY1QjAgLyBcdTUyMjBcdTk2NjQgLyBcdTdBQ0JcdTUzNzNcdTYyNjdcdTg4NENcdTRGOEJcdTg4NENcdTRFRkJcdTUyQTFcdTMwMDIgKi9cbiAgY29uc3QgYWRkU2NoZWR1bGVkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGludGVydmFsTWludXRlcyA9IE51bWJlcihzY2hlZEludGVydmFsKVxuICAgIGlmIChzY2hlZE5hbWUudHJpbSgpID09PSAnJyB8fCAhTnVtYmVyLmlzRmluaXRlKGludGVydmFsTWludXRlcykgfHwgaW50ZXJ2YWxNaW51dGVzIDwgMSkge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgXHU4QkY3XHU1ODZCXHU1MTk5XHU0RUZCXHU1MkExXHU1NDBEXHU3OUYwXHU0RTBFXHU2NzA5XHU2NTQ4XHU5NUY0XHU5Njk0XHVGRjA4XHU1MjA2XHU5NDlGXHVGRjA5JylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9zY2hlZHVsZWQnLCB7XG4gICAgICBuYW1lOiBzY2hlZE5hbWUudHJpbSgpLCB0eXBlOiBzY2hlZFR5cGUsIGludGVydmFsTWludXRlcyxcbiAgICAgIHRpdGxlOiBzY2hlZFRpdGxlLnRyaW0oKSB8fCB1bmRlZmluZWQsIGRlc2NyaXB0aW9uOiBzY2hlZERlc2MudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICB9KVxuICAgIGlmIChvaykge1xuICAgICAgc2V0U2NoZWROYW1lKCcnKTsgc2V0U2NoZWRUaXRsZSgnJyk7IHNldFNjaGVkRGVzYygnJylcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1NURGMlx1NTIxQlx1NUVGQScpXG4gICAgICBhd2FpdCBsb2FkU2NoZWR1bGVkKClcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNjaGVkdWxlZEFjdGlvbiA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvc2NoZWR1bGVkLycgKyBwYXRoLCBib2R5KVxuICAgIGlmIChvaykgYXdhaXQgbG9hZFNjaGVkdWxlZCgpXG4gICAgZWxzZSBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgU3RyaW5nKGRhdGFbJ2Vycm9yJ10gPz8gJ2Vycm9yJykpXG4gIH1cblxuICAvKiogXHU1MkEwXHU4RjdEXHU4QkIwXHU1RkM2XHU5NzYyXHU2NzdGXHU1MTY4XHU5MUNGXHU2NTcwXHU2MzZFXHVGRjA4XHU1NDJCXHU1NDBDXHU2QjY1XHU1N0ZBXHU3RUJGXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGxvYWRNZW1vcmllcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3JpZXM/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSlcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmIChyZXNwb25zZS5vaykgc2V0TWVtb3JpZXNEYXRhKGRhdGEgYXMgTWVtb3JpZXNQYXlsb2FkKVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gXHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NjJDOVx1NTNENlx1NTQwQ1x1NkI2NVx1RkYxQVx1NEUwOVx1NTQxMVx1NTIyNFx1NUI5QVx1RkYwOFx1NTkzMVx1NjU0OFx1NjNEMFx1Njg0OC9cdTY1QjBcdTU4OUVcdTUwMTlcdTkwMDkvXHU4MUVBXHU1MkE4XHU3RUVEXHU1NDdEXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHN5bmNNZW1vcmllcyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRNZW1vcnlTeW5jaW5nKHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeS9zeW5jJywge30pXG4gICAgICBpZiAoIW9rICYmIGRhdGFbJ2Vycm9yJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzZXRTeW5jUmVwb3J0KHsgb2s6IGZhbHNlLCBlcnJvcjogU3RyaW5nKGRhdGFbJ2Vycm9yJ10pIH0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0U3luY1JlcG9ydChkYXRhIGFzIFN5bmNSZXBvcnQpXG4gICAgICBhd2FpdCBsb2FkTWVtb3JpZXMoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRTeW5jUmVwb3J0KHsgb2s6IGZhbHNlLCBlcnJvcjogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpIH0pXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldE1lbW9yeVN5bmNpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NTQwQ1x1NkI2NVx1NjJBNVx1NTQ0QVx1NTQwRVx1N0VFRFx1RkYxQVx1NjI4QVx1OTAwOVx1NEUyRFx1NzY4NFx1NzU5MVx1NEYzQ1x1OEZDN1x1NjVGNlx1OTg3OVx1ODQzRFx1NEUzQSBzdGFsZSAvIFx1NUY1Mlx1Njg2M1x1MzAwMiAqL1xuICBjb25zdCBhcHBseVN5bmMgPSBhc3luYyAoaWRzOiBzdHJpbmdbXSwgYWN0aW9uOiAnbWFyay1zdGFsZScgfCAnYXJjaGl2ZScpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9tZW1vcnkvc3luYy9hcHBseScsIHsgaWRzLCBhY3Rpb24gfSlcbiAgICBzZXRTeW5jUmVwb3J0KChwcmV2aW91cykgPT4gcHJldmlvdXMgPT09IG51bGwgPyBudWxsIDogeyAuLi5wcmV2aW91cywgc3RhbGVQcm9wb3NhbHM6IChwcmV2aW91cy5zdGFsZVByb3Bvc2FscyA/PyBbXSkuZmlsdGVyKChwcm9wb3NhbCkgPT4gIWlkcy5pbmNsdWRlcyhwcm9wb3NhbC5pZCkpIH0pXG4gICAgYXdhaXQgbG9hZE1lbW9yaWVzKClcbiAgfVxuXG4gIC8qKiBcdThCQjBcdTVGQzZcdTcyQjZcdTYwMDFcdTY0Q0RcdTRGNUNcdUZGMDhcdTVGNTJcdTY4NjMvXHU2MDYyXHU1OTBEXHVGRjA5XHU0RTBFXHU1MjA2XHU2NTJGXHU1RjUyXHU0RTAwXHUzMDAyICovXG4gIGNvbnN0IG1lbW9yeUFjdGlvbiA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5LycgKyBwYXRoLCBib2R5KVxuICAgIGlmIChvaykgYXdhaXQgbG9hZE1lbW9yaWVzKClcbiAgICBlbHNlIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgfVxuXG4gIC8qKiBcdThCQjBcdTVGQzZcdThGNkNcdTdCMTRcdThCQjBcdUZGMUFcdTVGMTVcdTc1MjhcdThGREJcdTVCNjZcdTRFNjBcdTY4NjNcdTY4NDhcdTMwMDIgKi9cbiAgY29uc3QgbWVtb3J5VG9Ob3RlID0gYXN5bmMgKG1lbW9yeTogTWVtb3J5RW50cnkpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IG9rIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3RlcycsIHtcbiAgICAgIHRpdGxlOiBtZW1vcnkudGl0bGUsXG4gICAgICBjb250ZW50OiBtZW1vcnkuY29udGVudCArIChtZW1vcnkuYmFzaXNTaGEgIT09IG51bGwgPyBgXFxuXHVGRjA4XHU2NzY1XHU2RTkwXHVGRjFBXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2ICR7bWVtb3J5LmJhc2lzU2hhLnNsaWNlKDAsIDgpfVx1RkYwOWAgOiAnJyksXG4gICAgICB0YWdzOiAnXHU4QkIwXHU1RkM2LCAnICsgbWVtb3J5LnR5cGUsXG4gICAgfSlcbiAgICBpZiAob2spIHNldEFjdGlvblJlc3VsdCgnXHUyNzEzIFx1NURGMlx1NjI4QVx1OEJCMFx1NUZDNlx1OEY2Q1x1NEUzQVx1N0IxNFx1OEJCMCcpXG4gIH1cblxuICAvLyBcdTRGMUFcdThCRERcdTYyNTNcdTVGMDAvXHU1MjA3XHU2MzYyXHU2NUY2XHU1Qjk4XHU2NUI5XHU0RjFBIGNsb3NlRGV0YWlscyBcdTY1MzZcdThENzdcdThGNjhcdTkwNTNcdUZGMUJcdTc3MEJcdTk1RThcdTcyRDdcdTZCQ0YgNTAwbXMgXHU2OEMwXHU2N0U1XHVGRjBDXG4gIC8vIFx1NTNFQVx1ODk4MVx1NUY1M1x1NTI0RFx1NjcwOVx1NEYxQVx1OEJERFx1ODAwQ1x1NURFNVx1NEY1Q1x1NTNGMFx1NTIxN1x1NUJCRCA8IDUwcHggXHU1QzMxXHU5MUNEXHU2NUIwXHU2NDkxXHU1RjAwXHVGRjA4XHU3ODZFXHU1QjlBXHU2MDI3XHVGRjBDXHU0RTBEXHU0RjlEXHU4RDU2IGVmZmVjdCBcdTY1RjZcdTVFOEZcdUZGMDlcdTMwMDJcbiAgLy8gXHU1NDBDXHU0RTAwXHU2MkNEXHU3RUY0XHU2MzAxXHU3RURGXHU4QkExXHU4ODRDXHU5NEIzXHU1MjM2XHVGRjFBXHU0RjFBXHU4QkREXHU1MjA3XHU2MzYyXHU0RjFBXHU2MzYyXHU2Mzg5XHU3RURGXHU4QkExXHU4ODRDIERPTVx1RkYwQ1x1NjgzN1x1NUYwRlx1ODg2OFx1N0YzQVx1NTkzMVx1NjVGNlx1NjMwOVx1NUY1M1x1NTI0RFxuICAvLyBcdTY3ODRcdTVFRkFcdTU0QzhcdTVFMENcdTkxQ0RcdTZDRThcdTUxNjVcdUZGMDhcdTVFNDJcdTdCNDlcdUZGMENcdTVERjJcdTVCNThcdTU3MjhcdTUyMTlcdThERjNcdThGQzdcdUZGMDlcdTMwMDJcbiAgY29uc3QgbGF5b3V0RmFjZSA9IChwcm9wcyBhcyB1bmtub3duIGFzIHsgbGF5b3V0PzogeyBvcGVuRGV0YWlscz86ICgpID0+IHZvaWQgfSB9KS5sYXlvdXRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBhcHBseVN0YXRzTGluZUNsYW1wKClcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGMtc3RhdHMtY2xhbXAnKSA9PT0gbnVsbCkgYXBwbHlTdGF0c0xpbmVDbGFtcCgpXG4gICAgICBjb25zdCBjaGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImNlbnRlckNvbFwiXScpXG4gICAgICBjb25zdCB3aWR0aCA9IGNoYXQgPyBNYXRoLnJvdW5kKGNoYXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpIDogLTFcbiAgICAgIGlmICh3aWR0aCAhPT0gLTEgJiYgd2lkdGggPCA1MCkgbGF5b3V0RmFjZT8ub3BlbkRldGFpbHM/LigpXG4gICAgfSwgNTAwKVxuICAgIHJldHVybiAoKSA9PiB7IGNsZWFySW50ZXJ2YWwodGltZXIpIH1cbiAgfSwgW3Byb3BzLnNlc3Npb25JZCwgbGF5b3V0RmFjZV0pXG5cbiAgLyoqIFx1NEVFNSBpbXBvcnRhbnQgXHU1MTg1XHU4MDU0XHU2ODM3XHU1RjBGXHU3NkY0XHU2M0E1XHU1MTk5XHU1Qjk4XHU2NUI5XHU3RjUxXHU2ODNDXHU2QTIxXHU2NzdGXHVGRjA4XHU2NzAwXHU5QUQ4XHU0RjE4XHU1MTQ4XHU3RUE3XHVGRjBDXHU0RUZCXHU0RjU1XHU5MUNEXHU2RTMyXHU2N0QzXHU0RTBEXHU0RjFBXHU4OTg2XHU3NkQ2XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGZyYW1lVGVtcGxhdGVTZXQgPSAoY2hhdFB4OiBudW1iZXIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cInNpZGViYXJDb2xcIl0nKVxuICAgIGNvbnN0IHNpZGViYXJXID0gc2lkZWJhciA/IE1hdGgubWF4KDU2LCBNYXRoLnJvdW5kKHNpZGViYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpKSA6IDI4MFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0nKVxuICAgICAgPy5zdHlsZS5zZXRQcm9wZXJ0eSgnZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zJywgc2lkZWJhclcgKyAncHggbWlubWF4KDAsIDFmcikgJyArIGNoYXRQeCArICdweCcsICdpbXBvcnRhbnQnKVxuICB9XG5cbiAgLy8gXHU4MDRBXHU1OTI5XHU1MjE3XHU1QkJEXHU4QkIwXHU1RkM2XHVGRjA4XHU1Qjk4XHU2NUI5IGxheW91dCBzdG9yZSBcdTc3QUNcdTYwMDFcdUZGMDlcdUZGMUFcdTYzMDJcdThGN0RcdTYwNjJcdTU5MEQgKyBcdTYyRDZcdTYyRkRcdTc2RjRcdTUxOTlcdTUxODVcdTgwNTRcdTZBMjFcdTY3N0ZcdTMwMDJcbiAgLy8gXHU1RkM1XHU5ODdCXHU1MTk5IGltcG9ydGFudFx1MjAxNFx1MjAxNExBWU9VVF9TVFlMRSBcdTc2ODRcdTZBMjFcdTY3N0ZcdTg5QzRcdTUyMTlcdTRFNUZcdTY2MkYgaW1wb3J0YW50XHVGRjBDXHU5NzVFIGltcG9ydGFudFxuICAvLyBcdTUxODVcdTgwNTRcdTRGMUFcdTg4QUJcdTVCODNcdTUzOEJcdTUyMzZcdUZGMDhcdThGRDlcdTVDMzFcdTY2MkZcdTZCNjRcdTUyNERcIlx1NjJENlx1NjJGRFx1NzUxRlx1NjU0OFx1MzAwMVx1NTIzN1x1NjVCMFx1NTQwRVx1OEJCMFx1NUZDNlx1NEUyMlx1NTkzMVwiXHU3Njg0XHU1MzlGXHU1NkUwXHVGRjA5XHUzMDAyXG4gIC8vIFx1NUI5OFx1NjVCOSBSZWFjdCBcdTkxQ0RcdTZFMzJcdTY3RDNcdTRGMUFcdTY1MzlcdTUxOTlcdTUxODVcdTgwNTRcdTZBMjFcdTY3N0ZcdUZGMENNdXRhdGlvbk9ic2VydmVyIFx1NjMwOVx1NUY1M1x1NTI0RFx1NTAzQ1x1NUI4OFx1NTM2Qlx1OTFDRFx1NTE5OVxuICAvLyBcdUZGMDhcdTUwM0NcdTc2RjhcdTU0MENcdTRFMERcdTRGMUFcdTg5RTZcdTUzRDFcdTY1QjBcdTc2ODQgbXV0YXRpb25cdUZGMENcdTY1RTBcdTU2REVcdTczQUZcdUZGMDlcdTMwMDJcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBzYXZlZCA9IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGMuY2hhdFdpZHRoJykgPz8gJycpXG4gICAgY29uc3QgYXBwbHkgPSAoKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0nKSBhcyBIVE1MRWxlbWVudCB8IG51bGxcbiAgICAgIC8vIFx1NEVDNVx1NUY1M1x1NTE4NVx1ODA1NFx1NkEyMVx1Njc3Rlx1NEUwRFx1NjYyRlx1NjIxMVx1NEVFQ1x1NzY4NCBpbXBvcnRhbnQgXHU1OEYwXHU2NjBFXHU2NUY2XHU1MTk5XHU1MTY1XHVGRjFBXHU1Qjk4XHU2NUI5IFJlYWN0IFx1OTFDRFx1NkUzMlx1NjdEM1x1NEYxQVx1NjI4QVxuICAgICAgLy8gXHU1MTg1XHU4MDU0XHU2NTM5XHU1NkRFXHU5NzVFIGltcG9ydGFudFx1RkYwOFx1NkI2NFx1NjVGNlx1NjgzN1x1NUYwRlx1ODg2OFx1ODlDNFx1NTIxOVx1NjNBNVx1N0JBMVx1MzAwMVx1ODA0QVx1NTkyOVx1NUJCRFx1NTZERVx1ODQzRCAzNjBcdUZGMDlcdUZGMENcdTg5QzJcdTVCREZcdTU2NjhcbiAgICAgIC8vIFx1OTY4Rlx1NTM3M1x1OTFDRFx1NTE5OVx1NTkzQVx1NTZERVx1RkYxQlx1NjIxMVx1NEVFQ1x1ODFFQVx1NURGMVx1NzY4NFx1NTE5OVx1NTE2NVx1NEZERFx1NjMwMSBpbXBvcnRhbnRcdUZGMENcdTRFMERcdTUxOERcdTg5RTZcdTUzRDFcdTRFMEJcdTRFMDBcdThGNkVcdTMwMDJcbiAgICAgIGlmIChmcmFtZSA9PT0gbnVsbCB8fCBmcmFtZS5zdHlsZS5nZXRQcm9wZXJ0eVByaW9yaXR5KCdncmlkLXRlbXBsYXRlLWNvbHVtbnMnKSA9PT0gJ2ltcG9ydGFudCcpIHJldHVyblxuICAgICAgY29uc3QgY2hhdFcgPSBOdW1iZXIuaXNGaW5pdGUoc2F2ZWQpICYmIHNhdmVkID49IDI4MCA/IHNhdmVkIDogMzYwXG4gICAgICBmcmFtZVRlbXBsYXRlU2V0KGNoYXRXKVxuICAgIH1cbiAgICBhcHBseSgpXG4gICAgY29uc3QgZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdJylcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHsgYXBwbHkoKSB9KVxuICAgIGlmIChmcmFtZSAhPT0gbnVsbCkgb2JzZXJ2ZXIub2JzZXJ2ZShmcmFtZSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFsnc3R5bGUnXSB9KVxuICAgIHJldHVybiAoKSA9PiB7IG9ic2VydmVyLmRpc2Nvbm5lY3QoKSB9XG4gIH0sIFtdKVxuXG4gIC8qKiBcdTUyMDZcdTk2OTRcdTY3NjFcdTYyRDZcdTYyRkRcdUZGMUFcdThDMDNcdTY1NzRcdTgwNEFcdTU5MjlcdTUyMTdcdTVCQkRcdUZGMDhcdTVERTVcdTRGNUNcdTUzRjBcdTU0MzhcdTY1MzZcdTUyNjlcdTRGNTlcdTdBN0FcdTk1RjRcdUZGMDlcdUZGMENcdTUxOTlcdTUxNjUgbG9jYWxTdG9yYWdlIFx1OEJCMFx1NUZDNlx1MzAwMiAqL1xuICBjb25zdCBvbkRpdmlkZXJEb3duID0gKGU6IFJlYWN0LlBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IG9uTW92ZSA9IChldjogUG9pbnRlckV2ZW50KTogdm9pZCA9PiB7XG4gICAgICBjb25zdCB3aWR0aCA9IE1hdGgubWluKDkwMCwgTWF0aC5tYXgoMjgwLCB3aW5kb3cuaW5uZXJXaWR0aCAtIGV2LmNsaWVudFgpKVxuICAgICAgZnJhbWVUZW1wbGF0ZVNldCh3aWR0aClcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYy5jaGF0V2lkdGgnLCBTdHJpbmcod2lkdGgpKVxuICAgIH1cbiAgICBjb25zdCBvblVwID0gKCk6IHZvaWQgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApXG4gICAgfVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcClcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGRpc3Bvc2VkID0gZmFsc2VcbiAgICBjb25zdCBsb2FkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvc3RhdGU/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSwgeyBoZWFkZXJzOiB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0gfSlcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApXG4gICAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgICAgaWYgKCFkaXNwb3NlZCkge1xuICAgICAgICAgIHNldFN0YXRlKGRhdGEgYXMgV29ya3NwYWNlU3RhdGUpXG4gICAgICAgICAgc2V0TG9hZEVycm9yKG51bGwpXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICAgIGlmICghZGlzcG9zZWQpIHNldExvYWRFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgICB9XG4gICAgfVxuICAgIHZvaWQgbG9hZCgpXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IHZvaWQgbG9hZCgpIH0sIDQwMDApXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICB9XG4gIH0sIFtdKVxuXG4gIC8vIFx1OEZEQlx1NTE2NVx1NjNEMFx1NEVBNC9cdTdCMTRcdThCQjAvUmV2aWV3IFx1OTg3NVx1N0I3RVx1NjVGNlx1NjMwOVx1OTcwMFx1NjJDOVx1NTNENlx1RkYwOFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1NEY5RFx1OEQ1Nlx1NEYxQVx1OEJERFx1NURFNVx1NEY1Q1x1NTMzQVx1RkYwQ1x1OEY2RVx1OEJFMlx1NjVFMFx1NjEwRlx1NEU0OVx1RkYwOVx1MzAwMlxuICAvLyBcdTYzRDBcdTRFQTRcdTk4NzVcdTRFNUZcdTYyQzlcdTdCMTRcdThCQjBcdUZGMUFcdThGNkVcdTZCMjFcdTY3MkFcdTZEODhcdTUzMTZcdTY4MDdcdThCQjBcdTk3MDBcdTg5ODFcdTMwMENcdTRFMEFcdTZCMjEgQUkgXHU2MDNCXHU3RUQzXHU2NUY2XHU5NUY0XHUzMDBEXHUzMDAyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHRhYiA9PT0gJ2NvbW1pdHMnKSB7IHZvaWQgbG9hZENvbW1pdHMoKTsgdm9pZCBsb2FkTm90ZXMoKSB9XG4gICAgaWYgKHRhYiA9PT0gJ25vdGVzJykgeyB2b2lkIGxvYWROb3RlcygpOyB2b2lkIGxvYWRNZW1vcmllcygpOyBpZiAoY29tbWl0c0RhdGEgPT09IG51bGwpIHZvaWQgbG9hZENvbW1pdHMoKSB9XG4gICAgaWYgKHRhYiA9PT0gJ3JldmlldycpIHZvaWQgbG9hZElzc3VlcygpXG4gICAgaWYgKHRhYiA9PT0gJ2V4ZWN1dGlvbicpIHsgdm9pZCBsb2FkU2NoZWR1bGVkKCk7IGlmIChydW5EZXRhaWwgIT09IG51bGwpIHZvaWQgbG9hZFJ1bkRldGFpbChydW5EZXRhaWwucnVuLmlkKSB9XG4gICAgaWYgKHRhYiA9PT0gJ3NldHRpbmdzJyAmJiBtb2RlbFRpZXJzID09PSBudWxsKSB2b2lkIGxvYWRNb2RlbENvbmZpZygpXG4gIH0sIFt0YWIsIHByb3BzLnNlc3Npb25JZF0pXG5cbiAgY29uc3QgbG9hZE1vZGVsQ29uZmlnID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9tb2RlbC1jb25maWcnKVxuICAgICAgaWYgKCFyZXNwb25zZS5vaykgcmV0dXJuXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBzZXRNb2RlbFRpZXJzKChkYXRhIGFzIHsgdGllcnM6IFJlY29yZDxzdHJpbmcsIHsgcHJvdmlkZXI6IHN0cmluZzsgbW9kZWw6IHN0cmluZyB9PiB9KS50aWVycyA/PyB7fSlcbiAgICAgIHNldE1vZGVsT3B0aW9ucygoZGF0YSBhcyB7IG9wdGlvbnM6IEFycmF5PHsgcHJvdmlkZXI6IHN0cmluZzsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nIH0+IH0pLm9wdGlvbnMgPz8gW10pXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTZBMjFcdTU3OEJcdTkxNERcdTdGNkVcdTUyQTBcdThGN0RcdTU5MzFcdThEMjVcdTRFMERcdTYyNTNcdTY1QURcdTk4NzVcdTk3NjJcbiAgICB9XG4gIH1cblxuICBjb25zdCBzYXZlTW9kZWxDb25maWcgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKG1vZGVsVGllcnMgPT09IG51bGwpIHJldHVyblxuICAgIHNldE1vZGVsU2F2aW5nKHRydWUpXG4gICAgc2V0TW9kZWxTYXZlZChmYWxzZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbW9kZWwtY29uZmlnJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdGllcnM6IG1vZGVsVGllcnMgfSksXG4gICAgICB9KVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHNldE1vZGVsU2F2ZWQodHJ1ZSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHNldE1vZGVsU2F2ZWQoZmFsc2UpIH0sIDI1MDApXG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldE1vZGVsU2F2aW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlZnJlc2hTdGF0ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCByZWZyZXNoZWQgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvc3RhdGU/c2Vzc2lvbklkPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKSwgeyBoZWFkZXJzOiB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0gfSlcbiAgICBpZiAocmVmcmVzaGVkLm9rKSBzZXRTdGF0ZShhd2FpdCByZWZyZXNoZWQuanNvbigpIGFzIFdvcmtzcGFjZVN0YXRlKVxuICB9XG5cbiAgLyoqIFx1N0VERlx1NEUwMFx1NTJBOFx1NEY1Q1x1NjI2N1x1ODg0Q1x1NTY2OFx1RkYxQVBPU1QgXHU1QkJGXHU0RTNCIEFQSVx1RkYwOFx1NjQzQVx1NUUyNlx1NEYxQVx1OEJERCBpZCBcdTRGOUJcdTY3MERcdTUyQTFcdTdBRUZcdTVCOUFcdTRGNERcdTk4NzlcdTc2RUVcdTVERTVcdTRGNUNcdTUzM0FcdUZGMDlcdUZGMENcdThGOTNcdTUxRkFcdThGREJcdTdFRDNcdTY3OUNcdTk3NjJcdTY3N0ZcdUZGMENcdTVCOENcdTYyMTBcdTU0MEVcdTUyMzdcdTY1QjBcdTcyQjZcdTYwMDFcdTMwMDIgKi9cbiAgY29uc3QgcnVuQWN0aW9uID0gYXN5bmMgKG5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldEJ1c3kobmFtZSlcbiAgICBzZXRBY3Rpb25SZXN1bHQobnVsbClcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdChwYXRoLCBib2R5KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoYFx1MjcxNyAke1N0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpfWApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KGZvcm1hdEFjdGlvblJlc3VsdChkYXRhKSlcbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdChgXHUyNzE3ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWApXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJ1c3kobnVsbClcbiAgICB9XG4gIH1cblxuICBjb25zdCBydW5Cb290c3RyYXAgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0Qm9vdHN0cmFwcGluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ib290c3RyYXAnLCB7fSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0TG9hZEVycm9yKFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldExvYWRFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJvb3RzdHJhcHBpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29uZmlybU1lbW9yeSA9IGFzeW5jIChtZW1vcnlJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5L2NvbmZpcm0nLCB7IG1lbW9yeUlkIH0pXG4gICAgaWYgKG9rKSB7XG4gICAgICBzZXRTdGF0ZSgocHJldmlvdXMpID0+IHByZXZpb3VzID09PSBudWxsID8gcHJldmlvdXMgOiB7XG4gICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICBtZW1vcmllczogcHJldmlvdXMubWVtb3JpZXM/Lm1hcCgobWVtb3J5KSA9PiBtZW1vcnkuaWQgPT09IG1lbW9yeUlkID8geyAuLi5tZW1vcnksIGlzSHVtYW5Db25maXJtZWQ6IHRydWUsIHRydXRoTGV2ZWw6ICdmYWN0JyB9IDogbWVtb3J5KSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcHJvamVjdCA9IHN0YXRlPy5wcm9qZWN0ID8/IG51bGxcbiAgY29uc3QgYm9vdHN0cmFwID0gc3RhdGU/LmJvb3RzdHJhcCA/PyBudWxsXG4gIGNvbnN0IGNoYW5nZXMgPSBzdGF0ZT8uY2hhbmdlcyA/PyBbXVxuICBjb25zdCBydW5zID0gc3RhdGU/LnJ1bnMgPz8gW11cbiAgY29uc3QgdmVyaWZpY2F0aW9ucyA9IHN0YXRlPy52ZXJpZmljYXRpb25zID8/IFtdXG4gIGNvbnN0IGNvbmZpcm1lZCA9IHN0YXRlPy5jb25maXJtZWQgPz8gW11cbiAgY29uc3QgY29uY2VwdHMgPSBzdGF0ZT8uY29uY2VwdHMgPz8gW11cblxuICBjb25zdCB0YWJzOiBBcnJheTx7IGtleTogVGFiS2V5OyBsYWJlbDogc3RyaW5nIH0+ID0gW1xuICAgIHsga2V5OiAnY29tbWl0cycsIGxhYmVsOiB0KCd0YWIuY29tbWl0cycpIH0sXG4gICAgeyBrZXk6ICdvdmVydmlldycsIGxhYmVsOiB0KCd0YWIub3ZlcnZpZXcnKSB9LFxuICAgIHsga2V5OiAnZXhlY3V0aW9uJywgbGFiZWw6IHQoJ3RhYi5leGVjdXRpb24nKSB9LFxuICAgIHsga2V5OiAncmV2aWV3JywgbGFiZWw6IHQoJ3RhYi5yZXZpZXcnKSB9LFxuICAgIHsga2V5OiAnbm90ZXMnLCBsYWJlbDogdCgndGFiLm5vdGVzJykgfSxcbiAgICB7IGtleTogJ3NldHRpbmdzJywgbGFiZWw6IHQoJ3RhYi5zZXR0aW5ncycpIH0sXG4gIF1cblxuICAvKiogXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDXHU5NzYyXHU2NzdGXHVGRjA4XHU2MDNCXHU4OUM4XHU5ODc1XHU3QjdFXHU3Njg0XHU1RkVCXHU2Mzc3XHU1MkE4XHU0RjVDXHU1MTcxXHU3NTI4XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHJlc3VsdFBhbmVsID0gYWN0aW9uUmVzdWx0ICE9PSBudWxsXG4gICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KENhcmQsIHsgdGl0bGU6IHQoJ3Jlc3VsdC5wYW5lbCcpIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5yZXN1bHQgfSwgYWN0aW9uUmVzdWx0KSlcbiAgICA6IG51bGxcbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcbiAgLy8gXHU5ODc2XHU5MEU4XHVGRjFBXHU0RUQzXHU1RTkzXHU2ODBGICsgXHU2M0QwXHU0RUE0XHU1OTFBXHU5MDA5XHU0RTBCXHU2MkM5XHVGRjA4XHU3RUE2IDEvNSBcdTlBRDhcdTVFQTZcdUZGMDlcdUZGMUJcdTRFMEJcdTY1QjlcdTY3N0ZcdTU3NTdcdTUzNjBcdTUxNjhcdTVCQkRcdTMwMDJcbiAgY29uc3QgYWxsVGFyZ2V0czogQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgbWV0YTogc3RyaW5nOyBzaGE6IHN0cmluZyB9PiA9IFtdXG4gIGlmIChjb21taXRzRGF0YSAhPT0gbnVsbCkge1xuICAgIGlmICghY29tbWl0c0RhdGEud29ya2luZy5pc0NsZWFuKSB7XG4gICAgICBhbGxUYXJnZXRzLnB1c2goe1xuICAgICAgICBrZXk6ICd3b3JraW5nJyxcbiAgICAgICAgbGFiZWw6IGBcdTI1Q0YgJHt0KCdyZXBvLndvcmtpbmcnKX1cdUZGMDgke2NvbW1pdHNEYXRhLndvcmtpbmcuZmlsZUNvdW50fVx1RkYwOWAsXG4gICAgICAgIG1ldGE6IGNvbW1pdHNEYXRhLndvcmtpbmcuZmlsZXMuc2xpY2UoMCwgMykubWFwKChmaWxlKSA9PiBmaWxlLnBhdGguc3BsaXQoJy8nKS5wb3AoKSkuam9pbignLCAnKSxcbiAgICAgICAgc2hhOiAnd29ya2luZycsXG4gICAgICB9KVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGNvbW1pdCBvZiBjb21taXRzRGF0YS5jb21taXRzKSB7XG4gICAgICBjb25zdCBhZGRzID0gY29tbWl0LmZpbGVzLnJlZHVjZSgoc3VtLCBmaWxlKSA9PiBzdW0gKyBmaWxlLmFkZHMsIDApXG4gICAgICBjb25zdCBkZWxzID0gY29tbWl0LmZpbGVzLnJlZHVjZSgoc3VtLCBmaWxlKSA9PiBzdW0gKyBmaWxlLmRlbHMsIDApXG4gICAgICBhbGxUYXJnZXRzLnB1c2goe1xuICAgICAgICBrZXk6IGNvbW1pdC5zaGEsXG4gICAgICAgIGxhYmVsOiBjb21taXQuc3ViamVjdCxcbiAgICAgICAgbWV0YTogYCR7Y29tbWl0LnNob3J0SGFzaH0gXHUwMEI3ICR7Y29tbWl0LmF1dGhvcn0gXHUwMEI3ICR7bmV3IERhdGUoY29tbWl0LmRhdGUpLnRvTG9jYWxlU3RyaW5nKCl9IFx1MDBCNyArJHthZGRzfS8tJHtkZWxzfWAsXG4gICAgICAgIHNoYTogY29tbWl0LnNoYSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIGNvbnN0IHNob3J0TGFiZWwgPSAoc2hhOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGlmIChzaGEgPT09ICd3b3JraW5nJykgcmV0dXJuIHQoJ3JlcG8ud29ya2luZycpXG4gICAgY29uc3QgdGFyZ2V0ID0gYWxsVGFyZ2V0cy5maW5kKChlbnRyeSkgPT4gZW50cnkuc2hhID09PSBzaGEpXG4gICAgcmV0dXJuIGAkeyh0YXJnZXQ/Lm1ldGEuc3BsaXQoJyBcdTAwQjcgJylbMF0pID8/IHNoYS5zbGljZSgwLCA3KX0gJHt0YXJnZXQ/LmxhYmVsID8/ICcnfWAudHJpbSgpXG4gIH1cbiAgY29uc3QgZmlsdGVyZWRUYXJnZXRzID0gcGlja2VyRmlsdGVyLnRyaW0oKSA9PT0gJydcbiAgICA/IGFsbFRhcmdldHNcbiAgICA6IGFsbFRhcmdldHMuZmlsdGVyKChlbnRyeSkgPT4gKGVudHJ5LmxhYmVsICsgZW50cnkubWV0YSkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhwaWNrZXJGaWx0ZXIudHJpbSgpLnRvTG93ZXJDYXNlKCkpKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdThGNkVcdTZCMjFcdTgwNUFcdTdDN0JcdTRFMEVcdTY3MkFcdTZEODhcdTUzMTZcdTY4MDdcdThCQjAgXHUyNTAwXHUyNTAwIFx1ODA1QVx1N0M3Qlx1ODlDNFx1NTIxOVx1NEUwRVx1NjcwRFx1NTJBMVx1N0FFRiBjbHVzdGVyQ29tbWl0cyBcdTRFMDBcdTgxRjRcdUZGMDhcdTY1RjZcdTk1RjRcdTdBOTdcdTUzRTMgK1xuICAvLyBcdTY1ODdcdTRFRjZcdTk2RjZcdTkxQ0RcdTUzRTBcdUZGMENcdTg5QzEgY29tbWl0LXJvdW5kcy50c1x1RkYwOVx1RkYxQlx1NjcyQVx1NkQ4OFx1NTMxNiA9IFx1NEUwQVx1NkIyMSBBSSBcdTYwM0JcdTdFRDNcdTRFNEJcdTU0MEVcdTc2ODRcdTYzRDBcdTRFQTRcdTMwMDJcbiAgY29uc3QgY29tbWl0QnlTaGEgPSBuZXcgTWFwKChjb21taXRzRGF0YT8uY29tbWl0cyA/PyBbXSkubWFwKChjb21taXQpID0+IFtjb21taXQuc2hhLCBjb21taXRdKSlcbiAgY29uc3QgbGFzdFN1bW1hcnlBdCA9IG5vdGVzXG4gICAgLmZpbHRlcigobm90ZSkgPT4gbm90ZS5zaGEgPT09ICdzdW1tYXJ5JylcbiAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+IHJpZ2h0LmNyZWF0ZWRBdCAtIGxlZnQuY3JlYXRlZEF0KVswXT8uY3JlYXRlZEF0XG4gIGNvbnN0IGlzVW5kaWdlc3RlZCA9IChkYXRlOiBudW1iZXIpOiBib29sZWFuID0+IGxhc3RTdW1tYXJ5QXQgPT09IHVuZGVmaW5lZCB8fCBkYXRlID4gbGFzdFN1bW1hcnlBdFxuICBjb25zdCB1bmRpZ2VzdGVkQ291bnQgPSAoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pLmZpbHRlcigoY29tbWl0KSA9PiBpc1VuZGlnZXN0ZWQoY29tbWl0LmRhdGUpKS5sZW5ndGhcbiAgY29uc3QgY29tbWl0Um91bmRzID0gY2x1c3RlckludG9Sb3VuZHMoY29tbWl0c0RhdGE/LmNvbW1pdHMgPz8gW10pXG5cbiAgLyoqIFx1NEUwQlx1NjJDOVx1Njg0Nlx1NzY4NFx1NjNEMFx1NEVBNFx1ODg0Q1x1RkYwOFx1NTQyQlx1NjcyQVx1NkQ4OFx1NTMxNlx1NTcwNlx1NzBCOVx1RkYxQndvcmtpbmcgXHU2NzYxXHU3NkVFXHU0RTBEXHU2ODA3XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHJlbmRlclBpY2tlclJvdyA9IChlbnRyeTogeyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgbWV0YTogc3RyaW5nOyBzaGE6IHN0cmluZyB9KTogUmVhY3QuUmVhY3ROb2RlID0+IHtcbiAgICBjb25zdCBjb21taXQgPSBjb21taXRCeVNoYS5nZXQoZW50cnkuc2hhKVxuICAgIGNvbnN0IHVuZGlnZXN0ZWQgPSBjb21taXQgIT09IHVuZGVmaW5lZCAmJiBpc1VuZGlnZXN0ZWQoY29tbWl0LmRhdGUpXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAga2V5PXtlbnRyeS5rZXl9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcGFkZGluZzogJzdweCAxMnB4JywgY3Vyc29yOiAncG9pbnRlcicsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgYmFja2dyb3VuZDogc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKGVudHJ5LnNoYSkgPyAncmdiYSgzNyw5OSwyMzUsMC4wNyknIDogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgfX1cbiAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHRvZ2dsZVRhcmdldChlbnRyeS5zaGEpIH19XG4gICAgICA+XG4gICAgICAgIDxzcGFuIHN0eWxlPXt7IHdpZHRoOiAnMTRweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJywgZm9udFdlaWdodDogNzAwIH19PlxuICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoZW50cnkuc2hhKSA/ICdcdTI3MTMnIDogJyd9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAge3VuZGlnZXN0ZWQgJiYgKFxuICAgICAgICAgIDxzcGFuIHRpdGxlPXt0KCdwaWNrZXIudW5kaWdlc3RlZCcpfSBzdHlsZT17eyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSwgZm9udFNpemU6ICcxMHB4JywgZmxleFNocmluazogMCB9fT5cdTI1Q0Y8L3NwYW4+XG4gICAgICAgICl9XG4gICAgICAgIDxzcGFuIHN0eWxlPXt7IG1pbldpZHRoOiAwIH19PlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCwgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19PntlbnRyeS5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e2VudHJ5Lm1ldGF9PC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBjb25zdCBpbXBhY3RSaXNrQ29sb3IgPSB0aGVtZUF3YXJlVGV4dChpbXBhY3QgPT09IG51bGwgPyAnIzU3NjA2YScgOiAoUklTS19DT0xPUltpbXBhY3Qucmlza0xldmVsXSA/PyAnIzU3NjA2YScpKVxuXG4gIGNvbnN0IGNvbW1pdHNUYWIgPSAoXG4gICAgPD5cbiAgICAgIHsvKiBcdTRFRDNcdTVFOTNcdTY4MEYgKi99XG4gICAgICA8Q2FyZD5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyMyNTYzZWInKX0+e2NvbW1pdHNEYXRhPy5icmFuY2ggPz8gJ1x1MjAxNCd9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcgfX0+e2NvbW1pdHNEYXRhPy5yb290UGF0aCA/PyBwcm9qZWN0Py5yb290UGF0aCA/PyAnXHUyMDE0J308L3NwYW4+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkQ29tbWl0cygpIH19Pnt0KCdhY3Rpb24ucmVmcmVzaCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgIT09IG51bGx9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdzY2FuSGlzdG9yeScsICcvcHJvamVjdC1jb250cm9sL2FwaS9ib290c3RyYXAnLCB7IGluY2x1ZGVIaXN0b3J5OiB0cnVlLCBzdW1tYXJpemU6IHRydWUsIG1heENvbW1pdHM6IDMwIH0pIH19XG4gICAgICAgICAgPntidXN5ID09PSAnc2Nhbkhpc3RvcnknID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ3JlcG8uc2Nhbkhpc3RvcnknKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NhcmQ+XG4gICAgICB7LyogXHU2M0QwXHU0RUE0XHU1OTFBXHU5MDA5XHU0RTBCXHU2MkM5XHVGRjA4XHU3RDI3XHU1MUQxXHVGRjFCXHU5MDA5XHU0RTJEXHU1MTg1XHU1QkI5XHU1QjhDXHU2NTc0XHU1QzU1XHU3OTNBXHVGRjBDXHU1MTQxXHU4QkI4XHU4MUVBXHU3MTM2XHU2MzYyXHU4ODRDXHVGRjA5ICovfVxuICAgICAgPENhcmQgdGl0bGU9e3QoJ3BpY2tlci50aXRsZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCB3aWR0aDogJzEwMCUnLCB0ZXh0QWxpZ246ICdsZWZ0JywgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsIHdoaXRlU3BhY2U6ICdub3JtYWwnIH19XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldFBpY2tlck9wZW4oIXBpY2tlck9wZW4pIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWluV2lkdGg6IDAgfX0+XG4gICAgICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgICAgPyB0KCdwaWNrZXIucGxhY2Vob2xkZXInKVxuICAgICAgICAgICAgICAgIDogYCR7dCgncGlja2VyLnNlbGVjdGVkJyl9ICR7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aH1cdUZGMUEke3NlbGVjdGVkVGFyZ2V0cy5tYXAoc2hvcnRMYWJlbCkuam9pbignXHVGRjFCJyl9YH1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1hcmdpbkxlZnQ6ICc4cHgnLCBmbGV4U2hyaW5rOiAwIH19Plx1MjVCRTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICB7cGlja2VyT3BlbiAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnZml4ZWQnLCBpbnNldDogMCwgekluZGV4OiAyOSB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBpY2tlck9wZW4oZmFsc2UpIH19IC8+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAnY2FsYygxMDAlICsgNHB4KScsIGxlZnQ6IDAsIHJpZ2h0OiAwLCB6SW5kZXg6IDMwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsIGJveFNoYWRvdzogJzAgOHB4IDI0cHggcmdiYSgwLDAsMCwwLjEyKScsIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnOHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJywgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuaW5wdXR9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0KCdwaWNrZXIuZmlsdGVyJyl9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwaWNrZXJGaWx0ZXJ9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRQaWNrZXJGaWx0ZXIoZS50YXJnZXQudmFsdWUpIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyBzZXRTZWxlY3RlZFRhcmdldHMoW10pIH19Pnt0KCdwaWNrZXIuY2xlYXInKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1heEhlaWdodDogNDIwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICAgIHtwaWNrZXJGaWx0ZXIudHJpbSgpID09PSAnJyA/IChcbiAgICAgICAgICAgICAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBcdTZENEZcdTg5QzhcdTg5QzZcdTU2RkVcdUZGMUF3b3JraW5nIFx1Njc2MVx1NzZFRSArIFx1NjMwOVx1OEY2RVx1NkIyMVx1NTIwNlx1N0VDNFx1NzY4NFx1NjNEMFx1NEVBNFx1RkYwOFx1NTM1NVx1NjNEMFx1NEVBNFx1OEY2RVx1NEUwRFx1NjYzRVx1NzkzQVx1N0VDNFx1NTkzNFx1RkYwQ1x1OTA3Rlx1NTE0RFx1NTY2QVx1OTdGM1x1RkYwOVx1MzAwMlxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVzOiBSZWFjdC5SZWFjdE5vZGVbXSA9IFtdXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd29ya2luZyA9IGFsbFRhcmdldHMuZmluZCgoZW50cnkpID0+IGVudHJ5LnNoYSA9PT0gJ3dvcmtpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgIGlmICh3b3JraW5nICE9PSB1bmRlZmluZWQpIG5vZGVzLnB1c2gocmVuZGVyUGlja2VyUm93KHdvcmtpbmcpKVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ5U2hhID0gbmV3IE1hcChhbGxUYXJnZXRzLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LnNoYSAhPT0gJ3dvcmtpbmcnKS5tYXAoKGVudHJ5KSA9PiBbZW50cnkuc2hhLCBlbnRyeV0pKVxuICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdFJvdW5kcy5mb3JFYWNoKChyb3VuZCwgcm91bmRJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW50cmllcyA9IHJvdW5kLmNvbW1pdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgoY29tbWl0KSA9PiBieVNoYS5nZXQoY29tbWl0LnNoYSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKGVudHJ5KTogZW50cnkgaXMgeyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgbWV0YTogc3RyaW5nOyBzaGE6IHN0cmluZyB9ID0+IGVudHJ5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cmllcy5sZW5ndGggPT09IDApIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJpZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzLnB1c2gocmVuZGVyUGlja2VyUm93KGVudHJpZXNbMF0hKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGFzID0gZW50cmllcy5tYXAoKGVudHJ5KSA9PiBlbnRyeS5zaGEpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbGxTZWxlY3RlZCA9IHNoYXMuZXZlcnkoKHNoYSkgPT4gc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHNoYSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17YHJvdW5kLSR7cm91bmRJbmRleH1gfSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc4cHgnLCBwYWRkaW5nOiAnNnB4IDEycHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDMsIHJnYmEoNSw1LDUsMC4wNikpJywgZm9udFNpemU6ICcxMXB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdUQ4M0RcdURERDMge3Qocm91bmRJbmRleCA9PT0gMCA/ICdwaWNrZXIucm91bmRMYXRlc3QnIDogJ3BpY2tlci5yb3VuZCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhyb3VuZEluZGV4ICsgMSkpfSBcdTAwQjcge1N0cmluZyhlbnRyaWVzLmxlbmd0aCl9IHt0KCdyZXBvLmNvbW1pdHMnKX0gXHUwMEI3IHtuZXcgRGF0ZShyb3VuZC5maXJzdEF0KS50b0xvY2FsZURhdGVTdHJpbmcoKX1cdTIwMTN7bmV3IERhdGUocm91bmQubGFzdEF0KS50b0xvY2FsZURhdGVTdHJpbmcoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2VsZWN0Um91bmQoc2hhcykgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWxsU2VsZWN0ZWQgPyB0KCdwaWNrZXIucm91bmRDbGVhcicpIDogdCgncGlja2VyLnJvdW5kU2VsZWN0Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PixcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykgbm9kZXMucHVzaChyZW5kZXJQaWNrZXJSb3coZW50cnkpKVxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVzXG4gICAgICAgICAgICAgICAgICAgIH0pKClcbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkVGFyZ2V0cy5tYXAoKGVudHJ5KSA9PiByZW5kZXJQaWNrZXJSb3coZW50cnkpKVxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIHsocGlja2VyRmlsdGVyLnRyaW0oKSA9PT0gJycgPyBhbGxUYXJnZXRzIDogZmlsdGVyZWRUYXJnZXRzKS5sZW5ndGggPT09IDAgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncGlja2VyLm5vTWF0Y2gnKX08L2Rpdj59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Ub3A6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgncGlja2VyLmhpbnQnKX08L3NwYW4+XG4gICAgICAgICAge3VuZGlnZXN0ZWRDb3VudCA+IDAgJiYgKFxuICAgICAgICAgICAgPHNwYW4gdGl0bGU9e3QoJ3BpY2tlci51bmRpZ2VzdGVkJyl9IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2Q5NzcwNicpIH19PlxuICAgICAgICAgICAgICBcdTI1Q0Yge3QoJ3BpY2tlci51bmRpZ2VzdGVkQ291bnQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcodW5kaWdlc3RlZENvdW50KSl9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7ZGV0YWlsTG9hZGluZyAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjZGNkY2FhJyl9Pnt0KCdkZXRhaWwuYWlMb2FkaW5nJyl9PC9zcGFuPn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NhcmQ+XG5cbiAgICAgIHtjb21taXRzRXJyb3IgIT09IG51bGwgJiYgPENhcmQ+PGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncmVwby5sb2FkRmFpbGVkJyl9OiB7Y29tbWl0c0Vycm9yfTwvZGl2PjwvQ2FyZD59XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCAmJiA8Q2FyZD48ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdkZXRhaWwucGljaycpfTwvZGl2PjwvQ2FyZD59XG5cbiAgICAgIHsvKiBcdTVERTVcdTRGNUNcdThGNkVcdTZCMjFcdTUzRDlcdTRFOEJcdUZGMUFcdTU5MUFcdTYzRDBcdTRFQTRcdTY1NzRcdTRGNTNcdTg5RTNcdThCRkIgKi99XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmZpbHRlcigodGFyZ2V0KSA9PiB0YXJnZXQgIT09ICd3b3JraW5nJykubGVuZ3RoID49IDIgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17J1x1RDgzRFx1RENENiAnICsgdCgnbmFycmF0aXZlLnRpdGxlJyl9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiBuYXJyYXRpdmUgPT09IG51bGwgPyAnMCcgOiAnOHB4JyB9fT5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtuYXJyYXRpdmVCdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZE5hcnJhdGl2ZSgpIH19PlxuICAgICAgICAgICAgICB7bmFycmF0aXZlQnVzeSA/IHQoJ25hcnJhdGl2ZS5ydW5uaW5nJykgOiAnXHUyNzI4ICcgKyB0KCduYXJyYXRpdmUuZ2VuZXJhdGUnKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAge25hcnJhdGl2ZSAhPT0gbnVsbCAmJiBuYXJyYXRpdmUuY2FjaGVkICYmIChcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ2NhY2hlLmhpdCcpfXtuYXJyYXRpdmUuZ2VuZXJhdGVkQXQgIT09IHVuZGVmaW5lZCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShuYXJyYXRpdmUuZ2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ308L3NwYW4+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge25hcnJhdGl2ZSAhPT0gbnVsbCAmJiByZW5kZXJDb3N0QmFkZ2UobmFycmF0aXZlLmNvc3RVc2QsIHQoJ2Nvc3QudG9vbHRpcCcpKX1cbiAgICAgICAgICAgIHtuYXJyYXRpdmUgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17bmFycmF0aXZlQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWROYXJyYXRpdmUodHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtuYXJyYXRpdmVFcnJvciAhPT0gJycgJiYgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuZW1wdHksIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2QxMjQyZicpIH19PntuYXJyYXRpdmVFcnJvcn08L2Rpdj59XG4gICAgICAgICAge25hcnJhdGl2ZSAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnIH19PntyZW5kZXJTdHJ1Y3R1cmVkQ29udGVudChuYXJyYXRpdmUubmFycmF0aXZlKX08L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuXG4gICAgICB7LyogXHU2QkNGXHU2NzYxXHU5MDA5XHU0RTJEXHU2M0QwXHU0RUE0XHU3Njg0IEFJIFx1ODlFM1x1OEJGQiAqL31cbiAgICAgIHtzZWxlY3RlZFRhcmdldHMubWFwKCh0YXJnZXQpID0+IHtcbiAgICAgICAgY29uc3QgZCA9IGRldGFpbHNbdGFyZ2V0XVxuICAgICAgICBjb25zdCBsYWJlbCA9IHRhcmdldCA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiAoZD8uY29tbWl0Py5tZXNzYWdlID8/IHRhcmdldC5zbGljZSgwLCA4KSlcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Q2FyZCBrZXk9e2BkLSR7dGFyZ2V0fWB9IHRpdGxlPXtgXHVEODNEXHVERDBEICR7bGFiZWx9JHt0YXJnZXQgIT09ICd3b3JraW5nJyA/IGBcdUZGMDgke3RhcmdldC5zbGljZSgwLCA4KX1cdUZGMDlgIDogJyd9YH0+XG4gICAgICAgICAgICB7ZCAhPT0gdW5kZWZpbmVkICYmIChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzQ2FjaGVkID09PSB0cnVlICYmIChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e3QoJ2NhY2hlLmhpdCcpfXtkLmFuYWx5c2lzR2VuZXJhdGVkQXQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUoZC5hbmFseXNpc0dlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge3JlbmRlckNvc3RCYWRnZShkLmFuYWx5c2lzQ29zdFVzZCwgdCgnY29zdC50b29sdGlwJykgKyAoZC5hbmFseXNpc1Rva2VucyA/IGBcdUZGMDhpbiAke2QuYW5hbHlzaXNUb2tlbnMuaW5wdXR9IC8gb3V0ICR7ZC5hbmFseXNpc1Rva2Vucy5vdXRwdXR9IHRva2Vuc1x1RkYwOWAgOiAnJykpfVxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkRGV0YWlsKHRhcmdldCwgdHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XG4gICAgICAgICAgICAgICAgICB0aXRsZT17dCgnZGV0YWlsLnNhdmVOb3RlSGludCcpfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGEgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/ICd3b3JraW5nJyA6IHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB2b2lkIHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzJywge1xuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBgJHt0KCdkZXRhaWwuc2F2ZU5vdGVUaXRsZScpfVx1RkYxQSR7KGQuY29tbWl0Py5tZXNzYWdlID8/IHRhcmdldCkuc2xpY2UoMCwgNjApfWAsXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDogW2BcdTMwMTBcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDhcdTMwMTFcXG4ke2QuYW5hbHlzaXMud2hhdH1gLCBgXHUzMDEwXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxXHUzMDExXFxuJHsoZC5hbmFseXNpcy5sb2dpYyA/PyBbXSkuam9pbignXHVGRjFCJyl9YCwgYFx1MzAxMFx1OThDRVx1OTY2OVx1NzBCOVx1MzAxMVxcbiR7KGQuYW5hbHlzaXMucmlza3MgPz8gW10pLmpvaW4oJ1x1RkYxQicpfWBdLmZpbHRlcigoYmxvY2spID0+ICFibG9jay5lbmRzV2l0aCgnXHUzMDExXFxuJykpLmpvaW4oJ1xcblxcbicpLFxuICAgICAgICAgICAgICAgICAgICAgIHNoYSwgdGFnczogJ1x1NjgzOFx1NjdFNScsXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHsgb2sgfSkgPT4geyBzZXRBY3Rpb25SZXN1bHQob2sgPyAnXHUyNzEzIFx1NURGMlx1NUI1OFx1NEUzQVx1N0IxNFx1OEJCMFx1RkYwOFx1N0IxNFx1OEJCMFx1OTg3NVx1NTNFRlx1NjdFNVx1NzcwQlx1RkYwOScgOiAnXHUyNzE3IFx1NEZERFx1NUI1OFx1NTkzMVx1OEQyNScpIDsgaWYgKG9rKSB2b2lkIGxvYWROb3RlcygpIH0pXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cdUQ4M0RcdURDQkUge3QoJ2RldGFpbC5zYXZlTm90ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ2RldGFpbC5zYXZlTWVtb3J5SGludCcpfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGEgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/IHVuZGVmaW5lZCA6IHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB2b2lkIHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeScsIHtcbiAgICAgICAgICAgICAgICAgICAgICBtZW1vcnlUeXBlOiAncmlza19ob3RzcG90Jywgc291cmNlVGFnOiAncmV2aWV3JywgYmFzaXNTaGE6IHNoYSxcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogYFx1NjgzOFx1NjdFNVx1N0VEM1x1OEJCQVx1RkYxQSR7KGQuY29tbWl0Py5tZXNzYWdlID8/IHRhcmdldCkuc2xpY2UoMCwgNjApfWAsXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDogW2QuYW5hbHlzaXMud2hhdCwgKGQuYW5hbHlzaXMucmlza3MgPz8gW10pLmpvaW4oJ1x1RkYxQicpXS5maWx0ZXIoKHBhcnQpID0+IHBhcnQgIT09ICcnKS5qb2luKCdcXG4tLS1cXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoeyBvayB9KSA9PiB7IHNldEFjdGlvblJlc3VsdChvayA/ICdcdTI3MTMgXHU1REYyXHU2Qzg5XHU2REMwXHU0RTNBXHU4QkIwXHU1RkM2XHVGRjA4XHU1Rjg1XHU3ODZFXHU4QkE0XHU5NjFGXHU1MjE3XHVGRjA5JyA6ICdcdTI3MTcgXHU0RkREXHU1QjU4XHU1OTMxXHU4RDI1Jyk7IGlmIChvaykgdm9pZCBsb2FkTWVtb3JpZXMoKSB9KVxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XHVEODNFXHVEREUwIHt0KCdkZXRhaWwuc2F2ZU1lbW9yeScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7ZCA9PT0gdW5kZWZpbmVkID8gKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdkZXRhaWwuYWlMb2FkaW5nJyl9PC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIHtkLmNvbW1pdCAhPT0gbnVsbCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuY29tbWl0TWV0YX0+e2QuY29tbWl0LmF1dGhvcn0gXHUwMEI3IHtuZXcgRGF0ZShkLmNvbW1pdC5kYXRlKS50b0xvY2FsZVN0cmluZygpfSBcdTAwQjcge2QuZmlsZXMubGVuZ3RofSB7dCgnZGV0YWlsLmZpbGVzJyl9IFx1MDBCNyAre2QuaW5zZXJ0aW9uc30vLXtkLmRlbGV0aW9uc308L2Rpdj59XG4gICAgICAgICAgICAgICAge2QuYW5hbHlzaXMud2hhdCAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBtYXJnaW5Ub3A6ICc4cHgnIH19Pnt0KCdkZXRhaWwud2hhdCcpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMud2hhdH0+e2QuYW5hbHlzaXMud2hhdH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2QuYW5hbHlzaXMubG9naWMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2VjdGlvblRpdGxlfT57dCgnZGV0YWlsLmxvZ2ljJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLmxvZ2ljLm1hcCgoc3RlcCwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17c3R5bGVzLmxvZ2ljU3RlcH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsIGZvbnRXZWlnaHQ6IDYwMCB9fT57aSArIDF9Ljwvc3Bhbj57c3RlcH1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLnJpc2tzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBtYXJnaW5Ub3A6ICc2cHgnIH19Pnt0KCdkZXRhaWwucmlzaycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5yaXNrcy5tYXAoKHJpc2ssIGkpID0+IDxkaXYga2V5PXtpfSBzdHlsZT17eyAuLi5zdHlsZXMucmlza0l0ZW0sIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzlhNjcwMCcpIH19Plx1MjZBMCB7cmVuZGVyV2l0aFBlZWsocmlzayl9PC9kaXY+KX1cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgey8qIFx1NjU4N1x1NEVGNlx1NkUwNVx1NTM1NSArIFx1OTAxMFx1NjU4N1x1NEVGNlx1OUFEOFx1NEVBRVx1NUJGOVx1NkJENCAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzEwcHgnIH19Pnt0KCdkZXRhaWwuZmlsZXMnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIHtkLmZpbGVzLm1hcCgoZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3RhcmdldH18JHtmaWxlLnBhdGh9YFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoID0gZmlsZURpZmZzW2tleV1cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17a2V5fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4Jywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57ZmlsZS5wYXRofTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjMWE3ZjM3JyksIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19Pit7ZmlsZS5hZGRzfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2YyMjJlJyksIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19Pi17ZmlsZS5kZWxzfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZEZpbGVEaWZmKHRhcmdldCwgZmlsZS5wYXRoKSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3BhdGNoID09PSB1bmRlZmluZWQgPyB0KCdkaWZmLnNob3cnKSA6IHQoJ2RpZmYuaGlkZScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3BhdGNoICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2Ake2tleX0tZGlmZmB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49ezR9IHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgcGFkZGluZzogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPERpZmZWaWV3IHBhdGNoPXtwYXRjaH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgIClcbiAgICAgIH0pfVxuXG4gICAgICB7LyogXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHVGRjFBXHU2MzA5XHU5NEFFICsgXHU5OENFXHU5NjY5XHU2Nzg0XHU2MjEwICsgXHU1OTI3XHU1NkZFICsgXHU1RjcxXHU1NENEXHU3MEI5XHU2NjBFXHU3RUM2ICsgXHU4QkIwXHU1RkM2XHU4MDU0XHU1MkE4ICovfVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgPENhcmQgdGl0bGU9e3QoJ2RldGFpbC5pbXBhY3QnKX0+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2ltcGFjdExvYWRpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkSW1wYWN0KCkgfX0+XG4gICAgICAgICAgICB7aW1wYWN0TG9hZGluZyA/IHQoJ2RldGFpbC5pbXBhY3RMb2FkaW5nJykgOiB0KCdkZXRhaWwuaW1wYWN0Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiBpbXBhY3QuZXhwbGFuYXRpb25zQ2FjaGVkID09PSB0cnVlICYmIChcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5iYWRnZSgnIzhiOGI4YicpLCBtYXJnaW5MZWZ0OiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAge3QoJ2NhY2hlLmhpdCcpfXtpbXBhY3QuZ2VuZXJhdGVkQXQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUoaW1wYWN0LmdlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIHJlbmRlckNvc3RCYWRnZShpbXBhY3QuZXhwbGFuYXRpb25zQ29zdFVzZCwgdCgnY29zdC50b29sdGlwJykpfVxuICAgICAgICAgIHtpbXBhY3QgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBtYXJnaW5MZWZ0OiAnOHB4JywgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IGRpc2FibGVkPXtpbXBhY3RMb2FkaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZEltcGFjdCh0cnVlKSB9fT5cbiAgICAgICAgICAgICAge3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzEwcHgnLCBtYXJnaW46ICcxMHB4IDAgNHB4JywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoaW1wYWN0Umlza0NvbG9yKSwgZm9udFNpemU6ICcxM3B4JywgcGFkZGluZzogJzNweCAxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIHt0KCdpbXBhY3QucmlzaycpfToge2ltcGFjdC5yaXNrTGV2ZWx9XHVGRjA4e2ltcGFjdC5yaXNrU2NvcmV9XHVGRjA5XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIHtpbXBhY3Qua2V5Q2hhbmdlUG9pbnRzICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LmtleUNoYW5nZVBvaW50cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnIzlhNjcwMCcpIH19Plx1MjZBMCB7dCgnaW1wYWN0LmtleVBvaW50cycpfToge2ltcGFjdC5rZXlDaGFuZ2VQb2ludHMubWFwKChmaWxlKSA9PiBmaWxlLnNwbGl0KCcvJykucG9wKCkpLmpvaW4oJ1x1MzAwMScpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge2ltcGFjdC5yaXNrRmFjdG9ycyAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5yaXNrRmFjdG9ycy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnNlY3Rpb25UaXRsZX0+e3QoJ2ltcGFjdC5mYWN0b3JzJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogJzJweCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICB7aW1wYWN0LnJpc2tGYWN0b3JzLm1hcCgoZmFjdG9yLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgZm9udFNpemU6ICcxMnB4JywgcGFkZGluZzogJzNweCA4cHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJywgYm9yZGVyUmFkaXVzOiAnNHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntmYWN0b3IudGV4dH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogaW1wYWN0Umlza0NvbG9yLCBmb250V2VpZ2h0OiA2MDAgfX0+K3tmYWN0b3IucG9pbnRzfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPEltcGFjdEdyYXBoIGRhdGE9e2ltcGFjdH0gdD17dH0gLz5cbiAgICAgICAgICAgICAge2ltcGFjdC5sZXZlbHMubGVuZ3RoID09PSAwICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2ltcGFjdC5ub25lJyl9PC9kaXY+fVxuICAgICAgICAgICAgICB7LyogXHU1MUZEXHU2NTcwXHU3RUE3XHU1RjcxXHU1NENEXHVGRjFBXHU2NzJDXHU2QjIxXHU0RkVFXHU2NTM5XHU0RTg2XHU1NEVBXHU0RTlCXHU1MUZEXHU2NTcwXHUzMDAxXHU2Q0UyXHU1M0NBXHU0RTg2XHU4QzAxXHU3Njg0XHU1NEVBXHU0RTlCXHU1MUZEXHU2NTcwXHUzMDAxXHU4QzAzXHU3NTI4XHU3MEI5XHU1NzI4XHU1NEVBICovfVxuICAgICAgICAgICAgICB7aW1wYWN0LmZ1bmN0aW9uSW1wYWN0ICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LmZ1bmN0aW9uSW1wYWN0Lmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzEycHgnIH19Pnt0KCdpbXBhY3QuZnVuY3Rpb25zJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogJzhweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpbXBhY3QuZnVuY3Rpb25JbXBhY3QubWFwKChlbnRyeSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeS5zeW1ib2x9IHN0eWxlPXt7IGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMTBweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjZDk3NzA2Jyl9PntlbnRyeS5zeW1ib2x9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMubGFiZWwsIG1hcmdpbkxlZnQ6ICc4cHgnIH19PntlbnRyeS5kZWZpbmVkSW59PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkucm9sZSAhPT0gdW5kZWZpbmVkICYmIGVudHJ5LnJvbGUgIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCwgbWFyZ2luVG9wOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBkaXNwbGF5OiAnaW5saW5lJywgbWFyZ2luSW5saW5lRW5kOiAnNnB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Pnt0KCdpbXBhY3QuZnVuY1JvbGUnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LnJvbGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5jaGFuZ2UgIT09IHVuZGVmaW5lZCAmJiBlbnRyeS5jaGFuZ2UgIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBkaXNwbGF5OiAnaW5saW5lJywgbWFyZ2luSW5saW5lRW5kOiAnNnB4JywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjOWE2NzAwJykgfX0+e3QoJ2ltcGFjdC5mdW5jQ2hhbmdlJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5jaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5pbXBhY3QgIT09IHVuZGVmaW5lZCAmJiBlbnRyeS5pbXBhY3QgIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCwgbWFyZ2luQm90dG9tOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBkaXNwbGF5OiAnaW5saW5lJywgbWFyZ2luSW5saW5lRW5kOiAnNnB4JywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjY2U5MTc4JykgfX0+e3QoJ2ltcGFjdC5mdW5jQ2FsbGVycycpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuaW1wYWN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2FsbGVycy5tYXAoKGNhbGxlciwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgLi4uc3R5bGVzLmxvZ2ljU3RlcCwgbWFyZ2luVG9wOiAnM3B4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWVBd2FyZVRleHQoJyNkOTc3MDYnKSB9fT5cdTIxQjM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUgZG90dGVkJyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgb3BlblBlZWsoY2FsbGVyLmZpbGUsIE51bWJlcihjYWxsZXIubGluZSkpIH19PntjYWxsZXIuZmlsZX06e2NhbGxlci5saW5lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHUyMDE0IHtjYWxsZXIuc25pcHBldC5zbGljZSgwLCA4MCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7aW1wYWN0LmZ1bmN0aW9uSW1wYWN0ICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LmZ1bmN0aW9uSW1wYWN0Lmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnaW1wYWN0LmZ1bmN0aW9uc05vbmUnKX08L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge2ltcGFjdC5tZW1vcmllcyAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5tZW1vcmllcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnLCBib3JkZXI6ICcxcHggZGFzaGVkIHJnYmEoMzcsOTksMjM1LDAuMzUpJywgYm9yZGVyUmFkaXVzOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Pnt0KCdpbXBhY3QubWVtb3J5Jyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleFdyYXA6ICd3cmFwJywgZ2FwOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAge2ltcGFjdC5tZW1vcmllcy5tYXAoKG1lbW9yeSwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGtleT17aX0gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzI1NjNlYicpfT57bWVtb3J5LnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTVcdUZGMUFcdTdFRDNcdThCQkEgKyBcdTdFRDNcdTY3ODRcdTUzMTZcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTUgKi99XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17dCgnZGV0YWlsLm9wdGltYWxpdHknKX0+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e3Jldmlld0xvYWRpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkUmV2aWV3cygpIH19PlxuICAgICAgICAgICAge3Jldmlld0xvYWRpbmcgPyB0KCdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnKSA6IHQoJ2RldGFpbC5vcHRpbWFsaXR5Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAge3NlbGVjdGVkVGFyZ2V0cy5tYXAoKHRhcmdldCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgciA9IHJldmlld3NbdGFyZ2V0XVxuICAgICAgICAgICAgaWYgKHIgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGxcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IHRhcmdldC5zbGljZSgwLCA4KVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2ByLSR7dGFyZ2V0fWB9IHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICAgICAgICAgIHtyLmNhY2hlZCA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e3QoJ2NhY2hlLmhpdCcpfXtyLmdlbmVyYXRlZEF0ID8gJyBcdTAwQjcgJyArIG5ldyBEYXRlKHIuZ2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAge3JlbmRlckNvc3RCYWRnZShyLmNvc3RVc2QsIHQoJ2Nvc3QudG9vbHRpcCcpKX1cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkUmV2aWV3cyh0cnVlKSB9fT57dCgnY2FjaGUucmVnZW5lcmF0ZScpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtyLnZlcmRpY3QgIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQsIGJhY2tncm91bmQ6ICdyZ2JhKDM3LDk5LDIzNSwwLjA1KScsIGJvcmRlcjogJzFweCBzb2xpZCByZ2JhKDM3LDk5LDIzNSwwLjIpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAxMHB4JyB9fT57ci52ZXJkaWN0fTwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge3IuaXNzdWVMaXN0ICE9PSB1bmRlZmluZWQgJiYgci5pc3N1ZUxpc3QubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0cj57WydyZXZpZXcuY29sLnNldmVyaXR5JywgJ3Jldmlldy5jb2wuY2F0ZWdvcnknLCAncmV2aWV3LmNvbC50aXRsZScsICdyZXZpZXcuY29sLmV2aWRlbmNlJywgJ3Jldmlldy5jb2wuZml4J10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgIHtyLmlzc3VlTGlzdC5tYXAoKGlzc3VlLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoaXNzdWUuc2V2ZXJpdHkgPT09ICdjcml0aWNhbCcgPyAnI2YxNGM0YycgOiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2hpZ2gnID8gJyNjZTkxNzgnIDogaXNzdWUuc2V2ZXJpdHkgPT09ICdtZWRpdW0nID8gJyNkY2RjYWEnIDogJyM1NjljZDYnKX0+e2lzc3VlLnNldmVyaXR5fTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2lzc3VlLmNhdGVnb3J5fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXNzdWUudGl0bGV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+e2lzc3VlLmV2aWRlbmNlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXNzdWUuZml4fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncmV2aWV3LmNsZWFuJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfSl9XG4gICAgICAgICAge3Jldmlld0xvYWRpbmcgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJyl9PC9kaXY+fVxuICAgICAgICAgIHshcmV2aWV3TG9hZGluZyAmJiBzZWxlY3RlZFRhcmdldHMuZXZlcnkoKHRhcmdldCkgPT4gcmV2aWV3c1t0YXJnZXRdID09PSB1bmRlZmluZWQpICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3Jldmlldy5oaW50Jyl9PC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cbiAgICA8Lz5cbiAgKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdThCQkVcdTdGNkVcdTk4NzVcdTdCN0UgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IFRJRVJfTEFCRUxTOiBBcnJheTx7IGtleTogc3RyaW5nOyB6aDogc3RyaW5nOyBkZXNjOiBzdHJpbmcgfT4gPSBbXG4gICAgeyBrZXk6ICdzdGFuZGFyZCcsIHpoOiAnXHU4OUUzXHU4QkZCIC8gXHU1MUZEXHU2NTcwXHU1RjcxXHU1NENEXHU4QkY0XHU2NjBFJywgZGVzYzogJ1x1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1NzY4NCBBSSBcdTg5RTNcdThCRkJcdTMwMDFcdTVGNzFcdTU0Q0RcdTUyMDZcdTY3OTAnIH0sXG4gICAgeyBrZXk6ICdyZWFzb25pbmcnLCB6aDogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNSAvIFx1NjI2N1x1ODg0Q1x1OEJBMVx1NTIxMicsIGRlc2M6ICdcdThCQzRcdTVCQTFcdTMwMDFcdThCQTFcdTUyMTJcdTc1MUZcdTYyMTBcdTMwMDFBSSBcdTVCNjZcdTRFNjBcdTYwM0JcdTdFRDMnIH0sXG4gICAgeyBrZXk6ICdmYXN0Jywgemg6ICdcdTUzODZcdTUzRjJcdThGN0JcdTY3OTAnLCBkZXNjOiAnXHU2MjZCXHU2M0NGXHU1Mzg2XHU1M0YyXHU2NUY2XHU3Njg0XHU5MDEwXHU2M0QwXHU0RUE0XHU0RTAwXHU1M0U1XHU4QkREJyB9LFxuICAgIHsga2V5OiAndmVyaWZpZXInLCB6aDogJ1x1OUE4Q1x1NjUzNicsIGRlc2M6ICdcdTY1MzlcdTUyQThcdTlBOENcdTY1MzZcdTc2ODQgQUkgXHU1OTBEXHU2ODM4JyB9LFxuICBdXG5cbiAgY29uc3Qgc2V0dGluZ3NUYWIgPSAoXG4gICAgPD5cbiAgICAgIHsvKiBcdTZBMjFcdTU3OEJcdTUyMDZcdTkxNERcdUZGMUFcdTUzRUZcdTg5QzZcdTUzMTZcdTUyMDdcdTYzNjJcdTU0MDRcdTRFRkJcdTUyQTFcdTc1MjhcdTc2ODRcdTZBMjFcdTU3OEJcdUZGMENcdTRGRERcdTVCNThcdTUzNzNcdTc1MUZcdTY1NDggKi99XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnbW9kZWwudGl0bGUnKX0+XG4gICAgICAgIHttb2RlbFRpZXJzID09PSBudWxsID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ21vZGVsLmxvYWRpbmcnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAge1RJRVJfTEFCRUxTLm1hcCgodGllcikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gbW9kZWxUaWVyc1t0aWVyLmtleV1cbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjdXJyZW50ID8gY3VycmVudC5wcm92aWRlciArICcvJyArIGN1cnJlbnQubW9kZWwgOiAnJ1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXt0aWVyLmtleX0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICcxMHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtaW5XaWR0aDogMTUwLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAgfX0+e3RpZXIuemh9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogMjQwIH19XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgdiA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHYgPT09ICcnKSB7IHNldE1vZGVsVGllcnMoeyAuLi5tb2RlbFRpZXJzLCBbdGllci5rZXldOiB7IHByb3ZpZGVyOiAnJywgbW9kZWw6ICcnIH0gfSk7IHJldHVybiB9XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3Byb3ZpZGVyLCAuLi5yZXN0XSA9IHYuc3BsaXQoJy8nKVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gcmVzdC5qb2luKCcvJylcbiAgICAgICAgICAgICAgICAgICAgICBzZXRNb2RlbFRpZXJzKHsgLi4ubW9kZWxUaWVycywgW3RpZXIua2V5XTogeyBwcm92aWRlciwgbW9kZWwgfSB9KVxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e3QoJ21vZGVsLmZvbGxvd0NoYXQnKX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAge21vZGVsT3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9IHZhbHVlPXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAge29wdGlvbi5wcm92aWRlcn0gLyB7b3B0aW9uLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dGllci5kZXNjfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpblRvcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXttb2RlbFNhdmluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIHNhdmVNb2RlbENvbmZpZygpIH19PlxuICAgICAgICAgICAgICAgIHttb2RlbFNhdmluZyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdtb2RlbC5zYXZlJyl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICB7bW9kZWxTYXZlZCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNGVjOWIwJyl9Pnt0KCdtb2RlbC5zYXZlZCcpfTwvc3Bhbj59XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdtb2RlbC5oaW50Jyl9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8ZGl2IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXRlcnRpYXJ5LCAjOWNhM2FmKScsIHBhZGRpbmc6ICc4cHggMCcgfX0+XG4gICAgICAgIGRzaC1wcm9qZWN0LWNvbnRyb2wgdntzdGF0ZT8ucGx1Z2luVmVyc2lvbiA/PyAnPyd9XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKVxuXG4gIGNvbnN0IG92ZXJ2aWV3VGFiID0gKFxuICAgIDw+XG4gICAgICA8Q2FyZD5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2Jvb3RzdHJhcHBpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5Cb290c3RyYXAoKSB9fT5cbiAgICAgICAgICAgIHtib290c3RyYXBwaW5nID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi5yZXNjYW4nKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbH0gb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignYW5hbHl6ZScsICcvcHJvamVjdC1jb250cm9sL2FwaS9hbmFseXplJywge30pIH19PlxuICAgICAgICAgICAge2J1c3kgPT09ICdhbmFseXplJyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24uYW5hbHl6ZScpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtidXN5ICE9PSBudWxsfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCd2ZXJpZnknLCAnL3Byb2plY3QtY29udHJvbC9hcGkvdmVyaWZ5Jywge30pIH19PlxuICAgICAgICAgICAge2J1c3kgPT09ICd2ZXJpZnknID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi52ZXJpZnknKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NhcmQ+XG4gICAgICB7cmVzdWx0UGFuZWx9XG4gICAgICB7cHJvamVjdCA9PT0gbnVsbCA/IChcbiAgICAgICAgPENhcmQ+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTNweCcsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+e3QoJ3N0YXRlLm5vUHJvamVjdCcpfTwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3N0YXRlLm5vUHJvamVjdEhpbnQnKX08L2Rpdj5cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKSA6IChcbiAgICAgICAgPENhcmQgdGl0bGU9e2Ake3QoJ3N0YXRlLnByb2plY3QnKX1cdUZGMUEke3Byb2plY3QubmFtZX1gfT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9PlJvb3Q8L3NwYW4+e3Byb2plY3Qucm9vdFBhdGh9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtib290c3RyYXAgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLnRlY2hTdGFjaycpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHtib290c3RyYXAudGVjaFN0YWNrLm1hcCgodGVjaCkgPT4gPHNwYW4ga2V5PXt0ZWNofSBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNGVjOWIwJyl9Pnt0ZWNofTwvc3Bhbj4pfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS5zeW1ib2xzJyl9PC9zcGFuPntTdHJpbmcoYm9vdHN0cmFwLnN5bWJvbHNDb3VudCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS5tYW5pZmVzdHMnKX08L3NwYW4+e1N0cmluZyhib290c3RyYXAubWFuaWZlc3RGaWxlcy5sZW5ndGgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUuZXZpZGVuY2UnKX08L3NwYW4+e1N0cmluZyhzdGF0ZT8uZXZpZGVuY2VDb3VudCA/PyAwKX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Ub3A6ICc4cHgnIH19Pntib290c3RyYXAuc3VtbWFyeX08L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnY29uZmlybWVkLnRpdGxlJyl9PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgPHRleHRhcmVhIHJvd3M9ezJ9IHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHBsYWNlaG9sZGVyPXt0KCdjb25maXJtZWQudGV4dCcpfSB2YWx1ZT17Y29uZmlybWVkVGV4dH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENvbmZpcm1lZFRleHQoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdjb25maXJtZWQucGF0aHMnKX0gdmFsdWU9e2NvbmZpcm1lZFBhdGhzfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q29uZmlybWVkUGF0aHMoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5idXR0b259XG4gICAgICAgICAgICBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBjb25maXJtZWRUZXh0ID09PSAnJ31cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2FkZENvbmZpcm1lZCcsICcvcHJvamVjdC1jb250cm9sL2FwaS9jb25maXJtZWQnLCB7IHR5cGU6ICdjb25zdHJhaW50JywgdGV4dDogY29uZmlybWVkVGV4dCwgZm9yYmlkZGVuUGF0aHM6IGNvbmZpcm1lZFBhdGhzLnNwbGl0KCcsJykubWFwKChwYXRoKSA9PiBwYXRoLnRyaW0oKSkuZmlsdGVyKChwYXRoKSA9PiBwYXRoICE9PSAnJykgfSkudGhlbigoKSA9PiB7IHNldENvbmZpcm1lZFRleHQoJycpOyBzZXRDb25maXJtZWRQYXRocygnJykgfSkgfX1cbiAgICAgICAgICA+e2J1c3kgPT09ICdhZGRDb25maXJtZWQnID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2NvbmZpcm1lZC5hZGQnKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtjb25maXJtZWQubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2NvbmZpcm1lZC5ub25lJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7Y29uZmlybWVkLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e2l0ZW0uaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNjNTg2YzAnKX0+e2l0ZW0udHlwZX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXRlbS50ZXh0fTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2l0ZW0uZm9yYmlkZGVuUGF0aHMuam9pbignLCAnKSB8fCAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbigncmVtb3ZlQ29uZmlybWVkJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbmZpcm1lZC9yZW1vdmUnLCB7IGlkOiBpdGVtLmlkIH0pIH19XG4gICAgICAgICAgICAgICAgICAgID5cdTI3MTU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnYWN0aW9uLmNyZWF0ZUNoYW5nZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnZm9ybS5jaGFuZ2VUaXRsZScpfSB2YWx1ZT17Y2hhbmdlVGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDaGFuZ2VUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8dGV4dGFyZWEgcm93cz17Mn0gc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0uY2hhbmdlRGVzYycpfSB2YWx1ZT17Y2hhbmdlRGVzY30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENoYW5nZURlc2MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5idXR0b259XG4gICAgICAgICAgICBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBjaGFuZ2VUaXRsZSA9PT0gJyd9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdjcmVhdGVDaGFuZ2UnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY2hhbmdlcycsIHsgdGl0bGU6IGNoYW5nZVRpdGxlLCBkZXNjcmlwdGlvbjogY2hhbmdlRGVzYyB9KS50aGVuKCgpID0+IHsgc2V0Q2hhbmdlVGl0bGUoJycpOyBzZXRDaGFuZ2VEZXNjKCcnKSB9KSB9fVxuICAgICAgICAgID57YnVzeSA9PT0gJ2NyZWF0ZUNoYW5nZScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLmNyZWF0ZUNoYW5nZScpfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2NoYW5nZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3N0YXRlLm5vQ2hhbmdlcycpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ2NoYW5nZXMuY29sLnRpdGxlJywgJ2NoYW5nZXMuY29sLnR5cGUnLCAnY2hhbmdlcy5jb2wuc3RhdHVzJywgJ2NoYW5nZXMuY29sLnVwZGF0ZWQnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge2NoYW5nZXMubWFwKChjaGFuZ2UpID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtjaGFuZ2UuaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntjaGFuZ2UudGl0bGV9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKGNoYW5nZS5zdGF0dXMgPT09ICdjb21wbGV0ZWQnID8gJyM0ZWM5YjAnIDogJyM1NjljZDYnKX0+e2NoYW5nZS5zdGF0dXN9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2Zvcm1hdFRpbWUoY2hhbmdlLnVwZGF0ZWRBdCl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6ICdcdTUyMjBcdTk2NjRcdThGRDlcdTRFMkFcdTUzRDhcdTY2RjRcdTRFRkJcdTUyQTFcdUZGMUYnLCBtZXNzYWdlOiAnXHUzMDBDJyArIGNoYW5nZS50aXRsZSArICdcdTMwMERcdTUzQ0FcdTUxNzZcdTUxNjhcdTkwRThcdTYyNjdcdTg4NENcdThCQjBcdTVGNTVcdTMwMDFcdThCQTFcdTUyMTJcdTMwMDFcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTVDMDZcdTg4QUJcdTZDMzhcdTRFNDVcdTUyMjBcdTk2NjRcdTMwMDInLCBkYW5nZXI6IHRydWUsIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHJ1bkFjdGlvbignZGVsZXRlQ2hhbmdlJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NoYW5nZXMvZGVsZXRlJywgeyBpZDogY2hhbmdlLmlkIH0pIH0gfSkgfX0+XHUyNzE1PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgIDwvPlxuICApXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDM1x1OTg3NVx1N0I3RVx1RkYxQVx1OTg3NVx1OTc2Mlx1NzZGNFx1NjNBNVx1NTIxQlx1NUVGQVx1NUU3Nlx1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYwQ1x1ODA0QVx1NTkyOVx1NTNFQVx1NjYyRlx1NTNFNlx1NEUwMFx1NzlDRFx1NTE2NVx1NTNFMyBcdTI1MDBcdTI1MDBcbiAgY29uc3QgZXhlY3V0aW9uVGFiID0gKFxuICAgIDw+XG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JywgZmxleFdyYXA6ICd3cmFwJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzEwcHgnLCBwYWRkaW5nOiAnN3B4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wNiknLCBib3JkZXI6ICcxcHggc29saWQgcmdiYSgzNyw5OSwyMzUsMC4yKScsIGZvbnRTaXplOiAnMTFweCcgfX0+XG4gICAgICAgIDxiPlx1MjQ2MCB7dCgnZXhlYy5mbG93Q3JlYXRlJyl9PC9iPjxzcGFuPlx1MjE5Mjwvc3Bhbj5cbiAgICAgICAgPGI+XHUyNDYxIHt0KCdleGVjLmZsb3dPcmNoZXN0cmF0ZScpfTwvYj48c3Bhbj5cdTIxOTI8L3NwYW4+XG4gICAgICAgIDxiPlx1MjQ2MiB7dCgnZXhlYy5mbG93UnVuJyl9PC9iPjxzcGFuPlx1MjE5Mjwvc3Bhbj5cbiAgICAgICAgPGI+XHUyNDYzIHt0KCdleGVjLmZsb3dNZW1vcnknKX08L2I+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdleGVjLmNyZWF0ZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1JbmxpbmV9PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIGZsZXg6IDEsIG1pbldpZHRoOiAyMDAgfX0gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybVRpdGxlJyl9IHZhbHVlPXtleGVjVGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFeGVjVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nIH19IHZhbHVlPXtleGVjTW9kZWx9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFeGVjTW9kZWwoZS50YXJnZXQudmFsdWUpIH19IHRpdGxlPXt0KCdwbGFuLm1vZGVsRGVmYXVsdCcpfT5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj57dCgnZXhlYy5tb2RlbERlZmF1bHQnKX08L29wdGlvbj5cbiAgICAgICAgICAgIHsobW9kZWxPcHRpb25zID8/IFtdKS5tYXAoKG9wdGlvbikgPT4gPG9wdGlvbiBrZXk9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0gdmFsdWU9e29wdGlvbi5wcm92aWRlciArICcvJyArIG9wdGlvbi5pZH0+e29wdGlvbi5wcm92aWRlcn0ve29wdGlvbi5pZH08L29wdGlvbj4pfVxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSByb3dzPXszfSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtRGVzYycpfSB2YWx1ZT17ZXhlY0Rlc2N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFeGVjRGVzYyhlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuYWN0aW9uUm93fT5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtidXN5ICE9PSBudWxsIHx8IGV4ZWNUaXRsZS50cmltKCkgPT09ICcnIHx8IGV4ZWNEZXNjLnRyaW0oKSA9PT0gJyd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzdGFydFJ1bigpIH19PlxuICAgICAgICAgICAgICB7YnVzeSA9PT0gJ3N0YXJ0UnVuJyA/IHQoJ2V4ZWMucGxhbm5pbmcnKSA6IHQoJ2V4ZWMuc3RhcnQnKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ2V4ZWMuY3JlYXRlSGludCcpfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NhcmQ+XG4gICAgICB7cmVzdWx0UGFuZWx9XG4gICAgICB7cGxhbkNvbmZpcm0gIT09IG51bGwgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17dCgncGxhbi50aXRsZScpfT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Cb3R0b206ICc4cHgnIH19Pnt0KCdwbGFuLmhpbnQnKX08L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxuICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRyPntbJ3BsYW4uY29sLnN0ZXAnLCAncGxhbi5jb2wucm9sZScsICdwbGFuLmNvbC5tb2RlbCcsICdwbGFuLmNvbC5wb2xpY3knLCAncGxhbi5jb2wuZW5hYmxlZCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICB7cGxhbkNvbmZpcm0uc3RlcHMubWFwKChzdGVwLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPHRyIGtleT17c3RlcC5pZH0gc3R5bGU9e3sgb3BhY2l0eTogc3RlcC5lbmFibGVkID8gMSA6IDAuNDUgfX0+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIG1pbldpZHRoOiAyMjAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAgfX0+e2luZGV4ICsgMX0uIHtzdGVwLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3N0ZXAuZGVzY3JpcHRpb24uc2xpY2UoMCwgMTIwKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICB7c3RlcC50YXJnZXRGaWxlcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknIH19PntzdGVwLnRhcmdldEZpbGVzLmpvaW4oJywgJykuc2xpY2UoMCwgMTIwKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDZweCcgfX0gdmFsdWU9e3N0ZXAucm9sZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRQbGFuQ29uZmlybSh7IC4uLnBsYW5Db25maXJtLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMubWFwKChpdGVtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4uaXRlbSwgcm9sZTogZS50YXJnZXQudmFsdWUgfSA6IGl0ZW0pIH0pIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge1snYW5hbHlzaXMnLCAncGxhbm5pbmcnLCAnY29kaW5nJywgJ29wcycsICd2ZXJpZmljYXRpb24nXS5tYXAoKHJvbGUpID0+IDxvcHRpb24ga2V5PXtyb2xlfSB2YWx1ZT17cm9sZX0+e1JPTEVfTEFCRUxTW3JvbGVdID8/IHJvbGV9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJywgcGFkZGluZzogJzNweCA2cHgnIH19IHZhbHVlPXtzdGVwLm1vZGVsUHJvdmlkZXIgKyAnLycgKyBzdGVwLm1vZGVsSWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3Byb3ZpZGVyLCBtb2RlbF0gPSBlLnRhcmdldC52YWx1ZS5zcGxpdCgnLycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFBsYW5Db25maXJtKHsgLi4ucGxhbkNvbmZpcm0sIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcy5tYXAoKGl0ZW0sIGkpID0+IGkgPT09IGluZGV4ID8geyAuLi5pdGVtLCBtb2RlbFByb3ZpZGVyOiBwcm92aWRlciA/PyAnJywgbW9kZWxJZDogbW9kZWwgPz8gJycgfSA6IGl0ZW0pIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIvXCI+e3QoJ3BsYW4ubW9kZWxEZWZhdWx0Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bW9kZWxPcHRpb25zLm1hcCgob3B0aW9uKSA9PiA8b3B0aW9uIGtleT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfSB2YWx1ZT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfT57b3B0aW9uLnByb3ZpZGVyfS97b3B0aW9uLmlkfTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggNnB4JyB9fSB2YWx1ZT17c3RlcC5mYWlsdXJlUG9saWN5fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFBsYW5Db25maXJtKHsgLi4ucGxhbkNvbmZpcm0sIHN0ZXBzOiBwbGFuQ29uZmlybS5zdGVwcy5tYXAoKGl0ZW0sIGkpID0+IGkgPT09IGluZGV4ID8geyAuLi5pdGVtLCBmYWlsdXJlUG9saWN5OiBlLnRhcmdldC52YWx1ZSB9IDogaXRlbSkgfSkgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoUE9MSUNZX0xBQkVMUykubWFwKChbdmFsdWUsIGxhYmVsXSkgPT4gPG9wdGlvbiBrZXk9e3ZhbHVlfSB2YWx1ZT17dmFsdWV9PntsYWJlbH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9e3N0ZXAuZW5hYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRQbGFuQ29uZmlybSh7IC4uLnBsYW5Db25maXJtLCBzdGVwczogcGxhbkNvbmZpcm0uc3RlcHMubWFwKChpdGVtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4uaXRlbSwgZW5hYmxlZDogZS50YXJnZXQuY2hlY2tlZCB9IDogaXRlbSkgfSkgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBtYXJnaW5Ub3A6ICcxMHB4JyB9fT5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtwbGFuQnVzeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxhdW5jaFBsYW4odHJ1ZSkgfX0+e3BsYW5CdXN5ID8gJ1x1MjAyNicgOiB0KCdwbGFuLmxhdW5jaEVkaXRlZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e3BsYW5CdXN5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbGF1bmNoUGxhbihmYWxzZSkgfX0+e3QoJ3BsYW4ubGF1bmNoRGlyZWN0Jyl9PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17cGxhbkJ1c3l9IG9uQ2xpY2s9eygpID0+IHsgc2V0UGxhbkNvbmZpcm0obnVsbCkgfX0+e3QoJ3BsYW4uZGlzY2FyZCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuICAgICAgPENhcmQ+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdleGVjLmF0dGVtcHRzJyl9PC9zcGFuPntTdHJpbmcoc3RhdGU/LmF0dGVtcHRzQ291bnQgPz8gMCl9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3J1bnMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3N0YXRlLm5vUnVucycpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+e1snZXhlYy5jb2wuY2hhbmdlJywgJ2V4ZWMuY29sLnN0ZXBzJywgJ2V4ZWMuY29sLnN0YXR1cycsICdleGVjLmNvbC5zdGFydGVkJywgJ2V4ZWMuY29sLmNvc3QnLCAnZXhlYy5jb2wuZGV0YWlsJ10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtydW5zLm1hcCgocnVuKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17cnVuLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57KGNoYW5nZXMuZmluZCgoY2hhbmdlKSA9PiBjaGFuZ2UuaWQgPT09IHJ1bi5jaGFuZ2VJZCk/LnRpdGxlKSA/PyBydW4uY2hhbmdlSWR9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57cnVuLnN0ZXBzVG90YWwgPyAocnVuLnN0ZXBzRG9uZSA/PyAwKSArICcvJyArIHJ1bi5zdGVwc1RvdGFsIDogJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShydW4uc3RhdHVzID09PSAnc3VjY2VlZGVkJyB8fCBydW4uc3RhdHVzID09PSAnY29tcGxldGVkJyA/ICcjNGVjOWIwJyA6IHJ1bi5zdGF0dXMgPT09ICdmYWlsZWQnID8gJyNmMTRjNGMnIDogcnVuLnN0YXR1cyA9PT0gJ3BhdXNlZCcgPyAnI2Q5NzcwNicgOiAnI2RjZGNhYScpfT57UlVOX1NUQVRVU19MQUJFTFNbcnVuLnN0YXR1c10gPz8gcnVuLnN0YXR1c308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIHtydW4uY3VycmVudFN0ZXAgIT09IG51bGwgJiYgcnVuLmN1cnJlbnRTdGVwICE9PSB1bmRlZmluZWQgJiYgcnVuLnN0YXR1cyA9PT0gJ3J1bm5pbmcnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXhXaWR0aDogMTYwLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+e3J1bi5jdXJyZW50U3RlcH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2Zvcm1hdFRpbWUocnVuLnN0YXJ0ZWRBdCl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57cnVuLmNvc3RVc2QgIT09IHVuZGVmaW5lZCA/ICckJyArIHJ1bi5jb3N0VXNkLnRvRml4ZWQoNCkgOiAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJ1bkRldGFpbChydW4uaWQpIH19PntydW5EZXRhaWw/LnJ1bi5pZCA9PT0gcnVuLmlkID8gdCgncGxhbi5yZWZyZXNoRGV0YWlsJykgOiB0KCdwbGFuLnZpZXdEZXRhaWwnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgICB7cnVuRGV0YWlsICE9PSBudWxsICYmIChcbiAgICAgICAgPENhcmQgdGl0bGU9e3QoJ3BsYW4uZGV0YWlsVGl0bGUnKSArICcgXHUwMEI3ICcgKyBydW5EZXRhaWwucnVuLmNoYW5nZVRpdGxlfT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnc3VjY2VlZGVkJyB8fCBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgPyAnIzRlYzliMCcgOiBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ2ZhaWxlZCcgPyAnI2YxNGM0YycgOiBydW5EZXRhaWwucnVuLnN0YXR1cyA9PT0gJ3BhdXNlZCcgPyAnI2Q5NzcwNicgOiAnI2RjZGNhYScpfT57UlVOX1NUQVRVU19MQUJFTFNbcnVuRGV0YWlsLnJ1bi5zdGF0dXNdID8/IHJ1bkRldGFpbC5ydW4uc3RhdHVzfTwvc3Bhbj5cbiAgICAgICAgICAgIHtydW5EZXRhaWwucnVuLmVycm9yICE9PSBudWxsICYmIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiB0aGVtZUF3YXJlVGV4dCgnI2QxMjQyZicpIH19PntydW5EZXRhaWwucnVuLmVycm9yLm1lc3NhZ2V9PC9zcGFuPn1cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkUnVuRGV0YWlsKHJ1bkRldGFpbC5ydW4uaWQpIH19Pnt0KCdwbGFuLnJlZnJlc2hEZXRhaWwnKX08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0UnVuRGV0YWlsKG51bGwpIH19Pnt0KCdwbGFuLmNsb3NlRGV0YWlsJyl9PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge3J1bkRldGFpbC5ydW4uc3RhdHVzID09PSAncGF1c2VkJyAmJiBydW5EZXRhaWwucnVuLnBhdXNlUG9pbnQgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnOHB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBiYWNrZ3JvdW5kOiAncmdiYSgyMTcsMTE5LDYsMC4wOCknLCBib3JkZXI6ICcxcHggc29saWQgcmdiYSgyMTcsMTE5LDYsMC4zNSknLCBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCwgZm9udFNpemU6ICcxMnB4JyB9fT5cdTIzRjgge3QoJ3BsYW4ucGF1c2VkQmFubmVyJyl9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3J1bkRldGFpbC5ydW4ucGF1c2VQb2ludC5yZWFzb259PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJ1dHRvbiwgcGFkZGluZzogJzNweCAxMHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcmVzdW1lUnVuKHJ1bkRldGFpbC5ydW4uaWQsICdjb250aW51ZScpIH19Pnt0KCdwbGFuLnJlc3VtZVJldHJ5Jyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnM3B4IDEwcHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCByZXN1bWVSdW4ocnVuRGV0YWlsLnJ1bi5pZCwgJ3NraXAtY3VycmVudCcpIH19Pnt0KCdwbGFuLnJlc3VtZVNraXAnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHsocnVuRGV0YWlsLnJ1bi5zdGF0dXMgPT09ICdmYWlsZWQnIHx8IHJ1bkRldGFpbC5ydW4uc3RhdHVzID09PSAnaW50ZXJydXB0ZWQnKSAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJ1dHRvbiwgcGFkZGluZzogJzNweCAxMHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcmVzdW1lUnVuKHJ1bkRldGFpbC5ydW4uaWQsICdjb250aW51ZScpIH19Pnt0KCdwbGFuLnJlc3VtZUZhaWxlZCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93WDogJ2F1dG8nIH19PlxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ3BsYW4uY29sLnN0ZXAnLCAncGxhbi5jb2wucm9sZScsICdwbGFuLmNvbC5tb2RlbCcsICdleGVjLmNvbC5zdGF0dXMnLCAncGxhbi5jb2wuYXR0ZW1wdHMnLCAnZXhlYy5jb2wuY29zdCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7cnVuRGV0YWlsLnN0ZXBzLm1hcCgoc3RlcCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtzdGVwLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj57aW5kZXggKyAxfS4ge3N0ZXAudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtzdGVwLmNsYWltZWRPdXRjb21lICE9PSBudWxsICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXhXaWR0aDogMzIwLCB3aGl0ZVNwYWNlOiAnbm9ybWFsJyB9fT57c3RlcC5jbGFpbWVkT3V0Y29tZS5zbGljZSgwLCAxNjApfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCdyZ2JhKDg2LDE1NiwyMTQsMC4yNSknKX0+e1JPTEVfTEFCRUxTW3N0ZXAucm9sZV0gPz8gc3RlcC5yb2xlfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udFNpemU6ICcxMXB4JyB9fT57c3RlcC5tb2RlbCA/PyAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2Uoc3RlcC52ZXJpZmllZCA/ICcjNGVjOWIwJyA6IHN0ZXAuc3RhdHVzID09PSAnZmFpbGVkJyA/ICcjZjE0YzRjJyA6IHN0ZXAuc3RhdHVzID09PSAnc2tpcHBlZCcgPyAnIzhiOTQ5ZScgOiAnI2RjZGNhYScpfT57U1RFUF9TVEFUVVNfTEFCRUxTW3N0ZXAuc3RhdHVzXSA/PyBzdGVwLnN0YXR1c308L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57U3RyaW5nKHN0ZXAuYXR0ZW1wdHNDb3VudCl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57c3RlcC5jb3N0VXNkID4gMCA/ICckJyArIHN0ZXAuY29zdFVzZC50b0ZpeGVkKDQpIDogJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICcxMHB4JywgYm9yZGVyOiAnMXB4IGRhc2hlZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsIGJvcmRlclJhZGl1czogJzhweCcsIHBhZGRpbmc6ICc4cHggMTJweCcgfX0+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICc0cHgnIH19Pnt0KCdwbGFuLmNvbnRleHRUaXRsZScpfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5wcm9qZWN0RGlnZXN0fVxuICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5icmFuY2ggIT09IG51bGwgPyBgIFx1MDBCNyAke3QoJ3BsYW4uYnJhbmNoJyl9ICR7cnVuRGV0YWlsLmNvbnRleHQuYnJhbmNofWAgOiAnJ31cbiAgICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuaGVhZFNoYSAhPT0gbnVsbCA/IGAgXHUwMEI3IEhFQUQgJHtydW5EZXRhaWwuY29udGV4dC5oZWFkU2hhLnNsaWNlKDAsIDgpfWAgOiAnJ31cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5pbmplY3RlZE1lbW9yaWVzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCB9fT57dCgncGxhbi5pbmplY3RlZE1lbW9yaWVzJyl9XHVGRjFBPC9zcGFuPlxuICAgICAgICAgICAgICAgICAge3J1bkRldGFpbC5jb250ZXh0LmluamVjdGVkTWVtb3JpZXMubWFwKChtZW1vcnkpID0+IDxzcGFuIGtleT17bWVtb3J5LmlkfSBzdHlsZT17c3R5bGVzLmJhZGdlKCdyZ2JhKDc4LDIwMSwxNzYsMC4yKScpfT57bWVtb3J5LnRpdGxlfTwvc3Bhbj4pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7cnVuRGV0YWlsLmNvbnRleHQuZGVjaXNpb25Mb2cubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6ICdpbmhlcml0JyB9fT57dCgncGxhbi5kZWNpc2lvbkxvZycpfVx1RkYxQTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHtydW5EZXRhaWwuY29udGV4dC5kZWNpc2lvbkxvZy5zbGljZSgtNikubWFwKChlbnRyeSwgZW50cnlJbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZW50cnlJbmRleH0+XHUwMEI3IFt7ZW50cnkua2luZH1dIHtlbnRyeS5kZXRhaWx9PC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG4gICAgICA8Q2FyZFxuICAgICAgICB0aXRsZT17XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY3Vyc29yOiAncG9pbnRlcicsIHVzZXJTZWxlY3Q6ICdub25lJyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFNjaGVkT3Blbighc2NoZWRPcGVuKSB9fT5cbiAgICAgICAgICAgIHtzY2hlZE9wZW4gPyAnXHUyNUJFICcgOiAnXHUyNUI4ICd9e3QoJ3NjaGVkLnRpdGxlJyl9XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMubGFiZWwsIG1hcmdpbkxlZnQ6ICc4cHgnIH19Pnsoc2NoZWR1bGVkRGF0YSA/PyBbXSkubGVuZ3RoID4gMCA/IFN0cmluZygoc2NoZWR1bGVkRGF0YSA/PyBbXSkubGVuZ3RoKSArICcgXHU0RTJBJyA6ICcnfTwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIH1cbiAgICAgID5cbiAgICAgICAge3NjaGVkT3BlbiAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtSW5saW5lfT5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCBmbGV4OiAxLCBtaW5XaWR0aDogMTYwIH19IHBsYWNlaG9sZGVyPXt0KCdzY2hlZC5mb3JtTmFtZScpfSB2YWx1ZT17c2NoZWROYW1lfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWROYW1lKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLnNlbGVjdCwgd2lkdGg6ICdhdXRvJyB9fSB2YWx1ZT17c2NoZWRUeXBlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2NoZWRUeXBlKGUudGFyZ2V0LnZhbHVlKSB9fT5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZXZpZXdcIj57dCgnc2NoZWQudHlwZVJldmlldycpfTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInN1bW1hcnlcIj57dCgnc2NoZWQudHlwZVN1bW1hcnknKX08L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJydW5cIj57dCgnc2NoZWQudHlwZVJ1bicpfTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInN5bmNcIj57dCgnc2NoZWQudHlwZVN5bmMnKX08L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCB3aWR0aDogMTIwIH19IHBsYWNlaG9sZGVyPXt0KCdzY2hlZC5mb3JtSW50ZXJ2YWwnKX0gdmFsdWU9e3NjaGVkSW50ZXJ2YWx9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZEludGVydmFsKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIHtzY2hlZFR5cGUgPT09ICdydW4nICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtVGl0bGUnKX0gdmFsdWU9e3NjaGVkVGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRTY2hlZFRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcm93cz17Mn0gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybURlc2MnKX0gdmFsdWU9e3NjaGVkRGVzY30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldFNjaGVkRGVzYyhlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e3NjaGVkTmFtZS50cmltKCkgPT09ICcnfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYWRkU2NoZWR1bGVkKCkgfX0+e3QoJ3NjaGVkLmFkZCcpfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT57dCgnc2NoZWQuaGludCcpfTwvZGl2PlxuICAgICAgICB7KHNjaGVkdWxlZERhdGEgPz8gW10pLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdzY2hlZC5lbXB0eScpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgb3ZlcmZsb3dYOiAnYXV0bycgfX0+XG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+e1snc2NoZWQuY29sLm5hbWUnLCAnc2NoZWQuY29sLnR5cGUnLCAnc2NoZWQuY29sLmludGVydmFsJywgJ3NjaGVkLmNvbC5uZXh0JywgJ3NjaGVkLmNvbC5sYXN0UmVzdWx0JywgJ3NjaGVkLmNvbC5hY3Rpb25zJ10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHsoc2NoZWR1bGVkRGF0YSA/PyBbXSkubWFwKCh0YXNrKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17dGFzay5pZH0gc3R5bGU9e3sgb3BhY2l0eTogdGFzay5lbmFibGVkID8gMSA6IDAuNDUgfX0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3Rhc2submFtZX17dGFzay50aXRsZSAhPT0gJycgPyA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cdUZGMDh7dGFzay50aXRsZX1cdUZGMDk8L3NwYW4+IDogbnVsbH08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UodGFzay50eXBlID09PSAncmV2aWV3JyA/ICcjNTY5Y2Q2JyA6IHRhc2sudHlwZSA9PT0gJ3N1bW1hcnknID8gJyM0ZWM5YjAnIDogJyNkN2JhN2QnKX0+e3Rhc2sudHlwZSA9PT0gJ3JldmlldycgPyB0KCdzY2hlZC50eXBlUmV2aWV3JykgOiB0YXNrLnR5cGUgPT09ICdzdW1tYXJ5JyA/IHQoJ3NjaGVkLnR5cGVTdW1tYXJ5JykgOiB0KCdzY2hlZC50eXBlUnVuJyl9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3Rhc2suaW50ZXJ2YWxNaW51dGVzID49IDE0NDAgPyBNYXRoLnJvdW5kKHRhc2suaW50ZXJ2YWxNaW51dGVzIC8gMTQ0MCAqIDEwKSAvIDEwICsgdCgnc2NoZWQuZGF5JykgOiB0YXNrLmludGVydmFsTWludXRlcyA+PSA2MCA/IE1hdGgucm91bmQodGFzay5pbnRlcnZhbE1pbnV0ZXMgLyA2MCAqIDEwKSAvIDEwICsgdCgnc2NoZWQuaG91cicpIDogdGFzay5pbnRlcnZhbE1pbnV0ZXMgKyB0KCdzY2hlZC5taW51dGUnKX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pnt0YXNrLmVuYWJsZWQgPyBmb3JtYXRUaW1lKHRhc2submV4dER1ZUF0KSA6ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWF4V2lkdGg6IDIyMCwgd2hpdGVTcGFjZTogJ25vcm1hbCcgfX0+e3Rhc2subGFzdFJlc3VsdCB8fCAodGFzay5sYXN0UnVuQXQgIT09IG51bGwgPyBmb3JtYXRUaW1lKHRhc2subGFzdFJ1bkF0KSA6ICdcdTIwMTQnKX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc2NoZWR1bGVkQWN0aW9uKCd1cGRhdGUnLCB7IGlkOiB0YXNrLmlkLCBlbmFibGVkOiAhdGFzay5lbmFibGVkIH0pIH19Pnt0YXNrLmVuYWJsZWQgPyB0KCdzY2hlZC5kaXNhYmxlJykgOiB0KCdzY2hlZC5lbmFibGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc2NoZWR1bGVkQWN0aW9uKCdydW4nLCB7IGlkOiB0YXNrLmlkIH0pIH19Pnt0KCdzY2hlZC5ydW5Ob3cnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogJ1x1NTIyMFx1OTY2NFx1OEZEOVx1NEUyQVx1NEY4Qlx1ODg0Q1x1NEVGQlx1NTJBMVx1RkYxRicsIG1lc3NhZ2U6ICdcdTMwMEMnICsgdGFzay5uYW1lICsgJ1x1MzAwRFx1NUMwNlx1ODhBQlx1NkMzOFx1NEU0NVx1NTIyMFx1OTY2NFx1MzAwMicsIGRhbmdlcjogdHJ1ZSwgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgc2NoZWR1bGVkQWN0aW9uKCdkZWxldGUnLCB7IGlkOiB0YXNrLmlkIH0pIH0gfSkgfX0+XHUyNzE1PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgPC8+XG4gIClcblxuICAvLyBcdTI1MDBcdTI1MDAgXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHU5ODc1XHU3QjdFIFx1MjUwMFx1MjUwMFxuICBjb25zdCBub3Rlc1RhYiA9IChcbiAgICA8PlxuICAgICAgey8qIFx1MjUwMFx1MjUwMCBcdTdCMTRcdThCQjBcdUZGMUFcdTUzNjFcdTcyNDdcdTVGMEZcdTk2MDVcdThCRkIgKyBcdTU5MUFcdTg4NENcdTdGMTZcdThGOTEgKyBcdTY0MUNcdTdEMjIgKyBBSSBcdTYwM0JcdTdFRDMgXHUyNTAwXHUyNTAwICovfVxuICAgICAgPENhcmQgdGl0bGU9e3QoJ25vdGVzLnRpdGxlJyl9PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCB3aWR0aDogMjIwIH19XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17dCgnbm90ZXMuc2VhcmNoJyl9XG4gICAgICAgICAgICB2YWx1ZT17bm90ZVNlYXJjaH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXROb3RlU2VhcmNoKGUudGFyZ2V0LnZhbHVlKSB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFzdFN1bW1hcnkgPSBub3Rlcy5maWx0ZXIoKG5vdGUpID0+IG5vdGUuc2hhID09PSAnc3VtbWFyeScpLnNvcnQoKGEsIGIpID0+IGIuY3JlYXRlZEF0IC0gYS5jcmVhdGVkQXQpWzBdXG4gICAgICAgICAgICBjb25zdCBuZXdDb21taXRzID0gbGFzdFN1bW1hcnkgPT09IHVuZGVmaW5lZCA/IC0xXG4gICAgICAgICAgICAgIDogKGNvbW1pdHNEYXRhPy5jb21taXRzID8/IFtdKS5maWx0ZXIoKGNvbW1pdCkgPT4gY29tbWl0LmRhdGUgPiBsYXN0U3VtbWFyeS5jcmVhdGVkQXQpLmxlbmd0aFxuICAgICAgICAgICAgaWYgKG5ld0NvbW1pdHMgPT09IC0xKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnbm90ZXMuZGlnZXN0TmV2ZXInKX08L3NwYW4+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV3Q29tbWl0cyA9PT0gMCkgcmV0dXJuIG51bGxcbiAgICAgICAgICAgIHJldHVybiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+e3QoJ25vdGVzLmRpZ2VzdFBlbmRpbmcnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcobmV3Q29tbWl0cykpfTwvc3Bhbj5cbiAgICAgICAgICB9KSgpfVxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXthaVN1bW1hcml6aW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYWlTdW1tYXJpemUoKSB9fT5cbiAgICAgICAgICAgIHthaVN1bW1hcml6aW5nID8gdCgnbm90ZXMuYWlTdW1tYXJ5UnVuJykgOiAnXHUyNzI4ICcgKyB0KCdub3Rlcy5haVN1bW1hcnknKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLmZvcm1Sb3csIGJvcmRlcjogJzFweCBkYXNoZWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBwYWRkaW5nOiAnMTBweCcgfX0+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdub3Rlcy5mb3JtVGl0bGUnKX0gdmFsdWU9e25vdGVUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0IH19IHBsYWNlaG9sZGVyPXt0KCdub3Rlcy50YWdzSGludCcpfSB2YWx1ZT17bm90ZVRhZ3N9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXROb3RlVGFncyhlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9XG4gICAgICAgICAgICByb3dzPXs2fVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ25vdGVzLmNvbnRlbnRIaW50Jyl9XG4gICAgICAgICAgICB2YWx1ZT17bm90ZUNvbnRlbnR9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZUNvbnRlbnQoZS50YXJnZXQudmFsdWUpIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cbiAgICAgICAgICAgICAge3QoJ25vdGVzLmJvdW5kVG8nKX06IHtzZWxlY3RlZFRhcmdldHNbMF0gPT09ICd3b3JraW5nJyA/IHQoJ3JlcG8ud29ya2luZycpIDogc2VsZWN0ZWRUYXJnZXRzWzBdLnNsaWNlKDAsIDgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e25vdGVUaXRsZS50cmltKCkgPT09ICcnIHx8IG5vdGVDb250ZW50LnRyaW0oKSA9PT0gJyd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhZGROb3RlKCkgfX0+e3QoJ25vdGVzLmFkZCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgY29uc3Qga2V5d29yZCA9IG5vdGVTZWFyY2gudHJpbSgpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICBjb25zdCBtYXRjaGVkID0ga2V5d29yZCA9PT0gJydcbiAgICAgICAgICAgID8gbm90ZXNcbiAgICAgICAgICAgIDogbm90ZXMuZmlsdGVyKChub3RlKSA9PiAobm90ZS50aXRsZSArICcgJyArIG5vdGUuY29udGVudCArICcgJyArIChub3RlLnRhZ3MgPz8gW10pLmpvaW4oJyAnKSkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhrZXl3b3JkKSlcbiAgICAgICAgICAvLyBcdTdGNkVcdTk4NzZcdTRGMThcdTUxNDhcdUZGMENcdTUxNzZcdTRGNTlcdTYzMDlcdTUyMUJcdTVFRkFcdTY1RjZcdTk1RjRcdTUwMTJcdTVFOEZcdTMwMDJcbiAgICAgICAgICBjb25zdCB2aXNpYmxlID0gWy4uLm1hdGNoZWRdLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PlxuICAgICAgICAgICAgTnVtYmVyKHJpZ2h0LnBpbm5lZCA9PT0gdHJ1ZSkgLSBOdW1iZXIobGVmdC5waW5uZWQgPT09IHRydWUpIHx8IHJpZ2h0LmNyZWF0ZWRBdCAtIGxlZnQuY3JlYXRlZEF0KVxuICAgICAgICAgIGlmICh2aXNpYmxlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e25vdGVzLmxlbmd0aCA9PT0gMCA/IHQoJ25vdGVzLmVtcHR5JykgOiB0KCdub3Rlcy5lbXB0eVNlYXJjaCcpfTwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdmlzaWJsZS5tYXAoKG5vdGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzU3VtbWFyeSA9IG5vdGUuc2hhID09PSAnc3VtbWFyeSdcbiAgICAgICAgICAgIGNvbnN0IGVkaXRpbmcgPSBlZGl0aW5nTm90ZSAhPT0gbnVsbCAmJiBlZGl0aW5nTm90ZS5pZCA9PT0gbm90ZS5pZCA/IGVkaXRpbmdOb3RlIDogbnVsbFxuICAgICAgICAgICAgY29uc3QgZXhwYW5kZWQgPSBub3RlRXhwYW5kZWRbbm90ZS5pZF0gPT09IHRydWVcbiAgICAgICAgICAgIGNvbnN0IGxvbmcgPSBub3RlLmNvbnRlbnQubGVuZ3RoID4gMjYwIHx8IG5vdGUuY29udGVudC5zcGxpdCgnXFxuJykubGVuZ3RoID4gNlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17bm90ZS5pZH1cbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLm5vdGVDYXJkLFxuICAgICAgICAgICAgICAgICAgLi4uKGlzU3VtbWFyeSA/IHsgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDQpJywgYm9yZGVyQ29sb3I6ICdyZ2JhKDM3LDk5LDIzNSwwLjMpJyB9IDoge30pLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7ZWRpdGluZyAhPT0gbnVsbCA/IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHZhbHVlPXtlZGl0aW5nLnRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RWRpdGluZ05vdGUoeyAuLi5lZGl0aW5nLCB0aXRsZTogZS50YXJnZXQudmFsdWUgfSkgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdub3Rlcy50YWdzSGludCcpfSB2YWx1ZT17ZWRpdGluZy50YWdzfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RWRpdGluZ05vdGUoeyAuLi5lZGl0aW5nLCB0YWdzOiBlLnRhcmdldC52YWx1ZSB9KSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcm93cz17MTB9IHZhbHVlPXtlZGl0aW5nLmNvbnRlbnR9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFZGl0aW5nTm90ZSh7IC4uLmVkaXRpbmcsIGNvbnRlbnQ6IGUudGFyZ2V0LnZhbHVlIH0pIH19IC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJ1dHRvbiwgcGFkZGluZzogJzRweCAxMnB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc2F2ZU5vdGVFZGl0KCkgfX0+e3QoJ25vdGVzLnNhdmUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICc0cHggMTJweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRFZGl0aW5nTm90ZShudWxsKSB9fT57dCgnbm90ZXMuY2FuY2VsJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVUZXh0fT57aXNTdW1tYXJ5ID8gJ1x1RDgzRFx1RENENiAnIDogJyd9e25vdGUucGlubmVkID09PSB0cnVlID8gJ1x1RDgzRFx1RENDQyAnIDogJyd9e25vdGUudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JywgY29sb3I6IG5vdGUucGlubmVkID09PSB0cnVlID8gJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgOiB1bmRlZmluZWQgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e25vdGUucGlubmVkID09PSB0cnVlID8gdCgnbm90ZXMudW5waW4nKSA6IHQoJ25vdGVzLnBpbicpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgdG9nZ2xlTm90ZVBpbihub3RlKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlx1RDgzRFx1RENDQzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gdGl0bGU9e3QoJ25vdGVzLmNvcHlNZEhpbnQnKX0gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZCA9IGAjICR7bm90ZS50aXRsZX1cXG5cXG4ke25vdGUuY29udGVudH1cXG5gXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgbmF2aWdhdG9yLmNsaXBib2FyZD8ud3JpdGVUZXh0KG1kKS50aGVuKCgpID0+IHNldEFjdGlvblJlc3VsdCgnXHUyNzEzICcgKyB0KCdub3Rlcy5jb3B5TWREb25lJykpKS5jYXRjaCgoKSA9PiBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyBcdTU5MERcdTUyMzZcdTU5MzFcdThEMjUnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH19Plx1RDgzRFx1RENDQiB7dCgnbm90ZXMuY29weU1kJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSB0aXRsZT17dCgnbm90ZXMuZXhwb3J0TWRIaW50Jyl9IG9uQ2xpY2s9eygpID0+IHsgZXhwb3J0Tm90ZShub3RlKSB9fT5cdUQ4M0RcdURDQkUge3QoJ25vdGVzLmV4cG9ydE1kJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSB0aXRsZT17dCgnbm90ZXMudG9NZW1vcnlIaW50Jyl9IG9uQ2xpY2s9eygpID0+IHsgc2V0TWVtb3J5VGl0bGUobm90ZS50aXRsZSk7IHNldE1lbW9yeUNvbnRlbnQobm90ZS5jb250ZW50KTsgc2V0QWN0aW9uUmVzdWx0KHQoJ25vdGVzLnRvTWVtb3J5RG9uZScpKSB9fT5cdUQ4M0VcdURERTAge3QoJ25vdGVzLnRvTWVtb3J5Jyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgaWQ6IG5vdGUuaWQsIHRpdGxlOiBub3RlLnRpdGxlLCBjb250ZW50OiBub3RlLmNvbnRlbnQsIHRhZ3M6IChub3RlLnRhZ3MgPz8gW10pLmpvaW4oJywgJykgfSkgfX0+e3QoJ25vdGVzLmVkaXQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyh7IHRpdGxlOiAnXHU1MjIwXHU5NjY0XHU4RkQ5XHU2NzYxXHU3QjE0XHU4QkIwXHVGRjFGJywgbWVzc2FnZTogJ1x1MzAwQycgKyBub3RlLnRpdGxlICsgJ1x1MzAwRFx1NUMwNlx1ODhBQlx1NkMzOFx1NEU0NVx1NTIyMFx1OTY2NFx1RkYwQ1x1NEUwRFx1NTNFRlx1NjA2Mlx1NTkwRFx1MzAwMicsIGRhbmdlcjogdHJ1ZSwgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgcmVtb3ZlTm90ZShub3RlLmlkKSB9IH0pIH19Plx1MjcxNTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2lzU3VtbWFyeVxuICAgICAgICAgICAgICAgICAgICAgID8gPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNvbnRlbnQsIC4uLihsb25nICYmICFleHBhbmRlZCA/IHN0eWxlcy5ub3RlQ2xhbXAgOiB7fSkgfX0+e3JlbmRlclN0cnVjdHVyZWRDb250ZW50KG5vdGUuY29udGVudCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgOiA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ29udGVudCwgLi4uKGxvbmcgJiYgIWV4cGFuZGVkID8gc3R5bGVzLm5vdGVDbGFtcCA6IHt9KSB9fT57bm90ZS5jb250ZW50fTwvZGl2Pn1cbiAgICAgICAgICAgICAgICAgICAge2xvbmcgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5saW5rQnRufSBvbkNsaWNrPXsoKSA9PiB7IHNldE5vdGVFeHBhbmRlZCh7IC4uLm5vdGVFeHBhbmRlZCwgW25vdGUuaWRdOiAhZXhwYW5kZWQgfSkgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZXhwYW5kZWQgPyB0KCdub3Rlcy5jb2xsYXBzZScpIDogdCgnbm90ZXMuZXhwYW5kJyl9XHVGRjA4e25vdGUuY29udGVudC5sZW5ndGh9IFx1NUI1N1x1RkYwOVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICB7KG5vdGUudGFncyA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpblRvcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7KG5vdGUudGFncyA/PyBbXSkubWFwKCh0YWcpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dGFnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5iYWRnZSgnIzI1NjNlYicpLCBjdXJzb3I6ICdwb2ludGVyJywgYm9yZGVyOiAnbm9uZScsIHBhZGRpbmc6ICcxcHggOHB4JywgYm9yZGVyUmFkaXVzOiAnOTk5cHgnLCBmb250U2l6ZTogJzEwcHgnIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXROb3RlU2VhcmNoKHRhZykgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPiN7dGFnfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlTWV0YX0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e25ldyBEYXRlKG5vdGUuY3JlYXRlZEF0KS50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICB7bm90ZS51cGRhdGVkQXQgIT09IHVuZGVmaW5lZCAmJiBub3RlLnVwZGF0ZWRBdCA+IG5vdGUuY3JlYXRlZEF0ICsgMTAwMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cdUZGMDh7dCgnbm90ZXMuZWRpdGVkQXQnKX0ge25ldyBEYXRlKG5vdGUudXBkYXRlZEF0KS50b0xvY2FsZVN0cmluZygpfVx1RkYwOTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIHtpc1N1bW1hcnkgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzI1NjNlYicpfT57dCgnbm90ZXMuc3VtbWFyeVRhZycpfTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAge25vdGUuc2hhICE9PSB1bmRlZmluZWQgJiYgbm90ZS5zaGEgIT09ICdzdW1tYXJ5JyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9Pntub3RlLnNoYSA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiBub3RlLnNoYS5zbGljZSgwLCA4KX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICB9KSgpfVxuICAgICAgPC9DYXJkPlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ21lbW9yeS56b25lVGl0bGUnKSArIChwcm9qZWN0ICE9PSBudWxsID8gJyBcdTAwQjcgJyArIHByb2plY3QubmFtZSA6ICcnKX0+XG4gICAgICAgIHsvKiBcdTU0MENcdTZCNjVcdTcyQjZcdTYwMDFcdTY3NjFcdUZGMUFcdTU3RkFcdTdFQkYgKyBcdTg0M0RcdTU0MEVcdTYzRDBcdTRFQTRcdTY1NzAgKyBcdTU0MENcdTZCNjVcdTYzMDlcdTk0QUUgKyBcdTU0MENcdTZCNjVcdTYyQTVcdTU0NEEgKi99XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luQm90dG9tOiAnOHB4JywgcGFkZGluZzogJzZweCAxMHB4JywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xKSknLCBib3JkZXJSYWRpdXM6ICc4cHgnIH19PlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcgfX0+XHVEODNEXHVERDA0IHt0KCdtZW1vcnkuc3luY0Jhc2VsaW5lJyl9XHVGRjFBPGI+e21lbW9yaWVzRGF0YT8uYmFzZWxpbmU/LnNoYSAhPSBudWxsID8gbWVtb3JpZXNEYXRhLmJhc2VsaW5lLnNoYS5zbGljZSgwLCA4KSA6IHQoJ21lbW9yeS5zeW5jTm9uZScpfTwvYj48L3NwYW4+XG4gICAgICAgICAge21lbW9yaWVzRGF0YT8uYnJhbmNoICE9IG51bGwgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzU2OWNkNicpfT57bWVtb3JpZXNEYXRhLmJyYW5jaH08L3NwYW4+fVxuICAgICAgICAgIHsobWVtb3JpZXNEYXRhPy5iZWhpbmRDb3VudCA/PyAwKSA+IDAgJiYgKFxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6IHRoZW1lQXdhcmVUZXh0KCcjZDk3NzA2JykgfX0+e3QoJ21lbW9yeS5iZWhpbmQnKS5yZXBsYWNlKCd7bn0nLCBTdHJpbmcobWVtb3JpZXNEYXRhPy5iZWhpbmRDb3VudCA/PyAwKSl9PC9zcGFuPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzNweCAxMHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17bWVtb3J5U3luY2luZ30gb25DbGljaz17KCkgPT4geyB2b2lkIHN5bmNNZW1vcmllcygpIH19PlxuICAgICAgICAgICAge21lbW9yeVN5bmNpbmcgPyB0KCdtZW1vcnkuc3luY2luZycpIDogJ1x1RDgzRFx1REQwNCAnICsgdCgnbWVtb3J5LnN5bmMnKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtzeW5jUmVwb3J0ICE9PSBudWxsICYmIChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnLCBwYWRkaW5nOiAnOHB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBiYWNrZ3JvdW5kOiBzeW5jUmVwb3J0Lm9rID09PSBmYWxzZSA/ICdyZ2JhKDIwOSwzNiw0NywwLjA2KScgOiAncmdiYSg3OCwyMDEsMTc2LDAuMDYpJywgYm9yZGVyOiAnMXB4IHNvbGlkICcgKyAoc3luY1JlcG9ydC5vayA9PT0gZmFsc2UgPyAncmdiYSgyMDksMzYsNDcsMC4zKScgOiAncmdiYSg3OCwyMDEsMTc2LDAuMyknKSB9fT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwIH19PntzeW5jUmVwb3J0Lm9rID09PSBmYWxzZSA/ICdcdTI3MTcgJyArIHQoJ21lbW9yeS5zeW5jRmFpbGVkJykgOiAnXHUyNzEzICcgKyAoc3luY1JlcG9ydC52ZXJkaWN0ID8/ICcnKX08L2Rpdj5cbiAgICAgICAgICAgIHtzeW5jUmVwb3J0Lm9rICE9PSBmYWxzZSAmJiAoc3luY1JlcG9ydC5zdGFsZVByb3Bvc2FscyA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fT57dCgnbWVtb3J5LnN0YWxlVGl0bGUnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICB7KHN5bmNSZXBvcnQuc3RhbGVQcm9wb3NhbHMgPz8gW10pLm1hcCgocHJvcG9zYWwpID0+IChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtwcm9wb3NhbC5pZH0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnNHB4JywgZm9udFNpemU6ICcxMXB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fT57cHJvcG9zYWwudGl0bGV9IFx1MjAxNFx1MjAxNCB7cHJvcG9zYWwucmVhc29ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMXB4IDhweCcsIGZvbnRTaXplOiAnMTBweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGFwcGx5U3luYyhbcHJvcG9zYWwuaWRdLCAnbWFyay1zdGFsZScpIH19Pnt0KCdtZW1vcnkubWFya1N0YWxlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzFweCA4cHgnLCBmb250U2l6ZTogJzEwcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhcHBseVN5bmMoW3Byb3Bvc2FsLmlkXSwgJ2FyY2hpdmUnKSB9fT57dCgnbWVtb3J5LmFyY2hpdmVCdG4nKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMXB4IDhweCcsIGZvbnRTaXplOiAnMTBweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRTeW5jUmVwb3J0KChwcmV2aW91cykgPT4gcHJldmlvdXMgPT09IG51bGwgPyBudWxsIDogeyAuLi5wcmV2aW91cywgc3RhbGVQcm9wb3NhbHM6IChwcmV2aW91cy5zdGFsZVByb3Bvc2FscyA/PyBbXSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmlkICE9PSBwcm9wb3NhbC5pZCkgfSkgfX0+e3QoJ21lbW9yeS5rZWVwQWN0aXZlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3N5bmNSZXBvcnQub2sgIT09IGZhbHNlICYmIChzeW5jUmVwb3J0Lm5ld0NhbmRpZGF0ZXMgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcsIGZvbnRTaXplOiAnMTFweCcgfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwIH19Pnt0KCdtZW1vcnkubmV3Q2FuZGlkYXRlcycpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7KHN5bmNSZXBvcnQubmV3Q2FuZGlkYXRlcyA/PyBbXSkubWFwKChjYW5kaWRhdGUsIGluZGV4KSA9PiA8ZGl2IGtleT17aW5kZXh9Plx1RkYwQiBbe2NhbmRpZGF0ZS50eXBlfV0ge2NhbmRpZGF0ZS50aXRsZX08L2Rpdj4pfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5saW5rQnRuLCBtYXJnaW5Ub3A6ICc0cHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0U3luY1JlcG9ydChudWxsKSB9fT57dCgnbWVtb3J5LmNsb3NlUmVwb3J0Jyl9PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIHsvKiBcdTYyNEJcdTUyQThcdTZERkJcdTUyQTBcdUZGMUFcdTY4MDdcdTk4OTggLyBcdTdDN0JcdTU3OEIgLyBcdTRGNUNcdTc1MjhcdTU3REYgLyBcdTUxODVcdTVCQjkgKi99XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0ubWVtb3J5VGl0bGUnKX0gdmFsdWU9e21lbW9yeVRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0TWVtb3J5VGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nIH19IHZhbHVlPXttZW1vcnlUeXBlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0TWVtb3J5VHlwZShlLnRhcmdldC52YWx1ZSkgfX0+XG4gICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoTUVNT1JZX1RZUEVfTEFCRUxTKS5tYXAoKFt2YWx1ZSwgbGFiZWxdKSA9PiA8b3B0aW9uIGtleT17dmFsdWV9IHZhbHVlPXt2YWx1ZX0+e2xhYmVsfTwvb3B0aW9uPil9XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuc2VsZWN0LCB3aWR0aDogJ2F1dG8nIH19IHZhbHVlPXttZW1vcnlTY29wZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeVNjb3BlKGUudGFyZ2V0LnZhbHVlIGFzICdwcm9qZWN0JyB8ICdicmFuY2gnKSB9fT5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwcm9qZWN0XCI+e3QoJ21lbW9yeS5zY29wZVByb2plY3QnKX08L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJicmFuY2hcIj57dCgnbWVtb3J5LnNjb3BlQnJhbmNoJyl9PC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezN9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLm1lbW9yeUNvbnRlbnQnKX0gdmFsdWU9e21lbW9yeUNvbnRlbnR9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRNZW1vcnlDb250ZW50KGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBtZW1vcnlUaXRsZS50cmltKCkgPT09ICcnIHx8IG1lbW9yeUNvbnRlbnQudHJpbSgpID09PSAnJ31cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbigncmVjb3JkTWVtb3J5JywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeScsIHsgbWVtb3J5VHlwZSwgc2NvcGU6IG1lbW9yeVNjb3BlLCB0aXRsZTogbWVtb3J5VGl0bGUudHJpbSgpLCBjb250ZW50OiBtZW1vcnlDb250ZW50LnRyaW0oKSB9KS50aGVuKGFzeW5jICgpID0+IHsgc2V0TWVtb3J5VGl0bGUoJycpOyBzZXRNZW1vcnlDb250ZW50KCcnKTsgYXdhaXQgbG9hZE1lbW9yaWVzKCkgfSkgfX0+XG4gICAgICAgICAgICAgIHtidXN5ID09PSAncmVjb3JkTWVtb3J5JyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdtZW1vcnkucmVjb3JkJyl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGFsbCA9IG1lbW9yaWVzRGF0YT8ubWVtb3JpZXMgPz8gW11cbiAgICAgICAgICBjb25zdCBwZW5kaW5nID0gYWxsLmZpbHRlcigobWVtb3J5KSA9PiAhbWVtb3J5LmlzSHVtYW5Db25maXJtZWQgJiYgbWVtb3J5LnN0YXR1cyA9PT0gJ2FjdGl2ZScpXG4gICAgICAgICAgY29uc3QgYWN0aXZlID0gYWxsLmZpbHRlcigobWVtb3J5KSA9PiBtZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJylcbiAgICAgICAgICBjb25zdCBncm91cGVkID0gbmV3IE1hcDxzdHJpbmcsIE1lbW9yeUVudHJ5W10+KClcbiAgICAgICAgICBmb3IgKGNvbnN0IG1lbW9yeSBvZiBhY3RpdmUpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBncm91cGVkLmdldChtZW1vcnkudHlwZSkgPz8gW11cbiAgICAgICAgICAgIGxpc3QucHVzaChtZW1vcnkpXG4gICAgICAgICAgICBncm91cGVkLnNldChtZW1vcnkudHlwZSwgbGlzdClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIHtwZW5kaW5nLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyB9fT5cdTIzRjMge3QoJ21lbW9yeS5wZW5kaW5nUXVldWUnKX1cdUZGMDh7U3RyaW5nKHBlbmRpbmcubGVuZ3RoKX1cdUZGMDk8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHtwZW5kaW5nLm1hcCgobWVtb3J5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXttZW1vcnkuaWR9IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ2FyZCwgYm9yZGVyQ29sb3I6ICdyZ2JhKDM3LDk5LDIzNSwwLjMpJywgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDMpJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVUZXh0fT57bWVtb3J5LnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJ1dHRvbiwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBjb25maXJtTWVtb3J5KG1lbW9yeS5pZCkudGhlbigoKSA9PiB7IHZvaWQgbG9hZE1lbW9yaWVzKCkgfSkgfX0+e3QoJ21lbW9yeS5jb25maXJtJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ3N0YXR1cycsIHsgaWQ6IG1lbW9yeS5pZCwgc3RhdHVzOiAnYXJjaGl2ZWQnIH0pIH19Pnt0KCdtZW1vcnkuYXJjaGl2ZUJ0bicpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVDb250ZW50fT57bWVtb3J5LmNvbnRlbnR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVNZXRhfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJ3JnYmEoMzcsOTksMjM1LDAuMTUpJyl9PntNRU1PUllfU09VUkNFX0xBQkVMU1ttZW1vcnkuc291cmNlVGFnXSA/PyBtZW1vcnkuc291cmNlVGFnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuYmFzaXNTaGEgIT09IG51bGwgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57bWVtb3J5LmJhc2lzU2hhLnNsaWNlKDAsIDgpfTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHtbLi4uZ3JvdXBlZC5lbnRyaWVzKCldLm1hcCgoW3R5cGUsIGl0ZW1zXSkgPT4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXt0eXBlfSBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zZWN0aW9uVGl0bGV9PntNRU1PUllfVFlQRV9MQUJFTFNbdHlwZV0gPz8gdHlwZX1cdUZGMDh7U3RyaW5nKGl0ZW1zLmxlbmd0aCl9XHVGRjA5PC9kaXY+XG4gICAgICAgICAgICAgICAgICB7aXRlbXMubWFwKChtZW1vcnkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e21lbW9yeS5pZH0gc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDYXJkLCBvcGFjaXR5OiBtZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJyA/IDEgOiAwLjYgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e21lbW9yeS5pc0h1bWFuQ29uZmlybWVkID8gJ1x1MjcwNSAnIDogJyd9e21lbW9yeS50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwLCBmbGV4V3JhcDogJ3dyYXAnLCBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyFtZW1vcnkuaXNIdW1hbkNvbmZpcm1lZCAmJiBtZW1vcnkuc3RhdHVzID09PSAnYWN0aXZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuYnV0dG9uLCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGNvbmZpcm1NZW1vcnkobWVtb3J5LmlkKS50aGVuKCgpID0+IHsgdm9pZCBsb2FkTWVtb3JpZXMoKSB9KSB9fT57dCgnbWVtb3J5LmNvbmZpcm0nKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlUb05vdGUobWVtb3J5KSB9fT5cdUQ4M0RcdURDQzQge3QoJ21lbW9yeS50b05vdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5zY29wZSA9PT0gJ2JyYW5jaCcgJiYgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG1lbW9yeUFjdGlvbignbm9ybWFsaXplJywgeyBpZDogbWVtb3J5LmlkIH0pIH19Plx1MjFGMSB7dCgnbWVtb3J5Lm5vcm1hbGl6ZScpfTwvYnV0dG9uPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5zdGF0dXMgPT09ICdhY3RpdmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbWVtb3J5QWN0aW9uKCdzdGF0dXMnLCB7IGlkOiBtZW1vcnkuaWQsIHN0YXR1czogJ2FyY2hpdmVkJyB9KSB9fT57dCgnbWVtb3J5LmFyY2hpdmVCdG4nKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBtZW1vcnlBY3Rpb24oJ3N0YXR1cycsIHsgaWQ6IG1lbW9yeS5pZCwgc3RhdHVzOiAnYWN0aXZlJyB9KSB9fT57dCgnbWVtb3J5LnJlc3RvcmUnKX08L2J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ29udGVudCwgbWF4SGVpZ2h0OiA4NCwgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PnttZW1vcnkuY29udGVudH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICAgICAge21lbW9yeS5zdGF0dXMgPT09ICdzdGFsZScgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnI2Q5NzcwNicpfT57dCgnbWVtb3J5LnN0YXR1c1N0YWxlJyl9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuc2NvcGUgPT09ICdicmFuY2gnICYmIG1lbW9yeS5naXRCcmFuY2ggIT09IG51bGwgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzU2OWNkNicpfT5cdTIzODcge21lbW9yeS5naXRCcmFuY2h9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJ3JnYmEoMzcsOTksMjM1LDAuMTUpJyl9PntNRU1PUllfU09VUkNFX0xBQkVMU1ttZW1vcnkuc291cmNlVGFnXSA/PyBtZW1vcnkuc291cmNlVGFnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW1vcnkuYmFzaXNTaGEgIT09IG51bGwgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57bWVtb3J5LmJhc2lzU2hhLnNsaWNlKDAsIDgpfTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bmV3IERhdGUobWVtb3J5LnVwZGF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICB7YWxsLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdtZW1vcnkuZW1wdHknKX08L2Rpdj59XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApXG4gICAgICAgIH0pKCl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnY29uY2VwdHMudGl0bGUnKX0+XG4gICAgICAgIHtjb25jZXB0cy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnY29uY2VwdHMubm9uZScpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ2NvbmNlcHRzLmNvbC5uYW1lJywgJ2NvbmNlcHRzLmNvbC5jYXRlZ29yeScsICdjb25jZXB0cy5jb2wuY291bnQnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge2NvbmNlcHRzLm1hcCgoY29uY2VwdCkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e2NvbmNlcHQuaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntjb25jZXB0Lm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Y29uY2VwdC5jYXRlZ29yeX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntTdHJpbmcoY29uY2VwdC5vY2N1cnJlbmNlcyl9PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICA8Lz5cbiAgKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBSZXZpZXcgXHU5NUVFXHU5ODk4XHU5ODc1XHU3QjdFXHVGRjFBXHU1MTY4XHU5MUNGXHU5NUVFXHU5ODk4XHU3NzBCXHU2NzdGXHVGRjA4XHU3RURGXHU4QkExICsgXHU3QjVCXHU5MDA5ICsgXHU3MkI2XHU2MDAxXHU2RDQxXHU4RjZDXHVGRjA5KyBcdTlBOENcdTY1MzZcdThCQjBcdTVGNTUgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IHJldmlld1RhYiA9IChcbiAgICA8PlxuICAgICAge3Jlc3VsdFBhbmVsfVxuICAgICAgPENhcmQgdGl0bGU9e3QoJ3Jldmlldy5yZWNvcmRzVGl0bGUnKX0+XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGFsbCA9IChpc3N1ZXNEYXRhID8/IFtdKS5tYXAoKGlzc3VlKSA9PiAoeyAuLi5pc3N1ZSwgc2V2ZXJpdHk6IG5vcm1hbGl6ZUlzc3VlU2V2ZXJpdHkoaXNzdWUuc2V2ZXJpdHkpIH0pKVxuICAgICAgICAgIGNvbnN0IG9wZW5Db3VudCA9IGFsbC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZS5zdGF0dXMgPT09ICdvcGVuJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdmaXhpbmcnKS5sZW5ndGhcbiAgICAgICAgICBjb25zdCBjb3VudHM6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGNvdW50OiBudW1iZXIgfT4gPSBbXG4gICAgICAgICAgICB7IGtleTogJycsIGxhYmVsOiB0KCdyZXZpZXcuZmlsdGVyQWxsJyksIGNvdW50OiBhbGwubGVuZ3RoIH0sXG4gICAgICAgICAgICB7IGtleTogJ2NyaXRpY2FsJywgbGFiZWw6ICdjcml0aWNhbCcsIGNvdW50OiBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdjcml0aWNhbCcgfHwgaXNzdWUuc2V2ZXJpdHkgPT09ICdibG9ja2VyJykubGVuZ3RoIH0sXG4gICAgICAgICAgICB7IGtleTogJ21ham9yJywgbGFiZWw6ICdtYWpvcicsIGNvdW50OiBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdtYWpvcicpLmxlbmd0aCB9LFxuICAgICAgICAgICAgeyBrZXk6ICdtaW5vcicsIGxhYmVsOiAnbWlub3InLCBjb3VudDogYWxsLmZpbHRlcigoaXNzdWUpID0+IGlzc3VlLnNldmVyaXR5ID09PSAnbWlub3InKS5sZW5ndGggfSxcbiAgICAgICAgICAgIHsga2V5OiAnaW5mbycsIGxhYmVsOiAnaW5mbycsIGNvdW50OiBhbGwuZmlsdGVyKChpc3N1ZSkgPT4gaXNzdWUuc2V2ZXJpdHkgPT09ICdpbmZvJykubGVuZ3RoIH0sXG4gICAgICAgICAgXVxuICAgICAgICAgIGNvbnN0IHZpc2libGUgPSBhbGxcbiAgICAgICAgICAgIC5maWx0ZXIoKGlzc3VlKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpc3N1ZVNldmVyaXR5RmlsdGVyID09PSAnJykgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgaWYgKGlzc3VlU2V2ZXJpdHlGaWx0ZXIgPT09ICdjcml0aWNhbCcpIHJldHVybiBpc3N1ZS5zZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyB8fCBpc3N1ZS5zZXZlcml0eSA9PT0gJ2Jsb2NrZXInXG4gICAgICAgICAgICAgIHJldHVybiBpc3N1ZS5zZXZlcml0eSA9PT0gaXNzdWVTZXZlcml0eUZpbHRlclxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5maWx0ZXIoKGlzc3VlKSA9PiBpc3N1ZVN0YXR1c0ZpbHRlciA9PT0gJycgfHwgaXNzdWUuc3RhdHVzID09PSBpc3N1ZVN0YXR1c0ZpbHRlcilcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICB7Y291bnRzLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBrZXk9e2l0ZW0ua2V5ID09PSAnJyA/ICdhbGwnIDogaXRlbS5rZXl9IHN0eWxlPXtzdHlsZXMuY2hpcChpc3N1ZVNldmVyaXR5RmlsdGVyID09PSBpdGVtLmtleSl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0SXNzdWVTZXZlcml0eUZpbHRlcihpdGVtLmtleSkgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLmxhYmVsfSBcdTAwQjcge2l0ZW0uY291bnR9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgICAgICB7b3BlbkNvdW50fSBcdTVGODVcdTU5MDRcdTc0MDYgLyBcdTUxNzEge2FsbC5sZW5ndGh9XG4gICAgICAgICAgICAgICAgICB7KHN0YXRlPy5yZXNvbHZlZElzc3VlUmV0ZW50aW9uRGF5cyA/PyAwKSA+IDAgPyBgIFx1MDBCNyAke3QoJ3Jldmlldy5yZXRlbnRpb25IaW50JykucmVwbGFjZSgne2RheXN9JywgU3RyaW5nKHN0YXRlPy5yZXNvbHZlZElzc3VlUmV0ZW50aW9uRGF5cyA/PyA3KSl9YCA6ICcnfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c2VsZWN0IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWxlY3QsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggOHB4JyB9fSB2YWx1ZT17aXNzdWVTdGF0dXNGaWx0ZXJ9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRJc3N1ZVN0YXR1c0ZpbHRlcihlLnRhcmdldC52YWx1ZSkgfX0+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e3QoJ3Jldmlldy5zdGF0dXNBbGwnKX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhJU1NVRV9TVEFUVVNfTEFCRUxTKS5tYXAoKFt2YWx1ZSwgbGFiZWxdKSA9PiA8b3B0aW9uIGtleT17dmFsdWV9IHZhbHVlPXt2YWx1ZX0+e2xhYmVsfTwvb3B0aW9uPil9XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJc3N1ZXMoKSB9fT57dCgncmV2aWV3LnJlZnJlc2gnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHthbGwubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e2lzc3Vlc0RhdGEgPT09IG51bGwgPyAnXHUyMDI2JyA6IHQoJ3Jldmlldy5yZWNvcmRzRW1wdHknKX08L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IHZpc2libGUubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ25vdGVzLmVtcHR5U2VhcmNoJyl9PC9kaXY+XG4gICAgICAgICAgICAgICkgOiB2aXNpYmxlLm1hcCgoaXNzdWUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBleHBhbmRlZCA9IGlzc3VlRXhwYW5kZWRbaXNzdWUuaWRdID09PSB0cnVlXG4gICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBpc3N1ZS5kZXNjcmlwdGlvbiA/PyAnJ1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvbmcgPSBkZXNjcmlwdGlvbi5sZW5ndGggPiAyMDBcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2lzc3VlLmlkfSBzdHlsZT17c3R5bGVzLm5vdGVDYXJkfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVJvd30+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzZweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShzZXZlcml0eUNvbG9yKGlzc3VlLnNldmVyaXR5KSl9Pntpc3N1ZS5zZXZlcml0eX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNzdWUuY2F0ZWdvcnkgPyA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNTc2MDZhJyl9Pntpc3N1ZS5jYXRlZ29yeX08L3NwYW4+IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoaXNzdWUuc3RhdHVzID09PSAnb3BlbicgfHwgaXNzdWUuc3RhdHVzID09PSAnZml4aW5nJyA/ICcjZGNkY2FhJyA6IGlzc3VlLnN0YXR1cyA9PT0gJ3Jlc29sdmVkJyB8fCBpc3N1ZS5zdGF0dXMgPT09ICdhY2NlcHRlZCcgPyAnIzRlYzliMCcgOiAnIzhiOGI4YicpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge0lTU1VFX1NUQVRVU19MQUJFTFNbaXNzdWUuc3RhdHVzXSA/PyBpc3N1ZS5zdGF0dXN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLm5vdGVUaXRsZVRleHR9Pntpc3N1ZS50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt2ZXJpZnlpbmdUYXJnZXQgIT09IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3Jldmlldy52ZXJpZnlIaW50Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHZlcmlmeUlzc3Vlcyhpc3N1ZS5jaGFuZ2VJZCkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPnt2ZXJpZnlpbmdUYXJnZXQgPT09IGlzc3VlLmNoYW5nZUlkID8gdCgncmV2aWV3LnZlcmlmeVJ1bm5pbmcnKSA6ICdcdUQ4M0RcdUREMEQgJyArIHQoJ3Jldmlldy52ZXJpZnknKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7KGlzc3VlLnN0YXR1cyA9PT0gJ29wZW4nIHx8IGlzc3VlLnN0YXR1cyA9PT0gJ2ZpeGluZycpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0KCdyZXZpZXcuZmFsc2VQb3NpdGl2ZUhpbnQnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDb25maXJtRGlhbG9nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHQoJ3Jldmlldy5mYWxzZVBvc2l0aXZlVGl0bGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogdCgncmV2aWV3LmZhbHNlUG9zaXRpdmVNc2cnKS5yZXBsYWNlKCd7dGl0bGV9JywgaXNzdWUudGl0bGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW5nZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm06ICgpID0+IHsgdm9pZCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pc3N1ZXMvc3RhdHVzJywgeyBpZDogaXNzdWUuaWQsIHN0YXR1czogJ3JlamVjdGVkJyB9KS50aGVuKGFzeW5jICh7IG9rIH0pID0+IHsgaWYgKG9rKSBhd2FpdCBsb2FkSXNzdWVzKCkgfSkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlx1RDgzRFx1REVBQiB7dCgncmV2aWV3LmZhbHNlUG9zaXRpdmUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7ZGVzY3JpcHRpb24gIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5ub3RlQ29udGVudCwgLi4uKGxvbmcgJiYgIWV4cGFuZGVkID8gc3R5bGVzLm5vdGVDbGFtcCA6IHt9KSB9fT57cmVuZGVyV2l0aFBlZWsoZGVzY3JpcHRpb24pfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICB7aXNzdWUucmVzb2x1dGlvbiA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzZweCcsIHBhZGRpbmc6ICc2cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGJhY2tncm91bmQ6ICdyZ2JhKDc4LCAyMDEsIDE3NiwgMC4wOCknLCBib3JkZXI6ICcxcHggc29saWQgcmdiYSg3OCwgMjAxLCAxNzYsIDAuMzUpJywgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgXHUyNzEzIHtpc3N1ZS5yZXNvbHV0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5maXhTdGF0cyAhPSBudWxsIHx8IEJvb2xlYW4oaXNzdWUuZml4RGlmZikpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMubGlua0J0biwgbWFyZ2luVG9wOiAnNHB4JywgZGlzcGxheTogJ2Jsb2NrJyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldEZpeEV4cGFuZGVkKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFtpc3N1ZS5pZF06ICEocHJldmlvdXNbaXNzdWUuaWRdID09PSB0cnVlKSB9KSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXHVEODNEXHVERDI3IHt0KCdyZXZpZXcuZml4RGV0YWlsJyl9XHVGRjA4e1N0cmluZyhpc3N1ZS5maXhTdGF0cz8uZmlsZXMgPz8gMCl9IHt0KCdyZXZpZXcuZml4U3RhdEZpbGVzJyl9IFx1MDBCNyAre1N0cmluZyhpc3N1ZS5maXhTdGF0cz8uaW5zZXJ0aW9ucyA/PyAwKX0gXHUyMjEye1N0cmluZyhpc3N1ZS5maXhTdGF0cz8uZGVsZXRpb25zID8/IDApfVx1RkYwOXtmaXhFeHBhbmRlZFtpc3N1ZS5pZF0gPT09IHRydWUgPyAnXHUyNUIyJyA6ICdcdTI1QkMnfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Zml4RXhwYW5kZWRbaXNzdWUuaWRdID09PSB0cnVlICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICc2cHgnLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEpKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5maXhGaWxlcyA/PyBbXSkubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzhweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICczcHgnIH19Pnt0KCdyZXZpZXcuZml4RmlsZXMnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5maXhGaWxlcyA/PyBbXSkubWFwKChmaWxlKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2ZpbGV9IHN0eWxlPXt7IGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknLCBmb250U2l6ZTogJzExcHgnIH19PntmaWxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyhpc3N1ZS5maXhJbXBhY3QgPz8gW10pLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc4cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnM3B4JyB9fT57dCgncmV2aWV3LmZpeEltcGFjdCcpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNzdWUuZml4SW1wYWN0Lm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZW50cnkuc3ltYm9sfSBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICc1cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzA5NjlkYScpfT57ZW50cnkuc3ltYm9sfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeycgJ317dCgncmV2aWV3LmRlZmluZWRJbicpfSB7ZW50cnkuZGVmaW5lZElufSBcdTAwQjcge1N0cmluZyhlbnRyeS5jYWxsZXJzLmxlbmd0aCl9IHt0KCdyZXZpZXcuY2FsbENvdW50Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNhbGxlcnMuc2xpY2UoMCwgNSkubWFwKChjYWxsZXIsIGNhbGxlckluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtjYWxsZXJJbmRleH0gc3R5bGU9e3sgZm9udFNpemU6ICcxMHB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIHBhZGRpbmdMZWZ0OiAnMTJweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY3Vyc29yOiAncG9pbnRlcicsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lIGRvdHRlZCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIG9wZW5QZWVrKGNhbGxlci5maWxlLCBOdW1iZXIoY2FsbGVyLmxpbmUpKSB9fT57Y2FsbGVyLmZpbGV9OntjYWxsZXIubGluZX08L3NwYW4+IHtjYWxsZXIuc25pcHBldC5zbGljZSgwLCA4MCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Qm9vbGVhbihpc3N1ZS5maXhEaWZmKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luQm90dG9tOiAnM3B4JyB9fT57dCgncmV2aWV3LmZpeERpZmYnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWluc2V0LCByZ2JhKDUsNSw1LDAuMDMpKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc2cHggOHB4JywgbWF4SGVpZ2h0OiAnMzAwcHgnLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVuZGVyRGlmZkxpbmVzKGlzc3VlLmZpeERpZmYpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge2xvbmcgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5saW5rQnRufSBvbkNsaWNrPXsoKSA9PiB7IHNldElzc3VlRXhwYW5kZWQoeyAuLi5pc3N1ZUV4cGFuZGVkLCBbaXNzdWUuaWRdOiAhZXhwYW5kZWQgfSkgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZXhwYW5kZWQgPyB0KCdub3Rlcy5jb2xsYXBzZScpIDogdCgnbm90ZXMuZXhwYW5kJyl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlTWV0YX0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3QoJ3Jldmlldy50YXJnZXQnKX06IHtpc3N1ZVRhcmdldExhYmVsKGlzc3VlLmNoYW5nZUlkKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2Zvcm1hdFRpbWUoaXNzdWUuY3JlYXRlZEF0KX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgIClcbiAgICAgICAgfSkoKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCd2ZXJpZnkucmVjb3JkcycpfT5cbiAgICAgICAge3ZlcmlmaWNhdGlvbnMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3ZlcmlmeS5yZWNvcmRzRW1wdHknKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHt2ZXJpZmljYXRpb25zLnNsaWNlKDAsIDIwKS5tYXAoKHJlY29yZCkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3JlY29yZC5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShyZWNvcmQuc3RhdHVzID09PSAncGFzc2VkJyA/ICcjNGVjOWIwJyA6ICcjZGNkY2FhJyl9PntyZWNvcmQuc3RhdHVzfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntyZWNvcmQubmFtZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntmb3JtYXRUaW1lKHJlY29yZC5jcmVhdGVkQXQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgPC8+XG4gIClcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb290fSBkYXRhLXRlc3RpZD1cInByb2plY3QtY29udHJvbC13b3Jrc3BhY2VcIj5cbiAgICAgIDxzdHlsZT57TEFZT1VUX1NUWUxFfTwvc3R5bGU+XG4gICAgICA8ZGl2XG4gICAgICAgIGRhdGEtdGVzdGlkPVwicHJvamVjdC1jb250cm9sLWRpdmlkZXJcIlxuICAgICAgICBvblBvaW50ZXJEb3duPXtvbkRpdmlkZXJEb3dufVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IC00LCB3aWR0aDogOCxcbiAgICAgICAgICBjdXJzb3I6ICdjb2wtcmVzaXplJywgekluZGV4OiAyMCxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubmF2fT5cbiAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy50aXRsZX0+e3QoJ3dvcmtzcGFjZS50aXRsZScpfTwvc3Bhbj5cbiAgICAgICAge3RhYnMubWFwKChlbnRyeSkgPT4gKFxuICAgICAgICAgIDxidXR0b24ga2V5PXtlbnRyeS5rZXl9IHN0eWxlPXtzdHlsZXMudGFiKHRhYiA9PT0gZW50cnkua2V5KX0gb25DbGljaz17KCkgPT4geyBzZXRUYWIoZW50cnkua2V5KSB9fT57ZW50cnkubGFiZWx9PC9idXR0b24+XG4gICAgICAgICkpfVxuICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBydW5uaW5nQ291bnQgPSBydW5zLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LnN0YXR1cyA9PT0gJ3J1bm5pbmcnIHx8IGVudHJ5LnN0YXR1cyA9PT0gJ3F1ZXVlZCcgfHwgZW50cnkuc3RhdHVzID09PSAndmVyaWZ5aW5nJykubGVuZ3RoXG4gICAgICAgICAgY29uc3QgZmFpbGVkQ291bnQgPSBydW5zLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LnN0YXR1cyA9PT0gJ2ZhaWxlZCcgfHwgZW50cnkuc3RhdHVzID09PSAncGF1c2VkJykubGVuZ3RoXG4gICAgICAgICAgaWYgKHJ1bm5pbmdDb3VudCA9PT0gMCAmJiBmYWlsZWRDb3VudCA9PT0gMCkgcmV0dXJuIG51bGxcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBtYXJnaW5MZWZ0OiAnNHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgIHtydW5uaW5nQ291bnQgPiAwICYmIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5iYWRnZSh0aGVtZUF3YXJlVGV4dCgnIzI1NjNlYicpKSwgY3Vyc29yOiAncG9pbnRlcicsIGJvcmRlcjogJ25vbmUnIH19IHRpdGxlPXt0KCdiYWRnZS5ydW5uaW5nJykucmVwbGFjZSgne259JywgU3RyaW5nKHJ1bm5pbmdDb3VudCkpfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRUYWIoJ2V4ZWN1dGlvbicpIH19Plx1MjVCNiB7U3RyaW5nKHJ1bm5pbmdDb3VudCl9PC9idXR0b24+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHtmYWlsZWRDb3VudCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKHRoZW1lQXdhcmVUZXh0KCcjZjE0YzRjJykpLCBjdXJzb3I6ICdwb2ludGVyJywgYm9yZGVyOiAnbm9uZScgfX0gdGl0bGU9e3QoJ2JhZGdlLmZhaWxlZCcpLnJlcGxhY2UoJ3tufScsIFN0cmluZyhmYWlsZWRDb3VudCkpfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRUYWIoJ2V4ZWN1dGlvbicpIH19Plx1MjcxNyB7U3RyaW5nKGZhaWxlZENvdW50KX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApXG4gICAgICAgIH0pKCl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ib2R5fT5cbiAgICAgICAge2xvYWRFcnJvciAhPT0gbnVsbCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdlcnJvci5sb2FkJyl9OiB7bG9hZEVycm9yfTwvZGl2Pn1cbiAgICAgICAge3N0YXRlPy5yZWFkeSA9PT0gZmFsc2UgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57c3RhdGUucmVhc29uID8/ICcnfTwvZGl2Pn1cbiAgICAgICAge3RhYiA9PT0gJ2NvbW1pdHMnICYmIGNvbW1pdHNUYWJ9XG4gICAgICAgIHt0YWIgPT09ICdvdmVydmlldycgJiYgb3ZlcnZpZXdUYWJ9XG4gICAgICAgIHt0YWIgPT09ICdleGVjdXRpb24nICYmIGV4ZWN1dGlvblRhYn1cbiAgICAgICAge3RhYiA9PT0gJ3JldmlldycgJiYgcmV2aWV3VGFifVxuICAgICAgICB7dGFiID09PSAnbm90ZXMnICYmIG5vdGVzVGFifVxuICAgICAgICB7dGFiID09PSAnc2V0dGluZ3MnICYmIHNldHRpbmdzVGFifVxuICAgICAgPC9kaXY+XG4gICAgICB7Y29uZmlybURpYWxvZyAhPT0gbnVsbCAmJiAoXG4gICAgICAgIDxDb25maXJtRGlhbG9nXG4gICAgICAgICAgdGl0bGU9e2NvbmZpcm1EaWFsb2cudGl0bGV9XG4gICAgICAgICAgbWVzc2FnZT17Y29uZmlybURpYWxvZy5tZXNzYWdlfVxuICAgICAgICAgIGRhbmdlcj17Y29uZmlybURpYWxvZy5kYW5nZXJ9XG4gICAgICAgICAgb25DYW5jZWw9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyhudWxsKSB9fVxuICAgICAgICAgIG9uQ29uZmlybT17KCkgPT4geyBjb25maXJtRGlhbG9nLm9uQ29uZmlybSgpOyBzZXRDb25maXJtRGlhbG9nKG51bGwpIH19XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAge3BlZWsgIT09IG51bGwgJiYgKFxuICAgICAgICA8ZGl2IGRhdGEtdGVzdGlkPVwicGMtcGVlay1vdmVybGF5XCIgc3R5bGU9e3sgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCBiYWNrZ3JvdW5kOiAncmdiYSgxNSwyMyw0MiwwLjQ1KScsIGJhY2tkcm9wRmlsdGVyOiAnYmx1cigycHgpJywgekluZGV4OiAxMDAwLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0gb25DbGljaz17KCkgPT4geyBzZXRQZWVrKG51bGwpIH19PlxuICAgICAgICAgIDxkaXYgZGF0YS10ZXN0aWQ9XCJwYy1wZWVrLWNhcmRcIiBzdHlsZT17eyB3aWR0aDogJ21pbig3NjBweCwgOTJ2dyknLCBtYXhIZWlnaHQ6ICc4MHZoJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBib3JkZXJSYWRpdXM6ICcxMHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJveFNoYWRvdzogJzAgMTZweCA0OHB4IHJnYmEoMCwwLDAsMC4yNSknLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nIH19IG9uQ2xpY2s9eyhlKSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCkgfX0+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIHBhZGRpbmc6ICcxMHB4IDE0cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEpKScgfX0+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6ICd2YXIoLS1kc3ctYWxpYXMtZm9udC1tb25vLCB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZSknLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+e3BlZWsucGF0aH06e1N0cmluZyhwZWVrLmxpbmUpfTwvc3Bhbj5cbiAgICAgICAgICAgICAge3BlZWtEYXRhPy5leGlzdHMgPT09IHRydWUgJiYgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e1N0cmluZyhwZWVrRGF0YS5zdGFydExpbmUpfVx1MjAxM3tTdHJpbmcocGVla0RhdGEuZW5kTGluZSl9IC8ge1N0cmluZyhwZWVrRGF0YS50b3RhbExpbmVzKX0gXHU4ODRDPC9zcGFuPn1cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggMTBweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRQZWVrKG51bGwpIH19Plx1MjcxNTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG92ZXJmbG93OiAnYXV0bycsIHBhZGRpbmc6ICcxMHB4IDAnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWluc2V0LCByZ2JhKDUsNSw1LDAuMDMpKScgfX0+XG4gICAgICAgICAgICAgIHtwZWVrQnVzeSAmJiA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5lbXB0eSB9fT5cdThCRkJcdTUzRDZcdTRFMkRcdTIwMjY8L2Rpdj59XG4gICAgICAgICAgICAgIHshcGVla0J1c3kgJiYgcGVla0RhdGEgIT09IG51bGwgJiYgcGVla0RhdGEuZXhpc3RzID09PSBmYWxzZSAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Plx1NjU4N1x1NEVGNlx1NEUwRFx1NUI1OFx1NTcyOFx1RkYwOFx1NTNFRlx1ODBGRFx1NURGMlx1ODhBQlx1NTIyMFx1OTY2NFx1NjIxNlx1NzlGQlx1NTJBOFx1RkYwOTwvZGl2Pn1cbiAgICAgICAgICAgICAgeyFwZWVrQnVzeSAmJiBwZWVrRGF0YT8uZXhpc3RzID09PSB0cnVlICYmIChwZWVrRGF0YS5saW5lcyA/PyBbXSkubWFwKChlbnRyeSkgPT4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeS5ufSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBwYWRkaW5nOiAnMCAxNHB4JywgZm9udEZhbWlseTogJ3ZhcigtLWRzdy1hbGlhcy1mb250LW1vbm8sIHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlKScsIGZvbnRTaXplOiAnMTEuNXB4JywgbGluZUhlaWdodDogMS43LCBiYWNrZ3JvdW5kOiBlbnRyeS5uID09PSBwZWVrLmxpbmUgPyAncmdiYSgzNyw5OSwyMzUsMC4wOCknIDogJ3RyYW5zcGFyZW50JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IHdpZHRoOiA0MCwgdGV4dEFsaWduOiAncmlnaHQnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZmxleFNocmluazogMCB9fT57U3RyaW5nKGVudHJ5Lm4pfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+e2VudHJ5LnRleHQgPT09ICcnID8gJ1xcdTAwQTAnIDogZW50cnkudGV4dH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKVxufVxuIiwgIi8qKlxuICogXHU2M0QwXHU0RUE0XHU4RjZFXHU2QjIxXHU4MDVBXHU3QzdCXHVGRjA4XHU1QkEyXHU2MjM3XHU3QUVGXHVGRjA5XHVGRjFBXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XHU1M0YwXHU3Njg0XHU0RTBCXHU2MkM5XHU2ODQ2XHU2MzA5XHUzMDBDXHU0RTAwXHU4RjZFXHU1REU1XHU0RjVDXHUzMDBEXHU1MjA2XHU3RUM0XHU1QzU1XHU3OTNBXHUzMDAyXG4gKiBcdTRFMEUgcnVudGltZS9oaXN0b3J5LnRzIFx1NzY4NCBjbHVzdGVyQ29tbWl0cyBcdTRGRERcdTYzMDFcdTU0MENcdTRFMDBcdTU0MkZcdTUzRDFcdTVGMEZcdUZGMDhWMS4wIFx1MDBBNzk3L1x1MDBBNzk5XHVGRjA5XHVGRjFBXG4gKiBcdTc2RjhcdTkwQkJcdTYzRDBcdTRFQTRcdTY1RjZcdTk1RjRcdTk1RjRcdTk2OTRcdThEODVcdThGQzdcdTdBOTdcdTUzRTNcdUZGMDhcdTlFRDhcdThCQTQgMzZoXHVGRjA5XHU1MjA3XHU2NUFEXHVGRjFCXHU4RkRFXHU3RUVEIFx1MjI2NTMgXHU0RTJBXHU2M0QwXHU0RUE0XHU1NDBFXHU0RTBFXHU1REYyXHU4MDVBXHU2NTg3XHU0RUY2XG4gKiBcdTk2RjZcdTkxQ0RcdTUzRTBcdTRFNUZcdTUyMDdcdTY1QURcdTMwMDJcdTY3MERcdTUyQTFcdTdBRUZcdTkwQTNcdTRFRkRcdTVERTVcdTRGNUNcdTU3MjggZ2l0IFx1NjI2Qlx1NjNDRlx1NUM0Mlx1RkYwOFx1OTFDRFx1NUVGQVx1NTM4Nlx1NTNGMlx1RkYwOVx1RkYwQ1x1OEZEOVx1NEVGRFx1OTc2Mlx1NTQxMVxuICogL2NvbW1pdHMgXHU4RkQ0XHU1NkRFXHU3Njg0XHU2M0QwXHU0RUE0XHU2NzYxXHU3NkVFXHUyMDE0XHUyMDE0XHU0RTI0XHU1OTA0XHU4OUM0XHU1MjE5XHU2NTM5XHU1MkE4XHU1RkM1XHU5ODdCXHU1NDBDXHU2QjY1XHUzMDAyXG4gKlxuICogQG1vZHVsZSBkc2gtY2xpZW50LXByb2plY3QtY29udHJvbC9jb21wb25lbnRzL2NvbW1pdC1yb3VuZHNcbiAqL1xuXG4vKiogXHU4MDVBXHU3QzdCXHU4RjkzXHU1MTY1XHU3Njg0XHU2NzAwXHU1QzBGXHU1RjYyXHU3MkI2XHVGRjA4L2NvbW1pdHMgXHU3Njg0XHU2M0QwXHU0RUE0XHU2NzYxXHU3NkVFXHU1QjUwXHU5NkM2XHVGRjA5XHUzMDAyICovXG5leHBvcnQgaW50ZXJmYWNlIFJvdW5kQ29tbWl0IHtcbiAgc2hhOiBzdHJpbmdcbiAgLyoqIFx1NjNEMFx1NEVBNFx1NjVGNlx1OTVGNFx1RkYwOFx1NkJFQlx1NzlEMlx1RkYwOVx1MzAwMiAqL1xuICBkYXRlOiBudW1iZXJcbiAgLyoqIFx1NkQ4OVx1NTNDQVx1NjU4N1x1NEVGNlx1OERFRlx1NUY4NFx1RkYwOFx1NzZGOFx1NUJGOVx1NEVEM1x1NUU5M1x1NjgzOVx1RkYwOVx1MzAwMiAqL1xuICBmaWxlczogc3RyaW5nW11cbn1cblxuLyoqIFx1NEUwMFx1OEY2RVx1NURFNVx1NEY1Q1x1RkYxQVx1NEZERFx1NjMwMVx1NEYyMFx1NTE2NVx1OTg3QVx1NUU4Rlx1NzY4NFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1RkYwOC9jb21taXRzIFx1NEUzQVx1NjVCMFx1MjE5Mlx1NjVFN1x1RkYwOSsgXHU2NUY2XHU5NUY0XHU4MzAzXHU1NkY0XHUzMDAyICovXG5leHBvcnQgaW50ZXJmYWNlIENvbW1pdFJvdW5kIHtcbiAgY29tbWl0czogUm91bmRDb21taXRbXVxuICAvKiogXHU4RjZFXHU1MTg1XHU2NzAwXHU2NUU5XHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0XHUzMDAyICovXG4gIGZpcnN0QXQ6IG51bWJlclxuICAvKiogXHU4RjZFXHU1MTg1XHU2NzAwXHU2NjVBXHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0XHUzMDAyICovXG4gIGxhc3RBdDogbnVtYmVyXG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1JPVU5EX0dBUF9NUyA9IDM2ICogNjAgKiA2MCAqIDEwMDBcblxuLyoqIFx1NEUwRVx1NjcwRFx1NTJBMVx1N0FFRiBjbHVzdGVyQ29tbWl0cyBcdTc2RjhcdTU0MENcdTc2ODRcdTkxQ0RcdTUzRTBcdTczODdcdUZGMUFcdTU0N0RcdTRFMkRcdTY1ODdcdTRFRjZcdTY1NzAgLyBtYXgoXHU2NzJDXHU2M0QwXHU0RUE0XHU2NTg3XHU0RUY2XHU2NTcwLCAxKVx1MzAwMiAqL1xuZnVuY3Rpb24gb3ZlcmxhcFJhdGlvKGZpbGVzOiBzdHJpbmdbXSwgZXhpc3Rpbmc6IFNldDxzdHJpbmc+KTogbnVtYmVyIHtcbiAgaWYgKGV4aXN0aW5nLnNpemUgPT09IDApIHJldHVybiAwXG4gIGxldCBoaXRzID0gMFxuICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIGlmIChleGlzdGluZy5oYXMoZmlsZSkpIGhpdHMgKz0gMVxuICByZXR1cm4gaGl0cyAvIE1hdGgubWF4KGZpbGVzLmxlbmd0aCwgMSlcbn1cblxuLyoqXG4gKiBcdTYyOEFcdUZGMDhcdTY1QjBcdTIxOTJcdTY1RTdcdTYyMTZcdTY1RTdcdTIxOTJcdTY1QjBcdTU3NDdcdTUzRUZcdUZGMDlcdThGREVcdTdFRURcdTYzRDBcdTRFQTRcdTgwNUFcdTYyMTBcdThGNkVcdTZCMjFcdTMwMDJcbiAqIFx1NjVGNlx1OTVGNFx1OTVGNFx1OTY5NFx1NTNENlx1N0VERFx1NUJGOVx1NTAzQ1x1RkYxQVx1NTIxN1x1ODg2OFx1OTg3QVx1NUU4Rlx1NEUwRFx1NEZERFx1OEJDMVx1NjVGNlx1OTVGNFx1NjVCOVx1NTQxMVx1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2x1c3RlckludG9Sb3VuZHMoY29tbWl0czogUm91bmRDb21taXRbXSwgY2x1c3RlckdhcE1zOiBudW1iZXIgPSBERUZBVUxUX1JPVU5EX0dBUF9NUyk6IENvbW1pdFJvdW5kW10ge1xuICBjb25zdCByb3VuZHM6IENvbW1pdFJvdW5kW10gPSBbXVxuICBsZXQgY3VycmVudDogUm91bmRDb21taXRbXSA9IFtdXG4gIGxldCBjdXJyZW50RmlsZXMgPSBuZXcgU2V0PHN0cmluZz4oKVxuXG4gIGNvbnN0IHB1c2hSb3VuZCA9ICgpOiB2b2lkID0+IHtcbiAgICBpZiAoY3VycmVudC5sZW5ndGggPT09IDApIHJldHVyblxuICAgIGNvbnN0IHRpbWVzID0gY3VycmVudC5tYXAoKGNvbW1pdCkgPT4gY29tbWl0LmRhdGUpXG4gICAgcm91bmRzLnB1c2goeyBjb21taXRzOiBjdXJyZW50LCBmaXJzdEF0OiBNYXRoLm1pbiguLi50aW1lcyksIGxhc3RBdDogTWF0aC5tYXgoLi4udGltZXMpIH0pXG4gICAgY3VycmVudCA9IFtdXG4gICAgY3VycmVudEZpbGVzID0gbmV3IFNldCgpXG4gIH1cblxuICBmb3IgKGNvbnN0IGNvbW1pdCBvZiBjb21taXRzKSB7XG4gICAgY29uc3QgcHJldmlvdXMgPSBjdXJyZW50W2N1cnJlbnQubGVuZ3RoIC0gMV1cbiAgICBjb25zdCBnYXBCcmVhayA9IHByZXZpb3VzICE9PSB1bmRlZmluZWQgJiYgTWF0aC5hYnMoY29tbWl0LmRhdGUgLSBwcmV2aW91cy5kYXRlKSA+IGNsdXN0ZXJHYXBNc1xuICAgIGNvbnN0IGZpbGVCcmVhayA9IGN1cnJlbnQubGVuZ3RoID49IDMgJiYgb3ZlcmxhcFJhdGlvKGNvbW1pdC5maWxlcywgY3VycmVudEZpbGVzKSA9PT0gMFxuICAgIGlmIChnYXBCcmVhayB8fCBmaWxlQnJlYWspIHB1c2hSb3VuZCgpXG4gICAgY3VycmVudC5wdXNoKGNvbW1pdClcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgY29tbWl0LmZpbGVzKSBjdXJyZW50RmlsZXMuYWRkKGZpbGUpXG4gIH1cbiAgcHVzaFJvdW5kKClcbiAgcmV0dXJuIHJvdW5kc1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWlCQSxJQUFBQSxnQkFBa0I7OztBQ05sQixtQkFBa0I7OztBQ01YLFNBQVMsV0FBVyxPQUFnRDtBQUN6RSxRQUFNLE1BQU0sb0JBQW9CLEtBQUssS0FBSztBQUMxQyxNQUFJLFFBQVEsTUFBTTtBQUNoQixVQUFNLFFBQVEsT0FBTyxTQUFTLElBQUksQ0FBQyxHQUFJLEVBQUU7QUFDekMsV0FBTyxDQUFFLFNBQVMsS0FBTSxLQUFNLFNBQVMsSUFBSyxLQUFLLFFBQVEsR0FBRztBQUFBLEVBQzlEO0FBQ0EsUUFBTSxhQUFhLHNEQUFz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QUk7QUFBQSxJQUNGLG1CQUFtQjtBQUFBLElBQ25CLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLElBQ2hCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGlCQUFpQjtBQUFBLElBQ2pCLHVCQUF1QjtBQUFBLElBQ3ZCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBRWhCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHFCQUFxQjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLDBCQUEwQjtBQUFBLElBQzFCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLGFBQWE7QUFBQSxJQUNiLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHdCQUF3QjtBQUFBLElBQ3hCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHVCQUF1QjtBQUFBLElBQ3ZCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLHdCQUF3QjtBQUFBLElBQ3hCLHFCQUFxQjtBQUFBLElBQ3JCLHlCQUF5QjtBQUFBLElBQ3pCLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hC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aEIsZUFBZTtBQUFBLElBQ2YsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsZ0JBQWdCO0FBQUEsSUFDaEIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsd0JBQXdCO0FBQUEsSUFDeEIscUJBQXFCO0FBQUEsSUFDckIsNEJBQTRCO0FBQUEsSUFFNUIsZUFBZTtBQUFBLElBQ2Ysc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsd0JBQXdCO0FBQUEsSUFDeEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIseUJBQXlCO0FBQUEsSUFDekIsMEJBQTBCO0FBQUEsSUFDMUIsMkJBQTJCO0FBQUEsSUFFM0Isa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFFaEIsZUFBZTtBQUFBLElBQ2YsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsYUFBYTtBQUFBLElBQ2IsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBRWYsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIscUJBQXFCO0FBQUEsSUFDckIsa0JBQWtCO0FBQUEsSUFDbEIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUEsSUFDekIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsa0JBQWtCO0FBQUEsSUFDbEIsdUJBQXVCO0FBQUEsSUFFdkIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsSUFFbEIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsbUJBQW1CO0FBQUEsSUFDbkIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsaUJBQWlCO0FBQUEsSUFDakIsYUFBYTtBQUFBLElBQ2IsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsRUFDcEI7QUFBQSxFQUNBLElBQUk7QUFBQSxJQUNGLG1CQUFtQjtBQUFBLElBQ25CLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLElBQ2hCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGlCQUFpQjtBQUFBLElBQ2pCLHVCQUF1QjtBQUFBLElBQ3ZCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBRWhCLFlBQVk7QUFBQSxJQUNaLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHFCQUFxQjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLDBCQUEwQjtBQUFBLElBQzFCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLGFBQWE7QUFBQSxJQUNiLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLHdCQUF3QjtBQUFBLElBQ3hCLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLGtCQUFrQjtBQUFBLElBQ2xCLHNCQUFzQjtBQUFBLElBQ3RCLHNCQUFzQjtBQUFBLElBQ3RCLGdCQUFnQjtBQUFBLElBQ2hC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QUFPO0FBQ3RCLGFBQU8sY0FBQUEsUUFBTSxjQUFjLFlBQVk7QUFBQSxRQUNyQyxPQUFPO0FBQUEsUUFDUCxjQUFjLFFBQVEsZ0JBQWdCO0FBQUEsUUFDdEMsWUFBWSxRQUFRLGNBQWM7QUFBQSxRQUNsQyxXQUFXLFFBQVEsYUFBYTtBQUFBLFFBQ2hDLFlBQVksUUFBUTtBQUFBLFFBQ3BCLFFBQVEsU0FBUyxjQUFjO0FBQUEsTUFDakMsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELGFBQVcsQ0FBQyxTQUFTLEtBQUssS0FBSztBQUFBLElBQzdCLENBQUMsYUFBYSw0QkFBVztBQUFBLElBQ3pCLENBQUMsY0FBYyxvQ0FBUztBQUFBLElBQ3hCLENBQUMsb0JBQW9CLGlDQUFRO0FBQUEsRUFDL0IsR0FBWTtBQUNWLFFBQUksTUFBTSxPQUFPLHNCQUFzQixNQUFNO0FBQzNDLGFBQU8sSUFBSSxNQUFNLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixLQUFLLFFBQVEsR0FBRyxpQkFBaUIsS0FBSyxDQUFDO0FBQUEsSUFDakcsQ0FBQztBQUFBLEVBQ0g7QUFDRjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJuYW1lIiwgIlJlYWN0IiwgIm9rIiwgImRhdGEiLCAiYXBwbHkiLCAiZnJhbWUiLCAiUmVhY3QiXQp9Cg==
