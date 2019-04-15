import { type } from "../../../../type/inject";
import { Schema } from "prosemirror-model";
import { InputRule } from "prosemirror-inputrules";

export const InputRulesManager = type<InputRulesManager>();
export interface InputRulesManager {
    getInputRules(schema: Schema): InputRule[]
}