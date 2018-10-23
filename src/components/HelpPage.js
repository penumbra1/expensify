import React, { Fragment } from "react";

const HelpPage = props => (
  <Fragment>
    <div>Help</div>
    <button onClick={props.history.goBack}>Go back</button>
  </Fragment>
);

export default HelpPage;
