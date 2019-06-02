import { type } from "../../type/inject";

export const PasswordVerificationManager = type<PasswordVerificationManager>();
export interface PasswordVerificationManager {
    createPassword(notebookId: string, password: string): Promise<void>;
    verifyPassword(notebookId: string, password: string): Promise<void>;
}