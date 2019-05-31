import { type } from "../../type/inject";
import { Intent } from "./Intent.types";

export const IntentManager = type<IntentManager>();
export interface IntentManager {
    currentIntent: Intent | null;
}