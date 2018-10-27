export const SAVE_CREDENTIALS_ACTION = "SAVE_CREDENTIALS_ACTION";

export function saveCredentials(auth) {
    return {
        type: SAVE_CREDENTIALS_ACTION,
        auth: auth
    }
}