export type Entity<T> = T & {
    id: string,
    dateTimeCreated: string,
    lastUpdated: string,
}

export interface FilesystemEntityData<T> {
    data: {
        currentList: Array<Entity<T>>    
    }

    load: {
        status:
            'Not Loaded' |
            'Loading' |
            'Loaded' |
            'Error Loading',
        errorMessage: string
    }

    add: {
        status:
            'Not Added' |
            'Adding' |
            'Added' |
            'Error Adding',
        item: null | Entity<T>,
        errorMessage: string
    }

    delete: {
        status:
            'Not Deleted' |
            'Deleting' |
            'Deleted' |
            'Error Deleting',
        item: null | Entity<T>,
        errorMessage: string
    }

    update: {
        status:
            'Not Updated' |
            'Updating' |
            'Updated' |
            'Error Updating',
        item: null | Entity<T>,
        errorMessage: string
    }
};