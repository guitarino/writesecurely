import { GitlabAuthStorage as IGitlabAuthStorage } from "./GitlabAuthStorage.types";
import { dependency } from "../../../type/inject";

@dependency(IGitlabAuthStorage)
class GitlabAuthStorage implements IGitlabAuthStorage {
    getToken() {
        const storedToken = window.localStorage.getItem('token');
        return storedToken;
    }

    setToken(token: string) {
        window.localStorage.setItem('token', token);
    }

    clearToken() {
        window.localStorage.removeItem('token');
    }
}