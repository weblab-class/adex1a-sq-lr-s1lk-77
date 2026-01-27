import React from "react";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket";
import { playSFX } from "../../sound";
import button_hover_sfx from "../../assets/sfx/button_hover.wav";
import whoosh_sfx from "../../assets/sfx/whoosh.mp3";

type Props = {
  color: string;
  x: number;
  y: number;
};
const PaintStation = (props: Props) => {
  const callPaintPing = () => {
    playSFX(whoosh_sfx, 0.1);
    post("/api/startpaint", { color: props.color, socketid: socket.id });
  };

  return (
    <div
      onClick={callPaintPing}
      onMouseEnter={() => playSFX(button_hover_sfx)}
      className="absolute"
      style={{
        left: `${props.x}%`,
        top: `${props.y}%`,
        width: "2cqw",
        height: "2cqw",
        backgroundColor: `${props.color}`,
      }}
    ></div>
  );
};

export default PaintStation;
