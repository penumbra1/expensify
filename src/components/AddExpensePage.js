import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../actions/expenses";
import { setError, clearError } from "../actions/status";
import { DASHBOARD } from "../routers/pathNames";
import Loader from "./Loader";

// Export the unconnected component as well for testing
// independently from Redux and dispatch (with spies instead of prop methods)
export class AddExpensePage extends Component {
  onSubmit = expense => {
    this.props
      .startAddExpense(expense)
      .then(() => this.props.history.push(DASHBOARD))
      .catch(e => console.log(e));
  };

  onBack = () => {
    this.props.clearError();
    this.props.history.goBack();
  };

  render() {
    return (
      <Loader buttonText="Go back" onClick={this.onBack}>
        <h1>Add an expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </Loader>
    );
  }
}

// Map dispatch to an addExpense prop
// to abstract it away from the component
const mapDispatchToProps = { startAddExpense, setError, clearError };

export default connect(
  undefined,
  mapDispatchToProps
)(AddExpensePage);
