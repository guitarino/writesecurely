import { type } from "../../../../type/inject";
import { Command } from "./commands/Command.types";
import { Schema } from "prosemirror-model";

export type KeyMap = {
    [K: string]: Command
}

export const KeyBindingsManager = type<KeyBindingsManager>();
export interface KeyBindingsManager {
    getKeyMap(schema: Schema): KeyMap;
}