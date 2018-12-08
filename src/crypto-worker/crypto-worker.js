import aesjs from "aes-js";

self.addEventListener("message", (e) => {
    const action = e.data;

    if (!action) {
        return;
    }

    if (action.type === "encrypt") {
        try {
            const iv = getRandomIV();
            const ivHex = aesjs.utils.hex.fromBytes(iv);
            const textBytes = aesjs.utils.utf8.toBytes(action.text);
            const aesCbc = new aesjs.ModeOfOperation.cbc(action.hash, iv);
            const encryptedBytes = aesCbc.encrypt(textBytes);
            const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            self.postMessage({
                type: "encrypt-result",
                requestId: action.requestId,
                result: `${ivHex};${encryptedHex}`
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
            const [ ivHex, contentHex ] = action.text.split(";");
            const iv = aesjs.utils.hex.toBytes(ivHex);
            const encryptedBytes = aesjs.utils.hex.toBytes(contentHex);
            const aesCbc = new aesjs.ModeOfOperation.cbc(action.hash, iv);
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

function getRandomIV() {
    const iv = [];
    for (var i = 0; i < 16; i++) {
        iv.push(getRandom(0, 256));
    }
    return iv;
}