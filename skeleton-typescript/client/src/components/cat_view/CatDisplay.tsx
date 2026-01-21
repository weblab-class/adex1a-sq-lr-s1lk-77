// a single item in the inventory
import React from "react";
import "./CatDisplay.css";

type Props = {
  catImg: string;
};

const CatDisplay = (props: Props) => {
  return (
    <div className="w-1/2 h-1/2 border-2 border-black">
      <img className="CatDisplay-cat" src={props.catImg} alt="cat" />
    </div>
  );
};

export default CatDisplay;
