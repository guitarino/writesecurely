import { type } from "../../type/inject";

export const QueryBuilder = type<QueryBuilder>();
export interface QueryBuilder {
    getStringFromQuery(query: Object): string;
    getQueryFromString(string: string): Object;
}