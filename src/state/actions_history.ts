export const HISTORY_LOCATION_CHANGE = 'HISTORY_LOCATION_CHANGE';

export type TLocation = {
    href: string,
    host: string,
    pathname: string,
    search: string,
    hash: string,
}

function getCurrentLocation(): TLocation {
    return {
        href: window.location.href,
        host: window.location.host,
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
    }
}

function dispatchCurrentLocation(dispatch) {
    dispatch({
        type: HISTORY_LOCATION_CHANGE,
        location: getCurrentLocation()
    });
}

export function history(store) {
    function listener() {
        store.dispatch({
            type: HISTORY_LOCATION_CHANGE,
            location: getCurrentLocation()
        });
    }
    return {
        register: function() {
            listener();
            window.addEventListener('popstate', listener);
        },
        unregister: function() {
            window.removeEventListener('popstate', listener);
        }
    }
}

export function push(url: string) {
    return function(dispatch) {
        window.history.pushState(null, null, url);
        dispatchCurrentLocation(dispatch);
    }
}

export function replace(url: string) {
    return function(dispatch) {
        window.history.replaceState(null, null, url);
        dispatchCurrentLocation(dispatch);
    }
}

export function go(steps: number) {
    return function(dispatch) {
        window.history.go(steps);
        dispatchCurrentLocation(dispatch);
    }
}

export function goBack() {
    return function(dispatch) {
        window.history.back();
        dispatchCurrentLocation(dispatch);
    }
}

export function goForward() {
    return function(dispatch) {
        window.history.forward();
        dispatchCurrentLocation(dispatch);
    }
}