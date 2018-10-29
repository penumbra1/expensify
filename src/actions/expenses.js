import shortid from "shortid";

import database from "../firebase/firebase";
import { setLoading, setError } from "./status";

/*
 * LOADING EXPENSES
 */

// Receives an array of expenses with ids
export const loadExpenses = expenses => ({
  type: "LOAD_EXPENSES",
  expenses
});

// Utility function for snapshot callbacks
const loadExpensesSnapshot = (dispatch, getState) => snapshot => {
  const expenses = {};
  snapshot.forEach(child => {
    expenses[child.key] = child.val();
  });

  dispatch(loadExpenses(expenses));
  dispatch(setLoading(false));
};

// Retrieve and load all expenses into state once for the current user
export const startLoadExpenses = () => (dispatch, getState) => {
  dispatch(setLoading(true));

  // if (!getState().status.online) {
  //  // Load from cache (localstorage?)
  // }

  const { uid } = getState().auth;

  return database.ref(`users/${uid}/expenses`).once(
    "value",
    snapshot => {
      const expenses = {};
      snapshot.forEach(child => {
        expenses[child.key] = child.val();
      });

      dispatch(loadExpenses(expenses));
      dispatch(setLoading(false));
    },
    error => {
      // Server error, e.g. permission denied
      dispatch(
        setError(
          "Ouch, looks like you're not allowed to see these expenses.\nPlease reach out to us if something went wrong here"
        )
      );
      console.error("Failed to load expenses\n", error);
    }
  );
};

// Utility function that returns the result of a promise if it's fast enough
// or resolves after a timeout
const race = promise => {
  const optimistic = new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  return Promise.race([optimistic, promise]).catch(e => console.error(e));
};

// Utility function for Firebase error callbacks
const handleError = (message, dispatch) => error => {
  if (error) {
    dispatch(
      setError(`${message}\nPlease reach out to us if this issue persists.`)
    );
  }
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
    .update(
      updates,
      handleError("Ouch, failed to update this expense.", dispatch)
    );

  return race(fromDatabase);
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
    .push(expense, handleError("Ouch, failed to add this expense.", dispatch));

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
    .remove(handleError("Ouch, failed to remove this expense.", dispatch));

  return race(fromDatabase);
};

/*
 * SYNCING EXPENSES
 */

export const listen = () => (dispatch, getState) => {
  const ref = database.ref(`users/${getState().auth.uid}/expenses`);

  const onError = handleError(
    "Ouch, looks like you're not allowed to see these expenses.",
    dispatch
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
};
