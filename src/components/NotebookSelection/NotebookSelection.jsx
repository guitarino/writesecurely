import { h } from "preact";
import "./NotebookSelection.scss";

export class NotebookSelection {
    render() {
        return (
            <div class="NotebookSelection">
                <div class="NotebookSelection__Content">
                    <NotebookBook title="+" />
                    <NotebookBook title="Personal notebook" />
                    <NotebookBook title="Poetry book" />
                    <NotebookBook title="Notebook for ideas" />
                    <NotebookBook title="Secret wishes" />
                </div>
            </div>
        );
    }
}

export function NotebookBook({ title }) {
    return (
        <div class="NotebookBook">
            <div class="NotebookBook__Title">
                { title }
            </div>
        </div>
    )
}