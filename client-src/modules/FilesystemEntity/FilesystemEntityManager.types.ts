import { type } from "../../type/inject";

export type FilesystemEntityConfiguration = {
    path: string,
    getFolderPath?: (id: string) => string,
    decode?: (fromStorage: string) => Promise<string>,
    encode?: (toStore: string) => Promise<string>,
}

export interface FilesystemEntityManager<T> {
    load(): Promise<void>;
    add(item: T): Promise<void>;
    delete(id: string): Promise<void>;
    update(id: string, item: Partial<T>): Promise<void>;
}