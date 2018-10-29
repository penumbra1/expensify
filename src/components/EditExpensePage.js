import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import NotFoundPage from "./NotFoundPage";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";
import { DASHBOARD } from "../routers/pathNames";

export class EditExpensePage extends Component {
  // "Cache" the expense in state to avoid a form rerender
  // and a flash of 404 page if the expense is removed
  state = { expense: this.props.expense };

  goBack = () => this.props.history.push(DASHBOARD);

  onSubmit = updates => {
    this.props
      .startEditExpense(this.props.match.params.id, updates)
      .then(this.goBack);
  };

  onRemove = () => {
    this.setState({ justRemoved: true });
    this.props.startRemoveExpense(this.props.match.params.id).then(this.goBack);
  };

  render() {
    // Redirect to 404 page only if the id wasn't found
    if (!this.state.expense) {
      return <NotFoundPage history={this.props.history} />;
    }
    return (
      <Fragment>
        <ExpenseForm expense={this.state.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onRemove}>Remove</button>
        <button onClick={this.goBack}>Cancel</button>
      </Fragment>
    );
  }
}

export const mapStateToProps = (state, props) => ({
  expense: state.expenses.byId[props.match.params.id]
});

const mapDispatchToProps = {
  startEditExpense,
  startRemoveExpense
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
