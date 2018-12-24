import { createStore, combineReducers, applyMiddleware } from "redux";
import { locationReducer } from "./reducers_history";
import { history } from "./actions_history";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { credentialsReducer } from "./reducers_credentials";
import { notebookReducer } from "./reducers_notebook";
import { hashReducer } from "./reducers_hash";

export const store = createStore(combineReducers({
    credentials: credentialsReducer,
    location: locationReducer,
    notebooks: notebookReducer,
    hash: hashReducer
}), composeWithDevTools(
    applyMiddleware(thunk)
));

history(store).register();