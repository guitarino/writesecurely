import { dependency, inject } from "../../../type/inject";
import { Location } from "../../Location/Location.types";
import { GitlabConfiguration } from "../GitlabConfiguration/GitlabConfiguration.types";
import { observed, connect } from "../../../type/connect";
import { QueryBuilder } from "../../QueryBuilder/QueryBuilder.types";
import { GitlabAuthentication as IGitlabAuthentication } from "./GitlabAuthentication.types";
import { GitlabAuthStorage } from "./GitlabAuthStorage.types";

@dependency(IGitlabAuthentication.singleton)
@inject(
    Location,
    GitlabConfiguration,
    QueryBuilder
)
class GitlabAuthentication implements IGitlabAuthentication {
    private readonly location: Location;
    private readonly configuration: GitlabConfiguration;
    private readonly queryBuilder: QueryBuilder;
    private readonly authStorage: GitlabAuthStorage;
    @observed public data: IGitlabAuthentication['data'];

    constructor(location: Location, configuration: GitlabConfiguration, queryBuilder: QueryBuilder, authStorage: GitlabAuthStorage) {
        this.location = location;
        this.configuration = configuration;
        this.queryBuilder = queryBuilder;
        this.authStorage = authStorage;
        this.data = this.getInitialStoredData();
        connect(this);
    }

    private getInitialStoredData(): IGitlabAuthentication['data'] {
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
        this.data = {
            status: 'Authorized',
            token
        };
        this.authStorage.setToken(token);
    }

    onLoginFailed(error: string, errorDescription: string) {
        this.data = {
            status: 'Error',
            error,
            errorDescription
        };
        this.authStorage.clearToken();
    }

    logout() {
        this.data = {
            status: 'Unauthorized'
        };
        this.authStorage.clearToken();
    }
}