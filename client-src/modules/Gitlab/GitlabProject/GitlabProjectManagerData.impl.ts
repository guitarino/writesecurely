import { GitlabProjectManagerData as IGitlabProjectManagerData } from './GitlabProjectManagerData.types';
import { GitlabProject } from './GitlabProjectManager.types';

export class GitlabProjectManagerData implements IGitlabProjectManagerData {
    project: null | GitlabProject = null;
}