import { Filesystem } from "../../Filesystem/Filesystem.types";
import { type } from "../../../type/inject";

export const GitlabFilesystem = type<GitlabFilesystem>(Filesystem);
export interface GitlabFilesystem extends Filesystem {

}