import { Location } from "../../Location/Location.types";
import { GitlabConfiguration } from "../GitlabConfiguration/GitlabConfiguration.types";
import { QueryBuilder } from "../../QueryBuilder/QueryBuilder.types";
import { GitlabAuthentication as IGitlabAuthentication } from "./GitlabAuthentication.types";
import { GitlabAuthStorage } from "./GitlabAuthStorage.types";
import { GitlabAuthenticationData } from "./GitlabAuthenticationData.types";

export class GitlabAuthentication implements IGitlabAuthentication {
    private readonly location: Location;
    private readonly configuration: GitlabConfiguration;
    private readonly queryBuilder: QueryBuilder;
    private readonly authStorage: GitlabAuthStorage;
    private authData: GitlabAuthenticationData;

    constructor(location: Location, configuration: GitlabConfiguration, queryBuilder: QueryBuilder, authStorage: GitlabAuthStorage, authData: GitlabAuthenticationData) {
        this.location = location;
        this.configuration = configuration;
        this.queryBuilder = queryBuilder;
        this.authStorage = authStorage;
        this.authData.data = this.getInitialStoredData();
    }

    private getInitialStoredData(): GitlabAuthenticationData['data'] {
        const storedToken = this.authStorage.getToken();
        if (typeof storedToken === 'string') {
            return {
                status: 'Authorized',
                token: storedToken
            };
        } else {
            return {
                status: 'Unauthorized'
            }
        }
    }

    login() {
        this.location.redirect(
            `${this.configuration.oAuthUri}?${this.queryBuilder.getStringFromQuery({
                client_id: this.configuration.oAuthClientId,
                redirect_uri: this.configuration.oAuthRedirectId,
                response_type: 'token'
            })}`
        );
    }

    onLoginSucceeded(token: string) {
        this.authData.data = {
            status: 'Authorized',
            token
        };
        this.authStorage.setToken(token);
    }

    onLoginFailed(error: string, errorDescription: string) {
        this.authData.data = {
            status: 'Error',
            error,
            errorDescription
        };
        this.authStorage.clearToken();
    }

    logout() {
        this.authData.data = {
            status: 'Unauthorized'
        };
        this.authStorage.clearToken();
    }
}