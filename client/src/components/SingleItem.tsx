// a single item in the inventory
import React from "react";
import "./SingleItem.css";
import { playSFX } from "../sound";
import button_click_sfx from "../assets/sfx/button_click.wav";
import button_hover_sfx from "../assets/sfx/button_hover.wav";

const itemImages = import.meta.glob("../assets/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;
type Props = {
  itemname: string; // name of item
  slotnumber: number;
  selectItem: ((arg0: number) => void) | null; // callback function from parent
};

const SingleItem = (props: Props) => {
  // callback function on button press
  const itemSrc = itemImages[`../assets/${props.itemname}.png`];

  const handleHover = () => {
    playSFX(button_hover_sfx);
  };

  const handleClick = (event: React.MouseEvent) => {
    props.selectItem && props.selectItem(props.slotnumber); // ping inventory bar that item has been selected
    playSFX(button_click_sfx);
  };

  return (
    <img
      className="SingleItem-container text-white"
      alt={props.itemname}
      src={itemSrc}
      onClick={handleClick}
      onMouseEnter={handleHover}
    />
  );
};

export default SingleItem;
