import { h } from "preact";
import "./MainScreen.scss";
import { Editor } from "../Editor";
import { Paper } from "../Paper/Paper";

export function MainScreen() {
    return (
        <div className="MainScreen">
            <Paper className="MainScreen__Paper">
                <Editor
                    className='MainScreen__Editor'
                    initialState={null}
                    provideGetCurrentState={(getCurrentState => {
                        setInterval(() => console.log(getCurrentState()), 10000);
                    })}
                />
            </Paper>
        </div>
    )
}