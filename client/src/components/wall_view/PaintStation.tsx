import React from "react";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket";

type Props = {
  color: string;
  x: number;
  y: number;
};
const PaintStation = (props: Props) => {
  const callPaintPing = () => {
    post("/api/startpaint", { color: props.color, socketid: socket.id });
  };

  return (
    <div
      onClick={callPaintPing}
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
