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
import { NotebookExistence } from './NotebookExistence.types';

export class NotebookManager implements INotebookManager {
    private readonly filesystem: Filesystem;
    private readonly uuid: UuidManager;
    private readonly notebookData: NotebookData;
    private readonly fileSpec: FilesystemSpecification;
    private readonly passData: PasswordVerification;
    private readonly notebookExistence: NotebookExistence;

    constructor(filesystem: Filesystem, uuid: UuidManager, notebookData: NotebookData, fileSpec: FilesystemSpecification, passData: PasswordVerification, notebookExistence: NotebookExistence) {
        this.filesystem = filesystem;
        this.uuid = uuid;
        this.notebookData = notebookData;
        this.fileSpec = fileSpec;
        this.passData = passData;
        this.notebookExistence = notebookExistence;
    }

    async getNotebooks() {
        this.notebookData.data = {
            ...this.notebookData.data,
            status: 'Loading'
        };
        try {
            const notebooks: Array<Notebook> = JSON.parse(
                await this.filesystem.getFileContent(
                    this.fileSpec.getNotebookFilePath()
                )
            );
            for (let i = 0; i < notebooks.length; i++) {
                this.populateNotVerifiedPassData(notebooks[i]);
            }
            this.notebookData.data = {
                ...this.notebookData.data,
                status: 'Loaded',
                notebooks
            };
        }
        catch (e) {
            if (e instanceof FileNotExist) {
                await this.filesystem.createFile(
                    this.fileSpec.getNotebookFilePath(),
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
        this.populateNotCreatedPassData(newNotebook);
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
        const notebookIndex = this.notebookExistence.getNotebookIndex(id);
        if (notebookIndex >= 0) {
            newNotebooks.splice(notebookIndex, 1);
        } else {
            throw new NotebookWithIdNotExist(id);
        }
        await this.updateNotebookFile(newNotebooks, 'Error Deleting');
        await this.filesystem.deleteFolder(
            this.fileSpec.getNotebookFolderPath(id)
        );
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
        const notebookIndex = this.notebookExistence.getNotebookIndex(id);
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

    private populateNotVerifiedPassData(notebook: Notebook) {
        this.passData.data.hashStatusMap.set(notebook, {
            hash: [],
            status: 'Not Verified',
            errorMessage: ''
        });
    }

    private populateNotCreatedPassData(notebook: Notebook) {
        this.passData.data.hashStatusMap.set(notebook, {
            hash: [],
            status: 'Not Created',
            errorMessage: ''
        });
    }

    private async updateNotebookFile(
        newNotebooks: Array<Notebook>,
        errorStatus: 'Error Adding' | 'Error Deleting' | 'Error Updating'
    ) {
        try {
            await this.filesystem.updateFile(
                this.fileSpec.getNotebookFilePath(),
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