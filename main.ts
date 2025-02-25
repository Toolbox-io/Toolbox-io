import switchTab = Utils.switchTab;
import {Cookies, token, Utils} from "./common.js";
import doScrolling = Utils.doScrolling;
import delay = Utils.delay;

document.addEventListener("DOMContentLoaded", async () => {
    const body_wrapper = $("html");

    // @ts-ignore
    document.getElementById("download").addEventListener("click", () => {
        doScrolling('#download_h', 1000);
    });
    // @ts-ignore
    document.getElementById("home").addEventListener("click", () => {
        doScrolling('body', 1000);
    });
    // @ts-ignore
    document.getElementById("issues").addEventListener("click", () => {
        switchTab(1);
    });
    // @ts-ignore
    document.getElementById("help").addEventListener("click", () => {
        doScrolling("#help_h", 1000)
    })
    // @ts-ignore
    document.getElementById("issues_btn").addEventListener("click", () => {
        switchTab(1);
    });
    // @ts-ignore
    document.getElementById("guides").addEventListener("click", () => {
        switchTab(2);
    })

    let videoListenerActive = true;
    let videoX: number | null = null;
    let videoY: number | null = null;
    let videoElement: HTMLVideoElement | null;

    async function scaleVideo() {
        if (videoListenerActive) {
            const dialog = document.getElementById("video_dialog") as HTMLDivElement;
            dialog.classList.add("open");
            const video = document.getElementById("demo") as HTMLVideoElement;
            const rect = video.getBoundingClientRect();
            let x = rect.x;
            const y = rect.y - 10;
            if (document.documentElement.offsetWidth > 500) x -= 10;
            video.style.position = "fixed";
            video.style.left = `${x}px`;
            video.style.top = `${y}px`;
            videoX = x;
            videoY = y;
            video.style.transitionProperty = "left, top, transform";
            video.style.transitionDuration = "0.5s";
            video.style.transitionTimingFunction = "ease-out";
            video.style.zIndex = "1003";
            videoElement = document.createElement("video");
            videoElement.style.width = rect.width + "px";
            videoElement.style.height = rect.height + "px";
            videoElement.style.margin = "10px";
            videoElement.style.marginBottom = "0px";
            videoElement.style.flexShrink = "0";
            video.insertAdjacentElement("beforebegin", videoElement);
            await delay(1);
            video.style.left = `calc(50% - ${rect.width / 2}px)`;
            video.style.top = `calc(50% - ${rect.height / 2}px)`;
            video.style.transform = document.documentElement.offsetWidth <= 375 ? "scale(1.4)" : "scale(1.5)";
            videoListenerActive = false;
            video.removeEventListener("click", scaleVideo)
            await delay(500);
            video.controls = true;
        }
    }

    // @ts-ignore
    document.getElementById("demo").addEventListener("click", scaleVideo);

    // @ts-ignore
    document.getElementById("video_dialog").addEventListener("click", async () => {
        const dialog = document.getElementById("video_dialog") as HTMLDivElement;
        dialog.style.opacity = "0";
        const video = document.getElementById("demo") as HTMLVideoElement;
        video.style.left = `${videoX}px`;
        video.style.top = `${videoY}px`;
        video.style.transform = "scale(1)";
        await delay(500);
        dialog.classList.remove("open");
        dialog.style.opacity = "";
        videoListenerActive = true;
        video.controls = false;
        (video.parentElement as HTMLDivElement).removeChild((videoElement as HTMLVideoElement));
        video.style.position = "";
        video.style.zIndex = "";
        video.style.left = "";
        video.style.top = "";
        video.style.transform = "";
        videoX = null;
        videoY = null;
        video.addEventListener("click", scaleVideo);
    });

    const features = document.getElementById("features") as HTMLElement;
    const blur = document.getElementById("card_dialog") as HTMLDivElement;
    Array.from(features.children).forEach((item) => {
        const feature = item as HTMLDivElement
        if (!feature.classList.contains("replacement") && feature.classList.length > 0) {
            const replacement = document.createElement("div");
            const desc = feature.querySelector(".feature-description") as HTMLDivElement
            const longDesc = feature.querySelector(".feature-long-description") as HTMLDivElement
            const close = feature.querySelector(".feature-close") as HTMLDivElement
            feature.addEventListener("click", async () => {
                if (!feature.classList.contains("expanded")) {
                    const rect = feature.getBoundingClientRect();
                    const x = rect.x
                    const y = rect.y - 5;
                    const width = rect.width;
                    const height = rect.height;

                    replacement.classList.add("replacement");
                    if (getComputedStyle(features).gridTemplateColumns.indexOf(" ") === -1) {
                        replacement.style.width = `${width}px`;
                        replacement.style.height = `${height}px`;
                    } else {
                        replacement.style.width = "";
                        replacement.style.height = "";
                    }
                    Array.from(features.children).forEach(item2 => {
                        if (item2 != feature && item2.classList.length > 0) {
                            const item3 = item2 as HTMLDivElement
                            const rect2 = item3.getBoundingClientRect()
                            item3.style.width = `${rect2.width}px`;
                            item3.style.height = `${rect2.height}px`;
                            item3.style.boxSizing = "border-box";
                        }
                    })
                    feature.style.top = `${y}px`;
                    feature.style.left = `${x}px`;
                    feature.style.width = `${width}px`;
                    feature.style.height = `${height}px`;
                    feature.insertAdjacentElement("beforebegin", replacement);
                    feature.style.position = "fixed";
                    feature.style.boxSizing = "border-box";
                    feature.style.zIndex = "1001";
                    feature.style.transform = "none";
                    feature.style.animation = "cardExpand 0.5s ease-in-out";
                    feature.style.animationFillMode = "forwards";
                    feature.classList.add("noHover")

                    blur.classList.add("open");

                    desc.style.opacity = "0";
                    await delay(500);
                    desc.style.display = "none";

                    longDesc.style.display = "block";
                    longDesc.style.opacity = "1";

                    close.style.display = "block";
                    close.style.opacity = "1";
                    await delay(500);
                    feature.classList.add("expanded");
                }
            })
            close.addEventListener("click", async () => {
                const computedStyle = getComputedStyle(feature)
                const top = computedStyle.top;
                const left = computedStyle.left;
                const width = computedStyle.width;
                const height = computedStyle.height;
                feature.style.animation = "";
                feature.style.top = top;
                feature.style.left = left;
                feature.style.width = width;
                feature.style.height = height;
                const rect = replacement.getBoundingClientRect()
                const top2 = computedStyle.top;
                const left2 = computedStyle.left;
                feature.style.top = "";
                feature.style.left = "";
                // @ts-ignore
                const top3 = (
                    Number(
                        computedStyle.top.replace("px", "")
                    ) + (
                        replacement.getBoundingClientRect().y -
                        features.getBoundingClientRect().y
                        // @ts-ignore
                    ) - body_wrapper.scrollTop()
                ) + "px";
                // @ts-ignore
                const left3 = (
                    Number(
                        computedStyle.left.replace("px", "")
                    ) + (
                        replacement.getBoundingClientRect().x -
                        features.getBoundingClientRect().x
                        // @ts-ignore
                    ) - body_wrapper.scrollLeft()
                ) + "px";
                feature.style.top = `${top2}`;
                feature.style.left = `${left2}`;

                let tmpStyle: HTMLStyleElement | null = document.head.querySelector("style#tmp");
                if (tmpStyle == null) {
                    tmpStyle = document.createElement("style");
                }
                // noinspection CssInvalidPropertyValue
                tmpStyle.innerHTML = `
                @keyframes cardCollapse {
                    from {}
                    to {
                        top: ${top3};
                        left: ${left3};
                        width: ${rect.width}px;
                        height: ${rect.height}px;
                    }
                }
                `
                tmpStyle.id = "tmp";
                document.head.appendChild(tmpStyle);
                feature.style.animation = "cardCollapse 0.5s ease-in-out";
                feature.style.animationFillMode = "";
                longDesc.style.opacity = "0";
                close.style.opacity = "0";
                blur.style.opacity = "0";

                await delay(500);
                blur.classList.remove("open");
                blur.style.opacity = "";
                longDesc.style.display = "none";
                close.style.display = "none";
                desc.style.display = "block";
                desc.style.opacity = "1";
                feature.style.animation = "";
                replacement.remove();
                feature.style.top = "";
                feature.style.left = "";
                feature.style.width = "";
                feature.style.height = "";
                feature.style.position = "";
                feature.style.zIndex = "";
                feature.style.boxSizing = "";
                feature.style.transform = "";
                feature.classList.remove("noHover", "expanded");
                Array.from(features.children).forEach(item2 => {
                    const item3 = item2 as HTMLDivElement;
                    if (item3.classList.length > 0) {
                        item3.style.width = "";
                        item3.style.height = "";
                        item3.style.boxSizing = "";
                    }
                })
            })
        }
    });

    function countMatches(regex: RegExp, str: string) {
        let m;

        let counter = 0;

        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                console.log(`Found match, group ${groupIndex}: ${match}`);
            });
            counter++;
        }
        return counter;
    }

    function getRowHeight(grid: HTMLElement, row: number): number | null {
        let regex = /(\d+)px/gm
        let m;

        let counter = 0;

        let ret = null

        while ((m = regex.exec(getComputedStyle(grid).gridTemplateRows)) !== null) {
            counter++;
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            if (counter === row) {
                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    if (groupIndex === 1) {
                        ret = Number(match)
                    }
                });
            }
            if (ret !== null) return ret;
        }
        return ret;
    }

    function getRows(grid: HTMLElement) {
        return countMatches(/\d+px/gm, getComputedStyle(grid).gridTemplateRows);
    }

    function getColumns(grid: HTMLElement) {
        return countMatches(/\d+px/gm, getComputedStyle(grid).gridTemplateColumns);
    }

    function getItem(grid: HTMLElement, row: number, column: number): HTMLElement | null {
        // Calculate the index of the item in the grid
        const index = (row - 1) * getColumns(grid) + (column - 1);

        // Get all the grid items
        const items = grid.children;

        // Return the item at the specified index
        return items[index] as HTMLElement || null;
    }

    function setupGrid() {
        const rows = getRows(features)
        const columns = getColumns(features)

        const placeholders: HTMLDivElement[] = []

        for (let row = 1; row <= rows; row++) {
            let prevItem: HTMLElement | null = null;
            for (let column = 1; column <= columns; column++) {
                const item = getItem(features, row, column);
                if (!item && prevItem != null) {
                    const placeholder = document.createElement("div");
                    placeholder.style.height = `${getRowHeight(features, row)}px`;
                    placeholders.push(placeholder);
                } else {
                    prevItem = item;
                }
            }
        }

        for (const placeholder of placeholders) {
            features.appendChild(placeholder);
        }
    }

    function recalcPlaceholders() {
        Array.from(features.children).forEach(item => {
            const item2 = item as HTMLElement;
            if (item2.classList.length === 0) {
                item2.style.height = "";
            }
        })
        const rows = getRows(features);
        const columns = getColumns(features);

        for (let row = 1; row <= rows; row++) {
            for (let column = 1; column <= columns; column++) {
                const item = getItem(features, row, column);
                if (item !== null && item.classList.length === 0) {
                    item.style.height = `${getRowHeight(features, row)}px`;
                }
            }
        }
    }

    setupGrid();

    let rowsNow = getRows(features);
    let columnsNow = getColumns(features);
    let width = innerWidth;

    addEventListener("resize", async () => {
        let rows = getRows(features);
        let columns = getColumns(features);
        if (rows !== rowsNow || columns !== columnsNow) {
            if ((innerWidth < width && innerWidth <= 1000) || (innerWidth > width && innerWidth > 1000)) {
                await delay(500);
            }
            Array.from(features.children).forEach(item => {
                if (item.classList.length === 0) item.remove();
            })
            setupGrid();
            rowsNow = getRows(features);
            columnsNow = getColumns(features);
        } else {
            recalcPlaceholders();
        }
        width = innerWidth;
    });

    try {
        let currentRatelimitRemaining = Cookies.get("release-ratelimitRemaining");
        let currentRatelimitReset = Cookies.get("release-ratelimitReset");
        if (currentRatelimitReset === null) {
            currentRatelimitReset = (Date.now() + 100).toString();
        }
        if (currentRatelimitRemaining === null) {
            currentRatelimitRemaining = "-1";
        }

        let bool = Number(currentRatelimitRemaining) !== 0
        if (!bool) {
            bool = Date.now() > Number(currentRatelimitReset)
        }

        if (bool) {
            const headers: any = {
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
                "Authorization": `Bearer ${token}`
            }
            const prevEtag = Cookies.get("release-etag");
            if (prevEtag !== null) {
                headers["if-none-match"] = prevEtag;
            }

            const response: Response = await fetch(
                "https://api.github.com/repos/Toolbox-io/Toolbox-io/releases/latest",
                {
                    method: "GET",
                    headers: headers
                }
            );
            if (response.ok || response.status === 304) {
                let downloadUrl: string;
                if (response.status === 304) {
                    console.log("304 Not Modified");
                    downloadUrl = Cookies.get("release-download_url")!!;
                } else {
                    const responseJSON: any = await response.json();
                    downloadUrl = responseJSON.assets[0].browser_download_url;
                }
                (
                    document.getElementById("download_url") as HTMLAnchorElement
                ).href = downloadUrl;
                const etag = response.headers.get("etag")
                console.log(etag);
                if (etag !== null) {
                    Cookies.set("release-etag", etag);
                }
                Cookies.set("release-download_url", downloadUrl);
            }
            const ratelimitRemaining = response.headers.get("X-Ratelimit-Remaining")!!;
            const ratelimitReset = response.headers.get("X-Ratelimit-Reset")!!;
            Cookies.set("release-ratelimitRemaining", ratelimitRemaining);
            Cookies.set("release-ratelimitReset", ratelimitReset);
            console.log(`Rate limit remaining: ${ratelimitRemaining}`);
            console.log(`Rate limit reset: ${ratelimitReset}`);
        } else {
            console.warn(`Rate limit exceeded, it will be reset at ${Cookies.get("release-ratelimitReset")}`);
        }
    } catch (e) {
        console.log(e)
    }
});