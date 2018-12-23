import { h } from "preact";
import "./DiarySelection.scss";

export class DiarySelection {
    render() {
        return (
            <div class="DiarySelection">
                <div class="DiarySelection__Content">
                    <DiaryBook title="+" />
                    <DiaryBook title="Personal diary" />
                    <DiaryBook title="Poetry book" />
                    <DiaryBook title="Diary for ideas" />
                    <DiaryBook title="Secret wishes" />
                </div>
            </div>
        );
    }
}

export function DiaryBook({ title }) {
    return (
        <div class="DiaryBook">
            <div class="DiaryBook__Title">
                { title }
            </div>
        </div>
    )
}