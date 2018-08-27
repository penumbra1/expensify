export default (expenses = []) =>
  // Passing initial value of 0 to account for an empty expense array
  expenses.reduce((total, expense) => total + expense.amount, 0);
