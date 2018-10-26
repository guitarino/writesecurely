import { HISTORY_LOCATION_CHANGE, getCurrentLocation } from "./actions_history";

export function locationReducer(location = getCurrentLocation(), action) {
    if (action.type === HISTORY_LOCATION_CHANGE) {
        if (action.location.href !== location.href) {
            return action.location;
        }
        else {
            return location;
        }
    }
    return location;
}