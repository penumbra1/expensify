import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <Fragment>
    <p>404 - Not Found!</p>
    <Link to="/">Go home</Link>
  </Fragment>
);

export default NotFoundPage;
