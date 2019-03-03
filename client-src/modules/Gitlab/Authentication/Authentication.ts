import { Authentication, AuthenticationStatus } from "../../Authentication/Authentication.types";
import { dependency, inject } from "../../../type/inject";
import { Location } from "../../Location/Location.types";
import { Configuration } from "../Configuration/Configuration.types";
import { observed, connect } from "../../../type/connect";

@dependency(Authentication.singleton)
@inject(
    Location,
    Configuration
)
class GitlabAuthentication implements Authentication {
    private readonly location: Location;
    private readonly configuration: Configuration;

    constructor(location: Location, configuration: Configuration) {
        this.location = location;
        this.configuration = configuration;
        connect(this);
    }

    @observed data: Authentication['data'] = {
        status: 'Unauthorized'
    }

    login() {
        this.location.redirect(
            `${this.configuration.oAuthUri}?${this.location.buildQuery({
                client_id: this.configuration.oAuthClientId,
                redirect_uri: this.configuration.oAuthRedirectId,
                response_type: 'token'
            })}`
        );
    }
}