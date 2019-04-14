import { h, Component } from "preact";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { DOMParser } from "prosemirror-model";
import { OptionalOf } from "../../../types/OptionalOf";
import { setup } from "./prosemirror/setup";
import "./Editor.scss"
import { EditorSchema } from "./prosemirror/EditorSchema.types";

export type EditorProps = {
    editorSchema: EditorSchema,
    className?: string,
    initialContent?: string
};

export type EditorComponentState = {

};

export class Editor extends Component<Required<EditorProps>, EditorComponentState> {
    private editorState: EditorState;
    private container: HTMLElement;
    private view: EditorView;

    static defaultProps: OptionalOf<EditorProps> = {
        className: '',
        initialContent: '<p>Hello <b>World</b>!</p>'
    };

    render() {
        return (
            <div className={`${this.props.className} Editor`}>
                <div className='Editor__Menu'>Some Menu Here</div>
                <div className='Editor__Content' ref={this.setContainer}></div>
            </div>
        );
    }

    setContainer = (container: HTMLElement) => {
        this.container = container;
    }

    componentDidMount() {
        const { initialContent, editorSchema } = this.props;
        const element = document.createElement('div');
        element.innerHTML = initialContent;
        this.editorState = EditorState.create({
            doc: DOMParser.fromSchema(editorSchema.schema).parse(element),
            plugins: setup({
                schema: editorSchema.schema
            })
        });
        this.view = new EditorView(this.container, {
            state: this.editorState
        });
    }

    componentWillUnmount() {
        this.view.destroy();
    }
}