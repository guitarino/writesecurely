import { configureDependency } from "../../type/inject";
import { FilesystemSpecification as IFilesystemSpecification } from "./FilesystemSpecification.types";
import { FilesystemSpecification } from "./FilesystemSpecification.impl";

configureDependency()
    .implements(IFilesystemSpecification)
    .create(FilesystemSpecification);