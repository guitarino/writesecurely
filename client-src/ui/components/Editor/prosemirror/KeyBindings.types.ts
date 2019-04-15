import { type } from "../../../../type/inject";
import { Schema } from "prosemirror-model";
import { Command } from "./commands/Command.types";

export const KeyBindings = type();
export interface KeyBindings {
    addKeyBindings(addKeyBinding: AddKeyBinding, schema: Schema, isMac?: boolean): void;
}

export type AddKeyBinding = (key: string, cmd: Command) => void;