import { type } from "../../../../type/inject";
import { Schema } from "prosemirror-model";
import { Plugin } from "prosemirror-state";

export const EditorPluginsManager = type<EditorPluginsManager>();
export interface EditorPluginsManager {
    getPlugins(schema: Schema): Plugin[]
}