// a single item in the inventory
import React from "react";
import "./CatDisplay.css";

type Props = {
  textcontent: string;
};

const SpeechBubble = (props: Props) => {
  return (
    <>
      {props.textcontent.length < 15 ? (
        <p className="CatDisplay-speech" style={{ left: `45%`, fontSize: `2em` }}>
          {props.textcontent}
        </p>
      ) : (
        <p className="CatDisplay-speech" style={{ left: `0%`, fontSize: `1.15em` }}>
          {props.textcontent}
        </p>
      )}
    </>
  );
};

export default SpeechBubble;
