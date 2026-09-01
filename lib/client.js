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
    "concepts.none": "\u6682\u65E0\u5B66\u4E60\u6982\u5FF5\u3002\u5BF9\u53D8\u66F4\u8C03\u7528 summarize_learning \u540E\u81EA\u52A8\u79EF\u7D2F\u3002",
    "concepts.col.name": "\u6982\u5FF5",
    "concepts.col.category": "\u7C7B\u522B",
    "concepts.col.count": "\u6B21\u6570",
    "review.recordsTitle": "Review \u95EE\u9898",
    "verify.records": "\u9A8C\u6536\u8BB0\u5F55",
    "confirmed.title": "\u5DF2\u786E\u5B9A\u7EA6\u675F\uFF08\u4EBA\u5DE5\u786E\u8BA4\uFF0CAI \u7981\u6539\u81EA\u52A8\u62E6\u622A\uFF09",
    "confirmed.add": "\u6DFB\u52A0\u7EA6\u675F",
    "confirmed.text": "\u7EA6\u675F/\u9700\u6C42\u5185\u5BB9",
    "confirmed.paths": "\u7981\u6539\u8DEF\u5F84\uFF08\u9017\u53F7\u5206\u9694\uFF0C\u9009\u586B\uFF09",
    "confirmed.none": "\u6682\u65E0\u7EA6\u675F\u3002\u6DFB\u52A0\u540E AI \u4FEE\u6539\u7981\u6539\u8DEF\u5F84\u5C06\u88AB\u81EA\u52A8\u62D2\u7EDD\u3002",
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
    "concepts.none": "No learning concepts yet. Run summarize_learning on a change to accumulate.",
    "concepts.col.name": "Concept",
    "concepts.col.category": "Category",
    "concepts.col.count": "Count",
    "review.recordsTitle": "Review issues",
    "verify.records": "Verification records",
    "confirmed.title": "Confirmed constraints (human-confirmed; AI edits to forbidden paths are auto-denied)",
    "confirmed.add": "Add constraint",
    "confirmed.text": "Requirement / constraint text",
    "confirmed.paths": "Forbidden paths (comma separated, optional)",
    "confirmed.none": "No constraints yet. AI edits to forbidden paths will be auto-denied once added.",
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
  badge: (color) => ({
    display: "inline-block",
    padding: "1px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    background: `${color}22`,
    color
  }),
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
  for (const item of potential.slice(0, 16)) pushEdge(chainStart(item.reason), item.path, "#8b8b8b", `ep-${item.path}`);
  return import_react2.default.createElement(
    "div",
    null,
    import_react2.default.createElement(
      "svg",
      { width: "100%", viewBox: `0 0 1024 ${height}`, style: { maxHeight: 480 } },
      [["\u53D8\u66F4\u6587\u4EF6", 0], ["\u95F4\u63A5\u5F71\u54CD\uFF08\u8C01\u5F15\u7528\u4E86\u5B83\uFF09", 1], ["\u6F5C\u5728\u5F71\u54CD\uFF08\u4E8C\u7EA7\u4F20\u64AD\uFF09", 2]].map(([name2, col]) => import_react2.default.createElement("text", { key: String(col), x: colX[col], y: 24, fontSize: 12, fontWeight: 700, fill: "var(--dsw-alias-label-primary, #1f2328)" }, name2)),
      renderCol(0, col0, "#2563eb"),
      renderCol(1, col1, "#d97706"),
      renderCol(2, col2, "#8b8b8b"),
      edges
    )
  );
}
var DIFF_KEYWORDS = /\b(public|private|protected|internal|static|void|class|struct|interface|enum|new|return|if|else|for|foreach|while|switch|case|break|continue|try|catch|finally|throw|using|namespace|import|export|from|const|let|var|async|await|function|this|base|super|null|true|false|override|virtual|abstract|sealed|readonly|params|out|ref|yield|typeof|instanceof|in|of|default|string|int|long|double|float|bool|char|decimal|object|record|partial|get|set|require|module|type|implements|extends)\b/g;
function highlightCodeLine(line, keyPrefix) {
  const trimmed = line.trimStart();
  if (trimmed.startsWith("//") || trimmed.startsWith("///") || trimmed.startsWith("*") || trimmed.startsWith("/*") || trimmed.startsWith("#")) {
    return [import_react2.default.createElement("span", { key: `${keyPrefix}-c`, style: { color: "#6a9955" } }, line)];
  }
  const parts = line.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) return import_react2.default.createElement("span", { key: `${keyPrefix}-s${i}`, style: { color: "#ce9178" } }, part);
    const sub = [];
    let last = 0;
    for (const match of part.matchAll(DIFF_KEYWORDS)) {
      if (match.index > last) sub.push(part.slice(last, match.index));
      sub.push(import_react2.default.createElement("span", { key: `${keyPrefix}-k${i}-${match.index}`, style: { color: "#569cd6" } }, match[0]));
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
    const content = kind === "meta" || kind === "hunk" ? import_react2.default.createElement("span", { style: { color: "#388bfd", fontWeight: 600 } }, line) : kind === "add" || kind === "del" ? import_react2.default.createElement("span", { style: { color: kind === "add" ? "#1a7f37" : "#cf222e", fontWeight: 600 } }, line[0]) : null;
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
  const [editingNote, setEditingNote] = (0, import_react2.useState)(null);
  const [noteSearch, setNoteSearch] = (0, import_react2.useState)("");
  const [noteExpanded, setNoteExpanded] = (0, import_react2.useState)({});
  const [aiSummarizing, setAiSummarizing] = (0, import_react2.useState)(false);
  const [modelTiers, setModelTiers] = (0, import_react2.useState)(null);
  const [modelOptions, setModelOptions] = (0, import_react2.useState)([]);
  const [modelSaving, setModelSaving] = (0, import_react2.useState)(false);
  const [modelSaved, setModelSaved] = (0, import_react2.useState)(false);
  const [execTitle, setExecTitle] = (0, import_react2.useState)("");
  const [execDesc, setExecDesc] = (0, import_react2.useState)("");
  const [memoryBranch, setMemoryBranch] = (0, import_react2.useState)("");
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
  const addNote = async () => {
    if (noteTitle.trim() === "" || noteContent.trim() === "") return;
    const { ok } = await post("/project-control/api/notes", {
      title: noteTitle.trim(),
      content: noteContent.trim(),
      sha: selectedTargets.length === 0 ? void 0 : selectedTargets[0]
    });
    if (ok) {
      setNoteTitle("");
      setNoteContent("");
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
    await post("/project-control/api/notes/update", { id: editingNote.id, title: editingNote.title, content: editingNote.content });
    setEditingNote(null);
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
      setActionResult("\u5DF2\u542F\u52A8\u6267\u884C\uFF1A" + JSON.stringify(data, null, 2));
      setExecTitle("");
      setExecDesc("");
      await refreshState();
    } catch (error) {
      setActionResult("\u2717 " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setBusy(null);
    }
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
        const response = await fetch("/project-control/api/state", { headers: { accept: "application/json" } });
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
    if (tab === "notes") void loadNotes();
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
    const refreshed = await fetch("/project-control/api/state", { headers: { accept: "application/json" } });
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
  const memories = state?.memories ?? [];
  const issues = state?.issues ?? [];
  const verifications = state?.verifications ?? [];
  const confirmed = state?.confirmed ?? [];
  const concepts = state?.concepts ?? [];
  const tabs = [
    { key: "commits", label: t("tab.commits") },
    { key: "overview", label: t("tab.overview") },
    { key: "execution", label: t("tab.execution") },
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
  const impactRiskColor = impact === null ? "#8b8b8b" : RISK_COLOR[impact.riskLevel] ?? "#8b8b8b";
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
          }, children: t("cache.regenerate") })
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
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { style: { ...styles.td, color: "#2da44e", whiteSpace: "nowrap" }, children: [
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
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { ...styles.sectionTitle, display: "inline", marginInlineEnd: "6px", color: "#ce9178" }, children: t("impact.funcCallers") }),
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: change.type }),
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.row, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.label, children: t("exec.attempts") }),
        String(state?.attemptsCount ?? 0)
      ] }) }),
      runs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("state.noRuns") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { style: styles.table, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: ["exec.col.change", "exec.col.steps", "exec.col.status", "exec.col.started", "exec.col.cost"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { style: styles.th, children: t(key) }, key)) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: runs.map((run) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: changes.find((change) => change.id === run.changeId)?.title ?? run.changeId }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: run.stepsTotal ? (run.stepsDone ?? 0) + "/" + run.stepsTotal : "\u2014" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { style: styles.td, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(run.status === "completed" ? "#4ec9b0" : run.status === "failed" ? "#f14c4c" : "#dcdcaa"), children: run.status }),
            run.currentStep !== null && run.currentStep !== void 0 && run.status === "running" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: run.currentStep })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: formatTime(run.startedAt) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: run.costUsd !== void 0 ? "$" + run.costUsd.toFixed(4) : "\u2014" })
        ] }, run.id)) })
      ] })
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "textarea",
          {
            style: styles.textarea,
            rows: 4,
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
        const visible = keyword === "" ? notes : notes.filter((note) => (note.title + " " + note.content).toLowerCase().includes(keyword));
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
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { style: styles.textarea, rows: 8, value: editing.content, onChange: (e) => {
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
                    note.title
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "4px", flexShrink: 0 }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
                      setEditingNote({ id: note.id, title: note.title, content: note.content });
                    }, children: t("notes.edit") }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.secondary, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
                      setConfirmDialog({ title: "\u5220\u9664\u8FD9\u6761\u7B14\u8BB0\uFF1F", message: "\u300C" + note.title + "\u300D\u5C06\u88AB\u6C38\u4E45\u5220\u9664\uFF0C\u4E0D\u53EF\u6062\u590D\u3002", danger: true, onConfirm: () => {
                        void removeNote(note.id);
                      } });
                    }, children: "\u2715" })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.noteContent, ...long && !expanded ? styles.noteClamp : {} }, children: note.content }),
                long && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: styles.linkBtn, onClick: () => {
                  setNoteExpanded({ ...noteExpanded, [note.id]: !expanded });
                }, children: [
                  expanded ? t("notes.collapse") : t("notes.expand"),
                  "\uFF08",
                  note.content.length,
                  " \u5B57\uFF09"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.noteMeta, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(note.createdAt).toLocaleString() }),
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { title: t("memory.record") + (project !== null ? " \xB7 " + project.name : ""), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.formRow, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { style: styles.input, placeholder: t("form.memoryTitle"), value: memoryTitle, onChange: (e) => {
          setMemoryTitle(e.target.value);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { style: styles.textarea, rows: 3, placeholder: t("form.memoryContent"), value: memoryContent, onChange: (e) => {
          setMemoryContent(e.target.value);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            style: styles.button,
            disabled: busy !== null || memoryTitle === "" || memoryContent === "",
            onClick: () => {
              void runAction("recordMemory", "/project-control/api/memory", { memoryType: "project_log", title: memoryTitle, content: memoryContent }).then(() => {
                setMemoryTitle("");
                setMemoryContent("");
              });
            },
            children: busy === "recordMemory" ? t("action.running") : t("memory.record")
          }
        )
      ] }),
      project !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: t("memory.branchScope") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { style: { ...styles.input, width: "auto", padding: "3px 8px" }, value: memoryBranch, onChange: (e) => {
          setMemoryBranch(e.target.value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: t("memory.branchAll") }),
          Array.from(new Set(memories.filter((memory) => memory.projectId === project.id).map((memory) => memory.gitBranch).filter((branch) => branch !== null && branch !== ""))).map((branch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: branch, children: branch }, branch))
        ] })
      ] }),
      memories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("memory.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { style: styles.table, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: ["memory.col.title", "memory.col.content", "memory.col.type", "memory.col.truth", "memory.col.branch", "memory.confirm"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { style: styles.th, children: t(key) }, key)) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: memories.filter((memory) => project === null || project === void 0 || memory.projectId === project.id).filter((memory) => memoryBranch === "" || memory.gitBranch === memoryBranch).map((memory) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: memory.title }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: { ...styles.td, fontSize: "11px", color: "var(--dsw-alias-label-secondary, #6b7280)" }, children: memory.content ?? "\u2014" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: memory.type }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(memory.isHumanConfirmed ? "#4ec9b0" : "#dcdcaa"), children: memory.isHumanConfirmed ? "confirmed" : memory.truthLevel }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: memory.gitBranch ?? "\u2014" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: memory.isHumanConfirmed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge("#4ec9b0"), children: "\u2713" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.button, padding: "2px 8px", fontSize: "11px" }, onClick: () => {
            void confirmMemory(memory.id);
          }, children: t("memory.confirm") }) })
        ] }, memory.id)) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { title: t("concepts.title"), children: concepts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("concepts.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { style: styles.table, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: ["concepts.col.name", "concepts.col.category", "concepts.col.count"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { style: styles.th, children: t(key) }, key)) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: concepts.map((concept) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: concept.name }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: concept.category }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: String(concept.occurrences) })
      ] }, concept.id)) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { title: t("review.recordsTitle"), children: issues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: "\u2014" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", { style: styles.table, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: issues.slice(0, 20).map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(issue.severity === "critical" || issue.severity === "high" ? "#ce9178" : "#569cd6"), children: issue.severity }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: issue.title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { style: styles.td, children: issue.status })
    ] }, issue.id)) }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { title: t("verify.records"), children: verifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: "\u2014" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", { style: styles.table, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: verifications.slice(0, 20).map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
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
  let workspaceEnabled = true;
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
              else if (!workspaceEnabled) unregisterWorkspace();
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NsaWVudC9pbmRleC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvV29ya3NwYWNlRnJhbWUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIENsaWVudCBwbHVnaW4gZW50cnkgZm9yIGRzaC1wcm9qZWN0LWNvbnRyb2wuXG4gKlxuICogXHU1RTAzXHU1QzQwXHU2N0I2XHU2Nzg0XHVGRjA4XHU1REYyXHU5QThDXHU4QkMxXHVGRjBDMjAyNi0wOC0zMFx1RkYwOVx1RkYxQVxuICogLSBcdTVERTVcdTRGNUNcdTUzRjBcdTkwNkVcdTg1M0RcdTVCOThcdTY1QjkgYGRldGFpbHNgIFx1NjlGRFx1RkYwOHByaW9yaXR5IC0xMFx1RkYwQ1x1NUI5OFx1NjVCOSBEZXRhaWxzUGFuZWwgXHU3NTU5XHU1NzI4XHU4RDI2XHU2NzJDXHU0RTBBXHVGRjBDXG4gKiAgIFx1NTM3OFx1OEY3RFx1NjIxMVx1NEVFQ1x1NzY4NFx1NkNFOFx1NTE4Q1x1NTM3M1x1NjA2Mlx1NTkwRFx1RkYwOVx1RkYwQ1x1NkUzMlx1NjdEM1x1NTcyOFx1NEUzQlx1Njg0Nlx1NjdCNiBkZXRhaWxzIFx1NTIxN1x1RkYxQlxuICogLSBXb3Jrc3BhY2VGcmFtZSBcdTZDRThcdTUxNjVcdTY4MzdcdTVGMEZcdTg4NjhcdUZGMENcdTYyOEFcdTVCOThcdTY1QjlcdTdGNTFcdTY4M0NcdTg5QzZcdTg5QzlcdTYzNjJcdTUyMTdcdUZGMUFcdTgwNEFcdTU5MjlcdUZGMDhjZW50ZXJDb2xcdUZGMDlcdTY3MDBcdTUzRjNcdTMwMDFcbiAqICAgXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4ZGV0YWlsc0NvbFx1RkYwOVx1NUM0NVx1NEUyRCAxZnJcdUZGMUJcdTY1RTBcdTRGMUFcdThCRERcdTg0M0RcdTU3MzBcdTk4NzVcdUZGMDhkYXRhLWRldGFpbHMtY29sbGFwc2VkXHVGRjA5XG4gKiAgIFx1ODFFQVx1NTJBOFx1NjA2Mlx1NTkwRFx1NTM5Rlx1NzUxRlx1NTIxN1x1NUU4Rlx1RkYxQlxuICogLSBcdTVERTZcdTRGQTdcdTVCOThcdTY1QjlcdTVCRkNcdTgyMkFcdTMwMDFcdTVCOThcdTY1QjlcdTgwNEFcdTU5MjlcdTY3MkNcdTRGNTNcdTk2RjZcdTY1MzlcdTUyQThcdUZGMUJcbiAqIC0gXHU0RkE3XHU4RkI5XHU2ODBGXHU2MzA5XHU5NEFFXHU1NzI4XHUzMDBDXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1M0YwIFx1MjFDNCBcdTVCOThcdTY1QjlcdThCRTZcdTYwQzVcdTk3NjJcdTY3N0ZcdTMwMERcdTk1RjRcdTUyMDdcdTYzNjJcdUZGMDhcdTUzRUZcdTkwMDZcdUZGMDlcdUZGMUJcbiAqIC0gYHRvb2wuY2FsbC50b29sdmlld2AgXHU0RTNBIGFuYWx5emVfY2hhbmdlIFx1NEZERFx1NzU1OVx1NEUxM1x1NUM1RVx1NTM2MVx1NzI0N1x1RkYxQlxuICogLSBcdTY1ODdcdTY4NDhcdTUxNjhcdTkwRThcdTdFQ0YgY3R4LmxvY2FsZSBcdThCQ0RcdTUxNzhcdUZGMDh6aCAvIGVuXHVGRjA5XHUzMDAyXG4gKlxuICogQG1vZHVsZSBkc2gtY2xpZW50LXByb2plY3QtY29udHJvbFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IENoYW5nZUNhcmQgfSBmcm9tICcuL2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cydcbmltcG9ydCB7IFdPUktTUEFDRV9ESUNULCBXb3Jrc3BhY2VGcmFtZSB9IGZyb20gJy4vY29tcG9uZW50cy9Xb3Jrc3BhY2VGcmFtZS50c3gnXG5cbmNvbnN0IE5TID0gJ3Byb2plY3QtY29udHJvbCdcblxuZXhwb3J0IGNvbnN0IG5hbWUgPSAnY2xpZW50LXByb2plY3QtY29udHJvbCdcbmV4cG9ydCBjb25zdCBpbmplY3QgPSBbJ3Nsb3RzJywgJ2xvY2FsZScsICdsYXlvdXQnXVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoY3R4OiBhbnkpOiB2b2lkIHtcbiAgY3R4LmVmZmVjdCgoKSA9PiBjdHgubG9jYWxlLnJlZ2lzdGVyKE5TLCB7IHpoOiBXT1JLU1BBQ0VfRElDVC56aCwgZW46IFdPUktTUEFDRV9ESUNULmVuIH0pLCAncHJvamVjdC1jb250cm9sOiBkaWN0aW9uYXJpZXMnKVxuICBjb25zdCBsYXlvdXQgPSBjdHgubGF5b3V0XG5cbiAgLy8gXHUyNTAwXHUyNTAwIDEuIFx1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTNGMFx1RkYxQVx1OTA2RVx1ODUzRCBkZXRhaWxzIFx1NjlGRFx1RkYwOFx1NTNFRlx1OTAwNlx1RkYwOVx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICBsZXQgd29ya3NwYWNlRW5hYmxlZCA9IHRydWVcbiAgbGV0IGRpc3Bvc2VXb3Jrc3BhY2U6ICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZFxuXG4gIGNvbnN0IHJlZ2lzdGVyV29ya3NwYWNlID0gKCk6IHZvaWQgPT4ge1xuICAgIGRpc3Bvc2VXb3Jrc3BhY2UgPSBjdHguc2xvdHMucmVnaXN0ZXIoXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdkZXRhaWxzJyxcbiAgICAgICAgcHJpb3JpdHk6IC0xMCxcbiAgICAgICAgbG9jYWxlOiBOUyxcbiAgICAgIH0sXG4gICAgICAvLyBcdTYzMDJcdThGN0RcdTUzNzNcdTYyNTNcdTVGMDAgZGV0YWlscyBcdThGNjhcdTkwNTNcdUZGMDhcdTk3NjJcdTY3N0ZcdTUwNEZcdTU5N0RcdTlFRDhcdThCQTQgMFx1RkYwOVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1OTcwMFx1ODk4MVx1NzcxRlx1NUI5RVx1NUJCRFx1NUVBNlx1RkYxQlxuICAgICAgLy8gXHU2NUUwXHU0RjFBXHU4QkREXHU4NDNEXHU1NzMwXHU5ODc1XHU4RjY4XHU5MDUzXHU2MDUyIDBcdUZGMENcdTU5MjlcdTcxMzZcdTRGRERcdTYzMDFcdTUzOUZcdTc1MUZcdTgyRjFcdTk2QzRcdTk4NzVcdTVFMDNcdTVDNDBcdTMwMDJcbiAgICAgIC8vIFx1NEYxQVx1OEJERFx1NTIwN1x1NjM2Mlx1NjVGNlx1NUI5OFx1NjVCOVx1NEYxQSBjbG9zZURldGFpbHMgXHUyMDE0XHUyMDE0IFx1NUVGNlx1NTQwRVx1NEUwMFx1NjJDRFx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1RkYwOFx1NUI4Rlx1NEVGQlx1NTJBMVx1NjY1QVx1NEU4RVx1NzIzNlx1N0VBNyBlZmZlY3RcdUZGMDlcdTMwMDJcbiAgICAgIChwcm9wczogYW55KSA9PiB7XG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgbGF5b3V0Py5vcGVuRGV0YWlscz8uKClcbiAgICAgICAgfSwgW10pXG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHByb3BzLnNlc3Npb25JZCA9PT0gdW5kZWZpbmVkKSByZXR1cm5cbiAgICAgICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gbGF5b3V0Py5vcGVuRGV0YWlscz8uKCksIDApXG4gICAgICAgICAgcmV0dXJuICgpID0+IHsgY2xlYXJUaW1lb3V0KHRpbWVyKSB9XG4gICAgICAgIH0sIFtwcm9wcy5zZXNzaW9uSWRdKVxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChXb3Jrc3BhY2VGcmFtZSwgeyAuLi5wcm9wcywgbGF5b3V0IH0pXG4gICAgICB9LFxuICAgIClcbiAgfVxuICBjb25zdCB1bnJlZ2lzdGVyV29ya3NwYWNlID0gKCk6IHZvaWQgPT4ge1xuICAgIGRpc3Bvc2VXb3Jrc3BhY2U/LigpXG4gICAgZGlzcG9zZVdvcmtzcGFjZSA9IHVuZGVmaW5lZFxuICB9XG5cbiAgY3R4LnNsb3RzLmluamVjdCgnZGV0YWlscycsICgpID0+IHtcbiAgICBpZiAod29ya3NwYWNlRW5hYmxlZCkgcmVnaXN0ZXJXb3Jrc3BhY2UoKVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB1bnJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICB9XG4gIH0pXG5cbiAgLy8gXHUyNTAwXHUyNTAwIDIuIFx1NEZBN1x1OEZCOVx1NjgwRlx1NUU5NVx1OTBFOFx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMCBcdTIxQzQgXHU1Qjk4XHU2NUI5XHU4QkU2XHU2MEM1IFx1NTIwN1x1NjM2MiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgLy8gXHU2MzA5XHU5NEFFXHU3MkI2XHU2MDAxXHU2NjBFXHU3OTNBXHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwXHU2NjNFXHU3OTNBXHU0RTJEIFx1MjE5MiBcdTMwMENcdUQ4M0VcdURERUQgXHU1REU1XHU0RjVDXHU1M0YwIFx1MjcxM1x1MzAwRFx1RkYxQlx1NURGMlx1NTIwN1x1NUI5OFx1NjVCOVx1OEJFNlx1NjBDNSBcdTIxOTIgXHUzMDBDXHVEODNFXHVEREVEIFx1NjI1M1x1NUYwMFx1NURFNVx1NEY1Q1x1NTNGMFx1MzAwRFx1OUFEOFx1NEVBRVx1RkYwQ1xuICAvLyBcdTc1MjhcdTYyMzdcdTk2OEZcdTY1RjZcdTc3MEJcdTVGOTdcdTUyMzBcdTYwMEVcdTRFNDhcdTUyMDdcdTU2REVcdTY3NjVcdUZGMDhcdTUyMDdcdTYzNjJcdTdFQ0Ygd2luZG93IFx1NEU4Qlx1NEVGNlx1OTAxQVx1NzdFNVx1NjMwOVx1OTRBRVx1OTFDRFx1NkUzMlx1NjdEM1x1RkYwOVx1MzAwMlxuICBjb25zdCBUT0dHTEVfRVZFTlQgPSAncGMtd29ya3NwYWNlLXRvZ2dsZSdcbiAgY29uc3QgZmlyZVRvZ2dsZSA9IChlbmFibGVkOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFRPR0dMRV9FVkVOVCwgeyBkZXRhaWw6IGVuYWJsZWQgfSkpXG4gIH1cbiAgY3R4LnNsb3RzLmluamVjdCgnc2lkZWJhci5mb290ZXIuYWN0aW9uJywgKCkgPT4ge1xuICAgIHJldHVybiBjdHguc2xvdHMucmVnaXN0ZXIoe1xuICAgICAgbmFtZTogJ3NpZGViYXIuZm9vdGVyLmFjdGlvbicsXG4gICAgICBpZDogJ3Byb2plY3QtY29udHJvbC10b2dnbGUnLFxuICAgIH0sICgpID0+IHtcbiAgICAgIGNvbnN0IFtlbmFibGVkLCBzZXRFbmFibGVkXSA9IFJlYWN0LnVzZVN0YXRlKHdvcmtzcGFjZUVuYWJsZWQpXG4gICAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gKGV2ZW50OiBFdmVudCk6IHZvaWQgPT4geyBzZXRFbmFibGVkKChldmVudCBhcyBDdXN0b21FdmVudDxib29sZWFuPikuZGV0YWlsKSB9XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFRPR0dMRV9FVkVOVCwgaGFuZGxlcilcbiAgICAgICAgcmV0dXJuICgpID0+IHsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoVE9HR0xFX0VWRU5ULCBoYW5kbGVyKSB9XG4gICAgICB9LCBbXSlcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAge1xuICAgICAgICAgICdkYXRhLXRlc3RpZCc6ICdwcm9qZWN0LWNvbnRyb2wtc2lkZWJhci10b2dnbGUnLFxuICAgICAgICAgIHRpdGxlOiBlbmFibGVkID8gJ1x1NUY1M1x1NTI0RFx1NjYzRVx1NzkzQVx1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMFx1MzAwMlx1NzBCOVx1NTFGQlx1NTNFRlx1NEUzNFx1NjVGNlx1NTIwN1x1NjM2Mlx1NEUzQVx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1RkYwOFx1NjdFNVx1NzcwQlx1NURFNVx1NTE3N1x1OEMwM1x1NzUyOFx1NzY4NFx1NUI4Q1x1NjU3NFx1OEY5M1x1NTE2NS9cdThGOTNcdTUxRkFcdUZGMDlcdUZGMUJcdTUxOERcdTcwQjlcdTY3MkNcdTYzMDlcdTk0QUVcdTUzNzNcdTYwNjJcdTU5MERcdTMwMDInIDogJ1x1NUY1M1x1NTI0RFx1NjYzRVx1NzkzQVx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1MzAwMlx1NzBCOVx1NTFGQlx1NjA2Mlx1NTkwRFx1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMFx1MzAwMicsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzZweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEwcHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgIGNvbG9yOiBlbmFibGVkID8gJ2luaGVyaXQnIDogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiBlbmFibGVkID8gNDAwIDogNjAwLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsIG9wYWNpdHk6IDAuOSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgIHdvcmtzcGFjZUVuYWJsZWQgPSAhd29ya3NwYWNlRW5hYmxlZFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKHdvcmtzcGFjZUVuYWJsZWQgJiYgZGlzcG9zZVdvcmtzcGFjZSA9PT0gdW5kZWZpbmVkKSByZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgICAgICAgICAgIGVsc2UgaWYgKCF3b3Jrc3BhY2VFbmFibGVkKSB1bnJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybignW3Byb2plY3QtY29udHJvbF0gd29ya3NwYWNlIHRvZ2dsZSBmYWlsZWQnLCBlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpcmVUb2dnbGUod29ya3NwYWNlRW5hYmxlZClcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBlbmFibGVkID8gJ1x1RDgzRVx1RERFRCBcdTVERTVcdTRGNUNcdTUzRjAgXHUyNzEzJyA6ICdcdUQ4M0VcdURERUQgXHU2MjUzXHU1RjAwXHU1REU1XHU0RjVDXHU1M0YwJyxcbiAgICAgIClcbiAgICB9KVxuICB9KVxuXG4gIC8vIFx1MjUwMFx1MjUwMCAzLiBcdTgwNEFcdTU5MjlcdTVERTVcdTUxNzdcdTUzNjFcdTcyNDdcdUZGMDhcdTYyNjdcdTg4NEMvXHU4QkM0XHU1QkExL1x1OUE4Q1x1NjUzNlx1RkYwOVx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICBjb25zdCBzaW1wbGVSZXN1bHRDYXJkID0gKHRpdGxlOiBzdHJpbmcpOiAoKHByb3BzOiBhbnkpID0+IGFueSkgPT4gKHByb3BzOiBhbnkpID0+IHtcbiAgICBjb25zdCBvdXRwdXQgPSBwcm9wcz8ub3V0cHV0XG4gICAgY29uc3QgdGV4dCA9IHR5cGVvZiBvdXRwdXQgPT09ICdzdHJpbmcnXG4gICAgICA/IG91dHB1dFxuICAgICAgOiBvdXRwdXQ/LnN1bW1hcnkgPz8gb3V0cHV0Py5pc3N1ZXMgPz8gb3V0cHV0Py5kZXRhaWxzID8/IChvdXRwdXQgPyBKU09OLnN0cmluZ2lmeShvdXRwdXQsIG51bGwsIDIpIDogJ1x1NjI2N1x1ODg0Q1x1NEUyRFx1MjAyNicpXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAnZGl2JyxcbiAgICAgIHtcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgcGFkZGluZzogJzEwcHggMTJweCcsXG4gICAgICAgICAgbWFyZ2luOiAnNHB4IDAnLFxuICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLFxuICAgICAgICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgICAgbGluZUhlaWdodDogMS42LFxuICAgICAgICAgIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsXG4gICAgICAgICAgbWF4SGVpZ2h0OiAyNjAsXG4gICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzRweCcgfSB9LCB0aXRsZSksXG4gICAgICBTdHJpbmcodGV4dCksXG4gICAgKVxuICB9XG5cbiAgLy8gXHUyNTAwXHUyNTAwIDMuIGFuYWx5emVfY2hhbmdlIFx1NEUxM1x1NUM1RVx1NURFNVx1NTE3N1x1NTM2MVx1NzI0NyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgY3R4LnNsb3RzLmluamVjdCgndG9vbC5jYWxsLnRvb2x2aWV3JywgKCkgPT4ge1xuICAgIHJldHVybiBjdHguc2xvdHMucmVnaXN0ZXIoe1xuICAgICAgbmFtZTogJ3Rvb2wuY2FsbC50b29sdmlldycsXG4gICAgICBrZXk6ICdhbmFseXplX2NoYW5nZScsXG4gICAgfSwgKHByb3BzOiBhbnkpID0+IHtcbiAgICAgIGlmIChwcm9wcz8udG9vbE5hbWUgIT09ICdhbmFseXplX2NoYW5nZScpIHJldHVybiBudWxsXG4gICAgICBjb25zdCBvdXRwdXQgPSBwcm9wcz8ub3V0cHV0XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDaGFuZ2VDYXJkLCB7XG4gICAgICAgIHRpdGxlOiAnXHU1M0Q4XHU2NkY0XHU1MjA2XHU2NzkwXHU2MkE1XHU1NDRBIChDaGFuZ2UgQW5hbHlzaXMpJyxcbiAgICAgICAgZmlsZXNDaGFuZ2VkOiBvdXRwdXQ/LmZpbGVzQ2hhbmdlZCA/PyAwLFxuICAgICAgICBpbnNlcnRpb25zOiBvdXRwdXQ/Lmluc2VydGlvbnMgPz8gMCxcbiAgICAgICAgZGVsZXRpb25zOiBvdXRwdXQ/LmRlbGV0aW9ucyA/PyAwLFxuICAgICAgICBldmlkZW5jZUlkOiBvdXRwdXQ/LmV2aWRlbmNlSWQsXG4gICAgICAgIHN0YXR1czogb3V0cHV0ID8gJ2NvbXBsZXRlZCcgOiAnYW5hbHl6aW5nJyxcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcblxuICBmb3IgKGNvbnN0IFt0b29sS2V5LCB0aXRsZV0gb2YgW1xuICAgIFsnc3RhcnRfcnVuJywgJ1x1RDgzRFx1REU4MCBcdTYyNjdcdTg4NEMgUnVuJ10sXG4gICAgWydydW5fcmV2aWV3JywgJ1x1RDgzRFx1REQwRCBcdTRFRTNcdTc4MDFcdThCQzRcdTVCQTEnXSxcbiAgICBbJ3J1bl92ZXJpZmljYXRpb24nLCAnXHUyNzA1IFx1OUE4Q1x1NjUzNlx1OUE4Q1x1OEJDMSddLFxuICBdIGFzIGNvbnN0KSB7XG4gICAgY3R4LnNsb3RzLmluamVjdCgndG9vbC5jYWxsLnRvb2x2aWV3JywgKCkgPT4ge1xuICAgICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7IG5hbWU6ICd0b29sLmNhbGwudG9vbHZpZXcnLCBrZXk6IHRvb2xLZXkgfSwgc2ltcGxlUmVzdWx0Q2FyZCh0aXRsZSkpXG4gICAgfSlcbiAgfVxufVxuIiwgIi8qKlxyXG4gKiBSZWFjdCBDb21wb25lbnQ6IENoYW5nZSAvIEluc2lnaHQgQ2FyZCBmb3IgQ2hhdCBWaWV3LlxyXG4gKiBSZW5kZXJzIHN0cnVjdHVyZWQgaW5zaWdodHMsIGRpZmYgc3RhdGlzdGljcywgYW5kIGV2aWRlbmNlIGJhZGdlcy5cclxuICpcclxuICogQG1vZHVsZSBkc2gtcHJvamVjdC1jb250cm9sL2NsaWVudC9jb21wb25lbnRzL0NoYW5nZUNhcmRcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUNhcmRQcm9wcyB7XHJcbiAgdGl0bGU/OiBzdHJpbmdcclxuICBmaWxlc0NoYW5nZWQ/OiBudW1iZXJcclxuICBpbnNlcnRpb25zPzogbnVtYmVyXHJcbiAgZGVsZXRpb25zPzogbnVtYmVyXHJcbiAgZXZpZGVuY2VJZD86IHN0cmluZ1xyXG4gIHN0YXR1cz86IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ2hhbmdlQ2FyZDogUmVhY3QuRkM8Q2hhbmdlQ2FyZFByb3BzPiA9ICh7XHJcbiAgdGl0bGUgPSAnQ2hhbmdlIEluc2lnaHQnLFxyXG4gIGZpbGVzQ2hhbmdlZCA9IDAsXHJcbiAgaW5zZXJ0aW9ucyA9IDAsXHJcbiAgZGVsZXRpb25zID0gMCxcclxuICBldmlkZW5jZUlkLFxyXG4gIHN0YXR1cyA9ICdhbmFseXplZCcsXHJcbn0pID0+IHtcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICdkaXYnLFxyXG4gICAge1xyXG4gICAgICAnZGF0YS10ZXN0aWQnOiAncHJvamVjdC1jb250cm9sLWNoYW5nZS1jYXJkJyxcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHNoLWJvcmRlciwgIzMzMyknLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgcGFkZGluZzogJzEwcHggMTRweCcsXHJcbiAgICAgICAgbWFyZ2luOiAnNnB4IDAnLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWRzaC1iZy1zdWJ0bGUsICMxZTFlMWUpJyxcclxuICAgICAgICBjb2xvcjogJ3ZhcigtLWRzaC10ZXh0LCAjZWVlKScsXHJcbiAgICAgICAgZm9udFNpemU6ICcxM3B4JyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAge1xyXG4gICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxyXG4gICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgICBtYXJnaW5Cb3R0b206ICc2cHgnLFxyXG4gICAgICAgICAgZm9udFdlaWdodDogJzYwMCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIG51bGwsIGBcdUQ4M0RcdUREMEQgJHt0aXRsZX1gKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgICAnc3BhbicsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxMXB4JyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzJweCA2cHgnLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1kc2gtYmFkZ2UtYmcsICMyYTJhMmEpJyxcclxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1kc2gtYmFkZ2UtdGV4dCwgI2FhYSknLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgKSxcclxuICAgICksXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEycHgnLCBmb250U2l6ZTogJzEycHgnLCBvcGFjaXR5OiAwLjkgfSB9LFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgbnVsbCwgYFx1RDgzRFx1RENDMSAke2ZpbGVzQ2hhbmdlZH0gZmlsZXNgKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6ICcjNGVjOWIwJyB9IH0sIGArJHtpbnNlcnRpb25zfWApLFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBzdHlsZTogeyBjb2xvcjogJyNmMTRjNGMnIH0gfSwgYC0ke2RlbGV0aW9uc31gKSxcclxuICAgICAgZXZpZGVuY2VJZFxyXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgICAgICAgJ3NwYW4nLFxyXG4gICAgICAgICAgICB7IHN0eWxlOiB7IG9wYWNpdHk6IDAuNywgZm9udEZhbWlseTogJ21vbm9zcGFjZScgfSB9LFxyXG4gICAgICAgICAgICBgWyR7ZXZpZGVuY2VJZH1dYCxcclxuICAgICAgICAgIClcclxuICAgICAgICA6IG51bGwsXHJcbiAgICApLFxyXG4gIClcclxufVxyXG4iLCAiLyoqXG4gKiBQcm9qZWN0IENvbnRyb2wgXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4V29ya3NwYWNlRnJhbWVcdUZGMDl2Mlx1RkYxQVx1NTZGNFx1N0VENVwiXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XCJcdTdFQzRcdTdFQzdcdTMwMDJcbiAqXG4gKiBcdTU2REJcdTRFMkFcdTk4NzVcdTdCN0VcdUZGMUFcbiAqIDEuIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1RkYwOFx1OUVEOFx1OEJBNFx1RkYwOVx1RkYxQVx1NEVEM1x1NUU5M1x1NjgwRlx1RkYwOFx1NTkxQVx1NEVEM1x1NUU5M1x1NTIwN1x1NjM2Mlx1RkYwOSsgXHU2M0QwXHU0RUE0XHU1MjE3XHU4ODY4XHVGRjA4XHU1NDJCXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4XHVGRjA5K1xuICogICAgXHU4QkU2XHU2MEM1XHU5NzYyXHU2NzdGXHVGRjA4QUkgXHU4OUUzXHU4QkZCXHVGRjFBXHU2NTM5XHU0RTg2XHU0RUMwXHU0RTQ4L1x1NUI5RVx1NzNCMFx1OTAzQlx1OEY5MS9cdTk4Q0VcdTk2NjlcdUZGMUJcdTRFMDlcdTdFQTdcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjQgU1ZHIFx1NTZGRVx1RkYxQlx1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNVx1N0VEM1x1OEJCQVx1RkYwOVx1MzAwMlxuICogMi4gXHU5ODc5XHU3NkVFXHU2MDNCXHU4OUM4XHVGRjFBXHU5ODc5XHU3NkVFXHU2ODYzXHU2ODQ4ICsgXHU1RkVCXHU2Mzc3XHU2NENEXHU0RjVDICsgXHU1REYyXHU3ODZFXHU1QjlBXHU3RUE2XHU2NzVGICsgXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExXHUzMDAyXG4gKiAzLiBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdUZGMUFSdW4gXHU4RkRCXHU1RUE2XHU0RTBFXHU2MjEwXHU2NzJDXHUzMDAyXG4gKiA0LiBcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzZcdUZGMUFcdTY4MzhcdTY3RTVcdTdCMTRcdThCQjBcdUZGMDhcdTUzRUZcdTUxNzNcdTgwNTRcdTYzRDBcdTRFQTRcdUZGMDkrIFx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNlx1RkYwOFx1NEVCQVx1NURFNVx1Nzg2RVx1OEJBNFx1RkYwOSsgXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1ICsgUmV2aWV3L1x1OUE4Q1x1NjUzNlx1OEJCMFx1NUY1NVx1MzAwMlxuICpcbiAqIFx1NUUwM1x1NUM0MFx1NjczQVx1NTIzNlx1NEUwRFx1NTNEOFx1RkYxQVx1OTA2RVx1ODUzRFx1NUI5OFx1NjVCOSBkZXRhaWxzIFx1NjlGRCArIFx1NkNFOFx1NTE2NVx1NjgzN1x1NUYwRlx1NjM2Mlx1NTIxN1x1RkYwOFx1ODA0QVx1NTkyOVx1NjcwMFx1NTNGM1x1RkYwOSsgXHU1MjA2XHU5Njk0XHU2NzYxXHU2MkQ2XHU2MkZEXHU4QkIwXHU1RkM2XHVGRjFCXG4gKiBcdTdFREZcdThCQTFcdTg4NENcdTRFMjRcdTg4NENcdTk0QjNcdTUyMzZcdTc1MzFcdThGRDBcdTg4NENcdTY1RjZcdTYzMDlcdTY3ODRcdTVFRkFcdTU0QzhcdTVFMENcdTdDQkVcdTUxQzZcdTZDRThcdTUxNjVcdUZGMDhhcHBseVN0YXRzTGluZUNsYW1wXHVGRjA5XHUzMDAyXG4gKlxuICogQG1vZHVsZSBkc2gtY2xpZW50LXByb2plY3QtY29udHJvbC9jb21wb25lbnRzL1dvcmtzcGFjZUZyYW1lXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcblxuLyoqIFx1NUJCRlx1NEUzQiAvc3RhdGUgXHU4RkQ0XHU1NkRFXHU3Njg0XHU1RkVCXHU3MTY3XHU1RjYyXHU3MkI2XHVGRjA4XHU0RTBFIGFwaS1yb3V0ZS50cyBidWlsZFN0YXRlIFx1NUJGOVx1OUY1MFx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGludGVyZmFjZSBXb3Jrc3BhY2VTdGF0ZSB7XG4gIHJlYWR5PzogYm9vbGVhblxuICByZWFzb24/OiBzdHJpbmdcbiAgcGx1Z2luVmVyc2lvbj86IHN0cmluZ1xuICBwcm9qZWN0PzogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IHJvb3RQYXRoOiBzdHJpbmc7IGNyZWF0ZWRBdDogbnVtYmVyIH0gfCBudWxsXG4gIGNoYW5nZXM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IHNvdXJjZTogc3RyaW5nOyB1cGRhdGVkQXQ6IG51bWJlciB9PlxuICBydW5zPzogQXJyYXk8eyBpZDogc3RyaW5nOyBjaGFuZ2VJZDogc3RyaW5nOyBzdGF0dXM6IHN0cmluZzsgc3RhcnRlZEF0OiBudW1iZXIgfCBudWxsOyBmaW5pc2hlZEF0OiBudW1iZXIgfCBudWxsOyBjb3N0VXNkPzogbnVtYmVyOyBzdGVwc1RvdGFsPzogbnVtYmVyOyBzdGVwc0RvbmU/OiBudW1iZXI7IGN1cnJlbnRTdGVwPzogc3RyaW5nIHwgbnVsbCB9PlxuICBhdHRlbXB0c0NvdW50PzogbnVtYmVyXG4gIG1lbW9yaWVzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBwcm9qZWN0SWQ6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0cnV0aExldmVsOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ/OiBzdHJpbmc7IGlzSHVtYW5Db25maXJtZWQ6IGJvb2xlYW47IGdpdEJyYW5jaDogc3RyaW5nIHwgbnVsbDsgY3JlYXRlZEF0OiBudW1iZXIgfT5cbiAgZXZpZGVuY2VDb3VudD86IG51bWJlclxuICByZWNlbnRFdmlkZW5jZT86IEFycmF5PHsgaWQ6IHN0cmluZzsgc291cmNlOiBzdHJpbmc7IHRydXRoTGV2ZWw6IHN0cmluZzsgbG9jYXRvcjogc3RyaW5nOyBzbmlwcGV0OiBzdHJpbmc7IGNyZWF0ZWRBdDogbnVtYmVyIH0+XG4gIGltcG9ydGVkQ2hhbmdlcz86IEFycmF5PHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgY29tbWl0Q291bnQ6IG51bWJlcjsgZmlyc3RDb21taXRBdDogbnVtYmVyOyBsYXN0Q29tbWl0QXQ6IG51bWJlcjsgY29uZmlkZW5jZTogbnVtYmVyOyBzdGF0dXM6IHN0cmluZyB9PlxuICBpc3N1ZXM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IHNldmVyaXR5OiBzdHJpbmc7IGNhdGVnb3J5OiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nIH0+XG4gIHZlcmlmaWNhdGlvbnM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IGNoYW5nZUlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgdHlwZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZzsgY3JlYXRlZEF0OiBudW1iZXIgfT5cbiAgYm9vdHN0cmFwPzogeyBpZDogc3RyaW5nOyBzdW1tYXJ5OiBzdHJpbmc7IHRlY2hTdGFjazogc3RyaW5nW107IG1hbmlmZXN0RmlsZXM6IHN0cmluZ1tdOyBzeW1ib2xzQ291bnQ6IG51bWJlcjsgY3JlYXRlZEF0OiBudW1iZXIgfSB8IG51bGxcbiAgY29uZmlybWVkPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHRleHQ6IHN0cmluZzsgZm9yYmlkZGVuUGF0aHM6IHN0cmluZ1tdIH0+XG4gIGNvbmNlcHRzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNhdGVnb3J5OiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmc7IG9jY3VycmVuY2VzOiBudW1iZXIgfT5cbn1cblxuLyoqIEdFVCAvY29tbWl0cyBcdTc2ODRcdTYzRDBcdTRFQTRcdTY3NjFcdTc2RUVcdTMwMDIgKi9cbmludGVyZmFjZSBDb21taXRFbnRyeSB7XG4gIHNoYTogc3RyaW5nXG4gIHNob3J0SGFzaDogc3RyaW5nXG4gIGF1dGhvcjogc3RyaW5nXG4gIGRhdGU6IG51bWJlclxuICBzdWJqZWN0OiBzdHJpbmdcbiAgZmlsZXM6IEFycmF5PHsgcGF0aDogc3RyaW5nOyBhZGRzOiBudW1iZXI7IGRlbHM6IG51bWJlciB9PlxufVxuXG5pbnRlcmZhY2UgQ29tbWl0c1BheWxvYWQge1xuICByb290UGF0aDogc3RyaW5nXG4gIGJyYW5jaDogc3RyaW5nIHwgbnVsbFxuICBoZWFkU2hhOiBzdHJpbmcgfCBudWxsXG4gIHdvcmtpbmc6IHsgZmlsZUNvdW50OiBudW1iZXI7IGlzQ2xlYW46IGJvb2xlYW47IGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmcgfT4gfVxuICBjb21taXRzOiBDb21taXRFbnRyeVtdXG59XG5cbmludGVyZmFjZSBDb21taXREZXRhaWxQYXlsb2FkIHtcbiAgc2hhOiBzdHJpbmdcbiAgaXNXb3JraW5nOiBib29sZWFuXG4gIGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgYWRkczogbnVtYmVyOyBkZWxzOiBudW1iZXIgfT5cbiAgaW5zZXJ0aW9uczogbnVtYmVyXG4gIGRlbGV0aW9uczogbnVtYmVyXG4gIHBhdGNoVHJ1bmNhdGVkOiBib29sZWFuXG4gIHBhdGNoOiBzdHJpbmdcbiAgY29tbWl0OiB7IG1lc3NhZ2U6IHN0cmluZzsgYXV0aG9yOiBzdHJpbmc7IGRhdGU6IG51bWJlciB9IHwgbnVsbFxuICBhbmFseXNpczogeyB3aGF0OiBzdHJpbmc7IGxvZ2ljOiBzdHJpbmdbXTsgcmlza3M6IHN0cmluZ1tdIH1cbiAgYW5hbHlzaXNDYWNoZWQ/OiBib29sZWFuXG4gIGFuYWx5c2lzR2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXG59XG5cbmludGVyZmFjZSBJbXBhY3RTY29wZVBheWxvYWQge1xuICBjaGFuZ2VkRmlsZXM6IHN0cmluZ1tdXG4gIHNoYXM/OiBzdHJpbmdbXVxuICByaXNrTGV2ZWw6ICdsb3cnIHwgJ21lZGl1bScgfCAnaGlnaCcgfCAnY3JpdGljYWwnXG4gIHJpc2tTY29yZTogbnVtYmVyXG4gIHJpc2tGYWN0b3JzPzogQXJyYXk8eyB0ZXh0OiBzdHJpbmc7IHBvaW50czogbnVtYmVyIH0+XG4gIGtleUNoYW5nZVBvaW50cz86IHN0cmluZ1tdXG4gIG1lbW9yaWVzPzogQXJyYXk8eyB0aXRsZTogc3RyaW5nOyB0eXBlOiBzdHJpbmcgfT5cbiAgZnVuY3Rpb25JbXBhY3Q/OiBBcnJheTx7XG4gICAgc3ltYm9sOiBzdHJpbmdcbiAgICBkZWZpbmVkSW46IHN0cmluZ1xuICAgIHJvbGU/OiBzdHJpbmdcbiAgICBjaGFuZ2U/OiBzdHJpbmdcbiAgICBpbXBhY3Q/OiBzdHJpbmdcbiAgICBjYWxsZXJzOiBBcnJheTx7IGZpbGU6IHN0cmluZzsgbGluZTogc3RyaW5nOyBzbmlwcGV0OiBzdHJpbmcgfT5cbiAgfT5cbiAgbGV2ZWxzOiBBcnJheTx7IGxldmVsOiBzdHJpbmc7IGRlcHRoOiBudW1iZXI7IHBhdGg6IHN0cmluZzsgY29uZmlkZW5jZTogbnVtYmVyOyByZWFzb246IHN0cmluZyB9PlxuICBkaXJlY3Q6IHN0cmluZ1tdXG4gIGV4cGxhbmF0aW9uc0NhY2hlZD86IGJvb2xlYW5cbiAgZ2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmV2aWV3UGF5bG9hZCB7XG4gIGlzc3Vlc0ZvdW5kOiBudW1iZXJcbiAgaXNzdWVzOiBzdHJpbmdcbiAgdmVyZGljdDogc3RyaW5nXG4gIGNhY2hlZD86IGJvb2xlYW5cbiAgZ2VuZXJhdGVkQXQ/OiBudW1iZXIgfCBudWxsXG4gIGlzc3VlTGlzdD86IEFycmF5PHsgc2V2ZXJpdHk6IHN0cmluZzsgY2F0ZWdvcnk6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgZXZpZGVuY2U6IHN0cmluZzsgZml4OiBzdHJpbmcgfT5cbn1cblxuaW50ZXJmYWNlIE5vdGVFbnRyeSB7XG4gIGlkOiBzdHJpbmdcbiAgcHJvamVjdElkOiBzdHJpbmdcbiAgc2hhPzogc3RyaW5nXG4gIHRpdGxlOiBzdHJpbmdcbiAgY29udGVudDogc3RyaW5nXG4gIGNyZWF0ZWRBdDogbnVtYmVyXG59XG5cbi8qKlxuICogXHU4OUM2XHU4OUM5XHU2MzYyXHU1MjE3XHU2ODM3XHU1RjBGXHU4ODY4XHVGRjFBXHU5NjhGXHU2NzJDXHU3RUM0XHU0RUY2XHU2MzAyXHU4RjdEL1x1NTM3OFx1OEY3RFx1RkYwOFx1NTM3OFx1OEY3RFx1NTM3M1x1NUI4Q1x1NTE2OFx1NjA2Mlx1NTkwRFx1NTM5Rlx1NzUxRlx1NUUwM1x1NUM0MFx1RkYwOVx1MzAwMlxuICogXHU2Q0U4XHU2MTBGXHVGRjFBXHU3OTgxXHU2QjYyXHU3NTI4IDpoYXMoKSBcdTUwNUFcdTc5NTZcdTUxNDhcdTUzMzlcdTkxNERcdTIwMTRcdTIwMTRcdTVCOThcdTY1QjlcdTY3ODRcdTVFRkFcdTRFQTdcdTcyNjlcdTUxRTBcdTUzNDFcdTRFMkFcdTdFQzRcdTRFRjZcdTY4MzlcdTdDN0JcdTkwRkRcdTUzRUIgcm9vdFx1RkYwQ1xuICogXHU3OTU2XHU1MTQ4XHU1MzM5XHU5MTREXHU0RjFBXHU2MjhBXHU2NTc0XHU0RTJBXHU4MDRBXHU1OTI5XHU1QkI5XHU1NjY4XHU4QkVGXHU5NEIzXHU1MjM2XHVGRjA4XHU1Mzg2XHU1M0YyXHU0RThCXHU2NTQ1XHVGRjA5XHUzMDAyXHU2QjY0XHU4ODY4XHU1M0VBXHU0RkREXHU3NTU5XHU3RjUxXHU2ODNDXHU2MzYyXHU1MjE3XHU0RTBFXHU2MkQ2XHU2MkZEXHU2N0M0XHU5NjkwXHU4NUNGXHUzMDAyXG4gKi9cbmNvbnN0IExBWU9VVF9TVFlMRSA9IGBcbmRpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0gPiBkaXZbY2xhc3MqPVwiY2VudGVyQ29sXCJdIHsgb3JkZXI6IDM7IH1cbmRpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0gPiBkaXZbY2xhc3MqPVwiZGV0YWlsc0NvbFwiXSB7IG9yZGVyOiAyOyB9XG5kaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdW2RhdGEtZGV0YWlscy1jb2xsYXBzZWRdID4gZGl2W2NsYXNzKj1cImNlbnRlckNvbFwiXSxcbmRpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl1bZGF0YS1kZXRhaWxzLWNvbGxhcHNlZF0gPiBkaXZbY2xhc3MqPVwiZGV0YWlsc0NvbFwiXSB7IG9yZGVyOiAwOyB9XG5kaXZbY2xhc3MqPVwiaGFuZGxlXCJdW2RhdGEtc2lkZT1cImRldGFpbHNcIl0geyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH1cbmRpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl06bm90KFtkYXRhLWRldGFpbHMtY29sbGFwc2VkXSkge1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gbWlubWF4KDAsIDFmcikgdmFyKC0tcGMtY2hhdC13LCAzNjBweCkgIWltcG9ydGFudDtcbn1cbmBcblxuLyoqXG4gKiBcdTRGMUFcdThCRERcdTdFREZcdThCQTFcdTg4NENcdTc2ODRcdTRFMjRcdTg4NENcdTk0QjNcdTUyMzZcdUZGMDhcdTc1MjhcdTYyMzdcdTYzMDdcdTVCOUFcdTc2ODRcdTY4MzdcdTVGMEZcdUZGMDlcdTMwMDJcdTRFMERcdTgwRkRcdThENzAgQ1NTIFx1OTAwOVx1NjJFOVx1NTY2OFx1RkYxQVxuICogXHU1Qjk4XHU2NUI5XHU1OTFBXHU0RTJBXHU2QTIxXHU1NzU3XHU3Njg0XHU2ODM5XHU3QzdCXHU5MEZEXHU1M0VCIGByb290YFx1RkYwOFx1Njc4NFx1NUVGQVx1NTQwRVx1NjYyRiBgaGFzaF9yb290YFx1RkYwOVx1RkYwQ1x1NTE3Nlx1NEUyRFxuICogQ29udmVyc2F0aW9uUm9vdCBcdTc2ODRcdTVCNTBcdTY4MTFcdTkxQ0NcdTVDMzFcdTUzMDVcdTU0MkJcdTdFREZcdThCQTFcdTg4NENcdTc2ODQgYGhhc2hfc2VwYCBcdTUyMDZcdTk2OTQgc3Bhblx1MjAxNFx1MjAxNFxuICogXHU0RUZCXHU0RjU1XHU3OTU2XHU1MTQ4XHU1MzM5XHU5MTREXHVGRjA4XHU1NDJCIDpoYXMoKVx1RkYwOVx1OTBGRFx1NEYxQVx1NjI4QVx1NjU3NFx1NEUyQVx1ODA0QVx1NTkyOVx1NUJCOVx1NTY2OFx1OTRCM1x1NjIxMFx1NEUyNFx1ODg0Q1x1RkYwQ1x1Njc0MFx1NkI3Qlx1NkVEQVx1NTJBOFx1MzAwMlxuICogXHU1NkUwXHU2QjY0XHU1NzI4XHU4RkQwXHU4ODRDXHU2NUY2XHU2MzA5XHU1NTJGXHU0RTAwXHU1RjYyXHU3MkI2XHU1QjlBXHU0RjREXHVGRjFBXHU1QzQ1XHU0RTJEXHU2MzkyXHU3MjQ4ICsgXHU3NkY0XHU2M0E1XHU1QjUwXHU0RUUzXHU1NDJCXHU2NTg3XHU2NzJDIFwifFwiIFx1NzY4NFxuICogXHU1MjA2XHU5Njk0IHNwYW5cdUZGMENcdTU0N0RcdTRFMkRcdTU0MEVcdTYyOEFcdTVCOThcdTY1QjlcdTdDN0JcdTU0MERcdTUzOUZcdTY4MzdcdTUxOTlcdThGREJcdTY4MzdcdTVGMEZcdTg4NjhcdUZGMDhcdTdDQkVcdTUxQzZcdTUyMzBcdTY3ODRcdTVFRkFcdTU0QzhcdTVFMENcdUZGMDlcdTMwMDJcbiAqIEByZXR1cm5zIFx1NkNFOFx1NTE2NVx1NzY4NCBzdHlsZSBcdTUxNDNcdTdEMjBcdUZGMUJcdTVCOThcdTY1QjlcdTY3MkFcdTZFMzJcdTY3RDNcdTdFREZcdThCQTFcdTg4NENcdTY1RjZcdTRFM0EgdW5kZWZpbmVkXHUzMDAyXG4gKi9cbmNvbnN0IGFwcGx5U3RhdHNMaW5lQ2xhbXAgPSAoKTogSFRNTFN0eWxlRWxlbWVudCB8IHVuZGVmaW5lZCA9PiB7XG4gIGNvbnN0IHNlcFNwYW4gPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTFNwYW5FbGVtZW50PignZGl2W2NsYXNzKj1cIl9yb290XCJdID4gc3BhbltjbGFzcyo9XCJfc2VwXCJdJykpXG4gICAgLmZpbmQoKHNwYW4pID0+IHNwYW4udGV4dENvbnRlbnQgPT09ICd8JylcbiAgY29uc3Qgcm9vdERpdiA9IHNlcFNwYW4/LnBhcmVudEVsZW1lbnRcbiAgY29uc3QgaGFzaENsYXNzID0gcm9vdERpdj8uY2xhc3NOYW1lLnNwbGl0KC9cXHMrLykuZmluZCgobmFtZSkgPT4gbmFtZS5lbmRzV2l0aCgnX3Jvb3QnKSlcbiAgaWYgKHJvb3REaXYgPT09IHVuZGVmaW5lZCB8fCByb290RGl2ID09PSBudWxsIHx8IGhhc2hDbGFzcyA9PT0gdW5kZWZpbmVkIHx8IGdldENvbXB1dGVkU3R5bGUocm9vdERpdikudGV4dEFsaWduICE9PSAnY2VudGVyJykgcmV0dXJuIHVuZGVmaW5lZFxuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGUuaWQgPSAncGMtc3RhdHMtY2xhbXAnXG4gIHN0eWxlLnRleHRDb250ZW50ID0gYFxuZGl2W2NsYXNzPVwiJHtoYXNoQ2xhc3N9XCJdIHtcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gIC13ZWJraXQtbGluZS1jbGFtcDogMjtcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcbiAgdGV4dC1vdmVyZmxvdzogY2xpcDtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBsaW5lLWhlaWdodDogMS41O1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG5gXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpXG4gIHJldHVybiBzdHlsZVxufVxuXG50eXBlIFRhYktleSA9ICdjb21taXRzJyB8ICdvdmVydmlldycgfCAnZXhlY3V0aW9uJyB8ICdub3RlcycgfCAnc2V0dGluZ3MnXG5cbmV4cG9ydCBpbnRlcmZhY2UgV29ya3NwYWNlRnJhbWVQcm9wcyB7XG4gIC8qKiBcdTVCOThcdTY1QjkgZGV0YWlscyBcdTY5RkRcdTU5NTFcdTdFQTZcdTc2ODQgbG9jYWxlIFx1NkNFOFx1NTE2NVx1RkYwOFx1NjIxMVx1NEVFQ1x1NkNFOFx1NTE4Q1x1NzY4NCBwcm9qZWN0LWNvbnRyb2wgXHU4QkNEXHU1MTc4XHVGRjA5XHUzMDAyICovXG4gIHQ/OiAoa2V5OiBzdHJpbmcpID0+IHN0cmluZ1xuICAvKiogXHU1RjUzXHU1MjREXHU0RjFBXHU4QkREIGlkXHVGRjA4XHU1Qjk4XHU2NUI5IHNlc3Npb24gXHU2ODA3XHU1MUM2XHU1QzVFXHU2MDI3XHVGRjFCXHU1MjA3XHU2MzYyXHU0RjFBXHU4QkREXHU2NUY2XHU5MUNEXHU2NUIwXHU2NDkxXHU1RjAwXHU1REU1XHU0RjVDXHU1M0YwXHU4RjY4XHU5MDUzXHVGRjA5XHUzMDAyICovXG4gIHNlc3Npb25JZD86IHN0cmluZ1xufVxuXG4vKiogXHU1REU1XHU0RjVDXHU1M0YwXHU2NTg3XHU2ODQ4XHU4QkNEXHU1MTc4XHVGRjA4emggLyBlblx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGNvbnN0IFdPUktTUEFDRV9ESUNUID0ge1xuICB6aDoge1xuICAgICd3b3Jrc3BhY2UudGl0bGUnOiAnXHU5ODc5XHU3NkVFXHU2ODM4XHU2N0U1XHU1M0YwJyxcbiAgICAndGFiLmNvbW1pdHMnOiAnXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1JyxcbiAgICAndGFiLm92ZXJ2aWV3JzogJ1x1OTg3OVx1NzZFRVx1NjAzQlx1ODlDOCcsXG4gICAgJ3RhYi5leGVjdXRpb24nOiAnXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzJyxcbiAgICAndGFiLm5vdGVzJzogJ1x1N0IxNFx1OEJCMFx1NEUwRVx1OEJCMFx1NUZDNicsXG4gICAgJ3RhYi5zZXR0aW5ncyc6ICdcdThCQkVcdTdGNkUnLFxuICAgICdlcnJvci5sb2FkJzogJ1x1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNScsXG4gICAgJ3N0YXRlLnByb2plY3QnOiAnXHU1RjUzXHU1MjREXHU5ODc5XHU3NkVFJyxcbiAgICAnc3RhdGUubm9Qcm9qZWN0JzogJ1x1NUMxQVx1NjcyQVx1NTIxRFx1NTlDQlx1NTMxNlx1OTg3OVx1NzZFRScsXG4gICAgJ3N0YXRlLm5vUHJvamVjdEhpbnQnOiAnXHU3MEI5XHU1MUZCXHUzMDBDXHU1MjFEXHU1OUNCXHU1MzE2XHU5ODc5XHU3NkVFXHUzMDBEXHU2MjZCXHU2M0NGXHU0RUQzXHU1RTkzXHU3RUQzXHU2Nzg0XHUzMDAxXHU2MjgwXHU2NzJGXHU2ODA4XHU0RTBFXHU3QjI2XHU1M0Y3XHU3RDIyXHU1RjE1XHUzMDAyJyxcbiAgICAnYWN0aW9uLmJvb3RzdHJhcCc6ICdcdTUyMURcdTU5Q0JcdTUzMTZcdTk4NzlcdTc2RUUnLFxuICAgICdhY3Rpb24ucmVzY2FuJzogJ1x1OTFDRFx1NjVCMFx1NTIxRFx1NTlDQlx1NTMxNiAvIFx1NjI2Qlx1NjNDRicsXG4gICAgJ2FjdGlvbi5hbmFseXplJzogJ1x1NTIwNlx1Njc5MFx1NUY1M1x1NTI0RFx1NjUzOVx1NTJBOCcsXG4gICAgJ2FjdGlvbi5yZXZpZXcnOiAnXHU4QkM0XHU1QkExXHU1RjUzXHU1MjREXHU2NTM5XHU1MkE4JyxcbiAgICAnYWN0aW9uLnZlcmlmeSc6ICdcdTlBOENcdTY1MzZcdTVGNTNcdTUyNERcdTY1MzlcdTUyQTgnLFxuICAgICdhY3Rpb24uY3JlYXRlQ2hhbmdlJzogJ1x1NjVCMFx1NUVGQVx1NTNEOFx1NjZGNCcsXG4gICAgJ2FjdGlvbi5ydW5uaW5nJzogJ1x1NjI2N1x1ODg0Q1x1NEUyRFx1MjAyNicsXG4gICAgJ2FjdGlvbi5yZWZyZXNoJzogJ1x1NTIzN1x1NjVCMCcsXG4gICAgJ2Zvcm0uY2hhbmdlVGl0bGUnOiAnXHU1M0Q4XHU2NkY0XHU2ODA3XHU5ODk4JyxcbiAgICAnZm9ybS5jaGFuZ2VEZXNjJzogJ1x1OTcwMFx1NkM0Mlx1NEUwRVx1ODBDQ1x1NjY2Rlx1RkYwOFx1OTAwOVx1NTg2Qlx1RkYwOScsXG4gICAgJ3Jlc3VsdC5wYW5lbCc6ICdcdTY0Q0RcdTRGNUNcdTdFRDNcdTY3OUMnLFxuXG4gICAgJ3JlcG8uc2Nhbkhpc3RvcnknOiAnXHU5MUNEXHU1RUZBXHU1Mzg2XHU1M0YyJyxcbiAgICAncmVwby5jb21taXRzJzogJ1x1NjNEMFx1NEVBNCcsXG4gICAgJ3JlcG8uYnJhbmNoJzogJ1x1NTIwNlx1NjUyRicsXG4gICAgJ3JlcG8ud29ya2luZyc6ICdcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQTgnLFxuICAgICdyZXBvLndvcmtpbmdDbGVhbic6ICdcdTVERTVcdTRGNUNcdTUzM0FcdTVFNzJcdTUxQzBcdUZGMENcdTY1RTBcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQTgnLFxuICAgICdyZXBvLmVtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1NjNEMFx1NEVBNFx1MzAwMicsXG4gICAgJ3JlcG8ubG9hZEZhaWxlZCc6ICdcdTYzRDBcdTRFQTRcdTUyQTBcdThGN0RcdTU5MzFcdThEMjUnLFxuICAgICdwaWNrZXIudGl0bGUnOiAnXHU5MDA5XHU2MkU5XHU4OTgxXHU2ODM4XHU2N0U1XHU3Njg0XHU2M0QwXHU0RUE0XHVGRjA4XHU1M0VGXHU1OTFBXHU5MDA5XHVGRjA5JyxcbiAgICAncGlja2VyLnBsYWNlaG9sZGVyJzogJ1x1NzBCOVx1NTFGQlx1OTAwOVx1NjJFOVx1NjNEMFx1NEVBNFx1RkYwOFx1NTNFRlx1NTkxQVx1OTAwOVx1RkYwQ1x1NTQyQlx1NjcyQVx1NjNEMFx1NEVBNFx1NjUzOVx1NTJBOFx1RkYwOScsXG4gICAgJ3BpY2tlci5zZWxlY3RlZCc6ICdcdTVERjJcdTkwMDknLFxuICAgICdwaWNrZXIuZmlsdGVyJzogJ1x1NjMwOVx1NjgwN1x1OTg5OC9cdTU0QzhcdTVFMEMvXHU0RjVDXHU4MDA1XHU4RkM3XHU2RUU0XHUyMDI2JyxcbiAgICAncGlja2VyLmNsZWFyJzogJ1x1NkUwNVx1N0E3QScsXG4gICAgJ3BpY2tlci5ub01hdGNoJzogJ1x1NjVFMFx1NTMzOVx1OTE0RFx1NjNEMFx1NEVBNFx1MzAwMicsXG4gICAgJ3BpY2tlci5oaW50JzogJ1x1NTJGRVx1OTAwOVx1NjNEMFx1NEVBNFx1NTQwRVx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMCBBSSBcdTg5RTNcdThCRkJcdUZGMUJcdTRFMEJcdTY1QjlcdTUzRUZcdTUxOERcdThERDFcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdTRFMEVcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTVcdTMwMDInLFxuICAgICdpbXBhY3QuZmFjdG9ycyc6ICdcdTk4Q0VcdTk2NjlcdTY3ODRcdTYyMTBcdUZGMDhcdTRFM0FcdTRFQzBcdTRFNDhcdTY2MkZcdThGRDlcdTRFMkFcdTdCNDlcdTdFQTdcdUZGMDknLFxuICAgICdpbXBhY3QucG9pbnRzJzogJ1x1NUY3MVx1NTRDRFx1NzBCOVx1NjYwRVx1N0VDNicsXG4gICAgJ2ltcGFjdC5rZXlQb2ludHMnOiAnXHU1MTczXHU5NTJFXHU3RUM0XHU0RUY2JyxcbiAgICAnaW1wYWN0Lm1lbW9yeSc6ICdcdTdFRDNcdTU0MDhcdTk4NzlcdTc2RUVcdThCQjBcdTVGQzZcdTY4MzhcdTY3RTUnLFxuICAgICdpbXBhY3QuZnVuY3Rpb25zJzogJ1x1NTNEN1x1NUY3MVx1NTRDRFx1NTFGRFx1NjU3MFx1RkYwOFx1OEMwMVx1OEMwM1x1NzUyOFx1NEU4Nlx1ODhBQlx1NjUzOVx1NzY4NFx1NEVFM1x1NzgwMVx1RkYwOScsXG4gICAgJ2ltcGFjdC5mdW5jUm9sZSc6ICdcdTUxRkRcdTY1NzBcdTUyOUZcdTgwRkQnLFxuICAgICdpbXBhY3QuZnVuY0NoYW5nZSc6ICdcdTY3MkNcdTZCMjFcdTUzRDhcdTUzMTYnLFxuICAgICdpbXBhY3QuZnVuY0NhbGxlcnMnOiAnXHU1QkY5XHU4QzAzXHU3NTI4XHU2NUI5XHU3Njg0XHU1RjcxXHU1NENEJyxcbiAgICAnY2FjaGUuaGl0JzogJ1x1Njc2NVx1ODFFQVx1N0YxM1x1NUI1OCcsXG4gICAgJ2NhY2hlLnJlZ2VuZXJhdGUnOiAnXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwJyxcbiAgICAnZXhlYy5jcmVhdGUnOiAnXHU2NUIwXHU1RUZBXHU2MjY3XHU4ODRDJyxcbiAgICAnZXhlYy5mb3JtVGl0bGUnOiAnXHU4OTgxXHU1MDVBXHU0RUMwXHU0RTQ4XHVGRjA4XHU0RTAwXHU1M0U1XHU4QkREXHVGRjA5JyxcbiAgICAnZXhlYy5mb3JtRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMUFcdTc2RUVcdTY4MDdcdTMwMDFcdTZEODlcdTUzQ0FcdTZBMjFcdTU3NTdcdTMwMDFcdTlBOENcdTY1MzZcdTY4MDdcdTUxQzYnLFxuICAgICdleGVjLnN0YXJ0JzogJ1x1NUYwMFx1NTlDQlx1NjI2N1x1ODg0QycsXG4gICAgJ2V4ZWMuc3RhcnRpbmcnOiAnXHU2QjYzXHU1NzI4XHU1NDJGXHU1MkE4XHUyMDI2JyxcbiAgICAnZXhlYy5jcmVhdGVIaW50JzogJ1x1NTIxQlx1NUVGQVx1NTNEOFx1NjZGNFx1NUU3Nlx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1OEJBMVx1NTIxMlx1RkYwQ1x1OTY4Rlx1NTQwRVx1NzUzMSBBSSBcdTVCNTBcdTRFRTNcdTc0MDZcdTkwMTBcdTZCNjVcdTYyNjdcdTg4NENcdUZGMUJcdThGREJcdTVFQTZcdTU3MjhcdTRFMEJcdTY1QjlcdTVCOUVcdTY1RjZcdTUyMzdcdTY1QjBcdUZGMENcdTY1RTBcdTk3MDBcdTUzQkJcdTgwNEFcdTU5MjlcdTMwMDInLFxuICAgICdleGVjLmNvbC5zdGVwcyc6ICdcdTZCNjVcdTlBQTQnLFxuICAgICdub3Rlcy5lZGl0JzogJ1x1N0YxNlx1OEY5MScsXG4gICAgJ25vdGVzLnNhdmUnOiAnXHU0RkREXHU1QjU4JyxcbiAgICAnbm90ZXMuY2FuY2VsJzogJ1x1NTNENlx1NkQ4OCcsXG4gICAgJ21lbW9yeS5icmFuY2hTY29wZSc6ICdcdTUyMDZcdTY1MkYnLFxuICAgICdtZW1vcnkuYnJhbmNoQWxsJzogJ1x1NTE2OFx1OTBFOFx1NTIwNlx1NjUyRicsXG4gICAgJ25vdGVzLnNlYXJjaCc6ICdcdTY0MUNcdTdEMjJcdTdCMTRcdThCQjBcdTIwMjYnLFxuICAgICdtb2RlbC50aXRsZSc6ICdcdTZBMjFcdTU3OEJcdTUyMDZcdTkxNERcdUZGMDhcdTg5RTNcdThCRkIgLyBcdTYwM0JcdTdFRDNcdTdCNDlcdTRFRkJcdTUyQTFcdTc1MjhcdTU0RUFcdTRFMkFcdTZBMjFcdTU3OEJcdUZGMDknLFxuICAgICdtb2RlbC5sb2FkaW5nJzogJ1x1OEJGQlx1NTNENlx1NkEyMVx1NTc4Qlx1NkUwNVx1NTM1NVx1MjAyNicsXG4gICAgJ21vZGVsLmZvbGxvd0NoYXQnOiAnXHU4RERGXHU5NjhGXHU4MDRBXHU1OTI5XHU2QTIxXHU1NzhCJyxcbiAgICAnbW9kZWwuc2F2ZSc6ICdcdTRGRERcdTVCNThcdTVFNzZcdTc1MUZcdTY1NDgnLFxuICAgICdtb2RlbC5zYXZlZCc6ICdcdTVERjJcdTc1MUZcdTY1NDgnLFxuICAgICdtb2RlbC5oaW50JzogJ1x1NEZERFx1NUI1OFx1NTQwRVx1N0FDQlx1NTM3M1x1NzUxRlx1NjU0OFx1NUU3Nlx1NjMwMVx1NEU0NVx1NTMxNlx1RkYwOFx1OTFDRFx1NTQyRlx1NTQwRVx1NEZERFx1NzU1OVx1RkYwOVx1RkYxQlx1NEUwRFx1NUY3MVx1NTRDRFx1ODA0QVx1NTkyOVx1NkEyMVx1NTc4Qlx1MzAwMicsXG4gICAgJ25vdGVzLmFpU3VtbWFyeSc6ICdBSSBcdTYwM0JcdTdFRDNcdTdCMTRcdThCQjAnLFxuICAgICdub3Rlcy5haVN1bW1hcnlSdW4nOiAnXHU2MDNCXHU3RUQzXHU3NTFGXHU2MjEwXHU0RTJEXHUyMDI2XHVGRjA4XHU3RUE2IDEwLTMwIFx1NzlEMlx1RkYwOScsXG4gICAgJ25vdGVzLmV4cGFuZCc6ICdcdTVDNTVcdTVGMDBcdTUxNjhcdTY1ODcnLFxuICAgICdub3Rlcy5jb2xsYXBzZSc6ICdcdTY1MzZcdThENzcnLFxuICAgICdub3Rlcy5zdW1tYXJ5VGFnJzogJ0FJIFx1NjAzQlx1N0VEMycsXG4gICAgJ25vdGVzLmVtcHR5U2VhcmNoJzogJ1x1NjVFMFx1NTMzOVx1OTE0RFx1N0IxNFx1OEJCMFx1MzAwMicsXG4gICAgJ25vdGVzLmNvbnRlbnRIaW50JzogJ1x1N0IxNFx1OEJCMFx1NTE4NVx1NUJCOVx1RkYwOFx1NjUyRlx1NjMwMVx1NTkxQVx1ODg0Q1x1RkYwOVx1RkYxQVx1N0VEM1x1OEJCQVx1MzAwMVx1NzU5MVx1OTVFRVx1MzAwMVx1NUI2Nlx1NEU2MFx1ODk4MVx1NzBCOVx1MzAwMVx1NTE3M1x1OTUyRVx1NTFCM1x1N0I1Nlx1MjAyNicsXG4gICAgJ2ltcGFjdC5mdW5jdGlvbnNOb25lJzogJ1x1NjcyQVx1OEJDNlx1NTIyQlx1NTFGQVx1NTFGRFx1NjU3MFx1N0VBN1x1OEMwM1x1NzUyOFx1NTNEOFx1NTMxNlx1RkYwOFx1NTNFRlx1ODBGRFx1NjYyRlx1NjgzN1x1NUYwRi9cdTk3NTlcdTYwMDFcdThENDRcdTZFOTAvXHU3RUFGXHU5MTREXHU3RjZFXHU2NTM5XHU1MkE4XHVGRjA5XHUzMDAyJyxcbiAgICAncmV2aWV3LmNvbC5zZXZlcml0eSc6ICdcdTdFQTdcdTUyMkInLFxuICAgICdyZXZpZXcuY29sLmNhdGVnb3J5JzogJ1x1N0M3Qlx1NTIyQicsXG4gICAgJ3Jldmlldy5jb2wudGl0bGUnOiAnXHU5NUVFXHU5ODk4JyxcbiAgICAncmV2aWV3LmNvbC5ldmlkZW5jZSc6ICdcdTRGNERcdTdGNkUnLFxuICAgICdyZXZpZXcuY29sLmZpeCc6ICdcdTVFRkFcdThCQUVcdTRGRUVcdTU5MEQnLFxuICAgICdyZXZpZXcuaGludCc6ICdcdTcwQjlcdTUxRkJcdTRFMEFcdTY1QjlcdTYzMDlcdTk0QUVcdTVGMDBcdTU5Q0JcdTY4MzhcdTY3RTVcdUZGMENcdTRFQTdcdTUxRkFcdTY3MDBcdTRGMThcdTYwMjdcdTdFRDNcdThCQkFcdTRFMEVcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTMwMDInLFxuICAgICdkaWZmLnNob3cnOiAnXHU1QkY5XHU2QkQ0JyxcbiAgICAnZGlmZi5oaWRlJzogJ1x1NjUzNlx1OEQ3N1x1NURFRVx1NUYwMicsXG5cbiAgICAnZGV0YWlsLnRpdGxlJzogJ1x1NjgzOFx1NjdFNVx1OEJFNlx1NjBDNScsXG4gICAgJ2RldGFpbC5waWNrJzogJ1x1MjE5MCBcdTRFQ0VcdTVERTZcdTRGQTdcdTkwMDlcdTYyRTlcdTRFMDBcdTZCMjFcdTYzRDBcdTRFQTRcdUZGMDhcdTYyMTZcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQThcdUZGMDlcdTVGMDBcdTU5Q0JcdTY4MzhcdTY3RTUnLFxuICAgICdkZXRhaWwud2hhdCc6ICdcdTY1MzlcdTRFODZcdTRFQzBcdTRFNDgnLFxuICAgICdkZXRhaWwubG9naWMnOiAnXHU1QjlFXHU3M0IwXHU5MDNCXHU4RjkxJyxcbiAgICAnZGV0YWlsLnJpc2snOiAnXHU5OENFXHU5NjY5XHU3MEI5JyxcbiAgICAnZGV0YWlsLmZpbGVzJzogJ1x1NjU4N1x1NEVGNlx1NkUwNVx1NTM1NScsXG4gICAgJ2RldGFpbC5wYXRjaCc6ICdcdTY3RTVcdTc3MEJcdTg4NjVcdTRFMDFcdTUzOUZcdTY1ODcnLFxuICAgICdkZXRhaWwuYWlMb2FkaW5nJzogJ0FJIFx1ODlFM1x1OEJGQlx1NzUxRlx1NjIxMFx1NEUyRFx1MjAyNlx1RkYwOFx1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxuICAgICdkZXRhaWwuaW1wYWN0JzogJ1x1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNFx1NTIwNlx1Njc5MCcsXG4gICAgJ2RldGFpbC5pbXBhY3RMb2FkaW5nJzogJ1x1NUY3MVx1NTRDRFx1NjI2Qlx1NjNDRlx1NEUyRFx1MjAyNlx1RkYwOFx1NUYxNVx1NzUyOFx1NjhDMFx1N0QyMiArIFx1NTZGRVx1OEMzMVx1NEYyMFx1NjRBRFx1RkYwOScsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5JzogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNScsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZyc6ICdcdThCQzRcdTVCQTFcdTRFMkRcdTIwMjZcdUZGMDhcdTRGMUFcdTRFQTdcdTUxRkFcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTRFMEVcdTY3MDBcdTRGMThcdTYwMjdcdTdFRDNcdThCQkFcdUZGMDknLFxuXG4gICAgJ2ltcGFjdC5yaXNrJzogJ1x1OThDRVx1OTY2OScsXG4gICAgJ2ltcGFjdC5jb2wuY2hhbmdlZCc6ICdcdTUzRDhcdTY2RjRcdTY1ODdcdTRFRjYnLFxuICAgICdpbXBhY3QuY29sLmluZGlyZWN0JzogJ1x1OTVGNFx1NjNBNVx1NUY3MVx1NTRDRFx1RkYwOFx1NUYxNVx1NzUyOFx1OTRGRVx1RkYwOScsXG4gICAgJ2ltcGFjdC5jb2wucG90ZW50aWFsJzogJ1x1NkY1Q1x1NTcyOFx1NUY3MVx1NTRDRCcsXG4gICAgJ2ltcGFjdC5ub25lJzogJ1x1NjcyQVx1NTNEMVx1NzNCMFx1NEVEM1x1NUU5M1x1NTE4NVx1NUYxNVx1NzUyOFx1ODAwNVx1RkYwOFx1NjUzOVx1NTJBOFx1NzcwQlx1NEYzQ1x1NzJFQ1x1N0FDQlx1RkYwOVx1MzAwMicsXG4gICAgJ2ltcGFjdC50ZXN0cyc6ICdcdTUxNzNcdTgwNTRcdTZENEJcdThCRDUnLFxuICAgICdpbXBhY3QubGVnZW5kLmNoYW5nZWQnOiAnXHU1M0Q4XHU2NkY0JyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5pbmRpcmVjdCc6ICdcdTk1RjRcdTYzQTUnLFxuICAgICdpbXBhY3QubGVnZW5kLnBvdGVudGlhbCc6ICdcdTZGNUNcdTU3MjgnLFxuXG4gICAgJ3Jldmlldy52ZXJkaWN0JzogJ1x1NjcwMFx1NEYxOFx1NjAyN1x1N0VEM1x1OEJCQScsXG4gICAgJ3Jldmlldy5pc3N1ZXMnOiAnXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1JyxcbiAgICAncmV2aWV3LmNsZWFuJzogJ1x1NjcyQVx1NTNEMVx1NzNCMFx1OTVFRVx1OTg5OFx1MzAwMicsXG5cbiAgICAnbm90ZXMudGl0bGUnOiAnXHU2ODM4XHU2N0U1XHU3QjE0XHU4QkIwJyxcbiAgICAnbm90ZXMuZm9ybVRpdGxlJzogJ1x1N0IxNFx1OEJCMFx1NjgwN1x1OTg5OCcsXG4gICAgJ25vdGVzLmZvcm1Db250ZW50JzogJ1x1N0IxNFx1OEJCMFx1NTE4NVx1NUJCOVx1RkYwOFx1N0VEM1x1OEJCQVx1MzAwMVx1NzU5MVx1OTVFRVx1MzAwMVx1NUI2Nlx1NEU2MFx1ODk4MVx1NzBCOVx1MjAyNlx1RkYwOScsXG4gICAgJ25vdGVzLmFkZCc6ICdcdTZERkJcdTUyQTBcdTdCMTRcdThCQjAnLFxuICAgICdub3Rlcy5ib3VuZFRvJzogJ1x1NUMwNlx1NTE3M1x1ODA1NFx1NTIzMCcsXG4gICAgJ25vdGVzLmNvbC50aW1lJzogJ1x1NjVGNlx1OTVGNCcsXG4gICAgJ25vdGVzLmNvbC50aXRsZSc6ICdcdTY4MDdcdTk4OTgnLFxuICAgICdub3Rlcy5jb2wuY29udGVudCc6ICdcdTUxODVcdTVCQjknLFxuICAgICdub3Rlcy5jb2wuc2hhJzogJ1x1NTE3M1x1ODA1NFx1NjNEMFx1NEVBNCcsXG4gICAgJ25vdGVzLnJlbW92ZSc6ICdcdTUyMjBcdTk2NjQnLFxuICAgICdub3Rlcy5lbXB0eSc6ICdcdThGRDhcdTZDQTFcdTY3MDlcdTdCMTRcdThCQjBcdTMwMDJcdTY4MzhcdTY3RTVcdTYzRDBcdTRFQTRcdTY1RjZcdTk2OEZcdTYyNEJcdThCQjBcdTRFMEJcdTdFRDNcdThCQkFcdTRFMEVcdTc1OTFcdTk1RUVcdUZGMENcdTVDMzFcdTY2MkZcdTRGNjBcdTc2ODRcdTk4NzlcdTc2RUVcdTVCNjZcdTRFNjBcdTY4NjNcdTY4NDhcdTMwMDInLFxuXG4gICAgJ21lbW9yeS5yZWNvcmQnOiAnXHU4QkIwXHU1RjU1XHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2JyxcbiAgICAnZm9ybS5tZW1vcnlUaXRsZSc6ICdcdThCQjBcdTVGQzZcdTY4MDdcdTk4OTgnLFxuICAgICdmb3JtLm1lbW9yeUNvbnRlbnQnOiAnXHU4QkIwXHU1RkM2XHU1MTg1XHU1QkI5XHVGRjA4XHU0RUMwXHU0RTQ4XHU0RTBFXHU0RTNBXHU0RUMwXHU0RTQ4XHVGRjA5JyxcbiAgICAnbWVtb3J5LmNvbC50aXRsZSc6ICdcdTY3NjFcdTc2RUUnLFxuICAgICdtZW1vcnkuY29sLnR5cGUnOiAnXHU3QzdCXHU1NzhCJyxcbiAgICAnbWVtb3J5LmNvbC50cnV0aCc6ICdcdTc3MUZcdTUwM0MnLFxuICAgICdtZW1vcnkuY29sLmJyYW5jaCc6ICdcdTUyMDZcdTY1MkYnLFxuICAgICdtZW1vcnkuY29uZmlybSc6ICdcdTc4NkVcdThCQTQnLFxuICAgICdtZW1vcnkuZW1wdHknOiAnXHU2NjgyXHU2NUUwXHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHUzMDAyXHU1M0VGXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1OEJCMFx1NUY1NVx1RkYwQ1x1NjIxNlx1NTcyOFx1NEUwQVx1NjVCOVx1NjI0Qlx1NTJBOFx1NkRGQlx1NTJBMFx1MzAwMicsXG4gICAgJ2NvbmNlcHRzLnRpdGxlJzogJ1x1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNScsXG4gICAgJ2NvbmNlcHRzLm5vbmUnOiAnXHU2NjgyXHU2NUUwXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1XHUzMDAyXHU1QkY5XHU1M0Q4XHU2NkY0XHU4QzAzXHU3NTI4IHN1bW1hcml6ZV9sZWFybmluZyBcdTU0MEVcdTgxRUFcdTUyQThcdTc5RUZcdTdEMkZcdTMwMDInLFxuICAgICdjb25jZXB0cy5jb2wubmFtZSc6ICdcdTY5ODJcdTVGRjUnLFxuICAgICdjb25jZXB0cy5jb2wuY2F0ZWdvcnknOiAnXHU3QzdCXHU1MjJCJyxcbiAgICAnY29uY2VwdHMuY29sLmNvdW50JzogJ1x1NkIyMVx1NjU3MCcsXG4gICAgJ3Jldmlldy5yZWNvcmRzVGl0bGUnOiAnUmV2aWV3IFx1OTVFRVx1OTg5OCcsXG4gICAgJ3ZlcmlmeS5yZWNvcmRzJzogJ1x1OUE4Q1x1NjUzNlx1OEJCMFx1NUY1NScsXG5cbiAgICAnY29uZmlybWVkLnRpdGxlJzogJ1x1NURGMlx1Nzg2RVx1NUI5QVx1N0VBNlx1Njc1Rlx1RkYwOFx1NEVCQVx1NURFNVx1Nzg2RVx1OEJBNFx1RkYwQ0FJIFx1Nzk4MVx1NjUzOVx1ODFFQVx1NTJBOFx1NjJFNlx1NjIyQVx1RkYwOScsXG4gICAgJ2NvbmZpcm1lZC5hZGQnOiAnXHU2REZCXHU1MkEwXHU3RUE2XHU2NzVGJyxcbiAgICAnY29uZmlybWVkLnRleHQnOiAnXHU3RUE2XHU2NzVGL1x1OTcwMFx1NkM0Mlx1NTE4NVx1NUJCOScsXG4gICAgJ2NvbmZpcm1lZC5wYXRocyc6ICdcdTc5ODFcdTY1MzlcdThERUZcdTVGODRcdUZGMDhcdTkwMTdcdTUzRjdcdTUyMDZcdTk2OTRcdUZGMENcdTkwMDlcdTU4NkJcdUZGMDknLFxuICAgICdjb25maXJtZWQubm9uZSc6ICdcdTY2ODJcdTY1RTBcdTdFQTZcdTY3NUZcdTMwMDJcdTZERkJcdTUyQTBcdTU0MEUgQUkgXHU0RkVFXHU2NTM5XHU3OTgxXHU2NTM5XHU4REVGXHU1Rjg0XHU1QzA2XHU4OEFCXHU4MUVBXHU1MkE4XHU2MkQyXHU3RUREXHUzMDAyJyxcblxuICAgICdjaGFuZ2VzLnRpdGxlJzogJ1x1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMScsXG4gICAgJ3N0YXRlLm5vQ2hhbmdlcyc6ICdcdTY2ODJcdTY1RTBcdTUzRDhcdTY2RjRcdTRFRkJcdTUyQTFcdTMwMDJcdTU3MjhcdTgwNEFcdTU5MjlcdTRFMkRcdThCQTkgQUkgXHU1MjFCXHU1RUZBXHVGRjBDXHU2MjE2XHU3NTI4XHU0RTBBXHU2NUI5XHUzMDBDXHU2NUIwXHU1RUZBXHU1M0Q4XHU2NkY0XHUzMDBEXHUzMDAyJyxcbiAgICAnY2hhbmdlcy5jb2wudGl0bGUnOiAnXHU2ODA3XHU5ODk4JyxcbiAgICAnY2hhbmdlcy5jb2wudHlwZSc6ICdcdTdDN0JcdTU3OEInLFxuICAgICdjaGFuZ2VzLmNvbC5zdGF0dXMnOiAnXHU3MkI2XHU2MDAxJyxcbiAgICAnY2hhbmdlcy5jb2wudXBkYXRlZCc6ICdcdTY2RjRcdTY1QjBcdTY1RjZcdTk1RjQnLFxuICAgICdleGVjLmNvbC5zdGF0dXMnOiAnXHU3MkI2XHU2MDAxJyxcbiAgICAnZXhlYy5jb2wuY2hhbmdlJzogJ1x1NTNEOFx1NjZGNCcsXG4gICAgJ2V4ZWMuY29sLnN0YXJ0ZWQnOiAnXHU1RjAwXHU1OUNCJyxcbiAgICAnZXhlYy5jb2wuY29zdCc6ICdcdTYyMTBcdTY3MkMoXHU0RjMwKScsXG4gICAgJ2V4ZWMuYXR0ZW1wdHMnOiAnXHU1QzFEXHU4QkQ1XHU2QjIxXHU2NTcwJyxcbiAgICAnZXhlYy5oaW50JzogJ1x1NjI2N1x1ODg0Q1x1RkYwOHN0YXJ0X3J1blx1RkYwOVx1OEJGN1x1NTcyOFx1NTNGM1x1NEZBN1x1ODA0QVx1NTkyOVx1NEUyRFx1NTNEMVx1OEQ3N1x1RkYxQVx1NTIxQlx1NUVGQVx1OEJBMVx1NTIxMlx1NTQwRVx1NUJGOSBBSSBcdThCRjRcdTMwMENcdTVGMDBcdTU5Q0JcdTYyNjdcdTg4NENcdThCRTUgY2hhbmdlXHUzMDBEXHUzMDAyXHU2NzJDXHU5ODc1XHU2N0U1XHU3NzBCXHU4RkRCXHU1RUE2XHU0RTBFXHU3RUQzXHU2NzlDXHUzMDAyJyxcbiAgICAnc3RhdGUubm9SdW5zJzogJ1x1NjY4Mlx1NjVFMFx1NjI2N1x1ODg0Q1x1OEJCMFx1NUY1NVx1MzAwMicsXG4gICAgJ3N0YXRlLnRlY2hTdGFjayc6ICdcdTYyODBcdTY3MkZcdTY4MDgnLFxuICAgICdzdGF0ZS5zeW1ib2xzJzogJ1x1NURGMlx1N0QyMlx1NUYxNVx1N0IyNlx1NTNGNycsXG4gICAgJ3N0YXRlLm1hbmlmZXN0cyc6ICdcdTZFMDVcdTUzNTVcdTY1ODdcdTRFRjYnLFxuICAgICdzdGF0ZS5ldmlkZW5jZSc6ICdcdThCQzFcdTYzNkVcdTY3NjFcdTc2RUUnLFxuICB9LFxuICBlbjoge1xuICAgICd3b3Jrc3BhY2UudGl0bGUnOiAnUmV2aWV3IERlc2snLFxuICAgICd0YWIuY29tbWl0cyc6ICdDb21taXQgUmV2aWV3JyxcbiAgICAndGFiLm92ZXJ2aWV3JzogJ092ZXJ2aWV3JyxcbiAgICAndGFiLmV4ZWN1dGlvbic6ICdFeGVjdXRpb24nLFxuICAgICd0YWIubm90ZXMnOiAnTm90ZXMgJiBNZW1vcnknLFxuICAgICd0YWIuc2V0dGluZ3MnOiAnU2V0dGluZ3MnLFxuICAgICdlcnJvci5sb2FkJzogJ0ZhaWxlZCB0byBsb2FkJyxcbiAgICAnc3RhdGUucHJvamVjdCc6ICdDdXJyZW50IHByb2plY3QnLFxuICAgICdzdGF0ZS5ub1Byb2plY3QnOiAnTm8gcHJvamVjdCBpbml0aWFsaXplZCcsXG4gICAgJ3N0YXRlLm5vUHJvamVjdEhpbnQnOiAnUnVuIFwiSW5pdGlhbGl6ZSBwcm9qZWN0XCIgdG8gc2NhbiB0aGUgcmVwb3NpdG9yeSBzdHJ1Y3R1cmUsIHRlY2ggc3RhY2ssIGFuZCBzeW1ib2wgaW5kZXguJyxcbiAgICAnYWN0aW9uLmJvb3RzdHJhcCc6ICdJbml0aWFsaXplIHByb2plY3QnLFxuICAgICdhY3Rpb24ucmVzY2FuJzogJ1JlLWluaXRpYWxpemUgLyBzY2FuJyxcbiAgICAnYWN0aW9uLmFuYWx5emUnOiAnQW5hbHl6ZSB3b3JraW5nIGRpZmYnLFxuICAgICdhY3Rpb24ucmV2aWV3JzogJ1JldmlldyB3b3JraW5nIGRpZmYnLFxuICAgICdhY3Rpb24udmVyaWZ5JzogJ1ZlcmlmeSB3b3JraW5nIGRpZmYnLFxuICAgICdhY3Rpb24uY3JlYXRlQ2hhbmdlJzogJ0NyZWF0ZSBjaGFuZ2UnLFxuICAgICdhY3Rpb24ucnVubmluZyc6ICdSdW5uaW5nXHUyMDI2JyxcbiAgICAnYWN0aW9uLnJlZnJlc2gnOiAnUmVmcmVzaCcsXG4gICAgJ2Zvcm0uY2hhbmdlVGl0bGUnOiAnQ2hhbmdlIHRpdGxlJyxcbiAgICAnZm9ybS5jaGFuZ2VEZXNjJzogJ1JlcXVpcmVtZW50IGFuZCBiYWNrZ3JvdW5kIChvcHRpb25hbCknLFxuICAgICdyZXN1bHQucGFuZWwnOiAnQWN0aW9uIHJlc3VsdCcsXG5cbiAgICAncmVwby5hZGQnOiAnQWRkIHJlcG8nLFxuICAgICdyZXBvLmFkZEhpbnQnOiAnRW50ZXIgYW4gYWJzb2x1dGUgcmVwbyBwYXRoIGFuZCBwcmVzcyBFbnRlcjsgcHJldmlvdXNseSB1c2VkIHJlcG9zIGFyZSByZW1lbWJlcmVkJyxcbiAgICAncmVwby5zY2FuSGlzdG9yeSc6ICdSZWJ1aWxkIGhpc3RvcnknLFxuICAgICdyZXBvLmNvbW1pdHMnOiAnY29tbWl0cycsXG4gICAgJ3JlcG8uYnJhbmNoJzogJ2JyYW5jaCcsXG4gICAgJ3JlcG8ud29ya2luZyc6ICdVbmNvbW1pdHRlZCBjaGFuZ2VzJyxcbiAgICAncmVwby53b3JraW5nQ2xlYW4nOiAnV29ya2luZyB0cmVlIGlzIGNsZWFuJyxcbiAgICAncmVwby5lbXB0eSc6ICdObyBjb21taXRzLicsXG4gICAgJ3JlcG8ubG9hZEZhaWxlZCc6ICdGYWlsZWQgdG8gbG9hZCBjb21taXRzJyxcbiAgICAncGlja2VyLnRpdGxlJzogJ1BpY2sgY29tbWl0cyB0byByZXZpZXcgKG11bHRpLXNlbGVjdCknLFxuICAgICdwaWNrZXIucGxhY2Vob2xkZXInOiAnQ2xpY2sgdG8gcGljayBjb21taXRzIChtdWx0aS1zZWxlY3QsIGluY2x1ZGVzIHVuY29tbWl0dGVkKScsXG4gICAgJ3BpY2tlci5zZWxlY3RlZCc6ICdTZWxlY3RlZCcsXG4gICAgJ3BpY2tlci5maWx0ZXInOiAnRmlsdGVyIGJ5IHRpdGxlL2hhc2gvYXV0aG9yXHUyMDI2JyxcbiAgICAncGlja2VyLmNsZWFyJzogJ0NsZWFyJyxcbiAgICAncGlja2VyLm5vTWF0Y2gnOiAnTm8gbWF0Y2hpbmcgY29tbWl0LicsXG4gICAgJ3BpY2tlci5oaW50JzogJ0NoZWNraW5nIGEgY29tbWl0IGdlbmVyYXRlcyBpdHMgQUkgZXhwbGFuYXRpb247IHJ1biBpbXBhY3QgYW5kIG9wdGltYWxpdHkgYmVsb3cuJyxcbiAgICAnaW1wYWN0LmZhY3RvcnMnOiAnUmlzayBmYWN0b3JzICh3aHkgdGhpcyBsZXZlbCknLFxuICAgICdpbXBhY3QucG9pbnRzJzogJ0ltcGFjdGVkIHBvaW50cycsXG4gICAgJ2ltcGFjdC5rZXlQb2ludHMnOiAnS2V5IGNvbXBvbmVudHMnLFxuICAgICdpbXBhY3QubWVtb3J5JzogJ0Nyb3NzLWNoZWNrIHdpdGggcHJvamVjdCBtZW1vcnknLFxuICAgICdpbXBhY3QuZnVuY3Rpb25zJzogJ0ltcGFjdGVkIGZ1bmN0aW9ucyAod2hvIGNhbGxzIHRoZSBjaGFuZ2VkIGNvZGUpJyxcbiAgICAnaW1wYWN0LmZ1bmNSb2xlJzogJ0Z1bmN0aW9uIHJvbGUnLFxuICAgICdpbXBhY3QuZnVuY0NoYW5nZSc6ICdDaGFuZ2VkIGJ5IHRoaXMgY29tbWl0JyxcbiAgICAnaW1wYWN0LmZ1bmNDYWxsZXJzJzogJ0ltcGFjdCBvbiBjYWxsZXJzJyxcbiAgICAnY2FjaGUuaGl0JzogJ2Zyb20gY2FjaGUnLFxuICAgICdjYWNoZS5yZWdlbmVyYXRlJzogJ1JlZ2VuZXJhdGUnLFxuICAgICdleGVjLmNyZWF0ZSc6ICdOZXcgcnVuJyxcbiAgICAnZXhlYy5mb3JtVGl0bGUnOiAnV2hhdCB0byBkbyAob25lIGxpbmUpJyxcbiAgICAnZXhlYy5mb3JtRGVzYyc6ICdSZXF1aXJlbWVudDogZ29hbCwgbW9kdWxlcywgYWNjZXB0YW5jZScsXG4gICAgJ2V4ZWMuc3RhcnQnOiAnU3RhcnQgcnVuJyxcbiAgICAnZXhlYy5zdGFydGluZyc6ICdTdGFydGluZ1x1MjAyNicsXG4gICAgJ2V4ZWMuY3JlYXRlSGludCc6ICdDcmVhdGVzIGEgY2hhbmdlLCBnZW5lcmF0ZXMgYSBwbGFuLCB0aGVuIEFJIHN1YmFnZW50cyBleGVjdXRlIHN0ZXAgYnkgc3RlcDsgcHJvZ3Jlc3MgcmVmcmVzaGVzIGJlbG93LicsXG4gICAgJ2V4ZWMuY29sLnN0ZXBzJzogJ1N0ZXBzJyxcbiAgICAnbm90ZXMuZWRpdCc6ICdFZGl0JyxcbiAgICAnbm90ZXMuc2F2ZSc6ICdTYXZlJyxcbiAgICAnbm90ZXMuY2FuY2VsJzogJ0NhbmNlbCcsXG4gICAgJ21lbW9yeS5icmFuY2hTY29wZSc6ICdCcmFuY2gnLFxuICAgICdtZW1vcnkuYnJhbmNoQWxsJzogJ0FsbCBicmFuY2hlcycsXG4gICAgJ25vdGVzLnNlYXJjaCc6ICdTZWFyY2ggbm90ZXNcdTIwMjYnLFxuICAgICdtb2RlbC50aXRsZSc6ICdNb2RlbCBhc3NpZ25tZW50ICh3aGljaCBtb2RlbCBwZXIgdGFzayknLFxuICAgICdtb2RlbC5sb2FkaW5nJzogJ0xvYWRpbmcgbW9kZWxzXHUyMDI2JyxcbiAgICAnbW9kZWwuZm9sbG93Q2hhdCc6ICdGb2xsb3cgY2hhdCBtb2RlbCcsXG4gICAgJ21vZGVsLnNhdmUnOiAnU2F2ZSAmIGFwcGx5JyxcbiAgICAnbW9kZWwuc2F2ZWQnOiAnQXBwbGllZCcsXG4gICAgJ21vZGVsLmhpbnQnOiAnQXBwbGllcyBpbW1lZGlhdGVseSBhbmQgcGVyc2lzdHMgYWNyb3NzIHJlc3RhcnRzOyBjaGF0IG1vZGVsIHVuYWZmZWN0ZWQuJyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5JzogJ0FJIHN1bW1hcnknLFxuICAgICdub3Rlcy5haVN1bW1hcnlSdW4nOiAnU3VtbWFyaXppbmdcdTIwMjYgKDEwLTMwcyknLFxuICAgICdub3Rlcy5leHBhbmQnOiAnRXhwYW5kJyxcbiAgICAnbm90ZXMuY29sbGFwc2UnOiAnQ29sbGFwc2UnLFxuICAgICdub3Rlcy5zdW1tYXJ5VGFnJzogJ0FJIHN1bW1hcnknLFxuICAgICdub3Rlcy5lbXB0eVNlYXJjaCc6ICdObyBtYXRjaGluZyBub3Rlcy4nLFxuICAgICdub3Rlcy5jb250ZW50SGludCc6ICdOb3RlIGNvbnRlbnQgKG11bHRpLWxpbmUpOiBjb25jbHVzaW9ucywgcXVlc3Rpb25zLCBsZWFybmluZ3NcdTIwMjYnLFxuICAgICdmcy5icm93c2UnOiAnQnJvd3NlJyxcbiAgICAnZnMudXAnOiAnVXAnLFxuICAgICdmcy51c2UnOiAnVXNlIHRoaXMgZGlyZWN0b3J5JyxcbiAgICAnZnMucmVnaXN0ZXInOiAnQWxzbyByZWdpc3RlciBhcyBzZXNzaW9uIHdvcmtzcGFjZScsXG4gICAgJ2ZzLmxvYWRpbmcnOiAnUmVhZGluZ1x1MjAyNicsXG4gICAgJ2ZzLmVtcHR5JzogJ05vIHN1YmRpcmVjdG9yaWVzLicsXG4gICAgJ2ltcGFjdC5mdW5jdGlvbnNOb25lJzogJ05vIGZ1bmN0aW9uLWxldmVsIGNhbGwgaW1wYWN0IGRldGVjdGVkIChzdHlsZS9hc3NldC9jb25maWctb25seSBjaGFuZ2UpLicsXG4gICAgJ3Jldmlldy5jb2wuc2V2ZXJpdHknOiAnU2V2ZXJpdHknLFxuICAgICdyZXZpZXcuY29sLmNhdGVnb3J5JzogJ0NhdGVnb3J5JyxcbiAgICAncmV2aWV3LmNvbC50aXRsZSc6ICdJc3N1ZScsXG4gICAgJ3Jldmlldy5jb2wuZXZpZGVuY2UnOiAnTG9jYXRpb24nLFxuICAgICdyZXZpZXcuY29sLmZpeCc6ICdTdWdnZXN0ZWQgZml4JyxcbiAgICAncmV2aWV3LmhpbnQnOiAnQ2xpY2sgdGhlIGJ1dHRvbiBhYm92ZSB0byBwcm9kdWNlIHRoZSBvcHRpbWFsaXR5IHZlcmRpY3QgYW5kIGlzc3VlIGxpc3QuJyxcbiAgICAnZGlmZi5zaG93JzogJ0RpZmYnLFxuICAgICdkaWZmLmhpZGUnOiAnSGlkZSBkaWZmJyxcblxuICAgICdkZXRhaWwudGl0bGUnOiAnUmV2aWV3IGRldGFpbCcsXG4gICAgJ2RldGFpbC5waWNrJzogJ1x1MjE5MCBQaWNrIGEgY29tbWl0IChvciB0aGUgdW5jb21taXR0ZWQgY2hhbmdlcykgb24gdGhlIGxlZnQgdG8gc3RhcnQgcmV2aWV3aW5nJyxcbiAgICAnZGV0YWlsLndoYXQnOiAnV2hhdCBpdCBkb2VzJyxcbiAgICAnZGV0YWlsLmxvZ2ljJzogJ0ltcGxlbWVudGF0aW9uIGxvZ2ljJyxcbiAgICAnZGV0YWlsLnJpc2snOiAnUmlza3MnLFxuICAgICdkZXRhaWwuZmlsZXMnOiAnRmlsZXMnLFxuICAgICdkZXRhaWwucGF0Y2gnOiAnU2hvdyByYXcgcGF0Y2gnLFxuICAgICdkZXRhaWwuYWlMb2FkaW5nJzogJ0dlbmVyYXRpbmcgQUkgZXhwbGFuYXRpb25cdTIwMjYgKDEwLTMwcyknLFxuICAgICdkZXRhaWwuaW1wYWN0JzogJ0ltcGFjdCBzY29wZScsXG4gICAgJ2RldGFpbC5pbXBhY3RMb2FkaW5nJzogJ1NjYW5uaW5nIGltcGFjdFx1MjAyNiAocmVmZXJlbmNlIHNlYXJjaCArIGdyYXBoIHdhbGspJyxcbiAgICAnZGV0YWlsLm9wdGltYWxpdHknOiAnT3B0aW1hbGl0eSByZXZpZXcnLFxuICAgICdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnOiAnUmV2aWV3aW5nXHUyMDI2IChwcm9kdWNlcyBpc3N1ZSBsaXN0IGFuZCBvcHRpbWFsaXR5IHZlcmRpY3QpJyxcblxuICAgICdpbXBhY3Qucmlzayc6ICdSaXNrJyxcbiAgICAnaW1wYWN0LmNvbC5jaGFuZ2VkJzogJ0NoYW5nZWQgZmlsZXMnLFxuICAgICdpbXBhY3QuY29sLmluZGlyZWN0JzogJ0luZGlyZWN0IChyZWZlcmVuY2UgY2hhaW4pJyxcbiAgICAnaW1wYWN0LmNvbC5wb3RlbnRpYWwnOiAnUG90ZW50aWFsJyxcbiAgICAnaW1wYWN0Lm5vbmUnOiAnTm8gaW4tcmVwbyByZWZlcmVuY2VycyBmb3VuZCAodGhlIGNoYW5nZSBsb29rcyBzZWxmLWNvbnRhaW5lZCkuJyxcbiAgICAnaW1wYWN0LnRlc3RzJzogJ1JlbGF0ZWQgdGVzdHMnLFxuICAgICdpbXBhY3QubGVnZW5kLmNoYW5nZWQnOiAnY2hhbmdlZCcsXG4gICAgJ2ltcGFjdC5sZWdlbmQuaW5kaXJlY3QnOiAnaW5kaXJlY3QnLFxuICAgICdpbXBhY3QubGVnZW5kLnBvdGVudGlhbCc6ICdwb3RlbnRpYWwnLFxuXG4gICAgJ3Jldmlldy52ZXJkaWN0JzogJ09wdGltYWxpdHkgdmVyZGljdCcsXG4gICAgJ3Jldmlldy5pc3N1ZXMnOiAnSXNzdWVzJyxcbiAgICAncmV2aWV3LmNsZWFuJzogJ05vIGlzc3VlcyBmb3VuZC4nLFxuXG4gICAgJ25vdGVzLnRpdGxlJzogJ1JldmlldyBub3RlcycsXG4gICAgJ25vdGVzLmZvcm1UaXRsZSc6ICdOb3RlIHRpdGxlJyxcbiAgICAnbm90ZXMuZm9ybUNvbnRlbnQnOiAnTm90ZSBjb250ZW50IChjb25jbHVzaW9ucywgcXVlc3Rpb25zLCBsZWFybmluZ3NcdTIwMjYpJyxcbiAgICAnbm90ZXMuYWRkJzogJ0FkZCBub3RlJyxcbiAgICAnbm90ZXMuYm91bmRUbyc6ICdXaWxsIGJlIGxpbmtlZCB0bycsXG4gICAgJ25vdGVzLmNvbC50aW1lJzogJ1RpbWUnLFxuICAgICdub3Rlcy5jb2wudGl0bGUnOiAnVGl0bGUnLFxuICAgICdub3Rlcy5jb2wuY29udGVudCc6ICdDb250ZW50JyxcbiAgICAnbm90ZXMuY29sLnNoYSc6ICdDb21taXQnLFxuICAgICdub3Rlcy5yZW1vdmUnOiAnRGVsZXRlJyxcbiAgICAnbm90ZXMuZW1wdHknOiAnTm8gbm90ZXMgeWV0LiBOb3RlIGRvd24gY29uY2x1c2lvbnMgYW5kIHF1ZXN0aW9ucyB3aGlsZSByZXZpZXdpbmcgY29tbWl0cyBcdTIwMTQgdGhhdCBpcyB5b3VyIHByb2plY3QgbGVhcm5pbmcgYXJjaGl2ZS4nLFxuXG4gICAgJ21lbW9yeS5yZWNvcmQnOiAnUmVjb3JkIHByb2plY3QgbWVtb3J5JyxcbiAgICAnZm9ybS5tZW1vcnlUaXRsZSc6ICdNZW1vcnkgdGl0bGUnLFxuICAgICdmb3JtLm1lbW9yeUNvbnRlbnQnOiAnTWVtb3J5IGNvbnRlbnQgKHdoYXQgYW5kIHdoeSknLFxuICAgICdtZW1vcnkuY29sLnRpdGxlJzogJ0l0ZW0nLFxuICAgICdtZW1vcnkuY29sLnR5cGUnOiAnVHlwZScsXG4gICAgJ21lbW9yeS5jb2wudHJ1dGgnOiAnVHJ1dGgnLFxuICAgICdtZW1vcnkuY29sLmJyYW5jaCc6ICdCcmFuY2gnLFxuICAgICdtZW1vcnkuY29uZmlybSc6ICdDb25maXJtJyxcbiAgICAnbWVtb3J5LmVtcHR5JzogJ05vIHByb2plY3QgbWVtb3JpZXMgeWV0LiBBc2sgdGhlIEFJIGluIGNoYXQgdG8gcmVjb3JkIG9uZSwgb3IgYWRkIGFib3ZlLicsXG4gICAgJ2NvbmNlcHRzLnRpdGxlJzogJ0xlYXJuaW5nIGNvbmNlcHRzJyxcbiAgICAnY29uY2VwdHMubm9uZSc6ICdObyBsZWFybmluZyBjb25jZXB0cyB5ZXQuIFJ1biBzdW1tYXJpemVfbGVhcm5pbmcgb24gYSBjaGFuZ2UgdG8gYWNjdW11bGF0ZS4nLFxuICAgICdjb25jZXB0cy5jb2wubmFtZSc6ICdDb25jZXB0JyxcbiAgICAnY29uY2VwdHMuY29sLmNhdGVnb3J5JzogJ0NhdGVnb3J5JyxcbiAgICAnY29uY2VwdHMuY29sLmNvdW50JzogJ0NvdW50JyxcbiAgICAncmV2aWV3LnJlY29yZHNUaXRsZSc6ICdSZXZpZXcgaXNzdWVzJyxcbiAgICAndmVyaWZ5LnJlY29yZHMnOiAnVmVyaWZpY2F0aW9uIHJlY29yZHMnLFxuXG4gICAgJ2NvbmZpcm1lZC50aXRsZSc6ICdDb25maXJtZWQgY29uc3RyYWludHMgKGh1bWFuLWNvbmZpcm1lZDsgQUkgZWRpdHMgdG8gZm9yYmlkZGVuIHBhdGhzIGFyZSBhdXRvLWRlbmllZCknLFxuICAgICdjb25maXJtZWQuYWRkJzogJ0FkZCBjb25zdHJhaW50JyxcbiAgICAnY29uZmlybWVkLnRleHQnOiAnUmVxdWlyZW1lbnQgLyBjb25zdHJhaW50IHRleHQnLFxuICAgICdjb25maXJtZWQucGF0aHMnOiAnRm9yYmlkZGVuIHBhdGhzIChjb21tYSBzZXBhcmF0ZWQsIG9wdGlvbmFsKScsXG4gICAgJ2NvbmZpcm1lZC5ub25lJzogJ05vIGNvbnN0cmFpbnRzIHlldC4gQUkgZWRpdHMgdG8gZm9yYmlkZGVuIHBhdGhzIHdpbGwgYmUgYXV0by1kZW5pZWQgb25jZSBhZGRlZC4nLFxuXG4gICAgJ2NoYW5nZXMudGl0bGUnOiAnQ2hhbmdlIHRhc2tzJyxcbiAgICAnc3RhdGUubm9DaGFuZ2VzJzogJ05vIGNoYW5nZSB0YXNrcyB5ZXQuIEFzayB0aGUgQUkgaW4gY2hhdCB0byBjcmVhdGUgb25lLCBvciB1c2UgXCJDcmVhdGUgY2hhbmdlXCIgYWJvdmUuJyxcbiAgICAnY2hhbmdlcy5jb2wudGl0bGUnOiAnVGl0bGUnLFxuICAgICdjaGFuZ2VzLmNvbC50eXBlJzogJ1R5cGUnLFxuICAgICdjaGFuZ2VzLmNvbC5zdGF0dXMnOiAnU3RhdHVzJyxcbiAgICAnY2hhbmdlcy5jb2wudXBkYXRlZCc6ICdVcGRhdGVkJyxcbiAgICAnZXhlYy5jb2wuc3RhdHVzJzogJ1N0YXR1cycsXG4gICAgJ2V4ZWMuY29sLmNoYW5nZSc6ICdDaGFuZ2UnLFxuICAgICdleGVjLmNvbC5zdGFydGVkJzogJ1N0YXJ0ZWQnLFxuICAgICdleGVjLmNvbC5jb3N0JzogJ0Nvc3QgKGVzdCknLFxuICAgICdleGVjLmF0dGVtcHRzJzogJ0F0dGVtcHRzJyxcbiAgICAnZXhlYy5oaW50JzogJ1J1bnMgKHN0YXJ0X3J1bikgYXJlIHN0YXJ0ZWQgZnJvbSBjaGF0OiBhZnRlciBhIHBsYW4gZXhpc3RzLCB0ZWxsIHRoZSBBSSB0byBcInN0YXJ0IHJ1biBmb3IgdGhlIGNoYW5nZVwiLiBUaGlzIHRhYiBzaG93cyBwcm9ncmVzcyBhbmQgcmVzdWx0cy4nLFxuICAgICdzdGF0ZS5ub1J1bnMnOiAnTm8gcnVucyB5ZXQuJyxcbiAgICAnc3RhdGUudGVjaFN0YWNrJzogJ1RlY2ggc3RhY2snLFxuICAgICdzdGF0ZS5zeW1ib2xzJzogJ0luZGV4ZWQgc3ltYm9scycsXG4gICAgJ3N0YXRlLm1hbmlmZXN0cyc6ICdNYW5pZmVzdHMnLFxuICAgICdzdGF0ZS5ldmlkZW5jZSc6ICdFdmlkZW5jZSBlbnRyaWVzJyxcbiAgfSxcbn0gYXMgY29uc3RcblxuZnVuY3Rpb24gZmFsbGJhY2tUKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgZGljdCA9IFdPUktTUEFDRV9ESUNULnpoIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbiAgcmV0dXJuIGRpY3Rba2V5XSA/PyBrZXlcbn1cblxuLyoqIFx1NjRDRFx1NEY1Q1x1N0VEM1x1Njc5Q1x1NEVCQVx1NjAyN1x1NTMxNlx1RkYxQVx1MjcxMy9cdTI3MTcgKyBcdTY4MDdcdTkxQ0ZcdTVCNTdcdTZCQjVcdTc2ODRcdTdEMjdcdTUxRDFcdTg4NENcdUZGMDhcdThERjNcdThGQzdcdTVENENcdTU5NTdcdTVCRjlcdThDNjFcdTRFMEVcdTUzOUZcdTU5Q0IgSlNPTlx1RkYwOVx1MzAwMiAqL1xuZnVuY3Rpb24gZm9ybWF0QWN0aW9uUmVzdWx0KGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogc3RyaW5nIHtcbiAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW2RhdGFbJ29rJ10gPT09IGZhbHNlID8gJ1x1MjcxNycgOiAnXHUyNzEzJ11cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YSkpIHtcbiAgICBpZiAoa2V5ID09PSAnb2snKSBjb250aW51ZVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIGxpbmVzLnB1c2goYCR7a2V5fVx1RkYxQSR7U3RyaW5nKHZhbHVlKS5zbGljZSgwLCAyMDApfWApXG4gICAgfVxuICB9XG4gIGlmIChsaW5lcy5sZW5ndGggPT09IDEpIGxpbmVzLnB1c2goJ1x1NjIxMFx1NTI5RicpXG4gIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKVxufVxuXG5jb25zdCBzdHlsZXM6IFJlY29yZDxzdHJpbmcsIFJlYWN0LkNTU1Byb3BlcnRpZXM+ID0ge1xuICByb290OiB7XG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxuICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBmb250RmFtaWx5OiAndmFyKC0tZHMtZm9udC1zYW5zLCBpbmhlcml0KScsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICB9LFxuICBuYXY6IHtcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgZ2FwOiAnNHB4JyxcbiAgICBwYWRkaW5nOiAnOHB4IDEycHgnLFxuICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwxLCByZ2JhKDUsNSw1LDAuMSkpJyxcbiAgICBmbGV4OiAnbm9uZScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXG4gIH0sXG4gIHRpdGxlOiB7IGZvbnRTaXplOiAnMTNweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luSW5saW5lRW5kOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9LFxuICB0YWI6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XG4gICAgcGFkZGluZzogJzVweCAxMnB4JyxcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxuICAgIGJvcmRlcjogJ25vbmUnLFxuICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgYmFja2dyb3VuZDogYWN0aXZlID8gJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgOiAndHJhbnNwYXJlbnQnLFxuICAgIGNvbG9yOiBhY3RpdmUgPyAnI2ZmZicgOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxuICB9KSxcbiAgYm9keTogeyBmbGV4OiAxLCBvdmVyZmxvd1k6ICdhdXRvJywgcGFkZGluZzogJzE0cHggMTZweCcgfSxcbiAgY2FyZDoge1xuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICBwYWRkaW5nOiAnMTJweCAxNHB4JyxcbiAgICBtYXJnaW5Cb3R0b206ICcxMnB4JyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJyxcbiAgfSxcbiAgcm93OiB7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMThweCcsIGZsZXhXcmFwOiAnd3JhcCcsIGZvbnRTaXplOiAnMTJweCcsIG1hcmdpbjogJzZweCAwJyB9LFxuICBsYWJlbDogeyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWFyZ2luSW5saW5lRW5kOiAnNnB4JyB9LFxuICB0YWJsZTogeyB3aWR0aDogJzEwMCUnLCBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJywgZm9udFNpemU6ICcxMnB4JyB9LFxuICB0aDogeyB0ZXh0QWxpZ246ICdzdGFydCcsIHBhZGRpbmc6ICc2cHggOHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDEsIHJnYmEoNSw1LDUsMC4xKSknLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZm9udFdlaWdodDogNTAwIH0sXG4gIHRkOiB7IHBhZGRpbmc6ICc2cHggOHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDMsIHJnYmEoNSw1LDUsMC4wNikpJyB9LFxuICBlbXB0eTogeyBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgZm9udFNpemU6ICcxMnB4JywgcGFkZGluZzogJzEwcHggNHB4JyB9LFxuICBidXR0b246IHtcbiAgICBwYWRkaW5nOiAnNXB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgZm9udFNpemU6ICcxMXB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsIGNvbG9yOiAnI2ZmZicsXG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIH0sXG4gIHNlY29uZGFyeToge1xuICAgIHBhZGRpbmc6ICc1cHggMTJweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzExcHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgfSxcbiAgaW5wdXQ6IHtcbiAgICB3aWR0aDogJzEwMCUnLCBwYWRkaW5nOiAnNnB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgfSxcbiAgZm9ybVJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICc2cHgnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH0sXG4gIHJlc3VsdDoge1xuICAgIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNixcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnMTBweCAxMnB4JywgbWF4SGVpZ2h0OiAnMzIwcHgnLCBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgfSxcbiAgYmFkZ2U6IChjb2xvcjogc3RyaW5nKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiAoe1xuICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCBwYWRkaW5nOiAnMXB4IDhweCcsIGJvcmRlclJhZGl1czogJzRweCcsIGZvbnRTaXplOiAnMTFweCcsXG4gICAgYmFja2dyb3VuZDogYCR7Y29sb3J9MjJgLCBjb2xvcixcbiAgfSksXG4gIHNlY3Rpb25UaXRsZTogeyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTJweCcsIG1hcmdpbkJvdHRvbTogJzhweCcgfSxcbiAgd2hhdDogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjcsIG1hcmdpbjogJzRweCAwIDhweCcgfSxcbiAgbG9naWNTdGVwOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuOCwgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnIH0sXG4gIHJpc2tJdGVtOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNywgY29sb3I6ICcjOWE2NzAwJywgbWFyZ2luOiAnMnB4IDAnIH0sXG4gIGNvbW1pdFJvdzogKGFjdGl2ZTogYm9vbGVhbik6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4gKHtcbiAgICBwYWRkaW5nOiAnOHB4IDEwcHgnLFxuICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgYm9yZGVyOiBhY3RpdmUgPyAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgOiAnMXB4IHNvbGlkIHRyYW5zcGFyZW50JyxcbiAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyAncmdiYSgzNyw5OSwyMzUsMC4wNiknIDogJ3RyYW5zcGFyZW50JyxcbiAgICBtYXJnaW5Cb3R0b206ICc0cHgnLFxuICB9KSxcbiAgY29tbWl0U3ViamVjdDogeyBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAsIGxpbmVIZWlnaHQ6IDEuNSwgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH0sXG4gIGNvbW1pdE1ldGE6IHsgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpblRvcDogJzJweCcsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JyB9LFxuICBwYXRjaDoge1xuICAgIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCBsaW5lSGVpZ2h0OiAxLjUsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzEwcHgnLCBtYXhIZWlnaHQ6ICczMjBweCcsIG92ZXJmbG93WTogJ2F1dG8nLFxuICB9LFxuICB0ZXh0YXJlYToge1xuICAgIHdpZHRoOiAnMTAwJScsIHBhZGRpbmc6ICc4cHggMTBweCcsIGJvcmRlclJhZGl1czogJzZweCcsIGZvbnRTaXplOiAnMTJweCcsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLFxuICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCByZXNpemU6ICd2ZXJ0aWNhbCcsIGxpbmVIZWlnaHQ6IDEuNywgZm9udEZhbWlseTogJ2luaGVyaXQnLFxuICB9LFxuICBub3RlQ2FyZDoge1xuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMSkpJyxcbiAgICBib3JkZXJSYWRpdXM6ICc4cHgnLCBwYWRkaW5nOiAnMTJweCAxNHB4JywgbWFyZ2luQm90dG9tOiAnMTBweCcsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsXG4gIH0sXG4gIG5vdGVUaXRsZVJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JywgZ2FwOiAnOHB4JyB9LFxuICBub3RlVGl0bGVUZXh0OiB7IGZvbnRTaXplOiAnMTNweCcsIGZvbnRXZWlnaHQ6IDYwMCwgbGluZUhlaWdodDogMS41IH0sXG4gIG5vdGVDb250ZW50OiB7XG4gICAgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS44NSwgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstd29yZCcsXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtcHJpbWFyeSwgIzFmMjMyOCknLCBtYXJnaW5Ub3A6ICc2cHgnLFxuICB9LFxuICBub3RlQ2xhbXA6IHtcbiAgICBkaXNwbGF5OiAnLXdlYmtpdC1ib3gnLCBXZWJraXRMaW5lQ2xhbXA6IDYsIFdlYmtpdEJveE9yaWVudDogJ3ZlcnRpY2FsJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICB9LFxuICBub3RlTWV0YToge1xuICAgIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc4cHgnLFxuICAgIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLFxuICB9LFxuICBsaW5rQnRuOiB7XG4gICAgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsIGZvbnRTaXplOiAnMTFweCcsIHBhZGRpbmc6ICcwJyxcbiAgICBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsXG4gIH0sXG4gIGNoaXA6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XG4gICAgcGFkZGluZzogJzJweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnOTk5cHgnLCBmb250U2l6ZTogJzExcHgnLCBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgIGJhY2tncm91bmQ6IGFjdGl2ZSA/ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIDogJ3RyYW5zcGFyZW50JyxcbiAgICBjb2xvcjogYWN0aXZlID8gJyNmZmYnIDogJ2luaGVyaXQnLFxuICB9KSxcbn1cblxuLyoqIFx1OThDRVx1OTY2OVx1N0I0OVx1N0VBNyBcdTIxOTIgXHU1RkJEXHU3QUUwXHU5ODlDXHU4MjcyXHUzMDAyICovXG5jb25zdCBSSVNLX0NPTE9SOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0geyBsb3c6ICcjNGVjOWIwJywgbWVkaXVtOiAnI2RjZGNhYScsIGhpZ2g6ICcjY2U5MTc4JywgY3JpdGljYWw6ICcjZjE0YzRjJyB9XG5cbi8qKlxuICogXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0IFNWRyBcdTZENDFcdTdBMEJcdTU2RkVcdUZGMUFcdTRFMDlcdTUyMTdcdTUyMDZcdTVDNDJcdUZGMDhcdTUzRDhcdTY2RjQgXHUyMTkyIFx1OTVGNFx1NjNBNVx1NUYxNVx1NzUyOFx1OTRGRSBcdTIxOTIgXHU2RjVDXHU1NzI4XHVGRjA5XHVGRjBDXG4gKiBcdTRGOURcdTYzNkUgL2ltcGFjdC1zY29wZSBcdThGRDRcdTU2REVcdTc2ODQgbGV2ZWxzXHVGRjA4XHU1NDJCXHU0RjIwXHU2NEFEXHU5NEZFIHJlYXNvblx1RkYwOVx1N0VEOFx1NTIzNlx1OEZERVx1N0VCRlx1MzAwMlxuICogXHU1MTY4XHU1QkJEXHU3NTNCXHU1RTAzXHVGRjA4dmlld0JveCAxMDAwXHVGRjA5XHVGRjBDXHU4MjgyXHU3MEI5XHU1RTI2XHU3NkVFXHU1RjU1XHU2M0QwXHU3OTNBXHVGRjBDXHU2REYxXHU1RUE2XHU4RDhBXHU2REYxXHU5ODlDXHU4MjcyXHU4RDhBXHU2RDQ1XHUzMDAyXG4gKi9cbmZ1bmN0aW9uIEltcGFjdEdyYXBoKHByb3BzOiB7IGRhdGE6IEltcGFjdFNjb3BlUGF5bG9hZDsgdDogKGtleTogc3RyaW5nKSA9PiBzdHJpbmcgfSkge1xuICBjb25zdCB7IGRhdGEgfSA9IHByb3BzXG4gIGNvbnN0IGluZGlyZWN0ID0gZGF0YS5sZXZlbHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmxldmVsID09PSAnaW5kaXJlY3QnKVxuICBjb25zdCBwb3RlbnRpYWwgPSBkYXRhLmxldmVscy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGV2ZWwgPT09ICdwb3RlbnRpYWwnKVxuICBjb25zdCBjb2wwID0gZGF0YS5jaGFuZ2VkRmlsZXMuc2xpY2UoMCwgNylcbiAgY29uc3QgY29sMSA9IEFycmF5LmZyb20obmV3IFNldChpbmRpcmVjdC5tYXAoKGl0ZW0pID0+IGl0ZW0ucGF0aCkpKS5zbGljZSgwLCA5KVxuICBjb25zdCBjb2wyID0gQXJyYXkuZnJvbShuZXcgU2V0KHBvdGVudGlhbC5tYXAoKGl0ZW0pID0+IGl0ZW0ucGF0aCkpKS5maWx0ZXIoKHApID0+ICFjb2wxLmluY2x1ZGVzKHApKS5zbGljZSgwLCA4KVxuICBjb25zdCBub2RlSCA9IDMwXG4gIGNvbnN0IGdhcCA9IDEwXG4gIGNvbnN0IGNvbFggPSBbMzAsIDM4MCwgNzIwXVxuICBjb25zdCBjb2xXID0gMjgwXG4gIGNvbnN0IHJvd3MgPSBNYXRoLm1heChjb2wwLmxlbmd0aCwgY29sMS5sZW5ndGgsIGNvbDIubGVuZ3RoLCAxKVxuICBjb25zdCBoZWlnaHQgPSByb3dzICogKG5vZGVIICsgZ2FwKSArIDYwXG5cbiAgY29uc3QgZGVwdGhPZiA9IChwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSBpbmRpcmVjdC5maW5kKChlbnRyeSkgPT4gZW50cnkucGF0aCA9PT0gcGF0aCkgPz8gcG90ZW50aWFsLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5wYXRoID09PSBwYXRoKVxuICAgIHJldHVybiBpdGVtPy5kZXB0aCA/PyAwXG4gIH1cblxuICBjb25zdCByZW5kZXJDb2wgPSAoY29sOiBudW1iZXIsIGl0ZW1zOiBzdHJpbmdbXSwgY29sb3I6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdID0+IGl0ZW1zLm1hcCgocGF0aCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCB5ID0gNDQgKyBpbmRleCAqIChub2RlSCArIGdhcClcbiAgICBjb25zdCBkaXIgPSBwYXRoLmluY2x1ZGVzKCcvJykgPyBwYXRoLnNsaWNlKDAsIHBhdGgubGFzdEluZGV4T2YoJy8nKSkgOiAnJ1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdnJywgeyBrZXk6IGAke2NvbH0tJHtwYXRofWAgfSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3JlY3QnLCB7IHg6IGNvbFhbY29sXSwgeSwgd2lkdGg6IGNvbFcsIGhlaWdodDogbm9kZUgsIHJ4OiA2LCBmaWxsOiBjb2xvciwgc3Ryb2tlOiAncmdiYSgwLDAsMCwwLjMpJywgc3Ryb2tlV2lkdGg6IDEgfSksXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyB4OiBjb2xYW2NvbF0gKyAxMCwgeTogeSArIDE0LCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgZmlsbDogJyNmZmZmZmYnIH0sXG4gICAgICAgIChwYXRoLnNwbGl0KCcvJykucG9wKCkgPz8gcGF0aCkuc2xpY2UoMCwgMzApKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3RleHQnLCB7IHg6IGNvbFhbY29sXSArIDEwLCB5OiB5ICsgMjYsIGZvbnRTaXplOiAxMCwgZmlsbDogJ3JnYmEoMjU1LDI1NSwyNTUsMC45MiknIH0sXG4gICAgICAgIGRpci5zbGljZSgwLCA0MCkpLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGl0bGUnLCBudWxsLCBwYXRoKSxcbiAgICApXG4gIH0pXG5cbiAgY29uc3QgY2hhaW5TdGFydCA9IChyZWFzb246IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgbWF0Y2ggPSByZWFzb24ubWF0Y2goL3BhdGg6ICguKykkLylcbiAgICBpZiAobWF0Y2ggPT09IG51bGwpIHJldHVybiBkYXRhLmNoYW5nZWRGaWxlc1swXSA/PyAnJ1xuICAgIHJldHVybiBtYXRjaFsxXSEuc3BsaXQoJyAtPiAnKVswXSA/PyBkYXRhLmNoYW5nZWRGaWxlc1swXSA/PyAnJ1xuICB9XG4gIGNvbnN0IGluZGV4SW4gPSAoaXRlbXM6IHN0cmluZ1tdLCBwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4gaXRlbXMuaW5kZXhPZihwYXRoKVxuICBjb25zdCBjb2xPZiA9IChwYXRoOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGlmIChjb2wwLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMFxuICAgIGlmIChjb2wxLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMVxuICAgIGlmIChjb2wyLmluY2x1ZGVzKHBhdGgpKSByZXR1cm4gMlxuICAgIHJldHVybiAtMVxuICB9XG5cbiAgY29uc3QgZWRnZXM6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cbiAgY29uc3QgcHVzaEVkZ2UgPSAoZnJvbVBhdGg6IHN0cmluZywgdG9QYXRoOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcsIGtleTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZnJvbUNvbCA9IGNvbE9mKGZyb21QYXRoKVxuICAgIGNvbnN0IHRvQ29sID0gY29sT2YodG9QYXRoKVxuICAgIGlmIChmcm9tQ29sID09PSAtMSB8fCB0b0NvbCA9PT0gLTEgfHwgdG9Db2wgPD0gZnJvbUNvbCkgcmV0dXJuXG4gICAgY29uc3QgeDEgPSBjb2xYW2Zyb21Db2xdICsgY29sV1xuICAgIGNvbnN0IHkxID0gNDQgKyBpbmRleEluKFtjb2wwLCBjb2wxLCBjb2wyXVtmcm9tQ29sXSA/PyBbXSwgZnJvbVBhdGgpICogKG5vZGVIICsgZ2FwKSArIG5vZGVIIC8gMlxuICAgIGNvbnN0IHgyID0gY29sWFt0b0NvbF1cbiAgICBjb25zdCB5MiA9IDQ0ICsgaW5kZXhJbihbY29sMCwgY29sMSwgY29sMl1bdG9Db2xdID8/IFtdLCB0b1BhdGgpICogKG5vZGVIICsgZ2FwKSArIG5vZGVIIC8gMlxuICAgIGVkZ2VzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudCgncGF0aCcsIHtcbiAgICAgIGtleSwgZDogYE0gJHt4MX0gJHt5MX0gQyAke3gxICsgMzB9ICR7eTF9LCAke3gyIC0gMzB9ICR7eTJ9LCAke3gyfSAke3kyfWAsXG4gICAgICBmaWxsOiAnbm9uZScsIHN0cm9rZTogY29sb3IsIHN0cm9rZVdpZHRoOiAxLjYsIG9wYWNpdHk6IDAuNixcbiAgICB9KSlcbiAgfVxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaW5kaXJlY3Quc2xpY2UoMCwgMjApKSBwdXNoRWRnZShjaGFpblN0YXJ0KGl0ZW0ucmVhc29uKSwgaXRlbS5wYXRoLCAnI2Q5NzcwNicsIGBlaS0ke2l0ZW0ucGF0aH1gKVxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgcG90ZW50aWFsLnNsaWNlKDAsIDE2KSkgcHVzaEVkZ2UoY2hhaW5TdGFydChpdGVtLnJlYXNvbiksIGl0ZW0ucGF0aCwgJyM4YjhiOGInLCBgZXAtJHtpdGVtLnBhdGh9YClcblxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzdmcnLCB7IHdpZHRoOiAnMTAwJScsIHZpZXdCb3g6IGAwIDAgMTAyNCAke2hlaWdodH1gLCBzdHlsZTogeyBtYXhIZWlnaHQ6IDQ4MCB9IH0sXG4gICAgICBbWydcdTUzRDhcdTY2RjRcdTY1ODdcdTRFRjYnLCAwXSwgWydcdTk1RjRcdTYzQTVcdTVGNzFcdTU0Q0RcdUZGMDhcdThDMDFcdTVGMTVcdTc1MjhcdTRFODZcdTVCODNcdUZGMDknLCAxXSwgWydcdTZGNUNcdTU3MjhcdTVGNzFcdTU0Q0RcdUZGMDhcdTRFOENcdTdFQTdcdTRGMjBcdTY0QURcdUZGMDknLCAyXV0ubWFwKChbbmFtZSwgY29sXSkgPT5cbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGV4dCcsIHsga2V5OiBTdHJpbmcoY29sKSwgeDogY29sWFtjb2wgYXMgbnVtYmVyXSwgeTogMjQsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNzAwLCBmaWxsOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9LCBuYW1lIGFzIHN0cmluZykpLFxuICAgICAgcmVuZGVyQ29sKDAsIGNvbDAsICcjMjU2M2ViJyksXG4gICAgICByZW5kZXJDb2woMSwgY29sMSwgJyNkOTc3MDYnKSxcbiAgICAgIHJlbmRlckNvbCgyLCBjb2wyLCAnIzhiOGI4YicpLFxuICAgICAgZWRnZXMsXG4gICAgKSxcbiAgKVxufVxuXG5jb25zdCBESUZGX0tFWVdPUkRTID0gL1xcYihwdWJsaWN8cHJpdmF0ZXxwcm90ZWN0ZWR8aW50ZXJuYWx8c3RhdGljfHZvaWR8Y2xhc3N8c3RydWN0fGludGVyZmFjZXxlbnVtfG5ld3xyZXR1cm58aWZ8ZWxzZXxmb3J8Zm9yZWFjaHx3aGlsZXxzd2l0Y2h8Y2FzZXxicmVha3xjb250aW51ZXx0cnl8Y2F0Y2h8ZmluYWxseXx0aHJvd3x1c2luZ3xuYW1lc3BhY2V8aW1wb3J0fGV4cG9ydHxmcm9tfGNvbnN0fGxldHx2YXJ8YXN5bmN8YXdhaXR8ZnVuY3Rpb258dGhpc3xiYXNlfHN1cGVyfG51bGx8dHJ1ZXxmYWxzZXxvdmVycmlkZXx2aXJ0dWFsfGFic3RyYWN0fHNlYWxlZHxyZWFkb25seXxwYXJhbXN8b3V0fHJlZnx5aWVsZHx0eXBlb2Z8aW5zdGFuY2VvZnxpbnxvZnxkZWZhdWx0fHN0cmluZ3xpbnR8bG9uZ3xkb3VibGV8ZmxvYXR8Ym9vbHxjaGFyfGRlY2ltYWx8b2JqZWN0fHJlY29yZHxwYXJ0aWFsfGdldHxzZXR8cmVxdWlyZXxtb2R1bGV8dHlwZXxpbXBsZW1lbnRzfGV4dGVuZHMpXFxiL2dcblxuLyoqIFx1NTM1NVx1ODg0Q1x1NEVFM1x1NzgwMVx1OUFEOFx1NEVBRVx1RkYxQVx1NkNFOFx1OTFDQSA+IFx1NUI1N1x1N0IyNlx1NEUzMiA+IFx1NTE3M1x1OTUyRVx1NUI1Ny9cdTY1NzBcdTVCNTcgXHU0RTA5XHU1QzQyXHU3NzQwXHU4MjcyXHVGRjA4XHU4RjdCXHU5MUNGXHU2QjYzXHU1MjE5XHVGRjBDXHU1OTFGXHU2ODM4XHU2N0U1XHU3NTI4XHVGRjA5XHUzMDAyICovXG5mdW5jdGlvbiBoaWdobGlnaHRDb2RlTGluZShsaW5lOiBzdHJpbmcsIGtleVByZWZpeDogc3RyaW5nKTogUmVhY3QuUmVhY3ROb2RlW10ge1xuICBjb25zdCB0cmltbWVkID0gbGluZS50cmltU3RhcnQoKVxuICBpZiAodHJpbW1lZC5zdGFydHNXaXRoKCcvLycpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnLy8vJykgfHwgdHJpbW1lZC5zdGFydHNXaXRoKCcqJykgfHwgdHJpbW1lZC5zdGFydHNXaXRoKCcvKicpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnIycpKSB7XG4gICAgcmV0dXJuIFtSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBrZXk6IGAke2tleVByZWZpeH0tY2AsIHN0eWxlOiB7IGNvbG9yOiAnIzZhOTk1NScgfSB9LCBsaW5lKV1cbiAgfVxuICBjb25zdCBwYXJ0cyA9IGxpbmUuc3BsaXQoLyhcIig/OlteXCJcXFxcXXxcXFxcLikqXCJ8Jyg/OlteJ1xcXFxdfFxcXFwuKSonfGAoPzpbXmBcXFxcXXxcXFxcLikqYCkvZylcbiAgcmV0dXJuIHBhcnRzLm1hcCgocGFydCwgaSkgPT4ge1xuICAgIGlmIChpICUgMiA9PT0gMSkgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1zJHtpfWAsIHN0eWxlOiB7IGNvbG9yOiAnI2NlOTE3OCcgfSB9LCBwYXJ0KVxuICAgIGNvbnN0IHN1YjogUmVhY3QuUmVhY3ROb2RlW10gPSBbXVxuICAgIGxldCBsYXN0ID0gMFxuICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgcGFydC5tYXRjaEFsbChESUZGX0tFWVdPUkRTKSkge1xuICAgICAgaWYgKG1hdGNoLmluZGV4ISA+IGxhc3QpIHN1Yi5wdXNoKHBhcnQuc2xpY2UobGFzdCwgbWF0Y2guaW5kZXgpKVxuICAgICAgc3ViLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsga2V5OiBgJHtrZXlQcmVmaXh9LWske2l9LSR7bWF0Y2guaW5kZXh9YCwgc3R5bGU6IHsgY29sb3I6ICcjNTY5Y2Q2JyB9IH0sIG1hdGNoWzBdKSlcbiAgICAgIGxhc3QgPSBtYXRjaC5pbmRleCEgKyBtYXRjaFswXS5sZW5ndGhcbiAgICB9XG4gICAgaWYgKGxhc3QgPCBwYXJ0Lmxlbmd0aCkgc3ViLnB1c2gocGFydC5zbGljZShsYXN0KSlcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgeyBrZXk6IGAke2tleVByZWZpeH0tcCR7aX1gIH0sIHN1YilcbiAgfSlcbn1cblxuLyoqIFx1OUFEOFx1NEVBRVx1NURFRVx1NUYwMlx1ODlDNlx1NTZGRVx1RkYxQVx1ODlFM1x1Njc5MCB1bmlmaWVkIGRpZmZcdUZGMENcdTYzMDkgXHU1ODlFL1x1NTIyMC9cdTU3NTdcdTU5MzQvXHU0RTBBXHU0RTBCXHU2NTg3IFx1Nzc0MFx1ODI3Mlx1MzAwMiAqL1xuZnVuY3Rpb24gRGlmZlZpZXcocHJvcHM6IHsgcGF0Y2g6IHN0cmluZyB9KSB7XG4gIGNvbnN0IGxpbmVzID0gcHJvcHMucGF0Y2guc3BsaXQoJ1xcbicpLmZpbHRlcigobGluZSwgaSkgPT4gIShsaW5lID09PSAnJyAmJiBpID09PSBwcm9wcy5wYXRjaC5zcGxpdCgnXFxuJykubGVuZ3RoIC0gMSkpXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgc3R5bGU6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdDb25zb2xhcywgbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4JywgbGluZUhlaWdodDogMS41NSxcbiAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAwJywgbWF4SGVpZ2h0OiA0MjAsIG92ZXJmbG93WTogJ2F1dG8nLCBtYXJnaW5Ub3A6ICc2cHgnLFxuICAgIH0sXG4gIH0sIGxpbmVzLm1hcCgobGluZSwgaSkgPT4ge1xuICAgIGNvbnN0IGtpbmQgPSBsaW5lLnN0YXJ0c1dpdGgoJysrKycpIHx8IGxpbmUuc3RhcnRzV2l0aCgnLS0tJykgPyAnbWV0YSdcbiAgICAgIDogbGluZS5zdGFydHNXaXRoKCdAQCcpID8gJ2h1bmsnXG4gICAgICAgIDogbGluZS5zdGFydHNXaXRoKCcrJykgPyAnYWRkJ1xuICAgICAgICAgIDogbGluZS5zdGFydHNXaXRoKCctJykgPyAnZGVsJyA6ICdjdHgnXG4gICAgY29uc3QgYmcgPSBraW5kID09PSAnYWRkJyA/ICdyZ2JhKDQ2LDE2MCw2NywwLjE0KScgOiBraW5kID09PSAnZGVsJyA/ICdyZ2JhKDI0OCw4MSw3MywwLjEzKScgOiBraW5kID09PSAnaHVuaycgPyAncmdiYSg1NiwxMzksMjUzLDAuMSknIDogJ3RyYW5zcGFyZW50J1xuICAgIGNvbnN0IGNvbnRlbnQgPSBraW5kID09PSAnbWV0YScgfHwga2luZCA9PT0gJ2h1bmsnXG4gICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IHN0eWxlOiB7IGNvbG9yOiAnIzM4OGJmZCcsIGZvbnRXZWlnaHQ6IDYwMCB9IH0sIGxpbmUpXG4gICAgICA6IGtpbmQgPT09ICdhZGQnIHx8IGtpbmQgPT09ICdkZWwnXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6IGtpbmQgPT09ICdhZGQnID8gJyMxYTdmMzcnIDogJyNjZjIyMmUnLCBmb250V2VpZ2h0OiA2MDAgfSB9LCBsaW5lWzBdKVxuICAgICAgICA6IG51bGxcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBrZXk6IGksIHN0eWxlOiB7IHBhZGRpbmc6ICcwIDEwcHgnLCBiYWNrZ3JvdW5kOiBiZywgd2hpdGVTcGFjZTogJ3ByZS13cmFwJywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9IH0sXG4gICAgICBjb250ZW50LFxuICAgICAga2luZCA9PT0gJ2FkZCcgfHwga2luZCA9PT0gJ2RlbCcgPyBoaWdobGlnaHRDb2RlTGluZShsaW5lLnNsaWNlKDEpLCBgbCR7aX1gKSA6IGhpZ2hsaWdodENvZGVMaW5lKGxpbmUsIGBsJHtpfWApLFxuICAgIClcbiAgfSkpXG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWUodmFsdWU6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuICdcdTIwMTQnXG4gIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSkudG9Mb2NhbGVTdHJpbmcoKVxufVxuXG4vKiogXHU0RThDXHU2QjIxXHU3ODZFXHU4QkE0XHU1RjM5XHU3QTk3XHVGRjFBXHU5MDZFXHU3RjY5ICsgXHU1QzQ1XHU0RTJEXHU1MzYxXHU3MjQ3XHVGRjBDXHU1MzcxXHU5NjY5XHU2NENEXHU0RjVDXHVGRjA4XHU1MjIwXHU5NjY0XHU3QjE0XHU4QkIwL1x1NTNEOFx1NjZGNC9cdTdFQTZcdTY3NUZcdUZGMDlcdTUxNzFcdTc1MjhcdTMwMDIgKi9cbmZ1bmN0aW9uIENvbmZpcm1EaWFsb2cocHJvcHM6IHsgdGl0bGU6IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nOyBkYW5nZXI/OiBib29sZWFuOyBvbkNhbmNlbDogKCkgPT4gdm9pZDsgb25Db25maXJtOiAoKSA9PiB2b2lkIH0pIHtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgJ2RhdGEtdGVzdGlkJzogJ3BjLWNvbmZpcm0tb3ZlcmxheScsXG4gICAgICBzdHlsZToge1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIHpJbmRleDogOTk5LFxuICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgxNSwyMyw0MiwwLjQ1KScsIGJhY2tkcm9wRmlsdGVyOiAnYmx1cigycHgpJyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICBhbmltYXRpb246ICdwY0ZhZGVJbiAwLjE1cyBlYXNlLW91dCcsXG4gICAgICB9LFxuICAgICAgb25DbGljazogcHJvcHMub25DYW5jZWwsXG4gICAgfSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgJ2RhdGEtdGVzdGlkJzogJ3BjLWNvbmZpcm0tY2FyZCcsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgd2lkdGg6IDQwMCwgbWF4V2lkdGg6ICdjYWxjKDEwMHZ3IC0gNDhweCknLFxuICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLCBib3hTaGFkb3c6ICcwIDIwcHggNTBweCByZ2JhKDAsMCwwLDAuMjUpJyxcbiAgICAgICAgICBwYWRkaW5nOiAnMjBweCAyMnB4IDE2cHgnLFxuICAgICAgICAgIG9uQ2xpY2s6IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCkgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsIGdhcDogJzEwcHgnIH0gfSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICB3aWR0aDogMzQsIGhlaWdodDogMzQsIGJvcmRlclJhZGl1czogJzUwJScsIGZsZXhTaHJpbms6IDAsXG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxN3B4JyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogcHJvcHMuZGFuZ2VyID8gJ3JnYmEoMjQ0LDYzLDk0LDAuMTIpJyA6ICdyZ2JhKDM3LDk5LDIzNSwwLjEpJyxcbiAgICAgICAgICAgICAgY29sb3I6IHByb3BzLmRhbmdlciA/ICcjZTExZDQ4JyA6ICcjMjU2M2ViJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSwgcHJvcHMuZGFuZ2VyID8gJyEnIDogJz8nKSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzZweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyB9IH0sIHByb3BzLnRpdGxlKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS43LCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9IH0sIHByb3BzLm1lc3NhZ2UpLFxuICAgICAgICAgICksXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJywgZ2FwOiAnMTBweCcsIG1hcmdpblRvcDogJzE4cHgnIH0gfSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XG4gICAgICAgICAgICBzdHlsZTogeyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnN3B4IDE4cHgnLCBib3JkZXJSYWRpdXM6ICc4cHgnIH0sXG4gICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5vbkNhbmNlbCxcbiAgICAgICAgICB9LCAnXHU1M0Q2XHU2RDg4JyksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xuICAgICAgICAgICAgJ2RhdGEtdGVzdGlkJzogJ3BjLWNvbmZpcm0tb2snLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgcGFkZGluZzogJzdweCAxOHB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA1MDAsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHByb3BzLmRhbmdlciA/ICcjZTExZDQ4JyA6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLCBjb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ29uZmlybSxcbiAgICAgICAgICB9LCAnXHU3ODZFXHU4QkE0XHU1MjIwXHU5NjY0JyksXG4gICAgICAgICksXG4gICAgICApLFxuICAgICksXG4gIClcbn1cblxuLyoqIFx1OUFBOFx1NjdCNlx1NUMwRlx1NTM2MVx1NzI0N1x1MzAwMiAqL1xuZnVuY3Rpb24gQ2FyZChwcm9wczogeyB0aXRsZT86IHN0cmluZzsgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLmNhcmQgfSxcbiAgICBwcm9wcy50aXRsZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5zZWN0aW9uVGl0bGUgfSwgcHJvcHMudGl0bGUpLFxuICAgIHByb3BzLmNoaWxkcmVuKVxufVxuXG4vKipcbiAqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NEUzQlx1N0VDNFx1NEVGNlx1RkYxQVx1NTZEQlx1OTg3NVx1N0I3RVx1RkYwOFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1NEUzQVx1OUVEOFx1OEJBNFx1RkYwOSsgXHU4RjZFXHU4QkUyXHU1QkJGXHU0RTNCIEFQSSArIFx1NjMwOVx1OTRBRVx1NTMxNlx1NjRDRFx1NEY1Q1x1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gV29ya3NwYWNlRnJhbWUocHJvcHM6IFdvcmtzcGFjZUZyYW1lUHJvcHMpIHtcbiAgY29uc3QgdCA9IHByb3BzLnQgPz8gZmFsbGJhY2tUXG4gIGNvbnN0IFt0YWIsIHNldFRhYl0gPSB1c2VTdGF0ZTxUYWJLZXk+KCdjb21taXRzJylcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZTxXb3Jrc3BhY2VTdGF0ZSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtsb2FkRXJyb3IsIHNldExvYWRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbYm9vdHN0cmFwcGluZywgc2V0Qm9vdHN0cmFwcGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2FjdGlvblJlc3VsdCwgc2V0QWN0aW9uUmVzdWx0XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtjaGFuZ2VUaXRsZSwgc2V0Q2hhbmdlVGl0bGVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtjaGFuZ2VEZXNjLCBzZXRDaGFuZ2VEZXNjXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbWVtb3J5VGl0bGUsIHNldE1lbW9yeVRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbWVtb3J5Q29udGVudCwgc2V0TWVtb3J5Q29udGVudF0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2NvbmZpcm1lZFRleHQsIHNldENvbmZpcm1lZFRleHRdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtjb25maXJtZWRQYXRocywgc2V0Q29uZmlybWVkUGF0aHNdID0gdXNlU3RhdGUoJycpXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1NzJCNlx1NjAwMSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgW2NvbW1pdHNEYXRhLCBzZXRDb21taXRzRGF0YV0gPSB1c2VTdGF0ZTxDb21taXRzUGF5bG9hZCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtjb21taXRzRXJyb3IsIHNldENvbW1pdHNFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbcGlja2VyT3Blbiwgc2V0UGlja2VyT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW3BpY2tlckZpbHRlciwgc2V0UGlja2VyRmlsdGVyXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbc2VsZWN0ZWRUYXJnZXRzLCBzZXRTZWxlY3RlZFRhcmdldHNdID0gdXNlU3RhdGU8c3RyaW5nW10+KFtdKVxuICBjb25zdCBbZGV0YWlscywgc2V0RGV0YWlsc10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBDb21taXREZXRhaWxQYXlsb2FkPj4oe30pXG4gIGNvbnN0IFtkZXRhaWxMb2FkaW5nLCBzZXREZXRhaWxMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbaW1wYWN0LCBzZXRJbXBhY3RdID0gdXNlU3RhdGU8SW1wYWN0U2NvcGVQYXlsb2FkIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2ltcGFjdExvYWRpbmcsIHNldEltcGFjdExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtyZXZpZXdzLCBzZXRSZXZpZXdzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIFJldmlld1BheWxvYWQ+Pih7fSlcbiAgY29uc3QgW3Jldmlld0xvYWRpbmcsIHNldFJldmlld0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtmaWxlRGlmZnMsIHNldEZpbGVEaWZmc10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+Pih7fSlcbiAgY29uc3QgW2NvbmZpcm1EaWFsb2csIHNldENvbmZpcm1EaWFsb2ddID0gdXNlU3RhdGU8eyB0aXRsZTogc3RyaW5nOyBtZXNzYWdlOiBzdHJpbmc7IGRhbmdlcj86IGJvb2xlYW47IG9uQ29uZmlybTogKCkgPT4gdm9pZCB9IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW25vdGVzLCBzZXROb3Rlc10gPSB1c2VTdGF0ZTxOb3RlRW50cnlbXT4oW10pXG4gIGNvbnN0IFtub3RlVGl0bGUsIHNldE5vdGVUaXRsZV0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW25vdGVDb250ZW50LCBzZXROb3RlQ29udGVudF0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2VkaXRpbmdOb3RlLCBzZXRFZGl0aW5nTm90ZV0gPSB1c2VTdGF0ZTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbnRlbnQ6IHN0cmluZyB9IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW25vdGVTZWFyY2gsIHNldE5vdGVTZWFyY2hdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtub3RlRXhwYW5kZWQsIHNldE5vdGVFeHBhbmRlZF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBib29sZWFuPj4oe30pXG4gIGNvbnN0IFthaVN1bW1hcml6aW5nLCBzZXRBaVN1bW1hcml6aW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbbW9kZWxUaWVycywgc2V0TW9kZWxUaWVyc10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCB7IHByb3ZpZGVyOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmcgfT4gfCBudWxsPihudWxsKVxuICBjb25zdCBbbW9kZWxPcHRpb25zLCBzZXRNb2RlbE9wdGlvbnNdID0gdXNlU3RhdGU8QXJyYXk8eyBwcm92aWRlcjogc3RyaW5nOyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfT4+KFtdKVxuICBjb25zdCBbbW9kZWxTYXZpbmcsIHNldE1vZGVsU2F2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbbW9kZWxTYXZlZCwgc2V0TW9kZWxTYXZlZF0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2V4ZWNUaXRsZSwgc2V0RXhlY1RpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbZXhlY0Rlc2MsIHNldEV4ZWNEZXNjXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbWVtb3J5QnJhbmNoLCBzZXRNZW1vcnlCcmFuY2hdID0gdXNlU3RhdGUoJycpXG5cbiAgY29uc3QgcG9zdCA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGJvZHk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTx7IG9rOiBib29sZWFuOyBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB9PiA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChwYXRoLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyAuLi5ib2R5LCBzZXNzaW9uSWQ6IHByb3BzLnNlc3Npb25JZCB9KSxcbiAgICB9KVxuICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICByZXR1cm4geyBvazogcmVzcG9uc2Uub2ssIGRhdGE6IChkYXRhID8/IHt9KSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB9XG4gIH1cblxuICBjb25zdCBsb2FkQ29tbWl0cyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL3Byb2plY3QtY29udHJvbC9hcGkvY29tbWl0cz9zZXNzaW9uSWQ9JHtlbmNvZGVVUklDb21wb25lbnQocHJvcHMuc2Vzc2lvbklkID8/ICcnKX0mbGltaXQ9NjBgKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKChkYXRhIGFzIHsgZXJyb3I/OiBzdHJpbmcgfSkuZXJyb3IgPz8gYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YClcbiAgICAgIHNldENvbW1pdHNEYXRhKGRhdGEgYXMgQ29tbWl0c1BheWxvYWQpXG4gICAgICBzZXRDb21taXRzRXJyb3IobnVsbClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0Q29tbWl0c0Vycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkTm90ZXMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzP3Nlc3Npb25JZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJykpXG4gICAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHNldE5vdGVzKChkYXRhIGFzIHsgbm90ZXM6IE5vdGVFbnRyeVtdIH0pLm5vdGVzID8/IFtdKVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gXHU3QjE0XHU4QkIwXHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXHVGRjFBXHU1MjE3XHU4ODY4XHU0RkREXHU2MzAxXHU1MzlGXHU2ODM3XHUzMDAyXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NTJGRVx1OTAwOS9cdTUzRDZcdTZEODhcdTRFMDBcdTZCMjFcdTYzRDBcdTRFQTRcdUZGMUFcdTkxQ0RcdTdCOTdcdTkwMDlcdTRFMkRcdTk2QzZcdTU0MDhcdUZGMENcdTVFNzZcdTYzMDlcdTk3MDBcdTg4NjVcdTlGNTBcdTZCQ0ZcdTY3NjFcdTYzRDBcdTRFQTRcdTc2ODQgQUkgXHU4OUUzXHU4QkZCXHVGRjA4XHU2NzBEXHU1MkExXHU3QUVGXHU2NzA5XHU3RjEzXHU1QjU4XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHRvZ2dsZVRhcmdldCA9IGFzeW5jICh0YXJnZXQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldFNlbGVjdGVkVGFyZ2V0cygocHJldmlvdXMpID0+IHtcbiAgICAgIGlmIChwcmV2aW91cy5pbmNsdWRlcyh0YXJnZXQpKSByZXR1cm4gcHJldmlvdXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSB0YXJnZXQpXG4gICAgICByZXR1cm4gWy4uLnByZXZpb3VzLCB0YXJnZXRdXG4gICAgfSlcbiAgICBzZXRJbXBhY3QobnVsbClcbiAgICBzZXRSZXZpZXdzKHt9KVxuICAgIGlmICghc2VsZWN0ZWRUYXJnZXRzLmluY2x1ZGVzKHRhcmdldCkpIHtcbiAgICAgIGF3YWl0IGxvYWREZXRhaWwodGFyZ2V0LCBmYWxzZSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU2MkM5XHU1M0Q2XHU1MzU1XHU2NzYxXHU2M0QwXHU0RUE0XHU3Njg0IEFJIFx1ODlFM1x1OEJGQlx1RkYxQmZvcmNlPXRydWUgXHU2NUY2XHU3RUQ1XHU4RkM3XHU3RjEzXHU1QjU4XHU1RjNBXHU1MjM2XHU5MUNEXHU3Qjk3XHUzMDAyXHU1OTMxXHU4RDI1XHU1MTk5XHU1MTY1XHU5NTE5XHU4QkVGXHU1MzYwXHU0RjREXHVGRjA4XHU1MzYxXHU3MjQ3XHU0RTBEXHU1RDI5XHU2RTgzXHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGxvYWREZXRhaWwgPSBhc3luYyAodGFyZ2V0OiBzdHJpbmcsIGZvcmNlOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0RGV0YWlsTG9hZGluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9jb21taXQtZGV0YWlsJywgeyBzaGE6IHRhcmdldCwgZm9yY2UgfSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0RGV0YWlscygocHJldmlvdXMpID0+ICh7XG4gICAgICAgICAgLi4ucHJldmlvdXMsXG4gICAgICAgICAgW3RhcmdldF06IHtcbiAgICAgICAgICAgIHNoYTogdGFyZ2V0LFxuICAgICAgICAgICAgaXNXb3JraW5nOiB0YXJnZXQgPT09ICd3b3JraW5nJyxcbiAgICAgICAgICAgIGZpbGVzOiBbXSxcbiAgICAgICAgICAgIGluc2VydGlvbnM6IDAsXG4gICAgICAgICAgICBkZWxldGlvbnM6IDAsXG4gICAgICAgICAgICBwYXRjaFRydW5jYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBwYXRjaDogJycsXG4gICAgICAgICAgICBjb21taXQ6IG51bGwsXG4gICAgICAgICAgICBhbmFseXNpczogeyB3aGF0OiAnQUkgXHU4OUUzXHU4QkZCXHU1OTMxXHU4RDI1XHVGRjFBJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICcnKSArICdcdUZGMDhcdTcwQjlcdTMwMENcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdTMwMERcdTUzRUZcdTkxQ0RcdThCRDVcdUZGMDknLCBsb2dpYzogW10sIHJpc2tzOiBbXSB9LFxuICAgICAgICAgIH0gYXMgdW5rbm93biBhcyBDb21taXREZXRhaWxQYXlsb2FkLFxuICAgICAgICB9KSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXREZXRhaWxzKChwcmV2aW91cykgPT4gKHsgLi4ucHJldmlvdXMsIFt0YXJnZXRdOiBkYXRhIGFzIHVua25vd24gYXMgQ29tbWl0RGV0YWlsUGF5bG9hZCB9KSlcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0TG9hZEVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0RGV0YWlsTG9hZGluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkSW1wYWN0ID0gYXN5bmMgKGZvcmNlID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoc2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgc2V0SW1wYWN0TG9hZGluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9pbXBhY3Qtc2NvcGUnLCB7IHNoYXM6IHNlbGVjdGVkVGFyZ2V0cywgZm9yY2UgfSlcbiAgICAgIHNldEltcGFjdChvayA/IChkYXRhIGFzIHVua25vd24gYXMgSW1wYWN0U2NvcGVQYXlsb2FkKSA6IG51bGwpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEltcGFjdExvYWRpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZFJldmlld3MgPSBhc3luYyAoZm9yY2UgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICBzZXRSZXZpZXdMb2FkaW5nKHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIHNlbGVjdGVkVGFyZ2V0cykge1xuICAgICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9yZXZpZXcnLCB7IHNoYTogdGFyZ2V0LCBmb3JjZSB9KVxuICAgICAgICBjb25zdCBwYXlsb2FkID0gZGF0YSBhcyB1bmtub3duIGFzIFJldmlld1BheWxvYWRcbiAgICAgICAgc2V0UmV2aWV3cygocHJldmlvdXMpID0+ICh7XG4gICAgICAgICAgLi4ucHJldmlvdXMsXG4gICAgICAgICAgW3RhcmdldF06IG9rID8gcGF5bG9hZCA6IHtcbiAgICAgICAgICAgIGlzc3Vlc0ZvdW5kOiAwLFxuICAgICAgICAgICAgaXNzdWVzOiAnJyxcbiAgICAgICAgICAgIHZlcmRpY3Q6ICdcdThCQzRcdTVCQTFcdTU5MzFcdThEMjVcdUZGMUEnICsgU3RyaW5nKHBheWxvYWRbJ2Vycm9yJ10gPz8gJycpICsgJ1x1RkYwOFx1NTNFRlx1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMFx1OTFDRFx1OEJENVx1RkYwOScsXG4gICAgICAgICAgICBpc3N1ZUxpc3Q6IFtdLFxuICAgICAgICAgICAgY2FjaGVkOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSlcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0UmV2aWV3TG9hZGluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2FkRmlsZURpZmYgPSBhc3luYyAoc2hhOiBzdHJpbmcsIHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGtleSA9IGAke3NoYX18JHtwYXRofWBcbiAgICBpZiAoZmlsZURpZmZzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2V0RmlsZURpZmZzKChwcmV2aW91cykgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0geyAuLi5wcmV2aW91cyB9XG4gICAgICAgIGRlbGV0ZSBuZXh0W2tleV1cbiAgICAgICAgcmV0dXJuIG5leHRcbiAgICAgIH0pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9maWxlLWRpZmYnLCB7IHNoYSwgcGF0aCB9KVxuICAgIHNldEZpbGVEaWZmcygocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBba2V5XTogU3RyaW5nKGRhdGFbJ3BhdGNoJ10gPz8gJycpIH0pKVxuICB9XG5cbiAgY29uc3QgYWRkTm90ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAobm90ZVRpdGxlLnRyaW0oKSA9PT0gJycgfHwgbm90ZUNvbnRlbnQudHJpbSgpID09PSAnJykgcmV0dXJuXG4gICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMnLCB7XG4gICAgICB0aXRsZTogbm90ZVRpdGxlLnRyaW0oKSxcbiAgICAgIGNvbnRlbnQ6IG5vdGVDb250ZW50LnRyaW0oKSxcbiAgICAgIHNoYTogc2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCA/IHVuZGVmaW5lZCA6IHNlbGVjdGVkVGFyZ2V0c1swXSxcbiAgICB9KVxuICAgIGlmIChvaykge1xuICAgICAgc2V0Tm90ZVRpdGxlKCcnKVxuICAgICAgc2V0Tm90ZUNvbnRlbnQoJycpXG4gICAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlbW92ZU5vdGUgPSBhc3luYyAoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL2RlbGV0ZScsIHsgaWQgfSlcbiAgICBpZiAoZWRpdGluZ05vdGUgIT09IG51bGwgJiYgZWRpdGluZ05vdGUuaWQgPT09IGlkKSBzZXRFZGl0aW5nTm90ZShudWxsKVxuICAgIGF3YWl0IGxvYWROb3RlcygpXG4gIH1cblxuICBjb25zdCBzYXZlTm90ZUVkaXQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKGVkaXRpbmdOb3RlID09PSBudWxsKSByZXR1cm5cbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy91cGRhdGUnLCB7IGlkOiBlZGl0aW5nTm90ZS5pZCwgdGl0bGU6IGVkaXRpbmdOb3RlLnRpdGxlLCBjb250ZW50OiBlZGl0aW5nTm90ZS5jb250ZW50IH0pXG4gICAgc2V0RWRpdGluZ05vdGUobnVsbClcbiAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICB9XG5cbiAgLyoqIEFJIFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEM1x1RkYxQVx1NjI4QVx1NURGMlx1NjcwOVx1N0IxNFx1OEJCMCArIFx1OTg3OVx1NzZFRVx1Njg2M1x1Njg0OFx1NjNEMFx1NzBCQ1x1NjIxMFx1NEUwMFx1Njc2MVx1NjAzQlx1N0VEM1x1N0IxNFx1OEJCMFx1MzAwMiAqL1xuICBjb25zdCBhaVN1bW1hcml6ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRBaVN1bW1hcml6aW5nKHRydWUpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzL2FpLXN1bW1hcnknLCB7fSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGF3YWl0IGxvYWROb3RlcygpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKSlcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0QWlTdW1tYXJpemluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICAvKiogXHU5ODc1XHU5NzYyXHU0RTAwXHU5NTJFXHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHVGRjFBXHU1RUZBXHU1M0Q4XHU2NkY0IFx1MjE5MiBMTE0gXHU3NTFGXHU2MjEwXHU4QkExXHU1MjEyIFx1MjE5MiBcdTU0MEVcdTUzRjBcdTVCNTBcdTRFRTNcdTc0MDZcdTkwMTBcdTZCNjVcdTYyNjdcdTg4NENcdTMwMDIgKi9cbiAgY29uc3Qgc3RhcnRSdW4gPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKGV4ZWNUaXRsZS50cmltKCkgPT09ICcnIHx8IGV4ZWNEZXNjLnRyaW0oKSA9PT0gJycpIHJldHVyblxuICAgIHNldEJ1c3koJ3N0YXJ0UnVuJylcbiAgICBzZXRBY3Rpb25SZXN1bHQobnVsbClcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcnVucy9zdGFydCcsIHsgdGl0bGU6IGV4ZWNUaXRsZS50cmltKCksIGRlc2NyaXB0aW9uOiBleGVjRGVzYy50cmltKCkgfSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldEFjdGlvblJlc3VsdCgnXHU1REYyXHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHVGRjFBJyArIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpKVxuICAgICAgc2V0RXhlY1RpdGxlKCcnKVxuICAgICAgc2V0RXhlY0Rlc2MoJycpXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSkpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJ1c3kobnVsbClcbiAgICB9XG4gIH1cblxuICAvLyBcdTRGMUFcdThCRERcdTYyNTNcdTVGMDAvXHU1MjA3XHU2MzYyXHU2NUY2XHU1Qjk4XHU2NUI5XHU0RjFBIGNsb3NlRGV0YWlscyBcdTY1MzZcdThENzdcdThGNjhcdTkwNTNcdUZGMUJcdTc3MEJcdTk1RThcdTcyRDdcdTZCQ0YgNTAwbXMgXHU2OEMwXHU2N0U1XHVGRjBDXG4gIC8vIFx1NTNFQVx1ODk4MVx1NUY1M1x1NTI0RFx1NjcwOVx1NEYxQVx1OEJERFx1ODAwQ1x1NURFNVx1NEY1Q1x1NTNGMFx1NTIxN1x1NUJCRCA8IDUwcHggXHU1QzMxXHU5MUNEXHU2NUIwXHU2NDkxXHU1RjAwXHVGRjA4XHU3ODZFXHU1QjlBXHU2MDI3XHVGRjBDXHU0RTBEXHU0RjlEXHU4RDU2IGVmZmVjdCBcdTY1RjZcdTVFOEZcdUZGMDlcdTMwMDJcbiAgLy8gXHU1NDBDXHU0RTAwXHU2MkNEXHU3RUY0XHU2MzAxXHU3RURGXHU4QkExXHU4ODRDXHU5NEIzXHU1MjM2XHVGRjFBXHU0RjFBXHU4QkREXHU1MjA3XHU2MzYyXHU0RjFBXHU2MzYyXHU2Mzg5XHU3RURGXHU4QkExXHU4ODRDIERPTVx1RkYwQ1x1NjgzN1x1NUYwRlx1ODg2OFx1N0YzQVx1NTkzMVx1NjVGNlx1NjMwOVx1NUY1M1x1NTI0RFxuICAvLyBcdTY3ODRcdTVFRkFcdTU0QzhcdTVFMENcdTkxQ0RcdTZDRThcdTUxNjVcdUZGMDhcdTVFNDJcdTdCNDlcdUZGMENcdTVERjJcdTVCNThcdTU3MjhcdTUyMTlcdThERjNcdThGQzdcdUZGMDlcdTMwMDJcbiAgY29uc3QgbGF5b3V0RmFjZSA9IChwcm9wcyBhcyB1bmtub3duIGFzIHsgbGF5b3V0PzogeyBvcGVuRGV0YWlscz86ICgpID0+IHZvaWQgfSB9KS5sYXlvdXRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBhcHBseVN0YXRzTGluZUNsYW1wKClcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGMtc3RhdHMtY2xhbXAnKSA9PT0gbnVsbCkgYXBwbHlTdGF0c0xpbmVDbGFtcCgpXG4gICAgICBjb25zdCBjaGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImNlbnRlckNvbFwiXScpXG4gICAgICBjb25zdCB3aWR0aCA9IGNoYXQgPyBNYXRoLnJvdW5kKGNoYXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpIDogLTFcbiAgICAgIGlmICh3aWR0aCAhPT0gLTEgJiYgd2lkdGggPCA1MCkgbGF5b3V0RmFjZT8ub3BlbkRldGFpbHM/LigpXG4gICAgfSwgNTAwKVxuICAgIHJldHVybiAoKSA9PiB7IGNsZWFySW50ZXJ2YWwodGltZXIpIH1cbiAgfSwgW3Byb3BzLnNlc3Npb25JZCwgbGF5b3V0RmFjZV0pXG5cbiAgLyoqIFx1NEVFNSBpbXBvcnRhbnQgXHU1MTg1XHU4MDU0XHU2ODM3XHU1RjBGXHU3NkY0XHU2M0E1XHU1MTk5XHU1Qjk4XHU2NUI5XHU3RjUxXHU2ODNDXHU2QTIxXHU2NzdGXHVGRjA4XHU2NzAwXHU5QUQ4XHU0RjE4XHU1MTQ4XHU3RUE3XHVGRjBDXHU0RUZCXHU0RjU1XHU5MUNEXHU2RTMyXHU2N0QzXHU0RTBEXHU0RjFBXHU4OTg2XHU3NkQ2XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IGZyYW1lVGVtcGxhdGVTZXQgPSAoY2hhdFB4OiBudW1iZXIpOiB2b2lkID0+IHtcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cInNpZGViYXJDb2xcIl0nKVxuICAgIGNvbnN0IHNpZGViYXJXID0gc2lkZWJhciA/IE1hdGgubWF4KDU2LCBNYXRoLnJvdW5kKHNpZGViYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpKSA6IDI4MFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0nKVxuICAgICAgPy5zdHlsZS5zZXRQcm9wZXJ0eSgnZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zJywgc2lkZWJhclcgKyAncHggbWlubWF4KDAsIDFmcikgJyArIGNoYXRQeCArICdweCcsICdpbXBvcnRhbnQnKVxuICB9XG5cbiAgLy8gXHU4MDRBXHU1OTI5XHU1MjE3XHU1QkJEXHU4QkIwXHU1RkM2XHVGRjA4XHU1Qjk4XHU2NUI5IGxheW91dCBzdG9yZSBcdTc3QUNcdTYwMDFcdUZGMDlcdUZGMUFcdTYzMDJcdThGN0RcdTYwNjJcdTU5MEQgKyBcdTYyRDZcdTYyRkRcdTc2RjRcdTUxOTlcdTUxODVcdTgwNTRcdTZBMjFcdTY3N0ZcdTMwMDJcbiAgLy8gXHU1RkM1XHU5ODdCXHU1MTk5IGltcG9ydGFudFx1MjAxNFx1MjAxNExBWU9VVF9TVFlMRSBcdTc2ODRcdTZBMjFcdTY3N0ZcdTg5QzRcdTUyMTlcdTRFNUZcdTY2MkYgaW1wb3J0YW50XHVGRjBDXHU5NzVFIGltcG9ydGFudFxuICAvLyBcdTUxODVcdTgwNTRcdTRGMUFcdTg4QUJcdTVCODNcdTUzOEJcdTUyMzZcdUZGMDhcdThGRDlcdTVDMzFcdTY2MkZcdTZCNjRcdTUyNERcIlx1NjJENlx1NjJGRFx1NzUxRlx1NjU0OFx1MzAwMVx1NTIzN1x1NjVCMFx1NTQwRVx1OEJCMFx1NUZDNlx1NEUyMlx1NTkzMVwiXHU3Njg0XHU1MzlGXHU1NkUwXHVGRjA5XHUzMDAyXG4gIC8vIFx1NUI5OFx1NjVCOSBSZWFjdCBcdTkxQ0RcdTZFMzJcdTY3RDNcdTRGMUFcdTY1MzlcdTUxOTlcdTUxODVcdTgwNTRcdTZBMjFcdTY3N0ZcdUZGMENNdXRhdGlvbk9ic2VydmVyIFx1NjMwOVx1NUY1M1x1NTI0RFx1NTAzQ1x1NUI4OFx1NTM2Qlx1OTFDRFx1NTE5OVxuICAvLyBcdUZGMDhcdTUwM0NcdTc2RjhcdTU0MENcdTRFMERcdTRGMUFcdTg5RTZcdTUzRDFcdTY1QjBcdTc2ODQgbXV0YXRpb25cdUZGMENcdTY1RTBcdTU2REVcdTczQUZcdUZGMDlcdTMwMDJcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBzYXZlZCA9IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGMuY2hhdFdpZHRoJykgPz8gJycpXG4gICAgY29uc3QgYXBwbHkgPSAoKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJmcmFtZVwiXVtzdHlsZSo9XCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0nKSBhcyBIVE1MRWxlbWVudCB8IG51bGxcbiAgICAgIC8vIFx1NEVDNVx1NUY1M1x1NTE4NVx1ODA1NFx1NkEyMVx1Njc3Rlx1NEUwRFx1NjYyRlx1NjIxMVx1NEVFQ1x1NzY4NCBpbXBvcnRhbnQgXHU1OEYwXHU2NjBFXHU2NUY2XHU1MTk5XHU1MTY1XHVGRjFBXHU1Qjk4XHU2NUI5IFJlYWN0IFx1OTFDRFx1NkUzMlx1NjdEM1x1NEYxQVx1NjI4QVxuICAgICAgLy8gXHU1MTg1XHU4MDU0XHU2NTM5XHU1NkRFXHU5NzVFIGltcG9ydGFudFx1RkYwOFx1NkI2NFx1NjVGNlx1NjgzN1x1NUYwRlx1ODg2OFx1ODlDNFx1NTIxOVx1NjNBNVx1N0JBMVx1MzAwMVx1ODA0QVx1NTkyOVx1NUJCRFx1NTZERVx1ODQzRCAzNjBcdUZGMDlcdUZGMENcdTg5QzJcdTVCREZcdTU2NjhcbiAgICAgIC8vIFx1OTY4Rlx1NTM3M1x1OTFDRFx1NTE5OVx1NTkzQVx1NTZERVx1RkYxQlx1NjIxMVx1NEVFQ1x1ODFFQVx1NURGMVx1NzY4NFx1NTE5OVx1NTE2NVx1NEZERFx1NjMwMSBpbXBvcnRhbnRcdUZGMENcdTRFMERcdTUxOERcdTg5RTZcdTUzRDFcdTRFMEJcdTRFMDBcdThGNkVcdTMwMDJcbiAgICAgIGlmIChmcmFtZSA9PT0gbnVsbCB8fCBmcmFtZS5zdHlsZS5nZXRQcm9wZXJ0eVByaW9yaXR5KCdncmlkLXRlbXBsYXRlLWNvbHVtbnMnKSA9PT0gJ2ltcG9ydGFudCcpIHJldHVyblxuICAgICAgY29uc3QgY2hhdFcgPSBOdW1iZXIuaXNGaW5pdGUoc2F2ZWQpICYmIHNhdmVkID49IDI4MCA/IHNhdmVkIDogMzYwXG4gICAgICBmcmFtZVRlbXBsYXRlU2V0KGNoYXRXKVxuICAgIH1cbiAgICBhcHBseSgpXG4gICAgY29uc3QgZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdJylcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHsgYXBwbHkoKSB9KVxuICAgIGlmIChmcmFtZSAhPT0gbnVsbCkgb2JzZXJ2ZXIub2JzZXJ2ZShmcmFtZSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFsnc3R5bGUnXSB9KVxuICAgIHJldHVybiAoKSA9PiB7IG9ic2VydmVyLmRpc2Nvbm5lY3QoKSB9XG4gIH0sIFtdKVxuXG4gIC8qKiBcdTUyMDZcdTk2OTRcdTY3NjFcdTYyRDZcdTYyRkRcdUZGMUFcdThDMDNcdTY1NzRcdTgwNEFcdTU5MjlcdTUyMTdcdTVCQkRcdUZGMDhcdTVERTVcdTRGNUNcdTUzRjBcdTU0MzhcdTY1MzZcdTUyNjlcdTRGNTlcdTdBN0FcdTk1RjRcdUZGMDlcdUZGMENcdTUxOTlcdTUxNjUgbG9jYWxTdG9yYWdlIFx1OEJCMFx1NUZDNlx1MzAwMiAqL1xuICBjb25zdCBvbkRpdmlkZXJEb3duID0gKGU6IFJlYWN0LlBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IG9uTW92ZSA9IChldjogUG9pbnRlckV2ZW50KTogdm9pZCA9PiB7XG4gICAgICBjb25zdCB3aWR0aCA9IE1hdGgubWluKDkwMCwgTWF0aC5tYXgoMjgwLCB3aW5kb3cuaW5uZXJXaWR0aCAtIGV2LmNsaWVudFgpKVxuICAgICAgZnJhbWVUZW1wbGF0ZVNldCh3aWR0aClcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYy5jaGF0V2lkdGgnLCBTdHJpbmcod2lkdGgpKVxuICAgIH1cbiAgICBjb25zdCBvblVwID0gKCk6IHZvaWQgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgb25Nb3ZlKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApXG4gICAgfVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcClcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGRpc3Bvc2VkID0gZmFsc2VcbiAgICBjb25zdCBsb2FkID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvc3RhdGUnLCB7IGhlYWRlcnM6IHsgYWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicgfSB9KVxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YClcbiAgICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgICBpZiAoIWRpc3Bvc2VkKSB7XG4gICAgICAgICAgc2V0U3RhdGUoZGF0YSBhcyBXb3Jrc3BhY2VTdGF0ZSlcbiAgICAgICAgICBzZXRMb2FkRXJyb3IobnVsbClcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgICAgaWYgKCFkaXNwb3NlZCkgc2V0TG9hZEVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSlcbiAgICAgIH1cbiAgICB9XG4gICAgdm9pZCBsb2FkKClcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHsgdm9pZCBsb2FkKCkgfSwgNDAwMClcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZGlzcG9zZWQgPSB0cnVlXG4gICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgIH1cbiAgfSwgW10pXG5cbiAgLy8gXHU4RkRCXHU1MTY1XHU2M0QwXHU0RUE0L1x1N0IxNFx1OEJCMFx1OTg3NVx1N0I3RVx1NjVGNlx1NjMwOVx1OTcwMFx1NjJDOVx1NTNENlx1RkYwOFx1NjNEMFx1NEVBNFx1NTIxN1x1ODg2OFx1NEY5RFx1OEQ1Nlx1NEYxQVx1OEJERFx1NURFNVx1NEY1Q1x1NTMzQVx1RkYwQ1x1OEY2RVx1OEJFMlx1NjVFMFx1NjEwRlx1NEU0OVx1RkYwOVx1MzAwMlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0YWIgPT09ICdjb21taXRzJykgdm9pZCBsb2FkQ29tbWl0cygpXG4gICAgaWYgKHRhYiA9PT0gJ25vdGVzJykgdm9pZCBsb2FkTm90ZXMoKVxuICAgIGlmICh0YWIgPT09ICdzZXR0aW5ncycgJiYgbW9kZWxUaWVycyA9PT0gbnVsbCkgdm9pZCBsb2FkTW9kZWxDb25maWcoKVxuICB9LCBbdGFiLCBwcm9wcy5zZXNzaW9uSWRdKVxuXG4gIGNvbnN0IGxvYWRNb2RlbENvbmZpZyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3Byb2plY3QtY29udHJvbC9hcGkvbW9kZWwtY29uZmlnJylcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHJldHVyblxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgc2V0TW9kZWxUaWVycygoZGF0YSBhcyB7IHRpZXJzOiBSZWNvcmQ8c3RyaW5nLCB7IHByb3ZpZGVyOiBzdHJpbmc7IG1vZGVsOiBzdHJpbmcgfT4gfSkudGllcnMgPz8ge30pXG4gICAgICBzZXRNb2RlbE9wdGlvbnMoKGRhdGEgYXMgeyBvcHRpb25zOiBBcnJheTx7IHByb3ZpZGVyOiBzdHJpbmc7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZyB9PiB9KS5vcHRpb25zID8/IFtdKVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gXHU2QTIxXHU1NzhCXHU5MTREXHU3RjZFXHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1XHU0RTBEXHU2MjUzXHU2NUFEXHU5ODc1XHU5NzYyXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc2F2ZU1vZGVsQ29uZmlnID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChtb2RlbFRpZXJzID09PSBudWxsKSByZXR1cm5cbiAgICBzZXRNb2RlbFNhdmluZyh0cnVlKVxuICAgIHNldE1vZGVsU2F2ZWQoZmFsc2UpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21vZGVsLWNvbmZpZycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHRpZXJzOiBtb2RlbFRpZXJzIH0pLFxuICAgICAgfSlcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICBzZXRNb2RlbFNhdmVkKHRydWUpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBzZXRNb2RlbFNhdmVkKGZhbHNlKSB9LCAyNTAwKVxuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRNb2RlbFNhdmluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCByZWZyZXNoU3RhdGUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgcmVmcmVzaGVkID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3N0YXRlJywgeyBoZWFkZXJzOiB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0gfSlcbiAgICBpZiAocmVmcmVzaGVkLm9rKSBzZXRTdGF0ZShhd2FpdCByZWZyZXNoZWQuanNvbigpIGFzIFdvcmtzcGFjZVN0YXRlKVxuICB9XG5cbiAgLyoqIFx1N0VERlx1NEUwMFx1NTJBOFx1NEY1Q1x1NjI2N1x1ODg0Q1x1NTY2OFx1RkYxQVBPU1QgXHU1QkJGXHU0RTNCIEFQSVx1RkYwOFx1NjQzQVx1NUUyNlx1NEYxQVx1OEJERCBpZCBcdTRGOUJcdTY3MERcdTUyQTFcdTdBRUZcdTVCOUFcdTRGNERcdTk4NzlcdTc2RUVcdTVERTVcdTRGNUNcdTUzM0FcdUZGMDlcdUZGMENcdThGOTNcdTUxRkFcdThGREJcdTdFRDNcdTY3OUNcdTk3NjJcdTY3N0ZcdUZGMENcdTVCOENcdTYyMTBcdTU0MEVcdTUyMzdcdTY1QjBcdTcyQjZcdTYwMDFcdTMwMDIgKi9cbiAgY29uc3QgcnVuQWN0aW9uID0gYXN5bmMgKG5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldEJ1c3kobmFtZSlcbiAgICBzZXRBY3Rpb25SZXN1bHQobnVsbClcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdChwYXRoLCBib2R5KVxuICAgICAgaWYgKCFvaykge1xuICAgICAgICBzZXRBY3Rpb25SZXN1bHQoYFx1MjcxNyAke1N0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpfWApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0QWN0aW9uUmVzdWx0KGZvcm1hdEFjdGlvblJlc3VsdChkYXRhKSlcbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldEFjdGlvblJlc3VsdChgXHUyNzE3ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWApXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJ1c3kobnVsbClcbiAgICB9XG4gIH1cblxuICBjb25zdCBydW5Cb290c3RyYXAgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0Qm9vdHN0cmFwcGluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ib290c3RyYXAnLCB7fSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0TG9hZEVycm9yKFN0cmluZyhkYXRhWydlcnJvciddID8/ICdlcnJvcicpKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGF3YWl0IHJlZnJlc2hTdGF0ZSgpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldExvYWRFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEJvb3RzdHJhcHBpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29uZmlybU1lbW9yeSA9IGFzeW5jIChtZW1vcnlJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBvayB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5L2NvbmZpcm0nLCB7IG1lbW9yeUlkIH0pXG4gICAgaWYgKG9rKSB7XG4gICAgICBzZXRTdGF0ZSgocHJldmlvdXMpID0+IHByZXZpb3VzID09PSBudWxsID8gcHJldmlvdXMgOiB7XG4gICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICBtZW1vcmllczogcHJldmlvdXMubWVtb3JpZXM/Lm1hcCgobWVtb3J5KSA9PiBtZW1vcnkuaWQgPT09IG1lbW9yeUlkID8geyAuLi5tZW1vcnksIGlzSHVtYW5Db25maXJtZWQ6IHRydWUsIHRydXRoTGV2ZWw6ICdmYWN0JyB9IDogbWVtb3J5KSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcHJvamVjdCA9IHN0YXRlPy5wcm9qZWN0ID8/IG51bGxcbiAgY29uc3QgYm9vdHN0cmFwID0gc3RhdGU/LmJvb3RzdHJhcCA/PyBudWxsXG4gIGNvbnN0IGNoYW5nZXMgPSBzdGF0ZT8uY2hhbmdlcyA/PyBbXVxuICBjb25zdCBydW5zID0gc3RhdGU/LnJ1bnMgPz8gW11cbiAgY29uc3QgbWVtb3JpZXMgPSBzdGF0ZT8ubWVtb3JpZXMgPz8gW11cbiAgY29uc3QgaXNzdWVzID0gc3RhdGU/Lmlzc3VlcyA/PyBbXVxuICBjb25zdCB2ZXJpZmljYXRpb25zID0gc3RhdGU/LnZlcmlmaWNhdGlvbnMgPz8gW11cbiAgY29uc3QgY29uZmlybWVkID0gc3RhdGU/LmNvbmZpcm1lZCA/PyBbXVxuICBjb25zdCBjb25jZXB0cyA9IHN0YXRlPy5jb25jZXB0cyA/PyBbXVxuXG4gIGNvbnN0IHRhYnM6IEFycmF5PHsga2V5OiBUYWJLZXk7IGxhYmVsOiBzdHJpbmcgfT4gPSBbXG4gICAgeyBrZXk6ICdjb21taXRzJywgbGFiZWw6IHQoJ3RhYi5jb21taXRzJykgfSxcbiAgICB7IGtleTogJ292ZXJ2aWV3JywgbGFiZWw6IHQoJ3RhYi5vdmVydmlldycpIH0sXG4gICAgeyBrZXk6ICdleGVjdXRpb24nLCBsYWJlbDogdCgndGFiLmV4ZWN1dGlvbicpIH0sXG4gICAgeyBrZXk6ICdub3RlcycsIGxhYmVsOiB0KCd0YWIubm90ZXMnKSB9LFxuICAgIHsga2V5OiAnc2V0dGluZ3MnLCBsYWJlbDogdCgndGFiLnNldHRpbmdzJykgfSxcbiAgXVxuXG4gIC8qKiBcdTY0Q0RcdTRGNUNcdTdFRDNcdTY3OUNcdTk3NjJcdTY3N0ZcdUZGMDhcdTYwM0JcdTg5QzhcdTk4NzVcdTdCN0VcdTc2ODRcdTVGRUJcdTYzNzdcdTUyQThcdTRGNUNcdTUxNzFcdTc1MjhcdUZGMDlcdTMwMDIgKi9cbiAgY29uc3QgcmVzdWx0UGFuZWwgPSBhY3Rpb25SZXN1bHQgIT09IG51bGxcbiAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ2FyZCwgeyB0aXRsZTogdCgncmVzdWx0LnBhbmVsJykgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogc3R5bGVzLnJlc3VsdCB9LCBhY3Rpb25SZXN1bHQpKVxuICAgIDogbnVsbFxuICAvLyBcdTI1MDBcdTI1MDAgXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XHU5ODc1XHU3QjdFIFx1MjUwMFx1MjUwMFxuICAvLyBcdTk4NzZcdTkwRThcdUZGMUFcdTRFRDNcdTVFOTNcdTY4MEYgKyBcdTYzRDBcdTRFQTRcdTU5MUFcdTkwMDlcdTRFMEJcdTYyQzlcdUZGMDhcdTdFQTYgMS81IFx1OUFEOFx1NUVBNlx1RkYwOVx1RkYxQlx1NEUwQlx1NjVCOVx1Njc3Rlx1NTc1N1x1NTM2MFx1NTE2OFx1NUJCRFx1MzAwMlxuICBjb25zdCBhbGxUYXJnZXRzOiBBcnJheTx7IGtleTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBtZXRhOiBzdHJpbmc7IHNoYTogc3RyaW5nIH0+ID0gW11cbiAgaWYgKGNvbW1pdHNEYXRhICE9PSBudWxsKSB7XG4gICAgaWYgKCFjb21taXRzRGF0YS53b3JraW5nLmlzQ2xlYW4pIHtcbiAgICAgIGFsbFRhcmdldHMucHVzaCh7XG4gICAgICAgIGtleTogJ3dvcmtpbmcnLFxuICAgICAgICBsYWJlbDogYFx1MjVDRiAke3QoJ3JlcG8ud29ya2luZycpfVx1RkYwOCR7Y29tbWl0c0RhdGEud29ya2luZy5maWxlQ291bnR9XHVGRjA5YCxcbiAgICAgICAgbWV0YTogY29tbWl0c0RhdGEud29ya2luZy5maWxlcy5zbGljZSgwLCAzKS5tYXAoKGZpbGUpID0+IGZpbGUucGF0aC5zcGxpdCgnLycpLnBvcCgpKS5qb2luKCcsICcpLFxuICAgICAgICBzaGE6ICd3b3JraW5nJyxcbiAgICAgIH0pXG4gICAgfVxuICAgIGZvciAoY29uc3QgY29tbWl0IG9mIGNvbW1pdHNEYXRhLmNvbW1pdHMpIHtcbiAgICAgIGNvbnN0IGFkZHMgPSBjb21taXQuZmlsZXMucmVkdWNlKChzdW0sIGZpbGUpID0+IHN1bSArIGZpbGUuYWRkcywgMClcbiAgICAgIGNvbnN0IGRlbHMgPSBjb21taXQuZmlsZXMucmVkdWNlKChzdW0sIGZpbGUpID0+IHN1bSArIGZpbGUuZGVscywgMClcbiAgICAgIGFsbFRhcmdldHMucHVzaCh7XG4gICAgICAgIGtleTogY29tbWl0LnNoYSxcbiAgICAgICAgbGFiZWw6IGNvbW1pdC5zdWJqZWN0LFxuICAgICAgICBtZXRhOiBgJHtjb21taXQuc2hvcnRIYXNofSBcdTAwQjcgJHtjb21taXQuYXV0aG9yfSBcdTAwQjcgJHtuZXcgRGF0ZShjb21taXQuZGF0ZSkudG9Mb2NhbGVTdHJpbmcoKX0gXHUwMEI3ICske2FkZHN9Ly0ke2RlbHN9YCxcbiAgICAgICAgc2hhOiBjb21taXQuc2hhLFxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgY29uc3Qgc2hvcnRMYWJlbCA9IChzaGE6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgaWYgKHNoYSA9PT0gJ3dvcmtpbmcnKSByZXR1cm4gdCgncmVwby53b3JraW5nJylcbiAgICBjb25zdCB0YXJnZXQgPSBhbGxUYXJnZXRzLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5zaGEgPT09IHNoYSlcbiAgICByZXR1cm4gYCR7KHRhcmdldD8ubWV0YS5zcGxpdCgnIFx1MDBCNyAnKVswXSkgPz8gc2hhLnNsaWNlKDAsIDcpfSAke3RhcmdldD8ubGFiZWwgPz8gJyd9YC50cmltKClcbiAgfVxuICBjb25zdCBmaWx0ZXJlZFRhcmdldHMgPSBwaWNrZXJGaWx0ZXIudHJpbSgpID09PSAnJ1xuICAgID8gYWxsVGFyZ2V0c1xuICAgIDogYWxsVGFyZ2V0cy5maWx0ZXIoKGVudHJ5KSA9PiAoZW50cnkubGFiZWwgKyBlbnRyeS5tZXRhKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHBpY2tlckZpbHRlci50cmltKCkudG9Mb3dlckNhc2UoKSkpXG5cbiAgY29uc3QgaW1wYWN0Umlza0NvbG9yID0gaW1wYWN0ID09PSBudWxsID8gJyM4YjhiOGInIDogKFJJU0tfQ09MT1JbaW1wYWN0LnJpc2tMZXZlbF0gPz8gJyM4YjhiOGInKVxuXG4gIGNvbnN0IGNvbW1pdHNUYWIgPSAoXG4gICAgPD5cbiAgICAgIHsvKiBcdTRFRDNcdTVFOTNcdTY4MEYgKi99XG4gICAgICA8Q2FyZD5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyMyNTYzZWInKX0+e2NvbW1pdHNEYXRhPy5icmFuY2ggPz8gJ1x1MjAxNCd9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcgfX0+e2NvbW1pdHNEYXRhPy5yb290UGF0aCA/PyBwcm9qZWN0Py5yb290UGF0aCA/PyAnXHUyMDE0J308L3NwYW4+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkQ29tbWl0cygpIH19Pnt0KCdhY3Rpb24ucmVmcmVzaCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgIT09IG51bGx9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdzY2FuSGlzdG9yeScsICcvcHJvamVjdC1jb250cm9sL2FwaS9ib290c3RyYXAnLCB7IGluY2x1ZGVIaXN0b3J5OiB0cnVlLCBzdW1tYXJpemU6IHRydWUsIG1heENvbW1pdHM6IDMwIH0pIH19XG4gICAgICAgICAgPntidXN5ID09PSAnc2Nhbkhpc3RvcnknID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ3JlcG8uc2Nhbkhpc3RvcnknKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NhcmQ+XG4gICAgICB7LyogXHU2M0QwXHU0RUE0XHU1OTFBXHU5MDA5XHU0RTBCXHU2MkM5XHVGRjA4XHU3RDI3XHU1MUQxXHVGRjFCXHU5MDA5XHU0RTJEXHU1MTg1XHU1QkI5XHU1QjhDXHU2NTc0XHU1QzU1XHU3OTNBXHVGRjBDXHU1MTQxXHU4QkI4XHU4MUVBXHU3MTM2XHU2MzYyXHU4ODRDXHVGRjA5ICovfVxuICAgICAgPENhcmQgdGl0bGU9e3QoJ3BpY2tlci50aXRsZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCB3aWR0aDogJzEwMCUnLCB0ZXh0QWxpZ246ICdsZWZ0JywgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsIHdoaXRlU3BhY2U6ICdub3JtYWwnIH19XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldFBpY2tlck9wZW4oIXBpY2tlck9wZW4pIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWluV2lkdGg6IDAgfX0+XG4gICAgICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgICAgPyB0KCdwaWNrZXIucGxhY2Vob2xkZXInKVxuICAgICAgICAgICAgICAgIDogYCR7dCgncGlja2VyLnNlbGVjdGVkJyl9ICR7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aH1cdUZGMUEke3NlbGVjdGVkVGFyZ2V0cy5tYXAoc2hvcnRMYWJlbCkuam9pbignXHVGRjFCJyl9YH1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1hcmdpbkxlZnQ6ICc4cHgnLCBmbGV4U2hyaW5rOiAwIH19Plx1MjVCRTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICB7cGlja2VyT3BlbiAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnZml4ZWQnLCBpbnNldDogMCwgekluZGV4OiAyOSB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldFBpY2tlck9wZW4oZmFsc2UpIH19IC8+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAnY2FsYygxMDAlICsgNHB4KScsIGxlZnQ6IDAsIHJpZ2h0OiAwLCB6SW5kZXg6IDMwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsIGJveFNoYWRvdzogJzAgOHB4IDI0cHggcmdiYSgwLDAsMCwwLjEyKScsIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnOHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJywgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuaW5wdXR9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0KCdwaWNrZXIuZmlsdGVyJyl9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwaWNrZXJGaWx0ZXJ9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRQaWNrZXJGaWx0ZXIoZS50YXJnZXQudmFsdWUpIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gb25DbGljaz17KCkgPT4geyBzZXRTZWxlY3RlZFRhcmdldHMoW10pIH19Pnt0KCdwaWNrZXIuY2xlYXInKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1heEhlaWdodDogNDIwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICAgIHthbGxUYXJnZXRzLm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGtleT17ZW50cnkua2V5fVxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnN3B4IDEycHgnLCBjdXJzb3I6ICdwb2ludGVyJywgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhlbnRyeS5zaGEpID8gJ3JnYmEoMzcsOTksMjM1LDAuMDcpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgdG9nZ2xlVGFyZ2V0KGVudHJ5LnNoYSkgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IHdpZHRoOiAnMTRweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJywgZm9udFdlaWdodDogNzAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyhlbnRyeS5zaGEpID8gJ1x1MjcxMycgOiAnJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWluV2lkdGg6IDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBmb250U2l6ZTogJzEycHgnLCBmb250V2VpZ2h0OiA2MDAsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT57ZW50cnkubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e2VudHJ5Lm1ldGF9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIHtmaWx0ZXJlZFRhcmdldHMubGVuZ3RoID09PSAwICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3BpY2tlci5ub01hdGNoJyl9PC9kaXY+fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luVG9wOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ3BpY2tlci5oaW50Jyl9PC9zcGFuPlxuICAgICAgICAgIHtkZXRhaWxMb2FkaW5nICYmIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNkY2RjYWEnKX0+e3QoJ2RldGFpbC5haUxvYWRpbmcnKX08L3NwYW4+fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FyZD5cblxuICAgICAge2NvbW1pdHNFcnJvciAhPT0gbnVsbCAmJiA8Q2FyZD48ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXBvLmxvYWRGYWlsZWQnKX06IHtjb21taXRzRXJyb3J9PC9kaXY+PC9DYXJkPn1cbiAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID09PSAwICYmIDxDYXJkPjxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2RldGFpbC5waWNrJyl9PC9kaXY+PC9DYXJkPn1cblxuICAgICAgey8qIFx1NkJDRlx1Njc2MVx1OTAwOVx1NEUyRFx1NjNEMFx1NEVBNFx1NzY4NCBBSSBcdTg5RTNcdThCRkIgKi99XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLm1hcCgodGFyZ2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGQgPSBkZXRhaWxzW3RhcmdldF1cbiAgICAgICAgY29uc3QgbGFiZWwgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/IHQoJ3JlcG8ud29ya2luZycpIDogKGQ/LmNvbW1pdD8ubWVzc2FnZSA/PyB0YXJnZXQuc2xpY2UoMCwgOCkpXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPENhcmQga2V5PXtgZC0ke3RhcmdldH1gfSB0aXRsZT17YFx1RDgzRFx1REQwRCAke2xhYmVsfSR7dGFyZ2V0ICE9PSAnd29ya2luZycgPyBgXHVGRjA4JHt0YXJnZXQuc2xpY2UoMCwgOCl9XHVGRjA5YCA6ICcnfWB9PlxuICAgICAgICAgICAge2QgIT09IHVuZGVmaW5lZCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpc0NhY2hlZCA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9Pnt0KCdjYWNoZS5oaXQnKX17ZC5hbmFseXNpc0dlbmVyYXRlZEF0ID8gJyBcdTAwQjcgJyArIG5ldyBEYXRlKGQuYW5hbHlzaXNHZW5lcmF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKSA6ICcnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkRGV0YWlsKHRhcmdldCwgdHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2QgPT09IHVuZGVmaW5lZCA/IChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZGV0YWlsLmFpTG9hZGluZycpfTwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7ZC5jb21taXQgIT09IG51bGwgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmNvbW1pdE1ldGF9PntkLmNvbW1pdC5hdXRob3J9IFx1MDBCNyB7bmV3IERhdGUoZC5jb21taXQuZGF0ZSkudG9Mb2NhbGVTdHJpbmcoKX0gXHUwMEI3IHtkLmZpbGVzLmxlbmd0aH0ge3QoJ2RldGFpbC5maWxlcycpfSBcdTAwQjcgK3tkLmluc2VydGlvbnN9Ly17ZC5kZWxldGlvbnN9PC9kaXY+fVxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLndoYXQgIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnOHB4JyB9fT57dCgnZGV0YWlsLndoYXQnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLndoYXR9PntkLmFuYWx5c2lzLndoYXR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLmxvZ2ljLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnNlY3Rpb25UaXRsZX0+e3QoJ2RldGFpbC5sb2dpYycpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5sb2dpYy5tYXAoKHN0ZXAsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3N0eWxlcy5sb2dpY1N0ZXB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLCBmb250V2VpZ2h0OiA2MDAgfX0+e2kgKyAxfS48L3NwYW4+e3N0ZXB9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5yaXNrcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnNnB4JyB9fT57dCgnZGV0YWlsLnJpc2snKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2QuYW5hbHlzaXMucmlza3MubWFwKChyaXNrLCBpKSA9PiA8ZGl2IGtleT17aX0gc3R5bGU9e3N0eWxlcy5yaXNrSXRlbX0+XHUyNkEwIHtyaXNrfTwvZGl2Pil9XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHsvKiBcdTY1ODdcdTRFRjZcdTZFMDVcdTUzNTUgKyBcdTkwMTBcdTY1ODdcdTRFRjZcdTlBRDhcdTRFQUVcdTVCRjlcdTZCRDQgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBtYXJnaW5Ub3A6ICcxMHB4JyB9fT57dCgnZGV0YWlsLmZpbGVzJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICB7ZC5maWxlcy5tYXAoKGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0YXJnZXR9fCR7ZmlsZS5wYXRofWBcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXRjaCA9IGZpbGVEaWZmc1trZXldXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2tleX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+e2ZpbGUucGF0aH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGNvbG9yOiAnIzJkYTQ0ZScsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19Pit7ZmlsZS5hZGRzfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgY29sb3I6ICcjY2YyMjJlJywgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+LXtmaWxlLmRlbHN9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkRmlsZURpZmYodGFyZ2V0LCBmaWxlLnBhdGgpIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGF0Y2ggPT09IHVuZGVmaW5lZCA/IHQoJ2RpZmYuc2hvdycpIDogdCgnZGlmZi5oaWRlJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7cGF0Y2ggIT09IHVuZGVmaW5lZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17YCR7a2V5fS1kaWZmYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY29sU3Bhbj17NH0gc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBwYWRkaW5nOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGlmZlZpZXcgcGF0Y2g9e3BhdGNofSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQ2FyZD5cbiAgICAgICAgKVxuICAgICAgfSl9XG5cbiAgICAgIHsvKiBcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdUZGMUFcdTYzMDlcdTk0QUUgKyBcdTk4Q0VcdTk2NjlcdTY3ODRcdTYyMTAgKyBcdTU5MjdcdTU2RkUgKyBcdTVGNzFcdTU0Q0RcdTcwQjlcdTY2MEVcdTdFQzYgKyBcdThCQjBcdTVGQzZcdTgwNTRcdTUyQTggKi99XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17dCgnZGV0YWlsLmltcGFjdCcpfT5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17aW1wYWN0TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJbXBhY3QoKSB9fT5cbiAgICAgICAgICAgIHtpbXBhY3RMb2FkaW5nID8gdCgnZGV0YWlsLmltcGFjdExvYWRpbmcnKSA6IHQoJ2RldGFpbC5pbXBhY3QnKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIGltcGFjdC5leHBsYW5hdGlvbnNDYWNoZWQgPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKCcjOGI4YjhiJyksIG1hcmdpbkxlZnQ6ICc4cHgnIH19PlxuICAgICAgICAgICAgICB7dCgnY2FjaGUuaGl0Jyl9e2ltcGFjdC5nZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShpbXBhY3QuZ2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ31cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtpbXBhY3QgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBtYXJnaW5MZWZ0OiAnOHB4JywgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IGRpc2FibGVkPXtpbXBhY3RMb2FkaW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZEltcGFjdCh0cnVlKSB9fT5cbiAgICAgICAgICAgICAge3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzEwcHgnLCBtYXJnaW46ICcxMHB4IDAgNHB4JywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuYmFkZ2UoaW1wYWN0Umlza0NvbG9yKSwgZm9udFNpemU6ICcxM3B4JywgcGFkZGluZzogJzNweCAxMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIHt0KCdpbXBhY3QucmlzaycpfToge2ltcGFjdC5yaXNrTGV2ZWx9XHVGRjA4e2ltcGFjdC5yaXNrU2NvcmV9XHVGRjA5XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIHtpbXBhY3Qua2V5Q2hhbmdlUG9pbnRzICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LmtleUNoYW5nZVBvaW50cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAnIzlhNjcwMCcgfX0+XHUyNkEwIHt0KCdpbXBhY3Qua2V5UG9pbnRzJyl9OiB7aW1wYWN0LmtleUNoYW5nZVBvaW50cy5tYXAoKGZpbGUpID0+IGZpbGUuc3BsaXQoJy8nKS5wb3AoKSkuam9pbignXHUzMDAxJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7aW1wYWN0LnJpc2tGYWN0b3JzICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LnJpc2tGYWN0b3JzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2VjdGlvblRpdGxlfT57dCgnaW1wYWN0LmZhY3RvcnMnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnMnB4JywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpbXBhY3Qucmlza0ZhY3RvcnMubWFwKChmYWN0b3IsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBmb250U2l6ZTogJzEycHgnLCBwYWRkaW5nOiAnM3B4IDhweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLCBib3JkZXJSYWRpdXM6ICc0cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2ZhY3Rvci50ZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBpbXBhY3RSaXNrQ29sb3IsIGZvbnRXZWlnaHQ6IDYwMCB9fT4re2ZhY3Rvci5wb2ludHN9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8SW1wYWN0R3JhcGggZGF0YT17aW1wYWN0fSB0PXt0fSAvPlxuICAgICAgICAgICAgICB7aW1wYWN0LmxldmVscy5sZW5ndGggPT09IDAgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnaW1wYWN0Lm5vbmUnKX08L2Rpdj59XG4gICAgICAgICAgICAgIHsvKiBcdTUxRkRcdTY1NzBcdTdFQTdcdTVGNzFcdTU0Q0RcdUZGMUFcdTY3MkNcdTZCMjFcdTRGRUVcdTY1MzlcdTRFODZcdTU0RUFcdTRFOUJcdTUxRkRcdTY1NzBcdTMwMDFcdTZDRTJcdTUzQ0FcdTRFODZcdThDMDFcdTc2ODRcdTU0RUFcdTRFOUJcdTUxRkRcdTY1NzBcdTMwMDFcdThDMDNcdTc1MjhcdTcwQjlcdTU3MjhcdTU0RUEgKi99XG4gICAgICAgICAgICAgIHtpbXBhY3QuZnVuY3Rpb25JbXBhY3QgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3QuZnVuY3Rpb25JbXBhY3QubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnMTJweCcgfX0+e3QoJ2ltcGFjdC5mdW5jdGlvbnMnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAge2ltcGFjdC5mdW5jdGlvbkltcGFjdC5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2VudHJ5LnN5bWJvbH0gc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJywgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzhweCAxMHB4JywgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNkOTc3MDYnKX0+e2VudHJ5LnN5bWJvbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5sYWJlbCwgbWFyZ2luTGVmdDogJzhweCcgfX0+e2VudHJ5LmRlZmluZWRJbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5yb2xlICE9PSB1bmRlZmluZWQgJiYgZW50cnkucm9sZSAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdpbmxpbmUnLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+e3QoJ2ltcGFjdC5mdW5jUm9sZScpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkucm9sZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNoYW5nZSAhPT0gdW5kZWZpbmVkICYmIGVudHJ5LmNoYW5nZSAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0IH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdpbmxpbmUnLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnLCBjb2xvcjogJyM5YTY3MDAnIH19Pnt0KCdpbXBhY3QuZnVuY0NoYW5nZScpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuaW1wYWN0ICE9PSB1bmRlZmluZWQgJiYgZW50cnkuaW1wYWN0ICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLndoYXQsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2lubGluZScsIG1hcmdpbklubGluZUVuZDogJzZweCcsIGNvbG9yOiAnI2NlOTE3OCcgfX0+e3QoJ2ltcGFjdC5mdW5jQ2FsbGVycycpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuaW1wYWN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkuY2FsbGVycy5tYXAoKGNhbGxlciwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgLi4uc3R5bGVzLmxvZ2ljU3RlcCwgbWFyZ2luVG9wOiAnM3B4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJyNkOTc3MDYnIH19Plx1MjFCMzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4Jywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjYWxsZXIuZmlsZX06e2NhbGxlci5saW5lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cdTIwMTQge2NhbGxlci5zbmlwcGV0LnNsaWNlKDAsIDgwKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHtpbXBhY3QuZnVuY3Rpb25JbXBhY3QgIT09IHVuZGVmaW5lZCAmJiBpbXBhY3QuZnVuY3Rpb25JbXBhY3QubGVuZ3RoID09PSAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdpbXBhY3QuZnVuY3Rpb25zTm9uZScpfTwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7aW1wYWN0Lm1lbW9yaWVzICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0Lm1lbW9yaWVzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMTBweCcsIHBhZGRpbmc6ICc4cHggMTBweCcsIGJvcmRlcjogJzFweCBkYXNoZWQgcmdiYSgzNyw5OSwyMzUsMC4zNSknLCBib3JkZXJSYWRpdXM6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScgfX0+e3QoJ2ltcGFjdC5tZW1vcnknKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4V3JhcDogJ3dyYXAnLCBnYXA6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICB7aW1wYWN0Lm1lbW9yaWVzLm1hcCgobWVtb3J5LCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4ga2V5PXtpfSBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9PnttZW1vcnkudGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cblxuICAgICAgey8qIFx1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNVx1RkYxQVx1N0VEM1x1OEJCQSArIFx1N0VEM1x1Njc4NFx1NTMxNlx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NSAqL31cbiAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgIDxDYXJkIHRpdGxlPXt0KCdkZXRhaWwub3B0aW1hbGl0eScpfT5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17cmV2aWV3TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSZXZpZXdzKCkgfX0+XG4gICAgICAgICAgICB7cmV2aWV3TG9hZGluZyA/IHQoJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZycpIDogdCgnZGV0YWlsLm9wdGltYWxpdHknKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLm1hcCgodGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByID0gcmV2aWV3c1t0YXJnZXRdXG4gICAgICAgICAgICBpZiAociA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbFxuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0YXJnZXQgPT09ICd3b3JraW5nJyA/IHQoJ3JlcG8ud29ya2luZycpIDogdGFyZ2V0LnNsaWNlKDAsIDgpXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17YHItJHt0YXJnZXR9YH0gc3R5bGU9e3sgbWFyZ2luVG9wOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgICAgICAgICAge3IuY2FjaGVkID09PSB0cnVlICYmIChcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57dCgnY2FjaGUuaGl0Jyl9e3IuZ2VuZXJhdGVkQXQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUoci5nZW5lcmF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKSA6ICcnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZFJldmlld3ModHJ1ZSkgfX0+e3QoJ2NhY2hlLnJlZ2VuZXJhdGUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7ci52ZXJkaWN0ICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBiYWNrZ3JvdW5kOiAncmdiYSgzNyw5OSwyMzUsMC4wNSknLCBib3JkZXI6ICcxcHggc29saWQgcmdiYSgzNyw5OSwyMzUsMC4yKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMTBweCcgfX0+e3IudmVyZGljdH08L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtyLmlzc3VlTGlzdCAhPT0gdW5kZWZpbmVkICYmIHIuaXNzdWVMaXN0Lmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dHI+e1sncmV2aWV3LmNvbC5zZXZlcml0eScsICdyZXZpZXcuY29sLmNhdGVnb3J5JywgJ3Jldmlldy5jb2wudGl0bGUnLCAncmV2aWV3LmNvbC5ldmlkZW5jZScsICdyZXZpZXcuY29sLmZpeCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICB7ci5pc3N1ZUxpc3QubWFwKChpc3N1ZSwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKGlzc3VlLnNldmVyaXR5ID09PSAnY3JpdGljYWwnID8gJyNmMTRjNGMnIDogaXNzdWUuc2V2ZXJpdHkgPT09ICdoaWdoJyA/ICcjY2U5MTc4JyA6IGlzc3VlLnNldmVyaXR5ID09PSAnbWVkaXVtJyA/ICcjZGNkY2FhJyA6ICcjNTY5Y2Q2Jyl9Pntpc3N1ZS5zZXZlcml0eX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntpc3N1ZS5jYXRlZ29yeX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2lzc3VlLnRpdGxlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19Pntpc3N1ZS5ldmlkZW5jZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2lzc3VlLmZpeH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3Jldmlldy5jbGVhbicpfTwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pfVxuICAgICAgICAgIHtyZXZpZXdMb2FkaW5nICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2RldGFpbC5vcHRpbWFsaXR5TG9hZGluZycpfTwvZGl2Pn1cbiAgICAgICAgICB7IXJldmlld0xvYWRpbmcgJiYgc2VsZWN0ZWRUYXJnZXRzLmV2ZXJ5KCh0YXJnZXQpID0+IHJldmlld3NbdGFyZ2V0XSA9PT0gdW5kZWZpbmVkKSAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXZpZXcuaGludCcpfTwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG4gICAgPC8+XG4gIClcblxuICAvLyBcdTI1MDBcdTI1MDAgXHU4QkJFXHU3RjZFXHU5ODc1XHU3QjdFIFx1MjUwMFx1MjUwMFxuICBjb25zdCBUSUVSX0xBQkVMUzogQXJyYXk8eyBrZXk6IHN0cmluZzsgemg6IHN0cmluZzsgZGVzYzogc3RyaW5nIH0+ID0gW1xuICAgIHsga2V5OiAnc3RhbmRhcmQnLCB6aDogJ1x1ODlFM1x1OEJGQiAvIFx1NTFGRFx1NjU3MFx1NUY3MVx1NTRDRFx1OEJGNFx1NjYwRScsIGRlc2M6ICdcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTc2ODQgQUkgXHU4OUUzXHU4QkZCXHUzMDAxXHU1RjcxXHU1NENEXHU1MjA2XHU2NzkwJyB9LFxuICAgIHsga2V5OiAncmVhc29uaW5nJywgemg6ICdcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTUgLyBcdTYyNjdcdTg4NENcdThCQTFcdTUyMTInLCBkZXNjOiAnXHU4QkM0XHU1QkExXHUzMDAxXHU4QkExXHU1MjEyXHU3NTFGXHU2MjEwXHUzMDAxQUkgXHU1QjY2XHU0RTYwXHU2MDNCXHU3RUQzJyB9LFxuICAgIHsga2V5OiAnZmFzdCcsIHpoOiAnXHU1Mzg2XHU1M0YyXHU4RjdCXHU2NzkwJywgZGVzYzogJ1x1NjI2Qlx1NjNDRlx1NTM4Nlx1NTNGMlx1NjVGNlx1NzY4NFx1OTAxMFx1NjNEMFx1NEVBNFx1NEUwMFx1NTNFNVx1OEJERCcgfSxcbiAgICB7IGtleTogJ3ZlcmlmaWVyJywgemg6ICdcdTlBOENcdTY1MzYnLCBkZXNjOiAnXHU2NTM5XHU1MkE4XHU5QThDXHU2NTM2XHU3Njg0IEFJIFx1NTkwRFx1NjgzOCcgfSxcbiAgXVxuXG4gIGNvbnN0IHNldHRpbmdzVGFiID0gKFxuICAgIDw+XG4gICAgICB7LyogXHU2QTIxXHU1NzhCXHU1MjA2XHU5MTREXHVGRjFBXHU1M0VGXHU4OUM2XHU1MzE2XHU1MjA3XHU2MzYyXHU1NDA0XHU0RUZCXHU1MkExXHU3NTI4XHU3Njg0XHU2QTIxXHU1NzhCXHVGRjBDXHU0RkREXHU1QjU4XHU1MzczXHU3NTFGXHU2NTQ4ICovfVxuICAgICAgPENhcmQgdGl0bGU9e3QoJ21vZGVsLnRpdGxlJyl9PlxuICAgICAgICB7bW9kZWxUaWVycyA9PT0gbnVsbCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdtb2RlbC5sb2FkaW5nJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIHtUSUVSX0xBQkVMUy5tYXAoKHRpZXIpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IG1vZGVsVGllcnNbdGllci5rZXldXG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3VycmVudCA/IGN1cnJlbnQucHJvdmlkZXIgKyAnLycgKyBjdXJyZW50Lm1vZGVsIDogJydcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17dGllci5rZXl9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnMTBweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc4cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWluV2lkdGg6IDE1MCwgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwIH19Pnt0aWVyLnpofTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCB3aWR0aDogMjQwIH19XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgdiA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHYgPT09ICcnKSB7IHNldE1vZGVsVGllcnMoeyAuLi5tb2RlbFRpZXJzLCBbdGllci5rZXldOiB7IHByb3ZpZGVyOiAnJywgbW9kZWw6ICcnIH0gfSk7IHJldHVybiB9XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3Byb3ZpZGVyLCAuLi5yZXN0XSA9IHYuc3BsaXQoJy8nKVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gcmVzdC5qb2luKCcvJylcbiAgICAgICAgICAgICAgICAgICAgICBzZXRNb2RlbFRpZXJzKHsgLi4ubW9kZWxUaWVycywgW3RpZXIua2V5XTogeyBwcm92aWRlciwgbW9kZWwgfSB9KVxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e3QoJ21vZGVsLmZvbGxvd0NoYXQnKX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAge21vZGVsT3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9IHZhbHVlPXtvcHRpb24ucHJvdmlkZXIgKyAnLycgKyBvcHRpb24uaWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAge29wdGlvbi5wcm92aWRlcn0gLyB7b3B0aW9uLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dGllci5kZXNjfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpblRvcDogJzZweCcgfX0+XG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXttb2RlbFNhdmluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIHNhdmVNb2RlbENvbmZpZygpIH19PlxuICAgICAgICAgICAgICAgIHttb2RlbFNhdmluZyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdtb2RlbC5zYXZlJyl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICB7bW9kZWxTYXZlZCAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNGVjOWIwJyl9Pnt0KCdtb2RlbC5zYXZlZCcpfTwvc3Bhbj59XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdtb2RlbC5oaW50Jyl9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8ZGl2IHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXRlcnRpYXJ5LCAjOWNhM2FmKScsIHBhZGRpbmc6ICc4cHggMCcgfX0+XG4gICAgICAgIGRzaC1wcm9qZWN0LWNvbnRyb2wgdntzdGF0ZT8ucGx1Z2luVmVyc2lvbiA/PyAnPyd9XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKVxuXG4gIGNvbnN0IG92ZXJ2aWV3VGFiID0gKFxuICAgIDw+XG4gICAgICA8Q2FyZD5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2Jvb3RzdHJhcHBpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5Cb290c3RyYXAoKSB9fT5cbiAgICAgICAgICAgIHtib290c3RyYXBwaW5nID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi5yZXNjYW4nKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbH0gb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignYW5hbHl6ZScsICcvcHJvamVjdC1jb250cm9sL2FwaS9hbmFseXplJywge30pIH19PlxuICAgICAgICAgICAge2J1c3kgPT09ICdhbmFseXplJyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24uYW5hbHl6ZScpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtidXN5ICE9PSBudWxsfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCd2ZXJpZnknLCAnL3Byb2plY3QtY29udHJvbC9hcGkvdmVyaWZ5Jywge30pIH19PlxuICAgICAgICAgICAge2J1c3kgPT09ICd2ZXJpZnknID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi52ZXJpZnknKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NhcmQ+XG4gICAgICB7cmVzdWx0UGFuZWx9XG4gICAgICB7cHJvamVjdCA9PT0gbnVsbCA/IChcbiAgICAgICAgPENhcmQ+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAnMTNweCcsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+e3QoJ3N0YXRlLm5vUHJvamVjdCcpfTwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3N0YXRlLm5vUHJvamVjdEhpbnQnKX08L2Rpdj5cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKSA6IChcbiAgICAgICAgPENhcmQgdGl0bGU9e2Ake3QoJ3N0YXRlLnByb2plY3QnKX1cdUZGMUEke3Byb2plY3QubmFtZX1gfT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9PlJvb3Q8L3NwYW4+e3Byb2plY3Qucm9vdFBhdGh9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtib290c3RyYXAgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLnRlY2hTdGFjaycpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHtib290c3RyYXAudGVjaFN0YWNrLm1hcCgodGVjaCkgPT4gPHNwYW4ga2V5PXt0ZWNofSBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNGVjOWIwJyl9Pnt0ZWNofTwvc3Bhbj4pfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS5zeW1ib2xzJyl9PC9zcGFuPntTdHJpbmcoYm9vdHN0cmFwLnN5bWJvbHNDb3VudCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS5tYW5pZmVzdHMnKX08L3NwYW4+e1N0cmluZyhib290c3RyYXAubWFuaWZlc3RGaWxlcy5sZW5ndGgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUuZXZpZGVuY2UnKX08L3NwYW4+e1N0cmluZyhzdGF0ZT8uZXZpZGVuY2VDb3VudCA/PyAwKX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Ub3A6ICc4cHgnIH19Pntib290c3RyYXAuc3VtbWFyeX08L2Rpdj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnY29uZmlybWVkLnRpdGxlJyl9PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgPHRleHRhcmVhIHJvd3M9ezJ9IHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHBsYWNlaG9sZGVyPXt0KCdjb25maXJtZWQudGV4dCcpfSB2YWx1ZT17Y29uZmlybWVkVGV4dH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENvbmZpcm1lZFRleHQoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdjb25maXJtZWQucGF0aHMnKX0gdmFsdWU9e2NvbmZpcm1lZFBhdGhzfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q29uZmlybWVkUGF0aHMoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5idXR0b259XG4gICAgICAgICAgICBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBjb25maXJtZWRUZXh0ID09PSAnJ31cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2FkZENvbmZpcm1lZCcsICcvcHJvamVjdC1jb250cm9sL2FwaS9jb25maXJtZWQnLCB7IHR5cGU6ICdjb25zdHJhaW50JywgdGV4dDogY29uZmlybWVkVGV4dCwgZm9yYmlkZGVuUGF0aHM6IGNvbmZpcm1lZFBhdGhzLnNwbGl0KCcsJykubWFwKChwYXRoKSA9PiBwYXRoLnRyaW0oKSkuZmlsdGVyKChwYXRoKSA9PiBwYXRoICE9PSAnJykgfSkudGhlbigoKSA9PiB7IHNldENvbmZpcm1lZFRleHQoJycpOyBzZXRDb25maXJtZWRQYXRocygnJykgfSkgfX1cbiAgICAgICAgICA+e2J1c3kgPT09ICdhZGRDb25maXJtZWQnID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2NvbmZpcm1lZC5hZGQnKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtjb25maXJtZWQubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2NvbmZpcm1lZC5ub25lJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7Y29uZmlybWVkLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e2l0ZW0uaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyNjNTg2YzAnKX0+e2l0ZW0udHlwZX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXRlbS50ZXh0fTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2l0ZW0uZm9yYmlkZGVuUGF0aHMuam9pbignLCAnKSB8fCAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbigncmVtb3ZlQ29uZmlybWVkJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbmZpcm1lZC9yZW1vdmUnLCB7IGlkOiBpdGVtLmlkIH0pIH19XG4gICAgICAgICAgICAgICAgICAgID5cdTI3MTU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnYWN0aW9uLmNyZWF0ZUNoYW5nZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnZm9ybS5jaGFuZ2VUaXRsZScpfSB2YWx1ZT17Y2hhbmdlVGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDaGFuZ2VUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8dGV4dGFyZWEgcm93cz17Mn0gc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0uY2hhbmdlRGVzYycpfSB2YWx1ZT17Y2hhbmdlRGVzY30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENoYW5nZURlc2MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5idXR0b259XG4gICAgICAgICAgICBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBjaGFuZ2VUaXRsZSA9PT0gJyd9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdjcmVhdGVDaGFuZ2UnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY2hhbmdlcycsIHsgdGl0bGU6IGNoYW5nZVRpdGxlLCBkZXNjcmlwdGlvbjogY2hhbmdlRGVzYyB9KS50aGVuKCgpID0+IHsgc2V0Q2hhbmdlVGl0bGUoJycpOyBzZXRDaGFuZ2VEZXNjKCcnKSB9KSB9fVxuICAgICAgICAgID57YnVzeSA9PT0gJ2NyZWF0ZUNoYW5nZScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLmNyZWF0ZUNoYW5nZScpfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2NoYW5nZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3N0YXRlLm5vQ2hhbmdlcycpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ2NoYW5nZXMuY29sLnRpdGxlJywgJ2NoYW5nZXMuY29sLnR5cGUnLCAnY2hhbmdlcy5jb2wuc3RhdHVzJywgJ2NoYW5nZXMuY29sLnVwZGF0ZWQnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge2NoYW5nZXMubWFwKChjaGFuZ2UpID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXtjaGFuZ2UuaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntjaGFuZ2UudGl0bGV9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Y2hhbmdlLnR5cGV9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKGNoYW5nZS5zdGF0dXMgPT09ICdjb21wbGV0ZWQnID8gJyM0ZWM5YjAnIDogJyM1NjljZDYnKX0+e2NoYW5nZS5zdGF0dXN9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2Zvcm1hdFRpbWUoY2hhbmdlLnVwZGF0ZWRBdCl9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKHsgdGl0bGU6ICdcdTUyMjBcdTk2NjRcdThGRDlcdTRFMkFcdTUzRDhcdTY2RjRcdTRFRkJcdTUyQTFcdUZGMUYnLCBtZXNzYWdlOiAnXHUzMDBDJyArIGNoYW5nZS50aXRsZSArICdcdTMwMERcdTUzQ0FcdTUxNzZcdTUxNjhcdTkwRThcdTYyNjdcdTg4NENcdThCQjBcdTVGNTVcdTMwMDFcdThCQTFcdTUyMTJcdTMwMDFcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTVcdTVDMDZcdTg4QUJcdTZDMzhcdTRFNDVcdTUyMjBcdTk2NjRcdTMwMDInLCBkYW5nZXI6IHRydWUsIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHJ1bkFjdGlvbignZGVsZXRlQ2hhbmdlJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NoYW5nZXMvZGVsZXRlJywgeyBpZDogY2hhbmdlLmlkIH0pIH0gfSkgfX0+XHUyNzE1PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgIDwvPlxuICApXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDM1x1OTg3NVx1N0I3RVx1RkYxQVx1OTg3NVx1OTc2Mlx1NzZGNFx1NjNBNVx1NTIxQlx1NUVGQVx1NUU3Nlx1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYwQ1x1ODA0QVx1NTkyOVx1NTNFQVx1NjYyRlx1NTNFNlx1NEUwMFx1NzlDRFx1NTE2NVx1NTNFMyBcdTI1MDBcdTI1MDBcbiAgY29uc3QgZXhlY3V0aW9uVGFiID0gKFxuICAgIDw+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnZXhlYy5jcmVhdGUnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybVRpdGxlJyl9IHZhbHVlPXtleGVjVGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFeGVjVGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezN9IHBsYWNlaG9sZGVyPXt0KCdleGVjLmZvcm1EZXNjJyl9IHZhbHVlPXtleGVjRGVzY30gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEV4ZWNEZXNjKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IGRpc2FibGVkPXtidXN5ICE9PSBudWxsIHx8IGV4ZWNUaXRsZS50cmltKCkgPT09ICcnIHx8IGV4ZWNEZXNjLnRyaW0oKSA9PT0gJyd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzdGFydFJ1bigpIH19PlxuICAgICAgICAgICAge2J1c3kgPT09ICdzdGFydFJ1bicgPyB0KCdleGVjLnN0YXJ0aW5nJykgOiB0KCdleGVjLnN0YXJ0Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdleGVjLmNyZWF0ZUhpbnQnKX08L2Rpdj5cbiAgICAgIDwvQ2FyZD5cbiAgICAgIHtyZXN1bHRQYW5lbH1cbiAgICAgIDxDYXJkPlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cbiAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnZXhlYy5hdHRlbXB0cycpfTwvc3Bhbj57U3RyaW5nKHN0YXRlPy5hdHRlbXB0c0NvdW50ID8/IDApfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtydW5zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdzdGF0ZS5ub1J1bnMnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57WydleGVjLmNvbC5jaGFuZ2UnLCAnZXhlYy5jb2wuc3RlcHMnLCAnZXhlYy5jb2wuc3RhdHVzJywgJ2V4ZWMuY29sLnN0YXJ0ZWQnLCAnZXhlYy5jb2wuY29zdCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7cnVucy5tYXAoKHJ1bikgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3J1bi5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+eyhjaGFuZ2VzLmZpbmQoKGNoYW5nZSkgPT4gY2hhbmdlLmlkID09PSBydW4uY2hhbmdlSWQpPy50aXRsZSkgPz8gcnVuLmNoYW5nZUlkfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3J1bi5zdGVwc1RvdGFsID8gKHJ1bi5zdGVwc0RvbmUgPz8gMCkgKyAnLycgKyBydW4uc3RlcHNUb3RhbCA6ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UocnVuLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgPyAnIzRlYzliMCcgOiBydW4uc3RhdHVzID09PSAnZmFpbGVkJyA/ICcjZjE0YzRjJyA6ICcjZGNkY2FhJyl9PntydW4uc3RhdHVzfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge3J1bi5jdXJyZW50U3RlcCAhPT0gbnVsbCAmJiBydW4uY3VycmVudFN0ZXAgIT09IHVuZGVmaW5lZCAmJiBydW4uc3RhdHVzID09PSAncnVubmluZycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1heFdpZHRoOiAxNjAsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT57cnVuLmN1cnJlbnRTdGVwfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Zm9ybWF0VGltZShydW4uc3RhcnRlZEF0KX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntydW4uY29zdFVzZCAhPT0gdW5kZWZpbmVkID8gJyQnICsgcnVuLmNvc3RVc2QudG9GaXhlZCg0KSA6ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgPC8+XG4gIClcblxuICAvLyBcdTI1MDBcdTI1MDAgXHU3QjE0XHU4QkIwXHU0RTBFXHU4QkIwXHU1RkM2XHU5ODc1XHU3QjdFIFx1MjUwMFx1MjUwMFxuICBjb25zdCBub3Rlc1RhYiA9IChcbiAgICA8PlxuICAgICAgey8qIFx1MjUwMFx1MjUwMCBcdTdCMTRcdThCQjBcdUZGMUFcdTUzNjFcdTcyNDdcdTVGMEZcdTk2MDVcdThCRkIgKyBcdTU5MUFcdTg4NENcdTdGMTZcdThGOTEgKyBcdTY0MUNcdTdEMjIgKyBBSSBcdTYwM0JcdTdFRDMgXHUyNTAwXHUyNTAwICovfVxuICAgICAgPENhcmQgdGl0bGU9e3QoJ25vdGVzLnRpdGxlJyl9PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCB3aWR0aDogMjIwIH19XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17dCgnbm90ZXMuc2VhcmNoJyl9XG4gICAgICAgICAgICB2YWx1ZT17bm90ZVNlYXJjaH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXROb3RlU2VhcmNoKGUudGFyZ2V0LnZhbHVlKSB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXthaVN1bW1hcml6aW5nfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgYWlTdW1tYXJpemUoKSB9fT5cbiAgICAgICAgICAgIHthaVN1bW1hcml6aW5nID8gdCgnbm90ZXMuYWlTdW1tYXJ5UnVuJykgOiAnXHUyNzI4ICcgKyB0KCdub3Rlcy5haVN1bW1hcnknKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLmZvcm1Sb3csIGJvcmRlcjogJzFweCBkYXNoZWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLCBib3JkZXJSYWRpdXM6ICc4cHgnLCBwYWRkaW5nOiAnMTBweCcgfX0+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdub3Rlcy5mb3JtVGl0bGUnKX0gdmFsdWU9e25vdGVUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9XG4gICAgICAgICAgICByb3dzPXs0fVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ25vdGVzLmNvbnRlbnRIaW50Jyl9XG4gICAgICAgICAgICB2YWx1ZT17bm90ZUNvbnRlbnR9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZUNvbnRlbnQoZS50YXJnZXQudmFsdWUpIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT5cbiAgICAgICAgICAgICAge3QoJ25vdGVzLmJvdW5kVG8nKX06IHtzZWxlY3RlZFRhcmdldHNbMF0gPT09ICd3b3JraW5nJyA/IHQoJ3JlcG8ud29ya2luZycpIDogc2VsZWN0ZWRUYXJnZXRzWzBdLnNsaWNlKDAsIDgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e25vdGVUaXRsZS50cmltKCkgPT09ICcnIHx8IG5vdGVDb250ZW50LnRyaW0oKSA9PT0gJyd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhZGROb3RlKCkgfX0+e3QoJ25vdGVzLmFkZCcpfTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgY29uc3Qga2V5d29yZCA9IG5vdGVTZWFyY2gudHJpbSgpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICBjb25zdCB2aXNpYmxlID0ga2V5d29yZCA9PT0gJydcbiAgICAgICAgICAgID8gbm90ZXNcbiAgICAgICAgICAgIDogbm90ZXMuZmlsdGVyKChub3RlKSA9PiAobm90ZS50aXRsZSArICcgJyArIG5vdGUuY29udGVudCkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhrZXl3b3JkKSlcbiAgICAgICAgICBpZiAodmlzaWJsZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pntub3Rlcy5sZW5ndGggPT09IDAgPyB0KCdub3Rlcy5lbXB0eScpIDogdCgnbm90ZXMuZW1wdHlTZWFyY2gnKX08L2Rpdj5cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHZpc2libGUubWFwKChub3RlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1N1bW1hcnkgPSBub3RlLnNoYSA9PT0gJ3N1bW1hcnknXG4gICAgICAgICAgICBjb25zdCBlZGl0aW5nID0gZWRpdGluZ05vdGUgIT09IG51bGwgJiYgZWRpdGluZ05vdGUuaWQgPT09IG5vdGUuaWQgPyBlZGl0aW5nTm90ZSA6IG51bGxcbiAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkID0gbm90ZUV4cGFuZGVkW25vdGUuaWRdID09PSB0cnVlXG4gICAgICAgICAgICBjb25zdCBsb25nID0gbm90ZS5jb250ZW50Lmxlbmd0aCA+IDI2MCB8fCBub3RlLmNvbnRlbnQuc3BsaXQoJ1xcbicpLmxlbmd0aCA+IDZcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e25vdGUuaWR9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcy5ub3RlQ2FyZCxcbiAgICAgICAgICAgICAgICAgIC4uLihpc1N1bW1hcnkgPyB7IGJhY2tncm91bmQ6ICdyZ2JhKDM3LDk5LDIzNSwwLjA0KScsIGJvcmRlckNvbG9yOiAncmdiYSgzNyw5OSwyMzUsMC4zKScgfSA6IHt9KSxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2VkaXRpbmcgIT09IG51bGwgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSB2YWx1ZT17ZWRpdGluZy50aXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgLi4uZWRpdGluZywgdGl0bGU6IGUudGFyZ2V0LnZhbHVlIH0pIH19IC8+XG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSByb3dzPXs4fSB2YWx1ZT17ZWRpdGluZy5jb250ZW50fSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RWRpdGluZ05vdGUoeyAuLi5lZGl0aW5nLCBjb250ZW50OiBlLnRhcmdldC52YWx1ZSB9KSB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICc0cHggMTJweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIHNhdmVOb3RlRWRpdCgpIH19Pnt0KCdub3Rlcy5zYXZlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnNHB4IDEycHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0RWRpdGluZ05vdGUobnVsbCkgfX0+e3QoJ25vdGVzLmNhbmNlbCcpfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlUm93fT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZVRpdGxlVGV4dH0+e2lzU3VtbWFyeSA/ICdcdUQ4M0RcdURDRDYgJyA6ICcnfXtub3RlLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc0cHgnLCBmbGV4U2hyaW5rOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRFZGl0aW5nTm90ZSh7IGlkOiBub3RlLmlkLCB0aXRsZTogbm90ZS50aXRsZSwgY29udGVudDogbm90ZS5jb250ZW50IH0pIH19Pnt0KCdub3Rlcy5lZGl0Jyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogJ1x1NTIyMFx1OTY2NFx1OEZEOVx1Njc2MVx1N0IxNFx1OEJCMFx1RkYxRicsIG1lc3NhZ2U6ICdcdTMwMEMnICsgbm90ZS50aXRsZSArICdcdTMwMERcdTVDMDZcdTg4QUJcdTZDMzhcdTRFNDVcdTUyMjBcdTk2NjRcdUZGMENcdTRFMERcdTUzRUZcdTYwNjJcdTU5MERcdTMwMDInLCBkYW5nZXI6IHRydWUsIG9uQ29uZmlybTogKCkgPT4geyB2b2lkIHJlbW92ZU5vdGUobm90ZS5pZCkgfSB9KSB9fT5cdTI3MTU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm5vdGVDb250ZW50LCAuLi4obG9uZyAmJiAhZXhwYW5kZWQgPyBzdHlsZXMubm90ZUNsYW1wIDoge30pIH19Pntub3RlLmNvbnRlbnR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtsb25nICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMubGlua0J0bn0gb25DbGljaz17KCkgPT4geyBzZXROb3RlRXhwYW5kZWQoeyAuLi5ub3RlRXhwYW5kZWQsIFtub3RlLmlkXTogIWV4cGFuZGVkIH0pIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2V4cGFuZGVkID8gdCgnbm90ZXMuY29sbGFwc2UnKSA6IHQoJ25vdGVzLmV4cGFuZCcpfVx1RkYwOHtub3RlLmNvbnRlbnQubGVuZ3RofSBcdTVCNTdcdUZGMDlcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLm5vdGVNZXRhfT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bmV3IERhdGUobm90ZS5jcmVhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHtpc1N1bW1hcnkgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzI1NjNlYicpfT57dCgnbm90ZXMuc3VtbWFyeVRhZycpfTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAge25vdGUuc2hhICE9PSB1bmRlZmluZWQgJiYgbm90ZS5zaGEgIT09ICdzdW1tYXJ5JyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjOGI4YjhiJyl9Pntub3RlLnNoYSA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiBub3RlLnNoYS5zbGljZSgwLCA4KX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICB9KSgpfVxuICAgICAgPC9DYXJkPlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ21lbW9yeS5yZWNvcmQnKSArIChwcm9qZWN0ICE9PSBudWxsID8gJyBcdTAwQjcgJyArIHByb2plY3QubmFtZSA6ICcnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0ubWVtb3J5VGl0bGUnKX0gdmFsdWU9e21lbW9yeVRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0TWVtb3J5VGl0bGUoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezN9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLm1lbW9yeUNvbnRlbnQnKX0gdmFsdWU9e21lbW9yeUNvbnRlbnR9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRNZW1vcnlDb250ZW50KGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZXMuYnV0dG9ufVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgbWVtb3J5VGl0bGUgPT09ICcnIHx8IG1lbW9yeUNvbnRlbnQgPT09ICcnfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbigncmVjb3JkTWVtb3J5JywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeScsIHsgbWVtb3J5VHlwZTogJ3Byb2plY3RfbG9nJywgdGl0bGU6IG1lbW9yeVRpdGxlLCBjb250ZW50OiBtZW1vcnlDb250ZW50IH0pLnRoZW4oKCkgPT4geyBzZXRNZW1vcnlUaXRsZSgnJyk7IHNldE1lbW9yeUNvbnRlbnQoJycpIH0pIH19XG4gICAgICAgICAgPntidXN5ID09PSAncmVjb3JkTWVtb3J5JyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdtZW1vcnkucmVjb3JkJyl9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7cHJvamVjdCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc2cHgnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ21lbW9yeS5icmFuY2hTY29wZScpfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzZWxlY3Qgc3R5bGU9e3sgLi4uc3R5bGVzLmlucHV0LCB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnM3B4IDhweCcgfX0gdmFsdWU9e21lbW9yeUJyYW5jaH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeUJyYW5jaChlLnRhcmdldC52YWx1ZSkgfX0+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj57dCgnbWVtb3J5LmJyYW5jaEFsbCcpfTwvb3B0aW9uPlxuICAgICAgICAgICAgICB7QXJyYXkuZnJvbShuZXcgU2V0KG1lbW9yaWVzLmZpbHRlcigobWVtb3J5KSA9PiBtZW1vcnkucHJvamVjdElkID09PSBwcm9qZWN0LmlkKS5tYXAoKG1lbW9yeSkgPT4gbWVtb3J5LmdpdEJyYW5jaCkuZmlsdGVyKChicmFuY2gpOiBicmFuY2ggaXMgc3RyaW5nID0+IGJyYW5jaCAhPT0gbnVsbCAmJiBicmFuY2ggIT09ICcnKSkpLm1hcCgoYnJhbmNoKSA9PiAoXG4gICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2JyYW5jaH0gdmFsdWU9e2JyYW5jaH0+e2JyYW5jaH08L29wdGlvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAge21lbW9yaWVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdtZW1vcnkuZW1wdHknKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj57WydtZW1vcnkuY29sLnRpdGxlJywgJ21lbW9yeS5jb2wuY29udGVudCcsICdtZW1vcnkuY29sLnR5cGUnLCAnbWVtb3J5LmNvbC50cnV0aCcsICdtZW1vcnkuY29sLmJyYW5jaCcsICdtZW1vcnkuY29uZmlybSddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7bWVtb3JpZXNcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChtZW1vcnkpID0+IHByb2plY3QgPT09IG51bGwgfHwgcHJvamVjdCA9PT0gdW5kZWZpbmVkIHx8IG1lbW9yeS5wcm9qZWN0SWQgPT09IHByb2plY3QuaWQpXG4gICAgICAgICAgICAgICAgLmZpbHRlcigobWVtb3J5KSA9PiBtZW1vcnlCcmFuY2ggPT09ICcnIHx8IG1lbW9yeS5naXRCcmFuY2ggPT09IG1lbW9yeUJyYW5jaClcbiAgICAgICAgICAgICAgICAubWFwKChtZW1vcnkpID0+IChcbiAgICAgICAgICAgICAgICA8dHIga2V5PXttZW1vcnkuaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PnttZW1vcnkudGl0bGV9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PnttZW1vcnkuY29udGVudCA/PyAnXHUyMDE0J308L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PnttZW1vcnkudHlwZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UobWVtb3J5LmlzSHVtYW5Db25maXJtZWQgPyAnIzRlYzliMCcgOiAnI2RjZGNhYScpfT57bWVtb3J5LmlzSHVtYW5Db25maXJtZWQgPyAnY29uZmlybWVkJyA6IG1lbW9yeS50cnV0aExldmVsfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PnttZW1vcnkuZ2l0QnJhbmNoID8/ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIHttZW1vcnkuaXNIdW1hbkNvbmZpcm1lZFxuICAgICAgICAgICAgICAgICAgICAgID8gPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzRlYzliMCcpfT5cdTI3MTM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgOiA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5idXR0b24sIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgY29uZmlybU1lbW9yeShtZW1vcnkuaWQpIH19Pnt0KCdtZW1vcnkuY29uZmlybScpfTwvYnV0dG9uPn1cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnY29uY2VwdHMudGl0bGUnKX0+XG4gICAgICAgIHtjb25jZXB0cy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnY29uY2VwdHMubm9uZScpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ2NvbmNlcHRzLmNvbC5uYW1lJywgJ2NvbmNlcHRzLmNvbC5jYXRlZ29yeScsICdjb25jZXB0cy5jb2wuY291bnQnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge2NvbmNlcHRzLm1hcCgoY29uY2VwdCkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e2NvbmNlcHQuaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntjb25jZXB0Lm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Y29uY2VwdC5jYXRlZ29yeX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntTdHJpbmcoY29uY2VwdC5vY2N1cnJlbmNlcyl9PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdyZXZpZXcucmVjb3Jkc1RpdGxlJyl9PlxuICAgICAgICB7aXNzdWVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Plx1MjAxNDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge2lzc3Vlcy5zbGljZSgwLCAyMCkubWFwKChpc3N1ZSkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e2lzc3VlLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKGlzc3VlLnNldmVyaXR5ID09PSAnY3JpdGljYWwnIHx8IGlzc3VlLnNldmVyaXR5ID09PSAnaGlnaCcgPyAnI2NlOTE3OCcgOiAnIzU2OWNkNicpfT57aXNzdWUuc2V2ZXJpdHl9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2lzc3VlLnRpdGxlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2lzc3VlLnN0YXR1c308L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ3ZlcmlmeS5yZWNvcmRzJyl9PlxuICAgICAgICB7dmVyaWZpY2F0aW9ucy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT5cdTIwMTQ8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHt2ZXJpZmljYXRpb25zLnNsaWNlKDAsIDIwKS5tYXAoKHJlY29yZCkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e3JlY29yZC5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShyZWNvcmQuc3RhdHVzID09PSAncGFzc2VkJyA/ICcjNGVjOWIwJyA6ICcjZGNkY2FhJyl9PntyZWNvcmQuc3RhdHVzfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntyZWNvcmQubmFtZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntmb3JtYXRUaW1lKHJlY29yZC5jcmVhdGVkQXQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgPC8+XG4gIClcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb290fSBkYXRhLXRlc3RpZD1cInByb2plY3QtY29udHJvbC13b3Jrc3BhY2VcIj5cbiAgICAgIDxzdHlsZT57TEFZT1VUX1NUWUxFfTwvc3R5bGU+XG4gICAgICA8ZGl2XG4gICAgICAgIGRhdGEtdGVzdGlkPVwicHJvamVjdC1jb250cm9sLWRpdmlkZXJcIlxuICAgICAgICBvblBvaW50ZXJEb3duPXtvbkRpdmlkZXJEb3dufVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IC00LCB3aWR0aDogOCxcbiAgICAgICAgICBjdXJzb3I6ICdjb2wtcmVzaXplJywgekluZGV4OiAyMCxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubmF2fT5cbiAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy50aXRsZX0+e3QoJ3dvcmtzcGFjZS50aXRsZScpfTwvc3Bhbj5cbiAgICAgICAge3RhYnMubWFwKChlbnRyeSkgPT4gKFxuICAgICAgICAgIDxidXR0b24ga2V5PXtlbnRyeS5rZXl9IHN0eWxlPXtzdHlsZXMudGFiKHRhYiA9PT0gZW50cnkua2V5KX0gb25DbGljaz17KCkgPT4geyBzZXRUYWIoZW50cnkua2V5KSB9fT57ZW50cnkubGFiZWx9PC9idXR0b24+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuYm9keX0+XG4gICAgICAgIHtsb2FkRXJyb3IgIT09IG51bGwgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnZXJyb3IubG9hZCcpfToge2xvYWRFcnJvcn08L2Rpdj59XG4gICAgICAgIHtzdGF0ZT8ucmVhZHkgPT09IGZhbHNlICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3N0YXRlLnJlYXNvbiA/PyAnJ308L2Rpdj59XG4gICAgICAgIHt0YWIgPT09ICdjb21taXRzJyAmJiBjb21taXRzVGFifVxuICAgICAgICB7dGFiID09PSAnb3ZlcnZpZXcnICYmIG92ZXJ2aWV3VGFifVxuICAgICAgICB7dGFiID09PSAnZXhlY3V0aW9uJyAmJiBleGVjdXRpb25UYWJ9XG4gICAgICAgIHt0YWIgPT09ICdub3RlcycgJiYgbm90ZXNUYWJ9XG4gICAgICAgIHt0YWIgPT09ICdzZXR0aW5ncycgJiYgc2V0dGluZ3NUYWJ9XG4gICAgICA8L2Rpdj5cbiAgICAgIHtjb25maXJtRGlhbG9nICE9PSBudWxsICYmIChcbiAgICAgICAgPENvbmZpcm1EaWFsb2dcbiAgICAgICAgICB0aXRsZT17Y29uZmlybURpYWxvZy50aXRsZX1cbiAgICAgICAgICBtZXNzYWdlPXtjb25maXJtRGlhbG9nLm1lc3NhZ2V9XG4gICAgICAgICAgZGFuZ2VyPXtjb25maXJtRGlhbG9nLmRhbmdlcn1cbiAgICAgICAgICBvbkNhbmNlbD17KCkgPT4geyBzZXRDb25maXJtRGlhbG9nKG51bGwpIH19XG4gICAgICAgICAgb25Db25maXJtPXsoKSA9PiB7IGNvbmZpcm1EaWFsb2cub25Db25maXJtKCk7IHNldENvbmZpcm1EaWFsb2cobnVsbCkgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gIClcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpQkEsSUFBQUEsZ0JBQWtCOzs7QUNWbEIsbUJBQWtCO0FBV1gsSUFBTSxhQUF3QyxDQUFDO0FBQUEsRUFDcEQsUUFBUTtBQUFBLEVBQ1IsZUFBZTtBQUFBLEVBQ2YsYUFBYTtBQUFBLEVBQ2IsWUFBWTtBQUFBLEVBQ1o7QUFBQSxFQUNBLFNBQVM7QUFDWCxNQUFNO0FBQ0osU0FBTyxhQUFBQyxRQUFNO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxNQUNFLGVBQWU7QUFBQSxNQUNmLE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVM7QUFBQSxRQUNULFFBQVE7QUFBQSxRQUNSLGlCQUFpQjtBQUFBLFFBQ2pCLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxNQUNaO0FBQUEsSUFDRjtBQUFBLElBQ0EsYUFBQUEsUUFBTTtBQUFBLE1BQ0o7QUFBQSxNQUNBO0FBQUEsUUFDRSxPQUFPO0FBQUEsVUFDTCxTQUFTO0FBQUEsVUFDVCxnQkFBZ0I7QUFBQSxVQUNoQixZQUFZO0FBQUEsVUFDWixjQUFjO0FBQUEsVUFDZCxZQUFZO0FBQUEsUUFDZDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGFBQUFBLFFBQU0sY0FBYyxRQUFRLE1BQU0sYUFBTSxLQUFLLEVBQUU7QUFBQSxNQUMvQyxhQUFBQSxRQUFNO0FBQUEsUUFDSjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU87QUFBQSxZQUNMLFVBQVU7QUFBQSxZQUNWLFNBQVM7QUFBQSxZQUNULGNBQWM7QUFBQSxZQUNkLGlCQUFpQjtBQUFBLFlBQ2pCLE9BQU87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SUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsc0JBQXNCO0FBQUEsSUFDdEIsYUFBYTtBQUFBLElBQ2Isb0JBQW9CO0FBQUEsSUFDcEIsZUFBZTtBQUFBLElBQ2Ysa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsY0FBYztBQUFBLElBQ2QsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsSUFDbEIsY0FBYztBQUFBLElBQ2QsY0FBYztBQUFBLElBQ2QsZ0JBQWdCO0FBQUEsSUFDaEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLElBQ2QsbUJBQW1CO0FBQUEsSUFDbkIsc0JBQXNCO0FBQUEsSUFDdEIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsb0JBQW9CO0FBQUEsSUFDcEIscUJBQXFCO0FBQUEsSUFDckIscUJBQXFCO0FBQUEsSUFDckIsYUFBYTtBQUFBLElBQ2IsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLElBQ1YsZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLElBQ2QsWUFBWTtBQUFBLElBQ1osd0JBQXdCO0FBQUEsSUFDeEIsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsb0JBQW9CO0FBQUEsSUFDcEIsdUJBQXVCO0FBQUEsSUFDdkIsa0JBQWtCO0FBQUEsSUFDbEIsZUFBZTtBQUFBLElBQ2YsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBRWIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsZ0JBQWdCO0FBQUEsSUFDaEIsb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsSUFDakIsd0JBQXdCO0FBQUEsSUFDeEIscUJBQXFCO0FBQUEsSUFDckIsNEJBQTRCO0FBQUEsSUFFNUIsZUFBZTtBQUFBLElBQ2Ysc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsd0JBQXdCO0FBQUEsSUFDeEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIseUJBQXlCO0FBQUEsSUFDekIsMEJBQTBCO0FBQUEsSUFDMUIsMkJBQTJCO0FBQUEsSUFFM0Isa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFFaEIsZUFBZTtBQUFBLElBQ2YsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsYUFBYTtBQUFBLElBQ2IsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsSUFDckIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBRWYsaUJBQWlCO0FBQUEsSUFDakIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsSUFDcEIsbUJBQW1CO0FBQUEsSUFDbkIsb0JBQW9CO0FBQUEsSUFDcEIscUJBQXFCO0FBQUEsSUFDckIsa0JBQWtCO0FBQUEsSUFDbEIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIseUJBQXlCO0FBQUEsSUFDekIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsa0JBQWtCO0FBQUEsSUFFbEIsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsSUFFbEIs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QUNiO0FBQUEsRUFDRjtBQUdBLE1BQUksTUFBTSxPQUFPLHNCQUFzQixNQUFNO0FBQzNDLFdBQU8sSUFBSSxNQUFNLFNBQVM7QUFBQSxNQUN4QixNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsSUFDUCxHQUFHLENBQUMsVUFBZTtBQUNqQixVQUFJLE9BQU8sYUFBYSxpQkFBa0IsUUFBTztBQUNqRCxZQUFNLFNBQVMsT0FBTztBQUN0QixhQUFPLGNBQUFBLFFBQU0sY0FBYyxZQUFZO0FBQUEsUUFDckMsT0FBTztBQUFBLFFBQ1AsY0FBYyxRQUFRLGdCQUFnQjtBQUFBLFFBQ3RDLFlBQVksUUFBUSxjQUFjO0FBQUEsUUFDbEMsV0FBVyxRQUFRLGFBQWE7QUFBQSxRQUNoQyxZQUFZLFFBQVE7QUFBQSxRQUNwQixRQUFRLFNBQVMsY0FBYztBQUFBLE1BQ2pDLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxhQUFXLENBQUMsU0FBUyxLQUFLLEtBQUs7QUFBQSxJQUM3QixDQUFDLGFBQWEsNEJBQVc7QUFBQSxJQUN6QixDQUFDLGNBQWMsb0NBQVM7QUFBQSxJQUN4QixDQUFDLG9CQUFvQixpQ0FBUTtBQUFBLEVBQy9CLEdBQVk7QUFDVixRQUFJLE1BQU0sT0FBTyxzQkFBc0IsTUFBTTtBQUMzQyxhQUFPLElBQUksTUFBTSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsS0FBSyxRQUFRLEdBQUcsaUJBQWlCLEtBQUssQ0FBQztBQUFBLElBQ2pHLENBQUM7QUFBQSxFQUNIO0FBQ0Y7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibmFtZSIsICJSZWFjdCIsICJhcHBseSIsICJmcmFtZSIsICJSZWFjdCJdCn0K
