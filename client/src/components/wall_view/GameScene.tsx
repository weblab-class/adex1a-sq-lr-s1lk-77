import React, { useState, useEffect, useContext } from "react";

import Cat from "./Cat";
import ItemStation from "./ItemStation";
import PaintSelector from "./PaintSelector";
import InventoryBar from "../InventoryBar";
import { get, post } from "../../utilities";

import { ActiveCatContext } from "../App";

import bg from "../../assets/bg.png";

import Player from "../../../../shared/Player";

const GameScene = () => {
  const { activeCats, setActiveCats } = useContext(ActiveCatContext);
  const [items, setItems] = useState<Array<string | null>>([null, null, null, null]);

  /* useEffect(() => {
    console.log(activeCats);
    console.log(items);
  }, [activeCats, items]); */

  useEffect(() => {
    get("/api/player").then((player: Player) => {
      setItems(player.items);
    });
  }, []);

  const addItem = (new_item: string) => {
    // add item at first empty slot
    post("/api/additem", { new_item: new_item }).then((new_list_items) => {
      if (JSON.stringify(new_list_items) === JSON.stringify(items)) {
        //TO DO: u can't add item sadge popup
        console.log("ooh no");
      }
      console.log(new_list_items);
      setItems(new_list_items);
    });
  };

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center u-flex"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="grow">
        {activeCats.map((cat) => (
          <Cat key={cat._id} catDoc={cat} />
        ))}

        <ItemStation addItem={addItem} item={"green-pickle"} />
        <ItemStation addItem={addItem} item={"white-homework"} />
        <ItemStation addItem={addItem} item={"red-balloon"} />

        <PaintSelector />
      </div>

      <div className="w-[13.25%]">
        <InventoryBar initialitems={items} dependency={"placeholder"} canInteract={false} />
      </div>
    </div>
  );
};

export default GameScene;
