import { EditorNode } from "../EditorNode.types";
import { dependency } from "../../../../../type/inject";
import { NodeSpec } from "prosemirror-model";

@dependency(EditorNode)
class HardBreakNode implements EditorNode {
    name: string = "hard_break";

    nodeSpec: NodeSpec = {
        inline: true,
        group: "inline",
        selectable: false,
        parseDOM: [{tag: "br"}],
        toDOM() {
            return ["br"];
        }
    }
}