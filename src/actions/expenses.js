import database from "../firebase/firebase";
import { startLoading, finishLoading, setError } from "./status";

/*
 * LOADING EXPENSES
 */

// Receives an array of expenses with ids
export const loadExpenses = expenses => ({
  type: "LOAD_EXPENSES",
  expenses
});

export const startLoadExpenses = () => dispatch => {
  dispatch(startLoading("Loading expenses..."));

  return database
    .ref("expenses")
    .once("value")
    .then(snapshot => {
      const expensesList = [];
      snapshot.forEach(child => {
        expensesList.push({ id: child.key, ...child.val() });
      });
      dispatch(finishLoading());
      return dispatch(loadExpenses(expensesList));
    });
};

/*
 * ADDING EXPENSES
 */

export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

// Instead of an action object, startAddExpense returns an "action function"
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
    .push(expense, error => {
      if (error) {
        dispatch(
          setError(
            "Ouch, failed to add this expense. Please reach out to us if this issue persists."
          )
        );
      }
    })
    .then(data => dispatch(addExpense({ id: data.key, ...expense })));
};

/*
 * EDITING EXPENSES
 */

export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

export const startEditExpense = (id, updates) => dispatch =>
  database
    .ref(`expenses/${id}`)
    .update(updates)
    .then(() => dispatch(editExpense(id, updates)))
    .catch(e => console.log("Failed to update expense", e));

/*
 * REMOVING EXPENSES
 */

export const removeExpense = id => ({
  type: "REMOVE_EXPENSE",
  id
});

export const startRemoveExpense = id => dispatch =>
  database
    .ref(`expenses/${id}`)
    .remove()
    .then(() => dispatch(removeExpense(id)))
    .catch(e => console.log("Failed to remove expense", e));
