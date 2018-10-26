import { createStore, combineReducers, applyMiddleware } from "redux";
import { locationReducer } from "./reducers_history";
import { history } from "./actions_history";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const store = createStore(combineReducers({
    location: locationReducer
}), composeWithDevTools(
    applyMiddleware(thunk)
));

history(store).register();