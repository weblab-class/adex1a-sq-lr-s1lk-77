import React from "react";
import paint from "../../assets/paint.png";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket";

type Props = {
  color: string;
};
const PaintStation = (props: Props) => {
  const callPaintPing = () => {
    console.log("paint ping");
    post("/api/startpaint", { color: props.color, socketid: socket.id });
  };

  return (
    <div>
      <img src={paint} className="w-[15vw] h-auto" onClick={callPaintPing} />
    </div>
  );
};

export default PaintStation;
