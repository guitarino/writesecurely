export interface ObjectMap<ObjectType, MappedType> {
    set(key: ObjectType, value: MappedType): void;
    get(key: ObjectType): MappedType;
    delete(key: ObjectType): void;
    has(key: ObjectType): boolean;
}