import { type } from "../../type/inject";

export const PasswordHashVerifier = type<PasswordHashVerifier>();
export interface PasswordHashVerifier {
    isHashValid(hash: number[]): Promise<boolean>;
}