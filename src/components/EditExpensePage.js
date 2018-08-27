import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import NotFoundPage from "../components/NotFoundPage";
import { editExpense, removeExpense } from "../actions/expenses";

// Export the unconnected component as well for testing
// independently from Redux and dispatch (with spies instead of prop methods)
export class EditExpensePage extends Component {
  onSubmit = updates => {
    this.props.editExpense(this.props.expense.id, updates);
    this.props.history.push("/");
  };

  onRemove = () => {
    this.props.removeExpense(this.props.expense);
    this.props.history.push("/");
  };

  render() {
    // Redirect to 404 page if no expense was found (URL or id incorrect)
    if (!this.props.expense) {
      return <NotFoundPage />;
    }
    return (
      <Fragment>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onRemove}>Remove</button>
      </Fragment>
    );
  }
}

export const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = {
  editExpense,
  removeExpense
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
