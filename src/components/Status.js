import React from "react";
import { connect } from "react-redux";

const Status = ({ status }) => status && <p>status</p>;

const mapStateToProps = state => ({ status: state.status });

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: true }
);
