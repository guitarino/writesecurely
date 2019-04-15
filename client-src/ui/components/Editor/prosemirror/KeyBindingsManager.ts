import { inject, dependency, type } from "../../../../type/inject";
import { KeyBindings, AddKeyBinding } from "./KeyBindings.types";
import { KeyBindingsManager as IKeyBindingsManager, KeyMap } from "./KeyBindingsManager.types";
import { Schema } from "prosemirror-model";
import { EditorPlugins, AddEditorPlugin } from "./EditorPlugins.types";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";

@dependency(type(IKeyBindingsManager, EditorPlugins))
@inject(KeyBindings.multi)
class KeyBindingsManager implements IKeyBindingsManager, EditorPlugins {
    private readonly keyBindings: KeyBindings[];

    constructor(keyBindings: KeyBindings[]) {
        this.keyBindings = keyBindings;
    }

    addEditorPlugins(addEditorPlugin: AddEditorPlugin, schema: Schema) {
        addEditorPlugin(keymap(this.getKeyMap(schema)));
        addEditorPlugin(keymap(baseKeymap));
    }

    getKeyMap(schema: Schema) {
        const isMac = typeof navigator != "undefined" ? /Mac/.test(navigator.platform) : false;
        const keys: KeyMap = {};
        const addKeyBinding: AddKeyBinding = (key, cmd) => {
            keys[key] = cmd;
        };
        for (let i = 0; i < this.keyBindings.length; i++) {
            const keyBindings = this.keyBindings[i];
            keyBindings.addKeyBindings(addKeyBinding, schema, isMac);
        }
        return keys;
    }
}