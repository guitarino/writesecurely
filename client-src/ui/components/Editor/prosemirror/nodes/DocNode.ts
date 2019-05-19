import { EditorNode } from "../EditorNode.types";
import { NodeSpec } from "prosemirror-model";

export class DocNode implements EditorNode {
    name: string = "doc";

    nodeSpec: NodeSpec = {
        content: "block+"
    }
}