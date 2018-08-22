import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let expense, history, editExpense, removeExpense, wrapper;

beforeEach(() => {
  expense = expenses[0];
  history = { push: jest.fn() };

  // Spies
  removeExpense = jest.fn();
  editExpense = jest.fn();

  wrapper = shallow(
    <EditExpensePage
      expense={expense}
      removeExpense={removeExpense}
      editExpense={editExpense}
      history={history}
    />
  );
});

test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should call editExpense and redirect to / on valid data submission", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expense);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
});

test("should call removeExpense and redirect to / on remove button click", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(removeExpense).toHaveBeenLastCalledWith(expense);
});
