import React from "react";
import { Link } from "react-router-dom";

const Clink = (props) => {
  return (
    <Link style={{ textDecoration: "none", color: "#757575" }} to={props.to}>
      {props.children}
    </Link>
  );
};

export default Clink;
