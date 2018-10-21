import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set up default state", () => {
  // Check if default state is correct on initial reducer setup
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

/*
 * LOADING EXPENSES
 */

test("should overwrite existing state when loading expenses", () => {
  const action = { type: "LOAD_EXPENSES", expenses: [expenses[0]] };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expenses[0]]);
});

/*
 * ADDING EXPENSES
 */

test("should add an expense with provided values", () => {
  const expense = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0,
    id: expect.any(String)
  };
  const action = {
    type: "ADD_EXPENSE",
    expense
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual([...expenses, expense]);
});

/*
 * EDITING EXPENSES
 */

test("should edit an expense", () => {
  const note = "new";
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[1].id,
    updates: {
      note
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state[1]).toEqual({ ...expenses[1], note });
});

test("should not edit expenses if id is not found", () => {
  const note = "new";
  const action = {
    type: "EDIT_EXPENSE",
    id: "inexistent",
    updates: {
      note
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

/*
 * REMOVING EXPENSES
 */

test("should remove expense by id", () => {
  const id = expenses[1].id;
  const action = { type: "REMOVE_EXPENSE", id };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should do nothing if expense with given id doesn't exist", () => {
  const id = "";
  const action = { type: "REMOVE_EXPENSE", id };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
