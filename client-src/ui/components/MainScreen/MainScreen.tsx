import { h } from "preact";
import { Sidebar } from "../Sidebar/Sidebar";
import "./MainScreen.scss";
import { Editor } from "../Editor";

export function MainScreen() {
    return (
        <div className="MainScreen">
            <Sidebar className="MainScreen__Sidebar">Sidebar</Sidebar>
            <div className="MainScreen__Editor">
                <Editor
                    className='MainScreen__EditorContent'
                    initialState={null}
                    provideGetCurrentState={(getCurrentState => {
                        setInterval(() => console.log(getCurrentState()), 10000);
                    })}
                />
            </div>
        </div>
    )
}