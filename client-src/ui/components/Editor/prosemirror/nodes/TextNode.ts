import { EditorNode } from "../EditorNode.types";
import { NodeSpec } from "prosemirror-model";

export class TextNode implements EditorNode {
    name: string = "text";

    nodeSpec: NodeSpec = {
        group: "inline"
    }
}