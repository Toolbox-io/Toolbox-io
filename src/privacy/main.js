import { Utils } from "../common.js";
var setUpTabs = Utils.setUpTabs;
var loadMarkdown = Utils.loadMarkdown;
setUpTabs();
loadMarkdown("PRIVACY.md", document.getElementById("main"));
