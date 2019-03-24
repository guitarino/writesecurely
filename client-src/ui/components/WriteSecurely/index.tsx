import { h, render } from "preact";
import { WriteSecurely } from "./WriteSecurely";

export function renderAt(root: HTMLElement) {
    render(
        <WriteSecurely />,
        root
    );
}