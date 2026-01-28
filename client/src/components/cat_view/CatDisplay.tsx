// a single item in the inventory
import React, { useEffect, useState, useRef } from "react";
import "./CatDisplay.css";
import SpeechBubble from "./SpeechBubble";
import { socket } from "../../client-socket";
import { capitalizeFirst } from "../../custom-utilities";
import CatSprite from "./CatSprite";
import { get } from "../../utilities";
import { playSFX } from "../../sound";
import purr_sfx from "../../assets/sfx/purr.mp3";
import hiss_sfx from "../../assets/sfx/hiss.mp3";
import sad_sfx from "../../assets/sfx/sad.wav";
import button_click_sfx from "../../assets/sfx/button_click.wav";
import achievement_sfx from "../../assets/sfx/achievement.mp3";

type Props = {
  sprite: string;
};

type CatNoises = Array<"mrrrp" | "meow" | "chrrrp" | "purrr" | "hiss" | "meow meow">;

const CatDisplay = (props: Props) => {
  const [speech, setSpeech] = useState<string | null>(null);
  const [is_spoopy, set_is_spoopy] = useState<boolean>(false);
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
    set_is_spoopy(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTrigger(input);

    setTimeout((): void => {
      if (trigger !== input) {
        setTrigger(input);
      }
    }, 200);
  };

  // denied action
  const handleActionDenied = (input: string): void => {
    setTrigger("failed");
    const color = input.split("-")[0];
    const toSpeech = `meow, ${color} is boring, add some color`;
    setSpeech(toSpeech);
    set_is_spoopy(false);

    setTimeout(() => {
      setTrigger("default");
      makeRandomNoise();
    }, 2000);
  };

  // on click cat image when action not firing
  const makeRandomNoise = (): void => {
    let noise: string;
    if (phrases.current.length > 0 && Math.random() > 0.85) {
      noise = phrases.current[Math.floor(Math.random() * phrases.current.length)];
      set_is_spoopy(true);
    } else {
      // code here
      noise = catNoises[Math.floor(Math.random() * catNoises.length)];
      set_is_spoopy(false);
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
    if (phrases.current.length > 0 && !data.isAchievement && Math.random() > 0.9) {
      playSFX(button_click_sfx);
      message = phrases.current[Math.floor(Math.random() * phrases.current.length)];
      set_is_spoopy(true);
    } else {
      switch (data.mostfelt) {
        case "happy":
          playSFX(purr_sfx);
          message = "purrrr";
          break;
        case "sad":
          playSFX(sad_sfx);
          message = "oh, the misery";
          break;
        case "angry":
          playSFX(hiss_sfx);
          message = "hissss";
          break;
        default:
          playSFX(achievement_sfx);
          message = data.mostfelt;
      }
      set_is_spoopy(false);
    }

    setTrigger("default");
    setSpeech(message);
    set_is_spoopy(false);
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

  useEffect(() => {
    console.log("trigger changed to " + trigger);
  }, [trigger]);

  return (
    <div className={trigger !== "default" ? "CatDisplay-containerbig" : "CatDisplay-container"}>
      {speech && <SpeechBubble textcontent={speech} is_spoopy={is_spoopy} />}
      <CatSprite sprite={props.sprite} action={trigger} callback={makeRandomNoise} />
    </div>
  );
};

export default CatDisplay;
