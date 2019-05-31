import { configureDependency } from "../../../type/inject";
import { GitlabAuthentication as IGitlabAuthentication } from "./GitlabAuthentication.types";
import { LocationManager } from "../../Location/LocationManager.types";
import { GitlabConfiguration } from "../GitlabConfiguration/GitlabConfiguration.types";
import { QueryBuilder } from "../../QueryBuilder/QueryBuilder.types";
import { GitlabAuthentication } from "./GitlabAuthentication.impl";
import { GitlabAuthStorage } from "./GitlabAuthStorage.types";
import { GitlabAuthenticationData } from "./GitlabAuthenticationData.types";

configureDependency()
    .implements(IGitlabAuthentication)
    .inject(
        LocationManager,
        GitlabConfiguration,
        QueryBuilder,
        GitlabAuthStorage,
        GitlabAuthenticationData
    )
    .create(GitlabAuthentication);