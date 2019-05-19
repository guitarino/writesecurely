import { type } from "../../type/inject";

export type AuthenticationStatus = 'Unauthorized' | 'Error' | 'Authorized';

export const Authentication = type<Authentication>();
export interface Authentication {
    data: {
        status: AuthenticationStatus;
        token?: string;
        error?: string;
        errorDescription?: string;
    }
    login();
    onLoginSucceeded(token: string);
    onLoginFailed(error: string, errorDescription: string);
    logout();
}