import { configureDependency } from "../../../type/inject";
import { GitlabFilesystem as IGitlabFilesystem } from "./GitlabFilesystem.types";
import { GitlabRequest } from "../GitlabRequest/GitlabRequest.types";
import { QueryBuilder } from "../../QueryBuilder/QueryBuilder.types";
import { GitlabCommits } from "./GitlabCommits.types";
import { GitlabFilesystem } from "./GitlabFilesystem.impl";

configureDependency()
    .implements(IGitlabFilesystem)
    .inject(GitlabRequest, GitlabCommits, QueryBuilder)
    .create(GitlabFilesystem);