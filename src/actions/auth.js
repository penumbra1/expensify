import { firebase, googleAuthProvider } from "../firebase/firebase";
import { setError } from "./status";

export const login = uid => ({ type: "LOGIN", uid });

export const startLogin = () => dispatch => {
  // Clear the previous login error
  dispatch(setError(null));

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
