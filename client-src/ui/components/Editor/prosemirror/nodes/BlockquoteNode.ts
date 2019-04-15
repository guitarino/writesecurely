import { EditorNode } from "../EditorNode.types";
import { dependency, type } from "../../../../../type/inject";
import { NodeSpec, NodeType, Schema } from "prosemirror-model";
import { KeyBindings, AddKeyBinding } from "../KeyBindings.types";
import { wrapIn } from "prosemirror-commands";
import { InputRules, AddInputRule } from "../InputRules.types";
import { wrappingInputRule } from "prosemirror-inputrules";

@dependency(type(EditorNode, KeyBindings, InputRules))
class BlockquoteNode implements EditorNode, KeyBindings, InputRules {
    name: string = 'blockquote';

    nodeSpec: NodeSpec = {
        content: "block+",
        group: "block",
        defining: true,
        parseDOM: [
            {tag: "blockquote"}
        ],
        toDOM() {
            return ["blockquote", 0];
        }
    }

    addKeyBindings(addKeyBinding: AddKeyBinding, schema: Schema) {
        addKeyBinding("Ctrl-.", wrapIn(schema.nodes.blockquote));
    }

    addInputRules(addInputRule: AddInputRule, schema: Schema) {
        addInputRule(wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote));
    }
}
