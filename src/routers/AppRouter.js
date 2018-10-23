import React, { Fragment } from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import Header from "../components/Header";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import * as pathNames from "./pathNames";

const history = createHistory();

// A pathless route for header gives it access to location for active link styling
const AppRouter = () => (
  <Router history={history}>
    <Fragment>
      <Route component={Header} />
      <Switch>
        <Route exact path={pathNames.ROOT} component={LoginPage} />
        <Route path={pathNames.DASHBOARD} component={ExpenseDashboardPage} />
        <Route path={pathNames.ADD} component={AddExpensePage} />
        <Route path={`${pathNames.EDIT}/:id`} component={EditExpensePage} />
        <Route path={pathNames.HELP} component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Fragment>
  </Router>
);

export { history, AppRouter as default };
