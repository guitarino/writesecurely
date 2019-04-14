import { EditorNode } from "../EditorNode.types";
import { dependency } from "../../../../../type/inject";
import { NodeSpec } from "prosemirror-model";

@dependency(EditorNode)
class ParagraphNode implements EditorNode {
    name: string = 'paragraph';

    nodeSpec: NodeSpec = {
        content: "inline*",
        group: "block",
        parseDOM: [
            {tag: "p"}
        ],
        toDOM() {
            return ["p", 0];
        }
    }
}