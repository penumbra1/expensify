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
  if (!getState().status.loading) dispatch(setLoading(true));
  const expensesList = [];
  snapshot.forEach(child => {
    expensesList.push({ id: child.key, ...child.val() });
  });

  dispatch(loadExpenses(expensesList));
  dispatch(setLoading(false));
};

// Retrieve and load all expenses into state once for the current user
export const startLoadExpenses = () => (dispatch, getState) => {
  dispatch(setLoading(true));

  // if (!getState().status.online) {
  // Load from cache (localstorage?)
  // }

  const { uid } = getState().auth;

  return database
    .ref(`users/${uid}/expenses`)
    .once("value", loadExpensesSnapshot(dispatch, getState), error => {
      // Server error, e.g. permission denied
      dispatch(
        setError(
          "Ouch, looks like you're not allowed to see these expenses.\nPlease reach out to us if something went wrong here"
        )
      );
      console.error("Failed to load expenses\n", error);
    });
};

// Utility function that returns a given promise if it resolves fast enough,
// or calls the given function on timeout
const race = (func, promise) => {
  const optimistic = new Promise(resolve => {
    setTimeout(() => {
      resolve(func());
    }, 500);
  });

  return Promise.race([optimistic, promise]);
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

export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

export const startEditExpense = (id, updates = {}) => (dispatch, getState) => {
  const optimistic = () => dispatch(editExpense(id, updates));

  const fromDatabase = database
    .ref(`users/${getState().auth.uid}/expenses/${id}`)
    .update(
      updates,
      handleError("Ouch, failed to register these changes.", dispatch)
    );

  return race(optimistic, fromDatabase).catch(e =>
    console.error("Failed to update expense\n", e)
  );
};

/*
 * ADDING EXPENSES
 */

export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = (expenseData = {}) => (dispatch, getState) => {
  // Optimistic add will use a temporary id
  const id = shortid.generate();
  const {
    description = "",
    note = "",
    amount = 0,
    createdAt = 0
  } = expenseData;
  const expense = { description, note, amount, createdAt };

  const optimistic = () => dispatch(addExpense({ ...expense, id }));

  const fromDatabase = database
    .ref(`users/${getState().auth.uid}/expenses`)
    .push(expense, handleError("Ouch, failed to add this expense.", dispatch))
    .then(data =>
      // Update temporary id to the one returned from Firebase
      dispatch(editExpense(id, { id: data.key }))
    );

  return race(optimistic, fromDatabase).catch(e =>
    console.error("Failed to add expense\n", e)
  );
};

/*
 * REMOVING EXPENSES
 */

export const removeExpense = id => ({
  type: "REMOVE_EXPENSE",
  id
});

export const startRemoveExpense = id => (dispatch, getState) => {
  const optimistic = () => dispatch(removeExpense(id));

  const fromDatabase = database
    .ref(`users/${getState().auth.uid}/expenses/${id}`)
    .remove(handleError("Ouch, failed to remove this expense.", dispatch));

  return race(optimistic, fromDatabase).catch(e =>
    console.error("Failed to remove expense\n", e)
  );
};

/*
 * SYNCING EXPENSES
 */

// Note: this adds an event listener and should be run once when a user logs in
// Callbacks are inevitable as .on() doesn't return a Promise
export const setupSync = () => (dispatch, getState) => {
  dispatch(setLoading(true));

  const { uid } = getState().auth;

  return database
    .ref(`users/${uid}/expenses`)
    .on("value", loadExpensesSnapshot, error => {
      dispatch(
        setError(
          "Ouch, looks like you're not allowed to see these expenses.\nPlease reach out to us if something went wrong here"
        )
      );
      console.error(error);
    });
  // const onAdd = database.ref(`users/${uid}/expenses`).on(
  //   "child_added",
  //   child => dispatch(addExpense({ id: child.key, ...child.val() })),
  //   error => {
  //     dispatch(
  //       setError(
  //         "Ouch, looks like you're not allowed to see these expenses.\nPlease reach out to us if something went wrong here"
  //       )
  //     );
  //     console.error(error);
  //   }
  // );
};
