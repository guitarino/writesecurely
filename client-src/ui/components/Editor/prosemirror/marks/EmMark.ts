import { EditorMark } from "../EditorMark.types";
import { MarkSpec, Schema } from "prosemirror-model";
import { KeyBindings, AddKeyBinding } from "../KeyBindings.types";
import { toggleMark } from "prosemirror-commands";

export class EmMark implements EditorMark, KeyBindings {
    name: string = "em";

    markSpec: MarkSpec = {
        parseDOM: [
            {tag: "i"},
            {tag: "em"},
            {style: "font-style=italic"}
        ],
        toDOM() {
            return ["em", 0];
        }
    }

    addKeyBindings(addKeyBinding: AddKeyBinding, schema: Schema) {
        addKeyBinding("Mod-i", toggleMark(schema.marks.em));
        addKeyBinding("Mod-I", toggleMark(schema.marks.em));
    }
}