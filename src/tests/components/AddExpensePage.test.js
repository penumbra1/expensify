import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";

let addExpense, history, wrapper;

beforeEach(() => {
  // Spies in place of actual function calls to be checked
  addExpense = jest.fn();
  history = { push: jest.fn() };

  wrapper = shallow(
    <AddExpensePage addExpense={addExpense} history={history} />
  );
});

test("should render AddExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should call addExpense and redirect to / on valid form submission", () => {
  const expense = expenses[1];
  wrapper.find("ExpenseForm").prop("onSubmit")(expense);

  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(addExpense).toHaveBeenLastCalledWith(expense);
});
