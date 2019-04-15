import { EditorNode } from "../EditorNode.types";
import { dependency, type } from "../../../../../type/inject";
import { NodeSpec, Schema } from "prosemirror-model";
import { KeyBindings, AddKeyBinding } from "../KeyBindings.types";
import { wrapInList } from "../commands/wrapInList";
import { InputRules, AddInputRule } from "../InputRules.types";
import { wrappingInputRule } from "prosemirror-inputrules";

@dependency(type(EditorNode, KeyBindings, InputRules))
class BulletListNode implements EditorNode, KeyBindings, InputRules {
    name: string = 'bullet_list';

    nodeSpec: NodeSpec = {
        content: "list_item+",
        group: "block",
        parseDOM: [{ tag: "ul" }],
        toDOM() {
            return ["ul", 0];
        }
    }

    addKeyBindings(addKeyBinding: AddKeyBinding, schema: Schema) {
        addKeyBinding("Shift-Ctrl-8", wrapInList(schema.nodes.bullet_list));
    }

    addInputRules(addInputRule: AddInputRule, schema: Schema) {
        addInputRule(wrappingInputRule(/^\s*([-+*])\s$/, schema.nodes.bullet_list))
    }
}