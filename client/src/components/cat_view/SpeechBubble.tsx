// a single item in the inventory
import React from "react";
import "./CatDisplay.css";

type Props = {
  textcontent: string;
};

const SpeechBubble = (props: Props) => {
  return <p className="CatDisplay-speech">{props.textcontent}</p>;
};

export default SpeechBubble;
