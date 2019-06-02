import { PasswordVerification as IPasswordVerification, PasswordVerificationStatus } from './PasswordVerification.types';
import { ObjectMap } from '../ObjectMap/ObjectMap';
import { NotebookData } from '../Notebooks/NotebookData.types';
import { Notebook } from '../Notebooks/Notebooks.types';

export class PasswordVerification implements IPasswordVerification {
    private readonly notebookData: NotebookData;
    private readonly map: ObjectMap<Notebook, PasswordVerificationStatus>;

    constructor(notebookData: NotebookData) {
        this.notebookData = notebookData;
        this.map = new ObjectMap<Notebook, PasswordVerificationStatus>();
    }

    get data() {
        const { notebooks } = this.notebookData.data;
        for (let i = 0; i < notebooks.length; i++) {
            const notebook = notebooks[i];
            if (!this.map.has(notebook)) {
                this.map.set(notebook, {
                    hash: [],
                    status: 'Not Verified',
                    errorMessage: ''
                });
            }
        }
        return {
            hashStatusMap: this.map
        }
    }
}