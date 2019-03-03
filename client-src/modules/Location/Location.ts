import { Location as ILocation } from "./Location.types";
import { observed, computed, connect } from "../../type/connect";
import { parse, stringify } from "query-string";
import { dependency } from "../../type/inject";

@dependency(ILocation.singleton)
class Location implements ILocation {
    constructor() {
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

    @computed get searchQuery() {
        return parse(this.location.search);
    }

    @computed get hashQuery() {
        return parse(this.location.hash);
    }

    buildQuery(object: Object) {
        return stringify(object);
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