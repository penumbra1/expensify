import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import * as pathNames from "./pathNames";

const RouteSwitcher = () => (
  <Switch>
    <PublicRoute exact path={pathNames.ROOT} component={LoginPage} />
    <PrivateRoute path={pathNames.DASHBOARD} component={ExpenseDashboardPage} />
    <PrivateRoute path={pathNames.ADD} component={AddExpensePage} />
    <PrivateRoute path={`${pathNames.EDIT}/:id`} component={EditExpensePage} />
    <Route path={pathNames.HELP} component={HelpPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default RouteSwitcher;
