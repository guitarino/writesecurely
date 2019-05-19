import assert from "assert";
import { CryptoWorker } from "../../modules/Workers/CryptoWorker/CryptoWorker";

describe('CryptoWorker', () => {
    const cryptoWorker = new CryptoWorker();
    const text = `So, this is a test of some sort. Here are some special chars:\r\n\r\n123,;'./[]\`!@#$%^&*()_+{}|:"<>?`;
    const hash = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
        29, 30, 31
    ];
    const incorrectHash = [
        1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
        29, 30, 31
    ];

    it(`encryption follows correct pattern`, async () => {
        const response = await cryptoWorker.processData({
            action: 'encrypt',
            text,
            hash,
            requestId: 19
        });
        assert.ok(response);
        if (response) {
            assert.strictEqual(response.requestId, 19);
            assert.strictEqual(response.type, 'encrypt-result');
            assert(/^\d+;[0-9a-z]+$/.test(response.result));
        }
    });

    it(`encrypted text cannot be decrypted with wrong hash`, async () => {
        const encryptedResponse = await cryptoWorker.processData({
            action: 'encrypt',
            text,
            hash,
            requestId: 20
        });
        assert.ok(encryptedResponse);
        if (encryptedResponse) {
            const decryptedResponse = await cryptoWorker.processData({
                action: 'decrypt',
                text: encryptedResponse.result,
                hash: incorrectHash,
                requestId: 21
            });
            assert.ok(decryptedResponse);
            if (decryptedResponse) {
                assert.strictEqual(decryptedResponse.requestId, 21);
                assert.strictEqual(decryptedResponse.type, 'decrypt-result');
                assert(decryptedResponse.result !== text);
            }
        }
    });

    it(`encrypted text can be decrypted with correct hash`, async () => {
        const encryptedResponse = await cryptoWorker.processData({
            action: 'encrypt',
            text,
            hash,
            requestId: 22
        });
        assert.ok(encryptedResponse);
        if (encryptedResponse) {
            const decryptedResponse = await cryptoWorker.processData({
                action: 'decrypt',
                text: encryptedResponse.result,
                hash,
                requestId: 23
            });
            assert.ok(decryptedResponse);
            if (decryptedResponse) {
                assert(decryptedResponse.result === text);
            }
        }
    });
});