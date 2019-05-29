import { GitlabAuthenticationData as IGitlabAuthenticationData } from './GitlabAuthenticationData.types';

export class GitlabAuthenticationData implements IGitlabAuthenticationData {
    data: IGitlabAuthenticationData['data'];
    
    get headers() {
        return this.data.token
            ? { authorization: `Bearer ${this.data.token}` }
            : {};
    }
}