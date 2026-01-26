import React, { useState } from "react";
import PaintStation from "./PaintStation";

type Props = {
  x: number;
  y: number;
};
const PaintSelector = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="w-full h-full">
      <div
        onClick={() => setVisible(!visible)}
        className="absolute cursor-pointer block aspect-square"
        style={{
          left: `${props.x}%`,
          top: `${props.y}%`,
          width: "5cqw",
          height: "5cqw",
          backgroundColor: "transparent",
        }}
      />
      {visible && (
        <>
          <PaintStation color="red" x={85.5} y={45} />
          <PaintStation color="green" x={83} y={50} />
          <PaintStation color="blue" x={88} y={50} />
        </>
      )}
    </div>
  );
};

export default PaintSelector;
