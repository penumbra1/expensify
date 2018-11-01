import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import NavBar from "../components/NavBar";
import { startLogout } from "../actions/auth";
import { ROOT } from "./pathNames";

const PrivateRoute = ({ isAuthenticated, ...props }) =>
  isAuthenticated ? (
    <Fragment>
      <NavBar />
      <button onClick={props.startLogout}>Log out</button>
      <Route {...props} />
    </Fragment>
  ) : (
    <Redirect to={ROOT} />
  );

const mapStateToProps = ({ session }) => ({
  isAuthenticated: !!session.auth.uid
});

const mapDispatchToProps = { startLogout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
