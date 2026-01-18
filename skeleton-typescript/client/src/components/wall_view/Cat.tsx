import React from "react";
import catImg from "../../assets/cat.jpg";

type Props = {
  // TO DO
};

// w only multiples of 4 for some reason??
const Cat = (props: Props) => {
  return (
    <>
      <img src={catImg} className="w-[15vw] h-auto" />
    </>
  );
};

export default Cat;
