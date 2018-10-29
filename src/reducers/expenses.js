import { combineReducers } from "redux";

const byIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_EXPENSES":
      // Rewrite any previous state
      return action.expenses;
    case "ADD_EXPENSE":
    case "EDIT_EXPENSE":
      return { ...state, [action.id]: action.data };
    case "REMOVE_EXPENSE": {
      const { [action.id]: removed, ...remaining } = state;
      return remaining;
    }
    default:
      return state;
  }
};

const allIdsReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_EXPENSES":
      return Object.keys(action.expenses);
    case "ADD_EXPENSE":
      return [...state, action.id];
    case "REMOVE_EXPENSE":
      return state.filter(id => id !== action.id);
    default:
      return state;
  }
};

export default combineReducers({ byId: byIdReducer, allIds: allIdsReducer });
