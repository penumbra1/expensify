import React, { Fragment } from "react";
import { startLogin } from "../firebase/auth";
import Loader from "./Loader";

export const LoginPage = () => (
  <Fragment>
    <Loader />
    <button onClick={startLogin}>Log in</button>
  </Fragment>
);

export default LoginPage;
