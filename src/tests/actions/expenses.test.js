import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  loadExpenses,
  startLoadExpenses,
  addExpense,
  startAddExpense,
  editExpense,
  startEditExpense,
  removeExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const middlewares = [thunk];
const createMockStore = configureStore(middlewares);
let store = null;

const expensesObject = {};
expenses.forEach(({ id, ...data }) => {
  expensesObject[id] = { ...data };
});

beforeEach(done => {
  // Create a new empty store
  store = createMockStore({});

  // Do a clean rewrite of the database
  database.ref("expenses").set(expensesObject, () => done());
});

/*
 * LOADING EXPENSES
 */

test("should set up a load expenses action object with given data", () => {
  // loadExpenses receives an array
  const action = loadExpenses(expenses);
  expect(action).toEqual({ type: "LOAD_EXPENSES", expenses });
});

test("should dispatch a load expenses action with data from the database", done => {
  store.dispatch(startLoadExpenses()).then(() => {
    const action = store.getActions()[0];

    expect(action).toEqual({ type: "LOAD_EXPENSES", expenses });
    done();
  });
});

/*
 * ADDING EXPENSES
 */

// -----With default values-----

test("should dispatch an add expense action with default data", done => {
  store
    .dispatch(startAddExpense())
    .then(() => {
      const action = store.getActions()[0];

      expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          description: "",
          note: "",
          amount: 0,
          createdAt: 0
        }
      });

      done();
    })
    .catch(e => console.log(e));
});

test("should add expense with default data to the database", done => {
  store
    .dispatch(startAddExpense())
    .then(() => {
      const action = store.getActions()[0];

      return database.ref(`expenses/${action.expense.id}`).once("value");
    })
    .then(data => {
      expect(data.val()).toEqual({
        description: "",
        note: "",
        amount: 0,
        createdAt: 0
      });

      done();
    })
    .catch(e => console.log(e));
});

// -----With provided values-----

test("should set up an add expense action object with provided values", () => {
  const expense = expenses[2];
  const action = addExpense(expense);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense
  });
});

test("should dispatch an add expense action with given data", done => {
  const expense = expenses[0];

  store
    .dispatch(startAddExpense(expense))
    .then(() => {
      const action = store.getActions()[0];

      expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          ...expense,
          id: expect.any(String)
        }
      });

      // Force Jest to wait until this point for the promise to get resolved/rejected
      done();
    })
    .catch(e => console.log(e));
});

test("should add expense with given data to the database", done => {
  const expense = expenses[1];
  const { description, note, amount, createdAt } = expense;

  store
    .dispatch(startAddExpense(expense))
    .then(() => {
      const action = store.getActions()[0];

      return database.ref(`expenses/${action.expense.id}`).once("value");
    })
    .then(data => {
      expect(data.val()).toEqual({ description, note, amount, createdAt });

      done();
    })
    .catch(e => console.log(e));
});

/*
 * EDITING EXPENSES
 */

test("should set up an edit expense action object", () => {
  const action = editExpense("first", { description: "new" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "first",
    updates: {
      description: "new"
    }
  });
});

test("should dispatch an edit expense action with given data", done => {
  const expense = expenses[1];
  const { description, amount, createdAt } = expense;

  store
    .dispatch(startEditExpense({ ...expense, note: "too much indeed!" }))
    .then(() => {
      const action = store.getActions()[0];

      expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: expense.id,
        updates: {
          description,
          amount,
          createdAt,
          note: "too much indeed!"
        }
      });

      done();
    })
    .catch(e => console.log(e));
});

test("should edit a given expense in the database", done => {
  let expense;
  let note;
  let id;

  // Get a snapshot containing only the first expense and update it
  database
    .ref("expenses")
    .limitToFirst(1)
    .once("value")
    .then(snapshot => {
      for (const key in snapshot.val()) {
        id = key;
        expense = snapshot.val()[key];
      }
      note = `${expense.note} - edited`;
      return store.dispatch(startEditExpense({ id, ...expense, note }));
    })
    .then(() =>
      database.ref(`expenses/${id}`).once("value", data => {
        expect(data.val()).toEqual({ ...expense, note });
        done();
      })
    )
    .catch(e => console.log(e));
});

/*
 * REMOVING EXPENSES
 */
test("should set up a remove expense action object with default id", () => {
  const action = removeExpense();
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: undefined
  });
});

test("should set up a remove expense action object with given id", () => {
  const action = removeExpense({ id: "first" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "first"
  });
});
