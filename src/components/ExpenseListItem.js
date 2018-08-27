import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const ExpenseListItem = ({ description, amount, createdAt, id }) => (
  <Fragment>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>Amount: {numeral(amount / 100).format("$0,0.00")}</p>
    <p>Created: {moment(createdAt).format("MMMM Do YYYY")}</p>
  </Fragment>
);

export default ExpenseListItem;
