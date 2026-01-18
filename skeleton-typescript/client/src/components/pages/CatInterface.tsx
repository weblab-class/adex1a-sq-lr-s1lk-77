import React, { useState, useEffect } from "react";
import GameScene from "../wall_view/GameScene";
import { get, post } from "../../utilities";
import InventoryBar from "../InventoryBar";
import catImg from "../../assets/cat.jpg";
import "./CatInterface.css";

const CatInterface = () => {
  return (
    <>
      <div className="u-flex">
        <div className="u-flex justify-center items-center grow">
          <p>Test cat interface</p>
          <div className="w-1/2 h-1/2 border-2 border-black">
            <img className="object-contain" src={catImg} alt="cat" />
          </div>
        </div>
        <div className="w-1/5">
          <InventoryBar />
        </div>
      </div>
      <div className="CatInterface-panel CatInterface-bl border-2 border-black">Panel</div>
      <div className="CatInterface-panel CatInterface-tl border-2 border-black">Panel</div>
    </>
  );
};

export default CatInterface;
