import {Utils} from "../common.js";
import loadMarkdown = Utils.loadMarkdown;
import setUpTabs = Utils.setUpTabs;

setUpTabs();

await loadMarkdown("COMPATIBILITY.md", document.getElementById("main")!!);