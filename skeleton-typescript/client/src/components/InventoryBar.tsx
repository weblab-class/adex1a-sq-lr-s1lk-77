import React, { useState, useEffect } from "react";
import SingleItem from "./SingleItem";
import "./InventoryBar.css";

type Props = {};

const InventoryBar = (props: Props) => {
  const [items, setItems] = useState<Array<String | null>>([null, null, null, null]);

  useEffect((): void => {
    console.log("running useEffect");
    setItems(["item1", "item2", null, null]);
  }, []);

  return (
    <div className="u-flexColumn border-2 border-solid h-screen bg-black">
      <div className="InventoryBar-header u-flex">
        <p className="text-lg text-white"> Inventory Bar </p>
      </div>
      <div className="u-flexColumn border-solid border-white border-2 grow">
        {items.map((item) => {
          if (item) {
            return (
              <div className="h-1/4 border-solid border-white border-2">
                {item ? <SingleItem placeholder={item} /> : null}
              </div>
            );
          } else {
            return <div className="h-1/4 border-solid border-white border-2"></div>;
          }
        })}
      </div>
    </div>
  );
};

export default InventoryBar;
