import { NotebookManager as INotebookManager } from './NotebookManager.types';
import { UserNotebook } from './Notebooks.types';
import { NotebookData } from './NotebookData.types';
import { FilesystemSpecification } from '../FilesystemSpecification/FilesystemSpecification.types';

export class NotebookManager implements INotebookManager {
    private readonly notebookData: NotebookData;
    private readonly fileSpec: FilesystemSpecification;

    constructor(notebookData: NotebookData, fileSpec: FilesystemSpecification) {
        this.notebookData = notebookData;
        this.fileSpec = fileSpec;
    }

    async getNotebooks() {
        await 
    }

    async addNotebook(userNotebook: UserNotebook) {
    }

    async deleteNotebook(id: string) {
    }

    async updateNotebook(id: string, updatedNotebook: UserNotebook) {
    }
}