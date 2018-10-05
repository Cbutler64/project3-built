import React from "react";
import "./CardBtn.css";

const CardBtn = props => (
  <button
    onClick={props.onClick}
    className={`card-btn ${props["data-value"]}`}
    {...props}
  >
  {props.checkFriend ? "unfollow" : "follow"}
  </button>
);

export default CardBtn;
