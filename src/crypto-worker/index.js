import sha256 from "js-sha256";

const cryptoWorker = new Worker("/src/crypto-worker.js");

let cryptoRequestId = 0;

function getRequestId() {
    return cryptoRequestId++;
}

function crypt(actionType, text, hash) {
    return new Promise((resolve, reject) => {
        const requestId = getRequestId();
        const listener = (e) => {
            const action = e.data;
            if (
                action.requestId === requestId
            ) {
                if (action.type === `${actionType}-result`) {
                    cryptoWorker.removeEventListener('message', listener);
                    resolve(action.result);
                }
                else if(action.type === `${actionType}-error`) {
                    cryptoWorker.removeEventListener('message', listener);
                    reject(action.result);
                }
            }
        };
        cryptoWorker.addEventListener('message', listener);
        cryptoWorker.postMessage({
            type: actionType,
            requestId,
            text,
            hash
        });
    });
}

export function encrypt(text, hash) {
    return crypt("encrypt", text, hash);
}

export function decrypt(text, hash) {
    return crypt("decrypt", text, hash);
}

export function getHash(password) {
    return sha256.array(password);
}