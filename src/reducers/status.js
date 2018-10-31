const statusDefaultState = {
  online: false,
  loading: false,
  error: null
};

export default (state = statusDefaultState, action) => {
  const { online, loading, error } = action;
  switch (action.type) {
    case "SET_ONLINE":
      return { ...state, online };
    case "SET_LOADING":
      return { ...state, loading };
    case "SET_ERROR":
      return { ...state, error };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};
