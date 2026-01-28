import React from "react";
import { playSFX } from "../../sound";
import button_click_sfx from "../../assets/sfx/button_click.wav";
import button_hover_sfx from "../../assets/sfx/button_hover.wav";
import homework_producer from "../../assets/homework-producer.png";
import balloon_producer from "../../assets/balloon-producer.png";
import pickle_producer from "../../assets/pickle-producer.png";
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
  else if (item == "green-pickle") src = pickle_producer;
  else if (item == "red-balloon") src = balloon_producer;

  return (
    <>
      <img
        src={src}
        className="absolute text-lg cursor-pointer"
        onMouseEnter={() => playSFX(button_hover_sfx)}
        onClick={() => {
          addItem(item);
        }}
        style={{ width: "16%", left: `${props.x}%`, top: `${props.y}%` }}
        alt={props.item}
      />
    </>
  );
};

export default ItemStation;
