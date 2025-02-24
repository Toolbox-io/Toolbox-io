import {Utils} from "../common.js";
import switchTab = Utils.switchTab;

document.addEventListener("DOMContentLoaded", () => {
    // @ts-ignore
    document.getElementById("issues").addEventListener("click", () => {
        switchTab(1);
    });

    // @ts-ignore
    document.getElementById("home").addEventListener("click", () => {
        switchTab(0);
    });
})