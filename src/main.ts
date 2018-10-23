import "@babel/polyfill";
import "./main.scss";

async function main() {
    const root = document.getElementById("WriteSecurely");
    const { renderAt } = await import('./components/App');
    renderAt(root);
}

document.addEventListener("DOMContentLoaded", main);