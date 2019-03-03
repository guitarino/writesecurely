import { dependency } from "../../type/inject";
import { QueryBuilder as IQueryBuilder } from "./QueryBuilder.types";
import { parse, stringify } from "query-string";

@dependency(IQueryBuilder)
class QueryBuilder implements IQueryBuilder {
    getStringFromQuery(query: Object): string {
        return stringify(query);
    }
    getQueryFromString(string: string): Object {
        return parse(string);
    }
}