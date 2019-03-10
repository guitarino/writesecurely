import { CryptoWorker } from "./CryptoWorker";
import { WorkerAssigner } from "../WorkerAssigner";

function initializeWorker() {
    const cryptoWorker = new CryptoWorker();
    new WorkerAssigner(cryptoWorker);
}

initializeWorker();