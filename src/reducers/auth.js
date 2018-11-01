export default (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return { uid: action.uid };
    default:
      return state;
    // LOGOUT is handled in the root reducer to reset the entire state
  }
};
