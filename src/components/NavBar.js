import React from "react";
import { NavLink } from "react-router-dom";

import * as pathNames from "../routers/pathNames";

const NavBar = () => (
  <nav>
    <NavLink to={pathNames.DASHBOARD} activeClassName="is-active">
      Dashboard
    </NavLink>
    <NavLink to={pathNames.ADD} activeClassName="is-active">
      Add expense
    </NavLink>
  </nav>
);

export default NavBar;
