import { EditorPresenter as Component } from "./EditorPresenter";
import { withDependencies } from "../../../hoc/withDependencies/withDependencies";
import { EditorSchema } from "../prosemirror/EditorSchema.types";
import { EditorPluginsManager } from "../prosemirror/EditorPluginsManager.types";

export const EditorPresenter = withDependencies(Component, {
    editorSchema: EditorSchema,
    editorPluginsManager: EditorPluginsManager
});