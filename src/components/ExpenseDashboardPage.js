import React from "react";

import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpensesSummary from "./ExpensesSummary";
import Loader from "./Loader";

export const ExpenseDashboardPage = () => (
  <Loader>
    <ExpenseListFilters />
    <ExpensesSummary />
    <ExpenseList />
  </Loader>
);

export default ExpenseDashboardPage;
