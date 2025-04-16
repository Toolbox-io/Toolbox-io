import { Utils } from "../common.js";
var loadMarkdown = Utils.loadMarkdown;
var setUpTabs = Utils.setUpTabs;
setUpTabs();
await loadMarkdown("COMPATIBILITY.md", document.getElementById("main"));
