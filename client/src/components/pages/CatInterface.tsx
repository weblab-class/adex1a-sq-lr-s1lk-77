import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import InventoryBar from "../InventoryBar";
import catImg from "../../assets/newcat.png";
import "./CatInterface.css";
import { useParams } from "react-router-dom";
import CatInterfaceMongo from "../../../../shared/Cat";
import PlayerInterface from "../../../../shared/Player";
import BackButton from "../cat_view/BackButton";
import CatDisplay from "../cat_view/CatDisplay";
import CatInfo from "../cat_view/CatInfo";
import CatStatus from "../cat_view/CatStatus";
import Follower from "../cat_view/Follower";
import brown_cat from "../../assets/cat-base-brown.png";
import black_cat from "../../assets/cat-base-black.png";
import orange_cat from "../../assets/cat-base-orange.png";
import gray_cat from "../../assets/cat-base-gray.png";

const CatInterface = () => {
  let props = useParams<"catId">();
  const [selectedCat, setSelectedCat] = useState<CatInterfaceMongo | null>(null);
  const [catImg, setCatImg] = useState<string | null>(null);
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
    if (selectedCat) {
      if (selectedCat!.color == "orange") {
        setCatImg(orange_cat);
      } else if (selectedCat!.color == "gray") {
        setCatImg(gray_cat);
      } else if (selectedCat!.color == "black") {
        setCatImg(black_cat);
      } else if (selectedCat!.color == "brown") {
        setCatImg(brown_cat);
      }
    }
  }, [selectedCat]);

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
      <div className="u-flex CatInterface-main">
        <div className="CatInterface-cat">
          <CatDisplay sprite={catImg} />
        </div>
        <div className="CatInterface-inventorycontainer">
          <InventoryBar initialitems={player.items} dependency={activeItem} canInteract={true} />
          {/* Assign callback function and pass as props down, should pass dependency variable, function body */}
        </div>
      </div>
      <CatStatus selectedCat={selectedCat} />
      <CatInfo />
      <Follower />
    </>
  );
};

export default CatInterface;
