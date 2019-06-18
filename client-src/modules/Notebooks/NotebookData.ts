import { configureDependency } from "../../type/inject";
import { NotebookData as INotebookData } from "./NotebookData.types";
import { NotebookData } from "./NotebookData.impl";
import { connect } from "typeconnect";

configureDependency()
    .implements(INotebookData)
    .create(connect(NotebookData));