import React from "react";
import { shallow } from "enzyme";
import {
  ExpensesSummary,
  mapStateToProps
} from "../../components/ExpensesSummary";
import getExpenseTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";
import { filtersWithData } from "../fixtures/filters";

test("should render ExpensesSummary correctly with no data", () => {
  const wrapper = shallow(<ExpensesSummary />);

  expect(wrapper).toMatchSnapshot();
});

test("should render ExpensesSummary correctly with a single expense", () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={1} expenseTotal={expenses[0].amount} />
  );

  expect(
    wrapper
      .find("h2")
      .text()
      .split(" ")[2]
  ).toBe("expense");
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpensesSummary correctly with multiple expenses", () => {
  const wrapper = shallow(
    <ExpensesSummary
      expenseCount={expenses.length}
      expenseTotal={getExpenseTotal(expenses)}
    />
  );
  expect(
    wrapper
      .find("h2")
      .text()
      .split(" ")[2]
  ).toBe("expenses");
  expect(wrapper).toMatchSnapshot();
});

test("should map state to props correctly", () => {
  const newProps = mapStateToProps({ expenses, filters: filtersWithData });
  const wrapper = shallow(<ExpensesSummary {...newProps} />);
  expect(wrapper).toMatchSnapshot();
});
