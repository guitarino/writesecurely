import { FilesystemSpecification as IFilesystemSpecification } from './FilesystemSpecification.types';

export class FilesystemSpecification implements IFilesystemSpecification {
    getNotebookFilePath() {
        return "notebooks.json";
    }

    getNotebookFolderPath(notebookId: string) {
        return `notebooks/${notebookId}`;
    }

    getNotebookPassVerificationPath(notebookId: string) {
        return `${this.getNotebookFolderPath(notebookId)}/verification.json`;
    }

    getNotesFilePath(notebookId: string) {
        return `${this.getNotebookFolderPath(notebookId)}/notes.txt`;
    }

    getNoteFilePath(notebookId: string, noteId: string) {
        return `${this.getNotebookFolderPath(notebookId)}/notes/${noteId}.txt`;
    }
}