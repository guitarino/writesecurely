import { Notebook } from "./Notebooks.types";
import { type } from "../../type/inject";

export const NotebookData = type<NotebookData>();
export interface NotebookData {
    data: {
        status:
            'Not Loaded' |
            'Loading' |
            'Loaded' |
            'Error Loading' |
            'Adding' |
            'Error Adding' |
            'Deleting' |
            'Error Deleting' |
            'Updating' |
            'Error Updating',
        notebooks: Array<Notebook>,
        errorMessage: ''
    }
}