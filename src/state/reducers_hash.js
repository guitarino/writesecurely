import { getHash } from "../crypto-worker";

export function hashReducer(state = getHash("123")) {
    return state;
}