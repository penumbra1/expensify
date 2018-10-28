const statusDefaultState = {
  online: false,
  loading: false,
  errors: []
};

export default (state = statusDefaultState, action) => {
  const { online, loading, error } = action;
  switch (action.type) {
    case "SET_ONLINE":
      return { ...state, online };
    case "SET_LOADING":
      return { ...state, loading };
    case "SET_ERROR":
      return { ...state, errors: [...state.errors, error] };
    case "CLEAR_ERRORS":
      return { ...state, errors: [] };
    default:
      return state;
  }
};
