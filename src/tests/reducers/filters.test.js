import filtersReducer from "../../reducers/filters";
import moment from "moment";

test("should set up default filter values", () => {
  // Initial reducer set up dispatches an action of type @@INIT
  // Check if it sets up new state with default values if no state is provided
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("should set sortBy to amount", () => {
  const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" });
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
  const currentState = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  const state = filtersReducer(currentState, { type: "SORT_BY_DATE" });
  expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
  const text = "new";
  const state = filtersReducer(undefined, { type: "SET_TEXT", text });
  expect(state.text).toBe(text);
});

test("should set start date", () => {
  const date = moment(0);
  const state = filtersReducer(undefined, { type: "SET_START_DATE", date });

  expect(state.startDate).toBe(date);
});

test("should set end date", () => {
  const date = moment(0);
  const state = filtersReducer(undefined, { type: "SET_END_DATE", date });

  expect(state.endDate).toBe(date);
});
