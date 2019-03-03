import { computed, observed, effected, connect } from "../../../type/connect";
import { Location } from "../../Location/Location.types";
import { dependency, inject } from "../../../type/inject";
import { Intent } from "../../Intent/Intent.types";
import { Authentication } from "../../Authentication/Authentication.types";

@dependency(Intent)
@inject(
    Location,
    Authentication
)
class AuthenticationIntent implements Intent {
    private readonly location: Location;
    private readonly authentication: Authentication;

    constructor(location: Location, authentication: Authentication) {
        this.location = location;
        this.authentication = authentication;
        connect(this);
    }

    @observed isCurrentIntentValid = false;

    @computed get isCurrentIntent() {
        const query = this.location.searchQuery;
        return (
            query &&
            query.token === 'gitlab_oauth'
        );
    }

    @effected updateToken() {
        if (this.isCurrentIntentValid) {
            const query = this.location.hashQuery;
            if (query.access_token) {
                this.authentication.data = {
                    status: 'Authorized',
                    token: query.access_token
                };
            } else {
                this.authentication.data = {
                    status: 'Error',
                    error: query.error || '',
                    errorDescription: query.error_description || ''
                }
            }
        }
    }
}