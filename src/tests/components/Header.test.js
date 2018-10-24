import React from "react";
import { shallow } from "enzyme";
import { Header } from "../../components/Header";
import { startLogout } from "../../firebase/auth";

jest.mock("../../firebase/auth", () => ({ startLogout: jest.fn() }));

test("should render header correctly", () => {
  const wrapper = shallow(<Header startLogout={() => {}} />);
  expect(wrapper).toMatchSnapshot();

  // // If react-test-renderer were used instead of enzyme:
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test("should call startLogout on button click", () => {
  const wrapper = shallow(<Header />);
  wrapper.find("button").simulate("click");

  expect(startLogout).toHaveBeenCalled();
});
