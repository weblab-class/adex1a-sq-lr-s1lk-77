import React, { useState, useEffect } from "react";
import SingleItem from "./SingleItem";
import "./InventoryBar.css";

type Props = {
  initialitems: Array<string | null>;
  dependency?: string | null;
};

type SelectedItem = {
  item: string | null;
  index: number;
};

const InventoryBar = (props: Props) => {
  const [items, setItems] = useState<Array<string | null>>([null, null, null, null]);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({ item: null, index: NaN });
  let itemsList: Array<React.ReactNode> = [];
  console.log(props.initialitems);

  useEffect((): void => {
    console.log("running useEffect in inventory bar");
    setItems(props.initialitems);
  }, [props.initialitems]);

  useEffect(() => {
    // setItems here with the item being passed in
    // need to pass in item and number
  }, [props.dependency]);

  itemsList = items.map((item, i) => {
    if (item) {
      return (
        <div
          className="h-1/4 border-solid border-white border-2 u-flex justify-center items-center"
          key={`itemslot-${i}`}
        >
          <SingleItem itemname={item} />
        </div>
      );
    } else {
      return <div className="h-1/4 border-solid border-white border-2" key={`itemslot-${i}`}></div>;
    }
  });

  return (
    <div className="u-flexColumn border-2 border-solid h-screen bg-black">
      <div className="InventoryBar-header u-flex">
        <p className="text-lg text-white">
          {" "}
          {selectedItem.item ? selectedItem.item : "No Item Selected"}{" "}
        </p>
        <img className="text-white" alt="Gear Icon" />
      </div>
      <div className="u-flexColumn border-solid border-white border-2 grow">{itemsList}</div>
    </div>
  );
};

export default InventoryBar;
