import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import catImg from "../../assets/newcat.png";
import Cat from "../../../../shared/Cat";

import { get, post } from "../../utilities";

import { ActiveCatContext } from "../App";

type Props = {
  catDoc: Cat;
  x: number;
  y: number;
};

const Cat = (props: Props) => {
  const { activeCats, setActiveCats } = useContext(ActiveCatContext);
  const cat = props.catDoc;

  const navigate = useNavigate();
  const handleClick = () => {
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
      className="absolute w-[12%] h-auto cursor-pointer"
      style={{ left: `${props.x}%`, top: `${props.y}%` }}
    />
  );
};

export default Cat;
