import { Worker as IWorker } from "./Worker.types";

export abstract class Worker implements IWorker {
    constructor() {
        self.addEventListener("message", (e) => {
            const { data } = e;
            this.onMessage(data);
        });
    }

    abstract onMessage(data: Object);

    postMessage(data: Object) {
        // @ts-ignore: Typescript needs to improve their typings inside workers
        self.postMessage(data);
    }
}