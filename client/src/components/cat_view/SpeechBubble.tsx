// a single item in the inventory
import React from "react";
import "./CatDisplay.css";

type Props = {
  textcontent: string;
  is_spoopy: boolean;
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
            fontFamily: props.is_spoopy ? "Rubik Glitch" : "Josefin Sans",
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
            width: "100%",
            textAlign: "center",
            fontSize: `clamp(0.3em, 1.3cqw, 1.3em)`,
            fontFamily: props.is_spoopy ? "Rubik Glitch" : "Josefin Sans",
            color: props.is_spoopy ? "white" : "black",
            backgroundColor: props.is_spoopy ? "black" : "white",
            borderRadius: props.is_spoopy ? 0 : "35%",
          }}
        >
          {props.textcontent}
        </p>
      )}
    </>
  );
};

export default SpeechBubble;
