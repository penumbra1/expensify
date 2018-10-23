import React from "react";
import { shallow } from "enzyme";
import {
  EditExpensePage,
  mapStateToProps
} from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";
import { DASHBOARD } from "../../routers/pathNames";

let expense;
let history;
let startEditExpense;
let startRemoveExpense;
let wrapper;

beforeEach(() => {
  expense = expenses[0];
  history = { push: jest.fn() };

  // Spies
  startRemoveExpense = jest.fn();
  startEditExpense = jest.fn();

  wrapper = shallow(
    <EditExpensePage
      {...{ expense, startEditExpense, startRemoveExpense, history }}
    />
  );
});

test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should redirect to NotFoundPage if expense doesn't exist", () => {
  const newProps = { expense: undefined };
  wrapper.setProps(newProps);

  expect(wrapper.find("NotFoundPage")).toHaveLength(1);
});

test("should receive correct expense prop from state and pass it down", () => {
  // Component doesn't know which expense to edit yet
  // but receives the id from router
  const expenseToEdit = expenses[2];
  const mockProps = { match: { params: { id: expenseToEdit.id } } };
  const mockState = { expenses };

  const newProps = mapStateToProps(mockState, mockProps);
  wrapper.setProps(newProps);

  expect(wrapper.find("ExpenseForm").prop("expense")).toEqual(expenseToEdit);
});

test("should call startEditExpense and redirect to dashboard on valid data submission", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expense);
  expect(history.push).toHaveBeenLastCalledWith(DASHBOARD);
  expect(startEditExpense).toHaveBeenLastCalledWith(expense.id, expense);
});

test("should call startRemoveExpense and redirect to dashboard on remove button click", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenLastCalledWith(DASHBOARD);
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expense.id);
});
