import { EditorNode } from "../EditorNode.types";
import { NodeSpec, Schema } from "prosemirror-model";
import { KeyBindings, AddKeyBinding } from "../KeyBindings.types";
import { setBlockType } from "prosemirror-commands";
import { InputRules, AddInputRule } from "../InputRules.types";
import { textblockTypeInputRule } from "prosemirror-inputrules";

export class HeadingNode implements EditorNode, KeyBindings, InputRules {
    name: string = 'heading';

    nodeSpec: NodeSpec = {
        attrs: {level: {default: 1}},
        content: "inline*",
        group: "block",
        defining: true,
        parseDOM: [
            {tag: "h1", attrs: {level: 1}},
            {tag: "h2", attrs: {level: 2}},
            {tag: "h3", attrs: {level: 3}},
            {tag: "h4", attrs: {level: 4}},
            {tag: "h5", attrs: {level: 5}},
            {tag: "h6", attrs: {level: 6}}
        ],
        toDOM(node) {
            return ["h" + node.attrs.level, 0];
        }
    }

    addKeyBindings(addKeyBinding: AddKeyBinding, schema: Schema): void {
        for (let i = 1; i <= 6; i++) {
            addKeyBinding("Shift-Ctrl-" + i, setBlockType(schema.nodes.heading, { level: i }));
        }
    }

    addInputRules(addInputRule: AddInputRule, schema: Schema) {
        addInputRule(textblockTypeInputRule(
            new RegExp("^(#{1,6})\\s$"),
            schema.nodes.heading,
            match => ({ level: match[1].length })
        ));
    }
}