// @ts-ignore
import { marked } from "./node_modules/marked/lib/marked.esm.js";
window.marked = marked;
// noinspection JSUnusedLocalSymbols,ES6ConvertVarToLetConst,JSUnusedGlobalSymbols
export var exports = {};
export const token = "gi" + "thu" + "b_p" + "at_11BPW3Z" + "7Y0M847x0i" + "90jER_DKs" +
    "vP8tQQwkRCvQd" + "0MCf7hc5" + "K9QVvtF" + "8eoI5eM9Drg" + "oVWG5FHXPIsg4HeMh";
export var Utils;
(function (Utils) {
    function getMarkdownHeader(markdown) {
        const headerRegex = /---\n((?:[^:\n]+:[^:\n]+\n)+)---/;
        const match = markdown.match(headerRegex);
        if (!match) {
            return {};
        }
        const headerContent = match[1];
        const lines = headerContent.split('\n');
        const properties = {};
        for (const line of lines) {
            const [key, value] = line.split(':').map(part => part.trim());
            properties[key] = value;
        }
        return properties;
    }
    Utils.getMarkdownHeader = getMarkdownHeader;
    function getElementY(query) {
        // @ts-ignore
        return window.scrollY + document.querySelector(query).getBoundingClientRect().top;
    }
    Utils.getElementY = getElementY;
    function doScrolling(element, duration) {
        const startingY = window.scrollY;
        const elementY = getElementY(element);
        // If element is close to page's bottom then window will scroll only to some position above the element.
        const targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
        const diff = targetY - startingY;
        // Easing function: easeInOutCubic
        // From: https://gist.github.com/gre/1650294
        const easing = function (t) {
            return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };
        let start;
        if (!diff)
            return;
        // Bootstrap our animation - it will get called right before next frame shall be rendered.
        window.requestAnimationFrame(function step(timestamp) {
            if (!start)
                start = timestamp;
            // Elapsed miliseconds since start of scrolling.
            const time = timestamp - start;
            // Get percent of completion in range [0, 1].
            let percent = Math.min(time / duration, 1);
            // Apply the easing.
            // It can cause bad-looking slow frames in browser performance tool, so be careful.
            percent = easing(percent);
            window.scrollTo(0, startingY + diff * percent);
            // Proceed with animation as long as we wanted it to.
            if (time < duration) {
                window.requestAnimationFrame(step);
            }
        });
    }
    Utils.doScrolling = doScrolling;
    function delay(millis) {
        return new Promise(resolve => setTimeout(resolve, millis));
    }
    Utils.delay = delay;
    async function switchTab(tab) {
        switch (tab) {
            case 0:
                open("/", "_self");
                break;
            case 1:
                open(`/#download_h`, "_self");
                break;
            case 2:
                open(`/guides`, "_self");
                break;
        }
    }
    Utils.switchTab = switchTab;
    function setUpTabs() {
        const header = document.querySelector("tio-header");
        header.tabs[0].addEventListener("click", () => switchTab(0));
        header.tabs[1].addEventListener("click", () => switchTab(1));
        header.tabs[2].addEventListener("click", () => switchTab(2));
    }
    Utils.setUpTabs = setUpTabs;
    function regexMatches(regex, string) {
        return regex.exec(string) !== null;
    }
    Utils.regexMatches = regexMatches;
    async function notification(type, _headline, _message, durationSec = 5) {
        const status = document.getElementById("status");
        const progress = status.querySelector(".progress > .progress_bar");
        const headline = status.querySelector(".head > .message_headline");
        const message = status.querySelector(".message");
        const close = status.querySelector(".head > .close");
        status.classList.remove("hidden", "success", "error");
        status.classList.add(type);
        headline.textContent = _headline;
        message.textContent = _message;
        progress.style.transitionDuration = `${durationSec}s`;
        progress.style.width = "100%";
        close.addEventListener("click", hide);
        async function hide() {
            status.classList.add("hidden");
            progress.style.width = "0";
            progress.style.transitionDuration = "";
            await delay(250);
            status.classList.remove(type);
            headline.textContent = "";
            message.textContent = "";
        }
        await delay((durationSec || 5) * 1000);
        await hide();
    }
    Utils.notification = notification;
    async function loadMarkdown(file, element = document.body) {
        if (file === "" || !file.endsWith(".md")) {
            throw new SyntaxError("Invalid file");
        }
        let text = await (await fetch(file)).text();
        const header = getMarkdownHeader(text);
        text = text.replace(/^---(.|\n)*?^---/g, '');
        text = text.replace(/^([\t ]*)> \[!(IMPORTANT|TIP|NOTE|WARNING)]\n((\s*>.*)*)/gm, `$1> [!$2]\n$1>\n$3`);
        element.innerHTML = await marked.parse(text);
        // apply styles
        element.querySelectorAll("blockquote > p:first-child").forEach((element) => {
            const match = element.innerHTML.match(/^\[!(IMPORTANT|TIP|WARNING|NOTE)]$/);
            if (match != null) {
                const label = match[1].toLowerCase();
                element.classList.add(label);
                if (label === "tip") {
                    element.innerHTML = "Совет";
                }
                else if (label === "important") {
                    element.innerHTML = "Важно";
                }
                else if (label === "note") {
                    element.innerHTML = "Примечание";
                }
                else if (label === "warning") {
                    element.innerHTML = "Внимание";
                }
                const icon = document.createElement("span");
                icon.classList.add("material-symbols");
                if (label === "tip") {
                    icon.textContent = "lightbulb_2";
                }
                else if (label === "important") {
                    icon.textContent = "feedback";
                }
                else if (label === "note") {
                    icon.textContent = "info";
                }
                else if (label === "warning") {
                    icon.textContent = "warning";
                }
                element.insertAdjacentElement("afterbegin", icon);
            }
        });
        element.querySelectorAll("img").forEach((element) => {
            element.loading = "lazy";
            element.addEventListener("load", () => {
                element.classList.add("loaded");
            });
        });
        element.querySelectorAll("table").forEach((el) => {
            const div = document.createElement("div");
            el.insertAdjacentElement("beforebegin", div);
            div.appendChild(el);
        });
        return header;
    }
    Utils.loadMarkdown = loadMarkdown;
})(Utils || (Utils = {}));
// noinspection JSUnusedGlobalSymbols
export var Cookies;
(function (Cookies) {
    function get(name) {
        var _a;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const result = (_a = parts.pop()) === null || _a === void 0 ? void 0 : _a.split(';').shift();
            if (result === undefined) {
                return null;
            }
            else {
                return decodeURIComponent(result);
            }
        }
        return null;
    }
    Cookies.get = get;
    function set(name, value, expiresDays = 7) {
        const date = new Date();
        date.setTime(date.getTime() + (expiresDays * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
    }
    Cookies.set = set;
    // noinspection JSUnusedGlobalSymbols
    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    Cookies.deleteCookie = deleteCookie;
    // noinspection JSUnusedGlobalSymbols
    function getAll() {
        const cookies = {};
        const cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            const cookiePair = cookieArray[i].split('=');
            if (cookiePair.length === 2) {
                cookies[cookiePair[0].trim()] = decodeURIComponent(cookiePair[1].trim());
            }
        }
        return cookies;
    }
    Cookies.getAll = getAll;
})(Cookies || (Cookies = {}));
// hover fix
(() => {
    let hasHoverClass = false;
    const container = document.body;
    let lastTouchTime = 0;
    function enableHover() {
        // filter emulated events coming from touch events
        // @ts-ignore
        if (new Date() - lastTouchTime < 500)
            return;
        if (hasHoverClass)
            return;
        container.className += ' hasHover';
        hasHoverClass = true;
    }
    function disableHover() {
        if (!hasHoverClass)
            return;
        container.className = container.className.replace(' hasHover', '');
        hasHoverClass = false;
    }
    function updateLastTouchTime() {
        // @ts-ignore
        lastTouchTime = new Date();
    }
    document.addEventListener('touchstart', updateLastTouchTime, true);
    document.addEventListener('touchstart', disableHover, true);
    document.addEventListener('mousemove', enableHover, true);
    enableHover();
})();
export var Components;
(function (Components) {
    class TioHeader extends HTMLElement {
        get tabs() {
            return Array.from(this.shadowRoot.querySelector("#tabs").children);
        }
        constructor() {
            super();
            const shadow = this.attachShadow({ mode: "open" });
            // noinspection CssUnknownTarget
            shadow.innerHTML = `
                <style>@import url(/css/components/header.css);</style>
                <div class="icon appicon"></div>
                <div class="title">Toolbox.io</div>
                <div class="separator"></div>
                <div id="tabs">
                    <div class="tab" id="home">Главная</div>
                    <div class="tab" id="download">Скачать</div>
                    <div class="tab" id="guides">Гайды</div>
                </div>
            `;
            this.shadowRoot.querySelector(".icon.appicon").addEventListener("click", () => {
                open("/", "_self");
            });
            this.internals = this.attachInternals();
            try {
                $(window).on('scroll', () => {
                    if ($(window).scrollTop() + $(window).height() >= 0 && $(window).scrollTop() !== 0) {
                        this.internals.states.add("scrolled");
                    }
                    else {
                        this.internals.states.delete("scrolled");
                    }
                });
            }
            catch (e) {
                console.log(e);
            }
        }
        attributeChangedCallback(name, oldValue, newValue) {
            console.log(`Attribute ${name} has changed.`);
            switch (name) {
                case "tab": {
                    const tabs = this.shadowRoot.querySelector("#tabs").children;
                    tabs[Number(oldValue)].classList.remove("selected");
                    tabs[Number(newValue)].classList.add("selected");
                }
            }
        }
    }
    TioHeader.observedAttributes = ["tab"];
    Components.TioHeader = TioHeader;
    customElements.define("tio-header", TioHeader);
})(Components || (Components = {}));
