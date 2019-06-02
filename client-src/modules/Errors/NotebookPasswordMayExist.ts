export class NotebookPasswordMayExist extends Error {
    constructor(notebookId: string) {
        super(`Password for notebook with id ${notebookId} may already exist`);
    }
}