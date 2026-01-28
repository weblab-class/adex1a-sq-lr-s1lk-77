import React from "react";
import { playSFX } from "../../sound";
import button_click_sfx from "../../assets/sfx/button_click.wav";
import button_hover_sfx from "../../assets/sfx/button_hover.wav";
import homework_producer from "../../assets/homework-producer.png";
type Props = {
  addItem: Function;
  item: string;
  x: number;
  y: number;
};

const ItemStation = (props: Props) => {
  const addItem = props.addItem;
  const item = props.item;
  let src = "asdf";
  if (item == "white-homework") src = homework_producer;
  return (
    <>
      <img
        src={src}
        className="absolute text-lg"
        onMouseEnter={() => playSFX(button_hover_sfx)}
        onClick={() => {
          addItem(item);
        }}
        style={{ width: "10cqw", left: `${props.x}%`, top: `${props.y}%` }}
        alt={props.item}
      />
    </>
  );
};

export default ItemStation;
