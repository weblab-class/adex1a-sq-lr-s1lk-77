import React, { useContext } from "react";

import Cat from "./Cat";
import ItemStation from "./ItemStation";
import PaintStation from "./PaintStation";
import InventoryBar from "../InventoryBar";

import { CatContext } from "../App";

import bg from "../../assets/bg.png";

const GameScene = () => {
  const { cats, setCats } = useContext(CatContext);
  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Cat />
      <Cat />
      <Cat />
      <ItemStation />
      <PaintStation />
      <InventoryBar />
    </div>
  );
};

export default GameScene;
