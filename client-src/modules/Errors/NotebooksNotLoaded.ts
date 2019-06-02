export class NotebooksNotLoaded extends Error {
    constructor() {
        super("Notebooks are not loaded yet");
    }
}