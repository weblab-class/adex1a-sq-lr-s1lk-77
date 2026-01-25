import React from "react";

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
        onClick={() => addItem(item)}
        style={{ left: `${props.x}%`, top: `${props.y}%` }}
      >
        {item}
      </p>
    </>
  );
};

export default ItemStation;
