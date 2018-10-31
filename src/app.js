import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import "./styles/styles.scss";

import configureStore from "./store/configureStore";
import AppRouter, { history } from "./routers/AppRouter";
import database, { firebase } from "./firebase/firebase";
import { listen } from "./actions/expenses";
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

// Connection change listener
database.ref(".info/connected").on("value", snap => {
  if (!snap.val()) {
    store.dispatch(setOnline(false));
  } else {
    store.dispatch(setOnline(true));
  }
});

// Render the app once on first auth state change
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(app, root);
    hasRendered = true;
  }
};

firebase.auth().onAuthStateChanged(
  user => {
    renderApp();

    if (user) {
      store.dispatch(login(user.uid));

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
  error => {
    store.dispatch(
      setError(
        "Failed to log you in. Please check your connection and try again."
      )
    );
    console.error(error);
  }
);
