import { GitlabProjectManager as IGitlabProjectManager, GitlabProject } from './GitlabProjectManager.types';
import { GitlabAuthenticationData } from '../GitlabAuthentication/GitlabAuthenticationData.types';
import { GitlabConfiguration } from '../GitlabConfiguration/GitlabConfiguration.types';
import { GitlabProjectNotExist } from '../../Errors/GitlabProjectNotExist';
import { ResponseError } from '../../Errors/ResponseError';
import { NoAuth } from '../../Errors/NoAuth';

export class GitlabProjectManager implements IGitlabProjectManager {
    private readonly authData: GitlabAuthenticationData;
    private readonly config: GitlabConfiguration;

    constructor(authData: GitlabAuthenticationData, config: GitlabConfiguration) {
        this.authData = authData;
        this.config = config;
    }

    async getProject() {
        if (!this.authData.data.token) {
            throw new NoAuth();
        }
        const response = await fetch(`${this.config.apiUri}/projects?owned=true&search=write-securely-notebooks`, {
            headers: this.authData.headers
        });
        if (response.status === 200) {
            const result: Array<GitlabProject> = await response.json();
            if (result.length) {
                return result[0];
            } else {
                throw new GitlabProjectNotExist();
            }
            
        } else {
            throw new ResponseError(response.url, response.status, response.statusText);
        }
    }

    async createProject() {
        if (!this.authData.data.token) {
            throw new NoAuth();
        }
        const response = await fetch(`${this.config.apiUri}/projects`, {
            method: 'post',
            headers: {
                ...this.authData.headers,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: 'write-securely-notebooks',
                visibility: 'private'
            })
        })
        if (response.status === 201) {
            return await response.json();
        } else {
            throw new ResponseError(response.url, response.status, response.statusText);
        }
    }
}