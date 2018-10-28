import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../actions/expenses";
import { DASHBOARD } from "../routers/pathNames";

export class AddExpensePage extends Component {
  goBack = () => this.props.history.push(DASHBOARD);

  onSubmit = expense => {
    this.props.startAddExpense(expense).then(this.goBack);
  };

  render() {
    return (
      <Fragment>
        <h1>Add an expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
        <button onClick={this.goBack}>Cancel</button>
      </Fragment>
    );
  }
}

const mapDispatchToProps = { startAddExpense };

export default connect(
  undefined,
  mapDispatchToProps
)(AddExpensePage);
