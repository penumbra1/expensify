import React from "react";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      note: props.expense ? props.expense.note : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ""
    };
  }

  onDescriptionChange = e => {
    const newDescription = e.target.value;
    this.setState(() => ({ description: newDescription }));
  };

  onNoteChange = e => {
    const newNote = e.target.value;
    this.setState(() => ({ note: newNote }));
  };

  onAmountChange = e => {
    const newAmount = e.target.value;
    if (!newAmount || newAmount.match(/^\d+(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount: newAmount }));
    }
  };

  onDateChange = newDate => {
    if (newDate) {
      this.setState(() => ({ createdAt: newDate }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onFormSubmit = e => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      // Error message
      this.setState(() => ({
        error: "Please provide a description and an amount"
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="number"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            id="datePicker"
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          />
          <button>
            {this.props.expense ? "Update expense" : "Add expense"}
          </button>
        </form>
      </div>
    );
  }
}
