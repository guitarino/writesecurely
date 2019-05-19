import { configureDependency } from "../../../type/inject";
import { GitlabConfiguration } from "./GitlabConfiguration.types";
import { GitlabDevConfiguration } from "./GitlabDevConfiguration.impl";

configureDependency()
    .implements(GitlabConfiguration)
    .create(GitlabDevConfiguration);