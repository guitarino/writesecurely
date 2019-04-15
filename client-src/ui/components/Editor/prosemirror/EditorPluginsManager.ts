import { dependency, inject } from "../../../../type/inject";
import { EditorPluginsManager as IEditorPluginsManager } from "./EditorPluginsManager.types";
import { EditorPlugins, AddEditorPlugin } from "./EditorPlugins.types";
import { Plugin } from "prosemirror-state";
import { Schema } from "prosemirror-model";

@dependency(IEditorPluginsManager)
@inject(EditorPlugins.multi)
class EditorPluginsManager implements IEditorPluginsManager {
    private readonly editorPlugins: EditorPlugins[];

    constructor(editorPlugins: EditorPlugins[]) {
        this.editorPlugins = editorPlugins;
    }

    getPlugins(schema: Schema): Plugin[] {
        const plugins: Plugin[] = [];
        const addEditorPlugin: AddEditorPlugin = (editorPlugin) => {
            plugins.push(editorPlugin);
        };
        for (let i = 0; i < this.editorPlugins.length; i++) {
            const editorPlugins = this.editorPlugins[i];
            editorPlugins.addEditorPlugins(addEditorPlugin, schema);
        }
        return plugins;
    }
}