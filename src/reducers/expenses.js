const expensesDefaultState = [];

export default (state = expensesDefaultState, action) => {
  switch (action.type) {
    case "LOAD_EXPENSES":
      // Rewrite any previous state
      return action.expenses;
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return action.id ? state.filter(({ id }) => id !== action.id) : state;
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return { ...expense, ...action.updates };
        }
        return expense;
      });
    default:
      return state;
  }
};
