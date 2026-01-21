import React, { useState, useEffect, useContext } from "react";

import Cat from "./Cat";
import ItemStation from "./ItemStation";
import PaintStation from "./PaintStation";
import InventoryBar from "../InventoryBar";
import { get, post } from "../../utilities";

import { ActiveCatContext } from "../App";

import bg from "../../assets/bg.png";

import Player from "../../../../shared/Player";

const GameScene = () => {
  const { activeCats, setActiveCats } = useContext(ActiveCatContext);
  const [items, setItems] = useState<Array<string | null>>([null, null, null, null]);

  useEffect(() => {
    console.log(activeCats);
  }, [activeCats]);

  useEffect(() => {
    get("/api/player").then((player: Player) => {
      setItems(player.items);
    });
  }, []);

  const addItem = (new_item: string) => {
    // add item at first empty slot
    for (let i = 0; i < 4; i++) {
      post("/api/additem", { new_item: new_item }).then((new_list_items) => {
        if (new_list_items === items) {
          //TO DO: u can't add item sadge popup
        }
        setItems(new_list_items);
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {activeCats.map((cat) => (
        <Cat key={cat._id} catDoc={cat} />
      ))}
      <ItemStation onClick={addItem} />
      <PaintStation />
      <InventoryBar initialitems={items} dependency={"placeholder"} canInteract={true} />
    </div>
  );
};

export default GameScene;
