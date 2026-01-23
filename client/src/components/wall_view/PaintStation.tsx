import React from "react";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket";

type Props = {
  color: string;
};
const PaintStation = (props: Props) => {
  const callPaintPing = () => {
    post("/api/startpaint", { color: props.color, socketid: socket.id });
  };

  return <div onClick={callPaintPing}>{props.color}</div>;
};

export default PaintStation;
