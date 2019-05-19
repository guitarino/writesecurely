import { type } from "../../../type/inject";

export const GitlabAuthStorage = type<GitlabAuthStorage>();
export interface GitlabAuthStorage {
    getToken(): string | null;
    setToken(token: string);
    clearToken();
}