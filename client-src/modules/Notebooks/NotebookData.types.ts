import { Notebook } from "./Notebooks.types";
import { type } from "../../type/inject";
import { FilesystemEntityData } from "../FilesystemEntity/FilesystemEntityData.types";

export const NotebookData = type<NotebookData>();
export interface NotebookData extends FilesystemEntityData<Notebook> {

}