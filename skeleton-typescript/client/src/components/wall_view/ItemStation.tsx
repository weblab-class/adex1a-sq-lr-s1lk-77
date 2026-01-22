import React from "react";

type Props = {
  addItem: Function;
  item: string;
};

const ItemStation = (props: Props) => {
  const addItem = props.addItem;
  const item = props.item;

  return (
    <>
      <p class="text-lg" onClick={() => addItem(item)}>
        Item Station
      </p>
    </>
  );
};

export default ItemStation;
