import { type } from "../../type/inject";

export interface QueryParameters {
    [key: string]: string;
}

export const Location = type<Location>();
export interface Location {
    location: Window['location']
    pathname: string;
    query: QueryParameters;
}