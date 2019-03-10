import { type } from "../../type/inject";

export const Crypter = type<Crypter>();
export interface Crypter {
    encrypt(text: string, hash: number[]): Promise<string>;
    decrypt(text: string, hash: number[]): Promise<string>;
}