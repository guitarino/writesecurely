import { getHash } from "../crypto-worker";
import { SET_PASSWORD } from "./actions_hash";

export function hashReducer(state = null, action) {
    if (action.type === SET_PASSWORD) {
        return getHash(action.password);
    }
    else {
        return state;
    }
}