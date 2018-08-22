import moment from "moment";

export default (expenses, { text, sortBy, startDate, endDate }) => {
  const sortFunction = (a, b) => {
    switch (sortBy) {
      case "amount":
        return b.amount - a.amount;
      case "date":
        return b.createdAt - a.createdAt;
      // The store can only set sortBy to date or amount
      // Any other case would return undefined, and sort(undefined) is alphabetic
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

  return expenses.filter(filterFunction).sort(sortFunction);
};
