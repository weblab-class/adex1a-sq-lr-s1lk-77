import React, { useState, useEffect } from "react";
import SingleItem from "./SingleItem";
import ActionPanel from "./ActionPanel";
import "./InventoryBar.css";
import { parseItemName } from "../custom-utilities";

type Props = {
  initialitems: Array<string | null>; // items array passed down from immediate parent
  canInteract: boolean; // if ActionPanel should popup: true for cat interface, false for wallview
  dependency?: string | null; // TODO, make inventory bar know when to update itself based on player actions
};

type SelectedItem = {
  item: string | null;
  index: number;
};

const InventoryBar = (props: Props) => {
  const [items, setItems] = useState<Array<string | null>>([null, null, null, null]);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({ item: null, index: NaN });
  const [showPanel, setShowPanel] = useState<boolean>(false);
  let itemsList: Array<React.ReactNode> = [];

  // getting initial item list
  useEffect((): void => {
    setItems(props.initialitems);
  }, [props.initialitems]);

  useEffect(() => {
    // setItems here with the item being passed in
    // need to pass in item and number
  }, [props.dependency]);

  // function that takes an index and places the selected item in the state
  // passed down to SingleItem to be executed in its callback
  const selectItem = (idx: number): void => {
    console.log(`selected item at index ${idx}`);
    const thisItem: string = items[idx] as string;
    props.canInteract && toggleAction(idx); // only toggle actionPanel if can interact
    setSelectedItem({ item: thisItem, index: idx });
  };

  // callback to control positioning and on/off of action panel, actively working on this
  const toggleAction = (idx: number): void => {
    const currentIdx: number = selectedItem.index;
    if (idx != currentIdx) {
      !showPanel && setShowPanel(true);
      return;
    }

    setShowPanel(!showPanel);
  };

  // generating slots
  itemsList = items.map((item, i) => {
    if (item) {
      return (
        <div
          className={
            selectedItem.index == i
              ? "InventoryBar-slot InventoryBar-hasitem InventoryBar-selected"
              : "InventoryBar-slot InventoryBar-hasitem"
          }
          key={`itemslot-${i}`}
        >
          <SingleItem itemname={item} slotnumber={i} selectItem={selectItem} />
        </div>
      );
    } else {
      return <div className="InventoryBar-slot" key={`itemslot-${i}`}></div>;
    }
  });

  return (
    <div className="u-flexColumn border-2 border-solid h-screen bg-black">
      <div className="InventoryBar-header u-flex">
        <p className="text-lg text-white">
          {" "}
          {selectedItem.item ? parseItemName(selectedItem.item) : "No Item Selected"}{" "}
        </p>
        <img className="text-white" alt="Gear Icon" />
      </div>
      <div className="u-flexColumn border-solid border-white border-2 grow InventoryBar-relative">
        {itemsList}
        <div
          className={`ActionPanel ActionPanel-pos${selectedItem.index} ${showPanel ? "ActionPanel-show" : "ActionPanel-hide"}`}
        >
          <ActionPanel itemname={selectedItem.item ? selectedItem.item : "none"} />
        </div>
      </div>
    </div>
  );
};

export default InventoryBar;
