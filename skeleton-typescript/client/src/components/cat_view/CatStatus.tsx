import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../pages/CatInterface.css";
import { useParams } from "react-router-dom";
import CatInterfaceMongo from "../../../../shared/Cat";
import PlayerInterface from "../../../../shared/Player";

const CatStatus = () => {
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
      <div className="CatInterface-panel CatInterface-bl border-2 border-black p-sm">
        Mood: <br />
        <br />
        Happy: {selectedCat?.currentmood[0]} <br />
        Sad: {selectedCat?.currentmood[1]} <br />
        Angry: {selectedCat?.currentmood[2]}
      </div>
    </>
  );
};

export default CatStatus;
