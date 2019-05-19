import { EditorNode } from "../EditorNode.types";
import { NodeSpec, Schema } from "prosemirror-model";
import { KeyBindings, AddKeyBinding } from "../KeyBindings.types";
import { splitListItem } from "../commands/splitListItem";
import { liftListItem } from "../commands/liftListItem";
import { sinkListItem } from "../commands/sinkListItem";

export class ListItemNode implements EditorNode, KeyBindings {
    name: string = 'list_item';

    nodeSpec: NodeSpec = {
        content: "paragraph block*",
        parseDOM: [{ tag: "li" }],
        toDOM() {
            return ["li", 0];
        },
        defining: true
    }

    addKeyBindings(addKeyBinding: AddKeyBinding, schema: Schema) {
        addKeyBinding("Enter", splitListItem(schema.nodes.list_item));
        addKeyBinding("Mod-[", liftListItem(schema.nodes.list_item));
        addKeyBinding("Mod-]", sinkListItem(schema.nodes.list_item));
    }
}