import { configureDependency } from "../../type/inject";
import { NotebookManager as INotebookManager } from "./NotebookManager.types";
import { NotebookManager } from "./NotebookManager.impl";
import { Filesystem } from "../Filesystem/Filesystem.types";
import { UuidManager } from "../UuidManager/UuidManager.types";
import { FilesystemSpecification } from "../FilesystemSpecification/FilesystemSpecification.types";
import { NotebookData } from "./NotebookData.types";
import { PasswordVerification } from "../PasswordVerification/PasswordVerification.types";

configureDependency()
    .implements(INotebookManager)
    .inject(Filesystem, UuidManager, NotebookData, FilesystemSpecification, PasswordVerification)
    .create(NotebookManager);