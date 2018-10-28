export const setOnline = online => ({ type: "SET_ONLINE", online });

export const setLoading = loading => ({
  type: "SET_LOADING",
  loading
});

export const setError = error => ({
  type: "SET_ERROR",
  error
});

export const clearErrors = () => ({
  type: "CLEAR_ERRORS"
});
