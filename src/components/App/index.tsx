import { h, render } from "preact";
import { App } from "./App";

export function renderAt(element: HTMLElement) {
    render(
        <App />,
        element
    );
}