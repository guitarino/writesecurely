let cryptoRequestId = 0;

export function getRequestId(): number {
    return cryptoRequestId++;
}