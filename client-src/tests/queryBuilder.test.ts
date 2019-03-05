import "../modules/QueryBuilder/QueryBuilder";
import { QueryBuilder } from "../modules/QueryBuilder/QueryBuilder.types";
import { get } from "../type/inject";
import assert from 'assert';

const queryBuilder: QueryBuilder = get<QueryBuilder>(QueryBuilder);

describe('query builder', () => {
    it('is object', () => {
        assert(typeof queryBuilder === "object");
    });
});