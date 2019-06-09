import { Notebook } from "./Notebooks.types";
import { type } from "../../type/inject";

export const NotebookExistence = type<NotebookExistence>();
export interface NotebookExistence {
    getNotebookIndex(id: string): number;
    getNotebookById(id: string): Notebook;
}