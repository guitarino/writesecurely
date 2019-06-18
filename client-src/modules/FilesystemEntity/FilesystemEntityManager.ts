import { configureDependency } from "../../type/inject";
import { FilesystemEntityManager as FilesystemEntityManagerImpl } from './FilesystemEntityManager.impl';
import { Filesystem } from "../Filesystem/Filesystem.types";
import { DateManager } from "../Date/DateManager.types";
import { UuidManager } from "../UuidManager/UuidManager.types";

export const FilesystemEntityManager = configureDependency()
    .inject(
        Filesystem,
        DateManager,
        UuidManager
    )
    .create(FilesystemEntityManagerImpl);