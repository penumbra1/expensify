import React, { Fragment } from "react";

const NotFoundPage = props => (
  <Fragment>
    <p>404 - Not Found!</p>
    <button onClick={props.history.goBack}>Go back</button>
  </Fragment>
);

export default NotFoundPage;
