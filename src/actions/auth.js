import { firebase, googleAuthProvider } from "../firebase/firebase";
import { setError } from "./status";

export const login = uid => ({ type: "LOGIN", uid });

export const startLogin = () => dispatch =>
  firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .catch(error => {
      dispatch(setError("Failed to sign you in, please try again"));
      console.error(error);
    });

export const logout = () => ({ type: "LOGOUT" });

export const startLogout = () => dispatch =>
  firebase
    .auth()
    .signOut()
    .catch(error => {
      dispatch(setError("Failed to sign you out, please try again"));
      console.error(error);
    });
