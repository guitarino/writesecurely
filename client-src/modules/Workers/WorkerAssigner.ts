import { Worker } from "./Worker.types";

export class WorkerAssigner {
    private readonly worker: Worker;

    constructor(worker: Worker) {
        this.worker = worker;
        self.addEventListener('message', this.processDataAndSendBackResult);
    }

    processDataAndSendBackResult = async (e: MessageEvent) => {
        const { data } = e;
        const result = await this.worker.processData(data);
        if (result !== undefined) {
            // @ts-ignore: Typescript errors out because it doesn't know it is inside a worker
            self.postMessage(result);
        }
    }
}