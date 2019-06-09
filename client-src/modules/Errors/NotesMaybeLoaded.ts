export class NotesMaybeLoaded extends Error {
    public readonly notebookId: string;

    constructor(notebookId: string) {
        super(`Notes for notebook with id ${notebookId} might have been loaded`);
        this.notebookId = notebookId;
    }
}