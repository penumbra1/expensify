import React from "react";
import { connect } from "react-redux";

import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

export const ExpenseList = ({ expenses, loading }) =>
  expenses.length === 0 ? (
    <p>No expenses</p>
  ) : (
    expenses.map(expense => <ExpenseListItem {...expense} key={expense.id} />)
  );

export const mapStateToProps = ({ session }) => ({
  expenses: selectExpenses(session.expenses, session.filters),
  loading: session.status.loading
});

export default connect(mapStateToProps)(ExpenseList);
