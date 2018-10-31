import React, { Fragment } from "react";
import connect from "react-redux/lib/connect/connect";

import { setError } from "../actions/status";

export const Loader = ({ loading, error, cancel, children }) => {
  if (loading || error) {
    return (
      <Fragment>
        {loading &&
          !error && (
            <Fragment>
              <p>Spinner goes here</p>
              <p>Loading expenses...</p>
            </Fragment>
          )}
        {error && (
          <Fragment>
            <p>Error illustration goes here</p>
            {error}
            <button onClick={cancel}>Got it, go back</button>
          </Fragment>
        )}
      </Fragment>
    );
  }
  // Return null if there are no children to avoid "Nothing was returned" error
  return children || null;
};

const mapStateToProps = ({ status: { loading, error } }) => ({
  loading,
  error
});
const mapDispatchToProps = { cancel: () => setError(null) };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);
