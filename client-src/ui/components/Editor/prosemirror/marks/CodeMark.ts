import { EditorMark } from "../EditorMark.types";
import { MarkSpec, Schema } from "prosemirror-model";
import { KeyBindings, AddKeyBinding } from "../KeyBindings.types";
import { toggleMark } from "prosemirror-commands";

export class CodeMark implements EditorMark, KeyBindings {
    name: string = "code";

    markSpec: MarkSpec = {
        parseDOM: [{tag: "code"}],
        toDOM() {
            return ["code", 0];
        }
    }

    addKeyBindings(addKeyBinding: AddKeyBinding, schema: Schema) {
        addKeyBinding("Mod-`", toggleMark(schema.marks.code));
    }
}