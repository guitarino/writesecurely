import { configureDependency } from "../../../type/inject";
import { GitlabProjectManagerData as IGitlabProjectManagerData } from "./GitlabProjectManagerData.types";
import { connect } from "typeconnect";
import { GitlabProjectManagerData } from "./GitlabProjectManagerData.impl";

configureDependency()
    .implements(IGitlabProjectManagerData)
    .create(connect(GitlabProjectManagerData));