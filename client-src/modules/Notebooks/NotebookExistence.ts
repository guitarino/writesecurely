import { configureDependency } from "../../type/inject";
import { NotebookExistence as INotebookExistence } from './NotebookExistence.types';
import { NotebookData } from "./NotebookData.types";
import { NotebookExistence } from "./NotebookExistence.impl";

configureDependency()
    .implements(INotebookExistence)
    .inject(NotebookData)
    .create(NotebookExistence);