import React from "react";
import { useNavigate } from "react-router-dom";
import catImg from "../../assets/cat.jpg";
import Cat from "../../../../shared/Cat";

type Props = {
  catDoc: Cat;
};

// w only multiples of 4 for some reason??
const Cat = (props: Props) => {
  const cat = props.catDoc;

  const navigate = useNavigate();
  return (
    <>
      <img src={catImg} onClick={() => navigate(`/cat/${cat._id}`)} className="w-60 h-auto" />
    </>
  );
};

export default Cat;
