import {Cookies, getMarkdownHeader, token, Utils} from "../common.js";
import switchTab = Utils.switchTab;
import delay = Utils.delay;
import {GuideHeader, GuideJSON, loadMarkdown} from "./api.js";

let _currentPage: 0 | 1 = 0;

function sizeElements() {
    let biggestElement: HTMLDivElement | null = null
    const wrapper = document.getElementsByClassName("wrapper")[0] as HTMLDivElement;
    Array.from(wrapper.children).forEach((element) => {
        if (biggestElement !== null && biggestElement.getBoundingClientRect().height < element.getBoundingClientRect().height) {
            biggestElement = element as HTMLDivElement;
        }
        if (biggestElement === null) {
            biggestElement = element as HTMLDivElement;
        }
        console.log(element);
    });
    if (biggestElement !== null) {
        wrapper.style.height = `${(biggestElement as HTMLDivElement).getBoundingClientRect().height}px`
    }
}

async function switchPage(page: 0 | 1) {
    const wrapper = document.getElementsByClassName("wrapper")[0] as HTMLDivElement;

    const currentPage = wrapper.children[_currentPage];
    const targetPage = wrapper.children[page];

    currentPage.classList.add("page_hiding");
    targetPage.classList.add("notransition");
    targetPage.classList.add("page_showing");
    targetPage.classList.remove("notransition");
    targetPage.classList.remove("page_hidden");
    targetPage.classList.add("page_visible");
    await delay(500);
    currentPage.classList.remove("page_hiding");
    currentPage.classList.add("page_hidden");
    targetPage.classList.remove("page_showing");
    targetPage.classList.remove("page_visible");
    _currentPage = page;
    sizeElements();
}

(window as any).switchPage = switchPage;

document.addEventListener("DOMContentLoaded", async () => {
    // @ts-ignore
    document.getElementById("issues").addEventListener("click", () => {
        switchTab(1);
    });

    // @ts-ignore
    document.getElementById("home").addEventListener("click", () => {
        switchTab(0);
    });

    // @ts-ignore
    document.getElementById("download").addEventListener("click", () => {
        open(`${location.origin}#download_h`, "_self");
    });

    // @ts-ignore
    document.getElementById("help").addEventListener("click", () => {
        open(`${location.origin}#help_h`);
    });

    sizeElements();

    const guides = document.getElementById("guides_list") as HTMLDivElement;

    document.getElementById("guide_back")!!.addEventListener("click", async () => {
        await switchPage(0);
        document.getElementById("guide")!!.innerHTML = "";
    });

    let currentRatelimitRemaining = Cookies.get("guides-ratelimitRemaining");
    let currentRatelimitReset = Cookies.get("guides-ratelimitReset");
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
            "Accept": "application/json",
            "X-GitHub-Api-Version": "2022-11-28",
            "Authorization": `Bearer ${token}`
        };

        let cookiedJSON = Cookies.get("guides-json");

        const prevEtag = Cookies.get("guides-etag");
        if (prevEtag !== null && cookiedJSON !== null) {
            headers["if-none-match"] = prevEtag;
        }

        const response = await fetch(
            "https://api.github.com/repos/Toolbox-io/Toolbox-io/contents/guides",
            {
                headers: headers
            }
        );
        if (response.ok || response.status === 304) {
            let responseJSON: GuideJSON;
            if (cookiedJSON != null && response.status === 304) {
                responseJSON = JSON.parse(cookiedJSON);
                console.log("Using cached guides");
            } else {
                console.log("Getting new data");
                responseJSON = await response.json();
            }

            let savedJSON: GuideJSON = []

            for (const entry of responseJSON) {
                const type = entry.type;
                const name = entry.name;
                const download_url = entry.download_url;

                if (type === "file" && name.endsWith(".md") && name !== "README.md") {
                    try {
                        const guide_content = await (await fetch(download_url)).text();
                        const guide_header = getMarkdownHeader(guide_content) as GuideHeader;
                        const guide = document.createElement("div");
                        guide.classList.add("guide", "toucheffect");

                        const icon = document.createElement("span");
                        icon.classList.add("material-symbols-outlined", "guide_icon");
                        if (guide_header.Icon) {
                            icon.textContent = guide_header.Icon;
                        } else {
                            icon.textContent = "description";
                        }
                        guide.appendChild(icon);

                        const title = document.createElement("div");
                        title.classList.add("guide_title");
                        title.textContent = guide_header.DisplayName;
                        guide.appendChild(title);

                        guides.appendChild(guide);
                        guide.addEventListener("click", () => {
                            loadMarkdown(name, document.getElementById("guide")!!);
                            switchPage(1);
                        });
                    } catch (e) {
                        console.log(e);
                    }

                    savedJSON.push(
                        {
                            name: name,
                            type: type,
                            download_url: download_url
                        }
                    );
                }
            }

            console.log(savedJSON);

            Cookies.set("guides-json", JSON.stringify(savedJSON));
            const etag = response.headers.get("etag");
            if (etag !== null) {
                Cookies.set("guides-etag", etag);
            }

            const urlParams = new URLSearchParams(window.location.search);
            const selectedGuide = urlParams.get('guide');
            if (selectedGuide !== null) {
                await loadMarkdown(selectedGuide, document.getElementById("guide")!!);
                await switchPage(1);
            }
        } else {
            console.error(`Failed to fetch guides: ${response.status} - ${response.statusText}`);
        }

        const ratelimitRemaining = response.headers.get("x-ratelimit-remaining")!!;
        const ratelimitReset = response.headers.get("x-ratelimit-reset")!!;

        console.log(`Rate limit remaining: ${ratelimitRemaining}`);
        console.log(`reset: ${ratelimitReset}`);

        Cookies.set("guides-ratelimitRemaining", ratelimitRemaining);
        Cookies.set("guides-ratelimitReset", ratelimitReset);
    }
})