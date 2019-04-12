import { EditorMark } from "./EditorMark.types";
import { dependency } from "../../../../../type/inject";
import { MarkSpec } from "prosemirror-model";

@dependency(EditorMark)
class StrongMark implements EditorMark {
    name: string = "strong";

    markSpec: MarkSpec = {
        parseDOM: [
            {tag: "strong"},
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
}