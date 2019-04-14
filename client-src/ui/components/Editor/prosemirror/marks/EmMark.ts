import { EditorMark } from "../EditorMark.types";
import { dependency } from "../../../../../type/inject";
import { MarkSpec } from "prosemirror-model";

@dependency(EditorMark)
class LinkMark implements EditorMark {
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
}