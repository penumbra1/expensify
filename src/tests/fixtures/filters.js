import moment from "moment";

const filters = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const filtersWithData = {
  text: "card",
  sortBy: "amount",
  startDate: moment(0),
  endDate: moment(0).add(4, "days")
};

export { filters, filtersWithData };
