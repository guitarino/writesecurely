import { EditorNode } from "../EditorNode.types";
import { dependency } from "../../../../../type/inject";
import { NodeSpec } from "prosemirror-model";

@dependency(EditorNode)
class TextNode implements EditorNode {
    name: string = "text";

    nodeSpec: NodeSpec = {
        group: "inline"
    }
}