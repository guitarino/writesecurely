import { Location as ILocation } from "./Location.types";
import { observed, computed, connect } from "../../type/connect";
import { dependency, inject } from "../../type/inject";
import { QueryBuilder } from "../QueryBuilder/QueryBuilder.types";

@dependency(ILocation.singleton)
@inject(QueryBuilder)
class Location implements ILocation {
    private readonly queryBuilder: QueryBuilder;

    constructor(queryBuilder: QueryBuilder) {
        this.queryBuilder = queryBuilder;
        window.addEventListener('popstate', this.onLocationChange);
        connect(this);
    }

    @observed private location: Window['location'] = window.location;

    private onLocationChange = () => {
        this.location = { ...window.location };
    }

    @computed get pathname() {
        return this.location.pathname;
    }

    @computed get query() {
        const { search, hash } = this.location;
        const searchQuery: any = this.queryBuilder.getQueryFromString(search) || {};
        const hashQuery: any = this.queryBuilder.getQueryFromString(hash) || {};
        return {
            ...searchQuery,
            ...hashQuery
        }
    }
    
    push(url: string) {
        window.history.pushState(null, "", url);
        this.onLocationChange();
    }

    replace(url: string) {
        window.history.replaceState(null, "", url);
        this.onLocationChange();
    }

    go(steps: number) {
        window.history.go(steps);
        this.onLocationChange();
    }

    goBack() {
        window.history.back();
        this.onLocationChange();
    }

    goForward() {
        window.history.forward();
        this.onLocationChange();
    }

    redirect(url: string) {
        window.location.href = url;
    }
}