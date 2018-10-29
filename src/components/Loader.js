import React, { Fragment } from "react";
import connect from "react-redux/lib/connect/connect";
import shortid from "shortid";

import { clearErrors } from "../actions/status";

export const Loader = ({
  loading,
  errors,
  clearErrors,
  buttonText,
  children
}) => {
  if (loading || errors.length > 0)
    return (
      <Fragment>
        {loading &&
          !errors.length && (
            <Fragment>
              <p>Spinner goes here</p>
              <p>Loading expenses...</p>
            </Fragment>
          )}
        {!!errors.length && <p>Error illustration goes here</p>}
        {!!errors.length && (
          <Fragment>
            {errors.map(error => (
              <p key={shortid.generate()}>{error}</p>
            ))}
            <button onClick={clearErrors}>Cancel & reload</button>
          </Fragment>
        )}
      </Fragment>
    );
  // Return null if there are no children to avoid "Nothing was returned" error
  return children || null;
};

const mapStateToProps = ({ status }) => status;
const mapDispatchToProps = { clearErrors };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);
