import { firebase, googleAuthProvider } from "../firebase/firebase";

export const login = uid => ({ type: "LOGIN", uid });

export const startLogin = () => dispatch =>
  firebase.auth().signInWithPopup(googleAuthProvider);

export const logout = () => ({ type: "LOGOUT" });

export const startLogout = () => dispatch => firebase.auth().signOut();
