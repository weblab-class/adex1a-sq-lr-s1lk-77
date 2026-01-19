// a single item in the inventory
import React from "react";
import "./SingleItem.css";

type Props = {
  itemname: string; // name of item
  slotnumber: number;
  selectItem: ((arg0: number) => void) | null; // callback function from parent
};

const SingleItem = (props: Props) => {
  // callback function on button press
  const handleClick = (event: React.MouseEvent) => {
    props.selectItem && props.selectItem(props.slotnumber); // ping inventory bar that item has been selected
  };

  return (
    <img className="SingleItem-container text-white" alt={props.itemname} onClick={handleClick} />
  );
};

export default SingleItem;
