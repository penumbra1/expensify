import moment from "moment";

// Mock expenses array
export default [
  {
    id: "1",
    description: "candy",
    note: "sweet!",
    amount: 1,
    createdAt: moment(0).valueOf()
  },
  {
    id: "2",
    description: "Rent",
    note: "too much!",
    amount: 1009500,
    createdAt: moment(0)
      .subtract(4, "days")
      .valueOf()
  },
  {
    id: "3",
    description: "credit Card",
    note: "",
    amount: 4500,
    createdAt: moment(0)
      .add(4, "days")
      .valueOf()
  }
];
