import "./main.scss";
import "./fonts.scss";

async function main() {
    const root = document.getElementById("WriteSecurely");
    if (root) {
        // @ts-ignore
        const { renderAt } = await import('./components/WriteSecurely');
        renderAt(root);
    }
}

document.addEventListener("DOMContentLoaded", main);