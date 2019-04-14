import { h } from "preact";
import { Sidebar } from "../Sidebar/Sidebar";
import "./MainScreen.scss";
import { Editor } from "../Editor";
import { EditorSchema } from "../Editor/prosemirror/EditorSchema.types";

export function MainScreen() {
    return (
        <div className="MainScreen">
            <Sidebar className="MainScreen__Sidebar">Sidebar</Sidebar>
            <div className="MainScreen__Editor">
                <Editor className='MainScreen__EditorContent' />
            </div>
        </div>
    )
}