import { encrypt, decrypt } from "../crypto-worker/index.js";
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
            .then(response => response.json())
            .then(([ project ]) => {
                return project;
            })
            .catch(() => {
                projectPromise = null;
            })
        ;
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

export function fetchEncryptedFile(filename, type) {
    const { hash } = store.getState();
    let promise = fetchGitlab(
        (project) => ({
            method: "GET",
            url: `${gitlabApiUri}/projects/${project}/repository/files/${encodeURIComponent(filename)}/raw?ref=master`
        })
    )
        .then(response => response.text())
        .then(text => decrypt(text, hash))
    ;
    if (type === "JSON") {
        return promise.then(JSON.parse);
    }
    return promise;
}

export function saveEncryptedFile(filename, text, action) {
    const { hash } = store.getState();
    const fetchContent = (method) => (content) => fetchGitlab(
        (project) => ({
            method,
            url: `${gitlabApiUri}/projects/${project}/repository/files/${encodeURIComponent(filename)}`,
            body: JSON.stringify({
                branch: "master",
                content,
                commit_message: `Save Encrypted File`
            }),
            headers: {
                "content-type": "application/json"
            }
        })
    );
    let promise;
    let original = encrypt(text, hash);
    if (action === 'create') {
        promise = original.then(fetchContent('POST'));
    }
    else if(action === 'update') {
        promise = original.then(fetchContent('PUT'));
    }
    else {
        promise = original
            .then(fetchContent('PUT'))
            .then(response => {
                if (response.status === 400) {
                    return original.then(fetchContent('POST'));
                }
                return response;
            })
        ;
    }
    return promise.then(response => response.json());
}