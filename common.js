console.log("Common file loading...");
export var Utils;
(function (Utils) {
    /* import loadIssues = GithubUtils.loadIssues; */
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
        if (tab === 0) {
            open(location.origin);
        }
        else if (tab === 1) {
            open("https://github.com/Toolbox-io/Toolbox-io/issues", "_self");
            return;
        }
        else if (tab === 2) {
            open(`${location.origin}/guides`);
        }
    }
    Utils.switchTab = switchTab;
    async function notification(type, _headline, _message, durationSec) {
        const status = document.getElementById("status");
        const progress = status.querySelector(".progress > .progress_bar");
        const headline = status.querySelector(".head > .message_headline");
        const message = status.querySelector(".message");
        const close = status.querySelector(".head > .close");
        status.classList.remove("hidden", "success", "error");
        status.classList.add(type);
        headline.textContent = _headline;
        message.textContent = _message;
        progress.style.transitionDuration = `${durationSec || 5}s`;
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
    window.notify = notification;
})(Utils || (Utils = {}));
// noinspection JSUnusedLocalSymbols,ES6ConvertVarToLetConst,JSUnusedGlobalSymbols
export var exports = {};
// hover fix
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
// header (if present)
try {
    const header = $("#header");
    $(window).on('scroll', () => {
        // @ts-ignore
        if ($(window).scrollTop() + $(window).height() >= $('#headline').position().top && $(window).scrollTop() !== 0) {
            header.removeClass("top");
        }
        // @ts-ignore
        else {
            header.addClass("top");
        }
    });
    // @ts-ignore
    document.getElementById("issues").addEventListener("click", () => {
        Utils.switchTab(1);
    });
}
catch (e) {
    console.log(e);
}
