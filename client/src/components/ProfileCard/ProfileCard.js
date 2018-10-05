import React from "react";
import "./ProfileCard.css";

const ProfileCard = props => (
  <div className="card profilecard" >
    <div className="img-container">
      <img alt={props.name} src={props.image} />
    </div>
    <div className="content" >
      <ul>
        <li>
          <strong>Name:</strong> {props.name}
        </li>
        <li>
          <strong>Real Name:</strong> {props.realname}
        </li>
        <li>
          <strong>Gender:</strong> {props.gender}
        </li>
      </ul>
    </div>
   
  </div>
);

export default ProfileCard;
