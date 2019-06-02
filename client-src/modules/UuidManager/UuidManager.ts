import { configureDependency } from "../../type/inject";
import { UuidManager } from "./UuidManager.impl";
import { UuidManager as IUuidManager } from "./UuidManager.types";

configureDependency()
    .implements(IUuidManager)
    .create(UuidManager);