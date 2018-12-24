import { fetchGitlabFile, saveEncryptedFile } from "../api/gitlab";
import { decrypt, getHash, encrypt } from "../crypto-worker";
import { push, replace } from "./actions_history";
import { pages, urls, passwordRequiredPages } from "../data/urls";

const PASSWORD_FILE = "password.ws";

function createPasswordFileContent() {
    return JSON.stringify({
        num: Math.random()
    })
}

function verifyPasswordFileContent(content) {
    const pwd = JSON.parse(content);
    if (typeof pwd.num === "number") {
        return true;
    }
    return false;
}

export function setPassword(password) {
    const hash = getHash(password);

    return function(dispatch) {
        dispatch({
            type: "SET_PASSWORD_VERIFY",
            hash
        });

        fetchGitlabFile(PASSWORD_FILE)
            .then(response => {
                if (response.status === 200) {
                    return response.text()
                        .then(text => decrypt(text, hash))
                        .then(text => {
                            if (!verifyPasswordFileContent(text)) {
                                throw 0;
                            }
                        })
                        .catch(() => {
                            throw {
                                type: 'password_incorrect',
                            };
                        })
                    ;
                }
                else if (response.status === 404) {
                    return encrypt(createPasswordFileContent(), hash)
                        .then(passwordFileContent => {
                            return saveEncryptedFile(PASSWORD_FILE, passwordFileContent);
                        })
                        .then(response => {
                            if (response.status !== 201) {
                                throw {
                                    type: 'request_error',
                                    description: 'Could not create a password file'
                                };
                            }
                        })
                    ;
                }
                else {
                    throw {
                        type: 'request_error',
                        description: 'Could not verify the password'
                    };
                }
            })
            .then(() => {
                dispatch({
                    type: "SET_PASSWORD_VERIFIED"
                });
            })
            .catch(error => {
                if (error.type === "password_incorrect") {
                    dispatch({
                        type: "SET_PASSWORD_INCORRECT"
                    });
                }
                else {
                    throw error;
                }
            })
        ;
    }
}

export function redirectToNotebookSelectionWhenPasswordVerified(state, dispatch) {
    const { searchQuery, pathname, search } = state.location;
    const { hash } = state;
    const { page } = searchQuery;
    const { status, returnUrl } = hash;
    return [
        { page, status, returnUrl, pathname, search },
        ({ page, status, returnUrl, pathname, search }) => {
            if (status === 'VERIFIED' && page === pages.password_entry) {
                if (returnUrl) {
                    dispatch(replace(returnUrl));
                }
                else {
                    dispatch(push(urls.notebook_selection));
                }
            }
            else if (status !== 'VERIFIED' && ~passwordRequiredPages.indexOf(page)) {
                dispatch({
                    type: 'SET_RETURN_URL',
                    url: `${pathname}${search}`
                });
                dispatch(replace(urls.password_entry));
            }
        }
    ]
}