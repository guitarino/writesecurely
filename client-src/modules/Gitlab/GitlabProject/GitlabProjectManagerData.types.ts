import { GitlabProject } from "./GitlabProjectManager.types";
import { type } from "../../../type/inject";

export const GitlabProjectManagerData = type<GitlabProjectManagerData>();
export interface GitlabProjectManagerData {
    project: null | GitlabProject
}