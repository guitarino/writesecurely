import { gitlabOauthUri, gitlabOauthClientId, gitlabOauthRedirectUri } from "Config";
import { redirect, replace } from "./actions_history.js";
import { saveCredentials } from "./actions_credentials.js";
import { urls } from "../data/urls.js";

export function login() {
    return function(dispatch) {
        dispatch(redirect(
            `${gitlabOauthUri}/authorize?client_id=${
                encodeURIComponent(gitlabOauthClientId)
            }&redirect_uri=${
                encodeURIComponent(gitlabOauthRedirectUri)
            }&response_type=token`
        ));
    }
}

export function saveCredentialsFromOauthAndRedirect(state, dispatch) {
    const { searchQuery, hashQuery } = state.location;
    return [
        {
            searchQuery,
            hashQuery
        },
        function ({ searchQuery, hashQuery }) {
            if (searchQuery.page === "oauth_redirect") {
                if (hashQuery.access_token) {
                    dispatch(saveCredentials({
                        status: 'authenticated',
                        token: hashQuery.access_token
                    }));
                    sessionStorage.setItem(
                        "authToken",
                        hashQuery.access_token
                    );
                    dispatch(replace(urls.diary_selection));
                }
                else {
                    dispatch(saveCredentials({
                        status: 'error',
                        error: hashQuery.error || 'unknown',
                        errorDescription: hashQuery.error_description || "No description."
                    }));
                }
            }
            else {
                const storedToken = sessionStorage.getItem("authToken");
                if (storedToken) {
                    dispatch(saveCredentials({
                        status: 'authenticated',
                        token: storedToken
                    }));
                    if (!searchQuery.page) {
                        dispatch(replace(urls.diary_selection));
                    }
                }
            }
        }
    ];
}

export function redirectWhenAuthenticated(state, dispatch) {
    const { searchQuery, hashQuery } = state.location;
    return [
        {
            searchQuery,
            hashQuery
        },
        function ({ searchQuery, hashQuery }) {
            if (searchQuery.page === "oauth_redirect") {
                if (hashQuery.access_token) {
                    dispatch(saveCredentials({
                        status: 'authenticated',
                        token: hashQuery.access_token
                    }));
                    sessionStorage.setItem(
                        "authToken",
                        hashQuery.access_token
                    );
                }
                else {
                    dispatch(saveCredentials({
                        status: 'error',
                        error: hashQuery.error || 'unknown',
                        errorDescription: hashQuery.error_description || "No description."
                    }));
                }
            }
            else {
                const storedToken = sessionStorage.getItem("authToken");
                if (storedToken) {
                    dispatch(saveCredentials({
                        status: 'authenticated',
                        token: storedToken
                    }));
                }
            }
        }
    ];
}

export function fetchGitlab(
    action_prefix,
    request_list
) {
    return function (dispatch, getState) {
        const { credentials } = getState();
        
        dispatch({
            type: `${action_prefix}_LOADING`
        });

        return request_list
            .reduce(
                (currentPromise, request) => {
                    return currentPromise.then(
                        (previousResult) => {
                            const {
                                method,
                                url,
                                headers = {},
                                body
                            } = request(previousResult);
                            headers.authorization = `Bearer ${credentials.token}`;
                            return fetch(url, {
                                method,
                                headers,
                                body
                            });
                        }
                    )
                        .then(response => response.json())
                    ;
                },
                Promise.resolve()
            )
            .then(payload => dispatch({
                type: `${action_prefix}_SUCCESS`,
                payload
            }))
            .catch(error => dispatch({
                type: `${action_prefix}_ERROR`,
                error
            }))
        ;
    }
}