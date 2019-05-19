import { type } from "../../../../type/inject";
import { Schema } from "prosemirror-model";
import { Plugin } from "prosemirror-state";

export const EditorPlugins = type<EditorPlugins>();
export interface EditorPlugins {
    addEditorPlugins(addEditorPlugin: AddEditorPlugin, schema: Schema): void;
}

export type AddEditorPlugin = (editorPlugin: Plugin) => void;