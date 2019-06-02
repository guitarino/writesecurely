import { type } from "../../type/inject";

export const UuidManager = type<UuidManager>();
export interface UuidManager {
    create(): string
}