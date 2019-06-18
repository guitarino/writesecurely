import { type } from "../../type/inject";

export const DateManager = type<DateManager>();
export interface DateManager {
    getCurrent(): string;
    parse(date: string): Date;
}