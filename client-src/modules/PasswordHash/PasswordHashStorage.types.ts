import { type } from "../../type/inject";

export const PasswordHashStorage = type<PasswordHashStorage>();
export interface PasswordHashStorage {
    getHash(): number[] | null,
    setHash(passwordHash: number[]),
    clearHash()
}