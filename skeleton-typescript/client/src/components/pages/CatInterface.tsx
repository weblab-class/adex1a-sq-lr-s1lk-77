import React, { useState, useEffect } from "react";
import GameScene from "../wall_view/GameScene";
import { get, post } from "../../utilities";
import InventoryBar from "../InventoryBar";
import catImg from "../../assets/cat.jpg";
import "./CatInterface.css";
import { useParams } from "react-router-dom";
import CatModel from "../../../../shared/Cat";
import PlayerModel from "../../../../shared/Player";

const CatInterface = () => {
  let props = useParams<"catId">();
  const [selectedCat, setSelectedCat] = useState<CatModel | null>(null);
  const [activeItem, setActiveItem] = useState<null>(null);
  const [player, setPlayer] = useState<PlayerModel | Object>({
    items: [null, null, null, null],
    name: "initial",
  });

  useEffect(() => {
    console.log(`running use effect`);
    document.title = "Cat";

    // get(`/api/player`).then((playerObj: PlayerModel): void => {
    //   setPlayer(playerObj);
    // });

    // hardcode
    const thisPlayer = {
      items: ["green-pickle", "blue-homework", null, null],
      name: "something",
    };
    setPlayer(thisPlayer);
    // end hardcode

    // get(`/api/catfromid`, { catid: props.catId }).then((catObj: CatModel): void =>
    //   setSelectedCat(catObj)
    // );
  }, []);

  useEffect(() => {
    console.log(`player name is ${player.name}`);
    console.log(`player items is ${player.items}`);
  }, [player]);

  return (
    <>
      <div className="u-flex">
        <div className="u-flex justify-center items-center grow">
          <div className="w-1/2 h-1/2 border-2 border-black">
            <img className="CatInterface-cat" src={catImg} alt="cat" />
          </div>
        </div>
        <div className="w-1/5">
          <InventoryBar initialitems={player.items} dependency={activeItem} />
          {/* Assign callback function and pass as props down, should pass dependency variable, function body */}
        </div>
      </div>
      <div className="CatInterface-panel CatInterface-bl border-2 border-black">Panel</div>
      <div className="CatInterface-panel CatInterface-tl border-2 border-black">Panel</div>
    </>
  );
};

export default CatInterface;
