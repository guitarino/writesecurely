import { Crypter as ICrypter } from "./Crypter.types";
import { dependency } from "../../type/inject";
import { getRequestId } from "./utils/getRequestId";
import { EncryptData, EncryptError, DecryptData, DecryptError, EncryptResult, DecryptResult } from "../Workers/CryptoWorker/CryptoWorker.types";

@dependency(ICrypter.singleton)
class Crypter implements ICrypter {
    private readonly worker: Worker;

    constructor() {
        this.worker = new Worker('/src/crypto-worker.js');
    }

    private crypt(actionType: 'encrypt' | 'decrypt', text: string, hash: number[]): Promise<string> {
        return new Promise((resolve, reject) => {
            const requestId = getRequestId();
            const listener = this.createEventListener(
                requestId,
                actionType,
                resolve,
                reject
            );
            this.worker.addEventListener('message', listener);
            const data: EncryptData | DecryptData = {
                action: <any> actionType,
                requestId,
                text,
                hash
            };
            this.worker.postMessage(data);
        });
    }

    private createEventListener(
        requestId: number,
        actionType: 'encrypt' | 'decrypt',
        resolve: (result: string) => void,
        reject: (result: string) => void
    ): (e: any) => void {
        const listener = (e) => {
            const data: EncryptResult | EncryptError | DecryptResult | DecryptError = e.data;
            if (data.requestId === requestId) {
                if (data.type === `${actionType}-result`) {
                    this.worker.removeEventListener('message', listener);
                    resolve(data.result);
                }
                else if(data.type === `${actionType}-error`) {
                    this.worker.removeEventListener('message', listener);
                    reject(data.result);
                }
            }
        };
        return listener;
    }

    encrypt(text: string, hash: number[]) {
        return this.crypt('encrypt', text, hash);
    }

    decrypt(text: string, hash: number[]) {
        return this.crypt('decrypt', text, hash);
    }
}