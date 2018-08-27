import React, { Fragment } from "react";
import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";

const ExpenseDashboardPage = () => (
  <Fragment>
    <ExpenseListFilters />
    <ExpenseList />
  </Fragment>
);

export default ExpenseDashboardPage;
