import { Utils } from "../common.js";
var switchTab = Utils.switchTab;
var loadMarkdown = Utils.loadMarkdown;
document.getElementById("home").addEventListener("click", () => switchTab(0));
document.getElementById("download").addEventListener("click", () => {
    open(`${location.origin}#download_h`, "_self");
});
await loadMarkdown("COMPATIBILITY.md", document.getElementById("main"));
