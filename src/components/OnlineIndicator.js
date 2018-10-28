import React from "react";
import { connect } from "react-redux";

export const OnlineIndicator = props => (
  <span>{props.online ? "Online" : "Offline"}</span>
);

const mapStateToProps = ({ status: { online } }) => ({ online });

export default connect(mapStateToProps)(OnlineIndicator);
