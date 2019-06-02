import { NotebookData as INotebookData } from './NotebookData.types';

export class NotebookData implements INotebookData {
    data: INotebookData['data'] = {
        status: 'Not Loaded',
        notebooks: [],
        errorMessage: ''
    }
}