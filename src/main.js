import "@babel/polyfill";
import "./main.scss";

async function main() {
    const root = document.getElementById("WriteSecurely");
    const { renderAt } = await import('./components/WriteSecurely');
    renderAt(root);
}

document.addEventListener("DOMContentLoaded", main);