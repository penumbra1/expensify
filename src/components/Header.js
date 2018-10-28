import React from "react";
import { NavLink } from "react-router-dom";

import { HELP, DASHBOARD } from "../routers/pathNames";
import Social from "./Social";
import OnlineIndicator from "./OnlineIndicator";

export const Header = () => (
  <header>
    <NavLink to={DASHBOARD}>
      <h1>Expensify</h1>
    </NavLink>
    <NavLink to={HELP} activeClassName="is-active">
      Help
    </NavLink>
    <Social />
    <OnlineIndicator />
  </header>
);

export default Header;
