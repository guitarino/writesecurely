import { MarkSpec } from "prosemirror-model";
import { type } from "../../../../type/inject";

export const EditorMark = type<EditorMark>();
export interface EditorMark {
    name: string,
    markSpec: MarkSpec
}