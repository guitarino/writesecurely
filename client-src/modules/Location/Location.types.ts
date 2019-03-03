import { type } from "../../type/inject";

export interface QueryParameters {
    [key: string]: string;
}

export const Location = type<Location>();
export interface Location {
    pathname: string;
    query: QueryParameters;
    push: (url: string) => void;
    replace: (url: string) => void;
    go: (steps: number) => void;
    goBack: () => void;
    goForward: () => void;
    redirect: (url: string) => void;
}