import { NotebookExistence as INotebookExistence } from './NotebookExistence.types';
import { NotebookData } from './NotebookData.types';
import { NotebookWithIdNotExist } from '../Errors/NotebookWithIdNotExist';

export class NotebookExistence implements INotebookExistence {
    private readonly notebookData: NotebookData;

    constructor(notebookData: NotebookData) {
        this.notebookData = notebookData;
    }

    getNotebookById(id: string) {
        const index = this.getNotebookIndex(id);
        if (index >= 0) {
            return this.notebookData.data.notebooks[index];
        }
        throw new NotebookWithIdNotExist(id);
    }

    getNotebookIndex(id: string) {
        const { notebooks } = this.notebookData.data;
        for (let i = 0; i < notebooks.length; i++) {
            const notebook = notebooks[i];
            if (notebook.id === id) {
                return i;
            }
        }
        return -1;
    }
}