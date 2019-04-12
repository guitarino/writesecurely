import { EditorMark } from "./EditorMark.types";
import { dependency } from "../../../../../type/inject";
import { MarkSpec } from "prosemirror-model";

@dependency(EditorMark)
class CodeMark implements EditorMark {
    name: string = "code";

    markSpec: MarkSpec = {
        parseDOM: [{tag: "code"}],
        toDOM() {
            return ["code", 0];
        }
    }
}