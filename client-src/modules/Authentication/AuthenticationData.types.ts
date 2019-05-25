import { type } from "../../type/inject";

export type AuthenticationStatus = 'Unauthorized' | 'Error' | 'Authorized';

export const AuthenticationData = type<AuthenticationData>();
export interface AuthenticationData {
    data: {
        status: AuthenticationStatus;
        token?: string;
        error?: string;
        errorDescription?: string;
    }
}