import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set up default state", () => {
  // Check if default state is correct on initial reducer setup
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const id = expenses[1].id;
  const action = { type: "REMOVE_EXPENSE", id };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses.filter(e => e.id !== id));
});

test("should remove not expenses if id is not found", () => {
  const id = "-1";
  const action = { type: "REMOVE_EXPENSE", id };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

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
  // Should return array with added expense, sorted by date
  expect(state).toEqual([...expenses, expense]);
});

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
  expect(state[1].note).toBe(note);
});

test("should not edit expenses if id is not found", () => {
  const note = "new";
  const action = {
    type: "EDIT_EXPENSE",
    id: "-1",
    updates: {
      note
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
