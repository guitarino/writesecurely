import { UserNotebook, Notebook } from "./Notebooks.types";
import { type } from "../../type/inject";

export const NotebookManager = type<NotebookManager>();
export interface NotebookManager {
    getNotebooks(): Promise<void>;
    addNotebook(userNotebook: UserNotebook): Promise<void>;
    deleteNotebook(id: string): Promise<void>;
    updateNotebook(id: string, updatedNotebook: UserNotebook): Promise<void>;
}