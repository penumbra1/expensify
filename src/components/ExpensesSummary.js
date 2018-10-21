import React, { Fragment } from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import getExpenseTotal from "../selectors/expenses-total";

export const ExpensesSummary = ({ expenseCount, expenseTotal }) => (
  <Fragment>
    {expenseCount > 0 && (
      <h2>
        {`Viewing ${expenseCount} expense${
          expenseCount === 1 ? "" : "s"
        } totalling ${numeral(expenseTotal / 100).format("$0,0.00")}`}
      </h2>
    )}
  </Fragment>
);

export const mapStateToProps = state => {
  const expenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: expenses.length,
    expenseTotal: getExpenseTotal(expenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
