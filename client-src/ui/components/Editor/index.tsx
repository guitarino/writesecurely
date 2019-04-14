import { Editor as Component } from "./Editor";
import { withDependencies } from "../../hoc/withDependencies/withDependencies";
import { EditorSchema } from "./prosemirror/EditorSchema.types";

export const Editor = withDependencies(Component, {
    editorSchema: EditorSchema.lazy
});