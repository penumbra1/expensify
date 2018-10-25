import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

export const ExpenseList = ({ expenses }) =>
  expenses.length === 0 ? (
    <p>No expenses</p>
  ) : (
    expenses.map(expense => <ExpenseListItem {...expense} key={expense.id} />)
  );

export const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList);
