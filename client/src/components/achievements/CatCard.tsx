import React, { useState, useEffect } from "react";
import "./CatCard.css";
import CatInterfaceMongo from "../../../../shared/Cat";

type Props = {
  cat: CatInterfaceMongo | null;
};

const CatCard = (props: Props) => {
  useEffect(() => {
    console.log("running cat card useeffect");
    console.log(props.cat);
    console.log(props.cat?.name);
    console.log(props.cat?.hasachieved);
  }, [props.cat]);

  if (!props.cat) {
    return <></>;
  }
  return (
    <div className="w-full h-full CatCard-container">
      <h1 className="CatCard-header">{props.cat.name}</h1>
      <div className="CatCard-slot">
        {/* <img src={props.cat.hasachieved[0] ? CatHappy : CatGray} alt="placeholder" /> */}
        <div className={`CatCard-img CatCard-${props.cat.hasachieved[0] ? "happy" : "gray"}`}></div>
        <div className="CatCard-text">PURRFECT</div>
      </div>
      <div className="CatCard-slot">
        {/* <img src={props.cat.hasachieved[0] ? CatSad : CatGray} alt="placeholder" /> */}
        <div className={`CatCard-img CatCard-${props.cat.hasachieved[1] ? "sad" : "gray"}`}></div>
        <div className="CatCard-text">MISERACULOUS</div>
      </div>
      <div className="CatCard-slot">
        {/* <img src={props.cat.hasachieved[0] ? CatAngry : CatGray} alt="placeholder" /> */}
        <div className={`CatCard-img CatCard-${props.cat.hasachieved[2] ? "angry" : "gray"}`}></div>
        <div className="CatCard-text">HISSTORICAL</div>
      </div>
    </div>
  );
};

export default CatCard;
