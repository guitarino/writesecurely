import { EditorNode } from "../EditorNode.types";
import { dependency } from "../../../../../type/inject";
import { NodeSpec } from "prosemirror-model";

@dependency(EditorNode)
class CodeBlockNode implements EditorNode {
    name: string = 'code_block';

    nodeSpec: NodeSpec = {
        content: "text*",
        marks: "",
        group: "block",
        code: true,
        defining: true,
        parseDOM: [
            {tag: "pre", preserveWhitespace: "full"}
        ],
        toDOM() {
            return ["pre", ["code", 0]];
        }
    }
}