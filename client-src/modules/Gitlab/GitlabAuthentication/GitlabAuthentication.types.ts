import { type } from "../../../type/inject";
import { Authentication } from "../../Authentication/Authentication.types";

export const GitlabAuthentication = type<GitlabAuthentication>(Authentication);
export interface GitlabAuthentication extends Authentication {

}