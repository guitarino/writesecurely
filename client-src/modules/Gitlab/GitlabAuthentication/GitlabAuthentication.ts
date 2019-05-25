import { configureDependency } from "../../../type/inject";
import { GitlabAuthentication as IGitlabAuthentication } from "./GitlabAuthentication.types";
import { LocationManager } from "../../Location/LocationManager.types";
import { GitlabConfiguration } from "../GitlabConfiguration/GitlabConfiguration.types";
import { QueryBuilder } from "../../QueryBuilder/QueryBuilder.types";
import { GitlabAuthentication } from "./GitlabAuthentication.impl";

configureDependency()
    .implements(IGitlabAuthentication)
    .inject(
        LocationManager,
        GitlabConfiguration,
        QueryBuilder
    )
    .create(GitlabAuthentication);