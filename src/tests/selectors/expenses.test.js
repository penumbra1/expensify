import selectExpenses from "../../selectors/expenses";
import moment from "moment";
import expenses from "../fixtures/expenses";

test("should not sort or filter if no parameters are specified", () => {
  const state = selectExpenses(expenses, {});
  expect(state).toEqual(expenses);
});

// I use filter and sort to test the selector that also uses them internally.
// Not sure if this is a good idea: if a bug is caused by incorrect usage of
// filter or sort, tests that use these very same functions won't detect anything.
// On the other hand, I can change mock data without hardcoding it over and over.

test("should filter by text value", () => {
  const text = "car";
  const filters = {
    text,
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);

  // Should receive expenses filtered by description,
  // ordered by date (in UNIX time)
  expect(result).toEqual([expenses[2]]);
});

test("should filter by start date", () => {
  const startDate = moment(0);
  const filters = {
    text: "",
    sortBy: "date",
    startDate,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);

  // Should receive expenses created on startDate or later,
  // ordered by date (in UNIX time)
  expect(result).toEqual([expenses[2], expenses[0]]);
});

test("should filter by end date", () => {
  const endDate = moment(0).add(2, "days");
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate
  };
  const result = selectExpenses(expenses, filters);

  // Should receive expenses created on endDate or before,
  // ordered by date (in UNIX time)
  expect(result).toEqual([expenses[0], expenses[1]]);
});

test("should sort by date", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);

  // Should receive expenses ordered by date (in UNIX time)
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test("should sort by amount", () => {
  const filters = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  const result = selectExpenses(expenses, filters);

  // Should receive expenses ordered by amount
  expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});
