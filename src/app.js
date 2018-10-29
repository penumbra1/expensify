import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import "./styles/styles.scss";

import configureStore from "./store/configureStore";
import AppRouter, { history } from "./routers/AppRouter";
import database, { firebase } from "./firebase/firebase";
import { startLoadExpenses, listen } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import { setOnline, setError } from "./actions/status";
import { ROOT, DASHBOARD } from "./routers/pathNames";

const store = configureStore();

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const root = document.getElementById("app");

// Avoid unnecessary rerenders on first load
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(app, root);
    hasRendered = true;
  }
};

// Connection change listener
database.ref(".info/connected").on("value", snap => {
  if (!snap.val()) {
    // No connection on the client side
    store.dispatch(setOnline(false));
  } else {
    store.dispatch(setOnline(true));
    // TODO: Reload expenses if connection is reestablished and the user is logged in
  }
});

firebase.auth().onAuthStateChanged(
  user => {
    // Render here to avoid flash of login page on first load
    renderApp();

    if (user) {
      store.dispatch(login(user.uid));

      // store.dispatch(startLoadExpenses());
      store.dispatch(listen());

      if (history.location.pathname === ROOT) history.push(DASHBOARD);
    } else {
      // Turn off the user's event listeners and register logout in the state
      const { uid } = store.getState().auth;
      database.ref(`users/${uid}/expenses`).off();

      store.dispatch(logout());

      if (history.location.pathname !== ROOT) history.push(ROOT);
    }
  },
  error => store.dispatch(setError("Please get online to log in"))
);

// /// EVENT LISTENERS
// const setupListeners = () => {
//   database.ref(`users/${uid}/expenses`).on("child_added", child => {
//     store.dispatch(addExpense());
//   });
// };
