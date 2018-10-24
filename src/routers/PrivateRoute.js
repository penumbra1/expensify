import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import NavBar from "../components/NavBar";
import { startLogout } from "../firebase/auth";
import { ROOT } from "./pathNames";

const PrivateRoute = ({ isAuthenticated, ...props }) =>
  isAuthenticated ? (
    <Fragment>
      <NavBar />
      <button onClick={startLogout}>Log out</button>
      <Route {...props} />
    </Fragment>
  ) : (
    <Redirect to={ROOT} />
  );

const mapStateToProps = state => ({ isAuthenticated: !!state.auth.uid });

export default connect(mapStateToProps)(PrivateRoute);
