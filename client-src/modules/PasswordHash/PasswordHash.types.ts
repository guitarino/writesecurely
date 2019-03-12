import { type } from "../../type/inject";

export const PasswordHash = type<PasswordHash>();
export interface PasswordHash {
    data: {
        status: 'verified' | 'verifying' | 'error' | 'not provided',
        hash?: number[],
        error?: string,
        errorDescription?: string
    },

    setPassword(password: string);
}