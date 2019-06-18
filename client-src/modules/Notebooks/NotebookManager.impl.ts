import { NotebookManager as INotebookManager } from './NotebookManager.types';
import { Notebook } from './Notebooks.types';
import { NotebookData } from './NotebookData.types';
import { FilesystemSpecification } from '../FilesystemSpecification/FilesystemSpecification.types';
import { FilesystemEntityManager as IFilesystemEntityManager } from '../FilesystemEntity/FilesystemEntityManager.types';
import { FilesystemEntityManager } from '../FilesystemEntity/FilesystemEntityManager';

export class NotebookManager implements INotebookManager {
    private readonly notebookData: NotebookData;
    private readonly fileSpec: FilesystemSpecification;
    private readonly manager: IFilesystemEntityManager<Notebook>;

    constructor(notebookData: NotebookData, fileSpec: FilesystemSpecification) {
        this.notebookData = notebookData;
        this.fileSpec = fileSpec;
        this.manager = new FilesystemEntityManager(this.notebookData, {
            path: this.fileSpec.getNotebookFilePath(),
            getFolderPath: (id) => this.fileSpec.getNotebookFolderPath(id)
        });
    }

    async getNotebooks() {
        await this.manager.load();
    }

    async addNotebook(notebook: Notebook) {
        await this.manager.add(notebook);
    }

    async updateNotebook(id: string, updatedNotebook: Partial<Notebook>) {
        await this.manager.update(id, updatedNotebook);
    }

    async deleteNotebook(id: string) {
        await this.manager.delete(id);
    }
}