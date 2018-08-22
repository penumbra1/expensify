import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortByAmount,
  sortByDate
} from "../../actions/filters";
import moment from "moment";

test("should generate a set start date action object", () => {
  const startDate = moment();
  const action = setStartDate(startDate);
  expect(action).toEqual({
    type: "SET_START_DATE",
    date: startDate
  });
});

test("should generate a set end date action object", () => {
  const endDate = moment();
  const action = setEndDate(endDate);
  expect(action).toEqual({
    type: "SET_END_DATE",
    date: endDate
  });
});

test("should generate a set text filter action object from a given text", () => {
  const text = "water";
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: "SET_TEXT",
    text
  });
});

test("should generate a set text filter action object from no text", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT",
    text: ""
  });
});

test("should generate a sort by amount action object", () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: "SORT_BY_AMOUNT"
  });
});

test("should generate a sort by date action object", () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: "SORT_BY_DATE"
  });
});
