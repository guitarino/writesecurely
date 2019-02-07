import { h } from "preact";
import "./NotebookSelection.scss";
import { WriteSecurelyLabel } from "../WriteSecurelyLogo/WriteSecurelyLogo";

export class NotebookSelection {
    render() {
        return (
            <div class="NotebookSelection">
                <div class="NotebookSelection__Header NotebookSelection__Section">
                    <WriteSecurelyLabel /> 
                </div>
                <div class="NotebookSelection__Content">
                    <NotebookBook title="+" bigTitle />
                    <NotebookBook title="Personal notebook notebook notebook notebook notebook notebook notebook notebook notebook notebook notebook notebook notebook notebook notebook" />
                    <NotebookBook title="Poetry book" />
                    <NotebookBook title="Notebook for ideas" />
                    <NotebookBook title="Secret wishes" />
                </div>
            </div>
        );
    }
}

export function NotebookBook({ title, bigTitle }) {
    return (
        <div class={`NotebookBook ${bigTitle ? `NotebookBook--BigTitle` : ``}`}>
            <div class="NotebookBook__Content">
                <div class="NotebookBook__Title">
                    { title }
                </div>
            </div>
        </div>
    )
}