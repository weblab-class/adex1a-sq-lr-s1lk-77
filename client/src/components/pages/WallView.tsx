import React, { useState, useEffect, useContext } from "react";

import Cat from "../wall_view/Cat";
import ItemStation from "../wall_view/ItemStation";
import PaintSelector from "../wall_view/PaintSelector";
import InventoryBar from "../InventoryBar";
import { get, post } from "../../utilities";
import { playSFX } from "../../sound";
import coin_sfx from "../../assets/sfx/coin.mp3";
import { ActiveCatContext } from "../App";

import bg from "../../assets/bg.png";

import Player from "../../../../shared/Player";

const WallView = () => {
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
      } else {
        playSFX(coin_sfx, 0.3);
        console.log(new_list_items);
        setItems(new_list_items);
      }
    });
  };

  return (
    <div
      className="w-full h-full bg-no-repeat bg-cover bg-center u-flex"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="relative w-full h-full grow">
        <Cat catDoc={activeCats[0]} x={20} y={10} />
        <Cat catDoc={activeCats[1]} x={10} y={20} />
        <Cat catDoc={activeCats[2]} x={10} y={30} />

        <ItemStation addItem={addItem} item={"green-pickle"} x={30} y={30} />
        <ItemStation addItem={addItem} item={"white-homework"} x={40} y={40} />
        <ItemStation addItem={addItem} item={"red-balloon"} x={50} y={50} />

        <PaintSelector x={84} y={60} />
      </div>

      <div className="w-[20%] h-full">
        <InventoryBar initialitems={items} dependency={"placeholder"} canInteract={false} />
      </div>
    </div>
  );
};

export default WallView;
