export default (state = null, action) => {
  const { online } = action;
  switch (action.type) {
    case "SET_ONLINE":
      return online;
    default:
      return state;
  }
};
