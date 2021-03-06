import { EditorPlugins, AddEditorPlugin } from "./EditorPlugins.types";
import { Schema } from "prosemirror-model";
import { dropCursor } from "prosemirror-dropcursor";
import { gapCursor } from "prosemirror-gapcursor";


export class Cursor implements EditorPlugins {
    addEditorPlugins(addEditorPlugin: AddEditorPlugin, schema: Schema) {
        addEditorPlugin(dropCursor());
        addEditorPlugin(gapCursor());
    }
}