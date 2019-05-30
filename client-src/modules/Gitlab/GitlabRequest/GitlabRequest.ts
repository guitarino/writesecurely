import { configureDependency } from "../../../type/inject";
import { GitlabRequest as IGitlabRequest } from "./GitlabRequest.types";
import { GitlabRequest } from "./GitlabRequest.impl";
import { GitlabAuthenticationData } from "../GitlabAuthentication/GitlabAuthenticationData.types";
import { GitlabProjectManager } from "../GitlabProject/GitlabProjectManager.types";
import { GitlabConfiguration } from "../GitlabConfiguration/GitlabConfiguration.types";
import { GitlabProjectManagerData } from "../GitlabProject/GitlabProjectManagerData.types";

configureDependency()
    .implements(IGitlabRequest)
    .inject(GitlabAuthenticationData, GitlabProjectManager, GitlabConfiguration, GitlabProjectManagerData)
    .create(GitlabRequest);