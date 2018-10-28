import { firebase, googleAuthProvider } from "../firebase/firebase";
import { setError, clearErrors } from "./status";

export const login = uid => ({ type: "LOGIN", uid });

export const startLogin = () => dispatch => {
  // Clear errors from previous logins
  dispatch(clearErrors);

  return firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .catch(error => {
      dispatch(setError("Failed to sign you in, please try again"));
      console.error(error);
    });
};

export const logout = () => ({ type: "LOGOUT" });

export const startLogout = () => firebase.auth().signOut();
