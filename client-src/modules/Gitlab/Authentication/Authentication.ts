import { Authentication } from "../../Authentication/Authentication.types";
import { dependency, inject } from "../../../type/inject";
import { Location } from "../../Location/Location.types";
import { Configuration } from "../Configuration/Configuration.types";
import { observed, connect } from "../../../type/connect";
import { QueryBuilder } from "../../QueryBuilder/QueryBuilder.types";

@dependency(Authentication.singleton)
@inject(
    Location,
    Configuration,
    QueryBuilder
)
class GitlabAuthentication implements Authentication {
    private readonly location: Location;
    private readonly configuration: Configuration;
    private readonly queryBuilder: QueryBuilder;

    constructor(location: Location, configuration: Configuration, queryBuilder: QueryBuilder) {
        this.location = location;
        this.configuration = configuration;
        this.queryBuilder = queryBuilder;
        connect(this);
    }

    @observed data: Authentication['data'] = {
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