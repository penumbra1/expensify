import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { startLogout } from "../actions/auth";
import * as pathNames from "../routers/pathNames";

export const Header = props => (
  <header>
    <h1>Expensify</h1>
    <NavLink to={pathNames.DASHBOARD} activeClassName="is-active">
      Dashboard
    </NavLink>
    <NavLink to={pathNames.ADD} activeClassName="is-active">
      Add
    </NavLink>
    <NavLink to={pathNames.HELP} activeClassName="is-active">
      Help
    </NavLink>
    <button onClick={props.startLogout}>Log out</button>
  </header>
);

const mapDispatchToProps = { startLogout };

export default connect(
  undefined,
  mapDispatchToProps
)(Header);
