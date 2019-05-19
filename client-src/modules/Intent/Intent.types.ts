import { type } from "../../type/inject";

export const Intent = type<Intent>();
export interface Intent {
    isCurrentIntentValid: boolean;
    isCurrentIntent: boolean;
}