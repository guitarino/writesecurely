import aesjs from "aes-js";

const counterStart = 1;

self.addEventListener("message", (e) => {
    const action = e.data;

    if (!action) {
        return;
    }

    if (action.type === "encrypt") {
        try {
            var textBytes = aesjs.utils.utf8.toBytes(action.text);
            var aesCtr = new aesjs.ModeOfOperation.ctr(action.hash, new aesjs.Counter(counterStart));
            var encryptedBytes = aesCtr.encrypt(textBytes);
            var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            self.postMessage({
                type: "encrypt-result",
                requestId: action.requestId,
                result: encryptedHex
            });
        }
        catch (error) {
            self.postMessage({
                type: "encrypt-error",
                requestId: action.requestId,
                result: error.toString()
            });
        }
    }

    if (action.type === "decrypt") {
        try {
            var encryptedBytes = aesjs.utils.hex.toBytes(action.text);
            var aesCtr = new aesjs.ModeOfOperation.ctr(action.hash, new aesjs.Counter(counterStart));
            var decryptedBytes = aesCtr.decrypt(encryptedBytes);
            var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
            self.postMessage({
                type: "decrypt-result",
                requestId: action.requestId,
                result: decryptedText
            });
        }
        catch (error) {
            self.postMessage({
                type: "decrypt-error",
                requestId: action.requestId,
                result: error.toString()
            });
        }
    }
});