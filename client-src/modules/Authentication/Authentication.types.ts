import { type } from "../../type/inject";

export const Authentication = type<Authentication>();
export interface Authentication {
    login();
    onLoginSucceeded(token: string);
    onLoginFailed(error: string, errorDescription: string);
    logout();
}