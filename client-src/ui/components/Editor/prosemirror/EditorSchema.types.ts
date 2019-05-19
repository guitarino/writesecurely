import { type } from "../../../../type/inject";
import { Schema } from "prosemirror-model";

export const EditorSchema = type<EditorSchema>();
export interface EditorSchema {
    schema: Schema
}