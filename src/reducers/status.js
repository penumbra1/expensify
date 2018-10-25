const statusDefaultState = { loading: false, error: null, message: null };

export default (state = statusDefaultState, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, loading: true, error: false, message: action.message };
    case "FINISH_LOADING":
      return { ...state, loading: false, error: false, message: null };
    case "SET_ERROR":
      return { ...state, error: true, message: action.message };
    case "CLEAR_ERROR":
      return { ...state, error: false };
    default:
      return state;
  }
};
