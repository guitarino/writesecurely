import { EditorNode } from "../EditorNode.types";
import { NodeSpec, Schema } from "prosemirror-model";
import { KeyBindings, AddKeyBinding } from "../KeyBindings.types";
import { setBlockType } from "prosemirror-commands";
import { InputRules, AddInputRule } from "../InputRules.types";
import { textblockTypeInputRule } from "prosemirror-inputrules";

export class CodeBlockNode implements EditorNode, KeyBindings, InputRules {
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
    
    addKeyBindings(addKeyBinding: AddKeyBinding, schema: Schema) {
        addKeyBinding("Shift-Ctrl-\\", setBlockType(schema.nodes.code_block));
    }

    addInputRules(addInputRule: AddInputRule, schema: Schema) {
        addInputRule(textblockTypeInputRule(/^```$/, schema.nodes.code_block));
    }
}