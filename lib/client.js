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
  const settingsTab = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { title: t("model.title"), children: modelTiers === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: t("model.loading") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
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
  ] }) }) });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NsaWVudC9pbmRleC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cyIsICIuLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvV29ya3NwYWNlRnJhbWUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIENsaWVudCBwbHVnaW4gZW50cnkgZm9yIGRzaC1wcm9qZWN0LWNvbnRyb2wuXG4gKlxuICogXHU1RTAzXHU1QzQwXHU2N0I2XHU2Nzg0XHVGRjA4XHU1REYyXHU5QThDXHU4QkMxXHVGRjBDMjAyNi0wOC0zMFx1RkYwOVx1RkYxQVxuICogLSBcdTVERTVcdTRGNUNcdTUzRjBcdTkwNkVcdTg1M0RcdTVCOThcdTY1QjkgYGRldGFpbHNgIFx1NjlGRFx1RkYwOHByaW9yaXR5IC0xMFx1RkYwQ1x1NUI5OFx1NjVCOSBEZXRhaWxzUGFuZWwgXHU3NTU5XHU1NzI4XHU4RDI2XHU2NzJDXHU0RTBBXHVGRjBDXG4gKiAgIFx1NTM3OFx1OEY3RFx1NjIxMVx1NEVFQ1x1NzY4NFx1NkNFOFx1NTE4Q1x1NTM3M1x1NjA2Mlx1NTkwRFx1RkYwOVx1RkYwQ1x1NkUzMlx1NjdEM1x1NTcyOFx1NEUzQlx1Njg0Nlx1NjdCNiBkZXRhaWxzIFx1NTIxN1x1RkYxQlxuICogLSBXb3Jrc3BhY2VGcmFtZSBcdTZDRThcdTUxNjVcdTY4MzdcdTVGMEZcdTg4NjhcdUZGMENcdTYyOEFcdTVCOThcdTY1QjlcdTdGNTFcdTY4M0NcdTg5QzZcdTg5QzlcdTYzNjJcdTUyMTdcdUZGMUFcdTgwNEFcdTU5MjlcdUZGMDhjZW50ZXJDb2xcdUZGMDlcdTY3MDBcdTUzRjNcdTMwMDFcbiAqICAgXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4ZGV0YWlsc0NvbFx1RkYwOVx1NUM0NVx1NEUyRCAxZnJcdUZGMUJcdTY1RTBcdTRGMUFcdThCRERcdTg0M0RcdTU3MzBcdTk4NzVcdUZGMDhkYXRhLWRldGFpbHMtY29sbGFwc2VkXHVGRjA5XG4gKiAgIFx1ODFFQVx1NTJBOFx1NjA2Mlx1NTkwRFx1NTM5Rlx1NzUxRlx1NTIxN1x1NUU4Rlx1RkYxQlxuICogLSBcdTVERTZcdTRGQTdcdTVCOThcdTY1QjlcdTVCRkNcdTgyMkFcdTMwMDFcdTVCOThcdTY1QjlcdTgwNEFcdTU5MjlcdTY3MkNcdTRGNTNcdTk2RjZcdTY1MzlcdTUyQThcdUZGMUJcbiAqIC0gXHU0RkE3XHU4RkI5XHU2ODBGXHU2MzA5XHU5NEFFXHU1NzI4XHUzMDBDXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1M0YwIFx1MjFDNCBcdTVCOThcdTY1QjlcdThCRTZcdTYwQzVcdTk3NjJcdTY3N0ZcdTMwMERcdTk1RjRcdTUyMDdcdTYzNjJcdUZGMDhcdTUzRUZcdTkwMDZcdUZGMDlcdUZGMUJcbiAqIC0gYHRvb2wuY2FsbC50b29sdmlld2AgXHU0RTNBIGFuYWx5emVfY2hhbmdlIFx1NEZERFx1NzU1OVx1NEUxM1x1NUM1RVx1NTM2MVx1NzI0N1x1RkYxQlxuICogLSBcdTY1ODdcdTY4NDhcdTUxNjhcdTkwRThcdTdFQ0YgY3R4LmxvY2FsZSBcdThCQ0RcdTUxNzhcdUZGMDh6aCAvIGVuXHVGRjA5XHUzMDAyXG4gKlxuICogQG1vZHVsZSBkc2gtY2xpZW50LXByb2plY3QtY29udHJvbFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IENoYW5nZUNhcmQgfSBmcm9tICcuL2NvbXBvbmVudHMvQ2hhbmdlQ2FyZC50cydcbmltcG9ydCB7IFdPUktTUEFDRV9ESUNULCBXb3Jrc3BhY2VGcmFtZSB9IGZyb20gJy4vY29tcG9uZW50cy9Xb3Jrc3BhY2VGcmFtZS50c3gnXG5cbmNvbnN0IE5TID0gJ3Byb2plY3QtY29udHJvbCdcblxuZXhwb3J0IGNvbnN0IG5hbWUgPSAnY2xpZW50LXByb2plY3QtY29udHJvbCdcbmV4cG9ydCBjb25zdCBpbmplY3QgPSBbJ3Nsb3RzJywgJ2xvY2FsZScsICdsYXlvdXQnXVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoY3R4OiBhbnkpOiB2b2lkIHtcbiAgY3R4LmVmZmVjdCgoKSA9PiBjdHgubG9jYWxlLnJlZ2lzdGVyKE5TLCB7IHpoOiBXT1JLU1BBQ0VfRElDVC56aCwgZW46IFdPUktTUEFDRV9ESUNULmVuIH0pLCAncHJvamVjdC1jb250cm9sOiBkaWN0aW9uYXJpZXMnKVxuICBjb25zdCBsYXlvdXQgPSBjdHgubGF5b3V0XG5cbiAgLy8gXHUyNTAwXHUyNTAwIDEuIFx1OTg3OVx1NzZFRVx1NURFNVx1NEY1Q1x1NTNGMFx1RkYxQVx1OTA2RVx1ODUzRCBkZXRhaWxzIFx1NjlGRFx1RkYwOFx1NTNFRlx1OTAwNlx1RkYwOVx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICBsZXQgd29ya3NwYWNlRW5hYmxlZCA9IHRydWVcbiAgbGV0IGRpc3Bvc2VXb3Jrc3BhY2U6ICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZFxuXG4gIGNvbnN0IHJlZ2lzdGVyV29ya3NwYWNlID0gKCk6IHZvaWQgPT4ge1xuICAgIGRpc3Bvc2VXb3Jrc3BhY2UgPSBjdHguc2xvdHMucmVnaXN0ZXIoXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdkZXRhaWxzJyxcbiAgICAgICAgcHJpb3JpdHk6IC0xMCxcbiAgICAgICAgbG9jYWxlOiBOUyxcbiAgICAgIH0sXG4gICAgICAvLyBcdTYzMDJcdThGN0RcdTUzNzNcdTYyNTNcdTVGMDAgZGV0YWlscyBcdThGNjhcdTkwNTNcdUZGMDhcdTk3NjJcdTY3N0ZcdTUwNEZcdTU5N0RcdTlFRDhcdThCQTQgMFx1RkYwOVx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMFx1OTcwMFx1ODk4MVx1NzcxRlx1NUI5RVx1NUJCRFx1NUVBNlx1RkYxQlxuICAgICAgLy8gXHU2NUUwXHU0RjFBXHU4QkREXHU4NDNEXHU1NzMwXHU5ODc1XHU4RjY4XHU5MDUzXHU2MDUyIDBcdUZGMENcdTU5MjlcdTcxMzZcdTRGRERcdTYzMDFcdTUzOUZcdTc1MUZcdTgyRjFcdTk2QzRcdTk4NzVcdTVFMDNcdTVDNDBcdTMwMDJcbiAgICAgIC8vIFx1NEYxQVx1OEJERFx1NTIwN1x1NjM2Mlx1NjVGNlx1NUI5OFx1NjVCOVx1NEYxQSBjbG9zZURldGFpbHMgXHUyMDE0XHUyMDE0IFx1NUVGNlx1NTQwRVx1NEUwMFx1NjJDRFx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1RkYwOFx1NUI4Rlx1NEVGQlx1NTJBMVx1NjY1QVx1NEU4RVx1NzIzNlx1N0VBNyBlZmZlY3RcdUZGMDlcdTMwMDJcbiAgICAgIChwcm9wczogYW55KSA9PiB7XG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgbGF5b3V0Py5vcGVuRGV0YWlscz8uKClcbiAgICAgICAgfSwgW10pXG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHByb3BzLnNlc3Npb25JZCA9PT0gdW5kZWZpbmVkKSByZXR1cm5cbiAgICAgICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gbGF5b3V0Py5vcGVuRGV0YWlscz8uKCksIDApXG4gICAgICAgICAgcmV0dXJuICgpID0+IHsgY2xlYXJUaW1lb3V0KHRpbWVyKSB9XG4gICAgICAgIH0sIFtwcm9wcy5zZXNzaW9uSWRdKVxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChXb3Jrc3BhY2VGcmFtZSwgeyAuLi5wcm9wcywgbGF5b3V0IH0pXG4gICAgICB9LFxuICAgIClcbiAgfVxuICBjb25zdCB1bnJlZ2lzdGVyV29ya3NwYWNlID0gKCk6IHZvaWQgPT4ge1xuICAgIGRpc3Bvc2VXb3Jrc3BhY2U/LigpXG4gICAgZGlzcG9zZVdvcmtzcGFjZSA9IHVuZGVmaW5lZFxuICB9XG5cbiAgY3R4LnNsb3RzLmluamVjdCgnZGV0YWlscycsICgpID0+IHtcbiAgICBpZiAod29ya3NwYWNlRW5hYmxlZCkgcmVnaXN0ZXJXb3Jrc3BhY2UoKVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB1bnJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICB9XG4gIH0pXG5cbiAgLy8gXHUyNTAwXHUyNTAwIDIuIFx1NEZBN1x1OEZCOVx1NjgwRlx1NUU5NVx1OTBFOFx1RkYxQVx1NURFNVx1NEY1Q1x1NTNGMCBcdTIxQzQgXHU1Qjk4XHU2NUI5XHU4QkU2XHU2MEM1IFx1NTIwN1x1NjM2MiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgLy8gXHU2MzA5XHU5NEFFXHU3MkI2XHU2MDAxXHU2NjBFXHU3OTNBXHVGRjFBXHU1REU1XHU0RjVDXHU1M0YwXHU2NjNFXHU3OTNBXHU0RTJEIFx1MjE5MiBcdTMwMENcdUQ4M0VcdURERUQgXHU1REU1XHU0RjVDXHU1M0YwIFx1MjcxM1x1MzAwRFx1RkYxQlx1NURGMlx1NTIwN1x1NUI5OFx1NjVCOVx1OEJFNlx1NjBDNSBcdTIxOTIgXHUzMDBDXHVEODNFXHVEREVEIFx1NjI1M1x1NUYwMFx1NURFNVx1NEY1Q1x1NTNGMFx1MzAwRFx1OUFEOFx1NEVBRVx1RkYwQ1xuICAvLyBcdTc1MjhcdTYyMzdcdTk2OEZcdTY1RjZcdTc3MEJcdTVGOTdcdTUyMzBcdTYwMEVcdTRFNDhcdTUyMDdcdTU2REVcdTY3NjVcdUZGMDhcdTUyMDdcdTYzNjJcdTdFQ0Ygd2luZG93IFx1NEU4Qlx1NEVGNlx1OTAxQVx1NzdFNVx1NjMwOVx1OTRBRVx1OTFDRFx1NkUzMlx1NjdEM1x1RkYwOVx1MzAwMlxuICBjb25zdCBUT0dHTEVfRVZFTlQgPSAncGMtd29ya3NwYWNlLXRvZ2dsZSdcbiAgY29uc3QgZmlyZVRvZ2dsZSA9IChlbmFibGVkOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFRPR0dMRV9FVkVOVCwgeyBkZXRhaWw6IGVuYWJsZWQgfSkpXG4gIH1cbiAgY3R4LnNsb3RzLmluamVjdCgnc2lkZWJhci5mb290ZXIuYWN0aW9uJywgKCkgPT4ge1xuICAgIHJldHVybiBjdHguc2xvdHMucmVnaXN0ZXIoe1xuICAgICAgbmFtZTogJ3NpZGViYXIuZm9vdGVyLmFjdGlvbicsXG4gICAgICBpZDogJ3Byb2plY3QtY29udHJvbC10b2dnbGUnLFxuICAgIH0sICgpID0+IHtcbiAgICAgIGNvbnN0IFtlbmFibGVkLCBzZXRFbmFibGVkXSA9IFJlYWN0LnVzZVN0YXRlKHdvcmtzcGFjZUVuYWJsZWQpXG4gICAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gKGV2ZW50OiBFdmVudCk6IHZvaWQgPT4geyBzZXRFbmFibGVkKChldmVudCBhcyBDdXN0b21FdmVudDxib29sZWFuPikuZGV0YWlsKSB9XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFRPR0dMRV9FVkVOVCwgaGFuZGxlcilcbiAgICAgICAgcmV0dXJuICgpID0+IHsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoVE9HR0xFX0VWRU5ULCBoYW5kbGVyKSB9XG4gICAgICB9LCBbXSlcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAge1xuICAgICAgICAgICdkYXRhLXRlc3RpZCc6ICdwcm9qZWN0LWNvbnRyb2wtc2lkZWJhci10b2dnbGUnLFxuICAgICAgICAgIHRpdGxlOiBlbmFibGVkID8gJ1x1NUY1M1x1NTI0RFx1NjYzRVx1NzkzQVx1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMFx1MzAwMlx1NzBCOVx1NTFGQlx1NTNFRlx1NEUzNFx1NjVGNlx1NTIwN1x1NjM2Mlx1NEUzQVx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1RkYwOFx1NjdFNVx1NzcwQlx1NURFNVx1NTE3N1x1OEMwM1x1NzUyOFx1NzY4NFx1NUI4Q1x1NjU3NFx1OEY5M1x1NTE2NS9cdThGOTNcdTUxRkFcdUZGMDlcdUZGMUJcdTUxOERcdTcwQjlcdTY3MkNcdTYzMDlcdTk0QUVcdTUzNzNcdTYwNjJcdTU5MERcdTMwMDInIDogJ1x1NUY1M1x1NTI0RFx1NjYzRVx1NzkzQVx1NUI5OFx1NjVCOVx1MzAwQ1x1OEJFNlx1NjBDNVx1MzAwRFx1OTc2Mlx1Njc3Rlx1MzAwMlx1NzBCOVx1NTFGQlx1NjA2Mlx1NTkwRFx1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMFx1MzAwMicsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzZweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEwcHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgIGNvbG9yOiBlbmFibGVkID8gJ2luaGVyaXQnIDogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiBlbmFibGVkID8gNDAwIDogNjAwLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsIG9wYWNpdHk6IDAuOSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgIHdvcmtzcGFjZUVuYWJsZWQgPSAhd29ya3NwYWNlRW5hYmxlZFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKHdvcmtzcGFjZUVuYWJsZWQgJiYgZGlzcG9zZVdvcmtzcGFjZSA9PT0gdW5kZWZpbmVkKSByZWdpc3RlcldvcmtzcGFjZSgpXG4gICAgICAgICAgICAgIGVsc2UgaWYgKCF3b3Jrc3BhY2VFbmFibGVkKSB1bnJlZ2lzdGVyV29ya3NwYWNlKClcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybignW3Byb2plY3QtY29udHJvbF0gd29ya3NwYWNlIHRvZ2dsZSBmYWlsZWQnLCBlcnJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpcmVUb2dnbGUod29ya3NwYWNlRW5hYmxlZClcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBlbmFibGVkID8gJ1x1RDgzRVx1RERFRCBcdTVERTVcdTRGNUNcdTUzRjAgXHUyNzEzJyA6ICdcdUQ4M0VcdURERUQgXHU2MjUzXHU1RjAwXHU1REU1XHU0RjVDXHU1M0YwJyxcbiAgICAgIClcbiAgICB9KVxuICB9KVxuXG4gIC8vIFx1MjUwMFx1MjUwMCAzLiBcdTgwNEFcdTU5MjlcdTVERTVcdTUxNzdcdTUzNjFcdTcyNDdcdUZGMDhcdTYyNjdcdTg4NEMvXHU4QkM0XHU1QkExL1x1OUE4Q1x1NjUzNlx1RkYwOVx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICBjb25zdCBzaW1wbGVSZXN1bHRDYXJkID0gKHRpdGxlOiBzdHJpbmcpOiAoKHByb3BzOiBhbnkpID0+IGFueSkgPT4gKHByb3BzOiBhbnkpID0+IHtcbiAgICBjb25zdCBvdXRwdXQgPSBwcm9wcz8ub3V0cHV0XG4gICAgY29uc3QgdGV4dCA9IHR5cGVvZiBvdXRwdXQgPT09ICdzdHJpbmcnXG4gICAgICA/IG91dHB1dFxuICAgICAgOiBvdXRwdXQ/LnN1bW1hcnkgPz8gb3V0cHV0Py5pc3N1ZXMgPz8gb3V0cHV0Py5kZXRhaWxzID8/IChvdXRwdXQgPyBKU09OLnN0cmluZ2lmeShvdXRwdXQsIG51bGwsIDIpIDogJ1x1NjI2N1x1ODg0Q1x1NEUyRFx1MjAyNicpXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAnZGl2JyxcbiAgICAgIHtcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgcGFkZGluZzogJzEwcHggMTJweCcsXG4gICAgICAgICAgbWFyZ2luOiAnNHB4IDAnLFxuICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLFxuICAgICAgICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgICAgbGluZUhlaWdodDogMS42LFxuICAgICAgICAgIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsXG4gICAgICAgICAgbWF4SGVpZ2h0OiAyNjAsXG4gICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbkJvdHRvbTogJzRweCcgfSB9LCB0aXRsZSksXG4gICAgICBTdHJpbmcodGV4dCksXG4gICAgKVxuICB9XG5cbiAgLy8gXHUyNTAwXHUyNTAwIDMuIGFuYWx5emVfY2hhbmdlIFx1NEUxM1x1NUM1RVx1NURFNVx1NTE3N1x1NTM2MVx1NzI0NyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgY3R4LnNsb3RzLmluamVjdCgndG9vbC5jYWxsLnRvb2x2aWV3JywgKCkgPT4ge1xuICAgIHJldHVybiBjdHguc2xvdHMucmVnaXN0ZXIoe1xuICAgICAgbmFtZTogJ3Rvb2wuY2FsbC50b29sdmlldycsXG4gICAgICBrZXk6ICdhbmFseXplX2NoYW5nZScsXG4gICAgfSwgKHByb3BzOiBhbnkpID0+IHtcbiAgICAgIGlmIChwcm9wcz8udG9vbE5hbWUgIT09ICdhbmFseXplX2NoYW5nZScpIHJldHVybiBudWxsXG4gICAgICBjb25zdCBvdXRwdXQgPSBwcm9wcz8ub3V0cHV0XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDaGFuZ2VDYXJkLCB7XG4gICAgICAgIHRpdGxlOiAnXHU1M0Q4XHU2NkY0XHU1MjA2XHU2NzkwXHU2MkE1XHU1NDRBIChDaGFuZ2UgQW5hbHlzaXMpJyxcbiAgICAgICAgZmlsZXNDaGFuZ2VkOiBvdXRwdXQ/LmZpbGVzQ2hhbmdlZCA/PyAwLFxuICAgICAgICBpbnNlcnRpb25zOiBvdXRwdXQ/Lmluc2VydGlvbnMgPz8gMCxcbiAgICAgICAgZGVsZXRpb25zOiBvdXRwdXQ/LmRlbGV0aW9ucyA/PyAwLFxuICAgICAgICBldmlkZW5jZUlkOiBvdXRwdXQ/LmV2aWRlbmNlSWQsXG4gICAgICAgIHN0YXR1czogb3V0cHV0ID8gJ2NvbXBsZXRlZCcgOiAnYW5hbHl6aW5nJyxcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcblxuICBmb3IgKGNvbnN0IFt0b29sS2V5LCB0aXRsZV0gb2YgW1xuICAgIFsnc3RhcnRfcnVuJywgJ1x1RDgzRFx1REU4MCBcdTYyNjdcdTg4NEMgUnVuJ10sXG4gICAgWydydW5fcmV2aWV3JywgJ1x1RDgzRFx1REQwRCBcdTRFRTNcdTc4MDFcdThCQzRcdTVCQTEnXSxcbiAgICBbJ3J1bl92ZXJpZmljYXRpb24nLCAnXHUyNzA1IFx1OUE4Q1x1NjUzNlx1OUE4Q1x1OEJDMSddLFxuICBdIGFzIGNvbnN0KSB7XG4gICAgY3R4LnNsb3RzLmluamVjdCgndG9vbC5jYWxsLnRvb2x2aWV3JywgKCkgPT4ge1xuICAgICAgcmV0dXJuIGN0eC5zbG90cy5yZWdpc3Rlcih7IG5hbWU6ICd0b29sLmNhbGwudG9vbHZpZXcnLCBrZXk6IHRvb2xLZXkgfSwgc2ltcGxlUmVzdWx0Q2FyZCh0aXRsZSkpXG4gICAgfSlcbiAgfVxufVxuIiwgIi8qKlxyXG4gKiBSZWFjdCBDb21wb25lbnQ6IENoYW5nZSAvIEluc2lnaHQgQ2FyZCBmb3IgQ2hhdCBWaWV3LlxyXG4gKiBSZW5kZXJzIHN0cnVjdHVyZWQgaW5zaWdodHMsIGRpZmYgc3RhdGlzdGljcywgYW5kIGV2aWRlbmNlIGJhZGdlcy5cclxuICpcclxuICogQG1vZHVsZSBkc2gtcHJvamVjdC1jb250cm9sL2NsaWVudC9jb21wb25lbnRzL0NoYW5nZUNhcmRcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUNhcmRQcm9wcyB7XHJcbiAgdGl0bGU/OiBzdHJpbmdcclxuICBmaWxlc0NoYW5nZWQ/OiBudW1iZXJcclxuICBpbnNlcnRpb25zPzogbnVtYmVyXHJcbiAgZGVsZXRpb25zPzogbnVtYmVyXHJcbiAgZXZpZGVuY2VJZD86IHN0cmluZ1xyXG4gIHN0YXR1cz86IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ2hhbmdlQ2FyZDogUmVhY3QuRkM8Q2hhbmdlQ2FyZFByb3BzPiA9ICh7XHJcbiAgdGl0bGUgPSAnQ2hhbmdlIEluc2lnaHQnLFxyXG4gIGZpbGVzQ2hhbmdlZCA9IDAsXHJcbiAgaW5zZXJ0aW9ucyA9IDAsXHJcbiAgZGVsZXRpb25zID0gMCxcclxuICBldmlkZW5jZUlkLFxyXG4gIHN0YXR1cyA9ICdhbmFseXplZCcsXHJcbn0pID0+IHtcclxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICdkaXYnLFxyXG4gICAge1xyXG4gICAgICAnZGF0YS10ZXN0aWQnOiAncHJvamVjdC1jb250cm9sLWNoYW5nZS1jYXJkJyxcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHNoLWJvcmRlciwgIzMzMyknLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgcGFkZGluZzogJzEwcHggMTRweCcsXHJcbiAgICAgICAgbWFyZ2luOiAnNnB4IDAnLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWRzaC1iZy1zdWJ0bGUsICMxZTFlMWUpJyxcclxuICAgICAgICBjb2xvcjogJ3ZhcigtLWRzaC10ZXh0LCAjZWVlKScsXHJcbiAgICAgICAgZm9udFNpemU6ICcxM3B4JyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAge1xyXG4gICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxyXG4gICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgICBtYXJnaW5Cb3R0b206ICc2cHgnLFxyXG4gICAgICAgICAgZm9udFdlaWdodDogJzYwMCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIG51bGwsIGBcdUQ4M0RcdUREMEQgJHt0aXRsZX1gKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgICAnc3BhbicsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxMXB4JyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzJweCA2cHgnLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1kc2gtYmFkZ2UtYmcsICMyYTJhMmEpJyxcclxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1kc2gtYmFkZ2UtdGV4dCwgI2FhYSknLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgKSxcclxuICAgICksXHJcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAnZGl2JyxcclxuICAgICAgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEycHgnLCBmb250U2l6ZTogJzEycHgnLCBvcGFjaXR5OiAwLjkgfSB9LFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgbnVsbCwgYFx1RDgzRFx1RENDMSAke2ZpbGVzQ2hhbmdlZH0gZmlsZXNgKSxcclxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6ICcjNGVjOWIwJyB9IH0sIGArJHtpbnNlcnRpb25zfWApLFxyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBzdHlsZTogeyBjb2xvcjogJyNmMTRjNGMnIH0gfSwgYC0ke2RlbGV0aW9uc31gKSxcclxuICAgICAgZXZpZGVuY2VJZFxyXG4gICAgICAgID8gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuICAgICAgICAgICAgJ3NwYW4nLFxyXG4gICAgICAgICAgICB7IHN0eWxlOiB7IG9wYWNpdHk6IDAuNywgZm9udEZhbWlseTogJ21vbm9zcGFjZScgfSB9LFxyXG4gICAgICAgICAgICBgWyR7ZXZpZGVuY2VJZH1dYCxcclxuICAgICAgICAgIClcclxuICAgICAgICA6IG51bGwsXHJcbiAgICApLFxyXG4gIClcclxufVxyXG4iLCAiLyoqXG4gKiBQcm9qZWN0IENvbnRyb2wgXHU1REU1XHU0RjVDXHU1M0YwXHVGRjA4V29ya3NwYWNlRnJhbWVcdUZGMDl2Mlx1RkYxQVx1NTZGNFx1N0VENVwiXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XCJcdTdFQzRcdTdFQzdcdTMwMDJcbiAqXG4gKiBcdTU2REJcdTRFMkFcdTk4NzVcdTdCN0VcdUZGMUFcbiAqIDEuIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1RkYwOFx1OUVEOFx1OEJBNFx1RkYwOVx1RkYxQVx1NEVEM1x1NUU5M1x1NjgwRlx1RkYwOFx1NTkxQVx1NEVEM1x1NUU5M1x1NTIwN1x1NjM2Mlx1RkYwOSsgXHU2M0QwXHU0RUE0XHU1MjE3XHU4ODY4XHVGRjA4XHU1NDJCXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4XHVGRjA5K1xuICogICAgXHU4QkU2XHU2MEM1XHU5NzYyXHU2NzdGXHVGRjA4QUkgXHU4OUUzXHU4QkZCXHVGRjFBXHU2NTM5XHU0RTg2XHU0RUMwXHU0RTQ4L1x1NUI5RVx1NzNCMFx1OTAzQlx1OEY5MS9cdTk4Q0VcdTk2NjlcdUZGMUJcdTRFMDlcdTdFQTdcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjQgU1ZHIFx1NTZGRVx1RkYxQlx1NjcwMFx1NEYxOFx1NjAyN1x1NjgzOFx1NjdFNVx1N0VEM1x1OEJCQVx1RkYwOVx1MzAwMlxuICogMi4gXHU5ODc5XHU3NkVFXHU2MDNCXHU4OUM4XHVGRjFBXHU5ODc5XHU3NkVFXHU2ODYzXHU2ODQ4ICsgXHU1RkVCXHU2Mzc3XHU2NENEXHU0RjVDICsgXHU1REYyXHU3ODZFXHU1QjlBXHU3RUE2XHU2NzVGICsgXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExXHUzMDAyXG4gKiAzLiBcdTYyNjdcdTg4NENcdTRFMkRcdTVGQzNcdUZGMUFSdW4gXHU4RkRCXHU1RUE2XHU0RTBFXHU2MjEwXHU2NzJDXHUzMDAyXG4gKiA0LiBcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzZcdUZGMUFcdTY4MzhcdTY3RTVcdTdCMTRcdThCQjBcdUZGMDhcdTUzRUZcdTUxNzNcdTgwNTRcdTYzRDBcdTRFQTRcdUZGMDkrIFx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNlx1RkYwOFx1NEVCQVx1NURFNVx1Nzg2RVx1OEJBNFx1RkYwOSsgXHU1QjY2XHU0RTYwXHU2OTgyXHU1RkY1ICsgUmV2aWV3L1x1OUE4Q1x1NjUzNlx1OEJCMFx1NUY1NVx1MzAwMlxuICpcbiAqIFx1NUUwM1x1NUM0MFx1NjczQVx1NTIzNlx1NEUwRFx1NTNEOFx1RkYxQVx1OTA2RVx1ODUzRFx1NUI5OFx1NjVCOSBkZXRhaWxzIFx1NjlGRCArIFx1NkNFOFx1NTE2NVx1NjgzN1x1NUYwRlx1NjM2Mlx1NTIxN1x1RkYwOFx1ODA0QVx1NTkyOVx1NjcwMFx1NTNGM1x1RkYwOSsgXHU1MjA2XHU5Njk0XHU2NzYxXHU2MkQ2XHU2MkZEXHU4QkIwXHU1RkM2XHVGRjFCXG4gKiBcdTdFREZcdThCQTFcdTg4NENcdTRFMjRcdTg4NENcdTk0QjNcdTUyMzZcdTc1MzFcdThGRDBcdTg4NENcdTY1RjZcdTYzMDlcdTY3ODRcdTVFRkFcdTU0QzhcdTVFMENcdTdDQkVcdTUxQzZcdTZDRThcdTUxNjVcdUZGMDhhcHBseVN0YXRzTGluZUNsYW1wXHVGRjA5XHUzMDAyXG4gKlxuICogQG1vZHVsZSBkc2gtY2xpZW50LXByb2plY3QtY29udHJvbC9jb21wb25lbnRzL1dvcmtzcGFjZUZyYW1lXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcblxuLyoqIFx1NUJCRlx1NEUzQiAvc3RhdGUgXHU4RkQ0XHU1NkRFXHU3Njg0XHU1RkVCXHU3MTY3XHU1RjYyXHU3MkI2XHVGRjA4XHU0RTBFIGFwaS1yb3V0ZS50cyBidWlsZFN0YXRlIFx1NUJGOVx1OUY1MFx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGludGVyZmFjZSBXb3Jrc3BhY2VTdGF0ZSB7XG4gIHJlYWR5PzogYm9vbGVhblxuICByZWFzb24/OiBzdHJpbmdcbiAgcHJvamVjdD86IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyByb290UGF0aDogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9IHwgbnVsbFxuICBjaGFuZ2VzPzogQXJyYXk8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyB0eXBlOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nOyBzb3VyY2U6IHN0cmluZzsgdXBkYXRlZEF0OiBudW1iZXIgfT5cbiAgcnVucz86IEFycmF5PHsgaWQ6IHN0cmluZzsgY2hhbmdlSWQ6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IHN0YXJ0ZWRBdDogbnVtYmVyIHwgbnVsbDsgZmluaXNoZWRBdDogbnVtYmVyIHwgbnVsbDsgY29zdFVzZD86IG51bWJlcjsgc3RlcHNUb3RhbD86IG51bWJlcjsgc3RlcHNEb25lPzogbnVtYmVyOyBjdXJyZW50U3RlcD86IHN0cmluZyB8IG51bGwgfT5cbiAgYXR0ZW1wdHNDb3VudD86IG51bWJlclxuICBtZW1vcmllcz86IEFycmF5PHsgaWQ6IHN0cmluZzsgcHJvamVjdElkOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgdHJ1dGhMZXZlbDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb250ZW50Pzogc3RyaW5nOyBpc0h1bWFuQ29uZmlybWVkOiBib29sZWFuOyBnaXRCcmFuY2g6IHN0cmluZyB8IG51bGw7IGNyZWF0ZWRBdDogbnVtYmVyIH0+XG4gIGV2aWRlbmNlQ291bnQ/OiBudW1iZXJcbiAgcmVjZW50RXZpZGVuY2U/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHNvdXJjZTogc3RyaW5nOyB0cnV0aExldmVsOiBzdHJpbmc7IGxvY2F0b3I6IHN0cmluZzsgc25pcHBldDogc3RyaW5nOyBjcmVhdGVkQXQ6IG51bWJlciB9PlxuICBpbXBvcnRlZENoYW5nZXM/OiBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGNvbW1pdENvdW50OiBudW1iZXI7IGZpcnN0Q29tbWl0QXQ6IG51bWJlcjsgbGFzdENvbW1pdEF0OiBudW1iZXI7IGNvbmZpZGVuY2U6IG51bWJlcjsgc3RhdHVzOiBzdHJpbmcgfT5cbiAgaXNzdWVzPzogQXJyYXk8eyBpZDogc3RyaW5nOyBjaGFuZ2VJZDogc3RyaW5nOyBzZXZlcml0eTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBzdGF0dXM6IHN0cmluZyB9PlxuICB2ZXJpZmljYXRpb25zPzogQXJyYXk8eyBpZDogc3RyaW5nOyBjaGFuZ2VJZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IHR5cGU6IHN0cmluZzsgc3RhdHVzOiBzdHJpbmc7IGNyZWF0ZWRBdDogbnVtYmVyIH0+XG4gIGJvb3RzdHJhcD86IHsgaWQ6IHN0cmluZzsgc3VtbWFyeTogc3RyaW5nOyB0ZWNoU3RhY2s6IHN0cmluZ1tdOyBtYW5pZmVzdEZpbGVzOiBzdHJpbmdbXTsgc3ltYm9sc0NvdW50OiBudW1iZXI7IGNyZWF0ZWRBdDogbnVtYmVyIH0gfCBudWxsXG4gIGNvbmZpcm1lZD86IEFycmF5PHsgaWQ6IHN0cmluZzsgdHlwZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmc7IGZvcmJpZGRlblBhdGhzOiBzdHJpbmdbXSB9PlxuICBjb25jZXB0cz86IEFycmF5PHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjYXRlZ29yeTogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nOyBvY2N1cnJlbmNlczogbnVtYmVyIH0+XG59XG5cbi8qKiBHRVQgL2NvbW1pdHMgXHU3Njg0XHU2M0QwXHU0RUE0XHU2NzYxXHU3NkVFXHUzMDAyICovXG5pbnRlcmZhY2UgQ29tbWl0RW50cnkge1xuICBzaGE6IHN0cmluZ1xuICBzaG9ydEhhc2g6IHN0cmluZ1xuICBhdXRob3I6IHN0cmluZ1xuICBkYXRlOiBudW1iZXJcbiAgc3ViamVjdDogc3RyaW5nXG4gIGZpbGVzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgYWRkczogbnVtYmVyOyBkZWxzOiBudW1iZXIgfT5cbn1cblxuaW50ZXJmYWNlIENvbW1pdHNQYXlsb2FkIHtcbiAgcm9vdFBhdGg6IHN0cmluZ1xuICBicmFuY2g6IHN0cmluZyB8IG51bGxcbiAgaGVhZFNoYTogc3RyaW5nIHwgbnVsbFxuICB3b3JraW5nOiB7IGZpbGVDb3VudDogbnVtYmVyOyBpc0NsZWFuOiBib29sZWFuOyBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IHN0YXR1czogc3RyaW5nIH0+IH1cbiAgY29tbWl0czogQ29tbWl0RW50cnlbXVxufVxuXG5pbnRlcmZhY2UgQ29tbWl0RGV0YWlsUGF5bG9hZCB7XG4gIHNoYTogc3RyaW5nXG4gIGlzV29ya2luZzogYm9vbGVhblxuICBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IGFkZHM6IG51bWJlcjsgZGVsczogbnVtYmVyIH0+XG4gIGluc2VydGlvbnM6IG51bWJlclxuICBkZWxldGlvbnM6IG51bWJlclxuICBwYXRjaFRydW5jYXRlZDogYm9vbGVhblxuICBwYXRjaDogc3RyaW5nXG4gIGNvbW1pdDogeyBtZXNzYWdlOiBzdHJpbmc7IGF1dGhvcjogc3RyaW5nOyBkYXRlOiBudW1iZXIgfSB8IG51bGxcbiAgYW5hbHlzaXM6IHsgd2hhdDogc3RyaW5nOyBsb2dpYzogc3RyaW5nW107IHJpc2tzOiBzdHJpbmdbXSB9XG4gIGFuYWx5c2lzQ2FjaGVkPzogYm9vbGVhblxuICBhbmFseXNpc0dlbmVyYXRlZEF0PzogbnVtYmVyIHwgbnVsbFxufVxuXG5pbnRlcmZhY2UgSW1wYWN0U2NvcGVQYXlsb2FkIHtcbiAgY2hhbmdlZEZpbGVzOiBzdHJpbmdbXVxuICBzaGFzPzogc3RyaW5nW11cbiAgcmlza0xldmVsOiAnbG93JyB8ICdtZWRpdW0nIHwgJ2hpZ2gnIHwgJ2NyaXRpY2FsJ1xuICByaXNrU2NvcmU6IG51bWJlclxuICByaXNrRmFjdG9ycz86IEFycmF5PHsgdGV4dDogc3RyaW5nOyBwb2ludHM6IG51bWJlciB9PlxuICBrZXlDaGFuZ2VQb2ludHM/OiBzdHJpbmdbXVxuICBtZW1vcmllcz86IEFycmF5PHsgdGl0bGU6IHN0cmluZzsgdHlwZTogc3RyaW5nIH0+XG4gIGZ1bmN0aW9uSW1wYWN0PzogQXJyYXk8e1xuICAgIHN5bWJvbDogc3RyaW5nXG4gICAgZGVmaW5lZEluOiBzdHJpbmdcbiAgICByb2xlPzogc3RyaW5nXG4gICAgY2hhbmdlPzogc3RyaW5nXG4gICAgaW1wYWN0Pzogc3RyaW5nXG4gICAgY2FsbGVyczogQXJyYXk8eyBmaWxlOiBzdHJpbmc7IGxpbmU6IHN0cmluZzsgc25pcHBldDogc3RyaW5nIH0+XG4gIH0+XG4gIGxldmVsczogQXJyYXk8eyBsZXZlbDogc3RyaW5nOyBkZXB0aDogbnVtYmVyOyBwYXRoOiBzdHJpbmc7IGNvbmZpZGVuY2U6IG51bWJlcjsgcmVhc29uOiBzdHJpbmcgfT5cbiAgZGlyZWN0OiBzdHJpbmdbXVxuICBleHBsYW5hdGlvbnNDYWNoZWQ/OiBib29sZWFuXG4gIGdlbmVyYXRlZEF0PzogbnVtYmVyIHwgbnVsbFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJldmlld1BheWxvYWQge1xuICBpc3N1ZXNGb3VuZDogbnVtYmVyXG4gIGlzc3Vlczogc3RyaW5nXG4gIHZlcmRpY3Q6IHN0cmluZ1xuICBjYWNoZWQ/OiBib29sZWFuXG4gIGdlbmVyYXRlZEF0PzogbnVtYmVyIHwgbnVsbFxuICBpc3N1ZUxpc3Q/OiBBcnJheTx7IHNldmVyaXR5OiBzdHJpbmc7IGNhdGVnb3J5OiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGV2aWRlbmNlOiBzdHJpbmc7IGZpeDogc3RyaW5nIH0+XG59XG5cbmludGVyZmFjZSBOb3RlRW50cnkge1xuICBpZDogc3RyaW5nXG4gIHByb2plY3RJZDogc3RyaW5nXG4gIHNoYT86IHN0cmluZ1xuICB0aXRsZTogc3RyaW5nXG4gIGNvbnRlbnQ6IHN0cmluZ1xuICBjcmVhdGVkQXQ6IG51bWJlclxufVxuXG4vKipcbiAqIFx1ODlDNlx1ODlDOVx1NjM2Mlx1NTIxN1x1NjgzN1x1NUYwRlx1ODg2OFx1RkYxQVx1OTY4Rlx1NjcyQ1x1N0VDNFx1NEVGNlx1NjMwMlx1OEY3RC9cdTUzNzhcdThGN0RcdUZGMDhcdTUzNzhcdThGN0RcdTUzNzNcdTVCOENcdTUxNjhcdTYwNjJcdTU5MERcdTUzOUZcdTc1MUZcdTVFMDNcdTVDNDBcdUZGMDlcdTMwMDJcbiAqIFx1NkNFOFx1NjEwRlx1RkYxQVx1Nzk4MVx1NkI2Mlx1NzUyOCA6aGFzKCkgXHU1MDVBXHU3OTU2XHU1MTQ4XHU1MzM5XHU5MTREXHUyMDE0XHUyMDE0XHU1Qjk4XHU2NUI5XHU2Nzg0XHU1RUZBXHU0RUE3XHU3MjY5XHU1MUUwXHU1MzQxXHU0RTJBXHU3RUM0XHU0RUY2XHU2ODM5XHU3QzdCXHU5MEZEXHU1M0VCIHJvb3RcdUZGMENcbiAqIFx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1NEYxQVx1NjI4QVx1NjU3NFx1NEUyQVx1ODA0QVx1NTkyOVx1NUJCOVx1NTY2OFx1OEJFRlx1OTRCM1x1NTIzNlx1RkYwOFx1NTM4Nlx1NTNGMlx1NEU4Qlx1NjU0NVx1RkYwOVx1MzAwMlx1NkI2NFx1ODg2OFx1NTNFQVx1NEZERFx1NzU1OVx1N0Y1MVx1NjgzQ1x1NjM2Mlx1NTIxN1x1NEUwRVx1NjJENlx1NjJGRFx1NjdDNFx1OTY5MFx1ODVDRlx1MzAwMlxuICovXG5jb25zdCBMQVlPVVRfU1RZTEUgPSBgXG5kaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdID4gZGl2W2NsYXNzKj1cImNlbnRlckNvbFwiXSB7IG9yZGVyOiAzOyB9XG5kaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdID4gZGl2W2NsYXNzKj1cImRldGFpbHNDb2xcIl0geyBvcmRlcjogMjsgfVxuZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXVtkYXRhLWRldGFpbHMtY29sbGFwc2VkXSA+IGRpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0sXG5kaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdW2RhdGEtZGV0YWlscy1jb2xsYXBzZWRdID4gZGl2W2NsYXNzKj1cImRldGFpbHNDb2xcIl0geyBvcmRlcjogMDsgfVxuZGl2W2NsYXNzKj1cImhhbmRsZVwiXVtkYXRhLXNpZGU9XCJkZXRhaWxzXCJdIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9XG5kaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdOm5vdChbZGF0YS1kZXRhaWxzLWNvbGxhcHNlZF0pIHtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIG1pbm1heCgwLCAxZnIpIHZhcigtLXBjLWNoYXQtdywgMzYwcHgpICFpbXBvcnRhbnQ7XG59XG5gXG5cbi8qKlxuICogXHU0RjFBXHU4QkREXHU3RURGXHU4QkExXHU4ODRDXHU3Njg0XHU0RTI0XHU4ODRDXHU5NEIzXHU1MjM2XHVGRjA4XHU3NTI4XHU2MjM3XHU2MzA3XHU1QjlBXHU3Njg0XHU2ODM3XHU1RjBGXHVGRjA5XHUzMDAyXHU0RTBEXHU4MEZEXHU4RDcwIENTUyBcdTkwMDlcdTYyRTlcdTU2NjhcdUZGMUFcbiAqIFx1NUI5OFx1NjVCOVx1NTkxQVx1NEUyQVx1NkEyMVx1NTc1N1x1NzY4NFx1NjgzOVx1N0M3Qlx1OTBGRFx1NTNFQiBgcm9vdGBcdUZGMDhcdTY3ODRcdTVFRkFcdTU0MEVcdTY2MkYgYGhhc2hfcm9vdGBcdUZGMDlcdUZGMENcdTUxNzZcdTRFMkRcbiAqIENvbnZlcnNhdGlvblJvb3QgXHU3Njg0XHU1QjUwXHU2ODExXHU5MUNDXHU1QzMxXHU1MzA1XHU1NDJCXHU3RURGXHU4QkExXHU4ODRDXHU3Njg0IGBoYXNoX3NlcGAgXHU1MjA2XHU5Njk0IHNwYW5cdTIwMTRcdTIwMTRcbiAqIFx1NEVGQlx1NEY1NVx1Nzk1Nlx1NTE0OFx1NTMzOVx1OTE0RFx1RkYwOFx1NTQyQiA6aGFzKClcdUZGMDlcdTkwRkRcdTRGMUFcdTYyOEFcdTY1NzRcdTRFMkFcdTgwNEFcdTU5MjlcdTVCQjlcdTU2NjhcdTk0QjNcdTYyMTBcdTRFMjRcdTg4NENcdUZGMENcdTY3NDBcdTZCN0JcdTZFREFcdTUyQThcdTMwMDJcbiAqIFx1NTZFMFx1NkI2NFx1NTcyOFx1OEZEMFx1ODg0Q1x1NjVGNlx1NjMwOVx1NTUyRlx1NEUwMFx1NUY2Mlx1NzJCNlx1NUI5QVx1NEY0RFx1RkYxQVx1NUM0NVx1NEUyRFx1NjM5Mlx1NzI0OCArIFx1NzZGNFx1NjNBNVx1NUI1MFx1NEVFM1x1NTQyQlx1NjU4N1x1NjcyQyBcInxcIiBcdTc2ODRcbiAqIFx1NTIwNlx1OTY5NCBzcGFuXHVGRjBDXHU1NDdEXHU0RTJEXHU1NDBFXHU2MjhBXHU1Qjk4XHU2NUI5XHU3QzdCXHU1NDBEXHU1MzlGXHU2ODM3XHU1MTk5XHU4RkRCXHU2ODM3XHU1RjBGXHU4ODY4XHVGRjA4XHU3Q0JFXHU1MUM2XHU1MjMwXHU2Nzg0XHU1RUZBXHU1NEM4XHU1RTBDXHVGRjA5XHUzMDAyXG4gKiBAcmV0dXJucyBcdTZDRThcdTUxNjVcdTc2ODQgc3R5bGUgXHU1MTQzXHU3RDIwXHVGRjFCXHU1Qjk4XHU2NUI5XHU2NzJBXHU2RTMyXHU2N0QzXHU3RURGXHU4QkExXHU4ODRDXHU2NUY2XHU0RTNBIHVuZGVmaW5lZFx1MzAwMlxuICovXG5jb25zdCBhcHBseVN0YXRzTGluZUNsYW1wID0gKCk6IEhUTUxTdHlsZUVsZW1lbnQgfCB1bmRlZmluZWQgPT4ge1xuICBjb25zdCBzZXBTcGFuID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxTcGFuRWxlbWVudD4oJ2RpdltjbGFzcyo9XCJfcm9vdFwiXSA+IHNwYW5bY2xhc3MqPVwiX3NlcFwiXScpKVxuICAgIC5maW5kKChzcGFuKSA9PiBzcGFuLnRleHRDb250ZW50ID09PSAnfCcpXG4gIGNvbnN0IHJvb3REaXYgPSBzZXBTcGFuPy5wYXJlbnRFbGVtZW50XG4gIGNvbnN0IGhhc2hDbGFzcyA9IHJvb3REaXY/LmNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pLmZpbmQoKG5hbWUpID0+IG5hbWUuZW5kc1dpdGgoJ19yb290JykpXG4gIGlmIChyb290RGl2ID09PSB1bmRlZmluZWQgfHwgcm9vdERpdiA9PT0gbnVsbCB8fCBoYXNoQ2xhc3MgPT09IHVuZGVmaW5lZCB8fCBnZXRDb21wdXRlZFN0eWxlKHJvb3REaXYpLnRleHRBbGlnbiAhPT0gJ2NlbnRlcicpIHJldHVybiB1bmRlZmluZWRcbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gIHN0eWxlLmlkID0gJ3BjLXN0YXRzLWNsYW1wJ1xuICBzdHlsZS50ZXh0Q29udGVudCA9IGBcbmRpdltjbGFzcz1cIiR7aGFzaENsYXNzfVwiXSB7XG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAtd2Via2l0LWxpbmUtY2xhbXA6IDI7XG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XG4gIHRleHQtb3ZlcmZsb3c6IGNsaXA7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgbWF4LXdpZHRoOiAxMDAlO1xufVxuYFxuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKVxuICByZXR1cm4gc3R5bGVcbn1cblxudHlwZSBUYWJLZXkgPSAnY29tbWl0cycgfCAnb3ZlcnZpZXcnIHwgJ2V4ZWN1dGlvbicgfCAnbm90ZXMnIHwgJ3NldHRpbmdzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtzcGFjZUZyYW1lUHJvcHMge1xuICAvKiogXHU1Qjk4XHU2NUI5IGRldGFpbHMgXHU2OUZEXHU1OTUxXHU3RUE2XHU3Njg0IGxvY2FsZSBcdTZDRThcdTUxNjVcdUZGMDhcdTYyMTFcdTRFRUNcdTZDRThcdTUxOENcdTc2ODQgcHJvamVjdC1jb250cm9sIFx1OEJDRFx1NTE3OFx1RkYwOVx1MzAwMiAqL1xuICB0PzogKGtleTogc3RyaW5nKSA9PiBzdHJpbmdcbiAgLyoqIFx1NUY1M1x1NTI0RFx1NEYxQVx1OEJERCBpZFx1RkYwOFx1NUI5OFx1NjVCOSBzZXNzaW9uIFx1NjgwN1x1NTFDNlx1NUM1RVx1NjAyN1x1RkYxQlx1NTIwN1x1NjM2Mlx1NEYxQVx1OEJERFx1NjVGNlx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1NURFNVx1NEY1Q1x1NTNGMFx1OEY2OFx1OTA1M1x1RkYwOVx1MzAwMiAqL1xuICBzZXNzaW9uSWQ/OiBzdHJpbmdcbn1cblxuLyoqIFx1NURFNVx1NEY1Q1x1NTNGMFx1NjU4N1x1Njg0OFx1OEJDRFx1NTE3OFx1RkYwOHpoIC8gZW5cdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBjb25zdCBXT1JLU1BBQ0VfRElDVCA9IHtcbiAgemg6IHtcbiAgICAnd29ya3NwYWNlLnRpdGxlJzogJ1x1OTg3OVx1NzZFRVx1NjgzOFx1NjdFNVx1NTNGMCcsXG4gICAgJ3RhYi5jb21taXRzJzogJ1x1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNScsXG4gICAgJ3RhYi5vdmVydmlldyc6ICdcdTk4NzlcdTc2RUVcdTYwM0JcdTg5QzgnLFxuICAgICd0YWIuZXhlY3V0aW9uJzogJ1x1NjI2N1x1ODg0Q1x1NEUyRFx1NUZDMycsXG4gICAgJ3RhYi5ub3Rlcyc6ICdcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzYnLFxuICAgICd0YWIuc2V0dGluZ3MnOiAnXHU4QkJFXHU3RjZFJyxcbiAgICAnZXJyb3IubG9hZCc6ICdcdTUyQTBcdThGN0RcdTU5MzFcdThEMjUnLFxuICAgICdzdGF0ZS5wcm9qZWN0JzogJ1x1NUY1M1x1NTI0RFx1OTg3OVx1NzZFRScsXG4gICAgJ3N0YXRlLm5vUHJvamVjdCc6ICdcdTVDMUFcdTY3MkFcdTUyMURcdTU5Q0JcdTUzMTZcdTk4NzlcdTc2RUUnLFxuICAgICdzdGF0ZS5ub1Byb2plY3RIaW50JzogJ1x1NzBCOVx1NTFGQlx1MzAwQ1x1NTIxRFx1NTlDQlx1NTMxNlx1OTg3OVx1NzZFRVx1MzAwRFx1NjI2Qlx1NjNDRlx1NEVEM1x1NUU5M1x1N0VEM1x1Njc4NFx1MzAwMVx1NjI4MFx1NjcyRlx1NjgwOFx1NEUwRVx1N0IyNlx1NTNGN1x1N0QyMlx1NUYxNVx1MzAwMicsXG4gICAgJ2FjdGlvbi5ib290c3RyYXAnOiAnXHU1MjFEXHU1OUNCXHU1MzE2XHU5ODc5XHU3NkVFJyxcbiAgICAnYWN0aW9uLnJlc2Nhbic6ICdcdTkxQ0RcdTY1QjBcdTUyMURcdTU5Q0JcdTUzMTYgLyBcdTYyNkJcdTYzQ0YnLFxuICAgICdhY3Rpb24uYW5hbHl6ZSc6ICdcdTUyMDZcdTY3OTBcdTVGNTNcdTUyNERcdTY1MzlcdTUyQTgnLFxuICAgICdhY3Rpb24ucmV2aWV3JzogJ1x1OEJDNFx1NUJBMVx1NUY1M1x1NTI0RFx1NjUzOVx1NTJBOCcsXG4gICAgJ2FjdGlvbi52ZXJpZnknOiAnXHU5QThDXHU2NTM2XHU1RjUzXHU1MjREXHU2NTM5XHU1MkE4JyxcbiAgICAnYWN0aW9uLmNyZWF0ZUNoYW5nZSc6ICdcdTY1QjBcdTVFRkFcdTUzRDhcdTY2RjQnLFxuICAgICdhY3Rpb24ucnVubmluZyc6ICdcdTYyNjdcdTg4NENcdTRFMkRcdTIwMjYnLFxuICAgICdhY3Rpb24ucmVmcmVzaCc6ICdcdTUyMzdcdTY1QjAnLFxuICAgICdmb3JtLmNoYW5nZVRpdGxlJzogJ1x1NTNEOFx1NjZGNFx1NjgwN1x1OTg5OCcsXG4gICAgJ2Zvcm0uY2hhbmdlRGVzYyc6ICdcdTk3MDBcdTZDNDJcdTRFMEVcdTgwQ0NcdTY2NkZcdUZGMDhcdTkwMDlcdTU4NkJcdUZGMDknLFxuICAgICdyZXN1bHQucGFuZWwnOiAnXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDJyxcblxuICAgICdyZXBvLnNjYW5IaXN0b3J5JzogJ1x1OTFDRFx1NUVGQVx1NTM4Nlx1NTNGMicsXG4gICAgJ3JlcG8uY29tbWl0cyc6ICdcdTYzRDBcdTRFQTQnLFxuICAgICdyZXBvLmJyYW5jaCc6ICdcdTUyMDZcdTY1MkYnLFxuICAgICdyZXBvLndvcmtpbmcnOiAnXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcbiAgICAncmVwby53b3JraW5nQ2xlYW4nOiAnXHU1REU1XHU0RjVDXHU1MzNBXHU1RTcyXHU1MUMwXHVGRjBDXHU2NUUwXHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4JyxcbiAgICAncmVwby5lbXB0eSc6ICdcdTY2ODJcdTY1RTBcdTYzRDBcdTRFQTRcdTMwMDInLFxuICAgICdyZXBvLmxvYWRGYWlsZWQnOiAnXHU2M0QwXHU0RUE0XHU1MkEwXHU4RjdEXHU1OTMxXHU4RDI1JyxcbiAgICAncGlja2VyLnRpdGxlJzogJ1x1OTAwOVx1NjJFOVx1ODk4MVx1NjgzOFx1NjdFNVx1NzY4NFx1NjNEMFx1NEVBNFx1RkYwOFx1NTNFRlx1NTkxQVx1OTAwOVx1RkYwOScsXG4gICAgJ3BpY2tlci5wbGFjZWhvbGRlcic6ICdcdTcwQjlcdTUxRkJcdTkwMDlcdTYyRTlcdTYzRDBcdTRFQTRcdUZGMDhcdTUzRUZcdTU5MUFcdTkwMDlcdUZGMENcdTU0MkJcdTY3MkFcdTYzRDBcdTRFQTRcdTY1MzlcdTUyQThcdUZGMDknLFxuICAgICdwaWNrZXIuc2VsZWN0ZWQnOiAnXHU1REYyXHU5MDA5JyxcbiAgICAncGlja2VyLmZpbHRlcic6ICdcdTYzMDlcdTY4MDdcdTk4OTgvXHU1NEM4XHU1RTBDL1x1NEY1Q1x1ODAwNVx1OEZDN1x1NkVFNFx1MjAyNicsXG4gICAgJ3BpY2tlci5jbGVhcic6ICdcdTZFMDVcdTdBN0EnLFxuICAgICdwaWNrZXIubm9NYXRjaCc6ICdcdTY1RTBcdTUzMzlcdTkxNERcdTYzRDBcdTRFQTRcdTMwMDInLFxuICAgICdwaWNrZXIuaGludCc6ICdcdTUyRkVcdTkwMDlcdTYzRDBcdTRFQTRcdTU0MEVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTAgQUkgXHU4OUUzXHU4QkZCXHVGRjFCXHU0RTBCXHU2NUI5XHU1M0VGXHU1MThEXHU4REQxXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHU0RTBFXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1XHUzMDAyJyxcbiAgICAnaW1wYWN0LmZhY3RvcnMnOiAnXHU5OENFXHU5NjY5XHU2Nzg0XHU2MjEwXHVGRjA4XHU0RTNBXHU0RUMwXHU0RTQ4XHU2NjJGXHU4RkQ5XHU0RTJBXHU3QjQ5XHU3RUE3XHVGRjA5JyxcbiAgICAnaW1wYWN0LnBvaW50cyc6ICdcdTVGNzFcdTU0Q0RcdTcwQjlcdTY2MEVcdTdFQzYnLFxuICAgICdpbXBhY3Qua2V5UG9pbnRzJzogJ1x1NTE3M1x1OTUyRVx1N0VDNFx1NEVGNicsXG4gICAgJ2ltcGFjdC5tZW1vcnknOiAnXHU3RUQzXHU1NDA4XHU5ODc5XHU3NkVFXHU4QkIwXHU1RkM2XHU2ODM4XHU2N0U1JyxcbiAgICAnaW1wYWN0LmZ1bmN0aW9ucyc6ICdcdTUzRDdcdTVGNzFcdTU0Q0RcdTUxRkRcdTY1NzBcdUZGMDhcdThDMDFcdThDMDNcdTc1MjhcdTRFODZcdTg4QUJcdTY1MzlcdTc2ODRcdTRFRTNcdTc4MDFcdUZGMDknLFxuICAgICdpbXBhY3QuZnVuY1JvbGUnOiAnXHU1MUZEXHU2NTcwXHU1MjlGXHU4MEZEJyxcbiAgICAnaW1wYWN0LmZ1bmNDaGFuZ2UnOiAnXHU2NzJDXHU2QjIxXHU1M0Q4XHU1MzE2JyxcbiAgICAnaW1wYWN0LmZ1bmNDYWxsZXJzJzogJ1x1NUJGOVx1OEMwM1x1NzUyOFx1NjVCOVx1NzY4NFx1NUY3MVx1NTRDRCcsXG4gICAgJ2NhY2hlLmhpdCc6ICdcdTY3NjVcdTgxRUFcdTdGMTNcdTVCNTgnLFxuICAgICdjYWNoZS5yZWdlbmVyYXRlJzogJ1x1OTFDRFx1NjVCMFx1NzUxRlx1NjIxMCcsXG4gICAgJ2V4ZWMuY3JlYXRlJzogJ1x1NjVCMFx1NUVGQVx1NjI2N1x1ODg0QycsXG4gICAgJ2V4ZWMuZm9ybVRpdGxlJzogJ1x1ODk4MVx1NTA1QVx1NEVDMFx1NEU0OFx1RkYwOFx1NEUwMFx1NTNFNVx1OEJERFx1RkYwOScsXG4gICAgJ2V4ZWMuZm9ybURlc2MnOiAnXHU5NzAwXHU2QzQyXHU0RTBFXHU4MENDXHU2NjZGXHVGRjFBXHU3NkVFXHU2ODA3XHUzMDAxXHU2RDg5XHU1M0NBXHU2QTIxXHU1NzU3XHUzMDAxXHU5QThDXHU2NTM2XHU2ODA3XHU1MUM2JyxcbiAgICAnZXhlYy5zdGFydCc6ICdcdTVGMDBcdTU5Q0JcdTYyNjdcdTg4NEMnLFxuICAgICdleGVjLnN0YXJ0aW5nJzogJ1x1NkI2M1x1NTcyOFx1NTQyRlx1NTJBOFx1MjAyNicsXG4gICAgJ2V4ZWMuY3JlYXRlSGludCc6ICdcdTUyMUJcdTVFRkFcdTUzRDhcdTY2RjRcdTVFNzZcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdThCQTFcdTUyMTJcdUZGMENcdTk2OEZcdTU0MEVcdTc1MzEgQUkgXHU1QjUwXHU0RUUzXHU3NDA2XHU5MDEwXHU2QjY1XHU2MjY3XHU4ODRDXHVGRjFCXHU4RkRCXHU1RUE2XHU1NzI4XHU0RTBCXHU2NUI5XHU1QjlFXHU2NUY2XHU1MjM3XHU2NUIwXHVGRjBDXHU2NUUwXHU5NzAwXHU1M0JCXHU4MDRBXHU1OTI5XHUzMDAyJyxcbiAgICAnZXhlYy5jb2wuc3RlcHMnOiAnXHU2QjY1XHU5QUE0JyxcbiAgICAnbm90ZXMuZWRpdCc6ICdcdTdGMTZcdThGOTEnLFxuICAgICdub3Rlcy5zYXZlJzogJ1x1NEZERFx1NUI1OCcsXG4gICAgJ25vdGVzLmNhbmNlbCc6ICdcdTUzRDZcdTZEODgnLFxuICAgICdtZW1vcnkuYnJhbmNoU2NvcGUnOiAnXHU1MjA2XHU2NTJGJyxcbiAgICAnbWVtb3J5LmJyYW5jaEFsbCc6ICdcdTUxNjhcdTkwRThcdTUyMDZcdTY1MkYnLFxuICAgICdub3Rlcy5zZWFyY2gnOiAnXHU2NDFDXHU3RDIyXHU3QjE0XHU4QkIwXHUyMDI2JyxcbiAgICAnbW9kZWwudGl0bGUnOiAnXHU2QTIxXHU1NzhCXHU1MjA2XHU5MTREXHVGRjA4XHU4OUUzXHU4QkZCIC8gXHU2MDNCXHU3RUQzXHU3QjQ5XHU0RUZCXHU1MkExXHU3NTI4XHU1NEVBXHU0RTJBXHU2QTIxXHU1NzhCXHVGRjA5JyxcbiAgICAnbW9kZWwubG9hZGluZyc6ICdcdThCRkJcdTUzRDZcdTZBMjFcdTU3OEJcdTZFMDVcdTUzNTVcdTIwMjYnLFxuICAgICdtb2RlbC5mb2xsb3dDaGF0JzogJ1x1OERERlx1OTY4Rlx1ODA0QVx1NTkyOVx1NkEyMVx1NTc4QicsXG4gICAgJ21vZGVsLnNhdmUnOiAnXHU0RkREXHU1QjU4XHU1RTc2XHU3NTFGXHU2NTQ4JyxcbiAgICAnbW9kZWwuc2F2ZWQnOiAnXHU1REYyXHU3NTFGXHU2NTQ4JyxcbiAgICAnbW9kZWwuaGludCc6ICdcdTRGRERcdTVCNThcdTU0MEVcdTdBQ0JcdTUzNzNcdTc1MUZcdTY1NDhcdTVFNzZcdTYzMDFcdTRFNDVcdTUzMTZcdUZGMDhcdTkxQ0RcdTU0MkZcdTU0MEVcdTRGRERcdTc1NTlcdUZGMDlcdUZGMUJcdTRFMERcdTVGNzFcdTU0Q0RcdTgwNEFcdTU5MjlcdTZBMjFcdTU3OEJcdTMwMDInLFxuICAgICdub3Rlcy5haVN1bW1hcnknOiAnQUkgXHU2MDNCXHU3RUQzXHU3QjE0XHU4QkIwJyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5UnVuJzogJ1x1NjAzQlx1N0VEM1x1NzUxRlx1NjIxMFx1NEUyRFx1MjAyNlx1RkYwOFx1N0VBNiAxMC0zMCBcdTc5RDJcdUZGMDknLFxuICAgICdub3Rlcy5leHBhbmQnOiAnXHU1QzU1XHU1RjAwXHU1MTY4XHU2NTg3JyxcbiAgICAnbm90ZXMuY29sbGFwc2UnOiAnXHU2NTM2XHU4RDc3JyxcbiAgICAnbm90ZXMuc3VtbWFyeVRhZyc6ICdBSSBcdTYwM0JcdTdFRDMnLFxuICAgICdub3Rlcy5lbXB0eVNlYXJjaCc6ICdcdTY1RTBcdTUzMzlcdTkxNERcdTdCMTRcdThCQjBcdTMwMDInLFxuICAgICdub3Rlcy5jb250ZW50SGludCc6ICdcdTdCMTRcdThCQjBcdTUxODVcdTVCQjlcdUZGMDhcdTY1MkZcdTYzMDFcdTU5MUFcdTg4NENcdUZGMDlcdUZGMUFcdTdFRDNcdThCQkFcdTMwMDFcdTc1OTFcdTk1RUVcdTMwMDFcdTVCNjZcdTRFNjBcdTg5ODFcdTcwQjlcdTMwMDFcdTUxNzNcdTk1MkVcdTUxQjNcdTdCNTZcdTIwMjYnLFxuICAgICdpbXBhY3QuZnVuY3Rpb25zTm9uZSc6ICdcdTY3MkFcdThCQzZcdTUyMkJcdTUxRkFcdTUxRkRcdTY1NzBcdTdFQTdcdThDMDNcdTc1MjhcdTUzRDhcdTUzMTZcdUZGMDhcdTUzRUZcdTgwRkRcdTY2MkZcdTY4MzdcdTVGMEYvXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwL1x1N0VBRlx1OTE0RFx1N0Y2RVx1NjUzOVx1NTJBOFx1RkYwOVx1MzAwMicsXG4gICAgJ3Jldmlldy5jb2wuc2V2ZXJpdHknOiAnXHU3RUE3XHU1MjJCJyxcbiAgICAncmV2aWV3LmNvbC5jYXRlZ29yeSc6ICdcdTdDN0JcdTUyMkInLFxuICAgICdyZXZpZXcuY29sLnRpdGxlJzogJ1x1OTVFRVx1OTg5OCcsXG4gICAgJ3Jldmlldy5jb2wuZXZpZGVuY2UnOiAnXHU0RjREXHU3RjZFJyxcbiAgICAncmV2aWV3LmNvbC5maXgnOiAnXHU1RUZBXHU4QkFFXHU0RkVFXHU1OTBEJyxcbiAgICAncmV2aWV3LmhpbnQnOiAnXHU3MEI5XHU1MUZCXHU0RTBBXHU2NUI5XHU2MzA5XHU5NEFFXHU1RjAwXHU1OUNCXHU2ODM4XHU2N0U1XHVGRjBDXHU0RUE3XHU1MUZBXHU2NzAwXHU0RjE4XHU2MDI3XHU3RUQzXHU4QkJBXHU0RTBFXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHUzMDAyJyxcbiAgICAnZGlmZi5zaG93JzogJ1x1NUJGOVx1NkJENCcsXG4gICAgJ2RpZmYuaGlkZSc6ICdcdTY1MzZcdThENzdcdTVERUVcdTVGMDInLFxuXG4gICAgJ2RldGFpbC50aXRsZSc6ICdcdTY4MzhcdTY3RTVcdThCRTZcdTYwQzUnLFxuICAgICdkZXRhaWwucGljayc6ICdcdTIxOTAgXHU0RUNFXHU1REU2XHU0RkE3XHU5MDA5XHU2MkU5XHU0RTAwXHU2QjIxXHU2M0QwXHU0RUE0XHVGRjA4XHU2MjE2XHU2NzJBXHU2M0QwXHU0RUE0XHU2NTM5XHU1MkE4XHVGRjA5XHU1RjAwXHU1OUNCXHU2ODM4XHU2N0U1JyxcbiAgICAnZGV0YWlsLndoYXQnOiAnXHU2NTM5XHU0RTg2XHU0RUMwXHU0RTQ4JyxcbiAgICAnZGV0YWlsLmxvZ2ljJzogJ1x1NUI5RVx1NzNCMFx1OTAzQlx1OEY5MScsXG4gICAgJ2RldGFpbC5yaXNrJzogJ1x1OThDRVx1OTY2OVx1NzBCOScsXG4gICAgJ2RldGFpbC5maWxlcyc6ICdcdTY1ODdcdTRFRjZcdTZFMDVcdTUzNTUnLFxuICAgICdkZXRhaWwucGF0Y2gnOiAnXHU2N0U1XHU3NzBCXHU4ODY1XHU0RTAxXHU1MzlGXHU2NTg3JyxcbiAgICAnZGV0YWlsLmFpTG9hZGluZyc6ICdBSSBcdTg5RTNcdThCRkJcdTc1MUZcdTYyMTBcdTRFMkRcdTIwMjZcdUZGMDhcdTdFQTYgMTAtMzAgXHU3OUQyXHVGRjA5JyxcbiAgICAnZGV0YWlsLmltcGFjdCc6ICdcdTVGNzFcdTU0Q0RcdTgzMDNcdTU2RjRcdTUyMDZcdTY3OTAnLFxuICAgICdkZXRhaWwuaW1wYWN0TG9hZGluZyc6ICdcdTVGNzFcdTU0Q0RcdTYyNkJcdTYzQ0ZcdTRFMkRcdTIwMjZcdUZGMDhcdTVGMTVcdTc1MjhcdTY4QzBcdTdEMjIgKyBcdTU2RkVcdThDMzFcdTRGMjBcdTY0QURcdUZGMDknLFxuICAgICdkZXRhaWwub3B0aW1hbGl0eSc6ICdcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTUnLFxuICAgICdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnOiAnXHU4QkM0XHU1QkExXHU0RTJEXHUyMDI2XHVGRjA4XHU0RjFBXHU0RUE3XHU1MUZBXHU5NUVFXHU5ODk4XHU2RTA1XHU1MzU1XHU0RTBFXHU2NzAwXHU0RjE4XHU2MDI3XHU3RUQzXHU4QkJBXHVGRjA5JyxcblxuICAgICdpbXBhY3Qucmlzayc6ICdcdTk4Q0VcdTk2NjknLFxuICAgICdpbXBhY3QuY29sLmNoYW5nZWQnOiAnXHU1M0Q4XHU2NkY0XHU2NTg3XHU0RUY2JyxcbiAgICAnaW1wYWN0LmNvbC5pbmRpcmVjdCc6ICdcdTk1RjRcdTYzQTVcdTVGNzFcdTU0Q0RcdUZGMDhcdTVGMTVcdTc1MjhcdTk0RkVcdUZGMDknLFxuICAgICdpbXBhY3QuY29sLnBvdGVudGlhbCc6ICdcdTZGNUNcdTU3MjhcdTVGNzFcdTU0Q0QnLFxuICAgICdpbXBhY3Qubm9uZSc6ICdcdTY3MkFcdTUzRDFcdTczQjBcdTRFRDNcdTVFOTNcdTUxODVcdTVGMTVcdTc1MjhcdTgwMDVcdUZGMDhcdTY1MzlcdTUyQThcdTc3MEJcdTRGM0NcdTcyRUNcdTdBQ0JcdUZGMDlcdTMwMDInLFxuICAgICdpbXBhY3QudGVzdHMnOiAnXHU1MTczXHU4MDU0XHU2RDRCXHU4QkQ1JyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5jaGFuZ2VkJzogJ1x1NTNEOFx1NjZGNCcsXG4gICAgJ2ltcGFjdC5sZWdlbmQuaW5kaXJlY3QnOiAnXHU5NUY0XHU2M0E1JyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5wb3RlbnRpYWwnOiAnXHU2RjVDXHU1NzI4JyxcblxuICAgICdyZXZpZXcudmVyZGljdCc6ICdcdTY3MDBcdTRGMThcdTYwMjdcdTdFRDNcdThCQkEnLFxuICAgICdyZXZpZXcuaXNzdWVzJzogJ1x1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NScsXG4gICAgJ3Jldmlldy5jbGVhbic6ICdcdTY3MkFcdTUzRDFcdTczQjBcdTk1RUVcdTk4OThcdTMwMDInLFxuXG4gICAgJ25vdGVzLnRpdGxlJzogJ1x1NjgzOFx1NjdFNVx1N0IxNFx1OEJCMCcsXG4gICAgJ25vdGVzLmZvcm1UaXRsZSc6ICdcdTdCMTRcdThCQjBcdTY4MDdcdTk4OTgnLFxuICAgICdub3Rlcy5mb3JtQ29udGVudCc6ICdcdTdCMTRcdThCQjBcdTUxODVcdTVCQjlcdUZGMDhcdTdFRDNcdThCQkFcdTMwMDFcdTc1OTFcdTk1RUVcdTMwMDFcdTVCNjZcdTRFNjBcdTg5ODFcdTcwQjlcdTIwMjZcdUZGMDknLFxuICAgICdub3Rlcy5hZGQnOiAnXHU2REZCXHU1MkEwXHU3QjE0XHU4QkIwJyxcbiAgICAnbm90ZXMuYm91bmRUbyc6ICdcdTVDMDZcdTUxNzNcdTgwNTRcdTUyMzAnLFxuICAgICdub3Rlcy5jb2wudGltZSc6ICdcdTY1RjZcdTk1RjQnLFxuICAgICdub3Rlcy5jb2wudGl0bGUnOiAnXHU2ODA3XHU5ODk4JyxcbiAgICAnbm90ZXMuY29sLmNvbnRlbnQnOiAnXHU1MTg1XHU1QkI5JyxcbiAgICAnbm90ZXMuY29sLnNoYSc6ICdcdTUxNzNcdTgwNTRcdTYzRDBcdTRFQTQnLFxuICAgICdub3Rlcy5yZW1vdmUnOiAnXHU1MjIwXHU5NjY0JyxcbiAgICAnbm90ZXMuZW1wdHknOiAnXHU4RkQ4XHU2Q0ExXHU2NzA5XHU3QjE0XHU4QkIwXHUzMDAyXHU2ODM4XHU2N0U1XHU2M0QwXHU0RUE0XHU2NUY2XHU5NjhGXHU2MjRCXHU4QkIwXHU0RTBCXHU3RUQzXHU4QkJBXHU0RTBFXHU3NTkxXHU5NUVFXHVGRjBDXHU1QzMxXHU2NjJGXHU0RjYwXHU3Njg0XHU5ODc5XHU3NkVFXHU1QjY2XHU0RTYwXHU2ODYzXHU2ODQ4XHUzMDAyJyxcblxuICAgICdtZW1vcnkucmVjb3JkJzogJ1x1OEJCMFx1NUY1NVx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNicsXG4gICAgJ2Zvcm0ubWVtb3J5VGl0bGUnOiAnXHU4QkIwXHU1RkM2XHU2ODA3XHU5ODk4JyxcbiAgICAnZm9ybS5tZW1vcnlDb250ZW50JzogJ1x1OEJCMFx1NUZDNlx1NTE4NVx1NUJCOVx1RkYwOFx1NEVDMFx1NEU0OFx1NEUwRVx1NEUzQVx1NEVDMFx1NEU0OFx1RkYwOScsXG4gICAgJ21lbW9yeS5jb2wudGl0bGUnOiAnXHU2NzYxXHU3NkVFJyxcbiAgICAnbWVtb3J5LmNvbC50eXBlJzogJ1x1N0M3Qlx1NTc4QicsXG4gICAgJ21lbW9yeS5jb2wudHJ1dGgnOiAnXHU3NzFGXHU1MDNDJyxcbiAgICAnbWVtb3J5LmNvbC5icmFuY2gnOiAnXHU1MjA2XHU2NTJGJyxcbiAgICAnbWVtb3J5LmNvbmZpcm0nOiAnXHU3ODZFXHU4QkE0JyxcbiAgICAnbWVtb3J5LmVtcHR5JzogJ1x1NjY4Mlx1NjVFMFx1OTg3OVx1NzZFRVx1OEJCMFx1NUZDNlx1MzAwMlx1NTNFRlx1NTcyOFx1ODA0QVx1NTkyOVx1NEUyRFx1OEJBOSBBSSBcdThCQjBcdTVGNTVcdUZGMENcdTYyMTZcdTU3MjhcdTRFMEFcdTY1QjlcdTYyNEJcdTUyQThcdTZERkJcdTUyQTBcdTMwMDInLFxuICAgICdjb25jZXB0cy50aXRsZSc6ICdcdTVCNjZcdTRFNjBcdTY5ODJcdTVGRjUnLFxuICAgICdjb25jZXB0cy5ub25lJzogJ1x1NjY4Mlx1NjVFMFx1NUI2Nlx1NEU2MFx1Njk4Mlx1NUZGNVx1MzAwMlx1NUJGOVx1NTNEOFx1NjZGNFx1OEMwM1x1NzUyOCBzdW1tYXJpemVfbGVhcm5pbmcgXHU1NDBFXHU4MUVBXHU1MkE4XHU3OUVGXHU3RDJGXHUzMDAyJyxcbiAgICAnY29uY2VwdHMuY29sLm5hbWUnOiAnXHU2OTgyXHU1RkY1JyxcbiAgICAnY29uY2VwdHMuY29sLmNhdGVnb3J5JzogJ1x1N0M3Qlx1NTIyQicsXG4gICAgJ2NvbmNlcHRzLmNvbC5jb3VudCc6ICdcdTZCMjFcdTY1NzAnLFxuICAgICdyZXZpZXcucmVjb3Jkc1RpdGxlJzogJ1JldmlldyBcdTk1RUVcdTk4OTgnLFxuICAgICd2ZXJpZnkucmVjb3Jkcyc6ICdcdTlBOENcdTY1MzZcdThCQjBcdTVGNTUnLFxuXG4gICAgJ2NvbmZpcm1lZC50aXRsZSc6ICdcdTVERjJcdTc4NkVcdTVCOUFcdTdFQTZcdTY3NUZcdUZGMDhcdTRFQkFcdTVERTVcdTc4NkVcdThCQTRcdUZGMENBSSBcdTc5ODFcdTY1MzlcdTgxRUFcdTUyQThcdTYyRTZcdTYyMkFcdUZGMDknLFxuICAgICdjb25maXJtZWQuYWRkJzogJ1x1NkRGQlx1NTJBMFx1N0VBNlx1Njc1RicsXG4gICAgJ2NvbmZpcm1lZC50ZXh0JzogJ1x1N0VBNlx1Njc1Ri9cdTk3MDBcdTZDNDJcdTUxODVcdTVCQjknLFxuICAgICdjb25maXJtZWQucGF0aHMnOiAnXHU3OTgxXHU2NTM5XHU4REVGXHU1Rjg0XHVGRjA4XHU5MDE3XHU1M0Y3XHU1MjA2XHU5Njk0XHVGRjBDXHU5MDA5XHU1ODZCXHVGRjA5JyxcbiAgICAnY29uZmlybWVkLm5vbmUnOiAnXHU2NjgyXHU2NUUwXHU3RUE2XHU2NzVGXHUzMDAyXHU2REZCXHU1MkEwXHU1NDBFIEFJIFx1NEZFRVx1NjUzOVx1Nzk4MVx1NjUzOVx1OERFRlx1NUY4NFx1NUMwNlx1ODhBQlx1ODFFQVx1NTJBOFx1NjJEMlx1N0VERFx1MzAwMicsXG5cbiAgICAnY2hhbmdlcy50aXRsZSc6ICdcdTUzRDhcdTY2RjRcdTRFRkJcdTUyQTEnLFxuICAgICdzdGF0ZS5ub0NoYW5nZXMnOiAnXHU2NjgyXHU2NUUwXHU1M0Q4XHU2NkY0XHU0RUZCXHU1MkExXHUzMDAyXHU1NzI4XHU4MDRBXHU1OTI5XHU0RTJEXHU4QkE5IEFJIFx1NTIxQlx1NUVGQVx1RkYwQ1x1NjIxNlx1NzUyOFx1NEUwQVx1NjVCOVx1MzAwQ1x1NjVCMFx1NUVGQVx1NTNEOFx1NjZGNFx1MzAwRFx1MzAwMicsXG4gICAgJ2NoYW5nZXMuY29sLnRpdGxlJzogJ1x1NjgwN1x1OTg5OCcsXG4gICAgJ2NoYW5nZXMuY29sLnR5cGUnOiAnXHU3QzdCXHU1NzhCJyxcbiAgICAnY2hhbmdlcy5jb2wuc3RhdHVzJzogJ1x1NzJCNlx1NjAwMScsXG4gICAgJ2NoYW5nZXMuY29sLnVwZGF0ZWQnOiAnXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0JyxcbiAgICAnZXhlYy5jb2wuc3RhdHVzJzogJ1x1NzJCNlx1NjAwMScsXG4gICAgJ2V4ZWMuY29sLmNoYW5nZSc6ICdcdTUzRDhcdTY2RjQnLFxuICAgICdleGVjLmNvbC5zdGFydGVkJzogJ1x1NUYwMFx1NTlDQicsXG4gICAgJ2V4ZWMuY29sLmNvc3QnOiAnXHU2MjEwXHU2NzJDKFx1NEYzMCknLFxuICAgICdleGVjLmF0dGVtcHRzJzogJ1x1NUMxRFx1OEJENVx1NkIyMVx1NjU3MCcsXG4gICAgJ2V4ZWMuaGludCc6ICdcdTYyNjdcdTg4NENcdUZGMDhzdGFydF9ydW5cdUZGMDlcdThCRjdcdTU3MjhcdTUzRjNcdTRGQTdcdTgwNEFcdTU5MjlcdTRFMkRcdTUzRDFcdThENzdcdUZGMUFcdTUyMUJcdTVFRkFcdThCQTFcdTUyMTJcdTU0MEVcdTVCRjkgQUkgXHU4QkY0XHUzMDBDXHU1RjAwXHU1OUNCXHU2MjY3XHU4ODRDXHU4QkU1IGNoYW5nZVx1MzAwRFx1MzAwMlx1NjcyQ1x1OTg3NVx1NjdFNVx1NzcwQlx1OEZEQlx1NUVBNlx1NEUwRVx1N0VEM1x1Njc5Q1x1MzAwMicsXG4gICAgJ3N0YXRlLm5vUnVucyc6ICdcdTY2ODJcdTY1RTBcdTYyNjdcdTg4NENcdThCQjBcdTVGNTVcdTMwMDInLFxuICAgICdzdGF0ZS50ZWNoU3RhY2snOiAnXHU2MjgwXHU2NzJGXHU2ODA4JyxcbiAgICAnc3RhdGUuc3ltYm9scyc6ICdcdTVERjJcdTdEMjJcdTVGMTVcdTdCMjZcdTUzRjcnLFxuICAgICdzdGF0ZS5tYW5pZmVzdHMnOiAnXHU2RTA1XHU1MzU1XHU2NTg3XHU0RUY2JyxcbiAgICAnc3RhdGUuZXZpZGVuY2UnOiAnXHU4QkMxXHU2MzZFXHU2NzYxXHU3NkVFJyxcbiAgfSxcbiAgZW46IHtcbiAgICAnd29ya3NwYWNlLnRpdGxlJzogJ1JldmlldyBEZXNrJyxcbiAgICAndGFiLmNvbW1pdHMnOiAnQ29tbWl0IFJldmlldycsXG4gICAgJ3RhYi5vdmVydmlldyc6ICdPdmVydmlldycsXG4gICAgJ3RhYi5leGVjdXRpb24nOiAnRXhlY3V0aW9uJyxcbiAgICAndGFiLm5vdGVzJzogJ05vdGVzICYgTWVtb3J5JyxcbiAgICAndGFiLnNldHRpbmdzJzogJ1NldHRpbmdzJyxcbiAgICAnZXJyb3IubG9hZCc6ICdGYWlsZWQgdG8gbG9hZCcsXG4gICAgJ3N0YXRlLnByb2plY3QnOiAnQ3VycmVudCBwcm9qZWN0JyxcbiAgICAnc3RhdGUubm9Qcm9qZWN0JzogJ05vIHByb2plY3QgaW5pdGlhbGl6ZWQnLFxuICAgICdzdGF0ZS5ub1Byb2plY3RIaW50JzogJ1J1biBcIkluaXRpYWxpemUgcHJvamVjdFwiIHRvIHNjYW4gdGhlIHJlcG9zaXRvcnkgc3RydWN0dXJlLCB0ZWNoIHN0YWNrLCBhbmQgc3ltYm9sIGluZGV4LicsXG4gICAgJ2FjdGlvbi5ib290c3RyYXAnOiAnSW5pdGlhbGl6ZSBwcm9qZWN0JyxcbiAgICAnYWN0aW9uLnJlc2Nhbic6ICdSZS1pbml0aWFsaXplIC8gc2NhbicsXG4gICAgJ2FjdGlvbi5hbmFseXplJzogJ0FuYWx5emUgd29ya2luZyBkaWZmJyxcbiAgICAnYWN0aW9uLnJldmlldyc6ICdSZXZpZXcgd29ya2luZyBkaWZmJyxcbiAgICAnYWN0aW9uLnZlcmlmeSc6ICdWZXJpZnkgd29ya2luZyBkaWZmJyxcbiAgICAnYWN0aW9uLmNyZWF0ZUNoYW5nZSc6ICdDcmVhdGUgY2hhbmdlJyxcbiAgICAnYWN0aW9uLnJ1bm5pbmcnOiAnUnVubmluZ1x1MjAyNicsXG4gICAgJ2FjdGlvbi5yZWZyZXNoJzogJ1JlZnJlc2gnLFxuICAgICdmb3JtLmNoYW5nZVRpdGxlJzogJ0NoYW5nZSB0aXRsZScsXG4gICAgJ2Zvcm0uY2hhbmdlRGVzYyc6ICdSZXF1aXJlbWVudCBhbmQgYmFja2dyb3VuZCAob3B0aW9uYWwpJyxcbiAgICAncmVzdWx0LnBhbmVsJzogJ0FjdGlvbiByZXN1bHQnLFxuXG4gICAgJ3JlcG8uYWRkJzogJ0FkZCByZXBvJyxcbiAgICAncmVwby5hZGRIaW50JzogJ0VudGVyIGFuIGFic29sdXRlIHJlcG8gcGF0aCBhbmQgcHJlc3MgRW50ZXI7IHByZXZpb3VzbHkgdXNlZCByZXBvcyBhcmUgcmVtZW1iZXJlZCcsXG4gICAgJ3JlcG8uc2Nhbkhpc3RvcnknOiAnUmVidWlsZCBoaXN0b3J5JyxcbiAgICAncmVwby5jb21taXRzJzogJ2NvbW1pdHMnLFxuICAgICdyZXBvLmJyYW5jaCc6ICdicmFuY2gnLFxuICAgICdyZXBvLndvcmtpbmcnOiAnVW5jb21taXR0ZWQgY2hhbmdlcycsXG4gICAgJ3JlcG8ud29ya2luZ0NsZWFuJzogJ1dvcmtpbmcgdHJlZSBpcyBjbGVhbicsXG4gICAgJ3JlcG8uZW1wdHknOiAnTm8gY29tbWl0cy4nLFxuICAgICdyZXBvLmxvYWRGYWlsZWQnOiAnRmFpbGVkIHRvIGxvYWQgY29tbWl0cycsXG4gICAgJ3BpY2tlci50aXRsZSc6ICdQaWNrIGNvbW1pdHMgdG8gcmV2aWV3IChtdWx0aS1zZWxlY3QpJyxcbiAgICAncGlja2VyLnBsYWNlaG9sZGVyJzogJ0NsaWNrIHRvIHBpY2sgY29tbWl0cyAobXVsdGktc2VsZWN0LCBpbmNsdWRlcyB1bmNvbW1pdHRlZCknLFxuICAgICdwaWNrZXIuc2VsZWN0ZWQnOiAnU2VsZWN0ZWQnLFxuICAgICdwaWNrZXIuZmlsdGVyJzogJ0ZpbHRlciBieSB0aXRsZS9oYXNoL2F1dGhvclx1MjAyNicsXG4gICAgJ3BpY2tlci5jbGVhcic6ICdDbGVhcicsXG4gICAgJ3BpY2tlci5ub01hdGNoJzogJ05vIG1hdGNoaW5nIGNvbW1pdC4nLFxuICAgICdwaWNrZXIuaGludCc6ICdDaGVja2luZyBhIGNvbW1pdCBnZW5lcmF0ZXMgaXRzIEFJIGV4cGxhbmF0aW9uOyBydW4gaW1wYWN0IGFuZCBvcHRpbWFsaXR5IGJlbG93LicsXG4gICAgJ2ltcGFjdC5mYWN0b3JzJzogJ1Jpc2sgZmFjdG9ycyAod2h5IHRoaXMgbGV2ZWwpJyxcbiAgICAnaW1wYWN0LnBvaW50cyc6ICdJbXBhY3RlZCBwb2ludHMnLFxuICAgICdpbXBhY3Qua2V5UG9pbnRzJzogJ0tleSBjb21wb25lbnRzJyxcbiAgICAnaW1wYWN0Lm1lbW9yeSc6ICdDcm9zcy1jaGVjayB3aXRoIHByb2plY3QgbWVtb3J5JyxcbiAgICAnaW1wYWN0LmZ1bmN0aW9ucyc6ICdJbXBhY3RlZCBmdW5jdGlvbnMgKHdobyBjYWxscyB0aGUgY2hhbmdlZCBjb2RlKScsXG4gICAgJ2ltcGFjdC5mdW5jUm9sZSc6ICdGdW5jdGlvbiByb2xlJyxcbiAgICAnaW1wYWN0LmZ1bmNDaGFuZ2UnOiAnQ2hhbmdlZCBieSB0aGlzIGNvbW1pdCcsXG4gICAgJ2ltcGFjdC5mdW5jQ2FsbGVycyc6ICdJbXBhY3Qgb24gY2FsbGVycycsXG4gICAgJ2NhY2hlLmhpdCc6ICdmcm9tIGNhY2hlJyxcbiAgICAnY2FjaGUucmVnZW5lcmF0ZSc6ICdSZWdlbmVyYXRlJyxcbiAgICAnZXhlYy5jcmVhdGUnOiAnTmV3IHJ1bicsXG4gICAgJ2V4ZWMuZm9ybVRpdGxlJzogJ1doYXQgdG8gZG8gKG9uZSBsaW5lKScsXG4gICAgJ2V4ZWMuZm9ybURlc2MnOiAnUmVxdWlyZW1lbnQ6IGdvYWwsIG1vZHVsZXMsIGFjY2VwdGFuY2UnLFxuICAgICdleGVjLnN0YXJ0JzogJ1N0YXJ0IHJ1bicsXG4gICAgJ2V4ZWMuc3RhcnRpbmcnOiAnU3RhcnRpbmdcdTIwMjYnLFxuICAgICdleGVjLmNyZWF0ZUhpbnQnOiAnQ3JlYXRlcyBhIGNoYW5nZSwgZ2VuZXJhdGVzIGEgcGxhbiwgdGhlbiBBSSBzdWJhZ2VudHMgZXhlY3V0ZSBzdGVwIGJ5IHN0ZXA7IHByb2dyZXNzIHJlZnJlc2hlcyBiZWxvdy4nLFxuICAgICdleGVjLmNvbC5zdGVwcyc6ICdTdGVwcycsXG4gICAgJ25vdGVzLmVkaXQnOiAnRWRpdCcsXG4gICAgJ25vdGVzLnNhdmUnOiAnU2F2ZScsXG4gICAgJ25vdGVzLmNhbmNlbCc6ICdDYW5jZWwnLFxuICAgICdtZW1vcnkuYnJhbmNoU2NvcGUnOiAnQnJhbmNoJyxcbiAgICAnbWVtb3J5LmJyYW5jaEFsbCc6ICdBbGwgYnJhbmNoZXMnLFxuICAgICdub3Rlcy5zZWFyY2gnOiAnU2VhcmNoIG5vdGVzXHUyMDI2JyxcbiAgICAnbW9kZWwudGl0bGUnOiAnTW9kZWwgYXNzaWdubWVudCAod2hpY2ggbW9kZWwgcGVyIHRhc2spJyxcbiAgICAnbW9kZWwubG9hZGluZyc6ICdMb2FkaW5nIG1vZGVsc1x1MjAyNicsXG4gICAgJ21vZGVsLmZvbGxvd0NoYXQnOiAnRm9sbG93IGNoYXQgbW9kZWwnLFxuICAgICdtb2RlbC5zYXZlJzogJ1NhdmUgJiBhcHBseScsXG4gICAgJ21vZGVsLnNhdmVkJzogJ0FwcGxpZWQnLFxuICAgICdtb2RlbC5oaW50JzogJ0FwcGxpZXMgaW1tZWRpYXRlbHkgYW5kIHBlcnNpc3RzIGFjcm9zcyByZXN0YXJ0czsgY2hhdCBtb2RlbCB1bmFmZmVjdGVkLicsXG4gICAgJ25vdGVzLmFpU3VtbWFyeSc6ICdBSSBzdW1tYXJ5JyxcbiAgICAnbm90ZXMuYWlTdW1tYXJ5UnVuJzogJ1N1bW1hcml6aW5nXHUyMDI2ICgxMC0zMHMpJyxcbiAgICAnbm90ZXMuZXhwYW5kJzogJ0V4cGFuZCcsXG4gICAgJ25vdGVzLmNvbGxhcHNlJzogJ0NvbGxhcHNlJyxcbiAgICAnbm90ZXMuc3VtbWFyeVRhZyc6ICdBSSBzdW1tYXJ5JyxcbiAgICAnbm90ZXMuZW1wdHlTZWFyY2gnOiAnTm8gbWF0Y2hpbmcgbm90ZXMuJyxcbiAgICAnbm90ZXMuY29udGVudEhpbnQnOiAnTm90ZSBjb250ZW50IChtdWx0aS1saW5lKTogY29uY2x1c2lvbnMsIHF1ZXN0aW9ucywgbGVhcm5pbmdzXHUyMDI2JyxcbiAgICAnZnMuYnJvd3NlJzogJ0Jyb3dzZScsXG4gICAgJ2ZzLnVwJzogJ1VwJyxcbiAgICAnZnMudXNlJzogJ1VzZSB0aGlzIGRpcmVjdG9yeScsXG4gICAgJ2ZzLnJlZ2lzdGVyJzogJ0Fsc28gcmVnaXN0ZXIgYXMgc2Vzc2lvbiB3b3Jrc3BhY2UnLFxuICAgICdmcy5sb2FkaW5nJzogJ1JlYWRpbmdcdTIwMjYnLFxuICAgICdmcy5lbXB0eSc6ICdObyBzdWJkaXJlY3Rvcmllcy4nLFxuICAgICdpbXBhY3QuZnVuY3Rpb25zTm9uZSc6ICdObyBmdW5jdGlvbi1sZXZlbCBjYWxsIGltcGFjdCBkZXRlY3RlZCAoc3R5bGUvYXNzZXQvY29uZmlnLW9ubHkgY2hhbmdlKS4nLFxuICAgICdyZXZpZXcuY29sLnNldmVyaXR5JzogJ1NldmVyaXR5JyxcbiAgICAncmV2aWV3LmNvbC5jYXRlZ29yeSc6ICdDYXRlZ29yeScsXG4gICAgJ3Jldmlldy5jb2wudGl0bGUnOiAnSXNzdWUnLFxuICAgICdyZXZpZXcuY29sLmV2aWRlbmNlJzogJ0xvY2F0aW9uJyxcbiAgICAncmV2aWV3LmNvbC5maXgnOiAnU3VnZ2VzdGVkIGZpeCcsXG4gICAgJ3Jldmlldy5oaW50JzogJ0NsaWNrIHRoZSBidXR0b24gYWJvdmUgdG8gcHJvZHVjZSB0aGUgb3B0aW1hbGl0eSB2ZXJkaWN0IGFuZCBpc3N1ZSBsaXN0LicsXG4gICAgJ2RpZmYuc2hvdyc6ICdEaWZmJyxcbiAgICAnZGlmZi5oaWRlJzogJ0hpZGUgZGlmZicsXG5cbiAgICAnZGV0YWlsLnRpdGxlJzogJ1JldmlldyBkZXRhaWwnLFxuICAgICdkZXRhaWwucGljayc6ICdcdTIxOTAgUGljayBhIGNvbW1pdCAob3IgdGhlIHVuY29tbWl0dGVkIGNoYW5nZXMpIG9uIHRoZSBsZWZ0IHRvIHN0YXJ0IHJldmlld2luZycsXG4gICAgJ2RldGFpbC53aGF0JzogJ1doYXQgaXQgZG9lcycsXG4gICAgJ2RldGFpbC5sb2dpYyc6ICdJbXBsZW1lbnRhdGlvbiBsb2dpYycsXG4gICAgJ2RldGFpbC5yaXNrJzogJ1Jpc2tzJyxcbiAgICAnZGV0YWlsLmZpbGVzJzogJ0ZpbGVzJyxcbiAgICAnZGV0YWlsLnBhdGNoJzogJ1Nob3cgcmF3IHBhdGNoJyxcbiAgICAnZGV0YWlsLmFpTG9hZGluZyc6ICdHZW5lcmF0aW5nIEFJIGV4cGxhbmF0aW9uXHUyMDI2ICgxMC0zMHMpJyxcbiAgICAnZGV0YWlsLmltcGFjdCc6ICdJbXBhY3Qgc2NvcGUnLFxuICAgICdkZXRhaWwuaW1wYWN0TG9hZGluZyc6ICdTY2FubmluZyBpbXBhY3RcdTIwMjYgKHJlZmVyZW5jZSBzZWFyY2ggKyBncmFwaCB3YWxrKScsXG4gICAgJ2RldGFpbC5vcHRpbWFsaXR5JzogJ09wdGltYWxpdHkgcmV2aWV3JyxcbiAgICAnZGV0YWlsLm9wdGltYWxpdHlMb2FkaW5nJzogJ1Jldmlld2luZ1x1MjAyNiAocHJvZHVjZXMgaXNzdWUgbGlzdCBhbmQgb3B0aW1hbGl0eSB2ZXJkaWN0KScsXG5cbiAgICAnaW1wYWN0LnJpc2snOiAnUmlzaycsXG4gICAgJ2ltcGFjdC5jb2wuY2hhbmdlZCc6ICdDaGFuZ2VkIGZpbGVzJyxcbiAgICAnaW1wYWN0LmNvbC5pbmRpcmVjdCc6ICdJbmRpcmVjdCAocmVmZXJlbmNlIGNoYWluKScsXG4gICAgJ2ltcGFjdC5jb2wucG90ZW50aWFsJzogJ1BvdGVudGlhbCcsXG4gICAgJ2ltcGFjdC5ub25lJzogJ05vIGluLXJlcG8gcmVmZXJlbmNlcnMgZm91bmQgKHRoZSBjaGFuZ2UgbG9va3Mgc2VsZi1jb250YWluZWQpLicsXG4gICAgJ2ltcGFjdC50ZXN0cyc6ICdSZWxhdGVkIHRlc3RzJyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5jaGFuZ2VkJzogJ2NoYW5nZWQnLFxuICAgICdpbXBhY3QubGVnZW5kLmluZGlyZWN0JzogJ2luZGlyZWN0JyxcbiAgICAnaW1wYWN0LmxlZ2VuZC5wb3RlbnRpYWwnOiAncG90ZW50aWFsJyxcblxuICAgICdyZXZpZXcudmVyZGljdCc6ICdPcHRpbWFsaXR5IHZlcmRpY3QnLFxuICAgICdyZXZpZXcuaXNzdWVzJzogJ0lzc3VlcycsXG4gICAgJ3Jldmlldy5jbGVhbic6ICdObyBpc3N1ZXMgZm91bmQuJyxcblxuICAgICdub3Rlcy50aXRsZSc6ICdSZXZpZXcgbm90ZXMnLFxuICAgICdub3Rlcy5mb3JtVGl0bGUnOiAnTm90ZSB0aXRsZScsXG4gICAgJ25vdGVzLmZvcm1Db250ZW50JzogJ05vdGUgY29udGVudCAoY29uY2x1c2lvbnMsIHF1ZXN0aW9ucywgbGVhcm5pbmdzXHUyMDI2KScsXG4gICAgJ25vdGVzLmFkZCc6ICdBZGQgbm90ZScsXG4gICAgJ25vdGVzLmJvdW5kVG8nOiAnV2lsbCBiZSBsaW5rZWQgdG8nLFxuICAgICdub3Rlcy5jb2wudGltZSc6ICdUaW1lJyxcbiAgICAnbm90ZXMuY29sLnRpdGxlJzogJ1RpdGxlJyxcbiAgICAnbm90ZXMuY29sLmNvbnRlbnQnOiAnQ29udGVudCcsXG4gICAgJ25vdGVzLmNvbC5zaGEnOiAnQ29tbWl0JyxcbiAgICAnbm90ZXMucmVtb3ZlJzogJ0RlbGV0ZScsXG4gICAgJ25vdGVzLmVtcHR5JzogJ05vIG5vdGVzIHlldC4gTm90ZSBkb3duIGNvbmNsdXNpb25zIGFuZCBxdWVzdGlvbnMgd2hpbGUgcmV2aWV3aW5nIGNvbW1pdHMgXHUyMDE0IHRoYXQgaXMgeW91ciBwcm9qZWN0IGxlYXJuaW5nIGFyY2hpdmUuJyxcblxuICAgICdtZW1vcnkucmVjb3JkJzogJ1JlY29yZCBwcm9qZWN0IG1lbW9yeScsXG4gICAgJ2Zvcm0ubWVtb3J5VGl0bGUnOiAnTWVtb3J5IHRpdGxlJyxcbiAgICAnZm9ybS5tZW1vcnlDb250ZW50JzogJ01lbW9yeSBjb250ZW50ICh3aGF0IGFuZCB3aHkpJyxcbiAgICAnbWVtb3J5LmNvbC50aXRsZSc6ICdJdGVtJyxcbiAgICAnbWVtb3J5LmNvbC50eXBlJzogJ1R5cGUnLFxuICAgICdtZW1vcnkuY29sLnRydXRoJzogJ1RydXRoJyxcbiAgICAnbWVtb3J5LmNvbC5icmFuY2gnOiAnQnJhbmNoJyxcbiAgICAnbWVtb3J5LmNvbmZpcm0nOiAnQ29uZmlybScsXG4gICAgJ21lbW9yeS5lbXB0eSc6ICdObyBwcm9qZWN0IG1lbW9yaWVzIHlldC4gQXNrIHRoZSBBSSBpbiBjaGF0IHRvIHJlY29yZCBvbmUsIG9yIGFkZCBhYm92ZS4nLFxuICAgICdjb25jZXB0cy50aXRsZSc6ICdMZWFybmluZyBjb25jZXB0cycsXG4gICAgJ2NvbmNlcHRzLm5vbmUnOiAnTm8gbGVhcm5pbmcgY29uY2VwdHMgeWV0LiBSdW4gc3VtbWFyaXplX2xlYXJuaW5nIG9uIGEgY2hhbmdlIHRvIGFjY3VtdWxhdGUuJyxcbiAgICAnY29uY2VwdHMuY29sLm5hbWUnOiAnQ29uY2VwdCcsXG4gICAgJ2NvbmNlcHRzLmNvbC5jYXRlZ29yeSc6ICdDYXRlZ29yeScsXG4gICAgJ2NvbmNlcHRzLmNvbC5jb3VudCc6ICdDb3VudCcsXG4gICAgJ3Jldmlldy5yZWNvcmRzVGl0bGUnOiAnUmV2aWV3IGlzc3VlcycsXG4gICAgJ3ZlcmlmeS5yZWNvcmRzJzogJ1ZlcmlmaWNhdGlvbiByZWNvcmRzJyxcblxuICAgICdjb25maXJtZWQudGl0bGUnOiAnQ29uZmlybWVkIGNvbnN0cmFpbnRzIChodW1hbi1jb25maXJtZWQ7IEFJIGVkaXRzIHRvIGZvcmJpZGRlbiBwYXRocyBhcmUgYXV0by1kZW5pZWQpJyxcbiAgICAnY29uZmlybWVkLmFkZCc6ICdBZGQgY29uc3RyYWludCcsXG4gICAgJ2NvbmZpcm1lZC50ZXh0JzogJ1JlcXVpcmVtZW50IC8gY29uc3RyYWludCB0ZXh0JyxcbiAgICAnY29uZmlybWVkLnBhdGhzJzogJ0ZvcmJpZGRlbiBwYXRocyAoY29tbWEgc2VwYXJhdGVkLCBvcHRpb25hbCknLFxuICAgICdjb25maXJtZWQubm9uZSc6ICdObyBjb25zdHJhaW50cyB5ZXQuIEFJIGVkaXRzIHRvIGZvcmJpZGRlbiBwYXRocyB3aWxsIGJlIGF1dG8tZGVuaWVkIG9uY2UgYWRkZWQuJyxcblxuICAgICdjaGFuZ2VzLnRpdGxlJzogJ0NoYW5nZSB0YXNrcycsXG4gICAgJ3N0YXRlLm5vQ2hhbmdlcyc6ICdObyBjaGFuZ2UgdGFza3MgeWV0LiBBc2sgdGhlIEFJIGluIGNoYXQgdG8gY3JlYXRlIG9uZSwgb3IgdXNlIFwiQ3JlYXRlIGNoYW5nZVwiIGFib3ZlLicsXG4gICAgJ2NoYW5nZXMuY29sLnRpdGxlJzogJ1RpdGxlJyxcbiAgICAnY2hhbmdlcy5jb2wudHlwZSc6ICdUeXBlJyxcbiAgICAnY2hhbmdlcy5jb2wuc3RhdHVzJzogJ1N0YXR1cycsXG4gICAgJ2NoYW5nZXMuY29sLnVwZGF0ZWQnOiAnVXBkYXRlZCcsXG4gICAgJ2V4ZWMuY29sLnN0YXR1cyc6ICdTdGF0dXMnLFxuICAgICdleGVjLmNvbC5jaGFuZ2UnOiAnQ2hhbmdlJyxcbiAgICAnZXhlYy5jb2wuc3RhcnRlZCc6ICdTdGFydGVkJyxcbiAgICAnZXhlYy5jb2wuY29zdCc6ICdDb3N0IChlc3QpJyxcbiAgICAnZXhlYy5hdHRlbXB0cyc6ICdBdHRlbXB0cycsXG4gICAgJ2V4ZWMuaGludCc6ICdSdW5zIChzdGFydF9ydW4pIGFyZSBzdGFydGVkIGZyb20gY2hhdDogYWZ0ZXIgYSBwbGFuIGV4aXN0cywgdGVsbCB0aGUgQUkgdG8gXCJzdGFydCBydW4gZm9yIHRoZSBjaGFuZ2VcIi4gVGhpcyB0YWIgc2hvd3MgcHJvZ3Jlc3MgYW5kIHJlc3VsdHMuJyxcbiAgICAnc3RhdGUubm9SdW5zJzogJ05vIHJ1bnMgeWV0LicsXG4gICAgJ3N0YXRlLnRlY2hTdGFjayc6ICdUZWNoIHN0YWNrJyxcbiAgICAnc3RhdGUuc3ltYm9scyc6ICdJbmRleGVkIHN5bWJvbHMnLFxuICAgICdzdGF0ZS5tYW5pZmVzdHMnOiAnTWFuaWZlc3RzJyxcbiAgICAnc3RhdGUuZXZpZGVuY2UnOiAnRXZpZGVuY2UgZW50cmllcycsXG4gIH0sXG59IGFzIGNvbnN0XG5cbmZ1bmN0aW9uIGZhbGxiYWNrVChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGRpY3QgPSBXT1JLU1BBQ0VfRElDVC56aCBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG4gIHJldHVybiBkaWN0W2tleV0gPz8ga2V5XG59XG5cbi8qKiBcdTY0Q0RcdTRGNUNcdTdFRDNcdTY3OUNcdTRFQkFcdTYwMjdcdTUzMTZcdUZGMUFcdTI3MTMvXHUyNzE3ICsgXHU2ODA3XHU5MUNGXHU1QjU3XHU2QkI1XHU3Njg0XHU3RDI3XHU1MUQxXHU4ODRDXHVGRjA4XHU4REYzXHU4RkM3XHU1RDRDXHU1OTU3XHU1QkY5XHU4QzYxXHU0RTBFXHU1MzlGXHU1OUNCIEpTT05cdUZGMDlcdTMwMDIgKi9cbmZ1bmN0aW9uIGZvcm1hdEFjdGlvblJlc3VsdChkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IHN0cmluZyB7XG4gIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IFtkYXRhWydvayddID09PSBmYWxzZSA/ICdcdTI3MTcnIDogJ1x1MjcxMyddXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGEpKSB7XG4gICAgaWYgKGtleSA9PT0gJ29rJykgY29udGludWVcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBsaW5lcy5wdXNoKGAke2tleX1cdUZGMUEke1N0cmluZyh2YWx1ZSkuc2xpY2UoMCwgMjAwKX1gKVxuICAgIH1cbiAgfVxuICBpZiAobGluZXMubGVuZ3RoID09PSAxKSBsaW5lcy5wdXNoKCdcdTYyMTBcdTUyOUYnKVxuICByZXR1cm4gbGluZXMuam9pbignXFxuJylcbn1cblxuY29uc3Qgc3R5bGVzOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5DU1NQcm9wZXJ0aWVzPiA9IHtcbiAgcm9vdDoge1xuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgIGhlaWdodDogJzEwMCUnLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyxcbiAgICBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScsXG4gICAgZm9udEZhbWlseTogJ3ZhcigtLWRzLWZvbnQtc2FucywgaW5oZXJpdCknLFxuICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgfSxcbiAgbmF2OiB7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIGdhcDogJzRweCcsXG4gICAgcGFkZGluZzogJzhweCAxMnB4JyxcbiAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMSwgcmdiYSg1LDUsNSwwLjEpKScsXG4gICAgZmxleDogJ25vbmUnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxuICB9LFxuICB0aXRsZTogeyBmb250U2l6ZTogJzEzcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbklubGluZUVuZDogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSxcbiAgdGFiOiAoYWN0aXZlOiBib29sZWFuKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiAoe1xuICAgIHBhZGRpbmc6ICc1cHggMTJweCcsXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcbiAgICBib3JkZXI6ICdub25lJyxcbiAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICBmb250U2l6ZTogJzEycHgnLFxuICAgIGJhY2tncm91bmQ6IGFjdGl2ZSA/ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIDogJ3RyYW5zcGFyZW50JyxcbiAgICBjb2xvcjogYWN0aXZlID8gJyNmZmYnIDogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyxcbiAgfSksXG4gIGJvZHk6IHsgZmxleDogMSwgb3ZlcmZsb3dZOiAnYXV0bycsIHBhZGRpbmc6ICcxNHB4IDE2cHgnIH0sXG4gIGNhcmQ6IHtcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxuICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgcGFkZGluZzogJzEycHggMTRweCcsXG4gICAgbWFyZ2luQm90dG9tOiAnMTJweCcsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1sYXllci0xLCAjZmFmYWZhKScsXG4gIH0sXG4gIHJvdzogeyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzE4cHgnLCBmbGV4V3JhcDogJ3dyYXAnLCBmb250U2l6ZTogJzEycHgnLCBtYXJnaW46ICc2cHggMCcgfSxcbiAgbGFiZWw6IHsgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpbklubGluZUVuZDogJzZweCcgfSxcbiAgdGFibGU6IHsgd2lkdGg6ICcxMDAlJywgYm9yZGVyQ29sbGFwc2U6ICdjb2xsYXBzZScsIGZvbnRTaXplOiAnMTJweCcgfSxcbiAgdGg6IHsgdGV4dEFsaWduOiAnc3RhcnQnLCBwYWRkaW5nOiAnNnB4IDhweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwxLCByZ2JhKDUsNSw1LDAuMSkpJywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGZvbnRXZWlnaHQ6IDUwMCB9LFxuICB0ZDogeyBwYWRkaW5nOiAnNnB4IDhweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwzLCByZ2JhKDUsNSw1LDAuMDYpKScgfSxcbiAgZW1wdHk6IHsgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIGZvbnRTaXplOiAnMTJweCcsIHBhZGRpbmc6ICcxMHB4IDRweCcgfSxcbiAgYnV0dG9uOiB7XG4gICAgcGFkZGluZzogJzVweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGZvbnRTaXplOiAnMTFweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLCBjb2xvcjogJyNmZmYnLFxuICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICB9LFxuICBzZWNvbmRhcnk6IHtcbiAgICBwYWRkaW5nOiAnNXB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICcxMXB4JyxcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctbGF5ZXItMSwgI2ZhZmFmYSknLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScsXG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIH0sXG4gIGlucHV0OiB7XG4gICAgd2lkdGg6ICcxMDAlJywgcGFkZGluZzogJzZweCAxMHB4JywgYm9yZGVyUmFkaXVzOiAnNnB4JywgZm9udFNpemU6ICcxMnB4JyxcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjE1KSknLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScsXG4gICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gIH0sXG4gIGZvcm1Sb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnNnB4JywgbWFyZ2luQm90dG9tOiAnOHB4JyB9LFxuICByZXN1bHQ6IHtcbiAgICB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLCBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjYsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsXG4gICAgYm9yZGVyUmFkaXVzOiAnNnB4JywgcGFkZGluZzogJzEwcHggMTJweCcsIG1heEhlaWdodDogJzMyMHB4Jywgb3ZlcmZsb3dZOiAnYXV0bycsXG4gIH0sXG4gIGJhZGdlOiAoY29sb3I6IHN0cmluZyk6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4gKHtcbiAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgcGFkZGluZzogJzFweCA4cHgnLCBib3JkZXJSYWRpdXM6ICc0cHgnLCBmb250U2l6ZTogJzExcHgnLFxuICAgIGJhY2tncm91bmQ6IGAke2NvbG9yfTIyYCwgY29sb3IsXG4gIH0pLFxuICBzZWN0aW9uVGl0bGU6IHsgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogJzEycHgnLCBtYXJnaW5Cb3R0b206ICc4cHgnIH0sXG4gIHdoYXQ6IHsgZm9udFNpemU6ICcxMnB4JywgbGluZUhlaWdodDogMS43LCBtYXJnaW46ICc0cHggMCA4cHgnIH0sXG4gIGxvZ2ljU3RlcDogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjgsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9LFxuICByaXNrSXRlbTogeyBmb250U2l6ZTogJzEycHgnLCBsaW5lSGVpZ2h0OiAxLjcsIGNvbG9yOiAnIzlhNjcwMCcsIG1hcmdpbjogJzJweCAwJyB9LFxuICBjb21taXRSb3c6IChhY3RpdmU6IGJvb2xlYW4pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+ICh7XG4gICAgcGFkZGluZzogJzhweCAxMHB4JyxcbiAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxuICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGJvcmRlcjogYWN0aXZlID8gJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIDogJzFweCBzb2xpZCB0cmFuc3BhcmVudCcsXG4gICAgYmFja2dyb3VuZDogYWN0aXZlID8gJ3JnYmEoMzcsOTksMjM1LDAuMDYpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgbWFyZ2luQm90dG9tOiAnNHB4JyxcbiAgfSksXG4gIGNvbW1pdFN1YmplY3Q6IHsgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwLCBsaW5lSGVpZ2h0OiAxLjUsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9LFxuICBjb21taXRNZXRhOiB7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknLCBtYXJnaW5Ub3A6ICcycHgnLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcgfSxcbiAgcGF0Y2g6IHtcbiAgICBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4JywgbGluZUhlaWdodDogMS41LCB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLCBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjA4KSknLFxuICAgIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICcxMHB4JywgbWF4SGVpZ2h0OiAnMzIwcHgnLCBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgfSxcbiAgdGV4dGFyZWE6IHtcbiAgICB3aWR0aDogJzEwMCUnLCBwYWRkaW5nOiAnOHB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBmb250U2l6ZTogJzEycHgnLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWRzdy1hbGlhcy1iZy1iYXNlLCAjZmZmKScsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJyxcbiAgICBib3hTaXppbmc6ICdib3JkZXItYm94JywgcmVzaXplOiAndmVydGljYWwnLCBsaW5lSGVpZ2h0OiAxLjcsIGZvbnRGYW1pbHk6ICdpbmhlcml0JyxcbiAgfSxcbiAgbm90ZUNhcmQ6IHtcbiAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tZHN3LWFsaWFzLWJvcmRlci1sMiwgcmdiYSg1LDUsNSwwLjEpKScsXG4gICAgYm9yZGVyUmFkaXVzOiAnOHB4JywgcGFkZGluZzogJzEycHggMTRweCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnLFxuICAgIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknLFxuICB9LFxuICBub3RlVGl0bGVSb3c6IHsgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsIGdhcDogJzhweCcgfSxcbiAgbm90ZVRpdGxlVGV4dDogeyBmb250U2l6ZTogJzEzcHgnLCBmb250V2VpZ2h0OiA2MDAsIGxpbmVIZWlnaHQ6IDEuNSB9LFxuICBub3RlQ29udGVudDoge1xuICAgIGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuODUsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLXdvcmQnLFxuICAgIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXByaW1hcnksICMxZjIzMjgpJywgbWFyZ2luVG9wOiAnNnB4JyxcbiAgfSxcbiAgbm90ZUNsYW1wOiB7XG4gICAgZGlzcGxheTogJy13ZWJraXQtYm94JywgV2Via2l0TGluZUNsYW1wOiA2LCBXZWJraXRCb3hPcmllbnQ6ICd2ZXJ0aWNhbCcsIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgfSxcbiAgbm90ZU1ldGE6IHtcbiAgICBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luVG9wOiAnOHB4JyxcbiAgICBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyxcbiAgfSxcbiAgbGlua0J0bjoge1xuICAgIGJhY2tncm91bmQ6ICdub25lJywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzExcHgnLCBwYWRkaW5nOiAnMCcsXG4gICAgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknLFxuICB9LFxuICBjaGlwOiAoYWN0aXZlOiBib29sZWFuKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiAoe1xuICAgIHBhZGRpbmc6ICcycHggMTBweCcsIGJvcmRlclJhZGl1czogJzk5OXB4JywgZm9udFNpemU6ICcxMXB4JywgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgY29sb3I6IGFjdGl2ZSA/ICcjZmZmJyA6ICdpbmhlcml0JyxcbiAgfSksXG59XG5cbi8qKiBcdTk4Q0VcdTk2NjlcdTdCNDlcdTdFQTcgXHUyMTkyIFx1NUZCRFx1N0FFMFx1OTg5Q1x1ODI3Mlx1MzAwMiAqL1xuY29uc3QgUklTS19DT0xPUjogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgbG93OiAnIzRlYzliMCcsIG1lZGl1bTogJyNkY2RjYWEnLCBoaWdoOiAnI2NlOTE3OCcsIGNyaXRpY2FsOiAnI2YxNGM0YycgfVxuXG4vKipcbiAqIFx1NUY3MVx1NTRDRFx1ODMwM1x1NTZGNCBTVkcgXHU2RDQxXHU3QTBCXHU1NkZFXHVGRjFBXHU0RTA5XHU1MjE3XHU1MjA2XHU1QzQyXHVGRjA4XHU1M0Q4XHU2NkY0IFx1MjE5MiBcdTk1RjRcdTYzQTVcdTVGMTVcdTc1MjhcdTk0RkUgXHUyMTkyIFx1NkY1Q1x1NTcyOFx1RkYwOVx1RkYwQ1xuICogXHU0RjlEXHU2MzZFIC9pbXBhY3Qtc2NvcGUgXHU4RkQ0XHU1NkRFXHU3Njg0IGxldmVsc1x1RkYwOFx1NTQyQlx1NEYyMFx1NjRBRFx1OTRGRSByZWFzb25cdUZGMDlcdTdFRDhcdTUyMzZcdThGREVcdTdFQkZcdTMwMDJcbiAqIFx1NTE2OFx1NUJCRFx1NzUzQlx1NUUwM1x1RkYwOHZpZXdCb3ggMTAwMFx1RkYwOVx1RkYwQ1x1ODI4Mlx1NzBCOVx1NUUyNlx1NzZFRVx1NUY1NVx1NjNEMFx1NzkzQVx1RkYwQ1x1NkRGMVx1NUVBNlx1OEQ4QVx1NkRGMVx1OTg5Q1x1ODI3Mlx1OEQ4QVx1NkQ0NVx1MzAwMlxuICovXG5mdW5jdGlvbiBJbXBhY3RHcmFwaChwcm9wczogeyBkYXRhOiBJbXBhY3RTY29wZVBheWxvYWQ7IHQ6IChrZXk6IHN0cmluZykgPT4gc3RyaW5nIH0pIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBwcm9wc1xuICBjb25zdCBpbmRpcmVjdCA9IGRhdGEubGV2ZWxzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5sZXZlbCA9PT0gJ2luZGlyZWN0JylcbiAgY29uc3QgcG90ZW50aWFsID0gZGF0YS5sZXZlbHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmxldmVsID09PSAncG90ZW50aWFsJylcbiAgY29uc3QgY29sMCA9IGRhdGEuY2hhbmdlZEZpbGVzLnNsaWNlKDAsIDcpXG4gIGNvbnN0IGNvbDEgPSBBcnJheS5mcm9tKG5ldyBTZXQoaW5kaXJlY3QubWFwKChpdGVtKSA9PiBpdGVtLnBhdGgpKSkuc2xpY2UoMCwgOSlcbiAgY29uc3QgY29sMiA9IEFycmF5LmZyb20obmV3IFNldChwb3RlbnRpYWwubWFwKChpdGVtKSA9PiBpdGVtLnBhdGgpKSkuZmlsdGVyKChwKSA9PiAhY29sMS5pbmNsdWRlcyhwKSkuc2xpY2UoMCwgOClcbiAgY29uc3Qgbm9kZUggPSAzMFxuICBjb25zdCBnYXAgPSAxMFxuICBjb25zdCBjb2xYID0gWzMwLCAzODAsIDcyMF1cbiAgY29uc3QgY29sVyA9IDI4MFxuICBjb25zdCByb3dzID0gTWF0aC5tYXgoY29sMC5sZW5ndGgsIGNvbDEubGVuZ3RoLCBjb2wyLmxlbmd0aCwgMSlcbiAgY29uc3QgaGVpZ2h0ID0gcm93cyAqIChub2RlSCArIGdhcCkgKyA2MFxuXG4gIGNvbnN0IGRlcHRoT2YgPSAocGF0aDogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBpdGVtID0gaW5kaXJlY3QuZmluZCgoZW50cnkpID0+IGVudHJ5LnBhdGggPT09IHBhdGgpID8/IHBvdGVudGlhbC5maW5kKChlbnRyeSkgPT4gZW50cnkucGF0aCA9PT0gcGF0aClcbiAgICByZXR1cm4gaXRlbT8uZGVwdGggPz8gMFxuICB9XG5cbiAgY29uc3QgcmVuZGVyQ29sID0gKGNvbDogbnVtYmVyLCBpdGVtczogc3RyaW5nW10sIGNvbG9yOiBzdHJpbmcpOiBSZWFjdC5SZWFjdE5vZGVbXSA9PiBpdGVtcy5tYXAoKHBhdGgsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgeSA9IDQ0ICsgaW5kZXggKiAobm9kZUggKyBnYXApXG4gICAgY29uc3QgZGlyID0gcGF0aC5pbmNsdWRlcygnLycpID8gcGF0aC5zbGljZSgwLCBwYXRoLmxhc3RJbmRleE9mKCcvJykpIDogJydcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZycsIHsga2V5OiBgJHtjb2x9LSR7cGF0aH1gIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdyZWN0JywgeyB4OiBjb2xYW2NvbF0sIHksIHdpZHRoOiBjb2xXLCBoZWlnaHQ6IG5vZGVILCByeDogNiwgZmlsbDogY29sb3IsIHN0cm9rZTogJ3JnYmEoMCwwLDAsMC4zKScsIHN0cm9rZVdpZHRoOiAxIH0pLFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgndGV4dCcsIHsgeDogY29sWFtjb2xdICsgMTAsIHk6IHkgKyAxNCwgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA3MDAsIGZpbGw6ICcjZmZmZmZmJyB9LFxuICAgICAgICAocGF0aC5zcGxpdCgnLycpLnBvcCgpID8/IHBhdGgpLnNsaWNlKDAsIDMwKSksXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCd0ZXh0JywgeyB4OiBjb2xYW2NvbF0gKyAxMCwgeTogeSArIDI2LCBmb250U2l6ZTogMTAsIGZpbGw6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpJyB9LFxuICAgICAgICBkaXIuc2xpY2UoMCwgNDApKSxcbiAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3RpdGxlJywgbnVsbCwgcGF0aCksXG4gICAgKVxuICB9KVxuXG4gIGNvbnN0IGNoYWluU3RhcnQgPSAocmVhc29uOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IG1hdGNoID0gcmVhc29uLm1hdGNoKC9wYXRoOiAoLispJC8pXG4gICAgaWYgKG1hdGNoID09PSBudWxsKSByZXR1cm4gZGF0YS5jaGFuZ2VkRmlsZXNbMF0gPz8gJydcbiAgICByZXR1cm4gbWF0Y2hbMV0hLnNwbGl0KCcgLT4gJylbMF0gPz8gZGF0YS5jaGFuZ2VkRmlsZXNbMF0gPz8gJydcbiAgfVxuICBjb25zdCBpbmRleEluID0gKGl0ZW1zOiBzdHJpbmdbXSwgcGF0aDogc3RyaW5nKTogbnVtYmVyID0+IGl0ZW1zLmluZGV4T2YocGF0aClcbiAgY29uc3QgY29sT2YgPSAocGF0aDogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICBpZiAoY29sMC5pbmNsdWRlcyhwYXRoKSkgcmV0dXJuIDBcbiAgICBpZiAoY29sMS5pbmNsdWRlcyhwYXRoKSkgcmV0dXJuIDFcbiAgICBpZiAoY29sMi5pbmNsdWRlcyhwYXRoKSkgcmV0dXJuIDJcbiAgICByZXR1cm4gLTFcbiAgfVxuXG4gIGNvbnN0IGVkZ2VzOiBSZWFjdC5SZWFjdE5vZGVbXSA9IFtdXG4gIGNvbnN0IHB1c2hFZGdlID0gKGZyb21QYXRoOiBzdHJpbmcsIHRvUGF0aDogc3RyaW5nLCBjb2xvcjogc3RyaW5nLCBrZXk6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGZyb21Db2wgPSBjb2xPZihmcm9tUGF0aClcbiAgICBjb25zdCB0b0NvbCA9IGNvbE9mKHRvUGF0aClcbiAgICBpZiAoZnJvbUNvbCA9PT0gLTEgfHwgdG9Db2wgPT09IC0xIHx8IHRvQ29sIDw9IGZyb21Db2wpIHJldHVyblxuICAgIGNvbnN0IHgxID0gY29sWFtmcm9tQ29sXSArIGNvbFdcbiAgICBjb25zdCB5MSA9IDQ0ICsgaW5kZXhJbihbY29sMCwgY29sMSwgY29sMl1bZnJvbUNvbF0gPz8gW10sIGZyb21QYXRoKSAqIChub2RlSCArIGdhcCkgKyBub2RlSCAvIDJcbiAgICBjb25zdCB4MiA9IGNvbFhbdG9Db2xdXG4gICAgY29uc3QgeTIgPSA0NCArIGluZGV4SW4oW2NvbDAsIGNvbDEsIGNvbDJdW3RvQ29sXSA/PyBbXSwgdG9QYXRoKSAqIChub2RlSCArIGdhcCkgKyBub2RlSCAvIDJcbiAgICBlZGdlcy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3BhdGgnLCB7XG4gICAgICBrZXksIGQ6IGBNICR7eDF9ICR7eTF9IEMgJHt4MSArIDMwfSAke3kxfSwgJHt4MiAtIDMwfSAke3kyfSwgJHt4Mn0gJHt5Mn1gLFxuICAgICAgZmlsbDogJ25vbmUnLCBzdHJva2U6IGNvbG9yLCBzdHJva2VXaWR0aDogMS42LCBvcGFjaXR5OiAwLjYsXG4gICAgfSkpXG4gIH1cbiAgZm9yIChjb25zdCBpdGVtIG9mIGluZGlyZWN0LnNsaWNlKDAsIDIwKSkgcHVzaEVkZ2UoY2hhaW5TdGFydChpdGVtLnJlYXNvbiksIGl0ZW0ucGF0aCwgJyNkOTc3MDYnLCBgZWktJHtpdGVtLnBhdGh9YClcbiAgZm9yIChjb25zdCBpdGVtIG9mIHBvdGVudGlhbC5zbGljZSgwLCAxNikpIHB1c2hFZGdlKGNoYWluU3RhcnQoaXRlbS5yZWFzb24pLCBpdGVtLnBhdGgsICcjOGI4YjhiJywgYGVwLSR7aXRlbS5wYXRofWApXG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIG51bGwsXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc3ZnJywgeyB3aWR0aDogJzEwMCUnLCB2aWV3Qm94OiBgMCAwIDEwMjQgJHtoZWlnaHR9YCwgc3R5bGU6IHsgbWF4SGVpZ2h0OiA0ODAgfSB9LFxuICAgICAgW1snXHU1M0Q4XHU2NkY0XHU2NTg3XHU0RUY2JywgMF0sIFsnXHU5NUY0XHU2M0E1XHU1RjcxXHU1NENEXHVGRjA4XHU4QzAxXHU1RjE1XHU3NTI4XHU0RTg2XHU1QjgzXHVGRjA5JywgMV0sIFsnXHU2RjVDXHU1NzI4XHU1RjcxXHU1NENEXHVGRjA4XHU0RThDXHU3RUE3XHU0RjIwXHU2NEFEXHVGRjA5JywgMl1dLm1hcCgoW25hbWUsIGNvbF0pID0+XG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3RleHQnLCB7IGtleTogU3RyaW5nKGNvbCksIHg6IGNvbFhbY29sIGFzIG51bWJlcl0sIHk6IDI0LCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgZmlsbDogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSwgbmFtZSBhcyBzdHJpbmcpKSxcbiAgICAgIHJlbmRlckNvbCgwLCBjb2wwLCAnIzI1NjNlYicpLFxuICAgICAgcmVuZGVyQ29sKDEsIGNvbDEsICcjZDk3NzA2JyksXG4gICAgICByZW5kZXJDb2woMiwgY29sMiwgJyM4YjhiOGInKSxcbiAgICAgIGVkZ2VzLFxuICAgICksXG4gIClcbn1cblxuY29uc3QgRElGRl9LRVlXT1JEUyA9IC9cXGIocHVibGljfHByaXZhdGV8cHJvdGVjdGVkfGludGVybmFsfHN0YXRpY3x2b2lkfGNsYXNzfHN0cnVjdHxpbnRlcmZhY2V8ZW51bXxuZXd8cmV0dXJufGlmfGVsc2V8Zm9yfGZvcmVhY2h8d2hpbGV8c3dpdGNofGNhc2V8YnJlYWt8Y29udGludWV8dHJ5fGNhdGNofGZpbmFsbHl8dGhyb3d8dXNpbmd8bmFtZXNwYWNlfGltcG9ydHxleHBvcnR8ZnJvbXxjb25zdHxsZXR8dmFyfGFzeW5jfGF3YWl0fGZ1bmN0aW9ufHRoaXN8YmFzZXxzdXBlcnxudWxsfHRydWV8ZmFsc2V8b3ZlcnJpZGV8dmlydHVhbHxhYnN0cmFjdHxzZWFsZWR8cmVhZG9ubHl8cGFyYW1zfG91dHxyZWZ8eWllbGR8dHlwZW9mfGluc3RhbmNlb2Z8aW58b2Z8ZGVmYXVsdHxzdHJpbmd8aW50fGxvbmd8ZG91YmxlfGZsb2F0fGJvb2x8Y2hhcnxkZWNpbWFsfG9iamVjdHxyZWNvcmR8cGFydGlhbHxnZXR8c2V0fHJlcXVpcmV8bW9kdWxlfHR5cGV8aW1wbGVtZW50c3xleHRlbmRzKVxcYi9nXG5cbi8qKiBcdTUzNTVcdTg4NENcdTRFRTNcdTc4MDFcdTlBRDhcdTRFQUVcdUZGMUFcdTZDRThcdTkxQ0EgPiBcdTVCNTdcdTdCMjZcdTRFMzIgPiBcdTUxNzNcdTk1MkVcdTVCNTcvXHU2NTcwXHU1QjU3IFx1NEUwOVx1NUM0Mlx1Nzc0MFx1ODI3Mlx1RkYwOFx1OEY3Qlx1OTFDRlx1NkI2M1x1NTIxOVx1RkYwQ1x1NTkxRlx1NjgzOFx1NjdFNVx1NzUyOFx1RkYwOVx1MzAwMiAqL1xuZnVuY3Rpb24gaGlnaGxpZ2h0Q29kZUxpbmUobGluZTogc3RyaW5nLCBrZXlQcmVmaXg6IHN0cmluZyk6IFJlYWN0LlJlYWN0Tm9kZVtdIHtcbiAgY29uc3QgdHJpbW1lZCA9IGxpbmUudHJpbVN0YXJ0KClcbiAgaWYgKHRyaW1tZWQuc3RhcnRzV2l0aCgnLy8nKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJy8vLycpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnKicpIHx8IHRyaW1tZWQuc3RhcnRzV2l0aCgnLyonKSB8fCB0cmltbWVkLnN0YXJ0c1dpdGgoJyMnKSkge1xuICAgIHJldHVybiBbUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsga2V5OiBgJHtrZXlQcmVmaXh9LWNgLCBzdHlsZTogeyBjb2xvcjogJyM2YTk5NTUnIH0gfSwgbGluZSldXG4gIH1cbiAgY29uc3QgcGFydHMgPSBsaW5lLnNwbGl0KC8oXCIoPzpbXlwiXFxcXF18XFxcXC4pKlwifCcoPzpbXidcXFxcXXxcXFxcLikqJ3xgKD86W15gXFxcXF18XFxcXC4pKmApL2cpXG4gIHJldHVybiBwYXJ0cy5tYXAoKHBhcnQsIGkpID0+IHtcbiAgICBpZiAoaSAlIDIgPT09IDEpIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBrZXk6IGAke2tleVByZWZpeH0tcyR7aX1gLCBzdHlsZTogeyBjb2xvcjogJyNjZTkxNzgnIH0gfSwgcGFydClcbiAgICBjb25zdCBzdWI6IFJlYWN0LlJlYWN0Tm9kZVtdID0gW11cbiAgICBsZXQgbGFzdCA9IDBcbiAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIHBhcnQubWF0Y2hBbGwoRElGRl9LRVlXT1JEUykpIHtcbiAgICAgIGlmIChtYXRjaC5pbmRleCEgPiBsYXN0KSBzdWIucHVzaChwYXJ0LnNsaWNlKGxhc3QsIG1hdGNoLmluZGV4KSlcbiAgICAgIHN1Yi5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IGtleTogYCR7a2V5UHJlZml4fS1rJHtpfS0ke21hdGNoLmluZGV4fWAsIHN0eWxlOiB7IGNvbG9yOiAnIzU2OWNkNicgfSB9LCBtYXRjaFswXSkpXG4gICAgICBsYXN0ID0gbWF0Y2guaW5kZXghICsgbWF0Y2hbMF0ubGVuZ3RoXG4gICAgfVxuICAgIGlmIChsYXN0IDwgcGFydC5sZW5ndGgpIHN1Yi5wdXNoKHBhcnQuc2xpY2UobGFzdCkpXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIHsga2V5OiBgJHtrZXlQcmVmaXh9LXAke2l9YCB9LCBzdWIpXG4gIH0pXG59XG5cbi8qKiBcdTlBRDhcdTRFQUVcdTVERUVcdTVGMDJcdTg5QzZcdTU2RkVcdUZGMUFcdTg5RTNcdTY3OTAgdW5pZmllZCBkaWZmXHVGRjBDXHU2MzA5IFx1NTg5RS9cdTUyMjAvXHU1NzU3XHU1OTM0L1x1NEUwQVx1NEUwQlx1NjU4NyBcdTc3NDBcdTgyNzJcdTMwMDIgKi9cbmZ1bmN0aW9uIERpZmZWaWV3KHByb3BzOiB7IHBhdGNoOiBzdHJpbmcgfSkge1xuICBjb25zdCBsaW5lcyA9IHByb3BzLnBhdGNoLnNwbGl0KCdcXG4nKS5maWx0ZXIoKGxpbmUsIGkpID0+ICEobGluZSA9PT0gJycgJiYgaSA9PT0gcHJvcHMucGF0Y2guc3BsaXQoJ1xcbicpLmxlbmd0aCAtIDEpKVxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgIHN0eWxlOiB7XG4gICAgICBmb250RmFtaWx5OiAnQ29uc29sYXMsIG1vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIGxpbmVIZWlnaHQ6IDEuNTUsXG4gICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4wOCkpJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMCcsIG1heEhlaWdodDogNDIwLCBvdmVyZmxvd1k6ICdhdXRvJywgbWFyZ2luVG9wOiAnNnB4JyxcbiAgICB9LFxuICB9LCBsaW5lcy5tYXAoKGxpbmUsIGkpID0+IHtcbiAgICBjb25zdCBraW5kID0gbGluZS5zdGFydHNXaXRoKCcrKysnKSB8fCBsaW5lLnN0YXJ0c1dpdGgoJy0tLScpID8gJ21ldGEnXG4gICAgICA6IGxpbmUuc3RhcnRzV2l0aCgnQEAnKSA/ICdodW5rJ1xuICAgICAgICA6IGxpbmUuc3RhcnRzV2l0aCgnKycpID8gJ2FkZCdcbiAgICAgICAgICA6IGxpbmUuc3RhcnRzV2l0aCgnLScpID8gJ2RlbCcgOiAnY3R4J1xuICAgIGNvbnN0IGJnID0ga2luZCA9PT0gJ2FkZCcgPyAncmdiYSg0NiwxNjAsNjcsMC4xNCknIDoga2luZCA9PT0gJ2RlbCcgPyAncmdiYSgyNDgsODEsNzMsMC4xMyknIDoga2luZCA9PT0gJ2h1bmsnID8gJ3JnYmEoNTYsMTM5LDI1MywwLjEpJyA6ICd0cmFuc3BhcmVudCdcbiAgICBjb25zdCBjb250ZW50ID0ga2luZCA9PT0gJ21ldGEnIHx8IGtpbmQgPT09ICdodW5rJ1xuICAgICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBzdHlsZTogeyBjb2xvcjogJyMzODhiZmQnLCBmb250V2VpZ2h0OiA2MDAgfSB9LCBsaW5lKVxuICAgICAgOiBraW5kID09PSAnYWRkJyB8fCBraW5kID09PSAnZGVsJ1xuICAgICAgICA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IHN0eWxlOiB7IGNvbG9yOiBraW5kID09PSAnYWRkJyA/ICcjMWE3ZjM3JyA6ICcjY2YyMjJlJywgZm9udFdlaWdodDogNjAwIH0gfSwgbGluZVswXSlcbiAgICAgICAgOiBudWxsXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsga2V5OiBpLCBzdHlsZTogeyBwYWRkaW5nOiAnMCAxMHB4JywgYmFja2dyb3VuZDogYmcsIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfSB9LFxuICAgICAgY29udGVudCxcbiAgICAgIGtpbmQgPT09ICdhZGQnIHx8IGtpbmQgPT09ICdkZWwnID8gaGlnaGxpZ2h0Q29kZUxpbmUobGluZS5zbGljZSgxKSwgYGwke2l9YCkgOiBoaWdobGlnaHRDb2RlTGluZShsaW5lLCBgbCR7aX1gKSxcbiAgICApXG4gIH0pKVxufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lKHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiAnXHUyMDE0J1xuICByZXR1cm4gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlU3RyaW5nKClcbn1cblxuLyoqIFx1NEU4Q1x1NkIyMVx1Nzg2RVx1OEJBNFx1NUYzOVx1N0E5N1x1RkYxQVx1OTA2RVx1N0Y2OSArIFx1NUM0NVx1NEUyRFx1NTM2MVx1NzI0N1x1RkYwQ1x1NTM3MVx1OTY2OVx1NjRDRFx1NEY1Q1x1RkYwOFx1NTIyMFx1OTY2NFx1N0IxNFx1OEJCMC9cdTUzRDhcdTY2RjQvXHU3RUE2XHU2NzVGXHVGRjA5XHU1MTcxXHU3NTI4XHUzMDAyICovXG5mdW5jdGlvbiBDb25maXJtRGlhbG9nKHByb3BzOiB7IHRpdGxlOiBzdHJpbmc7IG1lc3NhZ2U6IHN0cmluZzsgZGFuZ2VyPzogYm9vbGVhbjsgb25DYW5jZWw6ICgpID0+IHZvaWQ7IG9uQ29uZmlybTogKCkgPT4gdm9pZCB9KSB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLW92ZXJsYXknLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsIGluc2V0OiAwLCB6SW5kZXg6IDk5OSxcbiAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMTUsMjMsNDIsMC40NSknLCBiYWNrZHJvcEZpbHRlcjogJ2JsdXIoMnB4KScsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgYW5pbWF0aW9uOiAncGNGYWRlSW4gMC4xNXMgZWFzZS1vdXQnLFxuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6IHByb3BzLm9uQ2FuY2VsLFxuICAgIH0sXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLWNhcmQnLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHdpZHRoOiA0MDAsIG1heFdpZHRoOiAnY2FsYygxMDB2dyAtIDQ4cHgpJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JywgYm94U2hhZG93OiAnMCAyMHB4IDUwcHggcmdiYSgwLDAsMCwwLjI1KScsXG4gICAgICAgICAgcGFkZGluZzogJzIwcHggMjJweCAxNnB4JyxcbiAgICAgICAgICBvbkNsaWNrOiAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCBnYXA6ICcxMHB4JyB9IH0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgd2lkdGg6IDM0LCBoZWlnaHQ6IDM0LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBmbGV4U2hyaW5rOiAwLFxuICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnMTdweCcsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHByb3BzLmRhbmdlciA/ICdyZ2JhKDI0NCw2Myw5NCwwLjEyKScgOiAncmdiYSgzNyw5OSwyMzUsMC4xKScsXG4gICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5kYW5nZXIgPyAnI2UxMWQ0OCcgOiAnIzI1NjNlYicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sIHByb3BzLmRhbmdlciA/ICchJyA6ICc/JyksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHsgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogNjAwLCBtYXJnaW5Cb3R0b206ICc2cHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1wcmltYXJ5LCAjMWYyMzI4KScgfSB9LCBwcm9wcy50aXRsZSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRTaXplOiAnMTJweCcsIGxpbmVIZWlnaHQ6IDEuNywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfSB9LCBwcm9wcy5tZXNzYWdlKSxcbiAgICAgICAgICApLFxuICAgICAgICApLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsIGdhcDogJzEwcHgnLCBtYXJnaW5Ub3A6ICcxOHB4JyB9IH0sXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xuICAgICAgICAgICAgc3R5bGU6IHsgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzdweCAxOHB4JywgYm9yZGVyUmFkaXVzOiAnOHB4JyB9LFxuICAgICAgICAgICAgb25DbGljazogcHJvcHMub25DYW5jZWwsXG4gICAgICAgICAgfSwgJ1x1NTNENlx1NkQ4OCcpLFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtcbiAgICAgICAgICAgICdkYXRhLXRlc3RpZCc6ICdwYy1jb25maXJtLW9rJyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc3cHggMThweCcsIGJvcmRlclJhZGl1czogJzhweCcsIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNTAwLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBwcm9wcy5kYW5nZXIgPyAnI2UxMWQ0OCcgOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJywgY29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNsaWNrOiBwcm9wcy5vbkNvbmZpcm0sXG4gICAgICAgICAgfSwgJ1x1Nzg2RVx1OEJBNFx1NTIyMFx1OTY2NCcpLFxuICAgICAgICApLFxuICAgICAgKSxcbiAgICApLFxuICApXG59XG5cbi8qKiBcdTlBQThcdTY3QjZcdTVDMEZcdTUzNjFcdTcyNDdcdTMwMDIgKi9cbmZ1bmN0aW9uIENhcmQocHJvcHM6IHsgdGl0bGU/OiBzdHJpbmc7IGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlIH0pIHtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5jYXJkIH0sXG4gICAgcHJvcHMudGl0bGUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiBzdHlsZXMuc2VjdGlvblRpdGxlIH0sIHByb3BzLnRpdGxlKSxcbiAgICBwcm9wcy5jaGlsZHJlbilcbn1cblxuLyoqXG4gKiBcdTVERTVcdTRGNUNcdTUzRjBcdTRFM0JcdTdFQzRcdTRFRjZcdUZGMUFcdTU2REJcdTk4NzVcdTdCN0VcdUZGMDhcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTRFM0FcdTlFRDhcdThCQTRcdUZGMDkrIFx1OEY2RVx1OEJFMlx1NUJCRlx1NEUzQiBBUEkgKyBcdTYzMDlcdTk0QUVcdTUzMTZcdTY0Q0RcdTRGNUNcdTMwMDJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFdvcmtzcGFjZUZyYW1lKHByb3BzOiBXb3Jrc3BhY2VGcmFtZVByb3BzKSB7XG4gIGNvbnN0IHQgPSBwcm9wcy50ID8/IGZhbGxiYWNrVFxuICBjb25zdCBbdGFiLCBzZXRUYWJdID0gdXNlU3RhdGU8VGFiS2V5PignY29tbWl0cycpXG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGU8V29ya3NwYWNlU3RhdGUgfCBudWxsPihudWxsKVxuICBjb25zdCBbbG9hZEVycm9yLCBzZXRMb2FkRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2Jvb3RzdHJhcHBpbmcsIHNldEJvb3RzdHJhcHBpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFthY3Rpb25SZXN1bHQsIHNldEFjdGlvblJlc3VsdF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuICBjb25zdCBbY2hhbmdlVGl0bGUsIHNldENoYW5nZVRpdGxlXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbY2hhbmdlRGVzYywgc2V0Q2hhbmdlRGVzY10gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW21lbW9yeVRpdGxlLCBzZXRNZW1vcnlUaXRsZV0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW21lbW9yeUNvbnRlbnQsIHNldE1lbW9yeUNvbnRlbnRdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtjb25maXJtZWRUZXh0LCBzZXRDb25maXJtZWRUZXh0XSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbY29uZmlybWVkUGF0aHMsIHNldENvbmZpcm1lZFBhdGhzXSA9IHVzZVN0YXRlKCcnKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTYzRDBcdTRFQTRcdTY4MzhcdTY3RTVcdTcyQjZcdTYwMDEgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IFtjb21taXRzRGF0YSwgc2V0Q29tbWl0c0RhdGFdID0gdXNlU3RhdGU8Q29tbWl0c1BheWxvYWQgfCBudWxsPihudWxsKVxuICBjb25zdCBbY29tbWl0c0Vycm9yLCBzZXRDb21taXRzRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW3BpY2tlck9wZW4sIHNldFBpY2tlck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtwaWNrZXJGaWx0ZXIsIHNldFBpY2tlckZpbHRlcl0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW3NlbGVjdGVkVGFyZ2V0cywgc2V0U2VsZWN0ZWRUYXJnZXRzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXSlcbiAgY29uc3QgW2RldGFpbHMsIHNldERldGFpbHNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgQ29tbWl0RGV0YWlsUGF5bG9hZD4+KHt9KVxuICBjb25zdCBbZGV0YWlsTG9hZGluZywgc2V0RGV0YWlsTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2ltcGFjdCwgc2V0SW1wYWN0XSA9IHVzZVN0YXRlPEltcGFjdFNjb3BlUGF5bG9hZCB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtpbXBhY3RMb2FkaW5nLCBzZXRJbXBhY3RMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbcmV2aWV3cywgc2V0UmV2aWV3c10gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBSZXZpZXdQYXlsb2FkPj4oe30pXG4gIGNvbnN0IFtyZXZpZXdMb2FkaW5nLCBzZXRSZXZpZXdMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbZmlsZURpZmZzLCBzZXRGaWxlRGlmZnNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oe30pXG4gIGNvbnN0IFtjb25maXJtRGlhbG9nLCBzZXRDb25maXJtRGlhbG9nXSA9IHVzZVN0YXRlPHsgdGl0bGU6IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nOyBkYW5nZXI/OiBib29sZWFuOyBvbkNvbmZpcm06ICgpID0+IHZvaWQgfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtub3Rlcywgc2V0Tm90ZXNdID0gdXNlU3RhdGU8Tm90ZUVudHJ5W10+KFtdKVxuICBjb25zdCBbbm90ZVRpdGxlLCBzZXROb3RlVGl0bGVdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtub3RlQ29udGVudCwgc2V0Tm90ZUNvbnRlbnRdID0gdXNlU3RhdGUoJycpXG4gIGNvbnN0IFtlZGl0aW5nTm90ZSwgc2V0RWRpdGluZ05vdGVdID0gdXNlU3RhdGU8eyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmcgfSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtub3RlU2VhcmNoLCBzZXROb3RlU2VhcmNoXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbbm90ZUV4cGFuZGVkLCBzZXROb3RlRXhwYW5kZWRdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KVxuICBjb25zdCBbYWlTdW1tYXJpemluZywgc2V0QWlTdW1tYXJpemluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW21vZGVsVGllcnMsIHNldE1vZGVsVGllcnNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgeyBwcm92aWRlcjogc3RyaW5nOyBtb2RlbDogc3RyaW5nIH0+IHwgbnVsbD4obnVsbClcbiAgY29uc3QgW21vZGVsT3B0aW9ucywgc2V0TW9kZWxPcHRpb25zXSA9IHVzZVN0YXRlPEFycmF5PHsgcHJvdmlkZXI6IHN0cmluZzsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nIH0+PihbXSlcbiAgY29uc3QgW21vZGVsU2F2aW5nLCBzZXRNb2RlbFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW21vZGVsU2F2ZWQsIHNldE1vZGVsU2F2ZWRdID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtleGVjVGl0bGUsIHNldEV4ZWNUaXRsZV0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW2V4ZWNEZXNjLCBzZXRFeGVjRGVzY10gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW21lbW9yeUJyYW5jaCwgc2V0TWVtb3J5QnJhbmNoXSA9IHVzZVN0YXRlKCcnKVxuXG4gIGNvbnN0IHBvc3QgPSBhc3luYyAocGF0aDogc3RyaW5nLCBib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8eyBvazogYm9vbGVhbjsgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfT4gPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocGF0aCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgLi4uYm9keSwgc2Vzc2lvbklkOiBwcm9wcy5zZXNzaW9uSWQgfSksXG4gICAgfSlcbiAgICBjb25zdCBkYXRhOiB1bmtub3duID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgcmV0dXJuIHsgb2s6IHJlc3BvbnNlLm9rLCBkYXRhOiAoZGF0YSA/PyB7fSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfVxuICB9XG5cbiAgY29uc3QgbG9hZENvbW1pdHMgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbW1pdHM/c2Vzc2lvbklkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHByb3BzLnNlc3Npb25JZCA/PyAnJyl9JmxpbWl0PTYwYClcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcigoZGF0YSBhcyB7IGVycm9yPzogc3RyaW5nIH0pLmVycm9yID8/IGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApXG4gICAgICBzZXRDb21taXRzRGF0YShkYXRhIGFzIENvbW1pdHNQYXlsb2FkKVxuICAgICAgc2V0Q29tbWl0c0Vycm9yKG51bGwpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldENvbW1pdHNFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZE5vdGVzID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcz9zZXNzaW9uSWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9wcy5zZXNzaW9uSWQgPz8gJycpKVxuICAgICAgY29uc3QgZGF0YTogdW5rbm93biA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSBzZXROb3RlcygoZGF0YSBhcyB7IG5vdGVzOiBOb3RlRW50cnlbXSB9KS5ub3RlcyA/PyBbXSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1N0IxNFx1OEJCMFx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2Mlx1RkYxQVx1NTIxN1x1ODg2OFx1NEZERFx1NjMwMVx1NTM5Rlx1NjgzN1x1MzAwMlxuICAgIH1cbiAgfVxuXG4gIC8qKiBcdTUyRkVcdTkwMDkvXHU1M0Q2XHU2RDg4XHU0RTAwXHU2QjIxXHU2M0QwXHU0RUE0XHVGRjFBXHU5MUNEXHU3Qjk3XHU5MDA5XHU0RTJEXHU5NkM2XHU1NDA4XHVGRjBDXHU1RTc2XHU2MzA5XHU5NzAwXHU4ODY1XHU5RjUwXHU2QkNGXHU2NzYxXHU2M0QwXHU0RUE0XHU3Njg0IEFJIFx1ODlFM1x1OEJGQlx1RkYwOFx1NjcwRFx1NTJBMVx1N0FFRlx1NjcwOVx1N0YxM1x1NUI1OFx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCB0b2dnbGVUYXJnZXQgPSBhc3luYyAodGFyZ2V0OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRTZWxlY3RlZFRhcmdldHMoKHByZXZpb3VzKSA9PiB7XG4gICAgICBpZiAocHJldmlvdXMuaW5jbHVkZXModGFyZ2V0KSkgcmV0dXJuIHByZXZpb3VzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gdGFyZ2V0KVxuICAgICAgcmV0dXJuIFsuLi5wcmV2aW91cywgdGFyZ2V0XVxuICAgIH0pXG4gICAgc2V0SW1wYWN0KG51bGwpXG4gICAgc2V0UmV2aWV3cyh7fSlcbiAgICBpZiAoIXNlbGVjdGVkVGFyZ2V0cy5pbmNsdWRlcyh0YXJnZXQpKSB7XG4gICAgICBhd2FpdCBsb2FkRGV0YWlsKHRhcmdldCwgZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1NjJDOVx1NTNENlx1NTM1NVx1Njc2MVx1NjNEMFx1NEVBNFx1NzY4NCBBSSBcdTg5RTNcdThCRkJcdUZGMUJmb3JjZT10cnVlIFx1NjVGNlx1N0VENVx1OEZDN1x1N0YxM1x1NUI1OFx1NUYzQVx1NTIzNlx1OTFDRFx1N0I5N1x1MzAwMlx1NTkzMVx1OEQyNVx1NTE5OVx1NTE2NVx1OTUxOVx1OEJFRlx1NTM2MFx1NEY0RFx1RkYwOFx1NTM2MVx1NzI0N1x1NEUwRFx1NUQyOVx1NkU4M1x1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBsb2FkRGV0YWlsID0gYXN5bmMgKHRhcmdldDogc3RyaW5nLCBmb3JjZTogYm9vbGVhbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldERldGFpbExvYWRpbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvY29tbWl0LWRldGFpbCcsIHsgc2hhOiB0YXJnZXQsIGZvcmNlIH0pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldERldGFpbHMoKHByZXZpb3VzKSA9PiAoe1xuICAgICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICAgIFt0YXJnZXRdOiB7XG4gICAgICAgICAgICBzaGE6IHRhcmdldCxcbiAgICAgICAgICAgIGlzV29ya2luZzogdGFyZ2V0ID09PSAnd29ya2luZycsXG4gICAgICAgICAgICBmaWxlczogW10sXG4gICAgICAgICAgICBpbnNlcnRpb25zOiAwLFxuICAgICAgICAgICAgZGVsZXRpb25zOiAwLFxuICAgICAgICAgICAgcGF0Y2hUcnVuY2F0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcGF0Y2g6ICcnLFxuICAgICAgICAgICAgY29tbWl0OiBudWxsLFxuICAgICAgICAgICAgYW5hbHlzaXM6IHsgd2hhdDogJ0FJIFx1ODlFM1x1OEJGQlx1NTkzMVx1OEQyNVx1RkYxQScgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnJykgKyAnXHVGRjA4XHU3MEI5XHUzMDBDXHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwXHUzMDBEXHU1M0VGXHU5MUNEXHU4QkQ1XHVGRjA5JywgbG9naWM6IFtdLCByaXNrczogW10gfSxcbiAgICAgICAgICB9IGFzIHVua25vd24gYXMgQ29tbWl0RGV0YWlsUGF5bG9hZCxcbiAgICAgICAgfSkpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2V0RGV0YWlscygocHJldmlvdXMpID0+ICh7IC4uLnByZXZpb3VzLCBbdGFyZ2V0XTogZGF0YSBhcyB1bmtub3duIGFzIENvbW1pdERldGFpbFBheWxvYWQgfSkpXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHNldExvYWRFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldERldGFpbExvYWRpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZEltcGFjdCA9IGFzeW5jIChmb3JjZSA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDApIHJldHVyblxuICAgIHNldEltcGFjdExvYWRpbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvaW1wYWN0LXNjb3BlJywgeyBzaGFzOiBzZWxlY3RlZFRhcmdldHMsIGZvcmNlIH0pXG4gICAgICBzZXRJbXBhY3Qob2sgPyAoZGF0YSBhcyB1bmtub3duIGFzIEltcGFjdFNjb3BlUGF5bG9hZCkgOiBudWxsKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJbXBhY3RMb2FkaW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxvYWRSZXZpZXdzID0gYXN5bmMgKGZvcmNlID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoc2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgc2V0UmV2aWV3TG9hZGluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBmb3IgKGNvbnN0IHRhcmdldCBvZiBzZWxlY3RlZFRhcmdldHMpIHtcbiAgICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvcmV2aWV3JywgeyBzaGE6IHRhcmdldCwgZm9yY2UgfSlcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGRhdGEgYXMgdW5rbm93biBhcyBSZXZpZXdQYXlsb2FkXG4gICAgICAgIHNldFJldmlld3MoKHByZXZpb3VzKSA9PiAoe1xuICAgICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICAgIFt0YXJnZXRdOiBvayA/IHBheWxvYWQgOiB7XG4gICAgICAgICAgICBpc3N1ZXNGb3VuZDogMCxcbiAgICAgICAgICAgIGlzc3VlczogJycsXG4gICAgICAgICAgICB2ZXJkaWN0OiAnXHU4QkM0XHU1QkExXHU1OTMxXHU4RDI1XHVGRjFBJyArIFN0cmluZyhwYXlsb2FkWydlcnJvciddID8/ICcnKSArICdcdUZGMDhcdTUzRUZcdTkxQ0RcdTY1QjBcdTc1MUZcdTYyMTBcdTkxQ0RcdThCRDVcdUZGMDknLFxuICAgICAgICAgICAgaXNzdWVMaXN0OiBbXSxcbiAgICAgICAgICAgIGNhY2hlZDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSkpXG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFJldmlld0xvYWRpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbG9hZEZpbGVEaWZmID0gYXN5bmMgKHNoYTogc3RyaW5nLCBwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBrZXkgPSBgJHtzaGF9fCR7cGF0aH1gXG4gICAgaWYgKGZpbGVEaWZmc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNldEZpbGVEaWZmcygocHJldmlvdXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldmlvdXMgfVxuICAgICAgICBkZWxldGUgbmV4dFtrZXldXG4gICAgICAgIHJldHVybiBuZXh0XG4gICAgICB9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvZmlsZS1kaWZmJywgeyBzaGEsIHBhdGggfSlcbiAgICBzZXRGaWxlRGlmZnMoKHByZXZpb3VzKSA9PiAoeyAuLi5wcmV2aW91cywgW2tleV06IFN0cmluZyhkYXRhWydwYXRjaCddID8/ICcnKSB9KSlcbiAgfVxuXG4gIGNvbnN0IGFkZE5vdGUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKG5vdGVUaXRsZS50cmltKCkgPT09ICcnIHx8IG5vdGVDb250ZW50LnRyaW0oKSA9PT0gJycpIHJldHVyblxuICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL25vdGVzJywge1xuICAgICAgdGl0bGU6IG5vdGVUaXRsZS50cmltKCksXG4gICAgICBjb250ZW50OiBub3RlQ29udGVudC50cmltKCksXG4gICAgICBzaGE6IHNlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiBzZWxlY3RlZFRhcmdldHNbMF0sXG4gICAgfSlcbiAgICBpZiAob2spIHtcbiAgICAgIHNldE5vdGVUaXRsZSgnJylcbiAgICAgIHNldE5vdGVDb250ZW50KCcnKVxuICAgICAgYXdhaXQgbG9hZE5vdGVzKClcbiAgICB9XG4gIH1cblxuICBjb25zdCByZW1vdmVOb3RlID0gYXN5bmMgKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy9kZWxldGUnLCB7IGlkIH0pXG4gICAgaWYgKGVkaXRpbmdOb3RlICE9PSBudWxsICYmIGVkaXRpbmdOb3RlLmlkID09PSBpZCkgc2V0RWRpdGluZ05vdGUobnVsbClcbiAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICB9XG5cbiAgY29uc3Qgc2F2ZU5vdGVFZGl0ID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChlZGl0aW5nTm90ZSA9PT0gbnVsbCkgcmV0dXJuXG4gICAgYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvbm90ZXMvdXBkYXRlJywgeyBpZDogZWRpdGluZ05vdGUuaWQsIHRpdGxlOiBlZGl0aW5nTm90ZS50aXRsZSwgY29udGVudDogZWRpdGluZ05vdGUuY29udGVudCB9KVxuICAgIHNldEVkaXRpbmdOb3RlKG51bGwpXG4gICAgYXdhaXQgbG9hZE5vdGVzKClcbiAgfVxuXG4gIC8qKiBBSSBcdTVCNjZcdTRFNjBcdTYwM0JcdTdFRDNcdUZGMUFcdTYyOEFcdTVERjJcdTY3MDlcdTdCMTRcdThCQjAgKyBcdTk4NzlcdTc2RUVcdTY4NjNcdTY4NDhcdTYzRDBcdTcwQkNcdTYyMTBcdTRFMDBcdTY3NjFcdTYwM0JcdTdFRDNcdTdCMTRcdThCQjBcdTMwMDIgKi9cbiAgY29uc3QgYWlTdW1tYXJpemUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgc2V0QWlTdW1tYXJpemluZyh0cnVlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG9rLCBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvcHJvamVjdC1jb250cm9sL2FwaS9ub3Rlcy9haS1zdW1tYXJ5Jywge30pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBhd2FpdCBsb2FkTm90ZXMoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1MjcxNyAnICsgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSkpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldEFpU3VtbWFyaXppbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgLyoqIFx1OTg3NVx1OTc2Mlx1NEUwMFx1OTUyRVx1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYxQVx1NUVGQVx1NTNEOFx1NjZGNCBcdTIxOTIgTExNIFx1NzUxRlx1NjIxMFx1OEJBMVx1NTIxMiBcdTIxOTIgXHU1NDBFXHU1M0YwXHU1QjUwXHU0RUUzXHU3NDA2XHU5MDEwXHU2QjY1XHU2MjY3XHU4ODRDXHUzMDAyICovXG4gIGNvbnN0IHN0YXJ0UnVuID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChleGVjVGl0bGUudHJpbSgpID09PSAnJyB8fCBleGVjRGVzYy50cmltKCkgPT09ICcnKSByZXR1cm5cbiAgICBzZXRCdXN5KCdzdGFydFJ1bicpXG4gICAgc2V0QWN0aW9uUmVzdWx0KG51bGwpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3J1bnMvc3RhcnQnLCB7IHRpdGxlOiBleGVjVGl0bGUudHJpbSgpLCBkZXNjcmlwdGlvbjogZXhlY0Rlc2MudHJpbSgpIH0pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldEFjdGlvblJlc3VsdCgnXHUyNzE3ICcgKyBTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoJ1x1NURGMlx1NTQyRlx1NTJBOFx1NjI2N1x1ODg0Q1x1RkYxQScgKyBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKSlcbiAgICAgIHNldEV4ZWNUaXRsZSgnJylcbiAgICAgIHNldEV4ZWNEZXNjKCcnKVxuICAgICAgYXdhaXQgcmVmcmVzaFN0YXRlKClcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgc2V0QWN0aW9uUmVzdWx0KCdcdTI3MTcgJyArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRCdXN5KG51bGwpXG4gICAgfVxuICB9XG5cbiAgLy8gXHU0RjFBXHU4QkREXHU2MjUzXHU1RjAwL1x1NTIwN1x1NjM2Mlx1NjVGNlx1NUI5OFx1NjVCOVx1NEYxQSBjbG9zZURldGFpbHMgXHU2NTM2XHU4RDc3XHU4RjY4XHU5MDUzXHVGRjFCXHU3NzBCXHU5NUU4XHU3MkQ3XHU2QkNGIDUwMG1zIFx1NjhDMFx1NjdFNVx1RkYwQ1xuICAvLyBcdTUzRUFcdTg5ODFcdTVGNTNcdTUyNERcdTY3MDlcdTRGMUFcdThCRERcdTgwMENcdTVERTVcdTRGNUNcdTUzRjBcdTUyMTdcdTVCQkQgPCA1MHB4IFx1NUMzMVx1OTFDRFx1NjVCMFx1NjQ5MVx1NUYwMFx1RkYwOFx1Nzg2RVx1NUI5QVx1NjAyN1x1RkYwQ1x1NEUwRFx1NEY5RFx1OEQ1NiBlZmZlY3QgXHU2NUY2XHU1RThGXHVGRjA5XHUzMDAyXG4gIC8vIFx1NTQwQ1x1NEUwMFx1NjJDRFx1N0VGNFx1NjMwMVx1N0VERlx1OEJBMVx1ODg0Q1x1OTRCM1x1NTIzNlx1RkYxQVx1NEYxQVx1OEJERFx1NTIwN1x1NjM2Mlx1NEYxQVx1NjM2Mlx1NjM4OVx1N0VERlx1OEJBMVx1ODg0QyBET01cdUZGMENcdTY4MzdcdTVGMEZcdTg4NjhcdTdGM0FcdTU5MzFcdTY1RjZcdTYzMDlcdTVGNTNcdTUyNERcbiAgLy8gXHU2Nzg0XHU1RUZBXHU1NEM4XHU1RTBDXHU5MUNEXHU2Q0U4XHU1MTY1XHVGRjA4XHU1RTQyXHU3QjQ5XHVGRjBDXHU1REYyXHU1QjU4XHU1NzI4XHU1MjE5XHU4REYzXHU4RkM3XHVGRjA5XHUzMDAyXG4gIGNvbnN0IGxheW91dEZhY2UgPSAocHJvcHMgYXMgdW5rbm93biBhcyB7IGxheW91dD86IHsgb3BlbkRldGFpbHM/OiAoKSA9PiB2b2lkIH0gfSkubGF5b3V0XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYXBwbHlTdGF0c0xpbmVDbGFtcCgpXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BjLXN0YXRzLWNsYW1wJykgPT09IG51bGwpIGFwcGx5U3RhdHNMaW5lQ2xhbXAoKVxuICAgICAgY29uc3QgY2hhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJjZW50ZXJDb2xcIl0nKVxuICAgICAgY29uc3Qgd2lkdGggPSBjaGF0ID8gTWF0aC5yb3VuZChjaGF0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSA6IC0xXG4gICAgICBpZiAod2lkdGggIT09IC0xICYmIHdpZHRoIDwgNTApIGxheW91dEZhY2U/Lm9wZW5EZXRhaWxzPy4oKVxuICAgIH0sIDUwMClcbiAgICByZXR1cm4gKCkgPT4geyBjbGVhckludGVydmFsKHRpbWVyKSB9XG4gIH0sIFtwcm9wcy5zZXNzaW9uSWQsIGxheW91dEZhY2VdKVxuXG4gIC8qKiBcdTRFRTUgaW1wb3J0YW50IFx1NTE4NVx1ODA1NFx1NjgzN1x1NUYwRlx1NzZGNFx1NjNBNVx1NTE5OVx1NUI5OFx1NjVCOVx1N0Y1MVx1NjgzQ1x1NkEyMVx1Njc3Rlx1RkYwOFx1NjcwMFx1OUFEOFx1NEYxOFx1NTE0OFx1N0VBN1x1RkYwQ1x1NEVGQlx1NEY1NVx1OTFDRFx1NkUzMlx1NjdEM1x1NEUwRFx1NEYxQVx1ODk4Nlx1NzZENlx1RkYwOVx1MzAwMiAqL1xuICBjb25zdCBmcmFtZVRlbXBsYXRlU2V0ID0gKGNoYXRQeDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltjbGFzcyo9XCJzaWRlYmFyQ29sXCJdJylcbiAgICBjb25zdCBzaWRlYmFyVyA9IHNpZGViYXIgPyBNYXRoLm1heCg1NiwgTWF0aC5yb3VuZChzaWRlYmFyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKSkgOiAyODBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdJylcbiAgICAgID8uc3R5bGUuc2V0UHJvcGVydHkoJ2dyaWQtdGVtcGxhdGUtY29sdW1ucycsIHNpZGViYXJXICsgJ3B4IG1pbm1heCgwLCAxZnIpICcgKyBjaGF0UHggKyAncHgnLCAnaW1wb3J0YW50JylcbiAgfVxuXG4gIC8vIFx1ODA0QVx1NTkyOVx1NTIxN1x1NUJCRFx1OEJCMFx1NUZDNlx1RkYwOFx1NUI5OFx1NjVCOSBsYXlvdXQgc3RvcmUgXHU3N0FDXHU2MDAxXHVGRjA5XHVGRjFBXHU2MzAyXHU4RjdEXHU2MDYyXHU1OTBEICsgXHU2MkQ2XHU2MkZEXHU3NkY0XHU1MTk5XHU1MTg1XHU4MDU0XHU2QTIxXHU2NzdGXHUzMDAyXG4gIC8vIFx1NUZDNVx1OTg3Qlx1NTE5OSBpbXBvcnRhbnRcdTIwMTRcdTIwMTRMQVlPVVRfU1RZTEUgXHU3Njg0XHU2QTIxXHU2NzdGXHU4OUM0XHU1MjE5XHU0RTVGXHU2NjJGIGltcG9ydGFudFx1RkYwQ1x1OTc1RSBpbXBvcnRhbnRcbiAgLy8gXHU1MTg1XHU4MDU0XHU0RjFBXHU4OEFCXHU1QjgzXHU1MzhCXHU1MjM2XHVGRjA4XHU4RkQ5XHU1QzMxXHU2NjJGXHU2QjY0XHU1MjREXCJcdTYyRDZcdTYyRkRcdTc1MUZcdTY1NDhcdTMwMDFcdTUyMzdcdTY1QjBcdTU0MEVcdThCQjBcdTVGQzZcdTRFMjJcdTU5MzFcIlx1NzY4NFx1NTM5Rlx1NTZFMFx1RkYwOVx1MzAwMlxuICAvLyBcdTVCOThcdTY1QjkgUmVhY3QgXHU5MUNEXHU2RTMyXHU2N0QzXHU0RjFBXHU2NTM5XHU1MTk5XHU1MTg1XHU4MDU0XHU2QTIxXHU2NzdGXHVGRjBDTXV0YXRpb25PYnNlcnZlciBcdTYzMDlcdTVGNTNcdTUyNERcdTUwM0NcdTVCODhcdTUzNkJcdTkxQ0RcdTUxOTlcbiAgLy8gXHVGRjA4XHU1MDNDXHU3NkY4XHU1NDBDXHU0RTBEXHU0RjFBXHU4OUU2XHU1M0QxXHU2NUIwXHU3Njg0IG11dGF0aW9uXHVGRjBDXHU2NUUwXHU1NkRFXHU3M0FGXHVGRjA5XHUzMDAyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BjLmNoYXRXaWR0aCcpID8/ICcnKVxuICAgIGNvbnN0IGFwcGx5ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbY2xhc3MqPVwiZnJhbWVcIl1bc3R5bGUqPVwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdJykgYXMgSFRNTEVsZW1lbnQgfCBudWxsXG4gICAgICAvLyBcdTRFQzVcdTVGNTNcdTUxODVcdTgwNTRcdTZBMjFcdTY3N0ZcdTRFMERcdTY2MkZcdTYyMTFcdTRFRUNcdTc2ODQgaW1wb3J0YW50IFx1NThGMFx1NjYwRVx1NjVGNlx1NTE5OVx1NTE2NVx1RkYxQVx1NUI5OFx1NjVCOSBSZWFjdCBcdTkxQ0RcdTZFMzJcdTY3RDNcdTRGMUFcdTYyOEFcbiAgICAgIC8vIFx1NTE4NVx1ODA1NFx1NjUzOVx1NTZERVx1OTc1RSBpbXBvcnRhbnRcdUZGMDhcdTZCNjRcdTY1RjZcdTY4MzdcdTVGMEZcdTg4NjhcdTg5QzRcdTUyMTlcdTYzQTVcdTdCQTFcdTMwMDFcdTgwNEFcdTU5MjlcdTVCQkRcdTU2REVcdTg0M0QgMzYwXHVGRjA5XHVGRjBDXHU4OUMyXHU1QkRGXHU1NjY4XG4gICAgICAvLyBcdTk2OEZcdTUzNzNcdTkxQ0RcdTUxOTlcdTU5M0FcdTU2REVcdUZGMUJcdTYyMTFcdTRFRUNcdTgxRUFcdTVERjFcdTc2ODRcdTUxOTlcdTUxNjVcdTRGRERcdTYzMDEgaW1wb3J0YW50XHVGRjBDXHU0RTBEXHU1MThEXHU4OUU2XHU1M0QxXHU0RTBCXHU0RTAwXHU4RjZFXHUzMDAyXG4gICAgICBpZiAoZnJhbWUgPT09IG51bGwgfHwgZnJhbWUuc3R5bGUuZ2V0UHJvcGVydHlQcmlvcml0eSgnZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zJykgPT09ICdpbXBvcnRhbnQnKSByZXR1cm5cbiAgICAgIGNvbnN0IGNoYXRXID0gTnVtYmVyLmlzRmluaXRlKHNhdmVkKSAmJiBzYXZlZCA+PSAyODAgPyBzYXZlZCA6IDM2MFxuICAgICAgZnJhbWVUZW1wbGF0ZVNldChjaGF0VylcbiAgICB9XG4gICAgYXBwbHkoKVxuICAgIGNvbnN0IGZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W2NsYXNzKj1cImZyYW1lXCJdW3N0eWxlKj1cImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXScpXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7IGFwcGx5KCkgfSlcbiAgICBpZiAoZnJhbWUgIT09IG51bGwpIG9ic2VydmVyLm9ic2VydmUoZnJhbWUsIHsgYXR0cmlidXRlczogdHJ1ZSwgYXR0cmlidXRlRmlsdGVyOiBbJ3N0eWxlJ10gfSlcbiAgICByZXR1cm4gKCkgPT4geyBvYnNlcnZlci5kaXNjb25uZWN0KCkgfVxuICB9LCBbXSlcblxuICAvKiogXHU1MjA2XHU5Njk0XHU2NzYxXHU2MkQ2XHU2MkZEXHVGRjFBXHU4QzAzXHU2NTc0XHU4MDRBXHU1OTI5XHU1MjE3XHU1QkJEXHVGRjA4XHU1REU1XHU0RjVDXHU1M0YwXHU1NDM4XHU2NTM2XHU1MjY5XHU0RjU5XHU3QTdBXHU5NUY0XHVGRjA5XHVGRjBDXHU1MTk5XHU1MTY1IGxvY2FsU3RvcmFnZSBcdThCQjBcdTVGQzZcdTMwMDIgKi9cbiAgY29uc3Qgb25EaXZpZGVyRG93biA9IChlOiBSZWFjdC5Qb2ludGVyRXZlbnQpOiB2b2lkID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zdCBvbk1vdmUgPSAoZXY6IFBvaW50ZXJFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3Qgd2lkdGggPSBNYXRoLm1pbig5MDAsIE1hdGgubWF4KDI4MCwgd2luZG93LmlubmVyV2lkdGggLSBldi5jbGllbnRYKSlcbiAgICAgIGZyYW1lVGVtcGxhdGVTZXQod2lkdGgpXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGMuY2hhdFdpZHRoJywgU3RyaW5nKHdpZHRoKSlcbiAgICB9XG4gICAgY29uc3Qgb25VcCA9ICgpOiB2b2lkID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSlcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKVxuICAgIH1cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIG9uVXApXG4gIH1cblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBkaXNwb3NlZCA9IGZhbHNlXG4gICAgY29uc3QgbG9hZCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL3N0YXRlJywgeyBoZWFkZXJzOiB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0gfSlcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfWApXG4gICAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgICAgaWYgKCFkaXNwb3NlZCkge1xuICAgICAgICAgIHNldFN0YXRlKGRhdGEgYXMgV29ya3NwYWNlU3RhdGUpXG4gICAgICAgICAgc2V0TG9hZEVycm9yKG51bGwpXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICAgIGlmICghZGlzcG9zZWQpIHNldExvYWRFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpXG4gICAgICB9XG4gICAgfVxuICAgIHZvaWQgbG9hZCgpXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IHZvaWQgbG9hZCgpIH0sIDQwMDApXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICB9XG4gIH0sIFtdKVxuXG4gIC8vIFx1OEZEQlx1NTE2NVx1NjNEMFx1NEVBNC9cdTdCMTRcdThCQjBcdTk4NzVcdTdCN0VcdTY1RjZcdTYzMDlcdTk3MDBcdTYyQzlcdTUzRDZcdUZGMDhcdTYzRDBcdTRFQTRcdTUyMTdcdTg4NjhcdTRGOURcdThENTZcdTRGMUFcdThCRERcdTVERTVcdTRGNUNcdTUzM0FcdUZGMENcdThGNkVcdThCRTJcdTY1RTBcdTYxMEZcdTRFNDlcdUZGMDlcdTMwMDJcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodGFiID09PSAnY29tbWl0cycpIHZvaWQgbG9hZENvbW1pdHMoKVxuICAgIGlmICh0YWIgPT09ICdub3RlcycpIHZvaWQgbG9hZE5vdGVzKClcbiAgICBpZiAodGFiID09PSAnc2V0dGluZ3MnICYmIG1vZGVsVGllcnMgPT09IG51bGwpIHZvaWQgbG9hZE1vZGVsQ29uZmlnKClcbiAgfSwgW3RhYiwgcHJvcHMuc2Vzc2lvbklkXSlcblxuICBjb25zdCBsb2FkTW9kZWxDb25maWcgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21vZGVsLWNvbmZpZycpXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSByZXR1cm5cbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIHNldE1vZGVsVGllcnMoKGRhdGEgYXMgeyB0aWVyczogUmVjb3JkPHN0cmluZywgeyBwcm92aWRlcjogc3RyaW5nOyBtb2RlbDogc3RyaW5nIH0+IH0pLnRpZXJzID8/IHt9KVxuICAgICAgc2V0TW9kZWxPcHRpb25zKChkYXRhIGFzIHsgb3B0aW9uczogQXJyYXk8eyBwcm92aWRlcjogc3RyaW5nOyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfT4gfSkub3B0aW9ucyA/PyBbXSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1NkEyMVx1NTc4Qlx1OTE0RFx1N0Y2RVx1NTJBMFx1OEY3RFx1NTkzMVx1OEQyNVx1NEUwRFx1NjI1M1x1NjVBRFx1OTg3NVx1OTc2MlxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNhdmVNb2RlbENvbmZpZyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAobW9kZWxUaWVycyA9PT0gbnVsbCkgcmV0dXJuXG4gICAgc2V0TW9kZWxTYXZpbmcodHJ1ZSlcbiAgICBzZXRNb2RlbFNhdmVkKGZhbHNlKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9tb2RlbC1jb25maWcnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB0aWVyczogbW9kZWxUaWVycyB9KSxcbiAgICAgIH0pXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgc2V0TW9kZWxTYXZlZCh0cnVlKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgc2V0TW9kZWxTYXZlZChmYWxzZSkgfSwgMjUwMClcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TW9kZWxTYXZpbmcoZmFsc2UpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVmcmVzaFN0YXRlID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHJlZnJlc2hlZCA9IGF3YWl0IGZldGNoKCcvcHJvamVjdC1jb250cm9sL2FwaS9zdGF0ZScsIHsgaGVhZGVyczogeyBhY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyB9IH0pXG4gICAgaWYgKHJlZnJlc2hlZC5vaykgc2V0U3RhdGUoYXdhaXQgcmVmcmVzaGVkLmpzb24oKSBhcyBXb3Jrc3BhY2VTdGF0ZSlcbiAgfVxuXG4gIC8qKiBcdTdFREZcdTRFMDBcdTUyQThcdTRGNUNcdTYyNjdcdTg4NENcdTU2NjhcdUZGMUFQT1NUIFx1NUJCRlx1NEUzQiBBUElcdUZGMDhcdTY0M0FcdTVFMjZcdTRGMUFcdThCREQgaWQgXHU0RjlCXHU2NzBEXHU1MkExXHU3QUVGXHU1QjlBXHU0RjREXHU5ODc5XHU3NkVFXHU1REU1XHU0RjVDXHU1MzNBXHVGRjA5XHVGRjBDXHU4RjkzXHU1MUZBXHU4RkRCXHU3RUQzXHU2NzlDXHU5NzYyXHU2NzdGXHVGRjBDXHU1QjhDXHU2MjEwXHU1NDBFXHU1MjM3XHU2NUIwXHU3MkI2XHU2MDAxXHUzMDAyICovXG4gIGNvbnN0IHJ1bkFjdGlvbiA9IGFzeW5jIChuYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgYm9keTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBzZXRCdXN5KG5hbWUpXG4gICAgc2V0QWN0aW9uUmVzdWx0KG51bGwpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgb2ssIGRhdGEgfSA9IGF3YWl0IHBvc3QocGF0aCwgYm9keSlcbiAgICAgIGlmICghb2spIHtcbiAgICAgICAgc2V0QWN0aW9uUmVzdWx0KGBcdTI3MTcgJHtTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKX1gKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHNldEFjdGlvblJlc3VsdChmb3JtYXRBY3Rpb25SZXN1bHQoZGF0YSkpXG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRBY3Rpb25SZXN1bHQoYFx1MjcxNyAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKX1gKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRCdXN5KG51bGwpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcnVuQm9vdHN0cmFwID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHNldEJvb3RzdHJhcHBpbmcodHJ1ZSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBvaywgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL3Byb2plY3QtY29udHJvbC9hcGkvYm9vdHN0cmFwJywge30pXG4gICAgICBpZiAoIW9rKSB7XG4gICAgICAgIHNldExvYWRFcnJvcihTdHJpbmcoZGF0YVsnZXJyb3InXSA/PyAnZXJyb3InKSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBhd2FpdCByZWZyZXNoU3RhdGUoKVxuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBzZXRMb2FkRXJyb3IoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRCb290c3RyYXBwaW5nKGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbmZpcm1NZW1vcnkgPSBhc3luYyAobWVtb3J5SWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgb2sgfSA9IGF3YWl0IHBvc3QoJy9wcm9qZWN0LWNvbnRyb2wvYXBpL21lbW9yeS9jb25maXJtJywgeyBtZW1vcnlJZCB9KVxuICAgIGlmIChvaykge1xuICAgICAgc2V0U3RhdGUoKHByZXZpb3VzKSA9PiBwcmV2aW91cyA9PT0gbnVsbCA/IHByZXZpb3VzIDoge1xuICAgICAgICAuLi5wcmV2aW91cyxcbiAgICAgICAgbWVtb3JpZXM6IHByZXZpb3VzLm1lbW9yaWVzPy5tYXAoKG1lbW9yeSkgPT4gbWVtb3J5LmlkID09PSBtZW1vcnlJZCA/IHsgLi4ubWVtb3J5LCBpc0h1bWFuQ29uZmlybWVkOiB0cnVlLCB0cnV0aExldmVsOiAnZmFjdCcgfSA6IG1lbW9yeSksXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHByb2plY3QgPSBzdGF0ZT8ucHJvamVjdCA/PyBudWxsXG4gIGNvbnN0IGJvb3RzdHJhcCA9IHN0YXRlPy5ib290c3RyYXAgPz8gbnVsbFxuICBjb25zdCBjaGFuZ2VzID0gc3RhdGU/LmNoYW5nZXMgPz8gW11cbiAgY29uc3QgcnVucyA9IHN0YXRlPy5ydW5zID8/IFtdXG4gIGNvbnN0IG1lbW9yaWVzID0gc3RhdGU/Lm1lbW9yaWVzID8/IFtdXG4gIGNvbnN0IGlzc3VlcyA9IHN0YXRlPy5pc3N1ZXMgPz8gW11cbiAgY29uc3QgdmVyaWZpY2F0aW9ucyA9IHN0YXRlPy52ZXJpZmljYXRpb25zID8/IFtdXG4gIGNvbnN0IGNvbmZpcm1lZCA9IHN0YXRlPy5jb25maXJtZWQgPz8gW11cbiAgY29uc3QgY29uY2VwdHMgPSBzdGF0ZT8uY29uY2VwdHMgPz8gW11cblxuICBjb25zdCB0YWJzOiBBcnJheTx7IGtleTogVGFiS2V5OyBsYWJlbDogc3RyaW5nIH0+ID0gW1xuICAgIHsga2V5OiAnY29tbWl0cycsIGxhYmVsOiB0KCd0YWIuY29tbWl0cycpIH0sXG4gICAgeyBrZXk6ICdvdmVydmlldycsIGxhYmVsOiB0KCd0YWIub3ZlcnZpZXcnKSB9LFxuICAgIHsga2V5OiAnZXhlY3V0aW9uJywgbGFiZWw6IHQoJ3RhYi5leGVjdXRpb24nKSB9LFxuICAgIHsga2V5OiAnbm90ZXMnLCBsYWJlbDogdCgndGFiLm5vdGVzJykgfSxcbiAgICB7IGtleTogJ3NldHRpbmdzJywgbGFiZWw6IHQoJ3RhYi5zZXR0aW5ncycpIH0sXG4gIF1cblxuICAvKiogXHU2NENEXHU0RjVDXHU3RUQzXHU2NzlDXHU5NzYyXHU2NzdGXHVGRjA4XHU2MDNCXHU4OUM4XHU5ODc1XHU3QjdFXHU3Njg0XHU1RkVCXHU2Mzc3XHU1MkE4XHU0RjVDXHU1MTcxXHU3NTI4XHVGRjA5XHUzMDAyICovXG4gIGNvbnN0IHJlc3VsdFBhbmVsID0gYWN0aW9uUmVzdWx0ICE9PSBudWxsXG4gICAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KENhcmQsIHsgdGl0bGU6IHQoJ3Jlc3VsdC5wYW5lbCcpIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgc3R5bGU6IHN0eWxlcy5yZXN1bHQgfSwgYWN0aW9uUmVzdWx0KSlcbiAgICA6IG51bGxcbiAgLy8gXHUyNTAwXHUyNTAwIFx1NjNEMFx1NEVBNFx1NjgzOFx1NjdFNVx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcbiAgLy8gXHU5ODc2XHU5MEU4XHVGRjFBXHU0RUQzXHU1RTkzXHU2ODBGICsgXHU2M0QwXHU0RUE0XHU1OTFBXHU5MDA5XHU0RTBCXHU2MkM5XHVGRjA4XHU3RUE2IDEvNSBcdTlBRDhcdTVFQTZcdUZGMDlcdUZGMUJcdTRFMEJcdTY1QjlcdTY3N0ZcdTU3NTdcdTUzNjBcdTUxNjhcdTVCQkRcdTMwMDJcbiAgY29uc3QgYWxsVGFyZ2V0czogQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgbWV0YTogc3RyaW5nOyBzaGE6IHN0cmluZyB9PiA9IFtdXG4gIGlmIChjb21taXRzRGF0YSAhPT0gbnVsbCkge1xuICAgIGlmICghY29tbWl0c0RhdGEud29ya2luZy5pc0NsZWFuKSB7XG4gICAgICBhbGxUYXJnZXRzLnB1c2goe1xuICAgICAgICBrZXk6ICd3b3JraW5nJyxcbiAgICAgICAgbGFiZWw6IGBcdTI1Q0YgJHt0KCdyZXBvLndvcmtpbmcnKX1cdUZGMDgke2NvbW1pdHNEYXRhLndvcmtpbmcuZmlsZUNvdW50fVx1RkYwOWAsXG4gICAgICAgIG1ldGE6IGNvbW1pdHNEYXRhLndvcmtpbmcuZmlsZXMuc2xpY2UoMCwgMykubWFwKChmaWxlKSA9PiBmaWxlLnBhdGguc3BsaXQoJy8nKS5wb3AoKSkuam9pbignLCAnKSxcbiAgICAgICAgc2hhOiAnd29ya2luZycsXG4gICAgICB9KVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGNvbW1pdCBvZiBjb21taXRzRGF0YS5jb21taXRzKSB7XG4gICAgICBjb25zdCBhZGRzID0gY29tbWl0LmZpbGVzLnJlZHVjZSgoc3VtLCBmaWxlKSA9PiBzdW0gKyBmaWxlLmFkZHMsIDApXG4gICAgICBjb25zdCBkZWxzID0gY29tbWl0LmZpbGVzLnJlZHVjZSgoc3VtLCBmaWxlKSA9PiBzdW0gKyBmaWxlLmRlbHMsIDApXG4gICAgICBhbGxUYXJnZXRzLnB1c2goe1xuICAgICAgICBrZXk6IGNvbW1pdC5zaGEsXG4gICAgICAgIGxhYmVsOiBjb21taXQuc3ViamVjdCxcbiAgICAgICAgbWV0YTogYCR7Y29tbWl0LnNob3J0SGFzaH0gXHUwMEI3ICR7Y29tbWl0LmF1dGhvcn0gXHUwMEI3ICR7bmV3IERhdGUoY29tbWl0LmRhdGUpLnRvTG9jYWxlU3RyaW5nKCl9IFx1MDBCNyArJHthZGRzfS8tJHtkZWxzfWAsXG4gICAgICAgIHNoYTogY29tbWl0LnNoYSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIGNvbnN0IHNob3J0TGFiZWwgPSAoc2hhOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGlmIChzaGEgPT09ICd3b3JraW5nJykgcmV0dXJuIHQoJ3JlcG8ud29ya2luZycpXG4gICAgY29uc3QgdGFyZ2V0ID0gYWxsVGFyZ2V0cy5maW5kKChlbnRyeSkgPT4gZW50cnkuc2hhID09PSBzaGEpXG4gICAgcmV0dXJuIGAkeyh0YXJnZXQ/Lm1ldGEuc3BsaXQoJyBcdTAwQjcgJylbMF0pID8/IHNoYS5zbGljZSgwLCA3KX0gJHt0YXJnZXQ/LmxhYmVsID8/ICcnfWAudHJpbSgpXG4gIH1cbiAgY29uc3QgZmlsdGVyZWRUYXJnZXRzID0gcGlja2VyRmlsdGVyLnRyaW0oKSA9PT0gJydcbiAgICA/IGFsbFRhcmdldHNcbiAgICA6IGFsbFRhcmdldHMuZmlsdGVyKChlbnRyeSkgPT4gKGVudHJ5LmxhYmVsICsgZW50cnkubWV0YSkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhwaWNrZXJGaWx0ZXIudHJpbSgpLnRvTG93ZXJDYXNlKCkpKVxuXG4gIGNvbnN0IGltcGFjdFJpc2tDb2xvciA9IGltcGFjdCA9PT0gbnVsbCA/ICcjOGI4YjhiJyA6IChSSVNLX0NPTE9SW2ltcGFjdC5yaXNrTGV2ZWxdID8/ICcjOGI4YjhiJylcblxuICBjb25zdCBjb21taXRzVGFiID0gKFxuICAgIDw+XG4gICAgICB7LyogXHU0RUQzXHU1RTkzXHU2ODBGICovfVxuICAgICAgPENhcmQ+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9Pntjb21taXRzRGF0YT8uYnJhbmNoID8/ICdcdTIwMTQnfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnIH19Pntjb21taXRzRGF0YT8ucm9vdFBhdGggPz8gcHJvamVjdD8ucm9vdFBhdGggPz8gJ1x1MjAxNCd9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZsZXg6IDEgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZENvbW1pdHMoKSB9fT57dCgnYWN0aW9uLnJlZnJlc2gnKX08L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtidXN5ICE9PSBudWxsfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignc2Nhbkhpc3RvcnknLCAnL3Byb2plY3QtY29udHJvbC9hcGkvYm9vdHN0cmFwJywgeyBpbmNsdWRlSGlzdG9yeTogdHJ1ZSwgc3VtbWFyaXplOiB0cnVlLCBtYXhDb21taXRzOiAzMCB9KSB9fVxuICAgICAgICAgID57YnVzeSA9PT0gJ3NjYW5IaXN0b3J5JyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdyZXBvLnNjYW5IaXN0b3J5Jyl9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9DYXJkPlxuICAgICAgey8qIFx1NjNEMFx1NEVBNFx1NTkxQVx1OTAwOVx1NEUwQlx1NjJDOVx1RkYwOFx1N0QyN1x1NTFEMVx1RkYxQlx1OTAwOVx1NEUyRFx1NTE4NVx1NUJCOVx1NUI4Q1x1NjU3NFx1NUM1NVx1NzkzQVx1RkYwQ1x1NTE0MVx1OEJCOFx1ODFFQVx1NzEzNlx1NjM2Mlx1ODg0Q1x1RkYwOSAqL31cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdwaWNrZXIudGl0bGUnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgd2lkdGg6ICcxMDAlJywgdGV4dEFsaWduOiAnbGVmdCcsIGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCB3aGl0ZVNwYWNlOiAnbm9ybWFsJyB9fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRQaWNrZXJPcGVuKCFwaWNrZXJPcGVuKSB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1pbldpZHRoOiAwIH19PlxuICAgICAgICAgICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgICAgID8gdCgncGlja2VyLnBsYWNlaG9sZGVyJylcbiAgICAgICAgICAgICAgICA6IGAke3QoJ3BpY2tlci5zZWxlY3RlZCcpfSAke3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGh9XHVGRjFBJHtzZWxlY3RlZFRhcmdldHMubWFwKHNob3J0TGFiZWwpLmpvaW4oJ1x1RkYxQicpfWB9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBtYXJnaW5MZWZ0OiAnOHB4JywgZmxleFNocmluazogMCB9fT5cdTI1QkU8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAge3BpY2tlck9wZW4gJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIHpJbmRleDogMjkgfX0gb25DbGljaz17KCkgPT4geyBzZXRQaWNrZXJPcGVuKGZhbHNlKSB9fSAvPlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJ2NhbGMoMTAwJSArIDRweCknLCBsZWZ0OiAwLCByaWdodDogMCwgekluZGV4OiAzMCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWJhc2UsICNmZmYpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWRzdy1hbGlhcy1ib3JkZXItbDIsIHJnYmEoNSw1LDUsMC4xNSkpJyxcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLCBib3hTaGFkb3c6ICcwIDhweCAyNHB4IHJnYmEoMCwwLDAsMC4xMiknLCBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzhweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzLmlucHV0fVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dCgncGlja2VyLmZpbHRlcicpfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cGlja2VyRmlsdGVyfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0UGlja2VyRmlsdGVyKGUudGFyZ2V0LnZhbHVlKSB9fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IG9uQ2xpY2s9eygpID0+IHsgc2V0U2VsZWN0ZWRUYXJnZXRzKFtdKSB9fT57dCgncGlja2VyLmNsZWFyJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXhIZWlnaHQ6IDQyMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XG4gICAgICAgICAgICAgICAgICB7YWxsVGFyZ2V0cy5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2VudHJ5LmtleX1cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzdweCAxMnB4JywgY3Vyc29yOiAncG9pbnRlcicsIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoZW50cnkuc2hhKSA/ICdyZ2JhKDM3LDk5LDIzNSwwLjA3KScgOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHRvZ2dsZVRhcmdldChlbnRyeS5zaGEpIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyB3aWR0aDogJzE0cHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1icmFuZC1wcmltYXJ5LCAjMjU2M2ViKScsIGZvbnRXZWlnaHQ6IDcwMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMuaW5jbHVkZXMoZW50cnkuc2hhKSA/ICdcdTI3MTMnIDogJyd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1pbldpZHRoOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogNjAwLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+e2VudHJ5LmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PntlbnRyeS5tZXRhfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICB7ZmlsdGVyZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdwaWNrZXIubm9NYXRjaCcpfTwvZGl2Pn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGZsZXhXcmFwOiAnd3JhcCcsIG1hcmdpblRvcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19Pnt0KCdwaWNrZXIuaGludCcpfTwvc3Bhbj5cbiAgICAgICAgICB7ZGV0YWlsTG9hZGluZyAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjZGNkY2FhJyl9Pnt0KCdkZXRhaWwuYWlMb2FkaW5nJyl9PC9zcGFuPn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NhcmQ+XG5cbiAgICAgIHtjb21taXRzRXJyb3IgIT09IG51bGwgJiYgPENhcmQ+PGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncmVwby5sb2FkRmFpbGVkJyl9OiB7Y29tbWl0c0Vycm9yfTwvZGl2PjwvQ2FyZD59XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA9PT0gMCAmJiA8Q2FyZD48ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdkZXRhaWwucGljaycpfTwvZGl2PjwvQ2FyZD59XG5cbiAgICAgIHsvKiBcdTZCQ0ZcdTY3NjFcdTkwMDlcdTRFMkRcdTYzRDBcdTRFQTRcdTc2ODQgQUkgXHU4OUUzXHU4QkZCICovfVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5tYXAoKHRhcmdldCkgPT4ge1xuICAgICAgICBjb25zdCBkID0gZGV0YWlsc1t0YXJnZXRdXG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IChkPy5jb21taXQ/Lm1lc3NhZ2UgPz8gdGFyZ2V0LnNsaWNlKDAsIDgpKVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxDYXJkIGtleT17YGQtJHt0YXJnZXR9YH0gdGl0bGU9e2BcdUQ4M0RcdUREMEQgJHtsYWJlbH0ke3RhcmdldCAhPT0gJ3dvcmtpbmcnID8gYFx1RkYwOCR7dGFyZ2V0LnNsaWNlKDAsIDgpfVx1RkYwOWAgOiAnJ31gfT5cbiAgICAgICAgICAgIHtkICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzZweCcgfX0+XG4gICAgICAgICAgICAgICAge2QuYW5hbHlzaXNDYWNoZWQgPT09IHRydWUgJiYgKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzhiOGI4YicpfT57dCgnY2FjaGUuaGl0Jyl9e2QuYW5hbHlzaXNHZW5lcmF0ZWRBdCA/ICcgXHUwMEI3ICcgKyBuZXcgRGF0ZShkLmFuYWx5c2lzR2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZERldGFpbCh0YXJnZXQsIHRydWUpIH19Pnt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtkID09PSB1bmRlZmluZWQgPyAoXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2RldGFpbC5haUxvYWRpbmcnKX08L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAge2QuY29tbWl0ICE9PSBudWxsICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5jb21taXRNZXRhfT57ZC5jb21taXQuYXV0aG9yfSBcdTAwQjcge25ldyBEYXRlKGQuY29tbWl0LmRhdGUpLnRvTG9jYWxlU3RyaW5nKCl9IFx1MDBCNyB7ZC5maWxlcy5sZW5ndGh9IHt0KCdkZXRhaWwuZmlsZXMnKX0gXHUwMEI3ICt7ZC5pbnNlcnRpb25zfS8te2QuZGVsZXRpb25zfTwvZGl2Pn1cbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy53aGF0ICE9PSAnJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzhweCcgfX0+e3QoJ2RldGFpbC53aGF0Jyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy53aGF0fT57ZC5hbmFseXNpcy53aGF0fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7ZC5hbmFseXNpcy5sb2dpYy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zZWN0aW9uVGl0bGV9Pnt0KCdkZXRhaWwubG9naWMnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2QuYW5hbHlzaXMubG9naWMubWFwKChzdGVwLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXtzdHlsZXMubG9naWNTdGVwfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWJyYW5kLXByaW1hcnksICMyNTYzZWIpJywgZm9udFdlaWdodDogNjAwIH19PntpICsgMX0uPC9zcGFuPntzdGVwfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2QuYW5hbHlzaXMucmlza3MubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzZweCcgfX0+e3QoJ2RldGFpbC5yaXNrJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtkLmFuYWx5c2lzLnJpc2tzLm1hcCgocmlzaywgaSkgPT4gPGRpdiBrZXk9e2l9IHN0eWxlPXtzdHlsZXMucmlza0l0ZW19Plx1MjZBMCB7cmlza308L2Rpdj4pfVxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7LyogXHU2NTg3XHU0RUY2XHU2RTA1XHU1MzU1ICsgXHU5MDEwXHU2NTg3XHU0RUY2XHU5QUQ4XHU0RUFFXHU1QkY5XHU2QkQ0ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgbWFyZ2luVG9wOiAnMTBweCcgfX0+e3QoJ2RldGFpbC5maWxlcycpfTwvZGl2PlxuICAgICAgICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAge2QuZmlsZXMubWFwKChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7dGFyZ2V0fXwke2ZpbGUucGF0aH1gXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF0Y2ggPSBmaWxlRGlmZnNba2V5XVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtrZXl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCBmb250U2l6ZTogJzExcHgnLCB3b3JkQnJlYWs6ICdicmVhay1hbGwnIH19PntmaWxlLnBhdGh9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBjb2xvcjogJyMyZGE0NGUnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJyB9fT4re2ZpbGUuYWRkc308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyAuLi5zdHlsZXMudGQsIGNvbG9yOiAnI2NmMjIyZScsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19Pi17ZmlsZS5kZWxzfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgd2hpdGVTcGFjZTogJ25vd3JhcCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuc2Vjb25kYXJ5fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgbG9hZEZpbGVEaWZmKHRhcmdldCwgZmlsZS5wYXRoKSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3BhdGNoID09PSB1bmRlZmluZWQgPyB0KCdkaWZmLnNob3cnKSA6IHQoJ2RpZmYuaGlkZScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3BhdGNoICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2Ake2tleX0tZGlmZmB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49ezR9IHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgcGFkZGluZzogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPERpZmZWaWV3IHBhdGNoPXtwYXRjaH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0NhcmQ+XG4gICAgICAgIClcbiAgICAgIH0pfVxuXG4gICAgICB7LyogXHU1RjcxXHU1NENEXHU4MzAzXHU1NkY0XHVGRjFBXHU2MzA5XHU5NEFFICsgXHU5OENFXHU5NjY5XHU2Nzg0XHU2MjEwICsgXHU1OTI3XHU1NkZFICsgXHU1RjcxXHU1NENEXHU3MEI5XHU2NjBFXHU3RUM2ICsgXHU4QkIwXHU1RkM2XHU4MDU0XHU1MkE4ICovfVxuICAgICAge3NlbGVjdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgPENhcmQgdGl0bGU9e3QoJ2RldGFpbC5pbXBhY3QnKX0+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2ltcGFjdExvYWRpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkSW1wYWN0KCkgfX0+XG4gICAgICAgICAgICB7aW1wYWN0TG9hZGluZyA/IHQoJ2RldGFpbC5pbXBhY3RMb2FkaW5nJykgOiB0KCdkZXRhaWwuaW1wYWN0Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAge2ltcGFjdCAhPT0gbnVsbCAmJiBpbXBhY3QuZXhwbGFuYXRpb25zQ2FjaGVkID09PSB0cnVlICYmIChcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5iYWRnZSgnIzhiOGI4YicpLCBtYXJnaW5MZWZ0OiAnOHB4JyB9fT5cbiAgICAgICAgICAgICAge3QoJ2NhY2hlLmhpdCcpfXtpbXBhY3QuZ2VuZXJhdGVkQXQgPyAnIFx1MDBCNyAnICsgbmV3IERhdGUoaW1wYWN0LmdlbmVyYXRlZEF0KS50b0xvY2FsZVN0cmluZygpIDogJyd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7aW1wYWN0ICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgbWFyZ2luTGVmdDogJzhweCcsIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBkaXNhYmxlZD17aW1wYWN0TG9hZGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRJbXBhY3QodHJ1ZSkgfX0+XG4gICAgICAgICAgICAgIHt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtpbXBhY3QgIT09IG51bGwgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICcxMHB4JywgbWFyZ2luOiAnMTBweCAwIDRweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLmJhZGdlKGltcGFjdFJpc2tDb2xvciksIGZvbnRTaXplOiAnMTNweCcsIHBhZGRpbmc6ICczcHggMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICB7dCgnaW1wYWN0LnJpc2snKX06IHtpbXBhY3Qucmlza0xldmVsfVx1RkYwOHtpbXBhY3Qucmlza1Njb3JlfVx1RkYwOVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7aW1wYWN0LmtleUNoYW5nZVBvaW50cyAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5rZXlDaGFuZ2VQb2ludHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJyM5YTY3MDAnIH19Plx1MjZBMCB7dCgnaW1wYWN0LmtleVBvaW50cycpfToge2ltcGFjdC5rZXlDaGFuZ2VQb2ludHMubWFwKChmaWxlKSA9PiBmaWxlLnNwbGl0KCcvJykucG9wKCkpLmpvaW4oJ1x1MzAwMScpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge2ltcGFjdC5yaXNrRmFjdG9ycyAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5yaXNrRmFjdG9ycy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnNlY3Rpb25UaXRsZX0+e3QoJ2ltcGFjdC5mYWN0b3JzJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogJzJweCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgICAgICB7aW1wYWN0LnJpc2tGYWN0b3JzLm1hcCgoZmFjdG9yLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgZm9udFNpemU6ICcxMnB4JywgcGFkZGluZzogJzNweCA4cHgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tZHN3LWFsaWFzLWJnLWxheWVyLTEsICNmYWZhZmEpJywgYm9yZGVyUmFkaXVzOiAnNHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntmYWN0b3IudGV4dH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogaW1wYWN0Umlza0NvbG9yLCBmb250V2VpZ2h0OiA2MDAgfX0+K3tmYWN0b3IucG9pbnRzfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPEltcGFjdEdyYXBoIGRhdGE9e2ltcGFjdH0gdD17dH0gLz5cbiAgICAgICAgICAgICAge2ltcGFjdC5sZXZlbHMubGVuZ3RoID09PSAwICYmIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ2ltcGFjdC5ub25lJyl9PC9kaXY+fVxuICAgICAgICAgICAgICB7LyogXHU1MUZEXHU2NTcwXHU3RUE3XHU1RjcxXHU1NENEXHVGRjFBXHU2NzJDXHU2QjIxXHU0RkVFXHU2NTM5XHU0RTg2XHU1NEVBXHU0RTlCXHU1MUZEXHU2NTcwXHUzMDAxXHU2Q0UyXHU1M0NBXHU0RTg2XHU4QzAxXHU3Njg0XHU1NEVBXHU0RTlCXHU1MUZEXHU2NTcwXHUzMDAxXHU4QzAzXHU3NTI4XHU3MEI5XHU1NzI4XHU1NEVBICovfVxuICAgICAgICAgICAgICB7aW1wYWN0LmZ1bmN0aW9uSW1wYWN0ICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LmZ1bmN0aW9uSW1wYWN0Lmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIG1hcmdpblRvcDogJzEycHgnIH19Pnt0KCdpbXBhY3QuZnVuY3Rpb25zJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogJzhweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtpbXBhY3QuZnVuY3Rpb25JbXBhY3QubWFwKChlbnRyeSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlbnRyeS5zeW1ib2x9IHN0eWxlPXt7IGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMDgpKScsIGJvcmRlclJhZGl1czogJzZweCcsIHBhZGRpbmc6ICc4cHggMTBweCcsIGJhY2tncm91bmQ6ICd2YXIoLS1kc3ctYWxpYXMtYmctYmFzZSwgI2ZmZiknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjZDk3NzA2Jyl9PntlbnRyeS5zeW1ib2x9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMubGFiZWwsIG1hcmdpbkxlZnQ6ICc4cHgnIH19PntlbnRyeS5kZWZpbmVkSW59PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZW50cnkucm9sZSAhPT0gdW5kZWZpbmVkICYmIGVudHJ5LnJvbGUgIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCwgbWFyZ2luVG9wOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBkaXNwbGF5OiAnaW5saW5lJywgbWFyZ2luSW5saW5lRW5kOiAnNnB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Pnt0KCdpbXBhY3QuZnVuY1JvbGUnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LnJvbGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5jaGFuZ2UgIT09IHVuZGVmaW5lZCAmJiBlbnRyeS5jaGFuZ2UgIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMuc2VjdGlvblRpdGxlLCBkaXNwbGF5OiAnaW5saW5lJywgbWFyZ2luSW5saW5lRW5kOiAnNnB4JywgY29sb3I6ICcjOWE2NzAwJyB9fT57dCgnaW1wYWN0LmZ1bmNDaGFuZ2UnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmltcGFjdCAhPT0gdW5kZWZpbmVkICYmIGVudHJ5LmltcGFjdCAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy53aGF0LCBtYXJnaW5Cb3R0b206ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWN0aW9uVGl0bGUsIGRpc3BsYXk6ICdpbmxpbmUnLCBtYXJnaW5JbmxpbmVFbmQ6ICc2cHgnLCBjb2xvcjogJyNjZTkxNzgnIH19Pnt0KCdpbXBhY3QuZnVuY0NhbGxlcnMnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmltcGFjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAge2VudHJ5LmNhbGxlcnMubWFwKChjYWxsZXIsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7IC4uLnN0eWxlcy5sb2dpY1N0ZXAsIG1hcmdpblRvcDogJzNweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICcjZDk3NzA2JyB9fT5cdTIxQjM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogJ21vbm9zcGFjZScsIGZvbnRTaXplOiAnMTFweCcsIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2FsbGVyLmZpbGV9OntjYWxsZXIubGluZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+XHUyMDE0IHtjYWxsZXIuc25pcHBldC5zbGljZSgwLCA4MCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7aW1wYWN0LmZ1bmN0aW9uSW1wYWN0ICE9PSB1bmRlZmluZWQgJiYgaW1wYWN0LmZ1bmN0aW9uSW1wYWN0Lmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnaW1wYWN0LmZ1bmN0aW9uc05vbmUnKX08L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge2ltcGFjdC5tZW1vcmllcyAhPT0gdW5kZWZpbmVkICYmIGltcGFjdC5tZW1vcmllcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnLCBib3JkZXI6ICcxcHggZGFzaGVkIHJnYmEoMzcsOTksMjM1LDAuMzUpJywgYm9yZGVyUmFkaXVzOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtYnJhbmQtcHJpbWFyeSwgIzI1NjNlYiknIH19Pnt0KCdpbXBhY3QubWVtb3J5Jyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleFdyYXA6ICd3cmFwJywgZ2FwOiAnNnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAge2ltcGFjdC5tZW1vcmllcy5tYXAoKG1lbW9yeSwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGtleT17aX0gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzI1NjNlYicpfT57bWVtb3J5LnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBcdTY3MDBcdTRGMThcdTYwMjdcdTY4MzhcdTY3RTVcdUZGMUFcdTdFRDNcdThCQkEgKyBcdTdFRDNcdTY3ODRcdTUzMTZcdTk1RUVcdTk4OThcdTZFMDVcdTUzNTUgKi99XG4gICAgICB7c2VsZWN0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICA8Q2FyZCB0aXRsZT17dCgnZGV0YWlsLm9wdGltYWxpdHknKX0+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e3Jldmlld0xvYWRpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBsb2FkUmV2aWV3cygpIH19PlxuICAgICAgICAgICAge3Jldmlld0xvYWRpbmcgPyB0KCdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnKSA6IHQoJ2RldGFpbC5vcHRpbWFsaXR5Jyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAge3NlbGVjdGVkVGFyZ2V0cy5tYXAoKHRhcmdldCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgciA9IHJldmlld3NbdGFyZ2V0XVxuICAgICAgICAgICAgaWYgKHIgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGxcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGFyZ2V0ID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IHRhcmdldC5zbGljZSgwLCA4KVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2ByLSR7dGFyZ2V0fWB9IHN0eWxlPXt7IG1hcmdpblRvcDogJzEwcHgnIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLnNlY3Rpb25UaXRsZSwgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICAgICAgICAgIHtyLmNhY2hlZCA9PT0gdHJ1ZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e3QoJ2NhY2hlLmhpdCcpfXtyLmdlbmVyYXRlZEF0ID8gJyBcdTAwQjcgJyArIG5ldyBEYXRlKHIuZ2VuZXJhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCkgOiAnJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX0gb25DbGljaz17KCkgPT4geyB2b2lkIGxvYWRSZXZpZXdzKHRydWUpIH19Pnt0KCdjYWNoZS5yZWdlbmVyYXRlJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge3IudmVyZGljdCAhPT0gJycgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMud2hhdCwgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDUpJywgYm9yZGVyOiAnMXB4IHNvbGlkIHJnYmEoMzcsOTksMjM1LDAuMiknLCBib3JkZXJSYWRpdXM6ICc2cHgnLCBwYWRkaW5nOiAnOHB4IDEwcHgnIH19PntyLnZlcmRpY3R9PC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7ci5pc3N1ZUxpc3QgIT09IHVuZGVmaW5lZCAmJiByLmlzc3VlTGlzdC5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRyPntbJ3Jldmlldy5jb2wuc2V2ZXJpdHknLCAncmV2aWV3LmNvbC5jYXRlZ29yeScsICdyZXZpZXcuY29sLnRpdGxlJywgJ3Jldmlldy5jb2wuZXZpZGVuY2UnLCAncmV2aWV3LmNvbC5maXgnXS5tYXAoKGtleSkgPT4gPHRoIGtleT17a2V5fSBzdHlsZT17c3R5bGVzLnRofT57dChrZXkpfTwvdGg+KX08L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAge3IuaXNzdWVMaXN0Lm1hcCgoaXNzdWUsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShpc3N1ZS5zZXZlcml0eSA9PT0gJ2NyaXRpY2FsJyA/ICcjZjE0YzRjJyA6IGlzc3VlLnNldmVyaXR5ID09PSAnaGlnaCcgPyAnI2NlOTE3OCcgOiBpc3N1ZS5zZXZlcml0eSA9PT0gJ21lZGl1bScgPyAnI2RjZGNhYScgOiAnIzU2OWNkNicpfT57aXNzdWUuc2V2ZXJpdHl9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXNzdWUuY2F0ZWdvcnl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntpc3N1ZS50aXRsZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgLi4uc3R5bGVzLnRkLCBmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgZm9udFNpemU6ICcxMXB4Jywgd29yZEJyZWFrOiAnYnJlYWstYWxsJyB9fT57aXNzdWUuZXZpZGVuY2V9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntpc3N1ZS5maXh9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdyZXZpZXcuY2xlYW4nKX08L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KX1cbiAgICAgICAgICB7cmV2aWV3TG9hZGluZyAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdkZXRhaWwub3B0aW1hbGl0eUxvYWRpbmcnKX08L2Rpdj59XG4gICAgICAgICAgeyFyZXZpZXdMb2FkaW5nICYmIHNlbGVjdGVkVGFyZ2V0cy5ldmVyeSgodGFyZ2V0KSA9PiByZXZpZXdzW3RhcmdldF0gPT09IHVuZGVmaW5lZCkgJiYgKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgncmV2aWV3LmhpbnQnKX08L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NhcmQ+XG4gICAgICApfVxuICAgIDwvPlxuICApXG5cbiAgLy8gXHUyNTAwXHUyNTAwIFx1OEJCRVx1N0Y2RVx1OTg3NVx1N0I3RSBcdTI1MDBcdTI1MDBcbiAgY29uc3QgVElFUl9MQUJFTFM6IEFycmF5PHsga2V5OiBzdHJpbmc7IHpoOiBzdHJpbmc7IGRlc2M6IHN0cmluZyB9PiA9IFtcbiAgICB7IGtleTogJ3N0YW5kYXJkJywgemg6ICdcdTg5RTNcdThCRkIgLyBcdTUxRkRcdTY1NzBcdTVGNzFcdTU0Q0RcdThCRjRcdTY2MEUnLCBkZXNjOiAnXHU2M0QwXHU0RUE0XHU2ODM4XHU2N0U1XHU3Njg0IEFJIFx1ODlFM1x1OEJGQlx1MzAwMVx1NUY3MVx1NTRDRFx1NTIwNlx1Njc5MCcgfSxcbiAgICB7IGtleTogJ3JlYXNvbmluZycsIHpoOiAnXHU2NzAwXHU0RjE4XHU2MDI3XHU2ODM4XHU2N0U1IC8gXHU2MjY3XHU4ODRDXHU4QkExXHU1MjEyJywgZGVzYzogJ1x1OEJDNFx1NUJBMVx1MzAwMVx1OEJBMVx1NTIxMlx1NzUxRlx1NjIxMFx1MzAwMUFJIFx1NUI2Nlx1NEU2MFx1NjAzQlx1N0VEMycgfSxcbiAgICB7IGtleTogJ2Zhc3QnLCB6aDogJ1x1NTM4Nlx1NTNGMlx1OEY3Qlx1Njc5MCcsIGRlc2M6ICdcdTYyNkJcdTYzQ0ZcdTUzODZcdTUzRjJcdTY1RjZcdTc2ODRcdTkwMTBcdTYzRDBcdTRFQTRcdTRFMDBcdTUzRTVcdThCREQnIH0sXG4gICAgeyBrZXk6ICd2ZXJpZmllcicsIHpoOiAnXHU5QThDXHU2NTM2JywgZGVzYzogJ1x1NjUzOVx1NTJBOFx1OUE4Q1x1NjUzNlx1NzY4NCBBSSBcdTU5MERcdTY4MzgnIH0sXG4gIF1cblxuICBjb25zdCBzZXR0aW5nc1RhYiA9IChcbiAgICA8PlxuICAgICAgey8qIFx1NkEyMVx1NTc4Qlx1NTIwNlx1OTE0RFx1RkYxQVx1NTNFRlx1ODlDNlx1NTMxNlx1NTIwN1x1NjM2Mlx1NTQwNFx1NEVGQlx1NTJBMVx1NzUyOFx1NzY4NFx1NkEyMVx1NTc4Qlx1RkYwQ1x1NEZERFx1NUI1OFx1NTM3M1x1NzUxRlx1NjU0OCAqL31cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdtb2RlbC50aXRsZScpfT5cbiAgICAgICAge21vZGVsVGllcnMgPT09IG51bGwgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnbW9kZWwubG9hZGluZycpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICB7VElFUl9MQUJFTFMubWFwKCh0aWVyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBtb2RlbFRpZXJzW3RpZXIua2V5XVxuICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnQgPyBjdXJyZW50LnByb3ZpZGVyICsgJy8nICsgY3VycmVudC5tb2RlbCA6ICcnXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e3RpZXIua2V5fSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzEwcHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1pbldpZHRoOiAxNTAsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6IDYwMCB9fT57dGllci56aH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlcy5pbnB1dCwgd2lkdGg6IDI0MCB9fVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHYgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgIGlmICh2ID09PSAnJykgeyBzZXRNb2RlbFRpZXJzKHsgLi4ubW9kZWxUaWVycywgW3RpZXIua2V5XTogeyBwcm92aWRlcjogJycsIG1vZGVsOiAnJyB9IH0pOyByZXR1cm4gfVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtwcm92aWRlciwgLi4ucmVzdF0gPSB2LnNwbGl0KCcvJylcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IHJlc3Quam9pbignLycpXG4gICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZWxUaWVycyh7IC4uLm1vZGVsVGllcnMsIFt0aWVyLmtleV06IHsgcHJvdmlkZXIsIG1vZGVsIH0gfSlcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt0KCdtb2RlbC5mb2xsb3dDaGF0Jyl9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIHttb2RlbE9wdGlvbnMubWFwKChvcHRpb24pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfSB2YWx1ZT17b3B0aW9uLnByb3ZpZGVyICsgJy8nICsgb3B0aW9uLmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRpb24ucHJvdmlkZXJ9IC8ge29wdGlvbi5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3RpZXIuZGVzY308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzhweCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Ub3A6ICc2cHgnIH19PlxuICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17bW9kZWxTYXZpbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBzYXZlTW9kZWxDb25maWcoKSB9fT5cbiAgICAgICAgICAgICAgICB7bW9kZWxTYXZpbmcgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnbW9kZWwuc2F2ZScpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAge21vZGVsU2F2ZWQgJiYgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnIzRlYzliMCcpfT57dCgnbW9kZWwuc2F2ZWQnKX08L3NwYW4+fVxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnbW9kZWwuaGludCcpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgIDwvPlxuICApXG5cbiAgY29uc3Qgb3ZlcnZpZXdUYWIgPSAoXG4gICAgPD5cbiAgICAgIDxDYXJkPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17Ym9vdHN0cmFwcGluZ30gb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkJvb3RzdHJhcCgpIH19PlxuICAgICAgICAgICAge2Jvb3RzdHJhcHBpbmcgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLnJlc2NhbicpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5zZWNvbmRhcnl9IGRpc2FibGVkPXtidXN5ICE9PSBudWxsfSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdhbmFseXplJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2FuYWx5emUnLCB7fSkgfX0+XG4gICAgICAgICAgICB7YnVzeSA9PT0gJ2FuYWx5emUnID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ2FjdGlvbi5hbmFseXplJyl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGx9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ3ZlcmlmeScsICcvcHJvamVjdC1jb250cm9sL2FwaS92ZXJpZnknLCB7fSkgfX0+XG4gICAgICAgICAgICB7YnVzeSA9PT0gJ3ZlcmlmeScgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnYWN0aW9uLnZlcmlmeScpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2FyZD5cbiAgICAgIHtyZXN1bHRQYW5lbH1cbiAgICAgIHtwcm9qZWN0ID09PSBudWxsID8gKFxuICAgICAgICA8Q2FyZD5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCwgZm9udFNpemU6ICcxM3B4JywgbWFyZ2luQm90dG9tOiAnNnB4JyB9fT57dCgnc3RhdGUubm9Qcm9qZWN0Jyl9PC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc3RhdGUubm9Qcm9qZWN0SGludCcpfTwvZGl2PlxuICAgICAgICA8L0NhcmQ+XG4gICAgICApIDogKFxuICAgICAgICA8Q2FyZCB0aXRsZT17YCR7dCgnc3RhdGUucHJvamVjdCcpfVx1RkYxQSR7cHJvamVjdC5uYW1lfWB9PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+Um9vdDwvc3Bhbj57cHJvamVjdC5yb290UGF0aH08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2Jvb3RzdHJhcCAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm93fT5cbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBzdHlsZT17c3R5bGVzLmxhYmVsfT57dCgnc3RhdGUudGVjaFN0YWNrJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAge2Jvb3RzdHJhcC50ZWNoU3RhY2subWFwKCh0ZWNoKSA9PiA8c3BhbiBrZXk9e3RlY2h9IHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM0ZWM5YjAnKX0+e3RlY2h9PC9zcGFuPil9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvd30+XG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLnN5bWJvbHMnKX08L3NwYW4+e1N0cmluZyhib290c3RyYXAuc3ltYm9sc0NvdW50KX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+PHNwYW4gc3R5bGU9e3N0eWxlcy5sYWJlbH0+e3QoJ3N0YXRlLm1hbmlmZXN0cycpfTwvc3Bhbj57U3RyaW5nKGJvb3RzdHJhcC5tYW5pZmVzdEZpbGVzLmxlbmd0aCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdzdGF0ZS5ldmlkZW5jZScpfTwvc3Bhbj57U3RyaW5nKHN0YXRlPy5ldmlkZW5jZUNvdW50ID8/IDApfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScsIG1hcmdpblRvcDogJzhweCcgfX0+e2Jvb3RzdHJhcC5zdW1tYXJ5fTwvZGl2PlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DYXJkPlxuICAgICAgKX1cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdjb25maXJtZWQudGl0bGUnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICA8dGV4dGFyZWEgcm93cz17Mn0gc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcGxhY2Vob2xkZXI9e3QoJ2NvbmZpcm1lZC50ZXh0Jyl9IHZhbHVlPXtjb25maXJtZWRUZXh0fSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q29uZmlybWVkVGV4dChlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ2NvbmZpcm1lZC5wYXRocycpfSB2YWx1ZT17Y29uZmlybWVkUGF0aHN9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRDb25maXJtZWRQYXRocyhlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLmJ1dHRvbn1cbiAgICAgICAgICAgIGRpc2FibGVkPXtidXN5ICE9PSBudWxsIHx8IGNvbmZpcm1lZFRleHQgPT09ICcnfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB2b2lkIHJ1bkFjdGlvbignYWRkQ29uZmlybWVkJywgJy9wcm9qZWN0LWNvbnRyb2wvYXBpL2NvbmZpcm1lZCcsIHsgdHlwZTogJ2NvbnN0cmFpbnQnLCB0ZXh0OiBjb25maXJtZWRUZXh0LCBmb3JiaWRkZW5QYXRoczogY29uZmlybWVkUGF0aHMuc3BsaXQoJywnKS5tYXAoKHBhdGgpID0+IHBhdGgudHJpbSgpKS5maWx0ZXIoKHBhdGgpID0+IHBhdGggIT09ICcnKSB9KS50aGVuKCgpID0+IHsgc2V0Q29uZmlybWVkVGV4dCgnJyk7IHNldENvbmZpcm1lZFBhdGhzKCcnKSB9KSB9fVxuICAgICAgICAgID57YnVzeSA9PT0gJ2FkZENvbmZpcm1lZCcgPyB0KCdhY3Rpb24ucnVubmluZycpIDogdCgnY29uZmlybWVkLmFkZCcpfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2NvbmZpcm1lZC5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnY29uZmlybWVkLm5vbmUnKX08L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3N0eWxlcy50YWJsZX0+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtjb25maXJtZWQubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17aXRlbS5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZSgnI2M1ODZjMCcpfT57aXRlbS50eXBlfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntpdGVtLnRleHR9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXRlbS5mb3JiaWRkZW5QYXRocy5qb2luKCcsICcpIHx8ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuc2Vjb25kYXJ5LCBwYWRkaW5nOiAnMnB4IDhweCcsIGZvbnRTaXplOiAnMTFweCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdyZW1vdmVDb25maXJtZWQnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY29uZmlybWVkL3JlbW92ZScsIHsgaWQ6IGl0ZW0uaWQgfSkgfX1cbiAgICAgICAgICAgICAgICAgICAgPlx1MjcxNTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdhY3Rpb24uY3JlYXRlQ2hhbmdlJyl9PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZm9ybVJvd30+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHBsYWNlaG9sZGVyPXt0KCdmb3JtLmNoYW5nZVRpdGxlJyl9IHZhbHVlPXtjaGFuZ2VUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldENoYW5nZVRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPXsyfSBzdHlsZT17c3R5bGVzLnRleHRhcmVhfSBwbGFjZWhvbGRlcj17dCgnZm9ybS5jaGFuZ2VEZXNjJyl9IHZhbHVlPXtjaGFuZ2VEZXNjfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Q2hhbmdlRGVzYyhlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBzdHlsZT17c3R5bGVzLmJ1dHRvbn1cbiAgICAgICAgICAgIGRpc2FibGVkPXtidXN5ICE9PSBudWxsIHx8IGNoYW5nZVRpdGxlID09PSAnJ31cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdm9pZCBydW5BY3Rpb24oJ2NyZWF0ZUNoYW5nZScsICcvcHJvamVjdC1jb250cm9sL2FwaS9jaGFuZ2VzJywgeyB0aXRsZTogY2hhbmdlVGl0bGUsIGRlc2NyaXB0aW9uOiBjaGFuZ2VEZXNjIH0pLnRoZW4oKCkgPT4geyBzZXRDaGFuZ2VUaXRsZSgnJyk7IHNldENoYW5nZURlc2MoJycpIH0pIH19XG4gICAgICAgICAgPntidXN5ID09PSAnY3JlYXRlQ2hhbmdlJyA/IHQoJ2FjdGlvbi5ydW5uaW5nJykgOiB0KCdhY3Rpb24uY3JlYXRlQ2hhbmdlJyl9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7Y2hhbmdlcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57dCgnc3RhdGUubm9DaGFuZ2VzJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+e1snY2hhbmdlcy5jb2wudGl0bGUnLCAnY2hhbmdlcy5jb2wudHlwZScsICdjaGFuZ2VzLmNvbC5zdGF0dXMnLCAnY2hhbmdlcy5jb2wudXBkYXRlZCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7Y2hhbmdlcy5tYXAoKGNoYW5nZSkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e2NoYW5nZS5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2NoYW5nZS50aXRsZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PntjaGFuZ2UudHlwZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoY2hhbmdlLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgPyAnIzRlYzliMCcgOiAnIzU2OWNkNicpfT57Y2hhbmdlLnN0YXR1c308L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57Zm9ybWF0VGltZShjaGFuZ2UudXBkYXRlZEF0KX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2coeyB0aXRsZTogJ1x1NTIyMFx1OTY2NFx1OEZEOVx1NEUyQVx1NTNEOFx1NjZGNFx1NEVGQlx1NTJBMVx1RkYxRicsIG1lc3NhZ2U6ICdcdTMwMEMnICsgY2hhbmdlLnRpdGxlICsgJ1x1MzAwRFx1NTNDQVx1NTE3Nlx1NTE2OFx1OTBFOFx1NjI2N1x1ODg0Q1x1OEJCMFx1NUY1NVx1MzAwMVx1OEJBMVx1NTIxMlx1MzAwMVx1OTVFRVx1OTg5OFx1NkUwNVx1NTM1NVx1NUMwNlx1ODhBQlx1NkMzOFx1NEU0NVx1NTIyMFx1OTY2NFx1MzAwMicsIGRhbmdlcjogdHJ1ZSwgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdkZWxldGVDaGFuZ2UnLCAnL3Byb2plY3QtY29udHJvbC9hcGkvY2hhbmdlcy9kZWxldGUnLCB7IGlkOiBjaGFuZ2UuaWQgfSkgfSB9KSB9fT5cdTI3MTU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgPC8+XG4gIClcblxuICAvLyBcdTI1MDBcdTI1MDAgXHU2MjY3XHU4ODRDXHU0RTJEXHU1RkMzXHU5ODc1XHU3QjdFXHVGRjFBXHU5ODc1XHU5NzYyXHU3NkY0XHU2M0E1XHU1MjFCXHU1RUZBXHU1RTc2XHU1NDJGXHU1MkE4XHU2MjY3XHU4ODRDXHVGRjBDXHU4MDRBXHU1OTI5XHU1M0VBXHU2NjJGXHU1M0U2XHU0RTAwXHU3OUNEXHU1MTY1XHU1M0UzIFx1MjUwMFx1MjUwMFxuICBjb25zdCBleGVjdXRpb25UYWIgPSAoXG4gICAgPD5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdleGVjLmNyZWF0ZScpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnZXhlYy5mb3JtVGl0bGUnKX0gdmFsdWU9e2V4ZWNUaXRsZX0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldEV4ZWNUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcm93cz17M30gcGxhY2Vob2xkZXI9e3QoJ2V4ZWMuZm9ybURlc2MnKX0gdmFsdWU9e2V4ZWNEZXNjfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RXhlY0Rlc2MoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gZGlzYWJsZWQ9e2J1c3kgIT09IG51bGwgfHwgZXhlY1RpdGxlLnRyaW0oKSA9PT0gJycgfHwgZXhlY0Rlc2MudHJpbSgpID09PSAnJ30gb25DbGljaz17KCkgPT4geyB2b2lkIHN0YXJ0UnVuKCkgfX0+XG4gICAgICAgICAgICB7YnVzeSA9PT0gJ3N0YXJ0UnVuJyA/IHQoJ2V4ZWMuc3RhcnRpbmcnKSA6IHQoJ2V4ZWMuc3RhcnQnKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e3QoJ2V4ZWMuY3JlYXRlSGludCcpfTwvZGl2PlxuICAgICAgPC9DYXJkPlxuICAgICAge3Jlc3VsdFBhbmVsfVxuICAgICAgPENhcmQ+XG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb3d9PlxuICAgICAgICAgIDxzcGFuPjxzcGFuIHN0eWxlPXtzdHlsZXMubGFiZWx9Pnt0KCdleGVjLmF0dGVtcHRzJyl9PC9zcGFuPntTdHJpbmcoc3RhdGU/LmF0dGVtcHRzQ291bnQgPz8gMCl9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3J1bnMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ3N0YXRlLm5vUnVucycpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ2V4ZWMuY29sLmNoYW5nZScsICdleGVjLmNvbC5zdGVwcycsICdleGVjLmNvbC5zdGF0dXMnLCAnZXhlYy5jb2wuc3RhcnRlZCcsICdleGVjLmNvbC5jb3N0J10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtydW5zLm1hcCgocnVuKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17cnVuLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57KGNoYW5nZXMuZmluZCgoY2hhbmdlKSA9PiBjaGFuZ2UuaWQgPT09IHJ1bi5jaGFuZ2VJZCk/LnRpdGxlKSA/PyBydW4uY2hhbmdlSWR9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57cnVuLnN0ZXBzVG90YWwgPyAocnVuLnN0ZXBzRG9uZSA/PyAwKSArICcvJyArIHJ1bi5zdGVwc1RvdGFsIDogJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShydW4uc3RhdHVzID09PSAnY29tcGxldGVkJyA/ICcjNGVjOWIwJyA6IHJ1bi5zdGF0dXMgPT09ICdmYWlsZWQnID8gJyNmMTRjNGMnIDogJyNkY2RjYWEnKX0+e3J1bi5zdGF0dXN9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICB7cnVuLmN1cnJlbnRTdGVwICE9PSBudWxsICYmIHJ1bi5jdXJyZW50U3RlcCAhPT0gdW5kZWZpbmVkICYmIHJ1bi5zdGF0dXMgPT09ICdydW5uaW5nJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJywgbWF4V2lkdGg6IDE2MCwgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH19PntydW4uY3VycmVudFN0ZXB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntmb3JtYXRUaW1lKHJ1bi5zdGFydGVkQXQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3J1bi5jb3N0VXNkICE9PSB1bmRlZmluZWQgPyAnJCcgKyBydW4uY29zdFVzZC50b0ZpeGVkKDQpIDogJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICA8Lz5cbiAgKVxuXG4gIC8vIFx1MjUwMFx1MjUwMCBcdTdCMTRcdThCQjBcdTRFMEVcdThCQjBcdTVGQzZcdTk4NzVcdTdCN0UgXHUyNTAwXHUyNTAwXG4gIGNvbnN0IG5vdGVzVGFiID0gKFxuICAgIDw+XG4gICAgICB7LyogXHUyNTAwXHUyNTAwIFx1N0IxNFx1OEJCMFx1RkYxQVx1NTM2MVx1NzI0N1x1NUYwRlx1OTYwNVx1OEJGQiArIFx1NTkxQVx1ODg0Q1x1N0YxNlx1OEY5MSArIFx1NjQxQ1x1N0QyMiArIEFJIFx1NjAzQlx1N0VEMyBcdTI1MDBcdTI1MDAgKi99XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnbm90ZXMudGl0bGUnKX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc4cHgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZmxleFdyYXA6ICd3cmFwJywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIHdpZHRoOiAyMjAgfX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0KCdub3Rlcy5zZWFyY2gnKX1cbiAgICAgICAgICAgIHZhbHVlPXtub3RlU2VhcmNofVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldE5vdGVTZWFyY2goZS50YXJnZXQudmFsdWUpIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLnNlY29uZGFyeX0gZGlzYWJsZWQ9e2FpU3VtbWFyaXppbmd9IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBhaVN1bW1hcml6ZSgpIH19PlxuICAgICAgICAgICAge2FpU3VtbWFyaXppbmcgPyB0KCdub3Rlcy5haVN1bW1hcnlSdW4nKSA6ICdcdTI3MjggJyArIHQoJ25vdGVzLmFpU3VtbWFyeScpfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMuZm9ybVJvdywgYm9yZGVyOiAnMXB4IGRhc2hlZCB2YXIoLS1kc3ctYWxpYXMtYm9yZGVyLWwyLCByZ2JhKDUsNSw1LDAuMTUpKScsIGJvcmRlclJhZGl1czogJzhweCcsIHBhZGRpbmc6ICcxMHB4JyB9fT5cbiAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5pbnB1dH0gcGxhY2Vob2xkZXI9e3QoJ25vdGVzLmZvcm1UaXRsZScpfSB2YWx1ZT17bm90ZVRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0Tm90ZVRpdGxlKGUudGFyZ2V0LnZhbHVlKSB9fSAvPlxuICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX1cbiAgICAgICAgICAgIHJvd3M9ezR9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17dCgnbm90ZXMuY29udGVudEhpbnQnKX1cbiAgICAgICAgICAgIHZhbHVlPXtub3RlQ29udGVudH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXROb3RlQ29udGVudChlLnRhcmdldC52YWx1ZSkgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIHtzZWxlY3RlZFRhcmdldHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIGNvbG9yOiAndmFyKC0tZHN3LWFsaWFzLWxhYmVsLXNlY29uZGFyeSwgIzZiNzI4MCknIH19PlxuICAgICAgICAgICAgICB7dCgnbm90ZXMuYm91bmRUbycpfToge3NlbGVjdGVkVGFyZ2V0c1swXSA9PT0gJ3dvcmtpbmcnID8gdCgncmVwby53b3JraW5nJykgOiBzZWxlY3RlZFRhcmdldHNbMF0uc2xpY2UoMCwgOCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBkaXNhYmxlZD17bm90ZVRpdGxlLnRyaW0oKSA9PT0gJycgfHwgbm90ZUNvbnRlbnQudHJpbSgpID09PSAnJ30gb25DbGljaz17KCkgPT4geyB2b2lkIGFkZE5vdGUoKSB9fT57dCgnbm90ZXMuYWRkJyl9PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICBjb25zdCBrZXl3b3JkID0gbm90ZVNlYXJjaC50cmltKCkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgIGNvbnN0IHZpc2libGUgPSBrZXl3b3JkID09PSAnJ1xuICAgICAgICAgICAgPyBub3Rlc1xuICAgICAgICAgICAgOiBub3Rlcy5maWx0ZXIoKG5vdGUpID0+IChub3RlLnRpdGxlICsgJyAnICsgbm90ZS5jb250ZW50KS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGtleXdvcmQpKVxuICAgICAgICAgIGlmICh2aXNpYmxlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e25vdGVzLmxlbmd0aCA9PT0gMCA/IHQoJ25vdGVzLmVtcHR5JykgOiB0KCdub3Rlcy5lbXB0eVNlYXJjaCcpfTwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdmlzaWJsZS5tYXAoKG5vdGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzU3VtbWFyeSA9IG5vdGUuc2hhID09PSAnc3VtbWFyeSdcbiAgICAgICAgICAgIGNvbnN0IGVkaXRpbmcgPSBlZGl0aW5nTm90ZSAhPT0gbnVsbCAmJiBlZGl0aW5nTm90ZS5pZCA9PT0gbm90ZS5pZCA/IGVkaXRpbmdOb3RlIDogbnVsbFxuICAgICAgICAgICAgY29uc3QgZXhwYW5kZWQgPSBub3RlRXhwYW5kZWRbbm90ZS5pZF0gPT09IHRydWVcbiAgICAgICAgICAgIGNvbnN0IGxvbmcgPSBub3RlLmNvbnRlbnQubGVuZ3RoID4gMjYwIHx8IG5vdGUuY29udGVudC5zcGxpdCgnXFxuJykubGVuZ3RoID4gNlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17bm90ZS5pZH1cbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLm5vdGVDYXJkLFxuICAgICAgICAgICAgICAgICAgLi4uKGlzU3VtbWFyeSA/IHsgYmFja2dyb3VuZDogJ3JnYmEoMzcsOTksMjM1LDAuMDQpJywgYm9yZGVyQ29sb3I6ICdyZ2JhKDM3LDk5LDIzNSwwLjMpJyB9IDoge30pLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7ZWRpdGluZyAhPT0gbnVsbCA/IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5mb3JtUm93fT5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuaW5wdXR9IHZhbHVlPXtlZGl0aW5nLnRpdGxlfSBvbkNoYW5nZT17KGUpID0+IHsgc2V0RWRpdGluZ05vdGUoeyAuLi5lZGl0aW5nLCB0aXRsZTogZS50YXJnZXQudmFsdWUgfSkgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHN0eWxlPXtzdHlsZXMudGV4dGFyZWF9IHJvd3M9ezh9IHZhbHVlPXtlZGl0aW5nLmNvbnRlbnR9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRFZGl0aW5nTm90ZSh7IC4uLmVkaXRpbmcsIGNvbnRlbnQ6IGUudGFyZ2V0LnZhbHVlIH0pIH19IC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6ICc2cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJ1dHRvbiwgcGFkZGluZzogJzRweCAxMnB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgc2F2ZU5vdGVFZGl0KCkgfX0+e3QoJ25vdGVzLnNhdmUnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICc0cHggMTJweCcgfX0gb25DbGljaz17KCkgPT4geyBzZXRFZGl0aW5nTm90ZShudWxsKSB9fT57dCgnbm90ZXMuY2FuY2VsJyl9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVSb3d9PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ub3RlVGl0bGVUZXh0fT57aXNTdW1tYXJ5ID8gJ1x1RDgzRFx1RENENiAnIDogJyd9e25vdGUudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzRweCcsIGZsZXhTaHJpbms6IDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7IC4uLnN0eWxlcy5zZWNvbmRhcnksIHBhZGRpbmc6ICcycHggOHB4JywgZm9udFNpemU6ICcxMXB4JyB9fSBvbkNsaWNrPXsoKSA9PiB7IHNldEVkaXRpbmdOb3RlKHsgaWQ6IG5vdGUuaWQsIHRpdGxlOiBub3RlLnRpdGxlLCBjb250ZW50OiBub3RlLmNvbnRlbnQgfSkgfX0+e3QoJ25vdGVzLmVkaXQnKX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLnNlY29uZGFyeSwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgc2V0Q29uZmlybURpYWxvZyh7IHRpdGxlOiAnXHU1MjIwXHU5NjY0XHU4RkQ5XHU2NzYxXHU3QjE0XHU4QkIwXHVGRjFGJywgbWVzc2FnZTogJ1x1MzAwQycgKyBub3RlLnRpdGxlICsgJ1x1MzAwRFx1NUMwNlx1ODhBQlx1NkMzOFx1NEU0NVx1NTIyMFx1OTY2NFx1RkYwQ1x1NEUwRFx1NTNFRlx1NjA2Mlx1NTkwRFx1MzAwMicsIGRhbmdlcjogdHJ1ZSwgb25Db25maXJtOiAoKSA9PiB7IHZvaWQgcmVtb3ZlTm90ZShub3RlLmlkKSB9IH0pIH19Plx1MjcxNTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubm90ZUNvbnRlbnQsIC4uLihsb25nICYmICFleHBhbmRlZCA/IHN0eWxlcy5ub3RlQ2xhbXAgOiB7fSkgfX0+e25vdGUuY29udGVudH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2xvbmcgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5saW5rQnRufSBvbkNsaWNrPXsoKSA9PiB7IHNldE5vdGVFeHBhbmRlZCh7IC4uLm5vdGVFeHBhbmRlZCwgW25vdGUuaWRdOiAhZXhwYW5kZWQgfSkgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZXhwYW5kZWQgPyB0KCdub3Rlcy5jb2xsYXBzZScpIDogdCgnbm90ZXMuZXhwYW5kJyl9XHVGRjA4e25vdGUuY29udGVudC5sZW5ndGh9IFx1NUI1N1x1RkYwOVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMubm90ZU1ldGF9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntuZXcgRGF0ZShub3RlLmNyZWF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAge2lzU3VtbWFyeSAmJiA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjMjU2M2ViJyl9Pnt0KCdub3Rlcy5zdW1tYXJ5VGFnJyl9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAgICB7bm90ZS5zaGEgIT09IHVuZGVmaW5lZCAmJiBub3RlLnNoYSAhPT0gJ3N1bW1hcnknICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoJyM4YjhiOGInKX0+e25vdGUuc2hhID09PSAnd29ya2luZycgPyB0KCdyZXBvLndvcmtpbmcnKSA6IG5vdGUuc2hhLnNsaWNlKDAsIDgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pKCl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgnbWVtb3J5LnJlY29yZCcpICsgKHByb2plY3QgIT09IG51bGwgPyAnIFx1MDBCNyAnICsgcHJvamVjdC5uYW1lIDogJycpfT5cbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmZvcm1Sb3d9PlxuICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzLmlucHV0fSBwbGFjZWhvbGRlcj17dCgnZm9ybS5tZW1vcnlUaXRsZScpfSB2YWx1ZT17bWVtb3J5VGl0bGV9IG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRNZW1vcnlUaXRsZShlLnRhcmdldC52YWx1ZSkgfX0gLz5cbiAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9e3N0eWxlcy50ZXh0YXJlYX0gcm93cz17M30gcGxhY2Vob2xkZXI9e3QoJ2Zvcm0ubWVtb3J5Q29udGVudCcpfSB2YWx1ZT17bWVtb3J5Q29udGVudH0gb25DaGFuZ2U9eyhlKSA9PiB7IHNldE1lbW9yeUNvbnRlbnQoZS50YXJnZXQudmFsdWUpIH19IC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlcy5idXR0b259XG4gICAgICAgICAgICBkaXNhYmxlZD17YnVzeSAhPT0gbnVsbCB8fCBtZW1vcnlUaXRsZSA9PT0gJycgfHwgbWVtb3J5Q29udGVudCA9PT0gJyd9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHZvaWQgcnVuQWN0aW9uKCdyZWNvcmRNZW1vcnknLCAnL3Byb2plY3QtY29udHJvbC9hcGkvbWVtb3J5JywgeyBtZW1vcnlUeXBlOiAncHJvamVjdF9sb2cnLCB0aXRsZTogbWVtb3J5VGl0bGUsIGNvbnRlbnQ6IG1lbW9yeUNvbnRlbnQgfSkudGhlbigoKSA9PiB7IHNldE1lbW9yeVRpdGxlKCcnKTsgc2V0TWVtb3J5Q29udGVudCgnJykgfSkgfX1cbiAgICAgICAgICA+e2J1c3kgPT09ICdyZWNvcmRNZW1vcnknID8gdCgnYWN0aW9uLnJ1bm5pbmcnKSA6IHQoJ21lbW9yeS5yZWNvcmQnKX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtwcm9qZWN0ICE9PSBudWxsICYmIChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAnOHB4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzZweCcsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzExcHgnLCBjb2xvcjogJ3ZhcigtLWRzdy1hbGlhcy1sYWJlbC1zZWNvbmRhcnksICM2YjcyODApJyB9fT57dCgnbWVtb3J5LmJyYW5jaFNjb3BlJyl9PC9zcGFuPlxuICAgICAgICAgICAgPHNlbGVjdCBzdHlsZT17eyAuLi5zdHlsZXMuaW5wdXQsIHdpZHRoOiAnYXV0bycsIHBhZGRpbmc6ICczcHggOHB4JyB9fSB2YWx1ZT17bWVtb3J5QnJhbmNofSBvbkNoYW5nZT17KGUpID0+IHsgc2V0TWVtb3J5QnJhbmNoKGUudGFyZ2V0LnZhbHVlKSB9fT5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt0KCdtZW1vcnkuYnJhbmNoQWxsJyl9PC9vcHRpb24+XG4gICAgICAgICAgICAgIHtBcnJheS5mcm9tKG5ldyBTZXQobWVtb3JpZXMuZmlsdGVyKChtZW1vcnkpID0+IG1lbW9yeS5wcm9qZWN0SWQgPT09IHByb2plY3QuaWQpLm1hcCgobWVtb3J5KSA9PiBtZW1vcnkuZ2l0QnJhbmNoKS5maWx0ZXIoKGJyYW5jaCk6IGJyYW5jaCBpcyBzdHJpbmcgPT4gYnJhbmNoICE9PSBudWxsICYmIGJyYW5jaCAhPT0gJycpKSkubWFwKChicmFuY2gpID0+IChcbiAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17YnJhbmNofSB2YWx1ZT17YnJhbmNofT57YnJhbmNofTwvb3B0aW9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICB7bWVtb3JpZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+e3QoJ21lbW9yeS5lbXB0eScpfTwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPntbJ21lbW9yeS5jb2wudGl0bGUnLCAnbWVtb3J5LmNvbC5jb250ZW50JywgJ21lbW9yeS5jb2wudHlwZScsICdtZW1vcnkuY29sLnRydXRoJywgJ21lbW9yeS5jb2wuYnJhbmNoJywgJ21lbW9yeS5jb25maXJtJ10ubWFwKChrZXkpID0+IDx0aCBrZXk9e2tleX0gc3R5bGU9e3N0eWxlcy50aH0+e3Qoa2V5KX08L3RoPil9PC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHttZW1vcmllc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIoKG1lbW9yeSkgPT4gcHJvamVjdCA9PT0gbnVsbCB8fCBwcm9qZWN0ID09PSB1bmRlZmluZWQgfHwgbWVtb3J5LnByb2plY3RJZCA9PT0gcHJvamVjdC5pZClcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChtZW1vcnkpID0+IG1lbW9yeUJyYW5jaCA9PT0gJycgfHwgbWVtb3J5LmdpdEJyYW5jaCA9PT0gbWVtb3J5QnJhbmNoKVxuICAgICAgICAgICAgICAgIC5tYXAoKG1lbW9yeSkgPT4gKFxuICAgICAgICAgICAgICAgIDx0ciBrZXk9e21lbW9yeS5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e21lbW9yeS50aXRsZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IC4uLnN0eWxlcy50ZCwgZm9udFNpemU6ICcxMXB4JywgY29sb3I6ICd2YXIoLS1kc3ctYWxpYXMtbGFiZWwtc2Vjb25kYXJ5LCAjNmI3MjgwKScgfX0+e21lbW9yeS5jb250ZW50ID8/ICdcdTIwMTQnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e21lbW9yeS50eXBlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+PHNwYW4gc3R5bGU9e3N0eWxlcy5iYWRnZShtZW1vcnkuaXNIdW1hbkNvbmZpcm1lZCA/ICcjNGVjOWIwJyA6ICcjZGNkY2FhJyl9PnttZW1vcnkuaXNIdW1hbkNvbmZpcm1lZCA/ICdjb25maXJtZWQnIDogbWVtb3J5LnRydXRoTGV2ZWx9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e21lbW9yeS5naXRCcmFuY2ggPz8gJ1x1MjAxNCd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT5cbiAgICAgICAgICAgICAgICAgICAge21lbW9yeS5pc0h1bWFuQ29uZmlybWVkXG4gICAgICAgICAgICAgICAgICAgICAgPyA8c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKCcjNGVjOWIwJyl9Plx1MjcxMzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA6IDxidXR0b24gc3R5bGU9e3sgLi4uc3R5bGVzLmJ1dHRvbiwgcGFkZGluZzogJzJweCA4cHgnLCBmb250U2l6ZTogJzExcHgnIH19IG9uQ2xpY2s9eygpID0+IHsgdm9pZCBjb25maXJtTWVtb3J5KG1lbW9yeS5pZCkgfX0+e3QoJ21lbW9yeS5jb25maXJtJyl9PC9idXR0b24+fVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICAgIDxDYXJkIHRpdGxlPXt0KCdjb25jZXB0cy50aXRsZScpfT5cbiAgICAgICAge2NvbmNlcHRzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdjb25jZXB0cy5ub25lJyl9PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+e1snY29uY2VwdHMuY29sLm5hbWUnLCAnY29uY2VwdHMuY29sLmNhdGVnb3J5JywgJ2NvbmNlcHRzLmNvbC5jb3VudCddLm1hcCgoa2V5KSA9PiA8dGgga2V5PXtrZXl9IHN0eWxlPXtzdHlsZXMudGh9Pnt0KGtleSl9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7Y29uY2VwdHMubWFwKChjb25jZXB0KSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17Y29uY2VwdC5pZH0+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2NvbmNlcHQubmFtZX08L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9Pntjb25jZXB0LmNhdGVnb3J5fTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e1N0cmluZyhjb25jZXB0Lm9jY3VycmVuY2VzKX08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApfVxuICAgICAgPC9DYXJkPlxuICAgICAgPENhcmQgdGl0bGU9e3QoJ3Jldmlldy5yZWNvcmRzVGl0bGUnKX0+XG4gICAgICAgIHtpc3N1ZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5lbXB0eX0+XHUyMDE0PC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXtzdHlsZXMudGFibGV9PlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7aXNzdWVzLnNsaWNlKDAsIDIwKS5tYXAoKGlzc3VlKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17aXNzdWUuaWR9PlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXtzdHlsZXMudGR9PjxzcGFuIHN0eWxlPXtzdHlsZXMuYmFkZ2UoaXNzdWUuc2V2ZXJpdHkgPT09ICdjcml0aWNhbCcgfHwgaXNzdWUuc2V2ZXJpdHkgPT09ICdoaWdoJyA/ICcjY2U5MTc4JyA6ICcjNTY5Y2Q2Jyl9Pntpc3N1ZS5zZXZlcml0eX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXNzdWUudGl0bGV9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT57aXNzdWUuc3RhdHVzfTwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICl9XG4gICAgICA8L0NhcmQ+XG4gICAgICA8Q2FyZCB0aXRsZT17dCgndmVyaWZ5LnJlY29yZHMnKX0+XG4gICAgICAgIHt2ZXJpZmljYXRpb25zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Plx1MjAxNDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17c3R5bGVzLnRhYmxlfT5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3ZlcmlmaWNhdGlvbnMuc2xpY2UoMCwgMjApLm1hcCgocmVjb3JkKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17cmVjb3JkLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17c3R5bGVzLnRkfT48c3BhbiBzdHlsZT17c3R5bGVzLmJhZGdlKHJlY29yZC5zdGF0dXMgPT09ICdwYXNzZWQnID8gJyM0ZWM5YjAnIDogJyNkY2RjYWEnKX0+e3JlY29yZC5zdGF0dXN9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e3JlY29yZC5uYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3N0eWxlcy50ZH0+e2Zvcm1hdFRpbWUocmVjb3JkLmNyZWF0ZWRBdCl9PC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZD5cbiAgICA8Lz5cbiAgKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvb3R9IGRhdGEtdGVzdGlkPVwicHJvamVjdC1jb250cm9sLXdvcmtzcGFjZVwiPlxuICAgICAgPHN0eWxlPntMQVlPVVRfU1RZTEV9PC9zdHlsZT5cbiAgICAgIDxkaXZcbiAgICAgICAgZGF0YS10ZXN0aWQ9XCJwcm9qZWN0LWNvbnRyb2wtZGl2aWRlclwiXG4gICAgICAgIG9uUG9pbnRlckRvd249e29uRGl2aWRlckRvd259XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogMCwgYm90dG9tOiAwLCByaWdodDogLTQsIHdpZHRoOiA4LFxuICAgICAgICAgIGN1cnNvcjogJ2NvbC1yZXNpemUnLCB6SW5kZXg6IDIwLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5uYXZ9PlxuICAgICAgICA8c3BhbiBzdHlsZT17c3R5bGVzLnRpdGxlfT57dCgnd29ya3NwYWNlLnRpdGxlJyl9PC9zcGFuPlxuICAgICAgICB7dGFicy5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgPGJ1dHRvbiBrZXk9e2VudHJ5LmtleX0gc3R5bGU9e3N0eWxlcy50YWIodGFiID09PSBlbnRyeS5rZXkpfSBvbkNsaWNrPXsoKSA9PiB7IHNldFRhYihlbnRyeS5rZXkpIH19PntlbnRyeS5sYWJlbH08L2J1dHRvbj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5ib2R5fT5cbiAgICAgICAge2xvYWRFcnJvciAhPT0gbnVsbCAmJiA8ZGl2IHN0eWxlPXtzdHlsZXMuZW1wdHl9Pnt0KCdlcnJvci5sb2FkJyl9OiB7bG9hZEVycm9yfTwvZGl2Pn1cbiAgICAgICAge3N0YXRlPy5yZWFkeSA9PT0gZmFsc2UgJiYgPGRpdiBzdHlsZT17c3R5bGVzLmVtcHR5fT57c3RhdGUucmVhc29uID8/ICcnfTwvZGl2Pn1cbiAgICAgICAge3RhYiA9PT0gJ2NvbW1pdHMnICYmIGNvbW1pdHNUYWJ9XG4gICAgICAgIHt0YWIgPT09ICdvdmVydmlldycgJiYgb3ZlcnZpZXdUYWJ9XG4gICAgICAgIHt0YWIgPT09ICdleGVjdXRpb24nICYmIGV4ZWN1dGlvblRhYn1cbiAgICAgICAge3RhYiA9PT0gJ25vdGVzJyAmJiBub3Rlc1RhYn1cbiAgICAgICAge3RhYiA9PT0gJ3NldHRpbmdzJyAmJiBzZXR0aW5nc1RhYn1cbiAgICAgIDwvZGl2PlxuICAgICAge2NvbmZpcm1EaWFsb2cgIT09IG51bGwgJiYgKFxuICAgICAgICA8Q29uZmlybURpYWxvZ1xuICAgICAgICAgIHRpdGxlPXtjb25maXJtRGlhbG9nLnRpdGxlfVxuICAgICAgICAgIG1lc3NhZ2U9e2NvbmZpcm1EaWFsb2cubWVzc2FnZX1cbiAgICAgICAgICBkYW5nZXI9e2NvbmZpcm1EaWFsb2cuZGFuZ2VyfVxuICAgICAgICAgIG9uQ2FuY2VsPXsoKSA9PiB7IHNldENvbmZpcm1EaWFsb2cobnVsbCkgfX1cbiAgICAgICAgICBvbkNvbmZpcm09eygpID0+IHsgY29uZmlybURpYWxvZy5vbkNvbmZpcm0oKTsgc2V0Q29uZmlybURpYWxvZyhudWxsKSB9fVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWlCQSxJQUFBQSxnQkFBa0I7OztBQ1ZsQixtQkFBa0I7QUFXWCxJQUFNLGFBQXdDLENBQUM7QUFBQSxFQUNwRCxRQUFRO0FBQUEsRUFDUixlQUFlO0FBQUEsRUFDZixhQUFhO0FBQUEsRUFDYixZQUFZO0FBQUEsRUFDWjtBQUFBLEVBQ0EsU0FBUztBQUNYLE1BQU07QUFDSixTQUFPLGFBQUFDLFFBQU07QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLE1BQ0UsZUFBZTtBQUFBLE1BQ2YsT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUztBQUFBLFFBQ1QsUUFBUTtBQUFBLFFBQ1IsaUJBQWlCO0FBQUEsUUFDakIsT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLE1BQ1o7QUFBQSxJQUNGO0FBQUEsSUFDQSxhQUFBQSxRQUFNO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE9BQU87QUFBQSxVQUNMLFNBQVM7QUFBQSxVQUNULGdCQUFnQjtBQUFBLFVBQ2hCLFlBQVk7QUFBQSxVQUNaLGNBQWM7QUFBQSxVQUNkLFlBQVk7QUFBQSxRQUNkO0FBQUEsTUFDRjtBQUFBLE1BQ0EsYUFBQUEsUUFBTSxjQUFjLFFBQVEsTUFBTSxhQUFNLEtBQUssRUFBRTtBQUFBLE1BQy9DLGFBQUFBLFFBQU07QUFBQSxRQUNKO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTztBQUFBLFlBQ0wsVUFBVTtBQUFBLFlBQ1YsU0FBUztBQUFBLFlBQ1QsY0FBYztBQUFBLFlBQ2QsaUJBQWlCO0FBQUEsWUFDakIsT0FBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxhQUFBQSxRQUFNO0FBQUEsTUFDSjtBQUFBLE1BQ0EsRUFBRSxPQUFPLEVBQUUsU0FBUyxRQUFRLEtBQUssUUFBUSxVQUFVLFFBQVEsU0FBUyxJQUFJLEVBQUU7QUFBQSxNQUMxRSxhQUFBQSxRQUFNLGNBQWMsUUFBUSxNQUFNLGFBQU0sWUFBWSxRQUFRO0FBQUEsTUFDNUQsYUFBQUEsUUFBTSxjQUFjLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxVQUFVLEVBQUUsR0FBRyxJQUFJLFVBQVUsRUFBRTtBQUFBLE1BQzdFLGFBQUFBLFFBQU0sY0FBYyxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sVUFBVSxFQUFFLEdBQUcsSUFBSSxTQUFTLEVBQUU7QUFBQSxNQUM1RSxhQUNJLGFBQUFBLFFBQU07QUFBQSxRQUNKO0FBQUEsUUFDQSxFQUFFLE9BQU8sRUFBRSxTQUFTLEtBQUssWUFBWSxZQUFZLEVBQUU7QUFBQSxRQUNuRCxJQUFJLFVBQVU7QUFBQSxNQUNoQixJQUNBO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFDRjs7O0FDakVBLElBQUFDLGdCQUEyQztBQTB4Q25DO0FBeHJDUixJQUFNLGVBQWU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFvQnJCLElBQU0sc0JBQXNCLE1BQW9DO0FBQzlELFFBQU0sVUFBVSxNQUFNLEtBQUssU0FBUyxpQkFBa0MsMkNBQTJDLENBQUMsRUFDL0csS0FBSyxDQUFDLFNBQVMsS0FBSyxnQkFBZ0IsR0FBRztBQUMxQyxRQUFNLFVBQVUsU0FBUztBQUN6QixRQUFNLFlBQVksU0FBUyxVQUFVLE1BQU0sS0FBSyxFQUFFLEtBQUssQ0FBQ0MsVUFBU0EsTUFBSyxTQUFTLE9BQU8sQ0FBQztBQUN2RixNQUFJLFlBQVksVUFBYSxZQUFZLFFBQVEsY0FBYyxVQUFhLGlCQUFpQixPQUFPLEVBQUUsY0FBYyxTQUFVLFFBQU87QUFDckksUUFBTSxRQUFRLFNBQVMsY0FBYyxPQUFPO0FBQzVDLFFBQU0sS0FBSztBQUNYLFFBQU0sY0FBYztBQUFBLGFBQ1QsU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFZcEIsV0FBUyxLQUFLLFlBQVksS0FBSztBQUMvQixTQUFPO0FBQ1Q7QUFZTyxJQUFNLGlCQUFpQjtBQUFBLEVBQzVCLElBQUk7QUFBQSxJQUNGLG1CQUFtQjtBQUFBLElBQ25CLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLGlCQUFpQjtBQUFBLElBQ2pCLGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLElBQ2hCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGlCQUFpQjtBQUFBLElBQ2pCLHVCQUF1QjtBQUFBLElBQ3ZCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBRWhCLG9CQUFvQjtBQUFBLElBQ3BCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLHFCQUFxQjtBQUFBLElBQ3JCLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLHNCQUFzQjtBQUFBLElBQ3RCLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLG1CQUFtQjtBQUFBLElBQ25CLHFCQUFxQjtBQUFBLElBQ3JCLHNCQUFzQjtBQUFBLElBQ3RCLGFBQWE7QUFBQSxJQUNiLG9CQUFvQjtBQUFBLElBQ3BCLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGlCQUFpQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNk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YTtBQUFBLE1BQ3pCO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBR0QsUUFBTSxtQkFBbUIsQ0FBQyxVQUF5QyxDQUFDLFVBQWU7QUFDakYsVUFBTSxTQUFTLE9BQU87QUFDdEIsVUFBTSxPQUFPLE9BQU8sV0FBVyxXQUMzQixTQUNBLFFBQVEsV0FBVyxRQUFRLFVBQVUsUUFBUSxZQUFZLFNBQVMsS0FBSyxVQUFVLFFBQVEsTUFBTSxDQUFDLElBQUk7QUFDeEcsV0FBTyxjQUFBQSxRQUFNO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxRQUNFLE9BQU87QUFBQSxVQUNMLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxVQUNSLFlBQVk7QUFBQSxVQUNaLFVBQVU7QUFBQSxVQUNWLFlBQVk7QUFBQSxVQUNaLFlBQVk7QUFBQSxVQUNaLFdBQVc7QUFBQSxVQUNYLFdBQVc7QUFBQSxRQUNiO0FBQUEsTUFDRjtBQUFBLE1BQ0EsY0FBQUEsUUFBTSxjQUFjLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxLQUFLLGNBQWMsTUFBTSxFQUFFLEdBQUcsS0FBSztBQUFBLE1BQ3JGLE9BQU8sSUFBSTtBQUFBLElBQ2I7QUFBQSxFQUNGO0FBR0EsTUFBSSxNQUFNLE9BQU8sc0JBQXNCLE1BQU07QUFDM0MsV0FBTyxJQUFJLE1BQU0sU0FBUztBQUFBLE1BQ3hCLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNQLEdBQUcsQ0FBQyxVQUFlO0FBQ2pCLFVBQUksT0FBTyxhQUFhLGlCQUFrQixRQUFPO0FBQ2pELFlBQU0sU0FBUyxPQUFPO0FBQ3RCLGFBQU8sY0FBQUEsUUFBTSxjQUFjLFlBQVk7QUFBQSxRQUNyQyxPQUFPO0FBQUEsUUFDUCxjQUFjLFFBQVEsZ0JBQWdCO0FBQUEsUUFDdEMsWUFBWSxRQUFRLGNBQWM7QUFBQSxRQUNsQyxXQUFXLFFBQVEsYUFBYTtBQUFBLFFBQ2hDLFlBQVksUUFBUTtBQUFBLFFBQ3BCLFFBQVEsU0FBUyxjQUFjO0FBQUEsTUFDakMsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELGFBQVcsQ0FBQyxTQUFTLEtBQUssS0FBSztBQUFBLElBQzdCLENBQUMsYUFBYSw0QkFBVztBQUFBLElBQ3pCLENBQUMsY0FBYyxvQ0FBUztBQUFBLElBQ3hCLENBQUMsb0JBQW9CLGlDQUFRO0FBQUEsRUFDL0IsR0FBWTtBQUNWLFFBQUksTUFBTSxPQUFPLHNCQUFzQixNQUFNO0FBQzNDLGFBQU8sSUFBSSxNQUFNLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixLQUFLLFFBQVEsR0FBRyxpQkFBaUIsS0FBSyxDQUFDO0FBQUEsSUFDakcsQ0FBQztBQUFBLEVBQ0g7QUFDRjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJuYW1lIiwgIlJlYWN0IiwgImFwcGx5IiwgImZyYW1lIiwgIlJlYWN0Il0KfQo=
