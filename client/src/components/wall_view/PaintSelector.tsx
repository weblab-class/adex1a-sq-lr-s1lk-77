import React, { useState } from "react";
import PaintStation from "./PaintStation";

type Props = {
  x: number;
  y: number;
};
const PaintSelector = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <p
        onClick={() => setVisible(!visible)}
        className="absolute cursor-pointer"
        style={{ left: `${props.x}%`, top: `${props.y}%` }}
      >
        Paint Selector
      </p>
      {visible && (
        <>
          <PaintStation color="red" x={10} y={60} />
          <PaintStation color="green" x={10} y={80} />
          <PaintStation color="blue" x={10} y={90} />
        </>
      )}
    </>
  );
};

export default PaintSelector;
