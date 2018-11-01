import database, { firebase } from "./firebase";
import store from "../store/configureStore";

import { history } from "../routers/AppRouter";
import { startListening, stopListening } from "../actions/expenses";
import { login, logout } from "../actions/auth";
import { setLoading, setError } from "../actions/status";
import { setOnline } from "../actions/online";
import { ROOT, DASHBOARD } from "../routers/pathNames";

export const onlineListener = () =>
  database
    .ref(".info/connected")
    .on("value", snap => store.dispatch(setOnline(snap.val())));

export const authListener = () =>
  firebase.auth().onAuthStateChanged(
    user => {
      if (user) {
        store.dispatch(login(user.uid));

        // If offline, load from localStorage?
        store.dispatch(setLoading(true));
        store.dispatch(startListening(user.uid)).then(val => {
          store.dispatch(setLoading(false));
        });

        if (history.location.pathname === ROOT) history.push(DASHBOARD);
      } else {
        const { uid } = store.getState().session.auth;
        if (uid) {
          store.dispatch(logout());
          stopListening(uid);
        }

        if (history.location.pathname !== ROOT) history.push(ROOT);
      }
    },
    error => {
      store.dispatch(
        setError(
          "Ouch, authentication didn't work. Please check your connection and try again."
        )
      );
      console.error(error);
    }
  );
