import { h, Component } from "preact";
import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { addListNodes } from "prosemirror-schema-list"
import { OptionalOf } from "../../types/OptionalOf";
import { setup } from "./prosemirror/setup";
import "./Editor.scss";

export type EditorProps = {
    className?: string,
    initialContent?: string
};

type EditorComponentState = {

};

const editorSchema = new Schema({
    nodes: addListNodes(
        schema.spec.nodes as any,
        "paragraph block*",
        "block"
    ),
    marks: schema.spec.marks
});

export class Editor extends Component<Required<EditorProps>, EditorComponentState> {
    static defaultProps: OptionalOf<EditorProps> = {
        className: '',
        initialContent: ''
    };

    private editorState: EditorState;
    private container: HTMLElement;
    private view: EditorView;

    render() {
        return <div className={`${this.props.className} Editor`} ref={this.setContainer}></div>;
    }

    setContainer = (container: HTMLElement) => {
        this.container = container;
    }

    componentDidMount() {
        const element = document.createElement('div');
        element.innerHTML = this.props.initialContent;
        this.editorState = EditorState.create({
            doc: DOMParser.fromSchema(editorSchema).parse(element),
            plugins: setup({
                schema: editorSchema
            })
        });
        this.view = new EditorView(this.container, {
            state: this.editorState
        });
    }
}