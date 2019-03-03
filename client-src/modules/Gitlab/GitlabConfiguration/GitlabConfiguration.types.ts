import { type } from "../../../type/inject";

export const GitlabConfiguration = type<GitlabConfiguration>();
export interface GitlabConfiguration {
    apiUri: string;
    oAuthUri: string;
    oAuthClientId: string;
    oAuthRedirectId: string;
}