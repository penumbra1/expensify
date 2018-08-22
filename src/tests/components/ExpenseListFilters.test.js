import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, filtersWithData } from "../fixtures/filters";
import moment from "moment";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";

// Constants from react-dates that DateRangePicker passes as arguments
// to onFocusChange
import { START_DATE, END_DATE } from "react-dates/constants";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();

  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("should render ExpenseListFilters with empty data correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with non-empty data correctly", () => {
  wrapper.setProps({ filters: filtersWithData });
  expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
  const value = "new text";
  wrapper.find("input").simulate("change", {
    target: {
      value
    }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("should sort by date", () => {
  // Set filter to amount to simulate actual change
  wrapper.setProps({ sortBy: "amount" });

  const value = "date";
  wrapper.find("select").simulate("change", {
    target: { value }
  });

  expect(sortByDate).toHaveBeenCalled();
});

test("should sort by amount", () => {
  const value = "amount";
  wrapper.find("select").simulate("change", {
    target: { value }
  });

  expect(sortByAmount).toHaveBeenCalled();
});

test("should handle date change", () => {
  // Change to filters with values for dates
  wrapper.setProps({ filters: filtersWithData });
  const startDate = moment().add(1, "years");
  const endDate = moment().add(3, "years");
  wrapper.find(DateRangePicker).prop("onDatesChange")({ startDate, endDate });
  expect(setStartDate).toHaveBeenCalledWith(startDate);
  expect(setEndDate).toHaveBeenCalledWith(endDate);
});

test("should handle focus change", () => {
  wrapper.find(DateRangePicker).prop("onFocusChange")(START_DATE);
  expect(wrapper.state("calendarFocused")).toBe(START_DATE);
});
