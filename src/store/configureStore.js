import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const reducer = combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer
});

export default () => {
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
};
