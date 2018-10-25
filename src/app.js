import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import "./styles/styles.scss";

import configureStore from "./store/configureStore";
import AppRouter, { history } from "./routers/AppRouter";
import database, { firebase } from "./firebase/firebase";
import { startLoadExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import { ROOT, DASHBOARD } from "./routers/pathNames";
import { setError, clearError } from "./actions/status";

const store = configureStore();

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const root = document.getElementById("app");

// Avoid unnecessary renders on login change
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(app, root);
    hasRendered = true;
  }
};

database.ref(".info/connected").on("value", snap => {
  console.log("connchange", hasRendered, snap.val());
  // hasRendered to avoid a flash of error on first render
  if (hasRendered) {
    if (snap.val() !== true) {
      // No connection on the client side
      store.dispatch(
        setError(
          "Oops, failed to load your expenses. Please make sure you are online and logged in."
        )
      );
    } else store.dispatch(clearError());
  }
});

firebase.auth().onAuthStateChanged(user => {
  renderApp();

  if (store.getState().status.error) {
    return;
  }

  if (user) {
    store.dispatch(login(user.uid));
    // User just logged in - fetch their expenses
    // and redirect to dashboard, if necessary
    store
      .dispatch(startLoadExpenses())
      .then(() => {
        if (history.location.pathname === ROOT) history.push(DASHBOARD);
      })
      .catch(e => {
        console.log(e);
        // Firebase rejects if it's a server-side error (e.g. permissions our outage)
        store.dispatch(
          setError(
            "Ouch, connection was refused. Please check the status at https://statusgator.com/services/firebase"
          )
        );
      });
  } else {
    store.dispatch(logout());
    if (history.location.pathname !== ROOT) history.push(ROOT);
  }
});
