import { type } from "../../../../type/inject";
import { InputRule } from "prosemirror-inputrules";
import { Schema } from "prosemirror-model";

export const InputRules = type<InputRules>();
export interface InputRules {
    addInputRules(addInputRule: AddInputRule, schema: Schema): void;
}

export type AddInputRule = (inputRule: InputRule) => void;