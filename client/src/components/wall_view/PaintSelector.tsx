import React, { useState } from "react";
import PaintStation from "./PaintStation";
import { playSFX } from "../../sound";
import button_click_sfx from "../../assets/sfx/button_click.wav";
import button_hover_sfx from "../../assets/sfx/button_hover.wav";

type Props = {
  x: number;
  y: number;
};
const PaintSelector = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent) => {
    playSFX(button_click_sfx);
    setVisible(!visible);
  };
  return (
    <div className="w-full h-full">
      <div
        onClick={handleClick}
        onMouseEnter={() => playSFX(button_hover_sfx)}
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
