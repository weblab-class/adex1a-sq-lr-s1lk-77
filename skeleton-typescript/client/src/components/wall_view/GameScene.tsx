import React, { useEffect, useContext } from "react";

import Cat from "./Cat";
import ItemStation from "./ItemStation";
import PaintStation from "./PaintStation";
import InventoryBar from "../InventoryBar";
import { get, post } from "../../utilities";

import { ActiveCatContext } from "../App";

import bg from "../../assets/bg.png";

const GameScene = () => {
  const { activeCats, setActiveCats } = useContext(ActiveCatContext);

  /*useEffect(() => {
    post("/api/newcat").then((newcat) => setCats([newcat]));
  }, []);*/
  useEffect(() => {
    console.log(activeCats);
  }, [activeCats]);

  if (activeCats.length == 0) {
    return <div>log in plz</div>;
  }
  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {activeCats.map((cat) => (
        <Cat key={cat._id} catDoc={cat} />
      ))}
      <ItemStation />
      <PaintStation />
      <InventoryBar />
    </div>
  );
};

export default GameScene;
