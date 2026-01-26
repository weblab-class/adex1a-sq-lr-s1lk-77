import React, { useState, useEffect } from "react";
import "./CatCard.css";
import CatInterfaceMongo from "../../../../shared/Cat";

type Props = {
  cat: CatInterfaceMongo;
};

const CatCard = (props: Props) => {
  return (
    <div className="CatCard-container">
      <h1 className="CatCard-header">{props.cat.name}</h1>
      <div className="CatCard-slot">
        {/* <img src={props.cat.hasachieved[0] ? CatHappy : CatGray} alt="placeholder" /> */}
        <div className={`CatCard-img CatCard-${props.cat.hasachieved[0] ? "gray" : "happy"}`}></div>
        <div className="CatCard-text">PURRFECT</div>
      </div>
      <div className="CatCard-slot">
        {/* <img src={props.cat.hasachieved[0] ? CatSad : CatGray} alt="placeholder" /> */}
        <div className={`CatCard-img CatCard-${props.cat.hasachieved[0] ? "gray" : "sad"}`}></div>
        <div className="CatCard-text">MISERACULOUS</div>
      </div>
      <div className="CatCard-slot">
        {/* <img src={props.cat.hasachieved[0] ? CatAngry : CatGray} alt="placeholder" /> */}
        <div className={`CatCard-img CatCard-${props.cat.hasachieved[0] ? "gray" : "angry"}`}></div>
        <div className="CatCard-text">HISSTORICAL</div>
      </div>
    </div>
  );
};

export default CatCard;
