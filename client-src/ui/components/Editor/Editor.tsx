import { h, Component } from "preact";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { DOMParser } from "prosemirror-model";
import { OptionalOf } from "../../types/OptionalOf";
import { setup } from "./prosemirror/setup";
import "./Editor.scss"
import { inject, dependency, type } from "../../../type/inject";
import { EditorSchema } from "./prosemirror/EditorSchema.types";

export type EditorProps = {
    className?: string,
    initialContent?: string
};

export type EditorComponentState = {

};

export const EditorType = type<typeof Editor>();
@dependency(EditorType)
@inject(EditorSchema)
class Editor extends Component<Required<EditorProps>, EditorComponentState> {
    static defaultProps: OptionalOf<EditorProps> = {
        className: '',
        initialContent: '<p>Hello <b>World</b>!</p>'
    };

    private readonly editorSchema: EditorSchema;
    private editorState: EditorState;
    private container: HTMLElement;
    private view: EditorView;

    // TO-DO: This doesn't correspond to the react / preact component because the order of args
    //        is screwed up. I should investigate a way to perhaps swap it around & inject dependencies
    //        via using a higher order component, for example.
    constructor(editorSchema: EditorSchema, props: Required<EditorProps>) {
        super(props);
        this.editorSchema = editorSchema;
    }

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
        const element = document.createElement('div');
        element.innerHTML = this.props.initialContent;
        this.editorState = EditorState.create({
            doc: DOMParser.fromSchema(this.editorSchema.schema).parse(element),
            plugins: setup({
                schema: this.editorSchema.schema
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