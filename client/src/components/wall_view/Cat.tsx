import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { playSFX } from "../../sound";
import meow_sfx from "../../assets/sfx/meow.mp3";
import button_hover_sfx from "../../assets/sfx/button_hover.wav";
import brown_cat from "../../assets/cat-base-brown.png";
import black_cat from "../../assets/cat-base-black.png";
import orange_cat from "../../assets/cat-base-orange.png";
import gray_cat from "../../assets/cat-base-gray.png";

import Cat from "../../../../shared/Cat";

import { get, post } from "../../utilities";

import { ActiveCatContext } from "../App";

type Props = {
  catDoc: Cat;
  x: number;
  y: number;
  width: number;
};

const Cat = (props: Props) => {
  const { activeCats, setActiveCats } = useContext(ActiveCatContext);
  const cat = props.catDoc;
  let catImg = "";
  if (cat.color == "orange") {
    catImg = orange_cat;
  } else if (cat.color == "gray") {
    catImg = gray_cat;
  } else if (cat.color == "black") {
    catImg = black_cat;
  } else if (cat.color == "brown") {
    catImg = brown_cat;
  }
  const navigate = useNavigate();
  const handleClick = () => {
    playSFX(meow_sfx);
    post("/api/visitcat", { catId: cat._id }).then((new_cat) => {
      console.log(new_cat.timestamp);
      setActiveCats((activeCats) =>
        activeCats.map((cat) => (cat._id === new_cat._id ? new_cat : cat))
      );
    });
    navigate(`/cat/${cat._id}`);
  };
  return (
    <img
      src={catImg}
      onClick={handleClick}
      onMouseEnter={() => playSFX(button_hover_sfx)}
      className="absolute w-[12%] h-auto cursor-pointer"
      style={{
        width: `${props.width}%`,
        left: `${props.x}%`,
        top: `${props.y}%`,
        // maxWidth: "120px",
        minWidth: "52px",
      }}
    />
  );
};

export default Cat;
