import { login, logout } from "../../actions/auth";

test("should set up a log in action object", () => {
  const action = login("someId");

  expect(action).toEqual({ type: "LOGIN", uid: "someId" });
});

test("should set up a log out action object", () => {
  const action = logout();

  expect(action).toEqual({ type: "LOGOUT" });
});
