import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import "./styles/styles.scss";

import { onlineListener, authListener } from "./firebase/listeners";
import store from "./store/configureStore";
import AppRouter from "./routers/AppRouter";

class App extends React.Component {
  componentDidMount() {
    authListener();
    // Avoid false offline signal on initial firebase setup
    setTimeout(onlineListener, 1500);
  }

  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

const root = document.getElementById("app");

ReactDOM.render(<App />, root);
