import { HISTORY_LOCATION_CHANGE } from "./actions_history";

export function locationReducer(location, action) {
    if (action.type === HISTORY_LOCATION_CHANGE) {
        return action.location;
    }
    return location;
}