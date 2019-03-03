import { dependency, inject } from "../../../type/inject";
import { Location } from "../../Location/Location.types";
import { GitlabConfiguration } from "../GitlabConfiguration/GitlabConfiguration.types";
import { observed, connect } from "../../../type/connect";
import { QueryBuilder } from "../../QueryBuilder/QueryBuilder.types";
import { GitlabAuthentication as IGitlabAuthentication } from "./GitlabAuthentication.types";

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

    constructor(location: Location, configuration: GitlabConfiguration, queryBuilder: QueryBuilder) {
        this.location = location;
        this.configuration = configuration;
        this.queryBuilder = queryBuilder;
        connect(this);
    }

    @observed data: IGitlabAuthentication['data'] = {
        status: 'Unauthorized'
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
}