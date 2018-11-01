import React from "react";
import { connect } from "react-redux";

export const OnlineIndicator = props =>
  props.online !== null && <span>{props.online ? "Online" : "Offline"}</span>;

const mapStateToProps = ({ online }) => ({ online });

export default connect(mapStateToProps)(OnlineIndicator);
