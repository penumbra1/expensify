import { combineReducers } from "redux";

import expensesReducer from "./expenses";
import filtersReducer from "./filters";
import authReducer from "./auth";
import statusReducer from "./status";
import onlineReducer from "./online";

const combinedReducer = combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer,
  auth: authReducer,
  status: statusReducer
});

// Resets state of all reducers combined above to their defaults
const sessionReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    // Reassigning reference https://stackoverflow.com/questions/35622588
    state = undefined;
  }

  return combinedReducer(state, action);
};

// online state doesn't depend on the user session
export default combineReducers({
  session: sessionReducer,
  online: onlineReducer
});
