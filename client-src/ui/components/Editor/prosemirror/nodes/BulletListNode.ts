import { EditorNode } from "../EditorNode.types";
import { dependency } from "../../../../../type/inject";
import { NodeSpec } from "prosemirror-model";

@dependency(EditorNode)
class BulletListNode implements EditorNode {
    name: string = 'bullet_list';

    nodeSpec: NodeSpec = {
        content: "list_item+",
        group: "block",
        parseDOM: [{ tag: "ul" }],
        toDOM() {
            return ["ul", 0];
        }
    }
}