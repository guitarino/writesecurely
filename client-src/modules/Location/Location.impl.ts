import { Location as ILocation } from "./Location.types";
import { QueryBuilder } from "../QueryBuilder/QueryBuilder.types";

export class Location implements ILocation {
    private readonly queryBuilder: QueryBuilder;

    constructor(queryBuilder: QueryBuilder) {
        this.queryBuilder = queryBuilder;
    }

    location = window.location;

    get pathname() {
        return this.location.pathname;
    }

    get query() {
        const { search, hash } = this.location;
        const searchQuery: any = this.queryBuilder.getQueryFromString(search) || {};
        const hashQuery: any = this.queryBuilder.getQueryFromString(hash) || {};
        return {
            ...searchQuery,
            ...hashQuery
        }
    }
}