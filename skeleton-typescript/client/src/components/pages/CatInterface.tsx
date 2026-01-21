import React, { useState, useEffect } from "react";
import GameScene from "../wall_view/GameScene";
import { get, post } from "../../utilities";
import InventoryBar from "../InventoryBar";
import catImg from "../../assets/cat.jpg";
import "./CatInterface.css";
import { useParams } from "react-router-dom";
import CatInterfaceMongo from "../../../../shared/Cat";
import PlayerInterface from "../../../../shared/Player";
import BackButton from "../cat_view/BackButton";
import CatDisplay from "../cat_view/CatDisplay";

const CatInterface = () => {
  let props = useParams<"catId">();
  const [selectedCat, setSelectedCat] = useState<CatInterfaceMongo | null>(null);
  const [activeItem, setActiveItem] = useState<null>(null);
  const [player, setPlayer] = useState<PlayerInterface | object>({
    items: [null, null, null, null],
    name: "initial",
  });

  useEffect(() => {
    console.log(`running use effect in Cat interface`);
    document.title = "Cat";

    // testing api request with hardcoded test_player
    get(`/api/player`, { playerid: "696e6d7c7bc87d68a4ab147f" }).then(
      (playerObj: PlayerInterface): void => {
        setPlayer(playerObj);
      }
    );

    if (props.catId != "urmom") {
      get(`/api/catfromid`, { catid: props.catId }).then(
        (catObj: CatInterfaceMongo): void => setSelectedCat(catObj)
        // should do a hard player._id = playerid check but not rn
      );
    }
  }, []);

  useEffect(() => {
    console.log(`player name is ${player.name}`);
    console.log(`player items is ${player.items}`);
  }, [player]);

  useEffect(() => {
    console.log(`cat is ${selectedCat}`);
    console.log(`cat id is ${selectedCat ? selectedCat._id : "no cat selected"}`);
    console.log(`player id is ${selectedCat ? selectedCat.playerid : "no cat selected"}`);
    document.title = `Cat | ${selectedCat ? selectedCat.name : "Test Cat"}`;
  }, [selectedCat]);

  return (
    <>
      <BackButton />
      <div className="u-flex">
        <div className="u-flex justify-center items-center grow max-w-4/5">
          <CatDisplay sprite={catImg} />
        </div>
        <div className="w-1/5">
          <InventoryBar initialitems={player.items} dependency={activeItem} canInteract={true} />
          {/* Assign callback function and pass as props down, should pass dependency variable, function body */}
        </div>
      </div>
      <div className="CatInterface-panel CatInterface-bl border-2 border-black">Panel</div>
      <div className="CatInterface-panel CatInterface-tl border-2 border-black">Panel</div>
    </>
  );
};

export default CatInterface;
