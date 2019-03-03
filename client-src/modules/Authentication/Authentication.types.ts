import { type } from "../../type/inject";

export type AuthenticationStatus = 'Unauthorized' | 'Error' | 'Authorized';

export const Authentication = type<Authentication>();
export interface Authentication {
    status: AuthenticationStatus;
    token: string;
    login: () => void;
}