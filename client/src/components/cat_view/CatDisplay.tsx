// a single item in the inventory
import React, { useEffect, useState, useRef } from "react";
import "./CatDisplay.css";
import SpeechBubble from "./SpeechBubble";
import { socket } from "../../client-socket";
import { capitalizeFirst } from "../../custom-utilities";
import CatSprite from "./CatSprite";
import { get } from "../../utilities";

type Props = {
  sprite: string;
};

type CatNoises = Array<"mrrrp" | "meow" | "chrrrp" | "purrr" | "hiss" | "meow meow">;

const CatDisplay = (props: Props) => {
  const [speech, setSpeech] = useState<string | null>(null);
  const [trigger, setTrigger] = useState<string>("default");
  const catNoises: CatNoises = ["mrrrp", "meow", "chrrrp", "meow meow"];
  // let phrases: string[] = [];
  const phrases = useRef<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // event handler definitions
  // on action registered
  const handleActionTrigger = (input: string): void => {
    const [color, item, action] = input.split("-");
    const toSpeech = `Meow! ${capitalizeFirst(action)} me with your ${color} ${item}`;
    setSpeech(toSpeech);
    setTrigger(input);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // denied action
  const handleActionDenied = (input: string): void => {
    setTrigger("failed");
    const color = input.split("-")[0];
    const toSpeech = `meow, ${color} is boring, add some color`;
    setSpeech(toSpeech);

    setTimeout(() => {
      setTrigger("default");
      makeRandomNoise();
    }, 2000);
  };

  // on click cat image when action not firing
  const makeRandomNoise = (): void => {
    console.log(phrases.current);
    let noise: string;
    if (phrases.current.length > 0 && Math.random() > 0.85) {
      noise = phrases.current[Math.floor(Math.random() * phrases.current.length)];
    } else {
      // code here
      noise = catNoises[Math.floor(Math.random() * catNoises.length)];
    }
    setSpeech(noise);
    setTrigger("failed");

    setTimeout(() => {
      setTrigger("default");
    }, 200);
  };

  // on action complete
  const handleActionComplete = (data): void => {
    let message: string;
    console.log(data);

    switch (data.mostfelt) {
      case "happy":
        message = "purrrr";
        break;
      case "sad":
        message = "sadge QQ";
        break;
      case "angry":
        message = "hiss";
        break;
      default:
        message = "meow";
    }

    setTrigger("default");
    setSpeech(message);
    intervalRef.current = setInterval(() => {
      makeRandomNoise();
    }, 3000);
  };

  // listener subscriptions
  useEffect(() => {
    socket.on("actionbegan", handleActionTrigger);
    socket.on("actiondenied", handleActionDenied);
    socket.on("updatestatus", handleActionComplete);
    makeRandomNoise();

    return () => {
      socket.off("actionbegan", handleActionTrigger);
      socket.off("actiondenied", handleActionDenied);
      socket.off("updatestatus", handleActionComplete);
    };
  }, []);

  // retrieving jumpscares
  useEffect(() => {
    get("/api/phrases").then((result) => {
      phrases.current = result.phrases;
    });

    intervalRef.current = setInterval(() => {
      makeRandomNoise();
    }, 3000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
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
