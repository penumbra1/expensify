import React from "react";
import { shallow } from "enzyme";
import NotFoundPage from "../../components/NotFoundPage";

test("should render NotFoundPage correctly", () => {
  const history = { goBack: () => {} };
  const wrapper = shallow(<NotFoundPage history={history} />);

  expect(wrapper).toMatchSnapshot();
});

test("should go back in history on button click", () => {
  const history = { goBack: jest.fn() };
  const wrapper = shallow(<NotFoundPage history={history} />);

  wrapper.find("button").simulate("click");

  expect(history.goBack).toHaveBeenCalled();
});
