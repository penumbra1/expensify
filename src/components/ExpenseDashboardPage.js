import React from "react";
import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpensesSummary from "./ExpensesSummary";
import Loader from "./Loader";

const ExpenseDashboardPage = () => (
  <Loader
    onClick={() => {
      console.log("reload");
    }}
    buttonText="Reload"
  >
    <ExpenseListFilters />
    <ExpensesSummary />
    <ExpenseList />
  </Loader>
);

export default ExpenseDashboardPage;
