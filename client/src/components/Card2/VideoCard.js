import React from "react";
import "./VideoCard.css";
import CardBtn from '../../components/CardBtn'
import CardBtnSave from '../../components/CardBtnSave'

const VideoCard = props => {
  // console.log(props);
  return (
  <div className="card" >
    <div className="img-container">
      <img  src={props.image} />
    </div>
    <div className="content" >
      
          <strong>Title:</strong> {props.title}
      

    </div>
    
    <CardBtn
      style={{ opacity: props.image ? 1 : 0 }}
      onClick={() => props.handleBtnPlay(props.id)}
      data-value="pass"
      id = {props.id}
   
    />
    <CardBtnSave
     style={{ opacity: props.image ? 1 : 0 }}
     onClick={() => props.handleBtnSave(props.id)}
     alreadySaved = {() => props.alreadySaved(props.id)}
     data-value="save"
     id = {props.id}/>
  </div>
  )}
;

export default VideoCard;