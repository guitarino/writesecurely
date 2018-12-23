// import { gitlabApiUri } from "Config";
// import { fetchGitlab } from "./actions_gitlab";
// import { fetchEncryptedFile, saveEncryptedFile } from "../api/gitlab";

// export const FETCH_DIARIES = `FETCH_DIARIES`;
// export const FETCH_DIARIES_LOADING = `${FETCH_DIARIES}_LOADING`;
// export const FETCH_DIARIES_SUCCESS = `${FETCH_DIARIES}_SUCCESS`;
// export const FETCH_DIARIES_ERROR = `${FETCH_DIARIES}_ERROR`;

// const initialDiaries = {
//     diaries: []
// };

// export function fetchDiaries() {
//     return (dispatch) => {
//         dispatch({
//             type: FETCH_DIARIES_LOADING
//         });
//         fetchEncryptedFile("diaries.json", "JSON")
//             .then(() => {
//                 dispatch({
//                     type: FETCH_DIARIES_SUCCESS,
//                     payload
//                 });
//             })
//             .catch(() => {

//             })
//     }
//     return fetchGitlab(
//         FETCH_DIARIES,
//         (project) => ({
//             method: 'GET',
//             url: `${gitlabApiUri}/projects/${project}/repository/files/diaries.json/raw?ref=master`
//         })
//     );
// }