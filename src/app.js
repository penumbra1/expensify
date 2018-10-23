import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import "./styles/styles.scss";

import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { firebase } from "./firebase/firebase";
import { startLoadExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import { ROOT, DASHBOARD } from "./routers/pathNames";

const store = configureStore();

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const root = document.getElementById("app");

ReactDOM.render(<p>Loading...</p>, root);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(app, root);
    hasRendered = true;
  }
};

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));

    // User just logged in - fetch their expenses
    // and redirect to dashboard, if necessary
    store
      .dispatch(startLoadExpenses())
      .then(() => {
        renderApp();
        if (history.location.pathname === ROOT) history.push(DASHBOARD);
      })
      .catch(e => {
        console.log(e);
        ReactDOM.render(
          <p>
            Ouch, failed to load expenses from the database. Please check your
            connection and try again.
          </p>,
          root
        );
      });
  } else {
    store.dispatch(logout());
    renderApp();
    if (history.location.pathname !== ROOT) history.push(ROOT);
  }
});
