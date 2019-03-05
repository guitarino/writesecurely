import "../../modules/QueryBuilder/QueryBuilder";
import { QueryBuilder } from "../../modules/QueryBuilder/QueryBuilder.types";
import { get } from "../../type/inject";
import assert from 'assert';
import { sharedData } from "../sharedData";

describe('QueryBuilder', () => {
    console.log('*QueryBuilder');
    console.log(sharedData.data);
    sharedData.data = 'changed';
    const queryBuilder: QueryBuilder = get<QueryBuilder>(QueryBuilder);

    it('getStringFromQuery works as expected', () => {
        console.log('101');
        const query = { happy: 'birthday', hello: 'world' };
        const expectedResult = "happy=birthday&hello=world";
        assert.strictEqual(
            queryBuilder.getStringFromQuery(query),
            expectedResult
        );
    });

    it('getQueryFromString', () => {
        console.log('102');
        const string = "happy=birthday&hello=world";
        const expectedResult = { happy: 'birthday', hello: 'world' };
        assert.deepEqual(
            queryBuilder.getQueryFromString(string),
            expectedResult
        );
    });
});