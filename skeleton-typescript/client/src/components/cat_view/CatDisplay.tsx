// a single item in the inventory
import React, { useEffect, useState } from "react";
import "./CatDisplay.css";
import SpeechBubble from "./SpeechBubble";
import { socket } from "../../client-socket";
import { capitalizeFirst } from "../../custom-utilities";
import CatSprite from "./CatSprite";

type Props = {
  sprite: string;
};

const CatDisplay = (props: Props) => {
  const [speech, setSpeech] = useState<string | null>("mewo");
  const [trigger, setTrigger] = useState<string | null>(null);

  // event handler definitions
  // on action registered
  const handleActionTrigger = (input: string): void => {
    const [color, item, action] = input.split("-");
    const toSpeech: string = `Meow! ${capitalizeFirst(action)} me with your ${color} ${item}`;
    setSpeech(toSpeech);
    setTrigger(action);
  };

  // listener subscriptions
  useEffect(() => {
    socket.on("actionbegan", handleActionTrigger);

    return () => {
      socket.off("actionbegan", handleActionTrigger);
    };
  }, []);

  return (
    <div className={trigger ? "CatDisplay-containerbig" : "CatDisplay-container"}>
      {speech && <SpeechBubble textcontent={speech} />}
      <CatSprite sprite={props.sprite} />
    </div>
  );
};

export default CatDisplay;
