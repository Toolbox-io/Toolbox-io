import { Utils } from "../common.js";
var loadMarkdown = Utils.loadMarkdown;
var setUpTabs = Utils.setUpTabs;
setUpTabs();
loadMarkdown("COMPATIBILITY.md", document.getElementById("main"));
