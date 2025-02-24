// @ts-ignore
import { marked } from "../node_modules/marked/lib/marked.esm.js";
export async function loadMarkdown(file, element = document.body) {
    if (file === "" || !file.endsWith(".md")) {
        throw new SyntaxError("Invalid file");
    }
    let text = await (await fetch(file)).text();
    text = text.replace(/---(.|\n)*?---/g, '');
    element.innerHTML = await marked.parse(text);
}
window.loadMarkdown = loadMarkdown;
