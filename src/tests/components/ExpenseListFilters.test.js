import React from "react";
import { shallow } from "enzyme";
import {
  ExpenseListFilters,
  mapStateToProps
} from "../../components/ExpenseListFilters";
import { filters, filtersWithData } from "../fixtures/filters";
import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";

// A constant from react-dates that DateRangePicker passes as one of
// the arguments to onFocusChange
import { START_DATE } from "react-dates/constants";

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
  const outsideRange = wrapper.find(DateRangePicker).prop("isOutsideRange");
  expect(outsideRange()).toBe(false);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with non-empty data correctly", () => {
  wrapper.setProps({ filters: filtersWithData });
  const outsideRange = wrapper.find(DateRangePicker).prop("isOutsideRange");
  expect(outsideRange()).toBe(false);
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
  expect(wrapper.state("calendarFocused")).toBe(null);

  wrapper.find(DateRangePicker).prop("onFocusChange")(START_DATE);

  expect(wrapper.state("calendarFocused")).toBe(START_DATE);
});

test("should map state to props correctly and pass them down", () => {
  const newProps = mapStateToProps({ filters: filtersWithData });

  wrapper.setProps(newProps);

  expect(wrapper).toMatchSnapshot();
});
