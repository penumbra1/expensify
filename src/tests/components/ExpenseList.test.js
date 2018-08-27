import React from "react";
import { shallow } from "enzyme";
import { ExpenseList, mapStateToProps } from "../../components/ExpenseList";
import expenses from "../fixtures/expenses";
import { filtersWithData } from "../fixtures/filters";

test("should render ExpenseList with given expenses", () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);

  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseList with no expenses", () => {
  const wrapper = shallow(<ExpenseList expenses={[]} />);

  expect(wrapper).toMatchSnapshot();
});

test("should map state to props correctly", () => {
  const newProps = mapStateToProps({ expenses, filters: filtersWithData });
  const wrapper = shallow(<ExpenseList {...newProps} />);

  expect(wrapper).toMatchSnapshot();
});
