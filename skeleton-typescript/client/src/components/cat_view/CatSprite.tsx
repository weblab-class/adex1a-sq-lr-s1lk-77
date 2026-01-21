import React from "react";
import "./CatDisplay.css";

type Props = {
  sprite: string;
  trigger?: string;
};

const CatSprite = (props: Props) => {
  return <img className="CatDisplay-cat" src={props.sprite} alt="cat" />;
};

export default CatSprite;
