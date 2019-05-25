import { GitlabAuthenticationData as IGitlabAuthenticationData } from './GitlabAuthenticationData.types';

export class GitlabAuthenticationData implements IGitlabAuthenticationData {
    data: IGitlabAuthenticationData['data']
}