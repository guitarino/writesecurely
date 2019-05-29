export interface GitlabRequest {
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
}