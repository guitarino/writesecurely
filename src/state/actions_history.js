import queryString from "query-string";

export const HISTORY_LOCATION_CHANGE = 'HISTORY_LOCATION_CHANGE';

export function getCurrentLocation() {
    const location = window.location;
    return {
        href: location.href,
        host: location.host,
        pathname: location.pathname,
        search: location.search,
        searchQuery: queryString.parse(location.search),
        hash: location.hash,
        hashQuery: queryString.parse(location.hash),
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
            window.addEventListener('popstate', listener);
        },
        unregister: function() {
            window.removeEventListener('popstate', listener);
        }
    }
}

export function push(url) {
    return function(dispatch) {
        window.history.pushState(null, null, url);
        dispatchCurrentLocation(dispatch);
    }
}

export function replace(url) {
    return function(dispatch) {
        window.history.replaceState(null, null, url);
        dispatchCurrentLocation(dispatch);
    }
}

export function go(steps) {
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

export function redirect(url) {
    return function() {
        window.location.href = url;
    }
}