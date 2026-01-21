import React from "react";

type Props = {
  // TO DO
  onClick: (new_item: string) => void;
};

const ItemStation = (props: Props) => {
  return (
    <div>
      <p className="text-lg"> Item Station </p>
    </div>
  );
};

export default ItemStation;
