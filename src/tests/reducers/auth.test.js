import authReducer from "../../reducers/auth";

test("should set up default state", () => {
  const state = authReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({});
});

test("should set the user id on login", () => {
  const action = { type: "LOGIN", uid: "someId" };
  const state = authReducer({}, action);

  expect(state.uid).toBe("someId");
});

test("should clear the user id on logout", () => {
  const action = { type: "LOGOUT" };
  const state = authReducer({ uid: "loggedInUser" }, action);

  expect(state.uid).toBe(null);
});
