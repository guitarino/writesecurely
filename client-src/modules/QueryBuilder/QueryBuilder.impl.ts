import { QueryBuilder as IQueryBuilder } from "./QueryBuilder.types";
import { parse, stringify } from "query-string";

export class QueryBuilder implements IQueryBuilder {
    getStringFromQuery(query: Object): string {
        return stringify(query);
    }
    
    getQueryFromString(string: string): Object {
        return parse(string);
    }
}