import getExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("should return 0 if expense array is empty", () => {
  const total = getExpensesTotal([]);
  expect(total).toBe(0);
});

test("should return 0 if no argument is passed", () => {
  const total = getExpensesTotal();
  expect(total).toBe(0);
});

test("should add up a single expense correctly", () => {
  const expense = expenses[0];
  const total = getExpensesTotal([expense]);
  expect(total).toBe(expense.amount);
});

test("should add multiple expenses correctly", () => {
  const total = getExpensesTotal(expenses);
  expect(total).toBe(
    expenses[0].amount + expenses[1].amount + expenses[2].amount
  );
});
