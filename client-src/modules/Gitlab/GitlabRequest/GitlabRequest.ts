import { GitlabRequest as IGitlabRequest } from './GitlabRequest.types';
import { GitlabProjectManager, GitlabProject } from '../GitlabProject/GitlabProjectManager.types';
import { GitlabAuthenticationData } from '../GitlabAuthentication/GitlabAuthenticationData.types';
import { NoAuth } from '../../Errors/NoAuth';
import { GitlabConfiguration } from '../GitlabConfiguration/GitlabConfiguration.types';
import { GitlabProjectManagerData } from '../GitlabProject/GitlabProjectManagerData.types';
import { GitlabProjectNotExist } from '../../Errors/GitlabProjectNotExist';

export class GitlabRequest implements IGitlabRequest {
    private readonly authData: GitlabAuthenticationData;
    private readonly projectManager: GitlabProjectManager;
    private readonly config: GitlabConfiguration;
    private readonly projectData: GitlabProjectManagerData;
    private projectDataPromise: Promise<any>;

    constructor(authData: GitlabAuthenticationData, projectManager: GitlabProjectManager, config: GitlabConfiguration, projectData: GitlabProjectManagerData) {
        this.authData = authData;
        this.projectManager = projectManager;
        this.config = config;
        this.projectData = projectData;
    }

    async fetch(input: string, init?: RequestInit) {
        if (!this.authData.data.token) {
            throw new NoAuth();
        }

        if (!this.projectData.project) {
            if (!this.projectDataPromise) {
                this.projectDataPromise = this.createProjectDataPromise();
            }
            await this.projectDataPromise;
        }

        const url = this.prependUrl(input);
        const params = {
            ...(init || {}),
            headers: {
                ...this.authData.headers,
                ...(init && init.headers || {}),
            }
        };

        return await fetch(url, params);
    }

    private prependUrl(url: string): string {
        if (!this.projectData.project) {
            throw new GitlabProjectNotExist();
        }
        
        return `${this.config.apiUri}/projects/${this.projectData.project.id}/${url}`;
    }

    private async createProjectDataPromise() {
        try {
            this.projectData.project = await this.projectManager.getProject();
        }
        catch (e) {
            if (e instanceof GitlabProjectNotExist) {
                this.projectData.project = await this.projectManager.createProject();
            }
            else {
                throw e;
            }
        }
    }
}