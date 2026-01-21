import React from "react";
import "./CatDisplay.css";
import { post } from "../../utilities";
import { socket } from "../../client-socket";

type Props = {
  sprite: string;
  action: string;
  callback: () => void;
};

const CatSprite = (props: Props) => {
  // click handler
  const handleClick = (): void => {
    const trigger: string = props.action === "default" ? "" : props.action.split("-")[2];
    switch (trigger) {
      case "bonk":
      case "pet":
      case "dress":
      case "feed":
        post("/api/resolveaction", { action: props.action, socketid: socket.id });
        break;
      default:
        props.callback();
        break;
    }
  };

  return <img className="CatDisplay-cat" onClick={handleClick} src={props.sprite} alt="cat" />;
};

export default CatSprite;
