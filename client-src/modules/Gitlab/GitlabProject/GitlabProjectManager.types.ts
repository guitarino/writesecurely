import { type } from "../../../type/inject";

export type GitlabProject = {
    id: number,
    name: string,
    visibility: string
}

export const GitlabProjectManager = type<GitlabProjectManager>();
export interface GitlabProjectManager {
    getProject(): Promise<GitlabProject>;
    createProject(): Promise<GitlabProject>;
}