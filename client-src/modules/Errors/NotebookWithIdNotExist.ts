export class NotebookWithIdNotExist extends Error {
    public readonly notebookId: string;

    constructor(notebookId: string) {
        super(`Notebook with id ${notebookId} does not exist`);
        this.notebookId = notebookId;
    }
}