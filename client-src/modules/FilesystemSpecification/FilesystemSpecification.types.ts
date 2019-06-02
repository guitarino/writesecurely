import { type } from "../../type/inject";

export const FilesystemSpecification = type<FilesystemSpecification>();
export interface FilesystemSpecification {
    getNotebookFilePath(): string;
    getNotebookFolderPath(notebookId: string): string;
    getNotebookPassVerificationPath(notebookId: string): string;
}