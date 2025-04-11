// @ts-ignore
import { marked } from "../node_modules/marked/lib/marked.esm.js"
import {getMarkdownHeader} from "../common.js";

export type GuideHeader = {
    "DisplayName": string,
    "Icon": string
}

export type GuideJSON = GuideEntry[]

export type GuideEntry = {
    type: "file" | "dir",
    name: string,
    download_url: string
}

export async function loadMarkdown(file: string, element: HTMLElement = document.body): Promise<GuideHeader> {
    if (file === "" || !file.endsWith(".md")) {
        throw new SyntaxError("Invalid file")
    }

    let text = await (await fetch(file)).text();
    const header = getMarkdownHeader(text) as GuideHeader
    text = text.replace(/---(.|\n)*?---/g, '');
    text = text.replace(
        /^([\t ]*)> \[!(IMPORTANT|TIP|NOTE|WARNING)]\n((\s*>.*)*)/gm,
        `$1> [!$2]\n$1>\n$3`
    )
    element.innerHTML = await marked.parse(text);

    // apply styles
    element.querySelectorAll("blockquote > p:first-child").forEach(
        (element: Element) => {
            const match: null | RegExpMatchArray = element.innerHTML.match(/^\[!(IMPORTANT|TIP|WARNING|NOTE)]$/);
            if (match != null) {
                const label = match[1].toLowerCase();

                element.classList.add(label);
                if (label === "tip") {
                    element.innerHTML = "Совет";
                } else if (label === "important") {
                    element.innerHTML = "Важно";
                } else if (label === "note") {
                    element.innerHTML = "Примечание";
                } else if (label === "warning") {
                    element.innerHTML = "Внимание";
                }

                const icon = document.createElement("span");
                icon.classList.add("material-symbols-outlined");
                if (label === "tip") {
                    icon.textContent = "lightbulb_2";
                } else if (label === "important") {
                    icon.textContent = "feedback";
                } else if (label === "note") {
                    icon.textContent = "info";
                } else if (label === "warning") {
                    icon.textContent = "warning";
                }

                element.insertAdjacentElement("afterbegin", icon);
            }
        }
    );

    element.querySelectorAll("img").forEach(
        (element: HTMLImageElement) => {
            element.loading = "lazy";
            element.addEventListener("load", () => {
                element.classList.add("loaded");
            });
        }
    );

    return header
}

(window as any).loadMarkdown = loadMarkdown;