import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import "./styles/styles.scss";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import "./firebase/firebase";
import { startLoadExpenses } from "./actions/expenses";

const store = configureStore();

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const root = document.getElementById("app");

ReactDOM.render(<p>Loading...</p>, root);

store.dispatch(startLoadExpenses()).then(() => {
  ReactDOM.render(app, root);
});
