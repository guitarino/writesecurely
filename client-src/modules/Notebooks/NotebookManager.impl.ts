import { NotebookManager as INotebookManager } from './NotebookManager.types';
import { Filesystem } from '../Filesystem/Filesystem.types';
import { UserNotebook, Notebook } from './Notebooks.types';
import { UuidManager } from '../UuidManager/UuidManager.types';
import { NotebookData } from './NotebookData.types';
import { FileNotExist } from '../Errors/FileNotExist';
import { NotebooksNotLoaded } from '../Errors/NotebooksNotLoaded';
import { NotebookWithIdNotExist } from '../Errors/NotebookWithIdNotExist';
import { FilesystemSpecification } from '../FilesystemSpecification/FilesystemSpecification.types';
import { PasswordVerification } from '../PasswordVerification/PasswordVerification.types';

export class NotebookManager implements INotebookManager {
    private readonly filesystem: Filesystem;
    private readonly uuid: UuidManager;
    private readonly notebookData: NotebookData;
    private readonly filesystemSpecification: FilesystemSpecification;
    private readonly passData: PasswordVerification;

    constructor(filesystem: Filesystem, uuid: UuidManager, notebookData: NotebookData, filesystemSpecification: FilesystemSpecification, passData: PasswordVerification) {
        this.filesystem = filesystem;
        this.uuid = uuid;
        this.notebookData = notebookData;
        this.filesystemSpecification = filesystemSpecification;
        this.passData = passData;
    }

    async getNotebooks() {
        this.notebookData.data = {
            ...this.notebookData.data,
            status: 'Loading'
        };
        try {
            const notebooks: Array<Notebook> = JSON.parse(
                await this.filesystem.getFileContent(this.filesystemSpecification.getNotebookFilePath())
            );
            this.notebookData.data = {
                ...this.notebookData.data,
                status: 'Loaded',
                notebooks
            };
        }
        catch (e) {
            if (e instanceof FileNotExist) {
                await this.filesystem.createFile(
                    this.filesystemSpecification.getNotebookFilePath(),
                    JSON.stringify([])
                );
                this.notebookData.data = {
                    ...this.notebookData.data,
                    status: 'Loaded',
                    notebooks: []
                };
            } else {
                this.notebookData.data = {
                    ...this.notebookData.data,
                    status: 'Error Loading',
                    errorMessage: e.toString()
                };
            }
        }
    }

    async addNotebook(userNotebook: UserNotebook) {
        if (this.notebookData.data.status !== 'Loaded') {
            throw new NotebooksNotLoaded();
        }
        const { notebooks } = this.notebookData.data;
        this.notebookData.data = {
            ...this.notebookData.data,
            status: 'Adding'
        };
        const newNotebook = this.getNewNotebook(userNotebook);
        this.passData.data.hashStatusMap.set(newNotebook, {
            hash: [],
            status: 'Not Created',
            errorMessage: ''
        });
        const newNotebooks: Array<Notebook> = [
            ...notebooks,
            newNotebook
        ];
        await this.updateNotebookFile(newNotebooks, 'Error Adding');
    }

    async deleteNotebook(id: string) {
        if (this.notebookData.data.status !== 'Loaded') {
            throw new NotebooksNotLoaded();
        }
        const { notebooks } = this.notebookData.data;
        this.notebookData.data = {
            ...this.notebookData.data,
            status: 'Deleting'
        };
        const newNotebooks: Array<Notebook> = [ ...notebooks ];
        const notebookIndex = this.getNotebookIndex(id);
        if (notebookIndex >= 0) {
            newNotebooks.splice(notebookIndex, 1);
        } else {
            throw new NotebookWithIdNotExist(id);
        }
        await this.updateNotebookFile(newNotebooks, 'Error Deleting');
        await this.filesystem.deleteFolder(this.filesystemSpecification.getNotebookFolderPath(id));
    }

    async updateNotebook(id: string, updatedNotebook: UserNotebook) {
        if (this.notebookData.data.status !== 'Loaded') {
            throw new NotebooksNotLoaded();
        }
        const { notebooks } = this.notebookData.data;
        this.notebookData.data = {
            ...this.notebookData.data,
            status: 'Updating'
        };
        const newNotebooks: Array<Notebook> = [ ...notebooks ];
        const notebookIndex = this.getNotebookIndex(id);
        if (notebookIndex >= 0) {
            const newNotebook = {
                ...notebooks[notebookIndex],
                ...updatedNotebook
            };
            newNotebooks.splice(notebookIndex, 1, newNotebook);
        } else {
            throw new NotebookWithIdNotExist(id);
        }
        await this.updateNotebookFile(newNotebooks, 'Error Updating');
    }

    private async updateNotebookFile(
        newNotebooks: Array<Notebook>,
        errorStatus: 'Error Adding' | 'Error Deleting' | 'Error Updating'
    ) {
        try {
            await this.filesystem.updateFile(
                this.filesystemSpecification.getNotebookFilePath(),
                JSON.stringify(newNotebooks)
            );
            this.notebookData.data = {
                ...this.notebookData.data,
                status: 'Loaded',
                notebooks: newNotebooks
            };
        }
        catch (e) {
            this.notebookData.data = {
                ...this.notebookData.data,
                status: errorStatus,
                errorMessage: e.toString()
            };
        }
    }

    private getNotebookIndex(id: string) {
        const { notebooks } = this.notebookData.data;
        for (let i = 0; i < notebooks.length; i++) {
            const notebook = notebooks[i];
            if (notebook.id === id) {
                return i;
            }
        }
        return -1;
    }

    private getNewNotebook(userNotebook: UserNotebook): Notebook {
        const notebook: Notebook = {
            id: this.uuid.create(),
            dateTimeCreated: (new Date()).toISOString(),
            title: userNotebook.title
        };
        if (userNotebook.description) {
            notebook.description = userNotebook.description;
        }
        return notebook;
    }
}