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
      <p className="text-lg" onClick={() => addItem(item)}>
        {item}
      </p>
    </>
  );
};

export default ItemStation;
