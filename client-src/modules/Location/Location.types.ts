import { type } from "../../type/inject";

export interface QueryParameters {
    [key: string]: string;
}

export const Location = type<Location>();
export interface Location {
    pathname: string;
    searchQuery: QueryParameters;
    hashQuery: QueryParameters;
    buildQuery: (obj: Object) => void;
    push: (url: string) => void;
    replace: (url: string) => void;
    go: (steps: number) => void;
    goBack: () => void;
    goForward: () => void;
    redirect: (url: string) => void;
}