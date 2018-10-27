export function credentialsReducer(currentAuth = {
    status: 'not authenticated'
}, action) {
    if (action.type === "SAVE_CREDENTIALS_ACTION") {
        return action.auth;
    }
    return currentAuth;
}