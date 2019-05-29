import { AuthenticationData } from "../../Authentication/AuthenticationData.types";
import { type } from "../../../type/inject";

export const GitlabAuthenticationData = type<GitlabAuthenticationData>(AuthenticationData);
export interface GitlabAuthenticationData extends AuthenticationData {
    headers: {} | { authorization: string };
}