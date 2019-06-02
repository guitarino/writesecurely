import { configureDependency } from "../../type/inject";
import { UuidManager } from "../UuidManager/UuidManager.types";
import { ObjectMap as ObjectMapImpl } from "./ObjectMap.impl";
import { ObjectMap as IObjectMap } from "./ObjectMap.types";

export interface ObjectMap<ObjectType, MappedType> extends IObjectMap<ObjectType, MappedType> {
    
};
export const ObjectMap: {
    new<ObjectType, MappedType>(): IObjectMap<ObjectType, MappedType>
} = configureDependency()
    .inject(UuidManager)
    .create(ObjectMapImpl);