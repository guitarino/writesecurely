import { PasswordVerification as IPasswordVerification, PasswordVerificationStatus } from './PasswordVerification.types';
import { ObjectMap } from '../ObjectMap/ObjectMap';
import { Notebook } from '../Notebooks/Notebooks.types';
import { Entity } from '../FilesystemEntity/FilesystemEntityData.types';
import { NotebookData } from '../Notebooks/NotebookData.types';

export class PasswordVerification implements IPasswordVerification {
    private readonly notebookData: NotebookData;
    private readonly hashStatusMap: IPasswordVerification['data']['hashStatusMap'];

    constructor(notebookData: NotebookData) {
        this.notebookData = notebookData;
        this.hashStatusMap = new ObjectMap<Notebook, PasswordVerificationStatus>();
    }

    get data() {
        const { currentList } = this.notebookData.data;
        createStatus(this.notebookData.add.item, this.hashStatusMap, 'Not Created');
        provideLoadedNotVerified(currentList, this.hashStatusMap);
        return { hashStatusMap: this.hashStatusMap };
    }
}

function createStatus(
    notebook: Notebook | null,
    hashStatusMap: IPasswordVerification['data']['hashStatusMap'],
    status: PasswordVerificationStatus['status']
) {
    if (notebook && !hashStatusMap.has(notebook)) {
        hashStatusMap.set(notebook, {
            errorMessage: '',
            hash: [],
            status
        });
    }
}

function provideLoadedNotVerified(currentList: Array<Entity<Notebook>>, hashStatusMap: IPasswordVerification['data']['hashStatusMap']) {
    for (let i = 0; i < currentList.length; i++) {
        createStatus(currentList[i], hashStatusMap, 'Not Verified');
    }
}