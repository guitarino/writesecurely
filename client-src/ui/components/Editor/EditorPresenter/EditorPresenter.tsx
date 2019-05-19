import { h, Component } from "preact";
import { EditorState, Transaction } from "prosemirror-state";
import { OptionalOf } from "../../../../types/OptionalOf";
import { EditorView } from "prosemirror-view";
import "./EditorPresenter.scss";
import { EditorSchema } from "../prosemirror/EditorSchema.types";
import { JSONObject } from "../../../../types/JSONObject";
import { EditorPluginsManager } from "../prosemirror/EditorPluginsManager.types";

export type EditorPresenterProps = {
    className?: string,
    editorPluginsManager: EditorPluginsManager,
    editorSchema: EditorSchema,
    initialState: JSONObject | null,
    provideGetCurrentState: (getCurrentState: () => JSONObject) => any
}

type EditorPresenterState = {

}

export class EditorPresenter extends Component<Required<EditorPresenterProps>, EditorPresenterState> {
    private editorState: EditorState;
    private container: HTMLElement;
    private view: EditorView;

    static defaultProps: OptionalOf<EditorPresenterProps> = {
        className: ''
    }

    constructor(p: Required<EditorPresenterProps>) {
        super(p);
        const { provideGetCurrentState } = this.props;
        this.editorState = this.getInitialEditorState(this.props);
        provideGetCurrentState(this.getCurrentState);
    }

    componentWillReceiveProps(nextProps: Required<EditorPresenterProps>) {
        if (nextProps.initialState !== this.props.initialState) {
            this.editorState = this.getInitialEditorState(nextProps);
            this.view.updateState(this.editorState);
        }
    }

    getInitialEditorState(props: Required<EditorPresenterProps>) {
        const { editorSchema, initialState, editorPluginsManager } = props;
        const { schema } = editorSchema;
        const plugins = editorPluginsManager.getPlugins(schema);
        
        return initialState ?
            EditorState.fromJSON({ schema, plugins }, initialState) :
            EditorState.create({ schema, plugins });
    }

    getCurrentState = () => {
        return this.editorState.toJSON();
    }

    render()  {
        const { className } = this.props;
        return <div className={`EditorPresenter ${className}`} ref={this.setContainer}></div>;
    }

    shouldComponentUpdate() {
        return false;
    }

    setContainer = (container: HTMLElement) => {
        this.container = container;
    }

    componentDidMount() {
        this.view = new EditorView(this.container, {
            state: this.editorState,
            dispatchTransaction: this.dispatchTransaction
        });
    }

    componentWillUnmount() {
        if (this.view) {
            this.view.destroy();
        }
    }

    dispatchTransaction = (transaction: Transaction) => {
        this.editorState = this.editorState.apply(transaction);
        this.view.updateState(this.editorState);
    }
}