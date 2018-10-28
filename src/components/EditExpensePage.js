import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import NotFoundPage from "./NotFoundPage";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";
import { DASHBOARD } from "../routers/pathNames";

// Export the unconnected component as well for testing
// independently from Redux and dispatch (with spies instead of prop methods)
export class EditExpensePage extends Component {
  goBack = () => this.props.history.push(DASHBOARD);

  onSubmit = updates => {
    this.props
      .startEditExpense(this.props.expense.id, updates)
      .then(this.goBack);
  };

  onRemove = () => {
    this.props.startRemoveExpense(this.props.expense.id).then(this.goBack);
  };

  render() {
    // Redirect to 404 page if no expense was found (URL or id incorrect)
    if (!this.props.expense) {
      return <NotFoundPage history={this.props.history} />;
    }
    return (
      <Fragment>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onRemove}>Remove</button>
        <button onClick={this.goBack}>Cancel</button>
      </Fragment>
    );
  }
}

export const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = {
  startEditExpense,
  startRemoveExpense
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
