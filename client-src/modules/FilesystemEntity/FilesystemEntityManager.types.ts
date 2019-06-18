export type FilesystemEntityConfiguration = {
    getPath: (...parentIds: Array<string>) => string,
    getFolderPath?: (id: string, ...parentIds: Array<string>) => string,
    decode?: (fromStorage: string) => Promise<string>,
    encode?: (toStore: string) => Promise<string>,
}

export interface FilesystemEntityManager<T> {
    load(...parentIds: Array<string>): Promise<void>;
    add(item: T, ...parentIds: Array<string>): Promise<void>;
    delete(id: string, ...parentIds: Array<string>): Promise<void>;
    update(id: string, item: Partial<T>, ...parentIds: Array<string>): Promise<void>;
}