import { type } from "../../../type/inject";

export const GitlabCommits = type<GitlabCommits>();
export interface GitlabCommits {
    startCommit(): void;
    create(path: string, content: string): void;
    update(path: string, content: string): void;
    delete(path: string): void;
    performCommit(commitMessage: string): Promise<any>;
}