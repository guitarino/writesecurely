import { EditorMark } from "../EditorMark.types";
import { dependency, type } from "../../../../../type/inject";
import { MarkSpec, Schema } from "prosemirror-model";
import { KeyBindings, AddKeyBinding } from "../KeyBindings.types";
import { toggleMark } from "prosemirror-commands";

@dependency(type(EditorMark, KeyBindings))
class StrongMark implements EditorMark, KeyBindings {
    name: string = "strong";

    markSpec: MarkSpec = {
        parseDOM: [
            { tag: "strong" },
            // This works around a Google Docs misbehavior where
            // pasted content will be inexplicably wrapped in `<b>`
            // tags with a font-weight normal.
            {
                tag: "b",
                getAttrs(node: any) {
                    return node.style.fontWeight != "normal" && null;
                }
            },
            {
                style: "font-weight",
                getAttrs(value: any) {
                    return (/^(bold(er)?|[5-9]\d{2,})$/).test(value) && null;
                }
            }
        ],
        toDOM() {
            return ["strong", 0];
        }
    }

    addKeyBindings(addKeyBinding: AddKeyBinding, schema: Schema) {
        addKeyBinding("Mod-b", toggleMark(schema.marks.strong));
        addKeyBinding("Mod-B", toggleMark(schema.marks.strong));
    }
}