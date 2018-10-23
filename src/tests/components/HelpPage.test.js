import React from "react";
import { shallow } from "enzyme";
import HelpPage from "../../components/HelpPage";

test("should render the help page correctly", () => {
  const history = { goBack: () => {} };
  const wrapper = shallow(<HelpPage history={history} />);

  expect(wrapper).toMatchSnapshot();
});

test("should go back in history on button click", () => {
  const history = { goBack: jest.fn() };
  const wrapper = shallow(<HelpPage history={history} />);

  wrapper.find("button").simulate("click");

  expect(history.goBack).toHaveBeenCalled();
});
