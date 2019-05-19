import { configureDependency } from "../../../type/inject";
import { GitlabAuthStorage as IGitlabAuthStorage } from "./GitlabAuthStorage.types";
import { GitlabAuthStorage } from "./GitlabAuthStorage.impl";

configureDependency()
    .implements(IGitlabAuthStorage)
    .create(GitlabAuthStorage);