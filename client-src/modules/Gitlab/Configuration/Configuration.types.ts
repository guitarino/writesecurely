import { type } from "../../../type/inject";

export const Configuration = type<Configuration>();
export interface Configuration {
    apiUri: string;
    oAuthUri: string;
    oAuthClientId: string;
    oAuthRedirectId: string;
}