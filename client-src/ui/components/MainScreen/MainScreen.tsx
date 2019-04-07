import { h } from "preact";
import { Sidebar } from "../Sidebar/Sidebar";
import "./MainScreen.scss";

export function MainScreen() {
    return (
        <div class="MainScreen">
        <Sidebar className="MainScreen__Sidebar">Sidebar</Sidebar>
            <div class="MainScreen__Editor">Editor</div>
        </div>
    )
}