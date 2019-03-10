export interface Worker {
    onMessage(data: Object);
    postMessage(data: Object);
}