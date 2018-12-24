import aesjs from "aes-js";

self.addEventListener("message", (e) => {
    const action = e.data;

    if (!action) {
        return;
    }

    if (action.type === "encrypt") {
        try {
            const counter = getRandom(0, 256);
            const aesCtr = new aesjs.Counter(counter);
            const textBytes = aesjs.utils.utf8.toBytes(action.text);
            const aesCbc = new aesjs.ModeOfOperation.ctr(action.hash, aesCtr);
            const encryptedBytes = aesCbc.encrypt(textBytes);
            const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            self.postMessage({
                type: "encrypt-result",
                requestId: action.requestId,
                result: `${counter};${encryptedHex}`
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
            const [ counter, contentHex ] = action.text.split(";");
            const aesCtr = new aesjs.Counter(Number(counter));
            const encryptedBytes = aesjs.utils.hex.toBytes(contentHex);
            const aesCbc = new aesjs.ModeOfOperation.ctr(action.hash, aesCtr);
            const decryptedBytes = aesCbc.decrypt(encryptedBytes);
            const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
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

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}