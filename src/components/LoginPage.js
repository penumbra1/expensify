import React from "react";
import { startLogin } from "../firebase/auth";

export const LoginPage = () => <button onClick={startLogin}>Log in</button>;

export default LoginPage;
