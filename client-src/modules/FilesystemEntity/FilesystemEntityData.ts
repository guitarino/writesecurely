import { FilesystemEntityData as IFilesystemEntityData } from './FilesystemEntityData.types';

export class FilesystemEntityData<T> implements IFilesystemEntityData<T> {
    data:  {
        currentList: []
    }

    load: IFilesystemEntityData<T>['load'] = {
        status: 'Not Loaded',
        errorMessage: ''
    }

    add: IFilesystemEntityData<T>['add'] = {
        status: 'Not Added',
        item: null,
        errorMessage: ''
    }

    delete: IFilesystemEntityData<T>['delete'] = {
        status: 'Not Deleted',
        item: null,
        errorMessage: ''
    }

    update: IFilesystemEntityData<T>['update'] = {
        status: 'Not Updated',
        item: null,
        errorMessage: ''
    }
}