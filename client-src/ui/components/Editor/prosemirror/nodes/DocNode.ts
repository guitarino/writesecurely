import { EditorNode } from "../EditorNode.types";
import { dependency } from "../../../../../type/inject";
import { NodeSpec } from "prosemirror-model";

@dependency(EditorNode)
class DocNode implements EditorNode {
    name: string = "doc";

    nodeSpec: NodeSpec = {
        content: "block+"
    }
}