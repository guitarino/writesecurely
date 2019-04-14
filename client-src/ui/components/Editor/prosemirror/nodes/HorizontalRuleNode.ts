import { EditorNode } from "../EditorNode.types";
import { dependency } from "../../../../../type/inject";
import { NodeSpec } from "prosemirror-model";

@dependency(EditorNode)
class HorizontalRuleNode implements EditorNode {
    name: string = 'horizontal_rule';

    nodeSpec: NodeSpec = {
        group: "block",
        parseDOM: [{tag: "hr"}],
        toDOM() {
            return ["hr"];
        }
    }
}