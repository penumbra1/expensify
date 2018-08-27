import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { addExpense } from "../actions/expenses";

// Export the unconnected component as well for testing
// independently from Redux and dispatch (with spies instead of prop methods)
export class AddExpensePage extends Component {
  onSubmit = expense => {
    this.props.addExpense(expense);
    this.props.history.push("/");
  };

  render() {
    return (
      <Fragment>
        <h1>Add an expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </Fragment>
    );
  }
}

// Map dispatch to an addExpense prop
// to abstract it away from the component
const mapDispatchToProps = { addExpense };

export default connect(
  undefined,
  mapDispatchToProps
)(AddExpensePage);
