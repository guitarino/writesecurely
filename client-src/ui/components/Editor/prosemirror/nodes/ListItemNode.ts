import { EditorNode } from "./EditorNode.types";
import { dependency } from "../../../../../type/inject";
import { NodeSpec } from "prosemirror-model";

@dependency(EditorNode)
class ListItemNode implements EditorNode {
    name: string = 'list_item';

    nodeSpec: NodeSpec = {
        content: "paragraph block*",
        parseDOM: [{ tag: "li" }],
        toDOM() {
            return ["li", 0];
        },
        defining: true
    }
}