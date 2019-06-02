import { configureDependency } from "../../type/inject";
import { NotebookData as INotebookData } from "./NotebookData.types";
import { NotebookData } from "./NotebookData.impl";

configureDependency()
    .implements(INotebookData)
    .create(NotebookData);