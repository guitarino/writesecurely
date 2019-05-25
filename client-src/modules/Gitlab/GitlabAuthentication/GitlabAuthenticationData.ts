import { configureDependency } from "../../../type/inject";
import { connect } from "typeconnect";
import { GitlabAuthenticationData } from "./GitlabAuthenticationData.impl";
import { GitlabAuthenticationData as IGitlabAuthenticationData } from "./GitlabAuthenticationData.types";

configureDependency()
    .implements(IGitlabAuthenticationData)
    .create(connect(GitlabAuthenticationData));