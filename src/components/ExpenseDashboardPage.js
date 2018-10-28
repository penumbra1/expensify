import React from "react";
import { connect } from "react-redux";

import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpensesSummary from "./ExpensesSummary";
import Loader from "./Loader";
import { clearErrors } from "../actions/status";
import { startLoadExpenses } from "../actions/expenses";

export const ExpenseDashboardPage = props => (
  <Loader
    onClick={() => {
      props.clearErrors();

      // Sync expenses once
      props.startLoadExpenses();

      // Alternative: undo last action in redux
    }}
    buttonText="Cancel & reload"
  >
    <ExpenseListFilters />
    <ExpensesSummary />
    <ExpenseList />
  </Loader>
);

const mapDispatchToProps = { clearErrors, startLoadExpenses };

export default connect(
  undefined,
  mapDispatchToProps
)(ExpenseDashboardPage);
