import { createStore, combineReducers, applyMiddleware } from "redux";
import { locationReducer } from "./reducers_history";
import { history } from "./actions_history";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { credentialsReducer } from "./reducers_credentials";

export const store = createStore(combineReducers({
    credentials: credentialsReducer,
    location: locationReducer
}), composeWithDevTools(
    applyMiddleware(thunk)
));

history(store).register();