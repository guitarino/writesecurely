import { push } from "./actions_history";
import { urls } from "../data/urls";

export const SET_PASSWORD = "SET_PASSWORD";

export function setPassword(password) {
    return function(dispatch) {
        dispatch({
            type: SET_PASSWORD,
            password
        });
        dispatch(push(urls.diary_selection));
    }
}