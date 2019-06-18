import { FilesystemEntityManager as IFilesystemEntityManager, FilesystemEntityConfiguration } from './FilesystemEntityManager.types';
import { configureDependency } from "../../type/inject";
import { FilesystemEntityManager as FilesystemEntityManagerImpl } from './FilesystemEntityManager.impl';
import { Filesystem } from "../Filesystem/Filesystem.types";
import { DateManager } from "../Date/DateManager.types";
import { UuidManager } from "../UuidManager/UuidManager.types";
import { FilesystemEntityData } from './FilesystemEntityData.impl';

const FilesystemEntityManager = configureDependency()
    .inject(
        Filesystem,
        DateManager,
        UuidManager
    )
    .create(FilesystemEntityManagerImpl);

export class FilesystemEntityManager<T> implements IFilesystemEntityManager<T> {
    private readonly dependency: IFilesystemEntityManager<T>;

    constructor(data: FilesystemEntityData<T>, configuration: FilesystemEntityConfiguration) {
        this.dependency = new FilesystemEntityManagerDependency(data, configuration);
    }

    async load(...parentIds: Array<string>) {
        await this.dependency.load(...parentIds);
    }

    async add(item: T, ...parentIds: Array<string>) {
        await this.dependency.add(item, ...parentIds);
    }

    async delete(id: string, ...parentIds: Array<string>) {
        await this.dependency.delete(id, ...parentIds);
    }

    async update(id: string, item: Partial<T>, ...parentIds: Array<string>) {
        await this.dependency.update(id, item, ...parentIds);
    }
}