// import { gitlabApiUri } from "Config";
// import { fetchGitlab } from "./actions_gitlab";
// import { fetchEncryptedFile, saveEncryptedFile } from "../api/gitlab";

// export const FETCH_NOTEBOOKS = `FETCH_NOTEBOOKS`;
// export const FETCH_NOTEBOOKS_LOADING = `${FETCH_NOTEBOOKS}_LOADING`;
// export const FETCH_NOTEBOOKS_SUCCESS = `${FETCH_NOTEBOOKS}_SUCCESS`;
// export const FETCH_NOTEBOOKS_ERROR = `${FETCH_NOTEBOOKS}_ERROR`;

// const initialNotebooks = {
//     notebooks: []
// };

// export function fetchNotebooks() {
//     return (dispatch) => {
//         dispatch({
//             type: FETCH_NOTEBOOKS_LOADING
//         });
//         fetchEncryptedFile("notebooks.json", "JSON")
//             .then(() => {
//                 dispatch({
//                     type: FETCH_NOTEBOOKS_SUCCESS,
//                     payload
//                 });
//             })
//             .catch(() => {

//             })
//     }
//     return fetchGitlab(
//         FETCH_NOTEBOOKS,
//         (project) => ({
//             method: 'GET',
//             url: `${gitlabApiUri}/projects/${project}/repository/files/notebooks.json/raw?ref=master`
//         })
//     );
// }