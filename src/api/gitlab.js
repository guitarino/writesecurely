// import { encrypt, decrypt } from "../crypto-worker/index.js";
import { store } from "../state/store.js";
import { gitlabApiUri } from "Config";

let projectPromise;

export function fetchGitlab(request) {
    let { credentials } = store.getState();
    const authorization = `Bearer ${credentials.token}`;
    if (!projectPromise) {
        projectPromise = fetch(`${gitlabApiUri}/projects?owned=true&search=write-securely-diaries`, {
            headers: {
                authorization
            }
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                throw {
                    type: 'request_error',
                    description: 'Could not fetch "write-securely-diaries" project'
                }
            }
        })
        .then(([ project ]) => {
            if (project) {
                return project;
            }
            else {
                return fetch(`${gitlabApiUri}/projects`, {
                    method: 'post',
                    headers: {
                        authorization,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: 'write-securely-diaries',
                        visibility: 'private'
                    })
                })
                .then(response => {
                    if (response.status === 201) {
                        return response.json();
                    }
                    else {
                        throw {
                            type: 'request_error',
                            description: 'Could not create "write-securely-diaries" project'
                        }
                    }
                });
            }
        });
    }
    return projectPromise
        .then(project => {
            const {
                method,
                url,
                headers = {},
                body
            } = request(
                project.id
            );
            headers.authorization = authorization;
            return fetch(url, {
                method,
                headers,
                body
            });
        })
    ;
}

export function fetchGitlabFile(filename) {
    return fetchGitlab(
        (project) => ({
            method: "GET",
            url: `${gitlabApiUri}/projects/${project}/repository/files/${encodeURIComponent(filename)}/raw?ref=master`
        })
    );
}

function saveUpdateEncryptedFile(method, commit_message, filename, content) {
    return fetchGitlab(
        (project) => ({
            method,
            url: `${gitlabApiUri}/projects/${project}/repository/files/${encodeURIComponent(filename)}`,
            body: JSON.stringify({
                branch: "master",
                content,
                commit_message
            }),
            headers: {
                "content-type": "application/json"
            }
        })
    );
}

export function saveEncryptedFile(filename, content) {
    return saveUpdateEncryptedFile(
        'POST',
        'Save encrypted file',
        filename,
        content
    );
}

export function updateEncryptedFile(filename, content) {
    return saveUpdateEncryptedFile(
        'PUT',
        'Update encrypted file',
        filename,
        content
    );
}

// export function fetchEncryptedFile(filename, type) {
//     const { hash } = store.getState();
//     let promise = fetchGitlab(
//         (project) => ({
//             method: "GET",
//             url: `${gitlabApiUri}/projects/${project}/repository/files/${encodeURIComponent(filename)}/raw?ref=master`
//         })
//     );
//     promise = promise
//         .then(response => response.text())
//         .then(text => decrypt(text, hash))
//     ;
//     if (type === "JSON") {
//         return promise.then(JSON.parse);
//     }
//     return promise;
// }

// export function saveEncryptedFile(action, filename, text) {
//     const { hash } = store.getState();
//     const fetchContent = (method) => (content) => fetchGitlab(
//         (project) => ({
//             method,
//             url: `${gitlabApiUri}/projects/${project}/repository/files/${encodeURIComponent(filename)}`,
//             body: JSON.stringify({
//                 branch: "master",
//                 content,
//                 commit_message: `Save Encrypted File`
//             }),
//             headers: {
//                 "content-type": "application/json"
//             }
//         })
//     );
//     let promise;
//     let original = encrypt(text, hash);
//     if (action === 'create') {
//         promise = original.then(fetchContent('POST'));
//     }
//     else if(action === 'update') {
//         promise = original.then(fetchContent('PUT'));
//     }
//     else {
//         promise = original
//             .then(fetchContent('PUT'))
//             .then(response => {
//                 if (response.status === 400) {
//                     return original.then(fetchContent('POST'));
//                 }
//                 return response;
//             })
//         ;
//     }
//     return promise.then(response => response.json());
// }