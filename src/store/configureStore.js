import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers/root";

const composedEnhancers = composeWithDevTools(applyMiddleware(thunk));

// Load initial state from localStorage as argument here - or in auth listener?
const preloadedState = undefined;

const store = createStore(rootReducer, preloadedState, composedEnhancers);

export default store;
