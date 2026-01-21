import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import catImg from "../../assets/cat.jpg";
import Cat from "../../../../shared/Cat";

import { get, post } from "../../utilities";

import { ActiveCatContext } from "../App";

type Props = {
  catDoc: Cat;
};

const Cat = (props: Props) => {
  const { activeCats, setActiveCats } = useContext(ActiveCatContext);
  const cat = props.catDoc;

  const navigate = useNavigate();
  const handleClick = () => {
    post("/api/visitcat", { catId: cat._id }).then((new_cat) =>
      setActiveCats((activeCats) =>
        activeCats.map((cat) => (cat._id === new_cat._id ? new_cat : cat))
      )
    );
    navigate(`/cat/${cat._id}`);
  };
  return (
    <>
      <img src={catImg} className="w-[15vw] h-auto" />
    </>
  );
};

export default Cat;
