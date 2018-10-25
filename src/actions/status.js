export const startLoading = message => ({ type: "START_LOADING", message });

export const finishLoading = () => ({ type: "FINISH_LOADING" });

export const setError = message => ({ type: "SET_ERROR", message });

export const clearError = () => ({ type: "CLEAR_ERROR" });
