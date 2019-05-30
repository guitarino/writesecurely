import { configureDependency } from "../../../type/inject";
import { GitlabCommits as IGitlabCommits } from "./GitlabCommits.types";
import { GitlabCommits } from "./GitlabCommits.impl";
import { GitlabRequest } from "../GitlabRequest/GitlabRequest.types";

configureDependency()
    .implements(IGitlabCommits)
    .inject(GitlabRequest)
    .create(GitlabCommits);