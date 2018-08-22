import React from "react";
import { shallow } from "enzyme";
import ExpenseListItem from "../../components/ExpenseListItem";
import expenses from "../fixtures/expenses";

test("should render an ExpenseListItem with given data", () => {
  const expense = expenses[0];
  const wrapper = shallow(<ExpenseListItem {...expense} key={expense.id} />);
  expect(wrapper).toMatchSnapshot();
});
