export function hashReducer(state = {
    status: 'NOT_PROVIDED',
    hash: null,
    returnUrl: null
}, action) {
    if (action.type === "SET_PASSWORD_VERIFY") {
        return {
            ...state,
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
    else if (action.type === "SET_RETURN_URL") {
        return {
            ...state,
            returnUrl: action.url
        }
    }
    else {
        return state;
    }
}