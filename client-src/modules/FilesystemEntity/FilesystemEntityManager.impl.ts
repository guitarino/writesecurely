import { FilesystemEntityManager as IFilesystemEntityManager, FilesystemEntityConfiguration } from './FilesystemEntityManager.types';
import { FilesystemEntityData, Entity } from './FilesystemEntityData.types';
import { Filesystem } from '../Filesystem/Filesystem.types';
import { FileNotExist } from '../Errors/FileNotExist';
import { ResourceNotLoaded } from '../Errors/ResourceNotLoaded';
import { AnotherRequestInProgress } from '../Errors/AnotherRequestInProgress';
import { DateManager } from '../Date/DateManager.types';
import { UuidManager } from '../UuidManager/UuidManager.types';
import { EntityNotExist } from '../Errors/EntityNotExist';

export class FilesystemEntityManager<T> implements IFilesystemEntityManager<T> {
    private readonly filesystem: Filesystem;
    private readonly dateManager: DateManager;
    private readonly uuid: UuidManager;
    private readonly data: FilesystemEntityData<T>;
    private readonly configuration: FilesystemEntityConfiguration;
    
    constructor(filesystem: Filesystem, dateManager: DateManager, uuid: UuidManager, data: FilesystemEntityData<T>, configuration: FilesystemEntityConfiguration) {
        this.dateManager = dateManager;
        this.filesystem = filesystem;
        this.uuid = uuid;
        this.data = data;
        this.configuration = configuration;
    }

    async load() {
        this.ensureNotLoading();
        this.ensureNotMutating();
        this.data.load = {
            ...this.data.load,
            status: 'Loading'
        };
        let currentList: Array<Entity<T>> = [];
        try {
            currentList = JSON.parse(
                await this.decodeIfNeeded(
                    await this.filesystem.getFileContent(this.configuration.path)
                )
            );
        } catch (e) {
            if (e instanceof FileNotExist) {
                await this.filesystem.createFile(
                    this.configuration.path,
                    await this.encodeIfNeeded(
                        JSON.stringify(currentList)
                    )
                );
            } else {
                this.data.load = {
                    status: 'Error Loading',
                    errorMessage: e.toString()
                };
                return;
            }
        }
        this.data.data = { currentList };
        this.data.load = {
            ...this.data.load,
            status: 'Loaded'
        };
    }

    async add(item: T) {
        this.ensureResourceAvailable();
        const newItem: Entity<T> = this.getNewItem(item);
        const { currentList } = this.data.data;
        this.data.add = {
            ...this.data.add,
            status: 'Adding',
            item: newItem
        };
        const newList: Array<Entity<T>> = [
            ...currentList,
            newItem
        ];
        try {
            await this.filesystem.updateFile(
                this.configuration.path,
                await this.encodeIfNeeded(
                    JSON.stringify(newList)
                )
            );
            this.data.data = {
                ...this.data.data,
                currentList: newList,
            };
            this.data.add = {
                ...this.data.add,
                status: 'Added',
                item: newItem
            };
        }
        catch (e) {
            this.data.add = {
                ...this.data.add,
                status: 'Error Adding',
                errorMessage: e.toString()
            };
        }
    }

    async update(id: string, itemModifications: Partial<T>) {
        this.ensureResourceAvailable();
        const { currentList } = this.data.data;
        const index = this.getItemIndex(currentList, id);
        if (index < 0) {
            throw new EntityNotExist(id);
        }
        const item = currentList[index];
        const updatedItem = this.getUpdatedItem(item, itemModifications);
        this.data.update = {
            ...this.data.update,
            status: 'Updating',
            item: updatedItem
        };
        const newList: Array<Entity<T>> = [
            ...currentList.slice(0, index),
            updatedItem,
            ...currentList.slice(index + 1)
        ];
        try {
            await this.filesystem.updateFile(
                this.configuration.path,
                await this.encodeIfNeeded(
                    JSON.stringify(newList)
                )
            );
            this.data.data = {
                ...this.data.data,
                currentList: newList,
            };
            this.data.update = {
                ...this.data.update,
                status: 'Updated',
                item: updatedItem
            };
        }
        catch (e) {
            this.data.update = {
                ...this.data.update,
                status: 'Error Updating',
                errorMessage: e.toString()
            };
        }
    }

    async delete(id: string) {
        this.ensureResourceAvailable();
        const { currentList } = this.data.data;
        const index = this.getItemIndex(currentList, id);
        if (index < 0) {
            throw new EntityNotExist(id);
        }
        const item = currentList[index];
        this.data.delete = {
            ...this.data.delete,
            status: 'Deleting',
            item
        };
        const newList: Array<Entity<T>> = [
            ...currentList.slice(0, index),
            ...currentList.slice(index + 1)
        ];
        try {
            await this.filesystem.updateFile(
                this.configuration.path,
                await this.encodeIfNeeded(
                    JSON.stringify(newList)
                )
            );
            if (this.configuration.getFolderPath) {
                await this.filesystem.deleteFolder(
                    this.configuration.getFolderPath(id)
                );
            }
            this.data.data = {
                ...this.data.data,
                currentList: newList,
            };
            this.data.delete = {
                ...this.data.delete,
                status: 'Deleted',
                item
            };
        }
        catch (e) {
            this.data.update = {
                ...this.data.update,
                status: 'Error Updating',
                errorMessage: e.toString()
            };
        }
    }

    private getItemIndex(currentList: Array<Entity<T>>, id: string) {
        for (let i = 0; i < currentList.length; i++) {
            const item = currentList[i];
            if (item.id === id) {
                return i;
            }
        }
        return -1;
    }

    private getNewItem(item: T): Entity<T> {
        const currentDate = this.dateManager.getCurrent();
        return {
            ...item,
            id: this.uuid.create(),
            dateTimeCreated: currentDate,
            lastUpdated: currentDate 
        } 
    }

    private getUpdatedItem(item: Entity<T>, itemModifications: Partial<T>): Entity<T> {
        return {
            ...item,
            ...itemModifications,
            lastUpdated: this.dateManager.getCurrent()
        }
    }

    private ensureResourceAvailable() {
        this.ensureLoaded();
        this.ensureNotMutating();
    }

    private ensureLoaded() {
        if (this.data.load.status !== 'Loaded') {
            throw new ResourceNotLoaded();
        }
    }

    private ensureNotLoading() {
        if (this.data.load.status === 'Loading') {
            throw new AnotherRequestInProgress();
        }
    }
    
    private ensureNotMutating() {
        if (
            this.data.add.status === 'Adding' ||
            this.data.delete.status === 'Deleting' ||
            this.data.update.status === 'Updating'
        ) {
            throw new AnotherRequestInProgress();
        }
    }

    private async decodeIfNeeded(value: string): Promise<string> {
        if (this.configuration.decode) {
            return await this.configuration.decode(value);
        }
        return value;
    }

    private async encodeIfNeeded(value: string): Promise<string> {
        if (this.configuration.encode) {
            return await this.configuration.encode(value);
        }
        return value;
    }
}