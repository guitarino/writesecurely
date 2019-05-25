import { Location } from "../../Location/Location.types";
import { Intent } from "../../Intent/Intent.types";
import { GitlabAuthentication } from "./GitlabAuthentication.types";

export class GitlabAuthenticationIntent implements Intent {
    private readonly location: Location;
    private readonly authentication: GitlabAuthentication;
    public isCurrentIntentValid = false;

    constructor(location: Location, authentication: GitlabAuthentication) {
        this.location = location;
        this.authentication = authentication;
    }

    get isCurrentIntent() {
        const query = this.location.query;
        return (
            query.token_response === 'gitlab_oauth'
        );
    }

    notifyAuthentication() {
        if (this.isCurrentIntentValid) {
            const query = this.location.query;
            if (query.access_token) {
                this.authentication.onLoginSucceeded(query.access_token);
            } else {
                this.authentication.onLoginFailed(
                    query.error || '',
                    query.error_description || ''
                );
            }
        }
    }
}