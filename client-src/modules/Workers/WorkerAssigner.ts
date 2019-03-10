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
            // @ts-ignore: Typescript needs to improve their typings inside workers
            self.postMessage(result);
        }
    }
}