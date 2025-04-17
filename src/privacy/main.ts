import {Utils} from "../common.js";
import setUpTabs = Utils.setUpTabs;
import loadMarkdown = Utils.loadMarkdown;

setUpTabs();

loadMarkdown("PRIVACY.md", document.getElementById("main")!!)