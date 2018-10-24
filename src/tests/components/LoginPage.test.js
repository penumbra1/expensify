import React from "react";
import { shallow } from "enzyme";
import { LoginPage } from "../../components/LoginPage";
import { startLogin } from "../../firebase/auth";

jest.mock("../../firebase/auth", () => ({ startLogin: jest.fn() }));

test("should render login page correctly", () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test("should call startLogin on button click", () => {
  const wrapper = shallow(<LoginPage />);
  wrapper.find("button").simulate("click");

  expect(startLogin).toHaveBeenCalled();
});
