const statusDefaults = {
  loading: false,
  error: null
};

export default (state = statusDefaults, action) => {
  const { loading, error } = action;
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading };
    case "SET_ERROR":
      return { ...state, error };
    default:
      return state;
  }
};
