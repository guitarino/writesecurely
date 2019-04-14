import { EditorNode } from "../EditorNode.types";
import { dependency } from "../../../../../type/inject";
import { NodeSpec } from "prosemirror-model";

@dependency(EditorNode)
class OrderedListNode implements EditorNode {
    name: string = 'ordered_list';

    nodeSpec: NodeSpec = {
        content: "list_item+",
        group: "block",
        attrs: { order: { default: 1 } },
        parseDOM: [{
            tag: "ol",
            getAttrs(dom: any) {
                return {
                    order: dom.hasAttribute("start") ? +dom.getAttribute("start") : 1
                };
            }
        }],
        toDOM(node) {
            return node.attrs.order == 1
                ? ["ol", 0]
                : ["ol", { start: node.attrs.order }, 0];
        }
    }
}