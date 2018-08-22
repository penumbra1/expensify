import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import ExpenseForm from "../../components/ExpenseForm";
import { SingleDatePicker } from "react-dates";
import expenses from "../fixtures/expenses";

test("should render ExpenseForm with no data", () => {
  const wrapper = shallow(<ExpenseForm />);
  const outsideRange = wrapper.find(SingleDatePicker).prop("isOutsideRange");
  expect(outsideRange()).toBe(false);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm with given data", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  const outsideRange = wrapper.find(SingleDatePicker).prop("isOutsideRange");
  expect(outsideRange()).toBe(false);
  expect(wrapper).toMatchSnapshot();
});

test("should render an error if required data is missing on submit", () => {
  const wrapper = shallow(<ExpenseForm />);
  // Mock the event object using an object with preventDefault property
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "new description";
  // Simulate change on description field and mock the event object
  wrapper
    .find("input")
    .at(0)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("description")).toBe(value);
});

test("should set note on text area change", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "new note";
  wrapper.find("textarea").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("note")).toBe(value);
});

test("should set amount if input is valid", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "22.45";
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("amount")).toBe(value);
});

test("should not set amount if input is invalid", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "22.455";
  const oldAmount = wrapper.state("amount");
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("amount")).toBe(oldAmount);
});

test("should call onSubmit with correct data on valid form submission", () => {
  const onSubmitSpy = jest.fn();
  const expense = expenses[0];
  const wrapper = shallow(
    <ExpenseForm expense={expense} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expense.description,
    amount: expense.amount,
    note: expense.note,
    createdAt: expense.createdAt
  });
  expect(wrapper.state("error")).toBe("");
});

test("should set new date on date change", () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});

test("should do nothing if date is discarded", () => {
  const wrapper = shallow(<ExpenseForm />);
  const date = wrapper.state("createdAt");
  wrapper.find(SingleDatePicker).prop("onDateChange")();
  expect(wrapper.state("createdAt")).toEqual(date);
});

test("should set calendarFocused on focus", () => {
  const wrapper = shallow(<ExpenseForm />);
  // Using imported component reference rather than string in find
  // as the component is rendered as a styled component
  // and its tag changes to withStyles(SingleDatePicker) (see snapshot)
  wrapper.find(SingleDatePicker).prop("onFocusChange")({ focused: true });
  expect(wrapper.state("calendarFocused")).toBe(true);
});
