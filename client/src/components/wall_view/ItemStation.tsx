import React from "react";
import { playSFX } from "../../sound";
import button_click_sfx from "../../assets/sfx/button_click.wav";
import button_hover_sfx from "../../assets/sfx/button_hover.wav";

type Props = {
  addItem: Function;
  item: string;
  x: number;
  y: number;
};

const ItemStation = (props: Props) => {
  const addItem = props.addItem;
  const item = props.item;

  return (
    <>
      <p
        className="absolute text-lg"
        onMouseEnter={() => playSFX(button_hover_sfx)}
        onClick={() => {
          playSFX(button_click_sfx);
          addItem(item);
        }}
        style={{ left: `${props.x}%`, top: `${props.y}%` }}
      >
        {item}
      </p>
    </>
  );
};

export default ItemStation;
