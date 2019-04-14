import { EditorNode } from "../EditorNode.types";
import { dependency } from "../../../../../type/inject";
import { NodeSpec } from "prosemirror-model";

@dependency(EditorNode)
class BlockquoteNode implements EditorNode {
    name: string = 'blockquote';

    nodeSpec: NodeSpec = {
        content: "block+",
        group: "block",
        defining: true,
        parseDOM: [
            {tag: "blockquote"}
        ],
        toDOM() {
            return ["blockquote", 0];
        }
    }
}
