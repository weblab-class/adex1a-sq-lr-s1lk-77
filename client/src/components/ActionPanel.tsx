// a single item in the inventory
import React, { useEffect } from "react";
import "./ActionPanel.css";
import { post } from "../utilities";
import { socket } from "../client-socket";

import { playSFX } from "../sound";
import button_hover_sfx from "../assets/sfx/button_hover.wav";
import button_click_sfx from "../assets/sfx/button_click.wav";

type Props = {
  itemname: string;
  index: number;
};

type ActionNames = Array<"Pet" | "Feed" | "Dress" | "Bonk">;

// w only multiples of 4 for some reason??
const SingleItem = (props: Props) => {
  // click callback for button
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    playSFX(button_click_sfx);
    let thisAction: string = (event.target as HTMLElement).textContent;
    thisAction = thisAction.charAt(0).toLowerCase() + thisAction.slice(1);

    // emit event start action
    post("/api/triggeraction", {
      socketid: socket.id,
      action: props.itemname + "-" + thisAction,
      index: props.index,
    });
    // onclick remove handle click
  };

  const actionNames: ActionNames = ["Pet", "Feed", "Dress", "Bonk"];

  return (
    <div className="ActionPanel-container">
      {actionNames.map((action: string, i: number): React.ReactNode => {
        return (
          <button
            onMouseEnter={() => playSFX(button_hover_sfx)}
            key={`ActionPanel-button${i}`}
            onClick={handleClick}
          >
            {action}
          </button>
        );
      })}
    </div>
  );
};

export default SingleItem;
