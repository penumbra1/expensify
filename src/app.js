import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import "./styles/styles.scss";

import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter, sortByAmount } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";

const store = configureStore();

store.dispatch(
  addExpense({
    description: "Water bill",
    amount: 300,
    createdAt: 1000
  })
);

store.dispatch(
  addExpense({
    description: "Gas bill",
    amount: 200,
    createdAt: 3000
  })
);

store.dispatch(
  addExpense({
    description: "Rent",
    amount: 500,
    createdAt: 2000
  })
);

// store.dispatch(setTextFilter("water"));
// store.dispatch(sortByAmount());

const state = store.getState();
console.log(getVisibleExpenses(state.expenses, state.filters));

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(app, document.getElementById("app"));
