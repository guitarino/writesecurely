import { gitlabApiUri } from "Config";
import { fetchGitlab } from "./actions_gitlab";

export const FETCH_DIARIES = `FETCH_DIARIES`;
export const FETCH_DIARIES_LOADING = `${FETCH_DIARIES}_LOADING`;
export const FETCH_DIARIES_SUCCESS = `${FETCH_DIARIES}_SUCCESS`;
export const FETCH_DIARIES_ERROR = `${FETCH_DIARIES}_ERROR`;

export function fetchDiaries() {
    return fetchGitlab(
        FETCH_DIARIES,
        [
            () => ({
                method: 'GET',
                url: `${gitlabApiUri}/projects?owned=true&search=my-great-project`
            }),
            () => ({
                
            })
        ]
    );
}