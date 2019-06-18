import { configureDependency } from "../../type/inject";
import { NotebookManager as INotebookManager } from "./NotebookManager.types";
import { NotebookManager } from "./NotebookManager.impl";
import { FilesystemSpecification } from "../FilesystemSpecification/FilesystemSpecification.types";
import { NotebookData } from "./NotebookData.types";

configureDependency()
    .implements(INotebookManager)
    .inject(NotebookData, FilesystemSpecification)
    .create(NotebookManager);