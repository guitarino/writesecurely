import { h, Component } from "preact";
import { EditorState } from "prosemirror-state";
import { OptionalOf } from "../../../types/OptionalOf";
import "./Editor.scss"
import { EditorPresenter } from "./EditorPresenter";
import { JSONObject } from "../../../types/JSONObject";

export type EditorProps = {
    className?: string,
    initialState: JSONObject | null,
    provideGetCurrentState: (getCurrentState: () => JSONObject) => any
};

export type EditorComponentState = {
    editorState: EditorState
};

export class Editor extends Component<Required<EditorProps>, EditorComponentState> {
    static defaultProps: OptionalOf<EditorProps> = {
        className: ''
    };

    render() {
        const { initialState, provideGetCurrentState } = this.props;
        return (
            <div className={`${this.props.className} Editor`}>
                <div className='Editor__Menu'>Some Menu Here</div>
                <div className='Editor__Content'>
                    <EditorPresenter
                        initialState={initialState}
                        provideGetCurrentState={provideGetCurrentState}
                    />
                </div>
            </div>
        );
    }
}