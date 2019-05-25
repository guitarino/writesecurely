import { configureDependency } from "../../../type/inject";
import { Intent } from "../../Intent/Intent.types";
import { Location } from "../../Location/Location.types";
import { GitlabAuthentication } from "./GitlabAuthentication.types";
import { GitlabAuthenticationIntent } from "./GitlabAuthenticationIntent.impl";
import { connect } from 'typeconnect';

configureDependency()
    .implements(Intent)
    .inject(
        Location,
        GitlabAuthentication
    )
    .create(connect(GitlabAuthenticationIntent));