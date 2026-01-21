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

type CatNoises = Array<"mrrrp" | "meow" | "chrrrp" | "purrr" | "hiss" | "meow meow">;

const CatDisplay = (props: Props) => {
  const [speech, setSpeech] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<string>("default");
  const catNoises: CatNoises = ["mrrrp", "meow", "chrrrp", "meow meow"];

  // event handler definitions
  // on action registered
  const handleActionTrigger = (input: string): void => {
    const [color, item, action] = input.split("-");
    const toSpeech = `Meow! ${capitalizeFirst(action)} me with your ${color} ${item}`;
    setSpeech(toSpeech);
    setTrigger(input);
  };

  // on click cat image when action not firing
  const makeRandomNoise = (): void => {
    // code here
    const noise: string = catNoises[Math.floor(Math.random() * catNoises.length)];
    setSpeech(noise);
  };

  // on action complete
  const handleActionComplete = (data: string): void => {
    console.log("received ping");
    setTrigger("default");
    makeRandomNoise();
  };

  // listener subscriptions
  useEffect(() => {
    socket.on("actionbegan", handleActionTrigger);
    socket.on("actioncomplete", handleActionComplete);

    return () => {
      socket.off("actionbegan", handleActionTrigger);
      socket.off("actioncomplete", handleActionComplete);
    };
  }, []);

  return (
    <div className={trigger !== "default" ? "CatDisplay-containerbig" : "CatDisplay-container"}>
      {speech && <SpeechBubble textcontent={speech} />}
      <CatSprite sprite={props.sprite} action={trigger} callback={makeRandomNoise} />
    </div>
  );
};

export default CatDisplay;
