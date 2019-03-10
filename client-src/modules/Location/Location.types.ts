import { type } from "../../type/inject";

export interface QueryParameters {
    [key: string]: string;
}

export const Location = type<Location>();
export interface Location {
    pathname: string;
    query: QueryParameters;
    push(url: string);
    replace(url: string);
    go(steps: number);
    goBack();
    goForward();
    redirect(url: string);
}