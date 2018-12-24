import * as derived from './store_derived';
import { store } from "./store";

const funcList = Object.keys(derived)
    .map((key) => memoize(derived[key]))
;

function listener() {
    const state = store.getState();
    const dispatch = store.dispatch.bind(store);
    funcList.forEach((func) => func(state, dispatch));
}

store.subscribe(listener);
listener();

function memoize(func) {
    let prevObject = {};
    return function(...args) {
        const [newObject, continuation] = func(...args);
        const prevObjectTemp = prevObject;
        prevObject = newObject;
        runIfUpdated(prevObjectTemp, newObject, continuation);
    }
}

function runIfUpdated(prevObject, newObject, func) {
    const prevObjectKeys = Object.keys(prevObject);
    const newObjectKeys = Object.keys(newObject);
    let changed = prevObjectKeys.length !== newObjectKeys.length;
    if (!changed) {
        for (var p in prevObject) {
            if (!(p in newObject) || (newObject[p] !== prevObject[p])) {
                changed = true;
                break;
            }
        }
    }
    if (changed) {
        func(newObject);
    }
}