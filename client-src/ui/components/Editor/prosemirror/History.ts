import { KeyBindings, AddKeyBinding } from "./KeyBindings.types";
import { dependency, type } from "../../../../type/inject";
import { Schema } from "prosemirror-model";
import { undo, redo, history } from "prosemirror-history";
import { AddEditorPlugin, EditorPlugins } from "./EditorPlugins.types";

@dependency(type(KeyBindings, EditorPlugins))
class History implements KeyBindings, EditorPlugins {
    addEditorPlugins(addEditorPlugin: AddEditorPlugin, schema: Schema) {
        addEditorPlugin(history());
    }

    addKeyBindings(addKeyBinding: AddKeyBinding, _schema: Schema, isMac: boolean) {
        addKeyBinding("Mod-z", undo);
        addKeyBinding("Shift-Mod-z", redo);
        if (!isMac) {
            addKeyBinding("Mod-y", redo);
        }
    }
}