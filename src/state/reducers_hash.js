export function hashReducer(state = {
    status: 'NOT_PROVIDED',
    hash: null
}, action) {
    if (action.type === "SET_PASSWORD_VERIFY") {
        return {
            status: 'VERIFYING',
            hash: action.hash
        }
    }
    else if (action.type === "SET_PASSWORD_VERIFIED") {
        return {
            ...state,
            status: 'VERIFIED'
        }
    }
    else if (action.type === "SET_PASSWORD_INCORRECT") {
        return {
            ...state,
            status: 'INCORRECT'
        };
    }
    else {
        return state;
    }
}