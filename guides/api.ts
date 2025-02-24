// @ts-ignore
import { marked } from "../node_modules/marked/lib/marked.esm.js"

function resizeImages(element: HTMLElement) {
    element.querySelectorAll("p:has(img)").forEach((img) => {
        (img as HTMLParagraphElement).scrollTop
    });
}

export async function loadMarkdown(file: string, element: HTMLElement = document.body) {
    if (file === "" || !file.endsWith(".md")) {
        throw new SyntaxError("Invalid file")
    }

    let text = await (await fetch(file)).text();
    text = text.replace(/---(.|\n)*?---/g, '');
    element.innerHTML = await marked.parse(text);

}

(window as any).loadMarkdown = loadMarkdown;