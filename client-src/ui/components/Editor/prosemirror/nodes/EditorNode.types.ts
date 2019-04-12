import { NodeSpec } from "prosemirror-model";
import { type } from "../../../../../type/inject";

export const EditorNode = type<EditorNode>();
export interface EditorNode {
    name: string,
    nodeSpec: NodeSpec,
}