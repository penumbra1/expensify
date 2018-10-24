import React from "react";
import { NavLink } from "react-router-dom";

import { startLogout } from "../firebase/auth";
import { HELP } from "../routers/pathNames";

export const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to={HELP} activeClassName="is-active">
      Help
    </NavLink>
  </header>
);

export default Header;
