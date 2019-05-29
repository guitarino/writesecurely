import { configureDependency } from "../../../type/inject";
import { GitlabProjectManager } from "./GitlabProjectManager.impl";
import { GitlabProjectManager as IGitlabProjectManager } from "./GitlabProjectManager.types";
import { GitlabAuthenticationData } from "../GitlabAuthentication/GitlabAuthenticationData.types";
import { GitlabConfiguration } from "../GitlabConfiguration/GitlabConfiguration.types";

configureDependency()
    .implements(IGitlabProjectManager)
    .inject(GitlabAuthenticationData, GitlabConfiguration)
    .create(GitlabProjectManager);