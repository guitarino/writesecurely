import { EditorMark } from "../EditorMark.types";
import { dependency, type } from "../../../../../type/inject";
import { MarkSpec, Schema } from "prosemirror-model";
import { KeyBindings, AddKeyBinding } from "../KeyBindings.types";
import { toggleMark } from "prosemirror-commands";

@dependency(type(EditorMark, KeyBindings))
class LinkMark implements EditorMark, KeyBindings {
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