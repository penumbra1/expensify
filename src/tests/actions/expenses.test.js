import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("should set up a remove action object", () => {
  const action = removeExpense({ id: "123" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123"
  });
});

test("should set up an edit action object", () => {
  const action = editExpense("123", { description: "new" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123",
    updates: {
      description: "new"
    }
  });
});

test("should set up an add action object with provided values", () => {
  const expenseData = {
    description: "coffee",
    note: "Flat white at the train station",
    amount: 300,
    createdAt: 1000
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      ...expenseData
    }
  });
});

test("should set up an add action object with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      note: "",
      amount: 0,
      createdAt: 0
    }
  });
});
