import React, { Fragment } from "react";
import connect from "react-redux/lib/connect/connect";
import shortid from "shortid";

export const Loader = ({ loading, errors, onClick, buttonText, children }) => {
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
            <button onClick={onClick}>{buttonText}</button>
          </Fragment>
        )}
      </Fragment>
    );
  // Return null if there are no children to avoid "Nothing was returned" error
  return children || null;
};

const mapStateToProps = ({ status }) => status;

export default connect(mapStateToProps)(Loader);
