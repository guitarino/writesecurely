import { fetchGitlabFile, saveEncryptedFile } from "../api/gitlab";
import { decrypt, getHash, encrypt } from "../crypto-worker";

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