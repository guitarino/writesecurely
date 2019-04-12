import { Schema, NodeSpec, MarkSpec } from "prosemirror-model";
import { inject, dependency } from "../../../../type/inject";
import { EditorNode } from "./nodes/EditorNode.types";
import { EditorMark } from "./marks/EditorMark.types";
import { EditorSchema as IEditorSchema } from "./EditorSchema.types";

@dependency(IEditorSchema)
@inject(
    EditorNode.multi,
    EditorMark.multi
)
class EditorSchema implements IEditorSchema {
    public schema: Schema;

    constructor(nodes: EditorNode[], marks: EditorMark[]) {
        this.schema = new Schema({
            nodes: this.getNodeSpecMap(nodes),
            marks: this.getMarkSpecMap(marks)
        });
    }

    getNodeSpecMap(nodes: EditorNode[]) {
        const nodeSpecMap: { [x: string]: NodeSpec } = {};
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            nodeSpecMap[node.name] = node.nodeSpec;
        }
        return nodeSpecMap;
    }

    getMarkSpecMap(marks: EditorMark[]) {
        const markSpecMap: { [x: string]: MarkSpec } = {};
        for (let i = 0; i < marks.length; i++) {
            const mark = marks[i];
            markSpecMap[mark.name] = mark.markSpec;
        }
        return markSpecMap;
    }
}