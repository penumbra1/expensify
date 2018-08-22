import React from "react";
import { shallow } from "enzyme";
import {
  EditExpensePage,
  mapStateToProps
} from "../../components/EditExpensePage";
import { Redirect } from "react-router-dom";
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
