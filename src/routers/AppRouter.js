import React, { Fragment } from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Header from "../components/Header";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import * as pathNames from "./pathNames";

const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <Fragment>
      <Header />
      <main>
        <Switch>
          <PublicRoute exact path={pathNames.ROOT} component={LoginPage} />
          <PrivateRoute
            path={pathNames.DASHBOARD}
            component={ExpenseDashboardPage}
          />
          <PrivateRoute path={pathNames.ADD} component={AddExpensePage} />
          <PrivateRoute
            path={`${pathNames.EDIT}/:id`}
            component={EditExpensePage}
          />
          <Route path={pathNames.HELP} component={HelpPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </Fragment>
  </Router>
);

export { history, AppRouter as default };
