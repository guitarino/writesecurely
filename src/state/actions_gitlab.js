import { gitlabOauthUri, gitlabOauthClientId, gitlabOauthRedirectUri } from "Config";
import { redirect, replace } from "./actions_history.js";
import { saveCredentials } from "./actions_credentials.js";
import { urls, pages } from "../data/urls.js";

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
            if (searchQuery.page === pages.oauth_redirect) {
                if (hashQuery.access_token) {
                    dispatch(saveCredentials({
                        status: 'authenticated',
                        token: hashQuery.access_token
                    }));
                    sessionStorage.setItem(
                        "authToken",
                        hashQuery.access_token
                    );
                    dispatch(replace(urls.password_entry));
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
                        dispatch(replace(urls.password_entry));
                    }
                }
            }
        }
    ];
}