import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";
import { DASHBOARD } from "../../routers/pathNames";

let startAddExpense;
let history;
let wrapper;

beforeEach(() => {
  // Spies in place of actual function calls to be checked
  startAddExpense = jest.fn();
  history = { push: jest.fn() };

  wrapper = shallow(
    <AddExpensePage startAddExpense={startAddExpense} history={history} />
  );
});

test("should render AddExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should call startAddExpense and redirect to dashboard on valid form submission", () => {
  const expense = expenses[1];
  wrapper.find("ExpenseForm").prop("onSubmit")(expense);

  expect(history.push).toHaveBeenLastCalledWith(DASHBOARD);
  expect(startAddExpense).toHaveBeenLastCalledWith(expense);
});
