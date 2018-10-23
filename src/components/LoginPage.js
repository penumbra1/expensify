import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = props => (
  <button onClick={props.startLogin}>Log in</button>
);

const mapDispatchToProps = { startLogin };

export default connect(
  undefined,
  mapDispatchToProps
)(LoginPage);
