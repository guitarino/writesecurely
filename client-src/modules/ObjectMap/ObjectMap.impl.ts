import { UuidManager } from "../UuidManager/UuidManager.types";
import { ObjectMap as IObjectMap } from './ObjectMap.types';

export class ObjectMap<ObjectType, MappedType> implements IObjectMap<ObjectType, MappedType> {
    private readonly key: string;

    constructor(uuid: UuidManager) {
        this.key = uuid.create();
    }

    set(key: ObjectType, value: MappedType) {
        key[this.key] = value;
    }

    get(key: ObjectType) {
        return key[this.key];
    }

    delete(key: ObjectType) {
        delete key[this.key];
    }

    has(key: ObjectType) {
        return this.key in key;
    }
}