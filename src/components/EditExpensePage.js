import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

// Export the unconnected component as well for testing
// independently from Redux and dispatch (with spies instead of prop methods)
export class EditExpensePage extends React.Component {
  onSubmit = updates => {
    this.props.editExpense(this.props.expense.id, updates);
    this.props.history.push("/");
  };

  onRemove = () => {
    this.props.removeExpense(this.props.expense);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

// Passing own props as the 2nd argument allows to reinvoke mapDispatchToProps
// whenever the component receives new props (so that the correct expense is passed)
const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, updates) => dispatch(editExpense(id, updates)),
  removeExpense: expense => dispatch(removeExpense(expense))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
