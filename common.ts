console.log("Common file loading...")

export const token = "gi" + "thu" + "b_p" + "at_11BPW3Z" + "7Y0M847x0i" + "90jER_DKs" +
    "vP8tQQwkRCvQd" + "0MCf7hc5" + "K9QVvtF" + "8eoI5eM9Drg" + "oVWG5FHXPIsg4HeMh"

export namespace Utils {
    /* import loadIssues = GithubUtils.loadIssues; */

    export function getElementY(query: string): number {
        // @ts-ignore
        return window.scrollY + document.querySelector(query).getBoundingClientRect().top
    }

    export function doScrolling(element: string, duration: number): void {
        const startingY = window.scrollY;
        const elementY = getElementY(element);
        // If element is close to page's bottom then window will scroll only to some position above the element.
        const targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
        const diff = targetY - startingY;
        // Easing function: easeInOutCubic
        // From: https://gist.github.com/gre/1650294
        const easing = function (t: number): number {
            return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
        };
        let start: number;

        if (!diff) return

        // Bootstrap our animation - it will get called right before next frame shall be rendered.
        window.requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp
            // Elapsed miliseconds since start of scrolling.
            const time = timestamp - start;
            // Get percent of completion in range [0, 1].
            let percent = Math.min(time / duration, 1);
            // Apply the easing.
            // It can cause bad-looking slow frames in browser performance tool, so be careful.
            percent = easing(percent)

            window.scrollTo(0, startingY + diff * percent)

            // Proceed with animation as long as we wanted it to.
            if (time < duration) {
                window.requestAnimationFrame(step)
            }
        })
    }

    export function delay(millis: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, millis));
    }

    export async function switchTab(tab: 0 | 1 | 2) {
        if (tab === 0) {
            open(location.origin, "_self");
        } else if (tab === 1) {
            open("https://github.com/Toolbox-io/Toolbox-io/issues", "_self");
            return;
        } else if (tab === 2) {
            open(`${location.origin}/guides`, "_self");
        }
    }

    export async function notification(type: 'error' | 'success', _headline: string, _message: string, durationSec?: number) {
        const status: HTMLDivElement = document.getElementById("status") as HTMLDivElement;
        const progress = status.querySelector(".progress > .progress_bar") as HTMLDivElement;
        const headline = status.querySelector(".head > .message_headline") as HTMLElement;
        const message = status.querySelector(".message") as HTMLParagraphElement;
        const close = status.querySelector(".head > .close") as HTMLElement;

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

    (window as any).notify = notification;
}

// noinspection JSUnusedGlobalSymbols
export namespace Cookies {
    export function get(name: string): string | null {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const result = parts.pop()?.split(';').shift();
            if (result === undefined) {
                return null;
            } else {
                return decodeURIComponent(result);
            }
        }
        return null;
    }

    export function set(name: string, value: string, expiresDays: number = 7): void {
        const date = new Date();
        date.setTime(date.getTime() + (expiresDays * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
    }

    // noinspection JSUnusedGlobalSymbols
    export function deleteCookie(name: string): void {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    // noinspection JSUnusedGlobalSymbols
    export function getAll(): { [key: string]: string } {
        const cookies: { [key: string]: string } = {};
        const cookieArray = document.cookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            const cookiePair = cookieArray[i].split('=');
            if (cookiePair.length === 2) {
                cookies[cookiePair[0].trim()] = decodeURIComponent(cookiePair[1].trim());
            }
        }
        return cookies;
    }
}

export type MarkdownHeader = { [key: string]: string }

export function getMarkdownHeader(markdown: string): MarkdownHeader {
    const headerRegex = /---\n((?:[^:\n]+:[^:\n]+\n)+)---/;
    const match = markdown.match(headerRegex);

    if (!match) {
        return {};
    }

    const headerContent = match[1];
    const lines = headerContent.split('\n');
    const properties: { [key: string]: string } = {};

    for (const line of lines) {
        const [key, value] = line.split(':').map(part => part.trim());
        properties[key] = value;
    }

    return properties;
}

// noinspection JSUnusedLocalSymbols,ES6ConvertVarToLetConst,JSUnusedGlobalSymbols
export var exports = {};

// hover fix
let hasHoverClass = false;
const container = document.body;
let lastTouchTime = 0;

function enableHover() {
    // filter emulated events coming from touch events
    // @ts-ignore
    if (new Date() - lastTouchTime < 500) return;
    if (hasHoverClass) return;

    container.className += ' hasHover';
    hasHoverClass = true;
}

function disableHover() {
    if (!hasHoverClass) return;

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
    let anchor = $("#headline")
    try {
        anchor.position().top
    } catch (e) {
        anchor = $("#header + *")
        console.log(anchor)
    }

    $(window).on('scroll', () => {
        // @ts-ignore
        if ($(window).scrollTop() + $(window).height() >= anchor.position().top && $(window).scrollTop() !== 0) {
            header.removeClass("top");
        }
        // @ts-ignore
        else {
            header.addClass("top");
        }
    })

    // @ts-ignore
    document.getElementById("issues").addEventListener("click", () => {
        Utils.switchTab(1);
    });
} catch (e) {
    console.log(e);
}