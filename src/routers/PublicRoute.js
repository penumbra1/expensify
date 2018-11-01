import React from "react";
import { Redirect, Route } from "react-router-dom";
import connect from "react-redux/lib/connect/connect";

import { DASHBOARD } from "./pathNames";

const PublicRoute = ({ isAuthenticated, ...props }) =>
  isAuthenticated ? <Redirect to={DASHBOARD} /> : <Route {...props} />;

const mapStateToProps = ({ session }) => ({
  isAuthenticated: !!session.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);
