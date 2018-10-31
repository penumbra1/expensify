import database from "../firebase/firebase";
import { setLoading, setError } from "./status";

// Utility function that returns the result of a promise if it's fast enough
// or resolves after a timeout
const race = promise => {
  const optimistic = new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 300);
  });

  return Promise.race([optimistic, promise]).catch(e => console.error(e));
};

// Utility function for Firebase error callbacks
const handleError = (
  dispatch,
  message = "Ouch, failed to update your expenses."
) => error => {
  if (error) {
    dispatch(
      setError(`${message}\nPlease reach out to us if this issue persists.`)
    );
  }
};

/*
 * ADDING EXPENSES
 */

export const addExpense = (id, data) => ({
  type: "ADD_EXPENSE",
  id,
  data
});

export const startAddExpense = (expenseData = {}) => (dispatch, getState) => {
  const {
    description = "",
    note = "",
    amount = 0,
    createdAt = 0
  } = expenseData;
  const expense = { description, note, amount, createdAt };

  const fromDatabase = database
    .ref(`users/${getState().auth.uid}/expenses`)
    .push(expense, handleError(dispatch));

  return race(fromDatabase);
};

/*
 * EDITING EXPENSES
 */

export const editExpense = (id, data) => ({
  type: "EDIT_EXPENSE",
  id,
  data
});

export const startEditExpense = (id, updates = {}) => (dispatch, getState) => {
  const fromDatabase = database
    .ref(`users/${getState().auth.uid}/expenses/${id}`)
    .update(updates, handleError(dispatch));

  return race(fromDatabase);
};

/*
 * REMOVING EXPENSES
 */

export const removeExpense = id => ({
  type: "REMOVE_EXPENSE",
  id
});

export const startRemoveExpense = id => (dispatch, getState) => {
  const fromDatabase = database
    .ref(`users/${getState().auth.uid}/expenses/${id}`)
    .remove(handleError(dispatch));

  return race(fromDatabase);
};

/*
 * SYNCING EXPENSES
 */

export const listen = () => (dispatch, getState) => {
  dispatch(setLoading(true));

  const ref = database.ref(`users/${getState().auth.uid}/expenses`);

  const onError = handleError(
    dispatch,
    "Ouch, looks like you're not allowed to see these expenses."
  );

  ref.on(
    "child_added",
    data => dispatch(addExpense(data.key, data.val())),
    onError
  );

  ref.on(
    "child_changed",
    data => dispatch(editExpense(data.key, data.val())),
    onError
  );

  ref.on("child_removed", data => dispatch(removeExpense(data.key)), onError);

  // This will fire right after initial expenses are loaded
  // https://stackoverflow.com/questions/27978078
  ref.once(
    "value",
    () => dispatch(setLoading(false)),
    () => dispatch(setLoading(false))
  );
};
