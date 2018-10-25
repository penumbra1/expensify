import React, { Fragment } from "react";
import connect from "react-redux/lib/connect/connect";

export const Loader = ({
  loading,
  error,
  message,
  onClick,
  buttonText,
  children
}) => {
  if (loading || error)
    return (
      <Fragment>
        {loading && !error && <p>Spinner goes here</p>}
        {error && <p>Error illustration goes here</p>}
        {message && <p>{message}</p>}
        {error && <button onClick={onClick}>{buttonText}</button>}
      </Fragment>
    );
  // Return null if there are no children to avoid "Nothing was returned" error
  return children || null;
};

const mapStateToProps = ({ status }) => status;

export default connect(mapStateToProps)(Loader);
