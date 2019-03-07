import "../../modules/QueryBuilder/QueryBuilder";
import { QueryBuilder } from "../../modules/QueryBuilder/QueryBuilder.types";
import { get } from "../../type/inject";
import assert from 'assert';

describe('QueryBuilder', () => {
    const queryBuilder: QueryBuilder = get<QueryBuilder>(QueryBuilder);

    it('getStringFromQuery converts url query object to string', () => {
        const query = { happy: 'birthday', hello: 'world' };
        const expectedResult = "happy=birthday&hello=world";
        assert.strictEqual(
            queryBuilder.getStringFromQuery(query),
            expectedResult
        );
    });

    it('getQueryFromString converts url query string to object', () => {
        const string = "happy=birthday&hello=world";
        const expectedResult = { happy: 'birthday', hello: 'world' };
        assert.deepEqual(
            queryBuilder.getQueryFromString(string),
            expectedResult
        );
    });
});