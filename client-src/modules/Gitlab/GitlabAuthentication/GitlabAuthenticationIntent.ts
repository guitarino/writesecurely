import { computed, observed, effected, connect } from "../../../type/connect";
import { Location } from "../../Location/Location.types";
import { dependency, inject } from "../../../type/inject";
import { Intent } from "../../Intent/Intent.types";
import { GitlabAuthentication } from "./GitlabAuthentication.types";

@dependency(Intent)
@inject(
    Location,
    GitlabAuthentication
)
class GitlabAuthenticationIntent implements Intent {
    private readonly location: Location;
    private readonly authentication: GitlabAuthentication;

    constructor(location: Location, authentication: GitlabAuthentication) {
        this.location = location;
        this.authentication = authentication;
        connect(this);
    }

    @observed isCurrentIntentValid = false;

    @computed get isCurrentIntent() {
        const query = this.location.query;
        return (
            query.token_response === 'gitlab_oauth'
        );
    }

    @effected updateToken() {
        if (this.isCurrentIntentValid) {
            const query = this.location.query;
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