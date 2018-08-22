import React from "react";
import { shallow } from "enzyme";
import Header from "../../components/Header";

test("should render header correctly", () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();

  // // If react-test-renderer were used instead of enzyme:
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});
