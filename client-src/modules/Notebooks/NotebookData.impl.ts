import { NotebookData as INotebookData } from './NotebookData.types';
import { FilesystemEntityData } from '../FilesystemEntity/FilesystemEntityData';
import { Notebook } from './Notebooks.types';

export class NotebookData extends FilesystemEntityData<Notebook> implements INotebookData {
}