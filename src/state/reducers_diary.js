import { FETCH_DIARIES_ERROR, FETCH_DIARIES_SUCCESS, FETCH_DIARIES_LOADING } from "./actions_diary";

export function diaryReducer(diaries = {
    status: null,
    list: [],
    error: null,
}, action) {
    if (action.type === FETCH_DIARIES_LOADING) {
        return {
            status: "LOADING",
            list: [],
            error: null
        }
    }
    else if (action.type === FETCH_DIARIES_ERROR) {
        return {
            status: "ERROR",
            list: [],
            error: action.error
        }
    }
    else if (action.type === FETCH_DIARIES_SUCCESS) {
        return {
            status: "SUCCESS",
            list: action.payload,
            error: null
        }
    }
    else {
        return diaries;
    }
}