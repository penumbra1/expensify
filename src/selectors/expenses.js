import moment from "moment";

const getAllExpenses = state =>
  state.allIds.map(id => ({ id, ...state.byId[id] }));

export default (state, { text, sortBy, startDate, endDate }) => {
  const sortFunction = (a, b) => {
    switch (sortBy) {
      case "amount":
        return b.amount - a.amount;
      case "date":
        return b.createdAt - a.createdAt;
      // sort(undefined) is alphabetic
      default:
        return undefined;
    }
  };

  const filterFunction = expense => {
    const createdAtMoment = moment(expense.createdAt);
    // User can clear dates, and no date means a match for all items
    const startDateMatch = startDate
      ? startDate.isSameOrBefore(createdAtMoment, "day")
      : true;
    const endDateMatch = endDate
      ? endDate.isSameOrAfter(createdAtMoment, "day")
      : true;
    const textMatch = text
      ? expense.description.toLowerCase().includes(text.toLowerCase())
      : true;
    return startDateMatch && endDateMatch && textMatch;
  };

  return getAllExpenses(state)
    .filter(filterFunction)
    .sort(sortFunction);
};
