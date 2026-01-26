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
        <p
          className="CatDisplay-speech"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: `clamp(1em, 2.5cqw, 1.8em)`,
          }}
        >
          {props.textcontent}
        </p>
      ) : (
        <p
          className="CatDisplay-speech"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: `clamp(0.3em, 1cqw, 2em)`,
            fontFamily: "Rubik Glitch",
          }}
        >
          {props.textcontent}
        </p>
      )}
    </>
  );
};

export default SpeechBubble;
