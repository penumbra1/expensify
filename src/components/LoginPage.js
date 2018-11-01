import React, { Fragment } from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";
import Loader from "./Loader";

export const LoginPage = props => (
  <Loader>
    <button onClick={props.startLogin}>Log in</button>
  </Loader>
);

const mapDispatchToProps = { startLogin };

export default connect(
  undefined,
  mapDispatchToProps
)(LoginPage);
