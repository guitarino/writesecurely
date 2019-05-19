import { configureDependency } from "../../../type/inject";
import { GitlabAuthentication as IGitlabAuthentication } from "./GitlabAuthentication.types";
import { Location } from "../../Location/Location.types";
import { GitlabConfiguration } from "../GitlabConfiguration/GitlabConfiguration.types";
import { QueryBuilder } from "../../QueryBuilder/QueryBuilder.types";
import { GitlabAuthentication } from "./GitlabAuthentication.impl";

configureDependency()
    .implements(IGitlabAuthentication)
    .inject(
        Location,
        GitlabConfiguration,
        QueryBuilder
    )
    .create(GitlabAuthentication);