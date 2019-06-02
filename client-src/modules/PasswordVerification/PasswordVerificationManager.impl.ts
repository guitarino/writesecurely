import { PasswordVerificationManager as IPasswordVerificationManager } from './PasswordVerificationManager.types';
import { PasswordVerification, PasswordVerificationStatus } from './PasswordVerification.types';
import { Notebook } from '../Notebooks/Notebooks.types';
import { NotebookData } from '../Notebooks/NotebookData.types';
import { NotebookWithIdNotExist } from '../Errors/NotebookWithIdNotExist';
import { Filesystem } from '../Filesystem/Filesystem.types';
import { FilesystemSpecification } from '../FilesystemSpecification/FilesystemSpecification.types';
import { NotebookPasswordMayExist } from '../Errors/NotebookPasswordMayExist';
import { Crypter } from '../Crypter/Crypter.types';
import { FileNotExist } from '../Errors/FileNotExist';
import { sha256 } from "js-sha256";

export class PasswordVerificationManager implements IPasswordVerificationManager {
    private readonly passData: PasswordVerification;
    private readonly notebookData: NotebookData;
    private readonly filesystem: Filesystem;
    private readonly fileSpec: FilesystemSpecification;
    private readonly crypter: Crypter;

    constructor(passData: PasswordVerification, notebookData: NotebookData, filesystem: Filesystem, fileSpec: FilesystemSpecification, crypter: Crypter) {
        this.passData = passData;
        this.notebookData = notebookData;
        this.filesystem = filesystem;
        this.fileSpec = fileSpec;
        this.crypter = crypter;
    }

    async createPassword(notebookId: string, password: string) {
        const notebook = this.getNotebookById(notebookId);
        if (
            this.getStatus(notebook).status !== 'Not Created' &&
            this.getStatus(notebook).status !== 'Error Creating'
        ) {
            throw new NotebookPasswordMayExist(notebookId);
        }
        const hash = this.getHashFromPassword(password);
        this.setStatus(notebook, {
            ...this.getStatus(notebook),
            status: 'Creating'
        });
        try {
            const encryptedFileContent = await this.crypter.encrypt(this.createVerificationFileContent(), hash);
            await this.filesystem.createFile(
                this.fileSpec.getNotebookPassVerificationPath(notebookId),
                encryptedFileContent
            );
            this.setStatus(notebook, {
                ...this.getStatus(notebook),
                hash,
                status: 'Verified'
            })
        }
        catch (e) {
            this.setStatus(notebook, {
                ...this.getStatus(notebook),
                status: 'Error Creating'
            })
        }
    }

    async verifyPassword(notebookId: string, password: string) {
        const notebook = this.getNotebookById(notebookId);
        if (
            this.getStatus(notebook).status !== 'Not Verified' &&
            this.getStatus(notebook).status !== 'Error Verifying'
        ) {
            throw new NotebookPasswordMayExist(notebookId);
        }
        const hash = this.getHashFromPassword(password);
        this.setStatus(notebook, {
            ...this.getStatus(notebook),
            hash,
            status: 'Verifying'
        });
        try {
            const encryptedFileContent = await this.filesystem.getFileContent(
                this.fileSpec.getNotebookPassVerificationPath(notebookId)
            );
            const decryptedFileContent = await this.crypter.decrypt(encryptedFileContent, hash);
            this.setStatus(notebook, {
                ...this.getStatus(notebook),
                hash,
                status: this.verifyFileContentIsValid(decryptedFileContent)
                    ? 'Verified'
                    : 'Wrong'
            });
        }
        catch (e) {
            if (e instanceof FileNotExist) {
                this.setStatus(notebook, {
                    ...this.getStatus(notebook),
                    status: 'Not Created'
                });
            } else {
                this.setStatus(notebook, {
                    ...this.getStatus(notebook),
                    status: 'Error Verifying'
                })
            }
        }
    }

    private createVerificationFileContent(): string {
        return (
            this.createRandomNumberString() +
            this.createRandomNumberString() +
            this.createRandomNumberString() +
            this.createRandomNumberString() +
            this.createRandomNumberString()
        );
    }

    private verifyFileContentIsValid(content: string): boolean {
        return /^[0-9]+$/.test(content);
    }

    private createRandomNumberString() {
        const random: string = ('' + (Math.random() * 10)).replace('.', '');
        return random;
    }

    private getHashFromPassword(password: string): Array<number> {
        return sha256.array(password);
    }

    private getNotebookById(notebookId: string): Notebook {
        const { notebooks } = this.notebookData.data;
        for (let i = 0; i < notebooks.length; i++) {
            if (notebooks[i].id === notebookId) {
                return notebooks[i];
            }
        }
        throw new NotebookWithIdNotExist(notebookId);
    }

    private getStatus(notebook: Notebook): PasswordVerificationStatus {
        return this.passData.data.hashStatusMap.get(notebook);
    }

    private setStatus(notebook: Notebook, status: PasswordVerificationStatus) {
        this.passData.data.hashStatusMap.set(notebook, status);
        this.passData.data = {
            ...this.passData.data
        };
    }
}