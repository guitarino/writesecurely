import { EditorNode } from "../EditorNode.types";
import { dependency, type } from "../../../../../type/inject";
import { NodeSpec, Schema } from "prosemirror-model";
import { KeyBindings, AddKeyBinding } from "../KeyBindings.types";
import { setBlockType } from "prosemirror-commands";

@dependency(type(EditorNode, KeyBindings))
class ParagraphNode implements EditorNode, KeyBindings {
    name: string = 'paragraph';

    nodeSpec: NodeSpec = {
        content: "inline*",
        group: "block",
        parseDOM: [
            {tag: "p"}
        ],
        toDOM() {
            return ["p", 0];
        }
    }
    
    addKeyBindings(addKeyBinding: AddKeyBinding, schema: Schema) {
        addKeyBinding("Shift-Ctrl-0", setBlockType(schema.nodes.paragraph));
    }
}