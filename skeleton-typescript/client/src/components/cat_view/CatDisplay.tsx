// a single item in the inventory
import React from "react";
import "./CatDisplay.css";
import SpeechBubble from "./SpeechBubble";

type Props = {
  catImg: string;
};

const CatDisplay = (props: Props) => {
  return (
    <div className="CatDisplay-container">
      <SpeechBubble textcontent="MEOW" />
      <img className="CatDisplay-cat" src={props.catImg} alt="cat" />
    </div>
  );
};

export default CatDisplay;
