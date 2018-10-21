import database from "../firebase/firebase";

/*
 * LOADING EXPENSES
 */

// Receives an array of expenses with ids
export const loadExpenses = expenses => ({
  type: "LOAD_EXPENSES",
  expenses
});

export const startLoadExpenses = () => dispatch =>
  database
    .ref("expenses")
    .once("value")
    .then(snapshot => {
      const expensesList = [];
      snapshot.forEach(child => {
        expensesList.push({ id: child.key, ...child.val() });
      });
      return dispatch(loadExpenses(expensesList));
    })
    .catch(e => console.log("Failed to load expenses from database", e));

/*
 * ADDING EXPENSES
 */

export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

// Instead of an action object, startAddExpense returns an "action promise"
// that takes a dispatch argument and will be processed by Thunk middleware
export const startAddExpense = (expenseData = {}) => dispatch => {
  const {
    description = "",
    note = "",
    amount = 0,
    createdAt = 0
  } = expenseData;
  const expense = { description, note, amount, createdAt };
  return database
    .ref("expenses")
    .push(expense)
    .then(data => dispatch(addExpense({ id: data.key, ...expense })))
    .catch(e => console.log("Failed to add expense", e));
};

/*
 * REMOVING EXPENSES
 */

export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

export const startRemoveExpense = ({ id }) => dispatch => {
  database
    .ref(`expenses/${id}`)
    .remove()
    .then(() => dispatch(removeExpense({ id })))
    .catch(e => console.log("Failed to remove expense", e));
};

/*
 * EDITING EXPENSES
 */

export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

export const startEditExpense = ({ id, ...updates }) => dispatch =>
  database
    .ref(`expenses/${id}`)
    .update(updates)
    .then(() => dispatch(editExpense(id, updates)))
    .catch(e => console.log("Failed to update expense", e));
