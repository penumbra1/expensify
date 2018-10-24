import { firebase, googleAuthProvider } from "./firebase";

const startLogin = () => firebase.auth().signInWithPopup(googleAuthProvider);

const startLogout = () => firebase.auth().signOut();

export { startLogin, startLogout };
