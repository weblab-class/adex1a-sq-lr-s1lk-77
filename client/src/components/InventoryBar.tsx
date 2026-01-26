import React, { useState, useEffect } from "react";
import SingleItem from "./SingleItem";
import ActionPanel from "./ActionPanel";
import "./InventoryBar.css";
import { parseItemName } from "../custom-utilities";
import { get, post } from "../utilities";
import { socket } from "../client-socket";

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
  const [selectionFrozen, setSelectionFrozen] = useState<boolean>(false);
  let itemsList: Array<React.ReactNode> = [];

  // getting initial item list
  useEffect((): void => {
    setItems(props.initialitems);
  }, [props.initialitems]);

  const applyPaint = (color: string) => {
    console.log("paint2");
    if (selectedItem.item == null) return;
    post("/api/applypaint", {
      color: color,
      item: selectedItem.item,
      index: selectedItem.index,
    }).then((new_items) => {
      console.log(new_items);
      setItems(new_items);
    });
  };
  // !!! event handler definitions
  const registerPing = (data: string) => {
    console.log(`ping from socket received ${data}`);
  };

  // on action trigger handler
  const handleActionTrigger = (data: Array<string | number>) => {
    console.log(`ping from socket received ${data}`);

    console.log("states when action is fired");
    console.log(items);
    console.log(selectedItem);

    // hide panel and freeze selection
    setShowPanel(false);
    setSelectionFrozen(true);
  };

  // on action resolved successfully, remove item
  const handleActionComplete = (data: Array<string | null>): void => {
    console.log(data);
    // console.log("inventory bar received action complete ping");
    console.log("states inside handleActionComplete");
    console.log(items);
    console.log(selectedItem);
    // const newItems = [...items];
    // newItems[selectedItem.index] = null;
    // console.log(newItems);
    setItems(data);
    setSelectedItem({ item: null, index: NaN });
    setSelectionFrozen(false);
  };

  // DEBUGGING CODE
  // useEffect(() => {
  //   console.log("items has changed to:");
  //   console.log(items);
  // }, [items]);

  // useEffect(() => {
  //   console.log("item selection has changed to:");
  //   console.log(selectedItem);
  // }, [selectedItem]);

  // DEBUGGING CODE
  // useEffect(() => {
  //   setInterval(() => {
  //     console.log("states regular update print");
  //     console.log(items);
  //     console.log(selectedItem);
  //   }, 10000);
  // }, []);

  // subscribing to events
  useEffect(() => {
    socket.on("actiondenied", registerPing);
    socket.on("actionbegan", handleActionTrigger);
    socket.on("actioncomplete", handleActionComplete);

    return () => {
      socket.off("actiondenied", registerPing);
      socket.off("actionbegan", handleActionTrigger);
      socket.off("actioncomplete", handleActionComplete);
    };
  }, []);

  useEffect(() => {
    const paintHandler = (color: string) => applyPaint(color);

    socket.on("paint", paintHandler);

    return () => {
      socket.off("paint", paintHandler);
    };
  }, [applyPaint]);

  useEffect(() => {
    // setItems here with the item being passed in
    // need to pass in item and number
  }, [props.dependency]);

  // function that takes an index and places the selected item in the state
  // passed down to SingleItem to be executed in its callback
  const selectItem = (idx: number): void => {
    console.log("states inside select item");
    console.log(items);
    console.log(selectedItem);
    const thisItem: string = items[idx] as string;
    props.canInteract && toggleAction(idx); // only toggle actionPanel if can interact
    setSelectedItem({ item: thisItem, index: idx });
  };

  // callback to control positioning and on/off of action panel
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
          <SingleItem
            itemname={item}
            slotnumber={i}
            selectItem={selectionFrozen ? null : selectItem}
          />
        </div>
      );
    } else {
      return <div className="InventoryBar-slot" key={`itemslot-${i}`}></div>;
    }
  });

  return (
    <div className="u-flexColumn bg-black w-full h-full">
      <div className="InventoryBar-header u-flex">
        <p className="InventoryBar-title text-white">
          {" "}
          {selectedItem.item ? parseItemName(selectedItem.item) : "No Item Selected"}{" "}
        </p>
      </div>
      <div className="u-flexColumn grow InventoryBar-relative">
        {itemsList}
        {showPanel && (
          <div className={`ActionPanel ActionPanel-pos${selectedItem.index}`}>
            <ActionPanel
              itemname={selectedItem.item ? selectedItem.item : "none"}
              index={selectedItem.index}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryBar;
