import { FETCH_NOTEBOOKS_ERROR, FETCH_NOTEBOOKS_SUCCESS, FETCH_NOTEBOOKS_LOADING } from "./actions_notebook";

export function notebookReducer(notebooks = {
    status: null,
    list: [],
    error: null,
}, action) {
    if (action.type === FETCH_NOTEBOOKS_LOADING) {
        return {
            status: "LOADING",
            list: [],
            error: null
        }
    }
    else if (action.type === FETCH_NOTEBOOKS_ERROR) {
        return {
            status: "ERROR",
            list: [],
            error: action.error
        }
    }
    else if (action.type === FETCH_NOTEBOOKS_SUCCESS) {
        return {
            status: "SUCCESS",
            list: action.payload,
            error: null
        }
    }
    else {
        return notebooks;
    }
}