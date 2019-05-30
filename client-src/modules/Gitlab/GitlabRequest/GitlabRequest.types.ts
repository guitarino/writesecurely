import { type } from "../../../type/inject";

export const GitlabRequest = type<GitlabRequest>();
export interface GitlabRequest {
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
}